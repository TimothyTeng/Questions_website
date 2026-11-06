import { Cx, cxVecTex, unitRoot } from "@/lib/math/cx";
import { F, Frac, sqrtTex } from "@/lib/math/frac";
import { angleTex, normAngle } from "@/lib/math/polar";
import { mcq, retry, type Draft, type Rng } from "./common";

/** X[k] = Σ x[n] e^{-j2πkn/N}; sign = +1 gives the un-normalised inverse kernel. Exact for N ∈ {1,2,4}. */
function dft(x: Cx[], sign: 1 | -1 = -1): Cx[] {
  const N = x.length;
  return x.map((_, k) =>
    x.reduce((s, xn, n) => {
      const w = unitRoot(-sign * k * n, N);
      if (!w) throw new Error("retry");
      return s.add(xn.mul(w));
    }, Cx.of(0)),
  );
}

const realVec = (rng: Rng, N: number, lo = -3, hi = 4) => Array.from({ length: N }, () => Cx.of(rng.int(lo, hi)));

const W_DEF = `Use $X[k] = \\sum_{n=0}^{N-1} x[n]\\,e^{-j2\\pi kn/N}$ (i.e. $\\mathbf{X} = W\\mathbf{x}$) and $x[n] = \\frac{1}{N}\\sum_{k=0}^{N-1} X[k]\\,e^{+j2\\pi kn/N}$.`;

function rowRotation(rng: Rng): Draft {
  const N = rng.pick([4, 6, 8, 8, 12, 16]);
  const k = rng.int(1, Math.max(1, N / 2 - 1));
  const w = F(2 * k, N);
  const opt = (dir: string, om: Frac) => `\\text{${dir}},\\ \\omega = ${angleTex(om)}\\ \\text{rad/sample}`;
  return mcq(rng, {
    subtopic: "DFT matrix",
    prompt: `Row $k = ${k}$ of the DFT matrix $W$ for an $N = ${N}$ point signal is a complex sequence (rows indexed from 0). In which direction does it rotate, and at what $\\omega$?`,
    correct: opt("clockwise", w),
    distractors: [opt("anti-clockwise", w), opt("clockwise", F(k, N)), opt("anti-clockwise", F(k, N)), opt("clockwise", F(2, N)), opt("anti-clockwise", F(2 * (N - k), N))],
    solution: `Row $k$ of $W$ is $e^{-j2\\pi kn/N}$, $n = 0,\\dots,N-1$: each step multiplies by $e^{-j2\\pi k/N}$, i.e. a **clockwise** rotation (negative angle) of $\\omega = 2\\pi k/N = 2\\pi(${k})/${N} = ${angleTex(w)}$ rad/sample. (Columns of $W^H$, used for synthesis, rotate anti-clockwise.)`,
  });
}

function dft4(rng: Rng): Draft {
  const x = realVec(rng, 4);
  if (x.every((z) => z.isZero())) retry();
  const X = dft(x);
  const plus = dft(x, 1);
  return mcq(rng, {
    subtopic: "Analysis & synthesis",
    prompt: `Find the DFT coefficients $\\mathbf{X}$ of $\\mathbf{x} = ${cxVecTex(x)}$ with $N = 4$. ${W_DEF}`,
    correct: cxVecTex(X),
    distractors: [cxVecTex(plus), cxVecTex(X.map((z) => z.scale(F(1, 4)))), cxVecTex([X[0], X[3], X[2], X[1]].map((z, i) => (i === 0 ? z : z.neg()))), cxVecTex(X.map((z, i) => (i === 2 ? z.neg() : z))), cxVecTex(X.map((z) => z.scale(4)))],
    solution: `For $N = 4$, $e^{-j2\\pi/4} = -j$, so $W = \\begin{bmatrix} 1&1&1&1 \\\\ 1&-j&-1&j \\\\ 1&-1&1&-1 \\\\ 1&j&-1&-j \\end{bmatrix}$.\n$\\mathbf{X} = W\\mathbf{x} = ${cxVecTex(X)}$.\nChecks: $X[0] = \\sum x[n] = ${X[0].tex()}$, and since $\\mathbf{x}$ is real, $X[3] = \\overline{X[1]}$. (Using $+j$ gives the conjugate — that is the inverse kernel.)`,
  });
}

