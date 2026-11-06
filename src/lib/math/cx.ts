// Complex numbers with exact rational parts (j = sqrt(-1), as in the course notes).
import { F, Frac } from "./frac";

export class Cx {
  constructor(readonly re: Frac, readonly im: Frac) {}

  static of(re: number | Frac, im: number | Frac = 0): Cx {
    return new Cx(Frac.of(re), Frac.of(im));
  }

  add(o: Cx): Cx {
    return new Cx(this.re.add(o.re), this.im.add(o.im));
  }
  sub(o: Cx): Cx {
    return new Cx(this.re.sub(o.re), this.im.sub(o.im));
  }
  mul(o: Cx): Cx {
    return new Cx(this.re.mul(o.re).sub(this.im.mul(o.im)), this.re.mul(o.im).add(this.im.mul(o.re)));
  }
  scale(k: Frac | number): Cx {
    return new Cx(this.re.mul(k), this.im.mul(k));
  }
  conj(): Cx {
    return new Cx(this.re, this.im.neg());
  }
  abs2(): Frac {
    return this.re.mul(this.re).add(this.im.mul(this.im));
  }
  div(o: Cx): Cx {
    const d = o.abs2();
    return this.mul(o.conj()).scale(F(1).div(d));
  }
  pow(k: number): Cx {
    let r = Cx.of(1);
    for (let i = 0; i < k; i++) r = r.mul(this);
    return r;
  }
  neg(): Cx {
    return new Cx(this.re.neg(), this.im.neg());
  }
  eq(o: Cx): boolean {
    return this.re.eq(o.re) && this.im.eq(o.im);
  }
  isZero(): boolean {
    return this.re.isZero() && this.im.isZero();
  }

  /** Rectangular LaTeX, e.g. 3 - 2j, -j, \frac{1}{2} + \frac{3}{2}j. */
  tex(): string {
    const { re, im } = this;
    if (im.isZero()) return re.tex();
    const imAbs = im.abs();
    const imStr = imAbs.eq(1) ? "j" : imAbs.isInt() ? `${imAbs.n}j` : `${imAbs.tex()}j`;
    if (re.isZero()) return im.n < 0 ? `-${imStr}` : imStr;
    return `${re.tex()} ${im.n < 0 ? "-" : "+"} ${imStr}`;
  }
}

/** e^{-j 2π m / N} for integer m, exact only when the result is in {±1, ±j}. */
export function unitRoot(m: number, N: number): Cx | null {
  const t = (((m % N) + N) % N) * 4;
  if (t % N !== 0) return null;
  const q = t / N; // quarter turns clockwise
  return [Cx.of(1), Cx.of(0, -1), Cx.of(-1), Cx.of(0, 1)][q];
}

export const cxVecTex = (v: Cx[]) => `[${v.map((z) => z.tex()).join(",\\ ")}]^T`;
