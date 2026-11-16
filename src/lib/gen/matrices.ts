import {
  F, Frac, identity, inverse, madd, mat, Mat, matEq, matmul, matTex, mscale, msub, rowTex, transpose, vec, Vec,
} from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

function randMat(rng: Rng, m: number, n: number, lo = -3, hi = 4): Mat {
  return mat(Array.from({ length: m }, () => Array.from({ length: n }, () => rng.int(lo, hi))));
}

const tr = (A: Mat) => A.reduce((s, r, i) => s.add(r[i]), F(0));
const det2 = (A: Mat) => A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
const rowVecTex = (v: Vec) => `\\begin{bmatrix} ${v.map((x) => x.tex()).join(" & ")} \\end{bmatrix}`;
const tuple = (xs: (Frac | number)[]) => `(${xs.map((x) => Frac.of(x).tex()).join(",\\ ")})`;
const col = (A: Mat, j: number) => A.map((r) => r[j]);
const isScalarMat = (A: Mat) => A.every((r, i) => r.every((x, j) => (i === j ? x.eq(A[0][0]) : x.isZero())));

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
    solution: `$AB$ is $(${m}\\times${n})(${n}\\times${p}) = ${m}\\times${p}$. Its $${pos}$ entry is (row ${i + 1} of $A$)$\\cdot$(column ${j + 1} of $B$):\n$$${A[i].map((x, k) => `(${x.tex()})(${B[k][j].tex()})`).join(" + ")} = ${correct.tex()}.$$\nNo other entries are needed. (Multiplying entry by entry, $a_{ij}b_{ij}$, is not matrix multiplication.)`,
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
    solution: `Column ${k + 1} of $${Ln}${Rn}$ = $${Ln}$ times (column ${k + 1} of $${Rn}$), a combination of the **columns of $${Ln}$** with weights $${tuple(col(R, k))}$:\n$$${col(R, k).map((w, i) => `(${w.tex()})${rowTex(col(L, i))}`).join(" + ")} = ${rowTex(correct)}.$$\nThe order matters: the corresponding column of $${Rn}${Ln}$ is $${rowTex(col(Q, k))}$.`,
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
    solution: `Column ${j + 1} of $BA$ is $B\\mathbf{a}_${j + 1}$, so the weights are the entries of column ${j + 1} of $A$: $(c_1,c_2,c_3) = ${tuple(w)}$.\n$$${w.map((c, i) => `(${c.tex()})${rowTex(col(B, i))}`).join(" + ")} = ${rowTex(col(matmul(B, A), j))}.$$\nTaking row ${j + 1} of $A$ (or a column of $B$) as the weights is the usual mistake.`,
  });
}

