"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { clockEdge, evalCircuit, type Bit } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, Read, TableView, Toggle, VizFrame, valColor, valueOf } from "../kit";

// Interactive figures for the sequential lesson, chosen by id (see LessonSection.visuals).
export default function SequentialVisual({ id }: { id: string }) {
  switch (id) {
    case "sr-latch":
      return <SrLatchViz />;
    case "latch-vs-ff":
      return <LatchVsFlipFlop />;
    case "ff-types":
      return <FlipFlopTypes />;
    case "timing-lab":
      return <TimingLab />;
    case "shift-register":
      return <ShiftRegisterViz />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// A small timing-diagram renderer with clickable (editable) rows, hatched unknowns and bus rows.

type W = 0 | 1 | null;
interface WRow {
  name: string;
  /** 1-bit values per time unit (null = unknown, drawn hatched). */
  vals?: W[];
  /** Bus labels per time unit; a label starting with "!" is drawn in the warning colour. */
  bus?: (string | null)[];
  /** Makes the row editable: called with the clicked time unit. */
  onToggle?: (t: number) => void;
  /** Stroke colour for the trace. */
  color?: string;
  /** Draw the row blank (for "predict first"). */
  hidden?: boolean;
}

function LiveWave({ rows, unit = 24, marks = [], cursor, onCursor, tickEvery, minLen = 1 }: { rows: WRow[]; unit?: number; marks?: number[]; cursor?: number; onCursor?: (t: number) => void; tickEvery?: number; minLen?: number }) {
  const pid = `hatch-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const len = Math.max(minLen, ...rows.map((r) => (r.vals ?? r.bus ?? []).length));
  const nameW = 14 + 7.4 * Math.max(3, ...rows.map((r) => r.name.length));
  const ROW = 34;
  const HI = 7;
  const LO = 26;
  const W = nameW + len * unit + 8;
  const H = rows.length * ROW + 18;
  const x = (t: number) => nameW + t * unit;
  const every = tickEvery ?? (unit >= 18 ? 1 : unit >= 8 ? 4 : 10);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="wave-svg" style={{ maxWidth: W * 1.4 }} role="img" aria-label="Timing diagram">
      <defs>
        <pattern id={pid} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--warn)" strokeWidth="1.6" />
        </pattern>
      </defs>
      {Array.from({ length: len + 1 }, (_, t) => (
        <line key={`g${t}`} x1={x(t)} y1={0} x2={x(t)} y2={rows.length * ROW} stroke="var(--border)" strokeWidth={t % every === 0 ? 0.8 : 0.3} />
      ))}
      {cursor !== undefined && cursor >= 0 && cursor < len && <rect x={x(cursor)} y={0} width={unit} height={rows.length * ROW} fill="var(--accent-soft)" />}
      {marks.map((m) => (
        <line key={`m${m}`} x1={x(m)} y1={0} x2={x(m)} y2={rows.length * ROW} stroke="var(--accent)" strokeDasharray="4 3" strokeWidth={1.1} />
      ))}
      {rows.map((r, i) => {
        const y0 = i * ROW;
        const els: ReactNode[] = [];
        const color = r.color ?? "var(--text)";
        if (r.onToggle)
          els.push(<rect key="ed" x={x(0)} y={y0 + 2} width={len * unit} height={ROW - 4} fill="var(--accent-soft)" opacity={0.45} rx={4} />);
        if (r.hidden) {
          els.push(
            <text key="hid" x={x(0) + 8} y={y0 + ROW / 2 + 4} className="wave-tick">
              hidden: predict it, then untick “Hide outputs”
            </text>,
          );
        } else if (r.vals) {
          let pts: string[] = [];
          const flush = (k: string) => {
            if (pts.length) els.push(<polyline key={k} points={pts.join(" ")} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />);
            pts = [];
          };
          let prev: W | undefined;
          r.vals.forEach((v, t) => {
            if (v === null) {
              flush(`p${t}`);
              els.push(<rect key={`x${t}`} x={x(t)} y={y0 + HI} width={unit} height={LO - HI} fill={`url(#${pid})`} stroke="none" />);
            } else {
              const y = y0 + (v ? HI : LO);
              if (prev !== undefined && prev !== null && prev !== v) pts.push(`${x(t)},${y0 + (prev ? HI : LO)}`);
              pts.push(`${x(t)},${y}`, `${x(t + 1)},${y}`);
            }
            prev = v;
          });
          flush("end");
        } else if (r.bus) {
          let t0 = 0;
          for (let t = 1; t <= r.bus.length; t++) {
            if (t < r.bus.length && r.bus[t] === r.bus[t0]) continue;
            const lab = r.bus[t0];
            const xa = x(t0);
            const xb = x(t);
            const mid = y0 + (HI + LO) / 2;
            const k = Math.min(3, (xb - xa) / 3);
            const warn = lab?.startsWith("!");
            els.push(
              <path
                key={`b${t0}`}
                d={`M${xa},${mid} L${xa + k},${y0 + HI} L${xb - k},${y0 + HI} L${xb},${mid} L${xb - k},${y0 + LO} L${xa + k},${y0 + LO} Z`}
                fill={lab === null ? `url(#${pid})` : warn ? "color-mix(in srgb, var(--warn) 30%, transparent)" : "var(--surface)"}
                stroke={warn ? "var(--warn)" : color}
                strokeWidth={1.3}
              />,
            );
            if (lab !== null && xb - xa >= 11)
              els.push(
                <text key={`l${t0}`} x={(xa + xb) / 2} y={mid + 4} textAnchor="middle" className="wave-data">
                  {warn ? lab.slice(1) : lab}
                </text>,
              );
            t0 = t;
          }
        }
        return (
          <g key={r.name + i}>
            <text x={nameW - 8} y={y0 + (HI + LO) / 2 + 4} textAnchor="end" className="wave-name" fill={r.onToggle ? "var(--accent)" : undefined}>
              {r.name}
            </text>
            {els}
            {Array.from({ length: len }, (_, t) => (
              <rect
                key={`c${t}`}
                x={x(t)}
                y={y0}
                width={unit}
                height={ROW}
                fill="transparent"
                style={{ cursor: r.onToggle || onCursor ? "pointer" : undefined }}
                onClick={() => (r.onToggle ? r.onToggle(t) : onCursor?.(t))}
              />
            ))}
          </g>
        );
      })}
      {Array.from({ length: len }, (_, t) =>
        t % every === 0 ? (
          <text key={`k${t}`} x={x(t) + (every === 1 ? unit / 2 : 0)} y={rows.length * ROW + 13} textAnchor="middle" className="wave-tick" style={{ cursor: onCursor ? "pointer" : undefined }} onClick={() => onCursor?.(t)}>
            {t}
          </text>
        ) : null,
      )}
    </svg>
  );
}

