import type { Draft } from "@/lib/sc1005/types";

// Ch 2 · Number systems and codes. 30 questions (17 MCQ, 10 short, 3 open).

export const numberCodesQuestions: Draft[] = [
  // ---------------------------------------------------------------- to decimal
  {
    kind: "mcq",
    subtopic: "Binary to decimal",
    difficulty: "easy",
    prompt: "What is $1101.101_2$ in decimal?",
    options: ["13.625", "13.5", "13.101", "11.625", "13.375"],
    answer: 0,
    solution:
      "Integer: $8 + 4 + 0 + 1 = 13$. Fraction: $1\\times2^{-1} + 0\\times2^{-2} + 1\\times2^{-3} = 0.5 + 0.125 = 0.625$.\nSo $1101.101_2 = $ **13.625**.\n- 13.101 copies the fraction bits as if they were decimal digits.\n- 13.375 reads the fraction bits in reverse ($0.101 \\to 0.25 + 0.125$).",
    source: "Original",
  },
  // ---------------------------------------------------------------- decimal to base r
  {
    kind: "short",
    subtopic: "Decimal to hex (integer)",
    difficulty: "medium",
    prompt: "Convert the unsigned decimal value $3917$ to hexadecimal.",
    accept: ["F4D", "0xF4D", "F4DH"],
    match: "text",
    placeholder: "hex digits",
    solution:
      "Repeated division by 16:\n- $3917 \\div 16 = 244$ remainder $13$ (D) ← LSD\n- $244 \\div 16 = 15$ remainder $4$\n- $15 \\div 16 = 0$ remainder $15$ (F) ← MSD\nReading the remainders bottom-up: **F4D**. Check: $15\\times256 + 4\\times16 + 13 = 3840 + 64 + 13 = 3917$.",
    source: "Style: PYP 2017-18 S1 Q1(a)(i)",
  },
  {
    kind: "short",
    subtopic: "Decimal to hex (fraction)",
    difficulty: "medium",
    prompt: "Convert $57.83_{10}$ to hexadecimal. Your answer must have **4 significant digits**.",
    accept: ["39.D4", "39.D4H", "0x39.D4"],
    match: "text",
    placeholder: "e.g. 1A.2B",
    solution:
      "Integer: $57 \\div 16 = 3$ r $9$; $3 \\div 16 = 0$ r $3$ → $39_{16}$.\nFraction: $0.83 \\times 16 = 13.28$ → D; $0.28 \\times 16 = 4.48$ → 4.\nTwo integer digits + two fraction digits = 4 significant digits: **39.D4**$_{16}$.\n(The next digit would be $0.48\\times16 = 7.68$ → 7, below 8, so rounding gives the same answer.)",
    source: "Style: PYP 2018-19 S1 Q1(a)(ii)",
  },
  {
    kind: "short",
    subtopic: "Decimal to binary (fraction)",
    difficulty: "medium",
    prompt: "Convert the decimal fraction $0.3912$ into an 8-bit binary fraction of the form $0.b_{-1}b_{-2}\\dots b_{-8}$.",
    accept: ["0.01100100", ".01100100"],
    match: "text",
    placeholder: "0.xxxxxxxx",
    solution:
      "Repeated multiplication by 2 (take the integer part, keep multiplying the fraction):\n- $0.3912 \\times 2 = 0.7824$ → 0\n- $0.7824 \\times 2 = 1.5648$ → 1\n- $0.5648 \\times 2 = 1.1296$ → 1\n- $0.1296 \\times 2 = 0.2592$ → 0\n- $0.2592 \\times 2 = 0.5184$ → 0\n- $0.5184 \\times 2 = 1.0368$ → 1\n- $0.0368 \\times 2 = 0.0736$ → 0\n- $0.0736 \\times 2 = 0.1472$ → 0\nReading top-down: **0.01100100**$_2$ (= 0.390625; the 9th bit would be 0, so rounding agrees).",
    source: "Style: Tutorial 1 Q6",
  },
  {
    kind: "short",
    subtopic: "Decimal to binary (fraction)",
    difficulty: "hard",
    prompt: "Convert the unsigned decimal value $19.43$ to binary. Give your answer in **12 significant bits**.",
    accept: ["10011.0110111"],
    match: "text",
    placeholder: "e.g. 101.0011",
    solution:
      "Integer: $19 = 16 + 2 + 1 = 10011_2$ (5 bits), so 7 fraction bits are needed for 12 significant bits.\nFraction: $0.43\\times2 = 0.86$ → 0; $1.72$ → 1; $1.44$ → 1; $0.88$ → 0; $1.76$ → 1; $1.52$ → 1; $1.04$ → 1.\nAnswer: **10011.0110111**$_2$. (Next bit: $0.04 \\times 2 = 0.08$ → 0, so no rounding issue.)\nA common slip is to give 12 *fraction* bits; significant bits count from the leading 1.",
    source: "Style: PYP 2016-17 S1 Q1(b)(i)",
  },
  {
    kind: "mcq",
    subtopic: "Non-terminating fractions",
    difficulty: "medium",
    prompt: "Which statement about representing $0.1_{10}$ in binary is correct?",
    options: [
      "$0.1_{10} = 0.1_2$",
      "$0.1_{10} = 0.0001_2$ exactly",
      "$0.1_{10} = 0.000110011\\ldots_2$, a repeating fraction that cannot be represented exactly in a finite number of bits",
      "$0.1_{10} = 0.0001100110011_2$ exactly, using 13 fraction bits",
      "$0.1_{10}$ cannot be converted to binary because it is not an integer",
    ],
    answer: 2,
    solution:
      "Repeated multiplication: $0.2 → 0$, $0.4 → 0$, $0.8 → 0$, $1.6 → 1$, $1.2 → 1$, $0.4 → 0$, $0.8 → 0$, $1.6 → 1$, $1.2 → 1$, … The fraction 0.4 reappears, so the pattern 0011 repeats forever: $0.0\\overline{0011}_2$.\nA decimal fraction terminates in binary only if it is a sum of powers of 1/2; $1/10$ is not. Any finite number of bits (option D) is an approximation. $0.1_2 = 0.5$ and $0.0001_2 = 0.0625$.",
    source: "Original",
  },
  // ---------------------------------------------------------------- grouping
  {
    kind: "mcq",
    subtopic: "Hex to octal",
    difficulty: "medium",
    prompt: "Convert $2B7.A_{16}$ to octal.",
    options: ["$1267.5_8$", "$1267.12_8$", "$5334.5_8$", "$2267.5_8$", "$695.625_8$"],
    answer: 0,
    solution:
      "Hex → binary: $2 = 0010$, $B = 1011$, $7 = 0111$, $A = 1010$ → $0010\\,1011\\,0111.1010_2$.\nRegroup in 3s **from the radix point**: integer $001\\,010\\,110\\,111$ → $1\\,2\\,6\\,7$; fraction $101\\,0(00)$ → $5\\,0$.\n$2B7.A_{16} = $ **1267.5**$_8$ (= 695.625 in decimal).\n- 1267.12 groups the fraction from the wrong end ($0.001\\,010$).\n- 5334.5 groups the integer bits from the left.\n- 695.625 is the decimal value written with an octal subscript.",
    source: "Style: Tutorial 1 Q5(b)",
  },
  {
    kind: "short",
    subtopic: "Decimal to binary via hex",
    difficulty: "medium",
    prompt: "Convert $1467_{10}$ to binary. (Hint: repeated division by 16 is much faster than by 2.) Leading zeros may be omitted.",
    accept: ["10110111011", "010110111011", "0101 1011 1011", "101 1011 1011"],
    match: "text",
    placeholder: "binary",
    solution:
      "Divide by 16 and read the remainders bottom-up:\n- $1467 \\div 16 = 91$ r $11$ (B)\n- $91 \\div 16 = 5$ r $11$ (B)\n- $5 \\div 16 = 0$ r $5$\nSo $1467_{10} = 5BB_{16}$. Expand each hex digit to 4 bits: $5 = 0101$, $B = 1011$, $B = 1011$, giving $0101\\,1011\\,1011_2$ = **10110111011**$_2$.\nCheck: $1024 + 256 + 128 + 32 + 16 + 8 + 2 + 1 = 1467$.",
    source: "Style: Week 1 summary F0-16 to F0-17",
  },
  {
    kind: "short",
    subtopic: "Binary to octal",
    difficulty: "medium",
    prompt: "Convert $101101101101.01111_2$ to octal.",
    accept: ["5555.36"],
    match: "text",
    placeholder: "octal digits",
    solution:
      "Group in 3s from the radix point, padding the fraction on the **right**:\n- integer $101\\,101\\,101\\,101$ → $5\\,5\\,5\\,5$\n- fraction $011\\,11(0)$ → $3\\,6$\nAnswer **5555.36**$_8$. (Padding the fraction on the left, $0.(0)01\\,111$, would give the wrong value 0.17.)",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Equivalent representations",
    difficulty: "medium",
    prompt: "Which of the following is equal to $2F.8_{16}$?",
    options: ["$57.4_8$", "$47.5_{10}$", "$101111.1_2$", "$47.8_{10}$", "There are multiple correct answers"],
    answer: 4,
    solution:
      "$2F.8_{16} = 0010\\,1111.1000_2 = 101111.1_2$ (C is correct).\nDecimal: $2\\times16 + 15 + 8/16 = 47.5$ (B is correct).\nOctal: $101\\,111.100$ → $57.4_8$ (A is correct).\nOnly D ($47.8$, copying the hex fraction digit) is wrong, so **there are multiple correct answers**.",
    source: "Style: PYP 2021-22 S1 Q1 (OMR format)",
  },
  // ---------------------------------------------------------------- digits & ranges
  {
    kind: "mcq",
    subtopic: "Number of digits",
    difficulty: "medium",
    prompt: "What is the minimum number of **hexadecimal digits** needed to write the decimal value $1\\,000\\,000$?",
    options: ["4", "5", "6", "7", "20"],
    answer: 1,
    solution:
      "$16^4 = 65\\,536 < 1\\,000\\,000 < 16^5 = 1\\,048\\,576$, so **5** hex digits are needed ($1\\,000\\,000 = F4240_{16}$).\nEquivalently it needs 20 bits ($2^{20} = 1\\,048\\,576$), and 20 bits = 5 hex digits. '20' is the number of bits, not hex digits; 7 is the number of decimal digits.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Ranges",
    difficulty: "easy",
    prompt: "What is the largest decimal value that can be written with a **3-digit octal** number?",
    options: ["511", "512", "777", "999", "4095"],
    answer: 0,
    solution: "$777_8 = 7\\times64 + 7\\times8 + 7 = 511 = 8^3 - 1$. (512 is $8^3$, the number of values; 4095 is the 3-digit **hex** maximum $FFF_{16}$.)",
    source: "Original",
  },
  // ---------------------------------------------------------------- BCD
  {
    kind: "short",
    subtopic: "BCD encoding",
    difficulty: "medium",
    prompt: "Give the BCD representation of the decimal number $836.07$.",
    accept: ["1000 0011 0110.0000 0111", "100000110110.00000111"],
    match: "text",
    placeholder: "e.g. 0001 0010.0011",
    solution:
      "Encode each decimal digit separately in 4 bits (8421):\n$8 = 1000$, $3 = 0011$, $6 = 0110$, $0 = 0000$, $7 = 0111$.\n$836.07 = $ **1000 0011 0110 . 0000 0111**$_{BCD}$.\nThe 0 after the point must be kept as 0000, otherwise the value becomes 836.7.",
    source: "Style: Tutorial 1 Q3",
  },
  {
    kind: "mcq",
    subtopic: "BCD validity",
    difficulty: "easy",
    prompt: "Which of the following bit patterns is **not** a valid BCD (8421) number?",
    options: ["1001 0110", "0101 1010", "0000 1000", "0111 0011", "0100 1001"],
    answer: 1,
    solution: "A BCD nibble must be 0000–1001 (0–9). In option B the second nibble is $1010 = 10$, which is not a decimal digit. All the other nibbles are 9 or less.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "BCD vs binary",
    difficulty: "medium",
    prompt: "The 12-bit pattern $1001\\,0101\\,0111$ is stored in a register. What decimal value does it represent if it is interpreted (i) as BCD and (ii) as straight binary?",
    options: ["(i) 957, (ii) 2391", "(i) 2391, (ii) 957", "(i) 957, (ii) 957", "(i) invalid BCD, (ii) 2391", "(i) 957, (ii) 1431"],
    answer: 0,
    solution:
      "(i) BCD: each nibble is a decimal digit: $1001 = 9$, $0101 = 5$, $0111 = 7$ → **957** (all nibbles are valid).\n(ii) Straight binary: the nibbles are hex digits, $957_{16} = 9\\times256 + 5\\times16 + 7 = 2304 + 80 + 7 = $ **2391**.",
    source: "Style: Tutorial 1 Q4",
  },
  {
    kind: "mcq",
    subtopic: "Bits for different codes",
    difficulty: "medium",
    prompt: "How many bits are required to represent an **8-digit telephone number** using (i) 7-bit ASCII code and (ii) BCD?",
    options: ["(i) 56, (ii) 32", "(i) 64, (ii) 27", "(i) 32, (ii) 56", "(i) 56, (ii) 27", "(i) 8, (ii) 4"],
    answer: 0,
    solution:
      "(i) ASCII uses one 7-bit code per character: $8 \\times 7 = $ **56 bits**.\n(ii) BCD uses 4 bits per digit: $8 \\times 4 = $ **32 bits**.\n27 bits is the straight-binary size ($2^{27} = 134\\,217\\,728 > 99\\,999\\,999$), which is not what was asked for BCD; 64 would be ASCII stored in 8-bit bytes.",
    source: "Style: PYP 2017-18 S1 Q1(a)(ii)",
  },
  // ---------------------------------------------------------------- ASCII
  {
    kind: "short",
    subtopic: "ASCII",
    difficulty: "medium",
    prompt: "Give the 7-bit ASCII codes, in hexadecimal, of the three characters of the string `Hz9` (in order).",
    accept: ["48 7A 39", "487A39", "48H 7AH 39H"],
    match: "text",
    placeholder: "e.g. 41 62 33",
    solution: "'H' = 'A' + 7 = $41 + 7 = 48_{16}$.\n'z' = 'a' + 25 = $61 + 19_{16} = 7A_{16}$.\n'9' = '0' + 9 = $30 + 9 = 39_{16}$.\nAnswer: **48 7A 39**.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "ASCII",
    difficulty: "easy",
    prompt: "In 7-bit ASCII, the code of a lower-case letter can be obtained from the code of the corresponding upper-case letter by changing a single bit. Which one?",
    options: ["Bit 6 (adds $40_{16}$)", "Bit 4 (adds $10_{16}$)", "Bit 5 (adds $20_{16}$)", "Bit 0 (adds $01_{16}$)", "No single bit: the difference depends on the letter"],
    answer: 2,
    solution: "'A' = $41_{16} = 100\\,0001$ and 'a' = $61_{16} = 110\\,0001$: they differ only in **bit 5** (value $20_{16} = 32$). The same holds for every letter, e.g. 'M' = $4D$, 'm' = $6D$.",
    source: "Original",
  },
  // ---------------------------------------------------------------- Gray code
  {
    kind: "mcq",
    subtopic: "Binary to Gray",
    difficulty: "medium",
    prompt: "What is the Gray code equivalent of the binary number $10110$?",
    options: ["11010", "11101", "11011", "10110", "01101"],
    answer: 1,
    solution:
      "Copy the MSB, then XOR each pair of neighbouring binary bits from the left:\n$g_4 = 1$, $g_3 = 1\\oplus0 = 1$, $g_2 = 0\\oplus1 = 1$, $g_1 = 1\\oplus1 = 0$, $g_0 = 1\\oplus0 = 1$ → **11101**.\n- 11011 applies the Gray → binary rule instead.\n- 11010 XORs each bit with its *right* neighbour and copies the LSB.",
    source: "Original",
  },
  {
    kind: "short",
    subtopic: "Gray to binary",
    difficulty: "hard",
    prompt: "Convert the Gray code $1101\\,1001$ to binary.",
    accept: ["10010001", "1001 0001"],
    match: "text",
    placeholder: "8 bits",
    solution:
      "Copy the MSB, then XOR each Gray bit with the **binary bit just obtained**:\n$b_7 = 1$; $b_6 = 1\\oplus1 = 0$; $b_5 = 0\\oplus0 = 0$; $b_4 = 1\\oplus0 = 1$; $b_3 = 1\\oplus1 = 0$; $b_2 = 0\\oplus0 = 0$; $b_1 = 0\\oplus0 = 0$; $b_0 = 1\\oplus0 = 1$.\nBinary **1001 0001** (= 145). Check: $145 \\oplus (145 \\gg 1) = 1001\\,0001 \\oplus 0100\\,1000 = 1101\\,1001$ ✓.\nXORing with the previous *Gray* bit instead gives 1011 0101, which is wrong.",
    source: "Original",
  },
  {
    kind: "mcq",
    subtopic: "Gray code sequences",
    difficulty: "hard",
    prompt: "The following is a cyclic 3-bit Gray code sequence (it repeats after the last code). Determine code (i) and code (ii).\n$000 \\to 001 \\to \\text{(i)} \\to 111 \\to 101 \\to \\text{(ii)} \\to 110 \\to 010 \\to$ (repeats)",
    options: ["(i) 011, (ii) 100", "(i) 010, (ii) 100", "(i) 011, (ii) 111", "(i) 101, (ii) 100", "(i) 011, (ii) 001"],
    answer: 0,
    solution:
      "In a Gray sequence each step changes exactly one bit and every code appears once.\n- (i) must be one bit from 001 and from 111: candidates 011 and 101. 101 is already used later, so (i) = **011**.\n- (ii) must be one bit from 101 and from 110: candidates 100 and 111. 111 is already used, so (ii) = **100**.\nCheck the wrap-around 010 → 000: one bit ✓. This is a valid Gray code even though it is not the standard reflected one.",
    source: "Style: PYP 2016-17 S2 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Gray code in encoders",
    difficulty: "medium",
    prompt:
      "A 4-bit rotary shaft encoder turns from position 7 to position 8. Its four sensors are slightly misaligned, so they do not switch at exactly the same instant. If the disc is coded in **Gray code**, which outputs can appear during the transition?",
    options: [
      "Only 0100 or 1100 (the codes of positions 7 and 8)",
      "Any of the 16 codes, because all four bits change",
      "0111, 1000 or 1111",
      "0100, 1100 or 0000",
      "Only 1100: Gray code switches instantly",
    ],
    answer: 0,
    solution:
      "gray(7) = 0100 and gray(8) = 1100: only the MSB changes. Whatever the misalignment, the sensors can only read the MSB as old or new, so the output is 0100 or 1100, i.e. position 7 or 8, never a far-away value.\nIn **binary**, 0111 → 1000 changes all four bits, so misaligned sensors could momentarily read any of the 16 codes (option B describes the binary disc).",
    source: "Style: PYP 2018-19 S2 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Gray code properties",
    difficulty: "medium",
    prompt: "A 4-bit counter wraps from 15 back to 0. How many bits change in this step if the count is held in (i) straight binary and (ii) standard reflected Gray code?",
    options: ["(i) 4, (ii) 1", "(i) 4, (ii) 4", "(i) 1, (ii) 1", "(i) 4, (ii) 2", "(i) 3, (ii) 1"],
    answer: 0,
    solution: "Binary: 1111 → 0000, all **4** bits change.\nGray: gray(15) = $1111 \\oplus 0111 = 1000$ and gray(0) = 0000: only **1** bit changes. The reflected Gray code is cyclic, so even the wrap-around is a single-bit change.",
    source: "Original",
  },
  // ---------------------------------------------------------------- parity
  {
    kind: "short",
    subtopic: "Parity generation",
    difficulty: "medium",
    prompt: "The character 'K' is sent as 7-bit ASCII with an **even** parity bit added as the most significant (leftmost) bit. Give the 8 bits transmitted.",
    accept: ["01001011", "0100 1011"],
    match: "text",
    placeholder: "8 bits",
    solution: "'K' = $4B_{16} = 100\\,1011$, which contains four 1s (already even).\nThe even parity bit is therefore **0**, and the transmitted byte is **0100 1011**.",
    source: "Style: Tutorial 1 Q7",
  },
  {
    kind: "mcq",
    subtopic: "Identifying the parity scheme",
    difficulty: "medium",
    prompt: "A circuit transmits the 16-bit value $9D3E_{16}$, which **includes** one parity bit, and it is received with no error. Which parity does the circuit use?",
    options: [
      "Even parity, because the 16 bits contain ten 1s",
      "Odd parity, because the 16 bits contain nine 1s",
      "Odd parity, because the last hex digit E contains three 1s",
      "Even parity, because $9D3E_{16}$ is an even number",
      "It cannot be determined without knowing which bit is the parity bit",
    ],
    answer: 0,
    solution:
      "Count the 1s per hex digit: 9 = 1001 (2), D = 1101 (3), 3 = 0011 (2), E = 1110 (3). Total $= 2 + 3 + 2 + 3 = 10$, an even number.\nSince the word (data + parity) was received correctly, its total number of 1s is what the scheme enforces: **even parity**.\nThe position of the parity bit doesn't matter because all 16 bits are counted. Whether the *number* 9D3E is even is irrelevant: option D reaches the right conclusion for a reason that has nothing to do with parity.",
    source: "Style: PYP 2017-18 S1 Q1(a)(iii)",
  },
  {
    kind: "mcq",
    subtopic: "Parity checking",
    difficulty: "hard",
    prompt:
      "A transmitter uses **odd** parity and sends 9 bits, the leftmost being the parity bit. The 8-bit data is $9C_{16}$. The receiver gets $1\\,1101\\,1000$. Which statement is correct?",
    options: [
      "The transmitter sent 0 1001 1100; the receiver detects an error.",
      "The transmitter sent 1 1001 1100; the receiver detects an error because two bits differ.",
      "The transmitter sent 1 1001 1100; the parity check passes and the data is correct.",
      "The transmitter sent 1 1001 1100; the parity check passes, but two data bits are wrong, so the error goes undetected.",
      "The transmitter sent 0 1001 1100; the parity check passes.",
    ],
    answer: 3,
    solution:
      "$9C_{16} = 1001\\,1100$ has four 1s (even), so the odd parity bit is **1**: sent 1 1001 1100.\nReceived 1 1101 1000 has $1 + 3 + 1 = 5$ ones: odd, so the checker reports **no error**.\nBut comparing data bits, 1001 1100 → 1101 1000 differs in bit 6 and bit 2: a **double error**, which leaves the parity unchanged and is therefore **undetected**. The receiver cannot know that two bits differ (B), since it never sees the original.",
    source: "Style: PYP 2016-17 S1 Q1(a)",
  },
  {
    kind: "mcq",
    subtopic: "Parity capabilities",
    difficulty: "easy",
    prompt: "Which statement about a single parity bit is correct?",
    options: [
      "It detects and corrects any single-bit error.",
      "It detects any odd number of bit errors but cannot locate or correct them.",
      "It detects any number of bit errors.",
      "It detects only errors in the parity bit itself.",
      "Even parity detects double errors; odd parity detects single errors.",
    ],
    answer: 1,
    solution:
      "Flipping one bit (or any odd number) changes the parity of the count of 1s, so it is detected. Flipping an even number restores the parity, so it is missed. Parity says nothing about *which* bit flipped, so it cannot correct. Even and odd parity have exactly the same detecting ability.",
    source: "Original",
  },
  // ---------------------------------------------------------------- structured
  {
    kind: "open",
    subtopic: "Decimal to hex with significant digits",
    difficulty: "hard",
    prompt:
      "(a) Convert the decimal number $173.618$ to **hexadecimal**. Your answer must have **6 significant digits**. Show the steps clearly. (4 marks)\n(b) Hence write your answer in binary and in octal. (2 marks)\n(c) By how much does your 6-digit hex value differ from 173.618? Explain where the difference comes from. (2 marks)",
    solution:
      "Integer by repeated division ($173 = AD_{16}$), fraction by repeated multiplication ($0.618 \\to 9, E, 3, 5$), giving $AD.9E35_{16}$. Then expand each hex digit to 4 bits and regroup by 3 from the radix point for octal. The value is slightly less than 173.618 because the hex fraction does not terminate and was cut after 4 digits.",
    modelAnswer:
      "(a) Integer: $173 \\div 16 = 10$ r $13$ (D); $10 \\div 16 = 0$ r $10$ (A) → $AD$.\nFraction: $0.618\\times16 = 9.888$ → 9; $0.888\\times16 = 14.208$ → E; $0.208\\times16 = 3.328$ → 3; $0.328\\times16 = 5.248$ → 5.\n6 significant digits: **AD.9E35**$_{16}$. (Next digit $0.248\\times16 = 3.968$ → 3, so rounding would not change it.)\n(b) Binary: $1010\\,1101.1001\\,1110\\,0011\\,0101_2$.\nOctal (group in 3s from the point): $010\\,101\\,101\\,.\\,100\\,111\\,100\\,011\\,010\\,1(00)$ → **255.474324**$_8$.\n(c) $AD.9E35_{16} = 173 + 9/16 + 14/256 + 3/4096 + 5/65536 = 173.6179962\\ldots$, about $3.8\\times10^{-6}$ below 173.618. The fraction $0.618$ does not terminate in base 16, so stopping after 4 fraction digits truncates it; the error is less than one unit in the last place ($16^{-4} = 1.5\\times10^{-5}$).",
    rubric: [
      { point: "(a) Integer part AD by repeated division, remainders read upward", marks: 1 },
      { point: "(a) Fraction digits 9, E, 3, 5 by repeated multiplication", marks: 2 },
      { point: "(a) Final answer AD.9E35 with exactly 6 significant digits", marks: 1 },
      { point: "(b) Correct binary expansion of the hex answer", marks: 1 },
      { point: "(b) Octal 255.474324 grouped from the radix point", marks: 1 },
      { point: "(c) Difference ≈ 3.8 × 10⁻⁶ (value slightly smaller)", marks: 1 },
      { point: "(c) Explains truncation of a non-terminating fraction", marks: 1 },
    ],
    source: "Style: PYP 2018-19 S2 Q1(a)",
  },
  {
    kind: "open",
    subtopic: "Gray code",
    difficulty: "medium",
    prompt:
      "(a) Write out a 3-bit Gray code sequence using the reflect-and-prefix method, and show the binary value of each code. (3 marks)\n(b) Briefly describe its merit over a straight binary sequence when an 8-step process (for example an 8-position rotary switch) must be tracked in the correct order. (2 marks)\n(c) Draw a circuit that converts a 3-bit binary number $B_2B_1B_0$ into its Gray code $G_2G_1G_0$. (3 marks)",
    solution:
      "Reflect the 2-bit sequence 00, 01, 11, 10, prefix 0 to the first half and 1 to the mirrored half. Gray's merit: one bit changes per step (including the wrap-around), so no false intermediate states. Converter: $G_2 = B_2$, $G_1 = B_2 \\oplus B_1$, $G_0 = B_1 \\oplus B_0$.",
    modelAnswer:
      "(a) 1-bit: 0, 1. 2-bit: 00, 01, 11, 10. 3-bit: prefix 0 to the 2-bit list and 1 to its mirror image:\n000 (0), 001 (1), 011 (2), 010 (3), 110 (4), 111 (5), 101 (6), 100 (7), then back to 000.\n(b) Only **one bit changes** between any two successive steps, including 7 → 0. If the bits do not switch at exactly the same time (mechanical contacts, misaligned sensors, unequal delays), a binary code can pass through false intermediate values (e.g. 011 → 100 may be read as 111 or 000), whereas a Gray code can only show the old or the new step, so the process never appears to jump out of order.\n(c) $G_2 = B_2$, $G_1 = B_2 \\oplus B_1$, $G_0 = B_1 \\oplus B_0$: two XOR gates (see figure).",
    modelFigures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["B2", "B1", "B0"],
          gates: [
            { id: "G2", type: "BUF", in: ["B2"] },
            { id: "G1", type: "XOR", in: ["B2", "B1"] },
            { id: "G0", type: "XOR", in: ["B1", "B0"] },
          ],
          outputs: ["G2", "G1", "G0"],
        },
        caption: "3-bit binary-to-Gray converter",
      },
    ],
    rubric: [
      { point: "(a) Correct 3-bit Gray sequence in order", marks: 2 },
      { point: "(a) Shows the reflect-and-prefix construction / binary values", marks: 1 },
      { point: "(b) States only one bit changes per step, including the wrap-around", marks: 1 },
      { point: "(b) Explains that binary can pass through false intermediate codes", marks: 1 },
      { point: "(c) $G_2 = B_2$", marks: 1 },
      { point: "(c) $G_1 = B_2 \\oplus B_1$ and $G_0 = B_1 \\oplus B_0$ drawn with XOR gates", marks: 2 },
    ],
    source: "Style: PYP 2018-19 S2 Q1(b)",
  },
  {
    kind: "open",
    subtopic: "Parity error detection",
    difficulty: "hard",
    prompt:
      "A transmitter sends the string \"OK\" as two 8-bit frames. Each frame is the 7-bit ASCII code of the character with an **odd** parity bit added as the leftmost bit.\n(a) Determine the two frames transmitted. (3 marks)\n(b) The receiver gets the frames $0100\\,1101$ and $1110\\,1010$. For each frame, state whether the receiver detects an error, and whether the frame actually contains an error. (4 marks)\n(c) State one limitation of the parity method shown by your answer to (b). (1 mark)",
    solution:
      "'O' = 4F = 100 1111 (five 1s, odd) → P = 0; 'K' = 4B = 100 1011 (four 1s) → P = 1. A frame passes the odd-parity check when its total number of 1s is odd; compare with the frames actually sent to count flipped bits.",
    modelAnswer:
      "(a) 'O' = $4F_{16} = 100\\,1111$ has five 1s (already odd) → parity 0 → frame **0100 1111**.\n'K' = $4B_{16} = 100\\,1011$ has four 1s → parity 1 → frame **1100 1011**.\n(b) Frame 1, $0100\\,1101$: four 1s (even) → the odd-parity check **fails: error detected**. Compared with 0100 1111, bit 1 has flipped: one error, correctly detected.\nFrame 2, $1110\\,1010$: five 1s (odd) → the check **passes: no error detected**. But compared with 1100 1011, bits 5 and 0 have flipped: **two errors, undetected** (the received character would be read as $6A$ = 'j').\n(c) A single parity bit cannot detect an even number of bit errors (and cannot locate or correct even a single error).",
    rubric: [
      { point: "(a) Correct ASCII codes 4F and 4B", marks: 1 },
      { point: "(a) Correct odd parity bits: frames 0100 1111 and 1100 1011", marks: 2 },
      { point: "(b) Frame 1: error detected (even count) and it is a real single-bit error", marks: 2 },
      { point: "(b) Frame 2: check passes, but two bits are wrong (undetected)", marks: 2 },
      { point: "(c) Even number of errors not detected / cannot correct", marks: 1 },
    ],
    source: "Style: PYP 2016-17 S1 Q1(a)",
  },
];
