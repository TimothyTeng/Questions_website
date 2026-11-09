// Small float vector helpers for the interactive figures.

export type V2 = [number, number];
export type V3 = [number, number, number];

export const add = <T extends number[]>(a: T, b: T) => a.map((x, i) => x + b[i]) as T;
export const sub = <T extends number[]>(a: T, b: T) => a.map((x, i) => x - b[i]) as T;
export const scale = <T extends number[]>(a: T, k: number) => a.map((x) => x * k) as T;
export const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);
export const norm = (a: number[]) => Math.sqrt(dot(a, a));
export const unit = <T extends number[]>(a: T) => scale(a, 1 / (norm(a) || 1));
export const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** Projection of y onto the line through u. */
export const proj = <T extends number[]>(y: T, u: T) => scale(u, dot(y, u) / (dot(u, u) || 1));

/** Format a number for readouts: integers stay integers, otherwise 2 dp. */
export function fmt(x: number, dp = 2): string {
  if (Math.abs(x) < 1e-9) return "0";
  const r = Math.round(x);
  if (Math.abs(x - r) < 1e-9) return String(r);
  return x.toFixed(dp);
}
export const fmtV = (v: number[], dp = 2) => `[${v.map((x) => fmt(x, dp)).join(",\\ ")}]^T`;

export const snap = (x: number, step = 0.5) => Math.round(x / step) * step;

export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
