import {
  det, dot, F, lcm, Frac, identity, inverse, Mat, mat, matmul, matTex, matvec, msub, rank, rowTex, rowTexPlain, solve,
  sqrtTex, transpose, vec, Vec, vscale, vsub,
} from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";
import { orthoMatrix, orthPair, parallel, randVec } from "./shared";

function randA(rng: Rng, m: number, n: number, lo = -2, hi = 3): Mat {
  for (let t = 0; t < 100; t++) {
    const A = mat(Array.from({ length: m }, () => Array.from({ length: n }, () => rng.int(lo, hi))));
    if (rank(A) === n) return A;
  }
  retry();
}

function lsParts(A: Mat, b: Vec, maxDen = 12) {
  const At = transpose(A);
  const AtA = matmul(At, A);
  const Atb = matvec(At, b);
  const xhat = solve(AtA, Atb);
  if (!xhat || xhat.reduce((l, x) => lcm(l, x.d), 1) > maxDen) retry();
  const bhat = matvec(A, xhat);
  const e = vsub(b, bhat);
  return { AtA, Atb, xhat, bhat, e };
}

const normalSol = (A: Mat, b: Vec, p: ReturnType<typeof lsParts>) =>
  `Normal equations $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$:\n$$${matTex(p.AtA, false)}\\hat{\\mathbf{x}} = ${rowTexPlain(p.Atb).replace("^T", "^T")}$$\nSolving gives $\\hat{\\mathbf{x}} = ${rowTex(p.xhat)}$.`;

function lsSolve(rng: Rng): Draft {
  const m = rng.pick([3, 3, 4]);
  const orth = rng.chance(0.3);
  const A = orth ? transpose(orthPair(rng, m as 3 | 4)) : randA(rng, m, 2);
  const b = randVec(rng, m, -3, 4);
  const p = lsParts(A, b);
  if (p.e.every((x) => x.isZero())) retry();
  const first2 = solve(A.slice(0, 2), b.slice(0, 2));
  const ds: Vec[] = [p.Atb, [p.xhat[1], p.xhat[0]], [p.xhat[0], p.xhat[1].neg()], vscale(p.xhat, 2)];
  if (first2) ds.unshift(first2);
  const sol = orth
    ? `The columns of $A$ are orthogonal ($\\mathbf{a}_1\\cdot\\mathbf{a}_2 = 0$), so $A^TA$ is diagonal and $\\hat{x}_i = \\dfrac{\\mathbf{b}\\cdot\\mathbf{a}_i}{\\mathbf{a}_i\\cdot\\mathbf{a}_i}$: $\\hat{\\mathbf{x}} = ${rowTex(p.xhat)}$.`
    : normalSol(A, b, p);
  return mcq(rng, {
    subtopic: "Normal equations",
    prompt: `Find $\\hat{\\mathbf{x}}$, the least-squares solution of $A\\mathbf{x} = \\mathbf{b}$, where $A = ${matTex(A)}$ and $\\mathbf{b} = ${rowTexPlain(b)}$.`,
    correct: rowTex(p.xhat),
    distractors: ds.map(rowTex),
    solution: sol + `\n(Solving only the first two equations exactly ignores the other rows — that is not least squares.)`,
  });
}

