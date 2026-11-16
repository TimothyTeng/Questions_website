// Randomised determinant questions at final-exam difficulty. Exact Frac arithmetic throughout.
import { det, F, Frac, inverse, mat, matmul, matTex, transpose, type Mat } from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

const vm = (A: Mat) => `\\begin{vmatrix} ${A.map((r) => r.map((x) => x.tex()).join(" & ")).join(" \\\\ ")} \\end{vmatrix}`;
const bm = (A: Mat) => matTex(A, false);
const randMat = (rng: Rng, n: number, lo: number, hi: number): Mat =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => F(rng.int(lo, hi))));
const minor = (A: Mat, i: number, j: number): Mat => A.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));
const sgn = (i: number, j: number) => ((i + j) % 2 === 0 ? 1 : -1);
const cof = (A: Mat, i: number, j: number) => det(minor(A, i, j)).mul(sgn(i, j));
const prodDiag = (A: Mat) => A.reduce((p, r, i) => p.mul(r[i]), F(1));
const maxEntry = (A: Mat) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));
const sub = (i: number, j: number) => `${i + 1}${j + 1}`;
/** "+ 3" / "- 3" for joining terms; with `first` no leading plus. */
const coefTerm = (c: Frac, sym: string, first: boolean) => {
  if (c.isZero()) return "";
  const neg = c.n < 0;
  const a = c.abs();
  const body = a.eq(1) ? sym : `${a.tex()}${sym}`;
  return first ? `${neg ? "-" : ""}${body}` : ` ${neg ? "-" : "+"} ${body}`;
};
/** Linear combination like a_1 + 2a_3 - a_2 from coefficients. */
function comb(coefs: Frac[], sym: (i: number) => string): string {
  let s = "";
  coefs.forEach((c, i) => {
    if (c.isZero()) return;
    s += coefTerm(c, sym(i), s === "");
  });
  return s || "0";
}
function bestLine(A: Mat): { row: boolean; k: number } {
  let best = { row: true, k: 0 };
  let bz = -1;
  for (let k = 0; k < A.length; k++) {
    const zr = A[k].filter((x) => x.isZero()).length;
    if (zr > bz) [bz, best] = [zr, { row: true, k }];
    const zc = A.filter((r) => r[k].isZero()).length;
    if (zc > bz) [bz, best] = [zc, { row: false, k }];
  }
  return best;
}
/** Worked cofactor expansion of a 3x3 (or 2x2-minor) determinant along its sparsest line. */
function expansion(A: Mat, name = "|A|"): string {
  const line = bestLine(A);
  const parts: string[] = [];
  const nums: string[] = [];
  const minors: string[] = [];
  for (let t = 0; t < A.length; t++) {
    const i = line.row ? line.k : t;
    const j = line.row ? t : line.k;
    if (A[i][j].isZero()) continue;
    const M = minor(A, i, j);
    const m = det(M);
    parts.push(`a_{${sub(i, j)}}C_{${sub(i, j)}}`);
    nums.push(`(${A[i][j].tex()})(${m.mul(sgn(i, j)).tex()})`);
    minors.push(`$M_{${sub(i, j)}} = ${vm(M)} = ${m.tex()}$, so $C_{${sub(i, j)}} = (-1)^{${i + j + 2}}M_{${sub(i, j)}} = ${m.mul(sgn(i, j)).tex()}$.`);
  }
  if (!parts.length) return `${line.row ? "Row" : "Column"} ${line.k + 1} is all zeros, so $${name} = 0$.`;
  return [
    `Expand along ${line.row ? "row" : "column"} ${line.k + 1} (it has the most zeros), using $C_{ij} = (-1)^{i+j}M_{ij}$.`,
    ...minors.map((m) => `- ${m}`),
    `$${name} = ${parts.join(" + ")} = ${nums.join(" + ")} = ${det(A).tex()}$.`,
  ].join("\n");
}
const pw = (x: Frac, e: number) => (e === 1 ? x.tex() : `(${x.tex()})^{${e}}`);
const fracPow = (x: Frac, e: number) => (e >= 0 ? x.pow(e) : F(1).div(x.pow(-e)));

// ---------------------------------------------------------------- generators

/** 3x3 determinant by cofactor expansion along a line with zeros. */
function det3(rng: Rng): Draft {
  const A = randMat(rng, 3, -4, 5);
  const row = rng.chance(0.5);
  const k = rng.int(0, 2);
  for (const t of rng.shuffle([0, 1, 2]).slice(0, rng.pick([1, 2]))) {
    if (row) A[k][t] = F(0);
    else A[t][k] = F(0);
  }
  const d = det(A);
  if (d.isZero() || Math.abs(d.valueOf()) > 150) retry();
  const down = prodDiag(A).add(A[0][1].mul(A[1][2]).mul(A[2][0])).add(A[0][2].mul(A[1][0]).mul(A[2][1]));
  const up = A[0][2].mul(A[1][1]).mul(A[2][0]).add(A[0][0].mul(A[1][2]).mul(A[2][1])).add(A[0][1].mul(A[1][0]).mul(A[2][2]));
  const allPlus = [0, 1, 2].reduce((s, j) => s.add(A[0][j].mul(det(minor(A, 0, j)))), F(0));
  return mcq(rng, {
    subtopic: "Cofactor expansion",
    prompt: `Evaluate $|A|$ for $A = ${bm(A)}$.`,
    correct: d.tex(),
    distractors: [d.neg(), allPlus, down, down.add(up), prodDiag(A)].map((x) => x.tex()),
    solution: `${expansion(A)}\nTraps: forgetting the checkerboard sign $(-1)^{i+j}$, or keeping only the three "downward" diagonal products of Sarrus' rule.`,
  });
}

/** 4x4 determinant: one row/column with a single nonzero entry, then a 3x3. */
function det4(rng: Rng): Draft {
  const A = randMat(rng, 4, -3, 4);
  const r = rng.int(0, 3);
  const c = rng.int(0, 3);
  const asRow = rng.chance(0.5);
  for (let t = 0; t < 4; t++) {
    if (asRow) A[r][t] = F(0);
    else A[t][c] = F(0);
  }
  A[r][c] = F(rng.nz(-3, 4));
  // a second zero inside the minor so the 3x3 is quick too
  const c2 = rng.pick([0, 1, 2, 3].filter((x) => x !== c));
  const r2 = rng.pick([0, 1, 2, 3].filter((x) => x !== r));
  A[r2][c2] = F(0);
  const d = det(A);
  if (d.isZero() || Math.abs(d.valueOf()) > 300) retry();
  const M = minor(A, r, c);
  const m = det(M);
  const s = sgn(r, c);
  return mcq(rng, {
    subtopic: "Cofactor expansion",
    prompt: `Evaluate $\\det A$ for $A = ${bm(A)}$.`,
    correct: d.tex(),
    distractors: [d.neg(), m, m.mul(s), prodDiag(A), d.mul(2)].map((x) => x.tex()),
    solution:
      `${asRow ? "Row" : "Column"} ${asRow ? r + 1 : c + 1} has a single nonzero entry $a_{${sub(r, c)}} = ${A[r][c].tex()}$, so expand along it: $\\det A = a_{${sub(r, c)}}C_{${sub(r, c)}} = (${A[r][c].tex()})(-1)^{${r + c + 2}}M_{${sub(r, c)}}$.\n` +
      `$M_{${sub(r, c)}} = ${vm(M)}$.\n${expansion(M, `M_{${sub(r, c)}}`)}\n` +
      `Hence $\\det A = (${A[r][c].tex()})(${s})(${m.tex()}) = ${d.tex()}$. The sign $(-1)^{i+j}$ is the usual slip.`,
  });
}

