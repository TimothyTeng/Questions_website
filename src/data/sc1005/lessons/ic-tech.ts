import type { Lesson } from "@/lib/sc1005/types";

// ---------------------------------------------------------------------------------------------
// CMOS transistor-level schematics, generated from series/parallel networks. Used by the static
// figures here and in questions/ic-tech.ts, and (via cmosLayout) by the interactive CMOS figure.

/** A transistor network: a string is one transistor whose gate is driven by that input; s = series, p = parallel. */
export type CmosNet = string | { s: CmosNet[] } | { p: CmosNet[] };

export interface CmosPrim {
  t: "line" | "circle" | "text";
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  cx?: number;
  cy?: number;
  r?: number;
  x?: number;
  y?: number;
  s?: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  bold?: boolean;
  fill?: boolean;
  /** Which part of the circuit: pull-up network, pull-down network, output node or supply symbol. */
  part: "up" | "down" | "out" | "supply";
  /** Lies on a conducting path between the rail and the output. */
  hot?: boolean;
  /** Gate-input wiring of the transistor driven by this input. */
  input?: string;
  /** Channel of a transistor: whether it conducts. */
  on?: boolean;
}

const TW = 76;
const TH = 50;
const PORT = 50;

interface Box {
  w: number;
  h: number;
  port: number;
}

function measure(n: CmosNet): Box {
  if (typeof n === "string") return { w: TW, h: TH, port: PORT };
  if ("s" in n) {
    const bs = n.s.map(measure);
    const port = Math.max(...bs.map((b) => b.port));
    return { w: Math.max(...bs.map((b) => port - b.port + b.w)), h: bs.reduce((a, b) => a + b.h, 0), port };
  }
  const bs = n.p.map(measure);
  return { w: bs.reduce((a, b) => a + b.w, 0), h: Math.max(...bs.map((b) => b.h)), port: bs[0].port };
}

/** Does the network conduct? PMOS transistors conduct on input 0, NMOS on input 1. */
export function conducts(n: CmosNet, env: Record<string, number>, pmos: boolean): boolean {
  if (typeof n === "string") return pmos ? env[n] === 0 : env[n] === 1;
  if ("s" in n) return n.s.every((x) => conducts(x, env, pmos));
  return n.p.some((x) => conducts(x, env, pmos));
}

/** The dual network (series ↔ parallel): the complementary pull-up for a pull-down network. */
export const dualNet = (n: CmosNet): CmosNet => (typeof n === "string" ? n : "s" in n ? { p: n.s.map(dualNet) } : { s: n.p.map(dualNet) });

/** Conduction condition of an NMOS network as an expression (series = AND, parallel = OR). */
export function netExpr(n: CmosNet): string {
  if (typeof n === "string") return n;
  if ("s" in n) return n.s.map((x) => (typeof x !== "string" && "p" in x ? `(${netExpr(x)})` : netExpr(x))).join("");
  return n.p.map(netExpr).join(" + ");
}

function drawNet(n: CmosNet, x0: number, y0: number, pmos: boolean, active: boolean, env: Record<string, number> | null, out: CmosPrim[], q: { k: number } | null) {
  const part = pmos ? "up" : "down";
  const b = measure(n);
  if (typeof n === "string") {
    const cx = x0 + PORT;
    const on = env ? conducts(n, env, pmos) : undefined;
    const hot = active;
    const L = (x1: number, y1: number, x2: number, y2: number, extra: Partial<CmosPrim> = {}) => out.push({ t: "line", x1, y1, x2, y2, part, hot, ...extra });
    L(cx, y0, cx, y0 + 13);
    L(cx, y0 + 13, cx - 8, y0 + 13);
    L(cx - 8, y0 + 9, cx - 8, y0 + 41, { bold: true, on });
    L(cx - 8, y0 + 37, cx, y0 + 37);
    L(cx, y0 + 37, cx, y0 + TH);
    out.push({ t: "line", x1: cx - 14, y1: y0 + 13, x2: cx - 14, y2: y0 + 37, part, input: n });
    if (pmos) {
      out.push({ t: "circle", cx: cx - 18, cy: y0 + 25, r: 4, part, input: n });
      out.push({ t: "line", x1: cx - 30, y1: y0 + 25, x2: cx - 22, y2: y0 + 25, part, input: n });
    } else out.push({ t: "line", x1: cx - 30, y1: y0 + 25, x2: cx - 14, y2: y0 + 25, part, input: n });
    out.push({ t: "text", x: cx - 32, y: y0 + 29, s: n, anchor: "end", size: 12, bold: true, part, input: n });
    if (q) out.push({ t: "text", x: cx + 3, y: y0 + 29, s: `Q${++q.k}`, anchor: "start", size: 9, part });
    return;
  }
  if ("s" in n) {
    let y = y0;
    for (const c of n.s) {
      const cb = measure(c);
      drawNet(c, x0 + b.port - cb.port, y, pmos, active, env, out, q);
      y += cb.h;
    }
    return;
  }
  let x = x0;
  const ports: number[] = [];
  for (const c of n.p) {
    const cb = measure(c);
    const ca = active && (env ? conducts(c, env, pmos) : true);
    drawNet(c, x, y0, pmos, ca, env, out, q);
    ports.push(x + cb.port);
    if (cb.h < b.h) out.push({ t: "line", x1: x + cb.port, y1: y0 + cb.h, x2: x + cb.port, y2: y0 + b.h, part, hot: ca });
    x += cb.w;
  }
  out.push({ t: "line", x1: ports[0], y1: y0, x2: ports[ports.length - 1], y2: y0, part, hot: active });
  out.push({ t: "line", x1: ports[0], y1: y0 + b.h, x2: ports[ports.length - 1], y2: y0 + b.h, part, hot: active });
}

export interface CmosLayout {
  w: number;
  h: number;
  prims: CmosPrim[];
  /** Values when env is given. */
  up?: boolean;
  down?: boolean;
}

