"use client";

import { useMemo, useState, type ReactNode } from "react";
import { evalCircuit, minimalCover, minimalSop, productString, type Bit, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, KMapSvg, Read, Toggle, VizFrame, bitsOf, valColor, valueOf } from "../kit";

// Interactive figures for the comb-blocks lesson, chosen by id (see LessonSection.visuals).
export default function CombBlocksVisual({ id }: { id: string }) {
  switch (id) {
    case "mux-path":
      return <MuxPath />;
    case "mux-function":
      return <MuxFunction />;
    case "decoder-lab":
      return <DecoderLab />;
    case "priority-encoder":
      return <PriorityEncoder />;
    case "signed-compare":
      return <SignedCompare />;
    case "seg7-decoder":
      return <Seg7Decoder />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Small SVG pieces

const MONO = "var(--font-geist-mono), Consolas, monospace";

function T({ x, y, children, anchor = "start", size = 12, bold, color = "var(--text)" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number; bold?: boolean; color?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={bold ? 700 : 400} fill={color} style={{ fontFamily: MONO }}>
      {children}
    </text>
  );
}

/** Clickable bit box centred at (x, y). */
function BitBox({ x, y, v, onClick, size = 20 }: { x: number; y: number; v: Val; onClick?: () => void; size?: number }) {
  const on = v === 1;
  return (
    <g onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}>
      <rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx={4} fill={on ? "var(--good)" : "var(--surface)"} stroke={on ? "var(--good)" : valColor(v)} strokeWidth={1.5} />
      <T x={x} y={y + 4} anchor="middle" bold color={on ? "var(--surface)" : "var(--text)"}>
        {v === null ? "?" : String(v)}
      </T>
    </g>
  );
}

const Wire = ({ pts, v, width = 2, dash }: { pts: [number, number][]; v?: Val | "path"; width?: number; dash?: string }) => (
  <polyline
    points={pts.map((p) => p.join(",")).join(" ")}
    fill="none"
    stroke={v === "path" ? "var(--accent)" : v === undefined ? "var(--text)" : valColor(v)}
    strokeWidth={v === "path" ? width + 1.5 : width}
    strokeDasharray={dash}
    strokeLinejoin="round"
  />
);

const toggleBit = (bits: Bit[], i: number): Bit[] => bits.map((b, j) => (j === i ? ((1 - b) as Bit) : b));
const sub = (name: string, k: number) => `${name}_{${k}}`;

// ---------------------------------------------------------------------------------------------
// 1. Multiplexer: the selected data path lights up

function muxGates(n: number): CircuitSpec {
  const k = Math.log2(n);
  const sels = Array.from({ length: k }, (_, j) => `S${k - 1 - j}`);
  const data = Array.from({ length: n }, (_, i) => `I${i}`);
  return {
    inputs: [...sels, ...data],
    gates: [
      ...data.map((d, i) => ({ id: `t${i}`, type: "AND" as const, in: [...sels.map((s, j) => (((i >> (k - 1 - j)) & 1) === 1 ? s : `!${s}`)), d] })),
      { id: "Y", type: "OR" as const, in: data.map((_, i) => `t${i}`) },
    ],
    outputs: ["Y"],
  };
}

function MuxPath() {
  const [n, setN] = useState<2 | 4 | 8>(4);
  const [data, setData] = useState<Bit[]>([0, 1, 1, 0, 1, 0, 0, 1]);
  const [sel, setSel] = useState(2);
  const [gates, setGates] = useState(false);
  const k = Math.log2(n);
  const s = sel % n;
  const sBits = bitsOf(s, k);
  const y = data[s];
  const spec = useMemo(() => muxGates(n), [n]);
  const env: Record<string, Bit> = {};
  sBits.forEach((b, j) => (env[`S${k - 1 - j}`] = b));
  data.slice(0, n).forEach((b, i) => (env[`I${i}`] = b));
  const values = evalCircuit(spec, env);

  const pitch = n === 8 ? 30 : 38;
  const top = 26;
  const H = top + n * pitch + 96;
  const muxX = 170;
  const muxW = 70;
  const muxTop = top - 6;
  const muxBot = top + n * pitch + 6;
  const inset = 18;
  const iy = (i: number) => top + pitch / 2 + i * pitch;
  const midY = (muxTop + muxBot) / 2;
  const selX = (j: number) => muxX + (muxW * (j + 1)) / (k + 1);
  const selBotY = (x: number) => muxBot - (inset * (x - muxX)) / muxW;

  const block = (
    <svg viewBox={`0 0 400 ${H}`} className="viz-svg" role="img" aria-label="Multiplexer">
      {data.slice(0, n).map((v, i) => (
        <g key={i}>
          <T x={22} y={iy(i) + 4} anchor="end" bold>{`I${i}`}</T>
          <BitBox x={42} y={iy(i)} v={v} onClick={() => setData(toggleBit(data, i))} />
          <Wire pts={[[52, iy(i)], [muxX, iy(i)]]} v={i === s ? "path" : v} />
          <T x={muxX + 5} y={iy(i) + 4} size={10} color="var(--muted)">{String(i)}</T>
        </g>
      ))}
      <polygon points={`${muxX},${muxTop} ${muxX + muxW},${muxTop + inset} ${muxX + muxW},${muxBot - inset} ${muxX},${muxBot}`} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
      <Wire pts={[[muxX + 14, iy(s)], [muxX + muxW - 8, midY]]} v="path" />
      <circle cx={muxX + 14} cy={iy(s)} r={3.5} fill="var(--accent)" />
      <T x={muxX + muxW / 2 + 4} y={midY + 30} anchor="middle" size={11} color="var(--muted)">{`${n}:1`}</T>
      <Wire pts={[[muxX + muxW, midY], [330, midY]]} v={y} width={2.6} />
      <T x={338} y={midY - 14} bold>Y</T>
      <BitBox x={346} y={midY} v={y} />
      {sBits.map((b, j) => {
        const x = selX(j);
        const yy = muxBot + 40;
        return (
          <g key={j}>
            <Wire pts={[[x, selBotY(x)], [x, yy - 10]]} v={b} />
            <BitBox x={x} y={yy} v={b} onClick={() => setSel(s ^ (1 << (k - 1 - j)))} />
            <T x={x} y={yy + 26} anchor="middle" bold>{`S${k - 1 - j}`}</T>
          </g>
        );
      })}
    </svg>
  );

  const terms = Array.from({ length: n }, (_, i) => {
    const lits = bitsOf(i, k)
      .map((b, j) => `${sub("S", k - 1 - j)}${b ? "" : "'"}`)
      .join("");
    const t = `${lits}${sub("I", i)}`;
    return i === s ? `\\boxed{${t}}` : t;
  });

  return (
    <VizFrame
      title="Multiplexer: the select code picks one data path"
      hint="Click the data bits and the select bits. The highlighted path is the data line the select code connects to Y."
      onReset={() => {
        setN(4);
        setData([0, 1, 1, 0, 1, 0, 0, 1]);
        setSel(2);
        setGates(false);
      }}
      figure={gates ? <CircuitSvg circuit={spec} values={values} highlight={[`t${s}`]} onToggleInput={(name) => (name.startsWith("I") ? setData(toggleBit(data, Number(name.slice(1)))) : setSel(s ^ (1 << Number(name.slice(1)))))} /> : block}
      controls={
        <>
          <Choice
            value={n}
            onChange={(v) => setN(v)}
            options={[
              { v: 2, label: "2-to-1" },
              { v: 4, label: "4-to-1" },
              { v: 8, label: "8-to-1" },
            ]}
          />
          <Toggle label="Show the AND-OR gates inside" value={gates} onChange={setGates} />
        </>
      }
      readout={
        <>
          <Read label="Select" tex={`$${sBits.map((b, j) => `${sub("S", k - 1 - j)}`).join("")} = ${sBits.join("")}_2 = ${s}$ (${k} select bit${k > 1 ? "s" : ""} name ${n} inputs)`} />
          <Read label="Output" tex={`$Y = ${sub("I", s)} = ${y}$`} tone={y ? "good" : undefined} />
          {n <= 4 ? <Read label="Y =" tex={`$${terms.join(" + ")}$`} /> : <Read label="Y =" tex={`$\\sum_k m_k(S)\\,I_k$, here only $m_{${s}}$ is 1, so $Y = ${sub("I", s)}$`} />}
          <Read tex={`Only one product term can be 1: the select bits form one minterm, the ${gates ? "highlighted AND gate" : "boxed term"}.`} />
        </>
      }
      tasks={[
        "Predict: with the 4-to-1 MUX and $S_1S_0 = 11$, which input reaches Y? Click the select bits to check.",
        "Keep the select fixed and toggle the **other** data bits. Why does Y not change?",
        "Switch to 8-to-1. How many select bits appear, and why is it $\\log_2 8$?",
        "Turn on the gate view. Which AND gate has all its select inputs at 1? Explain why two AND gates can never be enabled together.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. MUX as a function generator

const FN_PRESETS: Record<3 | 4, { label: string; f: string }[]> = {
  3: [
    { label: "Majority", f: "00010111" },
    { label: "Odd parity", f: "01101001" },
    { label: "Σm(3,4,6,7)", f: "00011011" },
  ],
  4: [
    { label: "Σm(1,2,5,7,8,9,14)", f: "0110010111000010" },
    { label: "Σm(0,1,3,4,8,9,15)", f: "1101100011000001" },
    { label: "Even parity", f: "1001011001101001" },
  ],
};

function MuxFunction() {
  const [nv, setNv] = useState<3 | 4>(3);
  const [f, setF] = useState(FN_PRESETS[3][0].f);
  const [selCount, setSelCount] = useState(2);
  const [row, setRow] = useState(5);
  const vars = nv === 3 ? ["A", "B", "C"] : ["A", "B", "C", "D"];
  const r = nv - selCount; // residual variables per data line
  const resVars = vars.slice(selCount);
  const nLines = 1 << selCount;
  const lines = Array.from({ length: nLines }, (_, k) => {
    const ones: number[] = [];
    for (let j = 0; j < 1 << r; j++) if (f[(k << r) | j] === "1") ones.push(j);
    return r === 0 ? (ones.length ? "1" : "0") : minimalSop(resVars, ones);
  });
  const cur = Math.min(row, (1 << nv) - 1);
  const curLine = cur >> r;
  const ones = [...f].flatMap((c, m) => (c === "1" ? [m] : []));

  const rh = nv === 3 ? 26 : 19;
  const top = 30;
  const cw = 24;
  const tx = 12;
  const tableR = tx + (nv + 1) * cw;
  const muxX = tableR + 128;
  const muxW = 54;
  const rowsH = (1 << nv) * rh;
  const muxTop = top - 8;
  const muxBot = top + rowsH + 8;
  const inset = 16;
  const midY = (muxTop + muxBot) / 2;
  const pinY = (k: number) => top + ((k + 0.5) * rowsH) / nLines;
  const W = muxX + muxW + 80;
  const H = muxBot + 64;
  const selX = (j: number) => muxX + (muxW * (j + 1)) / (selCount + 1);
  const toggleF = (m: number) => setF(f.slice(0, m) + (f[m] === "1" ? "0" : "1") + f.slice(m + 1));
  const fCur = f[cur] === "1" ? 1 : 0;

  const svg = (
    <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Truth table feeding a multiplexer">
      {[...vars, "F"].map((v, j) => (
        <T key={v} x={tx + j * cw + cw / 2} y={top - 12} anchor="middle" bold color={j < selCount ? "var(--accent)" : "var(--text)"}>
          {v}
        </T>
      ))}
      {Array.from({ length: nLines }, (_, k) => (
        <rect key={k} x={tx - 4} y={top + k * (1 << r) * rh} width={tableR - tx + 8} height={(1 << r) * rh} fill={k % 2 ? "var(--surface)" : "var(--accent-soft)"} opacity={0.8} rx={3} />
      ))}
      {Array.from({ length: 1 << nv }, (_, m) => {
        const y = top + m * rh + rh / 2 + 4;
        const bits = bitsOf(m, nv);
        return (
          <g key={m}>
            {m === cur && <rect x={tx - 4} y={top + m * rh} width={tableR - tx + 8} height={rh} fill="none" stroke="var(--accent)" strokeWidth={2} rx={3} />}
            <g onClick={() => setRow(m)} style={{ cursor: "pointer" }}>
              <rect x={tx} y={top + m * rh} width={nv * cw} height={rh} fill="transparent" />
              {bits.map((b, j) => (
                <T key={j} x={tx + j * cw + cw / 2} y={y} anchor="middle" color={j < selCount ? "var(--accent)" : "var(--text)"}>
                  {b}
                </T>
              ))}
            </g>
            <g onClick={() => toggleF(m)} style={{ cursor: "pointer" }}>
              <rect x={tx + nv * cw + 3} y={top + m * rh + 2} width={cw - 6} height={rh - 4} rx={3} fill={f[m] === "1" ? "var(--good)" : "var(--surface)"} stroke="var(--border)" />
              <T x={tx + nv * cw + cw / 2} y={y} anchor="middle" bold color={f[m] === "1" ? "var(--surface)" : "var(--text)"}>
                {f[m]}
              </T>
            </g>
          </g>
        );
      })}
      {lines.map((l, k) => (
        <g key={k}>
          <Wire pts={[[tableR + 6, pinY(k)], [muxX, pinY(k)]]} v={k === curLine ? "path" : undefined} width={1.4} />
          <rect x={tableR + 10} y={pinY(k) - 9} width={Math.max(18, l.length * 7.4 + 8)} height={18} rx={4} fill="var(--surface-2)" />
          <T x={tableR + 14} y={pinY(k) + 4} bold color={k === curLine ? "var(--accent)" : "var(--text)"}>
            {l}
          </T>
          <T x={muxX + 4} y={pinY(k) + 4} size={9} color="var(--muted)">{String(k)}</T>
        </g>
      ))}
      <polygon points={`${muxX},${muxTop} ${muxX + muxW},${muxTop + inset} ${muxX + muxW},${muxBot - inset} ${muxX},${muxBot}`} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
      <Wire pts={[[muxX + 12, pinY(curLine)], [muxX + muxW - 6, midY]]} v="path" />
      <T x={muxX + muxW / 2 + 4} y={midY + 26} anchor="middle" size={10} color="var(--muted)">{`${nLines}:1`}</T>
      <Wire pts={[[muxX + muxW, midY], [muxX + muxW + 30, midY]]} v={fCur as Bit} width={2.4} />
      <T x={muxX + muxW + 34} y={midY - 12} bold>F</T>
      <BitBox x={muxX + muxW + 46} y={midY} v={fCur as Bit} />
      {vars.slice(0, selCount).map((v, j) => {
        const x = selX(j);
        const yb = muxBot - (inset * (x - muxX)) / muxW;
        return (
          <g key={v}>
            <line x1={x} y1={yb} x2={x} y2={muxBot + 22} stroke="var(--accent)" strokeWidth={1.6} />
            <T x={x} y={muxBot + 36} anchor="middle" bold color="var(--accent)">
              {v}
            </T>
          </g>
        );
      })}
    </svg>
  );

  const modes =
    nv === 3
      ? [
          { v: 3, label: "8-to-1 (A,B,C select)" },
          { v: 2, label: "4-to-1 (A,B select)" },
          { v: 1, label: "2-to-1 (A select)" },
        ]
      : [
          { v: 3, label: "8-to-1 (A,B,C select)" },
          { v: 2, label: "4-to-1 (A,B select)" },
        ];

  return (
    <VizFrame
      title="A multiplexer as a function generator"
      hint="Click an F cell to change the function, or a row's input bits to apply that input. Each shaded block of rows is handled by one data line."
      onReset={() => {
        setNv(3);
        setF(FN_PRESETS[3][0].f);
        setSelCount(2);
        setRow(5);
      }}
      figure={svg}
      controls={
        <>
          <Choice
            value={nv}
            onChange={(v) => {
              setNv(v);
              setF(FN_PRESETS[v][0].f);
              setSelCount(2);
            }}
            options={[
              { v: 3, label: "F(A,B,C)" },
              { v: 4, label: "F(A,B,C,D)" },
            ]}
          />
          <Choice value={selCount} onChange={setSelCount} options={modes} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            {FN_PRESETS[nv].map((p) => (
              <button key={p.label} className={`chip ${p.f === f ? "on" : ""}`} onClick={() => setF(p.f)}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
      readout={
        <>
          <Read label="F =" tex={`$\\sum m(${ones.join(",") || "\\,"})$, minimal SOP **${minimalSop(vars, ones)}**`} />
          <Read
            label="Rule"
            tex={
              r === 0
                ? "All variables on the selects: each data line is the truth-table value (0 or 1)."
                : r === 1
                  ? `Pair the rows by ${resVars[0]}: $00 \\to 0$, $11 \\to 1$, $01 \\to$ ${resVars[0]}, $10 \\to$ ${resVars[0]}'.`
                  : `Each data line is the residual function of ${resVars.join(", ")} for its block of rows.`
            }
          />
          {lines.map((l, k) => (
            <Read key={k} label={`I${k}`} tex={`${vars.slice(0, selCount).join("")} = ${bitsOf(k, selCount).join("")}: **${l}**`} tone={k === curLine ? "good" : undefined} />
          ))}
          <Read label="Now" tex={`input ${bitsOf(cur, nv).join("")} selects $I_{${curLine}}$ = ${lines[curLine]}, so F = **${fCur}**`} />
        </>
      }
      tasks={[
        "Predict: for the Majority preset with a 4-to-1 MUX, what goes on $I_1$ (rows 010, 011)? Check the label.",
        "Change one F cell inside a block and watch only that block's data line change. Why can a data line never need more than $v$ or $v'$ when one variable is left over?",
        "Switch to the 2-to-1 MUX. The data lines become 2-variable functions: compare them with the halves of the K-map of F.",
        "Pick **Even parity** for 4 variables. Its K-map has no groups at all, yet the 8-to-1 MUX needs only D and D'. Explain.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Decoder with enable, active-low option and decoder + OR function builder

function DecoderLab() {
  const [n, setN] = useState<2 | 3>(3);
  const [inp, setInp] = useState(5);
  const [en, setEn] = useState<Bit>(1);
  const [low, setLow] = useState(false);
  const [conn, setConn] = useState<number[]>([1, 2, 4, 7]);
  const N = 1 << n;
  const idx = inp % N;
  const inBits = bitsOf(idx, n);
  const vars = n === 3 ? ["A", "B", "C"] : ["A", "B"];
  const d = Array.from({ length: N }, (_, k) => (en && k === idx ? 1 : 0)) as Bit[];
  const outV = d.map((x) => (low ? ((1 - x) as Bit) : x));
  const used = conn.filter((k) => k < N).sort((a, b) => a - b);
  const F: Bit = used.some((k) => d[k] === 1) ? 1 : 0;

  const pitch = n === 3 ? 30 : 40;
  const top = 24;
  const bx = 110;
  const bw = 100;
  const bh = N * pitch + 10;
  const oy = (k: number) => top + 5 + pitch / 2 + k * pitch;
  const iy = (j: number) => top + bh / 2 + (j - (n - 1) / 2) * 40;
  const gx = 360;
  const gy = top + bh / 2;
  const gh = Math.max(40, used.length * 12 + 16);
  const H = top + bh + 80;

  const lit = (k: number) => d[k] === 1;
  const svg = (
    <svg viewBox={`0 0 470 ${H}`} className="viz-svg" role="img" aria-label="Decoder">
      {inBits.map((b, j) => (
        <g key={j}>
          <T x={26} y={iy(j) + 4} anchor="end" bold>{vars[j]}</T>
          <BitBox x={46} y={iy(j)} v={b} onClick={() => setInp(idx ^ (1 << (n - 1 - j)))} />
          <Wire pts={[[56, iy(j)], [bx, iy(j)]]} v={b} />
          <T x={bx + 5} y={iy(j) + 4} size={10} color="var(--muted)">{`i${n - 1 - j}`}</T>
        </g>
      ))}
      <rect x={bx} y={top} width={bw} height={bh} rx={5} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
      <T x={bx + bw / 2} y={top + bh / 2 - 6} anchor="middle" bold size={11}>{`${n}-to-${N}`}</T>
      <T x={bx + bw / 2} y={top + bh / 2 + 10} anchor="middle" bold size={11}>decoder</T>
      <Wire pts={[[bx + bw / 2, top + bh], [bx + bw / 2, top + bh + 22]]} v={en} />
      <BitBox x={bx + bw / 2} y={top + bh + 32} v={en} onClick={() => setEn((1 - en) as Bit)} />
      <T x={bx + bw / 2 + 16} y={top + bh + 36} bold>EN</T>
      <T x={bx + bw / 2} y={top + bh - 5} anchor="middle" size={10} color="var(--muted)">en</T>
      {d.map((x, k) => {
        const y = oy(k);
        const c = used.includes(k);
        return (
          <g key={k}>
            <T x={bx + bw - 5} y={y + 4} anchor="end" size={10} color="var(--muted)">{`d${k}`}</T>
            {low && <circle cx={bx + bw + 4} cy={y} r={4} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />}
            <Wire pts={[[bx + bw + (low ? 8 : 0), y], [bx + bw + 40, y]]} v={outV[k]} />
            <g onClick={() => setConn(c ? conn.filter((q) => q !== k) : [...conn, k])} style={{ cursor: "pointer" }}>
              <circle cx={bx + bw + 52} cy={y} r={10} fill={lit(k) ? "var(--warn)" : "var(--surface)"} stroke={c ? "var(--accent)" : "var(--border)"} strokeWidth={c ? 2.5 : 1.5} />
              <T x={bx + bw + 52} y={y + 4} anchor="middle" size={10} bold color={lit(k) ? "var(--surface)" : "var(--text)"}>
                {String(outV[k])}
              </T>
            </g>
            {c && <Wire pts={[[bx + bw + 62, y], [gx - 30, y], [gx - 30, gy - gh / 2 + 10 + used.indexOf(k) * 12], [gx + 2, gy - gh / 2 + 10 + used.indexOf(k) * 12]]} v={outV[k]} width={1.4} />}
          </g>
        );
      })}
      {used.length > 0 && (
        <g>
          {low ? (
            <path d={`M${gx},${gy - gh / 2} H${gx + 22} A${30},${gh / 2} 0 0 1 ${gx + 22},${gy + gh / 2} H${gx} Z`} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
          ) : (
            <path d={`M${gx},${gy - gh / 2} Q${gx + 30},${gy - gh / 2} ${gx + 52},${gy} Q${gx + 30},${gy + gh / 2} ${gx},${gy + gh / 2} Q${gx + 14},${gy} ${gx},${gy - gh / 2} Z`} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
          )}
          {low && <circle cx={gx + 56} cy={gy} r={4} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />}
          <Wire pts={[[gx + 60, gy], [gx + 80, gy]]} v={F} width={2.4} />
          <T x={gx + 66} y={gy - 10} bold>F</T>
          <BitBox x={gx + 92} y={gy} v={F} />
          <T x={gx + 26} y={gy + gh / 2 + 16} anchor="middle" size={10} color="var(--muted)">{low ? "NAND" : "OR"}</T>
        </g>
      )}
    </svg>
  );
  const minterm = inBits.map((b, j) => `${vars[j]}${b ? "" : "'"}`).join("");
  return (
    <VizFrame
      title="Decoder: one-hot outputs, enable, and decoder + OR"
      hint="Click the input and EN bits. Click an output lamp to connect it to (or remove it from) the gate that forms F."
      onReset={() => {
        setN(3);
        setInp(5);
        setEn(1);
        setLow(false);
        setConn([1, 2, 4, 7]);
      }}
      figure={svg}
      controls={
        <>
          <Choice
            value={n}
            onChange={setN}
            options={[
              { v: 2, label: "2-to-4" },
              { v: 3, label: "3-to-8" },
            ]}
          />
          <Toggle label="Active-low outputs (selected output = 0), gate becomes NAND" value={low} onChange={setLow} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <button className="chip" onClick={() => setConn(n === 3 ? [1, 2, 4, 7] : [1, 2])}>
              Odd parity
            </button>
            <button className="chip" onClick={() => setConn(n === 3 ? [3, 5, 6, 7] : [3])}>
              {n === 3 ? "Majority (carry)" : "AND"}
            </button>
            <button className="chip" onClick={() => setConn([])}>
              Clear
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="Input" tex={`$${inBits.join("")}_2 = ${idx}$ ${en ? `→ output ${idx} is selected: $d_{${idx}} = m_{${idx}} = ${minterm}$` : "→ **EN = 0**: no output is selected"}`} tone={en ? "good" : "warn"} />
          <Read label="Outputs" tex={`$d_{${N - 1}} \\dots d_0$ = ${[...d].reverse().join("")}${low ? ` (pins show the complement ${[...outV].reverse().join("")})` : ""} — ${en ? "one-hot" : "all zero"}`} />
          <Read label="F =" tex={used.length ? `$\\sum m(${used.join(",")})$ = **${minimalSop(vars, used)}**` : "connect some outputs"} />
          {low && used.length > 0 && <Read tex="Active-low outputs into a **NAND** still give $\\sum m$: the NAND output is 1 when any connected (low) output is selected." />}
          <Read label="F now" tex={`**${F}**`} tone={F ? "good" : undefined} />
        </>
      }
      tasks={[
        "Predict which lamp lights for $ABC = 110$, then click the inputs to check. Now set EN = 0: what happens to every output?",
        "The preset connects $d_1, d_2, d_4, d_7$. Step through all eight inputs: F is the odd-parity (full-adder sum) function. Read the readout's minimal SOP.",
        "Connect $d_3, d_5, d_6, d_7$ instead: which full-adder output is this?",
        "Turn on active-low outputs. The pins now idle at 1. Why must the OR gate become a NAND for F to stay the same?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Plain encoder vs priority encoder

function PriorityEncoder() {
  const [ins, setIns] = useState<Bit[]>([0, 0, 1, 0, 1, 1, 0, 0]); // I7 … I0
  const [hiFirst, setHiFirst] = useState(true);
  const active = ins.flatMap((b, j) => (b ? [7 - j] : []));
  const winner = active.length ? (hiFirst ? Math.max(...active) : Math.min(...active)) : -1;
  const plain = active.reduce((a, i) => a | i, 0);
  const V: Bit = active.length ? 1 : 0;
  const pr = winner < 0 ? 0 : winner;
  const top = 20;
  const pitch = 30;
  const H = top + 8 * pitch + 20;
  const iy = (i: number) => top + pitch / 2 + (7 - i) * pitch;
  const bx = 130;
  const outs = (val: number, y0: number, label: string, ok: boolean) => (
    <g>
      <T x={300} y={y0 - 14} bold size={11} color="var(--muted)">
        {label}
      </T>
      {bitsOf(val, 3).map((b, j) => (
        <g key={j}>
          <BitBox x={312 + j * 26} y={y0} v={b} />
          <T x={312 + j * 26} y={y0 + 24} anchor="middle" size={10} color="var(--muted)">{`Y${2 - j}`}</T>
        </g>
      ))}
      <T x={312 + 3 * 26} y={y0 + 4} bold color={ok ? "var(--good)" : "var(--bad)"}>
        {ok ? `= ${val} ✓` : `= ${val} ✗`}
      </T>
    </g>
  );
  const svg = (
    <svg viewBox={`0 0 460 ${H}`} className="viz-svg" role="img" aria-label="Priority encoder">
      {Array.from({ length: 8 }, (_, i) => {
        const v = ins[7 - i];
        const masked = v === 1 && i !== winner;
        return (
          <g key={i}>
            <T x={24} y={iy(i) + 4} anchor="end" bold>{`I${i}`}</T>
            <BitBox x={44} y={iy(i)} v={v} onClick={() => setIns(toggleBit(ins, 7 - i))} />
            <Wire pts={[[54, iy(i)], [bx, iy(i)]]} v={i === winner ? "path" : v} dash={masked ? "5 4" : undefined} />
            {masked && (
              <T x={64} y={iy(i) - 5} size={9} color="var(--warn)">
                masked
              </T>
            )}
          </g>
        );
      })}
      <rect x={bx} y={top} width={130} height={8 * pitch} rx={5} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
      <T x={bx + 65} y={top + 4 * pitch - 6} anchor="middle" bold size={11}>
        8-to-3
      </T>
      <T x={bx + 65} y={top + 4 * pitch + 10} anchor="middle" bold size={11}>
        encoder
      </T>
      {outs(pr, top + 40, "priority encoder", V === 1)}
      {outs(plain, top + 120, "plain OR encoder", active.length <= 1)}
      <T x={300} y={top + 196} bold size={11} color="var(--muted)">
        valid
      </T>
      <BitBox x={312} y={top + 214} v={V} />
      <T x={330} y={top + 218} size={11}>
        V = OR of inputs
      </T>
    </svg>
  );
  const codes = active
    .slice()
    .sort((a, b) => b - a)
    .map((i) => i.toString(2).padStart(3, "0"));
  return (
    <VizFrame
      title="Encoder vs priority encoder"
      hint="Click the inputs. The winning input's path is highlighted; lower-priority active inputs are masked (dashed)."
      onReset={() => {
        setIns([0, 0, 1, 0, 1, 1, 0, 0]);
        setHiFirst(true);
      }}
      figure={svg}
      controls={
        <Choice
          value={hiFirst ? "hi" : "lo"}
          onChange={(v) => setHiFirst(v === "hi")}
          options={[
            { v: "hi", label: "$I_7$ has priority" },
            { v: "lo", label: "$I_0$ has priority" },
          ]}
        />
      }
      readout={
        <>
          <Read label="Active" tex={active.length ? active.map((i) => `$I_{${i}}$`).join(", ") : "none"} />
          <Read label="Priority" tex={winner < 0 ? "no input: $Y = 000$ but $V = 0$ marks it invalid" : `winner $I_{${winner}}$ → $Y = ${pr.toString(2).padStart(3, "0")}$, $V = 1$`} tone="good" />
          <Read
            label="Plain OR"
            tex={active.length > 1 ? `ORs the codes ${codes.join(" + ")} = **${plain.toString(2).padStart(3, "0")}** (names $I_{${plain}}$: wrong)` : `$Y = ${plain.toString(2).padStart(3, "0")}$ (fine for one-hot input)`}
            tone={active.length > 1 ? "bad" : undefined}
          />
          <Read label="Plain" tex="$Y_2 = I_4 + I_5 + I_6 + I_7$, $Y_1 = I_2 + I_3 + I_6 + I_7$, $Y_0 = I_1 + I_3 + I_5 + I_7$" />
        </>
      }
      tasks={[
        "Predict both outputs for the starting inputs ($I_5, I_3, I_2$ active), then check. Which input does the plain encoder's code point to?",
        "Make the input one-hot (a single 1). Do the two encoders agree now?",
        "Clear every input. Both encoders output 000: what tells you that this does not mean $I_0$?",
        "Switch priority to $I_0$ and repeat the first task. Exam questions state which end wins; read it.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Signed comparison from an unsigned comparator + 4-to-1 MUX (PYP 2021-22 Q4)

const twos = (bits: Bit[]) => valueOf(bits) - (bits[0] ? 1 << bits.length : 0);

function SignedCompare() {
  const [X, setX] = useState<Bit[]>([1, 1, 1, 0, 0]);
  const [Y, setY] = useState<Bit[]>([0, 1, 0, 0, 1]);
  const [rel, setRel] = useState<"ge" | "lt">("ge");
  const xl = valueOf(X.slice(1));
  const yl = valueOf(Y.slice(1));
  const U: Bit = xl >= yl ? 1 : 0;
  const Un = (1 - U) as Bit;
  const S = X[0] * 2 + Y[0];
  const D: Bit[] = rel === "ge" ? [U, 1, 0, U] : [Un, 0, 1, Un];
  const labels = rel === "ge" ? ["U", "1", "0", "U"] : ["U'", "0", "1", "U'"];
  const W = D[S];
  const xs = twos(X);
  const ys = twos(Y);
  const truth = rel === "ge" ? xs >= ys : xs < ys;
  const naive = rel === "ge" ? valueOf(X) >= valueOf(Y) : valueOf(X) < valueOf(Y);

  const cmpY = 40;
  const muxX = 300;
  const muxTop = 14;
  const pin = (k: number) => muxTop + 26 + k * 30;
  const muxBot = muxTop + 4 * 30 + 22;
  const svg = (
    <svg viewBox="0 0 450 230" className="viz-svg" role="img" aria-label="Signed comparator">
      <T x={14} y={cmpY + 16} size={11}>{`X[3:0]=${X.slice(1).join("")}`}</T>
      <T x={14} y={cmpY + 52} size={11}>{`Y[3:0]=${Y.slice(1).join("")}`}</T>
      <Wire pts={[[110, cmpY + 12], [130, cmpY + 12]]} />
      <Wire pts={[[110, cmpY + 48], [130, cmpY + 48]]} />
      <rect x={130} y={cmpY - 6} width={74} height={72} rx={5} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
      <T x={167} y={cmpY + 26} anchor="middle" bold size={11}>
        umc4
      </T>
      <T x={167} y={cmpY + 42} anchor="middle" size={10} color="var(--muted)">
        {`${xl} ≥ ${yl}?`}
      </T>
      <T x={208} y={cmpY + 22} bold size={11}>{`U=${U}`}</T>
      <Wire pts={[[204, cmpY + 30], [240, cmpY + 30]]} v={U} />
      {labels.map((l, k) => {
        const isU = l.startsWith("U");
        const v = D[k];
        return (
          <g key={k}>
            {isU ? (
              <>
                <Wire pts={[[240, cmpY + 30], [240, pin(k)], [muxX, pin(k)]]} v={k === S ? "path" : v} width={1.6} />
                {l === "U'" && <circle cx={muxX - 18} cy={pin(k)} r={4} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />}
              </>
            ) : (
              <>
                <Wire pts={[[muxX - 30, pin(k)], [muxX, pin(k)]]} v={k === S ? "path" : v} width={1.6} />
                <T x={muxX - 34} y={pin(k) + 4} anchor="end" bold>
                  {l}
                </T>
              </>
            )}
            <T x={muxX + 4} y={pin(k) + 4} size={9} color="var(--muted)">{`D${k}`}</T>
          </g>
        );
      })}
      <polygon points={`${muxX},${muxTop} ${muxX + 56},${muxTop + 18} ${muxX + 56},${muxBot - 18} ${muxX},${muxBot}`} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.8} />
      <Wire pts={[[muxX + 18, pin(S)], [muxX + 50, (muxTop + muxBot) / 2]]} v="path" />
      <Wire pts={[[muxX + 56, (muxTop + muxBot) / 2], [muxX + 90, (muxTop + muxBot) / 2]]} v={W} width={2.4} />
      <T x={muxX + 66} y={(muxTop + muxBot) / 2 - 12} bold>{rel === "ge" ? "W" : "L"}</T>
      <BitBox x={muxX + 104} y={(muxTop + muxBot) / 2} v={W} />
      <line x1={muxX + 28} y1={muxBot - 9} x2={muxX + 28} y2={muxBot + 26} stroke="var(--accent)" strokeWidth={1.6} />
      <T x={muxX + 28} y={muxBot + 42} anchor="middle" bold color="var(--accent)">{`S={X4,Y4}=${X[0]}${Y[0]}`}</T>
    </svg>
  );
  return (
    <VizFrame
      title="Signed comparison from an unsigned comparator and a MUX"
      hint="Click the bits of X and Y (bit 4 is the sign). The sign bits select which data line reaches the output."
      onReset={() => {
        setX([1, 1, 1, 0, 0]);
        setY([0, 1, 0, 0, 1]);
        setRel("ge");
      }}
      figure={svg}
      controls={
        <>
          <div className="small muted">X[4:0]</div>
          <BitRow bits={X} onChange={setX} labels={["X4", "X3", "X2", "X1", "X0"]} />
          <div className="small muted" style={{ marginTop: 12 }}>
            Y[4:0]
          </div>
          <BitRow bits={Y} onChange={setY} labels={["Y4", "Y3", "Y2", "Y1", "Y0"]} />
          <div style={{ marginTop: 14 }}>
            <Choice
              value={rel}
              onChange={setRel}
              options={[
                { v: "ge", label: "W = (X ≥ Y)" },
                { v: "lt", label: "L = (X < Y)" },
              ]}
            />
          </div>
        </>
      }
      readout={
        <>
          <Read label="Signed" tex={`$X = ${xs}$, $Y = ${ys}$ → ${rel === "ge" ? "$X \\ge Y$" : "$X < Y$"} is **${truth ? "true" : "false"}**`} />
          <Read label="Select" tex={`$S = ${X[0]}${Y[0]}$: ${S === 0 ? "both non-negative, lower bits decide" : S === 3 ? "both negative (same $-16$ weight), lower bits decide" : S === 1 ? "$X \\ge 0 > Y$: constant" : "$X < 0 \\le Y$: constant"}`} />
          <Read label="Output" tex={`$D_{${S}} = ${labels[S]} = ${W}$ ${W === (truth ? 1 : 0) ? "✓ matches" : "✗"}`} tone={W === (truth ? 1 : 0) ? "good" : "bad"} />
          <Read label="Naive" tex={`unsigned compare of all 5 bits ($${valueOf(X)}$ vs $${valueOf(Y)}$) says **${naive ? 1 : 0}**${naive !== truth ? ": wrong here" : ""}`} tone={naive !== truth ? "bad" : undefined} />
        </>
      }
      tasks={[
        "Predict W for $X = -4$ (11100) and $Y = +9$ (01001), the starting values. Which data line is selected, and does the comparator output matter?",
        "Make both numbers negative, e.g. $X = 11100$ ($-4$) and $Y = 11010$ ($-6$). Why is $U$ passed through **without** inversion?",
        "Find inputs where the naive unsigned comparison (readout) is wrong. Which select values do they always have?",
        "Switch to $X < Y$. Which data lines change, and why do $D_1$ and $D_2$ swap their constants?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 6. Seven-segment decoder

const SEG_BCD: Record<number, string> = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
const SEG_HEX: Record<number, string> = { ...SEG_BCD, 10: "abcefg", 11: "cdefg", 12: "adef", 13: "bcdeg", 14: "adefg", 15: "aefg" };
const SEG_POLY: Record<string, string> = {
  a: "26,12 94,12 84,24 36,24",
  b: "96,14 96,78 84,70 84,26",
  c: "96,86 96,150 84,140 84,94",
  d: "26,152 94,152 84,140 36,140",
  e: "24,86 24,150 36,140 36,94",
  f: "24,14 24,78 36,70 36,26",
  g: "26,82 36,74 84,74 94,82 84,90 36,90",
};

function Seg7Decoder() {
  const [inp, setInp] = useState(6);
  const [hex, setHex] = useState(false);
  const [seg, setSeg] = useState("e");
  const vars = ["W", "X", "Y", "Z"];
  const table = hex ? SEG_HEX : SEG_BCD;
  const pattern = table[inp] ?? "";
  const values = Array.from({ length: 16 }, (_, m) => (table[m] === undefined ? "x" : table[m].includes(seg) ? "1" : "0")).join("");
  const ones = [...values].flatMap((c, m) => (c === "1" ? [m] : []));
  const dcs = [...values].flatMap((c, m) => (c === "x" ? [m] : []));
  const cover = minimalCover(4, ones, dcs);
  const groups = cover.map((p) => productString(p, vars));
  const sop = minimalSop(vars, ones, dcs);
  const display = (
    <svg viewBox="0 0 120 166" className="viz-svg" style={{ maxWidth: 170 }} role="img" aria-label="Seven-segment display">
      {Object.entries(SEG_POLY).map(([k, p]) => (
        <g key={k} onClick={() => setSeg(k)} style={{ cursor: "pointer" }}>
          <polygon points={p} fill={pattern.includes(k) ? "var(--bad)" : "var(--surface)"} stroke={k === seg ? "var(--accent)" : "var(--border)"} strokeWidth={k === seg ? 2.5 : 1.2} />
        </g>
      ))}
      {Object.entries({ a: [60, 21], b: [90, 50], c: [90, 120], d: [60, 149], e: [30, 120], f: [30, 50], g: [60, 85] }).map(([k, [x, y]]) => (
        <T key={k} x={x} y={y} anchor="middle" size={9} color={pattern.includes(k) ? "var(--surface)" : "var(--muted)"}>
          {k}
        </T>
      ))}
    </svg>
  );
  return (
    <VizFrame
      title="Seven-segment decoder: seven K-maps sharing four inputs"
      hint="Set the input bits WXYZ, or click a K-map cell. Click a segment (or a chip) to see that segment's K-map and minimal SOP."
      onReset={() => {
        setInp(6);
        setHex(false);
        setSeg("e");
      }}
      figure={
        <div className="row" style={{ gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {display}
          <div style={{ flex: "1 1 220px", maxWidth: 300 }}>
            <KMapSvg vars={vars} values={values} groups={groups} showIndex onCellClick={(m) => setInp(m)} />
          </div>
        </div>
      }
      controls={
        <>
          <BitRow bits={bitsOf(inp, 4)} onChange={(b) => setInp(valueOf(b))} labels={vars} />
          <div style={{ marginTop: 14 }}>
            <Choice
              value={seg}
              onChange={setSeg}
              options={"abcdefg".split("").map((s) => ({ v: s, label: s }))}
            />
          </div>
          <Toggle label="Hex decoder (A–F shown, no don't cares)" value={hex} onChange={setHex} />
        </>
      }
      readout={
        <>
          <Read label="Input" tex={`$WXYZ = ${bitsOf(inp, 4).join("")}_2 = ${inp}$ → ${table[inp] === undefined ? "not a BCD digit (don't care, display undefined)" : `shows **${inp.toString(16).toUpperCase()}**, segments ${pattern}`}`} />
          <Read label={`seg ${seg}`} tex={`$\\sum m(${ones.join(",")})${dcs.length ? ` + d(${dcs.join(",")})` : ""}$`} />
          <Read label="Minimal" tex={`${seg} = **${sop}**`} tone="good" />
          <Read label="Now" tex={`segment ${seg} is ${table[inp] === undefined ? "a don't care" : pattern.includes(seg) ? "**lit (1)**" : "dark (0)"}`} />
        </>
      }
      tasks={[
        "Predict which segments light for input 0111, then set it. Is your display convention the same as the course's (7 = a, b, c)?",
        "Select segment e. The K-map uses the X cells (10–15) to make the corner group X'Z'. What would e be without the don't cares?",
        "Turn on the hex decoder. Why does every segment's SOP get longer?",
        "For a common-anode display the decoder must output 0 to light a segment. Which cells of the e K-map would you group instead?",
      ]}
    />
  );
}
