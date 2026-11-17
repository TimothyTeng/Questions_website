import type { Lesson } from "@/lib/sc1005/types";

export const seqVerilogLesson: Lesson = {
  topic: "seq-verilog",
  bigPicture:
    "Sequential Verilog describes **registers**: an `always @(posedge clk)` block runs only at the rising clock edge, and every signal assigned inside it becomes a bank of D flip-flops whose D input is the right-hand side. Two rules make the code predictable: use **non-blocking** `<=` in clocked blocks (every right-hand side is read from just before the edge, so statement order does not matter), and give every register a **reset** (synchronous: checked at the edge; asynchronous: listed in the sensitivity list and acting at once). From those pieces come the standard blocks: registers with enables and loads, **counters** (up/down, wrap at a value, load a start value, parameterised width), **shift registers** and serial converters, FIFOs, and **pipelines** where a register after each combinational stage raises the clock rate at the cost of latency. Exam questions ask you to write these modules (a parameterised up/down counter, a monitoring counter), to spot errors, to predict register values over successive clock edges, and to say what hardware a block synthesises to.",
  sections: [
    {
      title: "Registers: always @(posedge clk)",
      intuition:
        "A combinational always block re-runs whenever an input changes; a clocked one runs only at the clock edge. Anything it assigns therefore keeps its value between edges, which is exactly a flip-flop.",
      keyIdeas: [
        "Combinational: `always @*` (or a full signal list). Synchronous: `always @(posedge clk)`; falling edge: `always @(negedge clk)`.",
        "Synthesis turns each signal assigned in a clocked block into a **register** (D flip-flops, one per bit) with D = the right-hand side logic and Q = the left-hand signal.",
        "Signals assigned in an always block must be declared `reg` (e.g. `output reg [7:0] q`); `reg` does not by itself mean a flip-flop, the posedge block does.",
        "Several unrelated registers may share one clocked block. All synchronous blocks in a design should use the **same** clock.",
        "Diagrams usually omit the clock and reset wires; every register still has them.",
      ],
      code: [
        {
          title: "1-bit and 8-bit registers",
          code: "module simplereg (input d, clk,\n                  output reg q);\nalways @(posedge clk)\n    q <= d;\nendmodule\n\nmodule reg8 (input [7:0] d, input clk,\n             output reg [7:0] q);\nalways @(posedge clk)\n    q <= d;          // 8 D flip-flops\nendmodule",
        },
      ],
      figures: [
        {
          kind: "circuit",
          circuit: { inputs: ["d", "clk"], gates: [{ id: "q", type: "DFF", in: ["d", "clk"] }], outputs: ["q"] },
          caption: "What `always @(posedge clk) q <= d;` builds",
        },
      ],
      example: {
        problem: "How many flip-flops does this block create?\n```\nreg [7:0] a, b;  reg [3:0] c;  reg p;\nalways @(posedge clk) begin\n    a <= x;\n    b <= a + 8'd1;\n    c <= b[3:0];\n    p <= ^c;\nend\nassign y = a & b;\n```",
        steps: [
          "Each assigned signal is a register of its declared width: a (8), b (8), c (4), p (1).",
          "The `+`, the bit-select and the reduction XOR are combinational logic in front of the D inputs; they add no flip-flops.",
          "`assign y` is a continuous assignment: gates only.",
        ],
        answer: "$8 + 8 + 4 + 1 = 21$ flip-flops.",
      },
      pitfalls: [
        "Forgetting `reg` on an output assigned inside an always block is a compile error.",
        "A module instance or `assign` cannot be placed inside an always block.",
        "Mixing clocks (some blocks on `clk`, some on another signal) breaks synchronous design.",
      ],
      recall: [
        { q: "What does each signal assigned in an `always @(posedge clk)` block become?", a: "A register (D flip-flops) with D = the right-hand side." },
        { q: "How do you describe a falling-edge register?", a: "`always @(negedge clk)`." },
        { q: "Does declaring a signal `reg` create a flip-flop?", a: "No; only being assigned in a clocked block does." },
      ],
    },
    {
      title: "Non-blocking (<=) vs blocking (=)",
      intuition:
        "At a clock edge every flip-flop samples its input at the same instant. Non-blocking assignment models exactly that: all right-hand sides are read first, then all registers update together. Blocking assignment updates immediately, so a later line sees the new value, which is software behaviour, not flip-flop behaviour.",
      visuals: ["nb-vs-b"],
      keyIdeas: [
        "`<=` (**non-blocking**): right-hand sides use the values from **just before** the edge; left-hand sides change **just after**. Statement order does not matter. Use it in every clocked block.",
        "`=` (**blocking**): the assignment completes before the next statement runs, so order matters. Use it in combinational `always @*` blocks.",
        "Shift register `q1 <= y; q2 <= q1; q3 <= q2; q <= q3;` is a 4-stage chain in any order: y reaches q after 4 edges.",
        "With `=` in the same order, q2 reads the **new** q1 (= y) and so on: all four registers load y, and q is just y delayed by **one** edge. Written in reverse order the blocking version happens to work, which is why relying on order is fragile.",
        "Swap: `a <= b; b <= a;` swaps (both read old values). `a = b; b = a;` copies b into both.",
        "Reading rule for exam traces: evaluate every right-hand side with the current (old) values, then update all registers at once.",
        "Never assign the same signal from two always blocks (multiple drivers).",
      ],
      code: [
        {
          title: "Same hardware: order does not matter with <=",
          code: "reg q1, q2, q3;\nalways @(posedge clk) begin      always @(posedge clk) begin\n    q1 <= y;                         q2 <= q1;\n    q2 <= q1;                        q1 <= y;\n    q3 <= q2;                        q  <= q3;\n    q  <= q3;                        q3 <= q2;\nend                              end",
        },
        {
          title: "Blocking in a clocked block collapses the chain",
          code: "always @(posedge clk) begin\n    q1 = y;    // q1 = y\n    q2 = q1;   // q2 = new q1 = y\n    q3 = q2;   // q3 = y\n    q  = q3;   // q  = y: one edge of delay, not four\nend",
        },
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
              { id: "q", type: "DFF", in: ["q3", "clk"] },
            ],
            outputs: ["q"],
          },
          caption: "Non-blocking version: a 4-stage shift register",
        },
      ],
      example: {
        problem: "Registers A, B, C start at 0 and `rst = 0`. Trace {A, B, C} for three edges of\n```\nalways @(posedge clk) begin\n    C <= B;\n    B <= A;\n    A <= A ^ ~(B ^ C);\nend\n```",
        steps: [
          "Edge 1, old values 0, 0, 0: C ← 0, B ← 0, A ← $0 \\oplus \\overline{0 \\oplus 0} = 1$. Result 100.",
          "Edge 2, old 1, 0, 0: C ← 0, B ← 1, A ← $1 \\oplus \\overline{0} = 0$. Result 010.",
          "Edge 3, old 0, 1, 0: C ← 1, B ← 0, A ← $0 \\oplus \\overline{1 \\oplus 0} = 0$. Result 001.",
          "C ← B always uses the **old** B; writing `B <= A` before or after it would change nothing.",
        ],
        answer: "{A,B,C}: 100, 010, 001.",
      },
      pitfalls: [
        "`<=` inside `if (a <= b)` is the relational less-than-or-equal operator, not an assignment.",
        "Mixing `=` and `<=` on the same variable, or using `=` for registers, gives simulation results that depend on statement order.",
        "In a trace, do not let an updated value feed a later line of the same edge (that is blocking behaviour).",
      ],
      recall: [
        { q: "Which assignment operator belongs in `always @(posedge clk)`?", a: "Non-blocking `<=`." },
        { q: "After one edge of `a <= b; b <= a;` with a = 3, b = 5?", a: "a = 5, b = 3 (swapped)." },
        { q: "After one edge of `a = b; b = a;` with a = 3, b = 5?", a: "a = 5, b = 5." },
      ],
    },
    {
      title: "Resets and enables",
      intuition:
        "A register powers up holding garbage (x in simulation), so every register needs a way to a known value. The only question is whether reset waits for the clock (synchronous) or acts at once (asynchronous).",
      visuals: ["reset-types"],
      keyIdeas: [
        "**Synchronous reset**: checked inside the clocked block, so it acts only at a rising edge: `always @(posedge clk) if (rst) q <= 0; else q <= d;`. A reset pulse that starts and ends between edges is missed. Modern FPGA designs use synchronous reset.",
        "**Asynchronous reset**: add it to the sensitivity list so the block also runs when reset is asserted: `always @(posedge clk or posedge rst) if (rst) q <= 0; else q <= d;`. q clears immediately and stays 0 while rst is high.",
        "**Active-low** reset (`rst_n`): test `if (!rst_n)`; for an asynchronous one the list says `negedge rst_n`. The edge in the list and the condition in the `if` must agree.",
        "Every synchronous component should have a reset. The reset branch comes first in the if-chain, so it has priority over load, enable and counting.",
        "**Enable**: `if (en) q <= d;` with no else. In a clocked block a missing else simply means 'keep the old value' (a feedback MUX in front of the flip-flop), not a latch.",
        "Sensitivity lists of clocked blocks contain only edges (`posedge`/`negedge`); `always @(posedge clk or rst)` mixing an edge with a level is wrong.",
      ],
      code: [
        {
          title: "Synchronous, active-low synchronous, and asynchronous resets",
          code: "always @(posedge clk)                // synchronous\n    if (rst) q <= 8'b0000_0000;\n    else     q <= d;\n\nalways @(posedge clk)                // synchronous, active-low\n    if (!rst_n) q <= 8'd0;\n    else        q <= d;\n\nalways @(posedge clk or posedge rst) // asynchronous\n    if (rst) q <= 8'd0;\n    else     q <= d;",
        },
        {
          title: "Register with enable (no latch, no clock gating)",
          code: "always @(posedge clk)\n    if (rst)     q <= 8'd0;\n    else if (en) q <= d;     // en = 0: q keeps its value",
        },
      ],
      example: {
        problem: "With d = 1 throughout, compare q for the synchronous and asynchronous (active-high) resets for the rst waveform below: one short pulse between edges, one pulse that covers an edge.",
        figures: [
          {
            kind: "wave",
            signals: [
              { name: "clk", wave: "0011001100110011" },
              { name: "rst", wave: "0000100001110000" },
              { name: "q sync", wave: "xx11111111000011" },
              { name: "q async", wave: "xx11001110000011" },
            ],
            marks: [2, 6, 10, 14],
            caption: "Reset pulse at t = 4 (between edges) and t = 9–11 (covering the edge at t = 10)",
          },
        ],
        steps: [
          "Both start unknown until the first edge at $t = 2$ loads d = 1.",
          "Pulse at $t = 4$: the asynchronous register clears at once and reloads 1 at the next edge ($t = 6$); the synchronous one never sees rst at an edge, so it ignores the pulse.",
          "Pulse at $t = 9$–$11$: async clears at $t = 9$; sync clears at the edge $t = 10$ (rst was high just before it).",
          "Both reload 1 at the edge $t = 14$, the first edge after rst falls.",
        ],
        answer: "Asynchronous reset reacts immediately to every pulse; synchronous reset only to pulses that are high at a rising edge.",
      },
      pitfalls: [
        "`always @(posedge clk or negedge rst_n)` with `if (rst_n)` resets on the wrong level.",
        "Forgetting the reset leaves the register x in simulation, and `x + 1` stays x.",
        "Adding an `else q <= q;` is harmless but unnecessary in a clocked block.",
      ],
      recall: [
        { q: "How do you make a reset asynchronous in Verilog?", a: "Put it in the sensitivity list: `always @(posedge clk or posedge rst)`." },
        { q: "Does `if (en) q <= d;` without else in a clocked block create a latch?", a: "No: q just holds (flip-flop with a feedback MUX)." },
        { q: "Sensitivity list for an active-low asynchronous reset?", a: "`always @(posedge clk or negedge rst_n)`, with `if (!rst_n)`." },
      ],
    },
    {
      title: "Counters in Verilog",
      intuition:
        "A counter is a register whose D input is its own value plus one. Inside the clocked block `q` on the right-hand side is always the old value, so `q <= q + 1` is a register fed by an adder.",
      visuals: ["counter-stepper"],
      keyIdeas: [
        "Basic: `if (rst) q <= 0; else q <= q + 1'b1;`. A WIDTH-bit counter wraps from $2^{WIDTH} - 1$ to 0 automatically (the carry out is dropped). Counting down from 0 gives $2^{WIDTH} - 1$.",
        "Up/down: `else if (down) q <= q - 1'b1; else q <= q + 1'b1;`.",
        "Load: `else if (load) q <= cnt_in;` placed before the counting branches; the order of the if-chain is the priority (rst > load > count).",
        "Wrap at a value (count 0 … 20): `if (q == 5'd20) q <= 0; else q <= q + 1;`. With a run-time limit input `countmax`, prefer `q >= countmax`: if countmax is lowered below the current count, `==` would run on to $2^{WIDTH}-1$ and wrap.",
        "Count down from a start value loaded on reset (Tutorial 9 Q3c): `if (rst) q <= start_val; else q <= q - 1'b1;`.",
        "**parameter** makes the width configurable: `module cnt #(parameter WIDTH = 6) (…, output reg [WIDTH-1:0] CNT);`; zero of any width: `{WIDTH{1'b0}}` (or just 0).",
        "Range-restricted counting (PYP Q3): test the range first, then count: `if (CNT >= 15) CNT <= 0; else CNT <= CNT + 1;` keeps an up-count inside 0 … 15 and pulls any out-of-range value back to 0.",
      ],
      code: [
        {
          title: "Up/down counter with load (lecture)",
          code: "module simplecnt (input clk, rst, down, load,\n                  input [3:0] cnt_in,\n                  output reg [3:0] q);\nalways @(posedge clk)\nbegin\n    if (rst)\n        q <= 4'b0000;\n    else if (load)\n        q <= cnt_in;\n    else if (down)\n        q <= q - 1'b1;\n    else\n        q <= q + 1'b1;\nend\nendmodule",
        },
        {
          title: "Parameterised up/down counter, up-count restricted to 0–15 (PYP 2021-22 Q3 style)",
          code: "module updown #(parameter WIDTH = 6)\n    (input clk, rst, U,\n     output reg [WIDTH-1:0] CNT);\nalways @(posedge clk)\nbegin\n    if (rst)\n        CNT <= {WIDTH{1'b0}};\n    else if (U) begin\n        if (CNT >= 15)            // at the top, or outside 0..15\n            CNT <= {WIDTH{1'b0}};\n        else\n            CNT <= CNT + 1'b1;\n    end\n    else\n        CNT <= CNT - 1'b1;        // unrestricted down-count\nend\nendmodule",
        },
      ],
      example: {
        problem: "For the lecture counter above, starting from reset, the inputs before successive edges are: (load = 1, cnt_in = 9, down = 1), (down = 1), (down = 1), (load = 1, cnt_in = 3, down = 0), (down = 0), (down = 0). Give q after each edge.",
        steps: [
          "Edge 1: load has priority over down: q = 9.",
          "Edges 2, 3: count down: 8, 7.",
          "Edge 4: load: q = 3.",
          "Edges 5, 6: count up: 4, 5.",
        ],
        answer: "q = 9, 8, 7, 3, 4, 5.",
      },
      pitfalls: [
        "`if (q == 20)` gives 21 states (0 … 20); for a mod-20 counter compare with 19.",
        "A counter without reset starts at x and stays x.",
        "Forgetting that `CNT - 1` from 0 wraps to all ones (63 for 6 bits).",
      ],
      recall: [
        { q: "Value after one up-count edge from 4'b1111?", a: "4'b0000 (wraps)." },
        { q: "Which branch wins if rst and load are both 1 in the lecture counter?", a: "rst: it is tested first." },
        { q: "Why prefer `>=` over `==` when wrapping at a run-time limit?", a: "If the limit drops below the count, `==` misses it and the counter runs to the top before wrapping." },
      ],
    },
    {
      title: "Shift registers, serial converters, FIFOs and memories",
      intuition:
        "A shift register is a chain of registers where each stage loads its neighbour, so in Verilog it is one line per stage, or one vector assignment with a slice or concatenation.",
      keyIdeas: [
        "Vector form (lecture): `q[0] <= y; q[4:1] <= q[3:0];` shifts towards the MSB; equivalently `q <= {q[3:0], y};`.",
        "Shift towards the LSB: `q <= {y, q[4:1]};` (new bit enters at the MSB).",
        "Optional controls: shift enable `if (sh)`, direction `if (rt)`, parallel load `if (ld) q <= ld_val;` (checked first). Output can be one end (`assign q_out = q[4];`) or the whole word.",
        "**PISO** (parallel-to-serial): load a word, then shift it out one bit per clock (sender). **SIPO** (serial-to-parallel): shift bits in, read the whole word after $n$ edges (receiver).",
        "**FIFO**: the same chain with multi-bit registers (`reg [3:0] q1, q2, q3;  q1 <= y; q2 <= q1; …`); widths of input, stages and output must match.",
        "**Register-file memory**: a decoder driven by `addr` and gated by `we` (write enable) selects which register loads `d_in` at the edge; a multiplexer on `addr` drives `d_out`. Standard names: we, re, addr, ce.",
      ],
      code: [
        {
          title: "Shift register with shift enable, direction and load (lecture)",
          code: "module shiftreg5 (input clk, y, sh, rt, ld,\n                  input [4:0] ld_val,\n                  output q_out, output [4:0] q_word);\nreg [4:0] q;\nalways @(posedge clk)\nbegin\n    if (ld) q <= ld_val;\n    else if (sh) begin\n        if (rt) begin q[4] <= y; q[3:0] <= q[4:1]; end\n        else    begin q[0] <= y; q[4:1] <= q[3:0]; end\n    end\nend\nassign q_out  = rt ? q[0] : q[4];\nassign q_word = q;\nendmodule",
        },
        {
          title: "PISO and SIPO",
          code: "module piso4 (input clk, ld, input [3:0] y, output q_out);\nreg [3:0] q;\nalways @(posedge clk)\n    if (ld) q <= y;\n    else    q <= {q[2:0], 1'b0};   // MSB goes out first\nassign q_out = q[3];\nendmodule\n\nmodule sipo4 (input clk, y, output reg [3:0] q);\nalways @(posedge clk)\n    q <= {q[2:0], y};              // first bit ends up in q[3]\nendmodule",
        },
      ],
      example: {
        problem: "`always @(posedge clk) q <= {y, q[3:1]};` with q = 0000 and y = 1, 1, 0, 1 before four successive edges. What is q?",
        steps: [
          "The new bit enters at q[3] and everything moves one place towards q[0].",
          "Edge 1: 1000. Edge 2: 1100. Edge 3: 0110. Edge 4: 1011.",
        ],
        answer: "q = 4'b1011 (the first bit received is now in q[0]).",
      },
      pitfalls: [
        "Check which end the new bit enters: `{q[2:0], y}` and `{y, q[3:1]}` give mirror-image results.",
        "In a PISO, the load must take priority over shifting, or the word is never captured.",
        "Concatenation widths must add up to the register width.",
      ],
      recall: [
        { q: "One-line Verilog for a 5-bit left shift with serial input y?", a: "`q <= {q[3:0], y};`." },
        { q: "How many edges until a 4-bit SIPO holds a full word?", a: "4." },
        { q: "In a register-file memory, what selects the register that is written?", a: "A decoder on addr, enabled by we." },
      ],
    },
    {
      title: "What gets synthesised: pipelining",
      intuition:
        "Every non-blocking assignment is a register, so writing a chain of calculations in one clocked block puts a register after each step. That splits one long combinational path into short ones (a faster clock), but each result now takes several edges to emerge.",
      visuals: ["pipeline"],
      keyIdeas: [
        "`x <= a + b; y <= x - c; z <= y * y;` builds adder → register x → subtractor → register y → squarer → register z. y uses the **previous** x, z the previous y.",
        "**Latency**: an input set reaches z after 3 edges. **Throughput**: a new set can enter every edge.",
        "Side inputs that join a later stage must be delayed too, otherwise they combine with data from an earlier set: in the code above z after edge 3 is $(a_1 + b_1 - c_2)^2$, not $(a_1 + b_1 - c_1)^2$. Add `c1 <= c;` and use `c1` to keep c in step.",
        "Alternative style: compute in `always @*` with `=`, and register the results in a separate `always @(posedge clk)` block (`x_f <= x;` …). Same hardware, sometimes easier to read.",
        "Reading clocked code: right-hand sides are values **just before** the edge; left-hand sides change **just after**.",
        "Converting a combinational module (Tutorial 9 Q1b): keep the operations, change `=` to `<=`, put them in one `always @(posedge clk)` block, add `clk` to the ports and declare the intermediates as registers.",
      ],
      code: [
        {
          title: "Three-stage pipeline (lecture) and the split style",
          code: "always @(posedge clk) begin      always @(posedge clk) begin\n    x <= a + b;                      x_f <= x;  y_f <= y;  z_f <= z;\n    y <= x - c;                  end\n    z <= y * y;                  always @* begin\nend                                  x = a + b;\n                                     y = x_f - c;\n                                     z = y_f * y_f;\n                                 end",
        },
      ],
      example: {
        problem: "In the 3-stage code, a, b, c take values $(a_k, b_k, c_k)$ just before edge $k$. Express x, y, z after edge 3.",
        steps: [
          "After edge 3: $x = a_3 + b_3$.",
          "y after edge 3 = x after edge 2 minus $c_3$: $y = a_2 + b_2 - c_3$.",
          "z after edge 3 = (y after edge 2)$^2$, and y after edge 2 $= a_1 + b_1 - c_2$.",
        ],
        answer: "$x = a_3 + b_3$, $y = a_2 + b_2 - c_3$, $z = (a_1 + b_1 - c_2)^2$: c is one set ahead unless it is delayed by a register.",
      },
      pitfalls: [
        "Assuming z is available one edge after the inputs: count the registers on the path.",
        "Forgetting to delay inputs that enter at later stages.",
        "Using `=` in the pipelined block: the stages collapse into one combinational path again.",
      ],
      recall: [
        { q: "Latency of `x <= a + b; y <= x - c; z <= y * y;` from a to z?", a: "3 clock edges." },
        { q: "Why pipeline at all?", a: "Shorter combinational paths between registers allow a higher clock frequency (higher throughput)." },
        { q: "Rule for reading values in clocked code?", a: "RHS = value just before the edge; LHS updated just after." },
      ],
    },
    {
      title: "Worked design: monitoring counter, and common errors",
      intuition:
        "Most exam designs are a register plus a little combinational logic around it. Decide what is stored (the count), what is combinational (the alarm comparison), and which signal stops or resets the register.",
      visuals: ["alarm-monitor"],
      keyIdeas: [
        "Tutorial 9 Q2: a 6-bit counter counts cycles with `evnt` high; `alarm` is **combinational** (`assign alarm = count > thresh;`); while alarm is high the counter stops; `rst` clears it.",
        "Because alarm is combinational it rises in the same cycle the count first exceeds thresh, and it also gates the counter's increment.",
        "Common errors (Tutorial 9 Q1a): output assigned in an always block but not declared `reg`; blocking `=` in a clocked block; the same register assigned in two always blocks; `always @(clk)` or `always @(posedge clk or rst)`; no reset; using the counter output as an input port; width mismatches (`q <= q + 1` is fine, the result is truncated to q's width).",
        "Check every design against: one clock, reset branch first, `<=` everywhere in clocked blocks, every output either `reg` (assigned in always) or `wire` (assigned by `assign`).",
      ],
      code: [
        {
          title: "Monitoring counter (Tutorial 9 Q2)",
          code: "module monitor (input clk, rst, evnt,\n                input [5:0] thresh,\n                output alarm);\nreg [5:0] count;\nassign alarm = (count > thresh);     // combinational\nalways @(posedge clk)\nbegin\n    if (rst)\n        count <= 6'd0;\n    else if (evnt && !alarm)          // stop when alarm\n        count <= count + 1'b1;\nend\nendmodule",
        },
        {
          title: "Spot the errors",
          code: "module counter (input clk, rst, output [3:0] count);  // count not reg\nalways @(posedge clk or rst)                          // level in edge list\n    if (rst) count = 4'd0;                            // blocking\n    else     count = count + 1;\nendmodule",
        },
      ],
      example: {
        problem: "Correct the 'Spot the errors' counter.",
        steps: [
          "Declare the output as a register: `output reg [3:0] count`.",
          "Use a proper sensitivity list: `always @(posedge clk)` for a synchronous reset (or `posedge clk or posedge rst` for asynchronous).",
          "Use non-blocking assignments: `count <= 4'd0;` and `count <= count + 1'b1;`.",
        ],
        answer: "```\nmodule counter (input clk, rst, output reg [3:0] count);\nalways @(posedge clk)\n    if (rst) count <= 4'd0;\n    else     count <= count + 1'b1;\nendmodule\n```",
      },
      pitfalls: [
        "Registering the alarm (`alarm <= …` inside the clocked block) delays it by one cycle and lets the counter overshoot by one.",
        "'Exceeds' means `>`; 'reaches' means `>=` or `==`. Read the wording.",
        "A stopped counter needs `!alarm` in its increment condition; resetting the counter is the operator's job (rst).",
      ],
      recall: [
        { q: "Is the alarm in Tutorial 9 Q2 combinational or registered?", a: "Combinational: `assign alarm = count > thresh;`." },
        { q: "What is wrong with `always @(posedge clk or rst)`?", a: "It mixes an edge with a level; use `posedge rst` (async) or leave rst out (sync)." },
        { q: "Name two errors that make a clocked counter misbehave in simulation.", a: "Blocking `=` assignments and a missing reset (count stays x)." },
      ],
    },
  ],
  playbook: [
    "If you see `always @(posedge clk)` code and 'value after n edges': make a table, evaluate every RHS with the old values, then update all registers together.",
    "If you see blocking `=` in a clocked block: substitute line by line (later lines see new values); a forward-ordered shift register collapses to one stage of delay.",
    "If you see 'what is `<=`': in an assignment statement it is non-blocking; inside an `if (…)` condition it is less-than-or-equal.",
    "If you see 'write a counter': ports with `output reg [WIDTH-1:0]`, `parameter WIDTH`, `always @(posedge clk)`, reset first, then load, then the counting branches; `<=` throughout.",
    "If you see a counter that wraps at N: decide whether N is included (`== N` gives N+1 states); with a run-time limit use `>=`.",
    "If you see asynchronous reset: it must appear in the sensitivity list with the matching edge (`posedge rst` with `if (rst)`, `negedge rst_n` with `if (!rst_n)`).",
    "If you see 'add a register after each stage': one clocked block, `<=`, intermediates as `reg`, and delay any side input that joins a later stage.",
    "If you see 'how many flip-flops': add the widths of every signal assigned in clocked blocks; `assign` and operators add none.",
    "If you see a monitoring/alarm design: alarm is an `assign` comparison, and the counter's increment condition includes `!alarm`.",
  ],
};
