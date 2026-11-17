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
      "$r_2 \\leftarrow r_2 - 2r_1$: $[0\\ 1\\ 3 \\mid -1]$. $\\ r_3 \\leftarrow r_3 - r_1$: $[0\\ 1\\ a^2 - 6 \\mid a - 4]$. $\\ r_3 \\leftarrow r_3 - r_2$: $[0\\ 0\\ a^2 - 9 \\mid a - 3] = [0\\ 0\\ (a-3)(a+3) \\mid a - 3]$.\n- $a = 3$: zero row, $z$ free → infinitely many (I ✓). Only **one** free variable, so the solution set is a **line**, not a plane (IV ✗).\n- $a = -3$: $[0\\ 0\\ 0 \\mid -6]$ → no solution (II ✓).\n- $a = 0$: $a^2 - 9 = -9 \\ne 0$ → pivot in every column → exactly one (III ✓).",
    ref: "Tutorial 1 Q2; PYP AY22/23 S1 Q1(a)",
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
      "The coefficient matrix $\\begin{bmatrix}\\lambda & 4\\\\ 9 & \\lambda\\end{bmatrix}$ has $|A| = \\lambda^2 - 36$, so the solution is unique unless $\\lambda = \\pm6$ (Theorem 2.4 with Rule 8).\n- $\\lambda = 6$: $6x + 4y = 2$ and $9x + 6y = 3$. The second is $\\tfrac32\\times$ the first, so the system reduces to one line: infinitely many solutions.\n- $\\lambda = -6$: $-6x + 4y = 2$ and $9x - 6y = 3$. $r_2 \\leftarrow r_2 + \\tfrac32 r_1$ gives $0 = 3 + 3 = 6$: no solution.\nThe two special values behave differently, which is the trap in options (b) and (d).",
    ref: "PYP AY24/25 S2 Q5; Slides 3.1 Rule 8 (det p8)",
  },
  {
    subtopic: "RREF from a solution",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times4$ matrix. The system $A\\mathbf{x} = \\mathbf{b}$ can be transformed by elementary row operations to $R\\mathbf{x} = \\mathbf{d}$, where $R$ is the reduced row echelon form of $A$, and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is\n$$\\mathbf{x} = \\begin{bmatrix}2\\\\0\\\\-1\\\\0\\end{bmatrix} + s\\begin{bmatrix}-3\\\\1\\\\0\\\\0\\end{bmatrix} + t\\begin{bmatrix}4\\\\0\\\\2\\\\1\\end{bmatrix}, \\qquad s, t\\in\\mathbb{R}.$$\nThe augmented matrix $[R \\mid \\mathbf{d}]$ is",
    options: [
      "$\\left[\\begin{array}{cccc|c} 1 & -3 & 0 & 4 & 2 \\\\ 0 & 0 & 1 & 2 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      "$\\left[\\begin{array}{cccc|c} 1 & 3 & 0 & -4 & -2 \\\\ 0 & 0 & 1 & -2 & 1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      "$\\left[\\begin{array}{cccc|c} 1 & 0 & 3 & -4 & 2 \\\\ 0 & 1 & 0 & -2 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      "$\\left[\\begin{array}{cccc|c} 1 & 3 & 0 & -4 & 2 \\\\ 0 & 0 & 1 & -2 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$x_2 = s$ and $x_4 = t$ appear alone, so they are free; $x_1, x_3$ are leading. Reading the rows: $x_1 = 2 - 3x_2 + 4x_4$ and $x_3 = -1 + 2x_4$.\nMove the free variables to the left: $x_1 + 3x_2 - 4x_4 = 2$ and $x_3 - 2x_4 = -1$. These are the two nonzero rows of $[R \\mid \\mathbf{d}]$; 2 pivots in 3 rows leaves one zero row.\nCheck: $[2,0,-1,0]$ satisfies both rows, and each direction vector gives $0$ (e.g. $4 + 0 - 4 = 0$, $2 - 2 = 0$). Option (a) forgets to flip the signs, (b) negates the right-hand side, (c) puts the pivots in the wrong columns.",
    ref: "PYP AY21/22 S1 Q1(c); Tutorial 1 Q11",
  },
  {
    subtopic: "RREF from a solution",
    kind: "mcq",
    prompt:
      "The solution to the linear system $A\\mathbf{x} = \\mathbf{b}$, with $A$ a $3\\times3$ matrix, is $\\mathbf{x} = \\begin{bmatrix}3\\\\0\\\\0\\end{bmatrix} + c\\begin{bmatrix}-2\\\\1\\\\0\\end{bmatrix} + d\\begin{bmatrix}4\\\\0\\\\1\\end{bmatrix}$, where $c, d\\in\\mathbb{R}$. The reduced row echelon form of $A$ is",
    options: [
      "$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & -2 & 4 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 & -4 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$",
    ],
    answer: 4,
    solution:
      "Two parameters attached to $x_2 = c$ and $x_3 = d$: two free variables, so $A$ has $3 - 2 = 1$ pivot, in column 1. The first component reads $x_1 = 3 - 2x_2 + 4x_3$, i.e. $x_1 + 2x_2 - 4x_3 = 3$. So the RREF has the single nonzero row $[1\\ \\ 2\\ \\ {-4}]$ and two zero rows.\nOption (c) copies the direction entries without changing their sign; (a), (b), (d) have the wrong number of pivots (3, 2, 2).",
    ref: "Tutorial 1 Q11; PYP AY25/26 S1 Q8",
  },
  {
    subtopic: "Solution sets",
    kind: "mcq",
    prompt:
      "$A$ is a $4\\times4$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = [1,0,2,0]^T + s[2,1,0,0]^T + t[-1,0,3,1]^T$, $s,t\\in\\mathbb{R}$. Which of the following statements are correct?\nI. $A$ has exactly 2 pivot positions.\nII. $A\\mathbf{x} = \\mathbf{c}$ is consistent for every $\\mathbf{c}\\in\\mathbb{R}^4$.\nIII. $[2, 1, 5, 1]^T$ is a solution of $A\\mathbf{x} = \\mathbf{b}$.\nIV. $[0, 0, 1, 0]^T$ is a solution of $A\\mathbf{x} = \\mathbf{0}$.",
    options: ["I and II only", "III only", "I and III only", "I, III and IV only", "All of the above"],
    answer: 2,
    solution:
      "- I ✓: two parameters means two free variables, so $4 - 2 = 2$ pivots.\n- II ✗: 2 pivots for 4 rows, so $A$ lacks a pivot in two rows and by Theorem 1.2 some $\\mathbf{c}$ give an inconsistent system.\n- III ✓: $s = t = 1$ gives $[1+2-1,\\ 0+1+0,\\ 2+0+3,\\ 0+0+1] = [2,1,5,1]$.\n- IV ✗: solutions of $A\\mathbf{x} = \\mathbf{0}$ are $s[2,1,0,0]^T + t[-1,0,3,1]^T$; matching the 4th entry forces $t = 0$ and the 2nd forces $s = 0$, giving $\\mathbf{0} \\ne [0,0,1,0]^T$.",
    ref: "PYP AY21/22 S1 Q1(c); PYP AY24/25 S2 Q8; Slides 2.2 Theorem 1.2 (alg p11)",
  },
  {
    subtopic: "Homogeneous systems",
    kind: "mcq",
    prompt:
      "Find all values of $k$ for which the system\n$$\\begin{aligned} x + 2y + kz &= 0 \\\\ 2x + ky + 2z &= 0 \\\\ x + y + z &= 0 \\end{aligned}$$\nhas a non-trivial solution.",
    options: ["$k \\in \\{1, 2\\}$", "$k = 2$ only", "$k \\in \\{-1, -2\\}$", "$k \\notin \\{1, 2\\}$", NOTA],
    answer: 0,
    solution:
      "Put $x + y + z = 0$ first: rows $[1\\ 1\\ 1]$, $[1\\ 2\\ k]$, $[2\\ k\\ 2]$.\n$r_2 \\leftarrow r_2 - r_1$: $[0\\ 1\\ \\ k-1]$. $\\ r_3 \\leftarrow r_3 - 2r_1$: $[0\\ \\ k-2\\ \\ 0]$. $\\ r_3 \\leftarrow r_3 - (k-2)r_2$: $[0\\ \\ 0\\ \\ -(k-2)(k-1)]$.\nThe third pivot vanishes iff $k = 1$ or $k = 2$; then $z$ is free and there is a nontrivial solution. (Check: at $k = 1$, $[1, 0, -1]^T$ works; at $k = 2$ the second equation is twice the third.) Option (d) describes exactly when only the trivial solution exists.",
    ref: "Tutorial 1 Q1",
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
      "Columns: $\\begin{bmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{bmatrix}$. Swap $r_1 \\leftrightarrow r_2$ to avoid dividing by $x$: $[1\\ x\\ 1]$, $[x\\ 1\\ 0]$, $[0\\ 1\\ x]$.\n$r_2 \\leftarrow r_2 - x\\,r_1$: $[0\\ \\ 1 - x^2\\ \\ -x]$. Swap $r_2 \\leftrightarrow r_3$: $[0\\ 1\\ x]$ on top, then $r_3 \\leftarrow r_3 - (1 - x^2)r_2$: $[0\\ \\ 0\\ \\ -x - x(1 - x^2)] = [0\\ 0\\ x(x^2 - 2)]$.\nA pivot in every column iff $x(x^2 - 2) \\ne 0$, i.e. $x \\ne 0, \\pm\\sqrt2$. (At $x = 0$ the first and third vectors are both $[0,1,0]$.)",
    ref: "PYP AY25/26 S1 Q9",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "The set of all real $x$ for which $\\left\\{ \\begin{bmatrix}1\\\\x\\\\0\\end{bmatrix}, \\begin{bmatrix}0\\\\x\\\\1\\end{bmatrix}, \\begin{bmatrix}0\\\\4\\\\x\\end{bmatrix} \\right\\}$ is linearly independent is",
    options: [
      "$\\{x\\in\\mathbb{R} : x \\ne 2\\}$",
      "$\\{x\\in\\mathbb{R} : x \\ne 0\\}$",
      "$\\{x\\in\\mathbb{R} : x \\ne \\pm2\\}$",
      "$\\{x\\in\\mathbb{R} : x \\ne 0,\\ x \\ne \\pm2\\}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Columns: $\\begin{bmatrix} 1 & 0 & 0 \\\\ x & x & 4 \\\\ 0 & 1 & x \\end{bmatrix}$. $r_2 \\leftarrow r_2 - x\\,r_1$: $[0\\ x\\ 4]$. Swap $r_2 \\leftrightarrow r_3$: $[0\\ 1\\ x]$, $[0\\ x\\ 4]$; then $r_3 \\leftarrow r_3 - x\\,r_2$: $[0\\ 0\\ 4 - x^2]$.\nA pivot in every column iff $x^2 \\ne 4$, i.e. $x \\ne \\pm2$. Check: at $x = 2$ the third vector $[0,4,2]$ is $2\\times[0,2,1]$; at $x = -2$, $[0,4,-2] = -2\\times[0,-2,1]$. $x = 0$ is fine (the vectors are $\\mathbf{e}_1$, $\\mathbf{e}_3$, $4\\mathbf{e}_2$).",
    ref: "PYP AY25/26 S1 Q9",
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
      "Row reduce $\\left[\\begin{array}{cc|c} 1 & -2 & 3 \\\\ 2 & -3 & h \\\\ -1 & 4 & -7 \\end{array}\\right]$: $r_2 - 2r_1 = [0\\ 1 \\mid h - 6]$, $r_3 + r_1 = [0\\ 2 \\mid -4]$, then $r_3 - 2r_2 = [0\\ 0 \\mid -4 - 2(h-6)] = [0\\ 0 \\mid 8 - 2h]$.\nConsistent iff $h = 4$. Then $x_2 = h - 6 = -2$ and $x_1 = 3 + 2x_2 = -1$: $\\mathbf{b} = -\\mathbf{a}_1 - 2\\mathbf{a}_2 = [-1+4,\\ -2+6,\\ 1-8] = [3, 4, -7]$ ✓. Two vectors span only a plane, so (d) is impossible.",
    ref: "PYP AY22/23 S1 Q1(b); Tutorial 1 Q3",
  },
  {
    subtopic: "Consistency",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & -2 & 3 \\\\ 2 & -3 & 8 \\\\ -1 & 0 & -7 \\end{bmatrix}$ and $\\mathbf{b} = [2, 5, p]^T$. For which $p$ is $A\\mathbf{x} = \\mathbf{b}$ consistent, and how many solutions does it then have?",
    options: ["$p = 16$; exactly one", "$p = -4$; exactly one", "$p = 4$; infinitely many", "$p = -4$; infinitely many", NOTA],
    answer: 3,
    solution:
      "$r_2 \\leftarrow r_2 - 2r_1$: $[0\\ 1\\ 2 \\mid 1]$. $\\ r_3 \\leftarrow r_3 + r_1$: $[0\\ {-2}\\ {-4} \\mid p + 2]$. $\\ r_3 \\leftarrow r_3 + 2r_2$: $[0\\ 0\\ 0 \\mid p + 4]$.\nConsistent iff $p = -4$. Then $x_3$ is free: **infinitely many** solutions. $p = 16$ comes from a sign slip.",
    ref: "PYP (written papers): $p$ for which $A\\mathbf{x} = [3, 9, p]^T$ is consistent",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt:
      "Which of the following statements are correct?\nI. The columns of any $3\\times5$ matrix are linearly dependent.\nII. If $A$ is $5\\times3$ with 3 pivot positions, then $A\\mathbf{x} = \\mathbf{b}$ has at most one solution for each $\\mathbf{b}$.\nIII. If $A\\mathbf{x} = \\mathbf{b}$ is consistent for some $\\mathbf{b}$, then it is consistent for every $\\mathbf{b}$.\nIV. If $A$ is $4\\times4$ and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^4$.",
    options: ["I, II and IV only", "I and II only", "II and IV only", "I, III and IV only", "All of the above"],
    answer: 0,
    solution:
      "- I ✓: at most 3 pivots for 5 columns, so a free variable exists.\n- II ✓: a pivot in every column means no free variables; a consistent system has exactly one solution (some $\\mathbf{b}$ may give none).\n- III ✗: $A\\mathbf{x} = \\mathbf{0}$ is always consistent, but e.g. $A = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ cannot reach $[0,1]^T$.\n- IV ✓: by Theorem 2.4, only the trivial solution means 4 pivots, a pivot in every column **and** every row.",
    ref: "PYP (written papers): columns of every $3\\times5$ matrix are dependent; Slides 2.2 Theorems 1.2, 2.4 (alg p10–11)",
  },
  {
    subtopic: "Independence of combinations",
    kind: "mcq",
    prompt:
      "Let $\\{\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\}$ be a linearly independent set in $\\mathbb{R}^n$. Which of the following sets are linearly independent?\nI. $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{u}-\\mathbf{v}\\}$\nII. $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{v}+\\mathbf{w},\\ \\mathbf{w}+\\mathbf{u}\\}$\nIII. $\\{\\mathbf{u}-\\mathbf{v},\\ \\mathbf{v}-\\mathbf{w},\\ \\mathbf{w}-\\mathbf{u}\\}$\nIV. $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{u}-\\mathbf{v},\\ \\mathbf{u}-2\\mathbf{v}+\\mathbf{w}\\}$",
    options: ["I and II only", "I and IV only", "II, III and IV only", "I, II and IV only", "All of the above"],
    answer: 3,
    solution:
      "For each set, set a combination equal to $\\mathbf{0}$, collect the coefficients of $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}$, and use their independence to set each coefficient to $0$.\n- I: $(c_1+c_2)\\mathbf{u} + (c_1-c_2)\\mathbf{v} = \\mathbf{0}$ ⇒ $c_1 + c_2 = 0$, $c_1 - c_2 = 0$ ⇒ $c_1 = c_2 = 0$ ✓.\n- II: $(c_1+c_3)\\mathbf{u} + (c_1+c_2)\\mathbf{v} + (c_2+c_3)\\mathbf{w} = \\mathbf{0}$ ⇒ $c_1 = -c_3$, $c_2 = -c_1 = c_3$, $c_2 + c_3 = 2c_3 = 0$ ⇒ all zero ✓.\n- III: $(\\mathbf{u}-\\mathbf{v}) + (\\mathbf{v}-\\mathbf{w}) + (\\mathbf{w}-\\mathbf{u}) = \\mathbf{0}$ with weights $1, 1, 1$: dependent ✗.\n- IV: $(c_1+c_2+c_3)\\mathbf{u} + (c_1-c_2-2c_3)\\mathbf{v} + c_3\\mathbf{w} = \\mathbf{0}$ ⇒ $c_3 = 0$, then $c_1 + c_2 = 0$, $c_1 - c_2 = 0$ ⇒ all zero ✓.",
    ref: "PYP (written papers): are $\\mathbf{u}+\\mathbf{v}$, $\\mathbf{u}-\\mathbf{v}$, $\\mathbf{u}-2\\mathbf{v}+\\mathbf{w}$ independent?; Slides 4.7 definition (vsp p29)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $5\\times4$ matrix such that $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}\\in\\mathbb{R}^5$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Only the trivial solution means a pivot in each of the 4 columns, so solutions are unique **when they exist**. But 4 pivots cannot fill 5 rows, so by Theorem 1.2 $A\\mathbf{x} = \\mathbf{b}$ is inconsistent for some $\\mathbf{b}$: **False**.",
    ref: "Slides 2.2 Theorem 1.2 (alg p11); Tutorial 1 Q12",
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
      "Substitute $(2, -1, 3)$:\n- $2a + 1 + 6 = 13 \\Rightarrow a = 3$;\n- $6 - b - 3 = -5 \\Rightarrow b = 8$;\n- $2 - 4 + 3c = 4 \\Rightarrow c = 2$.\nWith these values, row reduce the coefficient matrix with $x + 4y + 2z$ first: rows $[1\\ 4\\ 2]$, $[3\\ 8\\ {-1}]$, $[3\\ {-1}\\ 2]$. $r_2 - 3r_1 = [0\\ {-4}\\ {-7}]$, $r_3 - 3r_1 = [0\\ {-13}\\ {-4}]$, then $r_3 - \\tfrac{13}{4}r_2 = [0\\ 0\\ \\tfrac{75}{4}]$. Three nonzero pivots: the solution $(2,-1,3)$ is the **only** one.\nThe correct combination \"$(3, 8, 2)$, exactly one solution\" is not offered: **None of the above**.",
    ref: "PYP AY21/22 S1 Q1(a)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "mcq",
    prompt: "Which of the following statements about linear systems is **false**?",
    options: [
      "A linear system with more unknowns than equations always has infinitely many solutions.",
      "A homogeneous system with more unknowns than equations has a nontrivial solution.",
      "If two augmented matrices are row equivalent, the corresponding systems have the same solution set.",
      "If $A$ is $3\\times3$ and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, then $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
      "A consistent linear system with at least one free variable has infinitely many solutions.",
    ],
    answer: 0,
    solution:
      "More unknowns than equations guarantees a free variable, but that only gives infinitely many solutions **if the system is consistent**. $x + y + z = 1$, $x + y + z = 2$ has 3 unknowns, 2 equations and no solution. (b) is true because a homogeneous system is consistent and has a free variable; (c) holds because row operations can be undone; (d) is Theorem 2.4 (4) ⇒ (6); (e) holds because each value of the free variable gives a solution.",
    ref: "Tutorial 1 Q12; Slides 2.2 Theorem 2.4 (alg p10); Slides 2.2 elementary row operations (alg p7–8)",
  },
  {
    subtopic: "General solution",
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
      "Back-substitute: row 2 gives $x_3 = 3 + 2x_4$; row 1 gives $x_1 = 1 - 2x_2 + x_3 - 3x_4 = 4 - 2x_2 - x_4$. With $x_2 = s$, $x_4 = t$ the usual form is $[4,0,3,0]^T + s[-2,1,0,0]^T + t[-1,0,2,1]^T$, which is not listed **as such**.\nBut option (c) uses $[3,0,5,1]^T$, which is the solution with $s = 0$, $t = 1$, and the same direction vectors, so it describes **the same set**. Option (a) skips the back-substitution of $x_3$, (b) forgets to change signs, (d) has the wrong sign in the $x_3$ entry.",
    ref: "Additional practice problems (general solution); PYP AY21/22 S1 Q1(c)",
  },
  {
    subtopic: "Span & pivots",
    kind: "mcq",
    prompt:
      "Let $B = \\begin{bmatrix} 1 & 2 & 0 & -1 \\\\ 2 & 3 & 1 & 0 \\\\ 0 & 1 & -1 & -2 \\\\ 1 & 1 & 0 & 2 \\end{bmatrix}$. How many rows of $B$ contain a pivot position, and does $B\\mathbf{x} = \\mathbf{y}$ have a solution for every $\\mathbf{y}\\in\\mathbb{R}^4$?",
    options: ["4; yes", "3; no", "3; yes", "2; no", NOTA],
    answer: 1,
    solution:
      "$r_2 - 2r_1 = [0\\ {-1}\\ 1\\ 2]$, $r_4 - r_1 = [0\\ {-1}\\ 0\\ 3]$. Then $r_3 + r_2 = [0\\ 0\\ 0\\ 0]$ and $r_4 - r_2 = [0\\ 0\\ {-1}\\ 1]$. After a swap the echelon form is\n$$\\begin{bmatrix} 1 & 2 & 0 & -1 \\\\ 0 & -1 & 1 & 2 \\\\ 0 & 0 & -1 & 1 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$$\nso 3 rows contain a pivot. Without a pivot in every row, by Theorem 1.2 the columns of $B$ do **not** span $\\mathbb{R}^4$ and some $\\mathbf{y}$ give an inconsistent system.",
    ref: "Tutorial 1 Q5; Slides 2.2 Theorem 1.2 (alg p11)",
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
      "One zero row means 2 pivots, so exactly $3 - 2 = 1$ free variable: the complete solution is $\\mathbf{p} + t\\mathbf{v}$, a line. It contains $\\mathbf{0}$ iff $\\mathbf{x} = \\mathbf{0}$ is a solution, i.e. iff $A\\mathbf{0} = \\mathbf{b}$, i.e. iff $\\mathbf{b} = \\mathbf{0}$. Option (b) is only right when $\\mathbf{b} = \\mathbf{0}$.",
    ref: "PYP AY25/26 S2 Q10; Tutorial 1 Q6",
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
      "Columns: $\\begin{bmatrix} 1 & a & a^2 \\\\ 1 & b & b^2 \\\\ 1 & c & c^2 \\end{bmatrix}$. $r_2 - r_1 = [0\\ \\ b-a\\ \\ b^2-a^2]$, $r_3 - r_1 = [0\\ \\ c-a\\ \\ c^2-a^2]$.\nIf $a = b$ (or $a = c$, or $b = c$) two of the rows are equal and there are at most 2 pivots: dependent. If $a, b, c$ are distinct, $b - a \\ne 0$ is a pivot and $r_3 \\leftarrow r_3 - \\tfrac{c-a}{b-a}r_2$ leaves $(c^2 - a^2) - (c-a)(b+a) = (c-a)(c-b) \\ne 0$, a third pivot: independent.\nZero values are allowed: $a = 0, b = 1, c = 2$ gives independent vectors, so (d) adds an unnecessary condition.",
    ref: "PYP AY2021-S2 Q1(c)",
  },
  {
    subtopic: "Free variables",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 & -1 & 0 & 3 \\\\ 2 & 4 & 1 & 3 & 3 \\\\ -1 & -2 & t + 5 & 3 & -6 \\end{bmatrix}$. For which value of $t$ does $A\\mathbf{x} = \\mathbf{0}$ have exactly three free variables?",
    options: ["$t = 4$", "$t = 1$", "$t = -6$", "No value of $t$", NOTA],
    answer: 4,
    solution:
      "Three free variables among 5 unknowns means exactly $5 - 3 = 2$ pivots.\n$r_2 - 2r_1 = [0\\ 0\\ 3\\ 3\\ {-3}]$, $\\ r_3 + r_1 = [0\\ 0\\ t + 4\\ 3\\ {-3}]$. Subtracting, $r_3 - r_2 = [0\\ 0\\ t + 1\\ 0\\ 0]$.\nThis row is zero iff $t = -1$: then 2 pivots and three free variables ($x_2, x_4, x_5$). For $t \\ne -1$ it gives a third pivot and only two free variables. Since $-1$ is not offered, the answer is **None of the above**. ($t = 4$ is what you get by matching the entry to $4$ without the $+5$.)",
    ref: "PYP (written papers): find $t$ so that $A\\mathbf{x} = \\mathbf{0}$ has 3 free variables",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $3\\times3$ matrix such that $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}\\in\\mathbb{R}^3$. Then $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Some $\\mathbf{y}$ is unreachable, so $A$ does not have a pivot in every row: at most 2 pivots. For a $3\\times3$ matrix this leaves a column without a pivot, i.e. a free variable, so $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions. **True**.",
    ref: "Tutorial 1 Q7; Slides 2.2 Theorem 2.4 (alg p10)",
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
      "Row reduce $[\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3 \\mid \\mathbf{b}] = \\left[\\begin{array}{ccc|c} 1 & 2 & 0 & 5 \\\\ -1 & 1 & 3 & 1 \\\\ 2 & 1 & -3 & 4 \\end{array}\\right]$: $r_2 + r_1 = [0\\ 3\\ 3 \\mid 6]$, $r_3 - 2r_1 = [0\\ {-3}\\ {-3} \\mid {-6}]$, so $r_3 + r_2 = [0\\ 0\\ 0 \\mid 0]$.\nConsistent, so $\\mathbf{b}\\in W$ (e.g. $\\mathbf{b} = \\mathbf{a}_1 + 2\\mathbf{a}_2$). Only 2 pivots, so the columns do not span $\\mathbb{R}^3$ (Theorem 1.2); $\\mathbf{a}_3 = \\mathbf{a}_2 - 2\\mathbf{a}_1$ adds nothing, and $W = \\operatorname{Span}\\{\\mathbf{a}_1, \\mathbf{a}_2\\}$ is a plane through $\\mathbf{0}$, with infinitely many vectors.",
    ref: "Tutorial 1 Q3; PYP AY21/22 S1 Q1(b)",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $3\\times3$ matrix such that $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}\\in\\mathbb{R}^3$. Then there is a vector $\\mathbf{z}\\in\\mathbb{R}^3$ for which $A\\mathbf{x} = \\mathbf{z}$ has exactly one solution.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "As $A$ is square and some $\\mathbf{y}$ is unreachable, $A$ has fewer than 3 pivots, so there is a free variable. Every **consistent** equation $A\\mathbf{x} = \\mathbf{z}$ (e.g. $\\mathbf{z} = \\mathbf{0}$) then has infinitely many solutions, and the others have none. No $\\mathbf{z}$ gives exactly one: **False**.",
    ref: "Tutorial 1 Q7",
  },
  {
    subtopic: "Existence & uniqueness",
    kind: "tfn",
    prompt: "Let $A$ be a $4\\times3$ matrix and suppose $A\\mathbf{x} = \\mathbf{b}$ is consistent. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "A consistent system has exactly one solution iff $A$ has a pivot in every column (3 pivots). A $4\\times3$ matrix can have 3 pivots (e.g. the first three columns of $I_4$) or fewer (e.g. the zero matrix with $\\mathbf{b} = \\mathbf{0}$, which has infinitely many solutions). The pivots are not given, so this **cannot be determined**.",
    ref: "Tutorial 1 Q12",
  },
  {
    subtopic: "Linear independence",
    kind: "mcq",
    prompt: "Which of the following statements about linear independence is **false**?",
    options: [
      "Any set of vectors in $\\mathbb{R}^n$ that contains $\\mathbf{0}$ is linearly dependent.",
      "Any four vectors in $\\mathbb{R}^3$ are linearly dependent.",
      "The columns of $A$ are linearly independent if and only if $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
      "Two vectors are linearly dependent if and only if one of them is a multiple of the other.",
      "If $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ is linearly dependent, then each $\\mathbf{v}_i$ is a linear combination of the other two.",
    ],
    answer: 4,
    solution:
      "Dependence only guarantees that **some** vector is a combination of the vectors before it (Theorem 4.4). Take $\\mathbf{v}_1 = \\mathbf{e}_1$, $\\mathbf{v}_2 = 2\\mathbf{e}_1$, $\\mathbf{v}_3 = \\mathbf{e}_3$: dependent, but $\\mathbf{v}_3 \\notin \\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$. The other four are facts from the notes: (a), (d) slide 4.7 p30; (b) at most 3 pivots for 4 columns; (c) the definition of independence applied to the columns.",
    ref: "Slides 4.7 (vsp p29–30); Additional practice problems Q.19",
  },
];
