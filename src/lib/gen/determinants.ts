// Randomised determinant questions at final-exam difficulty. Exact Frac arithmetic throughout.
// Methods are restricted to the Ch 3 notes: Rules 1–10 (det p3–10), elimination to U and the product of pivots,
// the tutorial 3×3 formula, Theorem 3.1 (area/volume) and Theorem 3.2 (linear transformations).
import { det, F, Frac, mat, matmul, matTex, transpose, type Mat } from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------- local helpers

const cite = (ref: string, g: (rng: Rng) => Draft) => (rng: Rng): Draft => ({ ...g(rng), ref });

const RULES16 = "Slides 3.1 Rules 1–6 (det p3–5); PYP AY25/26 S2 Q2";
const PIVOTS = "Slides 3.1 Rules 5, 7, 8 (det p5–8); Tutorial 3 Q2";
const RULE8 = "Slides 3.1 Rule 8 (det p8); Slides 2.2 Theorem 2.4 (alg p10)";
const RULES910 = "Slides 3.1 Rules 3, 9–10 (det p4, p9–10); Tutorial 3 Q1";
const F3 = "Tutor slides, 3×3 formula (tut5 p3, p12)";
const COLS = "Slides 3.1 \"all the above properties apply to columns also\" (det p10)";

const vm = (A: Mat) => `\\begin{vmatrix} ${A.map((r) => r.map((x) => x.tex()).join(" & ")).join(" \\\\ ")} \\end{vmatrix}`;
const bm = (A: Mat) => matTex(A, false);
const randMat = (rng: Rng, n: number, lo: number, hi: number): Mat =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => F(rng.int(lo, hi))));
const prodDiag = (A: Mat) => A.reduce((p, r, i) => p.mul(r[i]), F(1));
const maxEntry = (A: Mat) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));
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
const p = (x: Frac) => `(${x.tex()})`;
/** The three bracketed terms of the tutorial 3×3 formula a(ei − fh) − b(di − fg) + c(dh − eg). */
const terms3 = (A: Mat): [Frac, Frac, Frac] => {
  const [, [d, e, f], [g, h, i]] = A;
  return [e.mul(i).sub(f.mul(h)), d.mul(i).sub(f.mul(g)), d.mul(h).sub(e.mul(g))];
};
/** Worked 3×3 determinant with the tutorial formula along row 1. */
function formula3(A: Mat, name = "|A|"): string {
  const [[a, b, c], [d, e, f], [g, h, i]] = A;
  const [t1, t2, t3] = terms3(A);
  return [
    `Use $a(ei - fh) - b(di - fg) + c(dh - eg)$ with row 1 $= (${a.tex()}, ${b.tex()}, ${c.tex()})$:`,
    `$${name} = ${p(a)}\\big(${p(e)}${p(i)} - ${p(f)}${p(h)}\\big) - ${p(b)}\\big(${p(d)}${p(i)} - ${p(f)}${p(g)}\\big) + ${p(c)}\\big(${p(d)}${p(h)} - ${p(e)}${p(g)}\\big)$`,
    `$= ${p(a)}${p(t1)} - ${p(b)}${p(t2)} + ${p(c)}${p(t3)} = ${det(A).tex()}$.`,
  ].join("\n");
}
const pw = (x: Frac, e: number) => (e === 1 ? x.tex() : `(${x.tex()})^{${e}}`);
const fracPow = (x: Frac, e: number) => (e >= 0 ? x.pow(e) : F(1).div(x.pow(-e)));

// ---------------------------------------------------------------- generators

