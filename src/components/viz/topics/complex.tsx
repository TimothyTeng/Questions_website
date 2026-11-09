"use client";

import { useState } from "react";
import { Choice, Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Arrow2, Circle2, Dot2, Handle2, Label2, Plane2D, Poly2, Seg2 } from "../Plane2D";
import { add, fmt, type V2 } from "../vec";

export default function ComplexVisual({ id }: { id: string }) {
  switch (id) {
    case "argand":
      return <Argand />;
    case "multiply":
      return <Multiply />;
    case "de-moivre":
      return <DeMoivre />;
    case "nth-roots":
      return <NthRoots />;
    case "quadratic-roots":
      return <QuadraticRoots />;
    default:
      return null;
  }
}

// ---------- complex helpers (a complex number is [re, im]) ----------

type C = V2;
const PI = Math.PI;
const cmul = (p: C, q: C): C => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
const cdiv = (p: C, q: C): C | null => {
  const d = q[0] * q[0] + q[1] * q[1];
  if (d < 1e-12) return null;
  return [(p[0] * q[0] + p[1] * q[1]) / d, (p[1] * q[0] - p[0] * q[1]) / d];
};
const cabs = (p: C) => Math.hypot(p[0], p[1]);
const polar = (r: number, t: number): C => [r * Math.cos(t), r * Math.sin(t)];

/** Reduce an angle into the principal interval (−π, π]. */
function principal(t: number): number {
  let r = ((((t + PI) % (2 * PI)) + 2 * PI) % (2 * PI)) - PI; // [−π, π)
  if (r <= -PI + 1e-9) r = PI;
  return r;
}
/** Principal argument; atan2(±0, negative) is forced to +π. */
const carg = (p: C) => principal(Math.atan2(p[1] + 0, p[0]));

