import {
  det, F, Frac, identity, inverse, isZeroVec, mat, matmul, matTex, matvec, rank, rowTex, transpose, vec, type Mat,
  type Vec,
} from "@/lib/math/frac";
import { mcq, NONE, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

const zeros = (n: number): Vec => Array.from({ length: n }, () => F(0));
const maxAbsM = (A: Mat) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));

/** Reduced row echelon form and pivot columns. */
function rref(A: Mat): { R: Mat; piv: number[] } {
  const M = A.map((r) => [...r]);
  const m = M.length;
  const n = M[0].length;
  const piv: number[] = [];
  let row = 0;
  for (let c = 0; c < n && row < m; c++) {
    const p = M.findIndex((r, i) => i >= row && !r[c].isZero());
    if (p < 0) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const pv = M[row][c];
    M[row] = M[row].map((x) => x.div(pv));
    for (let i = 0; i < m; i++) {
      if (i === row || M[i][c].isZero()) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x.sub(f.mul(M[row][j])));
    }
    piv.push(c);
    row++;
  }
  return { R: M, piv };
}

/** Random m×n integer matrix of rank r with small entries, plus its RREF. */
function randRank(rng: Rng, m: number, n: number, r: number): { A: Mat; R: Mat; piv: number[] } {
  for (let t = 0; t < 300; t++) {
    const cols = rng.shuffle([...Array(n).keys()].slice(1)).slice(0, r - 1);
    const piv = (rng.chance(0.85) ? [0, ...cols] : rng.shuffle([...Array(n).keys()]).slice(0, r)).sort((a, b) => a - b);
    const R0: Mat = Array.from({ length: m }, () => zeros(n));
    piv.forEach((p, i) => {
      R0[i][p] = F(1);
      for (let j = p + 1; j < n; j++) if (!piv.includes(j)) R0[i][j] = F(rng.int(-3, 3));
    });
    // E = L·U with unit diagonals (det 1) mixes the rows.
    const L = identity(m).map((row, i) => row.map((x, j) => (j < i ? F(rng.int(-2, 2)) : x)));
    const U = identity(m).map((row, i) => row.map((x, j) => (j > i ? F(rng.int(-1, 1)) : x)));
    const A = matmul(matmul(L, U), R0);
    if (maxAbsM(A) > 9) continue;
    if (A.some((row) => row.every((x) => x.isZero()))) continue;
    if (transpose(A).some((c) => c.every((x) => x.isZero()))) continue;
    const { R, piv: p2 } = rref(A);
    if (p2.length !== r) continue;
    return { A, R, piv: p2 };
  }
  retry();
}

/** Is S a basis of the space spanned by `span` (all vectors of the same length, rank d)? */
function isBasisOf(S: Vec[], span: Vec[], d: number): boolean {
  if (S.length !== d || S.some((v) => v.length !== span[0].length)) return false;
  if (rank(S) !== d) return false;
  return rank([...span, ...S]) === d;
}

const setTex = (vs: Vec[]) => (vs.length ? `\\left\\{${vs.map(rowTex).join(",\\ ")}\\right\\}` : "\\{\\mathbf{0}\\}");

/** Linear combination like 4\mathbf{b}_1 - \mathbf{b}_2 (name "" = constant term). */
function lin(cs: Frac[], names: string[]): string {
  let s = "";
  cs.forEach((c, i) => {
    if (c.isZero()) return;
    const nm = names[i];
    const abs = c.abs();
    const body = nm === "" ? abs.tex() : abs.eq(1) ? nm : `${abs.tex()}${nm}`;
    if (!s) s = c.n < 0 ? `-${body}` : body;
    else s += c.n < 0 ? ` - ${body}` : ` + ${body}`;
  });
  return s || "0";
}

const polyTex = (c: Vec, v = "t") => lin(c, ["", v, `${v}^2`, `${v}^3`].slice(0, c.length));
const bf = (s: string, i: number) => `\\mathbf{${s}}_${i}`;

/** Linear expression "k + c" for display. */
const kExpr = (c: Frac) => (c.isZero() ? "k" : c.n < 0 ? `k - ${c.abs().tex()}` : `k + ${c.tex()}`);

function randInvertible(rng: Rng, n: number, lo: number, hi: number, dets: number[]): Mat {
  for (let t = 0; t < 400; t++) {
    const M = mat(Array.from({ length: n }, () => Array.from({ length: n }, () => rng.int(lo, hi))));
    const d = det(M);
    if (dets.includes(Math.abs(d.valueOf()))) return M;
  }
  retry();
}

function randIntVec(rng: Rng, n: number, lo: number, hi: number): Vec {
  for (;;) {
    const v = vec(Array.from({ length: n }, () => rng.int(lo, hi)));
    if (!isZeroVec(v)) return v;
  }
}

// ---------------------------------------------------------------- generators

/** Basis for the null space of an explicit matrix. */
function nullBasis(rng: Rng): Draft {
  const [m, n, r] = rng.pick([[3, 4, 2], [3, 5, 3], [3, 5, 2], [3, 4, 3], [4, 5, 3], [4, 5, 2]]);
  const { A, R, piv } = randRank(rng, m, n, r);
  const free = [...Array(n).keys()].filter((j) => !piv.includes(j));
  if (free.some((f) => piv.every((_, i) => R[i][f].isZero()))) retry();
  const build = (sign: 1 | -1, swap = false) =>
    free.map((f, k) => {
      const v = zeros(n);
      const at = swap && free.length > 1 ? free[(k + 1) % free.length] : f;
      v[at] = F(1);
      piv.forEach((p, i) => (v[p] = R[i][f].mul(-sign)));
      return v;
    });
  const basis = build(1);
  const span = basis;
  const cands: Vec[][] = [
    build(-1),
    R.slice(0, r),
    free.length > 1 ? build(1, true) : [],
    free.length > 1 ? basis.slice(0, 1) : [],
    [...basis, R[0]],
  ];
  const ds = cands.filter((S) => !(S.length === basis.length && isBasisOf(S, span, basis.length))).map(setTex);
  const Rtex = matTex(R);
  return mcq(rng, {
    subtopic: "Null space",
    prompt: `Let $A = ${matTex(A)}$. Which set is a basis for the null space $N(A)$?`,
    correct: setTex(basis),
    distractors: ds,
    solution: `Row reduce $A$ to its RREF: $R = ${Rtex}$. Pivot columns: ${piv.map((p) => p + 1).join(", ")}; free variables: ${free.map((f) => `$x_${f + 1}$`).join(", ")}.\nSolve each pivot variable in terms of the free ones (move the free terms to the right, so their signs **flip**), then set one free variable to 1 and the others to 0. This gives one basis vector per free variable:\n$$N(A) = \\operatorname{Span}${setTex(basis)}$$\nSo $\\dim N(A) = ${n} - ${r} = ${n - r}$. Check: $A\\mathbf{v} = \\mathbf{0}$ for each vector. Forgetting the sign flip, or listing rows of $R$ (a basis for the row space), are the classic slips.`,
  });
}

