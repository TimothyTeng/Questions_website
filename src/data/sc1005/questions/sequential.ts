import type { Draft } from "@/lib/sc1005/types";

const T20 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
const T16 = T20.slice(0, 16);

export const sequentialQuestions: Draft[] = [
  // ---------------------------------------------------------------- latches
  {
    kind: "mcq",
    subtopic: "Latches vs flip-flops",
    difficulty: "easy",
    prompt: "Which statement correctly describes the difference between a latch and a flip-flop (using the course convention)?",
    options: [
      "A latch changes its output only at a clock edge; a flip-flop is transparent while its clock is high",
      "A latch is level-sensitive (its output can change whenever it is enabled); a flip-flop changes its output only at an active clock edge",
      "A latch has two outputs ($Q$ and $\\overline{Q}$) while a flip-flop has only one",
      "A latch is built from flip-flops, so it is always slower",
      "There is no difference; the two names mean the same circuit",
    ],
    answer: 1,
    solution:
      "In this course **latch** means level-sensitive: while its enable is high the output can change (a D latch is transparent). A **flip-flop** is edge-triggered: it changes its output only at the control signal's edge (rising, unless stated otherwise) and holds the result until the next edge.\n- A reverses the two definitions.\n- The lecture symbols show $Q$ and $\\overline{Q}$ on both latches and flip-flops.\n- It is the other way round: an edge-triggered flip-flop is built from two latches (master–slave).\n- Some older references do not follow this convention, which is why the lecture fixes it.",
    source: "Lecture 09 p.31–32",
  },
  {
    kind: "mcq",
    subtopic: "SR latch",
    difficulty: "easy",
    prompt: "An SR latch is built from two cross-coupled NOR gates. While $S = 1$ and $R = 1$, what are the outputs?",
    options: ["$Q = 1$, $\\overline{Q} = 0$", "$Q = 0$, $\\overline{Q} = 1$", "$Q = 0$, $\\overline{Q} = 0$", "$Q = 1$, $\\overline{Q} = 1$", "The outputs keep their previous values"],
    answer: 2,
    solution:
      "A NOR gate outputs 0 whenever any input is 1. With $S = 1$ the $\\overline{Q}$ gate outputs 0, and with $R = 1$ the $Q$ gate outputs 0. So $Q = \\overline{Q} = 0$: the outputs are no longer complements, which is why the $S = R = 1$ row is marked '?'. Worse, if both inputs are then de-asserted at the same time, the output may oscillate, and which state it finally settles in is impossible to know.",
    source: "Lecture 09 p.8",
  },
  {
    kind: "mcq",
    subtopic: "SR latch",
    difficulty: "medium",
    prompt:
      "An SR latch is built from two cross-coupled **NAND** gates, with active-low inputs $\\overline{S}$ and $\\overline{R}$. It currently stores $Q = 0$. Which input pair sets it to $Q = 1$, and which input pair is forbidden?",
    options: [
      "Set: $\\overline{S}\\,\\overline{R} = 10$; forbidden: $11$",
      "Set: $\\overline{S}\\,\\overline{R} = 01$; forbidden: $00$",
      "Set: $\\overline{S}\\,\\overline{R} = 01$; forbidden: $11$",
      "Set: $\\overline{S}\\,\\overline{R} = 11$; forbidden: $00$",
      "Set: $\\overline{S}\\,\\overline{R} = 10$; forbidden: $00$",
    ],
    answer: 1,
    solution:
      "For the NAND latch $Q = \\overline{\\overline{S}\\cdot\\overline{Q}}$ and $\\overline{Q} = \\overline{\\overline{R}\\cdot Q}$. A 0 on a NAND input forces its output to 1, so the inputs are **active-low**:\n- $\\overline{S} = 0, \\overline{R} = 1$ (i.e. $01$): the $Q$ gate outputs 1, **set**.\n- $\\overline{S} = 1, \\overline{R} = 0$: reset. $11$: store (no input asserted).\n- $\\overline{S} = \\overline{R} = 0$: both inputs asserted at once, the active-low version of $S = R = 1$: **forbidden**.\nOptions with 'forbidden 11' treat the inputs as active-high (that is the NOR latch rule).",
    source: "Style: Lecture 09 p.16",
  },
  {
    kind: "short",
    subtopic: "Enabled SR latch",
    difficulty: "medium",
    prompt:
      "An enabled (gated) SR latch starts with $Q = 0$. The inputs $(E, S, R)$ are applied one after another:\n$(1,1,0)$, $(0,0,1)$, $(1,0,0)$, $(1,0,1)$, $(0,1,0)$, $(1,1,0)$.\nType the value of $Q$ after each step as a 6-bit string (first step first), e.g. `101010`.",
    accept: ["111001", "1 1 1 0 0 1", "1,1,1,0,0,1", "1, 1, 1, 0, 0, 1"],
    match: "text",
    placeholder: "6 bits",
    solution:
      "With $E = 0$ the latch ignores S and R and stores; with $E = 1$ it behaves as an SR latch.\n- $(1,1,0)$: enabled, set → 1.\n- $(0,0,1)$: disabled, R is ignored → 1.\n- $(1,0,0)$: enabled, store → 1.\n- $(1,0,1)$: enabled, reset → 0.\n- $(0,1,0)$: disabled, S ignored → 0.\n- $(1,1,0)$: enabled, set → 1.\nAnswer `111001`. The common mistake is to apply the reset in step 2 or the set in step 5 even though $E = 0$.",
    source: "Style: Lecture 09 p.12",
  },
  // ---------------------------------------------------------------- latch vs FF timing
  {
    kind: "mcq",
    subtopic: "D latch vs D flip-flop",
    difficulty: "medium",
    prompt:
      "The waveforms below drive a positive-level D latch (enable = CLK) and a positive-edge D flip-flop (clock = CLK); both have D as shown. Each column is one time unit and delays are negligible. What are the latch output $Q_L$ and flip-flop output $Q_F$ during time unit 15?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "0011001100110011" },
          { name: "D", wave: "1001110010010110" },
        ],
        ticks: T16,
      },
    ],
    options: ["$Q_L = 0$, $Q_F = 0$", "$Q_L = 0$, $Q_F = 1$", "$Q_L = 1$, $Q_F = 0$", "$Q_L = 1$, $Q_F = 1$", "$Q_L$ is undefined because D changes while CLK = 1"],
    answer: 1,
    solution:
      "CLK is high during units 14–15, so the latch is **transparent** and $Q_L$ follows D: D falls to 0 in unit 15, so $Q_L = 0$.\nThe flip-flop changed only at the rising edge at the start of unit 14, where it captured D from just before the edge (unit 13: D = 1). It holds that value until the next rising edge, so $Q_F = 1$.\nA latch is not undefined when D changes during the enable; it simply follows D.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "0011001100110011" },
          { name: "D", wave: "1001110010010110" },
          { name: "Q latch", wave: "xx01110000011110" },
          { name: "Q FF", wave: "xx00001111000011" },
        ],
        ticks: T16,
        marks: [2, 6, 10, 14],
      },
    ],
    source: "Style: PYP 2017-18 S2 Q4(a)",
  },
  {
    kind: "short",
    subtopic: "D flip-flop timing",
    difficulty: "medium",
    prompt:
      "A **negative-edge** triggered D flip-flop has the CLK and D inputs below and its output is $Q = 0$ at time 0. How many times does $Q$ change over the whole diagram?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "0110011001100110011001" },
          { name: "D", wave: "0011100101100011010100" },
        ],
      },
    ],
    accept: ["4"],
    match: "number",
    solution:
      "The falling edges of CLK are at the start of units 3, 7, 11, 15 and 19. At each one, Q takes D from just before the edge (units 2, 6, 10, 14, 18): D = 1, 0, 1, 1, 0.\nSo Q goes 0 → **1** → **0** → **1** → 1 → **0**: four changes.\n(If you used the rising edges at units 1, 5, 9, 13, 17, 21 you would take D = 0, 1, 0, 0, 0, 0 and count only 2 changes: always check which edge is active.)",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "0110011001100110011001" },
          { name: "D", wave: "0011100101100011010100" },
          { name: "Q", wave: "0001111000011111111000" },
        ],
        marks: [3, 7, 11, 15, 19],
      },
    ],
    source: "Style: Lecture 09 p.30–31",
  },
  {
    kind: "open",
    subtopic: "Timing diagrams (latches and flip-flops)",
    difficulty: "hard",
    prompt:
      "The clk input in the timing diagram is connected to the enable/clock input of each of the following, and all outputs are initially unknown:\n- an SR latch (no enable): S = in1, R = in2;\n- an enabled SR latch: S = in1, R = in2, E = clk;\n- an enabled D latch: D = in1, E = clk;\n- a positive-edge JK flip-flop: J = in1, K = in2;\n- a positive-edge D flip-flop: D = in1.\nComplete the timing diagram showing the five outputs for units 0 to 19. Indicate any undefined output by shading.",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "00110011001100110011" },
          { name: "in1", wave: "01100011011101100001" },
          { name: "in2", wave: "00001001110001100110" },
        ],
        ticks: T20,
      },
    ],
    modelAnswer:
      "Rising clk edges are at units 2, 6, 10, 14, 18; the flip-flops sample in1/in2 in units 1, 5, 9, 13, 17.\n- **SR latch** (always listening): set at 1; reset at 4; set at 6; $S = R = 1$ at 7 → undefined; reset at 8 (only R high); $S = R = 1$ at 9 → undefined; set at 10 (holding through 12); $S = R = 1$ at 13–14 and both released together at 15 → undefined until R resets it at 17; set at 19.\n- **Enabled SR latch** (listens in units 2, 3, 6, 7, 10, 11, 14, 15, 18, 19): set at 2; still 1 through 6; $S = R = 1$ at 7 → undefined until the set at 10; holds 1 through 13 (the $S = R = 1$ at 13 is ignored because clk = 0); $S = R = 1$ at 14 → undefined; reset at 18; set at 19.\n- **D latch**: transparent while clk = 1, so $Q$ = in1 in units 2–3, 6–7, 10–11, 14–15, 18–19, holding in between.\n- **JK flip-flop**: edges sample $(J,K)$ = (1,0) set, (0,0) hold, (1,1) toggle 1→0, (1,1) toggle 0→1, (0,1) reset.\n- **D flip-flop**: samples in1 = 1, 0, 1, 1, 0.",
    modelFigures: [
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "00110011001100110011" },
          { name: "in1", wave: "01100011011101100001" },
          { name: "in2", wave: "00001001110001100110" },
          { name: "SR latch", wave: "x111001x0x111xxxx001" },
          { name: "En SR", wave: "xx11111xxx1111xxxx01" },
          { name: "D latch", wave: "xx100011111111100001" },
          { name: "JK FF", wave: "xx111111110000111100" },
          { name: "D FF", wave: "xx111100001111111100" },
        ],
        ticks: T20,
        marks: [2, 6, 10, 14, 18],
      },
    ],
    rubric: [
      { point: "SR latch: correct set/reset changes and the undefined regions (S = R = 1, and after both are released together)", marks: 2 },
      { point: "Enabled SR latch: responds only while clk = 1, ignores S = R = 1 at unit 13, undefined at 7–9 and 14–17", marks: 2 },
      { point: "D latch: transparent while clk = 1, holds while clk = 0", marks: 2 },
      { point: "JK flip-flop: changes only at rising edges; hold at edge 6, toggles at edges 10 and 14, reset at 18", marks: 2 },
      { point: "D flip-flop: changes only at rising edges using in1 just before each edge", marks: 1 },
      { point: "All outputs shaded as unknown before their first defined value", marks: 1 },
    ],
    solution: "Work column by column: mark the rising edges, then for each element ask whether it is listening and to what. The shaded regions come from S = R = 1 (while listening), from releasing S = R = 1 to 00 together, and from the unknown initial state.",
    source: "Style: Tut 8 Q2",
  },
  // ---------------------------------------------------------------- JK / T flip-flops, timing, registers
  {
    kind: "mcq",
    subtopic: "JK flip-flop",
    difficulty: "medium",
    prompt: "A J-K flip-flop currently holds $Q = 1$. Which J and K inputs guarantee $Q = 0$ after the next active clock edge?",
    options: ["$J = 0, K = 0$", "$J = 0, K = 1$", "$J = 1, K = 0$", "$J = 1, K = 1$", "There are multiple correct answers"],
    answer: 4,
    solution:
      "From the JK table: $J = 0, K = 1$ resets ($Q^+ = 0$), and $J = K = 1$ toggles, so from $Q = 1$ it also gives $Q^+ = 0$. Both B and D work, so the answer is E.\n$J = K = 0$ holds 1 and $J = 1, K = 0$ sets 1.",
    source: "Style: PYP 2021-22 S1 Q1(7)",
  },
  {
    kind: "short",
    subtopic: "T flip-flop",
    difficulty: "medium",
    prompt:
      "In the synchronous circuit below, the T flip-flop has $T = 1$ (its output Q toggles at each rising edge of clk), and $Y$ is the XNOR of Q and clk. At the start clk = 0 and Y = 1. Treat each half clock cycle as one time unit (clk = 0, 1, 0, 1, 0, 1, 0, 1) and ignore gate delays. Type Y for the 8 units as an 8-bit string.",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["1", "clk"],
          gates: [
            { id: "Q", type: "TFF", in: ["1", "clk"] },
            { id: "Y", type: "XNOR", in: ["Q", "clk"] },
          ],
          outputs: ["Y"],
        },
      },
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "01010101" },
          { name: "Y", wave: "1xxxxxxx" },
        ],
      },
    ],
    accept: ["11001100", "1 1 0 0 1 1 0 0", "1,1,0,0,1,1,0,0", "1, 1, 0, 0, 1, 1, 0, 0"],
    match: "text",
    placeholder: "8 bits",
    solution:
      "At the start clk = 0 and Y = 1, and XNOR gives 1 only when its inputs are equal, so Q = 0.\nQ toggles at each rising edge of clk (units 1, 3, 5, 7): Q = 0, 1, 1, 0, 0, 1, 1, 0.\nY = XNOR(Q, clk) unit by unit: (0,0) → 1, (1,1) → 1, (1,0) → 0, (0,1) → 0, then the pattern repeats.\nY = **11001100**.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "01010101" },
          { name: "Q", wave: "01100110" },
          { name: "Y", wave: "11001100" },
        ],
        marks: [1, 3, 5, 7],
      },
    ],
    source: "PYP 2020-21 S2 Q4(a)(ii)",
  },
  {
    kind: "mcq",
    subtopic: "JK flip-flop",
    difficulty: "medium",
    prompt: "A J-K flip-flop starts at $Q = 0$. Before six successive rising clock edges, $(J, K) = (1,0), (1,1), (0,0), (1,1), (0,1), (1,1)$. What is Q after each edge?",
    options: [
      "1, 0, 0, 1, 0, 1",
      "1, 1, 1, 1, 0, 0",
      "1, 0, 1, 0, 0, 1",
      "0, 1, 1, 0, 1, 0",
      "Undefined from the second edge, because J = K = 1 is not allowed",
    ],
    answer: 0,
    solution:
      "Use the JK table at each edge: $(1,0)$ set → 1; $(1,1)$ toggle → 0; $(0,0)$ hold → 0; $(1,1)$ toggle → 1; $(0,1)$ reset → 0; $(1,1)$ toggle → 1.\n- B treats $J = K = 1$ as hold.\n- C treats $J = K = 0$ as toggle.\n- D swaps the roles of J and K.\n- E applies the SR-latch rule: for a JK flip-flop, $J = K = 1$ is allowed and toggles.",
    source: "Style: Lecture 09 p.33",
  },
  {
    kind: "mcq",
    subtopic: "Active-low latches",
    difficulty: "easy",
    prompt: "An **active-low** transparent D latch has the enable input $\\overline{E}$. Which description of its behaviour is correct?",
    options: [
      "While $\\overline{E} = 1$, Q follows D; while $\\overline{E} = 0$, Q holds",
      "While $\\overline{E} = 0$, Q follows D; while $\\overline{E} = 1$, Q holds",
      "Q takes the value of D only at the falling edge of $\\overline{E}$",
      "Q always shows $\\overline{D}$",
      "It is made from the normal D latch by swapping its NAND gates for NOR gates",
    ],
    answer: 1,
    solution:
      "Active-low means the enable is asserted when it is 0. The lecture table for the active-low transparent latch: $\\overline{E} = 1$: store ($Q^+ = Q$); $\\overline{E} = 0$, D = 0: $Q^+ = 0$; $\\overline{E} = 0$, D = 1: $Q^+ = 1$ (transparent).\n- A is the active-high latch.\n- C describes an edge-triggered flip-flop, not a latch.\n- E is backwards: the active-low versions swap the NOR for NAND (and the OR for AND).",
    source: "Lecture 09 p.16",
  },
  {
    kind: "mcq",
    subtopic: "Master–slave flip-flop",
    difficulty: "medium",
    prompt:
      "A flip-flop is built from two D latches in series. The first (master) latch is transparent while CLK = 1, and the second (slave) latch is transparent while CLK = 0. When can the output Q change?",
    options: [
      "Only on the rising edge of CLK",
      "Only on the falling edge of CLK",
      "Whenever CLK = 1",
      "Whenever CLK = 0",
      "On both edges of CLK",
    ],
    answer: 1,
    solution:
      "While CLK = 1 the master follows D but the slave is closed, so Q cannot change. When CLK falls, the master closes (freezing the last D) and the slave opens, copying that frozen value to Q. While CLK = 0 the master is closed, so Q stays constant. Hence Q changes only at the **falling** edge: a negative-edge triggered flip-flop.\nThis matches the lecture: for a negative-edge triggered setup, the master responds to high enable and the slave to low enable. The positive-edge design uses the opposite enables.",
    source: "Style: Lecture 09 p.27",
  },
  {
    kind: "mcq",
    subtopic: "Why flip-flops",
    difficulty: "medium",
    prompt:
      "Four transparent D latches are connected in a chain ($Q_1 \\to D_2$, $Q_2 \\to D_3$, $Q_3 \\to D_4$) and all their enables are driven by the same clock. Each latch has a D-to-Q delay of 2 ns, and the clock is high for 7 ns per cycle. A new value is applied to $D_1$ just as the clock goes high. What happens?",
    options: [
      "It reaches $Q_1$ only; each latch passes data on once per clock cycle",
      "It passes through three latches during this single high phase, so the chain does not behave like a 4-stage shift register",
      "It reaches $Q_4$ only after four clock cycles",
      "Nothing happens until the clock falls",
      "The chain oscillates because the latches feed each other",
    ],
    answer: 1,
    solution:
      "While the clock is high every latch is transparent, so the new value ripples straight through: it reaches $Q_1$ after 2 ns, $Q_2$ after 4 ns, $Q_3$ after 6 ns, and would need 8 ns for $Q_4$, but the high phase ends at 7 ns. So it gets through three latches in one cycle. How far data travels depends on the clock's high time, which is exactly the problem edge-triggered flip-flops solve: with flip-flops, data moves exactly one stage per clock edge (option C would then be the correct behaviour).",
    source: "Style: Lecture 09 p.24–26",
  },
  // ---------------------------------------------------------------- timing parameters
  {
    kind: "mcq",
    subtopic: "Clock period and frequency",
    difficulty: "easy",
    prompt: "A clock has a period of 1.6 ns. What is its frequency?",
    options: ["1.6 GHz", "625 MHz", "62.5 MHz", "160 MHz", "6.25 GHz"],
    answer: 1,
    solution: "$f = 1/T = 1/(1.6 \\times 10^{-9}\\text{ s}) = 6.25 \\times 10^{8}$ Hz $= 625$ MHz.\nLecture anchors: 1 ns ↔ 1 GHz, 10 ns ↔ 100 MHz; a period a bit longer than 1 ns is a frequency a bit below 1 GHz.",
    source: "Style: Lecture 09 p.22",
  },
  {
    kind: "short",
    subtopic: "Propagation delay",
    difficulty: "medium",
    prompt:
      "In the circuit below, a NOT gate has a delay of 2 ns, an AND gate 4 ns and an OR gate 3 ns. If you report a single propagation delay for the circuit (inputs a, b, c to output f), what is it in ns?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["a", "b", "c"],
          gates: [
            { id: "N1", type: "NOT", in: ["a"] },
            { id: "G1", type: "AND", in: ["N1", "b"] },
            { id: "N2", type: "NOT", in: ["c"] },
            { id: "f", type: "OR", in: ["G1", "N2"] },
          ],
          outputs: ["f"],
        },
      },
    ],
    accept: ["9"],
    match: "number",
    placeholder: "ns",
    solution:
      "Sum the gate delays along each input-to-output path:\n- $a \\to f$: NOT + AND + OR $= 2 + 4 + 3 = 9$ ns.\n- $b \\to f$: AND + OR $= 4 + 3 = 7$ ns.\n- $c \\to f$: NOT + OR $= 2 + 3 = 5$ ns.\nIf we report a single number, we always use the worst (longest) path: **9 ns**.",
    source: "Style: Lecture 09 p.19–20",
  },
  {
    kind: "mcq",
    subtopic: "Propagation delay",
    difficulty: "hard",
    prompt:
      "In the circuit below, each NOT gate has a delay of 2 ns and the AND gate a delay of 3 ns. With enable = 1 the output Op oscillates. What is the oscillation frequency of Op?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["enable"],
          gates: [
            { id: "G", type: "AND", in: ["enable", "Op"] },
            { id: "N1", type: "NOT", in: ["G"] },
            { id: "N2", type: "NOT", in: ["N1"] },
            { id: "Op", type: "NOT", in: ["N2"] },
          ],
          outputs: ["Op"],
        },
      },
    ],
    options: ["About 55.6 MHz", "About 111 MHz", "About 83.3 MHz", "18 MHz", "Op does not oscillate; it settles at 1"],
    answer: 0,
    solution:
      "With enable = 1 the AND gate passes Op round the loop, and the loop contains three inverters, so each trip round the loop inverts Op.\n- One trip takes $3 \\times 2 + 3 = 9$ ns, so Op changes every 9 ns.\n- One full period (0 → 1 → 0) takes two changes: $T = 18$ ns.\n- $f = 1/T = 1/(18 \\times 10^{-9}\\text{ s}) \\approx 55.6$ MHz.\n111 MHz uses only one trip (9 ns) as the period; 83.3 MHz forgets the AND gate delay; with enable = 0 the output would settle at 1.",
    source: "Style: PYP 2016-17 S1 Q3(a)",
  },
  {
    kind: "mcq",
    subtopic: "Registers",
    difficulty: "medium",
    prompt:
      "Four 3-bit registers are connected in a chain on the same clock (y → q1 → q2 → q3 → q4), as in the lecture. Their initial contents are unknown. The input y has the values 5, 2, 7, 1, 6, 3 just before rising edges 1 to 6. What does q4 hold just after edge 5?",
    options: ["2", "6", "7", "5", "Still unknown"],
    answer: 0,
    solution:
      "At each edge every register takes the value its left neighbour had just before the edge, so after edge $k$: q1 = $y_k$, q2 = $y_{k-1}$, q3 = $y_{k-2}$, q4 = $y_{k-3}$ (unknown until edge 4).\nAfter edge 5: q4 = $y_2$ = **2** (q1 = 6, q2 = 1, q3 = 7).\n6 is q1, 7 is q3; 5 would be one stage too many; q4 stops being unknown at edge 4.",
    source: "Style: Lecture 09 p.39",
  },
  // ---------------------------------------------------------------- flip-flop chains (PYP Q1(8) style)
  {
    kind: "mcq",
    subtopic: "Next state of a flip-flop circuit",
    difficulty: "hard",
    prompt: "All four D flip-flops share the clock. If the current state is $Q_3Q_2Q_1Q_0 = 0110$, what is the next state?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["CLK"],
          gates: [
            { id: "Q3", type: "DFF", in: ["Q0.qn", "CLK"] },
            { id: "Q2", type: "DFF", in: ["Q3", "CLK"] },
            { id: "Q1", type: "DFF", in: ["Q2.qn", "CLK"] },
            { id: "Q0", type: "DFF", in: ["Q1", "CLK"] },
          ],
          outputs: ["Q3", "Q2", "Q1", "Q0"],
        },
      },
    ],
    options: ["1001", "0011", "1100", "1011", "None of the above"],
    answer: 0,
    solution:
      "Read each D input from the wiring, using the **present** state $Q_3Q_2Q_1Q_0 = 0110$ (all flip-flops update together):\n- $D_3 = \\overline{Q_0} = \\overline{0} = 1$\n- $D_2 = Q_3 = 0$\n- $D_1 = \\overline{Q_2} = \\overline{1} = 0$\n- $D_0 = Q_1 = 1$\nNext state $= 1001$.\n0011 is what you get if you miss the two $\\overline{Q}$ connections (a plain right shift with $Q_0$ fed back); 1100 is a left shift of 0110.",
    source: "Style: PYP 2021-22 S1 Q1(8)",
  },
  {
    kind: "short",
    subtopic: "Next state of a flip-flop circuit",
    difficulty: "hard",
    prompt: "The three D flip-flops below share a clock, and $D_2 = Q_1 \\oplus Q_0$. Starting from $Q_2Q_1Q_0 = 001$, what is the state after **4** clock edges? Type $Q_2Q_1Q_0$.",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["CLK"],
          gates: [
            { id: "X", type: "XOR", in: ["Q1", "Q0"] },
            { id: "Q2", type: "DFF", in: ["X", "CLK"] },
            { id: "Q1", type: "DFF", in: ["Q2", "CLK"] },
            { id: "Q0", type: "DFF", in: ["Q1", "CLK"] },
          ],
          outputs: ["Q2", "Q1", "Q0"],
        },
      },
    ],
    accept: ["110"],
    match: "text",
    placeholder: "Q2Q1Q0",
    solution:
      "Next state: $Q_2^+ = Q_1 \\oplus Q_0$, $Q_1^+ = Q_2$, $Q_0^+ = Q_1$.\n- 001 → ($0 \\oplus 1 = 1$, 0, 0) = 100\n- 100 → ($0 \\oplus 0 = 0$, 1, 0) = 010\n- 010 → ($1 \\oplus 0 = 1$, 0, 1) = 101\n- 101 → ($0 \\oplus 1 = 1$, 1, 0) = 110\nAfter 4 edges: **110**.",
    source: "Style: PYP 2021-22 S1 Q1(8)",
  },
  // ---------------------------------------------------------------- flip-flop chains, registers, FIFO
  {
    kind: "short",
    subtopic: "Next state of a flip-flop circuit",
    difficulty: "medium",
    prompt: "The 4-bit circuit below starts at $Q_3Q_2Q_1Q_0 = 0000$. What is $Q_3Q_2Q_1Q_0$ after **6** clock edges?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["CLK"],
          gates: [
            { id: "Q3", type: "DFF", in: ["Q0.qn", "CLK"] },
            { id: "Q2", type: "DFF", in: ["Q3", "CLK"] },
            { id: "Q1", type: "DFF", in: ["Q2", "CLK"] },
            { id: "Q0", type: "DFF", in: ["Q1", "CLK"] },
          ],
          outputs: ["Q3", "Q2", "Q1", "Q0"],
        },
      },
    ],
    accept: ["0011"],
    match: "text",
    placeholder: "Q3Q2Q1Q0",
    solution:
      "Read the wiring: $D_3 = \\overline{Q_0}$, $D_2 = Q_3$, $D_1 = Q_2$, $D_0 = Q_1$. So at each edge the bits move one place right ($Q_3 \\to Q_2 \\to Q_1 \\to Q_0$) and $\\overline{Q_0}$ (from the present state) enters $Q_3$.\n0000 → 1000 → 1100 → 1110 → 1111 → 0111 → **0011** (6 edges).",
    source: "Style: PYP 2021-22 S1 Q1(8)",
  },
  {
    kind: "mcq",
    subtopic: "Flip-flop symbols",
    difficulty: "easy",
    prompt: "Using the course convention, how can you tell from its schematic symbol that a component is **edge-triggered** (a flip-flop rather than a latch)?",
    options: [
      "It has a small triangle on its control (clock) input",
      "It has both a Q and a $\\overline{Q}$ output",
      "Its inputs are labelled S and R",
      "It has a bubble on its Q output",
      "Its enable input is labelled E",
    ],
    answer: 0,
    solution:
      "The lecture's rule: the symbol for an edge-triggered component always has a small triangle on the control input. The latch symbols (SR latch, D latch) have no triangle.\n- Latches and flip-flops are both drawn with Q and $\\overline{Q}$.\n- S and R appear on SR latches (and the lesser seen SR flip-flop), so the labels do not decide it.",
    source: "Lecture 09 p.32",
  },
  {
    kind: "mcq",
    subtopic: "Serial-in parallel-out",
    difficulty: "easy",
    prompt: "An 8-bit serial-in parallel-out (SIPO) shift register is clocked at 50 MHz and shifts one bit per clock edge. Starting empty, how long does it take before a complete byte is available on the parallel outputs?",
    options: ["20 ns", "80 ns", "160 ns", "400 ns", "8 ns"],
    answer: 2,
    solution: "One bit enters per edge, so 8 edges are needed. At 50 MHz the period is $1/50\\text{ MHz} = 20$ ns, so $8 \\times 20 = 160$ ns.",
    source: "Style: Lecture 10 p.36–40",
  },
  {
    kind: "short",
    subtopic: "FIFO with inversion",
    difficulty: "hard",
    prompt:
      "Four 4-bit registers form a FIFO: IN → R1 → R2 → R3 → R4 → OUT, all on the same clock. Between R1 and R2 there is a bitwise inverter (R2 loads $\\overline{R1}$). All registers start at 0. The input before clock edges 1 to 8 is the hex sequence 9, 4, E, 2, 7, B, 0, 5. Type the hex value of OUT (R4) after each of edges 1 to 8, as 8 hex digits with no separators.",
    accept: ["00F6B1D8", "0 0 F 6 B 1 D 8", "0,0,F,6,B,1,D,8", "0, 0, F, 6, B, 1, D, 8"],
    match: "text",
    placeholder: "8 hex digits",
    solution:
      "After edge $k$: R1 = $X_k$, R2 = $\\overline{X_{k-1}}$, R3 = $\\overline{X_{k-2}}$, R4 = $\\overline{X_{k-3}}$, where the 'inputs' before $X_1$ are the initial zeros.\n- Edges 1, 2: R4 still holds initial zeros that never passed the inverter: 0, 0.\n- Edge 3: R4 receives the R2 value produced at edge 1, $\\overline{0} = $ F.\n- Edges 4–8: $\\overline{9} = 6$, $\\overline{4} = $ B, $\\overline{\\text{E}} = 1$, $\\overline{2} = $ D, $\\overline{7} = 8$.\nOUT: **0 0 F 6 B 1 D 8**. The data appear 3 edges late (one per register after R1), each inverted once.",
    source: "Style: Tut 8 Q3",
  },
  // ---------------------------------------------------------------- counters
  {
    kind: "mcq",
    subtopic: "Ripple counters",
    difficulty: "hard",
    prompt:
      "Three **positive-edge** T flip-flops all have $T = 1$. FF0 is clocked by CLK, FF1 is clocked by $Q_0$, and FF2 is clocked by $Q_1$ (the true outputs, not $\\overline{Q}$). Starting from $Q_2Q_1Q_0 = 000$, what are the first four states after successive clock edges?",
    options: ["001, 010, 011, 100", "111, 110, 101, 100", "001, 011, 111, 110", "100, 010, 001, 100", "001, 000, 001, 000"],
    answer: 1,
    solution:
      "A flip-flop toggles when its clock input **rises**.\n- Edge 1: $Q_0$ 0→1 (rising) toggles $Q_1$ 0→1 (rising) toggles $Q_2$ 0→1: state 111.\n- Edge 2: $Q_0$ 1→0 (falling): nothing else: 110.\n- Edge 3: $Q_0$ 0→1 toggles $Q_1$ 1→0 (falling, stops): 101.\n- Edge 4: $Q_0$ 1→0: 100.\nSo it counts **down** (7, 6, 5, 4, …): with these connections each stage toggles when the previous Q **rises**.",
    source: "Style: PYP 2017-18 S1 Q4(b)",
  },
  {
    kind: "mcq",
    subtopic: "Ripple counters",
    difficulty: "medium",
    prompt:
      "A 4-bit version of the ripple counter in PYP 2017-18 S1 Q4(b): four **negative-edge** triggered J-K flip-flops all have $J = K = 1$; FF0 is clocked by clk, FF1 by $Q_0$, FF2 by $Q_1$ and FF3 by $Q_2$. Starting from $Q_3Q_2Q_1Q_0 = 0000$, what is the state after 11 falling edges of clk?",
    options: ["1011", "1101", "0101", "0100", "1100"],
    answer: 0,
    solution:
      "With $J = K = 1$ each flip-flop toggles at a falling edge of its own clock input. $Q_0$ toggles at every falling clk edge; $Q_1$ toggles when $Q_0$ falls; $Q_2$ when $Q_1$ falls; $Q_3$ when $Q_2$ falls.\nTracing from 0000: 0001, 0010, 0011, 0100, …: the state goes up by one at each falling clk edge, so after 11 edges it is $11_{10}$ = **1011**.\n- 1101 is 1011 written with the bits reversed.\n- 0101 ($= 16 - 11$) is what a down-count would give.\n- 0100 is the bitwise inverse of 1011; 1100 is one edge too many.",
    source: "Style: PYP 2017-18 S1 Q4(b)",
  },
  {
    kind: "mcq",
    subtopic: "Master–slave flip-flop",
    difficulty: "medium",
    prompt: "In the lecture's **positive-edge** master–slave D flip-flop (built from two D latches), what happens while CLK = 0?",
    options: [
      "The master samples D while the slave is disabled, so Q holds its value",
      "The slave copies the master's value to Q",
      "Both latches are transparent, so Q follows D",
      "Both latches are disabled, so D is ignored",
      "The master is disabled and the slave samples D",
    ],
    answer: 0,
    solution:
      "The master stage is enabled when the control is low and samples the current input, while the slave is disabled, 'locking it in the middle'. Only when the control goes high is the master disabled and the slave uses the value from the middle to determine its output. Hence Q changes only at the rising edge.\nB and E describe the CLK = 1 phase (or a negative-edge design); if both were transparent (C) the circuit would be a latch.",
    source: "Lecture 09 p.27–28",
  },
  {
    kind: "short",
    subtopic: "D latch",
    difficulty: "easy",
    prompt:
      "A positive-level D latch starts with $Q = 0$. The inputs $(E, D)$ are applied one after another: $(1,1)$, $(0,0)$, $(0,1)$, $(1,0)$, $(1,1)$, $(0,0)$. Type Q after each step as a 6-bit string (first step first).",
    accept: ["111011", "1 1 1 0 1 1", "1,1,1,0,1,1", "1, 1, 1, 0, 1, 1"],
    match: "text",
    placeholder: "6 bits",
    solution:
      "D latch table: $E = 0$ → store; $E = 1$ → $Q^+ = D$ (transparent).\n- $(1,1)$: transparent → 1.\n- $(0,0)$, $(0,1)$: disabled, hold → 1, 1.\n- $(1,0)$: transparent → 0.\n- $(1,1)$: transparent → 1.\n- $(0,0)$: hold → 1.\nAnswer `111011`.",
    source: "Style: Lecture 09 p.14",
  },
  {
    kind: "short",
    subtopic: "Clock period and frequency",
    difficulty: "easy",
    prompt: "A clock has a frequency of 125 MHz. What is its period in ns?",
    accept: ["8"],
    match: "number",
    placeholder: "ns",
    solution: "The frequency is the inverse of the period, so $T = 1/f = 1/(125 \\times 10^{6}\\text{ Hz}) = 8 \\times 10^{-9}$ s $= 8$ ns.\nCheck against the lecture anchors: 10 ns ↔ 100 MHz, so a slightly higher frequency means a slightly shorter period.",
    source: "Style: Lecture 09 p.22",
  },
  {
    kind: "short",
    subtopic: "SR latch",
    difficulty: "easy",
    prompt:
      "A NOR SR latch starts with $Q = 1$. The inputs $(S, R)$ are applied one after another: $(0,1)$, $(0,0)$, $(1,0)$, $(0,0)$, $(1,0)$, $(0,1)$. Type Q after each step as a 6-bit string (first step first).",
    accept: ["001110", "0 0 1 1 1 0", "0,0,1,1,1,0", "0, 0, 1, 1, 1, 0"],
    match: "text",
    placeholder: "6 bits",
    solution:
      "SR latch table: $00$ store, $01$ reset, $10$ set.\n- $(0,1)$ reset → 0; $(0,0)$ store → 0.\n- $(1,0)$ set → 1; $(0,0)$ store → 1; $(1,0)$ set again → 1.\n- $(0,1)$ reset → 0.\nAnswer `001110`.",
    source: "Style: Lecture 09 p.12",
  },
  {
    kind: "open",
    subtopic: "Ripple counter timing diagram",
    difficulty: "medium",
    prompt:
      "Three negative-edge triggered J-K flip-flops all have $J = K = 1$. FF0 is clocked by CLK, FF1 by $Q_0$ and FF2 by $Q_1$.\n(a) Sketch the timing diagram of $Q_0$, $Q_1$ and $Q_2$ for eight clock cycles, starting from $Q_2Q_1Q_0 = 000$ with CLK initially high. (5 marks)\n(b) State the count sequence and whether it is an up- or down-counter. (2 marks)",
    modelAnswer:
      "(a) With $J = K = 1$ each flip-flop toggles at every falling edge of its own clock.\n- $Q_0$ toggles at every falling edge of CLK.\n- $Q_1$ toggles whenever $Q_0$ falls (1 → 0), i.e. every second CLK falling edge.\n- $Q_2$ toggles whenever $Q_1$ falls, every fourth CLK falling edge.\n(b) $Q_2Q_1Q_0$ = 000, 001, 010, 011, 100, 101, 110, 111, 000: a 3-bit binary **up**-counter.",
    modelFigures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "10101010101010101" },
          { name: "Q0", wave: "01100110011001100" },
          { name: "Q1", wave: "00011110000111100" },
          { name: "Q2", wave: "00000001111111100" },
          { name: "count", wave: "=.=.=.=.=.=.=.=.=", data: ["0", "1", "2", "3", "4", "5", "6", "7", "0"] },
        ],
        marks: [1, 3, 5, 7, 9, 11, 13, 15],
        caption: "Dashed lines: falling edges of CLK (delays ignored)",
      },
    ],
    rubric: [
      { point: "Q0 toggles at every falling edge of CLK", marks: 2 },
      { point: "Q1 toggles when Q0 falls", marks: 1.5 },
      { point: "Q2 toggles when Q1 falls", marks: 1.5 },
      { point: "Count sequence 0, 1, 2, …, 7, 0 identified as an up-counter", marks: 2 },
    ],
    solution: "Each flip-flop toggles at a falling edge of its own clock input (CLK for FF0, the previous Q for the others). Draw each Q changing only on a falling edge of its own clock, then read $Q_2Q_1Q_0$ after each CLK edge.",
    source: "Style: PYP 2017-18 S1 Q4(b)",
  },
  {
    kind: "open",
    subtopic: "SR latch",
    difficulty: "easy",
    prompt: "What is an SR latch? Draw one built from NOR gates, give its truth table, and briefly describe how it stores a bit and why one input combination must be avoided. (6 marks)",
    modelAnswer:
      "An SR latch is the most basic circuit for storing a bit: two cross-coupled gates whose outputs feed back into each other's inputs, with a Set input and a Reset input.\nNOR version: $Q = \\overline{R + \\overline{Q}}$, $\\overline{Q} = \\overline{S + Q}$ (diagram below).\n- $S = 1, R = 0$: the $\\overline{Q}$ gate outputs 0, so the Q gate sees $0, 0$ and outputs 1: **set**.\n- $S = 0, R = 1$: Q = 0, $\\overline{Q} = 1$: **reset**.\n- $S = R = 0$: each gate's output holds the other in place through the feedback, so the previous Q is **stored**.\n- $S = R = 1$: both outputs are forced to 0, so Q and $\\overline{Q}$ are not complements; and if S and R are then de-asserted at the same time, the output may oscillate, and which state it settles in is impossible to know. So $S = R = 1$ must be avoided.",
    modelFigures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["R", "S"],
          gates: [
            { id: "Q", type: "NOR", in: ["R", "Qn"] },
            { id: "Qn", type: "NOR", in: ["S", "Q"] },
          ],
          outputs: ["Q", "Qn"],
        },
      },
      {
        kind: "table",
        head: ["S", "R", "Q+", "function"],
        rows: [
          [0, 0, "Q", "store"],
          [0, 1, 0, "reset"],
          [1, 0, 1, "set"],
          [1, 1, "?", "invalid"],
        ],
      },
    ],
    rubric: [
      { point: "Definition: a 1-bit storage element with set and reset inputs, built with feedback", marks: 1 },
      { point: "Correct cross-coupled NOR diagram", marks: 1.5 },
      { point: "Correct truth table (store, reset, set, invalid)", marks: 1.5 },
      { point: "Explains storage through feedback when S = R = 0", marks: 1 },
      { point: "Explains why S = R = 1 is invalid (Q = Q' = 0, race on release)", marks: 1 },
    ],
    solution: "Key points: cross-coupled feedback stores the bit; S sets, R resets; S = R = 1 breaks the complementary outputs and makes the state unpredictable when both are released together.",
    source: "Style: PYP 2017-18 S1 Q4(a)",
  },
];
