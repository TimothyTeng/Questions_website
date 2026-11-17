import type { Lesson } from "@/lib/sc1005/types";

export const sequentialLesson: Lesson = {
  topic: "sequential",
  bigPicture:
    "A combinational circuit forgets: its output is a function of the present inputs only. A **sequential** circuit has **state**, so its output also depends on what happened before. The chapter builds memory from the bottom up: feed a gate's output back into its input and you get the **SR latch** (one stored bit, with an input combination that must be avoided); add an enable and an inverter and you get the **transparent D latch** (level-sensitive: it copies D while enabled); put two latches back to back and you get the **edge-triggered D flip-flop** (it takes D only at the clock edge). JK and T flip-flops are variations with their own tables. Gates take time to switch (**propagation delay**), and the **clock** sets the rhythm: period and frequency $f = 1/T$. Finally, D flip-flops sharing a clock form **registers**, and chains of registers form shift registers and FIFOs. Exam questions test the truth tables, completing timing diagrams (latch vs flip-flop, undefined regions), next-state questions on flip-flop chains, gate-delay and clock-frequency calculations, and ripple-counter timing diagrams.",
  sections: [
    {
      title: "Memory from feedback: the SR latch",
      intuition:
        "To remember a bit after the input that set it goes away, the output must hold itself in place. Cross-coupling two NOR gates gives each gate's output a path back to the other's input, so a 1 (or a 0) keeps reinforcing itself.",
      visuals: ["sr-latch"],
      keyIdeas: [
        "**Combinational**: output $= f(\\text{present inputs})$. **Sequential**: output depends on the present inputs **and** the previous inputs; the state stores enough about the past to decide how the circuit reacts.",
        "NOR SR latch: $Q = (R + \\overline{Q})'$ and $\\overline{Q} = (S + Q)'$. Inputs are **active-high**: $S = 1$ sets ($Q = 1$), $R = 1$ resets ($Q = 0$), $S = R = 0$ stores.",
        "$S = R = 1$ is **undefined**: both NOR outputs are forced to 0, so $Q = \\overline{Q} = 0$ (not complements). If $S$ and $R$ then fall **together**, the output may oscillate (0, 1, 0, …); one gate is normally a little faster so it eventually settles, but which state it settles in is **impossible to know**.",
        "Active-low SR latch: swap the NORs for NANDs. The inputs $\\overline{S}$, $\\overline{R}$ are then asserted at 0: $\\overline{S} = 0$ sets, $\\overline{R} = 0$ resets, both 1 stores, and asserting both ($\\overline{S} = \\overline{R} = 0$) is the combination to avoid.",
        "We write $Q$ for the present state and $Q^+$ for the next state.",
        "Real use: the flight-attendant call light (Call → S, Cancel → R). Problem: signals take time to travel through gates, so S and R can overlap briefly (a glitch to $SR = 11$), which motivates an **enable**.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["R", "S"],
            gates: [
              { id: "Q", type: "NOR", in: ["R", "Qn"] },
              { id: "Qn", type: "NOR", in: ["S", "Q"] },
            ],
            outputs: ["Q", "Qn"],
          },
          caption: "NOR SR latch: each gate's output feeds the other gate (Qn is $\\overline{Q}$)",
        },
        {
          kind: "table",
          head: ["S", "R", "Q+", "function"],
          rows: [
            [0, 0, "Q", "store"],
            [0, 1, 0, "reset"],
            [1, 0, 1, "set"],
            [1, 1, "?", "undefined"],
          ],
          caption: "NOR latch (active-high inputs)",
        },
        {
          kind: "table",
          head: ["$\\overline{S}$", "$\\overline{R}$", "Q+", "function"],
          rows: [
            [1, 1, "Q", "store"],
            [1, 0, 0, "reset"],
            [0, 1, 1, "set"],
            [0, 0, "?", "undefined"],
          ],
          caption: "NAND latch (active-low inputs)",
        },
      ],
      example: {
        problem: "A NOR SR latch starts with $Q = 0$. The inputs $(S, R)$ take the values $(1,0), (0,0), (0,1), (0,0), (1,1), (0,0)$ in turn. Give $Q$ after each step.",
        steps: [
          "$(1,0)$: set, $Q = 1$.",
          "$(0,0)$: store, $Q$ stays 1. This is the memory: nothing is asserted, yet the output stays high.",
          "$(0,1)$: reset, $Q = 0$. Then $(0,0)$: store, $Q = 0$.",
          "$(1,1)$: both NORs output 0, so $Q = \\overline{Q} = 0$.",
          "$(0,0)$ straight after $(1,1)$: both inputs released together, so which state the latch settles in cannot be known: **undefined** (shade it in a timing diagram).",
        ],
        answer: "$Q$: 1, 1, 0, 0, 0 ($\\overline{Q} = 0$ too), then undefined.",
      },
      pitfalls: [
        "During $S = R = 1$ a NOR latch does output $Q = 0$; the row is still marked '?' because $\\overline{Q}$ is also 0 and because releasing both together leaves the state unpredictable.",
        "Releasing $S$ and $R$ one after the other from $11$ is not the problem case: whichever stays asserted last decides the state (e.g. $11 \\to 01$ resets).",
        "For the NAND latch the combination to avoid is $\\overline{S} = \\overline{R} = 0$ (both asserted), not $11$.",
      ],
      recall: [
        { q: "What does the SR latch do when $S = R = 0$?", a: "It stores: $Q^+ = Q$, held by the feedback." },
        { q: "Outputs of a NOR SR latch while $S = R = 1$?", a: "$Q = \\overline{Q} = 0$; the next state is marked undefined." },
        { q: "Which inputs must be avoided for a NAND (active-low) SR latch?", a: "$\\overline{S} = \\overline{R} = 0$ (both asserted)." },
        { q: "Why is releasing $S = R = 1$ to $00$ a problem?", a: "The output may oscillate; one gate is a little faster, but which state it ends in is impossible to know." },
      ],
    },
    {
      title: "Gated SR latch and the transparent D latch",
      intuition:
        "An enable input lets the latch listen only when we say so, so glitches on S and R while E = 0 do no harm. Feeding S = D and R = D' through the enable gates removes the invalid case completely: that is the D latch.",
      keyIdeas: [
        "**Enabled (gated) SR latch**: AND gates pass S and R only while $E = 1$; with $E = 0$ the latch stores whatever the inputs do. It is **level-sensitive**. $E = 1$, $S = R = 1$ is still undefined.",
        "**D latch** (transparent latch): one data input; an inverter makes $R = \\overline{D}$ while $S = D$, so $S = R = 1$ can never happen.",
        "While $E = 1$ the D latch is **transparent**: $Q$ follows D. While $E = 0$ it **holds** the last value. Table: $E = 0 \\Rightarrow Q^+ = Q$; $E = 1 \\Rightarrow Q^+ = D$.",
        "**Active-low** versions are built with NANDs: an active-low D latch is transparent while $\\overline{E} = 0$ and holds while $\\overline{E} = 1$.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["D", "E"],
            gates: [
              { id: "S1", type: "AND", in: ["D", "E"] },
              { id: "R1", type: "AND", in: ["!D", "E"] },
              { id: "Q", type: "NOR", in: ["R1", "Qn"] },
              { id: "Qn", type: "NOR", in: ["S1", "Q"] },
            ],
            outputs: ["Q", "Qn"],
          },
          caption: "D latch: an enabled SR latch with $S = D$ and $R = \\overline{D}$",
        },
        {
          kind: "table",
          head: ["E", "S", "R", "Q+", "function"],
          rows: [
            [0, "X", "X", "Q", "store"],
            [1, 0, 0, "Q", "store"],
            [1, 0, 1, 0, "reset"],
            [1, 1, 0, 1, "set"],
            [1, 1, 1, "?", "undefined"],
          ],
          caption: "Enabled SR latch",
        },
        {
          kind: "table",
          head: ["E", "D", "Q+", "function"],
          rows: [
            [0, "X", "Q", "store"],
            [1, 0, 0, "transparent"],
            [1, 1, 1, "transparent"],
          ],
          caption: "D latch",
        },
      ],
      example: {
        problem: "A positive-level D latch has the enable E and data D below (one column per time unit). Sketch Q, assuming it is unknown at the start.",
        figures: [
          {
            kind: "wave",
            signals: [
              { name: "E", wave: "001111000011" },
              { name: "D", wave: "010011100110" },
            ],
            ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          },
        ],
        steps: [
          "$t = 0$–$1$: $E = 0$ and nothing has been stored yet, so $Q$ is unknown (shade it).",
          "$t = 2$–$5$: $E = 1$, transparent. $Q$ follows D: $0, 0, 1, 1$.",
          "$t = 6$–$9$: $E = 0$, hold the last value, $Q = 1$, even though D falls at $t = 7$ and rises at $t = 9$.",
          "$t = 10$–$11$: transparent again, $Q = D = 1, 0$.",
        ],
        answer: "$Q$ = x x 0 0 1 1 1 1 1 1 1 0 (x = shaded/unknown).",
      },
      pitfalls: [
        "A latch is not edge-triggered: any change of D while enabled passes straight through, including short pulses.",
        "With an active-low enable the transparent phase is when the enable pin is **0**.",
        "The enabled SR latch is still undefined for $S = R = 1$ while $E = 1$; when $E = 0$ the same inputs are ignored.",
      ],
      recall: [
        { q: "What does 'transparent' mean for a D latch?", a: "While enabled, Q follows D." },
        { q: "How does the D latch avoid the invalid SR state?", a: "An inverter makes $R = \\overline{D}$, so S and R are never both 1." },
        { q: "What does a D latch do while $E = 0$?", a: "It holds (stores) its last value." },
      ],
    },
    {
      title: "Edge-triggered flip-flops: the master–slave D flip-flop",
      intuition:
        "A chain of latches on one clock lets data race through several stages while the clock is high, so how far it gets depends on how long the clock stays high. A flip-flop changes only at the clock edge, so data moves exactly one stage per clock.",
      visuals: ["latch-vs-ff"],
      keyIdeas: [
        "Course convention: **latch** = level-sensitive, **flip-flop** = edge-triggered. Flip-flops are **positive-edge** triggered unless stated. Schematic symbol: a small **triangle** on the control input (past papers draw a negative-edge flip-flop with a bubble before the triangle).",
        "Latch chain problem: with four D latches on the same clock, a long high phase lets a new value pass through several latches in one clock; a short one may not get through even one.",
        "**Master–slave D flip-flop**: master D latch enabled while CLK = 0, slave D latch enabled while CLK = 1. While CLK = 0 the master samples D and the slave is disabled; when CLK goes high the master is disabled and the slave uses the value in the middle. So $Q$ can only change at the **rising edge**.",
        "For a **negative-edge** triggered setup, the master responds to high enable and the slave to low enable.",
        "D flip-flop: at each rising edge Q takes the value on D (the value just before the edge); between edges D can do anything without affecting Q.",
        "In synchronous design we generally use **one clock** for all the sequential components, so all outputs update only at the clock edge; this makes the circuit easier to analyse.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["D", "CLK"],
            gates: [
              { id: "Qm", type: "DLATCH", in: ["D", "!CLK"], label: "master" },
              { id: "Q", type: "DLATCH", in: ["Qm", "CLK"], label: "slave" },
            ],
            outputs: ["Q"],
          },
          caption: "Master–slave positive-edge D flip-flop from two D latches",
        },
        {
          kind: "wave",
          signals: [
            { name: "CLK", wave: "001100110011" },
            { name: "D", wave: "011010001110" },
            { name: "Q latch", wave: "xx1000000010" },
            { name: "Q FF", wave: "xx1111000011" },
          ],
          ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          marks: [2, 6, 10],
          caption: "Same D: the latch follows D while CLK = 1; the flip-flop changes only at the dashed rising edges",
        },
      ],
      example: {
        problem: "In the waveform above, explain the values of the latch and of the flip-flop at $t = 3$ and at $t = 11$.",
        steps: [
          "$t = 3$: CLK = 1, so the latch is transparent and shows D = 0. The flip-flop took D just before the edge at $t = 2$ (D = 1 at $t = 1$) and holds 1.",
          "$t = 11$: CLK = 1 again; the latch shows D = 0 (D fell at $t = 11$).",
          "The flip-flop took D = 1 just before the edge at $t = 10$ and holds 1 until the next rising edge.",
        ],
        answer: "Latch 0 and flip-flop 1 at both times: the latch tracks D during the high phase; the flip-flop holds what it took at the edge.",
      },
      pitfalls: [
        "The flip-flop uses D from **before** the edge, not the value after it.",
        "Do not draw a flip-flop output changing in the middle of a clock phase.",
        "Check whether the flip-flop is positive- or negative-edge triggered before drawing.",
      ],
      recall: [
        { q: "Difference between a latch and a flip-flop?", a: "A latch is level-sensitive (transparent while enabled); a flip-flop changes only at a clock edge." },
        { q: "In a positive-edge master–slave flip-flop, when is the master enabled?", a: "While CLK = 0; the slave is enabled while CLK = 1." },
        { q: "How do you recognise an edge-triggered input on a symbol?", a: "A small triangle on the control (clock) input." },
      ],
    },
    {
      title: "JK and T flip-flops",
      intuition:
        "The JK flip-flop behaves like set/reset at the clock edge, and turns 'both asserted' into something useful: toggle. The T flip-flop keeps only hold and toggle.",
      visuals: ["ff-types"],
      keyIdeas: [
        "**JK**: at the rising edge, Q becomes 1 if J is asserted and 0 if K is asserted; $J = K = 0$ holds, and if both J and K are asserted the output **toggles** ($Q^+ = \\overline{Q}$).",
        "**T**: Q toggles at the rising edge if $T = 1$; $T = 0$ holds.",
        "There is also a lesser seen SR flip-flop.",
        "Past papers: 'what must J and K be set to for it to toggle?' ($J = K = 1$; a JK flip-flop **does** toggle), and a T flip-flop with $T = 1$, which toggles at every rising edge.",
      ],
      figures: [
        {
          kind: "table",
          head: ["J", "K", "Q+", "function"],
          rows: [
            [0, 0, "Q", "hold"],
            [0, 1, 0, "reset"],
            [1, 0, 1, "set"],
            [1, 1, "Q'", "toggle"],
          ],
          caption: "JK flip-flop",
        },
        {
          kind: "table",
          head: ["T", "Q+", "function"],
          rows: [
            [0, "Q", "hold"],
            [1, "Q'", "toggle"],
          ],
          caption: "T flip-flop",
        },
      ],
      example: {
        problem: "A JK flip-flop starts at $Q = 0$. Before successive rising edges, $(J, K) = (1,1), (1,1), (0,0), (0,1), (1,0), (1,1)$. Give $Q$ after each edge.",
        steps: [
          "$(1,1)$ toggles: $Q = 1$. $(1,1)$ toggles again: $Q = 0$.",
          "$(0,0)$ holds: $Q = 0$.",
          "$(0,1)$ resets: $Q = 0$. $(1,0)$ sets: $Q = 1$. $(1,1)$ toggles: $Q = 0$.",
        ],
        answer: "$Q$ = 1, 0, 0, 0, 1, 0.",
      },
      pitfalls: [
        "A JK flip-flop **does** toggle (with $J = K = 1$); the exam option 'only a T flip-flop toggles' is a trap.",
        "Toggling an unknown state leaves it unknown; set and reset make it known.",
      ],
      recall: [
        { q: "What do $J = K = 1$ do at the clock edge?", a: "Q toggles." },
        { q: "What does a T flip-flop with $T = 1$ do?", a: "Q toggles at every rising edge." },
        { q: "What do $J = 0$, $K = 1$ do?", a: "Reset: $Q^+ = 0$." },
      ],
    },
    {
      title: "Completing timing diagrams for latches and flip-flops",
      intuition:
        "Every storage element answers one question at each instant: am I listening now, and if so, to what? Latches listen during a level, flip-flops only at an edge, and SR-type elements can be told something impossible.",
      visuals: ["timing-lab"],
      keyIdeas: [
        "Work column by column. For each element decide: **enabled?** (latches: level of E; flip-flops: is this an active edge?) then **what value?** (from the table).",
        "SR latch (no enable): reacts at any time. Enabled SR latch and D latch: react only while E = 1, hold while E = 0. JK and D flip-flops: change only at active edges, using the inputs just **before** the edge.",
        "Shade the output whenever it is **undefined**: SR-type element with $S = R = 1$ while listening, after $S = R = 1$ is released to $00$ together, and any element before it has ever been set, reset or clocked (initial state unknown).",
        "An undefined state ends only when the element is told a definite value (set, reset, D, or J/K not equal); toggling an unknown keeps it unknown.",
        "Tutorial 8 Q2 wiring: SR latches S = in1, R = in2; D latch and D flip-flop D = in1; JK J = in1, K = in2; clk drives every enable or clock.",
      ],
      example: {
        problem: "Complete the five outputs for the inputs below (wiring as in Tutorial 8 Q2; all outputs start unknown).",
        figures: [
          {
            kind: "wave",
            signals: [
              { name: "clk", wave: "001100110011" },
              { name: "in1", wave: "011000111001" },
              { name: "in2", wave: "000110011100" },
            ],
            ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
            marks: [2, 6, 10],
          },
        ],
        steps: [
          "SR latch (always listening): set at $t = 1$ → 1; reset at $t = 3$ → 0; set at $t = 6$ → 1; $S = R = 1$ at $t = 7$–$8$ → undefined; at $t = 9$ only R is still high, so it resets cleanly → 0; set at $t = 11$ → 1.",
          "Enabled SR latch (listens only while clk = 1: $t = 2, 3, 6, 7, 10, 11$): $t = 2$ set → 1, $t = 3$ reset → 0 (held through $t = 4$–$5$), $t = 6$ set → 1, $t = 7$ $S = R = 1$ → undefined. It stays undefined through $t = 8$–$9$ (disabled) and $t = 10$ ($S = R = 0$), until the set at $t = 11$.",
          "D latch: transparent at $t = 2,3$ (1, 0), holds 0, transparent at $t = 6,7$ (1, 1), holds 1, transparent at $t = 10, 11$ (0, 1).",
          "D flip-flop (edges at $t = 2, 6, 10$, taking in1 at $t = 1, 5, 9$): 1, 0, 0.",
          "JK flip-flop (taking $(J,K)$ at $t = 1, 5, 9$): $(1,0)$ set → 1; $(0,0)$ hold → 1; $(0,1)$ reset → 0.",
        ],
        answer: "SR: x 1 1 0 0 0 1 x x 0 0 1 · En SR: x x 1 0 0 0 1 x x x x 1 · D latch: x x 1 0 0 0 1 1 1 1 0 1 · JK: x x 1 1 1 1 1 1 1 1 0 0 · D FF: x x 1 1 1 1 0 0 0 0 0 0 (x = shaded)",
      },
      pitfalls: [
        "Forgetting the initial unknown region: until the first set/reset (latches) or first edge (flip-flops) the output is undefined.",
        "Using the input value **after** the edge for a flip-flop; always use the value in the unit before it.",
        "Shading an enabled SR latch when $S = R = 1$ occurs while $E = 0$: it is ignored then.",
      ],
      recall: [
        { q: "When is a JK flip-flop output undefined in a timing diagram?", a: "Before the first edge that sets or resets it (toggling an unknown keeps it unknown)." },
        { q: "Which elements react to an input pulse that starts and ends while clk = 0?", a: "Only the SR latch without enable." },
        { q: "Which input value does a positive-edge flip-flop use?", a: "The value just before the rising edge." },
      ],
    },
    {
      title: "Propagation delay and the clock",
      intuition:
        "Gates are not instant: a change at an input takes a short time to show at the output. The clock is the steady 0/1 signal that tells every flip-flop when to update.",
      keyIdeas: [
        "**Propagation delay**: the time it takes for a change at the input to create the change at the output. The delay through a circuit is found by **summing** the delays of the gates along the path.",
        "Different input→output pairs can have different delays (lecture: AND 4 ns, NOT 2 ns gives $a \\to f$ = 10 ns and $b \\to f$ = 8 ns). If we report a single number, we always use the **worst** (longest) path.",
        "**Clock**: a signal that continuously toggles between 0 and 1 at a fixed rate. The **period** $T$ is the time for one complete cycle; the **frequency** is $f = 1/T$.",
        "Lecture conversions: $10$ ns $\\to 100$ MHz, $1$ ns $\\to 1$ GHz, $4$ ns $\\to 250$ MHz.",
      ],
      formulas: ["f = \\frac{1}{T}"],
      example: {
        problem: "In a circuit, input a passes through a NOT (1 ns), then an AND (3 ns), then an OR (5 ns) to reach f; input b enters the same AND; input c enters the OR directly. Give the delay for each input→output pair and the single delay you would quote. Then give the frequency of a clock whose period is 9 ns.",
        steps: [
          "$a \\to f$: $1 + 3 + 5 = 9$ ns.",
          "$b \\to f$: $3 + 5 = 8$ ns. $c \\to f$: $5$ ns.",
          "Quote the worst (longest) path: 9 ns.",
          "$f = 1/T = 1/(9 \\times 10^{-9}\\text{ s}) \\approx 1.11 \\times 10^{8}$ Hz $\\approx 111$ MHz.",
        ],
        answer: "9 ns, 8 ns, 5 ns; quoted delay 9 ns; a 9 ns period is about 111 MHz.",
      },
      pitfalls: [
        "Use the **longest** path when quoting one delay for the whole circuit.",
        "Units: $1/(\\text{ns})$ is GHz; multiply by 1000 for MHz.",
      ],
      recall: [
        { q: "How do you find the propagation delay along a path?", a: "Add the delays of the gates on that path." },
        { q: "Which delay is quoted if only one number is given?", a: "The worst (longest) path." },
        { q: "Frequency of a 2.5 ns clock?", a: "400 MHz." },
      ],
    },
    {
      title: "Registers, shift registers and FIFOs",
      intuition:
        "A register is just several D flip-flops sharing a clock, one per bit. Wire each flip-flop's output to the next one's input and the values march one place per clock: a shift register (or, with multi-bit registers, a FIFO).",
      visuals: ["shift-register"],
      keyIdeas: [
        "**Register**: D flip-flops combined to store multiple bits, all on the same clock. From here on registers are the basic sequential component (even a 1-bit signal is stored in a 'register').",
        "Multi-bit values in timing diagrams are drawn without splitting up the bits, labelled in decimal or hex (make it clear which); they still change only at the rising edge.",
        "**Chain of registers** (shift register): $D_1 = Y$, $D_2 = Q_1$, … At each edge every stage takes the value its neighbour had just before the edge, so an input reaches the last of $n$ stages after $n$ edges. Before the chain fills, the later outputs are unknown.",
        "Serial-to-parallel converter: shift bits in one per clock and read the whole word. Parallel-to-serial converter: load a word, then shift it out one bit per clock.",
        "**FIFO**: the same structure with multi-bit registers. Tutorial 8 Q3 puts a bitwise inverter between two stages: every value that passes it is inverted, so the output is the input delayed by the number of registers, inverted.",
        "Next state of a D flip-flop circuit with feedback (PYP 2021-22 S1 Q1(8)): write each D from the wiring using the **present** state; all flip-flops update together, so the next state is just those D values.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["Y", "CLK"],
            gates: [
              { id: "Q1", type: "DFF", in: ["Y", "CLK"] },
              { id: "Q2", type: "DFF", in: ["Q1", "CLK"] },
              { id: "Q3", type: "DFF", in: ["Q2", "CLK"] },
              { id: "Q4", type: "DFF", in: ["Q3", "CLK"] },
            ],
            outputs: ["Q1", "Q2", "Q3", "Q4"],
          },
          caption: "Four D flip-flops (or registers) in a chain on one clock",
        },
        {
          kind: "wave",
          signals: [
            { name: "y", wave: "======", data: ["4", "6", "2", "7", "0", "3"] },
            { name: "q1", wave: "x=====", data: ["4", "6", "2", "7", "0"] },
            { name: "q2", wave: "xx====", data: ["4", "6", "2", "7"] },
            { name: "q3", wave: "xxx===", data: ["4", "6", "2"] },
            { name: "q4", wave: "xxxx==", data: ["4", "6"] },
          ],
          caption: "3-bit registers in a chain (one column per clock cycle): each stage shows the previous stage's value one edge later; hatched = unknown",
        },
      ],
      example: {
        problem: "Four 4-bit registers R1 → R2 → R3 → R4 share a clock; a bitwise inverter sits between R2 and R3 (R3 loads $\\overline{R2}$). All start at 0. The input before edges 1, 2, 3, … is 3, A, 6, F, 1 (hex). What does R4 show after edges 1 to 5?",
        steps: [
          "After edge $k$: R1 holds input $k$, R2 holds input $k-1$, R3 holds the **inverse** of input $k-2$, R4 holds the inverse of input $k-3$.",
          "Edge 1: R4 = R3 = 0 (initial). Edge 2: R4 gets R3 from edge 1, which was $\\overline{0} = $ F.",
          "Edge 3: R4 = F again ($\\overline{\\text{R2}} = \\overline{0}$ from edge 2).",
          "Edge 4: R4 = $\\overline{3}$ = C. Edge 5: R4 = $\\overline{\\text{A}}$ = 5.",
        ],
        answer: "R4: 0, F, F, C, 5: the input sequence inverted and delayed by 3 edges (the initial zeros come out as F).",
      },
      pitfalls: [
        "All registers update at the same edge: use each register's value from **before** the edge.",
        "The initial contents also travel through a FIFO: inverted zeros appear as F before the real data.",
      ],
      recall: [
        { q: "What is a register?", a: "Several D flip-flops sharing a clock, storing a multi-bit value." },
        { q: "How many clock edges until an input reaches the output of a chain of 5 registers?", a: "5." },
        { q: "In a flip-flop chain, which state do you use to work out the D inputs?", a: "The present state (all flip-flops update together)." },
      ],
    },
    {
      title: "Ripple counter timing (past-paper style)",
      intuition:
        "If a flip-flop toggles at every edge of its clock, and its output is used as the clock of the next flip-flop, each stage toggles half as often as the one before: the outputs count.",
      keyIdeas: [
        "PYP 2017-18 S1 Q4(b): three J-K flip-flops with $J = K = 1$ (so each toggles at its active edge), negative-edge triggered (bubble on the clock). FF0 is clocked by clk, FF1 by $Q_0$, FF2 by $Q_1$.",
        "Method: $Q_0$ toggles at every falling edge of clk; $Q_1$ toggles whenever $Q_0$ falls (1 → 0); $Q_2$ toggles whenever $Q_1$ falls.",
        "Reading $Q_2Q_1Q_0$ after each falling clock edge from 000 gives 001, 010, 011, 100, …: the circuit counts up in binary.",
        "Always check the edge type and which output clocks the next stage before drawing; then draw each Q changing only on an active edge of **its own** clock.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["1", "clk"],
            gates: [
              { id: "Q0", type: "JKFF", in: ["1", "1", "!clk"] },
              { id: "Q1", type: "JKFF", in: ["1", "1", "!Q0"] },
              { id: "Q2", type: "JKFF", in: ["1", "1", "!Q1"] },
            ],
            outputs: ["Q0", "Q1", "Q2"],
          },
          caption: "PYP 2017-18 S1 Q4(b) style: negative-edge J-K flip-flops with $J = K = 1$, each clocked by the previous Q",
        },
        {
          kind: "wave",
          signals: [
            { name: "clk", wave: "10101010101010101" },
            { name: "Q0", wave: "01100110011001100" },
            { name: "Q1", wave: "00011110000111100" },
            { name: "Q2", wave: "00000001111111100" },
            { name: "count", wave: "=.=.=.=.=.=.=.=.=", data: ["0", "1", "2", "3", "4", "5", "6", "7", "0"] },
          ],
          marks: [1, 3, 5, 7, 9, 11, 13, 15],
          caption: "Starting from 000 (dashed lines: falling edges of clk)",
        },
      ],
      example: {
        problem: "For the circuit above, starting from $Q_2Q_1Q_0 = 000$, what is the state after 6 falling edges of clk?",
        steps: [
          "Edge 1: $Q_0$ 0 → 1 (a rising $Q_0$ does not clock FF1): 001.",
          "Edge 2: $Q_0$ 1 → 0, which toggles $Q_1$ 0 → 1: 010. Edge 3: 011.",
          "Edge 4: $Q_0$ falls, $Q_1$ falls (1 → 0), which toggles $Q_2$: 100. Edge 5: 101. Edge 6: 110.",
        ],
        answer: "$Q_2Q_1Q_0 = 110$ (6 in binary).",
      },
      pitfalls: [
        "Only the falling edge of a stage's own clock input matters; a rising $Q_0$ does nothing to FF1 here.",
        "Do not move every output on the clk edges: $Q_1$ and $Q_2$ change only when the previous Q falls.",
      ],
      recall: [
        { q: "In PYP 2017-18 S1 Q4(b), when does $Q_1$ toggle?", a: "Whenever $Q_0$ falls from 1 to 0." },
        { q: "Why do the flip-flops toggle?", a: "$J = K = 1$." },
        { q: "State after 3 falling edges from 000?", a: "011." },
      ],
    },
  ],
  playbook: [
    "If you see an SR latch with $S = R = 1$: a NOR latch outputs $Q = \\overline{Q} = 0$; if both inputs are then released together, shade the output as undefined until the next set or reset.",
    "If you see 'complete the timing diagram' for several elements: mark the active edges first, then go column by column asking 'listening now?' and 'to what?'; start every output as unknown.",
    "If you see a JK question: $J = K = 1$ toggles; 'only T flip-flops toggle' is false.",
    "If you see a chain of D flip-flops with Q or $\\overline{Q}$ feedback and a current state: write each $D_i$ from the wiring using the **present** state, and the next state is just those D values (all flip-flops update together).",
    "If you see a gate-delay question: add the delays along each path; quote the longest path as the circuit's delay.",
    "If you see a period or frequency: $f = 1/T$ (1 ns ↔ 1 GHz, 10 ns ↔ 100 MHz).",
    "If you see a FIFO or shift register with an inverter: output = input delayed by the number of stages, inverted once per inverter; remember the initial contents come out first.",
    "If you see a ripple counter: check the edge type and which output clocks each stage; each stage toggles only on an active edge of its own clock input.",
  ],
};
