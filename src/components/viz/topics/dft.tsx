"use client";

import { useEffect, useState } from "react";
import { Choice, Read, Slider, Toggle, VizFrame } from "../Frame";
import { Arrow2, Circle2, Dot2, Handle2, Label2, Plane2D, Poly2, Seg2, cssColor, type VizColor } from "../Plane2D";
import { clamp, fmt, type V2 } from "../vec";

export default function DftVisual({ id }: { id: string }) {
  switch (id) {
    case "phasor-spin":
      return <PhasorSpin />;
    case "dft-matrix-clocks":
      return <MatrixClocks />;
    case "dft-spectrum":
      return <Spectrum />;
    case "dft-synthesis":
      return <Synthesis />;
    default:
      return null;
  }
}

// ---------- complex + DFT helpers (a complex number is [re, im]) ----------

type C = V2;
const PI = Math.PI;
const cadd = (p: C, q: C): C => [p[0] + q[0], p[1] + q[1]];
const cmul = (p: C, q: C): C => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
const cscale = (p: C, k: number): C => [p[0] * k, p[1] * k];
const conj = (p: C): C => [p[0], -p[1]];
const cabs = (p: C) => Math.hypot(p[0], p[1]);
const cexp = (t: number): C => [Math.cos(t), Math.sin(t)];
const polar = (r: number, t: number): C => [r * Math.cos(t), r * Math.sin(t)];

/** Reduce an angle into (−π, π]. */
function principal(t: number): number {
  let r = ((((t + PI) % (2 * PI)) + 2 * PI) % (2 * PI)) - PI;
  if (r <= -PI + 1e-9) r = PI;
  return r;
}
const carg = (p: C) => principal(Math.atan2(p[1] + 0, p[0]));

/** Analysis X[k] = Σ x[n] e^{−j2πkn/N}  (X = Wx, no 1/N). */
function dft(x: C[]): C[] {
  const N = x.length;
  return Array.from({ length: N }, (_, k) => x.reduce<C>((s, xn, n) => cadd(s, cmul(xn, cexp((-2 * PI * ((k * n) % N)) / N))), [0, 0]));
}
/** Synthesis x[n] = (1/N) Σ X[k] e^{+j2πkn/N}  (x = (1/N) Wᴴ X). */
function idft(X: C[]): C[] {
  const N = X.length;
  return Array.from({ length: N }, (_, n) => cscale(X.reduce<C>((s, Xk, k) => cadd(s, cmul(Xk, cexp((2 * PI * ((k * n) % N)) / N))), [0, 0]), 1 / N));
}

function piTex(t: number): string {
  if (Math.abs(t) < 1e-9) return "0";
  const q = t / PI;
  for (let d = 1; d <= 16; d++) {
    const num = Math.round(q * d);
    if (Math.abs(q * d - num) < 1e-6) {
      const sign = num < 0 ? "-" : "";
      const n = Math.abs(num);
      if (d === 1) return `${sign}${n === 1 ? "" : n}\\pi`;
      return `${sign}\\frac{${n === 1 ? "" : n}\\pi}{${d}}`;
    }
  }
  return `${fmt(q, 3)}\\pi`;
}
const angTex = (t: number) => `${piTex(t)}\\ (${fmt((t * 180) / PI, 1)}^\\circ)`;
function cTex(z: C, dp = 2): string {
  const eps = 0.5 * 10 ** -dp;
  const [a, b] = z;
  const az = Math.abs(a) < eps, bz = Math.abs(b) < eps;
  if (bz) return az ? "0" : fmt(a, dp);
  const bAbs = Math.abs(b);
  const bs = Math.abs(bAbs - 1) < eps ? "" : fmt(bAbs, dp);
  if (az) return `${b < 0 ? "-" : ""}${bs}j`;
  return `${fmt(a, dp)} ${b < 0 ? "-" : "+"} ${bs}j`;
}
function polarTex(r: number, t: number, dp = 2): string {
  if (r < 0.5 * 10 ** -dp) return "0";
  const R = Math.abs(r - 1) < 1e-9 ? "" : fmt(r, dp);
  if (Math.abs(t) < 1e-9) return `${R || "1"}e^{j0}`;
  return t < 0 ? `${R}e^{-j${piTex(-t)}}` : `${R}e^{j${piTex(t)}}`;
}
const expTex = (z: C, dp = 2) => polarTex(cabs(z), carg(z), dp);
const arc = (t1: number, t2: number, r: number, n = 30): V2[] => Array.from({ length: n + 1 }, (_, i) => polar(r, t1 + ((t2 - t1) * i) / n));

