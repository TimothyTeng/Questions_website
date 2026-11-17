import {
  F, Frac, identity, inverse, madd, mat, Mat, matEq, matmul, matTex, mscale, msub, rowTex, transpose, vec, Vec,
} from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

/** Attach the course-material reference to every question a generator produces. */
const cite = (ref: string, g: (rng: Rng) => Draft) => (rng: Rng): Draft => ({ ...g(rng), ref });

function randMat(rng: Rng, m: number, n: number, lo = -3, hi = 4): Mat {
  return mat(Array.from({ length: m }, () => Array.from({ length: n }, () => rng.int(lo, hi))));
}

const tr = (A: Mat) => A.reduce((s, r, i) => s.add(r[i]), F(0));
const det2 = (A: Mat) => A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
const rowVecTex = (v: Vec) => `\\begin{bmatrix} ${v.map((x) => x.tex()).join(" & ")} \\end{bmatrix}`;
const tuple = (xs: (Frac | number)[]) => `(${xs.map((x) => Frac.of(x).tex()).join(",\\ ")})`;
const col = (A: Mat, j: number) => A.map((r) => r[j]);
const isScalarMat = (A: Mat) => A.every((r, i) => r.every((x, j) => (i === j ? x.eq(A[0][0]) : x.isZero())));
const sumF = (xs: Frac[]) => xs.reduce((s, x) => s.add(x), F(0));

/** a·X + b·Y written nicely, e.g. "3M - 2I", "-M + I", "5I". */
function lin(a: Frac, X: string, b: Frac, Y: string): string {
  const term = (c: Frac, s: string, first: boolean) => {
    if (c.isZero()) return "";
    const mag = c.abs().eq(1) ? s : `${c.abs().tex()}${s}`;
    if (first) return c.n < 0 ? `-${mag}` : mag;
    return c.n < 0 ? ` - ${mag}` : ` + ${mag}`;
  };
  const t1 = term(a, X, true);
  const t2 = term(b, Y, t1 === "");
  return t1 + t2 || "0";
}

/** Random 2×2 integer matrix with determinant ±1 (so its inverse is an integer matrix). */
function unimodular2(rng: Rng): Mat {
  for (let t = 0; t < 200; t++) {
    const a = rng.int(-4, 5), b = rng.int(-4, 4), c = rng.int(-4, 4);
    if (a === 0) continue;
    for (const target of rng.shuffle([1, -1])) {
      // a*d - b*c = target  =>  d = (target + b*c)/a
      if ((target + b * c) % a !== 0) continue;
      const d = (target + b * c) / a;
      if (Math.abs(d) > 6) continue;
      if (b === 0 && c === 0) continue;
      return mat([[a, b], [c, d]]);
    }
  }
  retry();
}

// ---------------------------------------------------------------- generators

/** (i, j) entry of AB. */
function productEntry(rng: Rng): Draft {
  const m = rng.pick([2, 3]);
  const n = rng.pick([2, 3, 3, 4]);
  const p = rng.pick([2, 3, 4]);
  const A = randMat(rng, m, n, -3, 5);
  const B = randMat(rng, n, p, -3, 5);
  const AB = matmul(A, B);
  const i = rng.int(0, m - 1);
  const j = rng.int(0, p - 1);
  const correct = AB[i][j];
  const ds: Frac[] = [correct.neg(), correct.sub(A[i][0].mul(B[0][j]).mul(2))];
  for (let jj = 0; jj < p; jj++) if (jj !== j) ds.push(AB[i][jj]);
  for (let ii = 0; ii < m; ii++) if (ii !== i) ds.push(AB[ii][j]);
  if (i < n && j < n && i < p && j < m) ds.push(A[i][j].mul(B[i][j]));
  const pos = `(${i + 1},${j + 1})`;
  return mcq(rng, {
    subtopic: "Matrix multiplication",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find the $${pos}$ entry of $AB$.`,
    correct: correct.tex(),
    distractors: ds.map((x) => x.tex()),
    solution: `$AB$ is $(${m}\\times${n})(${n}\\times${p}) = ${m}\\times${p}$. Its $${pos}$ entry is $\\sum_k a_{${i + 1}k}b_{k${j + 1}}$: row ${i + 1} of $A$ against column ${j + 1} of $B$:\n$$${A[i].map((x, k) => `(${x.tex()})(${B[k][j].tex()})`).join(" + ")} = ${correct.tex()}.$$\nNo other entries are needed. (Multiplying entry by entry, $a_{ij}b_{ij}$, is not matrix multiplication.)`,
  });
}

/** A row of BA / AB via the row method, or a column via the column method. */
function rowOrColumn(rng: Rng): Draft {
  const A = randMat(rng, 3, 3, -3, 4);
  const B = randMat(rng, 3, 3, -3, 4);
  const k = rng.int(0, 2);
  const mode = rng.pick(["rowBA", "rowAB", "colAB", "colBA"] as const);
  const [L, R, Ln, Rn] = mode === "rowBA" || mode === "colBA" ? [B, A, "B", "A"] : [A, B, "A", "B"];
  const P = matmul(L, R);
  const Q = matmul(R, L); // product in the wrong order
  const ord = ["first", "second", "third"][k];
  if (mode.startsWith("row")) {
    const correct = P[k];
    const ds = [Q[k], col(P, k), vec([0, 0, 0]).map((_, j) => L[k][j].mul(R[k][j])), correct.map((x, j) => (j === 0 ? x.neg() : x)), col(Q, k)];
    return mcq(rng, {
      subtopic: "Row & column methods",
      prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Use the row method to find the ${ord} row of $${Ln}${Rn}$.`,
      correct: rowVecTex(correct),
      distractors: ds.map(rowVecTex),
      solution: `Row ${k + 1} of $${Ln}${Rn}$ = (row ${k + 1} of $${Ln}$)$\\,${Rn}$, a combination of the **rows of $${Rn}$** with weights $${tuple(L[k])}$:\n$$${L[k].map((w, j) => `(${w.tex()})${rowVecTex(R[j])}`).join(" + ")} = ${rowVecTex(correct)}.$$\nOnly one row of $${Ln}$ is used. The order matters: the corresponding row of $${Rn}${Ln}$ is $${rowVecTex(Q[k])}$.`,
    });
  }
  const correct = col(P, k);
  const ds = [col(Q, k), P[k], vec([0, 0, 0]).map((_, i) => L[i][k].mul(R[i][k])), correct.map((x, i) => (i === 2 ? x.neg() : x)), Q[k]];
  return mcq(rng, {
    subtopic: "Row & column methods",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Use the column method to find the ${ord} column of $${Ln}${Rn}$.`,
    correct: rowTex(correct),
    distractors: ds.map(rowTex),
    solution: `Column ${k + 1} of $${Ln}${Rn}$ = $${Ln}$ times (column ${k + 1} of $${Rn}$), a linear combination of the **columns of $${Ln}$** with weights $${tuple(col(R, k))}$:\n$$${col(R, k).map((w, i) => `(${w.tex()})${rowTex(col(L, i))}`).join(" + ")} = ${rowTex(correct)}.$$\nThe order matters: the corresponding column of $${Rn}${Ln}$ is $${rowTex(col(Q, k))}$.`,
  });
}

/** Column j of BA as a combination of the columns of B (weights = column j of A). */
function columnWeights(rng: Rng): Draft {
  const A = randMat(rng, 3, 3, -3, 4);
  const B = randMat(rng, 3, 3, -3, 3);
  const j = rng.int(0, 2);
  const ord = ["first", "second", "third"][j];
  const opt = (w: Vec) => `${tuple(w)};\\ ${rowTex(matmul(B, w.map((x) => [x]) as Mat).map((r) => r[0]))}`;
  const w = col(A, j);
  const wrong = [A[j], col(B, j), col(A, (j + 1) % 3), w.map((x, i) => (i === 0 ? x.neg() : x)), B[j]];
  return mcq(rng, {
    subtopic: "Row & column methods",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$, and let $\\mathbf{b}_1, \\mathbf{b}_2, \\mathbf{b}_3$ be the columns of $B$. The ${ord} column of $BA$ is written as $c_1\\mathbf{b}_1 + c_2\\mathbf{b}_2 + c_3\\mathbf{b}_3$. Which option gives $(c_1, c_2, c_3)$ and that column?`,
    correct: opt(w),
    distractors: wrong.map(opt),
    solution: `Column ${j + 1} of $BA$ is $B\\mathbf{a}_${j + 1}$, a linear combination of the columns of $B$ whose coefficients are the entries of column ${j + 1} of $A$: $(c_1,c_2,c_3) = ${tuple(w)}$.\n$$${w.map((c, i) => `(${c.tex()})${rowTex(col(B, i))}`).join(" + ")} = ${rowTex(col(matmul(B, A), j))}.$$\nTaking row ${j + 1} of $A$ (or a column of $B$) as the weights is the usual mistake.`,
  });
}

