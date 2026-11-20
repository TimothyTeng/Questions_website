// Sanity checks for the HP1000 data: run with `npm run check:hp1000`.
import { ALL_CARDS, ALL_QUESTIONS, DATA } from "@/data/hp1000";
import { blankCorrect, termMatches } from "@/lib/hp1000/grading";

const problems: string[] = [];
const ids = new Set<string>();
const dup = (id: string) => {
  if (ids.has(id)) problems.push(`duplicate id ${id}`);
  ids.add(id);
};

for (const c of ALL_CARDS) {
  dup(c.id);
  if (!c.id.startsWith(c.topic + "-")) problems.push(`${c.id}: id does not match topic ${c.topic}`);
  if (!termMatches(c.answer, c.answer)) problems.push(`${c.id}: answer does not match itself`);
  if (!c.scenario.trim() || !c.why.trim()) problems.push(`${c.id}: empty scenario/why`);
}

for (const q of ALL_QUESTIONS) {
  dup(q.id);
  if (!q.id.startsWith(q.topic + "-")) problems.push(`${q.id}: id does not match topic ${q.topic}`);
  if (!q.explain?.trim()) problems.push(`${q.id}: no explanation`);
  if (q.kind === "fill") {
    const n = q.prompt.split("____").length - 1;
    if (n !== q.answers.length) problems.push(`${q.id}: ${n} blanks but ${q.answers.length} answer lists`);
    if (/_{5,}/.test(q.prompt)) problems.push(`${q.id}: blank must be exactly 4 underscores`);
    q.answers.forEach((alts, i) => {
      if (!alts.length) problems.push(`${q.id}: blank ${i + 1} has no answers`);
      for (const a of alts) if (!blankCorrect(q, i, a)) problems.push(`${q.id}: accepted answer "${a}" is marked wrong`);
    });
    if (q.answers.length && !blankCorrect(q, 0, "zzzz")) {
      /* expected */
    } else problems.push(`${q.id}: nonsense answer accepted`);
  } else if (q.kind === "mcq") {
    if (q.answer < 0 || q.answer >= q.options.length) problems.push(`${q.id}: answer index out of range`);
    if (new Set(q.options).size !== q.options.length) problems.push(`${q.id}: duplicate options`);
  } else if (q.points.length < 1 || q.marks < 1) problems.push(`${q.id}: written question needs points and marks`);
}

for (const d of DATA) {
  const k = (kind: string) => d.questions.filter((q) => q.kind === kind).length;
  console.log(
    `${d.id.padEnd(12)} sections ${String(d.sections.length).padStart(2)} · points ${String(d.sections.reduce((a, s) => a + s.points.length, 0)).padStart(3)} · cards ${String(d.flashcards.length).padStart(3)} · fill ${String(k("fill")).padStart(3)} · mcq ${String(k("mcq")).padStart(3)} · written ${k("written")} · official ${d.questions.filter((q) => q.official).length}`,
  );
}
console.log(`\n${ALL_QUESTIONS.length} questions, ${ALL_CARDS.length} flashcards`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n` + problems.map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log("All checks passed.");
