"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Choice, Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Arrow2, Circle2, Dot2, Handle2, Label2, Line2, Plane2D, Poly2, Seg2, type VizColor } from "../Plane2D";
import { add, clamp, dot, fmt, fmtV, norm, proj, scale, unit, type V2 } from "../vec";

export default function EigenVisual({ id }: { id: string }) {
  switch (id) {
    case "eigen-hunter":
      return <EigenHunter />;
    case "det-lambda":
      return <DetLambda />;
    case "powers-iterate":
      return <PowersIterate />;
    case "eigenbasis-grid":
      return <EigenbasisGrid />;
    case "complex-eigen-spiral":
      return <ComplexSpiral />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Shared 2×2 helpers. Matrices are row-major [a, b, c, d] = [[a, b], [c, d]].

type M2 = [number, number, number, number];
type Tone = "good" | "bad" | "warn";

const mv = (A: M2, x: V2): V2 => [A[0] * x[0] + A[1] * x[1], A[2] * x[0] + A[3] * x[1]];
const mm = (A: M2, B: M2): M2 => [
  A[0] * B[0] + A[1] * B[2],
  A[0] * B[1] + A[1] * B[3],
  A[2] * B[0] + A[3] * B[2],
  A[2] * B[1] + A[3] * B[3],
];
const trace = (A: M2) => A[0] + A[3];
const det2 = (A: M2) => A[0] * A[3] - A[1] * A[2];
function inv2(A: M2): M2 | null {
  const d = det2(A);
  if (Math.abs(d) < 1e-12) return null;
  return [A[3] / d, -A[1] / d, -A[2] / d, A[0] / d];
}
const fromCols = (u: V2, v: V2): M2 => [u[0], v[0], u[1], v[1]];
/** (1 − t)I + tA: morphs the identity into A. */
const lerpI = (A: M2, t: number): M2 => [1 - t + t * A[0], t * A[1], t * A[2], 1 - t + t * A[3]];
const cross2 = (a: V2, b: V2) => a[0] * b[1] - a[1] * b[0];
const texM = (A: M2) => `\\begin{bmatrix} ${fmt(A[0])} & ${fmt(A[1])} \\\\ ${fmt(A[2])} & ${fmt(A[3])} \\end{bmatrix}`;
const circlePts = (n = 72): V2[] => Array.from({ length: n }, (_, i) => [Math.cos((2 * Math.PI * i) / n), Math.sin((2 * Math.PI * i) / n)] as V2);

/** Coefficient for a term: hides a leading 1. */
const coef = (a: number) => (Math.abs(a - 1) < 1e-9 ? "" : fmt(a));

/** λ² − (tr)λ + det, with tidy signs. */
function charPoly(t: number, d: number): string {
  const mid = Math.abs(t) < 1e-9 ? "" : t > 0 ? ` - ${coef(t)}\\lambda` : ` + ${coef(-t)}\\lambda`;
  const end = Math.abs(d) < 1e-9 ? "" : d > 0 ? ` + ${fmt(d)}` : ` - ${fmt(-d)}`;
  return `\\lambda^2${mid}${end}`;
}

/** c₁·s₁ + c₂·s₂ with tidy signs, e.g. "3\mathbf{v}_1 - 2\mathbf{v}_2". */
function combo(terms: [number, string][]): string {
  const parts = terms.filter(([c]) => Math.abs(c) > 1e-9);
  if (!parts.length) return "\\mathbf{0}";
  return parts
    .map(([c, s], i) => {
      const sign = c < 0 ? "-" : i ? "+" : "";
      return `${sign} ${coef(Math.abs(c))}${s}`;
    })
    .join(" ");
}

/** Readable representative of a direction: small integers/halves if possible, else unit length. */
function nice(v: V2): V2 {
  const nz = v.filter((c) => Math.abs(c) > 1e-9);
  if (!nz.length) return v;
  let w = scale(v, 1 / Math.min(...nz.map(Math.abs)));
  const first = Math.abs(w[0]) > 1e-9 ? w[0] : w[1];
  if (first < 0) w = scale(w, -1);
  const ok = w.every((c) => Math.abs(c * 2 - Math.round(c * 2)) < 1e-6 && Math.abs(c) <= 10);
  return ok ? w : unit(w);
}

/** Unit direction(s) spanning Nul(A − λI). */
function nullDirs(A: M2, l: number): V2[] {
  const r1: V2 = [A[0] - l, A[1]];
  const r2: V2 = [A[2], A[3] - l];
  const r = norm(r1) >= norm(r2) ? r1 : r2;
  if (norm(r) < 1e-9) return [[1, 0], [0, 1]]; // A = λI: every vector
  return [unit<V2>([-r[1], r[0]])];
}

type EigPair = { l: number; v: V2 };
type Eig = { kind: "real"; l: [number, number]; pairs: EigPair[] } | { kind: "complex"; re: number; im: number };

/** Eigenvalues (real or complex pair) and real eigen-directions of a 2×2 matrix. */
function eig2(A: M2): Eig {
  const t = trace(A);
  const d = det2(A);
  const disc = (t * t) / 4 - d;
  const tol = 1e-9 * Math.max(1, t * t);
  if (disc < -tol) return { kind: "complex", re: t / 2, im: Math.sqrt(-disc) };
  const s = disc > tol ? Math.sqrt(disc) : 0;
  const l: [number, number] = [t / 2 + s, t / 2 - s];
  const pairs = (s ? l : [l[0]]).flatMap((li) => nullDirs(A, li).map((v) => ({ l: li, v })));
  return { kind: "real", l, pairs };
}

/** x₀, Ax₀, A²x₀, … stopping early once the vector leaves |x| ≤ 50. */
function iterate(A: M2, x0: V2, kmax: number, limit = 50): V2[] {
  const out: V2[] = [x0];
  for (let i = 0; i < kmax; i++) {
    const n = mv(A, out[out.length - 1]);
    if (!Number.isFinite(n[0]) || !Number.isFinite(n[1]) || norm(n) > limit) break;
    out.push(n);
  }
  return out;
}

/** Step / Play / Reset over k = 0 … available. */
function useStepper(available: number, ms = 550) {
  const [k, setK] = useState(0);
  const [playing, setPlaying] = useState(false);
  const kk = Math.min(k, available);
  const running = playing && kk < available;
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setK((v) => v + 1), ms);
    return () => clearTimeout(id);
  }, [running, kk, ms]);
  return {
    k: kk,
    running,
    atEnd: kk >= available,
    step: () => {
      setPlaying(false);
      setK(Math.min(kk + 1, available));
    },
    reset: () => {
      setPlaying(false);
      setK(0);
    },
    play: () => {
      if (running) return setPlaying(false);
      if (kk >= available) setK(0);
      setPlaying(true);
    },
  };
}

