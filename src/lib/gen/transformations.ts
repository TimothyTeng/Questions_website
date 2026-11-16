// Generators for the linear-transformations topic (Lay §1.8–1.9 + kernel/range, maps on P_n and M_2x2).
import {
  cross, det, dot, F, Frac, fromColumns, inverse, isZeroVec, mat, matEq, matmul, matTex, matvec, mscale, primitive,
  rank, transpose, vadd, vec, vscale, type Mat, type Vec,
} from "@/lib/math/frac";
import { mcq, NONE, retry, tfn, type Draft, type Rng } from "./common";

// ---------------------------------------------------------------------------------------------- helpers

const XS = ["x_1", "x_2", "x_3", "x_4"];
const YS = ["y_1", "y_2", "y_3", "y_4"];

/** Tuple "(a,\ b,\ c)". */
const tup = (v: Vec) => `(${v.map((x) => x.tex()).join(",\\ ")})`;

/** Linear form such as "2x_1 - x_2 + 3x_3" ("0" if all coefficients vanish). */
function lin(coeffs: Frac[], vars: string[]): string {
  let s = "";
  coeffs.forEach((c, i) => {
    if (c.isZero()) return;
    const a = c.abs();
    const term = `${a.eq(1) ? "" : a.tex()}${vars[i]}`;
    if (!s) s = c.n < 0 ? `-${term}` : term;
    else s += c.n < 0 ? ` - ${term}` : ` + ${term}`;
  });
  return s || "0";
}

/** "T(x_1,x_2,x_3) = (row1·x,\ row2·x)" for the map x ↦ Ax. */
function formula(A: Mat, name = "T"): string {
  const n = A[0].length;
  return `${name}(${XS.slice(0, n).join(",")}) = (${A.map((r) => lin(r, XS)).join(",\\ ")})`;
}

function randMat(rng: Rng, m: number, n: number, lo: number, hi: number): Mat {
  return Array.from({ length: m }, () => vec(Array.from({ length: n }, () => rng.int(lo, hi))));
}

const maxAbsM = (A: Mat) => Math.max(...A.flat().map((x) => Math.abs(x.valueOf())));
const zeroCol = (A: Mat) => transpose(A).some((c) => isZeroVec(c));
const zeroRow = (A: Mat) => A.some((r) => isZeroVec(r));

/** Small integer m×n matrix of rank exactly r (as a product of m×r and r×n factors). */
function matOfRank(rng: Rng, m: number, n: number, r: number, cap = 6): Mat {
  for (let t = 0; t < 300; t++) {
    const A = r === Math.min(m, n) && rng.chance(0.6) ? randMat(rng, m, n, -3, 3) : matmul(randMat(rng, m, r, -2, 2), randMat(rng, r, n, -2, 2));
    if (rank(A) !== r || maxAbsM(A) > cap || zeroCol(A) || zeroRow(A)) continue;
    return A;
  }
  retry();
}

function randNZVec(rng: Rng, n: number, lo: number, hi: number): Vec {
  return vec(Array.from({ length: n }, () => rng.nz(lo, hi)));
}

const pl = (n: number) => `\\mathbb{R}^{${n}}`;
const sz = (A: Mat) => `${A.length}\\times${A[0].length}`;

/**
 * mcq(), then rotate options (a)–(d) so the correct one sits at a slot chosen by a hash of the prompt
 * (stateless and deterministic), which keeps the answer letters evenly spread across the bank.
 */
function mcqS(rng: Rng, args: Parameters<typeof mcq>[1]): Draft {
  const d = mcq(rng, args);
  if (d.answer === 4) return d;
  let h = 0;
  for (let i = 0; i < d.prompt.length; i++) h = (h * 31 + d.prompt.charCodeAt(i)) >>> 0;
  const k = (d.answer - (h % 4) + 4) % 4;
  const head = d.options.slice(0, 4);
  const options = [...head.map((_, i) => head[(i + k) % 4]), d.options[4]];
  return { ...d, options, answer: (d.answer - k + 4) % 4 };
}

// ------------------------------------------------------------------------------- standard matrix

