import type { Figure, Lesson } from "@/lib/sc1005/types";

// ---- shared figures -------------------------------------------------------------------------

const BLOCK_DIAGRAM: Figure = {
  kind: "svg",
  caption: "Every synchronous FSM: a state register, next-state logic that feeds it, and output logic. The dashed input path to the output logic exists only in a Mealy machine.",
  svg: `<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace, Consolas, monospace" font-size="13">
<defs><marker id="fsmbd-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.6">
<rect x="120" y="45" width="130" height="64" rx="6"/>
<rect x="300" y="45" width="120" height="64" rx="6"/>
<rect x="480" y="45" width="100" height="64" rx="6"/>
<path d="M300,96 L310,102 L300,108"/>
<line x1="20" y1="66" x2="118" y2="66" marker-end="url(#fsmbd-a)"/>
<line x1="250" y1="77" x2="298" y2="77" marker-end="url(#fsmbd-a)"/>
<line x1="420" y1="77" x2="478" y2="77" marker-end="url(#fsmbd-a)"/>
<line x1="580" y1="77" x2="632" y2="77" marker-end="url(#fsmbd-a)"/>
<polyline points="450,77 450,170 95,170 95,92 118,92" marker-end="url(#fsmbd-a)"/>
<line x1="260" y1="102" x2="298" y2="102" marker-end="url(#fsmbd-a)"/>
<polyline points="70,66 70,20 530,20 530,43" stroke-dasharray="5 4" marker-end="url(#fsmbd-a)"/>
</g>
<g fill="currentColor">
<circle cx="450" cy="77" r="3"/><circle cx="70" cy="66" r="3"/>
<text x="20" y="58">inputs X</text>
<text x="185" y="72" text-anchor="middle">Next-state</text><text x="185" y="90" text-anchor="middle">logic</text>
<text x="360" y="72" text-anchor="middle">State</text><text x="360" y="90" text-anchor="middle">register</text>
<text x="530" y="72" text-anchor="middle">Output</text><text x="530" y="90" text-anchor="middle">logic</text>
<text x="258" y="68" font-size="11">next</text>
<text x="230" y="124" font-size="11">clk</text>
<text x="590" y="68" font-size="11">Z</text>
<text x="200" y="186" font-size="11">current state S (fed back)</text>
<text x="300" y="14" font-size="11">Mealy only: X reaches the outputs directly</text>
</g>
</svg>`,
};

const PULSE3: Figure = {
  kind: "fsm",
  caption: "Lecture example: wait in **off** until b = 1, then output x = 1 for three cycles (Moore: the output is written in each state).",
  initial: "off",
  states: [
    { id: "off", label: "off/0", x: 0, y: 0 },
    { id: "on1", label: "on1/1", x: 2, y: 0 },
    { id: "on2", label: "on2/1", x: 2, y: 1 },
    { id: "on3", label: "on3/1", x: 0, y: 1 },
  ],
  edges: [
    { from: "off", to: "off", label: "b'", loop: "top" },
    { from: "off", to: "on1", label: "b" },
    { from: "on1", to: "on2" },
    { from: "on2", to: "on3" },
    { from: "on3", to: "off" },
  ],
};

const PULSE3_TABLE: Figure = {
  kind: "table",
  caption: "State table of the 3-cycle pulse machine (both layouts carry the same information).",
  head: ["Current state", "Next (b = 0)", "Next (b = 1)", "Output x"],
  rows: [
    ["off", "off", "on1", 0],
    ["on1", "on2", "on2", 1],
    ["on2", "on3", "on3", 1],
    ["on3", "off", "off", 1],
  ],
};

const PULSE3_MEALY: Figure = {
  kind: "fsm",
  caption: "Lecture 11 p.36: the same pulse machine with the outputs on the arrows (Inputs/Outputs: b/x). An arrow labelled /1 is taken whatever b is, and x = 1 while the machine is in the state it leaves.",
  initial: "off",
  states: [
    { id: "off", x: 0, y: 0 },
    { id: "on1", x: 1, y: 0 },
    { id: "on2", x: 2, y: 0 },
    { id: "on3", x: 3, y: 0 },
  ],
  edges: [
    { from: "off", to: "off", label: "0/0", loop: "top" },
    { from: "off", to: "on1", label: "1/0" },
    { from: "on1", to: "on2", label: "/1" },
    { from: "on2", to: "on3", label: "/1" },
    { from: "on3", to: "off", label: "/1", bend: 0.35 },
  ],
};

