import type { CircuitSpec, Draft, Figure } from "@/lib/sc1005/types";

// ---------------------------------------------------------------------------------------------
// Block-diagram SVG helpers (multiplexers, decoders, comparators drawn as blocks). Exported so the
// comb-blocks and verilog-comb lessons can reuse them. Everything is drawn with currentColor so the
// figures work in light and dark mode.

export type Pin = [pin: string, sig: string];
export interface BlockOpts {
  shape?: "box" | "mux";
  title?: string;
  left: Pin[];
  right: Pin[];
  bottom?: Pin[];
  top?: Pin[];
  w?: number;
  pitch?: number;
}
interface Pt {
  x: number;
  y: number;
}
export interface Placed {
  svg: string;
  L: Pt[];
  R: Pt[];
  B: Pt[];
  T: Pt[];
  w: number;
  h: number;
}

const FONT = `font-family="ui-monospace, Consolas, monospace" fill="currentColor"`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const txt = (x: number, y: number, s: string, anchor: "start" | "middle" | "end" = "start", size = 12, bold = false) =>
  `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}"${bold ? ' font-weight="700"' : ""} ${FONT}>${esc(s)}</text>`;
export const line = (x1: number, y1: number, x2: number, y2: number) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.5"/>`;
export const wire = (pts: [number, number][]) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
export const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="2.8" fill="currentColor"/>`;
export const svgWrap = (w: number, h: number, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${Math.round(w * 1.1)}" role="img">${body}</svg>`;

