"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { evalCircuit, evalExpr, parseExpr, type Bit, type Expr } from "@/lib/sc1005/logic";
import type { CircuitSpec, GateSpec } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, Read, Slider, TableView, Toggle, VizFrame } from "../kit";

// Interactive figures for the seq-verilog lesson, chosen by id (see LessonSection.visuals).
export default function SeqVerilogVisual({ id }: { id: string }) {
  switch (id) {
    case "nb-vs-b":
      return <BlockingStepper />;
    case "reset-types":
      return <ResetTypes />;
    case "counter-stepper":
      return <CounterStepper />;
    case "pipeline":
      return <PipelineViz />;
    case "alarm-monitor":
      return <AlarmMonitor />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Code listing with highlighted lines.

function CodeView({ lines, hot }: { lines: { text: string; id?: string }[]; hot?: string[] }) {
  return (
    <pre className="code" style={{ margin: 0, fontSize: "0.8rem" }}>
      {lines.map((l, i) => {
        const on = !!l.id && !!hot?.includes(l.id);
        return (
          <div key={i} style={{ background: on ? "color-mix(in srgb, var(--good) 22%, transparent)" : undefined, borderRadius: 4, padding: "0 4px", margin: "0 -4px" }}>
            {l.text || " "}
          </div>
        );
      })}
    </pre>
  );
}

// ---------------------------------------------------------------------------------------------
// Minimal timing diagram with editable rows (same idea as the sequential module, kept self-contained).

type W = 0 | 1 | null;
interface WRow {
  name: string;
  vals?: W[];
  bus?: (string | null)[];
  onToggle?: (t: number) => void;
  color?: string;
}

function LiveWave({ rows, unit = 22, marks = [], cursor, onCursor, tickEvery = 1, tickLabel, minLen = 1 }: { rows: WRow[]; unit?: number; marks?: number[]; cursor?: number; onCursor?: (t: number) => void; tickEvery?: number; tickLabel?: (t: number) => string | null; minLen?: number }) {
  const pid = `vhatch-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const len = Math.max(minLen, ...rows.map((r) => (r.vals ?? r.bus ?? []).length));
  const nameW = 14 + 7.4 * Math.max(3, ...rows.map((r) => r.name.length));
  const ROW = 34;
  const HI = 7;
  const LO = 26;
  const Wd = nameW + len * unit + 8;
  const H = rows.length * ROW + 18;
  const x = (t: number) => nameW + t * unit;
  return (
    <svg viewBox={`0 0 ${Wd} ${H}`} className="wave-svg" style={{ maxWidth: Wd * 1.4 }} role="img" aria-label="Timing diagram">
      <defs>
        <pattern id={pid} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--warn)" strokeWidth="1.6" />
        </pattern>
      </defs>
      {Array.from({ length: len + 1 }, (_, t) => (
        <line key={`g${t}`} x1={x(t)} y1={0} x2={x(t)} y2={rows.length * ROW} stroke="var(--border)" strokeWidth={t % tickEvery === 0 ? 0.8 : 0.3} />
      ))}
      {cursor !== undefined && cursor >= 0 && cursor < len && <rect x={x(cursor)} y={0} width={unit} height={rows.length * ROW} fill="var(--accent-soft)" />}
      {marks.map((m) => (
        <line key={`m${m}`} x1={x(m)} y1={0} x2={x(m)} y2={rows.length * ROW} stroke="var(--accent)" strokeDasharray="4 3" strokeWidth={1.1} />
      ))}
      {rows.map((r, i) => {
        const y0 = i * ROW;
        const els: ReactNode[] = [];
        const color = r.color ?? "var(--text)";
        if (r.onToggle) els.push(<rect key="ed" x={x(0)} y={y0 + 2} width={len * unit} height={ROW - 4} fill="var(--accent-soft)" opacity={0.45} rx={4} />);
        if (r.vals) {
          let pts: string[] = [];
          const flush = (k: string) => {
            if (pts.length) els.push(<polyline key={k} points={pts.join(" ")} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />);
            pts = [];
          };
          let prev: W | undefined;
          r.vals.forEach((v, t) => {
            if (v === null) {
              flush(`p${t}`);
              els.push(<rect key={`x${t}`} x={x(t)} y={y0 + HI} width={unit} height={LO - HI} fill={`url(#${pid})`} />);
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
            els.push(
              <path key={`b${t0}`} d={`M${xa},${mid} L${xa + k},${y0 + HI} L${xb - k},${y0 + HI} L${xb},${mid} L${xb - k},${y0 + LO} L${xa + k},${y0 + LO} Z`} fill={lab === null ? `url(#${pid})` : "var(--surface)"} stroke={color} strokeWidth={1.3} />,
            );
            if (lab !== null && xb - xa >= 11)
              els.push(
                <text key={`l${t0}`} x={(xa + xb) / 2} y={mid + 4} textAnchor="middle" className="wave-data">
                  {lab}
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
              <rect key={`c${t}`} x={x(t)} y={y0} width={unit} height={ROW} fill="transparent" style={{ cursor: r.onToggle || onCursor ? "pointer" : undefined }} onClick={() => (r.onToggle ? r.onToggle(t) : onCursor?.(t))} />
            ))}
          </g>
        );
      })}
      {Array.from({ length: len }, (_, t) => {
        const lab = tickLabel ? tickLabel(t) : t % tickEvery === 0 ? String(t) : null;
        return lab === null ? null : (
          <text key={`k${t}`} x={x(t) + (tickEvery === 1 || tickLabel ? unit / 2 : 0)} y={rows.length * ROW + 13} textAnchor="middle" className="wave-tick" style={{ cursor: onCursor ? "pointer" : undefined }} onClick={() => onCursor?.(t)}>
            {lab}
          </text>
        );
      })}
    </svg>
  );
}