function normalEquations(rng: Rng): Draft {
  const A = randA(rng, rng.pick([3, 4]), 2, -2, 3);
  const b = randVec(rng, A.length, -3, 3);
  const p = lsParts(A, b);
  if (p.AtA[0][1].isZero()) retry();
  const sys = (M: Mat, c: Vec) => `${matTex(M, false)}\\hat{\\mathbf{x}} = ${matTex(c.map((x) => [x]), false)}`;
  const flipOff = p.AtA.map((r, i) => r.map((x, j) => (i === j ? x : x.neg())));
  const swapDiag: Mat = [[p.AtA[1][1], p.AtA[0][1]], [p.AtA[1][0], p.AtA[0][0]]];
  return mcq(rng, {
    subtopic: "Normal equations",
    prompt: `For $A = ${matTex(A)}$ and $\\mathbf{b} = ${rowTexPlain(b)}$, which system is the normal equation for the least-squares problem $A\\mathbf{x} \\approx \\mathbf{b}$?`,
    correct: sys(p.AtA, p.Atb),
    distractors: [
      sys(flipOff, p.Atb),
      sys(swapDiag, p.Atb),
      sys(p.AtA, [p.Atb[1], p.Atb[0]]),
      sys(A.slice(0, 2), b.slice(0, 2)),
      sys(p.AtA, vscale(p.Atb, -1)),
    ],
    solution: `$A^TA = ${matTex(p.AtA, false)}$ (entries are dot products of columns of $A$) and $A^T\\mathbf{b} = ${rowTexPlain(p.Atb)}$ (dot products of columns with $\\mathbf{b}$). The normal equation is $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$, and it **always** has a solution.`,
  });
}

function lsErrorOrProj(rng: Rng): Draft {
  const m = rng.pick([3, 4]);
  const A = randA(rng, m, 2, -2, 2);
  const b = randVec(rng, m, -3, 4);
  const p = lsParts(A, b);
  const e2 = dot(p.e, p.e);
  if (e2.isZero()) retry();
  const mode = rng.pick(["err", "bhat", "res"]);
  const head = `Let $A = ${matTex(A)}$ and $\\mathbf{b} = ${rowTexPlain(b)}$, and let $\\hat{\\mathbf{x}}$ be the least-squares solution of $A\\mathbf{x} = \\mathbf{b}$.`;
  const base = normalSol(A, b, p) + `\n$\\hat{\\mathbf{b}} = A\\hat{\\mathbf{x}} = ${rowTex(p.bhat)}$, residual $\\mathbf{b}-A\\hat{\\mathbf{x}} = ${rowTex(p.e)}$ (orthogonal to every column of $A$).`;
  if (mode === "err") {
    return mcq(rng, {
      subtopic: "Least-squares error",
      prompt: `${head} Find the least-squares error $\\|\\mathbf{b} - A\\hat{\\mathbf{x}}\\|$.`,
      correct: sqrtTex(e2),
      distractors: [e2.tex(), sqrtTex(dot(b, b)), sqrtTex(dot(p.bhat, p.bhat)), sqrtTex(e2.add(1)), sqrtTex(e2.mul(2))],
      solution: `${base}\nError $= \\sqrt{${e2.tex()}} = ${sqrtTex(e2)}$.`,
    });
  }
  const correct = mode === "bhat" ? p.bhat : p.e;
  return mcq(rng, {
    subtopic: mode === "bhat" ? "Projection onto Col A" : "Residual",
    prompt: mode === "bhat"
      ? `${head} Find $\\hat{\\mathbf{b}} = A\\hat{\\mathbf{x}}$, the orthogonal projection of $\\mathbf{b}$ onto $\\operatorname{Col}A$.`
      : `${head} Find the residual vector $\\mathbf{b} - A\\hat{\\mathbf{x}}$.`,
    correct: rowTex(correct),
    distractors: [mode === "bhat" ? p.e : p.bhat, vscale(correct, -1), vscale(correct, 2), [...p.xhat, ...Array(m - 2).fill(F(0))], vsub(correct, vec([1, ...Array(m - 1).fill(0)]))].map(rowTex),
    solution: base,
  });
}

