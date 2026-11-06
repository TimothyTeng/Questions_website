import {
  colTex, cross, dot, F, Frac, isZeroVec, matTex, matvec, primitive, rowTex, rowTexPlain, sqrtTex, transpose,
  vadd, Vec, vscale, vsub,
} from "@/lib/math/frac";
import { mcq, retry, tfn, type Draft, type Rng } from "./common";
import { maxAbs, orthBasis3, orthoMatrix, orthPair, parallel, pythVec, randVec } from "./shared";

const proj = (y: Vec, u: Vec) => vscale(u, dot(y, u).div(dot(u, u)));

function findK(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const u = randVec(rng, n, -5, 5);
  const pos = rng.int(0, n - 1);
  if (u[pos].isZero()) retry();
  const v = randVec(rng, n, -5, 5);
  const rest = dot(u, v).sub(u[pos].mul(v[pos]));
  if (rest.isZero()) retry();
  const k = rest.neg().div(u[pos]);
  const vTex = v.map((x, i) => (i === pos ? "k" : x.tex())).join(",\\ ");
  return mcq(rng, {
    subtopic: "Dot product",
    prompt: `Find $k$ such that $\\mathbf{u} = ${rowTexPlain(u)}$ and $\\mathbf{v} = [${vTex}]^T$ are orthogonal.`,
    correct: `k = ${k.tex()}`,
    distractors: [k.neg(), rest.neg(), u[pos].div(rest), rest.div(u[pos]).add(1), k.add(1), k.mul(2)].map((x) => `k = ${x.tex()}`),
    solution: `Orthogonal means $\\mathbf{u}\\cdot\\mathbf{v} = 0$.\n$\\mathbf{u}\\cdot\\mathbf{v} = ${rest.tex()} + (${u[pos].tex()})k = 0 \\Rightarrow k = ${k.tex()}$.`,
  });
}

function unitVector(rng: Rng): Draft {
  const { v, norm } = pythVec(rng, rng.pick([3, 3, 4]));
  const u = vscale(v, F(1, norm));
  const sumAbs = v.reduce((s, x) => s + Math.abs(x.valueOf()), 0);
  return mcq(rng, {
    subtopic: "Norm & unit vectors",
    prompt: `Find the unit vector in the direction of $\\mathbf{v} = ${rowTexPlain(v)}$.`,
    correct: rowTex(u),
    distractors: [
      rowTex(vscale(v, F(1, norm * norm))),
      rowTex(vscale(v, F(1, sumAbs))),
      rowTex(vscale(u, -1)),
      rowTex(vscale(v, F(1, norm + 1))),
      rowTex(vscale(v.map((x) => x.abs()), F(1, norm))),
    ],
    solution: `$\\|\\mathbf{v}\\| = \\sqrt{${v.map((x) => `(${x.tex()})^2`).join("+")}} = \\sqrt{${norm * norm}} = ${norm}$.\nUnit vector $= \\mathbf{v}/\\|\\mathbf{v}\\| = ${rowTex(u)}$. (Dividing by $\\|\\mathbf{v}\\|^2$ is a common slip.)`,
  });
}

function angleCos(rng: Rng): Draft {
  const a = pythVec(rng, 3);
  const b = pythVec(rng, 3);
  const d = dot(a.v, b.v);
  if (d.isZero() || parallel(a.v, b.v)) retry();
  const c = d.div(a.norm * b.norm);
  const kind = c.n > 0 ? "acute" : "obtuse";
  return mcq(rng, {
    subtopic: "Dot product",
    prompt: `Let $\\mathbf{u} = ${rowTexPlain(a.v)}$ and $\\mathbf{v} = ${rowTexPlain(b.v)}$. Find $\\cos\\theta$, where $\\theta$ is the angle between them, and state whether $\\theta$ is acute or obtuse.`,
    correct: `\\cos\\theta = ${c.tex()},\\ \\text{${kind}}`,
    distractors: [
      `\\cos\\theta = ${c.neg().tex()},\\ \\text{${kind === "acute" ? "obtuse" : "acute"}}`,
      `\\cos\\theta = ${c.tex()},\\ \\text{${kind === "acute" ? "obtuse" : "acute"}}`,
      `\\cos\\theta = ${d.div(a.norm * a.norm * b.norm * b.norm).tex()},\\ \\text{${kind}}`,
      `\\cos\\theta = ${d.div(a.norm + b.norm).tex()},\\ \\text{${kind}}`,
    ],
    solution: `$\\cos\\theta = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|} = \\dfrac{${d.tex()}}{${a.norm}\\cdot ${b.norm}} = ${c.tex()}$.\nThe sign of the dot product decides: positive → acute, negative → obtuse.`,
  });
}