/** 3x3 determinant with the tutorial formula. */
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
  const [t1, t2, t3] = terms3(A);
  const allPlus = A[0][0].mul(t1).add(A[0][1].mul(t2)).add(A[0][2].mul(t3));
  const down = prodDiag(A).add(A[0][1].mul(A[1][2]).mul(A[2][0])).add(A[0][2].mul(A[1][0]).mul(A[2][1]));
  const up = A[0][2].mul(A[1][1]).mul(A[2][0]).add(A[0][0].mul(A[1][2]).mul(A[2][1])).add(A[0][1].mul(A[1][0]).mul(A[2][2]));
  return mcq(rng, {
    subtopic: "3×3 formula",
    prompt: `Evaluate $|A|$ for $A = ${bm(A)}$.`,
    correct: d.tex(),
    distractors: [d.neg(), allPlus, down, down.add(up), prodDiag(A)].map((x) => x.tex()),
    solution: `${formula3(A)}\nTraps: forgetting the minus sign in front of $b(di - fg)$, or multiplying only the diagonal entries (that works only for a triangular matrix).`,
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
      why.push(`exchange (Rule 2): $\\times(-1)$`);
    } else if (k === "scale") {
      const s = rng.pick(SCALES);
      scaleP = scaleP.mul(s);
      steps.push(`$${L}_${i + 1} \\to ${s.eq(-1) ? "-" : s.tex()}${L}_${i + 1}$`);
      why.push(`scaling one ${word} by $${s.tex()}$ (Rule 3): $\\times(${s.tex()})$`);
    } else {
      const m = F(rng.nz(-5, 7));
      repP = repP.mul(m);
      steps.push(`$${L}_${i + 1} \\to ${L}_${i + 1}${coefTerm(m, `${L}_${j + 1}`, false)}$`);
      why.push(`replacement (Rule 5): $\\times 1$ (no change)`);
    }
  }
  const correct = d.mul(sign).mul(scaleP);
  const reverse = rng.chance(0.3);
  const head = `$A$ is a $${n}\\times${n}$ matrix. $B$ is obtained from $A$ by the ${word} operations (in this order): ${steps.join(", then ")}.`;
  const sol =
    `Effect of each operation on the determinant${col ? " (the rules apply to columns as well as rows)" : ""}: ${why.join("; ")}.\n` +
    `Overall $|B| = (${sign})(${scaleP.tex()})\\,|A|$.`;
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
      solution: `${sol}\n$|B| = (${sign})(${scaleP.tex()})(${d.tex()}) = ${correct.tex()}$. Replacements never change the determinant; only one ${word} is scaled, so the factor is $t$, not $t^{${n}}$.`,
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
      `Use $|XY| = |X||Y|$ (Rule 9), $|X^T| = |X|$ (Rule 10), $|X^{-1}| = 1/|X|$ (from $|XX^{-1}| = |I| = 1$), $|X^m| = |X|^m$ and, for an $n\\times n$ matrix, $|kX| = k^n|X|$ (Rule 3 once per row).\n` +
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
  const rowsF = `factor $${c}^i$ out of row $i$ (Rule 3): $${c}^{1+2+\\dots+${n}} = ${c}^{${tri}}$`;
  const colsF = `factor $${c}^j$ out of column $j$ (Rule 3 for columns): $${c}^{${tri}}$`;
  const why =
    kind === "i+j"
      ? `$b_{ij} = ${c}^i\\cdot ${c}^j\\cdot a_{ij}$. First ${rowsF}; then ${colsF} again. Hence $|B| = ${c}^{${tri}}\\cdot ${c}^{${tri}}|A| = ${c}^{${2 * tri}}|A|$.`
      : kind === "i-j"
        ? `$b_{ij} = ${c}^i\\cdot ${c}^{-j}\\cdot a_{ij}$. First ${rowsF}; then factor $${c}^{-j}$ out of column $j$: $${c}^{-${tri}}$. The factors cancel, so $|B| = |A|$.`
        : kind === "i"
          ? `Row $i$ of $A$ is multiplied by $${c}^i$, so ${rowsF}. Hence $|B| = ${c}^{${tri}}|A|$.`
          : `Column $j$ of $A$ is multiplied by $${c}^j$, so ${colsF}. Hence $|B| = ${c}^{${tri}}|A|$.`;
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
  perm.forEach((pp, j) => (M[pp][j] = F(rng.pick([1, 1, 2, 3, -1, -2]))));
  const extra = rng.int(1, 2);
  for (let t = 0; t < extra; t++) {
    const j = rng.int(0, n - 1);
    const i = rng.pick([...Array(n).keys()].filter((x) => x !== perm[j]));
    M[i][j] = F(rng.nz(-3, 3));
  }
  const dm = det(M);
  if (dm.isZero() && rng.chance(0.75)) retry();
  const correct = d.mul(dm);
  const main = perm.reduce((pp, r, j) => pp.mul(M[r][j]), F(1));
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
      `\nBy Rule 9 (and Rule 10 for $|M^T| = |M|$), $|M| = ${dm.tex()}$ gives $|B| = |A|\\,|M| = (${d.tex()})(${dm.tex()}) = ${correct.tex()}$.` +
      (dm.isZero()
        ? " Here $|M| = 0$, so $|B| = 0$."
        : " Multiplying the leading coefficients only works when the extra terms are pure replacements and no exchange is involved; $|M|$ handles both."),
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
  for (let q = cs.length - 1; q >= 0; q--) {
    const sym = q === 0 ? "" : q === 1 ? v : `${v}^{${q}}`;
    if (cs[q].isZero()) continue;
    if (q === 0) s += s ? ` ${cs[q].n < 0 ? "-" : "+"} ${cs[q].abs().tex()}` : cs[q].tex();
    else s += coefTerm(cs[q], sym, s === "");
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
      `By Rule 8, $A$ is singular exactly when $|A| = 0$; by the Invertible Matrix Theorem this is also when $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions and when the columns are dependent.\n` +
      `With the $3\\times3$ formula $a(ei - fh) - b(di - fg) + c(dh - eg)$ (or simplify with row replacements first, which do not change $|A|$): $|A| = ${polyTex(poly)} = ${al.eq(1) ? "" : al.eq(-1) ? "-" : al.tex()}${fac(lo)}${fac(hi)}$.\n` +
      `So $|A| = 0$ exactly when $k = ${lo}$ or $k = ${hi}$` +
      (mode === "invertible" ? `, and $A$ is invertible for every other $k$.` : "."),
  });
}