/** T(e_i) given; find T(x). */
function imageFromColumns(rng: Rng): Draft {
  const n = rng.pick([2, 2, 3]);
  const m = rng.pick([2, 3]);
  const A = randMat(rng, m, n, -4, 4);
  if (zeroCol(A)) retry();
  const x = randNZVec(rng, n, -3, 3);
  const cols = transpose(A);
  const correct = matvec(A, x);
  const ds: Vec[] = [
    cols.reduce((s, c, i) => vadd(s, vscale(c, x[n - 1 - i])), vec(Array(m).fill(0))),
    matvec(A, x.map((v, i) => (i === 0 ? v.neg() : v))),
    vadd(correct, cols[0]),
    cols.reduce((s, c) => vadd(s, c), vec(Array(m).fill(0))),
  ];
  if (m === n) ds.push(matvec(transpose(A), x));
  return mcqS(rng, {
    subtopic: "Standard matrix",
    prompt: `$T:${pl(n)}\\to${pl(m)}$ is linear with ${cols.map((c, i) => `$T(\\mathbf{e}_${i + 1}) = ${tup(c)}$`).join(", ")}. Find $T${tup(x)}$.`,
    correct: tup(correct),
    distractors: ds.map(tup),
    solution: `By linearity, $T${tup(x)} = ${x.map((v, i) => `(${v.tex()})T(\\mathbf{e}_${i + 1})`).join(" + ")} = ${tup(correct)}$.\nEquivalently, the standard matrix has the images as **columns**: $A = ${matTex(A)}$ and $T(\\mathbf{x}) = A\\mathbf{x}$. (Using the images as rows, or pairing the weights with the wrong images, are the usual slips.)`,
  });
}

/** A random 2×2 basis matrix [b1 b2] with small determinant, not the standard basis. */
function basis2(rng: Rng): Mat {
  for (let t = 0; t < 200; t++) {
    const P = randMat(rng, 2, 2, -3, 3);
    const d = Math.abs(det(P).valueOf());
    if (d < 1 || d > 3) continue;
    if (zeroCol(P)) continue;
    // at least one basis vector with two nonzero entries
    if (transpose(P).every((c) => c.some((x) => x.isZero()))) continue;
    return P;
  }
  retry();
}

/** T(b1), T(b2) given; find the standard matrix. */
function stdFromBasis(rng: Rng): Draft {
  const P = basis2(rng);
  const A = randMat(rng, 2, 2, -3, 3);
  if (det(A).isZero() || zeroCol(A)) retry();
  const Y = matmul(A, P);
  const Pinv = inverse(P)!;
  const [b1, b2] = transpose(P);
  const [y1, y2] = transpose(Y);
  return mcqS(rng, {
    subtopic: "Standard matrix",
    prompt: `$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T${tup(b1)} = ${tup(y1)}$ and $T${tup(b2)} = ${tup(y2)}$. What is the standard matrix of $T$?`,
    correct: matTex(A),
    distractors: [matTex(Y), matTex(transpose(Y)), matTex(transpose(A)), matTex(matmul(Pinv, Y)), matTex(matmul(Y, P))],
    solution: `Put the inputs and images as columns: $B = ${matTex(P)}$, $Y = ${matTex(Y)}$. Linearity gives $AB = Y$, so $A = YB^{-1}$ with $B^{-1} = ${matTex(Pinv)}$:\n$$A = ${matTex(Y)}${matTex(Pinv)} = ${matTex(A)}$$\nCheck: $A${tup(b1)} = ${tup(y1)}$ and $A${tup(b2)} = ${tup(y2)}$ ✓. The matrix $Y$ itself is only correct when the inputs are $\\mathbf{e}_1, \\mathbf{e}_2$.`,
  });
}

/** T(b1), T(b2) given; find T(v). */
function imageFromBasis(rng: Rng): Draft {
  const m = rng.pick([2, 3]);
  const P = basis2(rng);
  const A = randMat(rng, m, 2, -3, 3);
  if (zeroCol(A)) retry();
  const Y = matmul(A, P);
  const [b1, b2] = transpose(P);
  const [y1, y2] = transpose(Y);
  const v = randNZVec(rng, 2, -4, 4);
  const c = matvec(inverse(P)!, v);
  if (c.some((x) => x.isZero())) retry();
  const correct = matvec(A, v);
  const comb = (a: Frac, b: Frac) => vadd(vscale(y1, a), vscale(y2, b));
  return mcqS(rng, {
    subtopic: "Standard matrix",
    prompt: `$T:\\mathbb{R}^2\\to${pl(m)}$ is linear with $T${tup(b1)} = ${tup(y1)}$ and $T${tup(b2)} = ${tup(y2)}$. Find $T${tup(v)}$.`,
    correct: tup(correct),
    distractors: [comb(v[0], v[1]), comb(c[0], c[1].neg()), comb(c[1], c[0]), comb(c[0].neg(), c[1]), vadd(y1, y2)].map(tup),
    solution: `First write $${tup(v)} = c_1${tup(b1)} + c_2${tup(b2)}$: solving gives $c_1 = ${c[0].tex()}$, $c_2 = ${c[1].tex()}$.\nThen $T${tup(v)} = c_1T${tup(b1)} + c_2T${tup(b2)} = ${c[0].tex()}${tup(y1)} + (${c[1].tex()})${tup(y2)} = ${tup(correct)}$.\n(Using the entries of $${tup(v)}$ themselves as the weights is only valid for the standard basis.)`,
  });
}

