import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const vectorSpacesConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (16)
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "The set $H = \\{(x_1, x_2, x_3) : x_1 + x_2 + x_3 \\ge 0\\}$ is a subspace of $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    ref: "Slides 4.2 Subspaces (vsp p12); Additional practice problems (S1 = {x1 + x2 + x3 ≥ 0})",
    solution:
      "$H$ contains $\\mathbf{0}$ and is closed under addition (two non-negative sums add to a non-negative sum), but it is **not** closed under scalar multiplication: $(1,0,0)\\in H$ while $(-1)(1,0,0) = (-1,0,0)\\notin H$. One failed condition is enough, so **False**.",
  },
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "The union of the $x$-axis, the $y$-axis and the lines $y = x$ and $y = -x$ is a subspace of $\\mathbb{R}^2$.",
    options: TFN_OPTIONS,
    answer: 1,
    ref: "Slides 4.2 Subspaces (vsp p12); older PYP T/F (union of the axes and the lines y = ±x)",
    solution:
      "It contains $\\mathbf{0}$ and every scalar multiple stays on the same line, but addition fails: $(1,0) + (1,1) = (2,1)$ lies on none of the four lines. A union of lines through the origin is not closed under addition, so **False**.",
  },
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "If $H$ and $K$ are subspaces of a vector space $V$, then $H \\cap K$ is a subspace of $V$.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Tutorial 4 Q3",
    solution:
      "$\\mathbf{0}$ is in both, so in $H\\cap K$. If $\\mathbf{u},\\mathbf{v}\\in H\\cap K$ then $\\mathbf{u}+\\mathbf{v}$ and $c\\mathbf{u}$ are in $H$ (it is a subspace) and in $K$ (same reason), hence in $H\\cap K$. **True**.",
  },
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "$H$ and $K$ are subspaces of $\\mathbb{R}^3$. Then $H \\cup K$ is a subspace of $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 2,
    ref: "Slides 4.2 Subspaces (vsp p12); Tutorial 4 Q3; PYP AY25/26 S2 Q7",
    solution:
      "It depends on $H$ and $K$. If $H \\subseteq K$ (e.g. $H = K$), then $H\\cup K = K$ is a subspace. If $H$ is the $x$-axis and $K$ the $y$-axis, then $(1,0,0)+(0,1,0) = (1,1,0)\\notin H\\cup K$, so it is not. Since nothing more is given, **Not enough information**.",
  },
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "The set of all invertible $2\\times 2$ matrices is a subspace of $M_{2\\times2}$.",
    options: TFN_OPTIONS,
    answer: 1,
    ref: "Slides 4.2 Subspaces (vsp p12); Tutorial 4 Q1 (matrix spaces)",
    solution:
      "The zero matrix is not invertible, so the set does not contain the zero vector of $M_{2\\times2}$. (It is not closed under addition either: $I + (-I) = 0$.) **False**.",
  },
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "The set of polynomials in $\\mathbb{P}_3$ of degree **exactly** 3 is a subspace of $\\mathbb{P}_3$.",
    options: TFN_OPTIONS,
    answer: 1,
    ref: "Slides 4.1 (vsp p8, Pₙ = degree up to n); Slides 4.2 (vsp p12)",
    solution:
      "The zero polynomial does not have degree 3, so it is missing. Also $(t^3 + t) + (-t^3) = t$ has degree 1, so the set is not closed under addition. **False**. (The set of polynomials of degree **at most** 3 is $\\mathbb{P}_3$ itself.)",
  },
  {
    subtopic: "Row reduction & the four subspaces",
    kind: "tfn",
    prompt: "If $A$ and $B$ are row equivalent matrices, then $C(A) = C(B)$.",
    options: TFN_OPTIONS,
    answer: 1,
    ref: "Slides 4.9 (vsp p41); older PYP T/F (row equivalent ⇒ same column space: F)",
    solution:
      "Row operations mix the entries inside each column, so the column space can change. Example: $\\begin{bmatrix}1\\\\1\\end{bmatrix} \\sim \\begin{bmatrix}1\\\\0\\end{bmatrix}$, but the first spans the line $y = x$ and the second the $x$-axis. Row equivalent matrices share the **row space** and the **null space**, not the column space. **False**.",
  },
  {
    subtopic: "Row reduction & the four subspaces",
    kind: "tfn",
    prompt: "If $A$ and $B$ are row equivalent matrices, then $N(A) = N(B)$.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Slides 4.9 (vsp p41: Ax = 0 and Bx = 0 have the same solutions)",
    solution:
      "Row operations do not change the solution set of a homogeneous system, so $A\\mathbf{x} = \\mathbf{0}$ and $B\\mathbf{x} = \\mathbf{0}$ have exactly the same solutions. **True**.",
  },
  {
    subtopic: "Rank theorem",
    kind: "tfn",
    prompt: "$A$ is an $8\\times10$ matrix with $\\dim N(A) = 3$. Then $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^8$.",
    options: TFN_OPTIONS,
    answer: 1,
    ref: "Slides 4.14 Theorem 4.8 (vsp p64–65); older PYP T/F (8×10 with null space dim 3)",
    solution:
      "Rank Theorem: $\\operatorname{rank}A = 10 - 3 = 7$. So $C(A)$ is a 7-dimensional subspace of $\\mathbb{R}^8$, not all of $\\mathbb{R}^8$, and some $\\mathbf{b}$ give an inconsistent system. **False**.",
  },
  {
    subtopic: "Rank theorem",
    kind: "tfn",
    prompt: "$A$ is a $3\\times5$ matrix whose echelon form has 3 pivots. Then $C(A) = \\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Slides 4.5 (vsp p24, p26); older PYP T/F (3×4 with 3 pivots spans R³)",
    solution:
      "3 pivots in 3 rows means a pivot in every row, so $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^3$. Equivalently $\\dim C(A) = 3$ and $C(A)\\subseteq\\mathbb{R}^3$, so $C(A) = \\mathbb{R}^3$. **True**.",
  },
  {
    subtopic: "Rank theorem",
    kind: "tfn",
    prompt: "$A$ is a $5\\times7$ matrix. Then $\\dim N(A) = 2$.",
    options: TFN_OPTIONS,
    answer: 2,
    ref: "Slides 4.14 Theorem 4.8 (vsp p64)",
    solution:
      "$\\dim N(A) = 7 - \\operatorname{rank}A$ and the rank can be anything from $0$ to $5$, so $\\dim N(A)$ is between $2$ and $7$. It equals 2 only if $\\operatorname{rank}A = 5$, which is not given. **Not enough information**. (What we do know is $\\dim N(A) \\ge 2$.)",
  },
  {
    subtopic: "Null space & column space",
    kind: "tfn",
    prompt: "$A$ is $m\\times n$ and $B$ is $n\\times p$ with $AB = 0$. Then $C(B)\\subseteq N(A)$.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Older PYP fill-in (AB = 0 ⇒ C(B) ⊆ N(A)); Slides 4.4 Theorem 4.2 (vsp p20)",
    solution:
      "Column $j$ of $AB$ is $A\\mathbf{b}_j$, and $AB = 0$ means $A\\mathbf{b}_j = \\mathbf{0}$ for every column $\\mathbf{b}_j$ of $B$. So every column of $B$ is in $N(A)$, and since $N(A)$ is a subspace, so is every combination of them: $C(B)\\subseteq N(A)$. **True**.",
  },
  {
    subtopic: "Rank",
    kind: "tfn",
    prompt: "For nonzero $\\mathbf{u}\\in\\mathbb{R}^m$ and $\\mathbf{v}\\in\\mathbb{R}^n$, the $m\\times n$ matrix $\\mathbf{u}\\mathbf{v}^T$ has rank 1.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Older PYP fill-in (rank of uvᵀ = 1); Slides 4.14 (vsp p62)",
    solution:
      "Column $j$ of $\\mathbf{u}\\mathbf{v}^T$ is $v_j\\mathbf{u}$, so every column is a multiple of $\\mathbf{u}$ and at least one is nonzero (some $v_j \\ne 0$). Thus $C(\\mathbf{u}\\mathbf{v}^T) = \\operatorname{Span}\\{\\mathbf{u}\\}$ has dimension 1. **True**.",
  },
  {
    subtopic: "Bases & dimension",
    kind: "tfn",
    prompt: "Vectors $\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3 \\in \\mathbb{R}^4$ satisfy $\\mathbf{v}_3 = 2\\mathbf{v}_1 - \\mathbf{v}_2$. Then $\\dim\\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\} = 2$.",
    options: TFN_OPTIONS,
    answer: 2,
    ref: "Slides 4.8 Spanning Set Theorem 4.5 (vsp p37); Slides 4.11 (vsp p50)",
    solution:
      "The relation only says $\\mathbf{v}_3$ is redundant, so the span equals $\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$. Its dimension is 2 if $\\mathbf{v}_1, \\mathbf{v}_2$ are independent, but 1 if they are parallel (e.g. $\\mathbf{v}_2 = \\mathbf{v}_1 \\ne \\mathbf{0}$), or even 0. **Not enough information**.",
  },
  {
    subtopic: "Bases & dimension",
    kind: "tfn",
    prompt: "If $\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3$ span $\\mathbb{R}^3$, then $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ is a basis for $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Slides 4.7 (vsp p32–33); Theorem 2.4 (vsp p67); Theorem 4.9 (vsp p66)",
    solution:
      "Let $A = [\\,\\mathbf{v}_1\\ \\mathbf{v}_2\\ \\mathbf{v}_3\\,]$, a $3\\times3$ matrix. Its columns span $\\mathbb{R}^3$, so by the Invertible Matrix Theorem (Theorem 2.4: statement 7 $\\iff$ statement 5) its columns are also linearly independent. Independent and spanning: a basis (Theorem 4.9, statement 11). **True**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is a $4\\times4$ matrix with $N(A) = \\{\\mathbf{0}\\}$. Then the columns of $A$ form a basis of $\\mathbb{R}^4$.",
    options: TFN_OPTIONS,
    answer: 0,
    ref: "Slides 4.14 Theorem 4.9 (vsp p66)",
    solution:
      "By Theorem 4.9 (Invertible Matrix Theorem continued), for a $4\\times4$ matrix $N(A) = \\{\\mathbf{0}\\}$ (statement 15) is equivalent to \"the columns of $A$ form a basis for $\\mathbb{R}^4$\" (statement 11). Also by the Rank Theorem, rank of $A = 4 - 0 = 4$. **True**.",
  },

  // ---------------------------------------------------------------- MCQ
  {
    subtopic: "Subspaces",
    kind: "mcq",
    prompt: "Which of the following is a subspace of $\\mathbb{R}^3$?",
    options: [
      "$\\{(x,y,z) : x + y + z = 1\\}$",
      "$\\{(x,y,z) : xyz = 0\\}$",
      "$\\{(x,y,z) : x = 2y = 3z\\}$",
      "$\\{(x,y,z) : x^2 + y^2 + z^2 \\le 1\\}$",
      NOTA,
    ],
    answer: 2,
    ref: "Slides 4.2 (vsp p12); Slides 4.3 Theorem 4.1 (vsp p15); Additional practice problems (ball)",
    solution:
      "$x = 2y = 3z$ means $(x,y,z) = t(6,3,2)$: a line through the origin, i.e. $\\operatorname{Span}\\{(6,3,2)\\}$, so it is a subspace.\n- $x + y + z = 1$ misses $\\mathbf{0}$.\n- $xyz = 0$ is a union of three coordinate planes: $(1,1,0) + (0,0,1) = (1,1,1)$ leaves it.\n- The unit ball is not closed under scaling: $2(1,0,0)$ leaves it.",
  },
  {
    subtopic: "Subspaces",
    kind: "mcq",
    prompt: "Which of the following subsets of $M_{2\\times2}$ is **not** a subspace of $M_{2\\times2}$?",
    options: [
      "The matrices with determinant $0$",
      "The matrices whose first row is zero",
      "The upper triangular matrices",
      "The symmetric matrices",
      NOTA,
    ],
    answer: 0,
    ref: "Slides 4.2 (vsp p12); Tutorial 4 Q1",
    solution:
      "$\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ and $\\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$ both have determinant $0$, but their sum $I$ has determinant $1$. So the matrices with determinant $0$ are not closed under addition. The other three pass the three-part test: each contains the zero matrix, and the conditions $A^T = A$, $a_{11} = a_{12} = 0$, $a_{21} = 0$ survive addition and scalar multiplication (e.g. $(A + B)^T = A^T + B^T = A + B$, as in Tutorial 4 Q1).",
  },
  {
    subtopic: "Subspaces",
    kind: "mcq",
    prompt: "Which of the following subsets of $\\mathbb{P}_3$ is **not** a subspace?",
    options: [
      "$\\{\\mathbf{p} : \\mathbf{p}(0) = 0\\}$",
      "$\\{\\mathbf{p} : \\mathbf{p}(1) = \\mathbf{p}(2)\\}$",
      "$\\{\\mathbf{p} : \\mathbf{p}'(1) = 0\\}$",
      "$\\{\\mathbf{p} : \\mathbf{p}(t) = \\mathbf{p}(-t) \\text{ for all } t\\}$",
      NOTA,
    ],
    answer: 4,
    ref: "Slides 4.2 (vsp p12); Slides 4.1 Pₙ (vsp p8); PYP AY25/26 S1 Q6 (differentiation in P₃)",
    solution:
      "All four are defined by **homogeneous linear** conditions on $\\mathbf{p}$: each contains the zero polynomial, and if $\\mathbf{p}, \\mathbf{q}$ satisfy the condition so do $\\mathbf{p}+\\mathbf{q}$ and $c\\mathbf{p}$ (evaluation and differentiation are linear). So all are subspaces and the answer is **None of the above**. A condition like $\\mathbf{p}(0) = 1$ would fail.",
  },
  {
    subtopic: "Null space & column space",
    kind: "mcq",
    prompt:
      "Let $W = \\{(2s - t,\\ r + 3t,\\ s + t,\\ r - s) : r, s, t \\in \\mathbb{R}\\}$. For which matrix $A$ is $W = C(A)$?",
    options: [
      "$\\begin{bmatrix} 0 & 1 & 0 & 1 \\\\ 2 & 0 & 1 & -1 \\\\ -1 & 3 & 1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 2 & -1 \\\\ 1 & 0 & 3 \\\\ 0 & 1 & 1 \\\\ 1 & -1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 2 & -1 \\\\ 1 & 0 & 3 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 2 & -1 \\\\ 1 & 0 & 3 \\\\ 0 & 1 & 1 \\\\ 1 & -1 & 1 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    ref: "Tutorial 4 Q5; Slides 4.5 (vsp p23)",
    solution:
      "Split by parameter: $r(0,1,0,1) + s(2,0,1,-1) + t(-1,3,1,0)$. So $W = \\operatorname{Span}$ of those three vectors, which become the **columns** of $A$ (a $4\\times3$ matrix, since $W\\subseteq\\mathbb{R}^4$). The first option puts them in rows, so its column space lies in $\\mathbb{R}^3$. The third and fourth each have one wrong entry, and you can check their column spaces are different 3-dimensional subspaces of $\\mathbb{R}^4$.",
  },
  {
    subtopic: "Null space & column space",
    kind: "mcq",
    prompt:
      "Let $D = \\begin{bmatrix} 3 & -6 \\\\ -1 & 2 \\\\ 2 & -4 \\end{bmatrix}$. Which of the following statements are correct?\nI. $(2, 1) \\in N(D)$\nII. $(3, -1, 2) \\in C(D)$\nIII. $(-6, 2, -4) \\in C(D)$\nIV. $(1, 2) \\in N(D)$",
    options: ["I only", "I and II only", "II and III only", "I, II and III only", "All of the above"],
    answer: 3,
    ref: "Tutorial 4 Q6; Slides 4.4 Exercise 4.4.1 (vsp p18); Slides 4.5 (vsp p26)",
    solution:
      "I: $D(2,1)^T = (6-6,\\ -2+2,\\ 4-4) = \\mathbf{0}$ ✓.\nII and III: these are exactly the two columns of $D$, and columns are always in $C(D)$ ✓. (In fact column 2 $= -2\\times$ column 1, so $C(D) = \\operatorname{Span}\\{(3,-1,2)\\}$.)\nIV: $D(1,2)^T = (3-12, \\dots) \\ne \\mathbf{0}$ ✗.\nSo I, II and III only. Note $N(D)\\subseteq\\mathbb{R}^2$ and $C(D)\\subseteq\\mathbb{R}^3$.",
  },
  {
    subtopic: "Null space & column space",
    kind: "mcq",
    prompt: "$A$ is a $4\\times 6$ matrix. $N(A^T)$ is a subspace of",
    options: ["$\\mathbb{R}^4$", "$\\mathbb{R}^6$", "$\\mathbb{R}^2$", "$\\mathbb{R}^{24}$", NOTA],
    answer: 0,
    ref: "Older PYP fill-in (N(Aᵀ) is a subspace of Rᵐ); Slides 4.4 Theorem 4.2 (vsp p20)",
    solution:
      "$A^T$ is $6\\times4$, so $A^T\\mathbf{y} = \\mathbf{0}$ needs $\\mathbf{y}\\in\\mathbb{R}^4$. In general $N(A^T)\\subseteq\\mathbb{R}^m$ (same space as $C(A)$), while $N(A)$ and $C(A^T)$ live in $\\mathbb{R}^n$.",
  },
  {
    subtopic: "Null space & column space",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & -1 & 2 \\\\ 2 & 0 & 2 \\\\ 0 & 1 & -1 \\end{bmatrix}$ and $\\mathbf{b} = (1, p, 3)$. For which value of $p$ is $A\\mathbf{x} = \\mathbf{b}$ consistent?",
    options: ["$p = -8$", "$p = 4$", "$p = 5$", "$p = 8$", "every real $p$"],
    answer: 3,
    ref: "Slides 4.5 (vsp p26, item 6); Slides 4.14 (vsp p62); older PYP (p for which Ax = [3, 9, p] is consistent)",
    solution:
      "$A\\mathbf{x} = \\mathbf{b}$ is consistent exactly when $\\mathbf{b}\\in C(A)$; row reduce $[\\,A\\ \\ \\mathbf{b}\\,]$.\n$R_2 - 2R_1$: $(0, 2, -2 \\mid p - 2)$. Then $R_3 - \\tfrac12 R_2$: $(0, 0, 0 \\mid 3 - \\tfrac{p-2}{2})$.\nConsistent iff $3 - \\tfrac{p-2}{2} = 0$, i.e. $p = 8$. Since $A$ has only 2 pivots, not every $\\mathbf{b}$ works.",
  },
  {
    subtopic: "Linear independence & bases",
    kind: "mcq",
    prompt: "Which set is a basis for the plane $H = \\{(x,y,z) : x - 3y + 2z = 0\\}$?",
    options: [
      "$\\{(1, -3, 2)\\}$",
      "$\\{(3,1,0),\\ (6,2,0)\\}$",
      "$\\{(1,0,0),\\ (0,1,0)\\}$",
      "$\\{(3,1,0),\\ (-2,0,1),\\ (1,1,1)\\}$",
      "$\\{(3,1,0),\\ (-2,0,1)\\}$",
    ],
    answer: 4,
    ref: "Tutorial 4 Q7; PYP AY25/26 S2 Q8",
    solution:
      "Solve for $x$: $x = 3y - 2z$, so $(x,y,z) = y(3,1,0) + z(-2,0,1)$. These two vectors lie in $H$ and are independent: a basis, and $\\dim H = 2$.\n- $(1,-3,2)$ is the **normal** vector; it is not even in $H$.\n- $(6,2,0) = 2(3,1,0)$: dependent.\n- $(1,0,0)$ gives $1 \\ne 0$, so it is not in $H$.\n- Three vectors in a 2-dimensional space are dependent (indeed $(1,1,1) = (3,1,0) + (-2,0,1)$).",
  },
  {
    subtopic: "Linear independence & bases",
    kind: "mcq",
    prompt:
      "$\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3 \\in \\mathbb{R}^3$, no two of them parallel, satisfy $2\\mathbf{v}_1 - \\mathbf{v}_2 + 3\\mathbf{v}_3 = \\mathbf{0}$. Let $H = \\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$. Which of the following is **not** a basis for $H$?",
    options: [
      "$\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$",
      "$\\{\\mathbf{v}_1, \\mathbf{v}_3\\}$",
      "$\\{\\mathbf{v}_2, \\mathbf{v}_3\\}$",
      "$\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$",
      NOTA,
    ],
    answer: 3,
    ref: "Tutorial 4 Q8; Slides 4.8 Theorem 4.5 (vsp p37)",
    solution:
      "The relation has **all** coefficients nonzero, so each vector is a combination of the other two and can be removed without changing $H$ (Spanning Set Theorem). Any two of them are not parallel, hence independent, so every pair is a basis and $\\dim H = 2$. The full set $\\{\\mathbf{v}_1,\\mathbf{v}_2,\\mathbf{v}_3\\}$ spans $H$ but is **dependent**, so it is not a basis.",
  },
  {
    subtopic: "Linear independence & bases",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{v}_1 = (1, 2, -1)$, $\\mathbf{v}_2 = (2, 1, 1)$, $\\mathbf{v}_3 = (1, -1, 2)$ and $H = \\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$. Which set is a basis for $H$?",
    options: [
      "$\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$",
      "$\\{\\mathbf{v}_2, \\mathbf{v}_3\\}$",
      "$\\{\\mathbf{v}_1\\}$",
      "$\\{\\mathbf{v}_1, 2\\mathbf{v}_1\\}$",
      NOTA,
    ],
    answer: 1,
    ref: "Tutorial 4 Q8; Slides 4.7 (vsp p30); Slides 4.8 Theorem 4.5 (vsp p37)",
    solution:
      "$\\mathbf{v}_2 - \\mathbf{v}_1 = (1, -1, 2) = \\mathbf{v}_3$, so $\\mathbf{v}_1 - \\mathbf{v}_2 + \\mathbf{v}_3 = \\mathbf{0}$ with all coefficients nonzero. $H$ is a plane ($\\dim H = 2$), and any two of the three (none is a multiple of another) form a basis, e.g. $\\{\\mathbf{v}_2, \\mathbf{v}_3\\}$.\nThe full set is dependent; $\\{\\mathbf{v}_1\\}$ spans only a line; $\\{\\mathbf{v}_1, 2\\mathbf{v}_1\\}$ is dependent.",
  },
  {
    subtopic: "Bases & dimension",
    kind: "mcq",
    prompt:
      "Suppose $3\\mathbf{v}_1 - \\mathbf{v}_2 = \\mathbf{0}$ with $\\mathbf{v}_1 \\ne \\mathbf{0}$, and $\\mathbf{v}_3 \\notin \\operatorname{Span}\\{\\mathbf{v}_1\\}$. What is $\\dim\\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$?",
    options: ["$0$", "$1$", "$2$", "$3$", NOTA],
    answer: 2,
    ref: "Slides 4.8 Theorem 4.5 (vsp p37); Slides 4.11 (vsp p50)",
    solution:
      "$\\mathbf{v}_2 = 3\\mathbf{v}_1$ is redundant, so the span equals $\\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_3\\}$. Since $\\mathbf{v}_1 \\ne \\mathbf{0}$ and $\\mathbf{v}_3$ is not a multiple of $\\mathbf{v}_1$, these two are independent: dimension $2$. (Note $\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$ is **not** part of any basis, because the coefficient of $\\mathbf{v}_3$ in the relation is $0$.)",
  },
  {
    subtopic: "Independence in general spaces",
    kind: "mcq",
    prompt:
      "In $\\mathbb{P}_1$ let $\\mathbf{p}_1(t) = 1 + 2t$, $\\mathbf{p}_2(t) = 3 - t$, $\\mathbf{p}_3(t) = 5 + 3t$. Which is a linear dependence relation among them?",
    options: [
      "$2\\mathbf{p}_1 + \\mathbf{p}_2 - \\mathbf{p}_3 = \\mathbf{0}$",
      "$\\mathbf{p}_1 + \\mathbf{p}_2 - \\mathbf{p}_3 = \\mathbf{0}$",
      "$\\mathbf{p}_1 + 2\\mathbf{p}_2 - \\mathbf{p}_3 = \\mathbf{0}$",
      "$2\\mathbf{p}_1 - \\mathbf{p}_2 - \\mathbf{p}_3 = \\mathbf{0}$",
      NOTA,
    ],
    answer: 0,
    ref: "Tutorial 4 Q9; Slides 4.7 (vsp p31)",
    solution:
      "Solve $a(1,2) + b(3,-1) = (5,3)$ in coordinates w.r.t. $\\{1, t\\}$: $a + 3b = 5$ and $2a - b = 3$, giving $a = 2$, $b = 1$. So $\\mathbf{p}_3 = 2\\mathbf{p}_1 + \\mathbf{p}_2$: $2(1+2t) + (3-t) = 5 + 3t$ ✓. Three vectors in the 2-dimensional $\\mathbb{P}_1$ had to be dependent.",
  },
  {
    subtopic: "Independence in general spaces",
    kind: "mcq",
    prompt: "Which of the following sets in $M_{2\\times2}$ is linearly independent?",
    options: [
      "$\\left\\{\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}, \\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}\\right\\}$",
      "$\\left\\{\\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}, \\begin{bmatrix}0&0\\\\1&1\\end{bmatrix}, \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}\\right\\}$",
      "$\\left\\{\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}, \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}, \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}\\right\\}$",
      "$\\left\\{\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}, \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}, \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}, \\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}, \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}\\right\\}$",
      NOTA,
    ],
    answer: 2,
    ref: "Slides 4.7 (vsp p29–30); Slides 4.10 coordinate mapping (vsp p49); Slides 4.9 (vsp p39: p > n ⇒ dependent)",
    solution:
      "Use coordinates $(a_{11}, a_{12}, a_{21}, a_{22})$. For the third set: $a(1,2,0,1) + b(0,1,1,0) + c(1,0,0,-1) = \\mathbf{0}$ gives $a + c = 0$, $2a + b = 0$, $b = 0$, $a - c = 0$, so $a = b = c = 0$: independent.\n- First: the second matrix is $2I$.\n- Second: the third matrix is the sum of the first two.\n- Fourth: the last matrix is the sum of the other four. (In coordinates these are 5 vectors in $\\mathbb{R}^4$, and more than 4 vectors in $\\mathbb{R}^4$ are always dependent.)",
  },
  {
    subtopic: "Bases for N(A), C(A), C(Aᵀ)",
    kind: "mcq",
    prompt:
      "$A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 3 \\\\ 3 & 6 & 4 \\end{bmatrix}$ has RREF $R = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Which set is a basis for $C(A)$?",
    options: [
      "$\\{(1,0,0),\\ (0,1,0)\\}$",
      "$\\{(1,2,3),\\ (2,4,6)\\}$",
      "$\\{(1,2,0),\\ (0,0,1)\\}$",
      "$\\{(1,2,3),\\ (1,3,4)\\}$",
      NOTA,
    ],
    answer: 3,
    ref: "Slides 4.9 Theorem 4.6, Exercise 4.9.2 (vsp p42–43)",
    solution:
      "Pivots of $R$ are in columns 1 and 3, so the basis is columns 1 and 3 **of $A$**: $(1,2,3)$ and $(1,3,4)$.\n- $(1,0,0), (0,1,0)$ are the pivot columns of $R$. Row operations change the column space, so these need not lie in $C(A)$ (here $(1,0,0)$ is not a combination of $(1,2,3)$ and $(1,3,4)$).\n- $(2,4,6) = 2(1,2,3)$: dependent.\n- $(1,2,0), (0,0,1)$ are the nonzero rows of $R$: a basis for the **row space**.",
  },
  {
    subtopic: "Bases for N(A), C(A), C(Aᵀ)",
    kind: "mcq",
    prompt:
      "$A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 3 \\\\ 3 & 6 & 4 \\end{bmatrix}$ has RREF $R = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Which set is a basis for the row space $C(A^T)$?",
    options: [
      "$\\{(1,2,3),\\ (1,3,4)\\}$",
      "$\\{(1,2,0),\\ (0,0,1)\\}$",
      "$\\{(1,2,1),\\ (2,4,3),\\ (3,6,4)\\}$",
      "$\\{(1,0,0),\\ (0,0,1)\\}$",
      NOTA,
    ],
    answer: 1,
    ref: "Slides 4.13 Theorem 4.7 (vsp p58–60)",
    solution:
      "Row operations do not change the row space, so the nonzero rows of $R$, $(1,2,0)$ and $(0,0,1)$, are a basis.\n- $(1,2,3), (1,3,4)$ are the pivot **columns** of $A$ (a basis of $C(A)$).\n- All three rows are dependent: row 3 $=$ row 1 $+$ row 2.\n- $(1,0,0)$ is not in the row space (every vector there has second entry twice the first).",
  },
  {
    subtopic: "Bases for N(A), C(A), C(Aᵀ)",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 3 & 0 & -2 & 4 \\\\ 0 & 0 & 1 & 5 & -1 \\end{bmatrix}$. Which set is a basis for $N(A)$?",
    options: [
      "$\\{(-3,1,0,0,0),\\ (2,0,-5,1,0),\\ (-4,0,1,0,1)\\}$",
      "$\\{(3,1,0,0,0),\\ (-2,0,5,1,0),\\ (4,0,-1,0,1)\\}$",
      "$\\{(1,3,0,-2,4),\\ (0,0,1,5,-1)\\}$",
      "$\\{(-3,1,0,0,0),\\ (2,0,-5,1,0)\\}$",
      NOTA,
    ],
    answer: 0,
    ref: "Slides 4.4 Exercise 4.4.3 (vsp p21–22); Slides 4.9 (vsp p38); Slides 4.12 (vsp p52)",
    solution:
      "$A$ is already in RREF with pivots in columns 1 and 3; free variables $x_2, x_4, x_5$.\n$x_1 = -3x_2 + 2x_4 - 4x_5$ and $x_3 = -5x_4 + x_5$, so\n$$\\mathbf{x} = x_2(-3,1,0,0,0) + x_4(2,0,-5,1,0) + x_5(-4,0,1,0,1).$$\nThe second option forgot to flip the signs, the third lists the rows (a row-space basis), and the fourth has only 2 vectors although $\\dim N(A) = 5 - 2 = 3$.",
  },
  {
    subtopic: "Row reduction & the four subspaces",
    kind: "mcq",
    prompt:
      "$A$ and $B$ are row equivalent $m\\times n$ matrices. Which of the following must be the same for $A$ and $B$?\nI. the row space\nII. the null space\nIII. the column space\nIV. the rank",
    options: ["I and II only", "I, II and IV only", "I, II and III only", "II and IV only", "All of the above"],
    answer: 1,
    ref: "Slides 4.9 (vsp p41); Slides 4.13 Theorem 4.7 (vsp p58); Slides 4.14 (vsp p63); older PYP T/F (row equivalent ⇒ same column space: F)",
    solution:
      "Row operations replace rows by combinations of rows (row space unchanged) and do not change the solutions of $A\\mathbf{x} = \\mathbf{0}$ (null space unchanged). Hence the rank $= \\dim C(A^T)$ is unchanged too. The column space **can** change: $\\begin{bmatrix}1\\\\1\\end{bmatrix}\\sim\\begin{bmatrix}1\\\\0\\end{bmatrix}$. So I, II and IV only.",
  },
  {
    subtopic: "Dimension",
    kind: "mcq",
    prompt: "What is the dimension of the subspace of $M_{3\\times3}$ consisting of all skew-symmetric matrices ($A^T = -A$)?",
    options: ["$3$", "$6$", "$9$", "$4$", NOTA],
    answer: 0,
    ref: "Tutorial 3 Q3 (skew-symmetric A = −Aᵀ); PYP AY25/26 S1 Q5 (counting method); Slides 4.11 (vsp p50)",
    solution:
      "As in Tutorial 3 Q3, the diagonal must be $0$ ($a_{ii} = -a_{ii}$) and each entry below the diagonal is minus the one above it ($a_{ij} = -a_{ji}$), so every such matrix is\n$$\\begin{bmatrix} 0 & a & b \\\\ -a & 0 & c \\\\ -b & -c & 0 \\end{bmatrix} = a\\begin{bmatrix} 0 & 1 & 0 \\\\ -1 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} + b\\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix} + c\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & -1 & 0 \\end{bmatrix}.$$\nThese three matrices span the set and are independent (each has a nonzero entry where the others have $0$), so they form a basis: dimension $3$. (Same counting as for the $3\\times3$ symmetric matrices, which give $6$.)",
  },
  {
    subtopic: "Dimension",
    kind: "mcq",
    prompt: "What is $\\dim\\{\\mathbf{p}\\in\\mathbb{P}_3 : \\mathbf{p}(2) = 0\\}$?",
    options: ["$2$", "$4$", "$1$", "$3$", NOTA],
    answer: 3,
    ref: "Slides 4.4 (vsp p21–22); Slides 4.11 (vsp p50); Slides 4.12 (vsp p52)",
    solution:
      "Write $\\mathbf{p}(t) = a_0 + a_1t + a_2t^2 + a_3t^3$. Then $\\mathbf{p}(2) = 0$ is the homogeneous equation $a_0 + 2a_1 + 4a_2 + 8a_3 = 0$ in the coordinates $(a_0, a_1, a_2, a_3)$. It has one pivot ($a_0$) and 3 free variables, so the solution set has dimension $3$:\n$$a_0 = -2a_1 - 4a_2 - 8a_3 \\Rightarrow \\mathbf{p} = a_1(t - 2) + a_2(t^2 - 4) + a_3(t^3 - 8).$$\nA basis is $\\{t - 2,\\ t^2 - 4,\\ t^3 - 8\\}$. Dimension $3$.",
  },
  {
    subtopic: "Dimension",
    kind: "mcq",
    prompt:
      "What is the dimension of $H = \\operatorname{Span}\\{(1,-2,3),\\ (-2,4,-6),\\ (0,1,1),\\ (1,-1,4)\\}$?",
    options: ["$1$", "$2$", "$3$", "$4$", NOTA],
    answer: 1,
    ref: "Tutorial 4 Q11; Slides 4.8 Theorem 4.5 (vsp p37); Slides 4.11 (vsp p50)",
    solution:
      "$(-2,4,-6) = -2(1,-2,3)$ and $(1,-1,4) = (1,-2,3) + (0,1,1)$, so both are redundant. $(1,-2,3)$ and $(0,1,1)$ are not parallel, so $H$ is the plane they span: $\\dim H = 2$. The number of vectors listed (4) is not the dimension.",
  },
  {
    subtopic: "Bases & dimension",
    kind: "mcq",
    prompt:
      "Let $W = \\operatorname{Span}\\{(1,0,1,0),\\ (0,1,0,1)\\}\\subseteq\\mathbb{R}^4$. Adding which pair of vectors to these two gives a basis of $\\mathbb{R}^4$?",
    options: [
      "$\\mathbf{e}_1, \\mathbf{e}_3$",
      "$\\mathbf{e}_2, \\mathbf{e}_4$",
      "$(1,1,1,1), \\mathbf{e}_1$",
      "$\\mathbf{e}_1, \\mathbf{e}_2$",
      NOTA,
    ],
    answer: 3,
    ref: "Older PYP (basis & dimension of W in R⁴, extend to a basis of R⁴); Slides 4.14 Theorem 4.9 (vsp p66)",
    solution:
      "Put the two vectors as rows: $\\begin{bmatrix} 1&0&1&0\\\\0&1&0&1\\end{bmatrix}$ has pivots in columns 1 and 2. Adding $\\mathbf{e}_1, \\mathbf{e}_2$: then $(1,0,1,0) - \\mathbf{e}_1 = \\mathbf{e}_3$ and $(0,1,0,1) - \\mathbf{e}_2 = \\mathbf{e}_4$ are in the span, so all four standard vectors are, giving a basis.\n- $\\mathbf{e}_1 + \\mathbf{e}_3 = (1,0,1,0)$: dependent.\n- $\\mathbf{e}_2 + \\mathbf{e}_4 = (0,1,0,1)$: dependent.\n- $(1,1,1,1)$ is the sum of the two given vectors: dependent.\n(Equivalently: four vectors form a basis for $\\mathbb{R}^4$ exactly when the $4\\times4$ matrix with these columns is invertible, Theorem 4.9.)",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt: "A $3\\times8$ matrix $A$ has rank 3. Find $\\dim N(A)$, $\\dim C(A^T)$ and $\\operatorname{rank}A^T$, in that order.",
    options: ["$5,\\ 5,\\ 3$", "$5,\\ 3,\\ 3$", "$0,\\ 3,\\ 3$", "$5,\\ 3,\\ 8$", NOTA],
    answer: 1,
    ref: "Tutorial 4 Q13; Slides 4.14 Theorem 4.8 (vsp p63–64)",
    solution:
      "Rank Theorem with $n = 8$ columns: $\\dim N(A) = 8 - 3 = 5$. The row space has the same dimension as the column space: $\\dim C(A^T) = 3$, and $\\operatorname{rank}A^T = \\operatorname{rank}A = 3$.",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt: "A $7\\times5$ matrix $A$ satisfies $\\dim N(A) = 2$. What is $\\dim N(A^T)$?",
    options: ["$2$", "$3$", "$5$", "$1$", NOTA],
    answer: 4,
    ref: "Slides 4.14 Theorem 4.8 (vsp p64); Tutorial 4 Q13 (rank Aᵀ = rank A); older PYP fill-in (N(Aᵀ) ⊆ Rᵐ)",
    solution:
      "$\\operatorname{rank}A = 5 - 2 = 3$ (columns). $A^T$ is $5\\times7$ with the same rank, so $\\dim N(A^T) = 7 - 3 = 4$ (number of rows of $A$ minus the rank). $4$ is not listed, so **None of the above**. ($2$ is $\\dim N(A)$, $3$ is the rank.)",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt: "$A$ is a $4\\times9$ matrix. What is the smallest possible value of $\\dim N(A)$?",
    options: ["$0$", "$4$", "$9$", "$1$", NOTA],
    answer: 4,
    ref: "Slides 4.14 Theorem 4.8 (vsp p64); older PYP fill-ins (max rank of 6×4 = 4; rank ≤ p)",
    solution:
      "$\\operatorname{rank}A \\le \\min(4, 9) = 4$, so $\\dim N(A) = 9 - \\operatorname{rank}A \\ge 5$, with equality when $A$ has 4 pivots. The smallest possible value is $5$, which is not listed: **None of the above**.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt: "$A$ is $n\\times n$ ($n \\ge 3$) with entries $a_{ij} = 2i - j$. What is $\\operatorname{rank}A$?",
    options: ["$1$", "$2$", "$n - 1$", "$n$", NOTA],
    answer: 1,
    ref: "Tutorial 4 Q16; PYP AY25/26 S1 Q7; Slides 4.13–4.14 (vsp p63)",
    solution:
      "Row $i$ is $2i(1,1,\\dots,1) - (1,2,\\dots,n)$: every row is a combination of the two fixed vectors $(1,\\dots,1)$ and $(1,2,\\dots,n)$, so $\\operatorname{rank}A \\le 2$. Rows 1 and 2 are $(1,0,-1,\\dots)$ and $(3,2,1,\\dots)$, which are not parallel, so the rank is exactly $2$. Same idea as $a_{ij} = i + j$.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt: "$B$ is a $5\\times3$ matrix of rank 2. Find $\\operatorname{rank}(B^TB)$ and $\\dim N(B^TB)$.",
    options: ["$2$ and $1$", "$3$ and $0$", "$2$ and $3$", "$2$ and $0$", NOTA],
    answer: 0,
    ref: "Older PYP (dim N(BᵀB) and rank of BᵀB); PYP AY25/26 S2 Q17 (xᵀAᵀAx = ‖Ax‖²)",
    solution:
      "$B^TB\\mathbf{x} = \\mathbf{0} \\Rightarrow \\mathbf{x}^TB^TB\\mathbf{x} = \\|B\\mathbf{x}\\|^2 = 0 \\Rightarrow B\\mathbf{x} = \\mathbf{0}$, so $N(B^TB) = N(B)$. $B^TB$ is $3\\times3$; $\\dim N(B^TB) = \\dim N(B) = 3 - 2 = 1$ and $\\operatorname{rank}(B^TB) = 3 - 1 = 2 = \\operatorname{rank}B$.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{x}\\in\\mathbb{R}^m$ and $\\mathbf{r}\\in\\mathbb{R}^n$ be nonzero, and $A = \\mathbf{x}\\mathbf{r}^T$. Which of the following statements are correct?\nI. $C(A) = \\operatorname{Span}\\{\\mathbf{x}\\}$\nII. $C(A^T) = \\operatorname{Span}\\{\\mathbf{r}\\}$\nIII. $\\dim N(A) = n - 1$\nIV. $N(A) = \\operatorname{Span}\\{\\mathbf{x}\\}$",
    options: ["I and II only", "II and III only", "I, II and III only", "I, II and IV only", "All of the above"],
    answer: 2,
    ref: "PYP AY24/25 S2 Q7; Slides 4.14 Theorem 4.8 (vsp p64)",
    solution:
      "$A\\mathbf{v} = \\mathbf{x}(\\mathbf{r}^T\\mathbf{v})$ is always a multiple of $\\mathbf{x}$, and is nonzero for $\\mathbf{v} = \\mathbf{r}$: I ✓. Every row of $A$ is $x_i\\mathbf{r}^T$: II ✓. Rank 1, so $\\dim N(A) = n - 1$: III ✓. $A\\mathbf{v} = \\mathbf{0}$ iff $\\mathbf{r}^T\\mathbf{v} = 0$, so $N(A) = \\{\\mathbf{v}\\in\\mathbb{R}^n : \\mathbf{r}\\cdot\\mathbf{v} = 0\\}$, not $\\operatorname{Span}\\{\\mathbf{x}\\}$ (which need not even be in $\\mathbb{R}^n$): IV ✗.",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times3$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = (1, 0, 2) + c(1, 1, 0) + d(0, 2, 1)$. What is $\\dim C(A)$?",
    options: ["$0$", "$1$", "$2$", "$3$", "Cannot be determined"],
    answer: 1,
    ref: "PYP AY24/25 S2 Q8; PYP AY25/26 S1 Q8; Slides 4.14 Theorem 4.8 (vsp p64)",
    solution:
      "The homogeneous part $c(1,1,0) + d(0,2,1)$ has two independent vectors, so $\\dim N(A) = 2$. Rank Theorem: $\\dim C(A) = 3 - 2 = 1$. The particular solution $(1,0,2)$ does not contribute to $N(A)$.",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt:
      "A homogeneous system of 5 equations in 6 unknowns has solutions that are all multiples of one nonzero solution. Which statement is correct?",
    options: [
      "$\\operatorname{rank}A = 4$",
      "$A\\mathbf{x} = \\mathbf{b}$ has a unique solution for every $\\mathbf{b}$",
      "The columns of $A$ are linearly independent",
      "$A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^5$",
      NOTA,
    ],
    answer: 3,
    ref: "Tutorial 4 Q14; Slides 4.14 Exercise 4.14.1 (vsp p65)",
    solution:
      "$\\dim N(A) = 1$, so $\\operatorname{rank}A = 6 - 1 = 5$. A $5\\times6$ matrix of rank 5 has a pivot in every row, so $C(A) = \\mathbb{R}^5$ and every system is consistent. Solutions are never unique ($\\dim N(A) = 1$), and 6 vectors in $\\mathbb{R}^5$ are dependent.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & k & 0 \\\\ 1 & 1 & -1 \\end{bmatrix}$. For which $k$ is $\\dim N(A) = 1$?",
    options: ["$k = 3$", "$k = -3$", "$k = 0$", "$k = 6$", NOTA],
    answer: 0,
    ref: "Slides 4.14 Theorem 4.9 (vsp p66); Chapter 3 determinants (|A| = 0 ⇔ singular)",
    solution:
      "$|A| = 1(-k - 0) - 2(-2 - 0) + 1(2 - k) = 6 - 2k$, which is $0$ iff $k = 3$. Rows 1 and 3 are independent, so the rank is never below 2. Hence $\\dim N(A) = 1$ exactly when $k = 3$ (otherwise $\\dim N(A) = 0$).",
  },
  {
    subtopic: "Null space & column space",
    kind: "mcq",
    prompt:
      "$A$ is $3\\times5$ with rank 3, $B$ is $5\\times4$, and $AB = 0$. What is the largest possible value of $\\operatorname{rank}B$?",
    options: ["$1$", "$3$", "$2$", "$4$", NOTA],
    answer: 2,
    ref: "Older PYP fill-in (AB = 0 ⇒ C(B) ⊆ N(A)); Slides 4.14 Theorem 4.8 (vsp p64)",
    solution:
      "$AB = 0$ gives $C(B)\\subseteq N(A)$, and $\\dim N(A) = 5 - 3 = 2$. So $\\operatorname{rank}B = \\dim C(B) \\le 2$, and 2 is attained by taking two columns of $B$ to be a basis of $N(A)$.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "mcq",
    prompt: "$A$ is $n\\times n$. Which condition is **not** equivalent to \"$A$ is invertible\"?",
    options: [
      "$\\operatorname{rank}A = n$",
      "$N(A) = \\{\\mathbf{0}\\}$",
      "The columns of $A$ form a basis of $\\mathbb{R}^n$",
      "Every column of $A$ has a nonzero entry",
      "$C(A^T) = \\mathbb{R}^n$",
    ],
    answer: 3,
    ref: "Slides 4.14 Theorem 4.9 (vsp p66); Theorem 2.4 (vsp p67)",
    solution:
      "Rank $n$, $N(A) = \\{\\mathbf{0}\\}$ and columns forming a basis are statements 14, 15 and 11 of Theorem 4.9. $C(A^T) = \\mathbb{R}^n$ says $A^T$ is invertible (Theorem 4.9 applied to $A^T$), which is statement 10 of Theorem 2.4. Having a nonzero entry in every column is much weaker: $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$ satisfies it but is singular.",
  },
  {
    subtopic: "Coordinates",
    kind: "mcq",
    prompt:
      "$\\mathcal{B} = \\{\\mathbf{b}_1, \\mathbf{b}_2\\}$ with $\\mathbf{b}_1 = (2,-3)$, $\\mathbf{b}_2 = (-1,4)$. Find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = (3, -2)$.",
    options: ["$(8, -17)$", "$(1, 2)$", "$(2, 1)$", "$\\left(\\tfrac65, -\\tfrac15\\right)$", NOTA],
    answer: 2,
    ref: "Tutorial 4 Q10; Slides 4.10 Exercise 4.10.2 (vsp p47–48)",
    solution:
      "$P_{\\mathcal{B}} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 4 \\end{bmatrix}$, $\\det = 5$, $P_{\\mathcal{B}}^{-1} = \\tfrac15\\begin{bmatrix} 4 & 1 \\\\ 3 & 2 \\end{bmatrix}$.\n$[\\mathbf{x}]_{\\mathcal{B}} = \\tfrac15(12 - 2,\\ 9 - 4) = (2, 1)$. Check: $2(2,-3) + (-1,4) = (3,-2)$ ✓.\n$(8,-17) = P_{\\mathcal{B}}\\mathbf{x}$ (wrong direction); $(6/5, -1/5)$ comes from putting the basis vectors in rows.",
  },
  {
    subtopic: "Coordinates",
    kind: "mcq",
    prompt:
      "$\\mathcal{B} = \\{1,\\ 1 + t,\\ 1 + t + t^2\\}$ is a basis of $\\mathbb{P}_2$. Find $[\\mathbf{p}]_{\\mathcal{B}}$ for $\\mathbf{p}(t) = 3 - 2t + 5t^2$.",
    options: ["$(3, -2, 5)$", "$(5, -7, 5)$", "$(-7, 5, 5)$", "$(5, -2, -7)$", NOTA],
    answer: 1,
    ref: "Slides 4.10 (vsp p44); older PYP (coordinates in P2 w.r.t. a basis)",
    solution:
      "Write $\\mathbf{p} = a\\cdot1 + b(1+t) + c(1+t+t^2)$. Matching $t^2$: $c = 5$. Matching $t$: $b + c = -2$, so $b = -7$. Constant: $a + b + c = 3$, so $a = 5$.\nCheck: $5 - 7(1+t) + 5(1+t+t^2) = 3 - 2t + 5t^2$ ✓. $(3,-2,5)$ is the coordinate vector in the **standard** basis $\\{1,t,t^2\\}$.",
  },
  {
    subtopic: "Change of basis",
    kind: "mcq",
    prompt:
      "$\\mathcal{A} = \\{\\mathbf{a}_1,\\mathbf{a}_2,\\mathbf{a}_3\\}$ and $\\mathcal{B} = \\{\\mathbf{b}_1,\\mathbf{b}_2,\\mathbf{b}_3\\}$ are bases of $V$ with $\\mathbf{a}_1 = 2\\mathbf{b}_1 + \\mathbf{b}_2$, $\\mathbf{a}_2 = -\\mathbf{b}_1 + 3\\mathbf{b}_3$, $\\mathbf{a}_3 = \\mathbf{b}_2 - \\mathbf{b}_3$. Find $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$.",
    options: [
      "$\\begin{bmatrix} 2 & 1 & 0 \\\\ -1 & 0 & 3 \\\\ 0 & 1 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & -1 & 0 \\\\ 1 & 0 & 3 \\\\ 0 & 1 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & -1 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 3 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 1 & 0 \\\\ -1 & 0 & 1 \\\\ 0 & 3 & -1 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    ref: "Tutorial 4 Q15(a); Slides 4.15 Theorem 4.9 (vsp p70)",
    solution:
      "Column $j$ of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$ is $[\\mathbf{a}_j]_{\\mathcal{B}}$: $[\\mathbf{a}_1]_{\\mathcal{B}} = (2,1,0)$, $[\\mathbf{a}_2]_{\\mathcal{B}} = (-1,0,3)$, $[\\mathbf{a}_3]_{\\mathcal{B}} = (0,1,-1)$. Placing these as **columns** gives the third option. The first option is its transpose (coefficients written as rows), the classic mistake.",
  },
  {
    subtopic: "Change of basis",
    kind: "mcq",
    prompt:
      "With $\\mathbf{a}_1 = 2\\mathbf{b}_1 + \\mathbf{b}_2$, $\\mathbf{a}_2 = -\\mathbf{b}_1 + 3\\mathbf{b}_3$, $\\mathbf{a}_3 = \\mathbf{b}_2 - \\mathbf{b}_3$ as before, find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = \\mathbf{a}_1 - \\mathbf{a}_2 + 2\\mathbf{a}_3$.",
    options: ["$(1, -1, 2)$", "$(3, 3, -5)$", "$(1, 5, -3)$", "$(3, -3, 5)$", NOTA],
    answer: 1,
    ref: "Tutorial 4 Q15(b); Slides 4.15 Exercise 4.15.1 (vsp p69)",
    solution:
      "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}\\leftarrow\\mathcal{A}}[\\mathbf{x}]_{\\mathcal{A}} = \\begin{bmatrix} 2 & -1 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 3 & -1 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\end{bmatrix} = (3, 3, -5)$.\nCheck by substitution: $(2\\mathbf{b}_1 + \\mathbf{b}_2) - (-\\mathbf{b}_1 + 3\\mathbf{b}_3) + 2(\\mathbf{b}_2 - \\mathbf{b}_3) = 3\\mathbf{b}_1 + 3\\mathbf{b}_2 - 5\\mathbf{b}_3$ ✓. $(1,-1,2)$ is $[\\mathbf{x}]_{\\mathcal{A}}$; $(1,5,-3)$ uses the transpose.",
  },
  {
    subtopic: "Change of basis",
    kind: "mcq",
    prompt:
      "$\\mathcal{B} = \\{(1,1), (1,2)\\}$ and $\\mathcal{C} = \\{(1,0), (1,1)\\}$ are bases of $\\mathbb{R}^2$. Find $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$.",
    options: [
      "$\\begin{bmatrix} 2 & 1 \\\\ -1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 1 \\\\ -1 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & -1 \\\\ 1 & 2 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    ref: "Slides 4.15 Theorem 4.9 (vsp p70); Slides 4.10 (vsp p48)",
    solution:
      "Columns are $[\\mathbf{b}_1]_{\\mathcal{C}}$ and $[\\mathbf{b}_2]_{\\mathcal{C}}$: $(1,1) = 0(1,0) + 1(1,1)$ and $(1,2) = -1(1,0) + 2(1,1)$. So $P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 2 \\end{bmatrix}$ (Theorem 4.9, slide 70).\nThe first option has columns $[\\mathbf{c}_1]_{\\mathcal{B}}, [\\mathbf{c}_2]_{\\mathcal{B}}$ (the conversion the other way), the second is the transpose (coordinates written as rows), the third is just $P_{\\mathcal{B}}$.",
  },
  {
    subtopic: "Coordinates",
    kind: "mcq",
    prompt: "$\\mathcal{B} = \\{\\mathbf{b}_1,\\dots,\\mathbf{b}_n\\}$ is a basis of $\\mathbb{R}^n$ and $P_{\\mathcal{B}} = [\\mathbf{b}_1\\ \\cdots\\ \\mathbf{b}_n]$. Which statement is **false**?",
    options: [
      "The map $\\mathbf{x}\\mapsto[\\mathbf{x}]_{\\mathcal{B}}$ is a one-to-one linear transformation",
      "$[\\mathbf{x} + \\mathbf{y}]_{\\mathcal{B}} = [\\mathbf{x}]_{\\mathcal{B}} + [\\mathbf{y}]_{\\mathcal{B}}$",
      "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}\\mathbf{x}$",
      "$[\\mathbf{b}_2]_{\\mathcal{B}} = \\mathbf{e}_2$",
      "$\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$",
    ],
    answer: 2,
    ref: "Slides 4.10 (vsp p48–49)",
    solution:
      "$P_{\\mathcal{B}}$ converts $\\mathcal{B}$-coordinates **into** standard coordinates: $\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$, so $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$. The other statements are true: the coordinate mapping is a one-to-one linear transformation (slide 49), so it preserves sums, and $\\mathbf{b}_2 = 0\\mathbf{b}_1 + 1\\mathbf{b}_2 + 0\\mathbf{b}_3 + \\dots$ gives $[\\mathbf{b}_2]_{\\mathcal{B}} = \\mathbf{e}_2$.",
  },
];
