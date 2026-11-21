// Sanity checks for the HE1004 data.
//   npm run check:he1004                 → every topic file that exists in src/data/he1004
//   npm run check:he1004 -- integration  → just src/data/he1004/integration.ts
import { existsSync } from "node:fs";
import katex from "katex";
import type { Figure, TopicData } from "@/lib/he1004/types";
import { blankCorrect, termMatches } from "@/lib/he1004/grading";
import { compile, evalAt } from "@/lib/he1004/expr";

const ORDER = ["algebra", "sums-logic-sets", "functions", "function-props", "differentiation", "derivatives-use", "optimisation", "integration", "matrices", "multivariable", "constrained"];
const only = process.argv[2];

async function load(): Promise<TopicData[]> {
  const ids = only ? [only] : ORDER.filter((id) => existsSync(`src/data/he1004/${id}.ts`));
  const out: TopicData[] = [];
  for (const id of ids) out.push((await import(`../src/data/he1004/${id}.ts`)).default as TopicData);
  return out;
}

/** Every $…$ / $$…$$ chunk must render in KaTeX; $ signs must pair up. */
function checkRich(s: string | undefined, where: string, problems: string[]) {
  if (!s) return;
  const dollars = (s.match(/(?<!\\)\$/g) ?? []).length;
  if (dollars % 2) problems.push(`${where}: unbalanced $ (${dollars}) in "${s.slice(0, 80)}…"`);
  for (const m of s.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g)) {
    const tex = m[1] ?? m[2];
    try {
      katex.renderToString(tex, { throwOnError: true, displayMode: !!m[1] });
    } catch (e) {
      problems.push(`${where}: KaTeX error in "${tex.slice(0, 60)}": ${(e as Error).message.split("\n")[0]}`);
    }
  }
}