/** Lays out VDD – pull-up (PMOS) – output – pull-down (NMOS) – GND. With env, marks conducting parts. */
export function cmosLayout(pun: CmosNet, pdn: CmosNet, opts: { out?: string; numbered?: boolean; env?: Record<string, number> } = {}): CmosLayout {
  const out = opts.out ?? "F";
  const env = opts.env ?? null;
  const bu = measure(pun);
  const bd = measure(pdn);
  const X = Math.max(bu.port, bd.port) + 6;
  const up = env ? conducts(pun, env, true) : false;
  const down = env ? conducts(pdn, env, false) : false;
  const prims: CmosPrim[] = [];
  const yU = 34;
  prims.push({ t: "text", x: X, y: 12, s: "VDD", anchor: "middle", size: 11, bold: true, part: "supply" });
  prims.push({ t: "line", x1: X - 16, y1: 20, x2: X + 16, y2: 20, part: "supply", hot: up });
  prims.push({ t: "line", x1: X, y1: 20, x2: X, y2: yU, part: "up", hot: up });
  const q = opts.numbered ? { k: 0 } : null;
  drawNet(pun, X - bu.port, yU, true, up, env, prims, q);
  const yO = yU + bu.h + 16;
  const yD = yO + 16;
  prims.push({ t: "line", x1: X, y1: yU + bu.h, x2: X, y2: yO, part: "up", hot: up });
  prims.push({ t: "line", x1: X, y1: yO, x2: X, y2: yD, part: "down", hot: down });
  drawNet(pdn, X - bd.port, yD, false, down, env, prims, q);
  const yG = yD + bd.h + 12;
  prims.push({ t: "line", x1: X, y1: yD + bd.h, x2: X, y2: yG, part: "down", hot: down });
  prims.push({ t: "line", x1: X - 14, y1: yG, x2: X + 14, y2: yG, part: "supply", hot: down });
  prims.push({ t: "line", x1: X - 9, y1: yG + 4, x2: X + 9, y2: yG + 4, part: "supply", hot: down });
  prims.push({ t: "line", x1: X - 4, y1: yG + 8, x2: X + 4, y2: yG + 8, part: "supply", hot: down });
  prims.push({ t: "text", x: X + 20, y: yG + 8, s: "GND", anchor: "start", size: 10, part: "supply" });
  const W = Math.max(X - bu.port + bu.w, X - bd.port + bd.w, X + 30) + 54;
  prims.push({ t: "circle", cx: X, cy: yO, r: 3, fill: true, part: "out" });
  prims.push({ t: "line", x1: X, y1: yO, x2: W - 30, y2: yO, part: "out" });
  prims.push({ t: "text", x: W - 27, y: yO + 5, s: out, anchor: "start", size: 13, bold: true, part: "out" });
  return { w: W, h: yG + 16, prims, up, down };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Static SVG (currentColor) for a figure of kind "svg". */
export function cmosSvg(pun: CmosNet, pdn: CmosNet, opts: { out?: string; numbered?: boolean } = {}): string {
  const L = cmosLayout(pun, pdn, opts);
  const body = L.prims
    .map((p) => {
      if (p.t === "line") return `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="currentColor" stroke-width="${p.bold ? 3 : 1.4}"/>`;
      if (p.t === "circle") return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" stroke="currentColor" stroke-width="1.4" fill="${p.fill ? "currentColor" : "none"}"/>`;
      return `<text x="${p.x}" y="${p.y}" text-anchor="${p.anchor}" font-size="${p.size}" ${p.bold ? 'font-weight="700"' : ""} fill="currentColor" font-family="monospace">${esc(p.s ?? "")}</text>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L.w} ${L.h}" width="${L.w}" height="${L.h}">${body}</svg>`;
}

/** Standard complementary gate: pull-up is the dual of the pull-down. */
export const cmosGateSvg = (pdn: CmosNet, out = "F", numbered = false) => cmosSvg(dualNet(pdn), pdn, { out, numbered });

// ---------------------------------------------------------------------------------------------

/** Hysteresis loop of a Schmitt-trigger inverter (V_OUT against V_IN). */
const HYSTERESIS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200" font-family="monospace" font-size="11">
<line x1="40" y1="170" x2="290" y2="170" stroke="currentColor"/><line x1="40" y1="170" x2="40" y2="12" stroke="currentColor"/>
<text x="286" y="186" text-anchor="end" fill="currentColor">V_IN</text><text x="44" y="14" fill="currentColor">V_OUT</text>
<line x1="40" y1="40" x2="190" y2="40" stroke="currentColor" stroke-width="2.4"/><line x1="190" y1="40" x2="190" y2="150" stroke="currentColor" stroke-width="2.4"/>
<polygon points="185,92 195,92 190,102" fill="currentColor"/>
<line x1="190" y1="150" x2="280" y2="150" stroke="currentColor" stroke-width="2.4"/>
<line x1="130" y1="150" x2="190" y2="150" stroke="currentColor" stroke-width="2.4" stroke-dasharray="6 3"/>
<line x1="130" y1="40" x2="130" y2="150" stroke="currentColor" stroke-width="2.4" stroke-dasharray="6 3"/>
<polygon points="125,100 135,100 130,90" fill="currentColor"/>
<line x1="130" y1="170" x2="130" y2="175" stroke="currentColor"/><line x1="190" y1="170" x2="190" y2="175" stroke="currentColor"/>
<text x="130" y="188" text-anchor="middle" fill="currentColor">V_T-</text><text x="190" y="188" text-anchor="middle" fill="currentColor">V_T+</text>
<text x="34" y="44" text-anchor="end" fill="currentColor">1</text><text x="34" y="154" text-anchor="end" fill="currentColor">0</text>
<text x="198" y="80" fill="currentColor" font-size="10">rising: at V_T+</text><text x="46" y="120" fill="currentColor" font-size="10">falling: V_T-</text>
</svg>`;

export const icTechLesson: Lesson = {
  topic: "ic-tech",
  bigPicture:
    "Chapters 1–5 treated gates as perfect Boolean boxes. This chapter opens the box. Integrated circuits are made of resistors, diodes and **transistors used as switches** (TTL uses bipolar junction transistors, CMOS uses MOSFETs), so a gate's output is really a voltage connected to the supply or to ground through a network of switches; reading those networks lets you derive the Boolean function of a CMOS circuit. Real voltages are never exactly 0 V or 5 V, so devices are described by **voltage parameters** ($V_{OH}, V_{OL}, V_{IH}, V_{IL}$) whose differences are the **noise margins**, **current parameters** that decide the **fan-out**, and **power dissipation**, **propagation delay**, rise time and fall time. Special outputs and inputs solve practical problems: **tri-state** outputs share a bus, **open-drain** outputs can be tied together (wired-AND), **Schmitt-trigger** inputs give clean transitions from slow or noisy signals, and **active-low** signals with matched bubbles keep diagrams readable. Finally, a **PLA** implements SOP expressions in a programmable AND–OR array, and **fixed-point** and **floating-point** formats represent non-integers. Past papers test: CMOS circuit → description and canonical form, noise-margin and fan-out calculations, timing parameters, tri-state and open-drain circuits, Schmitt-trigger sketches, and active-low waveforms.",
  sections: [
    {
      title: "IC families: TTL vs CMOS, transistors as switches",
      intuition:
        "Every logic output is a switch arrangement that connects the output either towards the supply (logic 1) or to ground (logic 0). TTL and CMOS are two families of such circuits, and their differences (supply voltage, voltage levels, what a floating input does) decide what can be connected to what.",
      keyIdeas: [
        "An integrated circuit is a collection of resistors, diodes and transistors fabricated on a single piece of semiconductor (the substrate, also called the die or chip). **Scale of integration** by gate count: SSI < 12, MSI 12–99, LSI 100–9 999, VLSI 10 000–99 999, ULSI 100 000–999 999, GSI ≥ 1 000 000 (e.g. a microprocessor).",
        "**TTL** (transistor–transistor logic) uses bipolar junction transistors (base, emitter, collector); $V_{CC}$ is nominally +5 V. Series prefixes (74, 74H, 74L, 74ALS) differ in electrical characteristics such as power dissipation, delay time and switching speed, not in pin layout or logic function.",
        "**CMOS** (complementary metal-oxide semiconductor) uses MOSFETs (gate, drain, source). In the CMOS inverter, input 0 turns the PMOS on (output 1) and input 1 turns the NMOS on (output 0). $V_{DD}$ ranges from +3 to +18 V; +5 V is most often used when CMOS and TTL ICs are in the same circuit.",
        "CMOS series: 40/140 (old, seldom used, not compatible with TTL, e.g. 4001/14001), 74C (metal gate), **74HC** (high speed; pin-compatible with TTL: same pin layout), **74HCT** (electrically compatible with TTL: similar voltage and current requirements, so they can be connected together).",
        "Transistor as a switch: in the simple BJT inverter, input 0 → Q1 off → output 1; input 1 → Q1 on → output 0.",
        "**Floating (unconnected) inputs:** a floating TTL input acts like logic 1 (it measures 1.4 to 1.8 V) but is not recommended because of noise pick-up. For CMOS the result is disastrous: the IC may become overheated, so all unused CMOS inputs must be connected to $V_{DD}$, GND or another input.",
        "Never tie a circuit output to another output (unless you are very sure), or to $V_{CC}$, GND or any other fixed voltage level.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Series", "Prefix", "Example"],
          rows: [
            ["TTL standard", "74", "7404"],
            ["TTL high-speed", "74H", "74H04"],
            ["TTL low-power", "74L", "74L04"],
            ["TTL advanced low-power Schottky", "74ALS", "74ALS04"],
            ["CMOS old (seldom used)", "40/140", "4001/14001"],
            ["CMOS metal gate", "74C", "74C02"],
            ["CMOS high speed", "74HC", "74HC02"],
            ["CMOS electrically compatible with TTL", "74HCT", "74HCT02"],
          ],
          caption: "Lecture examples (hex inverters for TTL, quad 2-input NOR for CMOS).",
        },
      ],
      example: {
        problem: "A board mixes 5-V LSTTL outputs with CMOS chips. One spare input of a CMOS NAND gate is unused. What should be done with it, and which CMOS series from the lecture should be chosen so the TTL outputs can drive the CMOS inputs directly?",
        steps: [
          "A floating CMOS input can give a disastrous result (the IC may overheat), so the spare input must be connected to $V_{DD}$, GND or another input.",
          "For a NAND, tie it to $V_{DD}$ (logic 1 does not change $(A\\cdot 1)' = A'$) or to the used input ($(A\\cdot A)' = A'$). Tying it to GND would force the output to 1.",
          "Lecture typical values: 5-V LSTTL guarantees only $V_{OH} = 2.7$ V, while a 5-V CMOS input needs $V_{IH} = 3.5$ V, so a TTL high is not guaranteed to be read as 1.",
          "The 74HCT series is electrically compatible with TTL (similar voltage and current requirements), so TTL and 74HCT chips can be connected together.",
        ],
        answer: "Tie the input to $V_{DD}$ (or to the other input) and use 74HCT parts.",
      },
      pitfalls: [
        "Pin-compatible (74HC: same pin layout) is not the same as electrically compatible (74HCT).",
        "'A floating TTL input acts like 1' does not make it good practice: it picks up noise.",
        "A PMOS turns on with a **0** on its gate; the bubble on the symbol is the reminder.",
      ],
      recall: [
        { q: "Which CMOS series is electrically compatible with TTL?", a: "74HCT." },
        { q: "What does an unconnected TTL input behave like?", a: "Logic 1 (it measures 1.4 to 1.8 V), but it is not recommended because of noise pick-up." },
        { q: "A chip has 5 000 gates. Scale of integration?", a: "LSI (100–9 999 gates)." },
        { q: "When does a PMOS transistor conduct?", a: "When its gate is at logic 0." },
      ],
    },
    {
      title: "CMOS logic: inverter, NAND, NOR and functional analysis",
      intuition:
        "A CMOS gate has PMOS transistors between $V_{DD}$ and the output and NMOS transistors between the output and GND. Find which transistors are on for a given input: a conducting path from $V_{DD}$ makes the output 1, a conducting path to GND makes it 0.",
      visuals: ["cmos-switch"],
      keyIdeas: [
        "**Inverter:** one PMOS (to $V_{DD}$) and one NMOS (to GND), both driven by X. X = 0 → PMOS on, NMOS off → Y = 1; X = 1 → PMOS off, NMOS on → Y = 0.",
        "**Series** transistors conduct only if **all** are on (AND); **parallel** transistors conduct if **any** is on (OR).",
        "**NAND:** NMOS in series (both A and B = 1 cause X = 0), PMOS in parallel (either A or B = 0 causes X = 1). **NOR:** NMOS in parallel (either A or B = 1 causes X = 0), PMOS in series (both A and B = 0 cause X = 1). A 3-input NAND works the same way with three transistors in each network.",
        "Each input drives one PMOS and one NMOS, and the PMOS network has the series/parallel connections swapped compared with the NMOS network (compare NAND and NOR).",
        "These single circuits give inverted functions (NOT, NAND, NOR). The lecture builds AND as a NAND followed by a NOT.",
        "**Analysis method (L10 practice):** (1) identify the inputs; (2) identify the pair of transistors each input controls; (3) find every series/parallel path from $V_{DD}$ to the output: for each, the input values make output = 1; (4) find every path from the output to GND: those input values make output = 0.",
        "Because NMOS conduct on 1, the output-to-GND condition reads straight off the NMOS network (series = AND, parallel = OR), and $F = (\\text{that condition})'$.",
      ],
      formulas: ["F = \\big(\\text{NMOS network condition}\\big)', \\qquad \\text{series} \\to \\text{AND},\\quad \\text{parallel} \\to \\text{OR}"],
      figures: [
        { kind: "svg", svg: cmosGateSvg("X", "Y"), caption: "CMOS inverter" },
        { kind: "svg", svg: cmosGateSvg({ s: ["A", "B"] }, "X"), caption: "2-input NAND: PMOS parallel, NMOS series" },
        { kind: "svg", svg: cmosGateSvg({ p: ["A", "B"] }, "X"), caption: "2-input NOR: PMOS series, NMOS parallel" },
      ],
      example: {
        problem: "(PYP 2018-19 S2 Q2(d)) Describe how the inputs produce logic 1 and logic 0 at Z, and write the canonical product of maxterms for Z(A, B, C, D).",
        figures: [{ kind: "svg", svg: cmosGateSvg({ s: ["D", { p: ["A", { s: ["B", "C"] }] }] }, "Z", true), caption: "4-input CMOS circuit" }],
        steps: [
          "Pull-down: Q5 (D) in series with [Q6 (A) in parallel with the series pair Q7–Q8 (B, C)]. Z = 0 when there is a path to GND: $D(A + BC) = 1$.",
          "So Z = 0 when D = 1 together with A = 1 (m9, m11, m13, m15) or with B = C = 1 (m7, m15): Z = 0 on m7, m9, m11, m13, m15.",
          "Pull-up: Q1 (D) in parallel with [Q2 (A) in series with (Q3 ∥ Q4) (B, C)]. PMOS conduct on 0: Z = 1 when D = 0, or when A = 0 and B or C = 0, i.e. $D' + A'(B' + C')$.",
          "Check: $D' + A'(B'+C') = (D(A + BC))'$ by De Morgan, which agrees with the pull-down analysis.",
          "$Z = \\Pi M(7, 9, 11, 13, 15)$; the other rows give $Z = \\Sigma m(0,1,2,3,4,5,6,8,10,12,14)$.",
        ],
        answer: "$Z = (D(A + BC))' = \\Pi M(7,9,11,13,15)$.",
      },
      pitfalls: [
        "Forgetting the inversion: the NMOS (pull-down) condition is when F = **0**.",
        "Reading a PMOS as on-for-1. A PMOS conducts for a **0** on its gate.",
        "Writing the PMOS path condition without complementing the literals: series PMOS on A, B conducts for $A'B'$, not $AB$.",
      ],
      recall: [
        { q: "In a CMOS NAND, how are the NMOS transistors connected?", a: "In series between the output and GND." },
        { q: "How many transistors does the lecture's 3-input NAND use?", a: "6 (three PMOS in parallel, three NMOS in series)." },
        { q: "Pull-down network: A in series with (B ∥ C). Function?", a: "$F = (A(B + C))'$." },
        { q: "How does the lecture build a CMOS AND gate?", a: "A NAND followed by a NOT (inverter)." },
      ],
    },
    {
      title: "Active levels, asserted/negated and bubble-to-bubble diagrams",
      intuition:
        "A signal's name says what it does; the * says whether it does it at 1 or at 0. Drawing bubbles where active-low signals enter and leave gates lets you read a diagram's function directly, without algebra.",
      visuals: ["bubble-match"],
      keyIdeas: [
        "**Active high:** the signal produces its named effect when it is 1. **Active low:** the effect happens when it is 0. The lecture shows several naming conventions for active-low signals (RESET*, /RECEIVE, TRANSMIT_L, READY−, ENABLE~ …); this course uses *. Active-low signals, being less common, are usually highlighted.",
        "**Asserted** = 1 for an active-high signal, 0 for an active-low signal. **Negated** (de-asserted) = otherwise.",
        "Whether a signal is active high or low depends on its name **and** its effect: Subtract (1 = subtract) and Add* (0 = add) describe the same wire.",
        "A sum-of-minterms expression is usually written for an active-high output, a product-of-maxterms for an active-low output, e.g. ODD vs EVEN* for the same parity output.",
        "**Bubble-to-bubble design:** a bubble on an output meeting a bubble on an input cancels, so the diagram reads as plain AND/OR logic of asserted conditions. Connection diagrams also show pin numbers, IC numbers, signal names, active levels and supply voltages.",
        "A NAND gate may be drawn as an AND with an output bubble or as an OR with input bubbles (De Morgan); likewise NOR = OR with output bubble = AND with input bubbles.",
      ],
      figures: [
        {
          kind: "wave",
          signals: [
            { name: "Open", wave: "0011100000" },
            { name: "Reset*", wave: "1110000111" },
          ],
          caption: "Open (active high) is asserted while 1; Reset* (active low) is asserted while 0.",
        },
        {
          kind: "table",
          head: ["Signal", "Effect when 0", "Effect when 1", "Active"],
          rows: [
            ["Subtract", "Add Y to X", "Subtract Y from X", "high"],
            ["Add*", "Add Y to X", "Subtract Y from X", "low"],
            ["Read", "Write data", "Read data", "high"],
            ["Write*", "Write data", "Read data", "low"],
          ],
        },
      ],
      example: {
        problem: "A circuit has inputs EN*, A, B, C* and an active-high output F (* = active low). F is asserted only when EN* is asserted, exactly one of A and B is asserted, and C* is asserted. Write F in terms of the wire values.",
        steps: [
          "EN* asserted means the wire EN* = 0: the factor is $(EN^*)'$.",
          "Exactly one of A, B asserted (both active high): $A \\oplus B$.",
          "C* asserted means C* = 0: $(C^*)'$.",
          "F is active high, so F = 1 when all three hold.",
        ],
        answer: "$F = (EN^*)' \\cdot (A \\oplus B) \\cdot (C^*)'$; drawn bubble-to-bubble as an AND gate with bubbles on its EN* and C* inputs.",
      },
      pitfalls: [
        "Asserted does **not** mean 'high'. For RESET*, asserted means 0.",
        "An unmatched bubble (a bubble meeting no bubble) is a real inversion and must appear in the expression.",
        "For an active-low output F*, asserted (0) when the condition is true means $F^* = (\\text{condition})'$.",
      ],
      recall: [
        { q: "Write* = 0. What happens?", a: "Write* is active low, so it is asserted: data is written." },
        { q: "An OR gate with bubbles on both inputs is equivalent to…?", a: "A NAND gate: $A' + B' = (AB)'$." },
        { q: "Which canonical form is usually written for an active-low output?", a: "The product of maxterms (it lists where the output is 0)." },
      ],
    },
    {
      title: "Electrical characteristics: voltage levels, noise margins, fan-out, power and delay",
      intuition:
        "A device promises a range for every output level and needs a range at every input. The gap between what an output gives and what an input needs is the noise it can survive; the input and output currents limit how many inputs one output can drive; switching costs power and takes time.",
      visuals: ["noise-margin"],
      keyIdeas: [
        "$V_{OH(min)}$: minimum output voltage produced for logic 1. $V_{OL(max)}$: maximum output voltage produced for logic 0.",
        "$V_{IH(min)}$: minimum input voltage recognised as logic 1. $V_{IL(max)}$: maximum input voltage recognised as logic 0. Between them the input is **indeterminate**.",
        "**High-state DC noise margin** $= V_{OH(min)} - V_{IH(min)}$; **low-state DC noise margin** $= V_{IL(max)} - V_{OL(max)}$. To check whether a device can drive another, ask: is $V_{OH}$ higher than $V_{IH}$, and is $V_{OL}$ less than $V_{IL}$?",
        "Current parameters: $I_{IH}$, $I_{IL}$ (maximum current that flows into an input at logic 1 / logic 0; very small leakage, about 1 µA, in CMOS), $I_{OH}$, $I_{OL}$ (maximum current that flows from an output at logic 1 / logic 0; 0.02–24 mA depending on family).",
        "**Fan-out** = number of standard loads the output gate can drive; compare $I_{OH}/I_{IH}$ (high state) with $I_{OL}/I_{IL}$ (low state) and take the smaller. More loads may reduce the DC noise margins and the switching speed.",
        "**Power dissipation:** for CMOS most power is consumed when the output switches (dynamic): $P = CV^2f$, proportional to the switching frequency and the square of the supply voltage. Static power dissipation (no switching) is usually very small.",
        "**Propagation delay** = average transition delay for a signal to propagate from input to output (e.g. 9–19 ns for the 74HC00). $t_{PHL}$: output changes High → Low; $t_{PLH}$: output changes Low → High; both measured between the 50 % points.",
        "**Rise time** $t_r$: output from 10 % to 90 %; **fall time** $t_f$: output from 90 % to 10 %.",
      ],
      formulas: [
        "\\text{high-state NM} = V_{OH(min)} - V_{IH(min)}, \\qquad \\text{low-state NM} = V_{IL(max)} - V_{OL(max)}",
        "\\text{fan-out} = \\min\\!\\left(\\frac{I_{OH(max)}}{I_{IH(max)}},\\ \\frac{I_{OL(max)}}{I_{IL(max)}}\\right), \\qquad P = CV^2f",
      ],
      figures: [
        {
          kind: "table",
          head: ["Family", "$V_{OH}$", "$V_{OL}$", "$V_{IH}$", "$V_{IL}$"],
          rows: [
            ["5-V LSTTL", "2.7", "0.5", "2.0", "0.8"],
            ["5-V CMOS", "4.44", "0.5", "3.5", "1.5"],
            ["3.3-V LVTTL", "2.4", "0.4", "2.0", "0.8"],
            ["2.5-V CMOS", "2.3", "0.2", "1.7", "0.7"],
            ["1.8-V CMOS", "1.2", "0.45", "1.17", "0.7"],
          ],
          caption: "Typical values from the lecture (volts).",
        },
        {
          kind: "wave",
          signals: [
            { name: "A", wave: "001111110000" },
            { name: "Y = A'", wave: "111000000011" },
          ],
          marks: [2, 3, 8, 10],
          caption: "Inverter: t_PHL from A rising to Y falling (1 unit), t_PLH from A falling to Y rising (2 units).",
        },
      ],
      example: {
        problem: "Device X: $V_{OH(min)} = 2.7$ V, $V_{OL(max)} = 0.4$ V, $V_{IH(min)} = 2.0$ V, $V_{IL(max)} = 0.8$ V, $I_{OH} = 0.4$ mA, $I_{OL} = 8$ mA, $I_{IH} = 20\\ \\mu$A, $I_{IL} = 0.4$ mA. Find the noise margins and the DC fan-out.",
        steps: [
          "High-state noise margin $= 2.7 - 2.0 = 0.7$ V.",
          "Low-state noise margin $= 0.8 - 0.4 = 0.4$ V.",
          "High-state ratio $= 0.4\\text{ mA}/20\\ \\mu\\text{A} = 20$.",
          "Low-state ratio $= 8/0.4 = 20$, so the fan-out is 20.",
        ],
        answer: "Noise margins 0.7 V (high) and 0.4 V (low); fan-out 20.",
      },
      pitfalls: [
        "Noise margins compare an **output** level with an **input** level: $V_{OH} - V_{IH}$ and $V_{IL} - V_{OL}$, never $V_{OH} - V_{OL}$.",
        "Fan-out uses the smaller of the two current ratios; watch µA vs mA.",
        "$t_{PHL}$ is named after the **output** transition, not the input edge.",
        "Rise time uses 10 %–90 %, not 0 %–100 %.",
        "Doubling the supply voltage quadruples dynamic power ($P \\propto V^2$).",
      ],
      recall: [
        { q: "Formula for the low-state DC noise margin?", a: "$V_{IL(max)} - V_{OL(max)}$." },
        { q: "$I_{OL} = 16$ mA, $I_{IL} = 1.6$ mA, $I_{OH} = 0.4$ mA, $I_{IH} = 40\\ \\mu$A. Fan-out?", a: "$\\min(10, 10) = 10$." },
        { q: "Halve $V$ and double $f$: what happens to $CV^2f$?", a: "It halves ($\\tfrac14 \\times 2$)." },
        { q: "Where is most of the power of a CMOS gate consumed?", a: "When the output switches between 0 and 1 (dynamic power dissipation)." },
      ],
    },
    {
      title: "Tri-state outputs and open-drain outputs",
      intuition:
        "Ordinary outputs must not be tied together. A tri-state output can go into high impedance, so several devices can take turns on one bus. An open-drain output can only pull low, so several can share a line while an external pull-up resistor supplies the 1, which gives wired-AND.",
      visuals: ["tristate-bus"],
      keyIdeas: [
        "**Tri-state** outputs have three states: logic 0, logic 1 and **high impedance (Hi-Z)**, which is neither 0 nor 1 and behaves like an open circuit.",
        "When the device is enabled, the output is logic 0 or 1 (e.g. a tri-state inverter behaves as a normal inverter); when disabled, the output is in Hi-Z. Examples: tri-state buffer, tri-state inverter.",
        "Inside a tri-state inverter (lecture slide 6-52), enabled: one of the two output switches (to +V or to ground) is on; disabled: **both** are off, so the output is disconnected. In the lecture's CMOS tri-state buffer, EN and the input drive a NAND gate (to the PMOS) and a NOR gate (to the NMOS), so that EN = 0 turns both output transistors off.",
        "Advantage: two or more tri-state outputs can be connected together, but at any one time only one (or no) output should be enabled; otherwise there is **bus contention**, which can damage the devices. Example: memory devices (ROM, RAM) have tri-state outputs to share the same data bus with the CPU.",
        "**Open-collector/open-drain** outputs need an external **pull-up resistor** to make the output 1: in the lecture's open-drain NAND, A = B = 1 turns Q1 and Q2 on and Z = 0; otherwise the output is open and the resistor gives 1. An open-drain output can drive an LED (LED on when Z = 0).",
        "Open-drain outputs U, V, W can be tied together to one pulled-up node: **wired-AND**, $Z = U \\cdot V \\cdot W$ (any output at 0 forces Z = 0).",
      ],
      formulas: ["Z_{\\text{wired-AND}} = U V W, \\qquad \\text{open-drain NANDs: } Z = (AB)'(CD)'(EF)'"],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "E1", "B", "E2"],
            gates: [
              { id: "U", type: "TBUF", in: ["!A", "E1"] },
              { id: "V", type: "TBUF", in: ["B", "E2"] },
            ],
            outputs: ["U", "V"],
          },
          caption: "PYP 2016-17 S1 Q2(b): tri-state inverter U and tri-state buffer V whose outputs share one line F.",
        },
        {
          kind: "table",
          head: ["E1", "E2", "F"],
          rows: [
            ["0", "0", "Hi-Z"],
            ["0", "1", "B"],
            ["1", "0", "A'"],
            ["1", "1", "not allowed (bus contention if A' ≠ B)"],
          ],
        },
      ],
      example: {
        problem: "Three open-drain NAND gates have outputs U = (AB)', V = (CD)', W = (EF)' tied to a node Z with a pull-up resistor. Find Z when A = B = 1 and all other inputs are 0, and give the general expression.",
        steps: [
          "U = (1·1)' = 0: its output transistors are on and pull the node low.",
          "V = (0·0)' = 1 and W = 1: their outputs are open, so they do not affect the node.",
          "Any output at 0 forces the node to 0, so Z = 0.",
          "In general Z = 1 only if all three outputs are 1: $Z = UVW = (AB)'(CD)'(EF)'$.",
        ],
        answer: "Z = 0; in general $Z = (AB)'(CD)'(EF)'$ (lecture table: Z = 1 only when none of the NANDs has both inputs 1).",
      },
      pitfalls: [
        "Hi-Z is not logic 0: it is neither 0 nor 1.",
        "Even if two enabled tri-state outputs happen to agree, the rule is still only one (or no) output enabled at a time.",
        "Without the pull-up resistor an open-drain output cannot produce a 1.",
        "Only tie outputs together when they are designed for it (tri-state or open-drain); ordinary outputs must never be tied to another output.",
      ],
      recall: [
        { q: "What does a disabled tri-state output behave like?", a: "An open circuit (high impedance, neither 0 nor 1)." },
        { q: "What can happen if two tri-state outputs on a bus are enabled at once?", a: "Bus contention, which can damage the devices." },
        { q: "Why does an open-drain output need a pull-up resistor?", a: "To make the output 1 when its transistors are off." },
        { q: "Open-drain outputs U and V tied to a pulled-up node give…?", a: "Wired-AND: $Z = UV$." },
      ],
    },
    {
      title: "Schmitt-trigger inputs and hysteresis",
      intuition:
        "An ordinary gate has one switching threshold, so a slow or noisy input that fluctuates around it makes the output fluctuate. A Schmitt-trigger input has two thresholds: it switches only when the input rises above $V_{T+}$ or drops below $V_{T-}$, so the output has clean transitions.",
      visuals: ["schmitt"],
      keyIdeas: [
        "A Schmitt-trigger inverter is characterised by two threshold voltages, $V_{T-}$ and $V_{T+}$ (e.g. 2.1 V and 2.9 V in the lecture figure).",
        "Schmitt **inverter:** when $V_{IN}$ rises above $V_{T+}$, the output switches to low; when $V_{IN}$ drops below $V_{T-}$, the output switches to high. In between, the output does not change.",
        "This non-symmetric behaviour is called **hysteresis** (the lecture figure shows an inverter with 0.8 V of hysteresis: 2.9 − 2.1).",
        "Schmitt **buffer:** the same thresholds, but the output is not inverted (output goes high above $V_{T+}$, low below $V_{T-}$).",
        "Use: when the input rises slowly or has minor fluctuations around the threshold, a standard inverter gives an unstable, fluctuating output, while the Schmitt-trigger output has clean transitions and does not fluctuate (e.g. cleaning up a push-button waveform, PYP 2018-19 S1 Q2(b)).",
        "A special symbol inside the gate indicates a Schmitt-trigger input.",
      ],
      figures: [{ kind: "svg", svg: HYSTERESIS_SVG, caption: "Transfer characteristic of a Schmitt-trigger inverter: the switching point depends on the direction (hysteresis)." }],
      example: {
        problem: "A Schmitt inverter has $V_{T+} = 1.7$ V, $V_{T-} = 0.9$ V and output 1. Its input takes the values 0.2, 1.2, 1.8, 1.4, 0.8, 1.5, 2.0 V. List the outputs.",
        steps: [
          "0.2: below both thresholds, output stays 1.",
          "1.2: between the thresholds, output keeps 1.",
          "1.8 > $V_{T+}$: output switches to **0**.",
          "1.4: between the thresholds, stays 0. Then 0.8 < $V_{T-}$: switches to **1**.",
          "1.5: between, stays 1. Then 2.0 > $V_{T+}$: switches to **0**.",
        ],
        answer: "1, 1, 0, 0, 1, 1, 0.",
      },
      pitfalls: [
        "Between the thresholds the output **holds** its previous value; it does not go to 0 or to 'unknown'.",
        "For a Schmitt **inverter** the output goes low when the input passes $V_{T+}$ going up.",
        "When sketching, switch only at crossings of $V_{T+}$ while rising and of $V_{T-}$ while falling.",
      ],
      recall: [
        { q: "What is hysteresis for a Schmitt trigger?", a: "The non-symmetric behaviour: the output switches at $V_{T+}$ for a rising input and at $V_{T-}$ for a falling input." },
        { q: "Input wobbles between 1.3 V and 1.7 V; $V_{T+} = 2$ V, $V_{T-} = 1$ V. Output changes?", a: "None: it never crosses either threshold." },
        { q: "Why use a Schmitt-trigger input for a slowly changing, noisy signal?", a: "Its output has clean transitions and does not fluctuate, unlike a standard gate's." },
      ],
    },
    {
      title: "Programmable logic arrays (PLAs)",
      intuition:
        "Every SOP expression is a layer of ANDs feeding a layer of ORs. A PLA is exactly that, with programmable connections, so you implement a design by choosing which literals go into each product term and which product terms go into each output.",
      visuals: ["pla-grid"],
      keyIdeas: [
        "PLD = programmable logic device. Examples: PLA (programmable logic array), PAL (programmable array logic), CPLD (complex PLD), FPGA (field programmable gate array).",
        "SOm/SOP Boolean expressions can be easily implemented on a PLA.",
        "In the lecture's PLA (4 inputs, 6 product terms, 3 outputs), each input and its complement run into the AND gates (one per product term P1–P6), and each product term can be connected to each output OR gate. An ✕ marks a programmable connection.",
        "Design flow (L12 practice Q2 hint): use a K-map to obtain a minimum-cost SOP expression for each output, then program one AND gate per product term and connect the product terms to the outputs. A product term used by several outputs needs only one AND gate (lecture: P1 = AB feeds both O1 and O3).",
      ],
      figures: [
        {
          kind: "table",
          head: ["Term", "A", "B", "C", "D", "O1", "O2", "O3"],
          rows: [
            ["P1 = AB", "1", "1", "–", "–", "✕", "", "✕"],
            ["P2 = A'B'C'D'", "0", "0", "0", "0", "✕", "", ""],
            ["P3 = AC'", "1", "–", "0", "–", "", "✕", "✕"],
            ["P4 = A'CD", "0", "–", "1", "1", "", "✕", ""],
            ["P5 = B", "–", "1", "–", "–", "", "✕", ""],
            ["P6 = A'B'D'", "0", "0", "–", "0", "", "", "✕"],
          ],
          caption: "Lecture example: O1 = AB + A'B'C'D', O2 = AC' + A'CD + B, O3 = AB + AC' + A'B'D' (1 = true literal, 0 = complemented literal, – = not connected).",
        },
      ],
      example: {
        problem: "Program a PLA for $F_1 = \\Sigma m(0, 4, 5)$ and $F_2 = \\Sigma m(0, 3, 4, 7)$ over A, B, C using as few product terms as possible.",
        steps: [
          "K-map $F_1$: m0, m4 → $B'C'$; m4, m5 → $AB'$. So $F_1 = B'C' + AB'$.",
          "K-map $F_2$: m0, m4 → $B'C'$; m3, m7 → $BC$. So $F_2 = B'C' + BC$.",
          "Distinct product terms: $B'C'$, $AB'$, $BC$: three AND gates ($B'C'$ is shared).",
          "OR connections: $F_1$ ← $B'C'$, $AB'$; $F_2$ ← $B'C'$, $BC$.",
        ],
        answer: "3 product terms: P1 = B'C' (both outputs), P2 = AB' (F1), P3 = BC (F2).",
      },
      pitfalls: [
        "Each AND gate can only produce a **product** term; an expression must be in SOP form before it goes on a PLA.",
        "Don't program a shared term twice: one product term can feed several outputs.",
      ],
      recall: [
        { q: "What does an ✕ mean on the lecture's PLA diagram?", a: "A programmable connection (that is connected)." },
        { q: "What form must a function be in to go on a PLA?", a: "Sum of products (SOm/SOP), ideally minimised with a K-map." },
        { q: "Two outputs share the term AB. How many AND gates does it use?", a: "One; both outputs connect to it." },
      ],
    },
    {
      title: "Fixed-point and floating-point numbers",
      intuition:
        "Fixed point puts the radix point in one place, so the word length fixes both the range and the precision. Floating point is the machine equivalent of scientific notation: a significand and an exponent, so the point 'floats'.",
      keyIdeas: [
        "**Fixed-point numbers:** m integer digits and n fraction digits, with the radix point at a fixed position. Examples: $102_{10}$, $123.456_{10}$, $2000.AD_{16}$, $1001.0101_2$.",
        "Fixed-point numbers are usually used for integers only. Disadvantages for non-integers: a relatively **small range** of numbers can be represented, and **significant digits may be lost** during computation.",
        "In an unsigned binary fixed-point format with n fraction bits, the smallest non-zero value is $2^{-n}$; a decimal fraction may not have an exact representation (L12 practice Q3).",
        "**Floating-point numbers:** $Z = S \\times R^E$, e.g. $2.99792458 \\times 10^5$. S is the **significand**, usually a signed fractional fixed-point number; R is the **radix** (2 binary, 8 octal, 10 decimal, …); E is the **exponent**, usually a signed fixed-point integer.",
        "Lecture example, IEEE Standard 754: **single precision (32 bits)**: bit 31 = sign of the significand, bits 30–23 = exponent, bits 22–0 = significand (magnitude). **Double precision (64 bits)**: bit 63 = sign, bits 62–52 = exponent, bits 51–0 = significand (magnitude).",
        "As described on the lecture slide: the radix is 2, the significand is in sign-magnitude notation and the exponent is in 2's complement notation.",
      ],
      formulas: ["Z = S \\times R^{E}"],
      figures: [
        {
          kind: "table",
          head: ["Format", "Sign", "Exponent", "Significand (magnitude)"],
          rows: [
            ["Single (32 bits)", "bit 31", "bits 30–23", "bits 22–0"],
            ["Double (64 bits)", "bit 63", "bits 62–52", "bits 51–0"],
          ],
          caption: "IEEE 754 layouts as given in Lecture 7.",
        },
      ],
      example: {
        problem: "(L12 practice Q3) A 16-bit unsigned fixed-point format has 8 integer bits and 8 fraction bits (xxxx xxxx.yyyy yyyy). Find the smallest non-zero value, the largest value, and the representation of 8.7. Is 8.7 exact?",
        steps: [
          "Smallest non-zero: 0000 0000.0000 0001 = $2^{-8} = 0.00390625$.",
          "Largest: 1111 1111.1111 1111 = $256 - 2^{-8} = 255.99609375$.",
          "Integer part: $8 = 0000\\,1000$.",
          "Fraction: $0.7 \\times 2 = 1.4 \\to 1$, $0.4 \\to 0$, $0.8 \\to 1$, $0.6 \\to 1$, $0.2 \\to 0$, $0.4 \\to 0$, $0.8 \\to 1$, $0.6 \\to 1$: $0.1011\\,0011_2$.",
          "So 8.7 is stored as 0000 1000 1011 0011, which equals $8 + 179/256 = 8.69921875$: not exact.",
        ],
        answer: "Smallest $2^{-8}$, largest 255.99609375; 8.7 → 0000 1000 1011 0011 (not exact: 8.69921875).",
      },
      pitfalls: [
        "The radix point position is fixed by the format: the bits themselves don't store it.",
        "Multiplying the fraction by 2 repeatedly gives fraction bits from the MSB down; stop when the format's fraction bits are used up.",
        "In the lecture's IEEE 754 layout the sign bit belongs to the significand (sign-magnitude), so a negative number differs from its positive only in that bit.",
      ],
      recall: [
        { q: "Two disadvantages of fixed point for non-integers?", a: "A relatively small range of representable numbers and possible loss of significant digits during computation." },
        { q: "In $Z = S \\times R^E$, what are S, R and E?", a: "Significand (usually a signed fractional fixed-point number), radix, exponent (usually a signed fixed-point integer)." },
        { q: "Which bits hold the exponent in IEEE 754 single precision (lecture slide)?", a: "Bits 30–23." },
        { q: "Smallest non-zero value of an unsigned fixed-point format with 4 fraction bits?", a: "$2^{-4} = 0.0625$." },
      ],
    },
  ],
  playbook: [
    "**CMOS circuit given → function:** identify the transistor pair each input controls; NMOS paths to GND (series = AND, parallel = OR) give the rows with output 0, PMOS paths from $V_{DD}$ (on for 0) give the rows with output 1; then write $\\Pi M$ of the 0-rows or $\\Sigma m$ of the 1-rows.",
    "**Can device A drive device B?** Check $V_{OH(min),A} > V_{IH(min),B}$ and $V_{OL(max),A} < V_{IL(max),B}$; the differences are the noise margins.",
    "**DC fan-out:** compute $I_{OH}/I_{IH}$ and $I_{OL}/I_{IL}$ in the same units and take the smaller.",
    "**Timing parameters:** $t_r$ and $t_f$ between the 10 % and 90 % points of the output; $t_{PHL}$, $t_{PLH}$ between the 50 % points, named after the **output** transition.",
    "**Gate delays in a waveform:** follow each edge gate by gate, adding one gate delay per gate it passes through.",
    "**Power scaling:** $P = CV^2f$; square the voltage ratio.",
    "**Tri-state / open-drain circuit:** go through each enable state: disabled → Hi-Z; one enabled → its function; two enabled → bus contention (not allowed). Open-drain outputs on a pulled-up node → the AND of the outputs.",
    "**Schmitt sketch:** switch only where the input crosses $V_{T+}$ going up or $V_{T-}$ going down; hold otherwise; invert for a Schmitt inverter.",
    "**PLA:** K-map each output to a minimum SOP, program each distinct product term once, mark the AND and OR connections.",
    "**Fixed point:** integer part by repeated division, fraction by repeated multiplication by 2, truncated to the number of fraction bits; say whether the result is exact.",
  ],
};
