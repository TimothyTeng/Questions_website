import type { Lesson } from "@/lib/sc1005/types";

export const verilogRecapLesson: Lesson = {
  topic: "verilog-recap",
  bigPicture:
    "Verilog is not a programming language that runs line by line: every statement describes a piece of hardware, and the synthesis tool builds it. This recap pulls together all the Verilog in the course into one set of rules you can apply under exam pressure. Structural Verilog (gate primitives, module instances, `assign`) wires hardware together; behavioural Verilog uses `always` blocks, either combinational (`always @*`, blocking `=`, every output assigned on every path) or synchronous (`always @(posedge clk)`, non-blocking `<=`, each assignment becomes a register). Around these sit the bookkeeping rules that the MCQs test: what must be a `reg`, which literals are legal, how widths are padded or truncated, how concatenation and parameters work, and why a signal may have only one driver. The structured questions then ask you to write a parameterised counter or connect given modules with named instantiation, and the 'find the errors' questions are just this checklist applied to a broken module. Think in hardware: if you cannot picture the circuit, the code is probably wrong.",
  sections: [
    // ------------------------------------------------------------------------------------------
    {
      title: "Modules, ports, wire and reg",
      intuition:
        "A module is a box of hardware with pins (ports); inside, signals are just wires joining pieces of logic. The only question that decides `wire` or `reg` is **where the signal is assigned**, not what hardware it becomes.",
      visuals: ["reg-wire-helper"],
      keyIdeas: [
        "Module skeleton: `module name (input a, b, output y); … endmodule` (no semicolon after `endmodule`). Ports with the same direction and type can share one declaration, separated by commas.",
        "Ports behave exactly like wires: you can **read** any port, but you can only **drive** (assign to) an output. Never drive an input port from inside the module.",
        "`wire` = a connection with no storage. It is driven by a continuous `assign`, a gate primitive output or a module-instance output. 1-bit wires used only to connect instances may be left undeclared (implicit); multi-bit wires must be declared.",
        "`reg` = any signal assigned inside an `always` block (combinational or clocked). A `reg` is **not** necessarily a register: inside `always @*` it synthesises to plain gates.",
        "An output assigned inside an always block is declared `output reg [3:0] q`. You cannot `assign` to a reg, and you cannot connect a reg to an instance output.",
        "**One driver per signal**: each wire/reg/port is assigned from exactly one place: one `assign`, one `always` block, or one instance/gate output. You never want to assign to a wire, port or reg from more than one place (Recap p.6).",
        "Order of `assign` statements, gate instances and always blocks in a module is irrelevant: they are concurrent hardware.",
        "Housekeeping: Verilog is case-sensitive (`Data` ≠ `data`); identifiers start with a letter or `_`; comments `//` and `/* … */` (block comments cannot nest); statements end with `;`.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Signal is assigned by…", "Declare it as", "Synthesises to"],
          rows: [
            ["`assign y = …;`", "`wire` (default for ports)", "combinational logic"],
            ["gate primitive / module instance output", "`wire`", "output pin of that gate / instance"],
            ["`always @*` with `=`", "`reg`", "combinational logic (no storage)"],
            ["`always @(posedge clk)` with `<=`", "`reg`", "D flip-flop(s)"],
            ["two or more of the above", "illegal", "conflicting drivers"],
          ],
          caption: "The reg / wire decision depends only on where the signal is assigned.",
        },
      ],
      code: [
        {
          title: "Same AND gate, three legal ways",
          code: `module and_demo (input a, b, clk,
                 output p,          // wire: driven by assign
                 output reg q,      // reg: driven by an always block
                 output reg r);     // reg: becomes a flip-flop
  assign p = a & b;
  always @* q = a & b;
  always @(posedge clk) r <= a & b;
endmodule`,
        },
      ],
      example: {
        problem:
          "In the module below, which signals must be declared `reg`?\n```\nmodule m (input a, b, clk, output s, t, u, v);\n  wire w;\n  and g1 (w, a, b);\n  assign s = w | a;\n  always @* t = ~w;\n  always @(posedge clk) u <= s;\n  sub inst1 (.in(a), .out(v));\nendmodule\n```",
        steps: [
          "Go signal by signal and find the **one place** each is assigned.",
          "`w` is the output of the gate primitive `g1` → wire. `s` is driven by `assign` → wire.",
          "`t` is assigned inside `always @*` → **reg**, even though it is only an inverter.",
          "`u` is assigned inside `always @(posedge clk)` → **reg** (a flip-flop).",
          "`v` is driven by the output port of instance `inst1` → wire. Declaring it reg would be an error.",
        ],
        answer: "Only `t` and `u`: `output reg t, u`. All the others stay wires.",
      },
      pitfalls: [
        "Thinking `reg` means flip-flop. A reg in `always @*` is combinational.",
        "Declaring a module-instance output as `reg`: instance outputs drive wires.",
        "Assigning one signal from both an `assign` and an `always` block (or from two always blocks): illegal, even if 'they never happen at the same time'.",
        "Putting a semicolon after `endmodule` (`endmodule;`) — a classic in the find-the-errors questions.",
      ],
      recall: [
        { q: "What single fact decides whether a signal is wire or reg?", a: "Where it is assigned: inside an always block → reg; by assign, gate or instance output → wire." },
        { q: "Does `output reg y` assigned in `always @*` create a flip-flop?", a: "No. It is combinational logic; reg only means 'written procedurally'." },
        { q: "How many places may assign to one signal?", a: "Exactly one (one assign, one always block or one instance output)." },
      ],
    },
    // ------------------------------------------------------------------------------------------
    {
      title: "Structural Verilog: primitives, instances and parameters",
      intuition:
        "Structural code draws a schematic in text: place gates and sub-modules and join their pins. Parameters let one module description be stamped out at different widths.",
      visuals: ["param-override"],
      keyIdeas: [
        "Gate primitives: `and, nand, or, nor, not, xor, xnor`. The **output is the first argument**, then any number of inputs: `or (z, a, b, c, d);`. An instance name is optional: `nand g3 (y, p, q);`.",
        "Module instance: `module_name instance_name (connections);`, e.g. `add_half M1 (A, B, w1, w2);` creates an instance called M1.",
        "**Positional (ordered) connection** `add_half M1 (A, B, w1, w2);` matches signals to ports in the order the ports were declared. Error-prone: swapping two signals silently swaps the pins.",
        "**Named connection** `add_half M1 (.a(A), .b(B), .sum(w1), .cout(w2));` — `.port(signal)`, order irrelevant. Use it whenever a question says 'use named instantiation'.",
        "An input pin may be connected to an expression, e.g. `.enable(~full)` (Recap p.7). An instance output must connect to a wire: you cannot connect a reg to a module instance output (Lecture 8B p.7).",
        "Instances and gate primitives are concurrent hardware and live at module level. They can **never** be placed inside an `always` block (PYP 2021-22 Q1(6)).",
        "Parameters are module-local constants: `module addN #(parameter N = 8, M = 4) (input [N-1:0] x, …);`. They are used for widths and for named constants such as state codes (`parameter S0 = 2'b00, S1 = 2'b01;`).",
        "Redefine a parameter per instance: `addN #(.N(12)) U1 (.x(a), .y(b), .s(sum));` (Lecture 8A p.57). The `#(…)` goes **between the module name and the instance name**. Each instance can get a different value.",
        "Widths should match: Verilog lets you connect mismatched widths, cutting off or zero-padding MSBs, so check the synthesis warnings (Lecture 8A p.49). Redefining the parameter in the instantiation keeps every port matched: the idea behind Tutorial 7 Q2(c).",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "B", "CIN"],
            gates: [
              { id: "w1", type: "XOR", in: ["A", "B"], label: "M1" },
              { id: "w2", type: "AND", in: ["A", "B"], label: "M1" },
              { id: "SUM", type: "XOR", in: ["CIN", "w1"], label: "M2" },
              { id: "w3", type: "AND", in: ["CIN", "w1"], label: "M2" },
              { id: "COUT", type: "OR", in: ["w3", "w2"], label: "o1" },
            ],
            outputs: ["SUM", "COUT"],
            showNets: true,
          },
          caption: "`full_add` = two `add_half` instances (M1 makes w1, w2; M2 makes SUM, w3) plus an OR gate o1.",
        },
      ],
      code: [
        {
          title: "Full adder from two half adders (named connection)",
          code: `module add_half (input a, b, output sum, cout);
  xor g1 (sum, a, b);
  and g2 (cout, a, b);
endmodule

module full_add (input A, B, CIN, output SUM, COUT);
  wire w1, w2, w3;
  add_half M1 (.a(A),   .b(B),  .sum(w1),  .cout(w2));
  add_half M2 (.a(CIN), .b(w1), .sum(SUM), .cout(w3));
  or o1 (COUT, w3, w2);
endmodule`,
        },
        {
          title: "Parameter override: two 16-bit copies of an 8-bit-default module",
          code: `module submod #(parameter SIZE = 8) (
    input  [SIZE-1:0] X, Y,
    output [SIZE-1:0] Z);
  assign Z = X & Y;
endmodule

module top_mod #(parameter SIZE = 16) (
    input  [SIZE-1:0] a, b, c,
    output [SIZE-1:0] D, E);
  submod #(.SIZE(SIZE)) U1 (.X(a), .Y(b), .Z(D));
  submod #(.SIZE(SIZE)) U2 (.X(c), .Y(b), .Z(E));
endmodule`,
        },
      ],
      example: {
        problem:
          "A car park has four lanes. A 2-bit input `lane` selects which barrier output `lift[3:0]` to raise (one-hot); when input `closed` is 1 no barrier may lift. Using the given decoder `module dec2to4 (input [1:0] i, input en, output [3:0] d);`, write the top module with named instantiation.",
        steps: [
          "Ports of the top module: `input [1:0] lane`, `input closed`, `output [3:0] lift` (driven by an instance → wire).",
          "The decoder must be enabled only when the car park is open: `en = ~closed`. An expression is allowed on an input pin.",
          "Connect each decoder port by name: `.i(lane)`, `.en(~closed)`, `.d(lift)`.",
          "Give the instance a name, e.g. `U1`. No always block is needed: the instance is hardware on its own.",
        ],
        answer:
          "```\nmodule carpark (input [1:0] lane, input closed,\n                output [3:0] lift);\n  dec2to4 U1 (.i(lane), .en(~closed), .d(lift));\nendmodule\n```",
      },
      pitfalls: [
        "Positional connection with the ports in the wrong order: it compiles and silently swaps pins (e.g. SUM receives the carry).",
        "Writing `cmp U1 #(.N(12)) (…)` or `cmp #(N=12) U1 (…)`: the override is `#(.N(12))` placed right after the module name.",
        "Instantiating a module or gate inside an `always` block: never allowed.",
      ],
      recall: [
        { q: "Which argument of a gate primitive is the output?", a: "The first: `and (y, a, b);`." },
        { q: "Why prefer named over positional connection?", a: "Order no longer matters, so adding/reordering ports cannot silently mis-wire the instance." },
        { q: "Where does the parameter override go?", a: "Between module name and instance name: `addN #(.N(12)) U1 (…);`." },
        { q: "Can a module instance appear inside an always block?", a: "No, never: instances are module-level hardware." },
      ],
    },
    // ------------------------------------------------------------------------------------------
    {
      title: "Vectors, literals and operators",
      intuition:
        "A vector is a bundle of wires with numbered bits. Most Verilog bugs in the MCQs are width bugs: a literal or a result silently padded or truncated at the MSB end.",
      visuals: ["vector-sizing"],
      keyIdeas: [
        "Declaration `wire [7:0] bus;` — the left index is the MSB, LSB is 0 by convention. Bit select `bus[3]`, part select `bus[5:2]`; you can also assign to a slice: `assign x[2:1] = y[4:3];`.",
        "Literal format `<size>'<radix><value>`, radix `b`, `o`, `d`, `h`: `4'b1010`, `6'o17`, `5'd19`, `8'hA5`. Underscores are only separators: `16'b0010_1110_0110_1001` = `16'h2E69`.",
        "Digits must fit the radix (`4'b1021` is illegal). A literal that does not follow `<size>'<radix><value>` is illegal: PYP 2021-22 Q1(1) offers `4'd-3`, `4'-d3`, `4d'-3` and `-4d'3` as negative numbers, and none of them fits the form.",
        "Assigning to a wider signal zero-pads at the MSB (`wire [5:0] x = 4'b1001;` → `001001`); to a narrower one truncates the MSBs (`wire [3:0] x = 6'b110011;` → `0011`). Only a warning is issued.",
        "Sums need a wider result to keep the carry: the lecture's 32-bit adder assigns `A + B + Cin` to a 33-bit wire `w1` and takes `Cout = w1[32]`, or writes `assign {Cout, Sum} = A + B + Cin;` (Lecture 8A p.47, p.58). With arithmetic, mismatched widths can be catastrophic (p.49).",
        "Concatenation `{a, b}` joins left to right (a becomes the MSBs). Replication `{n{x}}` repeats x n times and must sit in its own braces inside a concatenation: sign extension `{{4{x[7]}}, x}`, zero extension `{4'b0000, x}`, shift left `{x[6:0], 1'b0}`.",
        "Operators (Lecture 8A p.38, p.43): bitwise `~ & | ^`; logical `! && ||`; arithmetic `+ - *` (division `/` is not generally synthesisable); comparisons `< <= > >= == !=` are evaluated as true (1) or false (0); conditional `s ? a : b` is a multiplexer.",
        "The symbol `<=` is 'less than or equal' inside an expression and a non-blocking assignment when it is a statement: in `if (n <= max) n <= n + 1'b1;` the first is a comparison, the second an assignment.",
        "`assign y = (a == 2'b11);` gives a 1-bit y that is 1 when a equals 3. Nested conditionals build mux trees: `assign y = x ? (z ? a : b) : (b & c);`.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Expression", "Width", "Bits", "Note"],
          rows: [
            ["`8'h4F`", "8", "0100 1111", "hex digit = 4 bits"],
            ["`6'o52`", "6", "101 010", "octal digit = 3 bits"],
            ["`5'd19`", "5", "10011", "decimal"],
            ["`wire [5:0] w = 4'b1001`", "6", "001001", "zero-padded MSBs"],
            ["`wire [3:0] w = 6'b110011`", "4", "0011", "MSBs truncated"],
            ["`{2'b10, 3'b011}`", "5", "10011", "concatenation"],
            ["`{3{2'b01}}`", "6", "010101", "replication"],
          ],
          caption: "Literal and width rules at a glance.",
        },
      ],
      code: [
        {
          title: "Parameterised adder: the concatenation catches the carry",
          code: `module adder #(parameter SIZE = 32) (
    input  Cin,
    input  [SIZE-1:0] A, B,
    output Cout,
    output [SIZE-1:0] Sum);
  assign {Cout, Sum} = A + B + Cin;   // SIZE+1-bit result split in two
endmodule`,
        },
      ],
      example: {
        problem:
          "With `a = 4'b0110` and `b = 4'b1011`, find `y = {a[2:0], {2{b[3]}}, b[0]}` (width and bits), and the value of `w` in `wire [3:0] w = {a, b};`.",
        steps: [
          "`a[2:0]` = `110` (3 bits).",
          "`b[3]` = 1, so `{2{b[3]}}` = `11` (2 bits).",
          "`b[0]` = 1 (1 bit). Concatenate left to right: `110` `11` `1` → `110111`, width 3 + 2 + 1 = 6.",
          "`{a, b}` is 8 bits: `0110 1011`. Assigned to a 4-bit wire the top 4 bits are truncated, leaving the low nibble `1011` = b.",
        ],
        answer: "`y = 6'b110111`; `w = 4'b1011` (the MSB half, a, is lost).",
      },
      pitfalls: [
        "`{4{X[7]}, X}` (missing inner braces) is illegal; write `{{4{X[7]}}, X}`.",
        "Zero-extending a negative two's complement number with `{4'b0, x}` changes its value; sign-extend with the MSB.",
        "Summing two n-bit numbers into an n-bit target drops the carry. Make the target n+1 bits.",
        "Writing a literal that does not follow `<size>'<radix><value>`, such as `4'd-3` or `4d'-3` (PYP 2021-22 Q1(1)).",
      ],
      recall: [
        { q: "What is `6'o52` in binary?", a: "`101010`: each octal digit is 3 bits." },
        { q: "`wire [3:0] x = 6'b110011;` gives?", a: "`0011`: the two MSBs are truncated." },
        { q: "Sign-extend 8-bit X to 11 bits.", a: "`{{3{X[7]}}, X}`." },
        { q: "What width is the result of `a == b`?", a: "1 bit (1 if equal, 0 otherwise)." },
      ],
    },
    // ------------------------------------------------------------------------------------------
    {
      title: "Combinational always blocks: @*, blocking =, and no latches",
      intuition:
        "A combinational always block is a 'super assign': the tool reads the statements top to bottom and builds one block of gates that computes the final values. It stays combinational only if every output gets a value every time the block runs.",
      visuals: ["sensitivity-mismatch", "latch-detector"],
      keyIdeas: [
        "The sensitivity list must contain every signal that affects the outputs. If you leave one out, e.g. `@(a, b)` for a block that also reads c, the block is not triggered when c changes and you do not get the expected circuit. Use `always @*`: the * means all input signals inside the block (Lecture 8B p.5).",
        "Use blocking assignments `=`. Statements execute in order: a value assigned earlier can be used later in the block, and if a signal is assigned twice the **last assignment wins** (`y = x | c; y = x ^ c;` builds only the XOR).",
        "`begin … end` groups several statements (Verilog's `{ }`); not needed for one statement. `case` items need no `break`; `endcase` closes it.",
        "`if/else`, `case` and `?:` all describe multiplexers (Lecture 8B p.15, Recap p.10). Assignments in an always block synthesise to exactly the same circuit as the equivalent `assign` statements (Lecture 8B p.9).",
        "**Every output must be assigned on every path**: an `else` for every `if`, a `default` in every `case` that does not list all values. Otherwise the signal must remember its old value on the missing path → the tools infer a **latch** — storage, not combinational logic.",
        "Cheapest fix: give every output a default value at the top of the block (`y = 1'b0;`), then overwrite it where needed.",
        "Inside an always block: only procedural statements (`=`, `if`, `case`…). Never the `assign` keyword (Lecture 8B p.6), and never a gate primitive or module instance (PYP 2021-22 S1 Q1(6)).",
        "Signals assigned in the block must be `reg`, and must not be assigned anywhere else.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: { inputs: ["en", "d", "b"], gates: [{ id: "y", type: "MUX2", in: ["b", "d", "en"] }], outputs: ["y"] },
          caption: "`if (en) y = d; else y = b;` → a 2:1 multiplexer (combinational).",
        },
        {
          kind: "circuit",
          circuit: { inputs: ["en", "d"], gates: [{ id: "y", type: "DLATCH", in: ["d", "en"] }], outputs: ["y"] },
          caption: "`if (en) y = d;` with no else → y must hold when en = 0: a transparent D latch.",
        },
      ],
      code: [
        {
          title: "4:1 multiplexer with case (all four values listed → no latch)",
          code: `module mux4 (output reg q, input [3:0] d, input [1:0] sel);
  always @* begin
    case (sel)
      2'b00 : q = d[0];
      2'b01 : q = d[1];
      2'b10 : q = d[2];
      2'b11 : q = d[3];
    endcase
  end
endmodule`,
        },
        {
          title: "Defaults at the top remove every latch",
          code: `always @* begin
  z = a;          // default
  y = 4'b1010;    // default
  case (sel)
    2'b00 : y = a;
    2'b01 : begin y = b; z = c; end
    2'b10 : y = c;
  endcase
end`,
        },
      ],
      example: {
        problem:
          "What is synthesised for each output, and what must be fixed?\n```\nalways @(alarm)\nbegin\n  if (alarm) begin\n    if (after_hours) siren = 1'b1;\n    light = 1'b1;\n  end\n  else begin\n    siren = 1'b0;\n    light = 1'b0;\n  end\nend\n```",
        steps: [
          "Sensitivity: the block reads `alarm` and `after_hours`, but only alarm is listed. The block would not be triggered by changes of after_hours → use `always @*`.",
          "Paths for `light`: alarm = 1 → 1, alarm = 0 → 0. Assigned on every path, so light = alarm (a wire, no latch).",
          "Paths for `siren`: alarm = 1 and after_hours = 1 → 1; alarm = 0 → 0; but alarm = 1 and after_hours = 0 → **not assigned** → siren must hold its value → latch.",
          "Fix: add `else siren = 1'b0;` to the inner if, or put `siren = 1'b0;` at the top of the block.",
          "After the fix: siren = alarm·after_hours, light = alarm, both purely combinational.",
        ],
        answer: "Change the list to `@*` and give `siren` a value on the inner else path (or a default at the top). Then `siren = alarm & after_hours`, `light = alarm`.",
      },
      pitfalls: [
        "An incomplete hand-written sensitivity list: the block is not triggered by the missing signal, so you do not get the expected circuit.",
        "A `case` without `default` is fine **only** if every possible value is listed **and** every output is assigned in every item. Missing one output in one item still infers a latch on that output.",
        "Using `<=` in a combinational block: the course rule is `=` in `always @*`.",
        "Assigning the same output in two different always blocks to 'split the logic': illegal.",
      ],
      recall: [
        { q: "What does `always @*` mean?", a: "Re-evaluate the block whenever any signal read inside it changes." },
        { q: "When does a combinational always block infer a latch?", a: "When some output is not assigned on some path (if without else, case without default, an output missing from a case item)." },
        { q: "Two assignments to y in one comb block: which wins?", a: "The last one executed." },
        { q: "What goes wrong with `always @(a, b)` if the block also reads c?", a: "The block is not triggered when c changes, so the output is not what the statements describe. Use `@*`." },
      ],
    },
    // ------------------------------------------------------------------------------------------
    {
      title: "Sequential always blocks: posedge clk, resets and non-blocking <=",
      intuition:
        "In `always @(posedge clk)` every assigned reg becomes a flip-flop. All flip-flops sample their inputs at the same instant, so the code must say 'every right-hand side uses the value from just before the edge' — that is exactly what `<=` means.",
      keyIdeas: [
        "`always @(posedge clk)` (or `negedge clk`): each assigned reg is a D flip-flop whose D input is the logic on the right-hand side.",
        "Use **non-blocking** `<=`: all right-hand sides are evaluated with the values just **before** the edge; all left-hand sides update together just **after**. Statement order inside the block therefore does not matter, and reading a register gives its **old** value (`q <= q + 1'b1`).",
        "Course rule (Lecture 10 p.13): `=` in combinational blocks (order matters), `<=` in clocked blocks (order does not matter). The lecture adds: \"This explanation is sufficient for this course.\"",
        "Synchronous reset (course default): `always @(posedge clk) if (rst) q <= 0; else q <= d;` — reset acts only at an edge. Active-low: `if (!rst)`.",
        "Asynchronous reset: put it in the event list too: `always @(posedge clk or posedge rst)` (active-high, `if (rst)`) or `@(posedge clk or negedge rst_n)` (active-low, `if (!rst_n)`).",
        "An `if` without `else` in a clocked block simply means 'keep the value' (a load-enable): the flip-flop holds. This is **not** a latch.",
        "Every register should be reset to a defined value (especially FSM state registers), and all clocked blocks should use the same clock.",
        "Standard building blocks: counter `q <= q + 1'b1;`, up/down `q <= down ? q - 1'b1 : q + 1'b1;`, load `if (load) q <= din;`, shift register `q <= {q[3:0], y};`, PISO/SIPO converters, FIFOs (multi-bit shift registers).",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["y", "clk"],
            gates: [
              { id: "q1", type: "DFF", in: ["y", "clk"] },
              { id: "q2", type: "DFF", in: ["q1", "clk"] },
              { id: "q3", type: "DFF", in: ["q2", "clk"] },
            ],
            outputs: ["q3"],
          },
          caption: "`q1 <= y; q2 <= q1; q3 <= q2;` (any order) → a 3-stage shift register.",
        },
        {
          kind: "wave",
          signals: [
            { name: "clk", wave: "0101010101" },
            { name: "y", wave: "1100000000" },
            { name: "q1", wave: "0110000000" },
            { name: "q2", wave: "0001100000" },
            { name: "q3", wave: "0000011000" },
          ],
          marks: [1, 3, 5],
          caption: "A single 1 on y moves one stage per rising edge: each register shows the value its input had just before the edge.",
        },
      ],
      code: [
        {
          title: "Up/down counter with synchronous reset and load (lecture 10)",
          code: `module simplecnt (input clk, rst, down, load,
                  input [3:0] cnt_in,
                  output reg [3:0] q);
  always @(posedge clk) begin
    if (rst)        q <= 4'b0000;
    else if (load)  q <= cnt_in;
    else if (down)  q <= q - 1'b1;
    else            q <= q + 1'b1;
  end
endmodule`,
        },
        {
          title: "Asynchronous active-low reset",
          code: `always @(posedge clk or negedge rst_n)
  if (!rst_n) q <= 8'd0;
  else        q <= d;`,
        },
        {
          title: "Shift register with a vector",
          code: `reg [4:0] q;
always @(posedge clk)
  if (sh) q <= {q[3:0], y};   // shift left, y enters at q[0]
assign q_out = q[4];`,
        },
      ],
      example: {
        problem:
          "For the `simplecnt` counter above, the inputs before each rising edge are: edge 1: rst = 1; edge 2: rst = 0, load = 1, cnt_in = 14; edge 3: load = 0, down = 0; edge 4: down = 0; edge 5: down = 1. What is q after each edge?",
        steps: [
          "Edge 1: rst has priority → q = 0.",
          "Edge 2: load → q = cnt_in = 14 (`1110`).",
          "Edge 3: count up → q = 15 (`1111`).",
          "Edge 4: count up → 15 + 1 = 16 does not fit in 4 bits → q = 0 (wrap-around).",
          "Edge 5: count down → 0 − 1 wraps to 15 (`1111`).",
        ],
        answer: "q = 0, 14, 15, 0, 15 after edges 1–5.",
      },
      pitfalls: [
        "Using `=` in a clocked block and then reading the variable in a later statement: you get the new value, not the register's old value.",
        "Forgetting that `q <= q + 1` wraps silently at $2^n$.",
        "Putting a synchronous reset in the sensitivity list: listing the reset there is how an asynchronous reset is written (Lecture 10 p.10).",
        "Expecting a register to change before the edge: in a timing diagram the output changes only just after a rising clock edge.",
      ],
      recall: [
        { q: "What does `<=` guarantee in a clocked block?", a: "All right-hand sides use pre-edge values; all registers update together, so statement order does not matter." },
        { q: "`a <= b; b <= a;` in a clocked block does what?", a: "Swaps a and b: both right-hand sides use the values from before the edge." },
        { q: "How do you write an asynchronous active-high reset?", a: "`always @(posedge clk or posedge rst) if (rst) q <= 0; else …`." },
        { q: "Is an if without else inside `always @(posedge clk)` a latch?", a: "No: the flip-flop just keeps its value (clock enable)." },
      ],
    },
    // ------------------------------------------------------------------------------------------
    {
      title: "Reading code as hardware: datapaths, counters and FSMs",
      intuition:
        "Exam questions ask what a mix of combinational and clocked blocks **does** after some clock edges. Draw the hardware first — combinational clouds between registers — then tabulate edge by edge.",
      visuals: ["pipeline-timeline"],
      keyIdeas: [
        "Identical statements give identical logic; a clocked block just adds a register on each assigned signal: `always @* x = a + b;` is an adder, `always @(posedge clk) x <= a + b;` is an adder followed by a register.",
        "Each `<=` assignment is one register stage: `x <= a + b; y <= x - c; z <= y * y;` gives three registers, with a register after each stage (y uses the x from the previous cycle; Lecture 10 p.48).",
        "Equivalent style: compute everything in an `always @*` block and register it in a separate clocked block (`x_f <= x;`). Combinational outputs change as soon as the inputs change; registered outputs change only after an edge.",
        "To find values after n edges: list the registers, and at each edge compute **all** new values from the **old** values, then update together.",
        "Parameterised counter pattern (PYP Q3): `module cnt #(parameter WIDTH = 6) (input clk, rst, U, output reg [WIDTH-1:0] CNT);` with the reset first, then the count rules nested in if/else, all with `<=`.",
        "FSM template: `parameter` state codes; a state register (`always @(posedge clk) if (rst) st <= S0; else st <= nst;`); next-state logic in `always @*` with `nst = st;` (or a `default`) to avoid latches; Moore outputs as `assign u = (st == S3);`.",
        "Module layout (Recap slide 20): ports → wire/reg declarations → instances → `assign`s → always blocks. Each signal is driven from only one of these.",
      ],
      figures: [
        {
          kind: "wave",
          signals: [
            { name: "clk", wave: "010101" },
            { name: "a", wave: "=.....", data: ["2"] },
            { name: "b", wave: "=.....", data: ["6"] },
            { name: "x", wave: "=.....", data: ["8"] },
            { name: "y", wave: "=.....", data: ["64"] },
            { name: "z", wave: "==....", data: ["0", "8"] },
            { name: "r", wave: "=..=..", data: ["0", "64"] },
          ],
          marks: [1, 3, 5],
          caption: "Recap slide 18: `x = a + b; y = x*x;` (comb) and `z <= x; r <= z*z;` (clocked). y = 64 at once; z = 8 after edge 1; r = 64 only after edge 2.",
        },
        {
          kind: "fsm",
          states: [
            { id: "S0", label: "S0/0", x: 0, y: 0 },
            { id: "S1", label: "S1/0", x: 2, y: 0 },
            { id: "S2", label: "S2/1", x: 1, y: 1 },
          ],
          edges: [
            { from: "S0", to: "S0", label: "0", loop: "left" },
            { from: "S0", to: "S1", label: "1" },
            { from: "S1", to: "S0", label: "0" },
            { from: "S1", to: "S2", label: "1" },
            { from: "S2", to: "S2", label: "1", loop: "bottom" },
            { from: "S2", to: "S0", label: "0" },
          ],
          initial: "S0",
          caption: "A Moore '11' detector, implemented by the template code below.",
        },
      ],
      code: [
        {
          title: "FSM template (Moore '11' detector)",
          code: `module det11 (input clk, rst, x, output u);
  parameter S0 = 2'b00, S1 = 2'b01, S2 = 2'b10;
  reg [1:0] st, nst;

  always @(posedge clk)            // state register
    if (rst) st <= S0;
    else     st <= nst;

  always @* begin                   // next-state logic
    nst = st;                       // default: no latch
    case (st)
      S0: if (x) nst = S1;
      S1: nst = x ? S2 : S0;
      S2: if (!x) nst = S0;
      default: nst = S0;
    endcase
  end

  assign u = (st == S2);            // Moore output
endmodule`,
        },
        {
          title: "Parameterised modulo-N counter",
          code: `module modcnt #(parameter WIDTH = 4, N = 10) (
    input clk, rst, en,
    output reg [WIDTH-1:0] q,
    output tc);
  always @(posedge clk)
    if (rst)            q <= 0;
    else if (en)
      if (q == N - 1)   q <= 0;
      else              q <= q + 1'b1;
  assign tc = en & (q == N - 1);    // terminal count
endmodule`,
        },
      ],
      example: {
        problem:
          "Rewrite this combinational module so that a register is added after each stage, using a single synchronous always block (Tutorial 9 Q1(b) style). How many cycles after a, b are applied does p show the result?\n```\nalways @* begin\n  s = a + b;\n  d = s - c;\n  p = d * e;\nend\n```",
        steps: [
          "Each stage becomes one non-blocking assignment in `always @(posedge clk)`: `s <= a + b; d <= s - c; p <= d * e;`.",
          "With `<=`, d is computed from the s registered at the **previous** edge, and p from the previous d: there is now a register after each stage.",
          "a, b are captured into s at edge 1, s − c into d at edge 2, d·e into p at edge 3.",
        ],
        answer:
          "```\nalways @(posedge clk) begin\n  s <= a + b;\n  d <= s - c;\n  p <= d * e;\nend\n```\np holds the result for a given a, b after the 3rd rising edge.",
      },
      pitfalls: [
        "Treating a registered signal as if it updated immediately: in a timing diagram, `z <= x` shows x's value one edge later.",
        "Forgetting `nst = st;` / `default` in the next-state block: latches in the FSM.",
        "Comparing against a parameter without enough width, or forgetting that `q + 1` wraps at $2^{WIDTH}$.",
      ],
      recall: [
        { q: "`always @(posedge clk) begin z <= x; r <= z * z; end`: how many edges until r reflects a new x?", a: "Two (x → z at the first edge, z² → r at the second)." },
        { q: "What are the three parts of an FSM in Verilog?", a: "State register (clocked), next-state logic (comb), output logic (comb / assign)." },
        { q: "How do you avoid latches in the next-state block?", a: "`nst = st;` at the top and/or a `default` item." },
      ],
    },
    // ------------------------------------------------------------------------------------------
    {
      title: "Find-the-errors checklist",
      intuition:
        "Every 'find the errors' question (Tutorial 7 Q3, Tutorial 9 Q1(a), PYP 2016-17 S2 Q3) is the same set of rules applied line by line. Think in hardware: if you can't understand what the circuit will look like, it likely won't work (Recap p.21).",
      keyIdeas: [
        "**Declarations**: every signal assigned in an always block is a `reg` (`output reg [3:0] y`); signals driven by `assign` or instance outputs stay wires.",
        "**Sensitivity list**: a combinational block lists every signal it reads, or better uses `always @*`; a clocked block uses `posedge clk` (plus the reset only if the reset is asynchronous).",
        "**Complete assignment**: in a combinational block every output is assigned on every path (an `else`, a `default`, or defaults at the top), otherwise a latch is inferred.",
        "**Assignment type**: blocking `=` in combinational blocks, non-blocking `<=` in clocked blocks.",
        "**Placement**: no `assign` and no instances inside always blocks; each signal is assigned from only one place.",
        "**Widths** of vectors in assignments should match (outputs, literals, sums).",
        "**Syntax**: `;` after the port list and after statements, `begin … end` around several statements, `endcase`, and no `;` after `endmodule`.",
        "**Synthesisable**: we have not covered simulation and verification or non-synthesizable constructs (Recap p.21); division `/` is not generally synthesizable (Lecture 8A p.43).",
      ],
      example: {
        problem:
          "List every error in this 2-to-4 decoder with enable and correct it.\n```\nmodule dec (input [1:0] a, input en, output [3:0] y)\n  always @(a)\n    if (en)\n      case (a)\n        2'b00: y = 4'b0001;\n        2'b01: y = 4'b0010;\n        2'b10: y = 4'b0100;\n        2'b11: y = 4'b1000;\n      endcase\nendmodule\n```",
        steps: [
          "Header: missing `;` after the port list.",
          "`y` is assigned in an always block → must be `output reg [3:0] y`.",
          "Sensitivity list misses `en` → use `always @*`.",
          "When en = 0, y is not assigned → latch. Add `else y = 4'b0000;` (or `y = 4'b0000;` at the top).",
          "The case lists all four values, so no default is needed once the else is added.",
        ],
        answer:
          "```\nmodule dec (input [1:0] a, input en, output reg [3:0] y);\n  always @* begin\n    y = 4'b0000;\n    if (en)\n      case (a)\n        2'b00: y = 4'b0001;\n        2'b01: y = 4'b0010;\n        2'b10: y = 4'b0100;\n        2'b11: y = 4'b1000;\n      endcase\n  end\nendmodule\n```",
      },
      pitfalls: [
        "Stopping after the syntax errors: the missing reg, sensitivity list, latch and blocking/non-blocking errors are errors too.",
        "Changing a wire to reg just because its right-hand side reads a reg: only where a signal is assigned matters.",
      ],
      recall: [
        { q: "Name four things to check in a combinational always block.", a: "Outputs declared reg; `@*` (complete list); every output assigned on every path; blocking `=`." },
        { q: "Is `endmodule;` correct?", a: "No: there is no semicolon after endmodule." },
        { q: "Where may an `assign` statement appear?", a: "Only at module level, never inside an always block." },
      ],
    },
  ],
  playbook: [
    "If an MCQ asks which literal is legal: check it against the form `<size>'<radix><value>` with digits valid for the radix (Lecture 8A).",
    "If asked whether a signal must be `reg`: look only at where it is assigned — inside any always block → reg; assign, gate or instance output → wire.",
    "If you see an always block with an `if` lacking `else`, a `case` lacking `default` (with values left out) or an output missing from one branch, and no default assignment at the top: say **latch**.",
    "If the sensitivity list is written by hand: check every signal read in the block (including conditions); a missing one means the block is not triggered by that signal, so you do not get the expected circuit. Fix with `@*`.",
    "If asked for values after n clock edges: make a table with one row per edge; compute all new register values from the old ones, then update together (non-blocking).",
    "If asked whether a module or gate can be instantiated inside an always block: never (PYP 2021-22 Q1(6)).",
    "If asked to write a counter (PYP Q3 style): `#(parameter WIDTH = …)` header, `output reg [WIDTH-1:0]`, `always @(posedge clk)`, reset first, then nested if/else for direction and range checks, all `<=`.",
    "If asked to connect given modules (PYP Q4(b) style): declare internal wires with the right widths, instantiate with `.port(signal)`, and feed constants or concatenations straight into input pins.",
    "If two widths differ in an assignment: wider target → zero-pad MSBs; narrower → MSBs lost. For n-bit + n-bit keep n+1 bits with `{cout, sum}`.",
    "If a find-the-errors question appears: run the checklist (reg, @*, complete assignment, = vs <=, no assign/instance in always, single driver, widths, syntax) and list each error with its fix.",
  ],
};
