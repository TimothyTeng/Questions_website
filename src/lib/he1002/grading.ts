import type { FillQ, QuizQ } from "./types";

/** fill: one string per blank · mcq: chosen index. */
export type Response = string[] | number | undefined;

const FILLERS = new Set(["the", "a", "an"]);

/** Lowercase, unify quotes/dashes, drop punctuation and leading articles. */
export function norm(s: string): string {
  const words = s
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[-–—/]/g, " ")
    .replace(/[^a-z0-9.'* ]/g, " ")
    .replace(/\.(?!\d)/g, " ")
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

function close(a: string, b: string): boolean {
  if (a === b) return true;
  const x = spelling(a).replace(/ /g, "");
  const y = spelling(b).replace(/ /g, "");
  if (x === y) return true;
  // Short words get no slack so near-twins like "real"/"rent" or "rise"/"fall" stay distinct.
  const tol = y.length <= 7 ? 0 : y.length <= 12 ? 1 : y.length <= 18 ? 2 : 3;
  return lev(x, y) <= tol;
}

/** "$1,200.50", "57.5%", "-3", "0.8" → number; anything with words in it → null. */
export function parseNum(s: string): number | null {
  const t = s.trim().replace(/[$,\s]/g, "").replace(/%$/, "").replace(/^\+/, "").replace(/[−–]/g, "-");
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return null;
  return Number(t);
}

/** Accept the student's number if it rounds to the key at the key's precision (±half a unit in the last place, at least ±0.05). */
function numClose(given: number, key: string, keyNum: number): boolean {
  const dec = (key.replace(/[^0-9.]/g, "").split(".")[1] ?? "").length;
  const tol = Math.max(0.5 * 10 ** -dec, 0.05) + 1e-9;
  return Math.abs(given - keyNum) <= tol || (Math.abs(keyNum) >= 100 && Math.abs(given - keyNum) / Math.abs(keyNum) <= 0.005);
}

/** Words printed right next to a blank (e.g. "____ unemployment") may be typed again without penalty. */
function context(prompt: string, blank: number): { before: string; after: string } {
  const parts = prompt.split("____");
  const before = norm(parts[blank] ?? "").split(" ").pop() ?? "";
  const after = norm(parts[blank + 1] ?? "").split(" ")[0] ?? "";
  return { before, after };
}

export function blankCorrect(q: FillQ, i: number, given: string | undefined): boolean {
  if (!given || !given.trim()) return false;
  const gNum = parseNum(given);
  const keys = q.answers[i];
  if (gNum !== null) {
    for (const a of keys) {
      const k = parseNum(a);
      if (k !== null && numClose(gNum, a, k)) return true;
    }
  }
  const g = norm(given);
  const { before, after } = context(q.prompt, i);
  const variants = new Set([g]);
  let w = g.split(" ");
  if (after && w.length > 1 && w[w.length - 1] === after) w = w.slice(0, -1);
  variants.add(w.join(" "));
  if (before && w.length > 1 && w[0] === before) variants.add(w.slice(1).join(" "));
  return keys.some((a) => {
    if (parseNum(a) !== null) return false;
    const target = norm(a);
    return [...variants].some((v) => close(v, target));
  });
}

/** Typed-guess check used by concept flashcards. Accepts any alternative written as "A / B" or "A (B)". */
export function termMatches(guess: string, answer: string): boolean {
  if (!guess.trim()) return false;
  const g = norm(guess);
  const alts = answer
    .split(/\/|\(|\)|;|,| or /i)
    .map((s) => norm(s))
    .filter(Boolean);
  alts.push(norm(answer));
  const strip = (s: string) => s.replace(/ (effect|theory|curve|rate|market)$/, "");
  return alts.some((a) => close(g, a) || close(strip(g), strip(a)));
}

export function answered(q: QuizQ, r: Response): boolean {
  if (q.kind === "mcq") return typeof r === "number";
  return Array.isArray(r) && r.some((x) => x && x.trim());
}

/** Each quiz question is worth 1 mark; blanks share it equally. */
export function scoreOf(q: QuizQ, r: Response): { got: number; max: number } {
  if (q.kind === "mcq") return { got: r === q.answer ? 1 : 0, max: 1 };
  const given = Array.isArray(r) ? r : [];
  const right = q.answers.filter((_, i) => blankCorrect(q, i, given[i])).length;
  return { got: right / q.answers.length, max: 1 };
}

export const isCorrect = (q: QuizQ, r: Response) => {
  const { got, max } = scoreOf(q, r);
  return got === max;
};

export const fmtScore = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
