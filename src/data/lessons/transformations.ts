import type { Lesson } from "@/lib/types";

export const transformationsLesson: Lesson = {
  topic: "transformations",
  bigPicture:
    "A linear transformation $T$ from a vector space $V$ into a vector space $W$ is a rule that respects addition and scalar multiplication. Every linear $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is $T(\\mathbf{x}) = A\\mathbf{x}$ for its **standard matrix** $A = [T(\\mathbf{e}_1)\\ \\cdots\\ T(\\mathbf{e}_n)]$, so questions about $T$ become matrix questions: doing $T$ and then $S$ is the product $BA$, the **kernel** of $T$ is $N(A)$, the **range** of $T$ is $C(A)$ (Rank Theorem: rank of $A$ + $\\dim N(A) = n$), $T$ is undone by $A^{-1}$ when $A$ is invertible, and $T$ scales areas and volumes by $abs(|A|)$. Maps on $P_n$ and $M_{2\\times2}$ are handled the same way once each input and output is written in coordinates.",
  sections: [
    {
      title: "What makes a transformation linear",
      intuition:
        "A transformation assigns to each input vector exactly one output vector. It is **linear** when adding or scaling the inputs first gives the same result as adding or scaling the outputs.",
      keyIdeas: [
        "**Definition** (Slides 4.6). A linear transformation $T$ from a vector space $V$ into a vector space $W$ assigns to each $\\mathbf{x}$ in $V$ a unique vector $T(\\mathbf{x})$ in $W$, such that (1) $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v})$ for all $\\mathbf{u},\\mathbf{v}$ in $V$, and (2) $T(c\\mathbf{u}) = cT(\\mathbf{u})$ for all $\\mathbf{u}$ in $V$ and all scalars $c$.",
        "Using (1) and (2) repeatedly: $T(c_1\\mathbf{v}_1+\\dots+c_p\\mathbf{v}_p) = c_1T(\\mathbf{v}_1)+\\dots+c_pT(\\mathbf{v}_p)$. So once you know $T$ on some vectors, you know it on every linear combination of them.",
        "A **matrix transformation** $T(\\mathbf{x}) = A\\mathbf{x}$ is linear, because $A(\\mathbf{u}+\\mathbf{v}) = A\\mathbf{u}+A\\mathbf{v}$ and $A(c\\mathbf{u}) = cA\\mathbf{u}$. If $A$ is $m\\times n$, then $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ (inputs have $n$ entries, the number of **columns**).",
        "To show a given map is **not** linear, find one choice of vectors (or of $c$) for which (1) or (2) fails.",
        "**$T^2$ is linear** (PYP): if $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear and $T^2(\\mathbf{x}) = T(T(\\mathbf{x}))$, then $T^2(\\mathbf{u}+\\mathbf{v}) = T(T(\\mathbf{u})+T(\\mathbf{v})) = T^2(\\mathbf{u})+T^2(\\mathbf{v})$ and $T^2(c\\mathbf{u}) = T(cT(\\mathbf{u})) = cT^2(\\mathbf{u})$.",
      ],
      formulas: [
        "T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v}),\\qquad T(c\\mathbf{u}) = c\\,T(\\mathbf{u})",
        "A \\text{ is } m\\times n \\;\\Longrightarrow\\; T:\\mathbb{R}^n\\to\\mathbb{R}^m,\\quad \\mathbf{x}\\mapsto A\\mathbf{x}",
      ],
      example: {
        problem:
          "Which of these satisfy the definition of a linear transformation? $T_1(x_1,x_2) = (2x_1-x_2,\\ x_1+3x_2,\\ 0)$, $T_2(x_1,x_2) = (x_1+1,\\ x_2)$.",
        steps: [
          "$T_1$: every output entry is a combination of $x_1, x_2$, so $T_1(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}2&-1\\\\1&3\\\\0&0\\end{bmatrix}$. A matrix transformation is linear, $\\mathbb{R}^2\\to\\mathbb{R}^3$.",
          "$T_2$: test rule (2) with $\\mathbf{u} = (1,0)$ and $c = 2$: $T_2(2,0) = (3,0)$ but $2T_2(1,0) = 2(2,0) = (4,0)$.",
          "Rule (2) fails, so $T_2$ is not linear.",
        ],
        answer: "Only $T_1$ is linear.",
      },
      pitfalls: [
        "A $3\\times5$ matrix gives $T:\\mathbb{R}^5\\to\\mathbb{R}^3$, not $\\mathbb{R}^3\\to\\mathbb{R}^5$. The number of columns is the size of the input.",
        "To prove linearity you must check (1) and (2) for **all** vectors and scalars; one numerical example only proves non-linearity.",
      ],
      recall: [
        { q: "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A$ of size $4\\times7$. $T$ maps which space into which?", a: "$T:\\mathbb{R}^7\\to\\mathbb{R}^4$." },
        { q: "$T$ is linear, $T(\\mathbf{u}) = (1,2)$, $T(\\mathbf{v}) = (0,-1)$. Find $T(3\\mathbf{u}-2\\mathbf{v})$.", a: "$3(1,2)-2(0,-1) = (3,8)$." },
        { q: "$T$ is linear on $\\mathbb{R}^2$. Is $T^2(\\mathbf{x}) = T(T(\\mathbf{x}))$ linear?", a: "Yes: apply the two rules of $T$ twice." },
      ],
      refs: ["Slides 4.6 Kernel and Range of a Linear Transformation (vsp p27)", "Slides 0B Matrix products as linear combinations (mtx p12)", "PYP AY22/23 S2 Q2(c)(ii)"],
    },
    {
      title: "The standard matrix",
      intuition:
        "Every $\\mathbf{x}$ in $\\mathbb{R}^n$ is $x_1\\mathbf{e}_1+\\dots+x_n\\mathbf{e}_n$, so linearity gives $T(\\mathbf{x}) = x_1T(\\mathbf{e}_1)+\\dots+x_nT(\\mathbf{e}_n)$. Knowing where the standard basis vectors go tells you everything; stacking those images as columns gives the matrix.",
      keyIdeas: [
        "The **standard matrix** of a linear $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is $A = [T(\\mathbf{e}_1)\\ \\cdots\\ T(\\mathbf{e}_n)]$ ($m\\times n$), and $T(\\mathbf{x}) = A\\mathbf{x} = x_1T(\\mathbf{e}_1)+\\dots+x_nT(\\mathbf{e}_n)$ (Tutorial 1 Q9).",
        "From a formula, the coefficients of $x_1, x_2, \\dots$ in each output entry form the rows: $T(x_1,x_2,x_3) = (x_1-2x_3,\\ 3x_2+x_3)$ gives $A = \\begin{bmatrix}1&0&-2\\\\0&3&1\\end{bmatrix}$.",
        "**$T$ given on other vectors** (e.g. $T(1,1)$ and $T(2,-1)$): write $\\mathbf{e}_1$ and $\\mathbf{e}_2$ (or the vector you need) as a linear combination of the given vectors, then apply linearity. The weights are the coordinates $[\\mathbf{x}]_{\\mathcal B}$, found by solving $P_{\\mathcal B}[\\mathbf{x}]_{\\mathcal B} = \\mathbf{x}$.",
        "If $T(\\mathbf{x}) = \\mathbf{0}$ for every $\\mathbf{x}$ in $\\mathbb{R}^n$, every column $T(\\mathbf{e}_i)$ is $\\mathbf{0}$, so the standard matrix is the $n\\times n$ zero matrix (PYP).",
      ],
      formulas: [
        "A = \\big[\\,T(\\mathbf{e}_1)\\ \\ T(\\mathbf{e}_2)\\ \\cdots\\ T(\\mathbf{e}_n)\\,\\big]",
        "\\mathbf{x} = c_1\\mathbf{b}_1+c_2\\mathbf{b}_2 \\;\\Longrightarrow\\; T(\\mathbf{x}) = c_1T(\\mathbf{b}_1)+c_2T(\\mathbf{b}_2)",
      ],
      example: {
        problem:
          "(PYP AY25/26 S2 Q3) $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(1,1) = (1,11)$ and $T(2,-1) = (5,4)$. Find the matrix of $T$ with respect to the standard basis.",
        steps: [
          "Write $\\mathbf{e}_1 = a(1,1)+b(2,-1)$: $a+2b = 1$ and $a-b = 0$, so $a = b = \\tfrac13$.",
          "$T(\\mathbf{e}_1) = \\tfrac13(1,11)+\\tfrac13(5,4) = (2,5)$.",
          "Write $\\mathbf{e}_2 = c(1,1)+d(2,-1)$: $c+2d = 0$ and $c-d = 1$, so $c = \\tfrac23$, $d = -\\tfrac13$. Then $T(\\mathbf{e}_2) = \\tfrac23(1,11)-\\tfrac13(5,4) = (-1,6)$.",
          "$A = [T(\\mathbf{e}_1)\\ T(\\mathbf{e}_2)] = \\begin{bmatrix}2&-1\\\\5&6\\end{bmatrix}$. Check: $A(1,1) = (1,11)$ ✓ and $A(2,-1) = (5,4)$ ✓.",
        ],
        answer: "$A = \\begin{bmatrix}2&-1\\\\5&6\\end{bmatrix}$.",
      },
      pitfalls: [
        "$[T(\\mathbf{b}_1)\\ T(\\mathbf{b}_2)]$ is **not** the standard matrix unless the $\\mathbf{b}$'s are $\\mathbf{e}_1, \\mathbf{e}_2$. It is the most common wrong option.",
        "Images go in as **columns**. The transpose $A^T$ is a classic distractor.",
        "To find $T(\\mathbf{v})$ from $T(\\mathbf{b}_1), T(\\mathbf{b}_2)$, the weights are the coordinates of $\\mathbf{v}$ relative to $\\{\\mathbf{b}_1,\\mathbf{b}_2\\}$, not the entries of $\\mathbf{v}$.",
        "Always check your $A$ against the given data: $A\\mathbf{b}_j$ must equal $T(\\mathbf{b}_j)$.",
      ],
      recall: [
        { q: "$T(\\mathbf{e}_1) = (3,-1)$ and $T(\\mathbf{e}_2) = (2,4)$. Write $T(x_1,x_2)$.", a: "$(3x_1+2x_2,\\ -x_1+4x_2)$." },
        { q: "Size of the standard matrix of $T:\\mathbb{R}^5\\to\\mathbb{R}^2$?", a: "$2\\times5$." },
        { q: "$T(1,1) = (2,0)$ and $T(1,-1) = (0,4)$. Find $T(\\mathbf{e}_1)$.", a: "$\\mathbf{e}_1 = \\tfrac12(1,1)+\\tfrac12(1,-1)$, so $T(\\mathbf{e}_1) = (1,2)$." },
      ],
      visuals: ["matrix-grid"],
      refs: [
        "Tutorial 1 Q9",
        "Slides 0B Matrix products as linear combinations (mtx p12)",
        "Slides 4.10 Coordinate Systems (vsp p44–48)",
        "PYP AY25/26 S2 Q3; AY21/22 S1 Q1(d), Q2(d)(ii); AY23/24 S2 Q1(c)",
      ],
    },
    {
      title: "Rotations, reflections and composite transformations",
      intuition:
        "To find the standard matrix of a geometric map, ask only where $\\mathbf{e}_1$ and $\\mathbf{e}_2$ go and use the two images as columns. Doing one map after another is again a linear map, and its matrix is the product with the map applied **first** on the right, next to $\\mathbf{x}$.",
      keyIdeas: [
        "**Rotation** through $\\theta$ counter-clockwise about the origin: $\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$ (columns are the images of $\\mathbf{e}_1, \\mathbf{e}_2$). A clockwise rotation through $\\theta$ uses the angle $-\\theta$ (Tutorial 1 Q10(a): $-3\\pi/4$ radian, clockwise). Rotation by $90^\\circ$ counter-clockwise is $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$.",
        "**Reflection** through the horizontal $x$-axis: $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$. Reflection through the line $y = x$ (the line $x_1 = x_2$) swaps the coordinates: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$.",
        "$N(\\mathbf{v}) = -\\mathbf{v}$ has matrix $-I$; the **projection** onto the $x$-axis, $(x_1,x_2)\\mapsto(x_1,0)$, has matrix $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$.",
        "**Composite**: if $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ has standard matrix $A$ and $S:\\mathbb{R}^m\\to\\mathbb{R}^p$ has standard matrix $B$, then $S(T(\\mathbf{x})) = B(A\\mathbf{x}) = (BA)\\mathbf{x}$, so the standard matrix of $S(T(\\mathbf{x}))$ is $BA$ (Tutorial 1 Q13).",
        "Matrix multiplication is not commutative, so the order of the steps matters. Two maps **commute** ($S\\circ T = T\\circ S$) exactly when their matrices satisfy $BA = AB$: check by multiplying both ways (PYP).",
      ],
      formulas: [
        "\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}\\ (\\text{counter-clockwise by }\\theta),\\qquad \\text{clockwise: use } -\\theta",
        "S(T(\\mathbf{x})) = B(A\\mathbf{x}) = (BA)\\,\\mathbf{x}",
      ],
      example: {
        problem:
          "(Tutorial 1 Q10(b)) $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first reflects points through the horizontal $x$-axis and then reflects points through the line $y = x$. Find its standard matrix and show that $T$ is a rotation about the origin. Through what angle?",
        steps: [
          "First map: $A_1 = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$. Second map: $A_2 = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$.",
          "The matrix applied first goes on the right: $A_2A_1 = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix} = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$.",
          "Compare with the rotation matrix: $\\cos\\theta = 0$ and $\\sin\\theta = 1$, so $\\theta = \\pi/2$ (counter-clockwise).",
          "Check by following $\\mathbf{e}_1$: $(1,0)\\mapsto(1,0)\\mapsto(0,1)$, which is the first column ✓. The wrong order $A_1A_2 = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ would be a rotation by $\\pi/2$ clockwise.",
        ],
        answer: "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, a rotation through $\\pi/2$ radians.",
      },
      pitfalls: [
        "Writing $AB$ for \"first $A$ then $B$\". The matrix applied first is on the **right**.",
        "Clockwise versus counter-clockwise only flips the signs of the $\\sin$ entries. Check one column against a sketch.",
        "Sizes must chain. With $T:\\mathbb{R}^2\\to\\mathbb{R}^3$ ($3\\times2$) and $S:\\mathbb{R}^3\\to\\mathbb{R}^2$ ($2\\times3$), the standard matrix of $S(T(\\mathbf{x}))$ is $2\\times2$.",
      ],
      recall: [
        { q: "Matrix of rotation by $90^\\circ$ counter-clockwise?", a: "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$." },
        { q: "$A$ is the matrix of $T$ and $B$ that of $S$. Matrix of $T(S(\\mathbf{x}))$?", a: "$AB$ ($S$ acts first)." },
        { q: "$L$ = rotation by $90^\\circ$ counter-clockwise, $M$ = reflection across $x_1 = x_2$. Do $L$ and $M$ commute?", a: "No: $LM = \\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$ but $ML = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$." },
      ],
      visuals: ["geometric-gallery", "composition"],
      refs: ["Tutorial 1 Q10, Q13", "PYP AY20/21 S2 Q1(d); AY22/23 S1 Q1(c); AY23/24 S1 Q2(d)(ii)", "Slides 0B Properties of matrix multiplication"],
    },
    {
      title: "Kernel, range, rank and nullity",
      intuition:
        "The kernel is everything $T$ sends to $\\mathbf{0}$, and the range is everything $T$ can reach. For $T(\\mathbf{x}) = A\\mathbf{x}$ these are exactly the null space and the column space of $A$.",
      keyIdeas: [
        "**Kernel** (or null space) of $T$: the set of all $\\mathbf{u}$ in $V$ with $T(\\mathbf{u}) = \\mathbf{0}$. **Range** of $T$: the set of all vectors in $W$ of the form $T(\\mathbf{x})$. The kernel is a subspace of $V$ and the range is a subspace of $W$.",
        "If $T(\\mathbf{x}) = A\\mathbf{x}$, then kernel $= N(A)$ and range $= C(A)$. So: find the kernel by solving $A\\mathbf{x} = \\mathbf{0}$; a vector $\\mathbf{b}$ is in the range iff $A\\mathbf{x} = \\mathbf{b}$ is consistent.",
        "The dimension of the range of $T$ is called the **rank** of $T$ (PYP); it equals rank of $A = \\dim C(A)$ = number of pivot columns. The dimension of the kernel is the **nullity** of $T$, $\\dim N(A)$ = number of free variables.",
        "**Theorem 4.8 (Rank Theorem)**: if $A$ has $n$ columns, rank of $A + \\dim N(A) = n$. For $T:\\mathbb{R}^n\\to\\mathbb{R}^m$, $n$ is the size of the **input**, never $m$.",
        "Bases: the pivot columns of $A$ itself form a basis for $C(A)$ (Theorem 4.6); the vectors multiplying the free variables in the solution of $A\\mathbf{x} = \\mathbf{0}$ form a basis for $N(A)$.",
        "$N(A) = \\{\\mathbf{0}\\}$ iff $\\mathbf{x}\\mapsto A\\mathbf{x}$ is **one-to-one**; $C(A) = \\mathbb{R}^m$ iff $\\mathbf{x}\\mapsto A\\mathbf{x}$ maps $\\mathbb{R}^n$ **onto** $\\mathbb{R}^m$ (Slides 4.5 table).",
      ],
      formulas: [
        "\\text{kernel of } T = N(A)\\subseteq\\mathbb{R}^n,\\qquad \\text{range of } T = C(A)\\subseteq\\mathbb{R}^m",
        "\\text{rank of } A + \\dim N(A) = n",
      ],
      example: {
        problem:
          "(PYP AY22/23 S2 Q1(b)) Find the rank and the nullity of $T:\\mathbb{R}^3\\to\\mathbb{R}^3$, $T(a,b,c) = (a-b+c,\\ 2a+b-c,\\ -a-2b+2c)$.",
        steps: [
          "$A = \\begin{bmatrix}1&-1&1\\\\2&1&-1\\\\-1&-2&2\\end{bmatrix}$. Do $R_2-2R_1$ to get $(0,3,-3)$ and $R_3+R_1$ to get $(0,-3,3)$, then $R_3+R_2$ to get a zero row.",
          "Echelon form $\\begin{bmatrix}1&-1&1\\\\0&3&-3\\\\0&0&0\\end{bmatrix}$ has pivots in columns 1 and 2. So rank of $T$ = 2.",
          "Kernel: $3b-3c = 0\\Rightarrow b = c$, and $a-b+c = 0\\Rightarrow a = 0$. So the kernel is $\\operatorname{Span}\\{(0,1,1)\\}$ and the nullity is 1. Check: $A(0,1,1) = (0,0,0)$ ✓.",
          "Range: the pivot columns of $A$, $(1,2,-1)$ and $(-1,1,-2)$, form a basis. Rank Theorem check: $2+1 = 3$ ✓.",
        ],
        answer: "Rank 2, nullity 1.",
      },
      pitfalls: [
        "The kernel lives in the input space. For $T:\\mathbb{R}^3\\to\\mathbb{R}^4$, $T(x_1,x_2,x_3) = (x_1,0,x_2,x_2)$, the kernel is $\\operatorname{Span}\\{(0,0,1)\\}\\subset\\mathbb{R}^3$. A vector with 4 entries cannot be in it.",
        "A basis for the range uses the pivot columns of the **original** $A$, not of its echelon form.",
        "Rank Theorem uses $n$ = number of columns: $T:\\mathbb{R}^5\\to\\mathbb{R}^3$ with rank 2 has $\\dim$ kernel $5-2 = 3$, not $3-2 = 1$.",
        "Kernel of the projection onto the $x$-axis: $(x_1,0) = \\mathbf{0}$ iff $x_1 = 0$, so it is the **$y$-axis**, not the $x$-axis.",
        "\"$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution\" only says $\\dim N(A)\\ge1$. For a $3\\times3$ $A$ the kernel could be a line, a plane or all of $\\mathbb{R}^3$, so its shape cannot be determined.",
      ],
      recall: [
        { q: "$T:\\mathbb{R}^7\\to\\mathbb{R}^4$ has rank 4. Dimension of the kernel?", a: "$7-4 = 3$." },
        { q: "Kernel of the projection of $\\mathbb{R}^2$ onto the $x$-axis?", a: "The $y$-axis." },
        { q: "Kernel of $T(x_1,x_2,x_3) = (x_1,0,x_2,x_2)$?", a: "$\\operatorname{Span}\\{(0,0,1)\\}$." },
      ],
      visuals: ["kernel-range"],
      refs: [
        "Slides 4.6 Kernel and Range of a Linear Transformation (vsp p27–28)",
        "Slides 4.5 N(A) vs C(A) table (vsp p26)",
        "Slides 4.9 Theorem 4.6 (vsp p43); 4.14 Rank, Theorem 4.8 (vsp p62–64)",
        "Tutorial 4 Q17",
        "PYP AY25/26 S1 Q3, Q4; AY25/26 S2 Q10; AY22/23 S2 Q1(b); AY23/24 S2 Q2(c)(v)",
      ],
    },
    {
      title: "Invertible linear transformations",
      intuition:
        "If multiplication by $A$ sends $\\mathbf{x}$ to $A\\mathbf{x}$ and $A$ is invertible, multiplication by $A^{-1}$ brings $A\\mathbf{x}$ back to $\\mathbf{x}$.",
      keyIdeas: [
        "For an invertible $n\\times n$ matrix $A$, $T(\\mathbf{x}) = A\\mathbf{x}$ is undone by $T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y}$: $A^{-1}$ transforms $A\\mathbf{x}$ back to $\\mathbf{x}$.",
        "For $2\\times2$: $A = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ is invertible iff $ad-bc\\ne0$, and $A^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$.",
        "By the Invertible Matrix Theorem (Theorems 2.4 and 4.9), for square $A$ these are equivalent: $A$ invertible; $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution; $N(A) = \\{\\mathbf{0}\\}$; $C(A) = \\mathbb{R}^n$; rank of $A = n$.",
        "**$T^{-1}$ is linear** (PYP): if $T:V\\to W$ is an invertible linear transformation, let $\\mathbf{u} = T^{-1}(\\mathbf{x})$ and $\\mathbf{v} = T^{-1}(\\mathbf{y})$. Then $T(\\mathbf{u}+\\mathbf{v}) = \\mathbf{x}+\\mathbf{y}$, so $T^{-1}(\\mathbf{x}+\\mathbf{y}) = \\mathbf{u}+\\mathbf{v}$; and $T(c\\mathbf{u}) = c\\mathbf{x}$, so $T^{-1}(c\\mathbf{x}) = c\\mathbf{u}$.",
      ],
      formulas: [
        "T(\\mathbf{x}) = A\\mathbf{x} \\;\\Longrightarrow\\; T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y}",
        "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}",
      ],
      example: {
        problem: "Show that $T(x_1,x_2) = (3x_1+2x_2,\\ x_1+x_2)$ is invertible and find $T^{-1}$.",
        steps: [
          "$A = \\begin{bmatrix}3&2\\\\1&1\\end{bmatrix}$ has $ad-bc = 3-2 = 1\\ne0$, so $A$ is invertible.",
          "$A^{-1} = \\dfrac11\\begin{bmatrix}1&-2\\\\-1&3\\end{bmatrix}$, so $T^{-1}(y_1,y_2) = (y_1-2y_2,\\ -y_1+3y_2)$.",
          "Check: $T(T^{-1}(\\mathbf{y}))$ has first entry $3(y_1-2y_2)+2(-y_1+3y_2) = y_1$ and second entry $(y_1-2y_2)+(-y_1+3y_2) = y_2$ ✓.",
        ],
        answer: "$T^{-1}(y_1,y_2) = (y_1-2y_2,\\ -y_1+3y_2)$.",
      },
      pitfalls: [
        "In $A^{-1}$ the diagonal entries **swap** and the off-diagonal entries change **sign**; mixing these up is the usual slip.",
        "The inverse of \"first $A$, then $B$\" (matrix $BA$) is $(BA)^{-1} = A^{-1}B^{-1}$: undo the last step first.",
      ],
      recall: [
        { q: "Inverse of the reflection through $y = x$?", a: "Itself: $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}^2 = I$." },
        { q: "$T:\\mathbb{R}^4\\to\\mathbb{R}^4$ has a standard matrix of rank 4. Is $T$ invertible?", a: "Yes (IMT: rank $n$ ⟺ invertible)." },
        { q: "$T:V\\to W$ is linear and invertible. Is $T^{-1}$ linear?", a: "Yes (PYP AY23/24 S1 Q1(c))." },
      ],
      refs: [
        "Slides 2.2 Invertible Linear Transformations (alg p12); Theorem 2.4 (alg p10)",
        "Slides 4.14 Theorem 4.9 (vsp p66)",
        "Slides 0B Inverse of a matrix (mtx p13)",
        "PYP AY23/24 S1 Q1(c)",
      ],
    },
    {
      title: "Area and volume under a linear transformation",
      intuition:
        "A matrix transformation sends the parallelogram built on $\\mathbf{b}_1, \\mathbf{b}_2$ to the parallelogram built on $A\\mathbf{b}_1, A\\mathbf{b}_2$, whose area is $abs(|AB|) = abs(|A|)\\,abs(|B|)$.",
      keyIdeas: [
        "**Theorem 3.2.** If $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is determined by a $2\\times2$ matrix $A$ and $S$ is a parallelogram, then area of $T(S) = abs(|A|)\\times$ area of $S$. If $T$ is determined by a $3\\times3$ matrix $A$ and $S$ is a parallelepiped, then volume of $T(S) = abs(|A|)\\times$ volume of $S$.",
        "The parallelepiped with one vertex at the origin and adjacent vertices $\\mathbf{b}_1, \\mathbf{b}_2, \\mathbf{b}_3$ has volume $abs(|B|)$ with $B = [\\mathbf{b}_1\\ \\mathbf{b}_2\\ \\mathbf{b}_3]$.",
        "Translation does not affect area, so the theorem holds for any parallelogram $\\mathbf{p}+S$, and it is applicable for arbitrary shapes too (e.g. the unit disc maps to an ellipse of area $\\pi ab$).",
      ],
      formulas: ["\\text{volume of } T(S) = abs(|A|)\\times\\text{volume of } S"],
      example: {
        problem:
          "(PYP AY25/26 S2 Q4) $T:\\mathbb{R}^3\\to\\mathbb{R}^3$ has standard matrix $A = \\begin{bmatrix}0&1&2\\\\3&5&-1\\\\0&0&4\\end{bmatrix}$. $S$ is the unit cube. What is the volume of $T(S)$?",
        steps: [
          "The unit cube is built on $\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3$, so its volume is $|I| = 1$.",
          "Expand $|A|$ along the third row: $|A| = 4\\begin{vmatrix}0&1\\\\3&5\\end{vmatrix} = 4(0-3) = -12$.",
          "Volume of $T(S) = abs(-12)\\times1 = 12$.",
        ],
        answer: "12",
      },
      pitfalls: [
        "Use the **absolute value** of the determinant; a volume is never negative.",
        "Volume before the transformation is $abs(|B|)$; after it is $abs(|A|)\\,abs(|B|)$, not $abs(|A|)$ alone unless $S$ has volume 1.",
      ],
      recall: [
        { q: "$|A| = -3$ ($2\\times2$). Area of the image of a parallelogram of area 5?", a: "$3\\times5 = 15$." },
        { q: "Volume of the image of the unit cube under $A$?", a: "$abs(|A|)$." },
      ],
      refs: ["Slides 3.3 Linear Transformations, Theorem 3.2 (det p17–20)", "Tutorial 3 Q4", "PYP AY25/26 S2 Q4; AY20/21 S2 Q2(c)"],
    },
    {
      title: "Linear transformations on $P_n$ and $M_{2\\times2}$",
      intuition:
        "The definition of a linear transformation works between any vector spaces. Writing each polynomial or matrix in coordinates turns $T$ into an ordinary matrix acting on coordinate vectors.",
      keyIdeas: [
        "Standard bases: $P_n$ has $\\{1, t, \\dots, t^n\\}$, so $\\dim P_n = n+1$ (e.g. $\\dim P_2 = 3$); $M_{2\\times2}$ has the four matrices with a single entry 1, so $\\dim M_{2\\times2} = 4$.",
        "The coordinate mapping $\\mathbf{x}\\mapsto[\\mathbf{x}]_{\\mathcal B}$ is a one-to-one linear transformation: $[c_1\\mathbf{u}_1+\\dots+c_p\\mathbf{u}_p]_{\\mathcal B} = c_1[\\mathbf{u}_1]_{\\mathcal B}+\\dots+c_p[\\mathbf{u}_p]_{\\mathcal B}$.",
        "**Matrix of $T$ relative to the bases**: apply $T$ to each basis vector of $V$, write the result in coordinates of the basis of $W$, and use these coordinate vectors as the **columns** (PYP). The matrix is $(\\dim W)\\times(\\dim V)$.",
        "Kernel and range of $T$ then come from the null space and column space of that matrix (translated back into polynomials or matrices), and the Rank Theorem applies to the matrix.",
        "**Differentiation** on $P_3$ with basis $\\{1,t,t^2,t^3\\}$: $D(1) = 0$, $D(t) = 1$, $D(t^2) = 2t$, $D(t^3) = 3t^2$, so the matrix has $1, 2, 3$ just above the diagonal.",
      ],
      formulas: [
        "M = \\big[\\,[T(\\mathbf{b}_1)]_{\\mathcal C}\\ \\cdots\\ [T(\\mathbf{b}_n)]_{\\mathcal C}\\,\\big]",
      ],
      example: {
        problem:
          "(PYP AY24/25 S2 Q4) $T:P_1\\to P_3$, $T(f)(x) = (x^2-2)f(x)$, with bases $\\{1,x\\}$ and $\\{1,x,x^2,x^3\\}$. Find the matrix representation of $T$.",
        steps: [
          "$T(1) = -2+x^2$, with coordinates $(-2,0,1,0)$.",
          "$T(x) = -2x+x^3$, with coordinates $(0,-2,0,1)$.",
          "These coordinate vectors are the **columns**: $\\begin{bmatrix}-2&0\\\\0&-2\\\\1&0\\\\0&1\\end{bmatrix}$, a $4\\times2$ matrix.",
          "Its two columns are independent, so its null space is $\\{\\mathbf{0}\\}$: only $f = 0$ is sent to $0$.",
        ],
        answer: "The $4\\times2$ matrix $\\begin{bmatrix}-2&0\\\\0&-2\\\\1&0\\\\0&1\\end{bmatrix}$.",
      },
      pitfalls: [
        "Coordinates go in as **columns**. The matrix is $(\\dim W)\\times(\\dim V)$: $4\\times2$ above, not $2\\times4$.",
        "$\\dim P_n = n+1$, not $n$, and $\\dim M_{2\\times2} = 4$.",
        "The kernel of $L(A) = A+A^T$ on $M_{2\\times2}$ is not $\\{0\\}$: every skew-symmetric matrix ($A^T = -A$), e.g. $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$, maps to $0$.",
        "Keep the basis order. Listing $\\{t^2,t,1\\}$ instead of $\\{1,t,t^2\\}$ reverses the rows and columns.",
      ],
      recall: [
        { q: "Matrix of $D(p) = p'$ on $P_2$ relative to $\\{1,t,t^2\\}$?", a: "$\\begin{bmatrix}0&1&0\\\\0&0&2\\\\0&0&0\\end{bmatrix}$." },
        { q: "Dimensions of the kernel and range of $L(A) = A+A^T$ on $M_{2\\times2}$?", a: "1 and 3." },
        { q: "$\\dim P_4$?", a: "5." },
      ],
      refs: [
        "Slides 4.6 (vsp p27): linear transformation between vector spaces",
        "Slides 4.10 Coordinate Systems (vsp p44–49); 4.11 Dimension (vsp p50)",
        "Tutorial 3 Q3 (skew-symmetric)",
        "PYP AY25/26 S1 Q6; AY24/25 S2 Q4; AY20/21 S2 Q2(d); AY23/24 S1 Q2(b)",
      ],
    },
  ],
  playbook: [
    "If you see $T(\\mathbf{e}_1), T(\\mathbf{e}_2), \\dots$ → those are the columns of $A$, and $T(\\mathbf{x}) = x_1T(\\mathbf{e}_1)+\\dots$.",
    "If you see $T$ given on vectors other than $\\mathbf{e}_i$ (e.g. $T(1,1)$, $T(2,-1)$) → write each $\\mathbf{e}_i$ (or the target vector) as a combination of them and use linearity. Check $A\\mathbf{b}_j = T(\\mathbf{b}_j)$.",
    "If you see a rotation → $\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$ with $\\theta<0$ for clockwise. Check $\\mathbf{e}_1$'s image against a sketch.",
    "If you see a reflection → find the images of $\\mathbf{e}_1, \\mathbf{e}_2$ ($x$-axis negates $x_2$, $y = x$ swaps coordinates).",
    "If you see \"first … then …\" → multiply right to left: first $A$, then $B$ gives $BA$. Distractors use $AB$.",
    "If you see \"which pairs commute?\" → compute both products and compare.",
    "If you see \"kernel of $T$\" → solve $A\\mathbf{x} = \\mathbf{0}$. The answer lives in the input space $\\mathbb{R}^n$ (count entries!).",
    "If you see rank / dimension of kernel → rank of $A + \\dim N(A) = n$ (number of columns).",
    "If you see \"is $\\mathbf{b}$ in the range?\" → is $A\\mathbf{x} = \\mathbf{b}$ consistent?",
    "If you see $T^{-1}$ → $T^{-1}(\\mathbf{y}) = A^{-1}\\mathbf{y}$; for $2\\times2$ use $\\frac1{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$.",
    "If you see the volume (area) of an image → $abs(|A|)\\times$ the original volume (area).",
    "If you see $T$ on $P_n$ or $M_{2\\times2}$ → apply $T$ to each basis element, write the results in coordinates, and use those as **columns**. Then rank and kernel work exactly as in $\\mathbb{R}^k$.",
  ],
};