/** Trace of a linear combination (tutorial style). */
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
    return mcq(rng, {
      subtopic: "Trace",
      prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find $${k === 1 ? "" : k === -1 ? "-" : k}\\operatorname{tr}\\left(${inner}\\right)$.`,
      correct: correct.tex(),
      distractors: [tA.sub(tB.mul(c)).mul(k), tA.mul(k).add(tB.mul(c)), tA.add(tB.mul(c)), correct.neg(), tA.add(tB).mul(k), tA.mul(c).add(tB).mul(k)].map((x) => x.tex()),
      solution: `Trace is linear and $\\operatorname{tr}(B^T) = \\operatorname{tr}B$. Here $\\operatorname{tr}A = ${tA.tex()}$ and $\\operatorname{tr}B = ${tB.tex()}$, so\n$$${k === 1 ? "" : k === -1 ? "-" : k}\\left(${tA.tex()} + (${F(c).tex()})(${tB.tex()})\\right) = ${correct.tex()}.$$\nOnly the diagonals matter; there is no need to form the matrix.`,
    });
  }
  // tr(C^T D^T + k B^T) with C 2x3, D 3x2, B 3x3
  const C = randMat(rng, 2, 3, -3, 4);
  const D = randMat(rng, 3, 2, -3, 4);
  const B = randMat(rng, 3, 3, -3, 5);
  const k = rng.nz(-3, 3);
  const CD = matmul(C, D);
  const tCD = tr(CD), tB = tr(B);
  if (tB.isZero()) retry();
  const correct = tCD.add(tB.mul(k));
  return mcq(rng, {
    subtopic: "Trace",
    prompt: `Let $B = ${matTex(B)}$, $C = ${matTex(C)}$ and $D = ${matTex(D)}$. Find $\\operatorname{tr}\\left(C^TD^T ${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}B^T\\right)$.`,
    correct: correct.tex(),
    distractors: [tCD, tCD.sub(tB.mul(k)), CD[0][0].add(tB.mul(k)), tCD.add(tB), correct.add(CD[0][1])].map((x) => x.tex()),
    solution: `$C^TD^T = (DC)^T$, so $\\operatorname{tr}(C^TD^T) = \\operatorname{tr}(DC) = \\operatorname{tr}(CD)$, and $CD$ is only $2\\times2$: $(CD)_{11} = ${CD[0][0].tex()}$, $(CD)_{22} = ${CD[1][1].tex()}$, so $\\operatorname{tr}(C^TD^T) = ${tCD.tex()}$.\n$\\operatorname{tr}(${k}B^T) = ${k}\\operatorname{tr}B = ${F(k).mul(tB).tex()}$.\nTotal: $${correct.tex()}$.`,
  });
}

/** tr(AB) = tr(BA) for non-square factors. */
function traceProduct(rng: Rng): Draft {
  const m = 2;
  const n = rng.pick([3, 4]);
  const A = randMat(rng, m, n, -3, 4);
  const B = randMat(rng, n, m, -3, 4);
  const AB = matmul(A, B);
  const correct = tr(AB);
  const askBig = rng.chance(0.6);
  const all = AB.flat().reduce((s, x) => s.add(x), F(0));
  return mcq(rng, {
    subtopic: "Trace",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find $\\operatorname{tr}(${askBig ? "BA" : "AB"})$.`,
    correct: correct.tex(),
    distractors: [AB[0][0], AB[1][1], all, correct.neg(), AB[0][0].sub(AB[1][1])].map((x) => x.tex()),
    solution: `${askBig ? `$BA$ is $${n}\\times${n}$, but $\\operatorname{tr}(BA) = \\operatorname{tr}(AB)$ and $AB$ is only $2\\times2$.\n` : ""}$(AB)_{11} = ${A[0].map((x, k) => `(${x.tex()})(${B[k][0].tex()})`).join(" + ")} = ${AB[0][0].tex()}$\n$(AB)_{22} = ${A[1].map((x, k) => `(${x.tex()})(${B[k][1].tex()})`).join(" + ")} = ${AB[1][1].tex()}$\nSo the trace is $${correct.tex()}$.`,
  });
}

/** M^2 = pM + qI: reduce M^n. */
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
  const sol = `Write $M^k = a_kM + b_kI$. Then $M^{k+1} = a_kM^2 + b_kM = a_k(${rel}) + b_kM$, i.e. $a_{k+1} = ${lin(F(p), "a_k", F(1), "b_k")}$, $b_{k+1} = ${lin(F(q), "a_k", F(0), "")}$.\n${table}.`;
  if (rng.chance(0.5)) {
    const opt = ([x, y]: [Frac, Frac]) => `M^{${n}} = ${lin(x, "M", y, "I")}`;
    return mcq(rng, {
      subtopic: "Powers & polynomials",
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
    subtopic: "Powers & polynomials",
    prompt: `A square matrix $M$, not a scalar multiple of $I$, satisfies $M^2 = ${rel}$. If $M^n = ${lin(bn, "I", an, "M")}$, find $n$.`,
    correct: `n = ${n}`,
    distractors: opts.filter((k) => k !== n).map((k) => `n = ${k}`),
    solution: `${sol}\nSo $n = ${n}$. (Because $M$ is not a multiple of $I$, the coefficients $a, b$ are unique.)`,
  });
}

