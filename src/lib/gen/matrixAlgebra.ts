// Randomised final-exam-style questions on matrix algebra: inverses, matrix equations, elementary
// matrices, Gauss–Jordan, LU, A = PDP^{-1}, nilpotent matrices and block matrices.
import {
  colTex, F, Frac, identity, inverse, madd, mat, Mat, matEq, matmul, matTex, matvec, mscale, msub, rowTex, rowTexPlain, transpose, vec,
} from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

const det2 = (A: Mat) => A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
const maxAbsM = (A: Mat) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));
const neg = (A: Mat) => mscale(A, -1);
const I = identity;

function randInt2(rng: Rng, lo: number, hi: number, dets: number[]): Mat {
  for (let t = 0; t < 400; t++) {
    const A = mat([
      [rng.int(lo, hi), rng.int(lo, hi)],
      [rng.int(lo, hi), rng.int(lo, hi)],
    ]);
    if (A.flat().filter((x) => x.isZero()).length > 1) continue;
    if (dets.includes(det2(A).valueOf())) return A;
  }
  retry();
}

/** 2x2 integer matrix with det ±1 (integer inverse). */
const uni2 = (rng: Rng, r = 4) => randInt2(rng, -r, r, [1, -1]);

/** 3x3 integer matrix with det ±1 and small integer inverse (product of unit triangular factors). */
function uni3(rng: Rng, bound = 9): Mat {
  for (let t = 0; t < 400; t++) {
    const L = mat([
      [1, 0, 0],
      [rng.int(-2, 2), 1, 0],
      [rng.int(-2, 2), rng.int(-2, 2), 1],
    ]);
    const s = rng.chance(0.3) ? -1 : 1;
    const U = mat([
      [s, rng.int(-2, 2), rng.int(-2, 2)],
      [0, 1, rng.int(-2, 2)],
      [0, 0, 1],
    ]);
    let A = matmul(L, U);
    if (rng.chance(0.4)) A = [A[1], A[0], A[2]].map((r) => [...r]);
    const inv = inverse(A)!;
    const zeros = A.flat().filter((x) => x.isZero()).length;
    if (zeros > 3 || maxAbsM(A) > bound || maxAbsM(inv) > bound) continue;
    if (matEq(A, inv) || matEq(A, transpose(A))) continue;
    return A;
  }
  retry();
}

/** e_ij unit matrix (n×n) scaled by k. */
function unitM(n: number, i: number, j: number, k: Frac | number): Mat {
  return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (r === i && c === j ? Frac.of(k) : F(0))));
}
const addE = (n: number, i: number, j: number, k: Frac | number) => madd(I(n), unitM(n, i, j, k));

function matPow(A: Mat, k: number): Mat {
  let R = I(A.length);
  for (let i = 0; i < k; i++) R = matmul(R, A);
  return R;
}

const diag = (xs: (Frac | number)[]) => xs.map((x, i) => xs.map((_, j) => (i === j ? Frac.of(x) : F(0))));

/** Coefficient times a bracket, e.g. "-\frac{1}{3}(A + 2I)". */
function coefTex(c: Frac, body: string): string {
  if (c.eq(1)) return body;
  if (c.eq(-1)) return `-${body}`;
  return `${c.tex()}${body}`;
}

/** "A + 3I", "A - 2I", "A" for a linear polynomial in A. */
function linTex(p: number): string {
  if (p === 0) return "A";
  return p > 0 ? `A + ${p === 1 ? "" : p}I` : `A - ${p === -1 ? "" : -p}I`;
}

function quadTex(p: number, q: number): string {
  let s = "A^2";
  if (p) s += p > 0 ? ` + ${p === 1 ? "" : p}A` : ` - ${p === -1 ? "" : -p}A`;
  if (q) s += q > 0 ? ` + ${q === 1 ? "" : q}I` : ` - ${q === -1 ? "" : -q}I`;
  return s;
}

/** k^2 + p k + q as LaTeX. */
function polyK(p: number, q: number): string {
  let s = "k^2";
  if (p) s += p > 0 ? ` + ${p === 1 ? "" : p}k` : ` - ${p === -1 ? "" : -p}k`;
  if (q) s += q > 0 ? ` + ${q}` : ` - ${-q}`;
  return s;
}

const R = ["R_1", "R_2", "R_3", "R_4"];

// ---------------------------------------------------------------- generators

/** Inverse of a 2x2 matrix via the ad - bc formula. */
function inverse2(rng: Rng): Draft {
  const A = randInt2(rng, -6, 6, [1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, 7, -7]);
  const [[a, b], [c, d]] = A;
  const D = det2(A);
  const inv = inverse(A)!;
  const s = (M: number[][]) => mscale(mat(M), F(1).div(D));
  const av = a.valueOf(), bv = b.valueOf(), cv = c.valueOf(), dv = d.valueOf();
  const rec = `\\frac{1}{${D.tex()}}\\begin{bmatrix} ${d.tex()} & ${b.neg().tex()} \\\\ ${c.neg().tex()} & ${a.tex()} \\end{bmatrix}`;
  return mcq(rng, {
    subtopic: "Inverse basics",
    prompt: `Find the inverse of $A = ${matTex(A)}$.`,
    correct: matTex(inv),
    distractors: [
      matTex(s([[av, -bv], [-cv, dv]])),
      matTex(s([[-dv, bv], [cv, -av]])),
      matTex(s([[dv, -cv], [-bv, av]])),
      matTex(s([[dv, bv], [cv, av]])),
      matTex(mat([[dv, -bv], [-cv, av]])),
      matTex(mscale(inv, -1)),
    ],
    solution: `$\\det A = ad - bc = (${a.tex()})(${d.tex()}) - (${b.tex()})(${c.tex()}) = ${D.tex()} \\ne 0$, so $A$ is invertible and\n$$A^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} = ${rec}${rec === matTex(inv) ? "" : ` = ${matTex(inv)}`}.$$\nRecipe: **swap** the diagonal, **negate** the off-diagonal, **divide** by the determinant. Check: $AA^{-1} = I$.`,
  });
}