/** Basis for C(A) or C(A^T) given A and its RREF. */
function fundamentalBasis(rng: Rng): Draft {
  const [m, n, r] = rng.pick([[3, 4, 2], [3, 5, 2], [3, 5, 3], [4, 5, 3], [4, 4, 2], [4, 5, 2]]);
  const { A, R, piv } = randRank(rng, m, n, r);
  const colsA = transpose(A);
  const colsR = transpose(R);
  const rowMode = rng.chance(0.4);
  const nonPiv = [...Array(n).keys()].filter((j) => !piv.includes(j));
  if (rowMode) {
    const correct = R.slice(0, r);
    const cands: Vec[][] = [
      piv.map((p) => colsA[p]),
      R.slice(0, Math.min(r + 1, m)),
      piv.map((p) => colsR[p].slice(0, m)),
      A.slice(0, r),
      A.slice(m - r),
      R.slice(0, r).map((v) => v.map((x, j) => (piv.includes(j) ? x : x.neg()))),
    ];
    const ds = cands.filter((S) => !isBasisOf(S, A, r)).map(setTex);
    return mcq(rng, {
      subtopic: "Row space",
      prompt: `$A = ${matTex(A)}$ is row equivalent to $R = ${matTex(R)}$. Which set is a basis for the row space $C(A^T)$?`,
      correct: setTex(correct),
      distractors: ds,
      solution: `Row operations replace rows by combinations of rows, so **row equivalent matrices have the same row space**. The nonzero rows of the echelon form $R$ are independent, so they form a basis:\n$$C(A^T) = \\operatorname{Span}${setTex(correct)}, \\qquad \\dim C(A^T) = \\operatorname{rank}A = ${r}.$$\nPivot **columns** of $A$ are a basis for the column space (they live in $\\mathbb{R}^{${m}}$), not the row space (in $\\mathbb{R}^{${n}}$). Including a zero row makes the set dependent.`,
    });
  }
  const correct = piv.map((p) => colsA[p]);
  const cands: Vec[][] = [
    piv.map((p) => colsR[p]),
    nonPiv.slice(0, r).map((p) => colsA[p]),
    R.slice(0, r),
    colsA.slice(0, Math.min(r + 1, n)),
    [...Array(r).keys()].map((j) => colsA[j]),
    colsA.slice(n - r),
  ];
  const ds = cands.filter((S) => S.length > 0 && !isBasisOf(S, colsA, r)).map(setTex);
  return mcq(rng, {
    subtopic: "Column space",
    prompt: `$A = ${matTex(A)}$ is row equivalent to $R = ${matTex(R)}$. Which set is a basis for the column space $C(A)$?`,
    correct: setTex(correct),
    distractors: ds,
    solution: `The pivots of $R$ are in columns ${piv.map((p) => p + 1).join(", ")}. Row operations do **not** preserve the column space, but they do preserve linear dependence relations among the columns. So the **pivot columns of $A$ itself** form a basis:\n$$C(A) = \\operatorname{Span}${setTex(correct)}, \\qquad \\dim C(A) = ${r}.$$\nThe pivot columns of $R$ are standard vectors with zeros at the bottom; they usually are not even in $C(A)$. Any set with the wrong number of vectors cannot be a basis of a ${r}-dimensional space.`,
  });
}

/** One entry of a 3×3 matrix depends on k; rank drops exactly at k = k0. */
function paramSingular(rng: Rng): { rows: Vec[]; j: number; k0: Frac; kRow: number; base: Vec } {
  for (let t = 0; t < 300; t++) {
    const r1 = randIntVec(rng, 3, -3, 3);
    const r2 = randIntVec(rng, 3, -3, 3);
    const j = rng.int(0, 2);
    const ej = zeros(3);
    ej[j] = F(1);
    if (det([r1, r2, ej]).isZero()) continue;
    const [a, b] = [rng.nz(-2, 2), rng.nz(-2, 2)];
    const base = r1.map((x, i) => x.mul(a).add(r2[i].mul(b)));
    if (Math.max(...base.map((x) => Math.abs(x.valueOf()))) > 9) continue;
    const k0 = F(rng.nz(-5, 5));
    if (base[j].sub(k0).isZero()) continue;
    const kRow = rng.int(0, 2);
    const rows = [r1, r2];
    rows.splice(kRow, 0, base);
    // sanity: rank 2 when the k-entry equals base[j] (k = k0), rank 3 otherwise
    const shifted = rows.map((r, i) => (i === kRow ? r.map((x, c) => (c === j ? x.add(1) : x)) : r));
    if (rank(rows) !== 2 || rank(shifted) !== 3) continue;
    return { rows, j, k0, kRow, base };
  }
  retry();
}

function rankParam(rng: Rng): Draft {
  const { rows, j, k0, kRow, base } = paramSingular(rng);
  const cell = (i: number, c: number) => (i === kRow && c === j ? kExpr(base[j].sub(k0)) : rows[i][c].tex());
  const Atex = `\\begin{bmatrix} ${rows.map((r, i) => r.map((_, c) => cell(i, c)).join(" & ")).join(" \\\\ ")} \\end{bmatrix}`;
  const ask = rng.pick([
    "is $\\operatorname{rank}A = 2$",
    "is $N(A) \\ne \\{\\mathbf{0}\\}$",
    "do the columns of $A$ **fail** to span $\\mathbb{R}^3$",
  ]);
  const others = rows.filter((_, i) => i !== kRow);
  return mcq(rng, {
    subtopic: "Rank",
    prompt: `Let $A = ${Atex}$. For which value of $k$ ${ask}?`,
    correct: `k = ${k0.tex()}`,
    distractors: [k0.neg(), k0.add(1), k0.sub(1), base[j].neg(), k0.mul(2)].map((x) => `k = ${x.tex()}`).concat(["\\text{every real } k"]),
    solution: `All three conditions say the same thing for a $3\\times3$ matrix: $\\operatorname{rank}A < 3 \\iff N(A)\\ne\\{\\mathbf{0}\\} \\iff$ the columns do not span $\\mathbb{R}^3 \\iff |A| = 0$.\nThe two rows without $k$ (as vectors, $${rowTex(others[0])}$ and $${rowTex(others[1])}$) are independent, so the rank is at least 2. The row containing $k$ is a combination of them exactly when its $k$-entry equals $${base[j].tex()}$, i.e. $k = ${k0.tex()}$ (equivalently $|A|$ is a multiple of $(k ${k0.n < 0 ? "+" : "-"} ${k0.abs().tex()})$). For every other $k$ the rank is 3.`,
  });
}