/** A single cofactor C_ij (sign + correct deletion). */
function cofactorEntry(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const A = randMat(rng, n, n === 4 ? -3 : -4, n === 4 ? 3 : 5);
  const i = rng.int(0, n - 1);
  const j = rng.int(0, n - 1);
  if (i === j && rng.chance(0.6)) retry();
  const M = minor(A, i, j);
  const m = det(M);
  const C = m.mul(sgn(i, j));
  if (C.isZero()) retry();
  const Cji = cof(A, j, i);
  return mcq(rng, {
    subtopic: "Minors & cofactors",
    prompt: `Let $A = ${bm(A)}$. Find the cofactor $C_{${sub(i, j)}}$.`,
    correct: C.tex(),
    distractors: [C.neg(), m, Cji, Cji.neg(), A[i][j].mul(C), C.add(A[i][j])].map((x) => x.tex()),
    solution:
      `Delete row ${i + 1} and column ${j + 1}: $M_{${sub(i, j)}} = ${vm(M)} = ${m.tex()}$.\n` +
      `$C_{${sub(i, j)}} = (-1)^{${i + 1}+${j + 1}}M_{${sub(i, j)}} = ${sgn(i, j) > 0 ? "" : "-"}(${m.tex()}) = ${C.tex()}$.\n` +
      `Traps: the minor $M_{ij}$ has no sign${i === j ? "" : `; $C_{${sub(j, i)}}$ (delete row ${j + 1}, column ${i + 1}) is a different number in general`}; $a_{ij}C_{ij}$ is one term of the expansion, not the cofactor.`,
  });
}

const SCALES: Frac[] = [F(2), F(3), F(-2), F(-3), F(4), F(5), F(1, 2), F(-1, 2), F(1, 3)];

/** det after a sequence of elementary row (or column) operations. */
function rowOpSeq(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const d = F(rng.nz(-6, 6));
  const col = rng.chance(0.3);
  const L = col ? "C" : "R";
  const word = col ? "column" : "row";
  const kinds = rng.shuffle(["swap", "scale", "rep", rng.pick(["swap", "scale", "rep"])]).slice(0, rng.pick([3, 4]));
  if (!kinds.includes("swap") || !kinds.includes("scale")) retry();
  let sign = 1;
  let scaleP = F(1);
  let repP = F(1);
  const steps: string[] = [];
  const why: string[] = [];
  for (const k of kinds) {
    const [i, j] = rng.shuffle([...Array(n).keys()]).slice(0, 2);
    if (k === "swap") {
      sign = -sign;
      steps.push(`$${L}_${i + 1} \\leftrightarrow ${L}_${j + 1}$`);
      why.push(`interchange: $\\times(-1)$`);
    } else if (k === "scale") {
      const s = rng.pick(SCALES);
      scaleP = scaleP.mul(s);
      steps.push(`$${L}_${i + 1} \\to ${s.eq(-1) ? "-" : s.tex()}${L}_${i + 1}$`);
      why.push(`scaling one ${word} by $${s.tex()}$: $\\times(${s.tex()})$`);
    } else {
      const m = F(rng.nz(-5, 7));
      repP = repP.mul(m);
      steps.push(`$${L}_${i + 1} \\to ${L}_${i + 1}${coefTerm(m, `${L}_${j + 1}`, false)}$`);
      why.push(`replacement: $\\times 1$ (no change)`);
    }
  }
  const correct = d.mul(sign).mul(scaleP);
  const reverse = rng.chance(0.3);
  const head = `$A$ is a $${n}\\times${n}$ matrix. $B$ is obtained from $A$ by the ${word} operations (in this order): ${steps.join(", then ")}.`;
  const sol = `Effect of each operation on the determinant: ${why.join("; ")}.\nOverall $|B| = (${sign})(${scaleP.tex()})\\,|A|$.`;
  if (!reverse) {
    return mcq(rng, {
      subtopic: "Row & column operations",
      prompt: `${head} If $|A| = ${d.tex()}$, find $|B|$.`,
      correct: correct.tex(),
      distractors: [
        correct.neg(),
        correct.mul(repP),
        d.mul(sign).div(scaleP),
        d.mul(sign),
        d.mul(sign).mul(scaleP.pow(n)),
        correct.mul(repP).neg(),
      ].map((x) => x.tex()),
      solution: `${sol}\n$|B| = (${sign})(${scaleP.tex()})(${d.tex()}) = ${correct.tex()}$. Replacements never change the determinant; only one ${word} is scaled, so the factor is $k$, not $k^{${n}}$.`,
    });
  }
  return mcq(rng, {
    subtopic: "Row & column operations",
    prompt: `${head} If $|B| = ${correct.tex()}$, find $|A|$.`,
    correct: d.tex(),
    distractors: [d.neg(), correct.mul(sign).mul(scaleP), d.mul(repP), correct.mul(sign), correct.div(scaleP)].map((x) => x.tex()),
    solution: `${sol}\nSo $|A| = |B| / ((${sign})(${scaleP.tex()})) = ${correct.tex()} / (${F(sign).mul(scaleP).tex()}) = ${d.tex()}$.`,
  });
}

