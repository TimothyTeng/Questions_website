import type { Draft, Figure } from "@/lib/sc1005/types";

const DET11_CODE = `module det11 (input clk, rst, x, output reg z);
  localparam S0 = 2'b00, S1 = 2'b01, S2 = 2'b10;
  reg [1:0] st, nst;

  always @* begin
    nst = st;
    case (st)
      S0: if (x) nst = S1;
      S1: if (x) nst = S2; else nst = S0;
      S2: if (!x) nst = S0;
      default: nst = S0;
    endcase
  end

  always @(posedge clk)
    if (rst) begin
      st <= S0;
      z  <= 1'b0;
    end else begin
      st <= nst;
      z  <= (st == S2);
    end
endmodule`;

const ARM_FSM: Figure = {
  kind: "fsm",
  initial: "IDLE",
  caption: "Inputs a (arm) and t (trigger).",
  states: [
    { id: "IDLE", x: 0, y: 0 },
    { id: "ARM", x: 2, y: 0 },
    { id: "FIRE", x: 1, y: 1 },
  ],
  edges: [
    { from: "IDLE", to: "IDLE", label: "a'", loop: "top" },
    { from: "IDLE", to: "ARM", label: "a" },
    { from: "ARM", to: "IDLE", label: "t'a'" },
    { from: "ARM", to: "ARM", label: "t'a", loop: "top" },
    { from: "ARM", to: "FIRE", label: "t" },
    { from: "FIRE", to: "IDLE" },
  ],
};

const SHUTTLE_TABLE: Figure = {
  kind: "table",
  caption: "Table Q: next stop of the campus shuttle.",
  head: ["Current stop", "MOVE = 0", "MOVE = 1"],
  rows: [
    ["HALL", "LAB", "CAFE"],
    ["LAB", "LAB", "GYM"],
    ["GYM", "HALL", "CAFE"],
    ["CAFE", "CAFE", "HALL"],
  ],
};

