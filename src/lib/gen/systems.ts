// Generators for linear systems (Tutorial 1, past papers): row reduction, consistency with parameters, span, independence.
import { det, F, Frac, inverse, isZeroVec, mat, matTex, matvec, rank, rowTexPlain, transpose, vec, type Mat, type Vec } from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

const maxAbsM = (A: Mat) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));

/** Reduced row echelon form and pivot columns. */
function rref(A: Mat): { R: Mat; piv: number[] } {
  const M = A.map((r) => [...r]);
  const piv: number[] = [];
  let row = 0;
  for (let c = 0; c < M[0].length && row < M.length; c++) {
    const p = M.findIndex((r, i) => i >= row && !r[c].isZero());
    if (p < 0) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const pv = M[row][c];
    M[row] = M[row].map((x) => x.div(pv));
    for (let i = 0; i < M.length; i++) {
      if (i === row || M[i][c].isZero()) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x.sub(f.mul(M[row][j])));
    }
    piv.push(c);
    row++;
  }
  return { R: M, piv };
}

/** Hide a matrix behind random integer row replacements / swaps (same row space, same solutions). */
function scramble(rng: Rng, R: Mat, bound = 9): Mat {
  const m = R.length;
  for (let t = 0; t < 80; t++) {
    let M = R.map((r) => [...r]);
    for (let k = 0; k < m + 2; k++) {
      const i = rng.int(0, m - 1);
      let j = rng.int(0, m - 1);
      if (i === j) j = (i + 1) % m;
      const c = rng.nz(-2, 2);
      M[i] = M[i].map((x, q) => x.add(M[j][q].mul(c)));
    }
    if (rng.chance(0.5)) {
      const i = rng.int(0, m - 1);
      const j = (i + 1) % m;
      M = M.map((r, q) => (q === i ? M[j] : q === j ? M[i] : r));
    }
    if (maxAbsM(M) <= bound && M.every((r) => !isZeroVec(r)) && M[0].some((x) => !x.isZero())) return M;
  }
  retry();
}

/** Random RREF (m rows, n columns) with the given pivot columns; entries right of pivots in [-3, 3]. */
function randomRref(rng: Rng, m: number, n: number, piv: number[]): Mat {
  const R = Array.from({ length: m }, () => Array.from({ length: n }, () => F(0)));
  piv.forEach((c, i) => {
    R[i][c] = F(1);
    for (let j = c + 1; j < n; j++) if (!piv.includes(j)) R[i][j] = F(rng.int(-3, 3));
  });
  return R;
}

function choose(rng: Rng, n: number, k: number): number[] {
  return rng.shuffle([...Array(n).keys()]).slice(0, k).sort((a, b) => a - b);
}

function augTex(M: Mat, nCoef: number): string {
  const cols = "c".repeat(nCoef) + "|" + "c".repeat(M[0].length - nCoef);
  const body = M.map((r) => r.map((x) => x.tex()).join(" & ")).join(" \\\\ ");
  return `\\left[\\begin{array}{${cols}} ${body} \\end{array}\\right]`;
}

/** "2x - y + 3z" from coefficients (a string coefficient is inserted as-is, e.g. "k" or "(a^2-5)"). */
function termsTex(coefs: (Frac | string)[], vars: string[]): string {
  let s = "";
  coefs.forEach((c, i) => {
    if (typeof c === "string") {
      s += (s ? " + " : "") + c + vars[i];
      return;
    }
    if (c.isZero()) return;
    const a = c.abs();
    const body = (a.eq(1) ? "" : a.tex()) + vars[i];
    s += s ? (c.n < 0 ? " - " : " + ") + body : (c.n < 0 ? "-" : "") + body;
  });
  return s || "0";
}

function systemTex(rows: (Frac | string)[][], rhs: (Frac | string)[], vars: string[]): string {
  const lines = rows.map((r, i) => `${termsTex(r, vars)} &= ${typeof rhs[i] === "string" ? rhs[i] : (rhs[i] as Frac).tex()}`);
  return `$$\\begin{aligned} ${lines.join(" \\\\ ")} \\end{aligned}$$`;
}

/** "a + 3", "a - 2", "a". */
function plusConst(v: string, c: number): string {
  return c === 0 ? v : c > 0 ? `${v} + ${c}` : `${v} - ${-c}`;
}

const XYZ = ["x", "y", "z"];
const setTex = (xs: number[]) => (xs.length === 1 ? `${xs[0]}` : `\\{${xs.join(",\\ ")}\\}`);

// ---------- polynomials (for determinants with a parameter) ----------
type Poly = Frac[];
const pTrim = (p: Poly): Poly => {
  const q = [...p];
  while (q.length > 1 && q[q.length - 1].isZero()) q.pop();
  return q;
};
const pAdd = (a: Poly, b: Poly): Poly => pTrim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] ?? F(0)).add(b[i] ?? F(0))));
const pNeg = (a: Poly): Poly => a.map((x) => x.neg());
const pMul = (a: Poly, b: Poly): Poly => {
  const out = Array.from({ length: a.length + b.length - 1 }, () => F(0));
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] = out[i + j].add(x.mul(y)))));
  return pTrim(out);
};
const pEval = (p: Poly, x: number) => p.reduce((s, c, i) => s.add(c.mul(F(x).pow(i))), F(0));
function pDet3(M: Poly[][]): Poly {
  const t = (a: Poly, b: Poly, c: Poly) => pMul(pMul(a, b), c);
  let s: Poly = [F(0)];
  s = pAdd(s, t(M[0][0], M[1][1], M[2][2]));
  s = pAdd(s, t(M[0][1], M[1][2], M[2][0]));
  s = pAdd(s, t(M[0][2], M[1][0], M[2][1]));
  s = pAdd(s, pNeg(t(M[0][2], M[1][1], M[2][0])));
  s = pAdd(s, pNeg(t(M[0][0], M[1][2], M[2][1])));
  s = pAdd(s, pNeg(t(M[0][1], M[1][0], M[2][2])));
  return s;
}
/** Distinct integer roots, or null unless the polynomial splits completely over the integers in [-9, 9]. */
function intRoots(p: Poly): number[] | null {
  let q = pTrim(p);
  const deg = q.length - 1;
  if (deg < 1) return null;
  const roots: number[] = [];
  let found = 0;
  for (let r = -9; r <= 9 && q.length > 1; r++) {
    while (q.length > 1 && pEval(q, r).isZero()) {
      // synthetic division by (x - r)
      const n = q.length - 1;
      const out: Frac[] = Array(n).fill(F(0));
      out[n - 1] = q[n];
      for (let i = n - 1; i > 0; i--) out[i - 1] = q[i].add(out[i].mul(r));
      q = out;
      found++;
      if (!roots.includes(r)) roots.push(r);
    }
  }
  return found === deg ? roots.sort((a, b) => a - b) : null;
}
function polyTex(p: Poly, v: string): string {
  const terms: string[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const c = p[i];
    if (c.isZero()) continue;
    const a = c.abs();
    const pw = i === 0 ? "" : i === 1 ? v : `${v}^${i}`;
    const body = i === 0 ? a.tex() : (a.eq(1) ? "" : a.tex()) + pw;
    terms.push(terms.length ? (c.n < 0 ? `- ${body}` : `+ ${body}`) : (c.n < 0 ? `-${body}` : body));
  }
  return terms.join(" ") || "0";
}

