"use client";

import { useMemo, useState } from "react";
import { cmosLayout, conducts, dualNet, netExpr, type CmosNet } from "@/data/sc1005/lessons/ic-tech";
import { minimalSop, rowEnv, type Bit } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";
import { BitRow, bitsOf, Choice, CircuitSim, Read, Slider, TableView, Toggle, VizFrame } from "../kit";

// Interactive figures for the ic-tech lesson, chosen by id (see LessonSection.visuals).
export default function IcTechVisual({ id }: { id: string }) {
  switch (id) {
    case "cmos-switch":
      return <CmosSwitch />;
    case "bubble-match":
      return <BubbleMatch />;
    case "noise-margin":
      return <NoiseMargin />;
    case "tristate-bus":
      return <BusDrivers />;
    case "schmitt":
      return <SchmittDemo />;
    case "pla-grid":
      return <PlaGrid />;
    default:
      return null;
  }
}

const fmt = (x: number, d = 2) => Number(x.toFixed(d)).toString();

// ---------------------------------------------------------------------------------------------
// CMOS transistor-level view

const CMOS_PRESETS: { label: string; pun?: CmosNet; pdn: CmosNet; note: string }[] = [
  { label: "Inverter", pdn: "A", note: "F = A'" },
  { label: "NAND", pdn: { s: ["A", "B"] }, note: "F = (AB)'" },
  { label: "NOR", pdn: { p: ["A", "B"] }, note: "F = (A + B)'" },
  { label: "(A + BC)'", pdn: { p: ["A", { s: ["B", "C"] }] }, note: "F = (A + BC)'" },
  { label: "PYP 2018-19 circuit", pdn: { s: ["D", { p: ["A", { s: ["B", "C"] }] }] }, note: "F = (D(A + BC))'" },
];

const netInputs = (n: CmosNet, out = new Set<string>()): Set<string> => {
  if (typeof n === "string") out.add(n);
  else ("s" in n ? n.s : n.p).forEach((c) => netInputs(c, out));
  return out;
};

/** Conduction condition of a PMOS network (literals complemented). */
function pmosExpr(n: CmosNet): string {
  if (typeof n === "string") return `${n}'`;
  if ("s" in n) return n.s.map((x) => (typeof x !== "string" && "p" in x ? `(${pmosExpr(x)})` : pmosExpr(x))).join("");
  return n.p.map(pmosExpr).join(" + ");
}

type OutState = 0 | 1 | "short" | "float";
const outOf = (up: boolean, down: boolean): OutState => (up && down ? "short" : up ? 1 : down ? 0 : "float");
const outColor = (o: OutState) => (o === 1 ? "var(--good)" : o === 0 ? "var(--accent)" : o === "short" ? "var(--bad)" : "var(--warn)");