/** Areas of parallelograms and volumes of parallelepipeds (Theorem 3.1). */
function areaVolume(rng: Rng): Draft {
  const mode = rng.pick(["para2", "para2", "ppd3", "ppd0"] as const);
  const pt = (n: number) => Array.from({ length: n }, () => F(rng.int(-3, 4)));
  const subv = (a: Frac[], b: Frac[]) => a.map((x, i) => x.sub(b[i]));
  const ptTex = (q: Frac[]) => `(${q.map((x) => x.tex()).join(", ")})`;
  if (mode === "para2") {
    const P = pt(2);
    const Q = pt(2);
    const R = pt(2);
    const u = subv(Q, P);
    const v = subv(R, P);
    const D = det(transpose([u, v]));
    if (D.isZero() || P.every((x) => x.isZero())) retry();
    const Dpos = det(transpose([Q, R]));
    const S = Q.map((x, i) => x.add(v[i]));
    return mcq(rng, {
      subtopic: "Area & volume",
      prompt: `Calculate the area of the parallelogram with vertices $${ptTex(P)}$, $${ptTex(Q)}$, $${ptTex(S)}$ and $${ptTex(R)}$.`,
      correct: D.abs().tex(),
      distractors: [D.abs().div(2), D.abs().mul(2), Dpos.abs(), D.abs().add(1), det(transpose([Q, S])).abs()].map((x) => x.tex()),
      solution:
        `Translate so that $${ptTex(P)}$ is at the origin (translation does not change area): subtract it from every vertex. The vertices adjacent to it become $\\mathbf{u} = ${ptTex(u)}$ and $\\mathbf{v} = ${ptTex(v)}$.\n` +
        `Theorem 3.1: area $= \\text{abs}\\left(|[\\mathbf{u}\\ \\mathbf{v}]|\\right) = \\text{abs}\\left(${vm(transpose([u, v]))}\\right) = \\text{abs}(${D.tex()}) = ${D.abs().tex()}$. Using the position vectors of the vertices directly is wrong unless one vertex is the origin.`,
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
  const ds = [D.abs().div(2), D.abs().mul(2), D.abs().add(1), D.abs().mul(3)];
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
      (origin ? "" : `Translate $${ptTex(P)}$ to the origin: subtract it from each adjacent vertex.\n`) +
      `Theorem 3.1 with the adjacent vertices as columns: volume $= \\text{abs}\\left(${vm(E)}\\right) = \\text{abs}(${D.tex()}) = ${D.abs().tex()}$.\nA volume is the **absolute value** of the determinant.`,
  });
}

/** Area / volume scaling under x -> Ax (Theorem 3.2). */
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
    ? rng.pick([{ t: "the unit cube $[0,1]^3$", v: F(1) }, { t: "a parallelepiped of volume $5$", v: F(5) }, { t: "a parallelepiped of volume $\\tfrac{1}{2}$", v: F(1, 2) }])
    : rng.pick([{ t: "the unit square", v: F(1) }, { t: "a parallelogram of area $3$", v: F(3) }, { t: "a parallelogram of area $4$", v: F(4) }, { t: "the unit disk", v: F(1), pi: true }]);
  const pi = "pi" in shape && shape.pi ? "\\pi" : "";
  const mode = rng.pick(["image", "image", "pre", "twice"] as const);
  const tr = A.reduce((s, r, i) => s.add(r[i]), F(0)).abs();
  const T = `T(\\mathbf{x}) = A\\mathbf{x}$ with $A = ${bm(A)}`;
  const show = (x: Frac) => (pi ? (x.eq(1) ? "\\pi" : `${x.tex()}\\pi`) : x.tex());
  const detWork = three ? formula3(A) : `$|A| = ad - bc = ${d.tex()}$.`;
  if (mode === "pre" && !pi) {
    const img = ad.mul(shape.v);
    return mcq(rng, {
      subtopic: "Area & volume",
      prompt: `Let $${T}$. A ${three ? "parallelepiped" : "parallelogram"} $S$ in $\\mathbb{R}^${n}$ is mapped to $T(S)$, which has ${word} $${img.tex()}$. Find the ${word} of $S$.`,
      correct: shape.v.tex(),
      distractors: [img.mul(ad), img, img.div(d.mul(d)), tr.isZero() ? img.mul(2) : img.div(tr), shape.v.mul(2)].map((x) => x.tex()),
      solution: `${detWork}\nTheorem 3.2: ${word} of $T(S) = \\text{abs}(|A|)\\times$ ${word} of $S$. So the ${word} of $S$ is $${img.tex()}/${ad.tex()} = ${shape.v.tex()}$. (Multiplying by $\\text{abs}(|A|)$ instead of dividing is the trap.)`,
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
      `${detWork}\nTheorem 3.2: $T$ multiplies every ${word} by $\\text{abs}(|A|) = ${ad.tex()}$${pi ? " (the theorem applies to arbitrary shapes, as in the ellipse example)" : ""}` +
      (twice ? `; applying it twice multiplies by $\\text{abs}(|A|)^2 = ${factor.tex()}$ (indeed $|A^2| = |A|^2$ by Rule 9).` : ".") +
      `\n${word === "area" ? "Area" : "Volume"} $= ${factor.tex()}\\times ${show(shape.v)} = ${show(correct)}$. Areas and volumes are never negative, so use the absolute value.`,
  });
}

/** det via elimination: |A| = ± product of pivots. */
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
      (swap ? `Exchange $R_${si + 1} \\leftrightarrow R_${sj + 1}$ (one exchange: sign $\\times(-1)$, Rule 2). ` : "") +
      `Row replacements only (Rule 5: they do not change the determinant) reduce it to the upper triangular\n$$U = ${bm(U)}$$\n` +
      `By Rule 7, $|U|$ = product of the pivots $= ${U.map((r, i) => `(${r[i].tex()})`).join("")} = ${piv.tex()}$.\n` +
      `$\\det A = ${swap ? "-" : ""}|U| = ${d.tex()}$. (The product of the diagonal of $A$ itself means nothing unless $A$ is triangular.)`,
  });
}

