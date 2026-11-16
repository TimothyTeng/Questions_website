import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const systemsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (16)
  {
    subtopic: "Systems & geometry",
    kind: "tfn",
    prompt: "A system of linear equations can have exactly two solutions.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $\\mathbf{p} \\ne \\mathbf{q}$ both solve $A\\mathbf{x} = \\mathbf{b}$, then for every $t$, $A(\\mathbf{p} + t(\\mathbf{q}-\\mathbf{p})) = \\mathbf{b} + t(\\mathbf{b}-\\mathbf{b}) = \\mathbf{b}$, so the whole line through them consists of solutions. The number of solutions is always $0$, $1$ or infinitely many: **False**.",
  },
  {
    subtopic: "Systems & geometry",
    kind: "tfn",
    prompt: "A system of two linear equations in three unknowns can have exactly one solution.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The coefficient matrix is $2\\times3$, so it has at most 2 pivots for 3 variable columns: at least one variable is free. Hence the system is either inconsistent or has infinitely many solutions. Geometrically, two planes in $\\mathbb{R}^3$ never meet in a single point. **False**.",
  },
  {
    subtopic: "Row operations",
    kind: "tfn",
    prompt: "If the augmented matrices of two linear systems are row equivalent, then the two systems have the same solution set.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Each elementary row operation is reversible and transforms a system into an equivalent one: a solution of the old system satisfies the new equations, and reversing the operation shows the converse. So row-equivalent augmented matrices describe systems with the same solution set: **True**.",
  },
  {
    subtopic: "Row operations",
    kind: "tfn",
    prompt: "Applying elementary row operations to the augmented matrix of a consistent system can produce an inconsistent system.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Row operations never change the solution set, so a consistent system stays consistent. (An inconsistent row $[0\\ \\cdots\\ 0 \\mid c]$, $c\\ne0$, appears only if the system was inconsistent to begin with.) **False**.",
  },
  {
    subtopic: "Echelon & RREF",
    kind: "tfn",
    prompt: "Each matrix is row equivalent to one and only one matrix in echelon form.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Echelon forms are not unique: from $\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$ you can scale a row to get $\\begin{bmatrix}2&4\\\\0&1\\end{bmatrix}$, also in echelon form. Only the **reduced** echelon form is unique. **False**.",
  },
  {
    subtopic: "Echelon & RREF",
    kind: "tfn",
    prompt: "Each matrix is row equivalent to one and only one matrix in reduced row echelon form.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "This is the Uniqueness of the Reduced Echelon Form theorem. (Echelon forms are not unique, but the RREF is.) **True**.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "If an echelon form of the augmented matrix of a linear system contains a row of zeros, then the system has infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A zero row only says one equation was redundant. Counterexample: $\\left[\\begin{array}{cc|c} 1 & 0 & 2 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 0 \\end{array}\\right]$ (3 equations, 2 unknowns) has the unique solution $(2,3)$. A zero row can also sit below an inconsistent row. What matters is free variables (after checking consistency). **False**.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "A consistent system of 4 linear equations in 6 unknowns has infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "At most 4 pivots for 6 variable columns, so at least $6 - 4 = 2$ variables are free. A **consistent** system with a free variable has infinitely many solutions: **True**.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "A system of 5 linear equations in 3 unknowns is inconsistent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "More equations than unknowns makes inconsistency *possible*, not certain. The homogeneous system $A\\mathbf{x} = \\mathbf{0}$ with $A$ $5\\times3$ is always consistent, while other right-hand sides may give a row $[0\\ 0\\ 0 \\mid c\\ne0]$. Without the actual equations we **cannot determine** it.",
  },
  {
    subtopic: "Span & pivots",
    kind: "tfn",
    prompt: "If $A$ is a $3\\times4$ matrix with a pivot position in every row, then $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "With a pivot in every row of $A$, the echelon form of $[A\\mid\\mathbf{b}]$ cannot contain a row $[0\\ 0\\ 0\\ 0 \\mid c]$, so the augmented column is never a pivot column. Equivalently the columns of $A$ span $\\mathbb{R}^3$. **True** (and the solutions are not unique, since one variable is free).",
  },
  {
    subtopic: "Span & pivots",
    kind: "tfn",
    prompt: "For any two nonzero vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, $\\operatorname{Span}\\{\\mathbf{u}, \\mathbf{v}\\}$ is a plane through the origin.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $\\mathbf{v} = c\\mathbf{u}$, every combination $a\\mathbf{u} + b\\mathbf{v} = (a + bc)\\mathbf{u}$ lies on one line, so the span is a **line** through the origin. The span is a plane only when $\\mathbf{u}, \\mathbf{v}$ are not parallel. **False**.",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "tfn",
    prompt: "A homogeneous system of 3 linear equations in 4 unknowns always has a nontrivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "A homogeneous system is always consistent. With at most 3 pivots for 4 unknowns, at least one variable is free, and giving it a nonzero value produces a nontrivial solution. **True**.",
  },
  {
    subtopic: "Solution sets",
    kind: "tfn",
    prompt: "If $A\\mathbf{x} = \\mathbf{b}$ has infinitely many solutions, then $A\\mathbf{x} = \\mathbf{0}$ has infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The solution set of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{p} + \\{\\mathbf{v}_h : A\\mathbf{v}_h = \\mathbf{0}\\}$. Infinitely many solutions means infinitely many $\\mathbf{v}_h$. (Equivalently, both systems have the same coefficient matrix and so the same free variables.) **True**.",
  },
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt: "If $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ in $\\mathbb{R}^3$ is linearly dependent, then $\\mathbf{v}_3$ is a linear combination of $\\mathbf{v}_1$ and $\\mathbf{v}_2$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Dependence guarantees that **some** vector is a combination of the others, not a particular one. Counterexample: $\\mathbf{v}_1 = (1,0,0)$, $\\mathbf{v}_2 = (2,0,0)$, $\\mathbf{v}_3 = (0,0,1)$ is dependent ($\\mathbf{v}_2 = 2\\mathbf{v}_1$), but $\\mathbf{v}_3$ is not in $\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$. **False**.",
  },
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt: "A set of vectors in $\\mathbb{R}^n$ that contains the zero vector is linearly dependent.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $\\mathbf{v}_1 = \\mathbf{0}$, then $1\\cdot\\mathbf{v}_1 + 0\\cdot\\mathbf{v}_2 + \\cdots + 0\\cdot\\mathbf{v}_p = \\mathbf{0}$ is a nontrivial dependence relation. **True**.",
  },
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\in\\mathbb{R}^3$ be nonzero vectors, no two of which are parallel. Then $\\{\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\}$ is linearly independent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Pairwise non-parallel is not enough: $(1,0,0)$, $(0,1,0)$, $(1,1,0)$ are pairwise non-parallel but all lie in the $xy$-plane, so they are dependent. On the other hand $\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3$ satisfy the hypothesis and are independent. The information given **cannot determine** the answer.",
  },

  // ---------------------------------------------------------------- MCQ (38)
  {
    subtopic: "Systems & geometry",
    kind: "mcq",
    prompt: "Which of the following equations is **linear** in the unknowns $x_1, x_2, x_3$?",
    options: [
      "$x_1x_2 + x_3 = 1$",
      "$\\sqrt{x_1} + 2x_2 = x_3$",
      "$\\sqrt5\\,x_1 - \\pi x_2 = \\ln 3 - x_3$",
      "$x_1 = 3/x_2 + x_3$",
      NOTA,
    ],
    answer: 2,
    solution:
      "A linear equation has the form $a_1x_1 + a_2x_2 + a_3x_3 = b$ with **constant** coefficients. $\\sqrt5$, $\\pi$ and $\\ln 3$ are just constants, so $\\sqrt5\\,x_1 - \\pi x_2 + x_3 = \\ln 3$ is linear. The others contain a product $x_1x_2$, a root $\\sqrt{x_1}$ or a reciprocal $1/x_2$ of an unknown.",
  },
  {
    subtopic: "Systems & geometry",
    kind: "mcq",
    prompt:
      "Three planes in $\\mathbb{R}^3$ are such that each pair of them intersects in a line, and the three lines of intersection are parallel and distinct. The corresponding $3\\times3$ linear system has",
    options: ["exactly one solution", "no solution", "infinitely many solutions forming a line", "infinitely many solutions forming a plane", "Cannot be determined"],
    answer: 1,
    solution:
      "A common solution would have to lie on all three planes, hence on all three lines of intersection. Distinct parallel lines have no point in common, so there is no solution (picture a triangular prism). The system is **inconsistent** even though every pair of equations is consistent.",
  },
  {
    subtopic: "Systems & geometry",
    kind: "mcq",
    prompt: "Consider the system $x + 3y = 5$, $\\ 2x + hy = k$. Which choice of $(h, k)$ makes the system **inconsistent**?",
    options: ["$(h, k) = (6, 10)$", "$(h, k) = (5, 10)$", "$(h, k) = (-6, 10)$", "$(h, k) = (6, 9)$", NOTA],
    answer: 3,
    solution:
      "$R_2 \\leftarrow R_2 - 2R_1$ gives $[0\\ \\ h - 6 \\mid k - 10]$. Inconsistent iff $h - 6 = 0$ and $k - 10 \\ne 0$, i.e. $h = 6$, $k \\ne 10$. Only $(6, 9)$ qualifies (parallel lines). $(6, 10)$ gives the same line twice (infinitely many solutions); $h = 5$ or $h = -6$ give a unique solution.",
  },
  {
    subtopic: "Row operations",
    kind: "mcq",
    prompt: "Which of the following is **not** an elementary row operation on a $3$-row matrix?",
    options: ["$R_2 \\leftarrow R_1 + R_3$", "$R_1 \\leftrightarrow R_3$", "$R_2 \\leftarrow -\\tfrac12 R_2$", "$R_3 \\leftarrow R_3 + 7R_1$", "None of the above (all are elementary)"],
    answer: 0,
    solution:
      "The elementary operations are replacement $R_i \\leftarrow R_i + cR_j$, interchange, and scaling by a **nonzero** constant. $R_2 \\leftarrow R_1 + R_3$ discards the old $R_2$ entirely; it is not of the form $R_2 + cR_j$ and cannot be undone. The other three are an interchange, a scaling by $-\\tfrac12 \\ne 0$, and a replacement.",
  },
  {
    subtopic: "Row operations",
    kind: "mcq",
    prompt: "Which elementary row operation undoes $R_3 \\leftarrow R_3 - 4R_1$?",
    options: ["$R_1 \\leftarrow R_1 + 4R_3$", "$R_3 \\leftarrow R_3 + \\tfrac14 R_1$", "$R_3 \\leftarrow R_3 + 4R_1$", "$R_3 \\leftarrow -R_3 - 4R_1$", NOTA],
    answer: 2,
    solution:
      "After the operation the new third row is $R_3' = R_3 - 4R_1$, and $R_1$ is unchanged. Adding $4R_1$ back gives $R_3' + 4R_1 = R_3$. Every replacement is undone by the replacement with the opposite multiplier.",
  },
  {
    subtopic: "Row reduction",
    kind: "mcq",
    prompt: "Solve the system $x_1 - x_2 + 2x_3 = 5$, $\\ 2x_1 + x_2 + x_3 = 7$, $\\ -x_1 + 2x_2 + x_3 = 6$.",
    options: ["$(3, 2, 1)$", "$(1, -2, 3)$", "$(2, 1, 3)$", "$(-1, 2, 3)$", NOTA],
    answer: 4,
    solution:
      "$R_2 \\leftarrow R_2 - 2R_1$: $[0\\ 3\\ {-3} \\mid {-3}]$, so $x_2 - x_3 = -1$. $R_3 \\leftarrow R_3 + R_1$: $[0\\ 1\\ 3 \\mid 11]$. Subtracting, $4x_3 = 12$, so $x_3 = 3$, $x_2 = 2$, and $x_1 = 5 + x_2 - 2x_3 = 1$.\nThe unique solution is $(1, 2, 3)$, which is not listed. Check: $1 - 2 + 6 = 5$, $2 + 2 + 3 = 7$, $-1 + 4 + 3 = 6$ ✓. The listed vectors each fail at least one equation. **None of the above**.",
  },
  {
    subtopic: "Echelon & RREF",
    kind: "mcq",
    prompt: "Which of the following matrices is in **reduced** row echelon form?",
    options: [
      "$\\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 & 3 \\\\ 0 & 2 & 4 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 4 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 & 2 & 0 \\\\ 0 & 1 & 3 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "The fourth matrix has leading 1s in columns 1, 2, 4, each further right than the one above, and each is the only nonzero entry in its column (column 3 is a non-pivot column, which may hold anything). The first has row 3's leading entry to the **left** of row 2's; the second has a leading entry $2$; the third has two nonzero entries in a pivot column (rows 2 and 3 both lead in column 3).",
  },
  {
    subtopic: "Echelon & RREF",
    kind: "mcq",
    prompt: "Which matrix is in echelon form but **not** in reduced echelon form?",
    options: [
      "$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 3 & 1 \\\\ 0 & 0 & 4 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 \\\\ 0 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "The second matrix is a staircase (leading entries in columns 1 and 3, zeros below them, zero row at the bottom), but its leading entries are $2$ and $4$, not $1$, and there is a $1$ above the pivot in column 3. So it is echelon, not reduced. The identity is already reduced; $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has its second leading entry to the left of the first; the last has a zero row above a nonzero row.",
  },
  {
    subtopic: "Pivots",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 3 & 0 & 2 \\\\ 2 & 6 & 1 & 1 \\\\ -1 & -3 & 2 & -8 \\end{bmatrix}$. Which columns of $A$ are pivot columns?",
    options: ["Columns 1 and 3", "Columns 1 and 2", "Columns 1, 3 and 4", "Columns 1, 2 and 3", NOTA],
    answer: 0,
    solution:
      "$R_2 \\leftarrow R_2 - 2R_1$: $[0\\ 0\\ 1\\ {-3}]$. $\\ R_3 \\leftarrow R_3 + R_1$: $[0\\ 0\\ 2\\ {-6}]$. $\\ R_3 \\leftarrow R_3 - 2R_2$: zero row.\nEchelon form $\\begin{bmatrix} 1 & 3 & 0 & 2 \\\\ 0 & 0 & 1 & -3 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$: leading entries in columns 1 and 3. Column 2 is $3\\times$ column 1, so it can never carry a pivot.",
  },
  {
    subtopic: "Pivots",
    kind: "mcq",
    prompt: "Which statement about pivots is correct?",
    options: [
      "The entry of $A$ in a pivot position is always nonzero.",
      "The pivot positions of $A$ depend on which echelon form of $A$ is used.",
      "Every column of a reduced echelon matrix contains a leading 1.",
      "A pivot column of $A$ is a column of $A$ that contains a pivot position.",
      NOTA,
    ],
    answer: 3,
    solution:
      "That is the definition of a pivot column. The first is false: in $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ the pivot positions are $(1,1)$ and $(2,2)$, where $A$ has zeros (a swap is needed first). The second is false because the RREF is unique and all echelon forms share its pivot positions. The third is false: non-pivot columns (free variables) have no leading 1.",
  },
  {
    subtopic: "Parametric vector form",
    kind: "mcq",
    prompt:
      "The augmented matrix of a system in $x_1, x_2, x_3$ has RREF $\\left[\\begin{array}{ccc|c} 1 & 0 & -2 & 3 \\\\ 0 & 1 & 1 & -1 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right]$. Which of the following describes **all** solutions ($t\\in\\mathbb{R}$)?",
    options: [
      "$\\mathbf{x} = [3, -1, 0]^T + t[-2, 1, 1]^T$",
      "$\\mathbf{x} = [5, -2, 1]^T + t[-4, 2, -2]^T$",
      "$\\mathbf{x} = [3, -1, 0]^T + t[2, -1, 0]^T$",
      "$\\mathbf{x} = [-3, 1, 0]^T + t[2, -1, 1]^T$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$x_3$ is free: $x_1 = 3 + 2x_3$, $x_2 = -1 - x_3$, so the standard form is $[3,-1,0]^T + t[2,-1,1]^T$, which is not listed.\nBut $[5,-2,1]^T$ is a solution (take $x_3 = 1$: $x_1 = 5$, $x_2 = -2$) and $[-4,2,-2]^T = -2[2,-1,1]^T$ points along the same line, so option (b) describes **the same line**. Option (a) has the sign of the free-variable coefficients not flipped, (c) forgets the $1$ in the free slot, (d) negates the particular solution.",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt: "The solution set of the single equation $x_1 - 2x_2 + 3x_3 = 4$ in $\\mathbb{R}^3$ is",
    options: ["a plane that does not pass through the origin", "a plane through the origin", "a line", "all of $\\mathbb{R}^3$", NOTA],
    answer: 0,
    solution:
      "One pivot (in $x_1$), two free variables: $\\mathbf{x} = [4,0,0]^T + s[2,1,0]^T + t[-3,0,1]^T$, a plane. It passes through $(4,0,0)$ but not through $\\mathbf{0}$, because $0 \\ne 4$. It is the plane $x_1 - 2x_2 + 3x_3 = 0$ shifted by a particular solution.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt:
      "A linear system has augmented matrix with echelon form $\\left[\\begin{array}{ccc|c} 1 & -2 & 3 & 1 \\\\ 0 & 1 & 4 & 2 \\\\ 0 & 0 & 0 & 5 \\end{array}\\right]$. The system has",
    options: ["exactly one solution", "infinitely many solutions with one free variable", "infinitely many solutions with two free variables", "no solution", NOTA],
    answer: 3,
    solution:
      "The last row means $0x_1 + 0x_2 + 0x_3 = 5$, which is impossible. The augmented column is a pivot column, so the system is **inconsistent**. Do not count the free variable $x_3$; free variables are only meaningful for a consistent system.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "For which values of $h$ is the matrix $\\left[\\begin{array}{cc|c} 1 & h & 4 \\\\ 3 & 6 & 8 \\end{array}\\right]$ the augmented matrix of a **consistent** system?",
    options: ["$h = 2$", "$h \\ne -2$", "every real $h$", "$h \\ne 6$", NOTA],
    answer: 4,
    solution:
      "$R_2 \\leftarrow R_2 - 3R_1$: $[0\\ \\ 6 - 3h \\mid -4]$. If $6 - 3h = 0$ ($h = 2$) the row reads $0 = -4$: inconsistent. Otherwise there is a pivot in column 2 and a unique solution. So the system is consistent exactly for $h \\ne 2$, which is not among the options: **None of the above**.",
  },
  {
    subtopic: "Systems with a parameter",
    kind: "mcq",
    prompt: "Consider the augmented matrix $\\left[\\begin{array}{cc|c} 1 & 3 & 2 \\\\ 3 & h & k \\end{array}\\right]$. Which statement is correct?",
    options: [
      "The system has infinitely many solutions if and only if $h = 9$ and $k = 6$.",
      "The system has no solution if and only if $h = 9$.",
      "The system has a unique solution if and only if $k \\ne 6$.",
      "The system has no solution if and only if $h \\ne 9$ and $k = 6$.",
      NOTA,
    ],
    answer: 0,
    solution:
      "$R_2 \\leftarrow R_2 - 3R_1$: $[0\\ \\ h - 9 \\mid k - 6]$.\n- $h \\ne 9$: pivot in column 2, unique solution (for every $k$).\n- $h = 9$, $k = 6$: zero row, $x_2$ free, infinitely many.\n- $h = 9$, $k \\ne 6$: $0 = k - 6 \\ne 0$, no solution.\nOnly the first statement matches. \"No solution iff $h = 9$\" forgets the condition on $k$.",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt: "For which values of $k$ does the system $x + y + z = 0$, $\\ x + ky + z = 0$, $\\ x + y + kz = 0$ have a **nontrivial** solution?",
    options: ["$k = -1$", "$k = \\pm 1$", "$k = 1$", "$k = 0$", NOTA],
    answer: 2,
    solution:
      "Subtract $R_1$ from $R_2$ and $R_3$: $[0\\ \\ k-1\\ \\ 0]$ and $[0\\ \\ 0\\ \\ k-1]$. If $k \\ne 1$ there are three pivots and only the trivial solution. If $k = 1$ all three equations are $x + y + z = 0$: two free variables, so nontrivial solutions exist. (Check: $\\det = (k-1)^2$, which is zero only at $k = 1$.)",
  },
  {
    subtopic: "Coefficients from a solution",
    kind: "mcq",
    prompt: "$(x, y, z) = (1, 2, -1)$ is a solution of $2x + ay + 3z = 7$. What is $a$?",
    options: ["$3$", "$4$", "$-4$", "$2$", NOTA],
    answer: 1,
    solution: "Substitute: $2(1) + a(2) + 3(-1) = 7 \\Rightarrow 2a - 1 = 7 \\Rightarrow a = 4$. (Getting $3$ comes from dropping the $-3$; getting $-4$ from moving the constant with the wrong sign.)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "$A$ is a $3\\times5$ matrix with 3 pivot columns. Which statement is true?",
    options: [
      "$A\\mathbf{x} = \\mathbf{b}$ has a unique solution for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
      "$A\\mathbf{x} = \\mathbf{b}$ is inconsistent for some $\\mathbf{b}\\in\\mathbb{R}^3$.",
      "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
      "$A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^3$, with infinitely many solutions.",
      NOTA,
    ],
    answer: 3,
    solution:
      "3 pivots in 3 rows: a pivot in every **row**, so every $\\mathbf{b}$ is reachable (consistent). 3 pivots for 5 columns: 2 free variables, so every consistent system, including $A\\mathbf{x} = \\mathbf{0}$, has infinitely many solutions.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "$A$ is a $5\\times3$ matrix with 3 pivot positions. For the equation $A\\mathbf{x} = \\mathbf{b}$,",
    options: [
      "there is a solution for every $\\mathbf{b}\\in\\mathbb{R}^5$",
      "there are infinitely many solutions for some $\\mathbf{b}$",
      "there is at most one solution for each $\\mathbf{b}\\in\\mathbb{R}^5$",
      "there is no solution for every $\\mathbf{b} \\ne \\mathbf{0}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "A pivot in every **column** means no free variables: a consistent system has exactly one solution. But only 3 of the 5 rows have pivots, so some $\\mathbf{b}$ give an inconsistent system (and others, like $\\mathbf{b} = A\\mathbf{e}_1 \\ne \\mathbf{0}$, are consistent). Hence \"at most one solution\".",
  },
  {
    subtopic: "Matrix equation",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & -1 \\\\ 3 & 1 \\end{bmatrix}$ and $\\mathbf{x} = [2, -1]^T$. What is $A\\mathbf{x}$?",
    options: ["$[4, 1, 7]^T$", "$[0, -1, 5]^T$", "$[2, 1, 5]^T$", "$[0, 1, 5]^T$", NOTA],
    answer: 3,
    solution:
      "$A\\mathbf{x}$ is a combination of the columns: $2\\begin{bmatrix}1\\\\0\\\\3\\end{bmatrix} - 1\\begin{bmatrix}2\\\\-1\\\\1\\end{bmatrix} = \\begin{bmatrix}0\\\\1\\\\5\\end{bmatrix}$. (Row by row: $2 - 2 = 0$, $0 + 1 = 1$, $6 - 1 = 5$.) $[4,1,7]^T$ comes from adding instead of subtracting the second column.",
  },
  {
    subtopic: "Span",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{a}_1 = [1, -1, 2]^T$, $\\mathbf{a}_2 = [2, 1, 1]^T$ and $\\mathbf{b} = [1, 5, -4]^T$. Which statement is correct?",
    options: [
      "$\\mathbf{b} = 2\\mathbf{a}_1 - 3\\mathbf{a}_2$",
      "$\\mathbf{b} = -3\\mathbf{a}_1 + 2\\mathbf{a}_2$",
      "$\\mathbf{b} = 3\\mathbf{a}_1 - 2\\mathbf{a}_2$",
      "$\\mathbf{b}$ is not in $\\operatorname{Span}\\{\\mathbf{a}_1, \\mathbf{a}_2\\}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Solve $x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 = \\mathbf{b}$: rows 1 and 2 give $x_1 + 2x_2 = 1$ and $-x_1 + x_2 = 5$, so $3x_2 = 6$, $x_2 = 2$, $x_1 = -3$. Row 3 must also hold: $2(-3) + 1(2) = -4$ ✓. So $\\mathbf{b} = -3\\mathbf{a}_1 + 2\\mathbf{a}_2$ and $\\mathbf{b}$ is in the span.",
  },
  {
    subtopic: "Span",
    kind: "mcq",
    prompt: "For a nonzero vector $\\mathbf{v}\\in\\mathbb{R}^3$, $\\operatorname{Span}\\{\\mathbf{v}\\}$ is",
    options: ["the line through the origin in the direction of $\\mathbf{v}$", "the single point $\\mathbf{v}$", "the set $\\{\\mathbf{0}, \\mathbf{v}\\}$", "a plane through the origin", NOTA],
    answer: 0,
    solution:
      "$\\operatorname{Span}\\{\\mathbf{v}\\} = \\{c\\mathbf{v} : c\\in\\mathbb{R}\\}$: all scalar multiples, which is the whole line through $\\mathbf{0}$ and $\\mathbf{v}$. A span with at least one nonzero vector always contains infinitely many vectors.",
  },
  {
    subtopic: "Span & pivots",
    kind: "mcq",
    prompt: "$A$ is a $4\\times3$ matrix. When do the columns of $A$ span $\\mathbb{R}^4$?",
    options: [
      "Always",
      "Only if the columns of $A$ are linearly independent",
      "Only if $A$ has 3 pivot positions",
      "Cannot be determined without the entries of $A$",
      "Never",
    ],
    answer: 4,
    solution:
      "Spanning $\\mathbb{R}^4$ needs a pivot in every one of the 4 rows. A $4\\times3$ matrix has at most 3 pivots (one per column), so this is **never** possible. Three vectors can span at most a 3-dimensional subspace.",
  },
  {
    subtopic: "Matrix equation",
    kind: "mcq",
    prompt: "Which equation is equivalent to the system $2x_1 - x_2 = 3$, $\\ x_1 + 4x_2 = 0$, $\\ -x_1 + 5x_2 = 2$?",
    options: [
      "$x_1\\begin{bmatrix}2\\\\1\\\\-1\\end{bmatrix} + x_2\\begin{bmatrix}-1\\\\4\\\\5\\end{bmatrix} = \\begin{bmatrix}3\\\\0\\\\2\\end{bmatrix}$",
      "$x_1\\begin{bmatrix}2\\\\-1\\\\3\\end{bmatrix} + x_2\\begin{bmatrix}1\\\\4\\\\0\\end{bmatrix} = \\begin{bmatrix}-1\\\\5\\\\2\\end{bmatrix}$",
      "$x_1\\begin{bmatrix}2\\\\1\\\\-1\\end{bmatrix} + x_2\\begin{bmatrix}-1\\\\4\\\\5\\end{bmatrix} + \\begin{bmatrix}3\\\\0\\\\2\\end{bmatrix} = \\mathbf{0}$",
      "$\\begin{bmatrix} 2 & 1 & -1 \\\\ -1 & 4 & 5 \\end{bmatrix}\\begin{bmatrix}x_1\\\\x_2\\end{bmatrix} = \\begin{bmatrix}3\\\\0\\\\2\\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "The coefficients of $x_1$ in the three equations form the first **column** $[2, 1, -1]^T$, those of $x_2$ the second column $[-1, 4, 5]^T$, and the right-hand sides form $\\mathbf{b}$. Option (b) uses rows as columns; (c) has the wrong sign on $\\mathbf{b}$; (d) uses $A^T$, a $2\\times3$ matrix that cannot even multiply a vector in $\\mathbb{R}^2$.",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt: "A homogeneous system of 6 equations in 5 unknowns has 5 pivot positions. How many solutions does it have?",
    options: ["None", "Exactly one", "Infinitely many", "Exactly five", "Cannot be determined"],
    answer: 1,
    solution:
      "Homogeneous systems are always consistent ($\\mathbf{x} = \\mathbf{0}$ works). With 5 pivots for 5 unknowns there are no free variables, so the trivial solution is the **only** one.",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "$\\mathbf{p} = [1, 2, 0]^T$ is a solution of $A\\mathbf{x} = \\mathbf{b}$, and the solutions of $A\\mathbf{x} = \\mathbf{0}$ are exactly the multiples of $\\mathbf{v} = [1, -1, 1]^T$. Which vector is also a solution of $A\\mathbf{x} = \\mathbf{b}$?",
    options: ["$[1, -1, 1]^T$", "$[2, 3, 1]^T$", "$[2, 1, 1]^T$", "$[0, 0, 0]^T$", NOTA],
    answer: 2,
    solution:
      "Every solution has the form $\\mathbf{p} + t\\mathbf{v}$. With $t = 1$: $[1,2,0]^T + [1,-1,1]^T = [2,1,1]^T$. $[1,-1,1]^T$ solves $A\\mathbf{x} = \\mathbf{0}$, not $A\\mathbf{x} = \\mathbf{b}$ (unless $\\mathbf{b} = \\mathbf{0}$). $[2,3,1]^T - \\mathbf{p} = [1,1,1]^T$ is not a multiple of $\\mathbf{v}$. $\\mathbf{0}$ would require $\\mathbf{p} \\in \\operatorname{Span}\\{\\mathbf{v}\\}$, which is false.",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt: "Which $2\\times2$ matrix $A$ has as the solution set of $A\\mathbf{x} = \\mathbf{0}$ exactly the line through the origin and $(3, 1)$?",
    options: [
      "$\\begin{bmatrix} 3 & 1 \\\\ 6 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & -3 \\\\ 2 & -6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 3 \\\\ 2 & 6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "We need rank 1 (one free variable) with $(3,1)$ a solution. $\\begin{bmatrix}1&-3\\\\2&-6\\end{bmatrix}$: both rows say $x_1 - 3x_2 = 0$, i.e. $x_1 = 3x_2$, the line through $(3,1)$ ✓. The first matrix gives $3x_1 + x_2 = 0$ (the line through $(1,-3)$), the third $x_1 + 3x_2 = 0$ (through $(-3,1)$), and $I$ has only the trivial solution.",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "$A$ is $3\\times3$ and the solution set of $A\\mathbf{x} = \\mathbf{b}$ is the line through $(1,2,3)$ parallel to $[1,0,-1]^T$. The solution set of $A\\mathbf{x} = \\mathbf{0}$ is",
    options: [
      "the line through the origin parallel to $[1,0,-1]^T$",
      "only the zero vector",
      "the line through the origin and $(1,2,3)$",
      "a plane through the origin",
      "Cannot be determined",
    ],
    answer: 0,
    solution:
      "Solutions of $A\\mathbf{x} = \\mathbf{b}$ are $\\mathbf{p} + \\mathbf{v}_h$ with $A\\mathbf{v}_h = \\mathbf{0}$. Here $\\mathbf{p} = (1,2,3)$ and the $\\mathbf{v}_h$ are exactly the multiples of $[1,0,-1]^T$. So $A\\mathbf{x} = \\mathbf{0}$ has the parallel line through the origin: same direction, shifted back.",
  },
  {
    subtopic: "Free variables",
    kind: "mcq",
    prompt: "$A$ is a $3\\times5$ matrix and the equation $A\\mathbf{x} = \\mathbf{0}$ has exactly 3 free variables. What is the number of pivot positions of $A$?",
    options: ["$3$", "$5$", "$2$", "$1$", NOTA],
    answer: 2,
    solution: "#free variables $=$ #columns $-$ #pivots, so #pivots $= 5 - 3 = 2$. (The number of rows, 3, plays no role here.)",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt:
      "For which $h$ are $\\mathbf{v}_1 = [1, -1, 2]^T$, $\\mathbf{v}_2 = [3, -5, 6]^T$, $\\mathbf{v}_3 = [-1, 5, h]^T$ linearly **dependent**?",
    options: ["$h = 2$", "$h = 4$", "every real $h$", "$h = -4$", NOTA],
    answer: 4,
    solution:
      "Row reduce $[\\mathbf{v}_1\\ \\mathbf{v}_2\\ \\mathbf{v}_3] = \\begin{bmatrix} 1 & 3 & -1 \\\\ -1 & -5 & 5 \\\\ 2 & 6 & h \\end{bmatrix}$: $R_2 + R_1 = [0\\ {-2}\\ 4]$, $R_3 - 2R_1 = [0\\ 0\\ h + 2]$.\nColumn 3 lacks a pivot iff $h + 2 = 0$, i.e. $h = -2$. (Check: $\\det = -2h - 4$.) Since $-2$ is not listed, the answer is **None of the above**.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt:
      "For which $h$ are $\\mathbf{v}_1 = [1, 2, -3]^T$, $\\mathbf{v}_2 = [-2, -4, 6]^T$, $\\mathbf{v}_3 = [3, h, 1]^T$ linearly **dependent**?",
    options: ["$h = 0$", "$h = 6$", "$h = -6$", "every real $h$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{v}_2 = -2\\mathbf{v}_1$, so $2\\mathbf{v}_1 + \\mathbf{v}_2 + 0\\mathbf{v}_3 = \\mathbf{0}$ is a nontrivial dependence relation whatever $h$ is. The set is dependent for **every** $h$. Trap: hunting for a special $h$ via row reduction before noticing two vectors are parallel.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "Which of the following sets is linearly **dependent**?",
    options: [
      "$\\{[1,2,3]^T, [4,5,6]^T, [7,8,9]^T\\}$",
      "$\\{[1,0,0]^T, [1,1,0]^T, [1,1,1]^T\\}$",
      "$\\{[1,2]^T, [2,1]^T\\}$",
      "$\\{[1,0,0,0]^T, [0,2,0,0]^T\\}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$[7,8,9] = 2[4,5,6] - [1,2,3]$ (check: $8-1$, $10-2$, $12-3$), so the first set is dependent; its determinant is $0$. The second is triangular with nonzero diagonal (3 pivots). The third is two non-parallel vectors. The fourth is two non-parallel vectors in $\\mathbb{R}^4$.",
  },
  {
    subtopic: "Independence of combinations",
    kind: "mcq",
    prompt: "$\\mathbf{u}$ and $\\mathbf{v}$ are linearly independent. Which set is linearly **dependent**?",
    options: [
      "$\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{u}-\\mathbf{v}\\}$",
      "$\\{2\\mathbf{u}-\\mathbf{v},\\ -4\\mathbf{u}+2\\mathbf{v}\\}$",
      "$\\{\\mathbf{u},\\ \\mathbf{u}+\\mathbf{v}\\}$",
      "$\\{\\mathbf{u}+2\\mathbf{v},\\ 2\\mathbf{u}+\\mathbf{v}\\}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$-4\\mathbf{u} + 2\\mathbf{v} = -2(2\\mathbf{u} - \\mathbf{v})$, so the second set is a pair of parallel vectors: dependent. In coefficient-matrix terms, $\\det\\begin{bmatrix}2&-1\\\\-4&2\\end{bmatrix} = 0$, while the others have determinants $-2$, $1$, $-3$ (nonzero, hence independent).",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "For which real $t$ is $\\{[1,1,1]^T,\\ [1,2,t]^T,\\ [1,4,t^2]^T\\}$ linearly independent?",
    options: ["$t \\ne 0$", "$t \\ne \\pm1$", "$t \\ne 2$ and $t \\ne 4$", "$t \\ne 1$ and $t \\ne 2$", NOTA],
    answer: 3,
    solution:
      "Put the vectors as rows (the determinant is unchanged by transposing): $\\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 4 \\\\ 1 & t & t^2 \\end{bmatrix}$ is a Vandermonde matrix with nodes $1, 2, t$, so $\\det = (2-1)(t-1)(t-2)$. Independent iff $t \\ne 1, 2$. At $t = 1$ the second vector equals the first; at $t = 2$ the third is $[1,4,4]$, and $-2[1,1,1] + 3[1,2,2] = [1,4,4]$.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "The columns of an $m\\times n$ matrix $A$ are linearly independent if and only if",
    options: [
      "$A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^m$",
      "$A$ has a pivot position in every row",
      "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution",
      "$A$ is square",
      NOTA,
    ],
    answer: 2,
    solution:
      "$x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n = \\mathbf{0}$ **is** $A\\mathbf{x} = \\mathbf{0}$, so independence means only the trivial solution (a pivot in every **column**). The first two options describe spanning $\\mathbb{R}^m$ (a pivot in every row), a different property. Squareness is neither necessary nor sufficient.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "$\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_5\\}$ is a set of five vectors in $\\mathbb{R}^4$. Which statement must be true?",
    options: ["The set is linearly independent.", "The set is linearly dependent.", "The set spans $\\mathbb{R}^4$.", "One of the vectors is the zero vector.", NOTA],
    answer: 1,
    solution:
      "More vectors than entries: $[\\mathbf{v}_1 \\cdots \\mathbf{v}_5]$ is $4\\times5$, at most 4 pivots for 5 columns, so there is a free variable and $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution. The set need not span $\\mathbb{R}^4$ (all five could lie on one line), and none of them has to be $\\mathbf{0}$.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix and $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}\\in\\mathbb{R}^3$. Which statement must be true?",
    options: [
      "$A\\mathbf{x} = \\mathbf{z}$ has a unique solution for some $\\mathbf{z}\\in\\mathbb{R}^3$",
      "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution",
      "The columns of $A$ are linearly independent",
      "$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution",
      NOTA,
    ],
    answer: 3,
    solution:
      "Some $\\mathbf{y}$ is unreachable, so $A$ lacks a pivot in some row: fewer than 3 pivots. For a **square** matrix that also means a column without a pivot, i.e. a free variable. Then $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions, the columns are dependent, and **every** consistent $A\\mathbf{x} = \\mathbf{z}$ has infinitely many solutions, so no $\\mathbf{z}$ gives a unique one.",
  },
  {
    subtopic: "RREF from a solution",
    kind: "mcq",
    prompt:
      "$A$ is $3\\times3$ and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = [4,0,0]^T + s[2,1,0]^T + t[-1,0,1]^T$, $s,t\\in\\mathbb{R}$. How many pivot positions does $A$ have?",
    options: ["$1$", "$2$", "$3$", "$0$", NOTA],
    answer: 0,
    solution:
      "Two parameters, so two free variables ($x_2, x_3$) and $3 - 2 = 1$ pivot. Indeed $x_1 = 4 + 2x_2 - x_3$ gives the single RREF row $[1\\ {-2}\\ 1 \\mid 4]$ followed by two zero rows. Rule: rank $=$ #unknowns $-$ #parameters in the complete solution.",
  },
];