function projLine(rng: Rng): Draft {
  const n = rng.pick([2, 3, 3]);
  const u = randVec(rng, n, -3, 3);
  const y = randVec(rng, n, -5, 5);
  const yu = dot(y, u);
  if (yu.isZero() || parallel(y, u)) retry();
  const p = proj(y, u);
  const z = vsub(y, p);
  const askOrth = rng.chance(0.4);
  const correct = askOrth ? z : p;
  const ds = [
    askOrth ? p : z,
    vscale(u, yu),
    vscale(y, yu.div(dot(u, u))),
    vscale(u, yu.div(dot(y, y))),
    askOrth ? vadd(y, p) : vscale(u, dot(u, u).div(yu)),
  ];
  return mcq(rng, {
    subtopic: "Projection onto a line",
    prompt: askOrth
      ? `Let $\\mathbf{y} = ${rowTexPlain(y)}$ and $\\mathbf{u} = ${rowTexPlain(u)}$. Write $\\mathbf{y} = \\hat{\\mathbf{y}} + \\mathbf{z}$ with $\\hat{\\mathbf{y}} \\in \\operatorname{Span}\\{\\mathbf{u}\\}$ and $\\mathbf{z} \\perp \\mathbf{u}$. Find $\\mathbf{z}$.`
      : `Find the orthogonal projection of $\\mathbf{y} = ${rowTexPlain(y)}$ onto $\\mathbf{u} = ${rowTexPlain(u)}$.`,
    correct: rowTex(correct),
    distractors: ds.map(rowTex),
    solution: `$\\hat{\\mathbf{y}} = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}\\mathbf{u} = \\dfrac{${yu.tex()}}{${dot(u, u).tex()}}${colTex(u)} = ${rowTex(p)}$.` +
      (askOrth ? `\n$\\mathbf{z} = \\mathbf{y} - \\hat{\\mathbf{y}} = ${rowTex(z)}$. Check: $\\mathbf{z}\\cdot\\mathbf{u} = 0$.` : ""),
  });
}

