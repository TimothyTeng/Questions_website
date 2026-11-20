import type { FillQ, Question } from "./types";

/** fill: one string per blank · mcq: chosen index · written: indices of model points the student ticked. */
export type Response = string[] | number | undefined;
/** Written answers are self-marked: the set of model points awarded. */
export type WrittenMark = number[];

const FILLERS = new Set(["the", "a", "an"]);

/** Lowercase, unify quotes/dashes, drop punctuation and leading articles. */
export function norm(s: string): string {
  const words = s
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[-–—/]/g, " ")
    .replace(/[^a-z0-9' ]/g, " ")
    .replace(/'s\b/g, "s")
    .replace(/'/g, "")
    .split(/\s+/)
    .filter(Boolean);
  while (words.length > 1 && FILLERS.has(words[0])) words.shift();
  return words.join(" ");
}

/** British → American spelling noise we should never mark wrong. */
function spelling(s: string): string {
  return s
    .replace(/our\b/g, "or")
    .replace(/is(e|ed|es|ing|ation)\b/g, "iz$1")
    .replace(/ae/g, "e")
    .replace(/oe/g, "e");
}

function lev(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

/** Spelling slips are not penalised (per the course's marking note), but a different term is. */
function close(a: string, b: string): boolean {
  if (a === b) return true;
  const x = spelling(a).replace(/ /g, "");
  const y = spelling(b).replace(/ /g, "");
  if (x === y) return true;
  // Short words get no slack so near-twins like "primacy"/"primary" or "id"/"ego" stay distinct.
  const tol = y.length <= 7 ? 0 : y.length <= 12 ? 1 : y.length <= 18 ? 2 : 3;
  return lev(x, y) <= tol;
}

/** Words printed right next to a blank (e.g. "____ reinforcement") may be typed again without penalty. */
function context(prompt: string, blank: number): { before: string; after: string } {
  const parts = prompt.split("____");
  const before = norm(parts[blank] ?? "").split(" ").pop() ?? "";
  const after = norm(parts[blank + 1] ?? "").split(" ")[0] ?? "";
  return { before, after };
}

export function blankCorrect(q: FillQ, i: number, given: string | undefined): boolean {
  if (!given || !given.trim()) return false;
  const g = norm(given);
  const { before, after } = context(q.prompt, i);
  const variants = new Set([g]);
  let w = g.split(" ");
  if (after && w.length > 1 && w[w.length - 1] === after) w = w.slice(0, -1);
  variants.add(w.join(" "));
  if (before && w.length > 1 && w[0] === before) variants.add(w.slice(1).join(" "));
  return q.answers[i].some((a) => {
    const target = norm(a);
    return [...variants].some((v) => close(v, target));
  });
}

/** Typed-guess check used by the flashcards (answers like "Negative reinforcement" or "Id"). */
export function termMatches(guess: string, answer: string): boolean {
  if (!guess.trim()) return false;
  const g = norm(guess);
  // Accept any alternative written as "A / B" or "A (B)" in the answer.
  const alts = answer
    .split(/\/|\(|\)|;| or /i)
    .map((s) => norm(s))
    .filter(Boolean);
  alts.push(norm(answer));
  return alts.some((a) => close(g, a) || close(g.replace(/ (effect|theory|bias|heuristic|disorder)$/, ""), a.replace(/ (effect|theory|bias|heuristic|disorder)$/, "")));
}

export function answered(q: Question, r: Response): boolean {
  if (q.kind === "mcq") return typeof r === "number";
  if (q.kind === "fill") return Array.isArray(r) && r.some((x) => x && x.trim());
  return Array.isArray(r) && r.length > 0 && typeof r[0] === "string" && r[0].trim().length > 0;
}

/** Marks: fill = 1 (split evenly over blanks, as the course gives partial credit for two-blank items), mcq = 1, written = its marks. */
export function scoreOf(q: Question, r: Response, mark?: WrittenMark): { got: number; max: number } {
  if (q.kind === "mcq") return { got: r === q.answer ? 1 : 0, max: 1 };
  if (q.kind === "fill") {
    const given = Array.isArray(r) ? r : [];
    const right = q.answers.filter((_, i) => blankCorrect(q, i, given[i])).length;
    return { got: right / q.answers.length, max: 1 };
  }
  return { got: Math.min(q.marks, mark?.length ?? 0), max: q.marks };
}

export function isCorrect(q: Question, r: Response, mark?: WrittenMark): boolean {
  const { got, max } = scoreOf(q, r, mark);
  return q.kind === "written" ? got >= max / 2 : got === max;
}

export const fmtScore = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