const T10: Figure = {
  kind: "fsm",
  caption: "Tutorial 10 machine (Moore). A: last input 0 while off. B: one 1 seen. C: on. D: one 0 seen while on. Output z = 1 in C and D.",
  initial: "A",
  states: [
    { id: "A", label: "A/0", x: 0, y: 0 },
    { id: "B", label: "B/0", x: 2, y: 0 },
    { id: "C", label: "C/1", x: 2, y: 1 },
    { id: "D", label: "D/1", x: 0, y: 1 },
  ],
  edges: [
    { from: "A", to: "A", label: "0", loop: "top" },
    { from: "A", to: "B", label: "1" },
    { from: "B", to: "A", label: "0" },
    { from: "B", to: "C", label: "1" },
    { from: "C", to: "C", label: "1", loop: "right" },
    { from: "C", to: "D", label: "0" },
    { from: "D", to: "C", label: "1" },
    { from: "D", to: "A", label: "0" },
  ],
};

const DET11_MOORE: Figure = {
  kind: "fsm",
  caption: "Moore detector for 11: 3 states, z = 1 while in S2.",
  initial: "S0",
  states: [
    { id: "S0", label: "S0/0", x: 0, y: 0 },
    { id: "S1", label: "S1/0", x: 1, y: 0 },
    { id: "S2", label: "S2/1", x: 2, y: 0 },
  ],
  edges: [
    { from: "S0", to: "S0", label: "0", loop: "top" },
    { from: "S0", to: "S1", label: "1" },
    { from: "S1", to: "S0", label: "0" },
    { from: "S1", to: "S2", label: "1" },
    { from: "S2", to: "S2", label: "1", loop: "top" },
    { from: "S2", to: "S0", label: "0", bend: 0.35 },
  ],
};

const DET11_MEALY: Figure = {
  kind: "fsm",
  caption: "Mealy detector for 11: 2 states, the output is written on the arrow after the slash (input/output).",
  initial: "S0",
  states: [
    { id: "S0", x: 0, y: 0 },
    { id: "S1", x: 1, y: 0 },
  ],
  edges: [
    { from: "S0", to: "S0", label: "0/0", loop: "top" },
    { from: "S0", to: "S1", label: "1/0" },
    { from: "S1", to: "S0", label: "0/0" },
    { from: "S1", to: "S1", label: "1/1", loop: "top" },
  ],
};

const MOORE_MEALY_WAVE: Figure = {
  kind: "wave",
  caption: "Both 11-detectors driven by the same x (x changes just after each rising edge and is sampled at the next one). The Mealy output is 1 during cycles 2 and 3, while the second 1 is present; the Moore output is 1 during cycles 3 and 4, after the edge that enters S2. Same detections, one cycle apart.",
  ticks: ["0", "", "1", "", "2", "", "3", "", "4", "", "5", "", "6", "", "7", ""],
  signals: [
    { name: "clk", wave: "1010101010101010" },
    { name: "x", wave: "0011111100110000" },
    { name: "Moore", wave: "=.=.=.=.=.=.=.=.", data: ["S0", "S0", "S1", "S2", "S2", "S0", "S1", "S0"] },
    { name: "z Moore", wave: "0000001111000000" },
    { name: "Mealy", wave: "=.=.=.=.=.=.=.=.", data: ["S0", "S0", "S1", "S1", "S1", "S0", "S1", "S0"] },
    { name: "z Mealy", wave: "0000111100000000" },
  ],
};

const VENDING_MERGED: Figure = {
  kind: "fsm",
  caption: "Lecture 11 p.33: the vending machine after merging S4 and S2; S5, S3 and S7; S6 and S8 (inputs c100, c50: 10 = 100c coin, 01 = 50c coin; outputs vend, change). S0 idle, S1 50c credit, S4 100c credit, S5 150c (vend), S6 200c (vend and 50c change).",
  initial: "S0",
  states: [
    { id: "S0", label: "S0/00", x: 1, y: 0 },
    { id: "S1", label: "S1/00", x: 0, y: 1 },
    { id: "S4", label: "S4/00", x: 2, y: 1 },
    { id: "S5", label: "S5/10", x: 1, y: 2 },
    { id: "S6", label: "S6/11", x: 3, y: 2 },
  ],
  edges: [
    { from: "S0", to: "S1", label: "01" },
    { from: "S0", to: "S4", label: "10" },
    { from: "S1", to: "S4", label: "01" },
    { from: "S1", to: "S5", label: "10" },
    { from: "S4", to: "S5", label: "01" },
    { from: "S4", to: "S6", label: "10" },
  ],
};

