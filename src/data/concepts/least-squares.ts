import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const leastSquaresConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (18)
  {
    subtopic: "Uniqueness",
    kind: "tfn",
    prompt: "The least-squares solution $\\hat{\\mathbf{x}}$ of $A\\mathbf{x} = \\mathbf{b}$ is always unique.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\hat{\\mathbf{x}}$ is unique **iff** the columns of $A$ are linearly independent (iff $A^TA$ is invertible). If $A$ has dependent columns, then $\\hat{\\mathbf{x}} + \\mathbf{n}$ is also a least-squares solution for any $\\mathbf{n}\\in\\operatorname{Nul}A$, so there are infinitely many. Since that can happen, \"always\" fails: **False**.",
  },
  {
    subtopic: "Normal equations",
    kind: "tfn",
    prompt: "The normal equations $A^TA\\mathbf{x} = A^T\\mathbf{b}$ have no solution when $A^TA$ is singular.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The normal equations are **always consistent**. $\\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$ lies in $\\operatorname{Col}A$, so some $\\hat{\\mathbf{x}}$ has $A\\hat{\\mathbf{x}} = \\hat{\\mathbf{b}}$, and that $\\hat{\\mathbf{x}}$ solves them. When $A^TA$ is singular there are **infinitely many** solutions, not none. **False**.",
  },
  {
    subtopic: "Projection matrix",
    kind: "tfn",
    prompt:
      "$A$ has linearly independent columns and $A = QR$ is its economy QR factorization. Then $P = A(A^TA)^{-1}A^T$ also equals $QQ^T$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Substitute $A = QR$: $A^TA = R^TQ^TQR = R^TR$. So $P = QR(R^TR)^{-1}R^TQ^T = QRR^{-1}(R^T)^{-1}R^TQ^T = QQ^T$, using that $R$ is invertible. Both are the projection onto $\\operatorname{Col}A = \\operatorname{Col}Q$. **True**.",
  },
  {
    subtopic: "Consistency",
    kind: "tfn",
    prompt: "If $A\\mathbf{x} = \\mathbf{b}$ is consistent, then every least-squares solution is an exact solution of $A\\mathbf{x} = \\mathbf{b}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $\\mathbf{b}\\in\\operatorname{Col}A$, then $\\hat{\\mathbf{b}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b} = \\mathbf{b}$. Every least-squares solution satisfies $A\\hat{\\mathbf{x}} = \\hat{\\mathbf{b}} = \\mathbf{b}$, so it solves the original system with zero error. **True**.",
  },
  {
    subtopic: "Uniqueness",
    kind: "tfn",
    prompt:
      "Even when $A\\mathbf{x}=\\mathbf{b}$ has infinitely many least-squares solutions, the vector $A\\hat{\\mathbf{x}}$ is the same for all of them.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Every least-squares solution gives $A\\hat{\\mathbf{x}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$, and that projection is unique. Two solutions differ by a vector in $\\operatorname{Nul}A$, which $A$ sends to $\\mathbf{0}$. So $\\hat{\\mathbf{b}} = A\\hat{\\mathbf{x}}$ (and the error $\\|\\mathbf{b}-A\\hat{\\mathbf{x}}\\|$) is unique even when $\\hat{\\mathbf{x}}$ is not. **True**.",
  },
  {
    subtopic: "Uniqueness",
    kind: "tfn",
    prompt: "If $A$ is a $3\\times 5$ matrix, then $A\\mathbf{x} = \\mathbf{b}$ has infinitely many least-squares solutions for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\operatorname{rank}A \\le 3 < 5$, so the 5 columns are always dependent and $\\operatorname{Nul}A \\ne \\{\\mathbf{0}\\}$. Least-squares solutions always exist (the normal equations are consistent), and adding any null-space vector gives another one. So there are infinitely many for every $\\mathbf{b}$. **True**.",
  },
  {
    subtopic: "Uniqueness",
    kind: "tfn",
    prompt: "If $A$ is a $5\\times 3$ matrix, then $A\\mathbf{x} = \\mathbf{b}$ has a unique least-squares solution for every $\\mathbf{b}\\in\\mathbb{R}^5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Being tall does **not** guarantee independent columns. If $\\operatorname{rank}A = 3$, $A^TA$ is invertible and $\\hat{\\mathbf{x}}$ is unique. If $\\operatorname{rank}A < 3$ (e.g. two equal columns), there are infinitely many. The rank is not given: **Not enough information**.",
  },
  {
    subtopic: "Normal equations",
    kind: "tfn",
    prompt: "If $A$ is $m\\times n$ with $m < n$, then $A^TA$ is invertible.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A^TA$ is $n\\times n$ but $\\operatorname{rank}(A^TA) = \\operatorname{rank}A \\le m < n$. So $A^TA$ is **always singular** for a wide matrix. In data terms, there are more parameters (features) than data points, which the course flags as one cause of non-invertible $A^TA$. **False**.",
  },
  {
    subtopic: "Normal equations",
    kind: "tfn",
    prompt: "If $\\hat{\\mathbf{x}}$ is a least-squares solution of $A\\mathbf{x} = \\mathbf{b}$, then $\\mathbf{b} - A\\hat{\\mathbf{x}}$ is orthogonal to $A\\hat{\\mathbf{x}}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The residual $\\mathbf{b} - A\\hat{\\mathbf{x}}$ lies in $(\\operatorname{Col}A)^\\perp$; that is what $A^T(\\mathbf{b}-A\\hat{\\mathbf{x}}) = \\mathbf{0}$ says. $A\\hat{\\mathbf{x}}$ lies in $\\operatorname{Col}A$, so the two are orthogonal. Note the residual is generally **not** orthogonal to $\\mathbf{b}$ itself. **True**.",
  },
  {
    subtopic: "Least-squares error",
    kind: "tfn",
    prompt: "Let $\\hat{\\mathbf{x}}$ be a least-squares solution of $A\\mathbf{x} = \\mathbf{b}$. Then $\\mathbf{b} - A\\hat{\\mathbf{x}} = \\mathbf{0}$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The residual is zero exactly when $\\mathbf{b}\\in\\operatorname{Col}A$ (the system is consistent). For an inconsistent system it is a nonzero vector in $(\\operatorname{Col}A)^\\perp$. Nothing tells us whether $\\mathbf{b}\\in\\operatorname{Col}A$: **Not enough information**.",
  },
  {
    subtopic: "Projection matrix",
    kind: "tfn",
    prompt:
      "Let $A$ have linearly independent columns and $P = A(A^TA)^{-1}A^T$. Then $P^2 = P$ and $P^T = P$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$P^2 = A(A^TA)^{-1}(A^TA)(A^TA)^{-1}A^T = A(A^TA)^{-1}A^T = P$: projecting twice changes nothing (idempotent). $P^T = A\\big((A^TA)^{-1}\\big)^TA^T = P$ because $A^TA$ is symmetric. **True**: these two properties characterise orthogonal projection matrices.",
  },
  {
    subtopic: "Projection matrix",
    kind: "tfn",
    prompt: "If $P$ is the projection matrix onto $\\operatorname{Col}A$, then $I - P$ projects onto $\\operatorname{Nul}A$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(I-P)\\mathbf{b} = \\mathbf{b} - \\hat{\\mathbf{b}}$ is the residual, which lies in $(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}(A^T)$, a subspace of $\\mathbb{R}^m$. $\\operatorname{Nul}A$ lives in $\\mathbb{R}^n$, a different space unless $m = n$. **False**: $I-P$ projects onto $\\operatorname{Nul}A^T$.",
  },
  {
    subtopic: "Projection matrix",
    kind: "tfn",
    prompt:
      "$A$ is $6\\times 2$ with linearly independent columns. Then $P = A(A^TA)^{-1}A^T$ is invertible.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$P$ is $6\\times 6$ but has rank 2 (its column space is $\\operatorname{Col}A$), so it is singular. It sends every vector of $(\\operatorname{Col}A)^\\perp$ to $\\mathbf{0}$. The only invertible projection matrix is $I$ (projecting onto the whole space). **False**.",
  },
  {
    subtopic: "Linear models",
    kind: "tfn",
    prompt:
      "A line $y = \\beta_0 + \\beta_1 x$ is fitted by least squares to three data points with distinct $x$-values. The least-squares error is zero.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The error is zero iff $\\mathbf{y}\\in\\operatorname{Col}X$, i.e. iff the three points are collinear. Distinct $x$-values make $X$ have independent columns (so $\\hat{\\boldsymbol\\beta}$ is unique), but say nothing about collinearity. Without the data values: **Not enough information**.",
  },
  {
    subtopic: "Linear models",
    kind: "tfn",
    prompt:
      "Fitting $y = \\beta_0 + \\beta_1 x + \\beta_2 x^2$ to data by least squares can be done with the normal equations $X^TX\\boldsymbol\\beta = X^T\\mathbf{y}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The model is nonlinear in $x$ but **linear in the parameters** $\\beta_0, \\beta_1, \\beta_2$. Each data point gives a linear equation $\\beta_0 + \\beta_1 x_j + \\beta_2 x_j^2 = y_j$, so $X$ has columns $\\mathbf{1}, \\mathbf{x}, \\mathbf{x}^2$ and the usual least-squares machinery applies. **True**.",
  },
  {
    subtopic: "Linear models",
    kind: "tfn",
    prompt: "The model $y = \\beta_0 e^{\\beta_1 x}$ is linear in the parameters $\\beta_0, \\beta_1$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\beta_1$ appears inside the exponential, so $y$ is not a linear combination of the parameters, and $X\\boldsymbol\\beta = \\mathbf{y}$ cannot be written directly. (You can make it linear by taking logs: $\\ln y = \\ln\\beta_0 + \\beta_1x$ is linear in $\\ln\\beta_0$ and $\\beta_1$. That is a transformed model.) **False**.",
  },
  {
    subtopic: "Normal equations",
    kind: "tfn",
    prompt:
      "Let $A$ be $m\\times n$ and suppose $A^T\\mathbf{b} = \\mathbf{0}$. Then $\\hat{\\mathbf{x}} = \\mathbf{0}$ is the unique least-squares solution of $A\\mathbf{x}=\\mathbf{b}$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\mathbf{0}$ certainly solves $A^TA\\mathbf{x} = A^T\\mathbf{b} = \\mathbf{0}$, so it **is** a least-squares solution ($\\mathbf{b}\\perp\\operatorname{Col}A$, so $\\hat{\\mathbf{b}} = \\mathbf{0}$). It is the **only** one iff $\\operatorname{Nul}A = \\{\\mathbf{0}\\}$, and the columns of $A$ are not described. **Not enough information**.",
  },
  {
    subtopic: "Consistency",
    kind: "tfn",
    prompt: "$A$ is a $5\\times 3$ matrix with rank 3 and $\\mathbf{b}\\in\\mathbb{R}^5$. Then $A\\mathbf{x} = \\mathbf{b}$ is inconsistent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\operatorname{Col}A$ is a 3-dimensional subspace of $\\mathbb{R}^5$. The system is consistent iff $\\mathbf{b}\\in\\operatorname{Col}A$ (iff $\\operatorname{rank}A = \\operatorname{rank}[A\\,|\\,\\mathbf{b}]$). An over-determined system is *typically* inconsistent, but it depends on $\\mathbf{b}$, which is not given. **Not enough information**.",
  },

  // ---------------------------------------------------------------- MCQ (12)
  {
    subtopic: "Normal equations",
    kind: "mcq",
    prompt:
      "Find the least-squares solution of $A\\mathbf{x} = \\mathbf{b}$ for $A = \\begin{bmatrix}4&0\\\\0&2\\\\1&1\\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix}2\\\\0\\\\11\\end{bmatrix}$.",
    options: ["$(2, 1)$", "$(19, 11)$", "$(1, 2)$", "$(1/2, 0)$", NOTA],
    answer: 2,
    solution:
      "$A^TA = \\begin{bmatrix}17&1\\\\1&5\\end{bmatrix}$ and $A^T\\mathbf{b} = (19, 11)$. Solving $17x_1 + x_2 = 19$, $x_1 + 5x_2 = 11$ gives $\\hat{\\mathbf{x}} = (1, 2)$. $(19,11)$ is $A^T\\mathbf{b}$, not the solution.",
  },
  {
    subtopic: "Least-squares error",
    kind: "mcq",
    prompt:
      "For $A = \\begin{bmatrix}4&0\\\\0&2\\\\1&1\\end{bmatrix}$, $\\mathbf{b} = (2, 0, 11)$ and least-squares solution $\\hat{\\mathbf{x}} = (1, 2)$, what is the least-squares error $\\|\\mathbf{b} - A\\hat{\\mathbf{x}}\\|$?",
    options: ["$0$", "$84$", "$\\sqrt{21}$", "$\\sqrt{84}$", NOTA],
    answer: 3,
    solution:
      "$A\\hat{\\mathbf{x}} = (4, 4, 3)$, so the residual is $\\mathbf{b} - A\\hat{\\mathbf{x}} = (-2, -4, 8)$. Its norm is $\\sqrt{4 + 16 + 64} = \\sqrt{84}$. $84$ is the **squared** error, a common slip. Check: the residual is orthogonal to both columns, $(-2,-4,8)\\cdot(4,0,1) = 0$ and $(-2,-4,8)\\cdot(0,2,1) = 0$.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "Find the least-squares line $y = \\beta_0 + \\beta_1x$ for the data points $(0, 1), (1, 1), (2, 4)$.",
    options: [
      "$\\beta_0 = 1,\\ \\beta_1 = 1$",
      "$\\beta_0 = 0.5,\\ \\beta_1 = 1.5$",
      "$\\beta_0 = 1.5,\\ \\beta_1 = 0.5$",
      "$\\beta_0 = 0,\\ \\beta_1 = 2$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$X = \\begin{bmatrix}1&0\\\\1&1\\\\1&2\\end{bmatrix}$, $X^TX = \\begin{bmatrix}3&3\\\\3&5\\end{bmatrix}$, $X^T\\mathbf{y} = (6, 9)$. Solving gives $\\beta_1 = 1.5$, $\\beta_0 = 0.5$. Check: predictions $0.5, 2, 3.5$ give residuals $(0.5, -1, 0.5)$, which sum to 0 (orthogonal to $\\mathbf{1}$) and have $\\mathbf{x}\\cdot\\text{residual} = 0 - 1 + 1 = 0$.",
  },
  {
    subtopic: "QR method",
    kind: "mcq",
    prompt:
      "$A = QR$ (economy, independent columns) with $R = \\begin{bmatrix}2&1\\\\0&3\\end{bmatrix}$ and $Q^T\\mathbf{b} = \\begin{bmatrix}5\\\\6\\end{bmatrix}$. What is the least-squares solution $\\hat{\\mathbf{x}}$?",
    options: ["$(2, 2)$", "$(1, 2)$", "$(5/2, 2)$", "$(2, 3/2)$", NOTA],
    answer: 4,
    solution:
      "Solve $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$ by back-substitution: $3x_2 = 6 \\Rightarrow x_2 = 2$. Then $2x_1 + 2 = 5 \\Rightarrow x_1 = 3/2$. So $\\hat{\\mathbf{x}} = (3/2, 2)$, which is not listed: **None of the above**. $(5/2, 2)$ forgets to subtract the $x_2$ term.",
  },
  {
    subtopic: "Uniqueness",
    kind: "mcq",
    prompt:
      "$A$ is a $6\\times 4$ matrix of rank 3 and $\\mathbf{b}\\in\\mathbb{R}^6$ is arbitrary. How many least-squares solutions does $A\\mathbf{x} = \\mathbf{b}$ have?",
    options: [
      "Infinitely many",
      "Exactly one",
      "None, if $A\\mathbf{x}=\\mathbf{b}$ is inconsistent",
      "Exactly 3",
      NOTA,
    ],
    answer: 0,
    solution:
      "Least-squares solutions **always** exist, because the normal equations are consistent. Rank $3 < 4$ columns means $\\operatorname{Nul}A$ has dimension $4 - 3 = 1$, and adding any null-space vector to $\\hat{\\mathbf{x}}$ gives another solution. So there are infinitely many, all with the same $A\\hat{\\mathbf{x}}$.",
  },
  {
    subtopic: "Projection matrix",
    kind: "mcq",
    prompt: "What is the projection matrix onto the line spanned by $\\mathbf{a} = (1, 2)$ in $\\mathbb{R}^2$?",
    options: [
      "$\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$",
      "$\\frac{1}{5}\\begin{bmatrix}4&-2\\\\-2&1\\end{bmatrix}$",
      "$\\frac{1}{5}\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$",
      "$\\frac{1}{\\sqrt5}\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$P = \\dfrac{\\mathbf{a}\\mathbf{a}^T}{\\mathbf{a}^T\\mathbf{a}} = \\dfrac15\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$ (this is $A(A^TA)^{-1}A^T$ with $A = \\mathbf{a}$). Without the $1/5$ the matrix is not idempotent. $\\frac15\\begin{bmatrix}4&-2\\\\-2&1\\end{bmatrix} = I - P$ projects onto the orthogonal line. Quick check: $\\operatorname{trace}P = 1 = \\operatorname{rank}P$.",
  },
  {
    subtopic: "Projection matrix",
    kind: "mcq",
    prompt:
      "$A$ is $5\\times 3$ with linearly independent columns and $P = A(A^TA)^{-1}A^T$. Which is true?",
    options: [
      "$P$ is $5\\times5$ and invertible",
      "$P$ is $5\\times5$, has rank 3 and satisfies $P^2 = P$",
      "$P = I_5$ because $(A^TA)^{-1}A^TA = I$",
      "$P$ is $3\\times 3$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$P$ is $(5\\times3)(3\\times3)(3\\times5) = 5\\times5$. Its column space is $\\operatorname{Col}A$, so its rank is 3, and it is idempotent. You **cannot** cancel to get $I$: $A(A^TA)^{-1}A^T \\ne AA^{-1}(A^T)^{-1}A^T$ because $A$ is not square, so $A^{-1}$ does not exist. $(A^TA)^{-1}A^TA = I_3$ is a different product.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "To fit $y = \\beta_0 + \\beta_1x + \\beta_2x^2$ to the points $(-1, 3), (0, 1), (2, 5)$, what is the design matrix $X$?",
    options: [
      "$\\begin{bmatrix}1&-1&1\\\\1&0&0\\\\1&2&4\\end{bmatrix}$",
      "$\\begin{bmatrix}1&3&9\\\\1&1&1\\\\1&5&25\\end{bmatrix}$",
      "$\\begin{bmatrix}-1&1&1\\\\0&0&1\\\\2&4&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&-1&-1\\\\1&0&0\\\\1&2&2\\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Row $j$ of $X$ is $(1, x_j, x_j^2)$, matching the parameter order $\\beta_0, \\beta_1, \\beta_2$. With $x = -1, 0, 2$ the rows are $(1,-1,1), (1,0,0), (1,2,4)$. The $y$-values go into the observation vector $\\mathbf{y} = (3,1,5)$, **not** into $X$. The third option has the right entries but its columns are in the wrong order for $\\boldsymbol\\beta = (\\beta_0,\\beta_1,\\beta_2)$.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt: "Which model is **not** linear in its parameters (so it cannot be fitted directly with $X\\boldsymbol\\beta = \\mathbf{y}$)?",
    options: [
      "$y = \\beta_0 + \\beta_1\\sin x + \\beta_2\\cos x$",
      "$y = \\beta_0x + \\beta_1x^3$",
      "$y = \\beta_0 + \\beta_1\\ln x$",
      "$y = \\beta_0 + e^{\\beta_1 x}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "\"Linear in the parameters\" means $y$ is a linear combination of fixed functions of $x$ with the $\\beta$'s as coefficients. The first three qualify, with columns $(1, \\sin x, \\cos x)$, $(x, x^3)$ and $(1, \\ln x)$. In $\\beta_0 + e^{\\beta_1x}$, $\\beta_1$ sits inside the exponential, so it is nonlinear in $\\beta_1$.",
  },
  {
    subtopic: "Normal equations",
    kind: "mcq",
    prompt: "For an $m\\times n$ matrix $A$, which statement about the normal equations $A^TA\\mathbf{x} = A^T\\mathbf{b}$ is **false**?",
    options: [
      "$A^TA$ is an $n\\times n$ symmetric matrix",
      "If $A^TA$ is singular, $A\\mathbf{x}=\\mathbf{b}$ has no least-squares solution",
      "They are consistent for every $\\mathbf{b}$",
      "Their solution set equals the set of least-squares solutions of $A\\mathbf{x}=\\mathbf{b}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "A singular $A^TA$ means **infinitely many** least-squares solutions, never zero. The normal equations always have a solution, because $\\hat{\\mathbf{b}}\\in\\operatorname{Col}A$. The other statements are true: $(A^TA)^T = A^TA$, and Lay Thm 13 says the solutions of the normal equations are exactly the least-squares solutions.",
  },
  {
    subtopic: "Consistency",
    kind: "mcq",
    prompt:
      "$A$ is $4\\times 3$ with $\\operatorname{rank}A = 2$ and $\\operatorname{rank}[A\\,|\\,\\mathbf{b}] = 3$. Which describes $A\\mathbf{x}=\\mathbf{b}$?",
    options: [
      "Inconsistent; infinitely many least-squares solutions",
      "Consistent; exactly one solution",
      "Consistent; infinitely many solutions",
      "Inconsistent; exactly one least-squares solution",
      NOTA,
    ],
    answer: 0,
    solution:
      "$\\operatorname{rank}A < \\operatorname{rank}[A|\\mathbf{b}]$ means $\\mathbf{b}\\notin\\operatorname{Col}A$, so the system is inconsistent. Least-squares solutions still exist. Since $\\operatorname{rank}A = 2 < 3$ columns, $\\operatorname{Nul}A$ is 1-dimensional and the least-squares solution is not unique: infinitely many.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "Find the least-squares line $y = \\beta_0 + \\beta_1x$ for the data $(2, 1), (5, 2), (7, 3), (8, 3)$.",
    options: [
      "$\\beta_0 = 5/14,\\ \\beta_1 = 2/7$",
      "$\\beta_0 = 0,\\ \\beta_1 = 3/8$",
      "$\\beta_0 = 9/4,\\ \\beta_1 = 0$",
      "$\\beta_0 = 2/7,\\ \\beta_1 = 5/14$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$X^TX = \\begin{bmatrix}4 & 22\\\\22 & 142\\end{bmatrix}$ and $X^T\\mathbf{y} = (9, 57)$. The determinant is $568 - 484 = 84$, so $\\boldsymbol\\beta = \\tfrac{1}{84}\\begin{bmatrix}142 & -22\\\\-22 & 4\\end{bmatrix}(9,57) = \\tfrac{1}{84}(24, 30) = (2/7, 5/14)$. The first option swaps intercept and slope.",
  },
];
