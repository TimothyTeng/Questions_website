import type { Figure, Lesson } from "@/lib/sc1005/types";

const T10_CASE = `module twoones (input clk, rst, x, output z);
  localparam A = 2'b00, B = 2'b01, C = 2'b10, D = 2'b11;
  reg [1:0] st, nst;            // current and next state

  // 1. state register: the only clocked block
  always @(posedge clk)
    if (rst) st <= A;           // synchronous reset to a valid state
    else     st <= nst;

  // 2. next-state logic: combinational
  always @* begin
    nst = st;                   // default: stay
    case (st)
      A: if (x) nst = B;
      B: if (x) nst = C; else nst = A;
      C: if (!x) nst = D;
      D: if (x) nst = C; else nst = A;
      default: nst = A;         // unused codes go home
    endcase
  end

  // 3. output logic (Moore: state only)
  assign z = (st == C) | (st == D);
endmodule`;

const T10_ASSIGN = `module twoones_eq (input clk, rst, x, output z);
  reg  s1, s0;                  // A = 00, B = 01, C = 11, D = 10
  wire n1, n0;

  assign n1 = (s1 & s0) | (s1 & x) | (s0 & x);
  assign n0 = x;
  assign z  = s1;

  always @(posedge clk)
    if (rst) begin s1 <= 1'b0; s0 <= 1'b0; end
    else     begin s1 <= n1;   s0 <= n0;   end
endmodule`;

const PULSE3_V = `module pulse3 (input b, input clk, rst, output x);
  wire n1, n0;
  reg  s1, s0;                  // off 00, on1 01, on2 10, on3 11
  assign n1 = s1 ^ s0;
  assign n0 = (~s1 & ~s0 & b) | (s1 & ~s0);
  assign x  = s1 | s0;
  always @(posedge clk)
  begin
    if (rst) begin
      s1 <= 1'b0;
      s0 <= 1'b0;
    end else begin
      s1 <= n1;
      s0 <= n0;
    end
  end
endmodule`;

const RESETS = `// synchronous, active-high: waits for the clock edge
always @(posedge clk)
  if (rst) st <= IDLE; else st <= nst;

// asynchronous, active-high: acts as soon as rst rises
always @(posedge clk or posedge rst)
  if (rst) st <= IDLE; else st <= nst;

// asynchronous, active-low (rst_n = 0 resets)
always @(posedge clk or negedge rst_n)
  if (!rst_n) st <= IDLE; else st <= nst;`;

const PARAMS = `// binary: 6 states need 3 bits
parameter  WAITE = 3'b000, START = 3'b001, RED1 = 3'b010,
           BLUE  = 3'b011, GREEN = 3'b100, RED2  = 3'b101;
reg [2:0] st, nst;

// one-hot: one bit per state
localparam IDLE = 4'b0001, RUN = 4'b0010, PAUSE = 4'b0100, DONE = 4'b1000;
reg [3:0] st, nst;`;

const OUTPUTS = `// Moore, separate assign (u is a wire)
assign u = (st == RED2);

// Mealy: the input appears in the output expression
assign z = (st == S1) & x;

// Output inside the next-state block: u must be declared reg
always @* begin
  nst = st; u = 1'b0;           // defaults for BOTH outputs
  case (st)
    ...
    RED2: begin nst = WAITE; u = 1'b1; end
  endcase
end

// Registered output from st: one clock cycle LATE
always @(posedge clk) z <= (st == S2);

// Registered output from nst: same timing as assign z = (st == S2),
// but glitch-free because it comes straight from a flip-flop
always @(posedge clk) z <= (nst == S2);`;

const SEQDET = `module seqdet (input s, r, g, b, a, input clk, rst, output u);
  parameter waite = 3'b000, start = 3'b001, red1 = 3'b010,
            blue  = 3'b011, green = 3'b100, red2 = 3'b101;
  reg [2:0] nst, st;

  assign u = (st == red2);              // logic to drive the output

  always @(posedge clk)                 // state register
    if (rst) st <= waite;
    else     st <= nst;

  always @* begin                       // logic to determine next state
    nst = st;
    case (st)
      waite: if (s) nst = start;
      start: if (a)
               if (r & ~b & ~g) nst = red1;
               else nst = waite;
      red1:  if (a)
               if (b & ~r & ~g) nst = blue;
               else nst = waite;
      blue:  if (a)
               if (g & ~r & ~b) nst = green;
               else nst = waite;
      green: if (a)
               if (r & ~g & ~b) nst = red2;
               else nst = waite;
      red2:  nst = waite;
      default: nst = waite;
    endcase
  end
endmodule`;

