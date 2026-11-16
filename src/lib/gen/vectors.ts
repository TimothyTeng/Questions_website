import { cross, dot, F, Frac, isZeroVec, primitive, rowTex, rowTexPlain, sqrtTex, vadd, vec, Vec, vscale, vsub } from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";
import { maxAbs, orthPair, parallel, pythVec, randVec } from "./shared";

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

const abs = (x: Frac) => x.abs();

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
  // unknown last component h
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
    solution: `The components without $h$ give ${others.map((j) => `$${lin([u[j], v[j]], ["a", "b"])} = ${w[j].tex()}$`).join(" and ")}, so $a = ${a.tex()}$, $b = ${b.tex()}$.\nThe remaining component must then match: $h = ${a.tex()}(${u[i].tex()}) + (${b.tex()})(${v[i].tex()}) = ${h.tex()}$. For any other $h$ the system is inconsistent.`,
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
    solution: `$\\|\\mathbf{v}\\| = ${norm}$, so $\\mathbf{u} = ${s < 0 ? "-" : ""}\\dfrac{${k * norm}}{${norm}}\\mathbf{v} = ${V(u)}$.\nSince $\\mathbf{u} = Q - P$ (terminal minus initial), $P = Q - \\mathbf{u} = ${P(Pp)}$. ($Q + \\mathbf{u}$ is the usual sign slip.)`,
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
    solution: `$\\|\\mathbf{v}\\| = \\sqrt{${v.map((x) => x.mul(x).tex()).join("+")}} = ${norm}$.\nThe answer is $${s < 0 ? "-" : ""}${L === 1 ? "" : L}\\dfrac{\\mathbf{v}}{\\|\\mathbf{v}\\|} = ${rowTex(ans)}$ (divide by $\\|\\mathbf{v}\\|$, not $\\|\\mathbf{v}\\|^2$${opp ? ", and flip the sign for the opposite direction" : ""}).`,
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
    solution: `Use the two edge vectors **leaving** $${names[vi]}$: $\\overrightarrow{${names[vi]}${names[o1]}} = ${V(a)}$ and $\\overrightarrow{${names[vi]}${names[o2]}} = ${V(b)}$.\nDot product $= ${d.tex()}$; norms $\\sqrt{${dot(a, a).tex()}}$ and $\\sqrt{${dot(b, b).tex()}}$.\n$$\\cos\\theta = \\frac{${d.tex()}}{\\sqrt{${dot(a, a).tex()}}\\sqrt{${dot(b, b).tex()}}} = ${cos}$$\n(${d.n > 0 ? "acute" : "obtuse"}). Using $\\overrightarrow{${names[o1]}${names[vi]}}$ with $\\overrightarrow{${names[vi]}${names[o2]}}$ flips the sign (the exterior angle).`,
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
    solution: `Dot the two edge vectors leaving each vertex:\n- ${lines.join("\n- ")}\n${right >= 0 ? `The dot product at $${names[right]}$ is zero, so the right angle is at $${names[right]}$.` : "No dot product is zero, so the triangle has no right angle."}`,
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
    prompt: `A constant force ${fDesc} moves a particle from $P${P(p)}$ to $Q${P(q)}$. Find the work done, $W = \\mathbf{F}\\cdot\\mathbf{r}$, where $\\mathbf{r}$ is the displacement.`,
    correct: W.tex(),
    distractors: ds.map((x) => x.tex()),
    solution: `${fSol}$\\mathbf{r} = \\overrightarrow{PQ} = Q - P = ${V(r)}$.\n$W = \\mathbf{F}\\cdot\\mathbf{r} = ${f.map((x, i) => `(${x.tex()})(${r[i].tex()})`).join(" + ")} = ${W.tex()}$.\nUse the displacement $Q - P$, not the position vectors.`,
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
      solution: `Parallelogram law: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 + \\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2 + 2\\|\\mathbf{v}\\|^2$.\n$${p} + ${m} = 2(${a}) + 2\\|\\mathbf{v}\\|^2 \\Rightarrow \\|\\mathbf{v}\\|^2 = ${b}$, so $\\|\\mathbf{v}\\| = ${nr(b)}$. (Forgetting the factor 2 on $\\|\\mathbf{v}\\|^2$ is the usual slip.)`,
    });
  }
  if (mode === "dot") {
    const opt = (x: Frac) => `\\mathbf{u}\\cdot\\mathbf{v} = ${x.tex()}`;
    return mcq(rng, {
      subtopic: "Norm identities & inequalities",
      prompt: `${head} $\\|\\mathbf{u}+\\mathbf{v}\\| = ${nr(p)}$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = ${nr(m)}$. Find $\\mathbf{u}\\cdot\\mathbf{v}$.`,
      correct: opt(F(c)),
      distractors: [opt(F(p - m)), opt(F(p - m, 2)), opt(F(m - p, 4)), opt(F(p + m, 4)), opt(F(p - m, 8))],
      solution: `Polarization identity: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\tfrac14\\|\\mathbf{u}-\\mathbf{v}\\|^2 = \\tfrac14(${p} - ${m}) = ${c}$.\n(It comes from subtracting $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.)`,
    });
  }
  // cos theta given ||u||, ||u+v||, ||u-v||
  const opt = (num: number, rad: number) => `\\cos\\theta = ${surdTex(F(num, rad), rad)}`;
  return mcq(rng, {
    subtopic: "Norm identities & inequalities",
    prompt: `${head} $\\|\\mathbf{u}\\| = ${nr(a)}$, $\\|\\mathbf{u}+\\mathbf{v}\\| = ${nr(p)}$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = ${nr(m)}$. If $\\theta$ is the angle between $\\mathbf{u}$ and $\\mathbf{v}$, find $\\cos\\theta$.`,
    correct: opt(c, a * b),
    distractors: [opt(-c, a * b), opt(2 * c, a * b), opt(c, a * (p + m - a)), opt(4 * c, a * b), opt(c, a + b)],
    solution: `Polarization: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14(${p} - ${m}) = ${c}$.\nParallelogram law: $${p} + ${m} = 2(${a}) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = ${b}$.\n$$\\cos\\theta = \\frac{${c}}{\\sqrt{${a}}\\sqrt{${b}}} = ${surdTex(F(c, a * b), a * b)}$$`,
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
    solution: `Let $\\mathbf{w} = ${combo} = ${V(w)}$, so $\\|\\mathbf{w}\\| = ${sqrtTex(ww)}$.\nCauchy–Schwarz: $|\\mathbf{v}^T\\mathbf{w}| \\le \\|\\mathbf{v}\\|\\|\\mathbf{w}\\| \\le ${r}\\|\\mathbf{w}\\| = ${val(r, ww)}$, with equality at $\\mathbf{v} = ${r}\\,\\mathbf{w}/\\|\\mathbf{w}\\|$ (parallel to $\\mathbf{w}$).`,
  });
}

