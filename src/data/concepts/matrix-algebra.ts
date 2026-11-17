import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";
const m2 = (a: string, b: string, c: string, d: string) => `$\\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix}$`;
const m3 = (rows: (string | number)[][]) => `$\\begin{bmatrix} ${rows.map((r) => r.join(" & ")).join(" \\\\ ")} \\end{bmatrix}$`;

// Where each fact comes from in the course materials.
const R = {
  comp: "Slides 2.1 Matrix Multiplication (alg p3–4)",
  def: "Slides 0B Inverse of a Matrix (mtx p13)",
  mul: "Slides 0B Properties of Matrix Multiplication (mtx p10)",
  cols: "Slides 0B Multiplication by Columns and by Rows (mtx p11)",
  t21: "Slides 2.2 Theorem 2.1 (alg p5)",
  t22: "Slides 2.2 Theorem 2.2 (alg p6)",
  elem: "Slides 2.2 Elementary matrices, Exercises 2.2.1–2.2.2 (alg p7–8)",
  t23: "Slides 2.2 Theorem 2.3, Exercise 2.2.3 (alg p9)",
  imt: "Slides 2.2 Theorem 2.4 Invertible Matrix Theorem (alg p10)",
  t12: "Slides 2.2 Theorem 1.2 recalled (alg p11)",
  ilt: "Slides 2.2 Invertible Linear Transformations (alg p12)",
  t49: "Slides 4.14 Theorem 4.9, IMT continued (vsp p66)",
  lu: "Slides 2.3.1 The LU factorization (alg p14–15)",
  luProc: "Slides 2.3.2 LU factorization procedure, Exercise 2.3.2 (alg p18–21)",
  plu: "Slides 2.3 Exercise 2.3.3, PA = LU (alg p21–22)",
  flops: "Slides 2.3 Exercise 2.3.1 and summary of flops (alg p16–17, p22)",
  pyp: "PYP 2021–24 written papers",
};