/** Plain stem plot with independent x/y scales (not a world plane). */
function StemPlot({
  count,
  series,
  curves,
  ymin,
  ymax,
  height = 150,
  highlight,
  onPick,
  yTicks,
  xName = "n",
}: {
  count: number;
  series: { vals: number[]; color: VizColor; label: string }[];
  curves?: { f: (t: number) => number; color: VizColor }[];
  ymin: number;
  ymax: number;
  height?: number;
  highlight?: number;
  onPick?: (i: number) => void;
  yTicks?: { v: number; label: string }[];
  xName?: string;
}) {
  const W = 420, L = 34, Rm = 8, T = 18, B = 20;
  const pw = W - L - Rm, ph = height - T - B;
  const cw = pw / count;
  const xs = (t: number) => L + (t + 0.5) * cw;
  const ys = (v: number) => T + ((ymax - clamp(v, ymin, ymax)) / (ymax - ymin || 1)) * ph;
  const S = series.length;
  const off = Math.min(7, cw / 5);
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="viz-svg" role="img">
      {highlight !== undefined && <rect x={xs(highlight) - cw / 2} y={T - 4} width={cw} height={ph + 8} fill={cssColor("accent")} opacity={0.12} rx={4} />}
      {yTicks?.map((t) => (
        <g key={t.label}>
          <line x1={L} x2={W - Rm} y1={ys(t.v)} y2={ys(t.v)} className="viz-grid" />
          <text x={L - 4} y={ys(t.v) + 3} className="viz-tick" textAnchor="end">
            {t.label}
          </text>
        </g>
      ))}
      <g className="viz-axis">
        <line x1={L} x2={W - Rm} y1={ys(0)} y2={ys(0)} />
      </g>
      {curves?.map((c, ci) => {
        const pts: string[] = [];
        for (let t = -0.5; t <= count - 0.5 + 1e-9; t += 0.05) pts.push(`${xs(t)},${ys(c.f(t))}`);
        return <polyline key={ci} points={pts.join(" ")} fill="none" stroke={cssColor(c.color)} strokeWidth={1.2} strokeOpacity={0.55} />;
      })}
      {series.map((s, si) =>
        s.vals.map((v, i) =>
          Number.isNaN(v) ? null : (
            <g key={`${si}-${i}`}>
              <line x1={xs(i) + (si - (S - 1) / 2) * off} x2={xs(i) + (si - (S - 1) / 2) * off} y1={ys(0)} y2={ys(v)} stroke={cssColor(s.color)} strokeWidth={2} />
              <circle cx={xs(i) + (si - (S - 1) / 2) * off} cy={ys(v)} r={3.5} fill={cssColor(s.color)} />
            </g>
          ),
        ),
      )}
      {Array.from({ length: count }, (_, i) => (
        <text key={i} x={xs(i)} y={height - 6} className="viz-tick" textAnchor="middle">
          {i}
        </text>
      ))}
      <text x={6} y={height - 6} className="viz-tick">
        {xName}
      </text>
      {series.map((s, si) => (
        <text key={s.label} x={L + 4 + si * 120} y={12} fontSize={11} fontWeight={700} fill={cssColor(s.color)}>
          {s.label}
        </text>
      ))}
      {onPick &&
        Array.from({ length: count }, (_, i) => (
          <rect key={`p${i}`} x={xs(i) - cw / 2} y={0} width={cw} height={height} fill="transparent" style={{ cursor: "pointer" }} onClick={() => onPick(i)} />
        ))}
    </svg>
  );
}

/** Play / Pause / Step buttons. */
function Transport({ playing, setPlaying, onStep, onRestart }: { playing: boolean; setPlaying: (v: boolean) => void; onStep: () => void; onRestart: () => void }) {
  return (
    <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
      <button className="btn small" onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>
      <button className="btn small" onClick={() => { setPlaying(false); onStep(); }}>
        Step
      </button>
      <button className="btn small" onClick={() => { setPlaying(false); onRestart(); }}>
        n = 0
      </button>
    </div>
  );
}

/** Advance a sample counter on a timer while playing (state only set in the timer callback). */
function useTicker(playing: boolean, setT: (f: (t: number) => number) => void, N: number, ms: number) {
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((t) => (t + 1) % N), ms);
    return () => clearInterval(id);
  }, [playing, setT, N, ms]);
}

function direction(step: number): { text: string; tone: "good" | "warn" } {
  const d = principal(step);
  if (Math.abs(d) < 1e-9) return { text: "does not move: every sample is $1$ (DC)", tone: "warn" };
  if (Math.abs(Math.abs(d) - PI) < 1e-9) return { text: "flips $1, -1, 1, -1, \\dots$: **no direction** (half-turn each sample)", tone: "warn" };
  return { text: `${d < 0 ? "**clockwise**" : "**anticlockwise**"} at $${piTex(Math.abs(d))}$ rad/sample`, tone: "good" };
}

// ---------- 1. Spinning phasor e^{∓j2πkn/N} ----------

