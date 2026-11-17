import type { Lesson } from "@/lib/sc1005/types";

const RIPPLE_SVG = `<svg viewBox="0 0 540 170" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="none" stroke="currentColor">
${[3, 2, 1, 0]
  .map((i, k) => {
    const x = 40 + k * 120;
    return `<rect x="${x}" y="50" width="80" height="56" rx="6" stroke-width="1.6"/>
<text x="${x + 40}" y="83" text-anchor="middle" fill="currentColor" stroke="none" font-weight="700">FA${i}</text>
<line x1="${x + 22}" y1="20" x2="${x + 22}" y2="50" stroke-width="1.4"/><line x1="${x + 58}" y1="20" x2="${x + 58}" y2="50" stroke-width="1.4"/>
<text x="${x + 22}" y="15" text-anchor="middle" fill="currentColor" stroke="none">A${i}</text><text x="${x + 58}" y="15" text-anchor="middle" fill="currentColor" stroke="none">B${i}</text>
<line x1="${x + 40}" y1="106" x2="${x + 40}" y2="136" stroke-width="1.4"/><text x="${x + 40}" y="152" text-anchor="middle" fill="currentColor" stroke="none">S${i}</text>`;
  })
  .join("\n")}
${[0, 1, 2]
  .map((k) => {
    const x = 120 + k * 120;
    return `<line x1="${x + 40}" y1="78" x2="${x}" y2="78" stroke-width="1.4"/><path d="M${x + 6},74 L${x},78 L${x + 6},82" stroke-width="1.4"/><text x="${x + 20}" y="72" text-anchor="middle" fill="currentColor" stroke="none">C${3 - k}</text>`;
  })
  .join("\n")}
<line x1="525" y1="78" x2="480" y2="78" stroke-width="1.4"/><path d="M486,74 L480,78 L486,82" stroke-width="1.4"/><text x="505" y="72" text-anchor="middle" fill="currentColor" stroke="none">C0</text>
<line x1="40" y1="78" x2="8" y2="78" stroke-width="1.4"/><path d="M14,74 L8,78 L14,82" stroke-width="1.4"/><text x="20" y="72" text-anchor="middle" fill="currentColor" stroke="none">C4</text>
</svg>`;

const BCD_SVG = `<svg viewBox="0 -8 520 310" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="none" stroke="currentColor">
<rect x="150" y="40" width="200" height="56" rx="6" stroke-width="1.6"/>
<text x="250" y="66" text-anchor="middle" fill="currentColor" stroke="none" font-weight="700">4-bit adder 1</text>
<text x="250" y="84" text-anchor="middle" fill="currentColor" stroke="none">A + B + Cin</text>
<line x1="200" y1="10" x2="200" y2="40" stroke-width="1.4"/><text x="200" y="8" text-anchor="middle" fill="currentColor" stroke="none">A[3:0]</text>
<line x1="300" y1="10" x2="300" y2="40" stroke-width="1.4"/><text x="300" y="8" text-anchor="middle" fill="currentColor" stroke="none">B[3:0]</text>
<line x1="390" y1="68" x2="350" y2="68" stroke-width="1.4"/><text x="410" y="72" text-anchor="middle" fill="currentColor" stroke="none">Cin</text>
<line x1="150" y1="68" x2="80" y2="68" stroke-width="1.4"/><text x="110" y="62" text-anchor="middle" fill="currentColor" stroke="none">C4</text>
<line x1="250" y1="96" x2="250" y2="190" stroke-width="1.4"/><text x="262" y="118" fill="currentColor" stroke="none">S[3:0]</text>
<line x1="250" y1="140" x2="120" y2="140" stroke-width="1.4"/><text x="186" y="134" text-anchor="middle" fill="currentColor" stroke="none">S3 S2 S1</text>
<rect x="20" y="110" width="100" height="56" rx="6" stroke-width="1.6"/>
<text x="70" y="134" text-anchor="middle" fill="currentColor" stroke="none" font-weight="700">X logic</text>
<text x="70" y="152" text-anchor="middle" fill="currentColor" stroke="none" font-size="10">C4+S3S2+S3S1</text>
<line x1="80" y1="68" x2="80" y2="110" stroke-width="1.4"/>
<line x1="70" y1="166" x2="70" y2="290" stroke-width="1.4"/><text x="82" y="286" fill="currentColor" stroke="none">Cout = X</text>
<line x1="70" y1="210" x2="150" y2="210" stroke-width="1.4"/><text x="110" y="204" text-anchor="middle" fill="currentColor" stroke="none">0 X X 0</text>
<rect x="150" y="190" width="200" height="56" rx="6" stroke-width="1.6"/>
<text x="250" y="216" text-anchor="middle" fill="currentColor" stroke="none" font-weight="700">4-bit adder 2</text>
<text x="250" y="234" text-anchor="middle" fill="currentColor" stroke="none">S + 0XX0, Cin = 0</text>
<line x1="250" y1="246" x2="250" y2="280" stroke-width="1.4"/><text x="250" y="296" text-anchor="middle" fill="currentColor" stroke="none">BCD sum digit</text>
</svg>`;

