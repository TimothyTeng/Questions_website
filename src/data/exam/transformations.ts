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
      "Write $\\mathbf{e}_1 = a(1,3)+b(2,-1)$: $a+2b = 1$, $3a-b = 0$, so $a = \\tfrac17$, $b = \\tfrac37$. Then $T(\\mathbf{e}_1) = \\tfrac17(4,1)+\\tfrac37(1,-5) = (1,-2)$.\nWrite $\\mathbf{e}_2 = c(1,3)+d(2,-1)$: $c+2d = 0$, $3c-d = 1$, so $c = \\tfrac27$, $d = -\\tfrac17$. Then $T(\\mathbf{e}_2) = \\tfrac27(4,1)-\\tfrac17(1,-5) = (1,1)$.\n$A = [T(\\mathbf{e}_1)\\ T(\\mathbf{e}_2)] = \\begin{bmatrix}1&1\\\\-2&1\\end{bmatrix}$. Check: $A(1,3) = (4,1)$ ✓ and $A(2,-1) = (1,-5)$ ✓.\nTraps: option A stacks the given images, which treats the inputs as $\\mathbf{e}_1,\\mathbf{e}_2$. Option B is $A^T$. Option D is $7A$ (forgetting the factor $\\tfrac17$).",
    ref: "PYP AY25/26 S2 Q3; AY23/24 S2 Q1(c)",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first rotates points through $3\\pi/4$ radians (counter-clockwise) about the origin and then reflects points through the horizontal $x$-axis. The standard matrix of $T$ is",
    options: [
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}-1&1\\\\1&1\\end{bmatrix}$",
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}-1&-1\\\\-1&1\\end{bmatrix}$",
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}-1&-1\\\\1&-1\\end{bmatrix}$",
      "$\\dfrac{1}{\\sqrt2}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Rotation: $R = \\begin{bmatrix}\\cos\\frac{3\\pi}4&-\\sin\\frac{3\\pi}4\\\\\\sin\\frac{3\\pi}4&\\cos\\frac{3\\pi}4\\end{bmatrix} = \\dfrac1{\\sqrt2}\\begin{bmatrix}-1&-1\\\\1&-1\\end{bmatrix}$. Reflection through the $x$-axis: $M = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$.\nThe rotation acts first, so the matrix is $MR$. Left-multiplying by $M$ negates the second **row** of $R$: $MR = \\dfrac1{\\sqrt2}\\begin{bmatrix}-1&-1\\\\-1&1\\end{bmatrix}$.\nTraps: $RM$ (wrong order) negates the second column instead, giving option A. Option C is $R$ alone, and option D is $-MR$.",
    ref: "Tutorial 1 Q10(a); Tutorial 1 Q13",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first reflects points through the line $y = x$ and then reflects points through the horizontal $x$-axis. Then $T$ is",
    options: [
      "a rotation through $\\pi/2$ counter-clockwise",
      "the reflection through the line $y = x$",
      "$N(\\mathbf{v}) = -\\mathbf{v}$",
      "a rotation through $\\pi/2$ clockwise",
      NOTA,
    ],
    answer: 3,
    solution:
      "Matrix $= \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ (first map on the right).\nComparing with the rotation matrix: $\\cos\\theta = 0$ and $\\sin\\theta = -1$, so $\\theta = -\\pi/2$, a rotation through $\\pi/2$ **clockwise**. Check: $\\mathbf{e}_1\\mapsto(0,1)\\mapsto(0,-1)$ ✓.\nMultiplying in the wrong order gives $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, the counter-clockwise rotation (option A, the answer to Tutorial 1 Q10(b)).",
    ref: "PYP AY20/21 S2 Q1(d); Tutorial 1 Q10(b)",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "Let $L$ be the rotation of $\\mathbb{R}^2$ through $90^\\circ$ counter-clockwise, $M$ the reflection across the line $x_1 = x_2$, $N(\\mathbf{v}) = -\\mathbf{v}$, and $P$ the projection onto the $x$-axis. Which of the following statements are correct?\nI. $L\\circ M = M\\circ L$\nII. $N\\circ M = M\\circ N$\nIII. $L\\circ N = N\\circ L$\nIV. $M\\circ P = P\\circ M$",
    options: ["I and II only", "II and III only", "III and IV only", "II, III and IV only", NOTA],
    answer: 1,
    solution:
      "Matrices: $L = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, $M = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$, $N = -I$, $P = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$.\nI: $LM = \\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$ but $ML = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$. **False**.\nII and III: $(-I)X = -X = X(-I)$ for any $X$. **True**.\nIV: $MP = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$ but $PM = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$. **False**.\nSo II and III only.",
    ref: "PYP AY22/23 S1 Q1(c); AY23/24 S2 Q2(c)(v)",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^4\\to\\mathbb{R}^4$ be defined by $T(x_1,x_2,x_3,x_4) = (x_1+x_3,\\ 0,\\ x_2-x_4,\\ x_2-x_4)$. Which of the following is a basis for the kernel of $T$?",
    options: [
      "$\\{(1,0,1,0),\\ (0,1,0,-1)\\}$",
      "$\\{(0,1,0,0),\\ (0,0,0,1)\\}$",
      "$\\{(1,0,-1,0)\\}$",
      "$\\{(-1,0,1,0),\\ (0,1,0,1)\\}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$T(\\mathbf{x}) = \\mathbf{0}$ needs $x_1 = -x_3$ and $x_2 = x_4$, with $x_3, x_4$ free. So $\\mathbf{x} = x_3(-1,0,1,0)+x_4(0,1,0,1)$, and the kernel has dimension 2 (rank 2, $2+2 = 4$ ✓).\nOption A has the signs wrong: $T(1,0,1,0) = (2,0,0,0)\\ne\\mathbf{0}$. Option B: $T(0,1,0,0) = (0,0,1,1)\\ne\\mathbf{0}$. Option C lies in the kernel, but one vector cannot span a 2-dimensional kernel.",
    ref: "Tutorial 4 Q17; Slides 4.6 (vsp p27–28); 4.9 bases for N(A)",
  },
  {
    subtopic: "Rank & nullity",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^6\\to\\mathbb{R}^4$ is a linear transformation whose standard matrix $A$ has rank 3. Which of the following is true?",
    options: [
      "The dimension of the kernel of $T$ is 1",
      "$A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^4$",
      "The range of $T$ is a 3-dimensional subspace of $\\mathbb{R}^4$",
      "The kernel of $T$ is $\\{\\mathbf{0}\\}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "The range of $T$ is $C(A)\\subseteq\\mathbb{R}^4$, of dimension rank of $A = 3$. So C is true.\nA: the Rank Theorem uses the number of columns, so $\\dim N(A) = 6-3 = 3$, not $4-3 = 1$.\nB: $\\dim C(A) = 3 < 4$, so $C(A)\\ne\\mathbb{R}^4$ and some $\\mathbf{b}$ give an inconsistent system.\nD: $\\dim N(A) = 3$, so the kernel is not $\\{\\mathbf{0}\\}$.",
    ref: "PYP AY25/26 S1 Q4; Theorem 4.8 (vsp p64)",
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
    ref: "PYP AY25/26 S1 Q6; AY24/25 S2 Q4",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:P_2\\to P_4$ be defined by $T(p) = (x^2-3)\\,p(x)$. Which of the following statements are correct?\nI. The matrix of $T$ relative to the standard bases is $5\\times3$ and its first column is $(-3,0,1,0,0)^T$.\nII. The kernel of $T$ is $\\{0\\}$.\nIII. The range of $T$ is all of $P_4$.\nIV. The range of $T$ has dimension 3.",
    options: ["I and II only", "II and IV only", "I, II and IV only", "All of the above", NOTA],
    answer: 2,
    solution:
      "I: $T(1) = -3+x^2$, with coordinates $(-3,0,1,0,0)$, and the matrix is $(\\dim P_4)\\times(\\dim P_2) = 5\\times3$. **True**.\nII: the columns $(-3,0,1,0,0)$, $(0,-3,0,1,0)$, $(0,0,-3,0,1)$ are independent (look at the last three rows), so the null space of the matrix is $\\{\\mathbf{0}\\}$: only $p = 0$ maps to $0$. **True**.\nIV: the matrix has rank 3, so the range has dimension 3. **True**.\nIII: $3 < 5 = \\dim P_4$, so the range is not all of $P_4$ (e.g. the constant $1$ is not $(x^2-3)$ times a polynomial). **False**.",
    ref: "PYP AY24/25 S2 Q4; Slides 4.11 Dimension (vsp p50)",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:M_{2\\times2}\\to M_{2\\times2}$ be defined by $T\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right) = \\begin{bmatrix}a-d&b+c\\\\b+c&d-a\\end{bmatrix}$. Which of the following statements are correct?\nI. The kernel of $T$ has dimension 2.\nII. The range of $T$ is the set of all $2\\times2$ symmetric matrices.\nIII. $\\begin{bmatrix}1&2\\\\-2&1\\end{bmatrix}$ is in the kernel of $T$.\nIV. The range of $T$ is all of $M_{2\\times2}$.",
    options: ["I and III only", "I, II and III only", "II and IV only", "III only", NOTA],
    answer: 0,
    solution:
      "Kernel: $a = d$ and $c = -b$, so the kernel is $\\left\\{\\begin{bmatrix}a&b\\\\-b&a\\end{bmatrix}\\right\\}$, dimension 2. I is **true**, and III is **true** ($a = d = 1$, $c = -2 = -b$).\nRange: every output has the form $\\begin{bmatrix}p&q\\\\q&-p\\end{bmatrix}$, dimension 2. It does not contain e.g. $I$, so II is **false**, and with dimension $2 < 4$, IV is **false**.\nIn coordinates $(a,b,c,d)$ the matrix of $T$ is $\\begin{bmatrix}1&0&0&-1\\\\0&1&1&0\\\\0&1&1&0\\\\-1&0&0&1\\end{bmatrix}$, of rank 2, and $2+2 = 4$ ✓.",
    ref: "PYP AY20/21 S2 Q2(d)",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T$ be the linear transformation on $M_{2\\times2}$ given by $T\\left(\\begin{bmatrix}a_{11}&a_{12}\\\\a_{21}&a_{22}\\end{bmatrix}\\right) = \\begin{bmatrix}a_{11}+a_{22}&a_{12}+a_{21}\\\\a_{12}+a_{21}&a_{11}+a_{22}\\end{bmatrix}$. Which of the following statements are correct?\nI. With coordinates $(a_{11},a_{12},a_{21},a_{22})$, the matrix of $T$ in the standard basis is $\\begin{bmatrix}1&0&0&1\\\\0&1&1&0\\\\0&1&1&0\\\\1&0&0&1\\end{bmatrix}$.\nII. The kernel of $T$ has dimension 2.\nIII. The range of $T$ is the set of all $2\\times2$ symmetric matrices.\nIV. $\\begin{bmatrix}1&2\\\\-2&-1\\end{bmatrix}$ is in the kernel of $T$.",
    options: ["I and II only", "I, II and III only", "I, II and IV only", "All of the above", NOTA],
    answer: 2,
    solution:
      "I: the images of the four standard basis matrices have coordinates $(1,0,0,1)$, $(0,1,1,0)$, $(0,1,1,0)$, $(1,0,0,1)$; these are the columns. **True**.\nII: the matrix has rank 2 (rows 3 and 4 repeat rows 2 and 1), so $\\dim$ kernel $= 4-2 = 2$: the kernel is $\\left\\{\\begin{bmatrix}a&b\\\\-b&-a\\end{bmatrix}\\right\\}$. **True**.\nIV: $a_{11}+a_{22} = 1-1 = 0$ and $a_{12}+a_{21} = 2-2 = 0$. **True**.\nIII: every output has the form $\\begin{bmatrix}p&q\\\\q&p\\end{bmatrix}$ (dimension 2), so e.g. $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ is symmetric but not in the range. **False**.",
    ref: "PYP AY20/21 S2 Q2(d)",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $D:P_3\\to P_3$ be the differentiation map $D(p) = p'$. Which of the following statements are correct?\nI. The kernel of $D$ is $\\{0\\}$.\nII. The range of $D$ is $P_2$.\nIII. $D\\circ D\\circ D\\circ D$ is the zero transformation.\nIV. The matrix of $D$ relative to $\\{1,t,t^2,t^3\\}$ has rank 3.",
    options: ["II and III only", "III and IV only", "I, II and IV only", "II, III and IV only", "All of the above"],
    answer: 3,
    solution:
      "I: $D(1) = 0$, so every constant is in the kernel. **False**.\nII: derivatives of polynomials of degree $\\le3$ are exactly the polynomials of degree $\\le2$ (e.g. $D(\\tfrac13t^3) = t^2$). **True**.\nIII: four derivatives of a cubic give $0$. **True**.\nIV: the matrix $\\begin{bmatrix}0&1&0&0\\\\0&0&2&0\\\\0&0&0&3\\\\0&0&0&0\\end{bmatrix}$ has 3 pivots, consistent with $\\dim$ kernel $= 1$ and $1+3 = 4$. **True**.",
    ref: "PYP AY25/26 S1 Q6; Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "Invertible transformations",
    kind: "tfn",
    prompt:
      "Let $T:\\mathbb{R}^n\\to\\mathbb{R}^n$, $T(\\mathbf{x}) = A\\mathbf{x}$, be a linear transformation such that $T(T(\\mathbf{x})) = \\mathbf{x}$ for every $\\mathbf{x}$. Then $T$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$T(T(\\mathbf{x})) = A^2\\mathbf{x} = \\mathbf{x}$ for all $\\mathbf{x}$, so $A\\cdot A = I$. By the Invertible Matrix Theorem (there is an $n\\times n$ matrix $D = A$ with $AD = I$), $A$ is invertible, and $T^{-1} = T$. Reflections such as the one through $y = x$ are examples. **True**.",
    ref: "Slides 2.2 Theorem 2.4 (alg p10); Invertible Linear Transformations (alg p12)",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt:
      "$A$ is a $4\\times4$ matrix and $T(\\mathbf{x}) = A\\mathbf{x}$ does not map $\\mathbb{R}^4$ onto $\\mathbb{R}^4$. Then the kernel of $T$ is a line through the origin.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Not onto means $C(A)\\ne\\mathbb{R}^4$, so rank of $A\\le3$, and $\\dim N(A) = 4-\\text{rank}$ is at least 1 but could be 1, 2, 3 or 4 (e.g. $A = 0$ gives the kernel $\\mathbb{R}^4$). The kernel is a line only when the rank is exactly 3, which is not given. **Cannot be determined**.",
    ref: "PYP AY25/26 S2 Q10; Slides 4.5 table (vsp p26); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&2&h\\\\0&1&3\\\\2&3&1\\end{bmatrix}$ and $T(\\mathbf{x}) = A\\mathbf{x}$. For which value(s) of $h$ is the kernel of $T$ **not** $\\{\\mathbf{0}\\}$?",
    options: ["$h = -2$", "$h = 2$", "$h = \\tfrac12$", "For no value of $h$", NOTA],
    answer: 1,
    solution:
      "Row reduce: $R_3-2R_1$ gives $(0,-1,1-2h)$. Then adding $R_2 = (0,1,3)$ gives $(0,0,4-2h)$.\nIf $h\\ne2$ there are 3 pivots, so $N(A) = \\{\\mathbf{0}\\}$. If $h = 2$ the last row is zero, which leaves a free variable, so the kernel is a line.\nCheck with $h = 2$: $A(4,-3,1) = (4-6+2,\\ -3+3,\\ 8-9+1) = \\mathbf{0}$.",
    ref: "Slides 4.6 (vsp p28); 4.14 Rank (vsp p64)",
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
      "$\\mathbf{b}$ is in the range iff $A\\mathbf{x} = \\mathbf{b}$ is consistent. The first two rows give $x_1-2x_2 = 1$ and $3x_1-5x_2 = 4$. From the first, $x_1 = 1+2x_2$, so $3+6x_2-5x_2 = 4$, giving $x_2 = 1$ and $x_1 = 3$.\nThe third row must then agree: $k = -x_1+4x_2 = -3+4 = 1$.\nThe columns of $A$ are independent (not multiples of each other), so $N(A) = \\{\\mathbf{0}\\}$ and the solution $\\mathbf{x} = (3,1)$ is unique. The range $C(A)$ is only a plane in $\\mathbb{R}^3$, so not every $k$ works.",
    ref: "Slides 4.5 table (vsp p26); 4.6 (vsp p28)",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^2\\to\\mathbb{R}^3$ be linear with $T(\\mathbf{e}_1) = \\begin{bmatrix}1\\\\0\\\\-1\\end{bmatrix}$ and $T(\\mathbf{e}_2) = \\begin{bmatrix}a\\\\2\\\\b\\end{bmatrix}$, and let $S:\\mathbb{R}^3\\to\\mathbb{R}^2$ have standard matrix $B = \\begin{bmatrix}1&1&0\\\\2&0&1\\end{bmatrix}$. If the standard matrix of the composite transformation $S(T(\\mathbf{x}))$ is $\\begin{bmatrix}1&5\\\\1&4\\end{bmatrix}$, then $(a, b) =$",
    options: ["$(5,\\ -6)$", "$(3,\\ 2)$", "$(-2,\\ 3)$", "$(3,\\ -2)$", NOTA],
    answer: 3,
    solution:
      "The matrix of $S(T(\\mathbf{x}))$ is $BA$ with $A = \\begin{bmatrix}1&a\\\\0&2\\\\-1&b\\end{bmatrix}$:\n$BA = \\begin{bmatrix}1+0+0 & a+2+0\\\\2+0-1 & 2a+0+b\\end{bmatrix} = \\begin{bmatrix}1&a+2\\\\1&2a+b\\end{bmatrix}$.\nMatching: $a+2 = 5\\Rightarrow a = 3$, and $2a+b = 4\\Rightarrow b = -2$.\nTraps: forgetting the $+2$ from the middle entry gives $(5,-6)$, and writing $2a-b = 4$ gives $(3,2)$. ($AB$ is $3\\times3$ and cannot match a $2\\times2$ matrix.)",
    ref: "Tutorial 1 Q13",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "A linear transformation $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first reflects points through the horizontal $x$-axis, then rotates points $90^\\circ$ counter-clockwise, and finally reflects points through the line $y = x$. Find $T(2,1)$.",
    options: ["$(2,\\ 1)$", "$(-2,\\ -1)$", "$(1,\\ 2)$", "$(2,\\ -1)$", NOTA],
    answer: 0,
    solution:
      "Follow the point step by step.\nReflect through the $x$-axis: $(2,1)\\mapsto(2,-1)$.\nRotate $90^\\circ$ counter-clockwise ($(x_1,x_2)\\mapsto(-x_2,x_1)$): $(2,-1)\\mapsto(1,2)$.\nReflect through $y = x$ (swap): $(1,2)\\mapsto(2,1)$.\nAs one matrix: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix} = I$, so in fact $T(\\mathbf{x}) = \\mathbf{x}$ for every $\\mathbf{x}$.\nTraps: $(1,2)$ stops before the last reflection, $(2,-1)$ after the first step. $(-2,-1)$ multiplies the three matrices in the wrong order: $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} = -I$.",
    ref: "Tutorial 1 Q10, Q13",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "Let $T:P_4\\to P_2$ be defined by $T(p) = p''$. Which of the following statements are correct?\nI. The kernel of $T$ is $P_1$.\nII. The range of $T$ is all of $P_2$.\nIII. The range of $T$ has dimension 3.\nIV. The kernel of $T$ is $\\{0\\}$.",
    options: ["I and II only", "I, II and III only", "II and III only", "All of the above", NOTA],
    answer: 1,
    solution:
      "I: $p'' = 0$ exactly for $p = a+bx$, so the kernel is $P_1$, dimension 2. **True**.\nII and III: $\\dim P_4 = 5$, so by the Rank Theorem on the $3\\times5$ matrix of $T$, the range has dimension $5-2 = 3 = \\dim P_2$, so it is all of $P_2$. Concretely, $T(\\tfrac12x^2) = 1$, $T(\\tfrac16x^3) = x$, $T(\\tfrac1{12}x^4) = x^2$. **Both true**.\nIV: the kernel is $P_1\\ne\\{0\\}$. **False**.\nNote $\\dim P_4 = 5$, not 4: forgetting the constant term gives the wrong dimension.",
    ref: "PYP AY25/26 S1 Q6; AY23/24 S1 Q2(d)(i); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^3\\to\\mathbb{R}^3$, $T(\\mathbf{x}) = A\\mathbf{x}$, is linear and $T(\\mathbf{u}) = T(\\mathbf{v})$ for some vectors $\\mathbf{u}\\ne\\mathbf{v}$. Then $T(\\mathbf{x}) = \\mathbf{b}$ has a solution for every $\\mathbf{b}\\in\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "By linearity $T(\\mathbf{u}-\\mathbf{v}) = T(\\mathbf{u})-T(\\mathbf{v}) = \\mathbf{0}$, so $\\mathbf{u}-\\mathbf{v}\\ne\\mathbf{0}$ is in $N(A)$. For the square matrix $A$, the Invertible Matrix Theorem then says $C(A)\\ne\\mathbb{R}^3$: some $\\mathbf{b}$ are not in the range and give **no** solution. **False**.",
    ref: "Slides 4.6 (vsp p27–28); Theorem 4.9 (vsp p66)",
  },
  {
    subtopic: "Invertible transformations",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(1,1) = (2,2)$ and $T(1,-1) = (3,-3)$. Then $T$ is invertible.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\mathbf{e}_1 = \\tfrac12(1,1)+\\tfrac12(1,-1)$ gives $T(\\mathbf{e}_1) = (1,1)+(\\tfrac32,-\\tfrac32) = (\\tfrac52,-\\tfrac12)$; $\\mathbf{e}_2 = \\tfrac12(1,1)-\\tfrac12(1,-1)$ gives $T(\\mathbf{e}_2) = (1,1)-(\\tfrac32,-\\tfrac32) = (-\\tfrac12,\\tfrac52)$.\nSo $A = \\tfrac12\\begin{bmatrix}5&-1\\\\-1&5\\end{bmatrix}$ with $ad-bc = \\tfrac{25}4-\\tfrac14 = 6\\ne0$. $A$ is invertible, so $T$ is invertible with $T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y}$. **True**.",
    ref: "PYP AY25/26 S2 Q3 (method); Slides 0B inverse (mtx p13); 2.2 (alg p12)",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt:
      "A parallelepiped has one vertex at the origin and adjacent vertices at $(1,1,1)$, $(2,1,1)$ and $(7,2,3)$. A linear transformation $T$ is defined by $A = \\begin{bmatrix}2&1&1\\\\3&0&1\\\\0&2&2\\end{bmatrix}$. The volumes of the parallelepiped before and after $T$ is applied are",
    options: ["$1$ and $-4$", "$1$ and $\\tfrac14$", "$1$ and $4$", "$4$ and $4$", NOTA],
    answer: 2,
    solution:
      "Before: with $B = \\begin{bmatrix}1&2&7\\\\1&1&2\\\\1&1&3\\end{bmatrix}$ (vertices as columns), $|B| = 1(3-2)-2(3-2)+7(1-1) = -1$, so the volume is $abs(-1) = 1$.\nAfter: $|A| = 2(0-2)-1(6-0)+1(6-0) = -4$. By Theorem 3.2 the volume of $T(S)$ is $abs(|A|)\\times1 = 4$.\nTraps: a volume is never negative ($-4$), and the factor is $abs(|A|)$, not $1/abs(|A|)$.",
    ref: "PYP AY20/21 S2 Q2(c); Slides 3.3 Theorem 3.2 (det p17); Tutorial 3 Q4",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt: "Which of the following statements about kernels and ranges of linear transformations is **false**?",
    options: [
      "The kernel of a linear transformation $T:V\\to W$ is a subspace of $V$.",
      "The range of $T(\\mathbf{x}) = A\\mathbf{x}$ is the column space $C(A)$.",
      "If $T:\\mathbb{R}^5\\to\\mathbb{R}^3$ has a standard matrix of rank 2, the kernel of $T$ has dimension 3.",
      "If $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is such that $T(\\mathbf{x}) = \\mathbf{0}$ for every $\\mathbf{x}$, then its standard matrix is the zero matrix.",
      "The kernel of the linear transformation in $\\mathbb{R}^2$ that projects points onto the $x$-axis is the $x$-axis.",
    ],
    answer: 4,
    solution:
      "E is false: the projection is $(x_1,x_2)\\mapsto(x_1,0)$, which is $\\mathbf{0}$ iff $x_1 = 0$, so its kernel is the $y$-axis.\nA and B are on the slides (\"kernel is a subspace of $V$\"; if $T(\\mathbf{x}) = A\\mathbf{x}$, range $= C(A)$). C: Rank Theorem, $5-2 = 3$. D: the columns $T(\\mathbf{e}_i)$ are all $\\mathbf{0}$.",
    ref: "Slides 4.6 (vsp p28); PYP AY23/24 S2 Q2(c)(v); AY25/26 S1 Q4; AY21/22 S1 Q2(d)(ii)",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ be linear with $T(1,1,0) = (1,2)$, $T(0,1,1) = (0,1)$ and $T(1,0,1) = (3,-1)$. Then $T(3,1,0) =$",
    options: ["$(3,\\ 7)$", "$(5,\\ 4)$", "$(-1,\\ 4)$", "$(5,\\ 0)$", NOTA],
    answer: 4,
    solution:
      "Write $(3,1,0) = a(1,1,0)+b(0,1,1)+c(1,0,1)$: $a+c = 3$, $a+b = 1$, $b+c = 0$. Adding all three, $2(a+b+c) = 4$, so $a+b+c = 2$. Then $c = 2-1 = 1$, $a = 2-0 = 2$ and $b = 2-3 = -1$.\nCheck: $2(1,1,0)-(0,1,1)+(1,0,1) = (3,1,0)$ ✓.\n$T(3,1,0) = 2(1,2)-(0,1)+(3,-1) = (5,2)$. This is not listed, so the answer is **None of the above**.\nTraps: $(3,7)$ uses the entries $3, 1, 0$ as the weights. $(5,4)$ takes $b = +1$, and $(-1,4)$ takes $c = -1$.",
    ref: "PYP AY21/22 S1 Q1(d); AY23/24 S2 Q1(c)",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first rotates points through $\\pi/6$ radians **clockwise** about the origin and then reflects points through the horizontal $x$-axis. Find $T(1,\\ \\sqrt3)$.",
    options: ["$(\\sqrt3,\\ -1)$", "$(0,\\ -2)$", "$(\\sqrt3,\\ 1)$", "$(1,\\ -\\sqrt3)$", NOTA],
    answer: 0,
    solution:
      "Clockwise by $\\pi/6$ means $\\theta = -\\pi/6$: $\\begin{bmatrix}\\cos\\frac\\pi6&\\sin\\frac\\pi6\\\\-\\sin\\frac\\pi6&\\cos\\frac\\pi6\\end{bmatrix} = \\begin{bmatrix}\\frac{\\sqrt3}2&\\frac12\\\\-\\frac12&\\frac{\\sqrt3}2\\end{bmatrix}$.\nApplied to $(1,\\sqrt3)$: $(\\tfrac{\\sqrt3}2+\\tfrac{\\sqrt3}2,\\ -\\tfrac12+\\tfrac32) = (\\sqrt3,1)$.\nReflecting through the $x$-axis negates the second entry: $(\\sqrt3,-1)$.\nTraps: $(\\sqrt3,1)$ skips the reflection; $(1,-\\sqrt3)$ only reflects; $(0,-2)$ rotates counter-clockwise (to $(0,2)$) before reflecting.",
    ref: "Tutorial 1 Q10(a)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix}1&2&0&1\\\\0&1&1&2\\\\1&3&1&k\\end{bmatrix}$ and $T(\\mathbf{x}) = A\\mathbf{x}$. Which of the following statements are correct?\nI. For $k\\ne3$, $T$ maps $\\mathbb{R}^4$ onto $\\mathbb{R}^3$.\nII. For $k = 3$, the kernel of $T$ has dimension 2.\nIII. There is no value of $k$ for which the kernel of $T$ is $\\{\\mathbf{0}\\}$.\nIV. $(2,-1,1,0)$ is in the kernel of $T$ only when $k = 3$.",
    options: ["I and II only", "I and III only", "I, II and III only", "All of the above", NOTA],
    answer: 2,
    solution:
      "$R_3-R_1-R_2 = (0,0,0,k-3)$. So for $k\\ne3$ there are 3 pivots, rank 3, and $C(A) = \\mathbb{R}^3$: $T$ is onto. I **true**. For $k = 3$ the rank is 2 and $\\dim N(A) = 4-2 = 2$: II **true**.\nIII: rank $\\le3 < 4$ columns, so $\\dim N(A)\\ge1$ for every $k$: **true**.\nIV: $A(2,-1,1,0) = (2-2,\\ -1+1,\\ 2-3+1+0\\cdot k) = \\mathbf{0}$ for **every** $k$ (the $k$ entry is multiplied by $x_4 = 0$): **false**.",
    ref: "Slides 4.5 table (vsp p26); Theorem 4.8 (vsp p64); PYP AY25/26 S1 Q4",
  },
];
