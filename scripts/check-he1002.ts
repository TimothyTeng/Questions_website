// Sanity checks for the HE1002 data.
//   npm run check:he1002            → every topic (needs all 12 data files)
//   npm run check:he1002 -- gdp     → just src/data/he1002/gdp.ts
import type { Graph, TopicData } from "@/lib/he1002/types";
import { blankCorrect, termMatches } from "@/lib/he1002/grading";

const ORDER = ["gdp", "cpi", "unemployment", "growth", "saving", "money", "inflation", "adas", "policy", "keynesian", "open-basics", "open-theory"];
const only = process.argv[2];

async function load(): Promise<TopicData[]> {
  const ids = only ? [only] : ORDER;
  const out: TopicData[] = [];
  for (const id of ids) out.push((await import(`../src/data/he1002/${id}.ts`)).default as TopicData);
  return out;
}

function checkGraph(g: Graph, where: string, problems: string[]) {
  const labels = new Set<string>();
  for (const l of g.lines) {
    if (labels.has(l.label)) problems.push(`${where}: duplicate line label ${l.label}`);
    labels.add(l.label);
    if (l.pts.length < 2) problems.push(`${where}: line ${l.label} needs 2+ points`);
    for (const [x, y] of l.pts) if (x < 0 || x > 10 || y < 0 || y > 10) problems.push(`${where}: line ${l.label} point (${x},${y}) outside 0–10`);
  }
  for (const p of g.points ?? []) {
    if (!p.at && !p.on) problems.push(`${where}: point needs "at" or "on"`);
    if (p.on) for (const n of p.on) if (!labels.has(n)) problems.push(`${where}: point on unknown line "${n}"`);
    if (p.on && !intersects(g, p.on)) problems.push(`${where}: lines ${p.on.join(" & ")} do not cross`);
  }
}

function intersects(g: Graph, [a, b]: [string, string]): boolean {
  const A = g.lines.find((l) => l.label === a);
  const B = g.lines.find((l) => l.label === b);
  if (!A || !B) return false;
  for (let i = 0; i + 1 < A.pts.length; i++)
    for (let j = 0; j + 1 < B.pts.length; j++) {
      const [p, p2] = [A.pts[i], A.pts[i + 1]];
      const [q, q2] = [B.pts[j], B.pts[j + 1]];
      const r = [p2[0] - p[0], p2[1] - p[1]];
      const s = [q2[0] - q[0], q2[1] - q[1]];
      const den = r[0] * s[1] - r[1] * s[0];
      if (Math.abs(den) < 1e-12) continue;
      const t = ((q[0] - p[0]) * s[1] - (q[1] - p[1]) * s[0]) / den;
      const u = ((q[0] - p[0]) * r[1] - (q[1] - p[1]) * r[0]) / den;
      if (t >= -1e-9 && t <= 1 + 1e-9 && u >= -1e-9 && u <= 1 + 1e-9) return true;
    }
  return false;
}

async function main() {
  const DATA = await load();
  const problems: string[] = [];
  const ids = new Set<string>();
  const dup = (id: string) => {
    if (ids.has(id)) problems.push(`duplicate id ${id}`);
    ids.add(id);
  };

  for (const d of DATA) {
    const pre = d.id + "-";
    d.sections.forEach((s, i) => {
      if (!s.points.length && !s.formulas?.length) problems.push(`${d.id} section ${i + 1}: empty`);
      s.diagrams?.forEach((g, j) => checkGraph(g, `${d.id} section "${s.title}" diagram ${j + 1}`, problems));
      if (s.table && s.table.some((r) => r.length !== s.table![0].length)) problems.push(`${d.id} section "${s.title}": ragged table`);
    });

    for (const c of d.flashcards) {
      dup(c.id);
      if (!c.id.startsWith(pre)) problems.push(`${c.id}: id must start with ${pre}`);
      if (!c.front.trim() || !c.back.trim() || !c.why.trim()) problems.push(`${c.id}: empty front/back/why`);
      if (c.type === "concept" && !termMatches(c.back, c.back)) problems.push(`${c.id}: back does not match itself`);
    }

    for (const q of d.quiz) {
      dup(q.id);
      if (!q.id.startsWith(pre)) problems.push(`${q.id}: id must start with ${pre}`);
      if (!q.explain?.trim()) problems.push(`${q.id}: no explanation`);
      if (q.kind === "fill") {
        const n = q.prompt.split("____").length - 1;
        if (n !== q.answers.length) problems.push(`${q.id}: ${n} blanks but ${q.answers.length} answer lists`);
        if (/_{5,}/.test(q.prompt)) problems.push(`${q.id}: blank must be exactly 4 underscores`);
        q.answers.forEach((alts, i) => {
          if (!alts.length) problems.push(`${q.id}: blank ${i + 1} has no answers`);
          for (const a of alts) if (!blankCorrect(q, i, a)) problems.push(`${q.id}: accepted answer "${a}" is marked wrong`);
        });
        if (q.answers.length && blankCorrect(q, 0, "zzzz")) problems.push(`${q.id}: nonsense answer accepted`);
      } else {
        if (q.answer < 0 || q.answer >= q.options.length) problems.push(`${q.id}: answer index out of range`);
        if (new Set(q.options).size !== q.options.length) problems.push(`${q.id}: duplicate options`);
      }
    }

    for (const q of d.exam) {
      dup(q.id);
      if (!q.id.startsWith(pre)) problems.push(`${q.id}: id must start with ${pre}`);
      const sum = q.rubric.reduce((a, r) => a + r.marks, 0);
      if (sum !== q.marks) problems.push(`${q.id}: rubric sums to ${sum}, marks is ${q.marks}`);
      if (q.section !== "diagram" && q.marks !== 3) problems.push(`${q.id}: ${q.section} questions are 3 marks`);
      if (q.section === "diagram") {
        if (q.marks !== 10) problems.push(`${q.id}: diagram questions are 10 marks`);
        if (!q.parts || q.parts.length !== 2 || q.parts.reduce((a, p) => a + p.marks, 0) !== 10) problems.push(`${q.id}: diagram question needs 2 parts totalling 10`);
        if (!q.diagram?.length) problems.push(`${q.id}: diagram question needs a model diagram`);
      }
      if (q.section === "tf" && typeof q.tf !== "boolean") problems.push(`${q.id}: tf needs tf: true/false`);
      if (q.section === "calc" && !q.answer) problems.push(`${q.id}: calc needs answer`);
      if (!q.model.trim()) problems.push(`${q.id}: empty model answer`);
      q.diagram?.forEach((g, j) => checkGraph(g, `${q.id} diagram ${j + 1}`, problems));
    }

    const k = (s: string) => d.exam.filter((q) => q.section === s).length;
    console.log(
      `${d.id.padEnd(12)} sections ${String(d.sections.length).padStart(2)} · points ${String(d.sections.reduce((a, s) => a + s.points.length, 0)).padStart(3)} · cards ${String(d.flashcards.length).padStart(3)} (${d.flashcards.filter((c) => c.type === "scenario").length} scenario) · quiz fill ${String(d.quiz.filter((q) => q.kind === "fill").length).padStart(3)} mcq ${String(d.quiz.filter((q) => q.kind === "mcq").length).padStart(2)} · exam calc ${k("calc")} short ${k("short")} tf ${k("tf")} diagram ${k("diagram")}`,
    );
  }

  if (problems.length) {
    console.log(`\n${problems.length} problem(s):\n` + problems.map((p) => "  - " + p).join("\n"));
    process.exit(1);
  }
  console.log("All checks passed.");
}

main();
