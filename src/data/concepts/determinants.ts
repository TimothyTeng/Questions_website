import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

const RULES16 = "Slides 3.1 Rules 1–6 (det p3–5)";
const PIVOTS = "Slides 3.1 Rules 5, 7, 8 (det p5–8); Tutorial 3 Q2";
const RULE8 = "Slides 3.1 Rule 8 (det p8); Slides 2.2 Theorem 2.4 (alg p10)";
const RULES910 = "Slides 3.1 Rules 9–10 (det p9–10)";
const T3Q1 = "Tutorial 3 Q1 (tut5 p5–6); Slides 3.1 Rules 3, 9 (det p4, p9)";
const T3Q3 = "Tutorial 3 Q3 (tut5 p10–12); Slides 3.1 Rule 10 (det p10)";
const F3 = "Tutor slides, 3×3 formula (tut5 p3, p12)";
const COLS = "Slides 3.1 \"all the above properties apply to columns also\" (det p10)";
const THM31 = "Slides 3.2 Theorem 3.1 (det p11–16); Tutorial 3 Q4";
const THM32 = "Slides 3.3 Theorem 3.2 (det p17–20)";

export const determinantsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "If $A$ is a $3\\times3$ matrix, then $|-A| = -|A|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$-A$ multiplies each of the 3 rows by $-1$, and by Rule 3 each row gives a factor $-1$: $|-A| = (-1)^3|A| = -|A|$. **True** (Tutorial 3 Q1).",
    ref: T3Q1,
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "For every $4\\times4$ matrix $A$, $|-A| = -|A|$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$|-A| = (-1)^4|A| = |A|$. The two sides agree only when $|A| = 0$; e.g. $A = I_4$ gives $|-I| = 1 \\ne -1$. A universal claim with a counterexample is **False**.",
    ref: T3Q1,
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $|A| = 2$ and $|B| = 3$. Then $|A + B| = 5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "There is no sum rule for determinants (Rule 3 only splits one row while the other rows stay the same). With diagonal matrices (Rule 7): $A = \\begin{bmatrix}2&0&0\\\\0&1&0\\\\0&0&1\\end{bmatrix}$, $B = \\begin{bmatrix}3&0&0\\\\0&1&0\\\\0&0&1\\end{bmatrix}$ give $|A+B| = 5\\cdot2\\cdot2 = 20$, while $A$ as before and $B = \\begin{bmatrix}1&0&0\\\\0&3&0\\\\0&0&1\\end{bmatrix}$ give $|A+B| = 3\\cdot4\\cdot2 = 24$. Knowing only $|A|$ and $|B|$, the value cannot be decided: **Not enough information**.",
    ref: "Slides 3.1 Rules 3, 7 (det p4, p6)",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "If $A$ is an $n\\times n$ matrix with $A^2 = A$ and $A \\ne I$, then $|A| = 0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $|A| \\ne 0$ then $A$ is invertible (Rule 8), and multiplying $A^2 = A$ by $A^{-1}$ gives $A = I$, contradicting $A \\ne I$. So $|A| = 0$. **True**.",
    ref: "Slides 3.1 Rule 8 (det p8); Slides 0B inverse of a matrix",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with $A^2 = I$. Then $|A| = 1$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Rule 9: $|A|^2 = |I| = 1$ only gives $|A| = \\pm1$. Both happen: $A = I$ has $|A| = 1$, while $A = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&0&-1\\end{bmatrix}$ also satisfies $A^2 = I$ but has $|A| = -1$. **Not enough information**.",
    ref: RULES910,
  },
  {
    subtopic: "Special patterns",
    kind: "tfn",
    prompt: "If $|A| = 0$, then $A$ has a zero row or two rows that are scalar multiples of each other.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A dependence can involve three or more rows at once. In $\\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$, $R_1 + R_3 = 2R_2$, so $R_3 \\to R_3 + R_1 - 2R_2$ (Rule 5) gives a zero row and $|A| = 0$ (Rule 6), yet no row is zero and no two rows are proportional. **False**.",
    ref: "Slides 3.1 Rules 5–6 (det p5)",
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt: "Adding 3 times row 1 of $A$ to row 2 multiplies $|A|$ by 3.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Rule 5: adding (or subtracting) a multiple of one row to another leaves the determinant unchanged. Only scaling a row by $t$ multiplies by $t$ (Rule 3). **False**.",
    ref: RULES16,
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt:
      "$A$ is $4\\times4$. $B$ is obtained from $A$ by multiplying row 2 by 5 and then interchanging rows 1 and 3. Then $|B| = -5|A|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution: "Scaling one row by 5: $\\times5$ (Rule 3). One exchange: $\\times(-1)$ (Rule 2). So $|B| = (-1)(5)|A| = -5|A|$. **True**.",
    ref: RULES16,
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "Every $5\\times5$ matrix $A$ with $A = -A^T$ is singular.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "As in Tutorial 3 Q3: $|A| = |-A^T| = (-1)^5|A^T| = -|A^T| = -|A|$, so $2|A| = 0$ and $|A| = 0$. By Rule 8, $A$ is singular. **True**.",
    ref: T3Q3,
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ is a $4\\times4$ matrix with $A = -A^T$. Then $|A| = 0$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The Tutorial 3 Q3 argument now gives $|A| = (-1)^4|A^T| = |A|$, which tells us nothing. The zero matrix satisfies $A = -A^T$ with $|A| = 0$. But $A = \\begin{bmatrix}0&1&0&0\\\\-1&0&0&0\\\\0&0&0&1\\\\0&0&-1&0\\end{bmatrix}$ also satisfies $A = -A^T$: exchanging rows 1, 2 and rows 3, 4 (two exchanges, sign $+$) gives the diagonal matrix with diagonal $-1, 1, -1, 1$, so $|A| = 1$. **Not enough information**.",
    ref: T3Q3,
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "tfn",
    prompt:
      "A $3\\times3$ matrix $A$ is reduced to an upper triangular $U$ using only row replacements and some row exchanges (how many is not stated). The diagonal entries of $U$ are $2, -1, 3$. Then $|A| = -6$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$|U| = (2)(-1)(3) = -6$, and $|A| = \\pm|U|$: $+$ for an even number of exchanges, $-$ for an odd number. Since that number is unknown: **Not enough information**.",
    ref: PIVOTS,
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "If $Q$ is a square matrix with $Q^TQ = I$, then $|Q| = 1$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$|Q^T||Q| = |Q|^2 = |I| = 1$, so $|Q| = \\pm1$. $Q = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ satisfies $Q^TQ = I$ with $|Q| = -1$. The universal claim fails: **False**.",
    ref: `${RULES910}; older PYP: |Q| when QᵀQ = I`,
  },
  {
    subtopic: "Area & volume",
    kind: "tfn",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $|A| = -2$ maps a parallelogram of area 5 in $\\mathbb{R}^2$ onto a parallelogram of area 10.",
    options: TFN_OPTIONS,
    answer: 0,
    solution: "Theorem 3.2: area of $T(S) = \\text{abs}(|A|)\\times$ area of $S = 2\\cdot5 = 10$. **True**.",
    ref: THM32,
  },
  {
    subtopic: "Invertibility",
    kind: "tfn",
    prompt: "If $A$ and $B$ are $n\\times n$ matrices with $AB = 0$ (the zero matrix), then $|A| = 0$ or $|B| = 0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$|A||B| = |AB| = |0| = 0$ (Rule 9; the zero matrix has a zero row), and a product of two numbers is zero only if one of them is zero. **True**. (It does **not** follow that $A = 0$ or $B = 0$.)",
    ref: "Slides 3.1 Rules 6, 9 (det p5, p9)",
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt: "$A$ is $3\\times3$. $B$ is obtained by multiplying column 1 of $A$ by 4 and column 2 of $A$ by $\\tfrac34$. Then $|B| = 3|A|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "All the properties apply to columns too. Scaling one column by 4 multiplies $|A|$ by 4 and scaling another by $\\tfrac34$ multiplies by $\\tfrac34$ (Rule 3): $|B| = 4\\cdot\\tfrac34|A| = 3|A|$. **True**.",
    ref: `${COLS}; older PYP T/F`,
  },
  {
    subtopic: "Invertibility",
    kind: "tfn",
    prompt: "If $A$ is a square matrix and $A^2$ is invertible, then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution: "$A^2$ invertible means $|A^2| = |A|^2 \\ne 0$ (Rules 8, 9), so $|A| \\ne 0$ and $A$ is invertible. **True**.",
    ref: "Slides 3.1 Rules 8–9 (det p8–9); older PYP T/F",
  },

  // ---------------------------------------------------------------- MCQ: computing determinants
  {
    subtopic: "3×3 formula",
    kind: "mcq",
    prompt: "Evaluate $|A|$ for $A = \\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 0 & -2 \\\\ 1 & 4 & 5 \\end{bmatrix}$.",
    options: ["$-28$", "$28$", "$-4$", "$4$", NOTA],
    answer: 1,
    solution:
      "$a(ei - fh) - b(di - fg) + c(dh - eg)$ with row 1 $= (2, 0, 1)$:\n$2\\,(0\\cdot5 - (-2)\\cdot4) - 0 + 1\\,(3\\cdot4 - 0\\cdot1) = 2\\cdot8 + 12 = 28$.\n$-28$ has the wrong sign; $4 = 16 - 12$ comes from a $+$/$-$ slip in the last term.",
    ref: F3,
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Evaluate $\\det A$ for $A = \\begin{bmatrix} 1 & 0 & 2 & 0 \\\\ 3 & 2 & 1 & 4 \\\\ 0 & 0 & 5 & 0 \\\\ 2 & 0 & 1 & 3 \\end{bmatrix}$.",
    options: ["$-30$", "$6$", "$15$", "$60$", NOTA],
    answer: 4,
    solution:
      "Use row 3 $= (0,0,5,0)$ to clear column 3 (Rule 5, no change): $R_1 - \\tfrac25R_3 = (1,0,0,0)$, $R_2 - \\tfrac15R_3 = (3,2,0,4)$, $R_4 - \\tfrac15R_3 = (2,0,0,3)$.\nThen $R_2 - 3R_1 = (0,2,0,4)$ and $R_4 - 2R_1 = (0,0,0,3)$. The rows are now $(1,0,0,0), (0,2,0,4), (0,0,5,0), (0,0,0,3)$: upper triangular.\nRule 7: $\\det A = 1\\cdot2\\cdot5\\cdot3 = 30$, which is not listed: **None of the above**.",
    ref: "Slides 3.1 Rules 5, 7 (det p5–6)",
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Find $\\det A$ for $A = \\begin{bmatrix} 2 & 5 & 1 & 7 \\\\ 0 & 3 & 9 & 4 \\\\ 0 & 0 & -1 & 8 \\\\ 0 & 0 & 0 & \\tfrac12 \\end{bmatrix}$.",
    options: ["$-3$", "$3$", "$\\tfrac92$", "$-6$", NOTA],
    answer: 0,
    solution:
      "$A$ is upper triangular, so by Rule 7 $\\det A$ is the product of the diagonal: $2\\cdot3\\cdot(-1)\\cdot\\tfrac12 = -3$. The entries above the diagonal play no role. ($\\tfrac92$ is the **sum** of the diagonal entries, which means nothing here.)",
    ref: "Slides 3.1 Rule 7 (det p6–7)",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A$ is $3\\times3$ with $|A| = 4$. $B$ is obtained from $A$ by $R_1 \\leftrightarrow R_2$, then $R_3 \\to R_3 - 2R_1$, then $R_2 \\to 3R_2$. Find $|B|$.",
    options: ["$12$", "$-4$", "$-108$", "$-12$", NOTA],
    answer: 3,
    solution:
      "Exchange: $\\times(-1)$ (Rule 2). Replacement: $\\times1$ (Rule 5). Scaling one row by 3: $\\times3$ (Rule 3). So $|B| = (-1)(1)(3)(4) = -12$.\n$-108 = -27\\cdot4$ comes from treating the scaling as $3^3$ (that would be scaling the whole matrix).",
    ref: `${RULES16}; PYP AY25/26 S2 Q2`,
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "Given $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 5$, find $\\begin{vmatrix} d & e & f \\\\ 2a & 2b & 2c \\\\ g - 3d & h - 3e & i - 3f \\end{vmatrix}$.",
    options: ["$10$", "$-10$", "$-30$", "$30$", NOTA],
    answer: 1,
    solution:
      "Build it from the original in steps: exchange $R_1 \\leftrightarrow R_2$ ($\\times(-1)$), scale the new row 2 by 2 ($\\times2$), then $R_3 \\to R_3 - 3R_1$ where $R_1 = (d, e, f)$ (Rule 5, $\\times1$).\nSo the value is $(-1)(2)(5) = -10$. The $-3$ in the replacement does not enter the answer ($\\pm30$ are the traps).",
    ref: RULES16,
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "Given $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 5$, find $\\begin{vmatrix} a + 2g & b + 2h & c + 2i \\\\ 3d & 3e & 3f \\\\ g & h & i \\end{vmatrix}$.",
    options: ["$15$", "$5$", "$45$", "$-15$", NOTA],
    answer: 0,
    solution: "Row 1 is $R_1 + 2R_3$ (Rule 5, no change) and row 2 is $3R_2$ (Rule 3, factor 3). So the determinant is $3\\cdot5 = 15$.",
    ref: RULES16,
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "Given $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 7$, find $\\begin{vmatrix} a & g & d \\\\ b & h & e \\\\ c & i & f \\end{vmatrix}$.",
    options: ["$7$", "$49$", "$-7$", "$0$", NOTA],
    answer: 2,
    solution:
      "The new matrix is the **transpose** of $\\begin{bmatrix} a&b&c\\\\g&h&i\\\\d&e&f\\end{bmatrix}$. Transposing changes nothing (Rule 10), and that matrix is the original with rows 2 and 3 exchanged (Rule 2). Answer: $-7$.",
    ref: "Slides 3.1 Rules 2, 10 (det p3, p10)",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A = [\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3]$ is $3\\times3$ with $|A| = 3$. Find $\\left|[\\,\\mathbf{a}_1 + \\mathbf{a}_2\\ \\ \\ \\mathbf{a}_2 + \\mathbf{a}_3\\ \\ \\ \\mathbf{a}_3 + \\mathbf{a}_1\\,]\\right|$.",
    options: ["$3$", "$0$", "$9$", "$6$", NOTA],
    answer: 3,
    solution:
      "Write $B = AM$ with $M = \\begin{bmatrix}1&0&1\\\\1&1&0\\\\0&1&1\\end{bmatrix}$ (column $j$ of $M$ = coefficients of column $j$ of $B$).\n$|M| = 1(1-0) - 0 + 1(1-0) = 2$, so by Rule 9 $|B| = |A||M| = 6$.\nIt is tempting to say \"only replacements, so 3\", but the third column $\\mathbf{a}_3 + \\mathbf{a}_1$ uses the **original** $\\mathbf{a}_1$, which has already been changed; that is not a sequence of replacements.",
    ref: `${RULES910}; Slides 0B multiplication by columns`,
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt: "Reduce $A = \\begin{bmatrix} 2 & 1 & 3 \\\\ 4 & 5 & 7 \\\\ -2 & 5 & 1 \\end{bmatrix}$ to $U$ to find $|A|$ as the product of pivots.",
    options: ["$12$", "$-12$", "$10$", "$24$", NOTA],
    answer: 0,
    solution:
      "$R_2 \\to R_2 - 2R_1$: $(0, 3, 1)$. $R_3 \\to R_3 + R_1$: $(0, 6, 4)$. $R_3 \\to R_3 - 2R_2$: $(0, 0, 2)$.\nNo row exchanges, so $|A| = |U| = 2\\cdot3\\cdot2 = 12$.",
    ref: PIVOTS,
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Reducing $A$ ($3\\times3$) to an upper triangular $U$ used exactly these operations: one row exchange, $R_3 \\to R_3 - 4R_1$, and $R_2 \\to \\tfrac12R_2$. The diagonal of $U$ is $3, -2, 5$. Find $|A|$.",
    options: ["$-30$", "$30$", "$60$", "$-60$", NOTA],
    answer: 2,
    solution:
      "$|U| = 3\\cdot(-2)\\cdot5 = -30$, and $|U| = (-1)(1)\\left(\\tfrac12\\right)|A| = -\\tfrac12|A|$.\nSo $|A| = -30 / (-\\tfrac12) = 60$. Forgetting to undo the scaling gives $30$; forgetting the exchange gives $-60$.",
    ref: PIVOTS,
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt: "Evaluate $\\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 5 \\\\ 4 & 9 & 25 \\end{vmatrix}$.",
    options: ["$-6$", "$6$", "$30$", "$3$", NOTA],
    answer: 1,
    solution:
      "$R_2 - 2R_1 = (0, 1, 3)$, $R_3 - 4R_1 = (0, 5, 21)$, then $R_3 - 5R_2 = (0, 0, 6)$.\nNo exchanges, pivots $1, 1, 6$: the determinant is $6$.",
    ref: PIVOTS,
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "$P$ is the $4\\times4$ matrix whose rows are, in order, $\\mathbf{e}_2^T, \\mathbf{e}_3^T, \\mathbf{e}_4^T, \\mathbf{e}_1^T$ (rows of $I$). Find $|P|$.",
    options: ["$-1$", "$1$", "$0$", "$4$", NOTA],
    answer: 0,
    solution:
      "$P$ is a permutation matrix. Exchange rows to get back to $I$: $R_1 \\leftrightarrow R_4$ gives $\\mathbf{e}_1, \\mathbf{e}_3, \\mathbf{e}_4, \\mathbf{e}_2$; $R_2 \\leftrightarrow R_4$ gives $\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_4, \\mathbf{e}_3$; $R_3 \\leftrightarrow R_4$ gives $I$.\nThree exchanges (odd), so $|P| = -1$ (Rules 1, 2).",
    ref: "Slides 3.1 Rules 1–2, permutation matrices (det p3)",
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
      "Equal columns (Rule 4 for columns), a zero column (Rule 6 for columns), and $R_2 + R_4 = R_6$ (the replacement $R_6 \\to R_6 - R_2 - R_4$ gives a zero row) all give $|A| = 0$. A zero diagonal says nothing: for $2\\times2$, $\\begin{vmatrix}0&1\\\\1&0\\end{vmatrix} = -1$ (one row exchange from $I$).",
    ref: `${RULES16}; ${COLS}; older PYP: row 2 + row 4 = row 6`,
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "$A = [a_{ij}]$ is $3\\times3$ with $|A| = 2$, and $B = [b_{ij}]$ with $b_{ij} = 3^{i+j}a_{ij}$. Find $|B|$.",
    options: ["$3^{6}\\cdot 2$", "$3^{12}\\cdot 2$", "$3^{9}\\cdot 2$", "$3^{3}\\cdot 2$", NOTA],
    answer: 1,
    solution:
      "$b_{ij} = 3^i\\cdot3^j\\cdot a_{ij}$. Factor $3^i$ out of row $i$ (Rule 3): $3^{1+2+3} = 3^6$. Then factor $3^j$ out of column $j$ (Rule 3 for columns): another $3^6$.\n$|B| = 3^{12}\\cdot 2$. The answer $3^6\\cdot2$ counts only the row factors.",
    ref: `${COLS}; older PYP: b_ij = 2^{i+j}a_ij`,
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt: "Evaluate $\\begin{vmatrix} 1+a & b & c \\\\ a & 1+b & c \\\\ a & b & 1+c \\end{vmatrix}$.",
    options: ["$1 + a + b + c$", "$(1+a)(1+b)(1+c)$", "$1 + abc$", "$a + b + c$", NOTA],
    answer: 0,
    solution:
      "Each row sums to $1 + a + b + c$. Add columns 2 and 3 to column 1 (no change) and factor it out (Rule 3): $(1+a+b+c)\\begin{vmatrix}1&b&c\\\\1&1+b&c\\\\1&b&1+c\\end{vmatrix}$.\nSubtract row 1 from rows 2 and 3: $\\begin{vmatrix}1&b&c\\\\0&1&0\\\\0&0&1\\end{vmatrix} = 1$ (Rule 7). Answer: $1 + a + b + c$.",
    ref: `${COLS}; PYP AY24/25 S2 Q9`,
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "Evaluate $\\det A$ for $A = \\begin{bmatrix} 0 & 0 & 2 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 1 \\\\ 3 & 0 & 0 & 0 & 0 \\\\ 0 & -1 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 4 & 0 \\end{bmatrix}$.",
    options: ["$-24$", "$10$", "$0$", "$-6$", NOTA],
    answer: 4,
    solution:
      "Exchange rows until the nonzero entries are on the diagonal: $R_1 \\leftrightarrow R_3$ (now the rows have their entries in columns $1, 5, 3, 2, 4$), $R_2 \\leftrightarrow R_4$ (columns $1, 2, 3, 5, 4$), $R_4 \\leftrightarrow R_5$ (diagonal).\nThree exchanges: sign $-1$ (Rule 2). The diagonal matrix has determinant $3\\cdot(-1)\\cdot2\\cdot4\\cdot1 = -24$ (Rule 7).\n$\\det A = (-1)(-24) = 24$, not listed: **None of the above**.",
    ref: "Slides 3.1 Rules 2, 7 (det p3, p6); older PYP: sparse 5×5 determinant",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "For which values of $x$ is $\\begin{bmatrix} x & 2 & 2 \\\\ 2 & x & 2 \\\\ 2 & 2 & x \\end{bmatrix}$ singular?",
    options: ["$x = 2$ only", "$x = -2$ or $x = 4$", "$x = 2$ or $x = -4$", "$x = 0$ or $x = 6$", NOTA],
    answer: 2,
    solution:
      "Every row sums to $x + 4$; add columns 2, 3 to column 1 and factor: $(x+4)\\begin{vmatrix}1&2&2\\\\1&x&2\\\\1&2&x\\end{vmatrix}$. Subtract row 1 from rows 2, 3: $\\begin{vmatrix}1&2&2\\\\0&x-2&0\\\\0&0&x-2\\end{vmatrix} = (x-2)^2$.\n$\\det = (x+4)(x-2)^2 = 0$ (Rule 8) iff $x = 2$ or $x = -4$. ($x = 2$ makes all rows equal; $x = -4$ makes every row sum to zero.)",
    ref: `${RULE8}; ${COLS}`,
  },

  // ---------------------------------------------------------------- MCQ: algebra
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is $3\\times3$ with $|A| = 4$. Find $\\left|\\tfrac12A\\right|$.",
    options: ["$2$", "$\\tfrac18$", "$4$", "$\\tfrac12$", NOTA],
    answer: 3,
    solution: "$\\left|\\tfrac12A\\right| = \\left(\\tfrac12\\right)^3|A| = \\tfrac18\\cdot4 = \\tfrac12$ (Rule 3 once per row). The trap $\\tfrac12|A| = 2$ forgets that the scalar multiplies all three rows.",
    ref: T3Q1,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ and $B$ are $4\\times4$ with $|A| = 2$ and $|B| = -3$. Find $|A^TB^{-1}(2A)|$.",
    options: ["$-\\tfrac{32}{3}$", "$-\\tfrac{64}{3}$", "$\\tfrac{64}{3}$", "$-\\tfrac{8}{3}$", NOTA],
    answer: 1,
    solution:
      "$|A^T| = 2$, $|B^{-1}| = -\\tfrac13$, $|2A| = 2^4\\cdot2 = 32$. Product (Rule 9): $2\\cdot\\left(-\\tfrac13\\right)\\cdot32 = -\\tfrac{64}{3}$.\n$-\\tfrac{8}{3}$ uses $|2A| = 2|A|$; $-\\tfrac{32}{3}$ uses $2^3$ as if $A$ were $3\\times3$.",
    ref: `${RULES910}; ${T3Q1}`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is a $4\\times4$ invertible matrix with $|A| = -3$. Find $|A^TA^{-1}|$.",
    options: ["$1$", "$9$", "$-1$", "$\\tfrac19$", NOTA],
    answer: 0,
    solution: "$|A^TA^{-1}| = |A^T|\\,|A^{-1}| = |A|\\cdot\\dfrac{1}{|A|} = 1$ (Rules 9, 10), whatever $|A|$ is.",
    ref: `${RULES910}; older PYP: |AᵀA⁻¹|`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$Q$ is an $n\\times n$ matrix with $Q^TQ = I$. What are the possible values of $|Q|$?",
    options: ["$1$ only", "$0$ or $1$", "$-1$ or $1$", "any nonzero real number", NOTA],
    answer: 2,
    solution:
      "$|Q^TQ| = |Q^T||Q| = |Q|^2 = |I| = 1$, so $|Q| = \\pm1$. Both occur: $I$ has $+1$, and $I$ with one row multiplied by $-1$ has $-1$.",
    ref: `${RULES910}; older PYP: |Q| when QᵀQ = I`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix with $A^3 = 8I$. Find $|A|$.",
    options: ["$8$", "$2$", "$\\pm 8$", "$512$", NOTA],
    answer: 0,
    solution:
      "$|A|^3 = |8I| = 8^3 = 512$ (Rules 9, 3). A real number has exactly one real cube root, so $|A| = 8$. Contrast $A^2 = 4I$, where $|A|^2 = 64$ allows $\\pm8$.",
    ref: RULES910,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "Let $A, B$ be $n\\times n$ matrices with $n \\ge 2$. Which statement is **false** in general?",
    options: ["$|AB| = |BA|$", "$|A^T| = |A|$", "$|A + B| = |A| + |B|$", "$|A^2| \\ge 0$", NOTA],
    answer: 2,
    solution:
      "$|AB| = |A||B| = |BA|$ even though $AB \\ne BA$; $|A^T| = |A|$; $|A^2| = |A|^2 \\ge 0$. There is no sum rule: $A = B = I_2$ gives $|A+B| = |2I| = 4 \\ne 2$.",
    ref: RULES910,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is $3\\times3$ with $|A| = -2$. Find $\\left|(2A)^T(A^{-1})^2\\right|$.",
    options: ["$4$", "$-16$", "$-1$", "$16$", NOTA],
    answer: 4,
    solution:
      "$|(2A)^T| = |2A| = 2^3(-2) = -16$ and $|(A^{-1})^2| = (1/|A|)^2 = \\tfrac14$. Product: $-16\\cdot\\tfrac14 = -4$, which is not listed: **None of the above**.",
    ref: `${RULES910}; ${T3Q1}`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix with $A = -A^T$. Which statement **must** be true?",
    options: ["$A = 0$", "$|A| = 0$", "$|A + I| = 0$", "$A$ is invertible", NOTA],
    answer: 1,
    solution:
      "Tutorial 3 Q3: $|A| = |-A^T| = (-1)^3|A^T| = -|A|$, so $|A| = 0$ and $A$ is **not** invertible (Rule 8). $A$ need not be zero, e.g. $\\begin{bmatrix}0&1&0\\\\-1&0&0\\\\0&0&0\\end{bmatrix}$; for that matrix $|A + I| = \\begin{vmatrix}1&1&0\\\\-1&1&0\\\\0&0&1\\end{vmatrix} = 1(1-0) - 1(-1-0) + 0 = 2 \\ne 0$.",
    ref: T3Q3,
  },

  // ---------------------------------------------------------------- MCQ: invertibility
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "For which values of $k$ is $A = \\begin{bmatrix} 1 & 2 & k \\\\ 0 & k & 3 \\\\ 1 & 0 & 1 \\end{bmatrix}$ singular?",
    options: ["$k = -3$ or $k = 2$", "$k = 3$ or $k = -2$", "$k = 3$ only", "$k = 0$ or $k = 1$", NOTA],
    answer: 1,
    solution:
      "3×3 formula along row 1: $|A| = 1(k\\cdot1 - 3\\cdot0) - 2(0\\cdot1 - 3\\cdot1) + k(0\\cdot0 - k\\cdot1) = k + 6 - k^2$.\nRule 8: singular $\\iff |A| = 0 \\iff k^2 - k - 6 = 0 \\iff (k-3)(k+2) = 0$, so $k = 3$ or $k = -2$.",
    ref: `${RULE8}; ${F3}`,
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "For which values of $k$ is $\\begin{bmatrix} k & 2 \\\\ 8 & k \\end{bmatrix}$ invertible?",
    options: ["$k \\ne 4$", "$k \\ne 16$", "$k \\ne \\pm 4$", "$k \\ne \\pm 2$", NOTA],
    answer: 2,
    solution: "$ad - bc = k^2 - 16$, which is nonzero iff $k \\ne 4$ and $k \\ne -4$ (Rule 8).",
    ref: "Slides 3.1 Rule 8 and the 2×2 formula (det p8)",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "$A$ is a $5\\times5$ matrix with $|A| = 0$. Which statement is **not** necessarily true?",
    options: [
      "$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution",
      "$A$ has fewer than 5 pivot positions",
      "The columns of $A$ are linearly dependent",
      "$A\\mathbf{x} = \\mathbf{b}$ has no solution for some $\\mathbf{b}\\in\\mathbb{R}^5$",
      "$A$ has a row of zeros",
    ],
    answer: 4,
    solution:
      "$|A| = 0 \\iff A$ is singular (Rule 8), and the Invertible Matrix Theorem (Theorem 2.4) then makes the first four statements true: fewer than 5 pivots, dependent columns, nontrivial solutions of $A\\mathbf{x} = \\mathbf{0}$, and columns that do not span $\\mathbb{R}^5$. A zero row is just one possible cause of $|A| = 0$ (Rule 6), not a consequence: two equal rows (Rule 4) also give 0 without any zero row.",
    ref: RULE8,
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
      "Theorem 3.1: volume $= \\text{abs}\\left(\\begin{vmatrix}2&1&0\\\\-1&3&1\\\\0&2&-2\\end{vmatrix}\\right)$ (adjacent vertices as columns; by Rule 10 rows give the same value).\n$2(-6-2) - 1(2-0) + 0 = -16 - 2 = -18$, so the volume is $18$. A volume is never negative.",
    ref: THM31,
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt: "Calculate the area of the parallelogram determined by the points $(1,1)$, $(4,2)$, $(2,5)$, $(5,6)$.",
    options: ["$11$", "$16$", "$\\tfrac{11}{2}$", "$-11$", NOTA],
    answer: 0,
    solution:
      "Translate by subtracting $(1,1)$: the vertices become $(0,0)$, $(3,1)$, $(1,4)$, $(4,5)$, and $(3,1) + (1,4) = (4,5)$, so the parallelogram is determined by the columns of $A = \\begin{bmatrix}3&1\\\\1&4\\end{bmatrix}$.\n$|A| = 12 - 1 = 11$, area $= 11$. Using the untranslated points $(4,2)$, $(2,5)$ gives $16$, which is wrong.",
    ref: "Slides 3.2 Exercise 3.2.1 (det p16)",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix} 3 & 1 \\\\ -2 & 4 \\end{bmatrix}$. What is the area of the image of the unit disk $x_1^2 + x_2^2 \\le 1$?",
    options: ["$14\\pi$", "$14$", "$7\\pi$", "$\\pi$", NOTA],
    answer: 0,
    solution:
      "$|A| = 12 + 2 = 14$. Theorem 3.2 applies to arbitrary shapes: the area is multiplied by $\\text{abs}(|A|) = 14$, and the disk has area $\\pi$, so the image has area $14\\pi$.",
    ref: THM32,
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{u}) = A\\mathbf{u}$ with $A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}$ maps the unit disk onto the region inside the ellipse $\\tfrac{x_1^2}{9} + \\tfrac{x_2^2}{4} = 1$. Find the area of that region.",
    options: ["$6\\pi$", "$36\\pi$", "$13\\pi$", "$5\\pi$", NOTA],
    answer: 0,
    solution:
      "Area of ellipse $=$ area of $T(D) = \\text{abs}(|A|)\\times$ area of $D = 6\\times\\pi 1^2 = 6\\pi$ (the slide example with $a = 3$, $b = 2$: $\\pi ab$).",
    ref: "Slides 3.3 ellipse example (det p20)",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ on $\\mathbb{R}^2$ with $|A| = -3$, and $S$ is a parallelogram of area 2. Find the area of $T(T(S))$.",
    options: ["$-18$", "$6$", "$12$", "$18$", NOTA],
    answer: 3,
    solution:
      "Each application multiplies area by $\\text{abs}(|A|) = 3$ (Theorem 3.2): $2 \\to 6 \\to 18$. Equivalently $\\text{abs}(|A^2|) = |A|^2 = 9$ and $9\\cdot2 = 18$. Areas are never negative.",
    ref: `${THM32}; ${RULES910}`,
  },
];
