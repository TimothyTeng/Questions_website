import type { Lesson } from "@/lib/sc1005/types";

export const sequentialLesson: Lesson = {
  topic: "sequential",
  bigPicture:
    "A combinational circuit forgets: its output is a function of the present inputs only. A **sequential** circuit has **state**, so its output also depends on what happened before. The chapter builds memory from the bottom up: feed a gate's output back into its input and you get the **SR latch** (one stored bit, with a forbidden input combination); add an enable and an inverter and you get the **transparent D latch** (level-sensitive: it copies D while enabled); put two latches back to back and you get the **edge-triggered D flip-flop** (it samples D only at the clock edge). JK and T flip-flops are variations with their own characteristic equations. Once every storage element changes only at one clock edge, timing becomes a budget: **clock-to-Q + logic delay + setup** must fit in one clock period, which sets the maximum clock frequency. Finally, flip-flops sharing a clock form **registers**, chains of them form **shift registers** and FIFOs, and registers with feedback form **counters** (ripple or synchronous). Exam questions test the truth tables, completing timing diagrams (latch vs flip-flop, undefined regions), next-state questions on flip-flop chains, timing and frequency calculations, and counter sequences.",
  sections: [
    {
      title: "Memory from feedback: the SR latch",
      intuition:
        "To remember a bit after the input that set it goes away, the output must hold itself in place. Cross-coupling two NOR gates gives each gate's output a path back to the other's input, so a 1 (or a 0) keeps reinforcing itself.",
      visuals: ["sr-latch"],
      keyIdeas: [
        "**Combinational**: output $= f(\\text{present inputs})$. **Sequential**: output depends on the present inputs **and** the stored state, which summarises the past.",
        "NOR SR latch: $Q = (R + \\overline{Q})'$ and $\\overline{Q} = (S + Q)'$. Inputs are **active-high**: $S = 1$ sets ($Q = 1$), $R = 1$ resets ($Q = 0$), $S = R = 0$ stores.",
        "$S = R = 1$ is **invalid**: both NOR outputs are forced to 0, so $Q = \\overline{Q} = 0$ (not complements). If $S$ and $R$ then fall **together**, both gates see $0, 0$, both switch to 1, then both back to 0: the latch can oscillate, and which state it finally settles in depends on which gate is faster, so it is **unpredictable**.",
        "NAND SR latch: the **active-low** version ($\\overline{S}$, $\\overline{R}$). $\\overline{S} = 0$ sets, $\\overline{R} = 0$ resets, both 1 stores; $\\overline{S} = \\overline{R} = 0$ is forbidden and forces $Q = \\overline{Q} = 1$.",
        "We write $Q$ for the present state and $Q^+$ (or $Q_{next}$) for the state after the inputs act.",
        "Real use: the flight-attendant call light (Call → S, Cancel → R). Problem: unequal wire/gate delays can make S and R overlap briefly (a glitch to $SR = 11$), which motivates an **enable**.",
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
            [1, 1, "?", "invalid"],
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
            [0, 0, "?", "invalid"],
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
          "$(1,1)$: invalid. Both NORs output 0, so $Q = \\overline{Q} = 0$.",
          "$(0,0)$ straight after $(1,1)$: both inputs released together, so the next state is a race between the two gates: **undefined** (shade it in a timing diagram).",
        ],
        answer: "$Q$: 1, 1, 0, 0, 0 (invalid, $\\overline{Q} = 0$ too), then undefined.",
      },
      pitfalls: [
        "During $S = R = 1$ a NOR latch does output $Q = 0$; it is called invalid because $\\overline{Q}$ is also 0 and because releasing both together leaves the state unpredictable.",
        "Releasing $S$ and $R$ one after the other from $11$ is **not** a race: whichever stays asserted last decides the state (e.g. $11 \\to 01$ resets).",
        "For the NAND latch the forbidden combination is $\\overline{S} = \\overline{R} = 0$ and it forces both outputs to **1**, not 0.",
      ],
      recall: [
        { q: "What does the SR latch do when $S = R = 0$?", a: "It stores: $Q^+ = Q$, held by the feedback." },
        { q: "Outputs of a NOR SR latch while $S = R = 1$?", a: "$Q = \\overline{Q} = 0$; the state is invalid." },
        { q: "Which inputs are forbidden for a NAND SR latch, and what do the outputs show?", a: "$\\overline{S} = \\overline{R} = 0$; both outputs are 1." },
        { q: "Why is releasing $S = R = 1$ to $00$ a problem?", a: "Both gates switch at once and may oscillate; the final state depends on which gate is faster, so it is unpredictable." },
      ],
    },
    {
      title: "Gated SR latch and the transparent D latch",
      intuition:
        "An enable input lets the latch listen only when we say so, so glitches on S and R while E = 0 do no harm. Feeding S = D and R = D' through the enable gates removes the invalid case completely: that is the D latch.",
      keyIdeas: [
        "**Enabled (gated) SR latch**: AND gates pass S and R only while $E = 1$; with $E = 0$ the latch stores whatever the inputs do. It is **level-sensitive**. $E = 1$, $S = R = 1$ is still invalid.",
        "**D latch** (transparent latch): one data input; internally $S = D$, $R = \\overline{D}$, so $S = R = 1$ can never happen.",
        "While $E = 1$ the D latch is **transparent**: $Q$ follows D (after a gate delay). While $E = 0$ it **holds** the last value. Table: $E = 0 \\Rightarrow Q^+ = Q$; $E = 1 \\Rightarrow Q^+ = D$.",
        "Characteristic equation of the D latch: $Q^+ = ED + \\overline{E}Q$ (a 2-to-1 multiplexer with feedback).",
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
            [1, 1, 1, "?", "invalid"],
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
      formulas: ["Q^+ = ED + \\overline{E}\\,Q"],
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
        answer: "$Q$ = x x 0 0 1 1 1 1 1 1 1 0.",
      },
      pitfalls: [
        "A latch is not edge-triggered: any change of D while enabled passes straight through, including glitches.",
        "With an active-low enable the transparent phase is when the enable pin is **0**.",
        "The enabled SR latch is still invalid for $S = R = 1$ while $E = 1$; when $E = 0$ the same inputs are harmless.",
      ],
      recall: [
        { q: "What does 'transparent' mean for a D latch?", a: "While enabled, Q follows D continuously." },
        { q: "How does the D latch avoid the invalid SR state?", a: "An inverter makes $R = \\overline{D}$, so S and R are never both 1." },
        { q: "Characteristic equation of a positive D latch?", a: "$Q^+ = ED + \\overline{E}Q$." },
      ],
    },
    {
      title: "Edge-triggered flip-flops: the master–slave D flip-flop",
      intuition:
        "A chain of latches on one clock lets data race through several stages while the clock is high, so how far it gets depends on the pulse width. A flip-flop changes only at the clock edge, so data moves exactly one stage per clock.",
      visuals: ["latch-vs-ff"],
      keyIdeas: [
        "Course convention: **latch** = level-sensitive, **flip-flop** = edge-triggered. Flip-flops are **positive-edge** triggered unless stated. Schematic symbol: a small **triangle** on the clock input (a bubble before it means falling edge).",
        "Latch chain problem: with four D latches on the same clock, a long high phase lets a new value pass through several latches in one clock; a short one may not even get through one. The behaviour depends on the pulse width.",
        "**Master–slave D flip-flop**: master D latch enabled while CLK = 0, slave D latch enabled while CLK = 1. While CLK = 0 the master tracks D and the slave holds; at the rising edge the master closes (freezing D) and the slave copies it. So $Q$ can only change at the **rising edge**.",
        "Swap the enables (master on CLK = 1, slave on CLK = 0) and you get a **negative-edge** triggered flip-flop.",
        "D flip-flop: $Q^+ = D$, evaluated with the value of D **just before** the active edge; between edges D can do anything without affecting Q.",
        "In synchronous design every flip-flop shares one clock, so all state changes happen at the same instants; this is what makes circuits analysable.",
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
          "$t = 3$: CLK = 1, so the latch is transparent and shows D = 0. The flip-flop sampled D just before the edge at $t = 2$ (D = 1 at $t = 1$) and holds 1.",
          "$t = 11$: CLK = 1 again; the latch shows D = 0 (D fell at $t = 11$).",
          "The flip-flop sampled D = 1 just before the edge at $t = 10$ and holds 1 until the next rising edge.",
        ],
        answer: "Latch 0 and flip-flop 1 at both times: the latch tracks D during the high phase; the flip-flop holds what it sampled at the edge.",
      },
      pitfalls: [
        "The flip-flop uses D from **before** the edge. If D changes exactly at the edge, the exam waveform will avoid it (or it is a setup/hold violation).",
        "Do not draw a flip-flop output changing in the middle of a clock phase (apart from asynchronous preset/clear).",
        "A bubble on the clock input means falling-edge triggered; check the symbol before drawing.",
      ],
      recall: [
        { q: "Difference between a latch and a flip-flop?", a: "A latch is level-sensitive (transparent while enabled); a flip-flop changes only at a clock edge." },
        { q: "In a positive-edge master–slave flip-flop, when is the master enabled?", a: "While CLK = 0; the slave is enabled while CLK = 1." },
        { q: "How do you recognise an edge-triggered input on a symbol?", a: "A small triangle on the clock pin (with a bubble for falling edge)." },
      ],
    },
    {
      title: "JK and T flip-flops, characteristic equations, asynchronous preset and clear",
      intuition:
        "The JK flip-flop is an SR flip-flop that turns the forbidden input into something useful: toggle. The T flip-flop keeps only hold and toggle, which is exactly what a counter bit needs.",
      visuals: ["ff-types"],
      keyIdeas: [
        "**JK**: at the active edge, $J = 1$ sets, $K = 1$ resets, $J = K = 0$ holds, and $J = K = 1$ **toggles** ($Q^+ = \\overline{Q}$).",
        "**T**: $T = 0$ holds, $T = 1$ toggles. A JK with $J = K = T$ is a T flip-flop; a T flip-flop with $T = 1$ divides the clock frequency by 2.",
        "A JK with $J = D$, $K = \\overline{D}$ behaves as a D flip-flop; a D flip-flop with $D = T \\oplus Q$ behaves as a T flip-flop.",
        "Characteristic equations (what the next state is): $Q^+ = D$; $Q^+ = J\\overline{Q} + \\overline{K}Q$; $Q^+ = T \\oplus Q$; SR flip-flop $Q^+ = S + \\overline{R}Q$ with $SR = 0$.",
        "**Asynchronous** preset and clear (usually active-low $\\overline{PRE}$, $\\overline{CLR}$) force $Q = 1$ or $Q = 0$ **immediately**, without waiting for a clock edge, and override the clock while asserted. They are used to initialise state; synchronous inputs act only at edges.",
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
        {
          kind: "kmap",
          vars: ["J", "K", "Q"],
          values: "01001110",
          groups: ["JQ'", "K'Q"],
          showIndex: true,
          caption: "$Q^+$ of the JK flip-flop from its table: $Q^+ = J\\overline{Q} + \\overline{K}Q$",
        },
      ],
      formulas: ["Q^+_{D} = D \\qquad Q^+_{JK} = J\\overline{Q} + \\overline{K}Q \\qquad Q^+_{T} = T \\oplus Q"],
      example: {
        problem: "A JK flip-flop starts at $Q = 0$. Before successive rising edges, $(J, K) = (1,1), (1,1), (0,0), (0,1), (1,0), (1,1)$. Give $Q$ after each edge, and check the third step with the characteristic equation.",
        steps: [
          "$(1,1)$ toggles: $Q = 1$. $(1,1)$ toggles again: $Q = 0$.",
          "$(0,0)$ holds: $Q = 0$. Check: $Q^+ = J\\overline{Q} + \\overline{K}Q = 0\\cdot1 + 1\\cdot0 = 0$.",
          "$(0,1)$ resets: $Q = 0$. $(1,0)$ sets: $Q = 1$. $(1,1)$ toggles: $Q = 0$.",
        ],
        answer: "$Q$ = 1, 0, 0, 0, 1, 0.",
      },
      pitfalls: [
        "A JK flip-flop **does** toggle (with $J = K = 1$); the exam option 'only a T flip-flop toggles' is a trap.",
        "Asynchronous clear acts at once and keeps Q at 0 until released; after release Q changes again only at the next clock edge.",
        "Toggle from an unknown state stays unknown; set/reset make it known.",
      ],
      recall: [
        { q: "Characteristic equation of the JK flip-flop?", a: "$Q^+ = J\\overline{Q} + \\overline{K}Q$." },
        { q: "What does a T flip-flop with $T = 1$ do to the clock frequency?", a: "Its output toggles every edge: frequency halved." },
        { q: "How does an asynchronous clear differ from a synchronous one?", a: "Asynchronous acts immediately; synchronous only at the next active clock edge." },
        { q: "J and K inputs that make a JK behave like a D flip-flop?", a: "$J = D$, $K = \\overline{D}$." },
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
        "Shade (hatch) the output whenever it is **undefined**: SR-type element with $S = R = 1$ while listening, after $S = R = 1$ is released to $00$ together, and any element before it has ever been set, reset or clocked (initial state unknown).",
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
          "D flip-flop (edges at $t = 2, 6, 10$, sampling in1 at $t = 1, 5, 9$): 1, 0, 0.",
          "JK flip-flop (sampling $(J,K)$ at $t = 1, 5, 9$): $(1,0)$ set → 1; $(0,0)$ hold → 1; $(0,1)$ reset → 0.",
        ],
        answer: "SR: x 1 1 0 0 0 1 x x 0 0 1 · En SR: x x 1 0 0 0 1 x x x x 1 · D latch: x x 1 0 0 0 1 1 1 1 0 1 · JK: x x 1 1 1 1 1 1 1 1 0 0 · D FF: x x 1 1 1 1 0 0 0 0 0 0",
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
      title: "Propagation delay, the clock and timing constraints",
      intuition:
        "Gates are not instant, so a flip-flop's new output needs time to travel through logic to the next flip-flop. The clock period must be long enough for the slowest path, and the fastest path must not disturb the capture at the same edge.",
      visuals: ["timing-budget"],
      keyIdeas: [
        "**Propagation delay** $t_p$: time from an input change to the resulting output change. Along a path, delays **add**; a circuit's quoted delay is its **worst** (longest) path. Different input→output pairs can have different delays (e.g. AND 4 ns, NOT 2 ns: path $a \\to f$ 10 ns, $b \\to f$ 8 ns).",
        "**Clock**: period $T$ (one full cycle), frequency $f = 1/T$. $10$ ns $\\to 100$ MHz, $4$ ns $\\to 250$ MHz, $1$ ns $\\to 1$ GHz.",
        "**Clock-to-Q** $t_{cq}$: delay from the active edge to the new Q. **Setup time** $t_{su}$: D must be stable this long **before** the edge. **Hold time** $t_h$: D must stay stable this long **after** the edge. Violating either can make the flip-flop metastable (undefined).",
        "**Setup constraint** (sets the maximum frequency): $T \\ge t_{cq} + t_{comb,max} + t_{su}$, so $f_{max} = 1/(t_{cq} + t_{comb,max} + t_{su})$. The longest register-to-register path is the **critical path**.",
        "**Hold constraint** (independent of the clock period): $t_{cq} + t_{comb,min} \\ge t_h$. A hold violation cannot be fixed by slowing the clock; add delay to the short path instead.",
      ],
      formulas: ["f = \\frac{1}{T}, \\qquad T_{min} = t_{cq} + t_{comb,max} + t_{su}, \\qquad f_{max} = \\frac{1}{T_{min}}", "t_{cq} + t_{comb,min} \\ge t_{h}"],
      example: {
        problem: "Two flip-flops have $t_{cq} = 1.0$ ns, $t_{su} = 1.25$ ns and $t_h = 0.5$ ns. Between them, one path goes through an XOR (1.5 ns), an AND (1.0 ns) and an OR (1.5 ns); the other goes through a single AND (1.0 ns). Find $f_{max}$ and check hold.",
        steps: [
          "Longest path: $1.5 + 1.0 + 1.5 = 4.0$ ns; shortest: $1.0$ ns.",
          "$T_{min} = 1.0 + 4.0 + 1.25 = 6.25$ ns.",
          "$f_{max} = 1/6.25\\text{ ns} = 0.16$ GHz $= 160$ MHz.",
          "Hold: $t_{cq} + t_{comb,min} = 1.0 + 1.0 = 2.0 \\ge 0.5$ ns: met.",
        ],
        answer: "$f_{max} = 160$ MHz; no hold problem.",
      },
      pitfalls: [
        "Use the **longest** path for $f_{max}$ and the **shortest** path for hold.",
        "Do not forget $t_{cq}$ and $t_{su}$: the clock period is not just the logic delay.",
        "Units: $1/(\\text{ns}) = $ GHz; multiply by 1000 for MHz.",
      ],
      recall: [
        { q: "Setup time?", a: "How long D must be stable before the clock edge." },
        { q: "Formula for the minimum clock period?", a: "$T_{min} = t_{cq} + t_{comb,max} + t_{su}$." },
        { q: "Can a hold violation be fixed by lowering the clock frequency?", a: "No: the hold check does not involve $T$." },
        { q: "Frequency of a 2.5 ns clock?", a: "400 MHz." },
      ],
    },
    {
      title: "Registers, shift registers and FIFOs",
      intuition:
        "A register is just several D flip-flops sharing a clock, one per bit. Wire each flip-flop's output to the next one's input and the bits march one place per clock: a shift register. Close the loop and it becomes a ring or Johnson counter.",
      visuals: ["shift-register"],
      keyIdeas: [
        "**Register**: $n$ D flip-flops with a common clock store an $n$-bit word. Multi-bit values in timing diagrams are drawn as a bus with hex or decimal labels; they still change only at the edge.",
        "**Load / enable** without gating the clock: put a 2-to-1 MUX in front of each D: $D_i = LD\\cdot I_i + \\overline{LD}\\cdot Q_i$ (reload its own value when not loading).",
        "**Shift register**: $D_0 = $ serial in, $D_{i} = Q_{i-1}$. An input bit reaches the last stage of an $n$-bit register after $n$ edges.",
        "Kinds: **SISO** (serial in, serial out: a delay line), **SIPO** (serial in, parallel out: serial-to-parallel converter, receiver), **PISO** (parallel load then shift out: parallel-to-serial, sender), **PIPO** (an ordinary register).",
        "**Ring counter**: $D_0 = Q_{n-1}$; circulates a single 1; $n$ states (mod-$n$), needs initialising. **Johnson (twisted-ring)**: $D_0 = \\overline{Q_{n-1}}$; $2n$ states (4-bit, written $Q_3Q_2Q_1Q_0$ with $Q_0$ fed from $\\overline{Q_3}$: 0000, 0001, 0011, 0111, 1111, 1110, 1100, 1000).",
        "**FIFO** of registers: the same chain with multi-bit registers (Tutorial 8 Q3). Inserting a bitwise inverter between two stages inverts every value that passes; output = input delayed by the number of registers, possibly inverted.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["Din", "CLK"],
            gates: [
              { id: "Q0", type: "DFF", in: ["Din", "CLK"] },
              { id: "Q1", type: "DFF", in: ["Q0", "CLK"] },
              { id: "Q2", type: "DFF", in: ["Q1", "CLK"] },
              { id: "Q3", type: "DFF", in: ["Q2", "CLK"] },
            ],
            outputs: ["Q0", "Q1", "Q2", "Q3"],
          },
          caption: "4-bit shift register (serial in, parallel and serial out)",
        },
        {
          kind: "circuit",
          circuit: {
            inputs: ["CLK"],
            gates: [
              { id: "Q0", type: "DFF", in: ["Q3.qn", "CLK"] },
              { id: "Q1", type: "DFF", in: ["Q0", "CLK"] },
              { id: "Q2", type: "DFF", in: ["Q1", "CLK"] },
              { id: "Q3", type: "DFF", in: ["Q2", "CLK"] },
            ],
            outputs: ["Q3"],
          },
          caption: "4-bit Johnson counter: $D_0 = \\overline{Q_3}$, 8 states",
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
        "Gating the clock to make an enable is wrong in synchronous design; use the MUX-feedback form.",
        "Direction matters: say which way the register shifts before writing next states.",
        "The initial contents also travel through a FIFO: inverted zeros appear as F before the real data.",
      ],
      recall: [
        { q: "How many states does an $n$-bit Johnson counter have?", a: "$2n$." },
        { q: "How many clock edges until a bit entered serially reaches the output of a 5-bit SISO?", a: "5." },
        { q: "Next-state input of a register bit with load enable?", a: "$D = LD\\cdot I + \\overline{LD}\\cdot Q$." },
      ],
    },
    {
      title: "Counters: ripple vs synchronous, sequences and modulus",
      intuition:
        "A counter is a register that adds 1 every clock. Bit 0 toggles every clock; bit $i$ toggles when all lower bits are 1 (counting up). A ripple counter lets each bit clock the next, which is cheap but slow; a synchronous counter clocks every bit together.",
      visuals: ["counters"],
      keyIdeas: [
        "**Ripple (asynchronous) counter**: T (or JK with $J = K = 1$) flip-flops; only bit 0 gets the clock, each later bit is clocked by the previous bit. Falling-edge flip-flops clocked by $Q$ (or rising-edge clocked by $\\overline{Q}$) count **up**; rising-edge clocked by $Q$ count **down**.",
        "Each stage adds a clock-to-Q delay, so the last bit settles after $n \\cdot t_{cq}$. During the ripple the outputs pass through **transient wrong values** (e.g. 0111 → 0110 → 0100 → 0000 → 1000), which can glitch any logic decoding the count.",
        "**Synchronous counter**: all flip-flops share the clock; bit $i$ toggles when all lower bits are 1: $T_0 = 1$, $T_1 = Q_0$, $T_2 = Q_0Q_1$, $T_3 = Q_0Q_1Q_2$ (down counter: complements). All bits change together after one $t_{cq}$.",
        "An $n$-bit binary counter is **mod-$2^n$** (counts $0$ to $2^n - 1$). A mod-$N$ counter needs $\\lceil \\log_2 N \\rceil$ flip-flops (ring: $N$, Johnson: $N/2$).",
        "Mod-$N$ by **asynchronous clear**: decode the first unwanted value $N$ and clear. The count reaches $N$ only for a moment, so the stable states are $0 \\dots N-1$ (e.g. clear on $Q_3Q_1$ → decade counter).",
        "Each counter bit is a frequency divider: $Q_i$ has frequency $f_{clk}/2^{i+1}$.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["1", "CLK"],
            gates: [
              { id: "Q0", type: "TFF", in: ["1", "CLK"] },
              { id: "Q1", type: "TFF", in: ["1", "Q0.qn"] },
              { id: "Q2", type: "TFF", in: ["1", "Q1.qn"] },
            ],
            outputs: ["Q0", "Q1", "Q2"],
          },
          caption: "3-bit ripple up-counter: rising-edge T flip-flops, each clocked by the previous $\\overline{Q}$",
        },
        {
          kind: "circuit",
          circuit: {
            inputs: ["1", "CLK"],
            gates: [
              { id: "Q0", type: "TFF", in: ["1", "CLK"] },
              { id: "Q1", type: "TFF", in: ["Q0", "CLK"] },
              { id: "T2", type: "AND", in: ["Q0", "Q1"] },
              { id: "Q2", type: "TFF", in: ["T2", "CLK"] },
            ],
            outputs: ["Q0", "Q1", "Q2"],
          },
          caption: "3-bit synchronous up-counter: common clock, $T_2 = Q_0Q_1$",
        },
        {
          kind: "wave",
          signals: [
            { name: "CLK", wave: "010101010101010101" },
            { name: "Q0", wave: "011001100110011001" },
            { name: "Q1", wave: "000111100001111000" },
            { name: "Q2", wave: "000000011111111000" },
          ],
          caption: "Ideal 3-bit up-count 0, 1, 2, …, 7, 0 (delays ignored): each bit has half the frequency of the one before",
        },
      ],
      example: {
        problem: "A 4-bit ripple up-counter has an active-low asynchronous clear driven by NAND($Q_3$, $Q_1$). Starting from 0, which states does it cycle through, and what is its modulus?",
        steps: [
          "The NAND output goes low (clear) when $Q_3 = Q_1 = 1$; the first count with both set is $1010_2 = 10$.",
          "Counting 0, 1, …, 9 never has $Q_3 = Q_1 = 1$ (8 = 1000, 9 = 1001).",
          "At 10 the clear acts at once, so 10 lasts only a gate delay and the counter returns to 0.",
        ],
        answer: "States 0 to 9: a mod-10 (decade) counter, with a brief glitch through 1010.",
      },
      pitfalls: [
        "Decide up or down from the clock edge and whether the next stage is clocked by $Q$ or $\\overline{Q}$; do not assume 'ripple = up'.",
        "The decoded value in a mod-$N$ asynchronous-clear counter is $N$, not $N - 1$.",
        "Ripple settling grows with $n$: maximum reliable read rate is about $1/(n\\,t_{cq})$.",
      ],
      recall: [
        { q: "Toggle input of bit 3 of a synchronous binary up-counter?", a: "$T_3 = Q_0Q_1Q_2$." },
        { q: "How many flip-flops for a mod-100 binary counter?", a: "7 ($2^7 = 128 \\ge 100$)." },
        { q: "Why do ripple counters produce transient wrong counts?", a: "The bits change one after another, each a flip-flop delay after the previous one." },
        { q: "Frequency of $Q_2$ in a binary counter clocked at 16 MHz?", a: "$16/2^3 = 2$ MHz." },
      ],
    },
  ],
  playbook: [
    "If you see an SR latch with $S = R = 1$: outputs both 0 (NOR) or both 1 (NAND); if both inputs are then released together, shade the output as undefined until the next set or reset.",
    "If you see 'complete the timing diagram' for several elements: mark the active edges first, then go column by column asking 'listening now?' and 'to what?'; start every output as unknown.",
    "If you see a JK question: $J = K = 1$ toggles; $Q^+ = J\\overline{Q} + \\overline{K}Q$; 'only T flip-flops toggle' is false.",
    "If you see a chain of D flip-flops with Q or $\\overline{Q}$ feedback and a current state: write each $D_i$ from the wiring using the **present** state, and the next state is just those D values (all flip-flops update together).",
    "If you see a maximum clock frequency question: find the longest flip-flop-to-flip-flop path, $f_{max} = 1/(t_{cq} + t_{comb,max} + t_{su})$; check hold with the shortest path.",
    "If you see a FIFO or shift register with an inverter: output = input delayed by the number of stages, inverted once per inverter; remember the initial contents come out first.",
    "If you see a ripple counter: check the edge type and whether each stage is clocked by $Q$ or $\\overline{Q}$ to decide up or down; settling time is $n \\cdot t_{cq}$.",
    "If you see a mod-$N$ counter with asynchronous clear: the decoded state is $N$, it appears only momentarily, and the modulus is $N$.",
    "If you see ring vs Johnson: ring = $n$ states, Johnson = $2n$ states, binary = $2^n$ states.",
  ],
};
