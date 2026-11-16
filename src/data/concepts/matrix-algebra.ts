import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";
const m2 = (a: string, b: string, c: string, d: string) => `$\\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix}$`;
const m3 = (rows: (string | number)[][]) => `$\\begin{bmatrix} ${rows.map((r) => r.join(" & ")).join(" \\\\ ")} \\end{bmatrix}$`;

export const matrixAlgebraConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (16)
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "For all invertible $n\\times n$ matrices $A$ and $B$, $(AB)^{-1} = A^{-1}B^{-1}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The correct rule reverses the order: $(AB)^{-1} = B^{-1}A^{-1}$, since $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$. The two agree only when $A^{-1}$ and $B^{-1}$ commute. A counterexample: $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, $B = \\begin{bmatrix}1&0\\\\1&1\\end{bmatrix}$. A claim about **all** matrices with a counterexample is **False**.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices. Then $A + B$ is invertible.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Invertibility is **not** preserved by addition. $A = B = I$ gives $A + B = 2I$, which is invertible, but $A = I$, $B = -I$ gives $A + B = 0$, which is not. The given information does not decide it: **Not enough information**. (Only products of invertible matrices are guaranteed invertible.)",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix and $A^2$ is invertible. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Let $C = (A^2)^{-1}$. Then $A(AC) = A^2C = I$, so $A$ has a right inverse $AC$. For a **square** matrix a one-sided inverse is a two-sided inverse (Invertible Matrix Theorem), so $A$ is invertible with $A^{-1} = AC$. Alternatively: if $A\\mathbf{x} = \\mathbf{0}$ then $A^2\\mathbf{x} = \\mathbf{0}$, so $\\mathbf{x} = \\mathbf{0}$. **True**.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ and $B$ are $n\\times n$ matrices and $AB$ is invertible. Then $B$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $B\\mathbf{x} = \\mathbf{0}$ then $AB\\mathbf{x} = A\\mathbf{0} = \\mathbf{0}$, and since $AB$ is invertible, $\\mathbf{x} = \\mathbf{0}$. So $B\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, and a square matrix with that property is invertible (IMT). By the same token $A = (AB)B^{-1}$ is invertible too. **True**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "There exist a $3\\times 2$ matrix $A$ and a $2\\times 3$ matrix $B$ such that $AB = I_3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$AB$ is $3\\times 3$, but $\\operatorname{Col}(AB) \\subseteq \\operatorname{Col}(A)$, which has dimension at most 2. So $\\operatorname{rank}(AB) \\le 2 < 3$ and $AB$ can never be $I_3$. **False**. (The other way round is possible: a $2\\times3$ $B$ and $3\\times2$ $A$ can give $BA = I_2$.)",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is a $4\\times 3$ matrix whose columns are linearly independent. Then $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^4$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Three vectors can span at most a 3-dimensional subspace of $\\mathbb{R}^4$, so the columns cannot span $\\mathbb{R}^4$ ($\\operatorname{rank}A = 3 < 4$). Some $\\mathbf{b}$ give an inconsistent system. The Invertible Matrix Theorem (where \"independent columns\" and \"columns span\" go together) applies only to **square** matrices. **False**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix and $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^n$. Then $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "\"$A\\mathbf{x} = \\mathbf{b}$ consistent for every $\\mathbf{b}$\" means the columns span $\\mathbb{R}^n$, i.e. a pivot in every row. For a **square** matrix that is $n$ pivots, hence a pivot in every column, hence no free variables and only the trivial solution. Both are equivalent to \"$A$ is invertible\". **True**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is an $m\\times n$ matrix and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^m$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Only the trivial solution means a pivot in every **column** ($\\operatorname{rank}A = n$). Solvable for every $\\mathbf{b}$ needs a pivot in every **row** ($\\operatorname{rank}A = m$). If $m = n$ both hold (tutorial 2 Q6), but a $3\\times 2$ matrix with independent columns has rank 2 < 3 and fails. The shape is not given: **Not enough information**.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "tfn",
    prompt: "$E$ is the $3\\times 3$ elementary matrix that adds $3$ times row 1 to row 2. Then $E^2$ adds $9$ times row 1 to row 2.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$E^2A = E(EA)$ performs the operation twice: row 2 gets $3\\times$row 1 added, then another $3\\times$row 1 (row 1 is unchanged). The total is $6\\times$row 1, so $E^2 = \\begin{bmatrix}1&0&0\\\\6&1&0\\\\0&0&1\\end{bmatrix}$. In general $E^k$ adds $3k$ times row 1. **False** (this exact trap appeared in a past paper).",
  },
  {
    subtopic: "Elementary matrices",
    kind: "tfn",
    prompt: "Every elementary matrix is invertible, and its inverse is also an elementary matrix.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Each row operation can be undone by a row operation of the same type: a swap by the same swap, scaling by $c\\ne0$ by scaling by $1/c$, and adding $k\\,R_j$ by adding $-k\\,R_j$. The elementary matrix of the undoing operation is $E^{-1}$. **True**.",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix with $A^3 = 0$. Then $I - A$ is invertible and $(I - A)^{-1} = I + A + A^2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Multiply out: $(I - A)(I + A + A^2) = I + A + A^2 - A - A^2 - A^3 = I - A^3 = I$, and the product in the other order also telescopes to $I$. So $I - A$ is invertible with that inverse (a finite geometric series). **True**.",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix with $A^2 = 0$. Then $A = 0$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Matrices can have zero divisors: $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix} \\ne 0$ but $A^2 = 0$. What **is** true is that $A$ cannot be invertible (otherwise $A = A^{-1}A^2 = 0$, contradiction). **False**.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is $m\\times n$ and $B$ is $n\\times p$. If the columns of $B$ are linearly dependent, then the columns of $AB$ are linearly dependent.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Dependent columns of $B$ give a nonzero $\\mathbf{x}$ with $B\\mathbf{x} = \\mathbf{0}$. Then $(AB)\\mathbf{x} = A(B\\mathbf{x}) = A\\mathbf{0} = \\mathbf{0}$ with the same nonzero $\\mathbf{x}$, so the columns of $AB$ are dependent. This is tutorial 2 Q1. **True** for every $A$.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is an $m\\times n$ matrix with linearly dependent columns and $B$ is $n\\times p$. Then the columns of $AB$ are linearly dependent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The argument of the previous fact needs $B\\mathbf{x} = \\mathbf{0}$, not $A\\mathbf{y} = \\mathbf{0}$. Example: $A = \\begin{bmatrix}1&1\\end{bmatrix}$ (dependent columns), $B = \\begin{bmatrix}1\\\\0\\end{bmatrix}$ gives $AB = [1]$, independent. With $B = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ we get $AB = [1\\ \\ 1]$, dependent. It depends on $B$: **Not enough information**. (If $A$ and $B$ are both **square**, it is true: $A$ singular makes $AB$ singular.)",
  },
  {
    subtopic: "LU factorization",
    kind: "tfn",
    prompt: "Every invertible matrix has an LU factorization $A = LU$ obtained without row interchanges.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ is invertible, but its $(1,1)$ entry is $0$, so elimination cannot start without swapping rows. Indeed $LU$ with $L$ unit lower triangular would have $(1,1)$ entry $u_{11} = 0$, forcing $u_{11}\\ell_{21} = 0 \\ne 1$. Such matrices need a permuted factorization $PA = LU$. **False**.",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "tfn",
    prompt: "$A = PDP^{-1}$ where $P$ is an invertible $3\\times 3$ matrix and $D = \\begin{bmatrix}1&0&0\\\\0&1/2&0\\\\0&0&1/3\\end{bmatrix}$. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$P$, $D$ and $P^{-1}$ are all invertible ($D$ has nonzero diagonal entries), and a product of invertible matrices is invertible: $A^{-1} = PD^{-1}P^{-1}$ with $D^{-1} = \\operatorname{diag}(1, 2, 3)$. **True**.",
  },

  // ---------------------------------------------------------------- MCQ (38)
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "Find the inverse of $A = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$.",
    options: [m2("3", "-5", "-1", "2"), m2("2", "-1", "-5", "3"), m2("-2", "5", "1", "-3"), m2("2", "-5", "-1", "3"), NOTA],
    answer: 3,
    solution:
      "$\\det A = 3\\cdot2 - 5\\cdot1 = 1$. Swap the diagonal, negate the off-diagonal, divide by $1$: $A^{-1} = \\begin{bmatrix}2&-5\\\\-1&3\\end{bmatrix}$. Check: $\\begin{bmatrix}3&5\\\\1&2\\end{bmatrix}\\begin{bmatrix}2&-5\\\\-1&3\\end{bmatrix} = \\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$. The other options forget the swap, transpose the answer, or negate everything.",
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "For which value(s) of $k$ is $\\begin{bmatrix} k & 4 \\\\ 1 & k \\end{bmatrix}$ **not** invertible?",
    options: ["$k = \\pm 2$", "$k = 2$ only", "$k = \\pm 4$", "$k = 4$ only", NOTA],
    answer: 0,
    solution:
      "A $2\\times2$ matrix is invertible iff $ad - bc \\ne 0$. Here $ad - bc = k^2 - 4 = (k-2)(k+2)$, which is zero for $k = 2$ **and** $k = -2$. For these two values the columns are parallel, e.g. $k = -2$: $(-2,1)$ and $(4,-2) = -2(-2,1)$.",
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "$A = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$ has $A^{-1} = \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$. Solve $A\\mathbf{x} = \\mathbf{b}$ for $\\mathbf{b} = [1,\\ 2]^T$.",
    options: ["$[4,\\ 11]^T$", "$[-7,\\ 3]^T$", "$[1,\\ -1]^T$", "$[-1,\\ 1]^T$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{x} = A^{-1}\\mathbf{b} = \\begin{bmatrix}3&-1\\\\-5&2\\end{bmatrix}\\begin{bmatrix}1\\\\2\\end{bmatrix} = \\begin{bmatrix}1\\\\-1\\end{bmatrix}$. Check: $2(1) + 1(-1) = 1$ and $5(1) + 3(-1) = 2$ ✓. $[4,11]^T$ is $A\\mathbf{b}$ (wrong matrix) and $[-7,3]^T$ is $(A^{-1})^T\\mathbf{b}$.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "$A$, $B$, $C$ are invertible $n\\times n$ matrices. Which expression equals $(ABC)^{-1}$?",
    options: ["$A^{-1}B^{-1}C^{-1}$", "$C^{-1}B^{-1}A^{-1}$", "$B^{-1}A^{-1}C^{-1}$", "$C^{-1}A^{-1}B^{-1}$", NOTA],
    answer: 1,
    solution:
      "Undo the last thing first: $(ABC)(C^{-1}B^{-1}A^{-1}) = AB(CC^{-1})B^{-1}A^{-1} = A(BB^{-1})A^{-1} = I$. So $(ABC)^{-1} = C^{-1}B^{-1}A^{-1}$ (\"socks and shoes\"). The other orders are not inverses unless the matrices happen to commute.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "$A$ is an invertible $n\\times n$ matrix. What is $(3A)^{-1}$?",
    options: ["$3A^{-1}$", "$-3A^{-1}$", "$9A^{-1}$", "$\\tfrac19 A^{-1}$", NOTA],
    answer: 4,
    solution:
      "$(3A)\\left(\\tfrac13A^{-1}\\right) = \\tfrac{3}{3}AA^{-1} = I$, so $(3A)^{-1} = \\tfrac13A^{-1}$. In general $(cA)^{-1} = c^{-1}A^{-1}$ for $c \\ne 0$: the scalar is inverted too. $\\tfrac13A^{-1}$ is not listed, so **None of the above**.",
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "$A$ is invertible. Which matrix equals $\\big((A^{-1})^T\\big)^{-1}$?",
    options: ["$A$", "$A^{-1}$", "$(A^{-1})^T$", "$A^T$", NOTA],
    answer: 3,
    solution:
      "Use $(M^T)^{-1} = (M^{-1})^T$ with $M = A^{-1}$: $\\big((A^{-1})^T\\big)^{-1} = \\big((A^{-1})^{-1}\\big)^T = A^T$. Check: $A^T(A^{-1})^T = (A^{-1}A)^T = I^T = I$.",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices and $AXB = C$. Solve for $X$.",
    options: ["$X = A^{-1}CB^{-1}$", "$X = CA^{-1}B^{-1}$", "$X = A^{-1}B^{-1}C$", "$X = B^{-1}CA^{-1}$", NOTA],
    answer: 0,
    solution:
      "$A$ sits on the left of $X$, so multiply by $A^{-1}$ on the **left**; $B$ sits on the right, so multiply by $B^{-1}$ on the **right**: $A^{-1}(AXB)B^{-1} = X = A^{-1}CB^{-1}$. Matrix multiplication is not commutative, so you may not move $B^{-1}$ past $C$.",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$, $B$, $X$ are $n\\times n$ with $A$, $X$ and $A - AX$ invertible, and $(A - AX)^{-1} = X^{-1}B$. Solve for $X$.",
    options: ["$X = A(A + B^{-1})^{-1}$", "$X = (A - B^{-1})^{-1}A$", "$X = (A + B^{-1})^{-1}A$", "$X = (A + B)^{-1}A$", NOTA],
    answer: 2,
    solution:
      "The right side $X^{-1}B$ equals an inverse, so it is invertible, hence $B$ is invertible. Invert both sides: $A - AX = (X^{-1}B)^{-1} = B^{-1}X$. Collect the $X$ terms on the right: $A = AX + B^{-1}X = (A + B^{-1})X$. Since $A$ and $X$ are invertible, $A + B^{-1} = AX^{-1}$ is invertible, and $X = (A + B^{-1})^{-1}A$ (multiply on the **left**, because $X$ is on the right of $A + B^{-1}$).",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ is invertible and $A^3 = ABA - 4A^2$. Express $B$ in terms of $A$.",
    options: ["$B = A - 4I$", "$B = A + 4I$", "$B = A^2 + 4A$", "$B = 4I - A$", NOTA],
    answer: 1,
    solution:
      "Multiply on the left by $A^{-1}$: $A^2 = BA - 4A$. Multiply on the right by $A^{-1}$: $A = B - 4I$. So $B = A + 4I$. Strip the $A$'s from the **correct side**: there is an $A$ on the left of $B$ and one on the right of $B$.",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices and $A(X - Y)B^{-1} = A$. Then $X = $",
    options: ["$B^{-1} + Y$", "$Y - B$", "$AB + Y$", "$B + Y$", NOTA],
    answer: 3,
    solution:
      "Left-multiply by $A^{-1}$: $(X - Y)B^{-1} = I$. Right-multiply by $B$: $X - Y = B$. So $X = B + Y$.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E$ is the $3\\times 3$ elementary matrix for $R_2 \\to R_2 - 3R_1$. Find $E^{-1}$.",
    options: [
      m3([[1, 0, 0], [-3, 1, 0], [0, 0, 1]]),
      m3([[1, 3, 0], [0, 1, 0], [0, 0, 1]]),
      m3([[1, 0, 0], [3, 1, 0], [0, 0, 1]]),
      m3([[1, 0, 0], ["\\frac13", 1, 0], [0, 0, 1]]),
      NOTA,
    ],
    answer: 2,
    solution:
      "$E = \\begin{bmatrix}1&0&0\\\\-3&1&0\\\\0&0&1\\end{bmatrix}$ subtracts $3R_1$ from $R_2$. To undo it, **add** $3R_1$ back: $E^{-1} = \\begin{bmatrix}1&0&0\\\\3&1&0\\\\0&0&1\\end{bmatrix}$. Only the sign of the multiplier changes; it is not inverted to $1/3$ and does not move to the transposed position.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 4 & 1 \\end{bmatrix}$ and $A$ is any $3\\times n$ matrix. What does $EA$ do to $A$?",
    options: [
      "Adds $4$ times row 3 to row 2",
      "Adds $4$ times row 2 to row 3",
      "Multiplies row 3 by $4$",
      "Adds $4$ times column 2 to column 3",
      NOTA,
    ],
    answer: 1,
    solution:
      "Row 3 of $EA$ is $(\\text{row 3 of } E)\\,A = 0\\cdot\\mathbf{r}_1 + 4\\mathbf{r}_2 + 1\\cdot\\mathbf{r}_3$, and rows 1, 2 are unchanged. So $EA$ is $A$ with $R_3 \\to R_3 + 4R_2$. An entry $k$ in position $(i,j)$ means \"add $k$ times row $j$ to row $i$\". Column operations come from multiplying on the **right**, $AE$.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E$ is the $3\\times 3$ elementary matrix that swaps rows 1 and 3. What is $E^{2025}$?",
    options: ["$I$", "$-I$", "$E$", "$2025E$", NOTA],
    answer: 2,
    solution:
      "Swapping the same two rows twice restores the original order, so $E^2 = I$ (a swap matrix is its own inverse). Then $E^{2025} = (E^2)^{1012}E = E$.",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "Which $3\\times3$ matrix $M$ has the following effect on any $3\\times n$ matrix $A$: $MA$ is obtained by **first** adding $2$ times row 1 to row 2, **then** multiplying row 1 by $3$?",
    options: [
      m3([[3, 0, 0], [6, 1, 0], [0, 0, 1]]),
      m3([[3, 2, 0], [0, 1, 0], [0, 0, 1]]),
      m3([[1, 0, 0], [2, 3, 0], [0, 0, 1]]),
      m3([[3, 0, 0], [2, 1, 0], [0, 0, 1]]),
      NOTA,
    ],
    answer: 3,
    solution:
      "With $E_1$ = (add $2R_1$ to $R_2$) and $E_2$ = (scale $R_1$ by 3), doing $E_1$ first means $M = E_2E_1$ (the first operation sits next to $A$). Apply both operations to $I$ in order: after $E_1$ we get rows $(1,0,0), (2,1,0), (0,0,1)$; scaling row 1 by 3 gives $\\begin{bmatrix}3&0&0\\\\2&1&0\\\\0&0&1\\end{bmatrix}$. The first option is $E_1E_2$ (scale first, then add twice the **new** row 1 = $6$).",
  },
  {
    subtopic: "Gauss–Jordan",
    kind: "mcq",
    prompt: "Row reducing $[A \\mid I]$ for $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{bmatrix}$ gives $[I \\mid A^{-1}]$. What is the **third row** of $A^{-1}$?",
    options: ["$[-5,\\ 4,\\ 1]$", "$[-24,\\ 20,\\ -5]$", "$[5,\\ -4,\\ -1]$", "$[1,\\ 4,\\ 0]$", NOTA],
    answer: 0,
    solution:
      "$R_3 \\to R_3 - 5R_1$ gives row 3 $= [0, -4, -15 \\mid -5, 0, 1]$; then $R_3 \\to R_3 + 4R_2$ gives $[0, 0, 1 \\mid -5, 4, 1]$. Back-substituting upwards gives\n$$A^{-1} = \\begin{bmatrix} -24 & 18 & 5 \\\\ 20 & -15 & -4 \\\\ -5 & 4 & 1 \\end{bmatrix}.$$\nThe third row is $[-5, 4, 1]$; $[-24, 20, -5]$ is the first **column**. Check: row 3 of $A^{-1}$ times column 3 of $A$ is $-15 + 16 + 0 = 1$ ✓.",
  },
  {
    subtopic: "Gauss–Jordan",
    kind: "mcq",
    prompt: "While row reducing $[A \\mid I]$ for a $3\\times3$ matrix $A$, the left block becomes $\\begin{bmatrix} 1 & 0 & 2 \\\\ 0 & 1 & -1 \\\\ 0 & 0 & 0 \\end{bmatrix}$. What can you conclude?",
    options: [
      "$A^{-1}$ exists and has a zero row",
      "$A$ is not invertible",
      "$A$ is invertible, but a row swap is needed to finish",
      "$A^{-1}$ is the current right-hand block",
      NOTA,
    ],
    answer: 1,
    solution:
      "Row operations preserve invertibility. The left block has only 2 pivots (a zero row), so it can never be reduced to $I_3$: $A$ is row equivalent to a matrix with a zero row and is **not invertible**. No row swap can create a third pivot. Gauss–Jordan doubles as an invertibility test.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ is a $5\\times 5$ matrix and $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution. Which statement must be true?",
    options: [
      "$A$ has 5 pivot positions",
      "$A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^5$",
      "$A^T$ is invertible",
      "The columns of $A$ do not span $\\mathbb{R}^5$",
      NOTA,
    ],
    answer: 3,
    solution:
      "A nontrivial solution means \"$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution\" fails, so by the Invertible Matrix Theorem (square $A$) **every** equivalent statement fails: fewer than 5 pivots, some $\\mathbf{b}$ give no solution, $A^T$ is singular, and the columns do not span $\\mathbb{R}^5$.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "Which statement is **not** equivalent to \"$A$ is an invertible $n\\times n$ matrix\"?",
    options: [
      "$\\operatorname{rank}A = n$",
      "The columns of $A$ are linearly independent",
      "$A\\mathbf{x} = \\mathbf{b}$ has at least one solution for each $\\mathbf{b}\\in\\mathbb{R}^n$",
      "$A^T$ is invertible",
      "$A$ has no zero entries on its main diagonal",
    ],
    answer: 4,
    solution:
      "The first four are all in the Invertible Matrix Theorem. The diagonal condition is irrelevant: $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ has a nonzero diagonal but is singular, and $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has zeros on the diagonal but is invertible. (For **triangular** matrices nonzero diagonal does characterise invertibility, which is where this trap comes from.)",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ is a $3\\times 5$ matrix. Which statement **must** be true?",
    options: [
      "The columns of $A$ span $\\mathbb{R}^3$",
      "$\\operatorname{rank}A = 3$",
      "$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution",
      "Whenever $A\\mathbf{x} = \\mathbf{b}$ is consistent, the solution is unique",
      NOTA,
    ],
    answer: 2,
    solution:
      "There are at most 3 pivots but 5 columns, so at least 2 free variables: $A\\mathbf{x} = \\mathbf{0}$ always has nontrivial solutions (5 vectors in $\\mathbb{R}^3$ are dependent), and consistent systems have infinitely many solutions. The rank could be less than 3 (e.g. $A = 0$), so the columns need not span $\\mathbb{R}^3$.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ is $2\\times 3$ and $B$ is $3\\times 2$. Which statement is **always** true?",
    options: ["$AB$ is invertible", "$AB$ is not invertible", "$BA$ is not invertible", "$BA = I_3$ is possible", NOTA],
    answer: 2,
    solution:
      "$BA$ is $3\\times3$ but $\\operatorname{rank}(BA) \\le \\operatorname{rank}A \\le 2 < 3$, so $BA$ is never invertible (and never $I_3$). $AB$ is $2\\times2$ and may or may not be invertible: $A = \\begin{bmatrix}1&0&0\\\\0&1&0\\end{bmatrix}$, $B = A^T$ give $AB = I_2$, while $B = 0$ gives $AB = 0$.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt: "$A$, $B$, $C$ are $n\\times n$ matrices and $(A + B)C^2$ is invertible. Which statement must be true?",
    options: [
      "$A$ is invertible",
      "$B$ is invertible",
      "$C$ is invertible, but $A + B$ need not be",
      "$A + B$ and $C$ are both invertible",
      NOTA,
    ],
    answer: 3,
    solution:
      "If a product of **square** matrices is invertible, every factor is invertible (if, say, $C\\mathbf{x} = \\mathbf{0}$ with $\\mathbf{x}\\ne\\mathbf{0}$, then the whole product kills $\\mathbf{x}$). The factors here are $A + B$, $C$, $C$, so $A + B$ and $C$ are invertible. Nothing follows about $A$ or $B$ separately: $A = I$, $B = 0$ works, and so does $A = 0$, $B = I$.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt: "$A$ and $B$ are $n\\times n$, $B$ is invertible and $AB$ is invertible. Which expression equals $A^{-1}$?",
    options: ["$(AB)^{-1}B$", "$B(AB)^{-1}$", "$(AB)^{-1}B^{-1}$", "$B^{-1}(AB)$", NOTA],
    answer: 1,
    solution:
      "$A = (AB)B^{-1}$ is a product of invertible matrices, so it is invertible with $A^{-1} = (B^{-1})^{-1}(AB)^{-1} = B(AB)^{-1}$. Check: $A\\cdot B(AB)^{-1} = (AB)(AB)^{-1} = I$. This is tutorial 2 Q2.",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "mcq",
    prompt: "Let $N = \\begin{bmatrix} 0 & 2 & 3 \\\\ 0 & 0 & 4 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Find $(I - N)^{-1}$.",
    options: [
      m3([[1, 2, 11], [0, 1, 4], [0, 0, 1]]),
      m3([[1, 2, 3], [0, 1, 4], [0, 0, 1]]),
      m3([[1, -2, -3], [0, 1, -4], [0, 0, 1]]),
      m3([[1, 2, -5], [0, 1, 4], [0, 0, 1]]),
      NOTA,
    ],
    answer: 0,
    solution:
      "$N^2 = \\begin{bmatrix}0&0&8\\\\0&0&0\\\\0&0&0\\end{bmatrix}$ and $N^3 = 0$, so $(I - N)^{-1} = I + N + N^2 = \\begin{bmatrix}1&2&11\\\\0&1&4\\\\0&0&1\\end{bmatrix}$. Check row 1 of $(I-N)$ times the last column: $11 - 2\\cdot4 - 3\\cdot1 = 0$ ✓. $I + N$ forgets $N^2$; $I - N$ is the matrix itself.",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "mcq",
    prompt: "$A$ is $n\\times n$ with $A^3 = 0$. Which matrix is $(I + A)^{-1}$?",
    options: ["$I - A$", "$I - A + A^2$", "$I + A + A^2$", "$I + A - A^2$", NOTA],
    answer: 1,
    solution:
      "$(I + A)(I - A + A^2) = I - A + A^2 + A - A^2 + A^3 = I + A^3 = I$. It is the geometric series $1 - x + x^2 - \\cdots$ for $1/(1+x)$, cut off because $A^3 = 0$.",
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "mcq",
    prompt: "$A$ is an $n\\times n$ matrix with $A^k = 0$ for some positive integer $k$. Which statement must be true?",
    options: ["$A = 0$", "$A^2 = 0$", "$A$ is not invertible", "$A + I$ is not invertible", NOTA],
    answer: 2,
    solution:
      "If $A$ were invertible, so would be $A^k$ (product of invertibles), but $A^k = 0$ is not. So $A$ is singular. $A$ need not be $0$ and $A^2$ need not be $0$ (e.g. a $3\\times3$ shift matrix has $A^2 \\ne 0 = A^3$). In fact $I + A$ **is** invertible, with inverse $I - A + A^2 - \\cdots \\pm A^{k-1}$.",
  },
  {
    subtopic: "Solution structure",
    kind: "mcq",
    prompt: "$A\\mathbf{x} = \\mathbf{b}$ has the particular solution $\\mathbf{p} = (1, 2, 0)$, and $\\operatorname{Nul}A = \\operatorname{Span}\\{(1, -1, 1)\\}$. Which vector is also a solution of $A\\mathbf{x} = \\mathbf{b}$?",
    options: ["$(1,\\ -1,\\ 1)$", "$(2,\\ 1,\\ 0)$", "$(2,\\ 3,\\ -1)$", "$(3,\\ 0,\\ 2)$", NOTA],
    answer: 3,
    solution:
      "Every solution has the form $\\mathbf{x} = \\mathbf{p} + \\mathbf{x}_0$ with $A\\mathbf{x}_0 = \\mathbf{0}$ (tutorial 2 Q4b), so $\\mathbf{x} - \\mathbf{p}$ must be a multiple of $(1,-1,1)$. $(3,0,2) - (1,2,0) = (2,-2,2) = 2(1,-1,1)$ ✓. The others give $(0,-3,1)$, $(1,-1,0)$, $(1,1,-1)$, none of which are multiples. $(1,-1,1)$ itself solves $A\\mathbf{x} = \\mathbf{0}$, not $A\\mathbf{x} = \\mathbf{b}$.",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "$A = LU$ with $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -1 & 3 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 2 & 1 & -1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 4 \\end{bmatrix}$. Solve $A\\mathbf{x} = \\mathbf{b}$ for $\\mathbf{b} = [2,\\ 9,\\ 17]^T$.",
    options: ["$[2,\\ 5,\\ 4]^T$", "$[1,\\ 1,\\ 1]^T$", "$[1,\\ 1,\\ -1]^T$", "$[2,\\ 9,\\ 17]^T$", NOTA],
    answer: 1,
    solution:
      "Forward: $L\\mathbf{y} = \\mathbf{b}$ gives $y_1 = 2$, $y_2 = 9 - 2(2) = 5$, $y_3 = 17 + 2 - 3(5) = 4$. Back: $U\\mathbf{x} = \\mathbf{y}$ gives $4x_3 = 4 \\Rightarrow x_3 = 1$, $3x_2 + 2 = 5 \\Rightarrow x_2 = 1$, $2x_1 + 1 - 1 = 2 \\Rightarrow x_1 = 1$. So $\\mathbf{x} = [1,1,1]^T$. $[2,5,4]^T$ is the intermediate $\\mathbf{y}$, not the answer.",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "Find $L$ in the LU factorization (no row interchanges) of $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 4 & 5 & 2 \\\\ -2 & 5 & 3 \\end{bmatrix}$.",
    options: [
      m3([[1, 0, 0], [-2, 1, 0], [1, -2, 1]]),
      m3([[1, 0, 0], [2, 1, 0], [-1, 1, 1]]),
      m3([[1, 2, -1], [0, 1, 2], [0, 0, 1]]),
      m3([[1, 0, 0], [2, 1, 0], [-1, -2, 1]]),
      NOTA,
    ],
    answer: 4,
    solution:
      "$R_2 \\to R_2 - 2R_1$ gives $[0, 3, 0]$ ($\\ell_{21} = 2$); $R_3 \\to R_3 - (-1)R_1$ gives $[0, 6, 4]$ ($\\ell_{31} = -1$); then $R_3 \\to R_3 - 2R_2$ gives $[0,0,4]$ ($\\ell_{32} = 2$, computed from the **updated** rows $6/3$, not $5/5$). So\n$$L = \\begin{bmatrix}1&0&0\\\\2&1&0\\\\-1&2&1\\end{bmatrix},\\quad U = \\begin{bmatrix}2&1&1\\\\0&3&0\\\\0&0&4\\end{bmatrix}.$$\nThis $L$ is not among (a)–(d): **None of the above**. The options contain negated multipliers, $\\ell_{32}$ from the original entries, a transpose, and a sign slip in $\\ell_{32}$.",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "Why is the LU factorization useful in practice?",
    options: [
      "It turns any matrix into an invertible one",
      "Once $L$ and $U$ are known, each new right-hand side $\\mathbf{b}$ costs only two triangular solves, without computing $A^{-1}$",
      "It only works for symmetric matrices, which are the common case",
      "$L$ and $U$ are orthogonal matrices, so their inverses are their transposes",
      NOTA,
    ],
    answer: 1,
    solution:
      "Elimination (the expensive part, about $\\tfrac23n^3$ operations) is done once and stored in $L$ and $U$. Every new $\\mathbf{b}$ then needs forward substitution in $L\\mathbf{y} = \\mathbf{b}$ and back substitution in $U\\mathbf{x} = \\mathbf{y}$, about $2n^2$ operations, cheaper and more accurate than forming $A^{-1}$.",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "In an LU factorization $A = LU$ found by elimination without row interchanges, the entry $\\ell_{32}$ of $L$ is",
    options: [
      "the multiplier $m$ in the step $R_3 \\to R_3 - mR_2$ (using the current rows)",
      "the negative of that multiplier",
      "$a_{32}/a_{22}$ computed from the original entries of $A$",
      "the $(3,2)$ entry of $A^{-1}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "If the step is $R_3 \\to R_3 - mR_2$, then $\\ell_{32} = m$ with the **same** sign (the elementary matrix has $-m$, and its inverse, which goes into $L$, has $+m$). The rows used are the current ones after the first column has been cleared, so $a_{32}/a_{22}$ from the original $A$ is generally wrong.",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "$A = PDP^{-1}$ with $P$ invertible and $D = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1/2 & 0 \\\\ 0 & 0 & 1/3 \\end{bmatrix}$. What does $A^k$ approach as $k \\to \\infty$?",
    options: [
      "The zero matrix",
      "$I$",
      "$P\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}P^{-1}$",
      "$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$A^k = PD^kP^{-1}$ with $D^k = \\operatorname{diag}(1, 1/2^k, 1/3^k) \\to \\operatorname{diag}(1, 0, 0)$. So $A^k \\to P\\operatorname{diag}(1,0,0)P^{-1}$. The $P$ and $P^{-1}$ do not disappear; dropping them is the trap. (Tutorial 2 Q8.)",
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "$A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}$. Find $A^3$.",
    options: [m2("15", "-7", "14", "-6"), m2("15", "14", "-7", "-6"), m2("27", "-1", "8", "0"), m2("9", "-3", "6", "0"), NOTA],
    answer: 0,
    solution:
      "$P^{-1} = \\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix}$ and $A^3 = PD^3P^{-1} = \\begin{bmatrix}1&1\\\\1&2\\end{bmatrix}\\begin{bmatrix}8&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix} = \\begin{bmatrix}8&1\\\\8&2\\end{bmatrix}\\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix} = \\begin{bmatrix}15&-7\\\\14&-6\\end{bmatrix}$.\nThe distractors are $P^{-1}D^3P$ (wrong order), the entries of $A = \\begin{bmatrix}3&-1\\\\2&0\\end{bmatrix}$ cubed, and $3A$.",
  },
  {
    subtopic: "Block matrices",
    kind: "mcq",
    prompt: "$A$ and $D$ are invertible square matrices and $M = \\begin{bmatrix} A & B \\\\ 0 & D \\end{bmatrix}$. Then $M^{-1} = \\begin{bmatrix} A^{-1} & X \\\\ 0 & D^{-1} \\end{bmatrix}$ where $X = $",
    options: ["$-D^{-1}BA^{-1}$", "$A^{-1}BD^{-1}$", "$-A^{-1}BD^{-1}$", "$-B$", NOTA],
    answer: 2,
    solution:
      "Multiply blockwise: $\\begin{bmatrix}A&B\\\\0&D\\end{bmatrix}\\begin{bmatrix}A^{-1}&X\\\\0&D^{-1}\\end{bmatrix} = \\begin{bmatrix}I & AX + BD^{-1}\\\\0&I\\end{bmatrix}$. We need $AX + BD^{-1} = 0$, so $X = -A^{-1}BD^{-1}$. Keep the order: $A^{-1}$ on the left (it came from the left factor $A$), $D^{-1}$ on the right.",
  },
  {
    subtopic: "Block matrices",
    kind: "mcq",
    prompt: "$A$, $B$, $C$, $D$ are $n\\times n$. Compute the block product $\\begin{bmatrix} A & B \\end{bmatrix}\\begin{bmatrix} C \\\\ D \\end{bmatrix}$.",
    options: ["$CA + DB$", "$AC + BD$", "$AD + BC$", "$\\begin{bmatrix} AC & BD \\end{bmatrix}$", NOTA],
    answer: 1,
    solution:
      "Row-times-column with blocks: (block row) $\\cdot$ (block column) $= AC + BD$, an $n\\times n$ matrix. Keep each block product in the order it appears: $AC$, not $CA$.",
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "If $B$ and $C$ are both inverses of the $n\\times n$ matrix $A$, which argument correctly shows $B = C$?",
    options: [
      "$B = BI = B(AC) = (BA)C = IC = C$",
      "$B = A^{-1} = C$, because $A^{-1}$ denotes the inverse",
      "$A(B - C) = 0$, so $A = 0$ or $B - C = 0$",
      "$B$ and $C$ have the same determinant, so they are equal",
      NOTA,
    ],
    answer: 0,
    solution:
      "Associativity does it: $B = BI = B(AC) = (BA)C = IC = C$. The second option assumes what is to be proved (that the symbol $A^{-1}$ is well defined). The third uses \"$XY = 0 \\Rightarrow X = 0$ or $Y = 0$\", which is false for matrices. Equal determinants do not imply equal matrices.",
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "Find the inverse of $A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}$.",
    options: [
      m2("2", "-3", "-2", "4"),
      m2("1", "-1", "-\\frac32", "2"),
      m2("1", "-\\frac32", "-1", "2"),
      m2("2", "-\\frac32", "-1", "1"),
      NOTA,
    ],
    answer: 2,
    solution:
      "$\\det A = 8 - 6 = 2$, so $A^{-1} = \\tfrac12\\begin{bmatrix}2&-3\\\\-2&4\\end{bmatrix} = \\begin{bmatrix}1&-3/2\\\\-1&2\\end{bmatrix}$. The other options forget to divide by 2, transpose the answer, or forget to swap the diagonal.",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt: "The columns $\\mathbf{b}_1, \\mathbf{b}_2, \\mathbf{b}_3$ of $B$ satisfy $\\mathbf{b}_3 = 2\\mathbf{b}_1 - \\mathbf{b}_2$, and $A$ is any matrix for which $AB$ is defined. Which statement is correct?",
    options: [
      "The columns of $AB$ are independent whenever $A$ is invertible",
      "$A\\mathbf{b}_3 = 2A\\mathbf{b}_1 + A\\mathbf{b}_2$",
      "$A\\mathbf{b}_3 = 2A\\mathbf{b}_1 - A\\mathbf{b}_2$ only if $A$ is invertible",
      "$A\\mathbf{b}_3 = 2A\\mathbf{b}_1 - A\\mathbf{b}_2$ for every such $A$",
      NOTA,
    ],
    answer: 3,
    solution:
      "The columns of $AB$ are $A\\mathbf{b}_1, A\\mathbf{b}_2, A\\mathbf{b}_3$, and by linearity $A\\mathbf{b}_3 = A(2\\mathbf{b}_1 - \\mathbf{b}_2) = 2A\\mathbf{b}_1 - A\\mathbf{b}_2$ for **every** $A$. So the same dependence relation holds among the columns of $AB$: they are always dependent, even when $A$ is invertible.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ and $B$ are $n\\times n$ matrices with $AB = I$. Which statement must be true?",
    options: ["$B = A$", "$BA = I$, so $B = A^{-1}$", "$A$ is symmetric", "$BA$ need not equal $I$", NOTA],
    answer: 1,
    solution:
      "For **square** matrices a one-sided inverse is automatically two-sided: $AB = I$ means $B\\mathbf{x} = \\mathbf{0} \\Rightarrow \\mathbf{x} = AB\\mathbf{x} = \\mathbf{0}$, so $B$ is invertible (IMT) and $A = B^{-1}$, giving $BA = I$. For non-square matrices this fails (a $2\\times3$ $A$ and $3\\times2$ $B$ can give $AB = I_2$ while $BA \\ne I_3$).",
  },
];
