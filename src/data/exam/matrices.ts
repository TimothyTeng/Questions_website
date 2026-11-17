import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (five-option MCQs and T/F/cannot-be-determined parts). */
export const matricesExam: ConceptQuestion[] = [
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "PYP AY25/26 S1 Q2 ($M^2 = I - M$, $M^n = 13I - 21M$)",
    prompt:
      "A square matrix $M$, not a scalar multiple of $I$, satisfies $M^2 = 2I - M$. If $M^n = 22I - 21M$, then $n =$",
    options: ["$5$", "$7$", "$6$", "$8$", NOTA],
    answer: 2,
    solution:
      "Write $M^n = a_nM + b_nI$ and use $M^{n+1} = a_nM^2 + b_nM = a_n(2I - M) + b_nM = (b_n - a_n)M + 2a_nI$.\n$M^1 = M$; $M^2 = -M + 2I$; $M^3 = 3M - 2I$; $M^4 = -5M + 6I$; $M^5 = 11M - 10I$; $M^6 = -21M + 22I$.\nSo $n = 6$.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "PYP older (find $c, d$ so that $A^2 = I$); Slides 0B Equality (mtx p7)",
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
      "$A^2 = \\begin{bmatrix}4 + 3c & 6 + 3d\\\\ 2c + cd & 3c + d^2\\end{bmatrix}$. Set it equal to $I$ entry by entry:\n$(1,2)$: $6 + 3d = 0 \\Rightarrow d = -2$. $(1,1)$: $4 + 3c = 1 \\Rightarrow c = -1$.\nCheck the remaining entries: $(2,1)$: $2c + cd = -2 + 2 = 0$ ✓; $(2,2)$: $3c + d^2 = -3 + 4 = 1$ ✓.\nSo $c = -1$, $d = -2$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "PYP older (find $k$ with $A^2 = kA - 2I$); Slides 0B Inverse of a Matrix (mtx p13)",
    prompt:
      "Let $A = \\begin{bmatrix}3 & -1\\\\ 5 & -2\\end{bmatrix}$. It is known that $A^2 = kA + mI$ for some scalars $k$ and $m$. Find $k$ and $m$.",
    options: ["$k = 1,\\ m = 1$", "$k = -1,\\ m = 1$", "$k = 1,\\ m = -1$", "$k = 3,\\ m = -2$", NOTA],
    answer: 0,
    solution:
      "$A^2 = \\begin{bmatrix}9 - 5 & -3 + 2\\\\ 15 - 10 & -5 + 4\\end{bmatrix} = \\begin{bmatrix}4&-1\\\\5&-1\\end{bmatrix}$. Comparing entries with $kA + mI$: the $(1,2)$ entry gives $-1 = -k$, so $k = 1$, and then the $(1,1)$ entry gives $4 = 3 + m$, so $m = 1$: $A^2 = A + I$. Check the remaining entries: $(2,1)$: $5k = 5$ ✓; $(2,2)$: $-2k + m = -1$ ✓.\n(b) comes from a sign slip in the $(1,2)$ entry; (c) and (d) do not match the $(1,1)$ entry $3k + m = 4$.",
  },
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    ref: "PYP AY25/26 S1 Q7 ($a_{ij} = i + j$); Slides 0B Notation and Terminology (mtx p4–6)",
    prompt:
      "$A = [a_{ij}]$ is the $4\\times4$ matrix with $a_{ij} = i + j$. Let $\\mathbf{u} = (1,2,3,4)$ and $\\mathbf{w} = (1,1,1,1)$. Which of the following statements are correct?\nI. $A$ is symmetric.\nII. $\\operatorname{trace} A = 20$.\nIII. The $j$-th column of $A$ equals $\\mathbf{u} + j\\,\\mathbf{w}$.\nIV. $A^T = -A$.",
    options: ["I and II only", "I and III only", "I, II and III only", "II, III and IV only", "All of the above"],
    answer: 2,
    solution:
      "I: $a_{ji} = j + i = a_{ij}$ ✓.\nII: the diagonal is $a_{ii} = 2i$: $2 + 4 + 6 + 8 = 20$ ✓.\nIII: column $j$ has entries $a_{ij} = i + j$ for $i = 1,\\dots,4$, i.e. $(1 + j, 2 + j, 3 + j, 4 + j) = \\mathbf{u} + j\\mathbf{w}$ ✓.\nIV: $A^T = A \\ne -A$ (e.g. $a_{11} = 2 \\ne 0$) ✗.\n**I, II and III only**.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Tutorial 0B Q3; Slides 0B Multiplication by Columns (mtx p11), Linear Combinations (mtx p12)",
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
    ref: "Slides 0B Matrix Multiplication (mtx p9), Multiplication by Rows (mtx p11)",
    prompt:
      "Let $A = \\begin{bmatrix}1&0&2\\\\-1&3&1\\end{bmatrix}$, $B = \\begin{bmatrix}2&1\\\\0&-1\\\\1&3\\end{bmatrix}$ and $C = \\begin{bmatrix}1&-2&4&1\\\\3&1&-1&3\\end{bmatrix}$. Find the $(2,3)$ entry of $ABC$.",
    options: ["$9$", "$1$", "$-3$", "$-4$", NOTA],
    answer: 2,
    solution:
      "Only row 2 of $ABC = (AB)C$ is needed. Row 2 of $AB$ = (row 2 of $A$)$B = -1(2,1) + 3(0,-1) + 1(1,3) = (-1, -1)$.\nThen $(ABC)_{23}$ = (row 2 of $AB$) against (column 3 of $C$) $= (-1)(4) + (-1)(-1) = -3$.\nTraps: $9$ is the $(1,3)$ entry, $1$ the $(2,2)$ entry and $-4$ the $(2,1)$ entry.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    ref: "Tutorial 0B Q1(ii) ($\\operatorname{trace}(C^TD^T + 2B^T)$); Slides 0B trace, transpose (mtx p5–6)",
    prompt:
      "Let $B = \\begin{bmatrix}1&0&2\\\\4&-3&1\\\\0&6&4\\end{bmatrix}$, $C = \\begin{bmatrix}2&-1&3\\\\0&4&1\\end{bmatrix}$ and $D = \\begin{bmatrix}1&2\\\\-3&0\\\\2&5\\end{bmatrix}$. Find $\\operatorname{trace}\\left(C^TD^T + 2B^T\\right)$.",
    options: ["$20$", "$12$", "$16$", "$18$", NOTA],
    answer: 0,
    solution:
      "$C^TD^T$ is $(3\\times2)(2\\times3) = 3\\times3$. Its $(i,i)$ entry is (row $i$ of $C^T$) against (column $i$ of $D^T$) = (column $i$ of $C$)$\\cdot$(row $i$ of $D$):\n$(2,0)\\cdot(1,2) = 2$, $(-1,4)\\cdot(-3,0) = 3$, $(3,1)\\cdot(2,5) = 11$. Sum: $16$.\nThe diagonal of $B^T$ is the diagonal of $B$, so the diagonal of $2B^T$ sums to $2(1 - 3 + 4) = 4$.\nTotal: $16 + 4 = 20$. (Traps: $16$ forgets $2B^T$, $18$ forgets the factor $2$, $12$ subtracts $2B^T$.)",
  },
  {
    subtopic: "Algebra rules",
    kind: "mcq",
    ref: "Slides 0B Properties (mtx p10), Inverse of a Matrix (mtx p13), symmetric (mtx p6); Tutorial 0B Q4",
    prompt:
      "$A$ and $B$ are invertible $n\\times n$ matrices and $k \\ne 0, \\pm1$ is a scalar. Which of the following is **false**?",
    options: [
      "$(AB)^T = B^TA^T$",
      "The inverse of $kA$ is $kA^{-1}$",
      "$(A^T)^{-1} = (A^{-1})^T$",
      "$(AB)^{-1} = B^{-1}A^{-1}$",
      "$A + A^T$ is symmetric",
    ],
    answer: 1,
    solution:
      "$(kA)(kA^{-1}) = k^2AA^{-1} = k^2I$, which is not $I$ for $k \\ne \\pm1$; so (b) is false (the inverse of $kA$ is $\\tfrac1kA^{-1}$, as in Tutorial 0B Q4 where $A = \\tfrac17M^{-1}$).\n(a) is on mtx p10; (c) and (d) are the theorems on mtx p13; (e): $(A + A^T)^T = A^T + (A^T)^T = A^T + A$.",
  },
  {
    subtopic: "Outer products",
    kind: "mcq",
    ref: "PYP AY24/25 S2 Q7 ($A = \\mathbf{x}\\mathbf{r}^T$); Slides 0B Multiplication by Columns and by Rows (mtx p11), $(AB)^T$ (mtx p10)",
    prompt:
      "Let $\\mathbf{x}\\in\\mathbb{R}^3$ and $\\mathbf{r}\\in\\mathbb{R}^4$ be nonzero column vectors, and $A = \\mathbf{x}\\mathbf{r}^T$. Which of the following statements are correct?\nI. Every column of $A$ is a scalar multiple of $\\mathbf{x}$.\nII. Every row of $A$ is a scalar multiple of $\\mathbf{r}^T$.\nIII. $A^T = \\mathbf{r}\\mathbf{x}^T$.\nIV. $A^2$ is not defined.",
    options: ["I and II only", "I, II and III only", "I, II and IV only", "I and III only", "All of the above"],
    answer: 4,
    solution:
      "$A$ is $(3\\times1)(1\\times4) = 3\\times4$ with $a_{ij} = x_ir_j$: by the column method column $j$ is $r_j\\mathbf{x}$ (I), by the row method row $i$ is $x_i\\mathbf{r}^T$ (II).\nIII: $(\\mathbf{x}\\mathbf{r}^T)^T = (\\mathbf{r}^T)^T\\mathbf{x}^T = \\mathbf{r}\\mathbf{x}^T$ ✓.\nIV: $(3\\times4)(3\\times4)$ is undefined ✓.\n**All of the above**.",
  },
  {
    subtopic: "Commutator",
    kind: "mcq",
    ref: "PYP older (commutator identity $[A,B]C + B[A,C] = [A, BC]$); Slides 0B Properties (mtx p10)",
    prompt:
      "For $n\\times n$ matrices define $[X, Y] = XY - YX$. Which statements hold for all $A, B, C$?\nI. $[A, B] = -[B, A]$\nII. $[A, B + C] = [A, B] + [A, C]$\nIII. $[A, BC] = [A, B]\\,C + B\\,[A, C]$\nIV. $[A, BC] = [A, B]\\,C + [A, C]\\,B$",
    options: ["I and III only", "I, II and IV only", "II and III only", "I, II and III only", "All of the above"],
    answer: 3,
    solution:
      "I: $BA - AB = -(AB - BA)$ ✓. II: by the distributive laws, $A(B + C) - (B + C)A = (AB - BA) + (AC - CA)$ ✓.\nIII: $[A,B]C + B[A,C] = ABC - BAC + BAC - BCA = ABC - BCA = [A, BC]$ ✓.\nIV: $[A,B]C + [A,C]B = ABC - BAC + ACB - CAB$, which differs from $ABC - BCA$ in general ✗.\n**I, II and III only**.",
  },
  {
    subtopic: "Commuting matrices",
    kind: "mcq",
    ref: "Slides 0B Properties ($AB \\ne BA$ in general, mtx p10), Equality (mtx p7)",
    prompt:
      "The matrices $A = \\begin{bmatrix}2&1\\\\1&0\\end{bmatrix}$ and $B = \\begin{bmatrix}x&y\\\\3&1\\end{bmatrix}$ commute. Find $x + y$.",
    options: ["$4$", "$10$", "$7$", "$13$", "No such $x, y$ exist"],
    answer: 1,
    solution:
      "$AB = \\begin{bmatrix}2x + 3 & 2y + 1\\\\ x & y\\end{bmatrix}$, $BA = \\begin{bmatrix}2x + y & x\\\\ 7 & 3\\end{bmatrix}$.\nMatch entries: $(1,1)$: $2x + 3 = 2x + y \\Rightarrow y = 3$; $(2,2)$: $y = 3$ ✓; $(2,1)$: $x = 7$; $(1,2)$: $2y + 1 = x \\Rightarrow 7 = 7$ ✓.\nSo $x = 7$, $y = 3$ and $x + y = 10$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "PYP AY25/26 S2 Q5 (solve $A^{-1}(X+Y)B = A^{-1}$); Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "$A$ and $C$ are invertible $n\\times n$ matrices and $AXC = B + AC$. Then $X =$",
    options: ["$A^{-1}BC^{-1} + I$", "$BA^{-1}C^{-1} + I$", "$A^{-1}C^{-1}B + I$", "$A^{-1}BC^{-1} + AC$", NOTA],
    answer: 0,
    solution:
      "Multiply on the left by $A^{-1}$: $XC = A^{-1}B + C$. Multiply on the right by $C^{-1}$: $X = A^{-1}BC^{-1} + CC^{-1} = A^{-1}BC^{-1} + I$.\nEach inverse must go on the same side as the matrix it cancels; (b) and (c) put $B$ in the wrong place, and (d) forgets that $A^{-1}(AC)C^{-1} = I$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "PYP AY25/26 S2 Q5; Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices and $B(X - Y)A^{-1} = B$. Then $X =$",
    options: ["$A^{-1} + Y$", "$A + Y$", "$B^{-1}A + Y$", "$A - Y$", NOTA],
    answer: 1,
    solution:
      "Multiply on the left by $B^{-1}$: $(X - Y)A^{-1} = I$. Multiply on the right by $A$: $X - Y = A$. So $X = A + Y$.\n(a) multiplies by $A^{-1}$ instead of $A$; (c) keeps a $B^{-1}$ that cancelled; (d) has the sign of $Y$ wrong.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "PYP older ($A^4 = ABA^2 + 2A^3$); Slides 0B Inverse of a Matrix: $(AB)^{-1} = B^{-1}A^{-1}$ (mtx p13)",
    prompt: "$A$ is an invertible $n\\times n$ matrix and $B$ is an $n\\times n$ matrix with $A^4 = ABA^2 + 2A^3$. Then $B =$",
    options: ["$A + 2I$", "$A^2 - 2A$", "$A - 2I$", "$A^{-1} - 2I$", NOTA],
    answer: 2,
    solution:
      "Multiply on the left by $A^{-1}$: $A^3 = BA^2 + 2A^2$. $A^2 = AA$ is invertible (product of invertible matrices), so multiply on the right by $(A^2)^{-1}$: $A = B + 2I$. Hence $B = A - 2I$.\n(a) has the sign wrong; (b) cancels only one factor of $A$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "PYP AY24/25 S2 Q3 ($P[1,3]^T$, $P[2,3]^T$ given; find $p_{22}$); Slides 0B Multiplication by Columns (mtx p11), Inverse (mtx p13)",
    prompt:
      "A $2\\times2$ matrix $P$ satisfies $P\\begin{bmatrix}1\\\\2\\end{bmatrix} = \\begin{bmatrix}1\\\\0\\end{bmatrix}$ and $P\\begin{bmatrix}3\\\\5\\end{bmatrix} = \\begin{bmatrix}0\\\\1\\end{bmatrix}$. Find the entry $p_{22}$.",
    options: ["$1$", "$3$", "$-1$", "$-5$", NOTA],
    answer: 2,
    solution:
      "Column method: $P\\begin{bmatrix}1&3\\\\2&5\\end{bmatrix} = \\begin{bmatrix}P(1,2) & P(3,5)\\end{bmatrix} = I$. So $P$ is the inverse of $\\begin{bmatrix}1&3\\\\2&5\\end{bmatrix}$:\n$ad - bc = 5 - 6 = -1$, $P = \\frac{1}{-1}\\begin{bmatrix}5&-3\\\\-2&1\\end{bmatrix} = \\begin{bmatrix}-5&3\\\\2&-1\\end{bmatrix}$, so $p_{22} = -1$.\nCheck: $P(1,2) = (-5 + 6, 2 - 2) = (1, 0)$ ✓. ($1$ forgets to divide by $-1$; $3$ is $p_{12}$; $-5$ is $p_{11}$.)",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "Tutorial 0B Q4 ($(7A)^{-1}$ given, find $A$); Slides 0B Inverse of a Matrix: $(A^T)^{-1}$ (mtx p13)",
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
      "$3A^T$ is the inverse of $\\begin{bmatrix}2&-1\\\\5&-2\\end{bmatrix}$. Here $ad - bc = -4 + 5 = 1$, so the inverse is $\\begin{bmatrix}-2&1\\\\-5&2\\end{bmatrix}$.\n$A^T = \\frac13\\begin{bmatrix}-2&1\\\\-5&2\\end{bmatrix}$, hence (transpose, $(A^T)^T = A$) $A = \\frac13\\begin{bmatrix}-2&-5\\\\1&2\\end{bmatrix}$.\n(a) forgets the final transpose; (b) multiplies by 3 instead of dividing; (c) transposes without inverting.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    ref: "Slides 0B trace (mtx p5), Matrix Multiplication (mtx p9); PYP AY25/26 S1 Q7 (matrix given by $a_{ij}$)",
    prompt:
      "$A = [a_{ij}]$ and $B = [b_{ij}]$ are $3\\times3$ matrices with $a_{ij} = i - j$ and $b_{ij} = i + j$. Find $\\operatorname{trace}(AB) + \\operatorname{trace}(A^2)$.",
    options: ["$12$", "$-12$", "$0$", "$-7$", NOTA],
    answer: 1,
    solution:
      "$A = \\begin{bmatrix}0&-1&-2\\\\1&0&-1\\\\2&1&0\\end{bmatrix}$, $B = \\begin{bmatrix}2&3&4\\\\3&4&5\\\\4&5&6\\end{bmatrix}$. Only diagonal entries are needed (row $i$ against column $i$).\n$AB$: $(0,-1,-2)\\cdot(2,3,4) = -11$, $(1,0,-1)\\cdot(3,4,5) = -2$, $(2,1,0)\\cdot(4,5,6) = 13$; $\\operatorname{trace}(AB) = 0$.\n$A^2$: $(0,-1,-2)\\cdot(0,1,2) = -5$, $(1,0,-1)\\cdot(-1,0,1) = -2$, $(2,1,0)\\cdot(-2,-1,0) = -5$; $\\operatorname{trace}(A^2) = -12$.\nTotal: $-12$. ($0$ is $\\operatorname{trace}(AB)$ alone; $-7$ misses a diagonal entry of $A^2$.)",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    ref: "Slides 0B Matrix Multiplication: sizes (mtx p9), transpose (mtx p6)",
    prompt:
      "$A$ is $2\\times4$, $B$ is $4\\times3$ and $C$ is $3\\times2$. Which of the following products are defined?\nI. $ABC$\nII. $CAB$\nIII. $BCA$\nIV. $ACB$\nV. $B^TA^TC^T$",
    options: ["I, II, III and V only", "I, II and III only", "I and II only", "I, II, III and IV only", "All of the above"],
    answer: 0,
    solution:
      "I: $(2\\times4)(4\\times3)(3\\times2)$ → $2\\times2$ ✓. II: $(3\\times2)(2\\times4)(4\\times3)$ → $3\\times3$ ✓. III: $(4\\times3)(3\\times2)(2\\times4)$ → $4\\times4$ ✓.\nIV: $AC$ is $(2\\times4)(3\\times2)$, undefined ✗.\nV: $B^TA^T$ is $(3\\times4)(4\\times2) = 3\\times2$, times $C^T$ ($2\\times3$) → $3\\times3$ ✓ (it equals $(CAB)^T$).\n**I, II, III and V only**.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "Slides 0B Matrix Multiplication (mtx p9), Properties (mtx p10)",
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
      "$A^2 = \\begin{bmatrix}1 + 0 & 2 - 2\\\\ 0 & 1\\end{bmatrix} = I$. Hence $A^{26} = (A^2)^{13} = I$ and $A^{25} = A^{24}A = A$.\n$A^{25} + A^{26} = A + I = \\begin{bmatrix}2&2\\\\0&0\\end{bmatrix}$, which is not listed: **None of the above**.\n(a) treats both powers as $I$; (c) is $A - I$; (d) is $A$ alone.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "Slides 0B Matrix Multiplication (mtx p9), Properties: $A(BC) = (AB)C$ (mtx p10)",
    prompt: "Let $A = \\begin{bmatrix}2&1\\\\-4&3\\end{bmatrix}$. Find the $(1,2)$ entry of $A^4$.",
    options: ["$-100$", "$5$", "$125$", "$25$", NOTA],
    answer: 3,
    solution:
      "$A^2 = \\begin{bmatrix}4 - 4 & 2 + 3\\\\ -8 - 12 & -4 + 9\\end{bmatrix} = \\begin{bmatrix}0&5\\\\-20&5\\end{bmatrix}$, and $A^4 = A^2A^2$.\n$(A^4)_{12}$ = (row 1 of $A^2$) against (column 2 of $A^2$) $= 0(5) + 5(5) = 25$.\n$-100$ is the $(1,1)$ entry of $A^4$, $5$ is $(A^2)_{12}$, and $125 = 5^3$ treats the power entrywise.",
  },
  {
    subtopic: "Zero products & cancellation",
    kind: "mcq",
    ref: "Slides 0B Properties ($AB = 0 \\not\\Rightarrow A = 0$ or $B = 0$, mtx p10), Multiplication by Columns (mtx p11)",
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
      "Column method: $AB = \\begin{bmatrix}A\\mathbf{b}_1 & A\\mathbf{b}_2\\end{bmatrix}$, so each column of $B$ must satisfy $A\\mathbf{b} = \\mathbf{0}$, i.e. $2b_1 - b_2 = 0$: the columns must be multiples of $(1, 2)$.\n(c) has columns $(1,2)$ and $(3,6) = 3(1,2)$ ✓.\nTrap (a): its **rows** are multiples of $(3,1)$, which gives $BA = 0$, not $AB = 0$ (here $AB = \\begin{bmatrix}3&1\\\\-9&-3\\end{bmatrix}$). (b) has columns $(1,3)$, $(2,6)$; (d) gives $A^2 = \\begin{bmatrix}10&-5\\\\-30&15\\end{bmatrix}$.",
  },
  // ------------------------------------------------ T / F / cannot be determined
  {
    subtopic: "Special matrices",
    kind: "tfn",
    ref: "PYP AY25/26 S2 Q17 ($A^TA$ is symmetric); Slides 0B symmetric (mtx p6), $(AB)^T = B^TA^T$ (mtx p10)",
    prompt: "$A$ is a $3\\times3$ matrix with $A^TA = A$. Then $A$ is symmetric.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A^TA$ is always symmetric: $(A^TA)^T = A^T(A^T)^T = A^TA$. Since $A = A^TA$, $A$ itself is symmetric. **True**.",
  },
  {
    subtopic: "Powers",
    kind: "tfn",
    ref: "Slides 0B Properties ($AB = 0 \\not\\Rightarrow A = 0$ or $B = 0$, mtx p10)",
    prompt: "$A$ is a $3\\times3$ matrix with $A^3 = 0$ (nothing else is known). Then $A^2 = 0$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Both outcomes are possible. $A = 0$ has $A^3 = 0$ and $A^2 = 0$. But $A = \\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ has $A^2 = \\begin{bmatrix}0&0&1\\\\0&0&0\\\\0&0&0\\end{bmatrix} \\ne 0$ and $A^3 = A^2A = 0$. **Cannot be determined**.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "tfn",
    ref: "PYP older ($A^m = 0 \\Rightarrow I - A$ invertible); Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "$A$ is an $n\\times n$ matrix with $A^2 = 0$. Then $I + A$ is invertible and $(I + A)^{-1} = I + A$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(I + A)(I + A) = I + 2A + A^2 = I + 2A$, which is not $I$ unless $A = 0$. The inverse is $I - A$ instead: $(I + A)(I - A) = I - A + A - A^2 = I$ (and $(I - A)(I + A) = I$ too). So $I + A$ is invertible, but the stated inverse is wrong (e.g. $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$). **False**.",
  },
  {
    subtopic: "Zero products & cancellation",
    kind: "tfn",
    ref: "Slides 0B Properties (mtx p10), Inverse of a Matrix (mtx p13)",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $AB = 0$ and $B \\ne 0$. Then $A$ is not invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $A$ were invertible, multiplying $AB = 0$ on the left by $A^{-1}$ would give $B = A^{-1}0 = 0$, contradicting $B \\ne 0$. So $A$ is singular. **True**.",
  },
];
