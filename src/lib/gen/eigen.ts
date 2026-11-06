import {
  cross, det, F, Frac, identity, inverse, Mat, mat, matmul, matTex, matvec, msub, primitive, rank, rowTexPlain, signed, sqrtTex, transpose, vec, Vec, vscale,
} from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";
import { parallel, randVec } from "./shared";

/** Integer matrix with determinant ±1 (so its inverse is integer too). */
function unimodular(rng: Rng, n: 2 | 3): Mat {
  if (n === 2) {
    for (;;) {
      const P = mat([[rng.int(-2, 3), rng.int(-2, 3)], [rng.int(-2, 3), rng.int(-2, 3)]]);
      if (Math.abs(det(P).valueOf()) === 1 && P.flat().filter((x) => x.isZero()).length <= 1) return P;
    }
  }
  const L = mat([[1, 0, 0], [rng.int(-1, 1), 1, 0], [rng.int(-1, 1), rng.int(-1, 1), 1]]);
  const U = mat([[1, rng.int(-1, 1), rng.int(-1, 1)], [0, 1, rng.int(-1, 1)], [0, 0, 1]]);
  const P = matmul(L, U);
  return rng.chance(0.5) ? P : transpose(P);
}

const diag = (ds: (number | Frac)[]) => ds.map((d, i) => ds.map((_, j) => (i === j ? Frac.of(d) : F(0))));

function fromEigen(P: Mat, ds: (number | Frac)[]): Mat {
  const inv = inverse(P);
  if (!inv) retry();
  return matmul(matmul(P, diag(ds)), inv);
}

const listTex = (xs: Frac[]) => [...xs].sort((a, b) => a.cmp(b)).map((x) => x.tex()).join(",\\ ");
const lamTex = (xs: Frac[]) => `\\lambda = ${listTex(xs)}`;

function nullVector(M: Mat): Vec {
  if (M.length === 2) {
    const r = M[0].some((x) => !x.isZero()) ? M[0] : M[1];
    return primitive([r[1].neg(), r[0]]);
  }
  const rows = M.filter((r) => r.some((x) => !x.isZero()));
  for (let i = 0; i < rows.length; i++)
    for (let j = i + 1; j < rows.length; j++) {
      const c = cross(rows[i], rows[j]);
      if (c.some((x) => !x.isZero())) return primitive(c);
    }
  retry();
}

function eigenvalues2(rng: Rng): Draft {
  const [l1, l2] = rng.shuffle([-3, -2, -1, 1, 2, 3, 4, 5]).slice(0, 2);
  const A = fromEigen(unimodular(rng, 2), [l1, l2]);
  const tr = l1 + l2;
  const dt = l1 * l2;
  const ls = [F(l1), F(l2)];
  return mcq(rng, {
    subtopic: "Characteristic equation",
    prompt: `Find the eigenvalues of $A = ${matTex(A)}$.`,
    correct: lamTex(ls),
    distractors: [
      lamTex([A[0][0], A[1][1]]),
      lamTex(ls.map((x) => x.neg())),
      lamTex([F(tr), F(dt)]),
      lamTex([F(l1), F(-l2)]),
      lamTex([F(l1 + 1), F(l2 - 1)]),
    ],
    solution: `$\\det(A-\\lambda I) = \\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = \\lambda^2 ${signed(F(-tr))}\\lambda ${signed(F(dt))} = (\\lambda ${signed(F(-l1))})(\\lambda ${signed(F(-l2))})$, so $\\lambda = ${l1}, ${l2}$.\nCheck: sum $= \\operatorname{tr}A = ${tr}$, product $= \\det A = ${dt}$. (The diagonal entries are the eigenvalues only for triangular matrices.)`,
  });
}