// ---------------------------------------------------------------- generators

/** Classify the solution set of a disguised augmented matrix. */
function solutionType(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const kinds = n === 3 ? ["none", "unique", "inf1", "inf2"] : ["none", "inf1", "inf2"];
  const kind = rng.pick(kinds);
  const r = kind === "unique" ? 3 : kind === "inf1" ? n - 1 : kind === "inf2" ? n - 2 : rng.pick([2, 2, 1]);
  const piv = [0, ...choose(rng, n - 1, r - 1).map((x) => x + 1)];
  const R = randomRref(rng, 3, n, piv);
  const aug = R.map((row, i) => [...row, F(i < r ? rng.int(-4, 4) : 0)]);
  if (kind === "none") aug[r][n] = F(rng.nz(-3, 3));
  const M = scramble(rng, aug);
  const { R: RR, piv: pv } = rref(M);
  const inconsistent = pv.includes(n);
  const free = n - pv.filter((c) => c < n).length;
  const truth = inconsistent ? "none" : free === 0 ? "unique" : free === 1 ? "inf1" : "inf2";
  if (truth !== kind) retry();
  const TXT: Record<string, string> = {
    none: "No solution",
    unique: "Exactly one solution",
    inf1: "Infinitely many solutions, with one free variable",
    inf2: "Infinitely many solutions, with two free variables",
    inf3: "Infinitely many solutions, with three free variables",
  };
  const why = inconsistent
    ? "The last nonzero row is $[0\\ \\cdots\\ 0 \\mid c]$ with $c \\ne 0$, i.e. the equation $0 = c$: the system is **inconsistent**."
    : free === 0
      ? `Every one of the ${n} variable columns has a pivot and there is no row $[0\\ \\cdots\\ 0\\mid c]$, $c\\ne0$, so the solution is **unique**.`
      : `The system is consistent (no row $[0\\ \\cdots\\ 0\\mid c]$ with $c \\ne 0$). Pivot columns: ${pv.filter((c) => c < n).map((c) => c + 1).join(", ")}, so there ${free === 1 ? "is $1$ free variable" : `are $${free}$ free variables`} and infinitely many solutions.`;
  return mcq(rng, {
    subtopic: "Existence & uniqueness",
    prompt: `The augmented matrix of a linear system in ${n} unknowns is\n$$${augTex(M, n)}$$\nWhich statement describes its solution set?`,
    correct: TXT[kind],
    distractors: Object.keys(TXT).filter((k) => k !== kind && !(n === 4 && k === "unique")).map((k) => TXT[k]),
    math: false,
    solution: `Row reduce to RREF:\n$$${augTex(RR, n)}$$\n${why}\nTrap: counting zero rows instead of looking for a pivot in the augmented column, or forgetting that free variables only matter **after** consistency is checked.`,
  });
}

/** 3x3 system whose last echelon row is [0 0 (a^2 - m^2) | a - sigma*m]. */
function paramSystem(rng: Rng): Draft {
  const P = rng.pick(["a", "k", "\\lambda"]);
  const m = rng.int(1, 4);
  const sigma = rng.pick([1, -1]);
  const p = rng.int(-3, 3), q = rng.int(-3, 3), b1 = rng.int(-4, 4);
  const u = rng.int(-3, 3), b2 = rng.int(-4, 4);
  const r = rng.nz(-3, 3), al = rng.nz(-2, 2), be = rng.nz(-2, 2);
  const R1 = [1, p, q], R2 = [r, r * p + 1, r * q + u];
  const C = al * q + be * u - m * m;
  const D = al * b1 + be * b2 - sigma * m;
  const R3x = al, R3y = al * p + be;
  const rhs2 = r * b1 + b2;
  if ([...R1, ...R2, R3x, R3y, rhs2].some((x) => Math.abs(x) > 9) || Math.abs(C) > 20 || Math.abs(D) > 12) retry();
  const zc = `(${plusConst(`${P}^2`, C)})`;
  const sys = systemTex(
    [vec(R1), vec(R2), [F(R3x), F(R3y), zc]],
    [F(b1), F(rhs2), plusConst(P, D)],
    XYZ,
  );
  const infV = sigma * m, noneV = -sigma * m;
  const ask = rng.pick(["none", "inf", "unique"]);
  const eqv = (v: number) => `${P} = ${v}`;
  const correct = ask === "none" ? eqv(noneV) : ask === "inf" ? eqv(infV) : `${P} \\ne \\pm ${m}`;
  const pool = [eqv(noneV), eqv(infV), `${P} = \\pm ${m}`, `${P} \\ne \\pm ${m}`, `${P} \\ne ${infV}`, `${P} = ${m * m}`, `${P} = 0`];
  const askTxt = ask === "none" ? "have **no solution**" : ask === "inf" ? "have **infinitely many solutions**" : "have **exactly one solution**";
  const fac = `(${P} - ${m})(${P} + ${m})`;
  return mcq(rng, {
    subtopic: "Systems with a parameter",
    prompt: `Consider the system\n${sys}\nFor which value(s) of $${P}$ does the system ${askTxt}?`,
    correct,
    distractors: pool.filter((s) => s !== correct),
    solution:
      `Eliminate: $r_2 \\leftarrow r_2 - (${r})r_1$ gives $[0\\ 1\\ ${u} \\mid ${b2}]$. Then $r_3 \\leftarrow r_3 - (${al})r_1 - (${be})r_2$ (using the new $r_2$) gives the last row\n$$[\\,0\\ \\ 0\\ \\ ${P}^2 - ${m * m} \\mid ${plusConst(P, -sigma * m)}\\,] = [\\,0\\ \\ 0\\ \\ ${fac} \\mid ${plusConst(P, -sigma * m)}\\,].$$\n` +
      `- $${P} \\ne \\pm ${m}$: pivot in every column → exactly one solution.\n- $${P} = ${infV}$: the row becomes $[0\\ 0\\ 0 \\mid 0]$ → a free variable → infinitely many solutions.\n- $${P} = ${noneV}$: the row becomes $[0\\ 0\\ 0 \\mid ${-2 * sigma * m}]$, i.e. $0 = ${-2 * sigma * m}$ → no solution.\nTrap: answering "$${P} = \\pm ${m}$" for no solution — only one of the two roots makes the right-hand side nonzero.`,
  });
}