function crossArea(rng: Rng): Draft {
  if (rng.chance(0.45)) {
    const u = randVec(rng, 3, -4, 4);
    const v = randVec(rng, 3, -4, 4);
    if (parallel(u, v)) retry();
    const c = cross(u, v);
    const slip: Vec = [c[0], c[1].neg(), c[2]];
    const plus: Vec = [u[1].mul(v[2]).add(u[2].mul(v[1])), u[2].mul(v[0]).add(u[0].mul(v[2])), u[0].mul(v[1]).add(u[1].mul(v[0]))];
    return mcq(rng, {
      subtopic: "Cross product",
      prompt: `Compute $\\mathbf{u}\\times\\mathbf{v}$ for $\\mathbf{u} = ${V(u)}$ and $\\mathbf{v} = ${V(v)}$.`,
      correct: V(c),
      distractors: [V(vscale(c, -1)), V(slip), V(plus), V([c[1], c[0], c[2]]), V([c[0], c[1], c[2].neg()])],
      solution: `$\\mathbf{u}\\times\\mathbf{v} = (u_2v_3-u_3v_2,\\ u_3v_1-u_1v_3,\\ u_1v_2-u_2v_1) = ${V(c)}$.\nCheck: $(\\mathbf{u}\\times\\mathbf{v})\\cdot\\mathbf{u} = ${dot(c, u).tex()}$ and $(\\mathbf{u}\\times\\mathbf{v})\\cdot\\mathbf{v} = ${dot(c, v).tex()}$. ($\\mathbf{v}\\times\\mathbf{u}$ is the negative.)`,
    });
  }
  const A = randVec(rng, 3, -3, 3);
  const B = randVec(rng, 3, -3, 3);
  const C = randVec(rng, 3, -3, 3);
  const ab = vsub(B, A), ac = vsub(C, A);
  if (isZeroVec(ab) || isZeroVec(ac) || parallel(ab, ac)) retry();
  const c = cross(ab, ac);
  const cc = dot(c, c).n;
  const tri = rng.chance(0.6);
  const half = F(1, 2);
  const correct = tri ? surdTex(half, cc) : surdTex(F(1), cc);
  return mcq(rng, {
    subtopic: "Cross product",
    prompt: tri
      ? `Find the area of the triangle with vertices $A${P(A)}$, $B${P(B)}$ and $C${P(C)}$.`
      : `Find the area of the parallelogram with adjacent sides $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$, where $A${P(A)}$, $B${P(B)}$, $C${P(C)}$.`,
    correct,
    distractors: [
      tri ? surdTex(F(1), cc) : surdTex(half, cc),
      F(cc).mul(tri ? half : F(1)).tex(),
      surdTex(tri ? half : F(1), dot(ab, ab).mul(dot(ac, ac)).n),
      abs(dot(ab, ac)).mul(tri ? half : F(1)).tex(),
      surdTex(tri ? F(1, 4) : F(1, 2), cc),
    ],
    solution: `$\\overrightarrow{AB} = ${V(ab)}$, $\\overrightarrow{AC} = ${V(ac)}$, and $\\overrightarrow{AB}\\times\\overrightarrow{AC} = ${V(c)}$ with norm $\\sqrt{${cc}}$.\n${tri ? `Triangle area $= \\tfrac12\\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\| = ${correct}$ (the parallelogram would be twice this).` : `Parallelogram area $= \\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\| = ${correct}$ (no $\\tfrac12$; that is for the triangle).`}`,
  });
}

