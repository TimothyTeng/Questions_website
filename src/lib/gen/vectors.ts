import { cross, dot, F, Frac, isZeroVec, primitive, rowTex, rowTexPlain, sqrtTex, vadd, vec, Vec, vscale, vsub } from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";
import { maxAbs, orthPair, parallel, pythVec, randVec } from "./shared";

// Every generator carries a ref to the course materials it is built on (slides Ch 0A, Tutorial 0A, past papers).
const cite = (ref: string, g: (rng: Rng) => Draft) => (rng: Rng): Draft => ({ ...g(rng), ref });

// ---------- local formatting helpers ----------

/** Point as (a, b, c). */
const P = (v: Vec) => `(${v.map((x) => x.tex()).join(",\\ ")})`;
/** Vector as [a, b, c]^T. */
const V = rowTexPlain;
const XYZ = ["x", "y", "z"];

/** Linear form a x + b y + c z (no right-hand side). */
function lin(n: Vec, vars = XYZ): string {
  let s = "";
  n.forEach((c, i) => {
    if (c.isZero()) return;
    const abs = c.abs();
    const coef = abs.eq(1) ? "" : abs.tex();
    if (!s) s = `${c.n < 0 ? "-" : ""}${coef}${vars[i]}`;
    else s += ` ${c.n < 0 ? "-" : "+"} ${coef}${vars[i]}`;
  });
  return s || "0";
}
const planeTex = (n: Vec, d: Frac) => `${lin(n)} = ${d.tex()}`;

/** "p + c t" with tidy signs. */
function affine(p: Frac, c: Frac, t = "t"): string {
  if (c.isZero()) return p.tex();
  const abs = c.abs();
  const ct = `${abs.eq(1) ? "" : abs.tex()}${t}`;
  if (p.isZero()) return `${c.n < 0 ? "-" : ""}${ct}`;
  return `${p.tex()} ${c.n < 0 ? "-" : "+"} ${ct}`;
}
const lineParam = (p: Vec, d: Vec, t = "t") => p.map((x, i) => `${XYZ[i]} = ${affine(x, d[i], t)}`).join(",\\ ");

/** "p + a t1 + b t2" with tidy signs. */
function affine2(p: Frac, a: Frac, b: Frac): string {
  const terms: string[] = [];
  if (!p.isZero()) terms.push(p.tex());
  for (const [c, t] of [[a, "t_1"], [b, "t_2"]] as [Frac, string][]) {
    if (c.isZero()) continue;
    const abs = c.abs();
    const ct = `${abs.eq(1) ? "" : abs.tex()}${t}`;
    terms.push(terms.length ? `${c.n < 0 ? "-" : "+"} ${ct}` : `${c.n < 0 ? "-" : ""}${ct}`);
  }
  return terms.join(" ") || "0";
}
const planeParam = (p: Vec, a: Vec, b: Vec) => p.map((x, i) => `${XYZ[i]} = ${affine2(x, a[i], b[i])}`).join(",\\ ");
const planeVecTex = (p: Vec, a: Vec, b: Vec) => `\\mathbf{x} = ${isZeroVec(p) ? "" : `${V(p)} + `}t_1${V(a)} + t_2${V(b)}`;

/** coef * sqrt(rad), simplified, as LaTeX. */
function surdTex(coef: Frac, rad: number): string {
  if (coef.isZero() || rad === 0) return "0";
  let s = 1;
  let r = rad;
  for (let f = 2; f * f <= r; f++) while (r % (f * f) === 0) { s *= f; r /= f * f; }
  const c = coef.mul(s);
  if (r === 1) return c.tex();
  const sign = c.n < 0 ? "-" : "";
  const num = Math.abs(c.n) === 1 ? `\\sqrt{${r}}` : `${Math.abs(c.n)}\\sqrt{${r}}`;
  return c.d === 1 ? `${sign}${num}` : `${sign}\\frac{${num}}{${c.d}}`;
}

/** Same plane? (normals proportional and right-hand sides in the same ratio) */
function samePlane(n1: Vec, d1: Frac, n2: Vec, d2: Frac): boolean {
  if (!parallel(n1, n2)) return false;
  const i = n1.findIndex((x) => !x.isZero());
  const k = n2[i].div(n1[i]);
  return d1.mul(k).eq(d2);
}
/** Equation n.x = d of the plane x0 + t1 a + t2 b (internal check only; a, b noncollinear). */
const eqOf = (x0: Vec, a: Vec, b: Vec): [Vec, Frac] => {
  const n = cross(a, b);
  return [n, dot(n, x0)];
};

// ---------- generators ----------

function linComb(rng: Rng): Draft {
  const u = randVec(rng, 3, -3, 3);
  const v = randVec(rng, 3, -3, 3);
  if (parallel(u, v) || u.filter((x) => !x.isZero()).length < 2 || v.filter((x) => !x.isZero()).length < 2) retry();
  const a = F(rng.nz(-3, 3));
  const b = F(rng.nz(-3, 3));
  if (a.eq(b)) retry();
  const w = vadd(vscale(u, a), vscale(v, b));
  if (maxAbs(w) > 14) retry();
  const sys = [0, 1, 2].map((i) => `${lin([u[i], v[i]], ["a", "b"])} = ${w[i].tex()}`).join(",\\quad ");
  if (rng.chance(0.5)) {
    const opt = (x: Frac, y: Frac) => `a = ${x.tex()},\\ b = ${y.tex()}`;
    return mcq(rng, {
      subtopic: "Linear combinations",
      prompt: `Let $\\mathbf{u} = ${V(u)}$, $\\mathbf{v} = ${V(v)}$ and $\\mathbf{w} = ${V(w)}$. Find scalars $a, b$ such that $a\\mathbf{u} + b\\mathbf{v} = \\mathbf{w}$.`,
      correct: opt(a, b),
      distractors: [opt(b, a), opt(a.neg(), b), opt(a, b.neg()), opt(a.neg(), b.neg()), opt(a.add(1), b)],
      solution: `Equate components:\n$$${sys}$$\nSolving gives $a = ${a.tex()}$, $b = ${b.tex()}$, and all three equations hold (always check the equation you did not use).\nCheck: $${a.eq(1) ? "" : a.eq(-1) ? "-" : a.tex()}${V(u)} ${b.n < 0 ? "-" : "+"} ${b.abs().eq(1) ? "" : b.abs().tex()}${V(v)} = ${V(w)}$.`,
    });
  }
  // unknown component h
  const i = rng.int(0, 2);
  const h = w[i];
  const wTex = `[${w.map((x, j) => (j === i ? "h" : x.tex())).join(",\\ ")}]^T`;
  const others = [0, 1, 2].filter((j) => j !== i);
  return mcq(rng, {
    subtopic: "Linear combinations",
    prompt: `Let $\\mathbf{u} = ${V(u)}$, $\\mathbf{v} = ${V(v)}$ and $\\mathbf{w} = ${wTex}$. For which value of $h$ is $\\mathbf{w}$ a linear combination of $\\mathbf{u}$ and $\\mathbf{v}$?`,
    correct: `h = ${h.tex()}`,
    distractors: [
      `h = ${h.neg().tex()}`,
      `h = ${b.mul(u[i]).add(a.mul(v[i])).tex()}`,
      `h = ${a.mul(u[i]).sub(b.mul(v[i])).tex()}`,
      `h = ${h.add(rng.pick([1, -1, 2])).tex()}`,
    ],
    solution: `The components without $h$ give ${others.map((j) => `$${lin([u[j], v[j]], ["a", "b"])} = ${w[j].tex()}$`).join(" and ")}, so $a = ${a.tex()}$, $b = ${b.tex()}$.\nThe remaining component must then match: $h = ${a.tex()}(${u[i].tex()}) + (${b.tex()})(${v[i].tex()}) = ${h.tex()}$. For any other $h$ the equations are inconsistent.`,
  });
}