/** Trace of a combination of matrices (Tutorial 0B Q1 style). */
function traceExpr(rng: Rng): Draft {
  if (rng.chance(0.5)) {
    const A = randMat(rng, 3, 3, -4, 6);
    const B = randMat(rng, 3, 3, -4, 6);
    const k = rng.nz(-4, 4);
    const c = rng.nz(-3, 3);
    const tA = tr(A), tB = tr(B);
    if (tA.isZero() || tB.isZero()) retry();
    const correct = tA.add(tB.mul(c)).mul(k);
    const inner = lin(F(1), "A", F(c), "B^T");
    const kTex = k === 1 ? "" : k === -1 ? "-" : `${k}`;
    return mcq(rng, {
      subtopic: "Trace",
      prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find $${kTex}\\operatorname{trace}\\left(${inner}\\right)$.`,
      correct: correct.tex(),
      distractors: [tA.sub(tB.mul(c)).mul(k), tA.mul(k).add(tB.mul(c)), tA.add(tB.mul(c)), correct.neg(), tA.add(tB).mul(k), tA.mul(c).add(tB).mul(k)].map((x) => x.tex()),
      solution: `Only the diagonal of $${inner}$ is needed. Transposing does not move the diagonal, so its $(i,i)$ entry is $a_{ii} + (${c})b_{ii}$.\nDiagonal sums: $a_{11}+a_{22}+a_{33} = ${tA.tex()}$ and $b_{11}+b_{22}+b_{33} = ${tB.tex()}$, so\n$$${kTex}\\left(${tA.tex()} + (${F(c).tex()})(${tB.tex()})\\right) = ${correct.tex()}.$$`,
    });
  }
  // trace(C^T D^T + k B^T) with C 2x3, D 3x2, B 3x3 (Tutorial 0B Q1(ii))
  const C = randMat(rng, 2, 3, -3, 4);
  const D = randMat(rng, 3, 2, -3, 4);
  const B = randMat(rng, 3, 3, -3, 5);
  const k = rng.nz(-3, 3);
  const diag = [0, 1, 2].map((i) => col(C, i)[0].mul(D[i][0]).add(col(C, i)[1].mul(D[i][1])));
  const tCD = sumF(diag), tB = tr(B);
  if (tB.isZero()) retry();
  const correct = tCD.add(tB.mul(k));
  const kAbs = Math.abs(k) === 1 ? "" : `${Math.abs(k)}`;
  return mcq(rng, {
    subtopic: "Trace",
    prompt: `Let $B = ${matTex(B)}$, $C = ${matTex(C)}$ and $D = ${matTex(D)}$. Find $\\operatorname{trace}\\left(C^TD^T ${k < 0 ? "-" : "+"} ${kAbs}B^T\\right)$.`,
    correct: correct.tex(),
    distractors: [tCD, tCD.sub(tB.mul(k)), diag[0].add(diag[1]).add(tB.mul(k)), tCD.add(tB), correct.add(diag[2]), correct.neg()].map((x) => x.tex()),
    solution: `$C^TD^T$ is $(3\\times2)(2\\times3) = 3\\times3$. Its $(i,i)$ entry is (row $i$ of $C^T$) against (column $i$ of $D^T$) = (column $i$ of $C$)$\\cdot$(row $i$ of $D$): $${diag.map((x) => x.tex()).join(",\\ ")}$, sum $${tCD.tex()}$.\nThe diagonal of $B^T$ is the diagonal of $B$, so the diagonal of $${k}B^T$ sums to $${k}(${tB.tex()}) = ${F(k).mul(tB).tex()}$.\nTotal: $${correct.tex()}$.`,
  });
}

/** Trace of a product, computing only the diagonal entries. */
function traceOfProduct(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const A = randMat(rng, 2, n, -3, 4);
  const B = randMat(rng, n, 2, -3, 4);
  const askBig = rng.chance(0.5);
  const [L, R, Ln, Rn] = askBig ? [B, A, "B", "A"] : [A, B, "A", "B"];
  const P = matmul(L, R);
  const size = P.length;
  const diag = P.map((r, i) => r[i]);
  const correct = sumF(diag);
  const all = sumF(P.flat());
  const line = (i: number) => `(${Ln}${Rn})_{${i + 1}${i + 1}} = ${L[i].map((x, k) => `(${x.tex()})(${R[k][i].tex()})`).join(" + ")} = ${diag[i].tex()}`;
  return mcq(rng, {
    subtopic: "Trace",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find $\\operatorname{trace}(${Ln}${Rn})$.`,
    correct: correct.tex(),
    distractors: [diag[0], correct.sub(diag[size - 1]), all, correct.neg(), correct.add(P[0][1]), diag[0].mul(diag[1])].map((x) => x.tex()),
    solution: `$${Ln}${Rn}$ is $${size}\\times${size}$; only its diagonal is needed. The $(i,i)$ entry is row $i$ of $${Ln}$ against column $i$ of $${Rn}$:\n${diag.map((_, i) => `$${line(i)}$`).join("\n")}\nSo $\\operatorname{trace}(${Ln}${Rn}) = ${correct.tex()}$.`,
  });
}

/** M^2 = pM + qI: reduce M^n (PYP AY25/26 S1 Q2). */
function powerRecurrence(rng: Rng): Draft {
  const [p, q] = rng.pick([[-1, 1], [1, 1], [-1, 2], [1, 2], [2, 1], [-2, 1], [2, -1], [1, 3], [-1, 3], [3, -2]]);
  const coeffs: [Frac, Frac][] = [];
  let a = F(1), b = F(0);
  for (let n = 1; n <= 10; n++) {
    coeffs.push([a, b]);
    [a, b] = [a.mul(p).add(b), a.mul(q)];
  }
  const n = rng.int(4, 7);
  const [an, bn] = coeffs[n - 1];
  const rel = lin(F(p), "M", F(q), "I");
  const table = coeffs.slice(1, n).map(([x, y], i) => `$M^{${i + 2}} = ${lin(x, "M", y, "I")}$`).join(", ");
  const sol = `Write $M^k = a_kM + b_kI$. Then $M^{k+1} = M\\cdot M^k = a_kM^2 + b_kM = a_k(${rel}) + b_kM$, i.e. $a_{k+1} = ${lin(F(p), "a_k", F(1), "b_k")}$, $b_{k+1} = ${lin(F(q), "a_k", F(0), "")}$.\n${table}.`;
  if (rng.chance(0.5)) {
    const opt = ([x, y]: [Frac, Frac]) => `M^{${n}} = ${lin(x, "M", y, "I")}`;
    return mcq(rng, {
      subtopic: "Powers",
      prompt: `A square matrix $M$, not a scalar multiple of $I$, satisfies $M^2 = ${rel}$. Express $M^{${n}}$ in the form $aM + bI$.`,
      correct: opt([an, bn]),
      distractors: [coeffs[n - 2], coeffs[n], [bn, an] as [Frac, Frac], [an.neg(), bn] as [Frac, Frac], [an, bn.neg()] as [Frac, Frac]].map(opt),
      solution: sol,
    });
  }
  const opts = [n - 2, n - 1, n, n + 1, n + 2].filter((k) => k >= 2);
  // the target pair must not repeat at another listed power
  if (opts.some((k) => k !== n && coeffs[k - 1][0].eq(an) && coeffs[k - 1][1].eq(bn))) retry();
  return mcq(rng, {
    subtopic: "Powers",
    prompt: `A square matrix $M$, not a scalar multiple of $I$, satisfies $M^2 = ${rel}$. If $M^n = ${lin(bn, "I", an, "M")}$, find $n$.`,
    correct: `n = ${n}`,
    distractors: opts.filter((k) => k !== n).map((k) => `n = ${k}`),
    solution: `${sol}\nSo $n = ${n}$.`,
  });
}

/** Find k (and m) with A^2 = kA + mI by comparing entries (PYP: find k with A^2 = kA - 2I). */
function squareRelation(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -4, 5);
  const k = tr(A), m = det2(A).neg();
  if (k.isZero() || m.isZero() || k.abs().eq(m.abs()) || A[0][1].isZero()) retry();
  const A2 = matmul(A, A);
  if (!matEq(A2, madd(mscale(A, k), mscale(identity(2), m)))) retry();
  const cmp = `Compare the $(1,2)$ entries (the $I$ term is $0$ there): $(A^2)_{12} = ${A2[0][1].tex()} = k\\cdot(${A[0][1].tex()})$, so $k = ${k.tex()}$.`;
  if (rng.chance(0.5)) {
    const opt = (x: Frac, y: Frac) => `k = ${x.tex()},\\ m = ${y.tex()}`;
    return mcq(rng, {
      subtopic: "Powers",
      prompt: `Let $A = ${matTex(A)}$. Find the scalars $k$ and $m$ such that $A^2 = kA + mI$.`,
      correct: opt(k, m),
      distractors: [opt(k.neg(), m.neg()), opt(k, m.neg()), opt(k.neg(), m), opt(m, k), opt(m.neg(), k.neg())],
      solution: `$A^2 = ${matTex(A2)}$ and $kA + mI = \\begin{bmatrix} ${A[0][0].tex()}k + m & ${A[0][1].tex()}k \\\\ ${A[1][0].tex()}k & ${A[1][1].tex()}k + m \\end{bmatrix}$.\n${cmp} Then the $(1,1)$ entries give $${A2[0][0].tex()} = ${A[0][0].mul(k).tex()} + m$, so $m = ${m.tex()}$. Check: $${k.tex()}A ${m.n < 0 ? "-" : "+"} ${m.abs().eq(1) ? "" : m.abs().tex()}I = ${matTex(A2)}$ ✓.`,
    });
  }
  const mTxt = `${m.n < 0 ? "-" : "+"} ${m.abs().eq(1) ? "" : m.abs().tex()}I`;
  return mcq(rng, {
    subtopic: "Powers",
    prompt: `Let $A = ${matTex(A)}$. Find $k$ such that $A^2 = kA ${mTxt}$.`,
    correct: `k = ${k.tex()}`,
    distractors: [k.neg(), k.add(1), k.sub(1), m, m.neg(), k.mul(2)].filter((x) => !x.eq(k)).map((x) => `k = ${x.tex()}`),
    solution: `$A^2 = ${matTex(A2)}$.\n${cmp}\nCheck every entry: $${k.tex()}A ${mTxt} = ${matTex(A2)}$ ✓.`,
  });
}