/** k making a homogeneous 3x3 system have a nontrivial solution (det polynomial with integer roots). */
function nontrivialK(rng: Rng): Draft {
  const A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rng.int(-3, 3)));
  const npos = rng.pick([1, 2, 2]);
  const cells = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, npos);
  const M: Poly[][] = A.map((r, i) => r.map((x, j) => (cells.includes(3 * i + j) ? [F(0), F(1)] : [F(x)])));
  const pd = pDet3(M);
  const roots = intRoots(pd);
  if (!roots || roots.some((x) => Math.abs(x) > 6)) retry();
  const rows: (Frac | string)[][] = M.map((r) => r.map((e) => (e.length === 2 ? "k" : e[0])));
  const sys = systemTex(rows, [F(0), F(0), F(0)], XYZ);
  const correct = roots.length === 1 ? `k = ${roots[0]}` : `k \\in ${setTex(roots)}`;
  const neg = roots.map((x) => -x).sort((a, b) => a - b);
  const pool = [
    neg.length === 1 ? `k = ${neg[0]}` : `k \\in ${setTex(neg)}`,
    `k \\ne ${roots.join(",\\ ")}`,
    `k = ${roots[0] + 1}`,
    roots.length > 1 ? `k = ${roots[roots.length - 1]}` : `k \\in \\{${roots[0]},\\ ${-roots[0] || 1}\\}`,
    `k = 0`,
    "\\text{no value of } k",
  ];
  return mcq(rng, {
    subtopic: "Homogeneous systems",
    prompt: `For which value(s) of $k$ does the homogeneous system\n${sys}\nhave a **nontrivial** solution?`,
    correct,
    distractors: pool,
    solution: `A square homogeneous system has a nontrivial solution exactly when the coefficient matrix $A$ is not invertible (Theorem 2.4: fewer than 3 pivots, so a free variable), i.e. when $|A| = 0$ (Rule 8 of determinants). Here\n$$|A| = ${polyTex(pd, "k")}$$\n(row reduce to an echelon form $U$ and use $|A| = \\pm$ product of the pivots, as in Tutorial 3 Q2).\nSetting it to zero gives $${correct}$. For any other $k$ there is a pivot in every column and only $\\mathbf{x} = \\mathbf{0}$ works.`,
  });
}