/** |k A^p B^q ...| from |A|, |B|. */
function algebraExpr(rng: Rng): Draft {
  const n = rng.pick([2, 3, 3, 4]);
  const a = rng.pick([F(2), F(3), F(-2), F(-3), F(4), F(1, 2)]);
  const b = rng.pick([F(2), F(-2), F(3), F(-1, 2), F(5), F(-4)]);
  const useB = rng.chance(0.65);
  const toks = (X: string) => [
    { t: X, e: 1 },
    { t: `${X}^T`, e: 1 },
    { t: `${X}^{-1}`, e: -1 },
    { t: `${X}^2`, e: 2 },
    { t: `${X}^3`, e: 3 },
    { t: `(${X}^T)^{-1}`, e: -1 },
  ];
  const pickA = rng.shuffle(toks("A")).slice(0, useB ? 1 : 2);
  const pickB = useB ? rng.shuffle(toks("B")).slice(0, 1) : [];
  const all = rng.shuffle([...pickA, ...pickB]);
  const eA = pickA.reduce((s, t) => s + t.e, 0);
  const eB = pickB.reduce((s, t) => s + t.e, 0);
  if (eA === 0 && !useB) retry();
  const k = rng.chance(0.75) ? rng.pick([F(2), F(3), F(-1), F(-2), F(1, 2), F(-3)]) : F(1);
  const kTex = k.eq(1) ? "" : k.eq(-1) ? "-" : k.tex();
  const expr = `${kTex}${all.map((t) => t.t).join("")}`;
  const rest = fracPow(a, eA).mul(fracPow(b, eB));
  const correct = k.pow(n).mul(rest);
  const absE = fracPow(a, Math.abs(eA)).mul(fracPow(b, Math.abs(eB)));
  const posOnly = (x: Frac, ts: { e: number }[]) => fracPow(x, ts.reduce((s, t) => s + Math.abs(t.e), 0));
  return mcq(rng, {
    subtopic: "Determinant algebra",
    prompt: `$A$ and $B$ are $${n}\\times ${n}$ matrices with $|A| = ${a.tex()}$${useB ? ` and $|B| = ${b.tex()}$` : ""}. Find $\\left|${expr}\\right|$.`,
    correct: correct.tex(),
    distractors: [
      k.mul(rest),
      k.pow(n).mul(posOnly(a, pickA)).mul(useB ? posOnly(b, pickB) : F(1)),
      k.pow(n).div(rest),
      correct.neg(),
      k.pow(n - 1).mul(rest),
      k.pow(n).mul(absE).neg(),
    ].map((x) => x.tex()),
    solution:
      `Use $|XY| = |X||Y|$, $|X^T| = |X|$, $|X^{-1}| = 1/|X|$, $|X^m| = |X|^m$ and, for an $n\\times n$ matrix, $|kX| = k^n|X|$.\n` +
      `$\\left|${expr}\\right| = ${k.eq(1) ? "" : `${pw(k, n)}\\cdot `}${pw(a, eA)}${useB ? `\\cdot ${pw(b, eB)}` : ""} = ${correct.tex()}$.` +
      (k.eq(1) ? "" : `\nThe scalar comes out as $k^{${n}}$ because it multiplies all ${n} rows; $|kA| = k|A|$ is the classic trap.`),
  });
}

/** b_ij = c^{i+j} a_ij and friends. */
function entryScaling(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const c = rng.pick([2, 3, 5]);
  const d = rng.nz(-5, 5);
  const kind = rng.pick(["i+j", "i+j", "i-j", "i", "j"] as const);
  const tri = (n * (n + 1)) / 2;
  const e = kind === "i+j" ? 2 * tri : kind === "i-j" ? 0 : tri;
  const fmt = (ex: number, dd: number) => {
    if (ex === 0) return `${dd}`;
    const s = dd < 0 ? "-" : "";
    return Math.abs(dd) === 1 ? `${s}${c}^{${ex}}` : `${s}${c}^{${ex}}\\cdot ${Math.abs(dd)}`;
  };
  const rule = kind === "i+j" ? `${c}^{i+j}a_{ij}` : kind === "i-j" ? `${c}^{i-j}a_{ij}` : kind === "i" ? `${c}^{i}a_{ij}` : `${c}^{j}a_{ij}`;
  const why =
    kind === "i+j"
      ? `$b_{ij} = ${c}^i a_{ij} ${c}^j$, so $B = DAD$ with $D = \\operatorname{diag}(${c}, ${c}^2, \\dots, ${c}^{${n}})$. $|D| = ${c}^{1+2+\\dots+${n}} = ${c}^{${tri}}$, hence $|B| = |D|^2|A| = ${c}^{${2 * tri}}|A|$.`
      : kind === "i-j"
        ? `$b_{ij} = ${c}^i a_{ij} ${c}^{-j}$, so $B = DAD^{-1}$ with $D = \\operatorname{diag}(${c}, \\dots, ${c}^{${n}})$. Then $|B| = |D||A|/|D| = |A|$.`
        : kind === "i"
          ? `Row $i$ of $A$ is multiplied by $${c}^i$: $B = DA$ with $D = \\operatorname{diag}(${c}, \\dots, ${c}^{${n}})$, so $|B| = ${c}^{1+2+\\dots+${n}}|A| = ${c}^{${tri}}|A|$.`
          : `Column $j$ of $A$ is multiplied by $${c}^j$: $B = AD$ with $D = \\operatorname{diag}(${c}, \\dots, ${c}^{${n}})$, so $|B| = ${c}^{1+2+\\dots+${n}}|A| = ${c}^{${tri}}|A|$.`;
  const cands = [2 * tri, tri, 2 * n, n, n * n, 0].filter((x) => x !== e);
  return mcq(rng, {
    subtopic: "Special patterns",
    prompt: `$A = [a_{ij}]$ is a $${n}\\times${n}$ matrix with $|A| = ${d}$, and $B = [b_{ij}]$ is defined by $b_{ij} = ${rule}$. Find $|B|$.`,
    correct: fmt(e, d),
    distractors: [...cands.map((x) => fmt(x, d)), fmt(e, -d)],
    solution: `${why}\nSo $|B| = ${fmt(e, d)}$.`,
  });
}

/** |B| where the columns (or rows) of B are combinations of those of A: |B| = |A||M|. */
function columnCombo(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const d = F(rng.nz(-5, 6));
  const rows = rng.chance(0.35);
  const perm = rng.shuffle([...Array(n).keys()]);
  const M: Mat = Array.from({ length: n }, () => Array.from({ length: n }, () => F(0)));
  perm.forEach((p, j) => (M[p][j] = F(rng.pick([1, 1, 2, 3, -1, -2]))));
  const extra = rng.int(1, 2);
  for (let t = 0; t < extra; t++) {
    const j = rng.int(0, n - 1);
    const i = rng.pick([...Array(n).keys()].filter((x) => x !== perm[j]));
    M[i][j] = F(rng.nz(-3, 3));
  }
  const dm = det(M);
  if (dm.isZero() && rng.chance(0.75)) retry();
  const correct = d.mul(dm);
  const main = perm.reduce((p, r, j) => p.mul(M[r][j]), F(1));
  const sym = rows ? (i: number) => `\\mathbf{r}_{${i + 1}}` : (i: number) => `\\mathbf{a}_{${i + 1}}`;
  const parts = Array.from({ length: n }, (_, j) => comb(M.map((r) => r[j]), sym));
  const prompt = rows
    ? `$A$ is a $${n}\\times${n}$ matrix with rows $${Array.from({ length: n }, (_, i) => sym(i)).join(", ")}$ and $|A| = ${d.tex()}$. $B$ is the matrix whose rows are, in order, $${parts.join(",\\ \\ ")}$. Find $|B|$.`
    : `$A = [\\,${Array.from({ length: n }, (_, i) => sym(i)).join("\\ ")}\\,]$ is a $${n}\\times${n}$ matrix with $|A| = ${d.tex()}$. Find $\\left|\\,[\\ ${parts.join("\\quad ")}\\ ]\\,\\right|$.`;
  return mcq(rng, {
    subtopic: "Row & column operations",
    prompt,
    correct: correct.tex(),
    distractors: [d.mul(main), correct.neg(), dm, d, d.mul(main).neg(), d.add(dm)].map((x) => x.tex()),
    solution:
      (rows
        ? `Row $i$ of $B$ is a combination of the rows of $A$, so $B = MA$ where row $i$ of $M$ holds the coefficients: $M = ${bm(transpose(M))}$.`
        : `Column $j$ of $B$ is a combination of the columns of $A$, so $B = AM$ where column $j$ of $M$ holds the coefficients: $M = ${bm(M)}$.`) +
      `\n$|M| = ${dm.tex()}$, so $|B| = |A|\\,|M| = (${d.tex()})(${dm.tex()}) = ${correct.tex()}$.` +
      (dm.isZero() ? " The new columns are linearly dependent, so the determinant is 0." : " Multiplying the leading coefficients only works when the extra terms are pure replacements and the order is not permuted; $|M|$ handles both.") ,
  });
}

