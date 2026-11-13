import type { RunResult } from "./harness";

// HackerEarth-style comparison: trailing spaces on each line and trailing blank lines are ignored.
export function normalizeOutput(s: string): string {
  const lines = s.replace(/\r\n?/g, "\n").split("\n").map((l) => l.trimEnd());
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines.join("\n");
}

export const sameOutput = (a: string, b: string) => normalizeOutput(a) === normalizeOutput(b);

export type Verdict = "AC" | "WA" | "RE" | "TLE";

export const VERDICT_LABEL: Record<Verdict, string> = {
  AC: "Accepted",
  WA: "Wrong Answer",
  RE: "Runtime Error",
  TLE: "Time Limit Exceeded",
};

export function verdictOf(r: RunResult, expected: string): Verdict {
  if (r.timedOut) return "TLE";
  if (r.error) return "RE";
  return sameOutput(r.stdout, expected) ? "AC" : "WA";
}