function initialPoint(rng: Rng): Draft {
  const { v, norm } = pythVec(rng, 3);
  const k = rng.pick([1, 2, 3]);
  const opp = rng.chance(0.6);
  const s = opp ? -k : k;
  const u = vscale(v, s);
  const Q = randVec(rng, 3, -5, 5);
  const Pp = vsub(Q, u);
  return mcq(rng, {
    subtopic: "Components",
    prompt: `A vector $\\mathbf{u}$ of length $${k * norm}$ has terminal point $Q${P(Q)}$ and is ${opp ? "oppositely directed to" : "in the same direction as"} $\\mathbf{v} = ${V(v)}$. Find the initial point of $\\mathbf{u}$.`,
    correct: P(Pp),
    distractors: [P(vadd(Q, u)), P(vsub(u, Q)), P(vadd(Q, vscale(v, opp ? 1 : -1))), P(vadd(Q, vscale(v, opp ? -1 : 1))), P(vscale(Pp, -1))],
    solution: `$\\|\\mathbf{v}\\| = ${norm}$, so $\\mathbf{u} = ${s < 0 ? "-" : ""}\\dfrac{${k * norm}}{${norm}}\\mathbf{v} = ${V(u)}$ (a scalar multiple has length $|k|$ times the length of $\\mathbf{v}$).\nSince $\\mathbf{u} = \\overrightarrow{PQ} = Q - P$ (terminal minus initial), $P = Q - \\mathbf{u} = ${P(Pp)}$. ($Q + \\mathbf{u}$ is the usual sign slip.)`,
  });
}

function unitVec(rng: Rng): Draft {
  const { v, norm } = pythVec(rng, rng.pick([3, 3, 4]) as 3 | 4);
  const opp = rng.chance(0.5);
  const L = rng.pick([1, 1, 2, 3, 5]);
  const s = opp ? -L : L;
  const ans = vscale(v, F(s, norm));
  const what = L === 1 ? "the unit vector" : `the vector of length $${L}$`;
  return mcq(rng, {
    subtopic: "Norm & unit vectors",
    prompt: `Find ${what} ${opp ? "oppositely directed to" : "in the same direction as"} $\\mathbf{v} = ${V(v)}$.`,
    correct: rowTex(ans),
    distractors: [
      rowTex(vscale(ans, -1)),
      rowTex(vscale(v, F(s, norm * norm))),
      rowTex(vscale(v, s)),
      rowTex(vscale(v.map((x) => x.abs()), F(s, norm))),
      rowTex(vscale(v, F(s, norm + 1))),
    ],
    solution: `$\\|\\mathbf{v}\\| = \\sqrt{${v.map((x) => x.mul(x).tex()).join("+")}} = ${norm}$.\nNormalizing: the answer is $${s < 0 ? "-" : ""}${L === 1 ? "" : L}\\dfrac{1}{\\|\\mathbf{v}\\|}\\mathbf{v} = ${rowTex(ans)}$ (divide by $\\|\\mathbf{v}\\|$, not $\\|\\mathbf{v}\\|^2$${opp ? ", and flip the sign for the opposite direction" : ""}).`,
  });
}

/** Tutorial 0A Q3/Q4: norm of a combination, or the distance between two vectors. */
function normCombo(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  if (rng.chance(0.4)) {
    const u = randVec(rng, n, -4, 5);
    const v = randVec(rng, n, -4, 5);
    const d = vsub(u, v);
    if (isZeroVec(d)) retry();
    const dd = dot(d, d);
    const sumAbs = d.reduce((s, x) => s.add(x.abs()), F(0));
    const plus = vadd(u, v);
    return mcq(rng, {
      subtopic: "Norm & unit vectors",
      prompt: `Find the distance $d(\\mathbf{u},\\mathbf{v})$ between $\\mathbf{u} = ${V(u)}$ and $\\mathbf{v} = ${V(v)}$.`,
      correct: sqrtTex(dd),
      distractors: [dd.tex(), sumAbs.tex(), sqrtTex(dot(plus, plus)), sqrtTex(dd.add(1)), sqrtTex(dot(u, u).add(dot(v, v)))],
      solution: `$d(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u}-\\mathbf{v}\\|$ with $\\mathbf{u}-\\mathbf{v} = ${V(d)}$.\n$$d(\\mathbf{u},\\mathbf{v}) = \\sqrt{${d.map((x) => x.mul(x).tex()).join(" + ")}} = ${sqrtTex(dd)}$$`,
    });
  }
  const u = randVec(rng, n, -3, 3);
  const v = randVec(rng, n, -3, 3);
  const w = randVec(rng, n, -3, 3);
  const [a, b, c] = [rng.pick([2, 3, -2]), rng.pick([-1, -2, 2, 3]), rng.pick([1, -1])];
  const s = vadd(vadd(vscale(u, a), vscale(v, b)), vscale(w, c));
  if (isZeroVec(s)) retry();
  const ss = dot(s, s);
  const slip = vadd(vadd(vscale(u, a), vscale(v, -b)), vscale(w, c));
  const slip2 = vadd(vadd(vscale(u, a), vscale(v, b)), vscale(w, -c));
  const combo = `${a === -1 ? "-" : a}\\mathbf{u} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}\\mathbf{v} ${c < 0 ? "-" : "+"} \\mathbf{w}`;
  return mcq(rng, {
    subtopic: "Norm & unit vectors",
    prompt: `For $\\mathbf{u} = ${V(u)}$, $\\mathbf{v} = ${V(v)}$ and $\\mathbf{w} = ${V(w)}$, evaluate $\\|${combo}\\|$.`,
    correct: sqrtTex(ss),
    distractors: [ss.tex(), sqrtTex(dot(slip, slip)), sqrtTex(dot(slip2, slip2)), sqrtTex(ss.add(2)), sqrtTex(ss.sub(2).abs())],
    solution: `Compute the vector first (componentwise): $${combo} = ${V(s)}$.\nThen $\\|${combo}\\| = \\sqrt{${s.map((x) => x.mul(x).tex()).join(" + ")}} = ${sqrtTex(ss)}$.\n(This is not $\\|${a}\\mathbf{u}\\| ${b < 0 ? "-" : "+"} \\|${Math.abs(b)}\\mathbf{v}\\| ${c < 0 ? "-" : "+"} \\|\\mathbf{w}\\|$, which is a different quantity.)`,
  });
}