function projSubspace(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]) as 3 | 4;
  const [u1, u2] = orthPair(rng, n);
  const y = randVec(rng, n, -4, 4);
  const c1 = dot(y, u1).div(dot(u1, u1));
  const c2 = dot(y, u2).div(dot(u2, u2));
  const yh = vadd(vscale(u1, c1), vscale(u2, c2));
  const z = vsub(y, yh);
  if (isZeroVec(z) || c1.isZero() || c2.isZero()) retry();
  const mode = rng.pick(["proj", "proj", "dist"]);
  const head = `Let $W = \\operatorname{Span}\\{\\mathbf{u}_1, \\mathbf{u}_2\\}$ where $\\mathbf{u}_1 = ${rowTexPlain(u1)}$, $\\mathbf{u}_2 = ${rowTexPlain(u2)}$, and let $\\mathbf{y} = ${rowTexPlain(y)}$.`;
  const sol = `$\\mathbf{u}_1\\cdot\\mathbf{u}_2 = 0$, so $\\{\\mathbf{u}_1,\\mathbf{u}_2\\}$ is an orthogonal basis of $W$ and\n$$\\hat{\\mathbf{y}} = \\frac{\\mathbf{y}\\cdot\\mathbf{u}_1}{\\mathbf{u}_1\\cdot\\mathbf{u}_1}\\mathbf{u}_1 + \\frac{\\mathbf{y}\\cdot\\mathbf{u}_2}{\\mathbf{u}_2\\cdot\\mathbf{u}_2}\\mathbf{u}_2 = ${c1.tex()}\\,\\mathbf{u}_1 + ${c2.tex()}\\,\\mathbf{u}_2 = ${rowTex(yh)}$$`;
  if (mode === "proj") {
    return mcq(rng, {
      subtopic: "Projection onto a subspace",
      prompt: `${head} Find $\\hat{\\mathbf{y}} = \\operatorname{Proj}_W \\mathbf{y}$.`,
      correct: rowTex(yh),
      distractors: [
        rowTex(vadd(vscale(u1, dot(y, u1)), vscale(u2, dot(y, u2)))),
        rowTex(vscale(u1, c1)),
        rowTex(vscale(u2, c2)),
        rowTex(z),
        rowTex(vsub(vscale(u1, c1), vscale(u2, c2))),
      ],
      solution: sol,
    });
  }
  const d2 = dot(z, z);
  return mcq(rng, {
    subtopic: "Best approximation",
    prompt: `${head} Find the distance from $\\mathbf{y}$ to $W$.`,
    correct: sqrtTex(d2),
    distractors: [d2.tex(), sqrtTex(dot(yh, yh)), sqrtTex(dot(y, y)), sqrtTex(d2.add(1)), sqrtTex(d2.mul(2))],
    solution: `${sol}\nBy the Best Approximation Theorem the distance is $\\|\\mathbf{y}-\\hat{\\mathbf{y}}\\| = \\|${rowTex(z)}\\| = \\sqrt{${d2.tex()}} = ${sqrtTex(d2)}$.`,
  });
}

function coordsOrthBasis(rng: Rng): Draft {
  const [u1, u2, u3] = orthBasis3(rng);
  const y = randVec(rng, 3, -5, 5);
  const us = [u1, u2, u3];
  const c = us.map((u) => dot(y, u).div(dot(u, u)));
  const raw = us.map((u) => dot(y, u));
  const wrongDen = us.map((u) => dot(y, u).div(dot(u, u).mul(2)));
  return mcq(rng, {
    subtopic: "Orthogonal basis",
    prompt: `$\\{\\mathbf{u}_1,\\mathbf{u}_2,\\mathbf{u}_3\\}$ with $\\mathbf{u}_1 = ${rowTexPlain(u1)}$, $\\mathbf{u}_2 = ${rowTexPlain(u2)}$, $\\mathbf{u}_3 = ${rowTexPlain(u3)}$ is an orthogonal basis of $\\mathbb{R}^3$. Express $\\mathbf{y} = ${rowTexPlain(y)}$ as $c_1\\mathbf{u}_1 + c_2\\mathbf{u}_2 + c_3\\mathbf{u}_3$. Find $(c_1, c_2, c_3)$.`,
    correct: `(${c.map((x) => x.tex()).join(",\\ ")})`,
    distractors: [
      `(${raw.map((x) => x.tex()).join(",\\ ")})`,
      `(${wrongDen.map((x) => x.tex()).join(",\\ ")})`,
      `(${[c[1], c[0], c[2]].map((x) => x.tex()).join(",\\ ")})`,
      `(${[c[0], c[1].neg(), c[2]].map((x) => x.tex()).join(",\\ ")})`,
      `(${[c[0], c[1], c[2].neg()].map((x) => x.tex()).join(",\\ ")})`,
    ],
    solution: `For an orthogonal basis, $c_i = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_i}{\\mathbf{u}_i\\cdot\\mathbf{u}_i}$ (no row reduction needed).\n${us.map((u, i) => `$c_${i + 1} = \\dfrac{${raw[i].tex()}}{${dot(u, u).tex()}} = ${c[i].tex()}$`).join(", ")}.`,
  });
}