function projMatrix(rng: Rng): Draft {
  const A = randA(rng, 3, 2, -1, 2);
  const AtA = matmul(transpose(A), A);
  const inv = inverse(AtA);
  if (!inv || det(AtA).valueOf() > 14) retry();
  const P = matmul(matmul(A, inv), transpose(A));
  const IP = msub(identity(3), P);
  const AAt = matmul(A, transpose(A));
  const flip = P.map((r, i) => r.map((x, j) => (i === j ? x : x.neg())));
  return mcq(rng, {
    subtopic: "Projection matrix",
    prompt: `Find the projection matrix $P$ onto $\\operatorname{Col}A$ for $A = ${matTex(A)}$.`,
    correct: matTex(P),
    distractors: [matTex(IP), matTex(AAt), matTex(flip), matTex(AtA), matTex(P.map((r) => r.map((x) => x.mul(2))))],
    solution: `$A^TA = ${matTex(AtA, false)}$, $(A^TA)^{-1} = ${matTex(inv)}$.\n$P = A(A^TA)^{-1}A^T = ${matTex(P)}$.\nChecks: $P^T = P$, $P^2 = P$, $\\operatorname{trace}P = \\operatorname{rank}A = 2$. ($I-P$ projects onto $(\\operatorname{Col}A)^\\perp$.)`,
  });
}

function regressionLine(rng: Rng): Draft {
  const n = rng.pick([4, 4, 5]);
  const xs = rng.shuffle([-2, -1, 0, 1, 2, 3, 4]).slice(0, n).sort((a, b) => a - b);
  const ys = xs.map(() => rng.int(-2, 6));
  const X = mat(xs.map((x) => [1, x]));
  const y = vec(ys);
  const p = lsParts(X, y, 30);
  const [b0, b1] = p.xhat;
  if (b1.isZero()) retry();
  const sxy = xs.reduce((s, x, i) => s + x * ys[i], 0);
  const sxx = xs.reduce((s, x) => s + x * x, 0);
  const meanY = F(ys.reduce((s, v) => s + v, 0), n);
  const endSlope = F(ys[n - 1] - ys[0], xs[n - 1] - xs[0]);
  const opt = (a: Frac, c: Frac) => `\\beta_0 = ${a.tex()},\\ \\beta_1 = ${c.tex()}`;
  return mcq(rng, {
    subtopic: "Linear models",
    prompt: `Fit the least-squares line $y = \\beta_0 + \\beta_1 x$ to the data points ${xs.map((x, i) => `$(${x}, ${ys[i]})$`).join(", ")}.`,
    correct: opt(b0, b1),
    distractors: [opt(b1, b0), opt(meanY, F(sxy, sxx)), opt(F(ys[0]).sub(endSlope.mul(xs[0])), endSlope), opt(b0, b1.neg()), opt(b0.neg(), b1)],
    solution: `Design matrix $X = ${matTex(X)}$, observation vector $\\mathbf{y} = ${rowTexPlain(y)}$.\n$$X^TX = ${matTex(p.AtA, false)},\\quad X^T\\mathbf{y} = ${rowTexPlain(p.Atb)}$$\nSolving $X^TX\\boldsymbol{\\beta} = X^T\\mathbf{y}$ gives $\\beta_0 = ${b0.tex()}$, $\\beta_1 = ${b1.tex()}$.`,
  });
}

const MODELS = [
  { tex: "y = \\beta_0 + \\beta_1 x + \\beta_2 x^2", cols: [() => 1, (x: number) => x, (x: number) => x * x] },
  { tex: "y = \\beta_1 x + \\beta_2 x^2", cols: [(x: number) => x, (x: number) => x * x] },
  { tex: "y = \\beta_0 + \\beta_1 x^2", cols: [() => 1, (x: number) => x * x] },
  { tex: "y = \\beta_0 + \\beta_1 x + \\beta_2 x^3", cols: [() => 1, (x: number) => x, (x: number) => x ** 3] },
];