/** [x]_B in R^2 or R^3 via B^{-1}. */
function coordsInverse(rng: Rng): Draft {
  const n = rng.pick([2, 2, 3]);
  const B = randInvertible(rng, n, -3, 4, n === 2 ? [1, 2] : [1, 2]);
  const c = randIntVec(rng, n, -4, 4);
  const x = matvec(B, c);
  const d = det(B);
  const Binv = inverse(B)!;
  const bs = transpose(B);
  const BT = inverse(transpose(B))!;
  return mcq(rng, {
    subtopic: "Coordinates",
    prompt: `Let $\\mathcal{B} = \\{${bs.map((_, i) => bf("b", i + 1)).join(", ")}\\}$ with ${bs.map((b, i) => `$${bf("b", i + 1)} = ${rowTex(b)}$`).join(", ")}, a basis of $\\mathbb{R}^${n}$. Find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = ${rowTex(x)}$.`,
    correct: rowTex(c),
    distractors: [matvec(B, x), matvec(BT, x), [...c].reverse(), c.map((v, i) => (i === 0 ? v.neg() : v)), c.map((v) => v.mul(d)), matvec(transpose(B), x)].map(rowTex),
    solution: `Put the basis vectors in the columns of $P_{\\mathcal{B}} = ${matTex(B)}$. Then $\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$, so\n$$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x} = ${matTex(Binv)}${rowTex(x)} = ${rowTex(c)}.$$\nCheck: $${c.map((v, i) => `(${v.tex()})${bf("b", i + 1)}`).join(" + ")} = ${rowTex(x)}$. Multiplying $P_{\\mathcal{B}}\\mathbf{x}$ goes the wrong way, and putting the basis vectors in **rows** gives $(P_{\\mathcal{B}}^T)^{-1}\\mathbf{x}$.`,
  });
}

/** Coordinates in P_2 with respect to a non-standard basis. */
function coordsPoly(rng: Rng): Draft {
  const P = randInvertible(rng, 3, -2, 2, [1]);
  const bs = transpose(P); // coefficient vectors of b_i in {1, t, t^2}
  if (bs.some((b) => b.filter((x) => !x.isZero()).length < 2 && rng.chance(0.7))) retry();
  const c = randIntVec(rng, 3, -3, 3);
  const p = matvec(P, c);
  if (isZeroVec(p)) retry();
  const basisTex = bs.map((b, i) => `$\\mathbf{b}_${i + 1} = ${polyTex(b)}$`).join(", ");
  const head = `In $\\mathbb{P}_2$, $\\mathcal{B} = \\{\\mathbf{b}_1, \\mathbf{b}_2, \\mathbf{b}_3\\}$ with ${basisTex} is a basis.`;
  const findCoords = rng.chance(0.55);
  const Pinv = inverse(P)!;
  if (findCoords) {
    return mcq(rng, {
      subtopic: "Coordinates",
      prompt: `${head} Find $[\\mathbf{p}]_{\\mathcal{B}}$ for $\\mathbf{p}(t) = ${polyTex(p)}$.`,
      correct: rowTex(c),
      distractors: [p, matvec(P, p), [...c].reverse(), matvec(transpose(Pinv), p), c.map((v, i) => (i === 2 ? v.neg() : v))].map(rowTex),
      solution: `Use the coordinate map to $\\{1, t, t^2\\}$: the columns of $P = ${matTex(P)}$ are the standard coordinates of $\\mathbf{b}_1,\\mathbf{b}_2,\\mathbf{b}_3$, and $[\\mathbf{p}] = ${rowTex(p)}$. Solve $P\\mathbf{c} = [\\mathbf{p}]$:\n$$[\\mathbf{p}]_{\\mathcal{B}} = P^{-1}${rowTex(p)} = ${rowTex(c)}.$$\nCheck: $${c.map((v, i) => `(${v.tex()})(${polyTex(bs[i])})`).join(" + ")} = ${polyTex(p)}$. The vector $${rowTex(p)}$ is the coordinate vector in the **standard** basis, not in $\\mathcal{B}$.`,
    });
  }
  return mcq(rng, {
    subtopic: "Coordinates",
    prompt: `${head} If $[\\mathbf{p}]_{\\mathcal{B}} = ${rowTex(c)}$, what is $\\mathbf{p}(t)$?`,
    correct: polyTex(p),
    distractors: [polyTex(c), polyTex(matvec(transpose(P), c)), polyTex(matvec(Pinv, c)), polyTex([...c].reverse()), polyTex(matvec(P, [...c].reverse()))],
    solution: `$[\\mathbf{p}]_{\\mathcal{B}} = ${rowTex(c)}$ means $\\mathbf{p} = ${lin(c, ["\\mathbf{b}_1", "\\mathbf{b}_2", "\\mathbf{b}_3"])}$:\n$$\\mathbf{p}(t) = ${c.map((v, i) => `(${v.tex()})(${polyTex(bs[i])})`).join(" + ")} = ${polyTex(p)}.$$\nReading $${rowTex(c)}$ as the coefficients of $1, t, t^2$ ignores the basis $\\mathcal{B}$ entirely.`,
  });
}

/** Change of basis from relations a_j = sum M_ij b_i (Tutorial 4 Q15 style). */
function changeOfBasisRelation(rng: Rng): Draft {
  const M = randInvertible(rng, 3, -2, 2, [1, 2, 3]);
  const MT = transpose(M);
  if (MT.every((r, i) => r.every((x, j) => x.eq(M[i][j])))) retry();
  if (transpose(M).some((col) => col.filter((x) => !x.isZero()).length < 2)) retry();
  const names = [1, 2, 3].map((i) => bf("b", i));
  const rel = transpose(M).map((col, j) => `$${bf("a", j + 1)} = ${lin(col, names)}$`).join(", ");
  const head = `Let $\\mathcal{A} = \\{\\mathbf{a}_1,\\mathbf{a}_2,\\mathbf{a}_3\\}$ and $\\mathcal{B} = \\{\\mathbf{b}_1,\\mathbf{b}_2,\\mathbf{b}_3\\}$ be bases of a vector space $V$ with ${rel}.`;
  const Minv = inverse(M)!;
  if (rng.chance(0.5)) {
    return mcq(rng, {
      subtopic: "Change of basis",
      prompt: `${head} Find the change-of-coordinates matrix $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$.`,
      correct: matTex(M, false),
      distractors: [matTex(MT, false), matTex(Minv), matTex(transpose(Minv)), matTex(M.map((r) => r.map((x) => x.neg())), false)],
      solution: `$P_{\\mathcal{B}\\leftarrow\\mathcal{A}} = \\big[\\,[\\mathbf{a}_1]_{\\mathcal{B}}\\ [\\mathbf{a}_2]_{\\mathcal{B}}\\ [\\mathbf{a}_3]_{\\mathcal{B}}\\,\\big]$: the $\\mathcal{B}$-coordinates of each $\\mathbf{a}_j$ go in **column** $j$.\n${transpose(M).map((col, j) => `$[${bf("a", j + 1)}]_{\\mathcal{B}} = ${rowTex(col)}$`).join(", ")}, so\n$$P_{\\mathcal{B}\\leftarrow\\mathcal{A}} = ${matTex(M, false)}.$$\nWriting the coefficients as rows gives the transpose, the most common mistake.`,
    });
  }
  const c = randIntVec(rng, 3, -3, 4);
  const xb = matvec(M, c);
  return mcq(rng, {
    subtopic: "Change of basis",
    prompt: `${head} Find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = ${lin(c, [1, 2, 3].map((i) => bf("a", i)))}$.`,
    correct: rowTex(xb),
    distractors: [matvec(MT, c), c, matvec(Minv, c), xb.map((v, i) => (i === 1 ? v.neg() : v)), [...xb].reverse()].map(rowTex),
    solution: `$[\\mathbf{x}]_{\\mathcal{A}} = ${rowTex(c)}$ and $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}\\leftarrow\\mathcal{A}}[\\mathbf{x}]_{\\mathcal{A}}$, where the columns of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$ are $[\\mathbf{a}_j]_{\\mathcal{B}}$:\n$$[\\mathbf{x}]_{\\mathcal{B}} = ${matTex(M, false)}${rowTex(c)} = ${rowTex(xb)}.$$\n(Equivalently substitute the relations and collect the $\\mathbf{b}_i$.) Using the transpose of this matrix is the usual slip.`,
  });
}