function StepButtons({ s }: { s: ReturnType<typeof useStepper> }) {
  return (
    <div className="row" style={{ gap: 6, alignItems: "center" }}>
      <button className="btn small" onClick={s.step} disabled={s.atEnd}>
        Step
      </button>
      <button className="btn small primary" onClick={s.play}>
        {s.running ? "Pause" : "Play"}
      </button>
      <button className="btn small" onClick={s.reset}>
        k = 0
      </button>
      <span className="small muted">k = {s.k}</span>
    </div>
  );
}

const PRESETS: { v: string; label: string; A: M2 }[] = [
  { v: "sym", label: "Symmetric", A: [2, 1, 1, 2] },
  { v: "ca2", label: "CA2 matrix", A: [2, 2, 2, -1] },
  { v: "shear", label: "Shear", A: [1, 1, 0, 1] },
  { v: "rot", label: "Rotation 90°", A: [0, -1, 1, 0] },
];
const PRESET_OPTS = PRESETS.map(({ v, label }) => ({ v, label }));
const presetA = (k: string): M2 => PRESETS.find((p) => p.v === k)?.A ?? PRESETS[0].A;

// ---------------------------------------------------------------------------------------------
// 1. Eigenvector hunter: drag x, watch Ax.

function EigenHunter() {
  const [preset, setPreset] = useState("ca2");
  const [A, setA] = useState<M2>(presetA("ca2"));
  const [x, setXRaw] = useState<V2>([1, 0]);
  const [edit, setEdit] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [showCircle, setShowCircle] = useState(false);

  const e = eig2(A);
  const pairs = e.kind === "real" ? e.pairs : [];
  // Magnet: when x is within ~3° of an eigen-line, snap onto it so exact eigenvectors are reachable.
  const setX = (p: V2) => {
    for (const { v } of pairs) {
      if (norm(p) > 0.3 && Math.abs(cross2(unit(p), v)) < 0.05) return setXRaw(proj(p, v));
    }
    setXRaw(p);
  };
  const choose = (k: string) => {
    setPreset(k);
    setA(presetA(k));
  };
  const setEntry = (i: number) => (val: number) => {
    setA((o) => o.map((y, j) => (j === i ? val : y)) as M2);
    setPreset("custom");
  };

  const Ax = mv(A, x);
  const nx = norm(x);
  const nAx = norm(Ax);
  const zero = nx < 1e-9;
  const isEig = !zero && (nAx < 1e-9 || Math.abs(cross2(x, Ax)) <= 1e-3 * nx * nAx);
  const lam = zero ? 0 : dot(Ax, x) / dot(x, x);
  const angle = zero || nAx < 1e-9 ? 0 : (Math.acos(clamp(dot(x, Ax) / (nx * nAx), -1, 1)) * 180) / Math.PI;
  const cx: VizColor = isEig ? "good" : "accent";
  const cAx: VizColor = isEig ? "good" : "eig";
  const ellipse = circlePts().map((p) => mv(A, p));
  const t = trace(A);
  const d = det2(A);

  let eigInfo: { tex: string; tone?: Tone } | null = null;
  if (e.kind === "complex") {
    eigInfo = { tone: "warn", tex: `$\\lambda = ${fmt(e.re)} \\pm ${fmt(e.im)}j$ is complex, so there are **no real eigen-lines**: every $\\mathbf{x}$ gets turned.` };
  } else if (pairs.length === 1) {
    eigInfo = { tone: "warn", tex: `$\\lambda = ${fmt(pairs[0].l)}$ is a **double** root but has only one eigen-line, $\\text{span}\\{${fmtV(nice(pairs[0].v))}\\}$ → not diagonalizable.` };
  } else if (pairs.length === 2 && Math.abs(pairs[0].l - pairs[1].l) < 1e-9) {
    eigInfo = { tex: `$A = ${fmt(pairs[0].l)}I$: **every** nonzero $\\mathbf{x}$ is an eigenvector.` };
  } else if (pairs.length === 2) {
    eigInfo = { tex: pairs.map((p) => `$\\lambda = ${fmt(p.l)}$: $\\text{span}\\{${fmtV(nice(p.v))}\\}$`).join(", ") };
  }

  return (
    <VizFrame
      title="Hunt for eigenvectors"
      hint="Drag x. Ax is drawn from the origin; both turn green when Ax lands on the line of x (it snaps on when close)."
      onReset={() => {
        choose("ca2");
        setXRaw([1, 0]);
        setShowLines(false);
        setShowCircle(false);
      }}
      figure={
        <Plane2D x={[-6, 6]} y={[-6, 6]}>
          {showCircle && (
            <>
              <Circle2 r={1} color="text" />
              <Poly2 pts={ellipse} closed color="eig" width={1.5} />
            </>
          )}
          {showLines && pairs.map((p, i) => <Line2 key={i} d={p.v} color="warn" />)}
          {showLines && pairs.map((p, i) => <Label2 key={`l${i}`} at={scale(p.v, 4.6)} text={`λ = ${fmt(p.l)}`} color="warn" />)}
          <Arrow2 to={Ax} color={cAx} label="Ax" width={3} />
          <Arrow2 to={x} color={cx} />
          <Handle2 at={x} onChange={setX} color={cx} step={0.25} label="x" />
        </Plane2D>
      }
      controls={
        <>
          <Choice value={preset} options={PRESET_OPTS} onChange={choose} />
          <Toggle label="Edit the entries of $A$" value={edit} onChange={setEdit} />
          {edit &&
            (["a_{11}", "a_{12}", "a_{21}", "a_{22}"] as const).map((n, i) => (
              <Slider key={n} label={`$${n}$`} value={A[i]} min={-3} max={3} step={0.5} onChange={setEntry(i)} />
            ))}
          <Toggle label="Show eigen-lines (dashed)" value={showLines} onChange={setShowLines} />
          <Toggle label="Show unit circle and its image" value={showCircle} onChange={setShowCircle} />
          <VecInput label="$\mathbf{x}$" value={x} onChange={(v) => setX(v as V2)} step={0.25} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = ${texM(A)}$, $\\ \\mathbf{x} = ${fmtV(x)}$, $\\ A\\mathbf{x} = ${fmtV(Ax)}$`} />
          {zero ? (
            <Read tone="warn" tex="$\mathbf{x} = \mathbf{0}$: $A\mathbf{0} = \lambda\mathbf{0}$ for **every** $\lambda$, so $\mathbf{0}$ is never counted as an eigenvector." />
          ) : isEig ? (
            <Read
              tone="good"
              tex={`$A\\mathbf{x} = ${fmt(lam)}\\,\\mathbf{x}$ → **$\\mathbf{x}$ is an eigenvector ✓** with $\\lambda = ${fmt(lam)}$${
                Math.abs(lam) < 1e-9 ? " (squashed to $\\mathbf{0}$: $A$ is singular)" : lam < 0 ? " (flipped: same line, opposite direction)" : ""
              }`}
            />
          ) : (
            <Read tone="bad" tex={`$A\\mathbf{x}$ is $${fmt(angle, 1)}^\\circ$ off the line of $\\mathbf{x}$ → not a multiple of $\\mathbf{x}$, **not an eigenvector**`} />
          )}
          {showLines && <Read tex={`$\\det(A - \\lambda I) = ${charPoly(t, d)} = 0$`} />}
          {showLines && eigInfo && <Read tone={eigInfo.tone} tex={eigInfo.tex} />}
          {showCircle && <Read tex="The circle maps to the ellipse. Points on an eigen-line stay on it; elsewhere the circle gets **turned** as well as stretched." />}
        </>
      }
      tasks={[
        "Predict: how many lines through the origin does the **CA2 matrix** leave in place? Hunt by dragging $\\mathbf{x}$ until it turns green, then tick *eigen-lines* to check.",
        "Find the green direction where $A\\mathbf{x}$ points the **opposite** way to $\\mathbf{x}$. Is that still an eigenvector? Read off its $\\lambda$. Then double $\\mathbf{x}$ along the line: does $\\lambda$ change?",
        "Shear: $\\lambda = 1$ is a double root. Predict one eigen-line or two, then check. Rotation: can **anything** turn green?",
        "Drag $\\mathbf{x}$ to the origin. $A\\mathbf{0} = \\lambda\\mathbf{0}$ holds for every $\\lambda$, so why is $\\mathbf{0}$ still not an eigenvector?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. det(A − λI) as signed area; eigenvalues are where it is 0.

function DetLambda() {
  const [preset, setPreset] = useState("ca2");
  const [lam, setLam] = useState(0);
  const [roots, setRoots] = useState(false);
  const A = presetA(preset);
  const e = eig2(A);
  const M: M2 = [A[0] - lam, A[1], A[2], A[3] - lam];
  const d = det2(M);
  const flat = Math.abs(d) < 1e-6;
  const near = !flat && Math.abs(d) < 0.3;
  const c1 = mv(M, [1, 0]);
  const c2 = mv(M, [0, 1]);
  const img: V2[] = [[0, 0], c1, add(c1, c2), c2];
  const fillC: VizColor = flat ? "good" : d > 0 ? "accent" : "bad";
  const kernel = flat ? nullDirs(A, lam) : [];
  const t = trace(A);
  const dA = det2(A);

  // p(λ) plot, y squashed by S so the parabola fits.
  const S = 4;
  const p = (l: number) => l * l - t * l + dA;
  const curve: V2[] = Array.from({ length: 121 }, (_, i) => {
    const l = -4.5 + (9 * i) / 120;
    return [l, clamp(p(l) / S, -2.6, 2.6)];
  });

  return (
    <VizFrame
      title="det(A − λI) is an area"
      hint="Slide λ. The shaded shape is the unit square after A − λI. The lower plot is p(λ) = det(A − λI)."
      onReset={() => {
        setPreset("ca2");
        setLam(0);
        setRoots(false);
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <Plane2D x={[-6, 6]} y={[-6, 6]}>
            <Poly2 pts={[[0, 0], [1, 0], [1, 1], [0, 1]]} closed color="muted" width={1.2} dashed />
            {kernel.map((v, i) => (
              <Line2 key={i} d={v} color="good" />
            ))}
            {kernel.length === 1 && <Label2 at={scale(kernel[0], 4.4)} text="Nul(A − λI)" color="good" />}
            <Poly2 pts={img} fill color={fillC} width={2} />
            <Arrow2 to={c1} color="accent" label="col 1" />
            <Arrow2 to={c2} color="eig" label="col 2" />
          </Plane2D>
          <Plane2D x={[-4.5, 4.5]} y={[-2.5, 2.5]} grid={0} labels={false}>
            {[-4, -2, 2, 4].map((i) => (
              <Label2 key={i} at={[i, 0]} text={String(i)} color="muted" dx={-4} dy={14} />
            ))}
            <Label2 at={[-4.4, 2.1]} text="p(λ) = det(A − λI)" color="eig" dx={0} dy={0} />
            <Poly2 pts={curve} color="eig" />
            {roots && e.kind === "real" && e.l.map((l, i) => <Dot2 key={i} at={[l, 0]} color="good" r={4} />)}
            <Seg2 a={[lam, -2.5]} b={[lam, 2.5]} color="muted" dashed width={1} />
            <Dot2 at={[lam, clamp(d / S, -2.6, 2.6)]} color={flat ? "good" : "warn"} r={5} label={`λ = ${fmt(lam)}`} />
          </Plane2D>
        </div>
      }
      controls={
        <>
          <Choice value={preset} options={PRESET_OPTS} onChange={setPreset} />
          <Slider label="$\lambda$" value={lam} min={-4} max={4} step={0.05} onChange={setLam} />
          <Toggle label="Reveal the eigenvalues (roots)" value={roots} onChange={setRoots} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = ${texM(A)}$, $\\ A - \\lambda I = ${texM(M)}$`} />
          <Read
            tex={`$\\det(A - \\lambda I) = (${fmt(M[0])})(${fmt(M[3])}) - (${fmt(A[1])})(${fmt(A[2])}) = ${fmt(d)}$ = signed area of the shaded shape`}
          />
          <Read tex={`$p(\\lambda) = \\lambda^2 - (\\text{tr}A)\\lambda + \\det A = ${charPoly(t, dA)}$, $\\ p(${fmt(lam)}) = ${fmt(d)}$`} />
          {flat ? (
            <Read tone="good" tex={`$\\lambda = ${fmt(lam)}$ **is an eigenvalue**: $A - \\lambda I$ squashes the plane flat onto a line, so $(A - \\lambda I)\\mathbf{x} = \\mathbf{0}$ has nonzero solutions (green dashed line = eigenspace).`} />
          ) : near ? (
            <Read tone="warn" tex="Almost flat: you are close to an eigenvalue." />
          ) : d < 0 ? (
            <Read tone="warn" tex="Negative area: the square is flipped over. $p(\lambda) < 0$ exactly **between** the two real eigenvalues." />
          ) : (
            <Read tex="Not an eigenvalue: $A - \lambda I$ is invertible, so only $\mathbf{x} = \mathbf{0}$ solves $(A - \lambda I)\mathbf{x} = \mathbf{0}$." />
          )}
          {roots &&
            (e.kind === "real" ? (
              <Read
                tone="good"
                tex={`roots $\\lambda_1 = ${fmt(e.l[0])}$, $\\lambda_2 = ${fmt(e.l[1])}$: sum $= ${fmt(e.l[0] + e.l[1])} = \\text{tr}A$, product $= ${fmt(e.l[0] * e.l[1])} = \\det A$`}
              />
            ) : (
              <Read tone="warn" tex={`discriminant $(\\text{tr}A)^2 - 4\\det A = ${fmt(t * t - 4 * dA)} < 0$ → $\\lambda = ${fmt(e.re)} \\pm ${fmt(e.im)}j$: the area is never $0$ for real $\\lambda$.`} />
            ))}
        </>
      }
      tasks={[
        "Predict: for the **CA2 matrix**, at which two $\\lambda$ does the shape collapse to a line? Slide to check, then confirm $\\lambda_1 + \\lambda_2 = \\text{tr}A$ and $\\lambda_1\\lambda_2 = \\det A$.",
        "Between the two eigenvalues the area turns **negative** (red). Where is the dot on $p(\\lambda)$ then? What does that say about the sign of $p$ between its roots?",
        "Shear: predict how many $\\lambda$ make the shape flat. Watch the parabola only **touch** the axis: a double root.",
        "Rotation: try every $\\lambda$. Why can the area never reach $0$, and what does that mean for the eigenvalues?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Powers: x, Ax, A²x, … and the long-term behaviour.

const PV: [V2, V2] = [
  [2, 1],
  [-1, 1],
];
const POWERS: { v: string; label: string; l: [number, number] }[] = [
  { v: "grow", label: "$\\lambda = 2,\\ 0.5$", l: [2, 0.5] },
  { v: "fixed", label: "$1,\\ 0.5$", l: [1, 0.5] },
  { v: "decay", label: "$0.9,\\ 0.5$", l: [0.9, 0.5] },
  { v: "flip", label: "$-1.5,\\ 0.5$", l: [-1.5, 0.5] },
];
const POWER_KMAX = 30;
const EXTENTS = [5, 8, 12, 20, 30, 60];

function longTerm(c: V2, l: [number, number], v: [V2, V2]): { tex: string; tone: Tone } {
  const present = [0, 1].filter((i) => Math.abs(c[i]) > 1e-9);
  if (!present.length) return { tex: "$\\mathbf{x}_0 = \\mathbf{0}$ just stays at $\\mathbf{0}$.", tone: "warn" };
  const bigger = (a: number, b: number) => (Math.abs(l[b]) > Math.abs(l[a]) ? b : a);
  const i = present.reduce(bigger);
  const top = [0, 1].reduce(bigger);
  const note = i !== top ? ` **Note $c_${top + 1} = 0$: the $\\lambda_${top + 1}$ term is missing, so it cannot dominate.**` : "";
  const L = l[i];
  const cv = scale(v[i], c[i]);
  const name = `c_${i + 1}\\mathbf{v}_${i + 1}`;
  if (Math.abs(L) < 1 - 1e-9) return { tex: `Every term present has $|\\lambda| < 1$, so $A^k\\mathbf{x}_0 \\to \\mathbf{0}$.${note}`, tone: "good" };
  if (Math.abs(L - 1) < 1e-9) return { tex: `Dominant $\\lambda_${i + 1} = 1$: $A^k\\mathbf{x}_0 \\to ${name} = ${fmtV(cv)}$, a fixed vector.${note}`, tone: "good" };
  if (L > 1) {
    const inf = cv.map((z) => (z > 1e-9 ? "+\\infty" : z < -1e-9 ? "-\\infty" : "0"));
    return { tex: `Dominant $\\lambda_${i + 1} = ${fmt(L)} > 1$: grows along $\\mathbf{v}_${i + 1}$, entries $\\to [${inf.join(",\\ ")}]^T$ (the signs of $${name}$).${note}`, tone: "bad" };
  }
  if (Math.abs(L + 1) < 1e-9) return { tex: `Dominant $\\lambda = -1$: jumps between $\\pm ${name}$ forever, **no limit**.${note}`, tone: "warn" };
  return { tex: `Dominant $\\lambda_${i + 1} = ${fmt(L)} < -1$: the sign flips every step while the size blows up, **no limit**.${note}`, tone: "warn" };
}

function PowersIterate() {
  const [preset, setPreset] = useState("grow");
  const [x0, setX0] = useState<V2>([1, 2]);
  const pr = POWERS.find((p) => p.v === preset) ?? POWERS[0];
  const [l1, l2] = pr.l;
  const P = fromCols(PV[0], PV[1]);
  const Pinv = inv2(P) ?? [1, 0, 0, 1];
  const A = mm(mm(P, [l1, 0, 0, l2]), Pinv);
  const trail = iterate(A, x0, POWER_KMAX);
  const s = useStepper(trail.length - 1);
  const k = s.k;
  const shown = trail.slice(0, k + 1);
  const xk = shown[shown.length - 1];
  const c = mv(Pinv, x0);
  const escaped = s.atEnd && trail.length - 1 < POWER_KMAX;
  const comp1 = scale(PV[0], c[0] * l1 ** k);

  const m = Math.max(...shown.map((q) => Math.max(Math.abs(q[0]), Math.abs(q[1]))));
  const ext = EXTENTS.find((e) => e >= m * 1.15) ?? EXTENTS[EXTENTS.length - 1];
  const grid = ext <= 8 ? 1 : ext <= 20 ? 2 : ext <= 30 ? 5 : 10;
  const lt = longTerm(c, pr.l, PV);

  return (
    <VizFrame
      title="Where does Aᵏx go?"
      hint="Drag x₀, then Step or Play to apply A again and again. The view zooms out as the points grow."
      onReset={() => {
        setPreset("grow");
        setX0([1, 2]);
        s.reset();
      }}
      figure={
        <Plane2D x={[-ext, ext]} y={[-ext, ext]} grid={grid} labels={ext <= 12}>
          <Line2 d={PV[0]} color="eig" />
          <Line2 d={PV[1]} color="orth" />
          <Label2 at={scale(unit(PV[0]), ext * 0.7)} text={`v₁ (λ₁ = ${fmt(l1)})`} color="eig" />
          <Label2 at={scale(unit(PV[1]), ext * 0.7)} text={`v₂ (λ₂ = ${fmt(l2)})`} color="orth" />
          {k > 0 && (
            <>
              <Arrow2 to={comp1} color="eig" width={1.5} dashed />
              <Seg2 a={comp1} b={xk} color="orth" dashed />
            </>
          )}
          <Poly2 pts={shown} color="warn" width={1.5} />
          {shown.map((q, i) => (
            <Dot2 key={i} at={q} color="warn" r={i === k ? 4 : 2.5} />
          ))}
          {k > 0 && <Arrow2 to={xk} color="good" label={`x${k}`} />}
          <Handle2
            at={x0}
            onChange={setX0}
            step={0.25}
            label="x₀"
          />
        </Plane2D>
      }
      controls={
        <>
          <Choice value={preset} options={POWERS.map(({ v, label }) => ({ v, label }))} onChange={setPreset} />
          <StepButtons s={s} />
          <VecInput label="$\mathbf{x}_0$" value={x0} onChange={(v) => setX0(v as V2)} step={0.25} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = PDP^{-1} = ${texM(A)}$, $\\ \\mathbf{v}_1 = [2,\\ 1]^T,\\ \\lambda_1 = ${fmt(l1)}$; $\\ \\mathbf{v}_2 = [-1,\\ 1]^T,\\ \\lambda_2 = ${fmt(l2)}$`} />
          <Read tex={`$\\mathbf{x}_0 = ${fmtV(x0)} = ${combo([[c[0], "\\mathbf{v}_1"], [c[1], "\\mathbf{v}_2"]])}$, so $c_1 = ${fmt(c[0])}$, $c_2 = ${fmt(c[1])}$`} />
          <Read
            tex={`$A^{${k}}\\mathbf{x}_0 = c_1\\lambda_1^{${k}}\\mathbf{v}_1 + c_2\\lambda_2^{${k}}\\mathbf{v}_2 = (${fmt(c[0])})(${fmt(l1)})^{${k}}\\mathbf{v}_1 + (${fmt(c[1])})(${fmt(l2)})^{${k}}\\mathbf{v}_2 = ${fmtV(xk)}$`}
          />
          {escaped && <Read tone="warn" tex={`$\\|A^{${k + 1}}\\mathbf{x}_0\\| > 50$: stopped drawing here.`} />}
          <Read label="Long run" tone={lt.tone} tex={lt.tex} />
        </>
      }
      tasks={[
        "Predict, then Play: with $\\lambda = 2, 0.5$, which eigen-line does the trail end up hugging, and in which direction?",
        "CA2 trap: drag $\\mathbf{x}_0$ onto the $\\mathbf{v}_2$ line so $c_1 = 0$. Predict the limit **before** pressing Play.",
        "Preset $1, 0.5$: predict the limit vector from $c_1$ alone, then check it equals $c_1\\mathbf{v}_1$. Now make $c_1$ negative: what changes?",
        "Preset $-1.5, 0.5$: does $A^k\\mathbf{x}_0$ have a limit? Step slowly and watch which side of the origin it lands on.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. A = PDP⁻¹: in the eigenvector grid, A only stretches.

const GRIDS: { v: string; label: string; b: [V2, V2]; l: [number, number] }[] = [
  { v: "lesson", label: "lesson: $\\lambda = 2,\\ -1$", b: [[1, 1], [1, -1]], l: [2, -1] },
  { v: "skew", label: "$\\lambda = 2,\\ 0.5$", b: [[2, 1], [-1, 1]], l: [2, 0.5] },
];

function EigenbasisGrid() {
  const [preset, setPreset] = useState("lesson");
  const [basis, setBasis] = useState<"std" | "eig">("eig");
  const [t, setT] = useState(0);
  const [anim, setAnim] = useState(false);
  const [x, setX] = useState<V2>([2, 0]);
  const g = GRIDS.find((q) => q.v === preset) ?? GRIDS[0];
  const [b1, b2] = g.b;
  const [l1, l2] = g.l;
  const P = fromCols(b1, b2);
  const Pinv = inv2(P);
  const A = Pinv ? mm(mm(P, [l1, 0, 0, l2]), Pinv) : ([1, 0, 0, 1] as M2);
  const M = lerpI(A, t);

  const running = anim && t < 1;
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setT((v) => Math.min(1, Math.round((v + 0.02) * 100) / 100)), 30);
    return () => clearTimeout(id);
  }, [running, t]);

  const [u, w]: [V2, V2] = basis === "std" ? [[1, 0], [0, 1]] : [b1, b2];
  const names = basis === "std" ? ["e₁", "e₂"] : ["b₁", "b₂"];
  const tag = (n: string) => (t >= 1 ? `A${n}` : t <= 0 ? n : `M${n}`);
  const N = 8;
  const lines: ReactNode[] = [];
  for (let i = -N; i <= N; i++) {
    const main = i === 0;
    lines.push(<Seg2 key={`u${i}`} a={mv(M, add(scale(u, i), scale(w, -N)))} b={mv(M, add(scale(u, i), scale(w, N)))} color={main ? "orth" : "muted"} width={main ? 1.6 : 0.8} />);
    lines.push(<Seg2 key={`w${i}`} a={mv(M, add(scale(w, i), scale(u, -N)))} b={mv(M, add(scale(w, i), scale(u, N)))} color={main ? "eig" : "muted"} width={main ? 1.6 : 0.8} />);
  }

  const c: V2 = Pinv ? mv(Pinv, x) : [0, 0];
  const mu: V2 = [1 - t + t * l1, 1 - t + t * l2];
  const Mx = mv(M, x);
  const Ax = mv(A, x);
  const Dc: V2 = [l1 * c[0], l2 * c[1]];
  const Px = mv(P, x);
  const collapsed = t > 0 && t < 1 && (Math.abs(mu[0]) < 0.02 || Math.abs(mu[1]) < 0.02);

  return (
    <VizFrame
      title="A = PDP⁻¹: the eigenvector grid just stretches"
      hint="Slide t (or Animate) to morph the grid from I to A. Drag x."
      onReset={() => {
        setPreset("lesson");
        setBasis("eig");
        setT(0);
        setAnim(false);
        setX([2, 0]);
      }}
      figure={
        <Plane2D x={[-6, 6]} y={[-6, 6]}>
          {lines}
          {basis === "eig" && (
            <>
              <Seg2 a={[0, 0]} b={scale(b1, c[0])} color="eig" dashed width={1.2} />
              <Seg2 a={scale(b1, c[0])} b={x} color="orth" dashed width={1.2} />
              {t > 0 && (
                <>
                  <Seg2 a={[0, 0]} b={scale(b1, mu[0] * c[0])} color="eig" dashed width={1.2} />
                  <Seg2 a={scale(b1, mu[0] * c[0])} b={Mx} color="orth" dashed width={1.2} />
                </>
              )}
            </>
          )}
          <Arrow2 to={mv(M, u)} color="eig" label={tag(names[0])} />
          <Arrow2 to={mv(M, w)} color="orth" label={tag(names[1])} />
          {t > 0 && <Arrow2 to={Mx} color="good" label={tag("x")} width={3} />}
          <Handle2 at={x} onChange={setX} step={0.25} label="x" />
        </Plane2D>
      }
      controls={
        <>
          <Choice value={preset} options={GRIDS.map(({ v, label }) => ({ v, label }))} onChange={setPreset} />
          <Choice
            value={basis}
            options={[
              { v: "std", label: "standard grid" },
              { v: "eig", label: "eigenvector grid" },
            ]}
            onChange={setBasis}
          />
          <Slider
            label="$t$ (morph $I \to A$)"
            value={t}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => {
              setAnim(false);
              setT(v);
            }}
          />
          <div className="row" style={{ gap: 6 }}>
            <button
              className="btn small primary"
              onClick={() => {
                if (running) return setAnim(false);
                if (t >= 1) setT(0);
                setAnim(true);
              }}
            >
              {running ? "Pause" : "Animate I → A"}
            </button>
          </div>
          <VecInput label="$\mathbf{x}$" value={x} onChange={(v) => setX(v as V2)} step={0.25} />
        </>
      }
      readout={
        <>
          <Read tex={`$P = [\\mathbf{b}_1\\ \\mathbf{b}_2] = ${texM(P)}$, $\\ D = ${texM([l1, 0, 0, l2])}$, $\\ A = PDP^{-1} = ${texM(A)}$`} />
          <Read tex={`$[\\mathbf{x}]_\\mathcal{B} = P^{-1}\\mathbf{x} = ${fmtV(c)}$, i.e. $\\mathbf{x} = ${combo([[c[0], "\\mathbf{b}_1"], [c[1], "\\mathbf{b}_2"]])}$`} />
          <Read tex={`$D[\\mathbf{x}]_\\mathcal{B} = ${fmtV(Dc)}$ (each coordinate times its own $\\lambda$)`} />
          <Read tone="good" tex={`$A\\mathbf{x} = PD P^{-1}\\mathbf{x} = ${combo([[Dc[0], "\\mathbf{b}_1"], [Dc[1], "\\mathbf{b}_2"]])} = ${fmtV(Ax)}$`} />
          <Read
            tex={`$t = ${fmt(t)}$: drawing $(1-t)I + tA = ${texM(M)}$, which scales $\\mathbf{b}_1$ by $${fmt(mu[0])}$ and $\\mathbf{b}_2$ by $${fmt(mu[1])}$`}
          />
          {collapsed && <Read tone="warn" tex="At this $t$ one eigen-direction is squashed to $\mathbf{0}$ (a feature of the in-between matrix, not of $A$)." />}
          <Read tone="bad" tex={`Common slip: $P\\mathbf{x} = ${fmtV(Px)}$ is **not** $[\\mathbf{x}]_\\mathcal{B}$.`} />
        </>
      }
      tasks={[
        "Predict: in the **eigenvector grid**, what happens to the cells as $t$ goes from 0 to 1? Animate to check: the grid lines never turn, they only stretch by $\\lambda_1$ and $\\lambda_2$.",
        "Switch to the **standard grid** and animate again. The lines tilt, which is why $A$ is not diagonal in the standard basis but $D$ is in the eigenvector basis.",
        "With the lesson preset, drag $\\mathbf{x}$ to $[2,0]^T$. Work out $[\\mathbf{x}]_\\mathcal{B}$ and $A\\mathbf{x}$ by hand first, then check the readout.",
        "The red line shows $P\\mathbf{x}$. Which of $P$ or $P^{-1}$ turns a vector into $\\mathcal{B}$-coordinates? Check by rebuilding $\\mathbf{x}$ from the dashed path.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Complex eigenvalues a ± bj: rotate by φ and scale by r each step.

const SPIRAL_KMAX = 72;
const DISGUISE: M2 = [1.5, 0.5, 0, 1];

function ComplexSpiral() {
  const [r, setR] = useState(0.95);
  const [phi, setPhi] = useState(30);
  const [x0, setX0] = useState<V2>([4, 0]);
  const [disguise, setDisguise] = useState(false);
  const rad = (phi * Math.PI) / 180;
  const a = r * Math.cos(rad);
  const b = r * Math.sin(rad);
  const C: M2 = [a, -b, b, a];
  const Dinv = inv2(DISGUISE);
  const A = disguise && Dinv ? mm(mm(DISGUISE, C), Dinv) : C;
  const trail = iterate(A, x0, SPIRAL_KMAX);
  const s = useStepper(trail.length - 1, 250);
  const k = s.k;
  const shown = trail.slice(0, k + 1);
  const xk = shown[shown.length - 1];
  const real = Math.abs(b) < 1e-9;
  const period = 360 / Math.abs(phi);
  const closes = Math.abs(r - 1) < 1e-9 && !real && Math.abs(period - Math.round(period)) < 1e-6;

  let behaviour: { tex: string; tone: Tone };
  if (real) behaviour = { tone: "warn", tex: `$b = 0$: $\\lambda = ${fmt(a)}$ is **real** (a repeated eigenvalue), so there is no rotation, just scaling${a < 0 ? " and a flip" : ""}.` };
  else if (r < 1 - 1e-9) behaviour = { tone: "good", tex: `$r = ${fmt(r)} < 1$: each step shrinks by $r$, so $A^k\\mathbf{x}_0$ **spirals inward** to $\\mathbf{0}$.` };
  else if (r > 1 + 1e-9) behaviour = { tone: "bad", tex: `$r = ${fmt(r)} > 1$: each step grows by $r$, so $A^k\\mathbf{x}_0$ **spirals outward**.` };
  else behaviour = { tone: "warn", tex: `$r = 1$: no growth or decay, the points stay on a closed ${disguise ? "ellipse" : "circle"}${closes ? ` and return to $\\mathbf{x}_0$ after $360^\\circ/${fmt(Math.abs(phi), 0)}^\\circ = ${Math.round(period)}$ steps` : ""}.` };

  return (
    <VizFrame
      title="Complex eigenvalues: rotate and scale"
      hint="Set r = |λ| and the angle φ. Drag x₀, then Play to apply the matrix repeatedly."
      onReset={() => {
        setR(0.95);
        setPhi(30);
        setX0([4, 0]);
        setDisguise(false);
        s.reset();
      }}
      figure={
        <Plane2D x={[-6, 6]} y={[-6, 6]}>
          {!disguise && norm(x0) > 1e-9 && <Circle2 r={norm(x0)} color="muted" />}
          <Poly2 pts={shown} color="cx" width={1.5} />
          {shown.map((q, i) => (
            <Dot2 key={i} at={q} color="cx" r={i === k ? 4 : 2.5} />
          ))}
          {k > 0 && <Arrow2 to={xk} color="cx" label={`x${k}`} />}
          <Handle2 at={x0} onChange={setX0} step={0.25} label="x₀" />
        </Plane2D>
      }
      controls={
        <>
          <Slider label="$r = |\lambda|$" value={r} min={0.8} max={1.2} step={0.01} onChange={setR} />
          <Slider label="$\varphi$" value={phi} min={-180} max={180} step={1} onChange={setPhi} format={(v) => `${v}°`} />
          <StepButtons s={s} />
          <Toggle label="Disguise: use $A = PCP^{-1}$ instead of $C$" value={disguise} onChange={setDisguise} />
          <VecInput label="$\mathbf{x}_0$" value={x0} onChange={(v) => setX0(v as V2)} step={0.25} />
        </>
      }
      readout={
        <>
          <Read tex={`$C = \\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix} = ${texM(C)}$ with $a = r\\cos\\varphi$, $b = r\\sin\\varphi$`} />
          {disguise && <Read tex={`$A = PCP^{-1} = ${texM(A)}$, $P = ${texM(DISGUISE)}$: similar to $C$, so the **same** eigenvalues`} />}
          <Read tex={`$\\lambda = a \\pm bj = ${fmt(a)} \\pm ${fmt(Math.abs(b))}j$`} />
          <Read tex={`$|\\lambda| = \\sqrt{a^2 + b^2} = \\sqrt{${fmt(a * a)} + ${fmt(b * b)}} = ${fmt(r)}$ (not $a^2 + b^2 = ${fmt(r * r)}$)`} />
          <Read
            tex={`$\\varphi = \\arg(a + bj) = ${fmt(phi, 1)}^\\circ$ per step${a > 1e-9 && !real ? `, $\\ \\tan^{-1}(b/a) = \\tan^{-1}(${fmt(b / a)})$` : ""}`}
          />
          {disguise ? (
            <Read tex={`$\\mathbf{x}_{${k}} = A^{${k}}\\mathbf{x}_0 = ${fmtV(xk)}$`} />
          ) : (
            <Read
              tex={`$\\|\\mathbf{x}_{${k}}\\| = r^{${k}}\\|\\mathbf{x}_0\\| = ${fmt(r)}^{${k}} \\cdot ${fmt(norm(x0))} = ${fmt(norm(xk))}$, turned by $k\\varphi = ${fmt(k * phi, 0)}^\\circ$`}
            />
          )}
          <Read label="Long run" tone={behaviour.tone} tex={behaviour.tex} />
        </>
      }
      tasks={[
        "Predict: with $r = 1$ and $\\varphi = 30^\\circ$, after how many steps is $\\mathbf{x}_k$ back at $\\mathbf{x}_0$? Press Play and count.",
        "Set $r = 1.1$ and read $a$, $b$. Is $|\\lambda|$ equal to $a^2 + b^2$ or $\\sqrt{a^2 + b^2}$? Which one matches the 10% growth per step?",
        "For $\\lambda = \\tfrac{\\sqrt3}{2} \\pm \\tfrac12 j$ (so $r = 1$), predict $\\varphi$: $30^\\circ$ or $60^\\circ$? Set your guess and compare $a$ and $b$.",
        "Tick *Disguise*: the orbit becomes an ellipse, yet $\\lambda$ does not change. Which fact about similar matrices is this?",
      ]}
    />
  );
}
