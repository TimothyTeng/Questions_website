import type { Draft } from "@/lib/sc1005/types";

// Ch 1 · Introduction to digital systems. 30 questions (18 MCQ, 9 short, 3 open).

export const introQuestions: Draft[] = [
  // ---------------------------------------------------------------- analog vs digital
  {
    kind: "mcq",
    subtopic: "Analog vs digital",
    difficulty: "easy",
    prompt: "Which of the following quantities is inherently **digital** (it can only change in discrete steps)?",
    options: [
      "The temperature of a room during the day",
      "The voltage across a capacitor while it charges",
      "The number of passengers inside a lift",
      "The speed of a car as it accelerates",
      "The air pressure at a microphone diaphragm",
    ],
    answer: 2,
    solution:
      "A digital quantity takes values from a discrete set. Passengers can only be counted in whole numbers, so the count jumps 3 → 4 → 5 with nothing in between.\nTemperature, capacitor voltage, speed and air pressure all pass through every intermediate value as they change: they are **analog**, even if a digital instrument later displays them as numbers.",
    source: "Original (Tocci Ch 1 style)",
  },
  {
    kind: "mcq",
    subtopic: "Analog vs digital",
    difficulty: "easy",
    prompt: "Which statement is **NOT** an advantage of digital techniques over analog techniques?",
    options: [
      "Information can be stored easily and copied without degradation.",
      "Accuracy and precision can be increased simply by using more bits.",
      "Digital circuits are less affected by noise because only voltage ranges matter.",
      "Most physical quantities are digital, so no conversion is needed at the inputs and outputs.",
      "Operation can be programmed, and much more circuitry fits on an IC.",
    ],
    answer: 3,
    solution:
      "Options A, B, C and E are the standard advantages of digital systems.\nD is false: most real-world quantities (temperature, pressure, sound, position) are **analog**. That is the main *limitation* of digital techniques: an ADC is needed at the input and a DAC at the output, which adds time, cost and conversion error.",
    source: "Original (Tocci 1-2 style)",
  },
  // ---------------------------------------------------------------- sampling & quantisation
  {
    kind: "mcq",
    subtopic: "Quantisation and resolution",
    difficulty: "medium",
    prompt:
      "A 0 V to 10 V analog signal is digitised by an 8-bit ADC whose output levels are evenly spaced from 0 V to 10 V **inclusive** (code 0 = 0 V, the largest code = 10 V). What is the step size (resolution)?",
    options: ["39.1 mV", "39.2 mV", "40.0 mV", "78.7 mV", "1.25 V"],
    answer: 1,
    solution:
      "8 bits give $2^8 = 256$ levels, codes 0 to 255.\nWith the levels at 0 V and 10 V inclusive there are $255$ steps between them: step $= 10/255 = 0.0392$ V $= 39.2$ mV.\n- 39.1 mV is $10/256$: it counts levels instead of steps.\n- 78.7 mV is $10/127$ (7 bits).\n- 1.25 V is $10/8$ (treating 8 bits as 8 levels).",
    source: "Original",
  },
  {
    kind: "short",
    subtopic: "Quantisation and resolution",
    difficulty: "medium",
    prompt:
      "A 0 V to 3.3 V sensor voltage is to be digitised with levels evenly spaced from 0 V to 3.3 V inclusive. What is the **minimum number of bits** so that the step size is no larger than 5 mV?",
    accept: ["10"],
    match: "number",
    solution:
      "Number of steps needed: $3.3/0.005 = 660$, so we need $2^N - 1 \\ge 660$, i.e. $2^N \\ge 661$.\n$2^9 = 512$ is too small (step $3.3/511 = 6.46$ mV); $2^{10} = 1024$ works (step $3.3/1023 = 3.23$ mV).\n**N = 10 bits.**",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Quantisation and resolution",
    difficulty: "medium",
    prompt:
      "A digital weighing scale must be able to distinguish **at least 1000** different weight readings. What is the minimum number of bits its ADC must output?",
    options: ["9", "10", "11", "12", "There are multiple correct answers"],
    answer: 1,
    solution:
      "$N$ bits give $2^N$ distinct codes. $2^9 = 512 < 1000$ and $2^{10} = 1024 \\ge 1000$, so the minimum is **10 bits**.\n12 bits would be the BCD answer (3 decimal digits × 4 bits) and 11 bits would also work, but neither is the *minimum*. $\\log_2 1000 = 9.97$ must be rounded **up**.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Sampling and data rate",
    difficulty: "medium",
    prompt:
      "A data logger samples a single analog channel 2000 times per second with a 12-bit ADC and stores the samples packed together with no wasted bits. How much memory does **one minute** of data occupy?",
    options: ["15 000 bytes", "24 000 bytes", "120 000 bytes", "180 000 bytes", "1 440 000 bytes"],
    answer: 3,
    solution:
      "Bit rate $= 2000 \\times 12 = 24\\,000$ bit/s.\nOne minute: $24\\,000 \\times 60 = 1\\,440\\,000$ bits $= 1\\,440\\,000/8 = $ **180 000 bytes**.\n- 1 440 000 is the answer in *bits*.\n- 120 000 bytes assumes 8 bits per sample.\n- 24 000 bytes is the bit rate per second mislabelled as bytes per minute.",
    source: "Original",
  },
  // ---------------------------------------------------------------- bits & ranges
  {
    kind: "short",
    subtopic: "Largest value in N bits",
    difficulty: "easy",
    prompt: "What is the largest decimal number that can be represented with **20 bits** in straight (unsigned) binary?",
    accept: ["1048575"],
    match: "number",
    solution: "With $N$ bits the largest unsigned value is $2^N - 1$.\n$2^{20} - 1 = 1\\,048\\,576 - 1 = $ **1 048 575**.",
    source: "Style: Tutorial 1 Q1(a)",
  },
  {
    kind: "short",
    subtopic: "Largest value in N bits",
    difficulty: "medium",
    prompt: "What is the largest decimal number that can be represented with **20 bits** in **BCD** (8421 code)?",
    accept: ["99999"],
    match: "number",
    solution:
      "BCD uses 4 bits per decimal digit, so 20 bits hold $20/4 = 5$ digits.\nThe largest 5-digit decimal number is **99 999** (1001 1001 1001 1001 1001).\nCompare: binary reaches 1 048 575 with the same 20 bits, because BCD never uses the codes 1010–1111 in any nibble.",
    source: "Style: Tutorial 1 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Number of bits needed",
    difficulty: "medium",
    prompt: "How many bits are needed to represent, in straight binary, any decimal integer value **not exceeding** $5\\,000\\,000_{10}$?",
    options: ["7", "22", "23", "24", "28"],
    answer: 2,
    solution:
      "We need the smallest $N$ with $2^N - 1 \\ge 5\\,000\\,000$.\n$2^{22} = 4\\,194\\,304$ is too small; $2^{23} = 8\\,388\\,608$ is enough. **23 bits.**\nCheck: $\\log_2 5\\,000\\,001 = 3.32 \\times 6.699 \\approx 22.25$, rounded up to 23.\n- 22 rounds down instead of up.\n- 28 is the BCD size (7 digits × 4 bits).\n- 7 is the number of decimal digits.",
    source: "Style: Tutorial 1 Q2",
  },
  {
    kind: "short",
    subtopic: "Number of bits needed",
    difficulty: "hard",
    prompt: "Determine the **minimum number of bits** required to represent any unsigned **12-digit** decimal integer in straight binary.",
    accept: ["40"],
    match: "number",
    solution:
      "The largest 12-digit integer is $10^{12} - 1$. We need $2^N - 1 \\ge 10^{12} - 1$, i.e. $2^N \\ge 10^{12}$.\n$N \\ge 12 \\log_2 10 = 12 \\times 3.3219 = 39.86$, so $N = $ **40**.\nCheck: $2^{39} = 5.50 \\times 10^{11} < 10^{12}$ and $2^{40} = 1.0995 \\times 10^{12} \\ge 10^{12}$.\n(BCD would need $12 \\times 4 = 48$ bits.)",
    source: "Style: PYP 2016-17 S1 Q1(b)(ii)",
  },
  {
    kind: "mcq",
    subtopic: "Binary vs BCD",
    difficulty: "medium",
    prompt:
      "A counter must display every value from 0 to 999 999. How many **more** bits does it need if it stores the count in BCD rather than in straight binary?",
    options: ["0", "2", "4", "6", "24"],
    answer: 2,
    solution:
      "BCD: 6 decimal digits × 4 bits = 24 bits.\nBinary: $2^{19} = 524\\,288 < 999\\,999 \\le 2^{20} - 1 = 1\\,048\\,575$, so 20 bits.\nDifference $= 24 - 20 = $ **4 bits**. (24 is the BCD total, not the difference.)",
    source: "Original",
  },
  // ---------------------------------------------------------------- binary counting
  {
    kind: "short",
    subtopic: "Binary counting",
    difficulty: "medium",
    prompt: "A 5-bit binary counter starts at 00000 and counts up by one on every clock pulse, wrapping from 11111 back to 00000. What does it show after **45** clock pulses? Give all 5 bits.",
    accept: ["01101"],
    match: "text",
    placeholder: "5 bits, e.g. 10010",
    solution:
      "A 5-bit counter is a mod-$2^5 = 32$ counter, so after 45 pulses it shows $45 \\bmod 32 = 13$.\n$13 = 8 + 4 + 1 = $ **01101**.\n(It passed 11111 → 00000 once, at the 32nd pulse.)",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Binary counting",
    difficulty: "hard",
    prompt: "A binary counter counts from 0 up to 31 (31 counts in total). How many times does bit $B_2$ (weight 4) **change value** during this counting?",
    options: ["4", "7", "8", "15", "16"],
    answer: 1,
    solution:
      "In binary counting, bit $B_k$ toggles every $2^k$ counts, i.e. whenever the count reaches a multiple of 4 for $B_2$.\nBetween 0 and 31 the multiples of 4 that are reached are 4, 8, 12, 16, 20, 24, 28: **7 changes** ($B_2$ goes 0→1 at 4, 1→0 at 8, …, 0→1 at 28 and stays 1 up to 31).\n- 8 would count the change at 32, which is not reached.\n- 15 is the number of toggles of $B_1$ (every 2 counts).",
    source: "Original",
  },
  // ---------------------------------------------------------------- logic levels
  {
    kind: "mcq",
    subtopic: "Logic levels",
    difficulty: "easy",
    prompt:
      "A digital input uses these ranges: 0 V to 0.8 V is logic 0 and 2.0 V to 5.0 V is logic 1. A faulty driver applies **1.4 V** to the input. How will the input respond?",
    options: [
      "It reads logic 0, because 1.4 V is closer to 0 V than to 5 V",
      "It reads logic 1, because 1.4 V is above 0.8 V",
      "Its response is unpredictable: 1.4 V is in the invalid (indeterminate) range",
      "Its output goes to the high-impedance state",
      "It keeps the last valid value it received",
    ],
    answer: 2,
    solution:
      "Only voltages inside a band have a guaranteed meaning. 1.4 V lies between 0.8 V and 2.0 V, the **indeterminate** region, so the circuit may treat it as 0, as 1, or behave erratically.\nThere is no 'closest level' rule, and an ordinary logic input has neither a high-impedance output state nor memory.",
    source: "Original (Tocci 1-4 style)",
  },
  // ---------------------------------------------------------------- waveforms
  {
    kind: "mcq",
    subtopic: "Period and frequency",
    difficulty: "medium",
    prompt: "A 25 MHz clock drives a 10-bit binary counter that starts at 0. Starting from 0, how long does it take until the counter **first returns to 0**?",
    options: ["0.4 µs", "25.6 µs", "40 µs", "40.96 µs", "409.6 µs"],
    answer: 3,
    solution:
      "Clock period $T = 1/25\\text{ MHz} = 40$ ns.\nA 10-bit counter has $2^{10} = 1024$ states, so it returns to 0 after **1024** clock periods: $1024 \\times 40\\text{ ns} = 40\\,960$ ns $= $ **40.96 µs**.\n- 40 µs uses 1000 periods (decimal thinking).\n- 25.6 µs uses $1024 \\times 25$ ns (period taken as 25 ns).",
    source: "Original",
  },
  {
    kind: "short",
    subtopic: "Duty cycle",
    difficulty: "easy",
    prompt: "A periodic pulse waveform is HIGH for 15 ns in every 60 ns cycle (pulse width measured at the 50% points). What is its duty cycle, in percent?",
    accept: ["25"],
    match: "number",
    placeholder: "percent",
    solution: "Duty cycle $= t_W/T \\times 100\\% = 15/60 \\times 100\\% = $ **25%**. (Frequency $= 1/60\\text{ ns} = 16.7$ MHz.)",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Reading a timing diagram",
    difficulty: "medium",
    prompt: "The waveform P below repeats indefinitely. Each grid division is **50 ns**. What are its duty cycle and frequency?",
    figures: [
      {
        kind: "wave",
        signals: [{ name: "P", wave: "011000011000011000" }],
        ticks: ["0", "", "", "", "", "", "6", "", "", "", "", "", "12", "", "", "", "", ""],
        caption: "1 division = 50 ns",
      },
    ],
    options: ["33.3%, 3.33 MHz", "33.3%, 6.67 MHz", "50%, 3.33 MHz", "66.7%, 3.33 MHz", "33.3%, 10 MHz"],
    answer: 0,
    solution:
      "Measure from one rising edge to the next: P rises at division 1 and again at division 7, so $T = 6 \\times 50 = 300$ ns.\nP is HIGH for 2 divisions (100 ns): duty cycle $= 100/300 = 33.3\\%$.\n$f = 1/300\\text{ ns} = 3.33$ MHz.\n- 6.67 MHz uses $T = 150$ ns (half the period).\n- 66.7% is the LOW fraction.\n- 10 MHz is $1/(2 \\times 50\\text{ ns})$, the HIGH time taken as the period.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Rise and fall time",
    difficulty: "medium",
    prompt: "The leading edge of a 0 V to 5 V pulse was measured at the following instants. What is the **rise time** $t_r$?",
    figures: [
      {
        kind: "table",
        head: ["Time (ns)", "10", "14", "20", "26", "30"],
        rows: [["Voltage (V)", "0.0", "0.5", "2.5", "4.5", "5.0"]],
      },
    ],
    options: ["6 ns", "10 ns", "12 ns", "16 ns", "20 ns"],
    answer: 2,
    solution:
      "Rise time is measured from **10% to 90%** of the full swing: 10% of 5 V = 0.5 V (at 14 ns) and 90% = 4.5 V (at 26 ns).\n$t_r = 26 - 14 = $ **12 ns**.\n- 20 ns is the 0%→100% time.\n- 6 ns is 10%→50% (or 50%→90%).\n- 16 ns is 0%→90%.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Propagation delay",
    difficulty: "hard",
    prompt:
      "An inverter is driven by a pulse. The 50% crossing points of its input and output were measured as follows. Which statement is correct?",
    figures: [
      {
        kind: "table",
        head: ["Event", "Time at 50% point"],
        rows: [
          ["Input rises", "100 ns"],
          ["Output falls", "112 ns"],
          ["Input falls", "200 ns"],
          ["Output rises", "207 ns"],
        ],
      },
    ],
    options: [
      "$t_{PLH} = 12$ ns and $t_{PHL} = 7$ ns",
      "$t_{PHL} = 12$ ns and $t_{PLH} = 7$ ns",
      "$t_{PHL} = t_{PLH} = 9.5$ ns",
      "$t_{PHL} = 112$ ns and $t_{PLH} = 207$ ns",
      "The delays cannot be found without the rise and fall times",
    ],
    answer: 1,
    solution:
      "Propagation delays are named after the **output** transition and measured between 50% points.\n- Output goes HIGH→LOW at 112 ns, 12 ns after the input rose at 100 ns: $t_{PHL} = 12$ ns.\n- Output goes LOW→HIGH at 207 ns, 7 ns after the input fell at 200 ns: $t_{PLH} = 7$ ns.\nOption A names the delays after the *input* edge (the classic trap for an inverter). 9.5 ns is only the average $t_{pd}$. Rise/fall times are not needed because the 50% points are given.",
    source: "Original",
  },
  // ---------------------------------------------------------------- serial vs parallel
  {
    kind: "short",
    subtopic: "Serial transfer time",
    difficulty: "medium",
    prompt: "A 32-bit word is transmitted **serially**, one bit per clock period, using an 8 MHz clock. How long does the transfer take, in **microseconds**?",
    accept: ["4"],
    match: "number",
    placeholder: "µs",
    solution: "$T = 1/8\\text{ MHz} = 125$ ns. Serial transfer takes one period per bit: $32 \\times 125\\text{ ns} = 4000$ ns $= $ **4 µs**. (A 32-bit parallel transfer would take 125 ns.)",
    source: "Original (Tocci 1-6 style)",
  },
  {
    kind: "mcq",
    subtopic: "Parallel transfer time",
    difficulty: "medium",
    prompt: "A block of **1024 bytes** is transferred over an 8-bit parallel bus that moves one byte per clock period. The clock frequency is 4 MHz. How long does the transfer take?",
    options: ["32 µs", "64 µs", "256 µs", "1.024 ms", "2.048 ms"],
    answer: 2,
    solution:
      "$T = 1/4\\text{ MHz} = 0.25$ µs. One byte per period: $1024 \\times 0.25$ µs $= $ **256 µs**.\nSending the same block serially (one bit per period) would take $8192 \\times 0.25$ µs $= 2.048$ ms, which is distractor E.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Serial vs parallel",
    difficulty: "medium",
    prompt: "Which statement about serial and parallel transmission of $N$-bit words, using the same clock frequency, is correct?",
    options: [
      "Serial transmission is faster because only one bit has to be sent at a time.",
      "Parallel transmission needs $N$ data lines and takes one clock period per word; serial needs one data line and $N$ clock periods per word.",
      "Parallel transmission needs only one data line if the bits are sent simultaneously.",
      "Serial transmission takes one clock period per word regardless of $N$.",
      "Both need $N$ data lines; they differ only in the order the bits are sent.",
    ],
    answer: 1,
    solution:
      "Parallel: one line per bit, all bits move together in **one** period. Serial: a single line, one bit per period, so $N$ periods per word.\nAt the same clock, parallel is $N$ times faster; serial's advantage is the much smaller number of wires (cost, connector size, no skew between lines), which is why long-distance and high-speed links are serial.",
    source: "Original (Tocci 1-6 style)",
  },
  {
    kind: "short",
    subtopic: "Serial transfer time",
    difficulty: "medium",
    prompt:
      "A 16-bit word must be transferred serially (one bit per clock period) in **no more than 2 µs**. What is the minimum clock frequency, in **MHz**?",
    accept: ["8"],
    match: "number",
    placeholder: "MHz",
    solution: "16 bits in 2 µs means each bit may take at most $2/16 = 0.125$ µs $= 125$ ns. The clock period must be $\\le 125$ ns, so $f \\ge 1/125\\text{ ns} = $ **8 MHz**.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Serial vs parallel interfaces",
    difficulty: "easy",
    prompt: "Which statement about common data interfaces is correct?",
    options: [
      "USB is a parallel interface: each byte travels over 8 data wires at once.",
      "The traditional printer port is serial, which is why it needed only a few pins.",
      "The traditional printer port is parallel, while RS-232, Ethernet, FireWire and USB are serial: they trade bits per clock period for fewer, cheaper wires.",
      "A serial link is always slower than a parallel one, so USB must be slower than the printer port.",
      "RS-232 and the printer port are both parallel; only USB and FireWire are serial.",
    ],
    answer: 2,
    solution:
      "The lecture's examples: the traditional (Centronics/LPT) **printer port** sends 8 data bits side by side on separate lines, so it is **parallel**. **RS-232, Ethernet, FireWire and USB** send one bit after another on a single data path, so they are **serial**.\nThe trade-off is **speed versus cost**: at the same clock, parallel moves $N$ bits per period, but needs $N$ lines, bulky cables and suffers skew between lines. Serial needs few wires, so it is cheap and can be clocked much faster over long cables, which is why USB easily outruns the old printer port. So D is wrong (\"always slower\" only holds at the **same** clock), and A, B, E misclassify the interfaces.",
    source: "Style: Week 1 summary F0-7 to F0-9",
  },
  // ---------------------------------------------------------------- ICs, PLDs, software
  {
    kind: "mcq",
    subtopic: "IC complexity",
    difficulty: "easy",
    prompt: "An integrated circuit contains the equivalent of about **50 000 logic gates**. Which complexity class is it?",
    options: ["SSI", "MSI", "LSI", "VLSI", "ULSI"],
    answer: 3,
    solution:
      "Classes by equivalent gates: SSI < 12, MSI 12–99, LSI 100–9999, **VLSI 10 000–99 999**, ULSI 100 000–999 999, GSI ≥ 1 000 000.\n50 000 is in the VLSI range.",
    source: "Original (Tocci IC complexity table)",
  },
  {
    kind: "mcq",
    subtopic: "Programmable logic devices",
    difficulty: "medium",
    prompt:
      "Which type of device consists of a large array of look-up-table based logic blocks with programmable routing, and in its common form loses its configuration when power is removed, so the configuration must be reloaded at power-up?",
    options: ["PAL (SPLD)", "CPLD", "FPGA", "ASIC", "MSI logic chip"],
    answer: 2,
    solution:
      "That is an **FPGA**: LUT-based logic blocks plus programmable interconnect, usually configured from SRAM cells (volatile), so a configuration bitstream is loaded at power-up.\n- PALs and CPLDs are built from AND-OR (sum-of-products) arrays and are normally non-volatile.\n- An ASIC's function is fixed at manufacture; an MSI chip is a fixed-function part (e.g. a decoder).",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Design software",
    difficulty: "medium",
    prompt: "In the design flow for a programmable logic device, which step converts a Verilog description of the circuit into a network of gates and flip-flops (a netlist)?",
    options: ["Design entry", "Synthesis", "Functional simulation", "Downloading (programming) the device", "Writing a testbench"],
    answer: 1,
    solution:
      "**Synthesis** (compilation) turns the HDL description into hardware: a netlist of gates, flip-flops or device resources.\nDesign entry is writing the HDL/schematic; simulation (driven by a testbench) checks behaviour but builds no hardware; downloading/programming loads the finished configuration into the chip.",
    source: "Original",
  },
  // ---------------------------------------------------------------- structured
  {
    kind: "open",
    subtopic: "Digitising and transmitting data",
    difficulty: "hard",
    prompt:
      "A greenhouse controller reads **16** temperature sensors. Each temperature lies between 0.0 °C and 100.0 °C and must be recorded to the nearest **0.1 °C**, as an unsigned integer number of tenths of a degree (so 23.4 °C is stored as 234).\n(a) Determine the minimum number of bits per reading. (3 marks)\n(b) Each sensor is read 10 times per second and all readings are sent to a PC over **one serial line**, one bit per clock period, with no extra bits. Determine the minimum bit rate. (3 marks)\n(c) Would a serial clock of 2 kHz be sufficient? State one advantage and one disadvantage of using a parallel bus instead. (4 marks)",
    solution:
      "Key steps: count the distinct values first (0 to 1000 tenths is 1001 values, not 1000), then take the smallest $N$ with $2^N \\ge 1001$ → 10 bits. Bit rate = sensors × readings per second × bits per reading = 1600 bit/s. Compare that with the clock: one bit per period means a 2 kHz clock carries 2000 bit/s.",
    modelAnswer:
      "(a) The readings are $0, 1, 2, \\dots, 1000$ tenths: **1001** distinct values. We need $2^N \\ge 1001$: $2^9 = 512$ is too small, $2^{10} = 1024$ is enough, so **10 bits** per reading.\n(b) Readings per second $= 16 \\times 10 = 160$. Bit rate $= 160 \\times 10 = $ **1600 bit/s**.\n(c) A 2 kHz clock sends 2000 bit/s ≥ 1600 bit/s, so it is **sufficient** (80% of the link is used).\nParallel bus (e.g. 10 data lines, one reading per period): advantage, 10 times the throughput at the same clock, or the same throughput at a 160 Hz clock. Disadvantage: 10 data wires instead of 1, more cost, bigger connectors, and skew between lines over the long cable to the PC.",
    rubric: [
      { point: "(a) Counts 1001 distinct values (not 1000)", marks: 1 },
      { point: "(a) Uses $2^N \\ge 1001$ with $2^9$/$2^{10}$ check, answer 10 bits", marks: 2 },
      { point: "(b) 160 readings per second", marks: 1 },
      { point: "(b) 1600 bit/s", marks: 2 },
      { point: "(c) 2000 ≥ 1600 so 2 kHz is sufficient", marks: 2 },
      { point: "(c) One valid advantage (speed) and one valid disadvantage (wire count/cost/skew) of parallel", marks: 2 },
    ],
    source: "Style: PYP 2017-18 S2 Q1(b)",
  },
  {
    kind: "open",
    subtopic: "Digital waveforms",
    difficulty: "medium",
    prompt:
      "A clock signal has a frequency of **2.5 MHz** and a **25%** duty cycle. It switches between 0 V and 5 V.\n(a) Calculate its period, its HIGH time and its LOW time. (3 marks)\n(b) Sketch two complete cycles, labelling $T$ and $t_W$. (2 marks)\n(c) The rising edge takes 12 ns to go from 0.5 V to 4.5 V. State the rise time. If the edge is a straight ramp, how long does it take to go from 0 V all the way to 5 V? (3 marks)",
    solution:
      "Key steps: $T = 1/f = 400$ ns; $t_W = $ duty × $T = 100$ ns; LOW $= 300$ ns. Rise time uses the 10% and 90% points (0.5 V and 4.5 V of a 5 V swing), so $t_r = 12$ ns; a linear edge covers the remaining 20% at the same slope, giving $12/0.8 = 15$ ns for the full edge.",
    modelAnswer:
      "(a) $T = 1/2.5\\text{ MHz} = $ **400 ns**. HIGH time $t_W = 0.25 \\times 400 = $ **100 ns**, LOW time $= $ **300 ns**.\n(b) See the figure: HIGH for 1 division of 100 ns, LOW for 3, repeating every 4 divisions; $T$ is marked between successive rising edges, $t_W$ across the HIGH part (at the 50% level).\n(c) 0.5 V and 4.5 V are the 10% and 90% points of a 5 V swing, so $t_r = $ **12 ns**. A straight ramp covers 80% of the swing in 12 ns, so the full 0→5 V edge takes $12/0.8 = $ **15 ns**.",
    modelFigures: [
      {
        kind: "wave",
        signals: [{ name: "CLK", wave: "010001000" }],
        ticks: ["0", "100", "200", "300", "400", "500", "600", "700", "800"],
        caption: "Time in ns: HIGH 100 ns, period 400 ns (rising edges at 100 and 500 ns)",
        marks: [1, 5],
      },
    ],
    rubric: [
      { point: "(a) $T = 400$ ns", marks: 1 },
      { point: "(a) HIGH 100 ns and LOW 300 ns", marks: 2 },
      { point: "(b) Two cycles with correct 1:3 HIGH:LOW ratio, $T$ and $t_W$ labelled", marks: 2 },
      { point: "(c) Recognises 0.5 V/4.5 V as 10%/90%: $t_r = 12$ ns", marks: 1 },
      { point: "(c) Full edge $= 12/0.8 = 15$ ns", marks: 2 },
    ],
    source: "Original",
  },
  {
    kind: "open",
    subtopic: "Binary vs BCD",
    difficulty: "hard",
    prompt:
      "A designer must store a 4-digit decimal display value (0000 to 9999) in a register and send it to a display driver.\n(a) How many bits are needed in straight binary and in BCD? Show your working. (3 marks)\n(b) What is the largest decimal value a 16-bit register can hold in binary and in BCD? (2 marks)\n(c) The value is sent serially at 1 MHz, one bit per clock period. How long does one value take in each code? (2 marks)\n(d) Give one reason why BCD may still be preferred here. (1 mark)",
    solution:
      "Key steps: binary needs the smallest $N$ with $2^N - 1 \\ge 9999$ (14 bits, since $2^{13} = 8192$ is too small); BCD needs 4 bits per digit (16 bits). 16 bits hold 65 535 in binary but only 9999 in BCD. Serial time = bits × period. BCD wins when each digit must be shown separately.",
    modelAnswer:
      "(a) Binary: smallest $N$ with $2^N - 1 \\ge 9999$. $2^{13} = 8192$ is too small, $2^{14} = 16\\,384$ is enough: **14 bits**. BCD: 4 digits × 4 bits = **16 bits**.\n(b) Binary: $2^{16} - 1 = $ **65 535**. BCD: 4 digits, so **9999**.\n(c) $T = 1$ µs. Binary: $14 \\times 1 = $ **14 µs**; BCD: $16 \\times 1 = $ **16 µs**.\n(d) Each 4-bit group drives one display digit directly (e.g. through a BCD-to-7-segment decoder), so no binary-to-decimal conversion circuit is needed; the 2 extra bits are cheaper than the converter.",
    rubric: [
      { point: "(a) Binary 14 bits with power-of-2 check", marks: 2 },
      { point: "(a) BCD 16 bits", marks: 1 },
      { point: "(b) 65 535 and 9999", marks: 2 },
      { point: "(c) 14 µs and 16 µs", marks: 2 },
      { point: "(d) Valid reason (direct digit display / no conversion)", marks: 1 },
    ],
    source: "Style: Tutorial 1 Q1",
  },
];
