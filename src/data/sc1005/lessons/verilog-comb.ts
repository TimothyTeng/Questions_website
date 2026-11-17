import type { Figure, Lesson } from "@/lib/sc1005/types";
import { block, svgWrap, txt, wire, dot } from "../questions/comb-blocks";

/** Full adder built from two half-adder instances and an OR gate (block view). */
function fullAdderSvg(): string {
  const m1 = block(90, 30, { title: "add_half\nM1", left: [["a", ""], ["b", ""]], right: [["sum", ""], ["Cout", ""]], w: 92 });
  const m2 = block(260, 10, { title: "add_half\nM2", left: [["a", ""], ["b", ""]], right: [["sum", ""], ["Cout", ""]], w: 92 });
  const p: string[] = [m1.svg, m2.svg];
  // inputs
  p.push(wire([[40, m1.L[0].y], [m1.L[0].x, m1.L[0].y]]), txt(36, m1.L[0].y + 4, "A", "end", 12, true));
  p.push(wire([[40, m1.L[1].y], [m1.L[1].x, m1.L[1].y]]), txt(36, m1.L[1].y + 4, "B", "end", 12, true));
  p.push(wire([[40, m2.L[0].y], [m2.L[0].x, m2.L[0].y]]), txt(36, m2.L[0].y + 4, "CIN", "end", 12, true));
  // M1.sum = w1 -> M2.b
  p.push(wire([[m1.R[0].x, m1.R[0].y], [225, m1.R[0].y], [225, m2.L[1].y], [m2.L[1].x, m2.L[1].y]]), txt(200, m1.R[0].y - 5, "w1", "middle", 11));
  // outputs
  p.push(wire([[m2.R[0].x, m2.R[0].y], [440, m2.R[0].y]]), txt(444, m2.R[0].y + 4, "SUM", "start", 12, true));
  // OR gate for COUT
  const gx = 395;
  const gy = 125;
  p.push(`<path d="M${gx},${gy - 16} Q${gx + 18},${gy - 16} ${gx + 32},${gy} Q${gx + 18},${gy + 16} ${gx},${gy + 16} Q${gx + 9},${gy} ${gx},${gy - 16} Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`);
  p.push(wire([[m2.R[1].x, m2.R[1].y], [375, m2.R[1].y], [375, gy - 7], [gx + 3, gy - 7]]), txt(368, m2.R[1].y - 5, "w3", "end", 11));
  p.push(wire([[m1.R[1].x, m1.R[1].y], [215, m1.R[1].y], [215, gy + 7], [gx + 3, gy + 7]]), txt(200, m1.R[1].y + 16, "w2", "middle", 11));
  p.push(wire([[gx + 32, gy], [440, gy]]), txt(444, gy + 4, "COUT", "start", 12, true), txt(gx + 14, gy + 30, "o1", "middle", 10));
  p.push(dot(225, m1.R[0].y));
  return svgWrap(490, 160, p.join(""));
}

const andorinv: Figure = {
  kind: "circuit",
  circuit: {
    inputs: ["a", "b", "c", "d"],
    gates: [
      { id: "and1out", type: "AND", in: ["a", "b"], label: "g1" },
      { id: "and2out", type: "AND", in: ["c", "d"], label: "g2" },
      { id: "out", type: "NOR", in: ["and1out", "and2out"], label: "g3" },
    ],
    outputs: ["out"],
    showNets: true,
  },
  caption: "andorinv: $out = (ab + cd)'$",
};

const simpleCirc: Figure = {
  kind: "circuit",
  circuit: {
    inputs: ["A", "B", "C", "D"],
    gates: [
      { id: "int3", type: "OR", in: ["A", "D"] },
      { id: "int1", type: "NOT", in: ["int3"] },
      { id: "int4", type: "NOT", in: ["D"] },
      { id: "int2", type: "AND", in: ["B", "C", "int4"] },
      { id: "Y", type: "AND", in: ["int1", "int2"] },
    ],
    outputs: ["Y"],
    showNets: true,
  },
  caption: "Lecture exercise: describe this circuit with gate primitives",
};

const latchFig: Figure = {
  kind: "circuit",
  circuit: { inputs: ["c", "valid"], gates: [{ id: "y", type: "DLATCH", in: ["c", "valid"] }], outputs: ["y"] },
  caption: "What `if (valid) y = c;` (with no else) synthesises to: a transparent latch",
};