export const arithmeticLesson: Lesson = {
  topic: "arithmetic",
  bigPicture:
    "In digital circuits such as computers and calculators, arithmetic is carried out on binary numbers, and this chapter builds that hardware from the gates of Ch 3. A **half adder** adds two bits and a **full adder** adds three; cascading $N$ full adders gives an $N$-bit **parallel (ripple) adder**, whose speed is limited by **carry propagation** from stage to stage. To handle negative numbers we use **2's complement**: it makes subtraction just addition of the negated operand, so one adder plus a row of XOR gates (the **add/subtract circuit**) does both. The price is a fixed range, so you must recognise **overflow** (same-sign operands, opposite-sign result) and use **sign extension** when widening a number. Multiplication is repeated **shift-and-add**, with care for the negative weight of the sign bit in signed multiplication, and **BCD addition** reuses binary adders with a **+6 correction** whenever a digit sum exceeds 9. Typical exam tasks: 8-bit hex 2's complement arithmetic with an overflow verdict, explaining carry propagation and carry look-ahead, signed 4-bit multiplication step by step, and the BCD adder built from two 4-bit adders.",
  sections: [
    {
      title: "Unsigned binary addition and subtraction",
      intuition:
        "Binary arithmetic is column arithmetic exactly like decimal, starting from the least significant bit, except that a column overflows at 2 instead of 10. So $1 + 1 = 10_2$: write 0, carry 1.",
      keyIdeas: [
        "Addition rules: $0 + 0 = 0$, $0 + 1 = 1$, $1 + 1 = 0$ carry 1, $1 + 1 + 1 = 1$ carry 1.",
        "Subtraction rules: $1 - 0 = 1$, $1 - 1 = 0$, $0 - 0 = 0$, $0 - 1 = 1$ borrow 1 from the next column (the borrowed 1 is worth $10_2 = 2$ in this column).",
        "Adding two $N$-bit unsigned numbers can give an $(N+1)$-bit result; the extra bit is the final carry out.",
        "Hex arithmetic works the same way digit by digit with base 16: e.g. $9F + 4E$: $F + E = 29 = 16 + 13$, write D carry 1; $9 + 4 + 1 = 14 = E$, so $9F + 4E = ED_{16}$ ($159 + 78 = 237$).",
      ],
      figures: [
        {
          kind: "table",
          head: ["", "b5", "b4", "b3", "b2", "b1", "b0"],
          rows: [
            ["carry", 1, 1, 1, 1, 0, ""],
            ["A = 23", "", 1, 0, 1, 1, 1],
            ["B = 10", "", 0, 1, 0, 1, 0],
            ["sum = 33", 1, 0, 0, 0, 0, 1],
          ],
          caption: "$10111_2 + 01010_2 = 100001_2$ ($23 + 10 = 33$): carries ripple from bit 1 to bit 5.",
        },
      ],
      example: {
        problem: "Compute the unsigned subtraction $11100011_2 - 1011101_2$.",
        steps: [
          "Align: $1110\\,0011 - 0101\\,1101$ ($227 - 93$).",
          "Bit 0: $1 - 1 = 0$. Bit 1: $1 - 0 = 1$. Bit 2: $0 - 1$, borrow: $2 - 1 = 1$. Bit 3: $0 - 1 - 1$ (borrow), borrow again: $2 - 2 = 0$.",
          "Bit 4: $0 - 1 - 1$, borrow: $2 - 2 = 0$. Bit 5: $1 - 0 - 1 = 0$. Bit 6: $1 - 1 = 0$. Bit 7: $1 - 0 = 1$.",
          "Result $1000\\,0110_2 = 134 = 227 - 93$ ✓.",
        ],
        answer: "$1000\\,0110_2$.",
      },
      pitfalls: [
        "Always start at the LSB and carry/borrow to the left; do not add columns independently.",
        "In hex, a digit sum of 16 or more produces a carry of 1 and leaves (sum − 16).",
        "Check by converting to decimal: it catches most carry slips.",
      ],
      recall: [
        { q: "$1 + 1 + 1$ in binary?", a: "$11_2$: sum bit 1, carry 1." },
        { q: "$7_{16} + 9_{16}$?", a: "$10_{16}$ (16 decimal)." },
        { q: "How many bits can the sum of two 8-bit unsigned numbers need?", a: "9." },
      ],
    },
    {
      title: "Half adders and full adders",
      intuition:
        "Adding one column needs the two operand bits plus the carry coming in, and produces a sum bit and a carry out. A half adder handles two bits; a full adder handles all three and is the building block of every adder.",
      visuals: ["full-adder"],
      keyIdeas: [
        "**Half adder** (2 inputs): $\\text{Sum} = A \\oplus B$, $\\text{Carry} = AB$.",
        "**Full adder** (3 inputs $A, B, C_{in}$): $S = A \\oplus B \\oplus C_{in}$ (1 when an odd number of inputs are 1).",
        "$C_{out} = AB + BC_{in} + AC_{in}$ (1 when at least two inputs are 1) $= AB + C_{in}(A + B) = AB + C_{in}(A \\oplus B)$.",
        "The last form gives a full adder from **two half adders and an OR gate**: HA1 adds $A, B$ ($S_1 = A \\oplus B$, $C_1 = AB$); HA2 adds $S_1, C_{in}$ ($S = S_1 \\oplus C_{in}$, $C_2 = C_{in}S_1$); $C_{out} = C_1 + C_2$.",
        "Read the outputs as a 2-bit number: $A + B + C_{in} = (C_{out}S)_2$.",
      ],
      formulas: ["S = A \\oplus B \\oplus C_{in}", "C_{out} = AB + BC_{in} + AC_{in} = AB + C_{in}(A \\oplus B)"],
      figures: [
        {
          kind: "table",
          head: ["A", "B", "Cin", "Cout", "S"],
          rows: [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 1, 0],
            [1, 1, 0, 1, 0],
            [1, 1, 1, 1, 1],
          ],
          caption: "Full-adder truth table: $(C_{out}S)_2$ counts the 1s among $A, B, C_{in}$.",
        },
        {
          kind: "circuit",
          circuit: {
            inputs: ["A", "B", "Cin"],
            gates: [
              { id: "S1", type: "XOR", in: ["A", "B"], label: "HA1" },
              { id: "C1", type: "AND", in: ["A", "B"], label: "HA1" },
              { id: "S", type: "XOR", in: ["S1", "Cin"], label: "HA2" },
              { id: "C2", type: "AND", in: ["S1", "Cin"], label: "HA2" },
              { id: "Cout", type: "OR", in: ["C1", "C2"] },
            ],
            outputs: ["S", "Cout"],
            showNets: true,
          },
          caption: "Full adder from two half adders and an OR gate.",
        },
      ],
      example: {
        problem: "Show that $C_{out} = AB + BC_{in} + AC_{in}$ equals $AB + C_{in}(A \\oplus B)$.",
        steps: [
          "Expand the cross terms: $BC_{in} = C_{in}(AB + A'B)$ and $AC_{in} = C_{in}(AB + AB')$.",
          "So $C_{out} = AB + C_{in}AB + C_{in}(A'B + AB')$.",
          "$AB + C_{in}AB = AB$ (absorption), and $A'B + AB' = A \\oplus B$.",
          "Therefore $C_{out} = AB + C_{in}(A \\oplus B)$.",
        ],
        answer: "$C_{out} = AB + C_{in}(A \\oplus B)$, the half-adder form.",
      },
      pitfalls: [
        "A half adder has no carry input: it cannot be used for any column except the LSB of an addition with no carry-in.",
        "$C_{in}(A + B)$ and $C_{in}(A \\oplus B)$ both work in $C_{out}$ (they differ only when $A = B = 1$, where $AB$ already gives 1), but the sum needs XOR, not OR.",
      ],
      recall: [
        { q: "Full adder outputs for $A = 1, B = 1, C_{in} = 1$?", a: "$C_{out} = 1$, $S = 1$ ($1 + 1 + 1 = 11_2$)." },
        { q: "What does $C_2$ (the second half adder's carry) equal?", a: "$C_{in}(A \\oplus B)$." },
        { q: "Half adder equations?", a: "$S = A \\oplus B$, $C = AB$." },
      ],
    },
    {
      title: "Parallel (ripple) adders and carry propagation",
      intuition:
        "Cascade $N$ full adders, connecting each carry out to the next carry in. All operand bits are fed in at once, but a stage's sum is not final until the carry from the stage below has arrived, so the addition speed is limited by the carry propagating through the full adders.",
      visuals: ["ripple-adder"],
      keyIdeas: [
        "$N$ full adders can be cascaded to form an $N$-bit **parallel adder**, also known as a **ripple adder**: the carry out of stage $i$ feeds the carry in of stage $i+1$; $C_0$ is the carry in and $C_N$ the carry out. A 4-bit addition needs 4 FAs.",
        "All the bits of the augend and addend are fed into the adder circuits **simultaneously**, so addition is very fast.",
        "**Carry propagation**: the addition speed is limited by the propagation delays of the FAs, because a carry may have to pass through every stage (e.g. $0111 + 0001$).",
        "Sufficient time must be given to the FAs to complete the addition before the result is used (e.g. before it is transferred into a register).",
        "**Carry look-ahead**: carry propagation can be reduced (hence increasing the speed of addition) by a special-purpose logic circuit, the carry-look-ahead circuit. Many IC parallel adders have a built-in carry look-ahead circuit.",
      ],
      figures: [{ kind: "svg", svg: RIPPLE_SVG, caption: "4-bit ripple adder: the carry passes from FA0 to FA3 one stage at a time." }],
      example: {
        problem:
          "A 4-bit parallel adder with $C_0 = 0$ adds $0111 + 0001$. Give every carry and sum bit, and explain why this addition shows carry propagation.",
        steps: [
          "FA0: $1 + 1 + 0 = 10_2$ → $S_0 = 0$, $C_1 = 1$.",
          "FA1: $1 + 0 + 1 = 10_2$ → $S_1 = 0$, $C_2 = 1$. FA2: $1 + 0 + 1$ → $S_2 = 0$, $C_3 = 1$.",
          "FA3: $0 + 0 + 1$ → $S_3 = 1$, $C_4 = 0$.",
          "The carry produced by FA0 has to pass through FA1, FA2 and FA3 before $S_3$ is correct, so the result is only final after the carry has propagated through every stage.",
        ],
        answer: "$C_4C_3C_2C_1 = 0111$, $S = 1000$ ($7 + 1 = 8$); the carry propagates through all four FAs.",
      },
      pitfalls: [
        "All operand bits are applied at the same time, but the sum is not final until the carries have propagated: allow enough time before using the result.",
      ],
      recall: [
        { q: "How many full adders in a 16-bit parallel adder?", a: "16: $N$ full adders are cascaded for $N$ bits." },
        { q: "What limits the speed of a parallel adder?", a: "The propagation delays of the FAs: carry propagation from stage to stage." },
        { q: "What is the purpose of a carry look-ahead circuit?", a: "To reduce carry propagation and hence increase the speed of addition." },
      ],
    },
    {
      title: "Signed numbers: sign-magnitude and 2's complement",
      intuition:
        "Sign-magnitude simply adds a sign bit in front of the magnitude, which is easy to read but awkward to add. 2's complement gives the MSB a negative weight ($-2^{N-1}$) instead, which makes ordinary binary addition work for negative numbers too.",
      visuals: ["twos-converter"],
      keyIdeas: [
        "**Sign-magnitude**: MSB = sign (0 = +, 1 = −), remaining bits = magnitude. Range of $N$ bits: $-(2^{N-1} - 1)$ to $+(2^{N-1} - 1)$, with two zeros ($+0 = 0000\\,0000$, $-0 = 1000\\,0000$).",
        "**2's complement of a number** (negation): invert every bit (1's complement), then add 1. Shortcut: from the LSB, copy bits up to and including the first 1, then invert all remaining bits.",
        "**2's complement representation**: positive numbers are plain binary with sign bit 0; a negative number is the 2's complement of its magnitude, so its sign bit is 1.",
        "Range of $N$ bits: $-2^{N-1}$ to $+(2^{N-1} - 1)$: 4 bits −8…7, 8 bits −128…127. One more negative value than positive, and only one zero.",
        "Special patterns: $100\\cdots0 = -2^{N-1}$ (most negative), $111\\cdots1 = -1$, $000\\cdots0 = 0$, $011\\cdots1 = 2^{N-1} - 1$ (most positive).",
        "Decimal value of a 2's complement number: if the MSB is 1, negate it to find the magnitude; or use the weights directly: $b_{N-1}\\cdot(-2^{N-1}) + \\sum b_i 2^i$.",
        "Exception: the most negative number has no positive counterpart; negating $1000_2$ (−8) gives $1000_2$ again.",
      ],
      formulas: ["\\text{value} = -b_{N-1}2^{N-1} + \\sum_{i=0}^{N-2} b_i 2^i", "-X = \\overline{X} + 1"],
      figures: [
        {
          kind: "table",
          head: ["Decimal", "Sign-magnitude", "2's complement"],
          rows: [
            ["+7", "0111", "0111"],
            ["+3", "0011", "0011"],
            ["+1", "0001", "0001"],
            ["0", "0000 / 1000", "0000"],
            ["−1", "1001", "1111"],
            ["−3", "1011", "1101"],
            ["−7", "1111", "1001"],
            ["−8", "—", "1000"],
          ],
          caption: "4-bit signed representations.",
        },
      ],
      example: {
        problem: "Find the decimal value of the 8-bit 2's complement number $1001\\,0111$, and write −60 in 8-bit 2's complement.",
        steps: [
          "$1001\\,0111$ has MSB 1, so it is negative. Negate: copy up to the first 1 (the LSB 1), invert the rest: $0110\\,1001 = 105$. So the value is $-105$.",
          "Check with weights: $-128 + 16 + 4 + 2 + 1 = -105$ ✓.",
          "$60 = 0011\\,1100$. Negate with the shortcut: copy $\\ldots100$, invert the rest: $1100\\,0100$.",
          "Check: $-128 + 64 + 4 = -60$ ✓. In hex: $C4$.",
        ],
        answer: "$1001\\,0111 = -105$; $-60 = 1100\\,0100$ ($C4_{16}$).",
      },
      pitfalls: [
        "1's complement (invert only) is **not** the same as 2's complement: you must add 1.",
        "A number needs one bit more than its magnitude: +9 needs 5 bits ($01001$), −8 needs only 4 ($1000$).",
        "Sign-magnitude and 2's complement agree only for non-negative numbers.",
      ],
      recall: [
        { q: "8-bit 2's complement range?", a: "−128 to +127." },
        { q: "What is $1111\\,1111$ in 8-bit 2's complement?", a: "−1." },
        { q: "2's complement of $0101\\,1000$?", a: "$1010\\,1000$ (copy up to the first 1, invert the rest)." },
      ],
    },
    {
      title: "Sign extension, 2's complement addition/subtraction and overflow",
      intuition:
        "On a 2's complement number circle, adding moves you around the wheel. Going past the boundary between the most positive and the most negative value wraps the answer to the wrong sign: that is overflow. Subtraction is just adding the negation.",
      visuals: ["twos-wheel"],
      keyIdeas: [
        "**Sign extension**: to widen a 2's complement number, copy the sign bit into the new upper bits: $101 = 1101 = 11101$ (−3); $011 = 0011 = 00011$ (+3). Padding a negative number with 0s changes its value.",
        "**Addition**: add all bits including the sign bits as unsigned binary and **ignore** any carry out of the MSB. Both operands (and the result) must have the same number of bits.",
        "**Subtraction**: $A - B = A + (-B)$, where $-B$ is the 2's complement of $B$ (whether $B$ is positive or negative).",
        "**Overflow**: an operation on two $N$-bit operands produces a result that cannot be represented in $N$ bits. In addition, no overflow occurs if the operands have **opposite** signs; overflow is detected when the operands have the **same** sign but the sum has the opposite sign (e.g. $01010 + 01000 = 10010$: $10 + 8$ reads as $-14$).",
        "For subtraction, no overflow occurs if the operands have the **same** sign. Otherwise rewrite $A - B$ as $A + (-B)$ and apply the addition rule.",
        "The carry out of the MSB is **ignored**; by itself it does not indicate overflow ($+10 + (-3)$ produces a carry out, but the result $+7$ is correct).",
      ],
      example: {
        problem: "Perform the 8-bit 2's complement operations $8C + 9A$ and $3F - B6$ (hex) and state whether overflow occurs.",
        steps: [
          "$8C = 1000\\,1100 = -116$, $9A = 1001\\,1010 = -102$. Sum: $1000\\,1100 + 1001\\,1010 = 1\\,0010\\,0110$; drop the carry: $0010\\,0110 = 26_{16}$.",
          "Two negatives gave a positive result ($+38$), so **overflow**: the true answer $-218$ is below $-128$.",
          "$3F - B6 = 3F + (-B6)$. $B6 = 1011\\,0110$; its 2's complement is $0100\\,1010 = 4A$. $3F + 4A = 0011\\,1111 + 0100\\,1010 = 1000\\,1001 = 89_{16}$.",
          "$3F = +63$, $B6 = -74$: $63 - (-74) = 137 > 127$. Two positives ($3F$ and $4A$) gave a negative: **overflow**.",
        ],
        answer: "$8C + 9A = 26$ (overflow); $3F - B6 = 89$ (overflow).",
      },
      pitfalls: [
        "A carry out of the MSB does not by itself mean overflow: $-3 + 5$ produces a carry out but the result $+2$ is correct.",
        "Do not convert hex operands to decimal and back without checking the range; the exam wants the 8-bit result **and** the overflow verdict.",
        "To subtract, negate the subtrahend (2's complement), not the minuend.",
      ],
      recall: [
        { q: "Sign-extend $1010$ to 8 bits.", a: "$1111\\,1010$ (−6)." },
        { q: "Can $+100 + (-100)$ overflow in 8 bits?", a: "No: operands of opposite sign never overflow." },
        { q: "An 8-bit 2's complement addition produces a carry out of the MSB. Does that mean overflow?", a: "No: the carry out is ignored. Check the signs: overflow only if the operands have the same sign and the sum's sign differs." },
      ],
    },
    {
      title: "The add/subtract circuit and parallel addition with registers",
      intuition:
        "An XOR gate with one input tied to a control line $M$ passes its other input when $M = 0$ and inverts it when $M = 1$. Put one XOR on each $Y$ bit and feed $M$ into the carry-in as well, and the same adder computes $X + Y$ or $X + Y' + 1 = X - Y$.",
      visuals: ["addsub-circuit"],
      keyIdeas: [
        "Each adder input $B_i = Y_i \\oplus M$, and $C_0 = M$.",
        "**Add** ($M = 0$): $B = Y$, $C_0 = 0$, result $X + Y$.",
        "**Subtract** ($M = 1$): $B = Y'$ (1's complement), $C_0 = 1$ adds the 1 to complete the 2's complement, result $X + Y' + 1 = X - Y$.",
        "**Parallel addition with registers**: operands are loaded from memory into register B; the full adders add A and B; a TRANSFER pulse clocks the adder output back into the accumulator register A. Sequence: CLEAR A, LOAD X into B, TRANSFER (A = 0 + X), LOAD Y into B, TRANSFER (A = X + Y).",
        "Enough time must be left between LOAD and TRANSFER for the carries to ripple through the adder.",
      ],
      figures: [
        {
          kind: "wave",
          signals: [
            { name: "CLEAR*", wave: "101111111111" },
            { name: "LOAD", wave: "000100010000" },
            { name: "TRANSFER", wave: "000001000100" },
            { name: "B reg", wave: "x..=...=....", data: ["X = 0001", "Y = 0010"] },
            { name: "A reg", wave: "x=...=...=..", data: ["0000", "0001 (X)", "0011 (X + Y)"] },
          ],
          caption: "Register transfer sequence for $X + Y$ (registers change on the positive-going edge of LOAD/TRANSFER; CLEAR* is active low).",
        },
      ],
      example: {
        problem: "Show the logic levels in a 4-bit add/subtract circuit computing $3 - 7$.",
        steps: [
          "$X = 0011$, $Y = 0111$, subtract so $M = 1$ and $C_0 = 1$.",
          "XOR outputs $B = Y \\oplus 1111 = 1000$.",
          "Add: $0011 + 1000 + 1$. Bit 0: $1 + 0 + 1 = 10_2$ → $S_0 = 0$, $C_1 = 1$. Bit 1: $1 + 0 + 1$ → $S_1 = 0$, $C_2 = 1$. Bit 2: $0 + 0 + 1$ → $S_2 = 1$, $C_3 = 0$. Bit 3: $0 + 1 + 0$ → $S_3 = 1$, $C_4 = 0$.",
          "Result $1100 = -4$ ✓. The numbers actually added, $+3$ and $-7$, have opposite signs, so no overflow.",
        ],
        answer: "$B = 1000$, carries $C_4C_3C_2C_1 = 0011$, result $1100 = -4$.",
      },
      pitfalls: [
        "Inverting $Y$ alone gives the 1's complement; forgetting $C_0 = 1$ makes every difference 1 too small.",
        "The control $M$ goes to every XOR **and** to the carry-in of the LSB adder.",
      ],
      recall: [
        { q: "In the add/sub circuit, what does an XOR gate do when $M = 1$?", a: "It inverts its $Y$ bit." },
        { q: "Why is $C_0 = M$?", a: "In subtraction it adds the +1 that turns $Y'$ into the 2's complement $-Y$." },
        { q: "What clocks the sum into the accumulator register?", a: "The TRANSFER pulse (its positive-going edge)." },
      ],
    },
    {
      title: "Binary multiplication: unsigned and 2's complement",
      intuition:
        "Binary long multiplication is easy because each multiplier bit is 0 or 1: the partial product is either 0 or the multiplicand shifted left. In 2's complement the multiplier's MSB has weight $-2^{N-1}$, so its partial product must be subtracted instead of added.",
      visuals: ["mult-stepper"],
      keyIdeas: [
        "**Unsigned**: for each multiplier bit $b_i = 1$, add the multiplicand shifted left by $i$ places (shift-and-add). An $m$-bit × $n$-bit product needs $m + n$ bits.",
        "**Signed, multiplier positive**: as unsigned, but every partial product (a shifted negative multiplicand) is **sign-extended** to the full product width.",
        "**Signed, multiplier negative**: split the multiplier into its MSB (weight $-2^{n-1}$) and the remaining positive bits. Multiply by the positive part with shift-and-add (sign-extended), then **add the 2's complement** of the multiplicand shifted by $n-1$ places.",
        "E.g. $1011 \\times 1101 = 1011 \\times (1000 + 0101)$ where the $1000$ part has weight $-8$.",
        "Result width for $m$-bit × $n$-bit signed numbers: $m + n$ bits. Ignore any carry out of the top bit.",
        "Division: unsigned uses long division; signed division converts to unsigned, divides, then fixes the sign.",
      ],
      example: {
        problem: "Perform the 4-bit signed 2's complement multiplication $1011 \\times 1101$ and give the decimal value.",
        steps: [
          "Multiplicand $M = 1011 = -5$, sign-extended to 8 bits: $1111\\,1011$. Multiplier $1101 = -3$: bits $b_0 = 1$, $b_1 = 0$, $b_2 = 1$, $b_3 = 1$ (weight $-8$).",
          "$b_0 = 1$: add $M$: $1111\\,1011$ (−5).",
          "$b_1 = 0$: add 0. $b_2 = 1$: add $M$ shifted 2: $1110\\,1100$ (−20). Running sum: $1111\\,1011 + 1110\\,1100 = 1110\\,0111$ (−25).",
          "$b_3 = 1$ has negative weight: add the 2's complement of $M$ shifted 3, i.e. $-(-40) = +40 = 0010\\,1000$.",
          "$1110\\,0111 + 0010\\,1000 = 0000\\,1111$ (ignore the carry out) $= +15$ ✓ ($-5 \\times -3$).",
        ],
        answer: "$0000\\,1111 = +15$.",
      },
      pitfalls: [
        "Forgetting sign extension of a negative partial product gives a large positive number.",
        "The MSB of a negative multiplier must be **subtracted** (add the 2's complement), not added.",
        "Unsigned and signed multiplication of the same bit patterns give different results: $1011 \\times 1101$ is $11 \\times 13 = 143$ unsigned but $+15$ signed.",
      ],
      recall: [
        { q: "How many bits does a 6-bit × 4-bit product need?", a: "10." },
        { q: "Weight of the MSB of a 4-bit 2's complement multiplier?", a: "$-8$." },
        { q: "$0110 \\times 0011$ (unsigned)?", a: "$0001\\,0010 = 18$." },
      ],
    },
    {
      title: "BCD addition and the BCD adder",
      intuition:
        "A BCD digit uses 4 bits but only the codes 0–9. A binary adder treats a digit as 0–15, so when the digit sum goes past 9 the answer lands in the six unused codes (or carries out). Adding 6 skips those six codes and produces the correct digit plus a decimal carry.",
      visuals: ["bcd-adder"],
      keyIdeas: [
        "Add BCD digits as 4-bit binary numbers. If the sum is $\\le 9$, it is already a valid BCD digit.",
        "If the digit sum is $> 9$ (an invalid code 1010–1111, or a carry out $C_4 = 1$), **add 6** ($0110$) to it: this produces the correct digit and a carry of 1 into the next BCD digit.",
        "Correction signal from the first adder's outputs: $X = C_4 + S_3S_2 + S_3S_1$ ($S_3S_2$ catches 12–15, $S_3S_1$ catches 10, 11, 14, 15, $C_4$ catches 16–19).",
        "**BCD adder from two 4-bit adders**: adder 1 computes $A + B + C_{in}$; the X logic decides; adder 2 adds $0XX0$ (i.e. 6 when $X = 1$, else 0) to $S$; the BCD carry out is $X$.",
        "Multi-digit BCD numbers are added digit by digit from the least significant digit, passing $X$ as the carry into the next digit.",
      ],
      formulas: ["X = C_4 + S_3S_2 + S_3S_1"],
      figures: [
        { kind: "svg", svg: BCD_SVG, caption: "One-digit BCD adder built from two 4-bit binary adders." },
        {
          kind: "kmap",
          vars: ["S3", "S2", "S1", "S0"],
          values: "0000000000111111",
          groups: ["S3S2", "S3S1"],
          showIndex: true,
          caption: "Invalid sums 10–15 (with $C_4 = 0$): $S_3S_2 + S_3S_1$. Sums 16–19 have $C_4 = 1$.",
        },
      ],
      example: {
        problem: "Add the BCD numbers $0100\\,0111$ (47) and $0011\\,1000$ (38).",
        steps: [
          "Low digit: $0111 + 1000 = 1111$ (15). $S_3S_2 = 1$, so $X = 1$: invalid.",
          "Correct: $1111 + 0110 = 1\\,0101$: digit $0101$ (5), carry 1 to the next digit.",
          "High digit: $0100 + 0011 + 1 = 1000$ (8). $X = 0$: valid, no correction.",
          "Result: $1000\\,0101$ = 85 ✓.",
        ],
        answer: "$1000\\,0101_{BCD} = 85$.",
      },
      pitfalls: [
        "Correct when the sum exceeds 9, not when it exceeds 15: $5 + 7 = 1100$ has no binary carry but still needs $+6$.",
        "When the first sum already carries out ($C_4 = 1$, e.g. $9 + 8 = 1\\,0001$), the 4-bit result looks valid (0001) but still needs $+6$: that is why $C_4$ is in $X$.",
        "The carry produced by the correction adder is ignored; the decimal carry out is $X$.",
      ],
      recall: [
        { q: "BCD sum of $8 + 5$?", a: "$1101 + 0110 = 1\\,0011$: digit 3, carry 1 (13)." },
        { q: "Correction signal for a BCD adder?", a: "$X = C_4 + S_3S_2 + S_3S_1$." },
        { q: "Why add 6?", a: "To skip the six unused 4-bit codes 1010–1111." },
      ],
    },
  ],
  playbook: [
    "**8-bit hex 2's complement + / −** → convert each hex digit to 4 bits; for subtraction take the 2's complement of the subtrahend and add; drop the carry out; overflow iff the two operands **added** have the same sign and the result's sign differs. Give the answer in hex too.",
    "**\"Decimal value of a 2's complement number\"** → MSB 0: plain binary. MSB 1: negate (copy to the first 1, invert the rest) and put a minus sign; or sum the weights with $-2^{N-1}$ for the MSB.",
    "**Widening a signed number** → sign-extend (copy the MSB), never pad with 0s.",
    "**\"Explain carry propagation / carry look-ahead\"** → the FAs' propagation delays limit the speed because a carry may pass through every stage; a carry look-ahead circuit reduces carry propagation and so increases the speed of addition.",
    "**Full adder from half adders** → $S = (A \\oplus B) \\oplus C_{in}$, $C_{out} = AB + C_{in}(A \\oplus B)$: two HAs and an OR.",
    "**Add/subtract circuit with levels** → $M = 1$ for subtract: XOR outputs are $Y'$, $C_0 = 1$; then run the carries from the LSB, and judge overflow from the signs.",
    "**Signed multiplication** → sign-extend the multiplicand to the product width; shift-and-add for multiplier bits $0 \\ldots n-2$; if the multiplier MSB is 1, add the 2's complement of the multiplicand shifted $n-1$. Check in decimal.",
    "**BCD addition** → add digits in binary from the right; if a digit sum $> 9$ (or it carried out), add $0110$ and carry 1.",
    "**Design a BCD adder from two 4-bit adders** → $X = C_4 + S_3S_2 + S_3S_1$ (derive with a K-map over $S_3..S_0$ plus $C_4$); second adder adds $0XX0$; Cout $= X$.",
  ],
};