/** h making b lie in Span{v1, v2}. */
function spanH(rng: Rng): Draft {
  const v1 = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  const v2 = vec([rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  const c1 = rng.nz(-3, 3), c2 = rng.nz(-2, 2);
  const b = v1.map((x, i) => x.mul(c1).add(v2[i].mul(c2)));
  const pos = rng.int(0, 2);
  const others = [0, 1, 2].filter((i) => i !== pos);
  const minor = v1[others[0]].mul(v2[others[1]]).sub(v1[others[1]].mul(v2[others[0]]));
  if (minor.isZero() || b.some((x) => Math.abs(x.valueOf()) > 12)) retry();
  const h = b[pos];
  const bTex = `[${b.map((x, i) => (i === pos ? "h" : x.tex())).join(",\\ ")}]^T`;
  const asSystem = rng.chance(0.4);
  const prompt = asSystem
    ? `Let $A = ${matTex(transpose([v1, v2]))}$ and $\\mathbf{b} = ${bTex}$. For which value of $h$ is $A\\mathbf{x} = \\mathbf{b}$ consistent?`
    : `Let $\\mathbf{v}_1 = ${rowTexPlain(v1)}$, $\\mathbf{v}_2 = ${rowTexPlain(v2)}$ and $\\mathbf{b} = ${bTex}$. For which value of $h$ is $\\mathbf{b}$ in $\\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$?`;
  const hv = h.valueOf();
  return mcq(rng, {
    subtopic: "Span",
    prompt,
    correct: `h = ${h.tex()}`,
    distractors: [-hv, hv + 1, hv - 1, 2 * hv, hv + c1, c1 + c2].map((x) => `h = ${x}`),
    solution: `$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$ iff $x_1\\mathbf{v}_1 + x_2\\mathbf{v}_2 = \\mathbf{b}$ is consistent. The two equations without $h$ (rows ${others[0] + 1} and ${others[1] + 1}) have a pivot in each column, so they force $x_1 = ${c1}$, $x_2 = ${c2}$. Row ${pos + 1} then demands\n$$h = (${c1})(${v1[pos].tex()}) + (${c2})(${v2[pos].tex()}) = ${h.tex()}.$$\nIn the echelon form of $[\\mathbf{v}_1\\ \\mathbf{v}_2 \\mid \\mathbf{b}]$ the last row is $[0\\ 0 \\mid c\\,(${plusConst("h", -h.valueOf())})]$ with $c \\ne 0$, so any other $h$ gives $0 = $ nonzero.`,
  });
}

/** p making Ax = (b1, b2, p) consistent when row 3 = alpha*row1 + beta*row2. */
function consistencyP(rng: Rng): Draft {
  const r1 = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
  const r2 = [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)];
  if (rank(mat([r1, r2])) < 2) retry();
  const al = rng.nz(-2, 2), be = rng.nz(-2, 2);
  const r3 = r1.map((x, i) => al * x + be * r2[i]);
  if (r3.some((x) => Math.abs(x) > 9) || r3.every((x) => x === 0)) retry();
  const b1 = rng.nz(-5, 5), b2 = rng.nz(-5, 5);
  const p = al * b1 + be * b2;
  const order = rng.shuffle([0, 1, 2]);
  const rows = [r1, r2, r3];
  const bs = [String(b1), String(b2), "p"];
  const A = order.map((i) => rows[i]);
  const bTex = `[${order.map((i) => bs[i]).join(",\\ ")}]^T`;
  const pRow = order.indexOf(2) + 1, i1 = order.indexOf(0) + 1, i2 = order.indexOf(1) + 1;
  return mcq(rng, {
    subtopic: "Consistency",
    prompt: `Let $A = ${matTex(mat(A))}$ and $\\mathbf{b} = ${bTex}$. For which value of $p$ is the equation $A\\mathbf{x} = \\mathbf{b}$ consistent?`,
    correct: `p = ${p}`,
    distractors: [al * b1 - be * b2, -p, be * b1 + al * b2, p + 1, -al * b1 + be * b2, al + be].map((x) => `p = ${x}`),
    solution: `Row reduction of $A$ leaves a zero row, because row ${pRow} $= (${al})\\cdot$row ${i1} $+ (${be})\\cdot$row ${i2}. Doing the same operations on the augmented column, the zero row of $A$ becomes\n$$[\\,0\\ \\ 0\\ \\ 0 \\mid p - ((${al})(${b1}) + (${be})(${b2}))\\,] = [\\,0\\ \\ 0\\ \\ 0 \\mid p - (${p})\\,].$$\nThe system is consistent iff this entry is $0$, i.e. $p = ${p}$. (For every other $p$, $\\mathbf{b}$ is not a linear combination of the columns of $A$.)`,
  });
}

/** Find unknown coefficients so that a given point solves the system. */
function findCoeffs(rng: Rng): Draft {
  const s = [rng.nz(-3, 3), rng.nz(-3, 3), rng.nz(-3, 3)];
  const names = ["a", "b", "c"];
  const rows: (Frac | string)[][] = [];
  const rhs: Frac[] = [];
  const vals: number[] = [];
  const wrong: Frac[] = [];
  const pos = [rng.int(0, 2), rng.int(0, 2), rng.int(0, 2)];
  for (let i = 0; i < 3; i++) {
    const row = [rng.nz(-4, 4), rng.nz(-4, 4), rng.nz(-4, 4)];
    const v = rng.nz(-4, 4);
    row[pos[i]] = v;
    const rh = row.reduce((t, x, j) => t + x * s[j], 0);
    const rest = rh - v * s[pos[i]];
    rows.push(row.map((x, j) => (j === pos[i] ? names[i] : F(x))));
    rhs.push(F(rh));
    vals.push(v);
    wrong.push(F(rh + rest, s[pos[i]]));
  }
  const tup = (xs: (Frac | number)[]) => `(a, b, c) = (${xs.map((x) => Frac.of(x).tex()).join(",\\ ")})`;
  return mcq(rng, {
    subtopic: "Coefficients from a solution",
    prompt: `The system\n${systemTex(rows, rhs, XYZ)}\nhas the solution $x = ${s[0]},\\ y = ${s[1]},\\ z = ${s[2]}$. Find the constants $a$, $b$, $c$.`,
    correct: tup(vals),
    distractors: [
      tup(wrong),
      tup([-vals[0], vals[1], vals[2]]),
      tup([vals[0], -vals[1], vals[2]]),
      tup([vals[0], vals[1], -vals[2]]),
      tup([vals[1], vals[0], vals[2]]),
    ],
    solution: `Substitute $(${s.join(", ")})$ into each equation; each one then has a single unknown:\n${rows
      .map((_, i) => `- equation ${i + 1}: $${names[i]}\\cdot(${s[pos[i]]}) + (${rhs[i].sub(vals[i] * s[pos[i]]).tex()}) = ${rhs[i].tex()}$ ⇒ $${names[i]} = ${vals[i]}$`)
      .join("\n")}\nTrap: moving the known terms to the right without changing their sign.`,
  });
}

/** General solution in parametric vector form from an (unreduced) echelon form. */
function parametricForm(rng: Rng): Draft {
  const n = 4;
  const r = rng.pick([2, 2, 3]);
  const piv = [0, ...choose(rng, n - 1, r - 1).map((x) => x + 1)];
  const R = randomRref(rng, 3, n, piv);
  const d = R.map((_, i) => F(i < r ? rng.int(-4, 4) : 0));
  const free = [...Array(n).keys()].filter((c) => !piv.includes(c));
  // echelon (not reduced): add multiples of lower rows to upper rows, then scale
  const E = R.map((row, i) => [...row, d[i]]);
  for (let i = 0; i < r; i++)
    for (let j = i + 1; j < r; j++) {
      const c = rng.int(-2, 2);
      E[i] = E[i].map((x, k) => x.add(E[j][k].mul(c)));
    }
  for (let i = 0; i < r; i++) if (rng.chance(0.3)) E[i] = E[i].map((x) => x.mul(rng.pick([2, -1])));
  if (maxAbsM(E) > 12) retry();
  const p = Array.from({ length: n }, () => F(0));
  piv.forEach((c, i) => (p[c] = d[i]));
  const dir = (f: number, flip: boolean) => {
    const v = Array.from({ length: n }, () => F(0));
    v[f] = F(1);
    piv.forEach((c, i) => (v[c] = flip ? R[i][f] : R[i][f].neg()));
    return v;
  };
  const params = free.length === 1 ? ["t"] : ["s", "t"];
  const form = (pp: Vec, dirs: Vec[]) => `\\mathbf{x} = ${rowTexPlain(pp)} ${dirs.map((v, i) => `+ ${params[i]}${rowTexPlain(v)}`).join(" ")}`;
  const good = free.map((f) => dir(f, false));
  const A = R.map((row) => row);
  const valid = (pp: Vec, dirs: Vec[]) =>
    matvec(A, pp).every((x, i) => x.eq(d[i])) && dirs.every((v) => isZeroVec(matvec(A, v))) && rank(dirs) === free.length;
  const cands: [Vec, Vec[]][] = [
    [p, free.map((f) => dir(f, true))],
    [p.map((x) => x.neg()), good],
    [p.map((x, i) => (free.includes(i) ? F(1) : x)), good],
    [p.map((x, c) => (piv.includes(c) ? E[piv.indexOf(c)][n] : x)), good],
    [p, good.map((v) => v.map((x, i) => (free.includes(i) ? x : x.mul(2))))],
    [p, good.map((v) => v.map((x, i) => (free.includes(i) ? x : x.add(1))))],
  ];
  const ds = cands.filter(([pp, dirs]) => !valid(pp, dirs)).map(([pp, dirs]) => form(pp, dirs));
  const RR = R.map((row, i) => [...row, d[i]]);
  return mcq(rng, {
    subtopic: "Parametric vector form",
    prompt: `The augmented matrix of a system $A\\mathbf{x} = \\mathbf{b}$ in $x_1,\\dots,x_4$ has been reduced to the echelon form\n$$${augTex(E, n)}$$\nWhich is the general solution? ($${params.join(", ")} \\in \\mathbb{R}$)`,
    correct: form(p, good),
    distractors: ds,
    solution: `Finish the reduction (clear above the pivots, scale pivots to 1):\n$$${augTex(RR, n)}$$\nPivot columns ${piv.map((c) => c + 1).join(", ")}; free variable${free.length > 1 ? "s" : ""} ${free.map((f) => `$x_${f + 1}$`).join(", ")}. Solve each pivot row for its basic variable (coefficients of the free variables change sign when moved across) and set ${free.map((f, i) => `$x_${f + 1} = ${params[i]}$`).join(", ")}:\n$$${form(p, good)}$$\nTrap: copying the free-variable entries of the RREF without changing their sign.`,
  });
}

/** Values of x making three vectors with a parameter linearly dependent / independent. */
function independenceParam(rng: Rng): Draft {
  const kinds: Poly[] = [[F(0), F(1)], [F(0), F(0), F(1)], [F(0), F(-1)]];
  const ktex = ["x", "x^2", "-x"];
  const nx = rng.pick([2, 3, 3]);
  const cells = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, nx);
  const kind = cells.map(() => rng.pick([0, 0, 0, 1, 2]));
  const base = Array.from({ length: 9 }, () => rng.int(-2, 2));
  const M: Poly[][] = [0, 1, 2].map((i) => [0, 1, 2].map((j) => {
    const c = cells.indexOf(3 * i + j);
    return c >= 0 ? kinds[kind[c]] : [F(base[3 * i + j])];
  }));
  const T: string[][] = [0, 1, 2].map((i) => [0, 1, 2].map((j) => {
    const c = cells.indexOf(3 * i + j);
    return c >= 0 ? ktex[kind[c]] : String(base[3 * i + j]);
  }));
  const pd = pDet3(M);
  const roots = intRoots(pd);
  if (!roots || roots.some((x) => Math.abs(x) > 5) || roots.length > 3) retry();
  // vectors are the columns
  const vt = (j: number) => `\\begin{bmatrix} ${T.map((r) => r[j]).join(" \\\\ ")} \\end{bmatrix}`;
  const askDep = rng.chance(0.6);
  const S = (xs: number[]) => (xs.length === 1 ? `x = ${xs[0]}` : `x \\in ${setTex(xs)}`);
  const NotS = (xs: number[]) => `x \\notin ${xs.length === 1 ? `\\{${xs[0]}\\}` : setTex(xs)}`;
  const neg = roots.map((x) => -x).sort((a, b) => a - b);
  const plus = [...new Set([...roots, roots.includes(0) ? 1 : 0])].sort((a, b) => a - b);
  const sub = roots.length > 1 ? roots.slice(1) : [roots[0] + 1];
  const correct = askDep ? S(roots) : NotS(roots);
  const pool = askDep ? [S(neg), S(plus), S(sub), NotS(roots), "\\text{no value of } x"] : [NotS(neg), NotS(plus), NotS(sub), S(roots), "\\text{every real } x"];
  return mcq(rng, {
    subtopic: "Linear independence",
    prompt: `For which real $x$ is the set $\\left\\{ ${vt(0)}, ${vt(1)}, ${vt(2)} \\right\\}$ linearly ${askDep ? "**dependent**" : "**independent**"}?`,
    correct,
    distractors: pool.filter((s) => s !== correct),
    solution: `Three vectors in $\\mathbb{R}^3$ are independent iff the matrix $A$ with them as columns has a pivot in every column, i.e. (Theorem 2.4 with Rule 8 of determinants) iff $|A| \\ne 0$. Row reducing to an echelon form $U$ and taking $\\pm$ the product of the pivots gives\n$$|A| = ${polyTex(pd, "x")}.$$\nIts real roots are $${roots.join(",\\ ")}$, so the set is dependent exactly for $${S(roots)}$ and independent for $${NotS(roots)}$.\nTrap: dividing by an expression in $x$ during row reduction without checking when it is zero.`,
  });
}