/** Solve Ax = b (or A^T y = b) when A^{-1} is given. */
function solveWithInverse(rng: Rng): Draft {
  const M = uni3(rng); // M = A^{-1}
  const b = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  if (b.filter((x) => x.isZero()).length > 1) retry();
  const useT = rng.chance(0.4);
  const Mt = transpose(M);
  const x = matvec(useT ? Mt : M, b);
  const other = matvec(useT ? M : Mt, b);
  const Ab = matvec(inverse(M)!, b);
  if (matEq([x], [other])) retry();
  return mcq(rng, {
    subtopic: "Inverse basics",
    prompt: useT
      ? `The $3\\times 3$ matrix $A$ satisfies $A^{-1} = ${matTex(M)}$. Find the solution of $A^T\\mathbf{y} = \\mathbf{b}$, where $\\mathbf{b} = ${rowTexPlain(b)}$.`
      : `The $3\\times 3$ matrix $A$ satisfies $A^{-1} = ${matTex(M)}$. Find the solution of $A\\mathbf{x} = \\mathbf{b}$, where $\\mathbf{b} = ${rowTexPlain(b)}$.`,
    correct: rowTex(x),
    distractors: [rowTex(other), rowTex(Ab), rowTex(x.map((v) => v.neg())), rowTex(matvec(inverse(Mt)!, b)), rowTex(x.map((v, i) => (i === 1 ? v.add(1) : v)))],
    solution: useT
      ? `$A^T$ is invertible with $(A^T)^{-1} = (A^{-1})^T$. So $\\mathbf{y} = (A^{-1})^T\\mathbf{b} = ${matTex(Mt)}${colTex(b)} =${rowTex(x)}$.\nTrap: $A^{-1}\\mathbf{b} = ${rowTex(other)}$ solves $A\\mathbf{x} = \\mathbf{b}$, not $A^T\\mathbf{y} = \\mathbf{b}$.`
      : `Multiply $A\\mathbf{x} = \\mathbf{b}$ on the left by $A^{-1}$: $\\mathbf{x} = A^{-1}\\mathbf{b} = ${rowTex(x)}$.\nNo row reduction is needed when $A^{-1}$ is given. Trap: $A\\mathbf{b}$ (multiplying by $A$ instead of $A^{-1}$) gives $${rowTex(Ab)}$.`,
  });
}

/** Full 3x3 inverse by Gauss–Jordan. */
function gaussJordan3(rng: Rng): Draft {
  const A = uni3(rng, 7);
  const inv = inverse(A)!;
  const flipped = inv.map((r, i) => r.map((x, j) => (i === 0 && j === 2 ? x.neg() : x)));
  const ds = [matTex(transpose(inv)), matTex(neg(inv)), matTex(transpose(A)), matTex(flipped), matTex(inv.map((r) => r.map((x, j) => (j === 1 ? x.neg() : x))))];
  return mcq(rng, {
    subtopic: "Gauss–Jordan",
    prompt: `Use Gauss–Jordan elimination on $[A \\mid I]$ to find $A^{-1}$ for $A = ${matTex(A)}$.`,
    correct: matTex(inv),
    distractors: ds,
    solution: `Row reduce $[A \\mid I]$ until the left block is $I$; the right block is then $A^{-1}$:\n$$[A \\mid I] \\sim [I \\mid A^{-1}],\\qquad A^{-1} = ${matTex(inv)}.$$\nCheck one product, e.g. row 1 of $A$ times column 1 of $A^{-1}$ gives $1$ and times column 2 gives $0$. The transpose of $A^{-1}$ is a common slip (reading columns as rows).`,
  });
}

