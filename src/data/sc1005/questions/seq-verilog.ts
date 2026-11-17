import type { Draft } from "@/lib/sc1005/types";

const T16 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

export const seqVerilogQuestions: Draft[] = [
  // ---------------------------------------------------------------- basics
  {
    kind: "mcq",
    subtopic: "Non-blocking assignment",
    difficulty: "easy",
    prompt: "In the statement below (inside `always @(posedge clk)`), what do the two `<=` symbols mean?",
    code: "if (count <= 4'd9) count <= count + 4'd1;",
    options: [
      "Both are non-blocking assignments",
      "The first is a less-than-or-equal comparison; the second is a non-blocking assignment",
      "The first is a non-blocking assignment; the second is a less-than-or-equal comparison",
      "Both are comparisons, so the statement has no effect",
      "The first is a blocking assignment; the second is a non-blocking assignment",
    ],
    answer: 1,
    solution:
      "`<=` has two meanings in Verilog, decided by context. Inside an expression (here the `if` condition) it is the relational operator **less than or equal**. As a statement (`lhs <= rhs;`) it is the **non-blocking assignment**. So the line increments count at the clock edge while count ≤ 9.",
    source: "Style: PYP 2021-22 S1 Q1(2)",
  },
  {
    kind: "mcq",
    subtopic: "Clocked always blocks",
    difficulty: "medium",
    prompt: "Which of the following is true about an `always @(posedge clk)` block?",
    options: [
      "The order of non-blocking assignments inside it changes the hardware",
      "Every signal assigned inside it must be declared as `reg`",
      "It executes exactly once, at the start of simulation",
      "Module instances may be placed inside it",
      "There are multiple correct answers",
    ],
    answer: 1,
    solution:
      "- B is true: any signal assigned in an always block (clocked or combinational) must be a `reg` (for an output, `output reg`).\n- A is false: with `<=` every right-hand side uses the value from before the edge, so order does not matter.\n- C is false: an always block runs repeatedly, here at every rising edge of clk (an `initial` block runs once).\n- D is false: modules are instantiated outside always blocks.\nOnly B is correct, so E is wrong too.",
    source: "Style: PYP 2021-22 S1 Q1(4)",
  },
  {
    kind: "short",
    subtopic: "What gets synthesised",
    difficulty: "medium",
    prompt: "How many D flip-flops does this module synthesise to?",
    code:
      "module m (input clk, en, input [7:0] din,\n          output full, output reg [3:0] cnt);\nreg [7:0]  din_r;\nreg [15:0] acc;\nreg        valid;\nreg [15:0] nxt;\nalways @*\n    nxt = acc + din_r;\nalways @(posedge clk) begin\n    din_r <= din;\n    valid <= en;\n    if (valid) acc <= nxt;\n    cnt <= cnt + 1'b1;\nend\nassign full = acc[15];\nendmodule",
    accept: ["29"],
    match: "number",
    solution:
      "Only signals assigned in the **clocked** block become registers: din_r (8) + valid (1) + acc (16) + cnt (4) = **29**.\n- `nxt` is declared `reg` but assigned in `always @*`: it is combinational (an adder), no flip-flops.\n- `full` is an `assign`: a wire.\n- `if (valid)` without else just makes acc hold its value (a feedback MUX), not extra storage.",
    source: "Style: Lecture 10 what gets synthesised",
  },
  // ---------------------------------------------------------------- blocking vs non-blocking
  {
    kind: "mcq",
    subtopic: "Tracing clocked code",
    difficulty: "medium",
    prompt: "All registers start at 0. Before five successive rising edges the input y is 1, 0, 1, 1, 0. What is {q1, q2, q3, q} after the fifth edge?",
    code: "always @(posedge clk)\nbegin\n    q1 <= y;\n    q2 <= q1;\n    q3 <= q2;\n    q  <= q3;\nend",
    options: ["0110", "0000", "1101", "0011", "1011"],
    answer: 0,
    solution:
      "Non-blocking: every right-hand side uses the value from just before the edge, so each register takes its left neighbour's **old** value: a 4-stage shift register. After edge $k$: q1 = $y_k$, q2 = $y_{k-1}$, q3 = $y_{k-2}$, q = $y_{k-3}$.\nAfter edge 5: q1 = $y_5$ = 0, q2 = $y_4$ = 1, q3 = $y_3$ = 1, q = $y_2$ = 0, i.e. **0110**.\n0000 is the blocking-assignment result (every register = $y_5$).",
    source: "Style: Lecture 10 shift registers",
  },
  {
    kind: "mcq",
    subtopic: "Blocking vs non-blocking",
    difficulty: "hard",
    prompt: "A designer writes a 4-stage shift register with **blocking** assignments, as below. What does it actually synthesise to?",
    code: "always @(posedge clk)\nbegin\n    q1 = y;\n    q2 = q1;\n    q3 = q2;\n    q  = q3;\nend",
    options: [
      "Still a 4-stage shift register: q is y delayed by four edges",
      "Four registers that all load y at each edge, so q is y delayed by only one edge",
      "A combinational path: q follows y immediately",
      "A latch, because blocking assignments are level-sensitive",
      "A 3-stage shift register: q is y delayed by three edges",
    ],
    answer: 1,
    solution:
      "With `=` each statement completes before the next runs. At an edge: q1 = y; then q2 = q1 reads the **new** q1, i.e. y; likewise q3 = y and q = y. Every register's D input is effectively y, so all four registers hold the same value and q is y delayed by a single edge.\nIt is still clocked (only updated at posedge), so it is neither combinational nor a latch. This is why clocked blocks use `<=`.",
    source: "Style: Lecture 10 / Verilog recap",
  },
  {
    kind: "mcq",
    subtopic: "Blocking vs non-blocking",
    difficulty: "hard",
    prompt: "Which of these four clocked blocks implement a 4-stage shift register from y to q (y reaches q after 4 edges)?",
    code:
      "// (1)                    // (2)\nalways @(posedge clk)      always @(posedge clk)\nbegin                      begin\n    q1 <= y;                   q  <= q3;\n    q2 <= q1;                  q3 <= q2;\n    q3 <= q2;                  q2 <= q1;\n    q  <= q3;                  q1 <= y;\nend                        end\n\n// (3)                    // (4)\nalways @(posedge clk)      always @(posedge clk)\nbegin                      begin\n    q1 = y;                    q  = q3;\n    q2 = q1;                   q3 = q2;\n    q3 = q2;                   q2 = q1;\n    q  = q3;                   q1 = y;\nend                        end",
    options: ["(1) only", "(1) and (2) only", "(1), (2) and (4)", "All four", "(1) and (4) only"],
    answer: 2,
    solution:
      "- (1), (2): non-blocking, so order is irrelevant: both are shift registers.\n- (3): blocking in forward order: every register gets y (one edge of delay).\n- (4): blocking in **reverse** order: q takes the old q3 before q3 is overwritten, q3 takes the old q2, and so on, so it also behaves as a shift register.\nAnswer (1), (2) and (4). Relying on statement order like (4) is fragile, which is why the rule is: `<=` in clocked blocks.",
    source: "Style: Lecture 10 shift registers",
  },
  {
    kind: "short",
    subtopic: "Blocking vs non-blocking",
    difficulty: "medium",
    prompt: "4-bit registers a and b hold a = 4'h3 and b = 4'hC. After one rising edge of the block below, what is the 8-bit value {a, b} in hex?",
    code: "always @(posedge clk)\nbegin\n    a = b;\n    b = a;\nend",
    accept: ["CC", "8'hCC", "hCC", "0xCC"],
    match: "text",
    placeholder: "hex",
    solution:
      "Blocking: `a = b` makes a = C immediately; then `b = a` copies the **new** a, so b = C. {a, b} = **CC**.\nWith non-blocking (`a <= b; b <= a;`) both right-hand sides would use the old values and the registers would swap: {a, b} = C3.",
    source: "Style: Lecture 10 assignments in always blocks",
  },
  // ---------------------------------------------------------------- resets
  {
    kind: "mcq",
    subtopic: "Asynchronous reset",
    difficulty: "medium",
    prompt: "Which block describes a D flip-flop with an **active-low asynchronous** reset `rst_n`?",
    options: [
      "always @(posedge clk or negedge rst_n)\n    if (!rst_n) q <= 1'b0;\n    else        q <= d;",
      "always @(posedge clk)\n    if (!rst_n) q <= 1'b0;\n    else        q <= d;",
      "always @(posedge clk or posedge rst_n)\n    if (!rst_n) q <= 1'b0;\n    else        q <= d;",
      "always @(posedge clk or rst_n)\n    if (!rst_n) q <= 1'b0;\n    else        q <= d;",
      "always @(posedge clk or negedge rst_n)\n    if (rst_n) q <= 1'b0;\n    else       q <= d;",
    ],
    answer: 0,
    solution:
      "Asynchronous means the reset must wake the block up by itself, so it goes in the sensitivity list; active-low means it is asserted when it **falls** to 0, hence `negedge rst_n`, and the test inside must be `if (!rst_n)`.\n- B is a synchronous reset (checked only at clock edges).\n- C triggers on the wrong edge (release of the reset).\n- D mixes an edge with a level in the list.\n- E resets when rst_n = 1, i.e. while it is **not** asserted.",
    source: "Style: Lecture 10 clock and reset",
  },
  {
    kind: "mcq",
    subtopic: "Synchronous vs asynchronous reset",
    difficulty: "medium",
    prompt:
      "Two registers have d = 1 throughout and the same active-high rst shown below. One uses a synchronous reset (`always @(posedge clk) if (rst) q <= 0; else q <= d;`), the other an asynchronous reset (`always @(posedge clk or posedge rst)` with the same body). Both start unknown. Which statement is correct?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "0011001100110011" },
          { name: "rst", wave: "0000000100001110" },
          { name: "d", wave: "1111111111111111" },
        ],
        ticks: T16,
      },
    ],
    options: [
      "Both versions clear q during unit 7",
      "Only the asynchronous version clears q in unit 7; both have q = 0 in units 14–15",
      "Only the synchronous version clears q in unit 7",
      "The synchronous version clears q from unit 12, the asynchronous one only from unit 14",
      "Neither version reacts to the pulse in unit 7, because it is shorter than a clock period",
    ],
    answer: 1,
    solution:
      "Rising edges are at units 2, 6, 10 and 14; at each, the register uses rst and d from the unit before.\n- Pulse in unit 7: the asynchronous register clears immediately and reloads d = 1 at the edge at unit 10. The synchronous register only checks rst at edges; rst is 0 in units 5 and 9, so it never sees this pulse.\n- Pulse in units 12–14: the asynchronous register clears at unit 12. The synchronous register sees rst = 1 in unit 13, so it clears at the edge at unit 14.\nSo only the asynchronous one reacts in unit 7, and both are 0 in units 14–15.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "clk", wave: "0011001100110011" },
          { name: "rst", wave: "0000000100001110" },
          { name: "q sync", wave: "xx11111111111100" },
          { name: "q async", wave: "xx11111000110000" },
        ],
        ticks: T16,
        marks: [2, 6, 10, 14],
      },
    ],
    source: "Style: Lecture 10 clock and reset",
  },
  {
    kind: "mcq",
    subtopic: "Sensitivity lists",
    difficulty: "medium",
    prompt: "A student wants an asynchronous active-high reset and writes the block below. What is wrong?",
    code: "always @(posedge clk or rst)\n    if (rst) q <= 1'b0;\n    else     q <= d;",
    options: [
      "Nothing; this is the standard asynchronous reset",
      "The sensitivity list mixes an edge with a level; it should be `posedge clk or posedge rst`",
      "The reset should be tested with `if (rst == 1'b0)`",
      "Non-blocking assignments cannot be used together with a reset",
      "A reset must never appear in the sensitivity list of a clocked block",
    ],
    answer: 1,
    solution:
      "An edge-triggered block's sensitivity list may only contain edges. `or rst` would run the block on **any** change of rst, including when it falls, where the else branch would load d without a clock edge. Synthesis tools reject (or misinterpret) this. The asynchronous form is `always @(posedge clk or posedge rst)`. Option E describes the synchronous style, which is valid but is not asynchronous.",
    source: "Style: Tutorial 9 Q1(a)",
  },
  {
    kind: "mcq",
    subtopic: "Common errors",
    difficulty: "medium",
    prompt: "This counter does not compile. Which change is required?",
    code: "module cnt4 (input clk, rst, output [3:0] count);\nalways @(posedge clk)\n    if (rst) count <= 4'd0;\n    else     count <= count + 1'b1;\nendmodule",
    options: [
      "Declare the output as `output reg [3:0] count`",
      "Replace `<=` with `=`",
      "Change `1'b1` to `4'b0001`, because the widths of the operands must match",
      "Add count to the sensitivity list",
      "Replace the always block with `assign count = count + 1;`",
    ],
    answer: 0,
    solution:
      "count is assigned inside an always block, so it must be a `reg`: `output reg [3:0] count`.\n- `<=` is correct for a clocked block.\n- Verilog extends `1'b1` to the width of the expression; `count + 1'b1` is fine.\n- Adding count to the list would make it re-trigger on its own changes.\n- `assign count = count + 1` is a combinational loop, not a counter.",
    source: "Style: Tutorial 9 Q1(a)",
  },
  {
    kind: "mcq",
    subtopic: "Common errors",
    difficulty: "medium",
    prompt: "What is wrong with this code for a 4-bit counter with reset and enable?",
    code: "always @(posedge clk)\n    if (rst) q <= 4'd0;\n\nalways @(posedge clk)\n    if (en) q <= q + 1'b1;",
    options: [
      "Nothing: rst and en simply share the register q",
      "q is assigned in two always blocks (multiple drivers); both conditions must go in one block, e.g. `if (rst) … else if (en) …`",
      "Blocking assignments must be used when a register is shared",
      "The second block creates a latch because it has no else",
      "The reset must be asynchronous when there is an enable",
    ],
    answer: 1,
    solution:
      "A register has one D input, so it must be driven from one place. Two always blocks assigning q are two drivers fighting over the same flip-flops: synthesis reports a multiple-driver error, and simulation gives order-dependent results. Merge them:\n```\nalways @(posedge clk)\n    if (rst)     q <= 4'd0;\n    else if (en) q <= q + 1'b1;\n```\nA missing else in a clocked block only means 'hold', not a latch.",
    source: "Style: Lecture 10 what gets synthesised",
  },
  {
    kind: "mcq",
    subtopic: "Enables",
    difficulty: "easy",
    prompt: "What does synthesis build from `always @(posedge clk) if (en) q <= d;` (no else)?",
    options: [
      "A transparent latch, because the else branch is missing",
      "A D flip-flop whose D input is d when en = 1 and its own output q when en = 0 (it holds)",
      "A D flip-flop with its clock gated by en through an AND gate",
      "A combinational multiplexer with no storage",
      "Nothing: the code is illegal without an else",
    ],
    answer: 1,
    solution:
      "In a clocked block, a path with no assignment simply means the register keeps its value at that edge. Synthesis builds a D flip-flop with a 2-to-1 MUX in front: $D = en\\cdot d + \\overline{en}\\cdot q$ (or uses a flip-flop with a built-in enable). The 'missing else makes a latch' rule applies only to **combinational** `always @*` blocks. Gating the clock is avoided in synchronous design.",
    source: "Style: Lecture 10 shift registers with sh",
  },
  {
    kind: "mcq",
    subtopic: "Clocked always blocks",
    difficulty: "easy",
    prompt: "What does `always @(negedge clk) q <= d;` describe?",
    options: [
      "A D flip-flop that captures d on the falling edge of clk",
      "A D flip-flop that captures d on the rising edge of clk",
      "A D latch that is transparent while clk = 0",
      "An inverter from d to q",
      "A D flip-flop that captures the inverse of d",
    ],
    answer: 0,
    solution: "`negedge clk` means the block runs when clk falls from 1 to 0, so q captures d at each falling edge: a negative-edge triggered D flip-flop. A latch would be level-sensitive (`always @*` with an incomplete if).",
    source: "Style: Lecture 10 clock and reset",
  },
  // ---------------------------------------------------------------- counters
  {
    kind: "mcq",
    subtopic: "Counter wrap-around",
    difficulty: "easy",
    prompt: "q is declared `reg [3:0] q` and currently holds 4'b1111. What does q hold after one edge of `always @(posedge clk) q <= q + 1;`?",
    options: ["5'b10000", "4'b0000", "4'b1111 (it saturates)", "4'bxxxx", "A compile error, because 1 is a 32-bit constant"],
    answer: 1,
    solution:
      "The sum is computed wide enough (15 + 1 = 16 = 10000 in binary), but it is assigned to a 4-bit register, so only the low 4 bits are kept: 0000. A binary counter wraps from $2^n - 1$ to 0 automatically. Mixing widths is legal in Verilog; the result is truncated or zero-extended to fit.",
    source: "Original",
  },
  {
    kind: "short",
    subtopic: "Up/down counter",
    difficulty: "medium",
    prompt: "The 4-bit up/down counter below receives the inputs in the table before edges 1 to 9. What is q (in decimal) after edge 9?",
    code: "always @(posedge clk)\n    if (rst)       q <= 4'b0000;\n    else if (down) q <= q - 1'b1;\n    else           q <= q + 1'b1;",
    figures: [
      {
        kind: "table",
        head: ["edge", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        rows: [
          ["rst", 1, 0, 0, 0, 0, 0, 0, 0, 0],
          ["down", 0, 1, 1, 1, 0, 0, 0, 0, 0],
        ],
      },
    ],
    accept: ["2"],
    match: "number",
    solution:
      "Edge 1: reset, q = 0. Edges 2–4 count down from 0: 15 (wraps), 14, 13. Edges 5–9 count up: 14, 15, 0 (wraps), 1, **2**.",
    source: "Style: Lecture 10 up-down counter",
  },
  {
    kind: "short",
    subtopic: "Counting to N",
    difficulty: "medium",
    prompt: "The 5-bit counter below is reset at one edge and then receives 50 more clock edges with rst = 0. What is q (in decimal) after those 50 edges?",
    code: "always @(posedge clk)\n    if (rst)              q <= 5'd0;\n    else if (q == 5'd20)  q <= 5'd0;\n    else                  q <= q + 5'd1;",
    accept: ["8"],
    match: "number",
    solution:
      "The counter cycles 0, 1, …, 20, 0, …: that is **21** states (20 is included before it wraps). After 50 edges from 0, $q = 50 \\bmod 21 = 8$.\nA common slip is to treat it as mod-20 ($50 \\bmod 20 = 10$).",
    source: "Style: Tutorial 9 Q3(a)",
  },
  {
    kind: "mcq",
    subtopic: "Counting to N",
    difficulty: "medium",
    prompt: "A 5-bit counter must cycle 0, 1, 2, …, 19, 0, 1, … (a mod-20 counter), starting from 0 after reset. Which wrap condition(s) in `else if (COND) q <= 5'd0; else q <= q + 5'd1;` achieve this?",
    options: ["`q == 5'd20`", "`q == 5'd19`", "`q > 5'd19`", "`q >= 5'd19`", "There are multiple correct answers"],
    answer: 4,
    solution:
      "The register must go to 0 at the edge where q is **19**, so 19 is the last state.\n- `q == 5'd19` ✓.\n- `q >= 5'd19` ✓ (starting from 0, q never exceeds 19, so it behaves identically, and it is also safe if q ever starts above 19).\n- `q == 5'd20` and `q > 5'd19` both let q reach 20 first: 21 states (mod-21).\nTwo options work, so the answer is E.",
    source: "Style: Tutorial 9 Q3(a)",
  },
  {
    kind: "short",
    subtopic: "Counting to N",
    difficulty: "hard",
    prompt:
      "A 5-bit counter wraps at a run-time limit: `if (q == countmax) q <= 5'd0; else q <= q + 5'd1;`. The counter is at q = 18 when countmax is changed from 25 to 10 (and then stays 10). How many clock edges later does q first become 0?",
    accept: ["14"],
    match: "number",
    solution:
      "q is already past 10, so `q == countmax` is never true on the way up: q counts 19, 20, …, 31 and then wraps naturally to 0. From 18 that takes $31 - 18 = 13$ edges to reach 31, plus one more to wrap: **14** edges.\nWriting the test as `q >= countmax` would reset q to 0 at the very next edge, which is why `>=` is the safer choice (Tutorial 9 Q3(b)).",
    source: "Style: Tutorial 9 Q3(b)",
  },
  {
    kind: "short",
    subtopic: "Up/down counter with range",
    difficulty: "hard",
    prompt:
      "The 6-bit counter below starts at CNT = 5 (rst stays 0). The input U before edges 1 to 11 is: 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1. What is CNT (in decimal) after edge 11?",
    code:
      "always @(posedge clk)\n    if (rst)\n        CNT <= 6'd0;\n    else if (U) begin\n        if (CNT >= 6'd15) CNT <= 6'd0;\n        else              CNT <= CNT + 1'b1;\n    end\n    else\n        CNT <= CNT - 1'b1;",
    accept: ["1"],
    match: "number",
    solution:
      "Down-counting is unrestricted; up-counting is kept in 0 … 15.\n- Edges 1–7 (U = 0): 4, 3, 2, 1, 0, 63, 62.\n- Edge 8 (U = 1): 62 ≥ 15, so CNT → 0.\n- Edge 9 (U = 0): 0 − 1 = 63.\n- Edge 10 (U = 1): 63 ≥ 15 → 0.\n- Edge 11 (U = 1): 0 + 1 = **1**.",
    source: "Style: PYP 2021-22 S1 Q3",
  },
  {
    kind: "short",
    subtopic: "Counter with load",
    difficulty: "medium",
    prompt: "For the counter below, the inputs before edges 1 to 9 are as in the table. What is q (in decimal) after edge 9?",
    code: "always @(posedge clk)\n    if (rst)        q <= 4'b0000;\n    else if (load)  q <= cnt_in;\n    else if (down)  q <= q - 1'b1;\n    else            q <= q + 1'b1;",
    figures: [
      {
        kind: "table",
        head: ["edge", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        rows: [
          ["rst", 1, 0, 0, 0, 0, 0, 0, 0, 0],
          ["load", 0, 1, 0, 0, 0, 1, 0, 0, 0],
          ["cnt_in", 5, 12, 12, 12, 12, 2, 2, 2, 2],
          ["down", 1, 0, 0, 0, 0, 1, 1, 1, 1],
        ],
      },
    ],
    accept: ["15"],
    match: "number",
    solution:
      "Priority follows the if-chain: rst, then load, then down/up.\n- Edge 1: rst → 0 (load and down ignored).\n- Edge 2: load → 12. Edges 3–5: up → 13, 14, 15.\n- Edge 6: load has priority over down → 2.\n- Edges 7–9: down → 1, 0, **15** (wraps).",
    source: "Style: Lecture 10 counter with load",
  },
  {
    kind: "mcq",
    subtopic: "Counter with start value",
    difficulty: "medium",
    prompt: "Which block correctly implements a 6-bit counter that counts **down** from an initial value, where the initial value is loaded from the input `start_val` on (synchronous) reset?",
    options: [
      "always @(posedge clk)\n    if (rst) start_val <= q;\n    else     q <= q - 1'b1;",
      "always @(posedge clk) begin\n    if (rst) q <= start_val;\n    q <= q - 1'b1;\nend",
      "always @(posedge clk)\n    if (rst) q <= start_val;\n    else     q <= q - 1'b1;",
      "always @*\n    if (rst) q = start_val;\n    else     q = q - 1;",
      "always @(posedge clk)\n    if (rst) q <= start_val;\n    else     q <= start_val - 1'b1;",
    ],
    answer: 2,
    solution:
      "C loads start_val while rst is high and otherwise decrements q at every edge.\n- A assigns to an input port.\n- B: the second non-blocking assignment always overrides the first (the last `<=` to a register in a block wins), so the reset never takes effect.\n- D is a combinational loop (`q = q - 1` with no clock).\n- E always loads start_val − 1, so it gets stuck instead of counting.",
    source: "Style: Tutorial 9 Q3(c)",
  },
  // ---------------------------------------------------------------- shift registers
  {
    kind: "mcq",
    subtopic: "Parallel-to-serial",
    difficulty: "medium",
    prompt: "The register is loaded with din = 4'b1101 at edge 1 (ld = 1), then ld = 0 for edges 2, 3, 4. What sequence appears on sout just after edges 1, 2, 3 and 4?",
    code: "always @(posedge clk)\n    if (ld) q <= din;\n    else    q <= {1'b0, q[3:1]};\nassign sout = q[0];",
    options: ["1, 0, 1, 1", "1, 1, 0, 1", "1, 0, 0, 0", "0, 1, 1, 0", "1, 1, 1, 1"],
    answer: 0,
    solution:
      "After edge 1: q = 1101, sout = q[0] = 1.\nEach later edge shifts right (towards q[0]) with 0 entering at q[3]: 0110 → sout 0; 0011 → 1; 0001 → 1.\nSo the word leaves **LSB first**: 1, 0, 1, 1. (Shifting the other way with sout = q[3] would send the MSB first: 1, 1, 0, 1.)",
    source: "Style: CE1005 2017-18 S1 Q4(b) (PISO)",
  },
  {
    kind: "mcq",
    subtopic: "Serial-to-parallel",
    difficulty: "medium",
    prompt: "q is a 4-bit register that starts at 0000. Before five successive edges, y = 1, 0, 0, 1, 1. What is q after the fifth edge?",
    code: "always @(posedge clk)\n    q <= {q[2:0], y};",
    options: ["0011", "1100", "1001", "0110", "10011"],
    answer: 0,
    solution:
      "Each edge shifts q left by one and puts y into q[0]: 0001, 0010, 0100, 1001, **0011**. The first bit (1) has been shifted out of the top after five edges, since q only has 4 bits (10011 would need a 5-bit register).\nWith `{y, q[3:1]}` the bits would enter at the top instead.",
    source: "Style: Lecture 10 serial-to-parallel",
  },
  {
    kind: "mcq",
    subtopic: "Shift registers in Verilog",
    difficulty: "hard",
    prompt: "The 5-bit register q starts at 5'b10011. The inputs (sh, rt, y) before five successive edges are (1,0,1), (1,1,0), (0,1,1), (1,1,1), (1,0,0). What is q after the fifth edge?",
    code: "always @(posedge clk)\n    if (sh) begin\n        if (rt) begin q[4] <= y; q[3:0] <= q[4:1]; end\n        else    begin q[0] <= y; q[4:1] <= q[3:0]; end\n    end",
    options: ["5'b00010", "5'b10001", "5'b00011", "5'b01000", "5'b00101"],
    answer: 0,
    solution:
      "- (1,0,1): shift towards the MSB, y into q[0]: 10011 → 00111.\n- (1,1,0): shift towards the LSB, y into q[4]: 00111 → 00011.\n- (0,1,1): sh = 0, hold: 00011.\n- (1,1,1): 00011 → 10001.\n- (1,0,0): 10001 → **00010**.",
    source: "Style: Lecture 10 shift registers (shiftreg3)",
  },
  {
    kind: "short",
    subtopic: "Tracing clocked code",
    difficulty: "hard",
    prompt: "A, B and C are 1-bit registers, reset to 0, and rst = 0 afterwards. What is {A, B, C} after the fifth rising edge? Type 3 bits.",
    code: "always @(posedge clk)\n    if (rst) begin\n        A <= 1'b0; B <= 1'b0; C <= 1'b0;\n    end\n    else begin\n        A <= ~C;\n        B <= A ^ C;\n        C <= B;\n    end",
    accept: ["010"],
    match: "text",
    placeholder: "ABC",
    solution:
      "Use the old values on every right-hand side:\n- Edge 1 (old 000): A = ~0 = 1, B = 0 ^ 0 = 0, C = 0 → 100.\n- Edge 2 (old 100): A = 1, B = 1 ^ 0 = 1, C = 0 → 110.\n- Edge 3 (old 110): A = 1, B = 1, C = 1 → 111.\n- Edge 4 (old 111): A = 0, B = 1 ^ 1 = 0, C = 1 → 001.\n- Edge 5 (old 001): A = 0, B = 0 ^ 1 = 1, C = 0 → **010**.",
    source: "Style: CE1005 2016-17 S1 Q4(a)",
  },
  {
    kind: "mcq",
    subtopic: "Blocking vs non-blocking",
    difficulty: "hard",
    prompt: "A, B and C are 1-bit registers that start at {A, B, C} = 000, and rst = 0. Note the **blocking** assignments. What is {A, B, C} after the fifth rising edge?",
    code: "always @(posedge clk)\n    if (rst) begin\n        A = 1'b0; B = 1'b0; C = 1'b0;\n    end\n    else begin\n        A = ~C;\n        B = A ^ C;\n        C = B;\n    end",
    options: ["011", "010", "111", "100", "001"],
    answer: 0,
    solution:
      "Now each line sees the values written by the lines above it in the same edge:\n- Edge 1: A = ~0 = 1; B = A ^ C = 1 ^ 0 = 1; C = B = 1 → 111.\n- Edge 2: A = ~1 = 0; B = 0 ^ 1 = 1; C = 1 → 011.\n- From 011 the same thing repeats: A = 0, B = 1, C = 1 → 011 for every later edge.\nAfter edge 5: **011**. (With non-blocking `<=` the same code gives 010: 100, 110, 111, 001, 010.)",
    source: "Style: CE1005 2016-17 S1 Q4(a)",
  },
  // ---------------------------------------------------------------- pipelining
  {
    kind: "mcq",
    subtopic: "Pipelining",
    difficulty: "hard",
    prompt:
      "The inputs a, b, c, d take the values $a_k, b_k, c_k, d_k$ just before rising edge $k$. All registers were initialised earlier. Which expression gives r just after edge 3?",
    code: "always @(posedge clk)\nbegin\n    p <= a * b;\n    q <= p + c;\n    r <= q - d;\nend",
    options: ["$a_1b_1 + c_1 - d_1$", "$a_1b_1 + c_2 - d_3$", "$a_3b_3 + c_3 - d_3$", "$a_1b_1 + c_1 - d_2$", "$a_2b_2 + c_2 - d_3$"],
    answer: 1,
    solution:
      "Each register uses the values from just before its edge:\n- p after edge 1 $= a_1b_1$.\n- q after edge 2 $=$ p (after edge 1) $+ c_2 = a_1b_1 + c_2$.\n- r after edge 3 $=$ q (after edge 2) $- d_3 = a_1b_1 + c_2 - d_3$.\nThe side inputs c and d are sampled one and two edges later than a and b, so they belong to later input sets. To keep a set together, c must be delayed by one register and d by two.",
    source: "Style: Lecture 10 what gets synthesised",
  },
  // ---------------------------------------------------------------- structured (exam Q3 style)
  {
    kind: "open",
    subtopic: "Up/down counter with range",
    difficulty: "hard",
    prompt:
      "Write the Verilog code for an up/down counter with output CNT. Use a parameter statement to define the counter width (WIDTH = 5). The counter has a synchronous active-high reset rst (CNT = 0) and a 1-bit direction input D: when D = 0 the counter counts up with no restriction; when D = 1 it counts **down** and must stay in the range 4 to 20 (decimal). When counting down from 4 it wraps to 20, and if CNT is outside 4 … 20 when D = 1, it should move to 20 on the next count. (20 marks)",
    modelAnswer:
      "```\nmodule updown #(parameter WIDTH = 5)\n    (input clk, rst, D,\n     output reg [WIDTH-1:0] CNT);\n\nalways @(posedge clk)\nbegin\n    if (rst)\n        CNT <= {WIDTH{1'b0}};\n    else if (D) begin                       // count down, keep in 4..20\n        if (CNT <= 4 || CNT > 20)\n            CNT <= 20;                      // wrap at 4, or pull back into range\n        else\n            CNT <= CNT - 1'b1;\n    end\n    else\n        CNT <= CNT + 1'b1;                  // unrestricted up-count\nend\n\nendmodule\n```\nNotes: `CNT <= 4` inside the `if` is a comparison; at exactly 4 the next value is 20 (wrap), below 4 or above 20 the next value is also 20. The up-count wraps from 31 to 0 automatically because CNT is WIDTH bits.",
    rubric: [
      { point: "Module header with parameter WIDTH = 5 and ports clk, rst, D, output reg [WIDTH-1:0] CNT", marks: 4 },
      { point: "always @(posedge clk) with non-blocking assignments", marks: 3 },
      { point: "Synchronous reset tested first, sets CNT to 0", marks: 3 },
      { point: "Up-count branch (D = 0): CNT + 1 with no range check", marks: 3 },
      { point: "Down-count branch: decrement inside 5 … 20", marks: 3 },
      { point: "Wrap from 4 to 20 and out-of-range values go to 20 (condition CNT <= 4 || CNT > 20)", marks: 4 },
    ],
    solution: "Reset first, then split on D; put the range test before the decrement so out-of-range values are corrected on the next edge.",
    source: "Style: PYP 2021-22 S1 Q3",
  },
  {
    kind: "open",
    subtopic: "Monitoring counter",
    difficulty: "hard",
    prompt:
      "A monitoring circuit has an input err that is high in every clock cycle in which an error is detected. It counts, in an 8-bit register cnt (also an output), the number of cycles in which err is high. When cnt **reaches** the 8-bit input limit, the output halt is asserted and the counter stops counting. The operator clears everything with the synchronous input clr. Write a Verilog module that implements this circuit; halt should be combinational. (15 marks)",
    modelAnswer:
      "```\nmodule errmon (input clk, clr, err,\n               input [7:0] limit,\n               output reg [7:0] cnt,\n               output halt);\n\nassign halt = (cnt >= limit);          // combinational\n\nalways @(posedge clk)\nbegin\n    if (clr)\n        cnt <= 8'd0;\n    else if (err && !halt)              // count only until halt\n        cnt <= cnt + 1'b1;\nend\n\nendmodule\n```\n'Reaches' means halt when cnt = limit; `>=` also covers the case where limit is lowered below the current count. halt is an `assign`, so it rises in the same cycle the count gets there and immediately stops the next increment.",
    rubric: [
      { point: "Ports: clk, clr, err, input [7:0] limit, output reg [7:0] cnt, output halt", marks: 3 },
      { point: "halt as a combinational assign comparing cnt with limit (== or >=)", marks: 3 },
      { point: "always @(posedge clk) with non-blocking assignments", marks: 3 },
      { point: "Synchronous clear has priority and sets cnt to 0", marks: 2 },
      { point: "Increment only when err = 1 and halt = 0", marks: 4 },
    ],
    solution: "Store only the count; derive halt combinationally from it and use !halt in the increment condition.",
    source: "Style: Tutorial 9 Q2",
  },
  {
    kind: "open",
    subtopic: "Pipelining",
    difficulty: "medium",
    prompt:
      "The combinational module below is to be converted into a synchronous module. Add a register after each combinational stage by rewriting the module using only a single synchronous always block. Make sure each output still corresponds to one set of inputs. (10 marks)",
    code: "module calc (input [7:0] a, b, c,\n             output reg [17:0] y);\nreg [8:0]  s;\nreg [16:0] p;\nalways @*\nbegin\n    s = a + b;\n    p = s * c;\n    y = p + 18'd5;\nend\nendmodule",
    modelAnswer:
      "```\nmodule calc_p (input clk,\n               input [7:0] a, b, c,\n               output reg [17:0] y);\nreg [8:0]  s;\nreg [7:0]  c1;      // c delayed to stay with its own a, b\nreg [16:0] p;\nalways @(posedge clk)\nbegin\n    s  <= a + b;      // stage 1 register\n    c1 <= c;\n    p  <= s * c1;     // stage 2 register\n    y  <= p + 18'd5;  // stage 3 register\nend\nendmodule\n```\nEvery `<=` becomes a register, so s, p and y are each one stage apart (latency 3). Without c1, `p <= s * c` would multiply the sum from the previous input set by the current c.",
    rubric: [
      { point: "clk added to the port list", marks: 1 },
      { point: "A single always @(posedge clk) block", marks: 2 },
      { point: "Non-blocking assignments throughout", marks: 2 },
      { point: "Registers s, p, y after each of the three stages, with correct widths", marks: 3 },
      { point: "c delayed by a register so it meets the matching a + b", marks: 2 },
    ],
    solution: "Change `always @*` to `always @(posedge clk)`, `=` to `<=`, and add a register for any input that joins a later stage.",
    source: "Style: Tutorial 9 Q1(b)",
  },
];