/** Find k making two vectors orthogonal. */
function orthK(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const u = randVec(rng, n, -4, 4);
  const v = randVec(rng, n, -4, 4);
  const i = rng.int(0, n - 1);
  if (v[i].isZero()) retry();
  const rest = dot(u, v).sub(u[i].mul(v[i])); // contribution of the other components
  const k = rest.neg().div(v[i]);
  if (k.isZero()) retry();
  const uTex = `[${u.map((x, j) => (j === i ? "k" : x.tex())).join(",\\ ")}]^T`;
  const restSlip = rest.sub(u[(i + 1) % n].mul(v[(i + 1) % n]).mul(2)); // sign slip on one product
  return mcq(rng, {
    subtopic: "Dot product & angle",
    prompt: `Find $k$ such that $\\mathbf{u} = ${uTex}$ and $\\mathbf{v} = ${V(v)}$ are orthogonal.`,
    correct: `k = ${k.tex()}`,
    distractors: [`k = ${k.neg().tex()}`, `k = ${restSlip.neg().div(v[i]).tex()}`, `k = ${rest.neg().mul(v[i]).tex()}`, `k = ${k.add(1).tex()}`, `k = ${rest.neg().tex()}`],
    solution: `Orthogonal means $\\mathbf{u}\\cdot\\mathbf{v} = 0$:\n$$\\mathbf{u}\\cdot\\mathbf{v} = ${v[i].eq(1) ? "" : v[i].eq(-1) ? "-" : v[i].tex()}k ${rest.n < 0 ? "-" : "+"} ${rest.abs().tex()} = 0 \\Rightarrow k = ${k.tex()}$$`,
  });
}

function triangleAngle(rng: Rng): Draft {
  const pts = [randVec(rng, 3, -3, 4), randVec(rng, 3, -3, 4), randVec(rng, 3, -3, 4)];
  const names = ["A", "B", "C"];
  const vi = rng.int(0, 2);
  const [o1, o2] = [0, 1, 2].filter((j) => j !== vi);
  const a = vsub(pts[o1], pts[vi]);
  const b = vsub(pts[o2], pts[vi]);
  if (isZeroVec(a) || isZeroVec(b) || parallel(a, b)) retry();
  const d = dot(a, b);
  if (d.isZero()) retry();
  const m = dot(a, a).mul(dot(b, b)).n;
  if (m > 900) retry();
  const cos = surdTex(d.div(m), m);
  const ext = surdTex(d.neg().div(m), m);
  const n1 = dot(a, a).n;
  const other = vsub(pts[o2], pts[o1]);
  const d2 = dot(vsub(pts[vi], pts[o1]), other);
  const m2 = dot(vsub(pts[vi], pts[o1]), vsub(pts[vi], pts[o1])).mul(dot(other, other)).n;
  return mcq(rng, {
    subtopic: "Dot product & angle",
    prompt: `Find $\\cos\\theta$, where $\\theta$ is the interior angle at $${names[vi]}$ of the triangle with vertices $A${P(pts[0])}$, $B${P(pts[1])}$, $C${P(pts[2])}$.`,
    correct: `\\cos\\theta = ${cos}`,
    distractors: [
      `\\cos\\theta = ${ext}`,
      `\\cos\\theta = ${d.div(n1).tex()}`,
      `\\cos\\theta = ${surdTex(d2.div(m2), m2)}`,
      `\\cos\\theta = ${d.tex()}`,
      `\\cos\\theta = ${d.div(m).tex()}`,
    ],
    solution: `Use the two vectors **leaving** $${names[vi]}$: $\\overrightarrow{${names[vi]}${names[o1]}} = ${V(a)}$ and $\\overrightarrow{${names[vi]}${names[o2]}} = ${V(b)}$.\nDot product $= ${d.tex()}$; norms $\\sqrt{${dot(a, a).tex()}}$ and $\\sqrt{${dot(b, b).tex()}}$.\n$$\\cos\\theta = \\frac{${d.tex()}}{\\sqrt{${dot(a, a).tex()}}\\sqrt{${dot(b, b).tex()}}} = ${cos}$$\n(${d.n > 0 ? "acute" : "obtuse"}, since the dot product is ${d.n > 0 ? "positive" : "negative"}). Using $\\overrightarrow{${names[o1]}${names[vi]}}$ with $\\overrightarrow{${names[vi]}${names[o2]}}$ flips the sign of the dot product.`,
  });
}

const RT_OPTS = ["Right angle at $A$", "Right angle at $B$", "Right angle at $C$", "It is not a right-angled triangle", "Cannot be determined"];

