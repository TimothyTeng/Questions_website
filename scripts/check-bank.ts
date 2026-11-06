// Sanity-checks the question bank: counts, option shape, duplicates, and that every
// $...$ / $$...$$ fragment renders in KaTeX. Run with: npm run check
import katex from "katex";
import { getBank } from "../src/lib/bank";
import { lessons } from "../src/data/lessons";

const bank = getBank();
let errors = 0;
const fail = (id: string, msg: string) => {
  errors++;
  if (errors < 60) console.error(`✗ ${id}: ${msg}`);
};

function checkTex(id: string, s: string) {
  if ((s.match(/(?<!\\)\$/g)?.length ?? 0) % 2) fail(id, `odd number of $ in: ${s.slice(0, 80)}`);
  const parts = s.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);
  for (const p of parts) {
    if (!p.startsWith("$")) continue;
    const display = p.startsWith("$$");
    const tex = display ? p.slice(2, -2) : p.slice(1, -1);
    try {
      katex.renderToString(tex, { displayMode: display, throwOnError: true });
    } catch (e) {
      fail(id, `KaTeX: ${(e as Error).message.slice(0, 120)} in ${tex.slice(0, 80)}`);
    }
  }
}

const byTopic: Record<string, number> = {};
const answerPos: Record<string, number[]> = {};
for (const q of bank) {
  byTopic[q.topic] = (byTopic[q.topic] ?? 0) + 1;
  if (q.answer < 0 || q.answer >= q.options.length) fail(q.id, "answer out of range");
  if (q.kind === "mcq" && q.options.length !== 5) fail(q.id, `mcq has ${q.options.length} options`);
  if (new Set(q.options).size !== q.options.length) fail(q.id, `duplicate options: ${q.options.join(" | ")}`);
  for (const s of [q.prompt, q.solution, ...q.options]) checkTex(q.id, s);
  (answerPos[q.kind] ??= [0, 0, 0, 0, 0])[q.answer]++;
}
const prompts = new Set<string>();
for (const q of bank) {
  if (prompts.has(q.prompt)) fail(q.id, "duplicate prompt");
  prompts.add(q.prompt);
}
for (const l of lessons) {
  const strs = [l.bigPicture, ...l.playbook, ...l.sections.flatMap((s) => [s.title, s.intuition, ...s.keyIdeas, ...(s.pitfalls ?? []), ...s.recall.flatMap((r) => [r.q, r.a]), ...(s.example ? [s.example.problem, s.example.answer, ...s.example.steps] : [])])];
  strs.forEach((s) => checkTex(`lesson:${l.topic}`, s));
  (l.sections.flatMap((s) => s.formulas ?? [])).forEach((f) => checkTex(`lesson:${l.topic}`, `$$${f}$$`));
}

console.log(`total ${bank.length}`, byTopic);
console.log("answer positions", answerPos);
if (errors) {
  console.error(`${errors} problem(s)`);
  process.exit(1);
}
console.log("bank OK");