function CmosSwitch() {
  const [pi, setPi] = useState(1);
  const preset = CMOS_PRESETS[pi];
  const pdn = preset.pdn;
  const pun = preset.pun ?? dualNet(pdn);
  const inputs = useMemo(() => [...new Set([...netInputs(pun), ...netInputs(pdn)])].sort(), [pun, pdn]);
  const [vals, setVals] = useState<Record<string, Bit>>({});
  const env: Record<string, number> = Object.fromEntries(inputs.map((i) => [i, vals[i] ?? 0]));
  const L = cmosLayout(pun, pdn, { out: "F", numbered: true, env });
  const o = outOf(!!L.up, !!L.down);
  const pathCol = (part: string) => (part === "up" ? "var(--good)" : "var(--accent)");
  const rows = Array.from({ length: 1 << inputs.length }, (_, m) => {
    const e = rowEnv(inputs, m) as Record<string, number>;
    const u = conducts(pun, e, true);
    const d = conducts(pdn, e, false);
    const r = outOf(u, d);
    return [...inputs.map((i) => e[i]), u ? "on" : "off", d ? "on" : "off", r === "short" ? "SHORT" : r === "float" ? "float" : r];
  });
  const cur = inputs.reduce((a, i) => a * 2 + (env[i] ?? 0), 0);
  const fault = rows.filter((r) => r[r.length - 1] === "SHORT" || r[r.length - 1] === "float").length;
  return (
    <VizFrame
      title="CMOS gates at transistor level"
      hint="Toggle the inputs. Conducting transistors are drawn solid; green paths connect F to VDD (1), blue paths connect F to GND (0)."
      onReset={() => setVals({})}
      figure={
        <svg viewBox={`0 0 ${L.w} ${L.h}`} className="viz-svg" style={{ maxWidth: L.w * 1.5, margin: "0 auto" }} role="img" aria-label="CMOS transistor circuit">
          {L.prims.map((p, k) => {
            if (p.t === "text") {
              const fill = p.input ? (env[p.input] ? "var(--good)" : "var(--muted)") : p.part === "out" ? outColor(o) : "var(--text)";
              const s = p.part === "out" ? `F=${o === "short" ? "?" : o === "float" ? "Z" : o}` : p.input ? `${p.s}=${env[p.input]}` : p.s;
              return (
                <text key={k} x={p.x} y={p.y} textAnchor={p.anchor} fontSize={p.size} fontWeight={p.bold ? 700 : 400} fill={fill} fontFamily="monospace">
                  {s}
                </text>
              );
            }
            if (p.t === "circle") {
              const col = p.input ? (env[p.input] ? "var(--good)" : "var(--muted)") : p.part === "out" ? outColor(o) : "var(--text)";
              return <circle key={k} cx={p.cx} cy={p.cy} r={p.r} stroke={col} strokeWidth={1.6} fill={p.fill ? col : "var(--surface-2)"} />;
            }
            let col = "var(--muted)";
            let w = 1.6;
            let dash: string | undefined;
            let op = 1;
            if (p.input) col = env[p.input] ? "var(--good)" : "var(--muted)";
            else if (p.part === "out") {
              col = outColor(o);
              w = 2.6;
            } else if (p.on !== undefined) {
              col = p.on ? (p.hot ? pathCol(p.part) : "var(--text)") : "var(--muted)";
              dash = p.on ? undefined : "3 3";
              op = p.on ? 1 : 0.55;
              w = 3.2;
            } else if (p.hot) {
              col = p.part === "supply" ? (p.y1! < 40 ? "var(--good)" : "var(--accent)") : pathCol(p.part);
              w = 2.6;
            } else if (p.part === "supply") col = "var(--text)";
            return <line key={k} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={col} strokeWidth={w} strokeDasharray={dash} opacity={op} strokeLinecap="round" />;
          })}
        </svg>
      }
      controls={
        <>
          <Choice
            value={pi}
            onChange={(v) => {
              setPi(v);
              setVals({});
            }}
            options={CMOS_PRESETS.map((p, i) => ({ v: i, label: p.label }))}
          />
          <BitRow bits={inputs.map((i) => (env[i] ?? 0) as Bit)} labels={inputs} onChange={(b) => setVals(Object.fromEntries(inputs.map((i, k) => [i, b[k]])))} />
        </>
      }
      readout={
        <>
          <Read label="Pull-up (PMOS, on for 0) conducts when" tex={`$${pmosExpr(pun)}$: **${L.up ? "yes" : "no"}**`} tone={L.up ? "good" : undefined} />
          <Read label="Pull-down (NMOS, on for 1) conducts when" tex={`$${netExpr(pdn)}$: **${L.down ? "yes" : "no"}**`} />
          <Read
            label="Output"
            tex={o === "short" ? "**VDD shorted to GND!** Both networks conduct." : o === "float" ? "**floating**: neither network conducts." : `**F = ${o}** (${o ? "connected to VDD" : "connected to GND"})`}
            tone={o === "short" ? "bad" : o === "float" ? "warn" : "good"}
          />
          <Read label="Function" tex={preset.pun ? `faulty design: ${fault} input row${fault === 1 ? "" : "s"} float or short` : `$F = (${netExpr(pdn)})'$`} tone={preset.pun ? "bad" : undefined} />
          <TableView head={[...inputs, "PMOS net", "NMOS net", "F"]} rows={rows} highlightRow={cur} />
        </>
      }
      tasks={[
        "Predict: in the **NAND** preset, which inputs let the series NMOS chain reach GND? Toggle A and B to check that only $A = B = 1$ gives $F = 0$.",
        "Pick **(A + BC)'**. Find every input that makes F = 0 and say which NMOS path (Q4 alone, or Q5–Q6 in series) carries it.",
        "In the **PYP 2018-19 circuit**, read the rows with F = 0 off the table and write $Z = \\Pi M(\\ldots)$. Check it against $(D(A + BC))'$.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Bubble-to-bubble

const BUBBLE: CircuitSpec = {
  inputs: ["A", "B", "C", "D"],
  gates: [
    { id: "G1", type: "NAND", in: ["A", "B"] },
    { id: "G2", type: "NAND", in: ["C", "!D"] },
    { id: "X", type: "OR", in: ["!G1", "!G2"] },
  ],
  outputs: ["X"],
  showNets: true,
};

function BubbleMatch() {
  return (
    <CircuitSim
      circuit={BUBBLE}
      title="Matched bubbles read straight off the diagram"
      hint="Click an input box to toggle it. Each NAND output bubble meets an input bubble on the OR gate, so they cancel."
      readout={(v) => {
        const t1 = v.A === 1 && v.B === 1;
        const t2 = v.C === 1 && v.D === 0;
        return (
          <>
            <Read label="Bubbles cancel ⇒" tex="$X = AB + CD'$" />
            <Read label="Term AB" tex={`**${t1 ? "asserted" : "not asserted"}** (G1 = ${v.G1})`} tone={t1 ? "good" : undefined} />
            <Read label="Term CD'" tex={`**${t2 ? "asserted" : "not asserted"}** (G2 = ${v.G2})`} tone={t2 ? "good" : undefined} />
          </>
        );
      }}
      tasks={[
        "Predict: G1's output is active low (bubble). What does G1 = 0 mean? Set A = B = 1 and watch X.",
        "G2 has a bubble on its D input. Which value of D asserts that input? Find all inputs with C = 1 that make X = 1.",
        "Explain with De Morgan why an OR with two bubbled inputs is a NAND, so $X = (G1 \\cdot G2)' = AB + CD'$.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Noise margins

const FAMILIES: Record<string, { voh: number; vol: number; vih: number; vil: number }> = {
  "5-V LSTTL": { voh: 2.7, vol: 0.5, vih: 2.0, vil: 0.8 },
  "5-V CMOS": { voh: 4.44, vol: 0.5, vih: 3.5, vil: 1.5 },
  "3.3-V LVTTL": { voh: 2.4, vol: 0.4, vih: 2.0, vil: 0.8 },
};
const FAM_NAMES = Object.keys(FAMILIES);

function NoiseMargin() {
  const [drv, setDrv] = useState("5-V LSTTL");
  const [rcv, setRcv] = useState("5-V LSTTL");
  const [voh, setVoh] = useState(FAMILIES["5-V LSTTL"].voh);
  const [vol, setVol] = useState(FAMILIES["5-V LSTTL"].vol);
  const [vih, setVih] = useState(FAMILIES["5-V LSTTL"].vih);
  const [vil, setVil] = useState(FAMILIES["5-V LSTTL"].vil);
  const [noise, setNoise] = useState(0.3);
  const pickD = (f: string) => {
    setDrv(f);
    setVoh(FAMILIES[f].voh);
    setVol(FAMILIES[f].vol);
  };
  const pickR = (f: string) => {
    setRcv(f);
    setVih(FAMILIES[f].vih);
    setVil(FAMILIES[f].vil);
  };
  const nh = voh - vih;
  const nl = vil - vol;
  const y = (v: number) => 236 - v * 42;
  const hiSeen = voh - noise;
  const loSeen = vol + noise;
  const hiOk = hiSeen >= vih;
  const loOk = loSeen <= vil;
  const zone = (x: number, v0: number, v1: number, fill: string, label: string) => (
    <g>
      <rect x={x} y={y(v1)} width={80} height={Math.max(0, y(v0) - y(v1))} fill={fill} stroke="var(--border)" />
      {y(v0) - y(v1) > 16 && (
        <text x={x + 40} y={(y(v0) + y(v1)) / 2 + 4} textAnchor="middle" fontSize={10} fill="var(--text)">
          {label}
        </text>
      )}
    </g>
  );
  const bracket = (x: number, a: number, b: number, ok: boolean, label: string) => (
    <g>
      <line x1={x} x2={x} y1={y(a)} y2={y(b)} stroke={ok ? "var(--good)" : "var(--bad)"} strokeWidth={5} opacity={0.8} />
      <text x={x + 7} y={(y(a) + y(b)) / 2 + 4} fontSize={10} fontWeight={700} fill={ok ? "var(--good)" : "var(--bad)"}>
        {label}
      </text>
    </g>
  );
  return (
    <VizFrame
      title="Noise margins: what the output promises vs what the input needs"
      hint="Pick driver and receiver families, or drag the sliders. The bars between the columns are the noise margins."
      onReset={() => {
        pickD("5-V LSTTL");
        pickR("5-V LSTTL");
        setNoise(0.3);
      }}
      figure={
        <svg viewBox="0 0 360 260" className="viz-svg" role="img" aria-label="Noise margin diagram">
          <text x={90} y={14} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text)">
            Driver output ({drv})
          </text>
          <text x={270} y={14} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text)">
            Receiver input ({rcv})
          </text>
          {zone(50, voh, 5, "var(--good-soft)", "guaranteed 1")}
          {zone(50, vol, voh, "var(--surface)", "never output")}
          {zone(50, 0, vol, "var(--accent-soft)", "guaranteed 0")}
          {zone(230, vih, 5, "var(--good-soft)", "read as 1")}
          {zone(230, vil, vih, "var(--warn-soft)", "indeterminate")}
          {zone(230, 0, vil, "var(--accent-soft)", "read as 0")}
          {[0, 1, 2, 3, 4, 5].map((v) => (
            <text key={v} x={44} y={y(v) + 4} textAnchor="end" fontSize={9} fill="var(--muted)">
              {v} V
            </text>
          ))}
          {[
            [voh, "VOH"],
            [vol, "VOL"],
          ].map(([v, l]) => (
            <g key={l as string}>
              <line x1={130} x2={230} y1={y(v as number)} y2={y(v as number)} stroke="var(--muted)" strokeDasharray="4 3" />
              <text x={226} y={y(v as number) - 3} textAnchor="end" fontSize={9} fill="var(--muted)">
                {l} {fmt(v as number)}
              </text>
            </g>
          ))}
          {[
            [vih, "VIH"],
            [vil, "VIL"],
          ].map(([v, l]) => (
            <text key={l as string} x={314} y={y(v as number) + 4} fontSize={9} fill="var(--muted)">
              {l} {fmt(v as number)}
            </text>
          ))}
          {bracket(140, vih, voh, nh >= 0, `NH = ${fmt(nh)} V`)}
          {bracket(140, vol, vil, nl >= 0, `NL = ${fmt(nl)} V`)}
          <circle cx={270} cy={y(hiSeen)} r={5} fill={hiOk ? "var(--good)" : "var(--bad)"} />
          <circle cx={290} cy={y(loSeen)} r={5} fill={loOk ? "var(--accent)" : "var(--bad)"} />
          <line x1={0} x2={360} y1={y(0)} y2={y(0)} stroke="var(--border)" />
        </svg>
      }
      controls={
        <>
          <div className="small muted">Driver</div>
          <Choice value={drv} onChange={pickD} options={FAM_NAMES.map((f) => ({ v: f, label: f }))} />
          <div className="small muted">Receiver</div>
          <Choice value={rcv} onChange={pickR} options={FAM_NAMES.map((f) => ({ v: f, label: f }))} />
          <Slider label="$V_{OH(min)}$" value={voh} min={2} max={5} step={0.05} onChange={setVoh} format={(v) => `${fmt(v)} V`} />
          <Slider label="$V_{OL(max)}$" value={vol} min={0} max={1.5} step={0.05} onChange={setVol} format={(v) => `${fmt(v)} V`} />
          <Slider label="$V_{IH(min)}$" value={vih} min={1} max={4.5} step={0.05} onChange={setVih} format={(v) => `${fmt(v)} V`} />
          <Slider label="$V_{IL(max)}$" value={vil} min={0.2} max={2.5} step={0.05} onChange={setVil} format={(v) => `${fmt(v)} V`} />
          <Slider label="Noise on the wire" value={noise} min={0} max={2} step={0.05} onChange={setNoise} format={(v) => `${fmt(v)} V`} />
        </>
      }
      readout={
        <>
          <Read tex={`$V_{NH} = V_{OH} - V_{IH} = ${fmt(voh)} - ${fmt(vih)} = ${fmt(nh)}$ V`} tone={nh >= 0 ? "good" : "bad"} />
          <Read tex={`$V_{NL} = V_{IL} - V_{OL} = ${fmt(vil)} - ${fmt(vol)} = ${fmt(nl)}$ V`} tone={nl >= 0 ? "good" : "bad"} />
          <Read
            label="Verdict"
            tex={nh < 0 || nl < 0 ? `**Not compatible**: a guaranteed ${nh < 0 ? "high" : "low"} output can land in the indeterminate band.` : `Compatible; tolerates **${fmt(Math.min(nh, nl))} V** of noise in either state.`}
            tone={nh < 0 || nl < 0 ? "bad" : "good"}
          />
          <Read label="Dots" tex={`worst-case 1 with ${fmt(noise)} V of noise arrives at ${fmt(hiSeen)} V: **${hiOk ? "read as 1" : "error"}**; worst-case 0 arrives at ${fmt(loSeen)} V: **${loOk ? "read as 0" : "error"}**`} tone={hiOk && loOk ? undefined : "bad"} />
        </>
      }
      tasks={[
        "Predict: can a 5-V LSTTL output drive a 5-V CMOS input (lecture typical values)? Choose them and read the verdict. Which margin fails? Which CMOS series in the lecture is electrically compatible with TTL?",
        "With 5-V LSTTL → 5-V LSTTL, raise the noise slider until a dot turns red. Compare the noise value with $\\min(V_{NH}, V_{NL})$.",
        "Drag $V_{OH(min)}$ down: which noise margin shrinks? Which parameters never appear in $V_{NL}$?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Tri-state bus and open-drain wired-AND

function BusDrivers() {
  const [mode, setMode] = useState<"tri" | "od">("tri");
  const [d, setD] = useState<Bit[]>([1, 0, 1]);
  const [e, setE] = useState<Bit[]>([1, 0, 0]);
  const [pull, setPull] = useState(true);
  const tri = mode === "tri";
  const names = tri ? ["D1 (buffer)", "D2 (inverter)", "D3 (buffer)"] : ["U", "V", "W"];
  // Tri-state: driven value per driver, or null when disabled.
  const drive: (Bit | null)[] = tri ? d.map((x, i) => (e[i] ? ((i === 1 ? 1 - x : x) as Bit) : null)) : d.map((x) => (x === 0 ? 0 : null));
  const active = drive.filter((x): x is Bit => x !== null);
  let bus: "0" | "1" | "Z" | "X";
  if (tri) bus = active.length === 0 ? "Z" : active.every((x) => x === active[0]) ? (String(active[0]) as "0" | "1") : "X";
  else bus = active.length ? "0" : pull ? "1" : "Z";
  const busCol = bus === "1" ? "var(--good)" : bus === "0" ? "var(--accent)" : bus === "X" ? "var(--bad)" : "var(--warn)";
  const col = (v: Bit | null) => (v === null ? "var(--muted)" : v ? "var(--good)" : "var(--accent)");
  const ys = [50, 120, 190];
  const toggle = (arr: Bit[], set: (b: Bit[]) => void, i: number) => set(arr.map((x, j) => (j === i ? ((1 - x) as Bit) : x)));
  return (
    <VizFrame
      title={tri ? "Tri-state drivers sharing a bus" : "Open-drain outputs: wired-AND"}
      hint={tri ? "Click the data (D) and enable (EN) boxes. At most one driver should be enabled at a time." : "Click the input boxes. Each open-drain output can only pull the line low; the resistor pulls it high."}
      onReset={() => {
        setD([1, 0, 1]);
        setE([1, 0, 0]);
        setPull(true);
      }}
      figure={
        <svg viewBox="0 0 360 240" className="viz-svg" role="img" aria-label="Bus drivers">
          {!tri && pull && (
            <g>
              <text x={270} y={12} textAnchor="middle" fontSize={10} fill="var(--text)">
                VDD
              </text>
              <polyline points="270,16 270,22 262,26 278,32 262,38 278,44 270,48 270,56" fill="none" stroke="var(--good)" strokeWidth={1.8} />
            </g>
          )}
          <line x1={270} x2={270} y1={tri ? 40 : 56} y2={200} stroke={busCol} strokeWidth={4} strokeDasharray={bus === "Z" ? "6 4" : undefined} />
          <line x1={270} x2={320} y1={120} y2={120} stroke={busCol} strokeWidth={4} strokeDasharray={bus === "Z" ? "6 4" : undefined} />
          <text x={326} y={116} fontSize={13} fontWeight={700} fill={busCol}>
            {tri ? "F" : "Z"}
          </text>
          <text x={326} y={134} fontSize={13} fontWeight={700} fill={busCol}>
            {bus === "X" ? "!!" : bus}
          </text>
          {ys.map((y0, i) => {
            const v = drive[i];
            return (
              <g key={i}>
                <g onClick={() => toggle(d, setD, i)} style={{ cursor: "pointer" }}>
                  <rect x={10} y={y0 - 12} width={38} height={24} rx={5} fill={d[i] ? "var(--good-soft)" : "var(--surface)"} stroke="var(--border)" />
                  <text x={29} y={y0 + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--text)">
                    {tri ? `D${i + 1}` : names[i]}={d[i]}
                  </text>
                </g>
                <line x1={48} x2={110} y1={y0} y2={y0} stroke={d[i] ? "var(--good)" : "var(--muted)"} strokeWidth={2} />
                <polygon points={`110,${y0 - 20} 110,${y0 + 20} 150,${y0}`} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.6} />
                {tri && i === 1 && <circle cx={155} cy={y0} r={5} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.6} />}
                {!tri && (
                  <text x={124} y={y0 + 4} textAnchor="middle" fontSize={8} fill="var(--muted)">
                    OD
                  </text>
                )}
                <line x1={tri && i === 1 ? 160 : 150} x2={270} y1={y0} y2={y0} stroke={col(v)} strokeWidth={2.4} strokeDasharray={v === null ? "5 4" : undefined} />
                <text x={210} y={y0 - 6} textAnchor="middle" fontSize={10} fill={col(v)}>
                  {v === null ? (tri ? "Hi-Z" : "released") : tri ? `drives ${v}` : "pulls low"}
                </text>
                {tri && (
                  <g onClick={() => toggle(e, setE, i)} style={{ cursor: "pointer" }}>
                    <line x1={128} x2={128} y1={y0 - 11} y2={y0 - 28} stroke={e[i] ? "var(--good)" : "var(--muted)"} strokeWidth={2} />
                    <rect x={108} y={y0 - 44} width={40} height={18} rx={4} fill={e[i] ? "var(--good-soft)" : "var(--surface)"} stroke="var(--border)" />
                    <text x={128} y={y0 - 31} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--text)">
                      EN={e[i]}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      }
      controls={
        <>
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "tri", label: "Tri-state bus" },
              { v: "od", label: "Open-drain wired-AND" },
            ]}
          />
          {!tri && <Toggle label="Pull-up resistor fitted" value={pull} onChange={setPull} />}
        </>
      }
      readout={
        tri ? (
          <>
            {drive.map((v, i) => (
              <Read key={i} label={names[i]} tex={e[i] ? `enabled, drives **${v}**${i === 1 ? ` (= D2' )` : ""}` : "disabled: **high impedance**"} />
            ))}
            <Read
              label="Bus F"
              tex={bus === "Z" ? "**floating (Hi-Z)**: nobody drives the bus" : bus === "X" ? "**BUS CONTENTION**: enabled drivers disagree; this can damage the devices" : `**${bus}**${active.length > 1 ? " (they agree, but only one, or no, output should be enabled at any one time)" : ""}`}
              tone={bus === "X" ? "bad" : bus === "Z" || active.length > 1 ? "warn" : "good"}
            />
          </>
        ) : (
          <>
            <Read tex={`$Z = U \\cdot V \\cdot W = ${d.join(" \\cdot ")}$${pull ? ` $= ${d.every((x) => x) ? 1 : 0}$` : ""}`} />
            <Read
              label="Node Z"
              tex={bus === "Z" ? "**floating**: every output is released and there is no pull-up" : bus === "0" ? `**0**: ${active.length} output${active.length > 1 ? "s" : ""} pulling low (no conflict)` : "**1**: all released, the resistor pulls Z high"}
              tone={bus === "Z" ? "warn" : "good"}
            />
          </>
        )
      }
      tasks={
        tri
          ? [
              "Predict: with only D1 enabled, what is F? Then enable D2 as well with D2 = D1. Is that contention?",
              "Find a setting of the D boxes that causes contention when D1 and D2 are both enabled. Why does the inverter matter?",
              "Disable all three drivers. What would a gate reading F see, and why is that dangerous?",
            ]
          : [
              "Predict Z with U = V = W = 1, then set any one input to 0. Why is there no contention even though outputs are tied?",
              "Remove the pull-up resistor and set all inputs to 1. What is Z now?",
              "Explain why tying open-drain outputs gives AND: Z = 1 only when every output lets go.",
            ]
      }
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Schmitt trigger

const N_SAMPLES = 160;

function SchmittDemo() {
  const [noise, setNoise] = useState(0.35);
  const [vtp, setVtp] = useState(2.0);
  const [vtm, setVtm] = useState(1.2);
  const [inv, setInv] = useState(false);
  const lo = Math.min(vtm, vtp - 0.05);
  const vt = (vtp + lo) / 2;
  const vin = useMemo(
    () =>
      Array.from({ length: N_SAMPLES }, (_, i) => {
        const t = i / (N_SAMPLES - 1);
        const base = t < 0.45 ? 0.3 + (2.9 * t) / 0.45 : t < 0.55 ? 3.2 : 3.2 - (2.9 * (t - 0.55)) / 0.45;
        const n = noise * (0.6 * Math.sin(i * 0.9) + 0.4 * Math.sin(i * 2.3 + 1));
        return Math.max(0, Math.min(3.6, base + n));
      }),
    [noise],
  );
  const plain = vin.map((v) => (v > vt ? 1 : 0));
  const sch: number[] = [];
  let st = vin[0] > vtp ? 1 : 0;
  for (const v of vin) {
    if (v > vtp) st = 1;
    else if (v < lo) st = 0;
    sch.push(st);
  }
  const outP = inv ? plain.map((x) => 1 - x) : plain;
  const outS = inv ? sch.map((x) => 1 - x) : sch;
  const tr = (o: number[]) => o.slice(1).filter((x, i) => x !== o[i]).length;
  const W = 400;
  const x = (i: number) => 40 + (i / (N_SAMPLES - 1)) * (W - 50);
  const ya = (v: number) => 120 - v * 30;
  const digital = (o: number[], y0: number) => o.map((b, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${(y0 - b * 22).toFixed(1)}${i < o.length - 1 && o[i + 1] !== b ? ` L${x(i + 1).toFixed(1)},${(y0 - b * 22).toFixed(1)}` : ""}`).join(" ");
  const hline = (v: number, col: string, label: string, dash: string) => (
    <g>
      <line x1={36} x2={W - 10} y1={ya(v)} y2={ya(v)} stroke={col} strokeDasharray={dash} strokeWidth={1.3} />
      <text x={W - 12} y={ya(v) - 3} textAnchor="end" fontSize={9} fill={col}>
        {label}
      </text>
    </g>
  );
  return (
    <VizFrame
      title="Schmitt trigger vs ordinary gate on a slow, noisy input"
      hint="Slide the noise and the two thresholds. The ordinary gate switches at the single dotted threshold; the Schmitt gate uses VT+ going up and VT− going down."
      onReset={() => {
        setNoise(0.35);
        setVtp(2.0);
        setVtm(1.2);
        setInv(false);
      }}
      figure={
        <svg viewBox={`0 0 ${W} 250`} className="viz-svg" role="img" aria-label="Schmitt trigger waveforms">
          <text x={4} y={14} fontSize={10} fontWeight={700} fill="var(--text)">
            V_IN
          </text>
          {hline(vtp, "var(--good)", `VT+ ${fmt(vtp)}`, "6 3")}
          {hline(lo, "var(--accent)", `VT− ${fmt(lo)}`, "6 3")}
          {hline(vt, "var(--muted)", `VT ${fmt(vt)}`, "2 3")}
          <polyline points={vin.map((v, i) => `${x(i).toFixed(1)},${ya(v).toFixed(1)}`).join(" ")} fill="none" stroke="var(--text)" strokeWidth={1.5} />
          <text x={4} y={168} fontSize={10} fontWeight={700} fill="var(--bad)">
            plain
          </text>
          <path d={digital(outP, 182)} fill="none" stroke="var(--bad)" strokeWidth={1.8} />
          <text x={4} y={222} fontSize={10} fontWeight={700} fill="var(--good)">
            Schmitt
          </text>
          <path d={digital(outS, 236)} fill="none" stroke="var(--good)" strokeWidth={1.8} />
        </svg>
      }
      controls={
        <>
          <Slider label="Noise amplitude" value={noise} min={0} max={0.7} step={0.01} onChange={setNoise} format={(v) => `${fmt(v)} V`} />
          <Slider label="$V_{T+}$" value={vtp} min={1.2} max={3.0} step={0.05} onChange={setVtp} format={(v) => `${fmt(v)} V`} />
          <Slider label="$V_{T-}$" value={vtm} min={0.4} max={2.9} step={0.05} onChange={setVtm} format={(v) => `${fmt(v)} V`} />
          <Toggle label="Inverting gates (Schmitt inverter)" value={inv} onChange={setInv} />
        </>
      }
      readout={
        <>
          <Read label="Hysteresis" tex={`$V_{T+} - V_{T-} = ${fmt(vtp)} - ${fmt(lo)} = ${fmt(vtp - lo)}$ V`} />
          <Read label="Noise (peak-to-peak)" tex={`≈ ${fmt(2 * noise)} V`} tone={2 * noise < vtp - lo ? "good" : "warn"} />
          <Read label="Plain gate output changes" tex={`**${tr(outP)}**`} tone={tr(outP) > 2 ? "bad" : "good"} />
          <Read label="Schmitt output changes" tex={`**${tr(outS)}**`} tone={tr(outS) > 2 ? "bad" : "good"} />
        </>
      }
      tasks={[
        "Predict: with the default settings, how many times will each output change? Compare with the counts.",
        "Shrink the hysteresis (move $V_{T-}$ up towards $V_{T+}$) until the Schmitt output starts to chatter too. Compare the hysteresis with the noise peak-to-peak.",
        "Set the noise to 0. Why do both outputs now switch exactly twice, but at different times?",
        "Tick the inverter box: when the input rises past $V_{T+}$, which way does the output go?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// PLA grid

const PLA_IN = ["A", "B", "C"];
const LITS = ["A", "A'", "B", "B'", "C", "C'"];
const ROWS = 4;
const PLA_TARGETS: { label: string; f1: number[]; f2: number[] }[] = [
  { label: "Lesson: F1 = Σm(0,4,5), F2 = Σm(0,3,4,7)", f1: [0, 4, 5], f2: [0, 3, 4, 7] },
  { label: "Challenge: F1 = Σm(1,3,6,7), F2 = Σm(1,5,6,7)", f1: [1, 3, 6, 7], f2: [1, 5, 6, 7] },
];

function PlaGrid() {
  const init = () => ({
    and: [
      [false, false, false, true, false, true],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ],
    or: [
      [true, false],
      [false, false],
      [false, false],
      [false, false],
    ],
  });
  const [g, setG] = useState(init);
  const [ti, setTi] = useState(0);
  const target = PLA_TARGETS[ti];
  const used = (r: number) => g.and[r].some(Boolean);
  const termStr = (r: number) => (used(r) ? LITS.filter((_, c) => g.and[r][c]).join("") : "unused");
  const termVal = (r: number, m: number) => {
    if (!used(r)) return 0;
    const env = rowEnv(PLA_IN, m);
    return LITS.every((l, c) => !g.and[r][c] || (l.endsWith("'") ? env[l[0]] === 0 : env[l] === 1)) ? 1 : 0;
  };
  const outVal = (o: number, m: number) => (Array.from({ length: ROWS }, (_, r) => g.or[r][o] && termVal(r, m)).some(Boolean) ? 1 : 0);
  const mins = (o: number) => Array.from({ length: 8 }, (_, m) => m).filter((m) => outVal(o, m));
  const f1 = mins(0);
  const f2 = mins(1);
  const same = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => x === b[i]);
  const ok1 = same(f1, target.f1);
  const ok2 = same(f2, target.f2);
  const expr = (o: number) => {
    const ts = Array.from({ length: ROWS }, (_, r) => r).filter((r) => g.or[r][o] && used(r));
    return ts.length ? ts.map(termStr).join(" + ") : "0";
  };
  const flip = (plane: "and" | "or", r: number, c: number) =>
    setG((s) => ({ ...s, [plane]: s[plane].map((row, i) => (i === r ? row.map((v, j) => (j === c ? !v : v)) : row)) }));
  // Geometry
  const cx = (c: number) => 60 + c * 34;
  const ry = (r: number) => 80 + r * 40;
  const ox = (o: number) => 330 + o * 40;
  const rows = Array.from({ length: 8 }, (_, m) => [...bitsOf(m, 3), outVal(0, m), outVal(1, m), target.f1.includes(m) ? 1 : 0, target.f2.includes(m) ? 1 : 0]);
  return (
    <VizFrame
      title="Programming a PLA: AND plane and OR plane"
      hint="Click a crossing to add or remove a connection (✕). Each row ANDs its marked literals; each output ORs its marked rows. Rows with no literals are unused."
      onReset={() => setG(init())}
      figure={
        <svg viewBox="0 0 450 270" className="viz-svg" role="img" aria-label="PLA grid">
          {LITS.map((l, c) => (
            <g key={l}>
              <text x={cx(c)} y={40} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--text)">
                {l}
              </text>
              <line x1={cx(c)} x2={cx(c)} y1={48} y2={ry(ROWS - 1) + 14} stroke="var(--muted)" />
            </g>
          ))}
          <text x={130} y={18} textAnchor="middle" fontSize={11} fill="var(--muted)">
            AND plane (literals)
          </text>
          <text x={350} y={18} textAnchor="middle" fontSize={11} fill="var(--muted)">
            OR plane
          </text>
          {Array.from({ length: ROWS }, (_, r) => (
            <g key={r}>
              <text x={8} y={ry(r) + 4} fontSize={11} fontWeight={700} fill="var(--text)">
                P{r + 1}
              </text>
              <line x1={36} x2={ox(1) + 12} y1={ry(r)} y2={ry(r)} stroke={used(r) ? "var(--text)" : "var(--muted)"} strokeWidth={used(r) ? 1.6 : 1} />
              <rect x={258} y={ry(r) - 11} width={34} height={22} rx={11} fill="var(--surface)" stroke="var(--text)" />
              <text x={275} y={ry(r) + 4} textAnchor="middle" fontSize={9} fill="var(--text)">
                AND
              </text>
              <text x={ox(1) + 18} y={ry(r) + 4} fontSize={10} fontWeight={700} fill={used(r) ? "var(--accent)" : "var(--muted)"}>
                {termStr(r)}
              </text>
              {LITS.map((_, c) => (
                <g key={c} onClick={() => flip("and", r, c)} style={{ cursor: "pointer" }}>
                  <rect x={cx(c) - 12} y={ry(r) - 12} width={24} height={24} fill="transparent" />
                  {g.and[r][c] ? (
                    <text x={cx(c)} y={ry(r) + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--accent)">
                      ✕
                    </text>
                  ) : (
                    <circle cx={cx(c)} cy={ry(r)} r={3} fill="var(--border)" />
                  )}
                </g>
              ))}
              {[0, 1].map((o) => (
                <g key={o} onClick={() => flip("or", r, o)} style={{ cursor: "pointer" }}>
                  <rect x={ox(o) - 12} y={ry(r) - 12} width={24} height={24} fill="transparent" />
                  {g.or[r][o] ? (
                    <text x={ox(o)} y={ry(r) + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--good)">
                      ✕
                    </text>
                  ) : (
                    <circle cx={ox(o)} cy={ry(r)} r={3} fill="var(--border)" />
                  )}
                </g>
              ))}
            </g>
          ))}
          {[0, 1].map((o) => (
            <g key={o}>
              <line x1={ox(o)} x2={ox(o)} y1={64} y2={232} stroke="var(--muted)" />
              <path d={`M${ox(o) - 14},232 Q${ox(o)},240 ${ox(o) + 14},232 Q${ox(o) + 10},252 ${ox(o)},262 Q${ox(o) - 10},252 ${ox(o) - 14},232 Z`} fill="var(--surface)" stroke="var(--text)" />
              <text x={ox(o)} y={56} textAnchor="middle" fontSize={12} fontWeight={700} fill={(o ? ok2 : ok1) ? "var(--good)" : "var(--text)"}>
                F{o + 1}
              </text>
            </g>
          ))}
        </svg>
      }
      controls={<Choice value={ti} onChange={setTi} options={PLA_TARGETS.map((t, i) => ({ v: i, label: t.label }))} />}
      readout={
        <>
          <Read label="F1 =" tex={`**${expr(0)}** $= \\Sigma m(${f1.join(",") || "\\,"})$`} tone={ok1 ? "good" : undefined} />
          <Read label="F2 =" tex={`**${expr(1)}** $= \\Sigma m(${f2.join(",") || "\\,"})$`} tone={ok2 ? "good" : undefined} />
          <Read
            label="Target"
            tex={ok1 && ok2 ? `**Both outputs match.** Minimum: F1 = ${minimalSop(PLA_IN, target.f1)}, F2 = ${minimalSop(PLA_IN, target.f2)}` : `F1 ${ok1 ? "✓" : "✗"}, F2 ${ok2 ? "✓" : "✗"}: compare the last four columns`}
            tone={ok1 && ok2 ? "good" : "warn"}
          />
          <TableView head={["A", "B", "C", "F1", "F2", "want F1", "want F2"]} rows={rows} />
        </>
      }
      tasks={[
        "Predict: P1 is programmed as $B'C'$. Which rows of the truth table does it turn on? Check F1.",
        "Complete the lesson target with only **three** product rows by sharing $B'C'$ between F1 and F2.",
        "Switch to the challenge. Minimise each output on paper first, then program it. How many rows do you need, and which term is shared?",
        "Connect both $A$ and $A'$ in one row. Why does that row never turn on?",
      ]}
    />
  );
}
