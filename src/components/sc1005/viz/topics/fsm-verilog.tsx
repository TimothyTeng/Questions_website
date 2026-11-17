"use client";

import { useState, type ReactNode } from "react";
import { minimalCover, type Bit, type Implicant } from "@/lib/sc1005/logic";
import type { FsmEdge, FsmState, WaveSignal } from "@/lib/sc1005/types";
import { Choice, FsmSvg, Read, TableView, Toggle, VizFrame, WaveSvg } from "../kit";

// Interactive figures for the fsm-verilog lesson, chosen by id (see LessonSection.visuals).
export default function FsmVerilogVisual({ id }: { id: string }) {
  switch (id) {
    case "verilog-stepper":
      return <VerilogStepper />;
    case "case-vs-assign":
      return <CaseVsAssign />;
    case "output-timing":
      return <OutputTiming />;
    case "traffic-light":
      return <TrafficLight />;
    case "bug-lab":
      return <BugLab />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Shared pieces: a code listing with highlighted lines, and waveform helpers.

type V = Bit | "x";
interface Ctx {
  st: string;
  x: Bit;
  rst: boolean;
  nst: string;
  z: V;
}
interface Line {
  t: string;
  /** Combinational path active right now. */
  hot?: (c: Ctx) => boolean;
  /** Executes at the next clock edge. */
  edge?: (c: Ctx) => boolean;
  note?: (c: Ctx) => string;
}

function CodeView({ lines, ctx }: { lines: Line[]; ctx: Ctx }) {
  return (
    <pre className="code" style={{ fontSize: "0.76rem", lineHeight: 1.45, margin: 0, padding: "8px 6px" }}>
      {lines.map((l, i) => {
        const hot = l.hot?.(ctx);
        const edge = !hot && l.edge?.(ctx);
        const note = l.note?.(ctx);
        return (
          <div
            key={i}
            style={{
              background: hot ? "var(--accent-soft)" : edge ? "color-mix(in srgb, var(--warn) 16%, transparent)" : undefined,
              borderLeft: `3px solid ${hot ? "var(--accent)" : edge ? "var(--warn)" : "transparent"}`,
              paddingLeft: 6,
              minHeight: "1.45em",
            }}
          >
            {l.t}
            {note ? <span style={{ color: "var(--good)", fontWeight: 600 }}>{`  // ${note}`}</span> : null}
          </div>
        );
      })}
    </pre>
  );
}

const Legend = () => (
  <div className="small muted" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <span>
      <span style={{ borderLeft: "3px solid var(--accent)", background: "var(--accent-soft)", padding: "0 6px" }}>blue</span> combinational logic active now
    </span>
    <span>
      <span style={{ borderLeft: "3px solid var(--warn)", background: "color-mix(in srgb, var(--warn) 16%, transparent)", padding: "0 6px" }}>amber</span> runs at the next clock edge
    </span>
  </div>
);

/** Bus wave (one value per cycle, two units per cycle); "x" values are drawn hatched. */
const busWave = (vals: string[]) => vals.map((v) => (v === "x" ? "xx" : "=.")).join("");
const busData = (vals: string[]) => vals.filter((v) => v !== "x");
const bitWave = (vals: V[]) => vals.map((v) => `${v}${v}`).join("");
const ticksFor = (from: number, n: number) => Array.from({ length: n }, (_, i) => [String(from + i), ""]).flat();

function useFeed() {
  const [xs, setXs] = useState<Bit[]>([]);
  const [cur, setCur] = useState<Bit>(0);
  return { xs, setXs, cur, setCur, reset: () => { setXs([]); setCur(0); } };
}

function FeedControls({ name = "x", cur, setCur, onClock, onUndo, canUndo, extra }: { name?: string; cur: Bit; setCur: (b: Bit) => void; onClock: (b: Bit) => void; onUndo: () => void; canUndo: boolean; extra?: ReactNode }) {
  return (
    <div className="row" style={{ gap: 6, flexWrap: "wrap", alignItems: "center" }}>
      <span className="small">{name} =</span>
      <Choice value={cur} onChange={setCur} options={[{ v: 0 as Bit, label: "0" }, { v: 1 as Bit, label: "1" }]} />
      <button className="btn primary small" onClick={() => onClock(cur)}>
        ⏵ Clock edge
      </button>
      <button className="btn small" onClick={() => { setCur(0); onClock(0); }}>
        Feed 0
      </button>
      <button className="btn small" onClick={() => { setCur(1); onClock(1); }}>
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
// 1. Verilog FSM stepper

interface StepPreset {
  name: string;
  type: "moore" | "mealy";
  reset: string;
  inName: string;
  outName: string;
  next: (st: string, x: Bit) => string;
  out: (st: string, x: Bit) => V;
  lines: Line[];
  explain: (c: Ctx) => string;
  diagram: { states: FsmState[]; edges: FsmEdge[] };
}

const T10_NEXT: Record<string, [string, string]> = { A: ["A", "B"], B: ["A", "C"], C: ["D", "C"], D: ["A", "C"] };
const caseNote = (c: Ctx) => `x = ${c.x} → nst = ${c.nst}`;

const STEP_T10: StepPreset = {
  name: "Tutorial 10, case style (Moore)",
  type: "moore",
  reset: "A",
  inName: "x",
  outName: "z",
  next: (st, x) => (st === "x" ? "A" : T10_NEXT[st][x]),
  out: (st) => (st === "x" ? "x" : st === "C" || st === "D" ? 1 : 0),
  lines: [
    { t: "module twoones (input clk, rst, x, output z);" },
    { t: "  localparam A = 2'b00, B = 2'b01, C = 2'b10, D = 2'b11;" },
    { t: "  reg [1:0] st, nst;" },
    { t: "  always @(posedge clk)", edge: () => true },
    { t: "    if (rst) st <= A;", edge: (c) => c.rst, note: (c) => (c.rst ? "next edge: st <= A" : "") },
    { t: "    else     st <= nst;", edge: (c) => !c.rst, note: (c) => (c.rst ? "" : `next edge: st <= ${c.nst}`) },
    { t: "  always @* begin", hot: () => true },
    { t: "    nst = st;", hot: () => true },
    { t: "    case (st)", hot: () => true, note: (c) => `st = ${c.st}` },
    { t: "      A: if (x) nst = B;", hot: (c) => c.st === "A", note: (c) => (c.st === "A" ? caseNote(c) : "") },
    { t: "      B: if (x) nst = C; else nst = A;", hot: (c) => c.st === "B", note: (c) => (c.st === "B" ? caseNote(c) : "") },
    { t: "      C: if (!x) nst = D;", hot: (c) => c.st === "C", note: (c) => (c.st === "C" ? caseNote(c) : "") },
    { t: "      D: if (x) nst = C; else nst = A;", hot: (c) => c.st === "D", note: (c) => (c.st === "D" ? caseNote(c) : "") },
    { t: "      default: nst = A;", hot: (c) => c.st === "x", note: (c) => (c.st === "x" ? "st unknown: only default matches" : "") },
    { t: "    endcase" },
    { t: "  end" },
    { t: "  assign z = (st == C) | (st == D);", hot: () => true, note: (c) => `z = ${c.z}` },
    { t: "endmodule" },
  ],
  explain: (c) =>
    c.st === "x"
      ? "st has never been reset, so it is x. case (st) matches no state item, so the default item runs: nst = A."
      : `case (st) selects item ${c.st}; with x = ${c.x} the branch taken sets nst = ${c.nst}. z depends only on st (Moore).`,
  diagram: {
    states: [
      { id: "A", label: "A/0", x: 0, y: 0 },
      { id: "B", label: "B/0", x: 2, y: 0 },
      { id: "C", label: "C/1", x: 2, y: 1 },
      { id: "D", label: "D/1", x: 0, y: 1 },
    ],
    edges: [
      { from: "A", to: "A", label: "0", loop: "top" },
      { from: "A", to: "B", label: "1" },
      { from: "B", to: "A", label: "0" },
      { from: "B", to: "C", label: "1" },
      { from: "C", to: "C", label: "1", loop: "right" },
      { from: "C", to: "D", label: "0" },
      { from: "D", to: "C", label: "1" },
      { from: "D", to: "A", label: "0" },
    ],
  },
};

const P3_CODE: Record<string, string> = { off: "00", on1: "01", on2: "10", on3: "11" };
const P3_NAME: Record<string, string> = { "00": "off", "01": "on1", "10": "on2", "11": "on3" };
const p3eq = (st: string, b: Bit) => {
  if (st === "x") return { n1: "x", n0: "x", x: "x" as V };
  const s1 = Number(P3_CODE[st][0]);
  const s0 = Number(P3_CODE[st][1]);
  const n1 = s1 ^ s0;
  const n0 = ((1 - s1) & (1 - s0) & b) | (s1 & (1 - s0));
  return { n1: String(n1), n0: String(n0), x: (s1 | s0) as V };
};

const STEP_P3: StepPreset = {
  name: "Lecture pulse3, assign style (Moore)",
  type: "moore",
  reset: "off",
  inName: "b",
  outName: "x",
  next: (st, b) => (st === "x" ? "x" : P3_NAME[`${p3eq(st, b).n1}${p3eq(st, b).n0}`]),
  out: (st, b) => p3eq(st, b).x,
  lines: [
    { t: "module pulse3 (input b, input clk, rst, output x);" },
    { t: "  wire n1, n0;" },
    { t: "  reg  s1, s0;            // off 00, on1 01, on2 10, on3 11", note: (c) => (c.st === "x" ? "s1 s0 = x x" : `s1 s0 = ${P3_CODE[c.st][0]} ${P3_CODE[c.st][1]}`) },
    { t: "  assign n1 = s1 ^ s0;", hot: () => true, note: (c) => `= ${p3eq(c.st, c.x).n1}` },
    { t: "  assign n0 = (~s1 & ~s0 & b) | (s1 & ~s0);", hot: () => true, note: (c) => `= ${p3eq(c.st, c.x).n0}` },
    { t: "  assign x  = s1 | s0;", hot: () => true, note: (c) => `= ${c.z}` },
    { t: "  always @(posedge clk)", edge: () => true },
    { t: "  begin" },
    { t: "    if (rst) begin", edge: (c) => c.rst },
    { t: "      s1 <= 1'b0;", edge: (c) => c.rst },
    { t: "      s0 <= 1'b0;", edge: (c) => c.rst },
    { t: "    end else begin", edge: (c) => !c.rst },
    { t: "      s1 <= n1;", edge: (c) => !c.rst },
    { t: "      s0 <= n0;", edge: (c) => !c.rst },
    { t: "    end" },
    { t: "  end" },
    { t: "endmodule" },
  ],
  explain: (c) =>
    c.st === "x"
      ? "s1 and s0 start as x. n1 = x ^ x is still x, so without a reset the machine never becomes defined. Set rst = 1 and clock."
      : `The assign statements are evaluated continuously: with s1s0 = ${P3_CODE[c.st]} (${c.st}) and b = ${c.x}, n1n0 = ${p3eq(c.st, c.x).n1}${p3eq(c.st, c.x).n0} (${c.nst}).`,
  diagram: {
    states: [
      { id: "off", label: "off/0", x: 0, y: 0 },
      { id: "on1", label: "on1/1", x: 2, y: 0 },
      { id: "on2", label: "on2/1", x: 2, y: 1 },
      { id: "on3", label: "on3/1", x: 0, y: 1 },
    ],
    edges: [
      { from: "off", to: "off", label: "0", loop: "top" },
      { from: "off", to: "on1", label: "1" },
      { from: "on1", to: "on2", label: "0,1" },
      { from: "on2", to: "on3", label: "0,1" },
      { from: "on3", to: "off", label: "0,1" },
    ],
  },
};

const M111_NEXT: Record<string, [string, string]> = { S0: ["S0", "S1"], S1: ["S0", "S2"], S2: ["S0", "S2"] };
const STEP_M111: StepPreset = {
  name: "111 detector, Mealy, output in the case",
  type: "mealy",
  reset: "S0",
  inName: "x",
  outName: "z",
  next: (st, x) => (st === "x" ? "S0" : M111_NEXT[st][x]),
  out: (st, x) => (st === "x" ? 0 : st === "S2" && x ? 1 : 0),
  lines: [
    { t: "module ones3 (input clk, rst, x, output reg z);" },
    { t: "  localparam S0 = 2'd0, S1 = 2'd1, S2 = 2'd2;" },
    { t: "  reg [1:0] st, nst;" },
    { t: "  always @(posedge clk)", edge: () => true },
    { t: "    if (rst) st <= S0;", edge: (c) => c.rst },
    { t: "    else     st <= nst;", edge: (c) => !c.rst, note: (c) => (c.rst ? "" : `next edge: st <= ${c.nst}`) },
    { t: "  always @* begin", hot: () => true },
    { t: "    nst = st; z = 1'b0;", hot: () => true },
    { t: "    case (st)", hot: () => true, note: (c) => `st = ${c.st}` },
    { t: "      S0: if (x) nst = S1;", hot: (c) => c.st === "S0", note: (c) => (c.st === "S0" ? caseNote(c) : "") },
    { t: "      S1: if (x) nst = S2; else nst = S0;", hot: (c) => c.st === "S1", note: (c) => (c.st === "S1" ? caseNote(c) : "") },
    { t: "      S2: if (x) z = 1'b1; else nst = S0;", hot: (c) => c.st === "S2", note: (c) => (c.st === "S2" ? `x = ${c.x} → z = ${c.z}, nst = ${c.nst}` : "") },
    { t: "      default: nst = S0;", hot: (c) => c.st === "x" },
    { t: "    endcase" },
    { t: "  end" },
    { t: "endmodule" },
  ],
  explain: (c) =>
    c.st === "x"
      ? "st is x: only the defaults run (nst = S0 from the default item, z = 0 from the top)."
      : `Mealy: z is set inside the case item, from st = ${c.st} and the present x = ${c.x}. Toggle x without clocking and watch z change immediately.`,
  diagram: {
    states: [
      { id: "S0", x: 0, y: 0 },
      { id: "S1", x: 1, y: 0 },
      { id: "S2", x: 2, y: 0 },
    ],
    edges: [
      { from: "S0", to: "S0", label: "0/0", loop: "top" },
      { from: "S0", to: "S1", label: "1/0" },
      { from: "S1", to: "S0", label: "0/0" },
      { from: "S1", to: "S2", label: "1/0" },
      { from: "S2", to: "S2", label: "1/1", loop: "top" },
      { from: "S2", to: "S0", label: "0/0", bend: 0.32 },
    ],
  },
};

const STEP_PRESETS = [STEP_T10, STEP_P3, STEP_M111];

interface Cyc {
  st: string;
  x: Bit;
  rst: boolean;
}

function VerilogStepper() {
  const [pi, setPi] = useState(0);
  const p = STEP_PRESETS[pi];
  const [hist, setHist] = useState<Cyc[]>([]);
  const [st, setSt] = useState("x");
  const [x, setX] = useState<Bit>(0);
  const [rst, setRst] = useState(true);
  const reset = () => {
    setHist([]);
    setSt("x");
    setX(0);
    setRst(true);
  };
  const choose = (i: number) => {
    setPi(i);
    setHist([]);
    setSt("x");
    setX(0);
    setRst(true);
  };
  const nst = p.next(st, x);
  const z = p.out(st, x);
  const ctx: Ctx = { st, x, rst, nst, z };
  const clock = (xb: Bit = x) => {
    setHist((h) => [...h, { st, x: xb, rst }]);
    setSt(rst ? p.reset : p.next(st, xb));
    setX(xb);
  };
  const all = [...hist, { st, x, rst }].slice(-9);
  const from = Math.max(0, hist.length + 1 - 9);
  const signals: WaveSignal[] = [
    { name: "clk", wave: all.map(() => "10").join("") },
    { name: "rst", wave: bitWave(all.map((c) => (c.rst ? 1 : 0))) },
    { name: p.inName, wave: bitWave(all.map((c) => c.x)) },
    { name: "st", wave: busWave(all.map((c) => c.st)), data: busData(all.map((c) => c.st)) },
    { name: "nst", wave: busWave(all.map((c) => p.next(c.st, c.x))), data: busData(all.map((c) => p.next(c.st, c.x))) },
    { name: p.outName, wave: bitWave(all.map((c) => p.out(c.st, c.x))) },
  ];
  const ei = p.diagram.edges.findIndex((e) => e.from === st && e.to === nst);
  return (
    <VizFrame
      title="Step a Verilog FSM: which lines are working?"
      hint="Start with rst = 1 and clock once (st is x before reset). Then set x and clock. Blue lines are the combinational logic active for the current st and x; amber lines will run at the next rising edge."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <CodeView lines={p.lines} ctx={ctx} />
          <Legend />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 8, alignItems: "center" }}>
            <FsmSvg states={p.diagram.states} edges={p.diagram.edges} initial={p.reset} active={st} activeEdge={!rst && ei >= 0 ? ei : undefined} />
            <WaveSvg signals={signals} ticks={ticksFor(from, all.length)} cursor={(all.length - 1) * 2} />
          </div>
        </div>
      }
      controls={
        <>
          <Choice value={pi} onChange={choose} options={STEP_PRESETS.map((s, i) => ({ v: i, label: s.name }))} />
          <Toggle label="rst = 1" value={rst} onChange={setRst} />
          <FeedControls name={p.inName} cur={x} setCur={setX} onClock={clock} onUndo={() => {
            const last = hist[hist.length - 1];
            if (!last) return;
            setHist(hist.slice(0, -1));
            setSt(last.st);
            setX(last.x);
            setRst(last.rst);
          }} canUndo={hist.length > 0} />
        </>
      }
      readout={
        <>
          <Read label="Signals" tex={`st = **${st}**, ${p.inName} = ${x}, rst = ${rst ? 1 : 0} → nst = **${nst}**, ${p.outName} = **${z}**`} tone={z === 1 ? "good" : undefined} />
          <Read label="What happens" tex={p.explain(ctx)} />
          <Read label="At the next edge" tex={rst ? `rst = 1, so st <= ${p.reset} (synchronous reset)` : `st <= nst, i.e. st becomes ${nst}`} tone={rst ? "warn" : undefined} />
          <Read label="Edges so far" tex={`${hist.length}`} />
        </>
      }
      tasks={[
        "Predict: before any reset, what is z? Clock once with rst = 0 in each preset. Which presets recover from x without a reset, and which line makes the difference?",
        "Tutorial 10 preset: after reset, feed 1, 1, 0, 0. For each edge say which case item was blue before you clocked it.",
        "Mealy 111 preset: get to S2, then toggle x between 0 and 1 **without** clocking. Which signal changes immediately and which waits for the edge?",
        "Pulse3 preset: compare the green annotations with $n_1 = s_1 \\oplus s_0$ and $n_0 = s_1's_0'b + s_1s_0'$ for each state.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Case statement vs assign statements (Tutorial 10 Q1a vs Q1b)

const T10_STATES = ["A", "B", "C", "D"];
const ENCODINGS: { v: string; label: string; codes: number[] }[] = [
  { v: "bin", label: "Binary A00 B01 C10 D11", codes: [0, 1, 2, 3] },
  { v: "gray", label: "Gray A00 B01 C11 D10", codes: [0, 1, 3, 2] },
  { v: "odd", label: "A00 B11 C01 D10", codes: [0, 3, 1, 2] },
];
const bc = (x: number) => x.toString(2).replace(/0/g, "").length;

function verilogOf(cover: Implicant[], vars: string[], hasOnes: boolean) {
  const n = vars.length;
  if (!hasOnes) return "1'b0";
  if (cover.some((p) => p.mask === (1 << n) - 1)) return "1'b1";
  const terms = cover.map((p) => {
    const lits = vars.flatMap((v, k) => {
      const bit = 1 << (n - 1 - k);
      if (p.mask & bit) return [];
      return [p.value & bit ? v : `~${v}`];
    });
    return lits.length > 1 && cover.length > 1 ? `(${lits.join(" & ")})` : lits.join(" & ");
  });
  return terms.join(" | ");
}
const literals = (cover: Implicant[], n: number) => cover.reduce((s, p) => s + n - bc(p.mask), 0);

function CaseVsAssign() {
  const [ei, setEi] = useState("gray");
  const enc = ENCODINGS.find((e) => e.v === ei)!;
  const { xs, setXs, cur, setCur, reset } = useFeed();
  const code = (s: string) => enc.codes[T10_STATES.indexOf(s)];
  const nameOf = (c: number) => T10_STATES[enc.codes.indexOf(c)];
  const vars = ["s1", "s0", "x"];
  const eqs = [1, 0].map((bit) => {
    const ones: number[] = [];
    for (let m = 0; m < 8; m++) {
      const s = nameOf(m >> 1);
      const nx = code(T10_NEXT[s][(m & 1) as Bit]);
      if ((nx >> bit) & 1) ones.push(m);
    }
    const cover = minimalCover(3, ones, []);
    return { name: `n${bit}`, v: verilogOf(cover, vars, ones.length > 0), lits: literals(cover, 3), ones };
  });
  const zOnes = [0, 1, 2, 3].filter((c) => ["C", "D"].includes(nameOf(c)));
  const zCover = minimalCover(2, zOnes, []);
  const zV = verilogOf(zCover, ["s1", "s0"], true);
  // Simulate both descriptions.
  let sCase = "A";
  let bits = 0;
  const trace: { sCase: string; bits: number; x: Bit }[] = [];
  for (const x of [...xs, cur]) {
    trace.push({ sCase, bits, x });
    const m = (bits << 1) | x;
    sCase = T10_NEXT[sCase][x];
    bits = ((eqs[0].ones.includes(m) ? 1 : 0) << 1) | (eqs[1].ones.includes(m) ? 1 : 0);
  }
  const now = trace[trace.length - 1];
  const agree = trace.every((t) => nameOf(t.bits) === t.sCase);
  const row = (now.bits << 1) | now.x;
  const view = trace.slice(-9);
  const from = trace.length - view.length;
  const signals: WaveSignal[] = [
    { name: "clk", wave: view.map(() => "10").join("") },
    { name: "x", wave: bitWave(view.map((t) => t.x)) },
    { name: "case: st", wave: busWave(view.map((t) => t.sCase)), data: view.map((t) => t.sCase) },
    { name: "assign: s1s0", wave: busWave(view.map((t) => String(t.bits))), data: view.map((t) => `${t.bits.toString(2).padStart(2, "0")}=${nameOf(t.bits)}`) },
  ];
  const caseCode = `localparam A = 2'b${code("A").toString(2).padStart(2, "0")}, B = 2'b${code("B").toString(2).padStart(2, "0")}, C = 2'b${code("C").toString(2).padStart(2, "0")}, D = 2'b${code("D").toString(2).padStart(2, "0")};
always @* begin
  nst = st;
  case (st)
    A: if (x) nst = B;
    B: if (x) nst = C; else nst = A;
    C: if (!x) nst = D;
    D: if (x) nst = C; else nst = A;
  endcase
end
assign z = (st == C) | (st == D);`;
  const assignCode = `// {s1, s0} = st
assign n1 = ${eqs[0].v};
assign n0 = ${eqs[1].v};
assign z  = ${zV};`;
  return (
    <VizFrame
      title="Tutorial 10 two ways: case block vs assign equations"
      hint="Choose a state encoding: the assign equations are derived (K-map minimised) from the case description. Feed inputs to run both versions side by side."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8 }}>
            <div>
              <div className="small muted">Q1(a): combinational always block</div>
              <pre className="code" style={{ fontSize: "0.76rem", margin: 0 }}>{caseCode}</pre>
            </div>
            <div>
              <div className="small muted">Q1(b): assign statements only</div>
              <pre className="code" style={{ fontSize: "0.76rem", margin: 0 }}>{assignCode}</pre>
            </div>
          </div>
          <WaveSvg signals={signals} ticks={ticksFor(from, view.length)} cursor={(view.length - 1) * 2} />
        </div>
      }
      controls={
        <>
          <Choice value={ei} onChange={(v) => { setEi(v); reset(); }} options={ENCODINGS.map((e) => ({ v: e.v, label: e.label }))} />
          <FeedControls cur={cur} setCur={setCur} onClock={(b) => setXs((h) => [...h, b])} onUndo={() => setXs((h) => h.slice(0, -1))} canUndo={xs.length > 0} />
        </>
      }
      readout={
        <>
          <Read label="Now" tex={`case: st = **${now.sCase}**; assign: s1s0 = **${now.bits.toString(2).padStart(2, "0")}** (= ${nameOf(now.bits)}), x = ${now.x}`} tone={agree ? "good" : "bad"} />
          <Read label="Agreement" tex={agree ? "both descriptions are in the same state on every cycle" : "mismatch!"} tone={agree ? "good" : "bad"} />
          <Read label="Logic size" tex={`$n_1$: ${eqs[0].lits} literals, $n_0$: ${eqs[1].lits} literals`} />
          <TableView
            head={["s1 s0", "state", "x", "next (case)", "n1 n0"]}
            rows={Array.from({ length: 8 }, (_, m) => {
              const s = nameOf(m >> 1);
              const nx = T10_NEXT[s][(m & 1) as Bit];
              return [(m >> 1).toString(2).padStart(2, "0"), s, m & 1, nx, `${(code(nx) >> 1) & 1} ${code(nx) & 1}`];
            })}
            highlightRow={row}
          />
        </>
      }
      tasks={[
        "Predict: with the Gray encoding, what single signal does $n_0$ copy? Check the generated assign and explain what s0 remembers.",
        "Switch to Binary. How many literals do $n_1$ and $n_0$ need now? Which encoding would you choose for Tutorial 10 Q1(b)?",
        "Feed 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1 (Tutorial 10 Q1(c)). Do the two versions ever disagree? Read z from the state each cycle.",
        "Use the table: pick the row for state C with x = 0 and verify that the generated $n_1$ and $n_0$ give D's code.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Output timing: Moore, Mealy and registered outputs

const D11: Record<string, [string, string]> = { S0: ["S0", "S1"], S1: ["S0", "S2"], S2: ["S0", "S2"] };
const STYLES = [
  { key: "a", code: "assign z = (st == S2);", what: "Moore, combinational" },
  { key: "b", code: "assign z = (st != S0) & x;", what: "Mealy, combinational" },
  { key: "c", code: "always @(posedge clk) z <= (st == S2);", what: "registered from st" },
  { key: "d", code: "always @(posedge clk) z <= (nst == S2);", what: "registered from nst" },
];

function OutputTiming() {
  const { xs, setXs, cur, setCur, reset } = useFeed();
  const [late, setLate] = useState(false);
  type C = { s: string; x: Bit; px: Bit; zc: Bit; zd: Bit };
  const cyc: C[] = [];
  let s = "S0";
  let px: Bit = 0;
  let zc: Bit = 0;
  let zd: Bit = 0;
  [...xs, cur].forEach((x, k) => {
    cyc.push({ s, x, px, zc, zd });
    if (k < xs.length) {
      const nst = D11[s][x];
      zc = s === "S2" ? 1 : 0;
      zd = nst === "S2" ? 1 : 0;
      s = nst;
    }
    px = x;
  });
  const view = cyc.slice(-9);
  const from = cyc.length - view.length;
  const half = (c: C, f: (st: string, x: Bit) => Bit) => (late ? `${f(c.s, c.px)}${f(c.s, c.x)}` : `${f(c.s, c.x)}${f(c.s, c.x)}`);
  const signals: WaveSignal[] = [
    { name: "clk", wave: view.map(() => "10").join("") },
    { name: "x", wave: view.map((c) => (late ? `${c.px}${c.x}` : `${c.x}${c.x}`)).join("") },
    { name: "st", wave: busWave(view.map((c) => c.s)), data: view.map((c) => c.s) },
    { name: "(a) Moore", wave: view.map((c) => half(c, (st) => (st === "S2" ? 1 : 0))).join("") },
    { name: "(b) Mealy", wave: view.map((c) => half(c, (st, x) => (st !== "S0" && x ? 1 : 0))).join("") },
    { name: "(c) reg st", wave: view.map((c) => `${c.zc}${c.zc}`).join("") },
    { name: "(d) reg nst", wave: view.map((c) => `${c.zd}${c.zd}`).join("") },
  ];
  const now = cyc[cyc.length - 1];
  const first = (f: (c: C) => Bit) => cyc.findIndex((c) => f(c) === 1);
  const fa = first((c) => (c.s === "S2" ? 1 : 0));
  const fb = first((c) => (c.s !== "S0" && c.x ? 1 : 0));
  const fc = first((c) => c.zc);
  return (
    <VizFrame
      title="Where the output is computed decides when it changes"
      hint="One 11-detector (states S0, S1, S2), four ways to produce z. Feed bits and compare the four z waveforms."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <pre className="code" style={{ fontSize: "0.76rem", margin: 0 }}>
            {STYLES.map((st) => `// (${st.key}) ${st.what}\n${st.code}`).join("\n")}
          </pre>
          <WaveSvg signals={signals} ticks={ticksFor(from, view.length)} cursor={(view.length - 1) * 2} />
        </div>
      }
      controls={
        <>
          <FeedControls cur={cur} setCur={setCur} onClock={(b) => setXs((h) => [...h, b])} onUndo={() => setXs((h) => h.slice(0, -1))} canUndo={xs.length > 0} />
          <Toggle label="x changes at the falling edge (mid-cycle)" value={late} onChange={setLate} />
        </>
      }
      readout={
        <>
          <Read label="Now" tex={`st = ${now.s}, x = ${now.x}: (a) ${now.s === "S2" ? 1 : 0}, (b) ${now.s !== "S0" && now.x ? 1 : 0}, (c) ${now.zc}, (d) ${now.zd}`} />
          <Read
            label="First z = 1"
            tex={fb < 0 ? "feed 1, 1 to detect the pattern" : `(b) Mealy cycle ${fb}; (a) and (d) cycle ${fa < 0 ? "–" : fa}; (c) cycle ${fc < 0 ? "–" : fc}`}
            tone={fb >= 0 ? "good" : undefined}
          />
          <Read tex="(c) samples the **old** st at the edge (non-blocking), so it lags the state by one cycle; (d) samples nst, which is already the state being entered." />
          {late && <Read tone="warn" tex="Mid-cycle input changes move (b) mid-cycle; (a), (c), (d) still only change at edges." />}
        </>
      }
      tasks={[
        "Predict: feed 0, 1, 1, 1, 0. In which cycle does each of (a)–(d) first become 1? Then check.",
        "Which two outputs are always identical? Explain from the code why (d) is not late although it is registered.",
        "Turn on mid-cycle input changes. Which output can now be 1 for only half a cycle?",
        "An exam module writes `z <= (st == S2)` in the clocked block. Is it still the same machine as (a)? What would you change to keep the registered output but remove the delay?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Traffic-light controller

const TL_STATES = ["NS_G", "NS_Y", "EW_G1", "EW_G2", "EW_Y"];
const tlNext = (st: number, car: Bit) => (st === 0 ? (car ? 1 : 0) : st >= 5 ? 0 : (st + 1) % 5);
const tlLights = (st: number) => ({ ns: st === 0 ? "G" : st === 1 ? "Y" : "R", ew: st === 2 || st === 3 ? "G" : st === 4 ? "Y" : "R" });
const TL_LINES: Line[] = [
  { t: "  always @(posedge clk)", edge: () => true },
  { t: "    if (rst) st <= NS_G;", edge: (c) => c.rst },
  { t: "    else     st <= nst;", edge: (c) => !c.rst, note: (c) => (c.rst ? "" : `next edge: st <= ${c.nst}`) },
  { t: "  always @* begin", hot: () => true },
  { t: "    nst = st;", hot: () => true },
  { t: "    case (st)", hot: () => true, note: (c) => `st = ${c.st}` },
  { t: "      NS_G:  if (car) nst = NS_Y;", hot: (c) => c.st === "NS_G", note: (c) => (c.st === "NS_G" ? `car = ${c.x} → ${c.nst}` : "") },
  { t: "      NS_Y:  nst = EW_G1;", hot: (c) => c.st === "NS_Y" },
  { t: "      EW_G1: nst = EW_G2;", hot: (c) => c.st === "EW_G1" },
  { t: "      EW_G2: nst = EW_Y;", hot: (c) => c.st === "EW_G2" },
  { t: "      EW_Y:  nst = NS_G;", hot: (c) => c.st === "EW_Y" },
  { t: "      default: nst = NS_G;", hot: (c) => !TL_STATES.includes(c.st), note: (c) => (!TL_STATES.includes(c.st) ? "unused code → NS_G" : "") },
  { t: "    endcase" },
  { t: "  end" },
  { t: "  always @* begin", hot: () => true },
  { t: "    ns = RED; ew = RED;", hot: () => true },
  { t: "    case (st)", hot: () => true },
  { t: "      NS_G:         ns = GRN;", hot: (c) => c.st === "NS_G" },
  { t: "      NS_Y:         ns = YEL;", hot: (c) => c.st === "NS_Y" },
  { t: "      EW_G1, EW_G2: ew = GRN;", hot: (c) => c.st === "EW_G1" || c.st === "EW_G2" },
  { t: "      EW_Y:         ew = YEL;", hot: (c) => c.st === "EW_Y" },
  { t: "    endcase" },
  { t: "  end" },
];

const LAMP = { R: "#e5484d", Y: "#f5a524", G: "#30a46c" } as const;

function Signal({ x, y, on, horizontal, label }: { x: number; y: number; on: string; horizontal?: boolean; label: string }) {
  const order: ("R" | "Y" | "G")[] = ["R", "Y", "G"];
  return (
    <g>
      <rect x={x} y={y} width={horizontal ? 78 : 30} height={horizontal ? 30 : 78} rx={7} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.5} />
      {order.map((c, i) => (
        <circle
          key={c}
          cx={horizontal ? x + 15 + i * 24 : x + 15}
          cy={horizontal ? y + 15 : y + 15 + i * 24}
          r={9}
          fill={on === c ? LAMP[c] : "var(--surface-2)"}
          stroke={on === c ? LAMP[c] : "var(--border)"}
          strokeWidth={1.5}
        />
      ))}
      <text x={horizontal ? x + 39 : x + 15} y={horizontal ? y - 6 : y - 6} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--text)">
        {label}
      </text>
    </g>
  );
}

function TrafficLight() {
  const [hist, setHist] = useState<{ st: number; car: Bit; rst: boolean }[]>([]);
  const [st, setSt] = useState(0);
  const [car, setCar] = useState<Bit>(0);
  const [rst, setRst] = useState(false);
  const name = (s: number) => TL_STATES[s] ?? `3'd${s}`;
  const nst = rst ? 0 : tlNext(st, car);
  const L = tlLights(st);
  const ctx: Ctx = { st: name(st), x: car, rst, nst: name(tlNext(st, car)), z: 0 };
  const clock = () => {
    setHist((h) => [...h, { st, car, rst }]);
    setSt(nst);
  };
  const all = [...hist, { st, car, rst }].slice(-10);
  const from = hist.length + 1 - all.length;
  const signals: WaveSignal[] = [
    { name: "clk", wave: all.map(() => "10").join("") },
    { name: "car", wave: bitWave(all.map((c) => c.car)) },
    { name: "st", wave: busWave(all.map((c) => name(c.st))), data: all.map((c) => name(c.st).replace("_", "")) },
    { name: "ns", wave: busWave(all.map(() => "")), data: all.map((c) => tlLights(c.st).ns) },
    { name: "ew", wave: busWave(all.map(() => "")), data: all.map((c) => tlLights(c.st).ew) },
  ];
  return (
    <VizFrame
      title="A traffic-light controller in Verilog"
      hint="Main road (NS) stays green until a car waits on the side road (EW). Toggle car, clock the FSM, and watch the lights, the active code lines and the waveform."
      onReset={() => {
        setHist([]);
        setSt(0);
        setCar(0);
        setRst(false);
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8, alignItems: "center" }}>
            <svg viewBox="0 0 300 300" className="viz-svg" style={{ maxWidth: 300, width: "100%", margin: "0 auto", display: "block" }} role="img" aria-label="Intersection">
              <rect x={0} y={0} width={300} height={300} fill="var(--surface-2)" rx={10} />
              <rect x={120} y={0} width={60} height={300} fill="var(--border)" />
              <rect x={0} y={120} width={300} height={60} fill="var(--border)" />
              <line x1={150} y1={0} x2={150} y2={118} stroke="var(--surface)" strokeDasharray="8 8" strokeWidth={2} />
              <line x1={150} y1={182} x2={150} y2={300} stroke="var(--surface)" strokeDasharray="8 8" strokeWidth={2} />
              <line x1={0} y1={150} x2={118} y2={150} stroke="var(--surface)" strokeDasharray="8 8" strokeWidth={2} />
              <line x1={182} y1={150} x2={300} y2={150} stroke="var(--surface)" strokeDasharray="8 8" strokeWidth={2} />
              <Signal x={195} y={22} on={L.ns} label="NS" />
              <Signal x={18} y={200} on={L.ew} horizontal label="EW" />
              {car ? (
                <g>
                  <rect x={58} y={155} width={44} height={20} rx={5} fill="var(--accent)" />
                  <circle cx={68} cy={177} r={4} fill="var(--text)" />
                  <circle cx={92} cy={177} r={4} fill="var(--text)" />
                </g>
              ) : null}
              <text x={240} y={275} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text)" fontFamily="monospace">
                {name(st)}
              </text>
            </svg>
            <WaveSvg signals={signals} ticks={ticksFor(from, all.length)} cursor={(all.length - 1) * 2} />
          </div>
          <CodeView lines={TL_LINES} ctx={ctx} />
          <Legend />
        </div>
      }
      controls={
        <>
          <div className="row" style={{ gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <Toggle label="car waiting (car = 1)" value={car === 1} onChange={(v) => setCar(v ? 1 : 0)} />
            <Toggle label="rst = 1" value={rst} onChange={setRst} />
          </div>
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <button className="btn primary small" onClick={clock}>
              ⏵ Clock edge
            </button>
            <button className="btn small" onClick={() => { setHist((h) => [...h, { st, car, rst }]); setSt(6); }} title="Simulate a glitch that loads the unused code 6">
              Glitch: st = 3&apos;d6
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="State" tex={`st = **${name(st)}** (code ${st.toString(2).padStart(3, "0")})`} />
          <Read label="Lights" tex={`NS **${{ G: "green", Y: "yellow", R: "red" }[L.ns]}**, EW **${{ G: "green", Y: "yellow", R: "red" }[L.ew]}**`} tone={L.ns === "R" && L.ew === "R" ? "warn" : undefined} />
          <Read label="Next edge" tex={rst ? "rst = 1 → NS_G" : `→ ${name(nst)}${st === 0 ? (car ? " (a car is waiting)" : " (no car: stay green)") : st >= 5 ? " (default item: unused code recovers)" : " (unconditional)"}`} />
          {st >= 5 && <Read tone="warn" tex="Unused code: the output block's defaults make both roads red, and the default case item returns to NS_G at the next edge." />}
        </>
      }
      tasks={[
        "Predict: with car = 1 held from NS_G, how many clock edges until NS is green again? Count the states and check.",
        "Leave car = 0. Why does the controller stay in NS_G, and which line keeps it there?",
        "Press **Glitch** to load code 6. What do the lights show, and what happens at the next edge? Which two pieces of code make this safe?",
        "Change the specification in your head: the side road should get three green cycles. Which lines and how many state bits would you need?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Bug lab

type BugKey = "sens" | "lock" | "block";
const BUGS: { key: BugKey; label: string; good: string; bad: string }[] = [
  {
    key: "sens",
    label: "Sensitivity list",
    good: "// fixed\nalways @* begin\n  nst = st;\n  case (st)\n    S0: if (x) nst = S1;\n    S1: if (x) nst = S2; else nst = S0;\n    S2: if (!x) nst = S0;\n    default: nst = S0;\n  endcase\nend",
    bad: "// bug: x missing from the list\nalways @(st) begin\n  nst = st;\n  case (st)\n    S0: if (x) nst = S1;\n    S1: if (x) nst = S2; else nst = S0;\n    S2: if (!x) nst = S0;\n    default: nst = S0;\n  endcase\nend",
  },
  {
    key: "lock",
    label: "Missing default + no reset",
    good: "// fixed\nalways @* begin\n  nst = st;\n  case (st)\n    S0: if (x) nst = S1;\n    S1: if (x) nst = S2; else nst = S0;\n    S2: if (!x) nst = S0;\n    default: nst = S0;\n  endcase\nend",
    bad: "// bug: no default item\nalways @* begin\n  nst = st;\n  case (st)\n    S0: if (x) nst = S1;\n    S1: if (x) nst = S2; else nst = S0;\n    S2: if (!x) nst = S0;\n  endcase\nend",
  },
  {
    key: "block",
    label: "Blocking = in the clocked block",
    good: "// non-blocking\nalways @(posedge clk) begin\n  st <= nst;\n  z  <= (st == S2);   // old st\nend",
    bad: "// blocking\nalways @(posedge clk) begin\n  st = nst;\n  z  = (st == S2);    // NEW st!\nend",
  },
];
const CODE2: Record<string, string> = { S0: "00", S1: "01", S2: "10", "11": "11" };

function BugLab() {
  const [bug, setBug] = useState<BugKey>("sens");
  const [start, setStart] = useState("11");
  const { xs, setXs, cur, setCur, reset } = useFeed();
  const B = BUGS.find((b) => b.key === bug)!;
  const nextOf = (s: string, x: Bit, withDefault: boolean) => (s === "11" ? (withDefault ? "S0" : "11") : D11[s][x]);
  const all = [...xs, cur];
  // Good and buggy traces: state per cycle and z per cycle.
  const good: { s: string; z: Bit }[] = [];
  const bad: { s: string; z: Bit; woke?: boolean }[] = [];
  if (bug === "sens") {
    let s = "S0";
    let sb = "S0";
    let nb = D11.S0[all[0]];
    all.forEach((x, k) => {
      good.push({ s, z: s === "S2" ? 1 : 0 });
      bad.push({ s: sb, z: sb === "S2" ? 1 : 0, woke: k === 0 });
      if (k < xs.length) {
        s = D11[s][x];
        const prev = sb;
        sb = nb;
        if (sb !== prev) {
          // The block wakes on the st change, before x moves to its next value: it reads this cycle's x.
          nb = D11[sb][x];
          bad[bad.length - 1].woke = true;
        }
      }
    });
  } else if (bug === "lock") {
    let s = start;
    let sb = start;
    all.forEach((x, k) => {
      good.push({ s, z: s === "S2" ? 1 : 0 });
      bad.push({ s: sb, z: sb === "S2" ? 1 : 0 });
      if (k < xs.length) {
        s = nextOf(s, x, true);
        sb = nextOf(sb, x, false);
      }
    });
  } else {
    let s = "S0";
    let zg: Bit = 0;
    let zb: Bit = 0;
    all.forEach((x, k) => {
      good.push({ s, z: zg });
      bad.push({ s, z: zb });
      if (k < xs.length) {
        const nst = D11[s][x];
        zg = s === "S2" ? 1 : 0;
        zb = nst === "S2" ? 1 : 0;
        s = nst;
      }
    });
  }
  const view = (arr: { s: string; z: Bit }[]) => arr.slice(-9);
  const gv = view(good);
  const bv = view(bad);
  const xv = all.slice(-9);
  const from = all.length - xv.length;
  const signals: WaveSignal[] = [
    { name: "clk", wave: xv.map(() => "10").join("") },
    { name: "x", wave: bitWave(xv) },
    { name: "st fixed", wave: busWave(gv.map((c) => c.s)), data: gv.map((c) => c.s) },
    { name: "z fixed", wave: bitWave(gv.map((c) => c.z)) },
    { name: "st buggy", wave: busWave(bv.map((c) => c.s)), data: bv.map((c) => c.s) },
    { name: "z buggy", wave: bitWave(bv.map((c) => c.z)) },
  ];
  const diff = good.findIndex((g, i) => g.s !== bad[i].s || g.z !== bad[i].z);
  const woke = bad.flatMap((b, i) => (b.woke ? [i] : []));
  return (
    <VizFrame
      title="Bug lab: what each classic FSM bug does"
      hint="Pick a bug, feed the same inputs to the fixed and the buggy code (an 11-detector: S0, S1, S2 = 00, 01, 10; z = 1 in S2), and compare the traces."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 8 }}>
            <div>
              <div className="small" style={{ color: "var(--good)", fontWeight: 600 }}>
                Fixed
              </div>
              <pre className="code" style={{ fontSize: "0.74rem", margin: 0 }}>{B.good}</pre>
            </div>
            <div>
              <div className="small" style={{ color: "var(--bad)", fontWeight: 600 }}>
                Buggy
              </div>
              <pre className="code" style={{ fontSize: "0.74rem", margin: 0 }}>{B.bad}</pre>
            </div>
          </div>
          <WaveSvg signals={signals} ticks={ticksFor(from, xv.length)} />
        </div>
      }
      controls={
        <>
          <Choice value={bug} onChange={(b) => { setBug(b); reset(); }} options={BUGS.map((b) => ({ v: b.key, label: b.label }))} />
          {bug === "lock" && (
            <div className="row" style={{ gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span className="small">Power-up state (no reset):</span>
              <Choice value={start} onChange={(v) => { setStart(v); reset(); }} options={["S0", "S1", "S2", "11"].map((s) => ({ v: s, label: CODE2[s] === s ? s : `${s} (${CODE2[s]})` }))} />
            </div>
          )}
          <FeedControls cur={cur} setCur={setCur} onClock={(b) => setXs((h) => [...h, b])} onUndo={() => setXs((h) => h.slice(0, -1))} canUndo={xs.length > 0} />
        </>
      }
      readout={
        <>
          <Read label="First difference" tex={diff < 0 ? "none yet: keep feeding inputs" : `cycle ${diff}`} tone={diff < 0 ? undefined : "bad"} />
          {bug === "sens" && (
            <>
              <Read tex="In **simulation**, always @(st) only runs when st changes. It reads x at that instant (before x moves), and then ignores every later change of x until st changes again. Synthesis ignores the list and builds the correct logic, so simulation and hardware disagree." />
              <Read label="Block ran in cycles" tex={woke.join(", ") || "none"} />
            </>
          )}
          {bug === "lock" && <Read tex={start === "11" ? "Code 11 matches no case item: only nst = st runs, so the buggy machine loads 11 forever (lock-up). The default item sends it to S0 after one edge." : "From a valid code both versions behave the same: the bug only shows from the unused code 11. Choose 11."} tone={start === "11" ? "bad" : undefined} />}
          {bug === "block" && <Read tex="Non-blocking: z <= (st == S2) reads st **before** the edge's update, so z is one cycle late. Blocking: st = nst executes first and z reads the **new** st. Swapping the two blocking lines would change the behaviour again: the result depends on statement order." />}
        </>
      }
      tasks={[
        "Sensitivity list: feed 1, 0, 1, 1, 1. In which cycle does the buggy simulation reach S2 although 11 has not been seen yet? Which value of x did its block read, and when did it run?",
        "Lock-up: choose power-up 11 and feed any inputs. Then pick S0 and repeat. Why is the bug invisible in a simulation that starts from reset?",
        "Blocking: feed 1, 1, 1, 0. Which z matches the combinational Moore output (st == S2)? Which one is one cycle late?",
      ]}
    />
  );
}