function idft4(rng: Rng): Draft {
  const x = realVec(rng, 4, -2, 3);
  const X = dft(x);
  if (X.some((z) => z.isZero())) retry();
  const noNorm = dft(X, 1);
  const wrongSign = dft(X).map((z) => z.scale(F(1, 4)));
  return mcq(rng, {
    subtopic: "Analysis & synthesis",
    prompt: `Given the DFT $\\mathbf{X} = ${cxVecTex(X)}$ ($N = 4$), find $\\mathbf{x}$. ${W_DEF}`,
    correct: cxVecTex(x),
    distractors: [cxVecTex(noNorm), cxVecTex(wrongSign), cxVecTex(x.map((z) => z.scale(2))), cxVecTex([...x].reverse()), cxVecTex(X.map((z) => z.scale(F(1, 4))))],
    solution: `$\\mathbf{x} = \\frac{1}{N}W^H\\mathbf{X}$ with $W^H = \\begin{bmatrix} 1&1&1&1 \\\\ 1&j&-1&-j \\\\ 1&-1&1&-1 \\\\ 1&-j&-1&j \\end{bmatrix}$.\n$W^H\\mathbf{X} = ${cxVecTex(noNorm)}$, divide by $N = 4$: $\\mathbf{x} = ${cxVecTex(x)}$.\n(Forgetting $1/N$ or the conjugate sign are the classic slips. Sanity check: $x$ should be real because $X[3] = \\overline{X[1]}$.)`,
  });
}

function singleCoeff(rng: Rng): Draft {
  const N = rng.pick([4, 8]);
  const k = N === 4 ? rng.int(1, 3) : rng.pick([2, 4, 6]);
  const x = realVec(rng, N, -2, 3);
  const terms = x.map((xn, n) => xn.mul(unitRoot(k * n, N)!));
  const val = terms.reduce((s, z) => s.add(z), Cx.of(0));
  const plus = x.map((xn, n) => xn.mul(unitRoot(-k * n, N)!)).reduce((s, z) => s.add(z), Cx.of(0));
  return mcq(rng, {
    subtopic: "Analysis & synthesis",
    prompt: `For $\\mathbf{x} = ${cxVecTex(x)}$ ($N = ${N}$), compute the DFT coefficient $X[${k}] = \\sum_{n} x[n]e^{-j2\\pi ${k}n/${N}}$.`,
    correct: val.tex(),
    distractors: [plus.tex(), val.scale(F(1, N)).tex(), val.neg().tex(), x.reduce((s, z) => s.add(z), Cx.of(0)).tex(), Cx.of(val.im, val.re).tex()],
    solution: `$e^{-j2\\pi ${k}/${N}} = ${unitRoot(k, N)!.tex()}$, so the kernel cycles through $${[0, 1, 2, 3].map((n) => unitRoot(k * n, N)!.tex()).join(",\\ ")},\\dots$\n$X[${k}] = ${terms.map((z) => `(${z.tex()})`).join(" + ")} = ${val.tex()}$.`,
  });
}

function wEntry(rng: Rng): Draft {
  const N = rng.pick([6, 8, 12, 16]);
  const k = rng.int(1, N - 1);
  const n = rng.int(2, N - 1);
  const p = normAngle(F(-2 * k * n, N));
  const e = (q: Frac) => (q.isZero() ? "1" : `e^{j${angleTex(q)}}`);
  const exact = unitRoot(k * n, N);
  return mcq(rng, {
    subtopic: "DFT matrix",
    prompt: `For the $N = ${N}$ DFT matrix $W$ (rows $k$, columns $n$, both indexed from 0), what is the entry $W[${k}][${n}]$, written with principal argument?`,
    correct: e(p),
    distractors: [e(normAngle(p.neg())), e(normAngle(F(-2 * k, N))), e(normAngle(F(-k * n, N))), e(normAngle(F(-2 * (k + n), N))), e(normAngle(p.add(1)))],
    solution: `$W[k][n] = e^{-j2\\pi kn/N} = e^{-j2\\pi (${k})(${n})/${N}} = e^{j${angleTex(F(-2 * k * n, N))}}$. Reduce the angle by multiples of $2\\pi$ into $(-\\pi, \\pi]$: $${e(p)}$${exact ? ` $= ${exact.tex()}$` : ""}.`,
  });
}