type Lin = [Frac, Frac]; // c0 + c1 k
const linTex = ([c0, c1]: Lin) => {
  if (c1.isZero()) return c0.tex();
  const kpart = coefTerm(c1, "k", true);
  return c0.isZero() ? kpart : `${kpart} ${c0.n < 0 ? "-" : "+"} ${c0.abs().tex()}`;
};
const polyTex = (cs: Frac[], v = "k") => {
  let s = "";
  for (let p = cs.length - 1; p >= 0; p--) {
    const sym = p === 0 ? "" : p === 1 ? v : `${v}^{${p}}`;
    if (cs[p].isZero()) continue;
    if (p === 0) s += s ? ` ${cs[p].n < 0 ? "-" : "+"} ${cs[p].abs().tex()}` : cs[p].tex();
    else s += coefTerm(cs[p], sym, s === "");
  }
  return s || "0";
};

/** Values of k making a 3x3 parametric matrix singular. */
function singularK(rng: Rng): Draft {
  const r1 = rng.int(-4, 4);
  const r2 = rng.int(-4, 4);
  if (r1 === r2) retry();
  const s = rng.nz(-3, 3);
  const c = (x: number): Lin => [F(x), F(0)];
  let A: Lin[][] = [
    [[F(-r1), F(1)], c(rng.int(-3, 3)), c(rng.int(-3, 3))],
    [c(0), [F(-r2), F(1)], c(rng.int(-3, 3))],
    [c(0), c(0), c(s)],
  ];
  for (let t = 0; t < 2; t++) {
    const [i, j] = rng.shuffle([0, 1, 2]).slice(0, 2);
    const m = rng.nz(-2, 2);
    A[i] = A[i].map((e, q) => [e[0].add(A[j][q][0].mul(m)), e[1].add(A[j][q][1].mul(m))] as Lin);
  }
  {
    const [i, j] = rng.shuffle([0, 1, 2]).slice(0, 2);
    const m = rng.nz(-2, 2);
    A = A.map((r) => r.map((e, q) => (q === i ? ([e[0].add(r[j][0].mul(m)), e[1].add(r[j][1].mul(m))] as Lin) : e)));
  }
  const rp = rng.shuffle([0, 1, 2]);
  const cp = rng.shuffle([0, 1, 2]);
  A = rp.map((r) => cp.map((q) => A[r][q]));
  if (A.flat().some((e) => Math.abs(e[0].valueOf()) > 9 || Math.abs(e[1].valueOf()) > 3)) retry();
  if (A.flat().filter((e) => !e[1].isZero()).length < 2) retry();
  const at = (k: number): Mat => A.map((r) => r.map((e) => e[0].add(e[1].mul(k))));
  const p0 = det(at(0));
  const p1 = det(at(1));
  const pm = det(at(-1));
  const al = p1.add(pm).div(2).sub(p0);
  const be = p1.sub(pm).div(2);
  if (al.isZero() || !det(at(r1)).isZero() || !det(at(r2)).isZero()) retry();
  const [lo, hi] = r1 < r2 ? [r1, r2] : [r2, r1];
  const pair = (x: number, y: number) => {
    const [u, v] = x < y ? [x, y] : [y, x];
    return u === v ? `k = ${u}` : `k = ${u} \\text{ or } k = ${v}`;
  };
  const notPair = (x: number, y: number) => {
    const [u, v] = x < y ? [x, y] : [y, x];
    return u === v ? `k \\ne ${u}` : `k \\ne ${u} \\text{ and } k \\ne ${v}`;
  };
  const mode = rng.pick(["singular", "nontrivial", "dependent", "invertible"] as const);
  const q =
    mode === "singular"
      ? "For which value(s) of $k$ is $A$ singular?"
      : mode === "nontrivial"
        ? "For which value(s) of $k$ does $A\\mathbf{x} = \\mathbf{0}$ have a nontrivial solution?"
        : mode === "dependent"
          ? "For which value(s) of $k$ are the columns of $A$ linearly dependent?"
          : "For which values of $k$ is $A$ invertible?";
  const wrongPairs: [number, number][] = [[-lo, -hi], [lo, -hi], [-lo, hi], [lo, lo], [hi, hi]];
  const correct = mode === "invertible" ? notPair(lo, hi) : pair(lo, hi);
  const distractors =
    mode === "invertible"
      ? [pair(lo, hi), ...wrongPairs.map(([x, y]) => notPair(x, y)), "\\text{all real } k"]
      : [...wrongPairs.map(([x, y]) => pair(x, y)), "\\text{no real } k"];
  const poly = [p0, be, al];
  const fac = (r: number) => (r === 0 ? "k" : `(k ${r < 0 ? "+" : "-"} ${Math.abs(r)})`);
  return mcq(rng, {
    subtopic: "Invertibility",
    prompt: `Let $A = ${`\\begin{bmatrix} ${A.map((r) => r.map(linTex).join(" & ")).join(" \\\\ ")} \\end{bmatrix}`}$. ${q}`,
    correct,
    distractors,
    solution:
      `$A$ is singular $\\iff |A| = 0$ (equivalently $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions, the columns are dependent).\n` +
      `Expanding (cofactors, or simplify with row replacements first, which do not change $|A|$): $|A| = ${polyTex(poly)} = ${al.eq(1) ? "" : al.eq(-1) ? "-" : al.tex()}${fac(lo)}${fac(hi)}$.\n` +
      `So $|A| = 0$ exactly when $k = ${lo}$ or $k = ${hi}$` +
      (mode === "invertible" ? `, and $A$ is invertible for every other $k$.` : "."),
  });
}

const eqTex = (row: Frac[], b: Frac) => `${comb(row, (j) => `x_{${j + 1}}`)} = ${b.tex()}`;

