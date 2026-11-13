// Validates the SC1001 bank and problems with the same Pyodide build and harness the site uses:
//   npm run check:sc1001                 everything
//   npm run check:sc1001 -- strings      only questions/problems whose topic or slug contains "strings"
import { loadPyodide, type PyodideInterface } from "pyodide";
import { getProblems, getScBank } from "../src/lib/sc1001/bank";
import { HARNESS, type RunResult } from "../src/lib/sc1001/harness";
import { normalizeOutput, sameOutput } from "../src/lib/sc1001/judge";
import { SC_TOPICS } from "../src/lib/sc1001/topics";

const filter = process.argv[2];
const errors: string[] = [];
const fail = (where: string, msg: string) => errors.push(`${where}: ${msg}`);
// UTF-8 text saved as Windows-1252 and re-read, e.g. "≤" showing as "â‰¤".
const MOJIBAKE = /[\u00e2\u00c3\u00c2][\u0080-\u2122]/;

async function main() {
  const py: PyodideInterface = await loadPyodide();
  py.runPython(HARNESS);
  const runFn = py.globals.get("_sc_run");
  const run = (code: string, stdin = ""): RunResult => {
    const r = runFn(code, stdin);
    const [stdout, stderr, error, ms] = r.toJs();
    r.destroy();
    return { stdout, stderr, error: error ?? null, ms };
  };

  // ---- questions ----
  const bank = getScBank().filter((q) => !filter || q.topic.includes(filter));
  const seenPrompts = new Map<string, string>();
  let verified = 0;
  for (const q of bank) {
    // Code is compared exactly: two snippets that differ only in indentation are different questions.
    const key = q.prompt.replace(/\s+/g, " ").trim() + "\n" + (q.code ?? "").trimEnd();
    if (seenPrompts.has(key)) fail(q.id, `duplicate of ${seenPrompts.get(key)}`);
    seenPrompts.set(key, q.id);
    if (MOJIBAKE.test(JSON.stringify(q))) fail(q.id, "garbled characters (encoding problem)");
    if (!q.prompt.trim() || !q.solution.trim()) fail(q.id, "empty prompt or solution");
    if (q.kind === "mcq") {
      if (q.options.length !== 4) fail(q.id, `expected 4 options, got ${q.options.length}`);
      // Trailing spaces are invisible on screen and ignored when output is compared, so options must differ without them.
      if (new Set(q.options.map((o) => normalizeOutput(o))).size !== q.options.length) fail(q.id, "options that look identical (differ only in trailing whitespace)");
      if (!(q.answer >= 0 && q.answer < q.options.length)) fail(q.id, `answer index ${q.answer} out of range`);
    } else if (q.kind === "short") {
      if (!q.accept.length || q.accept.some((a) => !a.trim())) fail(q.id, "short answer needs non-empty accept[]");
    } else {
      if (!q.modelAnswer.trim() || !q.rubric.length) fail(q.id, "open question needs modelAnswer and rubric");
      if (q.rubric.some((r) => !(r.marks > 0))) fail(q.id, "rubric marks must be > 0");
    }
    if (q.verify) {
      if (!q.code) {
        fail(q.id, "verify set but no code");
        continue;
      }
      if (q.kind === "open") {
        fail(q.id, "verify is only for mcq/short");
        continue;
      }
      const r = run(q.code);
      // A snippet that is meant to crash is verified against its error's last line (e.g. "ZeroDivisionError: division by zero").
      const actual = r.error ? (r.stdout + r.error.trim().split("\n").pop()).trim() : r.stdout;
      const expected = q.kind === "mcq" ? q.options[q.answer] : q.accept[0];
      if (!sameOutput(actual, expected)) fail(q.id, `expected ${JSON.stringify(expected)} but code prints ${JSON.stringify(actual)}`);
      else verified++;
    }
  }

  // ---- problems ----
  const problems = getProblems().filter((p) => !filter || p.slug.includes(filter) || p.topics.some((t) => t.includes(filter)));
  const slugs = new Set<string>();
  for (const p of problems) {
    const at = `problem ${p.slug}`;
    if (slugs.has(p.slug)) fail(at, "duplicate slug");
    slugs.add(p.slug);
    if (MOJIBAKE.test(JSON.stringify(p))) fail(at, "garbled characters (encoding problem)");
    if (p.tests.length < 5) fail(at, `only ${p.tests.length} hidden tests`);
    if (!p.samples.length) fail(at, "no samples");
    const limit = p.timeLimitMs ?? 3000;
    [...p.samples.map((c, i) => ({ c, name: `sample ${i + 1}` })), ...p.tests.map((c, i) => ({ c, name: `test ${i + 1}` }))].forEach(({ c, name }) => {
      const r = run(p.reference, c.input);
      if (r.error) fail(at, `reference crashes on ${name}: ${r.error.trim().split("\n").pop()}`);
      else if (!sameOutput(r.stdout, c.output)) fail(at, `reference output differs on ${name}: got ${JSON.stringify(r.stdout.slice(0, 200))}, expected ${JSON.stringify(c.output.slice(0, 200))}`);
      else if (r.ms > limit / 3) fail(at, `reference takes ${Math.round(r.ms)} ms on ${name} (limit ${limit} ms) — too close to the limit`);
    });
    const starterPassesAll = p.tests.every((c) => {
      const r = run(p.starter, c.input);
      return !r.error && sameOutput(r.stdout, c.output);
    });
    if (starterPassesAll) fail(at, "starter code already passes every test");
  }

  // ---- summary ----
  const all = getScBank();
  console.log("Questions per topic:");
  for (const t of SC_TOPICS) {
    const qs = all.filter((q) => q.topic === t.id);
    const k = (kind: string) => qs.filter((q) => q.kind === kind).length;
    console.log(`  ${t.id.padEnd(24)} ${String(qs.length).padStart(3)}  (mcq ${k("mcq")}, short ${k("short")}, open ${k("open")})`);
  }
  console.log(`Total ${all.length} questions, ${getProblems().length} problems; ${verified} outputs verified by running.`);
  if (errors.length) {
    console.error(`\n${errors.length} problem(s):\n` + errors.map((e) => "  - " + e).join("\n"));
    process.exit(1);
  }
  console.log("OK");
}

main();