/** Recover the RREF of A from the complete solution of Ax = b. */
function rrefFromSolution(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const r = n === 3 ? rng.pick([1, 2]) : rng.pick([2, 3]);
  const piv = choose(rng, n, r);
  if (piv[0] !== 0 && rng.chance(0.7)) retry();
  const R = randomRref(rng, 3, n, piv);
  const free = [...Array(n).keys()].filter((c) => !piv.includes(c));
  if (free.every((f) => piv.every((_, i) => R[i][f].isZero()))) retry();
  const p = Array.from({ length: n }, () => F(0));
  piv.forEach((c) => (p[c] = F(rng.int(-4, 5))));
  const dirs = free.map((f) => {
    const v = Array.from({ length: n }, () => F(0));
    v[f] = F(1);
    piv.forEach((c, i) => (v[c] = R[i][f].neg()));
    return v;
  });
  const ps = ["c", "d"];
  const sol = `\\mathbf{x} = ${rowTexPlain(p)} ${dirs.map((v, i) => `+ ${ps[i]}${rowTexPlain(v)}`).join(" ")}`;
  const flip = R.map((row) => row.map((x, j) => (free.includes(j) ? x.neg() : x)));
  const fromP = R.map((row, i) => row.map((x, j) => (free.includes(j) && i < r ? x.add(p[piv[i]]) : x)));
  const tr: Mat = Array.from({ length: 3 }, (_, i) => Array.from({ length: n }, (_, j) => (i < dirs.length ? dirs[i][j] : F(0))));
  const ident: Mat = Array.from({ length: 3 }, (_, i) => Array.from({ length: n }, (_, j) => F(i === j ? 1 : 0)));
  const shifted: Mat = R.map((row) => row.map((x) => x));
  if (r < 3) shifted[r] = shifted[r].map((_, j) => (j === free[0] ? F(1) : F(0)));
  const ds = [flip, fromP, tr, ident, shifted].filter((M) => !M.every((row, i) => row.every((x, j) => x.eq(R[i][j])))).map((M) => matTex(M, false));
  return mcq(rng, {
    subtopic: "RREF from a solution",
    prompt: `$A$ is a $3\\times${n}$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is\n$$${sol}, \\quad ${free.length > 1 ? "c, d" : "c"} \\in \\mathbb{R}.$$\nWhat is the reduced row echelon form of $A$?`,
    correct: matTex(R, false),
    distractors: ds,
    solution: `The free variables are the ones that appear alone as parameters: ${free.map((f) => `$x_${f + 1}$`).join(", ")}; the other ${r} variable${r > 1 ? "s are" : " is"} leading, so $A$ has ${r} pivot${r > 1 ? "s" : ""} and the RREF has ${r} nonzero row${r > 1 ? "s" : ""}. Each leading variable reads $x_{\\text{leading}} = p_i - (\\text{RREF entries})\\cdot(\\text{free variables})$, so the RREF entries in the free columns are the **negatives** of the entries in the direction vectors:\n$$${matTex(R, false)}$$\nCheck: every direction vector satisfies $R\\mathbf{v} = \\mathbf{0}$. Trap: forgetting the sign change.`,
  });
}