function charPoly(rng: Rng): Draft {
  const A = mat([[rng.int(-4, 5), rng.nz(-4, 4)], [rng.nz(-4, 4), rng.int(-4, 5)]]);
  const tr = A[0][0].add(A[1][1]);
  const dt = det(A);
  const poly = (b: Frac, c: Frac) => `\\lambda^2 ${signed(b)}\\lambda ${signed(c)}`;
  const alt = A[0][0].mul(A[1][1]).add(A[0][1].mul(A[1][0]));
  return mcq(rng, {
    subtopic: "Characteristic equation",
    prompt: `What is the characteristic polynomial $\\det(A - \\lambda I)$ of $A = ${matTex(A, false)}$?`,
    correct: poly(tr.neg(), dt),
    distractors: [poly(tr, dt), poly(tr.neg(), dt.neg()), poly(tr.neg(), alt), poly(dt.neg(), tr), poly(tr, dt.neg())],
    solution: `$\\det\\begin{bmatrix} ${A[0][0].tex()}-\\lambda & ${A[0][1].tex()} \\\\ ${A[1][0].tex()} & ${A[1][1].tex()}-\\lambda \\end{bmatrix} = \\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A$ with $\\operatorname{tr}A = ${tr.tex()}$, $\\det A = ${dt.tex()}$: $${poly(tr.neg(), dt)}$.`,
  });
}

function falseStatement(rng: Rng): Draft {
  const [l1, l2] = rng.shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 2);
  const P = unimodular(rng, 2);
  const A = fromEigen(P, [l1, l2]);
  const v1 = primitive([P[0][0], P[1][0]]);
  const v2 = primitive([P[0][1], P[1][1]]);
  let w = randVec(rng, 2, -3, 3);
  for (let t = 0; t < 20 && (parallel(w, v1) || parallel(w, v2)); t++) w = randVec(rng, 2, -3, 3);
  if (parallel(w, v1) || parallel(w, v2)) retry();
  const notEig = [-4, -3, -2, -1, 1, 2, 3, 4, 5].filter((x) => x !== l1 && x !== l2);
  const truths = [
    `$${l1}$ is an eigenvalue of $A$.`,
    `$${l2}$ is an eigenvalue of $A$.`,
    `$${rowTexPlain(v1)}$ is an eigenvector of $A$.`,
    `$${rowTexPlain(v2)}$ is an eigenvector of $A$.`,
    `$\\det A = ${l1 * l2}$.`,
    `$A$ is diagonalisable.`,
  ];
  const lies = [
    `The eigenvalues of $A$ are repeated.`,
    `$${rng.pick(notEig)}$ is an eigenvalue of $A$.`,
    `$${rowTexPlain(w)}$ is an eigenvector of $A$.`,
    `$A$ is not invertible.`,
    `$\\operatorname{trace}A = ${l1 * l2 === l1 + l2 ? l1 + l2 + 1 : l1 * l2}$.`,
  ];
  const noneFalse = rng.chance(0.15);
  const picked = rng.shuffle(truths).slice(0, noneFalse ? 4 : 3);
  const lie = rng.pick(lies);
  const opts = noneFalse ? picked : rng.shuffle([...picked, lie]);
  return {
    subtopic: "Eigenvalues & eigenvectors",
    kind: "mcq",
    prompt: `Given $A = ${matTex(A)}$, which statement below is **False**?`,
    options: [...opts, "None of the above"],
    answer: noneFalse ? 4 : opts.indexOf(lie),
    solution: `$\\det(A-\\lambda I) = 0$ gives $\\lambda = ${l1}, ${l2}$ (distinct, so $A$ is diagonalisable; no zero eigenvalue, so $A$ is invertible; $\\det A = ${l1 * l2}$, $\\operatorname{tr}A = ${l1 + l2}$).\nEigenvectors: $A${rowTexPlain(v1)} = ${l1}${rowTexPlain(v1)}$ and $A${rowTexPlain(v2)} = ${l2}${rowTexPlain(v2)}$.` +
      (noneFalse ? `\nAll four statements are true, so the answer is **None of the above**.` : `\nThe false statement is: ${lie}`),
  };
}

