import type { Figure, Lesson } from "@/lib/sc1005/types";

const T10_CASE = `module twoones (input clk, rst, x, output z);
  parameter A = 2'b00, B = 2'b01, C = 2'b10, D = 2'b11;
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

const PARAMS = `// binary: 6 states need 3 bits (lecture door lock)
parameter waite = 3'b000, start = 3'b001, red1 = 3'b010,
          blue  = 3'b011, green = 3'b100, red2  = 3'b101;
reg [2:0] nst, st;

// the names are used in place of the values anywhere in the code
nst = start;`;

const OUTPUTS = `// Moore, separate assign (u is a wire)
assign u = (st == red2);

// Mealy: the input appears in the output expression
assign z = (st == S1) & x;

// Output inside the next-state block (Lecture 12 p.28): u must be declared reg
always @* begin
  nst = st; u = 1'b0;           // defaults for next state AND output
  case (st)
    ...
    red2: begin
      nst = waite;
      u = 1'b1;
    end
    default: nst = waite;
  endcase
end`;

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
  parameter NS_G = 3'd0, NS_Y = 3'd1, EW_G1 = 3'd2, EW_G2 = 3'd3, EW_Y = 3'd4;
  parameter RED = 2'b00, YEL = 2'b01, GRN = 2'b10;
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
  parameter IDLE = 2'd0, C50 = 2'd1, C100 = 2'd2, VEND = 2'd3;   // price 150c
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
always @(posedge clk) begin st = nst; end   // synchronous blocks use <=

// BUG 4: no default and an unused code: 2'b11 maps to itself forever
always @* begin nst = st; case (st) S0: ... S1: ... S2: ... endcase end

// BUG 5: register too narrow for the state constants
parameter S4 = 3'b100;
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
    "Writing an FSM in Verilog is mechanical once you see that every FSM is the same three pieces of hardware: a **state register** that holds the current state, logic to determine the **next state**, and logic to drive the **outputs**. The lecture's structure gives each piece its own block: `always @(posedge clk)` with a reset and `st <= nst`; a combinational `always @*` with `nst = st;` at the top and a `case (st)` that encodes every arrow of the diagram; and an `assign` (or the transition block itself) for the outputs. State names become `parameter` constants of the right width. For small machines you can instead derive the next-state equations yourself and write them as `assign` statements (Lecture 12 pulse3, Tutorial 10 Q1b), which shows exactly what the `case` block describes. Exam questions ask you to write such modules from a diagram or word description (often with an asynchronous reset), to trace given code on an input sequence, to tell Moore from Mealy, and to spot the classic mistakes: missing defaults (latches, invalid states), blocking assignments in clocked blocks, incomplete sensitivity lists, missing resets and mis-sized state registers.",
  sections: [
    {
      title: "From diagram to hardware: the three-block FSM structure",
      intuition:
        "The diagram says what happens; the structure says where each part of that behaviour lives in hardware. Keep the clocked part tiny and put all the decisions in combinational blocks, and the code reads like the diagram.",
      visuals: ["verilog-stepper"],
      keyIdeas: [
        "Stages (Lecture 12 p.14): draw the diagram → (optional) state table → **encode** the states → encoded state table → next-state and output equations → circuit. For more complex FSMs a combinational always block with a `case` statement captures the transitions, and the tools work out the logic.",
        "**State register**: `always @(posedge clk)`, reset to a valid state, otherwise `st <= nst;`. The lecture: \"the state register process is always the same\". Non-blocking `<=`.",
        "**Next-state logic**: `always @*`, a default `nst = st;`, then `case (st)` with one item per state; each item uses `if`/`else` on the inputs to pick `nst`. Blocking `=`. A `default:` item sends invalid codes to the initial state.",
        "**Output logic**: Moore outputs depend only on `st` (e.g. `assign u = (st == red2);`); Mealy outputs also use inputs. The output can also be assigned in the transition block (then it must be `reg` and needs its own default).",
        "`nst` is the next-state value; it is only clocked into the state register at the next rising edge.",
        "It is possible to write a whole FSM in a single synchronous always block, but that is harder to verify, so always separate the state register (Lecture 12 p.32).",
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
        "`nst` and `st` must both be declared `reg` because both are assigned in `always` blocks (lecture: \"two 3-bit reg signals, since both will be assigned from always blocks\").",
        "The case item for a state with no `else` relies on the `nst = st;` default to stay; delete that line and you get a latch.",
        "Inputs only affect `st` through `nst` at the clock edge; changing x between edges does not change `st`.",
      ],
      recall: [
        { q: "Which of the three blocks is clocked?", a: "Only the state register: `always @(posedge clk)` with `st <= nst`." },
        { q: "Why is `nst` declared as reg?", a: "It is assigned inside an always block. reg only means it can be assigned in an always block; here it is combinational." },
        { q: "What does the `default:` case item do?", a: "Gives the next state for any code not listed (invalid codes): the initial state." },
      ],
    },
    {
      title: "Naming the states: parameter constants and the state register width",
      intuition: "Constants let the code talk about red1 and green instead of 3'b010 and 3'b100, and let you change the encoding in one place.",
      keyIdeas: [
        "First encode the states, e.g. Wait = 000, Start = 001, Red1 = 010, Blue = 011, Green = 100, Red2 = 101 (Lecture 12 p.21).",
        "`parameter waite = 3'b000, start = 3'b001, …;` declares named constants. Use the names in place of the values anywhere in the code: in `case` items and in assignments such as `nst = start;`.",
        "The state registers must be wide enough for every code: m states need `reg [k-1:0] st, nst;` with k = ⌈log₂ m⌉.",
        "If a constant is wider than the register it is **truncated** at the MSB (Lecture 8A p.52): `reg [1:0] st;` cannot hold `3'b100`, which becomes `2'b00` and silently collides with another state.",
        "Any encoding works if the codes are unique. Changing the parameter values re-encodes the whole machine without touching the rest of the code.",
      ],
      code: [{ title: "State constants (Lecture 12 door lock)", code: PARAMS }],
      example: {
        problem: "An FSM has 6 states: IDLE, FETCH, DEC, EXE, MEM, WB. Declare binary state codes and the state registers.",
        steps: [
          "6 states → ⌈log₂ 6⌉ = 3 bits.",
          "`parameter IDLE = 3'd0, FETCH = 3'd1, DEC = 3'd2, EXE = 3'd3, MEM = 3'd4, WB = 3'd5;`",
          "`reg [2:0] st, nst;` Codes 6 and 7 are unused, so add `default: nst = IDLE;` and reset to IDLE.",
        ],
        answer: "3-bit parameters with `reg [2:0] st, nst;`, a default case item and a reset to IDLE.",
      },
      pitfalls: [
        "Declaring `reg [1:0]` for 5 or more states truncates the constants: two states end up with the same code.",
        "Parameters are constants: you cannot assign to them, and two parameters with the same value make two case items identical.",
      ],
      recall: [
        { q: "What does `parameter` declare?", a: "A named constant, local to the module, usable in place of the value anywhere in the code." },
        { q: "How wide must st be for 9 states in binary?", a: "4 bits (⌈log₂ 9⌉ = 4): `reg [3:0] st`." },
        { q: "What is 3'b110 stored into a 2-bit reg?", a: "2'b10: the upper bit is dropped." },
      ],
    },
    {
      title: "The state register: clocking and reset",
      intuition: "Without a reset we cannot predict which state the FSM starts in, so the first job of the state register is to get into a known, valid state. The reset style decides whether that happens on the next clock edge or immediately.",
      keyIdeas: [
        "Always give the state register a reset to a **valid** state (Lecture 12 p.17); otherwise the FSM may start in any code, including unused ones whose transitions were never specified.",
        "**Synchronous** reset: `always @(posedge clk) if (rst) st <= IDLE; else st <= nst;` At a rising edge, if reset is asserted, the register is set to the reset value.",
        "**Asynchronous** reset: whenever reset is asserted the register is set to the reset value, so the reset is added to the sensitivity list: `always @(posedge clk or posedge rst)` (Lecture 10 p.10). For an active-low asynchronous reset (asked in PYP 2018-19 S1 Q4(b)(ii)) the reset is asserted on its falling edge: `always @(posedge clk or negedge rst_n)` with `if (!rst_n)`.",
        "Use non-blocking `<=` in the clocked block.",
      ],
      code: [{ title: "Three reset styles", code: RESETS }],
      figures: [SYNC_ASYNC_WAVE],
      example: {
        problem: "An active-low asynchronous reset rst_n is pulled to 0 halfway through a clock cycle while the FSM is in state S3. When does st become IDLE, and what does the header of the block look like?",
        steps: [
          "Asynchronous: the reset is in the sensitivity list. Active-low means it is asserted when rst_n falls: `always @(posedge clk or negedge rst_n)`.",
          "The block runs as soon as rst_n falls; `if (!rst_n) st <= IDLE;` sets the state immediately, not at the next clock edge.",
          "While rst_n stays 0, clock edges keep st at IDLE; normal operation resumes at the first rising clock edge after rst_n returns to 1.",
        ],
        answer: "Immediately when rst_n falls; header `always @(posedge clk or negedge rst_n)` with `if (!rst_n)`.",
      },
      pitfalls: [
        "`always @(posedge clk or negedge rst_n)` with `if (rst_n)` resets on the wrong level. The test must match the active level.",
        "A synchronous reset needs at least one clock edge while rst is asserted.",
      ],
      recall: [
        { q: "Header of a state register with an active-high asynchronous reset?", a: "`always @(posedge clk or posedge rst)`." },
        { q: "When does a synchronous reset take effect?", a: "At the next rising clock edge while it is asserted." },
        { q: "Why reset an FSM at all?", a: "So it starts in a defined, valid state rather than an unpredictable (possibly unused) code." },
      ],
    },
    {
      title: "Next-state logic: always @* with case",
      intuition:
        "The case block is the state diagram written as text: one case item per circle, one if/else branch per arrow. The defaults make sure every path assigns nst, so the block stays purely combinational.",
      keyIdeas: [
        "Start with `nst = st;` (lecture: \"a default at the top says that if no assignment is made, we stay in the current state\"). Then only arrows that leave a state need code.",
        "Each `case` item: `STATE: if (cond) nst = OTHER; else if (cond2) nst = …;`. Unconditional arrows are a plain assignment: `red2: nst = waite;`.",
        "Add `default: nst = waite;` so invalid codes go to the initial state, and always ensure nst is assigned in every case (Lecture 12 p.33).",
        "Sensitivity: use `always @*` so the block is triggered when **any** signal it reads changes (st and every input). A hand-written list such as `@(st)` that leaves out an input means the block is not triggered when that input changes, so you will not get the expected circuit (Lecture 8B p.5).",
        "If some path leaves `nst` unassigned (no top default, missing `else`, missing case item) it must keep its old value: a **latch**, which is not combinational logic (Lecture 8B p.22).",
        "Use blocking `=` in combinational always blocks.",
      ],
      code: [{ title: "Common FSM mistakes", code: BUGS }],
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
        "Omitting `default` lets an unused code map to itself (with `nst = st;`), so the FSM can stay stuck in an invalid state.",
        "Use `=` in the combinational next-state block and `<=` only in the clocked state register (Lecture 10 p.13).",
      ],
      recall: [
        { q: "What does `nst = st;` at the top of the block achieve?", a: "Every path assigns nst (no latch) and unlisted conditions mean stay." },
        { q: "Why use `always @*`?", a: "The * means all input signals in the block, so the block is triggered whenever any of them changes." },
        { q: "What is inferred if nst is not assigned on some path?", a: "A latch holding the previous value of nst." },
      ],
    },
    {
      title: "Output logic: Moore and Mealy outputs in code",
      intuition: "Where you compute the output decides what it depends on: the state only (Moore) or the state and the inputs (Mealy). It can live in its own assign or inside the transition block.",
      keyIdeas: [
        "**Moore**: `assign u = (st == red2);` The output is high only when the current state is red2 (101), so it can be assigned directly. A comparison with a constant is just an AND of the state bits (e.g. `st[2] & ~st[1] & st[0]`).",
        "**Mealy**: the input appears in the output expression, e.g. `assign z = (st == S1) & x;`. The output changes as soon as x changes.",
        "**Inside the transition block** (Lecture 12 p.28): change the port to `output reg u`, give it a default at the top (`nst = st; u = 1'b0;`) and set it in the case items. Forgetting that default creates a latch on the output.",
        "If the output and transitions can be combined cleanly, do that; otherwise assign the output separately (Lecture 12 p.32).",
      ],
      code: [{ title: "Output styles", code: OUTPUTS }],
      example: {
        problem: "Move the door-lock output `assign u = (st == red2);` into the next-state always block. What must change?",
        steps: [
          "u is now assigned inside an always block, so the port becomes `output reg u`.",
          "Add a default at the top of the block: `nst = st; u = 1'b0;`, so u is assigned on every path (no latch).",
          "In the red2 item set both: `red2: begin nst = waite; u = 1'b1; end` (begin/end because there are two statements).",
          "Remove the old `assign`, since u may only be assigned from one place.",
        ],
        answer: "`output reg u`; `u = 1'b0;` default at the top; `red2: begin nst = waite; u = 1'b1; end`; delete the assign.",
      },
      pitfalls: [
        "An output assigned in some case items but without a default becomes a latch.",
        "Assigning the output in the always block **and** keeping the `assign`: two drivers for one signal.",
        "An input in the output expression makes the output Mealy, wherever the code is written.",
      ],
      recall: [
        { q: "How do you tell Moore from Mealy in code?", a: "If any input appears in the output expression, it is Mealy." },
        { q: "What must change in the port list when u moves into the transition block?", a: "u must be declared `output reg u`." },
        { q: "What must accompany an output assigned inside `always @*`?", a: "A default value at the top of the block (and `output reg`)." },
      ],
    },
    {
      title: "Next-state logic with assign statements only (Tutorial 10 Q1b)",
      intuition: "Deriving the equations yourself shows what the case block describes in gates, and is exactly what the lecture's pulse3 module does: three assign statements plus a state register.",
      visuals: ["case-vs-assign"],
      keyIdeas: [
        "Encode the states, write the encoded state table, minimise each next-state bit (K-map) and write one `assign` per bit. The state register stays a clocked block.",
        "Lecture pulse3 (off 00, on1 01, on2 10, on3 11): `assign n1 = s1 ^ s0; assign n0 = (~s1 & ~s0 & b) | (s1 & ~s0); assign x = s1 | s0;`",
        "Tutorial 10 machine with A = 00, B = 01, C = 11, D = 10: $n_1 = s_1s_0 + s_1x + s_0x$, $n_0 = x$, $z = s_1$. With binary order (C = 10, D = 11): $n_1 = s_0x + s_1s_0'$, $n_0 = s_1's_0'x + s_1s_0'x'$.",
        "Verilog operators: `~` NOT, `&` AND, `|` OR, `^` XOR.",
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
        { q: "What replaces the K-map when you use a case statement?", a: "Verilog's behavioural description: the tools derive the logic from the case statement." },
      ],
    },
    {
      title: "Controllers in Verilog: traffic lights and vending machines",
      intuition: "Exam controllers (pedestrian crossing, vending machine, autonomous vehicle) are the same structure with more states and more outputs; the outputs are decoded from the state in their own block or in the transition block.",
      visuals: ["traffic-light"],
      keyIdeas: [
        "Name states after what they mean (NS_G, EW_Y, IDLE, VEND): states can be labelled with any meaningful name (Lecture 11 p.13).",
        "Write the output block as a `case` on st with a default value for every output at the top, so no output is left unassigned (no latches).",
        "Extra states can stretch an output over several cycles (EW_G1 and EW_G2 give two green cycles, like on1, on2, on3 in the pulse machine).",
        "Inputs that only matter in some states are read only in those case items.",
        "Unused codes (5–7 for a 5-state machine) go back to the initial state through `default`.",
        "Table-driven specifications (PYP 2016-17 S2 Q4(a): current location × MOVE → next location) translate line by line into case items.",
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
          "Two vend cycles. The VEND case item does not read c50/c100, so a coin inserted in that cycle is not credited.",
        ],
        answer: "vend = 1 for 2 cycles; a coin during VEND is not credited.",
      },
      pitfalls: [
        "Multi-bit outputs assigned in a case need defaults for every output, or latches appear.",
        "Make sure each unconditional state (NS_Y, EW_Y) really advances; forgetting the line leaves the machine stuck via `nst = st;`.",
      ],
      recall: [
        { q: "How do you make the side road green for two cycles?", a: "Use two consecutive states (EW_G1 → EW_G2) that both output green." },
        { q: "Why does the output block start with `ns = RED; ew = RED;`?", a: "Defaults make every output assigned on every path, so no latch is inferred." },
        { q: "Where do you put a priority input like reset or stop?", a: "In the outermost if, so it overrides the other conditions." },
      ],
    },
    {
      title: "Debugging FSM code",
      intuition: "Most broken FSMs fail in a handful of ways. Knowing the symptom of each makes spotting them in exam code quick.",
      visuals: ["bug-lab"],
      keyIdeas: [
        "**Missing default / missing else** in `always @*` → latch on nst (or on an output).",
        "**No `default:` item** with unused codes → if the machine is ever in an unused code it may never leave (with `nst = st;` it simply stays there).",
        "**Blocking `=` in the clocked block** → breaks the course rule: synchronous always blocks always use non-blocking `<=`, combinational ones use `=` (Lecture 10 p.13).",
        "**Incomplete sensitivity list** `always @(st)` → the block is not triggered when only an input changes, so nst is not updated and you do not get the expected circuit. Use `always @*`.",
        "**No reset** → we cannot predict which state the FSM starts in.",
        "**State register too narrow** → constants are truncated and two states collide.",
        "**Unreachable states** → a state with no arrow into it from the reset state is never visited in normal operation; check it is intended (e.g. an error state entered only through `default`).",
      ],
      example: {
        problem: "`reg [1:0] st, nst;` holds states S0 = 0, S1 = 1, S2 = 2. The next-state block starts with `nst = st;` and has case items for S0, S1, S2 only. There is no reset. The flip-flops power up as 11. What happens, and what is the fix?",
        steps: [
          "st = 2'b11 matches no case item, so only `nst = st;` executes: nst = 11.",
          "Every edge loads 11 again: the FSM is stuck in the invalid state forever.",
          "Fix: add `default: nst = S0;` (recovers after one edge) and a reset in the state register (never starts there).",
        ],
        answer: "Stuck in 11; add a default item and a reset.",
      },
      pitfalls: [
        "A design that works from reset can still get stuck if it ever finds itself in an unused code.",
        "Fixing only the syntax in a find-the-errors question: the missing defaults, resets and sensitivity lists are errors too.",
      ],
      recall: [
        { q: "Symptom of `always @(st)` for next-state logic that reads x?", a: "The block is not triggered when only x changes, so nst is not updated: not the expected circuit." },
        { q: "Which assignment operator belongs in the state register block?", a: "Non-blocking `<=`." },
        { q: "What does an incomplete if/case in a combinational block infer?", a: "A latch." },
      ],
    },
  ],
  playbook: [
    "If you must **write an FSM module**: `parameter` codes → `reg [k-1:0] st, nst;` → clocked block with reset and `st <= nst` → `always @*` with `nst = st;`, a case item per state and `default` → output assign/case with defaults.",
    "If asked for an **asynchronous reset**: put the reset in the sensitivity list (`posedge rst`, or `negedge rst_n` for active-low) and test it first; a synchronous reset only uses `posedge clk`.",
    "If you must **trace code**: keep a table of st, inputs, nst, output per edge; evaluate the case item of the current st with the input sampled at the edge.",
    "If **an input appears in the output expression**: Mealy.",
    "If asked to use **assign statements only** for the next-state logic: encode, build the encoded table, K-map each next-state bit, write `assign n_i = …;` with ~ & | ^.",
    "If you see **no default / missing else** in `always @*`: latch. **No default case** with unused codes: the FSM can get stuck. **`=` in the clocked block**: order-dependent behaviour. **`@(st)` only**: block not triggered by input changes.",
    "If the state register is **narrower than the constants**: truncation makes states collide; count ⌈log₂ m⌉ bits.",
  ],
};