/** (AB)^{-1}, (A^T B)^{-1}, (A^2)^{-1} from given inverses. */
function productInverse(rng: Rng): Draft {
  const Ai = uni2(rng, 3);
  const Bi = uni2(rng, 3);
  const mode = rng.pick(["AB", "AB", "ATB", "BA2"]);
  if (matEq(matmul(Ai, Bi), matmul(Bi, Ai))) retry();
  const AiT = transpose(Ai);
  let correct: Mat, ds: Mat[], what: string, sol: string;
  if (mode === "AB") {
    what = "(AB)^{-1}";
    correct = matmul(Bi, Ai);
    ds = [matmul(Ai, Bi), matmul(inverse(Ai)!, inverse(Bi)!), transpose(correct), madd(Ai, Bi)];
    sol = `Socks and shoes: $(AB)^{-1} = B^{-1}A^{-1}$ (reverse order), because $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = I$.\n$$B^{-1}A^{-1} = ${matTex(Bi)}${matTex(Ai)} = ${matTex(correct)}.$$\nThe same-order product $A^{-1}B^{-1} = ${matTex(ds[0])}$ is different because these matrices do not commute.`;
  } else if (mode === "ATB") {
    what = "(A^TB)^{-1}";
    correct = matmul(Bi, AiT);
    ds = [matmul(Bi, Ai), matmul(AiT, Bi), transpose(correct), matmul(Ai, Bi)];
    sol = `$(A^TB)^{-1} = B^{-1}(A^T)^{-1} = B^{-1}(A^{-1})^T$.\n$$B^{-1}(A^{-1})^T = ${matTex(Bi)}${matTex(AiT)} = ${matTex(correct)}.$$\nTwo traps: keeping the original order, and forgetting that $(A^T)^{-1} = (A^{-1})^T$ (not $A^{-1}$).`;
  } else {
    what = "(BA^2)^{-1}";
    correct = matmul(matmul(Ai, Ai), Bi);
    ds = [matmul(Bi, matmul(Ai, Ai)), matmul(matmul(Ai, Bi), Ai), mscale(matmul(Ai, Bi), 2), transpose(correct)];
    sol = `$(BA^2)^{-1} = (A^2)^{-1}B^{-1} = (A^{-1})^2B^{-1}$.\n$$(A^{-1})^2 = ${matTex(matmul(Ai, Ai))},\\qquad (A^{-1})^2B^{-1} = ${matTex(correct)}.$$`;
  }
  if (ds.some((d) => matEq(d, correct)) && mode !== "BA2") retry();
  return mcq(rng, {
    subtopic: "Inverse algebra",
    prompt: `$A$ and $B$ are invertible $2\\times 2$ matrices with $A^{-1} = ${matTex(Ai)}$ and $B^{-1} = ${matTex(Bi)}$. Find $${what}$.`,
    correct: matTex(correct),
    distractors: ds.map((d) => matTex(d)),
    solution: sol,
  });
}

/** Elementary matrices: inverse / power of a row-replacement, scaling or swap matrix. */
function elementaryPower(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const i = rng.int(0, n - 1);
  let j = rng.int(0, n - 1);
  if (i === j) j = (i + 1) % n;
  const kind = rng.pick(["add", "add", "add", "scale"]);
  if (kind === "add") {
    const k = rng.nz(-4, 4);
    const m = rng.pick([-1, 2, 3, 4, 5]);
    const E = addE(n, i, j, k);
    const what = m === -1 ? "E^{-1}" : `E^{${m}}`;
    const correct = addE(n, i, j, k * m);
    const kp = m === -1 ? F(1, k) : F(k).pow(m);
    const ds = [addE(n, i, j, kp), addE(n, j, i, k * m), addE(n, i, j, -k * m), addE(n, i, j, k + m), E];
    return mcq(rng, {
      subtopic: "Elementary matrices",
      prompt: `$E$ is the $${n}\\times${n}$ elementary matrix obtained from $I_${n}$ by the row operation $${R[i]} \\to ${R[i]} ${k > 0 ? "+" : "-"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}${R[j]}$. Find $${what}$.`,
      correct: matTex(correct),
      distractors: ds.map((d) => matTex(d)),
      solution:
        m === -1
          ? `$E$ adds $${k}$ times row ${j + 1} to row ${i + 1}. The inverse operation **subtracts** it again: $E^{-1}$ adds $${-k}$ times row ${j + 1} to row ${i + 1}, so the off-diagonal entry changes sign:\n$$E^{-1} = ${matTex(correct)}.$$`
          : `Applying $E$ ${m} times adds $${k}\\times\\text{row } ${j + 1}$ to row ${i + 1} ${m} times, i.e. $${k * m}$ times row ${j + 1} in total (row ${j + 1} itself never changes). So $E^{${m}}$ has $${k * m}$ in position $(${i + 1},${j + 1})$:\n$$E^{${m}} = ${matTex(correct)}.$$\nTrap: the entry is $${m}\\cdot(${k})$, not $(${k})^{${m}}$.`,
    });
  }
  const c = rng.pick([2, 3, 4, 5, -2, -3]);
  const E = diag(Array.from({ length: n }, (_, r) => (r === i ? c : 1)));
  const correct = diag(Array.from({ length: n }, (_, r) => (r === i ? F(1, c) : F(1))));
  const ds = [
    diag(Array.from({ length: n }, (_, r) => (r === i ? -c : 1))),
    diag(Array.from({ length: n }, (_, r) => (r === i ? F(-1, c) : F(1)))),
    diag(Array.from({ length: n }, (_, r) => (r === i ? F(1) : F(1, c)))),
    E,
  ];
  return mcq(rng, {
    subtopic: "Elementary matrices",
    prompt: `$E$ is the $${n}\\times${n}$ elementary matrix obtained from $I_${n}$ by the row operation $${R[i]} \\to ${c}${R[i]}$. Find $E^{-1}$.`,
    correct: matTex(correct),
    distractors: ds.map((d) => matTex(d)),
    solution: `$E$ multiplies row ${i + 1} by $${c}$; the inverse operation multiplies row ${i + 1} by $${F(1, c).tex()}$. So $E^{-1}$ is the identity with $${F(1, c).tex()}$ in position $(${i + 1},${i + 1})$:\n$$E^{-1} = ${matTex(correct)}.$$`,
  });
}

