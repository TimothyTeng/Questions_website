"use client";

import { useMemo, useState, type ReactNode } from "react";
import { evalCircuit, type Bit, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec, GateSpec, WaveSignal } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, Slider, TableView, Toggle, TxtInline, VizFrame, WaveSvg, bitsOf } from "../kit";

// Interactive figures for the verilog-recap lesson, chosen by id (see LessonSection.visuals).
export default function VerilogRecapVisual({ id }: { id: string }) {
  switch (id) {
    case "reg-wire-helper":
      return <RegWireHelper />;
    case "param-override":
      return <ParamOverride />;
    case "vector-sizing":
      return <VectorSizing />;
    case "sensitivity-mismatch":
      return <SensitivityMismatch />;
    case "latch-detector":
      return <LatchDetector />;
    case "blocking-vs-nonblocking":
      return <BlockingVsNonblocking />;
    case "pipeline-timeline":
      return <PipelineTimeline />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Shared bits

const SOFT_BAD = "color-mix(in srgb, var(--bad) 16%, transparent)";
const SOFT_WARN = "color-mix(in srgb, var(--warn) 20%, transparent)";
const SOFT_GOOD = "color-mix(in srgb, var(--good) 18%, transparent)";

/** VizFrame tasks use the SC1004 renderer (no inline code), so drop the backticks there. */
const plain = (ts: string[]) => ts.map((t) => t.replace(/`([^`]+)`/g, "$1"));

/** Readout line rendered with the SC1005 markup (supports `code`). */
function CRead({ label, tex, tone }: { label?: string; tex: string; tone?: "good" | "bad" | "warn" }) {
  return (
    <div className={`viz-read ${tone ?? ""}`}>
      {label && <span className="viz-read-label">{label}</span>}
      <TxtInline text={tex} />
    </div>
  );
}

/** A Verilog listing with highlighted (current), flagged (bad) and dimmed (removed) lines. */
function CodeView({ lines, hi = [], bad = [], dim = [], title }: { lines: string[]; hi?: number[]; bad?: number[]; dim?: number[]; title?: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      {title && (
        <div className="small muted" style={{ margin: "2px 0" }}>
          {title}
        </div>
      )}
      <pre className="code" style={{ margin: 0, overflowX: "auto" }}>
        {lines.map((l, i) => (
          <span
            key={i}
            style={{
              display: "block",
              background: hi.includes(i) ? "var(--accent-soft)" : bad.includes(i) ? SOFT_BAD : undefined,
              opacity: dim.includes(i) ? 0.4 : 1,
              textDecoration: dim.includes(i) ? "line-through" : undefined,
            }}
          >
            {l || " "}
          </span>
        ))}
      </pre>
    </div>
  );
}

const bin = (v: number, n: number) => (n <= 0 ? "" : (((v % 2 ** n) + 2 ** n) % 2 ** n).toString(2).padStart(n, "0"));
const signed = (v: number, n: number) => (v >= 2 ** (n - 1) ? v - 2 ** n : v);

/** Row of bit cells drawn right-aligned (LSB on the right), so rows of different widths line up by bit index. */
interface Cell {
  bit: string;
  /** "" normal, "pad" (zero/extension bit added), "drop" (bit that is cut off), "src0".."src5" colour groups */
  tone?: "pad" | "drop" | "hi" | "";
  under?: string;
}
function BitCells({ rows, maxBits, cell = 20 }: { rows: { label: string; cells: Cell[] }[]; maxBits: number; cell?: number }) {
  const labelW = 86;
  const W = labelW + maxBits * cell + 8;
  const rowH = cell + 18;
  const H = rows.length * rowH + 16;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" style={{ maxWidth: Math.max(W * 1.7, 300) }} role="img" aria-label="Bit cells">
      {/* bit-index ruler */}
      {Array.from({ length: maxBits }, (_, i) => (
        <text key={i} x={labelW + (maxBits - 1 - i) * cell + cell / 2} y={11} textAnchor="middle" fontSize={8.5} fill="var(--muted)">
          {i}
        </text>
      ))}
      {rows.map((r, ri) => {
        const y0 = 16 + ri * rowH;
        return (
          <g key={ri}>
            <text x={labelW - 6} y={y0 + cell / 2 + 4} textAnchor="end" fontSize={11} fill="var(--text)" fontFamily="monospace">
              {r.label}
            </text>
            {r.cells.map((c, ci) => {
              const idx = r.cells.length - 1 - ci; // bit index
              const x = labelW + (maxBits - 1 - idx) * cell;
              const fill = c.tone === "pad" ? SOFT_WARN : c.tone === "drop" ? SOFT_BAD : c.tone === "hi" ? SOFT_GOOD : "var(--surface)";
              const stroke = c.tone === "pad" ? "var(--warn)" : c.tone === "drop" ? "var(--bad)" : c.tone === "hi" ? "var(--good)" : "var(--border)";
              return (
                <g key={ci}>
                  <rect x={x + 1} y={y0} width={cell - 2} height={cell} rx={3} fill={fill} stroke={stroke} strokeDasharray={c.tone === "drop" ? "3 2" : undefined} />
                  <text x={x + cell / 2} y={y0 + cell / 2 + 4} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={c.tone === "drop" ? "var(--bad)" : "var(--text)"} textDecoration={c.tone === "drop" ? "line-through" : undefined}>
                    {c.bit}
                  </text>
                  {c.under && (
                    <text x={x + cell / 2} y={y0 + cell + 10} textAnchor="middle" fontSize={7.5} fill="var(--muted)">
                      {c.under}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// 1. reg or wire? Pick how a signal is driven; see the declaration it needs and the hardware it becomes.

type Driver = "assign" | "comb" | "seq" | "inst";
const DRIVERS: { k: Driver; label: string; code: (w: string) => string; hw: string }[] = [
  { k: "assign", label: "assign", code: () => "assign y = a & b;", hw: "combinational logic (an AND gate)" },
  { k: "comb", label: "always @*", code: () => "always @* y = a & b;", hw: "combinational logic (an AND gate)" },
  { k: "seq", label: "always @(posedge clk)", code: () => "always @(posedge clk) y <= a & b;", hw: "an AND gate feeding a D flip-flop (register)" },
  { k: "inst", label: "instance / gate output", code: (w) => (w ? "and4 u1 (.x(a), .y(b), .z(y));" : "and g1 (y, a, b);"), hw: "the output pin of the instance" },
];

function RegWireHelper() {
  const [on, setOn] = useState<Record<Driver, boolean>>({ assign: false, comb: false, seq: true, inst: false });
  const [isOut, setIsOut] = useState(true);
  const [vec, setVec] = useState(false);
  const [guess, setGuess] = useState<"wire" | "reg">("wire");
  const active = DRIVERS.filter((d) => on[d.k]);
  const n = active.length;
  const need: "wire" | "reg" | null = n === 1 ? (on.comb || on.seq ? "reg" : "wire") : null;
  const w = vec ? "[3:0] " : "";
  const decl = need === null ? null : isOut ? `output ${need === "reg" ? "reg " : ""}${w}y` : `${need} ${w}y;`;
  const lines = [
    `module demo (input ${vec ? "[3:0] " : ""}a, b, input clk,`,
    isOut ? `             output ${guess === "reg" ? "reg " : ""}${w}y);` : `             output ${w}z);`,
    ...(isOut ? [] : [`  ${guess} ${w}y;`]),
    ...active.map((d) => "  " + d.code(w)),
    ...(isOut ? [] : ["  assign z = y;"]),
    "endmodule",
  ];
  const declLine = isOut ? 1 : 2;
  const guessOk = need !== null && guess === need;

  // block diagram
  const W = 380;
  const H = 196;
  const node = { x: 300, y: 92 };
  return (
    <VizFrame
      title="reg or wire? It depends only on where the signal is assigned"
      hint="Tick the place(s) that drive y, then choose the declaration you think it needs."
      onReset={() => {
        setOn({ assign: false, comb: false, seq: true, inst: false });
        setIsOut(true);
        setVec(false);
        setGuess("wire");
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Drivers of signal y">
            {DRIVERS.map((d, i) => {
              const y = 14 + i * 44;
              const lit = on[d.k];
              const col = !lit ? "var(--border)" : n > 1 ? "var(--bad)" : "var(--good)";
              return (
                <g key={d.k} style={{ cursor: "pointer" }} onClick={() => setOn({ ...on, [d.k]: !lit })}>
                  <rect x={10} y={y} width={168} height={32} rx={7} fill={lit ? (n > 1 ? SOFT_BAD : SOFT_GOOD) : "var(--surface)"} stroke={col} strokeWidth={lit ? 2 : 1} strokeDasharray={lit ? undefined : "4 3"} />
                  <text x={94} y={y + 20} textAnchor="middle" fontSize={11.5} fill="var(--text)" fontFamily="monospace">
                    {d.label}
                  </text>
                  {lit && <path d={`M178 ${y + 16} C 230 ${y + 16}, 240 ${node.y}, ${node.x - 18} ${node.y}`} fill="none" stroke={col} strokeWidth={2} />}
                  {lit && d.k === "seq" && (
                    <g>
                      <rect x={214} y={y + 4} width={26} height={22} rx={3} fill="var(--surface)" stroke={col} />
                      <text x={227} y={y + 19} textAnchor="middle" fontSize={9} fill="var(--text)">
                        DFF
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            <circle cx={node.x} cy={node.y} r={18} fill={n > 1 ? SOFT_BAD : n === 1 ? SOFT_GOOD : SOFT_WARN} stroke={n > 1 ? "var(--bad)" : n === 1 ? "var(--good)" : "var(--warn)"} strokeWidth={2} />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--text)" fontFamily="monospace">
              y
            </text>
            <text x={node.x} y={node.y + 40} textAnchor="middle" fontSize={11} fill={need ? "var(--good)" : n > 1 ? "var(--bad)" : "var(--warn)"} fontFamily="monospace">
              {need ? `declare: ${need}` : n > 1 ? `${n} drivers!` : "no driver"}
            </text>
          </svg>
          <CodeView lines={lines} bad={need && !guessOk ? [declLine] : n > 1 ? lines.map((_, i) => i).slice(declLine + 1, declLine + 1 + n) : []} hi={guessOk ? [declLine] : []} />
        </div>
      }
      controls={
        <>
          <Choice
            value={guess}
            onChange={setGuess}
            options={[
              { v: "wire", label: "I declare y as wire" },
              { v: "reg", label: "I declare y as reg" },
            ]}
          />
          <Toggle label="y is an output port (otherwise internal)" value={isOut} onChange={setIsOut} />
          <Toggle label="y is a 4-bit vector" value={vec} onChange={setVec} />
        </>
      }
      readout={
        <>
          {n === 0 && <CRead label="Problem" tex="y has no driver. Every output needs exactly one source." tone="warn" />}
          {n > 1 && <CRead label="Illegal" tex={`y is driven from **${n} places**. A signal may be assigned from only one assign, one always block or one instance output: two drivers would fight.`} tone="bad" />}
          {need && (
            <>
              <CRead label="Correct declaration" tex={`\`${decl}\``} tone="good" />
              <CRead label="Hardware" tex={active[0].hw} />
              <CRead
                label="Your choice"
                tex={
                  guessOk
                    ? "correct"
                    : need === "reg"
                      ? "wrong: anything assigned inside an always block must be a **reg** (even when it synthesises to plain gates)."
                      : on.inst
                        ? "wrong: an instance output must connect to a **wire**; a reg can only be written by an always block."
                        : "wrong: a continuous `assign` can only drive a **wire**."
                }
                tone={guessOk ? "good" : "bad"}
              />
            </>
          )}
          <CRead label="Rule" tex="always block → reg; assign / gate / instance output → wire. Reading is allowed anywhere." />
        </>
      }
      tasks={plain([
        "Predict: y is written inside `always @*` but synthesises to a plain AND gate. wire or reg? Tick only that box and check.",
        "Tick **assign** as well as an always block. Why is a signal with two drivers illegal, whatever its type?",
        "Choose the instance output only. Why must y be a wire even if the instantiated module uses an always block internally?",
        "Toggle the output-port switch: the rule is identical, only the spelling changes (`output reg y`).",
      ])}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Parameter override: what width does the instance really have, and what happens to the extra bits?