/** Determinants with rows (1, x, x^2): elimination, and "singular for which x" (two equal rows). */
function powerRows(rng: Rng): Draft {
  const [a, b, c] = rng.shuffle([-3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 3);
  const n = (x: number) => (x < 0 ? `(${x})` : `${x}`);
  if (rng.chance(0.55)) {
    const rowsForm = rng.chance(0.5);
    const V = mat([[1, 1, 1], [a, b, c], [a * a, b * b, c * c]]);
    const A = rowsForm ? V : transpose(V);
    const d = det(A);
    const check = F((b - a) * (c - a) * (c - b));
    if (!d.eq(check)) throw new Error("powerRows mismatch");
    const m = F(c - a, b - a);
    return mcq(rng, {
      subtopic: "Row reduction & triangular",
      prompt: `Evaluate $\\det A$ for $A = ${bm(A)}$.`,
      correct: d.tex(),
      distractors: [d.neg(), F((b - a) * (c - a)), F((b - a) + (c - a) + (c - b)), F(a * b * c), F((b - a) * (c - b)), d.mul(2)].map((x) => x.tex()),
      solution:
        (rowsForm ? `By Rule 10, $|A| = |A^T|$; work with the rows of $A^T$: $(1, ${a}, ${a * a})$, $(1, ${b}, ${b * b})$, $(1, ${c}, ${c * c})$.\n` : "") +
        `$R_2 - R_1 = (0, ${b - a}, ${b * b - a * a})$ and $R_3 - R_1 = (0, ${c - a}, ${c * c - a * a})$ (Rule 5, no change).\n` +
        `$R_3 - ${p(m)}R_2$: the last entry becomes $${c * c - a * a} - ${p(m)}${p(F(b * b - a * a))} = ${F(c * c - a * a).sub(m.mul(b * b - a * a)).tex()}$.\n` +
        `Upper triangular with pivots $1, ${b - a}, ${(c - a) * (c - b)}$ (Rule 7): $\\det A = ${d.tex()}$.`,
    });
  }
  // singular for which x: rows [1 x x^2],[1 a a^2],[1 b b^2]
  const P = rng.shuffle([0, 1, 2]);
  const rowsTex = [`1 & x & x^2`, `1 & ${a} & ${a * a}`, `1 & ${b} & ${b * b}`];
  const Mtex = `\\begin{bmatrix} ${P.map((i) => rowsTex[i]).join(" \\\\ ")} \\end{bmatrix}`;
  const [lo, hi] = a < b ? [a, b] : [b, a];
  const pr = (x: number, y: number) => (x === y ? `x = ${x}` : `x = ${Math.min(x, y)} \\text{ or } x = ${Math.max(x, y)}`);
  return mcq(rng, {
    subtopic: "Invertibility",
    prompt: `For which value(s) of $x$ is the matrix $${Mtex}$ singular?`,
    correct: pr(lo, hi),
    distractors: [pr(-lo, -hi), pr(lo, lo), pr(hi, hi), ...(lo !== 0 && hi !== 0 ? [`x = 0,\\ ${lo} \\text{ or } ${hi}`] : []), pr(lo + hi, lo * hi), "\\text{no real } x"],
    solution:
      `Exchange rows so that they read $(1, ${a}, ${a * a})$, $(1, ${b}, ${b * b})$, $(1, x, x^2)$ (exchanges only change the sign).\n` +
      `$R_2 - R_1 = (0, ${b - a}, ${b * b - a * a})$, $R_3 - R_1 = (0,\\ x - ${n(a)},\\ x^2 - ${n(a * a)})$. Then $R_3 - \\tfrac{x - ${n(a)}}{${b - a}}R_2$ has last entry $(x - ${n(a)})(x + ${n(a)}) - (x - ${n(a)})(${a + b}) = (x - ${n(a)})(x - ${n(b)})$.\n` +
      `So $|A| = \\pm(${b - a})(x - ${n(a)})(x - ${n(b)})$, and by Rule 8 $A$ is singular exactly when $x = ${a}$ or $x = ${b}$ (then two rows are equal, Rule 4). So $${pr(lo, hi)}$.`,
  });
}

/** Structured determinants: same row sum patterns (PYP AY24/25 S2 Q9 style). */
function structured(rng: Rng): Draft {
  if (rng.chance(0.5)) {
    const n = rng.pick([3, 4]);
    const t = rng.pick([1, 1, 2, 3]);
    const v = Array.from({ length: n }, () => rng.nz(-3, 4));
    const A = mat(Array.from({ length: n }, (_, i) => v.map((x, j) => (i === j ? t + x : x))));
    const s = v.reduce((pp, q) => pp + q, 0);
    const d = det(A);
    if (!d.eq(F(t ** (n - 1) * (t + s)))) throw new Error("structured mismatch");
    if (d.isZero()) retry();
    const prodDi = v.reduce((pp, x) => pp * (t + x), 1);
    return mcq(rng, {
      subtopic: "Special patterns",
      prompt: `Evaluate $\\det A$ for $A = ${bm(A)}$.`,
      correct: d.tex(),
      distractors: [F(t + s), F(prodDi), F(t ** n + s), F(t ** (n - 1) + s), d.neg(), F(t ** (n - 1) * s)].map((x) => x.tex()),
      solution:
        `Every row is $(${v.join(", ")})$ plus $${t}$ in the diagonal position. Add all the other columns to column 1 (Rule 5 for columns, no change): every entry of column 1 becomes $${t} + (${v.map((x, i) => (i === 0 ? `${x}` : x < 0 ? `- ${-x}` : `+ ${x}`)).join(" ")}) = ${t + s}$.\n` +
        `Factor out $${t + s}$ (Rule 3), then subtract row 1 from every other row: the result is upper triangular with diagonal $1, ${Array(n - 1).fill(t).join(", ")}$ (Rule 7).\n` +
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
      `Add columns 2 and 3 to column 1 (no change): column 1 becomes $(${x + 2 * a}, ${x + 2 * a}, ${x + 2 * a})$. Factor out $${x + 2 * a}$ (Rule 3) and subtract row 1 from rows 2 and 3:\n` +
      `$$\\det A = ${x + 2 * a}\\begin{vmatrix} 1 & ${a} & ${a} \\\\ 0 & ${x - a} & 0 \\\\ 0 & 0 & ${x - a} \\end{vmatrix} = (${x + 2 * a})(${x - a})^2 = ${d.tex()}$$\n` +
      `(Rule 7 for the triangular determinant.)`,
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
      solution: `$|${expr}| = ${val.tex()}$ (a scalar $k$ comes out as $k^{${n}}$ by Rule 3; $|XY| = |X||Y|$; $|A^{-1}| = 1/|A|$; $|B^T| = |B|$). The claim is ${truth ? "**True**" : `${claim.tex()}, so **False**`}.`,
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
      solution: `There is no sum rule: Rule 3 splits only one row while the other rows stay the same. $|A ${minus ? "-" : "+"} B|$ depends on the matrices themselves, not only on $|A|$ and $|B|$ (e.g. different diagonal matrices with these determinants give different values of $|A ${minus ? "-" : "+"} B|$ by Rule 7). **Not enough information**.`,
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
        solution: `$|A|^2 = |${c * c}I| = ${c * c}^{${n}}$ (Rules 9, 3), so $|A| = \\pm ${Math.abs(c) ** n}$. Both signs occur: $A = ${Math.abs(c)}I$, and $${Math.abs(c)}I$ with its first row multiplied by $-1$ (both square to $${c * c}I$; by Rule 7 their determinants differ in sign). The sign cannot be decided: **Not enough information**.`,
      });
    }
    const truth = rng.chance(0.5);
    const claim = truth ? c ** n : c;
    if (c ** n === c) retry();
    return tfn({
      subtopic: "Determinant algebra",
      prompt: `$A$ is a $${n}\\times${n}$ matrix with $A^3 = ${c ** 3}I$. Then $|A| = ${claim}$.`,
      answer: truth ? 0 : 1,
      solution: `$|A|^3 = |${c ** 3}I| = (${c ** 3})^{${n}} = (${c ** n})^3$ (Rules 9, 3). A real number has exactly one real cube root, so $|A| = ${c ** n}$. The claim is ${truth ? "**True**" : "**False**"}.`,
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
      solution: `Replacement: no change (Rule 5); exchange: $\\times(-1)$ (Rule 2); scaling one row by $${k}$: $\\times ${k}$ (Rule 3). So $|B| = (-1)(${k})(${d}) = ${val}$. The claim is ${truth ? "**True**" : "**False**"}.`,
    });
  }
  if (kind === "solve") {
    const a = rng.int(-4, 4);
    if (a !== 0) {
      return tfn({
        subtopic: "Invertibility",
        prompt: `$A$ is a $${n}\\times${n}$ matrix with $|A| = ${a}$. Then $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.`,
        answer: 0,
        solution: `$|A| \\ne 0$, so $A$ is invertible (Rule 8), and by the Invertible Matrix Theorem $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. **True**.`,
      });
    }
    return tfn({
      subtopic: "Invertibility",
      prompt: `$A$ is a $${n}\\times${n}$ matrix with $|A| = 0$. Then the columns of $A$ are linearly independent.`,
      answer: 1,
      solution: `$|A| = 0$ means $A$ is singular (Rule 8), so by the Invertible Matrix Theorem its columns are linearly **dependent**. **False**.`,
    });
  }
  // skew (A = -A^T), Tutorial 3 Q3 argument
  const odd = n % 2 === 1;
  const c = rng.pick([2, 3, -1]);
  return tfn({
    subtopic: "Determinant algebra",
    prompt: `$A$ is a $${n}\\times${n}$ matrix with $A = -A^T$. Then $|${c === -1 ? "-" : c}A| = 0$.`,
    answer: odd ? 0 : 2,
    solution: odd
      ? `As in Tutorial 3 Q3: $|A| = |-A^T| = (-1)^{${n}}|A^T| = -|A|$, so $|A| = 0$ and $|${c === -1 ? "-" : c}A| = (${c})^{${n}}\\cdot 0 = 0$. **True** (odd size).`
      : `For even size the Tutorial 3 Q3 argument gives $|A| = (-1)^{${n}}|A^T| = |A|$, which says nothing. The zero matrix gives $0$, but placing copies of $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ along the diagonal (zeros elsewhere) gives $|A| = 1$: one row exchange per pair of rows (Rule 2) leaves a diagonal matrix with entries $\\pm1$ (Rule 7). **Not enough information**.`,
  });
}

export const determinantsGens: ((rng: Rng) => Draft)[] = [
  cite(F3, det3),
  cite(RULES16, rowOpSeq),
  cite(RULES910, algebraExpr),
  cite(`${COLS}; older PYP: b_ij = 2^{i+j}a_ij`, entryScaling),
  cite(`${COLS}; Slides 3.1 Rule 9 (det p9); Slides 0B multiplication by columns`, columnCombo),
  cite(`${RULE8}; ${F3}`, singularK),
  cite("Slides 3.2 Theorem 3.1 and Exercise 3.2.1 (det p11–16); Tutorial 3 Q4", areaVolume),
  cite("Slides 3.3 Theorem 3.2 (det p17–20); PYP AY25/26 S2 Q4", transformScale),
  cite(PIVOTS, luDet),
  cite(`${PIVOTS}; older PYP: independence of [1,1,1], [a,b,c], [a²,b²,c²]`, powerRows),
  cite(`${COLS}; PYP AY24/25 S2 Q9`, structured),
  cite("Slides 3.1 Rules 1–10 (det p3–10); Tutorial 3 Q1, Q3; Slides 2.2 Theorem 2.4 (alg p10)", tfnProps),
  cite(F3, det3),
  cite(RULES16, rowOpSeq),
];