const TRAFFIC = `module traffic (input clk, rst, car, output reg [1:0] ns, ew);
  localparam NS_G = 3'd0, NS_Y = 3'd1, EW_G1 = 3'd2, EW_G2 = 3'd3, EW_Y = 3'd4;
  localparam RED = 2'b00, YEL = 2'b01, GRN = 2'b10;
  reg [2:0] st, nst;

  always @(posedge clk)
    if (rst) st <= NS_G;
    else     st <= nst;

  always @* begin                 // next state
    nst = st;
    case (st)
      NS_G:  if (car) nst = NS_Y;  // main road stays green until a car waits
      NS_Y:  nst = EW_G1;
      EW_G1: nst = EW_G2;          // side road gets two green cycles
      EW_G2: nst = EW_Y;
      EW_Y:  nst = NS_G;
      default: nst = NS_G;         // codes 5, 6, 7
    endcase
  end

  always @* begin                 // Moore outputs
    ns = RED; ew = RED;
    case (st)
      NS_G:        ns = GRN;
      NS_Y:        ns = YEL;
      EW_G1, EW_G2: ew = GRN;
      EW_Y:        ew = YEL;
    endcase
  end
endmodule`;

const VEND = `module vend (input clk, rst_n, c50, c100, output vend);
  localparam IDLE = 2'd0, C50 = 2'd1, C100 = 2'd2, VEND = 2'd3;   // price 150c
  reg [1:0] st, nst;

  always @(posedge clk or negedge rst_n)
    if (!rst_n) st <= IDLE;
    else        st <= nst;

  always @* begin
    nst = st;
    case (st)
      IDLE: if (c100) nst = C100; else if (c50) nst = C50;
      C50:  if (c100) nst = VEND; else if (c50) nst = C100;
      C100: if (c50 | c100) nst = VEND;
      VEND: nst = IDLE;
    endcase
  end

  assign vend = (st == VEND);
endmodule`;

const BUGS = `// BUG 1: incomplete sensitivity list (x missing)
always @(st) begin nst = st; case (st) S0: if (x) nst = S1; ... endcase end

// BUG 2: nst not assigned on every path -> latch
always @* begin
  case (st)
    S0: if (x) nst = S1;        // no else, no default at the top
    ...
  endcase
end

// BUG 3: blocking assignment in the clocked block
always @(posedge clk) begin st = nst; z = (st == S2); end   // z uses the NEW st

// BUG 4: no default and an unused code: 2'b11 maps to itself forever
always @* begin nst = st; case (st) S0: ... S1: ... S2: ... endcase end

// BUG 5: register too narrow for the state constants
localparam S4 = 3'b100;
reg [1:0] st;                   // st = S4 stores 2'b00, i.e. S0`;

const SYNC_ASYNC_WAVE: Figure = {
  kind: "wave",
  caption: "rst is high from mid-cycle 2 to mid-cycle 3. With a synchronous reset the state only returns to IDLE at the next rising edge (start of cycle 3); with an asynchronous reset it changes immediately, mid-cycle 2. Both leave IDLE at the first edge after rst falls.",
  ticks: ["0", "", "1", "", "2", "", "3", "", "4", ""],
  signals: [
    { name: "clk", wave: "1010101010" },
    { name: "rst", wave: "0000011000" },
    { name: "st (sync)", wave: "=.=.=.=.=.", data: ["S1", "S2", "S3", "IDLE", "S1"] },
    { name: "st (async)", wave: "=.=.==..=.", data: ["S1", "S2", "S3", "IDLE", "S1"] },
  ],
};