function checkFig(f: Figure, where: string, problems: string[]) {
  if (f.kind === "venn") {
    if (f.sets.length < 2 || f.sets.length > 3) problems.push(`${where}: venn needs 2–3 sets`);
    for (const r of [...f.shade, ...Object.keys(f.items ?? {})]) if (r.length !== f.sets.length || /[^01]/.test(r)) problems.push(`${where}: bad venn region "${r}"`);
    return;
  }
  if (f.xr[0] >= f.xr[1] || f.yr[0] >= f.yr[1]) problems.push(`${where}: empty window`);
  const exprs = [...(f.curves ?? []).map((c) => c.f), ...(f.shade ?? []).flatMap((s) => [s.f, s.g ?? "0"])];
  for (const e of exprs) {
    try {
      compile(e);
    } catch (err) {
      problems.push(`${where}: ${(err as Error).message}`);
      continue;
    }
  }
  for (const c of f.curves ?? []) {
    const a = c.from ?? f.xr[0];
    const b = c.to ?? f.xr[1];
    let visible = 0;
    for (let k = 0; k <= 200; k++) {
      const y = evalAt(c.f, a + ((b - a) * k) / 200);
      if (Number.isFinite(y) && y >= f.yr[0] && y <= f.yr[1]) visible++;
    }
    if (visible < 5) problems.push(`${where}: curve "${c.f}" is (almost) never inside the window`);
  }
  if (!f.curves?.length && !f.segments?.length && !f.points?.length) problems.push(`${where}: plot draws nothing`);
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
      const w = `${d.id} section ${i + 1} "${s.title}"`;
      if (!s.points.length && !s.formulas?.length) problems.push(`${w}: empty`);
      checkRich(s.intro, w, problems);
      s.points.forEach((p, j) => {
        checkRich(p.text, `${w} point ${j + 1}`, problems);
        checkRich(p.eg, `${w} point ${j + 1} eg`, problems);
        checkRich(p.term, `${w} point ${j + 1} term`, problems);
      });
      s.formulas?.forEach((f) => {
        try {
          katex.renderToString(f.tex, { throwOnError: true, displayMode: true });
        } catch (e) {
          problems.push(`${w} formula "${f.name}": ${(e as Error).message.split("\n")[0]}`);
        }
        if (f.tex.includes("$")) problems.push(`${w} formula "${f.name}": tex must not contain $`);
        checkRich(f.note, `${w} formula note`, problems);
      });
      s.table?.forEach((r) => r.forEach((c) => checkRich(c, `${w} table`, problems)));
      if (s.table && s.table.some((r) => r.length !== s.table![0].length)) problems.push(`${w}: ragged table`);
      s.figures?.forEach((f, j) => checkFig(f, `${w} figure ${j + 1}`, problems));
      s.worked?.forEach((x, j) => {
        checkRich(x.problem, `${w} worked ${j + 1}`, problems);
        checkRich(x.solution, `${w} worked ${j + 1}`, problems);
      });
    });

    for (const c of d.flashcards) {
      dup(c.id);
      if (!c.id.startsWith(pre)) problems.push(`${c.id}: id must start with ${pre}`);
      if (!c.front.trim() || !c.back.trim() || !c.why.trim()) problems.push(`${c.id}: empty front/back/why`);
      if (c.type === "concept" && !termMatches(c.back, c.back)) problems.push(`${c.id}: back does not match itself`);
      if (c.type === "concept" && c.back.includes("$")) problems.push(`${c.id}: concept back must be a plain term (no maths) so it can be typed`);
      [c.front, c.back, c.why].forEach((t) => checkRich(t, c.id, problems));
    }

    for (const q of d.quiz) {
      dup(q.id);
      if (!q.id.startsWith(pre)) problems.push(`${q.id}: id must start with ${pre}`);
      if (!q.explain?.trim()) problems.push(`${q.id}: no explanation`);
      checkRich(q.prompt, q.id, problems);
      checkRich(q.explain, q.id, problems);
      if (q.kind === "fill") {
        const n = q.prompt.split("____").length - 1;
        if (n !== q.answers.length) problems.push(`${q.id}: ${n} blanks but ${q.answers.length} answer lists`);
        if (/_{5,}/.test(q.prompt)) problems.push(`${q.id}: blank must be exactly 4 underscores`);
        for (const m of q.prompt.matchAll(/\$[^$]*\$/g)) if (m[0].includes("____")) problems.push(`${q.id}: blank inside maths`);
        q.answers.forEach((alts, i) => {
          if (!alts.length) problems.push(`${q.id}: blank ${i + 1} has no answers`);
          for (const a of alts) if (!blankCorrect(q, i, a)) problems.push(`${q.id}: accepted answer "${a}" is marked wrong`);
        });
        if (q.answers.length && blankCorrect(q, 0, "zzzz")) problems.push(`${q.id}: nonsense answer accepted`);
      } else {
        if (q.answer < 0 || q.answer >= q.options.length) problems.push(`${q.id}: answer index out of range`);
        if (new Set(q.options).size !== q.options.length) problems.push(`${q.id}: duplicate options`);
        q.options.forEach((o) => checkRich(o, q.id, problems));
      }
    }

    for (const q of d.exam) {
      dup(q.id);
      if (!q.id.startsWith(pre)) problems.push(`${q.id}: id must start with ${pre}`);
      const sum = q.rubric.reduce((a, r) => a + r.marks, 0);
      if (Math.abs(sum - q.marks) > 1e-9) problems.push(`${q.id}: rubric sums to ${sum}, marks is ${q.marks}`);
      if (q.marks !== 5) problems.push(`${q.id}: exam parts are 5 marks`);
      if (q.kind === "select") {
        if (!q.statements || q.statements.length < 4) problems.push(`${q.id}: select needs 4+ statements`);
        if (!q.wrong || q.wrong.length !== 2 || q.wrong.some((i) => i < 0 || i >= (q.statements?.length ?? 0))) problems.push(`${q.id}: select needs exactly 2 valid wrong indices`);
        q.statements?.forEach((s) => checkRich(s, q.id, problems));
      }
      if (!q.model.trim()) problems.push(`${q.id}: empty model answer`);
      [q.prompt, q.model, q.answer, ...q.rubric.map((r) => r.point)].forEach((t) => checkRich(t, q.id, problems));
      q.figures?.forEach((f, j) => checkFig(f, `${q.id} figure ${j + 1}`, problems));
    }

    const k = (s: string) => d.exam.filter((q) => q.kind === s).length;
    console.log(
      `${d.id.padEnd(16)} sections ${String(d.sections.length).padStart(2)} · points ${String(d.sections.reduce((a, s) => a + s.points.length, 0)).padStart(3)} · figs ${String(d.sections.reduce((a, s) => a + (s.figures?.length ?? 0), 0)).padStart(2)} · cards ${String(d.flashcards.length).padStart(3)} (${d.flashcards.filter((c) => c.type === "method").length} method) · quiz fill ${String(d.quiz.filter((q) => q.kind === "fill").length).padStart(3)} mcq ${String(d.quiz.filter((q) => q.kind === "mcq").length).padStart(3)} · exam calc ${k("calc")} proof ${k("proof")} select ${k("select")} explain ${k("explain")}`,
    );
  }

  if (problems.length) {
    console.log(`\n${problems.length} problem(s):\n` + problems.map((p) => "  - " + p).join("\n"));
    process.exit(1);
  }
  console.log("All checks passed.");
}

main();
