import type { Lesson } from "@/lib/sc1005/types";

// Ch 1 · Introduction to digital systems (Tocci, Digital Systems, Ch 1; SC1005 week 1).

const ANALOG_VS_DIGITAL_SVG = `<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="10">
<g fill="none" stroke="currentColor" stroke-opacity="0.35"><line x1="15" y1="105" x2="160" y2="105"/><line x1="15" y1="10" x2="15" y2="105"/><line x1="180" y1="105" x2="325" y2="105"/><line x1="180" y1="10" x2="180" y2="105"/></g>
<path d="M15 80 C 40 20, 60 20, 80 55 S 120 100, 160 40" fill="none" stroke="var(--accent)" stroke-width="2.2"/>
<g stroke="currentColor" stroke-opacity="0.15">${[25, 40, 55, 70, 85, 100].map((y) => `<line x1="180" y1="${y - 15}" x2="325" y2="${y - 15}"/>`).join("")}</g>
<path d="M180 70 h14.5 v-30 h14.5 v-15 h14.5 v15 h14.5 v30 h14.5 v15 h14.5 v0 h14.5 v-30 h14.5 v-30 h14.5 v-15" fill="none" stroke="var(--good)" stroke-width="2.2"/>
<text x="88" y="124" text-anchor="middle" fill="currentColor">analog: any value, continuously</text>
<text x="252" y="124" text-anchor="middle" fill="currentColor">digital: discrete steps (levels)</text>
<text x="10" y="12" text-anchor="end" fill="currentColor">V</text></svg>`;

const ADC_CHAIN_SVG = `<svg viewBox="0 0 470 70" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="11">
<g fill="none" stroke="currentColor" stroke-width="1.4">
<rect x="5" y="18" width="70" height="34" rx="6"/><rect x="100" y="18" width="70" height="34" rx="6"/><rect x="195" y="18" width="80" height="34" rx="6" stroke="var(--accent)"/><rect x="300" y="18" width="70" height="34" rx="6"/><rect x="395" y="18" width="70" height="34" rx="6"/>
<path d="M75 35 h22 M170 35 h22 M275 35 h22 M370 35 h22" stroke-opacity="0.8"/></g>
<g fill="currentColor"><path d="M97 35 l-6 -3 v6 z M192 35 l-6 -3 v6 z M297 35 l-6 -3 v6 z M392 35 l-6 -3 v6 z"/>
<text x="40" y="39" text-anchor="middle">Sensor</text><text x="135" y="39" text-anchor="middle">ADC</text><text x="235" y="39" text-anchor="middle">Digital</text><text x="335" y="39" text-anchor="middle">DAC</text><text x="430" y="39" text-anchor="middle">Actuator</text>
<text x="40" y="66" text-anchor="middle" font-size="9" fill-opacity="0.7">analog</text><text x="235" y="66" text-anchor="middle" font-size="9" fill-opacity="0.7">bits: store, process</text><text x="430" y="66" text-anchor="middle" font-size="9" fill-opacity="0.7">analog</text></g></svg>`;

const LOGIC_LEVELS_SVG = `<svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="11">
<rect x="50" y="10" width="110" height="90" fill="var(--good)" fill-opacity="0.25"/>
<rect x="50" y="100" width="110" height="36" fill="var(--warn)" fill-opacity="0.3"/>
<rect x="50" y="136" width="110" height="24" fill="var(--accent)" fill-opacity="0.25"/>
<g fill="currentColor" text-anchor="end"><text x="44" y="14">5.0 V</text><text x="44" y="104">2.0 V</text><text x="44" y="140">0.8 V</text><text x="44" y="164">0 V</text></g>
<g fill="currentColor"><text x="105" y="58" text-anchor="middle" font-weight="700">logic 1 (HIGH)</text><text x="105" y="122" text-anchor="middle">invalid</text><text x="105" y="152" text-anchor="middle" font-weight="700">logic 0 (LOW)</text>
<text x="168" y="58">any voltage here</text><text x="168" y="71">is read as 1</text><text x="168" y="122">not allowed:</text><text x="168" y="134">unpredictable</text></g>
<line x1="50" y1="10" x2="50" y2="160" stroke="currentColor"/></svg>`;