/** P_{C<-B} for two bases of R^2. */
function changeOfBasisR2(rng: Rng): Draft {
  const C = randInvertible(rng, 2, -3, 3, [1]);
  const B = randInvertible(rng, 2, -3, 4, [1, 2, 3, 4, 5]);
  const Cinv = inverse(C)!;
  const P = matmul(Cinv, B);
  const Pinv = inverse(P)!;
  if (P.flat().some((x) => !x.isInt())) retry();
  const bs = transpose(B);
  const cs = transpose(C);
  const head = `Let $\\mathcal{B} = \\{\\mathbf{b}_1, \\mathbf{b}_2\\}$ and $\\mathcal{C} = \\{\\mathbf{c}_1, \\mathbf{c}_2\\}$ be bases of $\\mathbb{R}^2$ with $\\mathbf{b}_1 = ${rowTex(bs[0])}$, $\\mathbf{b}_2 = ${rowTex(bs[1])}$, $\\mathbf{c}_1 = ${rowTex(cs[0])}$, $\\mathbf{c}_2 = ${rowTex(cs[1])}$.`;
  const pc = transpose(P);
  const sol = `The columns of $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$ are the $\\mathcal{C}$-coordinate vectors $[\\mathbf{b}_1]_{\\mathcal{C}}, [\\mathbf{b}_2]_{\\mathcal{C}}$ (Theorem 4.9, slide 70). With $P_{\\mathcal{C}} = ${matTex(C)}$ and $P_{\\mathcal{C}}^{-1} = ${matTex(Cinv)}$, each column is $[\\mathbf{b}_j]_{\\mathcal{C}} = P_{\\mathcal{C}}^{-1}\\mathbf{b}_j$: $[\\mathbf{b}_1]_{\\mathcal{C}} = ${rowTex(pc[0])}$ and $[\\mathbf{b}_2]_{\\mathcal{C}} = ${rowTex(pc[1])}$. So\n$$P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = ${matTex(P)}.$$\nCheck: $(${pc[0][0].tex()})\\mathbf{c}_1 + (${pc[0][1].tex()})\\mathbf{c}_2 = ${rowTex(bs[0])} = \\mathbf{b}_1$.`;
  if (rng.chance(0.5)) {
    return mcq(rng, {
      subtopic: "Change of basis",
      prompt: `${head} Find $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$.`,
      correct: matTex(P),
      distractors: [matTex(Pinv), matTex(transpose(P)), matTex(matmul(B, Cinv)), matTex(matmul(Cinv, transpose(B))), matTex(matmul(inverse(B)!, C))],
      solution: `${sol}\nWriting the coordinate vectors as rows gives the transpose; using $[\\mathbf{c}_1]_{\\mathcal{B}}, [\\mathbf{c}_2]_{\\mathcal{B}}$ as columns converts the other way.`,
    });
  }
  const xB = randIntVec(rng, 2, -3, 3);
  const xC = matvec(P, xB);
  return mcq(rng, {
    subtopic: "Change of basis",
    prompt: `${head} If $[\\mathbf{x}]_{\\mathcal{B}} = ${rowTex(xB)}$, find $[\\mathbf{x}]_{\\mathcal{C}}$.`,
    correct: rowTex(xC),
    distractors: [matvec(Pinv, xB), matvec(transpose(P), xB), matvec(B, xB), matvec(C, xB), xC.map((v, i) => (i === 0 ? v.neg() : v))].map(rowTex),
    solution: `${sol}\nThen $[\\mathbf{x}]_{\\mathcal{C}} = P_{\\mathcal{C}\\leftarrow\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}} = ${rowTex(xC)}$. Check: $\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}} = ${rowTex(matvec(B, xB))}$ and $P_{\\mathcal{C}}[\\mathbf{x}]_{\\mathcal{C}}$ gives the same vector. $${rowTex(matvec(B, xB))}$ itself is the **standard** coordinate vector.`,
  });
}

// ---- subsets of R^3: subspace or not

interface SetForm {
  kind: number;
  tex: string;
  sub: boolean;
  why: string;
}

const coef = (rng: Rng) => rng.nz(-4, 4);
const eq3 = (a: number, b: number, c: number) => lin(vec([a, b, c]), ["x", "y", "z"]);

function subspaceForm(rng: Rng): SetForm {
  const k = rng.int(0, 3);
  if (k === 0) {
    const [a, b, c] = [coef(rng), coef(rng), coef(rng)];
    return { kind: k, tex: `\\{(x,y,z) : ${eq3(a, b, c)} = 0\\}`, sub: true, why: "It is the null space of the $1\\times3$ matrix $[\\,a\\ b\\ c\\,]$ (a plane through the origin), and every null space is a subspace." };
  }
  if (k === 1) {
    const [a, b, c, d, e] = [coef(rng), coef(rng), rng.int(-3, 3), coef(rng), coef(rng)];
    return { kind: k, tex: `\\{(x,y,z) : ${eq3(a, b, c)} = 0,\\ ${eq3(d, 0, e)} = 0\\}`, sub: true, why: "It is the null space of a $2\\times3$ matrix (intersection of two planes through the origin), hence a subspace." };
  }
  if (k === 2) {
    const [a, b, c, d] = [coef(rng), coef(rng), coef(rng), coef(rng)];
    return { kind: k, tex: `\\{(${lin(vec([a, b]), ["s", "t"])},\\ ${lin(vec([c]), ["s"])},\\ ${lin(vec([d]), ["t"])}) : s, t \\in \\mathbb{R}\\}`, sub: true, why: "It is $\\operatorname{Span}$ of two fixed vectors (the coefficients of $s$ and of $t$), and every span is a subspace." };
  }
  const [a, b] = [coef(rng), coef(rng)];
  return { kind: k, tex: `\\{(x,y,z) : x = ${lin(vec([a]), ["y"])},\\ z = ${lin(vec([b]), ["x"])}\\}`, sub: true, why: "The conditions are homogeneous linear equations, so the set is a null space (a line through the origin)." };
}

