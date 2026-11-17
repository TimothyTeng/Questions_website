import type { Lesson } from "@/lib/sc1005/types";

// Ch 2 · Number systems and codes. Sources: SC1005 week 1 summary (F0-10 to F0-23), key concepts (week 1-6),
// Tutorial 1 and the past-year papers.

const hex = (n: number) => n.toString(16).toUpperCase();
const COUNT_ROWS = Array.from({ length: 18 }, (_, n) => [n, n.toString(2).padStart(5, "0"), n.toString(8), hex(n)]);

export const numberCodesLesson: Lesson = {
  topic: "number-codes",
  bigPicture:
    "Every number base in this course is **positional**: a digit is worth (digit) × (base)$^{\\text{position}}$, with negative positions after the radix point. That single rule gives every conversion. To go **to decimal**, multiply by the weights and add (F0-13). To go **from decimal**, divide the integer part repeatedly by the base (remainders, read bottom-up) and multiply the fraction repeatedly by the base (integer parts, read top-down). Octal and hex are shorthand for binary: **group bits in 3s or 4s** starting from the LSB (F0-11, F0-12). Then come **codes**, bit patterns that are not straight binary numbers: **BCD** (each decimal digit replaced by 4 bits), **ASCII** (7 bits per character), **Gray code** (only one bit changes at a time when moving through the sequence) and the **parity bit** (one extra bit that makes the number of 1s odd or even, so a 1-bit error is detected). Exam questions are mechanical but unforgiving: conversions with fractions and a required number of significant digits, bits needed, BCD vs binary vs ASCII interpretations, filling gaps in a Gray sequence, and odd/even parity on hex data.",
  sections: [
    {
      title: "Positional number systems: binary, octal, decimal, hexadecimal",
      intuition:
        "Decimal, binary, octal and hex are the same idea with different bases. Binary is what the hardware uses; octal and hex are short forms for long bit strings.",
      keyIdeas: [
        "Base (radix) $r$ uses digits $0$ to $r-1$: binary $\\{0,1\\}$, octal $\\{0..7\\}$, decimal $\\{0..9\\}$, hexadecimal $\\{0..9, A, B, C, D, E, F\\}$ with $A = 10, \\dots, F = 15$.",
        "**Base $N$ to decimal: multiply by the weights and add** (F0-13, F0-14). Value of $d_{n-1}\\dots d_1 d_0 . d_{-1} d_{-2}\\dots$ in base $r$ is $\\sum d_i\\,r^i$. Digits after the radix point have weights $r^{-1}, r^{-2}, \\dots$ (for binary $0.5, 0.25, 0.125, 0.0625, \\dots$). Examples: $1001.0011_2 = 9.1875$; $100_8 = 64$; $FEED_{16} = 65\\,261$.",
        "Write the base as a subscript ($1011_2$, $47_8$, $2F_{16}$). Tutorial 1 also uses the prefix $0x$ for hexadecimal ($0x43$); Verilog writes sized numbers such as `4'b1011` and `8'h2F` (Ch 8).",
        "Counting: when a digit passes $r-1$ it returns to 0 and carries 1 into the next position ($0F_{16} + 1 = 10_{16}$, $77_8 + 1 = 100_8$).",
        "$n$ digits in base $r$ give $r^n$ values, largest $r^n - 1$. One hex digit = 4 bits, one octal digit = 3 bits.",
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
        { q: "Which is largest: $24_8$, $20_{16}$ or $22_{10}$? (F0-10)", a: "$24_8 = 20$, $20_{16} = 32$, $22_{10} = 22$, so $20_{16}$ is largest." },
        { q: "What is $FF_{16}$ in decimal?", a: "$15\\times16 + 15 = 255$." },
        { q: "What is $0.101_2$ in decimal?", a: "$0.5 + 0.125 = 0.625$." },
      ],
    },
    {
      title: "Converting from decimal: repeated division and repeated multiplication",
      intuition:
        "Dividing by the base peels off the lowest digit as the remainder; multiplying a fraction by the base pushes the highest fraction digit across the radix point. Integer and fraction parts are converted separately and then joined.",
      visuals: ["base-converter"],
      keyIdeas: [
        "**Integer part: repeat division by $N$** (F0-15). Record the remainders until the quotient is 0. The **first remainder is the LSD**: read the remainders **bottom-up**. Example: $32536 \\div 8$ gives remainders 0, 3, 4, 7, 7, so $32536_{10} = 77430_8$.",
        "**Fraction part**: multiply by $r$ repeatedly; each product's integer part is the next digit, starting with the digit right after the point; continue with the fractional part only. Read the digits **top-down** (Tutorial 1 Q6: $0.8254 \\to 0.11010011_2$).",
        "Some fractions never end in the new base (e.g. $0.1_{10} = 0.000110011\\ldots_2$), so stop after the number of digits the question asks for.",
        "\"$k$ significant digits\" counts from the first non-zero digit, across the point: $10011.0110111_2$ has 12 significant bits (PYP 2016-17 S1 Q1(b)(i) asks for 12 significant bits; PYP 2018-19 S1/S2 ask for 4 and 6 significant hex digits).",
        "**Shortcut for decimal → binary** (F0-16, F0-17): repeated division by 2 is tedious, so divide by **16** instead and expand each hex digit to 4 bits. $898 \\div 16 = 56$ r 2, $56 \\div 16 = 3$ r 8, so $898_{10} = 382_{16} = 0011\\,1000\\,0010_2$.",
        "Between binary, octal and hex, use grouping (next section); from octal/hex to decimal, use the weighted sum.",
      ],
      example: {
        problem: "Convert $157.39_{10}$ to hexadecimal with 5 significant digits.",
        steps: [
          "Integer: $157 \\div 16 = 9$ r $13$ (D); $9 \\div 16 = 0$ r $9$. Read bottom-up: $9D$.",
          "Fraction: $0.39 \\times 16 = 6.24$ → 6; $0.24 \\times 16 = 3.84$ → 3; $0.84 \\times 16 = 13.44$ → D.",
          "Two integer digits + three fraction digits = 5 significant digits: $9D.63D_{16}$.",
        ],
        answer: "$157.39_{10} \\approx 9D.63D_{16}$.",
      },
      pitfalls: [
        "Reading remainders top-down reverses the number. The first remainder is the **least** significant digit.",
        "In the fraction method, only the fractional part is multiplied again: after $0.84\\times16 = 13.44$, continue with $0.44$, not $13.44$.",
        "Significant digits include the integer digits: $9D.63D$ is 5 significant digits, not 3 fraction digits plus 2.",
      ],
      recall: [
        { q: "Convert $1435_{10}$ to hex (Tutorial 1 Q5(c)).", a: "$1435 = 5\\times256 + 9\\times16 + 11$ → $59B_{16}$ ($= 101\\,1001\\,1011_2$)." },
        { q: "First three bits of $0.8254_{10}$ in binary?", a: "$1.6508 → 1$, $1.3016 → 1$, $0.6032 → 0$: $0.110\\ldots_2$." },
        { q: "Convert $1835_{10}$ to hex (PYP 2017-18 S1).", a: "$1835 \\div 16 = 114$ r 11 (B); $114 \\div 16 = 7$ r 2; $7 \\div 16 = 0$ r 7 → $72B_{16}$." },
      ],
    },
    {
      title: "Binary ↔ octal ↔ hex by grouping",
      intuition:
        "Because $8 = 2^3$ and $16 = 2^4$, each octal digit is exactly 3 bits and each hex digit exactly 4 bits. Converting is just regrouping, anchored at the radix point.",
      visuals: ["bit-grouping"],
      keyIdeas: [
        "Binary → octal: **group 3 bits starting from the LSB; pad the MSB end with 0s if necessary** (F0-11): $10\\,1010\\,1100\\,0111_2 = 25307_8$.",
        "Binary → hex: the same with **groups of 4** (F0-12): $10\\,1010\\,1100\\,0111_2 = 0010\\,1010\\,1100\\,0111 = 2AC7_{16}$.",
        "With a fraction, group outward from the radix point: 4 bits leftwards for the integer part and 4 bits rightwards for the fraction, padding with 0s on the **outside** (Tutorial 1 Q5(a): $101111.0111_2 = 2F.7_{16}$).",
        "Hex/octal → binary: replace each digit by its 4-bit (3-bit) pattern, keeping leading zeros inside the number.",
        "Octal ↔ hex: go through binary and regroup (Tutorial 1 Q5(b), (d)).",
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
        "Grouping the fraction from the wrong end gives a wrong value: $0.11_2$ grouped as $0.0011$ would read $0.3_{16}$, but $0.11_2 = 0.1100_2 = 0.C_{16}$.",
        "When converting a hex fraction to octal, the last octal group often needs zero padding on the right: $0.6_{16} = 0.0110_2 = 0.011\\,0(00)_2 = 0.30_8 = 0.3_8$.",
      ],
      recall: [
        { q: "$101111.0111_2$ in hex? (Tutorial 1 Q5(a))", a: "$0010\\,1111.0111$ → $2F.7_{16}$ (= 47.4375)." },
        { q: "$7436.11_8$ in hex? (Tutorial 1 Q5(d))", a: "$111\\,100\\,011\\,110.001\\,001$ → $1111\\,0001\\,1110.0010\\,0100$ → $F1E.24_{16}$." },
        { q: "How many bits is 5 hex digits?", a: "20 bits." },
      ],
    },
    {
      title: "Binary-coded decimal (BCD)",
      intuition:
        "BCD keeps the decimal digits visible: **each** decimal digit gets its own 4-bit group. It is not to be confused with straight binary, which converts the whole number.",
      visuals: ["bcd-encoder"],
      keyIdeas: [
        "BCD replaces **each decimal digit (0 to 9 only) with 4 bits**, using the weights 8, 4, 2, 1 (F0-19): $105 \\to 0001\\,0000\\,0101$ (not $110\\,1001$); $974 \\to 1001\\,0111\\,0100$ (not $11\\,1100\\,1110$).",
        "Fractions work the same way digit by digit (Tutorial 1 Q3): $285 = 0010\\,1000\\,0101$; $47.19 = 0100\\,0111.0001\\,1001$.",
        "Only the digits 0–9 are used, so the 4-bit groups 1010 to 1111 never appear in BCD.",
        "BCD is **not** straight binary: $0011\\,1000$ means 38 in BCD but $56$ in binary (Tutorial 1 Q4). The question must say which interpretation applies.",
        "Bits: a $d$-digit number needs $4d$ bits in BCD but fewer in binary. $N$ bits in BCD reach $10^{N/4} - 1$ (Tutorial 1 Q1: 16 bits hold $9999$ in BCD vs $65\\,535$ in binary).",
        "Adding BCD numbers needs a correction when a digit sum exceeds 9 (BCD addition, Ch 4).",
      ],
      figures: [
        {
          kind: "table",
          head: ["Decimal digit", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          rows: [["BCD (8421)", "0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001"]],
          caption: "The ten BCD codes (F0-19)",
        },
      ],
      example: {
        problem: "(a) Encode $709.25_{10}$ in BCD. (b) The 12-bit pattern 1000 0110 0101 is read as BCD and as straight binary. Give both decimal values.",
        steps: [
          "(a) $7 = 0111$, $0 = 0000$, $9 = 1001$, $2 = 0010$, $5 = 0101$.",
          "So $709.25 = 0111\\,0000\\,1001.0010\\,0101_{BCD}$ (20 bits).",
          "(b) As BCD, each 4-bit group is a digit: $1000 = 8$, $0110 = 6$, $0101 = 5$ → $865$.",
          "As binary, the groups are hex digits: $865_{16} = 8\\times256 + 6\\times16 + 5 = 2149$.",
        ],
        answer: "(a) $0111\\,0000\\,1001.0010\\,0101$; (b) $865$ as BCD, $2149$ as binary.",
      },
      pitfalls: [
        "Don't convert the whole number to binary and call it BCD. $25_{10} = 11001_2$ but $0010\\,0101_{BCD}$.",
        "Keep every digit's 4 bits: the $0$ in the middle of $709$ is $0000$, not omitted.",
        "A 4-bit group above 1001 means the pattern is not valid BCD.",
      ],
      recall: [
        { q: "BCD for $47$?", a: "$0100\\,0111$." },
        { q: "Is $0101\\,1100$ valid BCD?", a: "No: $1100$ (12) is not a decimal digit." },
        { q: "Bits to store an 8-digit phone number in BCD? (PYP 2017-18 S1)", a: "$8 \\times 4 = 32$ bits." },
      ],
    },
    {
      title: "Gray code",
      intuition:
        "In a Gray code sequence **only 1 bit changes at a time** when moving from one code word to the next (F0-21). In straight binary, going from 7 (0111) to 8 (1000) changes four bits at once; in Gray code it changes one.",
      keyIdeas: [
        "Gray code: **1 bit change at a time when moving through the code words in sequence** (F0-21). From the lecture table: decimal 7, 8, 9 are $0111, 1000, 1001$ in binary but $0100, 1100, 1101$ in Gray code.",
        "A sequence that \"repeats\" must also change only one bit from the last code back to the first. Example (F0-22): $010 \\to 110 \\to 100 \\to 000$ and repeats is a sequence of Gray codes; every step, including $000 \\to 010$, changes exactly one bit.",
        "Filling gaps in a Gray sequence (PYP 2016-17 S2 Q1(b)): the missing code must differ in exactly one bit from **both** its neighbours, and must not already appear elsewhere in the sequence.",
        "Writing out a 3-bit Gray code sequence (PYP 2018-19 S2 Q1(b)): list all 8 codes so that each step, including the step back to the start, changes one bit, e.g. $000, 001, 011, 010, 110, 111, 101, 100$.",
        "Merit over straight binary when repeating an 8-step process in order (PYP 2018-19 S2 Q1(b)): only one bit changes between successive steps, including the repeat from the last step to the first. In straight binary, several bits can change at once (e.g. $011 \\to 100$, and $111 \\to 000$ on the repeat).",
      ],
      figures: [
        { kind: "table", head: ["Decimal", "Binary", "Gray"], rows: [[7, "0111", "0100"], [8, "1000", "1100"], [9, "1001", "1101"]], caption: "Lecture table (F0-21): 7 → 8 changes four bits in binary but one bit in Gray code" },
      ],
      example: {
        problem: "Determine code (i) and code (ii) in the Gray code sequence $000 \\to 100 \\to \\text{(i)} \\to 010 \\to 011 \\to 111 \\to \\text{(ii)} \\to 001$ and repeats. (PYP 2016-17 S2 Q1(b))",
        steps: [
          "(i) must differ in one bit from 100 and from 010. Codes one bit from 100: 000, 110, 101. Of these, only 000 and 110 are also one bit from 010.",
          "000 is already used at the start, so (i) = **110**.",
          "(ii) must differ in one bit from 111 and from 001: the candidates are 011 and 101. 011 is already used, so (ii) = **101**.",
          "Check the repeat: 001 → 000 changes one bit ✓, and all 8 codes appear once.",
        ],
        answer: "(i) $110$, (ii) $101$.",
      },
      pitfalls: [
        "Check the wrap-around step as well when the sequence \"repeats\".",
        "A candidate that is one bit away from both neighbours may still be wrong if it is already used elsewhere in the sequence.",
        "Gray codes are not straight binary: $1100$ in the lecture table means decimal 8, not 12.",
      ],
      recall: [
        { q: "Is 010 → 110 → 100 → 000 (then repeating) a Gray-code sequence? (F0-22)", a: "Yes: every step, including 000 → 010 on the repeat, changes exactly one bit." },
        { q: "Gray codes for decimal 7 and 8 in the lecture table?", a: "$0100$ and $1100$: they differ only in the MSB." },
        { q: "Fill the gap: 00, 01, ?, 10 (2-bit Gray sequence, repeating).", a: "11 (one bit from 01 and from 10)." },
      ],
    },
    {
      title: "Alphanumeric codes: ASCII",
      intuition:
        "To send text, every character needs a bit pattern. ASCII uses 7 bits for each alphanumeric character.",
      keyIdeas: [
        "**ASCII** uses **7 bits** to represent each alphanumeric character: a–z, A–Z, 0–9, punctuation marks etc. (F0-20). 7 bits give $2^7 = 128$ different codes.",
        "Examples from the course: the ASCII code for 'A' is $100\\,0001$ (F0-23); $0011\\,1000$ in ASCII is the character '8' (Tutorial 1 Q4(b)).",
        "A string of $k$ characters takes $7k$ bits in standard ASCII. An 8-digit telephone number therefore takes $8 \\times 7 = 56$ bits in ASCII versus $8 \\times 4 = 32$ in BCD (PYP 2017-18 S1 Q1(a)(ii)).",
        "With a parity bit added (next section), each 7-bit ASCII code is sent as 8 bits (F0-23).",
        "The same bit pattern means different things in different codes: $0011\\,1000$ is $56$ in binary, $38$ in BCD and the character '8' in ASCII.",
      ],
      example: {
        problem: "How many bits are needed to represent an unsigned 10-digit decimal value in straight binary, BCD and standard ASCII? (PYP 2020-21 S2 Q1(b))",
        steps: [
          "Straight binary: the smallest $N$ with $2^N \\ge 10^{10}$. $2^{33} = 8\\,589\\,934\\,592$ is too small, $2^{34} = 17\\,179\\,869\\,184$ is enough: **34 bits**.",
          "BCD: 4 bits per digit: $10 \\times 4 = $ **40 bits**.",
          "Standard ASCII: 7 bits per character: $10 \\times 7 = $ **70 bits**.",
        ],
        answer: "34, 40 and 70 bits.",
      },
      pitfalls: [
        "The ASCII character '5' is a 7-bit code, not the number 5 in binary: read the question to see which is meant.",
        "Standard ASCII is 7 bits per character; 8 bits per character only when a parity bit is added (or if the question says so).",
      ],
      recall: [
        { q: "Bits per character in standard ASCII?", a: "7." },
        { q: "Decimal value of $0011\\,1000$ read as ASCII? (Tutorial 1 Q4(b))", a: "It is the character '8', so the value 8." },
        { q: "ASCII code for 'A'? (F0-23)", a: "$100\\,0001$." },
      ],
    },
    {
      title: "Parity bits: detecting errors",
      intuition:
        "A single extra bit can make the total number of 1s always even (or always odd). If one bit flips on the way, the count changes and the receiver notices. If two bits flip, the count is back to the right parity and the error slips through.",
      visuals: ["parity-check"],
      keyIdeas: [
        "**Even parity**: the parity bit is chosen so that the total number of 1s (data + parity) is **even**. **Odd parity**: the total is **odd**.",
        "Generation: count the 1s in the data. Even parity bit = 1 if that count is odd; odd parity bit = 1 if that count is even (Tutorial 1 Q7). In hardware this is the parity generator/checker built from XOR gates (L3, Ch 3).",
        "Lecture example (F0-23): ASCII 'A' $= 100\\,0001$ (two 1s) is transmitted as **1**100 0001 with odd parity and **0**100 0001 with even parity: the parity bit is sent as the leftmost bit.",
        "Checking: the receiver counts the 1s in the whole received word. With even parity an even count means no error detected; with odd parity an odd count means no error detected.",
        "**Limitation: parity can only detect a 1-bit error** (F0-23). If two bits flip, the number of 1s keeps its parity and the error is not detected (PYP 2016-17 S1 Q1(a)(ii)).",
        "Given a word that includes its parity bit and was received with no error, the total number of 1s tells you which parity is in use: even total → even parity, odd total → odd parity (PYP 2017-18 S1 Q1(a)(iii)).",
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
          caption: "Even-parity generator for 4 data bits (parity generator, L3): PE = 1 exactly when the data has an odd number of 1s",
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
        answer: "(a) 0 1011 0110; (b) parity check passes, but the word is wrong (2-bit error undetected).",
      },
      pitfalls: [
        "The parity bit is counted in the total. For even parity, data 0110011 (four 1s) gets parity bit 0, not 1 (Tutorial 1 Q7(a)).",
        "\"No error detected\" does not mean \"no error\": a 2-bit error is not detected by parity.",
        "Read the hex carefully: 'ACE6 includes one parity bit' means all 16 bits are counted.",
      ],
      recall: [
        { q: "Even parity bit for $0x43$? (Tutorial 1 Q7(b))", a: "$0100\\,0011$ has three 1s, so the bit is 1." },
        { q: "What is the limitation of the parity method?", a: "It can only detect a 1-bit error (F0-23); a 2-bit error leaves the parity unchanged." },
        { q: "Received word $ACE6_{16}$ (parity included) with no error. Odd or even parity? (PYP 2017-18 S1)", a: "$2+2+3+2 = 9$ ones: odd parity." },
      ],
    },
  ],
  playbook: [
    "**Any base → decimal**: multiply each digit by its weight $r^{\\text{position}}$, including $r^{-1}, r^{-2}$ after the point, and add.",
    "**Decimal → base $r$**: integer by repeated ÷$r$ (remainders bottom-up), fraction by repeated ×$r$ (integer parts top-down). Count significant digits from the first non-zero digit, across the point.",
    "**Decimal → binary, fast**: divide by 16 first, then expand each hex digit to 4 bits.",
    "**Binary ↔ octal/hex**: group 3 or 4 bits from the LSB (from the radix point outward when there is a fraction), padding zeros on the outside only. Octal ↔ hex via binary.",
    "**\"Bits needed for $d$ decimal digits\"**: binary: smallest $N$ with $2^N \\ge 10^d$; BCD $4d$; ASCII $7d$.",
    "**Same bits, different code**: as binary use place values; as BCD read each 4-bit group as a digit (reject 1010–1111); as ASCII it is a character.",
    "**Missing codes in a Gray sequence**: each step changes exactly one bit, including the repeat from last to first; pick the unused code that is one bit away from both neighbours.",
    "**Parity on hex data**: add the 1s per hex digit. Even parity bit = 1 iff the data count is odd. A received word's total tells you whether the scheme is odd or even.",
    "**Was the error detected?** Count flipped bits between sent and received: 1 → detected, 2 → missed.",
  ],
};
