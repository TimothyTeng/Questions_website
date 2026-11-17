import type { Draft } from "@/lib/sc1005/types";

export const arithmeticQuestions: Draft[] = [
  // ------------------------------------------------------------------ unsigned add / subtract
  {
    kind: "short",
    subtopic: "Unsigned add/subtract",
    difficulty: "easy",
    prompt: "Perform the unsigned binary addition $1011\\,0110_2 + 0110\\,1011_2$. Give the full result in binary (including any carry out).",
    accept: ["100100001", "1 0010 0001"],
    match: "text",
    placeholder: "binary result",
    solution:
      "Column by column from the LSB (carry in brackets):\n- b0: $0 + 1 = 1$\n- b1: $1 + 1 = 0$ (1)\n- b2: $1 + 0 + 1 = 0$ (1)\n- b3: $0 + 1 + 1 = 0$ (1)\n- b4: $1 + 0 + 1 = 0$ (1)\n- b5: $1 + 1 + 1 = 1$ (1)\n- b6: $0 + 1 + 1 = 0$ (1)\n- b7: $1 + 0 + 1 = 0$ (1), carry out 1\nResult $1\\,0010\\,0001_2 = 289$. Check: $182 + 107 = 289$ ✓.",
    source: "Style: Tut 3 Q1(a)",
  },
  {
    kind: "short",
    subtopic: "Unsigned add/subtract",
    difficulty: "medium",
    prompt: "Perform the unsigned binary subtraction $1101\\,0010_2 - 0110\\,1101_2$. Give the 8-bit result.",
    accept: ["01100101", "0110 0101"],
    match: "text",
    placeholder: "8-bit result",
    solution:
      "From the LSB (borrow in brackets):\n- b0: $0 - 1$ → borrow: $2 - 1 = 1$ (borrow 1)\n- b1: $1 - 0 - 1 = 0$\n- b2: $0 - 1$ → $2 - 1 = 1$ (borrow 1)\n- b3: $0 - 1 - 1$ → $2 - 2 = 0$ (borrow 1)\n- b4: $1 - 0 - 1 = 0$\n- b5: $0 - 1$ → $2 - 1 = 1$ (borrow 1)\n- b6: $1 - 1 - 1$ → $2 + 1 - 2 = 1$ (borrow 1)\n- b7: $1 - 0 - 1 = 0$\nResult $0110\\,0101_2 = 101$. Check: $210 - 109 = 101$ ✓.",
    source: "Style: Tut 3 Q1(b)",
  },
  // ------------------------------------------------------------------ adders
  {
    kind: "mcq",
    subtopic: "Half & full adders",
    difficulty: "easy",
    prompt: "Which pair of equations describes a **half adder** with inputs $A$, $B$?",
    options: [
      "Sum $= A \\oplus B$, Carry $= AB$",
      "Sum $= A + B$, Carry $= AB$",
      "Sum $= A \\oplus B$, Carry $= A + B$",
      "Sum $= (A \\oplus B)'$, Carry $= AB$",
      "Sum $= AB$, Carry $= A \\oplus B$",
    ],
    answer: 0,
    solution:
      "Adding two bits: $0 + 0 = 00$, $0 + 1 = 01$, $1 + 0 = 01$, $1 + 1 = 10$ (carry, sum).\nThe sum column is 0110 = XOR; the carry column is 0001 = AND.\nOR for the sum would give $1 + 1 = 1$, which is wrong.",
    source: "Style: Lecture 4-4",
  },
  {
    kind: "mcq",
    subtopic: "Half & full adders",
    difficulty: "medium",
    prompt: "Which expression is **not** a correct expression for the carry out $C_{out}$ of a full adder with inputs $A$, $B$, $C_{in}$?",
    options: [
      "$AB + C_{in}(A \\oplus B)$",
      "$AB + C_{in}(A + B)$",
      "$(A \\oplus B)C_{in} + AB'$",
      "$AB + BC_{in} + AC_{in} + ABC_{in}$",
      "$(A \\oplus B)'A + (A \\oplus B)C_{in}$",
    ],
    answer: 2,
    solution:
      "From the full-adder truth table, $C_{out}$ is 1 when at least two inputs are 1: $C_{out} = AB + BC_{in} + AC_{in}$.\n- A: half-adder form, correct.\n- B: $C_{in}(A + B)$ differs from $C_{in}(A \\oplus B)$ only when $A = B = 1$, where $AB$ is already 1: correct.\n- D: the extra $ABC_{in}$ is absorbed by $AB$: correct.\n- E: when $A = B$ the carry is $A$; when $A \\ne B$ the carry is $C_{in}$: correct.\n- **C** is wrong: for $A = 1, B = 0, C_{in} = 0$ it gives $AB' = 1$, but $1 + 0 + 0$ has no carry.",
    source: "Style: Lecture 4-6 to 4-8",
  },
  {
    kind: "short",
    subtopic: "Half & full adders",
    difficulty: "medium",
    prompt:
      "A full adder is built from two half adders (HA1 adds $A$ and $B$; HA2 adds HA1's sum and $C_{in}$) and an OR gate that combines the two half-adder carries $C_1$ and $C_2$. Write $C_2$, the carry output of HA2, in terms of $A$, $B$ and $C_{in}$. (Type `Cin` for $C_{in}$ and `^` for XOR.)",
    accept: ["Cin(A ^ B)", "A B' Cin + A' B Cin"],
    match: "expr",
    vars: ["A", "B", "Cin"],
    placeholder: "e.g. Cin(A ^ B)",
    solution:
      "HA1 produces $S_1 = A \\oplus B$ and $C_1 = AB$. HA2 adds $S_1$ and $C_{in}$, so its carry is the AND of its inputs:\n$C_2 = S_1\\,C_{in} = C_{in}(A \\oplus B) = AB'C_{in} + A'BC_{in}$.\nThen $C_{out} = C_1 + C_2 = AB + C_{in}(A \\oplus B)$.",
    source: "Style: Lecture 4-9",
  },
  {
    kind: "mcq",
    subtopic: "Ripple-carry adder",
    difficulty: "medium",
    prompt:
      "A four-bit parallel adder is constructed from four full adders. Which statement about **carry propagation** and **carry look-ahead** is correct?",
    options: [
      "The addition speed is limited by the propagation delays of the full adders, because a carry may have to pass through every stage; a carry look-ahead circuit reduces this carry propagation",
      "The operand bits are fed into the full adders one bit at a time, so a 4-bit addition takes four separate additions",
      "Carry propagation only matters for subtraction, because addition never produces a carry out of the MSB",
      "A carry look-ahead circuit removes the need for full adders, so the parallel adder no longer needs them",
      "Carry propagation means the carry out of the MSB is fed back into the carry in of the LSB",
    ],
    answer: 0,
    solution:
      "In a parallel (ripple) adder all bits of the augend and addend are fed in **simultaneously**, but each full adder must wait for the carry from the stage below, so the addition speed is limited by the propagation delays of the FAs: **carry propagation** (e.g. $0111 + 0001$ produces a carry that passes through all four stages).\nCarry propagation can be reduced, increasing the speed of addition, by a special-purpose **carry-look-ahead** circuit; many IC parallel adders have one built in. So A is correct.\n- B is wrong: the bits are applied simultaneously (that is why it is called parallel).\n- C is wrong: carries arise in ordinary addition, e.g. $0011 + 0001$.\n- D is wrong: the look-ahead circuit speeds up the carries; the full adders still do the addition.\n- E is wrong: the carry out of each FA goes to the next more significant FA, and the carry out of the MSB stage is the adder's carry out $C_4$.",
    source: "Style: PYP 2017-18 S1 Q2(b)(ii)-(iii); Lecture 4-11, 4-49",
  },
  {
    kind: "short",
    subtopic: "Ripple-carry adder",
    difficulty: "easy",
    prompt: "A 4-bit ripple-carry adder with $C_0 = 0$ adds $A = 1011$ and $B = 0101$. How many of the carry signals $C_1, C_2, C_3, C_4$ are 1?",
    accept: ["4"],
    match: "number",
    solution:
      "- Bit 0: $1 + 1 = 10_2$ → $S_0 = 0$, $C_1 = 1$\n- Bit 1: $1 + 0 + 1$ → $S_1 = 0$, $C_2 = 1$\n- Bit 2: $0 + 1 + 1$ → $S_2 = 0$, $C_3 = 1$\n- Bit 3: $1 + 0 + 1$ → $S_3 = 0$, $C_4 = 1$\nAll **4** carries are 1 (the carry ripples through every stage): $11 + 5 = 16 = 1\\,0000_2$.",
    source: "Style: Lecture 4-10 to 4-12",
  },
  // ------------------------------------------------------------------ signed representations
  {
    kind: "mcq",
    subtopic: "Signed representations",
    difficulty: "easy",
    prompt: "What range of integers can an 8-bit **sign-magnitude** number represent?",
    options: ["$-127$ to $+127$", "$-128$ to $+127$", "$-127$ to $+128$", "$0$ to $255$", "$-255$ to $+255$"],
    answer: 0,
    solution:
      "One bit is the sign and 7 bits hold the magnitude, so the magnitude is 0 to $2^7 - 1 = 127$: range $-(2^{N-1} - 1)$ to $+(2^{N-1} - 1)$ = −127 … +127 (with two zeros, +0 and −0).\n−128 … +127 is the 8-bit **2's complement** range.",
    source: "Style: Lecture 4-14",
  },
  {
    kind: "short",
    subtopic: "Signed representations",
    difficulty: "medium",
    prompt: "Write $-76_{10}$ as an 8-bit 2's complement number (binary).",
    accept: ["10110100", "1011 0100"],
    match: "text",
    placeholder: "8 bits",
    solution:
      "$76 = 64 + 8 + 4 = 0100\\,1100_2$.\nNegate with the shortcut: copy from the LSB up to and including the first 1 ($\\ldots100$), invert the rest: $1011\\,0100$.\nCheck with weights: $-128 + 32 + 16 + 4 = -76$ ✓ (hex $B4$).",
    source: "Style: L1-L12 practice, L4 (signed number representations); PYP 2016-17 S2 Q1(a)",
  },
  {
    kind: "short",
    subtopic: "Signed representations",
    difficulty: "medium",
    prompt: "What is the signed decimal value of the 8-bit 2's complement number $1010\\,1101$?",
    accept: ["-83"],
    match: "number",
    solution:
      "MSB = 1, so the number is negative. Using the weights: $-128 + 32 + 8 + 4 + 1 = -83$.\nOr negate: $1010\\,1101 \\to 0101\\,0011 = 83$, so the value is $-83$.",
    source: "Style: PYP 2017-18 S1 Q1(a)(iv)",
  },
  {
    kind: "mcq",
    subtopic: "Sign extension",
    difficulty: "medium",
    prompt: "The 5-bit 2's complement number $10110$ is to be stored in an 8-bit register without changing its value. What is stored?",
    options: ["$1111\\,0110$", "$0001\\,0110$", "$1000\\,0110$", "$1011\\,0000$", "$0000\\,1010$"],
    answer: 0,
    solution:
      "Sign extension: copy the sign bit (1) into the three new upper bits: $111 + 10110 = 1111\\,0110$.\nCheck: $10110 = -16 + 4 + 2 = -10$ and $1111\\,0110 = -128 + 64 + 32 + 16 + 4 + 2 = -10$ ✓.\nPadding with zeros ($0001\\,0110 = +22$) changes the value; $1000\\,0110$ reads as $-128 + 6 = -122$; $0000\\,1010$ is $+10$.",
    source: "Style: Lecture 4-29",
  },
  {
    kind: "mcq",
    subtopic: "Signed representations",
    difficulty: "medium",
    prompt: "Which statement about $N$-bit 2's complement numbers is **true**?",
    options: [
      "The pattern $100\\cdots0$ represents $-0$",
      "The 2's complement of the most negative value $-2^{N-1}$ is that same bit pattern",
      "There are equal numbers of positive and negative values",
      "The pattern $111\\cdots1$ represents $-(2^{N-1} - 1)$",
      "Padding a negative number with leading 0s keeps its value",
    ],
    answer: 1,
    solution:
      "Negating $100\\cdots0$: invert → $011\\cdots1$, add 1 → $100\\cdots0$. The most negative number has no positive counterpart (e.g. +8 does not fit in 4 bits), so its 2's complement is itself: this is the exception noted in the lecture.\n- $100\\cdots0$ is $-2^{N-1}$; 2's complement has only one zero.\n- There is one more negative value than positive.\n- $111\\cdots1 = -1$.\n- Negative numbers must be sign-extended with 1s.",
    source: "Style: Lecture 4-25 to 4-30",
  },
  // ------------------------------------------------------------------ 2's complement arithmetic & overflow
  {
    kind: "mcq",
    subtopic: "2's complement arithmetic & overflow",
    difficulty: "hard",
    prompt: "Perform the 8-bit signed 2's complement addition $B5 + C9$ (values in hexadecimal). What is the 8-bit result, and does overflow occur?",
    options: ["$7E$, overflow", "$7E$, no overflow (the carry out is discarded)", "$17E$, no overflow", "$82$, overflow", "$7E$, no overflow because the operands have opposite signs"],
    answer: 0,
    solution:
      "$B5 = 1011\\,0101 = -75$ and $C9 = 1100\\,1001 = -55$.\n$1011\\,0101 + 1100\\,1001 = 1\\,0111\\,1110$. Ignore the carry out: $0111\\,1110 = 7E$.\nTwo negative operands (same sign) gave a positive result, so **overflow**: the true sum $-130$ is below $-128$.\nIgnoring the carry out does not remove the overflow (B), the result must stay 8 bits (C), and E is wrong because both operands are negative.",
    source: "Style: PYP 2016-17 S1 Q2(c); PYP 2018-19 S2 Q2(a)",
  },
  {
    kind: "mcq",
    subtopic: "2's complement arithmetic & overflow",
    difficulty: "hard",
    prompt: "Perform the 8-bit signed 2's complement subtraction $5A - A7$ (values in hexadecimal). What is the 8-bit result, and does overflow occur?",
    options: ["$B3$, overflow", "$B3$, no overflow", "$4D$, no overflow", "$B2$, overflow", "$13$, no overflow"],
    answer: 0,
    solution:
      "$5A = 0101\\,1010 = +90$, $A7 = 1010\\,0111 = -89$.\n$-A7$ = 2's complement of $1010\\,0111$ = $0101\\,1001 = 59_{16}$ (+89).\n$5A + 59 = 0101\\,1010 + 0101\\,1001 = 1011\\,0011 = B3$.\nTwo positive numbers were added and the result is negative, so **overflow**: $90 - (-89) = 179 > 127$. ($B3$ would read as −77.)\n$B2$ comes from forgetting the +1 (1's complement only); $13$ from adding $A7$ instead of subtracting.",
    source: "Style: PYP 2016-17 S1 Q2(c)(iii); PYP 2017-18 S2 Q1(d)",
  },
  {
    kind: "short",
    subtopic: "2's complement arithmetic & overflow",
    difficulty: "medium",
    prompt: "Perform the 8-bit 2's complement subtraction $0110\\,1001 - 1101\\,0110$ using 2's complement addition. Give the 8-bit result pattern (whether or not overflow occurs).",
    accept: ["10010011", "1001 0011"],
    match: "text",
    placeholder: "8 bits",
    solution:
      "2's complement of the subtrahend $1101\\,0110$: copy $\\ldots10$, invert the rest → $0010\\,1010$ (+42).\n$0110\\,1001 + 0010\\,1010 = 1001\\,0011$.\nCheck the sign: $+105 - (-42) = +147$, which does not fit in 8 bits. Two positives added gave a negative result ($1001\\,0011$ reads as −109), so overflow has occurred, but the bit pattern produced is $1001\\,0011$.",
    source: "Style: Tut 3 Q3",
  },
  {
    kind: "mcq",
    subtopic: "2's complement arithmetic & overflow",
    difficulty: "medium",
    prompt:
      "Which of these 8-bit 2's complement operations (hex values) produce an arithmetic overflow?\n- (i) $6E + 1C$\n- (ii) $92 + E5$\n- (iii) $40 - C0$\n- (iv) $D0 - 30$",
    options: ["(i), (ii) and (iii) only", "(i) and (ii) only", "(iii) and (iv) only", "(ii) only", "All four"],
    answer: 0,
    solution:
      "- (i) $+110 + 28 = 138 > 127$: two positives give $8A$ (negative) → **overflow**.\n- (ii) $-110 + (-27) = -137 < -128$: two negatives give $77$ (positive) → **overflow**.\n- (iii) $64 - (-64) = 128 > 127$: $40 + 40 = 80$ (negative) → **overflow**.\n- (iv) $-48 - 48 = -96$: in range. $D0 + D0 = 1A0$, keep $A0 = -96$ → no overflow.\nRule for subtraction: no overflow occurs if the operands have the same sign. In (iii) and (iv) the operands have opposite signs, so convert to addition and check: (iii) overflows, (iv) does not.",
    source: "Style: L1-L12 practice, L5 Q2-3",
  },
  {
    kind: "mcq",
    subtopic: "2's complement arithmetic & overflow",
    difficulty: "medium",
    prompt:
      "An $N$-bit 2's complement adder computes $S = A + B$. Let $a$, $b$, $s$ be the sign bits (MSBs) of $A$, $B$ and $S$. Which expression is 1 exactly when overflow occurs?",
    options: ["$a'b's + abs'$", "$a'b's' + abs$", "$C_N$ (the carry out of the MSB)", "$a \\oplus b \\oplus s$", "$a'bs + ab's'$"],
    answer: 0,
    solution:
      "Overflow happens only when both operands have the same sign and the sum has the opposite sign:\n- both positive ($a = b = 0$) with a negative sum ($s = 1$): $a'b's$\n- both negative ($a = b = 1$) with a positive sum ($s = 0$): $abs'$\nSo $V = a'b's + abs'$.\n- B flags the cases where the sum has the **same** sign as the operands, which are the correct results.\n- C: the carry out is ignored in 2's complement addition; e.g. $+10 + (-3)$ gives a carry out but the result $+7$ is correct.\n- D is 1 for $a = 0, b = 1, s = 0$, but operands of opposite sign never overflow.\n- E only looks at operands of opposite sign, which never overflow.",
    source: "Style: Lecture 4-40 / 4-41; PYP 2017-18 S2 Q1(d)(ii)",
  },
  {
    kind: "mcq",
    subtopic: "Add/subtract circuit",
    difficulty: "medium",
    prompt:
      "A 4-bit add/subtract circuit has an XOR gate on each $Y_i$ input (other XOR input = $M$) and $C_0 = M$. With $X = 0101$, $Y = 0111$ and $M = 1$, what are the full-adder $B$ inputs and the 4-bit result?",
    options: ["$B = 1000$, result $1110$", "$B = 0111$, result $1100$", "$B = 1000$, result $1101$", "$B = 1001$, result $1110$", "$B = 1000$, result $0010$"],
    answer: 0,
    solution:
      "With $M = 1$ each XOR inverts its $Y$ bit: $B = Y' = 1000$, and $C_0 = 1$.\nThe adder computes $X + Y' + 1 = 0101 + 1000 + 1 = 1110$, i.e. $5 - 7 = -2$ ✓.\n$1101$ forgets $C_0 = 1$ (1's complement only); $B = 1001$ is the 2's complement of $Y$, which the XORs do not produce by themselves; $0010$ is $7 - 5$.",
    source: "Style: Lecture 4-44 / 4-45",
  },
  {
    kind: "short",
    subtopic: "Add/subtract circuit",
    difficulty: "hard",
    prompt:
      "A 6-bit 2's complement add/subtract circuit (XOR on each $Y$ input, $C_0 = M$) computes $5 - 12$. Give the carry signals $C_6C_5C_4C_3C_2C_1$ as a 6-bit string, where $C_{i+1}$ is the carry out of full adder $i$.",
    accept: ["000111"],
    match: "text",
    placeholder: "C6 C5 C4 C3 C2 C1",
    solution:
      "$X = 000101$, $Y = 001100$, $M = 1$: the XORs give $B = Y' = 110011$ and $C_0 = 1$.\n- FA0: $1 + 1 + 1 = 11_2$ → $S_0 = 1$, $C_1 = 1$\n- FA1: $0 + 1 + 1$ → $S_1 = 0$, $C_2 = 1$\n- FA2: $1 + 0 + 1$ → $S_2 = 0$, $C_3 = 1$\n- FA3: $0 + 0 + 1$ → $S_3 = 1$, $C_4 = 0$\n- FA4: $0 + 1 + 0$ → $S_4 = 1$, $C_5 = 0$\n- FA5: $0 + 1 + 0$ → $S_5 = 1$, $C_6 = 0$\nCarries $C_6..C_1 = 000111$; result $111001 = -7$ ✓.",
    source: "Style: L1-L12 practice, L6 Q3",
  },
  {
    kind: "mcq",
    subtopic: "Parallel addition with registers",
    difficulty: "medium",
    prompt:
      "In the 4-bit parallel adder with registers, the FA outputs are $A + B$ and a TRANSFER pulse loads them into the accumulator A. By mistake the CLEAR pulse is omitted and A initially holds $0011$. The sequence LOAD $X = 0100$ into B, TRANSFER, LOAD $Y = 0010$ into B, TRANSFER is then applied. What does A hold at the end?",
    options: ["$1001$", "$0110$", "$0111$", "$0010$", "$1011$"],
    answer: 0,
    solution:
      "Each TRANSFER loads A + B back into A.\n- First TRANSFER: $A = 0011 + 0100 = 0111$.\n- Second TRANSFER: $A = 0111 + 0010 = 1001$.\nWithout the CLEAR the old contents (3) are included: $3 + 4 + 2 = 9 = 1001$. With a proper CLEAR the answer would have been $0110$.",
    source: "Style: Lecture 4-46 / 4-47",
  },
  // ------------------------------------------------------------------ multiplication
  {
    kind: "short",
    subtopic: "Multiplication",
    difficulty: "medium",
    prompt: "Perform the unsigned binary multiplication $101101_2 \\times 1011_2$. Give the 10-bit product.",
    accept: ["0111101111", "01 1110 1111"],
    match: "text",
    placeholder: "10 bits",
    solution:
      "Shift-and-add for each 1 in the multiplier $1011$ ($b_0, b_1, b_3$):\n- $b_0$: $00\\,0010\\,1101$ (45)\n- $b_1$: $00\\,0101\\,1010$ (90)\n- $b_3$: $01\\,0110\\,1000$ (360)\nSum: $45 + 90 + 360 = 495 = 01\\,1110\\,1111_2$.\nCheck: $45 \\times 11 = 495$ ✓. A 6-bit × 4-bit product needs 10 bits.",
    source: "Style: Tut 3 Q4",
  },
  {
    kind: "short",
    subtopic: "Multiplication",
    difficulty: "hard",
    prompt: "Perform the 4-bit signed 2's complement multiplication $1010 \\times 1101$. Give the 8-bit 2's complement product.",
    accept: ["00010010", "0001 0010"],
    match: "text",
    placeholder: "8 bits",
    solution:
      "Multiplicand $M = 1010 = -6$, sign-extended: $1111\\,1010$. Multiplier $1101 = -3$: $b_0 = 1$, $b_1 = 0$, $b_2 = 1$, $b_3 = 1$ (weight −8).\n- $b_0$: $+M = 1111\\,1010$ (−6)\n- $b_2$: $+M \\ll 2 = 1110\\,1000$ (−24); running sum $1110\\,0010$ (−30)\n- $b_3$ (negative weight): add the 2's complement of $M \\ll 3$: $-(-48) = +48 = 0011\\,0000$\n- $1110\\,0010 + 0011\\,0000 = 0001\\,0010$ (carry out ignored)\nProduct $0001\\,0010 = +18 = (-6)(-3)$ ✓.",
    source: "Style: PYP 2020-21 S2 Q1(d)",
  },
  {
    kind: "mcq",
    subtopic: "Multiplication",
    difficulty: "hard",
    prompt: "Perform the signed 2's complement multiplication $101011 \\times 0110$ (6-bit multiplicand, 4-bit multiplier). What is the 10-bit product?",
    options: ["$11\\,1000\\,0010$", "$01\\,0000\\,0010$", "$10\\,0111\\,1110$", "$11\\,1000\\,0001$", "$00\\,0111\\,1110$"],
    answer: 0,
    solution:
      "$101011 = -21$, $0110 = +6$. The multiplier is positive, so use shift-and-add with every partial product sign-extended to 10 bits. $M$ extended: $11\\,1110\\,1011$.\n- $b_1$: $M \\ll 1 = 11\\,1101\\,0110$ (−42)\n- $b_2$: $M \\ll 2 = 11\\,1010\\,1100$ (−84)\n- Sum: $11\\,1000\\,0010 = -126$ ✓ ($-21 \\times 6$).\nB is the unsigned product $43 \\times 6 = 258$ (no sign extension); C is −126 in sign-magnitude; D is the 1's complement of 126; E is $+126$.",
    source: "Style: Tut 3 Q5",
  },
  {
    kind: "open",
    subtopic: "Multiplication",
    difficulty: "hard",
    prompt:
      "Perform the 4-bit signed 2's complement multiplication $0111 \\times 1001$. Show the steps clearly and give the signed decimal value of the result obtained at each step. (6 marks)",
    solution:
      "$0111 = +7$, $1001 = -7$. The multiplier is negative: add $M$ for $b_0 = 1$ (bits $b_1 = b_2 = 0$ add nothing), then add the 2's complement of $M \\ll 3$ for the MSB (weight −8): $0000\\,0111 + 1100\\,1000 = 1100\\,1111 = -49$.",
    modelAnswer:
      "Multiplicand $M = 0111 = +7$, extended to 8 bits: $0000\\,0111$. Multiplier $1001 = -7 = -8 + 1$.\n- $b_0 = 1$: partial product $0000\\,0111$ (+7). Running sum +7.\n- $b_1 = 0$, $b_2 = 0$: add $0000\\,0000$. Running sum still $0000\\,0111$ (+7).\n- $b_3 = 1$ has weight $-8$: the partial product is $-(M \\ll 3) = -(0011\\,1000) = 1100\\,1000$ (−56).\n- Final: $0000\\,0111 + 1100\\,1000 = 1100\\,1111$ (−49).\nResult $1100\\,1111 = -49 = 7 \\times (-7)$ ✓.",
    rubric: [
      { point: "Multiplicand sign-extended / partial products aligned to 8 bits", marks: 2 },
      { point: "MSB of the negative multiplier handled by adding the 2's complement of the shifted multiplicand", marks: 2 },
      { point: "Correct result 1100 1111 with decimal values at each step (+7, +7, −56, −49)", marks: 2 },
    ],
    source: "Style: PYP 2020-21 S2 Q1(d)",
  },
  // ------------------------------------------------------------------ BCD
  {
    kind: "mcq",
    subtopic: "BCD addition",
    difficulty: "easy",
    prompt: "When adding two BCD digits with a 4-bit binary adder, when must $0110$ be added to the 4-bit sum?",
    options: [
      "When the digit sum is greater than 9 (including when the adder produces a carry out)",
      "Only when the adder produces a carry out",
      "Only when the 4-bit sum is between 1010 and 1111",
      "Whenever either input digit is greater than 4",
      "Always, to convert binary to BCD",
    ],
    answer: 0,
    solution:
      "The six codes 1010–1111 are not valid BCD, and sums 16–19 wrap around past them. In both cases the true digit sum exceeds 9, and adding 6 skips the six unused codes and generates the decimal carry.\nB misses sums 10–15 (e.g. $5 + 7 = 1100$); C misses sums 16–19 (e.g. $9 + 8 = 1\\,0001$, which looks like a valid 0001).",
    source: "Style: Lecture 4-56",
  },
  {
    kind: "short",
    subtopic: "BCD addition",
    difficulty: "medium",
    prompt: "Add the BCD numbers $0111\\,1000$ (78) and $0101\\,0110$ (56). Give the 3-digit BCD result as 12 bits.",
    accept: ["000100110100", "0001 0011 0100"],
    match: "text",
    placeholder: "12 bits",
    solution:
      "- Units: $1000 + 0110 = 1110$ (14 > 9) → add $0110$: $1110 + 0110 = 1\\,0100$: digit $0100$, carry 1.\n- Tens: $0111 + 0101 + 1 = 1101$ (13 > 9) → add $0110$: $1\\,0011$: digit $0011$, carry 1.\n- Hundreds: the carry, $0001$.\nResult $0001\\,0011\\,0100 = 134$ ✓ ($78 + 56$).",
    source: "Style: Lecture 4-57 / 4-58",
  },
  {
    kind: "mcq",
    subtopic: "BCD adder",
    difficulty: "hard",
    prompt:
      "A one-digit BCD adder is built from two 4-bit binary adders. The first adder produces the carry $C_4$ and sum $S_3S_2S_1S_0$ of $A + B + C_{in}$ (with $A, B \\le 9$). Which expression(s) for the correction signal $X$ (1 exactly when the true sum exceeds 9) are correct?",
    options: [
      "$X = C_4 + S_3S_2 + S_3S_1$",
      "$X = C_4 + S_3(S_2 + S_1)$",
      "$X = S_3S_2 + S_3S_1$",
      "$X = C_4 + S_3 + S_2S_1$",
      "There are multiple correct answers",
    ],
    answer: 4,
    solution:
      "The sum lies in 0–19. $X$ must be 1 for 10–15 (codes 1010–1111 with $C_4 = 0$) and for 16–19 ($C_4 = 1$).\n- With $C_4 = 0$, a K-map over $S_3..S_0$ with 1s at 10–15 gives $S_3S_2 + S_3S_1$.\n- Adding $C_4$ covers 16–19: $X = C_4 + S_3S_2 + S_3S_1$ (A).\n- B is the same expression factorised: $S_3(S_2 + S_1) = S_3S_2 + S_3S_1$.\nSo **both A and B** are correct. C misses 16–19 (e.g. $9 + 9 = 1\\,0010$ gives $S = 0010$). D wrongly flags 8 and 9 ($S_3 = 1$) and 6–7 ($S_2S_1 = 1$).",
    source: "Style: PYP 2018-19 S2 Q2(b)(i)",
  },
  {
    kind: "open",
    subtopic: "BCD adder",
    difficulty: "hard",
    prompt:
      "You are given 4-bit binary adders, each with inputs $a[3:0]$, $b[3:0]$, $C_{in}$ and outputs $sum[3:0]$, $C_{out}$. Design a circuit that adds two BCD digits $A$ and $B$ and a carry-in $C_{in}$ from a less significant digit, using two such adders, producing one BCD digit and a BCD carry out.\n(i) Obtain a Boolean expression for $X$, which is 1 only when the result exceeds 9. Show your steps. (4 marks)\n(ii) Sketch a clearly labelled diagram of the circuit, using $X$. (4 marks)",
    solution:
      "Adder 1 computes $A + B + C_{in}$ (0–19). $X = C_4 + S_3S_2 + S_3S_1$ from a K-map of the invalid codes 10–15 plus $C_4$ for 16–19. Adder 2 adds $0XX0$ to $S$; the BCD digit is its sum and the BCD carry out is $X$.",
    modelAnswer:
      "(i) Let adder 1 compute $A + B + C_{in}$ with outputs $C_4$ and $S_3S_2S_1S_0$. The result is 0–19.\n- Results 10–15: $C_4 = 0$ and $S = 1010$–$1111$. On a K-map over $S_3S_2S_1S_0$ these cells (10–15) group into $S_3S_2$ (12–15) and $S_3S_1$ (10, 11, 14, 15).\n- Results 16–19: $C_4 = 1$ (with $S = 0000$–$0011$).\n- So $X = C_4 + S_3S_2 + S_3S_1$.\n(ii) Adder 1: $a = A$, $b = B$, $C_{in} = C_{in}$, outputs $S[3:0]$ and $C_4$. A gate network (two 2-input ANDs and a 3-input OR) forms $X$ from $C_4$, $S_3$, $S_2$, $S_1$. Adder 2: $a = S[3:0]$, $b = 0\\,X\\,X\\,0$ (i.e. $b_3 = 0$, $b_2 = X$, $b_1 = X$, $b_0 = 0$), $C_{in} = 0$; its $sum[3:0]$ is the BCD result digit and its carry out is ignored. The BCD carry out is $X$.",
    modelFigures: [
      {
        kind: "kmap",
        vars: ["S3", "S2", "S1", "S0"],
        values: "0000000000111111",
        groups: ["S3S2", "S3S1"],
        showIndex: true,
        caption: "Cells 10–15 (with $C_4 = 0$): $S_3S_2 + S_3S_1$.",
      },
      {
        kind: "table",
        head: ["Adder", "a[3:0]", "b[3:0]", "Cin", "Outputs used"],
        rows: [
          ["1", "A", "B", "Cin", "S[3:0], C4"],
          ["2", "S[3:0]", "0 X X 0", "0", "BCD digit = sum[3:0]"],
          ["—", "", "", "", "BCD Cout = X = C4 + S3S2 + S3S1"],
        ],
      },
    ],
    rubric: [
      { point: "Identifies invalid range 10–19 and the role of C4", marks: 1 },
      { point: "K-map / algebra giving S3S2 + S3S1 for 10–15", marks: 2 },
      { point: "Final X = C4 + S3S2 + S3S1", marks: 1 },
      { point: "Adder 1 connections (A, B, Cin → S, C4)", marks: 1 },
      { point: "X logic drawn from C4, S3, S2, S1", marks: 1 },
      { point: "Adder 2 adds 0XX0 to S with Cin = 0; BCD digit and Cout = X labelled", marks: 2 },
    ],
    source: "PYP 2018-19 S2 Q2(b) (adapted)",
  },
  {
    kind: "mcq",
    subtopic: "BCD adder",
    difficulty: "medium",
    prompt: "A one-digit BCD adder (two 4-bit adders, $X = C_4 + S_3S_2 + S_3S_1$) adds $A = 1001$, $B = 1001$ with $C_{in} = 1$. Which line correctly traces the circuit?",
    options: [
      "Adder 1: $C_4 = 1$, $S = 0011$; $X = 1$; output digit $1001$, BCD carry 1",
      "Adder 1: $C_4 = 1$, $S = 0011$; $X = 0$ since $S \\le 9$; output digit $0011$, BCD carry 1",
      "Adder 1: $C_4 = 0$, $S = 1011$; $X = 1$; output digit $0001$, BCD carry 1",
      "Adder 1: $C_4 = 1$, $S = 0010$; $X = 1$; output digit $1000$, BCD carry 1",
      "Adder 1: $C_4 = 1$, $S = 0011$; $X = 1$; output digit $1001$, BCD carry 0",
    ],
    answer: 0,
    solution:
      "Adder 1: $9 + 9 + 1 = 19 = 1\\,0011_2$, so $C_4 = 1$ and $S = 0011$.\n$X = C_4 + \\ldots = 1$: correction needed even though $S$ looks like a valid digit.\nAdder 2: $0011 + 0110 = 1001$. Output digit 9 with BCD carry $X = 1$: $19$ ✓.\nD forgets the carry-in; B ignores $C_4$; E drops the BCD carry.",
    source: "Style: PYP 2018-19 S2 Q2(b); Lecture 4-57",
  },
  {
    kind: "open",
    subtopic: "Add/subtract circuit",
    difficulty: "medium",
    prompt:
      "Draw the diagram of a 6-bit wide 2's complement adder/subtractor using six full adders and any additional gates needed. It has inputs $X_5..X_0$, $Y_5..Y_0$ and a control $M$ ($M = 0$: $X + Y$, $M = 1$: $X - Y$), outputs $S_5..S_0$ and carry out $C_6$. Explain how $M$ makes the circuit subtract, and state how arithmetic overflow may be detected. (6 marks)",
    solution:
      "Six full adders in a ripple chain; each $Y_i$ passes through an XOR with $M$ before entering FA$_i$; $C_0 = M$. $M = 1$ inverts $Y$ and adds 1 through $C_0$, giving $X + Y' + 1 = X - Y$. Overflow: the two numbers actually added have the same sign but the sum has the opposite sign.",
    modelAnswer:
      "- Six full adders FA0 (LSB) … FA5 (MSB) connected as a parallel (ripple) adder: carry out of FA$_i$ → carry in of FA$_{i+1}$; the carry out of FA5 is $C_6$.\n- FA$_i$ inputs: $X_i$ and $Y_i \\oplus M$ (six XOR gates, one input of each tied to $M$). Sum outputs $S_i$.\n- The carry-in of FA0 is $C_0 = M$.\n- $M = 0$: XORs do not invert $Y$ and $C_0 = 0$, so $S = X + Y$.\n- $M = 1$: XORs invert every $Y_i$ to give $Y'$ and $C_0 = 1$ adds 1, so $S = X + Y' + 1 = X + (-Y) = X - Y$.\n- Overflow: the result cannot be represented in 6 bits. It is detected when the two numbers added have the same sign but the sum has the opposite sign ($C_6$ is ignored).",
    rubric: [
      { point: "Six full adders in a correctly connected ripple chain", marks: 2 },
      { point: "XOR on each Y input controlled by M, and C0 = M", marks: 2 },
      { point: "Explanation of add vs subtract (Y' + 1 = −Y)", marks: 1 },
      { point: "Overflow detected by the sign rule (same-sign operands, opposite-sign sum)", marks: 1 },
    ],
    source: "Style: L1-L12 practice, L6 Q4",
  },
  {
    kind: "mcq",
    subtopic: "Signed representations",
    difficulty: "medium",
    prompt: "What is the smallest number of bits $N$ such that every integer from $-129$ to $+100$ can be represented in $N$-bit 2's complement?",
    options: ["7", "8", "9", "10", "8 for 2's complement, but 9 for sign-magnitude"],
    answer: 2,
    solution:
      "$N$-bit 2's complement covers $-2^{N-1}$ to $2^{N-1} - 1$.\n- $N = 8$: −128 … 127. $+100$ fits but $-129$ does not.\n- $N = 9$: −256 … 255: everything fits.\nSo $N = 9$. (Sign-magnitude would also need 9 bits: $129 > 127$.)",
    source: "Style: Lecture 4-20",
  },
];