/** Do the columns of A span R^3 / is Ax = b always solvable / independent columns? */
function spanRm(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const r = rng.pick([2, 3]);
  const piv = [0, ...choose(rng, n - 1, r - 1).map((x) => x + 1)];
  const M = scramble(rng, randomRref(rng, 3, n, piv));
  const { R, piv: pv } = rref(M);
  if (pv.length !== r) retry();
  const st = rng.pick(["span", "every", "indep", "trivial"]);
  const claim =
    st === "span" ? "The columns of $A$ span $\\mathbb{R}^3$."
      : st === "every" ? "The equation $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^3$."
        : st === "indep" ? "The columns of $A$ are linearly independent."
          : "The equation $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.";
  const truth = st === "span" || st === "every" ? r === 3 : r === n;
  const rule = st === "span" || st === "every" ? "a pivot in **every row** (3 pivots)" : `a pivot in **every column** (${n} pivots)`;
  return tfn({
    subtopic: "Span & pivots",
    prompt: `Let $A = ${matTex(M)}$. ${claim}`,
    answer: truth ? 0 : 1,
    solution: `RREF: $${matTex(R)}$, with pivots in columns ${pv.map((c) => c + 1).join(", ")}, so $A$ has ${r} pivot positions. The statement needs ${rule}, so it is **${truth ? "True" : "False"}**.${n === 4 && (st === "indep" || st === "trivial") ? " (Four vectors in $\\mathbb{R}^3$ are always dependent.)" : ""}`,
  });
}

/** Independence of combinations of independent vectors (coefficient-matrix test). */
function combosIndep(rng: Rng): Draft {
  const k = rng.pick([2, 3, 3]);
  const names = ["\\mathbf{u}", "\\mathbf{v}", "\\mathbf{w}"].slice(0, k);
  let C: number[][];
  let rel: number[] = [];
  const singular = rng.chance(0.5);
  for (;;) {
    C = Array.from({ length: k }, () => Array.from({ length: k }, () => rng.int(-2, 2)));
    if (singular) {
      if (k === 2) {
        const m = rng.pick([-2, -1, 2]);
        C[1] = C[0].map((x) => x * m);
        rel = [m, -1];
      } else {
        const s1 = rng.pick([1, -1]), s2 = rng.pick([1, -1]);
        C[2] = C[0].map((x, j) => s1 * x + s2 * C[1][j]);
        rel = [s1, s2, -1];
      }
    }
    if (C.every((r) => r.some((x) => x !== 0)) && C.flat().every((x) => Math.abs(x) <= 3) && new Set(C.map(String)).size === k) break;
  }
  const dC = det(mat(C));
  if (singular !== dC.isZero()) retry();
  const knownIndep = rng.chance(0.75);
  const vecs = C.map((r) => termsTex(r.map((x) => F(x)), names));
  const space = rng.pick(["\\mathbb{R}^3", "\\mathbb{R}^4", "\\mathbb{R}^5"]);
  const answer: 0 | 1 | 2 = dC.isZero() ? 1 : knownIndep ? 0 : 2;
  const cs = ["c_1", "c_2", "c_3"].slice(0, k);
  const combo = `${cs.map((c, i) => `${c}(${vecs[i]})`).join(" + ")} = \\mathbf{0}`;
  // collecting the coefficient of names[j] gives sum_i C[i][j] c_i = 0
  const eqs = names.map((_, j) => `${termsTex(C.map((r) => F(r[j])), cs)} = 0`);
  const sysTex = `$$\\begin{aligned} ${eqs.map((e) => e.replace(" = 0", " &= 0")).join(" \\\\ ")} \\end{aligned}$$`;
  const relTex = termsTex(rel.map((x) => F(x)), vecs.map((v) => `(${v})`));
  const why = dC.isZero()
    ? `Look for weights with $${combo}$. Here $${relTex} = \\mathbf{0}$ (expand: every coefficient of ${names.map((x) => `$${x}$`).join(", ")} cancels). That is a combination with weights not all zero, whatever ${names.map((x) => `$${x}$`).join(", ")} are, so the set is **dependent**: **False**.`
    : knownIndep
      ? `Set $${combo}$ and collect the coefficient of each of ${names.map((x) => `$${x}$`).join(", ")}. Because ${names.map((x) => `$${x}$`).join(", ")} are independent, each coefficient must be $0$:\n${sysTex}\nThis square homogeneous system has ${k} pivots (its determinant is $${dC.tex()} \\ne 0$), so only $${cs.join(" = ")} = 0$: the set is independent, **True**.`
      : `If ${names.map((x) => `$${x}$`).join(", ")} were independent, setting $${combo}$ and collecting coefficients would give\n${sysTex}\nwhich has only the trivial solution (determinant $${dC.tex()} \\ne 0$), so the set would be independent. But nothing says ${names.map((x) => `$${x}$`).join(", ")} are independent: if they are all $\\mathbf{0}$, every vector in the set is $\\mathbf{0}$ and the set is dependent. **Not enough information**.`;
  return tfn({
    subtopic: "Independence of combinations",
    prompt: `Let ${names.map((x) => `$${x}$`).join(", ")} be ${knownIndep ? "linearly independent vectors" : "vectors"} in $${space}$. The set $\\{${vecs.join(",\\ ")}\\}$ is linearly independent.`,
    answer,
    solution: why,
  });
}