function eigenvector(rng: Rng): Draft {
  const n = rng.pick([2, 3]) as 2 | 3;
  let A: Mat;
  let lams: number[];
  if (n === 2) {
    lams = rng.shuffle([-2, -1, 1, 2, 3, 4]).slice(0, 2);
    A = fromEigen(unimodular(rng, 2), lams);
  } else {
    lams = rng.shuffle([-2, -1, 0, 1, 2, 3, 4]).slice(0, 3);
    A = mat([[lams[0], rng.int(-2, 2), rng.int(-2, 2)], [0, lams[1], rng.int(-2, 2)], [0, 0, lams[2]]]);
  }
  const idx = rng.int(0, n - 1);
  const lam = lams[idx];
  const vecs = lams.map((l) => nullVector(matSub(A, l)));
  const v = vecs[idx];
  const ds: Vec[] = vecs.filter((_, i) => i !== idx);
  for (let t = 0; t < 30 && ds.length < 6; t++) {
    const w = randVec(rng, n, -2, 3);
    if (!parallel(w, v) && !vecs.some((u) => parallel(u, w))) ds.push(w);
  }
  ds.push(v.map((x, i) => (i === 0 ? x.neg() : x)));
  const clean = ds.filter((d) => !parallel(d, v) && d.some((x) => !x.isZero()));
  const Av = matvec(A, v);
  return mcq(rng, {
    subtopic: "Eigenvalues & eigenvectors",
    prompt: `$A = ${matTex(A, false)}$ has eigenvalue $\\lambda = ${lam}$. Which vector is a corresponding eigenvector?`,
    correct: rowTexPlain(v),
    distractors: clean.map(rowTexPlain),
    solution: `Solve $(A - ${lam}I)\\mathbf{x} = \\mathbf{0}$: $A - ${lam}I = ${matTex(matSub(A, lam), false)}$, whose null space is spanned by $${rowTexPlain(v)}$.\nCheck: $A${rowTexPlain(v)} = ${rowTexPlain(Av)} = ${lam}${rowTexPlain(v)}$. (Any nonzero multiple is also an eigenvector.)`,
  });
}

const matScale = (M: Mat, k: number) => M.map((r) => r.map((x) => x.mul(k)));
const matSub = (A: Mat, l: number) => msub(A, matScale(identity(A.length), l));

function powers(rng: Rng): Draft {
  const [l1, l2] = rng.shuffle([-2, -1, 1, 2, 3]).slice(0, 2);
  const P = unimodular(rng, 2);
  const A = fromEigen(P, [l1, l2]);
  const k = rng.pick([3, 4, 5]);
  const Ak = fromEigen(P, [l1 ** k, l2 ** k]);
  const inv = inverse(P)!;
  const wrongOrder = matmul(matmul(inv, diag([l1 ** k, l2 ** k])), P);
  const entrywise = A.map((r) => r.map((x) => x.pow(k)));
  const Akm1 = fromEigen(P, [l1 ** (k - 1), l2 ** (k - 1)]);
  return mcq(rng, {
    subtopic: "Powers of A",
    prompt: `$A = PDP^{-1}$ with $P = ${matTex(P, false)}$ and $D = ${matTex(diag([l1, l2]), false)}$. Compute $A^{${k}}$.`,
    correct: matTex(Ak),
    distractors: [matTex(wrongOrder), matTex(entrywise), matTex(Akm1), matTex(matScale(A, k)), matTex(diag([l1 ** k, l2 ** k]))],
    solution: `$A^k = PD^kP^{-1}$ (the inner $P^{-1}P$ factors cancel). $D^{${k}} = ${matTex(diag([l1 ** k, l2 ** k]), false)}$, $P^{-1} = ${matTex(inv, false)}$.\n$A^{${k}} = PD^{${k}}P^{-1} = ${matTex(Ak)}$. (Raising entries of $A$ to a power is **not** $A^k$.)`,
  });
}

