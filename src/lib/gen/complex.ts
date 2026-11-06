import { Cx } from "@/lib/math/cx";
import { F, Frac, sqrtTex } from "@/lib/math/frac";
import { angleTex, expTex, joinRect, normAngle, rectParts, rectTex } from "@/lib/math/polar";
import { mcq, retry, type Draft, type Rng } from "./common";

const ANGLES = [
  F(1, 6), F(1, 4), F(1, 3), F(2, 3), F(3, 4), F(5, 6), F(-1, 6), F(-1, 4), F(-1, 3), F(-2, 3), F(-3, 4), F(-5, 6),
  F(1, 2), F(-1, 2), F(1),
];

/** A "nice" point: angle p·π and r² = R chosen so the rectangular form is clean. */
function nicePoint(rng: Rng, allowAxes = false): { R: Frac; p: Frac } {
  const pool = allowAxes ? ANGLES : ANGLES.slice(0, 12);
  const p = rng.pick(pool);
  const k = rng.pick([1, 1, 2, 3]);
  const R = p.d === 4 ? F(2 * k * k) : p.d === 1 || p.d === 2 ? F(k * k) : F(4 * k * k);
  return { R, p };
}

const sub = "Polar & exponential form";

function rectToExp(rng: Rng): Draft {
  const { R, p } = nicePoint(rng);
  const rect = rectTex(R, p);
  const atanNaive = normAngle(Math.cos((p.n / p.d) * Math.PI) < 0 ? p.add(1) : p);
  return mcq(rng, {
    subtopic: sub,
    prompt: `Express $z = ${rect}$ in complex exponential form $re^{j\\theta}$ with $-\\pi < \\theta \\le \\pi$.`,
    correct: expTex(R, p),
    distractors: [
      expTex(R, atanNaive),
      expTex(R, p.neg()),
      `${R.tex()}e^{j${angleTex(p)}}`,
      expTex(R, normAngle(F(1, 2).sub(p))),
      expTex(R, normAngle(p.add(F(1, 2)))),
    ],
    solution: `$r = |z| = \\sqrt{${R.tex()}} = ${sqrtTex(R)}$.\nPlot the point first: it lies in the quadrant where $\\theta = ${angleTex(p)}$. A calculator's $\\tan^{-1}(b/a)$ only returns angles in $(-\\pi/2, \\pi/2)$, so when $\\operatorname{Re}z<0$ you must add or subtract $\\pi$.\n$z = ${expTex(R, p)}$.`,
  });
}

function expToRect(rng: Rng): Draft {
  const { R, p } = nicePoint(rng, true);
  const correct = rectTex(R, p);
  return mcq(rng, {
    subtopic: sub,
    prompt: `Write $z = ${expTex(R, p)}$ in rectangular form $a + bj$.`,
    correct,
    distractors: [rectTex(R, p.neg()), rectTex(R, normAngle(F(1, 2).sub(p))), rectTex(R, normAngle(p.add(1))), rectTex(R.mul(4), p), rectTex(R, normAngle(p.add(F(1, 2))))],
    solution: `$z = r(\\cos\\theta + j\\sin\\theta)$ with $r = ${sqrtTex(R)}$, $\\theta = ${angleTex(p)}$: $z = ${correct}$.`,
  });
}

function deMoivre(rng: Rng): Draft {
  const p = rng.pick([F(1, 4), F(-1, 4), F(3, 4), F(-3, 4), F(1, 6), F(-1, 6), F(1, 3), F(-1, 3), F(2, 3), F(5, 6)]);
  const R = p.d === 4 ? F(2) : F(4);
  const n = rng.pick([3, 4, 5, 6, 8]);
  const Rn = R.pow(n);
  const pn = normAngle(p.mul(n));
  const asRect = rng.chance(0.6);
  const fmt = (RR: Frac, pp: Frac) => (asRect ? rectTex(RR, pp) : expTex(RR, pp));
  return mcq(rng, {
    subtopic: "De Moivre & roots",
    prompt: `Evaluate $(${rectTex(R, p)})^{${n}}$${asRect ? " in rectangular form" : " in exponential form (principal argument)"}.`,
    correct: fmt(Rn, pn),
    distractors: [fmt(Rn, normAngle(pn.neg())), fmt(R.mul(n * n), pn), fmt(Rn, p), fmt(Rn, normAngle(pn.add(F(1, 2)))), fmt(Rn, normAngle(pn.add(1)))],
    solution: `$${rectTex(R, p)} = ${expTex(R, p)}$. By De Moivre, $(re^{j\\theta})^{n} = r^{n}e^{jn\\theta}$:\n$$(${expTex(R, p)})^{${n}} = ${sqrtTex(Rn)}\\,e^{j${angleTex(p.mul(n))}} = ${expTex(Rn, pn)} = ${rectTex(Rn, pn)}$$`,
  });
}