export const verilogCombLesson: Lesson = {
  topic: "verilog-comb",
  bigPicture:
    "Verilog is a **hardware description language**: every line describes a piece of hardware that exists all the time, not a step a CPU executes. A design is a hierarchy of **modules** with typed **ports**. Inside a module you can describe hardware **structurally** (gate primitives and instances of other modules, wired together, exactly like drawing the schematic), with **continuous assignments** (`assign y = expression;`, where the operators become gates), or **behaviourally** with a combinational `always @*` block using `if` and `case`, from which the synthesiser works out the gates. Around this sit the details that the exam probes precisely: vectors and bit/part selects, sized literals, the difference between bitwise, logical and reduction operators, how expression widths are decided (extension and truncation), concatenation and replication for sign extension, `wire` versus `reg`, named instantiation and parameter overrides, and the rules that keep an always block combinational (complete sensitivity list, every output assigned on every path, no latches). Read every question with the question \"what hardware does this make?\" in mind.",
  sections: [
    {
      title: "Modules, ports and gate-level primitives",
      intuition:
        "Structural Verilog is a text version of a schematic: you list the gates and say which wires connect to which pins. The order of the statements does not matter, because all the gates exist at once.",
      visuals: ["verilog-hw"],
      keyIdeas: [
        "A design is broken into **modules**: `module name (input a, b, output y); … endmodule`. Ports of the same direction and type can share one declaration.",
        "Gate primitives: `and, nand, or, nor, xor, xnor, not`. Syntax `and g1 (out, in1, in2, …);`: **the single output is always the first terminal**, inputs may be as many as you like, the instance name (`g1`) is optional.",
        "Internal connections are **wires**: `wire w1, w2;`. Undeclared names used in primitive or instance connections are implicitly created as 1-bit wires (but declare multi-bit wires).",
        "Ports act like wires; you cannot drive an input port from inside the module.",
        "Statement order is irrelevant for structural code: each statement is a piece of hardware, running concurrently.",
        "Verilog is case-sensitive; statements end with `;`; comments are `//` and `/* */`; identifiers start with a letter or underscore and must not be keywords.",
        "Going from a circuit to Verilog (and back) is a standard exam question: label every internal wire, write one primitive per gate, check that every gate's output is its first terminal.",
      ],
      code: [
        { title: "and-or-invert with named gate instances", code: "module andorinv (input a, b, c, d,\n                 output out);\n  wire and1out, and2out;\n  and g1 (and1out, a, b);\n  and g2 (and2out, c, d);\n  nor g3 (out, and1out, and2out);\nendmodule" },
        { title: "The same circuit with one continuous assignment", code: "assign out = ~((a & b) | (c & d));" },
      ],
      figures: [andorinv, simpleCirc],
      example: {
        problem: "Write a structural module `simple_circ (input A, B, C, D, output Y)` for the second circuit above, using the wire names shown.",
        steps: [
          "Name each internal wire after the gate that drives it: `int3 = A + D`, `int1 = int3'`, `int4 = D'`, `int2 = B·C·int4`.",
          "One primitive per gate, output first: `or (int3, A, D); not (int1, int3); not (int4, D); and (int2, B, C, int4); and (Y, int1, int2);`",
          "Declare the wires: `wire int1, int2, int3, int4;` (optional for 1-bit wires, but good practice).",
          "Any statement order gives the same circuit: $Y = (A + D)'\\,BCD' = A'D'\\,BCD' = A'BCD'$.",
        ],
        answer: "```\nmodule simple_circ (input A, B, C, D, output Y);\n  wire int1, int2, int3, int4;\n  or  (int3, A, D);\n  not (int1, int3);\n  not (int4, D);\n  and (int2, B, C, int4);\n  and (Y, int1, int2);\nendmodule\n```",
      },
      pitfalls: [
        "Putting the output last (`and (a, b, y)` drives `a`, not `y`).",
        "Driving the same wire from two gates (two outputs shorted together).",
        "Forgetting that `nand`/`nor` with two inputs is not the same as an AND followed by a separate inverter on one input.",
      ],
      recall: [
        { q: "Which terminal of a gate primitive is the output?", a: "The first one." },
        { q: "Does the order of gate primitives in a module matter?", a: "No: each describes hardware that exists concurrently." },
        { q: "Can a primitive have more than two inputs?", a: "Yes, e.g. `or (z, a, b, c, d);`." },
      ],
    },
    {
      title: "Hierarchy: module instantiation and parameters",
      intuition:
        "Once a module exists you can use it as a black-box component inside another module, just like placing a chip on a board. Parameters let one module description serve many bit-widths.",
      keyIdeas: [
        "**Instantiation**: `module_name instance_name (connections);`, e.g. `add_half M1 (A, B, w1, w2);` creates instance `M1` of `add_half`.",
        "**Ordered (positional)** connection follows the order of the module's port list. Error-prone: changing the port list silently breaks every instance.",
        "**Named** connection: `.port(signal)`, the port name of the instantiated module after the dot, the outer signal in brackets: `add_half M1 (.a(A), .b(B), .sum(w1), .Cout(w2));`. Order of the connections then does not matter. The exam usually asks for named instantiation.",
        "A module output must connect to a **wire** in the outer module (never a reg).",
        "Modules and primitives are instantiated at module level, **never inside an always block**.",
        "**Parameters** are constants local to a module: `module some_mod #(parameter SIZE = 8) (input [SIZE-1:0] X, …);`.",
        "**Override** a parameter at instantiation: `submod #(.SIZE(16)) U1 (.X(a), .Y(b), .Z(D));` The `#( … )` goes between the module name and the instance name.",
      ],
      code: [
        { title: "Full adder from two half-adder instances (named connections)", code: "module full_add (input A, B, CIN,\n                 output SUM, COUT);\n  wire w1, w2, w3;\n  add_half M1 (.a(A),   .b(B),  .sum(w1),  .Cout(w2));\n  add_half M2 (.a(CIN), .b(w1), .sum(SUM), .Cout(w3));\n  or o1 (COUT, w3, w2);\nendmodule" },
        { title: "A parameterised adder and an override", code: "module adder #(parameter SIZE = 32)\n             (input Cin, input [SIZE-1:0] A, B,\n              output Cout, output [SIZE-1:0] Sum);\n  assign {Cout, Sum} = A + B + Cin;\nendmodule\n\n// in another module: a 12-bit adder\nadder #(.SIZE(12)) U7 (.Cin(1'b0), .A(x), .B(y), .Cout(c), .Sum(s));" },
      ],
      figures: [{ kind: "svg", svg: fullAdderSvg(), caption: "full_add: two add_half instances and an OR gate" }],
      example: {
        problem:
          "(Tutorial 7 Q2 style) A module `thermo #(parameter N = 8) (input [N-1:0] Tset, Tact, output Hon, Con);` is used inside a higher module that has signals with the same names. Write the instantiation with instance name U1, then modify it for 12-bit temperatures.",
        steps: [
          "Named connections, port name outside the brackets, outer signal inside: `.Tset(Tset)` and so on.",
          "`thermo U1 (.Tset(Tset), .Tact(Tact), .Hon(Hon), .Con(Con));`",
          "For 12 bits, override the parameter without touching the module: insert `#(.N(12))` between the module name and the instance name.",
          "`thermo #(.N(12)) U1 (.Tset(Tset), .Tact(Tact), .Hon(Hon), .Con(Con));` (the outer `Tset`, `Tact` must now be 12-bit wires).",
        ],
        answer: "`thermo #(.N(12)) U1 (.Tset(Tset), .Tact(Tact), .Hon(Hon), .Con(Con));`",
      },
      pitfalls: [
        "Writing `.Tset = Tset` or `#(N = 12)`: both use the wrong syntax.",
        "Putting the parameter override after the instance name.",
        "Positional connections in the wrong order: no error, just a wrong circuit.",
      ],
      recall: [
        { q: "In `.a(A)`, which is the port of the instantiated module?", a: "`a` (after the dot); `A` is the signal in the outer module." },
        { q: "Where does `#(.SIZE(16))` go in an instantiation?", a: "Between the module name and the instance name." },
        { q: "Can you instantiate a module inside an always block?", a: "No, only at module level." },
      ],
    },
    {
      title: "Vectors, literals, concatenation and replication",
      intuition:
        "Real signals are buses. Verilog gives you vectors with bit and part selects, literals with an explicit width and base, and braces to glue fields together. Most exam marks are lost on widths: count the bits of everything.",
      visuals: ["literal-lab"],
      keyIdeas: [
        "Vector declaration `wire [7:0] bus;`: MSB index first, LSB is 0 by convention. Ports too: `input [15:0] a`.",
        "Bit select `bus[3]`, part select `bus[4:1]` (always `[high:low]`), and you can assign to selects: `assign x[2:1] = y[4:3];`.",
        "Literal format `<size>'<base><digits>`: `4'b1010`, `8'h4F`, `6'o17`, `12'd255`. Underscores are ignored: `16'b0010_1110_0110_1001`.",
        "Unsized literals (`'hF`, `255`) are at least 32 bits; plain decimal numbers are unsized.",
        "**Negative literals**: the minus sign goes in front: `-4'd3` (legal); `4'd-3`, `4'-d3`, `4d'3` are all illegal.",
        "Digits `x` (unknown) and `z` (high impedance) are allowed: `4'b10xz`, `8'hzz`. If the leftmost digit is x or z, padding uses x or z.",
        "Assigning a narrower value to a wider signal **zero-pads at the MSB**: `wire [5:0] x = 4'b1001;` gives `001001`. A wider value is **truncated at the MSB**: `wire [3:0] x = 6'b110011;` gives `0011`. A literal wider than its own size is truncated too: `3'b1011 = 3'b011`.",
        "**Concatenation** `{a, b}` joins fields, first one most significant: `{4'b1010, 2'b01} = 6'b101001`. Constants inside must be sized.",
        "**Replication** `{n{expr}}` repeats: `{3{2'b10}} = 6'b101010`. Inside a concatenation it needs its own braces: `{{4{a[3]}}, a}`.",
        "**Sign extension** = replicate the MSB: `{{4{a[3]}}, a[3:0]}` extends a 4-bit two's complement number to 8 bits.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Literal / expression", "Width", "Bits"],
          rows: [
            ["`8'h4F`", 8, "0100 1111"],
            ["`6'o17`", 6, "001 111"],
            ["`4'd9`", 4, "1001"],
            ["`-4'd3`", 4, "1101"],
            ["`4'b1x0z`", 4, "1 x 0 z"],
            ["`{2'b10, 3'b011}`", 5, "10 011"],
            ["`{3{2'b01}}`", 6, "01 01 01"],
            ["`{{3{x[3]}}, x}` with `x = 4'b1010`", 7, "111 1010"],
          ],
          caption: "Literal and concatenation examples",
        },
      ],
      example: {
        problem: "(PYP 2016-17 S2 style) Let `a = 5'b11011`, `b = 3'b101`, `c = 3'b011`. Find `x[6:0]` for `assign x = b[1] ? {a, c[1:0]} : {b, a[3:0]};` and for `assign x = {a[4:0], c[2], b[0]};`.",
        steps: [
          "`b[1]` is bit 1 of `101`, which is 0, so the conditional picks `{b, a[3:0]} = {101, 1011}` = `1011011` (7 bits).",
          "Second statement: `a[4:0] = 11011`, `c[2] = 0`, `b[0] = 1` → `11011_0_1` = `1101101`.",
          "Both results are exactly 7 bits, so no padding or truncation is needed. Always count: if the concatenation were 6 bits, a 0 would be added at the MSB.",
        ],
        answer: "`1011011` and `1101101`",
      },
      pitfalls: [
        "Padding goes on the **left** (MSB side) and truncation removes the **left** bits.",
        "`{3{X[7]}, X}` is not a valid replication inside a concatenation; write `{{3{X[7]}}, X}`.",
        "`4'd-3` is illegal; `-4'd3` is legal.",
        "Bit numbering starts at 0: an 8-bit signal is `[7:0]`, not `[8:1]` or `[8:0]`.",
      ],
      recall: [
        { q: "`wire [5:0] x = 4'b1001;` gives?", a: "`001001` (zero-padded at the MSB)." },
        { q: "Sign-extend 8-bit `X` to 12 bits.", a: "`{{4{X[7]}}, X}`." },
        { q: "Width of the unsized literal `'hF`?", a: "At least 32 bits (usually exactly 32)." },
        { q: "Is `-8'h1F` legal?", a: "Yes: the minus sign is in front of the whole literal." },
      ],
    },
    {
      title: "Operators, expression widths and continuous assignment",
      intuition:
        "`assign y = expression;` builds a little combinational circuit from the expression and connects it permanently to `y`. Each operator is a piece of hardware, and the width of that hardware is decided before anything is computed.",
      visuals: ["operator-lab"],
      keyIdeas: [
        "**Bitwise** `~ & | ^ ~^` operate bit by bit and return a vector: `4'b0110 & 4'b1010 = 4'b0010`.",
        "**Logical** `! && ||` treat each operand as true (non-zero) or false (zero) and return **1 bit**: `4'b0110 && 4'b1010 = 1`.",
        "**Reduction** (unary) `& | ^ ~& ~| ~^` combine all bits of one operand into 1 bit: `&a` (all ones?), `|a` (any one?), `^a` (odd parity).",
        "**Arithmetic** `+ - *` (and `/`, `%`, not generally synthesisable). **Relational** `< <= > >=` and **equality** `== !=` return 1 bit (or x if unknown bits make it ambiguous; `===` and `!==` compare x and z exactly).",
        "**Shifts** `<<` and `>>` fill with zeros. **Conditional** `c ? a : b` is a 2-to-1 multiplexer; nesting builds bigger muxes.",
        "**Expression width**: operands of `+ - * & | ^ ~ ?:` are first extended to the width of the widest operand **and of the assignment target**, then the operation is done, then the result is truncated to the target. So `wire [4:0] t = a + b;` keeps the carry of two 4-bit numbers, and `wire [3:0] s = a + b;` loses it.",
        "Concatenation operands, reduction and logical operands, and relational operands are sized on their own (self-determined).",
        "`assign {Cout, Sum} = A + B + Cin;` puts the carry into `Cout` because the 9-bit target widens the addition.",
        "All `assign` statements run concurrently; one signal must be driven by exactly one `assign` (or one always block, or one gate).",
      ],
      figures: [
        {
          kind: "table",
          head: ["`a = 4'b0110`, `b = 4'b1010`", "Result"],
          rows: [
            ["`a & b`", "4'b0010"],
            ["`a && b`", "1'b1"],
            ["`a | b`", "4'b1110"],
            ["`a ^ b`", "4'b1100"],
            ["`~a`", "4'b1001"],
            ["`!a`", "1'b0"],
            ["`&a`, `|a`, `^a`", "0, 1, 0"],
            ["`a << 1`, `b >> 2`", "4'b1100, 4'b0010"],
            ["`a > b`, `a == 4'd6`", "0, 1"],
          ],
          caption: "Bitwise vs logical vs reduction",
        },
      ],
      code: [
        { title: "Continuous assignments", code: "assign S    = A ^ B ^ Cin;                    // full adder sum\nassign Cout = (A & B) | (B & Cin) | (A & Cin);\nassign max  = (a > b) ? a : b;                 // comparator + mux\nassign y    = sel ? x1 : x0;                   // 2-to-1 mux" },
      ],
      example: {
        problem: "`a = 4'd3`, `b = 4'd5`. Find `d` for `wire [3:0] d = a - b;` and for `wire [5:0] d = a - b;`. Find `p` for `wire [5:0] p = a * b;`.",
        steps: [
          "4-bit target: $3 - 5 = -2 \\equiv 16 - 2 = 14$ → `1110`.",
          "6-bit target: operands are zero-extended to 6 bits first, so the result is $-2 \\bmod 64 = 62$ → `111110` (not `001110`).",
          "$3 \\times 5 = 15$ fits in 6 bits: `001111`.",
        ],
        answer: "`1110`, `111110`, `001111`",
      },
      pitfalls: [
        "Using `&&` when you meant `&`: on vectors they give different widths and values.",
        "Assuming `a + b` is computed at the operand width and then padded: the target width counts.",
        "Shifting right with `>>` is a logical shift (zeros come in), not a rotate.",
        "`~` on a 1-bit signal and `!` give the same value, but on vectors `~` is bitwise and `!` returns one bit.",
      ],
      recall: [
        { q: "`!4'b0100` and `~4'b0100`?", a: "`1'b0` and `4'b1011`." },
        { q: "What does `^a` compute?", a: "The XOR of all bits of `a` (1 if it has an odd number of 1s)." },
        { q: "Why does `assign {Cout, Sum} = A + B + Cin;` keep the carry?", a: "The target is one bit wider than `A` and `B`, so the addition is done at that width." },
      ],
    },
    {
      title: "Behavioural Verilog: always @*, reg, if and case",
      intuition:
        "Instead of drawing the gates you describe what the output should be for each situation, and the synthesiser builds the logic. A combinational always block is read top to bottom like a program, but what it produces is one block of hardware that reacts instantly.",
      visuals: ["always-hw"],
      keyIdeas: [
        "`always @*` (or `always @(*)`) runs whenever any signal read inside it changes. A hand-written list such as `always @(a, b)` must contain **every** input, or simulation and hardware disagree: use `@*`.",
        "Use `begin … end` around more than one statement (Verilog's `{ }` are for concatenation). Never use `assign` inside an always block.",
        "Signals assigned inside an always block must be declared **`reg`** (e.g. `output reg [3:0] y`). `reg` here does not mean a register: a combinational always block still produces gates.",
        "A `reg` cannot be driven by `assign` or by a module output; a `wire` cannot be assigned in an always block.",
        "In a combinational block use blocking `=` (`<=` is for clocked blocks).",
        "Statements are evaluated in order; if a signal is assigned twice, **the last assignment wins**.",
        "`if / else if / else` builds priority logic (a chain of muxes). `case (sel) … endcase` compares `sel` with each item exactly; no `break` is needed; `default:` covers everything not listed.",
        "Typical uses: a 4-to-1 mux (`case (sel) 2'b00: q = d[0]; …`), a 3-to-8 decoder (`case (ival) 3'b000: d_out = 8'b0000_0001; …`).",
      ],
      code: [
        { title: "4-to-1 multiplexer with case", code: "module mux4 (output reg q,\n             input [3:0] d,\n             input [1:0] sel);\n  always @* begin\n    case (sel)\n      2'b00: q = d[0];\n      2'b01: q = d[1];\n      2'b10: q = d[2];\n      2'b11: q = d[3];\n    endcase\n  end\nendmodule" },
        { title: "8-bit 4-to-1 mux with an enable (lecture 8B)", code: "module mux_4_32 (output [7:0] mxout,\n                 input [7:0] in3, in2, in1, in0,\n                 input [1:0] sel, input enable);\n  reg [7:0] mux_int;\n  assign mxout = enable ? mux_int : 8'd0;\n  always @*\n    case (sel)\n      2'b00: mux_int = in0;\n      2'b01: mux_int = in1;\n      2'b10: mux_int = in2;\n      2'b11: mux_int = in3;\n    endcase\nendmodule" },
      ],
      example: {
        problem: "(Tutorial 7 Q4) Write a 3-to-8 decoder using a case statement, then add an active-high enable `en`.",
        steps: [
          "Output `d_out` is assigned in an always block, so declare it `output reg [7:0] d_out`.",
          "One case item per input code: `3'b000: d_out = 8'b0000_0001;` … `3'b111: d_out = 8'b1000_0000;`.",
          "Enable: wrap the case in `if (en) … else d_out = 8'b0;`, or assign the default `d_out = 8'b0;` first and only run the case when `en` is 1.",
          "Shorter alternative: `d_out = en ? (8'b1 << ival) : 8'b0;`.",
        ],
        answer: "```\nmodule decoder3_8 (output reg [7:0] d_out,\n                   input [2:0] ival, input en);\n  always @* begin\n    d_out = 8'b0;          // default: no output\n    if (en)\n      case (ival)\n        3'b000: d_out = 8'b0000_0001;\n        3'b001: d_out = 8'b0000_0010;\n        3'b010: d_out = 8'b0000_0100;\n        3'b011: d_out = 8'b0000_1000;\n        3'b100: d_out = 8'b0001_0000;\n        3'b101: d_out = 8'b0010_0000;\n        3'b110: d_out = 8'b0100_0000;\n        3'b111: d_out = 8'b1000_0000;\n      endcase\n  end\nendmodule\n```",
      },
      pitfalls: [
        "Declaring an always-block output as a plain `output` (wire): compile error.",
        "Using `assign` inside an always block.",
        "A case without `default` that does not list every value (or an `if` without `else`) leaves the output unassigned on some path: latch (next section).",
      ],
      recall: [
        { q: "What must a signal assigned in an always block be declared as?", a: "`reg`." },
        { q: "Why prefer `always @*`?", a: "It automatically includes every signal the block reads, so the sensitivity list cannot be incomplete." },
        { q: "Two assignments to `y` in one combinational always block: which counts?", a: "The last one executed." },
      ],
    },
    {
      title: "Latches, sensitivity lists and other pitfalls",
      intuition:
        "Combinational logic has no memory. If your code ever leaves an output unassigned, the only hardware that can satisfy it is a storage element, so the tool quietly builds a latch. Most \"find the errors\" questions are a list of these rules.",
      visuals: ["latch-lab"],
      keyIdeas: [
        "**Every output of a combinational always block must be assigned on every path.** An `if` without `else`, or a `case` missing values without a `default`, implies \"keep the old value\": a **latch**.",
        "Fix 1: add the `else` / `default`. Fix 2 (lecture's preferred): put **default assignments at the top** of the block, then overwrite them.",
        "Incomplete sensitivity list (`always @(a, b)` that also reads `c`): simulation ignores changes on `c`. Use `always @*`.",
        "A signal must have exactly **one driver**: never assign it from two always blocks, or from an always block and an `assign`.",
        "Statement order matters inside an always block (last assignment wins), but the order of separate `assign` statements and always blocks does not.",
        "Classic syntax slips: missing `;` after the port list, `endmodule;` (no semicolon), `assign` inside always, `<=` in combinational logic, output not declared `reg`, part selects with the wrong width.",
      ],
      code: [
        { title: "Latch (y is not assigned when valid = 0)", code: "always @* begin\n  if (valid) begin\n    x = a | b;\n    y = c;\n  end\n  else\n    x = a;          // y keeps its value: latch\nend" },
        { title: "Fixed with a default assignment at the top", code: "always @* begin\n  y = 1'b0;         // default\n  if (valid) begin\n    x = a | b;\n    y = c;\n  end\n  else\n    x = a;\nend" },
      ],
      figures: [latchFig],
      example: {
        problem:
          "(Tutorial 7 Q3 style) Find the mistakes:\n```\nmodule thing (input [3:0] a, b, c,\n              input [1:0] sel,\n              output [5:0] result);\n  always @ (a,b)\n  begin\n    case (sel)\n      2'b00 : result = a;\n      2'b01 : result = b;\n      2'b10 : result = c;\n    endcase\n  end\nendmodule;\n```",
        steps: [
          "`result` is assigned in an always block: declare `output reg`.",
          "Sensitivity list is missing `c` and `sel`: use `always @*`.",
          "`sel = 2'b11` is not covered: add `default: result = 6'd0;` (otherwise a latch).",
          "`result` is 6 bits but `a, b, c` are 4 bits: decide the intended width (make `result` `[3:0]`), or accept zero-padding knowingly.",
          "`endmodule;` must not have a semicolon. As a single conditional assignment: `assign result = (sel == 2'b00) ? a : (sel == 2'b01) ? b : (sel == 2'b10) ? c : 4'd0;`",
        ],
        answer: "reg output, `always @*`, a default for `sel = 11`, matching widths, no `;` after `endmodule`.",
      },
      pitfalls: [
        "A `case` with all values listed for a 2-bit selector does not need a default for synthesis, but the default is harmless and protects against latches when you edit the code.",
        "Latches are not flagged as errors: only a synthesis warning tells you. Read the warnings.",
      ],
      recall: [
        { q: "What causes an unintended latch?", a: "An output not assigned on some path through a combinational always block." },
        { q: "Two ways to avoid it?", a: "Cover every case (`else`, `default`), or assign defaults at the top of the block." },
        { q: "Can one signal be assigned in two always blocks?", a: "No: one driver per signal." },
      ],
    },
    {
      title: "Building blocks in Verilog: putting it together",
      intuition:
        "Exam design questions combine everything: you sketch a block diagram from standard blocks, then write a module that instantiates them with named connections and a little glue logic in `assign` statements.",
      keyIdeas: [
        "Ferry ramps (Tutorial 6 Q3): `dec2to4 U1 (.i(ramp), .en(~full), .d(light));` An expression such as `~full` may be connected directly to an input port.",
        "Concatenations can form a bus on the fly: `.D({~U, 1'b1, 1'b0, ~U})`, `.S({X[4], Y[4]})` (PYP 2021-22 Q4).",
        "Priority logic falls naturally out of an `if / else if` chain: the first true condition wins.",
        "Comparisons and arithmetic are one-liners: `assign Hon = (Tact + 8'd4 <= Tset);`, `assign max = (a > b) ? a : b;`.",
        "Use a parameter for every width that might change, and override it at instantiation rather than editing the module.",
      ],
      code: [
        { title: "Signed 5-bit X >= Y from mux41 and umc4 (named instantiation)", code: "module ge5 (input [4:0] X, Y, output W);\n  wire U;\n  umc4  C1 (.A(X[3:0]), .B(Y[3:0]), .U(U));\n  mux41 M1 (.D({U, 1'b0, 1'b1, U}),   // D[3] … D[0]\n            .S({X[4], Y[4]}),\n            .W(W));\nendmodule" },
        { title: "4-to-2 priority encoder with an if chain", code: "module prio4 (input [3:0] I, output reg [1:0] Y, output V);\n  assign V = |I;               // valid: any input active\n  always @* begin\n    if      (I[3]) Y = 2'd3;\n    else if (I[2]) Y = 2'd2;\n    else if (I[1]) Y = 2'd1;\n    else           Y = 2'd0;\n  end\nendmodule" },
      ],
      example: {
        problem: "(Tutorial 7 Q1 style) A toy traffic light takes a 3-bit one-hot vector `L[2:0]` (red, yellow, green, MSB = red). A controller outputs a 2-bit code `C`: red = 00, yellow = 01, green = 10, none = 11. Write the interface with assign statements.",
        steps: [
          "Each light is a decoder output of the code: red when `C == 2'b00`, yellow when `C == 2'b01`, green when `C == 2'b10`.",
          "`assign L[2] = (C == 2'b00);`",
          "`assign L[1] = (C == 2'b01);`",
          "`assign L[0] = (C == 2'b10);` For `C = 11` all three are 0, as required.",
        ],
        answer: "`assign L = {C == 2'b00, C == 2'b01, C == 2'b10};`",
      },
      pitfalls: [
        "Positional connections in a design question lose marks when named instantiation is asked for.",
        "Internal signal names in the Verilog must match the labels on your sketch.",
      ],
      recall: [
        { q: "How do you pass the complement of `full` to an enable port?", a: "`.en(~full)`: expressions are allowed in input connections." },
        { q: "Which Verilog construct naturally builds a priority encoder?", a: "An `if / else if / else` chain in an always block." },
        { q: "Build a 4-bit data input from U and two constants for a port.", a: "A concatenation, e.g. `.D({U, 1'b0, 1'b1, U})`." },
      ],
    },
  ],
  playbook: [
    "If asked \"what is the value of y\", first write down the **width** of every operand and of y; extend operands to the largest (including y), compute, then truncate to y.",
    "If you see `&&`, `||` or `!`, the result is 1 bit (true/false); `&`, `|`, `~` work bit by bit; a unary `&a`, `|a`, `^a` reduces a vector to 1 bit.",
    "If a literal looks odd, check the form `<size>'<base><digits>`, with any minus sign in front; a value wider than the size is truncated at the MSB.",
    "If asked to sign-extend, replicate the MSB: `{{n{X[msb]}}, X}`.",
    "If you see a gate-level module, draw one gate per primitive with the **first terminal as output**, label the wires, then write the expression.",
    "If an always block leaves any output unassigned on some path (no else, no default), say \"latch\" and fix it with defaults at the top.",
    "If an always block assigns a signal, that signal must be `reg`; if `assign` drives it, it must be a wire.",
    "If asked to find errors, check in order: `;` after the port list, reg declarations, `always @*`, `=` not `<=`, no `assign` inside always, every case covered, widths match, no `;` after `endmodule`.",
    "If asked to instantiate, use named connections `.port(signal)` and put any parameter override `#(.P(v))` between the module name and the instance name.",
  ],
};
