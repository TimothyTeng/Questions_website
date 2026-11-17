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
  caption: "Moore detector for 11 (overlapping): 3 states, z = 1 while in S2.",
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
  caption: "Lecture vending machine after merging equivalent states (inputs c100 c50: 10 = 100c coin, 01 = 50c coin; outputs vend change). S0 idle, S1 50c credit, S2 100c credit, S3 150c (vend), S4 200c (vend + 50c change). S3 and S4 return to idle.",
  initial: "S0",
  states: [
    { id: "S0", label: "S0/00", x: 0, y: 0 },
    { id: "S1", label: "S1/00", x: 1, y: 1 },
    { id: "S2", label: "S2/00", x: 2, y: 0 },
    { id: "S3", label: "S3/10", x: 3, y: 1 },
    { id: "S4", label: "S4/11", x: 3, y: 0 },
  ],
  edges: [
    { from: "S0", to: "S1", label: "01" },
    { from: "S0", to: "S2", label: "10" },
    { from: "S1", to: "S2", label: "01" },
    { from: "S1", to: "S3", label: "10" },
    { from: "S2", to: "S3", label: "01" },
    { from: "S2", to: "S4", label: "10" },
    { from: "S3", to: "S0", bend: -0.25 },
    { from: "S4", to: "S0", bend: 0.25 },
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

const ENCODING_TABLE: Figure = {
  kind: "table",
  caption: "Encodings for a 4-state cyclic machine A → B → C → D → A.",
  head: ["State", "Binary", "Gray", "One-hot"],
  rows: [
    ["A", "00", "00", "0001"],
    ["B", "01", "01", "0010"],
    ["C", "10", "11", "0100"],
    ["D", "11", "10", "1000"],
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
    "A **finite state machine** is the abstraction behind every sequential circuit you have built so far: at any clock cycle the circuit is in one of a finite set of **states**, and at each rising clock edge it moves to a **next state** chosen by the current state and the inputs. Counters are FSMs whose states are their count values; sequence detectors, door locks, vending machines and controllers are FSMs whose states record what has happened so far that still matters. The chapter's workflow runs in one direction: **word description → state diagram → state table → state encoding → next-state and output equations (K-maps) → D flip-flops plus gates**, and exam questions also run it backwards (**circuit → equations → state table → diagram**, then check whether a given diagram matches). Along the way you choose between **Moore** machines (outputs depend on the state only) and **Mealy** machines (outputs also depend on the present input), decide how many flip-flops an encoding needs, and make sure unused codes and reset cannot trap the machine.",
  sections: [
    {
      title: "What an FSM is: states, transitions and the three-block structure",
      intuition:
        "A sequential circuit only remembers what its flip-flops hold. An FSM names each possible memory content (a state) and says, for each input, which state comes next, so you can reason about behaviour before thinking about gates.",
      visuals: ["fsm-stepper"],
      keyIdeas: [
        "An FSM has a **finite set of states**, one of which is the **initial (reset) state**, and a set of **transitions** between them. In a synchronous design the machine sits in one state for a whole clock cycle.",
        "At every **rising clock edge** the FSM may move to another state. Whether it moves, and where, depends on the **current state and the input values at that edge**. After the edge it stays in the new state for the next cycle.",
        "A counter is the simplest FSM: each state is a count value and the transition is always to the next value. An **enabled counter** labels each arrow with en = 1 and stays put when en = 0.",
        "Hardware structure: a **state register** (one D flip-flop per state bit) holds the current state; **next-state logic** (combinational) computes the next state from the current state and the inputs; **output logic** (combinational) computes the outputs.",
        "In a **Moore** machine the output logic sees only the state; in a **Mealy** machine it also sees the inputs (the dashed path in the block diagram).",
        "States can be given any meaningful names (off, on1, Wait, Red1…). Names only become bits when you **encode** the states.",
      ],
      figures: [BLOCK_DIAGRAM],
      formulas: ["S(t+1) = \\delta\\big(S(t),\\,X(t)\\big)", "\\text{Moore: } Z(t) = \\lambda\\big(S(t)\\big) \\qquad \\text{Mealy: } Z(t) = \\lambda\\big(S(t),\\,X(t)\\big)"],
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
        { q: "Name the three blocks of a synchronous FSM.", a: "State register (flip-flops), next-state logic, output logic." },
        { q: "When can a synchronous FSM change state?", a: "Only at the active (rising) clock edge, using the inputs present at that edge." },
        { q: "What does the output logic see in a Moore machine? In a Mealy machine?", a: "Moore: the current state only. Mealy: the current state and the current inputs." },
      ],
    },
    {
      title: "State diagrams and state tables",
      intuition:
        "A diagram is easy to draw from a word description; a table is easy to turn into logic. You need to read and write both, and to know the course's conventions for what an arrow means.",
      keyIdeas: [
        "**State diagram**: circles are states, arrows are transitions, each arrow carries the input condition under which it is taken. Moore outputs go inside or beside the circle (e.g. `off/0`); Mealy outputs go on the arrow after a slash (`input/output`).",
        "With several inputs, use a **legend**: e.g. Inputs: en, dn so an arrow labelled `10` means en = 1, dn = 0. Conditions can also be Boolean expressions (`ar'`, `a(rb'g')'`).",
        "Course convention: input conditions **not shown** on any arrow leaving a state mean **stay in that state** (an implicit self-loop). Unlabelled arrows are unconditional.",
        "The conditions on arrows leaving one state must be **mutually exclusive**: no input combination may satisfy two arrows to different states. The door-lock example needed `a·r·b'·g'` instead of just `a·r`, otherwise pressing every button at once would race through the code.",
        "**State (transition) table**: one row per current state with a next-state column for each input value, plus the output (Moore) or one output per input value (Mealy). An equivalent layout lists one row per (state, input) pair; this is the layout you feed to K-maps.",
        "A diagram and a table are complete when every state has a defined next state for **every** input combination.",
      ],
      figures: [PULSE3, PULSE3_TABLE],
      example: {
        problem: "A 3-bit up/down counter has inputs en, dn (legend `en dn`). It counts up when en dn = 10, down when 11, and holds otherwise. From state 000, where does it go for each input combination, and how is this drawn?",
        steps: [
          "en dn = 10: count up, 000 → 001. Draw an arrow 000 → 001 labelled `10`.",
          "en dn = 11: count down, 000 wraps to 111. Draw 000 → 111 labelled `11`.",
          "en dn = 00 or 01: en = 0, hold. Either draw a self-loop labelled `0x` or rely on the convention that conditions not shown mean stay.",
          "Each of the 8 states gets exactly one `10` arrow and one `11` arrow, so the conditions never overlap.",
        ],
        answer: "000 → 001 on 10, 000 → 111 on 11, stay on 00/01 (implicit self-loop).",
      },
      pitfalls: [
        "Two arrows leaving the same state with overlapping conditions (e.g. `a` and `b` when both can be 1) make the machine ill-defined. Check every pair is mutually exclusive.",
        "Do not confuse a Mealy arrow `1/0` (input 1, output 0) with a Moore legend `10` (two inputs).",
        "In a two-input legend, the bit order follows the legend, not alphabetical order.",
      ],
      recall: [
        { q: "In the course convention, what happens for an input combination that no arrow leaving the state mentions?", a: "The FSM stays in the current state (implicit self-loop)." },
        { q: "Two arrows leave state S with conditions `ab` and `a`. What is wrong?", a: "They are not mutually exclusive: with a = b = 1 both are true, so the next state is undefined. Use `ab` and `ab'`." },
        { q: "Where is a Moore output drawn? A Mealy output?", a: "Moore: in or beside the state circle. Mealy: on the arrow, after the slash." },
      ],
    },
    {
      title: "Moore versus Mealy machines and their timing",
      intuition:
        "A Mealy machine can answer in the same cycle it sees the input, so it reacts one cycle earlier and often needs fewer states. The price is that its output follows the input combinationally, so it can change (or glitch) in the middle of a clock cycle.",
      visuals: ["moore-vs-mealy"],
      keyIdeas: [
        "**Moore**: Z = λ(S). The output changes only after a clock edge (plus the output-logic delay) and is constant for a whole cycle.",
        "**Mealy**: Z = λ(S, X). The output can change whenever an input changes, even mid-cycle with no clock edge.",
        "For the same behaviour a Mealy machine usually needs **fewer states**: an n-bit sequence detector needs n Mealy states but n + 1 Moore states (the extra Moore state exists only to hold the output 1).",
        "Timing: the Mealy detector's output is 1 **during** the cycle in which the last bit of the pattern is present; the Moore output becomes 1 **one clock cycle later**, after the edge that enters the detect state.",
        "To tell them apart from a circuit: if any input reaches the output gates without passing through a flip-flop, it is Mealy.",
        "Converting Mealy → Moore: split each state by the different outputs on arrows entering it (each (state, output) pair becomes a Moore state).",
      ],
      figures: [DET11_MOORE, DET11_MEALY, MOORE_MEALY_WAVE],
      example: {
        problem: "In the waveform above, in which clock cycle does each detector first report the pattern 11, and why do they differ?",
        steps: [
          "x = 1 during cycles 1, 2 and 3. The first 1 is sampled at the edge that starts cycle 2, so both machines are in S1 (\"one 1 seen\") during cycle 2.",
          "Mealy: in cycle 2 the machine is in S1 **and** the present input is 1, so z = λ(S1, 1) = 1 straight away, during cycle 2.",
          "Moore: S1 has output 0. The second 1 is sampled at the edge starting cycle 3, which enters S2 (output 1), so z = 1 from cycle 3.",
          "The Mealy output also drops one cycle earlier (cycle 4, when x = 0 is present), the Moore output at the start of cycle 5.",
          "If x changed mid-cycle instead, the Mealy output would change mid-cycle with it (no clock edge needed); the Moore output still only changes after edges. Try the \"x changes at the falling edge\" option in the figure above.",
        ],
        answer: "Mealy: cycle 2 (as soon as the second 1 is present). Moore: cycle 3, one clock later.",
      },
      pitfalls: [
        "\"Mealy outputs only change at clock edges\" is false: they follow the inputs combinationally.",
        "A Moore output does not depend on the input now, but it does depend on past inputs through the state.",
        "When counting states for a detector, remember the Moore version needs the extra output state.",
      ],
      recall: [
        { q: "How many states does a minimal Mealy detector for a 4-bit pattern need? A Moore one?", a: "4 (Mealy) and 5 (Moore), when no prefixes are equivalent." },
        { q: "Which machine type can produce a pulse shorter than one clock cycle?", a: "Mealy, because its output follows input changes within a cycle." },
        { q: "A circuit's output gate takes X and Q1 as inputs. Moore or Mealy?", a: "Mealy: the input reaches the output without going through a flip-flop." },
      ],
    },
    {
      title: "Designing from a word description: sequence detectors and the Tutorial 10 machine",
      intuition:
        "Each state should mean how much of the thing I am looking for has been seen so far. Write that meaning next to every state; the transitions then follow by asking what the new input does to that progress.",
      visuals: ["detector-builder"],
      keyIdeas: [
        "Recipe: (1) decide Moore or Mealy; (2) list what must be remembered and make one state per distinct situation, writing its meaning; (3) for every state and every input value draw the arrow; (4) add the outputs; (5) mark the reset state.",
        "Sequence detector for pattern P: state Sk means \"the last k inputs are the first k bits of P\". On a mismatch, do not just fall back to S0: go to the **longest suffix of what you have seen that is still a prefix of P**.",
        "**Overlapping** detection: after a match, the end of P may be the start of the next match (1011011 contains 1011 twice). The next state after a match is the longest proper suffix of P that is a prefix of P.",
        "**Non-overlapping**: after a match the machine starts afresh, so the bits of the match cannot be reused.",
        "Tutorial 10 machine (output turns on after two consecutive 1s, off after two consecutive 0s): four Moore states A (off, last input 0), B (off, one 1 seen), C (on), D (on, one 0 seen).",
        "Counters with conditions (count up/down, saturate, skip values) are designed the same way: one state per count value, arrows from the rules.",
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
        "Falling back to S0 on every mismatch is the classic detector bug: for pattern 110, the input 1110 must still be detected, so S2 on input 1 stays in S2.",
        "Read the question for overlapping vs non-overlapping; it changes the arrows leaving the detect state.",
        "Every state needs an arrow for **every** input value; check each state twice (x = 0 and x = 1).",
      ],
      recall: [
        { q: "Detector for 101, overlapping, Moore. Which state follows the detect state S3 on input 0?", a: "S2 (\"10\" seen): the suffix 10 of 1010 is a prefix of 101." },
        { q: "What does state B mean in the Tutorial 10 machine?", a: "Output is off and exactly one 1 has just been seen." },
        { q: "What changes between overlapping and non-overlapping detectors?", a: "Only the arrows leaving the detect state (Moore) or the arrow that completes the match (Mealy)." },
      ],
    },
    {
      title: "Simplifying: merging equivalent states",
      intuition:
        "Two states that produce the same outputs now and react identically to every possible future input are indistinguishable from outside, so one of them is redundant.",
      keyIdeas: [
        "States are **equivalent** when they have the same outputs and, for every input, go to equivalent next states.",
        "Merge by redrawing the arrows that entered the removed state so that they enter the kept one, then delete the removed state.",
        "In the lecture vending machine (150c drink, 100c and 50c coins), the states \"credit 100c\" reached by different coin orders react identically, as do all \"credit 150c\" states and both \"credit 200c\" states: 9 states reduce to 5.",
        "Systematic method (partition refinement): group states by output; split a group whenever two members go, on some input, to different groups; repeat until nothing splits. Each final group is one state.",
        "Fewer states can mean fewer flip-flops (⌈log₂ m⌉) and simpler next-state logic.",
      ],
      figures: [VENDING_MERGED],
      example: {
        problem: "Moore table: S0/0 (0→S1, 1→S2), S1/0 (0→S3, 1→S0), S2/0 (0→S4, 1→S0), S3/1 (0→S3, 1→S0), S4/1 (0→S4, 1→S0). Which states merge?",
        steps: [
          "Group by output: {S0, S1, S2} (output 0) and {S3, S4} (output 1).",
          "S3 and S4: on 0 each goes to its own group {S3, S4}; on 1 both go to S0. They stay together.",
          "In {S0, S1, S2}: on 0, S0 → S1 (output-0 group) but S1 → S3 and S2 → S4 (output-1 group). Split: {S0} and {S1, S2}.",
          "Check {S1, S2} again: on 0 both go to {S3, S4}, on 1 both go to S0. Nothing else splits.",
        ],
        answer: "S3 ≡ S4 and S1 ≡ S2: 3 states remain.",
      },
      pitfalls: [
        "Same output is necessary but not sufficient: the next states must also be equivalent.",
        "Equivalence is checked after the first merge as well: merging one pair can make another pair equivalent.",
      ],
      recall: [
        { q: "Two Moore states have the same output and the same next state for every input. Can they merge?", a: "Yes, they are equivalent." },
        { q: "Why might merging states save a flip-flop?", a: "The number of flip-flops is ⌈log₂ m⌉; reducing m from 5 to 4 drops it from 3 to 2." },
        { q: "First step of partition refinement?", a: "Group the states by their outputs." },
      ],
    },
    {
      title: "State encoding: binary, Gray and one-hot",
      intuition:
        "The diagram uses names; the hardware needs bit patterns. Any unique code per state works, but the choice changes how many flip-flops you need and how complicated the next-state logic is.",
      visuals: ["state-encoding"],
      keyIdeas: [
        "**Binary** (minimal) encoding: m states need ⌈log₂ m⌉ flip-flops. 4 states → 2, 5–8 states → 3, 11 states → 4.",
        "**One-hot**: one flip-flop per state, exactly one of them is 1. m flip-flops, but the next-state equations can be written by inspection: $D_{S_i}$ = OR over every arrow into $S_i$ of (source state bit · arrow condition). Moore outputs are ORs of state bits.",
        "**Gray** encoding: give consecutive states codes that differ in one bit. Useful for cyclic or counter-like machines: only one flip-flop changes per transition.",
        "With binary encoding of m states there are 2^k − m **unused codes**. Treat them as don't-cares in the K-maps only if a reset guarantees the machine starts in a valid state; otherwise check where each unused code goes.",
        "Different encodings give different circuits but identical behaviour.",
        "A good assignment can make equations trivial: for the Tutorial 10 machine, A = 00, B = 01, C = 11, D = 10 gives D0 = x and z = Q1.",
      ],
      figures: [ENCODING_TABLE],
      formulas: ["k_{\\text{binary}} = \\lceil \\log_2 m \\rceil, \\qquad k_{\\text{one-hot}} = m, \\qquad \\text{unused codes} = 2^k - m"],
      example: {
        problem: "Write the one-hot next-state equations for the Tutorial 10 machine (flip-flops A, B, C, D; input x).",
        steps: [
          "Arrows into A: from A on x', from B on x', from D on x'. So $D_A = (A + B + D)x'$.",
          "Into B: from A on x. So $D_B = Ax$.",
          "Into C: from B on x, from C on x, from D on x. So $D_C = (B + C + D)x$.",
          "Into D: from C on x'. So $D_D = Cx'$. Output z = C + D.",
        ],
        answer: "$D_A = (A+B+D)x'$, $D_B = Ax$, $D_C = (B+C+D)x$, $D_D = Cx'$, $z = C + D$ (4 flip-flops).",
      },
      pitfalls: [
        "⌈log₂ m⌉, not log₂ m rounded down: 5 states need 3 flip-flops, not 2.",
        "One-hot equations are only valid while exactly one bit is 1. A one-hot machine has 2^m − m illegal codes.",
        "Gray code helps only when the transitions follow the code order; it does not reduce the flip-flop count.",
      ],
      recall: [
        { q: "How many flip-flops for 6 states in binary? In one-hot?", a: "3 (binary), 6 (one-hot)." },
        { q: "How many unused codes for 6 states in binary?", a: "2³ − 6 = 2." },
        { q: "Write the one-hot D equation for a state entered from S1 on x and from S3 unconditionally.", a: "$D = S_1x + S_3$." },
      ],
    },
    {
      title: "From encoded table to circuit: next-state and output equations",
      intuition:
        "Once states are codes, the next-state bits and the outputs are just combinational functions of (state bits, inputs). Fill the table, minimise each column with a K-map, and hang the result in front of D flip-flops.",
      keyIdeas: [
        "Stages (lecture): draw the diagram with named states → (optional) named state table → encode → encoded state table → equations for each next-state bit and each output → circuit.",
        "With D flip-flops, the next-state bit **is** the D input: $D_i = Q_i^+$. The table columns are directly the K-map contents.",
        "K-map variables: the state bits (MSB first) and the inputs. Moore output maps use the state bits only.",
        "Unused state codes go in the K-map as don't-cares (X) when the reset makes them unreachable.",
        "Lecture example (off = 00, on1 = 01, on2 = 10, on3 = 11): x = s1 + s0, n1 = s1's0 + s1s0' = s1 ⊕ s0, and n0 = s1's0'b + s1s0', which a K-map shrinks further to s0'b + s1s0'.",
        "Implementation: one D flip-flop per state bit, D inputs from the next-state logic, Q outputs fed back to the logic and to the output logic, all flip-flops on the same clock, plus a reset.",
      ],
      figures: [...PULSE3_KMAPS, PULSE3_CIRCUIT],
      example: {
        problem: "Tutorial 10 machine with A = 00, B = 01, C = 11, D = 10 (Q1 Q0). Derive D1, D0 and z.",
        steps: [
          "Encoded table (Q1Q0 x → Q1⁺Q0⁺): 00 0→00, 00 1→01, 01 0→00, 01 1→11, 11 0→10, 11 1→11, 10 0→00, 10 1→11.",
          "Q0⁺ column: 0 1 0 1 0 1 0 1 for x = 0,1 in every state, so $D_0 = x$ (Q0 simply remembers the last input).",
          "Q1⁺ is 1 for (01,1), (11,0), (11,1), (10,1): minterms 3, 5, 6, 7 of (Q1, Q0, x). K-map gives $D_1 = Q_1Q_0 + Q_1x + Q_0x$ (a majority function).",
          "z = 1 in C (11) and D (10): $z = Q_1$.",
        ],
        answer: "$D_1 = Q_1Q_0 + Q_1x + Q_0x$, $D_0 = x$, $z = Q_1$.",
      },
      pitfalls: [
        "Keep the variable order consistent between the table and the K-map (state bits first, then inputs).",
        "For a Moore output, do not include the input in the output equation.",
        "Use the next-state value as D; for T or JK flip-flops you would need excitation tables instead.",
      ],
      recall: [
        { q: "With D flip-flops, what is D_i?", a: "The next value of state bit i: $D_i = Q_i^+$." },
        { q: "What goes in a K-map cell for an unused state code?", a: "A don't-care (X), provided a reset prevents the machine from starting there." },
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
        "Checking a given diagram (PYP 2021-22 Q1(9) style): every arrow and every output in the diagram must match the table. One wrong arrow or output means the answer is \"No\".",
        "**Unreachable / unused states**: codes the design never enters. If the machine powers up there, it may **lock up** (never return to valid states) or emit a wrong output. Always reset the state register to a valid state, and check where unused codes go.",
        "Reset may be synchronous (takes effect at the clock edge) or asynchronous (immediate). Either way, the reset state is the initial-state arrow in the diagram.",
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
        { q: "What is lock-up?", a: "Starting in an unused code from which the machine never returns to a valid state." },
        { q: "How many rows does the state table of a 2-flip-flop, 1-input machine have?", a: "2² × 2 = 8 (state, input) rows." },
      ],
    },
  ],
  playbook: [
    "If you see **\"how many flip-flops\"**: binary needs ⌈log₂ m⌉, one-hot needs m; unused codes = 2^k − m.",
    "If you see **a word description**: write the meaning of each state first, then for every state draw one arrow per input value; finally add outputs and the reset arrow.",
    "If you see **a sequence detector**: Moore needs n + 1 states, Mealy n; on a mismatch go to the longest suffix that is still a prefix; read overlapping vs non-overlapping carefully.",
    "If you see **\"trace this input sequence\"**: make a table edge by edge (state before, input, state after, output). For Moore the output follows the state after the edge; for Mealy it is read on the arrow taken.",
    "If you see **a circuit of D flip-flops and gates**: write D equations, evaluate all (state, input) rows, draw the diagram, then check the given diagram arrow by arrow and output by output.",
    "If **an input wire reaches the output gate** directly: it is a Mealy machine; outputs go on arrows and can change mid-cycle.",
    "If you see **\"derive the next-state equations\"**: build the encoded table, one K-map per state bit with the unused codes as X, and loop for a minimal SOP; D_i = Q_i⁺.",
    "If you are asked **which states can be merged**: group by output, then split by where each input sends them, until stable.",
    "If you see **unused codes or a missing reset**: check where every unused code goes; make sure the machine cannot lock up and has a defined reset state.",
  ],
};