const PULSE_SVG = `<svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="10">
<g stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"><line x1="20" y1="110" x2="350" y2="110"/><line x1="20" y1="30" x2="350" y2="30"/><line x1="20" y1="70" x2="350" y2="70"/><line x1="20" y1="102" x2="350" y2="102"/><line x1="20" y1="38" x2="350" y2="38"/></g>
<path d="M20 110 H60 L80 30 H170 L190 110 H250 L270 30 H330" fill="none" stroke="var(--accent)" stroke-width="2.2"/>
<g fill="currentColor"><text x="352" y="33">100%</text><text x="352" y="41" font-size="8">90%</text><text x="352" y="73">50%</text><text x="352" y="105" font-size="8">10%</text><text x="352" y="113">0%</text></g>
<g stroke="var(--good)" stroke-width="1.4"><line x1="62" y1="125" x2="78" y2="125"/><line x1="172" y1="125" x2="188" y2="125"/><line x1="70" y1="85" x2="180" y2="85"/><line x1="70" y1="10" x2="260" y2="10"/></g>
<g fill="var(--good)" text-anchor="middle"><text x="70" y="138">t_r</text><text x="180" y="138">t_f</text><text x="125" y="96">t_W (at 50%)</text><text x="165" y="20">period T (same point on consecutive cycles)</text></g></svg>`;