/** Cramer's rule for one unknown. */
function cramer(rng: Rng): Draft {
  const n = rng.pick([2, 3, 3]);
  const A = randMat(rng, n, -3, 4);
  if (n === 3) A[rng.int(0, 2)][rng.int(0, 2)] = F(0);
  const d = det(A);
  if (d.isZero() || Math.abs(d.valueOf()) > 15) retry();
  let b: Frac[];
  if (rng.chance(0.5)) {
    const x0 = Array.from({ length: n }, () => F(rng.int(-3, 4)));
    b = A.map((r) => r.reduce((s, a, j) => s.add(a.mul(x0[j])), F(0)));
  } else b = Array.from({ length: n }, () => F(rng.int(-6, 8)));
  if (b.every((x) => x.isZero()) || b.some((x) => Math.abs(x.valueOf()) > 20)) retry();
  const inv = inverse(A)!;
  const x = inv.map((r) => r.reduce((s, a, j) => s.add(a.mul(b[j])), F(0)));
  const i = rng.int(0, n - 1);
  const Ai = A.map((r, q) => r.map((a, j) => (j === i ? b[q] : a)));
  const Ri = A.map((r, q) => (q === i ? b : r));
  const di = det(Ai);
  if (!di.div(d).eq(x[i])) throw new Error("cramer mismatch");
  const other = x[(i + 1) % n];
  return mcq(rng, {
    subtopic: "Cramer's rule & adjugate",
    prompt: `Use Cramer's rule to find $x_{${i + 1}}$ for the system\n$$\\begin{aligned} ${A.map((r, q) => eqTex(r, b[q]).replace(" = ", " &= ")).join(" \\\\ ")} \\end{aligned}$$`,
    correct: `x_{${i + 1}} = ${x[i].tex()}`,
    distractors: [di, di.isZero() ? x[i].add(2) : d.div(di), other, x[i].neg(), det(Ri).div(d), x[i].add(1)].map((v) => `x_{${i + 1}} = ${v.tex()}`),
    solution:
      `$|A| = ${vm(A)} = ${d.tex()} \\ne 0$, so Cramer's rule applies.\n` +
      `Replace **column** ${i + 1} of $A$ by $\\mathbf{b}$: $|A_{${i + 1}}(\\mathbf{b})| = ${vm(Ai)} = ${di.tex()}$.\n` +
      `$x_{${i + 1}} = \\dfrac{|A_{${i + 1}}(\\mathbf{b})|}{|A|} = \\dfrac{${di.tex()}}{${d.tex()}} = ${x[i].tex()}$. (Replacing a row instead of a column, or forgetting to divide by $|A|$, are the usual slips.)`,
  });
}

/** Entry of A^{-1} (or adj A) via cofactors. */
function adjEntry(rng: Rng): Draft {
  const A = randMat(rng, 3, -3, 4);
  A[rng.int(0, 2)][rng.int(0, 2)] = F(0);
  const d = det(A);
  if (d.isZero() || Math.abs(d.valueOf()) > 20) retry();
  const i = rng.int(0, 2);
  const j = rng.int(0, 2);
  if (i === j) retry();
  const Cji = cof(A, j, i);
  const Cij = cof(A, i, j);
  const Mji = det(minor(A, j, i));
  if (Cji.isZero()) retry();
  const inv = inverse(A)!;
  if (!inv[i][j].eq(Cji.div(d))) throw new Error("adjugate mismatch");
  const asInv = rng.chance(0.6);
  const target = asInv ? `(A^{-1})_{${sub(i, j)}}` : `(\\operatorname{adj}A)_{${sub(i, j)}}`;
  const correct = asInv ? Cji.div(d) : Cji;
  const distractors = asInv
    ? [Cij.div(d), Cji.neg().div(d), Mji.div(d), Cji, d.div(Cji), Cij.neg().div(d)]
    : [Cij, Cji.neg(), Mji, Cji.div(d), Cij.neg()];
  return mcq(rng, {
    subtopic: "Cramer's rule & adjugate",
    prompt: `Let $A = ${bm(A)}$. Find the entry $${target}$.`,
    correct: correct.tex(),
    distractors: distractors.map((x) => x.tex()),
    solution:
      `$\\operatorname{adj}A$ is the **transpose** of the cofactor matrix, so $(\\operatorname{adj}A)_{${sub(i, j)}} = C_{${sub(j, i)}}$ (delete row ${j + 1}, column ${i + 1}).\n` +
      `$C_{${sub(j, i)}} = (-1)^{${i + j + 2}}${vm(minor(A, j, i))} = (${sgn(i, j)})(${Mji.tex()}) = ${Cji.tex()}$.` +
      (asInv ? `\n$|A| = ${d.tex()}$, and $A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj}A$, so $(A^{-1})_{${sub(i, j)}} = \\dfrac{${Cji.tex()}}{${d.tex()}} = ${correct.tex()}$.` : "") +
      `\nUsing $C_{${sub(i, j)}}$ (no transpose) is the classic trap.`,
  });
}

/** Areas of parallelograms / triangles and volumes of parallelepipeds. */
function areaVolume(rng: Rng): Draft {
  const mode = rng.pick(["para2", "tri2", "ppd3", "ppd0"] as const);
  const pt = (n: number) => Array.from({ length: n }, () => F(rng.int(-3, 4)));
  const subv = (p: Frac[], q: Frac[]) => p.map((x, i) => x.sub(q[i]));
  const ptTex = (p: Frac[]) => `(${p.map((x) => x.tex()).join(", ")})`;
  if (mode === "para2" || mode === "tri2") {
    const P = pt(2);
    const Q = pt(2);
    const R = pt(2);
    const u = subv(Q, P);
    const v = subv(R, P);
    const D = det(transpose([u, v]));
    if (D.isZero() || P.every((x) => x.isZero())) retry();
    const Dpos = det(transpose([Q, R]));
    if (mode === "para2") {
      const S = Q.map((x, i) => x.add(v[i]));
      return mcq(rng, {
        subtopic: "Area & volume",
        prompt: `Find the area of the parallelogram with vertices $${ptTex(P)}$, $${ptTex(Q)}$, $${ptTex(S)}$ and $${ptTex(R)}$.`,
        correct: D.abs().tex(),
        distractors: [D.abs().div(2), D.abs().mul(2), Dpos.abs(), D.abs().add(1), det(transpose([Q, S])).abs()].map((x) => x.tex()),
        solution: `Translate so that $${ptTex(P)}$ is at the origin: the edges from it are $\\mathbf{u} = ${ptTex(u)}$ and $\\mathbf{v} = ${ptTex(v)}$.\nArea $= |\\det[\\mathbf{u}\\ \\mathbf{v}]| = \\left|${vm(transpose([u, v]))}\\right| = |${D.tex()}| = ${D.abs().tex()}$. Using the position vectors of the vertices directly is wrong unless one vertex is the origin.`,
      });
    }
    return mcq(rng, {
      subtopic: "Area & volume",
      prompt: `Find the area of the triangle with vertices $${ptTex(P)}$, $${ptTex(Q)}$ and $${ptTex(R)}$.`,
      correct: D.abs().div(2).tex(),
      distractors: [D.abs(), Dpos.abs().div(2), D.abs().div(6), D.abs().div(3), D.abs().mul(2)].map((x) => x.tex()),
      solution: `Edges from $${ptTex(P)}$: $\\mathbf{u} = ${ptTex(u)}$, $\\mathbf{v} = ${ptTex(v)}$. They span a parallelogram of area $|\\det[\\mathbf{u}\\ \\mathbf{v}]| = |${D.tex()}| = ${D.abs().tex()}$, and the triangle is half of it: $${D.abs().div(2).tex()}$.`,
    });
  }
  const origin = mode === "ppd0";
  const P = origin ? [F(0), F(0), F(0)] : pt(3);
  if (!origin && P.every((x) => x.isZero())) retry();
  const edges = [0, 1, 2].map(() => Array.from({ length: 3 }, () => F(rng.int(-2, 3))));
  edges[rng.int(0, 2)][rng.int(0, 2)] = F(0);
  const V = edges.map((e) => e.map((x, i) => x.add(P[i])));
  const E = transpose(edges);
  const D = det(E);
  if (D.isZero() || Math.abs(D.valueOf()) > 60) retry();
  const Dpos = det(transpose(V));
  const ds = [D.abs().div(6), D.abs().div(2), D.abs().mul(2), D.abs().add(1)];
  if (!origin) ds.unshift(Dpos.abs());
  if (D.n < 0) ds.unshift(D);
  return mcq(rng, {
    subtopic: "Area & volume",
    prompt: origin
      ? `Find the volume of the parallelepiped with one vertex at the origin and adjacent vertices $${V.map(ptTex).join(", ")}$.`
      : `A parallelepiped has a vertex at $${ptTex(P)}$, and the three vertices adjacent to it are $${V.map(ptTex).join(", ")}$. Find its volume.`,
    correct: D.abs().tex(),
    distractors: ds.map((x) => x.tex()),
    solution:
      (origin ? "" : `Edge vectors from $${ptTex(P)}$: subtract it from each adjacent vertex.\n`) +
      `Volume $= |\\det[\\mathbf{u}\\ \\mathbf{v}\\ \\mathbf{w}]| = \\left|${vm(E)}\\right| = |${D.tex()}| = ${D.abs().tex()}$.\nVolume is the **absolute value** of the determinant; $\\tfrac16|\\det|$ would be the tetrahedron.`,
  });
}

