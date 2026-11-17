import type { Lesson } from "@/lib/sc1005/types";

// Ch 1 · Introduction to digital systems. Sources: SC1005 week 1 summary (F0-x), key concepts (week 1-6),
// Tutorial 1, L1 slides (3-x), digital-circuits slides (6-x), PLD slides (7-x), Verilog/sequential slides, Lab 3 manual.

const ANALOG_VS_DIGITAL_SVG = `<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="10">
<g fill="none" stroke="currentColor" stroke-opacity="0.35"><line x1="15" y1="105" x2="160" y2="105"/><line x1="15" y1="10" x2="15" y2="105"/><line x1="180" y1="105" x2="325" y2="105"/><line x1="180" y1="10" x2="180" y2="105"/></g>
<path d="M15 80 C 40 20, 60 20, 80 55 S 120 100, 160 40" fill="none" stroke="var(--accent)" stroke-width="2.2"/>
<g stroke="currentColor" stroke-opacity="0.15">${[25, 40, 55, 70, 85, 100].map((y) => `<line x1="180" y1="${y - 15}" x2="325" y2="${y - 15}"/>`).join("")}</g>
<path d="M180 70 h14.5 v-30 h14.5 v-15 h14.5 v15 h14.5 v30 h14.5 v15 h14.5 v0 h14.5 v-30 h14.5 v-30 h14.5 v-15" fill="none" stroke="var(--good)" stroke-width="2.2"/>
<text x="88" y="124" text-anchor="middle" fill="currentColor">analog: any value, continuously</text>
<text x="252" y="124" text-anchor="middle" fill="currentColor">digital: discrete steps (levels)</text>
<text x="10" y="12" text-anchor="end" fill="currentColor">V</text></svg>`;

const LOGIC_LEVELS_SVG = `<svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="11">
<rect x="50" y="10" width="110" height="90" fill="var(--good)" fill-opacity="0.25"/>
<rect x="50" y="100" width="110" height="36" fill="var(--warn)" fill-opacity="0.3"/>
<rect x="50" y="136" width="110" height="24" fill="var(--accent)" fill-opacity="0.25"/>
<g fill="currentColor" text-anchor="end"><text x="44" y="14">5.0 V</text><text x="44" y="104">2.0 V</text><text x="44" y="140">0.8 V</text><text x="44" y="164">0 V</text></g>
<g fill="currentColor"><text x="105" y="58" text-anchor="middle" font-weight="700">logic 1</text><text x="105" y="122" text-anchor="middle">indeterminate</text><text x="105" y="152" text-anchor="middle" font-weight="700">logic 0</text>
<text x="168" y="58">any voltage here</text><text x="168" y="71">is logic 1</text><text x="168" y="122">neither a valid</text><text x="168" y="134">0 nor a valid 1</text></g>
<line x1="50" y1="10" x2="50" y2="160" stroke="currentColor"/></svg>`;

const PULSE_SVG = `<svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="10">
<g stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"><line x1="20" y1="110" x2="350" y2="110"/><line x1="20" y1="30" x2="350" y2="30"/><line x1="20" y1="70" x2="350" y2="70"/><line x1="20" y1="102" x2="350" y2="102"/><line x1="20" y1="38" x2="350" y2="38"/></g>
<path d="M20 110 H60 L80 30 H170 L190 110 H250 L270 30 H330" fill="none" stroke="var(--accent)" stroke-width="2.2"/>
<g fill="currentColor"><text x="352" y="33">100%</text><text x="352" y="41" font-size="8">90%</text><text x="352" y="73">50%</text><text x="352" y="105" font-size="8">10%</text><text x="352" y="113">0%</text></g>
<g stroke="var(--good)" stroke-width="1.4"><line x1="62" y1="125" x2="78" y2="125"/><line x1="172" y1="125" x2="188" y2="125"/><line x1="70" y1="10" x2="260" y2="10"/></g>
<g fill="var(--good)" text-anchor="middle"><text x="70" y="138">t_r</text><text x="180" y="138">t_f</text><text x="165" y="20">period T (one complete cycle)</text></g></svg>`;