/** Which columns are pivot columns? */
function pivotColumns(rng: Rng): Draft {
  const n = rng.pick([4, 5, 5]);
  const r = rng.pick([2, 3, 3]);
  const piv = [0, ...choose(rng, n - 1, r - 1).map((x) => x + 1)];
  const M = scramble(rng, randomRref(rng, 3, n, piv));
  const { R, piv: pv } = rref(M);
  if (pv.join() !== piv.join()) retry();
  const others = new Set<string>();
  for (let t = 0; t < 40 && others.size < 6; t++) {
    const k = rng.pick([r, r, r - 1, r + 1].filter((x) => x >= 1 && x <= 3));
    const s = choose(rng, n, k);
    if (s.join() !== piv.join()) others.add(s.map((c) => c + 1).join(",\\ "));
  }
  return mcq(rng, {
    subtopic: "Pivots",
    prompt: `Let $A = ${matTex(M)}$. Which columns of $A$ are its pivot columns?`,
    correct: piv.map((c) => c + 1).join(",\\ "),
    distractors: [...others],
    solution: `Row reduce: $\\operatorname{rref}(A) = ${matTex(R)}$. The leading 1s sit in columns ${piv.map((c) => c + 1).join(", ")}, so those are the pivot columns of $A$ (pivot positions are read from an echelon form, but the pivot **columns** are columns of the original $A$). The remaining column${n - r > 1 ? "s correspond" : " corresponds"} to free variables.`,
  });
}

/** Weights x1, x2 (,x3) with x1 v1 + ... = b. */
function linComboWeights(rng: Rng): Draft {
  const k = rng.pick([2, 3]);
  const V = Array.from({ length: k }, () => [rng.int(-3, 3), rng.int(-3, 3), rng.int(-3, 3)]);
  const A = transpose(mat(V));
  if (rank(A) < k) retry();
  const c = Array.from({ length: k }, () => rng.nz(-3, 3));
  const b = matvec(A, vec(c));
  if (b.some((x) => Math.abs(x.valueOf()) > 15)) retry();
  const tup = (xs: (number | Frac)[]) => `(${xs.map((x) => Frac.of(x).tex()).join(",\\ ")})`;
  const ds = [tup([...c].reverse()), tup(c.map((x, i) => (i === 0 ? -x : x))), tup(c.map((x, i) => (i === k - 1 ? -x : x))), tup(c.map((x) => -x))];
  if (k === 3) {
    const inv = inverse(transpose(A));
    if (inv) ds.push(tup(matvec(inv, b)));
  } else ds.push(tup(c.map((x) => x + 1)));
  const names = ["\\mathbf{a}_1", "\\mathbf{a}_2", "\\mathbf{a}_3"].slice(0, k);
  return mcq(rng, {
    subtopic: "Vector equation",
    prompt: `Let ${V.map((v, i) => `$${names[i]} = ${rowTexPlain(vec(v))}$`).join(", ")} and $\\mathbf{b} = ${rowTexPlain(b)}$. Find the weights $(x_1, ${k === 3 ? "x_2, x_3" : "x_2"})$ with $${names.map((nm, i) => `x_${i + 1}${nm}`).join(" + ")} = \\mathbf{b}$.`,
    correct: tup(c),
    distractors: ds,
    solution: `The vector equation is the system with augmented matrix $[${names.join("\\ ")} \\mid \\mathbf{b}]$ (vectors as **columns**). Row reducing it gives the unique solution $${tup(c)}$. Check: $${c.map((x, i) => `(${x})${rowTexPlain(vec(V[i]))}`).join(" + ")} = ${rowTexPlain(b)}$.\nTrap: putting the vectors in as rows (that solves a different system).`,
  });
}

/** t making Ax = 0 have exactly three (or two) free variables, A is 3x5. */
function freeVarT(rng: Rng): Draft {
  const r1 = Array.from({ length: 5 }, () => rng.int(-3, 3));
  const r2 = Array.from({ length: 5 }, () => rng.int(-3, 3));
  if (rank(mat([r1, r2])) < 2) retry();
  const al = rng.nz(-2, 2), be = rng.nz(-2, 2);
  const r3 = r1.map((x, i) => al * x + be * r2[i]);
  const j = rng.int(1, 4);
  const ej = Array.from({ length: 5 }, (_, i) => (i === j ? 1 : 0));
  if (rank(mat([r1, r2, ej])) < 3 || r3.some((x) => Math.abs(x) > 9)) retry();
  const off = rng.pick([0, 0, rng.int(-3, 3)]);
  const t0 = r3[j] - off;
  const T = [r1, r2, r3].map((row, i) => row.map((x, c) => (i === 2 && c === j ? plusConst("t", off) : String(x))));
  const rows = rng.shuffle([0, 1, 2]);
  const A = `\\begin{bmatrix} ${rows.map((i) => T[i].join(" & ")).join(" \\\\ ")} \\end{bmatrix}`;
  const three = rng.chance(0.7);
  const correct = three ? `t = ${t0}` : `t \\ne ${t0}`;
  const pool = three
    ? [`t = ${-t0}`, `t = ${t0 + 1}`, `t = ${t0 - 1}`, `t \\ne ${t0}`, "\\text{no value of } t", `t = ${r3[j]}`]
    : [`t = ${t0}`, `t \\ne ${-t0}`, `t \\ne ${t0 + 1}`, "\\text{every real } t", "\\text{no value of } t"];
  return mcq(rng, {
    subtopic: "Free variables",
    prompt: `Let $A = ${A}$. For which value(s) of $t$ does $A\\mathbf{x} = \\mathbf{0}$ have exactly **${three ? "three" : "two"}** free variables?`,
    correct,
    distractors: pool.filter((s) => s !== correct),
    solution: `$A$ has 5 columns, so #free variables $= 5 - (\\#\\text{pivots})$; ${three ? "three" : "two"} free variables means ${three ? 2 : 3} pivots. The two rows without $t$, $\\mathbf{r}_1 = [${r1.join(",\\ ")}]$ and $\\mathbf{r}_2 = [${r2.join(",\\ ")}]$, reduce to 2 pivots. The row containing $t$ agrees with $(${al})\\mathbf{r}_1 + (${be})\\mathbf{r}_2 = [${r3.join(",\\ ")}]$ except in column ${j + 1}, so the replacement that subtracts this combination leaves $[0\\ \\cdots\\ (${plusConst("t", off - r3[j])})\\ \\cdots\\ 0]$, with its only possible nonzero entry in column ${j + 1}. Reducing $\\mathbf{r}_1, \\mathbf{r}_2$ together with $[0\\ \\cdots\\ 1\\ \\cdots\\ 0]$ (the $1$ in column ${j + 1}) gives 3 pivots, so this row adds a third pivot exactly when $t \\ne ${t0}$, and is a zero row when $t = ${t0}$.\nSo ${three ? `three free variables iff $t = ${t0}$` : `two free variables iff $t \\ne ${t0}$`}.`,
  });
}