// ------------------------------------------------------------------------- geometric & composition

interface Named {
  name: string;
  M: Mat;
}

function geoPool(rng: Rng): Named[] {
  const k = rng.pick([1, 2, 3, -1, -2]);
  const s = rng.pick([2, 3]);
  const kx = (v: string) => `${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}${v}`;
  return [
    { name: "rotates points $90^\\circ$ counter-clockwise", M: mat([[0, -1], [1, 0]]) },
    { name: "rotates points $90^\\circ$ clockwise", M: mat([[0, 1], [-1, 0]]) },
    { name: "reflects points across the $x_1$-axis", M: mat([[1, 0], [0, -1]]) },
    { name: "reflects points across the $x_2$-axis", M: mat([[-1, 0], [0, 1]]) },
    { name: "reflects points across the line $y = x$", M: mat([[0, 1], [1, 0]]) },
    { name: "reflects points across the line $y = -x$", M: mat([[0, -1], [-1, 0]]) },
    { name: "projects points onto the $x_1$-axis", M: mat([[1, 0], [0, 0]]) },
    { name: "projects points onto the $x_2$-axis", M: mat([[0, 0], [0, 1]]) },
    { name: `applies the horizontal shear $x_1\\mapsto x_1 ${kx("x_2")}$`, M: mat([[1, k], [0, 1]]) },
    { name: `applies the vertical shear $x_2\\mapsto x_2 ${kx("x_1")}$`, M: mat([[1, 0], [k, 1]]) },
    { name: `stretches horizontally by a factor of $${s}$`, M: mat([[s, 0], [0, 1]]) },
  ];
}

function pickTwo(rng: Rng): [Named, Named] {
  const pool = rng.shuffle(geoPool(rng));
  return [pool[0], pool[1]];
}

function compositionMatrix(rng: Rng): Draft {
  const [t, s] = pickTwo(rng);
  const A = t.M, B = s.M;
  const BA = matmul(B, A), AB = matmul(A, B);
  if (matEq(BA, AB)) retry();
  return mcqS(rng, {
    subtopic: "Composition",
    prompt: `$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first ${t.name} and then ${s.name}. What is the standard matrix of $T$?`,
    correct: matTex(BA),
    distractors: [matTex(AB), matTex(transpose(BA)), matTex(A), matTex(B), matTex(mscale(BA, -1))],
    solution: `First map: $A = ${matTex(A)}$. Second map: $B = ${matTex(B)}$.\nThe map applied first sits on the right: $BA = ${matTex(B)}${matTex(A)} = ${matTex(BA)}$.\nThe other order gives $AB = ${matTex(AB)}$, which is a different map, so the order matters here.`,
  });
}

function compositionImage(rng: Rng): Draft {
  const [t, s] = pickTwo(rng);
  const A = t.M, B = s.M;
  const x = randNZVec(rng, 2, -4, 4);
  const Ax = matvec(A, x);
  const BAx = matvec(B, Ax);
  const ABx = matvec(A, matvec(B, x));
  if (BAx.every((v, i) => v.eq(ABx[i]))) retry();
  return mcqS(rng, {
    subtopic: "Composition",
    prompt: `$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first ${t.name} and then ${s.name}. Find $T${tup(x)}$.`,
    correct: tup(BAx),
    distractors: [tup(ABx), tup(Ax), tup(matvec(B, x)), tup(vscale(BAx, -1)), tup(matvec(transpose(matmul(B, A)), x))],
    solution: `Follow the point: the first map sends $${tup(x)}\\mapsto${tup(Ax)}$ (matrix $${matTex(A)}$), and the second sends $${tup(Ax)}\\mapsto${tup(BAx)}$ (matrix $${matTex(B)}$).\nSo $T${tup(x)} = BA\\mathbf{x} = ${tup(BAx)}$. Doing the steps in the other order would give $${tup(ABx)}$.`,
  });
}