/** Area / volume scaling under x -> Ax. */
function transformScale(rng: Rng): Draft {
  const three = rng.chance(0.45);
  const n = three ? 3 : 2;
  const A = randMat(rng, n, -3, 4);
  if (three) {
    A[rng.int(0, 2)][rng.int(0, 2)] = F(0);
    A[rng.int(0, 2)][rng.int(0, 2)] = F(0);
  }
  const d = det(A);
  if (d.isZero() || Math.abs(d.valueOf()) > 40) retry();
  const ad = d.abs();
  const word = three ? "volume" : "area";
  const shape = three
    ? rng.pick([{ t: "the unit cube $[0,1]^3$", v: F(1) }, { t: "a solid $S$ of volume $5$", v: F(5) }, { t: "a solid $S$ of volume $\\tfrac{1}{2}$", v: F(1, 2) }])
    : rng.pick([{ t: "the unit square", v: F(1) }, { t: "a triangle of area $3$", v: F(3) }, { t: "a region $S$ of area $4$", v: F(4) }, { t: "the unit disk", v: F(1), pi: true }]);
  const pi = "pi" in shape && shape.pi ? "\\pi" : "";
  const mode = rng.pick(["image", "image", "pre", "twice"] as const);
  const tr = A.reduce((s, r, i) => s.add(r[i]), F(0)).abs();
  const T = `T(\\mathbf{x}) = A\\mathbf{x}$ with $A = ${bm(A)}`;
  const show = (x: Frac) => (pi ? (x.eq(1) ? "\\pi" : `${x.tex()}\\pi`) : x.tex());
  if (mode === "pre" && !pi) {
    const img = ad.mul(shape.v);
    return mcq(rng, {
      subtopic: "Area & volume",
      prompt: `Let $${T}$. A region $S$ in $\\mathbb{R}^${n}$ is mapped to $T(S)$, which has ${word} $${img.tex()}$. Find the ${word} of $S$.`,
      correct: shape.v.tex(),
      distractors: [img.mul(ad), img, img.div(d.mul(d)), tr.isZero() ? img.mul(2) : img.div(tr), shape.v.mul(2)].map((x) => x.tex()),
      solution: `$\\text{${word}}(T(S)) = |\\det A|\\cdot \\text{${word}}(S)$ with $\\det A = ${d.tex()}$. So $\\text{${word}}(S) = ${img.tex()}/${ad.tex()} = ${shape.v.tex()}$. (Multiplying by $|\\det A|$ instead of dividing is the trap.)`,
    });
  }
  const twice = mode === "twice";
  const factor = twice ? ad.mul(ad) : ad;
  const correct = factor.mul(shape.v);
  return mcq(rng, {
    subtopic: "Area & volume",
    prompt: `Let $${T}$. Find the ${word} of ${twice ? `$T(T(S))$, where $S$ is ` : "the image of "}${shape.t}${twice ? "" : " under $T$"}.`,
    correct: show(correct),
    distractors: [
      twice ? ad.mul(shape.v) : ad.mul(ad).mul(shape.v),
      twice ? ad.mul(ad).mul(ad).mul(shape.v) : d.mul(shape.v),
      shape.v.div(factor),
      tr.mul(shape.v),
      shape.v.mul(ad).mul(2),
    ].map(show),
    solution:
      `$\\det A = ${d.tex()}$${three ? ` (expand along a line with zeros)` : ""}. A linear map multiplies every ${word} by $|\\det A| = ${ad.tex()}$` +
      (twice ? `; applying it twice multiplies by $|\\det A|^2 = ${factor.tex()}$ (indeed $|\\det(A^2)| = |\\det A|^2$).` : ".") +
      `\n${word === "area" ? "Area" : "Volume"} $= ${factor.tex()}\\times ${show(shape.v)} = ${show(correct)}$. Areas and volumes are never negative, so use the absolute value.`,
  });
}

/** det via row reduction: A = (P)LU, det = ± product of pivots. */
function luDet(rng: Rng): Draft {
  const n = rng.pick([3, 4, 4]);
  const Lm: Mat = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => F(i === j ? 1 : i > j ? rng.int(-2, 2) : 0)));
  const U: Mat = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => F(i === j ? rng.nz(-3, 3) : i < j ? rng.int(-3, 3) : 0)));
  let A = matmul(Lm, U);
  if (maxEntry(A) > 12 || Lm.flat().filter((x) => !x.isZero()).length < n + 2) retry();
  const swap = rng.chance(0.5);
  let si = 0;
  let sj = 0;
  if (swap) {
    [si, sj] = rng.shuffle([...Array(n).keys()]).slice(0, 2);
    A = A.map((r, q) => (q === si ? A[sj] : q === sj ? A[si] : r));
  }
  const piv = prodDiag(U);
  const d = swap ? piv.neg() : piv;
  if (!det(A).eq(d)) throw new Error("luDet mismatch");
  const pivSum = U.reduce((s, r, i) => s.add(r[i]), F(0));
  return mcq(rng, {
    subtopic: "Row reduction & triangular",
    prompt: `Find $\\det A$ for $A = ${bm(A)}$.`,
    correct: d.tex(),
    distractors: [prodDiag(A), d.neg(), d.mul(2), pivSum, d.div(2)].map((x) => x.tex()),
    solution:
      (swap ? `Interchange $R_${si + 1} \\leftrightarrow R_${sj + 1}$ (one swap: sign $\\times(-1)$). ` : "") +
      `Row replacements only (they do not change the determinant) reduce it to the echelon form\n$$U = ${bm(U)}$$\n` +
      `$U$ is triangular, so $|U|$ = product of the pivots $= ${U.map((r, i) => `(${r[i].tex()})`).join("")} = ${piv.tex()}$.\n` +
      `$\\det A = ${swap ? "-" : ""}|U| = ${d.tex()}$. (The product of the diagonal of $A$ itself means nothing unless $A$ is triangular.)`,
  });
}

