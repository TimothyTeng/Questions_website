"use client";

// Building blocks for SC1005 interactive figures. Topic modules (./topics/*.tsx) compose these with the
// shared VizFrame (title, hint, figure, readout, "Try this" tasks) from components/viz/Frame.

import { useMemo, useState, type ReactNode } from "react";
import { Choice, Read, Slider, Toggle, VizFrame } from "@/components/viz/Frame";
import { clockEdge, evalCircuit, hasFeedback, isSequential, minimalCover, productString, rowEnv, sumString, type Bit, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";
import { CircuitSvg, valColor } from "../figures/Circuit";
import { FsmSvg } from "../figures/Fsm";
import { KMapSvg, LOOP_COLORS } from "../figures/KMap";
import { TableView } from "../figures/Figure";
import { WaveSvg } from "../figures/Wave";
import { TxtInline } from "../Text";

export { Choice, Read, Slider, Toggle, VizFrame, CircuitSvg, FsmSvg, KMapSvg, TableView, WaveSvg, TxtInline, valColor };

/** A row of clickable bits (MSB first), e.g. for entering a binary number. */
export function BitRow({ bits, onChange, labels, size = 30 }: { bits: Bit[]; onChange?: (b: Bit[]) => void; labels?: string[]; size?: number }) {
  return (
    <div className="bitrow">
      {bits.map((b, i) => (
        <button
          key={i}
          className={`bit ${b ? "on" : ""}`}
          style={{ width: size, height: size }}
          disabled={!onChange}
          onClick={() => onChange?.(bits.map((x, j) => (j === i ? ((1 - x) as Bit) : x)))}
          title={labels?.[i]}
        >
          {b}
          {labels && <span className="bit-label">{labels[i]}</span>}
        </button>
      ))}
    </div>
  );
}

export const bitsOf = (x: number, n: number): Bit[] => Array.from({ length: n }, (_, i) => ((x >> (n - 1 - i)) & 1) as Bit);
export const valueOf = (bits: Bit[]) => bits.reduce((a: number, b) => a * 2 + b, 0);

/**
 * A live circuit: click inputs to toggle them; flip-flops advance on the Clock button. Wires are coloured by
 * value. Shows a truth table (combinational circuits with ≤ 4 inputs) with the current row highlighted.
 */
export function CircuitSim({
  circuit,
  title,
  hint = "Click an input's box to toggle it. Green wires carry 1, grey wires carry 0.",
  initial = {},
  tasks,
  readout,
  showTable = true,
  clockInput,
  initialNets = {},
  initialState = {},
}: {
  circuit: CircuitSpec;
  title: string;
  hint?: string;
  initial?: Record<string, Bit>;
  tasks?: string[];
  /** Extra readout lines given the current net values. */
  readout?: (v: Record<string, Val>) => ReactNode;
  showTable?: boolean;
  /** Name of the clock input, if any: it is not toggled by clicking; the Clock button applies an edge. */
  clockInput?: string;
  /** Starting net values, e.g. { Q: 0, Qn: 1 } so a cross-coupled latch starts in a known state. */
  initialNets?: Record<string, Val>;
  /** Starting flip-flop contents. */
  initialState?: Record<string, Bit>;
}) {
  const seq = circuit.gates.some(isSequential) || hasFeedback(circuit);
  const [ins, setIns] = useState<Record<string, Bit>>(() => Object.fromEntries(circuit.inputs.map((i) => [i, initial[i] ?? 0])));
  const [state, setState] = useState<Record<string, Bit>>(initialState);
  const [prev, setPrev] = useState<Record<string, Val>>(initialNets);
  const [cycles, setCycles] = useState(0);
  const values = useMemo(() => evalCircuit(circuit, ins, state, prev), [circuit, ins, state, prev]);
  const toggle = (name: string) => {
    if (name === clockInput) return;
    const next = { ...ins, [name]: (1 - ins[name]) as Bit };
    setPrev(values);
    setIns(next);
  };
  const clock = () => {
    setPrev(values);
    setState(clockEdge(circuit, values, state));
    setCycles((c) => c + 1);
  };
  const reset = () => {
    setIns(Object.fromEntries(circuit.inputs.map((i) => [i, initial[i] ?? 0])));
    setState(initialState);
    setPrev(initialNets);
    setCycles(0);
  };
  const outs = circuit.outputs ?? [];
  const dataIns = circuit.inputs.filter((i) => i !== clockInput);
  const table = showTable && !seq && dataIns.length <= 4 && outs.length > 0;
  const rows = table
    ? Array.from({ length: 1 << dataIns.length }, (_, m) => {
        const env = rowEnv(dataIns, m);
        const v = evalCircuit(circuit, env);
        return [...dataIns.map((i) => env[i]), ...outs.map((o) => (v[o] === null ? "?" : String(v[o])))];
      })
    : [];
  const cur = dataIns.reduce((a, i) => a * 2 + ins[i], 0);
  return (
    <VizFrame
      title={title}
      hint={hint}
      onReset={reset}
      figure={<CircuitSvg circuit={circuit} values={values} onToggleInput={toggle} />}
      controls={
        circuit.gates.some(isSequential) ? (
          <div className="row">
            <button className="btn primary small" onClick={clock}>
              ⏵ Clock edge
            </button>
            <span className="small muted">{cycles} edge{cycles === 1 ? "" : "s"}</span>
          </div>
        ) : undefined
      }
      readout={
        <>
          {outs.map((o) => (
            <Read key={o} label={o} tex={`**${values[o] === null ? "unknown" : values[o] === "z" ? "z (high impedance)" : values[o]}**`} tone={values[o] === 1 ? "good" : undefined} />
          ))}
          {readout?.(values)}
          {table && <TableView head={[...dataIns, ...outs]} rows={rows} highlightRow={cur} />}
        </>
      }
      tasks={tasks}
    />
  );
}

/** Cycles 0 → 1 → X → 0 on click. Returns minimal SOP or POS and draws its loops. */
export function KMapEditor({
  vars,
  initial,
  title = "K-map minimiser",
  tasks,
  allowPos = true,
}: {
  vars: string[];
  /** One char per minterm: 0, 1 or x. */
  initial: string;
  title?: string;
  tasks?: string[];
  allowPos?: boolean;
}) {
  const [vals, setVals] = useState(initial);
  const [mode, setMode] = useState<"sop" | "pos">("sop");
  const n = vars.length;
  const ones = [...vals].flatMap((c, m) => (c === "1" ? [m] : []));
  const dcs = [...vals].flatMap((c, m) => (c === "x" ? [m] : []));
  const zeros = [...vals].flatMap((c, m) => (c === "0" ? [m] : []));
  const cover = mode === "sop" ? minimalCover(n, ones, dcs) : minimalCover(n, zeros, dcs);
  const terms = cover.map((p) => (mode === "sop" ? productString(p, vars) : sumString(p, vars)));
  const full = (1 << n) - 1;
  const expr =
    mode === "sop"
      ? ones.length === 0
        ? "0"
        : cover.some((p) => p.mask === full)
          ? "1"
          : terms.join(" + ")
      : zeros.length === 0
        ? "1"
        : cover.some((p) => p.mask === full)
          ? "0"
          : terms.join("");
  const click = (m: number) => setVals((v) => v.slice(0, m) + (v[m] === "0" ? "1" : v[m] === "1" ? "x" : "0") + v.slice(m + 1));
  return (
    <VizFrame
      title={title}
      hint="Click a cell to cycle 0 → 1 → X (don't care). The loops show a minimum cover."
      onReset={() => setVals(initial)}
      figure={<KMapSvg vars={vars} values={vals} groups={cover.map((p) => (mode === "sop" ? productString(p, vars) : sumString(p, vars)))} showIndex onCellClick={click} />}
      controls={
        allowPos ? (
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "sop", label: "Group the 1s (SOP)" },
              { v: "pos", label: "Group the 0s (POS)" },
            ]}
          />
        ) : undefined
      }
      readout={
        <>
          <Read label="F =" tex={`$\\sum m(${ones.join(",") || "\\,"})${dcs.length ? ` + d(${dcs.join(",")})` : ""}$`} />
          <Read label={mode === "sop" ? "Minimal SOP" : "Minimal POS"} tex={`**${expr}**`} tone="good" />
          {terms.map((t, i) => (
            <div key={i} className="small" style={{ color: LOOP_COLORS[i % LOOP_COLORS.length] }}>
              ● {t}
            </div>
          ))}
        </>
      }
      tasks={tasks}
    />
  );
}

/** Steps through a sequence of frames with Prev / Next / Play controls. */
export function useStepper(count: number) {
  const [i, setI] = useState(0);
  const controls = (
    <div className="row" style={{ gap: 6 }}>
      <button className="btn small" disabled={i === 0} onClick={() => setI(0)}>
        ⏮
      </button>
      <button className="btn small" disabled={i === 0} onClick={() => setI(i - 1)}>
        ◀ Prev
      </button>
      <button className="btn small primary" disabled={i >= count - 1} onClick={() => setI(i + 1)}>
        Next ▶
      </button>
      <span className="small muted">
        step {i + 1} / {count}
      </span>
    </div>
  );
  return { i, setI, controls };
}