function gramSchmidt(rng: Rng): Draft {
  const n = rng.pick([3, 3, 4]);
  const x1 = randVec(rng, n, -2, 3);
  const x2 = randVec(rng, n, -3, 4);
  const d = dot(x1, x2);
  if (d.isZero() || parallel(x1, x2)) retry();
  const pr = proj(x2, x1);
  const v2 = vsub(x2, pr);
  const cands = [vadd(x2, pr), vsub(x1, proj(x1, x2)), vsub(x2, vscale(x1, d)), vsub(x2, vscale(x1, d.div(dot(x2, x2)))), pr];
  const ds = cands.filter((c) => !isZeroVec(c) && !parallel(c, v2));
  return mcq(rng, {
    subtopic: "Gram–Schmidt & QR",
    prompt: `Apply the Gram–Schmidt process to $\\mathbf{x}_1 = ${rowTexPlain(x1)}$, $\\mathbf{x}_2 = ${rowTexPlain(x2)}$ (in that order, without normalising). With $\\mathbf{v}_1 = \\mathbf{x}_1$, which vector is $\\mathbf{v}_2$?`,
    correct: rowTex(v2),
    distractors: ds.map(rowTex),
    solution: `$\\mathbf{v}_2 = \\mathbf{x}_2 - \\dfrac{\\mathbf{x}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}\\mathbf{v}_1 = \\mathbf{x}_2 - \\dfrac{${d.tex()}}{${dot(x1, x1).tex()}}\\mathbf{v}_1 = ${rowTex(v2)}$.\nCheck: $\\mathbf{v}_2\\cdot\\mathbf{v}_1 = 0$.`,
  });
}

function qrEntries(rng: Rng): Draft {
  const { v: x1, norm } = pythVec(rng, rng.pick([3, 4]));
  const x2 = randVec(rng, x1.length, -4, 4);
  const d = dot(x1, x2);
  if (d.isZero() || parallel(x1, x2)) retry();
  const r12 = d.div(norm);
  const A = transpose([x1, x2]);
  const opt = (a: Frac | number, b: Frac) => `r_{11} = ${Frac.of(a).tex()},\\ r_{12} = ${b.tex()}`;
  return mcq(rng, {
    subtopic: "Gram–Schmidt & QR",
    prompt: `Let $A = ${matTex(A)} = QR$ be the (economy) QR factorisation obtained from Gram–Schmidt, with $R = \\begin{bmatrix} r_{11} & r_{12} \\\\ 0 & r_{22}\\end{bmatrix}$ having positive diagonal. Find $r_{11}$ and $r_{12}$.`,
    correct: opt(norm, r12),
    distractors: [opt(norm, d), opt(norm * norm, d), opt(norm, d.div(norm * norm)), opt(norm, r12.neg()), opt(norm * norm, r12)],
    solution: `$r_{11} = \\|\\mathbf{a}_1\\| = ${norm}$, so $\\mathbf{q}_1 = \\mathbf{a}_1/${norm}$.\n$r_{12} = \\mathbf{q}_1\\cdot\\mathbf{a}_2 = \\dfrac{\\mathbf{a}_1\\cdot\\mathbf{a}_2}{\\|\\mathbf{a}_1\\|} = \\dfrac{${d.tex()}}{${norm}} = ${r12.tex()}$. (In general $R = Q^TA$, so $r_{ij} = \\mathbf{q}_i\\cdot\\mathbf{a}_j$.)`,
  });
}