/** A^2 = kA + mI for a 2x2 matrix (Cayley–Hamilton), or A^{-1} from it. */
function cayleyHamilton(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -4, 5);
  const t = tr(A), d = det2(A);
  if (t.isZero() || d.isZero() || t.abs().eq(d.abs()) || (A[0][1].isZero() && A[1][0].isZero())) retry();
  const A2 = matmul(A, A);
  if (rng.chance(0.55)) {
    const opt = (k: Frac, m: Frac) => `k = ${k.tex()},\\ m = ${m.tex()}`;
    return mcq(rng, {
      subtopic: "Powers & polynomials",
      prompt: `Let $A = ${matTex(A)}$. Find the scalars $k$ and $m$ such that $A^2 = kA + mI$.`,
      correct: opt(t, d.neg()),
      distractors: [opt(t.neg(), d), opt(t, d), opt(t.neg(), d.neg()), opt(d, t.neg()), opt(d.neg(), t)],
      solution: `$A^2 = ${matTex(A2)}$. Compare an off-diagonal entry (the $I$ term contributes nothing there): $${A[0][1].isZero() ? `(A^2)_{21} = ${A2[1][0].tex()} = k\\cdot(${A[1][0].tex()})` : `(A^2)_{12} = ${A2[0][1].tex()} = k\\cdot(${A[0][1].tex()})`}$, so $k = ${t.tex()}$; then a diagonal entry gives $m = ${d.neg().tex()}$.\nShortcut (Cayley–Hamilton): $A^2 = (\\operatorname{tr}A)A - (\\det A)I$ with $\\operatorname{tr}A = ${t.tex()}$, $\\det A = ${d.tex()}$.`,
    });
  }
  const fr = (c: Frac, inner: string) => (c.eq(1) ? inner : c.eq(-1) ? `-\\left(${inner}\\right)` : `${c.tex()}\\left(${inner}\\right)`);
  const tI_A = lin(t, "I", F(-1), "A");
  const A_tI = lin(F(1), "A", t.neg(), "I");
  const dI_A = lin(d, "I", F(-1), "A");
  const inv = d.n !== 0 ? F(1).div(d) : F(1);
  return mcq(rng, {
    subtopic: "Powers & polynomials",
    prompt: `Let $A = ${matTex(A)}$. Using $A^2 - (\\operatorname{tr}A)A + (\\det A)I = 0$, which expression equals $A^{-1}$?`,
    correct: fr(inv, tI_A),
    distractors: [fr(inv, A_tI), fr(d, tI_A), fr(F(1).div(t), dI_A), fr(inv, lin(t.neg(), "I", F(-1), "A")), fr(inv, lin(t, "I", F(1), "A"))],
    solution: `$\\operatorname{tr}A = ${t.tex()}$ and $\\det A = ${d.tex()}$, so $A^2 - (${t.tex()})A + (${d.tex()})I = 0$.\nRearrange: $A\\left(${tI_A}\\right) = ${d.tex()}I$, hence $A^{-1} = ${fr(inv, tI_A)}$.\nCheck with the formula: $A^{-1} = ${matTex(inverse(A)!)}$.`,
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
    solution: `Write out $AB$ and $BA$ with the unknowns and match all four entries. The $(2,1)$ and $(2,2)$ equations give $x = ${x.tex()}$ and $y = ${y.tex()}$; the other two then hold.\nCheck: $AB = BA = ${matTex(AB)}$.\nStructure: $B = ${lin(F(beta), "A", F(alpha), "I")}$, a polynomial in $A$, and such matrices always commute with $A$.`,
  });
}

/** Given (kA)^{-1} or (kA^T)^{-1}, find A. */
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
    solution: `Invert both sides: $${k}A${withT ? "^T" : ""} = ${matTex(M)}^{-1}$. The determinant is $${det2(M).tex()}$, so (swap the diagonal, negate the off-diagonal, divide by the determinant) the inverse is $${matTex(Minv)}$.\n${withT ? `$A^T = \\frac{1}{${k}}${matTex(Minv)}$, so $A = ${matTex(A)}$ (do not forget the final transpose).` : `$A = \\frac{1}{${k}}${matTex(Minv)}$.`}\nRemember $(kA)^{-1} = \\tfrac1kA^{-1}$, not $kA^{-1}$.`,
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
    solution: `$\\det A = ${det2(A).tex()}$, so $A^{-1} = ${matTex(Ai)}$.\n${left ? "$AX = B$: multiply on the **left** by $A^{-1}$, so $X = A^{-1}B$" : "$XA = B$: multiply on the **right** by $A^{-1}$, so $X = BA^{-1}$"} $= ${matTex(X)}$.\nThe other order gives $${matTex(other)}$, which does not solve the equation because matrix products do not commute.`,
  });
}