function PhasorSpin() {
  const [N, setN] = useState(8);
  const [k, setK] = useState(2);
  const [sign, setSign] = useState<"minus" | "plus">("minus");
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  useTicker(playing, setT, N, 700);
  const kk = Math.min(k, N - 1);
  const tt = t % N;
  const s = sign === "minus" ? -1 : 1;
  const step = (s * 2 * PI * kk) / N;
  const z = Array.from({ length: N }, (_, n) => cexp(step * n));
  const dir = direction(step);
  const red = principal(step);
  // group sample labels that land on the same point
  const groups = new Map<string, { at: C; ns: number[] }>();
  for (let n = 0; n <= tt; n++) {
    const key = `${Math.round(z[n][0] * 1000)},${Math.round(z[n][1] * 1000)}`;
    const g = groups.get(key);
    if (g) g.ns.push(n);
    else groups.set(key, { at: z[n], ns: [n] });
  }
  const sTex = s < 0 ? "-" : "+";
  return (
    <VizFrame
      title="Which way does e^(∓j2πkn/N) spin?"
      hint="Play or Step through n = 0, 1, …, N−1. Numbers next to dots are sample indices n; the orange arc is the apparent step."
      onReset={() => { setN(8); setK(2); setSign("minus"); setT(0); setPlaying(false); }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <Plane2D x={[-1.7, 1.7]} y={[-1.5, 1.5]} grid={0.5} labels={false}>
            <Circle2 r={1} />
            {z.map((p, n) => (n > tt ? <Dot2 key={`f${n}`} at={p} color="muted" r={2.5} /> : null))}
            {tt > 0 && <Poly2 pts={z.slice(0, tt + 1)} color="dft" width={1} dashed />}
            {tt > 0 && Math.abs(Math.abs(red) - PI) > 1e-9 && <Poly2 pts={arc(carg(z[tt - 1]), carg(z[tt - 1]) + red, 0.45)} color="warn" width={2.5} />}
            {[...groups.values()].map((g) => {
              const a = Math.atan2(g.at[1], g.at[0]);
              return (
                <g key={g.ns[0]}>
                  <Dot2 at={g.at} color={g.ns.includes(tt) ? "dft" : "cx"} r={g.ns.includes(tt) ? 6 : 4} />
                  <Label2 at={g.at} text={g.ns.join(",")} color="text" dx={20 * Math.cos(a) - 4 * g.ns.join(",").length} dy={-20 * Math.sin(a) + 4} />
                </g>
              );
            })}
            <Arrow2 to={z[tt]} color="dft" width={3} />
          </Plane2D>
          <StemPlot
            count={N}
            series={[
              { vals: z.map((p, n) => (n <= tt ? p[0] : NaN)), color: "dft", label: "Re z_n" },
              { vals: z.map((p, n) => (n <= tt ? p[1] : NaN)), color: "eig", label: "Im z_n" },
            ]}
            ymin={-1.2}
            ymax={1.2}
            height={140}
            highlight={tt}
            yTicks={[{ v: 1, label: "1" }, { v: -1, label: "−1" }]}
          />
        </div>
      }
      controls={
        <>
          <Slider label="$N$" value={N} min={4} max={16} step={1} onChange={(v) => { setN(v); setT(0); }} />
          <Slider label="$k$" value={kk} min={0} max={N - 1} step={1} onChange={(v) => { setK(v); setT(0); }} />
          <Choice value={sign} onChange={(v) => { setSign(v); setT(0); }} options={[{ v: "minus", label: "$e^{-j2\\pi kn/N}$ (row of $W$)" }, { v: "plus", label: "$e^{+j2\\pi kn/N}$ (column of $W^H$)" }]} />
          <Transport playing={playing} setPlaying={setPlaying} onStep={() => setT((v) => (v + 1) % N)} onRestart={() => setT(0)} />
        </>
      }
      readout={
        <>
          <Read tex={`$z_n = e^{${sTex}j2\\pi (${kk})n/${N}} = e^{j(${piTex(step)})n}$`} />
          <Read tex={`$\\omega = 2\\pi k/N = ${angTex((2 * PI * kk) / N)}$ rad/sample`} />
          {Math.abs(red - step) > 1e-9 && (
            <Read tone="warn" tex={`raw step $${piTex(step)}$ is outside $(-\\pi, \\pi]$: it looks like $${piTex(step)} ${step > 0 ? "-" : "+"} 2\\pi = ${piTex(red)}$ (aliasing)`} />
          )}
          <Read tone={dir.tone} tex={`apparent motion: ${dir.text}`} />
          {kk > 0 && kk !== N - kk && (
            <Read tex={`$k = ${kk}$ and $N - k = ${N - kk}$: $e^{${sTex}j2\\pi(${N - kk})n/${N}} = e^{${s < 0 ? "+" : "-"}j2\\pi(${kk})n/${N}}$ — same speed, **opposite** direction (conjugates)`} />
          )}
          <Read tex={`$z_{${tt}} = e^{j(${piTex(step)})(${tt})} = ${polarTex(1, principal(step * tt))} = ${cTex(z[tt])}$`} />
        </>
      }
      tasks={[
        "CA2 Q7: set $N = 8$, $k = 2$, minus sign. Predict direction and rate **before** pressing Play. (Clockwise, $\\pi/2$ rad/sample: $1, -j, -1, j$.)",
        "Keep $N = 8$ but set $k = 6$. Predict: clockwise or anticlockwise? Then compare with $k = 2$ and the **plus** sign.",
        "Set $k = N/2$. Which way does it spin? Why can't you tell?",
        "Try $N = 12$, $k = 4$: how many distinct dots appear, and why ($\\gcd(k, N)$)?",
      ]}
    />
  );
}