function complement(rng: Rng): Draft {
  const a = randVec(rng, 3, -3, 3);
  const b = randVec(rng, 3, -3, 3);
  if (parallel(a, b)) retry();
  const nrm = primitive(cross(a, b));
  if (maxAbs(nrm) > 9) retry();
  const correct = vscale(nrm, rng.pick([1, -1, 2]));
  const ds: Vec[] = [a, vadd(a, b)];
  for (let t = 0; t < 30 && ds.length < 6; t++) {
    const w = randVec(rng, 3, -2, 2);
    const c = primitive(cross(rng.chance(0.5) ? a : b, w));
    if (!isZeroVec(c) && maxAbs(c) <= 9 && !parallel(c, nrm)) ds.push(c);
  }
  const asNul = rng.chance(0.5);
  return mcq(rng, {
    subtopic: "Orthogonal complement",
    prompt: asNul
      ? `Let $A = ${matTex([a, b])}$. Which vector lies in $(\\operatorname{Row} A)^{\\perp}$ (equivalently, $\\operatorname{Nul} A$)?`
      : `Let $W = \\operatorname{Span}\\{${rowTexPlain(a)},\\ ${rowTexPlain(b)}\\}$ in $\\mathbb{R}^3$. Which vector lies in $W^{\\perp}$?`,
    correct: rowTex(correct),
    distractors: ds.map(rowTex),
    solution: `A vector is in ${asNul ? "$(\\operatorname{Row}A)^\\perp = \\operatorname{Nul}A$" : "$W^\\perp$"} iff it is orthogonal to **both** spanning vectors. $${rowTex(correct)}$ gives dot products $${dot(correct, a).tex()}$ and $${dot(correct, b).tex()}$. (It is a multiple of $\\mathbf{a}\\times\\mathbf{b} = ${rowTex(cross(a, b))}$.) Each other option fails at least one dot-product test.`,
  });
}

function orthoSolve(rng: Rng): Draft {
  const { M, k, U } = orthoMatrix(rng);
  const n = M.length;
  const b = randVec(rng, n, -4, 4);
  const x = matvec(transpose(U), b);
  return mcq(rng, {
    subtopic: "Orthogonal matrices",
    prompt: `$U = ${matTex(U)}$ is an orthogonal matrix. Solve $U\\mathbf{x} = \\mathbf{b}$ for $\\mathbf{b} = ${rowTexPlain(b)}$.`,
    correct: rowTex(x),
    distractors: [rowTex(matvec(U, b)), rowTex(vscale(x, k)), rowTex(vscale(x, F(1, k))), rowTex(vscale(matvec(U, b), -1)), rowTex(vscale(x, -1))],
    solution: `$U$ is square with orthonormal columns, so $U^{-1} = U^T$ and $\\mathbf{x} = U^T\\mathbf{b} = ${rowTex(x)}$. No row reduction required.`,
  });
}

function normPreserve(rng: Rng): Draft {
  const { U } = orthoMatrix(rng, 3);
  const tall = U.map((r) => r.slice(0, 2));
  const x = randVec(rng, 2, -5, 5);
  const y = randVec(rng, 2, -5, 5);
  const askDot = rng.chance(0.5);
  const xy = dot(x, y);
  const xx = dot(x, x);
  if (askDot && xy.isZero()) retry();
  const Ux = matvec(tall, x);
  const correct = askDot ? xy.tex() : sqrtTex(xx);
  const ds = askDot
    ? [xy.neg(), xy.mul(9), xy.div(9), dot(x, x), xy.add(1)].map((z) => z.tex())
    : [xx.tex(), sqrtTex(xx.mul(9)), sqrtTex(xx.div(9)), sqrtTex(xx.add(2)), sqrtTex(xx.mul(2))];
  return mcq(rng, {
    subtopic: "Orthonormal columns",
    prompt: `The $3\\times 2$ matrix $U = ${matTex(tall)}$ has orthonormal columns. Let $\\mathbf{x} = ${rowTexPlain(x)}$ and $\\mathbf{y} = ${rowTexPlain(y)}$. Find ${askDot ? "$(U\\mathbf{x})\\cdot(U\\mathbf{y})$" : "$\\|U\\mathbf{x}\\|$"}.`,
    correct,
    distractors: ds,
    solution: `Since $U^TU = I$: ${askDot ? `$(U\\mathbf{x})\\cdot(U\\mathbf{y}) = \\mathbf{x}^TU^TU\\mathbf{y} = \\mathbf{x}\\cdot\\mathbf{y} = ${xy.tex()}$` : `$\\|U\\mathbf{x}\\| = \\|\\mathbf{x}\\| = \\sqrt{${xx.tex()}} = ${sqrtTex(xx)}$ (check: $U\\mathbf{x} = ${rowTex(Ux)}$)`}. Multiplying by a matrix with orthonormal columns preserves lengths and dot products.`,
  });
}

