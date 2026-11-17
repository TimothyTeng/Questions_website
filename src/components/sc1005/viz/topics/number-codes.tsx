"use client";

import { useState, type CSSProperties } from "react";
import { gray, type Bit } from "@/lib/sc1005/logic";
import { BitRow, bitsOf, Choice, Read, Slider, TableView, useStepper, valueOf, VizFrame } from "../kit";

// Interactive figures for the number-codes lesson, chosen by id (see LessonSection.visuals).
export default function NumberCodesVisual({ id }: { id: string }) {
  switch (id) {
    case "base-converter":
      return <BaseConverterViz />;
    case "bit-grouping":
      return <BitGroupingViz />;
    case "bcd-encoder":
      return <BcdViz />;
    case "gray-encoder":
      return <GrayEncoderViz />;
    case "gray-convert":
      return <GrayConvertViz />;
    case "ascii-explorer":
      return <AsciiViz />;
    case "parity-check":
      return <ParityViz />;
    default:
      return null;
  }
}

const TXT: CSSProperties = { fill: "var(--text)", fontSize: 11 };
const MUTED: CSSProperties = { fill: "var(--muted)", fontSize: 10 };
const MONO: CSSProperties = { fontFamily: "var(--font-geist-mono), Consolas, monospace" };
const inputStyle: CSSProperties = { font: "inherit", padding: "4px 8px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", width: 140 };
const ones = (x: number) => x.toString(2).split("").filter((c) => c === "1").length;
const H = (x: number) => x.toString(16).toUpperCase();

// ---------------------------------------------------------------------------------------------
// Decimal → base r: repeated division and repeated multiplication (exact, with BigInt)

const B0 = BigInt(0);
const B10 = BigInt(10);

/** "a/10^k" as a decimal string, exactly. */
function decStr(num: bigint, k: number): string {
  if (k === 0) return num.toString();
  const s = num.toString().padStart(k + 1, "0");
  const ip = s.slice(0, s.length - k);
  const fp = s.slice(s.length - k).replace(/0+$/, "");
  return fp ? `${ip}.${fp}` : ip;
}

