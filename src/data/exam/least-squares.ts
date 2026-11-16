import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (five-option MCQs + True/False/Cannot-determine parts). */
export const leastSquaresExam: ConceptQuestion[] = [
  // ---------------------------------------------------------------- computing x-hat
  {
    subtopic: "Normal equations",
    kind: "mcq",
    prompt:
      "Find the least-squares solution $\\hat{\\mathbf{x}}$ of $A\\mathbf{x} = \\mathbf{b}$ and the least-squares error, where $A = \\begin{bmatrix}1&1\\\\2&0\\\\0&1\\\\1&2\\end{bmatrix}$ and $\\mathbf{b} = \\begin{bmatrix}-1\\\\5\\\\1\\\\0\\end{bmatrix}$.",
    options: [
      "$\\hat{\\mathbf{x}} = (2, -1)$, error $9$",
      "$\\hat{\\mathbf{x}} = (3/2, 0)$, error $3$",
      "$\\hat{\\mathbf{x}} = (2, -1)$, error $3$",
      "$\\hat{\\mathbf{x}} = (5/2, -7/2)$, error $0$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$A^TA = \\begin{bmatrix}6&3\\\\3&6\\end{bmatrix}$ and $A^T\\mathbf{b} = (-1 + 10 + 0 + 0,\\ -1 + 0 + 1 + 0) = (9, 0)$.\nSolve $6x_1 + 3x_2 = 9$, $3x_1 + 6x_2 = 0$: the second gives $x_1 = -2x_2$, then $-9x_2 = 9$. So $\\hat{\\mathbf{x}} = (2, -1)$.\n$A\\hat{\\mathbf{x}} = (1, 4, -1, 0)$, the residual is $\\mathbf{b} - A\\hat{\\mathbf{x}} = (-2, 1, 2, 0)$, and the error is $\\sqrt{4+1+4} = 3$. Check: $A^T(-2,1,2,0) = (0,0)$.\n**Traps:** $9$ is the **squared** error. $(3/2, 0)$ ignores the off-diagonal 3s in $A^TA$. $(5/2,-7/2)$ solves only the first two equations exactly, which is not least squares.",
  },
  {
    subtopic: "QR method",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&3\\\\1&1\\\\1&3\\\\1&1\\end{bmatrix}$ and $\\mathbf{b} = (3, 1, 5, -1)$. Using the QR factorization of $A$ (Gram–Schmidt, positive diagonal in $R$), find the least-squares solution and the least-squares error.",
    options: [
      "$\\hat{\\mathbf{x}} = (-2, 2)$, error $2$",
      "$\\hat{\\mathbf{x}} = (2, -2)$, error $2$",
      "$\\hat{\\mathbf{x}} = (2, 2)$, error $4$",
      "$\\hat{\\mathbf{x}} = (-2, 2)$, error $4$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Gram–Schmidt: $\\mathbf{q}_1 = \\tfrac12(1,1,1,1)$ with $r_{11} = 2$, and $r_{12} = \\mathbf{q}_1\\cdot\\mathbf{a}_2 = 4$. Then $\\mathbf{v}_2 = \\mathbf{a}_2 - 4\\mathbf{q}_1 = (1,-1,1,-1)$, so $r_{22} = 2$ and $\\mathbf{q}_2 = \\tfrac12(1,-1,1,-1)$. So $R = \\begin{bmatrix}2&4\\\\0&2\\end{bmatrix}$.\n$Q^T\\mathbf{b} = \\big(\\tfrac{3+1+5-1}{2}, \\tfrac{3-1+5+1}{2}\\big) = (4, 4)$.\nBack-substitute $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$: $2x_2 = 4 \\Rightarrow x_2 = 2$, then $2x_1 + 8 = 4 \\Rightarrow x_1 = -2$.\nError: $\\|\\mathbf{b}\\|^2 - \\|Q^T\\mathbf{b}\\|^2 = 36 - 32 = 4$, so the error is $2$. (Directly: $A\\hat{\\mathbf{x}} = (4,0,4,0)$ and the residual is $(-1,1,1,-1)$.)\n**Traps:** $(2,-2)$ solves $R^T\\mathbf{x} = Q^T\\mathbf{b}$. $(2,2)$ skips the back-substitution for $x_1$. $4$ is the squared error.",
  },
  // ---------------------------------------------------------------- statement sets
  {
    subtopic: "Normal equations",
    kind: "mcq",
    prompt:
      "$A$ has linearly independent columns, $\\hat{\\mathbf{x}}_1 \\ne \\mathbf{0}$ is the least-squares solution of $A\\mathbf{x} = \\mathbf{b}$, and $\\mathbf{r} = \\mathbf{b} - A\\hat{\\mathbf{x}}_1$. Which of the following statements are correct?\nI. $A^T\\mathbf{r} = \\mathbf{0}$.\nII. The least-squares solution of $A\\mathbf{x} = \\mathbf{r}$ is $\\mathbf{0}$.\nIII. $\\hat{\\mathbf{x}}_1$ is the least-squares solution of $A\\mathbf{x} = \\mathbf{b} + \\mathbf{r}$.\nIV. $\\hat{\\mathbf{x}}_1$ is the least-squares solution of $A\\mathbf{x} = 2\\mathbf{b}$.\nV. $\\mathbf{r}\\cdot\\mathbf{b} = \\|\\mathbf{r}\\|^2$.",
    options: [
      "I and II only",
      "I, II and III only",
      "I, II, IV and V only",
      "I, II, III and V only",
      "All of the above",
    ],
    answer: 3,
    solution:
      "- I: this is the normal equations $A^T(\\mathbf{b} - A\\hat{\\mathbf{x}}_1) = \\mathbf{0}$, i.e. $\\mathbf{r}\\in(\\operatorname{Col}A)^\\perp$. **Correct.**\n- II: the normal equations for $A\\mathbf{x} = \\mathbf{r}$ are $A^TA\\mathbf{x} = A^T\\mathbf{r} = \\mathbf{0}$. Since $A^TA$ is invertible, $\\mathbf{x} = \\mathbf{0}$. **Correct.** (So \"$\\hat{\\mathbf{x}}_1 + \\mathbf{x}_2$\" with $\\mathbf{x}_2 = \\mathbf{0}$ is still the least-squares solution of the original system.)\n- III: $A^T(\\mathbf{b} + \\mathbf{r}) = A^T\\mathbf{b}$, so the normal equations, and hence the solution, are unchanged. **Correct.**\n- IV: $A^TA\\mathbf{x} = 2A^T\\mathbf{b}$ gives $2\\hat{\\mathbf{x}}_1 \\ne \\hat{\\mathbf{x}}_1$. **Wrong.**\n- V: $\\mathbf{r}\\cdot\\mathbf{b} = \\mathbf{r}\\cdot(A\\hat{\\mathbf{x}}_1 + \\mathbf{r}) = 0 + \\|\\mathbf{r}\\|^2$. **Correct.**",
  },
  {
    subtopic: "Uniqueness",
    kind: "mcq",
    prompt:
      "$A$ is an $m\\times n$ matrix and $\\mathbf{b}\\in\\mathbb{R}^m$. Which of the following statements are correct?\nI. $A\\mathbf{x} = \\mathbf{b}$ has at least one least-squares solution.\nII. If $m > n$, the least-squares solution is unique.\nIII. The least-squares solution is unique if and only if $A^TA$ is invertible.\nIV. If $A\\mathbf{x} = \\mathbf{b}$ is consistent, its least-squares solutions are exactly its solutions.\nV. If $m < n$, there are infinitely many least-squares solutions.",
    options: [
      "I and III only",
      "I, II and III only",
      "I, III, IV and V only",
      "III, IV and V only",
      "All of the above",
    ],
    answer: 2,
    solution:
      "- I: the normal equations are always consistent, because $\\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}\\in\\operatorname{Col}A$. **Correct.**\n- II: a tall matrix can still have dependent columns (e.g. two equal columns), so uniqueness is not guaranteed. **Wrong.**\n- III: unique iff the columns are independent iff $A^TA$ is invertible. **Correct.**\n- IV: if $\\mathbf{b}\\in\\operatorname{Col}A$, then $\\hat{\\mathbf{b}} = \\mathbf{b}$, and $A\\hat{\\mathbf{x}} = \\mathbf{b}$ is the original system. **Correct.**\n- V: with $n > m \\ge \\operatorname{rank}A$, $\\operatorname{Nul}A \\ne \\{\\mathbf{0}\\}$. Adding any null-space vector to a least-squares solution gives another one. **Correct.**",
  },
  {
    subtopic: "Normal equations",
    kind: "mcq",
    prompt:
      "Let $A$ be an $m\\times n$ matrix with $m \\ne n$. Which of the following statements are correct?\nI. $A^TA$ is symmetric.\nII. $\\mathbf{x}^TA^TA\\mathbf{x} = \\|A\\mathbf{x}\\|^2 \\ge 0$ for every $\\mathbf{x}\\in\\mathbb{R}^n$.\nIII. $\\operatorname{Nul}(A^TA) = \\operatorname{Nul}A$.\nIV. $\\operatorname{rank}(A^TA) = \\operatorname{rank}A$.\nV. $A^TA = AA^T$.",
    options: [
      "I and II only",
      "I, II and III only",
      "I, II, III and IV only",
      "I, II and IV only",
      "All of the above",
    ],
    answer: 2,
    solution:
      "- I: $(A^TA)^T = A^T(A^T)^T = A^TA$. **Correct.**\n- II: $\\mathbf{x}^TA^TA\\mathbf{x} = (A\\mathbf{x})^T(A\\mathbf{x})$. **Correct.**\n- III: if $A^TA\\mathbf{x} = \\mathbf{0}$, then $\\|A\\mathbf{x}\\|^2 = \\mathbf{x}^TA^TA\\mathbf{x} = 0$, so $A\\mathbf{x} = \\mathbf{0}$. The other inclusion is obvious. **Correct.**\n- IV: both matrices have $n$ columns and equal null spaces, so by rank–nullity their ranks agree. **Correct.**\n- V: $A^TA$ is $n\\times n$ and $AA^T$ is $m\\times m$, which are different sizes when $m\\ne n$. **Wrong.**",
  },
  // ---------------------------------------------------------------- linear models
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "Fit the model $y = \\dfrac{a}{x} + bx$ by least squares to the data $(x, y) = (-2, -2),\\ (-1, -3),\\ (1, 3),\\ (2, 4)$. What are $a$ and $b$?",
    options: [
      "$a = 1,\\ b = 2$",
      "$a = 2,\\ b = 1$",
      "$a = 18/5,\\ b = 9/5$",
      "$a = 0,\\ b = 9/5$",
      NOTA,
    ],
    answer: 1,
    solution:
      "The model is linear in $a, b$. The design matrix has columns $1/x = (-\\tfrac12, -1, 1, \\tfrac12)$ and $x = (-2, -1, 1, 2)$, and $\\mathbf{y} = (-2,-3,3,4)$.\n$X^TX = \\begin{bmatrix}\\tfrac14+1+1+\\tfrac14 & 1+1+1+1\\\\4 & 10\\end{bmatrix} = \\begin{bmatrix}5/2 & 4\\\\4 & 10\\end{bmatrix}$ and $X^T\\mathbf{y} = (1 + 3 + 3 + 2,\\ 4 + 3 + 3 + 8) = (9, 18)$.\nThe determinant is $25 - 16 = 9$, so $a = \\tfrac{10\\cdot 9 - 4\\cdot18}{9} = 2$ and $b = \\tfrac{\\frac52\\cdot18 - 4\\cdot 9}{9} = 1$.\nCheck: the fitted values are $(-3,-3,3,3)$, and the residual $(1,0,0,1)$ is orthogonal to both columns.\n**Traps:** $(18/5, 9/5)$ divides each entry of $X^T\\mathbf{y}$ by the diagonal of $X^TX$, which ignores the cross term 4 (valid only for orthogonal columns). $b = 9/5$ alone fits $y = bx$ with the $1/x$ term dropped.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "The model $y = \\beta_1x + \\beta_2x^2$ (no intercept) is fitted by least squares to the data $(-1, 0),\\ (1, 6),\\ (2, 7)$. What does the fitted model predict at $x = 3$?",
    options: ["$15$", "$21$", "$27$", "$8$", NOTA],
    answer: 0,
    solution:
      "$X = \\begin{bmatrix}-1&1\\\\1&1\\\\2&4\\end{bmatrix}$ (columns $x$ and $x^2$) and $\\mathbf{y} = (0,6,7)$.\n$X^TX = \\begin{bmatrix}6&8\\\\8&18\\end{bmatrix}$ and $X^T\\mathbf{y} = (20, 34)$. The determinant is $108 - 64 = 44$, so $\\beta_1 = \\tfrac{18\\cdot20 - 8\\cdot34}{44} = 2$ and $\\beta_2 = \\tfrac{6\\cdot34 - 8\\cdot20}{44} = 1$.\nPrediction: $2(3) + 3^2 = 15$. Residual check: $(0,6,7) - (-1,3,8) = (1,3,-1)$ is orthogonal to both columns.\n**Traps:** $21$ swaps the coefficients. $27$ uses $\\beta_1 = 20/6$, $\\beta_2 = 34/18$, ignoring the off-diagonal 8. $8$ extends the line through the last two points.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "The least-squares line $y = \\beta_0 + \\beta_1x$ is fitted to the data $(-1, 0),\\ (0, 1),\\ (1, 3),\\ (2, 4)$. What value does the line predict at $x = 3$?",
    options: ["$5.3$", "$16/3$", "$5.5$", "$7.5$", NOTA],
    answer: 2,
    solution:
      "$X^TX = \\begin{bmatrix}4 & 2\\\\2 & 6\\end{bmatrix}$ ($n = 4$, $\\sum x = 2$, $\\sum x^2 = 6$) and $X^T\\mathbf{y} = (8, 11)$.\nThe determinant is $20$, so $\\beta_0 = \\tfrac{6\\cdot8 - 2\\cdot11}{20} = 1.3$ and $\\beta_1 = \\tfrac{4\\cdot11 - 2\\cdot 8}{20} = 1.4$. Check: the line passes through $(\\bar x,\\bar y) = (0.5, 2)$.\nPrediction: $1.3 + 1.4\\times3 = 5.5$.\n**Traps:** $5.3$ swaps intercept and slope. $16/3$ uses the line through the two end points. $7.5$ treats the columns as orthogonal ($\\beta_0 = \\bar y = 2$, $\\beta_1 = 11/6$), but $\\sum x \\ne 0$, so they are not.",
  },
  {
    subtopic: "Linear models",
    kind: "mcq",
    prompt:
      "When fitting $y = \\beta_0 + \\beta_1x$ to $n$ data points $(x_i, y_i)$ by least squares, the normal equations are $\\begin{bmatrix}5&10\\\\10&30\\end{bmatrix}\\begin{bmatrix}\\beta_0\\\\\\beta_1\\end{bmatrix} = \\begin{bmatrix}20\\\\50\\end{bmatrix}$. Which of the following statements are correct?\nI. There are $n = 5$ data points.\nII. The mean of the $x_i$ is $2$.\nIII. $\\hat\\beta_0 = 2$ and $\\hat\\beta_1 = 1$.\nIV. The residuals $y_i - \\hat\\beta_0 - \\hat\\beta_1x_i$ sum to $0$.\nV. The fitted line passes through $(\\bar x, \\bar y) = (2, 4)$.",
    options: [
      "I and III only",
      "I, II and III only",
      "III, IV and V only",
      "I, II, III and IV only",
      "All of the above",
    ],
    answer: 4,
    solution:
      "For a line, $X^TX = \\begin{bmatrix}n & \\sum x_i\\\\ \\sum x_i & \\sum x_i^2\\end{bmatrix}$ and $X^T\\mathbf{y} = (\\sum y_i, \\sum x_iy_i)$.\n- I: $n = 5$. **Correct.**\n- II: $\\sum x_i = 10$, so $\\bar x = 2$. **Correct.**\n- III: the determinant is $150 - 100 = 50$, so $\\beta_0 = \\tfrac{30\\cdot20 - 10\\cdot 50}{50} = 2$ and $\\beta_1 = \\tfrac{5\\cdot50 - 10\\cdot20}{50} = 1$. **Correct.**\n- IV: the first normal equation is $\\mathbf{1}^T(\\mathbf{y} - X\\hat{\\boldsymbol\\beta}) = 0$. **Correct.**\n- V: divide the first normal equation by $n$ to get $\\hat\\beta_0 + \\hat\\beta_1\\bar x = \\bar y$, where $\\bar y = 20/5 = 4$; indeed $2 + 2 = 4$. **Correct.**\nSo all five hold.",
  },
  // ---------------------------------------------------------------- projection matrix
  {
    subtopic: "Projection matrix",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&0\\\\0&1\\\\1&1\\end{bmatrix}$, whose projection matrix is $P_A = A(A^TA)^{-1}A^T = \\dfrac13\\begin{bmatrix}2&-1&1\\\\-1&2&1\\\\1&1&2\\end{bmatrix}$, and let $B = \\begin{bmatrix}1&2\\\\1&-1\\\\2&1\\end{bmatrix}$. What is $P_B = B(B^TB)^{-1}B^T$?",
    options: [
      "$\\dfrac13\\begin{bmatrix}1&1&-1\\\\1&1&-1\\\\-1&-1&1\\end{bmatrix}$",
      "$\\dfrac19\\begin{bmatrix}5&-1&4\\\\-1&2&1\\\\4&1&5\\end{bmatrix}$",
      "$\\dfrac13\\begin{bmatrix}2&1&1\\\\1&2&-1\\\\1&-1&2\\end{bmatrix}$",
      "$\\dfrac13\\begin{bmatrix}2&-1&1\\\\-1&2&1\\\\1&1&2\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Check whether $\\operatorname{Col}B = \\operatorname{Col}A$: $(1,1,2) = \\mathbf{a}_1 + \\mathbf{a}_2$ and $(2,-1,1) = 2\\mathbf{a}_1 - \\mathbf{a}_2$. So $B = AC$ with $C = \\begin{bmatrix}1&2\\\\1&-1\\end{bmatrix}$, $\\det C = -3 \\ne 0$, and the two column spaces are the same plane.\nThe projection matrix depends only on the subspace: $P_B = AC\\,(C^TA^TAC)^{-1}C^TA^T = A(A^TA)^{-1}A^T = P_A$. (Direct computation with $B^TB = \\begin{bmatrix}6&3\\\\3&6\\end{bmatrix}$ gives the same matrix.)\n**Traps:** the first option is $I - P_A$ (projection onto the normal line $(1,1,-1)$). $\\tfrac19BB^T$ is not idempotent. The third option projects onto a different plane, the one with normal $(1,-1,-1)$.",
  },
  {
    subtopic: "Uniqueness",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&2\\\\2&4\\\\1&2\\end{bmatrix}$ and $\\mathbf{b} = (3, 0, 3)$. Which describes the least-squares solutions of $A\\mathbf{x} = \\mathbf{b}$ and the least-squares error?",
    options: [
      "Unique $\\hat{\\mathbf{x}} = (1, 0)$; error $2\\sqrt3$",
      "All $(x_1, x_2)$ with $x_1 + 2x_2 = 1$; error $2\\sqrt3$",
      "All $(x_1, x_2)$ with $x_1 + 2x_2 = 1$; error $12$",
      "There is none, because $A^TA$ is singular",
      NOTA,
    ],
    answer: 1,
    solution:
      "Column 2 $= 2\\times$ column 1, so $\\operatorname{Col}A = \\operatorname{Span}\\{(1,2,1)\\}$ and $A^TA = \\begin{bmatrix}6&12\\\\12&24\\end{bmatrix}$ is singular.\n$A^T\\mathbf{b} = (6, 12)$, so the normal equations reduce to the single equation $6x_1 + 12x_2 = 6$, i.e. $x_1 + 2x_2 = 1$. That gives infinitely many least-squares solutions, one of which is $(1,0)$.\nEvery one of them gives $A\\hat{\\mathbf{x}} = \\hat{\\mathbf{b}} = \\tfrac{6}{6}(1,2,1) = (1,2,1)$. The residual is $(2,-2,2)$, so the error is $\\sqrt{12} = 2\\sqrt3$.\n**Traps:** least-squares solutions always exist. A singular $A^TA$ means infinitely many, not none, and not a unique one. $12$ is the squared error.",
  },
  {
    subtopic: "Normal equations",
    kind: "mcq",
    prompt:
      "Find the least-squares solution and the least-squares error for $A = \\begin{bmatrix}1&1&0\\\\1&-1&1\\\\1&1&0\\\\1&-1&-1\\end{bmatrix}$, $\\mathbf{b} = (2, 4, 0, -2)$.",
    options: [
      "$\\hat{\\mathbf{x}} = (1, 0, 3)$, error $2$",
      "$\\hat{\\mathbf{x}} = (4, 0, 6)$, error $\\sqrt2$",
      "$\\hat{\\mathbf{x}} = (1, 0, 3/2)$, error $\\sqrt2$",
      "$\\hat{\\mathbf{x}} = (1, 0, 3)$, error $0$",
      NOTA,
    ],
    answer: 4,
    solution:
      "The columns are mutually orthogonal: $\\mathbf{a}_1\\cdot\\mathbf{a}_2 = 1-1+1-1 = 0$, $\\mathbf{a}_1\\cdot\\mathbf{a}_3 = 0+1+0-1 = 0$, $\\mathbf{a}_2\\cdot\\mathbf{a}_3 = 0-1+0+1 = 0$. So $A^TA = \\operatorname{diag}(4, 4, 2)$ and each component is $\\hat x_i = \\dfrac{\\mathbf{a}_i\\cdot\\mathbf{b}}{\\mathbf{a}_i\\cdot\\mathbf{a}_i}$: $\\tfrac44 = 1$, $\\tfrac{2-4+0+2}{4} = 0$, $\\tfrac{0+4+0+2}{2} = 3$.\n$A\\hat{\\mathbf{x}} = (1, 4, 1, -2)$, the residual is $(1, 0, -1, 0)$, and the error is $\\sqrt2$.\nThe correct pair, $(1,0,3)$ with error $\\sqrt2$, is not listed: **None of the above**. Error $2$ is the squared error. $(4,0,6)$ forgets to divide by $\\mathbf{a}_i\\cdot\\mathbf{a}_i$. $3/2$ divides by 4 instead of $\\|\\mathbf{a}_3\\|^2 = 2$.",
  },
  {
    subtopic: "Least-squares error",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&0\\\\1&1\\\\1&2\\end{bmatrix}$. For some $\\mathbf{b}\\in\\mathbb{R}^3$, the least-squares solution $\\hat{\\mathbf{x}}$ of $A\\mathbf{x} = \\mathbf{b}$ is computed. Which vector could be the residual $\\mathbf{b} - A\\hat{\\mathbf{x}}$?",
    options: ["$(1, -1, 0)$", "$(0, 2, -1)$", "$(1, 2, 1)$", "$(-2, 4, -2)$", NOTA],
    answer: 3,
    solution:
      "The residual must lie in $(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$, so it must be orthogonal to **both** columns: $r_1 + r_2 + r_3 = 0$ and $r_2 + 2r_3 = 0$. That gives $\\mathbf{r} = t(1, -2, 1)$.\n$(-2, 4, -2) = -2(1,-2,1)$ qualifies (for example $\\mathbf{b} = (-2,4,-2)$ gives $\\hat{\\mathbf{x}} = \\mathbf{0}$ with this residual).\n**Traps:** $(1,-1,0)$ is orthogonal to column 1 only, and $(0,2,-1)$ to column 2 only. $(1,2,1)$ is orthogonal to neither.",
  },
  {
    subtopic: "Consistency",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&1\\\\1&2\\\\1&3\\end{bmatrix}$ and $\\mathbf{b} = (1, k, 5)$. For which $k$ is the least-squares error of $A\\mathbf{x} = \\mathbf{b}$ equal to zero, and what is the least-squares error when $k = 0$?",
    options: [
      "$k = 3$; error $\\sqrt6$ when $k = 0$",
      "$k = 3$; error $6$ when $k = 0$",
      "$k = 2$; error $\\sqrt6$ when $k = 0$",
      "$k = 3$; error $\\sqrt{26}$ when $k = 0$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$: solving $x_1 + x_2 + x_3 = 0$, $x_1 + 2x_2 + 3x_3 = 0$ gives $\\mathbf{n} = (1, -2, 1)$.\nThe error is zero iff $\\mathbf{b}\\in\\operatorname{Col}A$ iff $\\mathbf{b}\\perp\\mathbf{n}$: $1 - 2k + 5 = 0$, so $k = 3$. (The points $(1,1), (2,3), (3,5)$ are collinear.)\nFor $k = 0$, the residual is the component of $\\mathbf{b}$ along $\\mathbf{n}$: $\\dfrac{\\mathbf{b}\\cdot\\mathbf{n}}{\\mathbf{n}\\cdot\\mathbf{n}}\\mathbf{n} = \\tfrac66(1,-2,1)$. Its length is $\\sqrt6$. (Check: $\\hat{\\mathbf{x}} = (-2, 2)$ gives $A\\hat{\\mathbf{x}} = (0, 2, 4)$.)\n**Traps:** $6$ is the squared error. $\\sqrt{26} = \\|\\mathbf{b}\\|$ is the error of $\\mathbf{x} = \\mathbf{0}$, not of the best $\\hat{\\mathbf{x}}$.",
  },
  {
    subtopic: "QR method",
    kind: "mcq",
    prompt:
      "$A$ is an $m\\times n$ matrix with linearly independent columns, $A = QR$ is its economy QR factorization, and $\\hat{\\mathbf{x}}$ is the least-squares solution of $A\\mathbf{x} = \\mathbf{b}$. Which statement is **false** in general?",
    options: [
      "$R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$, so $\\hat{\\mathbf{x}}$ can be found by back-substitution",
      "$A^TA = RR^T$",
      "$A\\hat{\\mathbf{x}} = QQ^T\\mathbf{b}$",
      "$\\|\\mathbf{b} - A\\hat{\\mathbf{x}}\\|^2 = \\|\\mathbf{b}\\|^2 - \\|Q^T\\mathbf{b}\\|^2$",
      "$\\hat{\\mathbf{x}}$ is unique",
    ],
    answer: 1,
    solution:
      "$A^TA = R^TQ^TQR = R^TR$, not $RR^T$. For example, with $R = \\begin{bmatrix}2&4\\\\0&2\\end{bmatrix}$, $R^TR = \\begin{bmatrix}4&8\\\\8&20\\end{bmatrix}$ but $RR^T = \\begin{bmatrix}20&8\\\\8&4\\end{bmatrix}$.\nThe others are true:\n- $R^TR\\hat{\\mathbf{x}} = R^TQ^T\\mathbf{b}$, and cancelling the invertible $R^T$ gives $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$.\n- $A\\hat{\\mathbf{x}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b} = QQ^T\\mathbf{b}$.\n- By Pythagoras, $\\|\\mathbf{b}\\|^2 = \\|QQ^T\\mathbf{b}\\|^2 + \\|\\mathbf{r}\\|^2$, and $\\|QQ^T\\mathbf{b}\\| = \\|Q^T\\mathbf{b}\\|$.\n- Independent columns make $\\hat{\\mathbf{x}}$ unique.",
  },
  {
    subtopic: "Least-squares error",
    kind: "mcq",
    prompt:
      "$A$ is a $4\\times 2$ matrix and $\\mathbf{b}\\in\\mathbb{R}^4$ with $A^TA = \\begin{bmatrix}2&1\\\\1&3\\end{bmatrix}$, $A^T\\mathbf{b} = \\begin{bmatrix}3\\\\4\\end{bmatrix}$ and $\\|\\mathbf{b}\\|^2 = 10$. What is the least-squares error $\\|\\mathbf{b} - A\\hat{\\mathbf{x}}\\|$?",
    options: [
      "$\\sqrt3$",
      "$3$",
      "$2\\sqrt2$",
      "It cannot be determined without knowing $A$ and $\\mathbf{b}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Normal equations: $\\det(A^TA) = 5$, so $\\hat{\\mathbf{x}} = \\tfrac15\\begin{bmatrix}3&-1\\\\-1&2\\end{bmatrix}\\begin{bmatrix}3\\\\4\\end{bmatrix} = (1, 1)$.\nSince $A\\hat{\\mathbf{x}}\\perp\\mathbf{r}$, Pythagoras gives $\\|\\mathbf{r}\\|^2 = \\|\\mathbf{b}\\|^2 - \\|A\\hat{\\mathbf{x}}\\|^2$, and $\\|A\\hat{\\mathbf{x}}\\|^2 = \\hat{\\mathbf{x}}^TA^TA\\hat{\\mathbf{x}} = \\hat{\\mathbf{x}}^TA^T\\mathbf{b} = 3 + 4 = 7$.\nSo $\\|\\mathbf{r}\\|^2 = 10 - 7 = 3$ and the error is $\\sqrt3$. (One possible example: $A = \\begin{bmatrix}1&0\\\\1&1\\\\0&1\\\\0&1\\end{bmatrix}$, $\\mathbf{b} = (2,1,1,2)$.)\n**Traps:** $3$ is the squared error. $2\\sqrt2 = \\sqrt{10 - \\|\\hat{\\mathbf{x}}\\|^2}$ uses $\\|\\hat{\\mathbf{x}}\\|$ instead of $\\|A\\hat{\\mathbf{x}}\\|$. You never need $A$ itself: $A^TA$, $A^T\\mathbf{b}$ and $\\|\\mathbf{b}\\|$ are enough.",
  },
  {
    subtopic: "Consistency",
    kind: "mcq",
    prompt:
      "Find the least-squares solution and the least-squares error for $A = \\begin{bmatrix}1&2\\\\2&1\\\\1&-1\\end{bmatrix}$ and $\\mathbf{b} = (5, 4, -1)$.",
    options: [
      "$\\hat{\\mathbf{x}} = (2, 1)$; error $0$",
      "$\\hat{\\mathbf{x}} = (1, 2)$; error $0$",
      "$\\hat{\\mathbf{x}} = (1, 2)$; error $\\sqrt6$",
      "$\\hat{\\mathbf{x}} = (12, 15)$; error $0$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$A^TA = \\begin{bmatrix}6&3\\\\3&6\\end{bmatrix}$ and $A^T\\mathbf{b} = (5 + 8 - 1,\\ 10 + 4 + 1) = (12, 15)$. Solving $6x_1 + 3x_2 = 12$, $3x_1 + 6x_2 = 15$ gives $\\hat{\\mathbf{x}} = (1, 2)$.\n$A\\hat{\\mathbf{x}} = (5, 4, -1) = \\mathbf{b}$ exactly, so the error is $0$. The system was consistent ($\\mathbf{b}\\in\\operatorname{Col}A$), and the least-squares solution is then just the ordinary solution.\n**Traps:** $(12,15)$ is $A^T\\mathbf{b}$, not $\\hat{\\mathbf{x}}$. $(2,1)$ swaps the components: $A(2,1) = (4,5,1) \\ne \\mathbf{b}$.",
  },
  {
    subtopic: "Uniqueness",
    kind: "mcq",
    prompt: "$A$ is a $6\\times 4$ matrix of rank 3 and $\\mathbf{b}\\notin\\operatorname{Col}A$. Which statement is correct?",
    options: [
      "There is exactly one least-squares solution, and the residual lies in a 2-dimensional subspace of $\\mathbb{R}^6$",
      "The least-squares solutions form a plane in $\\mathbb{R}^4$, and the residual lies in a 3-dimensional subspace of $\\mathbb{R}^6$",
      "There is no least-squares solution because $\\mathbf{b}\\notin\\operatorname{Col}A$",
      "The least-squares solutions form a line in $\\mathbb{R}^4$, and the residual lies in a 3-dimensional subspace of $\\mathbb{R}^6$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Least-squares solutions always exist. They form $\\hat{\\mathbf{x}}_p + \\operatorname{Nul}A$, where $\\dim\\operatorname{Nul}A = 4 - 3 = 1$, so the set is a line in $\\mathbb{R}^4$ (a translate of the null-space line).\nThe residual $\\mathbf{b} - A\\hat{\\mathbf{x}}$ is the same for all of them and lies in $(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$, with dimension $6 - 3 = 3$.\n**Trap:** for the dimension of the complement, subtract the rank from the number of **rows** (6); for the null space, from the number of **columns** (4).",
  },
  // ---------------------------------------------------------------- T / F / cannot determine
  {
    subtopic: "Least-squares error",
    kind: "tfn",
    prompt:
      "$A$ is a $4\\times 3$ matrix and $\\mathbf{b}\\in\\mathbb{R}^4$ satisfies $A^T\\mathbf{b} = \\mathbf{0}$. Then the least-squares error of $A\\mathbf{x} = \\mathbf{b}$ equals $\\|\\mathbf{b}\\|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A^T\\mathbf{b} = \\mathbf{0}$ means $\\mathbf{b}\\perp\\operatorname{Col}A$, so $\\hat{\\mathbf{b}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b} = \\mathbf{0}$. Every least-squares solution (there may be several, if the columns are dependent) has $A\\hat{\\mathbf{x}} = \\mathbf{0}$, so the error is $\\|\\mathbf{b} - \\mathbf{0}\\| = \\|\\mathbf{b}\\|$. **True**. The error is unique even when $\\hat{\\mathbf{x}}$ is not.",
  },
  {
    subtopic: "Uniqueness",
    kind: "tfn",
    prompt:
      "If $A\\mathbf{x} = \\mathbf{b}$ has two different least-squares solutions, then $A\\mathbf{x} = \\mathbf{b}$ is inconsistent.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Two different least-squares solutions only tell us the columns of $A$ are dependent ($\\operatorname{Nul}A\\ne\\{\\mathbf{0}\\}$). Consistency depends on $\\mathbf{b}$.\n- $A = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, $\\mathbf{b} = (1,1)$: consistent, with infinitely many (least-squares) solutions.\n- Same $A$, $\\mathbf{b} = (1, 0)$: inconsistent, with infinitely many least-squares solutions $x_1 + x_2 = \\tfrac12$.\n**Not enough information**.",
  },
  {
    subtopic: "Projection matrix",
    kind: "tfn",
    prompt:
      "$A$ is a $5\\times 2$ matrix with linearly independent columns and $P = A(A^TA)^{-1}A^T$. Then $\\operatorname{trace}(P) = 2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Using $\\operatorname{trace}(XY) = \\operatorname{trace}(YX)$: $\\operatorname{trace}\\big(A(A^TA)^{-1}A^T\\big) = \\operatorname{trace}\\big((A^TA)^{-1}A^TA\\big) = \\operatorname{trace}(I_2) = 2$. In general, the trace of a projection matrix equals the dimension of the subspace it projects onto, here $\\dim\\operatorname{Col}A = 2$. **True**.",
  },
  {
    subtopic: "Normal equations",
    kind: "tfn",
    prompt:
      "For every matrix $A$ and vectors $\\mathbf{b}, \\mathbf{c}$: if $A\\mathbf{x} = \\mathbf{b}$ and $A\\mathbf{x} = \\mathbf{c}$ have exactly the same set of least-squares solutions, then $\\mathbf{b} = \\mathbf{c}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The least-squares solutions depend only on $A^T\\mathbf{b}$ (equivalently on $\\hat{\\mathbf{b}}$). Adding any vector of $(\\operatorname{Col}A)^\\perp$ to $\\mathbf{b}$ changes nothing.\nCounterexample: $A = \\begin{bmatrix}1\\\\0\\end{bmatrix}$, $\\mathbf{b} = (1, 0)$, $\\mathbf{c} = (1, 5)$. Both have least-squares solution $\\hat x = 1$, but $\\mathbf{b}\\ne\\mathbf{c}$. **False**.",
  },
  {
    subtopic: "Consistency",
    kind: "tfn",
    prompt:
      "$A$ is a $6\\times 4$ matrix of rank 4 and $\\mathbf{b}\\in\\mathbb{R}^6$. Then $A\\mathbf{x} = \\mathbf{b}$ has a unique least-squares solution, and its least-squares error is positive.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Rank 4 = number of columns, so $A^TA$ is invertible and $\\hat{\\mathbf{x}}$ is unique. That part is fine.\nThe error is positive iff $\\mathbf{b}\\notin\\operatorname{Col}A$. $\\operatorname{Col}A$ is a 4-dimensional subspace of $\\mathbb{R}^6$, and $\\mathbf{b}$ may or may not lie in it (e.g. $\\mathbf{b} = A\\mathbf{e}_1$ gives error 0). Since $\\mathbf{b}$ is not specified: **Not enough information**.",
  },
  {
    subtopic: "Consistency",
    kind: "tfn",
    prompt:
      "$A$ is an $m\\times n$ matrix such that the least-squares error of $A\\mathbf{x} = \\mathbf{b}$ is $0$ for every $\\mathbf{b}\\in\\mathbb{R}^m$. Then $\\operatorname{rank}A = m$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Error 0 for $\\mathbf{b}$ means $\\mathbf{b}\\in\\operatorname{Col}A$. If this holds for every $\\mathbf{b}\\in\\mathbb{R}^m$, then $\\operatorname{Col}A = \\mathbb{R}^m$, so $\\operatorname{rank}A = \\dim\\operatorname{Col}A = m$ (and necessarily $n \\ge m$). **True**.",
  },
];