function rightTriangle(rng: Rng): Draft {
  const names = ["A", "B", "C"];
  const [e1, e2] = orthPair(rng, 3);
  const base = randVec(rng, 3, -3, 3);
  let pts: Vec[] = [vadd(base, e1), base, vadd(base, e2)]; // right angle at index 1
  const none = rng.chance(0.25);
  if (none) {
    const j = rng.int(0, 2);
    pts[2] = pts[2].map((x, k) => (k === j ? x.add(rng.pick([1, -1, 2])) : x));
  }
  pts = rng.shuffle(pts);
  const dots = [0, 1, 2].map((i) => {
    const [p, q] = [0, 1, 2].filter((j) => j !== i);
    return dot(vsub(pts[p], pts[i]), vsub(pts[q], pts[i]));
  });
  const ab = vsub(pts[1], pts[0]), ac = vsub(pts[2], pts[0]);
  if (isZeroVec(ab) || isZeroVec(ac) || parallel(ab, ac)) retry();
  const right = dots.findIndex((x) => x.isZero());
  if (none && right >= 0) retry();
  const answer = right >= 0 ? right : 3;
  const lines = [0, 1, 2].map((i) => {
    const [p, q] = [0, 1, 2].filter((j) => j !== i);
    return `at $${names[i]}$: $\\overrightarrow{${names[i]}${names[p]}}\\cdot\\overrightarrow{${names[i]}${names[q]}} = ${V(vsub(pts[p], pts[i]))}\\cdot${V(vsub(pts[q], pts[i]))} = ${dots[i].tex()}$`;
  });
  return {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: `Consider the triangle with vertices $A${P(pts[0])}$, $B${P(pts[1])}$ and $C${P(pts[2])}$. Which statement is correct?`,
    options: [...RT_OPTS],
    answer,
    solution: `Dot the two edge vectors leaving each vertex:\n- ${lines.join("\n- ")}\n${right >= 0 ? `The dot product at $${names[right]}$ is zero, so the edges there are orthogonal and the right angle is at $${names[right]}$.` : "No dot product is zero, so the triangle has no right angle."}`,
  };
}

function work(rng: Rng): Draft {
  const p = randVec(rng, 3, -4, 4);
  const q = randVec(rng, 3, -4, 4);
  const r = vsub(q, p);
  if (isZeroVec(r)) retry();
  const byMag = rng.chance(0.5);
  let f: Vec;
  let fDesc: string;
  let fSol: string;
  let raw: Vec | null = null;
  if (byMag) {
    const { v, norm } = pythVec(rng, 3);
    const k = rng.pick([1, 2, 3]);
    f = vscale(v, k);
    raw = v;
    fDesc = `of magnitude $${k * norm}$ acting in the direction of $${V(v)}$`;
    fSol = `$\\|${V(v)}\\| = ${norm}$, so $\\mathbf{F} = ${k * norm}\\cdot\\dfrac{1}{${norm}}${V(v)} = ${V(f)}$.\n`;
  } else {
    f = randVec(rng, 3, -5, 5);
    fDesc = `$\\mathbf{F} = ${V(f)}$`;
    fSol = "";
  }
  const W = dot(f, r);
  if (W.isZero()) retry();
  const ds = [W.neg(), dot(f, q), dot(f, p), dot(f, vadd(p, q))];
  if (raw) ds.push(dot(raw, r));
  return mcq(rng, {
    subtopic: "Dot product & angle",
    prompt: `A constant force ${fDesc} moves a particle from $P${P(p)}$ to $Q${P(q)}$. Find the work done, Work $= \\mathbf{F}\\cdot\\mathbf{r}$, where $\\mathbf{r}$ is the displacement.`,
    correct: W.tex(),
    distractors: ds.map((x) => x.tex()),
    solution: `${fSol}$\\mathbf{r} = \\overrightarrow{PQ} = Q - P = ${V(r)}$.\nWork $= \\mathbf{F}\\cdot\\mathbf{r} = ${f.map((x, i) => `(${x.tex()})(${r[i].tex()})`).join(" + ")} = ${W.tex()}$.\nUse the displacement $Q - P$, not the position vectors.`,
  });
}

function normIdentities(rng: Rng): Draft {
  const a = rng.pick([4, 9, 16, 25, 5, 8, 10, 13]);
  const b = rng.pick([4, 9, 16, 25, 2, 5, 8, 17]);
  const lim = Math.floor(Math.sqrt(a * b));
  const c = rng.nz(-lim + 1, lim - 1);
  if (c * c >= a * b) retry();
  const p = a + b + 2 * c; // ||u+v||^2
  const m = a + b - 2 * c; // ||u-v||^2
  const nr = (x: number) => sqrtTex(F(x));
  const mode = rng.pick(["v", "dot", "cos"]);
  const head = `Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ with`;
  const expand = "Expand with the dot product: $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = (\\mathbf{u}\\pm\\mathbf{v})\\cdot(\\mathbf{u}\\pm\\mathbf{v}) = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.";
  if (mode === "v") {
    return mcq(rng, {
      subtopic: "Norm identities & inequalities",
      prompt: `${head} $\\|\\mathbf{u}\\| = ${nr(a)}$, $\\|\\mathbf{u}+\\mathbf{v}\\| = ${nr(p)}$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = ${nr(m)}$. Find $\\|\\mathbf{v}\\|$.`,
      correct: `\\|\\mathbf{v}\\| = ${nr(b)}`,
      distractors: [
        `\\|\\mathbf{v}\\| = ${nr(p + m - a)}`,
        `\\|\\mathbf{v}\\| = ${nr(p + m - 2 * a)}`,
        `\\|\\mathbf{v}\\| = ${nr(Math.abs(p - m - a) || 1)}`,
        `\\|\\mathbf{v}\\| = ${nr(b + a)}`,
        `\\|\\mathbf{v}\\| = ${nr(b * 2)}`,
      ].filter((s) => !s.endsWith("= 0")),
      solution: `${expand}\nAdding the two gives the parallelogram law $\\|\\mathbf{u}+\\mathbf{v}\\|^2 + \\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2 + 2\\|\\mathbf{v}\\|^2$.\n$${p} + ${m} = 2(${a}) + 2\\|\\mathbf{v}\\|^2 \\Rightarrow \\|\\mathbf{v}\\|^2 = ${b}$, so $\\|\\mathbf{v}\\| = ${nr(b)}$. (Forgetting the factor 2 on $\\|\\mathbf{v}\\|^2$ is the usual slip.)`,
    });
  }
  if (mode === "dot") {
    const opt = (x: Frac) => `\\mathbf{u}\\cdot\\mathbf{v} = ${x.tex()}`;
    return mcq(rng, {
      subtopic: "Norm identities & inequalities",
      prompt: `${head} $\\|\\mathbf{u}+\\mathbf{v}\\| = ${nr(p)}$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = ${nr(m)}$. Find $\\mathbf{u}\\cdot\\mathbf{v}$.`,
      correct: opt(F(c)),
      distractors: [opt(F(p - m)), opt(F(p - m, 2)), opt(F(m - p, 4)), opt(F(p + m, 4)), opt(F(p - m, 8))],
      solution: `${expand}\nSubtracting the two: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\|\\mathbf{u}-\\mathbf{v}\\|^2 = 4\\,\\mathbf{u}\\cdot\\mathbf{v}$, so $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14(${p} - ${m}) = ${c}$.`,
    });
  }
  // cos theta given ||u||, ||u+v||, ||u-v||
  const opt = (num: number, rad: number) => `\\cos\\theta = ${surdTex(F(num, rad), rad)}`;
  return mcq(rng, {
    subtopic: "Norm identities & inequalities",
    prompt: `${head} $\\|\\mathbf{u}\\| = ${nr(a)}$, $\\|\\mathbf{u}+\\mathbf{v}\\| = ${nr(p)}$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = ${nr(m)}$. If $\\theta$ is the angle between $\\mathbf{u}$ and $\\mathbf{v}$, find $\\cos\\theta$.`,
    correct: opt(c, a * b),
    distractors: [opt(-c, a * b), opt(2 * c, a * b), opt(c, a * (p + m - a)), opt(4 * c, a * b), opt(c, a + b)],
    solution: `${expand}\nSubtracting: $${p} - ${m} = 4\\,\\mathbf{u}\\cdot\\mathbf{v}$, so $\\mathbf{u}\\cdot\\mathbf{v} = ${c}$.\nAdding (parallelogram law): $${p} + ${m} = 2(${a}) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = ${b}$.\n$$\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|} = \\frac{${c}}{\\sqrt{${a}}\\sqrt{${b}}} = ${surdTex(F(c, a * b), a * b)}$$`,
  });
}

