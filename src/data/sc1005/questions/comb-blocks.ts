import type { Draft, Figure } from "@/lib/sc1005/types";

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

const segTable: Figure = {
  kind: "table",
  head: ["Digit", "a", "b", "c", "d", "e", "f", "g"],
  rows: Array.from({ length: 10 }, (_, d) => [d, ..."abcdefg".split("").map((s) => (SEG7[d].includes(s) ? 1 : 0))]),
  caption: "Segments lit for each BCD digit (1 = lit), a = top segment, clockwise, g = middle",
};

export const combBlocksQuestions: Draft[] = [
  // ---------------------------------------------------------------- MCQ
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "easy",
    source: "Style: PYP 2017-18 S2 Q3(a)",
    prompt: "A multiplexer must route any one of **48** data inputs to its single output. What is the minimum number of select lines it needs?",
    options: ["5", "6", "24", "48", "There are multiple correct answers"],
    answer: 1,
    solution:
      "An $n$-input multiplexer needs $\\lceil \\log_2 n \\rceil$ select bits, because the select lines must be able to name every input with a distinct binary code.\n$2^5 = 32 < 48$, so 5 bits cannot name all inputs; $2^6 = 64 \\ge 48$, so **6** select lines are needed (16 of the 64 codes are unused).\n24 and 48 confuse select lines with data lines (one-hot selection would need 48 lines).",
  },
  {
    kind: "mcq",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: Tutorial 6 Q1",
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
    source: "Style: PYP 2016-17 S2 Q3(b)",
    prompt: "A 3-to-8 decoder has inputs $I_2I_1I_0 = ABC$ ($A$ is the MSB) and active-high outputs $d_0 \\dots d_7$. Outputs $d_1$, $d_2$, $d_4$ and $d_7$ are connected to a 4-input OR gate whose output is $F$. What is $F$?",
    figures: [fig(decoder38(["A", "B", "C"], ["", "to OR", "to OR", "", "to OR", "", "", "to OR"], "1"), "Only the marked outputs feed the OR gate")],
    options: ["$F = A \\oplus B \\oplus C$", "$F = AB + BC + AC$", "$F = (A \\oplus B \\oplus C)'$", "$F = A'B'C + ABC'$", "$F = A + B + C$"],
    answer: 0,
    solution:
      "Output $d_k$ of a decoder is exactly minterm $m_k$ of its inputs, so ORing outputs builds a sum of minterms: $F = \\sum m(1,2,4,7)$.\nThese are the input combinations with an **odd** number of 1s (001, 010, 100, 111), which is the definition of the 3-input XOR (odd parity), i.e. the sum output of a full adder.\n$AB + BC + AC = \\sum m(3,5,6,7)$ is the carry (majority) function, and option C is the even-parity function $\\sum m(0,3,5,6)$.",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "hard",
    source: "Original",
    prompt:
      "A 3-to-8 decoder has **active-low** outputs $\\overline{Y_0} \\dots \\overline{Y_7}$: the selected output is 0 and all the others are 1. Its inputs are $ABC$ ($A$ = MSB) and it is permanently enabled. Outputs $\\overline{Y_0}$, $\\overline{Y_2}$, $\\overline{Y_5}$ and $\\overline{Y_7}$ drive a 4-input **AND** gate with output $G$. Which of the following describes $G$?",
    options: ["$G = \\sum m(0,2,5,7)$", "$G = \\sum m(1,3,4,6)$", "$G = \\prod M(0,2,5,7)$", "$G = \\prod M(1,3,4,6)$", "There are multiple correct answers"],
    answer: 4,
    solution:
      "The AND output is 1 only when **all four** of its inputs are 1, i.e. when none of outputs 0, 2, 5, 7 is the selected (low) one. So $G = 0$ exactly for inputs 0, 2, 5, 7 and $G = 1$ for 1, 3, 4, 6.\nThat is $G = \\sum m(1,3,4,6)$, and listing the zeros instead gives the same function as $\\prod M(0,2,5,7)$. Both **B** and **C** are correct, so the answer is **E**.\n(Rule of thumb: active-low outputs into a NAND give $\\sum m$ of the connected outputs; into an AND they give $\\prod M$ of the connected outputs.) A and D describe the complement $G'$.",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "medium",
    source: "Style: Lecture 7 (larger decoders)",
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
    source: "Original",
    prompt:
      "An 8-to-3 **priority** encoder gives the index of the highest-numbered active input ($I_7$ has the highest priority) on $Y_2Y_1Y_0$, and a valid output $V = 1$ when any input is active. The inputs are shown below. What are the outputs?",
    figures: [{ kind: "table", head: ["$I_7$", "$I_6$", "$I_5$", "$I_4$", "$I_3$", "$I_2$", "$I_1$", "$I_0$"], rows: [[0, 0, 1, 0, 1, 1, 0, 0]] }],
    options: ["$Y_2Y_1Y_0 = 101$, $V = 1$", "$Y_2Y_1Y_0 = 010$, $V = 1$", "$Y_2Y_1Y_0 = 111$, $V = 1$", "$Y_2Y_1Y_0 = 011$, $V = 1$", "$Y_2Y_1Y_0 = 000$, $V = 0$"],
    answer: 0,
    solution:
      "Active inputs: $I_5$, $I_3$, $I_2$. The highest-numbered one wins, so the output is $5 = 101_2$, and $V = 1$ because at least one input is active.\n**B** (010) picks the lowest active input instead. **C** (111) is what a plain OR-gate encoder produces: it ORs the codes $101 + 011 + 010 = 111$, which names an input that is not even active. That is exactly why a priority encoder is needed when several inputs can be active at once.",
  },
  {
    kind: "mcq",
    subtopic: "Encoders",
    difficulty: "medium",
    source: "Original",
    prompt:
      "A simple 4-to-2 encoder is built from two OR gates: $Y_1 = I_2 + I_3$ and $Y_0 = I_1 + I_3$ (shown below). It is designed for one-hot inputs. What happens if $I_1$ and $I_2$ are both 1 (and $I_0 = I_3 = 0$)?",
    figures: [{ kind: "circuit", circuit: { inputs: ["I3", "I2", "I1", "I0"], gates: [{ id: "Y1", type: "OR", in: ["I2", "I3"] }, { id: "Y0", type: "OR", in: ["I1", "I3"] }], outputs: ["Y1", "Y0"] } }],
    options: [
      "$Y_1Y_0 = 11$: the same code as $I_3$ alone, so the output is wrong",
      "$Y_1Y_0 = 10$: $I_2$ wins because it has the larger index",
      "$Y_1Y_0 = 01$: $I_1$ wins because it is checked first",
      "$Y_1Y_0 = 00$: the encoder detects the conflict and outputs 0",
      "The outputs oscillate between 01 and 10",
    ],
    answer: 0,
    solution:
      "Evaluate the gates: $Y_1 = I_2 + I_3 = 1 + 0 = 1$ and $Y_0 = I_1 + I_3 = 1 + 0 = 1$, so $Y_1Y_0 = 11$.\nThe OR encoder simply ORs the codes of all active inputs ($10 + 01 = 11$), producing the code of $I_3$, which is not active. There is no priority logic and no feedback, so B, C, D and E are impossible. A **priority encoder** adds gating so that a higher input masks the lower ones (e.g. $Y_0 = I_3 + I_1I_2'$).",
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
    source: "Style: Lecture 7 (7-segment decoder)",
    prompt:
      "A BCD-to-7-segment decoder drives a **common-anode** display, so each segment output is **active-low** (a segment lights when its output is 0). Using the segment table below, for which BCD inputs (0–9) is the decoder's output for segment **c** at logic 1?",
    figures: [segTable],
    options: ["Only for input 2", "For inputs 2 and 5", "For inputs 5 and 6", "For inputs 1, 4 and 7", "For every input except 2"],
    answer: 0,
    solution:
      "Read the c column: segment c is lit for every digit except **2**.\nWith an active-low (common-anode) display, a lit segment needs output 0 and an unlit segment needs output 1. So the c output is 1 only when the segment is dark, i.e. only for input 2.\n**E** is the active-high answer (common-cathode). Segment **b** is the one that is dark for 5 and 6, which is where B and C come from.",
  },
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "medium",
    source: "Original",
    prompt: "A 32-to-1 multiplexer must be built using **only 4-to-1 multiplexers** (unused data or select inputs may be tied to constants). What is the minimum number of 4-to-1 multiplexers?",
    options: ["8", "10", "11", "16", "31"],
    answer: 2,
    solution:
      "Build a tree. Level 1: $32/4 = 8$ muxes, all driven by $S_1S_0$. Level 2: the 8 outputs go into $8/4 = 2$ muxes driven by $S_3S_2$. Level 3: the 2 remaining outputs still have to be selected by $S_4$, which needs one more mux (use two of its four data inputs and tie its upper select bit to 0).\nTotal $8 + 2 + 1 = 11$. **10** forgets the last stage; **31** is the count for 2-to-1 muxes.",
  },
  {
    kind: "mcq",
    subtopic: "Demultiplexers",
    difficulty: "easy",
    source: "Original",
    prompt: "A 1-to-4 **demultiplexer** sends its data input $D$ to the output selected by $S_1S_0$; the other outputs are 0. Which block behaves identically?",
    options: [
      "A 2-to-4 decoder whose inputs are $S_1S_0$ and whose enable is $D$",
      "A 4-to-1 multiplexer whose select lines are $S_1S_0$",
      "A 4-to-2 encoder whose inputs are $D, S_1, S_0$ and 0",
      "A 2-to-4 decoder whose inputs are $D$ and $S_0$ and whose enable is $S_1$",
      "A 2-bit magnitude comparator",
    ],
    answer: 0,
    solution:
      "Output $k$ of a demux is $D \\cdot m_k(S_1, S_0)$. Output $k$ of a decoder with enable is $EN \\cdot m_k(I_1, I_0)$. They are identical when $EN = D$ and $I_1I_0 = S_1S_0$: with $D = 0$ all outputs are 0, with $D = 1$ exactly the selected output is 1.\nThis is why decoder chips with an enable are sold as \"decoder/demultiplexers\". A multiplexer does the opposite job (many inputs to one output).",
  },
  {
    kind: "mcq",
    subtopic: "Multiplexers",
    difficulty: "medium",
    source: "Style: Lecture 7 (timing diagrams)",
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
    source: "Style: PYP 2017-18 S1 Q3(c)",
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
    source: "Style: PYP 2018-19 S1 Q3(b)",
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
    source: "Style: Lecture 4/7 (adder–subtractor block)",
    prompt:
      "A 4-bit adder–subtractor block feeds each bit of $B$ through an XOR gate with control $SUB$, and connects $SUB$ to the adder's carry-in. With $A = 0101$, $B = 0111$ and $SUB = 1$, what are the 4-bit result $S$ and the carry-out?",
    options: ["$S = 1110$, $C_{out} = 0$", "$S = 1110$, $C_{out} = 1$", "$S = 0010$, $C_{out} = 1$", "$S = 1101$, $C_{out} = 0$", "$S = 1100$, $C_{out} = 1$"],
    answer: 0,
    solution:
      "With $SUB = 1$ the XORs invert $B$: $B' = 1000$, and the carry-in adds 1, so the block computes $A + B' + 1 = A - B$.\n$0101 + 1000 + 1 = 1110$ with no carry out of bit 3, so $S = 1110$ ($-2$ in two's complement, correct for $5 - 7$) and $C_{out} = 0$.\nFor unsigned subtraction $C_{out} = 0$ means a borrow occurred ($A < B$). **D** forgets the carry-in of 1 (one's complement only), and **C** computes $B - A$.",
  },
  {
    kind: "mcq",
    subtopic: "Decoders",
    difficulty: "easy",
    source: "Style: Lecture 7 (decoder internals)",
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
    source: "Style: Lecture 7 (three 1s detector)",
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
    source: "Style: Lecture 7 (New Year's countdown)",
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
    source: "Style: Tutorial 6 Q3",
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
      "With an active-high enable, $EN = 0$ forces every output to 0 and $EN = 1$ gives the normal one-hot output. Connecting $FULL$ directly therefore lights a ramp only when everything is full, and lights nothing when cars should board.\nThe fix is $EN = FULL'$ (an inverter, or a decoder with an active-low enable). The outputs stay one-hot or all-zero; never two or four at once.",
  },
  // ---------------------------------------------------------------- short
  {
    kind: "short",
    subtopic: "Implementing functions with a MUX",
    difficulty: "medium",
    source: "Style: Tutorial 6 Q1",
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
    source: "Style: PYP 2016-17 S1 Q3(a)",
    prompt:
      "A 2-bit magnitude comparator has inputs $A = A_1A_0$ and $B = B_1B_0$ (unsigned). Give the **minimal SOP** for the output $G$, which is 1 when $A > B$. Use the variable names `A1, A0, B1, B0`.",
    match: "expr",
    vars: ["A1", "A0", "B1", "B0"],
    minimal: true,
    accept: ["A1B1' + A1A0B0' + A0B1'B0'"],
    placeholder: "e.g. A1B1' + …",
    solution:
      "Think in terms of the comparison rule: $A > B$ if the MSBs decide it ($A_1 = 1, B_1 = 0$), or the MSBs are equal and the LSBs decide it ($A_0 = 1, B_0 = 0$).\n$G = A_1B_1' + (A_1 \\odot B_1)A_0B_0'$. Expanding $A_1 \\odot B_1 = A_1B_1 + A_1'B_1'$ and minimising on a K-map (rows $A_1A_0$, columns $B_1B_0$) gives three prime implicants:\n$G = A_1B_1' + A_1A_0B_0' + A_0B_1'B_0'$.\n$G = \\sum m(4, 8, 9, 12, 13, 14)$; check: $A = 10, B = 01$ ($m_9$) is covered by $A_1B_1'$.",
    solutionFigures: [{ kind: "kmap", vars: ["A1", "A0", "B1", "B0"], values: "0000100011001110", groups: ["A1B1'", "A1A0B0'", "A0B1'B0'"], caption: "A > B for 2-bit numbers" }],
  },
  {
    kind: "short",
    subtopic: "Seven-segment decoders",
    difficulty: "medium",
    source: "Style: Lecture 7 (7-segment decoder)",
    prompt:
      "A BCD-to-7-segment decoder (active-high outputs) has input $WXYZ$ ($W$ = MSB). Inputs 1010–1111 never occur and may be treated as don't cares. Using the segment table, give the **minimal SOP** for segment **e** (bottom-left).",
    figures: [segTable],
    match: "expr",
    dontCares: [10, 11, 12, 13, 14, 15],
    vars: ["W", "X", "Y", "Z"],
    minimal: true,
    accept: ["X'Z' + YZ'"],
    placeholder: "e.g. X'Z' + …",
    solution:
      "Segment e is lit for digits 0, 2, 6, 8: $e = \\sum m(0, 2, 6, 8) + d(10, 11, 12, 13, 14, 15)$.\nOn the K-map: the four corners $m_0, m_2, m_8, m_{10}$ form $X'Z'$ (using $d_{10}$), and $m_2, m_6, m_{10}, m_{14}$ form the quad $YZ'$ (using $d_{10}, d_{14}$).\n$e = X'Z' + YZ' = Z'(X' + Y)$. Without the don't cares you would need four terms, which is why BCD decoders always exploit the unused codes.",
    solutionFigures: [{ kind: "kmap", vars: ["W", "X", "Y", "Z"], values: "1010001010xxxxxx", groups: ["X'Z'", "YZ'"], caption: "Segment e with don't cares for 10–15" }],
  },
  {
    kind: "short",
    subtopic: "Decoders",
    difficulty: "easy",
    source: "Original",
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
    source: "Style: PYP 2017-18 S2 Q3(b)",
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
    source: "Style: PYP 2017-18 S1 Q3(c)",
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
    source: "Original",
    prompt:
      "An 8-to-3 priority encoder gives **$I_0$ the highest priority** and $I_7$ the lowest. Its output $Y_2Y_1Y_0$ is the index of the winning input. The inputs are $I_7 I_6 I_5 I_4 I_3 I_2 I_1 I_0 = 1011\\,0000$. Enter $Y_2Y_1Y_0$.",
    match: "text",
    accept: ["100"],
    placeholder: "3 bits",
    solution:
      "Active inputs: $I_7, I_5, I_4$. Here the **lowest** index has the highest priority, so $I_4$ wins and the output is $4 = 100_2$.\nAn encoder with the usual convention (highest index wins) would output $111$; always read which end has priority.",
  },
  {
    kind: "short",
    subtopic: "Multiplexers",
    difficulty: "medium",
    source: "Original",
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
    source: "Style: PYP 2016-17 S2 Q3(b)",
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
    source: "Style: Tutorial 6 Q3",
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
    source: "Style: PYP 2017-18 S1 Q3(c), PYP 2018-19 S2 Q3(b)",
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