const REG_OUT_WAVE: Figure = {
  kind: "wave",
  caption: "11-detector (Moore states S0, S1, S2). Combinational z = (st == S2) and registered z <= (nst == S2) coincide; registered z <= (st == S2) is one cycle late.",
  ticks: ["0", "", "1", "", "2", "", "3", "", "4", "", "5", ""],
  signals: [
    { name: "clk", wave: "101010101010" },
    { name: "x", wave: "111111001111" },
    { name: "st", wave: "=.=.=.=.=.=.", data: ["S0", "S1", "S2", "S2", "S0", "S1"] },
    { name: "assign z", wave: "000011110000" },
    { name: "z<=(nst==S2)", wave: "000011110000" },
    { name: "z<=(st==S2)", wave: "000000111100" },
  ],
};

const TRAFFIC_FSM: Figure = {
  kind: "fsm",
  caption: "Traffic-light controller: car = 1 (a car waits on the side road) ends the main-road green; every other arrow is unconditional.",
  initial: "NS_G",
  states: [
    { id: "NS_G", label: "NS_G", x: 0, y: 0 },
    { id: "NS_Y", label: "NS_Y", x: 2, y: 0 },
    { id: "EW_G1", label: "EW_G1", x: 2, y: 1 },
    { id: "EW_G2", label: "EW_G2", x: 1, y: 2 },
    { id: "EW_Y", label: "EW_Y", x: 0, y: 1 },
  ],
  edges: [
    { from: "NS_G", to: "NS_G", label: "car'", loop: "top" },
    { from: "NS_G", to: "NS_Y", label: "car" },
    { from: "NS_Y", to: "EW_G1" },
    { from: "EW_G1", to: "EW_G2" },
    { from: "EW_G2", to: "EW_Y" },
    { from: "EW_Y", to: "NS_G" },
  ],
};

