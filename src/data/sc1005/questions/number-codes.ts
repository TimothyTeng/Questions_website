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
      "Multiply by the weights and add. Integer: $8 + 4 + 0 + 1 = 13$. Fraction: $1\\times2^{-1} + 0\\times2^{-2} + 1\\times2^{-3} = 0.5 + 0.125 = 0.625$.\nSo $1101.101_2 = $ **13.625**.\n- 13.101 copies the fraction bits as if they were decimal digits.\n- 13.375 reads the fraction bits in reverse ($0.101 \\to 0.25 + 0.125$).",
    source: "Style: Week 1 summary F0-13",
  },
  // ---------------------------------------------------------------- decimal to base r
  {
    kind: "short",
    subtopic: "Decimal to hex (integer)",
    difficulty: "medium",
    prompt: "Convert the unsigned decimal value $3917$ to hexadecimal.",
    accept: ["F4D", "0xF4D"],
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
    accept: ["39.D4", "0x39.D4"],
    match: "text",
    placeholder: "e.g. 1A.2B",
    solution:
      "Integer: $57 \\div 16 = 3$ r $9$; $3 \\div 16 = 0$ r $3$ → $39_{16}$.\nFraction: $0.83 \\times 16 = 13.28$ → D; $0.28 \\times 16 = 4.48$ → 4.\nTwo integer digits + two fraction digits = 4 significant digits: **39.D4**$_{16}$.",
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
      "Repeated multiplication by 2 (take the integer part, keep multiplying the fraction):\n- $0.3912 \\times 2 = 0.7824$ → 0\n- $0.7824 \\times 2 = 1.5648$ → 1\n- $0.5648 \\times 2 = 1.1296$ → 1\n- $0.1296 \\times 2 = 0.2592$ → 0\n- $0.2592 \\times 2 = 0.5184$ → 0\n- $0.5184 \\times 2 = 1.0368$ → 1\n- $0.0368 \\times 2 = 0.0736$ → 0\n- $0.0736 \\times 2 = 0.1472$ → 0\nReading top-down: **0.01100100**$_2$ (= 0.390625).",
    source: "Style: Tut 1 Q6",
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
      "Integer: $19 = 16 + 2 + 1 = 10011_2$ (5 bits), so 7 fraction bits are needed for 12 significant bits.\nFraction: $0.43\\times2 = 0.86$ → 0; $1.72$ → 1; $1.44$ → 1; $0.88$ → 0; $1.76$ → 1; $1.52$ → 1; $1.04$ → 1.\nAnswer: **10011.0110111**$_2$.\nA common slip is to give 12 *fraction* bits; significant bits count from the leading 1.",
    source: "Style: PYP 2016-17 S1 Q1(b)(i)",
  },
  {
    kind: "mcq",
    subtopic: "Non-terminating fractions",
    difficulty: "medium",
    prompt: "Which statement about converting $0.1_{10}$ to binary by repeated multiplication is correct?",
    options: [
      "$0.1_{10} = 0.1_2$",
      "$0.1_{10} = 0.0001_2$ exactly",
      "$0.1_{10} = 0.000110011\\ldots_2$: the digits repeat and never end, so you stop after the number of bits asked for",
      "$0.1_{10} = 0.0001100110011_2$ exactly, using 13 fraction bits",
      "$0.1_{10}$ cannot be converted to binary because it is not an integer",
    ],
    answer: 2,
    solution:
      "Repeated multiplication: $0.2 → 0$, $0.4 → 0$, $0.8 → 0$, $1.6 → 1$, $1.2 → 1$, $0.4 → 0$, $0.8 → 0$, $1.6 → 1$, $1.2 → 1$, … The fraction 0.4 reappears, so the pattern 0011 repeats forever: $0.0\\overline{0011}_2$.\nAny finite number of bits (option D) is therefore only an approximation. $0.1_2 = 0.5$ and $0.0001_2 = 0.0625$.",
    source: "Style: Tut 1 Q6",
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
    source: "Style: Tut 1 Q5(b)",
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
    source: "Style: Week 1 summary F0-11; Tut 1 Q5",
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
    source: "Style: Week 1 summary F0-11 to F0-13; PYP 2021-22 S1 Q1 (MCQ format)",
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
    source: "Style: Week 1 summary F0-12, F0-16",
  },
  {
    kind: "mcq",
    subtopic: "Ranges",
    difficulty: "easy",
    prompt: "What is the largest decimal value that can be written with a **3-digit octal** number?",
    options: ["511", "512", "777", "999", "4095"],
    answer: 0,
    solution: "$777_8 = 7\\times64 + 7\\times8 + 7 = 511 = 8^3 - 1$. (512 is $8^3$, the number of values; 4095 is the 3-digit **hex** maximum $FFF_{16}$.)",
    source: "Style: Week 1 summary F0-14; Tut 1 Q1",
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
      "Replace each decimal digit separately with 4 bits:\n$8 = 1000$, $3 = 0011$, $6 = 0110$, $0 = 0000$, $7 = 0111$.\n$836.07 = $ **1000 0011 0110 . 0000 0111**$_{BCD}$.\nThe 0 after the point must be kept as 0000, otherwise the value becomes 836.7.",
    source: "Style: Tut 1 Q3",
  },
  {
    kind: "mcq",
    subtopic: "BCD validity",
    difficulty: "easy",
    prompt: "Which of the following bit patterns is **not** a valid BCD number?",
    options: ["1001 0110", "0101 1010", "0000 1000", "0111 0011", "0100 1001"],
    answer: 1,
    solution: "BCD replaces each decimal digit (0 to 9 only) with 4 bits, so each group must be 0000–1001. In option B the second group is $1010 = 10$, which is not a decimal digit. All the other groups are 9 or less.",
    source: "Style: Week 1 summary F0-19",
  },
  {
    kind: "mcq",
    subtopic: "BCD vs binary",
    difficulty: "medium",
    prompt: "The 12-bit pattern $1001\\,0101\\,0111$ is stored in a register. What decimal value does it represent if it is interpreted (i) as BCD and (ii) as straight binary?",
    options: ["(i) 957, (ii) 2391", "(i) 2391, (ii) 957", "(i) 957, (ii) 957", "(i) invalid BCD, (ii) 2391", "(i) 957, (ii) 1431"],
    answer: 0,
    solution:
      "(i) BCD: each 4-bit group is a decimal digit: $1001 = 9$, $0101 = 5$, $0111 = 7$ → **957** (all groups are valid).\n(ii) Straight binary: the groups are hex digits, $957_{16} = 9\\times256 + 5\\times16 + 7 = 2304 + 80 + 7 = $ **2391**.",
    source: "Style: Tut 1 Q4",
  },
  {
    kind: "mcq",
    subtopic: "Bits for different codes",
    difficulty: "medium",
    prompt: "How many bits are required to represent an **8-digit telephone number** using (i) ASCII code and (ii) BCD?",
    options: ["(i) 56, (ii) 32", "(i) 64, (ii) 27", "(i) 32, (ii) 56", "(i) 56, (ii) 27", "(i) 8, (ii) 4"],
    answer: 0,
    solution:
      "(i) ASCII uses 7 bits per character: $8 \\times 7 = $ **56 bits**.\n(ii) BCD uses 4 bits per digit: $8 \\times 4 = $ **32 bits**.\n27 bits is the straight-binary size ($2^{27} = 134\\,217\\,728 > 99\\,999\\,999$), which is not what was asked for BCD; 64 would be 8 bits per character.",
    source: "PYP 2017-18 S1 Q1(a)(ii)",
  },
  // ---------------------------------------------------------------- ASCII
  {
    kind: "short",
    subtopic: "ASCII",
    difficulty: "easy",
    prompt: "Determine the minimum number of bits required to represent an unsigned **10-digit** decimal value in **standard ASCII**.",
    accept: ["70"],
    match: "number",
    solution: "Standard ASCII uses 7 bits for each character (F0-20), and each decimal digit is one character: $10 \\times 7 = $ **70 bits**.\n(For comparison: BCD needs $10 \\times 4 = 40$ bits and straight binary 34 bits.)",
    source: "PYP 2020-21 S2 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Same bits, different codes",
    difficulty: "medium",
    prompt: "The 8-bit pattern $0011\\,1000$ is stored. What does it represent if it is read as (i) straight binary, (ii) BCD and (iii) ASCII?",
    options: [
      "(i) 56, (ii) 38, (iii) the character '8'",
      "(i) 38, (ii) 56, (iii) the character '8'",
      "(i) 56, (ii) 56, (iii) the character '8'",
      "(i) 56, (ii) invalid BCD, (iii) the character '8'",
      "(i) 56, (ii) 38, (iii) the characters '5' and '6'",
    ],
    answer: 0,
    solution:
      "(i) Straight binary: $32 + 16 + 8 = $ **56** (Tutorial 1 Q4(a)).\n(ii) BCD: each 4-bit group is a digit, $0011 = 3$ and $1000 = 8$ → **38**.\n(iii) ASCII: $0011\\,1000$ is the character **'8'** (Tutorial 1 Q4(b)); one 7-bit code is one character.\nSame bits, three different meanings: the question must say which code is meant.",
    source: "Style: Tut 1 Q4",
  },
  // ---------------------------------------------------------------- Gray code
  {
    kind: "mcq",
    subtopic: "Gray code sequences",
    difficulty: "medium",
    prompt: "Which of the following is a valid 3-bit **Gray code** sequence (it repeats after the last code)?",
    options: [
      "000 → 001 → 010 → 011 → 100 → 101 → 110 → 111",
      "000 → 001 → 011 → 111 → 110 → 100 → 101 → 010",
      "000 → 001 → 011 → 010 → 110 → 100 → 101 → 111",
      "000 → 100 → 101 → 001 → 011 → 111 → 110 → 010",
      "000 → 100 → 110 → 111 → 011 → 001 → 010 → 101",
    ],
    answer: 3,
    solution:
      "In a Gray code sequence only 1 bit changes at a time when moving through the code words, including the step from the last code back to the first when the sequence repeats.\n- D: 000→100→101→001→011→111→110→010, and 010→000 on the repeat: every step changes one bit ✓.\n- A is straight binary: 001→010 changes two bits.\n- B fails at 101→010 (three bits).\n- C is fine until the repeat: 111→000 changes three bits.\n- E fails at 001→010 (two bits).",
    source: "Style: Week 1 summary F0-21, F0-22; PYP 2018-19 S2 Q1(b)",
  },
  {
    kind: "short",
    subtopic: "Gray code sequences",
    difficulty: "medium",
    prompt: "Determine the missing code (i) in this 3-bit Gray code sequence, which repeats after the last code:\n$000 \\to 010 \\to 110 \\to \\text{(i)} \\to 101 \\to 111 \\to 011 \\to 001$",
    accept: ["100"],
    match: "text",
    placeholder: "3 bits",
    solution:
      "(i) must differ in exactly one bit from **both** neighbours, 110 and 101.\nOne bit from 110: 010, 100, 111. One bit from 101: 001, 100, 111. Common: 100 and 111.\n111 already appears later in the sequence, so (i) = **100**.\nCheck the repeat 001 → 000: one bit ✓.",
    source: "Style: PYP 2016-17 S2 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Gray code sequences",
    difficulty: "hard",
    prompt: "The following is a 3-bit Gray code sequence (it repeats after the last code). Determine code (i) and code (ii).\n$000 \\to 001 \\to \\text{(i)} \\to 111 \\to 101 \\to \\text{(ii)} \\to 110 \\to 010 \\to$ (repeats)",
    options: ["(i) 011, (ii) 100", "(i) 010, (ii) 100", "(i) 011, (ii) 111", "(i) 101, (ii) 100", "(i) 011, (ii) 001"],
    answer: 0,
    solution:
      "In a Gray sequence each step changes exactly one bit and each code is used once.\n- (i) must be one bit from 001 and from 111: candidates 011 and 101. 101 is already used later, so (i) = **011**.\n- (ii) must be one bit from 101 and from 110: candidates 100 and 111. 111 is already used, so (ii) = **100**.\nCheck the repeat 010 → 000: one bit ✓.",
    source: "Style: PYP 2016-17 S2 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Gray code properties",
    difficulty: "medium",
    prompt: "An 8-step process is repeated in order, with each step identified by a 3-bit code. What is the merit of using a **Gray code** sequence rather than a straight binary sequence?",
    options: [
      "A Gray code uses fewer bits than straight binary for the same 8 steps.",
      "Only one bit changes between successive steps, including when the process repeats from the last step back to the first.",
      "Gray codes have place values, so the step number can be read off directly.",
      "A Gray code sequence detects a 1-bit error in the same way as a parity bit.",
      "Every step changes all three bits, so each change is easy to see.",
    ],
    answer: 1,
    solution:
      "Gray code: only 1 bit changes at a time when moving through the code words in sequence (F0-21), and this holds for the repeat from the last code back to the first as well.\nIn straight binary several bits can change at once: $011 \\to 100$ changes all three bits, and so does the repeat $111 \\to 000$.\nBoth codes use 3 bits for 8 steps (A is false), and a Gray code is not an error-detecting code (D is false).",
    source: "Style: PYP 2018-19 S2 Q1(b)",
  },
  {
    kind: "mcq",
    subtopic: "Gray code properties",
    difficulty: "easy",
    prompt: "Using the lecture table (decimal 7, 8 → binary 0111, 1000 → Gray 0100, 1100), how many bits change when moving from decimal 7 to decimal 8 in (i) straight binary and (ii) Gray code?",
    options: ["(i) 4, (ii) 1", "(i) 1, (ii) 4", "(i) 4, (ii) 4", "(i) 1, (ii) 1", "(i) 3, (ii) 1"],
    answer: 0,
    solution: "Binary: 0111 → 1000, all **4** bits change.\nGray: 0100 → 1100, only the MSB changes: **1** bit. This is the defining property of the Gray code: 1 bit change at a time when moving through the code words in sequence (F0-21).",
    source: "Style: Week 1 summary F0-21",
  },
  // ---------------------------------------------------------------- parity
  {
    kind: "short",
    subtopic: "Parity generation",
    difficulty: "medium",
    prompt: "The 7-bit code $101\\,1011$ is transmitted with an **odd** parity bit added as the most significant (leftmost) bit. Give the 8 bits transmitted.",
    accept: ["01011011", "0101 1011"],
    match: "text",
    placeholder: "8 bits",
    solution: "$101\\,1011$ contains five 1s, which is already odd.\nThe odd parity bit is therefore **0**, and the transmitted byte is **0101 1011**.",
    source: "Style: Week 1 summary F0-23; Tut 1 Q7",
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
      "$9C_{16} = 1001\\,1100$ has four 1s (even), so the odd parity bit is **1**: sent 1 1001 1100.\nReceived 1 1101 1000 has $1 + 3 + 1 = 5$ ones: odd, so the checker reports **no error**.\nBut comparing data bits, 1001 1100 → 1101 1000 differs in bit 6 and bit 2: a **2-bit error**, which leaves the parity unchanged and is therefore **undetected** (parity can only detect a 1-bit error). The receiver cannot know that two bits differ (B), since it never sees the original.",
    source: "Style: PYP 2016-17 S1 Q1(a)",
  },
  {
    kind: "mcq",
    subtopic: "Parity capabilities",
    difficulty: "easy",
    prompt: "Which statement about a single parity bit is correct?",
    options: [
      "It detects and corrects a 1-bit error.",
      "It can detect a 1-bit error, but a 2-bit error is not detected.",
      "It detects any number of bit errors.",
      "It detects only errors in the parity bit itself.",
      "Even parity detects 2-bit errors; odd parity detects 1-bit errors.",
    ],
    answer: 1,
    solution:
      "The lecture states the limitation directly: parity **can only detect a 1-bit error** (F0-23).\nFlipping one bit changes the number of 1s by one, so the count has the wrong parity and the error is detected. Flipping two bits changes the count by 0 or 2, so the parity is unchanged and the error is missed.\nThe checker only learns that the count has the wrong parity, not which bit flipped, so it cannot correct anything. Even and odd parity work the same way, so E is false.",
    source: "Week 1 summary F0-23",
  },
  // ---------------------------------------------------------------- structured
  {
    kind: "open",
    subtopic: "Decimal to hex with significant digits",
    difficulty: "hard",
    prompt:
      "(a) Convert the decimal number $173.618$ to **hexadecimal**. Your answer must have **6 significant digits**. Show the steps clearly. (4 marks)\n(b) Hence write your answer in binary and in octal. (2 marks)\n(c) By how much does your 6-digit hex value differ from 173.618? Explain where the difference comes from. (2 marks)",
    solution:
      "Integer by repeated division ($173 = AD_{16}$), fraction by repeated multiplication ($0.618 \\to 9, E, 3, 5$), giving $AD.9E35_{16}$. Then expand each hex digit to 4 bits and regroup by 3 from the radix point for octal. The value is slightly less than 173.618 because the hex fraction does not end and was cut after 4 digits.",
    modelAnswer:
      "(a) Integer: $173 \\div 16 = 10$ r $13$ (D); $10 \\div 16 = 0$ r $10$ (A) → $AD$.\nFraction: $0.618\\times16 = 9.888$ → 9; $0.888\\times16 = 14.208$ → E; $0.208\\times16 = 3.328$ → 3; $0.328\\times16 = 5.248$ → 5.\n6 significant digits: **AD.9E35**$_{16}$.\n(b) Binary: $1010\\,1101.1001\\,1110\\,0011\\,0101_2$.\nOctal (group in 3s from the point): $010\\,101\\,101\\,.\\,100\\,111\\,100\\,011\\,010\\,1(00)$ → **255.474324**$_8$.\n(c) $AD.9E35_{16} = 173 + 9/16 + 14/256 + 3/4096 + 5/65536 = 173.6179962\\ldots$, about $3.8\\times10^{-6}$ below 173.618. The fraction $0.618$ does not end in base 16 (the multiplication never reaches a zero fraction), so stopping after 4 fraction digits cuts it short; the difference is less than one unit in the last digit ($16^{-4} = 1.5\\times10^{-5}$).",
    rubric: [
      { point: "(a) Integer part AD by repeated division, remainders read upward", marks: 1 },
      { point: "(a) Fraction digits 9, E, 3, 5 by repeated multiplication", marks: 2 },
      { point: "(a) Final answer AD.9E35 with exactly 6 significant digits", marks: 1 },
      { point: "(b) Correct binary expansion of the hex answer", marks: 1 },
      { point: "(b) Octal 255.474324 grouped from the radix point", marks: 1 },
      { point: "(c) Difference ≈ 3.8 × 10⁻⁶ (value slightly smaller)", marks: 1 },
      { point: "(c) Explains that the fraction does not end and was cut after 4 digits", marks: 1 },
    ],
    source: "Style: PYP 2018-19 S2 Q1(a)",
  },
  {
    kind: "open",
    subtopic: "Gray code",
    difficulty: "medium",
    prompt:
      "(a) Write out a 3-bit Gray code sequence of 8 codes and show that it has the Gray code property. (3 marks)\n(b) Briefly describe its merit over a straight binary code sequence in repeating an 8-step process in the correct order. (2 marks)\n(c) Determine codes (i) and (ii) in the following Gray code sequence, which repeats after the last code. Briefly state how you arrive at each answer.\n$001 \\to 000 \\to \\text{(i)} \\to 110 \\to 010 \\to 011 \\to \\text{(ii)} \\to 101$ (3 marks)",
    solution:
      "A Gray sequence changes only 1 bit at a time when moving through the code words, including the repeat from the last code to the first. Each missing code must be one bit away from both neighbours and not already used elsewhere.",
    modelAnswer:
      "(a) For example: 000, 001, 011, 010, 110, 111, 101, 100, then back to 000. Each step changes exactly one bit: 000→001 (bit 0), 001→011 (bit 1), 011→010 (bit 0), 010→110 (bit 2), 110→111 (bit 0), 111→101 (bit 1), 101→100 (bit 0), and the repeat 100→000 (bit 2). All 8 codes appear once. (Any sequence with these properties earns the marks.)\n(b) Only **one bit changes** between any two successive steps, including the repeat from step 8 back to step 1. In straight binary several bits change at once, e.g. 011 → 100 and the repeat 111 → 000 each change all three bits.\n(c) (i) One bit from 000: 001, 010, 100; one bit from 110: 010, 100, 111. Common: 010 and 100; 010 is already used, so (i) = **100**.\n(ii) One bit from 011: 001, 010, 111; one bit from 101: 001, 100, 111. Common: 001 and 111; 001 is already used, so (ii) = **111**.\nCheck the repeat 101 → 001: one bit ✓.",
    rubric: [
      { point: "(a) A valid sequence of all 8 codes", marks: 2 },
      { point: "(a) Shows one bit changes per step, including the repeat", marks: 1 },
      { point: "(b) States only one bit changes per step, including the repeat", marks: 1 },
      { point: "(b) Contrasts with binary, where several bits change at once (e.g. 011→100, 111→000)", marks: 1 },
      { point: "(c) (i) = 100 with reasoning", marks: 1 },
      { point: "(c) (ii) = 111 with reasoning", marks: 1 },
      { point: "(c) Rejects the candidate already used in the sequence", marks: 1 },
    ],
    source: "Style: PYP 2018-19 S2 Q1(b); PYP 2016-17 S2 Q1(b)",
  },
  {
    kind: "open",
    subtopic: "Parity error detection",
    difficulty: "hard",
    prompt:
      "A transmitter sends two 7-bit codes, $100\\,1111$ and $100\\,1011$, as two 8-bit frames. Each frame is the 7-bit code with an **odd** parity bit added as the leftmost bit.\n(a) Determine the two frames transmitted. (3 marks)\n(b) The receiver gets the frames $0100\\,1101$ and $1110\\,1010$. For each frame, state whether the receiver detects an error, and whether the frame actually contains an error. (4 marks)\n(c) State the limitation of the parity method shown by your answer to (b). (1 mark)",
    solution:
      "Count the 1s in each code to choose the odd parity bit. A frame passes the odd-parity check when its total number of 1s is odd; compare with the frames actually sent to count flipped bits.",
    modelAnswer:
      "(a) $100\\,1111$ has five 1s (already odd) → parity 0 → frame **0100 1111**.\n$100\\,1011$ has four 1s → parity 1 → frame **1100 1011**.\n(b) Frame 1, $0100\\,1101$: four 1s (even) → the odd-parity check **fails: error detected**. Compared with 0100 1111, bit 1 has flipped: a 1-bit error, correctly detected.\nFrame 2, $1110\\,1010$: five 1s (odd) → the check **passes: no error detected**. But compared with 1100 1011, bits 5 and 0 have flipped: a **2-bit error, undetected**.\n(c) Parity can only detect a 1-bit error (F0-23); a 2-bit error leaves the parity unchanged and is not detected.",
    rubric: [
      { point: "(a) Correct count of 1s in each 7-bit code", marks: 1 },
      { point: "(a) Correct odd parity bits: frames 0100 1111 and 1100 1011", marks: 2 },
      { point: "(b) Frame 1: error detected (even count) and it is a real 1-bit error", marks: 2 },
      { point: "(b) Frame 2: check passes, but two bits are wrong (undetected)", marks: 2 },
      { point: "(c) Can only detect a 1-bit error / 2-bit error not detected", marks: 1 },
    ],
    source: "Style: PYP 2016-17 S1 Q1(a); Week 1 summary F0-23",
  },
];