function cxRand(rng: Rng, lo = -4, hi = 4): Cx {
  for (;;) {
    const z = Cx.of(rng.int(lo, hi), rng.int(lo, hi));
    if (!z.re.isZero() && !z.im.isZero()) return z;
  }
}

function arithmetic(rng: Rng): Draft {
  const a = cxRand(rng, -3, 3);
  const b = cxRand(rng, -5, 5);
  const c = cxRand(rng, -2, 2);
  const form = rng.pick(["sqDiv", "prodDiv", "divDiv"]);
  let tex: string;
  let val: Cx;
  let wrongJ: Cx; // j^2 = +1 slip
  let wrongDiv: Cx; // dividing componentwise
  const cwDiv = (x: Cx, y: Cx) => Cx.of(x.re.div(y.re), x.im.div(y.im));
  const sqWrong = (x: Cx) => Cx.of(x.re.mul(x.re).add(x.im.mul(x.im)), x.re.mul(x.im).mul(2));
  if (form === "sqDiv") {
    tex = `(${a.tex()})^2 + \\dfrac{${b.tex()}}{${c.tex()}}`;
    val = a.mul(a).add(b.div(c));
    wrongJ = sqWrong(a).add(b.div(c));
    wrongDiv = a.mul(a).add(cwDiv(b, c));
  } else if (form === "prodDiv") {
    tex = `(${a.tex()})(${c.tex()}) - \\dfrac{${b.tex()}}{${c.conj().tex()}}`;
    val = a.mul(c).sub(b.div(c.conj()));
    wrongJ = Cx.of(a.re.mul(c.re).add(a.im.mul(c.im)), a.re.mul(c.im).add(a.im.mul(c.re))).sub(b.div(c.conj()));
    wrongDiv = a.mul(c).sub(cwDiv(b, c.conj()));
  } else {
    tex = `\\dfrac{${b.tex()}}{${c.tex()}} - \\dfrac{1}{${a.tex()}}`;
    val = b.div(c).sub(Cx.of(1).div(a));
    wrongJ = b.div(c).sub(Cx.of(1).div(a.conj()));
    wrongDiv = cwDiv(b, c).sub(Cx.of(1).div(a));
  }
  return mcq(rng, {
    subtopic: "Complex arithmetic",
    prompt: `Evaluate $z = ${tex}$ and give the result in rectangular form.`,
    correct: val.tex(),
    distractors: [wrongJ.tex(), wrongDiv.tex(), val.conj().tex(), Cx.of(val.im, val.re).tex(), val.neg().tex()],
    solution: `Divide by multiplying top and bottom by the conjugate of the denominator, e.g. $\\dfrac{w}{c} = \\dfrac{w\\,\\bar c}{|c|^2}$, and remember $j^2 = -1$.\nResult: $z = ${val.tex()}$.`,
  });
}

