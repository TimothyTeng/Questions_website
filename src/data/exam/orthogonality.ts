import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (five-option MCQs + True/False/Cannot-determine parts). */
export const orthogonalityExam: ConceptQuestion[] = [
  // ---------------------------------------------------------------- projection & residual
  {
    subtopic: "Projection",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{w} = (2, 1, -2)$, $\\mathbf{y} = (3, -1, 4)$ and $\\mathbf{e} = \\mathbf{y} - \\operatorname{Proj}_{\\mathbf{w}}\\mathbf{y}$. Find $\\|\\mathbf{e}\\|$ and the angle (in radians) between $\\mathbf{y}$ and $\\operatorname{Proj}_{\\mathbf{w}}\\mathbf{y}$.",
    options: [
      "$\\|\\mathbf{e}\\| = 5$, angle $\\approx 1.768$ rad",
      "$\\|\\mathbf{e}\\| = \\sqrt{17}$, angle $\\approx 1.373$ rad",
      "$\\|\\mathbf{e}\\| = 5$, angle $\\approx 1.373$ rad",
      "$\\|\\mathbf{e}\\| = \\sqrt{17}$, angle $\\approx 0.197$ rad",
      NOTA,
    ],
    answer: 2,
    solution:
      "$\\mathbf{y}\\cdot\\mathbf{w} = 6 - 1 - 8 = -3$ and $\\mathbf{w}\\cdot\\mathbf{w} = 9$, so $\\operatorname{Proj}_{\\mathbf{w}}\\mathbf{y} = -\\tfrac13\\mathbf{w} = (-\\tfrac23, -\\tfrac13, \\tfrac23)$, a vector of length 1.\n$\\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}} = (\\tfrac{11}{3}, -\\tfrac23, \\tfrac{10}{3})$, so $\\|\\mathbf{e}\\|^2 = \\tfrac{121 + 4 + 100}{9} = 25$ and $\\|\\mathbf{e}\\| = 5$. Check with Pythagoras: $\\|\\mathbf{y}\\|^2 = 26 = 1 + 25$.\nAngle: $\\mathbf{y}\\cdot\\hat{\\mathbf{y}} = \\|\\hat{\\mathbf{y}}\\|^2 = 1$, so $\\cos\\theta = \\dfrac{1}{\\sqrt{26}\\cdot 1}$ and $\\theta \\approx 1.373$ rad.\n**Traps:** $1.768$ rad is the angle between $\\mathbf{y}$ and $\\mathbf{w}$ (obtuse, because $\\mathbf{y}\\cdot\\mathbf{w}<0$). The projection is $-\\tfrac13\\mathbf{w}$, which points back towards $\\mathbf{y}$, so the angle with the projection is always acute. $\\sqrt{17} = \\sqrt{26 - 9}$ forgets to divide $(\\mathbf{y}\\cdot\\mathbf{w})^2$ by $\\mathbf{w}\\cdot\\mathbf{w}$, and $0.197$ rad uses sine instead of cosine.",
  },
  {
    subtopic: "Projection",
    kind: "mcq",
    prompt:
      "Let $W = \\operatorname{Span}\\{(1, 0, 1),\\ (1, 1, 0)\\}$ and $\\mathbf{y} = (3, 1, -1)$. Which of the following statements are correct?\nI. $\\|\\mathbf{y} - \\operatorname{Proj}_W\\mathbf{y}\\| = \\sqrt3$.\nII. $\\operatorname{Proj}_W\\mathbf{y} = (3, 2, 1)$.\nIII. $\\|\\mathbf{y} - \\mathbf{w}\\| > \\sqrt3$ for every $\\mathbf{w}\\in W$ with $\\mathbf{w} \\ne \\operatorname{Proj}_W\\mathbf{y}$.\nIV. The angle between $\\mathbf{y}$ and $\\operatorname{Proj}_W\\mathbf{y}$ is approximately $0.634$ rad.",
    options: ["I only", "I and III only", "I, II and III only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "The spanning vectors $\\mathbf{a}_1 = (1,0,1)$, $\\mathbf{a}_2 = (1,1,0)$ have $\\mathbf{a}_1\\cdot\\mathbf{a}_2 = 1 \\ne 0$, so the sum-of-line-projections formula is **not** allowed. Use the normal equations with $A = [\\mathbf{a}_1\\ \\mathbf{a}_2]$: $A^TA = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, $A^T\\mathbf{y} = (2, 4)$, giving coefficients $(0, 2)$. So $\\operatorname{Proj}_W\\mathbf{y} = 2\\mathbf{a}_2 = (2, 2, 0)$.\n- I: $\\mathbf{y} - \\hat{\\mathbf{y}} = (1, -1, -1)$, which is orthogonal to both $\\mathbf{a}_1$ and $\\mathbf{a}_2$, with length $\\sqrt3$. **Correct.**\n- II: $(3,2,1) = 1\\cdot\\mathbf{a}_1 + 2\\cdot\\mathbf{a}_2$ is what the naive formula gives. Its residual $(0,-1,-2)$ is not orthogonal to $\\mathbf{a}_1$. **Wrong.**\n- III: Best Approximation Theorem (strict inequality for every other point of $W$). **Correct.**\n- IV: $\\cos\\theta = \\dfrac{\\mathbf{y}\\cdot\\hat{\\mathbf{y}}}{\\|\\mathbf{y}\\|\\|\\hat{\\mathbf{y}}\\|} = \\dfrac{8}{\\sqrt{11}\\sqrt8}$, so $\\theta \\approx 0.549$ rad. $0.634$ rad is the angle with the wrong vector $(3,2,1)$. **Wrong.**",
  },
  {
    subtopic: "Best approximation",
    kind: "tfn",
    prompt:
      "Let $W = \\operatorname{Span}\\{\\mathbf{u}_1, \\mathbf{u}_2\\}$, where $\\mathbf{u}_1, \\mathbf{u}_2 \\in \\mathbb{R}^3$ are linearly independent, and let $\\mathbf{y}\\notin W$. Then $\\|\\mathbf{y} - \\operatorname{Proj}_W\\mathbf{y}\\| < \\|\\mathbf{y} - \\mathbf{u}_1\\|$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The Best Approximation Theorem gives $\\|\\mathbf{y} - \\hat{\\mathbf{y}}\\| < \\|\\mathbf{y} - \\mathbf{w}\\|$ for every $\\mathbf{w}\\in W$ **different from** $\\hat{\\mathbf{y}}$. Since $\\mathbf{u}_1\\in W$, we always get $\\le$, but the strict inequality needs $\\mathbf{u}_1 \\ne \\hat{\\mathbf{y}}$.\n- $\\mathbf{u}_1 = (1,0,0)$, $\\mathbf{u}_2 = (0,1,0)$, $\\mathbf{y} = (1,0,5)$: $\\hat{\\mathbf{y}} = \\mathbf{u}_1$, so the two sides are equal (both 5).\n- Same $W$, $\\mathbf{y} = (0,0,5)$: $\\hat{\\mathbf{y}} = \\mathbf{0}$, and $5 < \\sqrt{26}$.\nBoth cases fit the hypotheses: **Not enough information**.",
  },
  {
    subtopic: "Projection",
    kind: "mcq",
    prompt:
      "What is the matrix of the orthogonal projection of $\\mathbb{R}^3$ onto $W = \\operatorname{Span}\\{(1, 0, -1),\\ (1, 1, 0)\\}$?",
    options: [
      "$\\dfrac13\\begin{bmatrix}2&1&-1\\\\1&2&1\\\\-1&1&2\\end{bmatrix}$",
      "$\\begin{bmatrix}2&1&-1\\\\1&1&0\\\\-1&0&1\\end{bmatrix}$",
      "$\\dfrac13\\begin{bmatrix}1&-1&1\\\\-1&1&-1\\\\1&-1&1\\end{bmatrix}$",
      "$\\dfrac12\\begin{bmatrix}2&1&-1\\\\1&1&0\\\\-1&0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "With $A = \\begin{bmatrix}1&1\\\\0&1\\\\-1&0\\end{bmatrix}$: $A^TA = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, $(A^TA)^{-1} = \\tfrac13\\begin{bmatrix}2&-1\\\\-1&2\\end{bmatrix}$, and $P = A(A^TA)^{-1}A^T = \\tfrac13\\begin{bmatrix}2&1&-1\\\\1&2&1\\\\-1&1&2\\end{bmatrix}$.\nShortcut: the normal to the plane is $\\mathbf{n} = (1,0,-1)\\times(1,1,0) = (1,-1,1)$, and $P = I - \\dfrac{\\mathbf{n}\\mathbf{n}^T}{\\mathbf{n}\\cdot\\mathbf{n}}$. Checks: $\\operatorname{trace}P = 2 = \\dim W$ and $P(1,0,-1) = (1,0,-1)$.\n**Traps:** $AA^T$ omits $(A^TA)^{-1}$. $\\tfrac13\\mathbf{n}\\mathbf{n}^T = I - P$ projects onto the normal line. $\\tfrac12 AA^T$ adds the two line projections, which is only valid when the spanning vectors are orthogonal (here their dot product is 1).",
  },
  // ---------------------------------------------------------------- orthogonal sets & matrices
  {
    subtopic: "Orthogonal sets",
    kind: "mcq",
    prompt:
      "Let $U = \\begin{bmatrix}1&1&1&1\\\\0&1&2&3\\\\0&0&1&3\\\\0&0&0&1\\end{bmatrix}$ (the upper-triangular Pascal matrix). Which statement about the columns of $U$ is correct?",
    options: [
      "They are orthonormal, so $U^{-1} = U^T$",
      "They are orthogonal but not orthonormal",
      "They are linearly independent but not orthogonal",
      "They are linearly dependent, because $\\mathbf{u}_4 = \\mathbf{u}_1 + \\mathbf{u}_2 + \\mathbf{u}_3$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$U$ is triangular, so $\\det U$ is the product of the diagonal entries, $= 1 \\ne 0$. Hence the columns are linearly independent.\nThey are not orthogonal: $\\mathbf{u}_1\\cdot\\mathbf{u}_2 = (1,0,0,0)\\cdot(1,1,0,0) = 1 \\ne 0$. In fact $U^TU = \\begin{bmatrix}1&1&1&1\\\\1&2&3&4\\\\1&3&6&10\\\\1&4&10&20\\end{bmatrix}$ (the symmetric Pascal matrix), which is far from diagonal.\n$\\mathbf{u}_1+\\mathbf{u}_2+\\mathbf{u}_3 = (3,3,1,0) \\ne \\mathbf{u}_4$.\n**Trap:** ones on the diagonal and a triangular shape say nothing about orthogonality. Independence does not imply orthogonality, although the converse holds for nonzero vectors.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "mcq",
    prompt:
      "Let $H = \\begin{bmatrix}1&1&1&1\\\\1&-1&1&-1\\\\1&1&-1&-1\\\\1&-1&-1&1\\end{bmatrix}$. Which of the following is **false**?",
    options: [
      "The columns of $H$ are mutually orthogonal",
      "$H^{-1} = \\tfrac14 H^T$",
      "$\\tfrac12 H$ is an orthogonal matrix",
      "$\\|H\\mathbf{x}\\| = \\|\\mathbf{x}\\|$ for every $\\mathbf{x}\\in\\mathbb{R}^4$",
      "The rows of $H$ are mutually orthogonal",
    ],
    answer: 3,
    solution:
      "Every pair of columns has two $+1$ products and two $-1$ products, so $H^TH = 4I$. That gives $H^{-1} = \\tfrac14H^T$ and $(\\tfrac12H)^T(\\tfrac12H) = I$, so $\\tfrac12H$ is orthogonal. Since $\\tfrac12 H$ is square and orthogonal, its rows are orthonormal too, so the rows of $H$ are mutually orthogonal ($H$ is also symmetric).\nBut $\\|H\\mathbf{x}\\|^2 = \\mathbf{x}^TH^TH\\mathbf{x} = 4\\|\\mathbf{x}\\|^2$, so $\\|H\\mathbf{x}\\| = 2\\|\\mathbf{x}\\|$. Length is preserved only when the columns are ortho**normal**. The fourth statement is false.",
  },
  {
    subtopic: "Dot product & norm",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{x} = (1, 2, -1, 0)$ and $\\mathbf{y} = (0, 1, 1, 2)$. What is the maximum value of $|\\mathbf{v}^T(2\\mathbf{x} - \\mathbf{y})|$ over all $\\mathbf{v}\\in\\mathbb{R}^4$ with $\\|\\mathbf{v}\\| \\le 2$?",
    options: ["$\\sqrt{26}$", "$2\\sqrt{26}$", "$52$", "$20$", NOTA],
    answer: 1,
    solution:
      "Let $\\mathbf{z} = 2\\mathbf{x} - \\mathbf{y} = (2, 3, -3, -2)$, so $\\|\\mathbf{z}\\| = \\sqrt{4+9+9+4} = \\sqrt{26}$.\nBy Cauchy–Schwarz, $|\\mathbf{v}^T\\mathbf{z}| \\le \\|\\mathbf{v}\\|\\,\\|\\mathbf{z}\\| \\le 2\\sqrt{26}$. Equality holds for $\\mathbf{v} = \\dfrac{2\\mathbf{z}}{\\|\\mathbf{z}\\|}$, which is parallel to $\\mathbf{z}$ with length 2. So the maximum is $2\\sqrt{26}\\approx 10.2$.\n**Traps:** $\\sqrt{26}$ ignores the radius 2. $52 = 2\\|\\mathbf{z}\\|^2$ uses the squared norm. $20$ sums absolute values (a 1-norm), which is not what the dot product bound gives.",
  },
  {
    subtopic: "Dot product & norm",
    kind: "mcq",
    prompt:
      "Vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ satisfy $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u} + \\mathbf{v}\\| = 5$ and $\\|\\mathbf{u} - \\mathbf{v}\\| = 7$. Find $\\|\\mathbf{v}\\|$ and $\\mathbf{u}\\cdot\\mathbf{v}$.",
    options: [
      "$\\|\\mathbf{v}\\| = 2\\sqrt7,\\ \\mathbf{u}\\cdot\\mathbf{v} = -6$",
      "$\\|\\mathbf{v}\\| = 2\\sqrt7,\\ \\mathbf{u}\\cdot\\mathbf{v} = 6$",
      "$\\|\\mathbf{v}\\| = \\sqrt{65},\\ \\mathbf{u}\\cdot\\mathbf{v} = -6$",
      "$\\|\\mathbf{v}\\| = 2\\sqrt7,\\ \\mathbf{u}\\cdot\\mathbf{v} = -12$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Parallelogram law: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 + \\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2 + 2\\|\\mathbf{v}\\|^2$, so $25 + 49 = 18 + 2\\|\\mathbf{v}\\|^2$, giving $\\|\\mathbf{v}\\|^2 = 28$ and $\\|\\mathbf{v}\\| = 2\\sqrt7$.\nPolarisation: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\|\\mathbf{u}-\\mathbf{v}\\|^2 = 4\\,\\mathbf{u}\\cdot\\mathbf{v}$, so $\\mathbf{u}\\cdot\\mathbf{v} = (25-49)/4 = -6$. Check: $9 + 28 + 2(-6) = 25$.\n**Traps:** $\\sqrt{65}$ drops the factor 2 on the right-hand side. $-12$ divides by 2 instead of 4. Since $\\|\\mathbf{u}-\\mathbf{v}\\| > \\|\\mathbf{u}+\\mathbf{v}\\|$, the angle is obtuse and the dot product must be negative.",
  },
  // ---------------------------------------------------------------- Gram–Schmidt & QR
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "mcq",
    prompt:
      "Gram–Schmidt is applied to linearly independent $\\mathbf{x}_1, \\mathbf{x}_2, \\mathbf{x}_3\\in\\mathbb{R}^4$, giving $\\mathbf{v}_1 = \\mathbf{x}_1$, $\\mathbf{v}_2$, $\\mathbf{v}_3$ (not normalised). Which of the following statements are correct?\nI. $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3\\}$ is an orthogonal set of nonzero vectors.\nII. $\\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2\\} = \\operatorname{Span}\\{\\mathbf{x}_1, \\mathbf{x}_2\\}$.\nIII. $\\mathbf{v}_3 = \\mathbf{x}_3 - \\dfrac{\\mathbf{x}_3\\cdot\\mathbf{x}_1}{\\mathbf{x}_1\\cdot\\mathbf{x}_1}\\mathbf{x}_1 - \\dfrac{\\mathbf{x}_3\\cdot\\mathbf{x}_2}{\\mathbf{x}_2\\cdot\\mathbf{x}_2}\\mathbf{x}_2$.\nIV. $\\|\\mathbf{v}_k\\| \\le \\|\\mathbf{x}_k\\|$ for $k = 1, 2, 3$.\nV. $\\mathbf{v}_3\\cdot\\mathbf{x}_2 = 0$.",
    options: [
      "I, II and IV only",
      "I, II, IV and V only",
      "I, II, III and IV only",
      "II, IV and V only",
      "All of the above",
    ],
    answer: 1,
    solution:
      "- I: Gram–Schmidt makes each $\\mathbf{v}_k$ orthogonal to the earlier ones, and independence of the $\\mathbf{x}$'s keeps every $\\mathbf{v}_k \\ne \\mathbf{0}$. **Correct.**\n- II: the spans are nested and agree at every stage. **Correct.**\n- III: the projections must be onto $\\mathbf{v}_1, \\mathbf{v}_2$ (which are orthogonal), not onto $\\mathbf{x}_1, \\mathbf{x}_2$. In general $\\mathbf{x}_1\\cdot\\mathbf{x}_2\\ne0$, so the sum-of-line-projections formula fails for them. **Wrong.**\n- IV: $\\mathbf{v}_k = \\mathbf{x}_k - \\mathbf{p}$ with $\\mathbf{p}\\perp\\mathbf{v}_k$, so $\\|\\mathbf{x}_k\\|^2 = \\|\\mathbf{v}_k\\|^2 + \\|\\mathbf{p}\\|^2$. **Correct.**\n- V: $\\mathbf{x}_2\\in\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2\\}$ and $\\mathbf{v}_3$ is orthogonal to that span. **Correct.**\nSo the answer is I, II, IV and V only.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "mcq",
    prompt:
      "$A$ is a $5\\times 3$ matrix with linearly independent columns $\\mathbf{a}_1, \\mathbf{a}_2, \\mathbf{a}_3$, and $A = QR$ is the QR factorization from Gram–Schmidt ($Q$ is $5\\times 3$, $R$ has positive diagonal entries $r_{ii}$). Which of the following statements are correct?\nI. $Q^TQ = I_3$ and $QQ^T = I_5$.\nII. $R = Q^TA$.\nIII. $r_{11} = \\|\\mathbf{a}_1\\|$.\nIV. $r_{22} = \\|\\mathbf{a}_2\\|$.\nV. $QQ^TA = A$.",
    options: ["II and V only", "II, III and IV only", "II, III and V only", "I, II, III and V only", "All of the above"],
    answer: 2,
    solution:
      "- I: $Q^TQ = I_3$, but $QQ^T$ is a $5\\times5$ matrix of rank 3 (the projection onto $\\operatorname{Col}A$), so it is not $I_5$. **Wrong.**\n- II: multiply $A = QR$ on the left by $Q^T$ and use $Q^TQ = I$. **Correct.**\n- III: $\\mathbf{q}_1 = \\mathbf{a}_1/\\|\\mathbf{a}_1\\|$, so $r_{11} = \\mathbf{q}_1\\cdot\\mathbf{a}_1 = \\|\\mathbf{a}_1\\|$. **Correct.**\n- IV: $r_{22} = \\mathbf{q}_2\\cdot\\mathbf{a}_2 = \\|\\mathbf{v}_2\\| = \\|\\mathbf{a}_2 - \\operatorname{Proj}_{\\mathbf{a}_1}\\mathbf{a}_2\\|$. This equals $\\|\\mathbf{a}_2\\|$ only when $\\mathbf{a}_2\\perp\\mathbf{a}_1$. **Wrong** in general.\n- V: $QQ^T$ projects onto $\\operatorname{Col}Q = \\operatorname{Col}A$, and every column of $A$ already lies there. **Correct.**",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&3\\\\2&3\\\\2&0\\end{bmatrix} = QR$, where $Q$ comes from Gram–Schmidt on the columns of $A$ (so $R$ has positive diagonal). What is $R$?",
    options: [
      "$\\begin{bmatrix}3&1\\\\0&3\\end{bmatrix}$",
      "$\\begin{bmatrix}3&0\\\\3&3\\end{bmatrix}$",
      "$\\begin{bmatrix}3&3\\\\0&3\\sqrt2\\end{bmatrix}$",
      "$\\begin{bmatrix}3&3\\\\0&3\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$\\|\\mathbf{a}_1\\| = 3$, so $\\mathbf{q}_1 = \\tfrac13(1,2,2)$ and $r_{11} = 3$.\n$r_{12} = \\mathbf{q}_1\\cdot\\mathbf{a}_2 = \\tfrac13(3+6+0) = 3$.\n$\\mathbf{v}_2 = \\mathbf{a}_2 - r_{12}\\mathbf{q}_1 = (3,3,0) - (1,2,2) = (2,1,-2)$, so $r_{22} = \\|\\mathbf{v}_2\\| = 3$ and $\\mathbf{q}_2 = \\tfrac13(2,1,-2)$.\nCheck: $3\\mathbf{q}_1 + 3\\mathbf{q}_2 = (1,2,2) + (2,1,-2) = (3,3,0) = \\mathbf{a}_2$.\n**Traps:** $r_{12} = 1$ is the Gram–Schmidt coefficient $\\frac{\\mathbf{a}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}$, which is not $\\mathbf{q}_1\\cdot\\mathbf{a}_2$. $3\\sqrt2 = \\|\\mathbf{a}_2\\|$ forgets to remove the $\\mathbf{q}_1$ component first. $R$ must be **upper** triangular.",
  },
  // ---------------------------------------------------------------- orthogonal complements
  {
    subtopic: "Orthogonal complements",
    kind: "mcq",
    prompt:
      "Let $W = \\operatorname{Span}\\{(1, 1, 0, 1),\\ (0, 1, 1, -1)\\}$ in $\\mathbb{R}^4$. Which set is a basis for $W^\\perp$?",
    options: [
      "$\\{(1,-1,1,0)\\}$",
      "$\\{(1,-1,1,0),\\ (2,-1,0,1)\\}$",
      "$\\{(-1,0,1,1),\\ (3,-2,1,-1)\\}$",
      "$\\{(1,1,0,1),\\ (0,1,1,-1)\\}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$W^\\perp = \\operatorname{Nul}\\begin{bmatrix}1&1&0&1\\\\0&1&1&-1\\end{bmatrix}$. Row reduce: $R_1 - R_2$ gives $x_1 - x_3 + 2x_4 = 0$ and $x_2 + x_3 - x_4 = 0$. So $x_1 = x_3 - 2x_4$, $x_2 = -x_3 + x_4$, and one basis is $\\{(1,-1,1,0), (-2,1,0,1)\\}$. The dimension is $4 - 2 = 2$.\nThe third option: $(-1,0,1,1)$ and $(3,-2,1,-1)$ both satisfy the two equations (check the dot products with both spanning vectors: all 0) and are not multiples of each other. Two independent vectors in a 2-dimensional space form a basis. They are the sum and difference of the basis found above.\n**Traps:** a single vector cannot span a 2-dimensional $W^\\perp$. $(2,-1,0,1)\\cdot(1,1,0,1) = 2 \\ne 0$. The fourth option is a basis of $W$ itself.",
  },
  {
    subtopic: "Orthogonal complements",
    kind: "mcq",
    prompt: "$A$ is a $5\\times 7$ matrix of rank 3. Which of the following is **false**?",
    options: [
      "$\\dim\\operatorname{Nul}A = 4$",
      "Every vector in $\\operatorname{Nul}A$ is orthogonal to every row of $A$",
      "$(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}(A^T)$, a subspace of $\\mathbb{R}^5$",
      "$\\dim\\operatorname{Row}A + \\dim\\operatorname{Nul}A = 7$",
      "$\\dim\\operatorname{Nul}(A^T) = 4$",
    ],
    answer: 4,
    solution:
      "$\\operatorname{Nul}A\\subset\\mathbb{R}^7$ has dimension $7 - 3 = 4$. $\\operatorname{Nul}(A^T) = (\\operatorname{Col}A)^\\perp \\subset\\mathbb{R}^5$ has dimension $5 - 3 = 2$, **not** 4. So the last statement is false.\nThe others are true. $A\\mathbf{x} = \\mathbf{0}$ says each row dotted with $\\mathbf{x}$ is 0, so $\\operatorname{Nul}A = (\\operatorname{Row}A)^\\perp$, and $\\dim W + \\dim W^\\perp = 7$ in $\\mathbb{R}^7$.\n**Trap:** the complement of the column space lives in $\\mathbb{R}^m$ (number of **rows**), so subtract the rank from $m = 5$, not from $n = 7$.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "mcq",
    prompt: "$U$ and $V$ are $n\\times n$ orthogonal matrices. Which of the following is **false**?",
    options: [
      "$UV$ is an orthogonal matrix",
      "$U^T$ is an orthogonal matrix",
      "$\\det U = \\pm 1$",
      "$U + V$ is an orthogonal matrix",
      "$(U\\mathbf{x})\\cdot(U\\mathbf{y}) = \\mathbf{x}\\cdot\\mathbf{y}$ for all $\\mathbf{x}, \\mathbf{y}\\in\\mathbb{R}^n$",
    ],
    answer: 3,
    solution:
      "Counterexample: $U = V = I$ gives $U + V = 2I$, and $(2I)^T(2I) = 4I \\ne I$. Sums do not preserve orthogonality.\nThe rest are true:\n- $(UV)^T(UV) = V^TU^TUV = V^TV = I$.\n- For a square $U$, $U^TU = I$ implies $UU^T = I$, which says $U^T$ is orthogonal.\n- $\\det(U^TU) = (\\det U)^2 = 1$.\n- $(U\\mathbf{x})^T(U\\mathbf{y}) = \\mathbf{x}^TU^TU\\mathbf{y} = \\mathbf{x}^T\\mathbf{y}$.",
  },
  // ---------------------------------------------------------------- best approximation
  {
    subtopic: "Best approximation",
    kind: "mcq",
    prompt:
      "Let $W = \\operatorname{Span}\\{(1, 1, 1, 1),\\ (1, 3, 1, 3)\\}$ and $\\mathbf{y} = (7, 1, 3, 1)$. Find the point of $W$ closest to $\\mathbf{y}$ and the distance from $\\mathbf{y}$ to $W$.",
    options: [
      "$(5, 1, 5, 1)$ and $2\\sqrt2$",
      "$(5, 1, 5, 1)$ and $8$",
      "$(3, 3, 3, 3)$ and $2\\sqrt6$",
      "$(2, 0, -2, 0)$ and $2\\sqrt2$",
      NOTA,
    ],
    answer: 0,
    solution:
      "The spanning vectors are not orthogonal ($\\mathbf{a}_1\\cdot\\mathbf{a}_2 = 8$), so first apply Gram–Schmidt: $\\mathbf{v}_1 = (1,1,1,1)$ and $\\mathbf{v}_2 = \\mathbf{a}_2 - \\tfrac84\\mathbf{v}_1 = (-1, 1, -1, 1)$.\n$\\hat{\\mathbf{y}} = \\dfrac{\\mathbf{y}\\cdot\\mathbf{v}_1}{4}\\mathbf{v}_1 + \\dfrac{\\mathbf{y}\\cdot\\mathbf{v}_2}{4}\\mathbf{v}_2 = \\tfrac{12}{4}\\mathbf{v}_1 + \\tfrac{-8}{4}\\mathbf{v}_2 = (3,3,3,3) - 2(-1,1,-1,1) = (5,1,5,1)$.\n$\\mathbf{y} - \\hat{\\mathbf{y}} = (2, 0, -2, 0)$, so the distance is $\\sqrt8 = 2\\sqrt2$.\n**Traps:** $8$ is the squared distance. $(3,3,3,3)$ projects onto $\\mathbf{a}_1$ only, missing the second direction. $(2,0,-2,0)$ is the residual $\\mathbf{z}\\in W^\\perp$, not the closest point.",
  },
  {
    subtopic: "Best approximation",
    kind: "mcq",
    prompt:
      "Let $W$ be the plane $x_1 - x_2 + 2x_3 = 0$ in $\\mathbb{R}^3$ and $\\mathbf{y} = (1, 2, 3)$. Find the distance from $\\mathbf{y}$ to $W$ and the angle (in radians) between $\\mathbf{y}$ and $\\operatorname{Proj}_W\\mathbf{y}$.",
    options: [
      "$5/6$ and $\\approx 0.577$ rad",
      "$5/\\sqrt6$ and $\\approx 0.994$ rad",
      "$5/\\sqrt{14}$ and $\\approx 0.577$ rad",
      "$5/6$ and $\\approx 0.994$ rad",
      NOTA,
    ],
    answer: 4,
    solution:
      "$W^\\perp = \\operatorname{Span}\\{\\mathbf{n}\\}$ with $\\mathbf{n} = (1,-1,2)$. Project onto the normal: $\\mathbf{y}\\cdot\\mathbf{n} = 1 - 2 + 6 = 5$ and $\\mathbf{n}\\cdot\\mathbf{n} = 6$, so $\\mathbf{z} = \\tfrac56\\mathbf{n}$ and $\\operatorname{Proj}_W\\mathbf{y} = \\mathbf{y} - \\tfrac56\\mathbf{n} = (\\tfrac16, \\tfrac{17}{6}, \\tfrac43)$.\nDistance: $\\|\\mathbf{z}\\| = \\tfrac56\\sqrt6 = 5/\\sqrt6 \\approx 2.041$.\nAngle: $\\sin\\theta = \\dfrac{\\|\\mathbf{z}\\|}{\\|\\mathbf{y}\\|} = \\dfrac{5/\\sqrt6}{\\sqrt{14}} = \\dfrac{5}{\\sqrt{84}}$, so $\\theta \\approx 0.577$ rad. (Equivalently, $\\cos\\theta = \\|\\hat{\\mathbf{y}}\\|/\\|\\mathbf{y}\\| = \\sqrt{59/84}$.)\nThe correct pair, $5/\\sqrt6$ and $0.577$ rad, is not listed: **None of the above**. $5/6$ forgets to multiply by $\\|\\mathbf{n}\\|$. $0.994$ rad is the angle between $\\mathbf{y}$ and the **normal**. $5/\\sqrt{14}$ divides by $\\|\\mathbf{y}\\|$ instead of $\\|\\mathbf{n}\\|$.",
  },
  {
    subtopic: "Orthogonal sets",
    kind: "mcq",
    prompt:
      "$\\mathcal{B} = \\{(1, 1, 0),\\ (1, -1, 1),\\ (-1, 1, 2)\\}$ is an orthogonal basis of $\\mathbb{R}^3$. What is $[\\mathbf{y}]_{\\mathcal{B}}$ for $\\mathbf{y} = (5, -1, 4)$?",
    options: [
      "$(4,\\ 10,\\ 2)$",
      "$(2\\sqrt2,\\ 10/\\sqrt3,\\ 2/\\sqrt6)$",
      "$(2,\\ 10/3,\\ 2/3)$",
      "$(2,\\ 10/3,\\ 1/3)$",
      NOTA,
    ],
    answer: 3,
    solution:
      "For an orthogonal basis, $c_i = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_i}{\\mathbf{u}_i\\cdot\\mathbf{u}_i}$, so no row reduction is needed:\n- $c_1 = \\tfrac{5 - 1}{2} = 2$\n- $c_2 = \\tfrac{5 + 1 + 4}{3} = \\tfrac{10}{3}$\n- $c_3 = \\tfrac{-5 - 1 + 8}{6} = \\tfrac13$\nCheck: $2(1,1,0) + \\tfrac{10}{3}(1,-1,1) + \\tfrac13(-1,1,2) = (5,-1,4)$.\n**Traps:** $(4,10,2)$ are the dot products before dividing. The $\\sqrt{\\ }$ version divides by $\\|\\mathbf{u}_i\\|$, which gives coordinates relative to the **normalised** basis. $2/3$ divides by 3 instead of $\\mathbf{u}_3\\cdot\\mathbf{u}_3 = 6$.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "mcq",
    prompt:
      "$U = \\dfrac13\\begin{bmatrix}1&2&a\\\\2&1&b\\\\2&-2&c\\end{bmatrix}$ is an orthogonal matrix. What is $a + b + c$?",
    options: [
      "$1$",
      "$-1$",
      "Either $1$ or $-1$; the information given does not decide which",
      "$3$",
      NOTA,
    ],
    answer: 2,
    solution:
      "The first two columns are already orthonormal: $\\tfrac19(1+4+4) = 1$, $\\tfrac19(4+1+4) = 1$, and their dot product is $\\tfrac19(2 + 2 - 4) = 0$.\nThe third column must be orthogonal to both: $a + 2b + 2c = 0$ and $2a + b - 2c = 0$. Adding gives $b = -a$, and then $c = a/2$. So $(a,b,c) = t(2,-2,1)$.\nUnit length: $\\tfrac19 t^2(4+4+1) = 1$, so $t = \\pm1$, giving $(a,b,c) = \\pm(2,-2,1)$ and $a+b+c = \\pm1$.\nBoth signs give an orthogonal matrix (with $\\det U = -1$ and $+1$ respectively), so the value is not determined uniquely.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "mcq",
    prompt:
      "$Q$ is a $4\\times 4$ orthogonal matrix, $\\mathbf{x} = (1, -1, 2, 0)$ and $\\mathbf{y} = (0, 1, 1, 3)$. What are $(Q\\mathbf{x})\\cdot(Q\\mathbf{y})$ and $\\|Q(\\mathbf{x} + \\mathbf{y})\\|$?",
    options: [
      "$1$ and $19$",
      "$1$ and $\\sqrt{19}$",
      "$0$ and $\\sqrt{19}$",
      "They cannot be found without knowing $Q$",
      NOTA,
    ],
    answer: 1,
    solution:
      "An orthogonal matrix preserves dot products and lengths: $(Q\\mathbf{x})\\cdot(Q\\mathbf{y}) = \\mathbf{x}^TQ^TQ\\mathbf{y} = \\mathbf{x}\\cdot\\mathbf{y} = 0 - 1 + 2 + 0 = 1$.\n$\\|Q(\\mathbf{x}+\\mathbf{y})\\| = \\|\\mathbf{x}+\\mathbf{y}\\| = \\|(1, 0, 3, 3)\\| = \\sqrt{19}$.\n**Traps:** $19$ is the squared length. $Q$ does not make vectors orthogonal; it keeps the angle between them.",
  },
  {
    subtopic: "Dot product & norm",
    kind: "mcq",
    prompt:
      "For which real numbers $k$ are $\\mathbf{u} = (k, 2, -1, 3)$ and $\\mathbf{v} = (k, k, 4, -1)$ orthogonal?",
    options: [
      "$k = -1 \\pm 2\\sqrt2$",
      "$k = 1 \\pm 2\\sqrt2$",
      "$k = -7$ or $k = 1$",
      "No real $k$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v} = k^2 + 2k - 4 - 3 = k^2 + 2k - 7$. Setting this to 0 gives $k = \\dfrac{-2\\pm\\sqrt{4 + 28}}{2} = -1 \\pm 2\\sqrt2$ (both real).\n$k = 1\\pm2\\sqrt2$ has the sign of the linear term wrong. $k = -7, 1$ comes from mis-factoring as $(k+7)(k-1) = k^2 + 6k - 7$.",
  },
  // ---------------------------------------------------------------- T / F / cannot determine
  {
    subtopic: "Orthogonal sets",
    kind: "tfn",
    prompt:
      "$\\mathbf{x}_1, \\mathbf{x}_2, \\mathbf{x}_3$ are nonzero vectors in $\\mathbb{R}^3$ with $\\mathbf{x}_1\\cdot\\mathbf{x}_2 = 0$ and $\\mathbf{x}_2\\cdot\\mathbf{x}_3 = 0$. Then $\\{\\mathbf{x}_1, \\mathbf{x}_2, \\mathbf{x}_3\\}$ is a basis for $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Nothing is said about $\\mathbf{x}_1\\cdot\\mathbf{x}_3$.\n- $\\mathbf{x}_1 = \\mathbf{e}_1$, $\\mathbf{x}_2 = \\mathbf{e}_2$, $\\mathbf{x}_3 = \\mathbf{e}_3$: an orthogonal set of nonzero vectors, hence a basis.\n- $\\mathbf{x}_1 = \\mathbf{e}_1$, $\\mathbf{x}_2 = \\mathbf{e}_2$, $\\mathbf{x}_3 = 2\\mathbf{e}_1$: satisfies both conditions but is dependent.\n**Not enough information.** You need **every** pair to be orthogonal (and all vectors nonzero) to conclude independence.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "tfn",
    prompt: "If $A$ is an $n\\times n$ matrix whose columns are nonzero and mutually orthogonal, then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "An orthogonal set of nonzero vectors is linearly independent, and $n$ independent columns in $\\mathbb{R}^n$ make a square matrix invertible. Explicitly, $A^TA = D$ is diagonal with positive entries $\\|\\mathbf{a}_i\\|^2$, so $A^{-1} = D^{-1}A^T$. **True**.\n$A$ need not be an orthogonal matrix (columns may not be unit vectors), but it is still invertible.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "tfn",
    prompt:
      "$Q$ is a $4\\times 3$ matrix with orthonormal columns and $\\mathbf{y}\\in\\mathbb{R}^4$ satisfies $QQ^T\\mathbf{y} = \\mathbf{y}$. Then $\\mathbf{y}\\in\\operatorname{Col}Q$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$QQ^T\\mathbf{y} = Q(Q^T\\mathbf{y})$ is $Q$ times a vector, i.e. a linear combination of the columns of $Q$. If it equals $\\mathbf{y}$, then $\\mathbf{y}\\in\\operatorname{Col}Q$. Equivalently, $QQ^T$ is the projection onto $\\operatorname{Col}Q$, and a vector is fixed by a projection exactly when it lies in that subspace. **True**.",
  },
  {
    subtopic: "Orthogonal sets",
    kind: "tfn",
    prompt:
      "For **every** $3\\times 2$ matrix $A$ such that $A^TA$ is diagonal with positive diagonal entries, the rows of $A$ are mutually orthogonal.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A^TA$ diagonal means the **columns** of $A$ are orthogonal; it says nothing about the rows. Counterexample: $A = \\begin{bmatrix}1&1\\\\1&-1\\\\1&0\\end{bmatrix}$ has $A^TA = \\begin{bmatrix}3&0\\\\0&2\\end{bmatrix}$, but rows 1 and 3 give $(1,1)\\cdot(1,0) = 1 \\ne 0$. **False**.\n(For a square matrix with $A^TA = I$, the rows would also be orthonormal, but neither condition holds here.)",
  },
  {
    subtopic: "Dot product & norm",
    kind: "tfn",
    prompt: "If $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ satisfy $\\mathbf{u}\\cdot\\mathbf{v} < 0$, then $\\|\\mathbf{u} + \\mathbf{v}\\| < \\|\\mathbf{u} - \\mathbf{v}\\|$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Expand both: $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$. Subtracting gives $\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\|\\mathbf{u}-\\mathbf{v}\\|^2 = 4\\,\\mathbf{u}\\cdot\\mathbf{v} < 0$. Both norms are nonnegative, so $\\|\\mathbf{u}+\\mathbf{v}\\| < \\|\\mathbf{u}-\\mathbf{v}\\|$. **True**. Geometrically, for an obtuse angle the diagonal $\\mathbf{u}+\\mathbf{v}$ of the parallelogram is the shorter one.",
  },
];
