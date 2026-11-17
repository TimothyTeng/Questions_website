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
      "In this course **latch** means level-sensitive: while its enable is active the output follows the inputs (a D latch is transparent). A **flip-flop** is edge-triggered: it samples its inputs only at the active (normally rising) clock edge and holds the result until the next edge.\n- A reverses the two definitions.\n- Both latches and flip-flops normally provide $Q$ and $\\overline{Q}$.\n- It is the other way round: an edge-triggered flip-flop is built from two latches (master–slave).\n- Older references sometimes mix the names, which is why the lecture fixes the convention.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "SR latch",
    difficulty: "easy",
    prompt: "An SR latch is built from two cross-coupled NOR gates. While $S = 1$ and $R = 1$, what are the outputs?",
    options: ["$Q = 1$, $\\overline{Q} = 0$", "$Q = 0$, $\\overline{Q} = 1$", "$Q = 0$, $\\overline{Q} = 0$", "$Q = 1$, $\\overline{Q} = 1$", "The outputs keep their previous values"],
    answer: 2,
    solution:
      "A NOR gate outputs 0 whenever any input is 1. With $S = 1$ the $\\overline{Q}$ gate outputs 0, and with $R = 1$ the $Q$ gate outputs 0. So $Q = \\overline{Q} = 0$: the outputs are no longer complements, which is why $S = R = 1$ is called **invalid**. Worse, if both inputs then fall to 0 together, both gates switch to 1 at once and the latch may oscillate before settling in an unpredictable state.\n$Q = \\overline{Q} = 1$ (option D) is what the NAND (active-low) latch shows for its forbidden input $\\overline{S} = \\overline{R} = 0$.",
    source: "Style: Lecture 9 SR latch",
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
      "For the NAND latch $Q = \\overline{\\overline{S}\\cdot\\overline{Q}}$ and $\\overline{Q} = \\overline{\\overline{R}\\cdot Q}$. A 0 on a NAND input forces its output to 1, so the inputs are **active-low**:\n- $\\overline{S} = 0, \\overline{R} = 1$ (i.e. $01$): the $Q$ gate outputs 1, **set**.\n- $\\overline{S} = 1, \\overline{R} = 0$: reset. $11$: store (no input asserted).\n- $\\overline{S} = \\overline{R} = 0$: both gates are forced to 1, so $Q = \\overline{Q} = 1$: **forbidden**.\nOptions with 'forbidden 11' treat the inputs as active-high (that is the NOR latch rule).",
    source: "Style: Lecture 9 active-low latches",
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
    source: "Style: Lecture 9 enabled SR latch table",
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
    source: "Style: Tutorial 8 Q2",
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
      "The falling edges of CLK are at the start of units 3, 7, 11, 15 and 19. At each one, Q takes D from just before the edge (units 2, 6, 10, 14, 18): D = 1, 0, 1, 1, 0.\nSo Q goes 0 → **1** → **0** → **1** → 1 → **0**: four changes.\n(If you used the rising edges at units 1, 5, 9, 13, 17, 21 you would sample D = 0, 1, 0, 0, 0, 0 and count only 2 changes: check the bubble on the clock input.)",
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
    source: "Original",
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
    source: "Style: Tutorial 8 Q2",
  },
  // ---------------------------------------------------------------- JK / T / characteristic equations
  {
    kind: "mcq",
    subtopic: "JK flip-flop",
    difficulty: "medium",
    prompt: "A J-K flip-flop currently holds $Q = 1$. Which J and K inputs guarantee $Q = 0$ after the next active clock edge?",
    options: ["$J = 0, K = 0$", "$J = 0, K = 1$", "$J = 1, K = 0$", "$J = 1, K = 1$", "There are multiple correct answers"],
    answer: 4,
    solution:
      "From the JK table: $J = 0, K = 1$ resets ($Q^+ = 0$), and $J = K = 1$ toggles, so from $Q = 1$ it also gives $Q^+ = 0$. Both B and D work, so the answer is E.\nCheck with $Q^+ = J\\overline{Q} + \\overline{K}Q$ and $Q = 1$: $Q^+ = \\overline{K}$, which is 0 whenever $K = 1$, whatever J is.\n$J = K = 0$ holds 1 and $J = 1, K = 0$ sets 1.",
    source: "Style: PYP 2021-22 S1 Q1(7)",
  },
  {
    kind: "short",
    subtopic: "Characteristic equations",
    difficulty: "medium",
    prompt: "Write the characteristic equation of a J-K flip-flop: give a minimal SOP expression for the next state $Q^+$ in terms of J, K and the present state Q.",
    accept: ["JQ' + K'Q", "K'Q + JQ'"],
    match: "expr",
    vars: ["J", "K", "Q"],
    minimal: true,
    placeholder: "e.g. JQ' + ...",
    solution:
      "Write $Q^+$ for all eight $(J, K, Q)$ rows: hold ($J K = 00$) gives Q, reset ($01$) gives 0, set ($10$) gives 1, toggle ($11$) gives $\\overline{Q}$. So $Q^+ = 1$ for rows $JKQ = 001, 100, 101, 110$.\nOn a K-map these group into $J\\overline{Q}$ (rows 100, 110) and $\\overline{K}Q$ (rows 001, 101):\n$$Q^+ = J\\overline{Q} + \\overline{K}Q$$\nThe term $J\\overline{K}$ is a consensus term and is not needed.",
    solutionFigures: [{ kind: "kmap", vars: ["J", "K", "Q"], values: "01001110", groups: ["JQ'", "K'Q"], showIndex: true }],
    source: "Style: Lecture 9 flip-flop tables",
  },
  {
    kind: "mcq",
    subtopic: "Flip-flop conversions",
    difficulty: "medium",
    prompt: "A J-K flip-flop has its J input driven by a signal A, and its K input driven by A through an inverter ($K = \\overline{A}$). How does the circuit behave?",
    options: ["As a T flip-flop with $T = A$", "As a D flip-flop with $D = A$", "It toggles on every clock edge", "As an SR latch with $S = A$", "It never changes state"],
    answer: 1,
    solution:
      "With $K = \\overline{A}$ the inputs are always $JK = 10$ (when $A = 1$: set) or $01$ (when $A = 0$: reset), so $Q^+ = A$: a D flip-flop with $D = A$.\nAlgebraically: $Q^+ = J\\overline{Q} + \\overline{K}Q = A\\overline{Q} + AQ = A$.\nA T flip-flop would need $J = K = T$; toggling every edge needs $J = K = 1$; it is still edge-triggered, not a latch.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Asynchronous preset and clear",
    difficulty: "medium",
    prompt:
      "A positive-edge D flip-flop has an active-low **asynchronous** clear $\\overline{CLR}$. Its output is $Q = 0$ at time 0. With the waveforms below (one column per time unit), during which units after unit 2 is $Q = 0$?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "0011001100110011" },
          { name: "D", wave: "0111110011111100" },
          { name: "CLR'", wave: "1111111011111111" },
        ],
        ticks: T16,
      },
    ],
    options: [
      "Only during unit 7, while $\\overline{CLR}$ is low",
      "During units 7, 8 and 9; Q returns to 1 at the rising edge at unit 10",
      "Never: $\\overline{CLR}$ is not low at a rising edge, so it has no effect",
      "From unit 7 to the end of the diagram",
      "During units 6 to 9, because D is 0 in unit 6",
    ],
    answer: 1,
    solution:
      "An asynchronous clear acts **immediately**: when $\\overline{CLR}$ goes low in unit 7, Q drops to 0 at once (in the middle of the clock-high phase).\nReleasing $\\overline{CLR}$ does **not** restore the old value: Q stays 0 until the next rising edge, at unit 10, where the flip-flop captures D = 1 (from unit 9).\nSo Q = 0 in units 7, 8, 9.\n- A synchronous clear would be sampled only at edges; $\\overline{CLR}$ is high at every edge, so a synchronous clear would indeed do nothing (option C), which is the key difference.\n- D = 0 in units 6–7 does not matter: at the edge at unit 6 the flip-flop captured D from unit 5 (= 1).",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "CLK", wave: "0011001100110011" },
          { name: "D", wave: "0111110011111100" },
          { name: "CLR'", wave: "1111111011111111" },
          { name: "Q", wave: "0011111000111111" },
        ],
        ticks: T16,
        marks: [2, 6, 10, 14],
      },
    ],
    source: "Original",
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
      "While CLK = 1 the master follows D but the slave is closed, so Q cannot change. When CLK falls, the master closes (freezing the last D) and the slave opens, copying that frozen value to Q. While CLK = 0 the master is closed, so Q stays constant. Hence Q changes only at the **falling** edge: a negative-edge triggered flip-flop.\nThe lecture's positive-edge design uses the opposite enables: master transparent while CLK = 0, slave while CLK = 1.",
    source: "Style: Lecture 9 master–slave",
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
    source: "Style: Lecture 9 timing of latches",
  },
  // ---------------------------------------------------------------- timing parameters
  {
    kind: "mcq",
    subtopic: "Clock period and frequency",
    difficulty: "easy",
    prompt: "A clock has a period of 1.6 ns. What is its frequency?",
    options: ["1.6 GHz", "625 MHz", "62.5 MHz", "160 MHz", "6.25 GHz"],
    answer: 1,
    solution: "$f = 1/T = 1/(1.6 \\times 10^{-9}\\text{ s}) = 6.25 \\times 10^{8}$ Hz $= 625$ MHz.\nUseful anchors: 1 ns ↔ 1 GHz, 10 ns ↔ 100 MHz; a period a bit longer than 1 ns is a frequency a bit below 1 GHz.",
    source: "Style: Lecture 9 the clock",
  },
  {
    kind: "short",
    subtopic: "Maximum clock frequency",
    difficulty: "medium",
    prompt:
      "Register R1 feeds register R2 through combinational logic. R1's output can reach R2's D input along two paths: through a NAND (1.1 ns), then an XOR (1.5 ns), then an OR (1.0 ns); or through a NOT (0.5 ns) then an AND (1.2 ns). The flip-flops have clock-to-Q delay 0.8 ns and setup time 0.6 ns. What is the maximum clock frequency in MHz?",
    accept: ["200"],
    match: "number",
    placeholder: "MHz",
    solution:
      "The critical (longest) path is $1.1 + 1.5 + 1.0 = 3.6$ ns (the other path is only 1.7 ns).\n$T_{min} = t_{cq} + t_{comb,max} + t_{su} = 0.8 + 3.6 + 0.6 = 5.0$ ns.\n$f_{max} = 1/5.0\\text{ ns} = 200$ MHz.\nCommon errors: using only the logic delay (3.6 ns → 278 MHz) or the shorter path.",
    source: "Style: Lecture 9 timing in circuits",
  },
  {
    kind: "mcq",
    subtopic: "Setup and hold",
    difficulty: "hard",
    prompt:
      "Two flip-flops share a 200 MHz clock. Their clock-to-Q delay is 0.2 ns, setup time 0.5 ns and hold time 0.4 ns. The logic between them has a longest path of 3.0 ns and a shortest path of 0.1 ns. Which statement is correct?",
    options: [
      "Setup is violated; lowering the clock frequency fixes it",
      "Hold is violated; lowering the clock frequency fixes it",
      "Hold is violated; changing the clock frequency cannot fix it, so delay must be added to the short path",
      "Both setup and hold are met",
      "Both setup and hold are violated",
    ],
    answer: 2,
    solution:
      "Setup: $T = 5$ ns $\\ge t_{cq} + t_{comb,max} + t_{su} = 0.2 + 3.0 + 0.5 = 3.7$ ns, so setup is met.\nHold: the earliest new data can reach the second flip-flop is $t_{cq} + t_{comb,min} = 0.2 + 0.1 = 0.3$ ns after the edge, but it must not change until $t_h = 0.4$ ns after the edge: **hold violation**.\nThe hold check contains no clock period, so slowing the clock does nothing; the fix is to make the short path slower (add buffers).",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Setup and hold",
    difficulty: "medium",
    prompt: "A D flip-flop has a setup time of 0.5 ns and a hold time of 0.2 ns. Its D input changes from 0 to 1 at 0.3 ns **before** a rising clock edge. What should you expect?",
    options: [
      "Q becomes 1 reliably, because D changed before the edge",
      "Q stays 0 reliably, because D changed too late",
      "The setup time is violated, so Q may go metastable and its value after the edge is not guaranteed",
      "The hold time is violated, so Q may go metastable",
      "Q becomes 1 only after an extra 0.5 ns delay",
    ],
    answer: 2,
    solution:
      "D must be stable for at least $t_{su} = 0.5$ ns before the edge. Changing 0.3 ns before the edge violates **setup**. The flip-flop may capture 0, capture 1, or hover between the two (metastability) for a while, so the result is not guaranteed; in a timing diagram you would shade it as undefined.\nHold concerns changes **after** the edge (within 0.2 ns), so D is not a hold problem here.",
    source: "Original",
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
      "Next state: $Q_2^+ = Q_1 \\oplus Q_0$, $Q_1^+ = Q_2$, $Q_0^+ = Q_1$.\n- 001 → ($0 \\oplus 1 = 1$, 0, 0) = 100\n- 100 → ($0 \\oplus 0 = 0$, 1, 0) = 010\n- 010 → ($1 \\oplus 0 = 1$, 0, 1) = 101\n- 101 → ($0 \\oplus 1 = 1$, 1, 0) = 110\nAfter 4 edges: **110**. (This is a linear-feedback shift register: it visits all 7 non-zero states before repeating.)",
    source: "Style: PYP 2021-22 S1 Q1(8)",
  },
  // ---------------------------------------------------------------- shift registers, ring/Johnson, FIFO
  {
    kind: "short",
    subtopic: "Johnson counter",
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
      "This is a Johnson (twisted-ring) counter: the bits shift right ($Q_3 \\to Q_2 \\to Q_1 \\to Q_0$) and $\\overline{Q_0}$ is fed back into $Q_3$.\n0000 → 1000 → 1100 → 1110 → 1111 → 0111 → **0011** (6 edges) → 0001 → 0000.\nIt has $2n = 8$ states.",
    source: "Style: Lecture 9 registers",
  },
  {
    kind: "mcq",
    subtopic: "Ring and Johnson counters",
    difficulty: "medium",
    prompt: "A mod-12 counter is to be built (a) as a binary counter, (b) as a ring counter, (c) as a Johnson counter. How many flip-flops does each need?",
    options: ["(a) 4, (b) 12, (c) 6", "(a) 4, (b) 6, (c) 12", "(a) 12, (b) 4, (c) 6", "(a) 4, (b) 12, (c) 12", "(a) 3, (b) 12, (c) 6"],
    answer: 0,
    solution:
      "- Binary: need $2^n \\ge 12$, so $n = 4$ (16 states, 12 used).\n- Ring: one flip-flop per state (a single 1 circulates): 12.\n- Johnson: $2n$ states, so $n = 6$.\n3 flip-flops give only 8 states.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Serial-in parallel-out",
    difficulty: "easy",
    prompt: "An 8-bit serial-in parallel-out (SIPO) shift register is clocked at 50 MHz and shifts one bit per clock edge. Starting empty, how long does it take before a complete byte is available on the parallel outputs?",
    options: ["20 ns", "80 ns", "160 ns", "400 ns", "8 ns"],
    answer: 2,
    solution: "One bit enters per edge, so 8 edges are needed. At 50 MHz the period is $1/50\\text{ MHz} = 20$ ns, so $8 \\times 20 = 160$ ns.",
    source: "Style: Lecture 10 serial data transfer",
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
    source: "Style: Tutorial 8 Q3",
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
      "A flip-flop toggles when its clock input **rises**.\n- Edge 1: $Q_0$ 0→1 (rising) toggles $Q_1$ 0→1 (rising) toggles $Q_2$ 0→1: state 111.\n- Edge 2: $Q_0$ 1→0 (falling): nothing else: 110.\n- Edge 3: $Q_0$ 0→1 toggles $Q_1$ 1→0 (falling, stops): 101.\n- Edge 4: $Q_0$ 1→0: 100.\nSo it counts **down** (7, 6, 5, 4, …). To count up with rising-edge flip-flops, clock each stage from the previous $\\overline{Q}$ (or use falling-edge flip-flops clocked by Q).",
    source: "Style: CE1005 2017-18 Q4(b)",
  },
  {
    kind: "mcq",
    subtopic: "Ripple counters",
    difficulty: "medium",
    prompt:
      "A 4-bit ripple up-counter ($Q_0$ toggles first, each later bit is clocked by the bit before it) changes from $1011$ to $1100$ ($Q_3Q_2Q_1Q_0$). Which transient values appear on the outputs, in order, between those two states?",
    options: ["1010 then 1000", "1001 then 1000", "1111", "0011 then 0000", "None: all bits change at the same time"],
    answer: 0,
    solution:
      "Bits change one after another, each a flip-flop delay after its predecessor:\n- $Q_0$: 1 → 0 gives 1010 (a falling $Q_0$ clocks the next stage).\n- $Q_1$: 1 → 0 gives 1000.\n- $Q_2$: 0 → 1 gives 1100 (a rising $Q_2$ does not trigger $Q_3$), and the ripple stops.\nSo the outputs pass through 10 and 8 before settling at 12. Logic decoding the count can glitch on these values; a synchronous counter has no such transients.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Ripple vs synchronous counters",
    difficulty: "medium",
    prompt:
      "A 4-bit ripple counter uses flip-flops with a clock-to-Q delay of 12.5 ns. The count must have settled before it is read just before the next clock edge. Ignoring setup time, what is the maximum clock frequency?",
    options: ["80 MHz", "40 MHz", "20 MHz", "10 MHz", "160 MHz"],
    answer: 2,
    solution:
      "In the worst case (e.g. 0111 → 1000 or 1111 → 0000) the change ripples through all four flip-flops: $4 \\times 12.5 = 50$ ns. The period must be at least 50 ns, so $f_{max} = 1/50\\text{ ns} = 20$ MHz.\n80 MHz is the limit for one flip-flop delay, which is what a synchronous counter would achieve (plus its gate delay).",
    source: "Original",
  },
  {
    kind: "short",
    subtopic: "Counter modulus",
    difficulty: "hard",
    prompt:
      "A 4-bit binary ripple up-counter has an active-low asynchronous clear driven by a 2-input NAND gate whose inputs are $Q_3$ and $Q_2$. Starting from 0, what is the modulus of the counter (the number of stable states in its cycle)?",
    accept: ["12"],
    match: "number",
    solution:
      "The NAND output (the clear) goes low as soon as $Q_3 = Q_2 = 1$. Counting from 0, the first value with both bits set is $1100_2 = 12$. At that moment the counter is cleared, so 12 exists only for a gate delay (a glitch), and the stable states are 0, 1, …, 11: **mod-12**.\n(0–11 never have $Q_3 = Q_2 = 1$: 8 = 1000, 9 = 1001, 10 = 1010, 11 = 1011.)",
    source: "Original",
  },
  {
    kind: "short",
    subtopic: "Synchronous counters",
    difficulty: "hard",
    prompt:
      "A 3-bit **synchronous down**-counter (7, 6, 5, …, 0, 7, …) is built from T flip-flops with a common clock. Give a minimal expression for $T_2$, the toggle input of the most significant bit, in terms of $Q_2$, $Q_1$, $Q_0$.",
    accept: ["Q1'Q0'", "Q0'Q1'"],
    match: "expr",
    vars: ["Q2", "Q1", "Q0"],
    minimal: true,
    placeholder: "e.g. Q1Q0",
    solution:
      "When counting down, a bit toggles exactly when all lower bits are 0 (they are about to borrow): 100 → 011 and 000 → 111 are the only steps where $Q_2$ changes.\nSo $T_2 = 1$ in states 0 and 4, i.e. whenever $Q_1 = Q_0 = 0$: $T_2 = \\overline{Q_1}\\,\\overline{Q_0}$.\n(For the up-counter it would be $Q_1Q_0$. Also $T_1 = \\overline{Q_0}$ and $T_0 = 1$.)",
    source: "Style: Lecture 9 counters",
  },
  {
    kind: "short",
    subtopic: "Registers with load",
    difficulty: "medium",
    prompt:
      "One bit of a register is a D flip-flop with output Q. It must load the input I at a clock edge when the load signal L = 1, and keep its value when L = 0, without gating the clock. Give an expression for its D input in terms of L, I and Q.",
    accept: ["LI + L'Q", "L'Q + LI"],
    match: "expr",
    vars: ["L", "I", "Q"],
    placeholder: "D = ...",
    solution:
      "Put a 2-to-1 multiplexer in front of D, selected by L: input 1 is I, input 0 is the flip-flop's own output Q.\n$$D = L\\cdot I + \\overline{L}\\cdot Q$$\nWhen L = 0 the flip-flop reloads Q at every edge, so it holds. Gating the clock (AND-ing CLK with L) is avoided in synchronous design because it creates glitches and skew.",
    source: "Style: Lecture 9 registers",
  },
  {
    kind: "open",
    subtopic: "Ripple counter timing diagram",
    difficulty: "medium",
    prompt:
      "Three negative-edge triggered J-K flip-flops all have $J = K = 1$. FF0 is clocked by CLK, FF1 by $Q_0$ and FF2 by $Q_1$.\n(a) Sketch the timing diagram of $Q_0$, $Q_1$ and $Q_2$ for eight clock cycles, starting from $Q_2Q_1Q_0 = 000$ with CLK initially high. (5 marks)\n(b) State the count sequence and whether it is an up- or down-counter. (2 marks)",
    modelAnswer:
      "(a) With $J = K = 1$ each flip-flop toggles at every falling edge of its own clock.\n- $Q_0$ toggles at every falling edge of CLK, so it has half the clock frequency.\n- $Q_1$ toggles whenever $Q_0$ falls (1 → 0), i.e. every second CLK falling edge.\n- $Q_2$ toggles whenever $Q_1$ falls, every fourth CLK falling edge.\n(b) $Q_2Q_1Q_0$ = 000, 001, 010, 011, 100, 101, 110, 111, 000: a 3-bit (mod-8) binary **up**-counter. In a real ripple counter each later bit changes a flip-flop delay after the one that clocks it.",
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
      { point: "Count sequence 0, 1, 2, …, 7, 0 identified as a mod-8 up-counter", marks: 2 },
    ],
    solution: "Each stage is a divide-by-2: falling-edge flip-flops clocked by the previous Q count up. Draw each Q changing only on a falling edge of its own clock.",
    source: "Style: CE1005 2017-18 Q4(b)",
  },
  {
    kind: "open",
    subtopic: "SR latch",
    difficulty: "easy",
    prompt: "What is an SR latch? Draw one built from NOR gates, give its truth table, and briefly describe how it stores a bit and why one input combination must be avoided. (6 marks)",
    modelAnswer:
      "An SR latch is the simplest 1-bit memory element: two cross-coupled gates whose outputs feed back into each other's inputs, with a Set input and a Reset input.\nNOR version: $Q = \\overline{R + \\overline{Q}}$, $\\overline{Q} = \\overline{S + Q}$ (diagram below).\n- $S = 1, R = 0$: the $\\overline{Q}$ gate outputs 0, so the Q gate sees $0, 0$ and outputs 1: **set**.\n- $S = 0, R = 1$: Q = 0, $\\overline{Q} = 1$: **reset**.\n- $S = R = 0$: each gate's output holds the other in place through the feedback, so the previous Q is **stored**.\n- $S = R = 1$: both outputs are forced to 0, so Q and $\\overline{Q}$ are not complements; and if S and R then return to 0 together, both gates switch simultaneously and the latch may oscillate or settle unpredictably. So $S = R = 1$ is **invalid** and must be avoided.",
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
      { point: "Definition: a bistable 1-bit storage element with set and reset inputs, built with feedback", marks: 1 },
      { point: "Correct cross-coupled NOR diagram", marks: 1.5 },
      { point: "Correct truth table (store, reset, set, invalid)", marks: 1.5 },
      { point: "Explains storage through feedback when S = R = 0", marks: 1 },
      { point: "Explains why S = R = 1 is invalid (Q = Q' = 0, race on release)", marks: 1 },
    ],
    solution: "Key points: cross-coupled feedback stores the bit; S sets, R resets; S = R = 1 breaks the complementary outputs and causes a race when released.",
    source: "Style: CE1005 2017-18 Q4(a)",
  },
];
