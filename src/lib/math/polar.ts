// Exact polar forms r·e^{jθ} with r² rational and θ a rational multiple of π
// whose cosine/sine are expressible with square roots (multiples of π/4 and π/6).
import { F, Frac, sqrtTex } from "./frac";

/** Normalise an angle p (meaning p·π) into (-1, 1]. */
export function normAngle(p: Frac): Frac {
  let x = p;
  while (x.cmp(1) > 0) x = x.sub(2);
  while (x.cmp(-1) <= 0) x = x.add(2);
  return x;
}

/** LaTeX for p·π, e.g. \frac{2\pi}{3}, -\frac{\pi}{4}, \pi, 0. */
export function angleTex(p: Frac): string {
  if (p.isZero()) return "0";
  const sign = p.n < 0 ? "-" : "";
  const a = Math.abs(p.n);
  const num = a === 1 ? "\\pi" : `${a}\\pi`;
  return p.d === 1 ? `${sign}${num}` : `${sign}\\frac{${num}}{${p.d}}`;
}

const COS2: Record<number, Frac> = { 0: F(1), 30: F(3, 4), 45: F(1, 2), 60: F(1, 4), 90: F(0), 120: F(1, 4), 135: F(1, 2), 150: F(3, 4) };

function cos2(p: Frac): Frac {
  const deg = (((p.n * 180) / p.d) % 180 + 180) % 180;
  const v = COS2[deg];
  if (!v) throw new Error("retry");
  return v;
}

/** Signed square-root LaTeX for ±sqrt(x). */
function sgnSqrt(sign: number, x: Frac): string {
  if (x.isZero() || sign === 0) return "0";
  return `${sign < 0 ? "-" : ""}${sqrtTex(x)}`;
}

/** Real and imaginary parts (LaTeX) of sqrt(R)·e^{jpπ}. */
export function rectParts(R: Frac, p: Frac): { re: string; im: string } {
  const th = (p.n / p.d) * Math.PI;
  const c2 = cos2(p);
  const s2 = F(1).sub(c2);
  const sc = Math.abs(Math.cos(th)) < 1e-12 ? 0 : Math.sign(Math.cos(th));
  const ss = Math.abs(Math.sin(th)) < 1e-12 ? 0 : Math.sign(Math.sin(th));
  return { re: sgnSqrt(sc, R.mul(c2)), im: sgnSqrt(ss, R.mul(s2)) };
}

/** Combine real/imag LaTeX parts into "a + bj". */
export function joinRect(re: string, im: string): string {
  if (im === "0") return re;
  const neg = im.startsWith("-");
  const mag = neg ? im.slice(1) : im;
  const imStr = mag === "1" ? "j" : mag.startsWith("\\frac") ? `${mag}\\,j` : `${mag}j`;
  if (re === "0") return neg ? `-${imStr}` : imStr;
  return `${re} ${neg ? "-" : "+"} ${imStr}`;
}

export function rectTex(R: Frac, p: Frac): string {
  const { re, im } = rectParts(R, p);
  return joinRect(re, im);
}

/** sqrt(R)·e^{j p π} in exponential LaTeX. */
export function expTex(R: Frac, p: Frac): string {
  const r = sqrtTex(R);
  const pre = r === "1" ? "" : r;
  if (p.isZero()) return r;
  return `${pre}e^{j${angleTex(p)}}`;
}