function nonSubspaceForm(rng: Rng): SetForm {
  const k = rng.int(0, 6);
  if (k === 0) {
    const [a, b, c, d] = [coef(rng), coef(rng), coef(rng), rng.nz(-6, 6)];
    return { kind: k, tex: `\\{(x,y,z) : ${eq3(a, b, c)} = ${d}\\}`, sub: false, why: `It does not contain $\\mathbf{0}$: substituting $(0,0,0)$ gives $0 \\ne ${d}$ (a plane **not** through the origin).` };
  }
  if (k === 1) {
    const [a, b, c] = [coef(rng), coef(rng), coef(rng)];
    return { kind: k, tex: `\\{(x,y,z) : ${eq3(a, b, c)} \\ge 0\\}`, sub: false, why: "It contains $\\mathbf{0}$ and is closed under addition, but not under scalar multiplication: if $\\mathbf{u}$ gives a positive value, $(-1)\\mathbf{u}$ gives a negative one." };
  }
  if (k === 2) {
    const r = rng.int(1, 9);
    return { kind: k, tex: `\\{(x,y,z) : x^2 + y^2 + z^2 \\le ${r}\\}`, sub: false, why: "A ball is bounded: a nonzero vector in it multiplied by a large scalar leaves the ball, so it is not closed under scalar multiplication." };
  }
  if (k === 3) {
    const [u, v] = rng.pick([["x", "y"], ["x", "z"], ["y", "z"]]);
    return { kind: k, tex: `\\{(x,y,z) : ${u} = 0 \\text{ or } ${v} = 0\\}`, sub: false, why: `It is a union of two planes. E.g. a vector with only $${u} = 0$ plus one with only $${v} = 0$ can give a sum with both coordinates nonzero, so it is not closed under addition.` };
  }
  if (k === 4) {
    const [d, a, b] = [rng.nz(-4, 4), coef(rng), coef(rng)];
    return { kind: k, tex: `\\{(${lin(vec([1, d]), ["s", ""])},\\ ${lin(vec([a]), ["s"])},\\ ${lin(vec([b]), ["s"])}) : s \\in \\mathbb{R}\\}`, sub: false, why: `To get $\\mathbf{0}$ we need $s = ${-d}$ from the first coordinate, but then the second is $${a * -d} \\ne 0$. A line not through the origin is not a subspace.` };
  }
  if (k === 5) {
    const a = coef(rng);
    return { kind: k, tex: `\\{(x,y,z) : x = ${lin(vec([a]), ["y^2"])}\\}`, sub: false, why: "The condition is not linear. Doubling a vector with $y \\ne 0$ multiplies the right-hand side by 4 but the left by 2, so it is not closed under scalar multiplication." };
  }
  const [a, b] = [coef(rng), coef(rng)];
  return { kind: k, tex: `\\{(x,y,z) : ${lin(vec([a]), ["x"])}y = ${lin(vec([b]), ["z"])}\\}`, sub: false, why: "The condition involves the product $xy$, so it is not linear: scaling a vector by $c$ scales $xy$ by $c^2$ but the right side by $c$." };
}

function subspaceTfn(rng: Rng): Draft {
  const f = rng.chance(0.5) ? subspaceForm(rng) : nonSubspaceForm(rng);
  return tfn({
    subtopic: "Subspaces",
    prompt: `The set $${f.tex}$ is a subspace of $\\mathbb{R}^3$.`,
    answer: f.sub ? 0 : 1,
    solution: `${f.sub ? "**True**." : "**False**."} ${f.why}\nThe three-part test: (1) $\\mathbf{0}$ is in the set, (2) closed under $+$, (3) closed under scalar multiplication. Sets defined by homogeneous **linear** equations, or as a span, always pass.`,
  });
}

function subspaceMcq(rng: Rng): Draft {
  const good = subspaceForm(rng);
  const bads: SetForm[] = [];
  const seen = new Set<number>();
  for (let t = 0; t < 60 && bads.length < 4; t++) {
    const b = nonSubspaceForm(rng);
    if (seen.has(b.kind)) continue;
    seen.add(b.kind);
    bads.push(b);
  }
  if (bads.length < 4) retry();
  const useNone = rng.chance(0.15);
  const shown = useNone ? bads : rng.shuffle([good, ...bads.slice(0, 3)]);
  const fails = shown.filter((f) => !f.sub);
  return {
    subtopic: "Subspaces",
    kind: "mcq",
    prompt: "Which of the following subsets of $\\mathbb{R}^3$ is a subspace of $\\mathbb{R}^3$?",
    options: [...shown.map((f) => `$${f.tex}$`), NONE],
    answer: useNone ? 4 : shown.indexOf(good),
    solution:
      (useNone
        ? "None of the four sets passes the three-part test (contains $\\mathbf{0}$, closed under $+$, closed under scalar multiplication):\n"
        : `$${good.tex}$ is a subspace. ${good.why}\nThe others fail the three-part test:\n`) +
      fails.map((b) => `- $${b.tex}$: ${b.why}`).join("\n") +
      (useNone ? `\nA set such as $${good.tex}$ would qualify. ${good.why} So the answer is **None of the above**.` : ""),
  };
}