// ---------- 2. The DFT matrix as a grid of clocks ----------

function MatrixClocks() {
  const [N, setN] = useState<4 | 8>(8);
  const [k0, setK] = useState(3);
  const [n0, setNn] = useState(5);
  const k = Math.min(k0, N - 1), n = Math.min(n0, N - 1);
  const W = 420, M = 28;
  const S = (W - M - 6) / N;
  const H = M + N * S + 6;
  const rad = S * 0.36;
  const kn = (k * n) % N;
  const ang = (-2 * PI * kn) / N;
  const val = cexp(ang);
  const red = principal(ang);
  // row description
  let rowText: string;
  let rowTone: "good" | "warn" | undefined = undefined;
  if (k === 0) { rowText = "row 0 is **all ones** (DC): the hand never moves"; rowTone = "warn"; }
  else if (2 * k === N) { rowText = `row ${N / 2} alternates $1, -1, 1, -1, \\dots$ (half-turn per column)`; rowTone = "warn"; }
  else if (2 * k < N) { rowText = `row ${k} turns **clockwise** by $2\\pi k/N = ${piTex((2 * PI * k) / N)}$ per column`; rowTone = "good"; }
  else { rowText = `row ${k}: step $-${piTex((2 * PI * k) / N)} \\equiv +${piTex((2 * PI * (N - k)) / N)}$, so it **looks anticlockwise** — the conjugate of row ${N - k}`; rowTone = "warn"; }
  // inner products of row k with itself and with another row
  const other = (k + 1) % N;
  let self = 0;
  let cross: C = [0, 0];
  for (let c = 0; c < N; c++) {
    const a = cexp((-2 * PI * ((k * c) % N)) / N);
    const b = cexp((-2 * PI * ((other * c) % N)) / N);
    self += cabs(a) ** 2;
    cross = cadd(cross, cmul(a, conj(b)));
  }
  return (
    <VizFrame
      title="W as N × N clocks"
      hint="Each clock shows W[k, n] = e^(−j2πkn/N); the tick on the right marks angle 0 (the value 1). Click any clock to read it."
      onReset={() => { setN(8); setK(3); setNn(5); }}
      figure={
        <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img">
          <rect x={M} y={M + k * S} width={N * S} height={S} fill={cssColor("accent")} opacity={0.12} rx={4} />
          <rect x={M + n * S} y={M} width={S} height={N * S} fill={cssColor("eig")} opacity={0.07} rx={4} />
          <text x={4} y={14} className="viz-tick">k\n</text>
          {Array.from({ length: N }, (_, i) => (
            <g key={`h${i}`}>
              <text x={M + (i + 0.5) * S} y={M - 8} className="viz-tick" textAnchor="middle" fontWeight={i === n ? 700 : 400}>
                {i}
              </text>
              <text x={M - 8} y={M + (i + 0.5) * S + 4} className="viz-tick" textAnchor="end" fontWeight={i === k ? 700 : 400}>
                {i}
              </text>
            </g>
          ))}
          {Array.from({ length: N * N }, (_, idx) => {
            const r = Math.floor(idx / N), c = idx % N;
            const cx = M + (c + 0.5) * S, cy = M + (r + 0.5) * S;
            const a = (-2 * PI * ((r * c) % N)) / N;
            const hx = cx + rad * 0.85 * Math.cos(a), hy = cy - rad * 0.85 * Math.sin(a);
            const sel = r === k && c === n;
            const col = cssColor(r === k ? "dft" : "muted");
            return (
              <g key={idx} style={{ cursor: "pointer" }} onClick={() => { setK(r); setNn(c); }}>
                <rect x={cx - S / 2} y={cy - S / 2} width={S} height={S} fill="transparent" />
                <circle cx={cx} cy={cy} r={rad} fill="none" stroke={sel ? cssColor("accent") : "var(--border)"} strokeWidth={sel ? 2.5 : 1} />
                <line x1={cx + rad} x2={cx + rad + 3} y1={cy} y2={cy} stroke="var(--muted)" strokeWidth={1} />
                <line x1={cx} y1={cy} x2={hx} y2={hy} stroke={col} strokeWidth={r === k ? 2.2 : 1.4} strokeLinecap="round" />
                <circle cx={hx} cy={hy} r={r === k ? 2.6 : 1.8} fill={col} />
              </g>
            );
          })}
        </svg>
      }
      controls={
        <>
          <Choice value={N} onChange={setN} options={[{ v: 4, label: "$N = 4$" }, { v: 8, label: "$N = 8$" }]} />
          <Slider label="row $k$" value={k} min={0} max={N - 1} step={1} onChange={setK} />
          <Slider label="column $n$" value={n} min={0} max={N - 1} step={1} onChange={setNn} />
        </>
      }
      readout={
        <>
          <Read
            tex={`$W[${k}, ${n}] = e^{-j2\\pi\\cdot ${k}\\cdot ${n}/${N}}$${k * n >= N ? ` $= e^{-j2\\pi(${k * n} \\bmod ${N})/${N}} = e^{-j2\\pi\\cdot ${kn}/${N}}$` : ""}`}
          />
          <Read tone="good" tex={`$= ${polarTex(1, red)} = ${cTex(val, 3)}$ $\\ (${angTex(red)})$`} />
          <Read tone={rowTone} tex={rowText} />
          <Read tex={`symmetric: $W[${n}, ${k}] = W[${k}, ${n}]$ since $kn = nk$ (so $W^T = W$)`} />
          <Read tex={`$\\sum_n |W[${k}, n]|^2 = ${fmt(self)}$, $\\ \\sum_n W[${k}, n]\\overline{W[${other}, n]} = ${cTex(cross)}$`} />
          <Read tone="good" tex={`rows orthogonal, squared length $N$: $W^HW = ${N}I$, so $W^{-1} = \\tfrac{1}{${N}}W^H$ (not orthonormal!)`} />
        </>
      }
      tasks={[
        "Lesson example ($N = 8$): predict $W[3, 5]$ — reduce $15 \\bmod 8$ first. Click the clock to check ($e^{j\\pi/4}$).",
        "Click through row 1, then row $N - 1$. Predict how they compare before looking (same speed, opposite way: conjugates).",
        "Predict every entry of row $N/2$ before clicking it. Then compare column $N/2$ — why are they the same?",
        "Why is $W^HW = NI$ and not $I$? Use the readout: each row has $N$ entries of modulus 1. Where does that put the $\\tfrac1N$?",
      ]}
    />
  );
}