function csMax(rng: Rng): Draft {
  const x = randVec(rng, 3, -2, 2);
  const y = randVec(rng, 3, -2, 2);
  const z = randVec(rng, 3, -2, 2);
  const [al, be, ga] = [rng.pick([1, 2, -1]), rng.pick([1, -1, -2, 2]), rng.pick([1, -1])];
  const w = vadd(vadd(vscale(x, al), vscale(y, be)), vscale(z, ga));
  if (isZeroVec(w)) retry();
  const r = rng.pick([1, 2, 3, 4]);
  const ww = dot(w, w);
  const combo = `${al === 1 ? "" : al === -1 ? "-" : al}\\mathbf{x} ${be < 0 ? "-" : "+"} ${Math.abs(be) === 1 ? "" : Math.abs(be)}\\mathbf{y} ${ga < 0 ? "-" : "+"} \\mathbf{z}`;
  const val = (k: number, sq: Frac) => surdTex(F(k), sq.n);
  return mcq(rng, {
    subtopic: "Norm identities & inequalities",
    prompt: `Let $\\mathbf{x} = ${V(x)}$, $\\mathbf{y} = ${V(y)}$ and $\\mathbf{z} = ${V(z)}$. Find the maximum of $|\\mathbf{v}^T(${combo})|$ over all $\\mathbf{v}\\in\\mathbb{R}^3$ with $\\|\\mathbf{v}\\| \\le ${r}$.`,
    correct: val(r, ww),
    distractors: [val(1, ww), F(r).mul(ww).tex(), ww.tex(), val(r * r, ww), val(r, ww.add(1))],
    solution: `Let $\\mathbf{w} = ${combo} = ${V(w)}$, so $\\|\\mathbf{w}\\| = ${sqrtTex(ww)}$.\nCauchy–Schwarz: $|\\mathbf{v}^T\\mathbf{w}| = |\\mathbf{v}\\cdot\\mathbf{w}| \\le \\|\\mathbf{v}\\|\\|\\mathbf{w}\\| \\le ${r}\\|\\mathbf{w}\\| = ${val(r, ww)}$.\nThe bound is reached by $\\mathbf{v} = \\dfrac{${r}}{\\|\\mathbf{w}\\|}\\mathbf{w}$ (norm $${r}$), since then $\\mathbf{v}\\cdot\\mathbf{w} = \\dfrac{${r}}{\\|\\mathbf{w}\\|}\\|\\mathbf{w}\\|^2 = ${r}\\|\\mathbf{w}\\|$.`,
  });
}

/** Tutorial 0A Q9 / slides p29: vector or parametric equations of a plane. */
function planeVector(rng: Rng): Draft {
  if (rng.chance(0.5)) {
    // through three points: x = A + t1 AB + t2 AC
    const A = randVec(rng, 3, -3, 3);
    const B = randVec(rng, 3, -3, 3);
    const C = randVec(rng, 3, -3, 3);
    const ab = vsub(B, A), ac = vsub(C, A);
    if (isZeroVec(ab) || isZeroVec(ac) || parallel(ab, ac)) retry();
    const [n, d] = eqOf(A, ab, ac);
    const cands: [Vec, Vec, Vec][] = [
      [A, B, C],
      [vec([0, 0, 0]), ab, ac],
      [A, ab, vscale(ab, rng.pick([-2, 2, 3]))],
      [A, vsub(A, B), vadd(A, C)],
      [A, ab, vadd(ac, vec([1, 0, 0]))],
    ];
    const ds = cands
      .filter(([x0, a, b]) => parallel(a, b) || isZeroVec(a) || isZeroVec(b) || !samePlane(n, d, ...eqOf(x0, a, b)))
      .map(([x0, a, b]) => planeVecTex(x0, a, b));
    return mcq(rng, {
      subtopic: "Lines & planes",
      prompt: `Which of the following is a vector equation of the plane through $A${P(A)}$, $B${P(B)}$ and $C${P(C)}$?`,
      correct: planeVecTex(A, ab, ac),
      distractors: ds,
      solution: `Use the point $A$ and two vectors in the plane: $\\overrightarrow{AB} = B - A = ${V(ab)}$ and $\\overrightarrow{AC} = C - A = ${V(ac)}$. They are not scalar multiples of each other, so they are noncollinear and\n$$${planeVecTex(A, ab, ac)}$$\nCheck: $t_1 = 1, t_2 = 0$ gives $B$ and $t_1 = 0, t_2 = 1$ gives $C$. (Using the position vectors of $B$ and $C$ instead of $\\overrightarrow{AB}, \\overrightarrow{AC}$, or two collinear vectors, does not give this plane.)`,
    });
  }
  // parametric equations from a point and two vectors
  const x0 = randVec(rng, 3, -4, 4);
  const a = randVec(rng, 3, -3, 3);
  const b = randVec(rng, 3, -3, 3);
  if (parallel(a, b) || a.filter((x) => x.isZero()).length > 1 || b.filter((x) => x.isZero()).length > 1) retry();
  const [n, d] = eqOf(x0, a, b);
  const i = rng.int(0, 2);
  const swapI = (u: Vec, w: Vec) => u.map((x, j) => (j === i ? w[j] : x));
  const cands: [Vec, Vec, Vec][] = [
    [a, x0, b], // point and first vector swapped
    [x0, swapI(a, b), swapI(b, a)], // parameters mixed up in one component
    [vec([0, 0, 0]), a, b], // point forgotten
    [x0.map((x, j) => (j === i ? x.neg() : x)), a, b], // sign slip in the point
  ];
  const ds = cands
    .filter(([p, u, w]) => parallel(u, w) || isZeroVec(u) || isZeroVec(w) || !samePlane(n, d, ...eqOf(p, u, w)))
    .map(([p, u, w]) => planeParam(p, u, w));
  return mcq(rng, {
    subtopic: "Lines & planes",
    prompt: `Find parametric equations of the plane that contains the point $${P(x0)}$ and is parallel to $\\mathbf{v}_1 = ${V(a)}$ and $\\mathbf{v}_2 = ${V(b)}$.`,
    correct: planeParam(x0, a, b),
    distractors: ds,
    solution: `Vector form: $${planeVecTex(x0, a, b)}$ (the vectors are noncollinear).\nParametric equations are the components of this: $${planeParam(x0, a, b)}$.`,
  });
}