function designMatrix(rng: Rng): Draft {
  const model = rng.pick(MODELS);
  const xs = rng.shuffle([-2, -1, 1, 2, 3]).slice(0, 4).sort((a, b) => a - b);
  const build = (cols: ((x: number) => number)[]) => matTex(mat(xs.map((x) => cols.map((c) => c(x)))), false);
  const correct = build(model.cols);
  const k = model.cols.length;
  const alt = [
    build([...model.cols].reverse()),
    build(model.cols.map((c) => (x: number) => (c(x) === x * x ? 2 * x : c(x)))),
    build(model.cols.map((c) => (x: number) => (c(x) === 1 && k > 2 ? x : c(x)))),
    build([() => 1, (x: number) => x, ...(k > 2 ? [(x: number) => x * x * x] : [])]),
    build([() => 1, (x: number) => x, (x: number) => x * x].slice(0, Math.max(2, k + (k === 3 ? 0 : 1)))),
  ];
  return mcq(rng, {
    subtopic: "Linear models",
    prompt: `Data are recorded at $x = ${xs.join(",\\ ")}$. To fit the model $${model.tex}$ by least squares, we solve $X\\boldsymbol{\\beta} \\approx \\mathbf{y}$. What is the design matrix $X$?`,
    correct,
    distractors: alt,
    solution: `Each row is one data point; each column is the function multiplying one parameter, in the order of $\\boldsymbol{\\beta}$. The model is **linear in the parameters** even if it is nonlinear in $x$, so ordinary least squares applies: $X = ${correct}$.`,
  });
}

function qrLeastSquares(rng: Rng): Draft {
  const { U } = orthoMatrix(rng, 3);
  const Q = U.map((r) => r.slice(0, 2));
  const R = mat([[rng.int(1, 4), rng.int(-3, 3)], [0, rng.int(1, 4)]]);
  const b = randVec(rng, 3, -4, 4);
  const Qtb = matvec(transpose(Q), b);
  const xhat = solve(R, Qtb);
  if (!xhat) retry();
  const Rt = solve(transpose(R), Qtb);
  return mcq(rng, {
    subtopic: "Least squares via QR",
    prompt: `$A = QR$ where $Q = ${matTex(Q)}$ has orthonormal columns and $R = ${matTex(R, false)}$. Find the least-squares solution of $A\\mathbf{x} = \\mathbf{b}$ for $\\mathbf{b} = ${rowTexPlain(b)}$.`,
    correct: rowTex(xhat),
    distractors: [rowTex(Qtb), rowTex(matvec(R, Qtb)), ...(Rt ? [rowTex(Rt)] : []), rowTex([xhat[1], xhat[0]]), rowTex(vscale(xhat, -1))],
    solution: `With $A = QR$, the normal equations reduce to $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$.\n$Q^T\\mathbf{b} = ${rowTex(Qtb)}$; back-substitution in $R$ gives $\\hat{\\mathbf{x}} = ${rowTex(xhat)}$.`,
  });
}

function dependentColumns(rng: Rng): Draft {
  const a = randVec(rng, 3, -2, 2);
  const k = rng.pick([-2, -1, 2, 3]);
  const A = transpose([a, vscale(a, k)]);
  const b = randVec(rng, 3, -3, 3);
  if (parallel(a, b)) retry();
  const ab = dot(a, b);
  if (ab.isZero()) retry();
  const bhat = vscale(a, ab.div(dot(a, a)));
  return mcq(rng, {
    subtopic: "Uniqueness",
    prompt: `Let $A = ${matTex(A)}$ and $\\mathbf{b} = ${rowTexPlain(b)}$. Which statement about the least-squares problem $A\\mathbf{x} \\approx \\mathbf{b}$ is correct?`,
    correct: `\\text{Infinitely many } \\hat{\\mathbf{x}}, \\text{ but } A\\hat{\\mathbf{x}} = ${rowTex(bhat)}`,
    distractors: [
      `\\text{Unique } \\hat{\\mathbf{x}}, \\text{ and } A\\hat{\\mathbf{x}} = ${rowTex(bhat)}`,
      `\\text{No least-squares solution since } A^TA \\text{ is singular}`,
      `\\text{Infinitely many } \\hat{\\mathbf{x}}, \\text{ and } A\\hat{\\mathbf{x}} \\text{ is not unique}`,
      `\\text{Infinitely many } \\hat{\\mathbf{x}}, \\text{ but } A\\hat{\\mathbf{x}} = ${rowTex(vscale(a, ab))}`,
    ],
    solution: `Column 2 $= ${k}\\times$ column 1, so the columns are dependent, $A^TA$ is singular and $\\hat{\\mathbf{x}}$ is **not unique** (the normal equations still have solutions — always!). But $\\hat{\\mathbf{b}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$ is unique: $\\operatorname{Col}A = \\operatorname{Span}\\{\\mathbf{a}\\}$, so $\\hat{\\mathbf{b}} = \\dfrac{${ab.tex()}}{${dot(a, a).tex()}}\\mathbf{a} = ${rowTex(bhat)}$.`,
  });
}

