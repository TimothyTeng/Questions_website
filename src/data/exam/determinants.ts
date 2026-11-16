import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

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
      "Interchange: $\\times(-1)$. Scaling row 2 by $-2$: $\\times(-2)$. Replacement: $\\times1$ (the 5 never enters). Scaling row 4 by $\\tfrac12$: $\\times\\tfrac12$.\n$\\det B = 3\\cdot(-1)(-2)(1)\\left(\\tfrac12\\right) = 3$.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "Let $A$ be an $n\\times n$ matrix with $n \\ge 2$. Which of the following is **false**?",
    options: [
      "$|A^TA^{-1}| = 1$ whenever $A$ is invertible",
      "$|-A| = |A|$ whenever $n$ is even",
      "If $A^T = -A$ and $n$ is odd, then $|A| = 0$",
      "$|A^2| \\ge 0$",
      "$|A + A^T| = 2|A|$",
    ],
    answer: 4,
    solution:
      "(A) $|A^T||A^{-1}| = |A|/|A| = 1$. (B) $|-A| = (-1)^n|A| = |A|$ for even $n$. (C) $|A| = |-A| = (-1)^n|A| = -|A|$ forces $|A| = 0$. (D) $|A^2| = |A|^2 \\ge 0$.\n(E) is false: there is no sum rule. For $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$, $|A| = 0$ but $A + A^T = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has determinant $-1$. (Even for symmetric $A$ it would be $|2A| = 2^n|A|$.)",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "Find the volume of the image of the unit cube $[0,1]^3$ under $T(\\mathbf{x}) = A\\mathbf{x}$, where $A = \\begin{bmatrix} 0 & 2 & 1 \\\\ 3 & 1 & -1 \\\\ 0 & 0 & 5 \\end{bmatrix}$.",
    options: ["$-30$", "$6$", "$150$", "$30$", NOTA],
    answer: 3,
    solution:
      "Expand along row 3 (one nonzero entry, sign $+$): $\\det A = 5\\begin{vmatrix}0&2\\\\3&1\\end{vmatrix} = 5(0 - 6) = -30$.\nThe unit cube has volume 1, so the image has volume $|\\det A|\\cdot1 = 30$. $-30$ forgets the absolute value; $6$ is the $2\\times2$ minor alone.",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "$A = [a_{ij}]$ is a $3\\times3$ matrix with $|A| = 2$. Which of the following statements are correct?\nI. If $b_{ij} = 2^{i+j}a_{ij}$, then $|B| = 2^{13}$.\nII. If $b_{ij} = 2^{i-j}a_{ij}$, then $|B| = 2$.\nIII. If $b_{ij} = 2a_{ij}$, then $|B| = 4$.\nIV. If $b_{ij} = (-1)^{i+j}a_{ij}$, then $|B| = -2$.",
    options: ["I only", "I and II only", "I, II and IV only", "II and III only", "All of the above"],
    answer: 1,
    solution:
      "Let $D = \\operatorname{diag}(2, 4, 8)$, $|D| = 2^6$.\nI. $B = DAD$, $|B| = 2^{12}\\cdot2 = 2^{13}$. Correct.\nII. $B = DAD^{-1}$, $|B| = |A| = 2$. Correct.\nIII. $B = 2A$, $|B| = 2^3\\cdot2 = 16$, not 4. Wrong.\nIV. $B = SAS$ with $S = \\operatorname{diag}(-1, 1, -1)$, $|S|^2 = 1$, so $|B| = 2$. Wrong.\nAnswer: I and II only.",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt: "Find all real $x$ for which $\\begin{bmatrix} x & 2 & 0 \\\\ 2 & x & 2 \\\\ 0 & 2 & x \\end{bmatrix}$ is **not** invertible.",
    options: ["$x = 0$ only", "$x = \\pm2\\sqrt2$ only", "$x = 0$ or $x = \\pm2$", "$x = 0$ or $x = \\pm2\\sqrt2$", NOTA],
    answer: 3,
    solution:
      "Expand along row 1: $\\det = x(x^2 - 4) - 2(2x - 0) + 0 = x^3 - 8x = x(x^2 - 8)$.\nIt vanishes for $x = 0$ and $x^2 = 8$, i.e. $x = \\pm2\\sqrt2$. Forgetting the second term gives $x(x^2-4)$ and the wrong roots $0, \\pm2$.",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "Evaluate $\\begin{vmatrix} 2+a & b & c & d \\\\ a & 2+b & c & d \\\\ a & b & 2+c & d \\\\ a & b & c & 2+d \\end{vmatrix}$.",
    options: ["$8(2+a+b+c+d)$", "$2+a+b+c+d$", "$16+a+b+c+d$", "$(2+a)(2+b)(2+c)(2+d)$", NOTA],
    answer: 0,
    solution:
      "Every row sums to $2 + a + b + c + d$. Add columns 2–4 to column 1 and factor that sum out; column 1 becomes all ones.\nSubtract row 1 from rows 2–4: they become $(0,2,0,0)$, $(0,0,2,0)$, $(0,0,0,2)$. The matrix is upper triangular with diagonal $1, 2, 2, 2$.\nDeterminant $= (2+a+b+c+d)\\cdot 2^3 = 8(2+a+b+c+d)$. (With 1's on the diagonal instead of 2's the factor $2^3$ becomes 1.)",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt:
      "Consider the system $x_1 + 2x_2 - x_3 = 2$, $\\ 2x_1 - x_2 + x_3 = 3$, $\\ x_1 + x_2 + 2x_3 = 7$. By Cramer's rule, $x_3 =$",
    options: ["$-\\tfrac{13}{6}$", "$-26$", "$\\tfrac{3}{2}$", "$\\tfrac{13}{6}$", NOTA],
    answer: 3,
    solution:
      "$|A| = \\begin{vmatrix}1&2&-1\\\\2&-1&1\\\\1&1&2\\end{vmatrix} = 1(-2-1) - 2(4-1) + (-1)(2+1) = -3 - 6 - 3 = -12$.\nReplace column 3 by $\\mathbf{b}$: $|A_3| = \\begin{vmatrix}1&2&2\\\\2&-1&3\\\\1&1&7\\end{vmatrix} = 1(-7-3) - 2(14-3) + 2(2+1) = -10 - 22 + 6 = -26$.\n$x_3 = -26/(-12) = \\tfrac{13}{6}$. ($\\tfrac32$ is $x_2$; $-26$ forgets to divide.)",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix with $|A| = 3$. Find $|\\operatorname{adj}(2A)|$.",
    options: ["$72$", "$36$", "$576$", "$18$", NOTA],
    answer: 2,
    solution:
      "For any invertible $n\\times n$ matrix $M$, $|\\operatorname{adj}M| = |M|^{n-1}$. With $M = 2A$: $|2A| = 2^3\\cdot3 = 24$, so $|\\operatorname{adj}(2A)| = 24^2 = 576$.\n(Equivalently $\\operatorname{adj}(2A) = 2^{2}\\operatorname{adj}A$, so $|\\operatorname{adj}(2A)| = (2^2)^3|A|^2 = 64\\cdot9 = 576$.)",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $|A| = 2$ and $|B| = -\\tfrac12$. Find $|2A^TB^{-1}A^{-2}|$.",
    options: ["$8$", "$-2$", "$-8$", "$-128$", NOTA],
    answer: 2,
    solution:
      "$|2A^TB^{-1}A^{-2}| = 2^3\\cdot|A|\\cdot\\dfrac{1}{|B|}\\cdot\\dfrac{1}{|A|^2} = 8\\cdot2\\cdot(-2)\\cdot\\tfrac14 = -8$.\n$-2$ uses $|2X| = 2|X|$; $-128$ treats $A^{-2}$ as $A^2$.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times3$ real matrix with $A^T = -A$. Which of the following statements are correct?\nI. $|A| = 0$.\nII. $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution.\nIII. $|A^2| = 0$.\nIV. $|A + A^T| = 0$.",
    options: ["I only", "I and II only", "I, II and III only", "II and IV only", "All of the above"],
    answer: 4,
    solution:
      "I: $|A| = |A^T| = |-A| = (-1)^3|A|$, so $|A| = 0$. II: $|A| = 0$ means $A$ is singular, so nontrivial solutions exist. III: $|A^2| = |A|^2 = 0$. IV: $A + A^T = 0$, the zero matrix, whose determinant is 0.\nAll four are correct.",
  },
  {
    subtopic: "Row & column operations",
    kind: "mcq",
    prompt:
      "$A = [\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3\\ \\mathbf{a}_4]$ is a $4\\times4$ matrix with $|A| = 5$. Find $\\left|[\\,\\mathbf{a}_1 + 2\\mathbf{a}_3\\ \\ \\ \\mathbf{a}_4\\ \\ \\ 3\\mathbf{a}_2\\ \\ \\ \\mathbf{a}_3 - \\mathbf{a}_1\\,]\\right|$.",
    options: ["$15$", "$-45$", "$45$", "$-15$", NOTA],
    answer: 2,
    solution:
      "$B = AM$ with $M = \\begin{bmatrix}1&0&0&-1\\\\0&0&3&0\\\\2&0&0&1\\\\0&1&0&0\\end{bmatrix}$ (column $j$ = coefficients of column $j$ of $B$).\nExpand along row 2 ($3$ at $(2,3)$, sign $-$) and then row 3 of the remaining matrix: $|M| = -3\\begin{vmatrix}1&0&-1\\\\2&0&1\\\\0&1&0\\end{vmatrix} = -3\\cdot(-1)\\begin{vmatrix}1&-1\\\\2&1\\end{vmatrix} = 3\\cdot3 = 9$.\n$|B| = 5\\cdot9 = 45$. (Columns 1 and 4 together contribute $\\begin{vmatrix}1&-1\\\\2&1\\end{vmatrix} = 3$, not 1: they are not a pure replacement of each other.)",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix} 1 & 2 \\\\ -1 & 3 \\end{bmatrix}$. Find the area of the image under $T$ of the triangle with vertices $(0,0)$, $(2,1)$ and $(1,3)$.",
    options: ["$\\tfrac{25}{2}$", "$25$", "$\\tfrac52$", "$5$", NOTA],
    answer: 0,
    solution:
      "Triangle area: $\\tfrac12\\left|\\det\\begin{bmatrix}2&1\\\\1&3\\end{bmatrix}\\right| = \\tfrac12(6-1) = \\tfrac52$.\n$\\det A = 3 + 2 = 5$, so the image has area $5\\cdot\\tfrac52 = \\tfrac{25}{2}$. Forgetting the $\\tfrac12$ gives 25.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $|AB| = 6$ and $|A| = -2$. Then $|B^T| = -3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution: "$|AB| = |A||B|$ gives $|B| = 6/(-2) = -3$, and $|B^T| = |B| = -3$. **True**.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with $A^2 = 4I$. Then $|A| = 8$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$|A|^2 = |4I| = 4^3 = 64$, so $|A| = \\pm8$. $A = 2I$ gives $8$; $A = \\operatorname{diag}(2, 2, -2)$ also satisfies $A^2 = 4I$ but has $|A| = -8$. The sign cannot be determined: **Not enough information**.",
  },
  {
    subtopic: "Row & column operations",
    kind: "tfn",
    prompt:
      "$A$ is $3\\times3$ with $|A| = 2$. $B$ is obtained from $A$ by adding 4 times column 1 to column 3, then interchanging columns 1 and 2, then multiplying column 3 by $-3$. Then $|B| = -6$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Column operations act like row operations: replacement $\\times1$, interchange $\\times(-1)$, scaling by $-3$ gives $\\times(-3)$.\n$|B| = 2\\cdot(-1)\\cdot(-3) = 6 \\ne -6$. **False**.",
  },
  {
    subtopic: "Invertibility",
    kind: "mcq",
    prompt:
      "The system $kx_1 + x_2 = 1$, $\\ x_1 + kx_2 + x_3 = 0$, $\\ x_2 + kx_3 = 2$ has a unique solution for all real $k$ except how many values?",
    options: ["$0$", "$1$", "$2$", "$3$", "Infinitely many"],
    answer: 3,
    solution:
      "Unique solution $\\iff \\det A \\ne 0$ for $A = \\begin{bmatrix}k&1&0\\\\1&k&1\\\\0&1&k\\end{bmatrix}$.\n$\\det A = k(k^2 - 1) - 1(k - 0) = k^3 - 2k = k(k^2 - 2)$, which is zero for $k = 0, \\sqrt2, -\\sqrt2$: **three** values.",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "Let $A$ and $B$ be $3\\times3$ matrices. Which of the following statements are always correct?\nI. $|AB| = |BA|$\nII. $|A + B| = |A| + |B|$\nIII. $|A^TB| = |A|\\,|B|$\nIV. $|2A| = 8|A|$",
    options: ["I and III only", "I, III and IV only", "I, II and IV only", "III and IV only", "All of the above"],
    answer: 1,
    solution:
      "I: both equal $|A||B|$. III: $|A^T||B| = |A||B|$. IV: $|2A| = 2^3|A|$.\nII fails, e.g. $A = B = I$: $|2I| = 8 \\ne 2$. Answer: I, III and IV only.",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "Evaluate $\\det A$ for $A = \\begin{bmatrix} 0 & 3 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & -2 & 0 \\\\ 0 & 0 & 0 & 0 & 1 \\\\ 4 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 5 & 0 & 0 \\end{bmatrix}$.",
    options: ["$-120$", "$0$", "$-24$", "$120$", NOTA],
    answer: 3,
    solution:
      "One nonzero entry per row and column: $\\det A = \\pm\\,3\\cdot(-2)\\cdot1\\cdot4\\cdot5 = \\pm(-120)$.\nRow $i$ uses column $2, 4, 5, 1, 3$. Cycles: $1\\to2\\to4\\to1$ (two swaps) and $3\\to5\\to3$ (one swap), three swaps in total, sign $-1$.\n$\\det A = (-1)(-120) = 120$. (Check by expanding along row 4: $4\\cdot(-1)^{4+1}$ times a $4\\times4$, and so on.)",
  },
  {
    subtopic: "Special patterns",
    kind: "mcq",
    prompt:
      "For which values of $x$ are the vectors $(1, x, x^2)$, $(1, -1, 1)$, $(1, 2, 4)$ linearly dependent?",
    options: ["$x = 1$ or $x = -2$", "$x = -1$, $x = 0$ or $x = 2$", "$x = -1$ or $x = 2$", "No real $x$", NOTA],
    answer: 2,
    solution:
      "Stack them as rows of a Vandermonde matrix with nodes $x, -1, 2$: $\\det = (-1 - x)(2 - x)(2 - (-1)) = 3(-1-x)(2-x)$.\nThe vectors are dependent iff the determinant is 0, i.e. $x = -1$ or $x = 2$ (exactly when $(1,x,x^2)$ coincides with one of the other rows).",
  },
  {
    subtopic: "Row reduction & triangular",
    kind: "mcq",
    prompt:
      "Find $\\det A$ for $A = \\begin{bmatrix} 1 & 2 & -1 & 3 \\\\ 2 & 5 & 0 & 4 \\\\ -1 & 1 & 4 & 2 \\\\ 3 & 6 & -3 & 10 \\end{bmatrix}$.",
    options: ["$3$", "$-9$", "$0$", "$9$", NOTA],
    answer: 4,
    solution:
      "$R_2 - 2R_1 = (0,1,2,-2)$, $R_3 + R_1 = (0,3,3,5)$, $R_4 - 3R_1 = (0,0,0,1)$.\nThen $R_3 - 3R_2 = (0,0,-3,11)$. The matrix is now upper triangular with diagonal $1, 1, -3, 1$ (no interchanges).\n$\\det A = 1\\cdot1\\cdot(-3)\\cdot1 = -3$, which is not listed: **None of the above**. ($3$ drops the sign of the pivot $-3$.)",
  },
  {
    subtopic: "Determinant algebra",
    kind: "mcq",
    prompt:
      "$Q$ is a $3\\times3$ matrix with $Q^TQ = I$, and $A$ is a $3\\times3$ matrix with $|A| = 3$. Find $|2Q^TA^{-1}Q|$.",
    options: ["$\\tfrac83$", "$\\pm\\tfrac83$", "$\\tfrac23$", "$24$", NOTA],
    answer: 0,
    solution:
      "$|2Q^TA^{-1}Q| = 2^3\\,|Q^T|\\,\\tfrac13\\,|Q| = 8\\cdot\\tfrac13\\cdot|Q|^2$. Although $|Q| = \\pm1$ is undetermined, $|Q^T||Q| = |Q|^2 = 1$ either way.\nSo the value is exactly $\\tfrac83$; \"$\\pm$\" is the trap.",
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
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "The parallelepiped with one vertex at the origin and adjacent vertices $(1, k, 0)$, $(0, 1, k)$, $(k, 0, 1)$ has volume 9. Find all possible real $k$.",
    options: ["$k = 2$ only", "$k = \\pm2$", "$k = -2$ or $k = \\sqrt[3]{10}$", "$k = 2$ or $k = -\\sqrt[3]{10}$", NOTA],
    answer: 3,
    solution:
      "$\\det\\begin{bmatrix}1&k&0\\\\0&1&k\\\\k&0&1\\end{bmatrix} = 1(1 - 0) - k(0 - k^2) + 0 = 1 + k^3$.\nVolume $= |1 + k^3| = 9$: either $k^3 = 8$ ($k = 2$) or $k^3 = -10$ ($k = -\\sqrt[3]{10}$). Forgetting the absolute value loses the second solution.",
  },
  {
    subtopic: "Cramer's rule & adjugate",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 1 & 3 & 1 \\\\ 1 & 0 & 2 \\end{bmatrix}$. The $(3,1)$ entry of $A^{-1}$ is",
    options: ["$\\tfrac{1}{11}$", "$-\\tfrac{3}{11}$", "$\\tfrac{3}{11}$", "$-3$", NOTA],
    answer: 1,
    solution:
      "$|A| = 2(6 - 0) - 1(2 - 1) + 0 = 11$.\n$(A^{-1})_{31} = C_{13}/|A|$, and $C_{13} = (+1)\\begin{vmatrix}1&3\\\\1&0\\end{vmatrix} = -3$. So the entry is $-\\tfrac{3}{11}$.\n$\\tfrac{1}{11} = C_{31}/|A|$ is the $(1,3)$ entry (transpose trap).",
  },
];