/** Polynomials with a parameter: dependent for exactly one k. */
function polyDependent(rng: Rng): Draft {
  const { rows, j, k0, kRow, base } = paramSingular(rng);
  // rows[i] = coefficient vector of p_{i+1} in {1, t, t^2}
  if (rows.some((r) => r.filter((x) => !x.isZero()).length < 2)) retry();
  const names = ["", "t", "t^2"];
  const polyK = (r: Vec) => {
    const cs = r.map((x, c) => (c === j ? null : x));
    let s = "";
    cs.forEach((x, c) => {
      let term: string;
      if (x === null) {
        const e = kExpr(base[j].sub(k0));
        term = c === 0 ? `(${e})` : `(${e})${names[c]}`;
        s += s ? ` + ${term}` : term;
        return;
      }
      if (x.isZero()) return;
      const abs = x.abs();
      term = names[c] === "" ? abs.tex() : abs.eq(1) ? names[c] : `${abs.tex()}${names[c]}`;
      s += s ? (x.n < 0 ? ` - ${term}` : ` + ${term}`) : x.n < 0 ? `-${term}` : term;
    });
    return s;
  };
  const ps = rows.map((r, i) => `$\\mathbf{p}_${i + 1}(t) = ${i === kRow ? polyK(r) : polyTex(r)}$`).join(", ");
  return mcq(rng, {
    subtopic: "Independence in general spaces",
    prompt: `In $\\mathbb{P}_2$ let ${ps}. For which value of $k$ is $\\{\\mathbf{p}_1, \\mathbf{p}_2, \\mathbf{p}_3\\}$ linearly **dependent**?`,
    correct: `k = ${k0.tex()}`,
    distractors: [k0.neg(), k0.add(1), k0.sub(1), base[j].neg(), k0.mul(2)].map((x) => `k = ${x.tex()}`).concat(["\\text{every real } k"]),
    solution: `Use the coordinate map $\\mathbf{p} \\mapsto [\\mathbf{p}]$ w.r.t. $\\{1, t, t^2\\}$: the polynomials are dependent iff their coordinate vectors are. Those vectors are the rows of a $3\\times3$ matrix whose determinant is a nonzero multiple of $(k ${k0.n < 0 ? "+" : "-"} ${k0.abs().tex()})$.\nThe two polynomials without $k$ are independent, and $\\mathbf{p}_${kRow + 1}$ becomes a combination of them exactly when its coefficient containing $k$ equals $${base[j].tex()}$, i.e. $k = ${k0.tex()}$. Then $\\dim\\operatorname{Span}\\{\\mathbf{p}_1,\\mathbf{p}_2,\\mathbf{p}_3\\} = 2$.`,
  });
}

/** Extend an independent set to a basis of R^3 / R^4. */
function extendBasis(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const ws: Vec[] = [];
  for (let t = 0; t < 50 && ws.length < n - 1; t++) {
    const w = randIntVec(rng, n, -2, 3);
    if (rank([...ws, w]) === ws.length + 1) ws.push(w);
  }
  if (ws.length < n - 1) retry();
  let good: Vec | null = null;
  for (let t = 0; t < 50 && !good; t++) {
    const v = randIntVec(rng, n, -3, 3);
    if (!det([...ws, v]).isZero()) good = v;
  }
  if (!good) retry();
  const bads: Vec[] = [];
  for (let t = 0; t < 60 && bads.length < 5; t++) {
    const cs = ws.map(() => rng.int(-2, 2));
    if (cs.filter((x) => x !== 0).length < 2) continue;
    const v = ws.reduce((s, w, i) => s.map((x, j) => x.add(w[j].mul(cs[i]))), zeros(n));
    if (Math.max(...v.map((x) => Math.abs(x.valueOf()))) > 9 || isZeroVec(v)) continue;
    bads.push(v);
  }
  const wNames = ws.map((_, i) => bf("w", i + 1)).join(", ");
  return mcq(rng, {
    subtopic: "Bases & dimension",
    prompt: `Let ${ws.map((w, i) => `$${bf("w", i + 1)} = ${rowTex(w)}$`).join(", ")} and $H = \\operatorname{Span}\\{${wNames}\\}$. Which vector $\\mathbf{v}$ makes $\\{${wNames}, \\mathbf{v}\\}$ a basis for $\\mathbb{R}^${n}$?`,
    correct: rowTex(good),
    distractors: bads.map(rowTex),
    solution: `The ${n - 1} given vectors are independent, so $\\dim H = ${n - 1}$; adding $\\mathbf{v}$ gives a basis of $\\mathbb{R}^${n}$ iff $\\mathbf{v} \\notin H$, i.e. iff the ${n}\\times${n} matrix with these columns has nonzero determinant.\nFor $\\mathbf{v} = ${rowTex(good)}$ the determinant is $${det([...ws, good]).tex()} \\ne 0$. Every other option is a combination of the spanning vectors of $H$ (determinant $0$), so it adds nothing new.`,
    noneRate: 0.12,
  });
}

/** For which p is b in C(A)? */
function bInColumnSpace(rng: Rng): Draft {
  for (let t = 0; t < 200; t++) {
    const a1 = randIntVec(rng, 3, -3, 3);
    const a2 = randIntVec(rng, 3, -3, 3);
    const top = a1[0].mul(a2[1]).sub(a1[1].mul(a2[0]));
    if (top.isZero()) continue;
    const [al, be] = [rng.int(-2, 2), rng.int(-2, 2)];
    if (al === 0 && be === 0) continue;
    const a3 = a1.map((x, i) => x.mul(al).add(a2[i].mul(be)));
    const [s, u] = [rng.nz(-3, 3), rng.nz(-3, 3)];
    const b = a1.map((x, i) => x.mul(s).add(a2[i].mul(u)));
    const A = transpose([a1, a2, a3]);
    if (maxAbsM(A) > 9 || Math.max(...b.map((x) => Math.abs(x.valueOf()))) > 15) continue;
    const p0 = b[2];
    if (p0.isZero()) continue;
    return mcq(rng, {
      subtopic: "Column space",
      prompt: `Let $A = ${matTex(A)}$ and $\\mathbf{b} = [${b[0].tex()},\\ ${b[1].tex()},\\ p]^T$. For which value of $p$ is $A\\mathbf{x} = \\mathbf{b}$ consistent?`,
      correct: `p = ${p0.tex()}`,
      distractors: [p0.neg(), p0.add(1), p0.sub(2), b[0].add(b[1]), F(0)].map((x) => `p = ${x.tex()}`).concat(["\\text{every real } p"]),
      solution: `$A\\mathbf{x} = \\mathbf{b}$ is consistent **iff** $\\mathbf{b} \\in C(A)$. Column 3 is $\\mathbf{a}_3 = ${lin([F(al), F(be)], ["\\mathbf{a}_1", "\\mathbf{a}_2"])}$, so by the Spanning Set Theorem $C(A) = \\operatorname{Span}\\{\\mathbf{a}_1, \\mathbf{a}_2\\}$ (rank 2, so not every $\\mathbf{b}$ works).\nSo we need $x\\mathbf{a}_1 + y\\mathbf{a}_2 = \\mathbf{b}$. The first two entries give $${lin([a1[0], a2[0]], ["x", "y"])} = ${b[0].tex()}$ and $${lin([a1[1], a2[1]], ["x", "y"])} = ${b[1].tex()}$, whose only solution is $x = ${s}$, $y = ${u}$. The third entry then forces $p = (${a1[2].tex()})(${s}) + (${a2[2].tex()})(${u}) = ${p0.tex()}$. (Row reducing $[\\,A\\ \\ \\mathbf{b}\\,]$ gives the same condition in the last row.)`,
    });
  }
  retry();
}