/** Find the unknown entries making B commute with A. */
function commuteSolve(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -3, 4);
  if (A[1][0].isZero() || A[0][1].isZero() || isScalarMat(A)) retry();
  const alpha = rng.int(-3, 3);
  const beta = rng.nz(-2, 3);
  const B = madd(mscale(identity(2), alpha), mscale(A, beta));
  const x = B[0][0], y = B[0][1];
  if (x.eq(y)) retry();
  const shown = `\\begin{bmatrix} x & y \\\\ ${B[1][0].tex()} & ${B[1][1].tex()} \\end{bmatrix}`;
  const opt = (u: Frac, v: Frac) => `x = ${u.tex()},\\ y = ${v.tex()}`;
  const AB = matmul(A, B);
  return mcq(rng, {
    subtopic: "Commuting matrices",
    prompt: `Find $x$ and $y$ such that $A = ${matTex(A)}$ and $B = ${shown}$ commute ($AB = BA$).`,
    correct: opt(x, y),
    distractors: [opt(y, x), opt(x.neg(), y), opt(x, y.neg()), opt(B[1][1], B[1][0]), opt(x.add(1), y)],
    solution: `Write out $AB$ and $BA$ with the unknowns and match all four entries (equal matrices have equal entries). The $(2,1)$ and $(2,2)$ equations give $x = ${x.tex()}$ and $y = ${y.tex()}$; the other two then hold.\nCheck: $AB = BA = ${matTex(AB)}$.`,
  });
}