/** Draws a block at (x, y). External signal labels (pin[1]) get a short stub; empty labels leave the pin bare. */
export function block(x: number, y: number, o: BlockOpts): Placed {
  const pitch = o.pitch ?? 24;
  const n = Math.max(o.left.length, o.right.length, 2);
  const h = n * pitch + 12;
  const w = o.w ?? (o.shape === "mux" ? 56 : 100);
  const inset = o.shape === "mux" ? Math.min(16, h / 5) : 0;
  const parts: string[] = [];
  if (o.shape === "mux") parts.push(`<polygon points="${x},${y} ${x + w},${y + inset} ${x + w},${y + h - inset} ${x},${y + h}" fill="none" stroke="currentColor" stroke-width="1.8"/>`);
  else parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/>`);
  if (o.title) {
    const lines = o.title.split("\n");
    lines.forEach((t, k) => parts.push(txt(x + w / 2, y + h / 2 + 4 + (k - (lines.length - 1) / 2) * 14, t, "middle", 11, true)));
  }
  const L = o.left.map((_, k) => ({ x, y: y + 6 + pitch / 2 + k * pitch + ((n - o.left.length) * pitch) / 2 }));
  const R = o.right.map((_, k) => ({ x: x + w, y: y + h / 2 + (k - (o.right.length - 1) / 2) * pitch }));
  const bottomY = (px: number) => y + h - (inset * (px - x)) / w;
  const topY = (px: number) => y + (inset * (px - x)) / w;
  const B = (o.bottom ?? []).map((_, k, a) => {
    const px = x + (w * (k + 1)) / (a.length + 1);
    return { x: px, y: bottomY(px) };
  });
  const T = (o.top ?? []).map((_, k, a) => {
    const px = x + (w * (k + 1)) / (a.length + 1);
    return { x: px, y: topY(px) };
  });
  o.left.forEach(([pin, sig], k) => {
    const p = L[k];
    if (pin) parts.push(txt(p.x + 5, p.y + 4, pin, "start", 10));
    if (sig) parts.push(line(p.x - 24, p.y, p.x, p.y), txt(p.x - 28, p.y + 4, sig, "end"));
  });
  o.right.forEach(([pin, sig], k) => {
    const p = R[k];
    if (pin) parts.push(txt(p.x - 5, p.y + 4, pin, "end", 10));
    if (sig) parts.push(line(p.x, p.y, p.x + 24, p.y), txt(p.x + 28, p.y + 4, sig, "start"));
  });
  (o.bottom ?? []).forEach(([pin, sig], k) => {
    const p = B[k];
    if (pin) parts.push(txt(p.x, p.y - 5, pin, "middle", 10));
    if (sig) parts.push(line(p.x, p.y, p.x, y + h + 20), txt(p.x, y + h + 33, sig, "middle"));
  });
  (o.top ?? []).forEach(([pin, sig], k) => {
    const p = T[k];
    if (pin) parts.push(txt(p.x, p.y + 13, pin, "middle", 10));
    if (sig) parts.push(line(p.x, y - 20, p.x, p.y), txt(p.x, y - 25, sig, "middle"));
  });
  return { svg: parts.join(""), L, R, B, T, w, h };
}

/** A single block with its labels, sized to fit. */
export function blockSvg(o: BlockOpts): string {
  const longest = (ps: Pin[]) => Math.max(0, ...ps.map((p) => p[1].length));
  const lw = longest(o.left) * 7.4 + 38;
  const rw = longest(o.right) * 7.4 + 38;
  const top = o.top?.some((p) => p[1]) ? 42 : 10;
  const b = block(lw, top, o);
  const bottom = o.bottom?.some((p) => p[1]) ? 44 : 12;
  return svgWrap(lw + b.w + rw, top + b.h + bottom, b.svg);
}

/** A 2^k-to-1 multiplexer with the given data-line labels (I0 first) and select labels (MSB first). */
export const muxSvg = (data: string[], sel: string[], out = "F", title?: string) =>
  blockSvg({
    shape: "mux",
    title,
    left: data.map((d, k) => [String(k), d]),
    right: [["", out]],
    bottom: sel.map((s, k) => [`S${sel.length - 1 - k}`, s]),
    w: Math.max(60, 24 * (sel.length + 1)),
  });

const fig = (svg: string, caption?: string): Figure => ({ kind: "svg", svg, caption });

/** Seven-segment patterns (a = top, then clockwise, g = middle) for 0–9 as used in this course. */
export const SEG7: Record<number, string> = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" };

/** Static seven-segment digit with the segments in `on` lit (labels drawn on every segment). */
export function seg7Svg(on: string, labels = true): string {
  const S: Record<string, string> = {
    a: "22,10 70,10 64,18 28,18",
    b: "72,12 72,58 64,52 64,20",
    c: "72,62 72,108 64,100 64,68",
    d: "22,110 70,110 64,102 28,102",
    e: "20,62 20,108 28,100 28,68",
    f: "20,12 20,58 28,52 28,20",
    g: "22,60 28,55 64,55 70,60 64,65 28,65",
  };
  const pos: Record<string, [number, number]> = { a: [46, 7], b: [83, 38], c: [83, 88], d: [46, 124], e: [9, 88], f: [9, 38], g: [46, 44] };
  const body = Object.entries(S)
    .map(([k, p]) => `<polygon points="${p}" fill="${on.includes(k) ? "currentColor" : "none"}" fill-opacity="${on.includes(k) ? 0.85 : 0}" stroke="currentColor" stroke-width="1.2" stroke-opacity="0.6"/>`)
    .join("");
  const lab = labels ? Object.entries(pos).map(([k, [x, y]]) => txt(x, y + 4, k, "middle", 10)).join("") : "";
  return svgWrap(92, 132, body + lab);
}

// --- figures used below ---

const decoder38 = (ins: string[], outs: string[], en?: string, title = "3-to-8\ndecoder") =>
  blockSvg({
    title,
    left: ins.map((s, k) => [`I${ins.length - 1 - k}`, s] as Pin),
    right: outs.map((s, k) => [`d${k}`, s] as Pin),
    bottom: en !== undefined ? [["EN", en]] : undefined,
    pitch: 18,
    w: 92,
  });

/** Two 3-to-8 decoders expanded into a 4-to-16 decoder. */
function twoDecoders(): string {
  const u0 = block(70, 14, { title: "3-to-8\nU0", left: [["I2", "A2"], ["I1", "A1"], ["I0", "A0"]], right: Array.from({ length: 8 }, (_, k) => [`d${k}`, `Y${k}`] as Pin), bottom: [["EN", "A3'"]], pitch: 15, w: 84 });
  const u1 = block(70, 200, { title: "3-to-8\nU1", left: [["I2", "A2"], ["I1", "A1"], ["I0", "A0"]], right: Array.from({ length: 8 }, (_, k) => [`d${k}`, `Y${k + 8}`] as Pin), bottom: [["EN", "A3"]], pitch: 15, w: 84 });
  return svgWrap(240, 380, u0.svg + u1.svg);
}

/** Signed comparator from a 4-bit unsigned comparator and a 4-to-1 MUX. */
export function signedCompSvg(dl: [string, string, string, string] | null, bits = 5, rel = "W"): string {
  const hi = bits - 1;
  const cmp = block(96, 26, { title: `umc${bits - 1}`, left: [["A", `X[${hi - 1}:0]`], ["B", `Y[${hi - 1}:0]`]], right: [["U", ""]], w: 70 });
  const mux = block(290, 10, { shape: "mux", title: "mux41", left: [["D0", ""], ["D1", ""], ["D2", ""], ["D3", ""]], right: [["", rel]], bottom: [["S", `{X[${hi}], Y[${hi}]}`]], w: 60 });
  const parts = [cmp.svg, mux.svg];
  const u = cmp.R[0];
  if (dl) {
    const labs = dl;
    // U fans out to every data line labelled "U" or "U'"; constants get a label.
    const busX = 230;
    let used = false;
    labs.forEach((l, k) => {
      const p = mux.L[k];
      if (l === "U" || l === "U'") {
        used = true;
        if (l === "U") parts.push(wire([[busX, p.y], [p.x, p.y]]));
        else parts.push(wire([[busX, p.y], [p.x - 30, p.y]]), `<polygon points="${p.x - 30},${p.y - 6} ${p.x - 30},${p.y + 6} ${p.x - 19},${p.y}" fill="none" stroke="currentColor" stroke-width="1.4"/>`, `<circle cx="${p.x - 16}" cy="${p.y}" r="2.6" fill="none" stroke="currentColor" stroke-width="1.3"/>`, line(p.x - 13, p.y, p.x, p.y));
        parts.push(dot(busX, p.y));
      } else parts.push(line(p.x - 26, p.y, p.x, p.y), txt(p.x - 30, p.y + 4, l, "end"));
    });
    if (used) {
      const ys = labs.flatMap((l, k) => (l.startsWith("U") ? [mux.L[k].y] : []));
      parts.push(wire([[u.x, u.y], [busX, u.y]]), line(busX, Math.min(u.y, ...ys), busX, Math.max(u.y, ...ys)));
    }
    parts.push(txt(u.x + 6, u.y - 6, "U", "start", 11));
  } else {
    parts.push(line(u.x, u.y, u.x + 24, u.y), txt(u.x + 28, u.y + 4, "U"));
    mux.L.forEach((p, k) => parts.push(line(p.x - 26, p.y, p.x, p.y), txt(p.x - 30, p.y + 4, `D${k} = ?`, "end")));
  }
  return svgWrap(420, 190, parts.join(""));
}

// ---------------------------------------------------------------------------------------------

/** PYP 2018-19 S2 Q3(b): 2-4 decoder (drawn as its AND gates) on X[1:0], AND with X[5:2], OR. */
const decMuxCircuit: CircuitSpec = {
  inputs: ["X1", "X0", "X2", "X3", "X4", "X5"],
  gates: [
    { id: "d0", type: "AND", in: ["!X1", "!X0"] },
    { id: "d1", type: "AND", in: ["!X1", "X0"] },
    { id: "d2", type: "AND", in: ["X1", "!X0"] },
    { id: "d3", type: "AND", in: ["X1", "X0"] },
    { id: "p0", type: "AND", in: ["d0", "X2"] },
    { id: "p1", type: "AND", in: ["d1", "X3"] },
    { id: "p2", type: "AND", in: ["d2", "X4"] },
    { id: "p3", type: "AND", in: ["d3", "X5"] },
    { id: "Y", type: "OR", in: ["p0", "p1", "p2", "p3"] },
  ],
  outputs: ["Y"],
};

const segTable: Figure = {
  kind: "table",
  head: ["Digit", "a", "b", "c", "d", "e", "f", "g"],
  rows: Array.from({ length: 10 }, (_, d) => [d, ..."abcdefg".split("").map((s) => (SEG7[d].includes(s) ? 1 : 0))]),
  caption: "Segments lit for each BCD digit (1 = lit), a = top segment, clockwise, g = middle",
};

const SEG_HEX: Record<number, string> = { ...SEG7, 10: "abcefg", 11: "cdefg", 12: "adef", 13: "bcdeg", 14: "adefg", 15: "aefg" };
const segHexTable: Figure = {
  kind: "table",
  head: ["Digit", "WXYZ", "a", "b", "c", "d", "e", "f", "g"],
  rows: Array.from({ length: 16 }, (_, d) => [d.toString(16).toUpperCase(), d.toString(2).padStart(4, "0"), ..."abcdefg".split("").map((s) => (SEG_HEX[d].includes(s) ? 1 : 0))]),
  caption: "Hexadecimal seven-segment truth table (1 = segment on), as in Lecture 07 p.14 and Lab 3 Table 1",
};

export const combBlocksQuestions: Draft[] = [
  // ---------------------------------------------------------------- MCQ
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "easy",
    source: "Style: Lecture 07 p.24, PYP 2017-18 S2 Q3(a)",
    prompt: "A multiplexer must route any one of **48** data inputs to its single output. What is the minimum number of select lines it needs?",
    options: ["5", "6", "24", "48", "There are multiple correct answers"],
    answer: 1,
    solution:
      "An $n$-input multiplexer needs $\\lceil \\log_2 n \\rceil$ select bits, because the select lines must be able to name every input with a distinct binary code.\n$2^5 = 32 < 48$, so 5 bits cannot name all inputs; $2^6 = 64 \\ge 48$, so **6** select lines are needed (16 of the 64 codes are unused).\n24 and 48 confuse select lines with data lines.",
  },
  {
    kind: "mcq",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: Tut 6 Q1",
    prompt: "The 4-to-1 multiplexer below has select inputs $S_1 = A$ (MSB) and $S_0 = B$. Which expression is the output $F$?",
    figures: [fig(muxSvg(["C'", "1", "0", "C"], ["A", "B"]), "4-to-1 MUX: data line $I_k$ is passed to F when $S_1S_0 = k$")],
    options: ["F = A'C' + BC", "F = B'C' + AC", "F = B'C + AC'", "F = A'B'C' + ABC", "None of the above"],
    answer: 0,
    solution:
      "Go through the select codes: the select lines pick one data line, and $F$ equals that line.\n- $AB = 00$: $F = I_0 = C'$, so minterm $m_0$ (000) is 1.\n- $AB = 01$: $F = I_1 = 1$, so $m_2, m_3$ are 1.\n- $AB = 10$: $F = I_2 = 0$.\n- $AB = 11$: $F = I_3 = C$, so $m_7$ is 1.\nSo $F = \\sum m(0,2,3,7)$. On the K-map, $m_0, m_2$ group to $A'C'$ and $m_3, m_7$ group to $BC$: $F = A'C' + BC$.\n**B** is what you get if you take $B$ as the MSB of the select code (it gives $\\sum m(0,4,5,7)$). **D** forgets the $I_1 = 1$ line. Option C comes from complementing every data line.",
    solutionFigures: [{ kind: "kmap", vars: ["A", "B", "C"], values: "10110001", groups: ["A'C'", "BC"], caption: "F = Σm(0,2,3,7) = A'C' + BC" }],
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "easy",
    source: "Style: PYP 2017-18 S1 Q3(b)",
    prompt: "A 3-to-8 decoder has inputs $I_2I_1I_0 = ABC$ ($A$ is the MSB) and active-high outputs $d_0 \\dots d_7$. Outputs $d_1$, $d_2$, $d_4$ and $d_7$ are connected to a 4-input OR gate whose output is $F$. What is $F$?",
    figures: [fig(decoder38(["A", "B", "C"], ["", "to OR", "to OR", "", "to OR", "", "", "to OR"], "1"), "Only the marked outputs feed the OR gate")],
    options: ["$F = A \\oplus B \\oplus C$", "$F = AB + BC + AC$", "$F = (A \\oplus B \\oplus C)'$", "$F = A'B'C + ABC'$", "$F = A + B + C$"],
    answer: 0,
    solution:
      "Output $d_k$ of a decoder is exactly minterm $m_k$ of its inputs, so ORing outputs builds a sum of minterms: $F = \\sum m(1,2,4,7)$.\nThese are the input combinations with an **odd** number of 1s (001, 010, 100, 111): the 3-input XOR, i.e. the Sum output of a full adder (PYP 2017-18 S1 Q3(b) builds a full adder exactly this way).\n$AB + BC + AC = \\sum m(3,5,6,7)$ is the full-adder Carry, and option C is the complement $\\sum m(0,3,5,6)$.",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "medium",
    source: "Style: PYP 2018-19 S2 Q3(b)",
    prompt:
      "In the circuit below, $X[1{:}0]$ drives a 2-4 decoder ($i_1 = X[1]$, $i_0 = X[0]$). Output $d_k$ is ANDed with $X[k+2]$ and the four AND outputs are ORed to give $Y$. The decoder is drawn as its AND gates. For $X[5{:}0] = 010110$, what is $Y$, and what commonly used circuit is this?",
    figures: [{ kind: "circuit", circuit: decMuxCircuit, caption: "2-4 decoder on X[1:0], AND gates with X[5:2], OR gate" }],
    options: [
      "$Y = 1$ ($= X[4]$); the circuit is a 4-to-1 multiplexer",
      "$Y = 0$ ($= X[3]$); the circuit is a 4-to-1 multiplexer",
      "$Y = 1$; the circuit is a 2-to-4 decoder",
      "$Y = 0$ ($= X[5]$); the circuit is a 4-to-1 multiplexer",
      "$Y = 1$; the circuit is a priority encoder",
    ],
    answer: 0,
    solution:
      "$X[1{:}0] = 10$, so the decoder sets only $d_2 = 1$. Only the AND gate fed by $d_2$ can pass its data bit, so $Y = X[4] = 1$ (bits of 010110 from $X[5]$ down: 0, 1, 0, 1, 1, 0).\nFor every value of $X[1{:}0]$ exactly one of $X[2] \\dots X[5]$ reaches $Y$: $X[1{:}0]$ acts as the select input and $X[5{:}2]$ as the data inputs of a **4-to-1 multiplexer** (PYP 2018-19 S2 Q3(b)(iii)).\n**B** swaps $i_1$ and $i_0$ (it decodes 01 and passes $X[3]$).",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "medium",
    source: "Style: PYP 2020-21 S2 Q3(a)",
    prompt:
      "A 4-to-16 decoder is built from two 3-to-8 decoders with active-high enables, as shown. Both decoders receive $A_2A_1A_0$; U0 is enabled by $A_3'$ and U1 by $A_3$. For the input $A_3A_2A_1A_0 = 1101$, which output line is high?",
    figures: [fig(twoDecoders(), "Two 3-to-8 decoders sharing $A_2A_1A_0$, enabled by $A_3'$ and $A_3$")],
    options: ["U0 output $d_5$ ($Y_5$)", "U1 output $d_5$ ($Y_{13}$)", "U0 $d_5$ and U1 $d_5$ together", "U1 output $d_6$ ($Y_{14}$)", "None of the outputs"],
    answer: 1,
    solution:
      "$A_3 = 1$, so only U1 is enabled; U0's outputs are all 0 because its enable $A_3' = 0$.\nU1 decodes $A_2A_1A_0 = 101_2 = 5$, so its $d_5$ goes high. That line is labelled $Y_{13}$, which matches $1101_2 = 13$.\nOption C ignores the enables: without them both decoders would see 101 and two outputs would be high, breaking the one-hot property.",
  },
  {
    kind: "mcq",
    subtopic: "Priority encoders",
    difficulty: "medium",
    source: "Style: PYP 2017-18 S2 Q2(a)",
    prompt:
      "The circuit of PYP 2017-18 S2 Table Q2 has active-low inputs $E^*, A_7^* \\dots A_1^*$ and active-high outputs $Y_2Y_1Y_0$. When $E^*$ is asserted, $Y_2Y_1Y_0$ is the index of the highest-numbered asserted input $A_k^*$ (000 if none is asserted); when $E^*$ is negated the outputs are 000. For the inputs below, what is $Y_2Y_1Y_0$?",
    figures: [{ kind: "table", head: ["$E^*$", "$A_7^*$", "$A_6^*$", "$A_5^*$", "$A_4^*$", "$A_3^*$", "$A_2^*$", "$A_1^*$"], rows: [[0, 1, 1, 0, 1, 0, 0, 1]] }],
    options: ["101", "010", "111", "000", "110"],
    answer: 0,
    solution:
      "The inputs are active-low, so an input is asserted when it is **0**: $A_5^*$, $A_3^*$ and $A_2^*$ are asserted, and $E^* = 0$ means the circuit is enabled.\nThe highest-numbered asserted input wins: $A_5$, so $Y_2Y_1Y_0 = 101$.\n**B** (010) picks the lowest asserted input. **C** (111) treats a 1 as asserted ($A_7^* = 1$). **D** treats $E^* = 0$ as disabling the circuit.",
  },
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "easy",
    source: "Style: Lecture 07 p.25 (bus multiplexer)",
    prompt:
      "A 4-bit 2x1 mux selects between $A = 1010$ (on $I_0$) and $B = 0110$ (on $I_1$) and drives the 4-bit bus $C$. It is built from 1-bit 2x1 muxes as in Lecture 07. How many 1-bit 2x1 muxes does it contain, and what is $C$ when $s_0 = 1$?",
    options: ["4 muxes, $C = 0110$", "4 muxes, $C = 1010$", "1 mux, $C = 0110$", "2 muxes, $C = 0110$", "8 muxes, $C = 1110$"],
    answer: 0,
    solution:
      "A 4-bit 2x1 mux is **four** 1-bit 2x1 muxes, one per bit ($a_3/b_3$ to $c_3$, …, $a_0/b_0$ to $c_0$), all sharing the same select line $s_0$.\nWith $s_0 = 1$ every mux passes its $I_1$ input, so $C = B = 0110$.\n**B** is the $s_0 = 0$ case. **E** ORs $A$ and $B$, which a multiplexer never does.",
  },
  {
    kind: "mcq",
    subtopic: "Comparators",
    difficulty: "hard",
    source: "Style: PYP 2021-22 S1 Q4",
    prompt:
      "A circuit outputs $W = 1$ when the 6-bit two's complement number $X$ is **greater than or equal to** $Y$. It uses a 5-bit **unsigned** comparator `umc5` whose output $U = 1$ when $A \\ge B$, driven by $A = X[4{:}0]$ and $B = Y[4{:}0]$, and a 4-to-1 MUX with select $S = \\{X[5], Y[5]\\}$ (so $X[5]$ is the MSB of the select). Which data inputs make the circuit correct?",
    figures: [fig(signedCompSvg(null, 6), "Fill in the data lines $D_3 \\dots D_0$")],
    options: [
      "`{D3, D2, D1, D0} = {U, 1'b0, 1'b1, U}`",
      "`{D3, D2, D1, D0} = {U, 1'b1, 1'b0, U}`",
      "`{D3, D2, D1, D0} = {~U, 1'b0, 1'b1, U}`",
      "`{D3, D2, D1, D0} = {U, 1'b0, 1'b1, ~U}`",
      "None of the above",
    ],
    answer: 0,
    solution:
      "Split on the sign bits, which drive the select lines:\n- $S = 00$ ($D_0$): both non-negative, so the values are just the unsigned 5-bit lower parts: $W = U$.\n- $S = 01$ ($D_1$): $X \\ge 0$ and $Y < 0$, so $X \\ge Y$ always: $W = 1$.\n- $S = 10$ ($D_2$): $X < 0 \\le Y$, so $W = 0$.\n- $S = 11$ ($D_3$): both negative. $X = -32 + X[4{:}0]$ and $Y = -32 + Y[4{:}0]$, so the order is again decided by the lower bits: $W = U$ (no inversion).\nSo $\\{D_3, D_2, D_1, D_0\\} = \\{U, 0, 1, U\\}$. **B** swaps the two mixed-sign cases (it forgets that $X[5]$ is the MSB of $S$). **C** wrongly assumes that comparing two negative numbers reverses the order: in two's complement it does not, because both carry the same $-32$ weight.",
    solutionFigures: [fig(signedCompSvg(["U", "1", "0", "U"], 6, "W"), "Completed design: W = 1 when X ≥ Y (6-bit signed)")],
  },
  {
    kind: "mcq",
    subtopic: "Seven-segment decoders",
    difficulty: "medium",
    source: "Style: Lab 3 (active-low seg_L), Lecture 07 p.14",
    prompt:
      "A BCD-to-7-segment decoder has **active-low** segment outputs, like `seg_L` in Lab 3 (a segment lights when its output is 0). Using the segment table below, for which BCD inputs (0–9) is the decoder's output for segment **c** at logic 1?",
    figures: [segTable],
    options: ["Only for input 2", "For inputs 2 and 5", "For inputs 5 and 6", "For inputs 1, 4 and 7", "For every input except 2"],
    answer: 0,
    solution:
      "Read the c column: segment c is lit for every digit except **2**.\nWith active-low outputs, a lit segment needs output 0 and an unlit segment needs output 1. So the c output is 1 only when the segment is dark, i.e. only for input 2.\n**E** is the active-high answer (the table column itself). Segment **b** is the one that is dark for 5 and 6, which is where B and C come from.",
  },
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "medium",
    source: "Style: L1-L12 practice L8 Q3–Q4",
    prompt:
      "A 2-input multiplexer has data inputs $A_1, A_0$, select $S$ and output $Z$ ($Z = A_0$ when $S = 0$, $Z = A_1$ when $S = 1$). An active-high enable $EN$ is added: when $EN = 0$, $Z = 0$ whatever $S$ is; when $EN = 1$ it works as before. Which expression is $Z$?",
    options: ["$Z = EN\\,(S'A_0 + SA_1)$", "$Z = EN + S'A_0 + SA_1$", "$Z = EN'\\,(S'A_0 + SA_1)$", "$Z = S'A_0 + SA_1$", "$Z = EN\\,(SA_0 + S'A_1)$"],
    answer: 0,
    solution:
      "Without the enable, the 2-to-1 MUX is $S'A_0 + SA_1$ (one AND gate per data input, ORed: Lecture 07 p.24).\nThe enable must force $Z = 0$ when $EN = 0$ and change nothing when $EN = 1$: AND the whole expression with $EN$, giving $Z = EN(S'A_0 + SA_1)$. In gates, $EN$ becomes an extra input on each AND gate.\n**B** gives $Z = 1$ whenever $EN = 1$. **C** has an active-low enable. **E** swaps the data inputs.",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "hard",
    source: "Style: PYP 2020-21 S2 Q3(a)",
    prompt:
      "A 5-to-32 decoder ($X[4{:}0]$ in, $Y[31{:}0]$ out) is built from one 2-4 decoder and four 3-8 decoders with enable. The 2-4 decoder receives $X[4{:}3]$; its output $d_k$ enables 3-8 decoder $U_k$, which receives $X[2{:}0]$ and drives $Y[8k+7{:}8k]$. For $X = 10110$, which output is high?",
    options: [
      "$U_2$ is enabled; its $d_6$ drives $Y[22]$",
      "$U_1$ is enabled; its $d_6$ drives $Y[14]$",
      "$U_2$ and $U_0$ are both enabled; $Y[22]$ and $Y[6]$ are high",
      "$U_6$ is enabled; its $d_2$ drives $Y[50]$",
      "$U_3$ is enabled; its $d_6$ drives $Y[30]$",
    ],
    answer: 0,
    solution:
      "The 2-4 decoder sees $X[4{:}3] = 10$, so only its $d_2$ is high and only $U_2$ is enabled; the other three 3-8 decoders output all 0s.\n$U_2$ decodes $X[2{:}0] = 110 = 6$, so its $d_6$ is high, which is $Y[8 \\cdot 2 + 6] = Y[22]$. Check: $10110_2 = 22$.\n**C** forgets that the enables are one-hot, so only one 3-8 decoder can ever be active. **D** swaps the two fields of $X$.",
  },
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "medium",
    source: "Style: Lecture 07 p.28 (timing diagrams)",
    prompt: "A 2-to-1 multiplexer outputs $Y = A$ when $S = 0$ and $Y = B$ when $S = 1$. Using the waveforms below (one bit per time slot, no gate delay), which sequence is $Y$?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "S", wave: "0011100110" },
          { name: "A", wave: "1101100011" },
          { name: "B", wave: "0110011100" },
        ],
        ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      },
    ],
    options: ["1110000101", "0101111010", "1111111111", "0100000000", "None of the above"],
    answer: 0,
    solution:
      "In each slot copy $A$ where $S = 0$ and $B$ where $S = 1$:\n- slots 0–1 ($S = 0$): $A = 1, 1$\n- slots 2–4 ($S = 1$): $B = 1, 0, 0$\n- slots 5–6 ($S = 0$): $A = 0, 0$\n- slots 7–8 ($S = 1$): $B = 1, 0$\n- slot 9 ($S = 0$): $A = 1$\nSo $Y = 1110000101$. **B** swaps the roles of the data inputs, **C** is $A + B$ and **D** is $AB$.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "S", wave: "0011100110" },
          { name: "A", wave: "1101100011" },
          { name: "B", wave: "0110011100" },
          { name: "Y", wave: "1110000101" },
        ],
        ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      },
    ],
  },
  {
    kind: "mcq",
    subtopic: "Implementing functions with a MUX",
    difficulty: "hard",
    source: "Style: PYP 2016-17 S1 Q3(b), PYP 2018-19 S1 Q3(a)",
    prompt:
      "$F(A,B,C,D) = \\sum m(1,2,5,7,8,9,14)$ is implemented with an 8-to-1 multiplexer whose select lines are $S_2S_1S_0 = ABC$. Each data line is connected to 0, 1, $D$ or $D'$. Which assignment of $I_0, I_1, \\dots, I_7$ (in that order) is correct?",
    options: ["$D,\\ D',\\ D,\\ D,\\ 1,\\ 0,\\ 0,\\ D'$", "$D',\\ D,\\ D',\\ D',\\ 1,\\ 0,\\ 0,\\ D$", "$D',\\ 0,\\ 0,\\ 1,\\ D,\\ D,\\ D',\\ D$", "$D,\\ D',\\ D,\\ D,\\ D,\\ 0,\\ 0,\\ D'$", "None of the above"],
    answer: 0,
    solution:
      "Data line $I_k$ handles the two minterms $2k$ ($D = 0$) and $2k+1$ ($D = 1$). Compare $F$ on each pair:\n- $I_0$: $m_0 = 0, m_1 = 1$ → $D$\n- $I_1$: $m_2 = 1, m_3 = 0$ → $D'$\n- $I_2$: $m_4 = 0, m_5 = 1$ → $D$\n- $I_3$: $m_6 = 0, m_7 = 1$ → $D$\n- $I_4$: $m_8 = m_9 = 1$ → 1\n- $I_5$, $I_6$: both minterms 0 → 0\n- $I_7$: $m_{14} = 1, m_{15} = 0$ → $D'$\n**B** has every $D$ and $D'$ swapped (it reads the pair the wrong way round), **C** lists the lines in reverse order, and **D** gets the $I_4$ pair wrong.",
    solutionFigures: [
      {
        kind: "table",
        head: ["$ABC$", "$F(D{=}0)$", "$F(D{=}1)$", "$I_k$"],
        rows: [
          ["000", 0, 1, "D"],
          ["001", 1, 0, "D'"],
          ["010", 0, 1, "D"],
          ["011", 0, 1, "D"],
          ["100", 1, 1, "1"],
          ["101", 0, 0, "0"],
          ["110", 0, 0, "0"],
          ["111", 1, 0, "D'"],
        ],
      },
    ],
  },
  {
    kind: "mcq",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: PYP 2017-18 S2 Q3(b)",
    prompt:
      "$F(A,B,C) = \\sum m(3,4)$ must be built from **one 2-to-1 multiplexer, one 2-input AND gate and one 2-input NOR gate**, with no inverters (complemented inputs are not available). Which variable(s) can drive the multiplexer's select line?",
    options: ["$A$ only", "$B$ only", "$C$ only", "Any of $A$, $B$ or $C$", "It cannot be done"],
    answer: 0,
    solution:
      "With select $X$, data line $I_0$ must equal $F$ with $X = 0$ and $I_1$ must equal $F$ with $X = 1$, each a function of the other two variables.\n- Select $A$: $F(A{=}0) = m_3 = BC$ → AND gate; $F(A{=}1) = m_4 = B'C' = (B + C)'$ → NOR gate. ✓\n- Select $B$: $F(B{=}0) = m_4 = AC'$, which needs an inverted input. ✗\n- Select $C$: $F(C{=}0) = m_4 = AB'$, again needs an inverter. ✗\nSo only $A$ works: $F = A\\,?\\,(B + C)' : BC$.",
  },
  {
    kind: "mcq",
    subtopic: "Adders as blocks",
    difficulty: "medium",
    source: "Style: Lecture 4 p.42–44 (add/subtract circuit)",
    prompt:
      "A 4-bit add/subtract circuit feeds each bit of $B$ through an XOR gate with control $SUB$, and connects $SUB$ to the adder's carry-in. With $A = 0101$, $B = 0111$ and $SUB = 1$, what are the 4-bit result $S$ and the carry-out?",
    options: ["$S = 1110$, $C_{out} = 0$", "$S = 1110$, $C_{out} = 1$", "$S = 0010$, $C_{out} = 1$", "$S = 1101$, $C_{out} = 0$", "$S = 1100$, $C_{out} = 1$"],
    answer: 0,
    solution:
      "With $SUB = 1$ the XORs invert $B$: $B' = 1000$, and the carry-in adds 1, so the block computes $A + B' + 1 = A - B$.\n$0101 + 1000 + 1 = 1110$ with no carry out of bit 3, so $S = 1110$ ($-2$ in two's complement, correct for $5 - 7$) and $C_{out} = 0$.\nFor unsigned subtraction $C_{out} = 0$ means a borrow occurred ($A < B$). **D** forgets the carry-in of 1 (one's complement only), and **C** computes $B - A$.",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "easy",
    source: "Style: Lecture 07 p.19 (decoder internals)",
    prompt: "A 3-to-8 decoder with an active-high enable is built from basic gates, using the true and complemented form of each input. Which gate set is sufficient?",
    options: [
      "Eight 4-input AND gates and three NOT gates",
      "Eight 3-input OR gates and three NOT gates",
      "Three 8-input AND gates",
      "Eight 3-input AND gates and no NOT gates",
      "One 8-input OR gate and eight NOT gates",
    ],
    answer: 0,
    solution:
      "Each output detects one input combination and the enable: $d_k = EN \\cdot m_k(I_2, I_1, I_0)$, e.g. $d_5 = EN\\, I_2 I_1' I_0$. That is one 4-input AND per output (eight in total), and three inverters supply $I_2', I_1', I_0'$.\nWithout the enable, 3-input ANDs would do, but they still need the complemented inputs, so D is wrong. OR gates combine minterms; they do not detect them.",
  },
  {
    kind: "mcq",
    subtopic: "Combinational design process",
    difficulty: "easy",
    source: "Style: Lecture 07 p.8 (three 1s detector)",
    prompt: "A circuit must output 1 when its 8-bit input $abcdefgh$ contains **four adjacent 1s** somewhere. Following the lecture's equation-based approach, the two-level circuit needs:",
    options: ["5 four-input AND gates feeding a 5-input OR gate", "4 four-input AND gates feeding a 4-input OR gate", "8 four-input AND gates feeding an 8-input OR gate", "6 three-input AND gates feeding a 6-input OR gate", "A single 8-input AND gate"],
    answer: 0,
    solution:
      "A 256-row truth table is impractical, so capture the function as an equation with one term per possible position of the run: $y = abcd + bcde + cdef + defg + efgh$.\nA run of 4 can start at positions $a, b, c, d, e$: $8 - 4 + 1 = 5$ terms, each a 4-input AND, ORed by a 5-input OR. (The lecture's three-1s version has $8 - 3 + 1 = 6$ three-input terms.)",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "easy",
    source: "Style: Lecture 07 p.20 (New Year's countdown)",
    prompt: "A processor counts down from 59 to 0 in binary, and a decoder lights exactly one of the bulbs labelled 0 … 59. If the smallest suitable binary decoder is used, how many of its outputs are left unconnected?",
    options: ["4", "5", "6", "0", "60"],
    answer: 0,
    solution:
      "The count needs $\\lceil \\log_2 60 \\rceil = 6$ bits (0 … 59 is **60** values), so a 6-to-64 decoder is needed. $64 - 60 = 4$ outputs ($d_{60} \\dots d_{63}$) are unused.\n**5** comes from forgetting that 0 is also a value ($64 - 59$).",
  },
  {
    kind: "mcq",
    subtopic: "Block-diagram design",
    difficulty: "medium",
    source: "Style: Tut 6 Q3",
    prompt:
      "In the ferry boarding system, a 2-bit ramp number $R$ drives a 2-to-4 decoder whose one-hot outputs light the four green ramp lights. The signal $FULL$ is 1 when all ramps are full. The designer connects $FULL$ **directly** to the decoder's active-high enable. What happens?",
    options: [
      "When the ramps are not full all lights are off, and when they are full one light shows: the opposite of what is wanted",
      "It still works, because the decoder ignores EN whenever $R$ is valid",
      "Two lights come on whenever $FULL = 1$",
      "All four lights come on when $FULL = 1$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "With an active-high enable, $EN = 0$ forces every output to 0 and $EN = 1$ gives the normal one-hot output. Connecting $FULL$ directly therefore lights a ramp only when everything is full, and lights nothing when cars should board.\nThe fix is $EN = FULL'$ (an inverter). The outputs stay one-hot or all-zero; never two or four at once.",
  },
  // ---------------------------------------------------------------- short
  {
    kind: "short",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: Tut 6 Q1",
    prompt:
      "Determine the **minimised sum-of-products** expression for the output $F$ of the 4-to-1 multiplexer below, in terms of $s_1, s_0, a, b$ ($s_1$ is the MSB of the select). Constants 1 and 0 are tied to $I_2$ and $I_3$.",
    figures: [fig(muxSvg(["b", "a'", "1", "0"], ["s1", "s0"]), "4-to-1 MUX with an inverted input and constant data lines")],
    match: "expr",
    vars: ["s1", "s0", "a", "b"],
    minimal: true,
    accept: ["s1s0' + s0'b + s1's0a'"],
    placeholder: "e.g. s1s0' + …",
    solution:
      "Write the multiplexer equation and substitute the data lines:\n$F = s_1's_0'\\,I_0 + s_1's_0\\,I_1 + s_1s_0'\\,I_2 + s_1s_0\\,I_3 = s_1's_0'b + s_1's_0a' + s_1s_0'$ (the $I_3 = 0$ term vanishes).\nMinimise: $s_1s_0'$ combines with $s_1's_0'b$ because $s_1s_0' + s_1's_0'b = s_0'(s_1 + s_1'b) = s_0'(s_1 + b)$. So\n$F = s_1s_0' + s_0'b + s_1's_0a'$.\nThe K-map below shows the three groups. As a circuit: three AND gates (with bubbles for the complemented inputs) feeding a 3-input OR.",
    solutionFigures: [{ kind: "kmap", vars: ["s1", "s0", "a", "b"], values: "0101110011110000", groups: ["s1s0'", "s0'b", "s1's0a'"], caption: "F = s1s0' + s0'b + s1's0a'" }],
  },
  {
    kind: "short",
    subtopic: "Comparators",
    difficulty: "hard",
    source: "Style: PYP 2018-19 S2 Q3(a)",
    prompt:
      "A 2-bit comparator has inputs $A = A_1A_0$ and $B = B_1B_0$ (unsigned). Give the **minimal SOP** for the output $G$, which is 1 when $A > B$. Use the variable names `A1, A0, B1, B0`.",
    match: "expr",
    vars: ["A1", "A0", "B1", "B0"],
    minimal: true,
    accept: ["A1B1' + A1A0B0' + A0B1'B0'"],
    placeholder: "e.g. A1B1' + …",
    solution:
      "Step 1, capture the function: the 16-row truth table over $A_1A_0B_1B_0$ has $G = 1$ where $A > B$: $A = 1$ vs $B = 0$ ($m_4$), $A = 2$ vs $B = 0, 1$ ($m_8, m_9$), $A = 3$ vs $B = 0, 1, 2$ ($m_{12}, m_{13}, m_{14}$). So $G = \\sum m(4, 8, 9, 12, 13, 14)$.\nStep 2A, K-map (rows $A_1A_0$, columns $B_1B_0$): $m_8, m_9, m_{12}, m_{13}$ form $A_1B_1'$; $m_{12}, m_{14}$ form $A_1A_0B_0'$; $m_4, m_{12}$ form $A_0B_1'B_0'$.\n$G = A_1B_1' + A_1A_0B_0' + A_0B_1'B_0'$. (PYP 2018-19 S2 Q3(a) also asks for $Y = (A \\le B)$, which is just $G'$.)",
    solutionFigures: [{ kind: "kmap", vars: ["A1", "A0", "B1", "B0"], values: "0000100011001110", groups: ["A1B1'", "A1A0B0'", "A0B1'B0'"], caption: "A > B for 2-bit numbers" }],
  },
  {
    kind: "short",
    subtopic: "Seven-segment decoders",
    difficulty: "medium",
    source: "Style: Lab 3 §4.3, Lecture 07 p.14–15",
    prompt:
      "The hexadecimal seven-segment decoder of Lecture 07 and Lab 3 has input $WXYZ$ ($W$ = MSB) and active-high outputs. Using the truth table, give the **minimal SOP** for segment **c** (bottom right).",
    figures: [segHexTable],
    match: "expr",
    vars: ["W", "X", "Y", "Z"],
    minimal: true,
    accept: ["Y'Z + W'Z + W'Y' + W'X + WX'"],
    placeholder: "e.g. Y'Z + …",
    solution:
      "Segment c is dark only for 2, C, E, F: $c = \\sum m(0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13)$.\nK-map groups (each a quad): $W'Y'$ ($m_0, m_1, m_4, m_5$), $W'Z$ ($m_1, m_3, m_5, m_7$), $W'X$ ($m_4, m_5, m_6, m_7$), $WX'$ ($m_8 \\dots m_{11}$), and $Y'Z$ ($m_1, m_5, m_9, m_{13}$), which is the only quad containing $m_{13}$.\n$c = Y'Z + W'Z + W'Y' + W'X + WX'$ (5 terms, as in Lab 3 §4.3 you derive c, d and f yourself).",
    solutionFigures: [{ kind: "kmap", vars: ["W", "X", "Y", "Z"], values: "1101111111110100", groups: ["Y'Z", "W'Z", "W'Y'", "W'X", "WX'"], caption: "Segment c of the hexadecimal decoder" }],
  },
  {
    kind: "short",
    subtopic: "Decoders",
    difficulty: "easy",
    source: "Style: PYP 2020-21 S2 Q3(a)",
    prompt: "How many **2-to-4 decoders with enable** are needed to build a 4-to-16 decoder (no other gates)?",
    match: "number",
    accept: ["5"],
    solution:
      "Use a tree: one 2-to-4 decoder decodes the two MSBs $A_3A_2$, and each of its four outputs enables one of four second-level 2-to-4 decoders that all receive $A_1A_0$. Total $1 + 4 = 5$.\nOnly the second-level decoder enabled by the first level produces a 1, so exactly one of the 16 outputs is high.",
  },
  {
    kind: "short",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: PYP 2016-17 S1 Q3(b), PYP 2018-19 S1 Q3(a)",
    prompt:
      "$F(A,B,C,D) = \\sum m(1,4,5,8,9,11,14,15)$ is implemented with a 4-to-1 multiplexer whose select lines are $S_1S_0 = AB$, plus gates on the data lines. Give the simplest expression (in $C$ and $D$) that must be connected to data line $I_2$.",
    match: "expr",
    vars: ["C", "D"],
    accept: ["C' + D"],
    placeholder: "e.g. C'D",
    solution:
      "$I_2$ is selected when $AB = 10$, i.e. for minterms 8–11, where $CD$ runs through 00, 01, 10, 11.\n$F$ is 1 for $m_8$ ($CD = 00$), $m_9$ ($01$) and $m_{11}$ ($11$), and 0 for $m_{10}$ ($10$). So $I_2 = C'D' + C'D + CD = C' + D$ (only $CD = 10$ is excluded).\nFor completeness: $I_0 = C'D$, $I_1 = C'$, $I_3 = C$.",
  },
  {
    kind: "short",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: PYP 2016-17 S2 Q3(c)",
    prompt:
      "$F(A,B,C) = A'B + BC' + AB'C$ is implemented with a single 8-to-1 multiplexer with select lines $S_2S_1S_0 = ABC$ and each data line tied to 0 or 1. Enter the data-line values as an 8-bit string in the order $I_7 I_6 \\dots I_0$.",
    match: "text",
    accept: ["01101100"],
    placeholder: "I7 … I0",
    solution:
      "Expand into minterms: $A'B$ covers 010, 011 → $m_2, m_3$; $BC'$ covers 010, 110 → $m_2, m_6$; $AB'C$ is $m_5$. So $F = \\sum m(2, 3, 5, 6)$.\nWith all three variables on the select lines, $I_k = F(m_k)$: $I_2 = I_3 = I_5 = I_6 = 1$, the rest 0.\nIn the order $I_7 \\dots I_0$: **0110 1100**. (Writing $I_0$ first gives 0011 0110, a common slip.)",
  },
  {
    kind: "short",
    subtopic: "Priority encoders",
    difficulty: "medium",
    source: "Style: PYP 2017-18 S2 Q2(a)(i)",
    prompt:
      "For the circuit of PYP 2017-18 S2 Table Q2 (active-low inputs $E^*, A_7^* \\dots A_1^*$; $Y_2Y_1Y_0$ = index of the highest-numbered asserted input when $E^*$ is asserted, 000 otherwise), write a minimal SOP for $Y_1$. Use `E` for \"$E^*$ asserted\" and `a7` … `a1` for \"$A_k^*$ asserted\" (so `E` = $(E^*)'$, `a7` = $(A_7^*)'$).",
    figures: [
      {
        kind: "table",
        head: ["$E^*$", "$A_7^*$", "$A_6^*$", "$A_5^*$", "$A_4^*$", "$A_3^*$", "$A_2^*$", "$A_1^*$", "$Y_2$", "$Y_1$", "$Y_0$"],
        rows: [
          [1, "x", "x", "x", "x", "x", "x", "x", 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
          [0, 1, 1, 1, 1, 1, 0, "x", 0, 1, 0],
          [0, 1, 1, 1, 1, 0, "x", "x", 0, 1, 1],
          [0, 1, 1, 1, 0, "x", "x", "x", 1, 0, 0],
          [0, 1, 1, 0, "x", "x", "x", "x", 1, 0, 1],
          [0, 1, 0, "x", "x", "x", "x", "x", 1, 1, 0],
          [0, 0, "x", "x", "x", "x", "x", "x", 1, 1, 1],
        ],
        caption: "Table Q2 (x = don't care)",
      },
    ],
    match: "expr",
    vars: ["E", "a7", "a6", "a5", "a4", "a3", "a2", "a1"],
    minimal: true,
    accept: ["Ea7 + Ea6 + Ea5'a4'a3 + Ea5'a4'a2"],
    placeholder: "e.g. Ea7 + …",
    solution:
      "$Y_1 = 1$ in the rows where the winning input is $A_7$, $A_6$, $A_3$ or $A_2$, and only when $E$ is asserted:\n$Y_1 = E\\,[a_7 + a_7'a_6 + a_7'a_6'a_5'a_4'a_3 + a_7'a_6'a_5'a_4'a_3'a_2]$.\nWith $x + x'y = x + y$ the complemented higher inputs drop out: $a_7 + a_7'a_6 = a_7 + a_6$, and once $a_7 + a_6$ is present the $a_7'a_6'$ factors are not needed; likewise $a_3 + a_3'a_2 = a_3 + a_2$.\n$Y_1 = Ea_7 + Ea_6 + Ea_5'a_4'a_3 + Ea_5'a_4'a_2$. In the circuit, each asserted-low input $A_k^*$ reaches an AND gate through a bubble.",
  },
  {
    kind: "short",
    subtopic: "Multiplexers",
    difficulty: "medium",
    source: "Style: Tut 6 Q1, Lecture 13 p.11 (MUX feeding a MUX)",
    prompt:
      "In the circuit below each MUX outputs its 0-input when $S = 0$ and its 1-input when $S = 1$ (the first MUX receives $C$ on input 0 and $C'$ on input 1, with select $B$). Give the **minimal SOP** for $F(A, B, C)$.",
    figures: [{ kind: "circuit", circuit: { inputs: ["A", "B", "C"], gates: [{ id: "M1", type: "MUX2", in: ["C", "!C", "B"] }, { id: "F", type: "MUX2", in: ["M1", "B", "A"] }], outputs: ["F"], showNets: true } }],
    match: "expr",
    vars: ["A", "B", "C"],
    minimal: true,
    accept: ["A'B'C + BC' + AB"],
    placeholder: "e.g. AB + …",
    solution:
      "The first MUX gives $M_1 = B'C + BC' = B \\oplus C$. The second gives $F = A'M_1 + AB = A'(B \\oplus C) + AB$.\nMinterms: with $A = 0$, $F = B \\oplus C$ → $m_1, m_2$; with $A = 1$, $F = B$ → $m_6, m_7$. So $F = \\sum m(1, 2, 6, 7)$.\nK-map groups: $BC'$ ($m_2, m_6$), $AB$ ($m_6, m_7$) and the lone $A'B'C$ ($m_1$): $F = A'B'C + BC' + AB$.",
    solutionFigures: [{ kind: "kmap", vars: ["A", "B", "C"], values: "01100011", groups: ["A'B'C", "BC'", "AB"] }],
  },
  {
    kind: "short",
    subtopic: "Decoders",
    difficulty: "medium",
    source: "Style: PYP 2018-19 S2 Q3(a), PYP 2017-18 S1 Q3(b)",
    prompt: "A 4-to-16 decoder has inputs $ABCD$ ($A$ = MSB) and active-high outputs $d_0 \\dots d_{15}$. Outputs $d_3$, $d_7$, $d_{11}$ and $d_{15}$ are ORed to give $F$. Give the **minimal SOP** for $F$.",
    match: "expr",
    vars: ["A", "B", "C", "D"],
    minimal: true,
    accept: ["CD"],
    solution:
      "$F = \\sum m(3, 7, 11, 15)$: 0011, 0111, 1011, 1111. These are exactly the inputs with $C = D = 1$, whatever $A$ and $B$ are, so the four cells form one column of the K-map: $F = CD$.\nA decoder + OR always works, but here a single AND gate would do the same job.",
  },
  // ---------------------------------------------------------------- open
  {
    kind: "open",
    subtopic: "Comparators",
    difficulty: "hard",
    source: "Style: PYP 2021-22 S1 Q4",
    prompt:
      "Design a circuit that compares two **5-bit two's complement** numbers $X$ and $Y$ and outputs $L = 1$ when $X < Y$ (otherwise $L = 0$). You must use exactly one instance of each of the following modules, plus at most one inverter:\n- a 4-to-1 multiplexer `module mux41 (input [3:0] D, input [1:0] S, output W);` ($W = D[S]$)\n- a 4-bit unsigned magnitude comparator `module umc4 (input [3:0] A, B, output U);` ($U = 1$ when $A \\ge B$)\n(a) Sketch the implementation using the conventional MUX symbol and a box for the comparator. Label all signals. (18 marks)\n(b) Write the Verilog module `lt5` for your design using **named** instantiation. Internal signal names must match your sketch. (10 marks)",
    modelAnswer:
      "**(a)** Use the sign bits as the MUX select, $S = \\{X[4], Y[4]\\}$, and compare the lower 4 bits with the unsigned comparator, $A = X[3{:}0]$, $B = Y[3{:}0]$.\n- $S = 00$ (both $\\ge 0$): $X < Y$ exactly when the lower bits are not $\\ge$: $D[0] = U'$.\n- $S = 01$ ($X \\ge 0 > Y$): never less: $D[1] = 0$.\n- $S = 10$ ($X < 0 \\le Y$): always less: $D[2] = 1$.\n- $S = 11$ (both negative, both carry the $-16$ weight): order decided by the lower bits: $D[3] = U'$.\nOne inverter produces $U'$, which feeds $D[0]$ and $D[3]$.\n**(b)**\n```\nmodule lt5 (input [4:0] X, Y,\n            output L);\n  wire U;\n  umc4  C1 (.A(X[3:0]), .B(Y[3:0]), .U(U));\n  mux41 M1 (.D({~U, 1'b1, 1'b0, ~U}),\n            .S({X[4], Y[4]}),\n            .W(L));\nendmodule\n```\nCheck with $X = 10110$ ($-10$), $Y = 01001$ ($+9$): $S = 10$, $W = D[2] = 1$ ✓. With $X = 11100$ ($-4$), $Y = 11010$ ($-6$): $S = 11$, $U = (1100 \\ge 1010) = 1$, $L = U' = 0$ ✓.",
    modelFigures: [fig(signedCompSvg(["U'", "0", "1", "U'"], 5, "L"), "X < Y for 5-bit two's complement numbers")],
    rubric: [
      { point: "(a) Sign bits X[4], Y[4] drive the MUX select (X[4] as MSB)", marks: 4 },
      { point: "(a) Comparator fed with X[3:0] and Y[3:0]", marks: 4 },
      { point: "(a) D[0] and D[3] = U' via one inverter (no inversion error for the both-negative case)", marks: 6 },
      { point: "(a) D[1] = 0 and D[2] = 1 for the mixed-sign cases", marks: 2 },
      { point: "(a) All signals labelled (internal U, output L)", marks: 2 },
      { point: "(b) Module header with 5-bit X, Y and output L; internal wire U declared", marks: 3 },
      { point: "(b) umc4 instantiated with named connections to the correct slices", marks: 3 },
      { point: "(b) mux41 instantiated with named connections, D built by concatenation {~U,1'b1,1'b0,~U}, S = {X[4],Y[4]}", marks: 4 },
    ],
    solution: "See the model answer: select on the two sign bits, pass $U'$ through when the signs agree, and hard-wire 0/1 when they differ.",
  },
  {
    kind: "open",
    subtopic: "Block-diagram design",
    difficulty: "medium",
    source: "Style: Tut 6 Q3",
    prompt:
      "A theme-park ride directs riders to one of **six** boarding gates using a 3-bit gate number $G$ (0–5) and a 1-bit signal $STOP$ that is 1 when boarding is suspended. Each gate has a green lamp $L[5{:}0]$, of which at most one is on. If $G$ is 6 or 7 (an invalid code) and boarding is not suspended, an error lamp $ERR$ must light instead. When $STOP = 1$, every lamp is off.\n(a) Sketch a block diagram using a single 3-to-8 decoder with an active-high enable plus any extra gates you need. (6 marks)\n(b) Write a Verilog module `ride` that instantiates the predefined decoder `module dec3to8 (input [2:0] i, input en, output [7:0] d);` using named instantiation. (8 marks)",
    modelAnswer:
      "**(a)** Connect $G$ to the decoder input $i$ and $STOP'$ (through an inverter) to the enable, so all outputs are 0 when $STOP = 1$. Outputs $d_0 \\dots d_5$ drive the gate lamps $L_0 \\dots L_5$ directly. Outputs $d_6$ and $d_7$ go to a 2-input OR gate whose output is $ERR$.\n**(b)**\n```\nmodule ride (input [2:0] G,\n             input STOP,\n             output [5:0] L,\n             output ERR);\n  wire [7:0] d;\n  dec3to8 U1 (.i(G), .en(~STOP), .d(d));\n  assign L   = d[5:0];\n  assign ERR = d[6] | d[7];\nendmodule\n```\nBecause the decoder output is one-hot (or all zero when disabled), at most one lamp is ever on.",
    modelFigures: [fig(decoder38(["G[2]", "G[1]", "G[0]"], ["L0", "L1", "L2", "L3", "L4", "L5", "→ OR → ERR", "→ OR → ERR"], "STOP'"), "Decoder outputs 6 and 7 are ORed into ERR; the enable is STOP'")],
    rubric: [
      { point: "(a) G connected to the decoder inputs, d0–d5 to the lamps", marks: 2 },
      { point: "(a) Enable driven by STOP' (inverter shown)", marks: 2 },
      { point: "(a) ERR = d6 + d7 with an OR gate", marks: 2 },
      { point: "(b) Module header with correct directions and widths", marks: 2 },
      { point: "(b) 8-bit internal wire for the decoder outputs", marks: 2 },
      { point: "(b) Named instantiation of dec3to8 with en = ~STOP", marks: 2 },
      { point: "(b) Continuous assignments for L and ERR", marks: 2 },
    ],
    solution: "Enable = STOP', lamps from $d_0 \\dots d_5$, and ERR = $d_6 + d_7$.",
  },
  {
    kind: "open",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: PYP 2016-17 S2 Q3(c), PYP 2016-17 S1 Q3(b)",
    prompt:
      "$F(A,B,C,D) = \\sum m(0, 1, 3, 4, 8, 9, 15)$.\n(a) Implement $F$ with one 8-to-1 multiplexer (select lines $ABC$, $A$ = MSB) and one inverter. Give the value on every data line. (6 marks)\n(b) Implement $F$ with one 4-to-1 multiplexer (select lines $AB$) and a minimum number of basic gates on the data lines. (6 marks)",
    modelAnswer:
      "**(a)** Pair the minterms by $D$: $I_k$ covers $m_{2k}$ ($D = 0$) and $m_{2k+1}$ ($D = 1$).\n- $I_0$: $m_0, m_1$ both 1 → **1**\n- $I_1$: $m_3$ only → **D**\n- $I_2$: $m_4$ only → **D'** (the inverter)\n- $I_3$: none → **0**\n- $I_4$: $m_8, m_9$ → **1**\n- $I_5$, $I_6$: none → **0**\n- $I_7$: $m_{15}$ only → **D**\n**(b)** Each data line is a function of $C, D$ (the four minterms of one $AB$ value):\n- $I_0$ ($AB = 00$: $m_0, m_1, m_3$) $= C'D' + C'D + CD = C' + D$ → an OR gate with an inverted $C$\n- $I_1$ ($AB = 01$: $m_4$) $= C'D' = (C + D)'$ → a NOR gate\n- $I_2$ ($AB = 10$: $m_8, m_9$) $= C'$ → the same inverter\n- $I_3$ ($AB = 11$: $m_{15}$) $= CD$ → an AND gate\nGates: one NOT ($C'$), one OR, one NOR, one AND.",
    modelFigures: [fig(muxSvg(["1", "D", "D'", "0", "1", "0", "0", "D"], ["A", "B", "C"], "F", "8:1")), fig(muxSvg(["C' + D", "(C + D)'", "C'", "CD"], ["A", "B"], "F", "4:1"))],
    rubric: [
      { point: "(a) Minterms correctly paired by D (method shown)", marks: 2 },
      { point: "(a) All eight data lines correct (1, D, D', 0, 1, 0, 0, D)", marks: 3 },
      { point: "(a) Inverter used for D'", marks: 1 },
      { point: "(b) I0 = C' + D", marks: 2 },
      { point: "(b) I1 = (C + D)', I2 = C', I3 = CD", marks: 3 },
      { point: "(b) Gate count minimal and circuit labelled", marks: 1 },
    ],
    solution: "Pair minterms by the variable not on the select lines; each data line is the residual function of the free variable(s).",
  },
];