const toBits = (s: string): W[] => [...s].map((c) => (c === "1" ? 1 : 0));
const flip = (arr: W[], t: number): W[] => arr.map((v, i) => (i === t ? (v ? 0 : 1) : v));
const fmtW = (v: W | undefined) => (v === null || v === undefined ? "x" : String(v));

// ---------------------------------------------------------------------------------------------
// 1. Blocking vs non-blocking: step an always @(posedge clk) block and see the synthesised hardware.

interface Preset {
  label: string;
  inputs: string[];
  regs: string[];
  init: Record<string, Bit>;
  stmts: [string, string][];
}
const PRESETS: Record<string, Preset> = {
  shift: { label: "Shift register", inputs: ["y"], regs: ["q1", "q2", "q3", "q"], init: { q1: 0, q2: 0, q3: 0, q: 0 }, stmts: [["q1", "y"], ["q2", "q1"], ["q3", "q2"], ["q", "q3"]] },
  reversed: { label: "Same, reversed order", inputs: ["y"], regs: ["q1", "q2", "q3", "q"], init: { q1: 0, q2: 0, q3: 0, q: 0 }, stmts: [["q", "q3"], ["q3", "q2"], ["q2", "q1"], ["q1", "y"]] },
  swap: { label: "Swap a and b", inputs: [], regs: ["a", "b"], init: { a: 1, b: 0 }, stmts: [["a", "b"], ["b", "a"]] },
  logic: { label: "A, B, C with logic", inputs: [], regs: ["A", "B", "C"], init: { A: 0, B: 0, C: 0 }, stmts: [["C", "B"], ["B", "A"], ["A", "A ^ ~(B ^ C)"]] },
};

function substitute(e: Expr, map: Record<string, Expr>): Expr {
  if (e.t === "var") return map[e.name] ?? e;
  if (e.t === "const") return e;
  if (e.t === "not") return { t: "not", e: substitute(e.e, map) };
  return { t: e.t, es: e.es.map((x) => substitute(x, map)) };
}
function exprStr(e: Expr, top = true): string {
  if (e.t === "var") return e.name;
  if (e.t === "const") return `1'b${e.v}`;
  if (e.t === "not") return e.e.t === "var" ? `~${e.e.name}` : `~(${exprStr(e.e, true)})`;
  const op = e.t === "and" ? " & " : e.t === "or" ? " | " : " ^ ";
  const s = e.es.map((x) => exprStr(x, false)).join(op);
  return top ? s : `(${s})`;
}

