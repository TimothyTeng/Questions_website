import type { Lesson } from "@/lib/sc1005/types";

export const seqVerilogLesson: Lesson = {
  topic: "seq-verilog",
  bigPicture:
    "Sequential Verilog describes **registers**: an `always @(posedge clk)` block acts only at the rising clock edge, and every signal assigned inside it becomes a register (D flip-flops) whose input is the right-hand side. Two rules make the code predictable: use **non-blocking** `<=` in synchronous blocks (every right-hand side is read from just before the edge, so statement order does not matter), and give every register a **reset** (synchronous: checked at the edge; asynchronous: in the sensitivity list, acting whenever it is asserted). From those pieces come the standard blocks: **counters** (up/down, load, wrap at a value, parameterised width), **shift registers**, serial-to-parallel and parallel-to-serial converters, FIFOs and simple memories. Exam questions ask you to write these modules (a parameterised up/down counter, a monitoring counter, a PISO), to spot errors, to predict register values over successive clock edges, and to say what circuit a block synthesises to.",
  sections: [
    {
      title: "Registers: always @(posedge clk)",
      intuition:
        "A combinational always block describes logic that responds to its inputs; a synchronous one acts only at the clock edge. Anything it assigns therefore keeps its value between edges, which is exactly a flip-flop.",
      keyIdeas: [
        "Combinational: list the signals, or use `always @*`. Synchronous: `always @(posedge clk)`; falling-edge triggered: `always @(negedge clk)`.",
        "This tells the synthesis tools that the block's behaviour happens only at the clock rising edge, so each signal assigned in it becomes a **register** (D flip-flops, one per bit): its input is connected to the circuit for the right-hand side, its output is the left-hand signal.",
        "Signals assigned in an always block must be declared `reg` (e.g. `output reg [7:0] q`); combinational always blocks assign to `reg` too (Lecture 10 p.2), so it is the `posedge clk` block that makes the register.",
        "Several unrelated registers may share one synchronous block. All synchronous always blocks should use the **same** clock signal (whatever it is named: clk, i_clk, …), and the clock must be in the module's port list.",
        "Diagrams usually leave out the reset wires, and sometimes the clock wires; every register still has them.",
      ],
      code: [
        {
          title: "1-bit and 8-bit registers (Lecture 10)",
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
        problem: "How many flip-flops does this block create?\n```\nreg [7:0] a, b;  reg [3:0] c;  reg p;\nalways @(posedge clk) begin\n    a <= x;\n    b <= a + 8'd1;\n    c <= b[3:0];\n    p <= c[0] ^ c[1];\nend\nassign y = a & b;\n```",
        steps: [
          "Each assigned signal is a register of its declared width: a (8), b (8), c (4), p (1).",
          "The `+`, the bit-select and the XOR are combinational logic in front of the register inputs; they add no flip-flops.",
          "`assign y` is a continuous assignment: gates only.",
        ],
        answer: "$8 + 8 + 4 + 1 = 21$ flip-flops.",
      },
      pitfalls: [
        "An output assigned inside an always block must be declared `output reg`.",
        "Module instances go outside always blocks, not inside them (PYP 2021-22 S1 Q1(6)).",
        "All synchronous blocks should use the same clock signal.",
      ],
      recall: [
        { q: "What does each signal assigned in an `always @(posedge clk)` block become?", a: "A register (D flip-flops) whose input is the right-hand side." },
        { q: "How do you describe a falling-edge register?", a: "`always @(negedge clk)`." },
        { q: "Does declaring a signal `reg` by itself make a flip-flop?", a: "No: combinational always blocks also assign to reg; the `posedge clk` block makes the register." },
      ],
    },
    {
      title: "Non-blocking (<=) in synchronous blocks",
      intuition:
        "At a clock edge every flip-flop takes its input at the same instant. Non-blocking assignment models exactly that: all right-hand sides are read from just before the edge, then all registers update together just after it.",
      visuals: ["nb-vs-b"],
      keyIdeas: [
        "`<=` is the **non-blocking** assignment. For synchronous always blocks we always use non-blocking assignments, and **order does not matter**.",
        "For combinational always blocks we always use **blocking** `=`, and **order matters** (Verilog recap: `x = a & b; y = x ^ c;` uses the new x).",
        "Reading rule (Lecture 10 p.50): values read (right-hand side) are those **just before** the rising edge; values written (left-hand side) are only updated **just after** the rising edge.",
        "Shift register `q1 <= y; q2 <= q1; q3 <= q2; q <= q3;` is a 4-stage chain: it takes 4 clock cycles for an input value to reach q. Changing the order of the assignments does not change the circuit.",
        "Consequence of the reading rule: `a <= b; b <= a;` swaps a and b at the edge (both read the old values).",
        "You cannot assign to a signal from more than one place (one always block or one assign per signal).",
        "In an expression such as `if (count <= 9)`, `<=` is the comparison 'less than or equal' (Lecture 8 operators), not an assignment.",
      ],
      code: [
        {
          title: "Same circuit: order does not matter with <= (Lecture 10 p.25)",
          code: "reg q1, q2, q3;\nalways @(posedge clk) begin      always @(posedge clk) begin\n    q1 <= y;                         q2 <= q1;\n    q2 <= q1;                        q1 <= y;\n    q3 <= q2;                        q  <= q3;\n    q  <= q3;                        q3 <= q2;\nend                              end",
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
          caption: "Either listing: a 4-stage shift register",
        },
      ],
      example: {
        problem: "Registers A, B, C start at 0 and `rst = 0` (CZ1005 2018-19 S2 Q4(a) style). Trace {A, B, C} for three edges of\n```\nalways @(posedge clk) begin\n    C <= B;\n    B <= A;\n    A <= A ^ ~(B ^ C);\nend\n```",
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
        "In a trace, do not let a value updated at this edge feed another line of the same edge.",
        "Use `=` only in combinational `always @*` blocks.",
      ],
      recall: [
        { q: "Which assignment operator belongs in `always @(posedge clk)`?", a: "Non-blocking `<=`." },
        { q: "After one edge of `a <= b; b <= a;` with a = 3, b = 5?", a: "a = 5, b = 3 (swapped)." },
        { q: "Does statement order matter in a combinational always block?", a: "Yes (blocking `=`); in a synchronous block with `<=` it does not." },
      ],
    },
    {
      title: "Resets and enables",
      intuition:
        "A register's contents are unknown until something sets them, so we want to be able to reset it to a known value. The only question is whether reset waits for the clock (synchronous) or acts whenever it is asserted (asynchronous).",
      visuals: ["reset-types"],
      keyIdeas: [
        "**Synchronous reset**: at a rising edge, if reset is asserted, the register is set to the reset value: `always @(posedge clk) if (rst) q <= 0; else q <= d;`. A reset pulse that starts and ends between edges is never seen. In modern FPGA design we use synchronous reset.",
        "**Asynchronous reset**: whenever the reset input is asserted, the register is set to the reset value. Add the reset to the sensitivity list: `always @(posedge clk or posedge rst) if (rst) q <= 0; else q <= d;`.",
        "**Active-low** reset: test `if (!rst)` (Lecture 10 p.9). PYP 2018-19 S1 Q4(b)(ii) asks for an active-low **asynchronous** reset: the falling edge of the reset goes in the list, `always @(posedge clk or negedge rst)`, with `if (!rst)` inside.",
        "Generally every synchronous component should be implemented with a reset. The reset branch comes first in the if-chain, so it has priority over load and counting.",
        "**Enable**: `if (sh) begin … end` with no else (Lecture 10 shiftreg2): the register changes only when sh is high, otherwise it keeps its value.",
      ],
      code: [
        {
          title: "Synchronous, active-low synchronous, and asynchronous resets (Lecture 10 p.8–10)",
          code: "always @(posedge clk)                // synchronous\n    if (rst) q <= 8'b0000_0000;\n    else     q <= d;\n\nalways @(posedge clk)                // synchronous, active-low\n    if (!rst) q <= 8'b0000_0000;\n    else      q <= d;\n\nalways @(posedge clk or posedge rst) // asynchronous\n    if (rst) q <= 8'b0000_0000;\n    else     q <= d;",
        },
        {
          title: "Register that only changes when en is high",
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
        answer: "Asynchronous reset reacts whenever it is asserted; synchronous reset only to pulses that are high at a rising edge.",
      },
      pitfalls: [
        "For an active-low reset the test is `if (!rst)`; `if (rst)` would reset while the reset is **not** asserted.",
        "A synchronous reset is not in the sensitivity list; an asynchronous one must be.",
      ],
      recall: [
        { q: "How do you make a reset asynchronous in Verilog?", a: "Add it to the sensitivity list: `always @(posedge clk or posedge rst)`." },
        { q: "Which reset type is used in modern FPGA design?", a: "Synchronous." },
        { q: "What does a register do at an edge where `if (sh)` is false and there is no else?", a: "It keeps its value." },
      ],
    },
    {
      title: "Counters in Verilog",
      intuition:
        "A counter is a register whose input is its own value plus one. Inside the synchronous block `q` on the right-hand side is always the old value, so `q <= q + 1'b1` passes the incremented value to q at each edge.",
      visuals: ["counter-stepper"],
      keyIdeas: [
        "Basic (Lecture 10 p.19): `if (rst) q <= 4'b0000; else q <= q + 1'b1;`. The q output is only updated at the rising edge, so inside the block q is the old value.",
        "A 4-bit counter goes 1111 → 0000 (16 = 10000 is truncated at the MSB to fit 4 bits) and counting down from 0000 gives 1111.",
        "Up/down: `else if (down) q <= q - 1'b1; else q <= q + 1'b1;`.",
        "Load: `else if (load) q <= cnt_in;` placed before the counting branches; the order of the if-chain is the priority (rst > load > count).",
        "Wrap at a value (Tutorial 9 Q3a, count 0 … 20): `if (q == 5'd20) q <= 5'd0; else q <= q + 5'd1;`. With an input countmax (Tutorial 9 Q3b), compare with countmax instead.",
        "Count down from a start value loaded on reset (Tutorial 9 Q3c): `if (rst) q <= start_val; else q <= q - 1'b1;`.",
        "**parameter** makes the width configurable: `module cnt #(parameter WIDTH = 6) (…, output reg [WIDTH-1:0] CNT);`; a WIDTH-bit zero can be written with replication `{WIDTH{1'b0}}` (or just 0).",
        "Range-restricted counting (PYP 2021-22 S1 Q3): test the range first, then count: `if (CNT >= 15) CNT <= 0; else CNT <= CNT + 1;` keeps an up-count inside 0 … 15 and moves any value outside it back to 0.",
      ],
      code: [
        {
          title: "Up/down counter with load (Lecture 10 p.22)",
          code: "module simplecnt (input clk, rst, down, load,\n                  input [3:0] cnt_in,\n                  output reg [3:0] q);\nalways @(posedge clk)\nbegin\n    if (rst)\n        q <= 4'b0000;\n    else if (load)\n        q <= cnt_in;\n    else if (down)\n        q <= q - 1'b1;\n    else\n        q <= q + 1'b1;\nend\nendmodule",
        },
        {
          title: "Parameterised up/down counter, up-count restricted to 0–15 (PYP 2021-22 S1 Q3 style)",
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
        "`if (q == 20)` gives 21 states (0 … 20); read the question to see whether the limit value itself is included.",
        "A counter without a reset starts from an unknown value.",
        "`CNT - 1` from 0 wraps to all ones (63 for 6 bits).",
      ],
      recall: [
        { q: "Value after one up-count edge from 4'b1111?", a: "4'b0000 (wraps)." },
        { q: "Which branch wins if rst and load are both 1 in the lecture counter?", a: "rst: it is tested first." },
        { q: "How do you make the counter width a parameter?", a: "`module cnt #(parameter WIDTH = 6) (…)` and declare `[WIDTH-1:0]`." },
      ],
    },
    {
      title: "Shift registers, serial converters, FIFOs and memories",
      intuition:
        "A shift register is a chain of registers where each stage loads its neighbour, so in Verilog it is one line per stage, or one vector assignment using slices.",
      keyIdeas: [
        "Vector form (Lecture 10 p.28): `q[0] <= y; q[4:1] <= q[3:0];` shifts towards the MSB. With concatenation (Lecture 8) the same thing is `q <= {q[3:0], y};`.",
        "Shift the other way (the rt case of shiftreg3): `q[4] <= y; q[3:0] <= q[4:1];`, i.e. `q <= {y, q[4:1]};` (new bit enters at the MSB).",
        "Optional controls (Lecture 10 shiftreg2–5): shift only when `sh` is high, direction `rt`, parallel load `if (ld) q <= ld_val;` (checked first). Output one end (`assign q_out = q[4];`) or the whole word.",
        "**Parallel-to-serial** (sender, `piso4`): load a word when ld is high, then shift it out one bit per clock. **Serial-to-parallel** (receiver, `sipo4`): shift bits in, read the whole word after $n$ edges.",
        "**FIFO**: the same structure with multi-bit registers (`reg [3:0] q1, q2, q3;  q1 <= y; q2 <= q1; …`); the input, output and internal widths should match.",
        "**Memory**: an array of registers, each with a unique address. To store, assert `we` (write enable) and give an address: a decoder enables the matching register to store `d_in` at the clock edge. To read, a multiplexer selects the addressed register onto `d_out`. Standard names: we, re, addr, ce, ae.",
      ],
      code: [
        {
          title: "Shift register with shift enable, direction and load (Lecture 10 p.33)",
          code: "module shiftreg5 (input clk, y, sh, rt, ld,\n                  input [4:0] ld_val,\n                  output q_out, output [4:0] q_word);\nreg [4:0] q;\nalways @(posedge clk)\nbegin\n    if (ld) q <= ld_val; else\n    if (sh) begin\n        if (rt) begin q[4] <= y; q[3:0] <= q[4:1]; end\n        else    begin q[0] <= y; q[4:1] <= q[3:0]; end\n    end\nend\nassign q_out  = rt ? q[0] : q[4];\nassign q_word = q;\nendmodule",
        },
        {
          title: "Parallel-to-serial and serial-to-parallel (Lecture 10 p.36–40)",
          code: "module piso4 (input clk, ld,\n              input [3:0] y,\n              output q_out);\nreg [3:0] q;\nalways @(posedge clk)\nbegin\n    if (ld) q <= y;\n    else begin\n        q[0]   <= y[0];\n        q[3:1] <= q[2:0];\n    end\nend\nassign q_out = q[3];\nendmodule\n\nmodule sipo4 (input clk, y,\n              output reg [3:0] q);\nalways @(posedge clk)\nbegin\n    q[0]   <= y;\n    q[3:1] <= q[2:0];\nend\nendmodule",
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
        "In the lecture's PISO and shiftreg5 the load is tested first, so loading takes priority over shifting.",
        "Concatenation widths must add up to the register width.",
      ],
      recall: [
        { q: "One-line Verilog for a 5-bit shift towards the MSB with serial input y?", a: "`q <= {q[3:0], y};` (same as `q[0] <= y; q[4:1] <= q[3:0];`)." },
        { q: "How many edges until a 4-bit serial-to-parallel register holds a full word?", a: "4." },
        { q: "In the lecture memory, what selects the register that is written?", a: "A decoder on addr, enabled by we." },
      ],
    },
    {
      title: "What gets synthesised",
      intuition:
        "Every non-blocking assignment in a synchronous block is a register, so writing a chain of calculations in one synchronous block puts a register after each step, and each result takes several edges to come out.",
      visuals: ["pipeline"],
      keyIdeas: [
        "Each (non-blocking) assignment results in a register, with its input connected to a circuit based on the right-hand side and its output connected to the signal on the left-hand side.",
        "`x <= a + b; y <= x - c; z <= y * y;` builds adder → register x → subtractor → register y → squarer → register z. y uses the **previous** x, z the previous y, so a and b reach z after 3 edges.",
        "Alternative style (Lecture 10 p.49): compute in `always @*` with `=`, and register the results in a separate `always @(posedge clk)` block (`x_f <= x;` …).",
        "Make the code readable: breaking it into smaller statements makes it easier to debug.",
        "Converting a combinational module (Tutorial 9 Q1b): keep the operations, change `=` to `<=` (or `assign` to registered assignments), put them in one `always @(posedge clk)` block, add `clk` to the ports and declare the intermediate signals as `reg`.",
      ],
      code: [
        {
          title: "Registers after each step (Lecture 10 p.48–49) and the split style",
          code: "always @(posedge clk) begin      always @(posedge clk) begin\n    x <= a + b;                      x_f <= x;  y_f <= y;  z_f <= z;\n    y <= x - c;                  end\n    z <= y * y;                  always @* begin\nend                                  x = a + b;\n                                     y = x_f - c;\n                                     z = y_f * y_f;\n                                 end",
        },
      ],
      example: {
        problem: "In the left-hand code, a, b, c take values $(a_k, b_k, c_k)$ just before edge $k$. Express x, y, z after edge 3.",
        steps: [
          "After edge 3: $x = a_3 + b_3$.",
          "y after edge 3 = x after edge 2 minus $c_3$: $y = a_2 + b_2 - c_3$.",
          "z after edge 3 = (y after edge 2)$^2$, and y after edge 2 $= a_1 + b_1 - c_2$.",
        ],
        answer: "$x = a_3 + b_3$, $y = a_2 + b_2 - c_3$, $z = (a_1 + b_1 - c_2)^2$: c is read at a later edge than the a and b it is combined with.",
      },
      pitfalls: [
        "Assuming z is available one edge after the inputs: count the registers on the path.",
        "Each register's right-hand side uses values from just before the edge, including the other registers.",
      ],
      recall: [
        { q: "How many edges from a to z in `x <= a + b; y <= x - c; z <= y * y;`?", a: "3 clock edges." },
        { q: "What does each non-blocking assignment synthesise to?", a: "A register fed by the right-hand-side circuit." },
        { q: "Rule for reading values in synchronous code?", a: "RHS = value just before the edge; LHS updated just after." },
      ],
    },
    {
      title: "Worked design: monitoring counter, and common errors",
      intuition:
        "Most exam designs are a register plus a little combinational logic around it. Decide what is stored (the count), what is combinational (the alarm comparison), and which signal stops or resets the register.",
      visuals: ["alarm-monitor"],
      keyIdeas: [
        "Tutorial 9 Q2: a 6-bit counter counts cycles with `evnt` high; `alarm` is **combinational** (as the hint says: `assign alarm = count > thresh;`); alarm decides whether the counter counts in a cycle, so the counter stops; `rst` resets the system.",
        "Because alarm is combinational it rises in the same cycle the count first exceeds thresh.",
        "Tutorial 9 Q1a (`countwrong`): a counter written in `always @*` with `cnt_out = cnt_out + 1'b1;` has no clock, so nothing makes it count once per cycle; it needs `always @(posedge clk)`, `<=`, a reset, and `cnt_out` declared as `output reg`.",
        "Check every design against: one clock, reset branch first, `<=` everywhere in synchronous blocks, every output either `reg` (assigned in an always block) or a wire (assigned by `assign`), and each signal assigned from only one place.",
      ],
      code: [
        {
          title: "Monitoring counter (Tutorial 9 Q2)",
          code: "module monitor (input clk, rst, evnt,\n                input [5:0] thresh,\n                output alarm);\nreg [5:0] count;\nassign alarm = (count > thresh);     // combinational\nalways @(posedge clk)\nbegin\n    if (rst)\n        count <= 6'd0;\n    else if (evnt && !alarm)          // stop when alarm\n        count <= count + 1'b1;\nend\nendmodule",
        },
        {
          title: "Corrected Tutorial 9 Q1a counter",
          code: "module countright (input clk, rst, output reg [5:0] cnt_out);\nalways @(posedge clk)\nbegin\n    if (rst) cnt_out <= 6'd0;\n    else     cnt_out <= cnt_out + 1'b1;\nend\nendmodule",
        },
      ],
      example: {
        problem: "Correct this counter:\n```\nmodule counter (input clk, rst, output [3:0] count);\nalways @(posedge clk)\n    if (rst) count = 4'd0;\n    else     count = count + 1;\nendmodule\n```",
        steps: [
          "count is assigned in an always block, so declare it `output reg [3:0] count`.",
          "It is a synchronous block, so use non-blocking assignments: `count <= 4'd0;` and `count <= count + 1'b1;`.",
        ],
        answer: "```\nmodule counter (input clk, rst, output reg [3:0] count);\nalways @(posedge clk)\n    if (rst) count <= 4'd0;\n    else     count <= count + 1'b1;\nendmodule\n```",
      },
      pitfalls: [
        "Assigning the alarm inside the synchronous block makes it a register, so it would rise one cycle later than the hint intends.",
        "'Exceeds' means `>`; 'reaches' means `>=` or `==`. Read the wording.",
        "A stopped counter needs `!alarm` in its increment condition; resetting the counter is the operator's job (rst).",
      ],
      recall: [
        { q: "Is the alarm in Tutorial 9 Q2 combinational or registered?", a: "Combinational: `assign alarm = count > thresh;`." },
        { q: "What is wrong with a counter written in `always @*`?", a: "There is no clock, so it cannot count once per cycle; use `always @(posedge clk)` with `<=` and a reset." },
        { q: "What must an output assigned in an always block be declared as?", a: "`output reg`." },
      ],
    },
  ],
  playbook: [
    "If you see `always @(posedge clk)` code and 'value after n edges': make a table, evaluate every RHS with the old values, then update all registers together.",
    "If you see 'what is `<=`': in an assignment statement it is non-blocking; inside an `if (…)` condition it is less-than-or-equal.",
    "If you see 'blocking vs non-blocking': `=` in combinational blocks (order matters), `<=` in synchronous blocks (order does not matter).",
    "If you see 'write a counter': ports with `output reg [WIDTH-1:0]`, `parameter WIDTH`, `always @(posedge clk)`, reset first, then load, then the counting branches; `<=` throughout.",
    "If you see a counter that wraps at N: decide whether N is included (`== N` gives N+1 states).",
    "If you see asynchronous reset: it must appear in the sensitivity list (`posedge rst` with `if (rst)`); for active-low, test `if (!rst)`.",
    "If you see 'add a register after each stage': one synchronous block, `<=`, intermediates as `reg`, `clk` in the port list.",
    "If you see 'how many flip-flops': add the widths of every signal assigned in synchronous blocks; `assign` and operators add none.",
    "If you see a monitoring/alarm design: alarm is an `assign` comparison, and the counter's increment condition includes `!alarm`.",
  ],
};
