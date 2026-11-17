import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

const RULES16 = "Slides 3.1 Rules 1–6 (det p3–5)";
const PIVOTS = "Slides 3.1 Rules 5, 7, 8 (det p5–8); Tutorial 3 Q2";
const RULE8 = "Slides 3.1 Rule 8 (det p8); Slides 2.2 Theorem 2.4 (alg p10)";
const RULES910 = "Slides 3.1 Rules 9–10 (det p9–10)";
const T3Q1 = "Tutorial 3 Q1 (tut5 p5–6)";
const T3Q3 = "Tutorial 3 Q3 (tut5 p10–12)";
const F3 = "Tutor slides, 3×3 formula (tut5 p3, p12)";
const COLS = "Slides 3.1 \"all the above properties apply to columns also\" (det p10)";

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const determinantsExam: ConceptQuestion[] = [
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A$ is a $4\\times4$ matrix with $\\det A = 3$. $B$ is obtained from $A$ by the following operations in order: interchange rows 1 and 4; multiply row 2 by $-2$; add 5 times row 1 to row 3; multiply row 4 by $\\tfrac12$. Find $\\det B$.",
    options: ["$-3$", "$15$", "$3$", "$6$", NOTA],
    answer: 2,
    solution:
      "Exchange: $\\times(-1)$ (Rule 2). Scaling row 2 by $-2$: $\\times(-2)$ (Rule 3). Replacement: $\\times1$ (Rule 5; the 5 never enters). Scaling row 4 by $\\tfrac12$: $\\times\\tfrac12$.\n$\\det B = 3\\cdot(-1)(-2)(1)\\left(\\tfrac12\\right) = 3$.",
    ref: `${RULES16}; PYP AY25/26 S2 Q2`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "Let $A$ be an $n\\times n$ matrix with $n \\ge 2$. Which of the following is **false**?",
    options: [
      "$|A^TA^{-1}| = 1$ whenever $A$ is invertible",
      "$|-A| = |A|$ whenever $n$ is even",
      "If $A = -A^T$ and $n = 3$, then $|A| = 0$",
      "$|A^2| \\ge 0$",
      "$|A + A^T| = 2|A|$",
    ],
    answer: 4,
    solution:
      "(A) $|A^T||A^{-1}| = |A|/|A| = 1$. (B) $|-A| = (-1)^n|A| = |A|$ for even $n$. (C) Tutorial 3 Q3: $|A| = |-A^T| = (-1)^3|A^T| = -|A|$ forces $|A| = 0$. (D) $|A^2| = |A|^2 \\ge 0$.\n(E) is false: there is no sum rule. For $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$, $|A| = 0$ but $A + A^T = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has determinant $-1$.",
    ref: `${RULES910}; ${T3Q1}; ${T3Q3}; older PYP: |AᵀA⁻¹|`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "Let $A$ be a $4\\times4$ matrix. Which of the following is **false**?",
    options: [
      "If two columns of $A$ are equal, then $|A| = 0$",
      "If $A^2 = 0$, then $|A| = 0$",
      "$|AA^T| \\ge 0$",
      "If $A$ is invertible, then $|A||A^{-1}| = 1$",
      "$|3A| = 3^3|A|$",
    ],
    answer: 4,
    solution:
      "(A) Rule 4 applied to columns. (B) $|A|^2 = |A^2| = |0| = 0$. (C) $|AA^T| = |A||A^T| = |A|^2 \\ge 0$. (D) $|A||A^{-1}| = |AA^{-1}| = |I| = 1$.\n(E) is false: Rule 3 gives a factor 3 for **each** of the 4 rows, so $|3A| = 3^4|A|$. (Compare AY25/26 S1 Q10, where $|5A| = 5|A|$ was the false statement.)",
    ref: `${RULES910}; ${COLS}; PYP AY25/26 S1 Q10`,
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "Find the volume of the image of the unit cube $[0,1]^3$ under $T(\\mathbf{x}) = A\\mathbf{x}$, where $A = \\begin{bmatrix} 0 & 2 & 1 \\\\ 3 & 1 & -1 \\\\ 0 & 0 & 5 \\end{bmatrix}$.",
    options: ["$-30$", "$6$", "$150$", "$30$", NOTA],
    answer: 3,
    solution:
      "Exchange rows 1 and 2: $\\begin{bmatrix} 3 & 1 & -1 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 5 \\end{bmatrix}$ is upper triangular with determinant $3\\cdot2\\cdot5 = 30$, so $|A| = -30$ (one exchange).\nThe unit cube has volume 1, so the image has volume $\\text{abs}(|A|)\\cdot1 = 30$ (Theorem 3.2). $-30$ forgets the absolute value; $6$ ignores the entry 5.",
    ref: "Slides 3.3 Theorem 3.2 (det p17–19); PYP AY25/26 S2 Q4",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "$A = [a_{ij}]$ is a $3\\times3$ matrix with $|A| = 2$. Which of the following statements are correct?\nI. If $b_{ij} = 2^{i+j}a_{ij}$, then $|B| = 2^{13}$.\nII. If $b_{ij} = 2^{i-j}a_{ij}$, then $|B| = 2$.\nIII. If $b_{ij} = 2a_{ij}$, then $|B| = 4$.\nIV. If $b_{ij} = (-1)^{i+j}a_{ij}$, then $|B| = -2$.",
    options: ["I only", "I and II only", "I, II and IV only", "II and III only", "All of the above"],
    answer: 1,
    solution:
      "Factor numbers out of rows and columns with Rule 3 (which applies to columns too).\nI. $2^i$ from row $i$ gives $2^{1+2+3} = 2^6$; $2^j$ from column $j$ another $2^6$: $|B| = 2^{12}\\cdot2 = 2^{13}$. Correct.\nII. $2^i$ from row $i$ gives $2^6$; $2^{-j}$ from column $j$ gives $2^{-6}$: $|B| = |A| = 2$. Correct.\nIII. $B = 2A$, $|B| = 2^3\\cdot2 = 16$, not 4. Wrong.\nIV. $(-1)^i$ from rows gives $(-1)^6 = 1$, $(-1)^j$ from columns gives $1$: $|B| = 2$. Wrong.\nAnswer: I and II only.",
    ref: `${COLS}; older PYP: b_ij = 2^{i+j}a_ij`,
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "Find all real $x$ for which $\\begin{bmatrix} x & 2 & 0 \\\\ 2 & x & 2 \\\\ 0 & 2 & x \\end{bmatrix}$ is **not** invertible.",
    options: ["$x = 0$ only", "$x = \\pm2\\sqrt2$ only", "$x = 0$ or $x = \\pm2$", "$x = 0$ or $x = \\pm2\\sqrt2$", NOTA],
    answer: 3,
    solution:
      "3×3 formula along row 1: $\\det = x(x^2 - 4) - 2(2x - 0) + 0 = x^3 - 8x = x(x^2 - 8)$.\nRule 8: not invertible iff $\\det = 0$, i.e. $x = 0$ or $x^2 = 8$, $x = \\pm2\\sqrt2$. Forgetting the second term gives $x(x^2-4)$ and the wrong roots $0, \\pm2$.",
    ref: `${RULE8}; ${F3}`,
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "Evaluate $\\begin{vmatrix} 2+a & b & c & d \\\\ a & 2+b & c & d \\\\ a & b & 2+c & d \\\\ a & b & c & 2+d \\end{vmatrix}$.",
    options: ["$8(2+a+b+c+d)$", "$2+a+b+c+d$", "$16+a+b+c+d$", "$(2+a)(2+b)(2+c)(2+d)$", NOTA],
    answer: 0,
    solution:
      "Every row sums to $2 + a + b + c + d$. Add columns 2–4 to column 1 (no change) and factor that sum out (Rule 3); column 1 becomes all ones.\nSubtract row 1 from rows 2–4: they become $(0,2,0,0)$, $(0,0,2,0)$, $(0,0,0,2)$. The matrix is upper triangular with diagonal $1, 2, 2, 2$ (Rule 7).\nDeterminant $= (2+a+b+c+d)\\cdot 2^3 = 8(2+a+b+c+d)$. (With 1's on the diagonal instead of 2's the factor $2^3$ becomes 1, as in AY24/25 S2 Q9.)",
    ref: `${COLS}; PYP AY24/25 S2 Q9`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $|A| = 2$ and $|B| = -\\tfrac12$. Find $|2A^TB^{-1}A^{-2}|$.",
    options: ["$8$", "$-2$", "$-8$", "$-128$", NOTA],
    answer: 2,
    solution:
      "$|2A^TB^{-1}A^{-2}| = 2^3\\cdot|A|\\cdot\\dfrac{1}{|B|}\\cdot\\dfrac{1}{|A|^2} = 8\\cdot2\\cdot(-2)\\cdot\\tfrac14 = -8$.\n$-2$ uses $|2X| = 2|X|$; $-128$ treats $A^{-2}$ as $A^2$.",
    ref: `${RULES910}; ${T3Q1}`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times3$ real matrix with $A = -A^T$. Which of the following statements are correct?\nI. $|A| = 0$.\nII. $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution.\nIII. $|A^2| = 0$.\nIV. $|A + A^T| = 0$.",
    options: ["I only", "I and II only", "I, II and III only", "II and IV only", "All of the above"],
    answer: 4,
    solution:
      "I: Tutorial 3 Q3, $|A| = |-A^T| = (-1)^3|A^T| = -|A|$, so $|A| = 0$. II: $|A| = 0$ means $A$ is singular (Rule 8), so by Theorem 2.4 $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions. III: $|A^2| = |A|^2 = 0$. IV: $A + A^T = 0$, the zero matrix, which has a zero row (Rule 6).\nAll four are correct.",
    ref: `${T3Q3}; ${RULE8}`,
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A = [\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3\\ \\mathbf{a}_4]$ is a $4\\times4$ matrix with $|A| = 5$. Find $\\left|[\\,\\mathbf{a}_1 + 2\\mathbf{a}_3\\ \\ \\ \\mathbf{a}_4\\ \\ \\ 3\\mathbf{a}_2\\ \\ \\ \\mathbf{a}_3 - \\mathbf{a}_1\\,]\\right|$.",
    options: ["$15$", "$-45$", "$45$", "$-15$", NOTA],
    answer: 2,
    solution:
      "Use column operations on $B = [\\,\\mathbf{a}_1 + 2\\mathbf{a}_3\\ \\ \\mathbf{a}_4\\ \\ 3\\mathbf{a}_2\\ \\ \\mathbf{a}_3 - \\mathbf{a}_1\\,]$.\nAdd column 1 to column 4 (no change): column 4 becomes $3\\mathbf{a}_3$. Factor 3 out of column 4 and 3 out of column 3 (Rule 3): $|B| = 9\\,|[\\,\\mathbf{a}_1 + 2\\mathbf{a}_3\\ \\ \\mathbf{a}_4\\ \\ \\mathbf{a}_2\\ \\ \\mathbf{a}_3\\,]|$.\nSubtract 2 × column 4 from column 1 (no change): $9\\,|[\\,\\mathbf{a}_1\\ \\ \\mathbf{a}_4\\ \\ \\mathbf{a}_2\\ \\ \\mathbf{a}_3\\,]|$.\nExchange columns 2, 3 and then columns 3, 4 to reach $[\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3\\ \\mathbf{a}_4]$: two exchanges, sign $+$.\n$|B| = 9\\cdot5 = 45$. (Columns 1 and 4 together contribute a factor 3, not 1: they are not a pure replacement of each other.)",
    ref: `${COLS}; Slides 3.2 column operations (det p12)`,
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix} 1 & 2 \\\\ -1 & 3 \\end{bmatrix}$. Find the area of the image under $T$ of the parallelogram with vertices $(0,0)$, $(2,1)$, $(3,4)$ and $(1,3)$.",
    options: ["$25$", "$5$", "$10$", "$\\tfrac{25}{2}$", NOTA],
    answer: 0,
    solution:
      "The parallelogram is determined by $(2,1)$ and $(1,3)$ (their sum is $(3,4)$). Theorem 3.1: area $= \\text{abs}\\left(\\begin{vmatrix}2&1\\\\1&3\\end{vmatrix}\\right) = 6 - 1 = 5$.\n$|A| = 3 + 2 = 5$, so by Theorem 3.2 the image has area $5\\cdot5 = 25$. ($5$ is the original area only.)",
    ref: "Slides 3.2 Theorem 3.1 (det p11); Slides 3.3 Theorem 3.2 (det p17–18)",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $|AB| = 6$ and $|A| = -2$. Then $|B^T| = -3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution: "$|AB| = |A||B|$ gives $|B| = 6/(-2) = -3$, and $|B^T| = |B| = -3$. **True**.",
    ref: RULES910,
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with $A^2 = 4I$. Then $|A| = 8$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$|A|^2 = |4I| = 4^3 = 64$, so $|A| = \\pm8$. $A = 2I$ gives $8$; $A = \\begin{bmatrix}2&0&0\\\\0&2&0\\\\0&0&-2\\end{bmatrix}$ also satisfies $A^2 = 4I$ but has $|A| = -8$. The sign cannot be determined: **Not enough information**.",
    ref: `${RULES910}; ${T3Q1}`,
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt:
      "$A$ is $3\\times3$ with $|A| = 2$. $B$ is obtained from $A$ by adding 4 times column 1 to column 3, then interchanging columns 1 and 2, then multiplying column 3 by $-3$. Then $|B| = -6$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The rules apply to columns too: replacement $\\times1$, exchange $\\times(-1)$, scaling by $-3$ gives $\\times(-3)$.\n$|B| = 2\\cdot(-1)\\cdot(-3) = 6 \\ne -6$. **False**.",
    ref: `${RULES16}; ${COLS}`,
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt:
      "The system $kx_1 + x_2 = 1$, $\\ x_1 + kx_2 + x_3 = 0$, $\\ x_2 + kx_3 = 2$ has a unique solution for all real $k$ except how many values?",
    options: ["$0$", "$1$", "$2$", "$3$", "Infinitely many"],
    answer: 3,
    solution:
      "Unique solution $\\iff A = \\begin{bmatrix}k&1&0\\\\1&k&1\\\\0&1&k\\end{bmatrix}$ is invertible $\\iff \\det A \\ne 0$ (Rule 8).\n3×3 formula: $\\det A = k(k^2 - 1) - 1(k - 0) + 0 = k^3 - 2k = k(k^2 - 2)$, which is zero for $k = 0, \\sqrt2, -\\sqrt2$: **three** values.",
    ref: `${RULE8}; ${F3}; PYP AY24/25 S2 Q5`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "Let $A$ and $B$ be $3\\times3$ matrices. Which of the following statements are always correct?\nI. $|AB| = |BA|$\nII. $|A + B| = |A| + |B|$\nIII. $|A^TB| = |A|\\,|B|$\nIV. $|2A| = 8|A|$",
    options: ["I and III only", "I, III and IV only", "I, II and IV only", "III and IV only", "All of the above"],
    answer: 1,
    solution:
      "I: both equal $|A||B|$ (Rule 9). III: $|A^T||B| = |A||B|$ (Rule 10). IV: $|2A| = 2^3|A|$ (Rule 3 per row).\nII fails, e.g. $A = B = I$: $|2I| = 8 \\ne 2$. Answer: I, III and IV only.",
    ref: `${RULES910}; ${T3Q1}`,
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "Evaluate $\\det A$ for $A = \\begin{bmatrix} 0 & 3 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & -2 & 0 \\\\ 0 & 0 & 0 & 0 & 1 \\\\ 4 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 5 & 0 & 0 \\end{bmatrix}$.",
    options: ["$-120$", "$0$", "$-24$", "$120$", NOTA],
    answer: 3,
    solution:
      "Row $i$ has its entry in column $2, 4, 5, 1, 3$. Exchange rows to bring the entries onto the diagonal: $R_1 \\leftrightarrow R_4$ (columns $1, 4, 5, 2, 3$), $R_2 \\leftrightarrow R_4$ (columns $1, 2, 5, 4, 3$), $R_3 \\leftrightarrow R_5$ (columns $1, 2, 3, 4, 5$).\nThree exchanges: sign $-1$ (Rule 2). The diagonal is $4, 3, 5, -2, 1$, product $-120$ (Rule 7).\n$\\det A = (-1)(-120) = 120$.",
    ref: "Slides 3.1 Rules 2, 7 (det p3, p6); older PYP: sparse 5×5 determinant",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt:
      "For which values of $x$ are the vectors $(1, x, x^2)$, $(1, -1, 1)$, $(1, 2, 4)$ linearly dependent?",
    options: ["$x = 1$ or $x = -2$", "$x = -1$, $x = 0$ or $x = 2$", "$x = -1$ or $x = 2$", "No real $x$", NOTA],
    answer: 2,
    solution:
      "Put the vectors as the rows of $M$ in the order $(1,-1,1)$, $(1,2,4)$, $(1,x,x^2)$. They are dependent iff $M^T$ (the vectors as columns) is singular (Theorem 2.4), i.e. iff $|M| = |M^T| = 0$.\n$R_2 - R_1 = (0, 3, 3)$, $R_3 - R_1 = (0, x+1, x^2-1)$. Then $R_3 - \\tfrac{x+1}{3}R_2 = (0, 0, x^2 - 1 - (x+1)) = (0, 0, (x+1)(x-2))$.\n$|M| = 1\\cdot3\\cdot(x+1)(x-2)$, zero iff $x = -1$ or $x = 2$ (exactly when $(1,x,x^2)$ equals one of the other vectors).",
    ref: `${RULE8}; ${PIVOTS}; older PYP: independence of [1,1,1], [a,b,c], [a²,b²,c²]`,
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Find $\\det A$ for $A = \\begin{bmatrix} 1 & 2 & -1 & 3 \\\\ 2 & 5 & 0 & 4 \\\\ -1 & 1 & 4 & 2 \\\\ 3 & 6 & -3 & 10 \\end{bmatrix}$.",
    options: ["$3$", "$-9$", "$0$", "$9$", NOTA],
    answer: 4,
    solution:
      "$R_2 - 2R_1 = (0,1,2,-2)$, $R_3 + R_1 = (0,3,3,5)$, $R_4 - 3R_1 = (0,0,0,1)$.\nThen $R_3 - 3R_2 = (0,0,-3,11)$. The matrix is now upper triangular with pivots $1, 1, -3, 1$ (no exchanges).\n$\\det A = 1\\cdot1\\cdot(-3)\\cdot1 = -3$, which is not listed: **None of the above**. ($3$ drops the sign of the pivot $-3$.)",
    ref: PIVOTS,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "$Q$ is a $3\\times3$ matrix with $Q^TQ = I$, and $A$ is a $3\\times3$ matrix with $|A| = 3$. Find $|2Q^TA^{-1}Q|$.",
    options: ["$\\tfrac83$", "$\\pm\\tfrac83$", "$\\tfrac23$", "$24$", NOTA],
    answer: 0,
    solution:
      "$|2Q^TA^{-1}Q| = 2^3\\,|Q^T|\\,\\tfrac13\\,|Q| = 8\\cdot\\tfrac13\\cdot|Q|^2$. Although $|Q| = \\pm1$ is undetermined, $|Q^T||Q| = |Q^TQ| = |I| = 1$ either way.\nSo the value is exactly $\\tfrac83$; \"$\\pm$\" is the trap.",
    ref: `${RULES910}; older PYP: |Q| when QᵀQ = I`,
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "$A$ is an $n\\times n$ matrix with $A^3 = 0$. Which of the following statements are correct?\nI. $|A| = 0$.\nII. $I - A$ is invertible.\nIII. $|A^TA| > 0$.\nIV. $|A + A^T| = 0$.",
    options: ["I only", "I and II only", "I, II and IV only", "I and III only", "All of the above"],
    answer: 1,
    solution:
      "I: $|A|^3 = |A^3| = 0$. Correct.\nII: $(I - A)(I + A + A^2) = I - A^3 = I$, so $I - A$ is invertible. Correct.\nIII: $|A^TA| = |A|^2 = 0$. Wrong.\nIV: $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ has $A^3 = 0$ but $|A + A^T| = \\begin{vmatrix}0&1\\\\1&0\\end{vmatrix} = -1$. Wrong.\nAnswer: I and II only.",
    ref: `${RULES910}; PYP AY25/26 S1 Q10; older PYP: A^m = 0 ⇒ I − A invertible`,
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "The parallelepiped with one vertex at the origin and adjacent vertices $(1, k, 0)$, $(0, 1, k)$, $(k, 0, 1)$ has volume 9. Find all possible real $k$.",
    options: ["$k = 2$ only", "$k = \\pm2$", "$k = -2$ or $k = \\sqrt[3]{10}$", "$k = 2$ or $k = -\\sqrt[3]{10}$", NOTA],
    answer: 3,
    solution:
      "Theorem 3.1 with the adjacent vertices as rows (Rule 10: same value as columns): $\\begin{vmatrix}1&k&0\\\\0&1&k\\\\k&0&1\\end{vmatrix} = 1(1 - 0) - k(0 - k^2) + 0 = 1 + k^3$.\nVolume $= \\text{abs}(1 + k^3) = 9$: either $k^3 = 8$ ($k = 2$) or $k^3 = -10$ ($k = -\\sqrt[3]{10}$). Forgetting the absolute value loses the second solution.",
    ref: `Slides 3.2 Theorem 3.1 (det p11–15); Tutorial 3 Q4; ${F3}`,
  },
];