/** Vandermonde determinants. */
function vandermonde(rng: Rng): Draft {
  const [a, b, c] = rng.shuffle([-3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 3);
  if (rng.chance(0.55)) {
    const rowsForm = rng.chance(0.5);
    const V = mat([[1, 1, 1], [a, b, c], [a * a, b * b, c * c]]);
    const A = rowsForm ? V : transpose(V);
    const d = det(A);
    const check = F((b - a) * (c - a) * (c - b));
    if (!d.eq(check)) throw new Error("vdm mismatch");
    return mcq(rng, {
      subtopic: "Special patterns",
      prompt: `Evaluate $\\det A$ for $A = ${bm(A)}$.`,
      correct: d.tex(),
      distractors: [d.neg(), F((b - a) * (c - a)), F((b - a) + (c - a) + (c - b)), F(a * b * c), F((b - a) * (c - b)), d.mul(2)].map((x) => x.tex()),
      solution:
        `This is a Vandermonde determinant with nodes $${a}, ${b}, ${c}$: $\\det = (x_2 - x_1)(x_3 - x_1)(x_3 - x_2)$.\n` +
        `$= (${b} - ${a < 0 ? `(${a})` : a})(${c} - ${a < 0 ? `(${a})` : a})(${c} - ${b < 0 ? `(${b})` : b}) = (${b - a})(${c - a})(${c - b}) = ${d.tex()}$.\n` +
        `Mind the order: $(x_1 - x_2)(x_1 - x_3)(x_2 - x_3)$ has the opposite sign.${A === V ? "" : " This matrix is the transpose of the usual layout, which does not change the determinant."}`,
    });
  }
  // singular for which x: rows [1 x x^2],[1 a a^2],[1 b b^2]
  const P = rng.shuffle([0, 1, 2]);
  const rowsTex = [`1 & x & x^2`, `1 & ${a} & ${a * a}`, `1 & ${b} & ${b * b}`];
  const Mtex = `\\begin{bmatrix} ${P.map((i) => rowsTex[i]).join(" \\\\ ")} \\end{bmatrix}`;
  const [lo, hi] = a < b ? [a, b] : [b, a];
  const pr = (x: number, y: number) => (x === y ? `x = ${x}` : `x = ${Math.min(x, y)} \\text{ or } x = ${Math.max(x, y)}`);
  return mcq(rng, {
    subtopic: "Special patterns",
    prompt: `For which value(s) of $x$ is the matrix $${Mtex}$ singular?`,
    correct: pr(lo, hi),
    distractors: [pr(-lo, -hi), pr(lo, lo), pr(hi, hi), ...(lo !== 0 && hi !== 0 ? [`x = 0,\\ ${lo} \\text{ or } ${hi}`] : []), pr(lo + hi, lo * hi), "\\text{no real } x"],
    solution:
      `Up to a row interchange (which only flips the sign) this is a Vandermonde matrix with nodes $x, ${a}, ${b}$, so $\\det = \\pm(${a} - x)(${b} - x)(${b} - ${a < 0 ? `(${a})` : a})$.\n` +
      `It is zero exactly when two rows coincide: $x = ${a}$ or $x = ${b}$ (and $${a} \\ne ${b}$). So $${pr(lo, hi)}$.`,
  });
}

/** Structured determinants: t I + (rank one), and [[x,a,a],[a,x,a],[a,a,x]]. */
function structured(rng: Rng): Draft {
  if (rng.chance(0.5)) {
    const n = rng.pick([3, 4]);
    const t = rng.pick([1, 1, 2, 3]);
    const v = Array.from({ length: n }, () => rng.nz(-3, 4));
    const A = mat(Array.from({ length: n }, (_, i) => v.map((x, j) => (i === j ? t + x : x))));
    const s = v.reduce((p, q) => p + q, 0);
    const d = det(A);
    if (!d.eq(F(t ** (n - 1) * (t + s)))) throw new Error("structured mismatch");
    if (d.isZero()) retry();
    const prodDi = v.reduce((p, x) => p * (t + x), 1);
    return mcq(rng, {
      subtopic: "Special patterns",
      prompt: `Evaluate $\\det A$ for $A = ${bm(A)}$.`,
      correct: d.tex(),
      distractors: [F(t + s), F(prodDi), F(t ** n + s), F(t ** (n - 1) + s), d.neg(), F(t ** (n - 1) * s)].map((x) => x.tex()),
      solution:
        `Every row is $(${v.join(", ")})$ plus $${t}$ in the diagonal position. Add all the other columns to column 1 (replacements, no change): every entry of column 1 becomes $${t} + (${v.map((x, i) => (i === 0 ? `${x}` : x < 0 ? `- ${-x}` : `+ ${x}`)).join(" ")}) = ${t + s}$.\n` +
        `Factor out $${t + s}$, then subtract row 1 from every other row: the result is upper triangular with diagonal $1, ${Array(n - 1).fill(t).join(", ")}$.\n` +
        `$\\det A = ${t + s}\\cdot ${t}^{${n - 1}} = ${d.tex()}$. (With $t = 1$ this is the past-paper pattern $\\det = 1 + a + b + c + \\dots$)`,
    });
  }
  const x = rng.int(-3, 5);
  const a = rng.nz(-3, 3);
  if (x === a) retry();
  const A = mat([[x, a, a], [a, x, a], [a, a, x]]);
  const d = det(A);
  if (!d.eq(F((x + 2 * a) * (x - a) * (x - a)))) throw new Error("sym mismatch");
  if (d.isZero()) retry();
  return mcq(rng, {
    subtopic: "Special patterns",
    prompt: `Evaluate $\\det A$ for $A = ${bm(A)}$.`,
    correct: d.tex(),
    distractors: [F((x + 2 * a) * (x - a)), F(x ** 3 - 3 * a * a * x), F((x - 2 * a) * (x + a) ** 2), F(x ** 3 + 2 * a ** 3), d.neg()].map((q) => q.tex()),
    solution:
      `Add columns 2 and 3 to column 1: column 1 becomes $(${x + 2 * a}, ${x + 2 * a}, ${x + 2 * a})$. Factor out $${x + 2 * a}$ and subtract row 1 from rows 2 and 3:\n` +
      `$$\\det A = ${x + 2 * a}\\begin{vmatrix} 1 & ${a} & ${a} \\\\ 0 & ${x - a} & 0 \\\\ 0 & 0 & ${x - a} \\end{vmatrix} = (${x + 2 * a})(${x - a})^2 = ${d.tex()}$$\n` +
      `In general $\\det = (x + 2a)(x - a)^2$.`,
  });
}

/** True / False / Not-enough-information statements with random numbers. */
function tfnProps(rng: Rng): Draft {
  const kind = rng.pick(["algebra", "algebra", "sum", "power", "ops", "solve", "skew"] as const);
  const n = rng.pick([2, 3, 4, 5]);
  if (kind === "algebra") {
    const a = rng.pick([2, 3, -2, -3, 4]);
    const b = rng.pick([2, -2, 3, 5, -1]);
    const k = rng.pick([2, 3, -2, -1]);
    const form = rng.pick(["kAinvB", "kAT", "AinvBT", "kAB2"] as const);
    const val =
      form === "kAinvB" ? F(k ** n * b, a) : form === "kAT" ? F(k ** n * a) : form === "AinvBT" ? F(b, a) : F(k ** n * a * b * b);
    const wrong =
      form === "kAinvB" ? F(k * b, a) : form === "kAT" ? F(k * a) : form === "AinvBT" ? F(a, b) : F(k * a * b * b);
    const expr = form === "kAinvB" ? `${k === -1 ? "-" : k}A^{-1}B` : form === "kAT" ? `${k === -1 ? "-" : k}A^T` : form === "AinvBT" ? `A^{-1}B^T` : `${k === -1 ? "-" : k}AB^2`;
    const truth = val.eq(wrong) || rng.chance(0.5);
    const claim = truth ? val : wrong;
    return tfn({
      subtopic: "Determinant algebra",
      prompt: `$A$ and $B$ are $${n}\\times${n}$ matrices with $|A| = ${a}$ and $|B| = ${b}$. Then $|${expr}| = ${claim.tex()}$.`,
      answer: truth ? 0 : 1,
      solution: `$|${expr}| = ${val.tex()}$ (a scalar $k$ comes out as $k^{${n}}$; $|A^{-1}| = 1/|A|$; $|B^T| = |B|$). The claim is ${truth ? "**True**" : `${claim.tex()}, so **False**`}.`,
    });
  }
  if (kind === "sum") {
    const a = rng.nz(-5, 5);
    const b = rng.nz(-5, 5);
    const minus = rng.chance(0.4);
    return tfn({
      subtopic: "Determinant algebra",
      prompt: `$A$ and $B$ are $${n}\\times${n}$ matrices with $|A| = ${a}$ and $|B| = ${b}$. Then $|A ${minus ? "-" : "+"} B| = ${minus ? a - b : a + b}$.`,
      answer: 2,
      solution: `The determinant is **not** additive: $|A ${minus ? "-" : "+"} B|$ depends on the matrices themselves, not only on $|A|$ and $|B|$ (e.g. $A = I$, $B = -I$ in even size gives $|A| = |B| = 1$ but $|A + B| = 0$). Different matrices with these determinants give different values, so **Not enough information**.`,
    });
  }
  if (kind === "power") {
    const c = rng.pick([2, 3, -2]);
    const sq = rng.chance(0.5);
    if (sq) {
      const claim = c ** n * (rng.chance(0.5) ? 1 : -1);
      return tfn({
        subtopic: "Determinant algebra",
        prompt: `$A$ is a $${n}\\times${n}$ matrix with $A^2 = ${c * c}I$. Then $|A| = ${claim}$.`,
        answer: 2,
        solution: `$|A|^2 = |${c * c}I| = ${c * c}^{${n}}$, so $|A| = \\pm ${Math.abs(c) ** n}$. Both signs occur (e.g. $A = ${Math.abs(c)}I$ and $A = ${Math.abs(c)}\\operatorname{diag}(-1, 1, \\dots, 1)$), so the sign cannot be decided: **Not enough information**.`,
      });
    }
    const truth = rng.chance(0.5);
    const claim = truth ? c ** n : c;
    if (c ** n === c) retry();
    return tfn({
      subtopic: "Determinant algebra",
      prompt: `$A$ is a $${n}\\times${n}$ matrix with $A^3 = ${c ** 3}I$. Then $|A| = ${claim}$.`,
      answer: truth ? 0 : 1,
      solution: `$|A|^3 = |${c ** 3}I| = (${c ** 3})^{${n}} = (${c ** n})^3$. A real number has exactly one real cube root, so $|A| = ${c ** n}$. The claim is ${truth ? "**True**" : "**False**"}.`,
    });
  }
  if (kind === "ops") {
    const d = rng.nz(-4, 5);
    const k = rng.pick([2, 3, 5, -2]);
    const m = rng.nz(-4, 6);
    const [i, j, l] = rng.shuffle([1, 2, 3]);
    const val = -k * d;
    const truth = rng.chance(0.5);
    const claim = truth ? val : rng.pick([k * d, -k * m * d, -(k ** 3) * d]);
    if (!truth && claim === val) retry();
    return tfn({
      subtopic: "Row & column operations",
      prompt: `$A$ is $3\\times 3$ with $|A| = ${d}$. $B$ is obtained from $A$ by $R_${i} \\to R_${i} ${m < 0 ? "-" : "+"} ${Math.abs(m)}R_${j}$, then $R_${j} \\leftrightarrow R_${l}$, then $R_${l} \\to ${k}R_${l}$. Then $|B| = ${claim}$.`,
      answer: truth ? 0 : 1,
      solution: `Replacement: no change; interchange: $\\times(-1)$; scaling one row by $${k}$: $\\times ${k}$. So $|B| = (-1)(${k})(${d}) = ${val}$. The claim is ${truth ? "**True**" : "**False**"}.`,
    });
  }
  if (kind === "solve") {
    const a = rng.int(-4, 4);
    if (a !== 0) {
      return tfn({
        subtopic: "Invertibility",
        prompt: `$A$ is a $${n}\\times${n}$ matrix with $|A| = ${a}$. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^${n}$.`,
        answer: 0,
        solution: `$|A| \\ne 0$, so $A$ is invertible and $\\mathbf{x} = A^{-1}\\mathbf{b}$ is the unique solution for every $\\mathbf{b}$. **True**.`,
      });
    }
    return tfn({
      subtopic: "Invertibility",
      prompt: `$A$ is a $${n}\\times${n}$ matrix with $|A| = 0$, and $\\mathbf{b}\\in\\mathbb{R}^${n}$ is nonzero. Then $A\\mathbf{x} = \\mathbf{b}$ has no solution.`,
      answer: 2,
      solution: `$|A| = 0$ means $A$ is singular: $A\\mathbf{x} = \\mathbf{b}$ is either inconsistent or has infinitely many solutions, depending on whether $\\mathbf{b}\\in C(A)$. Since $\\mathbf{b}$ is not specified, **Not enough information**.`,
    });
  }
  // skew
  const odd = n % 2 === 1;
  const c = rng.pick([2, 3, -1]);
  return tfn({
    subtopic: "Determinant algebra",
    prompt: `$A$ is a $${n}\\times${n}$ matrix with $A^T = -A$. Then $|${c === -1 ? "-" : c}A| = 0$.`,
    answer: odd ? 0 : 2,
    solution: odd
      ? `$|A| = |A^T| = |-A| = (-1)^{${n}}|A| = -|A|$, so $|A| = 0$ and $|${c === -1 ? "-" : c}A| = (${c})^{${n}}\\cdot 0 = 0$. **True** (odd order).`
      : `For even order the argument gives $|A| = (-1)^{${n}}|A| = |A|$, which says nothing. Some even skew-symmetric matrices are singular (the zero matrix), others are not (e.g. $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ blocks give $|A| = 1$). **Not enough information**.`,
  });
}

export const determinantsGens: ((rng: Rng) => Draft)[] = [
  det3, det4, cofactorEntry, rowOpSeq, algebraExpr, entryScaling, columnCombo, singularK, cramer, adjEntry,
  areaVolume, transformScale, luDet, vandermonde, structured, tfnProps, det3, rowOpSeq,
];
