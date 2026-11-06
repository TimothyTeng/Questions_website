// Exact rational arithmetic plus small matrix/vector helpers and LaTeX formatting.

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

export function lcm(a: number, b: number): number {
  return Math.abs((a / gcd(a, b)) * b);
}

export class Frac {
  readonly n: number;
  readonly d: number;

  constructor(n: number, d = 1) {
    if (d === 0) throw new Error("Frac: zero denominator");
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) throw new Error("Frac: non-integer");
    const g = gcd(n, d);
    const s = d < 0 ? -1 : 1;
    this.n = (s * n) / g;
    this.d = (s * d) / g;
  }

  static of(n: number | Frac, d = 1): Frac {
    return n instanceof Frac ? n : new Frac(n, d);
  }

  add(o: Frac | number): Frac {
    const b = Frac.of(o);
    return new Frac(this.n * b.d + b.n * this.d, this.d * b.d);
  }
  sub(o: Frac | number): Frac {
    return this.add(Frac.of(o).neg());
  }
  mul(o: Frac | number): Frac {
    const b = Frac.of(o);
    return new Frac(this.n * b.n, this.d * b.d);
  }
  div(o: Frac | number): Frac {
    const b = Frac.of(o);
    if (b.n === 0) throw new Error("Frac: divide by zero");
    return new Frac(this.n * b.d, this.d * b.n);
  }
  neg(): Frac {
    return new Frac(-this.n, this.d);
  }
  abs(): Frac {
    return new Frac(Math.abs(this.n), this.d);
  }
  pow(k: number): Frac {
    let r = new Frac(1);
    for (let i = 0; i < k; i++) r = r.mul(this);
    return r;
  }
  isZero(): boolean {
    return this.n === 0;
  }
  isInt(): boolean {
    return this.d === 1;
  }
  eq(o: Frac | number): boolean {
    const b = Frac.of(o);
    return this.n === b.n && this.d === b.d;
  }
  cmp(o: Frac | number): number {
    const b = Frac.of(o);
    return this.n * b.d - b.n * this.d;
  }
  valueOf(): number {
    return this.n / this.d;
  }
  /** LaTeX, e.g. -\frac{3}{4}. */
  tex(): string {
    if (this.d === 1) return String(this.n);
    const sign = this.n < 0 ? "-" : "";
    return `${sign}\\frac{${Math.abs(this.n)}}{${this.d}}`;
  }
}

export const F = (n: number, d = 1) => new Frac(n, d);

export type Vec = Frac[];
export type Mat = Frac[][];

export const vec = (xs: number[]): Vec => xs.map((x) => F(x));
export const mat = (rows: number[][]): Mat => rows.map((r) => vec(r));

export function dot(a: Vec, b: Vec): Frac {
  return a.reduce((s, x, i) => s.add(x.mul(b[i])), F(0));
}
export function vadd(a: Vec, b: Vec): Vec {
  return a.map((x, i) => x.add(b[i]));
}
export function vsub(a: Vec, b: Vec): Vec {
  return a.map((x, i) => x.sub(b[i]));
}
export function vscale(a: Vec, k: Frac | number): Vec {
  return a.map((x) => x.mul(k));
}
export function isZeroVec(a: Vec): boolean {
  return a.every((x) => x.isZero());
}
export function cross(a: Vec, b: Vec): Vec {
  return [
    a[1].mul(b[2]).sub(a[2].mul(b[1])),
    a[2].mul(b[0]).sub(a[0].mul(b[2])),
    a[0].mul(b[1]).sub(a[1].mul(b[0])),
  ];
}
/** Scale an integer vector down by the gcd of its entries (and make the first nonzero entry positive). */
export function primitive(a: Vec): Vec {
  const L = a.reduce((l, x) => lcm(l, x.d), 1);
  const ints = a.map((x) => x.mul(L).n);
  const g = ints.reduce((g2, x) => gcd(g2, x), 0) || 1;
  const first = ints.find((x) => x !== 0) ?? 1;
  const s = first < 0 ? -1 : 1;
  return ints.map((x) => F((s * x) / g));
}

export function transpose(A: Mat): Mat {
  return A[0].map((_, j) => A.map((r) => r[j]));
}
export function matmul(A: Mat, B: Mat): Mat {
  return A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s.add(x.mul(B[k][j])), F(0))));
}
export function matvec(A: Mat, x: Vec): Vec {
  return A.map((r) => dot(r, x));
}
export function identity(n: number): Mat {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => F(i === j ? 1 : 0)));
}
export function madd(A: Mat, B: Mat): Mat {
  return A.map((r, i) => r.map((x, j) => x.add(B[i][j])));
}
export function msub(A: Mat, B: Mat): Mat {
  return A.map((r, i) => r.map((x, j) => x.sub(B[i][j])));
}
export function mscale(A: Mat, k: Frac | number): Mat {
  return A.map((r) => r.map((x) => x.mul(k)));
}
export function columns(A: Mat): Vec[] {
  return transpose(A);
}
export function fromColumns(cols: Vec[]): Mat {
  return transpose(cols);
}
export function matEq(A: Mat, B: Mat): boolean {
  return A.length === B.length && A.every((r, i) => r.every((x, j) => x.eq(B[i][j])));
}

