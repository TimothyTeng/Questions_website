import type { CircuitSpec, Draft, Figure } from "@/lib/sc1005/types";

// ---- shared figures -------------------------------------------------------------------------

const M3_FSM: Figure = {
  kind: "fsm",
  initial: "S0",
  states: [
    { id: "S0", label: "S0/0", x: 0, y: 0 },
    { id: "S1", label: "S1/1", x: 2, y: 0 },
    { id: "S2", label: "S2/0", x: 0, y: 1 },
    { id: "S3", label: "S3/1", x: 2, y: 1 },
  ],
  edges: [
    { from: "S0", to: "S1", label: "0" },
    { from: "S1", to: "S0", label: "1" },
    { from: "S0", to: "S2", label: "1" },
    { from: "S2", to: "S0", label: "0" },
    { from: "S1", to: "S3", label: "0" },
    { from: "S3", to: "S1", label: "1" },
    { from: "S2", to: "S3", label: "1" },
    { from: "S3", to: "S2", label: "0" },
  ],
  caption: "Moore FSM, input x, output z (written as state/z).",
};

const T10_FSM: Figure = {
  kind: "fsm",
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
  caption: "Tutorial 10 machine: input x, output z (state/z).",
};

const M4_FSM: Figure = {
  kind: "fsm",
  initial: "A",
  states: [
    { id: "A", x: 0, y: 0 },
    { id: "B", x: 2, y: 0 },
    { id: "C", x: 1, y: 1 },
  ],
  edges: [
    { from: "A", to: "A", label: "0/0", loop: "top" },
    { from: "A", to: "B", label: "1/0" },
    { from: "B", to: "B", label: "1/1", loop: "right" },
    { from: "B", to: "C", label: "0/0" },
    { from: "C", to: "B", label: "1/0" },
    { from: "C", to: "A", label: "0/1" },
  ],
  caption: "Mealy FSM, arrows labelled x/z.",
};

const C5: CircuitSpec = {
  inputs: ["X", "CLK"],
  gates: [
    { id: "S1", type: "DFF", in: ["D1", "CLK"] },
    { id: "S0", type: "DFF", in: ["D0", "CLK"] },
    { id: "D1", type: "AND", in: ["S0", "X"] },
    { id: "D0", type: "XNOR", in: ["X", "S0"] },
    { id: "out", type: "XOR", in: ["S1", "S0"] },
  ],
  outputs: ["out"],
};

const C6: CircuitSpec = {
  inputs: ["x", "CLK"],
  gates: [
    { id: "A", type: "DFF", in: ["DA", "CLK"] },
    { id: "B", type: "DFF", in: ["DB", "CLK"] },
    { id: "g1", type: "AND", in: ["A.qn", "x"] },
    { id: "DA", type: "OR", in: ["g1", "B"] },
    { id: "DB", type: "XOR", in: ["A", "x"] },
  ],
};

const C24: CircuitSpec = {
  inputs: ["x", "CLK"],
  gates: [
    { id: "Q1", type: "DFF", in: ["D1", "CLK"] },
    { id: "Q0", type: "DFF", in: ["D0", "CLK"] },
    { id: "D1", type: "AND", in: ["Q0", "x"] },
    { id: "D0", type: "NAND", in: ["Q1", "x"] },
    { id: "z", type: "AND", in: ["Q1", "Q0"] },
  ],
  outputs: ["z"],
};

const C25: CircuitSpec = {
  inputs: ["x", "CLK"],
  gates: [
    { id: "Q1", type: "DFF", in: ["D1", "CLK"] },
    { id: "Q0", type: "DFF", in: ["x", "CLK"] },
    { id: "D1", type: "XOR", in: ["Q0", "x"] },
    { id: "z", type: "AND", in: ["Q1", "x"] },
  ],
  outputs: ["z"],
};

const C26: CircuitSpec = {
  inputs: ["x", "CLK"],
  gates: [
    { id: "Q1", type: "TFF", in: ["T1", "CLK"] },
    { id: "Q0", type: "TFF", in: ["T0", "CLK"] },
    { id: "T1", type: "AND", in: ["Q0", "x"] },
    { id: "T0", type: "OR", in: ["!x", "Q1"] },
  ],
};

const C32: CircuitSpec = {
  inputs: ["x", "CLK"],
  gates: [
    { id: "A", type: "DFF", in: ["DA", "CLK"] },
    { id: "B", type: "DFF", in: ["DB", "CLK"] },
    { id: "DA", type: "XOR", in: ["B", "x"] },
    { id: "DB", type: "AND", in: ["A.qn", "x"] },
    { id: "z", type: "AND", in: ["A", "B.qn", "!x"] },
  ],
  outputs: ["z"],
};

const DET101_FSM: Figure = {
  kind: "fsm",
  initial: "S0",
  states: [
    { id: "S0", label: "S0/0", x: 0, y: 0 },
    { id: "S1", label: "S1/0", x: 1, y: 0 },
    { id: "S2", label: "S2/0", x: 2, y: 0 },
    { id: "S3", label: "S3/1", x: 3, y: 0 },
  ],
  edges: [
    { from: "S0", to: "S0", label: "0", loop: "top" },
    { from: "S0", to: "S1", label: "1" },
    { from: "S1", to: "S1", label: "1", loop: "top" },
    { from: "S1", to: "S2", label: "0" },
    { from: "S2", to: "S0", label: "0", bend: 0.3 },
    { from: "S2", to: "S3", label: "1" },
    { from: "S3", to: "S2", label: "0" },
    { from: "S3", to: "S1", label: "1", bend: 0.3 },
  ],
  caption: "101 detector (Moore). S1: seen 1, S2: seen 10, S3: seen 101 (z = 1).",
};

const PYP_Q4_FSM: Figure = {
  kind: "fsm",
  initial: "A",
  states: [
    { id: "A", label: "A/0", x: 0, y: 0 },
    { id: "B", label: "B/0", x: 2, y: 0 },
    { id: "C", label: "C/0", x: 2, y: 1 },
    { id: "D", label: "D/1", x: 0, y: 1 },
  ],
  edges: [
    { from: "A", to: "A", label: "1", loop: "top" },
    { from: "A", to: "B", label: "0" },
    { from: "B", to: "A", label: "1" },
    { from: "B", to: "C", label: "0" },
    { from: "C", to: "A", label: "1" },
    { from: "C", to: "D", label: "0" },
    { from: "D", to: "D", label: "0", loop: "bottom" },
    { from: "D", to: "A", label: "1" },
  ],
  caption: "Moore FSM (state/output), one input.",
};

const PYP_T_FSM: Figure = {
  kind: "fsm",
  initial: "A",
  states: [
    { id: "A", label: "A/0", x: 0, y: 0 },
    { id: "B", label: "B/0", x: 2, y: 0 },
    { id: "C", label: "C/1", x: 2, y: 1 },
    { id: "D", label: "D/1", x: 0, y: 1 },
  ],
  edges: [
    { from: "A", to: "A", label: "T=0", loop: "top" },
    { from: "A", to: "B", label: "T=1" },
    { from: "B", to: "A", label: "T=0" },
    { from: "B", to: "C", label: "T=1" },
    { from: "C", to: "B", label: "T=0" },
    { from: "C", to: "D", label: "T=1" },
    { from: "D", to: "C", label: "T=0" },
    { from: "D", to: "D", label: "T=1", loop: "bottom" },
  ],
  caption: "States written as state/Y.",
};