/** PYP AY25/26 S2 Q1: plane through a point with a normal, multiplied out. */
function planePointNormal(rng: Rng): Draft {
  const n = randVec(rng, 3, -4, 4);
  if (n.filter((x) => !x.isZero()).length < 3) retry();
  const P0 = randVec(rng, 3, -4, 4);
  const d = dot(n, P0);
  const j = rng.int(0, 2);
  const slipP = P0.map((x, k) => (k === j ? x.neg() : x));
  const cands: [Vec, Frac][] = [
    [n, d.neg()],
    [P0, dot(P0, n).add(rng.pick([1, -1]))],
    [n, dot(n, slipP)],
    [n, F(0)],
    [n, d.add(rng.pick([2, -2]))],
  ];
  const ds = cands.filter(([m, e]) => !isZeroVec(m) && !samePlane(n, d, m, e)).map(([m, e]) => planeTex(m, e));
  const pn = n
    .map((c, i) => {
      const inner = P0[i].isZero() ? XYZ[i] : `(${XYZ[i]} ${P0[i].n < 0 ? "+" : "-"} ${P0[i].abs().tex()})`;
      return `${i === 0 ? (c.n < 0 ? "-" : "") : c.n < 0 ? " - " : " + "}${c.abs().eq(1) ? "" : c.abs().tex()}${inner}`;
    })
    .join("");
  return mcq(rng, {
    subtopic: "Lines & planes",
    prompt: `Find the equation of the plane passing through $${P(P0)}$ with normal vector $\\mathbf{n} = ${V(n)}$.`,
    correct: planeTex(n, d),
    distractors: ds,
    solution: `Point-normal form: $${pn} = 0$.\nMultiplying out: $${lin(n)} = ${n.map((c, i) => `(${c.tex()})(${P0[i].tex()})`).join(" + ")} = ${d.tex()}$.\nCheck: the point $${P(P0)}$ satisfies $${planeTex(n, d)}$ ✓.`,
  });
}

function pointOnPlane(rng: Rng): Draft {
  const n = randVec(rng, 3, -3, 3);
  if (n.filter((x) => !x.isZero()).length < 2) retry();
  const P0 = randVec(rng, 3, -4, 4);
  const d = dot(n, P0);
  // two vectors orthogonal to n (internal construction only)
  const w1 = primitive(cross(n, rng.pick([vec([1, 0, 0]), vec([0, 1, 0]), vec([0, 0, 1])])));
  const w2 = primitive(cross(n, w1));
  if (isZeroVec(w1) || isZeroVec(w2) || maxAbs(w2) > 9) retry();
  const on = vadd(vadd(P0, vscale(w1, rng.nz(-2, 2))), vscale(w2, rng.pick([0, 1, -1])));
  if (maxAbs(on) > 9) retry();
  const offs: Vec[] = [];
  for (let t = 0; t < 40 && offs.length < 5; t++) {
    const q = vadd(P0, randVec(rng, 3, -3, 3));
    const val = dot(n, q);
    if (!val.eq(d) && maxAbs(q) <= 9) offs.push(q);
  }
  const asked = rng.chance(0.5);
  const planeDesc = asked
    ? `the plane $${planeTex(n, d)}$`
    : `the plane passing through $${P(P0)}$ with normal vector $\\mathbf{n} = ${V(n)}$`;
  const evals = (q: Vec) => `$${P(q)}$: $${dot(n, q).tex()}$`;
  return mcq(rng, {
    subtopic: "Lines & planes",
    prompt: `Which of the following points lies on ${planeDesc}?`,
    correct: P(on),
    distractors: offs.map(P),
    solution: `${asked ? "" : `Point-normal form $\\mathbf{n}\\cdot\\overrightarrow{P_0P} = 0$ multiplied out gives $${lin(n)} = ${d.tex()}$.\n`}Substitute each point into $${lin(n)}$ and compare with $${d.tex()}$: ${[on, ...offs].map(evals).join("; ")}.\nOnly $${P(on)}$ gives $${d.tex()}$, so it is the only point on the plane.`,
  });
}

function linePlaneIntersect(rng: Rng): Draft {
  const n = randVec(rng, 3, -3, 3);
  const dir = randVec(rng, 3, -3, 3);
  const nd = dot(n, dir);
  if (nd.isZero() || n.filter((x) => !x.isZero()).length < 2) retry();
  const P0 = randVec(rng, 3, -4, 4);
  const t = F(rng.nz(-3, 3));
  const X = vadd(P0, vscale(dir, t));
  const c = dot(n, X);
  const wrongT = c.div(nd);
  const ds = [vadd(P0, vscale(dir, t.neg())), vadd(P0, vscale(dir, t.add(1))), vadd(P0, vscale(dir, wrongT)), vsub(X, P0), vadd(X, dir)];
  return mcq(rng, {
    subtopic: "Line–plane intersection",
    prompt: `Find the point where the line $${lineParam(P0, dir)}$ meets the plane $${planeTex(n, c)}$.`,
    correct: P(X),
    distractors: ds.filter((q) => !dot(n, q).eq(c)).map(P),
    solution: `Substitute the parametric equations into the plane: the left side becomes $${dot(n, P0).tex()} ${nd.n < 0 ? "-" : "+"} ${nd.abs().eq(1) ? "" : nd.abs().tex()}t$, so $${dot(n, P0).tex()} ${nd.n < 0 ? "-" : "+"} ${nd.abs().eq(1) ? "" : nd.abs().tex()}t = ${c.tex()}$ and $t = ${t.tex()}$.\nPoint: $${P(X)}$. Check: $${lin(n)}$ at this point is $${c.tex()}$ ✓.`,
  });
}

