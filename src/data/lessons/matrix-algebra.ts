import type { Lesson } from "@/lib/types";

export const matrixAlgebraLesson: Lesson = {
  topic: "matrix-algebra",
  bigPicture:
    "Matrix algebra is about doing algebra with whole matrices: undoing a matrix (the inverse), solving equations where the unknown is a matrix, and factoring a matrix into simpler pieces. The chain goes: the inverse $A^{-1}$ undoes $A$, so $A\\mathbf{x} = \\mathbf{b}$ becomes $\\mathbf{x} = A^{-1}\\mathbf{b}$ → inverses of products reverse order, which drives every \"solve for $X$\" question → row operations are themselves matrices (elementary matrices), which is why $[A \\mid I] \\sim [I \\mid A^{-1}]$ works → the Invertible Matrix Theorem ties invertibility to pivots, independence, spanning and $A\\mathbf{x} = \\mathbf{0}$ → factorizations $A = LU$ (fast repeated solving) and $A = PDP^{-1}$ (fast powers) reuse the same ideas. The one rule that underlies almost every trap: **matrix multiplication is not commutative**, so always multiply on the correct side.",
  sections: [
    {
      title: "The inverse of a matrix and solving $A\\mathbf{x} = \\mathbf{b}$",
      intuition:
        "An invertible matrix is a transformation that loses no information, so it can be undone. $A^{-1}$ is the \"undo\" button: apply $A$, then $A^{-1}$, and every vector is back where it started. If $A$ squashes the plane onto a line, nothing can undo it.",
      visuals: ["inverse-grid"],
      keyIdeas: [
        "An $n\\times n$ matrix $A$ is **invertible** if there is an $n\\times n$ matrix $C$ with $CA = I$ **and** $AC = I$. Then $C = A^{-1}$. Only **square** matrices can be invertible; a non-invertible square matrix is called **singular**.",
        "The inverse is **unique**: if $B$ and $C$ are both inverses, $B = BI = B(AC) = (BA)C = IC = C$.",
        "$2\\times2$ formula: for $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $A$ is invertible iff $ad - bc \\ne 0$, and $A^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$ (swap the diagonal, negate the off-diagonal, divide).",
        "If $A$ is invertible, $A\\mathbf{x} = \\mathbf{b}$ has the **unique** solution $\\mathbf{x} = A^{-1}\\mathbf{b}$ for every $\\mathbf{b}$. In particular $A\\mathbf{x} = \\mathbf{0}$ has only $\\mathbf{x} = \\mathbf{0}$.",
        "Cancellation works only with an invertible factor: if $A$ is invertible, $AB = AC \\Rightarrow B = C$. In general $AB = 0$ does **not** imply $A = 0$ or $B = 0$.",
      ],
      formulas: [
        "A^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}",
        "A\\mathbf{x} = \\mathbf{b} \\;\\Longrightarrow\\; \\mathbf{x} = A^{-1}\\mathbf{b}",
      ],
      example: {
        problem: "Let $A = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$. Find $A^{-1}$ and use it to solve $3x_1 + 5x_2 = 4$, $x_1 + 2x_2 = 1$.",
        steps: [
          "$ad - bc = 3\\cdot2 - 5\\cdot1 = 1 \\ne 0$, so $A$ is invertible.",
          "$A^{-1} = \\frac11\\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}$.",
          "Check: $AA^{-1} = \\begin{bmatrix} 6-5 & -15+15 \\\\ 2-2 & -5+6 \\end{bmatrix} = I$ ✓.",
          "$\\mathbf{x} = A^{-1}\\mathbf{b} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix}$. Check: $9 - 5 = 4$, $3 - 2 = 1$ ✓.",
        ],
        answer: "$A^{-1} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}$ and $\\mathbf{x} = (3, -1)$.",
      },
      pitfalls: [
        "The $2\\times2$ recipe is swap the **diagonal** and negate the **off-diagonal**. Negating the diagonal or forgetting to divide by $ad - bc$ are the classic MCQ distractors.",
        "$A\\mathbf{b}$ is not the solution of $A\\mathbf{x} = \\mathbf{b}$. You need $A^{-1}\\mathbf{b}$.",
        "A non-square matrix has no inverse, even if it has a one-sided inverse (e.g. $CA = I$ for a tall $A$ with independent columns).",
      ],
      recall: [
        { q: "When is $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ invertible?", a: "Exactly when $ad - bc \\ne 0$." },
        { q: "Why is the inverse unique?", a: "$B = BI = B(AC) = (BA)C = IC = C$ for any two inverses $B$, $C$." },
        { q: "$A$ is invertible. How many solutions does $A\\mathbf{x} = \\mathbf{b}$ have?", a: "Exactly one, $\\mathbf{x} = A^{-1}\\mathbf{b}$, for every $\\mathbf{b}$." },
      ],
    },
    {
      title: "Algebra of inverses: products, transposes and powers",
      intuition:
        "To undo \"put on socks, then shoes\" you take off the shoes first. Inverting a product reverses the order of the factors for the same reason: the last transformation applied must be the first one undone.",
      visuals: ["inverse-order"],
      keyIdeas: [
        "$(A^{-1})^{-1} = A$.",
        "$(AB)^{-1} = B^{-1}A^{-1}$, and more generally $(A_1A_2\\cdots A_k)^{-1} = A_k^{-1}\\cdots A_2^{-1}A_1^{-1}$. A product of invertible matrices is invertible.",
        "$(A^T)^{-1} = (A^{-1})^T$, because $A^T(A^{-1})^T = (A^{-1}A)^T = I$.",
        "$(A^k)^{-1} = (A^{-1})^k$ (write $A^{-k}$), and $(cA)^{-1} = \\frac1c A^{-1}$ for $c \\ne 0$.",
        "A **sum** of invertible matrices need not be invertible: $I + (-I) = 0$.",
        "If $A$ is invertible and $AB = BA$, then also $A^{-1}B = BA^{-1}$.",
      ],
      formulas: [
        "(AB)^{-1} = B^{-1}A^{-1}, \\qquad (A^T)^{-1} = (A^{-1})^T, \\qquad (cA)^{-1} = \\tfrac1c A^{-1}",
      ],
      example: {
        problem:
          "$A^{-1} = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$ and $B^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}$. Find $(AB)^{-1}$ and $(2A^T)^{-1}$.",
        steps: [
          "$(AB)^{-1} = B^{-1}A^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$.",
          "The wrong order gives $A^{-1}B^{-1} = \\begin{bmatrix} 7 & 2 \\\\ 3 & 1 \\end{bmatrix}$, a different matrix.",
          "$(2A^T)^{-1} = \\frac12(A^T)^{-1} = \\frac12(A^{-1})^T = \\frac12\\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}$.",
        ],
        answer: "$(AB)^{-1} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$ and $(2A^T)^{-1} = \\begin{bmatrix} 1/2 & 0 \\\\ 1 & 1/2 \\end{bmatrix}$. Neither needed $A$ or $B$ themselves.",
      },
      pitfalls: [
        "$(AB)^{-1} = A^{-1}B^{-1}$ is **false** in general. It only holds when the inverses commute.",
        "$(2A)^{-1} = 2A^{-1}$ is false; the scalar is inverted too: $\\frac12A^{-1}$.",
        "\"$A$, $B$ invertible $\\Rightarrow A + B$ invertible\" cannot be decided from that information alone.",
      ],
      recall: [
        { q: "$(ABC)^{-1} = ?$", a: "$C^{-1}B^{-1}A^{-1}$." },
        { q: "$\\big((A^{-1})^T\\big)^{-1} = ?$", a: "$A^T$." },
        { q: "Is a product of invertible matrices invertible? A sum?", a: "Product: always. Sum: not necessarily ($I + (-I) = 0$)." },
      ],
    },
    {
      title: "Solving matrix equations for $X$",
      intuition:
        "Solve for $X$ exactly as in ordinary algebra, with one extra rule: a matrix can only be cancelled from the side it is on. Multiply by an inverse on the **left** to remove a left factor, on the **right** to remove a right factor, and never move a matrix past another one.",
      keyIdeas: [
        "$AXB = C$ with $A$, $B$ invertible gives $X = A^{-1}CB^{-1}$ (left factor removed on the left, right factor on the right).",
        "Collect the $X$ terms on one side and factor with $I$: $AX - X = B$ becomes $(A - I)X = B$, never \"$(A - 1)X$\". Factor $X$ out on the side where it sits: $XA - XC = X(A - C)$ but $AX - CX = (A - C)X$.",
        "If both sides are inverses, invert both sides: $(M)^{-1} = N \\Rightarrow M = N^{-1}$.",
        "Before inverting a matrix such as $A + B^{-1}$, **justify** that it is invertible, typically by writing it as a product of invertible matrices.",
        "Polynomial identities give inverses: $A^2 + pA + qI = 0$ with $q \\ne 0$ gives $A(A + pI) = -qI$, so $A^{-1} = -\\frac1q(A + pI)$. With no constant term ($q = 0$) invertibility is not decided.",
      ],
      formulas: [
        "AXB = C \\;\\Rightarrow\\; X = A^{-1}CB^{-1}",
        "A^2 + pA + qI = 0,\\ q\\ne0 \\;\\Rightarrow\\; A^{-1} = -\\tfrac1q\\,(A + pI)",
      ],
      example: {
        problem:
          "(Tutorial 2 Q3) $A$, $B$, $X$ are $n\\times n$ with $A$, $X$ and $A - AX$ invertible, and $(A - AX)^{-1} = X^{-1}B$. Solve for $X$, justifying every inverse used.",
        steps: [
          "$X^{-1}B$ is the inverse of a matrix, so it is invertible; then $B = X(X^{-1}B)$ is a product of invertibles, so $B$ is invertible.",
          "Invert both sides: $A - AX = (X^{-1}B)^{-1} = B^{-1}X$.",
          "Collect $X$: $A = AX + B^{-1}X = (A + B^{-1})X$ ($X$ is factored out on the **right**).",
          "From $A = (A + B^{-1})X$: $A + B^{-1} = AX^{-1}$, a product of invertible matrices, so it is invertible.",
          "Multiply on the left by $(A + B^{-1})^{-1}$: $X = (A + B^{-1})^{-1}A$.",
        ],
        answer: "$X = (A + B^{-1})^{-1}A$.",
      },
      pitfalls: [
        "From $A^4 = ABA^2 + 2A^3$ (with $A$ invertible), remove the left $A$ with $A^{-1}$ on the left and the right $A^2$ with $A^{-2}$ on the right: $A = B + 2I$. Cancelling both on one side is wrong.",
        "$(X - 2Y)A = A^2 \\Rightarrow X - 2Y = A$; dividing \"by $A$\" on the wrong side changes the answer in general.",
        "$A^2 + pA = 0$ (no constant term) does **not** make $A$ invertible: $A = 0$ satisfies it.",
      ],
      recall: [
        { q: "Solve $XA + B = C$ for $X$ ($A$ invertible).", a: "$X = (C - B)A^{-1}$ (multiply on the right)." },
        { q: "$A$ invertible and $A^{-1}(X + Y)B = A^{-1}$ with $B$ invertible. $X = ?$", a: "$X + Y = B^{-1}$, so $X = B^{-1} - Y$." },
        { q: "$A^2 - 3A + 2I = 0$. $A^{-1} = ?$", a: "$A(A - 3I) = -2I$, so $A^{-1} = \\frac12(3I - A)$." },
      ],
    },
    {
      title: "Elementary matrices and the Gauss–Jordan inverse",
      intuition:
        "Every row operation is a matrix: do the operation to $I$ and you get the elementary matrix $E$, and $EA$ performs the same operation on $A$. Row reducing $A$ to $I$ is a product of such matrices equal to $A^{-1}$, and running the same operations on $I$ records that product.",
      visuals: ["gauss-jordan-2x2"],
      keyIdeas: [
        "**Elementary matrix** = $I$ after one row operation (replacement $R_i \\to R_i + kR_j$, interchange $R_i \\leftrightarrow R_j$, or scaling $R_i \\to cR_i$ with $c \\ne 0$). Left-multiplying, $EA$, performs that row operation on $A$; right-multiplying, $AE$, acts on **columns**.",
        "An entry $k$ in position $(i,j)$ ($i \\ne j$) of a replacement matrix means \"add $k$ times row $j$ to row $i$\".",
        "Every elementary matrix is invertible and $E^{-1}$ is the elementary matrix of the reverse operation: $-k$ instead of $k$, the same swap, or $1/c$ instead of $c$. Powers: a replacement $E^m$ adds $mk$ (not $k^m$); a swap has $E^2 = I$.",
        "**Theorem**: $A$ is invertible iff $A$ is row equivalent to $I_n$. If $E_p\\cdots E_1A = I$ then $A^{-1} = E_p\\cdots E_1$ and $A = E_1^{-1}\\cdots E_p^{-1}$ (a product of elementary matrices).",
        "**Algorithm**: row reduce $[A \\mid I]$. If the left block becomes $I$, the right block is $A^{-1}$; if a zero row appears on the left, $A$ is not invertible.",
      ],
      formulas: [
        "[\\,A \\mid I\\,] \\sim [\\,I \\mid A^{-1}\\,]",
        "E_p\\cdots E_2E_1A = I \\;\\Rightarrow\\; A^{-1} = E_p\\cdots E_1,\\quad A = E_1^{-1}E_2^{-1}\\cdots E_p^{-1}",
      ],
      example: {
        problem: "Find $A^{-1}$ for $A = \\begin{bmatrix} 1 & 1 & 0 \\\\ 2 & 3 & 1 \\\\ 1 & 2 & 2 \\end{bmatrix}$ by Gauss–Jordan.",
        steps: [
          "$[A \\mid I]$: $R_2 \\to R_2 - 2R_1$ gives $[0, 1, 1 \\mid -2, 1, 0]$; $R_3 \\to R_3 - R_1$ gives $[0, 1, 2 \\mid -1, 0, 1]$.",
          "$R_3 \\to R_3 - R_2$: row 3 becomes $[0, 0, 1 \\mid 1, -1, 1]$ (three pivots, so $A$ is invertible).",
          "Clear column 3 upwards: $R_2 \\to R_2 - R_3$ gives $[0,1,0 \\mid -3, 2, -1]$ (row 1 already has a 0 there).",
          "Clear column 2: $R_1 \\to R_1 - R_2$ gives $[1,0,0 \\mid 4, -2, 1]$.",
          "Check: row 2 of $A$ times column 1 of the result is $8 - 9 + 1 = 0$; row 3 times column 3 is $1 - 2 + 2 = 1$ ✓.",
        ],
        answer: "$A^{-1} = \\begin{bmatrix} 4 & -2 & 1 \\\\ -3 & 2 & -1 \\\\ 1 & -1 & 1 \\end{bmatrix}$.",
      },
      pitfalls: [
        "$E$ adds $3R_1$ to $R_2$ ⇒ $E^2$ adds $6R_1$, not $9R_1$ (a past-paper TFN).",
        "If operations $E_1, E_2, E_3$ are applied in that order, the matrix is $E_3E_2E_1$: the first operation sits next to $A$.",
        "To recover $A$ from the operations that reduce it to $I$, undo them in **reverse** order: $A = E_1^{-1}E_2^{-1}E_3^{-1}$.",
        "$AE$ swaps/combines **columns**, not rows.",
      ],
      recall: [
        { q: "What is the inverse of the elementary matrix for $R_3 \\to R_3 - 5R_1$?", a: "The matrix for $R_3 \\to R_3 + 5R_1$: same position, opposite sign." },
        { q: "Is a product of elementary matrices elementary?", a: "Not in general, but it is always invertible, and every invertible matrix is such a product." },
        { q: "What does a zero row on the left of $[A \\mid I]$ tell you?", a: "$A$ is not invertible (fewer than $n$ pivots)." },
      ],
    },
    {
      title: "Invertibility deductions and the Invertible Matrix Theorem",
      intuition:
        "For a **square** matrix, \"one-to-one\" and \"onto\" come together: $n$ pivots means a pivot in every row and every column at once. So a single piece of evidence (a trivial null space, spanning columns, a one-sided inverse) proves everything. For non-square matrices they come apart, which is where most TFN traps live.",
      keyIdeas: [
        "**IMT** ($A$ is $n\\times n$). The following are equivalent: (a) $A$ invertible; (b) $A \\sim I_n$; (c) $n$ pivot positions; (d) $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution; (e) columns linearly independent; (f) $\\mathbf{x}\\mapsto A\\mathbf{x}$ one-to-one; (g) $A\\mathbf{x} = \\mathbf{b}$ has at least one solution for every $\\mathbf{b}$; (h) columns span $\\mathbb{R}^n$; (i) $\\mathbf{x}\\mapsto A\\mathbf{x}$ onto; (j) some $C$ has $CA = I$; (k) some $D$ has $AD = I$; (l) $A^T$ invertible; plus $\\operatorname{rank}A = n$, $\\operatorname{Nul}A = \\{\\mathbf{0}\\}$, $\\operatorname{Col}A = \\mathbb{R}^n$.",
        "If one statement fails, **all** fail. For square matrices $AB = I \\Rightarrow BA = I$.",
        "**Products**: if $A$, $B$ are $n\\times n$ and $AB$ is invertible, then both $A$ and $B$ are invertible. So $A^2(B + C)$ invertible ⇒ $A$ and $B + C$ invertible (nothing about $B$ or $C$ alone); $A^2$ invertible ⇒ $A$ invertible; $AB$ and $B$ invertible ⇒ $A = (AB)B^{-1}$ invertible.",
        "**Columns of $AB$**: if $B\\mathbf{x} = \\mathbf{0}$ with $\\mathbf{x}\\ne\\mathbf{0}$, then $AB\\mathbf{x} = \\mathbf{0}$, so dependent columns of $B$ ⇒ dependent columns of $AB$ (any shapes).",
        "**Non-square**: for $m\\times n$ $A$, independent columns ($\\operatorname{rank} = n$) and spanning columns ($\\operatorname{rank} = m$) are different conditions. $n > m$ forces dependent columns; $m > n$ forces non-spanning columns. $\\operatorname{rank}(AB) \\le \\min(\\operatorname{rank}A, \\operatorname{rank}B)$.",
      ],
      formulas: [
        "AB \\text{ invertible }(A,B\\ n\\times n) \\;\\Longrightarrow\\; A^{-1} = B(AB)^{-1},\\quad B^{-1} = (AB)^{-1}A",
      ],
      example: {
        problem:
          "(Tutorial 2 Q5, Q6) $A$ is $n\\times n$ with linearly independent columns. Show that the columns of $A^2$ span $\\mathbb{R}^n$, and that $A\\mathbf{x} = \\mathbf{b}$ is solvable for every $\\mathbf{b}$.",
        steps: [
          "Independent columns ⇒ $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution ⇒ (square, IMT) $A$ is invertible.",
          "$A^2 = AA$ is a product of invertible matrices, hence invertible.",
          "By the IMT applied to $A^2$, its columns span $\\mathbb{R}^n$.",
          "For any $\\mathbf{b}$, $\\mathbf{x} = A^{-1}\\mathbf{b}$ solves $A\\mathbf{x} = \\mathbf{b}$.",
        ],
        answer: "Both follow from \"$A$ square with independent columns ⇒ $A$ invertible\".",
      },
      pitfalls: [
        "\"$A\\mathbf{x} = \\mathbf{0}$ only trivial ⇒ $A\\mathbf{x} = \\mathbf{b}$ always solvable\" needs $A$ **square**. With an unknown $m\\times n$ shape the answer is \"not enough information\".",
        "A $3\\times2$ times $2\\times3$ product can never be $I_3$ (rank $\\le 2$), and $BA$ for $A$ $2\\times3$, $B$ $3\\times2$ is never invertible.",
        "\"Columns of $A$ dependent ⇒ columns of $AB$ dependent\" is true for square $A$, $B$ but can fail for other shapes.",
        "A nonzero diagonal does not make a (non-triangular) matrix invertible.",
      ],
      recall: [
        { q: "$A$ is $5\\times5$ and $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution. Can $A\\mathbf{x} = \\mathbf{b}$ be solvable for every $\\mathbf{b}$?", a: "No. The IMT conditions fail together, so the columns do not span $\\mathbb{R}^5$." },
        { q: "$(A + B)C^2$ is invertible ($n\\times n$). Which matrices must be invertible?", a: "$A + B$ and $C$. Nothing follows for $A$ or $B$ separately." },
        { q: "$A$ is $4\\times3$ with independent columns. Is $A\\mathbf{x} = \\mathbf{b}$ solvable for all $\\mathbf{b}$?", a: "No: rank $3 < 4$, so the columns cannot span $\\mathbb{R}^4$." },
      ],
    },
    {
      title: "Powers, nilpotent matrices and the structure of solutions",
      intuition:
        "Matrices can be \"zero after a while\": a nilpotent $A$ has $A^m = 0$ without being $0$. Then $I - A$ behaves like $1 - x$ with $x$ tiny, and the geometric series $1 + x + x^2 + \\cdots$ stops after finitely many terms, giving an exact inverse.",
      keyIdeas: [
        "$A$ is **nilpotent** if $A^m = 0$ for some $m$. A nilpotent matrix is never invertible (else $A^m$ would be invertible). $A^2 = 0$ does not force $A = 0$, e.g. $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$.",
        "If $A^m = 0$: $(I - A)(I + A + A^2 + \\cdots + A^{m-1}) = I - A^m = I$, so $I - A$ is invertible with that inverse. Similarly $(I + A)^{-1} = I - A + A^2 - \\cdots \\pm A^{m-1}$.",
        "Strictly upper (or lower) triangular $n\\times n$ matrices are nilpotent: $N^n = 0$.",
        "If $A$ is $n\\times n$ and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, so does $A^k\\mathbf{x} = \\mathbf{0}$ for every $k \\ge 1$ (peel off one $A$ at a time, or: $A$ invertible ⇒ $A^k$ invertible).",
        "**Structure of solutions**: if $\\mathbf{x}_1$ is one solution of a consistent $A\\mathbf{x} = \\mathbf{b}$, then every solution is $\\mathbf{x} = \\mathbf{x}_1 + \\mathbf{x}_0$ with $A\\mathbf{x}_0 = \\mathbf{0}$ (because $A(\\mathbf{x} - \\mathbf{x}_1) = \\mathbf{b} - \\mathbf{b} = \\mathbf{0}$).",
      ],
      formulas: [
        "A^m = 0 \\;\\Rightarrow\\; (I - A)^{-1} = I + A + A^2 + \\cdots + A^{m-1}",
        "\\{\\text{solutions of } A\\mathbf{x} = \\mathbf{b}\\} = \\mathbf{x}_1 + \\operatorname{Nul}A",
      ],
      example: {
        problem: "Let $N = \\begin{bmatrix} 0 & 2 & 3 \\\\ 0 & 0 & 4 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Find $(I - N)^{-1}$ without row reduction.",
        steps: [
          "$N^2 = \\begin{bmatrix} 0 & 0 & 8 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ and $N^3 = 0$ (strictly upper triangular).",
          "$(I - N)^{-1} = I + N + N^2 = \\begin{bmatrix} 1 & 2 & 3 + 8 \\\\ 0 & 1 & 4 \\\\ 0 & 0 & 1 \\end{bmatrix}$.",
          "Check the $(1,3)$ entry of $(I - N)(I + N + N^2)$: $1\\cdot11 + (-2)\\cdot4 + (-3)\\cdot1 = 0$ ✓.",
        ],
        answer: "$(I - N)^{-1} = \\begin{bmatrix} 1 & 2 & 11 \\\\ 0 & 1 & 4 \\\\ 0 & 0 & 1 \\end{bmatrix}$.",
      },
      pitfalls: [
        "Forgetting the last term ($N^2$) of the series is the standard distractor.",
        "$(I + A)^{-1}$ has **alternating** signs: $I - A + A^2 - \\cdots$.",
        "A homogeneous solution ($A\\mathbf{x}_0 = \\mathbf{0}$) is not itself a solution of $A\\mathbf{x} = \\mathbf{b}$ when $\\mathbf{b}\\ne\\mathbf{0}$; you must add it to a particular solution.",
      ],
      recall: [
        { q: "$A^4 = 0$. What is $(I - A)^{-1}$?", a: "$I + A + A^2 + A^3$." },
        { q: "Can a nilpotent matrix be invertible?", a: "No: $A^m = 0$ is singular, but a power of an invertible matrix is invertible." },
        { q: "$\\mathbf{p}$ solves $A\\mathbf{x} = \\mathbf{b}$ and $A\\mathbf{v} = \\mathbf{0}$. Name another solution.", a: "$\\mathbf{p} + t\\mathbf{v}$ for any scalar $t$." },
      ],
    },
    {
      title: "LU factorization",
      intuition:
        "Gaussian elimination does the same work every time you solve $A\\mathbf{x} = \\mathbf{b}$. LU stores that work: $U$ is the echelon form and $L$ records the multipliers. A new $\\mathbf{b}$ then costs only two quick triangular solves.",
      keyIdeas: [
        "$A = LU$ with $L$ **unit lower triangular** ($m\\times m$, 1s on the diagonal) and $U$ an **echelon form** of $A$ ($m\\times n$, works for non-square $A$ too, e.g. $3\\times4$).",
        "Find it by reducing $A$ to echelon form using **only** replacements $R_i \\to R_i - \\ell_{ij}R_j$ ($j < i$). The multiplier $\\ell_{ij}$ goes into position $(i,j)$ of $L$ with the **same sign**.",
        "Multipliers for later columns are computed from the **updated** rows, not from the original entries of $A$.",
        "**Solving** $A\\mathbf{x} = \\mathbf{b}$: forward substitution in $L\\mathbf{y} = \\mathbf{b}$, then back substitution in $U\\mathbf{x} = \\mathbf{y}$.",
        "Not every matrix has an LU factorization without swaps, e.g. $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ (zero pivot); such matrices need $PA = LU$.",
      ],
      formulas: [
        "A = LU,\\qquad L\\mathbf{y} = \\mathbf{b},\\qquad U\\mathbf{x} = \\mathbf{y}",
      ],
      example: {
        problem:
          "(Tutorial 2 Q7) $A = \\begin{bmatrix} 2 & -2 & 4 \\\\ 1 & -3 & 1 \\\\ 3 & 7 & 5 \\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix} 0 \\\\ -5 \\\\ 7 \\end{bmatrix}$. Find $A = LU$ and solve $A\\mathbf{x} = \\mathbf{b}$.",
        steps: [
          "Column 1: $R_2 \\to R_2 - \\tfrac12R_1$ gives $[0, -2, -1]$; $R_3 \\to R_3 - \\tfrac32R_1$ gives $[0, 10, -1]$. So $\\ell_{21} = \\tfrac12$, $\\ell_{31} = \\tfrac32$.",
          "Column 2: $R_3 \\to R_3 - (-5)R_2$ gives $[0, 0, -6]$, so $\\ell_{32} = -5$.",
          "$L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1/2 & 1 & 0 \\\\ 3/2 & -5 & 1 \\end{bmatrix}$, $U = \\begin{bmatrix} 2 & -2 & 4 \\\\ 0 & -2 & -1 \\\\ 0 & 0 & -6 \\end{bmatrix}$.",
          "Forward: $y_1 = 0$, $y_2 = -5 - \\tfrac12(0) = -5$, $y_3 = 7 - \\tfrac32(0) + 5(-5) = -18$.",
          "Back: $-6x_3 = -18 \\Rightarrow x_3 = 3$; $-2x_2 - 3 = -5 \\Rightarrow x_2 = 1$; $2x_1 - 2 + 12 = 0 \\Rightarrow x_1 = -5$.",
        ],
        answer: "$\\mathbf{x} = (-5, 1, 3)$. Check: $2(-5) - 2(1) + 4(3) = 0$ ✓.",
      },
      pitfalls: [
        "Putting $-\\ell_{ij}$ into $L$ (the entry of the elementary matrix) instead of $+\\ell_{ij}$ (the entry of its inverse).",
        "Computing $\\ell_{32}$ as $a_{32}/a_{22}$ from the original matrix.",
        "Stopping after $L\\mathbf{y} = \\mathbf{b}$: $\\mathbf{y}$ is an intermediate vector, not the answer.",
      ],
      recall: [
        { q: "What goes into $L$ when you do $R_3 \\to R_3 - 4R_1$?", a: "$\\ell_{31} = 4$." },
        { q: "In what order are the two triangular systems solved?", a: "First $L\\mathbf{y} = \\mathbf{b}$ (forward), then $U\\mathbf{x} = \\mathbf{y}$ (backward)." },
        { q: "Does every invertible matrix have an LU factorization without row swaps?", a: "No, e.g. $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$." },
      ],
    },
    {
      title: "Powers via $A = PDP^{-1}$, and block matrices",
      intuition:
        "If $A = PDP^{-1}$ with $D$ diagonal, then in $A^k$ every inner $P^{-1}P$ cancels, leaving $PD^kP^{-1}$, and powers of a diagonal matrix are just powers of its entries. Block matrices use the same idea of treating chunks like numbers, as long as you keep the order of multiplication.",
      keyIdeas: [
        "If $A = PDP^{-1}$ then $A^k = PD^kP^{-1}$ for every positive integer $k$ (and for negative $k$ if $D$ is invertible). (Which matrices factor this way is the topic of eigenvalues.)",
        "$D = \\operatorname{diag}(d_1,\\dots,d_n) \\Rightarrow D^k = \\operatorname{diag}(d_1^k,\\dots,d_n^k)$. If every $|d_i| \\le 1$, the limit of $D^k$ is easy to read off.",
        "$A = PDP^{-1}$ is invertible iff $D$ is (no zero diagonal entries), with $A^{-1} = PD^{-1}P^{-1}$.",
        "**Block (partitioned) matrices** multiply like ordinary matrices with the blocks as entries, provided the sizes match and the order inside each product is kept: $\\begin{bmatrix} A & B \\end{bmatrix}\\begin{bmatrix} C \\\\ D \\end{bmatrix} = AC + BD$.",
        "Block diagonal: $\\begin{bmatrix} A & 0 \\\\ 0 & D \\end{bmatrix}^{-1} = \\begin{bmatrix} A^{-1} & 0 \\\\ 0 & D^{-1} \\end{bmatrix}$. Block triangular: $\\begin{bmatrix} A & B \\\\ 0 & D \\end{bmatrix}^{-1} = \\begin{bmatrix} A^{-1} & -A^{-1}BD^{-1} \\\\ 0 & D^{-1} \\end{bmatrix}$.",
      ],
      formulas: [
        "A = PDP^{-1} \\;\\Rightarrow\\; A^k = PD^kP^{-1}",
        "\\begin{bmatrix} I & B \\\\ 0 & I \\end{bmatrix}^{k} = \\begin{bmatrix} I & kB \\\\ 0 & I \\end{bmatrix}\\ (k\\in\\mathbb{Z})",
      ],
      example: {
        problem:
          "(Tutorial 2 Q8) $A = PDP^{-1}$ with $D = \\operatorname{diag}(1, \\tfrac12, \\tfrac13)$. Find $A^2$, $A^3$ and a formula for $A^k$. Then, for $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $D = \\operatorname{diag}(2, 1)$, compute $A^3$.",
        steps: [
          "$A^2 = PDP^{-1}PDP^{-1} = PD^2P^{-1}$, $A^3 = PD^3P^{-1}$, and by induction $A^k = PD^kP^{-1} = P\\operatorname{diag}(1, \\tfrac1{2^k}, \\tfrac1{3^k})P^{-1}$.",
          "For the $2\\times2$ case: $P^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix}$ ($\\det P = 1$).",
          "$PD^3 = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} 8 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 8 & 1 \\\\ 8 & 2 \\end{bmatrix}$.",
          "$A^3 = \\begin{bmatrix} 8 & 1 \\\\ 8 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix} = \\begin{bmatrix} 15 & -7 \\\\ 14 & -6 \\end{bmatrix}$.",
        ],
        answer: "$A^k = P\\operatorname{diag}(1, 2^{-k}, 3^{-k})P^{-1}$; in the $2\\times2$ case $A^3 = \\begin{bmatrix} 15 & -7 \\\\ 14 & -6 \\end{bmatrix}$.",
      },
      pitfalls: [
        "$A^k = P^{-1}D^kP$ is the wrong order. Check against $k = 1$: it must give back $A = PDP^{-1}$.",
        "$A^k$ is **not** the matrix of the $k$th powers of the entries of $A$; only diagonal matrices power entrywise.",
        "Block products keep their order: $AC + BD$, never $CA + DB$.",
      ],
      recall: [
        { q: "$A = PDP^{-1}$ with $D = \\operatorname{diag}(1, -1)$. What is $A^{100}$?", a: "$PIP^{-1} = I$, because $D^{100} = I$." },
        { q: "$\\begin{bmatrix} I & B \\\\ 0 & I \\end{bmatrix}^{-1} = ?$", a: "$\\begin{bmatrix} I & -B \\\\ 0 & I \\end{bmatrix}$." },
        { q: "As $k\\to\\infty$, $A^k = P\\operatorname{diag}(1, 2^{-k})P^{-1}$ tends to?", a: "$P\\operatorname{diag}(1, 0)P^{-1}$." },
      ],
    },
  ],
  playbook: [
    "If you see a $2\\times2$ inverse → $\\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$; check $AA^{-1} = I$ on one entry before choosing an option.",
    "If you see $A^{-1}$ given and \"solve $A\\mathbf{x} = \\mathbf{b}$\" → just compute $A^{-1}\\mathbf{b}$. For $A^T\\mathbf{y} = \\mathbf{b}$ use $(A^{-1})^T\\mathbf{b}$.",
    "If you see the inverse of a product, transpose or scalar multiple → reverse the order, swap $T$ and $-1$ freely, invert the scalar.",
    "If you see \"solve for $X$\" → strip factors from the side they are on, collect $X$ terms and factor with $I$; justify each inverse you use.",
    "If you see $A^m = \\ldots$ with $A$ invertible and $B$ sandwiched → multiply by $A^{-k}$ on the left and on the right separately (e.g. $A^4 = ABA^2 + 2A^3 \\Rightarrow A = B + 2I$).",
    "If you see a polynomial identity like $A^2 + pA + qI = 0$ → factor $A(\\cdots) = -qI$; $q \\ne 0$ gives $A^{-1}$, $q = 0$ means \"cannot be determined\".",
    "If you see \"product is invertible, which must be invertible?\" → every square factor is invertible; sums inside a factor stay together ($A + B$, not $A$ and $B$).",
    "If you see an IMT statement → check whether $A$ is **square**. Square: all conditions rise and fall together. Non-square: independence (rank $= n$) and spanning (rank $= m$) are separate.",
    "If you see an elementary matrix → read entry $(i,j)$ as \"add that multiple of row $j$ to row $i$\"; its inverse flips the sign, its $m$th power multiplies the entry by $m$.",
    "If you see a list of row operations reducing $A$ to $I$ → $A^{-1}$ is the product in reverse listing order ($E_p\\cdots E_1$); $A$ is obtained by undoing them in reverse order.",
    "If you see $A^m = 0$ → $A$ is singular, and $(I - A)^{-1} = I + A + \\cdots + A^{m-1}$.",
    "If you see LU → multipliers into $L$ with their own sign (from updated rows), echelon form into $U$; solve $L\\mathbf{y} = \\mathbf{b}$ then $U\\mathbf{x} = \\mathbf{y}$.",
    "If you see $A = PDP^{-1}$ and a high power → $A^k = PD^kP^{-1}$; look for $D^k = D$ or $D^k = I$ shortcuts (entries $\\pm1$) and limits (entries less than 1 in size).",
    "If you see one solution plus a null space → all solutions are particular + homogeneous; test candidates by checking $\\mathbf{x} - \\mathbf{x}_1 \\in \\operatorname{Nul}A$.",
  ],
};