function ParamOverride() {
  const [mode, setMode] = useState<"none" | "named" | "positional">("none");
  const [N, setN] = useState(12);
  const [a, setA] = useState(0xbad);
  const [b, setB] = useState(0x9c7);
  const W = 12;
  const eff = mode === "none" ? 8 : N;
  const x = a % 2 ** eff;
  const y = b % 2 ** eff;
  const s = (x + y) % 2 ** (eff + 1);
  const sum = s % 2 ** (W + 1);
  const truth = a + b;
  const ok = sum === truth;
  const inst =
    mode === "none" ? "  addN U1 (.x(a), .y(b), .s(sum));" : mode === "named" ? `  addN #(.N(${N})) U1 (.x(a), .y(b), .s(sum));` : `  addN #(${N}) U1 (.x(a), .y(b), .s(sum));`;
  const lines = [
    "module addN #(parameter N = 8) (",
    "    input  [N-1:0] x, y,",
    "    output [N:0]   s);",
    "  assign s = x + y;",
    "endmodule",
    "",
    "module top (input  [11:0] a, b,",
    "            output [12:0] sum);",
    inst,
    "endmodule",
  ];
  const maxBits = Math.max(W + 1, eff + 1);
  const portRow = (label: string, v: number, width: number, keep: number): { label: string; cells: Cell[] } => ({
    label,
    cells: Array.from({ length: width }, (_, k) => {
      const i = width - 1 - k;
      return { bit: String(Math.floor(v / 2 ** i) % 2), tone: i >= keep ? "drop" : "" };
    }),
  });
  const instRow = (label: string, v: number, width: number, srcW: number): { label: string; cells: Cell[] } => ({
    label,
    cells: Array.from({ length: width }, (_, k) => {
      const i = width - 1 - k;
      return { bit: String(Math.floor(v / 2 ** i) % 2), tone: i >= srcW ? "pad" : "" };
    }),
  });
  const warnings: string[] = [];
  if (eff < W) warnings.push(`a[11:${eff}] and b[11:${eff}] are **cut off** at the port (only the low ${eff} bits enter).`);
  if (eff > W) warnings.push(`x[${eff - 1}:12] and y[${eff - 1}:12] are **zero-padded** (the port is wider than a and b).`);
  if (eff + 1 < W + 1) warnings.push(`s is only ${eff + 1} bits, so sum[12:${eff + 1}] are zero-filled.`);
  if (eff + 1 > W + 1) warnings.push(`s has ${eff + 1} bits, so its top ${eff - W} bit(s) are dropped when connected to sum.`);
  return (
    <VizFrame
      title="Parameter override sets the width of each instance"
      hint="Choose how U1 is instantiated and drag N. Red dashed bits are cut off at a port; amber bits are padding."
      onReset={() => {
        setMode("none");
        setN(12);
        setA(0xbad);
        setB(0x9c7);
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <CodeView lines={lines} hi={[8]} bad={mode === "none" ? [8] : []} />
          <BitCells
            maxBits={maxBits}
            rows={[
              portRow("a", a, W, eff),
              instRow(`x[${eff - 1}:0]`, x, eff, W),
              portRow("b", b, W, eff),
              instRow(`y[${eff - 1}:0]`, y, eff, W),
              portRow(`s[${eff}:0]`, s, eff + 1, W + 1),
              instRow("sum", sum, W + 1, eff + 1),
            ]}
          />
        </div>
      }
      controls={
        <>
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "none", label: "no override" },
              { v: "named", label: "#(.N(…)) named" },
            ]}
          />
          {mode !== "none" && <Slider label="N =" value={N} min={4} max={16} step={1} onChange={setN} format={(v) => String(v)} />}
          <Slider label="a =" value={a} min={0} max={4095} step={1} onChange={setA} format={(v) => `${v} (12'h${v.toString(16).toUpperCase()})`} />
          <Slider label="b =" value={b} min={0} max={4095} step={1} onChange={setB} format={(v) => `${v} (12'h${v.toString(16).toUpperCase()})`} />
        </>
      }
      readout={
        <>
          <CRead label="Instance width" tex={mode === "none" ? "N keeps its default, **8**" : `N overridden to **${N}**`} />
          <CRead label="What U1 adds" tex={`x + y = ${x} + ${y} = ${x + y}${x + y !== s ? ` → ${s} in ${eff + 1} bits` : ""}`} />
          <CRead label="sum" tex={`**${sum}**   (true a + b = ${truth})`} tone={ok ? "good" : "bad"} />
          {warnings.map((t, i) => (
            <CRead key={i} label="!" tex={t} tone="warn" />
          ))}
          {ok && warnings.length === 0 && <CRead label="✓" tex="All port widths match: no truncation, no padding." tone="good" />}
        </>
      }
      tasks={plain([
        "Predict: with no override, U1 is 8 bits wide but a and b are 12 bits. Which bits of a ever reach the adder? Check against the red cells.",
        "Switch to `#(.N(12))`. Every port now matches and sum is correct for any a, b.",
        "Set N = 16 with the 12-bit top signals: which bits are padded, and is sum still right? (Only the low 13 bits of s fit.)",
        "Explain why overriding N in the instantiation (Tutorial 7 Q2c) is better than editing the submodule: other instances keep their own widths.",
      ])}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Vector sizing: literals into wires, concatenation and replication.