/** Find E with EA = B (B = A after one row operation). */
function elementaryFromRows(rng: Rng): Draft {
  const A = mat(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rng.int(-4, 4))));
  const i = rng.int(0, 2);
  let j = rng.int(0, 2);
  if (i === j) j = (i + 2) % 3;
  const k = rng.nz(-3, 3);
  const E = addE(3, i, j, k);
  const B = matmul(E, A);
  if (A[j].every((x) => x.isZero())) retry();
  const ds = [addE(3, j, i, k), addE(3, i, j, -k), addE(3, j, i, -k), addE(3, i, j, 2 * k), transpose(addE(3, i, j, -k))];
  return mcq(rng, {
    subtopic: "Elementary matrices",
    prompt: `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find the elementary matrix $E$ such that $EA = B$.`,
    correct: matTex(E),
    distractors: ds.map((d) => matTex(d)),
    solution: `Compare rows: only row ${i + 1} changed, and (row ${i + 1} of $B$) $-$ (row ${i + 1} of $A$) $= ${k}\\times$ (row ${j + 1} of $A$). So $B$ comes from $A$ by $${R[i]} \\to ${R[i]} ${k > 0 ? "+" : "-"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}${R[j]}$.\n$E$ is $I_3$ after the **same** row operation: entry $(${i + 1},${j + 1})$ is $${k}$.\n$$E = ${matTex(E)}$$\nTrap: putting $${k}$ in position $(${j + 1},${i + 1})$ gives the transpose, which would act on columns when multiplied on the right.`,
  });
}

/** Solve a numeric matrix equation for X. */
function matrixEquation(rng: Rng): Draft {
  const A = uni2(rng, 3);
  const B = uni2(rng, 3);
  const C = mat([
    [rng.int(-3, 3), rng.int(-3, 3)],
    [rng.int(-3, 3), rng.int(-3, 3)],
  ]);
  if (det2(C).isZero()) retry();
  const Ai = inverse(A)!, Bi = inverse(B)!;
  const mode = rng.pick(["AXB", "XA+B", "AX=B+X"]);
  let prompt: string, correct: Mat, ds: Mat[], sol: string;
  if (mode === "AXB") {
    correct = matmul(matmul(Ai, C), Bi);
    ds = [matmul(matmul(Ai, Bi), C), matmul(C, matmul(Ai, Bi)), matmul(matmul(Bi, C), Ai), matmul(matmul(Ai, C), B)];
    prompt = `Let $A = ${matTex(A)}$, $B = ${matTex(B)}$ and $C = ${matTex(C)}$. Find the matrix $X$ with $AXB = C$.`;
    sol = `Multiply by $A^{-1}$ on the **left** and $B^{-1}$ on the **right**: $X = A^{-1}CB^{-1}$.\n$A^{-1} = ${matTex(Ai)}$, $B^{-1} = ${matTex(Bi)}$, so $X = ${matTex(correct)}$.\nOrder matters: $A^{-1}B^{-1}C$ is a different matrix.`;
  } else if (mode === "XA+B") {
    correct = matmul(msub(C, B), Ai);
    ds = [matmul(Ai, msub(C, B)), matmul(madd(C, B), Ai), matmul(msub(C, B), A), msub(matmul(C, Ai), B)];
    prompt = `Let $A = ${matTex(A)}$, $B = ${matTex(B)}$ and $C = ${matTex(C)}$. Find the matrix $X$ with $XA + B = C$.`;
    sol = `$XA = C - B$. $A$ multiplies $X$ from the **right**, so multiply by $A^{-1}$ on the right: $X = (C-B)A^{-1}$.\n$C - B = ${matTex(msub(C, B))}$, $A^{-1} = ${matTex(Ai)}$, so $X = ${matTex(correct)}$.\nTrap: $A^{-1}(C-B)$ multiplies on the wrong side.`;
  } else {
    const M = msub(A, I(2));
    if (det2(M).isZero()) retry();
    const Mi = inverse(M)!;
    correct = matmul(Mi, B);
    ds = [matmul(B, Mi), matmul(Ai, B), matmul(inverse(madd(A, I(2))) ?? Ai, B), msub(matmul(Ai, B), I(2))];
    prompt = `Let $A = ${matTex(A)}$ and $B = ${matTex(B)}$. Find the matrix $X$ with $AX = B + X$.`;
    sol = `Collect $X$ on one side: $AX - X = B$, i.e. $(A - I)X = B$ (write $X = IX$; "$A - 1$" is meaningless).\n$A - I = ${matTex(M)}$ is invertible with inverse $${matTex(Mi)}$, so $X = (A-I)^{-1}B = ${matTex(correct)}$.`;
  }
  return mcq(rng, { subtopic: "Matrix equations", prompt, correct: matTex(correct), distractors: ds.map((d) => matTex(d)), solution: sol });
}

