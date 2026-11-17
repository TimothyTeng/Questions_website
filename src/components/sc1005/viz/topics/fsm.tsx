"use client";

import { useMemo, useState, type ReactNode } from "react";
import { clockEdge, evalCircuit, minimalCover, productString, type Bit, type Implicant } from "@/lib/sc1005/logic";
import type { CircuitSpec, FsmEdge, FsmState, WaveSignal } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, FsmSvg, KMapSvg, Read, TableView, Toggle, VizFrame, WaveSvg } from "../kit";

// Interactive figures for the fsm lesson, chosen by id (see LessonSection.visuals).
export default function FsmVisual({ id }: { id: string }) {
  switch (id) {
    case "fsm-stepper":
      return <FsmStepper />;
    case "moore-vs-mealy":
      return <MooreVsMealy />;
    case "detector-builder":
      return <DetectorBuilder />;
    case "state-encoding":
      return <StateEncoding />;
    case "circuit-analyser":
      return <CircuitAnalyser />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// A tiny FSM engine: machines are tables, diagrams and waveforms are derived from them.

type Side = "top" | "bottom" | "left" | "right";
interface MState {
  id: string;
  x: number;
  y: number;
  /** Moore output. */
  out?: Bit;
  loop?: Side;
  meaning?: string;
}
interface Machine {
  name: string;
  type: "moore" | "mealy";
  inName: string;
  outName: string;
  states: MState[];
  start: string;
  /** next[state] = [next on input 0, next on input 1] */
  next: Record<string, [string, string]>;
  /** Mealy outputs: mout[state] = [output on 0, output on 1] */
  mout?: Record<string, [Bit, Bit]>;
  /** Curvature overrides keyed "from>to". */
  bend?: Record<string, number>;
  sample?: Bit[];
}

const outOf = (m: Machine, s: string, x: Bit): Bit => (m.type === "moore" ? (m.states.find((q) => q.id === s)?.out ?? 0) : (m.mout?.[s]?.[x] ?? 0));

function diagramOf(m: Machine) {
  const edges: FsmEdge[] = [];
  const index = new Map<string, number>();
  for (const s of m.states)
    for (const x of [0, 1] as Bit[]) {
      const to = m.next[s.id][x];
      const lab = m.type === "mealy" ? `${x}/${outOf(m, s.id, x)}` : String(x);
      const key = `${s.id}>${to}`;
      const at = index.get(key);
      if (at !== undefined) {
        edges[at].label = m.type === "moore" ? "0,1" : `${edges[at].label}, ${lab}`;
        continue;
      }
      index.set(key, edges.length);
      const e: FsmEdge = { from: s.id, to, label: lab };
      if (s.id === to) e.loop = s.loop ?? "top";
      if (m.bend?.[key] !== undefined) e.bend = m.bend[key];
      edges.push(e);
    }
  const states: FsmState[] = m.states.map((s) => ({ id: s.id, x: s.x, y: s.y, label: m.type === "moore" ? `${s.id}/${s.out ?? 0}` : s.id }));
  return { states, edges, edgeIndex: (from: string, to: string) => index.get(`${from}>${to}`) ?? -1 };
}

interface Cycle {
  k: number;
  s: string;
  x: Bit;
  px: Bit;
}
/** One entry per clock cycle: the state during the cycle, its input, and the input of the previous cycle. */
function cyclesOf(m: Machine, xs: Bit[], cur: Bit): Cycle[] {
  const res: Cycle[] = [];
  let s = m.start;
  let px: Bit = 0;
  [...xs, cur].forEach((x, k) => {
    res.push({ k, s, x, px });
    if (k < xs.length) s = m.next[s][x];
    px = x;
  });
  return res;
}

/**
 * Two time units per clock cycle (rising edge at the start). With `late`, x changes at the falling edge
 * (mid-cycle) so the first half of each cycle still shows the previous input.
 */
function wavesFor(rows: { m: Machine; cyc: Cycle[]; tag?: string }[], late: boolean, window = 9): { signals: WaveSignal[]; ticks: string[] } {
  const n = rows[0].cyc.length;
  const from = Math.max(0, n - window);
  const view = (c: Cycle[]) => c.slice(from);
  const first = view(rows[0].cyc);
  const signals: WaveSignal[] = [
    { name: "clk", wave: first.map(() => "10").join("") },
    { name: rows[0].m.inName, wave: first.map((c) => (late ? `${c.px}${c.x}` : `${c.x}${c.x}`)).join("") },
  ];
  for (const r of rows) {
    const cs = view(r.cyc);
    signals.push({ name: `state${r.tag ?? ""}`, wave: cs.map(() => "=.").join(""), data: cs.map((c) => c.s) });
    signals.push({
      name: `${r.m.outName}${r.tag ?? ""}`,
      wave: cs
        .map((c) => {
          if (r.m.type === "moore") return `${outOf(r.m, c.s, c.x)}`.repeat(2);
          return late ? `${outOf(r.m, c.s, c.px)}${outOf(r.m, c.s, c.x)}` : `${outOf(r.m, c.s, c.x)}`.repeat(2);
        })
        .join(""),
    });
  }
  const ticks = first.flatMap((c) => [String(c.k), ""]);
  return { signals, ticks };
}

function stateTable(m: Machine) {
  if (m.type === "moore")
    return {
      head: ["State", `next (${m.inName}=0)`, `next (${m.inName}=1)`, m.outName],
      rows: m.states.map((s) => [s.id, m.next[s.id][0], m.next[s.id][1], s.out ?? 0]),
    };
  return {
    head: ["State", `${m.inName}=0: next/${m.outName}`, `${m.inName}=1: next/${m.outName}`],
    rows: m.states.map((s) => [s.id, `${m.next[s.id][0]}/${outOf(m, s.id, 0)}`, `${m.next[s.id][1]}/${outOf(m, s.id, 1)}`]),
  };
}

function InputControls({ inName, cur, setCur, onClock, onUndo, canUndo, extra }: { inName: string; cur: Bit; setCur: (b: Bit) => void; onClock: (b: Bit) => void; onUndo: () => void; canUndo: boolean; extra?: ReactNode }) {
  return (
    <div className="row" style={{ gap: 6, flexWrap: "wrap", alignItems: "center" }}>
      <span className="small">{inName} =</span>
      <Choice value={cur} onChange={setCur} options={[{ v: 0 as Bit, label: "0" }, { v: 1 as Bit, label: "1" }]} />
      <button className="btn primary small" onClick={() => onClock(cur)}>
        ⏵ Clock edge
      </button>
      <button className="btn small" onClick={() => { setCur(0); onClock(0); }} title={`Set ${inName} = 0 and clock`}>
        Feed 0
      </button>
      <button className="btn small" onClick={() => { setCur(1); onClock(1); }} title={`Set ${inName} = 1 and clock`}>
        Feed 1
      </button>
      <button className="btn small" disabled={!canUndo} onClick={onUndo}>
        Undo
      </button>
      {extra}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Presets

const PULSE3: Machine = {
  name: "3-cycle pulse (lecture)",
  type: "moore",
  inName: "b",
  outName: "x",
  start: "off",
  states: [
    { id: "off", x: 0, y: 0, out: 0, loop: "top", meaning: "idle, waiting for b" },
    { id: "on1", x: 2, y: 0, out: 1, meaning: "1st cycle of the pulse" },
    { id: "on2", x: 2, y: 1, out: 1, meaning: "2nd cycle of the pulse" },
    { id: "on3", x: 0, y: 1, out: 1, meaning: "3rd cycle of the pulse" },
  ],
  next: { off: ["off", "on1"], on1: ["on2", "on2"], on2: ["on3", "on3"], on3: ["off", "off"] },
  sample: [0, 1, 0, 1, 1, 0, 0],
};

const T10: Machine = {
  name: "Tutorial 10: on after 11, off after 00",
  type: "moore",
  inName: "x",
  outName: "z",
  start: "A",
  states: [
    { id: "A", x: 0, y: 0, out: 0, loop: "top", meaning: "off, last input 0" },
    { id: "B", x: 2, y: 0, out: 0, meaning: "off, one 1 seen" },
    { id: "C", x: 2, y: 1, out: 1, loop: "right", meaning: "on" },
    { id: "D", x: 0, y: 1, out: 1, meaning: "on, one 0 seen" },
  ],
  next: { A: ["A", "B"], B: ["A", "C"], C: ["D", "C"], D: ["A", "C"] },
  sample: [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1],
};

const UPDOWN: Machine = {
  name: "Saturating up/down (T = 1 up)",
  type: "moore",
  inName: "T",
  outName: "Y",
  start: "A",
  states: [
    { id: "A", x: 0, y: 0, out: 0, loop: "top", meaning: "lowest" },
    { id: "B", x: 1, y: 0, out: 0 },
    { id: "C", x: 2, y: 0, out: 1 },
    { id: "D", x: 3, y: 0, out: 1, loop: "right", meaning: "highest" },
  ],
  next: { A: ["A", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "D"] },
  sample: [1, 1, 1, 1, 0, 1, 0, 0, 0],
};

const STEPPER_PRESETS = [PULSE3, T10, UPDOWN];

// ---------------------------------------------------------------------------------------------
// 1. Step an FSM through inputs

function FsmStepper() {
  const [pi, setPi] = useState(1);
  const m = STEPPER_PRESETS[pi];
  const [xs, setXs] = useState<Bit[]>([]);
  const [cur, setCur] = useState<Bit>(0);
  const reset = () => {
    setXs([]);
    setCur(0);
  };
  const choose = (i: number) => {
    setPi(i);
    reset();
  };
  const d = useMemo(() => diagramOf(m), [m]);
  const cyc = cyclesOf(m, xs, cur);
  const now = cyc[cyc.length - 1];
  const nxt = m.next[now.s][cur];
  const w = wavesFor([{ m, cyc }], false);
  const tbl = stateTable(m);
  const meaning = m.states.find((s) => s.id === now.s)?.meaning;
  const outs = cyc.slice(1).map((c) => outOf(m, c.s, c.x));
  return (
    <VizFrame
      title="Step a Moore FSM through an input sequence"
      hint={`Set ${m.inName}, then press Clock edge (or Feed 0 / Feed 1 to do both). The blue circle is the current state; the blue arrow is the transition the next edge will take.`}
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <FsmSvg states={d.states} edges={d.edges} initial={m.start} active={now.s} activeEdge={d.edgeIndex(now.s, nxt)} />
          <WaveSvg signals={w.signals} ticks={w.ticks} cursor={(cyc.length - 1 - Math.max(0, cyc.length - 9)) * 2} />
        </div>
      }
      controls={
        <>
          <Choice value={pi} onChange={choose} options={STEPPER_PRESETS.map((p, i) => ({ v: i, label: p.name }))} />
          <InputControls
            inName={m.inName}
            cur={cur}
            setCur={setCur}
            onClock={(b) => setXs((h) => [...h, b])}
            onUndo={() => setXs((h) => h.slice(0, -1))}
            canUndo={xs.length > 0}
            extra={
              m.sample && (
                <button className="btn small" onClick={() => setXs(m.sample!)}>
                  Load sample sequence
                </button>
              )
            }
          />
        </>
      }
      readout={
        <>
          <Read label="Cycle" tex={`**${now.k}**, state **${now.s}**${meaning ? ` (${meaning})` : ""}`} />
          <Read label="Output" tex={`$${m.outName} = ${outOf(m, now.s, cur)}$ (Moore: read from the state, ignores $${m.inName}$)`} tone={outOf(m, now.s, cur) ? "good" : undefined} />
          <Read label="Next edge" tex={`with $${m.inName} = ${cur}$: ${now.s} → **${nxt}** (if $${m.inName} = ${1 - cur}$: ${m.next[now.s][(1 - cur) as Bit]})`} />
          <Read label="Inputs so far" tex={xs.length ? xs.join(", ") : "none"} />
          <Read label="Outputs after each edge" tex={outs.length ? outs.join(", ") : "none"} />
          <TableView head={tbl.head} rows={tbl.rows} highlightRow={m.states.findIndex((s) => s.id === now.s)} />
        </>
      }
      tasks={[
        "Predict: in the Tutorial 10 machine, starting in A, what is the shortest input sequence that makes $z = 1$? Feed it and check.",
        "Load the sample sequence (the Tutorial 10 sequence 0,1,0,1,1,0,1,1,0,0,0,1,0,1,1). Read the outputs after each edge and compare with your hand trace.",
        "In the 3-cycle pulse machine, feed b = 1 in on1, on2 and on3. Does b matter there? Explain using the unlabelled (0,1) arrows.",
        "In the up/down machine, find a state where both inputs lead somewhere different from the Tutorial 10 machine. Why are the two machines different even though both have four states with outputs 0, 0, 1, 1?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Sequence detector construction (used by two figures)

const lps = (s: string, P: string, max: number) => {
  for (let k = Math.min(max, s.length); k > 0; k--) if (s.endsWith(P.slice(0, k))) return k;
  return 0;
};

function detector(P: string, type: "moore" | "mealy", overlap: boolean): Machine {
  const n = P.length;
  const count = type === "moore" ? n + 1 : n;
  const states: MState[] = Array.from({ length: count }, (_, i) => ({
    id: `S${i}`,
    x: i,
    y: 0,
    out: (type === "moore" && i === n ? 1 : 0) as Bit,
    loop: "top" as Side,
    meaning: i === 0 ? "nothing useful seen" : i === n ? `${P} detected` : `seen "${P.slice(0, i)}"`,
  }));
  const next: Record<string, [string, string]> = {};
  const mout: Record<string, [Bit, Bit]> = {};
  for (let i = 0; i < count; i++) {
    const pair = ([0, 1] as Bit[]).map((b) => {
      if (type === "mealy") {
        if (i === n - 1 && P[i] === String(b)) return { to: overlap ? lps(P.slice(1), P, n - 1) : 0, out: 1 as Bit };
        return { to: lps(P.slice(0, i) + b, P, n - 1), out: 0 as Bit };
      }
      if (i === n && !overlap) return { to: P[0] === String(b) ? 1 : 0, out: 0 as Bit };
      return { to: lps(P.slice(0, i) + b, P, n), out: 0 as Bit };
    });
    next[`S${i}`] = [`S${pair[0].to}`, `S${pair[1].to}`];
    mout[`S${i}`] = [pair[0].out, pair[1].out];
  }
  const bend: Record<string, number> = {};
  for (let i = 0; i < count; i++)
    for (const t of next[`S${i}`]) {
      const j = Number(t.slice(1));
      if (i - j >= 2) bend[`S${i}>${t}`] = 0.3;
    }
  return { name: `${type} ${P}`, type, inName: "x", outName: "z", start: "S0", states, next, mout: type === "mealy" ? mout : undefined, bend };
}

// ---------------------------------------------------------------------------------------------
// 2. Moore vs Mealy timing

const MM_PATTERNS = ["11", "101", "110"];

function MooreVsMealy() {
  const [pat, setPat] = useState("11");
  const [late, setLate] = useState(false);
  const [xs, setXs] = useState<Bit[]>([]);
  const [cur, setCur] = useState<Bit>(0);
  const mo = useMemo(() => detector(pat, "moore", true), [pat]);
  const me = useMemo(() => detector(pat, "mealy", true), [pat]);
  const dMo = useMemo(() => diagramOf(mo), [mo]);
  const dMe = useMemo(() => diagramOf(me), [me]);
  const reset = () => {
    setXs([]);
    setCur(0);
  };
  const cMo = cyclesOf(mo, xs, cur);
  const cMe = cyclesOf(me, xs, cur);
  const nowMo = cMo[cMo.length - 1];
  const nowMe = cMe[cMe.length - 1];
  const w = wavesFor(
    [
      { m: mo, cyc: cMo, tag: " Moore" },
      { m: me, cyc: cMe, tag: " Mealy" },
    ],
    late,
  );
  const firstMe = cMe.find((c) => outOf(me, c.s, c.x) === 1);
  const firstMo = cMo.find((c) => outOf(mo, c.s, c.x) === 1);
  const zMe = outOf(me, nowMe.s, cur);
  const zMo = outOf(mo, nowMo.s, cur);
  return (
    <VizFrame
      title="Moore vs Mealy: same detector, different timing"
      hint="Both machines receive the same x. Set x and clock. The highlighted arrows are the transitions the next edge will take; a Mealy arrow's label shows the output right now."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 8, alignItems: "center" }}>
            <div>
              <div className="small muted">Moore ({mo.states.length} states)</div>
              <FsmSvg states={dMo.states} edges={dMo.edges} initial="S0" active={nowMo.s} activeEdge={dMo.edgeIndex(nowMo.s, mo.next[nowMo.s][cur])} />
            </div>
            <div>
              <div className="small muted">Mealy ({me.states.length} states)</div>
              <FsmSvg states={dMe.states} edges={dMe.edges} initial="S0" active={nowMe.s} activeEdge={dMe.edgeIndex(nowMe.s, me.next[nowMe.s][cur])} />
            </div>
          </div>
          <WaveSvg signals={w.signals} ticks={w.ticks} />
        </div>
      }
      controls={
        <>
          <Choice value={pat} onChange={(p) => { setPat(p); reset(); }} options={MM_PATTERNS.map((p) => ({ v: p, label: `detect ${p}` }))} />
          <Toggle label="x changes at the falling edge (mid-cycle)" value={late} onChange={setLate} />
          <InputControls inName="x" cur={cur} setCur={setCur} onClock={(b) => setXs((h) => [...h, b])} onUndo={() => setXs((h) => h.slice(0, -1))} canUndo={xs.length > 0} />
        </>
      }
      readout={
        <>
          <Read label="Moore now" tex={`state ${nowMo.s}, $z = ${zMo}$ (depends on the state only)`} tone={zMo ? "good" : undefined} />
          <Read label="Mealy now" tex={`state ${nowMe.s}, x = ${cur}, $z = ${zMe}$ (state **and** input)`} tone={zMe ? "good" : undefined} />
          <Read
            label="First detection"
            tex={
              firstMe
                ? `Mealy in cycle **${firstMe.k}**${firstMo ? `, Moore in cycle **${firstMo.k}** (one cycle later)` : ", Moore will follow after the next edge"}`
                : `none yet: feed the pattern ${pat}`
            }
          />
          <Read label="States" tex={`Moore needs $n+1 = ${mo.states.length}$, Mealy $n = ${me.states.length}$ for a ${pat.length}-bit pattern`} />
          {late && <Read tone="warn" tex="With mid-cycle input changes the Mealy output changes mid-cycle too, and in the first half of a cycle it is computed from the **old** input (a possible false output). The Moore output still changes only after edges." />}
        </>
      }
      tasks={[
        "Predict: for **detect 11**, feed 0, 1, 1. In which cycle does each z first become 1? Check the waveform.",
        "Feed 1, 1, 1, 1. How long does each output stay high? Why does the Moore machine need a state (S2) that the Mealy machine does not?",
        "Switch on **x changes at the falling edge** and repeat. Find a half-cycle where the Mealy z is 1 although the pattern was not completed. Explain using $z = \\lambda(S, x)$.",
        "Choose **detect 101** and feed 1, 0, 1, 0, 1. Both machines detect the overlapping second 101: which arrow makes that possible?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Sequence detector builder

const TEST_STREAM: Bit[] = [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];

function DetectorBuilder() {
  const [pbits, setPbits] = useState<Bit[]>([1, 0, 1, 1]);
  const [type, setType] = useState<"moore" | "mealy">("moore");
  const [overlap, setOverlap] = useState(true);
  const [xs, setXs] = useState<Bit[]>([]);
  const P = pbits.join("");
  const m = useMemo(() => detector(P, type, overlap), [P, type, overlap]);
  const d = useMemo(() => diagramOf(m), [m]);
  const setLen = (n: number) => {
    setPbits((b) => (n <= b.length ? b.slice(0, n) : [...b, ...(Array(n - b.length).fill(0) as Bit[])]));
    setXs([]);
  };
  const cyc = cyclesOf(m, xs, 0);
  const now = cyc[cyc.length - 1];
  // Detection flags per fed input: Mealy fires on the arrow taken, Moore when the state after the edge outputs 1.
  const hits = xs.map((x, k) => (type === "mealy" ? outOf(m, cyc[k].s, x) : outOf(m, cyc[k + 1].s, 0)) === 1);
  const n = P.length;
  const after = type === "mealy" ? m.next[`S${n - 1}`][Number(P[n - 1]) as Bit] : null;
  const ov = lps(P.slice(1), P, n - 1);
  const k = Math.ceil(Math.log2(m.states.length));
  const tbl = stateTable(m);
  return (
    <VizFrame
      title="Build a sequence detector"
      hint="Click the pattern bits to edit them, choose Moore or Mealy and overlapping or not; the diagram is rebuilt automatically. Then feed bits and watch detections."
      onReset={() => setXs([])}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <FsmSvg states={d.states} edges={d.edges} initial="S0" active={now.s} />
          <div className="row" style={{ gap: 3, flexWrap: "wrap" }}>
            {xs.map((x, i) => (
              <span
                key={i}
                className="small"
                title={hits[i] ? "pattern completed here" : undefined}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  padding: "1px 6px",
                  borderRadius: 5,
                  border: "1px solid var(--border)",
                  background: hits[i] ? "var(--good)" : "var(--surface)",
                  color: hits[i] ? "var(--surface)" : "var(--text)",
                  fontWeight: 700,
                }}
              >
                {x}
              </span>
            ))}
            {!xs.length && <span className="small muted">Fed bits appear here; green = the bit that completes a detection.</span>}
          </div>
        </div>
      }
      controls={
        <>
          <div className="row" style={{ gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span className="small">Pattern</span>
            <BitRow bits={pbits} onChange={(b) => { setPbits(b); setXs([]); }} />
            <Choice value={pbits.length} onChange={setLen} options={[2, 3, 4, 5].map((v) => ({ v, label: `${v} bits` }))} />
          </div>
          <Choice value={type} onChange={(t) => { setType(t); setXs([]); }} options={[{ v: "moore", label: "Moore" }, { v: "mealy", label: "Mealy" }]} />
          <Toggle label="Overlapping detections allowed" value={overlap} onChange={(v) => { setOverlap(v); setXs([]); }} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <button className="btn small" onClick={() => setXs((h) => [...h, 0])}>Feed 0</button>
            <button className="btn small" onClick={() => setXs((h) => [...h, 1])}>Feed 1</button>
            <button className="btn small" disabled={!xs.length} onClick={() => setXs((h) => h.slice(0, -1))}>Undo</button>
            <button className="btn small" onClick={() => setXs(TEST_STREAM)}>Feed test stream</button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="States" tex={`**${m.states.length}** (${type === "moore" ? "n + 1" : "n"} for an ${n}-bit pattern) → **${k}** flip-flops in binary`} />
          <Read label="Detections" tex={`**${hits.filter(Boolean).length}** in ${xs.length} bits`} tone={hits.some(Boolean) ? "good" : undefined} />
          <Read
            label="After a match"
            tex={
              overlap
                ? `go to S${ov}: the longest proper suffix of ${P} that is also a prefix is ${ov ? `"${P.slice(0, ov)}"` : "empty"}${type === "moore" ? " (then add the new bit)" : ""}`
                : `start afresh${type === "moore" ? ": from the detect state, behave like S0" : `: S${n - 1} → ${after} on the completing bit`}`
            }
          />
          <TableView head={["State", "meaning", ...tbl.head.slice(1)]} rows={tbl.rows.map((r, i) => [r[0], m.states[i].meaning ?? "", ...r.slice(1)])} highlightRow={m.states.findIndex((s) => s.id === now.s)} />
        </>
      }
      tasks={[
        "Predict: for **1011** overlapping, which state follows the detect state on input 1? On input 0? Check the arrows leaving S4.",
        "Feed the test stream with overlapping on, then off. Count the detections each time and find the bits that are shared between two overlapping matches.",
        "Set the pattern to **110**. From S2 (seen 11), where does a further 1 go? Why would going back to S0 be wrong for the input 1110?",
        "Switch between Moore and Mealy for the same pattern. Which arrows change, and why does the Mealy version never need the detect state?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. State encoding comparison

const DET11 = detector("11", "moore", true);
DET11.name = "11 detector (3 states)";
const DET101 = detector("101", "moore", true);
DET101.name = "101 detector (4 states)";
const DET1011 = detector("1011", "moore", false);
DET1011.name = "1011 non-overlap (5 states)";
const ENC_PRESETS: Machine[] = [{ ...T10, name: "Tutorial 10 (4 states)" }, { ...PULSE3, name: "3-cycle pulse (4 states)" }, DET11, DET101, DET1011];

const bitCount = (x: number) => x.toString(2).replace(/0/g, "").length;
const gray = (i: number) => i ^ (i >> 1);
const toBits = (v: number, k: number) => v.toString(2).padStart(k, "0");

function sopOf(cover: Implicant[], vars: string[], ones: number) {
  if (!ones) return { expr: "0", lits: 0, terms: [] as string[] };
  const full = (1 << vars.length) - 1;
  if (cover.some((p) => p.mask === full)) return { expr: "1", lits: 0, terms: [] as string[] };
  const terms = cover.map((p) => productString(p, vars));
  return { expr: terms.join(" + "), lits: cover.reduce((s, p) => s + vars.length - bitCount(p.mask), 0), terms };
}

function StateEncoding() {
  const [pi, setPi] = useState(0);
  const [enc, setEnc] = useState<"binary" | "gray" | "onehot" | "custom">("binary");
  const m = ENC_PRESETS[pi];
  const mCount = m.states.length;
  const k = Math.max(1, Math.ceil(Math.log2(mCount)));
  const [custom, setCustom] = useState<number[]>(() => ENC_PRESETS[0].states.map((_, i) => i));
  const [bit, setBit] = useState(0);
  const choose = (i: number) => {
    setPi(i);
    setCustom(ENC_PRESETS[i].states.map((_, j) => j));
    setBit(0);
  };
  const codes = m.states.map((_, i) => (enc === "gray" ? gray(i) : enc === "custom" ? (custom[i] ?? i) : i));
  const dup = new Set(codes).size !== codes.length;
  const qVars = Array.from({ length: k }, (_, j) => `Q${k - 1 - j}`);
  const vars = [...qVars, "x"];

  // Code-based equations.
  const eq = (() => {
    if (enc === "onehot" || dup) return null;
    const used = new Set(codes);
    const nextBits: { name: string; values: string; expr: string; lits: number; terms: string[] }[] = [];
    for (let b = 0; b < k; b++) {
      let values = "";
      const ones: number[] = [];
      const dcs: number[] = [];
      for (let mm = 0; mm < 1 << (k + 1); mm++) {
        const c = mm >> 1;
        const x = (mm & 1) as Bit;
        if (!used.has(c)) {
          values += "x";
          dcs.push(mm);
          continue;
        }
        const s = m.states[codes.indexOf(c)].id;
        const nc = codes[m.states.findIndex((q) => q.id === m.next[s][x])];
        const v = (nc >> (k - 1 - b)) & 1;
        values += String(v);
        if (v) ones.push(mm);
      }
      const r = sopOf(minimalCover(k + 1, ones, dcs), vars, ones.length);
      nextBits.push({ name: `D${k - 1 - b}`, values, ...r });
    }
    const zOnes: number[] = [];
    const zDcs: number[] = [];
    let zValues = "";
    for (let c = 0; c < 1 << k; c++) {
      if (!used.has(c)) {
        zDcs.push(c);
        zValues += "x";
        continue;
      }
      const o = m.states[codes.indexOf(c)].out ?? 0;
      zValues += String(o);
      if (o) zOnes.push(c);
    }
    const z = sopOf(minimalCover(k, zOnes, zDcs), qVars, zOnes.length);
    return { nextBits, z: { ...z, values: zValues } };
  })();

  // One-hot equations by inspection.
  const oneHot = useMemo(() => {
    const lines = m.states.map((t) => {
      const terms: string[] = [];
      for (const s of m.states) {
        const conds = ([0, 1] as Bit[]).filter((x) => m.next[s.id][x] === t.id);
        if (conds.length === 2) terms.push(s.id);
        else if (conds.length === 1) terms.push(`${s.id}${conds[0] ? "x" : "x'"}`);
      }
      return { name: `D_${t.id}`, expr: terms.join(" + ") || "0", lits: terms.reduce((a, s) => a + (s.endsWith("x") || s.endsWith("x'") ? 2 : 1), 0) };
    });
    const zs = m.states.filter((s) => s.out).map((s) => s.id);
    return { lines, z: zs.join(" + ") || "0", zl: zs.length };
  }, [m]);

  const flops = enc === "onehot" ? mCount : k;
  const unused = enc === "onehot" ? 2 ** mCount - mCount : 2 ** k - mCount;
  const totalLits = enc === "onehot" ? oneHot.lines.reduce((s, l) => s + l.lits, 0) + oneHot.zl : eq ? eq.nextBits.reduce((s, b) => s + b.lits, 0) + eq.z.lits : 0;
  const codeStr = (i: number) => (enc === "onehot" ? toBits(1 << i, mCount) : toBits(codes[i], k));
  const sel = eq?.nextBits[Math.min(bit, k - 1)];

  const tableRows = m.states.flatMap((s, i) =>
    ([0, 1] as Bit[]).map((x) => {
      const ni = m.states.findIndex((q) => q.id === m.next[s.id][x]);
      return [s.id, codeStr(i), x, `${m.next[s.id][x]} = ${codeStr(ni)}`, s.out ?? 0];
    }),
  );
  return (
    <VizFrame
      title="State encoding: flip-flops versus logic"
      hint="Pick a machine and an encoding (or set your own codes). Unused codes become don't-cares (x) in the K-maps; equations are minimised live."
      onReset={() => {
        setEnc("binary");
        choose(pi);
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          {sel ? (
            <>
              <div className="small muted">
                K-map of {sel.name} (the next value of {sel.name.replace("D", "Q")}) over ({vars.join(", ")})
              </div>
              <KMapSvg vars={vars} values={sel.values} groups={sel.terms} showIndex />
            </>
          ) : (
            <div className="small muted" style={{ padding: 8 }}>
              {dup ? "Two states share a code: every state needs a unique code." : "One-hot: no K-map needed. Each D equation is read straight off the arrows entering that state."}
            </div>
          )}
          <TableView head={["State", "code", m.inName, "next = code", m.outName]} rows={tableRows} />
        </div>
      }
      controls={
        <>
          <Choice value={pi} onChange={choose} options={ENC_PRESETS.map((p, i) => ({ v: i, label: p.name }))} />
          <Choice
            value={enc}
            onChange={setEnc}
            options={[
              { v: "binary", label: "Binary" },
              { v: "gray", label: "Gray" },
              { v: "onehot", label: "One-hot" },
              { v: "custom", label: "Custom" },
            ]}
          />
          {enc === "custom" && (
            <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
              {m.states.map((s, i) => (
                <label key={s.id} className="small">
                  {s.id}{" "}
                  <select value={custom[i] ?? i} onChange={(e) => setCustom((c) => m.states.map((_, j) => (j === i ? Number(e.target.value) : (c[j] ?? j))))}>
                    {Array.from({ length: 2 ** k }, (_, v) => (
                      <option key={v} value={v}>
                        {toBits(v, k)}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          )}
          {eq && k > 1 && <Choice value={Math.min(bit, k - 1)} onChange={setBit} options={eq.nextBits.map((b, i) => ({ v: i, label: `K-map ${b.name}` }))} />}
        </>
      }
      readout={
        <>
          <Read label="Flip-flops" tex={`**${flops}** ${enc === "onehot" ? `(one per state, m = ${mCount})` : `$= \\lceil \\log_2 ${mCount} \\rceil$`}`} />
          <Read label="Unused codes" tex={`$${enc === "onehot" ? `2^{${mCount}} - ${mCount}` : `2^{${k}} - ${mCount}`} = ${unused}$${enc !== "onehot" && unused > 0 ? ` (${Array.from({ length: 2 ** k }, (_, v) => v).filter((v) => !codes.includes(v)).map((v) => toBits(v, k)).join(", ")})` : ""}`} />
          {enc === "onehot"
            ? oneHot.lines.map((l) => <Read key={l.name} tex={`$${l.name.replace("_", "_{")}}$ = ${l.expr}`} />)
            : eq?.nextBits.map((b) => <Read key={b.name} tex={`$${b.name.replace(/(\d)/, "_$1")}$ = **${b.expr}**`} />)}
          {enc === "onehot" ? <Read tex={`${m.outName} = ${oneHot.z}`} /> : eq && <Read tex={`${m.outName} = **${eq.z.expr}**`} />}
          {!dup && <Read label="Logic size" tex={`about **${totalLits}** literals in the next-state and output equations`} tone="good" />}
        </>
      }
      tasks={[
        "Predict: the Tutorial 10 machine in binary order gives a two-term, six-literal $D_0$. Try Custom with A = 00, B = 01, C = 11, D = 10. What do $D_0$ and z become, and what does Q0 now remember?",
        "Choose the **1011 non-overlap** machine (5 states). How many flip-flops do binary and one-hot need, and how many codes are unused in each?",
        "For the **11 detector** (3 states), find the unused code in the K-map and check whether the minimal $D_1$ uses it as a 1 or a 0.",
        "Compare the literal count of binary, Gray and one-hot for the 3-cycle pulse machine. Which wins on flip-flops and which on logic?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Circuit → state table → diagram

interface CircuitPreset {
  name: string;
  circuit: CircuitSpec;
  ffs: string[];
  inName: string;
  outName: string;
  type: "moore" | "mealy";
  eqs: string[];
  /** A claimed diagram to check: claimed[code] = [next on 0, next on 1, output (Moore)] */
  claimed?: Record<string, [string, string, Bit]>;
}

const CIRCUITS: CircuitPreset[] = [
  {
    name: "Circuit 1 (PYP style, Moore)",
    circuit: {
      inputs: ["X", "CLK"],
      gates: [
        { id: "S1", type: "DFF", in: ["D1", "CLK"] },
        { id: "S0", type: "DFF", in: ["D0", "CLK"] },
        { id: "D1", type: "AND", in: ["S0", "!X"] },
        { id: "D0", type: "XOR", in: ["X", "S1"] },
        { id: "out", type: "XNOR", in: ["S1", "S0"] },
      ],
      outputs: ["out"],
    },
    ffs: ["S1", "S0"],
    inName: "X",
    outName: "out",
    type: "moore",
    eqs: ["D1 = S0·X'", "D0 = X ⊕ S1", "out = (S1 ⊕ S0)'"],
    claimed: { "00": ["00", "01", 1], "01": ["10", "01", 0], "10": ["01", "01", 0], "11": ["11", "00", 1] },
  },
  {
    name: "Circuit 2 (Mealy)",
    circuit: {
      inputs: ["x", "CLK"],
      gates: [
        { id: "A", type: "DFF", in: ["DA", "CLK"] },
        { id: "B", type: "DFF", in: ["DB", "CLK"] },
        { id: "DA", type: "XOR", in: ["B", "x"] },
        { id: "DB", type: "AND", in: ["A.qn", "x"] },
        { id: "z", type: "AND", in: ["A", "B.qn", "!x"] },
      ],
      outputs: ["z"],
    },
    ffs: ["A", "B"],
    inName: "x",
    outName: "z",
    type: "mealy",
    eqs: ["DA = B ⊕ x", "DB = A'·x", "z = A·B'·x'"],
  },
];

const CODES = ["00", "01", "10", "11"];
const POS: Record<string, [number, number]> = { "00": [0, 0], "01": [2, 0], "10": [0, 1], "11": [2, 1] };

function stateOf(ffs: string[], code: string): Record<string, Bit> {
  return Object.fromEntries(ffs.map((f, i) => [f, Number(code[i]) as Bit]));
}

function CircuitAnalyser() {
  const [pi, setPi] = useState(0);
  const p = CIRCUITS[pi];
  const [code, setCode] = useState("00");
  const [x, setX] = useState<Bit>(0);
  const [showClaim, setShowClaim] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const st = stateOf(p.ffs, code);
  const values = evalCircuit(p.circuit, { [p.inName]: x, CLK: 0 }, st);
  const table = useMemo(
    () =>
      CODES.flatMap((c) =>
        ([0, 1] as Bit[]).map((xi) => {
          const s = stateOf(p.ffs, c);
          const v = evalCircuit(p.circuit, { [p.inName]: xi, CLK: 0 }, s);
          const n = clockEdge(p.circuit, v, s);
          return { c, x: xi, d: p.ffs.map((f) => p.circuit.gates.find((g) => g.id === f)!.in[0]).map((net) => String(v[net])).join(""), next: p.ffs.map((f) => n[f]).join(""), out: (v[p.outName] === 1 ? 1 : 0) as Bit };
        }),
      ),
    [p],
  );
  const derived: Machine = useMemo(() => {
    const row = (c: string, xi: Bit) => table.find((r) => r.c === c && r.x === xi)!;
    return {
      name: "derived",
      type: p.type,
      inName: p.inName,
      outName: p.outName,
      start: "00",
      states: CODES.map((c) => ({ id: c, x: POS[c][0], y: POS[c][1], out: row(c, 0).out, loop: (POS[c][0] === 0 ? "left" : "right") as Side })),
      next: Object.fromEntries(CODES.map((c) => [c, [row(c, 0).next, row(c, 1).next]])) as Record<string, [string, string]>,
      mout: Object.fromEntries(CODES.map((c) => [c, [row(c, 0).out, row(c, 1).out]])) as Record<string, [Bit, Bit]>,
    };
  }, [table, p]);
  const claimedM: Machine | null = p.claimed
    ? {
        ...derived,
        states: derived.states.map((s) => ({ ...s, out: p.claimed![s.id][2] })),
        next: Object.fromEntries(CODES.map((c) => [c, [p.claimed![c][0], p.claimed![c][1]]])) as Record<string, [string, string]>,
      }
    : null;
  const shown = showClaim && claimedM ? claimedM : derived;
  const d = diagramOf(shown);
  const nextCode = derived.next[code][x];
  const mismatches = claimedM
    ? CODES.flatMap((c) => [
        ...([0, 1] as Bit[]).filter((xi) => claimedM.next[c][xi] !== derived.next[c][xi]).map((xi) => `from ${c} on ${p.inName} = ${xi}: claimed ${claimedM.next[c][xi]}, circuit gives ${derived.next[c][xi]}`),
        ...(claimedM.states.find((s) => s.id === c)!.out !== derived.states.find((s) => s.id === c)!.out ? [`output in ${c} is wrong`] : []),
      ])
    : [];
  const clock = () => {
    setLog((l) => [...l.slice(-7), `${code} --${p.inName}=${x}--> ${nextCode}`]);
    setCode(nextCode);
  };
  const choose = (i: number) => {
    setPi(i);
    setCode("00");
    setX(0);
    setLog([]);
    setShowClaim(false);
  };
  const rowIdx = table.findIndex((r) => r.c === code && r.x === x);
  return (
    <VizFrame
      title="From circuit to state table to diagram"
      hint={`Click ${p.inName} on the circuit to toggle it, press Clock edge, or jump to any state. Wires: green = 1. The highlighted arrow is the transition the next edge will take.`}
      onReset={() => choose(pi)}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <CircuitSvg circuit={p.circuit} values={values} onToggleInput={(n) => n === p.inName && setX((v) => (1 - v) as Bit)} />
          <div className="small muted">{showClaim ? "Claimed diagram (to be checked)" : "Diagram derived from the circuit"}</div>
          <FsmSvg states={d.states} edges={d.edges} active={code} activeEdge={d.edgeIndex(code, shown.next[code][x])} />
        </div>
      }
      controls={
        <>
          <Choice value={pi} onChange={choose} options={CIRCUITS.map((c, i) => ({ v: i, label: c.name }))} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn primary small" onClick={clock}>
              ⏵ Clock edge
            </button>
            <span className="small">Jump to</span>
            <Choice value={code} onChange={setCode} options={CODES.map((c) => ({ v: c, label: c }))} />
          </div>
          {p.claimed && <Toggle label="Show the claimed diagram instead" value={showClaim} onChange={setShowClaim} />}
        </>
      }
      readout={
        <>
          {p.eqs.map((e) => (
            <Read key={e} tex={e} />
          ))}
          <Read label="Now" tex={`${p.ffs.join("")} = **${code}**, ${p.inName} = ${x}: D inputs = ${table[rowIdx].d} → next state **${nextCode}**, ${p.outName} = ${values[p.outName] === 1 ? 1 : 0}`} tone="good" />
          <Read label={p.type === "moore" ? "Moore" : "Mealy"} tex={p.type === "moore" ? `${p.outName} uses only the flip-flop outputs` : `${p.outName} has ${p.inName} as a gate input, so it belongs on the arrows`} />
          {showClaim && <Read label="Check" tex={mismatches.length ? mismatches.join("; ") : "matches"} tone={mismatches.length ? "bad" : "good"} />}
          <TableView
            head={[p.ffs.join(""), p.inName, `D (${p.ffs.map((f) => p.circuit.gates.find((g) => g.id === f)!.in[0]).join("")})`, "next", p.outName]}
            rows={table.map((r) => [r.c, r.x, r.d, r.next, r.out])}
            highlightRow={rowIdx}
          />
          {log.length > 0 && <Read label="Trace" tex={log.join(" | ")} />}
        </>
      }
      tasks={[
        "Predict: in Circuit 1, starting in 10 with X = 1, what are D1 and D0? Jump to 10, set X = 1, and check before clocking.",
        "Turn on **Show the claimed diagram**. Find the wrong arrow by comparing it with the table, then say whether the diagram corresponds to the circuit (PYP 2021-22 Q1(9)).",
        "In Circuit 2, put the machine in 10 and toggle x without clocking. Which output changes immediately and why does that make it Mealy?",
        "In Circuit 1, is any state unreachable from 00? Clock from 00 with different inputs and list the states you can reach.",
      ]}
    />
  );
}