function BlockingStepper() {
  const [key, setKey] = useState<keyof typeof PRESETS>("shift");
  const [blocking, setBlocking] = useState(false);
  const p = PRESETS[key];
  const [regs, setRegs] = useState<Record<string, Bit>>(p.init);
  const [y, setY] = useState<Bit>(1);
  const [hist, setHist] = useState<{ y: Bit; r: Record<string, Bit> }[]>([{ y: 1, r: p.init }]);
  const vars = [...p.inputs, ...p.regs];
  const parsed = useMemo(() => p.stmts.map(([l, r]) => [l, parseExpr(r, vars)] as [string, Expr]), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  // D-input expression of each register in terms of the values just before the edge.
  const dExpr = useMemo(() => {
    const out: Record<string, Expr> = {};
    if (!blocking) parsed.forEach(([l, e]) => (out[l] = e));
    else {
      const cur: Record<string, Expr> = {};
      parsed.forEach(([l, e]) => {
        cur[l] = substitute(e, cur);
        out[l] = cur[l];
      });
    }
    return out;
  }, [parsed, blocking]);
  // Hardware for the D expressions.
  const spec = useMemo<CircuitSpec>(() => {
    const gates: GateSpec[] = [];
    let n = 0;
    const build = (e: Expr): string => {
      if (e.t === "var") return e.name;
      if (e.t === "const") return e.v ? "1" : "0";
      const id = `g${++n}`;
      if (e.t === "not") gates.push({ id, type: "NOT", in: [build(e.e)] });
      else gates.push({ id, type: e.t === "and" ? "AND" : e.t === "or" ? "OR" : "XOR", in: e.es.map(build) });
      return id;
    };
    const dffs: GateSpec[] = p.regs.map((r) => ({ id: r, type: "DFF", in: [build(dExpr[r] ?? { t: "var", name: r }), "clk"] }));
    return { inputs: [...p.inputs, "clk"], gates: [...gates, ...dffs], outputs: p.regs };
  }, [dExpr, p]);
  const env = (r: Record<string, Bit>, yy: Bit): Record<string, Bit> => ({ ...r, y: yy });
  const values = evalCircuit(spec, { y, clk: 0 }, regs);
  const clock = () => {
    const before = env(regs, y);
    const next: Record<string, Bit> = { ...regs };
    if (blocking) {
      const live = { ...before };
      parsed.forEach(([l, e]) => {
        live[l] = evalExpr(e, live);
        next[l] = live[l];
      });
    } else parsed.forEach(([l, e]) => (next[l] = evalExpr(e, before)));
    setRegs(next);
    setHist((h) => [...h, { y, r: next }].slice(-12));
  };
  const reset = (k = key) => {
    setKey(k);
    setRegs(PRESETS[k].init);
    setHist([{ y, r: PRESETS[k].init }]);
  };
  const op = blocking ? "=" : "<=";
  const lines = [
    { text: "always @(posedge clk)" },
    { text: "begin" },
    ...p.stmts.map(([l, r]) => ({ text: `    ${l} ${op} ${r};`, id: l })),
    { text: "end" },
  ];
  const collapsed = p.regs.filter((r) => {
    const e = dExpr[r];
    const orig = parsed.find(([l]) => l === r)?.[1];
    return e && orig && exprStr(e) !== exprStr(orig);
  });
  return (
    <VizFrame
      title="Non-blocking (<=) vs blocking (=) in a clocked block"
      hint="Pick a code example and the assignment operator, set the input, then press Clock edge. The schematic is what synthesis builds from the code."
      onReset={() => reset()}
      figure={
        <>
          <CodeView lines={lines} hot={collapsed} />
          <div style={{ marginTop: 8 }}>
            <CircuitSvg circuit={spec} values={values} />
          </div>
        </>
      }
      controls={
        <>
          <Choice value={key} onChange={(k) => reset(k)} options={Object.entries(PRESETS).map(([k, v]) => ({ v: k as keyof typeof PRESETS, label: v.label }))} />
          <Choice
            value={blocking ? 1 : 0}
            onChange={(v) => {
              setBlocking(v === 1);
              setRegs(p.init);
              setHist([{ y, r: p.init }]);
            }}
            options={[
              { v: 0, label: "non-blocking **<=**" },
              { v: 1, label: "blocking **=**" },
            ]}
          />
          <div className="row" style={{ gap: 14, alignItems: "flex-end" }}>
            {p.inputs.includes("y") && (
              <div>
                <div className="small muted">input</div>
                <BitRow bits={[y]} labels={["y"]} onChange={(b) => setY(b[0])} />
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
          {p.regs.map((r) => (
            <Read key={r} label={`${r}:`} tex={`D input $=$ **${exprStr(dExpr[r])}**${collapsed.includes(r) ? " (sees the **new** value of an earlier line)" : ""}`} tone={collapsed.includes(r) ? "warn" : undefined} />
          ))}
          <Read
            tone={blocking && collapsed.length ? "bad" : "good"}
            tex={
              blocking && collapsed.length
                ? "With **=** each line updates immediately, so later lines read values written **this** edge. The registers no longer form the chain you drew."
                : "Every right-hand side reads the value from **just before** the edge, so statement order does not matter."
            }
          />
          <TableView head={["edge", ...(p.inputs.includes("y") ? ["y"] : []), ...p.regs]} rows={hist.map((h, i) => [i, ...(p.inputs.includes("y") ? [h.y] : []), ...p.regs.map((r) => h.r[r])])} highlightRow={hist.length - 1} />
        </>
      }
      tasks={[
        "Predict: shift register with **<=**, y = 1 then 0, 0, 0. After how many edges does the 1 reach q? Step it.",
        "Switch to blocking **=**. Step the same input. What does the schematic now show, and how many edges does y take to reach q?",
        "Choose **Same, reversed order** with blocking **=**. Why does it behave like a shift register again? Would you rely on this?",
        "Swap a and b: compare **<=** and **=**. Which one really swaps?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Synchronous vs asynchronous reset on the same editable waveform.

const RT_CLK = "0011001100110011001100";
const RT_RST = "1000000010000111000000";
const RT_D = "1111111111110000111111";

function ResetTypes() {
  const [rst, setRst] = useState<W[]>(toBits(RT_RST));
  const [d, setD] = useState<W[]>(toBits(RT_D));
  const [low, setLow] = useState(false);
  const [cursor, setCursor] = useState(8);
  const clk = toBits(RT_CLK);
  // rst holds the *asserted* pattern; the drawn pin level is inverted for active-low.
  const pin = low ? rst.map((v) => (v ? 0 : 1) as W) : rst;
  const rising = (t: number) => t > 0 && clk[t - 1] === 0 && clk[t] === 1;
  const qs: W[] = [];
  const qa: W[] = [];
  let s: W = null;
  let a: W = null;
  for (let t = 0; t < clk.length; t++) {
    if (rising(t)) {
      s = rst[t - 1] ? 0 : d[t - 1];
      a = d[t - 1];
    }
    if (rst[t]) a = 0;
    qs.push(s);
    qa.push(a);
  }
  const edges = clk.flatMap((_, t) => (rising(t) ? [t] : []));
  const t = cursor;
  const name = low ? "rst_n" : "rst";
  const cond = low ? "!rst_n" : "rst";
  const syncCode = [`always @(posedge clk)`, `  if (${cond}) q <= 1'b0;`, `  else q <= d;`];
  const asyncCode = [`always @(posedge clk or ${low ? "negedge" : "posedge"} ${name})`, `  if (${cond}) q <= 1'b0;`, `  else q <= d;`];
  const lastEdge = [...edges].reverse().find((e) => e <= t);
  return (
    <VizFrame
      title="Synchronous vs asynchronous reset"
      hint="Click reset or d cells to edit them. Click a time number to inspect that instant. Dashed lines are rising clock edges."
      onReset={() => {
        setRst(toBits(RT_RST));
        setD(toBits(RT_D));
      }}
      figure={
        <>
          <LiveWave
            marks={edges}
            cursor={cursor}
            onCursor={setCursor}
            rows={[
              { name: "clk", vals: clk },
              { name, vals: pin, onToggle: (k) => setRst(flip(rst, k)) },
              { name: "d", vals: d, onToggle: (k) => setD(flip(d, k)) },
              { name: "q sync", vals: qs, color: "var(--accent)" },
              { name: "q async", vals: qa, color: "var(--good)" },
            ]}
          />
          <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div className="small muted">synchronous</div>
              <CodeView lines={syncCode.map((text) => ({ text }))} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="small muted">asynchronous</div>
              <CodeView lines={asyncCode.map((text) => ({ text }))} />
            </div>
          </div>
        </>
      }
      controls={<Toggle label="Active-low reset (rst_n, asserted when 0)" value={low} onChange={setLow} />}
      readout={
        <>
          <Read label={`t = ${t}:`} tex={`${name} $= ${fmtW(pin[t])}$ (${rst[t] ? "**asserted**" : "not asserted"}), d $= ${fmtW(d[t])}$`} />
          <Read
            tone="good"
            tex={
              rst[t]
                ? `async: reset is in the sensitivity list, so $q = 0$ **now**, without waiting for the clock`
                : `async: ${lastEdge === undefined ? "no edge yet" : `$q = ${fmtW(qa[t])}$ (held since the last event)`}`
            }
          />
          <Read
            tex={
              lastEdge === undefined
                ? "sync: no rising edge yet, so q is unknown (x)"
                : `sync: only looks at ${name} at edges; at the edge $t = ${lastEdge}$ it saw ${name} ${rst[lastEdge - 1] ? "asserted → $q = 0$" : `not asserted → $q = d = ${fmtW(d[lastEdge - 1])}$`}`
            }
          />
        </>
      }
      tasks={[
        "Predict: the short reset pulse at $t = 8$ falls between two rising edges. Which q clears, and for how long?",
        "Look at $t = 0$–$1$: why is q unknown at the start, and why does the synchronous version need a clock edge to leave the unknown state?",
        "Stretch the pulse at $t = 8$ so it is still high at $t = 9$, just before the edge at $t = 10$. Now what does the synchronous version do?",
        "Tick **active-low**. The waveform of the pin flips, but the behaviour does not. Which two things in the code change?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Counter generator + stepper: options change the Verilog; each edge highlights the branch taken.

function CounterStepper() {
  const [width, setWidth] = useState(4);
  const [hasDown, setHasDown] = useState(true);
  const [hasLoad, setHasLoad] = useState(true);
  const [hasEn, setHasEn] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [max, setMax] = useState(9);
  const [ins, setIns] = useState({ rst: 1 as Bit, en: 1 as Bit, down: 0 as Bit, load: 0 as Bit });
  const [cntIn, setCntIn] = useState(5);
  const [q, setQ] = useState<number | null>(null);
  const [hist, setHist] = useState<{ edge: number; ins: string; q: number; br: string }[]>([]);
  const [last, setLast] = useState<string | null>(null);
  const top = 2 ** width - 1;
  const MAX = Math.min(max, top);
  const branch = (): string => {
    if (ins.rst) return "rst";
    if (hasLoad && ins.load) return "load";
    if (hasEn && !ins.en) return "hold";
    if (hasDown && ins.down) return wrap ? "downwrap" : "down";
    return wrap ? "upwrap" : "up";
  };
  const nextOf = (br: string, v: number | null): number | null => {
    if (br === "rst") return 0;
    if (br === "load") return Math.min(cntIn, top);
    if (v === null) return null;
    if (br === "hold") return v;
    if (br === "down") return (v + top) % (top + 1);
    if (br === "up") return (v + 1) % (top + 1);
    if (br === "downwrap") return v === 0 ? MAX : v - 1;
    return v === MAX ? 0 : (v + 1) % (top + 1);
  };
  const br = branch();
  const nxt = nextOf(br, q);
  const clock = () => {
    setQ(nxt);
    setLast(br);
    const desc = [`rst=${ins.rst}`, hasLoad ? `load=${ins.load}` : "", hasEn ? `en=${ins.en}` : "", hasDown ? `down=${ins.down}` : ""].filter(Boolean).join(" ");
    setHist((h) => [...h, { edge: (h[h.length - 1]?.edge ?? 0) + 1, ins: desc, q: nxt ?? -1, br }].slice(-8));
  };
  const resetAll = () => {
    setQ(null);
    setHist([]);
    setLast(null);
    setIns({ rst: 1, en: 1, down: 0, load: 0 });
  };
  const ports = ["input clk, rst", hasEn ? ", en" : "", hasDown ? ", down" : "", hasLoad ? ", load" : "", ","].join("");
  const lines: { text: string; id?: string }[] = [
    { text: `module counter #(parameter WIDTH = ${width}${wrap ? `, MAX = ${MAX}` : ""})` },
    { text: `  (${ports}` },
    ...(hasLoad ? [{ text: "   input [WIDTH-1:0] cnt_in," }] : []),
    { text: "   output reg [WIDTH-1:0] q);" },
    { text: "always @(posedge clk)" },
    { text: "begin" },
    { text: "  if (rst)" },
    { text: "    q <= {WIDTH{1'b0}};", id: "rst" },
  ];
  if (hasLoad) lines.push({ text: "  else if (load)" }, { text: "    q <= cnt_in;", id: "load" });
  const ind = hasEn ? "    " : "  ";
  if (hasEn) lines.push({ text: "  else if (en) begin" });
  const upLines = wrap ? [{ text: `${ind}  q <= (q == MAX) ? {WIDTH{1'b0}} : q + 1'b1;`, id: "upwrap" }] : [{ text: `${ind}  q <= q + 1'b1;`, id: "up" }];
  const downLines = wrap ? [{ text: `${ind}  q <= (q == 0) ? MAX : q - 1'b1;`, id: "downwrap" }] : [{ text: `${ind}  q <= q - 1'b1;`, id: "down" }];
  if (hasDown) {
    lines.push({ text: hasEn ? `${ind}if (down)` : "  else if (down)" }, ...downLines, { text: hasEn ? `${ind}else` : "  else" }, ...upLines);
  } else {
    if (!hasEn) lines.push({ text: "  else" });
    lines.push(...upLines);
  }
  if (hasEn) lines.push({ text: "  end", id: "" }, { text: "  // en = 0: no assignment, q keeps its value", id: "hold" });
  lines.push({ text: "end" }, { text: "endmodule" });
  const fmt = (v: number | null) => (v === null ? "x" : `${v} (${v.toString(2).padStart(width, "0")})`);
  const bitsIns: { k: keyof typeof ins; show: boolean }[] = [
    { k: "rst", show: true },
    { k: "load", show: hasLoad },
    { k: "en", show: hasEn },
    { k: "down", show: hasDown },
  ];
  const shown = bitsIns.filter((b) => b.show);
  return (
    <VizFrame
      title="Counter in Verilog: options, code and clock edges"
      hint="Tick features to change the code. Set the inputs and press Clock edge: the highlighted line is the branch that will run at the next edge."
      onReset={resetAll}
      figure={<CodeView lines={lines} hot={[br]} />}
      controls={
        <>
          <Slider label="WIDTH" value={width} min={3} max={6} step={1} onChange={(v) => { setWidth(v); setQ(null); setHist([]); }} format={(v) => String(v)} />
          <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
            <Toggle label="down input" value={hasDown} onChange={setHasDown} />
            <Toggle label="load input" value={hasLoad} onChange={setHasLoad} />
            <Toggle label="enable" value={hasEn} onChange={setHasEn} />
            <Toggle label="wrap at MAX" value={wrap} onChange={setWrap} />
          </div>
          {wrap && <Slider label="MAX" value={MAX} min={1} max={top} step={1} onChange={setMax} format={(v) => String(v)} />}
          {hasLoad && <Slider label="cnt_in" value={Math.min(cntIn, top)} min={0} max={top} step={1} onChange={setCntIn} format={(v) => String(v)} />}
          <div className="row" style={{ gap: 14, alignItems: "flex-end" }}>
            <BitRow bits={shown.map((b) => ins[b.k])} labels={shown.map((b) => b.k)} onChange={(v) => setIns({ ...ins, ...Object.fromEntries(shown.map((b, i) => [b.k, v[i]])) })} />
            <button className="btn primary small" onClick={clock}>
              ⏵ Clock edge
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="q now" tex={`**${fmt(q)}**`} tone={q === null ? "warn" : undefined} />
          <Read label="next edge" tex={`branch **${br}** → $q^+ = ${nxt === null ? "x" : nxt}$`} tone="good" />
          {last && <Read label="last edge ran" tex={`**${last}**`} />}
          {q === null && <Read tone="warn" tex="Before the first reset the register holds **x** (unknown). Unknown + 1 is still unknown." />}
          {hist.length > 0 && <TableView head={["edge", "inputs", "q"]} rows={hist.map((h) => [h.edge, h.ins, h.q < 0 ? "x" : h.q])} highlightRow={hist.length - 1} />}
        </>
      }
      tasks={[
        "Predict: clear rst, then count down from 0 without wrap. What value appears after the first edge? Why (think modulo $2^{\\text{WIDTH}}$)?",
        "Tick **wrap at MAX** with WIDTH = 5 and MAX = 20 (Tutorial 9 Q3a). Load 19 and step: what follows 20?",
        "Set both load = 1 and rst = 1. Which wins, and which line of the code decides that?",
        "Tick **enable** and set en = 0. Which line is highlighted? Explain why no latch is created even though no assignment happens.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Pipelining: x <= a + b; y <= x - c; z <= y * y;  with optional re-timing of c.

const PA = [3, 5, 2, 6, 4, 7, 1, 5, 0, 0, 0];
const PB = [1, 2, 4, 1, 3, 0, 2, 2, 0, 0, 0];
const PC = [2, 4, 1, 3, 5, 2, 0, 6, 0, 0, 0];

interface Tagged {
  v: number | null;
  /** Index of the input set it was computed from (for c, its own index). */
  tag: number | null;
  ctag?: number | null;
}

function PipelineViz() {
  const [align, setAlign] = useState(false);
  const [k, setK] = useState(0);
  // Simulate edges 1..k. Inputs "before edge j" are a[j-1], b[j-1], c[j-1] (set j).
  const sim = useMemo(() => {
    const steps: { x: Tagged; c1: Tagged; y: Tagged; z: Tagged }[] = [];
    let x: Tagged = { v: null, tag: null };
    let c1: Tagged = { v: null, tag: null };
    let y: Tagged = { v: null, tag: null };
    let z: Tagged = { v: null, tag: null };
    steps.push({ x, c1, y, z });
    for (let j = 1; j <= PA.length; j++) {
      const a = PA[j - 1];
      const b = PB[j - 1];
      const c = PC[j - 1];
      const cUse: Tagged = align ? c1 : { v: c, tag: j };
      const nx: Tagged = { v: a + b, tag: j };
      const nc1: Tagged = { v: c, tag: j };
      const ny: Tagged = { v: x.v === null || cUse.v === null ? null : x.v - cUse.v, tag: x.tag, ctag: cUse.tag };
      const nz: Tagged = { v: y.v === null ? null : y.v * y.v, tag: y.tag, ctag: y.ctag };
      [x, c1, y, z] = [nx, nc1, ny, nz];
      steps.push({ x, c1, y, z });
    }
    return steps;
  }, [align]);
  const s = sim[k];
  const depth = align ? 3 : 3;
  const expected = (j: number) => (PA[j - 1] + PB[j - 1] - PC[j - 1]) ** 2;
  const zOk = s.z.v !== null && s.z.tag !== null && s.z.v === expected(s.z.tag);
  const lines = [
    { text: "always @(posedge clk)" },
    { text: "begin" },
    { text: "    x <= a + b;", id: "x" },
    ...(align ? [{ text: "    c1 <= c;        // delay c to stay in step", id: "c1" }] : []),
    { text: align ? "    y <= x - c1;" : "    y <= x - c;", id: "y" },
    { text: "    z <= y * y;", id: "z" },
    { text: "end" },
  ];
  const W = 500;
  const box = (xp: number, label: string, val: Tagged, warn = false, key = label) => (
    <g key={key}>
      <rect x={xp} y={62} width={70} height={46} rx={6} fill="var(--surface)" stroke={warn ? "var(--bad)" : "var(--accent)"} strokeWidth={2} />
      <text x={xp + 35} y={56} textAnchor="middle" className="cir-pin">
        {label} register
      </text>
      <text x={xp + 35} y={84} textAnchor="middle" className="cir-label">
        {val.v === null ? "x" : val.v}
      </text>
      <text x={xp + 35} y={100} textAnchor="middle" className="cir-pin">
        {val.tag === null ? "" : val.ctag !== undefined && val.ctag !== null && val.ctag !== val.tag ? `set ${val.tag}, c${val.ctag}` : `set ${val.tag}`}
      </text>
    </g>
  );
  const op = (xp: number, sym: string) => (
    <g>
      <circle cx={xp} cy={85} r={15} fill="var(--surface-2)" stroke="var(--text)" />
      <text x={xp} y={90} textAnchor="middle" className="cir-label">
        {sym}
      </text>
    </g>
  );
  const mis = (t: Tagged) => t.ctag !== undefined && t.ctag !== null && t.tag !== null && t.ctag !== t.tag;
  return (
    <VizFrame
      title="Pipelining: a register after every stage"
      hint="Press Next to apply one clock edge. Each register shows its value and which input set (1, 2, 3, …) it came from."
      onReset={() => setK(0)}
      figure={
        <>
          <svg viewBox={`0 0 ${W} 150`} className="viz-svg" role="img" aria-label="Three-stage pipeline">
            <text x={8} y={22} className="cir-pin">
              inputs before edge {k + 1}: a={PA[k] ?? "-"}, b={PB[k] ?? "-"}, c={PC[k] ?? "-"} (set {k + 1})
            </text>
            {op(40, "+")}
            <line x1={55} y1={85} x2={80} y2={85} stroke="var(--text)" />
            {box(80, "x", s.x)}
            <line x1={150} y1={85} x2={190} y2={85} stroke="var(--text)" />
            {op(205, "−")}
            <line x1={205} y1={100} x2={205} y2={130} stroke="var(--text)" />
            <text x={212} y={136} className="cir-pin">
              {align ? `c1 = ${s.c1.v ?? "x"} (set ${s.c1.tag ?? "-"})` : `c (set ${k + 1})`}
            </text>
            <line x1={220} y1={85} x2={250} y2={85} stroke="var(--text)" />
            {box(250, "y", s.y, mis(s.y))}
            <line x1={320} y1={85} x2={360} y2={85} stroke="var(--text)" />
            {op(375, "²")}
            <line x1={390} y1={85} x2={420} y2={85} stroke="var(--text)" />
            {box(420, "z", s.z, mis(s.z))}
          </svg>
          <div style={{ marginTop: 8 }}>
            <CodeView lines={lines} />
          </div>
        </>
      }
      controls={
        <>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn small" disabled={k === 0} onClick={() => setK(0)}>
              ⏮
            </button>
            <button className="btn small" disabled={k === 0} onClick={() => setK(k - 1)}>
              ◀ Prev
            </button>
            <button className="btn small primary" disabled={k >= sim.length - 1} onClick={() => setK(k + 1)}>
              Next edge ▶
            </button>
            <span className="small muted">after edge {k}</span>
          </div>
          <Toggle label="Add **c1 <= c** so c travels with its own data" value={align} onChange={(v) => { setAlign(v); }} />
        </>
      }
      readout={
        <>
          <Read tex={`Latency: an input set reaches z after **${depth}** edges; a new set can enter **every** edge.`} />
          {s.z.v !== null && s.z.tag !== null ? (
            <Read
              tone={zOk ? "good" : "bad"}
              tex={
                zOk
                  ? `z $= ${s.z.v} = (a_{${s.z.tag}} + b_{${s.z.tag}} - c_{${s.z.tag}})^2$ ✓`
                  : `z $= ${s.z.v}$ but $(a_{${s.z.tag}} + b_{${s.z.tag}} - c_{${s.z.tag}})^2 = ${expected(s.z.tag)}$: it used $c_{${s.z.ctag}}$, one set too late`
              }
            />
          ) : (
            <Read tone="warn" tex="z is still x: the pipeline is filling." />
          )}
          <TableView head={["edge", "x", align ? "c1" : "c used", "y", "z"]} rows={sim.slice(0, k + 1).map((r, j) => [j, r.x.v ?? "x", align ? (r.c1.v ?? "x") : j === 0 ? "-" : PC[j - 1], r.y.v ?? "x", r.z.v ?? "x"])} highlightRow={k} />
        </>
      }
      tasks={[
        "Predict: after which edge does z first hold a real number? Step to check.",
        "With the plain code, compare z after edge 3 with $(a_1 + b_1 - c_1)^2$. Which $c$ was actually used?",
        "Tick the **c1 <= c** line and step again. Why does c need its own register to stay in step with $a + b$?",
        "In the combinational version, how long would one result take? What does the pipeline trade for a higher clock rate?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Tutorial 9 Q2: monitoring counter with a threshold alarm.

const AM_EV = "0110111011101111011";
const AM_RST = "1000000000000000000";

function AlarmMonitor() {
  const [ev, setEv] = useState<W[]>(toBits(AM_EV));
  const [rs, setRs] = useState<W[]>(toBits(AM_RST));
  const [thresh, setThresh] = useState(5);
  const [ge, setGe] = useState(false);
  const [freeze, setFreeze] = useState(true);
  const [cursor, setCursor] = useState(8);
  const n = ev.length;
  // count[c] = register value during cycle c; it updates at the edge starting cycle c from cycle c-1's inputs.
  const count: (number | null)[] = [];
  const alarm: W[] = [];
  let cnt: number | null = null;
  for (let c = 0; c < n; c++) {
    if (c > 0) {
      const prevAlarm = alarm[c - 1];
      if (rs[c - 1]) cnt = 0;
      else if (cnt !== null && ev[c - 1] && !(freeze && prevAlarm)) cnt = (cnt + 1) % 64;
    }
    count.push(cnt);
    alarm.push(cnt === null ? null : (ge ? cnt >= thresh : cnt > thresh) ? 1 : 0);
  }
  const clk: W[] = Array.from({ length: n * 2 }, (_, t) => (t % 2 === 0 ? 1 : 0));
  const dbl = <T,>(a: T[]) => a.flatMap((v) => [v, v]);
  const cyc = Math.floor(cursor / 2);
  const cmp = ge ? ">=" : ">";
  const code = [
    { text: "module monitor (input clk, rst, evnt," },
    { text: "                input [5:0] thresh," },
    { text: "                output alarm);" },
    { text: "reg [5:0] count;" },
    { text: `assign alarm = (count ${cmp} thresh);`, id: "alarm" },
    { text: "always @(posedge clk)" },
    { text: "  if (rst)" },
    { text: "    count <= 6'd0;", id: "rst" },
    { text: freeze ? "  else if (evnt && !alarm)" : "  else if (evnt)" },
    { text: "    count <= count + 1'b1;", id: "inc" },
    { text: "endmodule" },
  ];
  const nextBr = rs[cyc] ? "rst" : ev[cyc] && !(freeze && alarm[cyc]) && count[cyc] !== null ? "inc" : "";
  const firstAlarm = alarm.findIndex((a) => a === 1);
  return (
    <VizFrame
      title="Monitoring counter with a threshold alarm"
      hint="Each column pair is one clock cycle. Click evnt or rst cells to edit them; click a time number to inspect a cycle."
      onReset={() => {
        setEv(toBits(AM_EV));
        setRs(toBits(AM_RST));
      }}
      figure={
        <>
          <LiveWave
            unit={12}
            cursor={cursor}
            onCursor={setCursor}
            marks={Array.from({ length: n - 1 }, (_, c) => 2 * (c + 1))}
            tickLabel={(t) => (t % 2 === 0 ? String(t / 2) : null)}
            rows={[
              { name: "clk", vals: clk },
              { name: "rst", vals: dbl(rs), onToggle: (t) => setRs(flip(rs, Math.floor(t / 2))) },
              { name: "evnt", vals: dbl(ev), onToggle: (t) => setEv(flip(ev, Math.floor(t / 2))) },
              { name: "count", bus: dbl(count.map((c) => (c === null ? null : String(c)))), color: "var(--accent)" },
              { name: "alarm", vals: dbl(alarm), color: "var(--bad)" },
            ]}
          />
          <div style={{ marginTop: 8 }}>
            <CodeView lines={code} hot={[nextBr, ...(alarm[cyc] ? ["alarm"] : [])]} />
          </div>
        </>
      }
      controls={
        <>
          <Slider label="thresh" value={thresh} min={0} max={12} step={1} onChange={setThresh} format={(v) => String(v)} />
          <Choice
            value={ge ? 1 : 0}
            onChange={(v) => setGe(v === 1)}
            options={[
              { v: 0, label: "alarm = count > thresh (exceeds)" },
              { v: 1, label: "alarm = count >= thresh" },
            ]}
          />
          <Toggle label="Stop counting while alarm is high" value={freeze} onChange={setFreeze} />
        </>
      }
      readout={
        <>
          <Read label={`cycle ${cyc}:`} tex={`count $= ${count[cyc] ?? "x"}$, evnt $= ${fmtW(ev[cyc])}$, alarm $= ${fmtW(alarm[cyc])}$`} />
          <Read
            tex={
              rs[cyc]
                ? "rst is high: the next edge loads count = 0"
                : count[cyc] === null
                  ? "count is x until the first reset edge"
                  : ev[cyc] && !(freeze && alarm[cyc])
                    ? `next edge: count → ${(count[cyc]! + 1) % 64}`
                    : alarm[cyc] && freeze && ev[cyc]
                      ? "alarm is high, so the counter is frozen"
                      : "evnt = 0: count holds"
            }
          />
          <Read tone={firstAlarm >= 0 ? "bad" : undefined} tex={firstAlarm >= 0 ? `alarm first rises in cycle ${firstAlarm}, as soon as count becomes ${count[firstAlarm]} (combinational: no extra cycle)` : "alarm never rises in this window"} />
        </>
      }
      tasks={[
        "Predict: with thresh = 5 and **>**, what count value raises the alarm? In which cycle does it happen?",
        "Switch to **>=**. Which reading of “exceeds a threshold” does each comparison implement?",
        "Untick **Stop counting**. What does count do after the alarm, and why is that a problem for an operator reading the count?",
        "Pulse rst in the middle of the run. Does count clear in the same cycle or at the next edge? (Look at the code: is the reset synchronous?)",
      ]}
    />
  );
}
