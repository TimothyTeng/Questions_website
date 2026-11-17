"use client";

// Interactive figures for the boolean lesson (Ch 3: gates, Boolean algebra, timing, NAND/NOR, symbols, XOR/parity).

import { useMemo, useState, type ReactNode } from "react";
import { evalCircuit, exprVars, minimalSop, minterms, netOf, parseExpr, rowEnv, truthTable, type Bit, type Expr, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec, GateSpec, GateType } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, Read, Slider, TableView, Toggle, VizFrame } from "../kit";

export default function BooleanVisual({ id }: { id: string }) {
  switch (id) {
    case "gate-playground":
      return <GatePlayground />;
    case "expr-circuit":
      return <ExprCircuit />;
    case "prop-delay":
      return <PropDelay />;
    case "equiv-checker":
      return <EquivChecker />;
    case "bubble-pushing":
      return <BubblePushing />;
    case "nand-nor-builder":
      return <NandNorBuilder />;
    case "parity-tree":
      return <ParityTree />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Helpers

const b = (v: Val | undefined): Bit => (v === 1 ? 1 : 0);
const fmtV = (v: Val | undefined) => (v === null || v === undefined ? "?" : v === "z" ? "z" : String(v));
const BUBBLE_OUT: GateType[] = ["NAND", "NOR", "XNOR", "NOT"];

/** Live input state for a circuit; reset by remounting (key) when the circuit changes. */
function useInputs(names: string[], init: Record<string, Bit> = {}) {
  const [ins, setIns] = useState<Record<string, Bit>>(() => Object.fromEntries(names.map((n) => [n, init[n] ?? 0])));
  const toggle = (n: string) => setIns((s) => (n in s ? { ...s, [n]: (1 - s[n]) as Bit } : s));
  const reset = () => setIns(Object.fromEntries(names.map((n) => [n, init[n] ?? 0])));
  return { ins, setIns, toggle, reset };
}

/** Truth-table rows for a combinational circuit (inputs first, then the listed outputs). */
function tableRows(c: CircuitSpec, outs: string[], extra?: (env: Record<string, Bit>) => (string | number)[]) {
  return Array.from({ length: 1 << c.inputs.length }, (_, m) => {
    const env = rowEnv(c.inputs, m);
    const v = evalCircuit(c, env);
    return [...c.inputs.map((i) => env[i]), ...outs.map((o) => fmtV(v[o])), ...(extra ? extra(env) : [])];
  });
}
const rowOf = (names: string[], ins: Record<string, Bit>) => names.reduce((a, n) => a * 2 + (ins[n] ?? 0), 0);

/** Pretty-prints an expression with primes, e.g. A'(B + C). */
function show(e: Expr): string {
  const wrap = (x: Expr, ctx: "and" | "xor") => (x.t === "or" || (ctx === "and" && x.t === "xor") ? `(${show(x)})` : show(x));
  switch (e.t) {
    case "var":
      return e.name;
    case "const":
      return String(e.v);
    case "not":
      return e.e.t === "var" ? `${e.e.name}'` : `(${show(e.e)})'`;
    case "and":
      return e.es.map((x) => wrap(x, "and")).join("");
    case "or":
      return e.es.map(show).join(" + ");
    case "xor":
      return e.es.map((x) => wrap(x, "xor")).join(" ⊕ ");
  }
}

/** Builds a gate-level circuit from an expression: NOT per complemented variable, NAND/NOR/XNOR for a complemented group. */
function exprToCircuit(e: Expr, out = "X"): { circuit: CircuitSpec; sub: Record<string, string> } {
  const vars = [...exprVars(e)].sort();
  const gates: GateSpec[] = [];
  const sub: Record<string, string> = {};
  let n = 0;
  const notOf: Record<string, string> = {};
  const build = (x: Expr, id?: string): string => {
    if (x.t === "const") throw new Error("Constants 0/1 are not supported in this builder");
    if (x.t === "var") {
      if (!id) return x.name;
      gates.push({ id, type: "BUF", in: [x.name] });
      sub[id] = x.name;
      return id;
    }
    if (x.t === "not") {
      const y = x.e;
      if (y.t === "not") return build(y.e, id);
      if (y.t === "const") throw new Error("Constants 0/1 are not supported in this builder");
      if (y.t === "var") {
        if (!id && notOf[y.name]) return notOf[y.name];
        const gid = id ?? `${y.name}'`;
        gates.push({ id: gid, type: "NOT", in: [y.name] });
        sub[gid] = `${y.name}'`;
        if (!id) notOf[y.name] = gid;
        return gid;
      }
      const ins = y.es.map((z) => build(z));
      const gid = id ?? `G${++n}`;
      gates.push({ id: gid, type: y.t === "and" ? "NAND" : y.t === "or" ? "NOR" : "XNOR", in: ins });
      sub[gid] = show(x);
      return gid;
    }
    const ins = x.es.map((z) => build(z));
    const gid = id ?? `G${++n}`;
    gates.push({ id: gid, type: x.t === "and" ? "AND" : x.t === "or" ? "OR" : "XOR", in: ins });
    sub[gid] = show(x);
    return gid;
  };
  build(e, out);
  return { circuit: { inputs: vars, gates, outputs: [out] }, sub };
}

// ---------------------------------------------------------------------------------------------
// 1. Gate playground

const GATE_INFO: Record<string, { rule: string; op: string }> = {
  AND: { rule: "output is 1 only when **all** inputs are 1", op: "·" },
  OR: { rule: "output is 1 when **at least one** input is 1", op: " + " },
  NAND: { rule: "output is 0 only when **all** inputs are 1", op: "·" },
  NOR: { rule: "output is 1 only when **all** inputs are 0", op: " + " },
  XOR: { rule: "output is 1 when an **odd number** of inputs are 1", op: " ⊕ " },
  XNOR: { rule: "output is 1 when an **even number** of inputs are 1", op: " ⊕ " },
  NOT: { rule: "output is the **complement** of the input", op: "" },
  BUF: { rule: "output **equals** the input (no change in logic)", op: "" },
};

function GatePlayground() {
  const [gate, setGate] = useState<GateType>("AND");
  const [n, setN] = useState(2);
  const single = gate === "NOT" || gate === "BUF";
  const names = single ? ["A"] : ["A", "B", "C"].slice(0, n);
  const circuit: CircuitSpec = { inputs: names, gates: [{ id: "X", type: gate, in: names }], outputs: ["X"] };
  return <GatePlaygroundInner key={`${gate}${names.length}`} gate={gate} setGate={setGate} n={n} setN={setN} circuit={circuit} />;
}

function GatePlaygroundInner({ gate, setGate, n, setN, circuit }: { gate: GateType; setGate: (g: GateType) => void; n: number; setN: (n: number) => void; circuit: CircuitSpec }) {
  const names = circuit.inputs;
  const { ins, toggle, reset } = useInputs(names);
  const v = evalCircuit(circuit, ins);
  const info = GATE_INFO[gate];
  const inner = names.join(info.op);
  const expr =
    gate === "NOT" ? "A'" : gate === "BUF" ? "A" : gate === "NAND" || gate === "NOR" || gate === "XNOR" ? `(${inner})'` : inner;
  const rows = tableRows(circuit, ["X"]);
  const ones = rows.filter((r) => r[r.length - 1] === "1").length;
  const single = gate === "NOT" || gate === "BUF";
  return (
    <VizFrame
      title="Gate playground: symbol, expression and truth table"
      hint="Pick a gate, then click the input boxes on the left of the symbol. The highlighted truth-table row is the current input combination."
      onReset={reset}
      figure={<CircuitSvg circuit={circuit} values={v} onToggleInput={toggle} maxWidth={360} />}
      controls={
        <>
          <Choice<GateType>
            value={gate}
            onChange={setGate}
            options={(["AND", "OR", "NOT", "BUF", "NAND", "NOR", "XOR", "XNOR"] as GateType[]).map((g) => ({ v: g, label: g }))}
          />
          {!single && (
            <Choice
              value={n}
              onChange={setN}
              options={[
                { v: 2, label: "2 inputs" },
                { v: 3, label: "3 inputs" },
              ]}
            />
          )}
        </>
      }
      readout={
        <>
          <Read label="Expression" tex={`**X = ${expr}**`} />
          <Read label="Rule" tex={info.rule} />
          <Read label="Now" tex={`${names.map((nm) => `${nm} = ${ins[nm]}`).join(", ")} ⇒ **X = ${fmtV(v.X)}**`} tone={v.X === 1 ? "good" : undefined} />
          <Read tex={`$2^{${names.length}} = ${rows.length}$ rows, X = 1 on ${ones} of them`} />
          <TableView head={[...names, "X"]} rows={rows} highlightRow={rowOf(names, ins)} />
        </>
      }
      tasks={[
        "Predict: how many rows of a 3-input AND have X = 1? And a 3-input OR? Switch to 3 inputs and check the count line.",
        "Compare NAND with AND (and NOR with OR): the X column is exactly complemented. Where on the symbol is that complement drawn?",
        "XOR vs OR: find the only row where they differ. Then switch XOR to 3 inputs and check that X = 1 exactly when an odd number of inputs are 1.",
        "Explain why a gate with $N$ inputs needs $2^N$ rows: each input doubles the number of combinations.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Expression ↔ circuit

const EXPR_PRESETS = ["A'(B + C)(A + D)'", "AC + BC' + A'BC", "((A + B)'(B'C))'", "((A'B + C)D')'", "A + (BC)'", "(A ^ B)C"];

function ExprCircuit() {
  const [src, setSrc] = useState(EXPR_PRESETS[0]);
  const [ins, setIns] = useState<Record<string, Bit>>({});
  const parsed = useMemo(() => {
    try {
      const e = parseExpr(src);
      const vars = [...exprVars(e)];
      if (vars.length > 5) return { err: "Use at most 5 variables." };
      if (vars.length === 0) return { err: "Use at least one variable." };
      const r = exprToCircuit(e);
      if (r.circuit.gates.length > 14) return { err: "That needs more than 14 gates: try a shorter expression." };
      return { e, ...r };
    } catch (err) {
      return { err: (err as Error).message };
    }
  }, [src]);
  const ok = !("err" in parsed);
  const circuit = ok ? parsed.circuit : null;
  const env: Record<string, Bit> = circuit ? Object.fromEntries(circuit.inputs.map((n) => [n, ins[n] ?? 0])) : {};
  const v = circuit ? evalCircuit(circuit, env) : {};
  const toggle = (n: string) => setIns((s) => ({ ...s, [n]: (1 - (s[n] ?? 0)) as Bit }));
  return (
    <VizFrame
      title="Expression ↔ circuit"
      hint="Type a Boolean expression (A'B + C(D + E)', ^ for XOR) or pick a preset. The circuit is built gate by gate; click its inputs to evaluate it."
      onReset={() => {
        setSrc(EXPR_PRESETS[0]);
        setIns({});
      }}
      figure={
        circuit ? (
          <CircuitSvg circuit={circuit} values={v} onToggleInput={toggle} />
        ) : (
          <div className="viz-svg" style={{ padding: 24, color: "var(--bad)" }}>
            {"err" in parsed ? parsed.err : ""}
          </div>
        )
      }
      controls={
        <>
          <input className="answer-input" value={src} onChange={(e) => setSrc(e.target.value)} aria-label="Boolean expression" spellCheck={false} />
          <Choice value={EXPR_PRESETS.includes(src) ? src : ""} onChange={setSrc} options={EXPR_PRESETS.map((p) => ({ v: p, label: p.replace(/\^/g, "⊕") }))} />
        </>
      }
      readout={
        circuit && !("err" in parsed) ? (
          <>
            <Read label="Gates" tex={`**${circuit.gates.length}** (${circuit.gates.filter((g) => g.type === "NOT").length} inverter${circuit.gates.filter((g) => g.type === "NOT").length === 1 ? "" : "s"}, ${circuit.gates.filter((g) => g.type !== "NOT").length} other)`} />
            {circuit.gates.map((g) => (
              <Read key={g.id} label={`${g.id} (${g.type})`} tex={`${parsed.sub[g.id] ?? ""} = **${fmtV(v[g.id])}**`} tone={g.id === "X" && v[g.id] === 1 ? "good" : undefined} />
            ))}
            {circuit.inputs.length <= 4 && <TableView head={[...circuit.inputs, "X"]} rows={tableRows(circuit, ["X"])} highlightRow={rowOf(circuit.inputs, env)} />}
          </>
        ) : (
          <Read tex="Fix the expression to see the circuit." tone="bad" />
        )
      }
      tasks={[
        "Predict: for $X = A'(B + C)(A + D)'$, which values of $A$ and $D$ are forced if $X = 1$? Set them and confirm only $B + C$ is left to decide.",
        "Type A + BC' and then (A + B)C'. Compare the circuits: which operation is done first in each, and how does the truth table change?",
        "Type (AB)' and then A' + B'. The circuits look different (one NAND vs two NOTs and an OR) but the truth tables match: that is De Morgan.",
        "Count the gates for $AC + BC' + A'BC$: one inverter per complemented variable, one AND per product, one OR. Does the gate count agree?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Propagation delay and glitches

const N_T = 20;
interface DelayPreset {
  name: string;
  circuit: CircuitSpec;
  waves: Record<string, string>;
  note: string;
}
const DELAY_PRESETS: DelayPreset[] = [
  {
    name: "Z = (A + BC)'",
    circuit: {
      inputs: ["A", "B", "C"],
      gates: [
        { id: "BC", type: "AND", in: ["B", "C"] },
        { id: "A+BC", type: "OR", in: ["A", "BC"] },
        { id: "Z", type: "NOT", in: ["A+BC"] },
      ],
      outputs: ["Z"],
    },
    waves: { A: "00000000000000111100", B: "00011111111110000000", C: "00011111111111111000" },
    note: "PYP-style chain AND → OR → NOT: every output edge lags its cause by the sum of the delays on its path.",
  },
  {
    name: "F = AB + A'C (hazard)",
    circuit: {
      inputs: ["A", "B", "C"],
      gates: [
        { id: "A'", type: "NOT", in: ["A"] },
        { id: "AB", type: "AND", in: ["A", "B"] },
        { id: "A'C", type: "AND", in: ["A'", "C"] },
        { id: "F", type: "OR", in: ["AB", "A'C"] },
      ],
      outputs: ["F"],
    },
    waves: { A: "11111000000001111111", B: "11111111111111111111", C: "11111111111111111111" },
    note: "With B = C = 1 the ideal output is always 1, but the A'C path is one inverter longer than the AB path.",
  },
  {
    name: "F = A·A' (pulse)",
    circuit: {
      inputs: ["A"],
      gates: [
        { id: "A'", type: "NOT", in: ["A"] },
        { id: "F", type: "AND", in: ["A", "A'"] },
      ],
      outputs: ["F"],
    },
    waves: { A: "00011111110000111110" },
    note: "Ideally always 0. In hardware, A and A' overlap for one inverter delay after A rises: a pulse generator.",
  },
  {
    name: "XOR from 4 NANDs",
    circuit: {
      inputs: ["A", "B"],
      gates: [
        { id: "G1", type: "NAND", in: ["A", "B"] },
        { id: "G2", type: "NAND", in: ["A", "G1"] },
        { id: "G3", type: "NAND", in: ["B", "G1"] },
        { id: "X", type: "NAND", in: ["G2", "G3"] },
      ],
      outputs: ["X"],
    },
    waves: { A: "00011111111000000000", B: "00011111111000111100" },
    note: "Each input reaches X through two or three NANDs. When A and B rise together the ideal X stays 0, but the unequal paths make X twitch.",
  },
];

function gateFn(type: GateType, ins: Bit[]): Bit {
  const and = ins.every((x) => x === 1) ? 1 : 0;
  const or = ins.some((x) => x === 1) ? 1 : 0;
  const xor = (ins.reduce((a: number, x) => a ^ x, 0) & 1) as Bit;
  switch (type) {
    case "AND":
      return and;
    case "NAND":
      return (1 - and) as Bit;
    case "OR":
      return or;
    case "NOR":
      return (1 - or) as Bit;
    case "XOR":
      return xor;
    case "XNOR":
      return (1 - xor) as Bit;
    case "NOT":
      return (1 - ins[0]) as Bit;
    default:
      return ins[0];
  }
}

/** Transport-delay simulation: a gate's output at time t is its function of the net values at t − delay. */
function simulate(c: CircuitSpec, waves: Record<string, string>, delayOf: (g: GateSpec) => number) {
  const at0 = Object.fromEntries(c.inputs.map((i) => [i, Number(waves[i][0]) as Bit]));
  const steady0 = evalCircuit(c, at0);
  const steady: Record<string, Bit> = Object.fromEntries(Object.entries(steady0).map(([k, x]) => [k, b(x)]));
  // Simulate past the visible window (inputs held) so late edges and glitches are still counted.
  const len = N_T + 12;
  const at = (i: string, t: number) => Number(waves[i][Math.min(t, N_T - 1)]) as Bit;
  const vals: Record<string, Bit>[] = [];
  for (let t = 0; t < len; t++) {
    const cur: Record<string, Bit> = {};
    for (const i of c.inputs) cur[i] = at(i, t);
    for (const g of c.gates) {
      const d = delayOf(g);
      const src = d === 0 ? cur : t - d >= 0 ? vals[t - d] : steady;
      const ins = g.in.map((r) => {
        const { net, invert } = netOf(r);
        const x = src[net] ?? 0;
        return (invert ? 1 - x : x) as Bit;
      });
      cur[g.id] = gateFn(g.type, ins);
    }
    vals.push(cur);
  }
  const ideal = Array.from({ length: len }, (_, t) => {
    const env = Object.fromEntries(c.inputs.map((i) => [i, at(i, t)]));
    const v = evalCircuit(c, env);
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, b(x)])) as Record<string, Bit>;
  });
  return { vals, ideal };
}

function PropDelay() {
  const [pi, setPi] = useState(0);
  const p = DELAY_PRESETS[pi];
  const [waves, setWaves] = useState<Record<string, string>>(p.waves);
  const [dNot, setDNot] = useState(1);
  const [dGate, setDGate] = useState(1);
  const [cursor, setCursor] = useState(6);
  const [internal, setInternal] = useState(true);
  const choose = (i: number) => {
    setPi(i);
    setWaves(DELAY_PRESETS[i].waves);
  };
  const c = p.circuit;
  const delayOf = (g: GateSpec) => (g.type === "NOT" ? dNot : dGate);
  const { vals, ideal } = useMemo(() => simulate(c, waves, delayOf), [c, waves, dNot, dGate]); // eslint-disable-line react-hooks/exhaustive-deps
  const out = (c.outputs ?? [])[0];
  const flip = (name: string, t: number) => setWaves((w) => ({ ...w, [name]: w[name].slice(0, t) + (w[name][t] === "1" ? "0" : "1") + w[name].slice(t + 1) }));

  // Longest input→output path delay.
  const depth: Record<string, number> = {};
  for (const g of c.gates) depth[g.id] = delayOf(g) + Math.max(0, ...g.in.map((r) => depth[netOf(r).net] ?? 0));
  const changes = (arr: Bit[]) => arr.reduce((s: number, x, i) => s + (i > 0 && x !== arr[i - 1] ? 1 : 0), 0);
  const realAll = vals.map((v) => v[out]);
  const idealAll = ideal.map((v) => v[out]);
  const realOut = realAll.slice(0, N_T);
  const idealOut = idealAll.slice(0, N_T);
  const extra = changes(realAll) - changes(idealAll);
  const glitches = Math.max(0, Math.floor(extra / 2));

  const rows: { name: string; arr: Bit[]; kind: "in" | "net" | "out"; ideal?: Bit[] }[] = [
    ...c.inputs.map((i) => ({ name: i, arr: vals.slice(0, N_T).map((v) => v[i]), kind: "in" as const })),
    ...(internal ? c.gates.filter((g) => g.id !== out).map((g) => ({ name: g.id, arr: vals.slice(0, N_T).map((v) => v[g.id]), kind: "net" as const })) : []),
    { name: out, arr: realOut, kind: "out", ideal: idealOut },
  ];
  const U = 24;
  const RH = 30;
  const NW = 58;
  const W = NW + N_T * U + 16;
  const H = rows.length * RH + 22;
  const at = vals[cursor];
  return (
    <VizFrame
      title="Propagation delay and glitches"
      hint="Click any cell of an input waveform to flip it. Drag the time slider to see the wire values at that instant. One time unit = 10 ns."
      onReset={() => {
        setWaves(p.waves);
        setDNot(1);
        setDGate(1);
        setCursor(6);
      }}
      figure={
        <div style={{ display: "grid", gap: 8 }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Timing diagram">
            <rect x={NW + cursor * U} y={0} width={U} height={rows.length * RH} fill="var(--accent-soft)" />
            {Array.from({ length: N_T + 1 }, (_, t) => (
              <line key={t} x1={NW + t * U} y1={0} x2={NW + t * U} y2={rows.length * RH} stroke="var(--border)" strokeWidth={0.7} />
            ))}
            {rows.map((r, k) => {
              const y0 = k * RH;
              const yy = (x: Bit) => y0 + (x ? 6 : RH - 8);
              const pts: string[] = [];
              r.arr.forEach((x, t) => {
                if (t > 0 && x !== r.arr[t - 1]) pts.push(`${NW + t * U},${yy(r.arr[t - 1])}`);
                pts.push(`${NW + t * U},${yy(x)}`, `${NW + (t + 1) * U},${yy(x)}`);
              });
              const ipts: string[] = [];
              r.ideal?.forEach((x, t) => {
                if (t > 0 && x !== r.ideal![t - 1]) ipts.push(`${NW + t * U},${yy(r.ideal![t - 1])}`);
                ipts.push(`${NW + t * U},${yy(x)}`, `${NW + (t + 1) * U},${yy(x)}`);
              });
              return (
                <g key={r.name}>
                  {r.ideal &&
                    r.arr.map((x, t) => (x !== r.ideal![t] ? <rect key={t} x={NW + t * U} y={y0 + 2} width={U} height={RH - 6} fill="var(--warn)" opacity={0.22} /> : null))}
                  <text x={NW - 6} y={y0 + RH / 2 + 4} textAnchor="end" className="wave-name" fill={r.kind === "in" ? "var(--accent)" : "var(--text)"}>
                    {r.name}
                  </text>
                  {r.ideal && <polyline points={ipts.join(" ")} fill="none" stroke="var(--muted)" strokeDasharray="4 3" strokeWidth={1.2} />}
                  <polyline points={pts.join(" ")} fill="none" stroke={r.kind === "out" ? "var(--good)" : r.kind === "in" ? "var(--accent)" : "var(--text)"} strokeWidth={r.kind === "out" ? 2.4 : 1.7} />
                  {r.kind === "in" &&
                    r.arr.map((_, t) => (
                      <rect key={t} x={NW + t * U} y={y0} width={U} height={RH} fill="transparent" style={{ cursor: "pointer" }} onClick={() => flip(r.name, t)} />
                    ))}
                </g>
              );
            })}
            {Array.from({ length: N_T / 2 + 1 }, (_, k) => (
              <text key={k} x={NW + 2 * k * U} y={H - 6} textAnchor="middle" className="wave-tick">
                {20 * k}
              </text>
            ))}
          </svg>
          <CircuitSvg circuit={c} values={at} maxWidth={420} />
        </div>
      }
      controls={
        <>
          <Choice value={pi} onChange={choose} options={DELAY_PRESETS.map((q, i) => ({ v: i, label: q.name }))} />
          <Slider label="Inverter delay (ns)" value={dNot * 10} min={0} max={30} step={10} onChange={(x) => setDNot(x / 10)} format={(x) => `${x}`} />
          <Slider label="AND/OR/NAND delay (ns)" value={dGate * 10} min={0} max={30} step={10} onChange={(x) => setDGate(x / 10)} format={(x) => `${x}`} />
          <Slider label="Time cursor (ns)" value={cursor * 10} min={0} max={(N_T - 1) * 10} step={10} onChange={(x) => setCursor(x / 10)} format={(x) => `${x}`} />
          <Toggle label="Show internal signals" value={internal} onChange={setInternal} />
        </>
      }
      readout={
        <>
          <Read tex={p.note} />
          <Read label="Longest path" tex={`**${depth[out] * 10} ns** from an input change to ${out}`} />
          <Read label={`At t = ${cursor * 10} ns`} tex={`${c.inputs.map((i) => `${i} = ${at[i]}`).join(", ")} ⇒ ${out} = **${at[out]}** (ideal ${idealOut[cursor]})`} tone={at[out] !== idealOut[cursor] ? "warn" : undefined} />
          <Read
            label="Glitches"
            tex={glitches ? `**${glitches}** extra pulse${glitches > 1 ? "s" : ""}: the real ${out} changes ${changes(realAll)} times, the ideal ${changes(idealAll)} times` : `none: the real ${out} changes ${changes(realAll)} times, same as the ideal`}
            tone={glitches ? "bad" : "good"}
          />
          <Read tex="Dashed line = ideal (zero-delay) output; shaded cells = real output differs (late, or a glitch)." />
        </>
      }
      tasks={[
        "Predict: in the $Z = (A + BC)'$ preset, how long after B and C rise does Z fall? Check it against the longest-path line, then set every delay to 0 ns and watch the edges line up.",
        "Hazard preset: with the inverter delay at 10 ns, where is the glitch and how wide is it? Set the inverter delay to 20 ns and to 0 ns: what decides the glitch width?",
        "In the hazard preset, the glitch appears when A falls but not when A rises. Use the time cursor to explain why (look at AB and A'C at the moment of each edge).",
        "Pulse preset: Boolean algebra says $A\\cdot A' = 0$. Explain the pulse in hardware, and say how its width would change with a slower inverter.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Equivalence checker

const EQ_PRESETS: { l: string; r: string; label: string }[] = [
  { l: "A + AB", r: "A", label: "Absorption" },
  { l: "A + A'B", r: "A + B", label: "A + A'B" },
  { l: "AB + A'C + BC", r: "AB + A'C", label: "Consensus" },
  { l: "(A + B)(A + C)", r: "A + BC", label: "Distributive" },
  { l: "(AB)'", r: "A' + B'", label: "De Morgan" },
  { l: "(AB)'", r: "A'B'", label: "Mistake: (AB)'" },
  { l: "A + BC", r: "(A + B)C", label: "Mistake: A + BC" },
];

function EquivChecker() {
  const [l, setL] = useState(EQ_PRESETS[2].l);
  const [r, setR] = useState(EQ_PRESETS[2].r);
  const res = useMemo(() => {
    try {
      const el = parseExpr(l);
      const er = parseExpr(r);
      const vars = [...new Set([...exprVars(el), ...exprVars(er)])].sort();
      if (vars.length > 4) return { err: "Use at most 4 variables here." };
      if (!vars.length) return { err: "Use at least one variable." };
      const tl = truthTable(el, vars);
      const tr = truthTable(er, vars);
      const diff = tl.flatMap((x, k) => (x !== tr[k] ? [k] : []));
      return { vars, tl, tr, diff, minL: minimalSop(vars, minterms(el, vars)), minR: minimalSop(vars, minterms(er, vars)) };
    } catch (e) {
      return { err: (e as Error).message };
    }
  }, [l, r]);
  const choose = (i: number) => {
    setL(EQ_PRESETS[i].l);
    setR(EQ_PRESETS[i].r);
  };
  const preset = EQ_PRESETS.findIndex((p) => p.l === l && p.r === r);
  return (
    <VizFrame
      title="Is this identity true? Truth-table equivalence"
      hint="Type two expressions (A'B + C, (A + B)', ^ for XOR). Rows where they disagree turn red; one such row disproves an identity."
      onReset={() => choose(2)}
      figure={
        "err" in res ? (
          <div className="viz-svg" style={{ padding: 24, color: "var(--bad)" }}>
            {res.err}
          </div>
        ) : (
          <div className="viz-svg" style={{ padding: 10, overflowX: "auto" }}>
            <table className="sc5-table">
              <thead>
                <tr>
                  {res.vars.map((v) => (
                    <th key={v}>{v}</th>
                  ))}
                  <th>LHS</th>
                  <th>RHS</th>
                </tr>
              </thead>
              <tbody>
                {res.tl.map((x, m) => {
                  const env = rowEnv(res.vars, m);
                  const bad = x !== res.tr[m];
                  return (
                    <tr key={m} style={bad ? { background: "var(--bad-soft)", color: "var(--bad)", fontWeight: 700 } : undefined}>
                      {res.vars.map((v) => (
                        <td key={v}>{env[v]}</td>
                      ))}
                      <td>{x}</td>
                      <td>{res.tr[m]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      }
      controls={
        <>
          <div style={{ display: "grid", gap: 6 }}>
            <input className="answer-input" value={l} onChange={(e) => setL(e.target.value)} aria-label="Left-hand side" spellCheck={false} />
            <input className="answer-input" value={r} onChange={(e) => setR(e.target.value)} aria-label="Right-hand side" spellCheck={false} />
          </div>
          <Choice value={preset} onChange={choose} options={EQ_PRESETS.map((p, i) => ({ v: i, label: p.label }))} />
        </>
      }
      readout={
        "err" in res ? (
          <Read tex="Fix the expressions to compare them." tone="bad" />
        ) : (
          <>
            <Read
              label="Verdict"
              tex={res.diff.length === 0 ? "**Equal on every row: a valid identity**" : `**Not equal**: they differ on ${res.diff.length} row${res.diff.length > 1 ? "s" : ""}`}
              tone={res.diff.length === 0 ? "good" : "bad"}
            />
            {res.diff.length > 0 && (
              <Read
                label="Counterexample"
                tex={`${res.vars.map((v) => `${v} = ${rowEnv(res.vars, res.diff[0])[v]}`).join(", ")}: LHS = ${res.tl[res.diff[0]]}, RHS = ${res.tr[res.diff[0]]}`}
              />
            )}
            <Read label="Minimal SOP of LHS" tex={`**${res.minL}**`} />
            <Read label="Minimal SOP of RHS" tex={`**${res.minR}**`} />
          </>
        )
      }
      tasks={[
        "Predict: is $A + BC = (A + B)C$? Pick that preset and read the counterexample row. Then fix the right side so it becomes a true identity.",
        "Consensus: before checking, find the rows where $BC = 1$. Explain why each of them already makes $AB$ or $A'C$ equal to 1.",
        "Type the dual of $A + A'B = A + B$ (swap AND/OR, keep the primes) and confirm it is also an identity.",
        "Simplify $A'B'C + A'BC + AB'C + ABC$ by hand, then type your answer as the RHS to check it.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Alternate symbols and bubble pushing

const STD: Record<string, { std: GateSpec; alt: GateSpec; stdTex: string; altTex: string; stdRead: string; altRead: string }> = {
  AND: {
    std: { id: "X", type: "AND", in: ["A", "B"] },
    alt: { id: "X", type: "NOR", in: ["!A", "!B"] },
    stdTex: "X = AB",
    altTex: "X = (A' + B')'",
    stdRead: "X = 1 when A = 1 **and** B = 1",
    altRead: "X = 0 when A = 0 **or** B = 0",
  },
  OR: {
    std: { id: "X", type: "OR", in: ["A", "B"] },
    alt: { id: "X", type: "NAND", in: ["!A", "!B"] },
    stdTex: "X = A + B",
    altTex: "X = (A'B')'",
    stdRead: "X = 1 when A = 1 **or** B = 1",
    altRead: "X = 0 when A = 0 **and** B = 0",
  },
  NAND: {
    std: { id: "X", type: "NAND", in: ["A", "B"] },
    alt: { id: "X", type: "OR", in: ["!A", "!B"] },
    stdTex: "X = (AB)'",
    altTex: "X = A' + B'",
    stdRead: "X = 0 when A = 1 **and** B = 1",
    altRead: "X = 1 when A = 0 **or** B = 0",
  },
  NOR: {
    std: { id: "X", type: "NOR", in: ["A", "B"] },
    alt: { id: "X", type: "AND", in: ["!A", "!B"] },
    stdTex: "X = (A + B)'",
    altTex: "X = A'B'",
    stdRead: "X = 0 when A = 1 **or** B = 1",
    altRead: "X = 1 when A = 0 **and** B = 0",
  },
  NOT: {
    std: { id: "X", type: "NOT", in: ["A"] },
    alt: { id: "X", type: "BUF", in: ["!A"] },
    stdTex: "X = A'",
    altTex: "X = A' (bubble moved to the input)",
    stdRead: "X = 0 when A = 1",
    altRead: "X = 1 when A = 0",
  },
};

const NANDNAND: Record<string, CircuitSpec> = {
  std: {
    inputs: ["A", "B", "C", "D"],
    gates: [
      { id: "G1", type: "NAND", in: ["A", "B"] },
      { id: "G2", type: "NAND", in: ["C", "D"] },
      { id: "X", type: "NAND", in: ["G1", "G2"] },
    ],
    outputs: ["X"],
  },
  one: {
    inputs: ["A", "B", "C", "D"],
    gates: [
      { id: "G1", type: "NAND", in: ["A", "B"] },
      { id: "G2", type: "NAND", in: ["C", "D"] },
      { id: "X", type: "OR", in: ["!G1", "!G2"] },
    ],
    outputs: ["X"],
  },
  zero: {
    inputs: ["A", "B", "C", "D"],
    gates: [
      { id: "G1", type: "OR", in: ["!A", "!B"] },
      { id: "G2", type: "OR", in: ["!C", "!D"] },
      { id: "X", type: "NAND", in: ["G1", "G2"] },
    ],
    outputs: ["X"],
  },
};
const NN_READ: Record<string, string> = {
  std: "All standard symbols: the NAND output bubbles drive plain inputs, so the diagram does not read as one sentence.",
  one: "**X = 1** when G1 = 0 **or** G2 = 0, i.e. when (A = 1 and B = 1) **or** (C = 1 and D = 1): $X = AB + CD$.",
  zero: "**X = 0** when G1 = 1 **and** G2 = 1, i.e. when (A = 0 or B = 0) **and** (C = 0 or D = 0).",
};

/** Wires whose driver's output bubble does not match the bubble on the input it feeds. */
function mismatches(c: CircuitSpec): string[] {
  const bubbled = (id: string) => {
    const g = c.gates.find((x) => x.id === id);
    return !!g && BUBBLE_OUT.includes(g.type);
  };
  return c.gates.flatMap((g) =>
    g.in.flatMap((r) => {
      const { net, invert } = netOf(r);
      if (!c.gates.some((x) => x.id === net)) return [];
      return bubbled(net) !== invert ? [`${net} → ${g.id}`] : [];
    }),
  );
}

function BubblePushing() {
  const [mode, setMode] = useState<"gate" | "circuit">("gate");
  const [gate, setGate] = useState("NAND");
  const [view, setView] = useState("one");
  const { ins, toggle, reset } = useInputs(["A", "B", "C", "D"], { A: 1, B: 1 });
  const info = STD[gate];
  const single = gate === "NOT";
  const names = single ? ["A"] : ["A", "B"];
  const cs: CircuitSpec = { inputs: names, gates: [info.std], outputs: ["X"] };
  const ca: CircuitSpec = { inputs: names, gates: [info.alt], outputs: ["X"] };
  const vs = evalCircuit(cs, ins);
  const va = evalCircuit(ca, ins);
  const same = tableRows(cs, ["X"]).every((row, k) => row[row.length - 1] === tableRows(ca, ["X"])[k][row.length - 1]);
  const cc = NANDNAND[view];
  const vc = evalCircuit(cc, ins);
  const mm = mismatches(cc);
  const label = (t: string) => (
    <div className="small muted" style={{ textAlign: "center" }}>
      {t}
    </div>
  );
  return (
    <VizFrame
      title="Alternate symbols and bubble-to-bubble matching"
      hint="Click the input boxes. Both symbols always give the same output; only the way the diagram reads changes."
      onReset={reset}
      figure={
        mode === "gate" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              {label("Standard symbol")}
              <CircuitSvg circuit={cs} values={vs} onToggleInput={toggle} />
            </div>
            <div>
              {label("Alternate symbol")}
              <CircuitSvg circuit={ca} values={va} onToggleInput={toggle} />
            </div>
          </div>
        ) : (
          <CircuitSvg circuit={cc} values={vc} onToggleInput={toggle} highlight={mm.map((w) => w.split(" → ")[1])} />
        )
      }
      controls={
        <>
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "gate", label: "One gate" },
              { v: "circuit", label: "NAND–NAND circuit" },
            ]}
          />
          {mode === "gate" ? (
            <Choice value={gate} onChange={setGate} options={Object.keys(STD).map((g) => ({ v: g, label: g }))} />
          ) : (
            <Choice
              value={view}
              onChange={setView}
              options={[
                { v: "std", label: "All standard" },
                { v: "one", label: "Show when X = 1" },
                { v: "zero", label: "Show when X = 0" },
              ]}
            />
          )}
        </>
      }
      readout={
        mode === "gate" ? (
          <>
            <Read label="Standard" tex={`$${info.stdTex}$: ${info.stdRead}`} />
            <Read label="Alternate" tex={`$${info.altTex}$: ${info.altRead}`} />
            <Read label="Now" tex={`${names.map((n) => `${n} = ${ins[n]}`).join(", ")}: standard X = **${fmtV(vs.X)}**, alternate X = **${fmtV(va.X)}**`} tone={vs.X === va.X ? "good" : "bad"} />
            <Read tex={same ? "Same truth table on all rows ✓ (De Morgan)" : "Truth tables differ!"} tone={same ? "good" : "bad"} />
            <Read tex={'Recipe: toggle the bubble on **every** input and on the output, and swap the AND ↔ OR shape. Read a bubble as "0", no bubble as "1".'} />
          </>
        ) : (
          <>
            <Read tex={NN_READ[view]} />
            <Read label="X now" tex={`**${fmtV(vc.X)}**  (A B C D = ${ins.A}${ins.B}${ins.C}${ins.D})`} tone={vc.X === 1 ? "good" : undefined} />
            <Read
              label="Bubble matching"
              tex={mm.length ? `mismatched wire${mm.length > 1 ? "s" : ""}: ${mm.join(", ")} (highlighted gate)` : "every bubbled output drives a bubbled input ✓"}
              tone={mm.length ? "warn" : "good"}
            />
          </>
        )
      }
      tasks={[
        "Predict the alternate symbol of NOR before selecting it. How many bubbles does it have, and where?",
        "For NAND, set A = 1, B = 1 and read the standard symbol aloud (\"0 when both are 1\"). Now read the alternate for A = 0 (\"1 when A or B is 0\"). Same gate, two sentences.",
        "Switch to the NAND–NAND circuit. With \"All standard\", which wires are mismatched? Choose \"Show when X = 1\" and explain why the circuit now reads as $AB + CD$.",
        "Choose \"Show when X = 0\": which gates changed symbol, and why did the output gate get an output bubble?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 6. NAND-only / NOR-only builder

interface Build {
  name: string;
  target: string;
  circuit: CircuitSpec;
}
const nand = (id: string, a: string, bb: string): GateSpec => ({ id, type: "NAND", in: [a, bb] });
const nor = (id: string, a: string, bb: string): GateSpec => ({ id, type: "NOR", in: [a, bb] });
const AB = ["A", "B"];
const ABCD = ["A", "B", "C", "D"];
const BUILDS: Record<"NAND" | "NOR", Build[]> = {
  NAND: [
    { name: "NOT", target: "A'", circuit: { inputs: ["A"], gates: [nand("X", "A", "A")], outputs: ["X"] } },
    { name: "AND", target: "AB", circuit: { inputs: AB, gates: [nand("G1", "A", "B"), nand("X", "G1", "G1")], outputs: ["X"] } },
    { name: "OR", target: "A + B", circuit: { inputs: AB, gates: [nand("A'", "A", "A"), nand("B'", "B", "B"), nand("X", "A'", "B'")], outputs: ["X"] } },
    { name: "NOR", target: "(A + B)'", circuit: { inputs: AB, gates: [nand("A'", "A", "A"), nand("B'", "B", "B"), nand("G", "A'", "B'"), nand("X", "G", "G")], outputs: ["X"] } },
    { name: "XOR", target: "A ^ B", circuit: { inputs: AB, gates: [nand("G1", "A", "B"), nand("G2", "A", "G1"), nand("G3", "B", "G1"), nand("X", "G2", "G3")], outputs: ["X"] } },
    { name: "AB + CD", target: "AB + CD", circuit: { inputs: ABCD, gates: [nand("G1", "A", "B"), nand("G2", "C", "D"), nand("X", "G1", "G2")], outputs: ["X"] } },
    {
      name: "(A+B)(C+D)",
      target: "(A + B)(C + D)",
      circuit: {
        inputs: ABCD,
        gates: [nand("A'", "A", "A"), nand("B'", "B", "B"), nand("C'", "C", "C"), nand("D'", "D", "D"), nand("G1", "A'", "B'"), nand("G2", "C'", "D'"), nand("G3", "G1", "G2"), nand("X", "G3", "G3")],
        outputs: ["X"],
      },
    },
  ],
  NOR: [
    { name: "NOT", target: "A'", circuit: { inputs: ["A"], gates: [nor("X", "A", "A")], outputs: ["X"] } },
    { name: "OR", target: "A + B", circuit: { inputs: AB, gates: [nor("G1", "A", "B"), nor("X", "G1", "G1")], outputs: ["X"] } },
    { name: "AND", target: "AB", circuit: { inputs: AB, gates: [nor("A'", "A", "A"), nor("B'", "B", "B"), nor("X", "A'", "B'")], outputs: ["X"] } },
    { name: "NAND", target: "(AB)'", circuit: { inputs: AB, gates: [nor("A'", "A", "A"), nor("B'", "B", "B"), nor("G", "A'", "B'"), nor("X", "G", "G")], outputs: ["X"] } },
    { name: "XNOR", target: "(A ^ B)'", circuit: { inputs: AB, gates: [nor("G1", "A", "B"), nor("G2", "A", "G1"), nor("G3", "B", "G1"), nor("X", "G2", "G3")], outputs: ["X"] } },
    { name: "(A+B)(C+D)", target: "(A + B)(C + D)", circuit: { inputs: ABCD, gates: [nor("G1", "A", "B"), nor("G2", "C", "D"), nor("X", "G1", "G2")], outputs: ["X"] } },
    {
      name: "AB + CD",
      target: "AB + CD",
      circuit: {
        inputs: ABCD,
        gates: [nor("A'", "A", "A"), nor("B'", "B", "B"), nor("C'", "C", "C"), nor("D'", "D", "D"), nor("G1", "A'", "B'"), nor("G2", "C'", "D'"), nor("G3", "G1", "G2"), nor("X", "G3", "G3")],
        outputs: ["X"],
      },
    },
  ],
};

function NandNorBuilder() {
  const [fam, setFam] = useState<"NAND" | "NOR">("NAND");
  const [k, setK] = useState(2);
  const list = BUILDS[fam];
  const bld = list[Math.min(k, list.length - 1)];
  return (
    <NandNorInner
      key={`${fam}-${bld.name}`}
      bld={bld}
      controls={
        <>
          <Choice
            value={fam}
            onChange={(f) => {
              setFam(f);
              setK(0);
            }}
            options={[
              { v: "NAND", label: "NAND only" },
              { v: "NOR", label: "NOR only" },
            ]}
          />
          <Choice value={Math.min(k, list.length - 1)} onChange={setK} options={list.map((x, i) => ({ v: i, label: x.name }))} />
        </>
      }
      fam={fam}
    />
  );
}

function NandNorInner({ bld, controls, fam }: { bld: Build; controls: ReactNode; fam: string }) {
  const c = bld.circuit;
  const { ins, toggle, reset } = useInputs(c.inputs);
  const v = evalCircuit(c, ins);
  const te = parseExpr(bld.target, c.inputs);
  const tt = truthTable(te, c.inputs);
  const rows = tableRows(c, ["X"], (env) => [tt[rowOf(c.inputs, env as Record<string, Bit>)]]);
  const ok = rows.every((r) => String(r[r.length - 2]) === String(r[r.length - 1]));
  const tied = c.gates.filter((g) => g.in[0] === g.in[1]).length;
  return (
    <VizFrame
      title={`Building gates from ${fam} only`}
      hint="Pick a target. Click the inputs to trace values; a gate with both inputs tied together is an inverter."
      onReset={reset}
      figure={<CircuitSvg circuit={c} values={v} onToggleInput={toggle} />}
      controls={controls}
      readout={
        <>
          <Read label="Target" tex={`**X = ${bld.target.replace(/\^/g, "⊕")}**`} />
          <Read label="Gate count" tex={`**${c.gates.length}** two-input ${fam} gates (${tied} used as inverter${tied === 1 ? "" : "s"})`} />
          <Read label="Check" tex={ok ? "built X matches the target on every row ✓" : "mismatch!"} tone={ok ? "good" : "bad"} />
          {c.inputs.length <= 4 && <TableView head={[...c.inputs, "built X", "target"]} rows={rows} highlightRow={rowOf(c.inputs, ins)} />}
        </>
      }
      tasks={[
        "Predict: how many NANDs does an OR gate need? Check, then explain the circuit with De Morgan: $(A'B')' = A + B$.",
        "Compare $AB + CD$ in NAND (3 gates) and in NOR (8 gates). Why does the SOP form suit NAND and the POS form $(A + B)(C + D)$ suit NOR?",
        "In the NAND version of $(A + B)(C + D)$, find the two gates that only act as inverters at the output end. Could any pair of inverters in series be removed?",
        "Explain why the same 4-gate structure gives XOR when built from NANDs but XNOR when built from NORs (hint: duality).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 7. Parity generator / checker

function ParityTree() {
  const [data, setData] = useState<Bit[]>([1, 0, 1, 1]);
  const [odd, setOdd] = useState(false);
  const [flips, setFlips] = useState<Bit[]>([0, 0, 0, 0, 0]);
  const D = ["D3", "D2", "D1", "D0"];
  const gen: CircuitSpec = {
    inputs: D,
    gates: [
      { id: "G1", type: "XOR", in: ["D3", "D2"] },
      { id: "G2", type: "XOR", in: ["D1", "D0"] },
      { id: "P", type: odd ? "XNOR" : "XOR", in: ["G1", "G2"] },
    ],
    outputs: ["P"],
  };
  const gv = evalCircuit(gen, Object.fromEntries(D.map((d, i) => [d, data[i]])));
  const sent: Bit[] = [...data, b(gv.P)];
  const recv = sent.map((x, i) => (x ^ flips[i]) as Bit);
  const R = ["R3", "R2", "R1", "R0", "RP"];
  const chk: CircuitSpec = {
    inputs: R,
    gates: [
      { id: "H1", type: "XOR", in: ["R3", "R2"] },
      { id: "H2", type: "XOR", in: ["R1", "R0"] },
      { id: "H3", type: "XOR", in: ["H1", "H2"] },
      { id: "E", type: odd ? "XNOR" : "XOR", in: ["H3", "RP"] },
    ],
    outputs: ["E"],
  };
  const cv = evalCircuit(chk, Object.fromEntries(R.map((r, i) => [r, recv[i]])));
  const nFlip = flips.reduce((a: number, x) => a + x, 0);
  const onesSent = sent.reduce((a: number, x) => a + x, 0);
  const onesRecv = recv.reduce((a: number, x) => a + x, 0);
  const E = b(cv.E);
  const verdict = E ? (nFlip ? "error detected ✓" : "false alarm?") : nFlip === 0 ? "no error, none reported ✓" : `${nFlip} bits flipped but E = 0: **undetected error**`;
  return (
    <VizFrame
      title="Parity generator → channel → parity checker"
      hint="Set the data bits, then flip bits in the channel to inject errors. Both parity circuits are XOR trees."
      onReset={() => {
        setData([1, 0, 1, 1]);
        setFlips([0, 0, 0, 0, 0]);
        setOdd(false);
      }}
      figure={
        <div style={{ display: "grid", gap: 6 }}>
          <div className="small muted">Generator</div>
          <CircuitSvg circuit={gen} values={gv} maxWidth={360} />
          <div className="small muted">Checker (received bits)</div>
          <CircuitSvg circuit={chk} values={cv} maxWidth={420} />
        </div>
      }
      controls={
        <>
          <Choice
            value={odd ? "odd" : "even"}
            onChange={(x) => setOdd(x === "odd")}
            options={[
              { v: "even", label: "Even parity" },
              { v: "odd", label: "Odd parity" },
            ]}
          />
          <div className="small">Data D3 D2 D1 D0</div>
          <BitRow bits={data} onChange={setData} />
          <div className="small" style={{ marginTop: 14 }}>
            Channel: click to flip a bit in transit (D3 D2 D1 D0 P)
          </div>
          <div className="bitrow">
            {sent.map((x, i) => (
              <button
                key={i}
                className={`bit ${recv[i] ? "on" : ""}`}
                style={{ width: 30, height: 30, outline: flips[i] ? "2px solid var(--bad)" : undefined }}
                onClick={() => setFlips(flips.map((f, j) => (j === i ? ((1 - f) as Bit) : f)))}
                title={flips[i] ? `flipped (sent ${x})` : "not flipped"}
              >
                {recv[i]}
              </button>
            ))}
          </div>
        </>
      }
      readout={
        <>
          <Read label="P" tex={`${odd ? "odd" : "even"} parity: data has ${data.reduce((a: number, x) => a + x, 0)} ones ⇒ **P = ${gv.P}**, word sent ${sent.join("")} has ${onesSent} ones`} />
          <Read label="Received" tex={`${recv.join("")} has ${onesRecv} ones (${nFlip} bit${nFlip === 1 ? "" : "s"} flipped)`} />
          <Read label="Checker" tex={`**E = ${E}**: ${verdict}`} tone={E ? "bad" : nFlip ? "warn" : "good"} />
        </>
      }
      tasks={[
        "Predict P for data 1011 with even parity, then check. Switch to odd parity: what single change did the generator need?",
        "Flip any one bit in the channel (including P itself). Does the checker always catch it?",
        "Flip two bits. Why is the error missed? How many flipped bits does parity always detect?",
        "Explain why the checker is the generator's XOR tree with one more input: what does XOR-ing all five received bits measure?",
      ]}
    />
  );
}