export const matrixAlgebraConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "Theorem 2.2 check: for all invertible $n\\times n$ matrices $A$ and $B$, the product $AB$ is invertible and $(AB)^{-1} = A^{-1}B^{-1}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Theorem 2.2.2 reverses the order: $(AB)^{-1} = B^{-1}A^{-1}$, since $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$. The two agree only when $A^{-1}$ and $B^{-1}$ commute. A counterexample: $A = \\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, $B = \\begin{bmatrix}1&0\\\\1&1\\end{bmatrix}$. A claim about **all** matrices with a counterexample is **False**.",
    ref: R.t22,
  },
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices. Then $A + B$ is invertible.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Theorem 2.2 is about **products**, not sums. $A = B = I$ gives $A + B = 2I$, which is invertible, but $A = I$, $B = -I$ gives $A + B = 0$, which is not. The given information does not decide it: **Not enough information**.",
    ref: `${R.t22}; PYP AY25/26 S2 Q6`,
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix and $A^2$ is invertible. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Let $C = (A^2)^{-1}$. Then $A(AC) = A^2C = I$, so $D = AC$ is an $n\\times n$ matrix with $AD = I$. That is statement (9) of the Invertible Matrix Theorem, so $A$ is invertible. **True** (a past-paper True/False).",
    ref: `${R.imt}; ${R.pyp} (T/F: A² invertible ⇒ A invertible)`,
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ and $B$ are $n\\times n$ matrices and $AB$ is invertible. Then $B$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $B\\mathbf{x} = \\mathbf{0}$ then $AB\\mathbf{x} = A\\mathbf{0} = \\mathbf{0}$, and since $AB$ is invertible, $\\mathbf{x} = (AB)^{-1}\\mathbf{0} = \\mathbf{0}$. So $B\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, and by the Invertible Matrix Theorem ((4) ⇒ (1)) $B$ is invertible. Then $A = (AB)B^{-1}$ is invertible too (Tutorial 2 Q2). **True**.",
    ref: `${R.imt}; Tutorial 2 Q2`,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is a $4\\times 3$ matrix whose columns are linearly independent. Then $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^4$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A $4\\times3$ matrix has at most 3 pivot positions (one per column), so it cannot have a pivot position in each of its 4 rows. By Theorem 1.2, $A\\mathbf{x} = \\mathbf{b}$ is **not** solvable for every $\\mathbf{b}$ in $\\mathbb{R}^4$. The Invertible Matrix Theorem, where \"independent columns\" and \"solvable for every $\\mathbf{b}$\" go together, is only for **square** matrices. **False**.",
    ref: `${R.t12}; ${R.imt}`,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix and $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^n$. Then $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A$ is square, so the Invertible Matrix Theorem applies: statement (6) holds, hence all ten statements hold, including (4): $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. **True**.",
    ref: R.imt,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is an $m\\times n$ matrix and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^m$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Only the trivial solution means no free variables: a pivot in every **column**. Solvable for every $\\mathbf{b}$ needs a pivot in every **row** (Theorem 1.2). If $m = n$ both hold (Tutorial 2 Q6), but $A = \\begin{bmatrix}1\\\\0\\end{bmatrix}$ ($2\\times1$) has only the trivial solution and $A\\mathbf{x} = \\begin{bmatrix}0\\\\1\\end{bmatrix}$ has no solution. The shape is not given: **Not enough information**.",
    ref: `${R.t12}; Tutorial 2 Q6`,
  },
  {
    subtopic: "Elementary matrices",
    kind: "tfn",
    prompt: "$E$ is the $3\\times 3$ elementary matrix that adds $3$ times row 1 to row 2. Then $E^2$ adds $9$ times row 1 to row 2.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$E^2A = E(EA)$ performs the operation twice: row 2 gets $3\\times$row 1 added, then another $3\\times$row 1 (row 1 is unchanged). The total is $6\\times$row 1, so $E^2 = \\begin{bmatrix}1&0&0\\\\6&1&0\\\\0&0&1\\end{bmatrix}$. **False** (this exact statement appeared in a past paper).",
    ref: `${R.elem}; ${R.pyp} (T/F: E adds 3·row 1 to row 2, E²)`,
  },
  {
    subtopic: "Elementary matrices",
    kind: "tfn",
    prompt: "Every elementary matrix is invertible, and its inverse is also an elementary matrix.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Slides: each elementary matrix $E$ is invertible, and the inverse of $E$ is the elementary matrix **of the same type** that transforms $E$ back into $I$ (a swap by the same swap, multiplying a row by $c \\ne 0$ by multiplying it by $1/c$, adding $k$ times a row by adding $-k$ times it). **True**.",
    ref: R.elem,
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix with $A^3 = 0$. Then $I - A$ is invertible and $(I - A)^{-1} = I + A + A^2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Multiply out: $(I - A)(I + A + A^2) = I + A + A^2 - A - A^2 - A^3 = I - A^3 = I$, and the product in the other order also gives $I - A^3 = I$. By the definition of the inverse, $I - A$ is invertible with that inverse. **True**.",
    ref: `${R.def}; ${R.pyp} (nilpotent A^m = 0 ⇒ I − A invertible)`,
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix with $A^2 = 0$. Then $A = 0$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "As on the slides, $AB = 0$ does not imply $A = 0$ or $B = 0$: $A = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix} \\ne 0$ but $A^2 = 0$. What **is** true is that $A$ cannot be invertible (otherwise $A = A^{-1}A^2 = 0$, contradiction). **False**.",
    ref: R.mul,
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is $m\\times n$ and $B$ is $n\\times p$. If the columns of $B$ are linearly dependent, then the columns of $AB$ are linearly dependent.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Dependent columns of $B$ give a nonzero $\\mathbf{x}$ with $B\\mathbf{x} = \\mathbf{0}$. Then $(AB)\\mathbf{x} = A(B\\mathbf{x}) = A\\mathbf{0} = \\mathbf{0}$ with the same nonzero $\\mathbf{x}$, so the columns of $AB$ are dependent. This is Tutorial 2 Q1. **True** for every $A$.",
    ref: "Tutorial 2 Q1",
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is an $m\\times n$ matrix with linearly dependent columns and $B$ is $n\\times p$. Then the columns of $AB$ are linearly dependent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The argument of Tutorial 2 Q1 needs $B\\mathbf{x} = \\mathbf{0}$, not $A\\mathbf{y} = \\mathbf{0}$. Example: $A = \\begin{bmatrix}1&1\\end{bmatrix}$ (dependent columns), $B = \\begin{bmatrix}1\\\\0\\end{bmatrix}$ gives $AB = [1]$, independent. With $B = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ we get $AB = [1\\ \\ 1]$, dependent. It depends on $B$: **Not enough information**. (If $A$ and $B$ are both **square**, it is true: $A$ singular makes $AB$ singular by the Invertible Matrix Theorem.)",
    ref: `Tutorial 2 Q1; ${R.imt}`,
  },
  {
    subtopic: "LU factorization",
    kind: "tfn",
    prompt: "Every invertible matrix has an LU factorization $A = LU$ obtained without row interchanges.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ is invertible ($ad - bc = -1$), but its first pivot position holds $0$, so it cannot be reduced to echelon form without a row interchange. Indeed in $LU$ with $L$ unit lower triangular the $(1,1)$ entry would be $u_{11} = 0$, and then the $(2,1)$ entry $\\ell_{21}u_{11} = 0 \\ne 1$. Such matrices need a permutation: $PA = LU$ (Exercise 2.3.3). **False**.",
    ref: `${R.lu}; ${R.plu}`,
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "tfn",
    prompt: "$A = PDP^{-1}$ where $P$ is an invertible $3\\times 3$ matrix and $D = \\begin{bmatrix}1&0&0\\\\0&1/2&0\\\\0&0&1/3\\end{bmatrix}$. Then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$D$ is invertible: $\\begin{bmatrix}1&0&0\\\\0&2&0\\\\0&0&3\\end{bmatrix}D = D\\begin{bmatrix}1&0&0\\\\0&2&0\\\\0&0&3\\end{bmatrix} = I$. So $P$, $D$, $P^{-1}$ are all invertible and by Theorem 2.2.2 their product $A$ is invertible. **True**.",
    ref: `Tutorial 2 Q8; ${R.t22}`,
  },
  {
    subtopic: "Inverse basics",
    kind: "tfn",
    prompt: "$A$ is an invertible $n\\times n$ matrix. Then for some $\\mathbf{b}\\in\\mathbb{R}^n$ the equation $A\\mathbf{x} = \\mathbf{b}$ may have infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Theorem 2.1: for **each** $\\mathbf{b}$ in $\\mathbb{R}^n$, $A\\mathbf{x} = \\mathbf{b}$ has the **unique** solution $\\mathbf{x} = A^{-1}\\mathbf{b}$ (if $A\\mathbf{u} = \\mathbf{b}$, multiplying by $A^{-1}$ gives $\\mathbf{u} = A^{-1}\\mathbf{b}$). **False**.",
    ref: R.t21,
  },
  {
    subtopic: "Inverse by row reduction",
    kind: "tfn",
    prompt: "$A$ is an invertible $n\\times n$ matrix. Any sequence of elementary row operations that reduces $A$ to $I_n$ also transforms $I_n$ into $A^{-1}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "This is Theorem 2.3. In matrix form: if $E_p\\cdots E_1A = I_n$ then $E_p\\cdots E_1 = A^{-1}$, and applying the same operations to $I_n$ gives $E_p\\cdots E_1I_n = A^{-1}$. That is why row reducing $[A \\;\\; I]$ to $[I \\;\\; A^{-1}]$ works. **True**.",
    ref: R.t23,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is a $3\\times3$ matrix with columns $\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3$ such that $\\mathbf{a}_1 - 3\\mathbf{a}_2 + 5\\mathbf{a}_3 = \\mathbf{0}$. Then $A$ is singular.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The relation says $A\\mathbf{x} = \\mathbf{0}$ for $\\mathbf{x} = (1, -3, 5) \\ne \\mathbf{0}$, so the columns are linearly dependent: statements (4) and (5) of the Invertible Matrix Theorem fail, hence (1) fails and $A$ is singular. **True** (a past-paper True/False).",
    ref: `${R.imt}; ${R.pyp} (T/F: a1 − 3a2 + 5a3 = 0 ⇒ A singular)`,
  },
  {
    subtopic: "Inverse algebra",
    kind: "tfn",
    prompt: "For every invertible $n\\times n$ matrix $A$, $(A^{-1})^T = (A^T)^{-1}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Theorem 2.2.3: if $A$ is invertible then so is $A^T$, and $(A^T)^{-1} = (A^{-1})^T$. Check: $A^T(A^{-1})^T = (A^{-1}A)^T = I^T = I$, using $(AB)^T = B^TA^T$. **True** (a past-paper True/False).",
    ref: `${R.t22}; ${R.pyp} (T/F: (A⁻¹)ᵀ = (Aᵀ)⁻¹)`,
  },
  {
    subtopic: "Invertibility deductions",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then $A^3\\mathbf{x} = \\mathbf{0}$ also has only the trivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "By the Invertible Matrix Theorem $A$ is invertible, so $A^3 = AAA$ is invertible (Theorem 2.2.2) and $A^3\\mathbf{x} = \\mathbf{0}$ gives $\\mathbf{x} = (A^3)^{-1}\\mathbf{0} = \\mathbf{0}$. (Or peel off one $A$ at a time: $A(A^2\\mathbf{x}) = \\mathbf{0} \\Rightarrow A^2\\mathbf{x} = \\mathbf{0} \\Rightarrow \\cdots \\Rightarrow \\mathbf{x} = \\mathbf{0}$.) This is Tutorial 2 Q4a. **True**.",
    ref: "Tutorial 2 Q4a",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix. The equation $A\\mathbf{x} = 4\\mathbf{x}$ has only the solution $\\mathbf{x} = \\mathbf{0}$ if and only if $A - 4I$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A\\mathbf{x} = 4\\mathbf{x} \\iff A\\mathbf{x} - 4I\\mathbf{x} = \\mathbf{0} \\iff (A - 4I)\\mathbf{x} = \\mathbf{0}$. By the Invertible Matrix Theorem ((1) ⇔ (4)) applied to the square matrix $A - 4I$, this has only the trivial solution exactly when $A - 4I$ is invertible. **True** (a past-paper True/False).",
    ref: `${R.imt}; ${R.pyp} (T/F: Ax = 4x unique iff A − 4I invertible)`,
  },
  {
    subtopic: "LU factorization",
    kind: "tfn",
    prompt: "$A$ is an $n\\times n$ matrix that cannot be reduced to echelon form without row interchanges. Then there is no permutation matrix $P$ for which $PA$ has an LU factorization.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The slides' summary: for **every** $n\\times n$ matrix $A$ there exists a permutation matrix $P$ such that $PA = LU$, with $L$ lower triangular with 1s on the diagonal and $U$ upper triangular. Exercise 2.3.3 uses $P = P_{23}$ to switch rows 2 and 3 first. **False**.",
    ref: R.plu,
  },
  {
    subtopic: "LU factorization",
    kind: "tfn",
    prompt: "$A$ is reduced to echelon form $U$ without row interchanges by unit lower triangular elementary matrices: $E_p\\cdots E_1A = U$. Then $L = (E_p\\cdots E_1)^{-1}$ is unit lower triangular and $A = LU$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A = (E_p\\cdots E_1)^{-1}U = LU$. The slides note that products and inverses of unit lower triangular matrices are also unit lower triangular, so $L$ is unit lower triangular. **True**.",
    ref: R.luProc,
  },

  // ---------------------------------------------------------------- MCQ
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "Find the inverse of $A = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$.",
    options: [m2("3", "-5", "-1", "2"), m2("2", "-1", "-5", "3"), m2("-2", "5", "1", "-3"), m2("2", "-5", "-1", "3"), NOTA],
    answer: 3,
    solution:
      "$ad - bc = 3\\cdot2 - 5\\cdot1 = 1$. Swap $a$ and $d$, negate $b$ and $c$, divide by $1$: $A^{-1} = \\begin{bmatrix}2&-5\\\\-1&3\\end{bmatrix}$. Check: $\\begin{bmatrix}3&5\\\\1&2\\end{bmatrix}\\begin{bmatrix}2&-5\\\\-1&3\\end{bmatrix} = \\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$. The other options forget the swap, transpose the answer, or negate everything.",
    ref: R.def,
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "For which value(s) of $k$ is $\\begin{bmatrix} k & 4 \\\\ 1 & k \\end{bmatrix}$ **not** invertible?",
    options: ["$k = \\pm 2$", "$k = 2$ only", "$k = \\pm 4$", "$k = 4$ only", NOTA],
    answer: 0,
    solution:
      "A $2\\times2$ matrix is invertible iff $ad - bc \\ne 0$. Here $ad - bc = k^2 - 4 = (k-2)(k+2)$, which is zero for $k = 2$ **and** $k = -2$.",
    ref: R.def,
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "$A = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$ has $A^{-1} = \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$. Solve $A\\mathbf{x} = \\mathbf{b}$ for $\\mathbf{b} = [1,\\ 2]^T$.",
    options: ["$[4,\\ 11]^T$", "$[-7,\\ 3]^T$", "$[1,\\ -1]^T$", "$[-1,\\ 1]^T$", NOTA],
    answer: 2,
    solution:
      "Theorem 2.1: $\\mathbf{x} = A^{-1}\\mathbf{b} = \\begin{bmatrix}3&-1\\\\-5&2\\end{bmatrix}\\begin{bmatrix}1\\\\2\\end{bmatrix} = \\begin{bmatrix}1\\\\-1\\end{bmatrix}$. Check: $2(1) + 1(-1) = 1$ and $5(1) + 3(-1) = 2$ ✓. $[4,11]^T$ is $A\\mathbf{b}$ (wrong matrix) and $[-7,3]^T$ is $(A^{-1})^T\\mathbf{b}$.",
    ref: R.t21,
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "$A$, $B$, $C$ are invertible $n\\times n$ matrices. Which expression equals $(ABC)^{-1}$?",
    options: ["$A^{-1}B^{-1}C^{-1}$", "$C^{-1}B^{-1}A^{-1}$", "$B^{-1}A^{-1}C^{-1}$", "$C^{-1}A^{-1}B^{-1}$", NOTA],
    answer: 1,
    solution:
      "Apply Theorem 2.2.2 twice: $(ABC)^{-1} = \\big((AB)C\\big)^{-1} = C^{-1}(AB)^{-1} = C^{-1}B^{-1}A^{-1}$. Check: $(ABC)(C^{-1}B^{-1}A^{-1}) = AB(CC^{-1})B^{-1}A^{-1} = A(BB^{-1})A^{-1} = I$. The other orders are not inverses unless the matrices happen to commute.",
    ref: R.t22,
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "$A$ is an invertible $n\\times n$ matrix. What is $(3A)^{-1}$?",
    options: ["$3A^{-1}$", "$-3A^{-1}$", "$9A^{-1}$", "$\\tfrac19 A^{-1}$", NOTA],
    answer: 4,
    solution:
      "$(3A)\\left(\\tfrac13A^{-1}\\right) = \\tfrac{3}{3}AA^{-1} = I$ (and similarly in the other order), so $(3A)^{-1} = \\tfrac13A^{-1}$: the scalar is inverted too. $\\tfrac13A^{-1}$ is not listed, so **None of the above**.",
    ref: `${R.def}; Tutorial 0B Q4`,
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "$A$ is invertible. Which matrix equals $\\big((A^{-1})^T\\big)^{-1}$?",
    options: ["$A$", "$A^{-1}$", "$(A^{-1})^T$", "$A^T$", NOTA],
    answer: 3,
    solution:
      "Theorem 2.2.3 with $A^{-1}$ in place of $A$: $\\big((A^{-1})^T\\big)^{-1} = \\big((A^{-1})^{-1}\\big)^T = A^T$ (Theorem 2.2.1). Check: $A^T(A^{-1})^T = (A^{-1}A)^T = I^T = I$.",
    ref: R.t22,
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices and $AXB = C$. Solve for $X$.",
    options: ["$X = A^{-1}CB^{-1}$", "$X = CA^{-1}B^{-1}$", "$X = A^{-1}B^{-1}C$", "$X = B^{-1}CA^{-1}$", NOTA],
    answer: 0,
    solution:
      "$A$ sits on the left of $X$, so multiply by $A^{-1}$ on the **left**; $B$ sits on the right, so multiply by $B^{-1}$ on the **right**: $A^{-1}(AXB)B^{-1} = X = A^{-1}CB^{-1}$. Since $AB \\ne BA$ in general, you may not move $B^{-1}$ past $C$.",
    ref: `Tutorial 2 Q3; ${R.mul}`,
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$, $B$, $X$ are $n\\times n$ with $A$, $X$ and $A - AX$ invertible, and $(A - AX)^{-1} = X^{-1}B$. Solve for $X$.",
    options: ["$X = A(A + B^{-1})^{-1}$", "$X = (A - B^{-1})^{-1}A$", "$X = (A + B^{-1})^{-1}A$", "$X = (A + B)^{-1}A$", NOTA],
    answer: 2,
    solution:
      "The right side $X^{-1}B$ equals an inverse, so it is invertible, and $B = X(X^{-1}B)$ is invertible. Invert both sides: $A - AX = (X^{-1}B)^{-1} = B^{-1}X$. Collect the $X$ terms on the right: $A = AX + B^{-1}X = (A + B^{-1})X$. Since $A$ and $X$ are invertible, $A + B^{-1} = AX^{-1}$ is invertible, and $X = (A + B^{-1})^{-1}A$ (multiply on the **left**, because $X$ is on the right of $A + B^{-1}$).",
    ref: "Tutorial 2 Q3",
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ is invertible and $A^3 = ABA - 4A^2$. Express $B$ in terms of $A$.",
    options: ["$B = A - 4I$", "$B = A + 4I$", "$B = A^2 + 4A$", "$B = 4I - A$", NOTA],
    answer: 1,
    solution:
      "Multiply on the left by $A^{-1}$: $A^2 = BA - 4A$. Multiply on the right by $A^{-1}$: $A = B - 4I$. So $B = A + 4I$. Strip the $A$'s from the **correct side**: there is an $A$ on the left of $B$ and one on the right of $B$.",
    ref: `${R.pyp} (A⁴ = ABA² + 2A³)`,
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ and $B$ are $n\\times n$ matrices with $A$ invertible, and $A^4 = ABA^2 + 2A^3$. Then $B = $",
    options: ["$A - 2I$", "$A + 2I$", "$2I - A$", "$A^2 - 2A$", NOTA],
    answer: 0,
    solution:
      "Multiply on the left by $A^{-1}$: $A^3 = BA^2 + 2A^2$. Multiply on the right by $A^{-2}$: $A = B + 2I$. So $B = A - 2I$ (equivalently $A = B + 2I$, as in the past paper).",
    ref: `${R.pyp} (A⁴ = ABA² + 2A³)`,
  },
  {
    subtopic: "Matrix equations",
    kind: "mcq",
    prompt: "$A$ and $B$ are invertible $n\\times n$ matrices and $A(X - Y)B^{-1} = A$. Then $X = $",
    options: ["$B^{-1} + Y$", "$Y - B$", "$AB + Y$", "$B + Y$", NOTA],
    answer: 3,
    solution:
      "Left-multiply by $A^{-1}$: $(X - Y)B^{-1} = I$. Right-multiply by $B$: $X - Y = B$. So $X = B + Y$.",
    ref: "PYP AY25/26 S2 Q5",
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E$ is the $3\\times 3$ elementary matrix for $r2 \\leftarrow r2 - 3r1$. Find $E^{-1}$.",
    options: [
      m3([[1, 0, 0], [-3, 1, 0], [0, 0, 1]]),
      m3([[1, 3, 0], [0, 1, 0], [0, 0, 1]]),
      m3([[1, 0, 0], [3, 1, 0], [0, 0, 1]]),
      m3([[1, 0, 0], ["\\frac13", 1, 0], [0, 0, 1]]),
      NOTA,
    ],
    answer: 2,
    solution:
      "$E = \\begin{bmatrix}1&0&0\\\\-3&1&0\\\\0&0&1\\end{bmatrix}$ subtracts $3\\times$row 1 from row 2. To transform $E$ back into $I$, **add** $3\\times$row 1 to row 2 (as in Exercise 2.2.2): $E^{-1} = \\begin{bmatrix}1&0&0\\\\3&1&0\\\\0&0&1\\end{bmatrix}$. Only the sign of the multiplier changes; it is not inverted to $1/3$ and it does not move to position $(1,2)$.",
    ref: R.elem,
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 4 & 1 \\end{bmatrix}$ and $A$ is any $3\\times n$ matrix. What does $EA$ do to $A$?",
    options: [
      "Adds $4$ times row 3 to row 2",
      "Adds $4$ times row 2 to row 3",
      "Multiplies row 3 by $4$",
      "Subtracts $4$ times row 2 from row 3",
      NOTA,
    ],
    answer: 1,
    solution:
      "$E$ is $I_3$ after $r3 \\leftarrow r3 + 4r2$, and the slides say $EA$ is $A$ after the **same** row operation. Directly: row 3 of $EA$ is $0\\cdot\\mathbf{r}_1 + 4\\mathbf{r}_2 + 1\\cdot\\mathbf{r}_3$, and rows 1, 2 are unchanged.",
    ref: R.elem,
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}$ and $E_2 = \\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ (Exercise 2.2.1). Then $E_2A = $",
    options: [
      m3([["b", "a", "c"], ["e", "d", "f"], ["h", "g", "i"]]),
      m3([["d", "e", "f"], ["a", "b", "c"], ["g", "h", "i"]]),
      m3([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]]),
      m3([["g", "h", "i"], ["d", "e", "f"], ["a", "b", "c"]]),
      NOTA,
    ],
    answer: 1,
    solution:
      "$E_2$ is $I_3$ with rows 1 and 2 swapped, so $E_2A$ is $A$ with rows 1 and 2 swapped: $\\begin{bmatrix} d & e & f \\\\ a & b & c \\\\ g & h & i \\end{bmatrix}$. The first option swaps **columns** 1 and 2 instead, which is not what left-multiplication does.",
    ref: R.elem,
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$ (Exercise 2.2.2). Find $E_3^{-1}$.",
    options: [
      m3([[1, 0, 0], [0, 1, 0], [0, 0, -5]]),
      m3([[5, 0, 0], [0, 5, 0], [0, 0, 1]]),
      m3([[1, 0, 0], [0, 1, 0], [0, 0, "\\frac15"]]),
      m3([[1, 0, 0], [0, 1, 0], [0, 0, 5]]),
      NOTA,
    ],
    answer: 2,
    solution:
      "$E_3$ multiplies row 3 by $5$. The elementary matrix of the same type that transforms $E_3$ back into $I$ multiplies row 3 by $\\tfrac15$: $E_3^{-1} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1/5 \\end{bmatrix}$. Check: $E_3E_3^{-1} = I$.",
    ref: R.elem,
  },
  {
    subtopic: "Elementary matrices",
    kind: "mcq",
    prompt: "$E$ is the $3\\times 3$ elementary matrix that swaps rows 1 and 3. What is $E^{2025}$?",
    options: ["$I$", "$-I$", "$E$", "$2025E$", NOTA],
    answer: 2,
    solution:
      "Swapping the same two rows twice restores the original order, so $E^2 = I$ (a swap is its own inverse). Then $E^{2025} = (E^2)^{1012}E = E$.",
    ref: R.elem,
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
      "With $E_1$ = (add $2\\times$row 1 to row 2) and $E_2$ = (multiply row 1 by 3), doing $E_1$ first means $M = E_2E_1$ (the first operation sits next to $A$, as in $E_p\\cdots E_1A$). Apply both operations to $I$ in order: after $E_1$ the rows are $(1,0,0), (2,1,0), (0,0,1)$; multiplying row 1 by 3 gives $\\begin{bmatrix}3&0&0\\\\2&1&0\\\\0&0&1\\end{bmatrix}$. The first option is $E_1E_2$ (multiply first, then add twice the **new** row 1 $= 6$).",
    ref: `${R.elem}; ${R.luProc}`,
  },
  {
    subtopic: "Inverse by row reduction",
    kind: "mcq",
    prompt: "(Exercise 2.2.3) Row reduce $[A \\;\\; I]$ to find the inverse of $A = \\begin{bmatrix} 0 & 1 & 2 \\\\ 1 & 0 & 3 \\\\ 4 & -3 & 8 \\end{bmatrix}$. What is the **first row** of $A^{-1}$?",
    options: [
      "$\\left[-\\frac92,\\ -2,\\ \\frac32\\right]$",
      "$\\left[-\\frac92,\\ 7,\\ -\\frac32\\right]$",
      "$\\left[\\frac92,\\ -7,\\ \\frac32\\right]$",
      "$[-9,\\ 14,\\ -3]$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$r1 \\leftrightarrow r2$; $r3 \\leftarrow r3 - 4r1$; $r3 \\leftarrow r3 + 3r2$ gives $[0, 0, 2 \\mid 3, -4, 1]$; $r3 \\leftarrow \\tfrac12r3$; then $r2 \\leftarrow r2 - 2r3$ and $r1 \\leftarrow r1 - 3r3$ give\n$$A^{-1} = \\begin{bmatrix} -9/2 & 7 & -3/2 \\\\ -2 & 4 & -1 \\\\ 3/2 & -2 & 1/2 \\end{bmatrix}.$$\nThe first row is $[-\\tfrac92, 7, -\\tfrac32]$; the first option is the first **column**, and $[-9, 14, -3]$ forgets the step $r3 \\leftarrow \\tfrac12 r3$. Check: row 1 of $A^{-1}$ times column 1 of $A$: $0 + 7 - 6 = 1$ ✓.",
    ref: R.t23,
  },
  {
    subtopic: "Inverse by row reduction",
    kind: "mcq",
    prompt: "Row reducing $[A \\;\\; I]$ for $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{bmatrix}$ gives $[I \\;\\; A^{-1}]$. What is the **third row** of $A^{-1}$?",
    options: ["$[-5,\\ 4,\\ 1]$", "$[-24,\\ 20,\\ -5]$", "$[5,\\ -4,\\ -1]$", "$[1,\\ 4,\\ 0]$", NOTA],
    answer: 0,
    solution:
      "$r3 \\leftarrow r3 - 5r1$ gives row 3 $= [0, -4, -15 \\mid -5, 0, 1]$; then $r3 \\leftarrow r3 + 4r2$ gives $[0, 0, 1 \\mid -5, 4, 1]$. Clearing column 3 and then column 2 upwards gives\n$$A^{-1} = \\begin{bmatrix} -24 & 18 & 5 \\\\ 20 & -15 & -4 \\\\ -5 & 4 & 1 \\end{bmatrix}.$$\nThe third row is $[-5, 4, 1]$; $[-24, 20, -5]$ is the first **column**. Check: row 3 of $A^{-1}$ times column 3 of $A$ is $-15 + 16 + 0 = 1$ ✓.",
    ref: R.t23,
  },
  {
    subtopic: "Inverse by row reduction",
    kind: "mcq",
    prompt: "While row reducing $[A \\;\\; I]$ for a $3\\times3$ matrix $A$, the left block becomes $\\begin{bmatrix} 1 & 0 & 2 \\\\ 0 & 1 & -1 \\\\ 0 & 0 & 0 \\end{bmatrix}$. What can you conclude?",
    options: [
      "$A^{-1}$ exists and has a zero row",
      "$A$ is not invertible",
      "$A$ is invertible, but a row swap is needed to finish",
      "$A^{-1}$ is the current right-hand block",
      NOTA,
    ],
    answer: 1,
    solution:
      "$A$ is row equivalent to a matrix with only 2 pivot positions, so $A$ has 2 pivot positions, not 3. Statement (3) of the Invertible Matrix Theorem fails, so $A$ is not row equivalent to $I_3$ and, by Theorem 2.3, **not invertible**. No row swap can create a third pivot.",
    ref: `${R.t23}; ${R.imt}`,
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
      "A nontrivial solution means statement (4) fails, so by the Invertible Matrix Theorem (square $A$) **every** statement fails: fewer than 5 pivots (3), some $\\mathbf{b}$ give no solution (6), the columns do not span $\\mathbb{R}^5$ (7), and $A^T$ is singular (10).",
    ref: R.imt,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "Which statement is **not** equivalent to \"$A$ is an invertible $n\\times n$ matrix\"?",
    options: [
      "$\\text{Rank of } A = n$",
      "The columns of $A$ are linearly independent",
      "$A\\mathbf{x} = \\mathbf{b}$ has at least one solution for each $\\mathbf{b}\\in\\mathbb{R}^n$",
      "$A^T$ is invertible",
      "$A$ is symmetric ($A^T = A$)",
    ],
    answer: 4,
    solution:
      "The first four are statements (14), (5), (6) and (10) of the Invertible Matrix Theorem (Theorems 2.4 and 4.9). Symmetry is unrelated: $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ is symmetric but singular ($ad - bc = 0$), and $\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$ is invertible but not symmetric.",
    ref: `${R.imt}; ${R.t49}`,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ is a $3\\times 5$ matrix. Which statement **must** be true?",
    options: [
      "The columns of $A$ span $\\mathbb{R}^3$",
      "$A$ has a pivot position in every row",
      "$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution",
      "Whenever $A\\mathbf{x} = \\mathbf{b}$ is consistent, the solution is unique",
      NOTA,
    ],
    answer: 2,
    solution:
      "There are at most 3 pivots (one per row) but 5 columns, so at least 2 free variables: $A\\mathbf{x} = \\mathbf{0}$ always has nontrivial solutions (the columns of every $3\\times5$ matrix are dependent, a past-paper True/False), and consistent systems have infinitely many solutions. $A$ need not have a pivot in every row (e.g. $A = 0$), so by Theorem 1.2 its columns need not span $\\mathbb{R}^3$.",
    ref: `${R.t12}; ${R.pyp} (T/F: columns of every 3×5 matrix dependent)`,
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
      "Let $M = (A + B)C^2$. Then $(A + B)\\big(C^2M^{-1}\\big) = I$ and $\\big(M^{-1}(A + B)C\\big)C = I$, so by the Invertible Matrix Theorem ((9) and (8)) $A + B$ and $C$ are invertible. Nothing follows about $A$ or $B$ separately: $A = I$, $B = 0$ works, and so does $A = 0$, $B = I$.",
    ref: `${R.imt}; PYP AY25/26 S2 Q6`,
  },
  {
    subtopic: "Invertibility deductions",
    kind: "mcq",
    prompt: "$A$ and $B$ are $n\\times n$, $B$ is invertible and $AB$ is invertible. Which expression equals $A^{-1}$?",
    options: ["$(AB)^{-1}B$", "$B(AB)^{-1}$", "$(AB)^{-1}B^{-1}$", "$B^{-1}(AB)$", NOTA],
    answer: 1,
    solution:
      "$A = (AB)B^{-1}$ is a product of invertible matrices, so by Theorem 2.2 it is invertible with $A^{-1} = (B^{-1})^{-1}(AB)^{-1} = B(AB)^{-1}$. Check: $A\\cdot B(AB)^{-1} = (AB)(AB)^{-1} = I$. This is Tutorial 2 Q2.",
    ref: `Tutorial 2 Q2; ${R.t22}`,
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
      "$N^2 = \\begin{bmatrix}0&0&8\\\\0&0&0\\\\0&0&0\\end{bmatrix}$ and $N^3 = 0$, so $(I - N)(I + N + N^2) = I - N^3 = I$ and $(I - N)^{-1} = I + N + N^2 = \\begin{bmatrix}1&2&11\\\\0&1&4\\\\0&0&1\\end{bmatrix}$. Check row 1 of $(I-N)$ times the last column: $11 - 2\\cdot4 - 3\\cdot1 = 0$ ✓. $I + N$ forgets $N^2$; $I - N$ is the matrix itself.",
    ref: `${R.pyp} (nilpotent A^m = 0 ⇒ I − A invertible)`,
  },
  {
    subtopic: "Nilpotent matrices",
    kind: "mcq",
    prompt: "$A$ is an $n\\times n$ matrix with $A^k = 0$ for some positive integer $k$. Which statement must be true?",
    options: ["$A = 0$", "$A^2 = 0$", "$A$ is not invertible", "$A + I$ is not invertible", NOTA],
    answer: 2,
    solution:
      "If $A$ were invertible, so would be $A^k$ (Theorem 2.2.2), but $A^k = 0$ is not. So $A$ is singular. $A$ need not be $0$ and $A^2$ need not be $0$: $N = \\begin{bmatrix}0&2&3\\\\0&0&4\\\\0&0&0\\end{bmatrix}$ has $N^2 \\ne 0 = N^3$. $A + I$ need not be singular: $A = 0$ has $A^1 = 0$ and $A + I = I$.",
    ref: `${R.t22}; ${R.pyp} (nilpotent A^m = 0)`,
  },
  {
    subtopic: "Solution structure",
    kind: "mcq",
    prompt: "$A\\mathbf{x} = \\mathbf{b}$ has the solution $\\mathbf{x}_1 = (1, 2, 0)$, and the solutions of $A\\mathbf{x} = \\mathbf{0}$ are exactly the multiples of $(1, -1, 1)$. Which vector is also a solution of $A\\mathbf{x} = \\mathbf{b}$?",
    options: ["$(1,\\ -1,\\ 1)$", "$(2,\\ 1,\\ 0)$", "$(2,\\ 3,\\ -1)$", "$(3,\\ 0,\\ 2)$", NOTA],
    answer: 3,
    solution:
      "Every solution has the form $\\mathbf{x} = \\mathbf{x}_1 + \\mathbf{x}_0$ with $A\\mathbf{x}_0 = \\mathbf{0}$ (Tutorial 2 Q4b), so $\\mathbf{x} - \\mathbf{x}_1$ must be a multiple of $(1,-1,1)$. $(3,0,2) - (1,2,0) = (2,-2,2) = 2(1,-1,1)$ ✓. The others give $(0,-3,1)$, $(1,-1,0)$, $(1,1,-1)$, none of which are multiples. $(1,-1,1)$ itself solves $A\\mathbf{x} = \\mathbf{0}$, not $A\\mathbf{x} = \\mathbf{b}$.",
    ref: "Tutorial 2 Q4b",
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "$A = LU$ with $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -1 & 3 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 2 & 1 & -1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 4 \\end{bmatrix}$. Solve $A\\mathbf{x} = \\mathbf{b}$ for $\\mathbf{b} = [2,\\ 9,\\ 17]^T$.",
    options: ["$[2,\\ 5,\\ 4]^T$", "$[1,\\ 1,\\ 1]^T$", "$[1,\\ 1,\\ -1]^T$", "$[2,\\ 9,\\ 17]^T$", NOTA],
    answer: 1,
    solution:
      "Forward substitution, $L\\mathbf{y} = \\mathbf{b}$: $y_1 = 2$, $y_2 = 9 - 2(2) = 5$, $y_3 = 17 + 2 - 3(5) = 4$. Backward substitution, $U\\mathbf{x} = \\mathbf{y}$: $4x_3 = 4 \\Rightarrow x_3 = 1$, $3x_2 + 2 = 5 \\Rightarrow x_2 = 1$, $2x_1 + 1 - 1 = 2 \\Rightarrow x_1 = 1$. So $\\mathbf{x} = [1,1,1]^T$. $[2,5,4]^T$ is the intermediate $\\mathbf{y}$, not the answer.",
    ref: `${R.lu}; Tutorial 2 Q7`,
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
      "Column 1: circled entries $2, 4, -2$, pivot $2$, so column 1 of $L$ is $(1, 2, -1)$. $r2 \\leftarrow r2 - 2r1$ gives $[0, 3, 0]$; $r3 \\leftarrow r3 + r1$ gives $[0, 6, 4]$.\nColumn 2: circled entries $3, 6$ in the **reduced** matrix, pivot $3$, so column 2 of $L$ is $(0, 1, 2)$; $r3 \\leftarrow r3 - 2r2$ gives $[0,0,4]$. So\n$$L = \\begin{bmatrix}1&0&0\\\\2&1&0\\\\-1&2&1\\end{bmatrix},\\quad U = \\begin{bmatrix}2&1&1\\\\0&3&0\\\\0&0&4\\end{bmatrix}.$$\nThis $L$ is not among (a)–(d): **None of the above**. The options contain negated entries, $5/5$ taken from the original $A$, an upper triangular matrix, and a sign slip in the $(3,2)$ entry.",
    ref: R.luProc,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "$A = \\begin{bmatrix} 3 & 1 & 2 \\\\ 6 & 4 & 5 \\\\ -3 & 5 & 4 \\end{bmatrix}$ can be reduced to echelon form without row interchanges. Find $L$ in $A = LU$.",
    options: [
      m3([[1, 0, 0], [-2, 1, 0], [1, -3, 1]]),
      m3([[1, 0, 0], [2, 1, 0], [-1, "\\frac54", 1]]),
      m3([[1, 0, 0], [2, 1, 0], [-1, 3, 1]]),
      m3([[1, 0, 0], [2, 1, 0], [-1, 6, 1]]),
      NOTA,
    ],
    answer: 2,
    solution:
      "Column 1: circled entries $3, 6, -3$ divided by the pivot $3$ give $(1, 2, -1)$. $r2 \\leftarrow r2 - 2r1$: $[0, 2, 1]$; $r3 \\leftarrow r3 + r1$: $[0, 6, 6]$.\nColumn 2: circled entries $2, 6$ divided by the pivot $2$ give $(1, 3)$. $r3 \\leftarrow r3 - 3r2$: $[0, 0, 3]$.\n$$L = \\begin{bmatrix}1&0&0\\\\2&1&0\\\\-1&3&1\\end{bmatrix},\\quad U = \\begin{bmatrix}3&1&2\\\\0&2&1\\\\0&0&3\\end{bmatrix}.$$\nTraps: negated entries, $5/4$ from the original matrix instead of the reduced one, and $6$ (not divided by the pivot $2$).",
    ref: R.luProc,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "$A$ is reduced to $U$ by $E_{21}$ ($r2 \\leftarrow r2 - 2r1$), then $E_{31}$ ($r3 \\leftarrow r3 + r1$), then $E_{32}$ ($r3 \\leftarrow r3 - 3r2$), so $E_{32}E_{31}E_{21}A = U$. Which product equals $L$ in $A = LU$?",
    options: [
      "$E_{32}E_{31}E_{21}$",
      "$E_{21}^{-1}E_{31}^{-1}E_{32}^{-1}$",
      "$E_{32}^{-1}E_{31}^{-1}E_{21}^{-1}$",
      "$E_{21}E_{31}E_{32}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$A = (E_{32}E_{31}E_{21})^{-1}U$, so $L = (E_{32}E_{31}E_{21})^{-1} = E_{21}^{-1}E_{31}^{-1}E_{32}^{-1}$ (Theorem 2.2.2 reverses the order). As on alg p21, this just puts the off-diagonal entries $2$, $-1$, $3$ of the inverses into positions $(2,1)$, $(3,1)$, $(3,2)$ of $L$. $E_{32}E_{31}E_{21}$ is $L^{-1}$, and the reversed product of inverses gives a different matrix.",
    ref: R.luProc,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "$A = LU$ and we want to solve $A\\mathbf{x} = \\mathbf{b}$. The slides let $\\mathbf{y} = U\\mathbf{x}$. Which procedure is correct?",
    options: [
      "Solve $L\\mathbf{y} = \\mathbf{b}$ by forward substitution, then $U\\mathbf{x} = \\mathbf{y}$ by backward substitution",
      "Solve $U\\mathbf{y} = \\mathbf{b}$ by backward substitution, then $L\\mathbf{x} = \\mathbf{y}$ by forward substitution",
      "Solve $L\\mathbf{y} = \\mathbf{b}$ by backward substitution, then $U\\mathbf{x} = \\mathbf{y}$ by forward substitution",
      "Solve $L\\mathbf{y} = \\mathbf{b}$; then $\\mathbf{x} = \\mathbf{y}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$A\\mathbf{x} = \\mathbf{b} \\Rightarrow LU\\mathbf{x} = \\mathbf{b}$. With $\\mathbf{y} = U\\mathbf{x}$ this is $L\\mathbf{y} = \\mathbf{b}$: solve for $\\mathbf{y}$ from the top down (forward substitution, $L$ is lower triangular). Then solve $U\\mathbf{x} = \\mathbf{y}$ from the bottom up (backward substitution, $U$ is upper triangular).",
    ref: R.lu,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "Why do the slides recommend the LU factorization for solving $A\\mathbf{x} = \\mathbf{b}_1, A\\mathbf{x} = \\mathbf{b}_2, \\dots, A\\mathbf{x} = \\mathbf{b}_p$?",
    options: [
      "It turns any matrix into an invertible one",
      "Once $L$ and $U$ are known, each new right-hand side $\\mathbf{b}$ costs only two triangular solves, without computing $A^{-1}$",
      "It only works for square matrices, which are the common case",
      "It avoids row reduction altogether",
      NOTA,
    ],
    answer: 1,
    solution:
      "Computing $A^{-1}$ and then $A^{-1}\\mathbf{b}_1, \\dots, A^{-1}\\mathbf{b}_p$ is the inefficient solution. The factorization $A = LU$ (about $2n^3/3$ flops, versus about $2n^3$ for $A^{-1}$) is done once; then each $\\mathbf{b}$ needs $L\\mathbf{y} = \\mathbf{b}$ and $U\\mathbf{x} = \\mathbf{y}$, $2n^2$ flops. LU works for $m\\times n$ matrices too, and $U$ comes from row reducing $A$.",
    ref: `${R.lu}; ${R.flops}`,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "In an LU factorization $A = LU$ found without row interchanges, the $(3,2)$ entry of $L$ is",
    options: [
      "the $(3,2)$ entry of the matrix after column 1 has been cleared, divided by the pivot in column 2",
      "the negative of that number",
      "$a_{32}/a_{22}$ computed from the original entries of $A$",
      "the $(3,2)$ entry of $A^{-1}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Slides (alg p20): at each pivot column, divide the circled entries (from the pivot down, in the **current** matrix) by the pivot and place the result into $L$. For column 2 the current matrix is the one after column 1 has been cleared, so $a_{32}/a_{22}$ from the original $A$ is generally wrong. The sign is kept: if the step is $r3 \\leftarrow r3 - mr2$, the entry is $+m$.",
    ref: R.luProc,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "$A = \\begin{bmatrix} 2 & 1 & 3 \\\\ 4 & 2 & 1 \\\\ -2 & 3 & 1 \\end{bmatrix}$. After $r2 \\leftarrow r2 - 2r1$ and $r3 \\leftarrow r3 + r1$ the $(2,2)$ pivot position holds $0$, so rows 2 and 3 must be switched: with $P = P_{23}$, $PA = LU$. Find $L$.",
    options: [
      m3([[1, 0, 0], [2, 1, 0], [-1, 0, 1]]),
      m3([[1, 0, 0], [-1, 1, 0], [2, 0, 1]]),
      m3([[1, 0, 0], [1, 1, 0], [-2, 0, 1]]),
      m3([[1, 0, 0], [-1, 1, 0], [2, 4, 1]]),
      NOTA,
    ],
    answer: 1,
    solution:
      "$PA = \\begin{bmatrix} 2 & 1 & 3 \\\\ -2 & 3 & 1 \\\\ 4 & 2 & 1 \\end{bmatrix}$. Column 1: circled entries $2, -2, 4$ over the pivot $2$ give $(1, -1, 2)$; $r2 \\leftarrow r2 + r1$ gives $[0, 4, 4]$ and $r3 \\leftarrow r3 - 2r1$ gives $[0, 0, -5]$. Column 2: circled entries $4, 0$ give $(1, 0)$.\n$$L = \\begin{bmatrix}1&0&0\\\\-1&1&0\\\\2&0&1\\end{bmatrix},\\quad U = \\begin{bmatrix}2&1&3\\\\0&4&4\\\\0&0&-5\\end{bmatrix}.$$\nCheck: row 3 of $LU$ is $2[2,1,3] + [0,0,-5] = [4,2,1]$ ✓. The first option uses the multipliers of $A$ in the unswitched order.",
    ref: R.plu,
  },
  {
    subtopic: "LU factorization",
    kind: "mcq",
    prompt: "For an $n\\times n$ dense matrix with $n$ moderately large, the slides give approximate costs. LU factorization costs about ___ flops and finding $A^{-1}$ costs about ___ flops.",
    options: ["$2n^3/3$ and $2n^3$", "$2n^3$ and $2n^3/3$", "$2n^2$ and $2n^3$", "$2n^3/3$ and $2n^2$", NOTA],
    answer: 0,
    solution:
      "Summary on alg p22: LU factorization about $2n^3/3$ flops; finding $A^{-1}$ about $2n^3$ flops; solving $L\\mathbf{y} = \\mathbf{b}$ and $U\\mathbf{x} = \\mathbf{y}$: $2n^2$ flops; multiplying $\\mathbf{b}$ by $A^{-1}$: about $2n^2$ flops.",
    ref: R.flops,
  },
  {
    subtopic: "Powers via A = PDP⁻¹",
    kind: "mcq",
    prompt: "$A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}$. Find $A^3$.",
    options: [m2("15", "-7", "14", "-6"), m2("15", "14", "-7", "-6"), m2("27", "-1", "8", "0"), m2("9", "-3", "6", "0"), NOTA],
    answer: 0,
    solution:
      "$P^{-1} = \\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix}$ and $A^3 = PD^3P^{-1} = \\begin{bmatrix}1&1\\\\1&2\\end{bmatrix}\\begin{bmatrix}8&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix} = \\begin{bmatrix}8&1\\\\8&2\\end{bmatrix}\\begin{bmatrix}2&-1\\\\-1&1\\end{bmatrix} = \\begin{bmatrix}15&-7\\\\14&-6\\end{bmatrix}$.\nThe distractors are $P^{-1}D^3P$ (wrong order), the entries of $A = \\begin{bmatrix}3&-1\\\\2&0\\end{bmatrix}$ cubed, and $3A$.",
    ref: "Tutorial 2 Q8",
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
      "$ad - bc = 8 - 6 = 2$, so $A^{-1} = \\tfrac12\\begin{bmatrix}2&-3\\\\-2&4\\end{bmatrix} = \\begin{bmatrix}1&-3/2\\\\-1&2\\end{bmatrix}$. The other options forget to divide by 2, transpose the answer, or forget to swap the diagonal.",
    ref: R.def,
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
      "The columns of $AB$ are $A\\mathbf{b}_1, A\\mathbf{b}_2, A\\mathbf{b}_3$ (multiplication by columns), and $A\\mathbf{b}_3 = A(2\\mathbf{b}_1 - \\mathbf{b}_2) = 2A\\mathbf{b}_1 - A\\mathbf{b}_2$ for **every** $A$. So the same dependence relation holds among the columns of $AB$: they are always dependent, even when $A$ is invertible (Tutorial 2 Q1).",
    ref: `${R.cols}; Tutorial 2 Q1`,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ and $B$ are $n\\times n$ matrices with $AB = I$. Which statement must be true?",
    options: ["$B = A$", "$BA = I$, so $B = A^{-1}$", "$A$ is symmetric", "$BA$ need not equal $I$", NOTA],
    answer: 1,
    solution:
      "$AB = I$ is statement (9) of the Invertible Matrix Theorem (with $D = B$), so $A$ is invertible. Then $B = A^{-1}(AB) = A^{-1}$, and $BA = A^{-1}A = I$. For square matrices a one-sided inverse is the inverse.",
    ref: R.imt,
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ is an $n\\times n$ matrix with $\\dim \\mathbf{N}(A) = 0$. Which statement must be true?",
    options: [
      "$\\mathbf{C}(A) = \\mathbb{R}^n$",
      "$\\text{Rank of } A < n$",
      "The columns of $A$ are linearly dependent",
      "$A^T$ is not invertible",
      NOTA,
    ],
    answer: 0,
    solution:
      "$\\dim\\mathbf{N}(A) = 0$ is statement (16) of the Invertible Matrix Theorem (Theorem 4.9), so $A$ is invertible and every other statement holds: (12) $\\mathbf{C}(A) = \\mathbb{R}^n$, (14) rank $= n$, (5) independent columns, (10) $A^T$ invertible.",
    ref: `${R.t49}; ${R.imt}`,
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    prompt: "A vector $\\mathbf{x}$ is multiplied first by $B$ and then by $A$. Which single matrix produces the same result?",
    options: ["$BA$", "$AB$", "$A + B$", "$B^{-1}A$", NOTA],
    answer: 1,
    solution:
      "The result is $A(B\\mathbf{x}) = (AB)\\mathbf{x}$ (alg p4). The matrix applied first ($B$) is written on the **right**. $BA$ is different in general, since $AB \\ne BA$.",
    ref: `${R.comp}; ${R.mul}`,
  },
  {
    subtopic: "Inverse basics",
    kind: "mcq",
    prompt: "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}$, and $T(\\mathbf{x}) = (3, 2)$. Find $\\mathbf{x}$.",
    options: ["$(8,\\ 5)$", "$(1,\\ -1)$", "$(-1,\\ 1)$", "$(1,\\ 1)$", NOTA],
    answer: 3,
    solution:
      "Multiplication by $A^{-1}$ transforms $A\\mathbf{x}$ back to $\\mathbf{x}$. $ad - bc = 1$, so $A^{-1} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$ and $\\mathbf{x} = A^{-1}(3, 2) = (3 - 2, -3 + 4) = (1, 1)$. Check: $A(1,1) = (3, 2)$ ✓. $(8, 5)$ is $A(3,2)$, applying $A$ again instead of undoing it.",
    ref: `${R.ilt}; ${R.def}`,
  },
  {
    subtopic: "Inverse algebra",
    kind: "mcq",
    prompt: "A $2\\times2$ matrix $A$ satisfies $(2A)^{-1} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$. Find $A$.",
    options: [
      m2("-4", "2", "3", "-1"),
      m2("-2", "1", "\\frac32", "-\\frac12"),
      m2("\\frac12", "1", "\\frac32", "2"),
      m2("-1", "\\frac12", "\\frac34", "-\\frac14"),
      NOTA,
    ],
    answer: 3,
    solution:
      "Invert both sides (Theorem 2.2.1): $2A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}^{-1} = \\frac{1}{4 - 6}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$. So $A = \\frac12\\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix} = \\begin{bmatrix} -1 & 1/2 \\\\ 3/4 & -1/4 \\end{bmatrix}$. The second option forgets to divide by 2, the first multiplies by 2 instead, and the third halves the given matrix without inverting it.",
    ref: "Tutorial 0B Q4",
  },
  {
    subtopic: "Matrix multiplication",
    kind: "mcq",
    prompt: "$A = \\begin{bmatrix} 3 & -2 \\\\ 4 & -2 \\end{bmatrix}$ satisfies $A^2 = kA - 2I$. Find $k$.",
    options: ["$-1$", "$1$", "$2$", "$3$", NOTA],
    answer: 1,
    solution:
      "$A^2 = \\begin{bmatrix} 9 - 8 & -6 + 4 \\\\ 12 - 8 & -8 + 4 \\end{bmatrix} = \\begin{bmatrix} 1 & -2 \\\\ 4 & -4 \\end{bmatrix}$ and $kA - 2I = \\begin{bmatrix} 3k - 2 & -2k \\\\ 4k & -2k - 2 \\end{bmatrix}$. Comparing the $(1,2)$ entries: $-2k = -2$, so $k = 1$; the other entries agree ($1$, $4$, $-4$) ✓.",
    ref: `${R.pyp} (A² = kA − 2I)`,
  },
];
