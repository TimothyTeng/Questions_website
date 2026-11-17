"use client";

import { useState, type CSSProperties } from "react";
import type { Bit } from "@/lib/sc1005/logic";
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
// Parity generator and checker

function ParityViz() {
  const [data, setData] = useState<Bit[]>(bitsOf(0x41, 7)); // ASCII 'A' = 100 0001 (F0-23)
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
      hint="Set the 7 data bits (default: ASCII 'A' = 100 0001, the lecture example on F0-23), choose even or odd parity, then click bits in the received word to inject errors on the line."
      onReset={() => {
        setData(bitsOf(0x41, 7));
        setMode("even");
        setFlips(Array(8).fill(false));
      }}
      figure={
        <div style={{ padding: 10, display: "grid", gap: 18 }}>
          <div>
            <div className="small muted" style={{ marginBottom: 4 }}>
              Data (7 bits) = {H(dv)}
              {dv === 0x41 ? " = ASCII 'A'" : ""}
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
        "Predict the even and odd parity bits for 'A' (100 0001) and compare with the lecture example on F0-23. Then set the data to 0110011 (Tutorial 1 Q7(a)) and predict the even parity bit.",
        "Flip one bit, then a second one. Explain why the checker is fooled by two errors.",
        "Flip the parity bit itself only. Is that detected? Does the receiver know which bit was wrong?",
      ]}
    />
  );
}
