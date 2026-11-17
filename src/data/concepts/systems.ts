import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const systemsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN
  {
    subtopic: "Number of solutions",
    kind: "tfn",
    prompt: "A system of linear equations can have exactly two solutions.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A linear system has no solution, exactly one solution or infinitely many solutions. In row-reduction terms: if it is consistent and has no free variable the solution is unique; if it has a free variable, every value of that variable gives a solution. There is no way to get exactly two: **False**.",
    ref: "Tutorial 1 Q2, Q12",
  },
  {
    subtopic: "Number of solutions",
    kind: "tfn",
    prompt: "A system of two linear equations in three unknowns can have exactly one solution.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The coefficient matrix is $2\\times3$, so it has at most 2 pivots for 3 variable columns: at least one variable is free. Hence the system is either inconsistent or has infinitely many solutions. **False**.",
    ref: "Tutorial 1 Q12 (counting pivots against unknowns)",
  },
  {
    subtopic: "Row operations",
    kind: "tfn",
    prompt: "If the augmented matrices of two linear systems are row equivalent, then the two systems have the same solution set.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Each elementary row operation can be undone by another elementary row operation, so a solution of the old system satisfies the new equations and vice versa. Row-equivalent augmented matrices therefore describe systems with the same solution set: **True**.",
    ref: "Slides 2.2 elementary row operations (alg p7–8)",
  },
  {
    subtopic: "Row operations",
    kind: "tfn",
    prompt: "Applying elementary row operations to the augmented matrix of a consistent system can produce an inconsistent system.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Row operations never change the solution set, so a consistent system stays consistent. (An inconsistent row $[0\\ \\cdots\\ 0 \\mid c]$, $c\\ne0$, appears only if the system was inconsistent to begin with.) **False**.",
    ref: "Slides 2.2 elementary row operations (alg p7–8)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "If an echelon form of the augmented matrix of a linear system contains a row of zeros, then the system has infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A zero row only says one equation was redundant. Counterexample: $\\left[\\begin{array}{cc|c} 1 & 0 & 2 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 0 \\end{array}\\right]$ (3 equations, 2 unknowns) has the unique solution $(2,3)$. A zero row can also sit below an inconsistent row. What matters is free variables (after checking consistency). **False**.",
    ref: "Tutorial 1 Q12",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "A consistent system of 4 linear equations in 6 unknowns has infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "At most 4 pivots for 6 variable columns, so at least $6 - 4 = 2$ variables are free. A **consistent** system with a free variable has infinitely many solutions: **True**.",
    ref: "Additional practice problems (free variables)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "A system of 5 linear equations in 3 unknowns is inconsistent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "More equations than unknowns makes inconsistency *possible*, not certain. The homogeneous system $A\\mathbf{x} = \\mathbf{0}$ with $A$ $5\\times3$ is always consistent, while other right-hand sides may give a row $[0\\ 0\\ 0 \\mid c\\ne0]$. Without the actual equations we **cannot determine** it.",
    ref: "Tutorial 1 Q12",
  },
  {
    subtopic: "Span & pivots",
    kind: "tfn",
    prompt: "If $A$ is a $3\\times4$ matrix with a pivot position in every row, then $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "This is Theorem 1.2 (d) ⇒ (a). With a pivot in every row of $A$, the echelon form of $[A\\mid\\mathbf{b}]$ cannot contain a row $[0\\ 0\\ 0\\ 0 \\mid c]$, so every $\\mathbf{b}$ gives a consistent system; the columns of $A$ span $\\mathbb{R}^3$. **True**.",
    ref: "Slides 2.2 Theorem 1.2 (alg p11); PYP (written papers): a $3\\times4$ matrix with 3 pivots spans $\\mathbb{R}^3$",
  },
  {
    subtopic: "Span",
    kind: "tfn",
    prompt: "For any two nonzero vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, $\\operatorname{Span}\\{\\mathbf{u}, \\mathbf{v}\\}$ is a plane through the origin.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $\\mathbf{v} = c\\mathbf{u}$, every combination $a\\mathbf{u} + b\\mathbf{v} = (a + bc)\\mathbf{u}$ is a multiple of $\\mathbf{u}$, so the span is a **line** through the origin. The span is a plane only when $\\mathbf{u}, \\mathbf{v}$ are not multiples of each other. **False**.",
    ref: "Slides 4.3 Span (vsp p15); PYP AY21/22 S1 Q1(b) (line, plane or $\\mathbb{R}^3$?)",
  },
  {
    subtopic: "Span",
    kind: "tfn",
    prompt: "Let $\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{w}_3, \\mathbf{u}, \\mathbf{v}$ be vectors in $\\mathbb{R}^n$. If $\\mathbf{u}$ and $\\mathbf{v}$ are in $\\operatorname{Span}\\{\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{w}_3\\}$, then $\\mathbf{u} + \\mathbf{v}$ is in $\\operatorname{Span}\\{\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{w}_3\\}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Write $\\mathbf{u} = a_1\\mathbf{w}_1 + a_2\\mathbf{w}_2 + a_3\\mathbf{w}_3$ and $\\mathbf{v} = b_1\\mathbf{w}_1 + b_2\\mathbf{w}_2 + b_3\\mathbf{w}_3$. Then $\\mathbf{u} + \\mathbf{v} = (a_1+b_1)\\mathbf{w}_1 + (a_2+b_2)\\mathbf{w}_2 + (a_3+b_3)\\mathbf{w}_3$, again a linear combination of $\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{w}_3$. **True**.",
    ref: "Tutorial 1 Q4",
  },
  {
    subtopic: "Span",
    kind: "tfn",
    prompt:
      "Let $\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3$ be the columns of $A = \\begin{bmatrix} 1 & 0 & -4 \\\\ 0 & 3 & -2 \\\\ -2 & 6 & 3 \\end{bmatrix}$ and $W = \\operatorname{Span}\\{\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3\\}$. Then $W$ contains exactly three vectors.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$W$ is the set of **all** linear combinations $c_1\\mathbf{a}_1 + c_2\\mathbf{a}_2 + c_3\\mathbf{a}_3$, one for every choice of weights, so it contains infinitely many vectors (here in fact all of $\\mathbb{R}^3$: $r_3 \\leftarrow r_3 + 2r_1$, then $r_3 \\leftarrow r_3 - 2r_2$ gives $[0\\ 0\\ {-1}]$, so $A$ has 3 pivots). The set $\\{\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3\\}$ has three vectors; its span does not. **False**.",
    ref: "Tutorial 1 Q3",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "tfn",
    prompt: "A homogeneous system of 3 linear equations in 4 unknowns always has a nontrivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "A homogeneous system is always consistent. With at most 3 pivots for 4 unknowns, at least one variable is free, and giving it a nonzero value produces a nontrivial solution. **True**.",
    ref: "Tutorial 1 Q12; PYP (written papers): columns of every $3\\times5$ matrix are dependent",
  },
  {
    subtopic: "Solution sets",
    kind: "tfn",
    prompt: "If $A\\mathbf{x} = \\mathbf{b}$ has infinitely many solutions, then $A\\mathbf{x} = \\mathbf{0}$ has infinitely many solutions.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Both systems have the same coefficient matrix $A$, so the same pivot columns and the same free variables. Infinitely many solutions of the consistent system $A\\mathbf{x} = \\mathbf{b}$ means $A$ has a free variable; $A\\mathbf{x} = \\mathbf{0}$ is always consistent, so it also has infinitely many solutions. **True**.",
    ref: "Tutorial 1 Q11, Q12",
  },
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt: "If $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ in $\\mathbb{R}^3$ is linearly dependent, then $\\mathbf{v}_3$ is a linear combination of $\\mathbf{v}_1$ and $\\mathbf{v}_2$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Theorem 4.4 only guarantees that **some** $\\mathbf{v}_j$ is a combination of the vectors before it, not a particular one. Counterexample: $\\mathbf{v}_1 = (1,0,0)$, $\\mathbf{v}_2 = (2,0,0)$, $\\mathbf{v}_3 = (0,0,1)$ is dependent ($\\mathbf{v}_2 = 2\\mathbf{v}_1$), but $\\mathbf{v}_3$ is not in $\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$. **False**.",
    ref: "Slides 4.7 Theorem 4.4 (vsp p30)",
  },
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt: "A set of vectors in $\\mathbb{R}^n$ that contains the zero vector is linearly dependent.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $\\mathbf{v}_1 = \\mathbf{0}$, then $1\\cdot\\mathbf{v}_1 + 0\\cdot\\mathbf{v}_2 + \\cdots + 0\\cdot\\mathbf{v}_p = \\mathbf{0}$ with weights not all zero. **True**.",
    ref: "Slides 4.7 (vsp p29–30)",
  },
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\in\\mathbb{R}^3$ be nonzero vectors, no two of which are multiples of each other. Then $\\{\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\}$ is linearly independent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The two-vector test does not settle three vectors: $(1,0,0)$, $(0,1,0)$, $(1,1,0)$ are pairwise not multiples, but $(1,0,0) + (0,1,0) - (1,1,0) = \\mathbf{0}$, so they are dependent. On the other hand $\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3$ satisfy the hypothesis and are independent. The information given **cannot determine** the answer.",
    ref: "Slides 4.7 (vsp p29–30)",
  },
  {
    subtopic: "Reading an augmented matrix",
    kind: "tfn",
    prompt:
      "The system with augmented matrix $\\left[\\begin{array}{cccc|c} 1 & 1 & 2 & 3 & 1 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 2 & 2 & 4 & 6 & 5 \\end{array}\\right]$ has no solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$r_3 \\leftarrow r_3 - 2r_1$ gives $[0\\ 0\\ 0\\ 0 \\mid 3]$, the equation $0 = 3$. The system is inconsistent: **True**.",
    ref: "Additional practice problems (True/False on augmented matrices)",
  },
  {
    subtopic: "Reading an augmented matrix",
    kind: "tfn",
    prompt:
      "$(x_1, x_2, x_3, x_4) = (0, 0, -1, 1)$ is a solution of the system with augmented matrix $\\left[\\begin{array}{cccc|c} 1 & 1 & 2 & 3 & 1 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 2 & 4 & 2 \\end{array}\\right]$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Substitute: row 1: $0 + 0 + 2(-1) + 3(1) = 1$ ✓; row 2: $-1 + 2(1) = 1$ ✓; row 3: $2(-1) + 4(1) = 2$ ✓. All three equations hold: **True**. (The system has infinitely many solutions: $r_3 \\leftarrow r_3 - 2r_2$ gives a zero row, and $x_2, x_4$ are free.)",
    ref: "Additional practice problems (True/False on augmented matrices)",
  },
  {
    subtopic: "Reading an augmented matrix",
    kind: "tfn",
    prompt:
      "The augmented matrix $\\left[\\begin{array}{cccc|c} 1 & 1 & 2 & 3 & 1 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 2 & 4 & 2 \\end{array}\\right]$ has a pivot position in every row.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$r_3 \\leftarrow r_3 - 2r_2$ turns row 3 into $[0\\ 0\\ 0\\ 0 \\mid 0]$. The echelon form has pivots only in rows 1 and 2 (columns 1 and 3), so row 3 has no pivot position: **False**.",
    ref: "Additional practice problems (True/False on augmented matrices)",
  },

  // ---------------------------------------------------------------- MCQ
  {
    subtopic: "Number of solutions",
    kind: "mcq",
    prompt: "Consider the system $x + 3y = 5$, $\\ 2x + hy = k$. Which choice of $(h, k)$ makes the system **inconsistent**?",
    options: ["$(h, k) = (6, 10)$", "$(h, k) = (5, 10)$", "$(h, k) = (-6, 10)$", "$(h, k) = (6, 9)$", NOTA],
    answer: 3,
    solution:
      "$r_2 \\leftarrow r_2 - 2r_1$ gives $[0\\ \\ h - 6 \\mid k - 10]$. Inconsistent iff $h - 6 = 0$ and $k - 10 \\ne 0$, i.e. $h = 6$, $k \\ne 10$. Only $(6, 9)$ qualifies (parallel lines). $(6, 10)$ gives the same line twice (infinitely many solutions); $h = 5$ or $h = -6$ give exactly one solution.",
    ref: "Tutorial 1 Q2; PYP AY24/25 S2 Q5",
  },
  {
    subtopic: "Number of solutions",
    kind: "mcq",
    prompt: "Consider $-m_1x + y = b_1$, $\\ -m_2x + y = b_2$ with $m_1 = m_2$. When is the system consistent?",
    options: [
      "For all $b_1, b_2$",
      "Exactly when $b_1 = b_2$, and then it has infinitely many solutions",
      "Exactly when $b_1 = b_2$, and then it has exactly one solution",
      "Exactly when $b_1 \\ne b_2$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$r_2 \\leftarrow r_2 - r_1$ gives $[\\,m_1 - m_2\\ \\ 0 \\mid b_2 - b_1\\,] = [\\,0\\ \\ 0 \\mid b_2 - b_1\\,]$ when $m_1 = m_2$. If $b_2 \\ne b_1$ this is $0 = b_2 - b_1 \\ne 0$: no solution (parallel lines). If $b_1 = b_2$ the second equation repeats the first: one pivot, $x$ free, infinitely many solutions (the same line).",
    ref: "Additional practice problems (system $-m_1x + y = b_1$, $-m_2x + y = b_2$)",
  },
  {
    subtopic: "Number of solutions",
    kind: "mcq",
    prompt: "Consider $-m_1x + y = b_1$, $\\ -m_2x + y = b_2$ with $m_1 \\ne m_2$. The system has exactly one solution. What is it?",
    options: [
      "$x = \\dfrac{b_2 - b_1}{m_1 - m_2},\\ y = \\dfrac{m_1b_2 - m_2b_1}{m_1 - m_2}$",
      "$x = \\dfrac{b_1 - b_2}{m_1 - m_2},\\ y = \\dfrac{m_1b_2 - m_2b_1}{m_1 - m_2}$",
      "$x = \\dfrac{b_2 - b_1}{m_1 - m_2},\\ y = \\dfrac{m_2b_1 - m_1b_2}{m_1 - m_2}$",
      "$x = \\dfrac{b_1 + b_2}{m_1 + m_2},\\ y = \\dfrac{b_1 + b_2}{2}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$r_2 \\leftarrow r_2 - r_1$: $(m_1 - m_2)x = b_2 - b_1$, and $m_1 - m_2 \\ne 0$ is a pivot, so $x = \\dfrac{b_2 - b_1}{m_1 - m_2}$. Then $y = b_1 + m_1x = \\dfrac{b_1(m_1 - m_2) + m_1(b_2 - b_1)}{m_1 - m_2} = \\dfrac{m_1b_2 - m_2b_1}{m_1 - m_2}$. Check in equation 2: $-m_2x + y = \\dfrac{-m_2b_2 + m_2b_1 + m_1b_2 - m_2b_1}{m_1 - m_2} = b_2$ ✓.",
    ref: "Additional practice problems (system $-m_1x + y = b_1$, $-m_2x + y = b_2$)",
  },
  {
    subtopic: "Row operations",
    kind: "mcq",
    prompt: "Which of the following is **not** an elementary row operation on a $3$-row matrix?",
    options: ["$r_2 \\leftarrow r_1 + r_3$", "$r_1 \\leftrightarrow r_3$", "$r_2 \\leftarrow -\\tfrac12 r_2$", "$r_3 \\leftarrow r_3 + 7r_1$", "None of the above (all are elementary)"],
    answer: 0,
    solution:
      "The elementary operations are replacement $r_i \\leftarrow r_i + c\\,r_j$, interchange, and scaling by a **nonzero** constant. $r_2 \\leftarrow r_1 + r_3$ discards the old $r_2$ entirely; it is not of the form $r_2 + c\\,r_j$ and cannot be undone. The other three are an interchange, a scaling by $-\\tfrac12 \\ne 0$, and a replacement.",
    ref: "Slides 2.2 elementary row operations (alg p7–8)",
  },
  {
    subtopic: "Row operations",
    kind: "mcq",
    prompt: "Which elementary row operation undoes $r_3 \\leftarrow r_3 - 4r_1$?",
    options: ["$r_1 \\leftarrow r_1 + 4r_3$", "$r_3 \\leftarrow r_3 + \\tfrac14 r_1$", "$r_3 \\leftarrow r_3 + 4r_1$", "$r_3 \\leftarrow -r_3 - 4r_1$", NOTA],
    answer: 2,
    solution:
      "After the operation the new third row is $r_3 - 4r_1$, and $r_1$ is unchanged. Adding $4r_1$ back gives $r_3$. In the slides: $E_1$ subtracts $4\\times$ row 1 from row 3, and $E_1^{-1}$ adds $+4$ times row 1 to row 3.",
    ref: "Slides 2.2 Exercise 2.2.2 (alg p8)",
  },
  {
    subtopic: "Row reduction",
    kind: "mcq",
    prompt: "Solve the system $x_1 - x_2 + 2x_3 = 5$, $\\ 2x_1 + x_2 + x_3 = 7$, $\\ -x_1 + 2x_2 + x_3 = 6$.",
    options: ["$(3, 2, 1)$", "$(1, -2, 3)$", "$(2, 1, 3)$", "$(-1, 2, 3)$", NOTA],
    answer: 4,
    solution:
      "$r_2 \\leftarrow r_2 - 2r_1$: $[0\\ 3\\ {-3} \\mid {-3}]$, so $x_2 - x_3 = -1$. $r_3 \\leftarrow r_3 + r_1$: $[0\\ 1\\ 3 \\mid 11]$. Subtracting, $4x_3 = 12$, so $x_3 = 3$, $x_2 = 2$, and $x_1 = 5 + x_2 - 2x_3 = 1$.\nThe unique solution is $(1, 2, 3)$, which is not listed. Check: $1 - 2 + 6 = 5$, $2 + 2 + 3 = 7$, $-1 + 4 + 3 = 6$ ✓. The listed vectors each fail at least one equation. **None of the above**.",
    ref: "PYP (written papers): RREF of a $3\\times4$ augmented matrix and write the solution",
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
      "The fourth matrix has leading 1s in columns 1, 2, 4, each further right than the one above, and each is the only nonzero entry in its column (column 3 has no pivot, so it may hold anything). The first has row 3's leading entry to the **left** of row 2's; the second has a leading entry $2$; the third has two nonzero entries in a pivot column (rows 2 and 3 both start in column 3).",
    ref: "Tutorial 1 Q11 (RREF options); PYP AY25/26 S1 Q8",
  },
  {
    subtopic: "Echelon & RREF",
    kind: "mcq",
    prompt: "Which matrix is in echelon form but **not** in reduced row echelon form?",
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
    ref: "Tutorial 1 Q11 (RREF options)",
  },
  {
    subtopic: "Pivots",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 3 & 0 & 2 \\\\ 2 & 6 & 1 & 1 \\\\ -1 & -3 & 2 & -8 \\end{bmatrix}$. Which columns of $A$ are pivot columns?",
    options: ["Columns 1 and 3", "Columns 1 and 2", "Columns 1, 3 and 4", "Columns 1, 2 and 3", NOTA],
    answer: 0,
    solution:
      "$r_2 \\leftarrow r_2 - 2r_1$: $[0\\ 0\\ 1\\ {-3}]$. $\\ r_3 \\leftarrow r_3 + r_1$: $[0\\ 0\\ 2\\ {-6}]$. $\\ r_3 \\leftarrow r_3 - 2r_2$: zero row.\nEchelon form $\\begin{bmatrix} 1 & 3 & 0 & 2 \\\\ 0 & 0 & 1 & -3 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$: leading entries in columns 1 and 3.",
    ref: "Tutorial 1 Q5",
  },
  {
    subtopic: "General solution",
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
      "$x_3$ is free: $x_1 = 3 + 2x_3$, $x_2 = -1 - x_3$, so the usual form is $[3,-1,0]^T + t[2,-1,1]^T$, which is not listed.\nBut every vector in option (b) is a solution: $[5,-2,1] + t[-4,2,-2]$ has $x_3 = 1 - 2t$, $x_1 = 5 - 4t = 3 + 2x_3$ ✓ and $x_2 = -2 + 2t = -1 - x_3$ ✓; and as $t$ runs over $\\mathbb{R}$, $x_3 = 1 - 2t$ takes every value, so every solution appears. Option (b) is **the same line**. Option (a) has the signs of the free-variable coefficients not flipped, (c) forgets the $1$ in the free slot, (d) negates the particular solution.",
    ref: "Tutorial 1 Q11; Additional practice problems (general solution)",
  },
  {
    subtopic: "General solution",
    kind: "mcq",
    prompt:
      "For the system $x_1 + x_2 + x_3 + x_4 = 4$, $\\ x_1 + x_3 + x_4 = 3$, $\\ x_1 + x_3 = 1$, which is the general solution ($t\\in\\mathbb{R}$)?",
    options: [
      "$(x_1, x_2, x_3, x_4) = (1 - t,\\ 1,\\ t,\\ 2)$",
      "$(x_1, x_2, x_3, x_4) = (1 + t,\\ 1,\\ t,\\ 2)$",
      "$(x_1, x_2, x_3, x_4) = (1,\\ 1 - t,\\ t,\\ 2)$",
      "$(x_1, x_2, x_3, x_4) = (1 - t,\\ 1,\\ 2,\\ t)$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$r_2 \\leftarrow r_2 - r_1$: $[0\\ {-1}\\ 0\\ 0 \\mid {-1}]$. $\\ r_3 \\leftarrow r_3 - r_1$: $[0\\ {-1}\\ 0\\ {-1} \\mid {-3}]$. $\\ r_3 \\leftarrow r_3 - r_2$: $[0\\ 0\\ 0\\ {-1} \\mid {-2}]$.\nPivots in columns 1, 2, 4: leading variables $x_1, x_2, x_4$, free variable $x_3 = t$. Then $x_4 = 2$, $x_2 = 1$, and $x_1 = 4 - x_2 - x_3 - x_4 = 1 - t$.\nCheck: $(1-t) + 1 + t + 2 = 4$ ✓, $(1-t) + t + 2 = 3$ ✓, $(1-t) + t = 1$ ✓.",
    ref: "Additional practice problems (leading variables, free variables, general solution)",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt: "The solution set of the single equation $x_1 - 2x_2 + 3x_3 = 4$ in $\\mathbb{R}^3$ is",
    options: ["a plane that does not pass through the origin", "a plane through the origin", "a line", "all of $\\mathbb{R}^3$", NOTA],
    answer: 0,
    solution:
      "One pivot (in $x_1$), two free variables: $\\mathbf{x} = [4,0,0]^T + s[2,1,0]^T + t[-3,0,1]^T$, a plane. It passes through $(4,0,0)$ but not through $\\mathbf{0}$, because $0 \\ne 4$.",
    ref: "Additional practice problems (general solution); Slides 0A lines and planes (vec p27)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt:
      "A linear system has augmented matrix with echelon form $\\left[\\begin{array}{ccc|c} 1 & -2 & 3 & 1 \\\\ 0 & 1 & 4 & 2 \\\\ 0 & 0 & 0 & 5 \\end{array}\\right]$. The system has",
    options: ["exactly one solution", "infinitely many solutions with one free variable", "infinitely many solutions with two free variables", "no solution", NOTA],
    answer: 3,
    solution:
      "The last row means $0x_1 + 0x_2 + 0x_3 = 5$, which is impossible, so the system is **inconsistent**. Do not count the free variable $x_3$; free variables only matter for a consistent system.",
    ref: "Additional practice problems (consistency); Tutorial 1 Q2",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "For which values of $h$ is the matrix $\\left[\\begin{array}{cc|c} 1 & h & 4 \\\\ 3 & 6 & 8 \\end{array}\\right]$ the augmented matrix of a **consistent** system?",
    options: ["$h = 2$", "$h \\ne -2$", "every real $h$", "$h \\ne 6$", NOTA],
    answer: 4,
    solution:
      "$r_2 \\leftarrow r_2 - 3r_1$: $[0\\ \\ 6 - 3h \\mid -4]$. If $6 - 3h = 0$ ($h = 2$) the row reads $0 = -4$: inconsistent. Otherwise there is a pivot in column 2 and exactly one solution. So the system is consistent exactly for $h \\ne 2$, which is not among the options: **None of the above**.",
    ref: "PYP (written papers): $p$ for which $A\\mathbf{x} = [3, 9, p]^T$ is consistent",
  },
  {
    subtopic: "Systems with a parameter",
    kind: "mcq",
    prompt: "Consider the augmented matrix $\\left[\\begin{array}{cc|c} 1 & 3 & 2 \\\\ 3 & h & k \\end{array}\\right]$. Which statement is correct?",
    options: [
      "The system has infinitely many solutions if and only if $h = 9$ and $k = 6$.",
      "The system has no solution if and only if $h = 9$.",
      "The system has exactly one solution if and only if $k \\ne 6$.",
      "The system has no solution if and only if $h \\ne 9$ and $k = 6$.",
      NOTA,
    ],
    answer: 0,
    solution:
      "$r_2 \\leftarrow r_2 - 3r_1$: $[0\\ \\ h - 9 \\mid k - 6]$.\n- $h \\ne 9$: pivot in column 2, exactly one solution (for every $k$).\n- $h = 9$, $k = 6$: zero row, $x_2$ free, infinitely many.\n- $h = 9$, $k \\ne 6$: $0 = k - 6 \\ne 0$, no solution.\nOnly the first statement matches. \"No solution iff $h = 9$\" forgets the condition on $k$.",
    ref: "Tutorial 1 Q2",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt: "For which values of $k$ does the system $x + y + z = 0$, $\\ x + ky + z = 0$, $\\ x + y + kz = 0$ have a **nontrivial** solution?",
    options: ["$k = -1$", "$k = \\pm 1$", "$k = 1$", "$k = 0$", NOTA],
    answer: 2,
    solution:
      "Subtract $r_1$ from $r_2$ and $r_3$: $[0\\ \\ k-1\\ \\ 0]$ and $[0\\ \\ 0\\ \\ k-1]$. If $k \\ne 1$ there are three pivots and only the trivial solution. If $k = 1$ all three equations are $x + y + z = 0$: two free variables, so nontrivial solutions exist. (Equivalently $|A| = $ product of the pivots $= (k-1)^2$, zero only at $k = 1$.)",
    ref: "Tutorial 1 Q1",
  },
  {
    subtopic: "Coefficients from a solution",
    kind: "mcq",
    prompt: "$(x, y, z) = (1, 2, -1)$ is a solution of $2x + ay + 3z = 7$. What is $a$?",
    options: ["$3$", "$4$", "$-4$", "$2$", NOTA],
    answer: 1,
    solution: "Substitute: $2(1) + a(2) + 3(-1) = 7 \\Rightarrow 2a - 1 = 7 \\Rightarrow a = 4$. (Getting $3$ comes from dropping the $-3$; getting $-4$ from moving the constant with the wrong sign.)",
    ref: "PYP AY21/22 S1 Q1(a)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "$A$ is a $3\\times5$ matrix with 3 pivot columns. Which statement is true?",
    options: [
      "$A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
      "$A\\mathbf{x} = \\mathbf{b}$ is inconsistent for some $\\mathbf{b}\\in\\mathbb{R}^3$.",
      "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
      "$A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^3$, with infinitely many solutions.",
      NOTA,
    ],
    answer: 3,
    solution:
      "3 pivots in 3 rows: a pivot in every **row**, so by Theorem 1.2 every $\\mathbf{b}$ gives a consistent system. 3 pivots for 5 columns: 2 free variables, so every consistent system, including $A\\mathbf{x} = \\mathbf{0}$, has infinitely many solutions.",
    ref: "Slides 2.2 Theorem 1.2 (alg p11); Tutorial 1 Q5",
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
      "A pivot in every **column** means no free variables: a consistent system has exactly one solution. But only 3 of the 5 rows have pivots, so by Theorem 1.2 some $\\mathbf{b}$ give an inconsistent system (and others, such as $\\mathbf{b}$ = the first column of $A$, are consistent). Hence \"at most one solution\".",
    ref: "Slides 2.2 Theorem 1.2 (alg p11); Tutorial 1 Q12",
  },
  {
    subtopic: "Matrix equation",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & -1 \\\\ 3 & 1 \\end{bmatrix}$ and $\\mathbf{x} = [2, -1]^T$. What is $A\\mathbf{x}$?",
    options: ["$[4, 1, 7]^T$", "$[0, -1, 5]^T$", "$[2, 1, 5]^T$", "$[0, 1, 5]^T$", NOTA],
    answer: 3,
    solution:
      "$A\\mathbf{x}$ is a combination of the columns: $2\\begin{bmatrix}1\\\\0\\\\3\\end{bmatrix} - 1\\begin{bmatrix}2\\\\-1\\\\1\\end{bmatrix} = \\begin{bmatrix}0\\\\1\\\\5\\end{bmatrix}$. (Row by row: $2 - 2 = 0$, $0 + 1 = 1$, $6 - 1 = 5$.) $[4,1,7]^T$ comes from adding instead of subtracting the second column.",
    ref: "Slides 0B Matrix products as linear combinations (mtx p12)",
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
    ref: "PYP AY22/23 S1 Q1(b); Tutorial 1 Q3",
  },
  {
    subtopic: "Span",
    kind: "mcq",
    prompt: "For a nonzero vector $\\mathbf{v}\\in\\mathbb{R}^3$, $\\operatorname{Span}\\{\\mathbf{v}\\}$ is",
    options: ["the line through the origin in the direction of $\\mathbf{v}$", "the single point $\\mathbf{v}$", "the set $\\{\\mathbf{0}, \\mathbf{v}\\}$", "a plane through the origin", NOTA],
    answer: 0,
    solution:
      "$\\operatorname{Span}\\{\\mathbf{v}\\} = \\{c\\mathbf{v} : c\\in\\mathbb{R}\\}$: all scalar multiples, which is the whole line through $\\mathbf{0}$ and $\\mathbf{v}$.",
    ref: "Slides 4.3 Span (vsp p15); Slides 4.4 Exercise 4.4.2 (vsp p19); PYP AY21/22 S1 Q1(b)",
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
      "By Theorem 1.2, spanning $\\mathbb{R}^4$ needs a pivot in every one of the 4 rows. A $4\\times3$ matrix has at most 3 pivots (one per column), so this is **never** possible.",
    ref: "Slides 2.2 Theorem 1.2 (alg p11); Tutorial 1 Q5",
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
      "The coefficients of $x_1$ in the three equations form the first **column** $[2, 1, -1]^T$, those of $x_2$ the second column $[-1, 4, 5]^T$, and the right-hand sides form $\\mathbf{b}$. Option (b) uses rows as columns; (c) has the wrong sign on $\\mathbf{b}$; (d) uses a $2\\times3$ matrix, which cannot multiply a vector in $\\mathbb{R}^2$.",
    ref: "Slides 0B Matrix products as linear combinations (mtx p12); PYP AY23/24 S2 Q2(b)(i): write the system as $A\\mathbf{x} = \\mathbf{b}$",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt: "A homogeneous system of 6 equations in 5 unknowns has 5 pivot positions. How many solutions does it have?",
    options: ["None", "Exactly one", "Infinitely many", "Exactly five", "Cannot be determined"],
    answer: 1,
    solution:
      "Homogeneous systems are always consistent ($\\mathbf{x} = \\mathbf{0}$ works). With 5 pivots for 5 unknowns there are no free variables, so the trivial solution is the **only** one.",
    ref: "Tutorial 1 Q12",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "The complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = [1, 2, 0]^T + t[1, -1, 1]^T$, $t\\in\\mathbb{R}$. Which vector is also a solution of $A\\mathbf{x} = \\mathbf{b}$?",
    options: ["$[1, -1, 1]^T$", "$[2, 3, 1]^T$", "$[2, 1, 1]^T$", "$[0, 0, 0]^T$", NOTA],
    answer: 2,
    solution:
      "Every solution has the form $[1,2,0]^T + t[1,-1,1]^T$. With $t = 1$: $[2,1,1]^T$. For $[1,-1,1]^T$ the third entry needs $t = 1$, giving $[2,1,1]^T \\ne [1,-1,1]^T$. For $[2,3,1]^T$: $t = 1$ again, but the second entry would be $1$, not $3$. For $\\mathbf{0}$: the third entry forces $t = 0$, giving $[1,2,0]^T \\ne \\mathbf{0}$.",
    ref: "Tutorial 1 Q11; PYP AY21/22 S1 Q1(c)",
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
      "We need one pivot (one free variable) with $(3,1)$ a solution. $\\begin{bmatrix}1&-3\\\\2&-6\\end{bmatrix}$: both rows say $x_1 - 3x_2 = 0$, i.e. $x_1 = 3x_2$, the multiples of $(3,1)$ ✓. The first matrix gives $3x_1 + x_2 = 0$ (the multiples of $(1,-3)$), the third $x_1 + 3x_2 = 0$ (multiples of $(-3,1)$), and $I$ has only the trivial solution.",
    ref: "Tutorial 1 Q6",
  },
  {
    subtopic: "Free variables",
    kind: "mcq",
    prompt: "$A$ is a $3\\times5$ matrix and the equation $A\\mathbf{x} = \\mathbf{0}$ has exactly 3 free variables. What is the number of pivot positions of $A$?",
    options: ["$3$", "$5$", "$2$", "$1$", NOTA],
    answer: 2,
    solution: "#free variables $=$ #columns $-$ #pivots, so #pivots $= 5 - 3 = 2$. (The number of rows, 3, plays no role here.)",
    ref: "PYP (written papers): find $t$ so that $A\\mathbf{x} = \\mathbf{0}$ has 3 free variables",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt:
      "For which $h$ are $\\mathbf{v}_1 = [1, -1, 2]^T$, $\\mathbf{v}_2 = [3, -5, 6]^T$, $\\mathbf{v}_3 = [-1, 5, h]^T$ linearly **dependent**?",
    options: ["$h = 2$", "$h = 4$", "every real $h$", "$h = -4$", NOTA],
    answer: 4,
    solution:
      "Row reduce $[\\mathbf{v}_1\\ \\mathbf{v}_2\\ \\mathbf{v}_3] = \\begin{bmatrix} 1 & 3 & -1 \\\\ -1 & -5 & 5 \\\\ 2 & 6 & h \\end{bmatrix}$: $r_2 + r_1 = [0\\ {-2}\\ 4]$, $r_3 - 2r_1 = [0\\ 0\\ h + 2]$.\nColumn 3 lacks a pivot iff $h + 2 = 0$, i.e. $h = -2$. Since $-2$ is not listed, the answer is **None of the above**.",
    ref: "Tutorial 1 Q8",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt:
      "For which $h$ are $\\mathbf{v}_1 = [1, 2, -3]^T$, $\\mathbf{v}_2 = [-2, -4, 6]^T$, $\\mathbf{v}_3 = [3, h, 1]^T$ linearly **dependent**?",
    options: ["$h = 0$", "$h = 6$", "$h = -6$", "every real $h$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{v}_2 = -2\\mathbf{v}_1$, so $2\\mathbf{v}_1 + \\mathbf{v}_2 + 0\\mathbf{v}_3 = \\mathbf{0}$ with weights not all zero, whatever $h$ is. The set is dependent for **every** $h$ (compare Tutorial 1 Q8, answer \"all values of $h$\"). Trap: hunting for a special $h$ before noticing two vectors are multiples of each other.",
    ref: "Tutorial 1 Q8; Slides 4.7 (vsp p30)",
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
      "$[7,8,9] = 2[4,5,6] - [1,2,3]$ (check: $8-1$, $10-2$, $12-3$), so the first set is dependent. The second, as columns, is already in echelon form with 3 pivots. The third and fourth are pairs of vectors that are not multiples of each other.",
    ref: "Slides 4.7 (vsp p29–30)",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "Let $S = \\{(-3, 5, 2),\\ (0, 2, -2),\\ (8, -1, \\tfrac12),\\ (-4, 1, 0)\\}$, a subset of $\\mathbb{R}^3$. Then",
    options: [
      "$S$ is linearly independent since it has finitely many vectors",
      "$S$ is linearly independent since it has more than three vectors",
      "$S$ is linearly dependent since it has finitely many vectors",
      "$S$ is linearly dependent since it has more than three vectors",
      NOTA,
    ],
    answer: 3,
    solution:
      "Four vectors in $\\mathbb{R}^3$: the matrix with them as columns is $3\\times4$, with at most 3 pivots for 4 columns, so there is a free variable and a nontrivial solution of $A\\mathbf{x} = \\mathbf{0}$. More vectors than entries forces dependence; being finite says nothing.",
    ref: "Additional practice problems Q.19",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "If the vectors $(p, q)$ and $(r, s)$ are linearly dependent, then",
    options: ["$pq = rs$", "$ps = qr$", "$pr = qs$", "$pr = -qs$", NOTA],
    answer: 1,
    solution:
      "Two vectors are dependent iff one is a multiple of the other. If $(r, s) = c(p, q)$ then $ps - qr = p(cq) - q(cp) = 0$; if $(p, q) = c(r, s)$ then $ps - qr = crs - csr = 0$. So $ps = qr$. (Equivalently the $2\\times2$ matrix with these columns has $|A| = ps - qr = 0$.)",
    ref: "Additional practice problems Q.23; Slides 4.7 (vsp p30)",
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
      "$-4\\mathbf{u} + 2\\mathbf{v} = -2(2\\mathbf{u} - \\mathbf{v})$, so the second set is two multiples of one vector: dependent. For the others, e.g. $c_1(\\mathbf{u}+\\mathbf{v}) + c_2(\\mathbf{u}-\\mathbf{v}) = (c_1+c_2)\\mathbf{u} + (c_1-c_2)\\mathbf{v} = \\mathbf{0}$ forces $c_1 + c_2 = 0$ and $c_1 - c_2 = 0$ (as $\\mathbf{u},\\mathbf{v}$ are independent), so $c_1 = c_2 = 0$; the third and fourth work the same way.",
    ref: "PYP (written papers): are $\\mathbf{u}+\\mathbf{v}$, $\\mathbf{u}-\\mathbf{v}$, $\\mathbf{u}-2\\mathbf{v}+\\mathbf{w}$ independent?",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "For which real $t$ is $\\{[1,1,1]^T,\\ [1,2,t]^T,\\ [1,4,t^2]^T\\}$ linearly independent?",
    options: ["$t \\ne 0$", "$t \\ne \\pm1$", "$t \\ne 2$ and $t \\ne 4$", "$t \\ne 1$ and $t \\ne 2$", NOTA],
    answer: 3,
    solution:
      "Columns: $\\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 4 \\\\ 1 & t & t^2 \\end{bmatrix}$. $r_2 \\leftarrow r_2 - r_1$: $[0\\ 1\\ 3]$; $r_3 \\leftarrow r_3 - r_1$: $[0\\ \\ t-1\\ \\ t^2-1]$; $r_3 \\leftarrow r_3 - (t-1)r_2$: $[0\\ \\ 0\\ \\ t^2 - 1 - 3(t-1)] = [0\\ 0\\ (t-1)(t-2)]$.\nThe third pivot is nonzero iff $t \\ne 1, 2$. At $t = 1$ the second vector equals the first; at $t = 2$ the third is $[1,4,4]$, and $-2[1,1,1] + 3[1,2,2] = [1,4,4]$.",
    ref: "PYP AY2021-S2 Q1(c) ($[1,1,1], [a,b,c], [a^2,b^2,c^2]$)",
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
      "$x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n = \\mathbf{0}$ **is** $A\\mathbf{x} = \\mathbf{0}$, so by the definition independence means only the trivial solution (a pivot in every **column**). The first two options describe spanning $\\mathbb{R}^m$ (Theorem 1.2), a different property. Squareness is neither necessary nor sufficient.",
    ref: "Slides 4.7 definition (vsp p29); Slides 2.2 Theorem 1.2 (alg p11)",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "$\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_5\\}$ is a set of five vectors in $\\mathbb{R}^4$. Which statement must be true?",
    options: ["The set is linearly independent.", "The set is linearly dependent.", "The set spans $\\mathbb{R}^4$.", "One of the vectors is the zero vector.", NOTA],
    answer: 1,
    solution:
      "More vectors than entries: $[\\mathbf{v}_1 \\cdots \\mathbf{v}_5]$ is $4\\times5$, at most 4 pivots for 5 columns, so there is a free variable and $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution. The set need not span $\\mathbb{R}^4$ (all five could be multiples of one vector), and none of them has to be $\\mathbf{0}$.",
    ref: "Additional practice problems Q.19; PYP (written papers): columns of every $3\\times5$ matrix are dependent",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "$A$ is a $3\\times3$ matrix and $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}\\in\\mathbb{R}^3$. Which statement must be true?",
    options: [
      "$A\\mathbf{x} = \\mathbf{z}$ has exactly one solution for some $\\mathbf{z}\\in\\mathbb{R}^3$",
      "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution",
      "The columns of $A$ are linearly independent",
      "$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution",
      NOTA,
    ],
    answer: 3,
    solution:
      "Some $\\mathbf{y}$ is unreachable, so $A$ lacks a pivot in some row: fewer than 3 pivots. For a $3\\times3$ matrix that also means a column without a pivot, i.e. a free variable. Then $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions, the columns are dependent, and **every** consistent $A\\mathbf{x} = \\mathbf{z}$ has infinitely many solutions, so no $\\mathbf{z}$ gives exactly one.",
    ref: "Tutorial 1 Q7; Slides 2.2 Theorem 2.4 (alg p10)",
  },
  {
    subtopic: "RREF from a solution",
    kind: "mcq",
    prompt:
      "$A$ is $3\\times3$ and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = [4,0,0]^T + s[2,1,0]^T + t[-1,0,1]^T$, $s,t\\in\\mathbb{R}$. How many pivot positions does $A$ have?",
    options: ["$1$", "$2$", "$3$", "$0$", NOTA],
    answer: 0,
    solution:
      "Two parameters, so two free variables ($x_2, x_3$) and $3 - 2 = 1$ pivot. Indeed $x_1 = 4 + 2x_2 - x_3$ gives the single RREF row $[1\\ {-2}\\ 1 \\mid 4]$ followed by two zero rows.",
    ref: "Tutorial 1 Q11; PYP AY24/25 S2 Q8",
  },
];