function limitAkx(rng: Rng): Draft {
  const P = unimodular(rng, 3);
  const vs = transpose(P);
  const scenario = rng.pick(["blow", "blow", "fixed", "decay", "blowZero"]);
  const pool: Record<string, Frac[]> = {
    blow: [F(rng.pick([2, 3])), F(1, 2), F(rng.pick([1, -1]), rng.pick([3, 4]))],
    blowZero: [F(rng.pick([2, 3])), F(3, 2), F(1, 2)],
    fixed: [F(1), F(1, 2), F(-1, 3)],
    decay: [F(1, 2), F(-1, 2), F(3, 4)],
  };
  const lams = pool[scenario];
  const cs = [F(rng.nz(-2, 2)), F(rng.nz(-2, 2)), F(rng.pick([1, -1]), 2)];
  if (scenario === "blowZero") cs[0] = F(0);
  const A = fromEigen(P, lams);
  const order = rng.shuffle([0, 1, 2]);
  const V = order.map((i) => vs[i]);
  const L = order.map((i) => lams[i]);
  const C = order.map((i) => cs[i]);
  const entryLimit = (e: number): string => {
    const terms = [0, 1, 2].map((i) => ({ l: L[i], a: C[i].mul(V[i][e]) })).filter((t) => !t.a.isZero());
    if (!terms.length) return "0";
    const top = terms.reduce((m, t) => (t.l.abs().cmp(m.l.abs()) > 0 ? t : m));
    if (top.l.abs().cmp(1) < 0) return "0";
    if (top.l.eq(1)) return top.a.tex();
    return top.a.n > 0 ? "+\\infty" : "-\\infty";
  };
  const lim = [0, 1, 2].map(entryLimit);
  const vt = (xs: string[]) => `[${xs.join(",\\ ")}]^T`;
  const flip = (s: string) => (s === "+\\infty" ? "-\\infty" : s === "-\\infty" ? "+\\infty" : s);
  const ds = [
    vt(lim.map(flip)),
    vt(["0", "0", "0"]),
    vt(lim.map((s) => (s.includes("infty") ? "+\\infty" : s))),
    vt(lim.map((s) => (s.includes("infty") ? "-\\infty" : s))),
    vt(lim.map((s, i) => (i === 0 ? flip(s) : s))),
    vt(lim.map((s) => (s === "0" ? "+\\infty" : s))),
    vt(V[0].map((x) => x.tex())),
  ];
  const sol = `Check $A\\mathbf{v}_i$: the eigenvalues are ${L.map((l, i) => `$\\lambda_${i + 1} = ${l.tex()}$`).join(", ")}.\nThen $A^k\\mathbf{x} = ${C.map((c, i) => `(${c.tex()})(${L[i].tex()})^k\\mathbf{v}_${i + 1}`).join(" + ")}$.\nTerms with $|\\lambda|<1$ vanish, $\\lambda = 1$ terms stay fixed, and the term with the largest $|\\lambda|>1$ (and nonzero coefficient) dominates; its sign in each entry decides $\\pm\\infty$ (an entry where that eigenvector is 0 is governed by the next term).\nLimit: $${vt(lim)}$.`;
  return mcq(rng, {
    subtopic: "Powers of A",
    prompt: `$A = ${matTex(A)}$ has eigenvectors $\\mathbf{v}_1 = ${rowTexPlain(V[0])}$, $\\mathbf{v}_2 = ${rowTexPlain(V[1])}$, $\\mathbf{v}_3 = ${rowTexPlain(V[2])}$. Let $\\mathbf{x} = ${C.map((c, i) => `${c.eq(1) ? "" : c.eq(-1) ? "-" : c.tex()}\\mathbf{v}_${i + 1}`).join(" + ").replace(/\+ -/g, "- ")}$. What does $A^k\\mathbf{x}$ tend to as $k \\to +\\infty$?`,
    correct: vt(lim),
    distractors: ds,
    solution: sol,
  });
}