/** Angle as a multiple of π (a fraction when it is a nice one). */
function piTex(t: number): string {
  if (Math.abs(t) < 1e-9) return "0";
  const q = t / PI;
  for (let d = 1; d <= 12; d++) {
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
const degTex = (t: number) => `${fmt((t * 180) / PI, 1)}^\\circ`;
const angTex = (t: number) => `${piTex(t)}\\ (${degTex(t)})`;

/** a + bj in rectangular form. */
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
/** r e^{jθ} with θ already chosen by the caller. */
function polarTex(r: number, t: number, dp = 2): string {
  if (r < 1e-12) return "0";
  const R = Math.abs(r - 1) < 1e-9 ? "" : fmt(r, dp);
  if (Math.abs(t) < 1e-9) return `${R || "1"}e^{j0}`;
  return t < 0 ? `${R}e^{-j${piTex(-t)}}` : `${R}e^{j${piTex(t)}}`;
}
const expTex = (z: C, dp = 2) => polarTex(cabs(z), carg(z), dp);

/** Arc points from angle t1 to t2 (no shortest-path wrapping). */
function arc(t1: number, t2: number, r: number, n = 40): V2[] {
  return Array.from({ length: n + 1 }, (_, i) => polar(r, t1 + ((t2 - t1) * i) / n));
}

function quadrant([a, b]: C): string {
  const e = 1e-9;
  if (Math.abs(a) < e && Math.abs(b) < e) return "the origin";
  if (Math.abs(b) < e) return a > 0 ? "the positive real axis" : "the negative real axis";
  if (Math.abs(a) < e) return b > 0 ? "the positive imaginary axis" : "the negative imaginary axis";
  if (a > 0) return b > 0 ? "quadrant I" : "quadrant IV";
  return b > 0 ? "quadrant II" : "quadrant III";
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number) => String(n).split("").map((d) => SUP[Number(d)]).join("");
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const sub = (n: number) => String(n).split("").map((d) => SUB[Number(d)]).join("");

function Presets({ items }: { items: { label: string; on: () => void }[] }) {
  return (
    <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
      {items.map((it) => (
        <button key={it.label} className="btn small" onClick={it.on}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

// ---------- 1. Argand diagram ----------

function Argand() {
  const init: C = [3, 2];
  const [z, setZ] = useState<C>(init);
  const [showConj, setShowConj] = useState(true);
  const [showNeg, setShowNeg] = useState(false);
  const [a, b] = z;
  const r = cabs(z);
  const zero = r < 1e-9;
  const th = carg(z);
  const naive = Math.abs(a) > 1e-9 ? Math.atan(b / a) : null;
  const differs = !zero && naive !== null && Math.abs(naive - th) > 1e-6;
  const zb: C = [a, -b];
  const nz: C = [-a, -b];
  const fix = th > 0 ? "+\\pi" : "-\\pi";
  return (
    <VizFrame
      title="Argand diagram: modulus, argument, conjugate"
      hint="Drag z (snaps to 0.25) or type its parts. Orange arc = Arg z, dashed circle has radius |z|."
      onReset={() => { setZ(init); setShowConj(true); setShowNeg(false); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          <Label2 at={[4.2, 0]} text="Re" color="muted" dx={0} dy={-6} />
          <Label2 at={[0, 3.6]} text="Im" color="muted" dx={6} dy={4} />
          {!zero && <Circle2 r={r} />}
          {!zero && <Poly2 pts={arc(0, th, Math.min(0.8, r))} color="warn" width={2} />}
          <Seg2 a={z} b={[a, 0]} dashed />
          <Seg2 a={z} b={[0, b]} dashed />
          {showConj && !zero && <Seg2 a={z} b={zb} color="eig" dashed width={1} />}
          {showConj && <Arrow2 to={zb} color="eig" dashed label="z̄" />}
          {differs && naive !== null && <Arrow2 to={polar(r, naive)} color="warn" dashed width={1.5} />}
          {differs && <Label2 at={nz} text="tan⁻¹(b/a)" color="warn" dy={showNeg ? -8 : -8} dx={-70} />}
          {showNeg && <Arrow2 to={nz} color="muted" width={2} />}
          {showNeg && <Label2 at={nz} text="−z" color="muted" dy={18} />}
          <Arrow2 to={z} color="cx" />
          <Handle2 at={z} onChange={setZ} step={0.25} color="cx" label="z" />
        </Plane2D>
      }
      controls={
        <>
          <VecInput label="$z = a + bj$:" value={z} step={0.25} onChange={(v) => setZ([v[0], v[1]])} />
          <Toggle label="Show conjugate $\bar z$" value={showConj} onChange={setShowConj} />
          <Toggle label="Show $-z$" value={showNeg} onChange={setShowNeg} />
          <Presets
            items={[
              { label: "−√3 + j", on: () => setZ([-Math.sqrt(3), 1]) },
              { label: "−2 − 2j", on: () => setZ([-2, -2]) },
              { label: "−3", on: () => setZ([-3, 0]) },
              { label: "3 − 4j", on: () => setZ([3, -4]) },
            ]}
          />
        </>
      }
      readout={
        zero ? (
          <Read tone="warn" tex="$z = 0$: modulus 0 and the argument is **undefined** (no direction). Drag $z$ away from the origin." />
        ) : (
          <>
            <Read tex={`$z = ${cTex(z)}$ lies in ${quadrant(z)}`} />
            <Read tex={`$|z| = \\sqrt{(${fmt(a)})^2 + (${fmt(b)})^2} = ${fmt(r, 3)}$`} />
            {naive === null ? (
              <Read tone="warn" tex={`$\\tan^{-1}(b/a)$: $a = 0$ so $b/a$ is undefined — read the angle off the picture: $\\pm\\pi/2$`} />
            ) : (
              <Read
                tone={differs ? "warn" : undefined}
                tex={`$\\tan^{-1}\\!\\left(\\frac{${fmt(b)}}{${fmt(a)}}\\right) = ${angTex(naive)}$${differs ? ` — **wrong quadrant**: that is the angle of $-z$. Fix: $${piTex(naive)} ${fix} = ${piTex(th)}$` : " ✓ (a > 0, so arctan is safe)"}`}
              />
            )}
            <Read tone="good" tex={`$\\operatorname{Arg} z = \\operatorname{atan2}(b, a) = ${angTex(th)} \\in (-\\pi, \\pi]$`} />
            <Read tex={`$z = ${polarTex(r, th)} = ${fmt(r)}\\left(\\cos ${piTex(th)} + j\\sin ${piTex(th)}\\right)$`} />
            {showConj && <Read tex={`$\\bar z = ${cTex(zb)} = ${expTex(zb)}$ (mirror in the real axis: same $r$, angle negated)`} />}
            {showNeg && <Read tex={`$-z = ${cTex(nz)} = ${expTex(nz)}$ (angle shifted by $\\pi$)`} />}
            <Read tone="good" tex={`$z\\bar z = (${fmt(a)})^2 + (${fmt(b)})^2 = ${fmt(r * r)} = |z|^2$ — always real`} />
          </>
        )
      }
      tasks={[
        "Predict, then check: what is $\\operatorname{Arg}(-\\sqrt3 + j)$? Press the preset. Does $\\tan^{-1}(b/a)$ agree?",
        "Drag $z$ to $-2-2j$. Is the principal argument $5\\pi/4$ or $-3\\pi/4$? Explain using $(-\\pi, \\pi]$.",
        "Put $z$ on the negative real axis. Is $\\operatorname{Arg} z = \\pi$ or $-\\pi$? Now drag just above and just below it — watch the jump.",
        "Predict $z\\bar z$ for $z = 3 - 4j$ before pressing the preset. Turn on $-z$: why does the orange $\\tan^{-1}$ arrow always point at $-z$ when $a < 0$?",
      ]}
    />
  );
}

// ---------- 2. Multiplication = scale and rotate ----------

function Multiply() {
  const init = { z1: [2, 1] as C, z2: [1, 1.5] as C };
  const [z1, setZ1] = useState<C>(init.z1);
  const [z2, setZ2] = useState<C>(init.z2);
  const [showQ, setShowQ] = useState(false);
  const [showS, setShowS] = useState(false);
  const r1 = cabs(z1), r2 = cabs(z2);
  const t1 = carg(z1), t2 = carg(z2);
  const p = cmul(z1, z2);
  const q = cdiv(z1, z2);
  const s = add(z1, z2);
  const raw = t1 + t2;
  const red = principal(raw);
  const rawQ = t1 - t2;
  const redQ = principal(rawQ);
  const off = (w: C) => Math.abs(w[0]) > 6 || Math.abs(w[1]) > 5;
  const zero = r1 < 1e-9 || r2 < 1e-9;
  return (
    <VizFrame
      title="Multiplying = scale lengths, add angles"
      hint="Drag z₁ (blue) and z₂ (purple). The orange arrow is z₁z₂. Arcs: θ₁ then θ₂ stacked on top of it."
      onReset={() => { setZ1(init.z1); setZ2(init.z2); setShowQ(false); setShowS(false); }}
      figure={
        <Plane2D x={[-6, 6]} y={[-5, 5]}>
          <Circle2 r={1} />
          {!zero && <Poly2 pts={arc(0, t1, 0.7)} color="accent" width={2} />}
          {!zero && <Poly2 pts={arc(t1, t1 + t2, 1.1)} color="eig" width={2} />}
          {showS && (
            <>
              <Seg2 a={z1} b={s} dashed />
              <Seg2 a={z2} b={s} dashed />
              <Arrow2 to={s} color="good" width={2} label="z₁+z₂" />
            </>
          )}
          {showQ && q && <Arrow2 to={q} color="bad" width={2} label="z₁/z₂" />}
          <Arrow2 to={p} color="cx" width={3.5} label="z₁z₂" />
          <Arrow2 to={z1} color="accent" />
          <Arrow2 to={z2} color="eig" />
          <Handle2 at={z1} onChange={setZ1} label="z₁" />
          <Handle2 at={z2} onChange={setZ2} color="eig" label="z₂" />
        </Plane2D>
      }
      controls={
        <>
          <Presets
            items={[
              { label: "z₂ = j", on: () => setZ2([0, 1]) },
              { label: "z₂ = −1", on: () => setZ2([-1, 0]) },
              { label: "z₂ = e^(jπ/4)", on: () => setZ2(polar(1, PI / 4)) },
              { label: "z₂ = 2", on: () => setZ2([2, 0]) },
            ]}
          />
          <Toggle label="Show quotient $z_1/z_2$ (red)" value={showQ} onChange={setShowQ} />
          <Toggle label="Show sum $z_1 + z_2$ (green parallelogram)" value={showS} onChange={setShowS} />
        </>
      }
      readout={
        zero ? (
          <Read tone="warn" tex="One factor is $0$, so the product is $0$ and angles are undefined. Drag both away from the origin." />
        ) : (
          <>
            <Read tex={`$z_1 = ${cTex(z1)} = ${polarTex(r1, t1)}$`} />
            <Read tex={`$z_2 = ${cTex(z2)} = ${polarTex(r2, t2)}$`} />
            <Read tex={`$z_1z_2 = (${fmt(z1[0])})(${fmt(z2[0])}) - (${fmt(z1[1])})(${fmt(z2[1])}) + \\big[(${fmt(z1[0])})(${fmt(z2[1])}) + (${fmt(z1[1])})(${fmt(z2[0])})\\big]j = ${cTex(p)}$`} />
            <Read tone="good" tex={`lengths multiply: $|z_1z_2| = ${fmt(r1)} \\times ${fmt(r2)} = ${fmt(r1 * r2)}$`} />
            <Read
              tone={Math.abs(raw - red) > 1e-9 ? "warn" : "good"}
              tex={`angles add: $\\theta_1 + \\theta_2 = ${piTex(t1)} + (${piTex(t2)}) = ${piTex(raw)}$${Math.abs(raw - red) > 1e-9 ? ` — outside $(-\\pi, \\pi]$, so ${raw > 0 ? "subtract" : "add"} $2\\pi$: $\\operatorname{Arg} = ${piTex(red)}$` : ""}`}
            />
            <Read tex={`$z_1z_2 = ${polarTex(r1 * r2, red)}$${off(p) ? " (off-screen)" : ""}`} />
            {showQ &&
              (q ? (
                <Read tex={`$\\dfrac{z_1}{z_2} = \\dfrac{${fmt(r1)}}{${fmt(r2)}}e^{j(${piTex(t1)} - (${piTex(t2)}))} = ${polarTex(r1 / r2, redQ)} = ${cTex(q)}$${Math.abs(rawQ - redQ) > 1e-9 ? ` (angle reduced from $${piTex(rawQ)}$)` : ""}`} />
              ) : (
                <Read tone="warn" tex="$z_2 = 0$: division undefined" />
              ))}
            {showS && <Read tex={`$z_1 + z_2 = ${cTex(s)}$: add in **rectangular** form. $|z_1+z_2| = ${fmt(cabs(s))} \\le |z_1|+|z_2| = ${fmt(r1 + r2)}$`} />}
          </>
        )
      }
      tasks={[
        "Predict: press $z_2 = j$. Where does $z_1z_2$ go relative to $z_1$? (Same length, turned $90^\\circ$ anticlockwise: $\\times j$ is a quarter-turn.)",
        "Press $z_2 = e^{j\\pi/4}$: a pure rotation. Then $z_2 = 2$: a pure stretch. Now explain a general $z_2$ in those two words.",
        "Drag both into quadrant II. The angles add past $\\pi$ — reduce the sum into $(-\\pi, \\pi]$ yourself before reading it.",
        "Show the sum. Keep $|z_1|$ and $|z_2|$ fixed but change the angle between them: which of $|z_1z_2|$ and $|z_1 + z_2|$ changes?",
      ]}
    />
  );
}

// ---------- 3. De Moivre: powers spiral ----------

function DeMoivre() {
  const init: C = [0.9, 0.5];
  const [z, setZ] = useState<C>(init);
  const [n, setN] = useState(5);
  const [R, setR] = useState<2 | 6 | 40>(2);
  const [dirOnly, setDirOnly] = useState(false);
  const r = cabs(z);
  const th = carg(z);
  const zero = r < 1e-9;
  const rn = r ** n;
  const raw = n * th;
  const red = principal(raw);
  const m = Math.round((raw - red) / (2 * PI));
  const zn = polar(rn, red);
  const isReal = !zero && Math.abs(Math.sin(red)) < 1e-6;
  const pos = (k: number): C => polar(dirOnly ? 1 : r ** k, k * th);
  const spiral: V2[] = [];
  for (let i = 0; i <= n * 24; i++) spiral.push(pos(i / 24));
  const arcPts: V2[] = Array.from({ length: 121 }, (_, i) => {
    const t = (raw * i) / 120;
    return polar(R * (0.08 + (0.03 * Math.abs(t)) / (2 * PI)), t);
  });
  const step = R === 2 ? 0.05 : R === 6 ? 0.1 : 1;
  return (
    <VizFrame
      title="De Moivre: zⁿ spirals out (or in)"
      hint="Drag z. Dots are z⁰ = 1, z¹, z², …, zⁿ. Orange spiral = the total angle nθ (it can wind several times)."
      onReset={() => { setZ(init); setN(5); setR(2); setDirOnly(false); }}
      figure={
        <Plane2D x={[-R, R]} y={[-R, R]} grid={R === 2 ? 0.5 : R === 6 ? 1 : 10} labels={R !== 2}>
          <Circle2 r={1} />
          {!zero && !dirOnly && <Circle2 r={rn} color="cx" />}
          {!zero && <Poly2 pts={spiral} color="muted" width={1.2} />}
          {!zero && <Poly2 pts={arcPts} color="warn" width={1.5} />}
          {!zero &&
            Array.from({ length: n + 1 }, (_, k) => (
              <Dot2 key={k} at={pos(k)} color={k === n ? "cx" : "muted"} r={k === n ? 5 : 3.5} />
            ))}
          {!zero && <Arrow2 to={pos(n)} color="cx" width={3} label={`z${sup(n)}`} />}
          <Arrow2 to={dirOnly && !zero ? pos(1) : z} color="accent" />
          <Handle2 at={z} onChange={setZ} step={step} label="z" />
        </Plane2D>
      }
      controls={
        <>
          <Slider label="power $n$" value={n} min={1} max={12} step={1} onChange={setN} />
          <div className="row" style={{ gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span className="small muted">View</span>
            <Choice value={R} onChange={setR} options={[{ v: 2, label: "±2" }, { v: 6, label: "±6" }, { v: 40, label: "±40" }]} />
          </div>
          <Toggle label="Directions only (put every power on the unit circle)" value={dirOnly} onChange={setDirOnly} />
          <Presets
            items={[
              { label: "z = 1 + j", on: () => { setZ([1, 1]); setR(6); } },
              { label: "z = 1 + √3 j, n = 5", on: () => { setZ([1, Math.sqrt(3)]); setN(5); setR(40); } },
              { label: "z = e^(j2π/5)", on: () => { setZ(polar(1, (2 * PI) / 5)); setR(2); } },
            ]}
          />
        </>
      }
      readout={
        zero ? (
          <Read tone="warn" tex="$z = 0$: every power is $0$. Drag $z$ away from the origin." />
        ) : (
          <>
            <Read tex={`$z = ${cTex(z)} = ${polarTex(r, th)}$, $\\ r = ${fmt(r, 3)},\\ \\theta = ${angTex(th)}$`} />
            <Read tex={`$z^{${n}} = r^{${n}}e^{j\\,${n}\\theta} = (${fmt(r, 3)})^{${n}}\\,e^{j\\cdot ${n}\\cdot(${piTex(th)})} = ${fmt(rn, 3)}\\,e^{j(${piTex(raw)})}$`} />
            <Read
              tone={m !== 0 ? "warn" : undefined}
              tex={m !== 0 ? `reduce: $${piTex(raw)} ${m > 0 ? "-" : "+"} ${Math.abs(m) === 1 ? "" : Math.abs(m)}(2\\pi) = ${angTex(red)}$ (wound ${Math.abs(m)} extra turn${Math.abs(m) > 1 ? "s" : ""})` : `$n\\theta = ${angTex(red)}$ is already in $(-\\pi, \\pi]$`}
            />
            <Read tone="good" tex={`$z^{${n}} = ${polarTex(rn, red)} = ${cTex(zn)}$`} />
            <Read tex={`$|z^{${n}}| = |z|^{${n}}$: ${r > 1 + 1e-9 ? "$|z| > 1$, spiral grows" : r < 1 - 1e-9 ? "$|z| < 1$, spiral shrinks to 0" : "$|z| = 1$, stays on the unit circle"}`} />
            {isReal && <Read tone="good" tex={`$z^{${n}}$ is **real** (${Math.cos(red) > 0 ? "positive" : "negative"}): $n\\theta$ is a multiple of $\\pi$`} />}
            {!dirOnly && (Math.abs(zn[0]) > R || Math.abs(zn[1]) > R) && <Read tone="warn" tex="$z^n$ is off-screen: zoom out or tick 'Directions only'." />}
          </>
        )
      }
      tasks={[
        "Predict, then check: with $z = 1 + j = \\sqrt2e^{j\\pi/4}$, which smallest $n$ makes $z^n$ a negative real number? What is it?",
        "Lesson example: press $1 + \\sqrt3j,\\ n = 5$. Reduce $5\\pi/3$ into $(-\\pi, \\pi]$ before reading the answer $16 - 16\\sqrt3 j$.",
        "Find a $z$ with $z^n = 1$ for your chosen $n$ (hint: $|z| = 1$ and $\\theta = 2\\pi/n$ — try the $e^{j2\\pi/5}$ preset with $n = 5$).",
        "Move $z$ slightly into quadrant II. A small error in $\\theta$ gets multiplied by $n$ — watch how far $z^{12}$ moves. Why does a quadrant mistake ruin a power question?",
      ]}
    />
  );
}

// ---------- 4. n-th roots ----------

const CA2W: C = [2 * Math.SQRT2, 0];

function NthRoots() {
  const init: C = [0, 2];
  const [w, setW] = useState<C>(init);
  const [n, setN] = useState(3);
  const R = cabs(w);
  const phi = carg(w);
  const zero = R < 1e-9;
  const rho = R ** (1 / n);
  const roots = Array.from({ length: n }, (_, k) => {
    const raw = (phi + 2 * PI * k) / n;
    return { k, raw, red: principal(raw), z: polar(rho, raw) };
  });
  const sum = roots.reduce<C>((s, q) => add(s, q.z), [0, 0]);
  const isCA2 = n === 2 && Math.abs(w[0] - CA2W[0]) < 1e-6 && Math.abs(w[1]) < 1e-6;
  const offW = Math.abs(w[0]) > 4 || Math.abs(w[1]) > 4;
  return (
    <VizFrame
      title="n-th roots: a regular polygon"
      hint="Drag w (snaps to 0.25) or type it; change n. Green = principal root z₀ (k = 0)."
      onReset={() => { setW(init); setN(3); }}
      figure={
        <Plane2D x={[-4, 4]} y={[-4, 4]}>
          {!zero && <Circle2 r={R} />}
          {!zero && <Circle2 r={rho} color="cx" />}
          {!zero && <Poly2 pts={arc(0, phi, 0.5)} color="accent" width={2} />}
          {!zero && <Poly2 pts={arc(0, phi / n, 0.85)} color="good" width={2} />}
          {!zero && n > 2 && <Poly2 pts={roots.map((q) => q.z)} color="cx" closed width={1.5} />}
          {!zero && n === 2 && <Seg2 a={roots[0].z} b={roots[1].z} color="cx" />}
          {!zero && roots.map((q) => <Seg2 key={`s${q.k}`} a={[0, 0]} b={q.z} dashed width={1} />)}
          {!zero &&
            roots.map((q) => (
              <Dot2 key={q.k} at={q.z} color={q.k === 0 ? "good" : "cx"} r={q.k === 0 ? 6 : 4.5} label={`z${sub(q.k)}`} />
            ))}
          <Arrow2 to={w} color="accent" width={2} />
          <Handle2 at={w} onChange={setW} step={0.25} label="w" />
        </Plane2D>
      }
      controls={
        <>
          <Slider label="$n$" value={n} min={2} max={8} step={1} onChange={setN} />
          <VecInput label="$w$:" value={w} step={0.25} onChange={(v) => setW([v[0], v[1]])} />
          <Presets
            items={[
              { label: "CA2: (2e^(jπ/4)(1−j))^½", on: () => { setW(CA2W); setN(2); } },
              { label: "−16, n = 4", on: () => { setW([-16, 0]); setN(4); } },
              { label: "8j, n = 3", on: () => { setW([0, 8]); setN(3); } },
              { label: "1, n = 6 (roots of unity)", on: () => { setW([1, 0]); setN(6); } },
            ]}
          />
        </>
      }
      readout={
        zero ? (
          <Read tone="warn" tex="$w = 0$: the only root is $0$ (repeated). Drag $w$ away from the origin." />
        ) : (
          <>
            {isCA2 && <Read tone="good" tex="CA2: $2e^{j\pi/4}(1-j) = 2e^{j\pi/4}\cdot\sqrt2e^{-j\pi/4} = 2\sqrt2\,e^{j0} \approx 2.83$ — a positive real!" />}
            <Read tex={`$w = ${cTex(w)} = ${polarTex(R, phi)}$${offW ? " (off-screen)" : ""}`} />
            <Read tex={`every root has modulus $|w|^{1/${n}} = ${fmt(R, 3)}^{1/${n}} = ${fmt(rho, 3)}$ (not $|w|/${n} = ${fmt(R / n, 3)}$)`} />
            <Read tex={`angles $\\dfrac{\\phi + 2\\pi k}{n} = \\dfrac{${piTex(phi)}}{${n}} + k\\cdot ${piTex((2 * PI) / n)}$, $\\ k = 0, \\dots, ${n - 1}$`} />
            {roots.map((q) => (
              <Read
                key={q.k}
                tone={q.k === 0 ? "good" : undefined}
                tex={`$z_{${q.k}} = ${polarTex(rho, q.red)} = ${cTex(q.z)}$${q.k === 0 ? " (principal)" : Math.abs(q.raw - q.red) > 1e-9 ? ` $\\ (${piTex(q.raw)} \\equiv ${piTex(q.red)})$` : ""}`}
              />
            ))}
            {isCA2 && <Read tone="good" tex={`so $z = \\pm (2\\sqrt2)^{1/2} = \\pm 2^{3/4} \\approx \\pm ${fmt(rho)}$ — **two** values`} />}
            <Read tone="good" tex={`$\\sum_k z_k = ${cTex(sum, 3)}$ (vertices of a regular ${n}-gon balance out)`} />
          </>
        )
      }
      tasks={[
        "CA2: press the preset. Predict first — how many values does $(2e^{j\\pi/4}(1-j))^{1/2}$ have, and why is the base real?",
        "Press $-16,\\ n = 4$. Predict the modulus and the four angles, then check: $\\pm\\sqrt2 \\pm \\sqrt2j$.",
        "Increase $n$ with $w$ fixed. Does the small circle shrink like $|w|/n$ or like $|w|^{1/n}$? (Watch it for $|w| < 1$ too.)",
        "Drag $w$ slowly around the origin. The principal root $z_0$ jumps when $w$ crosses the negative real axis — why? Do the *set* of roots jump?",
      ]}
    />
  );
}

// ---------- 5. Roots of a real quadratic ----------

function polyTex(a: number, b: number, c: number): string {
  const term = (coef: number, v: string, first: boolean) => {
    if (Math.abs(coef) < 1e-9) return "";
    const sign = coef < 0 ? "-" : first ? "" : "+";
    const mag = Math.abs(coef);
    const body = v && Math.abs(mag - 1) < 1e-9 ? "" : fmt(mag, 3);
    return ` ${sign} ${body}${v}`;
  };
  const t1 = term(a, "x^2", true);
  const t2 = term(b, "x", !t1);
  const t3 = term(c, "", !t1 && !t2);
  return (t1 + t2 + t3).trim() || "0";
}

function QuadraticRoots() {
  const [mode, setMode] = useState<"tut" | "gen">("tut");
  const [cT, setCT] = useState(-2);
  const [ga, setGA] = useState(1);
  const [gb, setGB] = useState(-2);
  const [gc, setGC] = useState(5);
  const a = mode === "tut" ? -2 : ga;
  const b = mode === "tut" ? 3 : gb;
  const c = mode === "tut" ? -cT : gc;
  const lin = Math.abs(a) < 1e-9;
  const D = b * b - 4 * a * c;
  const kind = lin ? "lin" : Math.abs(D) < 1e-9 ? "rep" : D > 0 ? "real" : "cx";
  let roots: C[] = [];
  if (lin) roots = Math.abs(b) > 1e-9 ? [[-c / b, 0]] : [];
  else if (kind === "real") roots = [[(-b + Math.sqrt(D)) / (2 * a), 0], [(-b - Math.sqrt(D)) / (2 * a), 0]];
  else if (kind === "rep") roots = [[-b / (2 * a), 0]];
  else {
    const re = -b / (2 * a), im = Math.sqrt(-D) / (2 * Math.abs(a));
    roots = [[re, im], [re, -im]];
  }
  const curve: V2[] = [];
  for (let x = -5; x <= 5.0001; x += 0.05) curve.push([x, Math.max(-60, Math.min(60, a * x * x + b * x + c))]);
  const vx = lin ? 0 : -b / (2 * a);
  const tone = kind === "real" ? "good" : kind === "rep" ? "warn" : "bad";
  const label =
    kind === "real" ? "$\\Delta > 0$: two distinct real roots (parabola crosses the axis twice)"
      : kind === "rep" ? "$\\Delta = 0$: one repeated real root (parabola just touches)"
        : kind === "cx" ? "$\\Delta < 0$: no real roots — a **complex-conjugate pair** (parabola misses the axis)"
          : "$a = 0$: not a quadratic (linear)";
  return (
    <VizFrame
      title="Discriminant: where do the roots go?"
      hint="Top: the parabola y = ax² + bx + c. Bottom: the same roots on the Argand plane."
      onReset={() => { setMode("tut"); setCT(-2); setGA(1); setGB(-2); setGC(5); }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <Plane2D x={[-5, 5]} y={[-4, 4]}>
            <Label2 at={[4.4, 0]} text="x" color="muted" dx={0} dy={-6} />
            <Poly2 pts={curve} color="accent" width={2.5} />
            {!lin && <Dot2 at={[vx, a * vx * vx + b * vx + c]} color="muted" r={3} />}
            {(kind === "real" || kind === "rep" || kind === "lin") && roots.map((q, i) => <Dot2 key={i} at={q} color="good" r={5} />)}
          </Plane2D>
          <Plane2D x={[-4, 4]} y={[-2.5, 2.5]} grid={0.5} labels={false}>
            <Label2 at={[3.4, 0]} text="Re" color="muted" dx={0} dy={-6} />
            <Label2 at={[0, 2.1]} text="Im" color="muted" dx={6} dy={4} />
            {kind === "cx" && (
              <>
                <Circle2 r={cabs(roots[0])} />
                <Seg2 a={roots[0]} b={roots[1]} color="cx" dashed />
              </>
            )}
            {roots.map((q, i) => (
              <Dot2 key={i} at={q} color={kind === "cx" ? "cx" : "good"} r={kind === "rep" ? 7 : 5} label={roots.length > 1 ? `x${sub(i + 1)}` : "x"} />
            ))}
          </Plane2D>
        </div>
      }
      controls={
        <>
          <Choice value={mode} onChange={setMode} options={[{ v: "tut", label: "Tutorial Q2: $-2x^2 + 3x - c$" }, { v: "gen", label: "General $ax^2 + bx + c$" }]} />
          {mode === "tut" ? (
            <Slider label="$c$" value={cT} min={-4} max={4} step={0.125} onChange={setCT} format={(v) => fmt(v, 3)} />
          ) : (
            <>
              <Slider label="$a$" value={ga} min={-3} max={3} step={0.25} onChange={setGA} />
              <Slider label="$b$" value={gb} min={-6} max={6} step={0.25} onChange={setGB} />
              <Slider label="$c$" value={gc} min={-6} max={6} step={0.25} onChange={setGC} />
            </>
          )}
        </>
      }
      readout={
        <>
          <Read tex={`$y = ${polyTex(a, b, c)}$`} />
          {!lin && (
            <Read
              tex={`$\\Delta = b^2 - 4ac = (${fmt(b)})^2 - 4(${fmt(a)})(${fmt(c, 3)}) = ${fmt(D, 3)}$${mode === "tut" ? ` $\\ \\big(= 9 - 8c\\big)$` : ""}`}
            />
          )}
          <Read tone={tone} tex={label} />
          {kind === "real" && <Read tex={`$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} = \\dfrac{${fmt(-b)} \\pm ${fmt(Math.sqrt(D), 3)}}{${fmt(2 * a)}}$: $\\ x = ${fmt(roots[0][0], 3)},\\ ${fmt(roots[1][0], 3)}$`} />}
          {kind === "rep" && <Read tex={`$x = -\\dfrac{b}{2a} = ${fmt(roots[0][0], 3)}$ (twice)`} />}
          {kind === "cx" && (
            <Read tex={`$x = -\\dfrac{b}{2a} \\pm j\\dfrac{\\sqrt{-\\Delta}}{2|a|} = ${fmt(roots[0][0], 3)} \\pm ${fmt(roots[0][1], 3)}j$ — mirror images in the real axis, equal modulus $${fmt(cabs(roots[0]), 3)}$`} />
          )}
          {kind === "lin" && <Read tex={roots.length ? `$x = -c/b = ${fmt(roots[0][0], 3)}$` : "no roots (or every $x$) — degenerate"} />}
          {!lin && (
            <Read
              tone="good"
              tex={`check: $x_1 + x_2 = -b/a = ${fmt(-b / a, 3)}$, $\\ x_1x_2 = c/a = ${fmt(c / a, 3)}$${kind === "cx" ? " $= |x|^2$" : ""}`}
            />
          )}
        </>
      }
      tasks={[
        "Tutorial Q2(a): predict the $c$ that gives a repeated root ($9 - 8c = 0$). Slide to $c = 1.125$ and check the root $x = 3/4$.",
        "Q2(b): before sliding to $c = -2$, predict both roots. Check: $x = 2$ and $x = -\\tfrac12$.",
        "Q2(c, d): push $c$ up past $9/8$. The two roots meet, then leave the real line **vertically** as a mirror pair. Why can a real quadratic never have roots $2 + 3j$ and $2 - j$?",
        "General mode: with $\\Delta < 0$, change only $c$, then only $b$. Which one moves the pair sideways, which one apart? (Real part $= -b/2a$.)",
      ]}
    />
  );
}
