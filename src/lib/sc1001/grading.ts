import { normalizeOutput } from "./judge";
import { marksFor, type ScQuestion, type ShortQ } from "./types";

/** A response: option index for MCQ, text for short / open. */
export type Response = number | string | undefined;

/** Rubric scores for an open question, from the AI or ticked by the student. */
export interface OpenMark {
  scores: number[];
  feedback?: string;
  by: "ai" | "self";
}

const canon = (s: string) => normalizeOutput(s.trim()).replace(/^['"]([\s\S]*)['"]$/, "$1");

export function shortCorrect(q: ShortQ, r: Response): boolean {
  if (typeof r !== "string" || !r.trim()) return false;
  // Program output must match exactly (Python prints True, not true); other answers ignore case and spacing.
  if (q.verify) return q.accept.some((a) => canon(a) === canon(r));
  const loose = (s: string) => canon(s).replace(/\s+/g, "").toLowerCase();
  return q.accept.some((a) => loose(a) === loose(r));
}

export function scoreOf(q: ScQuestion, r: Response, mark?: OpenMark): { got: number; max: number; pending?: boolean } {
  const max = marksFor(q);
  if (q.kind === "mcq") return { got: r === q.answer ? 1 : 0, max };
  if (q.kind === "short") return { got: shortCorrect(q, r) ? 1 : 0, max };
  if (!mark) return { got: 0, max, pending: typeof r === "string" && !!r.trim() };
  return { got: mark.scores.reduce((s, x) => s + x, 0), max };
}

/** Counts as "correct" for the got-it-wrong pool: full marks for MCQ/short, at least 60% for open. */
export const isCorrect = (q: ScQuestion, r: Response, mark?: OpenMark) => {
  const { got, max } = scoreOf(q, r, mark);
  return q.kind === "open" ? got >= 0.6 * max : got === max;
};

export const answered = (r: Response) => (typeof r === "number" ? true : typeof r === "string" && r.trim() !== "");
