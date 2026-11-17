import type { Figure, Lesson } from "@/lib/sc1005/types";
import { blockSvg, muxSvg, SEG7, seg7Svg, signedCompSvg, svgWrap, block } from "../questions/comb-blocks";

const svg = (s: string, caption?: string): Figure => ({ kind: "svg", svg: s, caption });

/** Hex digits A–F as in the Lecture 07 p.14 / Lab 3 Table 1 seven-segment truth table. */
const SEG_HEX: Record<number, string> = { ...SEG7, 10: "abcefg", 11: "cdefg", 12: "adef", 13: "bcdeg", 14: "adefg", 15: "aefg" };

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
  caption: "2-to-1 MUX inside (Lecture 07 p.24): $Y = S'I_0 + SI_1$",
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
  caption: "2-to-4 decoder with enable: one AND gate per input combination",
};

/** PYP 2018-19 S2 Q3(b): 2-4 decoder, four AND gates and an OR gate. */
const decMux: Figure = {
  kind: "circuit",
  circuit: {
    inputs: ["X1", "X0", "X2", "X3", "X4", "X5"],
    gates: [
      { id: "d0", type: "AND", in: ["!X1", "!X0"] },
      { id: "d1", type: "AND", in: ["!X1", "X0"] },
      { id: "d2", type: "AND", in: ["X1", "!X0"] },
      { id: "d3", type: "AND", in: ["X1", "X0"] },
      { id: "p0", type: "AND", in: ["d0", "X2"] },
      { id: "p1", type: "AND", in: ["d1", "X3"] },
      { id: "p2", type: "AND", in: ["d2", "X4"] },
      { id: "p3", type: "AND", in: ["d3", "X5"] },
      { id: "Y", type: "OR", in: ["p0", "p1", "p2", "p3"] },
    ],
    outputs: ["Y"],
  },
  caption: "PYP 2018-19 S2 Q3(b): decoder outputs $d_0 \\dots d_3$ (drawn as the decoder's AND gates) gate $X[2] \\dots X[5]$ into an OR",
};