/** Solve Ax = b given A = LU. */
function luSolve(rng: Rng): Draft {
  const L = mat([
    [1, 0, 0],
    [rng.nz(-3, 3), 1, 0],
    [rng.int(-3, 3), rng.nz(-3, 3), 1],
  ]);
  const U = mat([
    [rng.pick([1, 2, -1, 3]), rng.int(-3, 3), rng.int(-3, 3)],
    [0, rng.pick([1, 2, -1, -2]), rng.int(-3, 3)],
    [0, 0, rng.pick([1, 2, -1, 3])],
  ]);
  const x = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  if (x.filter((v) => v.isZero()).length > 1) retry();
  const y = matvec(U, x);
  const b = matvec(L, y);
  if (matEq([x], [y]) || Math.max(...b.map((v) => Math.abs(v.valueOf()))) > 30) retry();
  const Lbad = L.map((r, i) => r.map((v, j) => (i > j ? v.neg() : v)));
  const yBad = matvec(inverse(Lbad)!, b);
  const xBad = matvec(inverse(U)!, yBad);
  const xNoL = matvec(inverse(U)!, b);
  const askY = rng.chance(0.3);
  const correct = askY ? y : x;
  const ds = askY ? [x, yBad, b, y.map((v, i) => (i === 2 ? v.neg() : v))] : [y, xBad, xNoL, x.map((v, i) => (i === 0 ? v.neg() : v))];
  return mcq(rng, {
    subtopic: "LU factorization",
    prompt: `$A = LU$ with $L = ${matTex(L)}$ and $U = ${matTex(U)}$. To solve $A\\mathbf{x} = \\mathbf{b}$ with $\\mathbf{b} = ${rowTexPlain(b)}$ one first solves $L\\mathbf{y} = \\mathbf{b}$ and then $U\\mathbf{x} = \\mathbf{y}$. ${askY ? "Find $\\mathbf{y}$." : "Find $\\mathbf{x}$."}`,
    correct: rowTex(correct),
    distractors: ds.map((d) => rowTex(d)),
    solution: `**Forward substitution** in $L\\mathbf{y} = \\mathbf{b}$: $y_1 = ${b[0].tex()}$, $y_2 = ${b[1].tex()} - (${L[1][0].tex()})y_1 = ${y[1].tex()}$, $y_3 = ${b[2].tex()} - (${L[2][0].tex()})y_1 - (${L[2][1].tex()})y_2 = ${y[2].tex()}$. So $\\mathbf{y} = ${rowTex(y)}$.\n**Back substitution** in $U\\mathbf{x} = \\mathbf{y}$: $x_3 = ${y[2].tex()}/(${U[2][2].tex()}) = ${x[2].tex()}$, then $x_2 = ${x[1].tex()}$, $x_1 = ${x[0].tex()}$. So $\\mathbf{x} = ${rowTex(x)}$.\nCheck: $LU\\mathbf{x} = \\mathbf{b}$.`,
  });
}

/** Find L (or U) of an LU factorization by row reduction. */
function luFind(rng: Rng): Draft {
  const cols = rng.pick([3, 3, 4]);
  const l21 = rng.nz(-3, 3), l31 = rng.int(-3, 3), l32 = rng.nz(-3, 3);
  const L = mat([
    [1, 0, 0],
    [l21, 1, 0],
    [l31, l32, 1],
  ]);
  const p = [rng.pick([1, 2, -1, 2, 3]), rng.pick([1, -1, 2, -2, 3]), rng.nz(-3, 3)];
  const U = mat([
    Array.from({ length: cols }, (_, j) => (j === 0 ? p[0] : rng.int(-3, 3))),
    Array.from({ length: cols }, (_, j) => (j === 0 ? 0 : j === 1 ? p[1] : rng.int(-3, 3))),
    Array.from({ length: cols }, (_, j) => (j < 2 ? 0 : j === 2 ? p[2] : rng.int(-3, 3))),
  ]);
  const A = matmul(L, U);
  if (maxAbsM(A) > 20) retry();
  const askL = rng.chance(0.65);
  const Lneg = L.map((r, i) => r.map((v, j) => (i > j ? v.neg() : v)));
  const wrong32 = A[1][1].isZero() ? F(l32 + 1) : A[2][1].div(A[1][1]);
  const Lwrong = L.map((r, i) => r.map((v, j) => (i === 2 && j === 1 ? wrong32 : v)));
  const Lswap = mat([
    [1, 0, 0],
    [l31, 1, 0],
    [l21, l32, 1],
  ]);
  const prompt = `Find the ${askL ? "unit lower triangular matrix $L$" : "echelon matrix $U$"} in an LU factorization $A = LU$ (no row interchanges) of $A = ${matTex(A)}$.`;
  const sol = `Eliminate below the pivots, recording each multiplier:\n- $R_2 \\to R_2 - (${l21})R_1$, $R_3 \\to R_3 - (${l31})R_1$ (multipliers $\\ell_{21} = ${l21}$, $\\ell_{31} = ${l31}$);\n- then $R_3 \\to R_3 - (${l32})R_2$ using the **updated** row 2 (multiplier $\\ell_{32} = ${l32}$).\nThe multipliers go into $L$ with their own sign (we subtracted $\\ell_{ij}R_j$), and the echelon form is $U$:\n$$L = ${matTex(L)},\\qquad U = ${matTex(U)}.$$\nCheck: $LU = A$.`;
  if (askL) {
    return mcq(rng, {
      subtopic: "LU factorization",
      prompt,
      correct: matTex(L),
      distractors: [Lneg, Lwrong, Lswap, transpose(Lneg)].map((d) => matTex(d)),
      solution: `${sol}\nTraps: entering the negatives of the multipliers, and computing $\\ell_{32}$ from the original $a_{32}/a_{22}$ instead of the updated rows.`,
    });
  }
  const Uwrong = matmul(inverse(Lwrong)!, A);
  const Ualt = U.map((r, i) => r.map((v) => (i === 1 ? v.neg() : v)));
  const UfromLneg = matmul(inverse(Lneg)!, A);
  return mcq(rng, {
    subtopic: "LU factorization",
    prompt,
    correct: matTex(U),
    distractors: [UfromLneg, Uwrong, Ualt, A.map((r, i) => (i === 0 ? r : r.map((v, j) => v.sub(A[0][j]))))].map((d) => matTex(d)),
    solution: sol,
  });
}

