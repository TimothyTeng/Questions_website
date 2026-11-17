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
    "Chapters 1–5 treated gates as perfect Boolean boxes. This chapter opens the box. A gate is built from **transistors used as switches** (TTL uses bipolar transistors, CMOS uses complementary MOSFETs), so its output is really a voltage pulled up to the supply or down to ground through a network of switches; reading those networks lets you derive the Boolean function of any CMOS circuit. Real voltages are never exactly 0 V or 5 V, so data sheets give **guaranteed levels** ($V_{OH}, V_{OL}, V_{IH}, V_{IL}$) whose gaps are the **noise margins**, current limits that fix the **fan-out**, and the **delay** and **power** that limit speed. Special output and input stages solve practical problems: **tri-state** outputs share a bus, **open-drain** outputs form wired-AND, **Schmitt-trigger** inputs clean up slow or noisy signals, and **active-low** signals with matched bubbles keep diagrams readable. Finally, **PLAs** implement SOP expressions directly in a programmable AND–OR array, and **floating-point** formats (IEEE 754) represent numbers far beyond the range of fixed point. Exams mostly test: CMOS circuit → truth table / canonical form, noise-margin and fan-out arithmetic, delay and power calculations, tri-state and wired-AND behaviour, Schmitt output sketches, PLA programming and IEEE 754 conversions.",
  sections: [
    {
      title: "IC families: TTL vs CMOS, transistors as switches",
      intuition:
        "Every logic output is a switch that connects the output either to the supply (logic 1) or to ground (logic 0). TTL and CMOS are two ways of building those switches, and their differences (supply, levels, power, what a floating input does) decide what can be connected to what.",
      keyIdeas: [
        "An IC is resistors, diodes and transistors fabricated on one piece of silicon (the die/chip). **Scale of integration** by gate count: SSI < 12, MSI 12–99, LSI 100–9 999, VLSI 10 000–99 999, ULSI 100 000–999 999, GSI ≥ 1 000 000.",
        "**TTL** (transistor–transistor logic) uses bipolar junction transistors (base, collector, emitter); $V_{CC}$ is nominally +5 V. Series prefixes (74, 74H, 74L, 74LS, 74ALS…) differ in power, delay and speed, not in pinout or logic function.",
        "**CMOS** uses complementary MOSFETs (gate, drain, source): an NMOS conducts when its gate is 1, a PMOS (drawn with a gate bubble) conducts when its gate is 0. $V_{DD}$ can be 3–18 V; 5 V is used alongside TTL.",
        "CMOS series: 4000/14000 and 74C (old, not TTL compatible), **74HC** (pin-compatible with TTL: same pinout), **74HCT** (also **electrically** compatible with TTL: same voltage/current requirements, can be wired directly).",
        "Transistor as a switch: in a simple BJT inverter, input 1 turns the transistor on and pulls the output to 0; input 0 turns it off and a resistor (or an upper transistor) pulls the output to 1.",
        "**Floating inputs:** an unconnected TTL input acts like logic 1 (≈1.4–1.8 V) but picks up noise; an unconnected CMOS input is disastrous (indeterminate level, can overheat). Tie every unused CMOS input to $V_{DD}$, GND or another input.",
        "Never tie an ordinary output to another output, to $V_{CC}$ or to GND.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Family", "Example", "Note"],
          rows: [
            ["Standard TTL", "7404", "bipolar, 5 V"],
            ["Low-power Schottky TTL", "74LS04", "less power"],
            ["Old CMOS", "4001, 74C02", "not TTL compatible"],
            ["High-speed CMOS", "74HC02", "pin-compatible with TTL"],
            ["HC, TTL-compatible", "74HCT02", "pin- and electrically compatible"],
          ],
          caption: "Family prefixes change electrical characteristics, never the logic function.",
        },
      ],
      example: {
        problem: "A design mixes 74LS (TTL) and CMOS chips on a 5 V board. One spare input of a 74HC00 NAND is unused. What should be done with it, and which CMOS series should be chosen so the TTL outputs can drive the CMOS inputs directly?",
        steps: [
          "A floating CMOS input has no defined level: it can sit mid-way, turning both transistors of the input stage partly on (high current, heating, random output).",
          "For a NAND, tie the unused input to $V_{DD}$ (logic 1 does not change $(A\\cdot 1)' = A'$) or to the used input ($(A\\cdot A)' = A'$).",
          "TTL guarantees only $V_{OH(min)} \\approx 2.4$–2.7 V; 74HC needs $V_{IH(min)} = 3.5$ V, so it is not guaranteed to read a TTL high correctly.",
          "74HCT has TTL input thresholds ($V_{IH(min)} = 2.0$ V), so it is electrically compatible.",
        ],
        answer: "Tie the input to $V_{DD}$ (or to the other input) and use 74HCT parts.",
      },
      pitfalls: [
        "Pin-compatible (74HC) is not the same as electrically compatible (74HCT).",
        "'A floating TTL input reads 1' does not make it good practice; it is still a noise problem.",
        "A PMOS turns on with a **0** on its gate; the bubble on the symbol is the reminder.",
      ],
      recall: [
        { q: "Which CMOS series is electrically compatible with TTL?", a: "74HCT." },
        { q: "What does an unconnected TTL input behave like?", a: "Logic 1 (about 1.4–1.8 V), but it is noise-sensitive and not recommended." },
        { q: "A chip has 5 000 gates. Scale of integration?", a: "LSI (100–9 999 gates)." },
        { q: "When does a PMOS transistor conduct?", a: "When its gate is at logic 0 (low)." },
      ],
    },
    {
      title: "CMOS logic: inverter, NAND, NOR and complex gates",
      intuition:
        "A CMOS gate is two complementary switch networks: PMOS transistors between $V_{DD}$ and the output (pull-up) and NMOS transistors between the output and GND (pull-down). For every input exactly one network conducts, so the output is always firmly connected to one rail and almost no static current flows.",
      visuals: ["cmos-switch"],
      keyIdeas: [
        "**Inverter:** one PMOS (to $V_{DD}$) and one NMOS (to GND), gates joined to X, drains joined to Y. X = 0 → PMOS on → Y = 1; X = 1 → NMOS on → Y = 0.",
        "**Series** transistors conduct only if **all** are on (AND); **parallel** transistors conduct if **any** is on (OR).",
        "**NAND:** NMOS in series (output 0 only when all inputs are 1), PMOS in parallel (any 0 input gives 1). **NOR:** NMOS in parallel, PMOS in series.",
        "The pull-up network is the **dual** of the pull-down: swap series ↔ parallel. Each input drives one PMOS and one NMOS, so an $n$-input single-stage gate uses $2n$ transistors.",
        "A single CMOS stage is always **inverting**: $F = (\\text{pull-down condition})'$. Non-inverting functions (AND, OR) need an extra inverter stage.",
        "**Analysis method:** (1) list the inputs; (2) find which transistors each input drives; (3) find every series/parallel path from the output to GND (NMOS on for 1): those rows have F = 0; (4) find every path from $V_{DD}$ (PMOS on for 0): F = 1; (5) check the two sets are complementary (no row floats or shorts).",
        "If for some input neither network conducts, the output **floats**; if both conduct, $V_{DD}$ is **shorted** to GND. Both mean a faulty design.",
      ],
      formulas: ["F = \\big(\\text{NMOS network condition}\\big)', \\qquad \\text{series} \\to \\text{AND},\\quad \\text{parallel} \\to \\text{OR}"],
      figures: [
        { kind: "svg", svg: cmosGateSvg("X", "Y"), caption: "CMOS inverter" },
        { kind: "svg", svg: cmosGateSvg({ s: ["A", "B"] }, "X"), caption: "2-input NAND: PMOS parallel, NMOS series" },
        { kind: "svg", svg: cmosGateSvg({ p: ["A", "B"] }, "X"), caption: "2-input NOR: PMOS series, NMOS parallel" },
      ],
      example: {
        problem: "Find the canonical forms of Z for the circuit below.",
        figures: [{ kind: "svg", svg: cmosGateSvg({ s: ["D", { p: ["A", { s: ["B", "C"] }] }] }, "Z", true), caption: "4-input CMOS circuit" }],
        steps: [
          "Pull-down: Q5 (D) in series with [Q6 (A) in parallel with the series pair Q7–Q8 (B, C)]. It conducts when $D(A + BC) = 1$.",
          "So Z = 0 when D = 1 together with A = 1 (m9, m11, m13, m15) or with B = C = 1 (m7, m15): Z = 0 on m7, m9, m11, m13, m15.",
          "Pull-up: Q1 (D) in parallel with [Q2 (A) in series with (Q3 ∥ Q4) (B, C)]. PMOS conduct on 0: Z = 1 when $D' + A'(B' + C')$.",
          "Check: $D' + A'(B'+C') = (D(A + BC))'$ by De Morgan, so the networks are complementary (never float, never short).",
          "$Z = \\Sigma m(0,1,2,3,4,5,6,8,10,12,14) = \\Pi M(7, 9, 11, 13, 15)$; simplified, $Z = D' + A'B' + A'C'$.",
        ],
        answer: "$Z = (D(A + BC))' = \\Pi M(7,9,11,13,15)$.",
      },
      pitfalls: [
        "Forgetting the final inversion: the pull-down condition is when F = **0**.",
        "Reading a PMOS as on-for-1. A PMOS conducts for a **0** on its gate.",
        "Writing the pull-up expression without complementing the literals: series PMOS on A, B conducts for $A'B'$, not $AB$.",
        "Assuming any drawn circuit is valid: always check that pull-up and pull-down are complementary.",
      ],
      recall: [
        { q: "In a CMOS NAND, how are the NMOS transistors connected?", a: "In series between the output and GND." },
        { q: "How many transistors does a single-stage CMOS gate with 4 inputs need?", a: "8 (one PMOS and one NMOS per input)." },
        { q: "Pull-down network: A in series with (B ∥ C). Function?", a: "$F = (A(B + C))'$." },
        { q: "What goes wrong if both networks conduct for some input?", a: "A direct short from $V_{DD}$ to GND: large current, undefined output." },
      ],
    },
    {
      title: "Active levels, asserted/negated and bubble-to-bubble diagrams",
      intuition:
        "A signal's name says what it does; the * (or overbar) says whether it does it at 1 or at 0. Drawing bubbles where active-low signals enter and leave gates lets you read a diagram's function directly, without algebra.",
      visuals: ["bubble-match"],
      keyIdeas: [
        "**Active high:** the signal produces its named effect when it is 1. **Active low** (written RESET*, $\\overline{\\text{RESET}}$, RESET_n): the effect happens when it is 0.",
        "**Asserted** = in the active state (1 for active high, 0 for active low). **Negated** (de-asserted) = the other state.",
        "Whether a signal is active high or low depends on its name **and** its effect: Subtract (1 = subtract) and Add* (0 = add) describe the same wire.",
        "A sum-of-minterms expression naturally describes an active-high output (it lists where the output is 1); a product-of-maxterms naturally describes an active-low output (it lists where it is 0), e.g. ODD vs EVEN* for a parity output.",
        "**Bubble-to-bubble design:** draw each gate in the form whose input bubbles match the active level of the signals feeding it. A bubble on an output meeting a bubble on an input cancels, so the diagram reads as plain AND/OR logic of asserted conditions.",
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
        "Asserted does **not** mean 'high'. For RESET*, asserted means 0 V.",
        "An unmatched bubble (a bubble meeting no bubble) is a real inversion and must appear in the expression.",
        "For an active-low output F*, asserted (0) when the condition is true means $F^* = (\\text{condition})'$.",
      ],
      recall: [
        { q: "CS* = 0. Is chip select asserted?", a: "Yes: CS* is active low, so 0 is its asserted state." },
        { q: "An OR gate with bubbles on both inputs is equivalent to…?", a: "A NAND gate: $A' + B' = (AB)'$." },
        { q: "Which canonical form naturally describes an active-low output?", a: "The product of maxterms (it lists where the output is 0)." },
      ],
    },
    {
      title: "Electrical characteristics: voltage levels, noise margins, fan-out, power and delay",
      intuition:
        "A data sheet promises a worst-case range for every output and demands a worst-case range at every input. The gap between what an output guarantees and what an input needs is the noise you can survive; the current an output can supply limits how many inputs it can drive; switching costs power and takes time.",
      visuals: ["noise-margin"],
      keyIdeas: [
        "$V_{OH(min)}$: lowest voltage an output gives for logic 1. $V_{OL(max)}$: highest output voltage for logic 0.",
        "$V_{IH(min)}$: lowest input voltage guaranteed to read as 1. $V_{IL(max)}$: highest input voltage guaranteed to read as 0. Between $V_{IL}$ and $V_{IH}$ the input is **indeterminate**.",
        "**High-state noise margin** $V_{NH} = V_{OH(min)} - V_{IH(min)}$; **low-state** $V_{NL} = V_{IL(max)} - V_{OL(max)}$. The smaller is the guaranteed DC noise immunity. A negative margin means the two families cannot be connected reliably.",
        "Current parameters: $I_{IH}, I_{IL}$ (current into an input at 1/0; ≈1 µA leakage for CMOS), $I_{OH}, I_{OL}$ (current an output can supply at 1 / sink at 0; 0.02–24 mA depending on family).",
        "**Fan-out** = number of standard inputs one output can drive $= \\min(I_{OH}/I_{IH},\\ I_{OL}/I_{IL})$. Overloading reduces noise margins and slows switching.",
        "**Power:** CMOS burns power mainly while switching (dynamic): $P = CV^2f$, proportional to frequency and to the square of the supply voltage. Static power (no switching) is very small.",
        "**Propagation delay:** $t_{PHL}$ = delay to an output High→Low change, $t_{PLH}$ = to an output Low→High change, measured from the causing input edge (50 % points); $t_{PD}$ is their average (e.g. 9–19 ns for a 74HC00).",
        "**Rise time** $t_r$: output goes from 10 % to 90 % of its swing; **fall time** $t_f$: from 90 % to 10 %.",
      ],
      formulas: [
        "V_{NH} = V_{OH(min)} - V_{IH(min)}, \\qquad V_{NL} = V_{IL(max)} - V_{OL(max)}",
        "\\text{fan-out} = \\min\\!\\left(\\frac{I_{OH(max)}}{I_{IH(max)}},\\ \\frac{I_{OL(max)}}{I_{IL(max)}}\\right), \\qquad P_{dyn} = CV^2f, \\qquad t_{PD} = \\frac{t_{PHL} + t_{PLH}}{2}",
      ],
      figures: [
        {
          kind: "table",
          head: ["Family", "$V_{OH(min)}$", "$V_{OL(max)}$", "$V_{IH(min)}$", "$V_{IL(max)}$"],
          rows: [
            ["74 (TTL)", "2.4", "0.4", "2.0", "0.8"],
            ["74LS", "2.7", "0.5", "2.0", "0.8"],
            ["74HC (5 V)", "4.9", "0.1", "3.5", "1.0"],
            ["74HCT (5 V)", "4.9", "0.1", "2.0", "0.8"],
          ],
          caption: "Typical worst-case levels (volts).",
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
        problem: "Family X: $V_{OH(min)} = 2.7$ V, $V_{OL(max)} = 0.4$ V, $V_{IH(min)} = 2.0$ V, $V_{IL(max)} = 0.8$ V, $I_{OH} = 0.4$ mA, $I_{OL} = 8$ mA, $I_{IH} = 20\\ \\mu$A, $I_{IL} = 0.4$ mA. Find the noise margins and the fan-out.",
        steps: [
          "$V_{NH} = 2.7 - 2.0 = 0.7$ V.",
          "$V_{NL} = 0.8 - 0.4 = 0.4$ V, so the worst-case noise immunity is 0.4 V.",
          "High-state fan-out $= 0.4\\text{ mA}/20\\ \\mu\\text{A} = 20$.",
          "Low-state fan-out $= 8/0.4 = 20$.",
        ],
        answer: "$V_{NH} = 0.7$ V, $V_{NL} = 0.4$ V, fan-out 20.",
      },
      pitfalls: [
        "Noise margins compare an **output** level with an **input** level: $V_{OH} - V_{IH}$ and $V_{IL} - V_{OL}$, never $V_{OH} - V_{OL}$.",
        "Fan-out is the **minimum** of the two ratios; watch µA vs mA.",
        "$t_{PHL}$ is named after the **output** transition, not the input edge.",
        "Rise time uses 10 %–90 %, not 0 %–100 %.",
        "Doubling the supply voltage quadruples dynamic power.",
      ],
      recall: [
        { q: "Formula for the low-state noise margin?", a: "$V_{NL} = V_{IL(max)} - V_{OL(max)}$." },
        { q: "$I_{OL} = 16$ mA, $I_{IL} = 1.6$ mA, $I_{OH} = 0.4$ mA, $I_{IH} = 40\\ \\mu$A. Fan-out?", a: "$\\min(10, 10) = 10$." },
        { q: "Halve $V$ and double $f$: what happens to $CV^2f$?", a: "It halves ($\\tfrac14 \\times 2$)." },
        { q: "$t_{PHL} = 8$ ns, $t_{PLH} = 12$ ns. $t_{PD}$?", a: "10 ns." },
      ],
    },
    {
      title: "Tri-state outputs and open-drain outputs",
      intuition:
        "Ordinary outputs fight if wired together. A tri-state output can step aside completely (high impedance), so many devices can take turns on one bus. An open-drain output can only pull down, so several can share a line safely while a pull-up resistor supplies the 1, which gives wired-AND.",
      visuals: ["tristate-bus"],
      keyIdeas: [
        "**Tri-state** outputs have three states: 0, 1 and **high impedance (Hi-Z)**, which is neither 0 nor 1 and behaves like an open circuit.",
        "Enabled: the device acts normally (buffer, inverter…). Disabled: the output is Hi-Z. Enables may be active high or active low (bubble on the enable pin).",
        "A **tri-state inverter** in CMOS: an extra PMOS (gate EN*) in series with the pull-up and an extra NMOS (gate EN) in series with the pull-down; EN = 0 opens both paths.",
        "Bus rule: at any time **at most one** tri-state output may be enabled. Two enabled outputs driving different values cause **bus contention** (large current, undefined level, possible damage). Memories and CPUs share a data bus this way.",
        "**Open-drain** (open-collector in TTL) outputs have only the pull-down transistor: transistor on → 0; off → floating. An external **pull-up resistor** turns the floating state into a 1.",
        "Tying open-drain outputs U, V, W to one pulled-up node gives **wired-AND**: $Z = U \\cdot V \\cdot W$ (any output pulling low forces 0). An open-drain output can also sink the current of an LED.",
      ],
      formulas: ["Z_{\\text{wired-AND}} = U V W, \\qquad \\text{open-drain NANDs: } Z = (AB)'(CD)'(EF)' = (AB + CD + EF)'"],
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
          caption: "Tri-state inverter U and tri-state buffer V whose outputs share one line F.",
        },
        {
          kind: "table",
          head: ["E1", "E2", "F"],
          rows: [
            ["0", "0", "Hi-Z (floating)"],
            ["0", "1", "B"],
            ["1", "0", "A'"],
            ["1", "1", "not allowed (contention if A' ≠ B)"],
          ],
        },
        { kind: "svg", svg: cmosSvg({ s: ["EN*", "X"] }, { s: ["X", "EN"] }, { out: "Y" }), caption: "CMOS tri-state inverter" },
      ],
      example: {
        problem: "Three open-drain NAND gates have outputs U = (AB)', V = (CD)', W = (EF)' tied to a node Z with a pull-up resistor. Find Z when A = B = 1 and all other inputs are 0, and give the general expression.",
        steps: [
          "U = (1·1)' = 0: U's output transistor is on and pulls the node low.",
          "V = (0·0)' = 1 and W = 1: their transistors are off (released), so they do not fight U.",
          "Any output at 0 forces the node to 0, so Z = 0.",
          "In general Z = 1 only if all three release: $Z = UVW = (AB)'(CD)'(EF)' = (AB + CD + EF)'$.",
        ],
        answer: "Z = 0; in general $Z = (AB + CD + EF)'$.",
      },
      pitfalls: [
        "Hi-Z is not logic 0. A floating line can be read as anything.",
        "Two enabled tri-state outputs that happen to agree do no damage, but a design that allows it is still wrong.",
        "Without the pull-up resistor an open-drain output can never produce a 1.",
        "Wired-AND works only with open-drain/open-collector outputs, never with ordinary push-pull outputs.",
      ],
      recall: [
        { q: "What does a disabled tri-state output look like electrically?", a: "An open circuit (high impedance)." },
        { q: "What is bus contention?", a: "Two or more enabled outputs driving one line to different levels." },
        { q: "Why does an open-drain output need a pull-up resistor?", a: "It can only pull low; the resistor supplies logic 1 when the transistor is off." },
        { q: "Open-drain outputs U and V tied to a pulled-up node give…?", a: "Wired-AND: $Z = UV$." },
      ],
    },
    {
      title: "Schmitt-trigger inputs and hysteresis",
      intuition:
        "An ordinary gate has one switching threshold, so a slow or noisy input that wobbles around it makes the output chatter. A Schmitt-trigger input has two thresholds: it switches up only above $V_{T+}$ and back down only below $V_{T-}$, so wobbles inside the gap are ignored.",
      visuals: ["schmitt"],
      keyIdeas: [
        "Two thresholds: $V_{T+}$ (positive-going) and $V_{T-}$ (negative-going), with $V_{T+} > V_{T-}$. The difference $V_{T+} - V_{T-}$ is the **hysteresis**.",
        "Schmitt **inverter:** input rising above $V_{T+}$ → output switches low; input falling below $V_{T-}$ → output switches high. Between the thresholds the output keeps its previous value.",
        "Schmitt **buffer:** same thresholds, non-inverted output.",
        "Uses: slowly changing inputs, noisy lines, push-button/switch bounce. Noise smaller than the hysteresis cannot cause extra transitions.",
        "Symbol: a small hysteresis loop drawn inside the gate.",
      ],
      figures: [{ kind: "svg", svg: HYSTERESIS_SVG, caption: "Transfer characteristic of a Schmitt-trigger inverter: the switching point depends on the direction (hysteresis)." }],
      example: {
        problem: "A Schmitt inverter has $V_{T+} = 1.7$ V, $V_{T-} = 0.9$ V and output 1. Its input takes the values 0.2, 1.2, 1.8, 1.4, 0.8, 1.5, 2.0 V. List the outputs.",
        steps: [
          "0.2: below both thresholds, output stays 1.",
          "1.2: inside the window, output keeps 1.",
          "1.8 > $V_{T+}$: output switches to **0**.",
          "1.4: inside the window, stays 0. Then 0.8 < $V_{T-}$: switches to **1**.",
          "1.5: inside, stays 1. Then 2.0 > $V_{T+}$: switches to **0**.",
        ],
        answer: "1, 1, 0, 0, 1, 1, 0.",
      },
      pitfalls: [
        "Inside the window the output **holds**; it does not go to 0 or to 'unknown'.",
        "For a Schmitt **inverter** the output goes low when the input passes $V_{T+}$ going up.",
        "When sketching, mark only the crossings of $V_{T+}$ while rising and of $V_{T-}$ while falling.",
      ],
      recall: [
        { q: "Define hysteresis for a Schmitt trigger.", a: "Different switching thresholds for rising ($V_{T+}$) and falling ($V_{T-}$) inputs; width $V_{T+} - V_{T-}$." },
        { q: "Input wobbles between 1.3 V and 1.7 V; $V_{T+} = 2$ V, $V_{T-} = 1$ V. Output changes?", a: "None: it never leaves the window." },
        { q: "Name a typical use of a Schmitt-trigger input.", a: "Turning a push-button or slow, noisy signal into clean edges." },
      ],
    },
    {
      title: "Programmable logic arrays (PLAs)",
      intuition:
        "Every combinational function has an SOP form: a layer of ANDs feeding a layer of ORs. A PLA is exactly that, prefabricated with programmable connections, so you implement a design by choosing which literals go into each product term and which product terms go into each output.",
      visuals: ["pla-grid"],
      keyIdeas: [
        "PLDs (programmable logic devices): PLA, PAL (programmable AND plane, fixed OR plane), CPLD, FPGA.",
        "A **PLA** has a programmable **AND plane** (each row forms one product term from any inputs and their complements) and a programmable **OR plane** (each output ORs any of the product terms).",
        "An ✕ at a crossing marks a programmed connection.",
        "Design flow: minimise each output to SOP (K-map), list the **distinct** product terms, program one AND row per term, then connect rows to outputs in the OR plane. A term used by several outputs needs only one row.",
        "Capacity limits: the number of inputs, product-term rows and outputs. Minimisation matters because it reduces the number of rows needed.",
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
          "Distinct product terms: $B'C'$, $AB'$, $BC$: three AND rows ($B'C'$ is shared).",
          "OR plane: $F_1$ ← rows $B'C'$, $AB'$; $F_2$ ← rows $B'C'$, $BC$.",
        ],
        answer: "3 product terms: P1 = B'C' (both outputs), P2 = AB' (F1), P3 = BC (F2).",
      },
      pitfalls: [
        "Each AND row can only produce a **product** term; XORs or sums inside a term must first be expanded to SOP.",
        "Don't program a shared term twice; the OR plane can reuse it.",
        "A PAL has a fixed OR plane, so terms cannot be shared between outputs there.",
      ],
      recall: [
        { q: "Which planes are programmable in a PLA?", a: "Both the AND plane and the OR plane." },
        { q: "What form must a function be in to go on a PLA?", a: "Sum of products (SOP), ideally minimised." },
        { q: "Two outputs share the term AB. How many AND rows does it use?", a: "One; both outputs connect to it in the OR plane." },
      ],
    },
    {
      title: "Fixed-point and floating-point numbers (IEEE 754)",
      intuition:
        "Fixed point puts the radix point in one place, so its range and precision are fixed by the word length. Floating point is binary scientific notation, a significand and an exponent, so the point 'floats' and the same 32 bits cover numbers from about $10^{-38}$ to $10^{38}$ with about 7 significant digits.",
      visuals: ["ieee754"],
      keyIdeas: [
        "**Fixed point:** $m$ integer digits and $n$ fraction digits with the radix point at a fixed position (e.g. $1001.0101_2$). Usually used for integers; for non-integers the disadvantages are a **small range** and **lost significant digits** during computation.",
        "**Floating point:** $Z = S \\times R^E$: significand S (a signed fraction), radix R (2 in binary), exponent E (a signed integer). Example: $2.99792458 \\times 10^5$.",
        "**IEEE 754 single precision (32 bits):** bit 31 = sign S (sign-magnitude: 0 = +, 1 = −), bits 30–23 = 8-bit exponent field e, bits 22–0 = 23-bit fraction f. Double precision: 1 + 11 + 52 bits.",
        "Normalised value: $(-1)^S \\times 1.f_2 \\times 2^{e - 127}$. The leading 1 is **hidden** (not stored), giving 24 bits of precision (≈ 7 decimal digits). The exponent is stored with a **bias** of 127 (e = 1 … 254 → true exponent −126 … +127).",
        "Special patterns: e = 0, f = 0 → ±0; e = 0, f ≠ 0 → denormalised (tiny) numbers; e = 255, f = 0 → ±∞; e = 255, f ≠ 0 → NaN.",
        "Range: largest finite $\\approx 3.4 \\times 10^{38}$; smallest normalised positive $2^{-126} \\approx 1.18 \\times 10^{-38}$.",
        "**Encoding:** sign → |x| in binary → normalise to $1.xxx \\times 2^k$ → e = k + 127 in 8 bits → fraction = bits after the point, padded to 23 → group into hex. **Decoding** reverses this.",
      ],
      formulas: ["x = (-1)^{S} \\times 1.f_2 \\times 2^{\\,e-127}, \\qquad 1 \\le e \\le 254"],
      figures: [
        {
          kind: "table",
          head: ["Field", "Bits", "Width", "Meaning"],
          rows: [
            ["S", "31", "1", "sign of the significand"],
            ["e", "30–23", "8", "exponent + 127"],
            ["f", "22–0", "23", "fraction after the hidden 1"],
          ],
          caption: "IEEE 754 single-precision layout.",
        },
      ],
      example: {
        problem: "Encode $37.25$ in IEEE 754 single precision and give the hex pattern.",
        steps: [
          "Positive: S = 0.",
          "$37 = 100101_2$ and $0.25 = 0.01_2$, so $37.25 = 100101.01_2$.",
          "Normalise: $1.0010101_2 \\times 2^5$.",
          "Exponent field: $5 + 127 = 132 = 1000\\,0100_2$.",
          "Fraction: $0010101$ followed by zeros (23 bits).",
          "Bits `0 10000100 00101010000000000000000` → `0100 0010 0001 0101 0000 …` = 4215 0000.",
        ],
        answer: "$37.25 = 42150000_{16}$.",
      },
      pitfalls: [
        "The lecture slide loosely calls the exponent '2's complement'; the actual IEEE 754 field is **biased** (excess-127): store $k + 127$, not $k$ in 2's complement.",
        "Don't store the leading 1 of the significand: it is implicit.",
        "The significand is sign-magnitude: a negative number differs from its positive only in bit 31 (no 2's complement of the fraction).",
        "Normalise to $1.xxx$, not $0.1xxx$, or the exponent comes out one too small.",
      ],
      recall: [
        { q: "Bias of the single-precision exponent?", a: "127." },
        { q: "Decode 3F800000.", a: "S = 0, e = 127 → true exponent 0, fraction 0: the value 1.0." },
        { q: "What does e = 1111 1111 with f = 0 represent?", a: "±infinity (sign from S)." },
        { q: "Two disadvantages of fixed point for non-integers?", a: "A small range of representable numbers and loss of significant digits during computation." },
      ],
    },
  ],
  playbook: [
    "**CMOS circuit given → function:** read the NMOS network (series = AND, parallel = OR) as the condition for output 0, so $F = (\\ldots)'$; confirm with the PMOS network (literals complemented) and list minterms/maxterms if a canonical form is asked.",
    "**Design a CMOS gate:** write F as (expression)', build the NMOS network straight from the inner expression and the PMOS network as its dual; $2n$ transistors for $n$ inputs.",
    "**Can family A drive family B?** Check $V_{OH(min),A} \\ge V_{IH(min),B}$ and $V_{OL(max),A} \\le V_{IL(max),B}$; the differences are the noise margins.",
    "**Fan-out:** compute $I_{OH}/I_{IH}$ and $I_{OL}/I_{IL}$ in the same units and take the smaller.",
    "**Delay through a chain:** follow the edge gate by gate, adding $t_{PHL}$ or $t_{PLH}$ according to each **output** transition.",
    "**Power scaling:** $P \\propto V^2 f$; square the voltage ratio.",
    "**Tri-state / open-drain circuit:** go through each enable state: disabled → Hi-Z; one enabled → its function; two enabled with different values → contention. Open-drain outputs on a pulled-up node → the AND of the outputs.",
    "**Schmitt sketch:** switch only where the input crosses $V_{T+}$ going up or $V_{T-}$ going down; hold otherwise; invert for a Schmitt inverter.",
    "**PLA:** K-map each output to a minimum SOP, list the distinct product terms once, mark AND-plane literals and OR-plane connections.",
    "**IEEE 754:** sign bit, normalise to $1.f \\times 2^k$, exponent field $k + 127$, 23-bit fraction, group in fours for hex; decode in reverse.",
  ],
};

