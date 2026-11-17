import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";
const ALL = "All of the above";
const m3 = (rows: (string | number)[][]) => `$\\begin{bmatrix} ${rows.map((r) => r.join(" & ")).join(" \\\\ ")} \\end{bmatrix}$`;
const m2 = (rows: (string | number)[][]) => m3(rows);

const PYP = "PYP 2021–24 written papers";

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
    ref: "PYP AY25/26 S2 Q5; Tutorial 2 Q3",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt:
      "Let $A$, $B$, $X$, $Y$ be $n\\times n$ matrices, where $A$ and $B$ are invertible. Suppose\n$$B(X - Y)A^{-1} = B.$$\nWhat is $X$?",
    options: ["$X = A + Y$", "$X = A^{-1} + Y$", "$X = BAB^{-1} + Y$", "$X = Y - A$", "Cannot be determined."],
    answer: 0,
    solution:
      "Left-multiply by $B^{-1}$: $(X - Y)A^{-1} = I$. Right-multiply by $A$: $X - Y = A$. So $X = A + Y$.\nThis is the same method as the past-paper question $A^{-1}(X + Y)B = A^{-1} \\Rightarrow X = B^{-1} - Y$: remove each factor from the side it is on.",
    ref: "PYP AY25/26 S2 Q5",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt:
      "Let $A$, $B$, $X$ be $n\\times n$ matrices such that $A$, $X$ and $XA - A$ are invertible, and\n$$(XA - A)^{-1} = BX^{-1}.$$\nWhich of the following is $X$?",
    options: ["$(A - B^{-1})^{-1}A$", "$A(A - B)^{-1}$", "$A(A + B^{-1})^{-1}$", "$A(A - B^{-1})^{-1}$", NOTA],
    answer: 3,
    solution:
      "$BX^{-1}$ equals the inverse of a matrix, so it is invertible, and $B = (BX^{-1})X$ is invertible. Invert both sides: $XA - A = (BX^{-1})^{-1} = XB^{-1}$.\nCollect $X$ on the left: $XA - XB^{-1} = A$, i.e. $X(A - B^{-1}) = A$.\n$A - B^{-1} = X^{-1}A$ is a product of invertible matrices, so it is invertible, and multiplying on the **right** by its inverse gives $X = A(A - B^{-1})^{-1}$.\nTrap: $(A - B^{-1})^{-1}A$ multiplies on the wrong side ($X$ is on the left of $A - B^{-1}$).",
    ref: "Tutorial 2 Q3",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "Let $A$ and $B$ be $n\\times n$ matrices with $A$ invertible, such that $A^5 = A^2BA^2 - 3A^4$. Then $B = $",
    options: ["$A - 3I$", "$A + 3I$", "$A^2 + 3A$", "$3I - A$", NOTA],
    answer: 1,
    solution:
      "Multiply on the left by $A^{-2}$: $A^3 = BA^2 - 3A^2$. Multiply on the right by $A^{-2}$: $A = B - 3I$. So $B = A + 3I$.\nEach $A^2$ around $B$ must be removed from its own side: $A^{-2}$ on the left for the left factor, on the right for the right factor.",
    ref: `${PYP} (A⁴ = ABA² + 2A³)`,
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt:
      "Let $A$, $B$, $C$ be $n\\times n$ matrices such that $B(A - C)A^T$ is invertible. Which of the following statements must be true?\nI. $A$ is invertible.\nII. $A - C$ is invertible.\nIII. $B$ is invertible.\nIV. $C$ is invertible.",
    options: ["I and II only", "I and III only", "II and III only", "I, II and III only", ALL],
    answer: 3,
    solution:
      "Let $M = B(A - C)A^T$. Then $B\\big((A - C)A^TM^{-1}\\big) = I$, so $B$ is invertible (Theorem 2.4, (9)). Similarly $\\big(M^{-1}B(A - C)\\big)A^T = I$ shows $A^T$ is invertible (8), hence $A$ is invertible (10). Then $A - C = B^{-1}M(A^T)^{-1}$ is a product of invertible matrices. I, II, III hold.\nIV need not: $A = B = I$, $C = 0$ gives $B(A - C)A^T = I$ invertible while $C = 0$ is not.",
    ref: "PYP AY25/26 S2 Q6; Slides 2.2 Theorem 2.4 (alg p10)",
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
      "$(2A)\\left(\\tfrac12A^{-1}\\right) = I$, so $(2A)^{-1} = \\tfrac12A^{-1}$, not $2A^{-1}$ (indeed $(2A)(2A^{-1}) = 4I$). The others are Theorem 2.2: products reverse order, transpose and inverse commute, $(A^2)^{-1} = (AA)^{-1} = A^{-1}A^{-1}$, and $A$ is the inverse of $A^{-1}$.",
    ref: "Slides 2.2 Theorem 2.2 (alg p6); Tutorial 0B Q4",
  },
  {
    subtopic: "Inverse by row reduction",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 2 & -1 \\\\ 0 & 1 & 2 \\\\ 2 & 3 & -3 \\end{bmatrix}$. By row reducing $[A \\;\\; I]$, $A^{-1} = $",
    options: [
      m3([[-9, 3, 5], [4, -1, -2], [-2, 1, 1]]),
      m3([[-9, 4, -2], [3, -1, 1], [5, -2, 1]]),
      m3([[9, -3, -5], [-4, 1, 2], [2, -1, -1]]),
      m3([[-9, 3, 5], [4, -1, -2], [2, -1, -1]]),
      NOTA,
    ],
    answer: 0,
    solution:
      "$[A \\;\\; I]$: $r3 \\leftarrow r3 - 2r1$ gives $[0, -1, -1 \\mid -2, 0, 1]$; $r3 \\leftarrow r3 + r2$ gives $[0, 0, 1 \\mid -2, 1, 1]$.\nClear column 3: $r2 \\leftarrow r2 - 2r3$ gives $[0,1,0 \\mid 4, -1, -2]$; $r1 \\leftarrow r1 + r3$ gives $[1, 2, 0 \\mid -1, 1, 1]$.\nClear column 2: $r1 \\leftarrow r1 - 2r2$ gives $[1,0,0 \\mid -9, 3, 5]$.\n$$A^{-1} = \\begin{bmatrix} -9 & 3 & 5 \\\\ 4 & -1 & -2 \\\\ -2 & 1 & 1 \\end{bmatrix}$$\n(Theorem 2.3). Check: row 1 of $A$ times column 1 of $A^{-1}$ is $-9 + 8 + 2 = 1$ ✓. The second option is the transpose.",
    ref: "Slides 2.2 Theorem 2.3, Exercise 2.2.3 (alg p9)",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt:
      "Which of the following statements are correct?\nI. If $E$ is the $3\\times 3$ elementary matrix that adds $3$ times row 1 to row 3, then $E^4$ adds $12$ times row 1 to row 3.\nII. An elementary matrix that interchanges two rows is its own inverse.\nIII. If $E$ multiplies row 2 of $I_3$ by $5$, then $E^{-1}$ multiplies row 2 of $I_3$ by $-5$.\nIV. If $E$ is the elementary matrix obtained by performing a row operation on $I_3$ and $A$ is $3\\times n$, then $EA$ is $A$ after the same row operation.",
    options: ["I and II only", "II and IV only", "I, II and IV only", "I, III and IV only", ALL],
    answer: 2,
    solution:
      "I: each application adds another $3\\times$row 1 (row 1 never changes), so $E^4$ adds $12\\times$row 1. **True** (compare the past-paper statement about $E^2$).\nII: swapping the same rows twice gives back $I$, so $E^{-1} = E$. **True**.\nIII: the inverse is the elementary matrix of the same type that transforms $E$ back into $I$: multiply row 2 by $\\tfrac15$, not $-5$. **False**.\nIV: this is the statement on alg p8. **True**.",
    ref: `Slides 2.2 Elementary matrices (alg p7–8); ${PYP} (T/F: E adds 3·row 1 to row 2, E²)`,
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt:
      "A $3\\times 3$ matrix $A$ is reduced to $I_3$ by the following row operations, in this order:\n(1) $r3 \\leftarrow r3 - 2r1$; (2) $r2 \\leftrightarrow r3$; (3) $r1 \\leftarrow r1 - 3r2$.\nWhat is $A$?",
    options: [
      m3([[7, 0, -3], [-2, 0, 1], [0, 1, 0]]),
      m3([[1, -3, 0], [0, 0, 1], [-2, 7, 0]]),
      m3([[7, 0, 3], [2, 0, 1], [0, 1, 0]]),
      m3([[1, 3, 0], [0, 0, 1], [2, 7, 0]]),
      NOTA,
    ],
    answer: 3,
    solution:
      "With elementary matrices, $E_3E_2E_1A = I$, so $A = (E_3E_2E_1)^{-1} = E_1^{-1}E_2^{-1}E_3^{-1}$ (Theorem 2.2.2). Equivalently, start from $I$ and **undo** the operations in **reverse** order:\n- undo (3), $r1 \\leftarrow r1 + 3r2$: rows $(1,3,0), (0,1,0), (0,0,1)$;\n- undo (2), $r2 \\leftrightarrow r3$: rows $(1,3,0), (0,0,1), (0,1,0)$;\n- undo (1), $r3 \\leftarrow r3 + 2r1$: rows $(1,3,0), (0,0,1), (2,7,0)$.\nSo $A = \\begin{bmatrix}1&3&0\\\\0&0&1\\\\2&7&0\\end{bmatrix}$. Check: $r3 - 2r1 = (0,1,0)$, swap gives $(1,3,0),(0,1,0),(0,0,1)$, then $r1 - 3r2$ gives $I$ ✓.\nThe first option is $E_3E_2E_1 = A^{-1}$ (Theorem 2.3).",
    ref: "Slides 2.2 Elementary matrices, Theorem 2.3 (alg p7–9); Slides 2.2 Theorem 2.2 (alg p6)",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt:
      "Let $E_1 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ -4 & 0 & 1 \\end{bmatrix}$, $E_2 = \\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ and $E_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$. Then $(E_3E_2E_1)^{-1} = $",
    options: [
      m3([[0, 1, 0], [1, 0, 0], [-20, 0, 5]]),
      m3([[0, 1, 0], [1, 0, 0], ["\\frac45", 0, "\\frac15"]]),
      m3([[0, 1, 0], [1, 0, 0], [0, 4, "\\frac15"]]),
      m3([[0, 1, 0], [1, 0, 0], [0, -4, 5]]),
      NOTA,
    ],
    answer: 2,
    solution:
      "$(E_3E_2E_1)^{-1} = E_1^{-1}E_2^{-1}E_3^{-1}$ (Theorem 2.2.2). The inverses are the elementary matrices that undo each operation: $E_1^{-1}$ adds $4\\times$row 1 to row 3, $E_2^{-1} = E_2$, $E_3^{-1}$ multiplies row 3 by $\\tfrac15$.\n$E_2^{-1}E_3^{-1} = \\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1/5 \\end{bmatrix}$, and $E_1^{-1}$ adds $4\\times$row 1 $= (0, 4, 0)$ to row 3: $\\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 4 & 1/5 \\end{bmatrix}$.\nThe first option is $E_3E_2E_1$ itself; the second is $E_3^{-1}E_2^{-1}E_1^{-1}$ (order not reversed); the fourth is $E_1E_2E_3$.",
    ref: "Slides 2.2 Exercises 2.2.1–2.2.2 (alg p7–8); Slides 2.2 Theorem 2.2 (alg p6)",
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
      "Since $A$ has 3 rows, $L$ is $3\\times3$. Column 1: circled entries $2, -4, 6$ divided by the pivot $2$ give $(1, -2, 3)$. $r2 \\leftarrow r2 + 2r1$ gives $[0, 3, 1, -1]$; $r3 \\leftarrow r3 - 3r1$ gives $[0, -3, 1, 5]$.\nColumn 2: circled entries $3, -3$ (from the **reduced** matrix) divided by the pivot $3$ give $(1, -1)$. $r3 \\leftarrow r3 + r2$ gives $[0, 0, 2, 4]$.\n$$L = \\begin{bmatrix}1&0&0\\\\-2&1&0\\\\3&-1&1\\end{bmatrix},\\quad U = \\begin{bmatrix}2&1&0&3\\\\0&3&1&-1\\\\0&0&2&4\\end{bmatrix}.$$\nThe first option has all entries negated; the third uses $a_{32}/a_{22} = 0/1$ from the original $A$.",
    ref: `Slides 2.3.2 LU procedure, Exercise 2.3.2 (alg p18–21); ${PYP} (LU of a 3×4 matrix)`,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt:
      "Given $A = LU$ with $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ -1 & 1 & 0 \\\\ 2 & -3 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 1 & 2 & -1 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 3 \\end{bmatrix}$, solve $A\\mathbf{x} = \\mathbf{b}$ where $\\mathbf{b} = [-1,\\ 0,\\ 4]^T$.",
    options: ["$[-1,\\ -1,\\ 3]^T$", "$[-1,\\ 1,\\ -1]^T$", "$\\left[\\frac53,\\ -\\frac23,\\ \\frac43\\right]^T$", "$[-2,\\ 1,\\ -1]^T$", NOTA],
    answer: 4,
    solution:
      "Forward substitution, $L\\mathbf{y} = \\mathbf{b}$: $y_1 = -1$; $-y_1 + y_2 = 0 \\Rightarrow y_2 = -1$; $2y_1 - 3y_2 + y_3 = 4 \\Rightarrow y_3 = 4 + 2 - 3 = 3$.\nBackward substitution, $U\\mathbf{x} = \\mathbf{y} = [-1,-1,3]^T$: $3x_3 = 3 \\Rightarrow x_3 = 1$; $2x_2 + 1 = -1 \\Rightarrow x_2 = -1$; $x_1 - 2 - 1 = -1 \\Rightarrow x_1 = 2$.\nSo $\\mathbf{x} = [2, -1, 1]^T$, which is not listed: **None of the above**. Option (a) is $\\mathbf{y}$; (c) skips the $L$ step; (d) is $-\\mathbf{x}$.",
    ref: `Slides 2.3.1 LU factorization (alg p14–17); Tutorial 2 Q7; ${PYP} (solve with LU)`,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt:
      "Let $A$ be an $n\\times n$ dense matrix with $n$ moderately large, and suppose $A\\mathbf{x} = \\mathbf{b}_1, \\dots, A\\mathbf{x} = \\mathbf{b}_p$ must be solved. Which of the following statements are correct?\nI. The LU factorization of $A$ costs about $2n^3/3$ flops.\nII. Finding $A^{-1}$ costs about $2n^3$ flops.\nIII. Once $L$ and $U$ are known, solving $L\\mathbf{y} = \\mathbf{b}$ and $U\\mathbf{x} = \\mathbf{y}$ costs $2n^2$ flops.\nIV. Multiplying $\\mathbf{b}$ by $A^{-1}$ costs about $2n^3$ flops.",
    options: ["I and II only", "I, II and III only", "I, III and IV only", "II and IV only", ALL],
    answer: 1,
    solution:
      "From the summary on alg p22: LU factorization about $2n^3/3$ flops (I ✓); finding $A^{-1}$ about $2n^3$ flops (II ✓); solving $L\\mathbf{y} = \\mathbf{b}$ and $U\\mathbf{x} = \\mathbf{y}$: $2n^2$ flops (III ✓); multiplying $\\mathbf{b}$ by $A^{-1}$: about $2n^2$ flops, not $2n^3$ (IV ✗). So the LU route is cheaper because the factorization is three times cheaper than computing $A^{-1}$.",
    ref: "Slides 2.3 summary of flops (alg p22)",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "Let $A = PDP^{-1}$ where $P = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$ and $D = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$. Then $A^{101} = $",
    options: ["$I$", m2([[3, -4], [2, -3]]), m2([[-3, 4], [-2, 3]]), m2([[3, 2], [-4, -3]]), NOTA],
    answer: 1,
    solution:
      "$A^{101} = PD^{101}P^{-1}$ and $D^{101} = \\begin{bmatrix} 1^{101} & 0 \\\\ 0 & (-1)^{101} \\end{bmatrix} = D$, so $A^{101} = A$.\n$P^{-1} = \\begin{bmatrix}1&-1\\\\-1&2\\end{bmatrix}$ ($ad - bc = 1$), $PD = \\begin{bmatrix}2&-1\\\\1&-1\\end{bmatrix}$, and $A = PDP^{-1} = \\begin{bmatrix}3&-4\\\\2&-3\\end{bmatrix}$.\n(Check: $A^2 = PD^2P^{-1} = I$, so odd powers give $A$ and even powers give $I$.)",
    ref: "Tutorial 2 Q8",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "Let $A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ and $D = \\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\end{bmatrix}$. For every positive integer $k$, the $(1,2)$ entry of $A^k$ is",
    options: ["$1 - 3^k$", "$3^k - 1$", "$-3^k$", "$3^k$", NOTA],
    answer: 0,
    solution:
      "$P^{-1} = \\begin{bmatrix}1&-1\\\\0&1\\end{bmatrix}$ and\n$$A^k = PD^kP^{-1} = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}\\begin{bmatrix}3^k&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&-1\\\\0&1\\end{bmatrix} = \\begin{bmatrix}3^k & 1\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&-1\\\\0&1\\end{bmatrix} = \\begin{bmatrix}3^k & 1 - 3^k\\\\0&1\\end{bmatrix}.$$\nCheck with $k = 1$: $A = \\begin{bmatrix}3&-2\\\\0&1\\end{bmatrix}$ and $1 - 3 = -2$ ✓. Using $P^{-1}D^kP$ instead flips the sign.",
    ref: "Tutorial 2 Q8",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "mcq",
    prompt:
      "Let $A$ be an $n\\times n$ matrix with $A^3 = 0$. Which of the following statements are correct?\nI. $I - A$ is invertible.\nII. $A$ is invertible.\nIII. $A^2 + A + I$ is invertible.\nIV. $A^2$ is invertible.",
    options: ["I only", "I and III only", "I, III and IV only", "II and IV only", ALL],
    answer: 1,
    solution:
      "I: $(I - A)(I + A + A^2) = I - A^3 = I$ and likewise in the other order. **True** (past paper: $A^m = 0 \\Rightarrow I - A$ invertible).\nII: $A$ invertible would make $A^3$ invertible (Theorem 2.2.2), but $A^3 = 0$. **False**.\nIII: the same identity shows $I + A + A^2$ has inverse $I - A$. **True**.\nIV: $A^2$ invertible would make $A^4 = A^2A^2$ invertible, but $A^4 = A^3A = 0$. **False**.",
    ref: `${PYP} (nilpotent A^m = 0 ⇒ I − A invertible); Slides 2.2 Theorem 2.2 (alg p6)`,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt:
      "Let $A$ be a $4\\times 4$ matrix such that $A\\mathbf{x} = \\mathbf{b}$ has a **unique** solution for some $\\mathbf{b}\\in\\mathbb{R}^4$. Which of the following statements are correct?\nI. $A$ is invertible.\nII. $A^2\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.\nIII. The columns of $A^T$ are linearly dependent.\nIV. $A^T$ is invertible.",
    options: ["I and II only", "I, II and III only", "I and IV only", "I, II and IV only", ALL],
    answer: 3,
    solution:
      "If $\\mathbf{p}$ is the unique solution and $A\\mathbf{v} = \\mathbf{0}$, then $\\mathbf{p} + \\mathbf{v}$ is also a solution (Tutorial 2 Q4b), so $\\mathbf{v} = \\mathbf{0}$: statement (4) holds. $A$ is square, so by the Invertible Matrix Theorem $A$ is invertible (I) and $A^T$ is invertible (IV). $A^2$ is invertible (Theorem 2.2.2), so II holds (Tutorial 2 Q4a). Applying the theorem to the invertible matrix $A^T$, its columns are independent, so III is **false**.",
    ref: "Slides 2.2 Theorem 2.4 (alg p10); Tutorial 2 Q4a, Q4b",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt:
      "Let $A$ be an $n\\times n$ matrix with $\\mathbf{N}(A) = \\{\\mathbf{0}\\}$. Which of the following statements are correct?\nI. The columns of $A$ form a basis for $\\mathbb{R}^n$.\nII. $A^T\\mathbf{x} = \\mathbf{b}$ has at least one solution for each $\\mathbf{b}\\in\\mathbb{R}^n$.\nIII. $\\dim \\mathbf{C}(A) = n$.\nIV. Some echelon form of $A$ has a zero row.",
    options: ["I and III only", "I, II and III only", "II and III only", "I, III and IV only", ALL],
    answer: 1,
    solution:
      "$\\mathbf{N}(A) = \\{\\mathbf{0}\\}$ is statement (15) of the Invertible Matrix Theorem (Theorem 4.9), so $A$ is invertible. Then (11) the columns form a basis for $\\mathbb{R}^n$ (I ✓) and (13) $\\dim\\mathbf{C}(A) = n$ (III ✓). $A^T$ is invertible (10), so by the theorem applied to $A^T$, statement (6) holds for $A^T$ (II ✓). $A$ has $n$ pivot positions (3), so no echelon form has a zero row (IV ✗).",
    ref: "Slides 4.14 Theorem 4.9 (vsp p66); Slides 2.2 Theorem 2.4 (alg p10)",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt:
      "Let $A$ and $B$ be $n\\times n$ matrices. Which of the following statements are correct?\nI. If the columns of $B$ are linearly dependent, then so are the columns of $AB$.\nII. If the columns of $A$ are linearly dependent, then so are the columns of $AB$.\nIII. If the columns of $A$ are linearly independent, then the columns of $A^2$ span $\\mathbb{R}^n$.\nIV. If $AB = I$, then $BA = I$.",
    options: ["I only", "I and III only", "I, III and IV only", "II and IV only", ALL],
    answer: 4,
    solution:
      "I: $B\\mathbf{x} = \\mathbf{0}$ with $\\mathbf{x}\\ne\\mathbf{0}$ gives $AB\\mathbf{x} = \\mathbf{0}$ (Tutorial 2 Q1). **True**.\nII: for **square** matrices, dependent columns of $A$ mean $A$ is singular (Theorem 2.4). If $AB$ were invertible, then $A\\big(B(AB)^{-1}\\big) = I$ would make $A$ invertible by (9). So $AB$ is singular and its columns are dependent. **True** here.\nIII: independent columns make the square matrix $A$ invertible, so $A^2$ is invertible and its columns span $\\mathbb{R}^n$ (Tutorial 2 Q5). **True**.\nIV: $AB = I$ is (9), so $A$ is invertible, $B = A^{-1}$ and $BA = I$. **True**. So **all** of them.",
    ref: "Tutorial 2 Q1, Q5; Slides 2.2 Theorem 2.4 (alg p10)",
  },
  {
    subtopic: "Solution structure",
    kind: "mcq",
    prompt:
      "A $3\\times 4$ matrix $A$ and $\\mathbf{b}\\in\\mathbb{R}^3$ are such that $\\mathbf{x}_1 = [1,\\ 0,\\ 2,\\ -1]^T$ solves $A\\mathbf{x} = \\mathbf{b}$, and the solution set of $A\\mathbf{x} = \\mathbf{0}$ is $\\operatorname{Span}\\{[1,1,0,0]^T,\\ [0,1,-1,1]^T\\}$. Which of the following is also a solution of $A\\mathbf{x} = \\mathbf{b}$?",
    options: ["$[1,\\ 2,\\ -1,\\ 1]^T$", "$[2,\\ 1,\\ 2,\\ 1]^T$", "$[1,\\ 0,\\ 2,\\ 1]^T$", "$[3,\\ 1,\\ 3,\\ -2]^T$", NOTA],
    answer: 3,
    solution:
      "Every solution is $\\mathbf{x}_1 + \\mathbf{x}_0$ with $A\\mathbf{x}_0 = \\mathbf{0}$ (Tutorial 2 Q4b), so test whether $\\mathbf{x} - \\mathbf{x}_1 = c_1[1,1,0,0]^T + c_2[0,1,-1,1]^T = [c_1,\\ c_1 + c_2,\\ -c_2,\\ c_2]$.\n- $[3,1,3,-2] - \\mathbf{x}_1 = [2, 1, 1, -1]$: $c_1 = 2$, $c_2 = -1$, and indeed $c_1 + c_2 = 1$, $-c_2 = 1$ ✓.\n- $[1,2,-1,1] - \\mathbf{x}_1 = [0,2,-3,2]$: $c_1 = 0$, $c_2 = 2$ needs third entry $-2 \\ne -3$. ✗ (It is the sum of the two spanning vectors, a solution of $A\\mathbf{x} = \\mathbf{0}$.)\n- $[2,1,2,1] - \\mathbf{x}_1 = [1,1,0,2]$: $c_1 = 1$, $c_2 = 0$ needs last entry 0. ✗\n- $[1,0,2,1] - \\mathbf{x}_1 = [0,0,0,2]$: $c_1 = c_2 = 0$ needs last entry 0. ✗",
    ref: "Tutorial 2 Q4b",
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt:
      "An invertible $3\\times3$ matrix $A$ has $A^{-1} = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & -1 \\\\ 3 & 0 & 1 \\end{bmatrix}$. The solution of $A^T\\mathbf{y} = [1,\\ 1,\\ 1]^T$ is",
    options: ["$[3,\\ 0,\\ 4]^T$", "$[-4,\\ -3,\\ 0]^T$", "$[4,\\ 3,\\ 0]^T$", "$[4,\\ 0,\\ 3]^T$", NOTA],
    answer: 2,
    solution:
      "By Theorem 2.2.3, $(A^T)^{-1} = (A^{-1})^T$, and by Theorem 2.1, $\\mathbf{y} = (A^{-1})^T[1,1,1]^T$, whose entries are the **column** sums of $A^{-1}$: $1 + 0 + 3 = 4$, $2 + 1 + 0 = 3$, $0 - 1 + 1 = 0$. So $\\mathbf{y} = [4, 3, 0]^T$.\nTrap: $A^{-1}[1,1,1]^T = [3, 0, 4]^T$ (row sums) solves $A\\mathbf{x} = [1,1,1]^T$ instead.",
    ref: "Slides 2.2 Theorems 2.1, 2.2 (alg p5–6)",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "Let $A$ and $B$ be $3\\times3$ matrices with $AB = 0$ and $B \\ne 0$. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $A$ were invertible, then $B = A^{-1}(AB) = A^{-1}0 = 0$, contradicting $B \\ne 0$. So $A$ is **not** invertible. **False**. (Compare the slides: $AB = 0$ does not imply $A = 0$ or $B = 0$.)",
    ref: "Slides 0B Properties of Matrix Multiplication (mtx p10); Slides 0B Inverse of a Matrix (mtx p13)",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "Let $A$ be an $n\\times n$ matrix with $A^2 = A$ and $A \\ne I$. Then $A$ is not invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Suppose $A$ were invertible. Multiply $A^2 = A$ on the left by $A^{-1}$: $A = I$, contradicting $A \\ne I$. So $A$ is singular. **True**. (Example: $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, with $ad - bc = 0$.)",
    ref: "Slides 0B Inverse of a Matrix (mtx p13); Tutorial 2 Q3 (cancelling with an inverse)",
  },
];