/** Symmetric / skew-symmetric parts. */
function symSkewPart(rng: Rng): Draft {
  const A = randMat(rng, 3, 3, -4, 5);
  const At = transpose(A);
  if (matEq(A, At)) retry();
  const S = mscale(madd(A, At), F(1, 2));
  const K = mscale(msub(A, At), F(1, 2));
  const askK = rng.chance(0.5);
  const correct = askK ? K : S;
  const ds = askK ? [msub(A, At), mscale(K, -1), S, msub(At, A)] : [madd(A, At), K, mscale(A, F(1, 2)), madd(S, identity(3))];
  return mcq(rng, {
    subtopic: "Special matrices",
    prompt: `Write $A = ${matTex(A)}$ as $A = S + K$ with $S$ symmetric and $K$ skew-symmetric. Find ${askK ? "$K$" : "$S$"}.`,
    correct: matTex(correct),
    distractors: ds.filter((D) => !matEq(D, correct)).map((D) => matTex(D)),
    solution: `$S = \\tfrac12(A + A^T) = ${matTex(S)}$ and $K = \\tfrac12(A - A^T) = ${matTex(K)}$.\nChecks: $S^T = S$; $K$ has zero diagonal and $k_{ji} = -k_{ij}$; $S + K = A$. Forgetting the $\\tfrac12$ is the usual slip.`,
  });
}

/** Outer products u v^T. */
function outerProduct(rng: Rng): Draft {
  const u = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  const v = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  const dot = (a: Vec, b: Vec) => a.reduce((s, x, i) => s.add(x.mul(b[i])), F(0));
  const uv = dot(u, v), uu = dot(u, u), vv = dot(v, v);
  if (uv.isZero() || uu.isZero() || vv.isZero()) retry();
  const P = u.map((a) => v.map((b) => a.mul(b)));
  const mode = rng.pick(["square", "apply", "trace"] as const);
  const head = `Let $\\mathbf{u} = ${rowTex(u)}$, $\\mathbf{v} = ${rowTex(v)}$ and $P = \\mathbf{u}\\mathbf{v}^T$.`;
  if (mode === "square") {
    const opt = (c: Frac) => (c.eq(1) ? "P" : c.eq(-1) ? "-P" : `${c.tex()}P`);
    return mcq(rng, {
      subtopic: "Outer products",
      prompt: `${head} Then $P^2 = cP$. Find $P^2$.`,
      correct: opt(uv),
      distractors: [uu, vv, uv.neg(), uv.mul(uv), F(1)].filter((c) => !c.eq(uv)).map(opt),
      solution: `$P^2 = \\mathbf{u}(\\mathbf{v}^T\\mathbf{u})\\mathbf{v}^T = (\\mathbf{v}\\cdot\\mathbf{u})P$, because $\\mathbf{v}^T\\mathbf{u}$ is a scalar.\n$\\mathbf{v}\\cdot\\mathbf{u} = ${uv.tex()}$, so $P^2 = ${opt(uv)}$. (Here $P = ${matTex(P)}$.)`,
    });
  }
  if (mode === "apply") {
    const w = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
    const vw = dot(v, w), uw = dot(u, w);
    if (vw.isZero() || uw.isZero()) retry();
    const res = u.map((x) => x.mul(vw));
    return mcq(rng, {
      subtopic: "Outer products",
      prompt: `${head} Find $P\\mathbf{w}$ for $\\mathbf{w} = ${rowTex(w)}$.`,
      correct: rowTex(res),
      distractors: [v.map((x) => x.mul(uw)), u.map((x) => x.mul(uv)), w.map((x) => x.mul(uv)), res.map((x) => x.neg())].map(rowTex),
      solution: `$P\\mathbf{w} = \\mathbf{u}(\\mathbf{v}^T\\mathbf{w}) = (\\mathbf{v}\\cdot\\mathbf{w})\\,\\mathbf{u}$, and $\\mathbf{v}\\cdot\\mathbf{w} = ${vw.tex()}$.\nSo $P\\mathbf{w} = ${vw.tex()}\\,${rowTex(u)} = ${rowTex(res)}$: every output of $P$ is a multiple of $\\mathbf{u}$.`,
    });
  }
  const i = rng.int(0, 2), j = rng.int(0, 2);
  const correct = `${uv.tex()},\\ ${P[i][j].tex()}`;
  return mcq(rng, {
    subtopic: "Outer products",
    prompt: `${head} Find $\\operatorname{tr}(P)$ and the $(${i + 1},${j + 1})$ entry of $P$.`,
    correct,
    distractors: [`${uu.tex()},\\ ${P[i][j].tex()}`, `${uv.tex()},\\ ${P[j][i].tex()}`, `${uv.neg().tex()},\\ ${P[i][j].tex()}`, `${vv.tex()},\\ ${P[i][j].tex()}`, `${uv.tex()},\\ ${P[i][j].neg().tex()}`],
    solution: `$P_{ij} = u_iv_j$, so $p_{${i + 1}${j + 1}} = (${u[i].tex()})(${v[j].tex()}) = ${P[i][j].tex()}$.\n$\\operatorname{tr}(\\mathbf{u}\\mathbf{v}^T) = \\sum u_iv_i = \\mathbf{u}\\cdot\\mathbf{v} = ${uv.tex()}$.`,
  });
}