const LITS = [
  { src: "4'b1001", size: 4, v: 9, neg: false },
  { src: "6'b110011", size: 6, v: 51, neg: false },
  { src: "8'hA5", size: 8, v: 0xa5, neg: false },
  { src: "4'd12", size: 4, v: 12, neg: false },
  { src: "3'd5", size: 3, v: 5, neg: false },
];

type Part = { t: "sl"; hi: number; lo: number } | { t: "k"; bits: string } | { t: "rep"; n: number; part: Part[] };
const sl = (hi: number, lo: number): Part => ({ t: "sl", hi, lo });
const kb = (bits: string): Part => ({ t: "k", bits });
const CATS: { src: string; parts: Part[]; note: string }[] = [
  { src: "{x, 2'b00}", parts: [sl(5, 0), kb("00")], note: "appending zeros on the right = shift left = ×4" },
  { src: "{2'b00, x}", parts: [kb("00"), sl(5, 0)], note: "zero-extension: the unsigned value is unchanged" },
  { src: "{{4{x[5]}}, x}", parts: [{ t: "rep", n: 4, part: [sl(5, 5)] }, sl(5, 0)], note: "sign-extension: the 2's complement value is unchanged" },
  { src: "{x[2:0], x[5:3]}", parts: [sl(2, 0), sl(5, 3)], note: "swap the two halves" },
  { src: "{3{x[1:0]}}", parts: [{ t: "rep", n: 3, part: [sl(1, 0)] }], note: "replication of a 2-bit slice" },
  { src: "{x[0], x[1], x[2], x[3], x[4], x[5]}", parts: [0, 1, 2, 3, 4, 5].map((i) => sl(i, i)), note: "bit reversal" },
];