// exact trig values: value = q * sqrt(r)
interface Surd {
  q: Frac;
  r: 1 | 2 | 3;
}
const S = (n: number, d: number, r: 1 | 2 | 3): Surd => ({ q: F(n, d), r });
const ANGLES: { deg: number; rad: string; c: Surd; s: Surd }[] = [
  { deg: 30, rad: "\\pi/6", c: S(1, 2, 3), s: S(1, 2, 1) },
  { deg: 45, rad: "\\pi/4", c: S(1, 2, 2), s: S(1, 2, 2) },
  { deg: 60, rad: "\\pi/3", c: S(1, 2, 1), s: S(1, 2, 3) },
  { deg: 120, rad: "2\\pi/3", c: S(-1, 2, 1), s: S(1, 2, 3) },
  { deg: 135, rad: "3\\pi/4", c: S(-1, 2, 2), s: S(1, 2, 2) },
  { deg: 150, rad: "5\\pi/6", c: S(-1, 2, 3), s: S(1, 2, 1) },
];

function surdTex(x: Surd): string {
  if (x.q.isZero()) return "0";
  if (x.r === 1) return x.q.tex();
  const sign = x.q.n < 0 ? "-" : "";
  const num = Math.abs(x.q.n);
  const top = `${num === 1 ? "" : num}\\sqrt{${x.r}}`;
  return x.q.d === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${x.q.d}}`;
}
const sm = (x: Surd, k: number): Surd => ({ q: x.q.mul(k), r: x.r });
const m2 = (a: Surd, b: Surd, c: Surd, d: Surd) =>
  `\\begin{bmatrix} ${surdTex(a)} & ${surdTex(b)} \\\\ ${surdTex(c)} & ${surdTex(d)} \\end{bmatrix}`;

function rotationMatrix(rng: Rng): Draft {
  const a = rng.pick(ANGLES);
  const cw = rng.chance(0.5);
  const k = rng.pick([1, 1, 2, 3]);
  const c = sm(a.c, k);
  const s = sm(a.s, cw ? -k : k); // signed sin(θ)·k
  const correct = m2(c, sm(s, -1), s, c);
  const kc = k === 1 ? "" : ` and then dilates by a factor of $${k}$`;
  const ds = [
    m2(c, s, sm(s, -1), c), // opposite direction
    m2(s, sm(c, -1), c, s), // sin/cos swapped
    m2(c, s, s, sm(c, -1)), // reflection pattern
    m2(sm(c, -1), s, sm(s, -1), sm(c, -1)), // negated
  ];
  if (k !== 1) ds.push(m2(a.c, sm(a.s, cw ? 1 : -1), sm(a.s, cw ? -1 : 1), a.c));
  return mcqS(rng, {
    subtopic: "Geometric transformations",
    prompt: `$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ rotates points through $${a.rad}$ radians ${cw ? "**clockwise**" : "counter-clockwise"} about the origin${kc}. What is the standard matrix of $T$?`,
    correct,
    distractors: ds,
    solution: `${cw ? `Clockwise means $\\theta = -${a.rad}$, so $\\sin\\theta = ${surdTex(sm(a.s, -1))}$` : `$\\theta = ${a.rad}$, so $\\sin\\theta = ${surdTex(a.s)}$`} and $\\cos\\theta = ${surdTex(a.c)}$.\n$R_\\theta = \\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$${k === 1 ? "" : `, then multiply by $${k}$ for the dilation (dilation $kI$ commutes with everything)`}, giving $${correct}$.\nSanity check: the first column is the image of $\\mathbf{e}_1$, which should point ${cw ? "below" : "above"} the $x_1$-axis.`,
  });
}

// ------------------------------------------------------------------------------ kernel and range

function kernelVector(rng: Rng): Draft {
  const m = rng.pick([2, 3, 4]);
  const r1 = randNZVec(rng, 3, -3, 3);
  const r2 = vec(Array.from({ length: 3 }, () => rng.int(-3, 3)));
  const kv = primitive(cross(r1, r2));
  if (isZeroVec(kv) || Math.max(...kv.map((x) => Math.abs(x.valueOf()))) > 5) retry();
  const rows: Vec[] = [r1, r2];
  while (rows.length < m) {
    const a = rng.int(-2, 2), b = rng.int(-2, 2);
    if (a === 0 && b === 0) continue;
    const r = vadd(vscale(r1, a), vscale(r2, b));
    if (isZeroVec(r) || Math.max(...r.map((x) => Math.abs(x.valueOf()))) > 6) continue;
    rows.push(r);
  }
  const A = rng.shuffle(rows);
  const correct = vscale(kv, rng.pick([1, -1, 2]));
  const notKer = (d: Vec) => !isZeroVec(matvec(A, d));
  const ds: string[] = [];
  for (let i = 0; i < 3; i++) {
    const d = correct.map((x, j) => (j === i ? x.neg() : x));
    if (notKer(d)) ds.push(tup(d));
  }
  ds.push(tup(r1));
  for (let t = 0; t < 20 && ds.length < 7; t++) {
    const d = randNZVec(rng, 3, -3, 3);
    if (notKer(d)) ds.push(tup(d));
  }
  if (m !== 3) ds.unshift(tup(m === 2 ? vec([correct[0].valueOf(), correct[1].valueOf()]) : [...correct, F(0)]));
  return mcqS(rng, {
    subtopic: "Kernel & range",
    prompt: `Let $T:\\mathbb{R}^3\\to${pl(m)}$ be defined by $${formula(A)}$. Which vector lies in $\\ker T$?`,
    correct: tup(correct),
    distractors: ds.slice(0, 6),
    solution: `$\\ker T$ is the solution set of $A\\mathbf{x} = \\mathbf{0}$ with $A = ${matTex(A)}$. Row reduction shows rank 2, so $\\dim\\ker T = 3 - 2 = 1$ and $\\ker T = \\operatorname{Span}\\{${tup(kv)}\\}$.\nCheck: $T${tup(correct)} = ${tup(matvec(A, correct))}$ ✓. Every other option gives a nonzero image${m !== 3 ? `, and a vector with ${m} entries is not even in the domain $\\mathbb{R}^3$` : ""}.`,
  });
}

function rankNullity(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const m = rng.pick([2, 3, 4]);
  const r = rng.int(1, Math.min(m, n));
  const A = matOfRank(rng, m, n, r);
  const opt = (a: number, b: number) => `\\operatorname{rank}T = ${a},\\ \\operatorname{nullity}T = ${b}`;
  const cands: [number, number][] = [[r, m - r], [n - r, r], [r + 1, n - r - 1], [r - 1, n - r + 1], [Math.min(m, n), n - Math.min(m, n)], [r, n - r + 1]];
  return mcqS(rng, {
    subtopic: "Rank–nullity",
    prompt: `Find the rank and nullity of the linear transformation $T:${pl(n)}\\to${pl(m)}$, $${formula(A)}$.`,
    correct: opt(r, n - r),
    distractors: cands.filter(([a, b]) => a >= 0 && b >= 0).map(([a, b]) => opt(a, b)),
    solution: `The standard matrix is $A = ${matTex(A)}$ (${sz(A)}). Row reducing gives ${r} pivot${r === 1 ? "" : "s"}, so $\\operatorname{rank}T = ${r}$.\nRank–nullity uses the dimension of the **domain** $${pl(n)}$: $\\operatorname{nullity}T = ${n} - ${r} = ${n - r}$.`,
  });
}

function oneToOneOnto(rng: Rng): Draft {
  const m = rng.pick([2, 3, 3, 4]);
  const n = rng.pick([2, 3, 3, 4]);
  const full = Math.min(m, n);
  const r = rng.chance(0.65) ? full : rng.int(1, full);
  const A = matOfRank(rng, m, n, r);
  const inj = r === n, sur = r === m;
  const options = ["one-to-one and onto", "one-to-one but not onto", "onto but not one-to-one", "neither one-to-one nor onto", NONE];
  const answer = inj && sur ? 0 : inj ? 1 : sur ? 2 : 3;
  return {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt: `Let $A = ${matTex(A)}$ and $T(\\mathbf{x}) = A\\mathbf{x}$, so $T:${pl(n)}\\to${pl(m)}$. Then $T$ is`,
    options,
    answer,
    solution: `Row reducing $A$ (${sz(A)}) gives ${r} pivot${r === 1 ? "" : "s"}.\n- One-to-one needs a pivot in every **column** (${n}): ${inj ? "yes" : "no"}${inj ? "" : `, since $\\dim\\ker T = ${n} - ${r} = ${n - r} > 0$`}.\n- Onto $${pl(m)}$ needs a pivot in every **row** (${m}): ${sur ? "yes" : "no"}${sur ? "" : `, since the range has dimension ${r} < ${m}`}.\nSo $T$ is **${options[answer]}**.`,
  };
}

function rangeParam(rng: Rng): Draft {
  const A = randMat(rng, 3, 2, -3, 3);
  if (rank(A) < 2 || det(A.slice(0, 2)).isZero()) retry();
  const x = randNZVec(rng, 2, -3, 3);
  const b = matvec(A, x);
  const k = b[2];
  const swapped = dot(A[2], [x[1], x[0]]);
  return mcqS(rng, {
    subtopic: "Kernel & range",
    prompt: `Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = ${matTex(A)}$. For which value of $k$ is $\\mathbf{b} = ${tup([b[0], b[1]]).replace(/\)$/, ",\\ k)")}$ in the range of $T$?`,
    correct: `k = ${k.tex()}`,
    distractors: [k.neg(), k.add(1), k.sub(1), swapped, k.add(2)].map((v) => `k = ${v.tex()}`).concat(["\\text{every real } k"]),
    solution: `$\\mathbf{b}$ is in the range iff $A\\mathbf{x} = \\mathbf{b}$ is consistent. The first two rows give $${lin(A[0], XS)} = ${b[0].tex()}$ and $${lin(A[1], XS)} = ${b[1].tex()}$, so $\\mathbf{x} = ${tup(x)}$.\nThe third row must then agree: $k = ${lin(A[2], XS)} = ${k.tex()}$ at this $\\mathbf{x}$.\nThe range is only a plane in $\\mathbb{R}^3$ (rank 2), so not every $k$ works.`,
  });
}

function preimage(rng: Rng): Draft {
  const m = rng.pick([2, 3, 3]);
  const A = randMat(rng, m, 2, -3, 3);
  if (rank(A) < 2) retry();
  const x = randNZVec(rng, 2, -3, 3);
  if (x[0].eq(x[1])) retry();
  const b = matvec(A, x);
  return mcqS(rng, {
    subtopic: "Matrix transformations",
    prompt: `Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = ${matTex(A)}$. Find $\\mathbf{x}$ such that $T(\\mathbf{x}) = ${tup(b)}$.`,
    correct: tup(x),
    distractors: [vec([x[1].valueOf(), x[0].valueOf()]), [x[0].neg(), x[1]], [x[0], x[1].neg()], [b[0], b[1]], vadd(x, vec([1, 0]))].map(tup),
    solution: `Solve $A\\mathbf{x} = \\mathbf{b}$ by row reducing $[A\\ |\\ \\mathbf{b}]$. This gives $\\mathbf{x} = ${tup(x)}$.\nCheck: $A${tup(x)} = ${tup(matvec(A, x))}$ ✓. The columns of $A$ are independent, so $T$ is one-to-one and this $\\mathbf{x}$ is the only solution.`,
  });
}

// --------------------------------------------------------------------------------- linearity / inverse

interface Comp {
  a: number;
  b: number;
  c: number; // constant
  p: number; // coefficient of x1 x2
  q: number; // coefficient of x2^2
}
function compTex(t: Comp): string {
  let s = lin([F(t.a), F(t.b)], XS);
  const add = (coef: number, body: string) => {
    if (!coef) return;
    const a = Math.abs(coef);
    const term = body ? `${a === 1 ? "" : a}${body}` : `${a}`;
    if (s === "0") s = coef < 0 ? `-${term}` : term;
    else s += coef < 0 ? ` - ${term}` : ` + ${term}`;
  };
  add(t.p, "x_1x_2");
  add(t.q, "x_2^2");
  add(t.c, "");
  return s;
}
const compAt = (t: Comp, x1: number, x2: number) => t.a * x1 + t.b * x2 + t.c + t.p * x1 * x2 + t.q * x2 * x2;

function linearityTFN(rng: Rng): Draft {
  const k = rng.pick([2, 2, 3]);
  const comps: Comp[] = Array.from({ length: k }, () => ({ a: rng.int(-3, 3), b: rng.int(-3, 3), c: 0, p: 0, q: 0 }));
  if (comps.every((t) => t.a === 0 && t.b === 0)) retry();
  const kind = rng.pick(["linear", "linear", "const", "prod", "square"]);
  const i = rng.int(0, k - 1);
  if (kind === "const") comps[i].c = rng.nz(-4, 4);
  if (kind === "prod") comps[i].p = rng.nz(-2, 2);
  if (kind === "square") comps[i].q = rng.nz(-2, 2);
  const T = `T(x_1,x_2) = (${comps.map(compTex).join(",\\ ")})`;
  const at = (x1: number, x2: number) => `(${comps.map((t) => compAt(t, x1, x2)).join(",\\ ")})`;
  let solution: string;
  if (kind === "linear") {
    solution = `Every entry is a combination of $x_1, x_2$ with no constant, product or power term, so $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = ${matTex(comps.map((t) => vec([t.a, t.b])))}$. Matrix transformations are linear: **True**.`;
  } else if (kind === "const") {
    solution = `$T(0,0) = ${at(0, 0)} \\ne \\mathbf{0}$. A linear map must send $\\mathbf{0}$ to $\\mathbf{0}$, so $T$ is not linear: **False**.`;
  } else {
    solution = `$T(\\mathbf{0}) = \\mathbf{0}$, so the zero test is inconclusive. Test scaling with $\\mathbf{u} = (1,1)$ and $c = 2$: $T(2,2) = ${at(2, 2)}$, but $2T(1,1) = 2${at(1, 1)} = (${comps.map((t) => 2 * compAt(t, 1, 1)).join(",\\ ")})$. These differ because of the ${kind === "prod" ? "product $x_1x_2$" : "square $x_2^2$"}, so $T$ is not linear: **False**.`;
  }
  return tfn({
    subtopic: "Linearity",
    prompt: `The map $T:\\mathbb{R}^2\\to${pl(k)}$ given by $${T}$ is a linear transformation.`,
    answer: kind === "linear" ? 0 : 1,
    solution,
  });
}

function inverseFormula(rng: Rng): Draft {
  let A: Mat | null = null;
  for (let t = 0; t < 500 && !A; t++) {
    const C = randMat(rng, 2, 2, -4, 5);
    if (![1, -1, 2, -2].includes(det(C).valueOf())) continue;
    if ((C[0][1].isZero() && C[1][0].isZero()) || zeroRow(C)) continue;
    A = C;
  }
  if (!A) retry();
  const d = det(A);
  const inv = inverse(A)!;
  const show = (M: Mat) => `(${M.map((r) => lin(r, YS)).join(",\\ ")})`;
  const [[a, b], [c, e]] = A;
  const adjNoSign = [[e, b], [c, a]].map((r) => r.map((x) => x.div(d)));
  return mcqS(rng, {
    subtopic: "Invertible transformations",
    prompt: `$T:\\mathbb{R}^2\\to\\mathbb{R}^2$, $${formula(A)}$. Find $T^{-1}(y_1,y_2)$.`,
    correct: show(inv),
    distractors: [show(transpose(inv)), show(mscale(inv, -1)), show(adjNoSign), show(A), show(mscale(inv, d))],
    solution: `$A = ${matTex(A)}$ has $ad - bc = ${d.tex()} \\ne 0$, so $T$ is invertible with $T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y}$:\n$$A^{-1} = \\frac{1}{${d.tex()}}\\begin{bmatrix} ${e.tex()} & ${b.neg().tex()} \\\\ ${c.neg().tex()} & ${a.tex()} \\end{bmatrix} = ${matTex(inv)}$$\nSo $T^{-1}(y_1,y_2) = ${show(inv)}$. Check: $T^{-1}(T(\\mathbf{e}_1)) = A^{-1}${tup(transpose(A)[0])} = (1,\\ 0)$ ✓.`,
  });
}

// ------------------------------------------------------------------------ P_n and M_{2x2}

const basisTex = (n: number) => `\\{${["1", "x", ...Array.from({ length: n - 1 }, (_, i) => `x^${i + 2}`)].slice(0, n + 1).join(", ")}\\}`;
const polyMul = (p: Frac[], q: Frac[]) => {
  const out = Array.from({ length: p.length + q.length - 1 }, () => F(0));
  p.forEach((a, i) => q.forEach((b, j) => (out[i + j] = out[i + j].add(a.mul(b)))));
  return out;
};
const pad = (p: Frac[], len: number) => [...p, ...Array.from({ length: Math.max(0, len - p.length) }, () => F(0))].slice(0, len);
const sgnC = (c: number) => (c < 0 ? `- ${-c}` : `+ ${c}`);

function polyMatrix(rng: Rng): Draft {
  const kind = rng.pick(["quad", "lin", "deriv"]);
  const c = rng.nz(-4, 4);
  let n: number, m: number, rule: string;
  let mult: Frac[] | null = null;
  if (kind === "quad") {
    n = rng.pick([1, 2]);
    m = n + 2;
    mult = vec([c, 0, 1]);
    rule = `(x^2 ${sgnC(c)})\\,p(x)`;
  } else if (kind === "lin") {
    n = rng.pick([2, 3]);
    m = n + 1;
    mult = vec([c, 1]);
    rule = `(x ${sgnC(c)})\\,p(x)`;
  } else {
    n = rng.pick([2, 3]);
    m = n;
    rule = `p'(x) ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}\\,p(x)`;
  }
  const image = (j: number, cc: number, dfac = true): Frac[] => {
    const basis = Array.from({ length: j + 1 }, (_, i) => F(i === j ? 1 : 0));
    if (mult) return pad(polyMul(basis, vec([cc, ...mult.slice(1).map((x) => x.valueOf())])), m + 1);
    const out = basis.map((x) => x.mul(cc));
    if (j > 0) out[j - 1] = out[j - 1].add(dfac ? j : 1);
    return pad(out, m + 1);
  };
  const build = (cc: number, dfac = true) => fromColumns(Array.from({ length: n + 1 }, (_, j) => image(j, cc, dfac)));
  const M = build(c);
  const rev = (X: Mat) => [...X].reverse().map((r) => [...r].reverse());
  const ds = [matTex(transpose(M)), matTex(rev(M)), matTex(build(-c))];
  if (kind === "deriv") ds.push(matTex(build(c, false)));
  else ds.push(matTex(fromColumns(Array.from({ length: n + 1 }, (_, j) => pad(image(j, c).slice(1), m + 1)))));
  const polyTex = (p: Frac[]) => {
    let s = "";
    p.forEach((a, i) => {
      if (a.isZero()) return;
      const mon = i === 0 ? "" : i === 1 ? "x" : `x^${i}`;
      const abs = a.abs();
      const term = mon ? `${abs.eq(1) ? "" : abs.tex()}${mon}` : abs.tex();
      if (!s) s = a.n < 0 ? `-${term}` : term;
      else s += a.n < 0 ? ` - ${term}` : ` + ${term}`;
    });
    return s || "0";
  };
  const lines = Array.from({ length: n + 1 }, (_, j) => {
    const b = j === 0 ? "1" : j === 1 ? "x" : `x^${j}`;
    const img = image(j, c);
    return `$T(${b}) = ${polyTex(img)}$, with coordinates $${tup(img)}$`;
  });
  return mcqS(rng, {
    subtopic: "General vector spaces",
    prompt: `Let $T:P_${n}\\to P_${m}$ be defined by $T(p) = ${rule}$. Find the matrix of $T$ relative to the bases $${basisTex(n)}$ and $${basisTex(m)}$.`,
    correct: matTex(M),
    distractors: ds,
    solution: `Apply $T$ to each basis polynomial and write the result in coordinates:\n${lines.map((l) => `- ${l}`).join("\n")}\nThese coordinate vectors are the **columns**, so the matrix is $(\\dim P_${m})\\times(\\dim P_${n}) = ${m + 1}\\times${n + 1}$:\n$$${matTex(M)}$$`,
  });
}