const PULSE3_CIRCUIT: Figure = {
  kind: "circuit",
  caption: "The 3-cycle pulse machine built from its equations: n1 = s1 ⊕ s0, n0 = s0'b + s1s0', x = s1 + s0.",
  circuit: {
    inputs: ["b", "CLK"],
    gates: [
      { id: "s1", type: "DFF", in: ["n1", "CLK"] },
      { id: "s0", type: "DFF", in: ["n0", "CLK"] },
      { id: "n1", type: "XOR", in: ["s1", "s0"] },
      { id: "g1", type: "AND", in: ["s0.qn", "b"] },
      { id: "g2", type: "AND", in: ["s1", "s0.qn"] },
      { id: "n0", type: "OR", in: ["g1", "g2"] },
      { id: "x", type: "OR", in: ["s1", "s0"] },
    ],
    outputs: ["x"],
  },
};

const PYP_CIRCUIT: Figure = {
  kind: "circuit",
  caption: "A circuit to analyse: D1 = S0·X', D0 = X ⊕ S1, out = (S1 ⊕ S0)'.",
  circuit: {
    inputs: ["X", "CLK"],
    gates: [
      { id: "S1", type: "DFF", in: ["D1", "CLK"] },
      { id: "S0", type: "DFF", in: ["D0", "CLK"] },
      { id: "D1", type: "AND", in: ["S0", "!X"] },
      { id: "D0", type: "XOR", in: ["X", "S1"] },
      { id: "out", type: "XNOR", in: ["S1", "S0"] },
    ],
    outputs: ["out"],
  },
};

const PYP_TABLE: Figure = {
  kind: "table",
  caption: "Its state table, one row per (state, X): evaluate D1 and D0, which become S1S0 after the edge.",
  head: ["S1S0", "X", "D1 = S0X'", "D0 = X⊕S1", "next S1S0", "out"],
  rows: [
    ["00", 0, 0, 0, "00", 1],
    ["00", 1, 0, 1, "01", 1],
    ["01", 0, 1, 0, "10", 0],
    ["01", 1, 0, 1, "01", 0],
    ["10", 0, 0, 1, "01", 0],
    ["10", 1, 0, 0, "00", 0],
    ["11", 0, 1, 1, "11", 1],
    ["11", 1, 0, 0, "00", 1],
  ],
};

const PYP_DIAGRAM: Figure = {
  kind: "fsm",
  caption: "The state diagram the table produces (Moore: out written in each state).",
  states: [
    { id: "00", label: "00/1", x: 0, y: 0 },
    { id: "01", label: "01/0", x: 2, y: 0 },
    { id: "10", label: "10/0", x: 0, y: 1 },
    { id: "11", label: "11/1", x: 2, y: 1 },
  ],
  edges: [
    { from: "00", to: "00", label: "0", loop: "left" },
    { from: "00", to: "01", label: "1" },
    { from: "01", to: "10", label: "0" },
    { from: "01", to: "01", label: "1", loop: "right" },
    { from: "10", to: "01", label: "0" },
    { from: "10", to: "00", label: "1" },
    { from: "11", to: "11", label: "0", loop: "right" },
    { from: "11", to: "00", label: "1" },
  ],
};

const PULSE3_KMAPS: Figure[] = [
  {
    kind: "kmap",
    vars: ["s1", "s0", "b"],
    values: "00111100",
    groups: ["s1's0", "s1s0'"],
    caption: "n1 = s1's0 + s1s0' = s1 ⊕ s0",
  },
  {
    kind: "kmap",
    vars: ["s1", "s0", "b"],
    values: "01001100",
    groups: ["s0'b", "s1s0'"],
    caption: "n0 = s0'b + s1s0'",
  },
];