// ---------- 3. Analysis X = W x: live spectrum ----------

const N8 = 8;
type Preset = "impulse" | "const" | "cos1" | "cos2" | "alt" | "rand" | "custom";
const PRESETS: Record<Exclude<Preset, "rand" | "custom">, number[]> = {
  impulse: [1, 0, 0, 0, 0, 0, 0, 0],
  const: [1, 1, 1, 1, 1, 1, 1, 1],
  cos1: Array.from({ length: N8 }, (_, n) => Math.cos((2 * PI * n) / N8)),
  cos2: Array.from({ length: N8 }, (_, n) => Math.cos((2 * PI * 2 * n) / N8 + PI / 3)),
  alt: [1, -1, 1, -1, 1, -1, 1, -1],
};
const EXPECT: Partial<Record<Preset, string>> = {
  impulse: "impulse: $X[k] = 1$ for every $k$ — a **flat** spectrum",
  const: "constant: $X = [8, 0, \\dots, 0]$ — all in DC, $X[0] = N$",
  cos1: "$\\cos(2\\pi n/8)$: $X[1] = X[7] = NA/2 = 4$",
  cos2: "$\\cos(2\\pi\\cdot 2n/8 + \\pi/3)$: $X[2] = 4e^{j\\pi/3}$, $X[6] = 4e^{-j\\pi/3}$",
  alt: "alternating: only $X[4] = 8$ (row 4 of $W$ is $[1, -1, \\dots]$)",
};

