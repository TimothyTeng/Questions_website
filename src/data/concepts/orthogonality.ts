import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const orthogonalityConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (18)
  {
    subtopic: "Dot product & norm",
    kind: "tfn",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ be nonzero with $\\mathbf{u}\\cdot\\mathbf{v} = 0$. Then $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Expand: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = (\\mathbf{u}+\\mathbf{v})\\cdot(\\mathbf{u}+\\mathbf{v}) = \\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$. With $\\mathbf{u}\\cdot\\mathbf{v} = 0$ the cross term vanishes. This is the Pythagorean Theorem in $\\mathbb{R}^n$, so **True**.",
  },
  {
    subtopic: "Dot product & norm",
    kind: "tfn",
    prompt:
      "If $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2$, then $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "From the expansion $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$, the given equality forces $2\\,\\mathbf{u}\\cdot\\mathbf{v} = 0$. So $\\mathbf{u}\\cdot\\mathbf{v}=0$, which is the definition of orthogonal. The Pythagorean Theorem works in **both** directions, so **True**.",
  },
  {
    subtopic: "Dot product & norm",
    kind: "tfn",
    prompt:
      "For all $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$, $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$, and equality holds only when $\\mathbf{u} = \\mathbf{v}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The inequality (Cauchy–Schwarz) is correct, but the equality condition is wrong. Equality holds exactly when $\\mathbf{u}$ and $\\mathbf{v}$ are linearly dependent (parallel), e.g. $\\mathbf{u} = -2\\mathbf{v}$ gives $|\\mathbf{u}\\cdot\\mathbf{v}| = 2\\|\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$ with $\\mathbf{u}\\ne\\mathbf{v}$. One wrong clause makes the whole statement **False**.",
  },
  {
    subtopic: "Dot product & norm",
    kind: "tfn",
    prompt:
      "Vectors $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^3$ satisfy $\\|\\mathbf{u}\\| = 3$ and $\\|\\mathbf{v}\\| = 4$. Then $\\|\\mathbf{u}+\\mathbf{v}\\| = 7$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The triangle inequality only gives $\\|\\mathbf{u}+\\mathbf{v}\\| \\le 3 + 4 = 7$ (and $\\ge 4-3 = 1$). Equality with 7 needs $\\mathbf{v}$ to be a positive multiple of $\\mathbf{u}$; if they are orthogonal the length is 5. Since the angle between them is not given, **Not enough information**.",
  },
  {
    subtopic: "Orthogonal complements",
    kind: "tfn",
    prompt:
      "For any subspace $W$ of $\\mathbb{R}^n$ with $W \\ne \\{\\mathbf{0}\\}$ and $W \\ne \\mathbb{R}^n$, the intersection $W \\cap W^\\perp$ contains a nonzero vector.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $\\mathbf{x} \\in W \\cap W^\\perp$, then $\\mathbf{x}$ is orthogonal to itself: $\\mathbf{x}\\cdot\\mathbf{x} = \\|\\mathbf{x}\\|^2 = 0$, so $\\mathbf{x}=\\mathbf{0}$. Hence $W \\cap W^\\perp = \\{\\mathbf{0}\\}$ always. **False**.",
  },
  {
    subtopic: "Orthogonal complements",
    kind: "tfn",
    prompt:
      "Let $W$ be a 3-dimensional subspace of $\\mathbb{R}^5$ and let $\\mathbf{w}_1, \\mathbf{w}_2$ be two linearly independent vectors in $W$. If $\\mathbf{x}\\cdot\\mathbf{w}_1 = \\mathbf{x}\\cdot\\mathbf{w}_2 = 0$, then $\\mathbf{x} \\in W^\\perp$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "To be in $W^\\perp$, $\\mathbf{x}$ must be orthogonal to a **spanning set** of $W$, which needs 3 independent vectors here. Two vectors span only a plane inside $W$, so $\\mathbf{x}$ may or may not also be orthogonal to the third direction. Without that information we cannot decide: **Not enough information**.",
  },
  {
    subtopic: "Orthogonal complements",
    kind: "tfn",
    prompt: "For any $m \\times n$ matrix $A$, $(\\operatorname{Row} A)^\\perp = \\operatorname{Nul}(A^T)$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A\\mathbf{x} = \\mathbf{0}$ says each **row** of $A$ dotted with $\\mathbf{x}$ is zero, so $(\\operatorname{Row} A)^\\perp = \\operatorname{Nul} A$ (a subspace of $\\mathbb{R}^n$). The companion fact is $(\\operatorname{Col} A)^\\perp = \\operatorname{Nul}(A^T)$ (in $\\mathbb{R}^m$). The statement mixes the two up, so **False**.",
  },
  {
    subtopic: "Orthogonal sets",
    kind: "tfn",
    prompt: "Every orthogonal set of vectors in $\\mathbb{R}^n$ is linearly independent.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "An orthogonal set may contain the zero vector (it is orthogonal to everything), and any set containing $\\mathbf{0}$ is dependent, e.g. $\\{\\mathbf{e}_1, \\mathbf{0}\\}$. The theorem (Lay Thm 4) requires an orthogonal set of **nonzero** vectors. **False**.",
  },
  {
    subtopic: "Orthogonal sets",
    kind: "tfn",
    prompt:
      "Let $W = \\operatorname{Span}\\{\\mathbf{u}_1, \\mathbf{u}_2\\} \\subset \\mathbb{R}^3$ with $\\mathbf{u}_1, \\mathbf{u}_2$ linearly independent. Then for every $\\mathbf{y}$, $\\operatorname{Proj}_W \\mathbf{y} = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_1}{\\mathbf{u}_1\\cdot\\mathbf{u}_1}\\mathbf{u}_1 + \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_2}{\\mathbf{u}_2\\cdot\\mathbf{u}_2}\\mathbf{u}_2$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "This sum-of-line-projections formula is valid **only for an orthogonal basis**. Independence alone does not tell us whether $\\mathbf{u}_1\\cdot\\mathbf{u}_2 = 0$; if it is not zero the formula gives a wrong vector (its residual is not orthogonal to $W$). Since orthogonality is not given: **Not enough information**. (Fix: run Gram–Schmidt first.)",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "tfn",
    prompt: "If the $6 \\times 3$ matrix $U$ has orthonormal columns, then $UU^T = I$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Orthonormal columns give $U^TU = I_3$. But $UU^T$ is $6\\times 6$ with rank at most 3, so it cannot be $I_6$. In fact $UU^T$ is the projection matrix onto $\\operatorname{Col} U$: $UU^T\\mathbf{y} = \\operatorname{Proj}_{\\operatorname{Col} U}\\mathbf{y}$. **False**.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "tfn",
    prompt: "If $U$ is a $4 \\times 4$ matrix with $U^TU = I$, then the rows of $U$ are orthonormal.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "For a **square** matrix, $U^TU = I$ means $U^T = U^{-1}$, so also $UU^T = I$. The $(i,j)$ entry of $UU^T$ is (row $i$)$\\cdot$(row $j$), so the rows are orthonormal too. **True**; this is exactly what fails for tall matrices.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "tfn",
    prompt:
      "Let $U$ be an $n\\times n$ matrix whose columns are mutually orthogonal and nonzero. Then $U$ is an orthogonal matrix.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "An orthogonal matrix needs **orthonormal** columns (unit length as well as mutually orthogonal), i.e. $U^TU = I$. Orthogonal columns only give $U^TU$ diagonal, e.g. $\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$ gives $2I$. The column lengths are not stated, so we cannot decide: **Not enough information**. (The naming is a classic trap.)",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "tfn",
    prompt:
      "If the $m\\times n$ matrix $U$ has orthonormal columns, then $\\|U\\mathbf{x}\\| = \\|\\mathbf{x}\\|$ for all $\\mathbf{x}$ only when $m = n$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\|U\\mathbf{x}\\|^2 = (U\\mathbf{x})^T(U\\mathbf{x}) = \\mathbf{x}^TU^TU\\mathbf{x} = \\mathbf{x}^T\\mathbf{x}$, using only $U^TU = I$. That holds for tall matrices too, so the length-preserving property does **not** need $U$ square. **False**.",
  },
  {
    subtopic: "Projection",
    kind: "tfn",
    prompt:
      "Let $W$ be a subspace of $\\mathbb{R}^n$. The vector $\\operatorname{Proj}_W \\mathbf{y}$ is the same no matter which orthogonal basis of $W$ is used to compute it.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The Orthogonal Decomposition Theorem says $\\mathbf{y} = \\hat{\\mathbf{y}} + \\mathbf{z}$ with $\\hat{\\mathbf{y}}\\in W$, $\\mathbf{z}\\in W^\\perp$ is **unique**. So $\\operatorname{Proj}_W\\mathbf{y}$ depends only on $W$ and $\\mathbf{y}$, not on the basis. Different bases give different coefficients but the same vector. **True**.",
  },
  {
    subtopic: "Projection",
    kind: "tfn",
    prompt:
      "$A$ and $B$ are different $3\\times 2$ matrices, each of rank 2. Then $\\operatorname{Proj}_{\\operatorname{Col} A}\\mathbf{y} = \\operatorname{Proj}_{\\operatorname{Col} B}\\mathbf{y}$ for every $\\mathbf{y} \\in \\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The projection depends only on the subspace. If $\\operatorname{Col} A = \\operatorname{Col} B$ (same plane, e.g. $B = AC$ with $C$ invertible) the projections agree. If they are different planes in $\\mathbb{R}^3$ they generally do not. $A \\ne B$ does not tell us which case we are in: **Not enough information**.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "tfn",
    prompt:
      "If Gram–Schmidt is applied to linearly independent $\\mathbf{x}_1,\\dots,\\mathbf{x}_p$ to give $\\mathbf{v}_1,\\dots,\\mathbf{v}_p$, then $\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_k\\} = \\operatorname{Span}\\{\\mathbf{x}_1,\\dots,\\mathbf{x}_k\\}$ for every $k \\le p$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Each $\\mathbf{v}_k = \\mathbf{x}_k - (\\text{projection onto } \\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_{k-1}\\})$, so $\\mathbf{v}_k$ is a combination of $\\mathbf{x}_1,\\dots,\\mathbf{x}_k$ and vice versa. The spans match at every stage, not just at the end. This nested property is why $R$ in $A = QR$ is upper triangular. **True**.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "tfn",
    prompt:
      "$A$ is a $5\\times 3$ matrix and $A = QR$ is its economy QR factorization ($Q$ is $5\\times 3$, $R$ is $3\\times 3$ upper triangular). Then $R$ is invertible.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$R$ is invertible **iff** the columns of $A$ are linearly independent (rank 3). A $5\\times 3$ matrix may have rank 3 or less, and we are not told which. If a column is dependent, Gram–Schmidt produces a zero vector and $R$ has a zero diagonal entry. **Not enough information**.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "tfn",
    prompt:
      "$A$ is $6\\times 3$ with linearly independent columns and $A = QR$ (economy). Then $QQ^T$ is the $6\\times 6$ matrix that projects $\\mathbb{R}^6$ onto $\\operatorname{Col}(A)$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The columns of $Q$ are an orthonormal basis of $\\operatorname{Col}(Q) = \\operatorname{Col}(A)$. For an orthonormal basis, $\\operatorname{Proj}_W\\mathbf{y} = QQ^T\\mathbf{y}$ (Lay Thm 10). So $QQ^T$ ($6\\times 6$, rank 3) is the projection matrix onto $\\operatorname{Col} A$, **not** $I_6$. **True**.",
  },

  // ---------------------------------------------------------------- MCQ (12)
  {
    subtopic: "Dot product & norm",
    kind: "mcq",
    prompt:
      "What is the angle between $\\mathbf{u} = (1, 1, 0)$ and $\\mathbf{v} = (1, 0, 1)$?",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v} = 1$, $\\|\\mathbf{u}\\| = \\|\\mathbf{v}\\| = \\sqrt{2}$. So $\\cos\\theta = \\dfrac{1}{\\sqrt2\\cdot\\sqrt2} = \\dfrac12$, giving $\\theta = 60^\\circ$. A positive dot product always means an acute angle, which rules out $90^\\circ$ immediately.",
  },
  {
    subtopic: "Projection",
    kind: "mcq",
    prompt:
      "Write $\\mathbf{y} = (7, 6)$ as $\\hat{\\mathbf{y}} + \\mathbf{z}$, where $\\hat{\\mathbf{y}} \\in \\operatorname{Span}\\{\\mathbf{u}\\}$ with $\\mathbf{u} = (4, 2)$ and $\\mathbf{z} \\perp \\mathbf{u}$. What is $\\mathbf{z}$?",
    options: ["$(8, 4)$", "$(3, 4)$", "$(1, -2)$", "$(-1, 2)$", NOTA],
    answer: 3,
    solution:
      "$\\hat{\\mathbf{y}} = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}\\mathbf{u} = \\dfrac{40}{20}(4,2) = (8,4)$. Then $\\mathbf{z} = \\mathbf{y} - \\hat{\\mathbf{y}} = (-1, 2)$. Check: $(-1,2)\\cdot(4,2) = 0$. $(8,4)$ is $\\hat{\\mathbf{y}}$, not $\\mathbf{z}$, and $(1,-2)$ has the wrong sign ($\\hat{\\mathbf{y}}+\\mathbf{z}$ must give back $\\mathbf{y}$).",
  },
  {
    subtopic: "Orthogonal complements",
    kind: "mcq",
    prompt:
      "$A$ is a $4\\times 6$ matrix of rank 3. What are $\\dim\\big((\\operatorname{Row} A)^\\perp\\big)$ and $\\dim\\big((\\operatorname{Col} A)^\\perp\\big)$, in that order?",
    options: ["$1$ and $3$", "$3$ and $1$", "$3$ and $3$", "$2$ and $1$", NOTA],
    answer: 1,
    solution:
      "$(\\operatorname{Row} A)^\\perp = \\operatorname{Nul} A \\subset \\mathbb{R}^6$ with dimension $6 - 3 = 3$. $(\\operatorname{Col} A)^\\perp = \\operatorname{Nul} A^T \\subset \\mathbb{R}^4$ with dimension $4 - 3 = 1$. In general $\\dim W + \\dim W^\\perp$ = the dimension of the ambient space.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "mcq",
    prompt: "Which of the following is an orthogonal matrix?",
    options: [
      "$\\begin{bmatrix} 3/5 & -4/5 \\\\ 4/5 & 3/5 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1/\\sqrt2 & 0 \\\\ 1/\\sqrt2 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 2 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "An orthogonal matrix is **square** with **orthonormal** columns. The first has columns of length $\\sqrt{9/25+16/25} = 1$ with dot product $-12/25+12/25 = 0$, so it qualifies. The second has orthogonal columns of length $\\sqrt2$ ($U^TU = 2I$). The third has orthonormal columns but is $3\\times2$, not square. The fourth has a column of length 2.",
  },
  {
    subtopic: "Orthonormal & orthogonal matrices",
    kind: "mcq",
    prompt: "$U$ is a $5\\times 3$ matrix with orthonormal columns. Which statement is correct?",
    options: [
      "$U^TU = I_3$ and $UU^T = I_5$",
      "$U^TU = I_5$ and $UU^T$ is a projection matrix",
      "$U^TU = I_3$ and $UU^T$ is a $5\\times5$ rank-3 matrix that projects onto $\\operatorname{Col} U$",
      "Neither $U^TU$ nor $UU^T$ is an identity matrix",
      NOTA,
    ],
    answer: 2,
    solution:
      "Entry $(i,j)$ of $U^TU$ is $\\mathbf{u}_i\\cdot\\mathbf{u}_j$, so orthonormal columns give $U^TU = I_3$ ($3\\times3$). $UU^T$ is $5\\times5$ but has rank 3, so it is not $I_5$. It is the projection matrix onto $\\operatorname{Col}U$: $UU^T\\mathbf{y} = \\operatorname{Proj}_{\\operatorname{Col}U}\\mathbf{y}$.",
  },
  {
    subtopic: "Projection",
    kind: "mcq",
    prompt:
      "$\\mathbf{u}_1 = (2, 5, -1)$ and $\\mathbf{u}_2 = (-2, 1, 1)$ are orthogonal, and $W = \\operatorname{Span}\\{\\mathbf{u}_1, \\mathbf{u}_2\\}$. For $\\mathbf{y} = (1, 2, 3)$, what is $\\operatorname{Proj}_W\\mathbf{y}$?",
    options: [
      "$(-2, 1, 1)$",
      "$(1, 2, 3)$",
      "$(7/5, 0, 14/5)$",
      "$(-2/5, 2, 1/5)$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$\\mathbf{y}\\cdot\\mathbf{u}_1 = 9$, $\\mathbf{u}_1\\cdot\\mathbf{u}_1 = 30$, $\\mathbf{y}\\cdot\\mathbf{u}_2 = 3$, $\\mathbf{u}_2\\cdot\\mathbf{u}_2 = 6$. So $\\hat{\\mathbf{y}} = \\tfrac{3}{10}(2,5,-1) + \\tfrac12(-2,1,1) = (-2/5, 2, 1/5)$. The vector $(7/5, 0, 14/5)$ is $\\mathbf{y} - \\hat{\\mathbf{y}}$, the component in $W^\\perp$. You can check it is orthogonal to both $\\mathbf{u}_1$ and $\\mathbf{u}_2$.",
  },
  {
    subtopic: "Best approximation",
    kind: "mcq",
    prompt:
      "With $\\mathbf{u}_1 = (2, 5, -1)$, $\\mathbf{u}_2 = (-2, 1, 1)$ (orthogonal), $W = \\operatorname{Span}\\{\\mathbf{u}_1,\\mathbf{u}_2\\}$ and $\\mathbf{y} = (1, 2, 3)$, what is the distance from $\\mathbf{y}$ to $W$?",
    options: ["$\\sqrt5$", "$7/5$", "$7$", "$3\\sqrt5/5$", NOTA],
    answer: 4,
    solution:
      "By the Best Approximation Theorem the distance is $\\|\\mathbf{y} - \\operatorname{Proj}_W\\mathbf{y}\\|$. Here $\\mathbf{y} - \\hat{\\mathbf{y}} = (7/5, 0, 14/5)$, whose norm is $\\sqrt{49/25 + 196/25} = \\sqrt{245}/5 = 7/\\sqrt5 \\approx 3.13$. None of the listed values equals $7/\\sqrt5$, so the answer is **None of the above**.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "mcq",
    prompt:
      "Apply Gram–Schmidt to $\\mathbf{x}_1 = (3, 6, 0)$, $\\mathbf{x}_2 = (1, 2, 2)$ with $\\mathbf{v}_1 = \\mathbf{x}_1$. What is the (unnormalised) $\\mathbf{v}_2$?",
    options: ["$(0, 0, 2)$", "$(1, 2, 0)$", "$(0, 0, 1)$", "$(-2, -4, 2)$", NOTA],
    answer: 0,
    solution:
      "$\\mathbf{v}_2 = \\mathbf{x}_2 - \\dfrac{\\mathbf{x}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1}\\mathbf{v}_1 = (1,2,2) - \\dfrac{15}{45}(3,6,0) = (1,2,2) - (1,2,0) = (0,0,2)$. $(1,2,0)$ is the projection being subtracted. $(0,0,1)$ is the **normalised** $\\mathbf{q}_2$, which the question did not ask for.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "mcq",
    prompt:
      "$A = \\begin{bmatrix} 3 & 1 \\\\ 6 & 2 \\\\ 0 & 2 \\end{bmatrix} = QR$, where $Q$ has orthonormal columns from Gram–Schmidt (positive diagonal in $R$). What is $R$?",
    options: [
      "$\\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 3\\sqrt5 & \\sqrt5 \\\\ 0 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} \\sqrt5 & 1/\\sqrt5 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 3\\sqrt5 & 0 \\\\ \\sqrt5 & 2 \\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$\\mathbf{q}_1 = (3,6,0)/\\sqrt{45} = (1,2,0)/\\sqrt5$ and $\\mathbf{q}_2 = (0,0,1)$ (from Gram–Schmidt, $\\mathbf{v}_2 = (0,0,2)$). Then $R = Q^TA$: $r_{11} = \\mathbf{q}_1\\cdot\\mathbf{a}_1 = 15/\\sqrt5 = 3\\sqrt5$, $r_{12} = \\mathbf{q}_1\\cdot\\mathbf{a}_2 = 5/\\sqrt5 = \\sqrt5$, $r_{22} = \\mathbf{q}_2\\cdot\\mathbf{a}_2 = 2$. $R$ must be **upper** triangular, which rules out the fourth option.",
  },
  {
    subtopic: "Gram–Schmidt & QR",
    kind: "mcq",
    prompt:
      "$A$ is $7\\times 4$ with linearly independent columns, and $A = QR$ is its economy QR factorization. Which statement is **false**?",
    options: [
      "$Q$ is $7\\times4$ and $\\operatorname{Col} Q = \\operatorname{Col} A$",
      "$R$ is $4\\times4$, upper triangular and invertible",
      "$Q^TQ = I_4$",
      "$QQ^T = I_7$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$QQ^T$ is $7\\times7$ with rank 4, so it cannot be $I_7$. It is the projection onto $\\operatorname{Col}A$. All other statements are true: Gram–Schmidt keeps the column space, $Q^TQ = I_4$ because the columns are orthonormal, and independent columns make $R$ invertible.",
  },
  {
    subtopic: "Best approximation",
    kind: "mcq",
    prompt:
      "$W$ is a subspace of $\\mathbb{R}^n$, $\\mathbf{y}\\in\\mathbb{R}^n$ and $\\hat{\\mathbf{y}} = \\operatorname{Proj}_W\\mathbf{y}$. Which statement is **always** true?",
    options: [
      "$\\|\\hat{\\mathbf{y}}\\| \\le \\|\\mathbf{y}\\|$",
      "$\\hat{\\mathbf{y}} \\perp \\mathbf{y}$",
      "$\\|\\mathbf{y} - \\hat{\\mathbf{y}}\\| \\le \\|\\hat{\\mathbf{y}}\\|$",
      "$\\hat{\\mathbf{y}}$ depends on which orthogonal basis of $W$ is used",
      NOTA,
    ],
    answer: 0,
    solution:
      "Since $\\hat{\\mathbf{y}} \\perp (\\mathbf{y}-\\hat{\\mathbf{y}})$, Pythagoras gives $\\|\\mathbf{y}\\|^2 = \\|\\hat{\\mathbf{y}}\\|^2 + \\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|^2 \\ge \\|\\hat{\\mathbf{y}}\\|^2$. It is the **residual** $\\mathbf{y}-\\hat{\\mathbf{y}}$ that is orthogonal to $\\hat{\\mathbf{y}}$, not $\\mathbf{y}$ itself. The residual can be longer than $\\hat{\\mathbf{y}}$ (e.g. when $\\mathbf{y}$ is nearly in $W^\\perp$). The projection is unique, so it does not depend on the basis.",
  },
  {
    subtopic: "Orthogonal complements",
    kind: "mcq",
    prompt:
      "Let $W = \\{\\mathbf{x}\\in\\mathbb{R}^3 : x_1 - 2x_2 + x_3 = 0\\}$. What is $W^\\perp$?",
    options: [
      "$W$ itself",
      "$\\operatorname{Span}\\{(1, 2, 1)\\}$",
      "$\\operatorname{Span}\\{(1, -2, 1)\\}$",
      "$\\{\\mathbf{0}\\}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$W = \\operatorname{Nul}\\begin{bmatrix}1 & -2 & 1\\end{bmatrix}$, and $(\\operatorname{Nul}A)^\\perp = \\operatorname{Row}A$. So $W^\\perp$ is spanned by the normal vector $(1,-2,1)$. Dimension check: $\\dim W + \\dim W^\\perp = 2 + 1 = 3$. $(1,2,1)$ is not orthogonal to $(2,1,0)\\in W$.",
  },
];