/** A = PDP^{-1}: compute A^k. */
function pdpPower(rng: Rng): Draft {
  const P = uni2(rng, 3);
  const pairs = [[2, 1], [2, -1], [-1, 3], [3, 1], [-2, 1], [1, -1], [2, 0], [3, -1], [-1, 2], [0, -2]];
  const [d1, d2] = rng.pick(pairs);
  const k = rng.pick([3, 4, 5]);
  const Pi = inverse(P)!;
  const D = diag([d1, d2]);
  const A = matmul(matmul(P, D), Pi);
  const Ak = matmul(matmul(P, diag([F(d1).pow(k), F(d2).pow(k)])), Pi);
  if (maxAbsM(Ak) > 400 || matEq(A, transpose(A))) retry();
  const wrongOrder = matmul(matmul(Pi, diag([F(d1).pow(k), F(d2).pow(k)])), P);
  const kD = matmul(matmul(P, diag([d1 * k, d2 * k])), Pi);
  const elem = A.map((r) => r.map((x) => x.pow(k)));
  return mcq(rng, {
    subtopic: "Powers via A = PDP⁻¹",
    prompt: `$A = PDP^{-1}$ where $P = ${matTex(P)}$ and $D = ${matTex(D)}$. Find $A^{${k}}$.`,
    correct: matTex(Ak),
    distractors: [wrongOrder, kD, elem, transpose(Ak), mscale(A, k)].map((d) => matTex(d)),
    solution: `The inner $P^{-1}P$ factors cancel: $A^{${k}} = PDP^{-1}PDP^{-1}\\cdots PDP^{-1} = PD^{${k}}P^{-1}$, and $D^{${k}}$ just raises each diagonal entry to the power ${k}.\n$$P^{-1} = ${matTex(Pi)},\\quad D^{${k}} = ${matTex(diag([F(d1).pow(k), F(d2).pow(k)]))},\\quad A^{${k}} = PD^{${k}}P^{-1} = ${matTex(Ak)}.$$\nTraps: $P^{-1}D^{${k}}P$ (wrong order), $${k}D$ instead of $D^{${k}}$, and raising each entry of $A$ to the power ${k}.`,
  });
}

/** (I - N)^{-1} or (I + N)^{-1} for strictly upper triangular N. */
function nilpotentInverse(rng: Rng): Draft {
  const a = rng.nz(-3, 3), b = rng.int(-3, 3), c = rng.nz(-3, 3);
  const N = mat([
    [0, a, b],
    [0, 0, c],
    [0, 0, 0],
  ]);
  const N2 = matmul(N, N);
  const minus = rng.chance(0.55);
  const IN = minus ? msub(I(3), N) : madd(I(3), N);
  const correct = minus ? madd(madd(I(3), N), N2) : madd(msub(I(3), N), N2);
  const ds = minus
    ? [madd(I(3), N), msub(madd(I(3), N), N2), madd(msub(I(3), N), N2), msub(I(3), N)]
    : [msub(I(3), N), madd(madd(I(3), N), N2), msub(msub(I(3), N), N2), madd(I(3), N)];
  return mcq(rng, {
    subtopic: "Nilpotent matrices",
    prompt: `Let $N = ${matTex(N)}$. Find $(I ${minus ? "-" : "+"} N)^{-1}$.`,
    correct: matTex(correct),
    distractors: ds.map((d) => matTex(d)),
    solution: `$N$ is strictly upper triangular, so $N^3 = 0$ (here $N^2 = ${matTex(N2)}$). Then\n$$(I ${minus ? "-" : "+"} N)(I ${minus ? "+" : "-"} N + N^2) = I ${minus ? "-" : "+"} N^3 = I,$$\nso $(I ${minus ? "-" : "+"} N)^{-1} = I ${minus ? "+" : "-"} N + N^2 = ${matTex(correct)}$.\nCheck: $${matTex(IN)}${matTex(correct)} = I$. Forgetting the $N^2$ term is the usual slip.`,
  });
}

/** Polynomial identity in A gives A^{-1} as a polynomial in A. */
function polyInverse(rng: Rng): Draft {
  const p = rng.int(-5, 5);
  const q = rng.nz(-6, 6);
  const cubic = rng.chance(0.3);
  if (cubic) {
    const r = rng.nz(-4, 4);
    const coef = F(-1, r);
    const body = `(${quadTex(p, q)})`;
    return mcq(rng, {
      subtopic: "Inverse algebra",
      prompt: `An $n\\times n$ matrix $A$ satisfies $A^3 ${p ? (p > 0 ? `+ ${p === 1 ? "" : p}A^2` : `- ${p === -1 ? "" : -p}A^2`) : ""} ${q > 0 ? `+ ${q === 1 ? "" : q}A` : `- ${q === -1 ? "" : -q}A`} ${r > 0 ? "+" : "-"} ${Math.abs(r) === 1 ? "" : Math.abs(r)}I = 0$. Express $A^{-1}$ in terms of $A$.`,
      correct: coefTex(coef, body),
      distractors: [coefTex(coef.neg(), body), coefTex(F(-r), body), coefTex(coef, `(${quadTex(-p, -q)})`), coefTex(coef, `(${quadTex(p, -q)})`)],
      solution: `Move the $I$ term across and factor $A$: $A(${quadTex(p, q)}) = ${-r === 1 ? "" : -r === -1 ? "-" : -r}I$. Divide by $${-r}$:\n$$A\\cdot\\Big[${coef.tex()}(${quadTex(p, q)})\\Big] = I,$$\nso $A$ is invertible and $A^{-1} = ${coefTex(coef, body)}$ (the factor commutes with $A$, so it is a two-sided inverse).`,
    });
  }
  if (rng.chance(0.15)) {
    // constant term zero: invertibility undecided
    const pp = rng.nz(-5, 5);
    return tfn({
      subtopic: "Inverse algebra",
      prompt: `$A$ is a $3\\times 3$ matrix with $A^2 ${pp > 0 ? "+" : "-"} ${Math.abs(pp) === 1 ? "" : Math.abs(pp)}A = 0$. Then $A$ is invertible.`,
      answer: 2,
      solution: `$A^2 ${pp > 0 ? "+" : "-"} ${Math.abs(pp) === 1 ? "" : Math.abs(pp)}A = A(A ${pp > 0 ? "+" : "-"} ${Math.abs(pp) === 1 ? "" : Math.abs(pp)}I) = 0$ has **no constant term**, so we cannot isolate $I$. Both cases occur: $A = 0$ satisfies it and is singular, while $A = ${-pp}I$ satisfies it and is invertible. **Not enough information**.`,
    });
  }
  const coef = F(-1, q);
  const body = `(${linTex(p)})`;
  return mcq(rng, {
    subtopic: "Inverse algebra",
    prompt: `An $n\\times n$ matrix $A$ satisfies $${quadTex(p, q)} = 0$. Express $A^{-1}$ in terms of $A$.`,
    correct: coefTex(coef, body),
    distractors: [coefTex(coef.neg(), body), coefTex(coef, `(${linTex(-p)})`), coefTex(F(-q), body), coefTex(coef.neg(), `(${linTex(-p)})`), coefTex(coef, `(A + ${q}I)`)],
    solution: `$${quadTex(p, q)} = 0 \\Rightarrow A(${linTex(p)}) = ${-q === 1 ? "" : -q === -1 ? "-" : -q}I \\Rightarrow A\\Big[${coef.tex()}(${linTex(p)})\\Big] = I$.\nSo $A$ is invertible (a nonzero constant term is what makes this work) and $A^{-1} = ${coefTex(coef, body)}$.`,
  });
}