function BaseConverterViz() {
  const [text, setText] = useState("157.39");
  const [base, setBase] = useState<2 | 8 | 16>(16);
  const [nFrac, setNFrac] = useState(3);
  const valid = /^\d{1,9}(\.\d{1,6})?$/.test(text.trim());
  const [ipS, fpS = ""] = valid ? text.trim().split(".") : ["0", ""];
  const r = BigInt(base);
  // integer rows
  const divRows: { q: bigint; quo: bigint; rem: bigint }[] = [];
  let q = BigInt(ipS);
  if (q === B0) divRows.push({ q: B0, quo: B0, rem: B0 });
  while (q > B0) {
    divRows.push({ q, quo: q / r, rem: q % r });
    q = q / r;
  }
  // fraction rows
  const k = fpS.length;
  const den = B10 ** BigInt(k);
  let num = BigInt(fpS || "0");
  const fracRows: { f: string; prod: string; digit: bigint; rest: string }[] = [];
  for (let i = 0; i < nFrac && num > B0; i++) {
    const p = num * r;
    const digit = p / den;
    const rest = p - digit * den;
    fracRows.push({ f: `0.${decStr(num, k).split(".")[1] ?? "0"}`, prod: decStr(p, k), digit, rest: `0.${decStr(rest, k).split(".")[1] ?? "0"}` });
    num = rest;
  }
  const terminated = num === B0;
  const total = divRows.length + fracRows.length + 1;
  const { i: step, setI, controls } = useStepper(total);
  const s = Math.min(step, total - 1);
  const divShown = Math.min(s + 1, divRows.length);
  const fracShown = Math.max(0, Math.min(s + 1 - divRows.length, fracRows.length));
  const dig = (d: bigint) => d.toString(base).toUpperCase();
  const intDigits = divRows.slice(0, divShown).map((d) => dig(d.rem)).reverse().join("");
  const fracDigits = fracRows.slice(0, fracShown).map((d) => dig(d.digit)).join("");
  const intDone = divShown === divRows.length;
  const result = `${intDone ? intDigits : `…${intDigits}`}${fracShown ? `.${fracDigits}` : ""}`;
  const finalStr = `${divRows.map((d) => dig(d.rem)).reverse().join("")}${fracRows.length ? `.${fracRows.map((d) => dig(d.digit)).join("")}` : ""}`;
  const back = (() => {
    const [a, b = ""] = finalStr.split(".");
    let v = parseInt(a, base);
    for (let j = 0; j < b.length; j++) v += parseInt(b[j], base) * base ** -(j + 1);
    return v;
  })();
  const exact = Number(text);
  const sig = finalStr.replace(".", "").replace(/^0+/, "").length;
  const reset = () => {
    setText("157.39");
    setBase(16);
    setNFrac(3);
    setI(0);
  };
  return (
    <VizFrame
      title="Decimal → base r, one step at a time"
      hint="Type a decimal number, pick the target base and step through. Integer part: divide by r, remainders read upward. Fraction: multiply by r, integer parts read downward."
      onReset={reset}
      figure={
        <div style={{ padding: 8 }}>
          <div className="small" style={{ marginBottom: 6 }}>
            <label>
              Decimal number{" "}
              <input
                style={inputStyle}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setI(0);
                }}
                aria-label="Decimal number"
              />
            </label>
            {!valid && <span style={{ color: "var(--bad)", marginLeft: 8 }}>use digits and one point, e.g. 214.307</span>}
          </div>
          <div className="small muted" style={{ margin: "8px 0 2px" }}>
            Integer part: repeated division by {base}
          </div>
          <TableView
            head={["Divide", "Quotient", "Remainder (digit)"]}
            rows={divRows.slice(0, divShown).map((d, j) => [`${d.q} ÷ ${base}`, d.quo.toString(), `**${dig(d.rem)}**${j === 0 ? " ← LSD" : ""}${j === divRows.length - 1 ? " ← MSD" : ""}`])}
            highlightRow={s < divRows.length ? s : undefined}
          />
          {fracRows.length > 0 && (
            <>
              <div className="small muted" style={{ margin: "10px 0 2px" }}>
                Fraction part: repeated multiplication by {base}
              </div>
              <TableView
                head={["Multiply", "Product", "Digit"]}
                rows={fracRows.slice(0, fracShown).map((d, j) => [`${d.f} × ${base}`, d.prod, `**${dig(d.digit)}**${j === 0 ? " ← first after the point" : ""}`])}
                highlightRow={s >= divRows.length && s < divRows.length + fracRows.length ? s - divRows.length : undefined}
              />
            </>
          )}
        </div>
      }
      controls={
        <>
          {controls}
          <Choice
            value={base}
            onChange={(b) => {
              setBase(b);
              setI(0);
            }}
            options={[
              { v: 2, label: "binary" },
              { v: 8, label: "octal" },
              { v: 16, label: "hex" },
            ]}
          />
          <Slider label="Fraction digits to generate" value={nFrac} min={1} max={12} step={1} onChange={(v) => { setNFrac(v); setI(0); }} format={(v) => String(v)} />
        </>
      }
      readout={
        valid ? (
          <>
            <Read label="So far" tex={`$${text.trim()}_{10} \\to$ **${result || "…"}**$_{${base}}$`} tone={s === total - 1 ? "good" : undefined} />
            {s === total - 1 && (
              <>
                <Read label="Result" tex={`**${finalStr}**$_{${base}}$ · ${sig} significant digit${sig === 1 ? "" : "s"}`} tone="good" />
                <Read
                  label="Check"
                  tex={terminated ? `converts back to exactly $${exact}$: the fraction **terminated**` : `converts back to $${back.toPrecision(10)}$; error $\\approx ${(() => { const [m, e] = Math.abs(exact - back).toExponential(2).split("e"); return `${m}\\times10^{${Number(e)}}`; })()}$ (the fraction does not terminate in ${fracRows.length} digits)`}
                  tone={terminated ? "good" : "warn"}
                />
              </>
            )}
          </>
        ) : (
          <Read tex="Enter a valid decimal number." tone="warn" />
        )
      }
      tasks={[
        "Predict: for 157.39 → hex, is the first remainder the most or the least significant digit? Step once and check the label.",
        "Switch to binary with 0.5, then 0.1. Which one terminates? Explain from the fraction column why 0.1 never reaches 0.",
        "Convert 214.307 to hex with 4 fraction digits. Count significant digits in the result (the PYP asks for 6).",
        "Explain: in the fraction table, why do we multiply only the fractional part again, not the whole product?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Grouping bits into octal and hex digits, anchored at the radix point

function BitGroupingViz() {
  const [nInt, setNInt] = useState(10);
  const [nFrac, setNFrac] = useState(5);
  const [intBits, setIntBits] = useState<Bit[]>(bitsOf(0b1011011001, 12)); // weight 2^11 .. 2^0
  const [fracBits, setFracBits] = useState<Bit[]>([0, 1, 1, 0, 1, 0]); // 2^-1 .. 2^-6
  const intB = (i: number): Bit => intBits[11 - i]; // weight 2^i
  const toggleInt = (i: number) => setIntBits((b) => b.map((x, j) => (j === 11 - i ? ((1 - x) as Bit) : x)));
  const toggleFrac = (j: number) => setFracBits((b) => b.map((x, m) => (m === j ? ((1 - x) as Bit) : x)));
  const pad = (n: number, g: number) => Math.ceil(n / g) * g;
  const leftCells = Math.max(pad(nInt, 3), pad(nInt, 4));
  const rightCells = Math.max(pad(nFrac, 3), pad(nFrac, 4));
  const cw = Math.min(22, 380 / (leftCells + rightCells + 1));
  const radixX = 10 + leftCells * cw + 4;
  const xInt = (i: number) => radixX - 4 - (i + 1) * cw; // weight 2^i
  const xFrac = (j: number) => radixX + 4 + j * cw; // weight 2^-(j+1)
  const W = radixX + 4 + rightCells * cw + 10;
  const rowY = 62;
  const Hh = 140;
  const intVal = Array.from({ length: nInt }, (_, i) => intB(i) * 2 ** i).reduce((a, b) => a + b, 0);
  const fracVal = fracBits.slice(0, nFrac).reduce((a: number, b, j) => a + b * 2 ** -(j + 1), 0);
  const bitAtInt = (i: number) => (i < nInt ? intB(i) : 0);
  const bitAtFrac = (j: number) => (j < nFrac ? fracBits[j] : 0);
  const groupsFor = (g: number) => {
    const ig = Array.from({ length: pad(nInt, g) / g }, (_, k) => {
      let v = 0;
      for (let b = g - 1; b >= 0; b--) v = v * 2 + bitAtInt(k * g + b);
      return { x0: xInt(k * g + g - 1), x1: xInt(k * g) + cw, v };
    });
    const fg = Array.from({ length: pad(nFrac, g) / g }, (_, k) => {
      let v = 0;
      for (let b = 0; b < g; b++) v = v * 2 + bitAtFrac(k * g + b);
      return { x0: xFrac(k * g), x1: xFrac(k * g + g - 1) + cw, v };
    });
    return { ig, fg };
  };
  const hexG = groupsFor(4);
  const octG = groupsFor(3);
  const str = (G: ReturnType<typeof groupsFor>) => `${[...G.ig].reverse().map((d) => H(d.v)).join("")}${G.fg.length ? `.${G.fg.map((d) => H(d.v)).join("")}` : ""}`;
  const binStr = `${Array.from({ length: nInt }, (_, k) => bitAtInt(nInt - 1 - k)).join("")}${nFrac ? `.${fracBits.slice(0, nFrac).join("")}` : ""}`;
  const cell = (x: number, b: Bit, real: boolean, onClick?: () => void, key?: string) => (
    <g key={key} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <rect x={x + 1} y={rowY} width={cw - 2} height={cw} rx={4} fill={real ? (b ? "var(--good)" : "var(--surface)") : "none"} stroke={real ? "var(--border)" : "var(--muted)"} strokeDasharray={real ? undefined : "2 2"} />
      <text x={x + cw / 2} y={rowY + cw * 0.7} textAnchor="middle" style={{ ...TXT, ...MONO, fontSize: cw * 0.55, fontWeight: 700, fill: real ? (b ? "var(--surface)" : "var(--text)") : "var(--muted)" }}>
        {b}
      </text>
    </g>
  );
  const brackets = (G: ReturnType<typeof groupsFor>, above: boolean, col: string) =>
    [...G.ig, ...G.fg].map((d, k) => {
      const y = above ? rowY - 6 : rowY + cw + 6;
      const ty = above ? rowY - 14 : rowY + cw + 22;
      return (
        <g key={`${above}${k}`}>
          <path d={`M${d.x0 + 2} ${y + (above ? 4 : -4)} V${y} H${d.x1 - 2} V${y + (above ? 4 : -4)}`} fill="none" stroke={col} strokeWidth={1.6} />
          <text x={(d.x0 + d.x1) / 2} y={ty} textAnchor="middle" style={{ ...TXT, ...MONO, fill: col, fontWeight: 700, fontSize: 13 }}>
            {H(d.v)}
          </text>
        </g>
      );
    });
  return (
    <VizFrame
      title="Binary → octal and hex by grouping from the radix point"
      hint="Click bits to toggle them. Hex groups (4 bits) are drawn above, octal groups (3 bits) below. Dashed cells are padding zeros added on the outside."
      onReset={() => {
        setNInt(10);
        setNFrac(5);
        setIntBits(bitsOf(0b1011011001, 12));
        setFracBits([0, 1, 1, 0, 1, 0]);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${Hh}`} className="viz-svg" role="img" aria-label="Bit grouping">
          <text x={6} y={14} style={{ ...MUTED, fill: "var(--accent)" }}>
            hex (groups of 4)
          </text>
          <text x={6} y={Hh - 6} style={{ ...MUTED, fill: "var(--warn)" }}>
            octal (groups of 3)
          </text>
          {Array.from({ length: leftCells }, (_, i) => cell(xInt(i), bitAtInt(i), i < nInt, i < nInt ? () => toggleInt(i) : undefined, `i${i}`))}
          {Array.from({ length: rightCells }, (_, j) => cell(xFrac(j), bitAtFrac(j), j < nFrac, j < nFrac ? () => toggleFrac(j) : undefined, `f${j}`))}
          <circle cx={radixX} cy={rowY + cw - 3} r={2.6} fill="var(--text)" />
          {brackets(hexG, true, "var(--accent)")}
          {brackets(octG, false, "var(--warn)")}
        </svg>
      }
      controls={
        <>
          <Slider label="Integer bits" value={nInt} min={1} max={12} step={1} onChange={setNInt} format={(v) => String(v)} />
          <Slider label="Fraction bits" value={nFrac} min={0} max={6} step={1} onChange={setNFrac} format={(v) => String(v)} />
        </>
      }
      readout={
        <>
          <Read label="Binary" tex={`**${binStr}**$_2$`} />
          <Read label="Hex" tex={`**${str(hexG)}**$_{16}$`} tone="good" />
          <Read label="Octal" tex={`**${str(octG)}**$_8$`} tone="good" />
          <Read label="Decimal" tex={`$${intVal}${fracVal ? ` + ${fracVal}` : ""} = ${intVal + fracVal}$`} />
        </>
      }
      tasks={[
        "Predict: with 5 fraction bits 0.01101, what are the hex and octal fractions? Where do the padding zeros go?",
        "Set 6 fraction bits. Why does octal now need no padding but hex still does?",
        "Explain why grouping from the left end of the whole string would be wrong for the fraction: what would 0.11 become in hex?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// BCD vs straight binary

const bcdBits = (v: number): Bit[] =>
  String(v)
    .padStart(4, "0")
    .split("")
    .flatMap((d) => bitsOf(Number(d), 4));

function BcdViz() {
  const [bits, setBits] = useState<Bit[]>(bcdBits(709));
  const [dec, setDec] = useState(709);
  const nibbles = [0, 1, 2, 3].map((j) => valueOf(bits.slice(4 * j, 4 * j + 4)));
  const invalid = nibbles.map((d) => d > 9);
  const bcdOk = !invalid.some(Boolean);
  const bcdVal = bcdOk ? nibbles.reduce((a, d) => a * 10 + d, 0) : null;
  const binVal = valueOf(bits);
  const binNeeded = bcdVal === null ? 0 : Math.max(1, Math.ceil(Math.log2(bcdVal + 1) - 1e-12));
  const digitsNeeded = bcdVal === null ? 0 : String(bcdVal).length;
  return (
    <VizFrame
      title="BCD vs straight binary: same bits, different numbers"
      hint="Use the slider to encode a decimal number in BCD, or click bits to make any 16-bit pattern. Each 4-bit group is one decimal digit; 1010–1111 are invalid."
      onReset={() => {
        setDec(709);
        setBits(bcdBits(709));
      }}
      figure={
        <div style={{ padding: 10 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[0, 1, 2, 3].map((j) => (
              <div key={j} style={{ textAlign: "center" }}>
                <BitRow
                  bits={bits.slice(4 * j, 4 * j + 4)}
                  onChange={(nb) => setBits([...bits.slice(0, 4 * j), ...nb, ...bits.slice(4 * j + 4)])}
                  labels={["8", "4", "2", "1"]}
                  size={28}
                />
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 22,
                    fontWeight: 700,
                    ...MONO,
                    color: invalid[j] ? "var(--bad)" : "var(--good)",
                  }}
                >
                  {invalid[j] ? "✗" : nibbles[j]}
                </div>
                <div className="small muted">{invalid[j] ? `${nibbles[j]} is not a digit` : `digit ${3 - j === 0 ? "units" : 3 - j === 1 ? "tens" : 3 - j === 2 ? "hundreds" : "thousands"}`}</div>
              </div>
            ))}
          </div>
          <div className="small muted" style={{ marginTop: 10 }}>
            Read as straight binary, the same 16 bits have weights 2¹⁵ … 2⁰ (each nibble becomes a hex digit).
          </div>
        </div>
      }
      controls={
        <Slider
          label="Encode decimal"
          value={dec}
          min={0}
          max={9999}
          step={1}
          onChange={(v) => {
            setDec(v);
            setBits(bcdBits(v));
          }}
          format={(v) => String(v)}
        />
      }
      readout={
        <>
          <Read label="Pattern" tex={`**${[0, 1, 2, 3].map((j) => bits.slice(4 * j, 4 * j + 4).join("")).join(" ")}**`} />
          <Read label="As BCD" tex={bcdOk ? `$${bcdVal}_{10}$` : `**invalid**: nibble${invalid.filter(Boolean).length > 1 ? "s" : ""} above 1001`} tone={bcdOk ? "good" : "bad"} />
          <Read label="As binary" tex={`$${H(binVal)}_{16} = ${binVal}_{10}$`} />
          {bcdVal !== null && (
            <Read label="Bits for this value" tex={`BCD: ${digitsNeeded} digit${digitsNeeded > 1 ? "s" : ""} × 4 = ${digitsNeeded * 4}; binary: $\\lceil\\log_2(${bcdVal}+1)\\rceil = ${binNeeded}$ (${bcdVal.toString(2)})`} />
          )}
          <Read label="16 bits hold" tex="up to $9999$ in BCD vs $65\,535$ in binary" />
        </>
      }
      tasks={[
        "Predict: what is 0011 1000 (set the last two nibbles to 3 and 8) as BCD and as binary? Check both lines.",
        "Click a nibble up to 1010. What happens to the BCD reading, and why do 6 of the 16 nibble codes never appear in BCD?",
        "Slide to 9999. How many bits does binary need for the same value? Explain where BCD's extra bits go.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Rotary encoder: binary vs Gray tracks with misaligned sensors

function GrayEncoderViz() {
  const [n, setN] = useState<3 | 4>(3);
  const [code, setCode] = useState<"bin" | "gray">("bin");
  const [angle, setAngle] = useState(178);
  const [mis, setMis] = useState(4);
  const S = 2 ** n;
  const sector = (a: number) => Math.floor((((a % 360) + 360) % 360) / (360 / S));
  const enc = (p: number) => (code === "gray" ? gray(p) : p);
  const dec = (c: number) => {
    if (code === "bin") return c;
    let b = 0;
    for (let x = c; x; x >>= 1) b ^= x;
    return b;
  };
  // track k (bit k, LSB = 0) sensor offset in degrees
  const off = (k: number) => mis * (k - (n - 1) / 2);
  const read = (a: number) => {
    let c = 0;
    for (let k = 0; k < n; k++) c |= ((enc(sector(a + off(k))) >> k) & 1) << k;
    return c;
  };
  const truePos = sector(angle);
  const rc = read(angle);
  const pos = dec(rc);
  const ok = pos === truePos;
  // sweep all angles for this misalignment
  let bad = 0;
  let worst = 0;
  const steps = 1440;
  for (let i = 0; i < steps; i++) {
    const a = (i * 360) / steps;
    const t = sector(a);
    const p = dec(read(a));
    if (p !== t) {
      bad++;
      const d = Math.min((p - t + S) % S, (t - p + S) % S);
      worst = Math.max(worst, d);
    }
  }
  const W = 280;
  const cx = 140;
  const cy = 140;
  const r0 = 34;
  const rw = n === 3 ? 30 : 23;
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const pt = (r: number, deg: number) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];
  const arc = (ri: number, ro: number, a0: number, a1: number) => {
    const [x0, y0] = pt(ro, a0);
    const [x1, y1] = pt(ro, a1);
    const [x2, y2] = pt(ri, a1);
    const [x3, y3] = pt(ri, a0);
    return `M${x0} ${y0} A${ro} ${ro} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${ri} ${ri} 0 0 0 ${x3} ${y3} Z`;
  };
  // MSB on the inner ring
  const ringOf = (k: number) => n - 1 - k;
  return (
    <VizFrame
      title="Rotary encoder: why Gray code never glitches"
      hint="Each ring is one bit (MSB inside); shaded = 1. The sensors on the radial line are slightly misaligned, so near a boundary different rings can see different sectors."
      onReset={() => {
        setN(3);
        setCode("bin");
        setAngle(178);
        setMis(4);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${W}`} className="viz-svg" role="img" aria-label="Rotary encoder disc">
          {Array.from({ length: S }, (_, s) =>
            Array.from({ length: n }, (_, k) => {
              const ring = ringOf(k);
              const on = (enc(s) >> k) & 1;
              return (
                <path
                  key={`${s}-${k}`}
                  d={arc(r0 + ring * rw, r0 + (ring + 1) * rw - 2, (s * 360) / S, ((s + 1) * 360) / S)}
                  fill={on ? (s === truePos ? "var(--accent)" : "var(--text)") : "var(--surface)"}
                  opacity={on ? (s === truePos ? 0.9 : 0.55) : 1}
                  stroke="var(--border)"
                  strokeWidth={0.8}
                />
              );
            }),
          )}
          <path d={arc(r0, r0 + n * rw - 2, (truePos * 360) / S, ((truePos + 1) * 360) / S)} fill="none" stroke="var(--accent)" strokeWidth={2.5} />
          {Array.from({ length: S }, (_, s) => {
            const [x, y] = pt(r0 + n * rw + 12, ((s + 0.5) * 360) / S);
            return (
              <text key={s} x={x} y={y + 4} textAnchor="middle" style={{ ...TXT, fontSize: 10, fontWeight: s === truePos ? 700 : 400, fill: s === truePos ? "var(--accent)" : "var(--muted)" }}>
                {s}
              </text>
            );
          })}
          {Array.from({ length: n }, (_, k) => {
            const ring = ringOf(k);
            const a = angle + off(k);
            const [x, y] = pt(r0 + ring * rw + rw / 2 - 1, a);
            const bit = (rc >> k) & 1;
            const [lx0, ly0] = pt(r0 + ring * rw, a);
            const [lx1, ly1] = pt(r0 + (ring + 1) * rw - 2, a);
            return (
              <g key={k}>
                <line x1={lx0} y1={ly0} x2={lx1} y2={ly1} stroke="var(--bad)" strokeWidth={1.2} />
                <circle cx={x} cy={y} r={5.5} fill={bit ? "var(--good)" : "var(--surface)"} stroke="var(--bad)" strokeWidth={1.6} />
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={r0 - 6} fill="var(--surface-2)" stroke="var(--border)" />
          <text x={cx} y={cy - 2} textAnchor="middle" style={{ ...TXT, ...MONO, fontWeight: 700, fill: ok ? "var(--good)" : "var(--bad)" }}>
            {rc.toString(2).padStart(n, "0")}
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" style={{ ...MUTED, fontSize: 9 }}>
            read
          </text>
        </svg>
      }
      controls={
        <>
          <Choice
            value={code}
            onChange={setCode}
            options={[
              { v: "bin", label: "Binary disc" },
              { v: "gray", label: "Gray disc" },
            ]}
          />
          <Choice
            value={n}
            onChange={setN}
            options={[
              { v: 3, label: "3 bits (8 sectors)" },
              { v: 4, label: "4 bits (16 sectors)" },
            ]}
          />
          <Slider label="Shaft angle" value={angle} min={0} max={359.5} step={0.5} onChange={setAngle} format={(v) => `${v}°`} />
          <Slider label="Sensor misalignment" value={mis} min={0} max={8} step={0.5} onChange={setMis} format={(v) => `${v}° per ring`} />
        </>
      }
      readout={
        <>
          <Read label="True sector" tex={`$${truePos}$ (code ${enc(truePos).toString(2).padStart(n, "0")})`} />
          <Read
            label="Sensors read"
            tex={`**${rc.toString(2).padStart(n, "0")}** → position $${pos}$ ${ok ? "✓" : `✗ (off by ${Math.min((pos - truePos + S) % S, (truePos - pos + S) % S)})`}`}
            tone={ok ? "good" : "bad"}
          />
          <Read
            label="Whole revolution"
            tex={`${((100 * bad) / steps).toFixed(1)}% of angles misread; worst error **${worst}** sector${worst === 1 ? "" : "s"}`}
            tone={bad === 0 ? "good" : worst <= 1 ? "warn" : "bad"}
          />
        </>
      }
      tasks={[
        "Predict: on the binary disc near the 3→4 boundary (≈180°), how many rings change? Drag the angle slowly across 180° and watch the read code.",
        "Switch to the Gray disc with the same misalignment. What is the worst error over a whole revolution now, and why can it never be more than 1?",
        "Set misalignment to 0. Do both discs read perfectly? Explain why real encoders still prefer Gray code.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Binary ↔ Gray conversion, bit by bit

function GrayConvertViz() {
  const n = 6;
  const [dir, setDir] = useState<"b2g" | "g2b">("b2g");
  const [inp, setInp] = useState<Bit[]>(bitsOf(0b101101, n));
  const { i: step, setI, controls } = useStepper(n + 1);
  const out: Bit[] = [];
  for (let j = 0; j < n; j++) {
    if (j === 0) out.push(inp[0]);
    else out.push((dir === "b2g" ? inp[j] ^ inp[j - 1] : inp[j] ^ out[j - 1]) as Bit);
  }
  const shown = step; // number of output bits revealed
  const W = 360;
  const Hh = 170;
  const cw = 40;
  const x = (j: number) => 40 + j * (cw + 8);
  const yIn = 22;
  const yOut = 118;
  const cur = shown >= 1 ? shown - 1 : -1;
  const inName = dir === "b2g" ? "b" : "g";
  const outName = dir === "b2g" ? "g" : "b";
  const v = valueOf(dir === "b2g" ? inp : out);
  const next = (v + 1) % 2 ** n;
  const gv = gray(v);
  const gn = gray(next);
  const cellNode = (xx: number, y: number, b: Bit | null, label: string, hl: boolean) => (
    <g>
      <rect x={xx} y={y} width={cw} height={30} rx={6} fill={b === null ? "var(--surface-2)" : b ? "var(--good)" : "var(--surface)"} stroke={hl ? "var(--accent)" : "var(--border)"} strokeWidth={hl ? 2.4 : 1} />
      <text x={xx + cw / 2} y={y + 21} textAnchor="middle" style={{ ...TXT, ...MONO, fontSize: 15, fontWeight: 700, fill: b ? "var(--surface)" : "var(--text)" }}>
        {b === null ? "?" : b}
      </text>
      <text x={xx + cw / 2} y={y < 60 ? y - 5 : y + 44} textAnchor="middle" style={{ ...MUTED, fontSize: 9 }}>
        {label}
      </text>
    </g>
  );
  return (
    <VizFrame
      title="Binary ↔ Gray, one XOR at a time"
      hint="Click the top bits to set the input, choose a direction and press Next. Arrows show which two bits are XORed for the highlighted output bit."
      onReset={() => {
        setDir("b2g");
        setInp(bitsOf(0b101101, n));
        setI(0);
      }}
      figure={
        <svg viewBox={`0 0 ${W} ${Hh}`} className="viz-svg" role="img" aria-label="Gray conversion">
          {inp.map((b, j) => (
            <g key={`i${j}`} onClick={() => { setInp(inp.map((x2, m) => (m === j ? ((1 - x2) as Bit) : x2))); }} style={{ cursor: "pointer" }}>
              {cellNode(x(j), yIn, b, `${inName}${n - 1 - j}`, j === cur || (j === cur - 1 && dir === "b2g"))}
            </g>
          ))}
          {out.map((b, j) => (
            <g key={`o${j}`}>{cellNode(x(j), yOut, j < shown ? b : null, `${outName}${n - 1 - j}`, j === cur || (dir === "g2b" && j === cur - 1))}</g>
          ))}
          <text x={6} y={yIn + 20} style={{ ...MUTED, fontSize: 9 }}>
            in
          </text>
          <text x={6} y={yOut + 20} style={{ ...MUTED, fontSize: 9 }}>
            out
          </text>
          {cur >= 0 && (
            <g stroke="var(--accent)" strokeWidth={1.8} fill="none">
              {cur === 0 ? (
                <line x1={x(0) + cw / 2} y1={yIn + 30} x2={x(0) + cw / 2} y2={yOut} />
              ) : (
                <>
                  <circle cx={x(cur) + cw / 2} cy={(yIn + 30 + yOut) / 2} r={9} />
                  <line x1={x(cur) + cw / 2 - 6} y1={(yIn + 30 + yOut) / 2} x2={x(cur) + cw / 2 + 6} y2={(yIn + 30 + yOut) / 2} />
                  <line x1={x(cur) + cw / 2} y1={(yIn + 30 + yOut) / 2 - 6} x2={x(cur) + cw / 2} y2={(yIn + 30 + yOut) / 2 + 6} />
                  <line x1={x(cur) + cw / 2} y1={yIn + 30} x2={x(cur) + cw / 2} y2={(yIn + 30 + yOut) / 2 - 9} />
                  {dir === "b2g" ? (
                    <line x1={x(cur - 1) + cw / 2} y1={yIn + 30} x2={x(cur) + cw / 2 - 8} y2={(yIn + 30 + yOut) / 2 - 4} />
                  ) : (
                    <line x1={x(cur - 1) + cw} y1={yOut + 6} x2={x(cur) + cw / 2 - 8} y2={(yIn + 30 + yOut) / 2 + 4} />
                  )}
                  <line x1={x(cur) + cw / 2} y1={(yIn + 30 + yOut) / 2 + 9} x2={x(cur) + cw / 2} y2={yOut} />
                </>
              )}
            </g>
          )}
        </svg>
      }
      controls={
        <>
          {controls}
          <Choice
            value={dir}
            onChange={(d) => {
              setDir(d);
              setI(0);
            }}
            options={[
              { v: "b2g", label: "Binary → Gray" },
              { v: "g2b", label: "Gray → binary" },
            ]}
          />
        </>
      }
      readout={
        <>
          <Read
            label="Rule"
            tex={dir === "b2g" ? "MSB copied; $g_i = b_i \\oplus b_{i+1}$ (two **input** bits)" : "MSB copied; $b_i = g_i \\oplus b_{i+1}$ (input bit XOR the **output bit just found**)"}
          />
          {cur >= 0 && (
            <Read
              label={`Step ${cur + 1}`}
              tex={
                cur === 0
                  ? `$${outName}_{${n - 1}} = ${inName}_{${n - 1}} = ${out[0]}$`
                  : dir === "b2g"
                    ? `$g_{${n - 1 - cur}} = b_{${n - 1 - cur}} \\oplus b_{${n - cur}} = ${inp[cur]} \\oplus ${inp[cur - 1]} = ${out[cur]}$`
                    : `$b_{${n - 1 - cur}} = g_{${n - 1 - cur}} \\oplus b_{${n - cur}} = ${inp[cur]} \\oplus ${out[cur - 1]} = ${out[cur]}$`
              }
              tone="good"
            />
          )}
          {shown === n && (
            <Read label="Result" tex={`${inName === "b" ? "binary" : "Gray"} **${inp.join("")}** → ${outName === "g" ? "Gray" : "binary"} **${out.join("")}** (binary value $${v}$)`} tone="good" />
          )}
          <Read label="Unit distance" tex={`gray(${v}) = ${gv.toString(2).padStart(n, "0")}, gray(${next}) = ${gn.toString(2).padStart(n, "0")}: **${ones(gv ^ gn)}** bit differs (binary: ${ones(v ^ next)})`} />
        </>
      }
      tasks={[
        "Predict the Gray code of 101101 before stepping, then step through and compare.",
        "Switch to Gray → binary with input 110110. At each step, which output bit does the arrow come from? What goes wrong if you XOR with the Gray bit instead?",
        "Set the binary input to 011111 (31). Compare the bits that change from 31 → 32 in binary and in Gray (bottom line).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// ASCII

const groupOf = (c: number) => (c < 32 || c === 127 ? "control" : c >= 48 && c <= 57 ? "digit" : c >= 65 && c <= 90 ? "upper case" : c >= 97 && c <= 122 ? "lower case" : c === 32 ? "space" : "symbol");

function AsciiViz() {
  const [text, setText] = useState("SC1005 Hi");
  const chars = [...text].slice(0, 10).filter((c) => c.charCodeAt(0) < 128);
  const codes = chars.map((c) => c.charCodeAt(0));
  const used = new Set(codes);
  const flipCase = () => setText([...text].map((c) => (/[A-Za-z]/.test(c) ? String.fromCharCode(c.charCodeAt(0) ^ 0x20) : c)).join(""));
  const cw = 42;
  const ch = 15;
  const x0 = 26;
  const y0 = 30;
  const W = x0 + 8 * cw + 6;
  const Hh = y0 + 16 * ch + 8;
  const show = (c: number) => (c < 32 ? ["NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "HT", "LF", "VT", "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US"][c] : c === 32 ? "SP" : c === 127 ? "DEL" : String.fromCharCode(c));
  return (
    <VizFrame
      title="ASCII: 7 bits per character"
      hint="Type up to 10 characters. The grid is the whole ASCII table: column = high 3 bits (b6 b5 b4), row = low 4 bits (b3…b0). Your characters are highlighted."
      onReset={() => setText("SC1005 Hi")}
      figure={
        <div>
          <div className="small" style={{ padding: "6px 8px" }}>
            <label>
              Text{" "}
              <input style={{ ...inputStyle, width: 160 }} value={text} maxLength={10} onChange={(e) => setText(e.target.value)} aria-label="Text to encode" />
            </label>{" "}
            <button className="btn small" onClick={flipCase}>
              Flip bit 5 (case)
            </button>
          </div>
          <svg viewBox={`0 0 ${W} ${Hh}`} className="viz-svg" role="img" aria-label="ASCII table">
            {Array.from({ length: 8 }, (_, col) => (
              <text key={col} x={x0 + col * cw + cw / 2} y={y0 - 16} textAnchor="middle" style={{ ...MUTED, ...MONO, fontSize: 9 }}>
                {col.toString(2).padStart(3, "0")}
              </text>
            ))}
            {Array.from({ length: 8 }, (_, col) => (
              <text key={`h${col}`} x={x0 + col * cw + cw / 2} y={y0 - 5} textAnchor="middle" style={{ ...MUTED, fontSize: 8 }}>
                {col}x
              </text>
            ))}
            {Array.from({ length: 16 }, (_, row) => (
              <text key={row} x={x0 - 4} y={y0 + row * ch + ch * 0.72} textAnchor="end" style={{ ...MUTED, ...MONO, fontSize: 8 }}>
                {H(row)}
              </text>
            ))}
            {Array.from({ length: 128 }, (_, c) => {
              const col = c >> 4;
              const row = c & 15;
              const on = used.has(c);
              const g = groupOf(c);
              const tint = g === "digit" ? "var(--warn)" : g === "upper case" ? "var(--accent)" : g === "lower case" ? "var(--good)" : "transparent";
              return (
                <g key={c}>
                  <rect x={x0 + col * cw + 1} y={y0 + row * ch + 1} width={cw - 2} height={ch - 2} rx={3} fill={on ? "var(--bad)" : tint} opacity={on ? 0.85 : 0.13} />
                  <text x={x0 + col * cw + cw / 2} y={y0 + row * ch + ch * 0.72} textAnchor="middle" style={{ ...TXT, ...MONO, fontSize: c < 33 || c === 127 ? 7 : 10, fill: on ? "var(--surface)" : c < 33 || c === 127 ? "var(--muted)" : "var(--text)", fontWeight: on ? 700 : 400 }}>
                    {show(c)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      }
      readout={
        <>
          <TableView
            head={["Char", "$b_6b_5b_4$", "$b_3..b_0$", "Hex", "Type"]}
            rows={codes.map((c) => [show(c), c.toString(2).padStart(7, "0").slice(0, 3), c.toString(2).padStart(7, "0").slice(3), H(c), groupOf(c)])}
          />
          <Read label="Size" tex={`${codes.length} chars × 7 bits = **${7 * codes.length} bits** (${8 * codes.length} as bytes)`} />
          {codes.some((c) => c >= 48 && c <= 57) && <Read label="Digits" tex="'0'–'9' are $011\\,dddd$: the low nibble **is** the BCD digit" />}
        </>
      }
      tasks={[
        "Predict the hex code of 'k' from 'a' = 61. Type it and check.",
        "Press 'Flip bit 5'. Which characters change and which stay the same? Why do digits and spaces not change case?",
        "Type a phone number such as 91234567. How many bits is it in ASCII, in BCD and in straight binary?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Parity generator and checker

function ParityViz() {
  const [data, setData] = useState<Bit[]>(bitsOf(0x53, 7)); // 'S'
  const [mode, setMode] = useState<"even" | "odd">("even");
  const [flips, setFlips] = useState<boolean[]>(Array(8).fill(false));
  const dv = valueOf(data);
  const dOnes = ones(dv);
  const p: Bit = (mode === "even" ? dOnes % 2 : 1 - (dOnes % 2)) as Bit;
  const sent: Bit[] = [p, ...data];
  const recv: Bit[] = sent.map((b, i) => (flips[i] ? ((1 - b) as Bit) : b));
  const rOnes = recv.filter((b) => b === 1).length;
  const errDetected = mode === "even" ? rOnes % 2 === 1 : rOnes % 2 === 0;
  const nFlips = flips.filter(Boolean).length;
  const verdict = nFlips === 0 ? (errDetected ? "false alarm" : "correct: no error") : errDetected ? "error detected" : "error MISSED";
  const tone = nFlips === 0 ? "good" : errDetected ? "warn" : "bad";
  const labels = ["P", "b6", "b5", "b4", "b3", "b2", "b1", "b0"];
  return (
    <VizFrame
      title="Parity: generate, transmit, check"
      hint="Set the 7 data bits (default: ASCII 'S'), choose even or odd parity, then click bits in the received word to inject errors on the line."
      onReset={() => {
        setData(bitsOf(0x53, 7));
        setMode("even");
        setFlips(Array(8).fill(false));
      }}
      figure={
        <div style={{ padding: 10, display: "grid", gap: 18 }}>
          <div>
            <div className="small muted" style={{ marginBottom: 4 }}>
              Data (7 bits) = {H(dv)}
              {dv >= 32 && dv < 127 ? ` = '${String.fromCharCode(dv)}'` : ""}
            </div>
            <BitRow bits={data} onChange={(b) => { setData(b); setFlips(Array(8).fill(false)); }} labels={labels.slice(1)} />
          </div>
          <div>
            <div className="small muted" style={{ marginBottom: 4 }}>
              Transmitted: parity bit (leftmost) + data · {dOnes} data 1s → P = <strong>{p}</strong> makes the total {dOnes + p} ({mode})
            </div>
            <BitRow bits={sent} labels={labels} />
          </div>
          <div>
            <div className="small muted" style={{ marginBottom: 4 }}>
              Received (click to flip a bit on the line)
            </div>
            <div className="bitrow">
              {recv.map((b, i) => (
                <button
                  key={i}
                  className={`bit ${b ? "on" : ""}`}
                  style={{ width: 30, height: 30, outline: flips[i] ? "2px solid var(--bad)" : undefined, outlineOffset: 2 }}
                  onClick={() => setFlips(flips.map((f, j) => (j === i ? !f : f)))}
                  title={flips[i] ? "flipped on the line" : labels[i]}
                >
                  {b}
                  <span className="bit-label" style={{ color: flips[i] ? "var(--bad)" : undefined }}>
                    {flips[i] ? "⚡" : labels[i]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      controls={
        <Choice
          value={mode}
          onChange={(m) => {
            setMode(m);
            setFlips(Array(8).fill(false));
          }}
          options={[
            { v: "even", label: "Even parity" },
            { v: "odd", label: "Odd parity" },
          ]}
        />
      }
      readout={
        <>
          <Read label="Generator" tex={`data has ${dOnes} ones (${dOnes % 2 ? "odd" : "even"}) → ${mode} parity bit $P = ${p}$`} />
          <Read label="Checker" tex={`received word has **${rOnes}** ones (${rOnes % 2 ? "odd" : "even"}) → ${errDetected ? "**error detected**" : "**no error detected**"}`} tone={errDetected ? "warn" : "good"} />
          <Read label="Truth" tex={`${nFlips} bit${nFlips === 1 ? "" : "s"} flipped → **${verdict}**`} tone={tone} />
          <Read label="XOR view" tex={`$${recv.join(" \\oplus ")} = ${rOnes % 2}$ (even parity expects 0, odd expects 1)`} />
        </>
      }
      tasks={[
        "Predict the even parity bit for 'S' (101 0011) before reading it. Then switch to odd parity: what changes?",
        "Flip one bit, then a second one. Explain why the checker is fooled by two errors.",
        "Flip the parity bit itself only. Is that detected? Does the receiver know which bit was wrong?",
      ]}
    />
  );
}
