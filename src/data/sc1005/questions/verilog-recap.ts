import type { Draft } from "@/lib/sc1005/types";

export const verilogRecapQuestions: Draft[] = [
  // ---------------------------------------------------------------------------------------------
  // Literals, widths, concatenation
  {
    kind: "mcq",
    subtopic: "Number literals",
    difficulty: "easy",
    source: "Style: PYP 2021-22 S1 Q1(1)",
    prompt: "Which of the following Verilog literals is **illegal**?",
    options: ["`8'b1100_0011`", "`12'hABC`", "`6'o77`", "`4'b1021`", "`5'd19`"],
    answer: 3,
    solution:
      "A literal is `<size>'<radix><digits>` and every digit must be legal for the radix.\n- `8'b1100_0011`: binary, the underscore is only a separator → legal.\n- `12'hABC`: three hex digits = 12 bits → legal.\n- `6'o77`: two octal digits = 6 bits → legal.\n- `4'b1021`: **2 is not a binary digit** → illegal.\n- `5'd19`: decimal 19 = `10011`, which fits in 5 bits → legal.",
  },
  {
    kind: "short",
    subtopic: "Number literals",
    difficulty: "easy",
    source: "Style: Lecture 8A (literals, padding at the MSB)",
    prompt: "What 8-bit pattern does `w` hold after `wire [7:0] w = 6'o52;`? Give the answer in binary.",
    accept: ["00101010", "8'b00101010", "0010_1010", "0010 1010"],
    match: "text",
    placeholder: "e.g. 01010101",
    solution:
      "Each octal digit is 3 bits: $5 = 101$, $2 = 010$, so `6'o52` = `101010` (6 bits).\nAssigning a 6-bit value to the 8-bit wire pads the MSBs with zeros (Lecture 8A: `wire [5:0] x = 4'b1001` gives `001001`), so w = **00101010**.",
  },
  {
    kind: "mcq",
    subtopic: "Vector sizing",
    difficulty: "medium",
    source: "Style: Lecture 8A p.52",
    prompt: "What are the values of `x` and `y` after these declarations?",
    code: "wire [5:0] x = 4'b1011;\nwire [2:0] y = 6'b110101;",
    options: ["x = 6'b001011, y = 3'b101", "x = 6'b101100, y = 3'b110", "x = 6'b111011, y = 3'b101", "x = 6'b001011, y = 3'b110", "x = 6'b101100, y = 3'b101"],
    answer: 0,
    solution:
      "Widths are matched at the **MSB end**:\n- A 4-bit literal into a 6-bit wire is **zero-padded** on the left: `1011` → `001011` (Lecture 8A p.52).\n- A 6-bit literal into a 3-bit wire is **truncated** on the left, keeping the 3 LSBs: `110101` → `101`.\nThe distractors pad/truncate at the wrong end or sign-extend.",
  },
  {
    kind: "mcq",
    subtopic: "Concatenation and replication",
    difficulty: "easy",
    source: "Style: PYP 2021-22 S1 Q1(3)",
    prompt: "`X` is a 6-bit two's complement number. Which expression produces a **10-bit** value with the same numerical value as X?",
    options: ["`{4{X[5]}, X}`", "`{{4{X[5]}}, X}`", "`{X, {4{X[5]}}}`", "`{4'b0000, X}`", "There are multiple correct answers"],
    answer: 1,
    solution:
      "Sign extension copies the sign bit `X[5]` into the 4 new MSBs: `{{4{X[5]}}, X}`.\n- `{4{X[5]}, X}` is **illegal**: a replication used inside a concatenation must have its own braces.\n- `{X, {4{X[5]}}}` puts the copies at the LSB end (that multiplies by 16 and corrupts the low bits).\n- `{4'b0000, X}` zero-extends, which changes the value of a negative X (e.g. −1 = `111111` would become +63).\nOnly one option is correct.",
  },
  {
    kind: "short",
    subtopic: "Concatenation and replication",
    difficulty: "medium",
    source: "Style: Lecture 8A (concatenation)",
    prompt: "`a` is a 4-bit signal equal to `4'b1010`, and `y` is declared exactly as wide as the expression below. What is `y` in binary?",
    code: "assign y = {{2{a[3]}}, a, a[1:0]};",
    accept: ["11101010", "8'b11101010"],
    match: "text",
    placeholder: "binary digits",
    solution:
      "Build the concatenation left to right (leftmost part = MSBs):\n- `a[3]` = 1, so `{2{a[3]}}` = `11` (2 bits)\n- `a` = `1010` (4 bits)\n- `a[1:0]` = `10` (2 bits)\nJoined: `11` `1010` `10` = **`11101010`**, an 8-bit value.",
  },
  {
    kind: "mcq",
    subtopic: "Expression width",
    difficulty: "medium",
    source: "Style: Lecture 8A p.47-49",
    prompt: "What are the decimal values of `s` and `t`?",
    code: "wire [3:0] a = 4'd12, b = 4'd7;\nwire [3:0] s = a + b;\nwire [4:0] t = a + b;",
    options: ["s = 3, t = 19", "s = 19, t = 19", "s = 3, t = 3", "s = 19, t = 3", "s = 3, t = 11"],
    answer: 0,
    solution:
      "$12 + 7 = 19 = 10011_2$, which needs 5 bits.\n- `s` is 4 bits: the expression is evaluated at 4 bits and the carry is lost → `0011` = **3**.\n- `t` is 5 bits wide, so the carry bit fits → **19**.\nThis is why the lecture's 32-bit adder assigns `A + B + Cin` to a 33-bit wire w1 and takes the carry from w1[32], or writes `assign {Cout, Sum} = A + B + Cin;` (Lecture 8A p.47, p.58).",
  },
  {
    kind: "short",
    subtopic: "Conditional operator",
    difficulty: "medium",
    source: "Style: Verilog Recap p.10-11",
    prompt: "All signals are 1 bit. Write `f` as a Boolean expression in s, t, a, b and c (use ' for NOT). Any equivalent form is accepted.",
    code: "assign f = s ? (t ? a : b) : (a ^ c);",
    accept: ["s t a + s t' b + s' a c' + s' a' c", "s(t a + t' b) + s'(a ^ c)"],
    match: "expr",
    vars: ["s", "t", "a", "b", "c"],
    placeholder: "e.g. s t a + …",
    solution:
      "Each `?:` is a 2:1 multiplexer: `sel ? in1 : in0` = sel·in1 + sel'·in0.\n- Inner mux: `t ? a : b` = t a + t' b.\n- Outer mux selects that when s = 1, otherwise `a ^ c`.\nSo f = s(t a + t' b) + s'(a ⊕ c) = **s t a + s t' b + s' a c' + s' a' c**: two cascaded multiplexers with an XOR gate on the s = 0 input.",
  },
  // ---------------------------------------------------------------------------------------------
  // reg / wire, drivers, instantiation
  {
    kind: "mcq",
    subtopic: "reg vs wire",
    difficulty: "medium",
    source: "Style: PYP 2021-22 S1 Q1(4) / Verilog Recap p.3",
    prompt: "Which signals in this module **must** be declared as `reg`?",
    code: `module m (input a, b, clk,
          output p, q, r, s);
  wire t;
  and g1 (t, a, b);
  assign p = a ^ b;
  always @* q = a & t;
  always @(posedge clk) r <= p;
  sub u1 (.x(a), .y(s));        // y is an output port of sub
endmodule`,
    options: ["p, q and r", "q and r only", "q, r and s", "r only", "q, r and t"],
    answer: 1,
    solution:
      "Only the place where a signal is **assigned** matters:\n- `t`: output of a gate primitive → wire.\n- `p`: continuous `assign` → wire.\n- `q`: assigned in `always @*` → **reg** (it is still just an AND gate; reg ≠ flip-flop).\n- `r`: assigned in `always @(posedge clk)` → **reg** (a flip-flop).\n- `s`: driven by an instance output → must be a wire.\nSo the outputs are declared `output p, output reg q, r, output s`.",
  },
  {
    kind: "mcq",
    subtopic: "Instantiation rules",
    difficulty: "easy",
    source: "Style: PYP 2021-22 S1 Q1(6)",
    prompt: "Following the course's synthesisable coding rules, which **one** of these may appear inside a combinational `always @*` block?",
    options: ["`and g1 (y, a, b);`", "`assign y = a & b;`", "`y = a & b;`", "`half_add u1 (.a(a), .b(b), .sum(y), .cout(c));`", "`wire t = a & b;`"],
    answer: 2,
    solution:
      "An always block contains only **procedural statements**: blocking/non-blocking assignments, `if`, `case`, `begin…end`.\n- Gate primitives and module instances are pieces of hardware placed at module level; they can **never** be instantiated inside an always block (anywhere in it, combinational or not).\n- The lecture rule: you do not use the `assign` keyword inside an always block, ever.\n- Declarations (`wire t = …`) belong at module level.\nSo only `y = a & b;` (with y declared reg) is allowed.",
  },
  {
    kind: "mcq",
    subtopic: "Named instantiation and parameters",
    difficulty: "medium",
    source: "Style: Tutorial 7 Q2(b)(c)",
    prompt: "A comparator is declared as shown. In a top module with 12-bit signals `A`, `B` and a 1-bit wire `G`, which statement correctly creates a **12-bit** comparator using **named** port connection?",
    code: "module cmp #(parameter N = 4) (input [N-1:0] x, y, output gt);",
    options: [
      "`cmp #(.N(12)) U1 (.x(A), .y(B), .gt(G));`",
      "`cmp U1 #(.N(12)) (.x(A), .y(B), .gt(G));`",
      "`cmp #(N = 12) U1 (.x(A), .y(B), .gt(G));`",
      "`cmp #(.N(12)) U1 (x(A), y(B), gt(G));`",
      "`cmp #(.N(12)) U1 (.A(x), .B(y), .G(gt));`",
    ],
    answer: 0,
    solution:
      "Form: `module_name #(.PARAM(value)) instance_name (.port(signal), …);`\n- The parameter override goes **between the module name and the instance name** (not after U1).\n- Inside `#( )` a named override is `.N(12)`, not `N = 12`.\n- Each port connection needs a dot: `.x(A)`.\n- The **port** name (from the module) is outside the brackets and the **signal** (from the top module) inside: `.x(A)`, not `.A(x)`.\nWithout the override the instance would be 4 bits wide and only `A[3:0]`, `B[3:0]` would be compared.",
  },
  {
    kind: "mcq",
    subtopic: "Positional instantiation",
    difficulty: "hard",
    source: "Style: Lecture 8A p.32",
    prompt: "This full adder uses **positional** (ordered) connections. With A = 1, B = 0, CIN = 1, what are SUM and COUT?",
    code: `module add_half (input a, b, output sum, cout);
  assign sum  = a ^ b;
  assign cout = a & b;
endmodule

module full_add (input A, B, CIN, output SUM, COUT);
  wire w1, w2, w3;
  add_half M1 (A, B, w1, w2);
  add_half M2 (CIN, w1, w3, SUM);
  or o1 (COUT, w3, w2);
endmodule`,
    options: ["SUM = 0, COUT = 1", "SUM = 1, COUT = 0", "SUM = 1, COUT = 1", "SUM = 0, COUT = 0", "The code does not compile because M2's signals are in the wrong order"],
    answer: 1,
    solution:
      "Positional connection follows the port order of `add_half`: (a, b, sum, cout).\n- M1: a = A = 1, b = B = 0 → w1 = sum = 1, w2 = cout = 0.\n- M2: a = CIN = 1, b = w1 = 1 → its **sum** output (1 ⊕ 1 = 0) goes to **w3**, its **cout** output (1·1 = 1) goes to **SUM**.\n- COUT = w3 + w2 = 0 + 0 = 0.\nSo **SUM = 1, COUT = 0**, whereas a correct full adder gives 1 + 0 + 1 = $10_2$ (SUM = 0, COUT = 1). The code compiles without error: swapped positional connections are only a logic bug, which is why named connection `.sum(w3), .cout(SUM)` is preferred.",
  },
  // ---------------------------------------------------------------------------------------------
  // Combinational always blocks
  {
    kind: "mcq",
    subtopic: "Sensitivity list",
    difficulty: "medium",
    source: "Style: Lecture 8B p.5",
    prompt: "x and y are declared `reg`. Which statement about this block is true?",
    code: "always @(a or b)\nbegin\n  x = a & b;\n  y = x | c;\nend",
    options: [
      "Nothing is wrong, because x already depends on a and b",
      "The block is not triggered when only c changes, so y does not follow ab + c as expected; use `always @*`",
      "A flip-flop is inferred for y because c is missing from the list",
      "y is updated only when c changes",
      "The block runs only at clock edges",
    ],
    answer: 1,
    solution:
      "The sensitivity list must contain the names of any signals that affect the output of the block (Lecture 8B p.4). This block reads a, b **and** c, but only a and b are listed, so it will not be triggered when c changes: a change on c alone leaves y at its old value, which is not the expected output y = ab + c. Lecture 8B p.5 shows exactly this case. Fix: `always @*` (the * means all input signals inside the block).\nThere is no clock edge in the list, so nothing becomes a flip-flop.",
  },
  {
    kind: "mcq",
    subtopic: "Latch inference",
    difficulty: "medium",
    source: "Style: Lecture 8B p.22-24",
    prompt: "Which always block infers a **latch**?",
    options: [
      "always @* begin\n  y = 1'b0;\n  if (en) y = d;\nend",
      "always @*\n  case (s)              // s is 2 bits\n    2'b00: y = a;\n    2'b01: y = b;\n    default: y = c;\n  endcase",
      "always @* begin\n  if (en) begin\n    y = d;\n    z = 1'b1;\n  end\n  else\n    y = 1'b0;\nend",
      "always @(posedge clk)\n  if (en) q <= d;",
      "always @*\n  y = en ? d : 1'b0;",
    ],
    answer: 2,
    solution:
      "A latch appears when some output of a **combinational** block is not assigned on some path.\n- A: the default `y = 1'b0` at the top covers the en = 0 path → mux/AND gate.\n- B: `default` covers 10 and 11 → mux.\n- C: **z** is assigned only when en = 1; on the else path z must keep its value → **latch on z** (y itself is fine).\n- D: clocked block: 'no else' just means the flip-flop holds (a load-enable register), not a latch.\n- E: the conditional operator always yields a value → AND gate.",
  },
  {
    kind: "mcq",
    subtopic: "Latch inference",
    difficulty: "hard",
    source: "Style: Lecture 8B p.24",
    prompt: "`sel` is 2 bits; y and z are reg. What does this block synthesise to?",
    code: `always @* begin
  case (sel)
    2'b00: begin y = a; z = b; end
    2'b01: y = b;
    2'b10: begin y = c; z = a; end
    2'b11: begin y = d; z = c; end
  endcase
end`,
    options: [
      "No latch: all four values of sel are listed",
      "A latch on y only",
      "A latch on z only",
      "Latches on both y and z",
      "Nothing: the block is illegal because z is not assigned in every case item",
    ],
    answer: 2,
    solution:
      "Listing every value of sel is not enough: **each output** must be assigned in **every** branch.\n- y is assigned in all four items → a 4:1 mux, no latch.\n- z is not assigned when sel = 01, so z must hold its previous value there → a **latch on z**.\nThe code is legal (it just builds unwanted storage). Fix with `z = …;` in the 01 item or a default assignment `z = 1'b0;` before the case.",
  },
  {
    kind: "mcq",
    subtopic: "Statement order in comb blocks",
    difficulty: "hard",
    source: "Style: Lecture 8B p.20",
    prompt: "Which statement best describes the hardware produced by this block (y is a 2-bit reg)?",
    code: "always @* begin\n  y = 2'b00;\n  if (a) y = 2'b01;\n  if (b) y = 2'b10;\nend",
    options: [
      "A latch on y, because neither if statement has an else",
      "Combinational logic: y = 10 whenever b = 1, y = 01 when a = 1 and b = 0, otherwise y = 00",
      "Combinational logic: y = 11 when a = b = 1, because both if statements execute",
      "Nothing: y may not be assigned more than once in a block",
      "Combinational logic in which a has priority over b",
    ],
    answer: 1,
    solution:
      "In a combinational block statements are read in order and the **last assignment wins**.\n- The default `y = 2'b00` means y is assigned on every path → no latch.\n- If a = 1 the value becomes 01; if b = 1 it is then overwritten with 10.\nSo b has **priority**: (a, b) = 00 → 00, 10 → 01, 01 → 10, 11 → 10. The assignments replace y, they do not OR the bits together, and assigning a signal several times **within one block** is allowed (it is assigning from two different blocks that is illegal).",
  },
  // ---------------------------------------------------------------------------------------------
  // Sequential always blocks
  {
    kind: "mcq",
    subtopic: "Blocking vs non-blocking",
    difficulty: "easy",
    source: "Style: PYP 2021-22 S1 Q1(2)",
    prompt: "The statement below is inside an `always @(posedge clk)` block. Reading left to right, the two `<=` symbols are:",
    code: "if (count <= limit)\n  count <= count + 1'b1;",
    options: [
      "both non-blocking assignments",
      "a less-than-or-equal comparison, then a non-blocking assignment",
      "both less-than-or-equal comparisons",
      "a non-blocking assignment, then a less-than-or-equal comparison",
      "illegal: `<=` cannot be used inside an if condition",
    ],
    answer: 1,
    solution:
      "`<=` has two meanings decided by context. Inside an expression (the if condition) it is the relational operator 'less than or equal', giving 1 or 0. As a statement `lhs <= rhs;` it is a **non-blocking assignment**, the kind used in clocked always blocks. So: comparison, then non-blocking assignment.",
  },
  {
    kind: "mcq",
    subtopic: "Blocking vs non-blocking",
    difficulty: "medium",
    source: "Style: PYP 2016-17 S1 Q4(a); Verilog Recap p.19; Lecture 10 p.13",
    prompt: "Which row correctly compares a combinational always block with a synchronous always block?",
    options: [
      "Combinational: sensitivity list of signals or `*`, blocking `=`, each assignment is a wire connected to a circuit. Synchronous: `(posedge clk)`, non-blocking `<=`, each assignment is a register.",
      "Combinational: `(posedge clk)`, blocking `=`, each assignment is a register. Synchronous: `*`, non-blocking `<=`, each assignment is a wire.",
      "Combinational: sensitivity list of signals or `*`, non-blocking `<=`, order does not matter. Synchronous: `(posedge clk)`, blocking `=`, order matters.",
      "Both kinds use non-blocking `<=`; only the sensitivity list differs.",
      "Combinational: signals or `*`, blocking `=`, each assignment is a register. Synchronous: `(posedge clk)`, non-blocking `<=`, each assignment is a wire.",
    ],
    answer: 0,
    solution:
      "From the recap summary (p.19) and Lecture 10 p.13:\n- **Combinational** always block: sensitivity list of signals or `*`; **blocking** assignments `=`, where statement order matters; each assignment is a wire connected to a circuit.\n- **Synchronous** always block: sensitivity list `(posedge clk)`; **non-blocking** assignments `<=`, where statement order does not matter; each assignment is a register.\nThis is the answer expected when a paper asks for the difference between blocking and non-blocking assignment (PYP 2016-17 S1 Q4(a)).",
  },
  {
    kind: "mcq",
    subtopic: "What gets synthesised",
    difficulty: "hard",
    source: "Style: Lecture 10 p.47-48",
    prompt: "What is synthesised from this block?",
    code: `always @(posedge clk)
begin
  x <= a + b;
  y <= x - c;
  z <= y * y;
end`,
    options: [
      "Three registers x, y, z: x's register input is a + b, y's is the output of register x minus c, and z's is the output of register y times itself",
      "One register z, with a combinational circuit computing (a + b - c) squared at its input",
      "Three registers, all loading from a + b at the same clock edge",
      "No registers: the block is combinational because it contains only arithmetic",
      "Three latches that are transparent while clk is high",
    ],
    answer: 0,
    solution:
      "In a synchronous always block, **each (non-blocking) assignment results in a register**, with its input connected to a circuit built from the right-hand side and its output connected to the signal on the left-hand side (Lecture 10 p.47).\n- `x <= a + b`: an adder feeding register x.\n- `y <= x - c`: a subtractor fed by the **output of register x** and c, feeding register y.\n- `z <= y * y`: a multiplier fed by the output of register y, feeding register z.\nThis is the circuit drawn on Lecture 10 p.48. B is wrong because x and y are also assignments in the block, so they are registers too.",
  },
  {
    kind: "mcq",
    subtopic: "Resets",
    difficulty: "medium",
    source: "Style: Lecture 10 p.9-10 / PYP 2018-19 S1 Q4(b)(ii)",
    prompt: "`rst_n` is an **active-low** reset. Which block describes an 8-bit register with an **asynchronous** active-low reset?",
    options: [
      "always @(posedge clk or negedge rst_n)\n  if (!rst_n) q <= 8'd0;\n  else        q <= d;",
      "always @(posedge clk)\n  if (!rst_n) q <= 8'd0;\n  else        q <= d;",
      "always @(posedge clk or posedge rst_n)\n  if (!rst_n) q <= 8'd0;\n  else        q <= d;",
      "always @(posedge clk or negedge rst_n)\n  if (rst_n) q <= 8'd0;\n  else       q <= d;",
      "always @*\n  if (!rst_n) q = 8'd0;\n  else        q = d;",
    ],
    answer: 0,
    solution:
      "An asynchronous reset must wake the block by itself, so it goes into the event list, on the edge where it **becomes active**: active-low → `negedge rst_n`; and the test inside is `if (!rst_n)`.\n- B is a valid register with a **synchronous** reset (acts only at clock edges).\n- C triggers on the reset being released, the wrong edge.\n- D tests the wrong polarity (it would clear while rst_n = 1).\n- E has no clock edge in its list, so q would not be a register at all.",
  },
  {
    kind: "short",
    subtopic: "Counters: values after clock edges",
    difficulty: "medium",
    source: "Style: Tutorial 9 Q3",
    prompt: "`rst` is 1 at the first rising edge of clk and 0 at every edge after that. What is `q` (in decimal) immediately after the **9th** rising edge?",
    code: `reg [3:0] q;
always @(posedge clk)
  if (rst)        q <= 4'd0;
  else if (q[3])  q <= q + 4'd3;
  else            q <= q + 4'd5;`,
    accept: ["0"],
    match: "number",
    solution:
      "Tabulate edge by edge; the conditions use the value of q **before** the edge, and every result wraps modulo 16:\n- edge 1: reset → 0\n- edge 2: q[3] = 0 → 0 + 5 = 5\n- edge 3: 5 + 5 = 10\n- edge 4: 10 = `1010`, q[3] = 1 → 10 + 3 = 13\n- edge 5: 13 + 3 = 16 → **0** (4-bit wrap)\n- edges 6–9 repeat: 5, 10, 13, 0\nSo q = **0** after the 9th edge. (Writing 16 forgets that q is only 4 bits.)",
  },
  {
    kind: "short",
    subtopic: "Combinational + sequential timing",
    difficulty: "hard",
    source: "Style: Verilog Recap p.18",
    prompt: "z and r are 0 before the first rising edge. Inputs a and b change only while clk is low, as shown (rising edges 1–4 are marked). What is `r` (in decimal) immediately after the **3rd** rising edge?",
    code: `module pipe (input clk, input [7:0] a, b, output reg [7:0] r);
  reg [7:0] x, z;
  always @* x = a + b;
  always @(posedge clk) begin
    z <= x;
    r <= z + x;
  end
endmodule`,
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "01010101" },
          { name: "a", wave: "=.=.=.=.", data: ["3", "10", "100", "1"] },
          { name: "b", wave: "=.=.=.=.", data: ["4", "2", "200", "1"] },
        ],
        marks: [1, 3, 5, 7],
        caption: "a and b in decimal.",
      },
    ],
    accept: ["56"],
    match: "number",
    solution:
      "x is combinational (x = a + b, 8 bits, immediately); z and r are registers. At each edge, z takes the current x and r takes **old z** + current x.\n- Edge 1: x = 3 + 4 = 7 → z = 7, r = 0 + 7 = 7.\n- Edge 2: x = 10 + 2 = 12 → z = 12, r = 7 + 12 = 19.\n- Edge 3: x = 100 + 200 = 300, which does not fit in 8 bits: 300 − 256 = **44** → z = 44, r = 12 + 44 = **56**.\n- (Edge 4: x = 2 → r = 44 + 2 = 46.)\nTwo traps: using the new z instead of the old one, and forgetting the 8-bit truncation of x.",
    solutionFigures: [
      {
        kind: "table",
        head: ["edge", "a", "b", "x = a+b (8-bit)", "z after", "r after = old z + x"],
        rows: [
          [1, 3, 4, 7, 7, "0 + 7 = 7"],
          [2, 10, 2, 12, 12, "7 + 12 = 19"],
          [3, 100, 200, "300 → 44", 44, "12 + 44 = 56"],
          [4, 1, 1, 2, 2, "44 + 2 = 46"],
        ],
      },
    ],
  },
  {
    kind: "short",
    subtopic: "Registers and FIFOs",
    difficulty: "hard",
    source: "Style: Tutorial 8 Q3",
    prompt: "The registers have just been reset (all 0). Then rst = 0 and `in` takes the hex values 3, A, 6, F, 0, 9 before rising edges 1 to 6 respectively. Give `out` (one hex digit) after each of edges 1 to 6, written as a 6-digit string.",
    code: `module fifo_inv (input clk, rst, input [3:0] in, output [3:0] out);
  reg [3:0] r1, r2, r3;
  always @(posedge clk)
    if (rst) begin
      r1 <= 4'h0; r2 <= 4'h0; r3 <= 4'h0;
    end else begin
      r1 <= in;
      r2 <= ~r1;
      r3 <= r2;
    end
  assign out = r3;
endmodule`,
    accept: ["0FC590", "0 F C 5 9 0", "0,F,C,5,9,0", "0, F, C, 5, 9, 0"],
    match: "text",
    placeholder: "6 hex digits",
    solution:
      "Each `<=` is a register; at every edge all three take their inputs' **old** values together. `~` inverts each bit (`~3` = C, `~A` = 5, `~6` = 9, `~0` = F).\n- Edge 1: r1 = 3, r2 = ~0 = F, r3 = 0 → out **0**\n- Edge 2: r1 = A, r2 = ~3 = C, r3 = F → out **F** (the inverted reset value arrives first)\n- Edge 3: r1 = 6, r2 = ~A = 5, r3 = C → **C**\n- Edge 4: r1 = F, r2 = ~6 = 9, r3 = 5 → **5**\n- Edge 5: r1 = 0, r2 = ~F = 0, r3 = 9 → **9**\n- Edge 6: r1 = 9, r2 = ~0 = F, r3 = 0 → **0**\nAnswer: **0FC590**. Each input appears inverted at out three edges after it is applied.",
    solutionFigures: [
      {
        kind: "table",
        head: ["edge", "in", "r1", "r2 = ~old r1", "r3 = old r2 = out"],
        rows: [
          [1, "3", "3", "F", "0"],
          [2, "A", "A", "C", "F"],
          [3, "6", "6", "5", "C"],
          [4, "F", "F", "9", "5"],
          [5, "0", "0", "0", "9"],
          [6, "9", "9", "F", "0"],
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------------------------
  // Synthesisability, literals in PYP style, find-the-errors
  {
    kind: "mcq",
    subtopic: "Synthesisable constructs",
    difficulty: "easy",
    source: "Style: Lecture 8A p.43",
    prompt: "Lecture 8A lists the arithmetic operators Verilog supports. Which of these assign statements uses an operator that is **not generally synthesizable**?",
    options: [
      "`assign y = a * b;`",
      "`assign y = a / b;`",
      "`assign y = a - b;`",
      "`assign y = (a > b) ? a : b;`",
      "`assign {c, s} = a + b;`",
    ],
    answer: 1,
    solution:
      "Verilog supports `+ - * /` and the comparisons `< <= > >= == !=`, but the lecture notes that **division is not generally synthesizable** (Lecture 8A p.43). The others are all fine in hardware: a multiplier, a subtractor, a comparator feeding a multiplexer (the lecture's `max = (a>b) ? a : b`), and an adder whose carry goes to c.",
  },
  {
    kind: "short",
    subtopic: "Concatenation and replication",
    difficulty: "medium",
    source: "PYP 2017-18 S1 Q3(a)",
    prompt: "Let a = 5'b11011, b = 3'b101 and c = 3'b011. Determine the 7-bit value of x[6:0] after the statement below (in binary).",
    code: "assign x = b[1] ? {a, c[1:0]} : {b, a[3:0]};",
    accept: ["1011011", "7'b1011011"],
    match: "text",
    placeholder: "7 binary digits",
    solution:
      "- The condition is b[1]: b = 101, so b[1] = **0** and the conditional assignment selects the second expression (Recap p.10: `?:` is a multiplexer).\n- `{b, a[3:0]}` = `101` followed by a[3:0] = `1011` → `1011011`, 3 + 4 = 7 bits, exactly the width of x.\nSo x = **1011011**. (Had b[1] been 1, x would be `{a, c[1:0]}` = `11011` `11` = `1101111`.)",
  },
  {
    kind: "mcq",
    subtopic: "Find the errors",
    difficulty: "medium",
    source: "Style: Tutorial 7 Q3",
    prompt: "The module below should output `y = sel ? a : b` and `flag = 1` when en = 1 and y is zero. Which of the following is **NOT** a genuine problem with it?",
    code: `module pick (input [3:0] a, b,
             input sel, en,
             output [3:0] y, output flag);
  always @(a, b)
    if (sel) y = a;
    else     y = b;
  assign flag = en & (y == 4'd0)
endmodule`,
    options: [
      "`y` must be declared `output reg [3:0] y`",
      "`sel` is missing from the sensitivity list (use `always @*`)",
      "The `assign` statement is missing its semicolon",
      "`flag` must be declared `reg` because it is computed from the reg `y`",
      "None of the above: all four are genuine problems",
    ],
    answer: 3,
    solution:
      "- y is assigned inside an always block → it must be a reg: genuine error.\n- The block reads sel but sel is not in the list → the block is not triggered when sel changes: genuine error (use `@*`).\n- `assign flag = …` needs a terminating `;`: genuine syntax error.\n- flag is driven by an `assign`, so it must stay a **wire**. Reading a reg on the right-hand side has no effect on the declaration of the left-hand side. This statement is **false**, so D is the answer.",
  },
  {
    kind: "open",
    subtopic: "Find the errors",
    difficulty: "medium",
    source: "Style: Tutorial 7 Q3",
    prompt:
      "The module below should output p, q or r for s = 00, 01, 10 respectively and 0000 for s = 11, and `zero` should be 1 whenever `out` is 0000. It contains several errors that would make it fail to compile or synthesise incorrectly.\n(a) Identify each error and rewrite the module correctly. (11 marks)\n(b) Rewrite the `out` logic as a single conditional assignment. (4 marks)",
    code: `module selector (input [3:0] p, q, r,
                 input [1:0] s,
                 output [3:0] out,
                 output zero);
  always @ (p, q)
  begin
    case (s)
      2'b00 : out = p;
      2'b01 : out = q;
      2'b10 : out <= r;
      2'b11 : zero = 1'b1;
    endcase
  end
  assign zero = (out == 4'd0);
endmodule;`,
    modelAnswer:
      "**(a) Errors and fixes**\n- `out` is assigned in an always block → declare `output reg [3:0] out`.\n- Sensitivity list `(p, q)` misses r and s → `always @*`.\n- `out <= r` is non-blocking inside a combinational block → `out = r`.\n- out is not assigned when s = 11 (that item assigns zero instead) → latch; assign `out = 4'b0000` for 11 (or a `default`).\n- `zero` is driven twice (inside the always block and by the `assign`), and it is a wire → remove the assignment from the case; keep only the `assign`.\n- `endmodule;` → `endmodule` (no semicolon).\n```\nmodule selector (input [3:0] p, q, r,\n                 input [1:0] s,\n                 output reg [3:0] out,\n                 output zero);\n  always @* begin\n    case (s)\n      2'b00  : out = p;\n      2'b01  : out = q;\n      2'b10  : out = r;\n      default: out = 4'b0000;\n    endcase\n  end\n  assign zero = (out == 4'd0);\nendmodule\n```\n**(b)** With `out` declared as a plain `output [3:0] out` (a wire again):\n```\nassign out = (s == 2'b00) ? p :\n             (s == 2'b01) ? q :\n             (s == 2'b10) ? r : 4'b0000;\n```",
    rubric: [
      { point: "out declared `output reg [3:0] out`", marks: 2 },
      { point: "Sensitivity list fixed to `@*` (or lists p, q, r, s)", marks: 2 },
      { point: "Non-blocking `<=` in the combinational block replaced by `=`", marks: 2 },
      { point: "out assigned for s = 11 / default added, so no latch", marks: 2 },
      { point: "zero driven from one place only (assignment removed from the case)", marks: 2 },
      { point: "Stray semicolon after endmodule removed", marks: 1 },
      { point: "(b) Correct nested conditional assignment covering all four cases", marks: 3 },
      { point: "(b) out declared as a wire when driven by assign", marks: 1 },
    ],
    solution:
      "Run the find-the-errors checklist line by line: reg declaration, sensitivity list, blocking vs non-blocking, complete assignment (latch), single driver, syntax. Six errors in total.",
  },
  {
    kind: "open",
    subtopic: "Find the errors",
    difficulty: "medium",
    source: "Style: Tutorial 9 Q1(a)",
    prompt:
      "This module is meant to be a decade (0–9) counter with a **synchronous** active-high reset `rst`, a count enable `en`, and a terminal-count output `tc` that is 1 while the count is 9.\n(a) Explain everything that is wrong with it. (8 marks)\n(b) Write the corrected module, using a parameter `MOD = 10` for the modulus. (4 marks)",
    code: `module cnt10 (input clk, rst, en,
              output [3:0] count, output tc);
  always @(posedge clk or rst)
  begin
    if (rst) count = 4'd0;
    else if (en)
      if (count == 4'd9) count <= 4'd0;
      else count <= count + 1;
    assign tc = (count == 4'd9);
  end
endmodule`,
    modelAnswer:
      "**(a)**\n- `count` is assigned in an always block → `output reg [3:0] count`.\n- `@(posedge clk or rst)`: listing the reset in the sensitivity list is how an **asynchronous** reset is written (and then as `posedge rst`, Lecture 10 p.10). A synchronous reset is only tested at the clock edge, so the list is just `posedge clk` (Lecture 10 p.8).\n- `count = 4'd0` is a blocking assignment in a clocked block → use `<=` like the other branches.\n- `assign tc = …` is inside the always block: continuous assignments (and instances) belong at module level → move it outside; tc stays a wire.\n**(b)**\n```\nmodule cnt10 #(parameter MOD = 10) (\n    input clk, rst, en,\n    output reg [3:0] count,\n    output tc);\n  always @(posedge clk) begin\n    if (rst)\n      count <= 4'd0;\n    else if (en) begin\n      if (count == MOD - 1) count <= 4'd0;\n      else                  count <= count + 1'b1;\n    end\n  end\n  assign tc = (count == MOD - 1);\nendmodule\n```",
    rubric: [
      { point: "count must be declared `output reg [3:0]`", marks: 2 },
      { point: "Sensitivity list: only `posedge clk` for a synchronous reset", marks: 2 },
      { point: "Blocking `=` in the reset branch changed to `<=`", marks: 2 },
      { point: "`assign tc` moved outside the always block (tc remains a wire)", marks: 2 },
      { point: "(b) Parameter MOD declared in the header and used for the wrap and tc", marks: 2 },
      { point: "(b) Complete, correct clocked block with reset, enable and wrap", marks: 2 },
    ],
    solution:
      "Four separate faults: declaration (reg), sensitivity list (reset listed although it is synchronous), blocking assignment in a clocked block, and an `assign` placed inside an always block. Note that `count + 1` is not an error, but `1'b1` makes the width intention explicit.",
  },
  // ---------------------------------------------------------------------------------------------
  // Write-a-module questions
  {
    kind: "open",
    subtopic: "Writing parameterised counters",
    difficulty: "hard",
    source: "Style: PYP 2021-22 S1 Q3",
    prompt:
      "Write the Verilog code for a WIDTH-bit up/down counter with output `CNT`. Inputs: `clk`; a synchronous active-high reset `rst` (CNT → 0); an enable `EN` (when EN = 0 the count holds); and a direction input `D`.\n- When D = 1 the counter counts **down** and is restricted to the range 0 to MAXV: from 0 it wraps to MAXV, and if CNT is above MAXV when D = 1 it must move to MAXV on the next count.\n- When D = 0 the counter counts **up** with no restriction (wrapping naturally from all 1s to 0).\nUse a parameter statement with WIDTH = 5 and MAXV = 19. (20 marks)",
    modelAnswer:
      "```\nmodule updown #(parameter WIDTH = 5, MAXV = 19) (\n    input clk, rst, EN, D,\n    output reg [WIDTH-1:0] CNT);\n\n  always @(posedge clk) begin\n    if (rst)\n      CNT <= 0;\n    else if (EN) begin\n      if (D) begin                          // count down in 0..MAXV\n        if (CNT > MAXV || CNT == 0)\n          CNT <= MAXV;\n        else\n          CNT <= CNT - 1'b1;\n      end\n      else\n        CNT <= CNT + 1'b1;                  // count up, natural wrap\n    end\n  end\nendmodule\n```\nNotes: CNT is a reg because it is assigned in a clocked always block; the width comes from the parameter so the same code works for any WIDTH; with EN = 0 no branch assigns CNT, which in a clocked block simply holds the value (no latch). With WIDTH = 5, counting up runs 0 … 31 → 0; counting down runs 19, 18, … 0, 19, …, and a value such as 25 jumps to 19.",
    rubric: [
      { point: "Module header with `#(parameter WIDTH = 5, MAXV = 19)` and inputs clk, rst, EN, D", marks: 3 },
      { point: "`output reg [WIDTH-1:0] CNT` (reg, parameterised width)", marks: 3 },
      { point: "`always @(posedge clk)` with non-blocking assignments throughout", marks: 3 },
      { point: "Synchronous reset tested first, clearing CNT", marks: 2 },
      { point: "Count only when EN = 1, otherwise hold", marks: 2 },
      { point: "D = 0: count up with `CNT + 1'b1` (unrestricted)", marks: 2 },
      { point: "D = 1: count down with 0 wrapping to MAXV", marks: 2 },
      { point: "D = 1 and CNT > MAXV: next value MAXV", marks: 2 },
      { point: "Correct syntax (begin/end pairs, endmodule, semicolons)", marks: 1 },
    ],
    solution:
      "Follow the counter recipe: parameter header → `output reg [WIDTH-1:0]` → one `always @(posedge clk)` → reset first → enable → direction, with the range checks nested inside the down branch. Check edge cases by hand: from 0 with D = 1 the next value is 19; from 25 with D = 1 it is 19; from 31 with D = 0 it is 0.",
  },
  {
    kind: "open",
    subtopic: "Instantiation design",
    difficulty: "hard",
    source: "Style: PYP 2021-22 S1 Q4",
    prompt:
      "Design a circuit `gt5` that compares two 5-bit two's complement numbers X[4:0] and Y[4:0] and outputs G = 1 when **X > Y** (strictly greater), otherwise G = 0. You must use exactly one instance of each of these modules:\n- a 4-to-1 multiplexer `module mux41 (input [3:0] D, input [1:0] S, output W);` with W = D[S]\n- a 4-bit unsigned comparator `module ult4 (input [3:0] A, B, output L);` with L = 1 when A < B (unsigned)\n(a) Explain how the two sign bits determine the result and state what must be connected to each multiplexer input and to the comparator. (8 marks)\n(b) Write the Verilog module `gt5` using named instantiation. Internal signals should match your design in (a). (10 marks)",
    modelAnswer:
      "**(a)** Use the sign bits as the mux select, S = {X[4], Y[4]}.\n- S = 01: X ≥ 0 and Y < 0 → X > Y always → W = 1.\n- S = 10: X < 0 and Y ≥ 0 → never greater → W = 0.\n- S = 00 or 11 (same sign): X − Y has the same sign as X[3:0] − Y[3:0] (both numbers lie in 0…15, or both in −16…−1 where value = −16 + low 4 bits), so X > Y exactly when Y[3:0] < X[3:0] as unsigned numbers. Connect the comparator with A = Y[3:0], B = X[3:0]; its output L is the answer.\n- Data inputs: D[0] = L, D[1] = 1, D[2] = 0, D[3] = L, i.e. D = {L, 1'b0, 1'b1, L}.\n**(b)**\n```\nmodule gt5 (input [4:0] X, Y, output G);\n  wire L;                                   // comparator output\n\n  ult4  U1 (.A(Y[3:0]), .B(X[3:0]), .L(L));\n  mux41 U2 (.D({L, 1'b0, 1'b1, L}),\n            .S({X[4], Y[4]}),\n            .W(G));\nendmodule\n```",
    modelFigures: [
      {
        kind: "table",
        head: ["S = {X[4], Y[4]}", "signs", "G = W", "mux input"],
        rows: [
          ["00", "X ≥ 0, Y ≥ 0", "L = (Y[3:0] < X[3:0])", "D[0] = L"],
          ["01", "X ≥ 0, Y < 0", "1", "D[1] = 1"],
          ["10", "X < 0, Y ≥ 0", "0", "D[2] = 0"],
          ["11", "X < 0, Y < 0", "L = (Y[3:0] < X[3:0])", "D[3] = L"],
        ],
      },
    ],
    rubric: [
      { point: "(a) Different signs give a fixed answer: 01 → 1, 10 → 0", marks: 3 },
      { point: "(a) Same signs: compare the low 4 bits as unsigned, with Y on A and X on B (so L means X > Y)", marks: 3 },
      { point: "(a) Select S = {X[4], Y[4]} and data {L, 0, 1, L} in the right order", marks: 2 },
      { point: "(b) Module header: 5-bit inputs X, Y and 1-bit output G", marks: 2 },
      { point: "(b) Internal wire L declared", marks: 1 },
      { point: "(b) ult4 instantiated with named connections to Y[3:0] and X[3:0]", marks: 3 },
      { point: "(b) mux41 instantiated with named connections; D built by concatenation, S = {X[4], Y[4]}", marks: 3 },
      { point: "(b) Syntax: instance names, semicolons, endmodule", marks: 1 },
    ],
    solution:
      "The trick is that two's complement numbers with the same sign compare exactly like their low bits do as unsigned numbers, while numbers with different signs are decided by the signs alone. Constants and concatenations may be fed straight into an instance's input port, so no extra gates are needed. Check: X = 00111 (7), Y = 11000 (−8): S = 01 → G = 1 ✓; X = 10100 (−12), Y = 11001 (−7): S = 11, L = (1001 < 0100) = 0 → G = 0 ✓.",
  },
];