function solveAB(rng: Rng): Draft {
  const z = cxRand(rng, -4, 4);
  const w = cxRand(rng, -3, 3);
  const prod = z.mul(w);
  const conjForm = rng.chance(0.5);
  const lhs = conjForm ? `\\overline{(a + bj)}\\,(${w.tex()})` : `(a + bj)(${w.tex()})`;
  const ab = conjForm ? z.conj() : z;
  const opt = (x: Cx) => `a = ${x.re.tex()},\\ b = ${x.im.tex()}`;
  return mcq(rng, {
    subtopic: "Complex arithmetic",
    prompt: `Find real $a, b$ such that $${lhs} = ${prod.tex()}$.`,
    correct: opt(ab),
    distractors: [opt(ab.conj()), opt(Cx.of(ab.im, ab.re)), opt(ab.neg()), opt(prod.mul(w).scale(F(1).div(w.abs2().mul(w.abs2())))), opt(Cx.of(prod.re.div(w.re), prod.im.div(w.im)))],
    solution: `${conjForm ? "$\\overline{a+bj} = a - bj$, so " : ""}$${conjForm ? "a - bj" : "a + bj"} = \\dfrac{${prod.tex()}}{${w.tex()}} = \\dfrac{(${prod.tex()})(${w.conj().tex()})}{${w.abs2().tex()}} = ${z.tex()}$.\nHence $a = ${ab.re.tex()}$, $b = ${ab.im.tex()}$.`,
  });
}

function quadratic(rng: Rng): Draft {
  const mode = rng.pick(["roots", "roots", "repeated"]);
  if (mode === "repeated") {
    const a = rng.nz(-3, 3);
    const b = rng.nz(-5, 5);
    const c = F(b * b, 4 * a);
    return mcq(rng, {
      subtopic: "Quadratic roots",
      prompt: `For $y = ${a}x^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)}x + c$ (with $c$ real), find $c$ so that $y = 0$ has exactly one repeated root. For larger $c$${a < 0 ? "" : ""} what kind of roots occur?`,
      correct: `c = ${c.tex()};\\ c > ${c.tex()} \\Rightarrow \\text{${a > 0 ? "complex" : "real distinct"}}`,
      distractors: [
        `c = ${c.tex()};\\ c > ${c.tex()} \\Rightarrow \\text{${a > 0 ? "real distinct" : "complex"}}`,
        `c = ${c.neg().tex()};\\ c > ${c.neg().tex()} \\Rightarrow \\text{${a > 0 ? "complex" : "real distinct"}}`,
        `c = ${F(b * b, 2 * a).tex()};\\ c > ${F(b * b, 2 * a).tex()} \\Rightarrow \\text{${a > 0 ? "complex" : "real distinct"}}`,
        `c = ${F(b, 2 * a).tex()};\\ c > ${F(b, 2 * a).tex()} \\Rightarrow \\text{${a > 0 ? "complex" : "real distinct"}}`,
      ],
      math: true,
      solution: `Repeated root iff discriminant $b^2 - 4ac = 0$: $${b * b} - 4(${a})c = 0 \\Rightarrow c = ${c.tex()}$.\nThe discriminant $${b * b} - ${4 * a}c$ ${a > 0 ? "decreases" : "increases"} as $c$ grows, so for $c > ${c.tex()}$ it is ${a > 0 ? "negative → a complex-conjugate pair" : "positive → two distinct real roots"}.`,
    });
  }
  const pRe = rng.pick([F(-2), F(-1), F(1), F(2), F(3), F(1, 2), F(-1, 2), F(3, 2)]);
  const q = rng.pick([1, 2, 3]);
  const a = pRe.isInt() ? rng.pick([1, 2]) : rng.pick([2, 4]) / 1;
  // a(x^2 - 2p x + p^2 + q^2) with integer coefficients
  const B = pRe.mul(-2 * a);
  const C = pRe.mul(pRe).add(q * q).mul(a);
  if (!B.isInt() || !C.isInt()) retry();
  const roots = (re: Frac, im: Frac | number) => `x = ${Cx.of(re, im).tex()},\\ ${Cx.of(re, Frac.of(im).neg()).tex()}`;
  const poly = `${a === 1 ? "" : a}x^2 ${B.n < 0 ? "-" : "+"} ${B.abs().eq(1) ? "" : B.abs().tex()}x + ${C.tex()}`;
  const disc = B.mul(B).sub(C.mul(4 * a));
  return mcq(rng, {
    subtopic: "Quadratic roots",
    prompt: `Solve $${poly} = 0$.`,
    correct: roots(pRe, q),
    distractors: [roots(pRe.neg(), q), roots(pRe, q * q), roots(pRe, 2 * q), `x = ${pRe.add(q).tex()},\\ ${pRe.sub(q).tex()}`, roots(pRe.mul(2), q)],
    solution: `Discriminant $= ${B.mul(B).tex()} - ${C.mul(4 * a).tex()} = ${disc.tex()} < 0$, so the roots are a complex-conjugate pair:\n$$x = \\frac{${B.neg().tex()} \\pm \\sqrt{${disc.tex()}}}{${2 * a}} = \\frac{${B.neg().tex()} \\pm ${sqrtTex(disc.neg())}j}{${2 * a}} = ${Cx.of(pRe, q).tex()},\\ ${Cx.of(pRe, -q).tex()}$$`,
  });
}

