import type { Lesson } from "@/lib/types";

export const transformationsLesson: Lesson = {
  topic: "transformations",
  bigPicture:
    "A linear transformation is a function between vector spaces that respects addition and scaling. That one rule has big consequences: $T$ is completely fixed by what it does to a basis, so every linear $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is just $\\mathbf{x}\\mapsto A\\mathbf{x}$ for a **standard matrix** $A = [T(\\mathbf{e}_1)\\ \\cdots\\ T(\\mathbf{e}_n)]$. Geometry becomes algebra (rotations, reflections, shears and projections are $2\\times2$ matrices), doing one map after another becomes a matrix product (in reverse order: \"first $T$ then $S$\" is $BA$), and the questions \"what gets crushed to $\\mathbf{0}$?\" and \"what can be reached?\" become the kernel $N(A)$ and range $C(A)$, tied together by rank–nullity. One-to-one means a pivot in every column, onto means a pivot in every row, and for square matrices both mean invertible. The same ideas carry over unchanged to maps on $P_n$ and $M_{2\\times2}$ once you use coordinates.",
  sections: [
    {
      title: "What makes a transformation linear",
      intuition:
        "A transformation assigns each input vector an output vector. It is **linear** when it respects the two vector operations: adding (or scaling) and then mapping gives the same result as mapping and then adding (or scaling). Geometrically, grid lines stay straight, parallel and evenly spaced, and the origin stays put.",
      keyIdeas: [
        "$T:\\mathbb{R}^n\\to\\mathbb{R}^m$ assigns to each $\\mathbf{x}$ in the **domain** $\\mathbb{R}^n$ an **image** $T(\\mathbf{x})$ in the **codomain** $\\mathbb{R}^m$. The **range** is the set of all images. It sits inside the codomain and can be strictly smaller.",
        "$T$ is **linear** iff (i) $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v})$ and (ii) $T(c\\mathbf{u}) = cT(\\mathbf{u})$ for all $\\mathbf{u},\\mathbf{v}$ and scalars $c$. Both rules together are the single **superposition** test $T(c\\mathbf{u}+d\\mathbf{v}) = cT(\\mathbf{u})+dT(\\mathbf{v})$.",
        "Consequences: $T(\\mathbf{0}) = \\mathbf{0}$, $T(-\\mathbf{u}) = -T(\\mathbf{u})$ and $T(c_1\\mathbf{v}_1+\\dots+c_p\\mathbf{v}_p) = c_1T(\\mathbf{v}_1)+\\dots+c_pT(\\mathbf{v}_p)$. So $T$ is fixed by its values on a basis.",
        "**Quick rejection**: if $T(\\mathbf{0})\\ne\\mathbf{0}$ then $T$ is not linear (e.g. a translation $\\mathbf{x}\\mapsto\\mathbf{x}+\\mathbf{b}$, $\\mathbf{b}\\ne\\mathbf{0}$). The converse fails: $x_1x_2$, $x_1^2$ and $|x_1|$ all send $\\mathbf{0}$ to $0$ but are not linear.",
        "Every **matrix transformation** $T(\\mathbf{x}) = A\\mathbf{x}$ is linear, since $A(\\mathbf{u}+\\mathbf{v}) = A\\mathbf{u}+A\\mathbf{v}$ and $A(c\\mathbf{u}) = cA\\mathbf{u}$. If $A$ is $m\\times n$, then $T:\\mathbb{R}^n\\to\\mathbb{R}^m$: the domain has the size of the number of **columns**, the codomain of the number of **rows**.",
        "Compositions, sums and scalar multiples of linear maps are linear. In particular $T^2 = T\\circ T$ is linear whenever $T$ is.",
      ],
      formulas: [
        "T(c\\mathbf{u}+d\\mathbf{v}) = c\\,T(\\mathbf{u}) + d\\,T(\\mathbf{v})",
        "A \\text{ is } m\\times n \\;\\Longrightarrow\\; T:\\mathbb{R}^n\\to\\mathbb{R}^m,\\quad \\mathbf{x}\\mapsto A\\mathbf{x}",
      ],
      example: {
        problem:
          "Which of these are linear? $T_1(x_1,x_2) = (2x_1-x_2,\\ x_1+3x_2,\\ 0)$, $T_2(x_1,x_2) = (x_1+1,\\ x_2)$, $T_3(x_1,x_2) = (x_1x_2,\\ x_1)$.",
        steps: [
          "$T_1$: every output entry is a combination of $x_1, x_2$ with no constant term, so $T_1(\\mathbf{x}) = A\\mathbf{x}$ with $A = \\begin{bmatrix}2&-1\\\\1&3\\\\0&0\\end{bmatrix}$. It is linear, $\\mathbb{R}^2\\to\\mathbb{R}^3$.",
          "$T_2$: $T_2(0,0) = (1,0)\\ne\\mathbf{0}$, so it fails at once. Not linear.",
          "$T_3$: $T_3(0,0) = (0,0)$, so the zero test says nothing. Test scaling with $\\mathbf{u} = (1,1)$, $c = 2$: $T_3(2,2) = (4,2)$ but $2T_3(1,1) = 2(1,1) = (2,2)$.",
          "Rule (ii) fails, so $T_3$ is not linear.",
        ],
        answer: "Only $T_1$ is linear.",
      },
      pitfalls: [
        "$T(\\mathbf{0}) = \\mathbf{0}$ is **necessary, not sufficient**. $T_3$ above passes it and is still not linear.",
        "\"Linear\" here is not \"its graph is a straight line\": $f(x) = 2x+3$ is **not** a linear transformation of $\\mathbb{R}$ because $f(0) = 3$.",
        "A $3\\times5$ matrix gives $T:\\mathbb{R}^5\\to\\mathbb{R}^3$, not $\\mathbb{R}^3\\to\\mathbb{R}^5$. Columns give the domain.",
        "\"Codomain\" and \"range\" are different. MCQs like to offer \"the range of $T$ is $\\mathbb{R}^m$\" when only the codomain is.",
      ],
      recall: [
        { q: "$T(\\mathbf{x}) = A\\mathbf{x}$ with $A$ of size $4\\times7$. Domain and codomain?", a: "Domain $\\mathbb{R}^7$, codomain $\\mathbb{R}^4$." },
        { q: "Is $T(\\mathbf{x}) = \\mathbf{x} + (1,0)$ linear on $\\mathbb{R}^2$?", a: "No: $T(\\mathbf{0}) = (1,0)\\ne\\mathbf{0}$." },
        { q: "$T$ is linear, $T(\\mathbf{u}) = (1,2)$, $T(\\mathbf{v}) = (0,-1)$. Find $T(3\\mathbf{u}-2\\mathbf{v})$.", a: "$3(1,2)-2(0,-1) = (3,8)$." },
      ],
    },
    {
      title: "The standard matrix",
      intuition:
        "Every $\\mathbf{x}$ is $x_1\\mathbf{e}_1+\\dots+x_n\\mathbf{e}_n$, so linearity forces $T(\\mathbf{x}) = x_1T(\\mathbf{e}_1)+\\dots+x_nT(\\mathbf{e}_n)$. Knowing where the $n$ standard basis vectors land tells you everything. Stack those images as columns and you have the matrix.",
      keyIdeas: [
        "Every linear $T:\\mathbb{R}^n\\to\\mathbb{R}^m$ is a matrix transformation $T(\\mathbf{x}) = A\\mathbf{x}$ with the unique **standard matrix** $A = [T(\\mathbf{e}_1)\\ \\cdots\\ T(\\mathbf{e}_n)]$ (size $m\\times n$).",
        "From a formula, the coefficients of $x_1, x_2, \\dots$ in each output entry form the rows: $T(x_1,x_2,x_3) = (x_1-2x_3,\\ 3x_2+x_3)$ gives $A = \\begin{bmatrix}1&0&-2\\\\0&3&1\\end{bmatrix}$.",
        "$A\\mathbf{x} = x_1\\mathbf{a}_1+\\dots+x_n\\mathbf{a}_n$: the image is a combination of the **columns**, weighted by the entries of $\\mathbf{x}$.",
        "**$T$ given on a non-standard basis** $\\{\\mathbf{b}_1,\\dots,\\mathbf{b}_n\\}$: either (a) write each $\\mathbf{e}_i$ (or the target vector) as a combination of the $\\mathbf{b}_j$ and use linearity, or (b) use $A[\\mathbf{b}_1\\ \\cdots\\ \\mathbf{b}_n] = [T(\\mathbf{b}_1)\\ \\cdots\\ T(\\mathbf{b}_n)]$ and solve for $A$.",
        "Two linear maps that agree on a basis are equal. If $T(\\mathbf{x}) = \\mathbf{0}$ for every $\\mathbf{x}$, its standard matrix is the zero matrix.",
      ],
      formulas: [
        "A = \\big[\\,T(\\mathbf{e}_1)\\ \\ T(\\mathbf{e}_2)\\ \\cdots\\ T(\\mathbf{e}_n)\\,\\big]",
        "A = \\big[\\,T(\\mathbf{b}_1)\\ \\cdots\\ T(\\mathbf{b}_n)\\,\\big]\\,\\big[\\,\\mathbf{b}_1\\ \\cdots\\ \\mathbf{b}_n\\,\\big]^{-1}",
      ],
      example: {
        problem:
          "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is linear with $T(1,2) = (4,1)$ and $T(1,-1) = (1,-2)$. Find the standard matrix of $T$ and $T(3,0)$.",
        steps: [
          "Write $\\mathbf{e}_1 = c_1(1,2)+c_2(1,-1)$: $c_1+c_2 = 1$, $2c_1-c_2 = 0$, so $c_1 = \\tfrac13$, $c_2 = \\tfrac23$.",
          "$T(\\mathbf{e}_1) = \\tfrac13(4,1)+\\tfrac23(1,-2) = (\\tfrac43+\\tfrac23,\\ \\tfrac13-\\tfrac43) = (2,-1)$.",
          "Write $\\mathbf{e}_2 = d_1(1,2)+d_2(1,-1)$: $d_1+d_2 = 0$, $2d_1-d_2 = 1$, so $d_1 = \\tfrac13$, $d_2 = -\\tfrac13$. Then $T(\\mathbf{e}_2) = \\tfrac13(4,1)-\\tfrac13(1,-2) = (1,1)$.",
          "$A = \\begin{bmatrix}2&1\\\\-1&1\\end{bmatrix}$. Check: $A(1,2) = (4,1)$ ✓ and $A(1,-1) = (1,-2)$ ✓.",
          "$T(3,0) = 3T(\\mathbf{e}_1) = (6,-3)$.",
        ],
        answer: "$A = \\begin{bmatrix}2&1\\\\-1&1\\end{bmatrix}$ and $T(3,0) = (6,-3)$.",
      },
      pitfalls: [
        "$[T(\\mathbf{b}_1)\\ T(\\mathbf{b}_2)]$ is **not** the standard matrix unless the $\\mathbf{b}$'s are $\\mathbf{e}_1, \\mathbf{e}_2$. It is the most common wrong option.",
        "Images go in as **columns**. The transpose $A^T$ is a classic distractor.",
        "In $A = YB^{-1}$ (with $Y = [T(\\mathbf{b}_j)]$, $B = [\\mathbf{b}_j]$) the inverse multiplies on the **right**. $B^{-1}Y$ is wrong.",
        "Always check your $A$ against the given data: $A\\mathbf{b}_j$ must equal $T(\\mathbf{b}_j)$.",
      ],
      recall: [
        { q: "$T(\\mathbf{e}_1) = (3,-1)$ and $T(\\mathbf{e}_2) = (2,4)$. Write $T(x_1,x_2)$.", a: "$(3x_1+2x_2,\\ -x_1+4x_2)$." },
        { q: "Size of the standard matrix of $T:\\mathbb{R}^5\\to\\mathbb{R}^2$?", a: "$2\\times5$." },
        { q: "$T(1,1) = (2,0)$ and $T(1,-1) = (0,4)$. Find $T(\\mathbf{e}_1)$.", a: "$\\mathbf{e}_1 = \\tfrac12(1,1)+\\tfrac12(1,-1)$, so $T(\\mathbf{e}_1) = (1,2)$." },
      ],
      visuals: ["matrix-grid"],
    },
    {
      title: "Geometric transformations of $\\mathbb{R}^2$",
      intuition:
        "Many standard matrices are pictures. To build one, ask only where $\\mathbf{e}_1$ and $\\mathbf{e}_2$ go: sketch the unit square, move its two edges, and read the new edges off as the columns.",
      keyIdeas: [
        "**Rotation** counter-clockwise by $\\theta$: $\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$. **Clockwise** by $\\theta$ is rotation by $-\\theta$: $\\begin{bmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{bmatrix}$ (the transpose).",
        "**Reflections**: across the $x_1$-axis $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$; across the $x_2$-axis $\\begin{bmatrix}-1&0\\\\0&1\\end{bmatrix}$; across $y = x$ $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ (swap coordinates); across $y = -x$ $\\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$; through the origin $-I$ (= rotation by $\\pi$).",
        "**Projections**: onto the $x_1$-axis $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, onto the $x_2$-axis $\\begin{bmatrix}0&0\\\\0&1\\end{bmatrix}$. They squash a whole line to a point, so they are not one-to-one, not onto and not invertible.",
        "**Shears**: horizontal $\\begin{bmatrix}1&k\\\\0&1\\end{bmatrix}$ ($x_1\\mapsto x_1+kx_2$, so $\\mathbf{e}_2$ tilts and $\\mathbf{e}_1$ stays); vertical $\\begin{bmatrix}1&0\\\\k&1\\end{bmatrix}$.",
        "**Contraction** ($0<k<1$) and **dilation** ($k>1$): $kI$. A stretch in one direction only: $\\begin{bmatrix}k&0\\\\0&1\\end{bmatrix}$.",
        "Reflection across the line through $\\mathbf{0}$ at angle $\\alpha$: $\\begin{bmatrix}\\cos2\\alpha&\\sin2\\alpha\\\\\\sin2\\alpha&-\\cos2\\alpha\\end{bmatrix}$. With $\\alpha = 0$ this is the $x_1$-axis reflection, and with $\\alpha = \\pi/4$ it is the $y = x$ reflection.",
      ],
      formulas: [
        "R_\\theta = \\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix} \\ (\\text{CCW}),\\qquad R_{-\\theta} = R_\\theta^T \\ (\\text{clockwise})",
        "\\text{Ref}_\\alpha = \\begin{bmatrix}\\cos2\\alpha&\\sin2\\alpha\\\\\\sin2\\alpha&-\\cos2\\alpha\\end{bmatrix}",
      ],
      example: {
        problem: "Find the standard matrix of the transformation that rotates points $2\\pi/3$ radians **clockwise**, and the image of $(2,0)$.",
        steps: [
          "Clockwise by $2\\pi/3$ means $\\theta = -2\\pi/3$: $\\cos\\theta = -\\tfrac12$ and $\\sin\\theta = -\\tfrac{\\sqrt3}{2}$.",
          "$A = \\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix} = \\begin{bmatrix}-1/2&\\sqrt3/2\\\\-\\sqrt3/2&-1/2\\end{bmatrix}$.",
          "Sanity check with a sketch: $\\mathbf{e}_1$ goes to $(-\\tfrac12,-\\tfrac{\\sqrt3}2)$, which is $120^\\circ$ below the positive $x_1$-axis (third quadrant), as a clockwise turn should give.",
          "$T(2,0) = 2\\times(\\text{column }1) = (-1,-\\sqrt3)$.",
        ],
        answer: "$A = \\begin{bmatrix}-1/2&\\sqrt3/2\\\\-\\sqrt3/2&-1/2\\end{bmatrix}$ and $T(2,0) = (-1,-\\sqrt3)$.",
      },
      pitfalls: [
        "Clockwise versus counter-clockwise only flips the signs of the $\\sin$ entries. Check one column against a sketch.",
        "Reflection across $y = -x$ sends $(1,0)$ to $(0,-1)$, not $(0,1)$.",
        "Projection onto the $x_1$-axis kills the $x_2$-component. Its **kernel is the $x_2$-axis** and its range is the $x_1$-axis, not the other way round.",
        "\"Reflection through the origin\" is $-I$, which is rotation by $\\pi$, not a reflection across an axis.",
      ],
      recall: [
        { q: "Matrix of rotation by $90^\\circ$ counter-clockwise?", a: "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$." },
        { q: "Matrix of reflection across $y = -x$?", a: "$\\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$." },
        { q: "Inverse of the shear $\\begin{bmatrix}1&k\\\\0&1\\end{bmatrix}$?", a: "$\\begin{bmatrix}1&-k\\\\0&1\\end{bmatrix}$: shear back." },
      ],
      visuals: ["geometric-gallery"],
    },
    {
      title: "Composition: first $T$, then $S$",
      intuition:
        "Doing $T$ and then $S$ is again one linear map, $S\\circ T$. Since $S(T(\\mathbf{x})) = B(A\\mathbf{x}) = (BA)\\mathbf{x}$, the matrix of the composite lists the steps in **reverse** order: the map applied first sits next to $\\mathbf{x}$, on the right.",
      keyIdeas: [
        "$T:\\mathbb{R}^n\\to\\mathbb{R}^m$ (matrix $A$, $m\\times n$) and $S:\\mathbb{R}^m\\to\\mathbb{R}^p$ (matrix $B$, $p\\times m$) give $S\\circ T:\\mathbb{R}^n\\to\\mathbb{R}^p$ with standard matrix $BA$ ($p\\times n$).",
        "\"First $A$, then $B$, then $C$\" has matrix $CBA$. Read right to left.",
        "Matrix multiplication does not commute, so the order matters: rotating by $90^\\circ$ then reflecting is not the same as reflecting then rotating.",
        "Pairs that **do** commute: any two rotations ($R_\\alpha R_\\beta = R_{\\alpha+\\beta}$); $kI$ (including $-I$) with anything; two diagonal matrices, such as an axis reflection and an axis projection.",
        "Two reflections give a rotation: reflect across the line at angle $\\alpha$, then across the line at angle $\\beta$, and you get rotation by $2(\\beta-\\alpha)$. A rotation combined with a reflection is a reflection.",
        "$T^2 = T\\circ T$ has matrix $A^2$ and $T^k$ has matrix $A^k$. A composite of linear maps is linear.",
      ],
      formulas: [
        "(S\\circ T)(\\mathbf{x}) = S(T(\\mathbf{x})) = B(A\\mathbf{x}) = (BA)\\,\\mathbf{x}",
        "R_\\alpha R_\\beta = R_{\\alpha+\\beta},\\qquad \\text{Ref}_\\beta\\,\\text{Ref}_\\alpha = R_{2(\\beta-\\alpha)}",
      ],
      example: {
        problem:
          "$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ first reflects points through the horizontal $x_1$-axis and then reflects through the line $y = x$. Find its standard matrix and show that $T$ is a rotation. Through what angle?",
        steps: [
          "First map: $A_1 = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$. Second map: $A_2 = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$.",
          "The matrix applied first goes on the right: $A_2A_1 = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix} = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$.",
          "Match with $R_\\theta$: $\\cos\\theta = 0$ and $\\sin\\theta = 1$, so $\\theta = \\pi/2$ (counter-clockwise).",
          "Check with the two-reflection rule: $\\alpha = 0$, $\\beta = \\pi/4$, so the rotation is by $2(\\pi/4-0) = \\pi/2$ ✓. The wrong order $A_1A_2 = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ would be rotation by $-\\pi/2$.",
        ],
        answer: "$\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, a rotation by $\\pi/2$ counter-clockwise.",
      },
      pitfalls: [
        "Writing $AB$ for \"first $A$ then $B$\". The matrix applied first is on the **right**.",
        "In $S\\circ T$ the map $T$ acts first even though $S$ is written first.",
        "Sizes must chain. With $T:\\mathbb{R}^2\\to\\mathbb{R}^3$ ($3\\times2$) and $S:\\mathbb{R}^3\\to\\mathbb{R}^2$ ($2\\times3$), $S\\circ T$ is $2\\times2$ and $T\\circ S$ is $3\\times3$. They cannot be equal.",
      ],
      recall: [
        { q: "Matrix of \"rotate by $\\theta$, then rotate by $\\varphi$\"?", a: "$R_\\varphi R_\\theta = R_{\\theta+\\varphi}$. Rotations commute." },
        { q: "$A$ is the matrix of $T$ and $B$ that of $S$. Matrix of $T\\circ S$?", a: "$AB$ ($S$ acts first)." },
        { q: "Do the reflection across the $x_1$-axis ($M$) and rotation by $90^\\circ$ ($R$) commute?", a: "No: $RM = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ but $MR = \\begin{bmatrix}0&-1\\\\-1&0\\end{bmatrix}$." },
      ],
      visuals: ["composition"],
    },
    {
      title: "Kernel, range, rank and nullity",
      intuition:
        "The kernel is everything $T$ crushes to $\\mathbf{0}$, and the range is everything $T$ can reach. Rank–nullity is a conservation law: every dimension lost into the kernel is missing from the range.",
      keyIdeas: [
        "$\\ker T = \\{\\mathbf{x}: T(\\mathbf{x}) = \\mathbf{0}\\} = N(A)$ is a subspace of the **domain** $\\mathbb{R}^n$. $\\operatorname{range}T = \\{T(\\mathbf{x})\\} = C(A)$ is a subspace of the **codomain** $\\mathbb{R}^m$.",
        "To find $\\ker T$, solve $A\\mathbf{x} = \\mathbf{0}$ (RREF, free variables). To test whether $\\mathbf{b}\\in\\operatorname{range}T$, ask whether $A\\mathbf{x} = \\mathbf{b}$ is consistent.",
        "$\\operatorname{rank}T = \\dim\\operatorname{range}T = $ number of pivots. $\\operatorname{nullity}T = \\dim\\ker T = $ number of free variables.",
        "**Rank–nullity**: $\\operatorname{rank}T+\\operatorname{nullity}T = n$, the dimension of the **domain** (number of columns), never $m$.",
        "Basis of the range: the **pivot columns of $A$ itself** (not of the RREF). Basis of the kernel: the vectors multiplying the free parameters in the solution of $A\\mathbf{x} = \\mathbf{0}$.",
        "$T(\\mathbf{u}) = T(\\mathbf{v}) \\iff \\mathbf{u}-\\mathbf{v}\\in\\ker T$. So the solution set of $T(\\mathbf{x}) = \\mathbf{b}$, if nonempty, is $\\mathbf{p}+\\ker T$.",
      ],
      formulas: [
        "\\ker T = N(A)\\subseteq\\mathbb{R}^n,\\qquad \\operatorname{range}T = C(A)\\subseteq\\mathbb{R}^m",
        "\\operatorname{rank}T + \\operatorname{nullity}T = n = \\dim(\\text{domain})",
      ],
      example: {
        problem:
          "Find the rank and nullity of $T(a,b,c) = (a-b+c,\\ 2a+b-c,\\ -a-2b+2c)$, with a basis for $\\ker T$ and for $\\operatorname{range}T$.",
        steps: [
          "$A = \\begin{bmatrix}1&-1&1\\\\2&1&-1\\\\-1&-2&2\\end{bmatrix}$. Do $R_2-2R_1$ to get $(0,3,-3)$ and $R_3+R_1$ to get $(0,-3,3)$, then $R_3+R_2$ to get a zero row.",
          "Echelon form $\\begin{bmatrix}1&-1&1\\\\0&3&-3\\\\0&0&0\\end{bmatrix}$ has pivots in columns 1 and 2. So $\\operatorname{rank}T = 2$ and $\\operatorname{nullity}T = 3-2 = 1$.",
          "Kernel: $3b-3c = 0\\Rightarrow b = c$, and $a-b+c = 0\\Rightarrow a = 0$. So $\\ker T = \\operatorname{Span}\\{(0,1,1)\\}$. Check: $A(0,1,1) = (0,0,0)$ ✓.",
          "Range: the pivot columns of $A$, $(1,2,-1)$ and $(-1,1,-2)$. This is a plane through $\\mathbf{0}$ in $\\mathbb{R}^3$.",
          "Check rank–nullity: $2+1 = 3 = \\dim\\mathbb{R}^3$ ✓.",
        ],
        answer:
          "Rank 2, nullity 1. $\\ker T = \\operatorname{Span}\\{(0,1,1)\\}$ and $\\operatorname{range}T = \\operatorname{Span}\\{(1,2,-1),(-1,1,-2)\\}$.",
      },
      pitfalls: [
        "The kernel lives in the domain. For $T:\\mathbb{R}^3\\to\\mathbb{R}^4$, $T(x_1,x_2,x_3) = (x_1,0,x_2,x_2)$, $\\ker T = \\operatorname{Span}\\{(0,0,1)\\}\\subset\\mathbb{R}^3$. A vector with 4 entries cannot be in it.",
        "A range basis uses the pivot columns of the **original** $A$. Columns of the RREF usually span a different subspace.",
        "Rank–nullity uses $n$: $T:\\mathbb{R}^5\\to\\mathbb{R}^3$ with rank 2 has nullity $5-2 = 3$, not $3-2 = 1$.",
        "\"$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution\" only says nullity $\\ge1$. The kernel could be a line, a plane or all of $\\mathbb{R}^3$, so its exact shape cannot be determined.",
      ],
      recall: [
        { q: "$T:\\mathbb{R}^7\\to\\mathbb{R}^4$ has rank 4. Nullity?", a: "$7-4 = 3$." },
        { q: "Kernel of the projection of $\\mathbb{R}^2$ onto the $x_1$-axis?", a: "The $x_2$-axis." },
        { q: "Kernel of $T(x_1,x_2,x_3) = (x_1,0,x_2,x_2)$?", a: "$\\operatorname{Span}\\{(0,0,1)\\}$, the $x_3$-axis." },
      ],
      visuals: ["kernel-range"],
    },
    {
      title: "One-to-one, onto and invertible",
      intuition:
        "**Onto** means every target is hit (range = codomain). **One-to-one** means no two inputs collide (kernel $= \\{\\mathbf{0}\\}$). For square matrices the two conditions coincide, and both mean the map can be undone.",
      keyIdeas: [
        "**One-to-one**: $T(\\mathbf{u}) = T(\\mathbf{v})\\Rightarrow\\mathbf{u} = \\mathbf{v}$. For linear $T$ this is equivalent to $\\ker T = \\{\\mathbf{0}\\}$, to $A\\mathbf{x} = \\mathbf{0}$ having only the trivial solution, to the columns of $A$ being independent, and to a pivot in every **column** ($\\operatorname{rank}A = n$).",
        "**Onto** $\\mathbb{R}^m$: $\\operatorname{range}T = \\mathbb{R}^m$. This is equivalent to $A\\mathbf{x} = \\mathbf{b}$ being consistent for every $\\mathbf{b}$, to the columns spanning $\\mathbb{R}^m$, and to a pivot in every **row** ($\\operatorname{rank}A = m$).",
        "Size rules: if $n>m$, $T$ cannot be one-to-one. If $n<m$, $T$ cannot be onto. (A wide matrix is at best onto, a tall one at best one-to-one.)",
        "Square case ($n = m$): one-to-one $\\iff$ onto $\\iff$ $A$ invertible $\\iff$ $T$ invertible, with $T^{-1}(\\mathbf{x}) = A^{-1}\\mathbf{x}$. $T^{-1}$ is linear and $T^{-1}\\circ T = T\\circ T^{-1} = $ identity.",
        "Inverses of the geometric maps: $R_\\theta^{-1} = R_{-\\theta}$; a reflection is its own inverse; the inverse of shear $k$ is shear $-k$; $(kI)^{-1} = \\tfrac1kI$. Projections have no inverse.",
        "Composites: if $S$ and $T$ are one-to-one, so is $S\\circ T$. If $S\\circ T$ is one-to-one, then $T$ (the map applied **first**) must be one-to-one. If $S\\circ T$ is onto, then $S$ (applied **last**) must be onto.",
      ],
      formulas: [
        "T \\text{ one-to-one} \\iff \\ker T = \\{\\mathbf{0}\\} \\iff \\operatorname{rank}A = n",
        "T \\text{ onto } \\mathbb{R}^m \\iff \\operatorname{range}T = \\mathbb{R}^m \\iff \\operatorname{rank}A = m",
      ],
      example: {
        problem:
          "(a) Show that $T(x_1,x_2) = (3x_1+2x_2,\\ x_1+x_2)$ is invertible and find $T^{-1}$. (b) Is $S(x_1,x_2) = (x_1+x_2,\\ x_2,\\ x_1)$ one-to-one? Onto $\\mathbb{R}^3$?",
        steps: [
          "(a) $A = \\begin{bmatrix}3&2\\\\1&1\\end{bmatrix}$ has $ad-bc = 3-2 = 1\\ne0$. So $A$ is invertible, and $T$ is one-to-one and onto.",
          "$A^{-1} = \\dfrac11\\begin{bmatrix}1&-2\\\\-1&3\\end{bmatrix}$, so $T^{-1}(y_1,y_2) = (y_1-2y_2,\\ -y_1+3y_2)$.",
          "Check: $T(T^{-1}(\\mathbf{y}))$ has first entry $3(y_1-2y_2)+2(-y_1+3y_2) = y_1$ and second entry $(y_1-2y_2)+(-y_1+3y_2) = y_2$ ✓.",
          "(b) $B = \\begin{bmatrix}1&1\\\\0&1\\\\1&0\\end{bmatrix}$. Its columns are not multiples of each other, so they are independent: pivot in both columns, so $S$ is **one-to-one**.",
          "$S$ is **not onto**: $B$ is $3\\times2$, so there are at most 2 pivots for 3 rows. Rank–nullity check: $2+0 = 2$.",
        ],
        answer: "(a) $T^{-1}(y_1,y_2) = (y_1-2y_2,\\ -y_1+3y_2)$. (b) $S$ is one-to-one but not onto.",
      },
      pitfalls: [
        "Swapping the pivot tests. One-to-one needs a pivot in every **column**; onto needs a pivot in every **row**.",
        "\"Independent columns $\\Rightarrow$ onto\" is false for tall matrices. A $3\\times2$ matrix with independent columns is one-to-one, not onto.",
        "A non-square matrix never gives an invertible $T$, even when $T$ is one-to-one or onto.",
        "If $T$ is not one-to-one, $T(\\mathbf{x}) = \\mathbf{b}$ has either no solution or infinitely many, never exactly one.",
      ],
      recall: [
        { q: "Can a linear $T:\\mathbb{R}^3\\to\\mathbb{R}^5$ be onto?", a: "No: $\\operatorname{rank}\\le3<5$." },
        { q: "$T:\\mathbb{R}^4\\to\\mathbb{R}^4$ is one-to-one. Is it onto?", a: "Yes. It is square, so one-to-one $\\iff$ onto $\\iff$ invertible." },
        { q: "Inverse of rotation by $30^\\circ$ counter-clockwise?", a: "Rotation by $30^\\circ$ clockwise ($R_{-30^\\circ}$)." },
      ],
    },
    {
      title: "Linear transformations on $P_n$ and $M_{2\\times2}$",
      intuition:
        "Linearity only needs addition and scalar multiplication, so it makes sense for polynomials and matrices too. Coordinates turn each such space into an $\\mathbb{R}^k$, and $T$ then becomes an ordinary matrix acting on coordinate vectors.",
      keyIdeas: [
        "$T: V\\to W$ is linear if $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u})+T(\\mathbf{v})$ and $T(c\\mathbf{u}) = cT(\\mathbf{u})$. Then $\\ker T\\subseteq V$, $\\operatorname{range}T\\subseteq W$, and $\\dim\\ker T+\\dim\\operatorname{range}T = \\dim V$.",
        "Standard bases: $P_n$ has $\\{1, x, \\dots, x^n\\}$ ($\\dim = n+1$); $M_{2\\times2}$ has $\\{E_{11}, E_{12}, E_{21}, E_{22}\\}$ ($\\dim = 4$).",
        "**Matrix of $T$ relative to bases** $\\mathcal B$ of $V$ and $\\mathcal C$ of $W$: column $j$ is $[T(\\mathbf{b}_j)]_{\\mathcal C}$. Then $[T(\\mathbf{v})]_{\\mathcal C} = M[\\mathbf{v}]_{\\mathcal B}$, and $M$ is $(\\dim W)\\times(\\dim V)$.",
        "**Differentiation** $D(p) = p'$ on $P_3$ with basis $\\{1,t,t^2,t^3\\}$ has matrix with $1, 2, 3$ on the superdiagonal. $\\ker D = $ constants (dim 1), $\\operatorname{range}D = P_2$ (dim 3).",
        "**Multiplication by a fixed polynomial**, e.g. $T(p) = (x^2-2)p(x)$ from $P_n$ to $P_{n+2}$, is one-to-one (only $p = 0$ gives $0$) but not onto (its outputs all have the factor $x^2-2$).",
        "On $M_{2\\times2}$: $L(A) = A+A^T$ has kernel = skew-symmetric matrices (dim 1) and range = symmetric matrices (dim 3). $A\\mapsto A-A^T$ swaps the roles (kernel dim 3, range dim 1). The trace $M_{2\\times2}\\to\\mathbb{R}$ has a kernel of dimension 3.",
        "Linear: $A\\mapsto A^T$, $p\\mapsto p'$, $p\\mapsto p(1)$, $A\\mapsto BA$ for a fixed $B$. **Not** linear: $A\\mapsto\\det A$, $A\\mapsto A^2$, $p\\mapsto p+1$.",
      ],
      formulas: [
        "M = \\big[\\,[T(\\mathbf{b}_1)]_{\\mathcal C}\\ \\cdots\\ [T(\\mathbf{b}_n)]_{\\mathcal C}\\,\\big],\\qquad [T(\\mathbf{v})]_{\\mathcal C} = M\\,[\\mathbf{v}]_{\\mathcal B}",
        "\\dim\\ker T + \\dim\\operatorname{range}T = \\dim V",
      ],
      example: {
        problem:
          "$T:P_2\\to P_4$, $T(p) = (x^2-2)\\,p(x)$. Find the matrix of $T$ relative to $\\{1,x,x^2\\}$ and $\\{1,x,x^2,x^3,x^4\\}$. Is $T$ one-to-one? Onto?",
        steps: [
          "$T(1) = -2+x^2$, with coordinates $(-2,0,1,0,0)$.",
          "$T(x) = -2x+x^3$, with coordinates $(0,-2,0,1,0)$.",
          "$T(x^2) = -2x^2+x^4$, with coordinates $(0,0,-2,0,1)$.",
          "These coordinate vectors are the **columns**: $M = \\begin{bmatrix}-2&0&0\\\\0&-2&0\\\\1&0&-2\\\\0&1&0\\\\0&0&1\\end{bmatrix}$, a $5\\times3$ matrix.",
          "$M$ has a pivot in every column (rank 3), so $\\ker T = \\{0\\}$ and $T$ is one-to-one. Rank $3<5 = \\dim P_4$, so $T$ is not onto (for example, $1$ is not $(x^2-2)$ times a polynomial).",
        ],
        answer: "The $5\\times3$ matrix above. $T$ is one-to-one but not onto.",
      },
      pitfalls: [
        "Coordinates go in as **columns**. The matrix is $(\\dim W)\\times(\\dim V)$: $5\\times3$ above, not $3\\times5$.",
        "$\\dim P_n = n+1$, not $n$, and $\\dim M_{2\\times2} = 4$. Rank–nullity uses the dimension of the **domain**.",
        "The kernel of $L(A) = A+A^T$ is not $\\{0\\}$: every skew-symmetric matrix, e.g. $\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$, maps to $0$.",
        "Keep the basis order. Listing $\\{x^2,x,1\\}$ instead of $\\{1,x,x^2\\}$ reverses the rows and columns.",
      ],
      recall: [
        { q: "Matrix of $D(p) = p'$ on $P_2$ relative to $\\{1,t,t^2\\}$?", a: "$\\begin{bmatrix}0&1&0\\\\0&0&2\\\\0&0&0\\end{bmatrix}$." },
        { q: "$\\dim\\ker L$ and $\\dim\\operatorname{range}L$ for $L(A) = A+A^T$ on $M_{2\\times2}$?", a: "1 and 3." },
        { q: "$T(p) = p(0)$ from $P_2$ to $\\mathbb{R}$: kernel and its dimension?", a: "$\\{bx+cx^2\\}$, dimension 2 (rank 1, and $2+1 = 3$)." },
      ],
    },
  ],
  playbook: [
    "If you see \"is $T$ linear?\" → first check $T(\\mathbf{0}) = \\mathbf{0}$ (fails → not linear). If it passes, look for products, powers, absolute values or constants, and test $T(c\\mathbf{u}) = cT(\\mathbf{u})$ with a concrete $c$.",
    "If you see $T(\\mathbf{e}_1), T(\\mathbf{e}_2), \\dots$ → those are the columns of $A$, and $T(\\mathbf{x}) = x_1T(\\mathbf{e}_1)+\\dots$.",
    "If you see $T$ given on vectors other than $\\mathbf{e}_i$ (e.g. $T(1,1)$, $T(2,-1)$) → write each $\\mathbf{e}_i$ (or the target vector) as a combination of them, or compute $A = [T(\\mathbf{b}_j)][\\mathbf{b}_j]^{-1}$. Check $A\\mathbf{b}_j = T(\\mathbf{b}_j)$.",
    "If you see a rotation → $\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}$ with $\\theta<0$ for clockwise. Check $\\mathbf{e}_1$'s image against a sketch.",
    "If you see a reflection or projection → find the images of $\\mathbf{e}_1, \\mathbf{e}_2$ from a picture ($y = x$ swaps coordinates, $y = -x$ swaps and negates).",
    "If you see \"first … then …\" → multiply right to left: first $A$, then $B$ gives $BA$. Distractors use $AB$.",
    "If you see \"which pairs commute?\" → rotations with rotations, $kI$ with everything, diagonal with diagonal. Rotation with reflection usually does not; verify by multiplying both ways.",
    "If you see two reflections composed → the result is a rotation by twice the angle from the first mirror to the second.",
    "If you see \"kernel of $T$\" → solve $A\\mathbf{x} = \\mathbf{0}$. The answer lives in the domain $\\mathbb{R}^n$ (count entries!).",
    "If you see rank/nullity → $\\operatorname{rank}+\\operatorname{nullity} = n$ (number of columns = dimension of the domain).",
    "If you see one-to-one / onto → count pivots: every column ⇒ one-to-one, every row ⇒ onto. $n>m$ rules out one-to-one, $n<m$ rules out onto.",
    "If you see a square $T$ that is one-to-one (or onto) → it is invertible, and $T^{-1}(\\mathbf{x}) = A^{-1}\\mathbf{x}$.",
    "If you see $T$ on $P_n$ or $M_{2\\times2}$ → apply $T$ to each basis element, write the results in coordinates, and use those as **columns**. Then rank and kernel work exactly as in $\\mathbb{R}^k$.",
    "If you see only \"$A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution\" and a question about the exact shape of the kernel → not enough information (line, plane, …).",
  ],
};