function planeThrough3(rng: Rng): Draft {
  const A = randVec(rng, 3, -3, 3);
  const B = randVec(rng, 3, -3, 3);
  const C = randVec(rng, 3, -3, 3);
  const ab = vsub(B, A), ac = vsub(C, A);
  if (isZeroVec(ab) || isZeroVec(ac) || parallel(ab, ac)) retry();
  const raw = cross(ab, ac);
  const n = primitive(raw);
  if (maxAbs(n) > 9 || n.filter((x) => !x.isZero()).length < 2) retry();
  const d = dot(n, A);
  const cands: [Vec, Frac][] = [
    [n, d.neg()],
    [[n[0], n[1].neg(), n[2]], dot([n[0], n[1].neg(), n[2]], A)],
    [ab, dot(ab, A)],
    [n, dot(n, B).add(1)],
    [n, dot(n, vadd(A, B))],
  ];
  const ds = cands.filter(([m, e]) => !isZeroVec(m) && !samePlane(n, d, m, e)).map(([m, e]) => planeTex(m, e));
  return mcq(rng, {
    subtopic: "Lines & planes",
    prompt: `Find an equation of the plane passing through $A${P(A)}$, $B${P(B)}$ and $C${P(C)}$.`,
    correct: planeTex(n, d),
    distractors: ds,
    solution: `$\\overrightarrow{AB} = ${V(ab)}$, $\\overrightarrow{AC} = ${V(ac)}$.\nNormal: $\\overrightarrow{AB}\\times\\overrightarrow{AC} = ${V(raw)}$${n.every((x, i) => x.eq(raw[i])) ? "" : `, or more simply $\\mathbf{n} = ${V(n)}$`}.\n$d = \\mathbf{n}\\cdot A = ${d.tex()}$, so the plane is $${planeTex(n, d)}$.\nCheck: $B$ gives $${dot(n, B).tex()}$ and $C$ gives $${dot(n, C).tex()}$ ✓.`,
  });
}

