import type { Lesson } from "@/lib/sc1005/types";

// Ch 2 · Number systems and codes (Tocci Ch 2; SC1005 week 1–2 lectures 2a/2b and Tutorial 1).

const hex = (n: number) => n.toString(16).toUpperCase();
const COUNT_ROWS = Array.from({ length: 18 }, (_, n) => [n, n.toString(2).padStart(5, "0"), n.toString(8), hex(n)]);
const GRAY_ROWS = Array.from({ length: 16 }, (_, n) => [n, n.toString(2).padStart(4, "0"), (n ^ (n >> 1)).toString(2).padStart(4, "0")]);

export const numberCodesLesson: Lesson = {
  topic: "number-codes",
  bigPicture:
    "Every number system in this course is **positional**: a digit is worth (digit) × (base)$^{\\text{position}}$, with negative positions after the radix point. That single rule gives every conversion. To go **to decimal**, add up digit × weight. To go **from decimal**, divide the integer part repeatedly by the base (remainders, read bottom-up) and multiply the fraction repeatedly by the base (integer parts, read top-down). Octal and hex are shorthand for binary: **group bits in 3s or 4s outward from the radix point**. Then come **codes**, bit patterns that are not straight binary numbers: **BCD** (4 bits per decimal digit, convenient for displays, wasteful in bits), **Gray code** (only one bit changes between neighbours, so position encoders never glitch), **ASCII** (7 bits per character) and the **parity bit** (one extra bit that makes the count of 1s even or odd so single-bit errors are detected). Exam questions are mechanical but unforgiving: conversions with fractions and a required number of significant digits, bits needed, BCD vs binary interpretations, filling gaps in a Gray sequence, and odd/even parity on hex data.",
  sections: [
    {
      title: "Positional number systems: binary, octal, decimal, hexadecimal",
      intuition:
        "Decimal, binary, octal and hex are the same idea with different bases. Binary is what the hardware uses; octal and hex exist only because long bit strings are hard for humans to read.",
      keyIdeas: [
        "Base (radix) $r$ uses digits $0$ to $r-1$: binary $\\{0,1\\}$, octal $\\{0..7\\}$, decimal $\\{0..9\\}$, hexadecimal $\\{0..9, A, B, C, D, E, F\\}$ with $A = 10, \\dots, F = 15$.",
        "Value of $d_{n-1}\\dots d_1 d_0 . d_{-1} d_{-2}\\dots$ in base $r$: $\\sum d_i\\,r^i$. Digits after the radix point have weights $r^{-1}, r^{-2}, \\dots$ (for binary $0.5, 0.25, 0.125, 0.0625, \\dots$).",
        "Write the base as a subscript ($1011_2$, $47_8$, $2F_{16}$) or a prefix/suffix ($0x2F$, $2FH$). In Verilog: `4'b1011`, `8'h2F`.",
        "Counting: when a digit passes $r-1$ it returns to 0 and carries 1 into the next position ($0F_{16} + 1 = 10_{16}$, $77_8 + 1 = 100_8$).",
        "$n$ digits in base $r$ give $r^n$ values, largest $r^n - 1$. One hex digit = 4 bits, one octal digit = 3 bits.",
        "Bits needed to write $X$ in binary: $\\lceil \\log_2(X+1) \\rceil$; hex digits needed: $\\lceil \\log_{16}(X+1) \\rceil$ (e.g. $1\\,000\\,000 = F4240_{16}$ needs 5 hex digits).",
      ],
      formulas: ["N = \\sum_{i=-m}^{n-1} d_i\\, r^{i}"],
      figures: [{ kind: "table", head: ["Decimal", "Binary", "Octal", "Hex"], rows: COUNT_ROWS, caption: "Counting 0 to 17 in four bases" }],
      example: {
        problem: "Convert $2B.C_{16}$, $347.4_8$ and $10110.011_2$ to decimal.",
        steps: [
          "$2B.C_{16} = 2\\times16 + 11\\times1 + 12\\times16^{-1} = 32 + 11 + 0.75 = 43.75$.",
          "$347.4_8 = 3\\times64 + 4\\times8 + 7 + 4\\times8^{-1} = 192 + 32 + 7 + 0.5 = 231.5$.",
          "$10110.011_2 = 16 + 4 + 2 + 0.25 + 0.125 = 22.375$.",
        ],
        answer: "$43.75$, $231.5$ and $22.375$.",
      },
      pitfalls: [
        "The first fraction weight is $r^{-1}$, not $r^0$: $0.4_8 = 4/8 = 0.5$, not $0.4$.",
        "Hex letters are digits: $1A_{16} = 26$, not \"1 and 10\".",
      ],
      recall: [
        { q: "What is $FF_{16}$ in decimal?", a: "$15\\times16 + 15 = 255$." },
        { q: "What is $0.101_2$ in decimal?", a: "$0.5 + 0.125 = 0.625$." },
        { q: "Largest value of a 3-digit octal number?", a: "$777_8 = 8^3 - 1 = 511$." },
      ],
    },
    {
      title: "Converting from decimal: repeated division and repeated multiplication",
      intuition:
        "Dividing by the base peels off the lowest digit as the remainder; multiplying a fraction by the base pushes the highest fraction digit across the radix point. Integer and fraction parts are converted separately and then joined.",
      visuals: ["base-converter"],
      keyIdeas: [
        "**Integer part**: divide by $r$ repeatedly, recording remainders, until the quotient is 0. The **first remainder is the LSD**: read the remainders **bottom-up**.",
        "**Fraction part**: multiply by $r$ repeatedly; each product's integer part is the next digit, starting with the **MSD** right after the point; continue with the fractional part only. Read the digits **top-down**.",
        "A fraction terminates only if it is a sum of powers of $1/r$. For example, $0.1_{10}$ in binary is $0.000110011\\ldots$ (repeating), so stop after the number of digits asked for.",
        "\"$k$ significant digits\" counts from the first non-zero digit, across the point: $10011.0110111_2$ has 12 significant bits. Unless told to round, keep the digits the method generates (truncate).",
        "Between binary, octal and hex never go via decimal: use grouping (next section). From octal/hex to decimal, use the weighted sum.",
        "**Shortcut for decimal → binary**: repeated division by 2 is tedious, so divide by **16** instead and expand each hex digit to 4 bits. $898 \\div 16 = 56$ r 2, $56 \\div 16 = 3$ r 8, so $898_{10} = 382_{16} = 0011\\,1000\\,0010_2$.",
      ],
      example: {
        problem: "Convert $157.39_{10}$ to hexadecimal with 5 significant digits.",
        steps: [
          "Integer: $157 \\div 16 = 9$ r $13$ (D); $9 \\div 16 = 0$ r $9$. Read bottom-up: $9D$.",
          "Fraction: $0.39 \\times 16 = 6.24$ → 6; $0.24 \\times 16 = 3.84$ → 3; $0.84 \\times 16 = 13.44$ → D.",
          "Two integer digits + three fraction digits = 5 significant digits: $9D.63D_{16}$.",
          "(The next digit would be $0.44 \\times 16 = 7.04$ → 7, below 8, so rounding would not change the answer.)",
        ],
        answer: "$157.39_{10} \\approx 9D.63D_{16}$.",
      },
      pitfalls: [
        "Reading remainders top-down reverses the number. The first remainder is the **least** significant digit.",
        "In the fraction method, only the fractional part is multiplied again: after $0.84\\times16 = 13.44$, continue with $0.44$, not $13.44$.",
        "Significant digits include the integer digits: $9D.63D$ is 5 significant digits, not 3 fraction digits plus 2.",
      ],
      recall: [
        { q: "Convert $1435_{10}$ to hex.", a: "$1435 = 5\\times256 + 9\\times16 + 11$ → $59B_{16}$." },
        { q: "First three bits of $0.8254_{10}$ in binary?", a: "$1.6508 → 1$, $1.3016 → 1$, $0.6032 → 0$: $0.110\\ldots_2$." },
        { q: "Does $0.2_{10}$ terminate in binary?", a: "No: $0.0011\\,0011\\ldots_2$ (repeating)." },
        { q: "Which is largest: $24_8$, $20_{16}$ or $22_{10}$?", a: "$24_8 = 20$, $20_{16} = 32$, $22_{10} = 22$, so $20_{16}$ is largest." },
      ],
    },
    {
      title: "Binary ↔ octal ↔ hex by grouping",
      intuition:
        "Because $8 = 2^3$ and $16 = 2^4$, each octal digit is exactly 3 bits and each hex digit exactly 4 bits. Converting is just regrouping, anchored at the radix point.",
      visuals: ["bit-grouping"],
      keyIdeas: [
        "Binary → hex: starting **at the radix point**, group 4 bits leftwards for the integer part and 4 bits rightwards for the fraction; pad with 0s on the **outside** (left end of the integer, right end of the fraction). Replace each group by its hex digit.",
        "Binary → octal: the same with groups of 3.",
        "Hex/octal → binary: replace each digit by its 4-bit (3-bit) pattern, keeping leading zeros inside the number.",
        "Octal ↔ hex: go through binary and regroup.",
        "Padding a fraction on the **right** with 0s does not change its value; padding on the left would. $0.11_2 = 0.1100_2 = 0.C_{16}$, not $0.3_{16}$.",
      ],
      example: {
        problem: "Convert $2D9.6_{16}$ to octal and to decimal.",
        steps: [
          "Hex → binary: $2 = 0010$, $D = 1101$, $9 = 1001$, $6 = 0110$: $0010\\,1101\\,1001.0110_2$.",
          "Regroup in 3s from the point: $001\\,011\\,011\\,001\\,.\\,011$ (dropping the outer zeros).",
          "Octal digits: $1\\,3\\,3\\,1\\,.\\,3$ → $1331.3_8$.",
          "Decimal: $2\\times256 + 13\\times16 + 9 + 6/16 = 512 + 208 + 9 + 0.375 = 729.375$.",
        ],
        answer: "$2D9.6_{16} = 1331.3_8 = 729.375_{10}$.",
      },
      pitfalls: [
        "Grouping from the left end of the whole string (instead of from the radix point) gives a wrong fraction: $0.11_2$ grouped as $0011$ would read $0.3_{16}$.",
        "When converting a hex fraction to octal, the last octal group often needs zero padding on the right: $0.6_{16} = 0.0110_2 = 0.011\\,0(00)_2 = 0.30_8 = 0.3_8$.",
      ],
      recall: [
        { q: "$101111.0111_2$ in hex?", a: "$0010\\,1111.0111$ → $2F.7_{16}$ (= 47.4375)." },
        { q: "$7436.11_8$ in hex?", a: "$111\\,100\\,011\\,110.001\\,001$ → $1111\\,0001\\,1110.0010\\,0100$ → $F1E.24_{16}$." },
        { q: "How many bits is 5 hex digits?", a: "20 bits." },
      ],
    },
    {
      title: "Binary-coded decimal (BCD, 8421 code)",
      intuition:
        "BCD keeps the decimal digits visible: each digit gets its own 4-bit group. That makes decimal input/output and displays trivial, at the price of extra bits and wasted codes.",
      visuals: ["bcd-encoder"],
      keyIdeas: [
        "Each decimal digit is replaced by its 4-bit binary value (weights 8, 4, 2, 1): $285_{10} = 0010\\,1000\\,0101_{BCD}$. Fractions work the same way digit by digit: $47.19 = 0100\\,0111.0001\\,1001_{BCD}$.",
        "Only 1010 to 1111 are **invalid** in a BCD nibble (6 of the 16 codes are unused).",
        "BCD is **not** straight binary: $0011\\,1000$ means 38 in BCD but $56$ in binary. The question must say which interpretation applies.",
        "Bits: a $d$-digit number needs $4d$ bits in BCD but only $\\lceil 3.32\\,d \\rceil$ in binary. $N$ bits in BCD reach $10^{N/4} - 1$ ($16$ bits: $9999$ vs $65\\,535$).",
        "Advantages: easy conversion to and from decimal digits (keypads, 7-segment displays, financial arithmetic). Disadvantages: more bits, and arithmetic needs correction (BCD addition, Ch 4).",
      ],
      figures: [
        {
          kind: "table",
          head: ["Decimal digit", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          rows: [["BCD", "0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001"]],
          caption: "The ten valid BCD codes; 1010–1111 are never used",
        },
      ],
      example: {
        problem: "(a) Encode $709.25_{10}$ in BCD. (b) The 12-bit pattern 1000 0110 0101 is read as BCD and as straight binary. Give both decimal values.",
        steps: [
          "(a) $7 = 0111$, $0 = 0000$, $9 = 1001$, $2 = 0010$, $5 = 0101$.",
          "So $709.25 = 0111\\,0000\\,1001.0010\\,0101_{BCD}$ (20 bits).",
          "(b) As BCD, each nibble is a digit: $1000 = 8$, $0110 = 6$, $0101 = 5$ → $865$.",
          "As binary, the nibbles are hex digits: $865_{16} = 8\\times256 + 6\\times16 + 5 = 2149$.",
        ],
        answer: "(a) $0111\\,0000\\,1001.0010\\,0101$; (b) $865$ as BCD, $2149$ as binary.",
      },
      pitfalls: [
        "Don't convert the whole number to binary and call it BCD. $25_{10} = 11001_2$ but $0010\\,0101_{BCD}$.",
        "Keep leading zeros inside each nibble: $0$ in the middle of $709$ is $0000$, not omitted.",
        "A nibble above 1001 means the pattern is not valid BCD.",
      ],
      recall: [
        { q: "BCD for $47$?", a: "$0100\\,0111$." },
        { q: "Is $0101\\,1100$ valid BCD?", a: "No: $1100$ (12) is not a decimal digit." },
        { q: "Bits to store an 8-digit phone number in BCD?", a: "$8 \\times 4 = 32$ bits." },
      ],
    },
    {
      title: "Gray code",
      intuition:
        "In binary, going from 7 (0111) to 8 (1000) changes four bits at once; if they don't change at exactly the same instant, the circuit briefly sees nonsense. In Gray code successive values differ in **exactly one bit**, so there is never an in-between wrong value.",
      visuals: ["gray-encoder", "gray-convert"],
      keyIdeas: [
        "Gray code is **unweighted** (no place values): it is a sequence in which consecutive codes, including the last and the first, differ in exactly one bit (cyclic, unit-distance).",
        "Binary → Gray: the MSB is copied; every other Gray bit is the XOR of the corresponding binary bit and the binary bit to its left: $g_i = b_i \\oplus b_{i+1}$.",
        "Gray → binary: the MSB is copied; every other binary bit is the XOR of the Gray bit and the **binary bit just found** to its left: $b_i = g_i \\oplus b_{i+1}$.",
        "Reflect-and-prefix construction: take the $(n-1)$-bit sequence, append its mirror image, prefix the first half with 0 and the second half with 1. 1-bit: 0, 1 → 2-bit: 00, 01, 11, 10 → 3-bit: 000, 001, 011, 010, 110, 111, 101, 100.",
        "Use: shaft/rotary position encoders and any sequence where several bits would otherwise change together (counters whose outputs are sampled asynchronously, K-map ordering). A misread at a boundary can only give one of the two adjacent positions.",
        "Any sequence where every step changes one bit and all codes appear once is a Gray code; a question may use a non-standard one, so fill gaps using the one-bit-change rule and the codes not yet used.",
      ],
      formulas: ["g_{n-1} = b_{n-1}, \\qquad g_i = b_i \\oplus b_{i+1}", "b_{n-1} = g_{n-1}, \\qquad b_i = g_i \\oplus b_{i+1}"],
      figures: [
        { kind: "table", head: ["Decimal", "Binary", "Gray"], rows: GRAY_ROWS, caption: "4-bit binary and Gray codes: each Gray code differs from the next in one bit" },
        {
          kind: "circuit",
          circuit: {
            inputs: ["B3", "B2", "B1", "B0"],
            gates: [
              { id: "G3", type: "BUF", in: ["B3"] },
              { id: "G2", type: "XOR", in: ["B3", "B2"] },
              { id: "G1", type: "XOR", in: ["B2", "B1"] },
              { id: "G0", type: "XOR", in: ["B1", "B0"] },
            ],
            outputs: ["G3", "G2", "G1", "G0"],
          },
          caption: "Binary-to-Gray converter: one XOR per bit below the MSB",
        },
      ],
      example: {
        problem: "Convert binary $10110$ to Gray, and Gray $1101\\,1001$ to binary.",
        steps: [
          "Binary → Gray, from the MSB: $g_4 = 1$; $g_3 = 1\\oplus0 = 1$; $g_2 = 0\\oplus1 = 1$; $g_1 = 1\\oplus1 = 0$; $g_0 = 1\\oplus0 = 1$ → $11101$.",
          "Gray → binary: $b_7 = 1$; $b_6 = 1\\oplus1 = 0$; $b_5 = 0\\oplus0 = 0$; $b_4 = 1\\oplus0 = 1$.",
          "$b_3 = 1\\oplus1 = 0$; $b_2 = 0\\oplus0 = 0$; $b_1 = 0\\oplus0 = 0$; $b_0 = 1\\oplus0 = 1$ → $1001\\,0001$.",
          "Check: $10010001_2 = 145$ and $\\text{gray}(145) = 145 \\oplus 72 = 217 = 11011001_2$ ✓.",
        ],
        answer: "$10110_2 → 11101_{Gray}$; $11011001_{Gray} → 10010001_2$.",
      },
      pitfalls: [
        "In Gray → binary, XOR with the previous **binary** bit (just computed), not with the previous Gray bit. Using Gray bits gives a wrong answer.",
        "Gray code has no weights: you cannot add place values to get its decimal value; convert to binary first.",
        "The wrap-around step (last code back to the first) also changes only one bit; use it when filling gaps in a cyclic sequence.",
      ],
      recall: [
        { q: "Is 010 → 110 → 100 → 000 (then repeating) a Gray-code sequence?", a: "Yes: every step, including 000 → 010 on wrap-around, changes exactly one bit." },
        { q: "Gray code for binary $0111$ and $1000$?", a: "$0100$ and $1100$: they differ only in the MSB." },
        { q: "Why are Gray codes used on rotary shaft encoders?", a: "Only one track changes at each sector boundary, so a misaligned sensor can only give the position on one side of the boundary, never a far-away value." },
        { q: "Fill the gap: 00, 01, ?, 10 (2-bit Gray).", a: "11." },
      ],
    },
    {
      title: "Alphanumeric codes: ASCII",
      intuition:
        "To send text, every character needs a bit pattern. ASCII assigns a 7-bit code to 128 characters, laid out so that digits and letters are easy to convert with simple bit operations.",
      visuals: ["ascii-explorer"],
      keyIdeas: [
        "**ASCII** (American Standard Code for Information Interchange) is a **7-bit** code: 128 codes, $00_{16}$–$7F_{16}$. Codes $00$–$1F$ and $7F$ are control characters (e.g. CR = $0D$, LF = $0A$); $20$ is space.",
        "Digits '0'–'9' are $30_{16}$–$39_{16}$: the low nibble is the digit's BCD value ($011\\,0111$ = '7').",
        "Upper case 'A'–'Z' are $41_{16}$–$5A_{16}$; lower case 'a'–'z' are $61_{16}$–$7A_{16}$. Upper and lower case differ **only in bit 5** (value $20_{16}$).",
        "Stored in a byte, the 8th bit is 0 or used as a **parity bit**.",
        "A string of $k$ characters takes $7k$ bits (or $8k$ in bytes). An 8-digit number sent as ASCII therefore takes 56 bits, versus 32 in BCD and 27 in binary.",
        "The same bit pattern means different things in different codes: $0011\\,1000$ is $56$ in binary, $38$ in BCD and the character '8' in ASCII.",
      ],
      figures: [
        {
          kind: "table",
          head: ["Char", "7-bit code", "Hex"],
          rows: [
            ["space", "010 0000", "20"],
            ["0", "011 0000", "30"],
            ["9", "011 1001", "39"],
            ["A", "100 0001", "41"],
            ["Z", "101 1010", "5A"],
            ["a", "110 0001", "61"],
            ["z", "111 1010", "7A"],
          ],
          caption: "Landmarks in the ASCII table",
        },
      ],
      example: {
        problem: "Encode the string \"Go 2\" in ASCII (hex), and decode the bytes $48\\,69$.",
        steps: [
          "'G' = $41 + 6 = 47$; 'o' = $61 + 14 = 6F$; space = $20$; '2' = $32$.",
          "So \"Go 2\" = $47\\,6F\\,20\\,32$ (4 × 7 = 28 bits of code).",
          "$48 = 41 + 7$ → 'H'; $69 = 61 + 8$ → 'i'.",
        ],
        answer: "$47\\,6F\\,20\\,32$; $48\\,69$ = \"Hi\".",
      },
      pitfalls: [
        "ASCII '5' is $35_{16}$, not $05$; the character code and the number 5 are different.",
        "ASCII is 7 bits; '8 bits per character' answers assume byte storage. Use what the question states.",
      ],
      recall: [
        { q: "ASCII code (hex) for 'k'?", a: "'a' = 61, 'k' is 10 letters later: $6B$." },
        { q: "Which bit separates 'M' from 'm'?", a: "Bit 5 ($4D$ vs $6D$)." },
        { q: "Decimal value of $0011\\,1000$ read as ASCII?", a: "It is the character '8', so the value 8." },
      ],
    },
    {
      title: "Parity bits: detecting errors",
      intuition:
        "A single extra bit can make the total number of 1s always even (or always odd). If one bit flips on the way, the count changes parity and the receiver notices. If two bits flip, the parity is restored and the error slips through.",
      visuals: ["parity-check"],
      keyIdeas: [
        "**Even parity**: the parity bit is chosen so that the total number of 1s (data + parity) is **even**. **Odd parity**: total is **odd**.",
        "Generation: count the 1s in the data. Even parity bit = 1 if that count is odd; odd parity bit = 1 if that count is even. Equivalently, even parity bit $= d_0 \\oplus d_1 \\oplus \\dots \\oplus d_{n-1}$ (an XOR tree), odd parity bit is its complement.",
        "Checking: the receiver counts the 1s of the whole received word (or XORs all bits). For even parity a result of 0 (even count) means no error detected.",
        "As in the lecture example, the parity bit is sent as the **MSB** in front of the 7-bit ASCII code: 'A' $= 100\\,0001$ (two 1s) is sent as **1**100 0001 with odd parity and **0**100 0001 with even parity.",
        "Parity detects any **odd** number of bit errors, but **misses any even number** (2, 4, …). It cannot tell which bit is wrong, so it cannot correct errors.",
        "Given a word that includes its parity bit and was received correctly, the total number of 1s tells you which parity is in use: even total → even parity, odd total → odd parity.",
        "Hex data: count 1s per hex digit (0:0, 1:1, 2:1, 3:2, 4:1, 5:2, 6:2, 7:3, 8:1, 9:2, A:2, B:3, C:2, D:3, E:3, F:4).",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: {
            inputs: ["D3", "D2", "D1", "D0"],
            gates: [
              { id: "X1", type: "XOR", in: ["D3", "D2"] },
              { id: "X2", type: "XOR", in: ["D1", "D0"] },
              { id: "PE", type: "XOR", in: ["X1", "X2"] },
            ],
            outputs: ["PE"],
          },
          caption: "Even-parity generator for 4 data bits: PE = 1 exactly when the data has an odd number of 1s",
        },
      ],
      example: {
        problem: "Odd parity, parity bit transmitted leftmost. (a) Give the 9 bits sent for data $B6_{16}$. (b) The receiver gets 0 1011 0011. Is an error detected? Was there an error?",
        steps: [
          "(a) $B6 = 1011\\,0110$ has five 1s, already odd, so the odd parity bit is **0**: sent 0 1011 0110.",
          "(b) Received 0 1011 0011 has $0 + 3 + 2 = 5$ ones: odd, so the checker reports **no error**.",
          "Compare with what was sent: 0110 → 0011 differ in bit 2 and bit 0, i.e. **two** bits flipped.",
          "Two errors keep the parity unchanged, so the error is **undetected**.",
        ],
        answer: "(a) 0 1011 0110; (b) parity check passes, but the word is wrong (double error undetected).",
      },
      pitfalls: [
        "The parity bit is counted in the total. For even parity, data 0110011 (four 1s) gets parity bit 0, not 1.",
        "\"No error detected\" does not mean \"no error\": an even number of flips is invisible to parity.",
        "Read the hex carefully: 'ACE6 includes the parity bit' means all 16 bits are counted.",
      ],
      recall: [
        { q: "Even parity bit for $0x43$?", a: "$0100\\,0011$ has three 1s, so the bit is 1." },
        { q: "Can parity locate the wrong bit?", a: "No. It only detects an odd number of errors." },
        { q: "Received word $ACE6_{16}$ (parity included) with no error. Odd or even parity?", a: "$2+2+3+2 = 9$ ones: odd parity." },
      ],
    },
  ],
  playbook: [
    "**Any base → decimal**: write each digit × $r^{\\text{position}}$, including $r^{-1}, r^{-2}$ after the point, and add.",
    "**Decimal → base $r$**: integer by repeated ÷$r$ (remainders bottom-up), fraction by repeated ×$r$ (integer parts top-down). Count significant digits from the first non-zero digit, across the point.",
    "**Binary ↔ octal/hex**: group 3 or 4 bits **from the radix point outward**, padding zeros on the outside only. Octal ↔ hex always via binary.",
    "**\"Bits needed for $d$ decimal digits\"**: binary $\\lceil 3.32d \\rceil$, BCD $4d$, ASCII $7d$.",
    "**Same bits, different code**: as binary use place values; as BCD read each nibble as a digit (reject 1010–1111); as ASCII look up the character.",
    "**Binary → Gray**: copy MSB, then XOR neighbouring binary bits. **Gray → binary**: copy MSB, then XOR each Gray bit with the binary bit just produced.",
    "**Missing codes in a Gray sequence**: each step changes exactly one bit, including the wrap-around; pick the unused code that is one bit away from both neighbours.",
    "**Parity on hex data**: add the 1s per hex digit. Even parity bit = 1 iff the data count is odd. A received word's total parity tells you whether the scheme is odd or even.",
    "**Was the error detected?** Count flipped bits between sent and received: odd → detected, even → missed.",
  ],
};