const PYP_B_FSM: Figure = {
  kind: "fsm",
  initial: "00",
  states: [
    { id: "00", label: "00/0", x: 0, y: 0 },
    { id: "11", label: "11/1", x: 2, y: 0 },
    { id: "01", label: "01/0", x: 0, y: 1 },
    { id: "10", label: "10/0", x: 2, y: 1 },
  ],
  edges: [
    { from: "00", to: "00", label: "B'", loop: "left" },
    { from: "00", to: "10", label: "B" },
    { from: "11", to: "00", label: "B'" },
    { from: "11", to: "10", label: "B" },
    { from: "01", to: "11", label: "B'" },
    { from: "01", to: "10", label: "B" },
    { from: "10", to: "01", label: "B'" },
    { from: "10", to: "10", label: "B", loop: "right" },
  ],
  caption: "Input: B. Output: X (state/X).",
};

const PULSE3_MEALY: Figure = {
  kind: "fsm",
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
  caption: "Lecture 11 p.36, Inputs/Outputs: b/x.",
};

export const fsmQuestions: Draft[] = [
  // 1
  {
    kind: "mcq",
    subtopic: "State encoding",
    difficulty: "easy",
    prompt: "A controller FSM has 11 states and is implemented with a binary state encoding. What is the minimum number of flip-flops needed, and how many codes of the state register are unused?",
    options: ["3 flip-flops, 0 unused codes", "4 flip-flops, 5 unused codes", "4 flip-flops, 11 unused codes", "11 flip-flops, 0 unused codes", "4 flip-flops, 16 unused codes"],
    answer: 1,
    solution:
      "For m states we need $\\lceil \\log_2 m \\rceil$ bits: $2^3 = 8$ codes are too few for 11 states, $2^4 = 16$ are enough, so **4** flip-flops.\nThe register then has $2^4 - 11 = $ **5** codes that no state uses. Because 11 is not a power of two, these unused codes are why the lecture insists on a reset to a valid state.\n16 is the total number of codes, not the unused ones; 11 unused confuses the two counts.",
    source: "Style: Lecture 12 p.5, p.17",
  },
  // 2
  {
    kind: "mcq",
    subtopic: "Moore vs Mealy",
    difficulty: "easy",
    prompt: "Which statement about Moore and Mealy machines is correct?",
    options: [
      "A Moore machine's output depends on the current state and the current input.",
      "A Mealy machine's output can change in the middle of a clock cycle, without a clock edge, if an input changes.",
      "For the same behaviour, a Mealy machine always needs more states than a Moore machine.",
      "In a Moore state diagram the outputs are written on the arrows after a slash.",
      "A Moore output responds to an input change during the same clock cycle.",
    ],
    answer: 1,
    solution:
      "A Mealy output depends on the state **and** the current values of the inputs, so the outputs can change mid-state if the inputs change (Lecture 11 p.35).\n- A: that describes Mealy, not Moore (a Moore output depends only on the state).\n- C: the lecture says Mealy machines can be **more compact**, i.e. need fewer states, not more.\n- D: Mealy outputs are on arrows after a slash; Moore outputs are in or beside the states.\n- E: a Moore output can only change after a clock edge moves the state.",
    source: "Style: Lecture 11 p.35-36",
  },
  // 3
  {
    kind: "mcq",
    subtopic: "Tracing a state diagram",
    difficulty: "medium",
    prompt: "The Moore FSM below starts in S0. The input x sampled at six successive rising clock edges is 1, 1, 0, 1, 0, 0. What is the output z observed **after** each of the six edges?",
    figures: [M3_FSM],
    options: ["0, 1, 0, 1, 0, 0", "1, 0, 1, 0, 1, 1", "0, 0, 1, 0, 1, 0", "0, 1, 0, 1, 0, 1", "0, 1, 1, 1, 0, 0"],
    answer: 0,
    solution:
      "Follow one arrow per edge and read the output of the state you land in:\n- S0 --1--> **S2** (z 0)\n- S2 --1--> **S3** (z 1)\n- S3 --0--> **S2** (z 0)\n- S2 --1--> **S3** (z 1)\n- S3 --0--> **S2** (z 0)\n- S2 --0--> **S0** (z 0)\nSo z = 0, 1, 0, 1, 0, 0. Option C lists the outputs of the states **before** each edge (one step behind); option B is the complement.",
    source: "Style: PYP 2016-17 S1 Q4(c)",
  },
  // 4
  {
    kind: "short",
    subtopic: "Tracing a Mealy machine",
    difficulty: "medium",
    prompt: "The Mealy FSM below starts in state A. The input sequence x = 1, 1, 0, 0, 1, 0, 1, 1, 0 is applied, one value per clock cycle. Give the output z during each of the nine cycles as a 9-bit string (first cycle first).",
    figures: [M4_FSM],
    accept: ["010100010", "0,1,0,1,0,0,0,1,0", "0, 1, 0, 1, 0, 0, 0, 1, 0"],
    placeholder: "e.g. 000110010",
    solution:
      "For a Mealy machine the output of a cycle is the label after the slash on the arrow taken with that cycle's input:\n- A, x=1: arrow 1/0 → B, z = 0\n- B, x=1: 1/1 (self-loop), z = **1**\n- B, x=0: 0/0 → C, z = 0\n- C, x=0: 0/1 → A, z = **1**\n- A, x=1: → B, z = 0\n- B, x=0: → C, z = 0\n- C, x=1: 1/0 → B, z = 0\n- B, x=1: self-loop, z = **1**\n- B, x=0: → C, z = 0\nz = **010100010**.",
    source: "Style: Lecture 11 p.36 (Mealy outputs on arrows)",
  },
  // 5
  {
    kind: "mcq",
    subtopic: "Analysing an FSM circuit",
    difficulty: "medium",
    prompt: "Does the state diagram correspond to the circuit (state S1S0, input X)? If not, what is wrong?",
    figures: [
      { kind: "circuit", circuit: C5, caption: "D1 = S0·X, D0 = (X ⊕ S0)', out = S1 ⊕ S0" },
      {
        kind: "fsm",
        states: [
          { id: "00", label: "00/0", x: 0, y: 0 },
          { id: "01", label: "01/1", x: 2, y: 0 },
          { id: "10", label: "10/1", x: 0, y: 1 },
          { id: "11", label: "11/1", x: 2, y: 1 },
        ],
        edges: [
          { from: "00", to: "00", label: "1", loop: "left" },
          { from: "00", to: "01", label: "0" },
          { from: "01", to: "00", label: "0" },
          { from: "01", to: "11", label: "1" },
          { from: "11", to: "11", label: "1", loop: "right" },
          { from: "11", to: "00", label: "0", bend: 0.12 },
          { from: "10", to: "01", label: "0", bend: 0.12 },
          { from: "10", to: "00", label: "1" },
        ],
        caption: "Claimed diagram (state/out, arrows labelled with X).",
      },
    ],
    options: [
      "Yes, the diagram matches the circuit.",
      "No: from 00 with X = 0 the circuit stays in 00.",
      "No: from 01 with X = 1 the circuit goes to 10.",
      "No: the output in state 11 should be 0.",
      "No: from 10 with X = 0 the circuit goes to 00.",
    ],
    answer: 3,
    solution:
      "Write the equations: $D_1 = S_0X$, $D_0 = \\overline{X \\oplus S_0}$, $out = S_1 \\oplus S_0$ (Moore: no X).\nState table (S1S0, X → next, out):\n- 00: X=0 → 01, X=1 → 00, out 0\n- 01: X=0 → 00, X=1 → 11, out 1\n- 10: X=0 → 01, X=1 → 00, out 1\n- 11: X=0 → 00, X=1 → 11, out **0**\nEvery arrow in the diagram agrees with the table, and the outputs of 00, 01, 10 agree, but $out = 1 \\oplus 1 = 0$ in state 11, while the diagram shows 11/1. So the answer is **No**, because of the output of 11.",
    solutionFigures: [
      {
        kind: "table",
        head: ["S1S0", "X", "D1 = S0X", "D0 = (X⊕S0)'", "next", "out"],
        rows: [
          ["00", 0, 0, 1, "01", 0],
          ["00", 1, 0, 0, "00", 0],
          ["01", 0, 0, 0, "00", 1],
          ["01", 1, 1, 1, "11", 1],
          ["10", 0, 0, 1, "01", 1],
          ["10", 1, 0, 0, "00", 1],
          ["11", 0, 0, 0, "00", 0],
          ["11", 1, 1, 1, "11", 0],
        ],
      },
    ],
    source: "Style: PYP 2021-22 S1 Q1(9)",
  },
  // 6
  {
    kind: "mcq",
    subtopic: "Analysing an FSM circuit",
    difficulty: "hard",
    prompt: "The circuit below is in state AB = 10. The input sequence x = 1, 1, 0 is applied on three successive rising edges. What is the state AB after each of the three edges?",
    figures: [{ kind: "circuit", circuit: C6 }],
    options: ["11, 10, 01", "00, 11, 10", "00, 11, 11", "01, 11, 11", "00, 01, 11"],
    answer: 2,
    solution:
      "Equations: $D_A = A'x + B$, $D_B = A \\oplus x$.\n- AB = 10, x = 1: $D_A = 0\\cdot1 + 0 = 0$, $D_B = 1 \\oplus 1 = 0$ → **00**\n- AB = 00, x = 1: $D_A = 1\\cdot1 + 0 = 1$, $D_B = 0 \\oplus 1 = 1$ → **11**\n- AB = 11, x = 0: $D_A = 0 + 1 = 1$, $D_B = 1 \\oplus 0 = 1$ → **11**\nOption B forgets that B = 1 alone already sets $D_A$ (the OR gate).",
    source: "Style: PYP 2021-22 S1 Q1(8)",
  },
  // 7
  {
    kind: "short",
    subtopic: "Next-state equations",
    difficulty: "hard",
    prompt:
      "A 3-state Moore FSM is encoded P = 00, Q = 01, R = 10 (state bits Q1 Q0); code 11 is never used and the register has a reset. Its encoded state table is below. Using D flip-flops, give the **minimal SOP** for $D_1$ in terms of Q1, Q0 and x.",
    figures: [
      {
        kind: "table",
        head: ["Q1 Q0", "x", "Q1⁺ Q0⁺", "z"],
        rows: [
          ["00", 0, "00", 0],
          ["00", 1, "01", 0],
          ["01", 0, "10", 0],
          ["01", 1, "01", 0],
          ["10", 0, "00", 1],
          ["10", 1, "01", 1],
          ["11", 0, "xx", "x"],
          ["11", 1, "xx", "x"],
        ],
      },
    ],
    accept: ["Q0x'", "Q0 x'", "x'Q0"],
    match: "expr",
    dontCares: [6, 7],
    vars: ["Q1", "Q0", "x"],
    minimal: true,
    placeholder: "e.g. Q1x + Q0'",
    solution:
      "$D_1 = Q_1^+$ is 1 only in the row Q1Q0 = 01, x = 0 (minterm 2). The unused code 11 gives don't-cares at minterms 6 and 7.\nOn the K-map (rows Q1, columns Q0x), minterm 2 (Q1Q0x = 010) pairs with the don't-care 6 (110): the loop drops Q1, giving $D_1 = Q_0x'$.\nWithout the don't-care you would get $Q_1'Q_0x'$ (3 literals), which works but is not minimal.",
    solutionFigures: [{ kind: "kmap", vars: ["Q1", "Q0", "x"], values: "001000xx", groups: ["Q0x'"], showIndex: true, caption: "D1 = Q0x'" }],
    source: "Style: PYP 2018-19 S2 Q4(b)(ii)",
  },
  // 8
  {
    kind: "short",
    subtopic: "Next-state equations",
    difficulty: "medium",
    prompt: "The Tutorial 10 machine below is encoded in binary order: A = 00, B = 01, C = 10, D = 11 (state bits Q1 Q0). Give the minimal SOP for $D_0$ (the next value of Q0) in terms of Q1, Q0 and x.",
    figures: [T10_FSM],
    accept: ["Q1'Q0'x + Q1Q0'x'", "Q1Q0'x' + Q1'Q0'x", "Q0'(Q1 ^ x)"],
    match: "expr",
    vars: ["Q1", "Q0", "x"],
    minimal: true,
    placeholder: "e.g. Q1x' + Q0",
    solution:
      "Encoded transitions (Q1Q0 x → next):\n- A 00: x0 → A 00, x1 → B 01\n- B 01: x0 → A 00, x1 → C 10\n- C 10: x0 → D 11, x1 → C 10\n- D 11: x0 → A 00, x1 → C 10\nQ0⁺ is 1 only for (00, x=1) → B and (10, x=0) → D: minterms 1 and 4 of (Q1, Q0, x). They are not adjacent, so $D_0 = Q_1'Q_0'x + Q_1Q_0'x'$ (equivalently $Q_0'(Q_1 \\oplus x)$).\nCompare: with A = 00, B = 01, C = 11, D = 10 the same machine gives just $D_0 = x$. The encoding matters.",
    solutionFigures: [{ kind: "kmap", vars: ["Q1", "Q0", "x"], values: "01001000", groups: ["Q1'Q0'x", "Q1Q0'x'"], showIndex: true, caption: "D0 = Q1'Q0'x + Q1Q0'x'" }],
    source: "Style: Tutorial 10 Q1(b)",
  },
  // 9
  {
    kind: "mcq",
    subtopic: "Tracing a state diagram",
    difficulty: "medium",
    prompt: "The Moore FSM below detects a particular bit sequence; it starts in A. Determine the output sequence for the inputs 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 (one input per rising clock edge; give the output after each edge).",
    figures: [PYP_Q4_FSM],
    options: [
      "0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0",
      "0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0",
      "0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0",
      "0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0",
      "0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1",
    ],
    answer: 0,
    solution:
      "Follow one arrow per edge and read the output of the state entered:\n- 1: A → A (0); 1: A → A (0)\n- 0: A → B (0); 0: B → C (0); 0: C → **D** (1)\n- 1: D → A (0)\n- 0: A → B (0); 0: B → C (0); 0: C → **D** (1)\n- 1: D → A (0); 1: A → A (0)\nOutput: 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0. The FSM outputs 1 once it has seen three consecutive 0s (and stays in D while more 0s arrive). Option B lists the outputs of the states **before** each edge (one step behind).",
    source: "PYP 2016-17 S1 Q4(c)",
  },
  // 10
  {
    kind: "mcq",
    subtopic: "Moore vs Mealy",
    difficulty: "easy",
    prompt: "The state transition diagram of an FSM with inputs RESET, CLK and T and output Y is shown (RESET forces state A). Is it a Mealy or a Moore FSM?",
    figures: [PYP_T_FSM],
    options: [
      "Moore: Y is written in each state, so it depends only on the current state.",
      "Mealy: the transitions depend on the input T.",
      "Mealy: Y changes as soon as T changes.",
      "Moore: it has a RESET input.",
      "It cannot be decided without the circuit.",
    ],
    answer: 0,
    solution:
      "In a Moore machine the outputs depend only on the state, so they are written in (or beside) the state circles: here A and B have Y = 0, C and D have Y = 1. In a Mealy machine the outputs would have to be written on the arrows after a slash, because they would also depend on the present input.\n- B: every FSM's transitions depend on its inputs; that says nothing about the type.\n- C: here Y only changes when a clock edge moves the state.\n- D: a reset input is irrelevant to the type.",
    source: "PYP 2017-18 S1 Q4(c)(i)",
  },
  // 11
  {
    kind: "short",
    subtopic: "Tracing a state diagram",
    difficulty: "medium",
    prompt: "A 3-bit odd/even up-counter has a 1-bit input In and output Count. When In = 0 it moves to the next even value above the current count, and when In = 1 to the next odd value. It stays at 6 (the maximum even count) when In = 0, and from 7 (the maximum odd count) it goes back to 0 at the next edge whatever In is. Starting from 0, the input sequence 1, 1, 0, 1, 0, 1, 0 is applied. Give Count after each edge as a string of 7 digits.",
    accept: ["1345670", "1,3,4,5,6,7,0", "1, 3, 4, 5, 6, 7, 0"],
    placeholder: "7 digits",
    solution:
      "- 0, In = 1: next odd value above 0 → **1**\n- 1, In = 1: next odd → **3**\n- 3, In = 0: next even → **4**\n- 4, In = 1 → **5**\n- 5, In = 0 → **6**\n- 6, In = 1 → **7**\n- 7: back to **0** (In is ignored)\nCount = 1, 3, 4, 5, 6, 7, 0. In the state diagram each count value is a state with one arrow for In = 0 and one for In = 1; 6 has a self-loop on In = 0, and both arrows out of 7 go to 0.",
    source: "Style: PYP 2017-18 S2 Q4(b)(ii)",
  },
  // 12
  {
    kind: "mcq",
    subtopic: "Moore vs Mealy",
    difficulty: "medium",
    prompt: "The lecture redrew the 3-cycle pulse machine as a Mealy machine (below, Inputs/Outputs: b/x). The machine is in state **off**, and halfway through the clock cycle b changes from 0 to 1. What is x during this cycle?",
    figures: [PULSE3_MEALY],
    options: [
      "x = 0 for the whole cycle, because both arrows leaving off output 0",
      "x = 0, then 1 as soon as b rises, because a Mealy output follows the input",
      "x = 1 for the whole cycle",
      "x is undefined until the next clock edge",
      "x = 1, then 0 when b rises",
    ],
    answer: 0,
    solution:
      "A Mealy output is read from the arrow leaving the current state whose input label matches the present input. In off, b = 0 selects the self-loop 0/0 and b = 1 selects the arrow 1/0 to on1: both give x = 0. So x stays 0 for the whole cycle, even though b changes mid-cycle; the machine only moves to on1 at the next rising edge, and x = 1 then comes from the /1 arrows leaving on1, on2 and on3.\nA Mealy output **can** change mid-state when the inputs change (option B), but only if the arrows for the different input values carry different outputs.",
    source: "Style: Lecture 11 p.36",
  },
  // 13
  {
    kind: "mcq",
    subtopic: "Next-state equations",
    difficulty: "medium",
    prompt: "The state transition diagram below has four states (codes S1S0), one input B and one output X (written as state/X). Using D flip-flops, what is the minimal SOP for $D_1$, the next value of S1?",
    figures: [PYP_B_FSM],
    options: ["$D_1 = B + S_1'S_0$", "$D_1 = B$", "$D_1 = S_1'S_0B'$", "$D_1 = B + S_1S_0'$", "$D_1 = B'(S_1 \\oplus S_0)$"],
    answer: 0,
    solution:
      "State table (S1S0, B → next S1S0):\n- 00: B = 0 → 00, B = 1 → 10\n- 01: B = 0 → 11, B = 1 → 10\n- 10: B = 0 → 01, B = 1 → 10\n- 11: B = 0 → 00, B = 1 → 10\nNext S1 is 1 for every B = 1 row (all go to 10) and for (01, B = 0) → 11. Over (S1, S0, B) that is minterms 1, 3, 5, 7 and 2. The B loop covers 1, 3, 5, 7; minterm 2 (010) pairs with 3 (011) to give $S_1'S_0$. So $D_1 = B + S_1'S_0$.\nOption E is $D_0$ (next S0 is 1 only for (01, B = 0) and (10, B = 0)); option B forgets the 01 → 11 arrow. The output is $X = S_1S_0$.",
    solutionFigures: [{ kind: "kmap", vars: ["S1", "S0", "B"], values: "01110101", groups: ["B", "S1'S0"], showIndex: true, caption: "D1 = B + S1'S0" }],
    source: "Style: PYP 2018-19 S2 Q4(b)(ii)",
  },
  // 14
  {
    kind: "mcq",
    subtopic: "Diagram conventions",
    difficulty: "easy",
    prompt: "In the lecture's door-lock FSM, the only arrow drawn leaving state Wait is labelled s and goes to Start. If s = 0 at a rising clock edge while the FSM is in Wait, what happens?",
    options: ["The FSM moves to Start.", "The output toggles but the state stays.", "The FSM returns to the reset state, whichever that is.", "The next state is undefined, so the FSM may go anywhere.", "The FSM stays in Wait."],
    answer: 4,
    solution:
      "The course convention: input conditions that are not shown on any arrow leaving a state cause a **self-transition**. With s = 0 the arrow to Start is not taken, so the FSM stays in Wait (the lecture later draws this explicitly as an s' self-loop).",
    source: "Style: Lecture 11 p.7, p.22-24",
  },
  // 15
  {
    kind: "mcq",
    subtopic: "Diagram conventions",
    difficulty: "medium",
    prompt: "A state in a door-lock FSM has two arrows leaving it to **different** states. The inputs are a (a button was pressed), r, g and b (which buttons). Which pair of arrow conditions makes the FSM ill-defined?",
    options: ["$a\\,r\\,b'\\,g'$ and $a\\,(r\\,b'\\,g')'$", "$a$ and $a'$", "$a\\,r$ and $a\\,b$", "$a\\,r'$ and $a\\,r$", "$s$ and $s'$"],
    answer: 2,
    solution:
      "The conditions leaving one state must be **mutually exclusive**: no input combination may satisfy both. $a\\,r$ and $a\\,b$ are both true when a = r = b = 1 (two buttons pressed together), so the next state would be undefined. This is exactly why the lecture replaced \"a·r\" by $a\\,r\\,b'\\,g'$.\nEvery other pair is of the form $c$ and $c'$ (or two terms differing in one literal), which can never both be 1.",
    source: "Style: Lecture 11 p.25",
  },
  // 16
  {
    kind: "mcq",
    subtopic: "State minimisation",
    difficulty: "medium",
    prompt: "Which states of this Moore FSM can be merged without changing its behaviour?",
    figures: [
      {
        kind: "table",
        head: ["State", "next (x=0)", "next (x=1)", "z"],
        rows: [
          ["S0", "S1", "S2", 0],
          ["S1", "S3", "S0", 0],
          ["S2", "S4", "S0", 0],
          ["S3", "S3", "S0", 1],
          ["S4", "S4", "S0", 1],
        ],
      },
    ],
    options: ["S3 with S4 only", "S1 with S2 only", "S0 with S1, and S3 with S4", "S1 with S2, and S3 with S4", "No states can be merged"],
    answer: 3,
    solution:
      "States can merge when they have the same output and react identically to every future input (Lecture 11 p.31).\n- S3 and S4: both z = 1; on x = 0 each stays where it is, on x = 1 both go to S0. Whatever inputs follow, they produce the same outputs → **S3 ≡ S4**.\n- S1 and S2: both z = 0; on x = 1 both go to S0, and on x = 0 they go to S3 and S4, which behave identically → **S1 ≡ S2** (just as S2 and S4 merged in the lecture vending machine once the states after them had merged).\n- S0 cannot join S1/S2: on x = 0 it goes to S1 (z = 0) while S1 goes to S3 (z = 1).\nSo the machine needs only 3 states. Option A stops after the obvious pair.",
    source: "Style: Lecture 11 p.31-33",
  },
  // 17
  {
    kind: "short",
    subtopic: "State minimisation",
    difficulty: "hard",
    prompt: "After merging every pair of states that have the same output and react identically to all future inputs, how many states does this Moore FSM need?",
    figures: [
      {
        kind: "table",
        head: ["State", "next (x=0)", "next (x=1)", "z"],
        rows: [
          ["A", "B", "C", 0],
          ["B", "D", "F", 0],
          ["C", "E", "F", 0],
          ["D", "A", "A", 1],
          ["E", "A", "A", 1],
          ["F", "A", "A", 0],
        ],
      },
    ],
    accept: ["4"],
    match: "number",
    solution:
      "- D and E: both z = 1 and both go to A on either input → identical, **D ≡ E**.\n- B and C: both z = 0, both go to F on x = 1, and on x = 0 to D and E, which are now one state → **B ≡ C**.\n- F does not merge: on x = 0 it goes to A (z = 0), whereas B goes to D (z = 1); and compared with A, two 0 inputs give A → B → D (z ends 1) but F → A → B (z ends 0).\n- A does not merge with B: on x = 0, A → B (z = 0) but B → D (z = 1).\nRemaining states {A}, {B, C}, {D, E}, {F}: **4**.",
    source: "Style: Lecture 11 p.31-33",
  },
  // 18
  {
    kind: "mcq",
    subtopic: "Unused states and reset",
    difficulty: "medium",
    prompt: "A 6-state FSM is implemented with binary state encoding. Which statement is correct?",
    options: [
      "There are 2 unused codes; the state register should be reset to a valid state, and the unused codes should not be able to trap the machine.",
      "There are 2 unused codes; since the design never enters them, nothing about them needs to be considered.",
      "There are 3 unused codes, because 6 states need 3 flip-flops and $2^3 - 6 = 3$.",
      "There are no unused codes, because 6 states use all the codes of 3 flip-flops.",
      "There are 10 unused codes, because the machine needs 4 flip-flops.",
    ],
    answer: 0,
    solution:
      "6 states need $\\lceil \\log_2 6 \\rceil = 3$ flip-flops, which have $2^3 = 8$ codes, so $8 - 6 = 2$ codes are unused.\nThe lecture stresses that the register must have a reset to a valid state: at power-up the flip-flops can hold any code, and if the machine starts in an unused code whose transitions were left as don't-cares, it may never reach a valid state (lock-up) or produce wrong outputs. B is the dangerous assumption; C and E are arithmetic slips.",
    source: "Style: Lecture 12 p.17",
  },
  // 19
  {
    kind: "mcq",
    subtopic: "Unused states and reset",
    difficulty: "hard",
    prompt:
      "The FSM of the encoded table below (P = 00, Q = 01, R = 10) was built with the minimal equations $D_1 = Q_0x'$, $D_0 = x$ and $z = Q_1$, obtained by treating code 11 as a don't-care. Because of a glitch on the reset line, the flip-flops power up holding Q1Q0 = 11. What happens?",
    figures: [
      {
        kind: "table",
        head: ["Q1 Q0", "next (x=0)", "next (x=1)", "z"],
        rows: [
          ["00 (P)", "00", "01", 0],
          ["01 (Q)", "10", "01", 0],
          ["10 (R)", "00", "01", 1],
          ["11", "x", "x", "x"],
        ],
      },
    ],
    options: [
      "It stays locked in 11 forever.",
      "It goes to 00 at the next edge, whatever x is.",
      "At the next edge it goes to 10 if x = 0 or to 01 if x = 1; while it is in 11, z = 1.",
      "At the next edge it goes to 01 if x = 0 or to 10 if x = 1; while it is in 11, z = 0.",
      "Its behaviour cannot be predicted, because 11 was a don't-care.",
    ],
    answer: 2,
    solution:
      "The don't-cares were resolved when the equations were chosen, so the hardware behaviour in 11 is fixed by the equations:\n- x = 0: $D_1 = Q_0x' = 1$, $D_0 = 0$ → **10** (R)\n- x = 1: $D_1 = 0$, $D_0 = 1$ → **01** (Q)\nand $z = Q_1 = 1$ while in 11. So the machine recovers after one edge (no lock-up), but it can emit one false z = 1. Always check the unused codes of the final equations.",
    source: "Style: Lecture 12 p.17",
  },
  // 20
  {
    kind: "short",
    subtopic: "Tracing a state diagram",
    difficulty: "medium",
    prompt: "The Tutorial 10 machine (z turns on after two consecutive 1s and off after two consecutive 0s) starts in A. The input sequence 1, 1, 0, 1, 0, 0, 1, 1, 1, 0 is applied. Give z after each of the ten clock edges as a 10-bit string.",
    figures: [T10_FSM],
    accept: ["0111100111", "0,1,1,1,1,0,0,1,1,1", "0, 1, 1, 1, 1, 0, 0, 1, 1, 1"],
    placeholder: "10 bits",
    solution:
      "States after each edge: 1 → B, 1 → **C**, 0 → D, 1 → C, 0 → D, 0 → **A**, 1 → B, 1 → **C**, 1 → C, 0 → D.\nOutputs (C and D give 1): 0 1 1 1 1 0 0 1 1 1 → **0111100111**.\nThe single 0s at edges 3 and 5 do not switch z off; only the pair of 0s at edges 5–6 does.",
    source: "Style: Tutorial 10 Q1(c)",
  },
  // 21
  {
    kind: "open",
    subtopic: "FSM design",
    difficulty: "hard",
    prompt:
      "Design a **Moore** FSM with one input x and one output z, where z = 1 in the cycle after the last three inputs were 1, 0, 1 (for example, the inputs 1, 0, 1, 0, 1 make z = 1 twice).\n(a) Draw the state diagram, stating what each state means. (5 marks)\n(b) Encode the states in binary (S0 = 00, S1 = 01, S2 = 10, S3 = 11) and write the encoded state table. (3 marks)\n(c) Derive minimal SOP next-state equations for D flip-flops. (6 marks)\n(d) Give the output equation. (2 marks)\n(e) Sketch the circuit. (4 marks)",
    modelAnswer:
      "(a) S0: nothing useful seen; S1: last input 1; S2: last inputs 10; S3: 101 seen (z = 1).\n- S0: x=0 → S0, x=1 → S1\n- S1: x=0 → S2, x=1 → S1 (a further 1 is still a fresh start)\n- S2: x=0 → S0, x=1 → S3\n- S3: x=0 → S2 (the final 1 plus 0 is \"10\"), x=1 → S1 (the final 1 can start the next 101)\n(b) Q1Q0 x → Q1⁺Q0⁺: 00 0 → 00, 00 1 → 01, 01 0 → 10, 01 1 → 01, 10 0 → 00, 10 1 → 11, 11 0 → 10, 11 1 → 01. z = 1 only in 11.\n(c) $Q_1^+ = 1$ at minterms 2, 5, 6 → $D_1 = Q_0x' + Q_1Q_0'x$. $Q_0^+ = 1$ at minterms 1, 3, 5, 7 → $D_0 = x$.\n(d) $z = Q_1Q_0$.\n(e) Two D flip-flops on a common clock with reset to 00; $D_0$ wired to x; $D_1$ from an OR of two ANDs ($Q_0x'$ and $Q_1Q_0'x$); z from an AND of $Q_1$ and $Q_0$.",
    modelFigures: [
      DET101_FSM,
      { kind: "kmap", vars: ["Q1", "Q0", "x"], values: "00100110", groups: ["Q0x'", "Q1Q0'x"], showIndex: true, caption: "D1 = Q0x' + Q1Q0'x" },
      {
        kind: "circuit",
        caption: "Implementation with reset omitted.",
        circuit: {
          inputs: ["x", "CLK"],
          gates: [
            { id: "Q1", type: "DFF", in: ["D1", "CLK"] },
            { id: "Q0", type: "DFF", in: ["x", "CLK"] },
            { id: "g1", type: "AND", in: ["Q0", "!x"] },
            { id: "g2", type: "AND", in: ["Q1", "Q0.qn", "x"] },
            { id: "D1", type: "OR", in: ["g1", "g2"] },
            { id: "z", type: "AND", in: ["Q1", "Q0"] },
          ],
          outputs: ["z"],
        },
      },
    ],
    rubric: [
      { point: "Four states with meanings; S0 and S2 arrows correct", marks: 3 },
      { point: "Arrows from S3 (0 → S2, 1 → S1) reuse the final 1, and S1 self-loop on 1", marks: 2 },
      { point: "Encoded state table complete and consistent", marks: 3 },
      { point: "D1 = Q0x' + Q1Q0'x from a correct K-map", marks: 4 },
      { point: "D0 = x", marks: 2 },
      { point: "z = Q1Q0 (no x term: Moore)", marks: 2 },
      { point: "Circuit: two DFFs, common clock, correct gates and feedback", marks: 4 },
    ],
    solution: "See the model answer: the key steps are the arrows out of S3 (the final 1 of one 101 can start the next), then reading $D_1$ and $D_0$ from K-maps of the encoded table.",
    source: "Style: PYP 2018-19 S2 Q4(b) / Lecture 12 p.14",
  },
  // 22
  {
    kind: "open",
    subtopic: "FSM design",
    difficulty: "hard",
    prompt:
      "A special counter never goes below 1 or above 5. Input R = 1 at a clock edge loads 3. Otherwise input U decides the direction: U = 1 counts up, U = 0 counts down. At 5 with U = 1 it stays at 5; at 1 with U = 0 it stays at 1.\n(a) Draw the state transition diagram. (6 marks)\n(b) After R has loaded 3, U = 1, 1, 1, 0, 0, 0, 0, 0 is applied (R = 0). Give the count after each edge. (3 marks)\n(c) How many D flip-flops does a binary implementation need, which codes are unused, and how should they be handled? (3 marks)",
    modelAnswer:
      "(a) Five states 1, 2, 3, 4, 5 (Moore: the count is the output). Inputs R U:\n- 1x from every state → 3 (reset has priority).\n- 01: 1 → 2, 2 → 3, 3 → 4, 4 → 5, 5 → 5 (self-loop).\n- 00: 5 → 4, 4 → 3, 3 → 2, 2 → 1, 1 → 1 (self-loop).\n(b) 4, 5, 5, 4, 3, 2, 1, 1.\n(c) 5 states → $\\lceil\\log_2 5\\rceil = 3$ flip-flops (codes 001–101 can be the counts themselves). Codes 000, 110, 111 are unused. Make R force 011 from every code, and either send the unused codes to a valid state (e.g. 3) in the next-state logic or rely on the reset; do not let them form a loop of their own.",
    modelFigures: [
      {
        kind: "fsm",
        caption: "R U legend; R = 1 (not drawn for clarity) goes to 3 from every state.",
        states: [
          { id: "1", x: 0, y: 0 },
          { id: "2", x: 1, y: 0 },
          { id: "3", x: 2, y: 0 },
          { id: "4", x: 3, y: 0 },
          { id: "5", x: 4, y: 0 },
        ],
        edges: [
          { from: "1", to: "1", label: "00", loop: "top" },
          { from: "1", to: "2", label: "01" },
          { from: "2", to: "1", label: "00" },
          { from: "2", to: "3", label: "01" },
          { from: "3", to: "2", label: "00" },
          { from: "3", to: "4", label: "01" },
          { from: "4", to: "3", label: "00" },
          { from: "4", to: "5", label: "01" },
          { from: "5", to: "4", label: "00" },
          { from: "5", to: "5", label: "01", loop: "top" },
        ],
      },
    ],
    rubric: [
      { point: "Five states with correct up arrows (U = 1) and saturation at 5", marks: 2 },
      { point: "Correct down arrows (U = 0) and saturation at 1", marks: 2 },
      { point: "R = 1 → 3 from every state shown or stated, with priority over U", marks: 2 },
      { point: "Trace 4, 5, 5, 4, 3, 2, 1, 1", marks: 3 },
      { point: "3 flip-flops; three unused codes named", marks: 2 },
      { point: "Sensible handling of unused codes (reset / map to a valid state)", marks: 1 },
    ],
    solution: "See the model answer. Saturation is two self-loops; the reset input is a condition with priority on every state.",
    source: "Style: PYP 2016-17 S1 Q4(b)",
  },
  // 23
  {
    kind: "mcq",
    subtopic: "State encoding",
    difficulty: "easy",
    prompt: "Two students implement the lecture's 3-cycle pulse FSM (off, on1, on2, on3) with D flip-flops. Student 1 encodes off = 00, on1 = 01, on2 = 10, on3 = 11; student 2 encodes off = 00, on1 = 11, on2 = 01, on3 = 10. Which statement is correct?",
    options: [
      "Only student 1's encoding is valid, because the codes must follow binary counting order.",
      "The two circuits have different next-state equations, but they behave identically: the same outputs for the same input sequence.",
      "Student 2's circuit needs three flip-flops.",
      "Student 2's encoding is invalid because off and on2 both have a 0 in the MSB.",
      "Both encodings give exactly the same next-state equations.",
    ],
    answer: 1,
    solution:
      "Any encoding works as long as each state gets a unique code (Lecture 12 p.7), and four states need $\\lceil \\log_2 4 \\rceil = 2$ flip-flops in both cases. Different encodings give different circuits, but the resulting functionality is identical (Lecture 12 p.14).\nFor example, student 1 gets $n_1 = s_1 \\oplus s_0$ (lecture), while student 2's table (00 → 11 on b, 11 → 01, 01 → 10, 10 → 00) gives $n_1 = s_1'(s_0 + b)$. Both still output x = 1 exactly in on1, on2 and on3.",
    source: "Style: Lecture 12 p.7, p.14",
  },
  // 24
  {
    kind: "short",
    subtopic: "Analysing an FSM circuit",
    difficulty: "medium",
    prompt: "The circuit below starts with Q1Q0 = 00. The input x = 1, 1, 0, 1, 1, 1, 0 is applied on seven successive rising edges. Give the output z after each edge as a 7-bit string.",
    figures: [{ kind: "circuit", circuit: C24 }],
    accept: ["0101000", "0,1,0,1,0,0,0", "0, 1, 0, 1, 0, 0, 0"],
    placeholder: "7 bits",
    solution:
      "Equations: $D_1 = Q_0x$, $D_0 = (Q_1x)' = Q_1' + x'$, $z = Q_1Q_0$ (Moore).\n- 00, x=1: D1 = 0, D0 = 1 → 01, z 0\n- 01, x=1: D1 = 1, D0 = 1 → 11, z **1**\n- 11, x=0: D1 = 0, D0 = 1 → 01, z 0\n- 01, x=1: → 11, z **1**\n- 11, x=1: D1 = 1, D0 = 0 → 10, z 0\n- 10, x=1: D1 = 0, D0 = 0 → 00, z 0\n- 00, x=0: D1 = 0, D0 = 1 → 01, z 0\nz = **0101000**.",
    source: "Style: PYP 2021-22 S1 Q1(9)",
  },
  // 25
  {
    kind: "mcq",
    subtopic: "Moore vs Mealy",
    difficulty: "hard",
    prompt: "Is the FSM implemented by this circuit a Moore or a Mealy machine?",
    figures: [{ kind: "circuit", circuit: C25 }],
    options: [
      "Moore, because z is produced by a gate whose inputs include a flip-flop output.",
      "Mealy, because x reaches z through the AND gate without passing through a flip-flop.",
      "Moore, because both flip-flops share the same clock.",
      "Mealy, because it has more than one flip-flop.",
      "Neither: z is a purely combinational function, so the circuit is not an FSM.",
    ],
    answer: 1,
    solution:
      "$z = Q_1x$: the input x is one of the output gate's inputs, so z depends on the present state **and** the present input. That is a Mealy machine: z can change mid-cycle when x changes. A Moore output would be computed from $Q_1, Q_0$ only.\nThe number of flip-flops or the shared clock says nothing about the machine type, and the circuit clearly has state (two flip-flops in the loop).",
    source: "Style: PYP 2017-18 S1 Q4(c)(i)",
  },
  // 26
  {
    kind: "mcq",
    subtopic: "Analysing an FSM circuit",
    difficulty: "medium",
    prompt: "The FSM below uses **T flip-flops**. It is in state Q1Q0 = 10 and x = 1, 1, 0 is applied on three successive rising edges. What is Q1Q0 after each edge?",
    figures: [{ kind: "circuit", circuit: C26 }],
    options: ["11, 01, 00", "01, 11, 10", "10, 10, 11", "11, 00, 01", "11, 10, 01"],
    answer: 3,
    solution:
      "A T flip-flop toggles when T = 1 and holds when T = 0. $T_1 = Q_0x$, $T_0 = x' + Q_1$.\n- 10, x=1: $T_1 = 0$, $T_0 = 0 + 1 = 1$ → Q1 holds 1, Q0 toggles → **11**\n- 11, x=1: $T_1 = 1$, $T_0 = 1$ → both toggle → **00**\n- 00, x=0: $T_1 = 0$, $T_0 = 1$ → Q0 toggles → **01**\nTreating the T inputs as D inputs (loading T instead of toggling) gives wrong answers such as C.",
    source: "Style: Lecture 9 p.33 (T flip-flop) / PYP 2020-21 S2 Q4(a)",
  },
  // 27
  {
    kind: "short",
    subtopic: "State minimisation",
    difficulty: "medium",
    prompt:
      "A Moore vending FSM sells a drink costing 200 cents and accepts only 50-cent and 100-cent coins (one coin per clock cycle at most). It has an idle state, one state for each credit below 200 cents, a state that vends, and a state that vends and returns 50 cents change; the two vending states return to idle. After merging all equivalent states (states with the same credit), how many states does the FSM have?",
    accept: ["6"],
    match: "number",
    solution:
      "States by credit: idle (0), 50, 100, 150 cents, then vend (exactly 200) and vend + change (250, reached only from 150 + 100). However the credit was reached (50+50 or 100), states with equal credit react identically to future coins, so they merge, exactly as S2 and S4 merged in the lecture example.\nTotal: 0, 50, 100, 150, vend, vend+change = **6** states (3 flip-flops).",
    source: "Style: Lecture 11 p.26-33",
  },
  // 28
  {
    kind: "mcq",
    subtopic: "Output equations",
    difficulty: "easy",
    prompt: "The Moore FSM below (z = 1 in S1 and S3) is encoded S0 = 00, S1 = 01, S2 = 11, S3 = 10 (bits Q1 Q0). What is the output equation?",
    figures: [M3_FSM],
    options: ["$z = Q_1$", "$z = Q_0$", "$z = Q_1Q_0$", "$z = Q_1 \\oplus Q_0$", "$z = Q_1 + Q_0$"],
    answer: 3,
    solution:
      "z = 1 for the codes of S1 (01) and S3 (10), and 0 for S0 (00) and S2 (11). That is 1 exactly when the two bits differ: $z = Q_1'Q_0 + Q_1Q_0' = Q_1 \\oplus Q_0$.\nA Moore output equation uses only the state bits; with plain binary order (S1 = 01, S3 = 11) it would have been $z = Q_0$.",
    source: "Style: Lecture 12 p.11",
  },
  // 29
  {
    kind: "mcq",
    subtopic: "FSM from a word description",
    difficulty: "medium",
    prompt:
      "A pedestrian crossing controller FSM has inputs start, stop, pedestrian, vehicle, timeout and outputs green, red:\n- It starts in **idle** (green = 0, red = 0) and moves to idle whenever stop is asserted.\n- idle: if start is asserted, go to **detect_pedestrian** (green = 0, red = 1).\n- detect_pedestrian: if pedestrian is de-asserted, go to **detect_vehicle** (green = 0, red = 1).\n- detect_vehicle: if vehicle is asserted, go to **timer** (green = 1, red = 0); if vehicle is de-asserted, go to detect_pedestrian.\n- timer: if timeout is asserted, go to detect_pedestrian.\nStarting in idle, six rising edges occur with only these inputs asserted (all others 0): (1) start, (2) none, (3) none, (4) vehicle, (5) none, (6) timeout. What are the state and the outputs after edge 6?",
    options: [
      "detect_pedestrian, green = 0, red = 1",
      "detect_vehicle, green = 0, red = 1",
      "timer, green = 1, red = 0",
      "idle, green = 0, red = 0",
      "timer, green = 0, red = 1",
    ],
    answer: 1,
    solution:
      "- Edge 1 (start): idle → detect_pedestrian\n- Edge 2 (none): pedestrian is de-asserted → detect_vehicle\n- Edge 3 (none): vehicle is de-asserted → detect_pedestrian\n- Edge 4 (vehicle): detect_pedestrian only looks at pedestrian, which is de-asserted → detect_vehicle\n- Edge 5 (none): vehicle de-asserted → detect_pedestrian\n- Edge 6 (timeout): timeout only matters in timer; pedestrian is de-asserted → **detect_vehicle**\nThe outputs depend only on the state (Moore): detect_vehicle has green = 0, red = 1.\nOption A comes from treating \"no input\" as \"stay\" in detect_vehicle (then edge 4 would reach timer and edge 6 would leave it); the specification says a de-asserted vehicle sends it back to detect_pedestrian.",
    source: "Style: PYP 2020-21 S2 Q4(b)",
  },
  // 30
  {
    kind: "short",
    subtopic: "FSM from a table",
    difficulty: "medium",
    prompt: "An autonomous vehicle moves between five locations. Its 1-bit input MOVE chooses the next location at each clock edge according to the table, and it starts at SCSE. Give the MOVE sequence (as a string of bits) for which the vehicle visits every other location exactly once and then returns to SCSE.",
    figures: [
      {
        kind: "table",
        head: ["Current location", "MOVE = 0", "MOVE = 1"],
        rows: [
          ["SCSE", "Student Gym", "Innovation Center"],
          ["Student Gym", "SCSE", "Auditorium"],
          ["Auditorium", "Auditorium", "Library"],
          ["Innovation Center", "SCSE", "Library"],
          ["Library", "Innovation Center", "Auditorium"],
        ],
      },
    ],
    accept: ["01100", "0,1,1,0,0", "0, 1, 1, 0, 0"],
    placeholder: "e.g. 10110",
    solution:
      "Draw the FSM (one state per location, two arrows per table row) and search from SCSE:\n- Starting with 1 goes to Innovation Center, then (1) Library, then (1) Auditorium; from Auditorium the only exits are Auditorium (0) and Library (1), so the Student Gym can never be reached. Dead end.\n- Starting with 0: SCSE → Student Gym (0) → Auditorium (1) → Library (1) → Innovation Center (0) → SCSE (0).\nMOVE = **0, 1, 1, 0, 0**.",
    source: "PYP 2016-17 S2 Q4(a)(ii)",
  },
  // 31
  {
    kind: "mcq",
    subtopic: "Diagram conventions",
    difficulty: "easy",
    prompt: "A 3-bit up/down counter FSM uses the legend \"Inputs: en, dn\". It counts up on 10, counts down on 11 and holds otherwise. It is in state 101 and the inputs at the next rising edge are en = 1, dn = 1. What is the next state?",
    options: ["100", "110", "101", "011", "000"],
    answer: 0,
    solution: "The legend order is en then dn, so the label 11 means en = 1, dn = 1: count **down**. 101 (5) → **100** (4). 110 would be counting up; holding (101) needs en = 0.",
    source: "Style: Lecture 11 p.9",
  },
  // 32
  {
    kind: "open",
    subtopic: "Analysing an FSM circuit",
    difficulty: "hard",
    prompt:
      "Analyse the sequential circuit below (state AB, input x, output z).\n(a) Write the next-state equations and the output equation. (3 marks)\n(b) Write the state table. (4 marks)\n(c) Draw the state diagram. (4 marks)\n(d) Is it a Moore or a Mealy machine? Justify. (2 marks)\n(e) Starting from AB = 00, give the state and output for x = 1, 0, 1, 1, 0, 0. (3 marks)",
    figures: [{ kind: "circuit", circuit: C32 }],
    modelAnswer:
      "(a) $D_A = B \\oplus x$, $D_B = A'x$, $z = AB'x'$.\n(b) AB, x → next / z:\n- 00: x=0 → 00 / 0, x=1 → 11 / 0\n- 01: x=0 → 10 / 0, x=1 → 01 / 0\n- 10: x=0 → 00 / **1**, x=1 → 10 / 0\n- 11: x=0 → 10 / 0, x=1 → 00 / 0\n(c) Four states; arrows labelled x/z as in the table (see figure).\n(d) Mealy: z depends on x directly through the 3-input AND gate (it is 1 only in state 10 while x = 0).\n(e) 00 →(1/0) 11 →(0/0) 10 →(1/0) 10 →(1/0) 10 →(0/**1**) 00 →(0/0) 00. Outputs 0, 0, 0, 0, 1, 0.",
    modelFigures: [
      {
        kind: "fsm",
        initial: "00",
        states: [
          { id: "00", x: 0, y: 0 },
          { id: "01", x: 2, y: 0 },
          { id: "10", x: 0, y: 1 },
          { id: "11", x: 2, y: 1 },
        ],
        edges: [
          { from: "00", to: "00", label: "0/0", loop: "top" },
          { from: "00", to: "11", label: "1/0" },
          { from: "01", to: "10", label: "0/0" },
          { from: "01", to: "01", label: "1/0", loop: "right" },
          { from: "10", to: "00", label: "0/1" },
          { from: "10", to: "10", label: "1/0", loop: "left" },
          { from: "11", to: "10", label: "0/0" },
          { from: "11", to: "00", label: "1/0" },
        ],
      },
    ],
    rubric: [
      { point: "Correct D_A, D_B and z expressions", marks: 3 },
      { point: "State table: all 8 next-state entries correct", marks: 3 },
      { point: "State table: outputs correct (only 10 with x = 0 gives 1)", marks: 1 },
      { point: "State diagram consistent with the table, outputs on arrows", marks: 4 },
      { point: "Mealy, because z has x as a direct input", marks: 2 },
      { point: "Trace states 11, 10, 10, 10, 00, 00 and outputs 0, 0, 0, 0, 1, 0", marks: 3 },
    ],
    solution: "See the model answer. The output gate reads x, so this is Mealy and outputs go on the arrows.",
    source: "Style: PYP 2021-22 S1 Q1(9) / PYP 2018-19 S2 Q4(b)",
  },
];