/** Given (kA)^{-1} or (kA^T)^{-1}, find A (Tutorial 0B Q4). */
function scaledInverse(rng: Rng): Draft {
  const M = unimodular2(rng);
  const k = rng.pick([2, 3, 4, 5, 7]);
  const withT = rng.chance(0.35);
  const Minv = inverse(M)!;
  const base = withT ? transpose(Minv) : Minv;
  const A = mscale(base, F(1, k));
  const swapOnly = mat([[0, 0], [0, 0]]).map((r, i) => r.map((_, j) => (i === j ? M[1 - i][1 - j] : M[i][j])));
  const ds = [mscale(base, k), mscale(withT ? transpose(M) : M, F(1, k)), mscale(swapOnly, F(1, k)), mscale(base, F(-1, k))];
  if (withT) ds.push(mscale(Minv, F(1, k)));
  else ds.push(mscale(transpose(Minv), F(1, k)));
  const lhs = withT ? `(${k}A^T)^{-1}` : `(${k}A)^{-1}`;
  return mcq(rng, {
    subtopic: "Inverse & matrix equations",
    prompt: `If $${lhs} = ${matTex(M)}$, find $A$.`,
    correct: matTex(A),
    distractors: ds.filter((D) => !matEq(D, A)).map((D) => matTex(D)),
    solution: `$${k}A${withT ? "^T" : ""}$ is the inverse of the given matrix: $${k}A${withT ? "^T" : ""} = ${matTex(M)}^{-1}$. Here $ad - bc = ${det2(M).tex()}$, so (swap the diagonal, negate the off-diagonal, divide by $ad - bc$) the inverse is $${matTex(Minv)}$.\n${withT ? `$A^T = \\frac{1}{${k}}${matTex(Minv)}$, so $A = ${matTex(A)}$ (do not forget the final transpose, $(A^T)^T = A$).` : `$A = \\frac{1}{${k}}${matTex(Minv)}$.`}\nDivide by $${k}$; multiplying by $${k}$ is the usual slip.`,
  });
}