function toneSpectrum(rng: Rng): Draft {
  const N = rng.pick([8, 16, 16, 32]);
  const k0 = rng.int(1, N / 2 - 1);
  const A = rng.pick([1, 2, 3, 4]);
  const phi = rng.pick([F(1, 3), F(-1, 4), F(1, 6), F(1, 2), F(-1, 3)]);
  const isCos = rng.chance(0.4);
  const ph = (q: Frac) => `e^{j${angleTex(q)}}`;
  if (!isCos) {
    const opt = (k: number, mag: string, q: Frac) => `X[${k}] = ${mag}${ph(q)},\\ \\text{all other } X[k] = 0`;
    return mcq(rng, {
      subtopic: "Single-tone spectra",
      prompt: `Given $x[n] = ${A === 1 ? "" : A}e^{j(\\frac{2\\pi${k0 === 1 ? "" : ` \\cdot ${k0}`}}{${N}}n +${angleTex(phi)})}$ for $n = 0,\\dots,${N - 1}$, find its $N = ${N}$ point DFT.`,
      correct: opt(k0, String(N * A), phi),
      distractors: [opt(k0, String(A), phi), opt(N - k0, String(N * A), phi), opt(k0, String(N * A), phi.neg()), opt(k0, String(A * N / 2), phi), opt(N - k0, String(A), phi.neg())],
      solution: `$x[n] = ${A}e^{j${angleTex(phi)}}\\,e^{j2\\pi ${k0}n/${N}}$ is exactly $${A}e^{j${angleTex(phi)}}$ times column $k_0 = ${k0}$ of $W^H$. Rows of $W$ are orthogonal with $\\|\\text{row}\\|^2 = N$, so only $X[${k0}]$ survives: $X[${k0}] = N\\cdot ${A}e^{j${angleTex(phi)}} = ${N * A}${ph(phi)}$.`,
    });
  }
  const half = (N * A) / 2;
  const opt = (m: number, q: Frac, k2: number) => `X[${k0}] = ${m}${ph(q)},\\ X[${k2}] = ${m}${ph(q.neg())}`;
  return mcq(rng, {
    subtopic: "Single-tone spectra",
    prompt: `Given $x[n] = ${A === 1 ? "" : A}\\cos\\left(\\frac{2\\pi${k0 === 1 ? "" : ` \\cdot ${k0}`}}{${N}}n +${angleTex(phi)}\\right)$ for $n = 0,\\dots,${N - 1}$, which pair gives its only nonzero $N = ${N}$ point DFT coefficients?`,
    correct: opt(half, phi, N - k0),
    distractors: [opt(N * A, phi, N - k0), opt(half, phi.neg(), N - k0), opt(A, phi, N - k0), opt(half, phi, k0 + 1), opt(A / 2, phi, N - k0)],
    solution: `$\\cos\\theta = \\tfrac{1}{2}(e^{j\\theta} + e^{-j\\theta})$, so $x[n] = \\tfrac{${A}}{2}e^{j${angleTex(phi)}}e^{j2\\pi ${k0}n/${N}} + \\tfrac{${A}}{2}e^{-j${angleTex(phi)}}e^{j2\\pi(${N}-${k0})n/${N}}$ (since $e^{-j2\\pi k_0 n/N} = e^{j2\\pi(N-k_0)n/N}$).\nEach tone gives $N\\times$ its complex amplitude: $X[${k0}] = ${half}${ph(phi)}$, $X[${N - k0}] = ${half}${ph(phi.neg())}$ (conjugate pair, as expected for a real signal).`,
  });
}