/** p(A) for a quadratic p. */
function polyEval(rng: Rng): Draft {
  const A = randMat(rng, 2, 2, -3, 3);
  const b = rng.nz(-4, 4);
  const c = rng.nz(-5, 5);
  const A2 = matmul(A, A);
  const base = madd(A2, mscale(A, b));
  const correct = madd(base, mscale(identity(2), c));
  const J = mat([[1, 1], [1, 1]]);
  const ds = [madd(base, mscale(J, c)), base, msub(base, mscale(identity(2), c)), madd(msub(A2, mscale(A, b)), mscale(identity(2), c)), madd(madd(mscale(A, 2), mscale(A, b)), mscale(identity(2), c))];
  const p = `x^2 ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;
  return mcq(rng, {
    subtopic: "Powers & polynomials",
    prompt: `Let $p(x) = ${p}$ and $A = ${matTex(A)}$. Find $p(A)$.`,
    correct: matTex(correct),
    distractors: ds.filter((D) => !matEq(D, correct)).map((D) => matTex(D)),
    solution: `$p(A) = A^2 ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}A ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}I$: the constant term becomes a multiple of $I$.\n$A^2 = ${matTex(A2)}$, so $p(A) = ${matTex(A2)} + ${matTex(mscale(A, b))} + ${matTex(mscale(identity(2), c))} = ${matTex(correct)}$.\nAdding $${c}$ to every entry (instead of $${lin(F(c), "I", F(0), "")}$) is the classic slip.`,
  });
}

/** Commutator [A,B] = AB - BA. */
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
    solution: `$AB = ${matTex(AB)}$, $BA = ${matTex(BA)}$, so $[A,B] = ${matTex(C)}$.\nCheck: $\\operatorname{tr}[A,B] = ${tr(C).tex()}$, as for every commutator (because $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$). $BA - AB$ is $-[A,B]$.`,
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
    solution: `Multiply sizes left to right, checking that inner numbers match: ${pick.why}, giving $${sz(pick.r)}$. A transpose swaps rows and columns, and $(m\\times n)(n\\times p) = m\\times p$.`,
  });
}

/** True / False / not-enough-information facts with a random size. */
const FACTS: { s: (n: number) => string; a: 0 | 1 | 2; why: string | ((n: number) => string); sub: string }[] = [
  { sub: "Transpose", s: (n) => `For all $${n}\\times${n}$ matrices $A$ and $B$, $(A + B)^T = A^T + B^T$.`, a: 0, why: "Transposing is done entry by entry, and $(a_{ji} + b_{ji})$ is the $(i,j)$ entry of both sides. **True**." },
  { sub: "Transpose", s: (n) => `For all $${n}\\times${n}$ matrices $A$ and $B$, $(AB)^T = A^TB^T$.`, a: 1, why: "The order reverses: $(AB)^T = B^TA^T$, which differs from $A^TB^T$ unless $A^T$ and $B^T$ commute. **False**." },
  { sub: "Zero divisors & cancellation", s: (n) => `Every $${n}\\times${n}$ matrix $A$ with $A^2 = 0$ is the zero matrix.`, a: 1, why: "Nilpotent matrices exist: the matrix with a single $1$ in position $(1,2)$ and zeros elsewhere is nonzero, yet its square is $0$. **False**." },
  { sub: "Special matrices", s: (n) => `If $A$ is a $${n}\\times${n + 2}$ matrix, then $AA^T$ is a symmetric $${n}\\times${n}$ matrix.`, a: 0, why: (n) => `$AA^T$ is $(${n}\\times${n + 2})(${n + 2}\\times${n}) = ${n}\\times${n}$, and $(AA^T)^T = (A^T)^TA^T = AA^T$. **True**.` },
  { sub: "Trace", s: (n) => `For every $${n}\\times${n}$ matrix $A$ and scalar $k$, $\\operatorname{tr}(kA) = k + \\operatorname{tr}(A)$.`, a: 1, why: "Every diagonal entry is multiplied by $k$, so $\\operatorname{tr}(kA) = k\\operatorname{tr}(A)$. **False**." },
  { sub: "Special matrices", s: (n) => `For every $${n}\\times${n}$ matrix $A$, the matrix $A - A^T$ has only zeros on its main diagonal.`, a: 0, why: "Its $(i,i)$ entry is $a_{ii} - a_{ii} = 0$ (it is skew-symmetric). **True**." },
  { sub: "Inverse & matrix equations", s: (n) => `If $A$ is an invertible $${n}\\times${n}$ matrix, then $(A^2)^{-1} = (A^{-1})^2$.`, a: 0, why: "$A^2(A^{-1})^2 = AAA^{-1}A^{-1} = I$. **True**." },
  { sub: "Transpose", s: (n) => `If $A$ is $${n}\\times${n + 1}$ and $B$ is $${n + 1}\\times${n + 3}$, then $(AB)^T$ is $${n + 3}\\times${n}$.`, a: 0, why: (n) => `$AB$ is $${n}\\times${n + 3}$, so its transpose is $${n + 3}\\times${n}$. **True**.` },
  { sub: "Special matrices", s: (n) => `Any two $${n}\\times${n}$ diagonal matrices commute.`, a: 0, why: "The product of diagonal matrices is diagonal with entries $d_ie_i = e_id_i$, so $DE = ED$. **True**." },
  { sub: "Algebra rules", s: (n) => `Every $${n}\\times${n}$ matrix $A$ commutes with $A^T$.`, a: 1, why: "Counterexample: $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ (padded with zeros) gives $AA^T = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ but $A^TA = \\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$. **False**." },
  { sub: "Trace", s: (n) => `$A$ is a $${n}\\times${n}$ matrix with $\\operatorname{tr}A = 0$ (nothing else is known). Then $A$ is skew-symmetric.`, a: 2, why: "A skew-symmetric matrix has trace $0$, but trace $0$ does not force skew-symmetry: $\\operatorname{diag}(1,-1,0,\\dots)$ has trace $0$ and is symmetric, not skew (unless it is $0$). Both cases are possible: **Not enough information**." },
  { sub: "Special matrices", s: (n) => `$A$ is an upper triangular and $B$ a lower triangular $${n}\\times${n}$ matrix (nothing else is known). Then $AB$ is diagonal.`, a: 2, why: "If $A = B = I$, $AB = I$ is diagonal. But $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, $B = I$ (padded) gives $AB = A$, not diagonal. **Not enough information**." },
  { sub: "Zero divisors & cancellation", s: (n) => `$A$, $B$, $C$ are $${n}\\times${n}$ matrices with $AB = AC$ and $A \\ne 0$ (nothing else is known). Then $B = C$.`, a: 2, why: "If $A$ happens to be invertible, $B = C$. If not, $B \\ne C$ is possible (e.g. $A = \\operatorname{diag}(1,0,\\dots)$, $B = 0$, $C = \\operatorname{diag}(0,1,\\dots)$). **Not enough information**." },
  { sub: "Powers & polynomials", s: (n) => `If $A$ is $${n}\\times${n}$ and $A^2 = A$, then $A^{${n + 5}} = A$.`, a: 0, why: "Each extra factor of $A$ changes nothing: $A^3 = A^2A = AA = A$, and so on by induction. **True**." },
  { sub: "Commutator", s: (n) => `For all $${n}\\times${n}$ matrices $A$ and $B$, $\\operatorname{tr}(AB - BA) = 0$.`, a: 0, why: "$\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$, so the trace of the commutator is $0$. **True**." },
  { sub: "Inverse & matrix equations", s: (n) => `For all invertible $${n}\\times${n}$ matrices $A$ and $B$, $(AB)^{-1} = A^{-1}B^{-1}$.`, a: 1, why: "The order reverses: $(AB)^{-1} = B^{-1}A^{-1}$, since $(AB)(B^{-1}A^{-1}) = I$. The stated formula fails whenever $A^{-1}$ and $B^{-1}$ do not commute. **False**." },
];

function tfnFacts(rng: Rng): Draft {
  const f = rng.pick(FACTS);
  const n = rng.int(2, 5);
  return tfn({ subtopic: f.sub, prompt: f.s(n), answer: f.a, solution: typeof f.why === "string" ? f.why : f.why(n) });
}

export const matricesGens: ((rng: Rng) => Draft)[] = [
  productEntry,
  rowOrColumn,
  columnWeights,
  traceExpr,
  traceProduct,
  powerRecurrence,
  cayleyHamilton,
  commuteSolve,
  scaledInverse,
  matrixEquation,
  symSkewPart,
  outerProduct,
  polyEval,
  commutator,
  sizes,
  tfnFacts,
];