/** Rank-nullity from an explicit matrix. */
function rankNullity(rng: Rng): Draft {
  const [m, n] = rng.pick([[3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [3, 3], [5, 4]]);
  const r = rng.int(1, Math.min(m, n) - (m === n ? 1 : 0));
  const { A, R } = randRank(rng, m, n, Math.max(1, r));
  const rowMode = rng.chance(0.45);
  const pair = (a: number, b: number) => `(${a},\\ ${b})`;
  const correct = rowMode ? pair(r, m - r) : pair(r, n - r);
  const ds = [pair(r, n - r), pair(r, m - r), pair(n - r, r), pair(m - r, r), pair(r + 1, n - r - 1), pair(r - 1, n - r + 1), pair(m - r, n - r), pair(r, n)];
  return mcq(rng, {
    subtopic: "Rank theorem",
    prompt: `Let $A = ${matTex(A)}$. Find ${rowMode ? "$\\big(\\dim C(A^T),\\ \\dim N(A^T)\\big)$" : "$\\big(\\operatorname{rank}A,\\ \\dim N(A)\\big)$"}.`,
    correct,
    distractors: ds.filter((d) => !/-/.test(d)),
    solution: `Row reduce: $A \\sim ${matTex(R)}$, which has ${r} pivot${r === 1 ? "" : "s"}, so $\\operatorname{rank}A = \\dim C(A) = \\dim C(A^T) = ${r}$.\n${rowMode ? `$A^T$ is $${n}\\times${m}$ with the same rank, so $\\dim N(A^T) = ${m} - ${r} = ${m - r}$ (number of **rows** of $A$ minus the rank).` : `Rank theorem: $\\operatorname{rank}A + \\dim N(A) = n = ${n}$ (number of **columns**), so $\\dim N(A) = ${n - r}$.`}`,
  });
}

/** Read rank information off a complete solution (past-paper style). */
function solutionToRank(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const k = rng.pick([1, 2]);
  const r = n - k;
  const m = rng.int(Math.max(r, 2), 5);
  const p = randIntVec(rng, n, -3, 5);
  const vs: Vec[] = [];
  for (let t = 0; t < 40 && vs.length < k; t++) {
    const v = randIntVec(rng, n, -3, 3);
    if (rank([...vs, v]) === vs.length + 1) vs.push(v);
  }
  if (vs.length < k) retry();
  const params = ["c", "d"];
  const what = rng.pick(["rank", "rowdim", "leftnull", "col"] as const);
  const ans = what === "leftnull" ? m - r : r;
  const label = { rank: "\\operatorname{rank}A", rowdim: "\\dim C(A^T)", leftnull: "\\dim N(A^T)", col: "\\dim C(A)" }[what];
  const nums = [0, 1, 2, 3, 4, 5].filter((x) => x !== ans).map(String);
  return mcq(rng, {
    subtopic: "Rank theorem",
    prompt: `$A$ is a $${m}\\times${n}$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = ${rowTex(p)} + ${vs.map((v, i) => `${params[i]}${rowTex(v)}`).join(" + ")}$ (${k === 1 ? "$c$" : "$c, d$"} arbitrary). Find $${label}$.`,
    correct: String(ans),
    distractors: nums,
    solution: `The free part ${k === 1 ? "is one independent vector" : "has two independent vectors"}, so $N(A) = \\operatorname{Span}\\{${vs.map(rowTex).join(", ")}\\}$ and $\\dim N(A) = ${k}$ (the particular solution $${rowTex(p)}$ does **not** count).\nRank theorem with $n = ${n}$ columns: $\\operatorname{rank}A = ${n} - ${k} = ${r} = \\dim C(A) = \\dim C(A^T)$.${what === "leftnull" ? `\n$\\dim N(A^T) = m - \\operatorname{rank}A = ${m} - ${r} = ${m - r}$.` : ""}`,
  });
}

/** Dimensions of P_n, symmetric matrices and subspaces of P_n cut out by p(a) = 0 conditions. */
function spaceDims(rng: Rng): Draft {
  const n = rng.int(2, 6);
  const k = rng.int(2, 4);
  const a = rng.nz(-3, 3);
  const at = (x: number) => (x < 0 ? `(${x})` : `${x}`);
  const cases: { ref: string; tex: string; d: number; why: string }[] = [
    {
      ref: "Slides 4.7 Exercise 4.7.2 (vsp p35); Slides 4.11 (vsp p50); older PYP fill-in (dim P₄ = 5)",
      tex: `\\mathbb{P}_{${n}}`,
      d: n + 1,
      why: `The standard basis $\\{1, t, \\dots, t^{${n}}\\}$ of $\\mathbb{P}_{${n}}$ has $${n + 1}$ polynomials (one more than the degree, because of the constant term $1$).`,
    },
    {
      ref: "PYP AY25/26 S1 Q5; Tutorial 4 Q1",
      tex: `\\text{all } ${k}\\times${k} \\text{ symmetric matrices}`,
      d: (k * (k + 1)) / 2,
      why: `In a symmetric matrix each entry below the diagonal equals the one above it, so the matrix is fixed by its $${k}$ diagonal entries and the $${(k * (k - 1)) / 2}$ entries above the diagonal: $${(k * (k + 1)) / 2}$ free entries. Each free entry gives one basis matrix (a $1$ in that position and its mirror image), so the dimension is $${(k * (k + 1)) / 2}$.`,
    },
    {
      ref: "Slides 4.4 (vsp p21–22); Slides 4.12 (vsp p52); Slides 4.11 (vsp p50)",
      tex: `\\{\\mathbf{p} \\in \\mathbb{P}_{${n}} : \\mathbf{p}(${a}) = 0\\}`,
      d: n,
      why: `With $\\mathbf{p}(t) = a_0 + a_1t + \\dots + a_{${n}}t^{${n}}$, the condition $\\mathbf{p}(${a}) = 0$ is one homogeneous equation $a_0 + ${at(a)}a_1 + \\dots + ${at(a)}^{${n}}a_{${n}} = 0$ in the $${n + 1}$ coordinates. It has one pivot ($a_0$) and $${n}$ free variables, so the dimension is $${n}$.`,
    },
    {
      ref: "Slides 4.4 (vsp p21–22); Slides 4.12 (vsp p52); Slides 4.11 (vsp p50)",
      tex: `\\{\\mathbf{p} \\in \\mathbb{P}_{${n}} : \\mathbf{p}(0) = 0 \\text{ and } \\mathbf{p}(1) = 0\\}`,
      d: n - 1,
      why: `With $\\mathbf{p}(t) = a_0 + a_1t + \\dots + a_{${n}}t^{${n}}$: $\\mathbf{p}(0) = 0$ gives $a_0 = 0$ and $\\mathbf{p}(1) = 0$ gives $a_0 + a_1 + \\dots + a_{${n}} = 0$. This homogeneous system has 2 pivots ($a_0$, $a_1$) among $${n + 1}$ unknowns, so there are $${n - 1}$ free variables: dimension $${n - 1}$.`,
    },
  ];
  const c = rng.pick(cases);
  const pool = [n, n + 1, n + 2, n - 1, 2 * n, k * k, (k * (k - 1)) / 2, k, k + 1, (k * (k + 1)) / 2 + 1].filter((x) => x !== c.d && x > 0);
  return {
    ...mcq(rng, {
      subtopic: "Dimension",
      prompt: `What is the dimension of the vector space of $${c.tex}$?`,
      correct: String(c.d),
      distractors: [...new Set(pool)].map(String),
      solution: `${c.why}\nThe dimension is the number of vectors in a basis, i.e. the number of free parameters once all the defining conditions are used.`,
    }),
    ref: c.ref,
  };
}

/** Dimension of a parametric subspace of R^4 (Exercise 4.11.1 style). */
function dimParam(rng: Rng): Draft {
  for (let t = 0; t < 200; t++) {
    const r = rng.pick([2, 3, 3]);
    const base: Vec[] = [];
    for (let s = 0; s < 40 && base.length < r; s++) {
      const v = vec(Array.from({ length: 4 }, () => (rng.chance(0.35) ? 0 : rng.int(-3, 4))));
      if (!isZeroVec(v) && rank([...base, v]) === base.length + 1) base.push(v);
    }
    if (base.length < r) continue;
    // 4 parameter vectors: the base vectors plus combinations of them, shuffled.
    const vs: Vec[] = [...base];
    while (vs.length < 4) {
      const cs = base.map(() => rng.int(-2, 2));
      if (cs.filter((x) => x !== 0).length < 1) continue;
      vs.push(base.reduce((acc, b, i) => acc.map((x, j) => x.add(b[j].mul(cs[i]))), zeros(4)));
    }
    const order = rng.shuffle([0, 1, 2, 3]);
    const cols = order.map((i) => vs[i]);
    if (cols.some((v) => isZeroVec(v) || Math.max(...v.map((x) => Math.abs(x.valueOf()))) > 9)) continue;
    if (rank(cols) !== r) continue;
    const params = ["a", "b", "c", "d"];
    const entry = (i: number) => lin(cols.map((v) => v[i]), params);
    if ([0, 1, 2, 3].some((i) => entry(i) === "0")) continue;
    const Htex = `\\left\\{\\begin{bmatrix} ${[0, 1, 2, 3].map(entry).join(" \\\\ ")} \\end{bmatrix} : a, b, c, d \\in \\mathbb{R}\\right\\}`;
    const { R } = rref(transpose(cols));
    return {
      ...mcq(rng, {
        subtopic: "Dimension",
        prompt: `Find the dimension of the subspace $H = ${Htex}$.`,
        correct: String(r),
        distractors: ["1", "2", "3", "4", "0"].filter((x) => x !== String(r)),
        solution: `As in Exercise 4.11.1, $H$ is the span of the vectors multiplying $a, b, c, d$:\n$$${cols.map((v, i) => `\\mathbf{v}_${i + 1} = ${rowTex(v)}`).join(",\\quad ")}.$$\nSo $H = C(A)$ for $A = [\\,\\mathbf{v}_1\\ \\mathbf{v}_2\\ \\mathbf{v}_3\\ \\mathbf{v}_4\\,]$, and $\\dim H$ is the number of pivot columns. Row reducing $A$ gives the reduced echelon form $${matTex(R, false)}$ with ${r} pivots, so $\\dim H = ${r}$. The other vectors are linear combinations of the pivot columns and can be dropped (Spanning Set Theorem); 4 parameters do not mean dimension 4.`,
      }),
      ref: "Slides 4.11 Exercise 4.11.1 (vsp p50); Slides 4.8 Theorem 4.5 (vsp p37); Slides 4.12 (vsp p52)",
    };
  }
  retry();
}

/** Attach the course-material reference (unless the generator set a more specific one). */
const cite = (ref: string, g: (rng: Rng) => Draft) => (rng: Rng): Draft => {
  const d = g(rng);
  return { ...d, ref: d.ref ?? ref };
};

export const vectorSpacesGens: ((rng: Rng) => Draft)[] = [
  cite("Slides 4.4 Exercise 4.4.3 (vsp p21–22); Slides 4.9 (vsp p38); Slides 4.13 Exercise 4.13.1 (vsp p61)", nullBasis),
  cite("Slides 4.9 Theorem 4.6 (vsp p42–43); Slides 4.13 Theorem 4.7, Exercise 4.13.1 (vsp p58–60)", fundamentalBasis),
  cite("Slides 4.14 Theorem 4.9 (vsp p66); Theorem 2.4 (vsp p67); PYP AY25/26 S1 Q9", rankParam),
  cite("Tutorial 4 Q10; Slides 4.10 Exercise 4.10.2 (vsp p47–48)", coordsInverse),
  cite("Slides 4.10 (vsp p44, p49); older PYP (coordinates in P2)", coordsPoly),
  cite("Tutorial 4 Q15; Slides 4.15 Theorem 4.9, Exercise 4.15.1 (vsp p69–70)", changeOfBasisRelation),
  cite("Slides 4.15 Theorem 4.9 (vsp p70); Slides 4.10 (vsp p48)", changeOfBasisR2),
  cite("Slides 4.2 Subspaces (vsp p12–14); Tutorial 4 Q2, Q4; PYP AY25/26 S2 Q7; Additional practice problems", subspaceTfn),
  cite("Slides 4.2 Subspaces (vsp p12–14); Tutorial 4 Q2, Q4; PYP AY25/26 S2 Q7; Additional practice problems", subspaceMcq),
  cite("Tutorial 4 Q9; Slides 4.7 (vsp p31); Slides 4.10 (vsp p49); PYP AY25/26 S1 Q9", polyDependent),
  cite("Older PYP (extend a basis of W to a basis of R⁴); Slides 4.14 Theorem 4.9 (vsp p66)", extendBasis),
  cite("Slides 4.5 (vsp p26); Slides 4.14 (vsp p62); older PYP (p for which Ax = [3, 9, p] is consistent)", bInColumnSpace),
  cite("PYP AY25/26 S2 Q9; Tutorial 4 Q12, Q13; Slides 4.14 Theorem 4.8 (vsp p63–64)", rankNullity),
  cite("PYP AY24/25 S2 Q8; PYP AY25/26 S1 Q8; Slides 4.14 Theorem 4.8 (vsp p64)", solutionToRank),
  cite("Slides 4.11 (vsp p50)", spaceDims),
  cite("Slides 4.11 Exercise 4.11.1 (vsp p50)", dimParam),
];
