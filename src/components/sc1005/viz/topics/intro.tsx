"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import type { Bit } from "@/lib/sc1005/logic";
import { BitRow, bitsOf, Choice, Read, Slider, useStepper, valueOf, VizFrame, WaveSvg } from "../kit";

// Interactive figures for the intro lesson, chosen by id (see LessonSection.visuals).
export default function IntroVisual({ id }: { id: string }) {
  switch (id) {
    case "bit-capacity":
      return <BitCapacityViz />;
    case "logic-levels":
      return <LogicLevelsViz />;
    case "waveform-explorer":
      return <WaveformViz />;
    case "prop-delay":
      return <PropDelayViz />;
    case "serial-parallel":
      return <SerialParallelViz />;
    default:
      return null;
  }
}

const TXT: CSSProperties = { fill: "var(--text)", fontSize: 11 };
const MUTED: CSSProperties = { fill: "var(--muted)", fontSize: 10 };
const HALO: CSSProperties = { paintOrder: "stroke", stroke: "var(--surface-2)", strokeWidth: 3, strokeLinejoin: "round" };
const inputStyle: CSSProperties = { font: "inherit", padding: "4px 8px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", width: 130 };
const fmtNum = (x: number, d = 3) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : Number(x.toPrecision(d)).toString());
const big = (x: number) => x.toLocaleString("en-US");

// ---------------------------------------------------------------------------------------------
// Bits, counting and capacity