function idftSingle(rng: Rng): Draft {
  const N = rng.pick([4, 8, 16]);
  const k0 = rng.int(1, N / 2 - 1 || 1);
  const A = rng.pick([1, 2, 3, 5]);
  const phi = rng.pick([F(-1, 4), F(1, 3), F(-1, 6), F(1, 4)]);
  const e = (amp: string, kk: number, sgn: string, q: Frac) => `x[n] = ${amp}e^{j(${sgn}\\frac{2\\pi${kk === 1 ? "" : ` \\cdot ${kk}`}}{${N}}n +${angleTex(q)})}`;
  const Xvec = Array.from({ length: N }, (_, k) => (k === k0 ? `${A}e^{j${angleTex(phi)}}` : "0"));
  const short = N > 8 ? `X[k] = N\\cdot${A}e^{j${angleTex(phi)}}\\ \\text{for } k = ${k0},\\ X[k] = 0 \\text{ otherwise}` : `\\mathbf{X} = N[${Xvec.join(",\\ ")}]^T`;
  return mcq(rng, {
    subtopic: "Analysis & synthesis",
    prompt: `Given $${short}$ with $N = ${N}$, find $x[n]$ via the inverse DFT $x[n] = \\frac{1}{N}\\sum_k X[k]e^{j2\\pi kn/N}$.`,
    correct: e(A === 1 ? "" : String(A), k0, "", phi),
    distractors: [e(String(N * A), k0, "", phi), e(A === 1 ? "" : String(A), k0, "-", phi), e(A === 1 ? "" : String(A), k0, "", phi.neg()), e(A === 1 ? "" : String(A), N - k0, "-", phi.neg()), e(String(A / N), k0, "", phi)],
    solution: `Only one term survives the sum: $x[n] = \\frac{1}{N}\\cdot N\\cdot ${A}e^{j${angleTex(phi)}}\\,e^{j2\\pi ${k0}n/${N}} = ${A}e^{j(2\\pi ${k0}n/${N} + ${angleTex(phi)})}$ — a phasor of amplitude ${A} rotating anti-clockwise at $\\omega = ${angleTex(F(2 * k0, N))}$ rad/sample with initial phase $${angleTex(phi)}$.`,
  });
}

function cxSmallVec(rng: Rng, n: number): Cx[] {
  return Array.from({ length: n }, () => Cx.of(rng.int(-2, 2), rng.int(-2, 2)));
}

function innerProduct(rng: Rng): Draft {
  const n = rng.pick([3, 4]);
  const a = cxSmallVec(rng, n);
  const b = cxSmallVec(rng, n);
  if (b.every((z) => z.isZero()) || a.every((z) => z.isZero())) retry();
  const askNorm = rng.chance(0.35);
  if (askNorm) {
    const s = b.reduce((t, z) => t.add(z.abs2()), F(0));
    const noConj = b.reduce((t, z) => t.add(z.mul(z)), Cx.of(0));
    return mcq(rng, {
      subtopic: "Complex inner product",
      prompt: `Find $\\|\\mathbf{b}\\|$ for $\\mathbf{b} = ${cxVecTex(b)} \\in \\mathbb{C}^{${n}}$.`,
      correct: sqrtTex(s),
      distractors: [s.tex(), noConj.re.n >= 0 && noConj.im.isZero() ? sqrtTex(noConj.re) : noConj.tex(), sqrtTex(s.add(1)), sqrtTex(F(b.reduce((t, z) => t + Math.abs(z.re.valueOf()) + Math.abs(z.im.valueOf()), 0))), sqrtTex(s.mul(2))],
      solution: `$\\|\\mathbf{b}\\|^2 = \\langle\\mathbf{b},\\mathbf{b}\\rangle = \\mathbf{b}^H\\mathbf{b} = \\sum |b_i|^2 = ${b.map((z) => z.abs2().tex()).join(" + ")} = ${s.tex()}$, so $\\|\\mathbf{b}\\| = ${sqrtTex(s)}$. Without conjugating you would get $\\sum b_i^2 = ${noConj.tex()}$, which need not even be real.`,
    });
  }
  const ip = a.reduce((t, z, i) => t.add(z.mul(b[i].conj())), Cx.of(0));
  const noConj = a.reduce((t, z, i) => t.add(z.mul(b[i])), Cx.of(0));
  const bothConj = a.reduce((t, z, i) => t.add(z.conj().mul(b[i].conj())), Cx.of(0));
  return mcq(rng, {
    subtopic: "Complex inner product",
    prompt: `Compute $\\langle \\mathbf{a}, \\mathbf{b} \\rangle = \\mathbf{b}^H\\mathbf{a}$ for $\\mathbf{a} = ${cxVecTex(a)}$ and $\\mathbf{b} = ${cxVecTex(b)}$.`,
    correct: ip.tex(),
    distractors: [ip.conj().tex(), noConj.tex(), bothConj.tex(), ip.neg().tex(), Cx.of(ip.im, ip.re).tex()],
    solution: `$\\langle\\mathbf{a},\\mathbf{b}\\rangle = \\sum_i a_i\\overline{b_i}$ (conjugate the **second** vector):\n$$${a.map((z, i) => `(${z.tex()})(${b[i].conj().tex()})`).join(" + ")} = ${ip.tex()}$$\nNote $\\langle\\mathbf{b},\\mathbf{a}\\rangle = \\overline{\\langle\\mathbf{a},\\mathbf{b}\\rangle} = ${ip.conj().tex()}$.`,
  });
}

