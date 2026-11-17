"use client";

import { useState } from "react";
import { Choice, CircuitSvg, KMapSvg, Read, TableView, Toggle, VizFrame, WaveSvg } from "../kit";
import { LOOP_COLORS } from "../../figures/KMap";
import { covers, evalCircuit, minimalCover, primeImplicants, productString, rowEnv, sumString, type Bit, type Implicant, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";

// Interactive figures for the kmaps lesson (Ch 5: combinational logic & K-maps), chosen by id.
export default function KmapsVisual({ id }: { id: string }) {
  switch (id) {
    case "canonical-builder":
      return <CanonicalBuilder />;
    case "kmap-adjacency":
      return <KmapAdjacency />;
    case "kmap-minimiser":
      return <KmapMinimiser />;
    case "prime-essential":
      return <PrimeEssential />;
    case "nand-nor":
      return <NandNor />;
    case "active-low-enable":
      return <ActiveLowEnable />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Helpers

const V3 = ["A", "B", "C"];
const V4 = ["A", "B", "C", "D"];
const varsFor = (n: number) => (n === 3 ? V3 : V4);
const bin = (m: number, n: number) => m.toString(2).padStart(n, "0");
const bitCount = (x: number) => {
  let c = 0;
  for (; x; x &= x - 1) c++;
  return c;
};
const minterm = (m: number, vars: string[]) => productString({ value: m, mask: 0 }, vars);
const maxterm = (m: number, vars: string[]) => sumString({ value: m, mask: 0 }, vars);
const idx = (vals: string, ch: string) => [...vals].flatMap((c, m) => (c === ch ? [m] : []));
/** Values string with 1s at `ones`, x at `dcs`, 0 elsewhere. */
const valuesOf = (n: number, ones: number[], dcs: number[] = []) =>
  Array.from({ length: 1 << n }, (_, m) => (ones.includes(m) ? "1" : dcs.includes(m) ? "x" : "0")).join("");
/** Minimal SOP (or POS) string from a cover, with the constant cases handled. */
function exprOf(cover: Implicant[], n: number, vars: string[], pos: boolean, empty: boolean): string {
  if (empty) return pos ? "1" : "0";
  if (cover.some((p) => p.mask === (1 << n) - 1)) return pos ? "0" : "1";
  return pos ? cover.map((p) => sumString(p, vars)).join("") : cover.map((p) => productString(p, vars)).join(" + ");
}
const lits = (p: Implicant, n: number) => n - bitCount(p.mask);

// ---------------------------------------------------------------------------------------------
// 1. Truth table → canonical forms

const CANON_PRESETS: { label: string; n: number; ones: number[] }[] = [
  { label: "Odd parity (3 inputs)", n: 3, ones: [1, 2, 4, 7] },
  { label: "Tutorial-style", n: 3, ones: [1, 3, 4, 6, 7] },
  { label: "Majority of 3", n: 3, ones: [3, 5, 6, 7] },
  { label: "4-input: N ≥ 10", n: 4, ones: [10, 11, 12, 13, 14, 15] },
  { label: "Clear (4 inputs)", n: 4, ones: [] },
];

function CanonicalBuilder() {
  const [preset, setPreset] = useState(0);
  const [n, setN] = useState(CANON_PRESETS[0].n);
  const [f, setF] = useState(valuesOf(3, CANON_PRESETS[0].ones));
  const [sel, setSel] = useState<number | null>(1);
  const vars = varsFor(n);
  const ones = idx(f, "1");
  const zeros = idx(f, "0");
  const load = (i: number) => {
    const p = CANON_PRESETS[i];
    setPreset(i);
    setN(p.n);
    setF(valuesOf(p.n, p.ones));
    setSel(null);
  };
  const flip = (m: number) => setF((s) => s.slice(0, m) + (s[m] === "1" ? "0" : "1") + s.slice(m + 1));
  const list = (xs: number[]) => (xs.length ? xs.join(",") : "\\,");
  const sop = ones.length ? ones.map((m) => minterm(m, vars)).join(" + ") : "0 (no minterms)";
  const pos = zeros.length ? zeros.map((m) => maxterm(m, vars)).join("") : "1 (no maxterms)";
  const selEnv = sel !== null ? rowEnv(vars, sel) : null;
  return (
    <VizFrame
      title="Truth table → Σm, ΠM and the canonical SOP / POS"
      hint="Click an F cell to flip the output on that row. Click a row number to inspect its minterm and maxterm."
      onReset={() => load(preset)}
      figure={
        <div style={{ overflowX: "auto" }}>
          <table className="sc5-table">
            <thead>
              <tr>
                <th>row</th>
                {vars.map((v) => (
                  <th key={v}>{v}</th>
                ))}
                <th>minterm</th>
                <th>maxterm</th>
                <th>F</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 1 << n }, (_, m) => {
                const on = f[m] === "1";
                return (
                  <tr key={m} className={sel === m ? "hl" : undefined}>
                    <td>
                      <button className="chip" style={{ padding: "0 8px" }} onClick={() => setSel(sel === m ? null : m)} aria-label={`Inspect row ${m}`}>
                        {m}
                      </button>
                    </td>
                    {bin(m, n)
                      .split("")
                      .map((b, k) => (
                        <td key={k}>{b}</td>
                      ))}
                    <td style={{ color: on ? "var(--good)" : "var(--muted)", fontWeight: on ? 700 : 400, whiteSpace: "nowrap", fontSize: "0.8rem" }}>
                      m{m} = {minterm(m, vars)}
                    </td>
                    <td style={{ color: on ? "var(--muted)" : "var(--bad)", fontWeight: on ? 400 : 700, whiteSpace: "nowrap", fontSize: "0.8rem" }}>
                      M{m} = {maxterm(m, vars).slice(1, -1)}
                    </td>
                    <td>
                      <button
                        className="bit"
                        style={{ width: 28, height: 24, ...(on ? { background: "var(--good)", borderColor: "var(--good)", color: "var(--surface)" } : {}) }}
                        onClick={() => flip(m)}
                        aria-label={`Flip F on row ${m}`}
                      >
                        {f[m]}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
      controls={<Choice value={preset} onChange={load} options={CANON_PRESETS.map((p, i) => ({ v: i, label: p.label }))} />}
      readout={
        <>
          <Read label="Sum of minterms" tex={`$F(${vars.join(",")}) = \\sum m(${list(ones)})$`} tone="good" />
          <Read label="Product of maxterms" tex={`$F(${vars.join(",")}) = \\prod M(${list(zeros)})$`} tone="bad" />
          <Read label="Canonical SOP" tex={`**F = ${sop}**`} />
          <Read label="Canonical POS" tex={`**F = ${pos}**`} />
          <Read label="Complement" tex={`$F' = \\sum m(${list(zeros)}) = \\prod M(${list(ones)})$`} />
          <Read tex={`${ones.length} minterms + ${zeros.length} maxterms = $2^{${n}} = ${1 << n}$ rows: every row index appears in exactly one list.`} />
          {sel !== null && selEnv && (
            <Read
              tone="warn"
              tex={`Row ${sel}: ${vars.map((v) => `${v}=${selEnv[v]}`).join(", ")}. Minterm **m${sel} = ${minterm(sel, vars)}** is 1 only on this row; maxterm **M${sel} = ${maxterm(sel, vars)}** is 0 only on this row. F = ${f[sel]}, so ${f[sel] === "1" ? `m${sel} goes into Σm` : `M${sel} goes into ΠM`}.`}
            />
          )}
        </>
      }
      tasks={[
        "Predict: for odd parity, $F = \\sum m(1,2,4,7)$. Which maxterm indices make up $\\prod M$? Check the readout.",
        "Click row 5 and substitute its values into $M_5$. Every literal is 0, so the sum is 0. Why does the maxterm of row 5 use $A'$ and $C'$ rather than $A$ and $C$?",
        "Flip a single F cell from 0 to 1. Which list gains an index and which list loses the same index?",
        "Load **Clear (4 inputs)** and set F = 1 on rows 10 to 15 only. Read $\\sum m$, then predict how many factors the canonical POS has before looking.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. K-map adjacency: Gray order makes logical neighbours physical neighbours

function KmapAdjacency() {
  const [n, setN] = useState(4);
  const [order, setOrder] = useState<"gray" | "binary">("gray");
  const [sel, setSel] = useState(5);
  const vars = varsFor(n);
  const nr = n === 4 ? 2 : 1;
  const nc = n - nr;
  const seq = (k: number) => (order === "gray" ? [0, 1, 3, 2] : [0, 1, 2, 3]).slice(0, 1 << k);
  const rows = seq(nr);
  const cols = seq(nc);
  const cellAt = (r: number, c: number) => (rows[r] << nc) | cols[c];
  const posOf = (m: number): [number, number] => [rows.indexOf(m >> nc), cols.indexOf(m & ((1 << nc) - 1))];
  const s = sel < 1 << n ? sel : 0;
  const nbrs = vars.map((v, k) => ({ v, m: s ^ (1 << (n - 1 - k)) }));
  const [sr, sc] = posOf(s);
  const touching = (m: number) => {
    const [r, c] = posOf(m);
    return (r === sr && Math.abs(c - sc) === 1) || (c === sc && Math.abs(r - sr) === 1);
  };
  const wrapEdge = (m: number) => {
    const [r, c] = posOf(m);
    return (r === sr && Math.abs(c - sc) === cols.length - 1 && cols.length > 2) || (c === sc && Math.abs(r - sr) === rows.length - 1 && rows.length > 2);
  };
  const CELL = 58;
  const ox = 64;
  const oy = 52;
  const W = ox + cols.length * CELL + 14;
  const H = oy + rows.length * CELL + 14;
  const nbrSet = new Set(nbrs.map((x) => x.m));
  const broken = nbrs.filter((x) => !touching(x.m) && !wrapEdge(x.m));
  return (
    <VizFrame
      title="Why K-maps use Gray-code order: neighbours differ in one variable"
      hint="Click any cell. Its neighbours (one variable flipped) are outlined in green; wrap-around neighbours are marked ↺."
      onReset={() => {
        setN(4);
        setOrder("gray");
        setSel(5);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" style={{ maxWidth: W * 1.4 }} role="img" aria-label="K-map adjacency">
          <line x1={ox - 30} y1={oy - 40} x2={ox} y2={oy} stroke="var(--muted)" />
          <text x={ox - 4} y={oy - 28} textAnchor="end" className="kmap-var">
            {vars.slice(nr).join("")}
          </text>
          <text x={ox - 22} y={oy - 4} textAnchor="end" className="kmap-var">
            {vars.slice(0, nr).join("")}
          </text>
          {cols.map((c, i) => (
            <text key={`c${i}`} x={ox + i * CELL + CELL / 2} y={oy - 8} textAnchor="middle" className="kmap-head">
              {bin(c, nc)}
            </text>
          ))}
          {rows.map((r, i) => (
            <text key={`r${i}`} x={ox - 6} y={oy + i * CELL + CELL / 2 + 4} textAnchor="end" className="kmap-head">
              {bin(r, nr)}
            </text>
          ))}
          {rows.map((_, r) =>
            cols.map((__, c) => {
              const m = cellAt(r, c);
              const isSel = m === s;
              const isN = nbrSet.has(m);
              const wrap = isN && wrapEdge(m);
              const far = isN && !touching(m) && !wrapEdge(m);
              return (
                <g key={m} className="kmap-cell live" onClick={() => setSel(m)}>
                  <rect
                    x={ox + c * CELL}
                    y={oy + r * CELL}
                    width={CELL}
                    height={CELL}
                    fill={isSel ? "var(--accent-soft)" : isN ? (far ? "var(--bad-soft)" : "var(--good-soft)") : "var(--surface)"}
                    stroke="var(--border)"
                  />
                  {(isSel || isN) && (
                    <rect
                      x={ox + c * CELL + 3}
                      y={oy + r * CELL + 3}
                      width={CELL - 6}
                      height={CELL - 6}
                      rx={8}
                      fill="none"
                      stroke={isSel ? "var(--accent)" : far ? "var(--bad)" : "var(--good)"}
                      strokeWidth={2.2}
                      strokeDasharray={wrap ? "5 3" : undefined}
                    />
                  )}
                  <text x={ox + c * CELL + CELL / 2} y={oy + r * CELL + 26} textAnchor="middle" className="kmap-val">
                    {m}
                  </text>
                  <text x={ox + c * CELL + CELL / 2} y={oy + r * CELL + 44} textAnchor="middle" className="kmap-idx" style={{ fontSize: 10 }}>
                    {bin(m, n)}
                  </text>
                  {wrap && (
                    <text x={ox + c * CELL + CELL - 6} y={oy + r * CELL + 14} textAnchor="end" style={{ fontSize: 12, fill: "var(--good)" }}>
                      ↺
                    </text>
                  )}
                </g>
              );
            }),
          )}
          <rect x={ox} y={oy} width={cols.length * CELL} height={rows.length * CELL} fill="none" stroke="var(--muted)" strokeWidth={1.4} />
        </svg>
      }
      controls={
        <>
          <Choice
            value={n}
            onChange={(v) => {
              setN(v);
              setSel(Math.min(sel, (1 << v) - 1));
            }}
            options={[
              { v: 3, label: "3 variables" },
              { v: 4, label: "4 variables" },
            ]}
          />
          <Choice
            value={order}
            onChange={setOrder}
            options={[
              { v: "gray", label: "Gray order 00 01 11 10" },
              { v: "binary", label: "Binary order 00 01 10 11" },
            ]}
          />
        </>
      }
      readout={
        <>
          <Read label="Selected" tex={`**m${s}** = ${bin(s, n)} = **${minterm(s, vars)}**`} tone="good" />
          {nbrs.map((x) => (
            <Read
              key={x.m}
              tone={!touching(x.m) && !wrapEdge(x.m) ? "bad" : undefined}
              tex={`m${x.m} = ${bin(x.m, n)}: only **${x.v}** flips${touching(x.m) ? " (touching)" : wrapEdge(x.m) ? " (wrap-around: opposite edge)" : " (**not adjacent on the map!**)"}`}
            />
          ))}
          <Read
            tone={broken.length ? "bad" : "good"}
            tex={
              broken.length
                ? `With binary order ${broken.length} logical neighbour${broken.length > 1 ? "s are" : " is"} separated on the map, so a loop could not combine them.`
                : `All ${n} neighbours touch the cell or sit on the opposite edge: every cell has exactly ${n} neighbours.`
            }
          />
          <Read tex={`Looping two neighbours: $${minterm(s, vars)} + ${minterm(nbrs[n - 1].m, vars)}$ drops the variable that flips (here ${nbrs[n - 1].v}).`} />
        </>
      }
      tasks={[
        "Predict: how many neighbours does a corner cell such as m0 have in a 4-variable map? Click it and count the outlines.",
        "Click m8 (bottom-left in Gray order). Which neighbours are wrap-around ones, and which variable flips for each?",
        "Switch to **Binary order** and click m1. Which logical neighbour ends up away from m1 on the map? This is why the columns run 00, 01, 11, 10.",
        "Explain: two neighbouring minterms $A'BC'D$ and $A'BCD$ OR together to $A'BD$. Which theorem is that, and why does it need the cells to differ in exactly one bit?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. K-map minimiser with presets, SOP vs POS cost

const MIN_PRESETS: { label: string; n: number; ones: number[]; dcs?: number[] }[] = [
  { label: "Lecture: Z = A + BCD", n: 4, ones: [7, 8, 9, 10, 11, 12, 13, 14, 15] },
  { label: "Corners", n: 4, ones: [0, 2, 5, 8, 10, 13] },
  { label: "BCD digit < 6 (with X)", n: 4, ones: [0, 1, 2, 3, 4, 5], dcs: [10, 11, 12, 13, 14, 15] },
  { label: "With don't cares", n: 4, ones: [0, 5, 6, 8, 14], dcs: [2, 7, 15] },
  { label: "3-variable", n: 3, ones: [1, 3, 4, 6, 7] },
  { label: "Blank", n: 4, ones: [] },
];

function KmapMinimiser() {
  const [preset, setPreset] = useState(0);
  const [vals, setVals] = useState(valuesOf(4, MIN_PRESETS[0].ones));
  const [mode, setMode] = useState<"sop" | "pos">("sop");
  const n = Math.log2(vals.length);
  const vars = varsFor(n);
  const ones = idx(vals, "1");
  const zeros = idx(vals, "0");
  const dcs = idx(vals, "x");
  const bySize = (c: Implicant[]) => [...c].sort((p, q) => bitCount(q.mask) - bitCount(p.mask) || q.mask - p.mask || p.value - q.value);
  const sopCover = bySize(minimalCover(n, ones, dcs));
  const posCover = bySize(minimalCover(n, zeros, dcs));
  const sop = exprOf(sopCover, n, vars, false, !ones.length);
  const pos = exprOf(posCover, n, vars, true, !zeros.length);
  const cost = (c: Implicant[]) => {
    const l = c.reduce((s, p) => s + lits(p, n), 0);
    return { terms: c.length, lits: l, inputs: l + (c.length > 1 ? c.length : 0) };
  };
  const cs = cost(sopCover);
  const cp = cost(posCover);
  const cover = mode === "sop" ? sopCover : posCover;
  const termStr = (p: Implicant) => (mode === "sop" ? productString(p, vars) : sumString(p, vars));
  const load = (i: number) => {
    const p = MIN_PRESETS[i];
    setPreset(i);
    setVals(valuesOf(p.n, p.ones, p.dcs));
  };
  const click = (m: number) => setVals((v) => v.slice(0, m) + (v[m] === "0" ? "1" : v[m] === "1" ? "x" : "0") + v.slice(m + 1));
  const usedDc = (p: Implicant) => dcs.filter((m) => covers(p, m));
  return (
    <VizFrame
      title="K-map minimiser: loops, terms and cost"
      hint="Click a cell to cycle 0 → 1 → X (don't care). The loops show a minimum cover of the 1s (SOP) or of the 0s (POS)."
      onReset={() => load(preset)}
      figure={<KMapSvg vars={vars} values={vals} groups={cover.filter((p) => p.mask !== (1 << n) - 1).map(termStr)} showIndex onCellClick={click} />}
      controls={
        <>
          <Choice value={preset} onChange={load} options={MIN_PRESETS.map((p, i) => ({ v: i, label: p.label }))} />
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "sop", label: "Loop the 1s (SOP)" },
              { v: "pos", label: "Loop the 0s (POS)" },
            ]}
          />
        </>
      }
      readout={
        <>
          <Read label="F =" tex={`$\\sum m(${ones.join(",") || "\\,"})${dcs.length ? ` + d(${dcs.join(",")})` : ""}$`} />
          <Read label="Minimum SOP" tex={`**${sop}**  (${cs.terms} term${cs.terms === 1 ? "" : "s"}, ${cs.lits} literals)`} tone={mode === "sop" ? "good" : undefined} />
          <Read label="Minimum POS" tex={`**${pos}**  (${cp.terms} term${cp.terms === 1 ? "" : "s"}, ${cp.lits} literals)`} tone={mode === "pos" ? "good" : undefined} />
          {cover
            .filter((p) => p.mask !== (1 << n) - 1)
            .map((p, i) => {
              const size = 1 << bitCount(p.mask);
              const dc = usedDc(p);
              return (
                <div key={i} className="small" style={{ color: LOOP_COLORS[i % LOOP_COLORS.length] }}>
                  ● {termStr(p)}: loop of {size} cell{size > 1 ? "s" : ""} → {n} − log₂{size} = {lits(p, n)} literal{lits(p, n) === 1 ? "" : "s"}
                  {dc.length ? ` (uses X at ${dc.join(", ")} as ${mode === "sop" ? "1" : "0"})` : ""}
                </div>
              );
            })}
          <Read
            tex={
              cs.inputs === cp.inputs
                ? `Gate inputs: SOP ${cs.inputs}, POS ${cp.inputs}: equal cost.`
                : `Gate inputs (literals + inputs of the final gate): SOP ${cs.inputs}, POS ${cp.inputs}, so **${cs.inputs < cp.inputs ? "SOP" : "POS"} is cheaper** here.`
            }
          />
        </>
      }
      tasks={[
        "Predict: on **Corners**, can the four corner 1s (m0, m2, m8, m10) be one loop? Which two variables does that loop eliminate?",
        "On **BCD digit < 6**, change the don't cares at 12 and 13 to 0 one at a time. When does the minimum SOP get more literals, and why?",
        "On the lecture preset, switch to **Loop the 0s**. Compare $A + BCD$ with its POS. Which is cheaper in gate inputs?",
        "On **Blank**, build a checkerboard (1s where an odd number of A, B, C, D are 1). Why can no loop bigger than one cell form?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Prime and essential prime implicants

const PI_PRESETS: { label: string; n: number; ones: number[]; dcs?: number[] }[] = [
  { label: "One essential", n: 4, ones: [0, 4, 5, 7, 8, 9, 13, 15] },
  { label: "Three essentials", n: 4, ones: [1, 3, 4, 5, 6, 7, 9, 11, 13] },
  { label: "Cyclic (no essentials)", n: 3, ones: [0, 1, 2, 5, 6, 7] },
  { label: "Primes 2,3,5,7,11,13", n: 4, ones: [2, 3, 5, 7, 11, 13] },
  { label: "With don't cares", n: 4, ones: [0, 5, 6, 8, 14], dcs: [2, 7, 15] },
];

function PrimeEssential() {
  const [preset, setPreset] = useState(0);
  const [vals, setVals] = useState(valuesOf(4, PI_PRESETS[0].ones));
  const [view, setView] = useState<"all" | "ess" | "cover" | number>("all");
  const n = Math.log2(vals.length);
  const vars = varsFor(n);
  const ones = idx(vals, "1");
  const dcs = idx(vals, "x");
  const primes = primeImplicants(n, ones, dcs).filter((p) => ones.some((m) => covers(p, m)));
  const coverBy = (m: number) => primes.filter((p) => covers(p, m));
  const essentialFor = primes.map((p) => ones.filter((m) => covers(p, m) && coverBy(m).length === 1));
  const ess = primes.filter((_, i) => essentialFor[i].length > 0);
  const left = ones.filter((m) => !ess.some((p) => covers(p, m)));
  const cover = minimalCover(n, ones, dcs);
  const name = (p: Implicant) => productString(p, vars);
  const shown: number[] =
    view === "all" ? primes.map((_, i) => i) : view === "ess" ? primes.flatMap((p, i) => (ess.includes(p) ? [i] : [])) : view === "cover" ? primes.flatMap((p, i) => (cover.some((q) => q.value === p.value && q.mask === p.mask) ? [i] : [])) : [view];
  const load = (i: number) => {
    const p = PI_PRESETS[i];
    setPreset(i);
    setVals(valuesOf(p.n, p.ones, p.dcs));
    setView("all");
  };
  const click = (m: number) => {
    setVals((v) => v.slice(0, m) + (v[m] === "0" ? "1" : v[m] === "1" ? "x" : "0") + v.slice(m + 1));
    setView("all");
  };
  const full = primes.length === 1 && primes[0].mask === (1 << n) - 1;
  return (
    <VizFrame
      title="Prime implicants, essential prime implicants and the minimum cover"
      hint="Click a prime implicant below to show it alone; click cells to edit the map (0 → 1 → X)."
      onReset={() => load(preset)}
      figure={
        <KMapSvg
          vars={vars}
          values={vals}
          groups={full ? [] : shown.map((i) => name(primes[i]))}
          groupColors={shown.map((i) => LOOP_COLORS[i % LOOP_COLORS.length])}
          showIndex
          onCellClick={click}
        />
      }
      controls={
        <>
          <Choice value={preset} onChange={load} options={PI_PRESETS.map((p, i) => ({ v: i, label: p.label }))} />
          <Choice
            value={typeof view === "number" ? "all" : view}
            onChange={(v) => setView(v)}
            options={[
              { v: "all" as const, label: "All prime implicants" },
              { v: "ess" as const, label: "Essential only" },
              { v: "cover" as const, label: "Minimum cover" },
            ]}
          />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            {primes.map((p, i) => (
              <button
                key={i}
                className={`chip ${view === i ? "on" : ""}`}
                style={{ borderColor: LOOP_COLORS[i % LOOP_COLORS.length], color: LOOP_COLORS[i % LOOP_COLORS.length] }}
                onClick={() => setView(view === i ? "all" : i)}
              >
                {name(p)}
                {essentialFor[i].length ? " ★" : ""}
              </button>
            ))}
          </div>
        </>
      }
      readout={
        <>
          <Read label="Prime implicants" tex={`**${primes.length}**: ${primes.map(name).join(", ") || "none"}`} />
          <Read label="Essential (★)" tex={`**${ess.length}**${ess.length ? ": " + ess.map((p) => `${name(p)} (only loop on m${essentialFor[primes.indexOf(p)].join(", m")})`).join("; ") : ": none, every 1 is covered by at least two prime implicants"}`} tone={ess.length ? "good" : "warn"} />
          <Read
            label="After essentials"
            tex={left.length ? `1s still uncovered: m${left.join(", m")}. Choose the fewest (then smallest-literal) prime implicants that cover them.` : "Every 1 is already covered: the essentials **are** the minimum cover."}
          />
          <Read label="Minimum SOP" tex={`**${exprOf(cover, n, vars, false, !ones.length)}**`} tone="good" />
          {typeof view === "number" && primes[view] && (
            <Read
              tone="warn"
              tex={`${name(primes[view])} covers 1s at m${ones.filter((m) => covers(primes[view], m)).join(", m")}${dcs.some((m) => covers(primes[view], m)) ? ` and X at ${dcs.filter((m) => covers(primes[view], m)).join(", ")}` : ""}. ${essentialFor[view].length ? `Essential: no other prime implicant covers m${essentialFor[view].join(", m")}.` : "Not essential: each of its 1s is also inside another prime implicant."}`}
            />
          )}
        </>
      }
      tasks={[
        "Predict: on **One essential**, which 1-cells are inside only one loop? Switch to **Essential only** to check.",
        "Click each non-essential prime implicant. For **One essential**, why does the minimum cover pick $A'C'D'$ and $AB'C'$ rather than $B'C'D'$?",
        "Load **Cyclic**: there are six prime implicants and no essentials. Show the minimum cover, then find a second, different three-term cover by hand.",
        "On **With don't cares**, find a prime implicant that uses an X. Explain why a loop that covers only X cells is never listed.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. AND-OR / NAND-NAND / OR-AND / NOR-NOR all realise the same function

const g = (id: string, type: CircuitSpec["gates"][number]["type"], ins: string[]) => ({ id, type, in: ins });
const IMPLS: { label: string; circuit: CircuitSpec; inner: string[]; note: string }[] = [
  {
    label: "AND-OR (SOP)",
    circuit: { inputs: ["A", "B", "C"], gates: [g("P1", "AND", ["!A", "C"]), g("P2", "AND", ["A", "!C"]), g("P3", "AND", ["A", "B"]), g("F", "OR", ["P1", "P2", "P3"])], outputs: ["F"], showNets: true },
    inner: ["P1", "P2", "P3"],
    note: "Each AND gate is one product term; the OR gate is 1 when any product term is 1.",
  },
  {
    label: "NAND-NAND",
    circuit: { inputs: ["A", "B", "C"], gates: [g("P1", "NAND", ["!A", "C"]), g("P2", "NAND", ["A", "!C"]), g("P3", "NAND", ["A", "B"]), g("F", "NAND", ["P1", "P2", "P3"])], outputs: ["F"], showNets: true },
    inner: ["P1", "P2", "P3"],
    note: "$F = \\overline{\\overline{A'C}\\cdot\\overline{AC'}\\cdot\\overline{AB}} = A'C + AC' + AB$ by De Morgan: the inner bubbles and the bubbles of the output NAND (drawn as an OR with inverted inputs) cancel.",
  },
  {
    label: "OR-AND (POS)",
    circuit: { inputs: ["A", "B", "C"], gates: [g("S1", "OR", ["A", "C"]), g("S2", "OR", ["!A", "B", "!C"]), g("F", "AND", ["S1", "S2"])], outputs: ["F"], showNets: true },
    inner: ["S1", "S2"],
    note: "Each OR gate is one sum term; the AND gate is 0 when any sum term is 0.",
  },
  {
    label: "NOR-NOR",
    circuit: { inputs: ["A", "B", "C"], gates: [g("S1", "NOR", ["A", "C"]), g("S2", "NOR", ["!A", "B", "!C"]), g("F", "NOR", ["S1", "S2"])], outputs: ["F"], showNets: true },
    inner: ["S1", "S2"],
    note: "$F = \\overline{\\overline{A+C} + \\overline{A'+B+C'}} = (A+C)(A'+B+C')$: NOR-NOR is the POS circuit with every gate replaced by NOR.",
  },
  {
    label: "NOR-NOR from the SOP (wrong)",
    circuit: { inputs: ["A", "B", "C"], gates: [g("P1", "NOR", ["!A", "C"]), g("P2", "NOR", ["A", "!C"]), g("P3", "NOR", ["A", "B"]), g("F", "NOR", ["P1", "P2", "P3"])], outputs: ["F"], showNets: true },
    inner: ["P1", "P2", "P3"],
    note: "Swapping the SOP's gates for NOR gives $(A'+C)(A+C')(A+B)$, the **dual**, not the same function. NOR-NOR must start from a POS.",
  },
];
const TARGET = (m: number) => [1, 3, 4, 6, 7].includes(m);

function NandNor() {
  const [k, setK] = useState(1);
  const [ins, setIns] = useState<Record<string, Bit>>({ A: 1, B: 0, C: 1 });
  const impl = IMPLS[k];
  const values = evalCircuit(impl.circuit, ins);
  const rows = Array.from({ length: 8 }, (_, m) => {
    const v = evalCircuit(impl.circuit, rowEnv(V3, m));
    const t = TARGET(m) ? 1 : 0;
    return [...bin(m, 3).split(""), t, String(v.F), v.F === t ? "✓" : "✗"];
  });
  const bad = rows.filter((r) => r[5] === "✗").length;
  const cur = ins.A * 4 + ins.B * 2 + ins.C;
  const show = (v: Val) => (v === null ? "?" : String(v));
  return (
    <VizFrame
      title="One function, four two-level circuits: F = Σm(1,3,4,6,7)"
      hint="Click A, B or C to toggle it. A bubble on an input pin means that input is complemented."
      onReset={() => {
        setK(1);
        setIns({ A: 1, B: 0, C: 1 });
      }}
      figure={<CircuitSvg circuit={impl.circuit} values={values} onToggleInput={(nm) => setIns({ ...ins, [nm]: (1 - ins[nm]) as Bit })} />}
      controls={<Choice value={k} onChange={setK} options={IMPLS.map((x, i) => ({ v: i, label: x.label }))} />}
      readout={
        <>
          <Read label="Minimum SOP" tex="$F = A'C + AC' + AB$" />
          <Read label="Minimum POS" tex="$F = (A+C)(A'+B+C')$" />
          <Read label="Inner gates" tex={impl.inner.map((x) => `${x} = **${show(values[x])}**`).join(", ")} />
          <Read label="F" tex={`**${show(values.F)}** (target ${TARGET(cur) ? 1 : 0})`} tone={values.F === (TARGET(cur) ? 1 : 0) ? "good" : "bad"} />
          <Read tex={impl.note} tone={bad ? "bad" : undefined} />
          <Read tex={bad ? `**${bad} rows disagree** with the target.` : "All 8 rows match the target truth table."} tone={bad ? "bad" : "good"} />
          <TableView head={["A", "B", "C", "target", "circuit", ""]} rows={rows} highlightRow={cur} />
        </>
      }
      tasks={[
        "Predict: in NAND-NAND with A = 1, B = 0, C = 1, which inner NAND outputs are 0? Set the inputs and check.",
        "Flip between **AND-OR** and **NAND-NAND** without changing the inputs. Every inner value inverts, yet F stays the same. Explain using $\\overline{\\overline{X}\\,\\overline{Y}} = X + Y$.",
        "In **NOR-NOR**, find an input where $S_2 = 1$. Which sum term of the POS is 0 there, and what is F?",
        "Select **NOR-NOR from the SOP (wrong)**. Which rows disagree? What rule tells you which standard form each all-NAND or all-NOR circuit must start from?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 6. Active-low signals and an enable input (alarm example)

const ALARM: CircuitSpec = {
  inputs: ["EN*", "DOOR", "WIN*"],
  gates: [
    { id: "TRIG", type: "OR", in: ["DOOR", "!WIN*"] },
    { id: "ALARM", type: "AND", in: ["!EN*", "TRIG"] },
    { id: "ALARM*", type: "NAND", in: ["!EN*", "TRIG"] },
  ],
  outputs: ["ALARM", "ALARM*"],
};
type Snap = Record<"EN*" | "DOOR" | "WIN*" | "ALARM" | "ALARM*", Bit>;

function ActiveLowEnable() {
  const init: Record<string, Bit> = { "EN*": 1, DOOR: 0, "WIN*": 1 };
  const snap = (i: Record<string, Bit>): Snap => {
    const v = evalCircuit(ALARM, i);
    return { "EN*": i["EN*"], DOOR: i.DOOR, "WIN*": i["WIN*"], ALARM: v.ALARM as Bit, "ALARM*": v["ALARM*"] as Bit };
  };
  const [ins, setIns] = useState<Record<string, Bit>>(init);
  const [hist, setHist] = useState<Snap[]>([snap(init), snap(init)]);
  const [showLow, setShowLow] = useState(true);
  const values = evalCircuit(ALARM, ins);
  const toggle = (nm: string) => {
    const next = { ...ins, [nm]: (1 - ins[nm]) as Bit };
    setIns(next);
    setHist((h) => [...h, snap(next), snap(next)].slice(-16));
  };
  const enabled = ins["EN*"] === 0;
  const names: (keyof Snap)[] = showLow ? ["EN*", "DOOR", "WIN*", "ALARM", "ALARM*"] : ["EN*", "DOOR", "WIN*", "ALARM"];
  const signals = names.map((nm) => ({ name: nm, wave: hist.map((s) => String(s[nm])).join("") }));
  const status = (nm: string, lv: Val, low: boolean, meaning: string) => {
    const asserted = low ? lv === 0 : lv === 1;
    return <Read key={nm} label={nm} tex={`level ${lv} → **${asserted ? "asserted" : "negated"}** (${asserted ? meaning : "not " + meaning})`} tone={asserted ? "good" : undefined} />;
  };
  return (
    <VizFrame
      title="Active-low signals and an active-low enable"
      hint="Click EN*, DOOR or WIN* to toggle. * marks an active-low signal (asserted when 0). Each toggle adds two time units to the waveform."
      onReset={() => {
        setIns(init);
        setHist([snap(init), snap(init)]);
      }}
      figure={
        <>
          <CircuitSvg circuit={ALARM} values={values} onToggleInput={toggle} />
          <div style={{ overflowX: "auto", marginTop: 8 }}>
            <WaveSvg signals={signals} />
          </div>
        </>
      }
      controls={<Toggle label="Show the active-low output ALARM* too" value={showLow} onChange={setShowLow} />}
      readout={
        <>
          {status("EN*", ins["EN*"], true, "system armed")}
          {status("DOOR", ins.DOOR, false, "door open")}
          {status("WIN*", ins["WIN*"], true, "window open")}
          <Read tone={enabled ? "good" : "warn"} tex={enabled ? "Circuit **enabled**: the outputs follow DOOR and WIN*." : "Circuit **disabled**: ALARM is stuck at 0 and ALARM* at 1 (each output held at its negated level), whatever DOOR and WIN* do."} />
          {status("ALARM", values.ALARM, false, "alarm sounding")}
          {showLow && status("ALARM*", values["ALARM*"], true, "alarm sounding")}
          <Read tex="$ALARM = \overline{EN^*}\,(DOOR + \overline{WIN^*})$, $\;ALARM^* = EN^* + \overline{DOOR}\,WIN^*$" />
        </>
      }
      tasks={[
        "Predict: with EN* = 1, can any setting of DOOR and WIN* make ALARM go high? Try all four.",
        "Set EN* = 0, then set WIN* = 0 (window open). Which levels do ALARM and ALARM* show? Are both asserted?",
        "Read the waveform: at every time where ALARM is high, check that ALARM* is low. Why do they describe the same event?",
        "Explain the bubbles: why do the gate inputs fed by EN* and WIN* carry a bubble, while DOOR does not (bubble-to-bubble matching)?",
      ]}
    />
  );
}
