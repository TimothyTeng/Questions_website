import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const vectorSpacesExam: ConceptQuestion[] = [
  {
    subtopic: "Subspaces",
    kind: "mcq",
    prompt: "Let $U = \\{(x, y, z) \\in \\mathbb{R}^3 : xz = 0\\}$. Which of the following is correct?",
    options: [
      "$U$ is a subspace of $\\mathbb{R}^3$",
      "$U$ is not a subspace because it does not contain the zero vector",
      "$U$ is not a subspace because it is not closed under scalar multiplication",
      "$U$ is not a subspace because it is not closed under vector addition",
      NOTA,
    ],
    answer: 3,
    solution:
      "$U$ is the union of the planes $x = 0$ and $z = 0$.\n- $\\mathbf{0}\\in U$ since $0\\cdot0 = 0$.\n- Scalars: $(cx)(cz) = c^2xz = 0$, so $U$ **is** closed under scalar multiplication.\n- Addition: $(1,0,0)\\in U$ and $(0,0,1)\\in U$, but $(1,0,1)$ has $xz = 1 \\ne 0$.\nSo the only failing condition is closure under addition.",
  },
  {
    subtopic: "Subspaces",
    kind: "mcq",
    prompt:
      "Which of the following are subspaces of the indicated vector space?\nI. $\\{\\mathbf{p}\\in\\mathbb{P}_2 : \\mathbf{p}(1) = 0\\}$ in $\\mathbb{P}_2$\nII. $\\{A\\in M_{2\\times2} : A^2 = A\\}$ in $M_{2\\times2}$\nIII. $\\{\\mathbf{x}\\in\\mathbb{R}^3 : x_1 + x_2 + x_3 \\ge 0\\} \\cap \\{\\mathbf{x}\\in\\mathbb{R}^3 : x_1 + x_2 + x_3 \\le 0\\}$ in $\\mathbb{R}^3$\nIV. $\\{A\\in M_{3\\times3} : A^T = -A\\}$ in $M_{3\\times3}$",
    options: ["I and IV only", "I, III and IV only", "I, II and IV only", "III and IV only", "All of the above"],
    answer: 1,
    solution:
      "I: evaluation at 1 is linear and the condition is homogeneous ✓.\nII: $I^2 = I$ but $(2I)^2 = 4I \\ne 2I$, so it is not closed under scaling ✗.\nIII: each half-space alone is not a subspace, but their **intersection** is the plane $x_1 + x_2 + x_3 = 0$ through the origin ✓.\nIV: skew-symmetric matrices: $(A+B)^T = -(A+B)$, $(cA)^T = -cA$, and $0$ qualifies ✓.\nSo I, III and IV only.",
  },
  {
    subtopic: "Bases",
    kind: "mcq",
    prompt: "Let $H = \\{(x, y, z) : 3x - y + 2z = 0\\}$. Which of the following sets is a basis for $H$?",
    options: [
      "$\\{(1, 3, 0),\\ (2, 6, 0)\\}$",
      "$\\{(3, -1, 2),\\ (0, 2, 1)\\}$",
      "$\\{(1, 3, 0),\\ (1, 1, 1)\\}$",
      "$\\{(1, 1, -1),\\ (-1, 1, 2)\\}$",
      "$\\{(1, 3, 0),\\ (0, 2, 1),\\ (1, 5, 1)\\}$",
    ],
    answer: 3,
    solution:
      "$H$ is a plane through the origin, so a basis has exactly 2 independent vectors **in** $H$.\n- D: $3 - 1 - 2 = 0$ and $-3 - 1 + 4 = 0$, both in $H$, not parallel ✓.\n- A: $(2,6,0) = 2(1,3,0)$, dependent.\n- B: $(3,-1,2)$ is the normal vector: $9 + 1 + 4 \\ne 0$.\n- C: $(1,1,1)$ gives $3 - 1 + 2 = 4 \\ne 0$.\n- E: three vectors in a 2-dimensional space ($(1,5,1) = (1,3,0) + (0,2,1)$).",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt: "$A$ is a $4\\times9$ matrix of rank 3. Find $\\big(\\dim N(A),\\ \\dim C(A^T),\\ \\dim N(A^T)\\big)$.",
    options: ["$(6, 4, 1)$", "$(6, 3, 6)$", "$(1, 3, 6)$", "$(5, 3, 1)$", NOTA],
    answer: 4,
    solution:
      "$\\dim N(A) = 9 - 3 = 6$ (columns minus rank); $\\dim C(A^T) = \\operatorname{rank}A = 3$; $\\dim N(A^T) = 4 - 3 = 1$ (rows minus rank). The answer $(6, 3, 1)$ is not listed: **None of the above**.",
  },
  {
    subtopic: "Column space",
    kind: "mcq",
    prompt: "$A$ is a $4\\times4$ matrix with $|A| = 0$. Geometrically, the column space $C(A)$ is",
    options: [
      "a 3-dimensional subspace of $\\mathbb{R}^4$",
      "a plane through the origin in $\\mathbb{R}^4$",
      "a line through the origin in $\\mathbb{R}^4$",
      "the zero subspace $\\{\\mathbf{0}\\}$",
      "cannot be determined",
    ],
    answer: 4,
    solution:
      "$|A| = 0$ only tells us $\\operatorname{rank}A < 4$. The rank can be $0, 1, 2$ or $3$ (e.g. the zero matrix, or $\\operatorname{diag}(1,0,0,0)$, $\\operatorname{diag}(1,1,0,0)$, $\\operatorname{diag}(1,1,1,0)$), so $C(A)$ could be any of the first four options. **Cannot be determined**.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ ($n\\ge3$) be linearly independent and $A = \\mathbf{u}\\mathbf{u}^T + \\mathbf{v}\\mathbf{v}^T$. Which of the following statements are correct?\nI. $\\operatorname{rank}A = 2$\nII. $C(A) = \\operatorname{Span}\\{\\mathbf{u}, \\mathbf{v}\\}$\nIII. $A$ is symmetric\nIV. $N(A) = \\{\\mathbf{x} : \\mathbf{u}\\cdot\\mathbf{x} = 0 \\text{ and } \\mathbf{v}\\cdot\\mathbf{x} = 0\\}$",
    options: ["I and III only", "I, II and III only", "II, III and IV only", "III and IV only", "All of the above"],
    answer: 4,
    solution:
      "$A\\mathbf{x} = (\\mathbf{u}\\cdot\\mathbf{x})\\mathbf{u} + (\\mathbf{v}\\cdot\\mathbf{x})\\mathbf{v}$.\nIV: since $\\mathbf{u}, \\mathbf{v}$ are independent, this is $\\mathbf{0}$ iff both coefficients vanish ✓.\nI: these are 2 independent linear conditions, so $\\dim N(A) = n - 2$ and $\\operatorname{rank}A = 2$ ✓.\nII: $C(A)\\subseteq\\operatorname{Span}\\{\\mathbf{u},\\mathbf{v}\\}$ and both have dimension 2, so they are equal ✓.\nIII: $(\\mathbf{u}\\mathbf{u}^T)^T = \\mathbf{u}\\mathbf{u}^T$ ✓.\nAll of the above.",
  },
  {
    subtopic: "Rank theorem",
    kind: "mcq",
    prompt:
      "$A$ is a $3\\times4$ matrix and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is\n$$\\mathbf{x} = \\begin{bmatrix} 2 \\\\ 0 \\\\ 1 \\\\ 0 \\end{bmatrix} + s\\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\\\ 0 \\end{bmatrix} + t\\begin{bmatrix} -3 \\\\ 0 \\\\ 2 \\\\ 1 \\end{bmatrix}.$$\nFind $\\big(\\dim C(A),\\ \\dim N(A^T)\\big)$.",
    options: ["$(2, 2)$", "$(2, 1)$", "$(3, 0)$", "$(1, 2)$", "cannot be determined"],
    answer: 1,
    solution:
      "The two direction vectors are independent, so $\\dim N(A) = 2$ (the particular solution does not count). Rank Theorem with $n = 4$: $\\dim C(A) = \\operatorname{rank}A = 4 - 2 = 2$. Then $\\dim N(A^T) = m - \\operatorname{rank}A = 3 - 2 = 1$.",
  },
  {
    subtopic: "Null space",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 & 4 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 2 \\end{bmatrix}$ and let $B$ be a $3\\times4$ matrix. The complete solution of $AB\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = (1, 0, 2, -1) + c(2, -1, 0, 1) + d(0, 1, 1, 0)$. Which set is a basis for $N(B)$?",
    options: [
      "$\\{(2,-1,0,1),\\ (0,1,1,0)\\}$",
      "$\\{(1,0,2,-1)\\}$",
      "$\\{(1,0,2,-1),\\ (2,-1,0,1),\\ (0,1,1,0)\\}$",
      "$\\{(2,-1,0,1)\\}$",
      "cannot be determined",
    ],
    answer: 0,
    solution:
      "The complete solution tells us $N(AB) = \\operatorname{Span}\\{(2,-1,0,1), (0,1,1,0)\\}$. $A$ is upper triangular with $|A| = 1\\cdot1\\cdot2 = 2 \\ne 0$, so $A$ is invertible and $AB\\mathbf{x} = \\mathbf{0} \\iff B\\mathbf{x} = \\mathbf{0}$. Hence $N(B) = N(AB)$, and the two (independent) direction vectors form a basis. The particular solution $(1,0,2,-1)$ is not in $N(B)$.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt:
      "$A$ is an $n\\times n$ matrix with $n\\ge4$ whose entries are $a_{ij} = (i - j)^2$. The rank of $A$ is always",
    options: ["$3$", "$1$", "$2$", "$n - 1$", NOTA],
    answer: 0,
    solution:
      "$(i - j)^2 = i^2\\cdot1 - 2i\\cdot j + 1\\cdot j^2$, so row $i$ is $i^2(1,\\dots,1) - 2i(1,2,\\dots,n) + (1,4,\\dots,n^2)$: every row lies in the span of 3 fixed vectors, so $\\operatorname{rank}A\\le3$.\nThe top-left $3\\times3$ block $\\begin{bmatrix}0&1&4\\\\1&0&1\\\\4&1&0\\end{bmatrix}$ has determinant $0 - 1(0-4) + 4(1-0) = 8 \\ne 0$, so its 3 rows are independent and the rank is exactly 3.",
  },
  {
    subtopic: "Rank",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 & 1 & 0 \\\\ 2 & 5 & 3 & 1 \\\\ 1 & 3 & k & 1 \\end{bmatrix}$. Which of the following statements are correct?\nI. If $k = 2$, then $\\dim N(A) = 2$.\nII. If $k \\ne 2$, then the columns of $A$ span $\\mathbb{R}^3$.\nIII. For every $k$, $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}\\in\\mathbb{R}^3$.\nIV. For every $k$, $\\dim C(A^T) \\ge 2$.",
    options: ["I and II only", "I, II and IV only", "II and IV only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "$R_2 - 2R_1 = (0,1,1,1)$, $R_3 - R_1 = (0,1,k-1,1)$, then $R_3 - R_2 = (0,0,k-2,0)$.\nI: $k = 2$ gives 2 pivots, so $\\dim N(A) = 4 - 2 = 2$ ✓.\nII: $k\\ne2$ gives 3 pivots (one per row), so $C(A) = \\mathbb{R}^3$ ✓.\nIII: fails at $k = 2$ (rank 2 < 3) ✗.\nIV: the first two rows always give 2 pivots ✓.\nSo I, II and IV only.",
  },
  {
    subtopic: "Null space",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & -2 & 0 & 3 & -1 \\\\ 2 & -4 & 1 & 8 & 0 \\\\ -1 & 2 & 1 & -1 & 3 \\end{bmatrix}$. Which set is a basis for $N(A)$?",
    options: [
      "$\\{(-2,1,0,0,0),\\ (3,0,2,1,0),\\ (-1,0,2,0,1)\\}$",
      "$\\{(1,-2,0,3,-1),\\ (0,0,1,2,2)\\}$",
      "$\\{(2,1,0,0,0),\\ (-3,0,-2,1,0)\\}$",
      "$\\{(2,1,0,0,0),\\ (-3,0,-2,1,0),\\ (1,0,-2,0,1)\\}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$R_2 - 2R_1 = (0,0,1,2,2)$, $R_3 + R_1 = (0,0,1,2,2)$, so $R_3 - R_2 = \\mathbf{0}$ and\n$$R = \\begin{bmatrix} 1 & -2 & 0 & 3 & -1 \\\\ 0 & 0 & 1 & 2 & 2 \\\\ 0 & 0 & 0 & 0 & 0 \\end{bmatrix}.$$\nFree: $x_2, x_4, x_5$. $x_1 = 2x_2 - 3x_4 + x_5$, $x_3 = -2x_4 - 2x_5$, giving $(2,1,0,0,0)$, $(-3,0,-2,1,0)$, $(1,0,-2,0,1)$. Check e.g. $A(1,0,-2,0,1)^T = (1-1,\\ 2-2,\\ -1-2+3) = \\mathbf{0}$ ✓.\nThe first option has every sign flipped in the pivot entries, the second is a basis of the row space, and the third is missing a vector ($\\dim N(A) = 5 - 2 = 3$).",
  },
  {
    subtopic: "Column space",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 & -1 \\\\ 3 & 7 & -1 \\\\ -2 & -5 & 0 \\end{bmatrix}$ and $\\mathbf{b} = (1, 3, p)$. For which $p$ is $A\\mathbf{x} = \\mathbf{b}$ consistent, and how many solutions does it then have?",
    options: [
      "$p = -2$; exactly one solution",
      "$p = 2$; infinitely many solutions",
      "$p = -2$; infinitely many solutions",
      "$p = 4$; exactly one solution",
      "every $p$; infinitely many solutions",
    ],
    answer: 2,
    solution:
      "Row reduce $[A\\mid\\mathbf{b}]$: $R_2 - 3R_1$ gives $(0,1,2\\mid b_2 - 3b_1)$ and $R_3 + 2R_1$ gives $(0,-1,-2\\mid b_3 + 2b_1)$. Adding: $(0,0,0 \\mid b_3 + b_2 - b_1)$.\nSo $\\mathbf{b}\\in C(A) \\iff -b_1 + b_2 + b_3 = 0$, i.e. $-1 + 3 + p = 0$, $p = -2$.\n$\\operatorname{rank}A = 2 < 3$ columns, so there is a free variable and a consistent system has **infinitely many** solutions.",
  },
  {
    subtopic: "Coordinates",
    kind: "mcq",
    prompt:
      "$\\mathcal{B} = \\{1 + t,\\ t + t^2,\\ 1 + t^2\\}$ is a basis of $\\mathbb{P}_2$. If $[\\mathbf{p}]_{\\mathcal{B}} = (2, -1, 3)$, what is $\\mathbf{p}(2)$?",
    options: ["$12$", "$9$", "$15$", "$17$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{p} = 2(1+t) - (t+t^2) + 3(1+t^2) = 5 + t + 2t^2$, so $\\mathbf{p}(2) = 5 + 2 + 8 = 15$.\nThe trap answer $12$ treats $(2,-1,3)$ as the coefficients of $1, t, t^2$: $2 - 2 + 12 = 12$.",
  },
  {
    subtopic: "Change of basis",
    kind: "mcq",
    prompt:
      "Let $\\mathcal{B} = \\{\\mathbf{b}_1, \\mathbf{b}_2\\}$ with $\\mathbf{b}_1 = (1,2)$, $\\mathbf{b}_2 = (3,5)$ and $\\mathcal{C} = \\{\\mathbf{c}_1, \\mathbf{c}_2\\}$ with $\\mathbf{c}_1 = (1,1)$, $\\mathbf{c}_2 = (2,3)$. Which of the following statements are correct?\nI. $P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = \\begin{bmatrix} -1 & -1 \\\\ 1 & 2 \\end{bmatrix}$\nII. $P_{\\mathcal{B}\\leftarrow\\mathcal{C}} = \\begin{bmatrix} -1 & 1 \\\\ -1 & 2 \\end{bmatrix}$\nIII. $[\\mathbf{b}_1]_{\\mathcal{C}} = (-1, 1)$\nIV. $[\\mathbf{c}_1]_{\\mathcal{B}} = (-2, 1)$",
    options: ["I and III only", "I, II and III only", "II and IV only", "I, III and IV only", "All of the above"],
    answer: 3,
    solution:
      "$P_{\\mathcal{C}}^{-1} = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}$ ($\\det P_{\\mathcal{C}} = 1$), so $P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = P_{\\mathcal{C}}^{-1}P_{\\mathcal{B}} = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}\\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\end{bmatrix} = \\begin{bmatrix} -1 & -1 \\\\ 1 & 2 \\end{bmatrix}$: I ✓.\nIII: its first column: $-(1,1) + (2,3) = (1,2) = \\mathbf{b}_1$ ✓.\nII: $P_{\\mathcal{B}\\leftarrow\\mathcal{C}}$ is the **inverse**, $\\begin{bmatrix} -2 & -1 \\\\ 1 & 1 \\end{bmatrix}$; the matrix given is the transpose ✗.\nIV: first column of the inverse: $-2(1,2) + (3,5) = (1,1) = \\mathbf{c}_1$ ✓.\nSo I, III and IV only.",
  },
  {
    subtopic: "Change of basis",
    kind: "mcq",
    prompt:
      "With $\\mathbf{b}_1 = (1,2)$, $\\mathbf{b}_2 = (3,5)$, $\\mathbf{c}_1 = (1,1)$, $\\mathbf{c}_2 = (2,3)$ as above, suppose $[\\mathbf{x}]_{\\mathcal{B}} = (2, -1)$. Find $[\\mathbf{x}]_{\\mathcal{C}}$.",
    options: ["$(-1, -1)$", "$(-1, 0)$", "$(0, -1)$", "$(-3, 0)$", NOTA],
    answer: 1,
    solution:
      "$[\\mathbf{x}]_{\\mathcal{C}} = P_{\\mathcal{C}\\leftarrow\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}} = \\begin{bmatrix} -1 & -1 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} 2 \\\\ -1 \\end{bmatrix} = (-1, 0)$.\nCheck: $\\mathbf{x} = 2\\mathbf{b}_1 - \\mathbf{b}_2 = (-1, -1)$ and $-1\\cdot\\mathbf{c}_1 + 0\\cdot\\mathbf{c}_2 = (-1,-1)$ ✓. $(-1,-1)$ is the **standard** coordinate vector of $\\mathbf{x}$, not $[\\mathbf{x}]_{\\mathcal{C}}$.",
  },
  {
    subtopic: "Dimension",
    kind: "mcq",
    prompt: "What is the dimension of the subspace of $M_{3\\times3}$ consisting of the upper triangular matrices with trace $0$?",
    options: ["$6$", "$3$", "$8$", "$5$", NOTA],
    answer: 3,
    solution:
      "Upper triangular $3\\times3$ matrices have $6$ free entries (on and above the diagonal). The trace condition $a_{11} + a_{22} + a_{33} = 0$ is one independent linear condition on them, leaving $6 - 1 = 5$. (A basis: $E_{12}, E_{13}, E_{23}, E_{11} - E_{33}, E_{22} - E_{33}$.)",
  },
  {
    subtopic: "Dimension",
    kind: "mcq",
    prompt: "What is $\\dim\\{\\mathbf{p}\\in\\mathbb{P}_3 : \\mathbf{p}(1) = 0 \\text{ and } \\mathbf{p}'(1) = 0\\}$?",
    options: ["$1$", "$2$", "$3$", "$4$", NOTA],
    answer: 1,
    solution:
      "$\\mathbf{p}(1) = \\mathbf{p}'(1) = 0$ means $(t-1)^2$ divides $\\mathbf{p}$, so $\\mathbf{p} = (t-1)^2(a + bt)$ with $a, b$ free: basis $\\{(t-1)^2,\\ t(t-1)^2\\}$, dimension $2$. Equivalently, $\\dim\\mathbb{P}_3 = 4$ minus 2 independent linear conditions.",
  },
  {
    subtopic: "Four fundamental subspaces",
    kind: "mcq",
    prompt: "$A$ is $m\\times n$ and $B$ is $n\\times p$. Which of the following is **false**?",
    options: [
      "$\\dim N(A) + \\dim C(A^T) = n$",
      "$\\operatorname{rank}(A^TA) = \\operatorname{rank}A$",
      "If $A$ is row equivalent to $R$, then $C(A) = C(R)$",
      "If $AB = 0$, then $\\operatorname{rank}A + \\operatorname{rank}B \\le n$",
      "$\\dim N(A^T) = m - \\operatorname{rank}A$",
    ],
    answer: 2,
    solution:
      "Row operations can change the column space (e.g. $\\begin{bmatrix}1\\\\1\\end{bmatrix}\\sim\\begin{bmatrix}1\\\\0\\end{bmatrix}$), so C is false.\nA and E are the Rank Theorem for $A$ and $A^T$. B: $N(A^TA) = N(A)$, and both have $n$ columns. D: $AB = 0$ gives $C(B)\\subseteq N(A)$, so $\\operatorname{rank}B \\le n - \\operatorname{rank}A$.",
  },
  {
    subtopic: "Extending a basis",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{w}_1 = (1, 1, 0, 2)$ and $\\mathbf{w}_2 = (0, 1, 1, 1)$. Which of the following sets is a basis for $\\mathbb{R}^4$?",
    options: [
      "$\\{\\mathbf{w}_1, \\mathbf{w}_2, (1, 2, 1, 3), \\mathbf{e}_4\\}$",
      "$\\{\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{e}_2, (1, 0, 1, 3)\\}$",
      "$\\{\\mathbf{w}_1, \\mathbf{w}_2, (1, 0, -1, 1), \\mathbf{e}_1\\}$",
      "$\\{\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{e}_1, \\mathbf{e}_2\\}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "D: $\\mathbf{w}_1 - \\mathbf{e}_1 - \\mathbf{e}_2 = (0,0,0,2)$ gives $\\mathbf{e}_4$, then $\\mathbf{w}_2 - \\mathbf{e}_2 - \\mathbf{e}_4 = \\mathbf{e}_3$, so the span contains all four standard vectors: a basis ✓.\nA: $(1,2,1,3) = \\mathbf{w}_1 + \\mathbf{w}_2$. B: $(1,0,1,3) = \\mathbf{w}_1 + \\mathbf{w}_2 - 2\\mathbf{e}_2$. C: $(1,0,-1,1) = \\mathbf{w}_1 - \\mathbf{w}_2$. Each of these sets is dependent.",
  },
  {
    subtopic: "Rank theorem",
    kind: "tfn",
    prompt: "$A$ is a $6\\times4$ matrix of rank 4 and $\\mathbf{b}\\in\\mathbb{R}^6$. Then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Rank 4 means $N(A) = \\{\\mathbf{0}\\}$, so there is **at most** one solution. But $C(A)$ is only a 4-dimensional subspace of $\\mathbb{R}^6$: if $\\mathbf{b}\\in C(A)$ there is exactly one solution, otherwise none. Since $\\mathbf{b}$ is arbitrary, **cannot be determined**.",
  },
  {
    subtopic: "Bases & dimension",
    kind: "tfn",
    prompt:
      "$H$ is a 3-dimensional subspace of $\\mathbb{R}^5$ and $\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\in H$ are linearly independent. Then $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ is a basis for $H$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Basis Theorem: in a $p$-dimensional space, any $p$ linearly independent vectors automatically span it. Here $p = 3$. The ambient space $\\mathbb{R}^5$ is irrelevant. **True**.",
  },
  {
    subtopic: "Four fundamental subspaces",
    kind: "tfn",
    prompt: "$A$ and $B$ are $3\\times3$ matrices with $C(A) = C(B)$. Then $N(A) = N(B)$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Equal column spaces give equal ranks, hence $\\dim N(A) = \\dim N(B)$, but not equal null spaces. $A = \\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&0&0\\end{bmatrix}$ and $B = \\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix}$ both have column space $\\operatorname{Span}\\{\\mathbf{e}_1,\\mathbf{e}_2\\}$, yet $N(A) = \\operatorname{Span}\\{\\mathbf{e}_3\\}$ and $N(B) = \\operatorname{Span}\\{\\mathbf{e}_1\\}$. With $B = A$ they are equal. **Cannot be determined**.",
  },
  {
    subtopic: "Rank theorem",
    kind: "tfn",
    prompt: "For every $4\\times6$ matrix $A$, $\\dim N(A) \\ge 2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\operatorname{rank}A\\le\\min(4,6) = 4$, so $\\dim N(A) = 6 - \\operatorname{rank}A \\ge 2$. **True**.",
  },
  {
    subtopic: "Invertible Matrix Theorem",
    kind: "tfn",
    prompt: "$A$ is $5\\times5$ and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution. Then the rows of $A$ form a basis of $\\mathbb{R}^5$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$N(A) = \\{\\mathbf{0}\\}$ gives $\\operatorname{rank}A = 5$, so $\\dim C(A^T) = 5$: the 5 rows span the 5-dimensional row space $C(A^T) = \\mathbb{R}^5$, hence form a basis (Invertible Matrix Theorem: $A^T$ is invertible too). **True**.",
  },
  {
    subtopic: "Subspaces",
    kind: "tfn",
    prompt: "Fix $B\\in M_{2\\times2}$. The set $\\{A\\in M_{2\\times2} : AB = BA\\}$ is a subspace of $M_{2\\times2}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$0B = B0$, so $0$ is in the set. If $AB = BA$ and $CB = BC$, then $(A+C)B = AB + CB = BA + BC = B(A+C)$ and $(cA)B = c(AB) = c(BA) = B(cA)$. All three conditions hold for every $B$. **True**.",
  },
];