/** Inverse of a block triangular / block diagonal matrix. */
function blockInverse(rng: Rng): Draft {
  const B = mat([
    [rng.int(-4, 4), rng.int(-4, 4)],
    [rng.int(-4, 4), rng.int(-4, 4)],
  ]);
  if (B.flat().filter((x) => x.isZero()).length > 1) retry();
  const k = rng.pick([1, 2, 3, -2, -3]);
  const upper = rng.chance(0.5);
  const M4 = (X: Mat) =>
    upper
      ? [[F(1), F(0), X[0][0], X[0][1]], [F(0), F(1), X[1][0], X[1][1]], [F(0), F(0), F(1), F(0)], [F(0), F(0), F(0), F(1)]]
      : [[F(1), F(0), F(0), F(0)], [F(0), F(1), F(0), F(0)], [X[0][0], X[0][1], F(1), F(0)], [X[1][0], X[1][1], F(0), F(1)]];
  const what = k === 1 ? "M^{-1}" : k > 0 ? `M^{-${k}}` : `M^{${-k}}`;
  const power = k; // asking for M^{-k}: its off-diagonal block is -kB
  const correct = M4(mscale(B, -power));
  const ds = [M4(mscale(B, power)), M4(mscale(transpose(B), -power)), M4(neg(matPow(B, Math.abs(power)))), M4(mscale(B, -(power + 1))), M4(mscale(B, 2 * power))];
  return mcq(rng, {
    subtopic: "Block matrices",
    prompt: `Let $B = ${matTex(B)}$ and let $M$ be the $4\\times4$ block matrix $M = ${upper ? "\\begin{bmatrix} I_2 & B \\\\ 0 & I_2 \\end{bmatrix}" : "\\begin{bmatrix} I_2 & 0 \\\\ B & I_2 \\end{bmatrix}"}$. Find $${what}$.`,
    correct: matTex(correct),
    distractors: ds.map((d) => matTex(d)),
    solution: `Multiply blocks like numbers (keeping order): ${upper ? "$\\begin{bmatrix} I & X \\\\ 0 & I \\end{bmatrix}\\begin{bmatrix} I & Y \\\\ 0 & I \\end{bmatrix} = \\begin{bmatrix} I & X+Y \\\\ 0 & I \\end{bmatrix}$" : "$\\begin{bmatrix} I & 0 \\\\ X & I \\end{bmatrix}\\begin{bmatrix} I & 0 \\\\ Y & I \\end{bmatrix} = \\begin{bmatrix} I & 0 \\\\ X+Y & I \\end{bmatrix}$"}. So the off-diagonal blocks simply **add**: $M^{m}$ has block $mB$ for every integer $m$, and $M^{-1}$ has block $-B$.\nHence $${what}$ has off-diagonal block $${-power}B$:\n$$${what} = ${matTex(correct)}.$$`,
  });
}

/** (cA^T)^{-1} from a given A^{-1}. */
function transposeInverse(rng: Rng): Draft {
  const Ai = mat(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rng.int(-3, 3))));
  if (det_(Ai).isZero() || matEq(Ai, transpose(Ai))) retry();
  const c = rng.pick([2, 3, -2, 4, -1]);
  const AiT = transpose(Ai);
  const correct = mscale(AiT, F(1, c));
  const ds = [mscale(AiT, c), mscale(Ai, F(1, c)), AiT, mscale(Ai, c), mscale(AiT, F(-1, c))];
  const what = c === -1 ? "(-A^T)^{-1}" : `(${c}A^T)^{-1}`;
  return mcq(rng, {
    subtopic: "Inverse algebra",
    prompt: `$A$ is invertible with $A^{-1} = ${matTex(Ai)}$. Find $${what}$.`,
    correct: matTex(correct),
    distractors: ds.map((d) => matTex(d)),
    solution: `Two rules: $(cX)^{-1} = \\frac{1}{c}X^{-1}$ and $(A^T)^{-1} = (A^{-1})^T$. So\n$$${what} = ${F(1, c).tex()}\\,(A^{-1})^T = ${matTex(correct)}.$$\nNo need to find $A$ itself. Traps: multiplying by $${c}$ instead of dividing, and forgetting to transpose.`,
  });
}