function expand(parts: Part[], x: number, group = { g: 0 }): { bit: string; under: string; g: number }[] {
  const out: { bit: string; under: string; g: number }[] = [];
  for (const p of parts) {
    const g = group.g++;
    if (p.t === "k") for (const c of p.bits) out.push({ bit: c, under: "const", g });
    else if (p.t === "sl") for (let i = p.hi; i >= p.lo; i--) out.push({ bit: String((x >> i) & 1), under: `x${i}`, g });
    else for (let r = 0; r < p.n; r++) out.push(...expand(p.part, x, { g }).map((c) => ({ ...c, g })));
  }
  return out;
}

function VectorSizing() {
  const [mode, setMode] = useState<"lit" | "cat">("lit");
  const [li, setLi] = useState(1);
  const [T, setT] = useState(4);
  const [xb, setXb] = useState<Bit[]>(bitsOf(0b101101, 6));
  const [ci, setCi] = useState(2);
  const reset = () => {
    setMode("lit");
    setLi(1);
    setT(4);
    setXb(bitsOf(0b101101, 6));
    setCi(2);
  };

  if (mode === "lit") {
    const L = LITS[li];
    const evalW = Math.max(L.size, T);
    const val = L.neg ? (2 ** evalW - L.v) % 2 ** evalW : L.v;
    const res = val % 2 ** T;
    const litBits = bin(L.neg ? (2 ** L.size - L.v) % 2 ** L.size : L.v, L.size);
    const resBits = bin(res, T);
    const maxBits = Math.max(L.size, T);
    const action = T < L.size ? `truncated: the top ${L.size - T} bit(s) are lost` : T > L.size ? (L.neg ? `${T - L.size} extra MSB(s) filled` : `zero-padded with ${T - L.size} MSB zero(s)`) : "exact fit";
    return (
      <VizFrame
        title="Sized literals: padding and truncation happen at the MSB end"
        hint="Pick a literal and drag the width of the wire it is assigned to."
        onReset={reset}
        figure={
          <div style={{ display: "grid", gap: 8 }}>
            <CodeView lines={[`wire [${T - 1}:0] w = ${L.src};`]} hi={[0]} />
            <BitCells
              maxBits={maxBits}
              rows={[
                { label: L.src, cells: [...litBits].map((c, k) => ({ bit: c, tone: L.size - 1 - k >= T ? "drop" : "" })) },
                { label: `w[${T - 1}:0]`, cells: [...resBits].map((c, k) => ({ bit: c, tone: T - 1 - k >= L.size ? "pad" : "hi" })) },
              ]}
            />
          </div>
        }
        controls={
          <>
            <Choice value={mode} onChange={setMode} options={[{ v: "lit", label: "literal → wire" }, { v: "cat", label: "concatenation" }]} />
            <Choice value={li} onChange={setLi} options={LITS.map((l, i) => ({ v: i, label: l.src }))} />
            <Slider label="wire width =" value={T} min={1} max={10} step={1} onChange={setT} format={(v) => `${v} bits`} />
          </>
        }
        readout={
          <>
            <CRead label="Literal" tex={`\`${L.src}\` = ${L.size} bits, pattern ${litBits}${L.neg ? " (2's complement of 3)" : ` = ${L.v}`}`} />
            <CRead label="Assigned" tex={`w = **${resBits}** = ${res}${T > 1 ? ` (signed ${signed(res, T)})` : ""}`} tone={T < L.size ? "warn" : "good"} />
            <CRead label="What happened" tex={action} tone={T < L.size ? "warn" : undefined} />
            <CRead label="Format" tex="`<size>'<radix><value>`: radix b, o, d or h; `_` is only a visual separator; a minus sign goes **before** the size." />
          </>
        }
        tasks={plain([
          "Predict: `6'b110011` assigned to a 4-bit wire. Which bits survive? Set the width to 4 and check.",
          "Assign `4'b1001` to 6 bits. Where do the new zeros go, and is the value unchanged?",
          "`3'd5` into 2 bits gives 01, not 5: the compiler only warns. Why is this catastrophic inside an adder?",
        ])}
      />
    );
  }

  const x = xb.reduce((acc: number, v) => acc * 2 + v, 0);
  const C = CATS[ci];
  const cells = expand(C.parts, x);
  const n = cells.length;
  const val = cells.reduce((acc, c) => acc * 2 + Number(c.bit), 0);
  const tones: Cell["tone"][] = ["hi", "", "pad", "", "hi", "", "pad"];
  return (
    <VizFrame
      title="Concatenation { } and replication {n{ }} build wider vectors"
      hint="Click the bits of x (6 bits, MSB first) and pick an expression. Each result bit is labelled with where it came from."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <CodeView lines={["wire [5:0] x;", `wire [${n - 1}:0] y = ${C.src};`]} hi={[1]} />
          <BitCells
            maxBits={Math.max(n, 6)}
            rows={[
              { label: "x", cells: xb.map((v, k) => ({ bit: String(v), under: `x${5 - k}` })) },
              { label: "y", cells: cells.map((c) => ({ bit: c.bit, under: c.under, tone: tones[c.g % tones.length] })) },
            ]}
          />
        </div>
      }
      controls={
        <>
          <Choice value={mode} onChange={setMode} options={[{ v: "lit", label: "literal → wire" }, { v: "cat", label: "concatenation" }]} />
          <BitRow bits={xb} onChange={setXb} labels={["x5", "x4", "x3", "x2", "x1", "x0"]} />
          <Choice value={ci} onChange={setCi} options={CATS.map((c, i) => ({ v: i, label: c.src }))} />
        </>
      }
      readout={
        <>
          <CRead label="x" tex={`${bin(x, 6)} = ${x} unsigned, ${signed(x, 6)} signed`} />
          <CRead label="y" tex={`**${bin(val, n)}** (${n} bits) = ${val} unsigned, ${signed(val, n)} signed`} tone="good" />
          <CRead label="Note" tex={C.note} />
        </>
      }
      tasks={plain([
        "Predict the width of `{{4{x[5]}}, x}` before selecting it. (4 + 6 = 10.)",
        "Make x negative (x5 = 1) and compare the **signed** values of x and `{{4{x[5]}}, x}`, then `{2'b00, x}`. Which extension keeps the negative value unchanged?",
        "Why is `{4{x[5]}, x}` illegal? The replication must sit inside its own braces: `{{4{x[5]}}, x}`.",
      ])}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Sensitivity-list mismatch: the block only re-runs on listed signals, so y misses changes of c.

type ABC = { a: Bit; b: Bit; c: Bit };
const SENS_PRESET: ABC[] = [
  { a: 0, b: 0, c: 0 },
  { a: 0, b: 0, c: 1 },
  { a: 1, b: 0, c: 1 },
  { a: 1, b: 1, c: 1 },
  { a: 1, b: 1, c: 0 },
  { a: 0, b: 1, c: 0 },
  { a: 0, b: 1, c: 1 },
];

function SensitivityMismatch() {
  const [steps, setSteps] = useState<ABC[]>(SENS_PRESET);
  const [star, setStar] = useState(false);
  const hw = steps.map((s) => ((s.a & s.b) | s.c) as Bit);
  const sim: Bit[] = [];
  const fired: boolean[] = [];
  steps.forEach((s, i) => {
    const p = steps[i - 1];
    const trig = i === 0 || (star ? s.a !== p.a || s.b !== p.b || s.c !== p.c : s.a !== p.a || s.b !== p.b);
    fired.push(trig);
    sim.push(trig ? (((s.a & s.b) | s.c) as Bit) : sim[i - 1]);
  });
  const bad = steps.map((_, i) => i).filter((i) => sim[i] !== hw[i]);
  const cur = steps[steps.length - 1];
  const push = (k: keyof ABC) => setSteps((st) => [...st, { ...cur, [k]: (1 - cur[k]) as Bit }].slice(-16));
  const wave = (f: (i: number) => Bit) => steps.map((_, i) => String(f(i))).join("");
  const signals: WaveSignal[] = [
    { name: "a", wave: wave((i) => steps[i].a) },
    { name: "b", wave: wave((i) => steps[i].b) },
    { name: "c", wave: wave((i) => steps[i].c) },
    { name: "y (block)", wave: wave((i) => sim[i]) },
    { name: "y expected", wave: wave((i) => hw[i]) },
  ];
  const lines = [star ? "always @*" : "always @(a or b)", "begin", "  x = a & b;", "  y = x | c;", "end"];
  return (
    <VizFrame
      title="Missing a signal from the sensitivity list: the block is not triggered"
      hint="Each button toggles one input and adds a time step. Dashed markers show steps where y differs from the expected output ab + c."
      onReset={() => {
        setSteps(SENS_PRESET);
        setStar(false);
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <CodeView lines={lines} bad={star ? [] : [0]} hi={star ? [0] : []} />
          <WaveSvg signals={signals} marks={bad} cursor={steps.length - 1} />
        </div>
      }
      controls={
        <>
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            {(["a", "b", "c"] as const).map((k) => (
              <button key={k} className="btn small" onClick={() => push(k)}>
                toggle {k} (now {cur[k]})
              </button>
            ))}
          </div>
          <Toggle label="Use always @*" value={star} onChange={setStar} />
        </>
      }
      readout={
        <>
          <CRead label="Expected" tex="$y = ab + c$ (what the statements describe)" />
          <CRead label="Last step" tex={fired[fired.length - 1] ? "block **ran** (a listed signal changed)" : "block did **not** run: y kept its old value"} tone={fired[fired.length - 1] ? undefined : "warn"} />
          <CRead label="Mismatched steps" tex={bad.length ? `**${bad.length}** (at t = ${bad.join(", ")})` : "none"} tone={bad.length ? "bad" : "good"} />
        </>
      }
      tasks={plain([
        "Predict: at t = 1 only c rises. What does the block give for y, and what is the expected value?",
        "Toggle c a few more times with a = b = 0. Every change of c alone is missed by the block.",
        "Tick `always @*`: all markers vanish. Explain why * (all input signals in the block) is safer than writing the list by hand.",
      ])}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Latch-inference detector: incomplete assignment in a combinational always block = a latch.

const LATCH_CIRCUITS: Record<string, CircuitSpec> = {
  ifFull: { inputs: ["en", "d", "b"], gates: [{ id: "y", type: "MUX2", in: ["b", "d", "en"] }], outputs: ["y"] },
  ifLatch: { inputs: ["en", "d", "b"], gates: [{ id: "y", type: "DLATCH", in: ["d", "en"] }], outputs: ["y"] },
  caseFull: {
    inputs: ["s1", "s0", "a", "b", "c"],
    gates: [
      { id: "m0", type: "MUX2", in: ["a", "b", "s0"] },
      { id: "m1", type: "AND", in: ["c", "!s0"] },
      { id: "y", type: "MUX2", in: ["m0", "m1", "s1"] },
    ],
    outputs: ["y"],
  },
  caseLatch: {
    inputs: ["s1", "s0", "a", "b", "c"],
    gates: [
      { id: "m0", type: "MUX2", in: ["a", "b", "s0"] },
      { id: "dm", type: "MUX2", in: ["m0", "c", "s1"] },
      { id: "en", type: "NAND", in: ["s1", "s0"] },
      { id: "y", type: "DLATCH", in: ["dm", "en"] },
    ],
    outputs: ["y"],
  },
};

// Each mode starts with a short scripted input sequence so the waveform already shows the effect.
const LATCH_SCRIPTS = {
  if: { init: { en: 1, d: 1, b: 0 }, steps: ["en", "d", "d", "b", "en", "d", "en", "d"] },
  case: { init: { s1: 0, s0: 0, a: 1, b: 1, c: 1 }, steps: ["s0", "s1", "a", "b", "s0", "c", "s1"] },
} as const;

function scripted(m: "if" | "case", f: boolean) {
  const c = LATCH_CIRCUITS[`${m}${f ? "Full" : "Latch"}`];
  const S = LATCH_SCRIPTS[m];
  let ins: Record<string, Val> = { ...S.init };
  let prev = evalCircuit(c, ins);
  const hist: { ins: Record<string, Val>; y: Val }[] = [{ ins, y: prev.y }];
  for (const name of S.steps) {
    ins = { ...ins, [name]: ins[name] === 1 ? 0 : 1 };
    prev = evalCircuit(c, ins, {}, prev);
    hist.push({ ins, y: prev.y });
  }
  return { ins, prev, hist };
}

function LatchDetector() {
  const [mode, setMode] = useState<"if" | "case">("if");
  const [full, setFull] = useState(false);
  const key = `${mode}${full ? "Full" : "Latch"}`;
  const circuit = LATCH_CIRCUITS[key];
  const [st, setSt] = useState(() => scripted("if", false));
  const { ins, prev, hist } = st;
  const values = useMemo(() => evalCircuit(circuit, ins, {}, prev), [circuit, ins, prev]);

  const restart = (m: "if" | "case", f: boolean) => {
    setMode(m);
    setFull(f);
    setSt(scripted(m, f));
  };
  const toggle = (name: string) => {
    const next = { ...ins, [name]: ins[name] === 1 ? 0 : 1 } as Record<string, Val>;
    const v = evalCircuit(circuit, next, {}, values);
    setSt({ ins: next, prev: v, hist: [...hist, { ins: next, y: v.y }].slice(-16) });
  };

  const lines =
    mode === "if"
      ? ["always @* begin", "  if (en)", "    y = d;", full ? "  else" : "  // (no else)", ...(full ? ["    y = b;"] : []), "end"]
      : ["always @* begin", "  case ({s1, s0})", "    2'b00: y = a;", "    2'b01: y = b;", "    2'b10: y = c;", full ? "    default: y = 1'b0;" : "    // (no default, 2'b11 unassigned)", "  endcase", "end"];
  const holeLine = mode === "if" ? 3 : 5;
  const holding = !full && values.en === 0;
  const sig = (name: string, f: (h: { ins: Record<string, Val>; y: Val }) => Val): WaveSignal => ({
    name,
    wave: hist.map((h) => { const v = f(h); return v === 1 ? "1" : v === 0 ? "0" : "x"; }).join(""),
  });
  const signals = [...circuit.inputs.map((i) => sig(i, (h) => h.ins[i])), sig("y", (h) => h.y)];
  const rows =
    mode === "if"
      ? Array.from({ length: 8 }, (_, m) => {
          const en = (m >> 2) & 1;
          const d = (m >> 1) & 1;
          const b = m & 1;
          return [en, d, b, en ? d : full ? b : "hold"];
        })
      : [
          ["00", "a"],
          ["01", "b"],
          ["10", "c"],
          ["11", full ? "0 (default)" : "hold (latch)"],
        ];
  const curRow = mode === "if" ? ((ins.en === 1 ? 4 : 0) + (ins.d === 1 ? 2 : 0) + (ins.b === 1 ? 1 : 0)) : (ins.s1 === 1 ? 2 : 0) + (ins.s0 === 1 ? 1 : 0);
  return (
    <VizFrame
      title="Latch-inference detector: is y assigned on every path?"
      hint="Click the input names on the circuit to toggle them; every change adds a step to the waveform."
      onReset={() => restart("if", false)}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <CodeView lines={lines} bad={full ? [] : [holeLine]} hi={full ? [holeLine, holeLine + (mode === "if" ? 1 : 0)] : []} />
          <CircuitSvg circuit={circuit} values={values} onToggleInput={toggle} maxWidth={mode === "if" ? 340 : 460} />
          <WaveSvg signals={signals} cursor={hist.length - 1} unit={26} />
        </div>
      }
      controls={
        <>
          <Choice value={mode} onChange={(m) => restart(m, full)} options={[{ v: "if", label: "if without else" }, { v: "case", label: "case without default" }]} />
          <Toggle label={mode === "if" ? "Add the else branch" : "Add the default branch"} value={full} onChange={(f) => restart(mode, f)} />
        </>
      }
      readout={
        <>
          <CRead
            label="Synthesised"
            tex={full ? (mode === "if" ? "a 2:1 **multiplexer**: purely combinational" : "a 4:1 **multiplexer** (with 0 on the 11 input): purely combinational") : "a **latch**: y must remember its old value on the unassigned path"}
            tone={full ? "good" : "bad"}
          />
          <CRead label="y now" tex={`**${values.y === null ? "x" : values.y}**${holding ? "  (latch closed: holding)" : ""}`} tone={holding ? "warn" : undefined} />
          <TableView head={mode === "if" ? ["en", "d", "b", "y"] : ["{s1,s0}", "y"]} rows={rows} highlightRow={curRow} />
        </>
      }
      tasks={plain([
        "Predict: with no else, set en = 1, d = 1, then en = 0, then toggle d. What does y do? Watch the waveform hold.",
        "Add the else branch: the latch becomes a multiplexer and b now matters. Repeat the same toggles.",
        "Case mode: select 11 with and without the default. Which row of the table changes from 'hold' to a value?",
        "Explain why a default assignment at the top of the block (e.g. `y = 1'b0;`) also removes the latch.",
      ])}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 6. Blocking (=) vs non-blocking (<=) inside one clock edge.

const BNB_EXAMPLES = {
  chain: { regs: ["q1", "q2", "q3"], stmts: [["q1", "d"], ["q2", "q1"], ["q3", "q2"]] as [string, string][], init: { q1: 0, q2: 0, q3: 0 }, input: true },
  swap: { regs: ["a", "b"], stmts: [["a", "b"], ["b", "a"]] as [string, string][], init: { a: 3, b: 5 }, input: false },
};

function hardwareOf(regs: string[], stmts: [string, string][], blocking: boolean, hasD: boolean): CircuitSpec {
  const src: Record<string, string> = {};
  for (const [l, r] of stmts) src[l] = blocking ? (src[r] ?? r) : r;
  const gates: GateSpec[] = regs.map((q) => ({ id: q, type: "DFF", in: [src[q] ?? q, "clk"] }));
  return { inputs: hasD ? ["d", "clk"] : ["clk"], gates, outputs: regs };
}

function BlockingVsNonblocking() {
  const [ex, setEx] = useState<"chain" | "swap">("chain");
  const [rev, setRev] = useState(false);
  const E = BNB_EXAMPLES[ex];
  const stmts = rev ? [...E.stmts].reverse() : E.stmts;
  const n = stmts.length;
  const [d, setD] = useState<number>(1);
  const [sB, setSB] = useState<Record<string, number>>(E.init);
  const [sN, setSN] = useState<Record<string, number>>(E.init);
  const [k, setK] = useState(0);
  const [hist, setHist] = useState<{ B: Record<string, number>; N: Record<string, number>; d: number }[]>([]);

  const restart = (e: "chain" | "swap", r: boolean) => {
    setEx(e);
    setRev(r);
    setSB(BNB_EXAMPLES[e].init);
    setSN(BNB_EXAMPLES[e].init);
    setK(0);
    setD(1);
    setHist([]);
  };
  // state of each column after executing the first `upto` statements of this edge
  const runB = (upto: number) => {
    const v: Record<string, number> = { ...sB, d };
    for (let j = 0; j < upto; j++) v[stmts[j][0]] = v[stmts[j][1]];
    return v;
  };
  const pendingN = (upto: number) => {
    const p: Record<string, number> = {};
    const v: Record<string, number> = { ...sN, d };
    for (let j = 0; j < upto; j++) p[stmts[j][0]] = v[stmts[j][1]];
    return p;
  };
  const shownB = runB(Math.min(k, n));
  const pend = pendingN(Math.min(k, n));
  const shownN = k > n ? { ...sN, ...pend } : sN;
  const step = () => {
    if (k <= n) return setK(k + 1);
    const B = runB(n);
    const N = { ...sN, ...pendingN(n) };
    const keep = (o: Record<string, number>) => Object.fromEntries(E.regs.map((r) => [r, o[r]]));
    setSB(keep(B));
    setSN(keep(N));
    setHist((h) => [...h, { B: keep(B), N: keep(N), d }].slice(-6));
    setK(0);
  };
  const fmtV = (v: number) => String(v);
  const cB = hardwareOf(E.regs, stmts, true, E.input);
  const cN = hardwareOf(E.regs, stmts, false, E.input);
  const valsOf = (c: CircuitSpec, st: Record<string, number>) =>
    ex === "chain" ? evalCircuit(c, { d: d as Bit, clk: 0 }, Object.fromEntries(E.regs.map((r) => [r, (st[r] ? 1 : 0) as Bit]))) : undefined;
  const linesB = ["always @(posedge clk)", "begin", ...stmts.map(([l, r]) => `  ${l} = ${r};`), "end"];
  const linesN = ["always @(posedge clk)", "begin", ...stmts.map(([l, r]) => `  ${l} <= ${r};`), "end"];
  const hiLine = k >= 1 && k <= n ? [k + 1] : [];
  const phase = k === 0 ? "just before the rising edge" : k <= n ? `executing statement ${k}` : "end of the time step: all <= updates land together";
  const regList = (o: Record<string, number>) => E.regs.map((r) => `${r}=${fmtV(o[r])}`).join(", ");
  return (
    <VizFrame
      title="Same statements, two results: = updates immediately, <= updates at the end"
      hint="Step through one clock edge statement by statement. Blocking writes are visible to the next line; non-blocking writes wait in a queue."
      onReset={() => restart(ex, rev)}
      figure={
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 8 }}>
            <div>
              <CodeView title="blocking (=)" lines={linesB} hi={hiLine} />
              <div className="small" style={{ marginTop: 4, fontFamily: "monospace" }}>{regList(shownB)}</div>
            </div>
            <div>
              <CodeView title="non-blocking (<=)" lines={linesN} hi={hiLine} />
              <div className="small" style={{ marginTop: 4, fontFamily: "monospace" }}>{regList(shownN)}</div>
              <div className="small muted" style={{ fontFamily: "monospace" }}>
                queued: {Object.keys(pend).length && k <= n ? Object.entries(pend).map(([l, v]) => `${l}←${fmtV(v)}`).join(", ") : "—"}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div>
              <div className="small muted">hardware from =</div>
              <CircuitSvg circuit={cB} values={valsOf(cB, sB)} maxWidth={420} />
            </div>
            <div>
              <div className="small muted">hardware from &lt;=</div>
              <CircuitSvg circuit={cN} values={valsOf(cN, sN)} maxWidth={420} />
            </div>
          </div>
        </div>
      }
      controls={
        <>
          <Choice value={ex} onChange={(e) => restart(e, rev)} options={[{ v: "chain", label: "shift chain" }, { v: "swap", label: "swap a, b" }]} />
          <Toggle label="Reverse the statement order" value={rev} onChange={(r) => restart(ex, r)} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <button className="btn small primary" onClick={step}>
              {k <= n ? "Step ▶" : "Next clock edge ⏵"}
            </button>
            {E.input && (
              <button className="btn small" onClick={() => setD(1 - d)} disabled={k !== 0}>
                d = {d} (toggle)
              </button>
            )}
          </div>
        </>
      }
      readout={
        <>
          <CRead label="Phase" tex={phase} />
          <CRead label="= gives" tex={regList(runB(n))} />
          <CRead label="<= gives" tex={regList({ ...sN, ...pendingN(n) })} tone="good" />
          {hist.length > 0 && (
            <TableView
              head={["edge", ...(E.input ? ["d"] : []), "with =", "with <="]}
              rows={hist.map((h, i) => [String(i + 1), ...(E.input ? [String(h.d)] : []), regList(h.B), regList(h.N)])}
            />
          )}
        </>
      }
      tasks={plain([
        "Predict: shift chain, d = 1, all registers 0. After one edge, what are q1, q2, q3 with = and with <=? Step through to check.",
        "Reverse the statement order. Which column changes behaviour, and which stays a 3-stage shift register?",
        "Swap example: why does `a = b; b = a;` lose the old value of a, while the <= version swaps?",
        "Explain the rule: in clocked blocks use <= so statement order cannot change the hardware.",
      ])}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 7. Combinational + synchronous blocks together (Verilog Recap slide 18): who updates when?

interface PRow {
  a: number;
  b: number;
  x: number;
  y: number;
  /** register values before (zp, rp) and after (z, r) this cycle's rising edge */
  zp: number;
  rp: number;
  z: number;
  r: number;
  done: boolean;
}

function PipelineTimeline() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(6);
  const [z, setZ] = useState(0);
  const [r, setR] = useState(0);
  const [hist, setHist] = useState<PRow[]>([]);
  const x = a + b;
  const y = x * x;
  const clock = () => {
    const nz = x;
    const nr = z * z;
    setHist((h) => [...h, { a, b, x, y, zp: z, rp: r, z: nz, r: nr, done: true }].slice(-5));
    setZ(nz);
    setR(nr);
  };
  const reset = () => {
    setA(2);
    setB(6);
    setZ(0);
    setR(0);
    setHist([]);
  };
  // Waveform: each cycle = 2 units (clk low, then clk high). The rising edge is at the start of the second unit,
  // where z and r take their new values. The current (open) cycle is drawn last, before its edge.
  const cycles: PRow[] = [...hist, { a, b, x, y, zp: z, rp: r, z, r, done: false }];
  const sigs: WaveSignal[] = [
    { name: "clk", wave: cycles.map(() => "01").join("") },
    ...(["a", "b", "x", "y"] as const).map((k) => ({ name: k, wave: cycles.map(() => "=.").join(""), data: cycles.map((c) => String(c[k])) })),
    ...(["z", "r"] as const).map((k) => ({
      name: k,
      wave: cycles.map((c, i) => (i === 0 ? "=" : ".") + (c.done ? "=" : ".")).join(""),
      data: cycles.flatMap((c, i) => [...(i === 0 ? [String(k === "z" ? c.zp : c.rp)] : []), ...(c.done ? [String(c[k])] : [])]),
    })),
  ];
  return (
    <VizFrame
      title="always @* updates at once; always @(posedge clk) waits for the edge"
      hint="Set a and b, then press Clock edge. y follows a and b immediately; z and r only change at rising edges."
      onReset={reset}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 8 }}>
            <CodeView title="combinational (=)" lines={["always @*", "begin", "  x = a + b;", "  y = x * x;", "end"]} />
            <CodeView title="synchronous (<=)" lines={["always @(posedge clk)", "begin", "  z <= x;", "  r <= z * z;", "end"]} />
          </div>
          <PipeDiagram x={x} y={y} z={z} r={r} />
          <WaveSvg signals={sigs} cursor={cycles.length * 2 - 2} unit={34} />
        </div>
      }
      controls={
        <>
          <Slider label="a =" value={a} min={0} max={15} step={1} onChange={setA} format={(v) => String(v)} />
          <Slider label="b =" value={b} min={0} max={15} step={1} onChange={setB} format={(v) => String(v)} />
          <button className="btn small primary" onClick={clock}>
            ⏵ Clock edge
          </button>
        </>
      }
      readout={
        <>
          <CRead label="x = a + b" tex={`${a} + ${b} = **${x}**`} />
          <CRead label="y = x·x" tex={`**${y}**  (already valid, no clock needed)`} tone="good" />
          <CRead label="z (register)" tex={`**${z}**  → becomes ${x} at the next edge`} />
          <CRead label="r (register)" tex={`**${r}**  → becomes ${z}·${z} = ${z * z} at the next edge (the **old** z)`} />
        </>
      }
      tasks={plain([
        "Predict: from reset, set a = 2, b = 6 and press Clock edge once. What are z and r? (z = 8, r = 0·0 = 0.)",
        "Press Clock edge again without touching a, b: r becomes 64, the same number y showed immediately.",
        "Change a after an edge and watch: y changes instantly, r only two edges later. Count the register stages between x and r.",
      ])}
    />
  );
}

function PipeDiagram({ x, y, z, r }: { x: number; y: number; z: number; r: number }): ReactNode {
  const box = (bx: number, by: number, w: number, label: string, sub?: string, reg = false) => (
    <g>
      <rect x={bx} y={by} width={w} height={34} rx={reg ? 2 : 8} fill={reg ? SOFT_WARN : "var(--surface)"} stroke={reg ? "var(--warn)" : "var(--text)"} strokeWidth={1.4} />
      <text x={bx + w / 2} y={by + 15} textAnchor="middle" fontSize={11} fill="var(--text)">
        {label}
      </text>
      {sub && (
        <text x={bx + w / 2} y={by + 28} textAnchor="middle" fontSize={9} fill="var(--muted)">
          {sub}
        </text>
      )}
    </g>
  );
  const wire = (d: string, label?: string, lx = 0, ly = 0) => (
    <g>
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth={1.8} markerEnd="url(#vr-arrow)" />
      {label && (
        <text x={lx} y={ly} fontSize={10} fill="var(--accent)" fontFamily="monospace">
          {label}
        </text>
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 420 130" className="viz-svg" role="img" aria-label="Datapath">
      <defs>
        <marker id="vr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>
      <text x={8} y={30} fontSize={11} fill="var(--text)" fontFamily="monospace">a</text>
      <text x={8} y={52} fontSize={11} fill="var(--text)" fontFamily="monospace">b</text>
      {wire("M20 26 L46 34")}
      {wire("M20 48 L46 42")}
      {box(48, 21, 36, "+")}
      {wire("M84 38 L132 38", `x=${x}`, 90, 32)}
      {box(134, 21, 40, "×", "x·x")}
      {wire("M174 38 L214 38")}
      <text x={218} y={42} fontSize={11} fill="var(--good)" fontFamily="monospace">y={y}</text>
      {wire("M108 38 L108 92 L134 92")}
      {box(136, 75, 44, "DFF", "z", true)}
      {wire("M180 92 L222 92", `z=${z}`, 186, 86)}
      {box(224, 75, 40, "×", "z·z")}
      {wire("M264 92 L300 92")}
      {box(302, 75, 44, "DFF", "r", true)}
      {wire("M346 92 L380 92")}
      <text x={384} y={96} fontSize={11} fill="var(--text)" fontFamily="monospace">r={r}</text>
      <text x={136} y={124} fontSize={9} fill="var(--muted)">registers (amber) update only at posedge clk</text>
    </svg>
  );
}