function Spectrum() {
  const [x, setX] = useState<number[]>(PRESETS.cos2);
  const [preset, setPreset] = useState<Preset>("cos2");
  const [sel, setSel] = useState(2);
  const X = dft(x.map((v) => [v, 0] as C));
  const mags = X.map(cabs);
  const phases = X.map((v) => (cabs(v) > 1e-6 ? carg(v) : NaN));
  const mmax = Math.max(1, ...mags);
  const top = Math.ceil(mmax * 1.15);
  const sumx = x.reduce((a, b) => a + b, 0);
  const ex = x.reduce((a, b) => a + b * b, 0);
  const eX = mags.reduce((a, b) => a + b * b, 0);
  const pair = (N8 - sel) % N8;
  const choose = (p: Preset) => {
    setPreset(p);
    if (p === "rand") setX(Array.from({ length: N8 }, () => Math.round((Math.random() * 4 - 2) * 4) / 4));
    else if (p !== "custom") setX(PRESETS[p]);
  };
  const symErr = cabs(cadd(X[pair], cscale(conj(X[sel]), -1)));
  return (
    <VizFrame
      title="Analysis X = Wx: drag the signal, watch the spectrum"
      hint="Drag the stem tops of x[n] up/down (snaps to 0.25). Click a bin in the spectrum to inspect it."
      onReset={() => { choose("cos2"); setSel(2); }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <Plane2D x={[-0.6, 7.6]} y={[-2.4, 2.4]}>
            <Label2 at={[-0.6, 2.4]} text="x[n]" color="dft" dx={4} dy={14} />
            {x.map((v, n) => (
              <Seg2 key={`s${n}`} a={[n, 0]} b={[n, v]} color="dft" width={2.5} />
            ))}
            {x.map((v, n) => (
              <Handle2
                key={`h${n}`}
                at={[n, v]}
                step={0.25}
                color="dft"
                onChange={([, y]) => {
                  setPreset("custom");
                  setX((o) => o.map((u, i) => (i === n ? clamp(y, -2, 2) : u)));
                }}
              />
            ))}
          </Plane2D>
          <StemPlot
            count={N8}
            series={[{ vals: mags, color: "cx", label: "|X[k]|" }]}
            ymin={0}
            ymax={top}
            height={130}
            highlight={sel}
            onPick={setSel}
            xName="k"
            yTicks={[{ v: top, label: String(top) }, { v: top / 2, label: fmt(top / 2, 1) }]}
          />
          <StemPlot
            count={N8}
            series={[{ vals: phases, color: "eig", label: "∠X[k]" }]}
            ymin={-PI}
            ymax={PI}
            height={110}
            highlight={sel}
            onPick={setSel}
            xName="k"
            yTicks={[{ v: PI, label: "π" }, { v: -PI, label: "−π" }]}
          />
        </div>
      }
      controls={
        <>
          <Choice
            value={preset}
            onChange={choose}
            options={[
              { v: "impulse", label: "impulse" },
              { v: "const", label: "constant" },
              { v: "cos1", label: "$\\cos(2\\pi n/8)$" },
              { v: "cos2", label: "$\\cos(2\\pi\\cdot 2n/8 + \\pi/3)$" },
              { v: "alt", label: "$\\pm 1$" },
              { v: "rand", label: "random" },
            ]}
          />
          <Slider label="inspect bin $k$" value={sel} min={0} max={7} step={1} onChange={setSel} />
        </>
      }
      readout={
        <>
          {EXPECT[preset] && <Read label="expect" tex={EXPECT[preset]!} />}
          <Read tone="good" tex={`$X[0] = \\sum_n x[n] = ${fmt(sumx, 3)}$ (DC, no $\\tfrac1N$)`} />
          <Read tex={`$X[${sel}] = \\sum_n x[n]e^{-j2\\pi\\cdot ${sel}n/8} = ${cTex(X[sel], 3)} = ${expTex(X[sel])}$`} />
          {sel === 0 || sel === 4 ? (
            <Read tone="good" tex={`bin ${sel} is its own mirror ($N - k = ${pair}$), so $X[${sel}]$ is **real** for real $x$`} />
          ) : (
            <Read
              tone={symErr < 1e-6 ? "good" : "bad"}
              tex={`$X[${pair}] = ${cTex(X[pair], 3)}$ ${symErr < 1e-6 ? "=" : "\\ne"} $\\overline{X[${sel}]} = ${cTex(conj(X[sel]), 3)}$ — conjugate symmetry $X[N-k] = \\overline{X[k]}$ (real $x$)`}
            />
          )}
          <Read tone="good" tex={`Parseval: $\\sum_k |X[k]|^2 = ${fmt(eX, 3)} = N\\sum_n x[n]^2 = 8 \\times ${fmt(ex, 3)}$`} />
        </>
      }
      tasks={[
        "Predict $X$ for the impulse before clicking it. Then the constant: why is $X[0] = 8$ and not $1$? (Analysis has **no** $\\tfrac1N$.)",
        "Click $\\cos(2\\pi\\cdot 2n/8 + \\pi/3)$. Predict which bins light up, their size ($NA/2$) and their phases, then check bins 2 and 6.",
        "Drag any stems you like. Does $|X[3]| = |X[5]|$ survive? Does $\\angle X[5] = -\\angle X[3]$? Why must it, for real $x$?",
        "Move just $x[0]$ up by 1. Predict the change in **every** $X[k]$ (column 0 of $W$ is all ones).",
      ]}
    />
  );
}

