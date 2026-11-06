// Building blocks shared by several topic generators.
import { cross, dot, F, Frac, isZeroVec, mat, Mat, primitive, transpose, vec, Vec } from "@/lib/math/frac";
import { retry, type Rng } from "./common";

export function randVec(rng: Rng, n: number, lo = -4, hi = 4): Vec {
  for (;;) {
    const v = vec(Array.from({ length: n }, () => rng.int(lo, hi)));
    if (!isZeroVec(v)) return v;
  }
}

export const maxAbs = (v: Vec) => Math.max(...v.map((x) => Math.abs(x.valueOf())));

export function parallel(a: Vec, b: Vec): boolean {
  // a ∥ b iff every 2x2 minor vanishes
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++) if (!a[i].mul(b[j]).sub(a[j].mul(b[i])).isZero()) return false;
  return true;
}

/** Integer vectors with integer length: [entries..., norm]. */
const PYTH3 = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [1, 4, 8, 9],
  [4, 4, 7, 9],
  [2, 6, 9, 11],
  [6, 6, 7, 11],
  [3, 4, 12, 13],
  [2, 10, 11, 15],
  [2, 5, 14, 15],
  [0, 3, 4, 5],
  [0, 5, 12, 13],
];
const PYTH4 = [
  [1, 1, 1, 1, 2],
  [1, 2, 2, 4, 5],
  [2, 4, 5, 6, 9],
  [1, 1, 3, 5, 6],
  [2, 2, 4, 5, 7],
];

export function pythVec(rng: Rng, n: 3 | 4): { v: Vec; norm: number } {
  const row = rng.pick(n === 3 ? PYTH3 : PYTH4);
  const entries = rng.shuffle(row.slice(0, n)).map((x) => (rng.chance(0.4) ? -x : x));
  return { v: vec(entries), norm: row[n] };
}

/** Random pair of orthogonal small integer vectors in R^n (n = 3 or 4). */
export function orthPair(rng: Rng, n: 3 | 4): [Vec, Vec] {
  for (let t = 0; t < 200; t++) {
    const a = randVec(rng, n, -2, 2);
    if (n === 3) {
      const b = primitive(cross(a, randVec(rng, 3, -2, 2)));
      if (isZeroVec(b) || maxAbs(b) > 4) continue;
      if (rng.chance(0.5)) return [a, b.map((x) => x.neg())];
      return [a, b];
    }
    const head = randVec(rng, 3, -2, 2);
    if (a[3].isZero()) continue;
    const s = dot(a.slice(0, 3), head);
    const last = s.neg().div(a[3]);
    if (!last.isInt() || Math.abs(last.n) > 4) continue;
    const b = [...head, last];
    if (!isZeroVec(b)) return [a, b];
  }
  retry();
}

/** Orthogonal (not normalised) basis of R^3 with small integer entries. */
export function orthBasis3(rng: Rng): [Vec, Vec, Vec] {
  for (let t = 0; t < 200; t++) {
    const [a, b] = orthPair(rng, 3);
    const c = primitive(cross(a, b));
    if (maxAbs(c) <= 6) return [a, b, c];
  }
  retry();
}

/** k * (integer orthogonal matrix) with orthonormal columns. */
const ORTHO_BASES: { k: number; M: number[][] }[] = [
  { k: 3, M: [[1, 2, 2], [2, 1, -2], [2, -2, 1]] },
  { k: 7, M: [[2, 3, 6], [3, -6, 2], [6, 2, -3]] },
  { k: 9, M: [[1, 4, 8], [4, 7, -4], [8, -4, 1]] },
  { k: 9, M: [[4, 4, 7], [1, -8, 4], [8, -1, -4]] },
  { k: 2, M: [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]] },
];

/** Random orthogonal matrix U = M / k (signed row/column permutations of a known one). */
export function orthoMatrix(rng: Rng, size?: 3 | 4): { M: Mat; k: number; U: Mat } {
  const pool = ORTHO_BASES.filter((b) => !size || b.M.length === size);
  const base = rng.pick(pool);
  const n = base.M.length;
  const rp = rng.shuffle([...Array(n).keys()]);
  const cp = rng.shuffle([...Array(n).keys()]);
  const rs = rp.map(() => (rng.chance(0.5) ? -1 : 1));
  const cs = cp.map(() => (rng.chance(0.5) ? -1 : 1));
  const M = mat(rp.map((r, i) => cp.map((c, j) => base.M[r][c] * rs[i] * cs[j])));
  const U = M.map((r) => r.map((x) => x.div(base.k)));
  return { M, k: base.k, U };
}

export function toFrac(x: number | Frac): Frac {
  return Frac.of(x);
}

export const T = transpose;
export { F };