function pointOnPlane(rng: Rng): Draft {
  const n = randVec(rng, 3, -3, 3);
  if (n.filter((x) => !x.isZero()).length < 2) retry();
  const P0 = randVec(rng, 3, -4, 4);
  const d = dot(n, P0);
  // in-plane directions
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
  // the sign-slip point: satisfies n.x = -d
  const asked = rng.chance(0.5);
  const planeDesc = asked
    ? `the plane $${planeTex(n, d)}$`
    : `the plane passing through $${P(P0)}$ with normal vector $\\mathbf{n} = ${V(n)}$`;
  const evals = (q: Vec) => `$${P(q)}$: $${dot(n, q).tex()}$`;
  const draft = mcq(rng, {
    subtopic: "Lines & planes",
    prompt: `Which of the following points lies on ${planeDesc}?`,
    correct: P(on),
    distractors: offs.map(P),
    solution: `${asked ? "" : `Point-normal form $\\mathbf{n}\\cdot(\\mathbf{x} - P_0) = 0$ gives $${lin(n)} = \\mathbf{n}\\cdot P_0 = ${d.tex()}$.\n`}Substitute each point into $${lin(n)}$ and compare with $${d.tex()}$: ${[on, ...offs].map(evals).join("; ")}.\nOnly $${P(on)}$ gives $${d.tex()}$, so it is the only point on the plane.`,
  });
  return draft;
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
    solution: `Substitute the line into the plane: $\\mathbf{n}\\cdot P_0 + t\\,(\\mathbf{n}\\cdot\\mathbf{d}) = ${dot(n, P0).tex()} ${nd.n < 0 ? "-" : "+"} ${nd.abs().eq(1) ? "" : nd.abs().tex()}t = ${c.tex()}$, so $t = ${t.tex()}$.\nPoint: $${P(X)}$. Check: $${lin(n)}$ at this point is $${c.tex()}$ ✓.`,
  });
}

const COORD = [
  { name: "$yz$-plane", eq: "x = 0" },
  { name: "$xz$-plane", eq: "y = 0" },
  { name: "$xy$-plane", eq: "z = 0" },
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
    solution: `$\\mathbf{d} = \\overrightarrow{AB} = ${V(d)}$, so the line is $${lineParam(A, d)}$.\nThe ${COORD[i].name} is $${COORD[i].eq}$: $${affine(A[i], d[i])} = 0 \\Rightarrow t = ${t.tex()}$.\nPoint: $${P(X)}$. (Read the plane carefully: the $xy$-plane is $z = 0$, etc.)`,
  });
}

