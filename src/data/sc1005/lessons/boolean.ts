import type { Lesson } from "@/lib/sc1005/types";

export const booleanLesson: Lesson = {
  topic: "boolean",
  bigPicture:
    "Every digital circuit, from a parity checker to a CPU, is built from a handful of **logic gates**, and **Boolean algebra** is the language for describing, analysing and simplifying them. This chapter runs in a loop: a gate's behaviour is fixed by its **truth table**; a network of gates has a **Boolean expression** you can read straight off the diagram (and you can draw the diagram straight from an expression); real gates take time to switch, so outputs follow inputs only after a **propagation delay** and can glitch; the **theorems** (absorption, consensus, De Morgan) let you shrink an expression so the circuit needs fewer gates; **NAND** and **NOR** are universal, so any circuit can be rebuilt from one gate type; **alternate symbols** and **bubble-to-bubble matching** make a diagram say *when* the output is 0 or 1; and **XOR/XNOR** give comparators and parity generators/checkers. Exam questions mix these: read a circuit, sketch its waveforms with gate delays, simplify algebraically, count NAND/NOR gates, redraw with matched bubbles.",
  sections: [
    {
      title: "Logic levels, the basic gates and truth tables",
      intuition:
        "A Boolean variable can only be 0 or 1, so a gate is completely described by listing its output for every input combination. That list is the truth table, and it has $2^N$ rows for $N$ inputs.",
      visuals: ["gate-playground"],
      keyIdeas: [
        "Boolean constants: 0/1 = LOW/HIGH = FALSE/TRUE. Electrically each level is a **voltage range**: TTL input LOW is 0–0.8 V and HIGH is 2.0–5 V; a 74AC CMOS input is LOW below 1.5 V and HIGH above 3.5 V. Voltages in between are **indeterminate** and must not be used.",
        "**OR** ($X = A + B$, logical addition): output is 1 if **at least one** input is 1.",
        "**AND** ($X = A\\cdot B = AB$, logical multiplication): output is 1 only if **all** inputs are 1.",
        "**NOT** (inverter, $X = A'$): output is the complement of its single input. The bubble on the symbol means inversion.",
        "**Buffer** ($X = A$): no change in logic; used to boost drive strength or add delay.",
        "A truth table lists all $2^N$ input combinations in **binary counting order** (first input = MSB), so the row number equals the input pattern read as a binary number.",
        "Multi-input AND/OR work the same way: a 3-input AND is 1 only on row 111, a 3-input OR is 0 only on row 000.",
        "A 2-input truth table has 4 rows and each row's output can be 0 or 1, so there are $2^4 = 16$ different 2-input functions (in general $2^{2^N}$ for $N$ inputs).",
        "Logic behaviour can be described by a truth table or a timing diagram; a circuit by an expression or a circuit diagram. A timing diagram that visits every input combination gives the whole truth table: read the output during each input pattern.",
        "An output may drive one or more inputs, but outputs must **not** be connected together unless they are designed for it (open-drain or tri-state outputs).",
      ],
      figures: [
        {
          kind: "table",
          head: ["A", "B", "A·B (AND)", "A+B (OR)", "A' (NOT A)"],
          rows: [
            [0, 0, 0, 0, 1],
            [0, 1, 0, 1, 1],
            [1, 0, 0, 1, 0],
            [1, 1, 1, 1, 0],
          ],
          caption: "The basic operations. Read AND as \"all\", OR as \"any\".",
        },
        {
          kind: "table",
          head: ["Family", "Logic 0 (input)", "Indeterminate", "Logic 1 (input)"],
          rows: [
            ["TTL (5 V)", "0 – 0.8 V", "0.8 – 2.0 V", "2.0 – 5.0 V"],
            ["CMOS 74AC (5 V)", "0 – 1.5 V", "1.5 – 3.5 V", "3.5 – 5.0 V"],
          ],
          caption: "Typical logic-level voltage ranges.",
        },
      ],
      example: {
        problem: "An unknown 2-input gate is either an AND gate or an OR gate. Which input combinations tell you which one it is?",
        steps: [
          "Compare the two truth tables row by row: on 00 both give 0, on 11 both give 1.",
          "On 01 and 10 they differ: AND gives 0, OR gives 1.",
          "So apply $A \\ne B$ (01 or 10). Output 1 means OR, output 0 means AND.",
        ],
        answer: "Apply 01 (or 10): output 1 ⇒ OR, output 0 ⇒ AND.",
      },
      pitfalls: [
        "The number of rows is $2^N$, not $2N$: a 4-input function has 16 rows.",
        "Listing rows out of binary order makes it easy to miss or repeat a combination; always count 000, 001, 010, …",
        "1.2 V at a TTL input is **neither** 0 nor 1; it is indeterminate.",
      ],
      recall: [
        { q: "When is a 3-input OR gate's output 0?", a: "Only when all three inputs are 0 (row 000)." },
        { q: "How many rows does the truth table of a 5-input function have?", a: "$2^5 = 32$." },
        { q: "What does a buffer do logically?", a: "Nothing: $X = A$. It only restores/strengthens the signal (and adds delay)." },
      ],
    },
    {
      title: "From circuit to expression, and from expression to circuit",
      intuition:
        "A gate diagram and a Boolean expression are two views of the same thing. Work from the inputs to the output, writing each gate's output as an expression of its inputs, and the final gate gives the whole expression; reverse the process to build a circuit.",
      visuals: ["expr-circuit"],
      keyIdeas: [
        "**Order of precedence**: complement of a single variable first, then expressions in parentheses, then AND, then OR. So $A + BC'$ means $A + (B\\cdot(C'))$.",
        "A bar (or prime) over a **group** inverts the whole group: $(BC)'$ is not $B'C'$.",
        "Circuit → expression: label every gate output with its expression, working left to right. An inverter after a gate puts the whole gate expression in brackets with a prime.",
        "Expression → circuit: one inverter for each complemented variable, one AND gate per product term, one OR gate to sum them (for SOP). E.g. $Y = AC + BC' + A'BC$ needs NOT $A$, NOT $C$, three AND gates and one 3-input OR.",
        "To evaluate an output for given inputs, substitute into the expression (or write the 0/1 level on every wire of the diagram).",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "B", "C", "D"],
            gates: [
              { id: "A'", type: "NOT", in: ["A"] },
              { id: "B+C", type: "OR", in: ["B", "C"] },
              { id: "(A+D)'", type: "NOR", in: ["A", "D"] },
              { id: "X", type: "AND", in: ["A'", "B+C", "(A+D)'"] },
            ],
            outputs: ["X"],
            showNets: true,
          },
          caption: "$X = A'(B + C)(A + D)'$, built gate by gate.",
        },
      ],
      example: {
        problem: "For $X = A'(B + C)(A + D)'$, find $X$ when $ABCD = 0110$, $1111$ and $0000$.",
        steps: [
          "$X = 1$ needs all three factors to be 1: $A' = 1$ (so $A = 0$), $B + C = 1$, and $(A + D)' = 1$ (so $A = 0$ and $D = 0$).",
          "$ABCD = 0110$: $A' = 1$, $B + C = 1$, $(0 + 0)' = 1$, so $X = 1$.",
          "$ABCD = 1111$: $A' = 0$, so $X = 0$ immediately.",
          "$ABCD = 0000$: $B + C = 0$, so $X = 0$.",
        ],
        answer: "$X = 1, 0, 0$ respectively.",
      },
      pitfalls: [
        "$A + B\\cdot C$ is $A + (BC)$, not $(A + B)C$: AND binds tighter than OR.",
        "A bubble at a gate output complements the **whole** gate: a NOR output is $(A + D)'$, which is not $A' + D'$.",
        "When counting gates for an expression, a shared complemented variable needs only one inverter.",
      ],
      recall: [
        { q: "Write $Y = A + (BC)'$ without the outer group bar.", a: "$A + B' + C'$ (De Morgan)." },
        { q: "How many gates (including inverters) implement $Y = AC + BC' + A'BC$ directly?", a: "6: NOT A, NOT C, three ANDs, one 3-input OR." },
        { q: "Which operation is done first in $A + BC'$?", a: "The complement of $C$, then the AND $BC'$, then the OR." },
      ],
    },
    {
      title: "Timing diagrams and propagation delay",
      intuition:
        "A timing diagram applies the truth table at every instant. Real gates are not instantaneous: each output changes only after a propagation delay, so a signal that passes through more gates arrives later, and paths of different lengths can produce short false pulses (glitches).",
      visuals: ["prop-delay"],
      keyIdeas: [
        "Ideal waveforms: in each time interval, read the input levels and apply the gate's truth table.",
        "**Propagation delay** $t_{pd}$: time from an input change to the resulting output change (measured at the 50% points). $t_{PLH}$ is for the output going LOW→HIGH, $t_{PHL}$ for HIGH→LOW.",
        "**Rise time** $t_r$ / **fall time** $t_f$: time for an edge to go between 10% and 90% of the swing.",
        "With several levels of gates, a change reaches the output after the **sum** of the delays along its path. With 50 ns per gate, a change that passes through 3 gates appears 150 ns later.",
        "If an input reaches the output gate by two paths of different lengths, the output can briefly take a wrong value: a **glitch** (hazard). The width of the glitch equals the difference in path delays.",
        "When sketching (exam style): mark the time axis in delay units, then propagate each gate in order of depth: an output can only change one delay after one of its inputs changed.",
      ],
      figures: [
        {
          kind: "wave",
          signals: [
            { name: "A", wave: "00110110" },
            { name: "B", wave: "01011000" },
            { name: "X=A'+B", wave: "11011001" },
          ],
          caption: "Ideal (zero-delay) waveforms for $X = A' + B$: in each interval apply the truth table.",
        },
        {
          kind: "wave",
          signals: [
            { name: "A", wave: "00000000" },
            { name: "B", wave: "00111111" },
            { name: "C", wave: "00111111" },
            { name: "BC", wave: "00011111" },
            { name: "A+BC", wave: "00001111" },
            { name: "Z", wave: "11111000" },
          ],
          ticks: ["-100", "-50", "0", "50", "100", "150", "200", "250"],
          marks: [2, 5],
          caption: "$Z = (A + BC)'$ built from AND → OR → NOT, 50 ns per gate. $ABC$ changes 000 → 011 at $t = 0$; $Z$ falls only at $t = 150$ ns.",
        },
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
          caption: "Glitch: $F = AB + A'C$ with $B = C = 1$ should stay 1, but when $A$ falls the $A'C$ path is one gate longer, so $F$ dips to 0 for one gate delay (20–30 ns).",
        },
      ],
      example: {
        problem:
          "$Z = (A + BC)'$ is built from an AND gate, an OR gate and an inverter in series, each with 50 ns delay. The inputs change from $ABC = 000$ to $011$ at $t = 0$. Describe $Z$.",
        steps: [
          "Before $t = 0$: $BC = 0$, $A + BC = 0$, so $Z = 1$. After everything settles: $BC = 1$, $A + BC = 1$, $Z = 0$.",
          "$B$ and $C$ rise at $t = 0$, so the AND output $BC$ rises one delay later, at $t = 50$ ns.",
          "The OR output follows $BC$ one delay later, at $t = 100$ ns.",
          "The inverter output $Z$ falls one more delay later, at $t = 150$ ns. There is only one path from $B, C$ to $Z$, so there is no glitch.",
        ],
        answer: "$Z$ stays 1 until $t = 150$ ns, then falls to 0.",
      },
      pitfalls: [
        "Do not move the output edge to the input edge: with delays, every output edge is shifted right by the path delay.",
        "Add delays along the path through which the change travels, not the total number of gates in the circuit.",
        "A glitch-free Boolean expression can still glitch in hardware: equal expressions are not equal waveforms when path delays differ.",
      ],
      recall: [
        { q: "Three gates in series each with $t_{pd} = 20$ ns. How long after an input change does the output change?", a: "60 ns." },
        { q: "What is a glitch?", a: "A short unwanted pulse at an output, caused by a change reaching a gate through paths with different delays." },
        { q: "Define rise time.", a: "The time for an edge to go from 10% to 90% of the voltage swing." },
      ],
    },
    {
      title: "Boolean theorems and algebraic simplification",
      intuition:
        "Fewer literals means fewer gates and gate inputs, so a simpler circuit is cheaper and more reliable. The theorems are the legal moves for shrinking an expression without changing its truth table.",
      visuals: ["equiv-checker"],
      keyIdeas: [
        "Single-variable: $X\\cdot0 = 0$, $X\\cdot1 = X$, $X\\cdot X = X$, $X\\cdot X' = 0$; $X + 0 = X$, $X + 1 = 1$, $X + X = X$, $X + X' = 1$; $(X')' = X$.",
        "Commutative and associative laws hold for both AND and OR.",
        "Distributive: $A(B + C) = AB + AC$ and also (unlike ordinary algebra) $A + BC = (A + B)(A + C)$.",
        "**Absorption**: $A + AB = A$ and $A(A + B) = A$. **Redundant complement**: $A + A'B = A + B$ and $A(A' + B) = AB$.",
        "**Consensus**: $AB + A'C + BC = AB + A'C$ (the term $BC$ is redundant).",
        "Consensus in words (lecture example): with $A$ = male, $B$ = classmate, $C$ = friend, everyone who is a classmate **and** a friend ($BC$) is already a male classmate ($AB$) or a female friend ($A'C$), so $BC$ adds nothing.",
        "Absorption in words: \"A must come; B may come with A\" is just \"A must come\" ($A + AB = A$); \"A must come; if A cannot, B must\" is \"A or B must come\" ($A + A'B = A + B$).",
        "You need to know and **apply** the theorems; you do not need to name or prove them.",
        "**Duality**: any identity stays true if you swap AND ↔ OR and 0 ↔ 1 throughout (do **not** complement the variables). Dual of $A + A'B = A + B$ is $A(A' + B) = AB$.",
        "Strategy: remove outer bars with De Morgan first, multiply out to SOP, then look for $X + X' = 1$ pairs, absorption and consensus. Check the answer on a few truth-table rows.",
      ],
      formulas: [
        "A + AB = A, \\qquad A + A'B = A + B",
        "AB + A'C + BC = AB + A'C",
        "A + BC = (A + B)(A + C)",
      ],
      example: {
        problem: "Simplify $X = A'B'C'D' + A'B'CD' + A'BCD' + ABCD' + AB'CD'$.",
        steps: [
          "Every term contains $D'$: $X = D'(A'B'C' + A'B'C + A'BC + ABC + AB'C)$.",
          "$A'B'C' + A'B'C = A'B'(C' + C) = A'B'$.",
          "Reuse $A'B'C$ (allowed because $X + X = X$) together with the three remaining terms: $A'B'C + A'BC + ABC + AB'C = C(A'B' + A'B + AB + AB') = C\\cdot1 = C$.",
          "So the bracket is $A'B' + C$, and $X = D'(A'B' + C) = A'B'D' + CD'$.",
        ],
        answer: "$X = A'B'D' + CD'$.",
      },
      pitfalls: [
        "$A + BC \\ne (A + B)C$. The correct factorisation is $A + BC = (A + B)(A + C)$.",
        "You may reuse a term ($X + X = X$) to complete two different groupings; this is often the trick in the long SOP simplifications.",
        "The dual is **not** the complement: you swap the operators and constants, but variables keep their primes.",
      ],
      recall: [
        { q: "Simplify $A + A'B$.", a: "$A + B$." },
        { q: "Which term is redundant in $XY' + X'Z + Y'Z$?", a: "$Y'Z$ (consensus of $XY'$ and $X'Z$)." },
        { q: "What is the dual of $X + 1 = 1$?", a: "$X\\cdot0 = 0$." },
      ],
    },
    {
      title: "De Morgan's theorems, NAND and NOR gates",
      intuition:
        "De Morgan's theorems say how to push an inversion through an AND or an OR: the operator flips and every variable is complemented. NAND and NOR are simply AND and OR with that inversion built in.",
      keyIdeas: [
        "De Morgan: $(A + B)' = A'B'$ and $(AB)' = A' + B'$. They generalise: $(A + B + C + \\dots)' = A'B'C'\\cdots$, $(ABC\\cdots)' = A' + B' + C' + \\cdots$.",
        "Recipe for a long bar: **break the bar and change the operator** under it; repeat from the outside in. Double bars cancel.",
        "De Morgan in words: \"lunch if A **or** B has money\" negates to \"no lunch if A has no money **and** B has no money\"; \"marriage if A **and** B agree\" negates to \"no marriage if A **or** B disagrees\".",
        "**NAND** $X = (AB)'$: output is 0 only when **all** inputs are 1.",
        "**NOR** $X = (A + B)'$: output is 1 only when **all** inputs are 0.",
        "Summary: OR → 1 if any input is 1; AND → 1 if all are 1; NOR → 0 if any input is 1; NAND → 0 if all are 1.",
      ],
      figures: [
        {
          kind: "table",
          head: ["A", "B", "(AB)' NAND", "A'+B'", "(A+B)' NOR", "A'B'"],
          rows: [
            [0, 0, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 0],
            [1, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 0, 0],
          ],
          caption: "Truth-table proof of both De Morgan theorems.",
        },
      ],
      formulas: ["(A + B)' = A'\\,B', \\qquad (AB)' = A' + B'", "(A + B + C + \\cdots)' = A'B'C'\\cdots, \\qquad (ABC\\cdots)' = A' + B' + C' + \\cdots"],
      example: {
        problem: "Simplify $[A(B + C')'D]'$.",
        steps: [
          "Outer bar over a product: $[A\\cdot(B + C')'\\cdot D]' = A' + [(B + C')']' + D'$.",
          "The double bar cancels: $[(B + C')']' = B + C'$.",
          "Result: $A' + B + C' + D'$.",
        ],
        answer: "$A' + B + C' + D'$.",
      },
      pitfalls: [
        "$A(B + C)' \\ne AB' + AC'$. De Morgan gives $(B + C)' = B'C'$, so $A(B + C)' = AB'C'$. Row $A = 1, B = 1, C = 0$ tells them apart: the left side is 0, the right side is 1.",
        "$(AB)' \\ne A'B'$ and $(A + B)' \\ne A' + B'$: when you break the bar you **must** change the operator.",
        "Work from the longest bar inwards and keep brackets: $(A + BC)' = A'(BC)' = A'(B' + C')$, not $A'B' + C'$.",
      ],
      recall: [
        { q: "When is a 3-input NAND output 0?", a: "Only when all three inputs are 1." },
        { q: "Apply De Morgan to $(A' + B)'$.", a: "$AB'$." },
        { q: "Simplify $[(A'B)'(C + D')]'$.", a: "$A'B + C'D$." },
      ],
    },
    {
      title: "Universal gates: NAND-only and NOR-only circuits",
      intuition:
        "A NAND with its inputs tied together is an inverter, and inverting a NAND gives AND; De Morgan turns a NAND with inverted inputs into OR. Since NOT, AND and OR can all be made, any Boolean function can be built from NANDs alone (and likewise NORs), which is how many ICs are built.",
      visuals: ["nand-nor-builder"],
      keyIdeas: [
        "From NAND: NOT $= $ NAND$(A, A)$ (1 gate); AND $=$ NAND followed by a NAND-inverter (2 gates); OR $=$ NAND$(A', B')$ (3 gates, since $(A'B')' = A + B$).",
        "From NOR: NOT $=$ NOR$(A, A)$ (1); OR $=$ NOR + NOR-inverter (2); AND $=$ NOR$(A', B')$ (3).",
        "**SOP → NAND–NAND**: a two-level AND–OR circuit becomes NAND–NAND with the same wiring, because $AB + CD = [(AB)'(CD)']'$. E.g. $AB + CD$ needs 3 two-input NANDs.",
        "**POS → NOR–NOR**: an OR–AND circuit becomes NOR–NOR, because $(A + B)(C + D) = [(A + B)' + (C + D)']'$. E.g. $(A + B)(C + D)$ needs 3 two-input NORs.",
        "Going the \"wrong\" way costs inverters: $(A + B)(C + D)$ with 2-input NANDs needs $4$ input inverters $+ 2$ NANDs for the sums $+ 2$ gates for the final AND $= 8$ gates.",
        "When converting gate by gate, two inverters in series cancel; remove them to reduce the count.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "B", "C", "D"],
            gates: [
              { id: "G1", type: "NAND", in: ["A", "B"] },
              { id: "G2", type: "NAND", in: ["C", "D"] },
              { id: "X", type: "NAND", in: ["G1", "G2"] },
            ],
            outputs: ["X"],
          },
          caption: "NAND–NAND realisation of $X = AB + CD$ (3 gates).",
        },
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "B", "C", "D"],
            gates: [
              { id: "G1", type: "NOR", in: ["A", "B"] },
              { id: "G2", type: "NOR", in: ["C", "D"] },
              { id: "X", type: "NOR", in: ["G1", "G2"] },
            ],
            outputs: ["X"],
          },
          caption: "NOR–NOR realisation of $X = (A + B)(C + D)$ (3 gates).",
        },
      ],
      example: {
        problem: "Implement $X = (A + B)(C + D)$ using only 2-input NAND gates. How many gates are needed?",
        steps: [
          "Each OR term: $A + B = (A'B')'$ = NAND of $A'$ and $B'$. The inverters are NANDs with tied inputs: 3 gates for $A + B$, 3 for $C + D$.",
          "The final AND of two signals: NAND them, then invert with one more NAND: 2 gates.",
          "No two inverters end up in series, so nothing cancels.",
          "Total: $3 + 3 + 2 = 8$ gates. (With 2-input NORs the same function needs only 3.)",
        ],
        answer: "8 two-input NAND gates.",
      },
      pitfalls: [
        "A NAND with tied inputs is an inverter, but it still counts as a gate in the total.",
        "Universal gates do **not** always reduce the gate count. OR from NANDs takes 3 gates and AND from NORs takes 3, so replacing gate by gate can grow a circuit; savings come only from inverter pairs that cancel.",
        "SOP maps neatly onto NAND–NAND; POS maps onto NOR–NOR. Using the other gate type on that form adds inverters.",
        "Check whether an input variable needs complementing: each complemented input costs an extra NAND/NOR used as an inverter.",
      ],
      recall: [
        { q: "How many 2-input NOR gates make an AND gate?", a: "3 (two inverters and a NOR)." },
        { q: "Why is $AB + CD$ a natural NAND–NAND circuit?", a: "$AB + CD = [(AB)'(CD)']'$: two NANDs feeding a NAND." },
        { q: "How do you make an inverter from a 2-input NOR?", a: "Tie both inputs together (or tie one input to 0)." },
      ],
    },
    {
      title: "Alternate logic symbols and bubble-to-bubble matching",
      intuition:
        "Every gate can be drawn two ways that mean the same truth table. Choosing the symbol so that bubbles meet bubbles lets you read the diagram aloud: a bubble means \"this signal does its job when it is 0\".",
      visuals: ["bubble-pushing"],
      keyIdeas: [
        "To get the **alternate symbol**: add a bubble where there is none and remove bubbles where there are some, on **every** input and the output, and swap the AND shape ↔ OR shape. This is De Morgan drawn as a picture.",
        "AND $= (A' + B')'$: OR shape with bubbles on inputs and output. OR $= (A'B')'$: AND shape with bubbles everywhere. NAND $= A' + B'$: OR shape with bubbled inputs. NOR $= A'B'$: AND shape with bubbled inputs.",
        "NOT: the bubble moves from the output to the input; the triangle stays.",
        "Reading rule: **say \"0\" where there is a bubble, \"1\" where there is none**. A NAND (standard) reads \"output is 0 when A and B are both 1\"; its alternate reads \"output is 1 when A or B is 0\".",
        "**Bubble-to-bubble matching**: choose symbols so that a bubbled output drives a bubbled input and a plain output drives a plain input. Then the whole diagram reads as one sentence.",
        "To show when the output is **1**, draw the output gate without an output bubble; to show when it is **0**, draw it with one, and then match bubbles backwards through the circuit.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Gate", "Standard", "Alternate", "Alternate reads as"],
          rows: [
            ["AND", "AB", "(A' + B')'", "output 0 when A = 0 or B = 0"],
            ["OR", "A + B", "(A'B')'", "output 0 when A = 0 and B = 0"],
            ["NAND", "(AB)'", "A' + B'", "output 1 when A = 0 or B = 0"],
            ["NOR", "(A + B)'", "A'B'", "output 1 when A = 0 and B = 0"],
          ],
          caption: "Standard and alternate forms (De Morgan).",
        },
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "B", "C", "D"],
            gates: [
              { id: "G1", type: "NAND", in: ["A", "B"] },
              { id: "G2", type: "NAND", in: ["C", "D"] },
              { id: "X", type: "OR", in: ["!G1", "!G2"] },
            ],
            outputs: ["X"],
          },
          caption: "The NAND–NAND circuit with its output NAND drawn as the alternate symbol: bubbles meet bubbles, so it reads \"X = 1 when A and B are 1, or C and D are 1\" ($X = AB + CD$).",
        },
      ],
      example: {
        problem:
          "In the circuit above, the output gate is a NAND. Describe when $X = 1$ and when $X = 0$, using the appropriate symbols.",
        steps: [
          "For $X = 1$: draw the output gate without an output bubble, i.e. as an OR with bubbled inputs. Its inputs G1, G2 are bubbled, matching the output bubbles of the two NANDs.",
          "Read: $X = 1$ when G1 = 0 **or** G2 = 0; G1 = 0 when $A = 1$ and $B = 1$; G2 = 0 when $C = 1$ and $D = 1$.",
          "For $X = 0$: draw the output gate as a standard NAND (output bubble, plain inputs). Then G1 and G2 should be drawn without output bubbles: their alternate symbols, OR shapes with bubbled inputs.",
          "Read: $X = 0$ when G1 = 1 and G2 = 1; G1 = 1 when $A = 0$ or $B = 0$; G2 = 1 when $C = 0$ or $D = 0$.",
        ],
        answer: "$X = 1$ when ($A = B = 1$) or ($C = D = 1$); $X = 0$ when ($A = 0$ or $B = 0$) and ($C = 0$ or $D = 0$).",
      },
      pitfalls: [
        "Changing the symbol does **not** change the gate or its truth table; it only changes how the diagram reads.",
        "When converting, change every input and the output; forgetting one bubble gives a different function.",
        "A bubbled output feeding a plain input is a mismatch: the reading breaks at that wire (it is still a valid circuit, just harder to read).",
      ],
      recall: [
        { q: "Alternate symbol for a NOR gate?", a: "An AND shape with bubbles on the inputs (no output bubble): $(A + B)' = A'B'$." },
        { q: "What does a bubble on an input tell you when reading a diagram?", a: "That input is active when it is 0 (say \"0\")." },
        { q: "An OR shape with bubbles on both inputs and the output is which gate?", a: "AND: $(A' + B')' = AB$." },
      ],
    },
    {
      title: "XOR, XNOR, parity generators/checkers and logic ICs",
      intuition:
        "XOR answers \"are these different?\" and, with more inputs, \"is the number of 1s odd?\". That makes it the gate for comparators and parity, and a chain of XORs is all a parity generator or checker needs.",
      visuals: ["parity-tree"],
      keyIdeas: [
        "**XOR**: $X = A \\oplus B = AB' + A'B$; output 1 when the inputs **differ**. **XNOR**: $X = (A \\oplus B)' = AB + A'B'$; output 1 when they are **equal**.",
        "Multi-input XOR is associative: $A \\oplus B \\oplus C = (A \\oplus B) \\oplus C$. It outputs 1 when an **odd** number of inputs are 1 (odd function).",
        "Useful identities: $A \\oplus 0 = A$, $A \\oplus 1 = A'$, $A \\oplus A = 0$, $A \\oplus A' = 1$.",
        "**Comparator**: two $n$-bit words are equal when every bit pair is equal: $n$ XNORs into an AND (or $n$ XORs into a NOR). An XOR output of 1 flags a bit that differs.",
        "**Even-parity generator**: $P = D_3 \\oplus D_2 \\oplus D_1 \\oplus D_0$ makes the total number of 1s (data + P) even. Odd parity uses the complement.",
        "**Parity checker**: XOR all received bits including $P$. For even parity the result $E = 1$ means an error. A single-bit error is always caught; two flipped bits cancel and go undetected.",
        "Logic ICs: small-scale ICs in 14-pin DIPs, e.g. 7400 (quad 2-input NAND), 7402 (quad NOR), 7404 (hex inverter), 7408 (quad AND), 7432 (quad OR), 7486 (quad XOR). Pin 14 = $V_{CC}$, pin 7 = GND. A **connection diagram** shows which pins are wired together, including power.",
      ],
      figures: [
        {
          kind: "table",
          head: ["A", "B", "A⊕B (XOR)", "(A⊕B)' (XNOR)"],
          rows: [
            [0, 0, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 1, 0, 1],
          ],
          caption: "XOR is 1 when the inputs differ; XNOR when they are equal.",
        },
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
          caption: "Even-parity checker for 4 data bits plus parity bit P: $E = 1$ signals an error. Without the last gate, G3 is the even-parity generator output.",
        },
        {
          kind: "table",
          head: ["Pin", "7408 (quad AND)", "7404 (hex NOT)"],
          rows: [
            [1, "1A", "1A"],
            [2, "1B", "1Y"],
            [3, "1Y", "2A"],
            [4, "2A", "2Y"],
            [5, "2B", "3A"],
            [6, "2Y", "3Y"],
            [7, "GND", "GND"],
            [8, "3Y", "4Y"],
            [9, "3A", "4A"],
            [10, "3B", "5Y"],
            [11, "4Y", "5A"],
            [12, "4A", "6Y"],
            [13, "4B", "6A"],
            [14, "VCC", "VCC"],
          ],
          caption: "Pin-outs used for the connection diagram of $Y = AB'$: $B$ → 7404 pin 1, 7404 pin 2 → 7408 pin 2, $A$ → 7408 pin 1, $Y$ = 7408 pin 3; pins 14 to $V_{CC}$ and 7 to GND on both chips.",
        },
      ],
      example: {
        problem: "Data $1011$ is sent with an even-parity bit. Find $P$, then say what the checker outputs if the receiver gets $1001$ with the same $P$.",
        steps: [
          "$P = 1 \\oplus 0 \\oplus 1 \\oplus 1 = 1$ (three 1s, so $P = 1$ makes four).",
          "Received word $1001$ with $P = 1$: $E = 1 \\oplus 0 \\oplus 0 \\oplus 1 \\oplus 1 = 1$.",
          "$E = 1$: odd number of 1s received, so an error is flagged (bit $D_1$ flipped).",
        ],
        answer: "$P = 1$; the checker gives $E = 1$ (error detected).",
      },
      pitfalls: [
        "XOR and OR differ only on row 11: OR gives 1, XOR gives 0.",
        "A multi-input XOR is not \"exactly one input is 1\"; it is \"an odd number of inputs are 1\".",
        "Parity detects any odd number of bit errors but never an even number, and it cannot tell which bit is wrong.",
        "In a connection diagram every IC needs $V_{CC}$ and GND connected even though they are not part of the logic.",
      ],
      recall: [
        { q: "Output of a 4-input XOR for input 1101?", a: "1 (three 1s, odd)." },
        { q: "Simplify $A \\oplus 1$.", a: "$A'$." },
        { q: "Which gate gives 1 exactly when two bits are equal?", a: "XNOR." },
      ],
    },
  ],
  playbook: [
    "**Circuit given, expression asked** → label each gate output left to right; an output bubble wraps the whole gate expression in a prime. Then simplify with De Morgan.",
    "**Waveforms with gate delays** → mark time in delay units; propagate gate by gate in order of depth (each output changes one delay after its input changed); look for two paths of different length into one gate: that is where a glitch appears.",
    "**\"Simplify algebraically\"** → De Morgan from the outside in to remove long bars, multiply out to SOP, then $X + X' = 1$, absorption $A + A'B = A + B$, consensus. Check two or three truth-table rows at the end.",
    "**Long SOP with many minterms** → group pairs that differ in one variable; reuse a term ($X + X = X$) when it helps two groupings.",
    "**NAND-only / NOR-only gate count** → SOP maps to NAND–NAND, POS to NOR–NOR (same wiring, no extra gates). Every complemented input or wrong-form conversion costs inverters; cancel inverter pairs.",
    "**\"Show how logic 0 (or 1) is obtained at the output\"** → pick the output symbol (bubble for 0, none for 1), then choose each earlier gate's symbol so bubbles meet bubbles, and read \"0\" at bubbles, \"1\" elsewhere.",
    "**Equality / mismatch detection** → XNOR per bit then AND (or XOR per bit then NOR).",
    "**Parity** → generator: XOR the data bits (complement for odd parity). Checker: XOR everything received including $P$; for even parity, 1 = error.",
    "**Connection diagram** → write pin numbers on every gate input/output from the datasheet table, and connect pin 14 to $V_{CC}$, pin 7 to GND on every chip.",
  ],
};
