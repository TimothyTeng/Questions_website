"use client";

import { useMemo, useState } from "react";
import { evalCircuit, rowEnv, type Bit, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";
import { Choice, CircuitSvg, Read, Slider, TableView, VizFrame, WaveSvg } from "../kit";

// Interactive figures for the verilog-comb lesson, chosen by id (see LessonSection.visuals).
export default function VerilogCombVisual({ id }: { id: string }) {
  switch (id) {
    case "verilog-hw":
      return <VerilogHw group="structural" />;
    case "always-hw":
      return <VerilogHw group="behavioural" />;
    case "literal-lab":
      return <ExprLab kind="literal" />;
    case "operator-lab":
      return <ExprLab kind="operator" />;
    case "latch-lab":
      return <LatchLab />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// 1. Verilog → hardware explorer

interface Line {
  text: string;
  /** Gate ids this line creates. */
  gates?: string[];
  note?: string;
}
interface Snippet {
  name: string;
  lines: Line[];
  circuit: CircuitSpec;
  summary: string;
}

const STRUCTURAL: Snippet[] = [
  {
    name: "andorinv (primitives)",
    summary: "Three primitives, three gates. The first terminal of each primitive is its output net.",
    lines: [
      { text: "module andorinv (input a, b, c, d," },
      { text: "                 output out);" },
      { text: "  wire and1out, and2out;", note: "two internal nets" },
      { text: "  and g1 (and1out, a, b);", gates: ["and1out"], note: "AND gate g1: output and1out, inputs a, b" },
      { text: "  and g2 (and2out, c, d);", gates: ["and2out"], note: "AND gate g2: output and2out, inputs c, d" },
      { text: "  nor g3 (out, and1out, and2out);", gates: ["out"], note: "NOR gate g3 drives the output port" },
      { text: "endmodule" },
    ],
    circuit: {
      inputs: ["a", "b", "c", "d"],
      gates: [
        { id: "and1out", type: "AND", in: ["a", "b"], label: "g1" },
        { id: "and2out", type: "AND", in: ["c", "d"], label: "g2" },
        { id: "out", type: "NOR", in: ["and1out", "and2out"], label: "g3" },
      ],
      outputs: ["out"],
      showNets: true,
    },
  },
  {
    name: "andorinv (assign)",
    summary: "One continuous assignment describes the same circuit: each operator becomes a gate.",
    lines: [
      { text: "module andorinv (input a, b, c, d," },
      { text: "                 output out);" },
      { text: "  assign out = ~((a & b) | (c & d));", gates: ["t1", "t2", "out"], note: "& → AND gates, | then ~ → NOR" },
      { text: "endmodule" },
    ],
    circuit: {
      inputs: ["a", "b", "c", "d"],
      gates: [
        { id: "t1", type: "AND", in: ["a", "b"] },
        { id: "t2", type: "AND", in: ["c", "d"] },
        { id: "out", type: "NOR", in: ["t1", "t2"] },
      ],
      outputs: ["out"],
    },
  },
  {
    name: "simple_circ",
    summary: "Statement order does not matter: reorder these lines and the same five gates are built.",
    lines: [
      { text: "module simple_circ (input A, B, C, D, output Y);" },
      { text: "  wire int1, int2, int3, int4;" },
      { text: "  and (Y, int1, int2);", gates: ["Y"], note: "output Y = int1 · int2" },
      { text: "  not (int1, int3);", gates: ["int1"], note: "int1 = int3'" },
      { text: "  or  (int3, A, D);", gates: ["int3"], note: "int3 = A + D" },
      { text: "  and (int2, B, C, int4);", gates: ["int2"], note: "3-input AND: int2 = B·C·int4" },
      { text: "  not (int4, D);", gates: ["int4"], note: "int4 = D'" },
      { text: "endmodule" },
    ],
    circuit: {
      inputs: ["A", "B", "C", "D"],
      gates: [
        { id: "int3", type: "OR", in: ["A", "D"] },
        { id: "int1", type: "NOT", in: ["int3"] },
        { id: "int4", type: "NOT", in: ["D"] },
        { id: "int2", type: "AND", in: ["B", "C", "int4"] },
        { id: "Y", type: "AND", in: ["int1", "int2"] },
      ],
      outputs: ["Y"],
      showNets: true,
    },
  },
  {
    name: "full_add (instances)",
    summary: "Each add_half instance contributes its own XOR and AND gate; the outer module wires them up.",
    lines: [
      { text: "module full_add (input A, B, CIN," },
      { text: "                 output SUM, COUT);" },
      { text: "  wire w1, w2, w3;" },
      { text: "  add_half M1 (.a(A), .b(B),", gates: ["w1", "w2"], note: "instance M1: w1 = A ⊕ B, w2 = AB" },
      { text: "               .sum(w1), .Cout(w2));", gates: ["w1", "w2"] },
      { text: "  add_half M2 (.a(CIN), .b(w1),", gates: ["SUM", "w3"], note: "instance M2: SUM = CIN ⊕ w1, w3 = CIN·w1" },
      { text: "               .sum(SUM), .Cout(w3));", gates: ["SUM", "w3"] },
      { text: "  or o1 (COUT, w3, w2);", gates: ["COUT"], note: "COUT = w3 + w2" },
      { text: "endmodule" },
    ],
    circuit: {
      inputs: ["A", "B", "CIN"],
      gates: [
        { id: "w1", type: "XOR", in: ["A", "B"], label: "M1" },
        { id: "w2", type: "AND", in: ["A", "B"], label: "M1" },
        { id: "SUM", type: "XOR", in: ["CIN", "w1"], label: "M2" },
        { id: "w3", type: "AND", in: ["CIN", "w1"], label: "M2" },
        { id: "COUT", type: "OR", in: ["w3", "w2"], label: "o1" },
      ],
      outputs: ["SUM", "COUT"],
      showNets: true,
    },
  },
];

const BEHAVIOURAL: Snippet[] = [
  {
    name: "assign ?:",
    summary: "The conditional operator is a 2-to-1 multiplexer.",
    lines: [
      { text: "module mux2 (input x0, x1, sel, output y);" },
      { text: "  assign y = sel ? x1 : x0;", gates: ["y"], note: "sel = 1 → x1, sel = 0 → x0" },
      { text: "endmodule" },
    ],
    circuit: { inputs: ["sel", "x0", "x1"], gates: [{ id: "y", type: "MUX2", in: ["x0", "x1", "sel"] }], outputs: ["y"] },
  },
  {
    name: "always if/else",
    summary: "An if/else that assigns y on both branches is the same multiplexer: no memory, no latch.",
    lines: [
      { text: "module mux2 (input x0, x1, sel," },
      { text: "             output reg y);", note: "y is assigned in an always block, so it is a reg" },
      { text: "  always @*", note: "runs whenever x0, x1 or sel changes" },
      { text: "    if (sel) y = x1;", gates: ["y"], note: "true branch → MUX input 1" },
      { text: "    else     y = x0;", gates: ["y"], note: "false branch → MUX input 0" },
      { text: "endmodule" },
    ],
    circuit: { inputs: ["sel", "x0", "x1"], gates: [{ id: "y", type: "MUX2", in: ["x0", "x1", "sel"] }], outputs: ["y"] },
  },
  {
    name: "last assignment wins",
    summary: "Both assignments to y are read in order; only the last one is built. The OR gate never appears.",
    lines: [
      { text: "always @* begin" },
      { text: "  x = a & b;", gates: ["x"], note: "AND gate" },
      { text: "  y = x | c;", note: "overwritten below: no hardware is built for this" },
      { text: "  y = x ^ c;", gates: ["y"], note: "the final value of y: XOR gate" },
      { text: "end" },
    ],
    circuit: {
      inputs: ["a", "b", "c"],
      gates: [
        { id: "x", type: "AND", in: ["a", "b"] },
        { id: "y", type: "XOR", in: ["x", "c"] },
      ],
      outputs: ["x", "y"],
    },
  },
  {
    name: "assign x ? a&b : b&c",
    summary: "Every expression inside the conditional becomes hardware feeding the multiplexer (Verilog recap).",
    lines: [
      { text: "assign y = x ? a & b : b & c;", gates: ["p", "q", "y"], note: "two AND gates feed a 2-to-1 MUX selected by x" },
    ],
    circuit: {
      inputs: ["x", "a", "b", "c"],
      gates: [
        { id: "p", type: "AND", in: ["a", "b"] },
        { id: "q", type: "AND", in: ["b", "c"] },
        { id: "y", type: "MUX2", in: ["q", "p", "x"] },
      ],
      outputs: ["y"],
    },
  },
  {
    name: "2-to-4 decoder (case)",
    summary: "Each case item becomes the AND gate that detects that code; the default/en check gates them all.",
    lines: [
      { text: "always @* begin" },
      { text: "  d = 4'b0000;", note: "default: all outputs 0 (also when en = 0)" },
      { text: "  if (en)", gates: ["d0", "d1", "d2", "d3"], note: "en is an input to every AND gate" },
      { text: "    case ({i1, i0})" },
      { text: "      2'b00: d = 4'b0001;", gates: ["d0"], note: "d0 = en·i1'·i0'" },
      { text: "      2'b01: d = 4'b0010;", gates: ["d1"], note: "d1 = en·i1'·i0" },
      { text: "      2'b10: d = 4'b0100;", gates: ["d2"], note: "d2 = en·i1·i0'" },
      { text: "      2'b11: d = 4'b1000;", gates: ["d3"], note: "d3 = en·i1·i0" },
      { text: "    endcase" },
      { text: "end" },
    ],
    circuit: {
      inputs: ["en", "i1", "i0"],
      gates: [
        { id: "d0", type: "AND", in: ["en", "!i1", "!i0"] },
        { id: "d1", type: "AND", in: ["en", "!i1", "i0"] },
        { id: "d2", type: "AND", in: ["en", "i1", "!i0"] },
        { id: "d3", type: "AND", in: ["en", "i1", "i0"] },
      ],
      outputs: ["d0", "d1", "d2", "d3"],
    },
  },
  {
    name: "4-to-1 mux (case)",
    summary: "A case on a 2-bit select is a 4-to-1 multiplexer: one AND gate per item, ORed together.",
    lines: [
      { text: "always @*" },
      { text: "  case (sel)" },
      { text: "    2'b00: q = d0;", gates: ["t0"], note: "t0 = sel1'·sel0'·d0" },
      { text: "    2'b01: q = d1;", gates: ["t1"], note: "t1 = sel1'·sel0·d1" },
      { text: "    2'b10: q = d2;", gates: ["t2"], note: "t2 = sel1·sel0'·d2" },
      { text: "    2'b11: q = d3;", gates: ["t3"], note: "t3 = sel1·sel0·d3" },
      { text: "  endcase", gates: ["q"], note: "the items are ORed into q" },
    ],
    circuit: {
      inputs: ["sel1", "sel0", "d0", "d1", "d2", "d3"],
      gates: [
        { id: "t0", type: "AND", in: ["!sel1", "!sel0", "d0"] },
        { id: "t1", type: "AND", in: ["!sel1", "sel0", "d1"] },
        { id: "t2", type: "AND", in: ["sel1", "!sel0", "d2"] },
        { id: "t3", type: "AND", in: ["sel1", "sel0", "d3"] },
        { id: "q", type: "OR", in: ["t0", "t1", "t2", "t3"] },
      ],
      outputs: ["q"],
    },
  },
];

function VerilogHw({ group }: { group: "structural" | "behavioural" }) {
  const list = group === "structural" ? STRUCTURAL : BEHAVIOURAL;
  const [pi, setPi] = useState(0);
  const [line, setLine] = useState<number | null>(null);
  const [ins, setIns] = useState<Record<string, Bit>>({});
  const snip = list[pi];
  const c = snip.circuit;
  const env: Record<string, Bit> = Object.fromEntries(c.inputs.map((i) => [i, ins[i] ?? 0]));
  const values = evalCircuit(c, env);
  const outs = c.outputs ?? [];
  const sel = line === null ? undefined : snip.lines[line];
  const table =
    c.inputs.length <= 4
      ? Array.from({ length: 1 << c.inputs.length }, (_, m) => {
          const e = rowEnv(c.inputs, m);
          const v = evalCircuit(c, e);
          return [...c.inputs.map((i) => e[i]), ...outs.map((o) => (v[o] === null ? "?" : String(v[o])))];
        })
      : null;
  const cur = c.inputs.reduce((a, i) => a * 2 + env[i], 0);
  const choose = (k: number) => {
    setPi(k);
    setLine(null);
    setIns({});
  };
  return (
    <VizFrame
      title={group === "structural" ? "From Verilog to hardware: structural code" : "From Verilog to hardware: behavioural code"}
      hint="Click a line of code to highlight the hardware it creates. Click the input boxes on the schematic to simulate."
      onReset={() => choose(0)}
      figure={
        <div>
          <pre className="code" style={{ fontSize: "0.8rem", padding: "6px 0" }}>
            {snip.lines.map((l, k) => (
              <div
                key={k}
                onClick={() => setLine(line === k ? null : k)}
                style={{
                  cursor: "pointer",
                  padding: "0 10px",
                  background: line === k ? "var(--accent-soft)" : undefined,
                  borderLeft: `3px solid ${line === k ? "var(--accent)" : l.gates ? "var(--border)" : "transparent"}`,
                }}
              >
                {l.text || " "}
              </div>
            ))}
          </pre>
          <CircuitSvg circuit={c} values={values} highlight={sel?.gates} onToggleInput={(n) => setIns({ ...env, [n]: (1 - env[n]) as Bit })} />
        </div>
      }
      controls={<Choice value={pi} onChange={choose} options={list.map((s, k) => ({ v: k, label: s.name }))} />}
      readout={
        <>
          <Read tex={snip.summary} />
          {sel ? <Read label="Line" tex={sel.note ? sel.note : sel.gates ? "creates the highlighted gate(s)" : "declaration only: no gate"} tone="good" /> : <Read label="Line" tex="click a line of code" />}
          {outs.map((o) => (
            <Read key={o} label={o} tex={`**${values[o] === null ? "?" : values[o]}**`} tone={values[o] === 1 ? "good" : undefined} />
          ))}
          {table && <TableView head={[...c.inputs, ...outs]} rows={table} highlightRow={cur} />}
        </>
      }
      tasks={
        group === "structural"
          ? [
              "Predict: in **and g1 (and1out, a, b);** which name is the gate's output? Click the line to check.",
              "Compare the **primitives** and **assign** versions of andorinv: are the truth tables identical?",
              "In simple_circ the output gate is written first. Why does the order of the lines not change the circuit?",
              "In full_add, click each instance line. Which internal wire carries M1's sum into M2?",
            ]
          : [
              "Predict: do the **assign ?:** and **always if/else** versions build different hardware? Compare them.",
              "Open **last assignment wins** and click the line **y = x | c;**. Why does it create no gate?",
              "In the decoder, set en = 0 and toggle i1, i0. Which line of code explains why every output stays 0?",
              "In the 4-to-1 mux, set sel1 sel0 = 10 and toggle d2, then d0. Which AND gate passes the data?",
            ]
      }
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Expression lab (literals, vectors, operators, widths)

const INIT_SIGS: Record<string, string> = { a: "0110", b: "1010", X: "10010110", sel: "1" };

const PRESETS: Record<"literal" | "operator", [string, number][]> = {
  literal: [
    ["8'hA5", 8],
    ["8'b0100_1111", 8],
    ["16'h2E69", 16],
    ["4'd-3", 8],
    ["{{3{X[7]}}, X}", 11],
    ["{3{X[7]}, X}", 11],
    ["{a, b}", 8],
    ["{a[3:0], 4'b0000}", 8],
    ["X[5:2]", 4],
    ["4'b1001", 6],
    ["6'b110011", 4],
    ["{3{2'b10}}", 6],
  ],
  operator: [
    ["a & b", 4],
    ["a && b", 4],
    ["a | b", 4],
    ["a ^ b", 4],
    ["~a", 4],
    ["!a", 4],
    ["a + b", 4],
    ["a + b", 5],
    ["a - b", 4],
    ["a > b", 1],
    ["a == 4'b0110", 1],
    ["sel ? a : b", 4],
  ],
};

const bitColor = (b: B4) => (b === "1" ? "var(--good)" : b === "0" ? "var(--muted)" : b === "x" ? "var(--warn)" : "var(--accent)");

function Bits({ bits, onClick }: { bits: B4[]; onClick?: (k: number) => void }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, flexWrap: "wrap", fontFamily: "var(--font-geist-mono), Consolas, monospace" }}>
      {bits.map((b, k) => (
        <span
          key={k}
          onClick={onClick ? () => onClick(k) : undefined}
          title={onClick ? "click to flip the bit" : undefined}
          style={{
            display: "inline-block",
            minWidth: 18,
            textAlign: "center",
            borderRadius: 4,
            padding: "1px 2px",
            fontWeight: 700,
            cursor: onClick ? "pointer" : undefined,
            color: b === "1" ? "var(--surface)" : bitColor(b),
            background: b === "1" ? "var(--good)" : "var(--surface)",
            border: `1px solid ${b === "1" ? "var(--good)" : "var(--border)"}`,
            marginRight: (bits.length - 1 - k) % 4 === 0 && k !== bits.length - 1 ? 5 : 0,
          }}
        >
          {b}
        </span>
      ))}
    </span>
  );
}

const fmtVal = (bits: B4[]) => {
  if (!bits.every((b) => b === "0" || b === "1")) return "contains x/z: no numeric value";
  const u = BigInt("0b" + bits.join(""));
  const s = bits[0] === "1" ? u - (BigInt(1) << BigInt(bits.length)) : u;
  const hex = u.toString(16).toUpperCase().padStart(Math.ceil(bits.length / 4), "0");
  return `${bits.length}'h${hex} = ${u} unsigned = ${s} as two's complement`;
};

function ExprLab({ kind }: { kind: "literal" | "operator" }) {
  const presets = PRESETS[kind];
  const [expr, setExpr] = useState(presets[kind === "literal" ? 2 : 0][0]);
  const [W, setW] = useState(presets[kind === "literal" ? 2 : 0][1]);
  const [sigBits, setSigBits] = useState<Record<string, B4[]>>(() => Object.fromEntries(Object.entries(INIT_SIGS).map(([k, v]) => [k, v.split("") as B4[]])));
  const res = useMemo(() => {
    const sigs: Record<string, VSig> = Object.fromEntries(Object.entries(sigBits).map(([k, v]) => [k, { width: v.length, bits: v }]));
    const trace: TraceRow[] = [];
    try {
      const r = assignV(expr, W, sigs, trace);
      return { ok: true as const, ...r, trace };
    } catch (e) {
      return { ok: false as const, err: (e as Error).message };
    }
  }, [expr, W, sigBits]);
  const cycle = (name: string, k: number) => {
    const nx: Record<B4, B4> = { "0": "1", "1": "0", x: "0", z: "0" };
    setSigBits({ ...sigBits, [name]: sigBits[name].map((b, j) => (j === k ? nx[b] : b)) });
  };
  const seen = new Set<string>();
  const rows = res.ok
    ? res.trace
        .filter((t) => {
          const key = `${t.src}|${t.width}`;
          if (seen.has(key) || t.src === expr.trim()) return false;
          seen.add(key);
          return true;
        })
        .slice(-10)
        .map((t) => [`\`${t.src}\``, t.width, t.bits.join(""), t.note ?? ""])
    : [];
  return (
    <VizFrame
      title={kind === "literal" ? "Literal and vector decoder" : "Operator playground: widths, & vs &&"}
      hint="Type a Verilog expression or pick a preset; set the width of the target y. Click the bits of a, b, X, sel to flip them."
      onReset={() => {
        setExpr(presets[kind === "literal" ? 2 : 0][0]);
        setW(presets[kind === "literal" ? 2 : 0][1]);
        setSigBits(Object.fromEntries(Object.entries(INIT_SIGS).map(([k, v]) => [k, v.split("") as B4[]])));
      }}
      figure={
        <div style={{ display: "grid", gap: 10 }}>
          <div className="small muted">Signals</div>
          {Object.entries(sigBits).map(([name, bits]) => (
            <div key={name} className="row" style={{ gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <code style={{ minWidth: 110 }}>{`wire${bits.length > 1 ? ` [${bits.length - 1}:0]` : ""} ${name}`}</code>
              <Bits bits={bits} onClick={(k) => cycle(name, k)} />
            </div>
          ))}
          <div className="small muted" style={{ marginTop: 6 }}>
            Statement
          </div>
          <div className="row" style={{ gap: 6, alignItems: "center", flexWrap: "wrap", fontFamily: "var(--font-geist-mono), Consolas, monospace" }}>
            <span>{`wire [${W - 1}:0] y = `}</span>
            <input className="answer-input" style={{ flex: "1 1 180px", width: "auto" }} value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false} aria-label="Verilog expression" />
            <span>;</span>
          </div>
          <div className="small muted" style={{ marginTop: 6 }}>
            Result
          </div>
          {res.ok ? (
            <div>
              <Bits bits={res.bits} />
            </div>
          ) : (
            <div style={{ color: "var(--bad)", fontWeight: 600 }}>✗ {res.err}</div>
          )}
        </div>
      }
      controls={
        <>
          <Slider label="width of y" value={W} min={1} max={16} step={1} onChange={setW} format={(v) => `${v} bit${v > 1 ? "s" : ""}`} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            {presets.map(([e, w], k) => (
              <button
                key={k}
                className={`chip ${e === expr && w === W ? "on" : ""}`}
                onClick={() => {
                  setExpr(e);
                  setW(w);
                }}
                style={{ fontFamily: "var(--font-geist-mono), Consolas, monospace", fontSize: "0.8rem" }}
              >
                {e} {`[${w}]`}
              </button>
            ))}
          </div>
        </>
      }
      readout={
        res.ok ? (
          <>
            <Read label="y" tex={`**${res.bits.join("")}** (${fmtVal(res.bits)})`} tone="good" />
            <Read
              label="Width"
              tex={`expression is ${res.selfWidth} bit${res.selfWidth > 1 ? "s" : ""} wide, y is ${W} bit${W > 1 ? "s" : ""}${res.ctx > W ? `: **truncated at the MSB** (top ${res.ctx - W} bit${res.ctx - W > 1 ? "s" : ""} dropped)` : res.selfWidth < W ? ": the wider y has room for extra MSBs (a carry is kept, otherwise **zero-padded at the MSB**)" : ": widths match"}`}
            />
            {rows.length > 0 && <TableView head={["sub-expression", "width", "value", "note"]} rows={rows} />}
          </>
        ) : (
          <Read label="Error" tex={res.err.replace(/\$/g, "")} tone="bad" />
        )
      }
      tasks={
        kind === "literal"
          ? [
              "Predict the bits of **8'hA5** and **16'h2E69**, then check. Does **8'b0100_1111** equal **8'h4F**?",
              "Try **4'd-3** (PYP 2021-22 S1 Q1(1)). Why does it not fit the form <size>'<radix><value>?",
              "Compare **{{3{X[7]}}, X}** with **{3{X[7]}, X}**. Then flip X[7] and watch the sign extension follow it.",
              "Try **4'b1001** into 6 bits and **6'b110011** into 4 bits: which end is padded, which end is cut?",
            ]
          : [
              "Predict **a & b** and **a && b** for a = 0110, b = 1010, then check. Why is one 4 bits and the other 1 bit?",
              "Compare **a + b** with y = 4 and y = 5 bits. Where did the carry go?",
              "Set a = 0011 and b = 0101 and try **a - b** with y = 4. Read the result as a 4-bit two's complement number.",
              "Try **a > b** and **a == 4'b0110**. Why is the result always a single bit, 1 (true) or 0 (false)?",
            ]
      }
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Latch inference

type Scenario = "if" | "case";
type Fix = "none" | "else" | "default";

const LATCH_CODE: Record<Scenario, Record<Fix, string>> = {
  if: {
    none: "always @* begin\n  if (en)\n    y = d;\n  // en = 0: y not assigned!\nend",
    else: "always @* begin\n  if (en)\n    y = d;\n  else\n    y = 1'b0;\nend",
    default: "always @* begin\n  y = 1'b0;   // default first\n  if (en)\n    y = d;\nend",
  },
  case: {
    none: "always @*\n  case ({s1, s0})\n    2'b00: y = a;\n    2'b01: y = b;\n    2'b10: y = c;\n    // 2'b11: y not assigned!\n  endcase",
    else: "always @*\n  case ({s1, s0})\n    2'b00:   y = a;\n    2'b01:   y = b;\n    2'b10:   y = c;\n    default: y = 1'b0;\n  endcase",
    default: "always @* begin\n  y = 1'b0;   // default first\n  case ({s1, s0})\n    2'b00: y = a;\n    2'b01: y = b;\n    2'b10: y = c;\n  endcase\nend",
  },
};

function latchCircuit(sc: Scenario, latch: boolean): CircuitSpec {
  if (sc === "if")
    return latch
      ? { inputs: ["en", "d"], gates: [{ id: "y", type: "DLATCH", in: ["d", "en"] }], outputs: ["y"] }
      : { inputs: ["en", "d"], gates: [{ id: "y", type: "AND", in: ["en", "d"] }], outputs: ["y"] };
  return latch
    ? {
        inputs: ["s1", "s0", "a", "b", "c"],
        gates: [
          { id: "m0", type: "MUX2", in: ["a", "b", "s0"] },
          { id: "m", type: "MUX2", in: ["m0", "c", "s1"] },
          { id: "le", type: "NAND", in: ["s1", "s0"] },
          { id: "y", type: "DLATCH", in: ["m", "le"] },
        ],
        outputs: ["y"],
        showNets: true,
      }
    : {
        inputs: ["s1", "s0", "a", "b", "c"],
        gates: [
          { id: "m0", type: "MUX2", in: ["a", "b", "s0"] },
          { id: "m1", type: "AND", in: ["c", "!s0"] },
          { id: "y", type: "MUX2", in: ["m0", "m1", "s1"] },
        ],
        outputs: ["y"],
        showNets: true,
      };
}

function LatchLab() {
  const [sc, setSc] = useState<Scenario>("if");
  const [fix, setFix] = useState<Fix>("none");
  const latch = fix === "none";
  const circuit = useMemo(() => latchCircuit(sc, latch), [sc, latch]);
  const start = (s: Scenario): Record<string, Bit> => (s === "if" ? { en: 1, d: 1 } : { s1: 0, s0: 0, a: 1, b: 0, c: 1 });
  const [ins, setIns] = useState<Record<string, Bit>>(start("if"));
  const [prev, setPrev] = useState<Record<string, Val>>({});
  const [hist, setHist] = useState<{ ins: Record<string, Bit>; y: Val }[]>([]);
  const values = evalCircuit(circuit, ins, {}, prev);
  const y = values.y;
  const record = (nextIns: Record<string, Bit>) => {
    const v = evalCircuit(circuit, nextIns, {}, values);
    setPrev(values);
    setIns(nextIns);
    setHist((h) => [...(h.length ? h : [{ ins, y }]), { ins: nextIns, y: v.y }].slice(-14));
  };
  const reset = (s: Scenario, f: Fix) => {
    setSc(s);
    setFix(f);
    setIns(start(s));
    setPrev({});
    setHist([]);
  };
  const ch = (v: Val) => (v === 1 ? "1" : v === 0 ? "0" : "x");
  const wave = hist.length > 1 ? [...circuit.inputs.map((n) => ({ name: n, wave: hist.map((h) => ch(h.ins[n])).join("") })), { name: "y", wave: hist.map((h) => ch(h.y)).join("") }] : null;
  const holding = latch && (sc === "if" ? ins.en === 0 : ins.s1 === 1 && ins.s0 === 1);
  return (
    <VizFrame
      title="Incomplete assignment → latch"
      hint="Pick a coding style. Toggle inputs on the schematic; each click adds a step to the waveform so you can see whether y remembers anything."
      onReset={() => reset("if", "none")}
      figure={
        <div>
          <pre className="code" style={{ fontSize: "0.8rem" }}>
            {LATCH_CODE[sc][fix]}
          </pre>
          <CircuitSvg circuit={circuit} values={values} highlight={latch ? ["y"] : undefined} onToggleInput={(n) => record({ ...ins, [n]: (1 - ins[n]) as Bit })} />
          {wave && (
            <div style={{ marginTop: 8 }}>
              <WaveSvg signals={wave} unit={22} />
            </div>
          )}
        </div>
      }
      controls={
        <>
          <Choice
            value={sc}
            onChange={(s) => reset(s, fix)}
            options={[
              { v: "if", label: "if without else" },
              { v: "case", label: "case missing an item" },
            ]}
          />
          <Choice
            value={fix}
            onChange={(f) => reset(sc, f)}
            options={[
              { v: "none", label: "as written" },
              { v: "else", label: sc === "if" ? "add else" : "add default:" },
              { v: "default", label: "default at top" },
            ]}
          />
        </>
      }
      readout={
        <>
          <Read label="Synthesis" tex={latch ? "**latch inferred** (warning): y must keep its old value on the unassigned path" : "**pure combinational logic**: y is assigned on every path"} tone={latch ? "bad" : "good"} />
          <Read label="y" tex={`**${y === null ? "?" : y}**${holding ? ": holding the stored value (latch closed)" : ""}`} tone={holding ? "warn" : undefined} />
          <Read tex={sc === "if" ? "Latch enable = en: transparent while en = 1, holds while en = 0." : "Latch enable = (s1·s0)': transparent for codes 00, 01, 10, holds for 11."} />
        </>
      }
      tasks={[
        "Predict: with **if without else**, set en = 1 and toggle d, then set en = 0 and toggle d again. What does y do in each phase?",
        "Choose **add else** and repeat. Why does the latch disappear from the schematic?",
        "Switch to **case missing an item**, select 11 (s1 = s0 = 1) and toggle a, b, c. Which value is y stuck at, and where did it come from?",
        "Compare **add default:** with **default at top**: same hardware? Which style protects every output at once?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Mini Verilog expression evaluator: 4-state values, unsigned vectors, context-determined widths
// (operands of + - * & | ^ ~ ?: are extended to max(operand widths, target width) before the operation).
type B4 = "0" | "1" | "x" | "z";
type Node =
  | { t: "num"; bits: B4[]; sized: boolean; s: number; e: number }
  | { t: "id"; name: string; s: number; e: number }
  | { t: "sel"; name: string; hi: number; lo: number; s: number; e: number }
  | { t: "cat"; es: Node[]; n: number; s: number; e: number }
  | { t: "un"; op: string; a: Node; s: number; e: number }
  | { t: "bin"; op: string; l: Node; r: Node; s: number; e: number }
  | { t: "cond"; c: Node; a: Node; b: Node; s: number; e: number };

interface VSig {
  width: number;
  bits: B4[]; // MSB first
}
interface TraceRow {
  src: string;
  width: number;
  bits: B4[];
  note?: string;
}

const BASES: Record<string, number> = { b: 2, o: 8, d: 10, h: 16 };

function digitsToBits(base: number, digits: string, size: number): B4[] {
  const d = digits.replace(/_/g, "").toLowerCase().replace(/\?/g, "z");
  if (!d.length) throw new Error("literal has no digits");
  let bits: B4[] = [];
  if (base === 10) {
    if (/^[xz]$/.test(d)) bits = [d as B4];
    else {
      if (!/^\d+$/.test(d)) throw new Error(`"${digits}" is not a decimal number`);
      bits = BigInt(d).toString(2).split("") as B4[];
    }
  } else {
    const per = base === 2 ? 1 : base === 8 ? 3 : 4;
    for (const c of d) {
      if (c === "x" || c === "z") bits.push(...(Array(per).fill(c) as B4[]));
      else {
        const v = parseInt(c, base);
        if (Number.isNaN(v)) throw new Error(`"${c}" is not a base-${base} digit`);
        bits.push(...(v.toString(2).padStart(per, "0").split("") as B4[]));
      }
    }
  }
  // Pad (x/z MSB pads with x/z, otherwise 0) or truncate to the literal's size.
  if (bits.length < size) {
    const pad: B4 = bits[0] === "x" || bits[0] === "z" ? bits[0] : "0";
    bits = [...(Array(size - bits.length).fill(pad) as B4[]), ...bits];
  } else bits = bits.slice(bits.length - size);
  return bits;
}

function parseV(src: string, sigs: Record<string, VSig>): Node {
  let i = 0;
  const ws = () => {
    while (i < src.length && /\s/.test(src[i])) i++;
  };
  const fail = (m: string): never => {
    throw new Error(`${m} (at column ${i + 1})`);
  };
  const peek = (s: string) => src.startsWith(s, i);
  const eat = (s: string) => {
    ws();
    if (peek(s)) {
      i += s.length;
      return true;
    }
    return false;
  };
  const expect = (s: string) => {
    if (!eat(s)) fail(`expected "${s}"`);
  };
  const num = (): number => {
    ws();
    const m = /^\d+/.exec(src.slice(i));
    if (!m) fail("expected a number");
    i += m![0].length;
    return Number(m![0]);
  };

  function primary(): Node {
    ws();
    const s = i;
    if (eat("(")) {
      const e = cond();
      expect(")");
      return { ...e, s, e: i } as Node;
    }
    if (eat("{")) {
      // replication {n{...}} or concatenation {a, b}
      ws();
      const save = i;
      const m = /^\d+\s*\{/.exec(src.slice(i));
      if (m) {
        const n = num();
        expect("{");
        const es = [cond()];
        while (eat(",")) es.push(cond());
        expect("}");
        ws();
        if (peek(",")) fail("a replication inside a concatenation needs its own braces: write {{3{X[7]}}, X}, not {3{X[7]}, X}");
        expect("}");
        if (n < 1) fail("replication count must be at least 1");
        return { t: "cat", es, n, s, e: i };
      }
      i = save;
      const es = [cond()];
      while (eat(",")) es.push(cond());
      if (eat("{")) fail('a replication must be wrapped in its own braces, e.g. {{3{X[7]}}, X}');
      expect("}");
      for (const x of es) if (x.t === "num" && !x.sized) fail("give every constant in a concatenation a size, e.g. 4'b0000");
      return { t: "cat", es, n: 1, s, e: i };
    }
    // literal: [size]'[s]base digits, or plain decimal
    const rest = src.slice(i);
    if (/^\d*\s*'\s*[sS]?[bBoOdDhH]\s*-/.test(rest)) fail("illegal literal: the form is <size>'<radix><value>, e.g. 4'd3; a minus sign does not fit inside it");
    if (/^\d+\s*'\s*-/.test(rest)) fail("illegal literal: the form is <size>'<radix><value>, e.g. 4'd3; a minus sign does not fit inside it");
    if (/^\d+\s*[bBoOdDhH]\s*'/.test(rest)) fail("illegal literal: the form is <size>'<radix><value>, e.g. 4'd3 (apostrophe before the radix)");
    const lit = /^(\d+)?\s*'\s*([sS]?)([bBoOdDhH])\s*([0-9a-fA-FxXzZ?_]+)/.exec(rest);
    if (lit) {
      i += lit[0].length;
      const size = lit[1] ? Number(lit[1]) : 32;
      if (size < 1) fail("size must be at least 1");
      return { t: "num", bits: digitsToBits(BASES[lit[3].toLowerCase()], lit[4], size), sized: !!lit[1], s, e: i };
    }
    const dec = /^\d[\d_]*/.exec(src.slice(i));
    if (dec) {
      i += dec[0].length;
      return { t: "num", bits: digitsToBits(10, dec[0], 32), sized: false, s, e: i };
    }
    const id = /^[A-Za-z_][A-Za-z0-9_$]*/.exec(src.slice(i));
    if (id) {
      i += id[0].length;
      const name = id[0];
      if (!sigs[name]) fail(`unknown signal "${name}"`);
      if (eat("[")) {
        const hi = num();
        let lo = hi;
        if (eat(":")) lo = num();
        expect("]");
        if (hi < lo) fail(`part select [${hi}:${lo}] must be [msb:lsb]`);
        return { t: "sel", name, hi, lo, s, e: i };
      }
      return { t: "id", name, s, e: i };
    }
    return fail(i >= src.length ? "expression ends too early" : `unexpected "${src[i]}"`);
  }

  const UN = ["~&", "~|", "~^", "^~", "!", "~", "-", "+", "&", "|", "^"];
  function unary(): Node {
    ws();
    const s = i;
    for (const op of UN) {
      if (peek(op) && !(op === "!" && peek("!="))) {
        i += op.length;
        const a = unary();
        return { t: "un", op: op === "^~" ? "~^" : op, a, s, e: i };
      }
    }
    return primary();
  }
  // binary levels, lowest last
  const LEVELS: string[][] = [
    ["*", "/", "%"],
    ["+", "-"],
    ["<<<", ">>>", "<<", ">>"],
    ["<=", ">=", "<", ">"],
    ["===", "!==", "==", "!="],
    ["&"],
    ["^~", "~^", "^"],
    ["|"],
    ["&&"],
    ["||"],
  ];
  function level(k: number): Node {
    if (k < 0) return unary();
    const s0 = i;
    let l = level(k - 1);
    for (;;) {
      ws();
      const op = LEVELS[k].find((o) => peek(o) && !(o === "&" && peek("&&")) && !(o === "|" && peek("||")) && !(o === "<" && peek("<<")) && !(o === ">" && peek(">>")));
      if (!op) break;
      i += op.length;
      const r = level(k - 1);
      l = { t: "bin", op: op === "^~" ? "~^" : op, l, r, s: s0, e: i };
    }
    return l;
  }
  function cond(): Node {
    ws();
    const s = i;
    const c = level(LEVELS.length - 1);
    if (eat("?")) {
      const a = cond();
      expect(":");
      const b = cond();
      return { t: "cond", c, a, b, s, e: i };
    }
    return c;
  }
  const root = cond();
  ws();
  if (i < src.length) fail(`unexpected "${src[i]}"`);
  return root;
}

/** Self-determined width. */
function selfWidth(n: Node, sigs: Record<string, VSig>): number {
  switch (n.t) {
    case "num":
      return n.bits.length;
    case "id":
      return sigs[n.name].width;
    case "sel":
      return n.hi - n.lo + 1;
    case "cat":
      return n.n * n.es.reduce((s, e) => s + selfWidth(e, sigs), 0);
    case "un":
      return ["~", "-", "+"].includes(n.op) ? selfWidth(n.a, sigs) : 1;
    case "bin":
      if (["<", "<=", ">", ">=", "==", "!=", "===", "!==", "&&", "||"].includes(n.op)) return 1;
      if (["<<", ">>", "<<<", ">>>"].includes(n.op)) return selfWidth(n.l, sigs);
      return Math.max(selfWidth(n.l, sigs), selfWidth(n.r, sigs));
    case "cond":
      return Math.max(selfWidth(n.a, sigs), selfWidth(n.b, sigs));
  }
}

const fit = (bits: B4[], w: number): B4[] => (bits.length >= w ? bits.slice(bits.length - w) : [...(Array(w - bits.length).fill("0") as B4[]), ...bits]);
const known = (b: B4[]) => b.every((x) => x === "0" || x === "1");
const toBig = (b: B4[]) => (b.length ? BigInt("0b" + b.join("")) : BigInt(0));
const fromBig = (v: bigint, w: number): B4[] => {
  if (w === 0) return [];
  const mod = BigInt(1) << BigInt(w);
  return (((v % mod) + mod) % mod).toString(2).padStart(w, "0").split("") as B4[];
};
const allX = (w: number): B4[] => Array(w).fill("x") as B4[];
const norm = (b: B4): B4 => (b === "z" ? "x" : b);
function andB(a: B4, b: B4): B4 {
  a = norm(a);
  b = norm(b);
  if (a === "0" || b === "0") return "0";
  if (a === "1" && b === "1") return "1";
  return "x";
}
function orB(a: B4, b: B4): B4 {
  a = norm(a);
  b = norm(b);
  if (a === "1" || b === "1") return "1";
  if (a === "0" && b === "0") return "0";
  return "x";
}
function xorB(a: B4, b: B4): B4 {
  a = norm(a);
  b = norm(b);
  if (a === "x" || b === "x") return "x";
  return a === b ? "0" : "1";
}
const notB = (a: B4): B4 => (norm(a) === "x" ? "x" : a === "1" ? "0" : "1");
/** Truth value of a vector: 1 if any bit is 1, 0 if all 0, else x. */
const truth = (b: B4[]): B4 => (b.some((x) => x === "1") ? "1" : b.every((x) => x === "0") ? "0" : "x");

function evalV(n: Node, w: number, sigs: Record<string, VSig>, src: string, trace?: TraceRow[]): B4[] {
  const sw = (x: Node) => selfWidth(x, sigs);
  const rec = (x: Node, ww: number) => evalV(x, ww, sigs, src, trace);
  let out: B4[];
  let note: string | undefined;
  switch (n.t) {
    case "num":
      out = fit(n.bits, w);
      if (w > n.bits.length) note = `zero-extended from ${n.bits.length} to ${w} bits`;
      break;
    case "id":
      out = fit(sigs[n.name].bits, w);
      if (w > sigs[n.name].width) note = `zero-extended from ${sigs[n.name].width} to ${w} bits`;
      break;
    case "sel": {
      const s = sigs[n.name];
      const bits: B4[] = [];
      for (let k = n.hi; k >= n.lo; k--) bits.push(k < s.width ? s.bits[s.width - 1 - k] : "x");
      out = fit(bits, w);
      if (n.hi >= s.width) note = "index out of range reads x";
      break;
    }
    case "cat": {
      const parts = n.es.flatMap((e) => rec(e, sw(e)));
      const all: B4[] = [];
      for (let k = 0; k < n.n; k++) all.push(...parts);
      out = fit(all, w);
      break;
    }
    case "un": {
      if (n.op === "~") out = rec(n.a, w).map(notB);
      else if (n.op === "-" || n.op === "+") {
        const a = rec(n.a, w);
        out = !known(a) ? allX(w) : n.op === "-" ? fromBig(-toBig(a), w) : a;
        if (n.op === "-") note = `two's complement negation in ${w} bits`;
      } else {
        const a = rec(n.a, sw(n.a));
        let r: B4;
        if (n.op === "!") r = notB(truth(a));
        else {
          const base = n.op.replace("~", "");
          r = a.reduce((acc, b) => (base === "&" ? andB(acc, b) : base === "|" ? orB(acc, b) : xorB(acc, b)));
          if (n.op.startsWith("~")) r = notB(r);
        }
        out = fit([r], w);
      }
      break;
    }
    case "bin": {
      const op = n.op;
      if (["+", "-", "*", "/", "%"].includes(op)) {
        const a = rec(n.l, w);
        const b = rec(n.r, w);
        if (!known(a) || !known(b)) out = allX(w);
        else {
          const x = toBig(a);
          const y = toBig(b);
          if ((op === "/" || op === "%") && y === BigInt(0)) out = allX(w);
          else out = fromBig(op === "+" ? x + y : op === "-" ? x - y : op === "*" ? x * y : op === "/" ? x / y : x % y, w);
        }
        note = `${w}-bit ${op === "+" ? "addition" : op === "-" ? "subtraction" : "arithmetic"}; anything above bit ${w - 1} is lost`;
      } else if (["&", "|", "^", "~^"].includes(op)) {
        const a = rec(n.l, w);
        const b = rec(n.r, w);
        out = a.map((x, k) => (op === "&" ? andB(x, b[k]) : op === "|" ? orB(x, b[k]) : op === "^" ? xorB(x, b[k]) : notB(xorB(x, b[k]))));
      } else if (["<<", ">>", "<<<", ">>>"].includes(op)) {
        const a = rec(n.l, w);
        const s = rec(n.r, sw(n.r));
        if (!known(s)) out = allX(w);
        else {
          const k = Number(toBig(s));
          if (op.startsWith("<")) out = k >= w ? (Array(w).fill("0") as B4[]) : ([...a.slice(k), ...Array(k).fill("0")] as B4[]);
          else out = k >= w ? (Array(w).fill("0") as B4[]) : ([...Array(k).fill("0"), ...a.slice(0, w - k)] as B4[]);
        }
      } else if (["&&", "||"].includes(op)) {
        const a = truth(rec(n.l, sw(n.l)));
        const b = truth(rec(n.r, sw(n.r)));
        out = fit([op === "&&" ? andB(a, b) : orB(a, b)], w);
      } else {
        const m = Math.max(sw(n.l), sw(n.r));
        const a = rec(n.l, m);
        const b = rec(n.r, m);
        let r: B4;
        if (op === "===" || op === "!==") {
          const eq = a.every((x, k) => x === b[k]);
          r = (eq === (op === "===")) ? "1" : "0";
        } else if (op === "==" || op === "!=") {
          const differ = a.some((x, k) => known([x]) && known([b[k]]) && x !== b[k]);
          r = differ ? "0" : !known(a) || !known(b) ? "x" : "1";
          if (op === "!=") r = notB(r);
        } else {
          if (!known(a) || !known(b)) r = "x";
          else {
            const x = toBig(a);
            const y = toBig(b);
            r = (op === "<" ? x < y : op === "<=" ? x <= y : op === ">" ? x > y : x >= y) ? "1" : "0";
          }
        }
        out = fit([r], w);
        if (m > Math.min(sw(n.l), sw(n.r))) note = `operands compared at ${m} bits`;
      }
      break;
    }
    case "cond": {
      const c = truth(rec(n.c, sw(n.c)));
      if (c === "1") out = rec(n.a, w);
      else if (c === "0") out = rec(n.b, w);
      else {
        const a = rec(n.a, w);
        const b = rec(n.b, w);
        out = a.map((x, k) => (x === b[k] && x !== "z" ? x : "x"));
        note = "condition is x: bits that differ become x";
      }
      break;
    }
  }
  trace?.push({ src: src.slice(n.s, n.e).trim(), width: w, bits: out, note });
  return out;
}

/** assign y = expr, with y declared [W-1:0]. */
function assignV(src: string, W: number, sigs: Record<string, VSig>, trace?: TraceRow[]) {
  const n = parseV(src, sigs);
  const sw = selfWidth(n, sigs);
  const ctx = Math.max(sw, W);
  const full = evalV(n, ctx, sigs, src, trace);
  return { bits: full.slice(full.length - W), selfWidth: sw, ctx };
}
