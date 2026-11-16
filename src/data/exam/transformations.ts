import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const transformationsExam: ConceptQuestion[] = [
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ be a linear transformation such that $T\\left(\\begin{bmatrix}1\\\\3\\end{bmatrix}\\right) = \\begin{bmatrix}4\\\\1\\end{bmatrix}$ and $T\\left(\\begin{bmatrix}2\\\\-1\\end{bmatrix}\\right) = \\begin{bmatrix}1\\\\-5\\end{bmatrix}$. The standard matrix of $T$ is",
    options: [
      "$\\begin{bmatrix}4&1\\\\1&-5\\end{bmatrix}$",
      "$\\begin{bmatrix}1&-2\\\\1&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&1\\\\-2&1\\end{bmatrix}$",
      "$\\begin{bmatrix}7&7\\\\-14&7\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "With $B = \\begin{bmatrix}1&2\\\\3&-1\\end{bmatrix}$ (inputs as columns) and $Y = \\begin{bmatrix}4&1\\\\1&-5\\end{bmatrix}$ (images as columns), $AB = Y$, so $A = YB^{-1}$.\n$B^{-1} = \\dfrac{1}{-7}\\begin{bmatrix}-1&-2\\\\-3&1\\end{bmatrix} = \\dfrac17\\begin{bmatrix}1&2\\\\3&-1\\end{bmatrix}$, and $A = \\dfrac17\\begin{bmatrix}4&1\\\\1&-5\\end{bmatrix}\\begin{bmatrix}1&2\\\\3&-1\\end{bmatrix} = \\dfrac17\\begin{bmatrix}7&7\\\\-14&7\\end{bmatrix} = \\begin{bmatrix}1&1\\\\-2&1\\end{bmatrix}$.\nCheck: $A(1,3) = (4,1)$ ✓ and $A(2,-1) = (1,-5)$ ✓.\nTraps: $Y$ itself (option A) treats the inputs as $\\mathbf{e}_1,\\mathbf{e}_2$. Option B is $A^T$. Option D is $YB$ (multiplied by $B$ instead of $B^{-1}$).",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first rotates points through $3\\pi/4$ radians (counter-clockwise) about the origin and then reflects points across the vertical $x_2$-axis. The standard matrix of $T$ is",
    options: [
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}1&-1\\\\-1&-1\\end{bmatrix}$",
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$",
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}-1&-1\\\\-1&1\\end{bmatrix}$",
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}-1&-1\\\\1&-1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Rotation: $R = \\begin{bmatrix}\\cos\\frac{3\\pi}4&-\\sin\\frac{3\\pi}4\\\\\\sin\\frac{3\\pi}4&\\cos\\frac{3\\pi}4\\end{bmatrix} = \\dfrac1{\\sqrt2}\\begin{bmatrix}-1&-1\\\\1&-1\\end{bmatrix}$. Reflection across the $x_2$-axis: $M = \\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$.\nThe rotation acts first, so the matrix is $MR$. Left-multiplying by $M$ negates the first **row** of $R$: $MR = \\dfrac1{\\sqrt2}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$.\nTraps: $RM$ (wrong order) negates the first column instead, giving option A. Option C uses the $x_1$-axis reflection, and option D is $R$ alone. (The answer is the reflection across the line at angle $\\pi/8$, since a rotation followed by a reflection is a reflection.)",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first reflects points across the vertical $x_2$-axis and then reflects points across the line $y = x$. Then $T$ is",
    options: [
      "a rotation through $\\pi/2$ counter-clockwise",
      "the reflection across the line $y = -x$",
      "a rotation through $\\pi$",
      "a rotation through $\\pi/2$ clockwise",
      NOTA,
    ],
    answer: 3,
    solution:
      "Matrix $= \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix} = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ (first map on the right).\nComparing with $R_\\theta$: $\\cos\\theta = 0$ and $\\sin\\theta = -1$, so $\\theta = -\\pi/2$, a rotation through $\\pi/2$ **clockwise**. Check: $\\mathbf{e}_1\\mapsto(-1,0)\\mapsto(0,-1)$.\nTwo-reflection rule: mirrors at angles $\\alpha = \\pi/2$ then $\\beta = \\pi/4$ give rotation by $2(\\beta-\\alpha) = -\\pi/2$ ✓. Multiplying in the wrong order gives the counter-clockwise rotation (option A).",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "Let $L$ be the rotation of $\\mathbb{R}^2$ through $90^\\circ$ counter-clockwise, $M$ the reflection across the $x_2$-axis, $N$ the projection onto the $x_1$-axis and $K$ the rotation through $180^\\circ$ (all about the origin). Which of the following statements are correct?\nI. $L\\circ M = M\\circ L$\nII. $M\\circ N = N\\circ M$\nIII. $L\\circ K = K\\circ L$\nIV. $L\\circ N = N\\circ L$",
    options: ["I and II only", "II and III only", "III and IV only", "II, III and IV only", NOTA],
    answer: 1,
    solution:
      "Matrices: $L = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, $M = \\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$, $N = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $K = -I$.\nI: $LM = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$ but $ML = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$. **False**.\nII: $M$ and $N$ are both diagonal, so they commute ($MN = NM = \\begin{bmatrix}-1&0\\\\0&0\\end{bmatrix}$). **True**.\nIII: $K = -I$ commutes with everything. **True**.\nIV: $LN = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$ but $NL = \\begin{bmatrix}0&-1\\\\0&0\\end{bmatrix}$. **False**.\nSo II and III only.",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^4\\to\\mathbb{R}^4$ be defined by $T(x_1,x_2,x_3,x_4) = (x_1+x_3,\\ 0,\\ x_2-x_4,\\ x_2-x_4)$. Which of the following is a basis for $\\ker T$?",
    options: [
      "$\\{(1,0,1,0),\\ (0,1,0,-1)\\}$",
      "$\\{(0,1,0,0),\\ (0,0,0,1)\\}$",
      "$\\{(1,0,-1,0)\\}$",
      "$\\{(-1,0,1,0),\\ (0,1,0,1)\\}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$T(\\mathbf{x}) = \\mathbf{0}$ needs $x_1 = -x_3$ and $x_2 = x_4$, with $x_3, x_4$ free. So $\\mathbf{x} = x_3(-1,0,1,0)+x_4(0,1,0,1)$, and $\\dim\\ker T = 2$ (rank 2, $2+2 = 4$ ✓).\nOption A has the signs wrong: $T(1,0,1,0) = (2,0,0,0)\\ne\\mathbf{0}$. Option B: $T(0,1,0,0) = (0,0,1,1)\\ne\\mathbf{0}$. Option C lies in the kernel, but one vector cannot span a 2-dimensional kernel.",
  },
  {
    subtopic: "Rank–nullity",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^6\\to\\mathbb{R}^4$ is a linear transformation whose standard matrix $A$ has rank 3. Which of the following is true?",
    options: [
      "$\\dim\\ker T = 1$",
      "$T(\\mathbf{x}) = \\mathbf{b}$ has infinitely many solutions for every $\\mathbf{b}\\in\\mathbb{R}^4$",
      "The range of $T$ is a 3-dimensional subspace of $\\mathbb{R}^4$",
      "$T$ is one-to-one",
      NOTA,
    ],
    answer: 2,
    solution:
      "$\\operatorname{range}T = C(A)\\subseteq\\mathbb{R}^4$ has dimension $\\operatorname{rank}A = 3$, so C is true.\nA: rank–nullity uses the domain, so $\\dim\\ker T = 6-3 = 3$, not $4-3 = 1$.\nB: rank $3<4$ means $T$ is not onto. For $\\mathbf{b}\\notin C(A)$ there is **no** solution. (When a solution exists there are infinitely many, but not for every $\\mathbf{b}$.)\nD: $\\ker T\\ne\\{\\mathbf{0}\\}$, so $T$ is not one-to-one.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:P_2\\to P_3$ be defined by $T(p) = p'(x)+x\\,p(x)$. The matrix of $T$ relative to the bases $\\{1, x, x^2\\}$ and $\\{1, x, x^2, x^3\\}$ is",
    options: [
      "$\\begin{bmatrix}0&1&0\\\\1&0&2\\\\0&1&0\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1&0&0\\\\1&0&1&0\\\\0&2&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&0&0\\\\1&0&0\\\\0&1&0\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1&0\\\\1&0&1\\\\0&1&0\\\\0&0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Apply $T$ to each basis polynomial:\n$T(1) = 0+x = x$, with coordinates $(0,1,0,0)$.\n$T(x) = 1+x^2$, with coordinates $(1,0,1,0)$.\n$T(x^2) = 2x+x^3$, with coordinates $(0,2,0,1)$.\nThese are the **columns** of a $4\\times3$ matrix, which gives option A.\nTraps: B is the transpose (wrong size, $3\\times4$). C forgets the $p'$ term. D forgets the factor 2 in $(x^2)' = 2x$.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:P_2\\to P_4$ be defined by $T(p) = (x^2-3)\\,p(x)$. Which of the following statements are correct?\nI. The matrix of $T$ relative to the standard bases is $5\\times3$ and its first column is $(-3,0,1,0,0)^T$.\nII. $T$ is one-to-one.\nIII. $T$ maps $P_2$ onto $P_4$.\nIV. $\\dim\\operatorname{range}T = 3$.",
    options: ["I and II only", "II and IV only", "I, II and IV only", "All of the above", NOTA],
    answer: 2,
    solution:
      "I: $T(1) = -3+x^2$, with coordinates $(-3,0,1,0,0)$, and the matrix is $(\\dim P_4)\\times(\\dim P_2) = 5\\times3$. **True**.\nII: if $(x^2-3)p(x)$ is the zero polynomial, then $p = 0$. So $\\ker T = \\{0\\}$. **True**.\nIV: rank–nullity gives $\\dim\\operatorname{range}T = 3-0 = 3$. **True**.\nIII: $3<5 = \\dim P_4$, so $T$ is not onto (e.g. the constant $1$ is not a multiple of $x^2-3$). **False**.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:M_{2\\times2}\\to M_{2\\times2}$ be defined by $T\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right) = \\begin{bmatrix}a-d&b+c\\\\b+c&d-a\\end{bmatrix}$. Which of the following statements are correct?\nI. $\\dim\\ker T = 2$.\nII. The range of $T$ is the set of all $2\\times2$ symmetric matrices.\nIII. $\\begin{bmatrix}1&2\\\\-2&1\\end{bmatrix}\\in\\ker T$.\nIV. $T$ is onto.",
    options: ["I and III only", "I, II and III only", "II and IV only", "III only", NOTA],
    answer: 0,
    solution:
      "Kernel: $a = d$ and $c = -b$, so $\\ker T = \\left\\{\\begin{bmatrix}a&b\\\\-b&a\\end{bmatrix}\\right\\}$, dimension 2. I is **true**, and III is **true** ($a = d = 1$, $c = -2 = -b$).\nRange: every output has the form $\\begin{bmatrix}p&q\\\\q&-p\\end{bmatrix}$ (symmetric **and** trace zero), dimension $4-2 = 2$. It does not contain e.g. $I$, so II is **false**, and with $\\dim = 2<4$, IV is **false**.\nIn the standard basis $\\{E_{11},E_{12},E_{21},E_{22}\\}$ the matrix is $\\begin{bmatrix}1&0&0&-1\\\\0&1&1&0\\\\0&1&1&0\\\\-1&0&0&1\\end{bmatrix}$, of rank 2.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:M_{3\\times3}\\to M_{3\\times3}$ be defined by $T(A) = A-A^T$. Then $(\\dim\\ker T,\\ \\dim\\operatorname{range}T)$ is",
    options: ["$(3,\\ 6)$", "$(6,\\ 3)$", "$(0,\\ 9)$", "$(4,\\ 5)$", NOTA],
    answer: 1,
    solution:
      "$T(A) = 0\\iff A^T = A$, so the kernel is the set of $3\\times3$ symmetric matrices. Choose the 3 diagonal entries and the 3 entries above the diagonal freely, so the dimension is 6.\nEvery output is skew-symmetric, and every skew-symmetric $S$ is hit: $T(\\tfrac12S) = \\tfrac12S+\\tfrac12S = S$. The skew-symmetric matrices have dimension 3 (entries above the diagonal; the diagonal is 0).\nCheck: $6+3 = 9 = \\dim M_{3\\times3}$ ✓.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $D:P_3\\to P_3$ be the differentiation map $D(p) = p'$. Which of the following statements are correct?\nI. $D$ is one-to-one.\nII. The range of $D$ is $P_2$.\nIII. $D^4 = D\\circ D\\circ D\\circ D$ is the zero transformation.\nIV. The matrix of $D$ relative to $\\{1,t,t^2,t^3\\}$ has rank 3.",
    options: ["II and III only", "III and IV only", "I, II and IV only", "II, III and IV only", "All of the above"],
    answer: 3,
    solution:
      "I: $D(1) = 0 = D(0)$, so $\\ker D$ = constants $\\ne\\{0\\}$. **False**.\nII: derivatives of cubics are exactly the polynomials of degree $\\le2$ (e.g. $D(\\tfrac13t^3) = t^2$). **True**.\nIII: four derivatives of a cubic give $0$. **True**.\nIV: the matrix $\\begin{bmatrix}0&1&0&0\\\\0&0&2&0\\\\0&0&0&3\\\\0&0&0&0\\end{bmatrix}$ has 3 pivots, consistent with $\\dim\\ker D = 1$ and $1+3 = 4$. **True**.",
  },
  {
    subtopic: "Invertible transformations",
    kind: "tfn",
    prompt:
      "Let $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ be a linear transformation such that $T\\circ T$ is the identity transformation. Then $T$ is one-to-one.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $T(\\mathbf{u}) = T(\\mathbf{v})$, apply $T$ again: $\\mathbf{u} = T(T(\\mathbf{u})) = T(T(\\mathbf{v})) = \\mathbf{v}$. So $T$ is one-to-one (indeed invertible with $T^{-1} = T$). In matrix terms, $A^2 = I$ makes $A$ invertible. Reflections are examples. **True**.",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt:
      "$A$ is a $4\\times4$ matrix and $T(\\mathbf{x}) = A\\mathbf{x}$ does not map $\\mathbb{R}^4$ onto $\\mathbb{R}^4$. Then $\\ker T$ is a line through the origin.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Not onto means $\\operatorname{rank}A\\le3$, so $\\dim\\ker T = 4-\\operatorname{rank}A$ is at least 1 but could be 1, 2, 3 or 4 (e.g. $A = 0$ gives $\\ker T = \\mathbb{R}^4$). The kernel is a line only when the rank is exactly 3, which is not given. **Cannot be determined**.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&2&h\\\\0&1&3\\\\2&3&1\\end{bmatrix}$ and $T(\\mathbf{x}) = A\\mathbf{x}$. For which value(s) of $h$ is $T$ **not** one-to-one?",
    options: ["$h = -2$", "$h = 2$", "$h = \\tfrac12$", "For no value of $h$", NOTA],
    answer: 1,
    solution:
      "Row reduce: $R_3-2R_1$ gives $(0,-1,1-2h)$. Then adding $R_2 = (0,1,3)$ gives $(0,0,4-2h)$.\nIf $h\\ne2$ there are 3 pivots, so $\\ker T = \\{\\mathbf{0}\\}$ and $T$ is one-to-one. If $h = 2$ the last row is zero, which leaves a free variable, so $T$ is not one-to-one.\nCheck with $h = 2$: $A(4,-3,1) = (4-6+2,\\ -3+3,\\ 8-9+1) = \\mathbf{0}$.",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt:
      "Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}1&-2\\\\3&-5\\\\-1&4\\end{bmatrix}$ and $\\mathbf{b} = \\begin{bmatrix}1\\\\4\\\\k\\end{bmatrix}$. For which $k$ is $\\mathbf{b}$ in the range of $T$, and how many $\\mathbf{x}$ satisfy $T(\\mathbf{x}) = \\mathbf{b}$ for that $k$?",
    options: [
      "$k = 1$; exactly one $\\mathbf{x}$",
      "$k = 1$; infinitely many $\\mathbf{x}$",
      "$k = -1$; exactly one $\\mathbf{x}$",
      "every real $k$; exactly one $\\mathbf{x}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "The first two rows give $x_1-2x_2 = 1$ and $3x_1-5x_2 = 4$. From the first, $x_1 = 1+2x_2$, so $3+6x_2-5x_2 = 4$, giving $x_2 = 1$ and $x_1 = 3$.\nThe third row must then agree: $k = -x_1+4x_2 = -3+4 = 1$.\nThe columns of $A$ are independent (not multiples of each other), so $\\ker T = \\{\\mathbf{0}\\}$ and the solution $\\mathbf{x} = (3,1)$ is unique. The range is only a plane in $\\mathbb{R}^3$, so not every $k$ works.",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^2\\to\\mathbb{R}^3$ be linear with $T(\\mathbf{e}_1) = \\begin{bmatrix}1\\\\0\\\\-1\\end{bmatrix}$ and $T(\\mathbf{e}_2) = \\begin{bmatrix}a\\\\2\\\\b\\end{bmatrix}$, and let $S:\\mathbb{R}^3\\to\\mathbb{R}^2$ have standard matrix $B = \\begin{bmatrix}1&1&0\\\\2&0&1\\end{bmatrix}$. If the standard matrix of $S\\circ T$ is $\\begin{bmatrix}1&5\\\\1&4\\end{bmatrix}$, then $(a, b) =$",
    options: ["$(5,\\ -6)$", "$(3,\\ 2)$", "$(-2,\\ 3)$", "$(3,\\ -2)$", NOTA],
    answer: 3,
    solution:
      "The matrix of $S\\circ T$ is $BA$ with $A = \\begin{bmatrix}1&a\\\\0&2\\\\-1&b\\end{bmatrix}$:\n$BA = \\begin{bmatrix}1+0+0 & a+2+0\\\\2+0-1 & 2a+0+b\\end{bmatrix} = \\begin{bmatrix}1&a+2\\\\1&2a+b\\end{bmatrix}$.\nMatching: $a+2 = 5\\Rightarrow a = 3$, and $2a+b = 4\\Rightarrow b = -2$.\nTraps: forgetting the $+2$ from the middle entry gives $(5,-6)$, and writing $2a-b = 4$ gives $(3,2)$. ($AB$ is $3\\times3$ and cannot match a $2\\times2$ matrix.)",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "A linear transformation $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first rotates points $90^\\circ$ counter-clockwise, then applies the horizontal shear $(x_1,x_2)\\mapsto(x_1+2x_2,\\ x_2)$, and finally reflects points across the line $y = x$. Find $T(2,1)$.",
    options: ["$(2,\\ 3)$", "$(-2,\\ 5)$", "$(4,\\ -1)$", "$(3,\\ 2)$", NOTA],
    answer: 0,
    solution:
      "Follow the point step by step.\nRotate: $(2,1)\\mapsto(-1,2)$.\nShear: $(-1,2)\\mapsto(-1+4,\\ 2) = (3,2)$.\nReflect across $y = x$ (swap): $(3,2)\\mapsto(2,3)$.\nAs one matrix: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}1&0\\\\2&-1\\end{bmatrix}$, and $\\begin{bmatrix}1&0\\\\2&-1\\end{bmatrix}(2,1) = (2,3)$ ✓.\nTraps: $(3,2)$ stops before the reflection. $(-2,5)$ does the three steps in reverse order (reflect, shear, rotate), which is what the product in the wrong order computes. $(4,-1)$ shears before rotating.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:P_4\\to P_2$ be defined by $T(p) = p''$. Which of the following statements are correct?\nI. $\\ker T = P_1$.\nII. $T$ maps $P_4$ onto $P_2$.\nIII. $\\dim\\operatorname{range}T = 3$.\nIV. $T$ is one-to-one.",
    options: ["I and II only", "I, II and III only", "II and III only", "All of the above", NOTA],
    answer: 1,
    solution:
      "I: $p'' = 0$ exactly for $p = a+bx$, so $\\ker T = P_1$, dimension 2. **True**.\nII and III: $\\dim P_4 = 5$, so $\\dim\\operatorname{range}T = 5-2 = 3 = \\dim P_2$, and $T$ is onto. Concretely, $T(\\tfrac12x^2) = 1$, $T(\\tfrac16x^3) = x$, $T(\\tfrac1{12}x^4) = x^2$. **Both true**.\nIV: the kernel is not $\\{0\\}$. **False**.\nNote $\\dim P_4 = 5$, not 4: forgetting the constant term gives the wrong nullity.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^3\\to\\mathbb{R}^3$ is linear and $T(\\mathbf{u}) = T(\\mathbf{v})$ for some vectors $\\mathbf{u}\\ne\\mathbf{v}$. Then $T(\\mathbf{x}) = \\mathbf{b}$ has infinitely many solutions for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\mathbf{u}-\\mathbf{v}$ is a nonzero vector in $\\ker T$, so $T$ is not one-to-one. Because $T$ is square, it is then **not onto** either: some $\\mathbf{b}$ are not in the range and give **no** solution. (For $\\mathbf{b}$ in the range there are infinitely many solutions $\\mathbf{p}+\\ker T$.) \"For every $\\mathbf{b}$\" fails. **False**.",
  },
  {
    subtopic: "Invertible transformations",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(1,1) = (2,2)$ and $T(1,-1) = (3,-3)$. Then $T$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$(1,1)$ and $(1,-1)$ form a basis of $\\mathbb{R}^2$, so $T$ is fully determined. Its range contains $(2,2)$ and $(3,-3)$, which are independent, so $\\operatorname{range}T = \\mathbb{R}^2$. $T$ is onto, and since it is square it is invertible. (Explicitly $A = \\tfrac12\\begin{bmatrix}5&-1\\\\-1&5\\end{bmatrix}$, with $ad-bc = 6\\ne0$.) **True**.",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^3\\to\\mathbb{R}^3$ projects every point onto the $x_1x_2$-plane, $T(x_1,x_2,x_3) = (x_1,x_2,0)$. Then $\\ker T$ is the $x_1x_2$-plane.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$T(\\mathbf{x}) = \\mathbf{0}$ iff $x_1 = x_2 = 0$, so $\\ker T = \\{(0,0,x_3)\\}$, the $x_3$-axis. The $x_1x_2$-plane is the **range**. Check: $\\dim\\ker+\\dim\\operatorname{range} = 1+2 = 3$ ✓. **False**.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt: "Which of the following statements about linear transformations is **false**?",
    options: [
      "If $T$ is linear, then $T(\\mathbf{0}) = \\mathbf{0}$.",
      "If $n>m$, then no linear $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is one-to-one.",
      "If $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ and $S:\\mathbb{R}^m\\to\\mathbb{R}^p$ are both one-to-one, then $S\\circ T$ is one-to-one.",
      "If a linear $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is onto, then $n\\ge m$.",
      "If $S\\circ T$ is one-to-one, then $S$ is one-to-one.",
    ],
    answer: 4,
    solution:
      "E is false. Take $T:\\mathbb{R}\\to\\mathbb{R}^2$, $T(x) = (x,0)$ and $S:\\mathbb{R}^2\\to\\mathbb{R}$, $S(x_1,x_2) = x_1$. Then $S\\circ T$ is the identity on $\\mathbb{R}$ (one-to-one), but $S(0,1) = 0$, so $S$ is not one-to-one. What **is** true: $S\\circ T$ one-to-one forces $T$ (the first map) to be one-to-one.\nA: $T(\\mathbf{0}) = 0\\cdot T(\\mathbf{0}) = \\mathbf{0}$. B: more columns than rows leaves a free variable. C: $S(T(\\mathbf{x})) = \\mathbf{0}\\Rightarrow T(\\mathbf{x}) = \\mathbf{0}\\Rightarrow\\mathbf{x} = \\mathbf{0}$. D: onto needs $m$ pivots among $n$ columns.",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ be linear with $T(1,1,0) = (1,2)$, $T(0,1,1) = (0,1)$ and $T(1,0,1) = (3,-1)$. Then $T(3,1,0) =$",
    options: ["$(3,\\ 7)$", "$(5,\\ 4)$", "$(-1,\\ 4)$", "$(5,\\ 0)$", NOTA],
    answer: 4,
    solution:
      "Write $(3,1,0) = a(1,1,0)+b(0,1,1)+c(1,0,1)$: $a+c = 3$, $a+b = 1$, $b+c = 0$. Adding all three, $2(a+b+c) = 4$, so $a+b+c = 2$. Then $c = 2-1 = 1$, $a = 2-0 = 2$ and $b = 2-3 = -1$.\nCheck: $2(1,1,0)-(0,1,1)+(1,0,1) = (3,1,0)$ ✓.\n$T(3,1,0) = 2(1,2)-(0,1)+(3,-1) = (5,2)$. This is not listed, so the answer is **None of the above**.\nTraps: $(3,7)$ multiplies $[T(\\mathbf{b}_1)\\ T(\\mathbf{b}_2)\\ T(\\mathbf{b}_3)]$ by $(3,1,0)$ directly. $(5,4)$ takes $b = +1$, and $(-1,4)$ takes $c = -1$.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first rotates points through $\\pi/6$ radians **clockwise** about the origin and then dilates by a factor of 2. Find $T(\\sqrt3,\\ 1)$.",
    options: ["$(4,\\ 0)$", "$(2,\\ 2\\sqrt3)$", "$(2\\sqrt3,\\ 2)$", "$(2,\\ 0)$", NOTA],
    answer: 0,
    solution:
      "Clockwise by $\\pi/6$: $\\begin{bmatrix}\\cos\\frac\\pi6&\\sin\\frac\\pi6\\\\-\\sin\\frac\\pi6&\\cos\\frac\\pi6\\end{bmatrix} = \\begin{bmatrix}\\frac{\\sqrt3}2&\\frac12\\\\-\\frac12&\\frac{\\sqrt3}2\\end{bmatrix}$.\nApplied to $(\\sqrt3,1)$: $(\\tfrac32+\\tfrac12,\\ -\\tfrac{\\sqrt3}2+\\tfrac{\\sqrt3}2) = (2,0)$. This makes sense: $(\\sqrt3,1)$ has length 2 and angle $\\pi/6$, so it lands on the positive $x_1$-axis.\nDilating by 2 gives $(4,0)$.\nTraps: rotating counter-clockwise gives $2(1,\\sqrt3) = (2,2\\sqrt3)$. $(2\\sqrt3,2)$ skips the rotation, and $(2,0)$ skips the dilation.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&2&0&1\\\\0&1&1&2\\\\1&3&1&k\\end{bmatrix}$ and $T(\\mathbf{x}) = A\\mathbf{x}$. Which of the following statements are correct?\nI. For $k\\ne3$, $T$ maps $\\mathbb{R}^4$ onto $\\mathbb{R}^3$.\nII. For $k = 3$, $\\dim\\ker T = 2$.\nIII. There is no value of $k$ for which $T$ is one-to-one.\nIV. $(2,-1,1,0)\\in\\ker T$ only when $k = 3$.",
    options: ["I and II only", "I and III only", "I, II and III only", "All of the above", NOTA],
    answer: 2,
    solution:
      "$R_3-R_1-R_2 = (0,0,0,k-3)$. So for $k\\ne3$ there are 3 pivots (one in every row), and $T$ is onto: I **true**. For $k = 3$ the rank is 2 and $\\dim\\ker T = 4-2 = 2$: II **true**.\nIII: $T:\\mathbb{R}^4\\to\\mathbb{R}^3$ always has a free variable, so it is never one-to-one: **true**.\nIV: $A(2,-1,1,0) = (2-2,\\ -1+1,\\ 2-3+1+0\\cdot k) = \\mathbf{0}$ for **every** $k$ (the $k$ entry is multiplied by $x_4 = 0$): **false**.",
  },
];
