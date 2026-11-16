import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const transformationsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (18)
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt: "If $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is a linear transformation, then $T(\\mathbf{0}) = \\mathbf{0}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Use the scaling rule with $c = 0$: $T(\\mathbf{0}) = T(0\\cdot\\mathbf{0}) = 0\\cdot T(\\mathbf{0}) = \\mathbf{0}$. (Or $T(\\mathbf{0}) = T(\\mathbf{0}+\\mathbf{0}) = 2T(\\mathbf{0})$, which forces $T(\\mathbf{0}) = \\mathbf{0}$.) **True**. This is why \"$T(\\mathbf{0})\\ne\\mathbf{0}$\" is the fastest way to reject linearity.",
  },
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt: "If $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ satisfies $T(\\mathbf{0}) = \\mathbf{0}$, then $T$ is linear.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$T(\\mathbf{0}) = \\mathbf{0}$ is necessary but not sufficient. Counterexample: $T(x_1,x_2) = (x_1x_2,\\ 0)$ has $T(\\mathbf{0}) = \\mathbf{0}$, but $T(2,2) = (4,0)\\ne 2T(1,1) = (2,0)$. **False**.",
  },
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt: "Let $\\mathbf{b}\\in\\mathbb{R}^n$ be a fixed nonzero vector. Then $T(\\mathbf{x}) = \\mathbf{x}+\\mathbf{b}$ is a linear transformation of $\\mathbb{R}^n$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$T(\\mathbf{0}) = \\mathbf{b}\\ne\\mathbf{0}$, so $T$ cannot be linear. Also $T(\\mathbf{u}+\\mathbf{v}) = \\mathbf{u}+\\mathbf{v}+\\mathbf{b}$, while $T(\\mathbf{u})+T(\\mathbf{v}) = \\mathbf{u}+\\mathbf{v}+2\\mathbf{b}$. A translation is not linear. **False**.",
  },
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt: "If $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is linear, then $T^2 = T\\circ T$ is also linear.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$T^2(c\\mathbf{u}+d\\mathbf{v}) = T\\big(T(c\\mathbf{u}+d\\mathbf{v})\\big) = T\\big(cT(\\mathbf{u})+dT(\\mathbf{v})\\big) = cT^2(\\mathbf{u})+dT^2(\\mathbf{v})$, using linearity of $T$ twice. Equivalently, its standard matrix is $A^2$. **True**.",
  },
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ satisfies $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v})$ for all $\\mathbf{u},\\mathbf{v}$. If $T(2,1) = (4,2)$ and $T(1,0) = (1,1)$, then $T(0,1) = (2,0)$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Additivity alone is enough here: $(2,1) = (1,0)+(1,0)+(0,1)$, so $T(2,1) = 2T(1,0)+T(0,1)$. Then $T(0,1) = (4,2)-2(1,1) = (2,0)$. **True**.",
  },
  {
    subtopic: "Standard matrix",
    kind: "tfn",
    prompt: "If a linear transformation $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ satisfies $T(\\mathbf{x}) = \\mathbf{0}$ for every $\\mathbf{x}$, then its standard matrix is the zero matrix.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The columns of the standard matrix are $T(\\mathbf{e}_1),\\dots,T(\\mathbf{e}_n)$, and each is $\\mathbf{0}$. So $A = 0$ (the $m\\times n$ zero matrix). **True**.",
  },
  {
    subtopic: "Standard matrix",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^3\\to\\mathbb{R}^2$ is linear with $T(\\mathbf{e}_1) = (1,2)$ and $T(\\mathbf{e}_2) = (0,1)$. Then $T(1,1,1) = (1,3)$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$T(1,1,1) = T(\\mathbf{e}_1)+T(\\mathbf{e}_2)+T(\\mathbf{e}_3) = (1,3)+T(\\mathbf{e}_3)$. The value $T(\\mathbf{e}_3)$, the third column of the standard matrix, is not given. The statement holds only if $T(\\mathbf{e}_3) = \\mathbf{0}$. **Not enough information**.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "tfn",
    prompt: "The kernel of the projection of $\\mathbb{R}^2$ onto the $x_1$-axis is the $x_1$-axis.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The projection is $T(x_1,x_2) = (x_1,0)$. $T(\\mathbf{x}) = \\mathbf{0}$ iff $x_1 = 0$, so the kernel is the **$x_2$-axis**. The $x_1$-axis is the **range**. **False**.",
  },
  {
    subtopic: "Composition",
    kind: "tfn",
    prompt: "Any two rotations of $\\mathbb{R}^2$ about the origin commute.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$R_\\alpha R_\\beta = R_{\\alpha+\\beta} = R_{\\beta+\\alpha} = R_\\beta R_\\alpha$: turning by $\\alpha$ then $\\beta$ is the same total turn as $\\beta$ then $\\alpha$. You can confirm by multiplying the matrices and using the angle-addition formulas. **True**.",
  },
  {
    subtopic: "Composition",
    kind: "tfn",
    prompt: "Every rotation of $\\mathbb{R}^2$ about the origin commutes with every reflection across a line through the origin.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Counterexample: $R = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$ (rotation by $90^\\circ$) and $M = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ (reflection across the $x_1$-axis). $RM = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ but $MR = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$. (Only rotations by $0$ or $\\pi$ commute with every reflection.) **False**.",
  },
  {
    subtopic: "Composition",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^n\\to\\mathbb{R}^m$ has standard matrix $A$ and $S:\\mathbb{R}^m\\to\\mathbb{R}^p$ has standard matrix $B$. Then the standard matrix of $S\\circ T$ is $AB$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(S\\circ T)(\\mathbf{x}) = S(T(\\mathbf{x})) = B(A\\mathbf{x}) = (BA)\\mathbf{x}$, so the matrix is $BA$ ($p\\times n$). $AB$ is generally not even defined ($A$ is $m\\times n$ and $B$ is $p\\times m$). **False**.",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt: "For any $m\\times n$ matrix $A$, the range of $T(\\mathbf{x}) = A\\mathbf{x}$ is the column space $C(A)$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A\\mathbf{x} = x_1\\mathbf{a}_1+\\dots+x_n\\mathbf{a}_n$, so the set of all images is the set of all combinations of the columns, which is $C(A)$. **True**.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt: "A linear transformation $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ can be one-to-one.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The standard matrix is $2\\times3$, so it has at most 2 pivots for 3 columns. There is a free variable, so $\\ker T\\ne\\{\\mathbf{0}\\}$. By rank–nullity, $\\dim\\ker T = 3-\\operatorname{rank}\\ge1$. Never one-to-one. **False**.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt: "If $T:\\mathbb{R}^4\\to\\mathbb{R}^4$ is linear and onto, then $T$ is one-to-one.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Onto means $\\operatorname{rank} = 4$ (a pivot in every row). For a square matrix that is also a pivot in every column, so $\\ker T = \\{\\mathbf{0}\\}$. By rank–nullity, $\\dim\\ker T = 4-4 = 0$. **True**.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt: "$T:\\mathbb{R}^3\\to\\mathbb{R}^5$ is a linear transformation. Then $T$ is one-to-one.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "A $5\\times3$ standard matrix **can** have 3 pivots (e.g. the first three columns of $I_5$), making $T$ one-to-one. It can also have fewer (e.g. the zero map). Nothing else is given. **Not enough information**. (Only \"onto\" is ruled out by the sizes.)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^3$ is $T(\\mathbf{x}) = A\\mathbf{x}$, where the columns of $A$ are linearly independent. Then $T$ maps $\\mathbb{R}^2$ onto $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Independent columns give a pivot in every **column**, so $T$ is one-to-one. Onto needs a pivot in every **row**, i.e. 3 pivots, but a $3\\times2$ matrix has at most 2. The range is a plane in $\\mathbb{R}^3$. **False**.",
  },
  {
    subtopic: "General vector spaces",
    kind: "tfn",
    prompt: "The linear transformation $L: M_{2\\times2}\\to M_{2\\times2}$, $L(A) = A+A^T$, is one-to-one.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Any skew-symmetric matrix ($A^T = -A$) is sent to $0$. For example $L\\left(\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}\\right) = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}+\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = 0$. So $\\ker L\\ne\\{0\\}$ (in fact $\\dim\\ker L = 1$). **False**.",
  },
  {
    subtopic: "Invertible transformations",
    kind: "tfn",
    prompt: "If $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is linear and invertible, then $T^{-1}$ is linear.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Let $\\mathbf{u} = T^{-1}(\\mathbf{x})$ and $\\mathbf{v} = T^{-1}(\\mathbf{y})$. Then $T(c\\mathbf{u}+d\\mathbf{v}) = cT(\\mathbf{u})+dT(\\mathbf{v}) = c\\mathbf{x}+d\\mathbf{y}$, so $T^{-1}(c\\mathbf{x}+d\\mathbf{y}) = c\\mathbf{u}+d\\mathbf{v} = cT^{-1}(\\mathbf{x})+dT^{-1}(\\mathbf{y})$. Equivalently, $T^{-1}(\\mathbf{x}) = A^{-1}\\mathbf{x}$ is a matrix transformation. **True**.",
  },

  // ---------------------------------------------------------------- MCQ
  {
    subtopic: "Linearity",
    kind: "mcq",
    prompt: "Which of the following maps $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear?",
    options: [
      "$T(x_1,x_2) = (x_1+1,\\ x_2)$",
      "$T(x_1,x_2) = (x_1x_2,\\ x_1)$",
      "$T(x_1,x_2) = (|x_1|,\\ x_2)$",
      "$T(x_1,x_2) = (2x_1-x_2,\\ 3x_2)$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$(2x_1-x_2,\\ 3x_2) = \\begin{bmatrix}2&-1\\\\0&3\\end{bmatrix}\\mathbf{x}$ is a matrix transformation, hence linear. The others fail: $(x_1+1, x_2)$ sends $\\mathbf{0}$ to $(1,0)$; $x_1x_2$ fails scaling ($T(2,2) = (4,2)\\ne2T(1,1) = (2,2)$); $|x_1|$ fails scaling with $c = -1$ ($T(-1,0) = (1,0)\\ne -T(1,0) = (-1,0)$).",
  },
  {
    subtopic: "Linearity",
    kind: "mcq",
    prompt: "Which of the following maps is **not** linear?",
    options: [
      "$T(x_1,x_2) = (x_2,\\ x_1)$",
      "$T(x_1,x_2) = (0,\\ 0)$",
      "$T(x_1,x_2) = (x_1,\\ x_2+3)$",
      "$T(x_1,x_2) = (x_1+x_2,\\ x_1-x_2,\\ 0)$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$T(x_1,x_2) = (x_1,\\ x_2+3)$ gives $T(\\mathbf{0}) = (0,3)\\ne\\mathbf{0}$, so it is not linear. The swap $(x_2,x_1)$ (reflection across $y = x$), the zero map, and $(x_1+x_2,\\ x_1-x_2,\\ 0)$ are all of the form $A\\mathbf{x}$, so they are linear.",
  },
  {
    subtopic: "Linearity",
    kind: "mcq",
    prompt: "$T$ is linear with $T(\\mathbf{u}) = (1,2)$ and $T(\\mathbf{v}) = (3,-1)$. What is $T(2\\mathbf{u}-3\\mathbf{v})$?",
    options: ["$(7,-7)$", "$(-7,7)$", "$(11,1)$", "$(-7,1)$", NOTA],
    answer: 1,
    solution:
      "By linearity $T(2\\mathbf{u}-3\\mathbf{v}) = 2T(\\mathbf{u})-3T(\\mathbf{v}) = (2,4)-(9,-3) = (-7,7)$. $(11,1)$ is $2T(\\mathbf{u})+3T(\\mathbf{v})$ (sign slip on the whole term), and $(-7,1)$ forgets that $-3\\cdot(-1) = +3$.",
  },
  {
    subtopic: "Matrix transformations",
    kind: "mcq",
    prompt:
      "Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}1&-1\\\\2&-2\\\\0&1\\end{bmatrix}$. Which vector is in the range of $T$?",
    options: ["$(1,1,0)$", "$(0,1,1)$", "$(2,4,-3)$", "$(3,5,2)$", NOTA],
    answer: 2,
    solution:
      "$A\\mathbf{x} = (x_1-x_2,\\ 2(x_1-x_2),\\ x_2)$, so every image has the form $(s, 2s, t)$: the second entry is twice the first. Only $(2,4,-3)$ fits, and it comes from $x_2 = -3$, $x_1 = -1$. Check: $A(-1,-3) = (2,4,-3)$ ✓. For the others the second entry is not twice the first, so $A\\mathbf{x} = \\mathbf{b}$ is inconsistent.",
  },
  {
    subtopic: "Matrix transformations",
    kind: "mcq",
    prompt:
      "Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}1&2\\\\3&-1\\\\-2&1\\end{bmatrix}$. Find $\\mathbf{x}$ such that $T(\\mathbf{x}) = (4,5,-3)$.",
    options: ["$(1,2)$", "$(4,5)$", "$(2,-1)$", "$(2,1)$", NOTA],
    answer: 3,
    solution:
      "Solve $x_1+2x_2 = 4$ and $3x_1-x_2 = 5$. From the second, $x_2 = 3x_1-5$, so $x_1+6x_1-10 = 4$, giving $x_1 = 2$ and $x_2 = 1$. Check the third row: $-2(2)+1 = -3$ ✓. The columns of $A$ are independent, so this $\\mathbf{x}$ is unique.",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(\\mathbf{e}_1) = (3,-1)$ and $T(\\mathbf{e}_2) = (2,4)$. Find $T(4,-2)$.",
    options: ["$(8,-12)$", "$(14,0)$", "$(2,18)$", "$(16,4)$", NOTA],
    answer: 0,
    solution:
      "$T(4,-2) = 4T(\\mathbf{e}_1)-2T(\\mathbf{e}_2) = (12,-4)-(4,8) = (8,-12)$. Equivalently, $A = \\begin{bmatrix}3&2\\\\-1&4\\end{bmatrix}$ with the images as **columns**. $(14,0)$ comes from using the images as rows ($A^T$), and $(2,18)$ from swapping which weight goes with which image.",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt: "What is the standard matrix of $T(x_1,x_2,x_3) = (x_1-2x_3,\\ 3x_2+x_3)$?",
    options: [
      "$\\begin{bmatrix}1&0&-2\\\\0&3&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0\\\\0&3\\\\-2&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&-2&0\\\\3&1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0&-2\\\\3&0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$T:\\mathbb{R}^3\\to\\mathbb{R}^2$, so $A$ is $2\\times3$. Row $i$ holds the coefficients of $x_1, x_2, x_3$ in output entry $i$: $(1, 0, -2)$ and $(0, 3, 1)$. Check the columns: $T(\\mathbf{e}_1) = (1,0)$, $T(\\mathbf{e}_2) = (0,3)$, $T(\\mathbf{e}_3) = (-2,1)$ ✓. The $3\\times2$ option is the transpose. The third option drops the zero placeholders, putting coefficients under the wrong variables.",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(1,1) = (3,1)$ and $T(1,-1) = (1,-3)$. What is the standard matrix of $T$?",
    options: [
      "$\\begin{bmatrix}3&1\\\\1&-3\\end{bmatrix}$",
      "$\\begin{bmatrix}2&-1\\\\1&2\\end{bmatrix}$",
      "$\\begin{bmatrix}1&2\\\\2&-1\\end{bmatrix}$",
      "$\\begin{bmatrix}2&1\\\\-1&2\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$\\mathbf{e}_1 = \\tfrac12(1,1)+\\tfrac12(1,-1)$ gives $T(\\mathbf{e}_1) = \\tfrac12(3,1)+\\tfrac12(1,-3) = (2,-1)$. $\\mathbf{e}_2 = \\tfrac12(1,1)-\\tfrac12(1,-1)$ gives $T(\\mathbf{e}_2) = \\tfrac12(3,1)-\\tfrac12(1,-3) = (1,2)$. So $A = \\begin{bmatrix}2&1\\\\-1&2\\end{bmatrix}$. Check: $A(1,1) = (3,1)$ ✓ and $A(1,-1) = (1,-3)$ ✓. The first option just stacks the given images, which is only right if the inputs were $\\mathbf{e}_1, \\mathbf{e}_2$. The second is the transpose.",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^2\\to\\mathbb{R}^3$ is linear with $T(1,1) = (1,0,2)$ and $T(0,1) = (2,1,-1)$. Find $T(3,5)$.",
    options: ["$(13,5,1)$", "$(-1,-2,8)$", "$(11,4,2)$", "$(4,2,-2)$", NOTA],
    answer: 4,
    solution:
      "Write $(3,5) = 3(1,1)+2(0,1)$. Then $T(3,5) = 3(1,0,2)+2(2,1,-1) = (3,0,6)+(4,2,-2) = (7,2,4)$. This is not listed, so the answer is **None of the above**. $(13,5,1) = 3T(1,1)+5T(0,1)$ wrongly uses the entries of $(3,5)$ as weights, which only works for the standard basis.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "What is the standard matrix of the rotation of $\\mathbb{R}^2$ through $90^\\circ$ **clockwise**?",
    options: [
      "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}-1&0\\\\0&-1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Clockwise by $90^\\circ$ sends $\\mathbf{e}_1 = (1,0)$ to $(0,-1)$ and $\\mathbf{e}_2 = (0,1)$ to $(1,0)$. These are the columns: $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$. (From $R_\\theta$ with $\\theta = -\\pi/2$: $\\cos\\theta = 0$, $\\sin\\theta = -1$.) The first option is the counter-clockwise rotation, the third is the reflection across $y = x$, and the fourth is rotation by $180^\\circ$.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "What is the standard matrix of the reflection of $\\mathbb{R}^2$ across the line $y = -x$?",
    options: [
      "$\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 4,
    solution:
      "Reflecting across $y = -x$ sends $(1,0)\\mapsto(0,-1)$ and $(0,1)\\mapsto(-1,0)$, so the matrix is $\\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$. This is not listed: **None of the above**. The options are the reflection across $y = x$, the reflection across the $x_2$-axis, and the two $90^\\circ$ rotations.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "$T$ rotates points of $\\mathbb{R}^2$ through $\\pi/3$ radians counter-clockwise about the origin. What is $T(2,0)$?",
    options: ["$(1,\\ \\sqrt3)$", "$(\\sqrt3,\\ 1)$", "$(1,\\ -\\sqrt3)$", "$(-1,\\ \\sqrt3)$", NOTA],
    answer: 0,
    solution:
      "$T(2,0) = 2(\\cos\\frac\\pi3,\\ \\sin\\frac\\pi3) = 2(\\tfrac12,\\ \\tfrac{\\sqrt3}2) = (1,\\sqrt3)$. $(\\sqrt3,1)$ swaps $\\cos$ and $\\sin$ (that is rotation by $\\pi/6$), $(1,-\\sqrt3)$ is the clockwise rotation, and $(-1,\\sqrt3)$ is rotation by $2\\pi/3$.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "Which description matches the transformation with standard matrix $\\begin{bmatrix}1&0\\\\-2&1\\end{bmatrix}$?",
    options: [
      "Horizontal shear $(x_1,x_2)\\mapsto(x_1-2x_2,\\ x_2)$",
      "Vertical shear $(x_1,x_2)\\mapsto(x_1,\\ x_2-2x_1)$",
      "Reflection across the line $x_2 = -2x_1$",
      "Projection onto the $x_2$-axis followed by a dilation",
      NOTA,
    ],
    answer: 1,
    solution:
      "$\\begin{bmatrix}1&0\\\\-2&1\\end{bmatrix}\\begin{bmatrix}x_1\\\\x_2\\end{bmatrix} = (x_1,\\ -2x_1+x_2)$. The first coordinate is unchanged and the second is shifted by a multiple of the first, which is a vertical shear. ($\\mathbf{e}_2$ stays fixed and $\\mathbf{e}_1$ tilts to $(1,-2)$.) The horizontal shear would have the $-2$ in the top-right entry.",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "Which of the following does **not** have standard matrix $-I = \\begin{bmatrix}-1&0\\\\0&-1\\end{bmatrix}$?",
    options: [
      "Rotation through $\\pi$ about the origin",
      "Reflection through the origin",
      "Reflection across the $x_1$-axis followed by reflection across the $x_2$-axis",
      "Reflection across $y = x$ followed by reflection across $y = -x$",
      "Projection onto the $x_1$-axis followed by projection onto the $x_2$-axis",
    ],
    answer: 4,
    solution:
      "The two projections give $\\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix} = 0$, the zero map, not $-I$. The others all give $-I$: rotation by $\\pi$ is $-I$; reflection through the origin is $-I$; $\\operatorname{diag}(-1,1)\\operatorname{diag}(1,-1) = -I$; and $\\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} = -I$ (two reflections in perpendicular mirrors give rotation by $2\\cdot\\frac\\pi2 = \\pi$).",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "$P$ is the projection of $\\mathbb{R}^2$ onto the $x_2$-axis. Which statement is true?",
    options: [
      "$P$ has standard matrix $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$",
      "$\\ker P$ is the $x_2$-axis",
      "The range of $P$ is the $x_1$-axis",
      "$\\ker P$ is the $x_1$-axis",
      NOTA,
    ],
    answer: 3,
    solution:
      "$P(x_1,x_2) = (0,x_2)$, with matrix $\\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$. $P(\\mathbf{x}) = \\mathbf{0}$ iff $x_2 = 0$, so $\\ker P$ is the $x_1$-axis. The range is the $x_2$-axis. The first three options all describe the projection onto the $x_1$-axis instead.",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first reflects points across the $x_2$-axis and then rotates them $90^\\circ$ counter-clockwise. $T$ is the same as which single transformation?",
    options: [
      "Rotation through $90^\\circ$ clockwise",
      "Reflection across the line $y = x$",
      "Reflection across the line $y = -x$",
      "Rotation through $180^\\circ$",
      NOTA,
    ],
    answer: 2,
    solution:
      "The first map goes on the right: $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}\\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix} = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$, the reflection across $y = -x$. Doing them in the wrong order gives $\\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$, the reflection across $y = x$, which is the trap.",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "$T_1, T_2, T_3$ are linear maps of $\\mathbb{R}^n$ with standard matrices $A, B, C$. Apply $T_1$ first, then $T_2$, then $T_3$. What is the standard matrix of the result?",
    options: ["$ABC$", "$CBA$", "$BAC$", "$ACB$", NOTA],
    answer: 1,
    solution:
      "$T_3(T_2(T_1(\\mathbf{x}))) = C(B(A\\mathbf{x})) = (CBA)\\mathbf{x}$. The matrix applied first sits next to $\\mathbf{x}$, on the right. Since matrix products do not commute in general, $ABC$ is a different map.",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt: "Which pair of transformations of $\\mathbb{R}^2$ commutes, i.e. gives the same result in either order?",
    options: [
      "Rotation by $90^\\circ$ and reflection across the $x_1$-axis",
      "Projection onto the $x_1$-axis and reflection across $y = x$",
      "The shear $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ and projection onto the $x_1$-axis",
      "Rotation by $30^\\circ$ and rotation by $45^\\circ$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Rotations commute: both orders give rotation by $75^\\circ$. The others do not. (a) $RM = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ but $MR = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$. (b) With $P = \\operatorname{diag}(1,0)$ and $F = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$: $PF = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ but $FP = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$. (c) $SP = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ but $PS = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$.",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt: "Let $T:\\mathbb{R}^3\\to\\mathbb{R}^4$, $T(x_1,x_2,x_3) = (x_3,\\ x_3,\\ 0,\\ x_1)$. What is $\\ker T$?",
    options: [
      "$\\{\\mathbf{0}\\}$",
      "$\\operatorname{Span}\\{(0,1,0)\\}$",
      "$\\operatorname{Span}\\{(0,0,1,0)\\}$",
      "$\\operatorname{Span}\\{(1,0,0),\\ (0,0,1)\\}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$T(\\mathbf{x}) = \\mathbf{0}$ needs $x_3 = 0$ and $x_1 = 0$, with $x_2$ free. So $\\ker T = \\{(0,x_2,0)\\} = \\operatorname{Span}\\{(0,1,0)\\}$. The kernel lives in the **domain** $\\mathbb{R}^3$, so a 4-entry vector cannot be in it. $\\operatorname{Span}\\{\\mathbf{e}_1,\\mathbf{e}_3\\}$ lists the variables that **matter**, which is the opposite of the kernel. Check: rank 2 + nullity 1 = 3 ✓.",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt: "Let $T(x_1,x_2,x_3) = (x_1-x_2,\\ x_2-x_3,\\ x_3-x_1)$. Which vector is **not** in the range of $T$?",
    options: ["$(1,-1,0)$", "$(2,0,-2)$", "$(0,3,-3)$", "$(1,1,1)$", NOTA],
    answer: 3,
    solution:
      "The three output entries always add to $0$, so the range lies in the plane $y_1+y_2+y_3 = 0$. The kernel is $\\operatorname{Span}\\{(1,1,1)\\}$ (nullity 1), so the rank is 2 and the range **is** that whole plane. $(1,-1,0)$, $(2,0,-2)$ and $(0,3,-3)$ have entry sum 0. $(1,1,1)$ has sum $3$, so it is not in the range.",
  },
  {
    subtopic: "Rank–nullity",
    kind: "mcq",
    prompt: "Find the rank and nullity of $T:\\mathbb{R}^3\\to\\mathbb{R}^3$, $T(a,b,c) = (a+2b-c,\\ 2a+4b-2c,\\ b+c)$.",
    options: [
      "rank $3$, nullity $0$",
      "rank $1$, nullity $2$",
      "rank $2$, nullity $1$",
      "rank $2$, nullity $0$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$A = \\begin{bmatrix}1&2&-1\\\\2&4&-2\\\\0&1&1\\end{bmatrix}$. Row 2 is $2\\times$ row 1, and row 3 is not a multiple of row 1, so the rank is 2. Nullity $= 3-2 = 1$. The kernel is $\\operatorname{Span}\\{(3,-1,1)\\}$; check: $A(3,-1,1) = (3-2-1,\\ 6-4-2,\\ -1+1) = \\mathbf{0}$ ✓. Rank and nullity must add to 3, which rules out \"rank 2, nullity 0\".",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt: "What is the kernel of the (orthogonal) projection of $\\mathbb{R}^2$ onto the line $y = x$?",
    options: ["The line $y = -x$", "The line $y = x$", "$\\{\\mathbf{0}\\}$", "The $x_1$-axis", NOTA],
    answer: 0,
    solution:
      "The projection keeps the component along $(1,1)$ and discards the perpendicular component. Its matrix is $\\tfrac12\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, and $P\\mathbf{x} = \\mathbf{0}$ iff $x_1+x_2 = 0$. So the kernel is the line $y = -x$, perpendicular to the line projected onto. The line $y = x$ is the **range**.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^3\\to\\mathbb{R}^3$ has a standard matrix with exactly 2 pivot positions. Then $T$ is",
    options: [
      "one-to-one but not onto",
      "onto but not one-to-one",
      "both one-to-one and onto",
      "neither one-to-one nor onto",
      NOTA,
    ],
    answer: 3,
    solution:
      "2 pivots for 3 columns leaves a free variable, so $\\ker T\\ne\\{\\mathbf{0}\\}$: not one-to-one. 2 pivots for 3 rows leaves a row without a pivot: not onto. For a square matrix the two properties always stand or fall together.",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt: "For which matrix $A$ is $T(\\mathbf{x}) = A\\mathbf{x}$ one-to-one?",
    options: [
      "$\\begin{bmatrix}1&2&3\\\\0&1&4\\end{bmatrix}$",
      "$\\begin{bmatrix}1&2\\\\2&4\\\\3&6\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0\\\\0&1\\\\2&3\\end{bmatrix}$",
      "$\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "One-to-one means independent columns (a pivot in every column). $\\begin{bmatrix}1&0\\\\0&1\\\\2&3\\end{bmatrix}$ has independent columns (look at the top $2\\times2$ block, which is $I$). The $2\\times3$ matrix has 3 columns in $\\mathbb{R}^2$, so they are dependent. In the second and fourth matrices, column 2 is a multiple of column 1.",
  },
  {
    subtopic: "Rank–nullity",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^4\\to\\mathbb{R}^3$ is linear and maps $\\mathbb{R}^4$ **onto** $\\mathbb{R}^3$. What is $\\dim\\ker T$?",
    options: ["$1$", "$0$", "$3$", "$4$", NOTA],
    answer: 0,
    solution:
      "Onto $\\mathbb{R}^3$ means $\\operatorname{rank}T = 3$. Rank–nullity on the domain $\\mathbb{R}^4$: $\\dim\\ker T = 4-3 = 1$. ($\\dim\\ker T = 0$ is impossible, since a map from $\\mathbb{R}^4$ to $\\mathbb{R}^3$ is never one-to-one.)",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is linear with standard matrix $A$. Which of the following statements are correct?\nI. If $T$ is one-to-one, then $T$ is onto.\nII. If $\\ker T = \\{\\mathbf{0}\\}$, then $A$ is invertible.\nIII. If the columns of $A$ span $\\mathbb{R}^n$, then $T$ is one-to-one.\nIV. If $T(\\mathbf{x}) = \\mathbf{b}$ is consistent for some $\\mathbf{b}$, then $T$ is onto.",
    options: ["I and II only", "II and III only", "I, II and III only", "All of the above", NOTA],
    answer: 2,
    solution:
      "For a square matrix, one-to-one, onto, $\\ker T = \\{\\mathbf{0}\\}$, columns spanning $\\mathbb{R}^n$ and $A$ invertible are all equivalent (Invertible Matrix Theorem). So I, II and III are correct. IV is false: $T(\\mathbf{x}) = \\mathbf{0}$ is consistent for **every** $T$ (take $\\mathbf{x} = \\mathbf{0}$), including the zero map, which is not onto. Onto needs consistency for **every** $\\mathbf{b}$.",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt: "$T(x_1,x_2) = (2x_1+5x_2,\\ x_1+3x_2)$. Find $T^{-1}(y_1,y_2)$.",
    options: [
      "$(3y_1-5y_2,\\ -y_1+2y_2)$",
      "$(3y_1-y_2,\\ -5y_1+2y_2)$",
      "$(-3y_1+5y_2,\\ y_1-2y_2)$",
      "$(2y_1-5y_2,\\ -y_1+3y_2)$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$A = \\begin{bmatrix}2&5\\\\1&3\\end{bmatrix}$ has $ad-bc = 6-5 = 1$, so $A^{-1} = \\begin{bmatrix}3&-5\\\\-1&2\\end{bmatrix}$. Then $T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y} = (3y_1-5y_2,\\ -y_1+2y_2)$. Check: $T(3,-1) = (6-5,\\ 3-3) = (1,0)$ ✓. The second option is $(A^{-1})^T$, the third has the wrong overall sign, and the fourth forgets to swap the diagonal entries.",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt: "Which of the following transformations of $\\mathbb{R}^2$ is **not** invertible?",
    options: [
      "Rotation through $2\\pi/5$",
      "Reflection across the line $y = x$",
      "The horizontal shear $x_1\\mapsto x_1+3x_2$",
      "Contraction by the factor $1/2$",
      "Projection onto the line $y = 2x$",
    ],
    answer: 4,
    solution:
      "A projection onto a line sends every vector perpendicular to that line to $\\mathbf{0}$, so its kernel is a whole line: not one-to-one, hence not invertible. The others have inverses: rotation by $-2\\pi/5$, the same reflection, the shear $x_1\\mapsto x_1-3x_2$, and dilation by $2$.",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt:
      "$T$ first rotates $\\mathbb{R}^2$ through $30^\\circ$ counter-clockwise and then applies the horizontal shear $x_1\\mapsto x_1+2x_2$. Which describes $T^{-1}$?",
    options: [
      "First rotate $30^\\circ$ clockwise, then apply the shear $x_1\\mapsto x_1-2x_2$",
      "First apply the shear $x_1\\mapsto x_1-2x_2$, then rotate $30^\\circ$ clockwise",
      "First apply the shear $x_1\\mapsto x_1+2x_2$, then rotate $30^\\circ$ clockwise",
      "First apply the shear $x_1\\mapsto x_1-2x_2$, then rotate $30^\\circ$ counter-clockwise",
      NOTA,
    ],
    answer: 1,
    solution:
      "$T = S\\circ R$ with matrix $SR$, so $T^{-1}$ has matrix $(SR)^{-1} = R^{-1}S^{-1}$: undo the **last** step first (\"socks and shoes\"). $S^{-1}$ is the shear $x_1\\mapsto x_1-2x_2$ and $R^{-1}$ is the rotation $30^\\circ$ clockwise. So apply $S^{-1}$ first, then $R^{-1}$.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "$D:P_3\\to P_3$, $D(p) = p'$. What is the matrix of $D$ relative to the basis $\\{1, t, t^2, t^3\\}$?",
    options: [
      "$\\begin{bmatrix}0&0&0&0\\\\1&0&0&0\\\\0&2&0&0\\\\0&0&3&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1&0&0\\\\0&0&1&0\\\\0&0&0&1\\\\0&0&0&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1&0&0\\\\0&0&2&0\\\\0&0&0&3\\\\0&0&0&0\\end{bmatrix}$",
      "$\\begin{bmatrix}0&0&0&0\\\\0&1&0&0\\\\0&0&2&0\\\\0&0&0&3\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Column $j$ holds the coordinates of $D(\\text{basis}_j)$: $D(1) = 0$, $D(t) = 1$, $D(t^2) = 2t$ and $D(t^3) = 3t^2$, giving columns $(0,0,0,0)$, $(1,0,0,0)$, $(0,2,0,0)$, $(0,0,3,0)$. So $1, 2, 3$ sit on the **super**diagonal. The first option puts the coordinates in rows (the transpose), and the second forgets the factors from the power rule.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "$T:P_1\\to P_3$, $T(p) = (x^2+3)\\,p(x)$. What is the matrix of $T$ relative to the bases $\\{1, x\\}$ and $\\{1, x, x^2, x^3\\}$?",
    options: [
      "$\\begin{bmatrix}3&0&1&0\\\\0&3&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0\\\\0&1\\\\3&0\\\\0&3\\end{bmatrix}$",
      "$\\begin{bmatrix}3&0\\\\1&0\\\\0&3\\\\0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}3&0\\\\0&3\\\\1&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 4,
    solution:
      "$T(1) = 3+x^2$, with coordinates $(3,0,1,0)$, and $T(x) = 3x+x^3$, with coordinates $(0,3,0,1)$. These are the **columns** of a $4\\times2$ matrix: $\\begin{bmatrix}3&0\\\\0&3\\\\1&0\\\\0&1\\end{bmatrix}$. That matrix is not listed, so the answer is **None of the above**. The first option is its transpose, the second swaps the roles of $3$ and $1$, and the last has the wrong size ($P_3$ has dimension 4).",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "$L:M_{2\\times2}\\to M_{2\\times2}$, $L(A) = A+A^T$. What are $\\dim\\ker L$ and $\\dim\\operatorname{range}L$, in that order?",
    options: ["$0$ and $4$", "$3$ and $1$", "$2$ and $2$", "$1$ and $3$", NOTA],
    answer: 3,
    solution:
      "$L\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right) = \\begin{bmatrix}2a&b+c\\\\b+c&2d\\end{bmatrix}$. The kernel needs $a = d = 0$ and $c = -b$: the skew-symmetric matrices $\\begin{bmatrix}0&b\\\\-b&0\\end{bmatrix}$, dimension 1. The range is all symmetric matrices $\\begin{bmatrix}p&q\\\\q&r\\end{bmatrix}$, dimension 3. Check: $1+3 = 4 = \\dim M_{2\\times2}$ ✓.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "$T:M_{2\\times2}\\to M_{2\\times2}$, $T(A) = A-A^T$. What is $\\ker T$?",
    options: [
      "$\\{0\\}$",
      "The set of skew-symmetric matrices",
      "The set of symmetric matrices",
      "The set of diagonal matrices",
      NOTA,
    ],
    answer: 2,
    solution:
      "$T(A) = 0\\iff A = A^T$, so the kernel is the set of symmetric matrices (dimension 3). Diagonal matrices are in the kernel, but so is $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$, so \"diagonal\" is too small. The skew-symmetric matrices form the **range**: $T\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right) = \\begin{bmatrix}0&b-c\\\\c-b&0\\end{bmatrix}$, dimension 1, and $3+1 = 4$ ✓.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "$T:P_2\\to\\mathbb{R}^2$, $T(p) = (p(0),\\ p(1))$. Which statement is true?",
    options: [
      "$\\ker T = \\operatorname{Span}\\{x^2-x\\}$",
      "$T$ is one-to-one",
      "$T$ is not onto $\\mathbb{R}^2$",
      "$\\dim\\operatorname{range}T = 3$",
      NOTA,
    ],
    answer: 0,
    solution:
      "For $p = a+bx+cx^2$: $p(0) = a$ and $p(1) = a+b+c$. The kernel needs $a = 0$ and $b = -c$, so $p = c(x^2-x)$ and $\\ker T = \\operatorname{Span}\\{x^2-x\\}$ (dimension 1). Then $\\dim\\operatorname{range}T = 3-1 = 2$, so $T$ **is** onto $\\mathbb{R}^2$ (e.g. $T(1) = (1,1)$ and $T(x) = (0,1)$ are independent). A range of dimension 3 cannot sit inside $\\mathbb{R}^2$.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "Which of the following maps between vector spaces of matrices or polynomials is **not** linear?",
    options: [
      "$T:M_{2\\times2}\\to M_{2\\times2}$, $T(A) = A^T$",
      "$T:M_{2\\times2}\\to\\mathbb{R}$, $T(A) = \\det A$",
      "$T:P_3\\to P_2$, $T(p) = p'$",
      "$T:P_2\\to\\mathbb{R}$, $T(p) = p(1)$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$\\det(cA) = c^2\\det A$ for $2\\times2$ matrices, not $c\\det A$. Also $\\det(I+I) = 4\\ne\\det I+\\det I = 2$. So $\\det$ is not linear. Transpose, differentiation and evaluation all satisfy $T(c\\mathbf{u}+d\\mathbf{v}) = cT(\\mathbf{u})+dT(\\mathbf{v})$.",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "$T:P_2\\to P_2$ is defined by $(Tp)(x) = p(x+1)$. What is the matrix of $T$ relative to the basis $\\{1, x, x^2\\}$?",
    options: [
      "$\\begin{bmatrix}1&0&0\\\\1&1&0\\\\1&2&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&1&0\\\\0&1&2\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}1&1&1\\\\0&1&2\\\\0&0&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$T(1) = 1$, $T(x) = x+1$, $T(x^2) = (x+1)^2 = 1+2x+x^2$. Their coordinates $(1,0,0)$, $(1,1,0)$, $(1,2,1)$ are the **columns**: $\\begin{bmatrix}1&1&1\\\\0&1&2\\\\0&0&1\\end{bmatrix}$. The first option is the transpose. The second forgets the constant term $1$ in $(x+1)^2$.",
  },
];