/** PYP AY24/25 S2 Q2: plane and line both in vector form. */
function linePlaneVector(rng: Rng): Draft {
  const A = randVec(rng, 3, -3, 3);
  const a = randVec(rng, 3, -2, 3);
  const b = randVec(rng, 3, -2, 3);
  const d = randVec(rng, 3, -2, 3);
  if (dot(cross(a, b), d).isZero()) retry(); // unique intersection
  const [l0, m0, b0] = [rng.nz(-3, 3), rng.nz(-3, 3), rng.nz(-3, 3)];
  const X = vadd(vadd(A, vscale(a, l0)), vscale(b, m0));
  const B = vsub(X, vscale(d, b0));
  if (maxAbs(B) > 12 || maxAbs(X) > 12) retry();
  const opt = (x: number, y: number) => `\\beta = ${x},\\ \\mu = ${y}`;
  const eqs = [0, 1, 2].map((i) => `${affine2(A[i], a[i], b[i]).replace("t_1", "\\lambda").replace("t_2", "\\mu")} = ${affine(B[i], d[i], "\\beta")}`).join(",\\quad ");
  return mcq(rng, {
    subtopic: "Line–plane intersection",
    prompt: `A plane is given by $\\mathbf{r} = ${V(A)} + \\lambda${V(a)} + \\mu${V(b)}$ and a line by $\\mathbf{s} = ${V(B)} + \\beta${V(d)}$, where $\\lambda, \\mu, \\beta\\in\\mathbb{R}$. At the point where the line meets the plane, the values of $\\beta$ and $\\mu$ are`,
    correct: opt(b0, m0),
    distractors: [opt(-b0, m0), opt(b0, -m0), opt(m0, b0), opt(b0, l0), opt(-b0, -m0)],
    solution: `Set $\\mathbf{r} = \\mathbf{s}$ and equate components:\n$$${eqs}$$\nSolving this $3\\times3$ system gives $\\lambda = ${l0}$, $\\mu = ${m0}$, $\\beta = ${b0}$.\nCheck: both sides give the point $${P(X)}$ ✓.`,
  });
}

const COORD = [
  { name: "$y$–$z$ plane", eq: "x = 0" },
  { name: "$x$–$z$ plane", eq: "y = 0" },
  { name: "$x$–$y$ plane", eq: "z = 0" },
];

function lineCoordPlane(rng: Rng): Draft {
  const A = randVec(rng, 3, -4, 5);
  const B = randVec(rng, 3, -4, 5);
  const d = vsub(B, A);
  const i = rng.int(0, 2);
  if (d[i].isZero() || A[i].isZero() || d.filter((x) => !x.isZero()).length < 2) retry();
  const at = (k: number) => {
    const t = A[k].neg().div(d[k]);
    return vadd(A, vscale(d, t));
  };
  const t = A[i].neg().div(d[i]);
  const X = at(i);
  const ds: Vec[] = [vadd(A, vscale(d, t.neg()))];
  for (const k of [0, 1, 2]) if (k !== i && !d[k].isZero()) ds.push(at(k));
  ds.push(X.map((x, k) => (k === i ? x : x.neg())));
  ds.push(A.map((x, k) => (k === i ? F(0) : x)));
  return mcq(rng, {
    subtopic: "Line–plane intersection",
    prompt: `The line through $A${P(A)}$ and $B${P(B)}$ intersects the ${COORD[i].name} at which point?`,
    correct: P(X),
    distractors: ds.map(P),
    solution: `$\\overrightarrow{AB} = ${V(d)}$, so the line is $\\mathbf{x} = ${V(A)} + t${V(d)}$, i.e. $${lineParam(A, d)}$.\nThe ${COORD[i].name} is $${COORD[i].eq}$: $${affine(A[i], d[i])} = 0 \\Rightarrow t = ${t.tex()}$.\nPoint: $${P(X)}$. (Read the plane carefully: the $x$–$y$ plane is $z = 0$, etc.)`,
  });
}

function lineInPlane(rng: Rng): Draft {
  const n = randVec(rng, 3, -3, 3);
  if (n.filter((x) => !x.isZero()).length < 2) retry();
  const P0 = randVec(rng, 3, -4, 4);
  const kind = rng.pick(["in", "in", "par", "cross"]);
  let d: Vec;
  if (kind === "cross") {
    d = randVec(rng, 3, -3, 3);
    if (dot(n, d).isZero()) retry();
  } else {
    d = primitive(cross(n, randVec(rng, 3, -2, 2))); // a direction orthogonal to n
    if (isZeroVec(d) || maxAbs(d) > 8) retry();
  }
  const c = kind === "par" ? dot(n, P0).add(rng.nz(-4, 4)) : dot(n, P0);
  const nd = dot(n, d);
  const nP = dot(n, P0);
  const viaNormals = kind !== "cross" && rng.chance(0.3);
  let lineDesc = `the line $\\mathbf{x} = ${V(P0)} + t${V(d)}$`;
  let dirSol = "";
  if (viaNormals) {
    // PYP AY24/25 S2 Q11: the line is given by a point and two vectors orthogonal to its direction
    const a = primitive(cross(d, randVec(rng, 3, -2, 2)));
    if (isZeroVec(a) || maxAbs(a) > 6) retry();
    const bb = primitive(cross(d, a));
    if (maxAbs(bb) > 9 || isZeroVec(bb)) retry();
    lineDesc = `the line through $${P(P0)}$ with normal vectors $${V(a)}$ and $${V(bb)}$ (both orthogonal to its direction)`;
    dirSol = `The direction $\\mathbf{v}$ satisfies $\\mathbf{v}\\cdot${V(a)} = 0$ and $\\mathbf{v}\\cdot${V(bb)} = 0$. Solving these two equations gives $\\mathbf{v} = s${V(d)}$; check: $${V(d)}\\cdot${V(a)} = ${dot(d, a).tex()}$ and $${V(d)}\\cdot${V(bb)} = ${dot(d, bb).tex()}$.\n`;
  }
  const truth = kind === "in";
  return tfn({
    subtopic: "Line–plane intersection",
    prompt: `${lineDesc.charAt(0).toUpperCase()}${lineDesc.slice(1)} lies on the plane $${planeTex(n, c)}$ (every point of the line is on the plane).`,
    answer: truth ? 0 : 1,
    solution: `${dirSol}Substitute $\\mathbf{x} = ${V(P0)} + t${V(d)}$ into $${lin(n)}$: it becomes $${nP.tex()} ${nd.n < 0 ? "-" : "+"} ${nd.abs().eq(1) ? "" : nd.abs().tex()}t$ (the coefficient of $t$ is $\\mathbf{n}\\cdot\\mathbf{v} = ${nd.tex()}$).\n${nd.isZero() ? (nP.eq(c) ? `This equals $${c.tex()}$ for every $t$, so every point of the line is on the plane. **True**.` : `This is $${nP.tex()} \\ne ${c.tex()}$ for every $t$, so the line never meets the plane. **False**.`) : `Setting it equal to $${c.tex()}$ gives exactly one $t$, so only one point of the line is on the plane. **False**.`}`,
  });
}

