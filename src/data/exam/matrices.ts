import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (five-option MCQs and T/F/cannot-be-determined parts). */
export const matricesExam: ConceptQuestion[] = [
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt:
      "A square matrix $M$, not a scalar multiple of $I$, satisfies $M^2 = 2I - M$. If $M^n = 22I - 21M$, then $n =$",
    options: ["$5$", "$7$", "$6$", "$8$", NOTA],
    answer: 2,
    solution:
      "Write $M^n = a_nM + b_nI$ and use $M^{n+1} = a_nM^2 + b_nM = a_n(2I - M) + b_nM = (b_n - a_n)M + 2a_nI$.\n$M^1 = M$; $M^2 = -M + 2I$; $M^3 = 3M - 2I$; $M^4 = -5M + 6I$; $M^5 = 11M - 10I$; $M^6 = -21M + 22I$.\nSo $n = 6$. (Check: $M^2 + M - 2I = 0$ factors as $(M - I)(M + 2I)$, so the coefficients satisfy $a + b = 1$ and $b - 2a = (-2)^n$; $n = 6$ gives $b - 2a = 64$, $a + b = 1$, i.e. $a = -21$, $b = 22$ ✓.) Because $M$ is not a multiple of $I$, the representation $aM + bI$ is unique.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix}2 & 3\\\\ c & d\\end{bmatrix}$. Find $c$ and $d$ such that $A^2 = I$.",
    options: [
      "$c = 1,\\ d = -2$",
      "$c = -1,\\ d = 2$",
      "$c = -\\frac53,\\ d = -2$",
      "$c = -1,\\ d = -2$",
      "No such $c, d$ exist",
    ],
    answer: 3,
    solution:
      "$A^2 = \\begin{bmatrix}4 + 3c & 6 + 3d\\\\ 2c + cd & 3c + d^2\\end{bmatrix}$. Set it equal to $I$:\n$(1,2)$: $6 + 3d = 0 \\Rightarrow d = -2$. $(1,1)$: $4 + 3c = 1 \\Rightarrow c = -1$.\nCheck the remaining entries: $(2,1)$: $2c + cd = -2 + 2 = 0$ ✓; $(2,2)$: $3c + d^2 = -3 + 4 = 1$ ✓.\nSo $c = -1$, $d = -2$. (Equivalently: a $2\\times2$ matrix $\\ne\\pm I$ with $A^2 = I$ has $\\operatorname{tr}A = 0$ and $\\det A = -1$.)",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}3 & -1\\\\ 5 & -2\\end{bmatrix}$. It is known that $A^2 = kA + mI$ for some scalars $k$ and $m$. Which of the following equals $A^{-1}$?",
    options: ["$A - I$", "$I - A$", "$A + I$", "$-(A + I)$", "$A$ is not invertible"],
    answer: 0,
    solution:
      "$A^2 = \\begin{bmatrix}9 - 5 & -3 + 2\\\\ 15 - 10 & -5 + 4\\end{bmatrix} = \\begin{bmatrix}4&-1\\\\5&-1\\end{bmatrix} = A + I$, so $k = m = 1$ (as predicted by $k = \\operatorname{tr}A = 1$, $m = -\\det A = 1$).\nThen $A^2 - A = I$, i.e. $A(A - I) = I$, so $A^{-1} = A - I = \\begin{bmatrix}2&-1\\\\5&-3\\end{bmatrix}$.\nCheck with the formula: $\\det A = -1$, $A^{-1} = -\\begin{bmatrix}-2&1\\\\-5&3\\end{bmatrix} = \\begin{bmatrix}2&-1\\\\5&-3\\end{bmatrix}$ ✓.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    prompt:
      "Which of the following statements are correct?\nI. If $A$ is $m\\times n$ and $B$ is $n\\times m$, then $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$.\nII. For $n\\times n$ matrices, $\\operatorname{tr}(A + B^T) = \\operatorname{tr}A + \\operatorname{tr}B$.\nIII. For $n\\times n$ matrices, $\\operatorname{tr}(ABC) = \\operatorname{tr}(CBA)$.\nIV. $\\operatorname{tr}(A^TA) \\ge 0$ for every matrix $A$, with equality only when $A = 0$.",
    options: ["I and II only", "II and IV only", "I, II and III only", "I, II and IV only", "All of the above"],
    answer: 3,
    solution:
      "I: $\\operatorname{tr}(AB) = \\sum_{i,k}a_{ik}b_{ki} = \\operatorname{tr}(BA)$, valid even for non-square $A, B$ ✓.\nII: trace is linear and $\\operatorname{tr}(B^T) = \\operatorname{tr}B$ ✓.\nIII: only **cyclic** rotations are allowed; $CBA$ reverses the order. With $A = E_{12}$, $B = E_{21}$, $C = E_{11}$: $ABC = E_{11}$ (trace 1) but $CBA = E_{11}E_{21}E_{12} = 0$ ✗.\nIV: $\\operatorname{tr}(A^TA) = \\sum a_{ij}^2$ ✓.\nAnswer: **I, II and IV only**.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}2&-1&0\\\\1&3&-2\\\\4&0&5\\end{bmatrix}$ and $B = \\begin{bmatrix}1&0&2\\\\3&-1&1\\\\0&2&-3\\end{bmatrix}$ with columns $\\mathbf{b}_1, \\mathbf{b}_2, \\mathbf{b}_3$. The second column of $BA$ is written as $c_1\\mathbf{b}_1 + c_2\\mathbf{b}_2 + c_3\\mathbf{b}_3$. Which option gives $(c_1, c_2, c_3)$ and the second column of $BA$?",
    options: [
      "$(1, 3, -2)$; $[-3,\\ -2,\\ 12]^T$",
      "$(-1, 3, 0)$; $[-1,\\ -6,\\ 6]^T$",
      "$(0, -1, 2)$; $[4,\\ 3,\\ -8]^T$",
      "$(2, 1, 4)$; $[10,\\ 9,\\ -10]^T$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Column method: column 2 of $BA$ is $B\\mathbf{a}_2$, where $\\mathbf{a}_2 = (-1, 3, 0)$ is column 2 of $A$. So the weights are $(c_1,c_2,c_3) = (-1, 3, 0)$ and\n$-\\mathbf{b}_1 + 3\\mathbf{b}_2 + 0\\mathbf{b}_3 = -(1,3,0) + 3(0,-1,2) = (-1, -6, 6)$.\nTraps: (a) takes row 2 of $A$ as weights; (c) takes column 2 of $B$; (d) takes column 1 of $A$ (that is the **first** column of $BA$).",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&0&2\\\\-1&3&1\\end{bmatrix}$, $B = \\begin{bmatrix}2&1\\\\0&-1\\\\1&3\\end{bmatrix}$ and $C = \\begin{bmatrix}1&-2&4&1\\\\3&1&-1&3\\end{bmatrix}$. Find the $(2,3)$ entry of $ABC$.",
    options: ["$9$", "$1$", "$-3$", "$-4$", NOTA],
    answer: 2,
    solution:
      "Only row 2 of $ABC$ is needed. Row 2 of $AB$ = (row 2 of $A$)$B = -1(2,1) + 3(0,-1) + 1(1,3) = (-1, -1)$.\nThen $(ABC)_{23}$ = (row 2 of $AB$)$\\cdot$(column 3 of $C$) $= (-1)(4) + (-1)(-1) = -3$.\nTraps: $9$ is the $(1,3)$ entry, $1$ the $(2,2)$ entry and $-4$ the $(2,1)$ entry.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    prompt:
      "Let $B = \\begin{bmatrix}1&0&2\\\\4&-3&1\\\\0&6&4\\end{bmatrix}$, $C = \\begin{bmatrix}2&-1&3\\\\0&4&1\\end{bmatrix}$ and $D = \\begin{bmatrix}1&2\\\\-3&0\\\\2&5\\end{bmatrix}$. Find $\\operatorname{tr}\\left(C^TD^T + 2B^T\\right)$.",
    options: ["$20$", "$15$", "$16$", "$18$", NOTA],
    answer: 0,
    solution:
      "$C^TD^T = (DC)^T$, so $\\operatorname{tr}(C^TD^T) = \\operatorname{tr}(DC) = \\operatorname{tr}(CD)$, and $CD$ is only $2\\times2$:\n$(CD)_{11} = 2(1) + (-1)(-3) + 3(2) = 11$, $(CD)_{22} = 0(2) + 4(0) + 1(5) = 5$, so $\\operatorname{tr}(C^TD^T) = 16$.\n$\\operatorname{tr}(2B^T) = 2\\operatorname{tr}B = 2(1 - 3 + 4) = 4$.\nTotal: $16 + 4 = 20$. (Traps: $16$ forgets $2B^T$, $18$ forgets the factor $2$, $15$ uses only $(CD)_{11}$.)",
  },
  {
    subtopic: "Algebra rules",
    kind: "mcq",
    prompt:
      "$A$ and $B$ are invertible $n\\times n$ matrices and $k$ is a nonzero scalar. Which of the following is **false**?",
    options: [
      "$(AB)^T = B^TA^T$",
      "$(kA)^{-1} = kA^{-1}$",
      "$(A^T)^{-1} = (A^{-1})^T$",
      "$\\operatorname{tr}(kA) = k\\operatorname{tr}(A)$",
      "$A + A^T$ is symmetric",
    ],
    answer: 1,
    solution:
      "$(kA)(kA^{-1}) = k^2I$, which is $I$ only for $k = \\pm1$. The correct rule is $(kA)^{-1} = \\tfrac1kA^{-1}$, so (b) is false.\nThe others are standard: transpose reverses products; $A^T(A^{-1})^T = (A^{-1}A)^T = I$; trace is linear; $(A + A^T)^T = A^T + A$.",
  },
  {
    subtopic: "Outer products",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{x}\\in\\mathbb{R}^3$ and $\\mathbf{r}\\in\\mathbb{R}^4$ be nonzero, and $A = \\mathbf{x}\\mathbf{r}^T$. Which of the following statements are correct?\nI. Every column of $A$ is a scalar multiple of $\\mathbf{x}$.\nII. Every row of $A$ is a scalar multiple of $\\mathbf{r}^T$.\nIII. $A^TA = \\|\\mathbf{x}\\|^2\\,\\mathbf{r}\\mathbf{r}^T$.\nIV. $A^2$ is not defined.",
    options: ["I and II only", "I, II and III only", "I, II and IV only", "I and III only", "All of the above"],
    answer: 4,
    solution:
      "$A_{ij} = x_ir_j$: column $j$ is $r_j\\mathbf{x}$ (I) and row $i$ is $x_i\\mathbf{r}^T$ (II).\nIII: $A^TA = \\mathbf{r}\\mathbf{x}^T\\mathbf{x}\\mathbf{r}^T = (\\mathbf{x}^T\\mathbf{x})\\,\\mathbf{r}\\mathbf{r}^T = \\|\\mathbf{x}\\|^2\\mathbf{r}\\mathbf{r}^T$ ✓.\nIV: $A$ is $3\\times4$, and $(3\\times4)(3\\times4)$ is undefined ✓.\n**All of the above**.",
  },
  {
    subtopic: "Commutator",
    kind: "mcq",
    prompt:
      "For $n\\times n$ matrices define $[X, Y] = XY - YX$. Which statements hold for all $A, B, C$?\nI. $[A, B] = -[B, A]$\nII. $[A, B + C] = [A, B] + [A, C]$\nIII. $\\operatorname{tr}[A, B] = 0$\nIV. $[A, BC] = [A, B]\\,C + [A, C]\\,B$",
    options: ["I and III only", "I, II and IV only", "II and III only", "I, II and III only", "All of the above"],
    answer: 3,
    solution:
      "I: $BA - AB = -(AB - BA)$ ✓. II: $A(B + C) - (B + C)A = (AB - BA) + (AC - CA)$ ✓. III: $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$ ✓.\nIV: $[A,B]C + [A,C]B = ABC - BAC + ACB - CAB$, while $[A, BC] = ABC - BCA$. These differ in general (the correct identity is $[A,BC] = [A,B]C + B[A,C]$). ✗\n**I, II and III only**.",
  },
  {
    subtopic: "Commuting matrices",
    kind: "mcq",
    prompt:
      "The matrices $A = \\begin{bmatrix}2&1\\\\1&0\\end{bmatrix}$ and $B = \\begin{bmatrix}x&y\\\\3&1\\end{bmatrix}$ commute. Find $x + y$.",
    options: ["$4$", "$10$", "$7$", "$13$", "No such $x, y$ exist"],
    answer: 1,
    solution:
      "$AB = \\begin{bmatrix}2x + 3 & 2y + 1\\\\ x & y\\end{bmatrix}$, $BA = \\begin{bmatrix}2x + y & x\\\\ 7 & 3\\end{bmatrix}$.\nMatch entries: $(1,1)$: $2x + 3 = 2x + y \\Rightarrow y = 3$; $(2,2)$: $y = 3$ ✓; $(2,1)$: $x = 7$; $(1,2)$: $2y + 1 = x \\Rightarrow 7 = 7$ ✓.\nSo $x = 7$, $y = 3$ and $x + y = 10$. (Indeed $B = 3A + I$, and every polynomial in $A$ commutes with $A$.)",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    prompt: "$A$ and $C$ are invertible $n\\times n$ matrices and $AXC = B + AC$. Then $X =$",
    options: ["$A^{-1}BC^{-1} + I$", "$BA^{-1}C^{-1} + I$", "$A^{-1}C^{-1}B + I$", "$A^{-1}BC^{-1} + AC$", NOTA],
    answer: 0,
    solution:
      "Multiply on the left by $A^{-1}$: $XC = A^{-1}B + C$. Multiply on the right by $C^{-1}$: $X = A^{-1}BC^{-1} + CC^{-1} = A^{-1}BC^{-1} + I$.\nEach inverse must go on the same side as the matrix it cancels; (b) and (c) put $B$ in the wrong place, and (d) forgets that $A^{-1}(AC)C^{-1} = I$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    prompt: "If $(3A^T)^{-1} = \\begin{bmatrix}2&-1\\\\5&-2\\end{bmatrix}$, find $A$.",
    options: [
      "$\\frac13\\begin{bmatrix}-2&1\\\\-5&2\\end{bmatrix}$",
      "$3\\begin{bmatrix}-2&-5\\\\1&2\\end{bmatrix}$",
      "$\\frac13\\begin{bmatrix}2&5\\\\-1&-2\\end{bmatrix}$",
      "$\\frac13\\begin{bmatrix}-2&-5\\\\1&2\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Invert both sides: $3A^T = \\begin{bmatrix}2&-1\\\\5&-2\\end{bmatrix}^{-1}$. The determinant is $-4 + 5 = 1$, so the inverse is $\\begin{bmatrix}-2&1\\\\-5&2\\end{bmatrix}$.\n$A^T = \\frac13\\begin{bmatrix}-2&1\\\\-5&2\\end{bmatrix}$, hence $A = \\frac13\\begin{bmatrix}-2&-5\\\\1&2\\end{bmatrix}$.\n(a) forgets the final transpose; (b) multiplies by 3 instead of dividing; (c) transposes without inverting.",
  },
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    prompt:
      "$A = [a_{ij}]$ and $B = [b_{ij}]$ are $3\\times3$ matrices with $a_{ij} = i - j$ and $b_{ij} = i + j$. Find $\\operatorname{tr}(AB) + \\operatorname{tr}(A^2)$.",
    options: ["$12$", "$-12$", "$0$", "$-6$", NOTA],
    answer: 1,
    solution:
      "$a_{ji} = -a_{ij}$, so $A$ is skew-symmetric; $b_{ji} = b_{ij}$, so $B$ is symmetric.\n$\\operatorname{tr}(AB) = \\sum_{i,j}a_{ij}b_{ji} = \\sum_{i,j}(i - j)(i + j)$, and the terms for $(i,j)$ and $(j,i)$ cancel, so $\\operatorname{tr}(AB) = 0$ (skew times symmetric always has trace 0).\n$\\operatorname{tr}(A^2) = \\sum_{i,j}a_{ij}a_{ji} = -\\sum_{i,j}a_{ij}^2 = -(1 + 4 + 1 + 1 + 4 + 1) = -12$.\nTotal: $-12$. (Directly: $A = \\begin{bmatrix}0&-1&-2\\\\1&0&-1\\\\2&1&0\\end{bmatrix}$ and $A^2$ has diagonal $-5, -2, -5$.)",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    prompt:
      "$A$ is $2\\times4$, $B$ is $4\\times3$ and $C$ is $3\\times2$. Which of the following products are defined?\nI. $ABC$\nII. $CAB$\nIII. $BCA$\nIV. $ACB$\nV. $B^TA^TC^T$",
    options: ["I, II, III and V only", "I, II and III only", "I and II only", "I, II, III and IV only", "All of the above"],
    answer: 0,
    solution:
      "I: $(2\\times4)(4\\times3)(3\\times2)$ → $2\\times2$ ✓. II: $(3\\times2)(2\\times4)(4\\times3)$ → $3\\times3$ ✓. III: $(4\\times3)(3\\times2)(2\\times4)$ → $4\\times4$ ✓.\nIV: $AC$ is $(2\\times4)(3\\times2)$, undefined ✗.\nV: $B^TA^T$ is $(3\\times4)(4\\times2) = 3\\times2$, times $C^T$ ($2\\times3$) → $3\\times3$ ✓ (it equals $(CAB)^T$).\n**I, II, III and V only**.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix}1&2\\\\0&-1\\end{bmatrix}$. Find $A^{25} + A^{26}$.",
    options: [
      "$\\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}$",
      "$\\begin{bmatrix}2&102\\\\0&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&2\\\\0&-2\\end{bmatrix}$",
      "$\\begin{bmatrix}1&2\\\\0&-1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 4,
    solution:
      "$A^2 = \\begin{bmatrix}1 + 0 & 2 - 2\\\\ 0 & 1\\end{bmatrix} = I$. Hence odd powers equal $A$ and even powers equal $I$: $A^{25} = A$, $A^{26} = I$.\n$A^{25} + A^{26} = A + I = \\begin{bmatrix}2&2\\\\0&0\\end{bmatrix}$, which is not listed: **None of the above**.\n(a) treats both powers as $I$; (c) is $A - I$; (d) is $A$ alone.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix}2&1\\\\-4&3\\end{bmatrix}$. Find the $(1,2)$ entry of $A^4$.",
    options: ["$-100$", "$5$", "$125$", "$25$", NOTA],
    answer: 3,
    solution:
      "Cayley–Hamilton for $2\\times2$: $A^2 = (\\operatorname{tr}A)A - (\\det A)I = 5A - 10I$ ($\\operatorname{tr}A = 5$, $\\det A = 6 + 4 = 10$).\n$A^3 = 5A^2 - 10A = 5(5A - 10I) - 10A = 15A - 50I$.\n$A^4 = 15A^2 - 50A = 15(5A - 10I) - 50A = 25A - 150I$.\nThe $(1,2)$ entry of $I$ is $0$, so $(A^4)_{12} = 25\\cdot a_{12} = 25$. (Direct check: $A^4 = \\begin{bmatrix}-100&25\\\\-100&-75\\end{bmatrix}$.) $-100$ is the $(1,1)$ entry and $5$ is $(A^2)_{12}$.",
  },
  {
    subtopic: "Zero divisors & cancellation",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix}2&-1\\\\-6&3\\end{bmatrix}$. Which nonzero matrix $B$ satisfies $AB = 0$?",
    options: [
      "$\\begin{bmatrix}3&1\\\\3&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&2\\\\3&6\\end{bmatrix}$",
      "$\\begin{bmatrix}1&3\\\\2&6\\end{bmatrix}$",
      "$\\begin{bmatrix}2&-1\\\\-6&3\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$AB = \\begin{bmatrix}A\\mathbf{b}_1 & A\\mathbf{b}_2\\end{bmatrix} = 0$ iff each column of $B$ solves $A\\mathbf{x} = \\mathbf{0}$, i.e. $2x_1 - x_2 = 0$: columns must be multiples of $(1, 2)$.\n(c) has columns $(1,2)$ and $(3,6) = 3(1,2)$ ✓.\nTrap (a): its **rows** are multiples of $(3,1)$, which gives $BA = 0$, not $AB = 0$ (here $AB = \\begin{bmatrix}3&1\\\\-9&-3\\end{bmatrix}$). (b) has columns $(1,3)$, $(2,6)$; (d) gives $A^2 = \\begin{bmatrix}10&-5\\\\-30&15\\end{bmatrix}$.",
  },
  // ------------------------------------------------ T / F / cannot be determined
  {
    subtopic: "Powers & polynomials",
    kind: "tfn",
    prompt: "$A$ is a $2\\times2$ matrix with $\\operatorname{tr}A = 0$ and $\\det A = -1$. Then $A^2 = I$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Every $2\\times2$ matrix satisfies $A^2 - (\\operatorname{tr}A)A + (\\det A)I = 0$. Here this reads $A^2 - 0\\cdot A - I = 0$, so $A^2 = I$. **True**. (E.g. $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ or $\\begin{bmatrix}2&3\\\\-1&-2\\end{bmatrix}$.)",
  },
  {
    subtopic: "Special matrices",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with $A^TA = A$. Then $A$ is symmetric.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A^TA$ is always symmetric: $(A^TA)^T = A^T(A^T)^T = A^TA$. Since $A = A^TA$, $A$ itself is symmetric. **True**. (Then also $A^2 = A^TA = A$.)",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with $A^3 = 0$ (nothing else is known). Then $A^2 = 0$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Both outcomes are possible. $A = 0$ (or $A = \\begin{bmatrix}0&1&0\\\\0&0&0\\\\0&0&0\\end{bmatrix}$) has $A^3 = 0$ and $A^2 = 0$. But the shift $A = \\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ has $A^2 = \\begin{bmatrix}0&0&1\\\\0&0&0\\\\0&0&0\\end{bmatrix} \\ne 0$ and $A^3 = 0$. **Cannot be determined**.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix with $A^2 = 0$. Then $I + A$ is invertible and $(I + A)^{-1} = I + A$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(I + A)(I + A) = I + 2A + A^2 = I + 2A$, which is not $I$ unless $A = 0$. The correct inverse is $I - A$: $(I + A)(I - A) = I - A^2 = I$. So $I + A$ is invertible, but the stated inverse is wrong (e.g. $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$). **False**.",
  },
  {
    subtopic: "Zero divisors & cancellation",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $AB = 0$ and $B \\ne 0$. Then $A$ is not invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $A$ were invertible, multiplying $AB = 0$ on the left by $A^{-1}$ would give $B = 0$, contradicting $B \\ne 0$. So $A$ is singular. **True**. (Zero divisors can only occur between non-invertible matrices.)",
  },
  {
    subtopic: "Special matrices",
    kind: "tfn",
    prompt: "For all symmetric $n\\times n$ matrices $A$ and $B$, the matrix $AB - BA$ is symmetric.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(AB - BA)^T = B^TA^T - A^TB^T = BA - AB = -(AB - BA)$, so $AB - BA$ is **skew**-symmetric. It is symmetric only when it is $0$. Example: $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $B = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ give $AB - BA = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$, not symmetric. **False**.",
  },
  {
    subtopic: "Trace",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix with $\\operatorname{tr}(A^TA) = 0$. Then $A^2 = 0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\operatorname{tr}(A^TA) = \\sum_{i,j}a_{ij}^2$, a sum of squares. It is $0$ only if every entry is $0$, so $A = 0$ and certainly $A^2 = 0$. **True**.",
  },
];