const PYTH_CX = [Cx.of(3, 4), Cx.of(4, -3), Cx.of(5, 12), Cx.of(-12, 5), Cx.of(1, 1), Cx.of(1, -1), Cx.of(2, 2), Cx.of(-1, 2), Cx.of(2, -1), Cx.of(-6, 8), Cx.of(1, 3)];

function modulusExpr(rng: Rng): Draft {
  const [z1, z2, z3] = rng.shuffle(PYTH_CX).slice(0, 3);
  const m = rng.pick([1, 2, 3]);
  const R = z1.abs2().pow(m).mul(z2.abs2()).div(z3.abs2()); // |result|^2
  const bar = rng.chance(0.5);
  return mcq(rng, {
    subtopic: "Modulus & conjugate",
    prompt: `Find $\\left| \\dfrac{(${z1.tex()})^{${m}}\\,${bar ? `\\overline{(${z2.tex()})}` : `(${z2.tex()})`}}{${z3.tex()}} \\right|$.`,
    correct: sqrtTex(R),
    distractors: [R.tex(), sqrtTex(z1.abs2().mul(m * m).mul(z2.abs2()).div(z3.abs2())), sqrtTex(R.mul(z3.abs2()).mul(z3.abs2())), sqrtTex(R.div(z2.abs2().mul(z2.abs2()))), sqrtTex(R.mul(2))],
    solution: `Moduli multiply and divide, and $|\\bar z| = |z|$: $|z_1| = \\sqrt{${z1.abs2().tex()}}$, $|z_2| = \\sqrt{${z2.abs2().tex()}}$, $|z_3| = \\sqrt{${z3.abs2().tex()}}$.\nResult $= \\dfrac{|z_1|^{${m}}|z_2|}{|z_3|} = \\sqrt{${R.tex()}} = ${sqrtTex(R)}$. No expansion needed.`,
  });
}

function principalRoot(rng: Rng): Draft {
  // z = (r1 e^{jθ1} · w)^{1/n}, answer to 2 d.p. as in CA2
  const r1 = rng.pick([1, 2, 3, 4]);
  const th1 = rng.pick([F(1, 4), F(-1, 4), F(1, 2), F(1, 3), F(-1, 6), F(3, 4)]);
  const w = rng.pick([Cx.of(1, -1), Cx.of(1, 1), Cx.of(-1, 1), Cx.of(0, 2), Cx.of(-2, 0), Cx.of(1, 0)]);
  const n = rng.pick([2, 2, 3]);
  const wArg = normAngle(F(Math.round((Math.atan2(w.im.valueOf(), w.re.valueOf()) / Math.PI) * 4), 4));
  const R = r1 * Math.sqrt(w.abs2().valueOf());
  const P = normAngle(th1.add(wArg));
  const mod = Math.pow(R, 1 / n).toFixed(2);
  const ang = P.div(n);
  const e = (m: string, p: Frac) => (p.isZero() ? `${m}` : `${m}e^{j${angleTex(p)}}`);
  return mcq(rng, {
    subtopic: "De Moivre & roots",
    prompt: `Evaluate the principal value of $z = \\left(${r1 === 1 ? "" : r1}e^{j${angleTex(th1)}}(${w.tex()})\\right)^{1/${n}}$, correct to 2 decimal places.`,
    correct: e(mod, ang),
    distractors: [
      e(mod, P),
      e(R.toFixed(2), ang),
      e(mod, ang.neg()),
      e(mod, normAngle(ang.add(F(2, n)))),
      e((R / n).toFixed(2), ang),
    ],
    solution: `$${w.tex()} = ${R / r1 === 1 ? "" : `${(R / r1).toFixed(4).replace(/\.?0+$/, "")}`}e^{j${angleTex(wArg)}}$, so the bracket is $${R.toFixed(4).replace(/\.?0+$/, "")}\\,e^{j${angleTex(P)}}$ (angles add, moduli multiply).\nPrincipal ${n === 2 ? "square" : "cube"} root: modulus $${R.toFixed(4).replace(/\.?0+$/, "")}^{1/${n}} \\approx ${mod}$, angle $${angleTex(P)}/${n} = ${angleTex(ang)}$.\n$z \\approx ${e(mod, ang)}$. (Other roots differ by $2\\pi/${n}$ in angle.)`,
  });
}