export const fsmVerilogQuestions: Draft[] = [
  // 1
  {
    kind: "mcq",
    subtopic: "FSM template",
    difficulty: "easy",
    prompt: "In the three-block FSM coding style used in the course, which block should use **non-blocking** assignments (`<=`)?",
    options: [
      "None: an FSM must only use blocking assignments",
      "The next-state block, `always @*`",
      "The output `assign` statement",
      "All three blocks",
      "The state register block, `always @(posedge clk)`",
    ],
    answer: 4,
    solution:
      "Only the state register is clocked, and clocked (sequential) blocks use `<=` so that every register samples its input at the same instant (`st <= nst;`).\nThe `always @*` next-state block is combinational and uses blocking `=`; an `assign` has no `=`/`<=` choice at all.",
    source: "Style: Lecture 12 (FSM structure in Verilog)",
  },
  // 2
  {
    kind: "mcq",
    subtopic: "State encoding in Verilog",
    difficulty: "easy",
    prompt: "An FSM with six states is encoded in binary with `localparam S0 = 0, …, S5 = 5`. Which declaration of the current and next state signals is correct and as narrow as possible?",
    options: ["`reg [5:0] st, nst;`", "`reg [1:0] st, nst;`", "`reg [2:0] st, nst;`", "`wire [2:0] st, nst;`", "`reg st, nst;`"],
    answer: 2,
    solution:
      "Six states need $\\lceil \\log_2 6 \\rceil = 3$ bits, so `[2:0]`. Both signals are assigned inside `always` blocks, so they must be `reg` (not `wire`).\n`[1:0]` holds only 4 codes (S4 and S5 would be truncated); `[5:0]` is one-hot width, not the narrowest binary choice.",
    source: "Style: Lecture 12 (Verilog constants)",
  },
  // 3
  {
    kind: "mcq",
    subtopic: "Tracing FSM code",
    difficulty: "medium",
    prompt: "The module is reset (st = S0) and then x = 0, 1, 1, 0, 1, 0, 1, 1 is applied on eight successive rising edges. What is z after each of the eight edges?",
    code: `module m3 (input clk, rst, x, output z);
  localparam S0 = 2'b00, S1 = 2'b01, S2 = 2'b10, S3 = 2'b11;
  reg [1:0] st, nst;

  always @(posedge clk)
    if (rst) st <= S0;
    else     st <= nst;

  always @* begin
    nst = st;
    case (st)
      S0: nst = x ? S2 : S1;
      S1: if (x) nst = S3;
      S2: if (!x) nst = S0; else nst = S3;
      S3: nst = x ? S1 : S2;
    endcase
  end

  assign z = (st == S3);
endmodule`,
    options: ["0, 1, 0, 0, 1, 0, 1, 0", "0, 1, 0, 1, 1, 0, 1, 0", "1, 0, 1, 1, 0, 1, 0, 1", "0, 0, 1, 0, 0, 1, 0, 1", "0, 1, 1, 0, 1, 0, 1, 1"],
    answer: 0,
    solution:
      "Trace st edge by edge (z = 1 only in S3):\n- S0, x=0: `x ? S2 : S1` → S1 (z 0)\n- S1, x=1 → **S3** (z 1)\n- S3, x=1 → S1 (z 0)\n- S1, x=0: no assignment in the item, so the default `nst = st` keeps **S1** (z 0)\n- S1, x=1 → **S3** (z 1)\n- S3, x=0 → S2 (z 0)\n- S2, x=1 → **S3** (z 1)\n- S3, x=1 → S1 (z 0)\nz = 0, 1, 0, 0, 1, 0, 1, 0. Option D is the same trace read one edge late (z of the state before each edge). Option B forgets that S1 stays put on x = 0.",
    source: "Style: CE1005 Verilog FSM questions",
  },
  // 4
  {
    kind: "short",
    subtopic: "Tracing FSM code",
    difficulty: "medium",
    prompt: "After reset (st = S0), the input x = 1, 1, 1, 1, 0, 1, 1, 1, 0, 1 is applied, one value per clock cycle. Give the value of z **during** each of the ten cycles as a 10-bit string.",
    code: `module ones3 (input clk, rst, x, output reg z);
  localparam S0 = 2'd0, S1 = 2'd1, S2 = 2'd2;
  reg [1:0] st, nst;

  always @(posedge clk)
    if (rst) st <= S0;
    else     st <= nst;

  always @* begin
    nst = st; z = 1'b0;
    case (st)
      S0: if (x) nst = S1;
      S1: if (x) nst = S2; else nst = S0;
      S2: if (x) z = 1'b1; else nst = S0;
      default: nst = S0;
    endcase
  end
endmodule`,
    accept: ["0011000100", "0,0,1,1,0,0,0,1,0,0", "0, 0, 1, 1, 0, 0, 0, 1, 0, 0"],
    placeholder: "10 bits",
    solution:
      "z is set inside the combinational block from st **and** x, so it is a Mealy output: z = 1 in any cycle where st = S2 and x = 1.\nState during each cycle: S0, S1, S2, S2, S2, S0, S1, S2, S2, S0 (S2 stays on x = 1 because the item only sets z).\n- Cycle 3 (S2, x=1) and cycle 4 (S2, x=1): z = 1\n- Cycle 5 (S2, x=0): z = 0, go to S0\n- Cycle 8 (S2, x=1): z = 1; cycle 9 (S2, x=0): z = 0\nz = **0011000100**: a 111 detector that allows overlap.",
    source: "Style: Lecture 12 (outputs in the transition block)",
  },
  // 5
  {
    kind: "mcq",
    subtopic: "Common FSM bugs",
    difficulty: "medium",
    prompt: "What does synthesis infer from this next-state block, and why?",
    code: `always @* begin
  case (st)
    S0: if (go) nst = S1;
    S1: nst = S2;
    S2: if (done) nst = S0;
    default: nst = S0;
  endcase
end`,
    options: [
      "Pure combinational logic, because the block is `always @*`.",
      "A latch on nst, because nst is not assigned when st = S0 and go = 0, or st = S2 and done = 0.",
      "An extra flip-flop for nst, because nst keeps its value between clock edges.",
      "Nothing: the default item makes every path assign nst.",
      "A latch on st, because st is read but not assigned.",
    ],
    answer: 1,
    solution:
      "In a combinational block every output must be assigned on every path. Here `if (go)` and `if (done)` have no `else`, and there is no `nst = st;` at the top, so for S0 with go = 0 (and S2 with done = 0) nst must keep its previous value: synthesis builds a **latch**.\nThe `default` item only covers unlisted values of st, not the missing `else` branches. Fix: add `nst = st;` before the case (or `else nst = st;`).\nIt is not a flip-flop because there is no clock edge in the block; st is not assigned here at all, so nothing is inferred for it in this block.",
    source: "Style: Lecture 12 (notes on implementing FSMs)",
  },
  // 6
  {
    kind: "mcq",
    subtopic: "Blocking vs non-blocking",
    difficulty: "hard",
    prompt:
      "Version A of a clocked block is `st <= nst; z <= (st == S2);` and version B is `st = nst; z = (st == S2);` (both inside `always @(posedge clk)`, with the same next-state logic). How do the z outputs compare for the same input sequence?",
    options: [
      "They are identical: blocking and non-blocking give the same result in a clocked block.",
      "Version B's z is high in the same cycles that the FSM is in S2; version A's z is high one cycle later.",
      "Version A's z is high in the same cycles that the FSM is in S2; version B's z is high one cycle later.",
      "Version B does not compile, because blocking assignments are not allowed in clocked blocks.",
      "Version B infers a latch for z.",
    ],
    answer: 1,
    solution:
      "Non-blocking (A): both right-hand sides are evaluated before either register updates, so z reads the **old** st: z during cycle k+1 = (st during cycle k == S2), i.e. one cycle late.\nBlocking (B): `st = nst` happens first and `z = (st == S2)` reads the **new** st, so z is 1 exactly while the FSM is in S2 (same timing as `assign z = (st == S2)`, but registered).\nB compiles and z is still a flip-flop; the problem is that the behaviour depends on statement order, which is why clocked blocks should use `<=`.",
    source: "Style: CE1005 blocking vs non-blocking questions",
  },
  // 7
  {
    kind: "mcq",
    subtopic: "Common FSM bugs",
    difficulty: "medium",
    prompt: "The next-state block of an FSM is written as `always @(st) begin nst = st; case (st) … endcase end`, and the case items test the input x. What is the consequence?",
    options: [
      "None: the sensitivity list of a combinational block only needs the state.",
      "Synthesis infers flip-flops for nst.",
      "In simulation nst is not recomputed when only x changes, so simulation can disagree with the synthesised hardware; `always @*` fixes it.",
      "The FSM becomes a Mealy machine.",
      "The code will not compile because x is read but not listed.",
    ],
    answer: 2,
    solution:
      "A simulator runs the block only when a listed signal changes. A change of x alone (st unchanged) does not wake it, so nst keeps a value computed from an old x. Synthesis tools ignore the list (usually with a warning) and build the full combinational function, so the hardware behaves differently from the simulation.\nThe code compiles, nothing becomes a flip-flop, and Moore/Mealy depends on the output logic, not on this list. Use `always @*`.",
    source: "Style: Lecture 8B/12 (combinational always blocks)",
  },
  // 8
  {
    kind: "mcq",
    subtopic: "Unreachable states",
    difficulty: "hard",
    prompt: "The FSM is always reset to IDLE before use. Which state can never be entered during normal operation?",
    code: `localparam IDLE = 3'd0, A = 3'd1, B = 3'd2, C = 3'd3, ERR = 3'd4;
reg [2:0] st, nst;

always @(posedge clk)
  if (rst) st <= IDLE; else st <= nst;

always @* begin
  nst = st;
  case (st)
    IDLE: if (start) nst = A;
    A:    nst = go ? B : IDLE;
    B:    if (go) nst = C; else nst = A;
    C:    nst = IDLE;
    ERR:  nst = IDLE;
    default: nst = ERR;
  endcase
end`,
    options: ["A", "B", "C", "ERR", "None: every state is reachable"],
    answer: 3,
    solution:
      "From IDLE: start → A; A with go → B; B with go → C; C → IDLE. So A, B and C are reachable.\nERR is only entered through the `default` item, i.e. from the unused codes 5, 6, 7, which the reset prevents. No case item for a valid state assigns `nst = ERR`, so after reset ERR is **unreachable** (it is a deliberate recovery state for corrupted codes, not part of normal operation).",
    source: "Original",
  },
  // 9
  {
    kind: "short",
    subtopic: "Next-state logic with assign",
    difficulty: "hard",
    prompt:
      "Tutorial 10 machine (z turns on after two consecutive 1s and off after two consecutive 0s) with states A = 00, B = 01, C = 10, D = 11 held in `reg s1, s0;`. Using **assign statements only** for the next-state logic, what is the minimal right-hand side of `assign n1 = …;`? (Boolean notation such as `s0x + s1s0'` or Verilog operators are both accepted.)",
    figures: [
      {
        kind: "fsm",
        initial: "A",
        states: [
          { id: "A", label: "A/0", x: 0, y: 0 },
          { id: "B", label: "B/0", x: 2, y: 0 },
          { id: "C", label: "C/1", x: 2, y: 1 },
          { id: "D", label: "D/1", x: 0, y: 1 },
        ],
        edges: [
          { from: "A", to: "A", label: "0", loop: "top" },
          { from: "A", to: "B", label: "1" },
          { from: "B", to: "A", label: "0" },
          { from: "B", to: "C", label: "1" },
          { from: "C", to: "C", label: "1", loop: "right" },
          { from: "C", to: "D", label: "0" },
          { from: "D", to: "C", label: "1" },
          { from: "D", to: "A", label: "0" },
        ],
      },
    ],
    accept: ["s0x + s1s0'", "s0&x | s1&~s0", "(s0 & x) | (s1 & ~s0)", "s1s0' + s0x"],
    match: "expr",
    vars: ["s1", "s0", "x"],
    minimal: true,
    placeholder: "e.g. s1 & ~x | s0",
    solution:
      "Encoded transitions (s1s0, x → n1n0): A 00: 0→00, 1→01; B 01: 0→00, 1→10; C 10: 0→11, 1→10; D 11: 0→00, 1→10.\nn1 = 1 for (01,1), (10,0), (10,1), (11,1) = minterms 3, 4, 5, 7 of (s1, s0, x).\nK-map: 4 and 5 form $s_1s_0'$; 3 and 7 form $s_0x$. So `assign n1 = (s0 & x) | (s1 & ~s0);`\n(For completeness: `assign n0 = (~s1 & ~s0 & x) | (s1 & ~s0 & ~x);` and `assign z = s1;`.)",
    solutionFigures: [{ kind: "kmap", vars: ["s1", "s0", "x"], values: "00011101", groups: ["s1s0'", "s0x"], showIndex: true, caption: "n1 = s0x + s1s0'" }],
    source: "Style: Tutorial 10 Q1(b)",
  },
  // 10
  {
    kind: "open",
    subtopic: "Writing FSM modules",
    difficulty: "hard",
    prompt:
      "A campus shuttle visits four stops. A 1-bit input MOVE, sent from the control room, chooses the next stop at each clock edge according to Table Q. The 2-bit output LOC shows the current stop (HALL = 00, LAB = 01, GYM = 10, CAFE = 11). The shuttle starts at HALL.\n(a) Draw the state diagram. (4 marks)\n(b) Give the shortest MOVE sequence that visits each other stop exactly once and returns to HALL. (2 marks)\n(c) Write a Verilog module `shuttle` with inputs MOVE, RESET, CLK and output LOC; RESET (synchronous, active-high) returns the shuttle to HALL. (8 marks)",
    figures: [SHUTTLE_TABLE],
    modelAnswer:
      "(a) Four states HALL, LAB, GYM, CAFE (Moore, LOC = state code). Arrows: HALL 0→LAB, 1→CAFE; LAB 0→LAB (self-loop), 1→GYM; GYM 0→HALL, 1→CAFE; CAFE 0→CAFE (self-loop), 1→HALL.\n(b) **0, 1, 1, 1**: HALL → LAB → GYM → CAFE → HALL. (Starting with 1 goes to CAFE, from which the only exit returns to HALL.)\n(c)\n```\nmodule shuttle (input MOVE, RESET, CLK, output [1:0] LOC);\n  localparam HALL = 2'b00, LAB = 2'b01, GYM = 2'b10, CAFE = 2'b11;\n  reg [1:0] st, nst;\n\n  always @(posedge CLK)\n    if (RESET) st <= HALL;\n    else       st <= nst;\n\n  always @* begin\n    nst = st;\n    case (st)\n      HALL: nst = MOVE ? CAFE : LAB;\n      LAB:  if (MOVE) nst = GYM;\n      GYM:  nst = MOVE ? CAFE : HALL;\n      CAFE: if (MOVE) nst = HALL;\n      default: nst = HALL;\n    endcase\n  end\n\n  assign LOC = st;\nendmodule\n```",
    modelFigures: [
      {
        kind: "fsm",
        initial: "HALL",
        states: [
          { id: "HALL", x: 0, y: 0 },
          { id: "LAB", x: 2, y: 0 },
          { id: "GYM", x: 2, y: 1 },
          { id: "CAFE", x: 0, y: 1 },
        ],
        edges: [
          { from: "HALL", to: "LAB", label: "0" },
          { from: "HALL", to: "CAFE", label: "1" },
          { from: "LAB", to: "LAB", label: "0", loop: "right" },
          { from: "LAB", to: "GYM", label: "1" },
          { from: "GYM", to: "HALL", label: "0" },
          { from: "GYM", to: "CAFE", label: "1" },
          { from: "CAFE", to: "CAFE", label: "0", loop: "bottom" },
          { from: "CAFE", to: "HALL", label: "1" },
        ],
      },
    ],
    rubric: [
      { point: "Diagram: four states, all eight arrows correct (self-loops at LAB and CAFE)", marks: 4 },
      { point: "Sequence 0, 1, 1, 1 with the path", marks: 2 },
      { point: "Port list, localparam codes and 2-bit st/nst declared as reg", marks: 2 },
      { point: "State register with synchronous reset to HALL using <=", marks: 2 },
      { point: "always @* next-state case with a default/stay assignment, all transitions correct", marks: 3 },
      { point: "LOC driven from the state (Moore)", marks: 1 },
    ],
    solution: "See the model answer. Because LOC is just the state code, the output logic is `assign LOC = st;`.",
    source: "Style: CE1005 2017-18 S2 Q4(a)",
  },
  // 11
  {
    kind: "open",
    subtopic: "Writing FSM modules",
    difficulty: "hard",
    prompt:
      "A vending machine sells a snack costing 100 cents and accepts only 50-cent (input `fifty`) and 100-cent (input `dollar`) coins, at most one per clock cycle. If 50 cents is followed by a 100-cent coin, the transaction is rejected and all money returned. Outputs: `insert_coin`, `dispense`, `reject_money`.\n(a) Sketch the Moore state diagram using states READY, FIFTY, DISPENSE and REJECT; reset puts the FSM in READY with outputs {insert_coin, dispense, reject_money} = {1, 0, 0}. (5 marks)\n(b) Write the Verilog module using an **active-low asynchronous** reset `rst_n`, with separate always blocks for the state register, the next-state logic and the output logic. (12 marks)",
    modelAnswer:
      "(a) READY {1,0,0}: dollar → DISPENSE, fifty → FIFTY, no coin → stay. FIFTY {1,0,0}: fifty → DISPENSE, dollar → REJECT, no coin → stay. DISPENSE {0,1,0} → READY. REJECT {0,0,1} → READY.\n(b)\n```\nmodule snack (input clk, rst_n, fifty, dollar,\n              output reg insert_coin, dispense, reject_money);\n  localparam READY = 2'd0, FIFTY = 2'd1, DISP = 2'd2, REJ = 2'd3;\n  reg [1:0] st, nst;\n\n  always @(posedge clk or negedge rst_n)      // state register\n    if (!rst_n) st <= READY;\n    else        st <= nst;\n\n  always @* begin                              // next state\n    nst = st;\n    case (st)\n      READY: if (dollar) nst = DISP; else if (fifty) nst = FIFTY;\n      FIFTY: if (dollar) nst = REJ;  else if (fifty) nst = DISP;\n      DISP:  nst = READY;\n      REJ:   nst = READY;\n      default: nst = READY;\n    endcase\n  end\n\n  always @* begin                              // Moore outputs\n    insert_coin = 1'b0; dispense = 1'b0; reject_money = 1'b0;\n    case (st)\n      READY, FIFTY: insert_coin  = 1'b1;\n      DISP:         dispense     = 1'b1;\n      REJ:          reject_money = 1'b1;\n    endcase\n  end\nendmodule\n```",
    modelFigures: [
      {
        kind: "fsm",
        initial: "READY",
        caption: "Outputs {insert_coin, dispense, reject_money} in each state.",
        states: [
          { id: "READY", label: "READY", x: 0, y: 0 },
          { id: "FIFTY", label: "FIFTY", x: 2, y: 0 },
          { id: "DISP", label: "DISP", x: 0, y: 1 },
          { id: "REJ", label: "REJ", x: 2, y: 1 },
        ],
        edges: [
          { from: "READY", to: "READY", label: "none", loop: "top" },
          { from: "READY", to: "FIFTY", label: "fifty" },
          { from: "READY", to: "DISP", label: "dollar" },
          { from: "FIFTY", to: "FIFTY", label: "none", loop: "top" },
          { from: "FIFTY", to: "DISP", label: "fifty" },
          { from: "FIFTY", to: "REJ", label: "dollar" },
          { from: "DISP", to: "READY", bend: 0.35 },
          { from: "REJ", to: "READY" },
        ],
      },
    ],
    rubric: [
      { point: "Diagram: four states with outputs 100, 100, 010, 001", marks: 2 },
      { point: "Diagram: coin transitions correct, including FIFTY + dollar → REJECT, and returns to READY", marks: 3 },
      { point: "Ports, localparams, 2-bit st/nst and output regs", marks: 2 },
      { point: "State register: `always @(posedge clk or negedge rst_n)` with `if (!rst_n)` and `<=`", marks: 3 },
      { point: "Next-state always @* with default assignment, correct case items and default", marks: 4 },
      { point: "Separate output block with defaults for all three outputs (no latches)", marks: 3 },
    ],
    solution: "See the model answer. The asynchronous reset needs the reset edge in the event list and must be tested first.",
    source: "Style: CE1005 2016-17 S1 Q4(b)",
  },
  // 12
  {
    kind: "open",
    subtopic: "Writing FSM modules",
    difficulty: "medium",
    prompt:
      "A variant of Tutorial 10: output z becomes 1 from the **second** consecutive 1 input, and returns to 0 only after **three** consecutive 0 inputs.\n(a) Draw the Moore state diagram. (4 marks)\n(b) Write the Verilog module with a synchronous active-high reset, a combinational always block with a case statement for the next state, and an assign for z. (8 marks)\n(c) Give z after each edge for x = 1, 1, 0, 0, 1, 0, 0, 0, 1, 1 starting from reset. (3 marks)",
    modelAnswer:
      "(a) Five states: A (off, last input 0), B (off, one 1), C (on), D (on, one 0), E (on, two 0s); z = 1 in C, D, E. A: 1→B, 0→A. B: 1→C, 0→A. C: 1→C, 0→D. D: 1→C, 0→E. E: 1→C, 0→A.\n(b)\n```\nmodule on2off3 (input clk, rst, x, output z);\n  localparam A = 3'd0, B = 3'd1, C = 3'd2, D = 3'd3, E = 3'd4;\n  reg [2:0] st, nst;\n\n  always @(posedge clk)\n    if (rst) st <= A;\n    else     st <= nst;\n\n  always @* begin\n    nst = st;\n    case (st)\n      A: if (x) nst = B;\n      B: nst = x ? C : A;\n      C: if (!x) nst = D;\n      D: nst = x ? C : E;\n      E: nst = x ? C : A;\n      default: nst = A;\n    endcase\n  end\n\n  assign z = (st == C) | (st == D) | (st == E);\nendmodule\n```\n(c) States B, C, D, E, C, D, E, A, B, C → z = 0, 1, 1, 1, 1, 1, 1, 0, 0, 1.",
    rubric: [
      { point: "Five states with correct meanings and outputs", marks: 2 },
      { point: "All ten transitions correct", marks: 2 },
      { point: "3-bit state registers and localparams", marks: 1 },
      { point: "State register with synchronous reset using <=", marks: 2 },
      { point: "Next-state case with default assignment and default item", marks: 4 },
      { point: "Moore output assign", marks: 1 },
      { point: "Trace z = 0111111001", marks: 3 },
    ],
    solution: "See the model answer. Compared with Tutorial 10, one extra \"on\" state is needed to count the second 0.",
    source: "Style: Tutorial 10 Q1",
  },
  // 13
  {
    kind: "mcq",
    subtopic: "Reset",
    difficulty: "medium",
    prompt: "Which state register has an **active-low asynchronous** reset `rst_n`?",
    options: [
      "always @(posedge clk or negedge rst_n)\n  if (!rst_n) st <= IDLE;\n  else        st <= nst;",
      "always @(posedge clk)\n  if (!rst_n) st <= IDLE;\n  else        st <= nst;",
      "always @(posedge clk or posedge rst_n)\n  if (!rst_n) st <= IDLE;\n  else        st <= nst;",
      "always @(posedge clk or negedge rst_n)\n  if (rst_n) st <= IDLE;\n  else       st <= nst;",
      "always @*\n  if (!rst_n) st = IDLE;\n  else        st = nst;",
    ],
    answer: 0,
    solution:
      "Asynchronous: the reset edge must be in the event list so the block runs when reset is asserted, not only on clock edges. Active-low: it is asserted when rst_n **falls**, so `negedge rst_n`, and the test is `if (!rst_n)`.\n- B is a synchronous active-low reset.\n- C wakes on the wrong edge (rising rst_n = release).\n- D resets while rst_n = 1, i.e. during normal operation.\n- E is combinational: st would not be a register at all.",
    source: "Style: CE1005 2016-17 S1 Q4(b)(ii)",
  },
  // 14
  {
    kind: "mcq",
    subtopic: "Moore vs Mealy in code",
    difficulty: "easy",
    prompt: "An FSM's output is written `assign z = (st == S2) & x;` where x is a module input. What kind of machine is it?",
    options: [
      "Moore, because z is a continuous assignment outside the always blocks",
      "Mealy, because z depends on the input x as well as the state",
      "Moore, because st is a register",
      "Mealy, because it uses the == operator",
      "Neither: z is a registered output",
    ],
    answer: 1,
    solution:
      "A Moore output depends only on the state; a Mealy output also depends on the present inputs. Here z uses x directly, so it can change mid-cycle whenever x changes: **Mealy**.\nWhether the output is an `assign` or inside an always block does not decide the type, and nothing here is registered.",
    source: "Style: CE1005 2016-17 S2 Q4(c)(i)",
  },
  // 15
  {
    kind: "mcq",
    subtopic: "Registered outputs",
    difficulty: "hard",
    prompt: "The module is reset, then x = 1, 1, 1, 0, 1, 1 is applied on six successive rising edges. What is z after each of the six edges?",
    code: DET11_CODE,
    options: ["0, 1, 1, 0, 0, 1", "0, 0, 1, 1, 0, 0", "0, 0, 1, 1, 0, 1", "1, 1, 1, 0, 1, 1", "0, 1, 1, 1, 0, 1"],
    answer: 1,
    solution:
      "States after each edge: S1, S2, S2, S0, S1, S2.\nBut z is registered: `z <= (st == S2)` reads st **before** the edge (non-blocking), so z after edge k = (state before edge k == S2). States before the edges: S0, S1, S2, S2, S0, S1 → z = 0, 0, 1, 1, 0, 0.\nOption A is the combinational `assign z = (st == S2)` answer, one cycle early. To keep a registered output without the delay, use `z <= (nst == S2)`.",
    source: "Original",
  },
  // 16
  {
    kind: "short",
    subtopic: "Tracing FSM code",
    difficulty: "medium",
    prompt: "The one-hot FSM below is reset to IDLE. Five clock edges occur with (go, stop) = (1,0), (0,0), (0,1), (1,0), (1,1). What is the 4-bit value of st after the fifth edge?",
    code: `localparam IDLE = 4'b0001, RUN = 4'b0010, PAUSE = 4'b0100, DONE = 4'b1000;
reg [3:0] st, nst;

always @(posedge clk)
  if (rst) st <= IDLE; else st <= nst;

always @* begin
  nst = st;
  case (st)
    IDLE:  if (go) nst = RUN;
    RUN:   if (stop) nst = DONE; else if (!go) nst = PAUSE;
    PAUSE: if (go) nst = RUN;
    DONE:  nst = IDLE;
    default: nst = IDLE;
  endcase
end`,
    accept: ["1000", "4'b1000"],
    placeholder: "4 bits",
    solution:
      "- (1,0): IDLE, go → RUN\n- (0,0): RUN, stop = 0, go = 0 → PAUSE\n- (0,1): PAUSE only looks at go; go = 0 → stay PAUSE (stop is ignored here)\n- (1,0): PAUSE, go → RUN\n- (1,1): RUN, stop has priority → DONE\nst = DONE = **1000**.",
    source: "Original",
  },
  // 17
  {
    kind: "mcq",
    subtopic: "Next-state logic",
    difficulty: "easy",
    prompt: "What is the purpose of the line `nst = st;` at the top of the `always @*` next-state block?",
    options: [
      "It copies the state into a flip-flop so it can be compared later.",
      "It delays the next state by one clock cycle.",
      "It resets the FSM at the start of every clock cycle.",
      "It is required by Verilog syntax before a case statement.",
      "It makes the FSM stay in the current state unless a case item assigns a different next state, and guarantees nst is assigned on every path (no latch).",
    ],
    answer: 4,
    solution:
      "The lecture: \"A default at the top says that if no assignment is made, we stay in the current state.\" Because the block is combinational, the default also ensures nst gets a value on every path, so no latch is inferred, and only arrows that leave a state need code.\nIt is not a flip-flop, not a reset, not required syntax, and adds no delay.",
    source: "Style: Lecture 12 (notes on implementing FSMs)",
  },
  // 18
  {
    kind: "mcq",
    subtopic: "Output logic",
    difficulty: "medium",
    prompt: "With `parameter red2 = 3'b101;` and `reg [2:0] st;`, what hardware does `assign u = (st == red2);` describe?",
    options: [
      "A 3-bit register loaded with 101",
      "A 3-input OR gate: `u = st[2] | ~st[1] | st[0]`",
      "A flip-flop that stores whether st was red2",
      "A 3-input AND gate: `u = st[2] & ~st[1] & st[0]`, a Moore output",
      "An XOR of the state bits: `u = st[2] ^ st[1] ^ st[0]`",
    ],
    answer: 3,
    solution:
      "Comparing a register with a constant is 1 only for that one code, 101: a single minterm, $u = s_2 s_1' s_0$, i.e. an AND gate with st[1] inverted. It depends only on the state, so it is a Moore output (the lecture's door lock).\nThe XOR is 1 for 101 but also for 001, 010 and 111.",
    source: "Style: Lecture 12 (seqdet example)",
  },
  // 19
  {
    kind: "short",
    subtopic: "Next-state logic with assign",
    difficulty: "hard",
    prompt: "The lecture's `pulse3` module is reset (s1s0 = 00). Then b = 0, 1, 1, 1, 1, 1, 0, 1 is applied on eight successive rising edges. Give x after each edge as an 8-bit string.",
    code: `module pulse3 (input b, input clk, rst, output x);
  wire n1, n0;
  reg  s1, s0;
  assign n1 = s1 ^ s0;
  assign n0 = (~s1 & ~s0 & b) | (s1 & ~s0);
  assign x  = s1 | s0;
  always @(posedge clk)
    if (rst) begin s1 <= 1'b0; s0 <= 1'b0; end
    else     begin s1 <= n1;   s0 <= n0;   end
endmodule`,
    accept: ["01110111", "0,1,1,1,0,1,1,1", "0, 1, 1, 1, 0, 1, 1, 1"],
    placeholder: "8 bits",
    solution:
      "Evaluate n1n0 from the current s1s0 and b at each edge:\n- 00, b=0: n1 = 0, n0 = 0 → 00, x 0\n- 00, b=1: n0 = 1 → 01, x 1\n- 01: n1 = 1, n0 = 0 → 10, x 1 (b ignored)\n- 10: n1 = 1, n0 = 1 → 11, x 1\n- 11: n1 = 0, n0 = 0 → 00, x **0** (the pulse ends even though b = 1)\n- 00, b=1 → 01, x 1; 01 → 10, x 1; 10 → 11, x 1\nx = **01110111**. A held-high b retriggers the pulse after one low cycle.",
    source: "Style: Lecture 12 (pulse3 example)",
  },
  // 20
  {
    kind: "mcq",
    subtopic: "Common FSM bugs",
    difficulty: "medium",
    prompt: "A 5-state FSM is declared with `localparam S0 = 3'd0, S1 = 3'd1, S2 = 3'd2, S3 = 3'd3, S4 = 3'd4;` but `reg [1:0] st, nst;`. What happens when the next-state logic executes `nst = S4;`?",
    options: [
      "The simulator extends st to 3 bits automatically.",
      "nst becomes 2'b11, so the FSM goes to S3.",
      "nst becomes 2'b00, so the FSM goes to S0 instead of S4, and the case item for S4 can never match.",
      "Compilation fails because the widths differ.",
      "nst becomes x (unknown).",
    ],
    answer: 2,
    solution:
      "S4 = 3'b100. Assigning it to a 2-bit reg keeps only the low 2 bits: 2'b00, the code of S0. So every arrow into S4 actually goes to S0, and the case item `S4:` compares st, zero-extended to 3'b0xx, with 3'b100, which can never match. Verilog silently truncates (at most a warning), so the bug compiles. 5 states need `reg [2:0]`.",
    source: "Original",
  },
  // 21
  {
    kind: "mcq",
    subtopic: "Unused states",
    difficulty: "medium",
    prompt:
      "An FSM uses `reg [1:0] st, nst;` for three states S0 = 00, S1 = 01, S2 = 10. Its next-state block starts with `nst = st;` and has case items for S0, S1 and S2 only (no `default`). The register has **no reset**, and at power-up it holds 11. What happens?",
    options: [
      "It goes to S0 at the first clock edge.",
      "It stays in 11 forever, whatever the inputs (lock-up).",
      "It behaves like S2, because 11 is closest to 10.",
      "The case statement raises an error at run time.",
      "It moves to a random valid state at the first edge.",
    ],
    answer: 1,
    solution:
      "With st = 11 no case item matches, so only `nst = st;` executes: nst = 11. Every clock edge loads 11 again, so the machine is **locked up** in the unused code.\nFixes: a `default: nst = S0;` item (recovers after one edge) and a reset in the state register (never starts there).",
    source: "Style: Lecture 12 (reset in state machines)",
  },
  // 22
  {
    kind: "short",
    subtopic: "Tracing FSM code",
    difficulty: "medium",
    prompt:
      "The vending module is reset to IDLE. One coin (or none) arrives per clock cycle, in this order: 50, 100, none, 100, 100, 50, 50, 50, 50, none (50 means c50 = 1, 100 means c100 = 1). In how many cycles is vend = 1?",
    code: `localparam IDLE = 2'd0, C50 = 2'd1, C100 = 2'd2, VEND = 2'd3;   // price 150c
reg [1:0] st, nst;

always @(posedge clk or negedge rst_n)
  if (!rst_n) st <= IDLE; else st <= nst;

always @* begin
  nst = st;
  case (st)
    IDLE: if (c100) nst = C100; else if (c50) nst = C50;
    C50:  if (c100) nst = VEND; else if (c50) nst = C100;
    C100: if (c50 | c100) nst = VEND;
    VEND: nst = IDLE;
  endcase
end

assign vend = (st == VEND);`,
    accept: ["3"],
    match: "number",
    solution:
      "States after each edge:\n- 50 → C50; 100 → **VEND**; none → IDLE (VEND always returns)\n- 100 → C100; 100 → **VEND**; 50 → IDLE (the coin inserted while in VEND is ignored: lost!)\n- 50 → C50; 50 → C100; 50 → **VEND**; none → IDLE\nvend = 1 in **3** cycles. The sixth coin is swallowed because the VEND item never looks at c50/c100, a specification bug the trace exposes.",
    source: "Style: Lecture 11/12 (vending machine)",
  },
  // 23
  {
    kind: "mcq",
    subtopic: "Writing FSM modules",
    difficulty: "hard",
    prompt: "Each option is the body of `case (st)` in an `always @*` block that begins with `nst = st;`. Which one implements the state diagram exactly?",
    figures: [ARM_FSM],
    options: [
      "IDLE: if (a) nst = ARM;\nARM:  if (t) nst = FIRE; else if (!a) nst = IDLE;\nFIRE: nst = IDLE;",
      "IDLE: if (a) nst = ARM;\nARM:  if (!a) nst = IDLE; else if (t) nst = FIRE;\nFIRE: nst = IDLE;",
      "IDLE: if (a) nst = ARM;\nARM:  if (t) nst = FIRE; else if (!a) nst = IDLE;\nFIRE: if (a) nst = IDLE;",
      "IDLE: if (a) nst = ARM; else nst = FIRE;\nARM:  if (t) nst = FIRE; else if (!a) nst = IDLE;\nFIRE: nst = IDLE;",
      "IDLE: if (a) nst = ARM;\nARM:  if (t) nst = FIRE; else nst = IDLE;\nFIRE: nst = IDLE;",
    ],
    answer: 0,
    solution:
      "Check each arrow against the diagram (ARM: t → FIRE; t'a' → IDLE; t'a → stay):\n- A matches every arrow (staying is handled by `nst = st;`).\n- B tests a first: with a = 0, t = 1 it goes to IDLE, but the diagram says FIRE.\n- C stays in FIRE when a = 0; FIRE should return to IDLE unconditionally.\n- D leaves IDLE for FIRE when a = 0; the diagram stays in IDLE.\n- E leaves ARM when a = 1, t = 0; the diagram stays in ARM.",
    source: "Original",
  },
  // 24
  {
    kind: "short",
    subtopic: "Tracing FSM code",
    difficulty: "medium",
    prompt: "The detector below is reset to S0, then x = 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0 is applied on eleven rising edges. Give z after each edge as an 11-bit string.",
    code: `localparam S0 = 2'd0, S1 = 2'd1, S2 = 2'd2, S3 = 2'd3;
reg [1:0] st, nst;

always @(posedge clk)
  if (rst) st <= S0; else st <= nst;

always @* begin
  nst = st;
  case (st)
    S0: if (x) nst = S1;
    S1: nst = x ? S2 : S0;
    S2: if (!x) nst = S3;
    S3: nst = x ? S1 : S0;
  endcase
end

assign z = (st == S3);`,
    accept: ["00100010001", "0,0,1,0,0,0,1,0,0,0,1", "0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1"],
    placeholder: "11 bits",
    solution:
      "This is a Moore detector for 110 (S1: seen 1, S2: seen 11, S3: 110 detected, z = 1). S2 stays in S2 on further 1s, so 1110 is still detected.\nStates after each edge: S1, S2, **S3**, S1, S2, S2, **S3**, S0, S1, S2, **S3**.\nz = **00100010001**.",
    source: "Original",
  },
  // 25
  {
    kind: "mcq",
    subtopic: "State encoding in Verilog",
    difficulty: "easy",
    prompt: "Why might state codes be declared with `localparam` rather than `parameter`?",
    options: [
      "localparam makes the encoding one-hot automatically.",
      "localparam creates flip-flops while parameter creates wires.",
      "Only localparam can be used as a case item.",
      "parameter values are evaluated at run time and slow the simulation.",
      "localparam values cannot be overridden when the module is instantiated, so the state encoding cannot be changed from outside by mistake.",
    ],
    answer: 4,
    solution:
      "Both declare named constants usable anywhere a constant is (including case items). A `parameter` can be overridden per instance (`#(.W(8))`), which is right for things like a counter width but not for internal state codes. A `localparam` cannot be overridden. Neither creates hardware by itself or chooses the encoding.",
    source: "Style: Lecture 12 (Verilog constants)",
  },
  // 26
  {
    kind: "short",
    subtopic: "Hardware inferred",
    difficulty: "medium",
    prompt: "How many flip-flops does synthesis infer for this module?",
    code: `module ctl (input clk, rst, go, output reg done, output busy);
  localparam IDLE = 3'd0, LOAD = 3'd1, RUN = 3'd2, WAIT = 3'd3, FIN = 3'd4;
  reg [2:0] st, nst;
  reg [3:0] cnt;

  always @(posedge clk)
    if (rst) begin st <= IDLE; cnt <= 4'd0; done <= 1'b0; end
    else begin
      st   <= nst;
      cnt  <= (st == RUN) ? cnt + 1'b1 : 4'd0;
      done <= (st == FIN);
    end

  always @* begin
    nst = st;
    case (st)
      IDLE: if (go) nst = LOAD;
      LOAD: nst = RUN;
      RUN:  if (cnt == 4'd9) nst = WAIT;
      WAIT: nst = FIN;
      FIN:  nst = IDLE;
      default: nst = IDLE;
    endcase
  end

  assign busy = (st != IDLE);
endmodule`,
    accept: ["8"],
    match: "number",
    solution:
      "Flip-flops come only from signals assigned in the clocked block: st (3 bits), cnt (4 bits) and done (1 bit) = **8**.\nnst is a `reg` but is assigned in `always @*` with a value on every path, so it is combinational; busy is an `assign`.",
    source: "Original",
  },
  // 27
  {
    kind: "mcq",
    subtopic: "Reset",
    difficulty: "medium",
    prompt: "The state register is `always @(posedge clk or posedge rst) if (rst) st <= IDLE; else st <= nst;`. rst rises in the middle of a clock cycle while st = S3, as in the waveform. When does st become IDLE?",
    figures: [
      {
        kind: "wave",
        ticks: ["0", "", "1", "", "2", "", "3", ""],
        signals: [
          { name: "clk", wave: "10101010" },
          { name: "rst", wave: "00000110" },
        ],
      },
    ],
    options: [
      "Only when rst falls again.",
      "At the next rising clock edge after rst rises (start of cycle 3).",
      "At the next falling clock edge.",
      "Immediately when rst rises (mid-cycle 2).",
      "Never: rst must be high at a clock edge for two cycles.",
    ],
    answer: 3,
    solution:
      "`posedge rst` is in the event list, so the block runs as soon as rst rises, and the first statement `if (rst) st <= IDLE;` executes at once: an **asynchronous** reset. With only `@(posedge clk)` (synchronous reset) st would change at the start of cycle 3.",
    source: "Style: CE1005 asynchronous reset questions",
  },
  // 28
  {
    kind: "mcq",
    subtopic: "Common FSM bugs",
    difficulty: "hard",
    prompt: "A student writes the next-state logic in a clocked block, as below, keeping the usual state register `always @(posedge clk) if (rst) st <= S0; else st <= nst;`. What is the effect?",
    code: `always @(posedge clk)       // next-state logic?
  case (st)
    S0: nst <= x ? S1 : S0;
    S1: nst <= x ? S2 : S0;
    S2: nst <= x ? S2 : S0;
  endcase`,
    options: [
      "None: the FSM behaves exactly as with `always @*`.",
      "A latch is inferred for nst.",
      "nst becomes a second register, so st is loaded with a next state computed one cycle earlier: the FSM reacts a cycle late and no longer follows the diagram.",
      "It does not compile, because nst may only be assigned with `=`.",
      "st and nst swap values at every edge, so the FSM alternates between two states.",
    ],
    answer: 2,
    solution:
      "Everything assigned in `always @(posedge clk)` is a flip-flop, so nst is now registered: at each edge nst is computed from the **old** st and x, while st simultaneously takes the **old** nst. Hence $st_{k+2} = f(st_k, x_k)$: each decision reaches the state register one cycle late and the transitions interleave, so the FSM does not implement the diagram.\nIt compiles, infers flip-flops rather than latches, and is clearly not equivalent.",
    source: "Original",
  },
  // 29
  {
    kind: "mcq",
    subtopic: "Controllers",
    difficulty: "medium",
    prompt: "The traffic-light controller below is reset to NS_G. Then car = 0, 1, 0, 0, 0 is applied on five rising edges. Which lights are on after the fifth edge?",
    code: `localparam NS_G = 3'd0, NS_Y = 3'd1, EW_G1 = 3'd2, EW_G2 = 3'd3, EW_Y = 3'd4;
always @* begin
  nst = st;
  case (st)
    NS_G:  if (car) nst = NS_Y;
    NS_Y:  nst = EW_G1;
    EW_G1: nst = EW_G2;
    EW_G2: nst = EW_Y;
    EW_Y:  nst = NS_G;
    default: nst = NS_G;
  endcase
end
always @* begin
  ns = RED; ew = RED;
  case (st)
    NS_G:         ns = GRN;
    NS_Y:         ns = YEL;
    EW_G1, EW_G2: ew = GRN;
    EW_Y:         ew = YEL;
  endcase
end`,
    options: ["NS green, EW red", "NS yellow, EW red", "NS red, EW green", "NS red, EW yellow", "NS red, EW red"],
    answer: 3,
    solution:
      "- Edge 1 (car 0): stay NS_G\n- Edge 2 (car 1): → NS_Y\n- Edge 3: → EW_G1 (unconditional, car ignored)\n- Edge 4: → EW_G2\n- Edge 5: → EW_Y\nIn EW_Y the output block leaves ns at its default RED and sets ew = YEL: **NS red, EW yellow**.",
    source: "Original",
  },
  // 30
  {
    kind: "short",
    subtopic: "Tracing FSM code",
    difficulty: "medium",
    prompt: "A special up/down counter never goes below 2 or above 9. R = 1 loads 5. After R loads 5, R = 0 and U = 1, 1, 1, 1, 1, 0, 0, 0 is applied on eight rising edges. What is the count after the eighth edge?",
    code: `module limcnt (input clk, R, U, output reg [3:0] c);
  always @(posedge clk)
    if (R)            c <= 4'd5;
    else if (U) begin
      if (c < 4'd9)   c <= c + 1'b1;
    end else begin
      if (c > 4'd2)   c <= c - 1'b1;
    end
endmodule`,
    accept: ["6"],
    match: "number",
    solution:
      "Up from 5: 6, 7, 8, 9, then the fifth U = 1 is blocked by `c < 9` → 9. Down: 8, 7, 6.\nCount after the eighth edge = **6**. Each count value is a state; saturation is a self-loop at 9 (and at 2).",
    source: "Style: CE1005 2018-19 S1 Q4(b)",
  },
  // 31
  {
    kind: "mcq",
    subtopic: "Next-state logic with assign",
    difficulty: "medium",
    prompt:
      "The Tutorial 10 machine (on after two 1s, off after two 0s) is encoded A = 00, B = 01, C = 11, D = 10 in `reg s1, s0;`. Which assign statement correctly gives the next value of s0?",
    options: ["`assign n0 = s1 ^ x;`", "`assign n0 = s0 & x;`", "`assign n0 = x;`", "`assign n0 = ~s1 & x;`", "`assign n0 = s1 | x;`"],
    answer: 2,
    solution:
      "Transitions: A→B and D→C on x = 1, B→C and C→C on x = 1; every x = 0 arrow goes to A (00) or D (10). The states entered on x = 1 (B = 01, C = 11) have s0 = 1, those entered on x = 0 (A = 00, D = 10) have s0 = 0. So the next s0 is exactly x: `assign n0 = x;` (s0 remembers the last input).\nThe matching n1 is $s_1s_0 + s_1x + s_0x$ and z = s1.",
    source: "Style: Tutorial 10 Q1(b)",
  },
];