const flip = <T extends W>(arr: T[], t: number): T[] => arr.map((v, i) => (i === t ? ((v ? 0 : 1) as T) : v));
const toBits = (s: string): W[] => [...s].map((c) => (c === "1" ? 1 : 0));
const risingAt = (c: W[], t: number) => t > 0 && c[t - 1] === 0 && c[t] === 1;
const fallingAt = (c: W[], t: number) => t > 0 && c[t - 1] === 1 && c[t] === 0;
const edgesOf = (c: W[], neg = false) => c.flatMap((_, t) => ((neg ? fallingAt(c, t) : risingAt(c, t)) ? [t] : []));
const fmtW = (v: W | undefined) => (v === null || v === undefined ? "?" : String(v));

// Behavioural models (one value per time unit; a flip-flop samples its inputs in the unit just before the edge).
function simSr(S: W[], R: W[], E?: W[]): W[] {
  let q: W = null;
  return S.map((s, t) => {
    if (!E || E[t] === 1) {
      if (s && !R[t]) q = 1;
      else if (!s && R[t]) q = 0;
      else if (s && R[t]) q = null;
    }
    return q;
  });
}
function simDLatch(D: W[], E: W[], activeLow = false): W[] {
  let q: W = null;
  return D.map((d, t) => {
    if (E[t] === (activeLow ? 0 : 1)) q = d;
    return q;
  });
}
function simDff(D: W[], C: W[], neg = false): W[] {
  let q: W = null;
  return D.map((_, t) => {
    if (neg ? fallingAt(C, t) : risingAt(C, t)) q = D[t - 1];
    return q;
  });
}
function simJk(J: W[], K: W[], C: W[]): W[] {
  let q: W = null;
  return J.map((_, t) => {
    if (risingAt(C, t)) {
      const j = J[t - 1];
      const k = K[t - 1];
      if (j && k) q = q === null ? null : q ? 0 : 1;
      else if (j) q = 1;
      else if (k) q = 0;
    }
    return q;
  });
}

// ---------------------------------------------------------------------------------------------
// 1. SR latch from cross-coupled NOR (or NAND) gates, simulated one gate delay at a time.

type Form = "nor" | "nand";
type LatchCmd = "hold" | "set" | "reset" | "invalid";
interface LatchUnit {
  s: Bit;
  r: Bit;
  q: Bit;
  qn: Bit;
}

