import type { Figure, Lesson } from "@/lib/sc1005/types";
import { blockSvg, muxSvg, SEG7, seg7Svg, signedCompSvg, svgWrap, block } from "../questions/comb-blocks";

const svg = (s: string, caption?: string): Figure => ({ kind: "svg", svg: s, caption });

const dec24 = blockSvg({ title: "2-to-4\ndecoder", left: [["i1", "i1"], ["i0", "i0"]], right: [["d0", "d0"], ["d1", "d1"], ["d2", "d2"], ["d3", "d3"]], bottom: [["e", "e"]], w: 90 });

function ferry(): string {
  const d = block(150, 14, { title: "dec2to4", left: [["i[1]", "R[1]"], ["i[0]", "R[0]"]], right: [["d[0]", "ramp 0"], ["d[1]", "ramp 1"], ["d[2]", "ramp 2"], ["d[3]", "ramp 3"]], bottom: [["en", ""]], w: 90 });
  const en = d.B[0];
  // FULL → inverter → en
  const parts = [d.svg];
  const y = en.y + 34;
  parts.push(
    `<line x1="${en.x}" y1="${en.y}" x2="${en.x}" y2="${y}" stroke="currentColor" stroke-width="1.5"/>`,
    `<line x1="${en.x}" y1="${y}" x2="${en.x - 30}" y2="${y}" stroke="currentColor" stroke-width="1.5"/>`,
    `<polygon points="${en.x - 30},${y} ${en.x - 52},${y - 8} ${en.x - 52},${y + 8}" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
    `<circle cx="${en.x - 33}" cy="${y}" r="3" fill="none" stroke="currentColor" stroke-width="1.3"/>`,
    `<line x1="${en.x - 52}" y1="${y}" x2="${en.x - 90}" y2="${y}" stroke="currentColor" stroke-width="1.5"/>`,
    `<text x="${en.x - 94}" y="${y + 4}" font-size="12" text-anchor="end" font-family="ui-monospace, Consolas, monospace" fill="currentColor">FULL</text>`,
  );
  return svgWrap(360, y + 16, parts.join(""));
}

const mux21: Figure = {
  kind: "circuit",
  circuit: {
    inputs: ["S", "I0", "I1"],
    gates: [
      { id: "t0", type: "AND", in: ["!S", "I0"] },
      { id: "t1", type: "AND", in: ["S", "I1"] },
      { id: "Y", type: "OR", in: ["t0", "t1"] },
    ],
    outputs: ["Y"],
  },
  caption: "2-to-1 MUX inside: $Y = S'I_0 + SI_1$",
};

const dec24Gates: Figure = {
  kind: "circuit",
  circuit: {
    inputs: ["e", "i1", "i0"],
    gates: [
      { id: "d0", type: "AND", in: ["e", "!i1", "!i0"] },
      { id: "d1", type: "AND", in: ["e", "!i1", "i0"] },
      { id: "d2", type: "AND", in: ["e", "i1", "!i0"] },
      { id: "d3", type: "AND", in: ["e", "i1", "i0"] },
    ],
    outputs: ["d0", "d1", "d2", "d3"],
  },
  caption: "2-to-4 decoder with enable: one AND gate per minterm",
};

export const combBlocksLesson: Lesson = {
  topic: "comb-blocks",
  bigPicture:
    "Real designs are not drawn gate by gate: they are assembled from a small catalogue of standard **combinational building blocks**, each of which is just a truth table you already know how to build. A **decoder** turns an $n$-bit code into a one-hot pattern (it generates every minterm), an **encoder** does the reverse, a **multiplexer** uses a select code to route one of many inputs to its output (it is a programmable function generator), a **comparator** decides $=$, $<$, $>$ and an **adder** block does arithmetic. The skills the exam tests are: knowing what each block does and how it is built inside, reading a function off a block diagram (decoder + OR, MUX with constants and inverted inputs on the data lines), building a function or a bigger block out of the given blocks (MUX trees, decoder expansion, a signed comparator from an unsigned comparator and a MUX), and turning a word problem (ferry ramps, countdown displays, seven-segment digits) into a block diagram using the two-step design process: capture the function, then convert it to a circuit.",
  sections: [
    {
      title: "The combinational design process",
      intuition:
        "A combinational circuit is a function: the same inputs always give the same outputs, in any order and at any time. Designing one is always the same two steps: capture what it must do, then turn that description into gates or blocks.",
      keyIdeas: [
        "**Combinational**: outputs depend only on the present inputs (no memory). Each input combination maps to exactly one output combination.",
        "**Step 1, capture the function**: a truth table when the input count is small, an equation when it is large (an 8-input function has $2^8 = 256$ rows).",
        "**Step 2A**: if you used a truth table, derive equations (canonical SOP, then minimise with algebra or K-maps). **Step 2B**: draw a circuit for each output equation.",
        "Motion-in-dark lamp: turn on ($F = 1$) when motion is sensed ($a = 1$) and it is dark ($b = 0$): $F = ab'$, one AND gate and one inverter.",
        "Pattern detectors are captured with one product term per position: three adjacent 1s in $abcdefgh$ gives $y = abc + bcd + cde + def + efg + fgh$ ($8 - 3 + 1 = 6$ terms).",
        "A **timing diagram** shows inputs changing over time; with ideal gates the output at each instant is just the function of the inputs at that instant.",
        "Large systems are built hierarchically from **blocks** (decoders, MUXes, comparators, adders) treated as black boxes with a known function, exactly like modules in Verilog.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: { inputs: ["a", "b"], gates: [{ id: "F", type: "AND", in: ["a", "!b"] }], outputs: ["F"] },
          caption: "Motion-in-dark detector: $F = ab'$",
        },
        {
          kind: "wave",
          signals: [
            { name: "a", wave: "00110011" },
            { name: "b", wave: "01010101" },
            { name: "F", wave: "00100010" },
          ],
          ticks: ["0", "1", "2", "3", "4", "5", "6", "7"],
          caption: "Timing diagram of $F = ab'$: F is 1 only while a = 1 and b = 0",
        },
      ],
      example: {
        problem: "Design a circuit with a 6-bit input $abcdef$ that outputs $y = 1$ when the input contains **at least two adjacent 0s**.",
        steps: [
          "Step 1: a 64-row truth table is unpleasant, so capture the function as an equation: one term for each place a pair of 0s can sit.",
          "Pairs can start at $a, b, c, d, e$: $6 - 2 + 1 = 5$ positions.",
          "$y = a'b' + b'c' + c'd' + d'e' + e'f'$.",
          "Step 2B: five 2-input AND gates with inverted inputs (or, by De Morgan, five 2-input NOR gates: $a'b' = (a + b)'$) feeding a 5-input OR gate.",
        ],
        answer: "$y = a'b' + b'c' + c'd' + d'e' + e'f'$, five NOR gates into a 5-input OR.",
      },
      pitfalls: [
        "Counting positions: a run of $k$ in an $n$-bit word can start at $n - k + 1$ places, not $n - k$.",
        "Do not reach for a 256-row truth table in an exam: capture big functions as equations or with blocks.",
      ],
      recall: [
        { q: "What makes a circuit combinational?", a: "Its outputs depend only on the present inputs: no stored state, so the same inputs always give the same outputs." },
        { q: "The two steps of the design process?", a: "1: capture the function (truth table or equation). 2: convert to a circuit (derive and minimise equations, then draw gates)." },
        { q: "Terms needed to detect four adjacent 1s in an 8-bit word?", a: "$8 - 4 + 1 = 5$ four-input AND terms, ORed together." },
      ],
    },
    {
      title: "Seven-segment decoders",
      intuition:
        "A seven-segment decoder is a multi-output truth table: four input bits, seven outputs, one per segment. Each segment is its own little K-map problem, and the unused BCD codes 10–15 are free don't cares.",
      visuals: ["seg7-decoder"],
      keyIdeas: [
        "Segments are named **a** (top) clockwise to **f** (top-left), with **g** in the middle.",
        "For each segment write the column of the truth table: e.g. segment **e** is lit for 0, 2, 6, 8.",
        "With BCD input ($0$–$9$ only), minterms 10–15 never occur: mark them **X** and use them to grow K-map groups.",
        "**Common cathode** displays need active-high segment outputs (1 = lit); **common anode** displays need active-low outputs (0 = lit), i.e. the complement of every column.",
        "The decoder is just seven separate minimal SOP (or POS) circuits sharing the same four inputs.",
      ],
      figures: [
        svg(seg7Svg("abcdefg"), "Segment names: a top, b/c right, d bottom, e/f left, g middle"),
        {
          kind: "table",
          head: ["Digit", "WXYZ", "a", "b", "c", "d", "e", "f", "g"],
          rows: Array.from({ length: 10 }, (_, d) => [d, d.toString(2).padStart(4, "0"), ..."abcdefg".split("").map((s) => (SEG7[d].includes(s) ? 1 : 0))]),
          caption: "BCD to seven-segment truth table (active-high); inputs 1010–1111 are don't cares",
        },
        { kind: "kmap", vars: ["W", "X", "Y", "Z"], values: "1010001010xxxxxx", groups: ["X'Z'", "YZ'"], caption: "Segment e $= \\sum m(0,2,6,8) + d(10\\text{–}15) = X'Z' + YZ'$" },
      ],
      example: {
        problem: "Find the minimal SOP for segment **g** (middle bar) of a BCD decoder.",
        steps: [
          "From the table, g is lit for 2, 3, 4, 5, 6, 8, 9 (dark for 0, 1, 7).",
          "$g = \\sum m(2,3,4,5,6,8,9) + d(10,11,12,13,14,15)$.",
          "The whole bottom half ($W = 1$) is 1 or X: group it as $W$.",
          "$m_2, m_3$ with $d_{10}, d_{11}$ give $X'Y$; $m_4, m_5$ with $d_{12}, d_{13}$ give $XY'$; $m_2, m_6$ with $d_{10}, d_{14}$ give $YZ'$.",
          "All 1s are covered: $g = W + X'Y + XY' + YZ'$.",
        ],
        answer: "$g = W + X'Y + XY' + YZ'$",
      },
      pitfalls: [
        "Check the display convention given in the question (does 7 light f? does 9 light d?). Use the table in the question, not memory.",
        "For an active-low display the output is 1 where the segment is **dark**: minimise the complement column.",
        "Don't cares may be used as 1s or 0s, but you never have to cover them.",
      ],
      recall: [
        { q: "How many outputs does a BCD-to-7-segment decoder have?", a: "Seven, one per segment (a–g)." },
        { q: "Why are inputs 10–15 don't cares?", a: "BCD digits only go up to 9, so those input codes never occur." },
        { q: "Common anode display: what logic level lights a segment?", a: "0 (active-low outputs)." },
      ],
    },
    {
      title: "Decoders: binary code to one-hot",
      intuition:
        "A decoder turns an $n$-bit number into $2^n$ wires, exactly one of which is high: the one whose index equals the number. Inside, each output is just an AND gate detecting one input combination, so a decoder hands you every minterm on a plate.",
      visuals: ["decoder-lab"],
      keyIdeas: [
        "An **$n$-to-$2^n$ decoder** has $n$ inputs and $2^n$ outputs; the output pattern is **one-hot** (exactly one output is 1).",
        "Output $d_k$ is minterm $m_k$ of the inputs, e.g. for a 2-to-4 decoder $d_2 = i_1 i_0'$.",
        "**Enable**: with $e = 0$ all outputs are 0; with $e = 1$ it decodes normally. So $d_k = e \\cdot m_k$.",
        "**Decoder + OR** implements any function in canonical SOP form: OR the outputs of the function's minterms ($F = \\sum m(\\dots)$).",
        "**Active-low outputs** (bubbles; the selected output is 0): feed the minterms into a **NAND** to get $\\sum m$; an AND of active-low outputs gives $\\prod M$ of the connected outputs.",
        "**Bigger decoders from smaller ones**: use the extra MSB(s) to drive the enables, e.g. two 3-to-8 decoders enabled by $A_3'$ and $A_3$ make a 4-to-16; five 2-to-4 decoders in a tree also make a 4-to-16.",
        "A **demultiplexer** (1 data input to one of $2^n$ outputs) is a decoder with the enable used as the data input.",
        "Applications: address decoding, one-of-$n$ lamp control (ferry ramps, New Year's countdown with a 6-to-64 decoder: 60 bulbs, 4 unused outputs).",
      ],
      figures: [
        svg(dec24, "2-to-4 decoder with enable e"),
        {
          kind: "table",
          head: ["e", "$i_1$", "$i_0$", "$d_3$", "$d_2$", "$d_1$", "$d_0$"],
          rows: [
            [0, "X", "X", 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0],
            [1, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 0, 0, 0],
          ],
          caption: "Truth table: one-hot outputs when enabled, all 0 when disabled",
        },
        dec24Gates,
      ],
      example: {
        problem:
          "(Tutorial 6 Q3 style) A ferry has four boarding ramps. A 2-bit number $R$ says which ramp to use and $FULL = 1$ when all ramps are full. Exactly one green light (over the chosen ramp) must be on, and none when the ferry is full. Sketch the block diagram using one 2-to-4 decoder with enable.",
        figures: [svg(ferry(), "Ferry ramp controller")],
        steps: [
          "One-hot lights from a 2-bit number: that is precisely a 2-to-4 decoder. Connect $R[1{:}0]$ to the decoder inputs and $d_0 \\dots d_3$ to the four lights.",
          "All lights must be off when $FULL = 1$: use the enable, which forces every output to 0.",
          "The enable is active-high, so it must be 1 when the ferry is **not** full: $en = FULL'$ (an inverter).",
          "In Verilog: `dec2to4 U1 (.i(R), .en(~FULL), .d(light));`",
        ],
        answer: "Decoder inputs $R$, outputs to the lights, enable $= FULL'$.",
      },
      pitfalls: [
        "Number of outputs is $2^n$, not $2n$: a 3-input decoder has 8 outputs.",
        "Connecting a signal directly to an active-high enable when it should disable the block: invert it.",
        "When expanding decoders, the enables must be mutually exclusive, or two outputs light at once.",
        "With active-low outputs, an OR gate of the outputs does **not** give $\\sum m$ (it gives 1 almost always).",
      ],
      recall: [
        { q: "Output $d_5$ of a 3-to-8 decoder (inputs $ABC$) equals?", a: "$m_5 = AB'C$ (times the enable if there is one)." },
        { q: "How do you implement $F = \\sum m(1,2,4,7)$ with a decoder?", a: "3-to-8 decoder, OR together outputs $d_1, d_2, d_4, d_7$ (this is $A \\oplus B \\oplus C$)." },
        { q: "How many 2-to-4 decoders build a 4-to-16 decoder?", a: "Five: one decodes the MSBs and enables one of four that decode the LSBs." },
        { q: "What is a demultiplexer in decoder terms?", a: "A decoder with enable, where the enable is the data input." },
      ],
    },
    {
      title: "Encoders and priority encoders",
      intuition:
        "An encoder is the reverse of a decoder: it takes a one-hot set of lines and outputs the index of the active one. Real inputs (keys, interrupt requests) are not always one-hot, so a priority encoder decides which active input wins.",
      visuals: ["priority-encoder"],
      keyIdeas: [
        "A **$2^n$-to-$n$ encoder** outputs the binary index of its single active input. Built from OR gates: bit $j$ of the output is the OR of all inputs whose index has bit $j$ set. For 4-to-2: $Y_1 = I_2 + I_3$, $Y_0 = I_1 + I_3$.",
        "If two inputs are active, the plain encoder ORs their codes and outputs garbage (e.g. $I_1$ and $I_2$ give $11$, the code of $I_3$).",
        "If no input is active, the plain encoder outputs 0, indistinguishable from $I_0$ being active.",
        "A **priority encoder** outputs the index of the highest-priority active input (usually the highest index) and a **valid** output $V$ = OR of all inputs.",
        "4-to-2 priority encoder ($I_3$ highest): $Y_1 = I_3 + I_2$, $Y_0 = I_3 + I_2'I_1$, $V = I_3 + I_2 + I_1 + I_0$.",
      ],
      formulas: ["Y_1 = I_3 + I_2,\\qquad Y_0 = I_3 + I_2'I_1,\\qquad V = I_3 + I_2 + I_1 + I_0"],
      figures: [
        {
          kind: "table",
          head: ["$I_3$", "$I_2$", "$I_1$", "$I_0$", "$Y_1$", "$Y_0$", "V"],
          rows: [
            [0, 0, 0, 0, "X", "X", 0],
            [0, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, "X", 0, 1, 1],
            [0, 1, "X", "X", 1, 0, 1],
            [1, "X", "X", "X", 1, 1, 1],
          ],
          caption: "4-to-2 priority encoder: X on an input means it is ignored (masked by a higher one)",
        },
      ],
      example: {
        problem: "An 8-to-3 priority encoder ($I_7$ highest) receives $I_7 \\dots I_0 = 0101\\,0010$. What are $Y_2Y_1Y_0$ and $V$? What would a plain OR encoder output?",
        steps: [
          "Active inputs: $I_6$, $I_4$, $I_1$.",
          "Priority encoder: the highest is $I_6$, so $Y = 110$, $V = 1$.",
          "Plain encoder: OR of the codes $110 + 100 + 001 = 111$, the code of $I_7$, which is not even active.",
        ],
        answer: "Priority encoder: $110$, $V = 1$. Plain encoder: $111$ (wrong).",
      },
      pitfalls: [
        "Check which end has priority: some questions give $I_0$ the highest priority.",
        "Without a valid output, \"no input\" and \"$I_0$ active\" look the same.",
      ],
      recall: [
        { q: "Equations of a plain 4-to-2 encoder?", a: "$Y_1 = I_2 + I_3$, $Y_0 = I_1 + I_3$." },
        { q: "What does the valid output V of a priority encoder do?", a: "It is 1 when at least one input is active, distinguishing \"none\" from \"$I_0$\"." },
        { q: "4-to-2 priority encoder $Y_0$?", a: "$Y_0 = I_3 + I_2'I_1$." },
      ],
    },
    {
      title: "Multiplexers",
      intuition:
        "A multiplexer is a digitally controlled switch, like a rail-yard switch: the select code chooses which of the data inputs is connected to the single output. Inside, the select lines are decoded into minterms and each minterm gates one data input.",
      visuals: ["mux-path"],
      keyIdeas: [
        "A **$2^n$-to-1 MUX** has $2^n$ data inputs, $n$ select lines and one output. An $N$-input MUX needs $\\lceil \\log_2 N \\rceil$ select bits.",
        "2-to-1: $Y = S'I_0 + SI_1$. 4-to-1: $Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3$. In general $Y = \\sum_k m_k(S)\\,I_k$.",
        "Built as AND-OR: one AND gate per data input (the select minterm times $I_k$) and one OR gate. Only one AND gate can be enabled at a time.",
        "**Bus MUX**: an $m$-bit 2-to-1 MUX is $m$ single-bit 2-to-1 MUXes sharing the same select line.",
        "**MUX trees**: a large MUX from small ones. A $2^n$-to-1 MUX from 2-to-1 MUXes needs $2^n - 1$ of them; the LSB of the select drives the first level.",
        "A MUX with an **enable**: output forced to 0 when disabled ($Y = EN \\cdot (\\dots)$).",
        "In Verilog a 2-to-1 MUX is `assign y = sel ? x1 : x0;` and a 4-to-1 MUX is a `case (sel)` in an `always @*` block.",
      ],
      formulas: ["Y = S'I_0 + SI_1", "Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3"],
      figures: [svg(muxSvg(["I0", "I1", "I2", "I3"], ["S1", "S0"], "Y"), "4-to-1 MUX symbol: $Y = I_{S_1S_0}$"), mux21],
      example: {
        problem: "How many 2-to-1 MUXes are needed to build a 16-to-1 MUX, and which select bit drives the first level?",
        steps: [
          "Level 1 pairs up the 16 inputs: 8 MUXes, all controlled by $S_0$ (the LSB), because $I_{2k}$ and $I_{2k+1}$ differ only in $S_0$.",
          "Level 2: 4 MUXes on $S_1$; level 3: 2 MUXes on $S_2$; level 4: 1 MUX on $S_3$.",
          "Total $8 + 4 + 2 + 1 = 15 = 16 - 1$.",
        ],
        answer: "15 MUXes; $S_0$ drives the first level.",
      },
      pitfalls: [
        "Getting the select order wrong: $S_1$ is the MSB, so $S_1S_0 = 10$ selects $I_2$, not $I_1$.",
        "A MUX is not a decoder: it has one output; the decoder has $2^n$.",
      ],
      recall: [
        { q: "Select lines for a 64-input MUX?", a: "6." },
        { q: "2-to-1 MUX equation?", a: "$Y = S'I_0 + SI_1$." },
        { q: "2-to-1 MUXes in a 32-to-1 tree?", a: "31." },
      ],
    },
    {
      title: "Implementing functions with multiplexers",
      intuition:
        "Because a MUX passes the data line chosen by its select code, putting the right constants (or simple functions of the leftover variables) on the data lines turns it into any function you like: the MUX is a look-up table.",
      visuals: ["mux-function"],
      keyIdeas: [
        "**All $n$ variables on the selects** ($2^n$-to-1 MUX): each data line is the truth-table value $F(m_k)$, a constant 0 or 1.",
        "**$n - 1$ variables on the selects**: each data line covers a pair of minterms differing in the last variable $v$. Compare $F$ on the pair: $00 \\to 0$, $11 \\to 1$, $01 \\to v$, $10 \\to v'$ (needs an inverter).",
        "**Fewer variables on the selects**: each data line is the residual function of the remaining variables (Shannon expansion $F = x'F(x{=}0) + xF(x{=}1)$), possibly needing gates.",
        "Choosing which variable goes on the select can make the data-line logic simpler (e.g. only an AND and a NOR, no inverters).",
        "**Reading a MUX with constants** (Tutorial 6 Q1): write $Y = \\sum m_k(S)\\,I_k$, substitute the data lines, drop the $I_k = 0$ terms, then minimise.",
      ],
      formulas: ["F(x, y, z) = x'\\,F(0, y, z) + x\\,F(1, y, z)"],
      figures: [
        svg(muxSvg(["0", "C", "C'", "1"], ["A", "B"], "F"), "F(A,B,C) with a 4-to-1 MUX: data lines 0, C, C', 1"),
        {
          kind: "table",
          head: ["A B", "F(C=0)", "F(C=1)", "data line"],
          rows: [
            ["0 0", 0, 0, "$I_0 = 0$"],
            ["0 1", 0, 1, "$I_1 = C$"],
            ["1 0", 1, 0, "$I_2 = C'$"],
            ["1 1", 1, 1, "$I_3 = 1$"],
          ],
          caption: "Pair the rows by C and compare: this MUX gives $F = \\sum m(3, 4, 6, 7)$",
        },
      ],
      example: {
        problem: "Implement $F(A,B,C,D) = \\sum m(0, 3, 5, 6, 9, 10, 12, 15)$ with an 8-to-1 MUX (selects $ABC$) and one inverter.",
        steps: [
          "Pair the minterms by $D$: $I_k$ covers $m_{2k}$ ($D = 0$) and $m_{2k+1}$ ($D = 1$).",
          "$I_0$: $m_0 = 1, m_1 = 0$ → $D'$. $I_1$: $m_2 = 0, m_3 = 1$ → $D$. $I_2$: $m_4 = 0, m_5 = 1$ → $D$. $I_3$: $m_6 = 1, m_7 = 0$ → $D'$.",
          "$I_4$: $m_8 = 0, m_9 = 1$ → $D$. $I_5$: $m_{10} = 1, m_{11} = 0$ → $D'$. $I_6$: $m_{12} = 1, m_{13} = 0$ → $D'$. $I_7$: $m_{14} = 0, m_{15} = 1$ → $D$.",
          "One inverter makes $D'$ for lines 0, 3, 5, 6. (This $F$ is the 4-input even-parity function, which no K-map can simplify, yet the MUX does it in one chip.)",
        ],
        answer: "$I_0 \\dots I_7 = D', D, D, D', D, D', D', D$",
      },
      pitfalls: [
        "Listing the data lines in the wrong order ($I_7$ first): read the question's order carefully.",
        "Mixing up $v$ and $v'$: if $F$ is 1 for the **upper** minterm of the pair ($v = 1$), the line is $v$.",
        "When reading a MUX, remember the data line can itself be a variable: $I_1 = a'$ contributes $S_1'S_0a'$.",
      ],
      recall: [
        { q: "With $n-1$ variables on the selects, what can a data line be?", a: "0, 1, $v$ or $v'$, where $v$ is the remaining variable." },
        { q: "Minimal SOP of a 4-to-1 MUX with $I_0 = 0$, $I_1 = 1$, $I_2 = 1$, $I_3 = 1$ (selects $AB$)?", a: "$F = A + B$." },
        { q: "Why might you choose a particular variable for the select line?", a: "It can make the residual functions on the data lines simpler (fewer gates, no inverters)." },
      ],
    },
    {
      title: "Comparators, adders and signed comparison",
      intuition:
        "A comparator answers equal / less / greater for two numbers. Equality is a bitwise XNOR followed by an AND; magnitude works from the MSB down. Signed numbers break an unsigned comparator only through the sign bit, which is why a small MUX on the sign bits fixes it.",
      visuals: ["signed-compare"],
      keyIdeas: [
        "Bit equality: $e_i = A_i \\odot B_i = (A_i \\oplus B_i)'$. **Equality**: $(A = B) = e_{n-1}\\cdots e_1e_0$.",
        "**Magnitude** (unsigned): $A > B$ when the first bit (from the MSB) where they differ has $A_i = 1, B_i = 0$: $A > B = A_{n-1}B_{n-1}' + e_{n-1}A_{n-2}B_{n-2}' + e_{n-1}e_{n-2}A_{n-3}B_{n-3}' + \\dots$",
        "2-bit: $A > B = A_1B_1' + A_1A_0B_0' + A_0B_1'B_0'$.",
        "**Signed (two's complement) comparison from an unsigned comparator**: compare the lower $n-1$ bits unsigned ($U$), and use the two sign bits $\\{X_{n-1}, Y_{n-1}\\}$ as the select of a 4-to-1 MUX. Equal signs: the lower bits decide ($U$, no inversion, because both numbers carry the same $-2^{n-1}$ weight). Different signs: the answer is a constant.",
        "**Adder block**: an $n$-bit adder adds $A + B + C_{in}$ giving $S$ and $C_{out}$. **Adder–subtractor**: XOR each $B_i$ with $SUB$ and set $C_{in} = SUB$, so $SUB = 1$ computes $A + B' + 1 = A - B$.",
        "Blocks compose: a BCD adder is two 4-bit adder blocks plus correction logic; a wide comparator is narrower comparators cascaded.",
      ],
      formulas: ["(A = B) = \\prod_i (A_i \\odot B_i)", "A > B = A_1B_1' + A_1A_0B_0' + A_0B_1'B_0' \\quad (2\\text{-bit})"],
      figures: [
        svg(signedCompSvg(["U", "1", "0", "U"], 5, "W"), "PYP 2021-22 Q4 idea: W = 1 when X ≥ Y for 5-bit two's complement, from umc4 (U = A ≥ B) and a 4-to-1 MUX"),
        {
          kind: "table",
          head: ["$X_4$", "$Y_4$", "meaning", "$X \\ge Y$?", "data line"],
          rows: [
            [0, 0, "both $\\ge 0$", "lower bits decide", "$D_0 = U$"],
            [0, 1, "$X \\ge 0 > Y$", "always", "$D_1 = 1$"],
            [1, 0, "$X < 0 \\le Y$", "never", "$D_2 = 0$"],
            [1, 1, "both $< 0$", "lower bits decide", "$D_3 = U$"],
          ],
        },
      ],
      example: {
        problem: "Using the circuit above, find $W$ for $X = 11100$ and $Y = 11010$. Check against the signed values.",
        steps: [
          "Signed values: $X = -16 + 12 = -4$, $Y = -16 + 10 = -6$, so $X \\ge Y$ should be true.",
          "$S = \\{X_4, Y_4\\} = 11$, so the MUX passes $D_3 = U$.",
          "$U = (1100 \\ge 1010) = (12 \\ge 10) = 1$.",
          "$W = 1$ ✓. (An unsigned comparison of all 5 bits would also say $28 \\ge 26$; it is the mixed-sign cases where an unsigned comparator fails.)",
        ],
        answer: "$W = 1$",
      },
      pitfalls: [
        "Inverting $U$ for two negative numbers: in two's complement, $-4 > -6$ and $1100 > 1010$ agree.",
        "Swapping $D_1$ and $D_2$: check which sign bit is the MSB of the select.",
        "Unsigned comparison of signed numbers: $X = 01000$ (+8) vs $Y = 11000$ (−8) gives the wrong answer.",
      ],
      recall: [
        { q: "Gate that tests one bit pair for equality?", a: "XNOR." },
        { q: "In the signed comparator, what do the MUX select lines see?", a: "The two sign bits $\\{X_{n-1}, Y_{n-1}\\}$." },
        { q: "How does an adder block subtract?", a: "Invert $B$ (XOR with SUB = 1) and set the carry-in to 1: $A + B' + 1 = A - B$." },
      ],
    },
  ],
  playbook: [
    "If a MUX has constants or variables on its data lines, write $Y = \\sum m_k(S)\\,I_k$, substitute, drop the zero terms, then K-map it.",
    "If asked to implement $F$ with an $(n-1)$-select MUX, pair the minterms by the leftover variable and map each pair to 0, 1, $v$ or $v'$.",
    "If outputs of a decoder feed an OR gate, $F = \\sum m$ of those outputs; active-low outputs into a NAND also give $\\sum m$; into an AND they give $\\prod M$.",
    "If you see \"one-hot\", \"one of $n$ lights\" or \"exactly one active\", reach for a decoder; if all must go off on some condition, use the enable (inverted if needed).",
    "If several inputs can be active and an index is needed, use a priority encoder and say which input has priority; add a valid output.",
    "If you must compare signed numbers with an unsigned comparator, put the sign bits on a MUX select: equal signs pass the comparator output, different signs pass constants.",
    "If asked how many small blocks build a big one, draw the tree: $2^n - 1$ two-to-one MUXes for $2^n$ inputs; $1 + 4$ two-to-four decoders for a 4-to-16.",
    "If a seven-segment segment is asked for with BCD input, use minterms 10–15 as don't cares, and complement the column for a common-anode display.",
    "If the question is a word problem, do the two-step process: capture the function (table/equation/blocks), then convert, and label every signal on the block diagram.",
  ],
};