function isOrthSet(rng: Rng): Draft {
  const [a, b, c] = orthBasis3(rng);
  const broken = rng.chance(0.5);
  const vs = [a, b, c];
  if (broken) {
    const i = rng.int(0, 2);
    const j = rng.int(0, 2);
    vs[i] = vs[i].map((x, k) => (k === j ? x.add(rng.pick([1, -1])) : x));
  }
  const pairs = [[0, 1], [0, 2], [1, 2]].map(([i, j]) => `$\\mathbf{v}_${i + 1}\\cdot\\mathbf{v}_${j + 1} = ${dot(vs[i], vs[j]).tex()}$`);
  const ok = [[0, 1], [0, 2], [1, 2]].every(([i, j]) => dot(vs[i], vs[j]).isZero());
  return tfn({
    subtopic: "Orthogonal sets",
    prompt: `The set $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ with $\\mathbf{v}_1 = ${rowTexPlain(vs[0])}$, $\\mathbf{v}_2 = ${rowTexPlain(vs[1])}$, $\\mathbf{v}_3 = ${rowTexPlain(vs[2])}$ is an orthogonal basis for $\\mathbb{R}^3$.`,
    answer: ok ? 0 : 1,
    solution: `Check every pair: ${pairs.join(", ")}. ${ok ? "All are zero, and an orthogonal set of nonzero vectors is linearly independent, so 3 of them form a basis of $\\mathbb{R}^3$." : "At least one dot product is nonzero, so the set is not orthogonal."}`,
  });
}

function projMatrixLine(rng: Rng): Draft {
  const u = randVec(rng, rng.pick([2, 3]), -3, 3);
  if (u.filter((x) => !x.isZero()).length < 2) retry();
  const uu = dot(u, u);
  const P = u.map((a) => u.map((b) => a.mul(b).div(uu)));
  const y = randVec(rng, u.length, -4, 4);
  const Py = matvec(P, y);
  if (isZeroVec(Py)) retry();
  return mcq(rng, {
    subtopic: "Projection onto a line",
    prompt: `Let $L = \\operatorname{Span}\\{\\mathbf{u}\\}$ with $\\mathbf{u} = ${rowTexPlain(u)}$. Which matrix $P$ satisfies $P\\mathbf{y} = \\operatorname{Proj}_L\\mathbf{y}$ for every $\\mathbf{y}$?`,
    correct: matTex(P),
    distractors: [
      matTex(u.map((a) => u.map((b) => a.mul(b)))),
      matTex(P.map((r, i) => r.map((x, j) => (i === j ? F(1).sub(x) : x.neg())))),
      matTex(u.map((a) => u.map((b) => a.mul(b).div(uu.mul(uu))))),
      matTex(P.map((r, i) => r.map((x, j) => (i === j ? x : x.neg())))),
    ],
    solution: `$P = \\dfrac{\\mathbf{u}\\mathbf{u}^T}{\\mathbf{u}^T\\mathbf{u}} = \\dfrac{1}{${uu.tex()}}\\mathbf{u}\\mathbf{u}^T = ${matTex(P)}$.\nSanity checks: $P^T = P$, $P^2 = P$, and $\\operatorname{rank}P = 1$. ($I - P$ projects onto $L^\\perp$ instead.)`,
  });
}

export const orthogonalityGens = [
  findK, unitVector, angleCos, projLine, projSubspace, projSubspace, coordsOrthBasis, gramSchmidt,
  qrEntries, complement, orthoSolve, normPreserve, isOrthSet, projMatrixLine,
];