function complexEig(rng: Rng): Draft {
  const a = rng.int(-3, 3);
  const b = rng.int(1, 4);
  const A = similarRotation(rng, a, b);
  const askMod = rng.chance(0.4);
  const r2 = F(a * a + b * b);
  const pm = (re: number, im: number) => `\\lambda = ${re === 0 ? "" : re}\\pm ${im === 1 ? "" : im}j`;
  if (askMod) {
    return mcq(rng, {
      subtopic: "Complex eigenvalues",
      prompt: `The real matrix $A = ${matTex(A, false)}$ has complex eigenvalues. By what factor does $A$ scale lengths in its rotation–scaling form (i.e. find $|\\lambda|$)?`,
      correct: sqrtTex(r2),
      distractors: [r2.tex(), sqrtTex(F(Math.abs(a) + b)), String(Math.abs(a) + b), sqrtTex(F(Math.abs(a * a - b * b) || 2)), sqrtTex(r2.add(1))],
      solution: `$\\operatorname{tr}A = ${2 * a}$, $\\det A = ${a * a + b * b}$, so $\\lambda^2 - ${2 * a}\\lambda + ${a * a + b * b} = 0$ gives $\\lambda = ${a} \\pm ${b}j$.\n$|\\lambda| = \\sqrt{a^2+b^2} = \\sqrt{${a * a + b * b}} = ${sqrtTex(r2)}$ (also $= \\sqrt{\\det A}$).`,
    });
  }
  return mcq(rng, {
    subtopic: "Complex eigenvalues",
    prompt: `Find the eigenvalues of $A = ${matTex(A, false)}$.`,
    correct: pm(a, b),
    distractors: [pm(b, Math.abs(a) || 1), pm(-a, b), pm(a, b * b), `\\lambda = ${a + b},\\ ${a - b}`, pm(2 * a, b), pm(a, 2 * b)],
    solution: `$\\operatorname{tr}A = ${2 * a}$, $\\det A = ${a * a + b * b}$, so $\\lambda^2 ${signed(F(-2 * a))}\\lambda + ${a * a + b * b} = 0$.\n$\\lambda = \\dfrac{${2 * a} \\pm \\sqrt{${4 * a * a} - ${4 * (a * a + b * b)}}}{2} = ${a} \\pm ${b}j$. Real matrices have complex eigenvalues in conjugate pairs.`,
  });
}

function similarRotation(rng: Rng, a: number, b: number): Mat {
  const P = unimodular(rng, 2);
  const C = mat([[a, -b], [b, a]]);
  return matmul(matmul(P, C), inverse(P)!);
}

function eigOfFunction(rng: Rng): Draft {
  const lams = rng.shuffle([-2, -1, 1, 2, 3]).slice(0, 3);
  const A = mat([[lams[0], rng.int(-3, 3), rng.int(-3, 3)], [0, lams[1], rng.int(-3, 3)], [0, 0, lams[2]]]);
  const fns = [
    { tex: "A^2", f: (l: Frac) => l.mul(l), wrong: (l: Frac) => l.mul(2) },
    { tex: "A^{-1}", f: (l: Frac) => F(1).div(l), wrong: (l: Frac) => l.neg() },
    { tex: "A + 3I", f: (l: Frac) => l.add(3), wrong: (l: Frac) => l.mul(3) },
    { tex: "A^2 - 2A", f: (l: Frac) => l.mul(l).sub(l.mul(2)), wrong: (l: Frac) => l.mul(l).sub(2) },
    { tex: "A^T", f: (l: Frac) => l, wrong: (l: Frac) => l.neg() },
    { tex: "2A^{-1}", f: (l: Frac) => F(2).div(l), wrong: (l: Frac) => F(1).div(l.mul(2)) },
  ];
  const fn = rng.pick(fns);
  const L = lams.map((x) => F(x));
  const ask = rng.pick(["eig", "det"]);
  const vals = L.map(fn.f);
  if (ask === "det") {
    const d = vals.reduce((p, x) => p.mul(x), F(1));
    const dw = L.map(fn.wrong).reduce((p, x) => p.mul(x), F(1));
    return mcq(rng, {
      subtopic: "Properties of eigenvalues",
      prompt: `Let $A = ${matTex(A, false)}$. Find $\\det(${fn.tex})$.`,
      correct: d.tex(),
      distractors: [dw.tex(), d.neg().tex(), vals.reduce((s, x) => s.add(x), F(0)).tex(), det(A).tex(), d.add(1).tex()],
      solution: `$A$ is triangular, so its eigenvalues are its diagonal entries $${listTex(L)}$. The eigenvalues of $${fn.tex}$ are $f(\\lambda)$: $${listTex(vals)}$.\n$\\det(${fn.tex})$ = product of its eigenvalues $= ${d.tex()}$.`,
    });
  }
  return mcq(rng, {
    subtopic: "Properties of eigenvalues",
    prompt: `Let $A = ${matTex(A, false)}$. What are the eigenvalues of $${fn.tex}$?`,
    correct: listTex(vals),
    distractors: [listTex(L.map(fn.wrong)), listTex(L), listTex(vals.map((x) => x.neg())), listTex(vals.map((x) => x.add(1)))],
    solution: `$A$ is triangular, so $\\lambda(A) = ${listTex(L)}$. If $A\\mathbf{v} = \\lambda\\mathbf{v}$ then $(${fn.tex})\\mathbf{v} = f(\\lambda)\\mathbf{v}$ with the same eigenvector, so the eigenvalues are $${listTex(vals)}$.`,
  });
}