/** Classic cross-coupled drawing of the SR latch, wires coloured by value. */
function CrossLatchSvg({ form, s, r, q, qn }: { form: Form; s: Bit; r: Bit; q: Bit; qn: Bit }) {
  const gate = (x0: number, yc: number) => {
    const y0 = yc - 22;
    const y1 = yc + 22;
    const body =
      form === "nor"
        ? `M${x0},${y0} Q${x0 + 14},${yc} ${x0},${y1} Q${x0 + 34},${y1} ${x0 + 56},${yc} Q${x0 + 34},${y0} ${x0},${y0} Z`
        : `M${x0},${y0} L${x0 + 30},${y0} A22,22 0 0 1 ${x0 + 30},${y1} L${x0},${y1} Z`;
    return (
      <g>
        <path d={body} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
        <circle cx={x0 + 59} cy={yc} r={4} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.6} />
      </g>
    );
  };
  const w = (pts: number[][], v: Bit, k: string) => <polyline key={k} points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={valColor(v)} strokeWidth={2.4} strokeLinejoin="round" />;
  const topIn = form === "nor" ? r : s;
  const botIn = form === "nor" ? s : r;
  const topName = form === "nor" ? "R" : "S'";
  const botName = form === "nor" ? "S" : "R'";
  const lab = (x: number, y: number, t: string, v: Bit, anchor: "start" | "end" = "end") => (
    <g>
      <text x={x} y={y + 4} textAnchor={anchor} className="cir-label">
        {t}
      </text>
      <rect x={anchor === "end" ? x + 4 : x - 22} y={y - 8} width={16} height={16} rx={4} fill={v ? "var(--good)" : "var(--surface)"} stroke={valColor(v)} />
      <text x={anchor === "end" ? x + 12 : x - 14} y={y + 4} textAnchor="middle" className="cir-bit" fill={v ? "var(--surface)" : "var(--text)"}>
        {v}
      </text>
    </g>
  );
  // Top gate drives Q, bottom gate drives Q'. Gate inputs at yc-11 and yc+11.
  return (
    <svg viewBox="0 0 360 190" className="viz-svg" style={{ maxWidth: 420 }} role="img" aria-label="Cross-coupled SR latch">
      {w([[44, 49], [150, 49]], topIn, "ti")}
      {w([[44, 141], [150, 141]], botIn, "bi")}
      {/* Q -> bottom gate upper input; Q' -> top gate lower input (the cross) */}
      {w([[214, 60], [300, 60]], q, "qo")}
      {w([[234, 60], [234, 88], [126, 108], [126, 129], [150, 129]], q, "qf")}
      {w([[214, 130], [300, 130]], qn, "qno")}
      {w([[246, 130], [246, 104], [136, 82], [136, 71], [150, 71]], qn, "qnf")}
      <circle cx={234} cy={60} r={3} fill={valColor(q)} />
      <circle cx={246} cy={130} r={3} fill={valColor(qn)} />
      {gate(150, 60)}
      {gate(150, 130)}
      {lab(24, 49, topName, topIn)}
      {lab(24, 141, botName, botIn)}
      {lab(334, 60, "Q", q, "start")}
      {lab(334, 130, "Q'", qn, "start")}
      <text x={180} y={24} textAnchor="middle" className="cir-pin">
        {form === "nor" ? "NOR" : "NAND"}
      </text>
    </svg>
  );
}