function uniqueTFN(rng: Rng): Draft {
  const dep = rng.chance(0.5);
  let A: Mat;
  if (dep) {
    const c1 = randVec(rng, 3, -2, 2);
    const c2 = randVec(rng, 3, -2, 2);
    const s = rng.pick([1, -1, 2]);
    const t = rng.pick([1, -1, 2]);
    A = transpose([c1, c2, c1.map((x, i) => x.mul(s).add(c2[i].mul(t)))]);
    if (rank(A) !== 2) retry();
  } else {
    A = randA(rng, 4, 3, -1, 2);
  }
  const m = A.length;
  const b = randVec(rng, m, -3, 3);
  return tfn({
    subtopic: "Uniqueness",
    prompt: `Let $A = ${matTex(A)}$ and $\\mathbf{b} = ${rowTexPlain(b)}$. The equation $A\\mathbf{x} = \\mathbf{b}$ has a unique least-squares solution.`,
    answer: dep ? 1 : 0,
    solution: dep
      ? `Column 3 is a combination of columns 1 and 2, so the columns are linearly dependent, $A^TA$ is singular and there are infinitely many least-squares solutions (though $A\\hat{\\mathbf{x}}$ is unique).`
      : `$\\operatorname{rank}A = 3$ = number of columns, so the columns are independent, $A^TA$ is invertible and $\\hat{\\mathbf{x}} = (A^TA)^{-1}A^T\\mathbf{b}$ is unique — for **every** $\\mathbf{b}$.`,
  });
}

function consistentTFN(rng: Rng): Draft {
  const A = randA(rng, 3, 2, -2, 2);
  const inCol = rng.chance(0.5);
  const b = inCol ? matvec(A, randVec(rng, 2, -2, 2)) : randVec(rng, 3, -3, 3);
  const aug = A.map((r, i) => [...r, b[i]]);
  const consistent = rank(aug) === 2;
  if (!inCol && consistent) retry();
  const p = lsParts(A, b);
  return tfn({
    subtopic: "Consistency",
    prompt: `Let $A = ${matTex(A)}$ and $\\mathbf{b} = ${rowTexPlain(b)}$. The least-squares error $\\|\\mathbf{b} - A\\hat{\\mathbf{x}}\\|$ is zero.`,
    answer: consistent ? 0 : 1,
    solution: `The error is zero exactly when $\\mathbf{b}\\in\\operatorname{Col}A$ (i.e. $A\\mathbf{x}=\\mathbf{b}$ is consistent). Here $\\hat{\\mathbf{x}} = ${rowTex(p.xhat)}$ and the residual is $${rowTex(p.e)}$, so the statement is ${consistent ? "true" : "false"}.`,
  });
}

export const leastSquaresGens = [
  lsSolve, lsSolve, normalEquations, lsErrorOrProj, lsErrorOrProj, projMatrix, regressionLine, designMatrix,
  qrLeastSquares, dependentColumns, uniqueTFN, consistentTFN,
];
