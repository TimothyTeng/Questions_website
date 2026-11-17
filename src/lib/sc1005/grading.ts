import { equivalent, literalCount, parseExpr } from "./logic";
import { marksFor, type Draft, type ShortQ } from "./types";

/** A response: option index for MCQ, text for short / open. */
export type Response = number | string | undefined;

/** Rubric scores for an open question, ticked by the student. */
export interface OpenMark {
  scores: number[];
}

const loose = (s: string) => s.replace(/[\s_]/g, "").toLowerCase();

export interface ShortVerdict {
  ok: boolean;
  /** Why a typed expression was not accepted (parse error, not minimal…). */
  note?: string;
}

export function checkShort(q: ShortQ, r: Response): ShortVerdict {
  if (typeof r !== "string" || !r.trim()) return { ok: false };
  const match = q.match ?? "text";
  if (match === "number") {
    const x = Number(r.replace(/[\s,]/g, ""));
    return { ok: Number.isFinite(x) && q.accept.some((a) => Math.abs(Number(a) - x) < 1e-9) };
  }
  if (match === "expr") {
    const vars = q.vars ?? [];
    let mine;
    try {
      mine = parseExpr(r, vars);
    } catch (e) {
      return { ok: false, note: `Could not read your expression: ${(e as Error).message}.` };
    }
    const ref = parseExpr(q.accept[0], vars);
    if (!equivalent(mine, ref, vars, q.dontCares)) return { ok: false, note: "Not equivalent to the function (some input row gives a different output)." };
    if (q.minimal && literalCount(mine) > literalCount(ref)) return { ok: false, note: `Equivalent, but not minimal: ${literalCount(mine)} literals vs ${literalCount(ref)} in the minimum.` };
    return { ok: true };
  }
  return { ok: q.accept.some((a) => loose(a) === loose(r)) };
}

export function scoreOf(q: Draft, r: Response, mark?: OpenMark): { got: number; max: number } {
  const max = marksFor(q);
  if (q.kind === "mcq") return { got: r === q.answer ? 1 : 0, max };
  if (q.kind === "short") return { got: checkShort(q, r).ok ? 1 : 0, max };
  return { got: mark ? mark.scores.reduce((s, x) => s + x, 0) : 0, max };
}

/** Counts as "correct" for the got-it-wrong pool: full marks for MCQ/short, at least 60% for open. */
export const isCorrect = (q: Draft, r: Response, mark?: OpenMark) => {
  const { got, max } = scoreOf(q, r, mark);
  return q.kind === "open" ? got >= 0.6 * max : got === max;
};

export const answered = (r: Response) => (typeof r === "number" ? true : typeof r === "string" && r.trim() !== "");