function det_(A: Mat): Frac {
  return A.length === 2 ? det2(A) : A[0][0].mul(det2([[A[1][1], A[1][2]], [A[2][1], A[2][2]]])).sub(A[0][1].mul(det2([[A[1][0], A[1][2]], [A[2][0], A[2][2]]]))).add(A[0][2].mul(det2([[A[1][0], A[1][1]], [A[2][0], A[2][1]]])));
}

/** Values of a parameter making a 2x2 matrix singular. */
function paramSingular(rng: Rng): Draft {
  const r1 = rng.int(-5, 5);
  let r2 = rng.int(-5, 5);
  if (r1 === r2) r2 = r1 + rng.pick([1, 2, 3]);
  // det [[k - a, b], [c, k - d]] = (k-a)(k-d) - bc = k^2 - (a+d)k + ad - bc = (k-r1)(k-r2)
  const a = rng.int(-3, 3);
  const d = r1 + r2 - a;
  const bc = a * d - r1 * r2;
  if (bc === 0) retry();
  const divs = [1, 2, 3, 4, 5, 6].filter((x) => bc % x === 0 && Math.abs(bc / x) <= 9);
  if (!divs.length) retry();
  const b = rng.pick(divs) * (rng.chance(0.5) ? 1 : -1);
  const c = bc / b;
  const ent = (s: number) => (s === 0 ? "k" : s > 0 ? `k - ${s}` : `k + ${-s}`);
  const lo = Math.min(r1, r2), hi = Math.max(r1, r2);
  const pair = (x: number, y: number) => (x === y ? `k = ${x}` : `k = ${Math.min(x, y)} \\text{ or } k = ${Math.max(x, y)}`);
  const sum = a + d, prod = a * d - bc;
  return mcq(rng, {
    subtopic: "Inverse basics",
    prompt: `For which value(s) of $k$ is $A = \\begin{bmatrix} ${ent(a)} & ${b} \\\\ ${c} & ${ent(d)} \\end{bmatrix}$ **not** invertible?`,
    correct: pair(lo, hi),
    distractors: [pair(-lo, -hi), `k = ${lo}`, `k = ${hi}`, pair(lo + 1, hi + 1), pair(a, d), `k = ${prod}`],
    solution: `A $2\\times 2$ matrix is invertible iff $ad - bc \\ne 0$.\n$(${ent(a)})(${ent(d)}) - (${b})(${c}) = ${polyK(-sum, prod)} = (k ${lo >= 0 ? "-" : "+"} ${Math.abs(lo)})(k ${hi >= 0 ? "-" : "+"} ${Math.abs(hi)})$.\nThis is zero exactly when $${pair(lo, hi)}$; for every other $k$ the matrix is invertible.`,
  });
}

/** Gauss–Jordan for a 3x3 that turns out singular vs invertible: which conclusion is right. */
function invertibleWithParam(rng: Rng): Draft {
  // rows r1, r2, and r3 = s*r1 + t*r2 + (h - h0) e3 style: A singular iff h = h0
  const r1 = [1, rng.int(-3, 3), rng.int(-3, 3)];
  const r2 = [0, rng.pick([1, -1, 2]), rng.int(-3, 3)];
  const s = rng.nz(-2, 2), t = rng.nz(-2, 2);
  const base = r1.map((x, i) => s * x + t * r2[i]);
  const h0 = base[2];
  const A1 = rng.int(-2, 2);
  // mix rows with an elementary op so it isn't triangular-looking
  const rowsTex = (h: string) =>
    [r1.map(String), r2.map((x, i) => String(x + A1 * r1[i])), [String(base[0]), String(base[1]), h]].map((r) => r.join(" & ")).join(" \\\\ ");
  const correct = `h \\ne ${h0}`;
  const hm = h0 === 0 ? "h" : h0 > 0 ? `h - ${h0}` : `h + ${-h0}`;
  return mcq(rng, {
    subtopic: "Invertible Matrix Theorem",
    prompt: `For which values of $h$ is $A = \\begin{bmatrix} ${rowsTex("h")} \\end{bmatrix}$ invertible?`,
    correct,
    distractors: [`h = ${h0}`, `h \\ne ${-h0}`, `h \\ne ${h0 + 1}`, "\\text{all real } h", `h \\ne ${s * r1[2]}`],
    solution: `Row reduce. Row 3 is built from rows 1 and 2: $\\text{row}_3 - (${s})\\text{row}_1 - (${t})\\big(\\text{row}_2 - (${A1})\\text{row}_1\\big) = [0,\\ 0,\\ ${hm}]$.\nSo an echelon form has pivots in all three columns iff $${hm} \\ne 0$. By the Invertible Matrix Theorem (3 pivots $\\iff$ invertible), $A$ is invertible exactly when $h \\ne ${h0}$. For $h = ${h0}$ the rows are dependent.`,
  });
}

export const matrixAlgebraGens: ((rng: Rng) => Draft)[] = [
  inverse2,
  solveWithInverse,
  gaussJordan3,
  productInverse,
  elementaryPower,
  elementaryFromRows,
  matrixEquation,
  luSolve,
  luFind,
  pdpPower,
  nilpotentInverse,
  polyInverse,
  blockInverse,
  transposeInverse,
  paramSingular,
  invertibleWithParam,
];