function conjSymmetry(rng: Rng): Draft {
  const N = rng.pick([6, 8, 10, 16]);
  const k = rng.int(1, N / 2 - 1);
  const Xk = Cx.of(rng.nz(-6, 6), rng.nz(-6, 6));
  return mcq(rng, {
    subtopic: "DFT properties",
    prompt: `A **real** signal $x[n]$ of length $N = ${N}$ has DFT coefficient $X[${k}] = ${Xk.tex()}$. What is $X[${N - k}]$?`,
    correct: Xk.conj().tex(),
    distractors: [Xk.tex(), Xk.neg().tex(), Xk.conj().neg().tex(), Cx.of(Xk.im, Xk.re).tex(), Xk.scale(F(1, N)).tex()],
    solution: `For real $x$: $X[N-k] = \\sum x[n]e^{-j2\\pi(N-k)n/N} = \\sum x[n]e^{+j2\\pi kn/N} = \\overline{X[k]}$.\nSo $X[${N - k}] = \\overline{${Xk.tex()}} = ${Xk.conj().tex()}$ — same magnitude, opposite phase.`,
  });
}

function parseval(rng: Rng): Draft {
  const x = realVec(rng, 4, -3, 3);
  const ex = x.reduce((s, z) => s.add(z.abs2()), F(0));
  if (ex.isZero()) retry();
  const X = dft(x);
  const sumX2 = X.reduce((s, z) => s.add(z.abs2()), F(0));
  const sumx = x.reduce((s, z) => s.add(z.re), F(0));
  return mcq(rng, {
    subtopic: "DFT properties",
    prompt: `For $\\mathbf{x} = ${cxVecTex(x)}$ ($N = 4$), find $\\sum_{k=0}^{3}|X[k]|^2$ without computing every $X[k]$.`,
    correct: sumX2.tex(),
    distractors: [ex.tex(), ex.mul(16).tex(), sumx.mul(sumx).tex(), ex.div(4).tex(), sumx.mul(sumx).mul(4).tex()],
    solution: `$W^HW = NI$, so $\\|\\mathbf{X}\\|^2 = \\mathbf{x}^HW^HW\\mathbf{x} = N\\|\\mathbf{x}\\|^2$ (Parseval).\n$\\sum|x[n]|^2 = ${ex.tex()}$, so $\\sum|X[k]|^2 = 4\\times${ex.tex()} = ${sumX2.tex()}$. (Indeed $\\mathbf{X} = ${cxVecTex(X)}$.)`,
  });
}

export const dftGens = [
  rowRotation, dft4, dft4, idft4, idft4, singleCoeff, wEntry, toneSpectrum, idftSingle, innerProduct, conjSymmetry,
  parseval,
];
