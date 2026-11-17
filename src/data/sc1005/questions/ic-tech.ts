import type { Draft } from "@/lib/sc1005/types";
import { cmosGateSvg, cmosSvg, type CmosNet } from "../lessons/ic-tech";

/** An analog voltage trace (one sample per time unit) with dashed threshold lines, as a static SVG. */
function analogSvg(samples: number[], lines: { v: number; label: string }[], vmax = 3.5): string {
  const dx = 20;
  const W = 40 + (samples.length - 1) * dx + 90;
  const H = 190;
  const y = (v: number) => (170 - (v / vmax) * 150).toFixed(1);
  const pts = samples.map((v, i) => `${40 + i * dx},${y(v)}`).join(" ");
  const ls = lines
    .map(
      (l) =>
        `<line x1="36" x2="${W - 86}" y1="${y(l.v)}" y2="${y(l.v)}" stroke="currentColor" stroke-dasharray="5 4" opacity="0.6"/><text x="${W - 82}" y="${Number(y(l.v)) + 4}" font-size="11" fill="currentColor" font-family="monospace">${l.label}</text>`,
    )
    .join("");
  const axis = `<line x1="36" y1="170" x2="${W - 86}" y2="170" stroke="currentColor"/><line x1="36" y1="14" x2="36" y2="170" stroke="currentColor"/><text x="30" y="174" text-anchor="end" font-size="10" fill="currentColor">0</text><text x="30" y="${Number(y(vmax)) + 4}" text-anchor="end" font-size="10" fill="currentColor">${vmax}</text><text x="${W - 86}" y="186" text-anchor="end" font-size="10" fill="currentColor">time →</text><text x="8" y="12" font-size="10" fill="currentColor">V_IN (V)</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${axis}${ls}<polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
}

const AOI: CmosNet = { p: ["A", { s: ["B", "C"] }] };
const S1NET: CmosNet = { p: [{ s: ["A", "B", "C"] }, { s: ["D", { p: ["A", "C"] }] }] };
const FAULT_PDN: CmosNet = { s: ["A", { p: ["B", "C"] }] };
const O3NET: CmosNet = { p: ["D", { s: [{ p: ["A", "B"] }, "C"] }] };
const SCHMITT_S6 = [0.3, 0.7, 1.1, 1.5, 1.8, 1.4, 1.9, 1.5, 1.75, 2.2, 2.6, 3.0, 3.2, 3.1, 2.6, 2.1, 1.7, 1.45, 1.75, 1.3, 1.0, 0.6, 0.3];

export const icTechQuestions: Draft[] = [
  // ---------------------------------------------------------------- IC families
  {
    kind: "mcq",
    subtopic: "TTL and CMOS families",
    difficulty: "easy",
    prompt:
      "A board built from standard TTL chips needs one more quad 2-input NOR gate. You want a **CMOS** part that can be connected directly to the TTL chips, i.e. one that is **electrically compatible** with TTL (similar voltage and current requirements), not merely pin-compatible. Which part should you choose?",
    options: ["4001", "74C02", "74HC02", "74HCT02", "74LS02"],
    answer: 3,
    solution:
      "- **74HCT** = high-speed CMOS that is electrically compatible with TTL: its input thresholds match TTL levels, so the chips can be wired together directly. **74HCT02** is the answer.\n- **74HC02** is pin-compatible with the TTL 7402 (same pinout) but its input thresholds are CMOS levels (e.g. $V_{IH(min)} = 3.5$ V), so a TTL high output (as low as 2.4–2.7 V) is not guaranteed to be read as 1.\n- **4001 / 74C02** are older CMOS series: not TTL compatible.\n- **74LS02** is low-power Schottky **TTL**, not CMOS.",
    source: "Style: Lecture 6-14/6-15 (CMOS families)",
  },
  {
    kind: "mcq",
    subtopic: "Floating inputs",
    difficulty: "medium",
    prompt:
      "One input of a 2-input **TTL** NAND gate is left unconnected (floating). The other input is held at logic 1. What output will a voltmeter most likely show, and why?",
    options: [
      "Logic 0, because a floating TTL input behaves like a logic 1 input",
      "Logic 1, because a floating input behaves like a logic 0 input",
      "High impedance, because the gate is disabled when an input floats",
      "The output oscillates and the IC overheats, exactly as for a floating CMOS input",
      "Logic 1, because a NAND output is 1 unless every input is driven",
    ],
    answer: 0,
    solution:
      "A floating TTL input sits at about 1.4–1.8 V and acts like logic 1. With both inputs effectively 1, $(1 \\cdot 1)' = 0$.\nThis is still **not recommended**: the floating pin picks up noise. For **CMOS** a floating input is far worse (indeterminate level, both transistors partly on, possible overheating), so unused CMOS inputs must be tied to $V_{DD}$, GND or another input.",
    source: "Style: Lecture 6-18",
  },
  // ---------------------------------------------------------------- CMOS
  {
    kind: "mcq",
    subtopic: "CMOS gates",
    difficulty: "easy",
    prompt: "A CMOS **3-input NOR** gate has inputs $A = 0$, $B = 1$, $C = 0$. Which statement is correct?",
    options: [
      "The three PMOS transistors are in series; the PMOS driven by B is off, so there is no path to VDD. The three NMOS are in parallel; the NMOS driven by B is on, so the output is pulled to GND (0).",
      "The three PMOS transistors are in parallel; the PMOS driven by A is on, so the output is pulled to VDD (1).",
      "The three NMOS transistors are in series; since A = 0 one NMOS is off, so the output is 1.",
      "The PMOS driven by B is on and the NMOS driven by B is off, so the output is 1.",
      "Both networks conduct, so the output is undefined.",
    ],
    answer: 0,
    solution:
      "NOR = $(A + B + C)'$. The pull-down network must conduct when **any** input is 1, so the NMOS are in **parallel**; the pull-up must conduct only when **all** inputs are 0, so the PMOS are in **series** (the dual).\nWith $B = 1$: the NMOS on B conducts (NMOS is on for 1) and the PMOS on B is off (PMOS is on for 0), breaking the series chain to $V_{DD}$. Output $= 0$, as $(0 + 1 + 0)' = 0$.\nOption B describes a NAND pull-up; options C–D swap the transistor types or topologies.",
    source: "Style: Lecture 6-36/6-37",
  },
  {
    kind: "mcq",
    subtopic: "CMOS functional analysis",
    difficulty: "medium",
    prompt: "Determine the Boolean function F implemented by the CMOS circuit below.",
    figures: [{ kind: "svg", svg: cmosGateSvg(AOI, "F", true), caption: "PMOS (with gate bubbles) form the pull-up network; NMOS form the pull-down network." }],
    options: ["$F = (A + BC)'$", "$F = (A(B + C))'$", "$F = A + BC$", "$F = A'B'C'$", "$F = AB + C$"],
    answer: 0,
    solution:
      "Read the **pull-down** (NMOS) network: F = 0 when there is a path to GND.\n- Q4 (A) is in parallel with the series pair Q5–Q6 (B, C), so the path exists when $A + BC = 1$.\n- Therefore $F = (A + BC)'$.\nCheck with the pull-up: Q1 (A) is in series with the parallel pair Q2 ∥ Q3 (B, C); PMOS conduct on 0, so F = 1 when $A'(B' + C') = 1$, which is $(A + BC)'$ by De Morgan. The two networks are complementary, as they must be.\n$(A(B+C))'$ swaps series and parallel; $A + BC$ forgets that a single CMOS stage always inverts.",
    source: "Style: Tutorial 5 Q3",
  },
  {
    kind: "short",
    subtopic: "CMOS functional analysis",
    difficulty: "hard",
    prompt:
      "Figure Q shows a 4-input CMOS logic circuit. Identify the conditions that pull Z to GND, and hence write a Boolean expression for Z(A, B, C, D). (Any equivalent expression is accepted.)",
    figures: [{ kind: "svg", svg: cmosGateSvg(S1NET, "Z", true), caption: "Figure Q" }],
    match: "expr",
    vars: ["A", "B", "C", "D"],
    accept: ["(ABC + AD + CD)'", "(ABC + D(A + C))'", "(A'+B'+C')(A'+D')(C'+D')"],
    placeholder: "e.g. (AB + C)'",
    solution:
      "**Pull-down (NMOS) paths from Z to GND:**\n- Q7–Q8–Q9 in series: conducts when $A = B = C = 1$, i.e. $ABC$.\n- Q10 (D) in series with Q11 ∥ Q12 (A, C): conducts when $D(A + C)$.\nThe two branches are in parallel, so Z = 0 exactly when $ABC + D(A + C) = 1$:\n$$Z = (ABC + AD + CD)'$$\n**Check with the pull-up:** (Q1 ∥ Q2 ∥ Q3) in series with (Q4 ∥ (Q5–Q6)), PMOS conducting on 0: $Z = 1$ when $(A' + B' + C')(D' + A'C')$, which is the complement of the pull-down condition, so the circuit never floats or shorts.\nCanonical form: $Z = \\Sigma m(0, 1, 2, 4, 5, 6, 8, 10, 12) = \\Pi M(3, 7, 9, 11, 13, 14, 15)$.",
    source: "Style: PYP 2016-17 S1 Q2(d)",
  },
  {
    kind: "mcq",
    subtopic: "CMOS functional analysis",
    difficulty: "hard",
    prompt:
      "A student meant to build $Z = (A(B + C))'$ in CMOS but drew the pull-up network with the **same** series/parallel shape as the pull-down network (below). For which input combinations ABC is the output Z **floating** (neither network conducts)?",
    figures: [{ kind: "svg", svg: cmosSvg(FAULT_PDN, FAULT_PDN, { out: "Z", numbered: true }), caption: "Faulty design: pull-up = Q1 in series with (Q2 ∥ Q3)." }],
    options: ["ABC = 011 and ABC = 100", "ABC = 000 and ABC = 111", "ABC = 011 only", "ABC = 100, 101 and 110", "None: the output is always driven, but VDD shorts to GND for some inputs"],
    answer: 0,
    solution:
      "Pull-up (PMOS conduct on 0): $A'(B' + C')$. Pull-down (NMOS conduct on 1): $A(B + C)$.\n- Both can never conduct together (one needs $A = 0$, the other $A = 1$), so there is **no short**.\n- Neither conducts when $A = 0$ and $B'+C' = 0$ (B = C = 1): **ABC = 011**; or when $A = 1$ and $B + C = 0$: **ABC = 100**.\nAt those two inputs Z is disconnected from both rails (floating). The correct pull-up is the dual: Q1 (A) in **parallel** with the series pair (B, C).",
    source: "Original",
  },
  {
    kind: "open",
    subtopic: "CMOS design",
    difficulty: "hard",
    prompt:
      "Design a single-stage CMOS circuit (PMOS pull-up and NMOS pull-down networks) that implements\n$$F = (D + C(A + B))'$$\n(i) Sketch the transistor-level circuit, labelling VDD, GND, the output and every transistor's input. (ii) State how many transistors are needed and briefly explain how F = 0 and F = 1 are produced.",
    modelAnswer:
      "**Pull-down (NMOS):** F must be 0 when $D + C(A + B) = 1$. Build $A + B$ as two NMOS in parallel, put that pair in series with an NMOS on C, and put the whole chain in parallel with an NMOS on D.\n**Pull-up (PMOS):** the dual network: A and B in **series**, that pair in **parallel** with C, and the result in **series** with a PMOS on D. It conducts when $D'(C' + A'B') = 1$, which equals $(D + C(A+B))'$.\n**Total: 8 transistors** (4 PMOS + 4 NMOS, one complementary pair per input).\nF = 0: D = 1, or C = 1 together with A or B = 1, gives a conducting NMOS path to GND while the PMOS path is broken. F = 1 otherwise: D = 0 and either C = 0 or A = B = 0 gives a PMOS path to VDD.",
    modelFigures: [{ kind: "svg", svg: cmosGateSvg(O3NET, "F", true), caption: "One correct solution." }],
    rubric: [
      { point: "NMOS pull-down: (A ∥ B) in series with C, all in parallel with D", marks: 3 },
      { point: "PMOS pull-up is the dual: (A series B) ∥ C, in series with D", marks: 3 },
      { point: "VDD/GND/output/inputs labelled; 8 transistors stated", marks: 1 },
      { point: "Explanation of when F = 0 and F = 1 (complementary paths)", marks: 1 },
    ],
    solution: "Draw the NMOS network straight from the un-inverted expression (AND → series, OR → parallel), then take the dual for the PMOS network.",
    source: "Style: Lecture 6-38 (complex CMOS gate)",
  },
  // ---------------------------------------------------------------- active levels
  {
    kind: "mcq",
    subtopic: "Active-high and active-low signals",
    difficulty: "easy",
    prompt: "A register has a control input named LOAD*. The register loads new data when this line is at 0 V and holds its contents when the line is at 5 V. Which statement is correct?",
    options: [
      "LOAD* is active low: LOAD* = 0 means the load is asserted",
      "LOAD* is active high, because a load happens at a definite logic level",
      "LOAD* is asserted when it is 1, since asserted always means high",
      "LOAD* = 1 means the signal is asserted and the register holds",
      "The * marks the signal as a clock input",
    ],
    answer: 0,
    solution:
      "A signal is **active low** if it produces its named effect (here: loading) when it is 0. The * (or an overbar, or a trailing `_n`) flags active-low signals.\n**Asserted** means 'in its active state': 1 for an active-high signal, 0 for an active-low one. So LOAD* is asserted at 0 (load) and **negated** at 1 (hold).",
    source: "Style: Lecture 6-19 to 6-22",
  },
  {
    kind: "mcq",
    subtopic: "Asserted and negated",
    difficulty: "medium",
    prompt:
      "The waveforms show three memory control signals: CS\* (chip select, active low), RD (read, active high) and WR\* (write, active low). A write takes place only while CS\* and WR\* are **both asserted**. During which interval does a write take place?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "CS*", wave: "1100000011" },
          { name: "RD", wave: "0001110000" },
          { name: "WR*", wave: "1111110011" },
        ],
        ticks: ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45"],
        caption: "Time in ms (each division 5 ms).",
      },
    ],
    options: ["30 ms to 40 ms", "0 ms to 10 ms and 40 ms to 50 ms", "15 ms to 30 ms", "10 ms to 40 ms", "30 ms to 50 ms"],
    answer: 0,
    solution:
      "Both signals are active low, so each is asserted while it is **0**.\n- CS* = 0 from 10 ms to 40 ms.\n- WR* = 0 from 30 ms to 40 ms.\nBoth asserted: **30–40 ms**.\n'0–10 and 40–50 ms' is where both are **high**, i.e. both negated (the classic mistake of treating asserted as 'high'). 15–30 ms is the read cycle (CS* asserted and RD = 1).",
    source: "Style: PYP 2016-17 S1 Q2(c)",
  },
  {
    kind: "mcq",
    subtopic: "Bubble-to-bubble logic diagrams",
    difficulty: "medium",
    prompt: "The circuit is drawn with matched bubbles. From the diagram, determine the input conditions that make X high.",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C", "D"],
          gates: [
            { id: "G1", type: "NAND", in: ["A", "B"] },
            { id: "G2", type: "NAND", in: ["!C", "D"] },
            { id: "X", type: "OR", in: ["!G1", "!G2"] },
          ],
          outputs: ["X"],
        },
      },
    ],
    options: ["$X = AB + C'D$", "$X = (AB)' + (C'D)'$", "$X = (A + B)(C' + D)$", "$X = A'B' + CD'$", "$X = AB + CD$"],
    answer: 0,
    solution:
      "An OR gate with bubbled inputs is a NAND drawn in its 'active-low input' form. Each bubble on X's inputs meets the bubble on a NAND output, and matched bubbles cancel:\n- G1's output bubble meets X's input bubble: that input carries $AB$.\n- G2 has a bubble on its C input, so it ANDs $C'$ and $D$; its output bubble also meets a bubble: $C'D$.\nSo X is high when **A and B are both 1, or C = 0 and D = 1**: $X = AB + C'D$.\nAlgebraically: $X = (G1)' + (G2)' = AB + C'D$.",
    source: "Style: Tutorial 5 Q2",
  },
  // ---------------------------------------------------------------- electrical characteristics
  {
    kind: "short",
    subtopic: "Noise margins",
    difficulty: "medium",
    prompt:
      "A logic family has the data-sheet values below. What is the largest noise voltage (in volts) that can be added to a signal travelling between two gates of this family **in either logic state** without causing an error?",
    figures: [
      {
        kind: "table",
        head: ["Parameter", "Value"],
        rows: [
          ["$V_{OH(min)}$", "4.40 V"],
          ["$V_{OL(max)}$", "0.33 V"],
          ["$V_{IH(min)}$", "3.15 V"],
          ["$V_{IL(max)}$", "1.35 V"],
        ],
      },
    ],
    match: "number",
    accept: ["1.02"],
    placeholder: "volts",
    solution:
      "- High-state noise margin: $V_{NH} = V_{OH(min)} - V_{IH(min)} = 4.40 - 3.15 = 1.25$ V.\n- Low-state noise margin: $V_{NL} = V_{IL(max)} - V_{OL(max)} = 1.35 - 0.33 = 1.02$ V.\nA spike must be tolerated whichever state the line is in, so the guaranteed figure is the smaller one: **1.02 V**.",
    source: "Style: L11 practice Q1(a)",
  },
  {
    kind: "mcq",
    subtopic: "Interfacing logic families",
    difficulty: "hard",
    prompt: "Two logic families P and Q both run from 5 V. Which statement about connecting them is correct?",
    figures: [
      {
        kind: "table",
        head: ["", "$V_{OH(min)}$", "$V_{OL(max)}$", "$V_{IH(min)}$", "$V_{IL(max)}$"],
        rows: [
          ["P", "2.7 V", "0.4 V", "2.0 V", "0.8 V"],
          ["Q", "4.9 V", "0.1 V", "3.5 V", "1.0 V"],
        ],
      },
    ],
    options: [
      "Q can drive P reliably, but P cannot reliably drive Q because P's $V_{OH(min)}$ is below Q's $V_{IH(min)}$",
      "P can drive Q reliably, but Q cannot drive P because Q's $V_{OL(max)}$ is too low",
      "Each can drive the other, since both run from the same 5 V supply",
      "Neither can drive the other, because the low-state levels are incompatible",
      "P can drive Q with a high-state noise margin of 0.8 V",
    ],
    answer: 0,
    solution:
      "Driving is reliable when $V_{OH(min)}$ of the driver $\\ge V_{IH(min)}$ of the receiver **and** $V_{OL(max)}$ of the driver $\\le V_{IL(max)}$ of the receiver.\n- **Q → P:** $4.9 \\ge 2.0$ (margin 2.9 V) and $0.1 \\le 0.8$ (margin 0.7 V). OK.\n- **P → Q:** $2.7 < 3.5$: a guaranteed-high output of P may sit in Q's indeterminate region (margin $-0.8$ V). Not reliable, although the low state works ($0.4 \\le 1.0$).\nThis is the TTL → 74HC problem; 74HCT parts (with $V_{IH(min)} = 2.0$ V) solve it. A shared supply voltage says nothing about compatibility.",
    source: "Style: L11 practice Q1(d)",
  },
  {
    kind: "short",
    subtopic: "Fan-out",
    difficulty: "medium",
    prompt:
      "A gate's output can supply $I_{OH(max)} = 1$ mA and sink $I_{OL(max)} = 16$ mA. Each load input it drives needs $I_{IH(max)} = 40\\ \\mu$A and $I_{IL(max)} = 1.6$ mA. What is the DC fan-out (number of load inputs)?",
    match: "number",
    accept: ["10"],
    solution:
      "Check both states and take the smaller result:\n- High state: $I_{OH}/I_{IH} = 1\\text{ mA} / 40\\ \\mu\\text{A} = 25$.\n- Low state: $I_{OL}/I_{IL} = 16 / 1.6 = 10$.\nFan-out $= \\min(25, 10) = $ **10**. Exceeding it would pull $V_{OL}$ up (or $V_{OH}$ down) and eat into the noise margins.",
    source: "Style: L11 practice Q1(b)",
  },
  {
    kind: "short",
    subtopic: "Power dissipation",
    difficulty: "easy",
    prompt:
      "A CMOS output drives a total load capacitance of 50 pF from a 5 V supply and switches at 20 MHz. Using $P = CV^2f$, what is its dynamic power dissipation in **mW**?",
    match: "number",
    accept: ["25"],
    placeholder: "mW",
    solution: "$P = CV^2f = (50 \\times 10^{-12})(5^2)(20 \\times 10^6) = 0.025$ W $=$ **25 mW**.",
    source: "Style: Lecture 6-48",
  },
  {
    kind: "mcq",
    subtopic: "Power dissipation",
    difficulty: "medium",
    prompt:
      "A CMOS design is moved from a 5 V supply to a 3.3 V supply, and at the same time its clock frequency is **doubled**. Assuming the switched capacitance is unchanged and static power is negligible, the new dynamic power is about:",
    options: ["0.87 × the old power", "1.32 × the old power", "0.44 × the old power", "0.66 × the old power", "2 × the old power"],
    answer: 0,
    solution:
      "$P = CV^2f$, so $\\dfrac{P_{new}}{P_{old}} = \\left(\\dfrac{3.3}{5}\\right)^2 \\times 2 = 0.4356 \\times 2 \\approx 0.87$.\n1.32 forgets to square the voltage ratio; 0.44 forgets the frequency doubling. This is why low-voltage CMOS allows faster clocks at similar power.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Propagation delay",
    difficulty: "medium",
    prompt: "The waveforms show the input A and output Y of an inverter; each division is 5 ns. Find $t_{PHL}$, $t_{PLH}$ and the average propagation delay $t_{PD}$.",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "A", wave: "001111110000" },
          { name: "Y", wave: "111100000001" },
        ],
        ticks: ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"],
        marks: [2, 4, 8, 11],
        caption: "Time in ns.",
      },
    ],
    options: [
      "$t_{PHL} = 10$ ns, $t_{PLH} = 15$ ns, $t_{PD} = 12.5$ ns",
      "$t_{PHL} = 15$ ns, $t_{PLH} = 10$ ns, $t_{PD} = 12.5$ ns",
      "$t_{PHL} = 10$ ns, $t_{PLH} = 15$ ns, $t_{PD} = 25$ ns",
      "$t_{PHL} = 20$ ns, $t_{PLH} = 55$ ns, $t_{PD} = 37.5$ ns",
      "$t_{PHL} = 10$ ns, $t_{PLH} = 10$ ns, $t_{PD} = 10$ ns",
    ],
    answer: 0,
    solution:
      "The subscript names the **output** transition.\n- Y goes High → Low at 20 ns, after A rose at 10 ns: $t_{PHL} = 10$ ns.\n- Y goes Low → High at 55 ns, after A fell at 40 ns: $t_{PLH} = 15$ ns.\n- $t_{PD} = (t_{PHL} + t_{PLH})/2 = 12.5$ ns.\nOption B labels the delays by the input edge instead; option D measures from t = 0 instead of from the causing input edge.",
    source: "Style: Lecture 6-49/6-50",
  },
  {
    kind: "short",
    subtopic: "Propagation delay",
    difficulty: "medium",
    prompt:
      "Three inverters are connected in a chain (A → G1 → G2 → G3 → Y). Each has $t_{PHL} = 8$ ns and $t_{PLH} = 12$ ns. Input A makes a **falling** (1 → 0) transition. After how many ns does Y change?",
    match: "number",
    accept: ["32"],
    placeholder: "ns",
    solution:
      "Track the edge through each stage; each inverter flips its direction:\n- A falls → G1 output **rises**: $t_{PLH} = 12$ ns.\n- G2 output **falls**: $t_{PHL} = 8$ ns.\n- G3 output (Y) **rises**: $t_{PLH} = 12$ ns.\nTotal $= 12 + 8 + 12 = $ **32 ns**. (For a rising A it would be $8 + 12 + 8 = 28$ ns.)",
    source: "Style: PYP 2021-22 S1 Q2 (gate delays)",
  },
  {
    kind: "mcq",
    subtopic: "Rise and fall time",
    difficulty: "easy",
    prompt:
      "A logic output swings from 0 V to 5 V. It is at 0.5 V at t = 12 ns, 2.5 V at t = 20 ns, 4.5 V at t = 30 ns, and first reaches 5.0 V at t = 34 ns. What is its rise time $t_r$?",
    options: ["18 ns", "22 ns", "10 ns", "8 ns", "34 ns"],
    answer: 0,
    solution:
      "Rise time is measured between the **10 %** and **90 %** points of the swing: 0.5 V and 4.5 V here. $t_r = 30 - 12 = $ **18 ns**.\n22 ns uses 0 %–100 %; 10 ns is 50 %–90 %; 8 ns is 10 %–50 % (the 50 % point is used for propagation delay, not rise time).",
    source: "Style: Lecture 6-49 (timing parameters)",
  },
  // ---------------------------------------------------------------- tri-state and open drain
  {
    kind: "mcq",
    subtopic: "Tri-state outputs",
    difficulty: "medium",
    prompt:
      "In the circuit, U is a tri-state **inverter** (active-high enable E1) and V is a tri-state **buffer** (active-high enable E2). Their outputs are wired together to form F. Which input combination causes **bus contention** (two enabled outputs driving opposite logic levels)?",
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
        caption: "U (bubble = inverting) and V; outputs U and V are tied together as F.",
      },
    ],
    options: ["E1 = 1, E2 = 1, A = 0, B = 0", "E1 = 1, E2 = 1, A = 1, B = 0", "E1 = 0, E2 = 0, A = 0, B = 1", "E1 = 1, E2 = 0, A = 0, B = 1", "E1 = 0, E2 = 1, A = 1, B = 0"],
    answer: 0,
    solution:
      "Contention needs **both** devices enabled **and** driving different values.\n- A: U drives $A' = 1$, V drives $B = 0$: one output pulls up while the other pulls down. Large current flows, F is indeterminate and the devices may be damaged.\n- B: both enabled but U drives $A' = 0$ and V drives 0: they agree (still poor practice).\n- C: both disabled, F is high impedance (floating).\n- D: only U is enabled: F = $A'$ = 1.\n- E: only V is enabled: F = B = 0.",
    source: "Style: CE1005 2018-19 S1 Q2(b)",
  },
  {
    kind: "mcq",
    subtopic: "Open-drain outputs",
    difficulty: "medium",
    prompt:
      "The outputs U, V, W of three **open-drain** 2-input NOR gates (inputs A,B; C,D; E,F respectively) are tied together to a single node Z, which has a pull-up resistor to $V_{DD}$. What is Z?",
    options: ["$Z = (A + B + C + D + E + F)'$", "$Z = (A + B)' + (C + D)' + (E + F)'$", "$Z = (A + B)(C + D)(E + F)$", "Undefined: tying outputs together always causes contention", "$Z = ABCDEF$"],
    answer: 0,
    solution:
      "An open-drain output can only **pull low** (transistor on) or **let go** (transistor off). If any gate pulls low, Z = 0; Z = 1 (via the pull-up) only if every output lets go. That is **wired-AND**: $Z = UVW$.\n$Z = (A+B)'(C+D)'(E+F)' = (A + B + C + D + E + F)'$ by De Morgan.\nThere is no contention because no output actively drives high. Without the pull-up, Z would float whenever all outputs let go.",
    source: "Style: Lecture 6-61/6-62",
  },
  // ---------------------------------------------------------------- Schmitt trigger
  {
    kind: "mcq",
    subtopic: "Schmitt-trigger inputs",
    difficulty: "medium",
    prompt:
      "A Schmitt-trigger **buffer** has $V_{T+} = 2.0$ V and $V_{T-} = 1.2$ V, and its output is initially 0. Its input takes the voltages below at successive instants (V):\n$$0.4,\\ 1.65,\\ 2.3,\\ 1.5,\\ 1.1,\\ 1.7,\\ 2.1,\\ 0.9$$\nWhat is the output sequence?",
    options: ["0 0 1 1 0 0 1 0", "0 1 1 0 0 1 1 0", "1 1 0 0 1 1 0 1", "0 0 1 0 0 0 1 0", "0 0 1 1 1 1 1 0"],
    answer: 0,
    solution:
      "The output goes 1 only when the input rises **above $V_{T+}$** and goes 0 only when it falls **below $V_{T-}$**; in between it keeps its previous value (hysteresis).\n- 0.4 → 0; 1.65 (< 2.0) → stays 0; 2.3 → **1**; 1.5 (> 1.2) → stays 1; 1.1 → **0**; 1.7 → stays 0; 2.1 → **1**; 0.9 → **0**.\nOption B is an ordinary buffer with one threshold of 1.6 V; option C is a Schmitt **inverter**; option D forgets that the output holds its value between the thresholds.",
    source: "Style: L12 practice Q1",
  },
  {
    kind: "short",
    subtopic: "Schmitt-trigger inputs",
    difficulty: "hard",
    prompt:
      "The slowly changing, noisy voltage below is applied to (a) an **ordinary inverter** with a single switching threshold $V_T = 1.6$ V and (b) a **Schmitt-trigger inverter** with $V_{T+} = 2.0$ V and $V_{T-} = 1.2$ V. Inverter (b) changes state exactly twice. How many times does the output of the ordinary inverter (a) change state?",
    figures: [
      {
        kind: "svg",
        svg: analogSvg(SCHMITT_S6, [
          { v: 2.0, label: "V_T+ = 2.0" },
          { v: 1.6, label: "V_T = 1.6" },
          { v: 1.2, label: "V_T- = 1.2" },
        ]),
        caption: "Input voltage (one sample per time step, joined by straight lines).",
      },
    ],
    match: "number",
    accept: ["8"],
    solution:
      "Count the crossings of the 1.6 V line: the input crosses it **5 times** on the way up (1.5 → 1.8, 1.8 → 1.4, 1.4 → 1.9, 1.9 → 1.5, 1.5 → 1.75) and **3 times** on the way down (1.7 → 1.45, 1.45 → 1.75, 1.75 → 1.3). Total **8** output changes: the ordinary inverter chatters.\nThe Schmitt inverter switches low only when the input first exceeds 2.0 V (at 2.2 V) and back high only when it first drops below 1.2 V (at 1.0 V); the wobbles never span the whole 0.8 V hysteresis window, so it changes just twice.",
    source: "Style: PYP 2016-17 S2 Q2(b)",
  },
  // ---------------------------------------------------------------- PLA
  {
    kind: "mcq",
    subtopic: "Programmable logic arrays",
    difficulty: "medium",
    prompt:
      "A PLA with inputs A, B, C is programmed as in the table: in the AND plane, 1 means the true literal is connected, 0 the complemented literal, and – no connection; in the OR plane, ✕ means the product term is connected to that output. Which is output Y?",
    figures: [
      {
        kind: "table",
        head: ["Term", "A", "B", "C", "X", "Y"],
        rows: [
          ["P1", "1", "0", "–", "✕", ""],
          ["P2", "–", "0", "0", "✕", "✕"],
          ["P3", "0", "1", "1", "", "✕"],
          ["P4", "1", "–", "1", "", "✕"],
        ],
      },
    ],
    options: ["$Y = \\Sigma m(0, 3, 4, 5, 7)$", "$Y = \\Sigma m(0, 4, 5)$", "$Y = \\Sigma m(0, 3, 4, 7)$", "$Y = \\Sigma m(0, 1, 3, 4, 5, 7)$", "$Y = \\Sigma m(1, 2, 6)$"],
    answer: 0,
    solution:
      "Read each product term, then OR the ones connected to Y.\n- P2 $= B'C'$: m0, m4. P3 $= A'BC$: m3. P4 $= AC$: m5, m7.\n- $Y = B'C' + A'BC + AC = \\Sigma m(0, 3, 4, 5, 7)$.\n$\\Sigma m(0,4,5)$ is output X ($AB' + B'C'$). P2 is **shared** by X and Y: a PLA's OR plane lets one product term feed several outputs, which is why designs try to reuse terms.",
    source: "Style: Lecture 7-9/7-10",
  },
  {
    kind: "open",
    subtopic: "Programmable logic arrays",
    difficulty: "hard",
    prompt:
      "Implement the truth table below on a PLA with 4 inputs (a, b, c, d), 6 product terms and 2 outputs (x, y).\n(i) Use Karnaugh maps to obtain a minimum-cost SOP expression for x and for y.\n(ii) Show the programmed connections of the AND plane and OR plane, sharing product terms where possible.",
    figures: [
      {
        kind: "table",
        head: ["abcd", "x", "y", "abcd", "x", "y"],
        rows: [
          ["0000", 1, 0, "1000", 1, 0],
          ["0001", 1, 0, "1001", 0, 0],
          ["0010", 1, 1, "1010", 1, 1],
          ["0011", 0, 1, "1011", 0, 0],
          ["0100", 0, 0, "1100", 0, 0],
          ["0101", 1, 1, "1101", 1, 1],
          ["0110", 0, 1, "1110", 0, 1],
          ["0111", 1, 1, "1111", 1, 1],
        ],
      },
    ],
    modelAnswer:
      "(i) $x = \\Sigma m(0,1,2,5,7,8,10,13,15)$: loop the four corners $b'd'$, the centre block $bd$ (m5, 7, 13, 15) and the pair m0–m1 $a'b'c'$ (or m1–m5 $a'c'd$).\n$$x = b'd' + bd + a'b'c'$$\n$y = \\Sigma m(2,3,5,6,7,10,13,14,15)$: loop column $cd'$ (m2, 6, 10, 14), the block $a'c$ (m2, 3, 6, 7) and $bd$.\n$$y = cd' + a'c + bd$$\n(ii) Product terms (5 of the 6 rows used): P1 = $b'd'$, P2 = $bd$, P3 = $a'b'c'$, P4 = $cd'$, P5 = $a'c$. OR plane: x ← P1, P2, P3; y ← P2, P4, P5. **P2 = bd is shared** by both outputs.",
    modelFigures: [
      { kind: "kmap", vars: ["a", "b", "c", "d"], values: "1110010110100101", groups: ["b'd'", "bd", "a'b'c'"], caption: "x" },
      { kind: "kmap", vars: ["a", "b", "c", "d"], values: "0011011100100111", groups: ["cd'", "a'c", "bd"], caption: "y" },
      {
        kind: "table",
        head: ["Term", "a", "b", "c", "d", "x", "y"],
        rows: [
          ["P1 = b'd'", "–", "0", "–", "0", "✕", ""],
          ["P2 = bd", "–", "1", "–", "1", "✕", "✕"],
          ["P3 = a'b'c'", "0", "0", "0", "–", "✕", ""],
          ["P4 = cd'", "–", "–", "1", "0", "", "✕"],
          ["P5 = a'c", "0", "–", "1", "–", "", "✕"],
          ["P6", "–", "–", "–", "–", "", ""],
        ],
        caption: "PLA programming (P6 unused).",
      },
    ],
    rubric: [
      { point: "K-map for x with correct loops and minimum SOP", marks: 3 },
      { point: "K-map for y with correct loops and minimum SOP", marks: 3 },
      { point: "AND plane connections for each product term (shared term used once)", marks: 2 },
      { point: "OR plane connections for x and y, inputs/outputs labelled", marks: 2 },
    ],
    solution: "Minimise each output, then list the distinct product terms: each becomes one AND-plane row, and the OR plane picks the rows each output needs.",
    source: "Style: L12 practice Q2",
  },
  // ---------------------------------------------------------------- tri-state inverter design
  {
    kind: "open",
    subtopic: "Tri-state outputs",
    difficulty: "medium",
    prompt:
      "(i) Sketch the circuit diagram of a CMOS inverter and briefly describe how it works. (ii) Describe the modifications needed to turn it into a **tri-state inverter** with an active-high enable EN, and explain the output in each state.",
    modelAnswer:
      "(i) A PMOS transistor connects $V_{DD}$ to the output Y and an NMOS transistor connects Y to GND; both gates are driven by the input X. X = 0: the PMOS is on, the NMOS off, so Y is connected to $V_{DD}$: **Y = 1**. X = 1: the PMOS is off, the NMOS on, so Y is connected to GND: **Y = 0**. Only one transistor conducts in steady state, so static power is tiny.\n(ii) Add a second PMOS in series between $V_{DD}$ and the inverter's PMOS, driven by EN* (the complement of EN), and a second NMOS in series between the inverter's NMOS and GND, driven by EN.\n- EN = 1: both extra transistors are on and the circuit behaves as a normal inverter, Y = X'.\n- EN = 0: both extra transistors are off, so Y is disconnected from both $V_{DD}$ and GND: the output is in the **high-impedance (Hi-Z)** state and can share a bus with other tri-state outputs.",
    modelFigures: [
      { kind: "svg", svg: cmosGateSvg("X", "Y"), caption: "(i) CMOS inverter" },
      { kind: "svg", svg: cmosSvg({ s: ["EN*", "X"] }, { s: ["X", "EN"] }, { out: "Y" }), caption: "(ii) Tri-state inverter: series PMOS on EN*, series NMOS on EN" },
    ],
    rubric: [
      { point: "CMOS inverter diagram: PMOS to VDD, NMOS to GND, common gate and drain", marks: 2 },
      { point: "Operation: which transistor is on for X = 0 and X = 1", marks: 2 },
      { point: "Extra series PMOS (gate EN*) and NMOS (gate EN)", marks: 2 },
      { point: "EN = 1 → inverter; EN = 0 → both paths open, Hi-Z output", marks: 2 },
    ],
    solution: "The key idea: a tri-state output must be able to disconnect from **both** rails, so an enable-controlled switch goes in series with each network.",
    source: "Style: PYP 2020-21 S2 Q2(c)",
  },
  // ---------------------------------------------------------------- fixed and floating point
  {
    kind: "short",
    subtopic: "Fixed-point numbers",
    difficulty: "medium",
    prompt:
      "A 12-bit signed fixed-point format stores numbers in 2's complement with the radix point placed so that there are **4 fraction bits** (8 integer bits including the sign). What is the **largest positive** value it can represent? (Give a decimal number.)",
    match: "number",
    accept: ["127.9375"],
    solution:
      "The largest pattern is $0111\\,1111.1111_2$: integer part $127$, fraction $1 - 2^{-4} = 0.9375$. Largest value **127.9375**; the most negative is $1000\\,0000.0000_2 = -128$, and the resolution is $2^{-4} = 0.0625$.\nThis small, fixed range (and lost low-order digits in calculations) is the disadvantage of fixed point that floating point fixes.",
    source: "Style: Lecture 7-11/7-12",
  },
  {
    kind: "short",
    subtopic: "IEEE 754 single precision",
    difficulty: "medium",
    prompt: "Encode $-13.375_{10}$ as an IEEE 754 **single-precision** number. Give the 32-bit pattern in hexadecimal.",
    match: "text",
    accept: ["C1560000", "0xC1560000", "C156 0000", "C1560000h"],
    placeholder: "8 hex digits",
    solution:
      "- Sign: negative, **S = 1**.\n- $13.375 = 1101.011_2 = 1.101011_2 \\times 2^{3}$.\n- Biased exponent: $3 + 127 = 130 = 1000\\,0010_2$.\n- Fraction (drop the hidden leading 1): $101011\\,0000\\ldots$ (23 bits).\nPattern: `1 10000010 10101100000000000000000` → group in fours: `1100 0001 0101 0110 0000 …` = **C156 0000**.",
    source: "Style: Lecture 7-15",
  },
  {
    kind: "short",
    subtopic: "IEEE 754 single precision",
    difficulty: "easy",
    prompt: "The 32-bit pattern $41A40000_{16}$ is an IEEE 754 single-precision number. What decimal value does it represent?",
    match: "number",
    accept: ["20.5"],
    solution:
      "`41A40000` = `0100 0001 1010 0100 0000 …`\n- S = 0 (positive).\n- Exponent field `1000 0011` = 131, so the true exponent is $131 - 127 = 4$.\n- Fraction `0100100…`, so the significand is $1.01001_2$.\n- Value $= 1.01001_2 \\times 2^4 = 10100.1_2 = $ **20.5**.",
    source: "Style: Lecture 7-15",
  },
  {
    kind: "mcq",
    subtopic: "IEEE 754 single precision",
    difficulty: "medium",
    prompt: "What is stored in the 8-bit **exponent field** when $0.15625_{10}$ is written in IEEE 754 single precision?",
    options: ["0111 1100", "1000 0010", "1111 1101", "0000 0011", "0111 1101"],
    answer: 0,
    solution:
      "$0.15625 = 0.00101_2 = 1.01_2 \\times 2^{-3}$. The field holds the exponent plus the bias 127: $-3 + 127 = 124 = $ **0111 1100**.\n- `1000 0010` (130) is the field for $2^{+3}$: sign of the exponent wrong.\n- `1111 1101` is $-3$ in 8-bit 2's complement: the real standard uses a **biased** (excess-127) exponent, not 2's complement.\n- `0111 1101` (125) is an off-by-one from normalising as $0.101 \\times 2^{-2}$ instead of $1.01 \\times 2^{-3}$.",
    source: "Style: Lecture 7-15",
  },
  {
    kind: "mcq",
    subtopic: "IEEE 754 range and precision",
    difficulty: "hard",
    prompt: "Which statement about IEEE 754 single precision is correct?",
    options: [
      "The largest finite value is about $3.4 \\times 10^{38}$ and the smallest positive normalised value is about $1.2 \\times 10^{-38}$",
      "An exponent field of 1111 1111 with a zero fraction encodes the largest finite number",
      "Because the leading 1 is hidden, the significand carries 23 bits of precision, about 10 significant decimal digits",
      "Zero is encoded with exponent field 0111 1111 and an all-zero fraction",
      "Every integer up to $2^{31}$ can be stored exactly",
    ],
    answer: 0,
    solution:
      "- Largest finite: $(2 - 2^{-23}) \\times 2^{127} \\approx 3.40 \\times 10^{38}$; smallest normalised: $2^{-126} \\approx 1.18 \\times 10^{-38}$. **Correct.**\n- Exponent all 1s with fraction 0 is **±∞** (e.g. `FF800000` = −∞); a nonzero fraction there is NaN.\n- The hidden 1 **adds** a bit: 24 bits of significand ≈ 7 decimal digits.\n- Field `0111 1111` (= 127, true exponent 0) with fraction 0 is **1.0**; zero has an all-zero exponent field.\n- Integers are exact only up to $2^{24} = 16\\,777\\,216$; $2^{24} + 1$ already rounds.",
    source: "Original",
  },
];