export const fsmLesson: Lesson = {
  topic: "fsm",
  bigPicture:
    "A **finite state machine** describes a system with a finite number of **states** and the **transitions** between them. In a synchronous design the FSM sits in one state for each clock cycle, and at every rising clock edge it may move to another state, depending on the input values at that edge. Counters are FSMs whose states are their count values; the door lock, the vending machine and the Tutorial 10 machine are FSMs whose states record what has happened so far. The chapter's workflow runs in one direction: **word description → state diagram → (optional) state table → encode the states → encoded state table → next-state and output equations → flip-flops plus gates**, and exam questions also run it backwards (**circuit → equations → state table → diagram**, then check whether a given diagram matches). Along the way you meet **Moore** machines (outputs depend on the state only) and **Mealy** machines (outputs also depend on the present inputs), merge states that react identically, count how many flip-flops an encoding needs, and make sure the state register is reset to a valid state.",
  sections: [
    {
      title: "What an FSM is: states, transitions and the three-block structure",
      intuition:
        "A sequential circuit only remembers what its flip-flops hold. An FSM names each possible situation (a state) and says, for each input, which state comes next, so you can reason about behaviour before thinking about gates.",
      visuals: ["fsm-stepper"],
      keyIdeas: [
        "An FSM describes a system using a **finite number of states** and the associated **transitions**. In synchronous design the FSM is in one state for the duration of each clock cycle.",
        "At every **rising clock edge** the FSM may transition to another state. Whether it does depends on the **input values at that rising edge**; once it makes the transition it stays in that state for the next cycle.",
        "A counter is the simplest FSM: each state is a count value and the transition is always to the next value. An **enabled counter** labels the arrows with the condition en = 1 and stays in the current state when en = 0.",
        "Hardware structure (Lecture 12): a **state register** holds the current state; combinational logic determines the **next state** from the current state and the inputs; combinational logic drives the **outputs**. At each clock edge the state register is updated to whatever was determined to be the next state.",
        "In a **Moore** machine the output logic sees only the state; in a **Mealy** machine it also sees the inputs (the dashed path in the block diagram).",
        "States can be given any meaningful names (off, on1, Wait, Red1…). Names only become bits when you **encode** the states.",
      ],
      figures: [BLOCK_DIAGRAM],
      example: {
        problem: "The 3-cycle pulse machine starts in **off**. The input b sampled at five successive rising edges is 0, 1, 0, 1, 1. List the state and the output x after each edge.",
        figures: [PULSE3],
        steps: [
          "Edge 1, b = 0: off has a b' self-loop, so stay in **off**, x = 0.",
          "Edge 2, b = 1: off → **on1**, x = 1.",
          "Edge 3, b = 0: on1 → on2 is unconditional (no label), so **on2**, x = 1. The input is ignored here.",
          "Edge 4, b = 1: on2 → **on3**, x = 1.",
          "Edge 5, b = 1: on3 → **off** unconditionally, x = 0 (the b = 1 does not restart the pulse until the next edge).",
        ],
        answer: "States off, on1, on2, on3, off; outputs 0, 1, 1, 1, 0.",
      },
      pitfalls: [
        "The input is sampled **at the clock edge**. A change of input between edges does not move the state.",
        "An arrow with no label is unconditional: it is taken at the next edge whatever the inputs are.",
        "The state register is the only memory. Next-state and output logic are purely combinational.",
      ],
      recall: [
        { q: "Name the three parts of the FSM hardware structure.", a: "State register, next-state logic, output logic." },
        { q: "When can a synchronous FSM change state?", a: "Only at the rising clock edge, using the inputs present at that edge." },
        { q: "What does the output logic see in a Moore machine? In a Mealy machine?", a: "Moore: the current state only. Mealy: the current state and the current inputs." },
      ],
    },
    {
      title: "State diagrams and state tables",
      intuition:
        "A diagram is easy to draw from a word description; a table is easy to turn into logic. You need to read and write both, and to know the course's conventions for what an arrow means.",
      keyIdeas: [
        "**State transition diagram**: circle nodes are the states, arrows are the possible transitions, and conditions placed on the arrows say when each transition occurs. Moore outputs go above, below, beside or inside the state circles (e.g. `off/0`), with a legend naming the output; Mealy outputs go on the arrow after a slash (`input/output`).",
        "With several inputs, use a **legend**: e.g. Inputs: en, dn, so an arrow labelled `10` means en = 1, dn = 0. Conditions can also be Boolean expressions (`ar'`, `a(rb'g')'`).",
        "Course convention: input conditions **not shown** on any arrow leaving a state result in a **self-transition** (stay in that state). Unlabelled arrows are unconditional.",
        "The conditions on arrows leaving one state must never be true together. In the door lock, pressing all buttons at once would satisfy `a·r` as well as the other conditions and race to the end state, so the lecture adds further conditions (`a·r·b'·g'`).",
        "**State transition table**: one row per current state with a next-state column for each input value, plus the output. An equivalent layout lists one row per (current state, input) pair; this is the layout you turn into logic.",
        "A diagram and a table are complete when every state has a defined next state for **every** input combination (after the door lock's main path is drawn, the lecture adds the other transitions for every state).",
      ],
      figures: [PULSE3, PULSE3_TABLE],
      example: {
        problem: "A 3-bit up/down counter has inputs en, dn (legend `en dn`). It counts up when en dn = 10, down when 11, and holds otherwise. From state 000, where does it go for each input combination, and how is this drawn?",
        steps: [
          "en dn = 10: count up, 000 → 001. Draw an arrow 000 → 001 labelled `10`.",
          "en dn = 11: count down, 000 wraps to 111. Draw 000 → 111 labelled `11`.",
          "en dn = 00 or 01: en = 0, hold. These combinations are not shown on any arrow, so by the convention the counter stays in 000.",
          "Each of the 8 states gets exactly one `10` arrow and one `11` arrow, so the conditions never overlap.",
        ],
        answer: "000 → 001 on 10, 000 → 111 on 11, stay on 00/01 (implicit self-transition).",
      },
      pitfalls: [
        "Two arrows leaving the same state with conditions that can both be true (e.g. `a·r` and `a·b` when two buttons are pressed together) make the next state undefined. Check every pair.",
        "Do not confuse a Mealy arrow `1/0` (input 1, output 0) with a Moore legend `10` (two inputs).",
        "In a two-input legend, the bit order follows the legend, not alphabetical order.",
      ],
      recall: [
        { q: "In the course convention, what happens for an input combination that no arrow leaving the state mentions?", a: "The FSM stays in the current state (self-transition)." },
        { q: "Two arrows leave state S with conditions `ab` and `a`. What is wrong?", a: "Both are true when a = b = 1, so the next state is undefined. Use `ab` and `ab'`." },
        { q: "Where is a Moore output drawn? A Mealy output?", a: "Moore: in or beside the state circle. Mealy: on the arrow, after the slash." },
      ],
    },
    {
      title: "Moore versus Mealy machines",
      intuition:
        "In every lecture example before page 35 the output depends only on the state. A Mealy machine lets the output also look at the present inputs, so it can describe the same behaviour more compactly, but its output can change in the middle of a clock cycle.",
      visuals: ["moore-vs-mealy"],
      keyIdeas: [
        "**Moore machine**: the outputs depend only on the state: in state s the output is always the same value.",
        "**Mealy machine**: the outputs depend on the state **and** the current values of the inputs, so the outputs can change mid-state if the inputs change.",
        "Mealy outputs cannot be drawn inside the state circles, so they go on the arrows after a slash. The output on an arrow is the output **during the state the arrow leaves**, while the input values match those on that arrow.",
        "Mealy machines are a little harder to design and analyse, but can be more **compact** (fewer states): the 11 detector below needs 3 Moore states but only 2 Mealy states.",
        "From a diagram: outputs in or beside the states → Moore; outputs after a slash on the arrows → Mealy (PYP 2017-18 S1 Q4(c)(i)).",
        "From a circuit: if an input reaches the output gates without passing through a flip-flop, the output depends on the present input, so it is Mealy.",
      ],
      figures: [PULSE3_MEALY, DET11_MOORE, DET11_MEALY, MOORE_MEALY_WAVE],
      example: {
        problem: "In the waveform above, in which clock cycle does each 11 detector first report the pattern, and why do they differ?",
        steps: [
          "x = 1 during cycles 1, 2 and 3. The first 1 is sampled at the edge that starts cycle 2, so both machines are in S1 (\"one 1 seen\") during cycle 2.",
          "Mealy: in cycle 2 the machine is in S1 **and** the present input is 1, so it is on the arrow 1/1 and z = 1 straight away, during cycle 2.",
          "Moore: S1 has output 0. The second 1 is sampled at the edge starting cycle 3, which enters S2 (output 1), so z = 1 from cycle 3.",
          "If x changed mid-cycle instead, the Mealy output would change mid-cycle with it (no clock edge needed); the Moore output still only changes after edges. Try the \"x changes at the falling edge\" option in the figure above.",
        ],
        answer: "Mealy: cycle 2 (as soon as the second 1 is present). Moore: cycle 3, after the edge that enters S2.",
      },
      pitfalls: [
        "\"Mealy outputs only change at clock edges\" is false: they follow the inputs, so they can change mid-state.",
        "A Moore output does not depend on the input now, but it does depend on past inputs through the state.",
        "An arrow label such as `/1` in a Mealy diagram has no input condition: it is taken unconditionally and outputs 1.",
      ],
      recall: [
        { q: "Where does a Mealy diagram show the outputs, and what does the output on an arrow mean?", a: "On the arrows after a slash; it is the output during the state the arrow leaves, while the inputs match that arrow." },
        { q: "Which machine type's output can change in the middle of a clock cycle?", a: "Mealy, because its output depends on the current inputs as well as the state." },
        { q: "A circuit's output gate takes X and Q1 as inputs. Moore or Mealy?", a: "Mealy: the input reaches the output without going through a flip-flop." },
      ],
    },
    {
      title: "Designing from a word description: door lock, Tutorial 10 and counters",
      intuition:
        "Each state should mean what has happened so far that still matters. Write that meaning next to every state; the transitions then follow by asking what each input does from there.",
      keyIdeas: [
        "Lecture door lock (unlock, u = 1, only after start, red, blue, green, red): first draw the main path Wait → Start → Red1 → Blue → Green → Red2 with the condition for each step, then add the other transitions for every state, then add the conditions that stop several buttons pressed together from being accepted.",
        "Name each state after what it remembers: Wait (waiting for the start button), Start (waiting for the first coloured button), Red1 (start and red seen), …, Red2 (whole code entered, u = 1).",
        "In the door lock: with no button pressed (a') the FSM stays; a wrong button (or several at once) sends it back to Wait; Red2 returns to Wait at the next edge.",
        "Tutorial 10 machine (output turns on from the second consecutive 1 and off after the second consecutive 0): four Moore states A (off, last input 0), B (off, one 1 seen), C (on), D (on, one 0 seen).",
        "Counters with conditions (PYP 2016-17 S1 Q4(b), PYP 2017-18 S2 Q4(b)) are designed the same way: one state per count value, arrows from the rules; staying at a limit is a self-loop.",
        "Table-driven specifications (PYP 2016-17 S2 Q4(a): current location × MOVE → next location) give two arrows per table row.",
      ],
      figures: [T10],
      example: {
        problem: "Trace the Tutorial 10 machine from A for the input sequence 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1 (one input per clock edge). Give the output after each edge.",
        steps: [
          "0 → A (z 0), 1 → B (0), 0 → A (0): a single 1 is not enough.",
          "1 → B (0), 1 → C (**1**): second consecutive 1 switches the output on.",
          "0 → D (1), 1 → C (1), 1 → C (1), 0 → D (1): a single 0 does not switch it off.",
          "0 → A (**0**): second consecutive 0 switches it off. 0 → A (0).",
          "1 → B (0), 0 → A (0), 1 → B (0), 1 → C (**1**).",
        ],
        answer: "States A B A B C D C C D A A B A B C; outputs 0 0 0 0 1 1 1 1 1 0 0 0 0 0 1.",
      },
      pitfalls: [
        "Drawing only the main path: every state needs a next state for **every** input combination (shown or implied by the self-transition convention).",
        "Check the conditions leaving each state cannot be true together (the door lock's several-buttons problem).",
        "Mark the reset (initial) state with an arrow.",
      ],
      recall: [
        { q: "In the door lock, what happens in Red1 if a = 1 with b = 1 and g = 1 pressed together?", a: "The condition a·b·r'·g' is false, so the FSM goes back to Wait (the a(br'g')' arrow)." },
        { q: "What does state B mean in the Tutorial 10 machine?", a: "Output is off and exactly one 1 has just been seen." },
        { q: "How is \"the counter stays at its maximum\" drawn?", a: "As a self-loop on the maximum state for the count-up condition." },
      ],
    },
    {
      title: "Simplifying: merging equivalent states",
      intuition:
        "Two states that produce the same outputs now and react identically to every possible future input are indistinguishable from outside, so one of them is redundant.",
      keyIdeas: [
        "A strength of FSMs is that you can see where the behaviour can be simplified: states that have the same output and **react identically to future inputs** can be merged.",
        "Merge by redrawing the arrows that entered the removed state so that they enter the kept one, then delete the removed state.",
        "In the lecture vending machine (the drink costs 150c; only 100c and 50c coins are accepted), S2 and S4 both hold 100c credit and react identically, so they merge; so do S3, S5 and S7 (150c), and S6 and S8 (200c): 9 states reduce to 5.",
        "Fewer states can mean fewer flip-flops ($\\lceil \\log_2 m \\rceil$) and simpler next-state logic.",
      ],
      figures: [VENDING_MERGED],
      example: {
        problem: "Moore table: S0/0 (0→S1, 1→S2), S1/0 (0→S3, 1→S0), S2/0 (0→S4, 1→S0), S3/1 (0→S3, 1→S0), S4/1 (0→S4, 1→S0). Which states merge?",
        steps: [
          "S3 and S4 both output 1, stay where they are on 0 and go to S0 on 1. Whatever inputs follow, they produce the same outputs, so S3 ≡ S4.",
          "S1 and S2 both output 0, go to S0 on 1 and on 0 go to S3 and S4, which have just been found equivalent. So they also react identically: S1 ≡ S2.",
          "S0 also outputs 0, but on input 0 it goes to S1 (output 0) while S1 goes to S3 (output 1), so S0 reacts differently and stays separate.",
        ],
        answer: "S3 ≡ S4 and S1 ≡ S2: 3 states remain.",
      },
      pitfalls: [
        "Same output is necessary but not sufficient: the reactions to future inputs (the next states) must also match.",
        "After one merge, check again: merging one pair can make another pair equivalent (as with S2 and S4 in the vending machine).",
      ],
      recall: [
        { q: "Two Moore states have the same output and the same next state for every input. Can they merge?", a: "Yes: they react identically to every future input." },
        { q: "Why might merging states save a flip-flop?", a: "The number of flip-flops is ⌈log₂ m⌉; reducing m from 5 to 4 drops it from 3 to 2." },
        { q: "In the lecture vending machine, why can S2 and S4 merge?", a: "Both mean 100c credit (output 00) and react identically to every future coin." },
      ],
    },
    {
      title: "State encoding and the number of flip-flops",
      intuition:
        "The diagram uses names; the hardware needs bit patterns. Any unique code per state works, but the choice changes the next-state logic, and a number of states that is not a power of two leaves unused codes.",
      visuals: ["state-encoding"],
      keyIdeas: [
        "To encode the states, assign a unique binary value to each state. Any encoding works as long as each state is unique.",
        "For m states we need $\\lceil \\log_2 m \\rceil$ bits (flip-flops): 4 states → 2 bits (s[1:0]); the 6-state door lock → 3 bits.",
        "With k bits there are $2^k - m$ **unused codes** when m is not a power of two. The FSM must never be left to start in one of them (see reset below).",
        "Different encodings give different circuits, but the resulting functionality is identical.",
        "A good assignment can make the equations simpler: for the Tutorial 10 machine, A = 00, B = 01, C = 11, D = 10 gives D0 = x and z = Q1.",
      ],
      formulas: ["k = \\lceil \\log_2 m \\rceil, \\qquad \\text{unused codes} = 2^k - m"],
      example: {
        problem: "The lecture door lock has 6 states and is encoded Wait = 000, Start = 001, Red1 = 010, Blue = 011, Green = 100, Red2 = 101. How many flip-flops does it need, and which codes are unused?",
        steps: [
          "$2^2 = 4 < 6 \\le 2^3 = 8$, so $\\lceil \\log_2 6 \\rceil = 3$ flip-flops.",
          "$2^3 - 6 = 2$ codes are unused: 110 and 111.",
          "Because 6 is not a power of two, the state register must be reset to a valid state (Wait), and the next-state logic should send any invalid code back to Wait.",
        ],
        answer: "3 flip-flops; unused codes 110 and 111.",
      },
      pitfalls: [
        "⌈log₂ m⌉, not log₂ m rounded down: 5 states need 3 flip-flops, not 2.",
        "Two states with the same code are not an encoding: every state needs a unique code.",
      ],
      recall: [
        { q: "How many flip-flops for 6 states?", a: "3, since 2² = 4 < 6 ≤ 8 = 2³." },
        { q: "How many unused codes for 6 states?", a: "2³ − 6 = 2." },
        { q: "Do two different encodings of the same FSM behave differently?", a: "No: the circuits differ, but the functionality is identical." },
      ],
    },
    {
      title: "From encoded table to circuit: next-state and output equations",
      intuition:
        "Once states are codes, the next-state bits and the outputs are just combinational functions of (state bits, inputs). Fill the table, minimise each column with a K-map, and hang the result in front of D flip-flops.",
      keyIdeas: [
        "Stages (Lecture 12 p.14): draw the diagram with named states → (optional) named state table → encode → encoded state table → equations for each next-state bit and each output → circuit.",
        "With D flip-flops, the next-state bit **is** the D input: $D_i = Q_i^+$. The table columns are directly the K-map contents.",
        "K-map variables: the state bits (MSB first) and the inputs. Moore output maps use the state bits only.",
        "Unused state codes have no next state specified, so they can be treated as don't-cares (X) in the K-maps, provided the state register is reset to a valid state.",
        "Lecture example (off = 00, on1 = 01, on2 = 10, on3 = 11): x = s1 + s0, n1 = s1's0 + s1s0' = s1 ⊕ s0, and n0 = s1's0'b + s1s0', which a K-map shrinks further to s0'b + s1s0'.",
        "Implementation: one D flip-flop per state bit, D inputs from the next-state logic, Q outputs fed back to the logic and to the output logic, all flip-flops on the same clock, plus a reset.",
      ],
      figures: [...PULSE3_KMAPS, PULSE3_CIRCUIT],
      example: {
        problem: "Tutorial 10 machine with A = 00, B = 01, C = 11, D = 10 (Q1 Q0). Derive D1, D0 and z.",
        steps: [
          "Encoded table (Q1Q0 x → Q1⁺Q0⁺): 00 0→00, 00 1→01, 01 0→00, 01 1→11, 11 0→10, 11 1→11, 10 0→00, 10 1→11.",
          "Q0⁺ column: 0 1 0 1 0 1 0 1 for x = 0,1 in every state, so $D_0 = x$ (Q0 simply remembers the last input).",
          "Q1⁺ is 1 for (01,1), (11,0), (11,1), (10,1): minterms 3, 5, 6, 7 of (Q1, Q0, x). K-map gives $D_1 = Q_1Q_0 + Q_1x + Q_0x$.",
          "z = 1 in C (11) and D (10): $z = Q_1$.",
        ],
        answer: "$D_1 = Q_1Q_0 + Q_1x + Q_0x$, $D_0 = x$, $z = Q_1$.",
      },
      pitfalls: [
        "Keep the variable order consistent between the table and the K-map (state bits first, then inputs).",
        "For a Moore output, do not include the input in the output equation.",
        "The D input of each flip-flop is the **next** value of that state bit, not the current one.",
      ],
      recall: [
        { q: "With D flip-flops, what is D_i?", a: "The next value of state bit i: $D_i = Q_i^+$." },
        { q: "What can go in a K-map cell for an unused state code?", a: "A don't-care (X), provided a reset prevents the machine from starting there." },
        { q: "Which variables does a Moore output equation use?", a: "Only the state bits." },
      ],
    },
    {
      title: "Analysing an FSM circuit; unused states and reset",
      intuition:
        "Analysis is design run backwards: read the D equations off the gates, evaluate them for every (state, input) pair, and the state table and diagram fall out. Then any claimed diagram can be checked arrow by arrow.",
      visuals: ["circuit-analyser"],
      keyIdeas: [
        "Step 1: write each flip-flop's D input and each output as a Boolean expression of the Q's and the inputs.",
        "Step 2: for each present state code and each input value, evaluate the D's: that is the next state. Evaluate the outputs too.",
        "Step 3: draw one circle per code and one arrow per table row; put outputs in circles (Moore) or on arrows (Mealy).",
        "Checking a given diagram (PYP 2021-22 S1 Q1(9)): every arrow and every output in the diagram must match the table. One wrong arrow or output means the answer is \"No\".",
        "**Reset** (Lecture 12 p.17): always give the state register a reset to a valid state. Otherwise we cannot predict which state the FSM starts in, and if it starts in an invalid (unused) code we have no idea where it will go, since the transition logic may not be fully specified there. This matters most when the number of states is not a power of two.",
        "Reset may be synchronous (takes effect at the clock edge) or asynchronous (immediate) (Lecture 10 p.7). Either way, the reset state is the initial-state arrow in the diagram.",
      ],
      figures: [PYP_CIRCUIT, PYP_TABLE, PYP_DIAGRAM],
      example: {
        problem: "For the circuit above, a diagram claims: 00/1 (0→00, 1→01), 01/0 (0→10, 1→01), 10/0 (0→01, 1→01), 11/1 (0→11, 1→00). Does it match?",
        steps: [
          "Equations: D1 = S0X', D0 = X ⊕ S1, out = (S1 ⊕ S0)'.",
          "Outputs: 00 → 1, 01 → 0, 10 → 0, 11 → 1. All four outputs in the diagram agree.",
          "Arrows from 00 and 01 agree with the table.",
          "From 10 with X = 1: D1 = 0·0 = 0, D0 = 1 ⊕ 1 = 0, so the next state is **00**, not 01.",
        ],
        answer: "No: the arrow from 10 on X = 1 should go to 00.",
      },
      pitfalls: [
        "Evaluate every D for the same (state, input) pair together; do not mix the present and next state of different flip-flops.",
        "XOR/XNOR on the state lines are easy to misread; write the expression before evaluating.",
        "If an output gate has an input pin wired to X, the machine is Mealy and the output belongs on the arrows.",
      ],
      recall: [
        { q: "First step in analysing an FSM circuit?", a: "Write the D input of every flip-flop (and every output) as an expression of the Q's and inputs." },
        { q: "Why must the state register have a reset?", a: "Otherwise the start state is unpredictable, and from an unused code the next state may be unspecified." },
        { q: "How many rows does the state table of a 2-flip-flop, 1-input machine have?", a: "2² × 2 = 8 (state, input) rows." },
      ],
    },
  ],
  playbook: [
    "If you see **\"how many flip-flops\"**: $\\lceil \\log_2 m \\rceil$ for m states; unused codes = $2^k - m$.",
    "If you see **a word description**: write the meaning of each state first, draw the main path, then for every state add the arrows for the other inputs; finally add outputs and the reset arrow.",
    "If you see **\"trace this input sequence\"**: make a table edge by edge (state before, input, state after, output). For Moore the output follows the state after the edge; for Mealy it is read on the arrow taken.",
    "If you see **a circuit of D flip-flops and gates**: write D equations, evaluate all (state, input) rows, draw the diagram, then check the given diagram arrow by arrow and output by output.",
    "If you are asked **Moore or Mealy**: outputs in the states (or output gates fed only by flip-flops) → Moore; outputs on the arrows (or an input wired to an output gate) → Mealy.",
    "If you see **\"derive the next-state equations\"**: build the encoded table, one K-map per state bit (unused codes may be X), and loop for a minimal SOP; D_i = Q_i⁺.",
    "If you are asked **which states can be merged**: look for states with the same output that react identically to every future input; merge and recheck.",
    "If you see **unused codes or a missing reset**: say the state register must be reset to a valid state, and check where every unused code goes.",
  ],
};