// ---------- 4. Synthesis x = (1/N) Wᴴ X ----------

function Synthesis() {
  const N = N8;
  const init = {
    on: [false, true, false, false, false, false, false, true],
    mag: [8, 4, 4, 4, 4, 4, 4, 4],
    ph: [0, 0, 0, 0, 0, 0, 0, 0],
  };
  const [on, setOn] = useState(init.on);
  const [mag, setMag] = useState(init.mag);
  const [ph, setPh] = useState(init.ph);
  const [sel, setSel] = useState(1);
  const [lock, setLock] = useState(true);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  useTicker(playing, setT, N, 900);
  const tt = t % N;
  const mirror = (k: number) => (N - k) % N;
  const realPhase = (v: number) => (Math.abs(v) < PI / 2 ? 0 : PI);

  const updMag = (v: number) => {
    setMag((o) => o.map((m, i) => (i === sel || (lock && i === mirror(sel)) ? v : m)));
  };
  const updPh = (v: number) => {
    const self = mirror(sel) === sel;
    setPh((o) => o.map((p, i) => (i === sel ? (lock && self ? realPhase(v) : v) : lock && i === mirror(sel) ? -v : p)));
  };
  const toggle = (k: number) => {
    const val = !on[k];
    setOn((o) => o.map((b, i) => (i === k || (lock && i === mirror(k)) ? val : b)));
    setSel(k);
  };
  const setLocked = (v: boolean) => {
    setLock(v);
    if (!v) return;
    // enforce conjugate symmetry using bins 0..N/2 as the masters
    setOn((o) => o.map((b, i) => (i > N / 2 ? o[mirror(i)] : b)));
    setMag((o) => o.map((m, i) => (i > N / 2 ? o[mirror(i)] : m)));
    setPh((o) => o.map((p, i) => (i > N / 2 ? -o[mirror(i)] : i === 0 || i === N / 2 ? realPhase(p) : p)));
  };

  const X: C[] = on.map((b, k) => (b ? polar(mag[k], ph[k]) : [0, 0]));
  const x = idft(X);
  const maxIm = Math.max(...x.map((v) => Math.abs(v[1])));
  const isReal = maxIm < 1e-9;
  const broken = Array.from({ length: N }, (_, k) => k).filter((k) => k <= N / 2 && cabs(cadd(X[mirror(k)], cscale(conj(X[k]), -1))) > 1e-9);
  // contributions at the current sample
  const active = on.map((b, k) => (b ? k : -1)).filter((k) => k >= 0);
  const contrib = active.map((k) => ({ k, c: cscale(cmul(X[k], cexp((2 * PI * ((k * tt) % N)) / N)), 1 / N) }));
  const chain: { from: C; to: C; k: number }[] = [];
  let cur: C = [0, 0];
  for (const { k, c } of contrib) {
    const nxt = cadd(cur, c);
    chain.push({ from: cur, to: nxt, k });
    cur = nxt;
  }
  const total = contrib.reduce((s, q) => s + cabs(q.c), 0);
  const E = Math.max(1.2, total * 1.15);
  const ymax = Math.max(1, ...x.map((v) => Math.max(Math.abs(v[0]), Math.abs(v[1]))), ...active.map((k) => mag[k] / N)) * 1.15;
  const curves = active.map((k) => {
    const kt = k > N / 2 ? k - N : k; // smoothest continuous representative
    return { f: (s: number) => (mag[k] / N) * Math.cos((2 * PI * kt * s) / N + ph[k]), color: "cx" as VizColor };
  });
  const selMag = on[sel] ? mag[sel] : 0;
  const selDir = sel === 0 ? "constant (DC)" : 2 * sel === N ? "alternating $\\pm$" : 2 * sel < N ? `anticlockwise at $${piTex((2 * PI * sel) / N)}$ rad/sample` : `visually clockwise at $${piTex((2 * PI * (N - sel)) / N)}$ rad/sample (same as $k = ${sel - N}$)`;
  return (
    <VizFrame
      title="Synthesis x = (1/N)WᴴX: adding spinning phasors"
      hint="Top: for the current sample n, each active bin adds a phasor (1/N)·X[k]·e^(j2πkn/N), head to tail; the dashed drop shows Re x[n]. Bottom: faint curves = each bin's real part, stems = x[n]."
      onReset={() => { setOn(init.on); setMag(init.mag); setPh(init.ph); setSel(1); setLock(true); setT(0); setPlaying(false); }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <Plane2D x={[-E, E]} y={[-0.75 * E, 0.75 * E]} grid={E <= 2 ? 0.5 : E <= 5 ? 1 : 2} labels={false}>
            <Circle2 r={1} />
            {chain.map((s) => (
              <Arrow2 key={s.k} from={s.from} to={s.to} color={s.k === sel ? "eig" : "cx"} width={2} />
            ))}
            {chain.map((s) => (
              <Label2 key={`l${s.k}`} at={[(s.from[0] + s.to[0]) / 2, (s.from[1] + s.to[1]) / 2]} text={String(s.k)} color={s.k === sel ? "eig" : "cx"} dx={4} dy={-4} />
            ))}
            <Seg2 a={cur} b={[cur[0], 0]} color={isReal ? "muted" : "warn"} dashed />
            <Dot2 at={[cur[0], 0]} color="dft" r={4} />
            <Dot2 at={cur} color={isReal ? "dft" : "warn"} r={6} label={`x[${tt}]`} />
          </Plane2D>
          <StemPlot
            count={N}
            curves={curves}
            series={[
              { vals: x.map((v) => v[0]), color: "dft", label: "Re x[n]" },
              ...(isReal ? [] : [{ vals: x.map((v) => v[1]), color: "warn" as VizColor, label: "Im x[n]" }]),
            ]}
            ymin={-ymax}
            ymax={ymax}
            height={150}
            highlight={tt}
            yTicks={[{ v: ymax / 1.15, label: fmt(ymax / 1.15) }, { v: -ymax / 1.15, label: fmt(-ymax / 1.15) }]}
          />
        </div>
      }
      controls={
        <>
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <span className="small muted">bins on:</span>
            {on.map((b, k) => (
              <button key={k} className={`chip ${b ? "on" : ""}`} onClick={() => toggle(k)}>
                X[{k}]
              </button>
            ))}
          </div>
          <div className="row" style={{ gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span className="small muted">edit</span>
            <Choice value={sel} onChange={setSel} options={Array.from({ length: N }, (_, k) => ({ v: k, label: String(k) }))} />
          </div>
          <Slider label={`$|X[${sel}]|$`} value={mag[sel]} min={0} max={8} step={0.5} onChange={updMag} />
          <Slider label={`$\\angle X[${sel}]$`} value={ph[sel]} min={-PI} max={PI} step={PI / 12} onChange={updPh} format={(v) => `${fmt(v / PI, 3)}π`} />
          <Toggle label="Lock conjugate pairs $X[N-k] = \overline{X[k]}$" value={lock} onChange={setLocked} />
          <Transport playing={playing} setPlaying={setPlaying} onStep={() => setT((v) => (v + 1) % N)} onRestart={() => setT(0)} />
        </>
      }
      readout={
        <>
          <Read tex={`$x[n] = \\dfrac{1}{N}\\sum_{k} X[k]\\,e^{+j2\\pi kn/N}$, i.e. $x = \\tfrac18 W^HX$`} />
          <Read tex={`$X = [${X.map((v) => cTex(v, 1)).join(",\\ ")}]^T$`} />
          <Read
            tex={`bin ${sel}: $X[${sel}] = ${on[sel] ? polarTex(selMag, principal(ph[sel])) : "0"}$ → phasor of length $|X[${sel}]|/N = ${fmt(selMag / N, 3)}$, ${selDir}`}
          />
          <Read tex={`$x[${tt}] = \\tfrac18\\big(${contrib.length ? contrib.map((q) => `X[${q.k}]e^{j2\\pi\\cdot ${q.k}\\cdot ${tt}/8}`).join(" + ") : "0"}\\big) = ${cTex(x[tt], 3)}$`} />
          {isReal ? (
            <Read tone="good" tex="every bin has its conjugate partner → $x$ is **real** (the imaginary parts cancel in pairs)" />
          ) : (
            <Read
              tone="warn"
              tex={`$x$ is **complex**: $\\max_n|\\operatorname{Im} x[n]| = ${fmt(maxIm, 3)}$. Pair broken at $k = ${broken.join(", ")}$: $X[N-k] \\ne \\overline{X[k]}$`}
            />
          )}
        </>
      }
      tasks={[
        "Predict: with $X[1] = X[7] = 4$, what is $x[n]$? Check the stems: $\\cos(2\\pi n/8)$ with amplitude $2\\cdot 4/8 = 1$.",
        "Untick the lock, then switch off $X[7]$. Predict $x$ before looking: one lonely phasor — how big, and is it real?",
        "Turn everything off except $X[0]$ with $|X[0]| = 8$. Predict $x[n]$ (forgetting the $\\tfrac1N$ gives 8, the truth is 1).",
        "Locked: put $X[2]$ on with phase $\\pi/3$. Which real signal is this? (Compare with the spectrum figure's preset.) Then press Play and watch phasors 2 and 6 cancel each other's imaginary parts.",
      ]}
    />
  );
}