function traceDet(rng: Rng): Draft {
  const lams = rng.shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 3);
  const A = fromEigen(unimodular(rng, 3), lams);
  if (A.flat().some((x) => Math.abs(x.valueOf()) > 12)) retry();
  const [l1, l2, l3] = lams;
  const opt = (x: number, d: number) => `\\lambda_3 = ${x},\\ \\det A = ${d}`;
  const tr = l1 + l2 + l3;
  return mcq(rng, {
    subtopic: "Properties of eigenvalues",
    prompt: `$A = ${matTex(A, false)}$ has eigenvalues $${l1}$ and $${l2}$. Find the third eigenvalue $\\lambda_3$ and $\\det A$.`,
    correct: opt(l3, l1 * l2 * l3),
    distractors: [opt(l3, l1 + l2 + l3), opt(tr - l1 + l2, l1 * l2 * (tr - l1 + l2)), opt(-l3, -l1 * l2 * l3), opt(tr, l1 * l2 * tr), opt(l3, -l1 * l2 * l3)],
    solution: `$\\operatorname{tr}A = ${tr}$ = sum of eigenvalues, so $\\lambda_3 = ${tr} - (${l1}) - (${l2}) = ${l3}$.\n$\\det A$ = product of eigenvalues $= (${l1})(${l2})(${l3}) = ${l1 * l2 * l3}$.`,
  });
}

function diagonalisableTFN(rng: Rng): Draft {
  const p = rng.pick([-1, 1, 2, 3]);
  const q = rng.pick([-2, 0, 4, 5].filter((x) => x !== p));
  const a = rng.chance(0.5) ? 0 : rng.nz(-3, 3);
  const A = mat([[p, a, rng.int(-3, 3)], [0, p, rng.int(-3, 3)], [0, 0, q]]);
  const r = rank(matSub(A, p));
  const geo = 3 - r;
  return tfn({
    subtopic: "Diagonalization",
    prompt: `The matrix $A = ${matTex(A, false)}$ is diagonalisable.`,
    answer: geo === 2 ? 0 : 1,
    solution: `Eigenvalues (diagonal of a triangular matrix): $${p}$ (algebraic multiplicity 2) and $${q}$. $\\operatorname{rank}(A - ${p}I) = ${r}$, so $\\dim\\operatorname{Nul}(A-${p}I) = ${geo}$. ${geo === 2 ? "Geometric multiplicity equals algebraic multiplicity for every eigenvalue, so there are 3 independent eigenvectors: diagonalisable." : "Only 1 independent eigenvector for the repeated eigenvalue, so there are fewer than 3 independent eigenvectors: not diagonalisable."}`,
  });
}