function euler(rng: Rng): Draft {
  const A = rng.pick([1, 2, 3, 4]);
  const p = rng.pick([F(1, 6), F(1, 4), F(1, 3), F(2, 3), F(3, 4), F(5, 6)]);
  const plus = rng.chance(0.5);
  // A e^{jθ} + A e^{-jθ} = 2A cosθ ; A e^{jθ} - A e^{-jθ} = 2jA sinθ
  const { re, im } = rectParts(F(4 * A * A), p);
  const cosTerm = re;
  const sinTerm = joinRect("0", im);
  const ans = plus ? cosTerm : sinTerm;
  const negate = (t: string) => (t.startsWith("-") ? t.slice(1) : `-${t}`);
  const pre = A === 1 ? "" : String(A);
  return mcq(rng, {
    subtopic: "Euler's formula",
    prompt: `Simplify $${pre}e^{j${angleTex(p)}} ${plus ? "+" : "-"} ${pre}e^{-j${angleTex(p)}}$.`,
    correct: ans,
    distractors: [plus ? sinTerm : cosTerm, negate(ans), joinRect("0", rectParts(F(A * A), p).im), rectParts(F(A * A), p).re, "0", rectTex(F(4 * A * A), p)],
    solution: `$e^{j\\theta} + e^{-j\\theta} = 2\\cos\\theta$ and $e^{j\\theta} - e^{-j\\theta} = 2j\\sin\\theta$ (the conjugate parts cancel).\nWith $\\theta = ${angleTex(p)}$: ${plus ? `$2(${A})\\cos\\theta = ${ans}$` : `$2j(${A})\\sin\\theta = ${ans}$`}.`,
  });
}

function nthRootMember(rng: Rng): Draft {
  const n = rng.pick([3, 4, 6]);
  const { p } = nicePoint(rng, true);
  const Rbase = rng.pick([1, 2, 8]);
  const Rn = F(Rbase).pow(n); // |z|^2 = Rbase^n  → |root|^2 = Rbase
  const P = p;
  const k = rng.int(0, n - 1);
  const rootAng = normAngle(P.div(n).add(F(2 * k, n)));
  const mk = (ang: Frac) => expTex(F(Rbase), ang);
  const wrongs = [normAngle(P.div(n).add(F(1, n))), normAngle(P.add(F(2 * k, n))), normAngle(rootAng.neg()), normAngle(P.div(n).add(F(2 * k + 1, 2 * n)))]
    .filter((a) => ![...Array(n).keys()].some((kk) => normAngle(P.div(n).add(F(2 * kk, n))).eq(a)));
  if (wrongs.length < 3) retry();
  return mcq(rng, {
    subtopic: "De Moivre & roots",
    prompt: `Which of the following is one of the ${n}th roots of $z = ${expTex(Rn, P)}$?`,
    correct: mk(rootAng),
    distractors: [...wrongs.map(mk), expTex(Rn, rootAng)],
    solution: `The ${n}th roots are $\\sqrt[${n}]{|z|}\\,e^{j(\\theta + 2\\pi k)/${n}}$, $k = 0,\\dots,${n - 1}$: modulus $${sqrtTex(F(Rbase))}$, angles $${angleTex(P.div(n))} + \\frac{2\\pi k}{${n}}$ — equally spaced by $2\\pi/${n}$.\n$k = ${k}$ gives $${mk(rootAng)}$.`,
  });
}

export const complexGens = [
  rectToExp, rectToExp, expToRect, deMoivre, deMoivre, arithmetic, arithmetic, solveAB, quadratic, modulusExpr,
  principalRoot, euler, nthRootMember,
];