export const introLesson: Lesson = {
  topic: "intro",
  bigPicture:
    "Digital systems represent every quantity with a small, fixed set of symbols (two, in binary) instead of a continuously variable voltage. That one decision explains the rest of the course. Real-world quantities are analog, so they are **sampled and quantised** by an ADC, and $N$ bits give $2^N$ levels. A bit travels as a voltage that only has to land in a wide **logic-0 or logic-1 band**, which is why digital circuits shrug off noise. Changing bits are drawn as **digital waveforms** whose period, frequency, duty cycle, rise/fall time and propagation delay set how fast a system can run. Groups of bits move between circuits either **serially** (one wire, $N$ clock periods) or **in parallel** ($N$ wires, one period). The circuits themselves are built from **integrated circuits** and **programmable logic devices** that are designed in an HDL such as Verilog and checked with simulation software. Exam questions on this chapter are short calculations: levels and step size, largest value or number of bits (binary vs BCD), period/frequency/duty cycle, rise time, and serial vs parallel transfer time.",
  sections: [
    {
      title: "Analog vs digital representation",
      intuition:
        "An analog quantity can take any value in a continuous range; a digital quantity changes in discrete steps. Digital wins inside the machine because a value that only needs to be \"0 or 1\" can be stored, copied and processed without accumulating error.",
      keyIdeas: [
        "**Analog** representation: a quantity is represented by another quantity proportional to it (a voltage that follows temperature, a needle that follows speed). It varies **continuously**.",
        "**Digital** representation: the quantity is represented by symbols (digits) and changes in **discrete steps**. A count of people, the reading on a digital clock and the contents of a register are digital.",
        "A digital *reading* of an analog quantity (a digital thermometer) is still an approximation: the true value is continuous, the display has a finite number of steps.",
        "Advantages of digital techniques: easier to design (only ranges matter, not exact voltages); information is easy to store; accuracy and precision are set by the number of bits, not by component tolerances; operation can be programmed; much less affected by **noise**; far more circuitry fits on an IC.",
        "The one big limitation: the real world is analog. A practical system is **analog → ADC → digital processing → DAC → analog** (e.g. a thermostat or a digital audio player).",
      ],
      figures: [
        { kind: "svg", svg: ANALOG_VS_DIGITAL_SVG, caption: "The same signal, continuous (left) and quantised to discrete levels (right)" },
        { kind: "svg", svg: ADC_CHAIN_SVG, caption: "A typical system: convert to digital, process, convert back" },
      ],
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
        "\"Digital\" is about discrete steps, not about electronics: an abacus is digital, a mercury thermometer is analog.",
        "A digital system is not automatically more *accurate*; it is accurate to the resolution its number of bits allows.",
      ],
      recall: [
        { q: "Give the four blocks between a microphone and a loudspeaker in a digital audio system.", a: "ADC → digital processing/storage → DAC (→ amplifier/loudspeaker). Analog in, analog out." },
        { q: "Why is a digital signal less affected by noise?", a: "The receiver only has to decide which **range** the voltage falls in; small noise does not move it out of that range, so the bit is recovered exactly." },
        { q: "Main drawback of digital techniques?", a: "The real world is analog, so conversions (ADC/DAC) are needed, which take time and add cost and error." },
      ],
    },
    {
      title: "Sampling, quantisation and resolution",
      intuition:
        "An ADC does two things: it looks at the signal at regular instants (**sampling**) and rounds each sample to the nearest of a finite set of levels (**quantisation**). More samples per second capture faster changes; more bits make the steps smaller.",
      visuals: ["sampling-quantisation"],
      keyIdeas: [
        "With $N$ bits there are $2^N$ distinct codes, so $2^N$ quantisation **levels** (codes $0$ to $2^N-1$).",
        "If the levels are evenly spaced from $0$ to the full-scale voltage $V_{FS}$ inclusive, the **step size (resolution)** is $V_{FS}/(2^N-1)$. If the range is split into $2^N$ equal bins, it is $V_{FS}/2^N$. Read the question to see which is meant.",
        "Each extra bit doubles the number of levels and (roughly) halves the step size. Percentage resolution $= \\frac{1}{2^N-1}\\times100\\%$.",
        "Rounding to the nearest level gives a **quantisation error** of at most half a step.",
        "Sampling rate and resolution are independent: bits per sample fix the vertical precision, samples per second fix how fast a change can be followed. A common rule is to sample faster than twice the highest frequency present (Nyquist).",
        "Data rate of a digitised signal $=$ (samples per second) $\\times$ (bits per sample).",
        "To find the bits needed for a given step: choose the smallest $N$ with $2^N - 1 \\ge V_{FS}/\\text{step}$ (or $2^N \\ge$ number of levels needed).",
      ],
      formulas: ["\\text{levels} = 2^N, \\qquad \\text{step} = \\frac{V_{FS}}{2^N - 1}, \\qquad |e_q| \\le \\tfrac{1}{2}\\,\\text{step}", "\\text{bit rate} = f_s \\times N"],
      example: {
        problem: "A 0–5 V signal is converted with levels evenly spaced from 0 V to 5 V inclusive. What is the step size with 8 bits, and how many bits are needed for a step of at most 2 mV?",
        steps: [
          "8 bits: $2^8 = 256$ levels, so $255$ steps between 0 V and 5 V.",
          "Step $= 5/255 = 19.6$ mV.",
          "For step $\\le 2$ mV we need $2^N - 1 \\ge 5/0.002 = 2500$, i.e. $2^N \\ge 2501$.",
          "$2^{11} = 2048$ is too small, $2^{12} = 4096$ is enough.",
        ],
        answer: "19.6 mV with 8 bits; at least **12 bits** for a 2 mV step.",
      },
      pitfalls: [
        "$2^N$ levels but only $2^N - 1$ steps between the lowest and highest level. Mixing these up gives 5/256 instead of 5/255.",
        "Adding samples does not reduce the quantisation step, and adding bits does not let you follow a faster signal.",
        "\"At least 1000 levels\" needs 10 bits ($2^{10} = 1024$), not $\\log_2 1000 = 9.97$ rounded down.",
      ],
      recall: [
        { q: "How many levels does a 6-bit ADC have?", a: "$2^6 = 64$ levels (codes 0–63)." },
        { q: "Going from 8 to 9 bits does what to the step size?", a: "Roughly halves it ($V_{FS}/255 \\to V_{FS}/511$)." },
        { q: "Bit rate for 44.1 kHz sampling at 16 bits per sample?", a: "$44\\,100 \\times 16 = 705.6$ kbit/s per channel." },
      ],
    },
    {
      title: "Binary counting, ranges and the number of bits",
      intuition:
        "Binary is positional like decimal, but each place is worth twice the one to its right. $N$ bits can count from $0$ to $2^N - 1$; BCD spends 4 bits per decimal digit, so the same bits reach a smaller number.",
      visuals: ["bit-capacity"],
      keyIdeas: [
        "Place values (weights) of an integer: $\\dots, 2^4 = 16, 2^3 = 8, 2^2 = 4, 2^1 = 2, 2^0 = 1$. The leftmost bit is the **MSB**, the rightmost the **LSB**.",
        "Counting in binary: the LSB toggles on every count; each higher bit toggles when every bit to its right goes from 1 back to 0 (a carry). So bit $k$ toggles every $2^k$ counts.",
        "With $N$ bits: $2^N$ different values, largest unsigned value $2^N - 1$. A **mod-$2^N$** counter wraps from $2^N - 1$ back to $0$.",
        "**Bits needed** for integers $0$ to $X$: the smallest $N$ with $2^N - 1 \\ge X$, i.e. $N = \\lceil \\log_2(X+1) \\rceil$. Use $\\log_2 x = \\log_{10} x / \\log_{10} 2 \\approx 3.32\\log_{10} x$.",
        "An unsigned $d$-digit decimal integer needs $\\lceil d \\log_2 10 \\rceil = \\lceil 3.32\\,d \\rceil$ bits in binary but $4d$ bits in **BCD** (8421 code, one 4-bit group per decimal digit).",
        "Largest value in $N$ bits: binary $2^N - 1$; BCD (with $N$ a multiple of 4) $10^{N/4} - 1$. BCD wastes the six codes 1010–1111 in every nibble.",
      ],
      formulas: ["N_{\\min} = \\lceil \\log_2 (X + 1) \\rceil", "\\text{binary max} = 2^N - 1, \\qquad \\text{BCD max} = 10^{N/4} - 1"],
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
        { q: "Largest number in 16 bits: binary? BCD?", a: "$65\\,535$ and $9999$." },
        { q: "How many bits for an unsigned 9-digit decimal integer?", a: "$\\lceil 9 \\times 3.32 \\rceil = \\lceil 29.9 \\rceil = 30$ bits (BCD would need 36)." },
        { q: "In counting, how often does bit 3 toggle?", a: "Every $2^3 = 8$ counts." },
      ],
    },
    {
      title: "Logic levels: representing bits with voltages",
      intuition:
        "A circuit does not need an exact voltage for a bit, only a voltage inside the right **range**. Anything in the low range means 0, anything in the high range means 1, and the gap between them is forbidden.",
      visuals: ["logic-levels"],
      keyIdeas: [
        "Typical TTL-style ranges (5 V supply): **0 to 0.8 V = logic 0 (LOW)**, **2 to 5 V = logic 1 (HIGH)**. Voltages between 0.8 V and 2 V are **invalid (indeterminate)**: the circuit's response is unpredictable.",
        "Other families use other ranges (5 V CMOS: 0–1.5 V low, 3.5–5 V high), but the idea is the same: a band for 0, a band for 1, a forbidden gap.",
        "Positive logic (used in this course): the higher voltage is 1. A **digital signal** is a voltage that is (ideally) always in one of the two bands.",
        "Because only the band matters, noise smaller than the distance to the band edge has **no effect** on the received bit: this is the source of digital noise immunity (quantified later as **noise margin**).",
        "A **timing diagram** plots logic levels against time for one or more signals. It shows the order of events, not exact voltages.",
      ],
      figures: [{ kind: "svg", svg: LOGIC_LEVELS_SVG, caption: "Typical logic-level ranges for a 5 V TTL-style input" }],
      example: {
        problem: "Using 0–0.8 V = 0 and 2–5 V = 1, decode the voltages 0.3 V, 4.1 V, 1.4 V, 2.6 V and 0.9 V.",
        steps: [
          "0.3 V is in the low band: **0**.",
          "4.1 V is in the high band: **1**.",
          "1.4 V is between 0.8 V and 2 V: **invalid**, the output of the gate is unpredictable.",
          "2.6 V is in the high band: **1**.",
          "0.9 V is just above 0.8 V: **invalid**.",
        ],
        answer: "0, 1, invalid, 1, invalid.",
      },
      pitfalls: [
        "A voltage in the invalid gap is not \"half a 1\"; it is an error condition (a faulty driver, a floating input, too much noise).",
        "The ranges are family specific. Always use the values given in the question.",
      ],
      recall: [
        { q: "Is 1.7 V a valid TTL input?", a: "No: it is in the 0.8–2.0 V indeterminate range." },
        { q: "What is positive logic?", a: "The convention that the more positive voltage level represents 1." },
        { q: "What does a timing diagram show?", a: "The logic level of each signal against time, so the relationship between signal changes can be seen." },
      ],
    },
    {
      title: "Digital waveforms: period, frequency, duty cycle, edges and delay",
      intuition:
        "A digital signal switches between LOW and HIGH; how often and for how long it is HIGH are its period, frequency and duty cycle. Real edges are not vertical, and a gate's output changes a little after its input: rise/fall time and propagation delay put numbers on that.",
      visuals: ["waveform-explorer", "prop-delay"],
      keyIdeas: [
        "A **periodic** waveform repeats every **period** $T$; **frequency** $f = 1/T$ (Hz). A clock is a periodic square-ish waveform that times a synchronous system.",
        "**Pulse width** $t_W$: time the pulse is HIGH, measured between the **50%** points of its leading and trailing edges.",
        "**Duty cycle** $= t_W / T \\times 100\\%$. A symmetric clock has 50% duty cycle.",
        "**Rise time** $t_r$: time to go from **10% to 90%** of the HIGH level on the leading (LOW→HIGH) edge. **Fall time** $t_f$: from 90% to 10% on the falling edge.",
        "**Propagation delay** of a gate, measured between the 50% points of input and output: $t_{PHL}$ when the **output** goes HIGH→LOW, $t_{PLH}$ when the **output** goes LOW→HIGH. The two are usually different; the gate delay is often quoted as the larger, or the average.",
        "Unit check: $1/1\\text{ MHz} = 1\\,\\mu\\text{s}$, $1/1\\text{ GHz} = 1$ ns, $1/50\\text{ MHz} = 20$ ns.",
      ],
      formulas: ["f = \\frac{1}{T}, \\qquad \\text{duty cycle} = \\frac{t_W}{T}\\times 100\\%", "t_r = t_{90\\%} - t_{10\\%}\\ (\\text{rising}), \\qquad t_f = t_{10\\%} - t_{90\\%}\\ (\\text{falling})"],
      figures: [
        { kind: "svg", svg: PULSE_SVG, caption: "Rise and fall times use the 10% and 90% levels; pulse width uses the 50% level" },
        {
          kind: "wave",
          signals: [
            { name: "CLK", wave: "010101010101" },
            { name: "P", wave: "011100011100" },
          ],
          ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          caption: "CLK: period 2 units, duty cycle 50%. P: period 6 units, HIGH for 3, duty cycle 50%",
        },
      ],
      example: {
        problem: "A pulse waveform repeats every 250 ns and is HIGH for 50 ns of each cycle (measured at 50%). Its rising edge passes 0.5 V at 12 ns and 4.5 V at 20 ns (HIGH = 5 V). Find $f$, the duty cycle and $t_r$.",
        steps: [
          "$f = 1/T = 1/(250\\text{ ns}) = 4$ MHz.",
          "Duty cycle $= 50/250 = 20\\%$.",
          "10% of 5 V is 0.5 V and 90% is 4.5 V, so $t_r = 20 - 12 = 8$ ns.",
        ],
        answer: "4 MHz, 20% duty cycle, $t_r = 8$ ns.",
      },
      pitfalls: [
        "Rise time is 10%→90%, **not** 0→100%; pulse width is measured at 50%, not at the base or the top.",
        "$t_{PHL}$ and $t_{PLH}$ are named after the **output** transition. For an inverter, $t_{PHL}$ is measured on the input's rising edge.",
        "Frequency in MHz ↔ period in µs; GHz ↔ ns. Most numerical slips are unit slips.",
      ],
      recall: [
        { q: "Period of a 40 MHz clock?", a: "$25$ ns." },
        { q: "A clock is HIGH 3 ns and LOW 9 ns. Duty cycle?", a: "$3/12 = 25\\%$." },
        { q: "Which levels define rise time?", a: "10% and 90% of the full swing." },
        { q: "An inverter's output falls 6 ns after its input rises (50% to 50%). Which delay is that?", a: "$t_{PHL} = 6$ ns (output went HIGH→LOW)." },
      ],
    },
    {
      title: "Serial vs parallel data transfer",
      intuition:
        "To move an $N$-bit word you can send all bits at once on $N$ wires (parallel) or one after another on a single wire (serial). Parallel trades wires for speed; serial trades time for wires.",
      visuals: ["serial-parallel"],
      keyIdeas: [
        "**Parallel**: one line per bit, all $N$ bits transferred in **one** clock period $T$.",
        "**Serial**: one data line, one bit per clock period, so an $N$-bit word takes $N \\times T$.",
        "Parallel is faster for the same clock; serial needs far fewer wires/pins, is cheaper over long distances and avoids **skew** between lines, which is why modern links (USB, SATA, PCIe lanes, Ethernet) are serial at very high clock rates.",
        "The trade-off is **speed versus cost**. Examples from the slides: the traditional **printer port** (Centronics/LPT, 8 parallel data lines) is a **parallel** interface; **RS-232**, **Ethernet**, **FireWire** and **USB** are **serial** interfaces.",
        "Transfer time for a block: serial $= (\\text{total bits}) \\times T$; parallel $= (\\text{total bits}/N) \\times T$.",
        "Bit rate (bits per second) of a serial link $= 1/T$ when one bit is sent per clock period.",
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
          caption: "Serial transfer of 1011 0001, MSB first, one bit per clock period: 8 periods in total",
        },
        {
          kind: "table",
          head: ["", "Parallel", "Serial"],
          rows: [
            ["Lines for $N$ bits", "$N$ (plus ground/clock)", "1 (plus ground/clock)"],
            ["Time per word", "$T$", "$NT$"],
            ["Strength", "speed at a given clock", "few wires, cheap, long distance"],
            ["Weakness", "many wires, skew, cost", "$N$ times slower at a given clock"],
            ["Examples", "traditional printer port", "RS-232, Ethernet, FireWire, USB"],
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
        "Count **bits**, not bytes, when working out serial time: 1 kB = 8192 bits.",
        "Parallel does not make each bit faster; it sends more bits per period.",
      ],
      recall: [
        { q: "How many clock periods does a serial transfer of a 12-bit word take?", a: "12." },
        { q: "Main advantage of serial transmission?", a: "Only one data line is needed (cheaper, fewer pins, practical over long distances)." },
        { q: "Bit rate of a serial link clocked at 5 MHz?", a: "5 Mbit/s (one bit per period of 200 ns)." },
        { q: "Serial or parallel: printer port, RS-232, USB, Ethernet, FireWire?", a: "The traditional printer port is parallel; RS-232, USB, Ethernet and FireWire are serial." },
      ],
    },
    {
      title: "Integrated circuits, programmable logic and design software",
      intuition:
        "Gates are not built from discrete transistors any more; they come packaged in integrated circuits, from a few gates per chip to billions. Programmable logic lets one chip become any circuit you describe in an HDL, and software turns that description into a configured device.",
      keyIdeas: [
        "An **integrated circuit (IC)** is a complete circuit on a silicon chip in a package. Packages: through-hole **DIP**, surface-mount (SOIC, QFP, BGA…). Pin 1 is marked by a notch or dot; supply pins are $V_{CC}$/$V_{DD}$ and GND.",
        "Complexity classes (equivalent gates per chip): **SSI** < 12, **MSI** 12–99, **LSI** 100–9999, **VLSI** 10 000–99 999, **ULSI** 100 000–999 999, **GSI** $\\ge 10^6$.",
        "Main IC technologies: **TTL** (bipolar, 74xx series) and **CMOS** (MOSFET, 74HCxx, 4000 series); CMOS dominates because of its very low static power (studied in Ch 6).",
        "**Programmable logic devices (PLDs)**: one standard chip whose internal connections are programmed. **SPLD** (PAL/GAL, AND-OR arrays), **CPLD** (several SPLD blocks plus an interconnect, usually non-volatile), **FPGA** (thousands of look-up-table logic blocks and programmable routing, usually SRAM based so the configuration is reloaded at power-up). An **ASIC** is custom-made and cannot be reprogrammed.",
        "**Design software** flow: design entry (schematic or **HDL**: Verilog, VHDL) → compile/**synthesis** (description → gates/netlist) → **simulation** (functional, then timing) → fit/place-and-route → **program/download** the device → test in hardware.",
        "An HDL describes hardware: its statements model circuits that all operate **concurrently**, unlike the sequential statements of a programming language. SC1005 uses Verilog from Ch 8.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Device", "Programmed by", "Typical use"],
          rows: [
            ["SPLD (PAL, GAL)", "fuses / EEPROM in an AND-OR array", "glue logic, small functions"],
            ["CPLD", "non-volatile (EEPROM/flash)", "medium designs, instant-on"],
            ["FPGA", "SRAM configuration (reload at power-up)", "large designs, prototyping, DSP"],
            ["ASIC", "fixed at manufacture", "mass production, best speed/power"],
          ],
          caption: "Programmable and custom logic",
        },
      ],
      example: {
        problem: "A chip contains about 40 000 equivalent gates and must be reconfigured when the product is updated in the field. Which complexity class is it, and which device type fits best?",
        steps: [
          "40 000 gates lies in 10 000–99 999: **VLSI**.",
          "Reconfigurable in the field rules out an ASIC.",
          "A large design that is reloaded with new configuration data suits an **FPGA** (an SRAM-based FPGA is reprogrammed by loading a new bitstream).",
        ],
        answer: "VLSI; an FPGA.",
      },
      pitfalls: [
        "Synthesis is not simulation: synthesis builds the hardware netlist; simulation checks behaviour. A design can simulate correctly and still fail to synthesise (or vice versa).",
        "Most FPGAs lose their configuration when powered off (SRAM based); CPLDs normally keep theirs.",
      ],
      recall: [
        { q: "What does HDL stand for? Name two.", a: "Hardware description language: Verilog and VHDL." },
        { q: "Which design step converts an HDL description into a gate-level netlist?", a: "Synthesis (compilation)." },
        { q: "MSI covers how many gates per chip?", a: "12 to 99 equivalent gates." },
      ],
    },
  ],
  playbook: [
    "**\"How many levels / what step size?\"** Levels $= 2^N$; step $= V_{FS}/(2^N-1)$ if levels include both 0 and full scale. Read which convention the question uses.",
    "**\"Minimum number of bits for value $X$\"**: find the smallest $N$ with $2^N - 1 \\ge X$. Check the two powers of 2 around $X$ explicitly; round **up**.",
    "**\"$d$-digit decimal number, how many bits?\"** Binary: $\\lceil 3.32\\,d \\rceil$. BCD: $4d$. ASCII: $7d$ (one 7-bit code per character).",
    "**\"Largest value in $N$ bits\"**: binary $2^N - 1$; BCD $10^{N/4} - 1$ (e.g. 16 bits → 65 535 vs 9999).",
    "**Voltage given, which logic level?** Compare with the bands given in the question: low band = 0, high band = 1, gap = invalid/indeterminate.",
    "**Waveform numbers**: $f = 1/T$; duty $= t_W/T$; $t_r$ from 10% to 90%; $t_{PHL}$/$t_{PLH}$ named by the **output** edge, measured 50% to 50%.",
    "**Serial vs parallel timing**: serial $= N T$ per word, parallel $= T$; for a block, count total bits first, then divide by bits per period.",
    "**Counter after $k$ pulses**: an $N$-bit counter shows $k \\bmod 2^N$.",
    "**IC / PLD facts**: SSI < 12 < MSI < 100 < LSI < 10k < VLSI < 100k < ULSI < 1M ≤ GSI; FPGA = LUTs + routing (SRAM); CPLD = non-volatile; ASIC = fixed.",
  ],
};
