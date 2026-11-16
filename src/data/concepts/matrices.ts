import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const matricesConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (17)
  {
    subtopic: "Matrix multiplication",
    kind: "tfn",
    prompt: "If $A$ is $m\\times n$ and $B$ is $n\\times m$, then both $AB$ and $BA$ are defined, and both are square matrices.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$(m\\times n)(n\\times m)$: inner sizes match, so $AB$ is $m\\times m$. $(n\\times m)(m\\times n)$: inner sizes match, so $BA$ is $n\\times n$. Both are square (of different sizes when $m\\ne n$). **True**.",
  },
  {
    subtopic: "Zero divisors & cancellation",
    kind: "tfn",
    prompt: "For all $n\\times n$ matrices $A, B, C$ with $A \\ne 0$: if $AB = AC$, then $B = C$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Cancellation needs $A$ **invertible**, not just nonzero. Counterexample: $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $B = \\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$, $C = 0$. Then $AB = 0 = AC$ but $B \\ne C$. **False**.",
  },
  {
    subtopic: "Zero divisors & cancellation",
    kind: "tfn",
    prompt: "$A$ and $B$ are $2\\times2$ matrices with $AB = 0$ (nothing else is known). Then $BA = 0$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "It can go either way. With $A = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$, $B = \\begin{bmatrix}2&-4\\\\-1&2\\end{bmatrix}$ we get $AB = 0$ but $BA = \\begin{bmatrix}-6&-12\\\\3&6\\end{bmatrix} \\ne 0$. With $A = 0$ (or $B = 0$) both products are $0$. The information given does not decide it: **Not enough information**.",
  },
  {
    subtopic: "Algebra rules",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $AB = BA$. Then $(A+B)^2 = A^2 + 2AB + B^2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Always $(A+B)^2 = A^2 + AB + BA + B^2$. When $BA = AB$ the middle terms combine to $2AB$. **True**. (Without $AB = BA$ the statement would fail in general.)",
  },
  {
    subtopic: "Transpose",
    kind: "tfn",
    prompt: "For every $m\\times n$ matrix $A$ and $n\\times p$ matrix $B$, $(AB)^T = A^TB^T$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The correct rule reverses the order: $(AB)^T = B^TA^T$. In fact $A^TB^T$ is $(n\\times m)(p\\times n)$, which is not even defined unless $m = p$; and for square matrices it usually differs from $B^TA^T$. **False**.",
  },
  {
    subtopic: "Trace",
    kind: "tfn",
    prompt: "For all $n\\times n$ matrices $A$ and $B$, $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\operatorname{tr}(AB) = \\sum_i\\sum_k a_{ik}b_{ki}$ and $\\operatorname{tr}(BA) = \\sum_k\\sum_i b_{ki}a_{ik}$: the same terms in a different order. **True**, even though $AB \\ne BA$ in general.",
  },
  {
    subtopic: "Trace",
    kind: "tfn",
    prompt: "For all $n\\times n$ matrices $A$ and $B$, $\\operatorname{tr}(AB) = \\operatorname{tr}(A)\\operatorname{tr}(B)$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Trace is additive, not multiplicative. Take $A = B = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$: $AB = I$ so $\\operatorname{tr}(AB) = 2$, while $\\operatorname{tr}A\\cdot\\operatorname{tr}B = 0\\cdot0 = 0$. **False**.",
  },
  {
    subtopic: "Trace",
    kind: "tfn",
    prompt: "$A$, $B$, $C$ are $3\\times3$ matrices with $\\operatorname{tr}(ABC) = 5$. Then $\\operatorname{tr}(CAB) = 5$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Apply $\\operatorname{tr}(XY) = \\operatorname{tr}(YX)$ with $X = AB$, $Y = C$: $\\operatorname{tr}(ABC) = \\operatorname{tr}(CAB)$. Cyclic rotations never change the trace. **True**.",
  },
  {
    subtopic: "Trace",
    kind: "tfn",
    prompt: "$A$, $B$, $C$ are $3\\times3$ matrices with $\\operatorname{tr}(ABC) = 5$ (nothing else is known). Then $\\operatorname{tr}(ACB) = 5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$ACB$ is not a cyclic rotation of $ABC$ (the rotations are $ABC$, $BCA$, $CAB$). Sometimes the traces agree (e.g. $A = \\operatorname{diag}(5,0,0)$, $B = C = I$ gives $5$ for both), sometimes not: with $E_{ij}$ the matrix having a single $1$ in position $(i,j)$, take $A = 5E_{11}$, $B = E_{12}$, $C = E_{21}$. Then $ABC = 5E_{11}$ (trace $5$) but $ACB = 5E_{11}E_{21}E_{12} = 0$ (trace $0$). Since only $\\operatorname{tr}(ABC)$ is given: **Not enough information**.",
  },
  {
    subtopic: "Special matrices",
    kind: "tfn",
    prompt: "If $A$ and $B$ are symmetric $n\\times n$ matrices with $AB = BA$, then $AB$ is symmetric.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$(AB)^T = B^TA^T = BA$ because both are symmetric. Since $BA = AB$, $(AB)^T = AB$. **True**. (Without commuting, the product of symmetric matrices need not be symmetric.)",
  },
  {
    subtopic: "Special matrices",
    kind: "tfn",
    prompt: "There is a $4\\times4$ skew-symmetric matrix $A$ with $a_{22} = 3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Skew-symmetric means $A^T = -A$, i.e. $a_{ji} = -a_{ij}$. With $i = j$: $a_{ii} = -a_{ii}$, so $a_{ii} = 0$. Every diagonal entry of a skew-symmetric matrix is $0$. **False**.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "tfn",
    prompt: "Every $2\\times2$ matrix $A$ with $A^2 = I$ is equal to $I$ or $-I$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A^2 - I = (A - I)(A + I) = 0$ does not force a factor to be zero (zero divisors). Counterexample: $A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ (swap the coordinates) has $A^2 = I$. So does $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$. **False**.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "tfn",
    prompt: "$A$ is a $2\\times2$ matrix with $A^2 = A$ and $A \\ne 0$ (nothing else is known). Then $A = I$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$A = I$ satisfies the conditions, but so does $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ (a projection): $A^2 = A \\ne 0$, $A \\ne I$. The given facts allow both, so **Not enough information**. (If $A$ were also invertible, multiplying $A^2 = A$ by $A^{-1}$ would give $A = I$.)",
  },
  {
    subtopic: "Outer products",
    kind: "tfn",
    prompt: "For nonzero $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, every column of the matrix $\\mathbf{u}\\mathbf{v}^T$ is a scalar multiple of $\\mathbf{u}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Column $j$ of $\\mathbf{u}\\mathbf{v}^T$ is $\\mathbf{u}\\,v_j$ (column method: $\\mathbf{u}$ times the $j$-th entry of $\\mathbf{v}^T$). So every column is $v_j\\mathbf{u}$, and every row is $u_i\\mathbf{v}^T$. **True**.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "tfn",
    prompt: "For every invertible matrix $A$ and scalar $k \\ne 0$, $(kA)^{-1} = kA^{-1}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Check the candidate: $(kA)(kA^{-1}) = k^2I \\ne I$ unless $k = \\pm1$. The correct inverse is $\\tfrac1kA^{-1}$, since $(kA)(\\tfrac1kA^{-1}) = I$. **False**.",
  },
  {
    subtopic: "Commutator",
    kind: "tfn",
    prompt: "There exist $n\\times n$ real matrices $A$ and $B$ ($n \\ge 1$) with $AB - BA = I_n$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Take traces: $\\operatorname{tr}(AB - BA) = \\operatorname{tr}(AB) - \\operatorname{tr}(BA) = 0$, but $\\operatorname{tr}(I_n) = n \\ge 1$. The commutator always has trace $0$, so it can never be the identity. **False**.",
  },
  {
    subtopic: "Special matrices",
    kind: "tfn",
    prompt: "Every square matrix can be written as the sum of a symmetric matrix and a skew-symmetric matrix.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A = \\tfrac12(A + A^T) + \\tfrac12(A - A^T)$. The first part is symmetric ($(A + A^T)^T = A^T + A$) and the second is skew ($(A - A^T)^T = A^T - A = -(A - A^T)$). **True** (and the split is unique).",
  },

  // ---------------------------------------------------------------- MCQ (38)
  {
    subtopic: "Notation & equality",
    kind: "mcq",
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
    prompt:
      "Find $x, y, z$ such that $\\begin{bmatrix}x + 2y & 4\\\\ 3 & x - y\\end{bmatrix} = \\begin{bmatrix}7 & z\\\\ 3 & 1\\end{bmatrix}$.",
    options: ["$(x,y,z) = (1, 3, 4)$", "$(x,y,z) = (3, 2, 4)$", "$(x,y,z) = (3, 2, 3)$", "$(x,y,z) = (2, 3, 4)$", "No values of $x, y, z$ work"],
    answer: 1,
    solution:
      "Equal matrices have equal entries: $x + 2y = 7$, $4 = z$, $3 = 3$, $x - y = 1$. Subtracting the last from the first: $3y = 6$, so $y = 2$ and $x = 3$; $z = 4$.\n(a) satisfies $x + 2y = 7$ but not $x - y = 1$: every entry must match.",
  },
  {
    subtopic: "Notation & equality",
    kind: "mcq",
    prompt: "Let $A = [a_{ij}]$ be the $4\\times4$ matrix with $a_{ij} = |i - j|$. Which statement is correct?",
    options: [
      "$A$ is skew-symmetric",
      "$A$ is upper triangular",
      "$\\operatorname{tr}A = 4$",
      "$A$ is symmetric and $\\operatorname{tr}A = 0$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$a_{ji} = |j - i| = |i - j| = a_{ij}$, so $A$ is symmetric. The diagonal entries are $|i - i| = 0$, so $\\operatorname{tr}A = 0$.\n$A = \\begin{bmatrix}0&1&2&3\\\\1&0&1&2\\\\2&1&0&1\\\\3&2&1&0\\end{bmatrix}$ has nonzero entries below the diagonal (not triangular), and it is not skew since $a_{21} = a_{12} = 1 \\ne -1$.",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    prompt: "$A$ is $3\\times5$, $B$ is $5\\times2$ and $C$ is $2\\times3$. Which of the following is **not** defined?",
    options: ["$ABC$", "$CAB$", "$BCA$", "$B^TA^T$", "$AC^T$"],
    answer: 4,
    solution:
      "Check inner sizes. $ABC$: $(3\\times5)(5\\times2)(2\\times3)$ → $3\\times3$ ✓. $CAB$: $(2\\times3)(3\\times5)(5\\times2)$ → $2\\times2$ ✓. $BCA$: $(5\\times2)(2\\times3)(3\\times5)$ → $5\\times5$ ✓. $B^TA^T$: $(2\\times5)(5\\times3)$ → $2\\times3$ ✓ (it equals $(AB)^T$).\n$AC^T$: $(3\\times5)(3\\times2)$, inner sizes $5 \\ne 3$, **not defined**.",
  },
  {
    subtopic: "Addition & scalar multiples",
    kind: "mcq",
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
      "Solve like a scalar equation: $3X = 2B - A$, so $X = \\tfrac13(2B - A)$.\n$2B - A = \\begin{bmatrix}4&2\\\\-2&6\\end{bmatrix} - \\begin{bmatrix}1&-2\\\\4&0\\end{bmatrix} = \\begin{bmatrix}3&4\\\\-6&6\\end{bmatrix}$, so $X = \\frac13\\begin{bmatrix}3&4\\\\-6&6\\end{bmatrix}$.\n(b) uses $2B + A$; (c) forgets the $\\tfrac13$; (d) has the sign reversed.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    prompt:
      "$A$ and $B$ are $3\\times3$ matrices with $\\operatorname{tr}A = 4$ and $\\operatorname{tr}B = -1$. Find $\\operatorname{tr}(3A^T - 2B + I_3)$.",
    options: ["$13$", "$14$", "$15$", "$16$", NOTA],
    answer: 4,
    solution:
      "Trace is linear and $\\operatorname{tr}(A^T) = \\operatorname{tr}A$:\n$\\operatorname{tr}(3A^T - 2B + I_3) = 3(4) - 2(-1) + \\operatorname{tr}(I_3) = 12 + 2 + 3 = 17$.\n$17$ is not listed, so the answer is **None of the above**. (Traps: $13$ from a sign slip on $-2(-1)$; $14$ from forgetting $I_3$; $15$ from taking $\\operatorname{tr}I_3 = 1$.)",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&-2&3\\\\4&0&-1\\end{bmatrix}$ and $B = \\begin{bmatrix}2&1&0&-1\\\\-3&2&5&1\\\\1&4&-2&0\\end{bmatrix}$. Find the $(2,3)$ entry of $AB$.",
    options: ["$-16$", "$0$", "$2$", "$-5$", NOTA],
    answer: 2,
    solution:
      "$(AB)_{23}$ = (row 2 of $A$)$\\cdot$(column 3 of $B$) $= (4, 0, -1)\\cdot(0, 5, -2) = 0 + 0 + 2 = 2$.\n(a) is $(AB)_{13}$ (wrong row); (b) uses column 2 of $B$; (d) is $a_{23}b_{23}$, an entrywise product, which is not matrix multiplication.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
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
      "$A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + x_3\\mathbf{a}_3 = 2\\mathbf{a}_1 - \\mathbf{a}_2 + 3\\mathbf{a}_3$: a combination of the **columns** of $A$ with the entries of $\\mathbf{x}$ as weights.\n(b) combines the rows; that is $(\\mathbf{x}^TA)^T = A^T\\mathbf{x}$, a different vector in general.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
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
      "Column 1 of $BA$ is $B$ times column 1 of $A$, i.e. $B(a_{11}, a_{21}, a_{31})^T = a_{11}\\mathbf{b}_1 + a_{21}\\mathbf{b}_2 + a_{31}\\mathbf{b}_3$.\nThe weights come from the first **column** of $A$ (not its first row, option (a)), and the vectors being combined are the columns of the **left** factor $B$ (options (c), (d) describe $AB$-type combinations).",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
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
      "Row method: row 2 of $AB$ = (row 2 of $A$)$\\,B = 1\\cdot\\operatorname{row}_1(B) + 0\\cdot\\operatorname{row}_2(B) - 1\\cdot\\operatorname{row}_3(B) = (2,5,-1) - (-3,1,2) = (5, 4, -3)$. Only row 2 of $A$ is needed.\n(a) is $B(1,0,-1)^T$ (column method applied by mistake); (b) adds instead of subtracting; (c) has the sign reversed.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
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
      "$(A^TA)_{23}$ = (row 2 of $A^T$)$\\cdot$(column 3 of $A$). Row 2 of $A^T$ is column 2 of $A$, so the entry is (column 2 of $A$)$\\cdot$(column 3 of $A$). So $A^TA$ is the table of dot products of the columns of $A$; (a) describes $AA^T$ instead.",
  },
  {
    subtopic: "Row & column methods",
    kind: "mcq",
    prompt:
      "$A$ is $m\\times n$ and $B$ is $n\\times p$. Which statements must be true?\nI. If columns 1 and 3 of $B$ are equal, then columns 1 and 3 of $AB$ are equal.\nII. If columns 1 and 3 of $A$ are equal, then columns 1 and 3 of $AB$ are equal.\nIII. If row 2 of $A$ is zero, then row 2 of $AB$ is zero.\nIV. If row 2 of $B$ is zero, then row 2 of $AB$ is zero.",
    options: ["I and III only", "II and IV only", "I and II only", "I, III and IV only", "All of the above"],
    answer: 0,
    solution:
      "Column $j$ of $AB$ is $A\\mathbf{b}_j$, which depends only on column $j$ of $B$: equal columns of $B$ give equal columns of $AB$ (I true). Row $i$ of $AB$ is (row $i$ of $A$)$B$, so a zero row of $A$ gives a zero row of $AB$ (III true).\nII and IV mix up the roles: columns of $AB$ are not columns of $A$, and rows of $AB$ are not rows of $B$. E.g. $A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$, $B = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ has row 2 of $B$ zero but $AB = \\begin{bmatrix}0&0\\\\1&1\\end{bmatrix}$. **I and III only**.",
  },
  {
    subtopic: "Algebra rules",
    kind: "mcq",
    prompt:
      "Which statements hold for **all** $n\\times n$ matrices $A, B, C$?\nI. $(A+B)^2 = A^2 + 2AB + B^2$\nII. $(AB)^T = B^TA^T$\nIII. $A(B + C) = AB + AC$\nIV. $(AB)^2 = A^2B^2$",
    options: ["II only", "I, II and III only", "II and IV only", "II and III only", "All of the above"],
    answer: 3,
    solution:
      "II (transpose reverses order) and III (distributive law) always hold.\nI: $(A+B)^2 = A^2 + AB + BA + B^2$, which equals $A^2 + 2AB + B^2$ only if $AB = BA$.\nIV: $(AB)^2 = ABAB$; turning it into $AABB$ needs $BA = AB$.\nSo **II and III only**.",
  },
  {
    subtopic: "Zero divisors & cancellation",
    kind: "mcq",
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
      "(b): each row of $A$ is $(1,1)$ and both columns of $B$ are $(1,-1)$, so every entry of $AB$ is $1 - 1 = 0$. $AB = 0$ with both factors nonzero: zero divisors.\n(a) is the trap: there $AB = \\begin{bmatrix}2&-2\\\\2&-2\\end{bmatrix}$ while $BA = 0$. (c) gives $AB = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$; (d) gives $AB = A \\ne 0$.",
  },
  {
    subtopic: "Zero divisors & cancellation",
    kind: "mcq",
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
      "$AC = A$ iff $A(C - I) = 0$, i.e. every column of $C - I$ solves $A\\mathbf{x} = \\mathbf{0}$. Here $A\\mathbf{x} = \\mathbf{0}$ means $x_1 + 2x_2 = 0$, so the columns must be multiples of $(2,-1)$.\n(c): $C - I = \\begin{bmatrix}2&0\\\\-1&0\\end{bmatrix}$ ✓. Directly: $AC = \\begin{bmatrix}1(3)+2(-1) & 2\\\\ 2(3)+4(-1) & 4\\end{bmatrix} = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix} = A$.\nThe others give $C - I$ with a column such as $(2,0)$, $(1,0)$ or $(0,2)$ that is not a multiple of $(2,-1)$. Cancellation fails because $A$ is not invertible.",
  },
  {
    subtopic: "Algebra rules",
    kind: "mcq",
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
      "Expand keeping order: $(A+B)(A-B) = A^2 - AB + BA - B^2$. This equals $A^2 - B^2$ iff $-AB + BA = 0$, i.e. iff $A$ and $B$ commute. ($AB = 0$ alone is not enough: $BA$ might be nonzero.)",
  },
  {
    subtopic: "Commuting matrices",
    kind: "mcq",
    prompt: "For which $x$ do $A = \\begin{bmatrix}1&2\\\\0&3\\end{bmatrix}$ and $B = \\begin{bmatrix}x&4\\\\0&5\\end{bmatrix}$ commute?",
    options: ["$x = 2$", "$x = -1$", "$x = 3$", "$x = 1$", "No value of $x$"],
    answer: 3,
    solution:
      "$AB = \\begin{bmatrix}x & 4 + 10\\\\ 0 & 15\\end{bmatrix} = \\begin{bmatrix}x&14\\\\0&15\\end{bmatrix}$ and $BA = \\begin{bmatrix}x & 2x + 12\\\\ 0 & 15\\end{bmatrix}$.\nThe $(1,1)$, $(2,1)$, $(2,2)$ entries always agree; the $(1,2)$ entries need $14 = 2x + 12$, so $x = 1$.",
  },
  {
    subtopic: "Commutator",
    kind: "mcq",
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
      "$AB = \\begin{bmatrix}1(0)+2(1) & 0\\\\ 0+1 & 0\\end{bmatrix} = \\begin{bmatrix}2&0\\\\1&0\\end{bmatrix}$, $BA = \\begin{bmatrix}0&0\\\\1&2\\end{bmatrix}$.\n$[A,B] = AB - BA = \\begin{bmatrix}2&0\\\\0&-2\\end{bmatrix}$. Check: its trace is $0$, as for every commutator. (a) is $BA - AB$; (c) is $AB + BA$.",
  },
  {
    subtopic: "Commutator",
    kind: "mcq",
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
      "Expand: $[A,B]C + B[A,C] = (AB - BA)C + B(AC - CA) = ABC - BAC + BAC - BCA = ABC - BCA = [A, BC]$ ✓.\nIn (a) the terms $-BAC$ and $+ACB$ do not cancel; (b) gives $CAB - CBA + BAC - BCA$. The rule is like a product rule: $B$ stays on the left, $C$ on the right.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
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
      "$A^2 = \\begin{bmatrix}1&6\\\\0&1\\end{bmatrix}$, and in general $A^n = \\begin{bmatrix}1&3n\\\\0&1\\end{bmatrix}$ (each multiplication adds another $3$). So $A^5 = \\begin{bmatrix}1&15\\\\0&1\\end{bmatrix}$, which is not listed: **None of the above**.\n(a) raises the entry to the 5th power (powers are not entrywise); (b) is $5A$; (c) is $A^4$.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix}4&-2\\\\3&-1\\end{bmatrix}$. Find $k$ such that $A^2 = kA - 2I$.",
    options: ["$k = 2$", "$k = 3$", "$k = -3$", "$k = 5$", "No such $k$ exists"],
    answer: 1,
    solution:
      "$A^2 = \\begin{bmatrix}16-6 & -8+2\\\\ 12-3 & -6+1\\end{bmatrix} = \\begin{bmatrix}10&-6\\\\9&-5\\end{bmatrix}$.\nCompare the $(1,2)$ entries of $A^2$ and $kA - 2I$ (no $I$ there): $-6 = -2k$, so $k = 3$. Check all entries: $3A - 2I = \\begin{bmatrix}10&-6\\\\9&-5\\end{bmatrix}$ ✓.\nShortcut: $A^2 = (\\operatorname{tr}A)A - (\\det A)I$ with $\\operatorname{tr}A = 3$, $\\det A = -4 + 6 = 2$.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt: "A square matrix $M$ satisfies $M^2 = M + I$. Writing $M^5 = aM + bI$, find $(a, b)$.",
    options: ["$(3, 2)$", "$(8, 5)$", "$(5, 3)$", "$(3, 5)$", NOTA],
    answer: 2,
    solution:
      "Multiply by $M$ and replace $M^2$ each time:\n$M^3 = M^2 + M = 2M + I$\n$M^4 = 2M^2 + M = 2(M + I) + M = 3M + 2I$\n$M^5 = 3M^2 + 2M = 3(M + I) + 2M = 5M + 3I$.\nSo $(a,b) = (5,3)$: Fibonacci numbers. $(3,2)$ is $M^4$ and $(8,5)$ is $M^6$.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
    prompt: "Let $p(x) = x^2 - 3x + 2$ and $A = \\begin{bmatrix}2&1\\\\0&1\\end{bmatrix}$. Find $p(A)$.",
    options: [
      "$\\begin{bmatrix}0&2\\\\2&0\\end{bmatrix}$",
      "$\\begin{bmatrix}-2&0\\\\0&-2\\end{bmatrix}$",
      "$\\begin{bmatrix}-4&0\\\\0&-4\\end{bmatrix}$",
      "$\\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$p(A) = A^2 - 3A + 2I$ (the constant becomes $2I$).\n$A^2 = \\begin{bmatrix}4&3\\\\0&1\\end{bmatrix}$, $-3A = \\begin{bmatrix}-6&-3\\\\0&-3\\end{bmatrix}$, so $A^2 - 3A = \\begin{bmatrix}-2&0\\\\0&-2\\end{bmatrix}$ and $p(A) = 0$.\n(a) adds $2$ to every entry instead of adding $2I$; (b) forgets the constant; (c) uses $-2I$.",
  },
  {
    subtopic: "Powers & polynomials",
    kind: "mcq",
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
      "Since $N^3 = 0$, $(I - N)(I + N + N^2) = I$, so $(I - N)^{-1} = I + N + N^2$.\n$N^2 = \\begin{bmatrix}0&0&2\\cdot4\\\\0&0&0\\\\0&0&0\\end{bmatrix} = \\begin{bmatrix}0&0&8\\\\0&0&0\\\\0&0&0\\end{bmatrix}$, so $I + N + N^2 = \\begin{bmatrix}1&2&11\\\\0&1&4\\\\0&0&1\\end{bmatrix}$.\n(a) forgets $N^2$; (b) is $I - N$ itself; (d) is $I - N + N^2 = (I + N)^{-1}$.",
  },
  {
    subtopic: "Transpose",
    kind: "mcq",
    prompt: "$A$, $B$, $C$ are $n\\times n$ matrices. Simplify $\\left((AB)^TC\\right)^T$.",
    options: ["$B^TA^TC$", "$C^TAB$", "$C^TB^TA^T$", "$ABC^T$", NOTA],
    answer: 1,
    solution:
      "Reverse the order and transpose each factor: $\\left((AB)^TC\\right)^T = C^T\\left((AB)^T\\right)^T = C^T(AB) = C^TAB$.\n(c) transposes $AB$ again; (d) keeps the original order.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix}1&-2&0\\\\3&1&2\\end{bmatrix}$. Find $\\operatorname{tr}(A^TA)$.",
    options: ["$2$", "$5$", "$25$", "$11$", NOTA],
    answer: 4,
    solution:
      "$\\operatorname{tr}(A^TA) = \\sum_{i,j}a_{ij}^2$, because the $j$-th diagonal entry of $A^TA$ is (column $j$)$\\cdot$(column $j$).\n$= 1 + 4 + 0 + 9 + 1 + 4 = 19$, which is not listed: **None of the above**.\n(a) squares only $a_{11}, a_{22}$; (b) is the sum of the entries; (c) squares that sum; (d) forgets to square the negative entry.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ skew-symmetric matrix and $B$ is a $3\\times3$ symmetric matrix. What must $\\operatorname{tr}(AB)$ be?",
    options: ["$0$", "$\\operatorname{tr}(B)$", "$-\\operatorname{tr}(B)$", "It depends on $A$ and $B$", NOTA],
    answer: 0,
    solution:
      "$\\operatorname{tr}(AB) = \\operatorname{tr}((AB)^T) = \\operatorname{tr}(B^TA^T) = \\operatorname{tr}(B(-A)) = -\\operatorname{tr}(BA) = -\\operatorname{tr}(AB)$.\nSo $2\\operatorname{tr}(AB) = 0$ and $\\operatorname{tr}(AB) = 0$ always.",
  },
  {
    subtopic: "Trace",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&2&-1\\\\0&3&4\\end{bmatrix}$ and $B = \\begin{bmatrix}2&1\\\\-1&0\\\\3&-2\\end{bmatrix}$. Find $\\operatorname{tr}(BA)$.",
    options: ["$-3$", "$-8$", "$11$", "$-11$", NOTA],
    answer: 3,
    solution:
      "$BA$ is $3\\times3$, but $\\operatorname{tr}(BA) = \\operatorname{tr}(AB)$ and $AB$ is only $2\\times2$:\n$(AB)_{11} = 1(2) + 2(-1) + (-1)(3) = -3$, $(AB)_{22} = 0(1) + 3(0) + 4(-2) = -8$.\nSo $\\operatorname{tr}(BA) = \\operatorname{tr}(AB) = -11$. (a) and (b) are single diagonal entries.",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
    prompt:
      "Let $A$ be any $n\\times n$ matrix. Which of the following are always symmetric?\nI. $A + A^T$\nII. $AA^T$\nIII. $A - A^T$\nIV. $A^2$",
    options: ["I only", "I and II only", "I, II and IV only", "I, II and III only", "All of the above"],
    answer: 1,
    solution:
      "I: $(A + A^T)^T = A^T + A$ ✓. II: $(AA^T)^T = (A^T)^TA^T = AA^T$ ✓.\nIII: $(A - A^T)^T = A^T - A = -(A - A^T)$, skew-symmetric (symmetric only if it is $0$).\nIV: $(A^2)^T = (A^T)^2$, which equals $A^2$ only for special $A$; e.g. $A = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ has $A^2 = A$, not symmetric. **I and II only**.",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
    prompt:
      "The matrix $\\begin{bmatrix}0 & x & 3\\\\ -2 & y & z\\\\ w & 4 & 0\\end{bmatrix}$ is skew-symmetric. Find $(x, y, z, w)$.",
    options: ["$(2, 0, -4, -3)$", "$(-2, 0, 4, 3)$", "$(2, 0, 4, 3)$", "$(2, 1, -4, -3)$", NOTA],
    answer: 0,
    solution:
      "Skew-symmetric: $a_{ji} = -a_{ij}$ and the diagonal is $0$.\n$x = a_{12} = -a_{21} = 2$; $y = a_{22} = 0$; $z = a_{23} = -a_{32} = -4$; $w = a_{31} = -a_{13} = -3$.\n(b) and (c) use the symmetric rule $a_{ij} = a_{ji}$ for some entries; (d) has a nonzero diagonal entry.",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
    prompt: "$A$ and $B$ are $3\\times3$ upper triangular matrices. Which statement is **false** in general?",
    options: [
      "$AB$ is upper triangular",
      "$A + B$ is upper triangular",
      "$AB = BA$",
      "$A^T$ is lower triangular",
      "The diagonal entries of $AB$ are $a_{11}b_{11}, a_{22}b_{22}, a_{33}b_{33}$",
    ],
    answer: 2,
    solution:
      "Products and sums of upper triangular matrices stay upper triangular, with $(AB)_{ii} = a_{ii}b_{ii}$; transposing turns upper into lower. But triangular matrices need not commute: $A = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$, $B = \\begin{bmatrix}1&0\\\\0&2\\end{bmatrix}$ (padded to $3\\times3$) give $AB = \\begin{bmatrix}1&2\\\\0&0\\end{bmatrix} \\ne BA = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$. So (c) is false.",
  },
  {
    subtopic: "Outer products",
    kind: "mcq",
    prompt: "Let $\\mathbf{u} = (1, -2, 3)$, $\\mathbf{v} = (2, 0, -1)$ and $P = \\mathbf{u}\\mathbf{v}^T$. Then $P^2$ equals",
    options: ["$P$", "$-P$", "$14P$", "$5P$", "the zero matrix"],
    answer: 1,
    solution:
      "$P^2 = \\mathbf{u}\\mathbf{v}^T\\mathbf{u}\\mathbf{v}^T = \\mathbf{u}(\\mathbf{v}^T\\mathbf{u})\\mathbf{v}^T = (\\mathbf{v}\\cdot\\mathbf{u})\\,P$, since $\\mathbf{v}^T\\mathbf{u}$ is a number.\n$\\mathbf{v}\\cdot\\mathbf{u} = 2 + 0 - 3 = -1$, so $P^2 = -P$. ($14 = \\mathbf{u}\\cdot\\mathbf{u}$ and $5 = \\mathbf{v}\\cdot\\mathbf{v}$ are the traps.)",
  },
  {
    subtopic: "Outer products",
    kind: "mcq",
    prompt:
      "$\\mathbf{u}\\in\\mathbb{R}^3$ and $\\mathbf{v}\\in\\mathbb{R}^4$ are nonzero and $A = \\mathbf{u}\\mathbf{v}^T$. Which statements are correct?\nI. $A$ is $3\\times4$.\nII. Every row of $A$ is a multiple of $\\mathbf{v}^T$.\nIII. Every column of $A$ is a multiple of $\\mathbf{u}$.\nIV. $A^T = \\mathbf{v}\\mathbf{u}^T$.",
    options: ["I and III only", "I, II and III only", "II and IV only", "I, III and IV only", "All of the above"],
    answer: 4,
    solution:
      "$(3\\times1)(1\\times4)$ is $3\\times4$ (I). Entry $(i,j)$ is $u_iv_j$: row $i$ is $u_i\\mathbf{v}^T$ (II) and column $j$ is $v_j\\mathbf{u}$ (III). $(\\mathbf{u}\\mathbf{v}^T)^T = (\\mathbf{v}^T)^T\\mathbf{u}^T = \\mathbf{v}\\mathbf{u}^T$ (IV). **All of the above**.",
  },
  {
    subtopic: "Special matrices",
    kind: "mcq",
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
      "A diagonal matrix on the **left** scales the **rows**: row 1 of $A$ times $2$, row 2 times $3$: $DA = \\begin{bmatrix}2&8\\\\-3&15\\end{bmatrix}$.\n(a) is $AD$ (columns scaled); (b) multiplies only the diagonals; (c) is $D + A$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
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
      "Invert both sides: $2A = \\begin{bmatrix}3&1\\\\5&2\\end{bmatrix}^{-1}$. The determinant is $3(2) - 1(5) = 1$, so the inverse is $\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$ (swap diagonal, negate off-diagonal).\nThus $A = \\frac12\\begin{bmatrix}2&-1\\\\-5&3\\end{bmatrix}$. (a) multiplies by 2 instead of dividing; (b) forgets to invert.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    prompt: "For which values of $k$ is $\\begin{bmatrix}k & 2\\\\ 3 & k+1\\end{bmatrix}$ **not** invertible?",
    options: ["$k = 2$ or $k = -3$", "$k = -2$ or $k = 3$", "$k = 6$ only", "$k = \\pm\\sqrt6$", NOTA],
    answer: 0,
    solution:
      "A $2\\times2$ matrix is singular iff $ad - bc = 0$: $k(k+1) - 6 = k^2 + k - 6 = (k+3)(k-2) = 0$. So $k = 2$ or $k = -3$.\n(b) has the signs of the roots swapped; (d) ignores the $k$ term.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
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
      "$XA = B$: multiply on the **right** by $A^{-1}$: $X = BA^{-1}$. $\\det A = 1$, $A^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}$.\n$X = \\begin{bmatrix}3&2\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix} = \\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$. Check: $XA = \\begin{bmatrix}3&2\\\\1&0\\end{bmatrix}$ ✓.\n(a) is $A^{-1}B$ (wrong side); (c) is $BA$; (d) is $AB$.",
  },
  {
    subtopic: "Inverse & matrix equations",
    kind: "mcq",
    prompt: "A square matrix $A$ satisfies $A^2 - 5A + 6I = 0$. Which of the following is $A^{-1}$?",
    options: [
      "$\\tfrac16(A - 5I)$",
      "$A - 5I$",
      "$\\tfrac15(6I - A)$",
      "$\\tfrac16(5I - A)$",
      "$A$ need not be invertible",
    ],
    answer: 3,
    solution:
      "Rearrange: $5A - A^2 = 6I$, i.e. $A(5I - A) = 6I$, so $A\\cdot\\tfrac16(5I - A) = I$ (and the factors commute). Hence $A$ is invertible with $A^{-1} = \\tfrac16(5I - A)$.\n(a) has the sign reversed. The nonzero constant term $6I$ is what guarantees invertibility.",
  },
];
