import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const systemsExam: ConceptQuestion[] = [
  {
    subtopic: "Systems with a parameter",
    kind: "mcq",
    prompt:
      "Consider the linear system\n$$\\begin{aligned} x + 2y - z &= 2 \\\\ 2x + 5y + z &= 3 \\\\ x + 3y + (a^2 - 7)z &= a - 2 \\end{aligned}$$\nWhich of the following statements are correct?\nI. When $a = 3$ the system has infinitely many solutions.\nII. When $a = -3$ the system has no solution.\nIII. When $a = 0$ the system has exactly one solution.\nIV. When $a = 3$ the solution set is a plane in $\\mathbb{R}^3$.",
    options: ["I and II only", "I, II and III only", "II and III only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "$R_2 \\leftarrow R_2 - 2R_1$: $[0\\ 1\\ 3 \\mid -1]$. $\\ R_3 \\leftarrow R_3 - R_1$: $[0\\ 1\\ a^2 - 6 \\mid a - 4]$. $\\ R_3 \\leftarrow R_3 - R_2$: $[0\\ 0\\ a^2 - 9 \\mid a - 3] = [0\\ 0\\ (a-3)(a+3) \\mid a - 3]$.\n- $a = 3$: zero row, $z$ free → infinitely many (I ✓). Only **one** free variable, so the solution set is a **line**, not a plane (IV ✗).\n- $a = -3$: $[0\\ 0\\ 0 \\mid -6]$ → no solution (II ✓).\n- $a = 0$: $a^2 - 9 = -9 \\ne 0$ → pivot in every column → unique (III ✓).",
  },
  {
    subtopic: "Systems with a parameter",
    kind: "mcq",
    prompt: "The system $\\lambda x + 4y = 2$, $\\ 9x + \\lambda y = 3$ has a unique solution for every real $\\lambda$ except two values. Which statement is correct?",
    options: [
      "It has a unique solution for all $\\lambda$ except $\\lambda = 6$, where it has infinitely many solutions.",
      "It has no solution when $\\lambda = 6$ and infinitely many solutions when $\\lambda = -6$.",
      "It has infinitely many solutions when $\\lambda = 6$ and no solution when $\\lambda = -6$.",
      "It has infinitely many solutions when $\\lambda = \\pm 6$.",
      NOTA,
    ],
    answer: 2,
    solution:
      "The coefficient matrix $\\begin{bmatrix}\\lambda & 4\\\\ 9 & \\lambda\\end{bmatrix}$ has $\\det = \\lambda^2 - 36$, so the solution is unique unless $\\lambda = \\pm6$.\n- $\\lambda = 6$: $6x + 4y = 2$ and $9x + 6y = 3$. The second is $\\tfrac32\\times$ the first ($9x + 6y = 3$ ✓), so the system reduces to one line: infinitely many solutions.\n- $\\lambda = -6$: $-6x + 4y = 2$ and $9x - 6y = 3$. $R_2 + \\tfrac32R_1$ gives $0 = 3 + 3 = 6$: no solution.\nThe two special values behave differently, which is the trap in options (b) and (d).",
  },
  {
    subtopic: "RREF from a solution",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times4$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is\n$$\\mathbf{x} = \\begin{bmatrix}2\\\\0\\\\-1\\\\0\\end{bmatrix} + s\\begin{bmatrix}-3\\\\1\\\\0\\\\0\\end{bmatrix} + t\\begin{bmatrix}4\\\\0\\\\2\\\\1\\end{bmatrix}, \\qquad s, t\\in\\mathbb{R}.$$\nThe reduced row echelon form of $[A \\mid \\mathbf{b}]$ is",
    options: [
      "$\\left[\\begin{array}{cccc|c} 1 & -3 & 0 & 4 & 2 \\\\ 0 & 0 & 1 & 2 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      "$\\left[\\begin{array}{cccc|c} 1 & 3 & 0 & -4 & -2 \\\\ 0 & 0 & 1 & -2 & 1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      "$\\left[\\begin{array}{cccc|c} 1 & 0 & 3 & -4 & 2 \\\\ 0 & 1 & 0 & -2 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      "$\\left[\\begin{array}{cccc|c} 1 & 3 & 0 & -4 & 2 \\\\ 0 & 0 & 1 & -2 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$x_2 = s$ and $x_4 = t$ appear alone, so they are free; $x_1, x_3$ are basic. Reading the rows: $x_1 = 2 - 3x_2 + 4x_4$ and $x_3 = -1 + 2x_4$.\nMove the free variables to the left: $x_1 + 3x_2 - 4x_4 = 2$ and $x_3 - 2x_4 = -1$. These are the two nonzero RREF rows; rank $2$ leaves one zero row.\nCheck: $[2,0,-1,0]$ satisfies both rows, and each direction vector gives $0$ (e.g. $4 + 0 - 4 = 0$, $2 - 2 = 0$). Option (a) forgets to flip the signs, (b) negates the right-hand side, (c) puts the pivots in the wrong columns.",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "$A$ is a $4\\times4$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = [1,0,2,0]^T + s[2,1,0,0]^T + t[-1,0,3,1]^T$, $s,t\\in\\mathbb{R}$. Which of the following statements are correct?\nI. $\\operatorname{rank}A = 2$.\nII. $A\\mathbf{x} = \\mathbf{c}$ is consistent for every $\\mathbf{c}\\in\\mathbb{R}^4$.\nIII. $[2, 1, 5, 1]^T$ is a solution of $A\\mathbf{x} = \\mathbf{b}$.\nIV. $[0, 0, 1, 0]^T$ is a solution of $A\\mathbf{x} = \\mathbf{0}$.",
    options: ["I and II only", "III only", "I and III only", "I, III and IV only", "All of the above"],
    answer: 2,
    solution:
      "- I ✓: two parameters means two free variables, so rank $= 4 - 2 = 2$.\n- II ✗: rank $2 < 4$ rows, so $A$ lacks a pivot in two rows and some $\\mathbf{c}$ are unreachable.\n- III ✓: $s = t = 1$ gives $[1+2-1,\\ 0+1+0,\\ 2+0+3,\\ 0+0+1] = [2,1,5,1]$.\n- IV ✗: solutions of $A\\mathbf{x} = \\mathbf{0}$ are $s[2,1,0,0]^T + t[-1,0,3,1]^T$; matching the 4th entry forces $t = 0$ and the 2nd forces $s = 0$, giving $\\mathbf{0} \\ne [0,0,1,0]^T$.",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt:
      "Find all values of $k$ for which the system\n$$\\begin{aligned} x + 2y + kz &= 0 \\\\ 2x + ky + 2z &= 0 \\\\ x + y + z &= 0 \\end{aligned}$$\nhas a non-trivial solution.",
    options: ["$k \\in \\{1, 2\\}$", "$k = 2$ only", "$k \\in \\{-1, -2\\}$", "$k \\notin \\{1, 2\\}$", NOTA],
    answer: 0,
    solution:
      "A square homogeneous system has a nontrivial solution iff its coefficient matrix is singular:\n$$\\det\\begin{bmatrix} 1 & 2 & k \\\\ 2 & k & 2 \\\\ 1 & 1 & 1 \\end{bmatrix} = 1(k - 2) - 2(2 - 2) + k(2 - k) = -k^2 + 3k - 2 = -(k-1)(k-2).$$\nSo $k = 1$ or $k = 2$. (Check: at $k = 1$, $[1, 0, -1]^T$ is a nontrivial solution; at $k = 2$ the second equation is twice the third.) Option (d) describes exactly when only the trivial solution exists.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "The set of all real $x$ for which $\\left\\{ \\begin{bmatrix}x\\\\1\\\\0\\end{bmatrix}, \\begin{bmatrix}1\\\\x\\\\1\\end{bmatrix}, \\begin{bmatrix}0\\\\1\\\\x\\end{bmatrix} \\right\\}$ is linearly independent is",
    options: [
      "$\\{x\\in\\mathbb{R} : x \\ne \\pm1\\}$",
      "$\\{x\\in\\mathbb{R} : x \\ne 0,\\ x \\ne \\pm\\sqrt2\\}$",
      "$\\{x\\in\\mathbb{R} : x \\ne \\pm\\sqrt2\\}$",
      "$\\{x\\in\\mathbb{R} : x \\ne 0,\\ x \\ne 2\\}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Three vectors in $\\mathbb{R}^3$ are independent iff the matrix having them as columns is invertible:\n$$\\det\\begin{bmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{bmatrix} = x(x^2 - 1) - 1(x - 0) = x^3 - 2x = x(x^2 - 2).$$\nIt vanishes at $x = 0$ and $x = \\pm\\sqrt2$. (At $x = 0$: the first and third vectors are $[0,1,0]$ — equal, so clearly dependent.) Independent for all other $x$.",
  },
  {
    subtopic: "Span",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{a}_1 = [1, 2, -1]^T$, $\\mathbf{a}_2 = [-2, -3, 4]^T$ and $\\mathbf{b} = [3, h, -7]^T$. Which statement is correct?",
    options: [
      "$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ only for $h = -4$, and then $\\mathbf{b} = -\\mathbf{a}_1 - 2\\mathbf{a}_2$",
      "$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ only for $h = 4$, and then $\\mathbf{b} = \\mathbf{a}_1 + 2\\mathbf{a}_2$",
      "$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ only for $h = 4$, and then $\\mathbf{b} = -\\mathbf{a}_1 - 2\\mathbf{a}_2$",
      "$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ for every $h$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Row reduce $\\left[\\begin{array}{cc|c} 1 & -2 & 3 \\\\ 2 & -3 & h \\\\ -1 & 4 & -7 \\end{array}\\right]$: $R_2 - 2R_1 = [0\\ 1 \\mid h - 6]$, $R_3 + R_1 = [0\\ 2 \\mid -4]$, then $R_3 - 2R_2 = [0\\ 0 \\mid -4 - 2(h-6)] = [0\\ 0 \\mid 8 - 2h]$.\nConsistent iff $h = 4$. Then $x_2 = h - 6 = -2$ and $x_1 = 3 + 2x_2 = -1$: $\\mathbf{b} = -\\mathbf{a}_1 - 2\\mathbf{a}_2 = [-1+4,\\ -2+6,\\ 1-8] = [3, 4, -7]$ ✓. Two vectors span only a plane, so (d) is impossible.",
  },
  {
    subtopic: "Consistency",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & -2 & 3 \\\\ 2 & -3 & 8 \\\\ -1 & 0 & -7 \\end{bmatrix}$ and $\\mathbf{b} = [2, 5, p]^T$. For which $p$ is $A\\mathbf{x} = \\mathbf{b}$ consistent, and how many solutions does it then have?",
    options: ["$p = 16$; exactly one", "$p = -4$; exactly one", "$p = 4$; infinitely many", "$p = -4$; infinitely many", NOTA],
    answer: 3,
    solution:
      "$R_2 \\leftarrow R_2 - 2R_1$: $[0\\ 1\\ 2 \\mid 1]$. $\\ R_3 \\leftarrow R_3 + R_1$: $[0\\ {-2}\\ {-4} \\mid p + 2]$. $\\ R_3 \\leftarrow R_3 + 2R_2$: $[0\\ 0\\ 0 \\mid p + 4]$.\nConsistent iff $p = -4$ (equivalently row 3 $= 3\\cdot$row 1 $- 2\\cdot$row 2, so $p = 3(2) - 2(5)$). Then $x_3$ is free: **infinitely many** solutions. $p = 16$ comes from $3(2) + 2(5)$, a sign slip.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt:
      "Which of the following statements are correct?\nI. The columns of any $3\\times5$ matrix are linearly dependent.\nII. If $A$ is $5\\times3$ with 3 pivot positions, then $A\\mathbf{x} = \\mathbf{b}$ has at most one solution for each $\\mathbf{b}$.\nIII. If $A\\mathbf{x} = \\mathbf{b}$ is consistent for some $\\mathbf{b}$, then it is consistent for every $\\mathbf{b}$.\nIV. If $A$ is $4\\times4$ and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^4$.",
    options: ["I, II and IV only", "I and II only", "II and IV only", "I, III and IV only", "All of the above"],
    answer: 0,
    solution:
      "- I ✓: at most 3 pivots for 5 columns, so a free variable exists.\n- II ✓: a pivot in every column means no free variables; a consistent system has exactly one solution (some $\\mathbf{b}$ may give none).\n- III ✗: $A\\mathbf{x} = \\mathbf{0}$ is always consistent, but e.g. $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ cannot reach $[0,1]^T$.\n- IV ✓: 4 pivots in a $4\\times4$ matrix is a pivot in every column **and** every row.",
  },
  {
    subtopic: "Independence of combinations",
    kind: "mcq",
    prompt:
      "Let $\\{\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\}$ be a linearly independent set in $\\mathbb{R}^n$. Which of the following sets are linearly independent?\nI. $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{u}-\\mathbf{v}\\}$\nII. $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{v}+\\mathbf{w},\\ \\mathbf{w}+\\mathbf{u}\\}$\nIII. $\\{\\mathbf{u}-\\mathbf{v},\\ \\mathbf{v}-\\mathbf{w},\\ \\mathbf{w}-\\mathbf{u}\\}$\nIV. $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{u}-\\mathbf{v},\\ \\mathbf{u}-2\\mathbf{v}+\\mathbf{w}\\}$",
    options: ["I and II only", "I and IV only", "II, III and IV only", "I, II and IV only", "All of the above"],
    answer: 3,
    solution:
      "Write each set's coefficients (with respect to $\\mathbf{u},\\mathbf{v},\\mathbf{w}$) as rows of a matrix $C$; since $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ are independent, the set is independent iff $C$ has full row rank (for a square $C$: $\\det C \\ne 0$).\n- I: $\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$, $\\det = -2$ ✓.\n- II: $\\begin{bmatrix}1&1&0\\\\0&1&1\\\\1&0&1\\end{bmatrix}$, $\\det = 2$ ✓.\n- III: the three vectors sum to $\\mathbf{0}$, so they are dependent ✗.\n- IV: $\\begin{bmatrix}1&1&0\\\\1&-1&0\\\\1&-2&1\\end{bmatrix}$, $\\det = 1\\cdot(-1) - 1\\cdot(1) = -2$ ✓ (only the third vector involves $\\mathbf{w}$, and the first two are independent).",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $5\\times4$ matrix such that $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^5$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Only the trivial solution means a pivot in each of the 4 columns, so solutions are unique **when they exist**. But 4 pivots cannot fill 5 rows: some row of the echelon form of $A$ is zero, and a suitable $\\mathbf{b}$ turns it into $[0\\ 0\\ 0\\ 0 \\mid 1]$. So $A\\mathbf{x} = \\mathbf{b}$ is inconsistent for some $\\mathbf{b}$: **False**.",
  },
  {
    subtopic: "Coefficients from a solution",
    kind: "mcq",
    prompt:
      "The system\n$$\\begin{aligned} ax - y + 2z &= 13 \\\\ 3x + by - z &= -5 \\\\ x + 4y + cz &= 4 \\end{aligned}$$\nhas the solution $x = 2$, $y = -1$, $z = 3$. Which statement is correct?",
    options: [
      "$(a, b, c) = (3, 8, 2)$, and the system then has infinitely many solutions",
      "$(a, b, c) = (3, -8, 2)$, and the system then has exactly one solution",
      "$(a, b, c) = (5, 8, 2)$, and the system then has exactly one solution",
      "$(a, b, c) = (3, 8, -2)$, and the system then has exactly one solution",
      NOTA,
    ],
    answer: 4,
    solution:
      "Substitute $(2, -1, 3)$:\n- $2a + 1 + 6 = 13 \\Rightarrow a = 3$;\n- $6 - b - 3 = -5 \\Rightarrow b = 8$;\n- $2 - 4 + 3c = 4 \\Rightarrow c = 2$.\nWith these values $\\det\\begin{bmatrix} 3 & -1 & 2 \\\\ 3 & 8 & -1 \\\\ 1 & 4 & 2 \\end{bmatrix} = 3(16 + 4) + 1(6 + 1) + 2(12 - 8) = 60 + 7 + 8 = 75 \\ne 0$, so the solution $(2,-1,3)$ is the **only** one.\nThe correct combination \"$(3, 8, 2)$, exactly one solution\" is not offered: **None of the above**.",
  },
  {
    subtopic: "Echelon & RREF",
    kind: "mcq",
    prompt: "Which of the following statements about linear systems and row reduction is **false**?",
    options: [
      "A linear system with more unknowns than equations always has infinitely many solutions.",
      "Every matrix is row equivalent to exactly one matrix in reduced row echelon form.",
      "If two augmented matrices are row equivalent, the corresponding systems have the same solution set.",
      "The pivot positions of a matrix are the same in every echelon form of that matrix.",
      "A consistent linear system with at least one free variable has infinitely many solutions.",
    ],
    answer: 0,
    solution:
      "More unknowns than equations guarantees a free variable, but only matters **if the system is consistent**. $x + y + z = 1$, $x + y + z = 2$ has 3 unknowns, 2 equations and no solution. The other four statements are standard theorems (uniqueness of RREF, row equivalence preserves solutions, pivot positions are determined by the RREF, and free variable + consistent ⇒ infinitely many).",
  },
  {
    subtopic: "Parametric vector form",
    kind: "mcq",
    prompt:
      "The augmented matrix of a system in $x_1, x_2, x_3, x_4$ has the echelon form\n$$\\left[\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 1 \\\\ 0 & 0 & 1 & -2 & 3 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$$\nWhich of the following is the complete solution ($s, t\\in\\mathbb{R}$)?",
    options: [
      "$\\mathbf{x} = [1,0,3,0]^T + s[-2,1,0,0]^T + t[-3,0,2,1]^T$",
      "$\\mathbf{x} = [4,0,3,0]^T + s[2,1,0,0]^T + t[1,0,-2,1]^T$",
      "$\\mathbf{x} = [3,0,5,1]^T + s[-2,1,0,0]^T + t[-1,0,2,1]^T$",
      "$\\mathbf{x} = [4,0,3,0]^T + s[-2,1,0,0]^T + t[-1,0,-2,1]^T$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Back-substitute: row 2 gives $x_3 = 3 + 2x_4$; row 1 gives $x_1 = 1 - 2x_2 + x_3 - 3x_4 = 4 - 2x_2 - x_4$. With $x_2 = s$, $x_4 = t$ the standard form is $[4,0,3,0]^T + s[-2,1,0,0]^T + t[-1,0,2,1]^T$, which is not listed **as such**.\nBut option (c) uses $[3,0,5,1]^T$, which is the solution with $s = 0$, $t = 1$, and the same direction vectors, so it describes **the same set**. Option (a) skips the back-substitution of $x_3$, (b) forgets to change signs, (d) has the wrong sign in the $x_3$ entry.",
  },
  {
    subtopic: "Span & pivots",
    kind: "mcq",
    prompt:
      "Let $B = \\begin{bmatrix} 1 & 2 & 0 & -1 \\\\ 2 & 3 & 1 & 0 \\\\ 0 & 1 & -1 & -2 \\\\ 1 & 1 & 0 & 2 \\end{bmatrix}$. How many rows of $B$ contain a pivot position, and does $B\\mathbf{x} = \\mathbf{y}$ have a solution for every $\\mathbf{y}\\in\\mathbb{R}^4$?",
    options: ["4; yes", "3; no", "3; yes", "2; no", NOTA],
    answer: 1,
    solution:
      "$R_2 - 2R_1 = [0\\ {-1}\\ 1\\ 2]$, $R_4 - R_1 = [0\\ {-1}\\ 0\\ 3]$. Then $R_3 + R_2' = [0\\ 0\\ 0\\ 0]$ and $R_4 - R_2' = [0\\ 0\\ {-1}\\ 1]$. After a swap the echelon form is\n$$\\begin{bmatrix} 1 & 2 & 0 & -1 \\\\ 0 & -1 & 1 & 2 \\\\ 0 & 0 & -1 & 1 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$\nso there are 3 pivots. Without a pivot in every row, the columns of $B$ do **not** span $\\mathbb{R}^4$ and some $\\mathbf{y}$ give an inconsistent system.",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times3$ matrix whose reduced row echelon form has exactly one zero row, and $\\mathbf{b}\\in\\mathbb{R}^3$ is such that $A\\mathbf{x} = \\mathbf{b}$ is consistent. Geometrically, the solution set of $A\\mathbf{x} = \\mathbf{b}$ is",
    options: [
      "a single point",
      "a line through the origin",
      "a plane",
      "a line, which passes through the origin if and only if $\\mathbf{b} = \\mathbf{0}$",
      "Cannot be determined",
    ],
    answer: 3,
    solution:
      "One zero row means rank 2, so exactly $3 - 2 = 1$ free variable: the solution set of $A\\mathbf{x} = \\mathbf{0}$ is a line through the origin, and the solution set of $A\\mathbf{x} = \\mathbf{b}$ is that line shifted by a particular solution $\\mathbf{p}$. It contains $\\mathbf{0}$ iff $A\\mathbf{0} = \\mathbf{b}$, i.e. iff $\\mathbf{b} = \\mathbf{0}$. Option (b) is only right when $\\mathbf{b} = \\mathbf{0}$.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "Let $a, b, c$ be real numbers. The set $\\{[1,1,1]^T,\\ [a,b,c]^T,\\ [a^2,b^2,c^2]^T\\}$ is linearly independent if and only if",
    options: [
      "$a$, $b$, $c$ are all nonzero",
      "$a$, $b$, $c$ are distinct",
      "$a + b + c \\ne 0$",
      "$abc \\ne 0$ and $a$, $b$, $c$ are distinct",
      NOTA,
    ],
    answer: 1,
    solution:
      "Use the vectors as columns (or rows; the determinant is the same): the Vandermonde determinant is\n$$\\det\\begin{bmatrix} 1 & a & a^2 \\\\ 1 & b & b^2 \\\\ 1 & c & c^2 \\end{bmatrix} = (b - a)(c - a)(c - b).$$\nIt is nonzero iff no two of $a, b, c$ coincide. Zero values are allowed: $a = 0, b = 1, c = 2$ gives independent vectors, so (d) adds an unnecessary condition.",
  },
  {
    subtopic: "Free variables",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 & -1 & 0 & 3 \\\\ 2 & 4 & 1 & 3 & 3 \\\\ -1 & -2 & t + 5 & 3 & -6 \\end{bmatrix}$. For which value of $t$ does $A\\mathbf{x} = \\mathbf{0}$ have exactly three free variables?",
    options: ["$t = 4$", "$t = 1$", "$t = -6$", "No value of $t$", NOTA],
    answer: 4,
    solution:
      "Three free variables among 5 unknowns means rank $2$.\n$R_2 - 2R_1 = [0\\ 0\\ 3\\ 3\\ {-3}]$, $\\ R_3 + R_1 = [0\\ 0\\ t + 4\\ 3\\ {-3}]$. Subtracting, $R_3 - R_2' = [0\\ 0\\ t + 1\\ 0\\ 0]$.\nThis row is zero iff $t = -1$: then rank $2$ and three free variables ($x_2, x_4, x_5$). For $t \\ne -1$ it gives a third pivot and only two free variables. Since $-1$ is not offered, the answer is **None of the above**. ($t = 4$ is what you get by matching the entry to $4$ without the $+5$.)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $3\\times3$ matrix such that $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}\\in\\mathbb{R}^3$. Then $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Some $\\mathbf{y}$ is unreachable, so $A$ does not have a pivot in every row: at most 2 pivots. For a $3\\times3$ matrix this leaves a column without a pivot, i.e. a free variable, so $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions. **True**.",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "$\\mathbf{p}$ and $\\mathbf{q}$ are two different solutions of $A\\mathbf{x} = \\mathbf{b}$, where $\\mathbf{b} \\ne \\mathbf{0}$. Which of the following must also be solutions of $A\\mathbf{x} = \\mathbf{b}$?\nI. $\\mathbf{p} + \\mathbf{q}$\nII. $\\mathbf{p} - \\mathbf{q}$\nIII. $2\\mathbf{p} - \\mathbf{q}$\nIV. $\\tfrac12(\\mathbf{p} + \\mathbf{q})$",
    options: ["I and II only", "II and III only", "II, III and IV only", "III and IV only", "All of the above"],
    answer: 3,
    solution:
      "$A(\\alpha\\mathbf{p} + \\beta\\mathbf{q}) = (\\alpha + \\beta)\\mathbf{b}$, which equals $\\mathbf{b}$ iff $\\alpha + \\beta = 1$ (as $\\mathbf{b} \\ne \\mathbf{0}$).\n- I: $1 + 1 = 2$ ✗ (gives $2\\mathbf{b}$).\n- II: $1 - 1 = 0$ ✗ (it solves $A\\mathbf{x} = \\mathbf{0}$ instead).\n- III: $2 - 1 = 1$ ✓.\n- IV: $\\tfrac12 + \\tfrac12 = 1$ ✓.",
  },
  {
    subtopic: "Span",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{a}_1 = [1, -1, 2]^T$, $\\mathbf{a}_2 = [2, 1, 1]^T$, $\\mathbf{a}_3 = [0, 3, -3]^T$, $W = \\operatorname{Span}\\{\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3\\}$ and $\\mathbf{b} = [5, 1, 4]^T$. Which statement is correct?",
    options: [
      "$\\mathbf{b}\\in W$, and $W$ is a plane through the origin (it contains infinitely many vectors)",
      "$\\mathbf{b}\\in W$, and $W$ contains exactly three vectors",
      "$\\mathbf{b}\\in W$, and $W = \\mathbb{R}^3$",
      "$\\mathbf{b}\\notin W$, and $W$ contains exactly three vectors",
      "$\\mathbf{b}\\notin W$, and $W = \\mathbb{R}^3$",
    ],
    answer: 0,
    solution:
      "Row reduce $[\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3 \\mid \\mathbf{b}] = \\left[\\begin{array}{ccc|c} 1 & 2 & 0 & 5 \\\\ -1 & 1 & 3 & 1 \\\\ 2 & 1 & -3 & 4 \\end{array}\\right]$: $R_2 + R_1 = [0\\ 3\\ 3 \\mid 6]$, $R_3 - 2R_1 = [0\\ {-3}\\ {-3} \\mid {-6}]$, so $R_3 + R_2 = [0\\ 0\\ 0 \\mid 0]$.\nConsistent, so $\\mathbf{b}\\in W$ (e.g. $\\mathbf{b} = \\mathbf{a}_1 + 2\\mathbf{a}_2$). Only 2 pivots: $\\mathbf{a}_3 = \\mathbf{a}_2 - 2\\mathbf{a}_1$ is redundant and $W$ is a plane through $\\mathbf{0}$, not $\\mathbb{R}^3$. A span of nonzero vectors always has infinitely many elements.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $3\\times3$ matrix such that $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}\\in\\mathbb{R}^3$. Then there is a vector $\\mathbf{z}\\in\\mathbb{R}^3$ for which $A\\mathbf{x} = \\mathbf{z}$ has exactly one solution.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "As $A$ is square and some $\\mathbf{y}$ is unreachable, $A$ has fewer than 3 pivots, so there is a free variable. Every **consistent** equation $A\\mathbf{x} = \\mathbf{z}$ (e.g. $\\mathbf{z} = \\mathbf{0}$) then has infinitely many solutions, and the others have none. No $\\mathbf{z}$ gives exactly one: **False**.",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $4\\times3$ matrix and suppose $A\\mathbf{x} = \\mathbf{b}$ is consistent. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "A consistent system has a unique solution iff $A$ has a pivot in every column (3 pivots). A $4\\times3$ matrix can have 3 pivots (e.g. the first three columns of $I_4$) or fewer (e.g. the zero matrix with $\\mathbf{b} = \\mathbf{0}$, which has infinitely many solutions). The rank is not given, so this **cannot be determined**.",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "Which of the following statements about linear independence is **false**?",
    options: [
      "Any set of vectors in $\\mathbb{R}^n$ that contains $\\mathbf{0}$ is linearly dependent.",
      "Any four vectors in $\\mathbb{R}^3$ are linearly dependent.",
      "The columns of $A$ are linearly independent if and only if $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
      "Two vectors are linearly dependent if and only if one of them is a scalar multiple of the other.",
      "If $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ is linearly dependent, then each $\\mathbf{v}_i$ is a linear combination of the other two.",
    ],
    answer: 4,
    solution:
      "Dependence only guarantees that **at least one** vector is a combination of the others. Take $\\mathbf{v}_1 = \\mathbf{e}_1$, $\\mathbf{v}_2 = 2\\mathbf{e}_1$, $\\mathbf{v}_3 = \\mathbf{e}_3$: dependent, but $\\mathbf{v}_3 \\notin \\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$. The other four are standard facts (for (d): if $c_1\\mathbf{u} + c_2\\mathbf{v} = \\mathbf{0}$ with, say, $c_1\\ne0$, then $\\mathbf{u} = -(c_2/c_1)\\mathbf{v}$).",
  },
];
