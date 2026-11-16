import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const determinantsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (16)
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "If $A$ is a $3\\times3$ matrix, then $|-A| = -|A|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$-A$ multiplies each of the 3 rows by $-1$, so $|-A| = (-1)^3|A| = -|A|$. **True** (for odd $n$).",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "For every $4\\times4$ matrix $A$, $|-A| = -|A|$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$|-A| = (-1)^4|A| = |A|$. The two sides agree only when $|A| = 0$; e.g. $A = I_4$ gives $|-I| = 1 \\ne -1$. A universal claim with a counterexample is **False**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $|A| = 2$ and $|B| = 3$. Then $|A + B| = 5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "There is no sum rule for determinants. $A = \\operatorname{diag}(2,1,1)$, $B = \\operatorname{diag}(3,1,1)$ give $|A+B| = 5\\cdot2\\cdot2 = 20$, while $A = \\operatorname{diag}(2,1,1)$, $B = \\operatorname{diag}(1,3,1)$ give $|A+B| = 3\\cdot4\\cdot2 = 24$. Knowing only $|A|$ and $|B|$, the value cannot be decided: **Not enough information**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "If $A$ is an $n\\times n$ matrix with $A^2 = A$ and $A \\ne I$, then $|A| = 0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $|A| \\ne 0$ then $A$ is invertible, and multiplying $A^2 = A$ by $A^{-1}$ gives $A = I$, contradicting $A \\ne I$. So $|A| = 0$. (Taking determinants also shows $|A|^2 = |A|$, i.e. $|A|\\in\\{0,1\\}$.) **True**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with $A^2 = I$. Then $|A| = 1$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$|A|^2 = |I| = 1$ only gives $|A| = \\pm1$. Both happen: $A = I$ has $|A| = 1$, while $A = \\operatorname{diag}(1, 1, -1)$ also satisfies $A^2 = I$ but has $|A| = -1$. **Not enough information**.",
  },
  {
    subtopic: "Special patterns",
    kind: "tfn",
    prompt: "If $|A| = 0$, then $A$ has a zero row or two rows that are scalar multiples of each other.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$|A| = 0$ means the rows are linearly **dependent**, which can involve three or more rows at once. In $\\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$, $R_1 + R_3 = 2R_2$ so $|A| = 0$, yet no row is zero and no two rows are proportional. **False**.",
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt: "Adding 3 times row 1 of $A$ to row 2 multiplies $|A|$ by 3.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A row **replacement** $R_2 \\to R_2 + 3R_1$ leaves the determinant unchanged (by linearity in row 2, the extra piece is a determinant with two proportional rows, which is 0). Only scaling a row by $k$ multiplies by $k$. **False**.",
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt:
      "$A$ is $4\\times4$. $B$ is obtained from $A$ by multiplying row 2 by 5 and then interchanging rows 1 and 3. Then $|B| = -5|A|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution: "Scaling one row by 5: $\\times5$. One interchange: $\\times(-1)$. So $|B| = (-1)(5)|A| = -5|A|$. **True**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "Every $5\\times5$ matrix $A$ with $A^T = -A$ is singular.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$|A| = |A^T| = |-A| = (-1)^5|A| = -|A|$, so $2|A| = 0$ and $|A| = 0$. A skew-symmetric matrix of **odd** order is always singular. **True**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ is a $4\\times4$ matrix with $A^T = -A$. Then $|A| = 0$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "For even order the argument gives $|A| = (-1)^4|A| = |A|$, which tells us nothing. The zero matrix is skew-symmetric with $|A| = 0$, but $A = \\begin{bmatrix}0&1&0&0\\\\-1&0&0&0\\\\0&0&0&1\\\\0&0&-1&0\\end{bmatrix}$ is skew-symmetric with $|A| = 1$. **Not enough information**.",
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "tfn",
    prompt:
      "A $3\\times3$ matrix $A$ is reduced to an echelon form $U$ using only row replacements and some row interchanges (how many is not stated). The diagonal entries of $U$ are $2, -1, 3$. Then $|A| = -6$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$|U| = (2)(-1)(3) = -6$, and $|A| = (-1)^r|U|$ where $r$ is the number of interchanges. With $r$ even $|A| = -6$; with $r$ odd $|A| = 6$. Since $r$ is unknown: **Not enough information**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "If $Q$ is a square matrix with $Q^TQ = I$, then $|Q| = 1$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$|Q^T||Q| = |Q|^2 = |I| = 1$, so $|Q| = \\pm1$. A reflection such as $Q = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ satisfies $Q^TQ = I$ with $|Q| = -1$. The universal claim fails: **False**.",
  },
  {
    subtopic: "Area & volume",
    kind: "tfn",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $\\det A = -2$ maps a region of area 5 in $\\mathbb{R}^2$ onto a region of area 10.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\text{area}(T(S)) = |\\det A|\\cdot\\text{area}(S) = 2\\cdot5 = 10$. The negative sign only means orientation is reversed. **True**.",
  },
  {
    subtopic: "Invertibility",
    kind: "tfn",
    prompt: "If $A$ and $B$ are $n\\times n$ matrices with $AB = 0$ (the zero matrix), then $|A| = 0$ or $|B| = 0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$|A||B| = |AB| = |0| = 0$, and a product of two numbers is zero only if one of them is zero. **True**. (It does **not** follow that $A = 0$ or $B = 0$.)",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "tfn",
    prompt: "Cramer's rule can be used to solve $A\\mathbf{x} = \\mathbf{b}$ for every square matrix $A$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Cramer's rule divides by $|A|$, so it requires $A$ to be invertible. For a singular $A$ the system has no solution or infinitely many and the formula is meaningless. **False**.",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "tfn",
    prompt: "If $A$ is a $3\\times3$ matrix with $|A| = 2$, then $|\\operatorname{adj}A| = 2$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "From $A\\operatorname{adj}A = |A|I$: $|A|\\,|\\operatorname{adj}A| = |A|^3$, so $|\\operatorname{adj}A| = |A|^{2} = 4$. In general $|\\operatorname{adj}A| = |A|^{n-1}$. **False**.",
  },

  // ---------------------------------------------------------------- MCQ: cofactor expansion
  {
    subtopic: "Cofactor expansion",
    kind: "mcq",
    prompt: "Evaluate $|A|$ for $A = \\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 0 & -2 \\\\ 1 & 4 & 5 \\end{bmatrix}$.",
    options: ["$-28$", "$28$", "$-7$", "$7$", NOTA],
    answer: 1,
    solution:
      "Column 2 has a single nonzero entry $a_{32} = 4$. Its sign is $(-1)^{3+2} = -1$ and $M_{32} = \\begin{vmatrix}2&1\\\\3&-2\\end{vmatrix} = -4-3 = -7$, so $C_{32} = 7$.\n$|A| = a_{32}C_{32} = 4\\cdot7 = 28$. Dropping the sign gives $-28$.",
  },
  {
    subtopic: "Minors & cofactors",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 2 & -1 & 3 \\\\ 0 & 4 & 1 \\\\ 5 & 2 & -2 \\end{bmatrix}$. What is the cofactor $C_{23}$?",
    options: ["$9$", "$-2$", "$-9$", "$2$", NOTA],
    answer: 2,
    solution:
      "Delete row 2 and column 3: $M_{23} = \\begin{vmatrix}2&-1\\\\5&2\\end{vmatrix} = 4 + 5 = 9$. Then $C_{23} = (-1)^{2+3}M_{23} = -9$.\n$9$ is the minor (sign forgotten); $-2$ is $C_{32}$ (indices swapped).",
  },
  {
    subtopic: "Minors & cofactors",
    kind: "mcq",
    prompt:
      "In the cofactor expansion of a $4\\times4$ determinant along **row 3**, which signs multiply $a_{31}M_{31}$, $a_{32}M_{32}$, $a_{33}M_{33}$, $a_{34}M_{34}$?",
    options: ["$-,\\ +,\\ -,\\ +$", "$+,\\ +,\\ +,\\ +$", "$-,\\ -,\\ +,\\ +$", "$+,\\ -,\\ +,\\ -$", NOTA],
    answer: 3,
    solution:
      "The sign of position $(i,j)$ is $(-1)^{i+j}$. Row 3: $(-1)^4 = +$, $(-1)^5 = -$, $(-1)^6 = +$, $(-1)^7 = -$. The checkerboard starts with $+$ at $(1,1)$, so odd rows start with $+$.",
  },
  {
    subtopic: "Cofactor expansion",
    kind: "mcq",
    prompt:
      "Evaluate $\\det A$ for $A = \\begin{bmatrix} 1 & 0 & 2 & 0 \\\\ 3 & 2 & 1 & 4 \\\\ 0 & 0 & 5 & 0 \\\\ 2 & 0 & 1 & 3 \\end{bmatrix}$.",
    options: ["$-30$", "$6$", "$15$", "$60$", NOTA],
    answer: 4,
    solution:
      "Row 3 has one nonzero entry, $a_{33} = 5$ with sign $(-1)^6 = +$: $\\det A = 5\\begin{vmatrix} 1 & 0 & 0 \\\\ 3 & 2 & 4 \\\\ 2 & 0 & 3 \\end{vmatrix}$.\nExpand that along column 2 (only $2$ at position $(2,2)$, sign $+$): $2\\begin{vmatrix}1&0\\\\2&3\\end{vmatrix} = 2\\cdot3 = 6$.\nSo $\\det A = 5\\cdot6 = 30$, which is not listed: **None of the above**.",
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Find $\\det A$ for $A = \\begin{bmatrix} 2 & 5 & 1 & 7 \\\\ 0 & 3 & 9 & 4 \\\\ 0 & 0 & -1 & 8 \\\\ 0 & 0 & 0 & \\tfrac12 \\end{bmatrix}$.",
    options: ["$-3$", "$3$", "$\\tfrac92$", "$-6$", NOTA],
    answer: 0,
    solution:
      "$A$ is upper triangular, so $\\det A$ is the product of the diagonal: $2\\cdot3\\cdot(-1)\\cdot\\tfrac12 = -3$. The entries above the diagonal play no role. ($\\tfrac92$ is the **sum** of the diagonal, the trace.)",
  },
  {
    subtopic: "Cofactor expansion",
    kind: "mcq",
    prompt: "Which expression equals $|A|$ for **every** $3\\times3$ matrix $A = [a_{ij}]$? ($M_{ij}$ = minor, $C_{ij}$ = cofactor.)",
    options: [
      "$a_{12}M_{12} + a_{22}M_{22} + a_{32}M_{32}$",
      "$a_{12}M_{12} - a_{22}M_{22} + a_{32}M_{32}$",
      "$-a_{12}M_{12} + a_{22}M_{22} - a_{32}M_{32}$",
      "$a_{21}C_{12} + a_{22}C_{22} + a_{23}C_{32}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Expanding along column 2: $|A| = a_{12}C_{12} + a_{22}C_{22} + a_{32}C_{32}$ with signs $(-1)^{1+2} = -$, $(-1)^{2+2} = +$, $(-1)^{3+2} = -$. That is $-a_{12}M_{12} + a_{22}M_{22} - a_{32}M_{32}$. The last option mixes entries of row 2 with cofactors of column 2, which is not an expansion at all.",
  },

  // ---------------------------------------------------------------- MCQ: row and column operations
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A$ is $3\\times3$ with $|A| = 4$. $B$ is obtained from $A$ by $R_1 \\leftrightarrow R_2$, then $R_3 \\to R_3 - 2R_1$, then $R_2 \\to 3R_2$. Find $|B|$.",
    options: ["$12$", "$-4$", "$-108$", "$-12$", NOTA],
    answer: 3,
    solution:
      "Interchange: $\\times(-1)$. Replacement: $\\times1$. Scaling one row by 3: $\\times3$. So $|B| = (-1)(1)(3)(4) = -12$.\n$-108 = -27\\cdot4$ comes from treating the scaling as $3^3$ (that would be scaling the whole matrix).",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "Given $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 5$, find $\\begin{vmatrix} d & e & f \\\\ 2a & 2b & 2c \\\\ g - 3d & h - 3e & i - 3f \\end{vmatrix}$.",
    options: ["$10$", "$-10$", "$-30$", "$30$", NOTA],
    answer: 1,
    solution:
      "Build it from the original in steps: swap $R_1 \\leftrightarrow R_2$ ($\\times(-1)$), scale the new row 2 by 2 ($\\times2$), then $R_3 \\to R_3 - 3R_1$ where $R_1 = (d, e, f)$ (replacement, $\\times1$).\nSo the value is $(-1)(2)(5) = -10$. The $-3$ in the replacement does not enter the answer ($\\pm30$ are the traps).",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "Given $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 5$, find $\\begin{vmatrix} a + 2g & b + 2h & c + 2i \\\\ 3d & 3e & 3f \\\\ g & h & i \\end{vmatrix}$.",
    options: ["$15$", "$5$", "$45$", "$-15$", NOTA],
    answer: 0,
    solution:
      "Row 1 is $R_1 + 2R_3$ (replacement, no change) and row 2 is $3R_2$ (factor 3). So the determinant is $3\\cdot5 = 15$.",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "Given $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 7$, find $\\begin{vmatrix} a & g & d \\\\ b & h & e \\\\ c & i & f \\end{vmatrix}$.",
    options: ["$7$", "$49$", "$-7$", "$0$", NOTA],
    answer: 2,
    solution:
      "The columns of the new matrix are $(a,b,c)$, $(g,h,i)$, $(d,e,f)$, so it is the **transpose** of $\\begin{bmatrix} a&b&c\\\\g&h&i\\\\d&e&f\\end{bmatrix}$. Transposing changes nothing, and that matrix is the original with rows 2 and 3 swapped. Answer: $-7$.",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A = [\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3]$ is $3\\times3$ with $|A| = 3$. Find $\\left|[\\,\\mathbf{a}_1 + \\mathbf{a}_2\\ \\ \\ \\mathbf{a}_2 + \\mathbf{a}_3\\ \\ \\ \\mathbf{a}_3 + \\mathbf{a}_1\\,]\\right|$.",
    options: ["$3$", "$0$", "$9$", "$6$", NOTA],
    answer: 3,
    solution:
      "Write $B = AM$ with $M = \\begin{bmatrix}1&0&1\\\\1&1&0\\\\0&1&1\\end{bmatrix}$ (column $j$ of $M$ = coefficients of column $j$ of $B$).\n$|M| = 1(1-0) - 0 + 1(1-0) = 2$, so $|B| = |A||M| = 6$.\nIt is tempting to say \"only replacements, so 3\", but the third column $\\mathbf{a}_3 + \\mathbf{a}_1$ refers to the **original** $\\mathbf{a}_1$ after it has been replaced; that is not a sequence of replacements.",
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt: "Use row reduction to find $|A|$ for $A = \\begin{bmatrix} 2 & 1 & 3 \\\\ 4 & 5 & 7 \\\\ -2 & 5 & 1 \\end{bmatrix}$.",
    options: ["$12$", "$-12$", "$10$", "$24$", NOTA],
    answer: 0,
    solution:
      "$R_2 \\to R_2 - 2R_1$: $(0, 3, 1)$. $R_3 \\to R_3 + R_1$: $(0, 6, 4)$. $R_3 \\to R_3 - 2R_2$: $(0, 0, 2)$.\nOnly replacements were used, so $|A| = 2\\cdot3\\cdot2 = 12$.",
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Reducing $A$ ($3\\times3$) to an echelon form $U$ used exactly these operations: one row interchange, $R_3 \\to R_3 - 4R_1$, and $R_2 \\to \\tfrac12R_2$. The diagonal of $U$ is $3, -2, 5$. Find $|A|$.",
    options: ["$-30$", "$30$", "$60$", "$-60$", NOTA],
    answer: 2,
    solution:
      "$|U| = 3\\cdot(-2)\\cdot5 = -30$, and $|U| = (-1)(1)\\left(\\tfrac12\\right)|A| = -\\tfrac12|A|$.\nSo $|A| = -30 / (-\\tfrac12) = 60$. Forgetting to undo the scaling gives $30$; forgetting the interchange gives $-60$.",
  },

  // ---------------------------------------------------------------- MCQ: patterns
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "$A$ is a $6\\times6$ matrix. Which condition does **not** force $|A| = 0$?",
    options: [
      "Columns 2 and 5 of $A$ are equal",
      "Row 2 + Row 4 = Row 6",
      "Column 3 of $A$ is zero",
      "Every diagonal entry of $A$ is zero",
      NOTA,
    ],
    answer: 3,
    solution:
      "Equal columns, a zero column, or any linear dependence among rows ($R_6 - R_2 - R_4 = \\mathbf{0}$) all give $|A| = 0$. A zero diagonal says nothing: e.g. the permutation matrix with ones just above the diagonal and a one in the bottom-left corner has zero diagonal and determinant $\\pm1$ (for $2\\times2$: $\\begin{vmatrix}0&1\\\\1&0\\end{vmatrix} = -1$).",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "$A = [a_{ij}]$ is $3\\times3$ with $|A| = 2$, and $B = [b_{ij}]$ with $b_{ij} = 3^{i+j}a_{ij}$. Find $|B|$.",
    options: ["$3^{6}\\cdot 2$", "$3^{12}\\cdot 2$", "$3^{9}\\cdot 2$", "$3^{3}\\cdot 2$", NOTA],
    answer: 1,
    solution:
      "$b_{ij} = 3^i\\,a_{ij}\\,3^j$, so $B = DAD$ with $D = \\operatorname{diag}(3, 9, 27)$, $|D| = 3^{1+2+3} = 3^6$.\n$|B| = |D|^2|A| = 3^{12}\\cdot 2$. The answer $3^6\\cdot2$ counts only the row factors.",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "Evaluate $\\begin{vmatrix} 1+a & b & c \\\\ a & 1+b & c \\\\ a & b & 1+c \\end{vmatrix}$.",
    options: ["$1 + a + b + c$", "$(1+a)(1+b)(1+c)$", "$1 + abc$", "$a + b + c$", NOTA],
    answer: 0,
    solution:
      "Each row sums to $1 + a + b + c$. Add columns 2 and 3 to column 1 and factor it out: $(1+a+b+c)\\begin{vmatrix}1&b&c\\\\1&1+b&c\\\\1&b&1+c\\end{vmatrix}$.\nSubtract row 1 from rows 2 and 3: $\\begin{vmatrix}1&b&c\\\\0&1&0\\\\0&0&1\\end{vmatrix} = 1$. Answer: $1 + a + b + c$.",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "Evaluate $\\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 5 \\\\ 4 & 9 & 25 \\end{vmatrix}$.",
    options: ["$-6$", "$6$", "$30$", "$3$", NOTA],
    answer: 1,
    solution:
      "Vandermonde with nodes $2, 3, 5$: $(3-2)(5-2)(5-3) = 1\\cdot3\\cdot2 = 6$. (Order matters: later node minus earlier node in each factor.)",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "Evaluate $\\det A$ for $A = \\begin{bmatrix} 0 & 0 & 2 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 1 \\\\ 3 & 0 & 0 & 0 & 0 \\\\ 0 & -1 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 4 & 0 \\end{bmatrix}$.",
    options: ["$-24$", "$10$", "$0$", "$-6$", NOTA],
    answer: 4,
    solution:
      "Each row and column has one nonzero entry, so $\\det A = \\pm(2)(1)(3)(-1)(4) = \\pm(-24)$.\nSign: the entries sit in columns $3, 5, 1, 2, 4$ of rows $1..5$. Rows $1 \\to 3 \\to 1$ form a 2-cycle (one swap) and $2 \\to 5 \\to 4 \\to 2$ a 3-cycle (two swaps): three swaps in total, sign $-1$.\n$\\det A = (-1)(-24) = 24$, not listed: **None of the above**. (Alternatively, expand along a row with one entry five times, tracking $(-1)^{i+j}$.)",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "For which values of $x$ is $\\begin{bmatrix} x & 2 & 2 \\\\ 2 & x & 2 \\\\ 2 & 2 & x \\end{bmatrix}$ singular?",
    options: ["$x = 2$ only", "$x = -2$ or $x = 4$", "$x = 2$ or $x = -4$", "$x = 0$ or $x = 6$", NOTA],
    answer: 2,
    solution:
      "Every row sums to $x + 4$; add columns 2, 3 to column 1 and factor: $(x+4)\\begin{vmatrix}1&2&2\\\\1&x&2\\\\1&2&x\\end{vmatrix}$. Subtract row 1 from rows 2, 3: $\\begin{vmatrix}1&2&2\\\\0&x-2&0\\\\0&0&x-2\\end{vmatrix} = (x-2)^2$.\n$\\det = (x+4)(x-2)^2 = 0$ iff $x = 2$ or $x = -4$. ($x = 2$ makes all rows equal; $x = -4$ makes every row sum to zero.)",
  },

  // ---------------------------------------------------------------- MCQ: algebra
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is $3\\times3$ with $|A| = 4$. Find $\\left|\\tfrac12A\\right|$.",
    options: ["$2$", "$\\tfrac18$", "$4$", "$\\tfrac12$", NOTA],
    answer: 3,
    solution: "$\\left|\\tfrac12A\\right| = \\left(\\tfrac12\\right)^3|A| = \\tfrac18\\cdot4 = \\tfrac12$. The trap $\\tfrac12|A| = 2$ forgets that the scalar multiplies all three rows.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ and $B$ are $4\\times4$ with $|A| = 2$ and $|B| = -3$. Find $|A^TB^{-1}(2A)|$.",
    options: ["$-\\tfrac{32}{3}$", "$-\\tfrac{64}{3}$", "$\\tfrac{64}{3}$", "$-\\tfrac{8}{3}$", NOTA],
    answer: 1,
    solution:
      "$|A^T| = 2$, $|B^{-1}| = -\\tfrac13$, $|2A| = 2^4\\cdot2 = 32$. Product: $2\\cdot\\left(-\\tfrac13\\right)\\cdot32 = -\\tfrac{64}{3}$.\n$-\\tfrac{8}{3}$ uses $|2A| = 2|A|$; $-\\tfrac{32}{3}$ uses $2^3$ as if $A$ were $3\\times3$.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$Q$ is an $n\\times n$ matrix with $Q^TQ = I$. What are the possible values of $|Q|$?",
    options: ["$1$ only", "$0$ or $1$", "$-1$ or $1$", "any nonzero real number", NOTA],
    answer: 2,
    solution:
      "$|Q^TQ| = |Q^T||Q| = |Q|^2 = 1$, so $|Q| = \\pm1$. Both occur: rotations have $+1$, reflections $-1$.",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt: "$A$ is $3\\times3$ with $|A| = 5$. Find $|\\operatorname{adj}A|$.",
    options: ["$5$", "$125$", "$\\tfrac15$", "$25$", NOTA],
    answer: 3,
    solution:
      "$A\\operatorname{adj}A = |A|I$, so $|A|\\,|\\operatorname{adj}A| = |A|^3$ and $|\\operatorname{adj}A| = |A|^2 = 25$. In general $|\\operatorname{adj}A| = |A|^{n-1}$.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix with $A^3 = 8I$. Find $|A|$.",
    options: ["$8$", "$2$", "$\\pm 8$", "$512$", NOTA],
    answer: 0,
    solution:
      "$|A|^3 = |8I| = 8^3 = 512$. A real number has exactly one real cube root, so $|A| = 8$. Contrast $A^2 = 4I$, where $|A|^2 = 64$ allows $\\pm8$.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "Let $A, B$ be $n\\times n$ matrices with $n \\ge 2$. Which statement is **false** in general?",
    options: ["$|AB| = |BA|$", "$|A^T| = |A|$", "$|A + B| = |A| + |B|$", "$|A^2| \\ge 0$", NOTA],
    answer: 2,
    solution:
      "$|AB| = |A||B| = |BA|$ even though $AB \\ne BA$; $|A^T| = |A|$; $|A^2| = |A|^2 \\ge 0$. There is no sum rule: $A = B = I_2$ gives $|A+B| = 4 \\ne 2$.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is $3\\times3$ with $|A| = -2$. Find $\\left|(2A)^T(A^{-1})^2\\right|$.",
    options: ["$4$", "$-16$", "$-1$", "$16$", NOTA],
    answer: 4,
    solution:
      "$|(2A)^T| = |2A| = 2^3(-2) = -16$ and $|(A^{-1})^2| = (1/|A|)^2 = \\tfrac14$. Product: $-16\\cdot\\tfrac14 = -4$, which is not listed: **None of the above**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix with $A^T = -A$. Which statement **must** be true?",
    options: ["$A = 0$", "$|A| = 0$", "$|A + I| = 0$", "$A$ is invertible", NOTA],
    answer: 1,
    solution:
      "$|A| = |A^T| = |-A| = (-1)^3|A|$, so $|A| = 0$ and $A$ is **not** invertible. $A$ need not be zero, e.g. $\\begin{bmatrix}0&1&0\\\\-1&0&0\\\\0&0&0\\end{bmatrix}$; for that matrix $|A + I| = 2 \\ne 0$.",
  },

  // ---------------------------------------------------------------- MCQ: invertibility
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "For which values of $k$ is $A = \\begin{bmatrix} 1 & 2 & k \\\\ 0 & k & 3 \\\\ 1 & 0 & 1 \\end{bmatrix}$ singular?",
    options: ["$k = -3$ or $k = 2$", "$k = 3$ or $k = -2$", "$k = 3$ only", "$k = 0$ or $k = 1$", NOTA],
    answer: 1,
    solution:
      "Expand along row 1: $|A| = 1(k - 0) - 2(0 - 3) + k(0 - k) = k + 6 - k^2$.\n$|A| = 0 \\iff k^2 - k - 6 = 0 \\iff (k-3)(k+2) = 0$, so $k = 3$ or $k = -2$.",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "For which values of $k$ is $\\begin{bmatrix} k & 2 \\\\ 8 & k \\end{bmatrix}$ invertible?",
    options: ["$k \\ne 4$", "$k \\ne 16$", "$k \\ne \\pm 4$", "$k \\ne \\pm 2$", NOTA],
    answer: 2,
    solution: "$\\det = k^2 - 16$, which is nonzero iff $k \\ne 4$ and $k \\ne -4$.",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "$A$ is a $5\\times5$ matrix with $|A| = 0$. Which statement is **not** necessarily true?",
    options: [
      "$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution",
      "$\\operatorname{rank}A < 5$",
      "The columns of $A$ are linearly dependent",
      "$A\\mathbf{x} = \\mathbf{b}$ is inconsistent for some $\\mathbf{b}\\in\\mathbb{R}^5$",
      "$A$ has a row of zeros",
    ],
    answer: 4,
    solution:
      "$|A| = 0 \\iff A$ is singular, and the Invertible Matrix Theorem gives the first four: fewer than 5 pivots, dependent columns, nontrivial null space, and columns that do not span $\\mathbb{R}^5$ (so some $\\mathbf{b}$ is unreachable). A zero row is just one possible cause of $|A| = 0$, not a consequence.",
  },

  // ---------------------------------------------------------------- MCQ: Cramer / adjugate
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt:
      "Use Cramer's rule to find $x_2$ for the system $2x_1 + x_2 - x_3 = -1$, $\\ x_1 + 3x_2 + 2x_3 = 2$, $\\ x_1 + 2x_3 = 5$.",
    options: ["$1$", "$-15$", "$\\tfrac{17}{15}$", "$-1$", NOTA],
    answer: 3,
    solution:
      "$|A| = \\begin{vmatrix}2&1&-1\\\\1&3&2\\\\1&0&2\\end{vmatrix} = 2(6-0) - 1(2-2) + (-1)(0-3) = 15$.\nReplace **column 2** by $\\mathbf{b} = (-1, 2, 5)$: $|A_2| = \\begin{vmatrix}2&-1&-1\\\\1&2&2\\\\1&5&2\\end{vmatrix} = 2(4-10) + 1(2-2) - 1(5-2) = -15$.\n$x_2 = -15/15 = -1$. (Check: $\\mathbf{x} = (1,-1,2)$ satisfies all three equations.) $\\tfrac{17}{15}$ comes from replacing row 2 instead of column 2.",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 2 & 0 & 1 \\end{bmatrix}$. Find the $(3,1)$ entry of $A^{-1}$.",
    options: ["$-\\tfrac{2}{13}$", "$\\tfrac{6}{13}$", "$\\tfrac{2}{13}$", "$-2$", NOTA],
    answer: 0,
    solution:
      "$|A| = 1(1-0) - 2(0-6) + 0 = 13$.\n$(A^{-1})_{31} = C_{13}/|A|$ (indices swap because $\\operatorname{adj}A$ is the transposed cofactor matrix). $C_{13} = (+1)\\begin{vmatrix}0&1\\\\2&0\\end{vmatrix} = -2$, so the entry is $-\\tfrac{2}{13}$.\n$\\tfrac{6}{13} = C_{31}/|A|$ is the transpose trap.",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt: "For an invertible $n\\times n$ matrix $A$ with cofactors $C_{ij}$ and minors $M_{ij}$, the $(i,j)$ entry of $A^{-1}$ is",
    options: ["$C_{ij}/|A|$", "$M_{ji}/|A|$", "$|A|\\,C_{ji}$", "$C_{ji}/|A|$", NOTA],
    answer: 3,
    solution:
      "$A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj}A$ and $\\operatorname{adj}A = [C_{ij}]^T$, so $(A^{-1})_{ij} = C_{ji}/|A|$. Minors lack the sign $(-1)^{i+j}$.",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt: "$A$ is $3\\times3$ with $|A| = 3$. What is $A\\operatorname{adj}A$?",
    options: ["$I$", "$9I$", "$3I$", "$\\tfrac13I$", NOTA],
    answer: 2,
    solution:
      "Row $i$ of $A$ times column $j$ of $\\operatorname{adj}A$ is $\\sum_k a_{ik}C_{jk}$: for $i = j$ that is the cofactor expansion of $|A|$, and for $i \\ne j$ it is the expansion of a matrix with two equal rows, which is 0. Hence $A\\operatorname{adj}A = |A|I = 3I$.",
  },

  // ---------------------------------------------------------------- MCQ: area and volume
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "Find the volume of the parallelepiped with one vertex at the origin and adjacent vertices $(2,-1,0)$, $(1,3,2)$ and $(0,1,-2)$.",
    options: ["$-18$", "$18$", "$3$", "$9$", NOTA],
    answer: 1,
    solution:
      "Volume $= \\left|\\det\\begin{bmatrix}2&-1&0\\\\1&3&2\\\\0&1&-2\\end{bmatrix}\\right|$ (rows or columns, same value).\n$\\det = 2(-6-2) - (-1)(-2-0) + 0 = -16 - 2 = -18$, so the volume is $|-18| = 18$. A volume is never negative; $3 = 18/6$ would be the tetrahedron.",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt: "Find the area of the triangle with vertices $(1,2)$, $(4,3)$ and $(2,6)$.",
    options: ["$11$", "$\\tfrac{11}{2}$", "$9$", "$\\tfrac{11}{6}$", NOTA],
    answer: 1,
    solution:
      "Edge vectors from $(1,2)$: $\\mathbf{u} = (3,1)$, $\\mathbf{v} = (1,4)$. $\\det[\\mathbf{u}\\ \\mathbf{v}] = 12 - 1 = 11$ is the parallelogram, so the triangle has area $\\tfrac{11}{2}$.\n$9$ comes from using the position vectors $(4,3)$, $(2,6)$ instead of edge vectors.",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix} 3 & 1 \\\\ -2 & 4 \\end{bmatrix}$. What is the area of the image of the unit disk $x_1^2 + x_2^2 \\le 1$?",
    options: ["$14\\pi$", "$14$", "$7\\pi$", "$\\pi$", NOTA],
    answer: 0,
    solution:
      "$\\det A = 12 + 2 = 14$. Every area is multiplied by $|\\det A|$, and the disk has area $\\pi$, so the image (an ellipse) has area $14\\pi$.",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ on $\\mathbb{R}^2$ with $\\det A = -3$, and $S$ is a region of area 2. Find the area of $T(T(S))$.",
    options: ["$-18$", "$6$", "$12$", "$18$", NOTA],
    answer: 3,
    solution:
      "Each application multiplies area by $|\\det A| = 3$: $2 \\to 6 \\to 18$. Equivalently $|\\det(A^2)| = |\\det A|^2 = 9$ and $9\\cdot2 = 18$. Areas are never negative.",
  },
];
