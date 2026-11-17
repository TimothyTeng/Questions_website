"use client";

// Interactive figures for the arithmetic lesson (Ch 4: adders, 2's complement, overflow, add/sub circuit,
// multiplication, BCD addition).

import { useState, type ReactNode } from "react";
import { evalCircuit, fromTwos, rowEnv, toBin, type Bit } from "@/lib/sc1005/logic";
import type { CircuitSpec } from "@/lib/sc1005/types";
import { BitRow, Choice, CircuitSvg, Read, Slider, TableView, Toggle, VizFrame, bitsOf, useStepper, valueOf } from "../kit";

export default function ArithmeticVisual({ id }: { id: string }) {
  switch (id) {
    case "full-adder":
      return <FullAdder />;
    case "ripple-adder":
      return <RippleAdder />;
    case "twos-converter":
      return <TwosConverter />;
    case "twos-wheel":
      return <TwosWheel />;
    case "addsub-circuit":
      return <AddSubCircuit />;
    case "mult-stepper":
      return <MultStepper />;
    case "bcd-adder":
      return <BcdAdder />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Helpers

const col = (v: number | null | undefined) => (v === 1 ? "var(--good)" : v === 0 ? "var(--muted)" : "var(--warn)");
const signed = (x: number, n: number) => fromTwos(toBin(x, n));
const maj = (a: number, b: number, c: number) => ((a & b) | (a & c) | (b & c)) as Bit;
const hex = (x: number, n: number) => (((x % 2 ** n) + 2 ** n) % 2 ** n).toString(16).toUpperCase().padStart(Math.ceil(n / 4), "0");
const sp4 = (s: string) => s.replace(/(.{4})(?=.)/g, "$1 ");

/** A small labelled bit cell for custom SVG diagrams. */
function Cell({ x, y, v, w = 18, label, hl }: { x: number; y: number; v: number | null; w?: number; label?: string; hl?: string }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 11} width={w} height={20} rx={4} fill={v === 1 ? "var(--good)" : "var(--surface)"} stroke={hl ?? col(v)} strokeWidth={hl ? 2.2 : 1.2} />
      <text x={x} y={y + 4} textAnchor="middle" className="cir-bit" fill={v === 1 ? "var(--surface)" : "var(--text)"}>
        {v === null ? "?" : v}
      </text>
      {label && (
        <text x={x} y={y - 15} textAnchor="middle" className="cir-pin">
          {label}
        </text>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------------------------
// 1. Full adder

const FA_HA: CircuitSpec = {
  inputs: ["A", "B", "Cin"],
  gates: [
    { id: "S1", type: "XOR", in: ["A", "B"], label: "HA1" },
    { id: "C1", type: "AND", in: ["A", "B"], label: "HA1" },
    { id: "S", type: "XOR", in: ["S1", "Cin"], label: "HA2" },
    { id: "C2", type: "AND", in: ["S1", "Cin"], label: "HA2" },
    { id: "Cout", type: "OR", in: ["C1", "C2"] },
  ],
  outputs: ["S", "Cout"],
  showNets: true,
};
const FA_SOP: CircuitSpec = {
  inputs: ["A", "B", "Cin"],
  gates: [
    { id: "S", type: "XOR", in: ["A", "B", "Cin"] },
    { id: "AB", type: "AND", in: ["A", "B"] },
    { id: "BCin", type: "AND", in: ["B", "Cin"] },
    { id: "ACin", type: "AND", in: ["A", "Cin"] },
    { id: "Cout", type: "OR", in: ["AB", "BCin", "ACin"] },
  ],
  outputs: ["S", "Cout"],
  showNets: true,
};

function FullAdder() {
  const [form, setForm] = useState<"ha" | "sop">("ha");
  const [ins, setIns] = useState<Record<string, Bit>>({ A: 1, B: 0, Cin: 1 });
  const c = form === "ha" ? FA_HA : FA_SOP;
  const v = evalCircuit(c, ins);
  const n = ins.A + ins.B + ins.Cin;
  const rows = Array.from({ length: 8 }, (_, m) => {
    const env = rowEnv(["A", "B", "Cin"], m);
    const s = env.A + env.B + env.Cin;
    return [env.A, env.B, env.Cin, s >> 1, s & 1];
  });
  return (
    <VizFrame
      title="Full adder: three bits in, a 2-bit count out"
      hint="Click A, B and Cin. Switch between the two-half-adder circuit and the sum-of-products circuit: the outputs never differ."
      onReset={() => setIns({ A: 1, B: 0, Cin: 1 })}
      figure={<CircuitSvg circuit={c} values={v} onToggleInput={(nm) => setIns((s) => ({ ...s, [nm]: (1 - s[nm]) as Bit }))} />}
      controls={
        <Choice
          value={form}
          onChange={setForm}
          options={[
            { v: "ha", label: "Two half adders + OR" },
            { v: "sop", label: "XOR + majority (SOP)" },
          ]}
        />
      }
      readout={
        <>
          <Read label="Count" tex={`$A + B + C_{in} = ${ins.A} + ${ins.B} + ${ins.Cin} = ${n} = (${n >> 1}\\,${n & 1})_2$`} />
          <Read label="Sum" tex={`$S = A \\oplus B \\oplus C_{in} = ${v.S}$ (odd number of 1s?)`} tone={v.S === 1 ? "good" : undefined} />
          {form === "ha" ? (
            <Read label="Carry" tex={`$C_{out} = C_1 + C_2 = AB + C_{in}(A \\oplus B) = ${v.C1} + ${v.C2} = ${v.Cout}$`} tone={v.Cout === 1 ? "good" : undefined} />
          ) : (
            <Read label="Carry" tex={`$C_{out} = AB + BC_{in} + AC_{in} = ${v.AB} + ${v.BCin} + ${v.ACin} = ${v.Cout}$`} tone={v.Cout === 1 ? "good" : undefined} />
          )}
          <TableView head={["A", "B", "Cin", "Cout", "S"]} rows={rows} highlightRow={ins.A * 4 + ins.B * 2 + ins.Cin} />
        </>
      }
      tasks={[
        "Predict $C_{out}$ and $S$ for $A = B = C_{in} = 1$, then check. Why is the answer the binary number 11?",
        "In the half-adder form, find an input where $C_1 = 1$ and one where $C_2 = 1$. Can both be 1 at once? (That is why an OR is enough, no adder needed.)",
        "Switch forms with $A = B = 1$: the SOP form has $C_{in}(A + B)$-style terms while the HA form uses $C_{in}(A \\oplus B)$. Explain why both give the same $C_{out}$.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Ripple-carry adder with carry propagation

function rippleSim(a: number, b: number, cin: Bit, pa: number, pb: number, pcin: Bit, T: number) {
  const N = 4;
  const bit = (x: number, i: number) => ((x >> i) & 1) as Bit;
  // Old steady state.
  const oldCo: Bit[] = [];
  const oldS: Bit[] = [];
  let c = pcin;
  for (let i = 0; i < N; i++) {
    oldS.push((bit(pa, i) ^ bit(pb, i) ^ c) as Bit);
    c = maj(bit(pa, i), bit(pb, i), c);
    oldCo.push(c);
  }
  const co: Bit[][] = [oldCo];
  const s: Bit[][] = [oldS];
  for (let t = 1; t <= T; t++) {
    const nc: Bit[] = [];
    const ns: Bit[] = [];
    for (let i = 0; i < N; i++) {
      const ci = i === 0 ? cin : co[t - 1][i - 1];
      ns.push((bit(a, i) ^ bit(b, i) ^ ci) as Bit);
      nc.push(maj(bit(a, i), bit(b, i), ci));
    }
    co.push(nc);
    s.push(ns);
  }
  return { co, s };
}

function RippleAdder() {
  const [a, setA] = useState(0b0111);
  const [b, setB] = useState(0b0001);
  const [cin, setCin] = useState<Bit>(0);
  const [prev, setPrev] = useState<{ a: number; b: number; cin: Bit }>({ a: 0, b: 0, cin: 0 });
  const [t, setT] = useState(0);
  const T = 5;
  const change = (na: number, nb: number, nc: Bit) => {
    setPrev({ a, b, cin });
    setA(na);
    setB(nb);
    setCin(nc);
    setT(0);
  };
  const sim = rippleSim(a, b, cin, prev.a, prev.b, prev.cin, T);
  const fin = { co: sim.co[T], s: sim.s[T] };
  const co = sim.co[t];
  const s = sim.s[t];
  let settle = T;
  while (settle > 0 && sim.co[settle - 1].every((x, i) => x === fin.co[i]) && sim.s[settle - 1].every((x, i) => x === fin.s[i])) settle--;
  const ok = co.every((x, i) => x === fin.co[i]) && s.every((x, i) => x === fin.s[i]);
  const sumNow = valueOf([co[3], ...[3, 2, 1, 0].map((i) => s[i])] as Bit[]);
  const W = 560;
  const fx = (i: number) => 70 + (3 - i) * 125;
  const carryIn = (i: number) => (i === 0 ? cin : co[i - 1]);
  const changed = (i: number) => t > 0 && sim.co[t][i] !== sim.co[t - 1][i];
  return (
    <VizFrame
      title="Ripple-carry adder: watch the carry propagate"
      hint="Set A, B and Cin, then step time one full-adder delay at a time. Amber outlines mark outputs that have not reached their final value yet."
      onReset={() => {
        setA(0b0111);
        setB(0b0001);
        setCin(0);
        setPrev({ a: 0, b: 0, cin: 0 });
        setT(0);
      }}
      figure={
        <svg viewBox={`0 0 ${W} 200`} className="viz-svg" role="img" aria-label="4-bit ripple-carry adder">
          {[3, 2, 1, 0].map((i) => {
            const x = fx(i);
            const sFinal = s[i] === fin.s[i];
            return (
              <g key={i}>
                <Cell x={x - 18} y={28} v={(a >> i) & 1} label={`A${i}`} />
                <Cell x={x + 18} y={28} v={(b >> i) & 1} label={`B${i}`} />
                <line x1={x - 18} y1={39} x2={x - 18} y2={70} stroke={col((a >> i) & 1)} strokeWidth={2} />
                <line x1={x + 18} y1={39} x2={x + 18} y2={70} stroke={col((b >> i) & 1)} strokeWidth={2} />
                <rect x={x - 40} y={70} width={80} height={56} rx={8} fill={t > i && t <= i + 1 ? "var(--accent-soft)" : "var(--surface)"} stroke="var(--text)" strokeWidth={1.6} />
                <text x={x} y={103} textAnchor="middle" className="cir-label">
                  FA{i}
                </text>
                <line x1={x} y1={126} x2={x} y2={150} stroke={col(s[i])} strokeWidth={2} />
                <Cell x={x} y={164} v={s[i]} label="" hl={sFinal ? undefined : "var(--warn)"} />
                <text x={x} y={192} textAnchor="middle" className="cir-pin">
                  S{i}
                </text>
                {/* carry out of stage i to the left */}
                <line x1={x - 40} y1={98} x2={x - 85} y2={98} stroke={col(co[i])} strokeWidth={changed(i) ? 3.4 : 2} strokeDasharray={co[i] === fin.co[i] ? undefined : "5 3"} />
                <Cell x={x - 62} y={98} v={co[i]} w={16} label={`C${i + 1}`} hl={co[i] === fin.co[i] ? undefined : "var(--warn)"} />
              </g>
            );
          })}
          <line x1={fx(0) + 40} y1={98} x2={fx(0) + 72} y2={98} stroke={col(carryIn(0))} strokeWidth={2} />
          <Cell x={fx(0) + 58} y={98} v={cin} w={16} label="C0" />
        </svg>
      }
      controls={
        <>
          <div className="small">A (A3..A0)</div>
          <BitRow bits={bitsOf(a, 4)} onChange={(x) => change(valueOf(x), b, cin)} />
          <div className="small" style={{ marginTop: 14 }}>
            B (B3..B0)
          </div>
          <BitRow bits={bitsOf(b, 4)} onChange={(x) => change(a, valueOf(x), cin)} />
          <div style={{ marginTop: 14 }}>
            <Toggle label="Carry in $C_0 = 1$" value={cin === 1} onChange={(on) => change(a, b, on ? 1 : 0)} />
          </div>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn small" disabled={t === 0} onClick={() => setT(t - 1)}>
              ◀
            </button>
            <button className="btn small primary" disabled={t >= T} onClick={() => setT(t + 1)}>
              Next delay ▶
            </button>
            <button className="btn small" onClick={() => setT(T)}>
              Settle
            </button>
            <span className="small muted">t = {t} × t_FA</span>
          </div>
        </>
      }
      readout={
        <>
          <Read label="Inputs" tex={`changed from ${toBin(prev.a, 4)} + ${toBin(prev.b, 4)} + ${prev.cin} to **${toBin(a, 4)} + ${toBin(b, 4)} + ${cin}** ($${a} + ${b} + ${cin} = ${a + b + cin}$)`} />
          <Read label="Outputs now" tex={`$C_4S_3S_2S_1S_0$ = **${co[3]} ${[3, 2, 1, 0].map((i) => s[i]).join("")}** = ${sumNow}`} tone={ok ? "good" : "warn"} />
          <Read label="Final" tex={`${fin.co[3]} ${[3, 2, 1, 0].map((i) => fin.s[i]).join("")} = ${a + b + cin}; reached after **${settle}** full-adder delay${settle === 1 ? "" : "s"}`} />
          <Read tex="Stage $i$ can only be correct one delay after its carry-in is correct, so the worst case for 4 bits is 4 delays (e.g. 0111 + 0001 or 1111 + 0001)." />
        </>
      }
      tasks={[
        "Predict: starting from 0000 + 0000, how many delays does 0111 + 0001 take to settle? Step through and watch the carry walk left one stage per delay.",
        "Look at t = 1 and t = 2 for that example: the sum reads 0110 and then 0100 before reaching 1000. Why must a register wait before loading the sum?",
        "Find an addition that settles after a single delay (no carry chain). What property of the bits makes it fast?",
        "Explain how a carry look-ahead adder would avoid the wait: what would it compute directly from the A and B bits?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. 2's complement converter (negation, shortcut, sign extension)

function TwosConverter() {
  const [n, setN] = useState<4 | 8>(8);
  const [x, setX] = useState(-60);
  const lo = -(2 ** (n - 1));
  const hi = 2 ** (n - 1) - 1;
  const setWidth = (w: 4 | 8) => {
    setN(w);
    setX((v) => Math.max(-(2 ** (w - 1)), Math.min(2 ** (w - 1) - 1, v)));
  };
  const mag = Math.abs(x);
  const magBits = toBin(mag, n);
  const ones = [...magBits].map((c) => (c === "1" ? "0" : "1")).join("");
  const twos = toBin(x, n);
  const firstOne = magBits.lastIndexOf("1"); // index (from the left) of the lowest 1
  const smOk = mag <= hi;
  const sm = smOk ? (x < 0 ? "1" : "0") + toBin(mag, n - 1) : "—";
  const ext = toBin(x, 2 * n);
  const weights = [...twos].map((c, i) => (c === "1" ? (i === 0 ? -(2 ** (n - 1)) : 2 ** (n - 1 - i)) : 0)).filter((w) => w !== 0);
  const CW = n === 8 ? 26 : 34;
  const X0 = 150;
  const row = (y: number, label: string, bits: string, color?: (i: number) => string | undefined) => (
    <g>
      <text x={X0 - 10} y={y + 4} textAnchor="end" className="cir-pin">
        {label}
      </text>
      {[...bits].map((c, i) => (
        <Cell key={i} x={X0 + CW / 2 + i * CW} y={y} v={Number(c)} w={CW - 4} hl={color?.(i)} />
      ))}
    </g>
  );
  const W = X0 + 2 * n * CW + 10;
  return (
    <VizFrame
      title="Negation in 2's complement: invert and add 1"
      hint="Drag the slider or click the bits of the 2's complement pattern. The bottom rows show the shortcut and sign extension."
      onReset={() => {
        setN(8);
        setX(-60);
      }}
      figure={
        <svg viewBox={`0 0 ${W} 250`} className="viz-svg" role="img" aria-label="2's complement conversion">
          {x < 0 ? (
            <>
              {row(30, `|x| = ${mag}`, magBits)}
              {row(70, "invert (1's comp.)", ones)}
              {row(110, "+1 → 2's comp.", twos)}
              {row(160, "shortcut", twos, (i) => (i >= firstOne ? "var(--accent)" : "var(--warn)"))}
              <text x={X0} y={188} className="cir-pin">
                blue: copied up to the first 1 from the right · amber: inverted
              </text>
            </>
          ) : (
            <>
              {row(30, `x = ${x}`, twos)}
              <text x={X0} y={70} className="cir-pin">
                non-negative: plain binary with sign bit 0
              </text>
            </>
          )}
          {row(222, `extend to ${2 * n} bits`, ext, (i) => (i < n ? "var(--accent)" : undefined))}
        </svg>
      }
      controls={
        <>
          <Choice
            value={n}
            onChange={setWidth}
            options={[
              { v: 4, label: "4 bits" },
              { v: 8, label: "8 bits" },
            ]}
          />
          <Slider label="Value $x$" value={x} min={lo} max={hi} step={1} onChange={setX} format={(v) => String(v)} />
          <div className="small">2&apos;s complement pattern (click a bit)</div>
          <BitRow bits={bitsOf(((x % 2 ** n) + 2 ** n) % 2 ** n, n)} onChange={(bits) => setX(signed(valueOf(bits), n))} size={n === 8 ? 26 : 30} />
        </>
      }
      readout={
        <>
          <Read label="2's complement" tex={`**${sp4(twos)}** = $\\text{${hex(x, n)}}_{16}$`} tone="good" />
          <Read label="Weights" tex={`$${weights.length ? weights.map((w, i) => (i > 0 && w > 0 ? `+${w}` : `${w}`)).join(" ") : "0"} = ${x}$`} />
          <Read label="Sign-magnitude" tex={smOk ? `${sp4(sm)}` : `not representable (magnitude ${mag} needs ${n} bits)`} />
          <Read label="Unsigned reading" tex={`the same pattern read unsigned is ${((x % 2 ** n) + 2 ** n) % 2 ** n}`} />
          <Read tex={`Range for ${n} bits: $${lo}$ to $${hi}$.${x === lo ? " **This is the most negative value: negating it gives the same pattern back.**" : ""}`} tone={x === lo ? "warn" : undefined} />
        </>
      }
      tasks={[
        "Predict the 8-bit pattern of −1 and of −128 before setting them. Which special patterns from the notes are they?",
        "Choose any negative value and check that the shortcut row (copy to the first 1, invert the rest) matches invert-and-add-1.",
        "Set $x = -8$ with 4 bits: negate it by hand. Why does the magnitude row already look negative?",
        "Watch the extension row: why must the new upper bits copy the sign bit rather than be 0?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. 4-bit number wheel and overflow

function TwosWheel() {
  const [x, setX] = useState(5); // code 0..15
  const [k, setK] = useState(4); // signed addend -8..7
  const [showUnsigned, setShowUnsigned] = useState(false);
  const xs = signed(x, 4);
  const res = (((x + k) % 16) + 16) % 16;
  const trueSum = xs + k;
  const V = trueSum > 7 || trueSum < -8;
  const kCode = ((k % 16) + 16) % 16;
  const carry = x + kCode > 15 ? 1 : 0;
  const R = 92;
  const cx = 130;
  const cy = 125;
  const ang = (code: number) => (code / 16) * 2 * Math.PI - Math.PI / 2;
  const pt = (code: number, r: number): [number, number] => [cx + r * Math.cos(ang(code)), cy + r * Math.sin(ang(code))];
  // Path of the move.
  const steps = Math.abs(k);
  const dir = k >= 0 ? 1 : -1;
  const arcPts: string[] = [];
  for (let s = 0; s <= steps * 4; s++) {
    const c = x + (dir * s) / 4;
    const [px, py] = pt(c, R - 30);
    arcPts.push(`${px},${py}`);
  }
  const bound = (between: number) => {
    const a = ((between - 0.5) / 16) * 2 * Math.PI - Math.PI / 2;
    return [cx + (R - 42) * Math.cos(a), cy + (R - 42) * Math.sin(a), cx + (R + 26) * Math.cos(a), cy + (R + 26) * Math.sin(a)];
  };
  const [b1x1, b1y1, b1x2, b1y2] = bound(8);
  const [b2x1, b2y1, b2x2, b2y2] = bound(0);
  return (
    <VizFrame
      title="The 4-bit 2's complement wheel: adding is turning, overflow is crossing 7 | −8"
      hint="Click a code on the wheel to choose the first operand, and use the slider for the amount to add (negative = subtract)."
      onReset={() => {
        setX(5);
        setK(4);
      }}
      figure={
        <svg viewBox="0 0 260 250" className="viz-svg" role="img" aria-label="Number wheel">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--border)" strokeWidth={1.2} />
          <line x1={b1x1} y1={b1y1} x2={b1x2} y2={b1y2} stroke="var(--bad)" strokeWidth={2.4} />
          <line x1={b2x1} y1={b2y1} x2={b2x2} y2={b2y2} stroke="var(--muted)" strokeWidth={1.6} strokeDasharray="4 3" />
          {steps > 0 && <polyline points={arcPts.join(" ")} fill="none" stroke={V ? "var(--bad)" : "var(--accent)"} strokeWidth={2.6} markerEnd="url(#arr)" />}
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill={V ? "var(--bad)" : "var(--accent)"} />
            </marker>
          </defs>
          {Array.from({ length: 16 }, (_, c) => {
            const [px, py] = pt(c, R);
            const [tx, ty] = pt(c, R + 17);
            const [ix, iy] = pt(c, R - 16);
            const isX = c === x;
            const isR = c === res;
            return (
              <g key={c} style={{ cursor: "pointer" }} onClick={() => setX(c)}>
                <circle cx={px} cy={py} r={isX || isR ? 8 : 5} fill={isR ? (V ? "var(--bad)" : "var(--good)") : isX ? "var(--accent)" : "var(--surface)"} stroke="var(--text)" strokeWidth={1} />
                <text x={tx} y={ty + 3} textAnchor="middle" className="cir-pin" style={{ fontSize: 8.5 }}>
                  {toBin(c, 4)}
                </text>
                <text x={ix} y={iy + 4} textAnchor="middle" className="cir-bit" fill={c >= 8 && !showUnsigned ? "var(--bad)" : "var(--text)"}>
                  {showUnsigned ? c : signed(c, 4)}
                </text>
              </g>
            );
          })}
          <text x={cx} y={cy + 4} textAnchor="middle" className="cir-label">
            {k >= 0 ? `+${k}` : k}
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Add $k$" value={k} min={-8} max={7} step={1} onChange={setK} format={(v) => String(v)} />
          <Toggle label="Label the wheel with unsigned values" value={showUnsigned} onChange={setShowUnsigned} />
          <div className="row" style={{ gap: 6 }}>
            <button className="btn small" onClick={() => setX((16 - x) % 16)}>
              Negate x (2&apos;s complement)
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label="Binary" tex={`${toBin(x, 4)} + ${toBin(kCode, 4)} = ${carry ? "1 " : ""}**${toBin(res, 4)}**${carry ? " (carry out dropped)" : ""}`} />
          <Read label="Signed" tex={`$${xs} + (${k}) = ${trueSum}$ but the 4-bit result reads $${signed(res, 4)}$`} tone={V ? "bad" : "good"} />
          <Read
            label="Overflow V"
            tex={V ? `**1**: the arrow crossed the red 7 | −8 boundary (true result ${trueSum} is outside −8…7)` : "**0**: result in range −8…7"}
            tone={V ? "bad" : "good"}
          />
          <Read label="Carry C4" tex={`${carry}${carry ? ": crossed 1111 → 0000 (unsigned wrap), which is **not** a signed overflow by itself" : ""}`} />
          <Read tex={`Operand signs: ${xs < 0 ? "−" : "+"} and ${k < 0 ? "−" : "+"}${(xs < 0) !== (k < 0) ? " (opposite signs: overflow impossible)" : ""}`} />
        </>
      }
      tasks={[
        "Predict: does $5 + 4$ overflow in 4 bits? Check where the arrow ends and what the result reads as.",
        "Pick a negative x and a positive k. Can you make the arrow cross the red boundary? Explain why operands of opposite sign never overflow.",
        "Find a sum with carry out C4 = 1 but no overflow (e.g. −3 + 5). Why is the carry out not the overflow flag?",
        "Select x = 1000 (−8) and press Negate. What happens, and why is −8 the exception?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 5. Add/subtract circuit

function AddSubCircuit() {
  const [X, setX] = useState(0b0011);
  const [Y, setY] = useState(0b0111);
  const [M, setM] = useState<Bit>(1);
  const bit = (v: number, i: number) => ((v >> i) & 1) as Bit;
  const B = Array.from({ length: 4 }, (_, i) => (bit(Y, i) ^ M) as Bit);
  const C: Bit[] = [M];
  const S: Bit[] = [];
  for (let i = 0; i < 4; i++) {
    S.push((bit(X, i) ^ B[i] ^ C[i]) as Bit);
    C.push(maj(bit(X, i), B[i], C[i]));
  }
  const V = (C[4] ^ C[3]) as Bit;
  const sv = valueOf([S[3], S[2], S[1], S[0]]);
  const xs = signed(X, 4);
  const ys = signed(Y, 4);
  const trueRes = M ? xs - ys : xs + ys;
  const fx = (i: number) => 110 + (3 - i) * 115;
  const xorShape = (x: number, y: number, v: Bit) => (
    <g>
      <circle cx={x} cy={y} r={11} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.4} />
      <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke="var(--text)" strokeWidth={1.2} />
      <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke="var(--text)" strokeWidth={1.2} />
      <line x1={x} y1={y + 11} x2={x} y2={y + 72} stroke={col(v)} strokeWidth={2} />
    </g>
  );
  return (
    <VizFrame
      title="One adder for both: the 2's complement add/subtract circuit"
      hint="Set X and Y with the bit buttons and choose Add (M = 0) or Subtract (M = 1). Green wires carry 1."
      onReset={() => {
        setX(0b0011);
        setY(0b0111);
        setM(1);
      }}
      figure={
        <svg viewBox="0 0 560 300" className="viz-svg" role="img" aria-label="4-bit add/subtract circuit">
          {/* M bus */}
          <line x1={40} y1={78} x2={540} y2={78} stroke={col(M)} strokeWidth={2} />
          <line x1={540} y1={78} x2={540} y2={175} stroke={col(M)} strokeWidth={2} />
          <Cell x={22} y={78} v={M} label="M" w={20} />
          {[3, 2, 1, 0].map((i) => {
            const x = fx(i);
            return (
              <g key={i}>
                <Cell x={x - 25} y={24} v={bit(X, i)} label={`X${i}`} />
                <Cell x={x + 25} y={24} v={bit(Y, i)} label={`Y${i}`} />
                <line x1={x + 25} y1={35} x2={x + 25} y2={67} stroke={col(bit(Y, i))} strokeWidth={2} />
                <line x1={x + 25 - 11} y1={78} x2={x + 25} y2={78} stroke={col(M)} strokeWidth={2} />
                {xorShape(x + 25, 78, B[i])}
                <text x={x + 42} y={110} className="cir-pin">
                  B{i}={B[i]}
                </text>
                <line x1={x - 25} y1={35} x2={x - 25} y2={150} stroke={col(bit(X, i))} strokeWidth={2} />
                <rect x={x - 42} y={150} width={84} height={50} rx={8} fill="var(--surface)" stroke="var(--text)" strokeWidth={1.6} />
                <text x={x} y={180} textAnchor="middle" className="cir-label">
                  FA{i}
                </text>
                <line x1={x} y1={200} x2={x} y2={232} stroke={col(S[i])} strokeWidth={2} />
                <Cell x={x} y={246} v={S[i]} label="" />
                <text x={x} y={274} textAnchor="middle" className="cir-pin">
                  S{i}
                </text>
                <line x1={x - 42} y1={175} x2={x - 73} y2={175} stroke={col(C[i + 1])} strokeWidth={2} />
                <Cell x={x - 58} y={175} v={C[i + 1]} w={16} label={`C${i + 1}`} />
              </g>
            );
          })}
          <line x1={fx(0) + 42} y1={175} x2={540} y2={175} stroke={col(M)} strokeWidth={2} />
          <Cell x={520} y={175} v={C[0]} w={16} label="C0 = M" />
          {/* overflow XOR */}
          <rect x={6} y={222} width={56} height={40} rx={6} fill={V ? "var(--bad-soft)" : "var(--surface)"} stroke={V ? "var(--bad)" : "var(--text)"} strokeWidth={1.6} />
          <text x={34} y={240} textAnchor="middle" className="cir-pin">
            C4⊕C3
          </text>
          <text x={34} y={255} textAnchor="middle" className="cir-bit" fill={V ? "var(--bad)" : "var(--text)"}>
            V={V}
          </text>
        </svg>
      }
      controls={
        <>
          <Choice
            value={M}
            onChange={setM}
            options={[
              { v: 0 as Bit, label: "Add (M = 0)" },
              { v: 1 as Bit, label: "Subtract (M = 1)" },
            ]}
          />
          <div className="small">X</div>
          <BitRow bits={bitsOf(X, 4)} onChange={(b) => setX(valueOf(b))} />
          <div className="small" style={{ marginTop: 14 }}>
            Y
          </div>
          <BitRow bits={bitsOf(Y, 4)} onChange={(b) => setY(valueOf(b))} />
        </>
      }
      readout={
        <>
          <Read label="Operation" tex={`$${xs} ${M ? "-" : "+"} (${ys}) = ${trueRes}$`} />
          <Read label="XOR outputs" tex={`B = Y ⊕ M = ${toBin(Y, 4)} ⊕ ${M ? "1111" : "0000"} = **${B.slice().reverse().join("")}**${M ? " (Y inverted)" : " (Y unchanged)"}, $C_0 = ${M}$`} />
          <Read label="Adder" tex={`${toBin(X, 4)} + ${B.slice().reverse().join("")} + ${M} = **${S.slice().reverse().join("")}**, carries $C_4..C_1$ = ${[C[4], C[3], C[2], C[1]].join("")}`} />
          <Read label="Signed result" tex={`${S.slice().reverse().join("")} = ${signed(sv, 4)}`} tone={V ? "bad" : "good"} />
          <Read label="Overflow" tex={`$V = C_4 \\oplus C_3 = ${C[4]} \\oplus ${C[3]} = ${V}$${V ? `: true result ${trueRes} is outside −8…7` : ""}`} tone={V ? "bad" : "good"} />
        </>
      }
      tasks={[
        "Predict every wire for $3 - 7$ (the preset): B inputs, carries and result. Then check against the diagram.",
        "Keep X and Y, switch to Add. Which wires change, and why does $C_0$ change too?",
        "Find a subtraction that overflows. Do the operands have the same or opposite signs? Confirm $V = C_4 \\oplus C_3$.",
        "Explain why inverting Y alone (1's complement) would make every difference 1 too small, and which wire fixes it.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 6. Shift-and-add multiplication stepper

function MultStepper() {
  const [m, setM] = useState(0b1011);
  const [q, setQ] = useState(0b1101);
  const [mode, setMode] = useState<"unsigned" | "signed">("signed");
  const { i: step, setI, controls } = useStepper(5);
  const sg = mode === "signed";
  const mv = sg ? signed(m, 4) : m;
  const qv = sg ? signed(q, 4) : q;
  const rows: { bits: string; val: number; note: string }[] = [];
  for (let i = 0; i < 4; i++) {
    const bi = (q >> i) & 1;
    let val = 0;
    let note = "";
    if (sg && i === 3) {
      val = bi ? -(mv * 8) : 0;
      note = bi ? `b3 = 1, weight −8: add 2's comp of M≪3 (${-(mv * 8)})` : "b3 = 0: add 0";
    } else {
      val = bi ? mv * 2 ** i : 0;
      note = bi ? `b${i} = 1: add M≪${i}${sg ? " (sign-extended)" : ""} (${val})` : `b${i} = 0: add 0`;
    }
    rows.push({ bits: toBin(val, 8), val, note });
  }
  const shown = rows.slice(0, step);
  const running = shown.reduce((s, r) => s + r.val, 0);
  const product = mv * qv;
  const X0 = 30;
  const CW = 22;
  const W = X0 + 8 * CW + 300;
  const H = 70 + 4 * 30 + 50;
  const bitsText = (y: number, bits: string, color: string, from = 0) =>
    [...bits].map((c, k) => (
      <text key={k} x={X0 + k * CW + CW / 2} y={y} textAnchor="middle" className="cir-label" fill={k < from ? "var(--muted)" : color} opacity={k < from ? 0.5 : 1}>
        {c}
      </text>
    ));
  return (
    <VizFrame
      title="Shift-and-add multiplication (unsigned and 2's complement)"
      hint="Choose a 4-bit multiplicand M and multiplier Q, pick the mode, and step through the partial products. Grey bits are sign extension."
      onReset={() => {
        setM(0b1011);
        setQ(0b1101);
        setMode("signed");
        setI(0);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg" role="img" aria-label="Multiplication layout">
          <text x={X0} y={22} className="cir-pin">
            M = {toBin(m, 4)} ({mv}) × Q = {toBin(q, 4)} ({qv})
          </text>
          {shown.map((r, k) => {
            const y = 60 + k * 30;
            const ext = sg && r.val < 0 && k < 3 ? 4 - k : 0;
            return (
              <g key={k}>
                {bitsText(y, r.bits, r.val < 0 && k === 3 && sg ? "var(--bad)" : "var(--text)", ext)}
                <text x={X0 + 8 * CW + 12} y={y} className="cir-pin">
                  {r.note}
                </text>
              </g>
            );
          })}
          {step === 0 && (
            <text x={X0} y={60} className="cir-pin">
              Press Next to add the partial product for each multiplier bit.
            </text>
          )}
          <line x1={X0} y1={60 + 4 * 30 - 18} x2={X0 + 8 * CW} y2={60 + 4 * 30 - 18} stroke="var(--text)" strokeWidth={1.2} />
          {bitsText(60 + 4 * 30 + 6, toBin(running, 8), step === 4 ? "var(--good)" : "var(--accent)")}
          <text x={X0 + 8 * CW + 12} y={60 + 4 * 30 + 6} className="cir-pin">
            {step === 4 ? `product = ${running}` : `running sum = ${running}`} {sg ? "(8-bit 2's comp)" : "(8-bit unsigned)"}
          </text>
        </svg>
      }
      controls={
        <>
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "signed", label: "2's complement" },
              { v: "unsigned", label: "Unsigned" },
            ]}
          />
          <div className="small">Multiplicand M</div>
          <BitRow bits={bitsOf(m, 4)} onChange={(b) => setM(valueOf(b))} />
          <div className="small" style={{ marginTop: 14 }}>
            Multiplier Q
          </div>
          <BitRow bits={bitsOf(q, 4)} onChange={(b) => setQ(valueOf(b))} />
          <div style={{ marginTop: 14 }}>{controls}</div>
        </>
      }
      readout={
        <>
          <Read label="Check" tex={`$(${mv}) \\times (${qv}) = ${product}$ → ${sg ? "8-bit 2's complement" : "8-bit unsigned"} **${sp4(toBin(product, 8))}**`} />
          <Read label="So far" tex={`${step} of 4 partial products added: ${running}`} tone={step === 4 ? (running === product ? "good" : "bad") : undefined} />
          {sg && <Read tex="Signed rule: sign-extend every partial product to 8 bits; the multiplier's MSB has weight −8, so its partial product is **subtracted** (add its 2's complement)." />}
        </>
      }
      tasks={[
        "Predict the signed product $1011 \\times 1101$ ($-5 \\times -3$), then step through. Which step makes the running sum jump from negative to positive?",
        "Switch to Unsigned with the same bits: the product is now $11 \\times 13 = 143$. Which partial products changed, and why?",
        "Set Q positive (MSB 0) and M negative. Watch the grey sign-extension bits: what would the answer be if they were zeros?",
        "Explain why the last row is subtracted in signed mode: what is the weight of $b_3$ in a 4-bit 2's complement number?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 7. BCD adder

function DigitPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="row" style={{ gap: 4, flexWrap: "wrap" }}>
      {Array.from({ length: 10 }, (_, d) => (
        <button key={d} className={`chip ${d === value ? "on" : ""}`} onClick={() => onChange(d)} style={{ minWidth: 28 }}>
          {d}
        </button>
      ))}
    </div>
  );
}

function BcdAdder() {
  const [a, setA] = useState(8);
  const [b, setB] = useState(5);
  const [cin, setCin] = useState<Bit>(0);
  const sum = a + b + cin;
  const C4 = sum > 15 ? 1 : 0;
  const S = sum & 15;
  const s = (i: number) => (S >> i) & 1;
  const t32 = s(3) & s(2);
  const t31 = s(3) & s(1);
  const X = (C4 | t32 | t31) as Bit;
  const corr = X ? 6 : 0;
  const digit = (S + corr) & 15;
  const bits = (v: number) => toBin(v, 4);
  const box = (x: number, y: number, w: number, h: number, title: string, sub: string, hl?: boolean): ReactNode => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={hl ? "var(--accent-soft)" : "var(--surface)"} stroke="var(--text)" strokeWidth={1.6} />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" className="cir-label">
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="cir-pin">
        {sub}
      </text>
    </g>
  );
  return (
    <VizFrame
      title="BCD adder: two 4-bit adders and the +6 correction"
      hint="Pick two BCD digits and the carry in. The X logic decides whether adder 2 adds 0110."
      onReset={() => {
        setA(8);
        setB(5);
        setCin(0);
      }}
      figure={
        <svg viewBox="0 0 520 330" className="viz-svg" role="img" aria-label="BCD adder">
          <text x={200} y={16} textAnchor="middle" className="cir-pin">
            A = {bits(a)} ({a})
          </text>
          <text x={320} y={16} textAnchor="middle" className="cir-pin">
            B = {bits(b)} ({b})
          </text>
          <line x1={200} y1={22} x2={200} y2={48} stroke="var(--text)" strokeWidth={1.6} />
          <line x1={320} y1={22} x2={320} y2={48} stroke="var(--text)" strokeWidth={1.6} />
          <line x1={420} y1={76} x2={380} y2={76} stroke={col(cin)} strokeWidth={2} />
          <text x={448} y={80} textAnchor="middle" className="cir-pin">
            Cin={cin}
          </text>
          {box(140, 48, 240, 56, "4-bit adder 1", `${a} + ${b} + ${cin} = ${sum}`)}
          <line x1={140} y1={76} x2={80} y2={76} stroke={col(C4)} strokeWidth={2} />
          <text x={110} y={70} textAnchor="middle" className="cir-pin">
            C4={C4}
          </text>
          <line x1={80} y1={76} x2={80} y2={120} stroke={col(C4)} strokeWidth={2} />
          <line x1={260} y1={104} x2={260} y2={200} stroke="var(--text)" strokeWidth={1.6} />
          <text x={272} y={128} className="cir-label" fill={S > 9 ? "var(--bad)" : "var(--text)"}>
            S = {bits(S)} ({S})
          </text>
          <line x1={260} y1={150} x2={150} y2={150} stroke="var(--text)" strokeWidth={1.4} />
          <rect x={10} y={120} width={140} height={60} rx={8} fill={X ? "var(--warn-soft)" : "var(--surface)"} stroke={X ? "var(--warn)" : "var(--text)"} strokeWidth={1.6} />
          <text x={80} y={138} textAnchor="middle" className="cir-pin">
            C4 + S3S2 + S3S1
          </text>
          <text x={80} y={156} textAnchor="middle" className="cir-pin">
            {C4} + {t32} + {t31}
          </text>
          <text x={80} y={173} textAnchor="middle" className="cir-label" fill={X ? "var(--warn)" : "var(--text)"}>
            X = {X}
          </text>
          <line x1={80} y1={180} x2={80} y2={312} stroke={col(X)} strokeWidth={2} />
          <line x1={80} y1={228} x2={140} y2={228} stroke={col(X)} strokeWidth={2} />
          <text x={110} y={221} textAnchor="middle" className="cir-pin">
            0{X}{X}0
          </text>
          {box(140, 200, 240, 56, "4-bit adder 2", `${bits(S)} + ${bits(corr)} (Cin = 0)`, X === 1)}
          <line x1={260} y1={256} x2={260} y2={290} stroke="var(--text)" strokeWidth={1.6} />
          <text x={260} y={308} textAnchor="middle" className="cir-label" fill="var(--good)">
            BCD digit {bits(digit)} ({digit})
          </text>
          <text x={92} y={326} className="cir-label" fill={X ? "var(--good)" : "var(--text)"}>
            Cout = X = {X}
          </text>
        </svg>
      }
      controls={
        <>
          <div className="small">Digit A</div>
          <DigitPicker value={a} onChange={setA} />
          <div className="small">Digit B</div>
          <DigitPicker value={b} onChange={setB} />
          <Toggle label="Carry in from the previous digit" value={cin === 1} onChange={(on) => setCin(on ? 1 : 0)} />
        </>
      }
      readout={
        <>
          <Read label="Adder 1" tex={`$${a} + ${b} + ${cin} = ${sum}$ → $C_4 = ${C4}$, $S = ${bits(S)}$`} />
          <Read
            label="Valid?"
            tex={sum > 9 ? `${sum} > 9: ${C4 ? "the adder carried out" : `${bits(S)} is not a BCD code`} ⇒ **add 6**` : `${sum} ≤ 9: already a valid BCD digit, add 0`}
            tone={sum > 9 ? "warn" : "good"}
          />
          <Read label="Adder 2" tex={`${bits(S)} + ${bits(corr)} = ${bits(digit)}${X && S + corr > 15 ? " (its carry out is ignored)" : ""}`} />
          <Read label="Result" tex={`BCD **${X} ${bits(digit)}** = ${X * 10 + digit}`} tone={X * 10 + digit === sum ? "good" : "bad"} />
        </>
      }
      tasks={[
        "Predict: does $5 + 4$ need correcting? And $5 + 7$? Check which term of X fires for $5 + 7$.",
        "Try $9 + 8$: adder 1 gives $S = 0001$, which looks like a valid digit. Which term of X catches it, and what goes wrong without it?",
        "Find every pair whose first sum is 1010 or 1011. Which term of X ($S_3S_2$ or $S_3S_1$) covers them?",
        "Explain why adding 6 works: how many 4-bit codes does BCD leave unused?",
      ]}
    />
  );
}