export const combBlocksLesson: Lesson = {
  topic: "comb-blocks",
  bigPicture:
    "Real designs are not drawn gate by gate: they are built from a few **commonly used combinational circuits** (Lecture 07), each of which is just a truth table you already know how to build. A **seven-segment decoder** maps a 4-bit number to the segments that draw its digit, a **decoder** turns an $n$-bit number into a one-hot output (one AND gate per input combination, so it produces every minterm), and a **multiplexer** uses a select input to connect one of several inputs to its output. The past papers add a few more blocks treated as black boxes: a **priority encoder** given as a truth table, a 4-bit **unsigned comparator** and a 4-bit **adder**. The skills the exam tests are: knowing what each block does and how it is built inside, reading a function off a block diagram (decoder + OR gate, MUX with constants and inverted inputs on the data lines), building a function or a bigger block out of the given blocks (a full adder from a 3-to-8 decoder, a 5-to-32 decoder from smaller decoders, a signed comparator from an unsigned comparator and a MUX), and turning a word problem (ferry ramps, countdown displays, seven-segment digits) into a block diagram using the two-step design process: capture the function, then convert it to a circuit.",
  sections: [
    {
      title: "The combinational design process",
      intuition:
        "A combinational circuit is a function: the same inputs always give the same outputs, in any order and at any time. Designing one is always the same two steps: capture what it must do, then turn that description into gates or blocks.",
      keyIdeas: [
        "**Combinational**: outputs depend only on the present combination of the inputs. Each input combination maps to exactly one output combination.",
        "**Step 1, capture the function**: a truth table or equations, whichever makes sense for the application (an 8-input function has $2^8 = 256$ rows, too many for a table).",
        "**Step 2A**: if you used a truth table, create equations (then minimise with algebra or K-maps). **Step 2B**: for each output, draw the circuit for its equation.",
        "Motion-in-dark lamp: turn on ($F = 1$) when motion is sensed ($a = 1$) and there is no light ($b = 0$): $F = ab'$, one AND gate and one NOT gate.",
        "Three 1s pattern detector: one product term per position the pattern can sit at. Three adjacent 1s in $abcdefgh$ gives $y = abc + bcd + cde + def + efg + fgh$ ($8 - 3 + 1 = 6$ terms).",
        "A **timing diagram** shows the circuit's behaviour as time progresses: the output at any instant is calculated from the input values at that instant.",
        "Commonly used blocks (seven-segment decoder, decoder, multiplexer) are combined to build digital systems, exactly like module instances in Verilog.",
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
        { q: "What makes a circuit combinational?", a: "Its outputs depend only on the present input combination: the same inputs always give the same outputs." },
        { q: "The two steps of the design process?", a: "1: capture the function (truth table or equations). 2: convert to a circuit (create equations from the table, then a circuit for each output)." },
        { q: "Terms needed to detect four adjacent 1s in an 8-bit word?", a: "$8 - 4 + 1 = 5$ four-input AND terms, ORed together." },
      ],
    },
    {
      title: "Seven-segment decoders",
      intuition:
        "A seven-segment decoder is a multi-output truth table: four input bits, seven outputs, one per segment. Each segment is its own little K-map problem.",
      visuals: ["seg7-decoder"],
      keyIdeas: [
        "Segments are named **a** (top), **b** (top right), **c** (bottom right), **d** (bottom), **e** (bottom left), **f** (top left) and **g** (middle) (Lecture 07 p.13).",
        "Lecture 07 p.14 and Lab 3 decode all 16 hexadecimal digits 0–F from the 4-bit input: Step 1 is a 16-row truth table with seven output columns.",
        "Step 2A: one K-map per segment. Lecture 07 p.15 gives $a = X_3'X_2X_0 + X_2X_1 + X_3'X_1 + X_3X_0' + X_3X_2'X_1' + X_2'X_0'$ (6 loops). Step 2B: one circuit per segment, all sharing the four inputs.",
        "Lab 3: the truth table is **active-high** (1 = segment on), but the board's outputs `seg_L` are **active-low** (`_L`): a segment lights when its output is 0, so each output is the complement of its column.",
        "If a question restricts the input to BCD digits 0–9, codes 1010–1111 never occur and can be used as don't cares on the K-maps (the don't-care technique from the K-map chapter).",
      ],
      figures: [
        svg(seg7Svg("abcdefg"), "Segment names: a top, b/c right, d bottom, e/f left, g middle"),
        {
          kind: "table",
          head: ["Digit", "WXYZ", "a", "b", "c", "d", "e", "f", "g"],
          rows: Array.from({ length: 16 }, (_, d) => [d.toString(16).toUpperCase(), d.toString(2).padStart(4, "0"), ..."abcdefg".split("").map((s) => (SEG_HEX[d].includes(s) ? 1 : 0))]),
          caption: "Hexadecimal seven-segment truth table (active-high), as in Lecture 07 p.14 and Lab 3 Table 1",
        },
        { kind: "kmap", vars: ["W", "X", "Y", "Z"], values: "1011011111101011", groups: ["X'Z'", "XY", "WZ'", "W'Y", "W'XZ", "WX'Y'"], caption: "Segment a (Lecture 07 p.15), with $W X Y Z = X_3X_2X_1X_0$: six loops" },
      ],
      example: {
        problem: "Find the minimal SOP for segment **e** (bottom left) of the hexadecimal decoder.",
        steps: [
          "From the table, e is lit for 0, 2, 6, 8, A, b, C, d, E, F: $e = \\sum m(0, 2, 6, 8, 10, 11, 12, 13, 14, 15)$.",
          "The four corners $m_0, m_2, m_8, m_{10}$ form $X'Z'$; the column $m_2, m_6, m_{10}, m_{14}$ forms $YZ'$.",
          "$m_{11}$ needs the quad $m_{10}, m_{11}, m_{14}, m_{15}$ = $WY$; $m_{13}$ needs the quad $m_{12}, m_{13}, m_{14}, m_{15}$ = $WX$.",
          "All 1s are covered: $e = X'Z' + YZ' + WY + WX$.",
        ],
        answer: "$e = X'Z' + YZ' + WY + WX$",
      },
      pitfalls: [
        "Check the display convention given in the question (does 7 light f? does 9 light d?). Use the table in the question, not memory.",
        "For an active-low output (like Lab 3's `seg_L`) the output is 1 where the segment is **dark**: minimise the complement column.",
        "Don't cares (only when the input is restricted, e.g. to BCD) may be used as 1s or 0s, but you never have to cover them.",
      ],
      recall: [
        { q: "How many outputs does a seven-segment decoder have?", a: "Seven, one per segment (a–g)." },
        { q: "Lab 3's `seg_L` outputs are active-low. What level lights a segment?", a: "0." },
        { q: "Why can codes 1010–1111 be don't cares for a BCD-input decoder?", a: "BCD digits only go up to 9, so those input codes never occur." },
      ],
    },
    {
      title: "Decoders: binary code to one-hot",
      intuition:
        "A decoder turns an $n$-bit number into $2^n$ wires, exactly one of which is high: the one whose position equals the number. Inside, each output is just an AND gate detecting one input combination, so a decoder hands you every minterm.",
      visuals: ["decoder-lab"],
      keyIdeas: [
        "An **$n$-input decoder** has $2^n$ outputs (output width is always 2 to the power of the input width); the output is **one-hot**: only one bit is high, and its position is the input value.",
        "Internal design: one **AND gate per output** to detect its input combination, e.g. for a 2-to-4 decoder $d_2 = i_1 i_0'$. So output $d_k$ is minterm $m_k$ of the inputs.",
        "**Enable** $e$: with $e = 0$ all outputs are 0; with $e = 1$ it behaves normally. So $d_k = e \\cdot m_k$.",
        "**Decoder + OR gate** builds any function from its sum of minterms: OR the outputs of the function's minterms. PYP 2017-18 S1 Q3(b): a full adder from one 3-to-8 decoder and two OR gates, $Sum = \\sum m(1,2,4,7)$, $Carry = \\sum m(3,5,6,7)$.",
        "**Bigger decoders from smaller ones** (PYP 2020-21 S2 Q3(a)): the upper input bits go to a small decoder whose outputs drive the **enables** of the larger decoders that all share the lower bits. One 2-4 decoder and four 3-8 decoders with enable make a 5-to-32 decoder.",
        "Applications: one-of-$n$ lamp control, e.g. the New Year's Eve countdown (59 down to 0 needs 6 bits: a 6-to-64 decoder with 4 outputs unused) and the ferry ramps (Tutorial 6 Q3).",
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
          "(Tutorial 6 Q3) A ferry has four boarding ramps. A 2-bit number $R$ says which ramp to use and $FULL = 1$ when all ramps are full. Exactly one green light (over the chosen ramp) must be on, and none when the ferry is full. Sketch the block diagram using one 2-to-4 decoder with enable.",
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
        "When building a bigger decoder, only one of the smaller decoders may be enabled at a time, or two outputs light at once.",
      ],
      recall: [
        { q: "Output $d_5$ of a 3-to-8 decoder (inputs $ABC$) equals?", a: "$m_5 = AB'C$ (times the enable if there is one)." },
        { q: "How do you build a full adder's Sum with a decoder (PYP 2017-18 S1 Q3(b))?", a: "3-to-8 decoder on $x, y, z$; OR together outputs $d_1, d_2, d_4, d_7$." },
        { q: "How many 3-to-8 decoders (with enable) and 2-4 decoders build a 5-to-32 decoder?", a: "Four 3-to-8 decoders on $X[2{:}0]$, enabled by the four outputs of one 2-4 decoder on $X[4{:}3]$." },
      ],
    },
    {
      title: "Priority encoder (PYP 2017-18 S2 Q2)",
      intuition:
        "A priority encoder goes the other way from a decoder: it looks at several request lines and outputs the binary index of the most important one that is active.",
      keyIdeas: [
        "PYP 2017-18 S2 Q2 gives the circuit as a truth table: active-low inputs $E^*, A_7^* \\dots A_1^*$ and active-high outputs $Y_2Y_1Y_0$.",
        "When $E^*$ is negated ($E^* = 1$) the outputs are 000 whatever the other inputs are: $E^*$ is an active-low **enable**.",
        "When enabled, $Y_2Y_1Y_0$ is the index of the **highest-numbered asserted** input; lower inputs are don't cares (x) in that row. If no input is asserted the output is 000.",
        "To find one output, list the rows where it is 1 and write a term for each, e.g. $Y_1 = 1$ when the winning input is $A_7, A_6, A_3$ or $A_2$.",
      ],
      figures: [
        {
          kind: "table",
          head: ["$E^*$", "$A_7^*$", "$A_6^*$", "$A_5^*$", "$A_4^*$", "$A_3^*$", "$A_2^*$", "$A_1^*$", "$Y_2$", "$Y_1$", "$Y_0$"],
          rows: [
            [1, "x", "x", "x", "x", "x", "x", "x", 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [0, 1, 1, 1, 1, 1, 0, "x", 0, 1, 0],
            [0, 1, 1, 1, 1, 0, "x", "x", 0, 1, 1],
            [0, 1, 1, 1, 0, "x", "x", "x", 1, 0, 0],
            [0, 1, 1, 0, "x", "x", "x", "x", 1, 0, 1],
            [0, 1, 0, "x", "x", "x", "x", "x", 1, 1, 0],
            [0, 0, "x", "x", "x", "x", "x", "x", 1, 1, 1],
          ],
          caption: "PYP 2017-18 S2 Table Q2 (x = don't care; inputs are asserted when 0)",
        },
      ],
      example: {
        problem: "Using the table, write a Boolean expression for $Y_1$. Write $E$ for \"$E^*$ asserted\" and $a_k$ for \"$A_k^*$ asserted\" (i.e. $E = (E^*)'$, $a_k = (A_k^*)'$).",
        steps: [
          "$Y_1 = 1$ in the rows where the winner is $A_7$, $A_6$, $A_3$ or $A_2$, and only when enabled.",
          "Winner $A_7$: $Ea_7$. Winner $A_6$: $Ea_7'a_6$. Winner $A_3$: $Ea_7'a_6'a_5'a_4'a_3$. Winner $A_2$: $Ea_7'a_6'a_5'a_4'a_3'a_2$.",
          "Simplify with $x + x'y = x + y$: $a_7 + a_7'a_6 = a_7 + a_6$, and the same absorbs $a_7'a_6'$ and $a_3'$ in the later terms.",
          "$Y_1 = E(a_7 + a_6 + a_5'a_4'a_3 + a_5'a_4'a_2)$. In the circuit each $a_k$ comes from $A_k^*$ through a bubble.",
        ],
        answer: "$Y_1 = Ea_7 + Ea_6 + Ea_5'a_4'a_3 + Ea_5'a_4'a_2$",
      },
      pitfalls: [
        "The inputs are active-low: a 0 on $A_k^*$ means that input is asserted.",
        "A lower input that is also asserted does not change the output: only the highest asserted input counts.",
      ],
      recall: [
        { q: "In PYP 2017-18 S2 Q2, what is the purpose of $E^*$?", a: "It is an active-low enable: when $E^* = 1$ the outputs are forced to 000." },
        { q: "$A_5^*$ and $A_2^*$ are both 0, the rest 1, $E^* = 0$. What is $Y_2Y_1Y_0$?", a: "101: the highest asserted input is $A_5$." },
      ],
    },
    {
      title: "Multiplexers",
      intuition:
        "A multiplexer is like a rail-yard switch: the select input chooses which of the data inputs is connected to the single output. Inside, each data input has an AND gate that only passes it when the select code matches.",
      visuals: ["mux-path"],
      keyIdeas: [
        "A multiplexer has several data inputs, one output, and a select input that decides which input is connected to the output. An $n$-input MUX needs a $\\log_2(n)$-bit select (2-input: 1 bit, 4-input: 2 bits).",
        "2-to-1: $Y = S'I_0 + SI_1$. 4-to-1: $Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3$.",
        "Built as AND-OR (Lecture 07 p.24): one AND gate per data input (that input with the select combination) and one OR gate. Only one AND gate can be enabled at a time.",
        "**Bus MUX** (Lecture 07 p.25): a 4-bit 2x1 mux is four 2x1 muxes sharing the same select line; drawn with a slash and the width on the bus.",
        "**Decoder + AND + OR = MUX** (PYP 2018-19 S2 Q3(b)): a 2-4 decoder on the select bits, each output ANDed with one data bit, all ORed together: a 4-to-1 multiplexer.",
        "A MUX with an **enable**: output forced to 0 when disabled (L8 practice Q4, Lecture 08B p.16: `assign mxout = enable ? mux_int : 8'd0;`).",
        "In Verilog a 2-to-1 MUX is `assign y = sel ? x1 : x0;` and a 4-to-1 MUX is a `case (sel)` in an `always @*` block.",
      ],
      formulas: ["Y = S'I_0 + SI_1", "Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3"],
      figures: [svg(muxSvg(["I0", "I1", "I2", "I3"], ["S1", "S0"], "Y"), "4-to-1 MUX symbol: the select code $S_1S_0$ picks the data line"), mux21],
      example: {
        problem: "(PYP 2018-19 S2 Q3(b)) In the circuit below, $X[5{:}0] = 011001$. What is $Y$, and what commonly used circuit is this?",
        figures: [decMux],
        steps: [
          "The decoder sees $i_1 i_0 = X[1]X[0] = 01$, so only $d_1$ is high.",
          "Only the AND gate fed by $d_1$ can pass its data bit: $Y = X[3] = 1$.",
          "Whatever $X[1{:}0]$ is, $Y$ equals one of $X[2] \\dots X[5]$: $X[1{:}0]$ is a select input and $X[5{:}2]$ are data inputs.",
        ],
        answer: "$Y = X[3] = 1$; the circuit is a 4-to-1 multiplexer.",
      },
      pitfalls: [
        "Getting the select order wrong: $S_1$ is the MSB, so $S_1S_0 = 10$ selects $I_2$, not $I_1$.",
        "A MUX is not a decoder: it has one output; the decoder has $2^n$.",
      ],
      recall: [
        { q: "Select lines for a 64-input MUX?", a: "6 ($\\log_2 64$)." },
        { q: "2-to-1 MUX equation?", a: "$Y = S'I_0 + SI_1$." },
        { q: "How many 2x1 muxes make a 4-bit 2x1 mux?", a: "Four, sharing the same select line." },
      ],
    },
    {
      title: "Implementing functions with multiplexers",
      intuition:
        "Because a MUX passes the data line chosen by its select code, putting the right constants (or simple functions of the leftover variables) on the data lines turns it into any function you like.",
      visuals: ["mux-function"],
      keyIdeas: [
        "**All $n$ variables on the selects** ($2^n$-to-1 MUX, PYP 2016-17 S2 Q3(c)): each data line is the truth-table value $F(m_k)$, a constant 0 or 1.",
        "**$n - 1$ variables on the selects** (PYP 2016-17 S1 Q3(b), PYP 2018-19 S1 Q3(a): one 4x1 mux and one inverter): each data line covers a pair of minterms differing in the last variable $v$. Compare $F$ on the pair: $00 \\to 0$, $11 \\to 1$, $01 \\to v$, $10 \\to v'$ (the inverter).",
        "**Fewer variables on the selects**: each data line is $F$ with the select variables fixed, a function of the remaining variables, possibly needing gates.",
        "Choosing which variable goes on the select can make the data-line logic simpler, e.g. $F(x,y,z) = \\sum m(1,6)$ with one 2x1 mux, one AND gate and one NOR gate (PYP 2017-18 S2 Q3(b)).",
        "**Reading a MUX with constants** (Tutorial 6 Q1): write $Y = \\sum m_k(S)\\,I_k$, substitute the data lines, drop the $I_k = 0$ terms, then minimise.",
      ],
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
          "One inverter makes $D'$ for lines 0, 3, 5, 6.",
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
        { q: "Why might you choose a particular variable for the select line?", a: "It can make the logic on the data lines simpler (fewer gates, no inverters)." },
      ],
    },
    {
      title: "Comparators, adders and signed comparison",
      intuition:
        "Past papers treat a comparator and an adder as black-box blocks and ask you to build something bigger around them. A signed comparison only goes wrong in an unsigned comparator through the sign bits, which is why a small MUX on the sign bits fixes it.",
      visuals: ["signed-compare"],
      keyIdeas: [
        "**2-bit comparator** (PYP 2018-19 S2 Q3(a)): capture $X = (A > B)$ and $Y = (A \\le B)$ in a 16-row truth table over $A_1A_0B_1B_0$, then minimise, or build it from a 4-16 decoder and OR gates. $A > B = A_1B_1' + A_1A_0B_0' + A_0B_1'B_0'$, and $Y = X'$.",
        "XOR as a bit-wise comparator (Lecture 3): the output is 1 when the two bits differ; XNOR is 1 when they are equal.",
        "**Signed (two's complement) comparison from an unsigned comparator** (PYP 2016-17 S2 Q2(c), PYP 2021-22 S1 Q4): compare the lower $n-1$ bits unsigned ($U$), and use the two sign bits $\\{X_{n-1}, Y_{n-1}\\}$ as the select of a 4-to-1 MUX. Equal signs: the lower bits decide ($U$, no inversion, because both numbers carry the same $-2^{n-1}$ weight). Different signs: the answer is a constant.",
        "**Adder block**: a 4-bit adder adds $a + b + C_{in}$ giving $sum$ and $C_{out}$ (PYP 2018-19 S2 Q2(b)). **Add/subtract circuit** (Lecture 4): XOR each $Y_i$ with Add/Sub and set $C_0$ = Add/Sub, so Add/Sub = 1 computes $X + Y' + 1 = X - Y$.",
        "Blocks compose: PYP 2018-19 S2 Q2(b) adds two BCD digits with two 4-bit adders plus a signal $X = 1$ when the first result exceeds 9.",
      ],
      formulas: ["A > B = A_1B_1' + A_1A_0B_0' + A_0B_1'B_0' \\quad (2\\text{-bit})"],
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
        { q: "Gate that outputs 1 when two bits are equal?", a: "XNOR (the complement of XOR, the bit-wise comparator)." },
        { q: "In the signed comparator, what do the MUX select lines see?", a: "The two sign bits $\\{X_{n-1}, Y_{n-1}\\}$." },
        { q: "How does the add/subtract circuit subtract?", a: "Add/Sub = 1 makes the XORs invert $Y$ and sets the carry-in to 1: $X + Y' + 1 = X - Y$." },
      ],
    },
  ],
  playbook: [
    "If a MUX has constants or variables on its data lines, write $Y = \\sum m_k(S)\\,I_k$, substitute, drop the zero terms, then K-map it.",
    "If asked to implement $F$ with an $(n-1)$-select MUX, pair the minterms by the leftover variable and map each pair to 0, 1, $v$ or $v'$.",
    "If outputs of a decoder feed an OR gate, $F = \\sum m$ of those outputs; to build a function with a decoder, OR the outputs of its minterms.",
    "If you see \"one-hot\", \"one of $n$ lights\" or \"only one active\", reach for a decoder; if all must go off on some condition, use the enable (inverted if needed).",
    "If a bigger decoder must be built from smaller ones, decode the upper bits and use those outputs as the enables of the decoders that share the lower bits.",
    "If a priority encoder is given as a truth table, the output is the index of the highest asserted input; check whether the inputs and enable are active-low.",
    "If you must compare signed numbers with an unsigned comparator, put the sign bits on a MUX select: equal signs pass the comparator output, different signs pass constants.",
    "If a seven-segment segment is asked for, write its column of the truth table, K-map it, and complement the column for active-low outputs.",
    "If the question is a word problem, do the two-step process: capture the function (table/equation/blocks), then convert, and label every signal on the block diagram.",
  ],
};
