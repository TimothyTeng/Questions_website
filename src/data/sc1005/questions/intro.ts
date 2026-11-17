import type { Draft } from "@/lib/sc1005/types";

// Ch 1 · Introduction to digital systems. 30 questions (19 MCQ, 8 short, 3 open).

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
      "A digital quantity changes in discrete steps. Passengers can only be counted in whole numbers, so the count jumps 3 → 4 → 5 with nothing in between.\nTemperature, capacitor voltage, speed and air pressure all pass through every intermediate value as they change: they vary continuously, so they are **analog**, even if a digital instrument later displays them as numbers.",
    source: "Style: Week 1 summary F0-4",
  },
  {
    kind: "mcq",
    subtopic: "Analog vs digital",
    difficulty: "easy",
    prompt:
      "In the lecture's phone illustration (F0-5, F0-6), speech is sent between the phone and the tower as a **digital** signal. Why does the listener at the far end still hear clean sound, while a purely analog signal would not give clean sound?",
    options: [
      "Noise picked up on the way does not change which logic level each bit is in, so the bits are recovered and turned back into clean sound",
      "A digital signal does not pick up any noise on the way",
      "A digital signal varies continuously, so it follows the voice exactly",
      "The tower converts the signal into a purely analog signal before sending it on",
      "The noise is removed because the analog sound is sent at a higher voltage",
    ],
    answer: 0,
    solution:
      "On F0-6 the digital signal arriving at the phone is visibly noisy, yet the sound passed to the listener is clean (thumbs up). The purely analog signal at the bottom of the slide carries its noise all the way (thumbs down).\nThe digital receiver only has to decide whether each bit is a 0 or a 1, i.e. which voltage range it falls in; noise that does not push the voltage out of its range does not change the bit.\n- B is false: the slide shows the digital signal picking up noise.\n- C describes an analog signal, not a digital one.",
    source: "Style: Week 1 summary F0-5, F0-6",
  },
  // ---------------------------------------------------------------- bits & ranges
  {
    kind: "mcq",
    subtopic: "Number of bits needed",
    difficulty: "medium",
    prompt:
      "A digital weighing scale stores each reading as an unsigned binary code. It must be able to distinguish **at least 1000** different weight readings. What is the minimum number of bits per reading?",
    options: ["9", "10", "11", "12", "There are multiple correct answers"],
    answer: 1,
    solution:
      "$N$ bits give $2^N$ distinct codes. $2^9 = 512 < 1000$ and $2^{10} = 1024 \\ge 1000$, so the minimum is **10 bits**.\n12 bits would be the BCD answer (3 decimal digits × 4 bits) and 11 bits would also work, but neither is the *minimum*. $\\log_2 1000 = 9.97$ must be rounded **up**.",
    source: "Style: Tut 1 Q2",
  },
  {
    kind: "short",
    subtopic: "Largest value in N bits",
    difficulty: "easy",
    prompt: "What is the largest decimal number that can be represented with **20 bits** in straight (unsigned) binary?",
    accept: ["1048575"],
    match: "number",
    solution: "With $N$ bits the largest unsigned value is $2^N - 1$.\n$2^{20} - 1 = 1\\,048\\,576 - 1 = $ **1 048 575**.",
    source: "Style: Tut 1 Q1(a)",
  },
  {
    kind: "short",
    subtopic: "Largest value in N bits",
    difficulty: "medium",
    prompt: "What is the largest decimal number that can be represented with **20 bits** in **BCD** (8421 code)?",
    accept: ["99999"],
    match: "number",
    solution:
      "BCD uses 4 bits per decimal digit, so 20 bits hold $20/4 = 5$ digits.\nThe largest 5-digit decimal number is **99 999** (1001 1001 1001 1001 1001).\nCompare: binary reaches 1 048 575 with the same 20 bits, because BCD only uses the codes 0000–1001 in each group of 4.",
    source: "Style: Tut 1 Q1(b)",
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
    source: "Style: Tut 1 Q2",
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
    kind: "short",
    subtopic: "Number of bits needed",
    difficulty: "medium",
    prompt: "Determine the **minimum number of bits** required to represent an unsigned **10-digit** decimal value in **straight binary**.",
    accept: ["34"],
    match: "number",
    solution:
      "The largest 10-digit value is $10^{10} - 1 = 9\\,999\\,999\\,999$, so we need the smallest $N$ with $2^N \\ge 10^{10}$.\n$2^{33} = 8\\,589\\,934\\,592$ is too small; $2^{34} = 17\\,179\\,869\\,184$ is enough. **34 bits.**\n(Estimate first: $10 \\times 3.32 = 33.2$, rounded up to 34.) The same paper asks for BCD ($10 \\times 4 = 40$ bits) and standard ASCII ($10 \\times 7 = 70$ bits).",
    source: "PYP 2020-21 S2 Q1(b)",
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
    source: "Style: PYP 2020-21 S2 Q1(b)",
  },
  // ---------------------------------------------------------------- logic levels
  {
    kind: "mcq",
    subtopic: "Logic levels",
    difficulty: "easy",
    prompt:
      "A TTL input uses these ranges: 0 V to 0.8 V is logic 0 and 2.0 V to 5.0 V is logic 1. A faulty driver applies **1.4 V** to the input. How is this voltage interpreted?",
    options: [
      "Logic 0, because 1.4 V is closer to 0 V than to 5 V",
      "Logic 1, because 1.4 V is above 0.8 V",
      "Indeterminate: 1.4 V lies between 0.8 V and 2.0 V, so it is neither a valid 0 nor a valid 1",
      "High impedance (Hi-Z)",
      "Logic 0, because any voltage below 2.0 V is logic 0",
    ],
    answer: 2,
    solution:
      "Only voltages inside one of the two ranges are valid logic levels. 1.4 V lies between 0.8 V and 2.0 V, the **indeterminate** range on slide 3-3, so it is neither a valid 0 nor a valid 1.\nThere is no 'closest level' rule, and high impedance is an output state of tristate devices (Ch 6), not a way of reading an input voltage.",
    source: "Style: L1 slide 3-3",
  },
  {
    kind: "mcq",
    subtopic: "Logic levels",
    difficulty: "medium",
    prompt:
      "Using the logic-level voltage ranges on slide 3-3 (TTL and CMOS 74AC, both 0–5 V), how is a **3.0 V** input interpreted by a TTL input and by a CMOS (74AC) input?",
    options: [
      "TTL: logic 1; CMOS: indeterminate",
      "TTL: logic 1; CMOS: logic 1",
      "TTL: indeterminate; CMOS: logic 1",
      "TTL: indeterminate; CMOS: indeterminate",
      "TTL: logic 0; CMOS: logic 0",
    ],
    answer: 0,
    solution:
      "TTL: logic 1 is 2.0 V to 5.0 V, so 3.0 V is a valid **logic 1**.\nCMOS (74AC): logic 0 is 0 to 1.5 V, logic 1 is 3.5 V to 5.0 V, so 3.0 V is in the **indeterminate** range.\nThis is why slide 6-10 calls the two families' voltage ranges incompatible.",
    source: "Style: L1 slide 3-3; slide 6-10",
  },
  {
    kind: "short",
    subtopic: "Logic levels",
    difficulty: "easy",
    prompt:
      "Using the TTL ranges (0–0.8 V = logic 0, 2.0–5.0 V = logic 1), how many of these voltages are a **valid logic 1**?\n0.5 V, 1.2 V, 1.9 V, 2.4 V, 3.3 V, 4.9 V",
    accept: ["3"],
    match: "number",
    solution:
      "- 0.5 V: logic 0.\n- 1.2 V and 1.9 V: between 0.8 V and 2.0 V, indeterminate.\n- 2.4 V, 3.3 V, 4.9 V: in 2.0–5.0 V, logic 1.\nSo **3** voltages are a valid logic 1. (1.9 V is close to 2.0 V but still indeterminate.)",
    source: "Style: L1 slide 3-3",
  },
  // ---------------------------------------------------------------- waveforms
  {
    kind: "mcq",
    subtopic: "Period and frequency",
    difficulty: "easy",
    prompt: "A clock completes **5 cycles in 40 ns**. What is its frequency?",
    options: ["25 MHz", "8 MHz", "125 MHz", "200 MHz", "1.25 GHz"],
    answer: 2,
    solution:
      "The period is the time for one complete cycle: $T = 40/5 = 8$ ns.\nThe frequency is the inverse of the period: $f = 1/(8\\times10^{-9}\\text{ s}) = 1.25\\times10^{8}$ Hz $= $ **125 MHz**.\n- 25 MHz is $1/40$ ns (the whole 5 cycles taken as one period).\n- 200 MHz is $1/5$ ns.",
    source: "Style: Sequential Circuits slide 22",
  },
  {
    kind: "mcq",
    subtopic: "Reading a timing diagram",
    difficulty: "medium",
    prompt: "The waveform P below repeats indefinitely. Each grid division is **50 ns**. What are its period and frequency?",
    figures: [
      {
        kind: "wave",
        signals: [{ name: "P", wave: "011000011000011000" }],
        ticks: ["0", "", "", "", "", "", "6", "", "", "", "", "", "12", "", "", "", "", ""],
        caption: "1 division = 50 ns",
      },
    ],
    options: ["300 ns, 3.33 MHz", "150 ns, 6.67 MHz", "100 ns, 10 MHz", "600 ns, 1.67 MHz", "300 ns, 333 MHz"],
    answer: 0,
    solution:
      "One complete cycle runs from one rising edge to the next: P rises at division 1 and again at division 7, so $T = 6 \\times 50 = 300$ ns.\n$f = 1/T = 1/300\\text{ ns} = 3.33$ MHz.\n- 150 ns / 6.67 MHz takes half the cycle.\n- 100 ns / 10 MHz takes only the HIGH part (2 divisions) as the period.\n- 333 MHz is a unit slip ($1/300$ ns is $3.33\\times10^6$ Hz).",
    source: "Style: Sequential Circuits slide 22",
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
      "Rise time is measured from **10% to 90%** of the swing (slide 6-50): 10% of 5 V = 0.5 V (at 14 ns) and 90% = 4.5 V (at 26 ns).\n$t_r = 26 - 14 = $ **12 ns**.\n- 20 ns is the 0%→100% time.\n- 6 ns is 10%→50% (or 50%→90%).\n- 16 ns is 0%→90%.",
    source: "Style: L11 slide 6-50",
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
      "Propagation delays are named after the **output** transition (slide 6-49) and measured between the 50% points of input and output (slide 6-50).\n- Output goes HIGH→LOW at 112 ns, 12 ns after the input rose at 100 ns: $t_{PHL} = 12$ ns.\n- Output goes LOW→HIGH at 207 ns, 7 ns after the input fell at 200 ns: $t_{PLH} = 7$ ns.\nOption A names the delays after the *input* edge (the classic trap for an inverter). 9.5 ns is only the average of the two. Rise/fall times are not needed because the 50% points are given.",
    source: "Style: L11 slides 6-49, 6-50",
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
    source: "Style: Week 1 summary F0-7; Seq Circuits in Verilog slides 35-37",
  },
  {
    kind: "short",
    subtopic: "Serial transfer time",
    difficulty: "medium",
    prompt:
      "A sender uses a parallel-to-serial converter to send **12 bytes** over one data line, one bit per clock period, with a **2 MHz** clock. How long does the transfer take, in **microseconds**?",
    accept: ["48"],
    match: "number",
    placeholder: "µs",
    solution: "Total bits $= 12 \\times 8 = 96$. Clock period $T = 1/2\\text{ MHz} = 0.5$ µs.\nSerial time $= 96 \\times 0.5$ µs $= $ **48 µs**. (Using 12 periods would forget that each byte is 8 bits.)",
    source: "Style: Seq Circuits in Verilog slides 35-37",
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
    source: "Style: Week 1 summary F0-7",
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
      "Parallel: one line per bit, all bits move together in **one** period. Serial: a single line, one bit per period, so $N$ periods per word.\nAt the same clock, parallel is $N$ times faster; serial's advantage is that it needs only one data line, so it costs less. The lecture sums this up as **speed versus cost** (F0-7).",
    source: "Style: Week 1 summary F0-7",
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
    source: "Style: Week 1 summary F0-7; Sequential Circuits slide 22",
  },
  {
    kind: "mcq",
    subtopic: "Serial vs parallel interfaces",
    difficulty: "easy",
    prompt: "Which statement about the data interfaces shown in the lecture is correct?",
    options: [
      "USB is a parallel interface: each byte travels over 8 data wires at once.",
      "The traditional printer port is serial, which is why it needed only a few pins.",
      "The traditional printer port is parallel, while RS232, Ethernet, Firewire and USB are serial.",
      "Ethernet is a parallel interface because its cable contains several wires.",
      "RS232 and the printer port are both parallel; only USB and Firewire are serial.",
    ],
    answer: 2,
    solution:
      "The lecture's examples: the traditional **printer port** has 8 data-out lines side by side, so it is a **parallel** interface (F0-8). **RS232, Ethernet, Firewire and USB** are the slide's **serial** interface examples (F0-9).\nThe trade-off between the two is **speed versus cost** (F0-7). Options A, B, D and E misclassify the interfaces.",
    source: "Style: Week 1 summary F0-7 to F0-9",
  },
  // ---------------------------------------------------------------- ICs, PLDs, software
  {
    kind: "mcq",
    subtopic: "Scale of integration",
    difficulty: "easy",
    prompt: "An integrated circuit contains the equivalent of about **50 000 logic gates**. Which scale of integration is it?",
    options: ["SSI", "MSI", "LSI", "VLSI", "ULSI"],
    answer: 3,
    solution:
      "Scale of integration by number of gates (slide 6-7): SSI < 12, MSI 12–99, LSI 100–9999, **VLSI 10 000–99 999**, ULSI 100 000–999 999, GSI ≥ 1 000 000.\n50 000 is in the VLSI range.",
    source: "Digital circuits slide 6-7",
  },
  {
    kind: "mcq",
    subtopic: "Scale of integration",
    difficulty: "easy",
    prompt: "The digital-circuits slides give a **microprocessor (CPU)** as an example of which scale of integration?",
    options: ["SSI", "MSI", "LSI", "VLSI", "GSI"],
    answer: 4,
    solution:
      "Slide 6-9: \"Example of GSI device: a microprocessor, MPU, CPU\". **GSI** (giga-scale integration) means at least 1 000 000 gates (slide 6-7).\nBy contrast, the simple gate chips used on the breadboard in Labs 1 and 2 are SSI and MSI components.",
    source: "Digital circuits slides 6-7, 6-9",
  },
  {
    kind: "mcq",
    subtopic: "Programmable logic devices",
    difficulty: "easy",
    prompt: "Which of the following correctly expands a programmable logic device (PLD) abbreviation from the notes?",
    options: [
      "PAL: Programmable Array Language",
      "CPLD: Combined Programmable Logic Device",
      "FPGA: Field Programmable Gate Array",
      "PLA: Parallel Logic Adder",
      "PLD: Parallel Logic Device",
    ],
    answer: 2,
    solution:
      "Slide 7-6: PLD = Programmable Logic Device; examples are the PLA (Programmable Logic Array), PAL (Programmable Array Logic), CPLD (Complex PLD) and **FPGA (Field Programmable Gate Array)**.\nThe FPGA is the device programmed in Lab 3.",
    source: "PLD slide 7-6",
  },
  {
    kind: "mcq",
    subtopic: "Design software",
    difficulty: "medium",
    prompt: "In the FPGA design flow, which step converts a Verilog description of the circuit into hardware primitives (gates and flip-flops)?",
    options: ["Writing the design file", "Synthesis", "Behavioural simulation with a test bench", "Programming the FPGA with the bitstream", "Writing the test bench"],
    answer: 1,
    solution:
      "HDLs are **synthesised** (and optimised) to hardware primitives, whereas software is compiled to instructions (Introduction to Verilog, slide 5). In Lab 3 the circuit is synthesised to generate the bitstream that programs the FPGA.\nWriting the design file only describes the circuit; simulation with a test bench checks its behaviour on the PC but builds no hardware; programming loads the finished bitstream into the chip.",
    source: "Intro to Verilog slide 5; Lab 3 manual 4.7",
  },
  {
    kind: "mcq",
    subtopic: "Design software",
    difficulty: "medium",
    prompt: "Which statement about the Lab 3 FPGA design flow is correct?",
    options: [
      "The design is simulated with a test bench on the PC; an FPGA board is not needed for simulation.",
      "The bitstream file is written first and is then synthesised into a Verilog design.",
      "The test bench file is used to program the FPGA.",
      "The XDC file contains the input test data used in simulation.",
      "Simulation can only be run after the FPGA has been programmed.",
    ],
    answer: 0,
    solution:
      "Lab 3 manual: the test bench contains input test data, and the decoder is simulated on the PC (an actual FPGA board is not required). After the function is verified, the inputs/outputs are mapped to switches and the display in the **XDC** constraints file, the circuit is synthesised to generate a **bitstream**, and the bitstream programs the FPGA.\nSo B reverses the order, C and D swap the roles of the files, and E is false.",
    source: "Lab 3 manual 4.6-4.7",
  },
  // ---------------------------------------------------------------- structured
  {
    kind: "open",
    subtopic: "Bits needed and data transfer",
    difficulty: "hard",
    prompt:
      "A greenhouse controller reads **16** temperature sensors. Each temperature lies between 0.0 °C and 100.0 °C and is recorded to the nearest **0.1 °C** as an unsigned integer number of tenths of a degree (so 23.4 °C is stored as 234).\n(a) Determine the minimum number of bits per reading. (3 marks)\n(b) One reading from each of the 16 sensors is sent to a PC over **one serial line**, one bit per clock period, with a **100 kHz** clock and no extra bits. How long does this take? (3 marks)\n(c) How long would the same transfer take over a **parallel** bus with one data line per bit of a reading (one reading per clock period, same clock)? State the trade-off between the two methods given in the lecture. (4 marks)",
    solution:
      "Key steps: count the distinct values first (0 to 1000 tenths is 1001 values), then take the smallest $N$ with $2^N \\ge 1001$ → 10 bits. Serial time = total bits × clock period; parallel time = number of readings × clock period. The lecture's trade-off is speed versus cost.",
    modelAnswer:
      "(a) The readings are $0, 1, 2, \\dots, 1000$ tenths: **1001** distinct values. We need $2^N \\ge 1001$: $2^9 = 512$ is too small, $2^{10} = 1024$ is enough, so **10 bits** per reading.\n(b) Total bits $= 16 \\times 10 = 160$. Clock period $T = 1/100\\text{ kHz} = 10$ µs. Serial time $= 160 \\times 10$ µs $= $ **1.6 ms**.\n(c) Parallel (10 data lines): one reading per period, so $16 \\times 10$ µs $= $ **160 µs**, ten times faster.\nTrade-off (F0-7): **speed versus cost**. Parallel is faster but needs 10 data lines; serial needs only one data line, so it is cheaper but slower.",
    rubric: [
      { point: "(a) Counts 1001 distinct values (not 1000)", marks: 1 },
      { point: "(a) Uses $2^N \\ge 1001$ with $2^9$/$2^{10}$ check, answer 10 bits", marks: 2 },
      { point: "(b) 160 bits and $T = 10$ µs", marks: 2 },
      { point: "(b) 1.6 ms", marks: 1 },
      { point: "(c) 160 µs for the parallel transfer", marks: 2 },
      { point: "(c) Speed versus cost: parallel faster but more lines; serial one line, cheaper but slower", marks: 2 },
    ],
    source: "Style: PYP 2017-18 S2 Q1(b); Week 1 summary F0-7",
  },
  {
    kind: "open",
    subtopic: "Timing waveforms",
    difficulty: "medium",
    prompt:
      "A clock signal has a frequency of **2.5 MHz** and switches between 0 V and 5 V. It is HIGH for **100 ns** in each cycle.\n(a) Calculate its period and its LOW time. (2 marks)\n(b) Its rising edge passes 0.5 V at $t = 20$ ns and 4.5 V at $t = 32$ ns. State the rise time. If the edge is a straight ramp, how long does it take to go from 0 V all the way to 5 V? (3 marks)\n(c) The clock drives an inverter with $t_{PHL} = 6$ ns and $t_{PLH} = 9$ ns. The clock's rising edge crosses the 50% level at $t = 26$ ns. When does the inverter output cross its 50% level, and is it rising or falling? (3 marks)",
    solution:
      "Key steps: $T = 1/f = 400$ ns, so LOW $= 300$ ns. Rise time uses the 10% and 90% points (0.5 V and 4.5 V of a 5 V swing), so $t_r = 12$ ns; a straight edge covers the remaining 20% at the same slope, giving $12/0.8 = 15$ ns. An inverter's output falls when its input rises, so the delay is $t_{PHL}$.",
    modelAnswer:
      "(a) $T = 1/2.5\\text{ MHz} = $ **400 ns**. LOW time $= 400 - 100 = $ **300 ns** (see the figure).\n(b) 0.5 V and 4.5 V are the 10% and 90% points of a 5 V swing, so $t_r = 32 - 20 = $ **12 ns**. A straight ramp covers 80% of the swing in 12 ns, so the full 0→5 V edge takes $12/0.8 = $ **15 ns**.\n(c) When the inverter's input rises, its output changes from HIGH to LOW, so the delay is $t_{PHL} = 6$ ns (named after the output transition, measured 50% to 50%). The output **falls**, crossing 50% at $26 + 6 = $ **32 ns**.",
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
      { point: "(a) LOW time 300 ns", marks: 1 },
      { point: "(b) Recognises 0.5 V/4.5 V as 10%/90%: $t_r = 12$ ns", marks: 1 },
      { point: "(b) Full edge $= 12/0.8 = 15$ ns", marks: 2 },
      { point: "(c) Uses $t_{PHL}$ (output goes HIGH→LOW)", marks: 1 },
      { point: "(c) Output falls, crossing 50% at 32 ns", marks: 2 },
    ],
    source: "Style: Sequential Circuits slide 22; L11 slides 6-49, 6-50",
  },
  {
    kind: "open",
    subtopic: "Binary vs BCD",
    difficulty: "hard",
    prompt:
      "A designer must store a 4-digit decimal display value (0000 to 9999) in a register and send it to a display.\n(a) How many bits are needed in straight binary and in BCD? Show your working. (3 marks)\n(b) What is the largest decimal value a 16-bit register can hold in binary and in BCD? (2 marks)\n(c) The value is sent serially at 1 MHz, one bit per clock period. How long does one value take in each code? (2 marks)\n(d) Give one reason why BCD may still be preferred here. (1 mark)",
    solution:
      "Key steps: binary needs the smallest $N$ with $2^N - 1 \\ge 9999$ (14 bits, since $2^{13} = 8192$ is too small); BCD needs 4 bits per digit (16 bits). 16 bits hold 65 535 in binary but only 9999 in BCD. Serial time = bits × period. BCD keeps each decimal digit in its own 4-bit group.",
    modelAnswer:
      "(a) Binary: smallest $N$ with $2^N - 1 \\ge 9999$. $2^{13} = 8192$ is too small, $2^{14} = 16\\,384$ is enough: **14 bits**. BCD: 4 digits × 4 bits = **16 bits**.\n(b) Binary: $2^{16} - 1 = $ **65 535**. BCD: 4 digits, so **9999**.\n(c) $T = 1$ µs. Binary: $14 \\times 1 = $ **14 µs**; BCD: $16 \\times 1 = $ **16 µs**.\n(d) In BCD each 4-bit group is one decimal digit, so each digit of the display can be taken directly from its own group; with straight binary the number would first have to be converted into separate decimal digits.",
    rubric: [
      { point: "(a) Binary 14 bits with power-of-2 check", marks: 2 },
      { point: "(a) BCD 16 bits", marks: 1 },
      { point: "(b) 65 535 and 9999", marks: 2 },
      { point: "(c) 14 µs and 16 µs", marks: 2 },
      { point: "(d) Valid reason (each digit directly available / no conversion)", marks: 1 },
    ],
    source: "Style: Tut 1 Q1; PYP 2020-21 S2 Q1(b)",
  },
];