/** PYP AY25/26 S1 Q1: unit vector making a given angle with one axis, plus a norm condition. */
const ANG = [
  { tex: "\\pi/3", c: "\\tfrac12", sq: F(1, 4) },
  { tex: "2\\pi/3", c: "-\\tfrac12", sq: F(1, 4) },
  { tex: "\\pi/4", c: "\\tfrac{1}{\\sqrt2}", sq: F(1, 2) },
  { tex: "3\\pi/4", c: "-\\tfrac{1}{\\sqrt2}", sq: F(1, 2) },
];
const AX = ["x", "y", "z"];
const E = ["\\mathbf{i}", "\\mathbf{j}", "\\mathbf{k}"];
const neg = (s: string) => (s.startsWith("-") ? s.slice(1) : `-${s}`);

function unitAtAngle(rng: Rng): Draft {
  const i = rng.int(0, 2);
  const ang = rng.pick(ANG);
  const j = rng.pick([0, 1, 2].filter((x) => x !== i));
  const k = [0, 1, 2].find((x) => x !== i && x !== j)!;
  const s = rng.pick([1, -1]); // x + s e_j is a unit vector  =>  x_j = -s/2
  const xj = s > 0 ? "-\\tfrac12" : "\\tfrac12";
  const rest = F(1).sub(ang.sq).sub(F(1, 4)); // x_k^2
  const restTex = rest.eq(F(1, 2)) ? "\\tfrac{1}{\\sqrt2}" : "\\tfrac12";
  const kPos = rng.chance(0.5);
  const xk = kPos ? restTex : `-${restTex}`;
  const build = (vi: string, vj: string, vk: string) => {
    const arr = ["", "", ""];
    arr[i] = vi;
    arr[j] = vj;
    arr[k] = vk;
    return `\\left[${arr.join(",\\ ")}\\right]^T`;
  };
  const correct = build(ang.c, xj, xk);
  const ds = [build(ang.c, neg(xj), xk), build(neg(ang.c), xj, xk), build(ang.c, xj, neg(xk)), build(xj, ang.c, xk), build(neg(ang.c), neg(xj), neg(xk))];
  return mcq(rng, {
    subtopic: "Unit vectors & angles",
    prompt: `A unit vector $\\mathbf{x}\\in\\mathbb{R}^3$ makes an angle of $${ang.tex}$ with the $${AX[i]}$-axis, and $\\mathbf{x} ${s > 0 ? "+" : "-"} ${E[j]}$ is also a unit vector. If the $${AX[k]}$-component of $\\mathbf{x}$ is ${kPos ? "positive" : "negative"}, find $\\mathbf{x}$.`,
    correct,
    distractors: ds,
    noneRate: 0.1,
    solution: `The angle with the $${AX[i]}$-axis: $\\mathbf{x}\\cdot${E[i]} = \\|\\mathbf{x}\\|\\|${E[i]}\\|\\cos(${ang.tex})$, so $x_${i + 1} = ${ang.c}$.\n$\\|\\mathbf{x} ${s > 0 ? "+" : "-"} ${E[j]}\\|^2 = \\mathbf{x}\\cdot\\mathbf{x} ${s > 0 ? "+" : "-"} 2\\,\\mathbf{x}\\cdot${E[j]} + ${E[j]}\\cdot${E[j]} = 2 ${s > 0 ? "+" : "-"} 2x_${j + 1} = 1$, so $x_${j + 1} = ${xj}$.\nThen $\\|\\mathbf{x}\\| = 1$ gives $x_${k + 1}^2 = 1 - ${ang.sq.tex()} - \\tfrac14 = ${rest.tex()}$, and the sign condition gives $x_${k + 1} = ${xk}$.\nSo $\\mathbf{x} = ${correct}$.`,
  });
}

export const vectorsGens: ((rng: Rng) => Draft)[] = [
  cite("Slides 0A Linear combination (vec p16); Tutorial 0A Q1", linComb),
  cite("Slides 0A (vec p8, p12, p18); Tutorial 0A Q2", initialPoint),
  cite("Slides 0A Unit vector (vec p18); Tutorial 0A Q5", unitVec),
  cite("Slides 0A Norm, distance (vec p17, p19); Tutorial 0A Q3, Q4", normCombo),
  cite("Slides 0A Orthogonality (vec p21, p26)", orthK),
  cite("Slides 0A Dot product, angles (vec p20, p24); Tutorial 0A Q4", triangleAngle),
  cite("Tutorial 0A Q6; Slides 0A Orthogonality (vec p26)", rightTriangle),
  cite("Tutorial 0A Q7", work),
  cite("Slides 0A (vec p22); PYP AY24/25 S2 Q13; PYP AY23/24 S1 Q3(b)", normIdentities),
  cite("Slides 0A Cauchy–Schwarz inequality (vec p24); PYP AY25/26 S2 Q13", csMax),
  cite("Slides 0A Vector and parametric equations of planes (vec p29); Tutorial 0A Q9", planeVector),
  cite("Slides 0A (vec p27); Tutorial 0A Q8; PYP AY25/26 S2 Q1", planePointNormal),
  cite("Slides 0A (vec p27); PYP AY24/25 S2 Q1", pointOnPlane),
  cite("Slides 0A Parametric equations of lines (vec p28); Tutorial 0A Q10", linePlaneIntersect),
  cite("PYP AY24/25 S2 Q2", linePlaneVector),
  cite("Tutorial 0A Q10", lineCoordPlane),
  cite("PYP AY24/25 S2 Q11; Slides 0A (vec p27–p28)", lineInPlane),
  cite("PYP AY25/26 S1 Q1; Slides 0A (vec p19–p22)", unitAtAngle),
];