function BitCapacityViz() {
  const [n, setN] = useState(8);
  const [value, setValue] = useState(7);
  const [changed, setChanged] = useState<number[]>([]);
  const [target, setTarget] = useState("35000");
  const max = 2 ** n - 1;
  const v = Math.min(value, max);
  const step = (d: number) => {
    const nv = (((v + d) % (max + 1)) + max + 1) % (max + 1);
    const diff = v ^ nv;
    setChanged(Array.from({ length: n }, (_, i) => i).filter((i) => (diff >> i) & 1));
    setValue(nv);
  };
  const bcdDigits = Math.floor(n / 4);
  const bcdMax = bcdDigits ? 10 ** bcdDigits - 1 : 0;
  const X = Number(target.replace(/[\s,_]/g, ""));
  const okX = Number.isFinite(X) && X >= 0 && Number.isInteger(X) && X < 1e15;
  const nBin = okX ? Math.max(1, Math.ceil(Math.log2(X + 1) - 1e-12)) : 0;
  const nBinFixed = okX ? (2 ** nBin - 1 >= X ? nBin : nBin + 1) : 0;
  const digits = okX ? String(X).length : 0;
  const nibble = (i: number) => Math.floor((n - 1 - i) / 4);
  const asBcd =
    n % 4 === 0
      ? Array.from({ length: n / 4 }, (_, j) => (v >> (n - 4 * (j + 1))) & 15)
      : null;
  return (
    <VizFrame
      title="N bits: counting, largest value and bits needed"
      hint="Click bits to set a value, or count with +1 / −1 and watch which bits toggle. Labels under each bit give its weight."
      onReset={() => {
        setN(8);
        setValue(7);
        setChanged([]);
      }}
      figure={
        <div style={{ padding: 10 }}>
          <BitRow
            bits={bitsOf(v, n)}
            onChange={(b) => {
              setChanged([]);
              setValue(valueOf(b));
            }}
            labels={Array.from({ length: n }, (_, i) => String(2 ** (n - 1 - i)))}
            size={n > 12 ? 24 : 30}
          />
          <div style={{ display: "flex", gap: 4, marginTop: 18, flexWrap: "wrap" }}>
            {Array.from({ length: n }, (_, i) => {
              const bit = n - 1 - i;
              const hit = changed.includes(bit);
              return (
                <div
                  key={i}
                  style={{
                    width: n > 12 ? 24 : 30,
                    height: 6,
                    borderRadius: 3,
                    background: hit ? "var(--warn)" : nibble(bit) % 2 ? "var(--accent-soft)" : "var(--surface-2)",
                  }}
                  title={hit ? "toggled on the last count" : ""}
                />
              );
            })}
          </div>
          <div className="small muted" style={{ marginTop: 6 }}>
            Orange bars: bits that toggled on the last count. Shading groups the bits in nibbles (4-bit groups).
          </div>
          <div className="row" style={{ gap: 6, marginTop: 10 }}>
            <button className="btn small" onClick={() => step(-1)}>
              −1
            </button>
            <button className="btn small primary" onClick={() => step(1)}>
              +1 (count)
            </button>
            <button
              className="btn small"
              onClick={() => {
                setChanged([]);
                setValue(0);
              }}
            >
              Clear
            </button>
          </div>
          <div style={{ marginTop: 14 }} className="small">
            <label>
              Bits needed for integers 0 … X, X ={" "}
              <input style={inputStyle} value={target} onChange={(e) => setTarget(e.target.value)} inputMode="numeric" aria-label="Largest value X" />
            </label>
          </div>
        </div>
      }
      controls={<Slider label="Number of bits $N$" value={n} min={1} max={16} step={1} onChange={(x) => { setN(x); setChanged([]); }} format={(x) => String(x)} />}
      readout={
        <>
          <Read label="Value" tex={`**${v.toString(2).padStart(n, "0")}**$_2 = ${v}_{10}$`} tone="good" />
          <Read label="Binary range" tex={`$0$ to $2^{${n}}-1 = ${big(max)}$ (${big(max + 1)} values)`} />
          <Read
            label="BCD range"
            tex={bcdDigits ? `${bcdDigits} digit${bcdDigits > 1 ? "s" : ""} → $0$ to $10^{${bcdDigits}}-1 = ${big(bcdMax)}$${n % 4 ? ` (${n % 4} bit${n % 4 > 1 ? "s" : ""} left over)` : ""}` : "fewer than 4 bits: not even one BCD digit"}
          />
          {asBcd && (
            <Read
              label="Same bits as BCD"
              tex={asBcd.some((d) => d > 9) ? `contains ${asBcd.filter((d) => d > 9).length} invalid nibble(s) (1010–1111)` : `$${asBcd.join("")}_{10}$`}
              tone={asBcd.some((d) => d > 9) ? "warn" : undefined}
            />
          )}
          {okX ? (
            <>
              <Read label="Binary needs" tex={`smallest $N$ with $2^N - 1 \\ge ${big(X)}$${nBinFixed > 1 ? `: $2^{${nBinFixed - 1}} - 1 = ${big(2 ** (nBinFixed - 1) - 1)}$ is too small` : ""}, so **${nBinFixed} bit${nBinFixed > 1 ? "s" : ""}**`} tone="good" />
              <Read label="BCD needs" tex={`${digits} digit${digits > 1 ? "s" : ""} × 4 = **${4 * digits} bits**`} />
            </>
          ) : (
            <Read tex="Type a whole number for X." tone="warn" />
          )}
        </>
      }
      tasks={[
        "Predict: starting from 0111, which single count makes four bits change at once? Set the value to 7, press +1 and watch the orange bars.",
        "Set $N = 12$. Compare the largest binary and largest BCD values. How many of the $4096$ codes does BCD never use?",
        "Tutorial 1 Q2 asks for 350 000. Before typing it, predict from $2^{18} = 262\\,144$ and $2^{19} = 524\\,288$. Then check, and compare with BCD.",
        "Set $N = 3$ and count from 0 with +1. Write down the 8 codes: this is the binary counting sequence used to list truth-table rows. What comes after 111?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Logic levels and noise

const SENT: Bit[] = [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1];
const PER_BIT = 12;
const VOL = 0.2;
const VOH = 4.6;
const FAMILIES = {
  ttl: { name: "TTL", vil: 0.8, vih: 2.0 },
  cmos: { name: "CMOS (74AC)", vil: 1.5, vih: 3.5 },
} as const;

function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function LogicLevelsViz() {
  const [fam, setFam] = useState<keyof typeof FAMILIES>("ttl");
  const [noise, setNoise] = useState(0.4);
  const [seed, setSeed] = useState(3);
  const f = FAMILIES[fam];
  const W = 400;
  const H = 230;
  const x0 = 40;
  const x1 = W - 10;
  const yTop = 30;
  const yBot = H - 40;
  const Y = (v: number) => yBot - (Math.max(-0.5, Math.min(5.6, v)) / 5) * (yBot - yTop);
  const n = SENT.length * PER_BIT;
  const X = (i: number) => x0 + (i / n) * (x1 - x0);
  const samples = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: n }, (_, i) => {
      const b = SENT[Math.floor(i / PER_BIT)];
      return (b ? VOH : VOL) + (2 * r() - 1) * noise;
    });
  }, [seed, noise, n]);
  const mid = Math.floor(PER_BIT / 2);
  const decoded = SENT.map((b, j) => {
    const v = samples[j * PER_BIT + mid];
    const d: Bit | null = v <= f.vil ? 0 : v >= f.vih ? 1 : null;
    return { b, v, d, ok: d === b };
  });
  const nOk = decoded.filter((d) => d.ok).length;
  const nInv = decoded.filter((d) => d.d === null).length;
  const nWrong = SENT.length - nOk - nInv;
  const path = samples.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)} L${X(i + 1).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const mLow = f.vil - VOL;
  const mHigh = VOH - f.vih;
  return (
    <VizFrame
      title="Logic levels: why noise doesn't corrupt bits (until it does)"
      hint="A driver sends 0 as 0.2 V and 1 as 4.6 V. Noise is added on the wire. The receiver samples the middle of each bit and only asks which band the voltage is in."
      onReset={() => {
        setFam("ttl");
        setNoise(0.4);
        setSeed(3);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Noisy digital signal with logic bands">
          <rect x={x0} y={Y(5)} width={x1 - x0} height={Y(f.vih) - Y(5)} fill="var(--good)" opacity={0.14} />
          <rect x={x0} y={Y(f.vih)} width={x1 - x0} height={Y(f.vil) - Y(f.vih)} fill="var(--warn)" opacity={0.18} />
          <rect x={x0} y={Y(f.vil)} width={x1 - x0} height={Y(0) - Y(f.vil)} fill="var(--accent)" opacity={0.14} />
          {[0, f.vil, f.vih, 5].map((v) => (
            <text key={v} x={x0 - 4} y={Y(v) + 3} textAnchor="end" style={{ ...MUTED, fontSize: 9 }}>
              {v.toFixed(1)}
            </text>
          ))}
          <text x={x1 - 4} y={Y(f.vih) - 4} textAnchor="end" style={{ ...MUTED, fontSize: 9 }}>
            logic 1 band
          </text>
          <text x={x1 - 4} y={Y(f.vil) + 11} textAnchor="end" style={{ ...MUTED, fontSize: 9 }}>
            logic 0 band
          </text>
          {SENT.map((_, j) => (
            <line key={j} x1={X(j * PER_BIT)} x2={X(j * PER_BIT)} y1={yTop - 18} y2={yBot} stroke="var(--border)" strokeWidth={0.6} />
          ))}
          <path d={path} fill="none" stroke="var(--text)" strokeWidth={1.2} opacity={0.85} />
          {decoded.map((d, j) => {
            const cx = X(j * PER_BIT + mid + 0.5);
            const col = d.ok ? "var(--good)" : d.d === null ? "var(--warn)" : "var(--bad)";
            return (
              <g key={j}>
                <circle cx={cx} cy={Y(d.v)} r={3.6} fill={col} />
                <text x={cx} y={yTop - 6} textAnchor="middle" style={{ ...TXT, fill: col, fontWeight: 700 }}>
                  {d.d === null ? "?" : d.d}
                </text>
                <text x={cx} y={H - 22} textAnchor="middle" style={MUTED}>
                  {d.b}
                </text>
              </g>
            );
          })}
          <text x={4} y={yTop - 6} style={{ ...MUTED, fontSize: 9 }}>
            read
          </text>
          <text x={4} y={H - 22} style={{ ...MUTED, fontSize: 9 }}>
            sent
          </text>
          <text x={(x0 + x1) / 2} y={H - 6} textAnchor="middle" style={MUTED}>
            time → (one column per bit; dot = sampling instant)
          </text>
        </svg>
      }
      controls={
        <>
          <Choice
            value={fam}
            onChange={setFam}
            options={[
              { v: "ttl", label: "TTL: 0–0.8 V / 2.0–5.0 V" },
              { v: "cmos", label: "CMOS (74AC): 0–1.5 V / 3.5–5.0 V" },
            ]}
          />
          <Slider label="Noise amplitude (peak)" value={noise} min={0} max={2.5} step={0.05} onChange={setNoise} format={(v) => `±${v.toFixed(2)} V`} />
          <div>
            <button className="btn small" onClick={() => setSeed((s) => s + 1)}>
              New noise pattern
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="Bands" tex={`0: $0$–$${f.vil}$ V · indeterminate: $${f.vil}$–$${f.vih}$ V · 1: $${f.vih}$–$5$ V`} />
          <Read label="Bits recovered" tex={`**${nOk} / ${SENT.length}**${nInv ? ` · ${nInv} indeterminate` : ""}${nWrong ? ` · ${nWrong} wrong` : ""}`} tone={nOk === SENT.length ? "good" : nWrong ? "bad" : "warn"} />
          <Read label="Room for noise" tex={`a 0 survives up to $${f.vil} - ${VOL} = ${mLow.toFixed(1)}$ V; a 1 up to $${VOH} - ${f.vih} = ${mHigh.toFixed(1)}$ V`} />
          <Read
            tex={
              noise < Math.min(mLow, mHigh)
                ? `noise $\\pm${noise.toFixed(2)}$ V < $${Math.min(mLow, mHigh).toFixed(1)}$ V: every bit is recovered **exactly**; an analog reading would be off by up to $${noise.toFixed(2)}$ V`
                : `noise can now push a ${mLow < mHigh ? "0" : "1"} out of its band (smaller margin): errors depend on the noise pattern`
            }
            tone={noise < Math.min(mLow, mHigh) ? "good" : "warn"}
          />
        </>
      }
      tasks={[
        "Predict: with TTL bands, is a 0 or a 1 more easily upset by noise? Raise the noise slowly until the first ? or wrong bit appears.",
        "Switch to CMOS bands. Which bit value now fails first? Use the 'room for noise' line to explain.",
        "Set the noise to ±0.5 V and press 'New noise pattern' several times. Does the received data ever change? Relate this to the lecture's phone illustration (F0-6): why is the digital signal recovered cleanly while a purely analog one keeps the noise?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Waveform explorer: period, frequency, rise/fall time

/** Trapezoidal pulse train: rising 50% point at offset + kT, falling at +tW, full edges tr/0.8 and tf/0.8 wide. */
function pulseLevel(t: number, T: number, tW: number, tr: number, tf: number, offset: number) {
  const fr = tr / 0.8;
  const ff = tf / 0.8;
  let u = (t - offset) % T;
  if (u < 0) u += T;
  // unwrap so that the rising edge centred at 0 is handled near u ≈ T
  if (u > T - fr / 2) u -= T;
  if (u < -fr / 2) return 0;
  if (u < fr / 2) return fr ? 0.5 + u / fr : u >= 0 ? 1 : 0;
  if (u < tW - ff / 2) return 1;
  if (u < tW + ff / 2) return ff ? 0.5 - (u - tW) / ff : 0;
  return 0;
}

function WaveformViz() {
  const [T, setT] = useState(100);
  const [duty, setDuty] = useState(30);
  const [tr, setTr] = useState(8);
  const [tf, setTf] = useState(4);
  const tW = (duty / 100) * T;
  const maxEdge = Math.floor(0.8 * Math.min(tW, T - tW));
  const trE = Math.min(tr, maxEdge);
  const tfE = Math.min(tf, maxEdge);
  const W = 400;
  const H = 210;
  const x0 = 34;
  const x1 = W - 10;
  const span = 2.3 * T;
  const off = 0.2 * T;
  const X = (t: number) => x0 + (t / span) * (x1 - x0);
  const yHi = 40;
  const yLo = 150;
  const Y = (lvl: number) => yLo - lvl * (yLo - yHi);
  const path = Array.from({ length: 601 }, (_, i) => {
    const t = (i / 600) * span;
    return `${i ? "L" : "M"}${X(t).toFixed(2)} ${Y(pulseLevel(t, T, tW, trE, tfE, off)).toFixed(2)}`;
  }).join(" ");
  const r10 = off - (0.4 * trE) / 0.8;
  const r90 = off + (0.4 * trE) / 0.8;
  const f90 = off + tW - (0.4 * tfE) / 0.8;
  const f10 = off + tW + (0.4 * tfE) / 0.8;
  const bracket = (xa: number, xb: number, y: number, label: string, col: string, below = false) => (
    <g>
      <line x1={xa} x2={xb} y1={y} y2={y} stroke={col} strokeWidth={1.4} />
      <line x1={xa} x2={xa} y1={y - 4} y2={y + 4} stroke={col} strokeWidth={1.4} />
      <line x1={xb} x2={xb} y1={y - 4} y2={y + 4} stroke={col} strokeWidth={1.4} />
      <text x={(xa + xb) / 2} y={below ? y + 15 : y - 5} textAnchor="middle" style={{ ...TXT, ...HALO, fill: col, fontSize: 10, fontWeight: 700 }}>
        {label}
      </text>
    </g>
  );
  return (
    <VizFrame
      title="Waveform explorer: T, f, rise and fall time"
      hint="A 0–5 V pulse train. Dashed lines mark 10%, 50% and 90% of the swing; rise and fall times are measured between the 10% and 90% levels (slide 6-50)."
      onReset={() => {
        setT(100);
        setDuty(30);
        setTr(8);
        setTf(4);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Pulse waveform with measurements">
          {[0.1, 0.5, 0.9].map((l) => (
            <g key={l}>
              <line x1={x0} x2={x1} y1={Y(l)} y2={Y(l)} stroke="var(--muted)" strokeDasharray="3 3" strokeWidth={0.8} />
              <text x={x0 - 3} y={Y(l) + 3} textAnchor="end" style={{ ...MUTED, fontSize: 9 }}>
                {l * 100}%
              </text>
            </g>
          ))}
          <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2.2} />
          {bracket(X(r10), X(r90), yLo + 18, `tr = ${trE}`, "var(--good)", true)}
          {bracket(X(f90), X(f10), yLo + 18, `tf = ${tfE}`, "var(--warn)", true)}
          {bracket(X(off), X(off + tW), Y(0.5) - 8, `HIGH ${fmtNum(tW)}`, "var(--text)")}
          {bracket(X(off), X(off + T), 18, `T = ${T} ns`, "var(--bad)")}
          {[r10, r90, f90, f10].map((t, i) => (
            <line key={i} x1={X(t)} x2={X(t)} y1={Y(i === 0 || i === 3 ? 0.1 : 0.9)} y2={yLo + 18} stroke="var(--muted)" strokeWidth={0.6} />
          ))}
          <text x={(x0 + x1) / 2} y={H - 6} textAnchor="middle" style={MUTED}>
            time (ns), window = {fmtNum(span)} ns
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Period $T$" value={T} min={20} max={200} step={10} onChange={setT} format={(v) => `${v} ns`} />
          <Slider label="HIGH time (% of $T$)" value={duty} min={10} max={90} step={5} onChange={setDuty} format={(v) => `${v}%`} />
          <Slider label="Rise time $t_r$ (10%→90%)" value={tr} min={0} max={20} step={1} onChange={setTr} format={(v) => `${v} ns`} />
          <Slider label="Fall time $t_f$ (90%→10%)" value={tf} min={0} max={20} step={1} onChange={setTf} format={(v) => `${v} ns`} />
        </>
      }
      readout={
        <>
          <Read label="Frequency" tex={`$f = 1/T = 1/${T}\\text{ ns} = ${fmtNum(1000 / T, 4)}$ MHz`} tone="good" />
          <Read label="HIGH / LOW" tex={`HIGH ${fmtNum(tW)} ns, LOW ${fmtNum(T - tW)} ns in each period of ${T} ns`} />
          <Read label="Edges" tex={`$t_r = ${trE}$ ns, $t_f = ${tfE}$ ns; a full 0→100% edge takes $t_r/0.8 = ${fmtNum(trE / 0.8)}$ ns`} />
          {(tr > maxEdge || tf > maxEdge) && <Read tex={`edges limited to ${maxEdge} ns so the pulse still reaches its full level`} tone="warn" />}
        </>
      }
      tasks={[
        "Predict: what frequency is $T = 50$ ns? Set it and check the readout.",
        "Keep $T$ fixed and move the HIGH time from 30% to 70% of $T$. Does the frequency change?",
        "Set $t_r = 16$ ns. The green bracket shows 16 ns, but the edge takes longer from bottom to top. Which two levels define the rise time on slide 6-50?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Propagation delay

function PropDelayViz() {
  const [gate, setGate] = useState<"inv" | "buf">("inv");
  const [tPHL, setPHL] = useState(12);
  const [tPLH, setPLH] = useState(7);
  const W = 400;
  const H = 230;
  const x0 = 46;
  const x1 = W - 10;
  const span = 140;
  const X = (t: number) => x0 + (t / span) * (x1 - x0);
  const edge = 6; // full edge width (ns)
  const inRise = 20;
  const inFall = 80;
  const ramp = (t: number, c: number, up: boolean) => {
    const u = Math.max(0, Math.min(1, 0.5 + (t - c) / edge));
    return up ? u : 1 - u;
  };
  const inLvl = (t: number) => Math.min(ramp(t, inRise, true), ramp(t, inFall, false));
  const inv = gate === "inv";
  // output 50% crossings
  const out1 = inRise + (inv ? tPHL : tPLH); // after input rises
  const out2 = inFall + (inv ? tPLH : tPHL); // after input falls
  const outLvl = (t: number) => (inv ? Math.max(ramp(t, out1, false), ramp(t, out2, true)) : Math.min(ramp(t, out1, true), ramp(t, out2, false)));
  const rows = [
    { name: "IN", lvl: inLvl, y0: 30 },
    { name: inv ? "OUT = IN'" : "OUT = IN", lvl: outLvl, y0: 120 },
  ];
  const h = 60;
  const path = (lvl: (t: number) => number, y0: number) =>
    Array.from({ length: 561 }, (_, i) => {
      const t = (i / 560) * span;
      return `${i ? "L" : "M"}${X(t).toFixed(2)} ${(y0 + h - lvl(t) * h).toFixed(2)}`;
    }).join(" ");
  const d1 = inv ? "tPHL" : "tPLH";
  const d2 = inv ? "tPLH" : "tPHL";
  const widthOut = out2 - out1;
  return (
    <VizFrame
      title="Propagation delay: tPHL and tPLH"
      hint="Delays are measured between the 50% points of input and output, and are named after the OUTPUT transition (H→L or L→H)."
      onReset={() => {
        setGate("inv");
        setPHL(12);
        setPLH(7);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Input and output waveforms with delays">
          {rows.map((r) => (
            <g key={r.name}>
              <line x1={x0} x2={x1} y1={r.y0 + h / 2} y2={r.y0 + h / 2} stroke="var(--muted)" strokeDasharray="3 3" strokeWidth={0.7} />
              <text x={x0 - 4} y={r.y0 + h / 2 + 4} textAnchor="end" style={{ ...TXT, fontSize: 10, fontWeight: 700 }}>
                {r.name.split(" ")[0]}
              </text>
              <path d={path(r.lvl, r.y0)} fill="none" stroke={r.y0 < 100 ? "var(--accent)" : "var(--good)"} strokeWidth={2.2} />
            </g>
          ))}
          {[
            { a: inRise, b: out1, lab: `${d1} = ${inv ? tPHL : tPLH} ns`, col: "var(--bad)" },
            { a: inFall, b: out2, lab: `${d2} = ${inv ? tPLH : tPHL} ns`, col: "var(--warn)" },
          ].map((m, i) => (
            <g key={i}>
              <line x1={X(m.a)} x2={X(m.a)} y1={30 + h / 2} y2={120 + h / 2} stroke={m.col} strokeWidth={0.8} strokeDasharray="2 2" />
              <line x1={X(m.b)} x2={X(m.b)} y1={30 + h / 2} y2={120 + h / 2} stroke={m.col} strokeWidth={0.8} strokeDasharray="2 2" />
              <line x1={X(m.a)} x2={X(m.b)} y1={105} y2={105} stroke={m.col} strokeWidth={1.6} />
              <text x={(X(m.a) + X(m.b)) / 2} y={101} textAnchor="middle" style={{ ...TXT, ...HALO, fill: m.col, fontSize: 10, fontWeight: 700 }}>
                {m.lab}
              </text>
            </g>
          ))}
          <text x={(x0 + x1) / 2} y={H - 6} textAnchor="middle" style={MUTED}>
            time (ns): input HIGH from 20 to 80 ns (60 ns pulse)
          </text>
        </svg>
      }
      controls={
        <>
          <Choice
            value={gate}
            onChange={setGate}
            options={[
              { v: "inv", label: "Inverter (NOT)" },
              { v: "buf", label: "Buffer" },
            ]}
          />
          <Slider label="$t_{PHL}$ (output H→L)" value={tPHL} min={2} max={30} step={1} onChange={setPHL} format={(v) => `${v} ns`} />
          <Slider label="$t_{PLH}$ (output L→H)" value={tPLH} min={2} max={30} step={1} onChange={setPLH} format={(v) => `${v} ns`} />
        </>
      }
      readout={
        <>
          <Read label="Input rises" tex={`output ${inv ? "falls" : "rises"} $${inv ? tPHL : tPLH}$ ns later → that is $${inv ? "t_{PHL}" : "t_{PLH}"}$`} />
          <Read label="Input falls" tex={`output ${inv ? "rises" : "falls"} $${inv ? tPLH : tPHL}$ ns later → that is $${inv ? "t_{PLH}" : "t_{PHL}"}$`} />
          <Read label="Average" tex={`$t_{pd} = (t_{PHL} + t_{PLH})/2 = ${fmtNum((tPHL + tPLH) / 2)}$ ns; worst case $${Math.max(tPHL, tPLH)}$ ns`} />
          <Read label="Output pulse" tex={`$60 + (${inv ? "t_{PLH} - t_{PHL}" : "t_{PHL} - t_{PLH}"}) = ${widthOut}$ ns ${widthOut === 60 ? "(same as input)" : widthOut > 60 ? "(stretched)" : "(shrunk)"}`} tone={widthOut === 60 ? "good" : "warn"} />
        </>
      }
      tasks={[
        "Predict: for the inverter, which delay is measured at the input's **rising** edge? Check the red bracket.",
        "Switch to the buffer. Which label moves to the other edge, and why?",
        "Set $t_{PHL} = 20$ and $t_{PLH} = 5$ on the inverter. Is the output pulse wider or narrower than 60 ns? Explain using the two brackets.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Serial vs parallel transfer

const WORDS: Record<number, number> = { 4: 0b1011, 8: 0b10110001, 12: 0b101100011101, 16: 0b1011000111010110 };

function SerialParallelViz() {
  const [n, setN] = useState(8);
  const [word, setWord] = useState<Bit[]>(bitsOf(WORDS[8], 8));
  const [mhz, setMhz] = useState(10);
  const { i: k, setI, controls } = useStepper(n + 1);
  const T = 1000 / mhz; // ns
  const changeN = (m: number) => {
    setN(m);
    setWord(bitsOf(WORDS[m], m));
    setI(0);
  };
  const W = 400;
  const H = 205;
  const cell = Math.min(22, (W - 90) / (2 * n));
  const txX = 14;
  const rxX = W - 14 - n * cell;
  const regs = (x: number, y: number, shown: (j: number) => boolean, dim: boolean): ReactNode =>
    word.map((b, j) => {
      const on = shown(j);
      return (
        <g key={j}>
          <rect x={x + j * cell} y={y} width={cell - 2} height={cell - 2} rx={3} fill={on ? (b ? "var(--good)" : "var(--surface)") : "var(--surface-2)"} stroke="var(--border)" opacity={dim && !on ? 0.5 : 1} />
          <text x={x + j * cell + (cell - 2) / 2} y={y + cell * 0.68} textAnchor="middle" style={{ ...TXT, fontSize: cell * 0.55, fontWeight: 700, fill: on ? (b ? "var(--surface)" : "var(--text)") : "var(--muted)" }}>
            {on ? b : "·"}
          </text>
        </g>
      );
    });
  // serial: MSB first; after k periods the receiver holds bits 0..k-1 (MSB index 0)
  const serY = 40;
  const parY = 122;
  const current = k >= 1 ? word[k - 1] : null;
  const serWave = word.map((b) => (b ? "11" : "00")).join("");
  return (
    <VizFrame
      title="Serial vs parallel transfer of one word"
      hint="Step the clock. Serial sends one bit per clock period (MSB first) on one wire; parallel sends every bit at once on its own wire. Click the transmitter's bits to change the word."
      onReset={() => {
        changeN(8);
        setMhz(10);
      }}
      figure={
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Serial and parallel transfer">
            <text x={6} y={serY - 16} style={{ ...TXT, fontWeight: 700 }}>
              Serial (1 data wire)
            </text>
            {regs(txX, serY, (j) => j >= k, true)}
            {regs(rxX, serY, (j) => j < k, true)}
            <line x1={txX + n * cell + 4} x2={rxX - 6} y1={serY + cell / 2} y2={serY + cell / 2} stroke={current === 1 ? "var(--good)" : "var(--muted)"} strokeWidth={current === 1 ? 3 : 1.6} />
            {current !== null && k <= n && (
              <g>
                <circle cx={(txX + n * cell + rxX) / 2} cy={serY + cell / 2} r={9} fill={current ? "var(--good)" : "var(--surface)"} stroke="var(--text)" />
                <text x={(txX + n * cell + rxX) / 2} y={serY + cell / 2 + 4} textAnchor="middle" style={{ ...TXT, fontWeight: 700, fill: current ? "var(--surface)" : "var(--text)" }}>
                  {current}
                </text>
              </g>
            )}
            <text x={txX} y={serY + cell + 14} style={MUTED}>
              transmitter
            </text>
            <text x={rxX} y={serY + cell + 14} style={MUTED}>
              receiver: {Math.min(k, n)}/{n} bits
            </text>
            <text x={6} y={parY - 16} style={{ ...TXT, fontWeight: 700 }}>
              Parallel ({n} data wires)
            </text>
            {regs(txX, parY, () => k === 0, true)}
            {regs(rxX, parY, () => k >= 1, true)}
            {word.map((b, j) => {
              const lit = k >= 1 && b === 1;
              const dy = 5 + (j * 24) / n;
              return (
                <path
                  key={j}
                  d={`M${txX + j * cell + cell / 2} ${parY + cell - 2} V${parY + cell + dy} H${rxX + j * cell + cell / 2} V${parY + cell - 2}`}
                  fill="none"
                  stroke={lit ? "var(--good)" : "var(--border)"}
                  strokeWidth={lit ? 1.8 : 1}
                />
              );
            })}
            <text x={rxX} y={parY + cell + 42} style={MUTED}>
              receiver: {k >= 1 ? n : 0}/{n} bits
            </text>
            <text x={W / 2} y={H - 8} textAnchor="middle" style={MUTED}>
              clock periods elapsed: {k}
            </text>
          </svg>
          <div style={{ marginTop: 8 }}>
            <WaveSvg
              signals={[
                { name: "CLK", wave: "01".repeat(n) },
                { name: "SER", wave: serWave },
              ]}
              cursor={k >= 1 ? 2 * (k - 1) : undefined}
              unit={n > 8 ? 12 : 18}
            />
          </div>
        </div>
      }
      controls={
        <>
          {controls}
          <Choice value={n} onChange={changeN} options={[4, 8, 12, 16].map((m) => ({ v: m, label: `${m} bits` }))} />
          <BitRow bits={word} onChange={(b) => { setWord(b); setI(0); }} size={n > 12 ? 20 : 24} />
          <Slider label="Clock frequency" value={mhz} min={1} max={100} step={1} onChange={setMhz} format={(v) => `${v} MHz`} />
        </>
      }
      readout={
        <>
          <Read label="Clock period" tex={`$T = 1/${mhz}\\text{ MHz} = ${fmtNum(T)}$ ns`} />
          <Read label="Serial" tex={`$N \\times T = ${n} \\times ${fmtNum(T)} = ${fmtNum(n * T)}$ ns on **1** wire`} tone={k >= n ? "good" : undefined} />
          <Read label="Parallel" tex={`$T = ${fmtNum(T)}$ ns on **${n}** wires`} tone={k >= 1 ? "good" : undefined} />
          <Read label="Bits per µs" tex={`serial $${fmtNum(mhz)}$ · parallel $${fmtNum(mhz * n)}$`} />
        </>
      }
      tasks={[
        "Predict: how many clock periods until the serial receiver holds the whole word? Step and check. When does the parallel receiver finish?",
        "Switch to 16 bits. How do the serial and parallel times change, and how many wires does each need?",
        "Explain the lecture's 'speed versus cost' trade-off (F0-7) using the readout: at the same clock, which is faster, and which needs fewer wires?",
      ]}
    />
  );
}