function changeOfBasis(rng: Rng): Draft {
  const n = rng.pick([2, 2, 3]) as 2 | 3;
  const P = unimodular(rng, n);
  const bs = transpose(P);
  const toB = rng.chance(0.5);
  const inv = inverse(P)!;
  const given = randVec(rng, n, -3, 3);
  const answer = toB ? matvec(inv, given) : matvec(P, given);
  const basis = `\\mathcal{B} = \\{${bs.map((b) => rowTexPlain(b)).join(",\\ ")}\\}`;
  return mcq(rng, {
    subtopic: "Change of basis",
    prompt: toB
      ? `Let $${basis}$. Find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = ${rowTexPlain(given)}$.`
      : `Let $${basis}$. If $[\\mathbf{x}]_{\\mathcal{B}} = ${rowTexPlain(given)}$, find $\\mathbf{x}$ (in standard coordinates).`,
    correct: rowTexPlain(answer),
    distractors: [
      rowTexPlain(toB ? matvec(P, given) : matvec(inv, given)),
      rowTexPlain(matvec(transpose(P), given)),
      rowTexPlain([...answer].reverse()),
      rowTexPlain(vscale(answer, -1)),
      rowTexPlain(answer.map((x, i) => (i === 0 ? x.add(1) : x))),
    ],
    solution: `$P_{\\mathcal{B}} = ${matTex(P, false)}$ (basis vectors as columns) satisfies $\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$.\n${toB ? `So $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x} = ${matTex(inv, false)}${rowTexPlain(given)} = ${rowTexPlain(answer)}$.` : `So $\\mathbf{x} = ${matTex(P, false)}${rowTexPlain(given)} = ${rowTexPlain(answer)}$.`}`,
  });
}

function akxFinite(rng: Rng): Draft {
  const [l1, l2] = rng.shuffle([-2, -1, 2, 3, 1]).slice(0, 2);
  const P = unimodular(rng, 2);
  const A = fromEigen(P, [l1, l2]);
  const [v1, v2] = transpose(P);
  const c1 = rng.nz(-2, 2);
  const c2 = rng.nz(-2, 2);
  const k = rng.pick([3, 4]);
  const x = vec([0, 1].map((i) => c1 * v1[i].valueOf() + c2 * v2[i].valueOf()));
  const ans = vec([0, 1].map((i) => c1 * l1 ** k * v1[i].valueOf() + c2 * l2 ** k * v2[i].valueOf()));
  const wrong1 = vec([0, 1].map((i) => c1 * l1 * k * v1[i].valueOf() + c2 * l2 * k * v2[i].valueOf()));
  const wrong2 = vec([0, 1].map((i) => c1 * l1 ** k * v1[i].valueOf() + c2 * v2[i].valueOf()));
  const wrong3 = vec([0, 1].map((i) => c1 * l2 ** k * v1[i].valueOf() + c2 * l1 ** k * v2[i].valueOf()));
  return mcq(rng, {
    subtopic: "Powers of A",
    prompt: `$A = ${matTex(A, false)}$ has eigenvectors $\\mathbf{v}_1 = ${rowTexPlain(v1)}$ and $\\mathbf{v}_2 = ${rowTexPlain(v2)}$. Compute $A^{${k}}\\mathbf{x}$ for $\\mathbf{x} = ${rowTexPlain(x)}$.`,
    correct: rowTexPlain(ans),
    distractors: [wrong1, wrong2, wrong3, matvec(A, x), vscale(ans, -1)].map(rowTexPlain),
    solution: `$A\\mathbf{v}_1 = ${l1}\\mathbf{v}_1$ and $A\\mathbf{v}_2 = ${l2}\\mathbf{v}_2$, and $\\mathbf{x} = ${c1}\\mathbf{v}_1 + (${c2})\\mathbf{v}_2$.\nSo $A^{${k}}\\mathbf{x} = ${c1}(${l1})^{${k}}\\mathbf{v}_1 + (${c2})(${l2})^{${k}}\\mathbf{v}_2 = ${rowTexPlain(ans)}$ — no matrix powers needed.`,
  });
}

export const eigenGens = [
  eigenvalues2, charPoly, falseStatement, eigenvector, powers, limitAkx, limitAkx, complexEig, eigOfFunction,
  traceDet, diagonalisableTFN, changeOfBasis, akxFinite,
];
