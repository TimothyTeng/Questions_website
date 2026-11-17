import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const matricesConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (12)
  {
    subtopic: "Matrix multiplication",
    kind: "tfn",
    ref: "Slides 0B Operations on Matrices (mtx p9)",
    prompt: "If $A$ is $m\\times n$ and $B$ is $n\\times m$, then both $AB$ and $BA$ are defined, and both are square matrices.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$(m\\times n)(n\\times m)$: inner sizes match, so $AB$ is $m\\times m$. $(n\\times m)(m\\times n)$: inner sizes match, so $BA$ is $n\\times n$. Both are square (of different sizes when $m\\ne n$). **True**.",
  },
  {
    subtopic: "Zero products & cancellation",
    kind: "tfn",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt: "For all $n\\times n$ matrices $A, B, C$ with $A \\ne 0$: if $AB = AC$, then $B = C$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$AB = 0$ does not force $A = 0$ or $B = 0$, so a nonzero $A$ cannot simply be cancelled. Counterexample: $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $B = \\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$, $C = 0$. Then $AB = 0 = AC$ but $B \\ne C$. **False**.",
  },
  {
    subtopic: "Zero products & cancellation",
    kind: "tfn",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt: "$A$ and $B$ are $2\\times2$ matrices with $AB = 0$ (nothing else is known). Then $BA = 0$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "It can go either way. With $A = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$, $B = \\begin{bmatrix}2&-4\\\\-1&2\\end{bmatrix}$ we get $AB = 0$ but $BA = \\begin{bmatrix}-6&-12\\\\3&6\\end{bmatrix} \\ne 0$. With $A = 0$ (or $B = 0$) both products are $0$. The information given does not decide it: **Not enough information**.",
  },
  {
    subtopic: "Algebra rules",
    kind: "tfn",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $AB = BA$. Then $(A+B)^2 = A^2 + 2AB + B^2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "By the distributive laws, $(A+B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2$. When $BA = AB$ the middle terms combine to $2AB$. **True**. (Without $AB = BA$ the statement would fail in general.)",
  },
  {
    subtopic: "Transpose",
    kind: "tfn",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt: "For every $m\\times n$ matrix $A$ and $n\\times p$ matrix $B$, $(AB)^T = A^TB^T$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The correct rule reverses the order: $(AB)^T = B^TA^T$. In fact $A^TB^T$ is $(n\\times m)(p\\times n)$, which is not even defined unless $m = p$. **False**.",
  },
  {
    subtopic: "Special matrices",
    kind: "tfn",
    ref: "Slides 0B Notation and Terminology (mtx p6)",
    prompt: "There is a $4\\times4$ skew-symmetric matrix $A$ with $a_{22} = 3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Skew-symmetric means $A^T = -A$, i.e. $a_{ij} = -a_{ji}$. With $i = j$: $a_{ii} = -a_{ii}$, so $a_{ii} = 0$. Every diagonal entry of a skew-symmetric matrix is $0$. **False**.",
  },
  {
    subtopic: "Powers",
    kind: "tfn",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10); PYP older (find $c, d$ with $A^2 = I$)",
    prompt: "Every $2\\times2$ matrix $A$ with $A^2 = I$ is equal to $I$ or $-I$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Counterexample: $A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ gives $A^2 = \\begin{bmatrix}0\\cdot0+1\\cdot1 & 0\\\\ 0 & 1\\cdot1+0\\cdot0\\end{bmatrix} = I$. So does $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$. **False**.",
  },
  {
    subtopic: "Powers",
    kind: "tfn",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10), Inverse of a Matrix (mtx p13)",
    prompt: "$A$ is a $2\\times2$ matrix with $A^2 = A$ and $A \\ne 0$ (nothing else is known). Then $A = I$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$A = I$ satisfies the conditions, but so does $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$: $A^2 = A \\ne 0$, $A \\ne I$. The given facts allow both, so **Not enough information**. (If $A$ were also invertible, multiplying $A^2 = A$ by $A^{-1}$ would give $A = I$.)",
  },
  {
    subtopic: "Outer products",
    kind: "tfn",
    ref: "Slides 0B Multiplication by Columns (mtx p11); PYP AY24/25 S2 Q7 ($A = \\mathbf{x}\\mathbf{r}^T$)",
    prompt: "For nonzero $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, every column of the $3\\times3$ matrix $\\mathbf{u}\\mathbf{v}^T$ is a scalar multiple of $\\mathbf{u}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\mathbf{u}$ is $3\\times1$ and $\\mathbf{v}^T$ is $1\\times3$. By the column method, column $j$ of $\\mathbf{u}\\mathbf{v}^T$ is $\\mathbf{u}$ times the $j$-th column of $\\mathbf{v}^T$, the number $v_j$. So every column is $v_j\\mathbf{u}$. **True**.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "tfn",
    ref: "Slides 0B Properties (mtx p10), Inverse of a Matrix (mtx p13); Tutorial 0B Q4",
    prompt: "For every invertible matrix $A$ and scalar $k \\ne 0, \\pm1$, the inverse of $kA$ is $kA^{-1}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Check the definition: using $(kA)B = k(AB) = A(kB)$, $(kA)(kA^{-1}) = k^2AA^{-1} = k^2I \\ne I$ since $k \\ne \\pm1$. (The matrix $\\tfrac1kA^{-1}$ works instead: $(kA)(\\tfrac1kA^{-1}) = I$.) **False**.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "tfn",
    ref: "Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "For all invertible $n\\times n$ matrices $A$ and $B$, $(AB)^{-1} = A^{-1}B^{-1}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The theorem on mtx p13 says $(AB)^{-1} = B^{-1}A^{-1}$: the order reverses. $A^{-1}B^{-1}$ differs whenever $A^{-1}$ and $B^{-1}$ do not commute (e.g. $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, $B = \\begin{bmatrix}1&0\\\\1&1\\end{bmatrix}$). **False**.",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "tfn",
    ref: "Slides 2.1 Matrix Multiplication (alg p3–4); Slides 0B Properties (mtx p10)",
    prompt: "$A$ is $2\\times3$, $B$ is $3\\times4$ and $\\mathbf{x}\\in\\mathbb{R}^4$. Then $A(B\\mathbf{x}) = (AB)\\mathbf{x}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Multiplying by $B$ and then by $A$ is multiplication by the single matrix $AB$ (associativity $A(BC) = (AB)C$ with $C = \\mathbf{x}$). Sizes: $B\\mathbf{x}\\in\\mathbb{R}^3$, $A(B\\mathbf{x})\\in\\mathbb{R}^2$; $AB$ is $2\\times4$ and $(AB)\\mathbf{x}\\in\\mathbb{R}^2$. **True**.",
  },

  // ---------------------------------------------------------------- MCQ (36)
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    ref: "Slides 0B Notation and Terminology (mtx p4)",
    prompt: "Which matrix is the $2\\times3$ matrix $A = [a_{ij}]$ with $a_{ij} = i - j$?",
    options: [
      "$\\begin{bmatrix}0&1&2\\\\-1&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&-1\\\\1&0\\\\2&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&-1&-2\\\\1&0&-1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0&-1\\\\2&1&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Row $i = 1$: $1-1, 1-2, 1-3 = 0, -1, -2$. Row $i = 2$: $2-1, 2-2, 2-3 = 1, 0, -1$. So $A = \\begin{bmatrix}0&-1&-2\\\\1&0&-1\\end{bmatrix}$.\n(a) uses $j - i$; (b) is the wrong size ($3\\times2$); (d) is $i - j + 1$.",
  },
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    ref: "Slides 0B Operations on Matrices: Equality (mtx p7)",
    prompt:
      "Find $x, y, z$ such that $\\begin{bmatrix}x + 2y & 4\\\\ 3 & x - y\\end{bmatrix} = \\begin{bmatrix}7 & z\\\\ 3 & 1\\end{bmatrix}$.",
    options: ["$(x,y,z) = (1, 3, 4)$", "$(x,y,z) = (3, 2, 4)$", "$(x,y,z) = (3, 2, 3)$", "$(x,y,z) = (2, 3, 4)$", "No values of $x, y, z$ work"],
    answer: 1,
    solution:
      "Equal matrices have equal corresponding entries: $x + 2y = 7$, $4 = z$, $3 = 3$, $x - y = 1$. Subtracting the last from the first: $3y = 6$, so $y = 2$ and $x = 3$; $z = 4$.\n(a) satisfies $x + 2y = 7$ but not $x - y = 1$: every entry must match.",
  },
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    ref: "Slides 0B Notation and Terminology (mtx p4–6); PYP AY25/26 S1 Q7 (matrix given by $a_{ij}$)",
    prompt: "Let $A = [a_{ij}]$ be the $4\\times4$ matrix with $a_{ij} = |i - j|$. Which statement is correct?",
    options: [
      "$A$ is skew-symmetric",
      "$A$ is a diagonal matrix",
      "$\\operatorname{trace} A = 4$",
      "$A$ is symmetric and $\\operatorname{trace} A = 0$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$a_{ji} = |j - i| = |i - j| = a_{ij}$, so $A$ is symmetric. The diagonal entries are $|i - i| = 0$, so $\\operatorname{trace} A = 0$.\n$A = \\begin{bmatrix}0&1&2&3\\\\1&0&1&2\\\\2&1&0&1\\\\3&2&1&0\\end{bmatrix}$ has nonzero entries off the diagonal (not diagonal), and it is not skew-symmetric since $a_{21} = a_{12} = 1 \\ne -1$.",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    ref: "Slides 0B Operations on Matrices (mtx p9), Notation (mtx p6)",
    prompt: "$A$ is $3\\times5$, $B$ is $5\\times2$ and $C$ is $2\\times3$. Which of the following is **not** defined?",
    options: ["$ABC$", "$CAB$", "$BCA$", "$B^TA^T$", "$AC^T$"],
    answer: 4,
    solution:
      "Check inner sizes. $ABC$: $(3\\times5)(5\\times2)(2\\times3)$ → $3\\times3$ ✓. $CAB$: $(2\\times3)(3\\times5)(5\\times2)$ → $2\\times2$ ✓. $BCA$: $(5\\times2)(2\\times3)(3\\times5)$ → $5\\times5$ ✓. $B^TA^T$: $(2\\times5)(5\\times3)$ → $2\\times3$ ✓ (it equals $(AB)^T$).\n$AC^T$: $(3\\times5)(3\\times2)$, inner sizes $5 \\ne 3$, **not defined**.",
  },
  {
    subtopic: "Addition & scalar multiples",
    kind: "mcq",
    ref: "Slides 0B Operations on Matrices (mtx p7–8)",
    prompt:
      "Let $A = \\begin{bmatrix}1&-2\\\\4&0\\end{bmatrix}$ and $B = \\begin{bmatrix}2&1\\\\-1&3\\end{bmatrix}$. Find the matrix $X$ with $3X + A = 2B$.",
    options: [
      "$\\frac13\\begin{bmatrix}3&4\\\\-6&6\\end{bmatrix}$",
      "$\\frac13\\begin{bmatrix}5&0\\\\2&6\\end{bmatrix}$",
      "$\\begin{bmatrix}3&4\\\\-6&6\\end{bmatrix}$",
      "$\\frac13\\begin{bmatrix}-3&-4\\\\6&-6\\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Entry by entry this is a scalar equation: $3X = 2B - A$, so $X = \\tfrac13(2B - A)$.\n$2B - A = \\begin{bmatrix}4&2\\\\-2&6\\end{bmatrix} - \\begin{bmatrix}1&-2\\\\4&0\\end{bmatrix} = \\begin{bmatrix}3&4\\\\-6&6\\end{bmatrix}$, so $X = \\frac13\\begin{bmatrix}3&4\\\\-6&6\\end{bmatrix}$.\n(b) uses $2B + A$; (c) forgets the $\\tfrac13$; (d) has the sign reversed.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    ref: "Slides 0B Notation and Terminology: trace, transpose, identity (mtx p5–6); Tutorial 0B Q1",
    prompt:
      "$A$ and $B$ are $3\\times3$ matrices with $\\operatorname{trace} A = 4$ and $\\operatorname{trace} B = -1$. Find $\\operatorname{trace}(3A^T - 2B + I_3)$.",
    options: ["$13$", "$14$", "$15$", "$16$", NOTA],
    answer: 4,
    solution:
      "Only diagonal entries matter. The diagonal of $A^T$ is the diagonal of $A$, so the $(i,i)$ entry of $3A^T - 2B + I_3$ is $3a_{ii} - 2b_{ii} + 1$. Adding over $i = 1, 2, 3$:\n$3(a_{11}+a_{22}+a_{33}) - 2(b_{11}+b_{22}+b_{33}) + 3 = 3(4) - 2(-1) + 3 = 17$.\n$17$ is not listed, so the answer is **None of the above**. (Traps: $13$ from a sign slip on $-2(-1)$; $14$ from forgetting $I_3$; $15$ from adding only $1$ for $I_3$.)",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    ref: "Slides 0B Operations on Matrices: Matrix Multiplication (mtx p9)",
    prompt:
      "Let $A = \\begin{bmatrix}1&-2&3\\\\4&0&-1\\end{bmatrix}$ and $B = \\begin{bmatrix}2&1&0&-1\\\\-3&2&5&1\\\\1&4&-2&0\\end{bmatrix}$. Find the $(2,3)$ entry of $AB$.",
    options: ["$-16$", "$0$", "$2$", "$-5$", NOTA],
    answer: 2,
    solution:
      "$(AB)_{23} = \\sum_k a_{2k}b_{k3}$ = (row 2 of $A$) against (column 3 of $B$) $= 4(0) + 0(5) + (-1)(-2) = 2$.\n(a) is $(AB)_{13}$ (wrong row); (b) uses column 2 of $B$; (d) is $a_{23}b_{23}$, an entrywise product, which is not matrix multiplication.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Slides 0B Matrix Products as Linear Combinations (mtx p12)",
    prompt:
      "$A$ is a $3\\times3$ matrix with columns $\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3$ and rows $\\mathbf{r}_1, \\mathbf{r}_2, \\mathbf{r}_3$. For $\\mathbf{x} = (2, -1, 3)$, which expression equals $A\\mathbf{x}$?",
    options: [
      "$2\\mathbf{a}_1 - \\mathbf{a}_2 + 3\\mathbf{a}_3$",
      "$\\left(2\\mathbf{r}_1 - \\mathbf{r}_2 + 3\\mathbf{r}_3\\right)^T$",
      "$2\\mathbf{a}_1 + \\mathbf{a}_2 + 3\\mathbf{a}_3$",
      "$\\mathbf{a}_1 + \\mathbf{a}_2 + \\mathbf{a}_3$ scaled by $2 - 1 + 3 = 4$",
      NOTA,
    ],
    answer: 0,
    solution:
      "By the theorem on mtx p12, $A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + x_3\\mathbf{a}_3 = 2\\mathbf{a}_1 - \\mathbf{a}_2 + 3\\mathbf{a}_3$: a linear combination of the **columns** of $A$ with the entries of $\\mathbf{x}$ as coefficients.\n(b) combines the rows instead, which is a different vector in general.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Slides 0B Multiplication by Columns (mtx p11), Linear Combinations (mtx p12); Tutorial 0B Q3",
    prompt:
      "$A = [a_{ij}]$ and $B$ are $3\\times3$, and $\\mathbf{b}_1, \\mathbf{b}_2, \\mathbf{b}_3$ are the columns of $B$. The first column of $BA$ equals",
    options: [
      "$a_{11}\\mathbf{b}_1 + a_{12}\\mathbf{b}_2 + a_{13}\\mathbf{b}_3$",
      "$a_{11}\\mathbf{b}_1 + a_{21}\\mathbf{b}_2 + a_{31}\\mathbf{b}_3$",
      "$b_{11}\\mathbf{a}_1 + b_{21}\\mathbf{a}_2 + b_{31}\\mathbf{a}_3$",
      "$b_{11}\\mathbf{a}_1 + b_{12}\\mathbf{a}_2 + b_{13}\\mathbf{a}_3$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Column method: column 1 of $BA$ is $B$ times column 1 of $A$, i.e. $B(a_{11}, a_{21}, a_{31})^T = a_{11}\\mathbf{b}_1 + a_{21}\\mathbf{b}_2 + a_{31}\\mathbf{b}_3$.\nThe weights come from the first **column** of $A$ (not its first row, option (a)), and the vectors being combined are the columns of the **left** factor $B$ (options (c), (d) combine columns of $A$).",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Slides 0B Multiplication by Rows (mtx p11); Tutorial 0B Q2",
    prompt:
      "The second row of a $3\\times3$ matrix $A$ is $\\begin{bmatrix}1&0&-1\\end{bmatrix}$ (the other rows are unknown), and $B = \\begin{bmatrix}2&5&-1\\\\0&3&4\\\\-3&1&2\\end{bmatrix}$. What is the second row of $AB$?",
    options: [
      "$\\begin{bmatrix}3&-4&-5\\end{bmatrix}$",
      "$\\begin{bmatrix}-1&6&1\\end{bmatrix}$",
      "$\\begin{bmatrix}-5&-4&3\\end{bmatrix}$",
      "$\\begin{bmatrix}5&4&-3\\end{bmatrix}$",
      "It cannot be found without the other rows of $A$",
    ],
    answer: 3,
    solution:
      "Row method: row 2 of $AB$ = (row 2 of $A$)$\\,B = 1\\cdot(2,5,-1) + 0\\cdot(0,3,4) - 1\\cdot(-3,1,2) = (5, 4, -3)$. Only row 2 of $A$ is needed.\n(a) is $B(1,0,-1)^T$ (column method applied by mistake); (b) adds instead of subtracting; (c) has the sign reversed.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Slides 0B Transpose (mtx p6), Matrix Multiplication (mtx p9)",
    prompt: "For an $n\\times n$ matrix $A$ ($n \\ge 3$), the $(2,3)$ entry of $A^TA$ equals",
    options: [
      "(row 2 of $A$)$\\cdot$(row 3 of $A$)",
      "(row 2 of $A$)$\\cdot$(column 3 of $A$)",
      "(column 2 of $A$)$\\cdot$(column 3 of $A$)",
      "$a_{23}^2$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$(A^TA)_{23}$ = (row 2 of $A^T$) against (column 3 of $A$). Interchanging rows and columns makes row 2 of $A^T$ equal to column 2 of $A$, so the entry is $\\sum_k a_{k2}a_{k3}$ = (column 2 of $A$)$\\cdot$(column 3 of $A$). (a) describes $AA^T$ instead.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Slides 0B Matrix Multiplication by Columns and by Rows (mtx p11)",
    prompt:
      "$A$ is $m\\times n$ and $B$ is $n\\times p$. Which statements must be true?\nI. If columns 1 and 3 of $B$ are equal, then columns 1 and 3 of $AB$ are equal.\nII. If columns 1 and 3 of $A$ are equal, then columns 1 and 3 of $AB$ are equal.\nIII. If row 2 of $A$ is zero, then row 2 of $AB$ is zero.\nIV. If row 2 of $B$ is zero, then row 2 of $AB$ is zero.",
    options: ["I and III only", "II and IV only", "I and II only", "I, III and IV only", "All of the above"],
    answer: 0,
    solution:
      "Column $j$ of $AB$ is $A\\mathbf{b}_j$, which depends only on column $j$ of $B$: equal columns of $B$ give equal columns of $AB$ (I true). Row $i$ of $AB$ is (row $i$ of $A$)$B$, so a zero row of $A$ gives a zero row of $AB$ (III true).\nII and IV mix up the roles. E.g. $A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$, $B = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ has row 2 of $B$ zero but $AB = \\begin{bmatrix}0&0\\\\1&1\\end{bmatrix}$. **I and III only**.",
  },
  {
    subtopic: "Algebra rules",
    kind: "mcq",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt:
      "Which statements hold for **all** $n\\times n$ matrices $A, B, C$?\nI. $(A+B)^2 = A^2 + 2AB + B^2$\nII. $(AB)^T = B^TA^T$\nIII. $A(B + C) = AB + AC$\nIV. $(AB)^2 = A^2B^2$",
    options: ["II only", "I, II and III only", "II and IV only", "II and III only", "All of the above"],
    answer: 3,
    solution:
      "II (transpose of a product) and III (distributive law) are on mtx p10.\nI: $(A+B)^2 = A^2 + AB + BA + B^2$, which equals $A^2 + 2AB + B^2$ only if $AB = BA$.\nIV: $(AB)^2 = ABAB$; turning it into $AABB$ needs $BA = AB$.\nSo **II and III only**.",
  },
  {
    subtopic: "Zero products & cancellation",
    kind: "mcq",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt: "For which pair is $AB = 0$ (with $A \\ne 0$ and $B \\ne 0$)?",
    options: [
      "$A = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix},\\ B = \\begin{bmatrix}1&-1\\\\1&-1\\end{bmatrix}$",
      "$A = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix},\\ B = \\begin{bmatrix}1&1\\\\-1&-1\\end{bmatrix}$",
      "$A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix},\\ B = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$",
      "$A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix},\\ B = \\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "(b): each row of $A$ is $(1,1)$ and both columns of $B$ are $(1,-1)$, so every entry of $AB$ is $1 - 1 = 0$. $AB = 0$ with both factors nonzero.\n(a) is the trap: there $AB = \\begin{bmatrix}2&-2\\\\2&-2\\end{bmatrix}$ while $BA = 0$. (c) gives $AB = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$; (d) gives $AB = A \\ne 0$.",
  },
  {
    subtopic: "Zero products & cancellation",
    kind: "mcq",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10), Multiplication by Columns (mtx p11)",
    prompt: "Let $A = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$. Which matrix $C \\ne I$ satisfies $AC = A$ (so that $AC = AI$ although $C \\ne I$)?",
    options: [
      "$\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}$",
      "$\\begin{bmatrix}3&0\\\\-1&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0\\\\2&-1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Column method: $AC = \\begin{bmatrix}A\\mathbf{c}_1 & A\\mathbf{c}_2\\end{bmatrix}$ must have columns $(1,2)$ and $(2,4)$, the columns of $A$.\n(c): $A(3,-1) = 3(1,2) - (2,4) = (1, 2)$ ✓ and $A(0,1) = (2,4)$ ✓, so $AC = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix} = A$.\n(a): $A(2,1) = (4,8) \\ne (2,4)$. (b): $AC = 2A$. (d): $A(1,2) = (5,10)$. Cancelling $A$ fails here, just as $AB = 0$ does not force $B = 0$.",
  },
  {
    subtopic: "Algebra rules",
    kind: "mcq",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
    prompt: "For $n\\times n$ matrices $A$ and $B$, the identity $(A+B)(A-B) = A^2 - B^2$ holds",
    options: [
      "exactly when $AB = BA$",
      "always",
      "exactly when $AB = 0$",
      "exactly when $A$ and $B$ are invertible",
      NOTA,
    ],
    answer: 0,
    solution:
      "Expand with the distributive laws, keeping order: $(A+B)(A-B) = A^2 - AB + BA - B^2$. This equals $A^2 - B^2$ iff $-AB + BA = 0$, i.e. iff $AB = BA$. ($AB = 0$ alone is not enough: $BA$ might be nonzero.)",
  },
  {
    subtopic: "Commuting matrices",
    kind: "mcq",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10), Equality (mtx p7)",
    prompt: "For which $x$ do $A = \\begin{bmatrix}1&2\\\\0&3\\end{bmatrix}$ and $B = \\begin{bmatrix}x&4\\\\0&5\\end{bmatrix}$ commute ($AB = BA$)?",
    options: ["$x = 2$", "$x = -1$", "$x = 3$", "$x = 1$", "No value of $x$"],
    answer: 3,
    solution:
      "$AB = \\begin{bmatrix}x & 4 + 10\\\\ 0 & 15\\end{bmatrix} = \\begin{bmatrix}x&14\\\\0&15\\end{bmatrix}$ and $BA = \\begin{bmatrix}x & 2x + 12\\\\ 0 & 15\\end{bmatrix}$.\nThe $(1,1)$, $(2,1)$, $(2,2)$ entries always agree; the $(1,2)$ entries need $14 = 2x + 12$, so $x = 1$.",
  },
  {
    subtopic: "Commutator",
    kind: "mcq",
    ref: "PYP older (commutator $[A,B] = AB - BA$); Slides 0B Matrix Multiplication (mtx p9)",
    prompt: "Let $A = \\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$ and $B = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$. Find the commutator $[A,B] = AB - BA$.",
    options: [
      "$\\begin{bmatrix}-2&0\\\\0&2\\end{bmatrix}$",
      "$\\begin{bmatrix}2&0\\\\0&-2\\end{bmatrix}$",
      "$\\begin{bmatrix}2&0\\\\2&2\\end{bmatrix}$",
      "$\\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$AB = \\begin{bmatrix}1(0)+2(1) & 0\\\\ 0+1 & 0\\end{bmatrix} = \\begin{bmatrix}2&0\\\\1&0\\end{bmatrix}$, $BA = \\begin{bmatrix}0&0\\\\1&2\\end{bmatrix}$.\n$[A,B] = AB - BA = \\begin{bmatrix}2&0\\\\0&-2\\end{bmatrix}$. (a) is $BA - AB$; (c) is $AB + BA$.",
  },
  {
    subtopic: "Commutator",
    kind: "mcq",
    ref: "PYP older (fill in: $[A,B]C + B[A,C] = [A, BC]$)",
    prompt: "With $[X,Y] = XY - YX$, which expression equals $[A, BC]$ for all $n\\times n$ matrices $A, B, C$?",
    options: [
      "$[A,B]\\,C + [A,C]\\,B$",
      "$C\\,[A,B] + B\\,[A,C]$",
      "$[A,B]\\,C + B\\,[A,C]$",
      "$[A,B]\\,[A,C]$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Expand with the distributive laws: $[A,B]C + B[A,C] = (AB - BA)C + B(AC - CA) = ABC - BAC + BAC - BCA = ABC - BCA = [A, BC]$ ✓.\nIn (a) the terms $-BAC$ and $+ACB$ do not cancel; (b) gives $CAB - CBA + BAC - BCA$.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "Slides 0B Matrix Multiplication (mtx p9), Properties (mtx p10)",
    prompt: "Let $A = \\begin{bmatrix}1&3\\\\0&1\\end{bmatrix}$. Find $A^5$.",
    options: [
      "$\\begin{bmatrix}1&243\\\\0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}5&15\\\\0&5\\end{bmatrix}$",
      "$\\begin{bmatrix}1&12\\\\0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&3\\\\0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 4,
    solution:
      "$A^2 = \\begin{bmatrix}1&6\\\\0&1\\end{bmatrix}$, $A^3 = A^2A = \\begin{bmatrix}1&9\\\\0&1\\end{bmatrix}$: each multiplication by $A$ adds another $3$ to the $(1,2)$ entry. So $A^5 = \\begin{bmatrix}1&15\\\\0&1\\end{bmatrix}$, which is not listed: **None of the above**.\n(a) raises the entry to the 5th power (powers are not entrywise); (b) is $5A$; (c) is $A^4$.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "PYP older (find $k$ with $A^2 = kA - 2I$); Slides 0B Equality (mtx p7)",
    prompt: "Let $A = \\begin{bmatrix}4&-2\\\\3&-1\\end{bmatrix}$. Find $k$ such that $A^2 = kA - 2I$.",
    options: ["$k = 2$", "$k = 3$", "$k = -3$", "$k = 5$", "No such $k$ exists"],
    answer: 1,
    solution:
      "$A^2 = \\begin{bmatrix}16-6 & -8+2\\\\ 12-3 & -6+1\\end{bmatrix} = \\begin{bmatrix}10&-6\\\\9&-5\\end{bmatrix}$.\nCompare the $(1,2)$ entries of $A^2$ and $kA - 2I$ ($I$ has $0$ there): $-6 = -2k$, so $k = 3$. Check all entries: $3A - 2I = \\begin{bmatrix}10&-6\\\\9&-5\\end{bmatrix}$ ✓.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "PYP AY25/26 S1 Q2 ($M^2 = I - M$, find $n$)",
    prompt: "A square matrix $M$ satisfies $M^2 = M + I$. Writing $M^5 = aM + bI$, find $(a, b)$.",
    options: ["$(3, 2)$", "$(8, 5)$", "$(5, 3)$", "$(3, 5)$", NOTA],
    answer: 2,
    solution:
      "Multiply by $M$ and replace $M^2$ each time:\n$M^3 = M^2 + M = 2M + I$\n$M^4 = 2M^2 + M = 2(M + I) + M = 3M + 2I$\n$M^5 = 3M^2 + 2M = 3(M + I) + 2M = 5M + 3I$.\nSo $(a,b) = (5,3)$. $(3,2)$ is $M^4$ and $(8,5)$ is $M^6$.",
  },
  {
    subtopic: "Powers",
    kind: "mcq",
    ref: "Slides 0B Operations on Matrices (mtx p7–9), identity (mtx p5)",
    prompt: "Let $A = \\begin{bmatrix}2&1\\\\0&1\\end{bmatrix}$. Compute $A^2 - 3A + 2I$.",
    options: [
      "$\\begin{bmatrix}0&2\\\\2&0\\end{bmatrix}$",
      "$\\begin{bmatrix}-2&0\\\\0&-2\\end{bmatrix}$",
      "$\\begin{bmatrix}-4&0\\\\0&-4\\end{bmatrix}$",
      "$\\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$A^2 = \\begin{bmatrix}4&3\\\\0&1\\end{bmatrix}$, $-3A = \\begin{bmatrix}-6&-3\\\\0&-3\\end{bmatrix}$, so $A^2 - 3A = \\begin{bmatrix}-2&0\\\\0&-2\\end{bmatrix}$, and adding $2I = \\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}$ gives the zero matrix.\n(a) adds $2$ to every entry instead of adding $2I$; (b) forgets $2I$; (c) subtracts $2I$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "PYP older ($A^m = 0 \\Rightarrow I - A$ invertible); Slides 0B Inverse of a Matrix (mtx p13)",
    prompt:
      "Let $N = \\begin{bmatrix}0&2&3\\\\0&0&4\\\\0&0&0\\end{bmatrix}$, so $N^3 = 0$. Using $(I - N)(I + N + N^2) = I - N^3$, find $(I - N)^{-1}$.",
    options: [
      "$\\begin{bmatrix}1&2&3\\\\0&1&4\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&-2&-3\\\\0&1&-4\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&2&11\\\\0&1&4\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&-2&5\\\\0&1&-4\\\\0&0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Since $N^3 = 0$, $(I - N)(I + N + N^2) = I$ (and the same holds with the factors in the other order), so $(I - N)^{-1} = I + N + N^2$.\n$N^2 = \\begin{bmatrix}0&0&2\\cdot4\\\\0&0&0\\\\0&0&0\\end{bmatrix} = \\begin{bmatrix}0&0&8\\\\0&0&0\\\\0&0&0\\end{bmatrix}$, so $I + N + N^2 = \\begin{bmatrix}1&2&11\\\\0&1&4\\\\0&0&1\\end{bmatrix}$.\n(a) forgets $N^2$; (b) is $I - N$ itself; (d) is $I - N + N^2$.",
  },
  {
    subtopic: "Transpose",
    kind: "mcq",
    ref: "Slides 0B Transpose (mtx p6), Properties (mtx p10)",
    prompt: "$A$, $B$, $C$ are $n\\times n$ matrices. Simplify $\\left((AB)^TC\\right)^T$.",
    options: ["$B^TA^TC$", "$C^TAB$", "$C^TB^TA^T$", "$ABC^T$", NOTA],
    answer: 1,
    solution:
      "Reverse the order and transpose each factor: $\\left((AB)^TC\\right)^T = C^T\\left((AB)^T\\right)^T = C^T(AB) = C^TAB$, using $(A^T)^T = A$.\n(c) transposes $AB$ again; (d) keeps the original order.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    ref: "Slides 0B trace (mtx p5), transpose (mtx p6), Matrix Multiplication (mtx p9)",
    prompt: "Let $A = \\begin{bmatrix}1&-2&0\\\\3&1&2\\end{bmatrix}$. Find $\\operatorname{trace}(A^TA)$.",
    options: ["$2$", "$5$", "$25$", "$11$", NOTA],
    answer: 4,
    solution:
      "$A^TA$ is $3\\times3$. Its $(j,j)$ entry is (row $j$ of $A^T$) against (column $j$ of $A$), i.e. column $j$ of $A$ against itself:\n$(1,3)\\cdot(1,3) = 10$, $(-2,1)\\cdot(-2,1) = 5$, $(0,2)\\cdot(0,2) = 4$.\n$\\operatorname{trace}(A^TA) = 10 + 5 + 4 = 19$, which is not listed: **None of the above**.\n(a) uses only $a_{11}^2 + a_{22}^2$; (b) is the sum of the entries; (c) squares that sum; (d) forgets to square the negative entry.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    ref: "Slides 0B trace (mtx p5), Matrix Multiplication (mtx p9); Tutorial 0B Q1",
    prompt:
      "Let $A = \\begin{bmatrix}1&2&-1\\\\0&3&4\\end{bmatrix}$ and $B = \\begin{bmatrix}2&1\\\\-1&0\\\\3&-2\\end{bmatrix}$. Find $\\operatorname{trace}(BA)$.",
    options: ["$-3$", "$-8$", "$11$", "$-11$", NOTA],
    answer: 3,
    solution:
      "$BA$ is $(3\\times2)(2\\times3) = 3\\times3$; only its diagonal is needed. $(BA)_{ii}$ = (row $i$ of $B$) against (column $i$ of $A$):\n$(BA)_{11} = 2(1) + 1(0) = 2$, $(BA)_{22} = -1(2) + 0(3) = -2$, $(BA)_{33} = 3(-1) + (-2)(4) = -11$.\n$\\operatorname{trace}(BA) = 2 - 2 - 11 = -11$. ($-3$ and $-8$ are the diagonal entries of the $2\\times2$ product $AB$, a different matrix.)",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
    ref: "Slides 0B symmetric / skew-symmetric (mtx p6), transpose rules (mtx p8, p10); PYP AY25/26 S2 Q17 ($A^TA$ symmetric)",
    prompt:
      "Let $A$ be any $n\\times n$ matrix. Which of the following are always symmetric?\nI. $A + A^T$\nII. $AA^T$\nIII. $A - A^T$\nIV. $A^2$",
    options: ["I only", "I and II only", "I, II and IV only", "I, II and III only", "All of the above"],
    answer: 1,
    solution:
      "I: $(A + A^T)^T = A^T + (A^T)^T = A^T + A$ ✓. II: $(AA^T)^T = (A^T)^TA^T = AA^T$ ✓.\nIII: $(A - A^T)^T = A^T - A = -(A - A^T)$, skew-symmetric (symmetric only if it is $0$).\nIV: $(A^2)^T = (AA)^T = A^TA^T$, which equals $A^2$ only for special $A$; e.g. $A = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ has $A^2 = A$, not symmetric. **I and II only**.",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
    ref: "Slides 0B symmetric / skew-symmetric (mtx p6)",
    prompt:
      "The matrix $\\begin{bmatrix}0 & x & 3\\\\ -2 & y & z\\\\ w & 4 & 0\\end{bmatrix}$ is skew-symmetric. Find $(x, y, z, w)$.",
    options: ["$(2, 0, -4, -3)$", "$(-2, 0, 4, 3)$", "$(2, 0, 4, 3)$", "$(2, 1, -4, -3)$", NOTA],
    answer: 0,
    solution:
      "Skew-symmetric: $a_{ij} = -a_{ji}$, and so the diagonal is $0$.\n$x = a_{12} = -a_{21} = 2$; $y = a_{22} = 0$; $z = a_{23} = -a_{32} = -4$; $w = a_{31} = -a_{13} = -3$.\n(b) and (c) use the symmetric rule $a_{ij} = a_{ji}$ for some entries; (d) has a nonzero diagonal entry.",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
    ref: "Slides 0B symmetric (mtx p6); PYP AY25/26 S1 Q5 (symmetric matrices)",
    prompt:
      "The matrix $\\begin{bmatrix}1 & a & 5\\\\ 2 & 3 & b\\\\ c & -1 & 0\\end{bmatrix}$ is symmetric. Find $a + b + c$.",
    options: ["$6$", "$4$", "$-6$", "$8$", NOTA],
    answer: 0,
    solution:
      "Symmetric: $a_{ij} = a_{ji}$. $a = a_{12} = a_{21} = 2$; $b = a_{23} = a_{32} = -1$; $c = a_{31} = a_{13} = 5$. So $a + b + c = 2 - 1 + 5 = 6$.\n$-6$ uses the skew rule $a_{ij} = -a_{ji}$; $8$ takes $b = 1$; $4$ takes $b = -3$.",
  },
  {
    subtopic: "Outer products",
    kind: "mcq",
    ref: "PYP AY24/25 S2 Q7 ($A = \\mathbf{x}\\mathbf{r}^T$); Slides 0B Multiplication by Columns and by Rows (mtx p11), transpose (mtx p10)",
    prompt:
      "$\\mathbf{u}\\in\\mathbb{R}^3$ and $\\mathbf{v}\\in\\mathbb{R}^4$ are nonzero column vectors and $A = \\mathbf{u}\\mathbf{v}^T$. Which statements are correct?\nI. $A$ is $3\\times4$.\nII. Every row of $A$ is a multiple of $\\mathbf{v}^T$.\nIII. Every column of $A$ is a multiple of $\\mathbf{u}$.\nIV. $A^T = \\mathbf{v}\\mathbf{u}^T$.",
    options: ["I and III only", "I, II and III only", "II and IV only", "I, III and IV only", "All of the above"],
    answer: 4,
    solution:
      "$(3\\times1)(1\\times4)$ is $3\\times4$ (I). Entry $(i,j)$ is $u_iv_j$: by the row method row $i$ is $u_i\\mathbf{v}^T$ (II), by the column method column $j$ is $v_j\\mathbf{u}$ (III). $(\\mathbf{u}\\mathbf{v}^T)^T = (\\mathbf{v}^T)^T\\mathbf{u}^T = \\mathbf{v}\\mathbf{u}^T$ (IV). **All of the above**.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    ref: "Slides 0B diagonal matrix (mtx p5), Multiplication by Rows (mtx p11)",
    prompt: "Let $D = \\begin{bmatrix}2&0\\\\0&3\\end{bmatrix}$ and $A = \\begin{bmatrix}1&4\\\\-1&5\\end{bmatrix}$. Find $DA$.",
    options: [
      "$\\begin{bmatrix}2&12\\\\-2&15\\end{bmatrix}$",
      "$\\begin{bmatrix}2&0\\\\0&15\\end{bmatrix}$",
      "$\\begin{bmatrix}3&4\\\\-1&8\\end{bmatrix}$",
      "$\\begin{bmatrix}2&8\\\\-3&15\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Row method: row 1 of $DA$ = $(2, 0)A = 2\\cdot(1,4) = (2,8)$; row 2 = $(0,3)A = 3\\cdot(-1,5) = (-3,15)$. So $DA = \\begin{bmatrix}2&8\\\\-3&15\\end{bmatrix}$.\n(a) is $AD$; (b) multiplies only the diagonals; (c) is $D + A$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "Tutorial 0B Q4; Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "If $(2A)^{-1} = \\begin{bmatrix}3&1\\\\5&2\\end{bmatrix}$, find $A$.",
    options: [
      "$2\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$",
      "$\\frac12\\begin{bmatrix}3&1\\\\5&2\\end{bmatrix}$",
      "$\\frac12\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$",
      "$-\\frac12\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$2A$ is the inverse of $\\begin{bmatrix}3&1\\\\5&2\\end{bmatrix}$. Here $ad - bc = 3(2) - 1(5) = 1$, so the inverse is $\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$ (swap the diagonal, negate the off-diagonal, divide by $1$).\nThus $A = \\frac12\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$. (a) multiplies by 2 instead of dividing; (b) forgets to invert.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "For which values of $k$ is $\\begin{bmatrix}k & 2\\\\ 3 & k+1\\end{bmatrix}$ **not** invertible?",
    options: ["$k = 2$ or $k = -3$", "$k = -2$ or $k = 3$", "$k = 6$ only", "$k = \\pm\\sqrt6$", NOTA],
    answer: 0,
    solution:
      "A $2\\times2$ matrix is invertible iff $ad - bc \\ne 0$. Here $k(k+1) - 6 = k^2 + k - 6 = (k+3)(k-2)$, which is $0$ for $k = 2$ or $k = -3$.\n(b) has the signs of the roots swapped; (d) ignores the $k$ term.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "Slides 0B Inverse of a Matrix (mtx p13); PYP AY25/26 S2 Q5 (solve a matrix equation)",
    prompt:
      "Let $A = \\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}$ and $B = \\begin{bmatrix}3&2\\\\1&0\\end{bmatrix}$. Find the matrix $X$ with $XA = B$.",
    options: [
      "$\\begin{bmatrix}2&2\\\\-1&-2\\end{bmatrix}$",
      "$\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$",
      "$\\begin{bmatrix}8&5\\\\2&1\\end{bmatrix}$",
      "$\\begin{bmatrix}7&4\\\\4&2\\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$XA = B$: multiply on the **right** by $A^{-1}$: $X = BA^{-1}$. $ad - bc = 1$, $A^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}$.\n$X = \\begin{bmatrix}3&2\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix} = \\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$. Check: $XA = \\begin{bmatrix}3&2\\\\1&0\\end{bmatrix}$ ✓.\n(a) is $A^{-1}B$ (wrong side); (c) is $BA$; (d) is $AB$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "Slides 0B Inverse of a Matrix (mtx p13)",
    prompt: "Find the inverse of $A = \\begin{bmatrix}3&5\\\\1&2\\end{bmatrix}$.",
    options: [
      "$\\begin{bmatrix}2&5\\\\1&3\\end{bmatrix}$",
      "$\\begin{bmatrix}-2&5\\\\1&-3\\end{bmatrix}$",
      "$\\begin{bmatrix}3&-5\\\\-1&2\\end{bmatrix}$",
      "$\\begin{bmatrix}2&-5\\\\-1&3\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$ad - bc = 3(2) - 5(1) = 1 \\ne 0$, so $A^{-1} = \\frac11\\begin{bmatrix}2&-5\\\\-1&3\\end{bmatrix}$. Check: $AA^{-1} = \\begin{bmatrix}6-5 & -15+15\\\\ 2-2 & -5+6\\end{bmatrix} = I$ ✓.\n(a) swaps the diagonal but forgets to negate $b, c$; (b) negates the diagonal instead; (c) negates without swapping.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    ref: "Slides 0B Inverse of a Matrix: $(AB)^{-1}$, $(A^T)^{-1}$ (mtx p13)",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices. Which matrix is the inverse of $A^TB$?",
    options: ["$(A^{-1})^TB^{-1}$", "$B^{-1}(A^{-1})^T$", "$B^{-1}A^{-1}$", "$(B^{-1}A^{-1})^T$", NOTA],
    answer: 1,
    solution:
      "By the theorems on mtx p13: $(A^TB)^{-1} = B^{-1}(A^T)^{-1}$ (order reverses), and $(A^T)^{-1} = (A^{-1})^T$. So $(A^TB)^{-1} = B^{-1}(A^{-1})^T$.\n(a) keeps the original order; (c) drops the transpose; (d) equals $(A^{-1})^T(B^{-1})^T$, the inverse of $B^TA^T$.",
  },
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    ref: "Slides 0B Notation and Terminology (mtx p4–6); PYP AY25/26 S1 Q7 ($a_{ij} = i + j$)",
    prompt: "$A = [a_{ij}]$ is the $3\\times3$ matrix with $a_{ij} = i + j$. Find the $(1,3)$ entry of $A^2$.",
    options: ["$16$", "$38$", "$47$", "$62$", NOTA],
    answer: 2,
    solution:
      "Row by row: $A = \\begin{bmatrix}2&3&4\\\\3&4&5\\\\4&5&6\\end{bmatrix}$. $(A^2)_{13}$ = (row 1 of $A$) against (column 3 of $A$) $= 2(4) + 3(5) + 4(6) = 8 + 15 + 24 = 47$.\nTraps: $16 = a_{13}^2$ (squaring an entry is not $A^2$); $38$ is the $(1,2)$ entry and $62$ the $(2,3)$ entry of $A^2$.",
  },
];