function m22Dims(rng: Rng): Draft {
  const r = rng.pick([1, 2, 2, 3, 3]);
  let A: Mat | null = null;
  for (let t = 0; t < 300 && !A; t++) {
    const C = matmul(randMat(rng, 4, r, -1, 1), randMat(rng, r, 4, -1, 2));
    if (rank(C) !== r || maxAbsM(C) > 3 || zeroCol(C)) continue;
    if (C.filter((row) => isZeroVec(row)).length > 1) continue;
    A = C;
  }
  if (!A) retry();
  const V = ["a", "b", "c", "d"];
  const f = A.map((row) => lin(row, V));
  const opt = (k: number, g: number) => `\\dim\\ker T = ${k},\\ \\dim\\operatorname{range}T = ${g}`;
  const cands: [number, number][] = [[r, 4 - r], [3 - r, r + 1], [5 - r, r - 1], [0, 4], [4, 0], [3 - r, r], [4 - r, r - 1]];
  return mcqS(rng, {
    subtopic: "General vector spaces",
    prompt: `Let $T:M_{2\\times2}\\to M_{2\\times2}$ be the linear transformation $T\\left(\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\right) = \\begin{bmatrix} ${f[0]} & ${f[1]} \\\\ ${f[2]} & ${f[3]} \\end{bmatrix}$. Find the dimensions of $\\ker T$ and $\\operatorname{range}T$.`,
    correct: opt(4 - r, r),
    distractors: cands.filter(([k, g]) => k >= 0 && g >= 0 && k + g <= 4).map(([k, g]) => opt(k, g)),
    solution: `In coordinates with respect to $\\{E_{11}, E_{12}, E_{21}, E_{22}\\}$, a matrix becomes $(a,b,c,d)$ and $T$ has matrix $${matTex(A)}$ (row $i$ = coefficients of output entry $i$).\nRow reduction gives rank ${r}, so $\\dim\\operatorname{range}T = ${r}$. Rank–nullity on $\\dim M_{2\\times2} = 4$ then gives $\\dim\\ker T = ${4 - r}$.`,
  });
}

export const transformationsGens: ((rng: Rng) => Draft)[] = [
  imageFromColumns, stdFromBasis, imageFromBasis, compositionMatrix, compositionImage, rotationMatrix,
  kernelVector, rankNullity, oneToOneOnto, rangeParam, preimage, linearityTFN, inverseFormula, polyMatrix, m22Dims,
];