/** AX = B or XA = B. */
function matrixEquation(rng: Rng): Draft {
  const A = unimodular2(rng);
  const B = randMat(rng, 2, 2, -3, 4);
  const Ai = inverse(A)!;
  const left = rng.chance(0.5);
  const X = left ? matmul(Ai, B) : matmul(B, Ai);
  const other = left ? matmul(B, Ai) : matmul(Ai, B);
  if (matEq(X, other)) retry();
  return mcq(rng, {
    subtopic: "Inverse & matrix equations",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find the matrix $X$ with $${left ? "AX" : "XA"} = B$.`,
    correct: matTex(X),
    distractors: [other, matmul(A, B), matmul(B, A), mscale(X, -1)].filter((D) => !matEq(D, X)).map((D) => matTex(D)),
    solution: `$ad - bc = ${det2(A).tex()}$, so $A^{-1} = ${matTex(Ai)}$.\n${left ? "$AX = B$: multiply on the **left** by $A^{-1}$, so $X = A^{-1}B$" : "$XA = B$: multiply on the **right** by $A^{-1}$, so $X = BA^{-1}$"} $= ${matTex(X)}$.\nThe other order gives $${matTex(other)}$, which does not solve the equation because $AB \\ne BA$ in general.`,
  });
}

/** 2×2 inverse by the formula. */
function inverse2x2(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -4, 5);
  const d = det2(A);
  if (d.isZero() || A.flat().some((x) => x.isZero())) retry();
  const [a, b, c, e] = [A[0][0], A[0][1], A[1][0], A[1][1]];
  const adj = [[e, b.neg()], [c.neg(), a]];
  const Ai = mscale(adj, F(1).div(d));
  const ds = [
    mscale([[e, b], [c, a]], F(1).div(d)),
    mscale([[e.neg(), b], [c, a.neg()]], F(1).div(d)),
    adj,
    mscale(adj, F(-1).div(d)),
    mscale([[a, b.neg()], [c.neg(), e]], F(1).div(d)),
  ];
  return mcq(rng, {
    subtopic: "Inverse & matrix equations",
    prompt: `Find the inverse of $A = ${matTex(A)}$.`,
    correct: matTex(Ai),
    distractors: ds.filter((D) => !matEq(D, Ai)).map((D) => matTex(D)),
    solution: `$ad - bc = (${a.tex()})(${e.tex()}) - (${b.tex()})(${c.tex()}) = ${d.tex()} \\ne 0$, so $A$ is invertible and\n$$A^{-1} = \\frac{1}{${d.tex()}}${matTex(adj)} = ${matTex(Ai)}.$$\nSwap the diagonal entries, negate the off-diagonal entries, divide by $ad - bc$.`,
  });
}

/** Values of k making a 2×2 matrix singular. */
function singularK(rng: Rng): Draft {
  const [r1, r2] = rng.shuffle([-4, -3, -2, -1, 1, 2, 3, 4, 5]).slice(0, 2);
  if (r1 + r2 === 0) retry();
  const prod = -r1 * r2; // = a*b
  const divs = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].filter((x) => prod % x === 0 && Math.abs(prod / x) <= 20);
  const a = rng.pick(divs) * rng.pick([1, -1]);
  const bb = prod / a;
  const c = -(r1 + r2);
  const [lo, hi] = r1 < r2 ? [r1, r2] : [r2, r1];
  const kc = c === 0 ? "k" : `k ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;
  const opt = (x: number, y: number) => `k = ${Math.min(x, y)} \\text{ or } k = ${Math.max(x, y)}`;
  return mcq(rng, {
    subtopic: "Inverse & matrix equations",
    prompt: `For which values of $k$ is $\\begin{bmatrix} k & ${a} \\\\ ${bb} & ${kc} \\end{bmatrix}$ **not** invertible?`,
    correct: opt(lo, hi),
    distractors: [opt(-lo, -hi), opt(lo, -hi), opt(-lo, hi), `k = ${hi} \\text{ only}`, `k = ${lo} \\text{ only}`],
    solution: `A $2\\times2$ matrix is invertible iff $ad - bc \\ne 0$. Here $ad - bc = k(${kc}) - (${a})(${bb}) = k^2 ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}k ${-prod < 0 ? "-" : "+"} ${Math.abs(prod)} = (k ${lo < 0 ? "+" : "-"} ${Math.abs(lo)})(k ${hi < 0 ? "+" : "-"} ${Math.abs(hi)})$.\nIt is $0$ (so the matrix is singular) exactly for $k = ${lo}$ or $k = ${hi}$.`,
  });
}

/** Unknown entries of a symmetric / skew-symmetric matrix. */
function symEntries(rng: Rng): Draft {
  const skew = rng.chance(0.5);
  const m = [rng.nz(-6, 6), rng.nz(-6, 6), rng.nz(-6, 6)]; // visible mirror entries a21, a32, a13
  if (new Set(m.map(Math.abs)).size < 3) retry();
  const d = skew ? [0, 0, 0] : [rng.int(-5, 5), rng.int(-5, 5), rng.int(-5, 5)];
  const sign = skew ? -1 : 1;
  const ans = m.map((x) => x * sign); // x = a12, y = a23, z = a31
  const shown = `\\begin{bmatrix} ${d[0]} & x & ${m[2]} \\\\ ${m[0]} & ${d[1]} & y \\\\ z & ${m[1]} & ${d[2]} \\end{bmatrix}`;
  const t = (v: number[]) => `(x, y, z) = (${v.join(", ")})`;
  const word = skew ? "skew-symmetric" : "symmetric";
  return mcq(rng, {
    subtopic: "Special matrices",
    prompt: `The matrix $${shown}$ is ${word}. Find $x$, $y$ and $z$.`,
    correct: t(ans),
    distractors: [t(ans.map((x) => -x)), t([ans[0], -ans[1], ans[2]]), t([ans[1], ans[2], ans[0]]), t([-ans[0], ans[1], -ans[2]]), t([m[1], m[2], m[0]].map((x) => x * sign))],
    solution: `${skew ? "Skew-symmetric: $A^T = -A$, i.e. $a_{ij} = -a_{ji}$." : "Symmetric: $A^T = A$, i.e. $a_{ij} = a_{ji}$."}\n$x = a_{12} = ${skew ? "-" : ""}a_{21}$, $y = a_{23} = ${skew ? "-" : ""}a_{32}$, $z = a_{31} = ${skew ? "-" : ""}a_{13}$, so $${t(ans)}$.${skew ? " (Consistently, the diagonal of a skew-symmetric matrix is $0$.)" : ""}`,
  });
}

/** Outer products u v^T: entries, columns, rows (PYP AY24/25 S2 Q7). */
function outerProduct(rng: Rng): Draft {
  const u = vec([rng.nz(-3, 3), rng.nz(-3, 3), rng.nz(-3, 3)]);
  const v = vec([rng.nz(-3, 3), rng.nz(-3, 3), rng.nz(-3, 3)]);
  const P = u.map((a) => v.map((b) => a.mul(b)));
  const mode = rng.pick(["entry", "column", "row"] as const);
  const head = `Let $\\mathbf{u} = ${rowTex(u)}$, $\\mathbf{v} = ${rowTex(v)}$ and $P = \\mathbf{u}\\mathbf{v}^T$.`;
  const i = rng.int(0, 2), j = rng.int(0, 2);
  if (mode === "entry") {
    if (i === j) retry();
    const dotuv = sumF(u.map((x, k) => x.mul(v[k])));
    return mcq(rng, {
      subtopic: "Outer products",
      prompt: `${head} Find the $(${i + 1},${j + 1})$ entry of $P$.`,
      correct: P[i][j].tex(),
      distractors: [P[j][i], dotuv, u[i].add(v[j]), P[i][j].neg(), P[i][i]].filter((x) => !x.eq(P[i][j])).map((x) => x.tex()),
      solution: `$\\mathbf{u}$ is $3\\times1$ and $\\mathbf{v}^T$ is $1\\times3$, so $P$ is $3\\times3$ with $p_{ij} = u_iv_j$ (each sum has a single term).\n$p_{${i + 1}${j + 1}} = u_${i + 1}v_${j + 1} = (${u[i].tex()})(${v[j].tex()}) = ${P[i][j].tex()}$. (The $(${j + 1},${i + 1})$ entry $u_${j + 1}v_${i + 1}$ is different in general.)`,
    });
  }
  if (mode === "column") {
    const correct = col(P, j);
    return mcq(rng, {
      subtopic: "Outer products",
      prompt: `${head} Find the ${["first", "second", "third"][j]} column of $P$.`,
      correct: rowTex(correct),
      distractors: [P[j], v.map((x) => x.mul(u[j])), u, correct.map((x) => x.neg()), v].map(rowTex),
      solution: `Column method: column ${j + 1} of $\\mathbf{u}\\mathbf{v}^T$ is $\\mathbf{u}$ times column ${j + 1} of $\\mathbf{v}^T$, which is the number $v_${j + 1} = ${v[j].tex()}$.\nSo the column is $${v[j].tex()}\\,${rowTex(u)} = ${rowTex(correct)}$: every column of $P$ is a multiple of $\\mathbf{u}$.`,
    });
  }
  const correct = P[i];
  return mcq(rng, {
    subtopic: "Outer products",
    prompt: `${head} Find the ${["first", "second", "third"][i]} row of $P$.`,
    correct: rowVecTex(correct),
    distractors: [col(P, i), u.map((x) => x.mul(v[i])), v, correct.map((x) => x.neg()), u].map(rowVecTex),
    solution: `Row method: row ${i + 1} of $\\mathbf{u}\\mathbf{v}^T$ is (row ${i + 1} of $\\mathbf{u}$)$\\,\\mathbf{v}^T = u_${i + 1}\\mathbf{v}^T$ with $u_${i + 1} = ${u[i].tex()}$.\nSo the row is $${rowVecTex(correct)}$: every row of $P$ is a multiple of $\\mathbf{v}^T$.`,
  });
}

/** A^2 + bA + cI for a 2×2 matrix. */
function matrixExpr(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -3, 3);
  const b = rng.nz(-4, 4);
  const c = rng.nz(-5, 5);
  const A2 = matmul(A, A);
  const base = madd(A2, mscale(A, b));
  const correct = madd(base, mscale(identity(2), c));
  const J = mat([[1, 1], [1, 1]]);
  const sq = A.map((r) => r.map((x) => x.mul(x)));
  const ds = [madd(base, mscale(J, c)), base, msub(base, mscale(identity(2), c)), madd(msub(A2, mscale(A, b)), mscale(identity(2), c)), madd(madd(sq, mscale(A, b)), mscale(identity(2), c))];
  const expr = `A^2 ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}A ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}I`;
  return mcq(rng, {
    subtopic: "Powers",
    prompt: `Let $A = ${matTex(A)}$. Compute $${expr}$.`,
    correct: matTex(correct),
    distractors: ds.filter((D) => !matEq(D, correct)).map((D) => matTex(D)),
    solution: `$A^2 = AA = ${matTex(A2)}$ (rows of $A$ against columns of $A$, not the squares of the entries).\nThen $${expr} = ${matTex(A2)} + ${matTex(mscale(A, b))} + ${matTex(mscale(identity(2), c))} = ${matTex(correct)}$.\nThe term $${c}I$ only changes the diagonal; adding $${c}$ to every entry is the classic slip.`,
  });
}

/** Commutator [A,B] = AB - BA (PYP older). */
function commutator(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -3, 3);
  const B = randMat(rng, 2, 2, -3, 3);
  const AB = matmul(A, B), BA = matmul(B, A);
  const C = msub(AB, BA);
  if (C.flat().every((x) => x.isZero())) retry();
  const had = A.map((r, i) => r.map((x, j) => x.mul(B[i][j])));
  const ds = [msub(BA, AB), madd(AB, BA), AB, msub(had, had), BA].filter((D) => !matEq(D, C));
  return mcq(rng, {
    subtopic: "Commutator",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find the commutator $[A, B] = AB - BA$.`,
    correct: matTex(C),
    distractors: ds.map((D) => matTex(D)),
    solution: `$AB = ${matTex(AB)}$, $BA = ${matTex(BA)}$, so $[A,B] = AB - BA = ${matTex(C)}$.\n$BA - AB$ is $-[A,B]$; since $AB \\ne BA$ in general, the order matters.`,
  });
}

/** Sizes of products / transposes. */
function sizes(rng: Rng): Draft {
  const [a, b, c, d] = rng.shuffle([2, 3, 4, 5, 6, 7]).slice(0, 4);
  // A: a×b, B: a×c, C: c×d
  const exprs: { e: string; r: [number, number]; why: string }[] = [
    { e: "A^TB", r: [b, c], why: `$(${b}\\times${a})(${a}\\times${c})$` },
    { e: "A^TBC", r: [b, d], why: `$(${b}\\times${a})(${a}\\times${c})(${c}\\times${d})$` },
    { e: "C^TB^TA", r: [d, b], why: `$(${d}\\times${c})(${c}\\times${a})(${a}\\times${b})$` },
    { e: "(BC)^TA", r: [d, b], why: `$BC$ is $${a}\\times${d}$, so $(BC)^T$ is $${d}\\times${a}$, times $(${a}\\times${b})$` },
    { e: "BCC^TB^T", r: [a, a], why: `$(${a}\\times${c})(${c}\\times${d})(${d}\\times${c})(${c}\\times${a})$` },
    { e: "(A^TB)^T", r: [c, b], why: `$A^TB$ is $${b}\\times${c}$; transposing swaps the sizes` },
  ];
  const pick = rng.pick(exprs);
  const sz = ([x, y]: [number, number]) => `${x}\\times ${y}`;
  const pool: [number, number][] = [[pick.r[1], pick.r[0]], [a, b], [b, a], [c, d], [a, d], [b, d], [d, b], [a, c], [c, b], [b, c]];
  return mcq(rng, {
    subtopic: "Matrix multiplication",
    prompt: `$A$ is $${a}\\times${b}$, $B$ is $${a}\\times${c}$ and $C$ is $${c}\\times${d}$. What is the size of $${pick.e}$?`,
    correct: sz(pick.r),
    distractors: pool.filter(([x, y]) => !(x === pick.r[0] && y === pick.r[1])).map(sz),
    solution: `Multiply sizes left to right, checking that inner numbers match: ${pick.why}, giving $${sz(pick.r)}$. The transpose of an $m\\times n$ matrix is $n\\times m$, and $(m\\times r)(r\\times n) = m\\times n$.`,
  });
}

/** True / False / not-enough-information facts with a random size. */
const FACTS: { s: (n: number) => string; a: 0 | 1 | 2; why: string | ((n: number) => string); sub: string; ref: string }[] = [
  { sub: "Transpose", ref: "Slides 0B Operations on Matrices (mtx p8)", s: (n) => `For all $${n}\\times${n}$ matrices $A$ and $B$, $(A + B)^T = A^T + B^T$.`, a: 0, why: "This is one of the properties on mtx p8: transposing is done entry by entry, and $a_{ji} + b_{ji}$ is the $(i,j)$ entry of both sides. **True**." },
  { sub: "Transpose", ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)", s: (n) => `For all $${n}\\times${n}$ matrices $A$ and $B$, $(AB)^T = A^TB^T$.`, a: 1, why: "The order reverses: $(AB)^T = B^TA^T$, which differs from $A^TB^T$ unless $A^T$ and $B^T$ commute. **False**." },
  { sub: "Zero products & cancellation", ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)", s: (n) => `Every $${n}\\times${n}$ matrix $A$ with $A^2 = 0$ is the zero matrix.`, a: 1, why: "$AB = 0$ does not force $A = 0$ or $B = 0$. The matrix with a single $1$ in position $(1,2)$ and zeros elsewhere is nonzero, yet its square is $0$ (e.g. $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}^2 = 0$). **False**." },
  { sub: "Special matrices", ref: "Slides 0B symmetric (mtx p6), $(AB)^T = B^TA^T$ (mtx p10); PYP AY25/26 S2 Q17", s: (n) => `If $A$ is a $${n}\\times${n + 2}$ matrix, then $AA^T$ is a symmetric $${n}\\times${n}$ matrix.`, a: 0, why: (n) => `$AA^T$ is $(${n}\\times${n + 2})(${n + 2}\\times${n}) = ${n}\\times${n}$, and $(AA^T)^T = (A^T)^TA^T = AA^T$. **True**.` },
  { sub: "Trace", ref: "Slides 0B trace (mtx p5), scalar multiple (mtx p7)", s: (n) => `For every $${n}\\times${n}$ matrix $A$ and scalar $k \\ne 0$, $\\operatorname{trace}(kA) = k + \\operatorname{trace}(A)$.`, a: 1, why: "Every diagonal entry of $kA$ is $ka_{ii}$, so $\\operatorname{trace}(kA) = ka_{11} + \\cdots + ka_{nn} = k\\operatorname{trace}(A)$, not $k + \\operatorname{trace}(A)$. For $A = 0$: $\\operatorname{trace}(kA) = 0$ but $k + \\operatorname{trace}(A) = k \\ne 0$. **False**." },
  { sub: "Special matrices", ref: "Slides 0B transpose, skew-symmetric (mtx p6)", s: (n) => `For every $${n}\\times${n}$ matrix $A$, the matrix $A - A^T$ has only zeros on its main diagonal.`, a: 0, why: "Transposing keeps the diagonal in place, so the $(i,i)$ entry of $A - A^T$ is $a_{ii} - a_{ii} = 0$. **True**." },
  { sub: "Inverse & matrix equations", ref: "Slides 0B Inverse of a Matrix: $(AB)^{-1} = B^{-1}A^{-1}$ (mtx p13)", s: (n) => `If $A$ is an invertible $${n}\\times${n}$ matrix, then $A^2$ is invertible and $(A^2)^{-1} = (A^{-1})^2$.`, a: 0, why: "Apply $(AB)^{-1} = B^{-1}A^{-1}$ with $B = A$: $(AA)^{-1} = A^{-1}A^{-1}$. **True**." },
  { sub: "Transpose", ref: "Slides 0B transpose (mtx p6), Matrix Multiplication (mtx p9)", s: (n) => `If $A$ is $${n}\\times${n + 1}$ and $B$ is $${n + 1}\\times${n + 3}$, then $(AB)^T$ is $${n + 3}\\times${n}$.`, a: 0, why: (n) => `$AB$ is $${n}\\times${n + 3}$, so its transpose is $${n + 3}\\times${n}$. **True**.` },
  { sub: "Algebra rules", ref: "Slides 0B Properties of Matrix Multiplication: $AB \\ne BA$ in general (mtx p10)", s: (n) => `Every $${n}\\times${n}$ matrix $A$ commutes with $A^T$.`, a: 1, why: "Counterexample: $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ (padded with zeros) gives $AA^T = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ but $A^TA = \\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$. **False**." },
  { sub: "Trace", ref: "Slides 0B trace, symmetric, skew-symmetric (mtx p5–6)", s: (n) => `$A$ is a $${n}\\times${n}$ matrix with $\\operatorname{trace} A = 0$ (nothing else is known). Then $A$ is skew-symmetric.`, a: 2, why: "A skew-symmetric matrix has zero diagonal, hence trace $0$, so it is possible. But the diagonal matrix with diagonal entries $1, -1, 0, \\dots, 0$ has trace $0$ and is symmetric, not skew-symmetric. Both cases are possible: **Not enough information**." },
  { sub: "Zero products & cancellation", ref: "Slides 0B Properties (mtx p10), Inverse of a Matrix (mtx p13)", s: (n) => `$A$, $B$, $C$ are $${n}\\times${n}$ matrices with $AB = AC$ and $A \\ne 0$ (nothing else is known). Then $B = C$.`, a: 2, why: "If $A$ happens to be invertible, multiplying by $A^{-1}$ on the left gives $B = C$. If not, $B \\ne C$ is possible (e.g. $A$ diagonal with entries $1, 0, \\dots, 0$, $B = 0$, $C$ diagonal with entries $0, 1, 0, \\dots, 0$: $AB = AC = 0$). **Not enough information**." },
  { sub: "Powers", ref: "Slides 0B Properties: $A(BC) = (AB)C$ (mtx p10)", s: (n) => `If $A$ is $${n}\\times${n}$ and $A^2 = A$, then $A^{${n + 5}} = A$.`, a: 0, why: "Each extra factor of $A$ changes nothing: $A^3 = A^2A = AA = A$, $A^4 = A^3A = AA = A$, and so on. **True**." },
  { sub: "Inverse & matrix equations", ref: "Slides 0B Inverse of a Matrix (mtx p13)", s: (n) => `For all invertible $${n}\\times${n}$ matrices $A$ and $B$, $(AB)^{-1} = A^{-1}B^{-1}$.`, a: 1, why: "The order reverses: $(AB)^{-1} = B^{-1}A^{-1}$. The stated formula fails whenever $A^{-1}$ and $B^{-1}$ do not commute. **False**." },
  { sub: "Special matrices", ref: "Slides 0B symmetric (mtx p6), transpose rules (mtx p8)", s: (n) => `For every $${n}\\times${n}$ matrix $A$, the matrix $A + A^T$ is symmetric.`, a: 0, why: "$(A + A^T)^T = A^T + (A^T)^T = A^T + A$. **True**." },
];

function tfnFacts(rng: Rng): Draft {
  const f = rng.pick(FACTS);
  const n = rng.int(2, 5);
  return { ...tfn({ subtopic: f.sub, prompt: f.s(n), answer: f.a, solution: typeof f.why === "string" ? f.why : f.why(n) }), ref: f.ref };
}

export const matricesGens: ((rng: Rng) => Draft)[] = [
  cite("Slides 0B Matrix Multiplication (mtx p9)", productEntry),
  cite("Slides 0B Matrix Multiplication by Columns and by Rows (mtx p11); Tutorial 0B Q2", rowOrColumn),
  cite("Slides 0B Matrix Products as Linear Combinations (mtx p12); Tutorial 0B Q3", columnWeights),
  cite("Tutorial 0B Q1; Slides 0B trace, transpose (mtx p5–6)", traceExpr),
  cite("Slides 0B trace (mtx p5), Matrix Multiplication (mtx p9); Tutorial 0B Q1", traceOfProduct),
  cite("PYP AY25/26 S1 Q2 ($M^2 = I - M$, find $n$)", powerRecurrence),
  cite("PYP older (find $k$ with $A^2 = kA - 2I$); Slides 0B Equality (mtx p7)", squareRelation),
  cite("Slides 0B Properties: $AB \\ne BA$ (mtx p10), Equality (mtx p7)", commuteSolve),
  cite("Tutorial 0B Q4; Slides 0B Inverse of a Matrix (mtx p13)", scaledInverse),
  cite("PYP AY25/26 S2 Q5; Slides 0B Inverse of a Matrix (mtx p13)", matrixEquation),
  cite("Slides 0B Inverse of a Matrix: $2\\times2$ formula (mtx p13)", inverse2x2),
  cite("Slides 0B Inverse of a Matrix: invertible iff $ad - bc \\ne 0$ (mtx p13)", singularK),
  cite("Slides 0B symmetric / skew-symmetric (mtx p6)", symEntries),
  cite("PYP AY24/25 S2 Q7 ($A = \\mathbf{x}\\mathbf{r}^T$); Slides 0B Multiplication by Columns and by Rows (mtx p11)", outerProduct),
  cite("Slides 0B Operations on Matrices (mtx p7–9), identity matrix (mtx p5)", matrixExpr),
  cite("PYP older (commutator $[A,B] = AB - BA$); Slides 0B Matrix Multiplication (mtx p9)", commutator),
  cite("Slides 0B transpose (mtx p6), Matrix Multiplication sizes (mtx p9)", sizes),
  tfnFacts,
];