export const introLesson: Lesson = {
  topic: "intro",
  bigPicture:
    "Digital systems represent quantities in **discrete steps** instead of continuously varying values. Numbers are held as bits, and each bit is carried as a voltage that only has to fall inside the **logic-0** or the **logic-1** range. This chapter covers the key ideas of week 1: analog vs digital representation; how many bits a number needs (straight binary, BCD, ASCII); the logic-level voltage ranges (TTL, CMOS); timing waveforms (period, frequency, rise and fall time, propagation delay); **serial vs parallel** data transfer (speed versus cost); and the integrated circuits, programmable logic devices and design software used to build digital circuits. Exam questions on this material are short calculations: largest value or number of bits, reading logic levels, period and frequency, rise time and delays, and serial vs parallel transfer time.",
  sections: [
    {
      title: "Analog vs digital representation",
      intuition:
        "An analog quantity can take any value in a continuous range; a digital quantity changes in discrete steps. The lecture's picture (F0-4) shows a smooth analog curve with a digital staircase following it.",
      keyIdeas: [
        "**Analog**: the value varies **continuously** and can take any value in its range (the smooth curve on slide F0-4).",
        "**Digital**: the value changes in **discrete steps** (the staircase on F0-4). An analog quantity can be represented in digital format by approximating it with such steps.",
        "Lecture illustration (F0-5, F0-6): a phone turns the caller's voice (analog) into a digital signal for the tower. At the other end the digital signal, even with noise picked up on the way, is turned back into clean sound. A purely analog signal keeps the noise.",
        "Why the digital signal survives the noise: the receiver only has to decide whether each bit is a 0 or a 1, i.e. which voltage **range** the signal is in (see the logic-level section). Noise that does not push the voltage out of its range does not change the bit.",
      ],
      figures: [{ kind: "svg", svg: ANALOG_VS_DIGITAL_SVG, caption: "Slide F0-4: the same signal as a continuous analog curve (left) and as discrete digital steps (right)" }],
      example: {
        problem: "Classify each as analog or digital: (a) the voltage across a charging capacitor; (b) the number of grains of sand on a beach; (c) the position of a dimmer knob; (d) the reading on a 3-digit digital voltmeter.",
        steps: [
          "(a) The voltage rises smoothly through every intermediate value: **analog**.",
          "(b) Grains can only be counted in whole units: **digital** (discrete), even though the count is huge.",
          "(c) The knob can be turned to any angle: **analog**.",
          "(d) The display can show only 1000 different readings (000–999): **digital**, although the voltage it measures is analog.",
        ],
        answer: "(a) analog, (b) digital, (c) analog, (d) digital.",
      },
      pitfalls: [
        "\"Digital\" is about discrete steps: a count of objects is digital; a smoothly changing voltage is analog, even if a digital display later shows it as a number.",
      ],
      recall: [
        { q: "Why is a digital signal less affected by noise?", a: "The receiver only has to decide which **range** (logic 0 or logic 1) the voltage falls in; small noise does not move it out of that range, so the bit is recovered." },
        { q: "In the F0-6 illustration, what happens to noise on a purely analog signal?", a: "It stays in the signal all the way to the listener; the digital signal is turned back into clean sound." },
      ],
    },
    {
      title: "Representing numbers: bits, largest value and bits needed",
      intuition:
        "Binary is positional like decimal, but each place is worth twice the one to its right. $N$ bits can count from $0$ to $2^N - 1$; BCD spends 4 bits per decimal digit, so the same bits reach a smaller number.",
      visuals: ["bit-capacity"],
      keyIdeas: [
        "Place values (weights) of an integer: $\\dots, 2^4 = 16, 2^3 = 8, 2^2 = 4, 2^1 = 2, 2^0 = 1$. The leftmost bit is the **MSB**, the rightmost the **LSB**.",
        "Counting in binary follows the binary counting sequence (000, 001, 010, …, 111 for 3 bits). A truth table lists its $2^N$ input combinations in this order (slide 3-5).",
        "With $N$ bits there are $2^N$ different values, from $0$ to $2^N - 1$. Tutorial 1 Q1: 16 bits reach $65\\,535$.",
        "**Bits needed** for integers $0$ to $X$: the smallest $N$ with $2^N - 1 \\ge X$ (Tutorial 1 Q2: up to $350\\,000$ needs 19 bits). Estimate with $\\log_2 x = \\log_{10} x / \\log_{10} 2 \\approx 3.32\\log_{10} x$, then check the two powers of 2 either side.",
        "An unsigned $d$-digit decimal integer needs: in **straight binary**, the smallest $N$ with $2^N \\ge 10^d$ (about $3.32\\,d$ bits, rounded up); in **BCD**, $4d$ bits (4 bits per decimal digit, F0-19); in **ASCII**, $7d$ bits (7 bits per character, F0-20). Past papers ask exactly this (PYP 2016-17 S1, 2017-18 S1, 2020-21 S2).",
        "Largest value in $N$ bits: binary $2^N - 1$; BCD (with $N$ a multiple of 4) $10^{N/4} - 1$ (Tutorial 1 Q1: 65 535 vs 9999). BCD only uses 0000–1001 in each 4-bit group, so 1010–1111 never appear.",
      ],
      formulas: ["N_{\\min} = \\text{smallest } N \\text{ with } 2^N - 1 \\ge X", "\\text{binary max} = 2^N - 1, \\qquad \\text{BCD max} = 10^{N/4} - 1"],
      figures: [
        {
          kind: "table",
          head: ["Decimal", "Binary $(B_3B_2B_1B_0)$", "BCD"],
          rows: [
            [0, "0000", "0000 0000"],
            [1, "0001", "0000 0001"],
            [7, "0111", "0000 0111"],
            [8, "1000", "0000 1000"],
            [9, "1001", "0000 1001"],
            [10, "1010", "0001 0000"],
            [15, "1111", "0001 0101"],
          ],
          caption: "Binary vs BCD: from 10 upward BCD needs a second digit group",
        },
      ],
      example: {
        problem: "(Tutorial 1 Q1–2 style) (a) What is the largest decimal number that 12 bits can represent in binary and in BCD? (b) How many bits are needed to represent integers up to $250\\,000_{10}$?",
        steps: [
          "(a) Binary: $2^{12} - 1 = 4095$.",
          "BCD: 12 bits = 3 decimal digits, so the largest is $999$.",
          "(b) $2^{17} = 131\\,072 < 250\\,000$; $2^{18} = 262\\,144 > 250\\,000$.",
          "So 18 bits are needed (check: $\\log_2 250\\,001 \\approx 17.93$, rounded **up**).",
        ],
        answer: "(a) 4095 (binary) and 999 (BCD); (b) 18 bits.",
      },
      pitfalls: [
        "Largest value is $2^N - 1$, not $2^N$: 8 bits hold 256 values but the biggest is 255.",
        "Always round the bit count **up**: 17.93 bits means 18.",
        "\"Not exceeding $X$\" includes $X$ itself: you need $2^N - 1 \\ge X$.",
      ],
      recall: [
        { q: "Largest number in 16 bits: binary? BCD?", a: "$65\\,535$ and $9999$ (Tutorial 1 Q1)." },
        { q: "How many bits for an unsigned 9-digit decimal integer in binary?", a: "$2^{29} = 536\\,870\\,912 < 10^9 \\le 2^{30}$, so 30 bits (BCD would need 36)." },
        { q: "Bits for an 8-digit telephone number in ASCII and in BCD?", a: "$8 \\times 7 = 56$ bits and $8 \\times 4 = 32$ bits (PYP 2017-18 S1 Q1(a)(ii))." },
      ],
    },
    {
      title: "Logic levels: representing bits with voltages",
      intuition:
        "A circuit does not need an exact voltage for a bit, only a voltage inside the right **range**. Anything in the low range is logic 0, anything in the high range is logic 1, and the range between them is indeterminate.",
      visuals: ["logic-levels"],
      keyIdeas: [
        "Boolean constants have only two values, written 1/0, HIGH/LOW or TRUE/FALSE (slide 3-2). In a circuit each value is a range of voltages.",
        "**TTL** ranges (slide 3-3): **0 to 0.8 V = logic 0**, **2.0 to 5.0 V = logic 1**. Between 0.8 V and 2.0 V is **indeterminate**: neither a valid 0 nor a valid 1.",
        "**CMOS (74AC)** ranges (slide 3-3): **0 to 1.5 V = logic 0**, **3.5 to 5.0 V = logic 1**, indeterminate between 1.5 V and 3.5 V. TTL and CMOS are the two broad logic families and their voltage ranges are incompatible (slide 6-10).",
        "Because only the range matters, noise that does not push the voltage out of its range has no effect on the bit (compare the noisy digital signal on F0-6). How much noise can be tolerated is quantified in Ch 6 as **noise margin**.",
        "A **timing diagram** shows the logic level of each signal against time (L1).",
      ],
      figures: [{ kind: "svg", svg: LOGIC_LEVELS_SVG, caption: "TTL logic-level voltage ranges (slide 3-3)" }],
      example: {
        problem: "Using the TTL ranges (0–0.8 V = 0, 2.0–5.0 V = 1), decode the voltages 0.3 V, 4.1 V, 1.4 V, 2.6 V and 0.9 V.",
        steps: [
          "0.3 V is in the low range: **0**.",
          "4.1 V is in the high range: **1**.",
          "1.4 V is between 0.8 V and 2.0 V: **indeterminate**.",
          "2.6 V is in the high range: **1**.",
          "0.9 V is just above 0.8 V: **indeterminate**.",
        ],
        answer: "0, 1, indeterminate, 1, indeterminate.",
      },
      pitfalls: [
        "A voltage in the indeterminate range is not \"half a 1\" and is not rounded to the nearer level: it is neither a valid 0 nor a valid 1.",
        "The ranges depend on the family: 3.0 V is logic 1 for TTL but indeterminate for CMOS (74AC). Use the ranges given in the question.",
      ],
      recall: [
        { q: "Is 1.7 V a valid TTL input level?", a: "No: it is in the 0.8–2.0 V indeterminate range." },
        { q: "What is 2.6 V for a CMOS (74AC) input?", a: "Indeterminate: it lies between 1.5 V and 3.5 V." },
        { q: "What does a timing diagram show?", a: "The logic level of each signal against time, so the relationship between signal changes can be seen." },
      ],
    },
    {
      title: "Timing waveforms: period, frequency, rise/fall time and propagation delay",
      intuition:
        "A clock switches between 0 and 1 at a fixed rate: its period and frequency say how fast. Real edges are not vertical, and a gate's output changes a little after its input: rise/fall time and propagation delay put numbers on that.",
      visuals: ["waveform-explorer", "prop-delay"],
      keyIdeas: [
        "A **clock** oscillates between 0 and 1 at a fixed rate. Its **period** $T$ is the time to complete one cycle, and the **frequency** is the inverse of the period, $f = 1/T$ (Sequential Circuits slide 22): 10 ns → 100 MHz, 1 ns → 1 GHz, 4 ns → 250 MHz.",
        "**Rise time** $t_r$: time for a LOW→HIGH edge to go from **10% to 90%** of the swing. **Fall time** $t_f$: from **90% to 10%** on a HIGH→LOW edge (slide 6-50).",
        "**Propagation delay**: the delay for a signal to propagate from input to output, measured between the **50%** points of the input and output edges (slide 6-50). It is quoted as one value $t_{PD}$ (an average transition delay, e.g. 9–19 ns for the 74HC00) or as two values (slide 6-49):",
        "- $t_{PHL}$: delay when the **output** changes from HIGH to LOW;\n- $t_{PLH}$: delay when the **output** changes from LOW to HIGH.",
        "Simple timing diagrams ignore these effects and draw vertical edges; the more realistic diagram on slide 3-19 shows propagation delays, rise time and fall time.",
        "Unit check: $1/1\\text{ MHz} = 1\\,\\mu\\text{s}$, $1/1\\text{ GHz} = 1$ ns, $1/50\\text{ MHz} = 20$ ns.",
      ],
      formulas: ["f = \\frac{1}{T}", "t_r = t_{90\\%} - t_{10\\%}\\ (\\text{rising}), \\qquad t_f = t_{10\\%} - t_{90\\%}\\ (\\text{falling})"],
      figures: [
        { kind: "svg", svg: PULSE_SVG, caption: "Rise and fall times use the 10% and 90% levels (slide 6-50); the period is one complete cycle" },
        {
          kind: "wave",
          signals: [
            { name: "CLK", wave: "010101010101" },
            { name: "P", wave: "011100011100" },
          ],
          ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          caption: "CLK: period 2 units. P: period 6 units (HIGH for 3, LOW for 3)",
        },
      ],
      example: {
        problem: "A clock waveform repeats every 250 ns. Its rising edge passes 0.5 V at 12 ns and 4.5 V at 20 ns (LOW = 0 V, HIGH = 5 V). Find $f$ and $t_r$.",
        steps: [
          "$f = 1/T = 1/(250\\text{ ns}) = 4$ MHz.",
          "10% of 5 V is 0.5 V and 90% is 4.5 V, so $t_r = 20 - 12 = 8$ ns.",
        ],
        answer: "4 MHz and $t_r = 8$ ns.",
      },
      pitfalls: [
        "Rise time is 10%→90%, **not** 0→100%.",
        "$t_{PHL}$ and $t_{PLH}$ are named after the **output** transition. For an inverter, $t_{PHL}$ is measured at the input's rising edge (slide 6-50).",
        "Frequency in MHz ↔ period in µs; GHz ↔ ns. Most numerical slips are unit slips.",
      ],
      recall: [
        { q: "Period of a 40 MHz clock?", a: "$25$ ns." },
        { q: "Which levels define rise time?", a: "10% and 90% of the full swing." },
        { q: "An inverter's output falls 6 ns after its input rises (50% to 50%). Which delay is that?", a: "$t_{PHL} = 6$ ns (output went HIGH→LOW)." },
      ],
    },
    {
      title: "Serial vs parallel data transfer",
      intuition:
        "To move an $N$-bit word you can send all bits at once on $N$ lines (parallel) or one after another on a single line (serial). The lecture sums up the trade-off as **speed versus cost** (F0-7).",
      visuals: ["serial-parallel"],
      keyIdeas: [
        "**Parallel**: one line per bit (the bus lines on F0-7), so all $N$ bits are transferred in **one** clock period $T$.",
        "**Serial**: one data line. The sender's parallel-to-serial converter shifts out one bit per clock period and the receiver's serial-to-parallel converter rebuilds the word (Sequential Circuits in Verilog slides 35–37). An $N$-bit word takes $N \\times T$.",
        "Trade-off: **speed versus cost** (F0-7). At the same clock, parallel is faster; serial needs only one data line, so it is cheaper.",
        "Examples from the slides: the traditional **printer port** is a **parallel** interface (8 data-out lines, F0-8); **RS232**, **Ethernet**, **Firewire** and **USB** are **serial** interfaces (F0-9).",
        "Transfer time for a block: serial $= (\\text{total bits}) \\times T$; parallel $= (\\text{total bits}/N) \\times T$.",
      ],
      formulas: ["t_{\\text{serial}} = N\\,T, \\qquad t_{\\text{parallel}} = T"],
      figures: [
        {
          kind: "wave",
          signals: [
            { name: "CLK", wave: "0101010101010101" },
            { name: "SER", wave: "1100111100000011" },
          ],
          ticks: ["", "b7", "", "b6", "", "b5", "", "b4", "", "b3", "", "b2", "", "b1", "", "b0"],
          caption: "Serial transfer of 1011 0001 (MSB first in this example), one bit per clock period: 8 periods in total",
        },
        {
          kind: "table",
          head: ["", "Parallel", "Serial"],
          rows: [
            ["Data lines for $N$ bits", "$N$", "1"],
            ["Time per word", "$T$", "$NT$"],
            ["Speed versus cost (F0-7)", "faster, but more lines (higher cost)", "slower, but one line (lower cost)"],
            ["Examples (F0-8, F0-9)", "traditional printer port", "RS232, Ethernet, Firewire, USB"],
          ],
        },
      ],
      example: {
        problem: "A 16-bit word is sent with a 20 MHz clock (one transfer per clock period). How long does it take serially and in parallel? How long do 1000 such words take serially?",
        steps: [
          "$T = 1/20\\text{ MHz} = 50$ ns.",
          "Serial: $16 \\times 50 = 800$ ns per word.",
          "Parallel: $50$ ns per word (16 lines).",
          "1000 words serially: $1000 \\times 800\\text{ ns} = 0.8$ ms.",
        ],
        answer: "800 ns serial, 50 ns parallel; 0.8 ms for 1000 words serially.",
      },
      pitfalls: [
        "Count **bits**, not bytes, when working out serial time: each byte is 8 bits, i.e. 8 clock periods.",
        "Parallel does not make each bit faster; it sends more bits per period.",
      ],
      recall: [
        { q: "How many clock periods does a serial transfer of a 12-bit word take?", a: "12." },
        { q: "Main advantage of serial transfer?", a: "Only one data line is needed, so it costs less (speed versus cost)." },
        { q: "Serial or parallel: printer port, RS232, USB, Ethernet, Firewire?", a: "The traditional printer port is parallel; RS232, USB, Ethernet and Firewire are serial." },
      ],
    },
    {
      title: "Integrated circuits, programmable logic and design software",
      intuition:
        "Logic gates come packaged in integrated circuits (ICs), from a few gates per chip to millions. Programmable logic devices can be programmed to implement the logic you want, and design software takes a Verilog description all the way to a programmed chip.",
      keyIdeas: [
        "**Scale of integration** by number of gates (slide 6-7): **SSI** < 12, **MSI** 12–99, **LSI** 100–9999, **VLSI** 10 000–99 999, **ULSI** 100 000–999 999, **GSI** $\\ge 1\\,000\\,000$. The slides' example of a GSI device is a microprocessor (CPU) (slide 6-9).",
        "Transistors are used to make logic outputs switch between HIGH and LOW. The two broad families are **TTL** and **CMOS**, with incompatible voltage ranges (slide 6-10; details in Ch 6).",
        "In Labs 1 and 2, circuits are built from SSI and MSI components on a breadboard: quick and low-cost for simple circuits, but messy for complex ones (Lab 3 manual). The ICs are wired from a connection diagram showing pin numbers and the $V_{CC}$ and GND connections (L3 practice Q2).",
        "**Programmable logic devices (PLDs)** (slide 7-6): examples are the **PLA** (Programmable Logic Array), **PAL** (Programmable Array Logic), **CPLD** (Complex PLD) and **FPGA** (Field Programmable Gate Array). An FPGA comprises logic components that can be programmed to implement the desired logic (Lab 3 manual).",
        "**Design software**: designs are now too large to build gate by gate, so design tools are used (Introduction to Verilog, slide 2). A **hardware description language (HDL)** such as **Verilog** describes hardware; HDL is **synthesised** into hardware primitives, whereas software is compiled into instructions (slide 5).",
        "Lab 3 FPGA flow (Vivado): write the design file (.v) → **simulate** it with a test bench on the PC (no FPGA board needed) → map the inputs and outputs in the constraints (XDC) file → **synthesise** the circuit to generate a **bitstream** → use it to **program** the FPGA → test the real circuit.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Complexity", "No. of gates"],
          rows: [
            ["Small-scale (SSI)", "< 12"],
            ["Medium-scale (MSI)", "12 – 99"],
            ["Large-scale (LSI)", "100 – 9999"],
            ["Very large-scale (VLSI)", "10 000 – 99 999"],
            ["Ultra large-scale (ULSI)", "100 000 – 999 999"],
            ["Giga-scale (GSI)", "≥ 1 000 000"],
          ],
          caption: "Scale of integration (slide 6-7)",
        },
      ],
      example: {
        problem: "Classify ICs containing (a) 8 gates, (b) about 40 000 gates and (c) about 2 000 000 gates by scale of integration.",
        steps: [
          "(a) 8 < 12: **SSI**.",
          "(b) 40 000 lies in 10 000–99 999: **VLSI**.",
          "(c) 2 000 000 ≥ 1 000 000: **GSI** (the class of the microprocessor example on slide 6-9).",
        ],
        answer: "(a) SSI, (b) VLSI, (c) GSI.",
      },
      pitfalls: [
        "Simulation is not synthesis: simulation (with a test bench) checks the behaviour on the PC; synthesis turns the description into hardware, and is needed before the bitstream can be generated (Lab 3).",
        "Watch the boundaries: 99 gates is MSI but 100 is LSI; 10 000 is VLSI.",
      ],
      recall: [
        { q: "What does HDL stand for, and which one does SC1005 use?", a: "Hardware description language; Verilog." },
        { q: "Which step turns an HDL description into hardware primitives?", a: "Synthesis." },
        { q: "MSI covers how many gates per chip?", a: "12 to 99 gates." },
        { q: "What does FPGA stand for?", a: "Field Programmable Gate Array." },
      ],
    },
  ],
  playbook: [
    "**\"Minimum number of bits for value $X$\"**: find the smallest $N$ with $2^N - 1 \\ge X$. Check the two powers of 2 around $X$ explicitly; round **up**.",
    "**\"$d$-digit decimal number, how many bits?\"** Binary: smallest $N$ with $2^N \\ge 10^d$ (about $3.32\\,d$, rounded up). BCD: $4d$. ASCII: $7d$ (one 7-bit code per character).",
    "**\"Largest value in $N$ bits\"**: binary $2^N - 1$; BCD $10^{N/4} - 1$ (e.g. 16 bits → 65 535 vs 9999).",
    "**Voltage given, which logic level?** Compare with the ranges for the family (TTL 0–0.8 V / 2.0–5.0 V; CMOS 74AC 0–1.5 V / 3.5–5.0 V): low range = 0, high range = 1, in between = indeterminate.",
    "**Waveform numbers**: $f = 1/T$; $t_r$ from 10% to 90%, $t_f$ from 90% to 10%; $t_{PHL}$/$t_{PLH}$ named by the **output** edge, measured 50% to 50%.",
    "**Serial vs parallel timing**: serial $= N T$ per word, parallel $= T$; for a block, count total bits first, then divide by bits per period.",
    "**IC / PLD facts**: SSI < 12 ≤ MSI ≤ 99 < LSI ≤ 9999 < VLSI ≤ 99 999 < ULSI ≤ 999 999 < GSI; PLD examples PLA, PAL, CPLD, FPGA; FPGA flow: design → simulate → synthesise → bitstream → program.",
  ],
};
