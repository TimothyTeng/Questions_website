import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";
const ALL = "All of the above";
const m3 = (rows: (string | number)[][]) => `$\\begin{bmatrix} ${rows.map((r) => r.join(" & ")).join(" \\\\ ")} \\end{bmatrix}$`;
const m2 = (rows: (string | number)[][]) => m3(rows);

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const matrixAlgebraExam: ConceptQuestion[] = [
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt:
      "Let $A$, $B$, $X$ and $Y$ be $n\\times n$ matrices with $A$ and $B$ invertible, such that\n$$B^{-1}(X - 2Y)A = B^{-1}A^2.$$\nThen $X = $",
    options: ["$A^2 + 2Y$", "$A - 2Y$", "$A + 2Y$", "$BA + 2Y$", NOTA],
    answer: 2,
    solution:
      "Left-multiply by $B$: $(X - 2Y)A = A^2$. Right-multiply by $A^{-1}$: $X - 2Y = A^2A^{-1} = A$. Hence $X = A + 2Y$.\nTrap: $A^2 + 2Y$ forgets to cancel the $A$ on the right; $BA + 2Y$ cancels $B^{-1}$ on the wrong side.",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt:
      "Let $A$, $B$, $X$ be $n\\times n$ matrices such that $A$, $X$ and $XA - A$ are invertible, and\n$$(XA - A)^{-1} = BX^{-1}.$$\nWhich of the following is $X$?",
    options: ["$(A - B^{-1})^{-1}A$", "$A(A - B)^{-1}$", "$A(A + B^{-1})^{-1}$", "$A(A - B^{-1})^{-1}$", NOTA],
    answer: 3,
    solution:
      "$BX^{-1}$ equals the inverse of a matrix, so it is invertible and therefore $B$ is invertible. Invert both sides: $XA - A = (BX^{-1})^{-1} = XB^{-1}$.\nCollect $X$ on the left: $XA - XB^{-1} = A$, i.e. $X(A - B^{-1}) = A$.\n$A - B^{-1} = X^{-1}A$ is a product of invertible matrices, so it is invertible, and multiplying on the **right** by its inverse gives $X = A(A - B^{-1})^{-1}$.\nTrap: $(A - B^{-1})^{-1}A$ multiplies on the wrong side ($X$ is on the left of $A - B^{-1}$).",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "Let $A$ and $B$ be $n\\times n$ matrices with $A$ invertible, such that $A^5 = A^2BA^2 - 3A^4$. Then $B = $",
    options: ["$A - 3I$", "$A + 3I$", "$A^2 + 3A$", "$3I - A$", NOTA],
    answer: 1,
    solution:
      "Multiply on the left by $A^{-2}$: $A^3 = BA^2 - 3A^2$. Multiply on the right by $A^{-2}$: $A = B - 3I$. So $B = A + 3I$.\nEach $A^2$ around $B$ must be removed from its own side: $A^{-2}$ on the left for the left factor, on the right for the right factor.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt:
      "Let $A$, $B$, $C$ be $n\\times n$ matrices such that $B(A - C)A^T$ is invertible. Which of the following statements must be true?\nI. $A$ is invertible.\nII. $A - C$ is invertible.\nIII. $B$ is invertible.\nIV. $C$ is invertible.",
    options: ["I and II only", "I and III only", "II and III only", "I, II and III only", ALL],
    answer: 3,
    solution:
      "For square matrices, if a product is invertible then **every factor** is invertible (if a factor $F$ had $F\\mathbf{x} = \\mathbf{0}$ for some $\\mathbf{x}\\ne\\mathbf{0}$, a suitable vector would be sent to $\\mathbf{0}$ by the whole product). So $B$, $A - C$ and $A^T$ are invertible, and $A^T$ invertible $\\iff A$ invertible. I, II, III hold.\nIV need not: $A = B = I$, $C = 0$ gives $B(A-C)A^T = I$ invertible while $C = 0$ is not.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "Let $A$ and $B$ be invertible $n\\times n$ matrices ($n\\ge 2$). Which of the following is **false**?",
    options: [
      "$(AB)^{-1} = B^{-1}A^{-1}$",
      "$(A^T)^{-1} = (A^{-1})^T$",
      "$(2A)^{-1} = 2A^{-1}$",
      "$(A^2)^{-1} = (A^{-1})^2$",
      "$(A^{-1})^{-1} = A$",
    ],
    answer: 2,
    solution:
      "$(2A)\\left(\\tfrac12A^{-1}\\right) = I$, so $(2A)^{-1} = \\tfrac12A^{-1}$, not $2A^{-1}$ (indeed $(2A)(2A^{-1}) = 4I$). All the other identities are standard: reverse order for products, transpose and inverse commute, $(A^2)^{-1} = A^{-1}A^{-1}$, and $A$ is the inverse of $A^{-1}$.",
  },
  {
    subtopic: "Gauss–Jordan",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 2 & -1 \\\\ 0 & 1 & 2 \\\\ 2 & 3 & -3 \\end{bmatrix}$. By row reducing $[A \\mid I]$, $A^{-1} = $",
    options: [
      m3([[-9, 3, 5], [4, -1, -2], [-2, 1, 1]]),
      m3([[-9, 4, -2], [3, -1, 1], [5, -2, 1]]),
      m3([[9, -3, -5], [-4, 1, 2], [2, -1, -1]]),
      m3([[-9, 3, 5], [4, -1, -2], [2, -1, -1]]),
      NOTA,
    ],
    answer: 0,
    solution:
      "$[A \\mid I]$: $R_3 \\to R_3 - 2R_1$ gives $[0, -1, -1 \\mid -2, 0, 1]$; $R_3 \\to R_3 + R_2$ gives $[0, 0, 1 \\mid -2, 1, 1]$.\nNow clear column 3: $R_2 \\to R_2 - 2R_3$ gives $[0,1,0 \\mid 4, -1, -2]$; $R_1 \\to R_1 + R_3$ gives $[1, 2, 0 \\mid -1, 1, 1]$.\nClear column 2: $R_1 \\to R_1 - 2R_2$ gives $[1,0,0 \\mid -9, 3, 5]$.\n$$A^{-1} = \\begin{bmatrix} -9 & 3 & 5 \\\\ 4 & -1 & -2 \\\\ -2 & 1 & 1 \\end{bmatrix}.$$\nCheck: row 1 of $A$ times column 1 of $A^{-1}$ is $-9 + 8 + 2 = 1$ ✓. The second option is the transpose.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt:
      "Which of the following statements are correct?\nI. If $E$ is the $3\\times 3$ elementary matrix that adds $3$ times row 1 to row 3, then $E^4$ adds $12$ times row 1 to row 3.\nII. An elementary matrix that interchanges two rows is its own inverse.\nIII. The product of two elementary matrices is always an elementary matrix.\nIV. Every invertible $n\\times n$ matrix is a product of elementary matrices.",
    options: ["I and II only", "II and IV only", "I, II and IV only", "I, III and IV only", ALL],
    answer: 2,
    solution:
      "I: each application adds another $3\\times$row 1 (row 1 never changes), so $E^4$ adds $12\\times$row 1. **True**.\nII: swapping the same rows twice gives back $I$, so $E^2 = I$. **True**.\nIII: **False**. E.g. (swap $R_1,R_2$)(scale $R_1$ by 2) $= \\begin{bmatrix}0&1\\\\2&0\\end{bmatrix}$, which is not one row operation away from $I$.\nIV: $A$ invertible $\\Rightarrow E_k\\cdots E_1A = I \\Rightarrow A = E_1^{-1}\\cdots E_k^{-1}$, a product of elementary matrices. **True**.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt:
      "A $3\\times 3$ matrix $A$ is reduced to $I_3$ by the following row operations, in this order:\n(1) $R_3 \\to R_3 - 2R_1$; (2) $R_2 \\leftrightarrow R_3$; (3) $R_1 \\to R_1 - 3R_2$.\nWhat is $A$?",
    options: [
      m3([[7, 0, -3], [-2, 0, 1], [0, 1, 0]]),
      m3([[1, -3, 0], [0, 0, 1], [-2, 7, 0]]),
      m3([[7, 0, 3], [2, 0, 1], [0, 1, 0]]),
      m3([[1, 3, 0], [0, 0, 1], [2, 7, 0]]),
      NOTA,
    ],
    answer: 3,
    solution:
      "With elementary matrices, $E_3E_2E_1A = I$, so $A = (E_3E_2E_1)^{-1} = E_1^{-1}E_2^{-1}E_3^{-1}$. Equivalently, start from $I$ and **undo** the operations in **reverse** order:\n- undo (3), $R_1 \\to R_1 + 3R_2$: rows $(1,3,0), (0,1,0), (0,0,1)$;\n- undo (2), $R_2 \\leftrightarrow R_3$: rows $(1,3,0), (0,0,1), (0,1,0)$;\n- undo (1), $R_3 \\to R_3 + 2R_1$: rows $(1,3,0), (0,0,1), (2,7,0)$.\nSo $A = \\begin{bmatrix}1&3&0\\\\0&0&1\\\\2&7&0\\end{bmatrix}$. Check: $R_3 - 2R_1 = (0,1,0)$, swap gives $(1,3,0),(0,1,0),(0,0,1)$, then $R_1 - 3R_2$ gives $I$ ✓.\nThe first option is $E_3E_2E_1 = A^{-1}$.",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 2 & 1 & 0 & 3 \\\\ -4 & 1 & 1 & -7 \\\\ 6 & 0 & 1 & 14 \\end{bmatrix}$. In the LU factorization $A = LU$ (no row interchanges), with $L$ unit lower triangular and $U$ an echelon form, $L = $",
    options: [
      m3([[1, 0, 0], [2, 1, 0], [-3, 1, 1]]),
      m3([[1, 0, 0], [-2, 1, 0], [3, -1, 1]]),
      m3([[1, 0, 0], [-2, 1, 0], [3, 0, 1]]),
      m3([[1, 0, 0], [-2, 1, 0], [3, 1, 1]]),
      NOTA,
    ],
    answer: 1,
    solution:
      "Column 1: $R_2 \\to R_2 - (-2)R_1$ gives $[0, 3, 1, -1]$; $R_3 \\to R_3 - 3R_1$ gives $[0, -3, 1, 5]$. So $\\ell_{21} = -2$, $\\ell_{31} = 3$.\nColumn 2: $R_3 \\to R_3 - (-1)R_2$ gives $[0, 0, 2, 4]$, so $\\ell_{32} = -1$ (from the **updated** entries $-3/3$, not from the original $0/1$).\n$$L = \\begin{bmatrix}1&0&0\\\\-2&1&0\\\\3&-1&1\\end{bmatrix},\\quad U = \\begin{bmatrix}2&1&0&3\\\\0&3&1&-1\\\\0&0&2&4\\end{bmatrix}.$$\nThe first option has all multipliers negated; the third uses $\\ell_{32} = a_{32}/a_{22} = 0$ from the original $A$.",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt:
      "Given $A = LU$ with $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ -1 & 1 & 0 \\\\ 2 & -3 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 1 & 2 & -1 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 3 \\end{bmatrix}$, solve $A\\mathbf{x} = \\mathbf{b}$ where $\\mathbf{b} = [-1,\\ 0,\\ 4]^T$.",
    options: ["$[-1,\\ -1,\\ 3]^T$", "$[-1,\\ 1,\\ -1]^T$", "$\\left[\\frac53,\\ -\\frac23,\\ \\frac43\\right]^T$", "$[-2,\\ 1,\\ -1]^T$", NOTA],
    answer: 4,
    solution:
      "Forward substitution, $L\\mathbf{y} = \\mathbf{b}$: $y_1 = -1$; $-y_1 + y_2 = 0 \\Rightarrow y_2 = -1$; $2y_1 - 3y_2 + y_3 = 4 \\Rightarrow y_3 = 4 + 2 - 3 = 3$.\nBack substitution, $U\\mathbf{x} = \\mathbf{y} = [-1,-1,3]^T$: $3x_3 = 3 \\Rightarrow x_3 = 1$; $2x_2 + 1 = -1 \\Rightarrow x_2 = -1$; $x_1 - 2 - 1 = -1 \\Rightarrow x_1 = 2$.\nSo $\\mathbf{x} = [2, -1, 1]^T$, which is not listed: **None of the above**. Option (a) is $\\mathbf{y}$; (b) is the $\\mathbf{y}$ obtained by flipping the signs of the multipliers; (c) skips the $L$ step; (d) is $-\\mathbf{x}$.",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "Let $A = PDP^{-1}$ where $P = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$ and $D = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$. Then $A^{101} = $",
    options: ["$I$", m2([[3, -4], [2, -3]]), m2([[-3, 4], [-2, 3]]), m2([[3, 2], [-4, -3]]), NOTA],
    answer: 1,
    solution:
      "$A^{101} = PD^{101}P^{-1}$ and $D^{101} = \\operatorname{diag}(1^{101}, (-1)^{101}) = D$, so $A^{101} = A$.\n$P^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}$ ($\\det P = 1$), $PD = \\begin{bmatrix}2&-1\\\\1&-1\\end{bmatrix}$, and $A = PDP^{-1} = \\begin{bmatrix}3&-4\\\\2&-3\\end{bmatrix}$.\n(Check: $A^2 = I$, so odd powers give $A$ and even powers give $I$.)",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "Let $A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ and $D = \\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\end{bmatrix}$. For every positive integer $k$, the $(1,2)$ entry of $A^k$ is",
    options: ["$1 - 3^k$", "$3^k - 1$", "$-3^k$", "$3^k$", NOTA],
    answer: 0,
    solution:
      "$P^{-1} = \\begin{bmatrix}1&-1\\\\0&1\\end{bmatrix}$ and\n$$A^k = PD^kP^{-1} = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}\\begin{bmatrix}3^k&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&-1\\\\0&1\\end{bmatrix} = \\begin{bmatrix}3^k & 1\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&-1\\\\0&1\\end{bmatrix} = \\begin{bmatrix}3^k & 1 - 3^k\\\\0&1\\end{bmatrix}.$$\nCheck with $k = 1$: $A = \\begin{bmatrix}3&-2\\\\0&1\\end{bmatrix}$ and $1 - 3 = -2$ ✓. Using $P^{-1}D^kP$ instead flips the sign.",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "mcq",
    prompt:
      "Let $A$ be an $n\\times n$ matrix with $A^3 = 0$. Which of the following statements are correct?\nI. $I - A$ is invertible.\nII. $A$ is invertible.\nIII. $A^2 + A + I$ is invertible.\nIV. $(I + A)^{-1} = I + A + A^2$.",
    options: ["I only", "I and III only", "I, III and IV only", "II and IV only", ALL],
    answer: 1,
    solution:
      "I: $(I - A)(I + A + A^2) = I - A^3 = I$. **True**.\nII: $A$ invertible would make $A^3$ invertible, but $A^3 = 0$. **False**.\nIII: the same identity shows $I + A + A^2$ has inverse $I - A$. **True**.\nIV: $(I + A)(I + A + A^2) = I + 2A + 2A^2 \\ne I$ in general; the correct inverse is $I - A + A^2$. **False**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt:
      "Let $A$ be a $4\\times 4$ matrix such that $A\\mathbf{x} = \\mathbf{b}$ has a **unique** solution for some $\\mathbf{b}\\in\\mathbb{R}^4$. Which of the following statements are correct?\nI. $A$ is invertible.\nII. $A^2\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.\nIII. The rows of $A$ are linearly dependent.\nIV. $A^T$ is invertible.",
    options: ["I and II only", "I, II and III only", "I and IV only", "I, II and IV only", ALL],
    answer: 3,
    solution:
      "If $\\mathbf{p}$ is the unique solution and $A\\mathbf{v} = \\mathbf{0}$, then $\\mathbf{p} + \\mathbf{v}$ is also a solution, so $\\mathbf{v} = \\mathbf{0}$: $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. $A$ is square, so by the IMT $A$ is invertible (I). Then $A^2$ and $A^T$ are invertible (II, IV), and the rows of $A$ (columns of $A^T$) are independent, so III is **false**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt:
      "Let $A$ be a $5\\times 3$ matrix such that $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Which of the following statements are correct?\nI. The columns of $A$ are linearly independent.\nII. $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^5$.\nIII. $A^TA$ is invertible.\nIV. There is a $3\\times 5$ matrix $C$ with $CA = I_3$.",
    options: ["I only", "I and III only", "I and II only", "I, II and III only", "I, III and IV only"],
    answer: 4,
    solution:
      "I: only the trivial solution $\\iff$ independent columns. **True**.\nII: $\\operatorname{rank}A = 3 < 5$, so the columns cannot span $\\mathbb{R}^5$. **False** (the IMT needs a square matrix).\nIII: if $A^TA\\mathbf{x} = \\mathbf{0}$ then $\\mathbf{x}^TA^TA\\mathbf{x} = \\|A\\mathbf{x}\\|^2 = 0$, so $A\\mathbf{x} = \\mathbf{0}$ and $\\mathbf{x} = \\mathbf{0}$. The $3\\times3$ matrix $A^TA$ is invertible. **True**.\nIV: $C = (A^TA)^{-1}A^T$ satisfies $CA = I_3$ (a left inverse). **True**.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt:
      "Let $A$ and $B$ be $n\\times n$ matrices. Which of the following statements are correct?\nI. If the columns of $B$ are linearly dependent, then so are the columns of $AB$.\nII. If the columns of $A$ are linearly dependent, then so are the columns of $AB$.\nIII. If the columns of $A$ are linearly independent, then the columns of $A^2$ span $\\mathbb{R}^n$.\nIV. If $AB = I$, then $BA = I$.",
    options: ["I only", "I and III only", "I, III and IV only", "II and IV only", ALL],
    answer: 4,
    solution:
      "I: $B\\mathbf{x} = \\mathbf{0}$ with $\\mathbf{x}\\ne\\mathbf{0}$ gives $AB\\mathbf{x} = \\mathbf{0}$. **True**.\nII: for **square** matrices, dependent columns of $A$ mean $A$ is singular, so $AB$ is singular (if $AB$ were invertible, $A$ would be too), so its columns are dependent. **True** here (it can fail for non-square shapes).\nIII: independent columns of a square $A$ make $A$ invertible, so $A^2$ is invertible and its columns span $\\mathbb{R}^n$ (tutorial 2 Q5). **True**.\nIV: square one-sided inverses are two-sided. **True**. So **all** of them.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "An $n\\times n$ matrix $A$ satisfies $A^2 + 2A - 3I = 0$. Then $A^{-1} = $",
    options: ["$\\frac13(A - 2I)$", "$-\\frac13(A + 2I)$", "$3(A + 2I)$", "$\\frac13(2I - A)$", NOTA],
    answer: 4,
    solution:
      "$A^2 + 2A = 3I \\Rightarrow A(A + 2I) = 3I \\Rightarrow A\\cdot\\tfrac13(A + 2I) = I$. Since $A$ commutes with $A + 2I$, this is a two-sided inverse: $A^{-1} = \\tfrac13(A + 2I)$, which is not listed. **None of the above**.\nThe nonzero constant term $-3I$ is what guarantees invertibility.",
  },
  {
    subtopic: "Block matrices",
    kind: "mcq",
    prompt:
      "Let $B = \\begin{bmatrix} 2 & 1 \\\\ -1 & 3 \\end{bmatrix}$ and $M = \\begin{bmatrix} I_2 & B \\\\ 0 & I_2 \\end{bmatrix}$ (a $4\\times4$ block matrix). Then $M^{-3} = \\begin{bmatrix} I_2 & X \\\\ 0 & I_2 \\end{bmatrix}$, where $X = $",
    options: [m2([[-6, -3], [3, -9]]), m2([[6, 3], [-3, 9]]), m2([[-6, 3], [-3, -9]]), "$-B^3 = \\begin{bmatrix} -1 & -18 \\\\ 18 & -19 \\end{bmatrix}$", NOTA],
    answer: 0,
    solution:
      "Block multiplication: $\\begin{bmatrix}I&X\\\\0&I\\end{bmatrix}\\begin{bmatrix}I&Y\\\\0&I\\end{bmatrix} = \\begin{bmatrix}I&X+Y\\\\0&I\\end{bmatrix}$, so the upper-right blocks add. Hence $M^{-1}$ has block $-B$ and $M^{-3} = (M^{-1})^3$ has block $-3B = \\begin{bmatrix}-6&-3\\\\3&-9\\end{bmatrix}$.\n$3B$ forgets the inverse; the third option is $-3B^T$; $-B^3$ treats the block like a scalar power.",
  },
  {
    subtopic: "Solution structure",
    kind: "mcq",
    prompt:
      "A $3\\times 4$ matrix $A$ and $\\mathbf{b}\\in\\mathbb{R}^3$ are such that $\\mathbf{x}_1 = [1,\\ 0,\\ 2,\\ -1]^T$ solves $A\\mathbf{x} = \\mathbf{b}$, and the solution set of $A\\mathbf{x} = \\mathbf{0}$ is $\\operatorname{Span}\\{[1,1,0,0]^T,\\ [0,1,-1,1]^T\\}$. Which of the following is also a solution of $A\\mathbf{x} = \\mathbf{b}$?",
    options: ["$[1,\\ 2,\\ -1,\\ 1]^T$", "$[2,\\ 1,\\ 2,\\ 1]^T$", "$[1,\\ 0,\\ 2,\\ 1]^T$", "$[3,\\ 1,\\ 3,\\ -2]^T$", NOTA],
    answer: 3,
    solution:
      "Every solution is $\\mathbf{x}_1 + \\mathbf{x}_0$ with $\\mathbf{x}_0 \\in \\operatorname{Nul}A$ (tutorial 2 Q4b), so test whether $\\mathbf{x} - \\mathbf{x}_1 = c_1[1,1,0,0]^T + c_2[0,1,-1,1]^T$, i.e. $[c_1,\\ c_1 + c_2,\\ -c_2,\\ c_2]$.\n- $[3,1,3,-2] - \\mathbf{x}_1 = [2, 1, 1, -1]$: $c_1 = 2$, $c_2 = -1$, and indeed $c_1 + c_2 = 1$, $-c_2 = 1$ ✓.\n- $[1,2,-1,1] - \\mathbf{x}_1 = [0,2,-3,2]$: $c_1 = 0$, $c_2 = 2$ needs third entry $-2 \\ne -3$. ✗ (It is the sum of the two null-space vectors, a solution of $A\\mathbf{x} = \\mathbf{0}$.)\n- $[2,1,2,1] - \\mathbf{x}_1 = [1,1,0,2]$: $c_1 = 1$, $c_2 = 0$ needs last entry 0. ✗\n- $[1,0,2,1] - \\mathbf{x}_1 = [0,0,0,2]$: $c_1 = c_2 = 0$ needs last entry 0. ✗",
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt:
      "An invertible $3\\times3$ matrix $A$ has $A^{-1} = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & -1 \\\\ 3 & 0 & 1 \\end{bmatrix}$. The solution of $A^T\\mathbf{y} = [1,\\ 1,\\ 1]^T$ is",
    options: ["$[3,\\ 0,\\ 4]^T$", "$[-4,\\ -3,\\ 0]^T$", "$[4,\\ 3,\\ 0]^T$", "$[4,\\ 0,\\ 3]^T$", NOTA],
    answer: 2,
    solution:
      "$(A^T)^{-1} = (A^{-1})^T$, so $\\mathbf{y} = (A^{-1})^T[1,1,1]^T$, whose entries are the **column** sums of $A^{-1}$: $1 + 0 + 3 = 4$, $2 + 1 + 0 = 3$, $0 - 1 + 1 = 0$. So $\\mathbf{y} = [4, 3, 0]^T$.\nTrap: $A^{-1}[1,1,1]^T = [3, 0, 4]^T$ (row sums) solves $A\\mathbf{x} = [1,1,1]^T$ instead.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "Let $A$ and $B$ be $3\\times3$ matrices with $AB = 0$ and $B \\ne 0$. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $A$ were invertible, then $B = A^{-1}(AB) = A^{-1}0 = 0$, contradicting $B \\ne 0$. So $A$ is **not** invertible. **False**. (A nonzero column of $B$ is a nontrivial solution of $A\\mathbf{x} = \\mathbf{0}$.)",
  },
  {
    subtopic: "Elementary matrices",
    kind: "tfn",
    prompt: "Let $E$ be the elementary matrix obtained by interchanging rows 2 and 3 of $I_3$, and let $A$ be any $3\\times3$ matrix. Then $AE$ is obtained from $A$ by interchanging rows 2 and 3.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Multiplying by $E$ on the **left** ($EA$) performs the row operation. On the **right**, $AE$ has columns $A\\mathbf{e}_1, A\\mathbf{e}_3, A\\mathbf{e}_2$, so it swaps **columns** 2 and 3. For a general $A$ (e.g. $A = \\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$) these differ. **False**.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "Let $A$ be an $n\\times n$ matrix with $A^2 = A$ and $A \\ne I$. Then $A$ is not invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Suppose $A$ were invertible. Multiply $A^2 = A$ by $A^{-1}$: $A = I$, contradicting $A \\ne I$. So $A$ is singular. **True**. (Example: the projection $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$.)",
  },
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "Let $A$ be a $3\\times3$ matrix with $A^3 = 2A$. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$A^3 - 2A = A(A^2 - 2I) = 0$ has no constant term, so it does not force invertibility. $A = 0$ satisfies it and is singular; $A = \\sqrt2\\,I$ satisfies it ($2\\sqrt2 I = 2\\sqrt2 I$) and is invertible. The information is insufficient: **cannot be determined**.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "Let $A$ and $B$ be $n\\times n$ matrices with $A$ invertible and $AB = BA$. Then $A^{-1}B = BA^{-1}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Multiply $AB = BA$ on the left **and** on the right by $A^{-1}$: $A^{-1}(AB)A^{-1} = A^{-1}(BA)A^{-1}$, i.e. $BA^{-1} = A^{-1}B$. **True**: if $B$ commutes with $A$, it commutes with $A^{-1}$.",
  },
];
