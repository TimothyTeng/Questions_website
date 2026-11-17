import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const transformationsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt: "Let $\\mathbf{b}\\in\\mathbb{R}^n$ be a fixed nonzero vector. Then $T(\\mathbf{x}) = \\mathbf{x}+\\mathbf{b}$ is a linear transformation of $\\mathbb{R}^n$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Check rule (1) of the definition: $T(\\mathbf{u}+\\mathbf{v}) = \\mathbf{u}+\\mathbf{v}+\\mathbf{b}$, while $T(\\mathbf{u})+T(\\mathbf{v}) = \\mathbf{u}+\\mathbf{v}+2\\mathbf{b}$. These differ because $\\mathbf{b}\\ne\\mathbf{0}$, so $T$ is not linear. **False**.",
    ref: "Slides 4.6 definition of linear transformation (vsp p27)",
  },
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt: "Let $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ be a linear transformation. If $T^2$ is defined by $T^2(\\mathbf{x}) = T(T(\\mathbf{x}))$ for all $\\mathbf{x}\\in\\mathbb{R}^2$, then $T^2$ is a linear transformation.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Use the two rules of $T$ twice: $T^2(\\mathbf{u}+\\mathbf{v}) = T(T(\\mathbf{u})+T(\\mathbf{v})) = T^2(\\mathbf{u})+T^2(\\mathbf{v})$ and $T^2(c\\mathbf{u}) = T(cT(\\mathbf{u})) = cT^2(\\mathbf{u})$. Equivalently, $T^2(\\mathbf{x}) = A(A\\mathbf{x}) = A^2\\mathbf{x}$ is a matrix transformation. **True**.",
    ref: "PYP AY22/23 S2 Q2(c)(ii); Slides 4.6 (vsp p27)",
  },
  {
    subtopic: "Linearity",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ satisfies $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v})$ for all $\\mathbf{u},\\mathbf{v}$. If $T(2,1) = (4,2)$ and $T(1,0) = (1,1)$, then $T(0,1) = (2,0)$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Rule (1) alone is enough here: $(2,1) = (1,0)+(1,0)+(0,1)$, so $T(2,1) = 2T(1,0)+T(0,1)$. Then $T(0,1) = (4,2)-2(1,1) = (2,0)$. **True**.",
    ref: "Slides 4.6 definition of linear transformation (vsp p27)",
  },
  {
    subtopic: "Standard matrix",
    kind: "tfn",
    prompt: "If $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is such that $T(\\mathbf{x}) = \\mathbf{0}$ for every vector $\\mathbf{x}$ in $\\mathbb{R}^n$, then the matrix $A$ representing the transformation $T$ is the $n\\times n$ zero matrix.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The columns of the standard matrix are $T(\\mathbf{e}_1),\\dots,T(\\mathbf{e}_n)$, and each is $\\mathbf{0}$. So $A$ is the $n\\times n$ zero matrix. **True**.",
    ref: "PYP AY21/22 S1 Q2(d)(ii); Tutorial 1 Q9",
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
    ref: "Tutorial 1 Q9",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt: "The kernel of a linear transformation in $\\mathbb{R}^2$ that projects points on to the $x$-axis is the $x$-axis.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The projection is $T(x_1,x_2) = (x_1,0)$. $T(\\mathbf{x}) = \\mathbf{0}$ iff $x_1 = 0$, so the kernel is the **$y$-axis**. The $x$-axis is the **range**. **False**.",
    ref: "PYP AY23/24 S2 Q2(c)(v); Slides 4.6 (vsp p27)",
  },
  {
    subtopic: "Composition",
    kind: "tfn",
    prompt: "Every rotation of $\\mathbb{R}^2$ about the origin commutes with every reflection through a line through the origin.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "One counterexample is enough: $R = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$ (rotation by $90^\\circ$ counter-clockwise) and $M = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ (reflection through the $x$-axis). $RM = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ but $MR = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$. **False**.",
    ref: "PYP AY22/23 S1 Q1(c)(ii); Tutorial 1 Q10",
  },
  {
    subtopic: "Composition",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^n\\to\\mathbb{R}^m$ has standard matrix $A$ and $S:\\mathbb{R}^m\\to\\mathbb{R}^p$ has standard matrix $B$. Then the standard matrix of the composite transformation $S(T(\\mathbf{x}))$ is $AB$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$S(T(\\mathbf{x})) = B(A\\mathbf{x}) = (BA)\\mathbf{x}$, so the matrix is $BA$ ($p\\times n$). $AB$ is generally not even defined ($A$ is $m\\times n$ and $B$ is $p\\times m$). **False**.",
    ref: "Tutorial 1 Q13",
  },
  {
    subtopic: "Kernel & range",
    kind: "tfn",
    prompt: "For any $m\\times n$ matrix $A$, the range of $T(\\mathbf{x}) = A\\mathbf{x}$ is the column space $C(A)$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$A\\mathbf{x} = x_1\\mathbf{a}_1+\\dots+x_n\\mathbf{a}_n$, so the set of all images is the set of all combinations of the columns, which is $C(A)$. The slides state it directly: if $T(\\mathbf{x}) = A\\mathbf{x}$, then range $= C(A)$. **True**.",
    ref: "Slides 4.6 (vsp p28)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt: "A linear transformation $T:\\mathbb{R}^3\\to\\mathbb{R}^2$, $T(\\mathbf{x}) = A\\mathbf{x}$, can be one-to-one.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\mathbf{x}\\mapsto A\\mathbf{x}$ is one-to-one iff $N(A) = \\{\\mathbf{0}\\}$. $A$ is $2\\times3$, so rank of $A\\le2$, and by the Rank Theorem $\\dim N(A) = 3-\\text{rank}\\ge1$. So $N(A)\\ne\\{\\mathbf{0}\\}$ and $T$ is never one-to-one. **False**.",
    ref: "Slides 4.5 table (vsp p26); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt: "If $T(\\mathbf{x}) = A\\mathbf{x}$ maps $\\mathbb{R}^4$ onto $\\mathbb{R}^4$, then $T$ is one-to-one.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Onto means $C(A) = \\mathbb{R}^4$. For the square matrix $A$, the Invertible Matrix Theorem (Theorem 4.9) makes this equivalent to $N(A) = \\{\\mathbf{0}\\}$, i.e. $T$ one-to-one. (Rank Theorem: rank 4 gives $\\dim N(A) = 4-4 = 0$.) **True**.",
    ref: "Slides 4.5 table (vsp p26); Theorem 4.9 (vsp p66)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt: "$T:\\mathbb{R}^3\\to\\mathbb{R}^5$ is a linear transformation, $T(\\mathbf{x}) = A\\mathbf{x}$. Then $T$ is one-to-one.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The $5\\times3$ matrix $A$ **can** have rank 3 (e.g. the first three columns of $I_5$), giving $\\dim N(A) = 0$ and a one-to-one $T$. It can also have smaller rank (e.g. the zero map, $N(A) = \\mathbb{R}^3$). Nothing else is given. **Not enough information**.",
    ref: "Slides 4.5 table (vsp p26); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "tfn",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^3$ is $T(\\mathbf{x}) = A\\mathbf{x}$, where the columns of $A$ are linearly independent. Then $T$ maps $\\mathbb{R}^2$ onto $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The range is $C(A)$, spanned by 2 vectors, so $\\dim C(A) = 2 < 3$ and $C(A)\\ne\\mathbb{R}^3$: not onto. (The independent columns make $N(A) = \\{\\mathbf{0}\\}$, so $T$ is one-to-one, but that is a different property.) **False**.",
    ref: "Slides 4.5 table (vsp p26); 4.14 Rank (vsp p64)",
  },
  {
    subtopic: "General vector spaces",
    kind: "tfn",
    prompt: "For the linear transformation $L: M_{2\\times2}\\to M_{2\\times2}$, $L(A) = A+A^T$, the kernel of $L$ is $\\{0\\}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Any skew-symmetric matrix ($A^T = -A$) is sent to $0$. For example $L\\left(\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}\\right) = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}+\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = 0$. So the kernel is not $\\{0\\}$ (in fact it has dimension 1). **False**.",
    ref: "PYP AY23/24 S1 Q2(b); Tutorial 3 Q3",
  },
  {
    subtopic: "Invertible transformations",
    kind: "tfn",
    prompt: "Suppose $V$ and $W$ are vector spaces and $T:V\\to W$ is an invertible linear transformation. Then $T^{-1}:W\\to V$ is also linear.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Let $\\mathbf{u} = T^{-1}(\\mathbf{x})$ and $\\mathbf{v} = T^{-1}(\\mathbf{y})$. Then $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v}) = \\mathbf{x}+\\mathbf{y}$, so $T^{-1}(\\mathbf{x}+\\mathbf{y}) = \\mathbf{u}+\\mathbf{v} = T^{-1}(\\mathbf{x})+T^{-1}(\\mathbf{y})$. Similarly $T(c\\mathbf{u}) = cT(\\mathbf{u}) = c\\mathbf{x}$ gives $T^{-1}(c\\mathbf{x}) = c\\mathbf{u} = cT^{-1}(\\mathbf{x})$. **True**.",
    ref: "PYP AY23/24 S1 Q1(c)",
  },
  {
    subtopic: "Area & volume",
    kind: "tfn",
    prompt: "$T:\\mathbb{R}^3\\to\\mathbb{R}^3$ has a standard matrix $A$ with $|A| = 0$. Then the image of the unit cube under $T$ has volume $0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "By Theorem 3.2, volume of $T(S) = abs(|A|)\\times$ volume of $S = 0\\times1 = 0$. **True**.",
    ref: "Slides 3.3 Theorem 3.2 (det p17)",
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
      "$(2x_1-x_2,\\ 3x_2) = \\begin{bmatrix}2&-1\\\\0&3\\end{bmatrix}\\mathbf{x}$ is a matrix transformation, hence linear. The others fail rule (2) $T(c\\mathbf{u}) = cT(\\mathbf{u})$: $(x_1+1,x_2)$ gives $T(2,0) = (3,0)\\ne2T(1,0) = (4,0)$; $x_1x_2$ gives $T(2,2) = (4,2)\\ne2T(1,1) = (2,2)$; $|x_1|$ with $c = -1$ gives $T(-1,0) = (1,0)\\ne -T(1,0) = (-1,0)$.",
    ref: "Slides 4.6 definition (vsp p27)",
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
      "For $T(x_1,x_2) = (x_1,\\ x_2+3)$, rule (2) with $\\mathbf{u} = (0,0)$ and $c = 2$ fails: $T(0,0) = (0,3)$, but $2T(0,0) = (0,6)$. So it is not linear. The swap $(x_2,x_1)$ (reflection through $y = x$), the zero map, and $(x_1+x_2,\\ x_1-x_2,\\ 0)$ are all of the form $A\\mathbf{x}$, so they are linear.",
    ref: "Slides 4.6 definition (vsp p27)",
  },
  {
    subtopic: "Linearity",
    kind: "mcq",
    prompt: "$T$ is linear with $T(\\mathbf{u}) = (1,2)$ and $T(\\mathbf{v}) = (3,-1)$. What is $T(2\\mathbf{u}-3\\mathbf{v})$?",
    options: ["$(7,-7)$", "$(-7,7)$", "$(11,1)$", "$(-7,1)$", NOTA],
    answer: 1,
    solution:
      "By linearity $T(2\\mathbf{u}-3\\mathbf{v}) = 2T(\\mathbf{u})-3T(\\mathbf{v}) = (2,4)-(9,-3) = (-7,7)$. $(11,1)$ is $2T(\\mathbf{u})+3T(\\mathbf{v})$ (sign slip on the whole term), and $(-7,1)$ forgets that $-3\\cdot(-1) = +3$.",
    ref: "Slides 4.6 definition (vsp p27)",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt:
      "Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}1&-1\\\\2&-2\\\\0&1\\end{bmatrix}$. Which vector is in the range of $T$?",
    options: ["$(1,1,0)$", "$(0,1,1)$", "$(2,4,-3)$", "$(3,5,2)$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{b}$ is in the range iff $A\\mathbf{x} = \\mathbf{b}$ is consistent. $A\\mathbf{x} = (x_1-x_2,\\ 2(x_1-x_2),\\ x_2)$, so every image has its second entry twice the first. Only $(2,4,-3)$ fits, from $x_2 = -3$, $x_1 = -1$. Check: $A(-1,-3) = (2,4,-3)$ ✓. For the other options $A\\mathbf{x} = \\mathbf{b}$ is inconsistent.",
    ref: "Slides 4.6 (vsp p28); 4.5 table (vsp p26)",
  },
  {
    subtopic: "Matrix transformations",
    kind: "mcq",
    prompt:
      "Let $T(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}1&2\\\\3&-1\\\\-2&1\\end{bmatrix}$. Find $\\mathbf{x}$ such that $T(\\mathbf{x}) = (4,5,-3)$.",
    options: ["$(1,2)$", "$(4,5)$", "$(2,-1)$", "$(2,1)$", NOTA],
    answer: 3,
    solution:
      "Solve $x_1+2x_2 = 4$ and $3x_1-x_2 = 5$. From the second, $x_2 = 3x_1-5$, so $x_1+6x_1-10 = 4$, giving $x_1 = 2$ and $x_2 = 1$. Check the third row: $-2(2)+1 = -3$ ✓. The columns of $A$ are independent, so $N(A) = \\{\\mathbf{0}\\}$ and this $\\mathbf{x}$ is the only one.",
    ref: "Slides 4.6 (vsp p28)",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt:
      "Let $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ be a linear transformation that maps $\\mathbf{e}_1$ into $\\mathbf{y}_1 = (2,5)$ and maps $\\mathbf{e}_2$ into $\\mathbf{y}_2 = (-1,6)$. Find the image of $(5,-3)$.",
    options: ["$(-5,-23)$", "$(7,43)$", "$(13,7)$", "$(13,-7)$", NOTA],
    answer: 2,
    solution:
      "$T(5,-3) = 5T(\\mathbf{e}_1)-3T(\\mathbf{e}_2) = (10,25)-(-3,18) = (13,7)$. In general $T(x_1,x_2) = (2x_1-x_2,\\ 5x_1+6x_2)$. $(-5,-23)$ uses the images as rows ($A^T$), and $(7,43)$ uses $+3$ instead of $-3$.",
    ref: "Tutorial 1 Q9",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(\\mathbf{e}_1) = (3,-1)$ and $T(\\mathbf{e}_2) = (2,4)$. Find $T(4,-2)$.",
    options: ["$(8,-12)$", "$(14,0)$", "$(2,18)$", "$(16,4)$", NOTA],
    answer: 0,
    solution:
      "$T(4,-2) = 4T(\\mathbf{e}_1)-2T(\\mathbf{e}_2) = (12,-4)-(4,8) = (8,-12)$. Equivalently, $A = \\begin{bmatrix}3&2\\\\-1&4\\end{bmatrix}$ with the images as **columns**. $(14,0)$ comes from using the images as rows ($A^T$), and $(2,18)$ from swapping which weight goes with which image.",
    ref: "Tutorial 1 Q9",
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
    ref: "Tutorial 1 Q9; Slides 0B (mtx p12)",
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
    ref: "PYP AY25/26 S2 Q3; AY23/24 S2 Q1(c)",
  },
  {
    subtopic: "Standard matrix",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^2\\to\\mathbb{R}^3$ is linear with $T(1,1) = (1,0,2)$ and $T(0,1) = (2,1,-1)$. Find $T(3,5)$.",
    options: ["$(13,5,1)$", "$(-1,-2,8)$", "$(11,4,2)$", "$(4,2,-2)$", NOTA],
    answer: 4,
    solution:
      "Write $(3,5) = 3(1,1)+2(0,1)$. Then $T(3,5) = 3(1,0,2)+2(2,1,-1) = (3,0,6)+(4,2,-2) = (7,2,4)$. This is not listed, so the answer is **None of the above**. $(13,5,1) = 3T(1,1)+5T(0,1)$ wrongly uses the entries of $(3,5)$ as weights, which only works for the standard basis.",
    ref: "PYP AY21/22 S1 Q1(d)",
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
      "Clockwise by $90^\\circ$ sends $\\mathbf{e}_1 = (1,0)$ to $(0,-1)$ and $\\mathbf{e}_2 = (0,1)$ to $(1,0)$. These are the columns: $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$. (From the rotation matrix with $\\theta = -\\pi/2$: $\\cos\\theta = 0$, $\\sin\\theta = -1$.) The first option is the counter-clockwise rotation, the third is the reflection through $y = x$, and the fourth is rotation by $180^\\circ$.",
    ref: "Tutorial 1 Q10(a); PYP AY22/23 S1 Q1(c)",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "$M:\\mathbb{R}^2\\to\\mathbb{R}^2$ is the reflection across the line $x_1 = x_2$. What is the standard matrix of $M$?",
    options: [
      "$\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$",
      "$\\begin{bmatrix}-1&0\\\\0&-1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Reflecting across $x_1 = x_2$ swaps the two coordinates: $\\mathbf{e}_1 = (1,0)\\mapsto(0,1)$ and $\\mathbf{e}_2 = (0,1)\\mapsto(1,0)$. These images are the columns: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$. The other options are the reflection through the $x$-axis, the rotation by $90^\\circ$ counter-clockwise, and $N(\\mathbf{v}) = -\\mathbf{v}$.",
    ref: "PYP AY22/23 S1 Q1(c)(i); Tutorial 1 Q10(b)",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "$T$ rotates points of $\\mathbb{R}^2$ through $\\pi/3$ radians counter-clockwise about the origin. What is $T(2,0)$?",
    options: ["$(1,\\ \\sqrt3)$", "$(\\sqrt3,\\ 1)$", "$(1,\\ -\\sqrt3)$", "$(-1,\\ \\sqrt3)$", NOTA],
    answer: 0,
    solution:
      "$T(2,0) = 2T(\\mathbf{e}_1) = 2(\\cos\\frac\\pi3,\\ \\sin\\frac\\pi3) = 2(\\tfrac12,\\ \\tfrac{\\sqrt3}2) = (1,\\sqrt3)$. $(\\sqrt3,1)$ swaps $\\cos$ and $\\sin$ (that is rotation by $\\pi/6$), $(1,-\\sqrt3)$ is the clockwise rotation, and $(-1,\\sqrt3)$ is rotation by $2\\pi/3$.",
    ref: "Tutorial 1 Q10(a)",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "Which of the following does **not** have standard matrix $-I = \\begin{bmatrix}-1&0\\\\0&-1\\end{bmatrix}$?",
    options: [
      "Rotation through $\\pi$ about the origin",
      "$N(\\mathbf{v}) = -\\mathbf{v}$ for every $\\mathbf{v}\\in\\mathbb{R}^2$",
      "Rotation through $90^\\circ$ counter-clockwise, applied twice",
      "Rotation through $90^\\circ$ clockwise, applied twice",
      "Reflection through the $x$-axis followed by reflection through the line $y = x$",
    ],
    answer: 4,
    solution:
      "The two reflections give $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix} = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, a rotation through $\\pi/2$ (Tutorial 1 Q10(b)), not $-I$. The others give $-I$: rotation by $\\pi$ has $\\cos\\pi = -1$, $\\sin\\pi = 0$; $N$ sends $\\mathbf{e}_i$ to $-\\mathbf{e}_i$; $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}^2 = -I$ and $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}^2 = -I$.",
    ref: "PYP AY23/24 S1 Q2(d)(ii); Tutorial 1 Q10(b)",
  },
  {
    subtopic: "Geometric transformations",
    kind: "mcq",
    prompt: "$P$ is the linear transformation of $\\mathbb{R}^2$ that projects points onto the $x$-axis. Which statement is true?",
    options: [
      "$P$ has standard matrix $\\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$",
      "The kernel of $P$ is the $x$-axis",
      "The range of $P$ is the $y$-axis",
      "The kernel of $P$ is the $y$-axis",
      NOTA,
    ],
    answer: 3,
    solution:
      "$P(x_1,x_2) = (x_1,0)$, with matrix $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$. $P(\\mathbf{x}) = \\mathbf{0}$ iff $x_1 = 0$, so the kernel is the $y$-axis. The range (all outputs $(x_1,0)$) is the $x$-axis. The first three options all mix up the two axes.",
    ref: "PYP AY23/24 S2 Q2(c)(v); Slides 4.6 (vsp p27–28)",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first rotates points $90^\\circ$ counter-clockwise and then reflects points through the line $y = x$. $T$ is the same as which single transformation?",
    options: [
      "Reflection through the horizontal $x$-axis",
      "Rotation through $90^\\circ$ clockwise",
      "$N(\\mathbf{v}) = -\\mathbf{v}$",
      "Rotation through $90^\\circ$ counter-clockwise",
      NOTA,
    ],
    answer: 0,
    solution:
      "The first map goes on the right: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$, the reflection through the $x$-axis. Check with $\\mathbf{e}_1$: $(1,0)\\mapsto(0,1)\\mapsto(1,0)$ ✓. Multiplying in the wrong order gives $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$, a different map.",
    ref: "Tutorial 1 Q10, Q13",
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
    ref: "Tutorial 1 Q13",
  },
  {
    subtopic: "Composition",
    kind: "mcq",
    prompt: "Which pair of transformations of $\\mathbb{R}^2$ commutes, i.e. gives the same result in either order?",
    options: [
      "Rotation by $90^\\circ$ counter-clockwise and reflection through the $x$-axis",
      "Projection onto the $x$-axis and reflection through the line $y = x$",
      "$N(\\mathbf{v}) = -\\mathbf{v}$ and reflection through the line $y = x$",
      "Rotation by $90^\\circ$ counter-clockwise and projection onto the $x$-axis",
      NOTA,
    ],
    answer: 2,
    solution:
      "$N$ has matrix $-I$, and $(-I)F = -F = F(-I)$ for any $F$, so the pair in option C commutes. The others do not. A: $RM = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ but $MR = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$. B: with $P = \\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $F = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$: $PF = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ but $FP = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$. D: $RP = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$ but $PR = \\begin{bmatrix}0&-1\\\\0&0\\end{bmatrix}$.",
    ref: "PYP AY22/23 S1 Q1(c)(ii)",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt: "Let $T:\\mathbb{R}^3\\to\\mathbb{R}^4$, $T(x_1,x_2,x_3) = (x_3,\\ x_3,\\ 0,\\ x_1)$. What is the kernel of $T$?",
    options: [
      "$\\{\\mathbf{0}\\}$",
      "$\\operatorname{Span}\\{(0,1,0)\\}$",
      "$\\operatorname{Span}\\{(0,0,1,0)\\}$",
      "$\\operatorname{Span}\\{(1,0,0),\\ (0,0,1)\\}$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$T(\\mathbf{x}) = \\mathbf{0}$ needs $x_3 = 0$ and $x_1 = 0$, with $x_2$ free. So the kernel is $\\{(0,x_2,0)\\} = \\operatorname{Span}\\{(0,1,0)\\}$. The kernel lives in $\\mathbb{R}^3$ (the space $T$ maps from), so a 4-entry vector cannot be in it. $\\operatorname{Span}\\{\\mathbf{e}_1,\\mathbf{e}_3\\}$ lists the variables that **matter**, which is the opposite of the kernel. Rank Theorem check: rank 2 + $\\dim N(A)$ 1 = 3 ✓.",
    ref: "Tutorial 4 Q17; PYP AY25/26 S1 Q3",
  },
  {
    subtopic: "Kernel & range",
    kind: "mcq",
    prompt: "Let $T(x_1,x_2,x_3) = (x_1-x_2,\\ x_2-x_3,\\ x_3-x_1)$. Which vector is **not** in the range of $T$?",
    options: ["$(1,-1,0)$", "$(2,0,-2)$", "$(0,3,-3)$", "$(1,1,1)$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{b}$ is in the range iff $A\\mathbf{x} = \\mathbf{b}$ is consistent. Adding the three equations $x_1-x_2 = b_1$, $x_2-x_3 = b_2$, $x_3-x_1 = b_3$ gives $0 = b_1+b_2+b_3$, so a consistent $\\mathbf{b}$ must have entry sum $0$. $(1,1,1)$ has sum $3$: not in the range. The other three are images: $(1,-1,0) = T(1,0,1)$, $(2,0,-2) = T(2,0,0)$ and $(0,3,-3) = T(0,0,-3)$.",
    ref: "Slides 4.6 (vsp p28); 4.5 table (vsp p26)",
  },
  {
    subtopic: "Rank & nullity",
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
      "$A = \\begin{bmatrix}1&2&-1\\\\2&4&-2\\\\0&1&1\\end{bmatrix}$. $R_2-2R_1$ gives a zero row, and the echelon form has pivots in columns 1 and 2, so the rank of $T$ (the dimension of its range) is 2. By the Rank Theorem the nullity is $3-2 = 1$. The kernel is $\\operatorname{Span}\\{(3,-1,1)\\}$; check: $A(3,-1,1) = (3-2-1,\\ 6-4-2,\\ -1+1) = \\mathbf{0}$ ✓. Rank and nullity must add to 3, which rules out \"rank 2, nullity 0\".",
    ref: "PYP AY22/23 S2 Q1(b); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt: "$T(\\mathbf{x}) = A\\mathbf{x}$, where $A$ is $3\\times3$ with exactly 2 pivot positions. Then $T$ is",
    options: [
      "one-to-one but not onto $\\mathbb{R}^3$",
      "onto $\\mathbb{R}^3$ but not one-to-one",
      "both one-to-one and onto $\\mathbb{R}^3$",
      "neither one-to-one nor onto $\\mathbb{R}^3$",
      NOTA,
    ],
    answer: 3,
    solution:
      "Rank 2, so $\\dim N(A) = 3-2 = 1$: $N(A)\\ne\\{\\mathbf{0}\\}$, not one-to-one. $\\dim C(A) = 2 < 3$: $C(A)\\ne\\mathbb{R}^3$, not onto. (For a square matrix the Invertible Matrix Theorem says $N(A) = \\{\\mathbf{0}\\}$ and $C(A) = \\mathbb{R}^n$ stand or fall together.)",
    ref: "Slides 4.5 table (vsp p26); Theorems 4.8, 4.9 (vsp p64, p66)",
  },
  {
    subtopic: "One-to-one & onto",
    kind: "mcq",
    prompt: "For which matrix $A$ is $N(A) = \\{\\mathbf{0}\\}$, i.e. $T(\\mathbf{x}) = A\\mathbf{x}$ one-to-one?",
    options: [
      "$\\begin{bmatrix}1&2&3\\\\0&1&4\\end{bmatrix}$",
      "$\\begin{bmatrix}1&2\\\\2&4\\\\3&6\\end{bmatrix}$",
      "$\\begin{bmatrix}1&0\\\\0&1\\\\2&3\\end{bmatrix}$",
      "$\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$",
      NOTA,
    ],
    answer: 2,
    solution:
      "$N(A) = \\{\\mathbf{0}\\}$ means $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, i.e. the columns are linearly independent. In $\\begin{bmatrix}1&0\\\\0&1\\\\2&3\\end{bmatrix}$ the first two rows force $x_1 = x_2 = 0$. The $2\\times3$ matrix has rank $\\le2$, so $\\dim N(A)\\ge1$. In the second and fourth matrices, column 2 is a multiple of column 1, giving nonzero solutions.",
    ref: "Slides 4.5 table (vsp p26); 4.7 linear independence (vsp p29)",
  },
  {
    subtopic: "Rank & nullity",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^4\\to\\mathbb{R}^3$, $T(\\mathbf{x}) = A\\mathbf{x}$, maps $\\mathbb{R}^4$ **onto** $\\mathbb{R}^3$. What is the dimension of the kernel of $T$?",
    options: ["$1$", "$0$", "$3$", "$4$", NOTA],
    answer: 0,
    solution:
      "Onto $\\mathbb{R}^3$ means $C(A) = \\mathbb{R}^3$, so rank of $A = 3$. The Rank Theorem with $n = 4$ columns: $\\dim N(A) = 4-3 = 1$.",
    ref: "Slides 4.5 table (vsp p26); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt:
      "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A$ an $n\\times n$ matrix. Which of the following statements are correct?\nI. If $N(A) = \\{\\mathbf{0}\\}$, then $C(A) = \\mathbb{R}^n$.\nII. If the kernel of $T$ is $\\{\\mathbf{0}\\}$, then $A$ is invertible.\nIII. If the columns of $A$ span $\\mathbb{R}^n$, then $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.\nIV. If $T(\\mathbf{x}) = \\mathbf{b}$ is consistent for some $\\mathbf{b}$, then the range of $T$ is $\\mathbb{R}^n$.",
    options: ["I and II only", "II and III only", "I, II and III only", "All of the above", NOTA],
    answer: 2,
    solution:
      "For a square matrix, the Invertible Matrix Theorem (Theorems 2.4 and 4.9) makes \"$A$ invertible\", \"$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution\", \"columns span $\\mathbb{R}^n$\", \"$C(A) = \\mathbb{R}^n$\" and \"$N(A) = \\{\\mathbf{0}\\}$\" equivalent, and the kernel of $T$ is $N(A)$. So I, II and III are correct. IV is false: $T(\\mathbf{x}) = \\mathbf{0}$ is consistent for **every** $A$ (take $\\mathbf{x} = \\mathbf{0}$), including $A = 0$, whose range is $\\{\\mathbf{0}\\}$.",
    ref: "Slides 2.2 Theorem 2.4 (alg p10); 4.14 Theorem 4.9 (vsp p66); 4.6 (vsp p28)",
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
      "$A = \\begin{bmatrix}2&5\\\\1&3\\end{bmatrix}$ has $ad-bc = 6-5 = 1$, so $A^{-1} = \\begin{bmatrix}3&-5\\\\-1&2\\end{bmatrix}$. $A^{-1}$ transforms $A\\mathbf{x}$ back to $\\mathbf{x}$, so $T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y} = (3y_1-5y_2,\\ -y_1+2y_2)$. Check: $T(3,-1) = (6-5,\\ 3-3) = (1,0)$ ✓. The second option is $(A^{-1})^T$, the third has the wrong overall sign, and the fourth forgets to swap the diagonal entries.",
    ref: "Slides 2.2 Invertible Linear Transformations (alg p12); Slides 0B inverse (mtx p13)",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt: "Which of the following transformations of $\\mathbb{R}^2$ is **not** invertible?",
    options: [
      "Rotation through $2\\pi/5$",
      "Reflection through the line $y = x$",
      "$N(\\mathbf{v}) = -\\mathbf{v}$",
      "$T(x_1,x_2) = (3x_1+2x_2,\\ x_1+x_2)$",
      "Projection onto the $x$-axis",
    ],
    answer: 4,
    solution:
      "The projection has matrix $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ with $ad-bc = 0$, so it is not invertible (its kernel is the whole $y$-axis). The others have $ad-bc\\ne0$: a rotation matrix has $\\cos^2\\theta+\\sin^2\\theta = 1$; $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has $-1$; $-I$ has $1$; $\\begin{bmatrix}3&2\\\\1&1\\end{bmatrix}$ has $1$.",
    ref: "Slides 0B inverse (mtx p13); 2.2 Invertible Linear Transformations (alg p12); PYP AY23/24 S2 Q2(c)(v)",
  },
  {
    subtopic: "Invertible transformations",
    kind: "mcq",
    prompt:
      "$T:\\mathbb{R}^n\\to\\mathbb{R}^n$ first applies the transformation with invertible standard matrix $A$ and then the transformation with invertible standard matrix $B$. What is the standard matrix of $T^{-1}$?",
    options: ["$A^{-1}B^{-1}$", "$B^{-1}A^{-1}$", "$B^{-1}A$", "$AB$", NOTA],
    answer: 0,
    solution:
      "$T(\\mathbf{x}) = B(A\\mathbf{x}) = (BA)\\mathbf{x}$, so $T^{-1}$ has matrix $(BA)^{-1} = A^{-1}B^{-1}$ (theorem: $(AB)^{-1} = B^{-1}A^{-1}$). In words: undo the last step ($B^{-1}$) first, then undo $A$. $B^{-1}A^{-1}$ is the inverse of $AB$, the wrong order.",
    ref: "Slides 0B inverse theorem (mtx p13); 2.2 (alg p12); Tutorial 1 Q13",
  },
  {
    subtopic: "Area & volume",
    kind: "mcq",
    prompt: "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is determined by a $2\\times2$ matrix $A$ with $|A| = -3$. $S$ is a parallelogram of area $5$. What is the area of $T(S)$?",
    options: ["$-15$", "$15$", "$\\tfrac53$", "$8$", NOTA],
    answer: 1,
    solution:
      "Theorem 3.2: area of $T(S) = abs(|A|)\\times$ area of $S = 3\\times5 = 15$. An area is never negative, so $-15$ forgets the absolute value.",
    ref: "Slides 3.3 Theorem 3.2 (det p17–19)",
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
      "Column $j$ holds the coordinates of $D(\\text{basis}_j)$: $D(1) = 0$, $D(t) = 1$, $D(t^2) = 2t$ and $D(t^3) = 3t^2$, giving columns $(0,0,0,0)$, $(1,0,0,0)$, $(0,2,0,0)$, $(0,0,3,0)$. So $1, 2, 3$ sit just above the diagonal. The first option puts the coordinates in rows (the transpose), and the second forgets the factors from differentiating.",
    ref: "PYP AY25/26 S1 Q6; Slides 4.10 (vsp p44)",
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
      "$T(1) = 3+x^2$, with coordinates $(3,0,1,0)$, and $T(x) = 3x+x^3$, with coordinates $(0,3,0,1)$. These are the **columns** of a $4\\times2$ matrix: $\\begin{bmatrix}3&0\\\\0&3\\\\1&0\\\\0&1\\end{bmatrix}$. That matrix is not listed, so the answer is **None of the above**. The first option is its transpose, the second swaps the roles of $3$ and $1$, and the last has the wrong size ($\\dim P_3 = 4$).",
    ref: "PYP AY24/25 S2 Q4",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt:
      "$L:M_{2\\times2}\\to M_{2\\times2}$, $L(A) = A+A^T$. What are the dimensions of the kernel of $L$ and of the range of $L$, in that order?",
    options: ["$0$ and $4$", "$3$ and $1$", "$2$ and $2$", "$1$ and $3$", NOTA],
    answer: 3,
    solution:
      "$L\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right) = \\begin{bmatrix}2a&b+c\\\\b+c&2d\\end{bmatrix}$. The kernel needs $a = d = 0$ and $c = -b$: the matrices $b\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$, dimension 1. The range is all symmetric matrices $\\begin{bmatrix}p&q\\\\q&r\\end{bmatrix}$, with basis $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}, \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}, \\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$: dimension 3. In coordinates $(a,b,c,d)$ the matrix of $L$ has rank 3, and $1+3 = 4$ ✓.",
    ref: "PYP AY23/24 S1 Q2(b)",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "$T:M_{2\\times2}\\to M_{2\\times2}$, $T(A) = A-A^T$. What is the kernel of $T$?",
    options: [
      "$\\{0\\}$",
      "The set of skew-symmetric matrices ($A^T = -A$)",
      "The set of symmetric matrices ($A^T = A$)",
      "The set of diagonal matrices",
      NOTA,
    ],
    answer: 2,
    solution:
      "$T(A) = 0\\iff A = A^T$, so the kernel is the set of symmetric matrices (dimension 3). Diagonal matrices are in the kernel, but so is $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$, so \"diagonal\" is too small. The skew-symmetric matrices form the **range**: $T\\left(\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right) = \\begin{bmatrix}0&b-c\\\\c-b&0\\end{bmatrix}$, dimension 1, and $3+1 = 4$ ✓.",
    ref: "PYP AY23/24 S1 Q2(b); PYP AY25/26 S1 Q5; Tutorial 3 Q3",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "$T:P_2\\to\\mathbb{R}^2$, $T(p) = (p(0),\\ p(1))$. Which statement is true?",
    options: [
      "The kernel of $T$ is $\\operatorname{Span}\\{x^2-x\\}$",
      "The kernel of $T$ is $\\{0\\}$",
      "The range of $T$ is not all of $\\mathbb{R}^2$",
      "The range of $T$ has dimension $3$",
      NOTA,
    ],
    answer: 0,
    solution:
      "For $p = a+bx+cx^2$: $p(0) = a$ and $p(1) = a+b+c$. The kernel needs $a = 0$ and $b = -c$, so $p = c(x^2-x)$ and the kernel is $\\operatorname{Span}\\{x^2-x\\}$ (dimension 1). The matrix of $T$ relative to $\\{1,x,x^2\\}$ is $\\begin{bmatrix}1&0&0\\\\1&1&1\\end{bmatrix}$, of rank 2, so the range is all of $\\mathbb{R}^2$ ($T(1) = (1,1)$ and $T(x) = (0,1)$ are independent). A range of dimension 3 cannot sit inside $\\mathbb{R}^2$.",
    ref: "Slides 4.6 (vsp p27–28); 4.10 (vsp p44); Theorem 4.8 (vsp p64)",
  },
  {
    subtopic: "General vector spaces",
    kind: "mcq",
    prompt: "Which of the following maps between vector spaces of matrices or polynomials is **not** linear?",
    options: [
      "$T:M_{2\\times2}\\to M_{2\\times2}$, $T(A) = A^T$",
      "$T:P_3\\to P_2$, $T(p) = p'$",
      "$T:P_2\\to\\mathbb{R}$, $T(p) = p(1)$",
      "$T:P_2\\to P_2$, $T(p) = p+1$",
      NOTA,
    ],
    answer: 3,
    solution:
      "For $T(p) = p+1$, rule (2) with $c = 2$ fails: $T(2p) = 2p+1$ but $2T(p) = 2p+2$. So it is not linear. Transpose ($(A+B)^T = A^T+B^T$, $(sA)^T = sA^T$), differentiation and evaluation at $1$ all satisfy both rules of the definition.",
    ref: "Slides 4.6 definition (vsp p27); Slides 0B transpose properties (mtx p8)",
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
    ref: "PYP AY25/26 S1 Q6; PYP AY24/25 S2 Q4 (method); Slides 4.10 (vsp p44)",
  },
];