function SrLatchViz() {
  const [form, setForm] = useState<Form>("nor");
  const [race, setRace] = useState<"equal" | "top">("equal");
  const [cmd, setCmd] = useState<LatchCmd>("reset");
  const [hist, setHist] = useState<LatchUnit[]>([{ s: 0, r: 1, q: 0, qn: 1 }]);
  const cur = hist[hist.length - 1];
  // Active-high inputs for NOR; the NAND form uses active-low S', R' (we store the levels on the pins).
  const pins = (c: LatchCmd, f: Form): [Bit, Bit] => {
    const [s, r]: [Bit, Bit] = c === "set" ? [1, 0] : c === "reset" ? [0, 1] : c === "invalid" ? [1, 1] : [0, 0];
    return f === "nor" ? [s, r] : [(1 - s) as Bit, (1 - r) as Bit];
  };
  const gateStep = (f: Form, s: Bit, r: Bit, q: Bit, qn: Bit, mode: "equal" | "top"): [Bit, Bit] => {
    const g = (a: Bit, b: Bit): Bit => (f === "nor" ? ((a | b) ? 0 : 1) : (a & b ? 0 : 1));
    // NOR: Q = NOR(R, Q'), Q' = NOR(S, Q).  NAND: Q = NAND(S', Q'), Q' = NAND(R', Q).
    const nq = f === "nor" ? g(r, qn) : g(s, qn);
    const nqn = f === "nor" ? g(s, mode === "top" ? nq : q) : g(r, mode === "top" ? nq : q);
    return [nq, nqn];
  };
  const apply = (c: LatchCmd, f = form, mode = race, base = hist) => {
    const [s, r] = pins(c, f);
    const last = base[base.length - 1];
    const units: LatchUnit[] = [{ s, r, q: last.q, qn: last.qn }];
    let q = last.q;
    let qn = last.qn;
    for (let k = 0; k < 5; k++) {
      [q, qn] = gateStep(f, s, r, q, qn, mode);
      units.push({ s, r, q, qn });
    }
    setCmd(c);
    setHist([...base, ...units].slice(-30));
  };
  const switchForm = (f: Form) => {
    setForm(f);
    const [s, r] = pins("reset", f);
    setCmd("reset");
    setHist([{ s, r, q: 0, qn: 1 }]);
  };
  const [ns, nr] = [cur.s, cur.r];
  const [q2, qn2] = gateStep(form, ns, nr, cur.q, cur.qn, race);
  const oscillating = q2 !== cur.q || qn2 !== cur.qn;
  const sName = form === "nor" ? "S" : "S'";
  const rName = form === "nor" ? "R" : "R'";
  const tableRows =
    form === "nor"
      ? [
          ["0", "0", "Q", "store"],
          ["0", "1", "0", "reset"],
          ["1", "0", "1", "set"],
          ["1", "1", "?", "undefined"],
        ]
      : [
          ["1", "1", "Q", "store"],
          ["1", "0", "0", "reset"],
          ["0", "1", "1", "set"],
          ["0", "0", "?", "undefined"],
        ];
  const rowIdx = { hold: 0, reset: 1, set: 2, invalid: 3 }[cmd];
  const status = oscillating
    ? { tone: "bad" as const, tex: "**Oscillating**: both gates see the same inputs and switch together every gate delay. With real gates one is slightly faster and wins, so the final state is unpredictable." }
    : cur.q === cur.qn
      ? { tone: "warn" as const, tex: `**Invalid**: $Q = \\overline{Q} = ${cur.q}$, so the outputs are no longer complements.` }
      : cmd === "hold"
        ? { tone: "good" as const, tex: `**Stored**: no input is asserted, yet feedback keeps $Q = ${cur.q}$. This is memory.` }
        : { tone: "good" as const, tex: `**${cmd === "set" ? "Set" : "Reset"}**: $Q = ${cur.q}$, $\\overline{Q} = ${cur.qn}$.` };
  return (
    <VizFrame
      title="SR latch: two gates that remember"
      hint="Pick an input command. Each step of the waveform is one gate delay; wires are green for 1."
      onReset={() => switchForm(form)}
      figure={
        <>
          <CrossLatchSvg form={form} s={cur.s} r={cur.r} q={cur.q} qn={cur.qn} />
          <div style={{ marginTop: 8 }}>
            <LiveWave
              unit={13}
              minLen={30}
              tickEvery={5}
              rows={[
                { name: sName, vals: hist.map((h) => h.s) },
                { name: rName, vals: hist.map((h) => h.r) },
                { name: "Q", vals: hist.map((h) => h.q), color: "var(--accent)" },
                { name: "Q'", vals: hist.map((h) => h.qn), color: "var(--accent)" },
              ]}
            />
          </div>
        </>
      }
      controls={
        <>
          <Choice
            value={form}
            onChange={switchForm}
            options={[
              { v: "nor", label: "NOR latch (active-high S, R)" },
              { v: "nand", label: "NAND latch (active-low S', R')" },
            ]}
          />
          <Choice
            value={cmd}
            onChange={(c) => apply(c)}
            options={[
              { v: "set", label: "Set" },
              { v: "reset", label: "Reset" },
              { v: "hold", label: "Hold (release)" },
              { v: "invalid", label: "Both asserted" },
            ]}
          />
          <Choice
            value={race}
            onChange={setRace}
            options={[
              { v: "equal", label: "Equal gate delays" },
              { v: "top", label: "Q gate slightly faster" },
            ]}
          />
        </>
      }
      readout={
        <>
          <Read label="Inputs" tex={`$${sName} = ${cur.s},\\ ${rName} = ${cur.r}$`} />
          <Read label="Outputs" tex={`$Q = ${cur.q},\\ \\overline{Q} = ${cur.qn}$`} />
          <Read tone={status.tone} tex={status.tex} />
          <TableView head={[sName, rName, "Q+", "function"]} rows={tableRows} highlightRow={rowIdx} />
        </>
      }
      tasks={[
        "Predict: after **Set**, choose **Hold (release)**. Does $Q$ fall back to 0? Explain using the feedback wire from $Q$ into the other gate.",
        "Choose **Both asserted**. What are $Q$ and $\\overline{Q}$? Why does the truth table mark this row undefined (?) even though the outputs are steady?",
        "From **Both asserted**, choose **Hold (release)** with equal delays: watch $Q$ and $\\overline{Q}$ oscillate. Now pick **Q gate slightly faster**, assert both again and release: which state wins, and why can't a designer rely on it?",
        "Switch to the NAND (active-low) latch. Which input levels now set, reset and store, and which pair must be avoided?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. D latch (transparent) vs D flip-flop (edge-triggered) on the same, editable D waveform.

const LVF_CLK = "0011001100110011001100";
const LVF_D = "0110100011100100110110";

function LatchVsFlipFlop() {
  const [d, setD] = useState<W[]>(toBits(LVF_D));
  const [clk, setClk] = useState<W[]>(toBits(LVF_CLK));
  const [lowLatch, setLowLatch] = useState(false);
  const [negFf, setNegFf] = useState(false);
  const [cursor, setCursor] = useState(11);
  const ql = simDLatch(d, clk, lowLatch);
  const qf = simDff(d, clk, negFf);
  const edges = edgesOf(clk, negFf);
  const changes = (a: W[]) => a.reduce((n: number, v, t) => (t > 0 && v !== null && a[t - 1] !== null && v !== a[t - 1] ? n + 1 : n), 0);
  const t = cursor;
  const open = clk[t] === (lowLatch ? 0 : 1);
  const lastEdge = [...edges].reverse().find((e) => e <= t);
  return (
    <VizFrame
      title="Transparent D latch vs edge-triggered D flip-flop"
      hint="Click D (or CLK) cells to edit them. Click a time number to move the cursor. Dashed lines are the flip-flop's active edges; hatching = unknown."
      onReset={() => {
        setD(toBits(LVF_D));
        setClk(toBits(LVF_CLK));
        setLowLatch(false);
        setNegFf(false);
      }}
      figure={
        <LiveWave
          unit={20}
          marks={edges}
          cursor={cursor}
          onCursor={setCursor}
          rows={[
            { name: "CLK", vals: clk, onToggle: (k) => setClk(flip(clk, k)) },
            { name: "D", vals: d, onToggle: (k) => setD(flip(d, k)) },
            { name: "Q latch", vals: ql, color: "var(--accent)" },
            { name: "Q FF", vals: qf, color: "var(--good)" },
          ]}
        />
      }
      controls={
        <>
          <Toggle label="Latch enabled while CLK = 0 (active-low enable)" value={lowLatch} onChange={setLowLatch} />
          <Toggle label="Flip-flop triggers on the falling edge" value={negFf} onChange={setNegFf} />
        </>
      }
      readout={
        <>
          <Read label={`t = ${t}:`} tex={`CLK $= ${fmtW(clk[t])}$, D $= ${fmtW(d[t])}$`} />
          <Read
            tone={open ? "warn" : undefined}
            tex={open ? `Latch **transparent**: $Q = D = ${fmtW(d[t])}$` : `Latch **closed**: holds $Q = ${fmtW(ql[t])}$`}
          />
          <Read
            tex={
              lastEdge === undefined
                ? "Flip-flop: no active edge yet, so $Q$ is unknown"
                : `Flip-flop: $Q = ${fmtW(qf[t])}$, the value of D just before the ${negFf ? "falling" : "rising"} edge at $t = ${lastEdge}$`
            }
          />
          <Read label="Output changes:" tex={`latch **${changes(ql)}**, flip-flop **${changes(qf)}** (flip-flop changes only on dashed lines)`} />
        </>
      }
      tasks={[
        "Predict: put the cursor on $t = 11$. CLK is high and D has just fallen. What do the latch and the flip-flop show? Check.",
        "Add a short 1-pulse to D in the middle of a CLK-high phase (click one cell that is 0 and its neighbour stays 0). Which output copies the pulse and which ignores it?",
        "Make the same short pulse sit just before a rising edge instead. Now what does the flip-flop store, and for how long?",
        "Tick **falling edge**. Which edges does the flip-flop now use, and why does its output change at different times from the latch even with active-low enable?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. D / JK / T / SR flip-flops with a clock button and their tables.

type FfType = "D" | "JK" | "T" | "SR";
interface FfUnit {
  clk: Bit;
  a: Bit;
  b: Bit;
  q: W;
}

function ffNext(type: FfType, a: Bit, b: Bit, q: W): W {
  if (type === "D") return a;
  if (type === "T") return a ? (q === null ? null : q ? 0 : 1) : q;
  if (type === "JK") return a && b ? (q === null ? null : q ? 0 : 1) : a ? 1 : b ? 0 : q;
  return a && b ? null : a ? 1 : b ? 0 : q;
}

const FF_TABLES: Record<FfType, { head: string[]; rows: string[][] }> = {
  D: { head: ["D", "Q+", "function"], rows: [["0", "0", "reset"], ["1", "1", "set"]] },
  T: { head: ["T", "Q+", "function"], rows: [["0", "Q", "hold"], ["1", "Q'", "toggle"]] },
  JK: {
    head: ["J", "K", "Q+", "function"],
    rows: [
      ["0", "0", "Q", "hold"],
      ["0", "1", "0", "reset"],
      ["1", "0", "1", "set"],
      ["1", "1", "Q'", "toggle"],
    ],
  },
  SR: {
    head: ["S", "R", "Q+", "function"],
    rows: [
      ["0", "0", "Q", "hold"],
      ["0", "1", "0", "reset"],
      ["1", "0", "1", "set"],
      ["1", "1", "?", "undefined"],
    ],
  },
};

function FlipFlopTypes() {
  const [type, setType] = useState<FfType>("JK");
  const [a, setA] = useState<Bit>(1);
  const [b, setB] = useState<Bit>(1);
  const [pre, setPre] = useState<Bit>(1);
  const [clr, setClr] = useState<Bit>(1);
  const [q, setQ] = useState<W>(0);
  const [hist, setHist] = useState<FfUnit[]>([{ clk: 0, a: 1, b: 1, q: 0 }]);
  const names = type === "D" ? ["D"] : type === "T" ? ["T"] : type === "JK" ? ["J", "K"] : ["S", "R"];
  const push = (units: FfUnit[]) => setHist((h) => [...h, ...units].slice(-24));
  const setIn = (which: 0 | 1, v: Bit) => {
    const na = which === 0 ? v : a;
    const nb = which === 1 ? v : b;
    setA(na);
    setB(nb);
    push([{ clk: 0, a: na, b: nb, q }]);
  };
  const clock = () => {
    const forced = pre === 0 || clr === 0;
    const nq = forced ? q : ffNext(type, a, b, q);
    setQ(nq);
    push([
      { clk: 1, a, b, q: nq },
      { clk: 0, a, b, q: nq },
    ]);
  };
  const reset = (t: FfType = type) => {
    setType(t);
    setA(1);
    setB(t === "SR" ? 0 : 1);
    setPre(1);
    setClr(1);
    setQ(0);
    setHist([{ clk: 0, a: 1, b: t === "SR" ? 0 : 1, q: 0 }]);
  };
  const tbl = FF_TABLES[type];
  const row = type === "D" || type === "T" ? a : a * 2 + b;
  const next = ffNext(type, a, b, q);
  const qs = q === null ? "?" : String(q);
  const qb = q === null ? "?" : String(1 - q);
  const action = type === "D" ? (a ? "set" : "reset") : type === "T" ? (a ? "toggle" : "hold") : a && b ? (type === "JK" ? "toggle" : "undefined") : a ? "set" : b ? "reset" : "hold";
  const eval_ =
    type === "SR" && a && b
      ? "$S = R = 1$ is not allowed: $Q^+$ undefined"
      : q === null && (action === "toggle" || action === "hold")
        ? `**${action}**, but $Q$ is unknown, so $Q^+$ stays unknown`
        : `table row **${action}** → $Q^+ = ${fmtW(next)}$${action === "toggle" ? ` (was ${qs}, $\\overline{Q} = ${qb}$)` : ""}`;
  const forced = pre === 0 || clr === 0;
  return (
    <VizFrame
      title="Flip-flop types: D, JK, T (and SR)"
      hint="Set the inputs, then press Clock edge (a rising edge). Q changes only at the edge, according to the highlighted table row."
      onReset={() => reset()}
      figure={
        <LiveWave
          unit={16}
          minLen={24}
          tickEvery={4}
          rows={[
            { name: "CLK", vals: hist.map((h) => h.clk) },
            { name: names[0], vals: hist.map((h) => h.a) },
            ...(names[1] ? [{ name: names[1], vals: hist.map((h) => h.b) as W[] }] : []),
            { name: "Q", vals: hist.map((h) => h.q), color: "var(--accent)" },
          ]}
        />
      }
      controls={
        <>
          <Choice value={type} onChange={(t) => reset(t)} options={(["D", "JK", "T", "SR"] as FfType[]).map((t) => ({ v: t, label: `${t} flip-flop` }))} />
          <div className="row" style={{ gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <div className="small muted">inputs</div>
              <BitRow bits={names.length === 1 ? [a] : [a, b]} labels={names} onChange={(v) => (v[0] !== a ? setIn(0, v[0]) : setIn(1, v[1] ?? b))} />
            </div>
            <button className="btn primary small" onClick={clock}>
              ⏵ Clock edge
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="Now" tex={`$Q = ${qs}$`} tone={q === null ? "warn" : undefined} />
          <Read tex={forced ? `$Q = ${qs}$` : `At the next edge: ${eval_}`} tone={forced ? "warn" : "good"} />
          <TableView head={tbl.head} rows={tbl.rows} highlightRow={row} />
        </>
      }
      tasks={[
        "Predict: JK with $J = K = 1$. Press Clock edge four times. What does $Q$ do?",
        "Switch to T. Which T value gives the same behaviour as $J = K = 1$? Which JK input pair gives the same behaviour as $T = 0$?",
        "With the D flip-flop, change D several times without pressing Clock edge. Does $Q$ change? When does it?",
        "Use the JK table for $J = 0, K = 1$ with $Q = 1$: what is $Q$ after the edge? Check against the highlighted row.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Tutorial 8 Q2 style: one pair of inputs and one clock drive five different storage elements.

const TL_CLK = "00110011001100110011";
const TL_IN1 = "01110000110111001101";
const TL_IN2 = "00011010000111000110";

function TimingLab() {
  const [clk, setClk] = useState<W[]>(toBits(TL_CLK));
  const [in1, setIn1] = useState<W[]>(toBits(TL_IN1));
  const [in2, setIn2] = useState<W[]>(toBits(TL_IN2));
  const [hide, setHide] = useState(true);
  const [cursor, setCursor] = useState(7);
  const sr = simSr(in1, in2);
  const esr = simSr(in1, in2, clk);
  const dl = simDLatch(in1, clk);
  const jk = simJk(in1, in2, clk);
  const df = simDff(in1, clk);
  const edges = edgesOf(clk);
  const t = cursor;
  const s = in1[t];
  const r = in2[t];
  const lastEdge = [...edges].reverse().find((e) => e <= t);
  const explain: string[] = [];
  explain.push(`SR latch: S=${fmtW(s)}, R=${fmtW(r)} → ${s && r ? "both asserted: **undefined**" : s ? "set" : r ? "reset" : "hold"}`);
  explain.push(`Enabled SR: E=${fmtW(clk[t])} → ${clk[t] ? (s && r ? "enabled with S=R=1: **undefined**" : s ? "set" : r ? "reset" : "hold") : "disabled, hold"}`);
  explain.push(`D latch: ${clk[t] ? `transparent, Q = in1 = ${fmtW(s)}` : "closed, hold"}`);
  explain.push(lastEdge === undefined ? "Flip-flops: no rising edge yet → unknown" : `Flip-flops: last rising edge at t=${lastEdge}, inputs sampled at t=${lastEdge - 1} (J=${fmtW(in1[lastEdge - 1])}, K=${fmtW(in2[lastEdge - 1])})`);
  return (
    <VizFrame
      title="Five storage elements, one set of inputs"
      hint="Click in1, in2 or CLK cells to edit them. Click a time number to explain that instant. Hatched = undefined (shade it in an exam). All outputs start unknown."
      onReset={() => {
        setClk(toBits(TL_CLK));
        setIn1(toBits(TL_IN1));
        setIn2(toBits(TL_IN2));
      }}
      figure={
        <LiveWave
          unit={20}
          marks={edges}
          cursor={cursor}
          onCursor={setCursor}
          rows={[
            { name: "CLK", vals: clk, onToggle: (k) => setClk(flip(clk, k)) },
            { name: "in1", vals: in1, onToggle: (k) => setIn1(flip(in1, k)) },
            { name: "in2", vals: in2, onToggle: (k) => setIn2(flip(in2, k)) },
            { name: "SR latch", vals: sr, color: "var(--accent)", hidden: hide },
            { name: "En SR latch", vals: esr, color: "var(--accent)", hidden: hide },
            { name: "D latch", vals: dl, color: "var(--accent)", hidden: hide },
            { name: "JK FF", vals: jk, color: "var(--good)", hidden: hide },
            { name: "D FF", vals: df, color: "var(--good)", hidden: hide },
          ]}
        />
      }
      controls={<Toggle label="Hide outputs (sketch them first, as in Tutorial 8 Q2)" value={hide} onChange={setHide} />}
      readout={
        <>
          <Read label={`t = ${t}:`} tex={`CLK $= ${fmtW(clk[t])}$, in1 $= ${fmtW(s)}$, in2 $= ${fmtW(r)}$`} />
          {explain.map((e, i) => (
            <Read key={i} tex={e} />
          ))}
          <Read tex="Wiring: SR latches S = in1, R = in2; D latch and D FF: D = in1; JK FF: J = in1, K = in2; enables/clocks = CLK." />
        </>
      }
      tasks={[
        "With outputs hidden, sketch all five outputs on paper for $t = 0$ to $19$. Then untick **Hide outputs** and mark your errors.",
        "Find a time where in1 = in2 = 1 while CLK = 0. Which latch is undefined there and which one ignores it? Why?",
        "At $t = 14$ (rising edge) the JK flip-flop and the D flip-flop disagree. Explain using $J = K = 1$.",
        "Edit in2 so that it goes high and low again **between** two rising edges. Which outputs react and which do not?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Shift register built from DFFs (serial in; the feedback modes below are not shown in the UI).

type ShiftMode = "serial" | "ring" | "johnson" | "lfsr";
function shiftSpec(mode: ShiftMode): CircuitSpec {
  const fb = mode === "serial" ? "Din" : mode === "ring" ? "Q3" : mode === "johnson" ? "Q3.qn" : "FB";
  const gates: CircuitSpec["gates"] = [];
  if (mode === "lfsr") gates.push({ id: "FB", type: "XOR", in: ["Q3", "Q2"] });
  gates.push({ id: "Q0", type: "DFF", in: [fb, "CLK"] }, { id: "Q1", type: "DFF", in: ["Q0", "CLK"] }, { id: "Q2", type: "DFF", in: ["Q1", "CLK"] }, { id: "Q3", type: "DFF", in: ["Q2", "CLK"] });
  return { inputs: mode === "serial" ? ["Din", "CLK"] : ["CLK"], gates, outputs: ["Q3"] };
}

function ShiftRegisterViz() {
  const [mode, setMode] = useState<ShiftMode>("serial");
  const [din, setDin] = useState<Bit>(1);
  const [state, setState] = useState<Record<string, Bit>>({ Q0: 0, Q1: 0, Q2: 0, Q3: 0 });
  const [hist, setHist] = useState<string[]>(["0000"]);
  const spec = useMemo(() => shiftSpec(mode), [mode]);
  const values = evalCircuit(spec, { Din: din, CLK: 0 }, state);
  const word = (s: Record<string, Bit>) => [3, 2, 1, 0].map((i) => s[`Q${i}`] ?? 0).join("");
  const bitsNow = [3, 2, 1, 0].map((i) => state[`Q${i}`] ?? 0) as Bit[];
  const load = (bits: Bit[]) => {
    const s: Record<string, Bit> = { Q3: bits[0], Q2: bits[1], Q1: bits[2], Q0: bits[3] };
    setState(s);
    setHist([word(s)]);
  };
  const clock = () => {
    const next = clockEdge(spec, values, state);
    setState(next);
    setHist((h) => [...h, word(next)].slice(-40));
  };
  const changeMode = (m: ShiftMode) => {
    setMode(m);
    const start: Bit[] = m === "ring" ? [0, 0, 0, 1] : m === "lfsr" ? [0, 0, 0, 1] : [0, 0, 0, 0];
    load(start);
  };
  // Period: walk the autonomous sequence from the current state (feedback modes only).
  let period: number | null = null;
  if (mode !== "serial") {
    let s = { ...state };
    const seen = new Map<string, number>();
    for (let k = 0; k < 40; k++) {
      const w = word(s);
      if (seen.has(w)) {
        period = k - seen.get(w)!;
        break;
      }
      seen.set(w, k);
      s = clockEdge(spec, evalCircuit(spec, { CLK: 0 }, s), s);
    }
  }
  const recent = hist.slice(-8);
  const serialOut = hist.map((w) => w[0]).join("");
  return (
    <VizFrame
      title="Shift register: a chain of D flip-flops"
      hint="Each Clock edge moves every bit one flip-flop to the right (Din → Q0 → Q1 → Q2 → Q3). Click the bits to load a value."
      onReset={() => changeMode(mode)}
      figure={<CircuitSvg circuit={spec} values={values} />}
      controls={
        <>
          <div className="row" style={{ gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <div className="small muted">state Q3 Q2 Q1 Q0 (click = load)</div>
              <BitRow bits={bitsNow} labels={["Q3", "Q2", "Q1", "Q0"]} onChange={load} />
            </div>
            {mode === "serial" && (
              <div>
                <div className="small muted">serial in</div>
                <BitRow bits={[din]} labels={["Din"]} onChange={(b) => setDin(b[0])} />
              </div>
            )}
            <button className="btn primary small" onClick={clock}>
              ⏵ Clock edge
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="Q3..Q0" tex={`**${word(state)}** $= ${valueOf(bitsNow)}_{10}$`} />
          <Read label="Next edge" tex={`D0 $= ${fmtW(values[mode === "serial" ? "Din" : mode === "ring" ? "Q3" : mode === "johnson" ? "Q3.qn" : "FB"] as W)}$, every other bit takes its left neighbour`} />
          {mode === "serial" ? (
            <Read tex={`Serial out (Q3) so far: **${serialOut}**. A bit entered at Din appears at Q3 after $4$ edges; after $4$ edges all four bits are available in parallel (serial-to-parallel).`} />
          ) : (
            <Read tone="good" tex={period ? `From this state the sequence repeats every **${period}** edges: a mod-${period} counter` : "No repeat found"} />
          )}
          <TableView head={["edge", "Q3 Q2 Q1 Q0"]} rows={recent.map((w, i) => [hist.length - recent.length + i, w])} highlightRow={recent.length - 1} />
        </>
      }
      tasks={[
        "Shift in $1, 0, 1, 1$ (set Din before each edge). After how many edges does the first bit reach Q3? What is the parallel word then?",
        "Load $1010$, set Din = 0 and press Clock edge four times. In what order do the bits leave at Q3 (parallel-to-serial)?",
        "Match each flip-flop to a line of the Lecture 10 shift register `q1 <= y; q2 <= q1; q3 <= q2; q <= q3;`.",
      ]}
    />
  );
}