export function det(A: Mat): Frac {
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
  let s = F(0);
  for (let j = 0; j < n; j++) {
    const minor = A.slice(1).map((r) => r.filter((_, c) => c !== j));
    const term = A[0][j].mul(det(minor));
    s = j % 2 === 0 ? s.add(term) : s.sub(term);
  }
  return s;
}

/** Gauss–Jordan inverse; returns null when singular. */
export function inverse(A: Mat): Mat | null {
  const n = A.length;
  const M = A.map((r, i) => [...r, ...identity(n)[i]]);
  for (let c = 0; c < n; c++) {
    const p = M.findIndex((r, i) => i >= c && !r[c].isZero());
    if (p < 0) return null;
    [M[c], M[p]] = [M[p], M[c]];
    const pv = M[c][c];
    M[c] = M[c].map((x) => x.div(pv));
    for (let i = 0; i < n; i++) {
      if (i === c || M[i][c].isZero()) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x.sub(f.mul(M[c][j])));
    }
  }
  return M.map((r) => r.slice(n));
}

export function rank(A: Mat): number {
  const M = A.map((r) => [...r]);
  let rk = 0;
  const cols = M[0].length;
  for (let c = 0; c < cols && rk < M.length; c++) {
    const p = M.findIndex((r, i) => i >= rk && !r[c].isZero());
    if (p < 0) continue;
    [M[rk], M[p]] = [M[p], M[rk]];
    for (let i = rk + 1; i < M.length; i++) {
      const f = M[i][c].div(M[rk][c]);
      M[i] = M[i].map((x, j) => x.sub(f.mul(M[rk][j])));
    }
    rk++;
  }
  return rk;
}

export function solve(A: Mat, b: Vec): Vec | null {
  const inv = inverse(A);
  return inv ? matvec(inv, b) : null;
}

// ---------- LaTeX ----------

function commonDen(xs: Frac[]): number {
  return xs.reduce((l, x) => lcm(l, x.d), 1);
}

/** Column vector as a bmatrix, factoring out a common denominator: \frac{1}{3}\begin{bmatrix}..\end{bmatrix}. */
export function colTex(v: Vec): string {
  const L = commonDen(v);
  const body = v.map((x) => x.mul(L).tex()).join(" \\\\ ");
  const pre = L === 1 ? "" : `\\frac{1}{${L}}`;
  return `${pre}\\begin{bmatrix} ${body} \\end{bmatrix}`;
}

/** Row-with-transpose form used in CA2 options: \frac{1}{3}[2, -1, 4]^T. */
export function rowTex(v: Vec): string {
  const L = commonDen(v);
  const body = v.map((x) => x.mul(L).tex()).join(",\\ ");
  const pre = L === 1 ? "" : `\\frac{1}{${L}}`;
  return `${pre}[${body}]^T`;
}

/** Row-with-transpose form keeping each entry as its own fraction. */
export function rowTexPlain(v: Vec): string {
  return `[${v.map((x) => x.tex()).join(",\\ ")}]^T`;
}

export function matTex(A: Mat, factor = true): string {
  const L = factor ? commonDen(A.flat()) : 1;
  const body = A.map((r) => r.map((x) => x.mul(L).tex()).join(" & ")).join(" \\\\ ");
  const pre = L === 1 ? "" : `\\frac{1}{${L}}`;
  return `${pre}\\begin{bmatrix} ${body} \\end{bmatrix}`;
}

/** \sqrt{p/q} simplified to a\sqrt{b}/c form. */
export function sqrtTex(x: Frac): string {
  if (x.n < 0) throw new Error("sqrt of negative");
  if (x.n === 0) return "0";
  // sqrt(n/d) = sqrt(n*d)/d
  const N = x.n * x.d;
  let out = 1;
  let rest = N;
  for (let f = 2; f * f <= rest; f++) {
    while (rest % (f * f) === 0) {
      out *= f;
      rest /= f * f;
    }
  }
  const g = gcd(out, x.d);
  const num = out / g;
  const den = x.d / g;
  const rad = rest === 1 ? "" : `\\sqrt{${rest}}`;
  const numStr = rad ? (num === 1 ? rad : `${num}${rad}`) : String(num);
  return den === 1 ? numStr : `\\frac{${numStr}}{${den}}`;
}

/** Linear term like "+ 3\lambda" for polynomials. */
export function signed(x: Frac, first = false): string {
  if (first) return x.tex();
  return x.n < 0 ? `- ${x.abs().tex()}` : `+ ${x.tex()}`;
}