/** True/False/NEI facts about m x n systems with a given number of pivots. */
function sizeFacts(rng: Rng): Draft {
  const m = rng.int(2, 7), n = rng.int(2, 7);
  const kind = rng.pick(["homog", "every", "unique", "wide", "wideCons", "trivialAll"]);
  if (kind === "homog") {
    const r = rng.int(1, Math.min(m, n));
    return tfn({
      subtopic: "Counting solutions",
      prompt: `A homogeneous system of ${m} equations in ${n} unknowns has a coefficient matrix with ${r} pivot position${r > 1 ? "s" : ""}. The system has a nontrivial solution.`,
      answer: r < n ? 0 : 1,
      solution: `A homogeneous system is always consistent. Free variables $= n - r = ${n} - ${r} = ${n - r}$. ${r < n ? "At least one free variable → infinitely many solutions, including nontrivial ones: **True**." : "No free variables → only the trivial solution: **False**."}`,
    });
  }
  if (kind === "every") {
    const r = rng.int(1, Math.min(m, n));
    return tfn({
      subtopic: "Counting solutions",
      prompt: `$A$ is a $${m}\\times${n}$ matrix with ${r} pivot position${r > 1 ? "s" : ""}. The equation $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^{${m}}$.`,
      answer: r === m ? 0 : 1,
      solution: `$A\\mathbf{x} = \\mathbf{b}$ is solvable for every $\\mathbf{b}$ iff $A$ has a pivot in every **row** ($${m}$ pivots). Here there are $${r}$, ${r === m ? "so **True**." : "so some echelon row of $A$ is zero and a suitable $\\mathbf{b}$ makes that row read $0 = 1$: **False**."}`,
    });
  }
  if (kind === "unique") {
    const r = rng.int(1, Math.min(m, n));
    return tfn({
      subtopic: "Counting solutions",
      prompt: `$A$ is a $${m}\\times${n}$ matrix with ${r} pivot position${r > 1 ? "s" : ""}, and $A\\mathbf{x} = \\mathbf{b}$ is consistent. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution.`,
      answer: r === n ? 0 : 1,
      solution: `A consistent system has a unique solution iff there are no free variables, i.e. a pivot in every **column** ($${n}$ pivots). With $${r}$ pivots there ${n - r === 0 ? "are none: **True**." : `${n - r === 1 ? "is $1$ free variable" : `are $${n - r}$ free variables`}, so infinitely many solutions: **False**.`}`,
    });
  }
  if (kind === "wide" || kind === "wideCons") {
    const mm = Math.min(m, n), nn = Math.max(m, n) + (m === n ? 1 : 0);
    const cons = kind === "wideCons";
    return tfn({
      subtopic: "Counting solutions",
      prompt: `$A$ is a $${mm}\\times${nn}$ matrix and $\\mathbf{b}\\in\\mathbb{R}^{${mm}}$. ${cons ? "If $A\\mathbf{x} = \\mathbf{b}$ is consistent, it has infinitely many solutions." : "The equation $A\\mathbf{x} = \\mathbf{b}$ has infinitely many solutions."}`,
      answer: cons ? 0 : 2,
      solution: `At most $${mm}$ pivots for $${nn}$ columns, so ${nn - mm > 1 ? "there are" : "there is"} always at least $${nn - mm}$ free variable${nn - mm > 1 ? "s" : ""}. ${cons ? "A consistent system with a free variable has infinitely many solutions: **True**." : "That gives infinitely many solutions **if** the system is consistent, but nothing guarantees consistency (a row $[0\\ \\cdots\\ 0\\mid c]$ may appear). **Not enough information**."}`,
    });
  }
  // trivialAll
  const mm = Math.max(m, n), nn = Math.min(m, n);
  return tfn({
    subtopic: "Counting solutions",
    prompt: `$A$ is a $${mm}\\times${nn}$ matrix and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^{${mm}}$.`,
    answer: mm === nn ? 0 : 1,
    solution:
      mm === nn
        ? `Only the trivial solution means a pivot in every column: $${nn}$ pivots. $A$ is square, so that is also a pivot in every row: every $\\mathbf{b}$ gives a consistent system with no free variables. **True**.`
        : `Only the trivial solution means $${nn}$ pivots (one per column), so solutions are unique **when they exist**. But $${nn} < ${mm}$ rows means some row has no pivot, so some $\\mathbf{b}$ make the system inconsistent. **False**.`,
  });
}

/** Attach the course-material reference to every draft a generator produces. */
const cite = (ref: string, g: (rng: Rng) => Draft) => (rng: Rng): Draft => ({ ...g(rng), ref });

export const systemsGens: ((rng: Rng) => Draft)[] = [
  cite("Tutorial 1 Q2, Q12; Additional practice problems (consistency, free variables)", solutionType),
  cite("Tutorial 1 Q2; PYP AY22/23 S1 Q1(a)", paramSystem),
  cite("Tutorial 1 Q1; Slides 2.2 Theorem 2.4 (alg p10); Slides 3.1 Rule 8 (det p8)", nontrivialK),
  cite("Tutorial 1 Q3; PYP AY22/23 S1 Q1(b)", spanH),
  cite("PYP (written papers): p for which Ax = [3, 9, p] is consistent", consistencyP),
  cite("PYP AY21/22 S1 Q1(a)", findCoeffs),
  cite("Additional practice problems (general solution); Tutorial 1 Q11", parametricForm),
  cite("PYP AY25/26 S1 Q9; Tutorial 1 Q8; Slides 2.2 Theorem 2.4 (alg p10); Slides 3.1 Rule 8 (det p8)", independenceParam),
  cite("Tutorial 1 Q11; PYP AY25/26 S1 Q8; PYP AY21/22 S1 Q1(c)", rrefFromSolution),
  cite("Tutorial 1 Q5; Slides 2.2 Theorem 1.2 (alg p11); Slides 4.7 (vsp p29)", spanRm),
  cite("PYP (written papers): are u+v, u-v, u-2v+w independent?; Slides 4.7 definition (vsp p29)", combosIndep),
  cite("Tutorial 1 Q5", pivotColumns),
  cite("Slides 0B Matrix products as linear combinations (mtx p12); Tutorial 1 Q3", linComboWeights),
  cite("PYP (written papers): find t so that Ax = 0 has 3 free variables", freeVarT),
  cite("Tutorial 1 Q7, Q12; Slides 2.2 Theorem 1.2 (alg p11)", sizeFacts),
];
