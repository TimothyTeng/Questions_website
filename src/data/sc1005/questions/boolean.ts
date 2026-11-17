import type { Draft } from "@/lib/sc1005/types";

export const booleanQuestions: Draft[] = [
  // ------------------------------------------------------------------ gates, levels, truth tables
  {
    kind: "mcq",
    subtopic: "Logic levels",
    difficulty: "easy",
    prompt: "A TTL gate input is driven at 1.4 V. How does the gate interpret this input?",
    options: ["Logic 0, because it is below 2.5 V", "Logic 1, because it is above 0.8 V", "Indeterminate: it lies between 0.8 V and 2.0 V", "Logic 0, because it is below 2.0 V", "Logic 1, because it is above 0 V"],
    answer: 2,
    solution:
      "For TTL, an input is a guaranteed logic 0 only from 0 to 0.8 V and a guaranteed logic 1 only from 2.0 V to 5 V. 1.4 V lies in the gap 0.8–2.0 V, so the input level is **indeterminate**: the gate may read it either way and a correctly designed circuit never drives an input there.\nThe 2.5 V \"halfway\" idea is wrong: TTL thresholds are not symmetric about 2.5 V.",
    source: "Original (lecture 3-3)",
  },
  {
    kind: "mcq",
    subtopic: "Truth tables",
    difficulty: "easy",
    prompt:
      "A sealed 2-input gate is known to be either a NAND gate or an XOR gate. You may apply **one** input combination and observe the output. Which combination identifies the gate?",
    options: ["$A = 0, B = 0$", "$A = 0, B = 1$", "$A = 1, B = 0$", "$A = 1, B = 1$", "Either $A = 0, B = 1$ or $A = 1, B = 0$"],
    answer: 0,
    solution:
      "Compare the truth tables row by row:\n- 00: NAND = 1, XOR = 0 (different)\n- 01: NAND = 1, XOR = 1\n- 10: NAND = 1, XOR = 1\n- 11: NAND = 0, XOR = 0\nOnly 00 gives different outputs: output 1 ⇒ NAND, output 0 ⇒ XOR. The rows 01, 10 and 11 give identical outputs for both gates, so they tell you nothing.",
    source: "Style: L1 practice Q2 (Tocci 3-9)",
  },
  {
    kind: "mcq",
    subtopic: "Circuit analysis",
    difficulty: "medium",
    prompt: "For the circuit below, which input combination $ABCD$ makes $X = 1$?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C", "D"],
          gates: [
            { id: "G1", type: "AND", in: ["A", "B"] },
            { id: "G2", type: "NOT", in: ["C"] },
            { id: "G3", type: "OR", in: ["G1", "G2"] },
            { id: "G4", type: "NOR", in: ["B", "D"] },
            { id: "X", type: "AND", in: ["G3", "G4"] },
          ],
          outputs: ["X"],
        },
      },
    ],
    options: ["1000", "0100", "1100", "1001", "0010"],
    answer: 0,
    solution:
      "Write the expression: $X = (AB + C')\\cdot(B + D)'$.\n$X = 1$ needs both factors to be 1.\n- $(B + D)' = 1$ requires $B = 0$ and $D = 0$. This rules out 0100, 1100 and 1001.\n- With $B = 0$, $AB = 0$, so the first factor is $C'$: we need $C = 0$. This rules out 0010.\n- 1000: $AB + C' = 0 + 1 = 1$ and $(0 + 0)' = 1$, so $X = 1$.\n(In fact $X = B'C'D'$, so both 0000 and 1000 give $X = 1$.)",
    source: "Style: lecture 3-23 / 3-24",
  },
  {
    kind: "short",
    subtopic: "Circuit analysis",
    difficulty: "medium",
    prompt: "Write a Boolean expression for the output $X$ of the circuit below in terms of $A$, $B$ and $C$. (Any equivalent expression is accepted.)",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C"],
          gates: [
            { id: "G1", type: "NOT", in: ["A"] },
            { id: "G2", type: "NAND", in: ["G1", "B"] },
            { id: "G3", type: "OR", in: ["B", "C"] },
            { id: "G4", type: "AND", in: ["G2", "G3"] },
            { id: "X", type: "NOR", in: ["G4", "C"] },
          ],
          outputs: ["X"],
        },
      },
    ],
    accept: ["((A'B)'(B + C) + C)'", "(A' + B')C'", "A'C' + B'C'"],
    match: "expr",
    vars: ["A", "B", "C"],
    placeholder: "e.g. (A + B')C",
    solution:
      "Label the gates from left to right:\n- G1 $= A'$\n- G2 (NAND) $= (A'B)'$\n- G3 $= B + C$\n- G4 $= (A'B)'(B + C)$\n- $X$ (NOR) $= [(A'B)'(B + C) + C]'$\nSimplifying: $(A'B)' = A + B'$, so G4 $= (A + B')(B + C) = AB + AC + B'C$. Then $G4 + C = AB + C$ (absorption: $AC$ and $B'C$ are inside $C$). Finally $X = (AB + C)' = (A' + B')C'$.",
    source: "Style: Tutorial 2 Q1(a)",
  },
  {
    kind: "short",
    subtopic: "Truth tables",
    difficulty: "medium",
    prompt: "A logic circuit's output is $Y = [(A'B + C)D']'$. In its 16-row truth table, how many rows have $Y = 1$?",
    accept: ["11"],
    match: "number",
    solution:
      "Apply De Morgan to the outer bar: $Y = (A'B + C)' + D$, and $(A'B + C)' = (A'B)'C' = (A + B')C'$. So $Y = (A + B')C' + D$.\n- $D = 1$: $Y = 1$ on all 8 of these rows.\n- $D = 0$: $Y = 1$ when $C = 0$ and ($A = 1$ or $B = 0$). With $C = 0$ the pairs $AB = 00, 10, 11$ work and $01$ does not: 3 rows.\nTotal $8 + 3 = 11$ rows.",
    source: "Style: Tutorial 2 Q2(b)",
  },
  {
    kind: "mcq",
    subtopic: "Boolean theorems",
    difficulty: "medium",
    prompt: "Which one of the following statements is **true**?",
    options: [
      "Replacing every AND, OR and NOT gate with its NAND-only equivalent never increases the number of gates.",
      "$A(B + C)' = AB' + AC'$",
      "There are 16 different truth tables for a circuit with 2 inputs and 1 output.",
      "An OR gate built only from 2-input NOR gates needs 3 gates.",
      "$AB + A'C + BC = AB + BC$",
    ],
    answer: 2,
    solution:
      "**C is true**: a 2-input table has $2^2 = 4$ rows and each row's output is 0 or 1, so there are $2^4 = 16$ possible output columns.\n- A is false: OR from NANDs takes 3 gates (two inverters and a NAND), so a gate-by-gate replacement can **grow** a circuit. Universal gates do not always reduce the gate count.\n- B is false: $(B + C)' = B'C'$, so $A(B + C)' = AB'C'$. At $A = 1, B = 1, C = 0$ the left side is 0 but $AB' + AC' = 0 + 1 = 1$.\n- D is false: OR from NORs is a NOR followed by a NOR inverter, **2** gates. (AND from NORs is the one that needs 3.)\n- E is false: consensus removes the **$BC$** term, giving $AB + A'C$. Dropping $A'C$ instead is wrong: at $A = 0, B = 0, C = 1$ the left side is 1 and $AB + BC = 0$.",
    source: "Style: L1/L2 summary F12-10, F12-27, F12-29, F12-32",
  },
  {
    kind: "short",
    subtopic: "Circuit implementation",
    difficulty: "easy",
    prompt:
      "$Y = AB' + A'C + BC'D$ is implemented directly as written, using inverters for the complemented variables, one AND gate per product term and one OR gate (gates may have any number of inputs). How many gates are needed in total?",
    accept: ["7"],
    match: "number",
    solution:
      "- Inverters: $A'$, $B'$, $C'$ → 3 (each complemented variable needs one inverter, shared wherever it is used).\n- AND gates: $AB'$, $A'C$, $BC'D$ → 3 (the last is a 3-input AND).\n- One 3-input OR gate to sum the three terms → 1.\nTotal $3 + 3 + 1 = 7$ gates.",
    source: "Style: lecture 3-25",
  },
  {
    kind: "mcq",
    subtopic: "Circuit analysis",
    difficulty: "medium",
    prompt: "Which expression(s) describe the output $Y$ of this circuit?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C"],
          gates: [
            { id: "G1", type: "NAND", in: ["B", "C"] },
            { id: "Y", type: "OR", in: ["A", "G1"] },
          ],
          outputs: ["Y"],
        },
      },
    ],
    options: ["$Y = (A + BC)'$", "$Y = A + (BC)'$", "$Y = A + B' + C'$", "$Y = A + B'C'$", "There are multiple correct answers"],
    answer: 4,
    solution:
      "The NAND gives $(BC)'$ and the OR adds $A$: $Y = A + (BC)'$ (option B).\nBy De Morgan $(BC)' = B' + C'$, so $Y = A + B' + C'$ (option C) is the same function. Hence there are multiple correct answers.\n- $(A + BC)'$ puts the inversion over the whole expression: wrong.\n- $A + B'C'$ is the classic De Morgan mistake (the bar was broken without changing AND to OR); e.g. $ABC = 010$ gives $Y = 1$ in the circuit but $A + B'C' = 0$.",
    source: "Style: lecture 3-21 (precedence)",
  },
  // ------------------------------------------------------------------ timing
  {
    kind: "short",
    subtopic: "Timing & propagation delay",
    difficulty: "medium",
    prompt:
      "The waveforms below are applied to a circuit with output $X = AB' + C$. Assume ideal gates (no delay). Give $X$ in the 8 time intervals, left to right, as an 8-bit string.",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "A", wave: "00111100" },
          { name: "B", wave: "01100110" },
          { name: "C", wave: "00010001" },
        ],
        ticks: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      },
    ],
    accept: ["00011001"],
    match: "text",
    placeholder: "8 bits, interval t0 first",
    solution:
      "In each interval read $A, B, C$ and evaluate $AB' + C$:\n- t0: $A=0$ → $AB' = 0$, $C = 0$ → 0\n- t1: $A = 0$ → 0\n- t2: $A = 1, B = 1$ → $AB' = 0$, $C = 0$ → 0\n- t3: $C = 1$ → 1\n- t4: $A = 1, B = 0$ → $AB' = 1$ → 1\n- t5: $B = 1$, $C = 0$ → 0\n- t6: $A = 0$, $C = 0$ → 0\n- t7: $C = 1$ → 1\nSo $X$ = `00011001`.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "A", wave: "00111100" },
          { name: "B", wave: "01100110" },
          { name: "C", wave: "00010001" },
          { name: "AB'", wave: "00001000" },
          { name: "X", wave: "00011001" },
        ],
        ticks: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      },
    ],
    source: "Style: Tutorial 2 Q1(b)",
  },
  {
    kind: "short",
    subtopic: "Timing & propagation delay",
    difficulty: "medium",
    prompt:
      "$Z = (A'B + C)'$ is built from an inverter (for $A'$), a 2-input AND, a 2-input OR and an output inverter, connected in that order. Each gate has a propagation delay of 40 ns. The inputs change from $ABC = 110$ to $ABC = 010$ at $t = 0$. At what time (in ns) does $Z$ change?",
    accept: ["160"],
    match: "number",
    placeholder: "time in ns",
    solution:
      "Before $t = 0$: $A' = 0$, $A'B = 0$, $A'B + C = 0$, $Z = 1$. After settling: $A' = 1$, $A'B = 1$, $A'B + C = 1$, $Z = 0$.\nThe change in $A$ travels through four gates in series:\n- $A'$ rises at 40 ns\n- $A'B$ rises at 80 ns\n- $A'B + C$ rises at 120 ns\n- $Z$ falls at **160 ns**.\n$B$ and $C$ do not change, so there is no second path and no glitch.",
    source: "Style: PYP 2021-22 S1 Q2(b)",
  },
  {
    kind: "mcq",
    subtopic: "Timing & propagation delay",
    difficulty: "hard",
    prompt:
      "$F = AB + A'C$ is built from one inverter, two 2-input AND gates and a 2-input OR gate; every gate has 10 ns propagation delay. $B = C = 1$ throughout, and $A$ falls from 1 to 0 at $t = 0$. Which statement describes $F$?",
    options: [
      "$F$ stays at 1 throughout, because $AB + A'C = 1$ whenever $B = C = 1$",
      "$F$ falls to 0 at $t = 10$ ns and returns to 1 at $t = 20$ ns",
      "$F$ falls to 0 at $t = 20$ ns and returns to 1 at $t = 30$ ns",
      "$F$ falls to 0 at $t = 20$ ns and stays at 0",
      "$F$ falls to 0 at $t = 10$ ns and returns to 1 at $t = 30$ ns",
    ],
    answer: 2,
    solution:
      "Logically $F = A + A' = 1$ for $B = C = 1$, but the two paths from $A$ to the OR gate have different lengths.\n- Path 1: $A$ → AND ($AB$) → OR. $AB$ falls at 10 ns.\n- Path 2: $A$ → NOT → AND ($A'C$) → OR. $A'$ rises at 10 ns, so $A'C$ rises at 20 ns.\n- Between 10 ns and 20 ns both OR inputs are 0. The OR output follows its inputs one delay later: it falls at $10 + 10 = 20$ ns and rises again at $20 + 10 = 30$ ns.\nSo $F$ has a 10 ns **glitch** (static-1 hazard) from 20 ns to 30 ns. Option A ignores delays; options B and E forget the OR gate's own delay or mix up the path lengths.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "A", wave: "11000000" },
          { name: "A'", wave: "00011111" },
          { name: "AB", wave: "11100000" },
          { name: "A'C", wave: "00001111" },
          { name: "F", wave: "11110111" },
        ],
        ticks: ["-20", "-10", "0", "10", "20", "30", "40", "50"],
      },
    ],
    source: "Original (lecture 3-19, propagation delay)",
  },
  {
    kind: "open",
    subtopic: "Timing & propagation delay",
    difficulty: "hard",
    prompt:
      "Implement the Boolean expression $Z = (A + B'C)'$ using basic logic gates (NOT, AND, OR).\n(a) Sketch the logic circuit diagram for your implementation. (4 marks)\n(b) The inputs $A, B, C$ change from $1, 1, 1$ to $0, 0, 1$ at $t = 0$ with negligible rise and fall times. Each logic gate has 50 ns propagation delay. Sketch the waveforms of $A$, $B$, $C$, the internal signals and $Z$ from $t = -100$ ns to $t = 300$ ns. (8 marks)",
    solution:
      "The $B$ path has four gates (NOT → AND → OR → NOT) but the $A$ path only two (OR → NOT). When $A$ falls at 0 the OR output falls at 50 ns, but $B'C$ only rises at 100 ns, so the OR is low from 50 to 150 ns and $Z$ (one delay later) is high from 100 ns to 200 ns: a glitch, although $Z = 0$ before and after the change. See the model answer for the full waveforms.",
    modelAnswer:
      "(a) Four gates: an inverter makes $B'$; a 2-input AND makes $B'C$; a 2-input OR makes $A + B'C$; an output inverter makes $Z$.\n(b) Before $t = 0$: $B' = 0$, $B'C = 0$, $A + B'C = 1$, $Z = 0$. After settling: $B' = 1$, $B'C = 1$, $A + B'C = 1$, $Z = 0$. So the steady-state output does not change, but the paths have different delays:\n- $A$ falls at 0, so the OR loses its only 1 input: OR falls at 50 ns.\n- $B'$ rises at 50 ns, $B'C$ rises at 100 ns, so the OR rises again at 150 ns.\n- $Z$ is the OR output inverted one delay later: $Z$ rises at 100 ns and falls at 200 ns.\nResult: a 100 ns **glitch** on $Z$ (high from 100 ns to 200 ns) even though $Z = 0$ before and after.",
    modelFigures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C"],
          gates: [
            { id: "B'", type: "NOT", in: ["B"] },
            { id: "B'C", type: "AND", in: ["B'", "C"] },
            { id: "A+B'C", type: "OR", in: ["A", "B'C"] },
            { id: "Z", type: "NOT", in: ["A+B'C"] },
          ],
          outputs: ["Z"],
          showNets: true,
        },
      },
      {
        kind: "wave",
        signals: [
          { name: "A", wave: "11000000" },
          { name: "B", wave: "11000000" },
          { name: "C", wave: "11111111" },
          { name: "B'", wave: "00011111" },
          { name: "B'C", wave: "00001111" },
          { name: "A+B'C", wave: "11100111" },
          { name: "Z", wave: "00001100" },
        ],
        ticks: ["-100", "-50", "0", "50", "100", "150", "200", "250"],
        marks: [2],
      },
    ],
    rubric: [
      { point: "Correct circuit: inverter on B, AND with C, OR with A, output inverter (or equivalent NOR at the output)", marks: 4 },
      { point: "B', B'C and OR output edges at 50, 100 and 50/150 ns respectively", marks: 4 },
      { point: "Z shows the glitch: rises at 100 ns, falls at 200 ns, 0 before and after", marks: 4 },
    ],
    source: "Style: PYP 2021-22 S1 Q2",
  },
  // ------------------------------------------------------------------ theorems & simplification
  {
    kind: "mcq",
    subtopic: "Boolean theorems",
    difficulty: "easy",
    prompt: "Which of the following is **not** a valid Boolean identity?",
    options: ["$X + X'Y = X + Y$", "$X(X' + Y) = XY$", "$X + XY = X$", "$(X + Y)(X + Z) = X + YZ$", "$X + YZ = (X + Y)Z$"],
    answer: 4,
    solution:
      "A and B are the redundant-complement rules, C is absorption, D is the second distributive law (valid in Boolean algebra).\nE is false: try $X = 1, Z = 0$: left side $1 + 0 = 1$, right side $(1 + Y)\\cdot0 = 0$. The correct factorisation is $X + YZ = (X + Y)(X + Z)$.",
    source: "Style: lecture 3-28 to 3-33",
  },
  {
    kind: "mcq",
    subtopic: "Boolean theorems",
    difficulty: "medium",
    prompt: "What is the **dual** of the identity $A + A'B = A + B$?",
    options: ["$A(A' + B) = AB$", "$A' + AB' = A' + B'$", "$A'(A + B') = A'B'$", "$A\\cdot A'B = AB$", "$(A + A')B = A + B$"],
    answer: 0,
    solution:
      "To form the dual, swap AND ↔ OR (and 0 ↔ 1) everywhere but **leave the variables and their complements unchanged**.\n$A + (A'\\cdot B)$ becomes $A\\cdot(A' + B)$, and $A + B$ becomes $A\\cdot B$. So the dual is $A(A' + B) = AB$, which is indeed true.\nB and C complement the variables (that is substituting $A \\to A'$, not taking the dual). D forgets to change the inner AND, and E is not an identity.",
    source: "Style: lecture 3-28 (duality)",
  },
  {
    kind: "mcq",
    subtopic: "Algebraic simplification",
    difficulty: "medium",
    prompt: "Simplify $F = XY' + X'Z + Y'Z$.",
    options: ["$F = XY' + X'Z$", "$F = XY' + Y'Z$", "$F = X'Z + Y'Z$", "$F = Y' + Z$", "$F = X'Z + Y'$"],
    answer: 0,
    solution:
      "This is the consensus theorem $AB + A'C + BC = AB + A'C$ with $A = X$, $B = Y'$, $C = Z$: the term $Y'Z$ (the product of the parts left after removing $X$ and $X'$) is redundant.\nProof: $Y'Z = XY'Z + X'Y'Z$; the first is absorbed by $XY'$, the second by $X'Z$.\nThe other options are not equivalent: B and C each drop a needed term (B gives 0 at $XYZ = 011$ where $F = X'Z = 1$; C gives 0 at $XYZ = 100$ where $F = XY' = 1$), and D and E are too big (at $XYZ = 111$, D gives 1 but $F = 0$; at $XYZ = 000$, E gives 1 but $F = 0$).",
    source: "Style: lecture 3-33 (consensus)",
  },
  {
    kind: "short",
    subtopic: "Algebraic simplification",
    difficulty: "medium",
    prompt: "Use Boolean algebra to simplify $X = AB'C' + ABC'D + A'BC'D + A'B'C'$ to a minimum sum-of-products expression.",
    accept: ["B'C' + C'D", "C'(B' + D)"],
    match: "expr",
    vars: ["A", "B", "C", "D"],
    minimal: true,
    placeholder: "minimum SOP",
    solution:
      "- $AB'C' + A'B'C' = B'C'(A + A') = B'C'$.\n- $ABC'D + A'BC'D = BC'D(A + A') = BC'D$.\n- $X = B'C' + BC'D = C'(B' + BD) = C'(B' + D)$ (redundant complement: $B' + BD = B' + D$).\nSo $X = B'C' + C'D$ (4 literals).",
    source: "Style: Tutorial 2 Q3(a)",
  },
  {
    kind: "short",
    subtopic: "Algebraic simplification",
    difficulty: "hard",
    prompt: "Simplify the following expression algebraically and give a minimum sum-of-products answer.\n$$F = [(A + B')(C'D)']' + [(A' + C)' + B]'\\,D$$",
    accept: ["A'B + B'D + C'D"],
    match: "expr",
    vars: ["A", "B", "C", "D"],
    minimal: true,
    placeholder: "minimum SOP",
    solution:
      "First term (De Morgan, outer bar over a product): $[(A + B')(C'D)']' = (A + B')' + C'D = A'B + C'D$.\nSecond term: $[(A' + C)' + B]' = (A' + C)\\,B' = A'B' + B'C$, then times $D$: $A'B'D + B'CD$.\nSo $F = A'B + C'D + A'B'D + B'CD$.\n- $A'B + A'B'D = A'(B + B'D) = A'(B + D) = A'B + A'D$.\n- $C'D + B'CD = D(C' + B'C) = D(C' + B') = C'D + B'D$.\nNow $F = A'B + A'D + C'D + B'D$, and $A'D$ is the consensus of $A'B$ and $B'D$, so it is redundant.\n$F = A'B + B'D + C'D$.",
    source: "Style: PYP 2018-19 S1 Q1(c)",
  },
  {
    kind: "mcq",
    subtopic: "De Morgan",
    difficulty: "medium",
    prompt: "Which expression is equal to $[A'(B'C)'(C + D')]'$?",
    options: ["$A + B'C + C'D$", "$A + (B + C')C'D$", "$A + B'C + C'D'$", "$A' + B'C + C'D$", "$A + BC' + CD'$"],
    answer: 0,
    solution:
      "Break the outer bar over the three-factor product and change AND to OR:\n$[A'\\cdot(B'C)'\\cdot(C + D')]' = (A')' + [(B'C)']' + (C + D')'$.\n- $(A')' = A$\n- $[(B'C)']' = B'C$ (double bar cancels)\n- $(C + D')' = C'D$ (De Morgan again)\nSo the result is $A + B'C + C'D$.\nOption C forgets to complement $D'$; option D forgets the double complement on $A$; option E complements the inner terms wrongly.",
    source: "Style: lecture 3-37",
  },
  {
    kind: "mcq",
    subtopic: "Algebraic simplification",
    difficulty: "hard",
    prompt: "Simplify $X = C(CA)' + C'A'B + ABC$.",
    options: ["$X = A'B + A'C + BC$", "$X = A'C + BC$", "$X = A'B + BC$", "$X = A' + BC$", "$X = A'(B + C)$"],
    answer: 0,
    solution:
      "- $C(CA)' = C(C' + A') = CC' + A'C = A'C$.\n- $A'C + A'BC' = A'(C + BC') = A'(C + B) = A'B + A'C$.\n- $A'B + ABC = B(A' + AC) = B(A' + C) = A'B + BC$.\nSo $X = A'B + A'C + BC$, which covers minterms $\\{1, 2, 3, 7\\}$. Each term covers a minterm no other term covers ($A'C$: 001, $A'B$: 010, $BC$: 111), so none can be dropped.\nOption D adds row 000, option E loses row 111, and B and C each lose a row.",
    source: "Style: Tutorial 2 Q3(c)",
  },
  // ------------------------------------------------------------------ NAND / NOR
  {
    kind: "short",
    subtopic: "NAND/NOR implementation",
    difficulty: "medium",
    prompt: "What is the minimum number of 2-input NAND gates needed to implement $F = AB + CD$? (Complemented inputs are not available.)",
    accept: ["3"],
    match: "number",
    solution:
      "$F = AB + CD$ is in SOP form, which maps directly onto NAND–NAND: $F = [(AB)'(CD)']'$.\nTwo NANDs make $(AB)'$ and $(CD)'$, and a third NAND combines them: **3 gates**.\nFewer is impossible: a function of four inputs needs at least three 2-input gates just to bring all four inputs together.",
    source: "Style: Tutorial 2 Q5",
  },
  {
    kind: "mcq",
    subtopic: "NAND/NOR implementation",
    difficulty: "hard",
    prompt:
      "$F = (A + B)C$ is to be built from 2-input NAND gates only (no complemented inputs available). Replacing each gate of the OR–AND circuit by its NAND equivalent uses 5 gates. What is the **minimum** number of 2-input NAND gates?",
    options: ["2", "3", "4", "5", "6"],
    answer: 1,
    solution:
      "Rewrite in SOP form first: $F = (A + B)C = AC + BC$. SOP maps to NAND–NAND: $F = [(AC)'(BC)']'$, which is **3** NAND gates (two first-level NANDs and one output NAND), with no inverters needed.\nThe gate-by-gate conversion gives OR = 3 NANDs (two inverters + NAND) and AND = 2 NANDs, total 5.\n2 gates cannot work: a 2-gate NAND network has the form $[(xy)'z]' = xy + z'$ or simpler, which can never equal $(A + B)C$ with uncomplemented inputs (checked exhaustively).",
    source: "Style: Tutorial 2 Q5 / lecture 3-44",
  },
  {
    kind: "mcq",
    subtopic: "NAND/NOR implementation",
    difficulty: "medium",
    prompt: "Which function does this NAND-only circuit implement?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B"],
          gates: [
            { id: "G1", type: "NAND", in: ["A", "B"] },
            { id: "G2", type: "NAND", in: ["A", "G1"] },
            { id: "G3", type: "NAND", in: ["B", "G1"] },
            { id: "X", type: "NAND", in: ["G2", "G3"] },
          ],
          outputs: ["X"],
        },
      },
    ],
    options: ["$X = A \\oplus B$", "$X = (A \\oplus B)'$", "$X = A + B$", "$X = AB$", "$X = (AB)'$"],
    answer: 0,
    solution:
      "Let $G_1 = (AB)'$.\n- $G_2 = (A\\,G_1)' = A' + G_1' = A' + AB$, so $G_2' = A\\,G_1 = A(A' + B') = AB'$.\n- Similarly $G_3' = B\\,G_1 = A'B$.\n- $X = (G_2 G_3)' = G_2' + G_3' = AB' + A'B = A \\oplus B$.\nCheck with the truth table: 00 → 0, 01 → 1, 10 → 1, 11 → 0. This is the classic 4-NAND XOR.",
    source: "Original (lecture 3-44, NAND universality)",
  },
  {
    kind: "mcq",
    subtopic: "NAND/NOR implementation",
    difficulty: "medium",
    prompt: "Which function does this NOR-only circuit implement? (G2 has both inputs tied to $C$.)",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C"],
          gates: [
            { id: "G1", type: "NOR", in: ["A", "B"] },
            { id: "G2", type: "NOR", in: ["C", "C"] },
            { id: "X", type: "NOR", in: ["G1", "G2"] },
          ],
          outputs: ["X"],
        },
      },
    ],
    options: ["$X = (A + B)C$", "$X = (A + B)'C$", "$X = AB + C$", "$X = (A + B + C)'$", "$X = A + BC$"],
    answer: 0,
    solution:
      "- $G_1 = (A + B)'$.\n- $G_2 = (C + C)' = C'$ (a NOR with tied inputs is an inverter).\n- $X = (G_1 + G_2)' = G_1'\\,G_2' = (A + B)\\,C$ (De Morgan).\nThis is NOR–NOR realising a POS expression. Truth table: $X = 1$ only for $ABC = 011, 101, 111$.",
    source: "Style: lecture 3-46 (basic gates from NOR)",
  },
  {
    kind: "open",
    subtopic: "NAND/NOR implementation",
    difficulty: "hard",
    prompt:
      "Implement $X = (A + B')(C' + D)$ using\n(a) only 2-input NOR gates, and (4 marks)\n(b) only 2-input NAND gates. (4 marks)\nOnly uncomplemented inputs $A, B, C, D$ are available. Sketch each circuit and state the number of gates used.",
    solution:
      "POS suits NOR–NOR: 2 NOR inverters ($B'$, $C'$) + 2 NORs for the sum terms + 1 output NOR = **5 NOR gates**. With NANDs each sum term needs an inverter and a NAND ($A + B' = (A'B)'$, $C' + D = (CD')'$) and the final AND needs a NAND plus an inverter: **6 NAND gates**.",
    modelAnswer:
      "(a) POS maps onto NOR–NOR. Invert $B$ and $C$ with NORs whose inputs are tied (2 gates). Then $G_1 = (A + B')'$ and $G_2 = (C' + D)'$ (2 gates), and $X = (G_1 + G_2)' = (A + B')(C' + D)$ (1 gate). **5 NOR gates.**\n(b) Each OR term with NANDs: $A + B' = (A'B)'$, so invert $A$ (1 gate) and NAND with $B$ (1 gate); $C' + D = (CD')'$, so invert $D$ (1 gate) and NAND with $C$ (1 gate). The final AND is a NAND followed by a NAND-inverter (2 gates). **6 NAND gates.**",
    modelFigures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C", "D"],
          gates: [
            { id: "B'", type: "NOR", in: ["B", "B"] },
            { id: "C'", type: "NOR", in: ["C", "C"] },
            { id: "G1", type: "NOR", in: ["A", "B'"] },
            { id: "G2", type: "NOR", in: ["C'", "D"] },
            { id: "X", type: "NOR", in: ["G1", "G2"] },
          ],
          outputs: ["X"],
        },
        caption: "(a) 5 two-input NOR gates.",
      },
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C", "D"],
          gates: [
            { id: "A'", type: "NAND", in: ["A", "A"] },
            { id: "D'", type: "NAND", in: ["D", "D"] },
            { id: "G1", type: "NAND", in: ["A'", "B"] },
            { id: "G2", type: "NAND", in: ["C", "D'"] },
            { id: "G3", type: "NAND", in: ["G1", "G2"] },
            { id: "X", type: "NAND", in: ["G3", "G3"] },
          ],
          outputs: ["X"],
        },
        caption: "(b) 6 two-input NAND gates.",
      },
    ],
    rubric: [
      { point: "(a) inverters for B and C from tied NORs", marks: 1 },
      { point: "(a) NOR–NOR structure giving (A + B')(C' + D), 5 gates", marks: 3 },
      { point: "(b) A + B' and C' + D each from an inverter + NAND", marks: 2 },
      { point: "(b) final AND as NAND + NAND-inverter, total 6 gates", marks: 2 },
    ],
    source: "Style: Tutorial 2 Q5",
  },
  // ------------------------------------------------------------------ alternate symbols
  {
    kind: "mcq",
    subtopic: "Alternate symbols",
    difficulty: "easy",
    prompt: "A gate is drawn with the AND shape, bubbles on both inputs and **no** bubble on the output. Which gate is it?",
    options: ["AND", "OR", "NAND", "NOR", "XNOR"],
    answer: 3,
    solution:
      "The symbol computes $A'B'$. By De Morgan $A'B' = (A + B)'$, which is a **NOR** gate.\nRule: to get the standard symbol back, toggle every bubble (inputs lose theirs, the output gains one) and swap the AND shape for the OR shape: an OR with an output bubble, i.e. NOR.",
    source: "Style: lecture 3-47",
  },
  {
    kind: "mcq",
    subtopic: "Alternate symbols",
    difficulty: "hard",
    prompt:
      "In the circuit below the output gate is drawn as an AND shape with bubbled inputs. Which statement correctly describes the circuit using bubble-to-bubble reading?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C"],
          gates: [
            { id: "G1", type: "NAND", in: ["A", "B"] },
            { id: "X", type: "AND", in: ["!G1", "!C"] },
          ],
          outputs: ["X"],
        },
      },
    ],
    options: [
      "$X = 1$ when $A = 1$ and $B = 1$ and $C = 0$",
      "$X = 1$ when ($A = 0$ or $B = 0$) and $C = 0$",
      "$X = 0$ when $A = 1$ and $B = 1$ and $C = 0$",
      "$X = 1$ when $A = 1$ and $B = 1$, or $C = 0$",
      "$X = 1$ when $A = 0$ and $B = 0$ and $C = 1$",
    ],
    answer: 0,
    solution:
      "The output gate has no output bubble, so read it as \"$X = 1$ when ...\". Its inputs are bubbled: \"... G1 = 0 **and** C = 0\".\nG1 is a standard NAND: its output bubble matches the bubbled input (bubble-to-bubble), and it reads \"G1 = 0 when $A = 1$ **and** $B = 1$\".\nTogether: $X = 1$ when $A = 1$, $B = 1$ and $C = 0$. Algebra agrees: $X = G_1'C' = (AB)C' = ABC'$.\nB reads the NAND as if its output were not bubbled; D changes the AND into an OR.",
    source: "Style: lecture 3-51 / L3 practice Q1",
  },
  {
    kind: "open",
    subtopic: "Alternate symbols",
    difficulty: "medium",
    prompt:
      "Given $W = (P + Q)'\\,(R + S)\\,(TU')'$.\nWithout modifying the expression, sketch a circuit diagram with appropriate logic symbols (bubble-to-bubble matching) that shows clearly how logic **low** may be obtained at the output $W$, and state the conditions in words. (5 marks)",
    solution:
      "Draw the output AND in its alternate form (OR shape, bubbled inputs and output) so it reads \"W = 0 when any term is 0\", then match bubbles: a NOR for $(P + Q)'$, the alternate OR symbol for $R + S$, a NAND for $(TU')'$ and an inverter with its bubble on the input for $U'$. Result: $W = 0$ when ($P = 1$ or $Q = 1$), or ($R = 0$ and $S = 0$), or ($T = 1$ and $U = 0$).",
    modelAnswer:
      "$W$ is a 3-input AND of three terms. To show when $W = 0$, draw the output gate with an output bubble: the alternate AND symbol (OR shape, bubbles on all inputs and the output): \"$W = 0$ when any of its inputs is 0\". Then make every gate that drives a bubbled input have a bubbled output:\n- $(P + Q)'$: standard NOR (OR shape, output bubble): \"0 when $P = 1$ or $Q = 1$\".\n- $(R + S)$: alternate OR symbol (AND shape, bubbles on inputs and output): \"0 when $R = 0$ and $S = 0$\".\n- $(TU')'$: standard NAND (output bubble): \"0 when $T = 1$ and $U' = 1$\". $U'$ drives a plain input, so draw its inverter with the bubble on the input: \"$U' = 1$ when $U = 0$\".\nSo $W = 0$ when ($P = 1$ or $Q = 1$), or ($R = 0$ and $S = 0$), or ($T = 1$ and $U = 0$). Check: $W' = (P + Q) + R'S' + TU'$.",
    modelFigures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["P", "Q", "R", "S", "T", "U"],
          gates: [
            { id: "G1", type: "NOR", in: ["P", "Q"] },
            { id: "G2", type: "NAND", in: ["!R", "!S"] },
            { id: "U'", type: "BUF", in: ["!U"] },
            { id: "G3", type: "NAND", in: ["T", "U'"] },
            { id: "W", type: "NOR", in: ["!G1", "!G2", "!G3"] },
          ],
          outputs: ["W"],
        },
        caption: "Every bubbled output drives a bubbled input; the output bubble shows W is asserted low.",
      },
    ],
    rubric: [
      { point: "Output gate drawn as OR shape with bubbled inputs and output (alternate AND)", marks: 2 },
      { point: "Driving gates chosen so all bubbles match (NOR, alternate OR, NAND, inverter with input bubble)", marks: 2 },
      { point: "Correct statement of when W = 0", marks: 1 },
    ],
    source: "Style: PYP 2017-18 S1 Q1(d)",
  },
  // ------------------------------------------------------------------ XOR, parity, ICs
  {
    kind: "short",
    subtopic: "XOR & parity",
    difficulty: "medium",
    prompt: "Simplify $X = (A \\oplus B) \\oplus AB$ to a single gate expression in $A$ and $B$.",
    accept: ["A + B"],
    match: "expr",
    vars: ["A", "B"],
    minimal: true,
    placeholder: "e.g. A'B",
    solution:
      "Tabulate: \n- $AB = 00$: $0 \\oplus 0 = 0$\n- $01$: $1 \\oplus 0 = 1$\n- $10$: $1 \\oplus 0 = 1$\n- $11$: $0 \\oplus 1 = 1$\nThat is the OR function: $X = A + B$.\nAlgebraically: $A \\oplus B$ and $AB$ are never 1 together, and XOR of two disjoint terms equals their OR: $X = AB' + A'B + AB = A + B$.",
    source: "Original (lecture 3-53)",
  },
  {
    kind: "mcq",
    subtopic: "XOR & parity",
    difficulty: "medium",
    prompt:
      "A link sends 4 data bits $D_3D_2D_1D_0$ plus an **even**-parity bit $P$. The receiver uses the checker below ($E = 1$ signals an error). Which received word (written $D_3D_2D_1D_0\\ P$) makes $E = 1$?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["D3", "D2", "D1", "D0", "P"],
          gates: [
            { id: "G1", type: "XOR", in: ["D3", "D2"] },
            { id: "G2", type: "XOR", in: ["D1", "D0"] },
            { id: "G3", type: "XOR", in: ["G1", "G2"] },
            { id: "E", type: "XOR", in: ["G3", "P"] },
          ],
          outputs: ["E"],
        },
      },
    ],
    options: ["1011 1", "0110 0", "1101 0", "1111 0", "0000 0"],
    answer: 2,
    solution:
      "The XOR tree outputs 1 when an **odd** number of its five inputs are 1. With even parity every valid word has an even number of 1s, so $E = 1$ exactly when the count is odd.\n- 1011 1: four 1s → $E = 0$\n- 0110 0: two → 0\n- **1101 0: three → $E = 1$**\n- 1111 0: four → 0\n- 0000 0: zero → 0",
    source: "Style: lecture 3-56 (parity checker)",
  },
  {
    kind: "mcq",
    subtopic: "XOR & parity",
    difficulty: "medium",
    prompt: "A circuit must output 1 when two 4-bit words $A_3..A_0$ and $B_3..B_0$ are equal. Which gate arrangements work?\n- (P) four XNOR gates ($A_i$, $B_i$) feeding a 4-input AND\n- (Q) four XOR gates feeding a 4-input AND\n- (R) four XOR gates feeding a 4-input NOR\n- (S) four XNOR gates feeding a 4-input OR",
    options: ["P only", "Q only", "P and R only", "R and S only", "P, R and S"],
    answer: 2,
    solution:
      "Bit $i$ matches when $A_i \\oplus B_i = 0$, i.e. the XNOR is 1.\n- P: all XNORs 1 → AND = 1. Correct.\n- R: all XORs 0 → NOR = 1. Correct (De Morgan: $(x_3 + x_2 + x_1 + x_0)' = x_3'x_2'x_1'x_0'$).\n- Q is 1 only when **every** bit differs.\n- S is 1 when **any** bit matches.\nSo P and R only.",
    source: "Style: lecture 3-55 (XOR comparator)",
  },
  {
    kind: "mcq",
    subtopic: "Logic ICs",
    difficulty: "easy",
    prompt:
      "$Y = AB'$ is wired using inverter 1 of a 7404 and AND gate 1 of a 7408 (pin-outs below). Which connection list is correct?",
    figures: [
      {
        kind: "table",
        head: ["Pin", "7404", "7408"],
        rows: [
          [1, "1A", "1A"],
          [2, "1Y", "1B"],
          [3, "2A", "1Y"],
          [4, "2Y", "2A"],
          [7, "GND", "GND"],
          [14, "VCC", "VCC"],
        ],
      },
    ],
    options: [
      "$B$ → 7404 pin 1; 7404 pin 2 → 7408 pin 2; $A$ → 7408 pin 1; $Y$ at 7408 pin 3; pin 14 to $V_{CC}$ and pin 7 to GND on both chips",
      "$B$ → 7404 pin 1; 7404 pin 2 → 7408 pin 2; $A$ → 7408 pin 1; $Y$ at 7408 pin 4; pin 14 to $V_{CC}$ and pin 7 to GND on both chips",
      "$B$ → 7404 pin 2; 7404 pin 1 → 7408 pin 2; $A$ → 7408 pin 1; $Y$ at 7408 pin 3; pin 14 to $V_{CC}$ and pin 7 to GND on both chips",
      "$B$ → 7404 pin 1; 7404 pin 2 → 7408 pin 2; $A$ → 7408 pin 1; $Y$ at 7408 pin 3; pin 7 to $V_{CC}$ and pin 14 to GND on both chips",
      "$B$ → 7404 pin 1; 7404 pin 2 → 7408 pin 3; $A$ → 7408 pin 1; $Y$ at 7408 pin 2; pin 14 to $V_{CC}$ and pin 7 to GND on both chips",
    ],
    answer: 0,
    solution:
      "Inverter 1 of the 7404 has input 1A = pin 1 and output 1Y = pin 2, so $B$ goes to pin 1 and $B'$ comes out of pin 2.\nAND gate 1 of the 7408 has inputs 1A = pin 1, 1B = pin 2 and output 1Y = pin 3: $A$ → pin 1, $B'$ → pin 2, $Y$ at pin 3.\nBoth chips need power: pin 14 = $V_{CC}$, pin 7 = GND.\nB uses pin 4 (gate 2's input), C reverses the inverter, D reverses the power pins (which would damage the chips), E swaps an input and the output of the AND.",
    source: "Style: lecture 3-60 / L3 practice Q2",
  },
];