function distPointPlane(rng: Rng): Draft {
  const { v: n, norm } = pythVec(rng, 3);
  if (rng.chance(0.6)) {
    const p = randVec(rng, 3, -4, 4);
    const d = F(rng.int(-9, 9));
    const num = dot(n, p).sub(d);
    if (num.isZero()) retry();
    const D = num.abs().div(norm);
    return mcq(rng, {
      subtopic: "Distance to a plane",
      prompt: `Find the distance from the point $${P(p)}$ to the plane $${planeTex(n, d)}$.`,
      correct: D.tex(),
      distractors: [num.abs().div(norm * norm).tex(), num.abs().tex(), dot(n, p).add(d).abs().div(norm).tex(), dot(n, p).abs().div(norm).tex(), D.mul(2).tex()],
      solution: `$$D = \\frac{|ax_0+by_0+cz_0-d|}{\\sqrt{a^2+b^2+c^2}} = \\frac{|${dot(n, p).tex()} - (${d.tex()})|}{\\sqrt{${norm * norm}}} = \\frac{${num.abs().tex()}}{${norm}}${D.d === norm ? "" : ` = ${D.tex()}`}$$\nDivide by $\\|\\mathbf{n}\\|$ (not $\\|\\mathbf{n}\\|^2$) and remember to subtract $d$.`,
    });
  }
  // parallel planes, the second written with a scaled normal
  const k = rng.pick([2, 3, -2, -1]);
  const d1 = F(rng.int(-8, 8));
  const d2 = F(rng.int(-8, 8));
  if (d1.eq(d2)) retry();
  const D = d1.sub(d2).abs().div(norm);
  const kd2 = d2.mul(k);
  return mcq(rng, {
    subtopic: "Distance to a plane",
    prompt: `Find the distance between the parallel planes $${planeTex(n, d1)}$ and $${planeTex(vscale(n, k), kd2)}$.`,
    correct: D.tex(),
    distractors: [d1.sub(kd2).abs().div(norm).tex(), d1.sub(kd2).abs().div(norm * Math.abs(k)).tex(), d1.add(d2).abs().div(norm).tex(), d1.sub(d2).abs().div(norm * norm).tex(), d1.sub(d2).abs().tex()],
    solution: `Divide the second equation by $${k}$ so both planes share the normal $${V(n)}$: $${planeTex(n, d2)}$.\nDistance $= \\dfrac{|${d1.tex()} - (${d2.tex()})|}{\\sqrt{${norm * norm}}} = ${D.tex()}$. Comparing $${d1.tex()}$ with $${kd2.tex()}$ directly is the classic trap.`,
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
    d = primitive(cross(n, randVec(rng, 3, -2, 2)));
    if (isZeroVec(d) || maxAbs(d) > 8) retry();
  }
  const c = kind === "par" ? dot(n, P0).add(rng.nz(-4, 4)) : dot(n, P0);
  const nd = dot(n, d);
  const nP = dot(n, P0);
  const viaNormals = kind !== "cross" && rng.chance(0.3);
  let lineDesc = `the line $\\mathbf{x} = ${V(P0)} + t${V(d)}$`;
  let dirSol = "";
  if (viaNormals) {
    // describe the direction as perpendicular to two vectors whose cross product is d
    const a = primitive(cross(d, randVec(rng, 3, -2, 2)));
    if (isZeroVec(a) || maxAbs(a) > 6) retry();
    const bb = primitive(cross(d, a));
    const dd = cross(a, bb);
    if (maxAbs(bb) > 9 || !parallel(dd, d)) retry();
    lineDesc = `the line through $${P(P0)}$ perpendicular to both $${V(a)}$ and $${V(bb)}$`;
    dirSol = `The direction is $${V(a)}\\times${V(bb)} = ${V(dd)}$, a multiple of $${V(d)}$.\n`;
  }
  const truth = kind === "in";
  return tfn({
    subtopic: "Line–plane intersection",
    prompt: `${lineDesc.charAt(0).toUpperCase()}${lineDesc.slice(1)} lies in the plane $${planeTex(n, c)}$.`,
    answer: truth ? 0 : 1,
    solution: `${dirSol}A line lies in a plane iff its direction is orthogonal to the normal **and** one of its points satisfies the equation.\n$\\mathbf{n}\\cdot\\mathbf{d} = ${V(n)}\\cdot${V(d)} = ${nd.tex()}$${nd.isZero() ? " (parallel to the plane)" : ", nonzero, so the line crosses the plane in exactly one point"}.\n${nd.isZero() ? `The point $${P(P0)}$ gives $${lin(n)} = ${nP.tex()}$, ${nP.eq(c) ? "which matches, so the whole line lies in the plane. **True**." : `but the plane needs $${c.tex()}$. The line is parallel to the plane and never meets it. **False**.`}` : "**False**."}`,
  });
}

/** Unit vector making a given angle with one axis, plus a norm condition. */
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
    subtopic: "Direction angles",
    prompt: `A unit vector $\\mathbf{x}\\in\\mathbb{R}^3$ makes an angle of $${ang.tex}$ with the $${AX[i]}$-axis, and $\\mathbf{x} ${s > 0 ? "+" : "-"} ${E[j]}$ is also a unit vector. If the $${AX[k]}$-component of $\\mathbf{x}$ is ${kPos ? "positive" : "negative"}, find $\\mathbf{x}$.`,
    correct,
    distractors: ds,
    noneRate: 0.1,
    solution: `The angle with the $${AX[i]}$-axis gives $x_${i + 1} = \\mathbf{x}\\cdot${E[i]} = \\cos(${ang.tex}) = ${ang.c}$.\n$\\|\\mathbf{x} ${s > 0 ? "+" : "-"} ${E[j]}\\|^2 = \\|\\mathbf{x}\\|^2 ${s > 0 ? "+" : "-"} 2x_${j + 1} + 1 = 2 ${s > 0 ? "+" : "-"} 2x_${j + 1} = 1$, so $x_${j + 1} = ${xj}$.\nThen $x_${k + 1}^2 = 1 - ${ang.sq.tex()} - \\tfrac14 = ${rest.tex()}$ and the sign condition gives $x_${k + 1} = ${xk}$.\nSo $\\mathbf{x} = ${correct}$.`,
  });
}

export const vectorsGens: ((rng: Rng) => Draft)[] = [
  linComb, initialPoint, unitVec, triangleAngle, rightTriangle, work, normIdentities, csMax,
  crossArea, planeThrough3, pointOnPlane, linePlaneIntersect, lineCoordPlane, distPointPlane, lineInPlane, unitAtAngle,
];