export const fsmVerilogLesson: Lesson = {
  topic: "fsm-verilog",
  bigPicture:
    "Writing an FSM in Verilog is mechanical once you see that every FSM is the same three pieces of hardware: a **state register** (the only clocked part), **next-state logic** and **output logic** (both combinational). The course template gives each piece its own block: `always @(posedge clk)` with a reset and `st <= nst`; `always @*` with `nst = st;` at the top and a `case (st)` that encodes every arrow of the diagram; and an `assign` (or a second `always @*`) for the outputs. State names become `parameter`/`localparam` constants of the right width. For small machines you can instead derive the next-state equations yourself and write them as `assign` statements (Tutorial 10 Q1b), which shows exactly what the `case` block synthesises to. Exam questions ask you to write such modules from a diagram or word description, to trace given code on an input sequence, to tell Moore from Mealy and registered from combinational outputs, and to spot the classic bugs: missing defaults (latches, lock-up), blocking assignments in clocked blocks, incomplete sensitivity lists, missing resets and mis-sized state registers.",
  sections: [
    {
      title: "From diagram to hardware: the three-block FSM template",
      intuition:
        "The diagram says what happens; the template says where each part of that behaviour lives in hardware. Keep the clocked part tiny and put all the decisions in combinational blocks, and the code reads like the diagram.",
      visuals: ["verilog-stepper"],
      keyIdeas: [
        "Stages (lecture): draw the diagram → (optional) state table → **encode** the states → encoded state table → next-state and output equations → circuit. In Verilog, the `case` statement lets the synthesiser do the equation step for you.",
        "**Block 1, state register**: `always @(posedge clk)`, reset to a valid state, otherwise `st <= nst;`. Always the same shape. Non-blocking `<=`.",
        "**Block 2, next-state logic**: `always @*`, a default `nst = st;`, then `case (st)` with one item per state; each item uses `if`/`else` on the inputs to pick `nst`. Blocking `=`. A `default:` item sends unused codes to the reset state.",
        "**Block 3, output logic**: Moore outputs depend only on `st` (e.g. `assign u = (st == RED2);`); Mealy outputs also use inputs. Outputs can also be set inside block 2 (then they must be `reg` and need their own default).",
        "`nst` is not a register: it is the combinational next-state value, which the state register samples at the next rising edge.",
        "Writing the whole FSM in one clocked always block is possible but harder to verify; the course recommends separating the state register.",
      ],
      code: [
        { title: "Tutorial 10 machine (on after two 1s, off after two 0s), case style", code: T10_CASE },
        { title: "Lecture door-lock sequence detector", code: SEQDET },
      ],
      example: {
        problem: "Trace `twoones` from reset with x = 1, 1, 0, 1, 0, 0 on six rising edges. Give st and z after each edge.",
        steps: [
          "After reset st = A, so `nst` = B whenever x = 1 (case item A).",
          "Edge 1 (x = 1): st <= B; z = 0. Edge 2 (x = 1): item B, x = 1 → nst = C; st = C, z = 1.",
          "Edge 3 (x = 0): item C, `!x` → nst = D; st = D, z = 1 (still on).",
          "Edge 4 (x = 1): item D, x = 1 → C; z = 1. Edge 5 (x = 0): → D; z = 1.",
          "Edge 6 (x = 0): item D, x = 0 → A; z = 0.",
        ],
        answer: "st: B, C, D, C, D, A; z: 0, 1, 1, 1, 1, 0.",
      },
      pitfalls: [
        "`nst` must be declared `reg` because it is assigned in an `always` block, even though it synthesises to combinational logic.",
        "The case item for a state with no `else` relies on the `nst = st;` default to stay; delete that line and you get a latch.",
        "Inputs are only read at the clock edge through `nst`; changing x between edges does not change `st`.",
      ],
      recall: [
        { q: "Which of the three blocks is clocked?", a: "Only the state register: `always @(posedge clk)` with `st <= nst`." },
        { q: "Why is `nst` declared as reg?", a: "It is assigned inside an always block. reg is a Verilog data type, not a promise of a flip-flop." },
        { q: "What does the `default:` case item do?", a: "Gives the next state for any code not listed (unused or corrupted codes), usually the reset state." },
      ],
    },
    {
      title: "Naming the states: parameter, localparam and the state register width",
      intuition: "Constants let the code talk about Red1 and Green instead of 3'b010 and 3'b100, and let you change the encoding in one place.",
      keyIdeas: [
        "`parameter waite = 3'b000, start = 3'b001, …;` declares named constants. Use the names in `case` items and assignments: `nst = start;`.",
        "`localparam` is the same but cannot be overridden from outside the module (with `#(…)` at instantiation). Use it for state codes, which are internal.",
        "The state registers must be wide enough for every code: m states need `reg [k-1:0] st, nst;` with k = ⌈log₂ m⌉ for binary, k = m for one-hot.",
        "If a constant is wider than the register it is **truncated**: `reg [1:0] st;` cannot hold `3'b100`, which becomes `2'b00` and silently collides with another state.",
        "Any encoding works if the codes are unique; the reset state is commonly all zeros. Changing the parameter values re-encodes the whole machine without touching the rest of the code.",
      ],
      code: [{ title: "Binary and one-hot state constants", code: PARAMS }],
      example: {
        problem: "An FSM has 6 states: IDLE, FETCH, DEC, EXE, MEM, WB. Declare binary state codes and the state registers, and say how the declarations change for one-hot.",
        steps: [
          "6 states → ⌈log₂ 6⌉ = 3 bits.",
          "`localparam IDLE = 3'd0, FETCH = 3'd1, DEC = 3'd2, EXE = 3'd3, MEM = 3'd4, WB = 3'd5;`",
          "`reg [2:0] st, nst;` Codes 6 and 7 are unused, so add `default: nst = IDLE;`.",
          "One-hot: 6-bit constants `6'b000001`, `6'b000010`, … and `reg [5:0] st, nst;`.",
        ],
        answer: "3-bit localparams with `reg [2:0] st, nst;` (one-hot: 6-bit constants and `reg [5:0]`).",
      },
      pitfalls: [
        "Declaring `reg [1:0]` for 5 or more states truncates the constants: two states end up with the same code.",
        "Parameters are constants: you cannot assign to them, and two parameters with the same value make two case items identical.",
      ],
      recall: [
        { q: "Difference between parameter and localparam?", a: "A parameter can be overridden when the module is instantiated; a localparam cannot." },
        { q: "How wide must st be for 9 states in binary?", a: "4 bits (⌈log₂ 9⌉ = 4): `reg [3:0] st`." },
        { q: "What is 3'b110 stored into a 2-bit reg?", a: "2'b10: the upper bit is dropped." },
      ],
    },
    {
      title: "The state register: clocking and reset",
      intuition: "Flip-flops power up holding arbitrary values, so the very first job of an FSM is to get into a known state. The reset style decides whether that happens on the next clock edge or immediately.",
      keyIdeas: [
        "Always give the state register a reset to a **valid** state; otherwise the FSM may start in any code, including unused ones whose behaviour you never specified.",
        "**Synchronous** reset: `always @(posedge clk) if (rst) st <= IDLE; else st <= nst;` The reset only takes effect at a rising clock edge.",
        "**Asynchronous** reset: add the reset edge to the event list, `always @(posedge clk or posedge rst)` (active-high) or `always @(posedge clk or negedge rst_n)` with `if (!rst_n)` (active-low). The state changes as soon as reset is asserted.",
        "Use non-blocking `<=` in the clocked block so every register samples its input at the same instant.",
        "Registered (flip-flop) outputs also go in a clocked block; everything else stays combinational.",
      ],
      code: [{ title: "Three reset styles", code: RESETS }],
      figures: [SYNC_ASYNC_WAVE],
      example: {
        problem: "An active-low asynchronous reset rst_n is pulled to 0 halfway through a clock cycle while the FSM is in state S3. When does st become IDLE, and what does the header of the block look like?",
        steps: [
          "Asynchronous: the event list includes the reset edge. Active-low means the falling edge of rst_n: `always @(posedge clk or negedge rst_n)`.",
          "The block runs as soon as rst_n falls; `if (!rst_n) st <= IDLE;` executes immediately, not at the next clock edge.",
          "While rst_n stays 0, clock edges keep st at IDLE; normal operation resumes at the first rising clock edge after rst_n returns to 1.",
        ],
        answer: "Immediately when rst_n falls; header `always @(posedge clk or negedge rst_n)` with `if (!rst_n)`.",
      },
      pitfalls: [
        "`always @(posedge clk or negedge rst_n)` with `if (rst_n)` resets on the wrong level. The test must match the edge.",
        "Listing the reset in the event list but testing it after other statements breaks the asynchronous template; the reset `if` comes first.",
        "A synchronous reset needs at least one clock edge while rst is asserted.",
      ],
      recall: [
        { q: "Header of a state register with an active-high asynchronous reset?", a: "`always @(posedge clk or posedge rst)`." },
        { q: "When does a synchronous reset take effect?", a: "At the next rising clock edge while it is asserted." },
        { q: "Why reset an FSM at all?", a: "So it starts in a defined, valid state rather than a random (possibly unused) code." },
      ],
    },
    {
      title: "Next-state logic: always @* with case",
      intuition:
        "The case block is the state diagram written as text: one case item per circle, one if/else branch per arrow. The defaults make sure every path assigns nst, so the block stays purely combinational.",
      keyIdeas: [
        "Start with `nst = st;` (lecture: \"a default at the top says that if no assignment is made, we stay in the current state\"). Then only arrows that leave a state need code.",
        "Each `case` item: `STATE: if (cond) nst = OTHER; else if (cond2) nst = …;`. Unconditional arrows are a plain assignment: `red2: nst = waite;`.",
        "Add `default: nst = IDLE;` so unused or invalid codes return to the initial state.",
        "Sensitivity: use `always @*` so the block re-runs when **any** signal it reads changes (st and every input). A hand-written list such as `@(st)` that omits an input makes simulation disagree with the synthesised hardware.",
        "If some path leaves `nst` unassigned (no top default, missing `else`, missing case item) the synthesiser must remember the old value: it infers a **latch**, which is not what an FSM wants.",
        "Use blocking `=` in combinational always blocks.",
      ],
      code: [{ title: "Common FSM bugs", code: BUGS }],
      example: {
        problem: "Write the case item for state RUN: go to DONE if stop = 1; otherwise go to PAUSE if go = 0; otherwise stay.",
        steps: [
          "Priority matters: stop is checked first, so it must be the outer `if`.",
          "`RUN: if (stop) nst = DONE; else if (!go) nst = PAUSE;`",
          "Staying in RUN needs no code because `nst = st;` at the top already assigned it.",
        ],
        answer: "`RUN: if (stop) nst = DONE; else if (!go) nst = PAUSE;`",
      },
      pitfalls: [
        "Forgetting `nst = st;` and the final `else` produces a latch on nst.",
        "Omitting `default` lets an unused code map to itself (with `nst = st;`) and lock the machine up.",
        "Using `<=` for nst inside `always @*` is legal but misleading; use `=` in combinational blocks.",
      ],
      recall: [
        { q: "What does `nst = st;` at the top of the block achieve?", a: "Every path assigns nst (no latch) and unlisted conditions mean stay." },
        { q: "Why use `always @*`?", a: "It automatically includes every signal read in the block, so simulation matches the combinational hardware." },
        { q: "What is inferred if nst is not assigned on some path?", a: "A latch holding the previous value of nst." },
      ],
    },
    {
      title: "Output logic: Moore, Mealy and registered outputs",
      intuition: "Where you compute the output decides when it changes: from the state (Moore), from the state and inputs (Mealy), or from a flip-flop (registered, glitch-free but possibly one cycle late).",
      visuals: ["output-timing"],
      keyIdeas: [
        "**Moore**: `assign u = (st == RED2);` A comparison with a constant is just an AND of the state bits (e.g. `st[2] & ~st[1] & st[0]`).",
        "**Mealy**: the input appears in the output expression, e.g. `assign z = (st == S1) & x;`. The output changes as soon as x changes.",
        "**Inside the next-state block**: declare the output `reg`, give it a default at the top (`u = 1'b0;`) and set it in the case items. Forgetting that default creates a latch on the output.",
        "**Registered output from st**: `always @(posedge clk) z <= (st == S2);` adds a flip-flop, so z follows the state one cycle late.",
        "**Registered output from nst**: `z <= (nst == S2);` has the same timing as the combinational Moore output but comes straight from a flip-flop (no decoding glitches).",
      ],
      code: [{ title: "Output styles", code: OUTPUTS }],
      figures: [REG_OUT_WAVE],
      example: {
        problem: "In the 11-detector, `z <= (st == S2);` is placed in the state-register block. The state sequence (one per cycle) is S0, S1, S2, S2, S0, S1. When is z = 1?",
        steps: [
          "At each edge, `st <= nst` and `z <= (st == S2)` are evaluated with the **old** st (non-blocking: right-hand sides are read before any update).",
          "So z during cycle k equals (st during cycle k−1 == S2).",
          "st = S2 in cycles 2 and 3, so z = 1 in cycles 3 and 4.",
          "With `assign z = (st == S2);` it would be cycles 2 and 3.",
        ],
        answer: "Cycles 3 and 4: one cycle later than the combinational Moore output.",
      },
      pitfalls: [
        "An output assigned in some case items but without a default becomes a latch.",
        "A registered `z <= (st == S2)` is not the same machine as `assign z = (st == S2)`: it is one cycle late.",
        "Mealy outputs can glitch when inputs change; register them if a clean output is needed.",
      ],
      recall: [
        { q: "How do you tell Moore from Mealy in code?", a: "If any input appears in the output expression, it is Mealy." },
        { q: "What is the timing of `always @(posedge clk) z <= (st == S2);`?", a: "z is high one cycle after the FSM is in S2." },
        { q: "What must accompany an output assigned inside `always @*`?", a: "A default value at the top of the block (and `output reg`)." },
      ],
    },
    {
      title: "Next-state logic with assign statements only (Tutorial 10 Q1b)",
      intuition: "Deriving the equations yourself shows what the case block becomes in gates, and is exactly what the lecture's pulse3 module does.",
      visuals: ["case-vs-assign"],
      keyIdeas: [
        "Encode the states, write the encoded state table, minimise each next-state bit (K-map) and write one `assign` per bit. The state register stays a clocked block.",
        "Lecture pulse3 (off 00, on1 01, on2 10, on3 11): `assign n1 = s1 ^ s0; assign n0 = (~s1 & ~s0 & b) | (s1 & ~s0); assign x = s1 | s0;`",
        "Tutorial 10 machine with A = 00, B = 01, C = 11, D = 10: $n_1 = s_1s_0 + s_1x + s_0x$, $n_0 = x$, $z = s_1$. With binary order (C = 10, D = 11): $n_1 = s_0x + s_1s_0'$, $n_0 = s_1's_0'x + s_1s_0'x'$.",
        "Verilog operators: `~` NOT, `&` AND, `|` OR, `^` XOR. Bitwise operators on 1-bit signals behave as Boolean gates.",
        "The case and assign versions describe the same hardware if the equations match the table for every (state, input) row.",
      ],
      code: [
        { title: "Tutorial 10 machine, assign style (A = 00, B = 01, C = 11, D = 10)", code: T10_ASSIGN },
        { title: "Lecture pulse3 module", code: PULSE3_V },
      ],
      example: {
        problem: "Trace the pulse3 module from reset with b = 1, 0, 0, 0, 1 on five edges. Give s1s0 and x after each edge.",
        steps: [
          "00, b = 1: n1 = 0 ^ 0 = 0, n0 = (1·1·1) | 0 = 1 → **01**, x = 1.",
          "01, b = 0: n1 = 0 ^ 1 = 1, n0 = 0 | (0·0) = 0 → **10**, x = 1.",
          "10: n1 = 1, n0 = 0 | (1·1) = 1 → **11**, x = 1.",
          "11: n1 = 0, n0 = 0 → **00**, x = 0.",
          "00, b = 1 → **01**, x = 1.",
        ],
        answer: "01, 10, 11, 00, 01 with x = 1, 1, 1, 0, 1.",
      },
      pitfalls: [
        "Mixing up the bit order (s1 is the MSB of the code) gives equations for a different machine.",
        "The state bits must still be registered in a clocked block with a reset; assign statements alone cannot hold state.",
      ],
      recall: [
        { q: "In pulse3, what is n1?", a: "`s1 ^ s0`." },
        { q: "With A = 00, B = 01, C = 11, D = 10 in Tutorial 10, what does s0 remember?", a: "The last input: n0 = x." },
        { q: "What replaces the K-map when you use a case statement?", a: "The synthesis tool derives and minimises the equations." },
      ],
    },
    {
      title: "Controllers in Verilog: traffic lights and vending machines",
      intuition: "Real controllers are the same template with more states and multi-bit outputs; the outputs are usually decoded from the state in their own combinational block.",
      visuals: ["traffic-light"],
      keyIdeas: [
        "Name states after what the outside world sees (NS_G, EW_Y, IDLE, VEND) and write the output block as a case on st with a default for every output.",
        "Timers can be built from extra states (EW_G1, EW_G2 give two green cycles) or from a separate counter register.",
        "Inputs that only matter in some states are read only in those case items (the coin inputs are ignored in VEND; a coin inserted then is lost, a classic specification bug).",
        "Unused codes (5–7 for a 5-state machine) go to a safe state through `default`, and the output block should drive a safe value (all lights red) for them.",
        "Table-driven specifications (current location × input → next location) translate line by line into case items.",
      ],
      figures: [TRAFFIC_FSM],
      code: [
        { title: "Traffic-light controller", code: TRAFFIC },
        { title: "Vending machine (price 150c, active-low asynchronous reset)", code: VEND },
      ],
      example: {
        problem: "In the vending module, coins arrive one per cycle: 50, 100, (none), 100, 100. How many cycles is vend = 1, and what happens to a coin inserted while in VEND?",
        steps: [
          "IDLE + 50 → C50; C50 + 100 → VEND (vend = 1); next edge VEND → IDLE regardless of inputs.",
          "IDLE + 100 → C100; C100 + 100 → VEND (vend = 1).",
          "Two vend cycles. In VEND the case item ignores c50/c100, so a coin inserted that cycle is not credited.",
        ],
        answer: "vend = 1 for 2 cycles; coins during VEND are lost.",
      },
      pitfalls: [
        "Multi-bit outputs assigned in a case need defaults for every output, or latches appear.",
        "Make sure each unconditional state (NS_Y, EW_Y) really advances; forgetting the line leaves the machine stuck via `nst = st;`.",
      ],
      recall: [
        { q: "How do you make the side road green for two cycles without a counter?", a: "Use two consecutive states (EW_G1 → EW_G2) that both output green." },
        { q: "What should the output block do for unused state codes?", a: "Drive safe defaults (e.g. all lights red)." },
        { q: "Where do you put a priority input like reset or stop?", a: "In the outermost if, so it overrides the other conditions." },
      ],
    },
    {
      title: "Debugging FSM code",
      intuition: "Most broken FSMs fail in a handful of ways. Knowing the symptom of each makes spotting them in exam code quick.",
      visuals: ["bug-lab"],
      keyIdeas: [
        "**Missing default / missing else** in `always @*` → latch on nst (or on an output).",
        "**No `default:` item** with unused codes → the machine can lock up in an unused code (with `nst = st;` it simply stays there).",
        "**Blocking `=` in the clocked block** → later statements see the new value; with `st = nst; z = (st == S2);` z is no longer one cycle late, and the result depends on statement order. Use `<=`.",
        "**Incomplete sensitivity list** `always @(st)` → in simulation nst is not recomputed when only an input changes, so the simulation disagrees with the synthesised logic. Use `always @*`.",
        "**No reset** → the starting state is unknown (x in simulation, random in hardware).",
        "**State register too narrow** → constants are truncated and two states collide.",
        "**Unreachable states** → a state with no arrow into it from the reset state (only from unused codes) is never visited in normal operation; check it is intended (e.g. an error state).",
      ],
      example: {
        problem: "`reg [1:0] st, nst;` holds states S0 = 0, S1 = 1, S2 = 2. The next-state block starts with `nst = st;` and has case items for S0, S1, S2 only. There is no reset. The flip-flops power up as 11. What happens, and what is the fix?",
        steps: [
          "st = 2'b11 matches no case item, so only `nst = st;` executes: nst = 11.",
          "Every edge loads 11 again: the FSM is locked up forever.",
          "Fix: add `default: nst = S0;` (recovers after one edge) and a reset in the state register (never starts there).",
        ],
        answer: "Lock-up in 11; add a default item and a reset.",
      },
      pitfalls: [
        "A design that simulates correctly from reset can still fail in hardware from an unused code.",
        "Simulators start regs as x; with no reset, `case (st)` on x matches nothing, so only defaults execute.",
      ],
      recall: [
        { q: "Symptom of `always @(st)` for next-state logic that reads x?", a: "Simulation ignores changes of x until st changes; hardware does not, so they disagree." },
        { q: "Which assignment operator belongs in the state register block?", a: "Non-blocking `<=`." },
        { q: "What does an incomplete if/case in a combinational block infer?", a: "A latch." },
      ],
    },
  ],
  playbook: [
    "If you must **write an FSM module**: localparam codes → `reg [k-1:0] st, nst;` → clocked block with reset and `st <= nst` → `always @*` with `nst = st;`, a case item per state and `default` → output assign/case with defaults.",
    "If asked for an **asynchronous reset**: put the reset edge in the event list (`posedge rst` or `negedge rst_n`) and test it first; synchronous reset only uses `posedge clk`.",
    "If you must **trace code**: keep a table of st, inputs, nst, output per edge; evaluate the case item of the current st with the input sampled at the edge.",
    "If the output is **assigned in a clocked block** from st: it is one cycle late; from nst: same timing as the combinational Moore output.",
    "If **an input appears in the output expression**: Mealy.",
    "If asked to use **assign statements only** for the next-state logic: encode, build the encoded table, K-map each next-state bit, write `assign n_i = …;` with ~ & | ^.",
    "If you see **no default / missing else** in `always @*`: latch. **No default case** with unused codes: possible lock-up. **`=` in the clocked block**: order-dependent behaviour. **`@(st)` only**: simulation mismatch.",
    "If the state register is **narrower than the constants**: truncation makes states collide; count ⌈log₂ m⌉ bits.",
  ],
};
