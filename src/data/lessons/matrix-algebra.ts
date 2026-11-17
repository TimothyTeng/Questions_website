import type { Lesson } from "@/lib/types";

export const matrixAlgebraLesson: Lesson = {
  topic: "matrix-algebra",
  bigPicture:
    "Chapter 2 does algebra with whole matrices. The chain goes: multiplying by $B$ and then by $A$ is multiplying by the single matrix $AB$ → an invertible $A$ can be undone by $A^{-1}$, so $A\\mathbf{x} = \\mathbf{b}$ has the unique solution $\\mathbf{x} = A^{-1}\\mathbf{b}$ (Theorem 2.1) → inverses of products reverse the order (Theorem 2.2), which drives every \"solve for $X$\" question → each row operation is an elementary matrix, which is why the row operations that reduce $A$ to $I$ turn $I$ into $A^{-1}$ (Theorem 2.3) → the Invertible Matrix Theorem (Theorem 2.4) ties invertibility to pivots, $A\\mathbf{x} = \\mathbf{0}$, independent and spanning columns → the LU factorization stores the row reduction so that many systems $A\\mathbf{x} = \\mathbf{b}_1, \\dots, A\\mathbf{x} = \\mathbf{b}_p$ are solved cheaply. The rule behind almost every trap: **$AB \\ne BA$ in general**, so always multiply on the correct side.",
  sections: [
    {
      title: "Matrix multiplication as composition, and the inverse of a matrix",
      refs: [
        "Slides 2.1 Matrix Multiplication (alg p3–4)",
        "Slides 0B Inverse of a Matrix (mtx p13)",
        "Slides 2.2 Theorem 2.1 (alg p5)",
        "Slides 2.2 Invertible Linear Transformations (alg p12)",
      ],
      intuition:
        "Multiplying $\\mathbf{x}$ by $B$ and then by $A$ gives $A(B\\mathbf{x})$, and the slides show this is the same as multiplying once by $AB$. The inverse goes the other way: if $A$ sends $\\mathbf{x}$ to $A\\mathbf{x}$, then $A^{-1}$ transforms $A\\mathbf{x}$ back to $\\mathbf{x}$. That is exactly what solving $A\\mathbf{x} = \\mathbf{b}$ needs.",
      visuals: ["inverse-grid"],
      keyIdeas: [
        "**Composition**: $A(B\\mathbf{x}) = (AB)\\mathbf{x}$. Multiplication by $B$ and then by $A$ is represented by the single matrix $AB$ (note the order: $B$ acts first but is written on the right).",
        "**Definition** (mtx p13): if $A$ is square and a matrix $B$ can be constructed with $AB = BA = I$, then $A$ is **invertible** and $B$ is the **inverse** of $A$, written $A^{-1}$, so $AA^{-1} = A^{-1}A = I$. If no such matrix exists, $A$ is not invertible and is called **singular**.",
        "$2\\times2$ formula: $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is invertible if and only if $ad - bc \\ne 0$, and then $A^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$. The number $ad - bc$ is the **determinant** of $A$, written $|A|$ or $\\det(A)$.",
        "**Theorem 2.1**: if $A$ is an invertible $n\\times n$ matrix, then for each $\\mathbf{b}$ in $\\mathbb{R}^n$ the equation $A\\mathbf{x} = \\mathbf{b}$ has the **unique** solution $\\mathbf{x} = A^{-1}\\mathbf{b}$. (Exists: $A(A^{-1}\\mathbf{b}) = I\\mathbf{b} = \\mathbf{b}$. Unique: if $A\\mathbf{u} = \\mathbf{b}$, multiply by $A^{-1}$ to get $\\mathbf{u} = A^{-1}\\mathbf{b}$.)",
        "**Invertible linear transformations** (alg p12): multiplication by $A^{-1}$ transforms $A\\mathbf{x}$ back to $\\mathbf{x}$.",
      ],
      formulas: [
        "A(B\\mathbf{x}) = (AB)\\mathbf{x}",
        "A^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}\\quad (ad - bc \\ne 0)",
        "A\\mathbf{x} = \\mathbf{b} \\;\\Longrightarrow\\; \\mathbf{x} = A^{-1}\\mathbf{b}",
      ],
      example: {
        problem: "Let $A = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$. Find $A^{-1}$ and use Theorem 2.1 to solve $3x_1 + 5x_2 = 4$, $x_1 + 2x_2 = 1$.",
        steps: [
          "$ad - bc = 3\\cdot2 - 5\\cdot1 = 1 \\ne 0$, so $A$ is invertible.",
          "$A^{-1} = \\frac11\\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}$.",
          "Check the definition: $AA^{-1} = \\begin{bmatrix} 6-5 & -15+15 \\\\ 2-2 & -5+6 \\end{bmatrix} = I$ ✓.",
          "$\\mathbf{x} = A^{-1}\\mathbf{b} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix}$. Check: $9 - 5 = 4$, $3 - 2 = 1$ ✓.",
        ],
        answer: "$A^{-1} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}$ and $\\mathbf{x} = (3, -1)$, the only solution.",
      },
      pitfalls: [
        "In the $2\\times2$ formula, swap $a$ and $d$, negate $b$ and $c$, and divide by $ad - bc$. Negating the diagonal or forgetting to divide are the classic distractors.",
        "$A\\mathbf{b}$ is not the solution of $A\\mathbf{x} = \\mathbf{b}$; the solution is $A^{-1}\\mathbf{b}$.",
        "$A(B\\mathbf{x}) = (AB)\\mathbf{x}$, not $(BA)\\mathbf{x}$: in general $AB \\ne BA$ (mtx p10).",
      ],
      recall: [
        { q: "When is $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ invertible?", a: "Exactly when $ad - bc \\ne 0$." },
        { q: "$A$ is invertible $n\\times n$. How many solutions does $A\\mathbf{x} = \\mathbf{b}$ have?", a: "Exactly one, $\\mathbf{x} = A^{-1}\\mathbf{b}$, for every $\\mathbf{b}$ (Theorem 2.1)." },
        { q: "$\\mathbf{x}$ is multiplied first by $B$, then by $A$. Which single matrix does this?", a: "$AB$, since $A(B\\mathbf{x}) = (AB)\\mathbf{x}$." },
      ],
    },
    {
      title: "Theorem 2.2: inverses of inverses, products and transposes",
      refs: ["Slides 2.2 Theorem 2.2 (alg p6)", "Slides 0B Inverse of a Matrix (mtx p13)", "Tutorial 0B Q4", "PYP 2021–24 T/F: (A⁻¹)ᵀ = (Aᵀ)⁻¹"],
      intuition:
        "To undo \"apply $B$, then apply $A$\" you must undo $A$ first and $B$ second. That is why the inverse of a product reverses the order of the factors. The slides prove each part the same way: write down a candidate matrix $C$ and check that it multiplies the matrix to $I$ on both sides.",
      visuals: ["inverse-order"],
      keyIdeas: [
        "**Theorem 2.2.1**: if $A$ is invertible, then $A^{-1}$ is invertible and $(A^{-1})^{-1} = A$.",
        "**Theorem 2.2.2**: if $A$ and $B$ are $n\\times n$ invertible matrices, then so is $AB$, and $(AB)^{-1} = B^{-1}A^{-1}$. Proof: $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = I$, and similarly $(B^{-1}A^{-1})(AB) = I$.",
        "Applying 2.2.2 repeatedly: $(ABC)^{-1} = C^{-1}B^{-1}A^{-1}$ and $(A^2)^{-1} = (AA)^{-1} = A^{-1}A^{-1} = (A^{-1})^2$.",
        "**Theorem 2.2.3**: if $A$ is invertible, then so is $A^T$, and $(A^T)^{-1} = (A^{-1})^T$.",
        "Scalars (Tutorial 0B Q4): for $c \\ne 0$, $(cA)\\big(\\tfrac1c A^{-1}\\big) = I$, so $(cA)^{-1} = \\tfrac1c A^{-1}$. If $(cA)^{-1} = M$ is given, then $cA = M^{-1}$ and $A = \\tfrac1c M^{-1}$.",
      ],
      formulas: ["(A^{-1})^{-1} = A, \\qquad (AB)^{-1} = B^{-1}A^{-1}, \\qquad (A^T)^{-1} = (A^{-1})^T"],
      example: {
        problem:
          "$A^{-1} = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$ and $B^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}$. Find $(AB)^{-1}$ and $(A^T)^{-1}$.",
        steps: [
          "Theorem 2.2.2: $(AB)^{-1} = B^{-1}A^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$.",
          "The wrong order gives $A^{-1}B^{-1} = \\begin{bmatrix} 7 & 2 \\\\ 3 & 1 \\end{bmatrix}$, a different matrix.",
          "Theorem 2.2.3: $(A^T)^{-1} = (A^{-1})^T = \\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}$.",
        ],
        answer: "$(AB)^{-1} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}$ and $(A^T)^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}$. Neither needed $A$ or $B$ themselves.",
      },
      pitfalls: [
        "$(AB)^{-1} = A^{-1}B^{-1}$ is **false** in general: the order must reverse.",
        "$(2A)^{-1} = 2A^{-1}$ is false; the scalar is inverted too: $\\frac12A^{-1}$.",
        "Theorem 2.2 is about **products**. Knowing $A$ and $B$ are invertible tells you nothing about $A + B$ (e.g. $I + (-I) = 0$).",
      ],
      recall: [
        { q: "$(ABC)^{-1} = ?$", a: "$C^{-1}B^{-1}A^{-1}$ (Theorem 2.2.2 twice)." },
        { q: "$\\big((A^{-1})^T\\big)^{-1} = ?$", a: "$A^T$, by Theorem 2.2.3 and 2.2.1." },
        { q: "How do the slides prove $(AB)^{-1} = B^{-1}A^{-1}$?", a: "Take $C = B^{-1}A^{-1}$ and check $(AB)C = I$ and $C(AB) = I$." },
      ],
    },
    {
      title: "Solving matrix equations for $X$",
      refs: ["Tutorial 2 Q3", "PYP AY25/26 S2 Q5", "PYP 2021–24: A⁴ = ABA² + 2A³", "Slides 0B Properties of Matrix Multiplication (mtx p10)"],
      intuition:
        "Solve for $X$ as in ordinary algebra, with one extra rule: because $AB \\ne BA$ in general, a matrix can only be removed from the side it is on. Multiply by an inverse on the **left** to remove a left factor and on the **right** to remove a right factor.",
      keyIdeas: [
        "$AXB = C$ with $A$, $B$ invertible gives $X = A^{-1}CB^{-1}$ (left factor removed on the left, right factor on the right).",
        "Collect the $X$ terms on one side and factor with $I$: $AX - X = B$ becomes $(A - I)X = B$. Factor $X$ out on the side where it sits: $AX + CX = (A + C)X$ but $XA + XC = X(A + C)$.",
        "If one side is an inverse, invert both sides: $M^{-1} = N \\Rightarrow M = N^{-1}$ (Theorem 2.2.1).",
        "Before using the inverse of a matrix such as $A + B^{-1}$, **explain why it is invertible**, typically by writing it as a product of invertible matrices (Theorem 2.2.2). Tutorial 2 Q3 asks for exactly this.",
        "Cancelling needs an invertible factor: if $A$ is invertible, $AB = AC \\Rightarrow B = C$ (multiply by $A^{-1}$). Without that, $AB = 0$ does not imply $A = 0$ or $B = 0$ (mtx p10).",
      ],
      formulas: ["AXB = C \\;\\Rightarrow\\; X = A^{-1}CB^{-1}"],
      example: {
        problem:
          "(Tutorial 2 Q3) $A$, $B$, $X$ are $n\\times n$ with $A$, $X$ and $A - AX$ invertible, and $(A - AX)^{-1} = X^{-1}B$. Solve for $X$, explaining why every matrix you invert is invertible.",
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
        "$A^{-1}(X + Y)B = A^{-1}$: multiply by $A$ on the left and $B^{-1}$ on the right to get $X + Y = B^{-1}$, so $X = B^{-1} - Y$ (PYP AY25/26 S2 Q5).",
        "Write $(A - I)X$, never \"$(A - 1)X$\": a number cannot be subtracted from a matrix.",
      ],
      recall: [
        { q: "Solve $XA + B = C$ for $X$ ($A$ invertible).", a: "$X = (C - B)A^{-1}$ (multiply on the right)." },
        { q: "$A$ invertible and $A^4 = ABA^2 + 2A^3$. Express $B$.", a: "$A = B + 2I$, so $B = A - 2I$." },
        { q: "$AB = 0$ and $B \\ne 0$. Can $A$ be invertible?", a: "No: then $B = A^{-1}(AB) = 0$." },
      ],
    },
    {
      title: "Elementary matrices and finding $A^{-1}$ with row operations (Theorem 2.3)",
      refs: ["Slides 2.2 Elementary matrices, Exercises 2.2.1–2.2.2 (alg p7–8)", "Slides 2.2 Theorem 2.3, Exercise 2.2.3 (alg p9)", "PYP 2021–24 T/F: E adds 3·row 1 to row 2, E²"],
      intuition:
        "Every elementary row operation is a matrix: do the operation to $I$ and you get the elementary matrix $E$, and $EA$ performs the same operation on $A$. Row reducing $A$ to $I$ is therefore multiplying by a string of elementary matrices, and running the same operations on $I$ records that product, which is $A^{-1}$.",
      visuals: ["gauss-jordan-2x2"],
      keyIdeas: [
        "**Definition**: an **elementary matrix** is one obtained by performing a single elementary row operation on an identity matrix (e.g. $r3 \\leftarrow r3 - 4r1$, swapping rows 1 and 2, or multiplying row 3 by 5).",
        "If an elementary row operation is performed on an $m\\times n$ matrix $A$, the result is $EA$, where the $m\\times m$ matrix $E$ is made by performing the same row operation on $I_m$.",
        "Each elementary matrix $E$ is invertible; $E^{-1}$ is the elementary matrix **of the same type** that transforms $E$ back into $I$: for $r3 \\leftarrow r3 - 4r1$ it is $r3 \\leftarrow r3 + 4r1$; a swap undoes itself; multiplying a row by $5$ is undone by multiplying it by $\\tfrac15$.",
        "Operations applied in the order $E_1, E_2, \\dots, E_p$ give $E_p\\cdots E_2E_1A$: the first operation sits next to $A$. Repeating a replacement adds the multiple again: if $E$ adds $3\\times$row 1 to row 2, then $E^2$ adds $6\\times$row 1.",
        "**Theorem 2.3**: an $n\\times n$ matrix $A$ is invertible if and only if $A$ is row equivalent to $I_n$, and in this case any sequence of elementary row operations that reduces $A$ to $I_n$ also transforms $I_n$ to $A^{-1}$. In practice: row reduce $[A \\;\\; I]$; if the left block becomes $I$, the right block is $A^{-1}$; if the left block cannot reach $I$, $A$ is not invertible.",
        "In matrix form: $E_p\\cdots E_1A = I$ gives $A^{-1} = E_p\\cdots E_1$, and (Theorem 2.2.2) $A = (E_p\\cdots E_1)^{-1} = E_1^{-1}\\cdots E_p^{-1}$.",
      ],
      formulas: [
        "\\begin{bmatrix} A & I \\end{bmatrix} \\sim \\begin{bmatrix} I & A^{-1} \\end{bmatrix}",
        "E_p\\cdots E_2E_1A = I \\;\\Rightarrow\\; A^{-1} = E_p\\cdots E_1",
      ],
      example: {
        problem: "(Exercise 2.2.3) Find the inverse of $A = \\begin{bmatrix} 0 & 1 & 2 \\\\ 1 & 0 & 3 \\\\ 4 & -3 & 8 \\end{bmatrix}$ using elementary row operations.",
        steps: [
          "Row reduce $[A \\;\\; I]$. $r1 \\leftrightarrow r2$: rows $[1, 0, 3 \\mid 0, 1, 0]$, $[0, 1, 2 \\mid 1, 0, 0]$, $[4, -3, 8 \\mid 0, 0, 1]$.",
          "$r3 \\leftarrow r3 - 4r1$: $[0, -3, -4 \\mid 0, -4, 1]$. Then $r3 \\leftarrow r3 + 3r2$: $[0, 0, 2 \\mid 3, -4, 1]$. Then $r3 \\leftarrow \\tfrac12 r3$: $[0, 0, 1 \\mid \\tfrac32, -2, \\tfrac12]$ (three pivots, so $A \\sim I_3$).",
          "$r2 \\leftarrow r2 - 2r3$: $[0, 1, 0 \\mid -2, 4, -1]$. $r1 \\leftarrow r1 - 3r3$: $[1, 0, 0 \\mid -\\tfrac92, 7, -\\tfrac32]$.",
          "Check: row 3 of $A$ times column 1 of the result: $4(-\\tfrac92) - 3(-2) + 8(\\tfrac32) = -18 + 6 + 12 = 0$ ✓.",
        ],
        answer: "$A^{-1} = \\begin{bmatrix} -9/2 & 7 & -3/2 \\\\ -2 & 4 & -1 \\\\ 3/2 & -2 & 1/2 \\end{bmatrix}$.",
      },
      pitfalls: [
        "$E$ adds $3\\times$row 1 to row 2 ⇒ $E^2$ adds $6\\times$row 1, not $9\\times$row 1 (a past-paper True/False).",
        "If $E_1, E_2, E_3$ are applied in that order, the product is $E_3E_2E_1$, not $E_1E_2E_3$.",
        "The inverse of the replacement $r3 \\leftarrow r3 - 4r1$ changes only the **sign** of the $-4$; it is not $-\\tfrac14$ and it does not move to position $(1,3)$.",
      ],
      recall: [
        { q: "What is the inverse of the elementary matrix for $r3 \\leftarrow r3 - 4r1$?", a: "The matrix for $r3 \\leftarrow r3 + 4r1$: same position, opposite sign (Exercise 2.2.2)." },
        { q: "$E_2$ swaps rows 1 and 2 of $I_3$. What is $E_2^{-1}$?", a: "$E_2$ itself: swapping again restores $I$." },
        { q: "What does Theorem 2.3 say?", a: "$A$ is invertible iff $A \\sim I_n$, and the row operations taking $A$ to $I_n$ take $I_n$ to $A^{-1}$." },
      ],
    },
    {
      title: "The Invertible Matrix Theorem (Theorem 2.4, continued in Theorem 4.9)",
      refs: [
        "Slides 2.2 Theorem 2.4 (alg p10; repeated vsp p67)",
        "Slides 2.2 Theorem 1.2 recalled (alg p11)",
        "Slides 4.14 Theorem 4.9 (vsp p66)",
        "Tutorial 2 Q1, Q2, Q5, Q6",
        "PYP AY25/26 S2 Q6",
        "PYP 2021–24 T/F: A² invertible ⇒ A invertible; a1 − 3a2 + 5a3 = 0 ⇒ A singular",
      ],
      intuition:
        "For a **square** matrix, one piece of evidence settles everything: the statements of the theorem are either all true or all false. So showing $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, or finding a $C$ with $CA = I$, already proves $A$ is invertible.",
      keyIdeas: [
        "**Theorem 2.4** ($A$ is $n\\times n$). The following are equivalent: (1) $A$ is invertible; (2) $A$ is row equivalent to $I_n$; (3) $A$ has $n$ pivot positions; (4) $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution; (5) the columns of $A$ form a linearly independent set; (6) $A\\mathbf{x} = \\mathbf{b}$ has at least one solution for each $\\mathbf{b}$ in $\\mathbb{R}^n$; (7) the columns of $A$ span $\\mathbb{R}^n$; (8) there is an $n\\times n$ $C$ with $CA = I$; (9) there is an $n\\times n$ $D$ with $AD = I$; (10) $A^T$ is invertible.",
        "**Theorem 4.9** (continued): also equivalent are (11) the columns of $A$ form a basis for $\\mathbb{R}^n$; (12) $\\mathbf{C}(A) = \\mathbb{R}^n$; (13) $\\dim \\mathbf{C}(A) = n$; (14) rank of $A = n$; (15) $\\mathbf{N}(A) = \\{\\mathbf{0}\\}$; (16) $\\dim \\mathbf{N}(A) = 0$.",
        "**Theorem 1.2** (recalled on alg p11, any $m\\times n$ $A$): $A\\mathbf{x} = \\mathbf{b}$ has a solution for each $\\mathbf{b}$ in $\\mathbb{R}^m$ ⇔ each $\\mathbf{b}$ is a linear combination of the columns ⇔ the columns span $\\mathbb{R}^m$ ⇔ $A$ has a pivot position in every row. Theorem 2.4 is for **square** matrices only.",
        "**One-sided inverses** (8), (9): for square matrices, $AB = I$ already means $A$ and $B$ are invertible, $B = A^{-1}$ and $BA = I$.",
        "**Products** (Tutorial 2 Q2): if $A$, $B$ are $n\\times n$ and $AB$ is invertible, then $A\\big(B(AB)^{-1}\\big) = I$ and $\\big((AB)^{-1}A\\big)B = I$, so by (9) and (8) both $A$ and $B$ are invertible. Hence $A^2(B + C)$ invertible ⇒ $A$ and $B + C$ invertible (nothing about $B$ or $C$ alone); $A^2$ invertible ⇒ $A$ invertible.",
        "**Columns of $AB$** (Tutorial 2 Q1): if the columns of $B$ are dependent, some $\\mathbf{x} \\ne \\mathbf{0}$ has $B\\mathbf{x} = \\mathbf{0}$, so $(AB)\\mathbf{x} = \\mathbf{0}$ and the columns of $AB$ are dependent too.",
      ],
      formulas: ["AB = I\\ (A, B\\ n\\times n) \\;\\Longrightarrow\\; B = A^{-1},\\ BA = I"],
      example: {
        problem:
          "(Tutorial 2 Q5, Q6) $A$ is $n\\times n$ with linearly independent columns. Show that the columns of $A^2$ span $\\mathbb{R}^n$, and that $A\\mathbf{x} = \\mathbf{b}$ has a solution for each $\\mathbf{b}$.",
        steps: [
          "Independent columns is statement (5), so by Theorem 2.4 $A$ is invertible (1).",
          "$A^2 = AA$ is a product of invertible matrices, hence invertible (Theorem 2.2.2).",
          "Applying Theorem 2.4 to $A^2$: (1) ⇒ (7), the columns of $A^2$ span $\\mathbb{R}^n$.",
          "For $A$: (1) ⇒ (6), or directly $\\mathbf{x} = A^{-1}\\mathbf{b}$ solves $A\\mathbf{x} = \\mathbf{b}$ (Theorem 2.1).",
        ],
        answer: "Both follow from \"$A$ square with independent columns ⇒ $A$ invertible\".",
      },
      pitfalls: [
        "\"$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution ⇒ $A\\mathbf{x} = \\mathbf{b}$ always solvable\" needs $A$ **square**. With an unknown $m\\times n$ shape the answer is \"cannot be determined\".",
        "A relation such as $\\mathbf{a}_1 - 3\\mathbf{a}_2 + 5\\mathbf{a}_3 = \\mathbf{0}$ among the columns of a $3\\times3$ $A$ means the columns are dependent, so (5) fails and $A$ is singular.",
        "\"$A^2(B + C)$ invertible\" says nothing about $B$ or $C$ separately: only the factor $B + C$ is known to be invertible.",
      ],
      recall: [
        { q: "$A$ is $5\\times5$ and $A\\mathbf{x} = \\mathbf{0}$ has a nontrivial solution. Can $A\\mathbf{x} = \\mathbf{b}$ be solvable for every $\\mathbf{b}$?", a: "No. (4) fails, so all statements fail, including (6)." },
        { q: "$(A + B)C^2$ is invertible ($n\\times n$). Which matrices must be invertible?", a: "$A + B$ and $C$. Nothing follows for $A$ or $B$ separately." },
        { q: "$A$ is $n\\times n$ with $\\dim\\mathbf{N}(A) = 0$. Is $\\mathbf{C}(A) = \\mathbb{R}^n$?", a: "Yes: (16) and (12) are both equivalent to $A$ invertible." },
      ],
    },
    {
      title: "Powers of $A$, nilpotent matrices and the structure of solutions",
      refs: ["Tutorial 2 Q4a, Q4b", "PYP 2021–24: A^m = 0 ⇒ I − A invertible", "Slides 0B Inverse of a Matrix (mtx p13)"],
      intuition:
        "Two tutorial facts and one past-paper fact. If $A$ never sends a nonzero vector to $\\mathbf{0}$, neither does $A$ applied $k$ times. Every solution of $A\\mathbf{x} = \\mathbf{b}$ is one fixed solution plus a solution of $A\\mathbf{x} = \\mathbf{0}$. And if $A^m = 0$, then $I - A$ has an inverse you can write down and check with the definition $MN = NM = I$.",
      keyIdeas: [
        "**Tutorial 2 Q4a**: if $A$ is $n\\times n$ and $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, then so does $A^k\\mathbf{x} = \\mathbf{0}$ for every positive integer $k$ ($A$ is invertible by Theorem 2.4, so $A^k$ is invertible by Theorem 2.2.2).",
        "**Tutorial 2 Q4b** (structure of solutions): if $\\mathbf{x}_1$ is a fixed solution of a consistent $A\\mathbf{x} = \\mathbf{b}$, then every solution is $\\mathbf{x} = \\mathbf{x}_1 + \\mathbf{x}_0$ where $A\\mathbf{x}_0 = \\mathbf{0}$, because $A(\\mathbf{x} - \\mathbf{x}_1) = \\mathbf{b} - \\mathbf{b} = \\mathbf{0}$.",
        "**Nilpotent** (past paper): if $A^m = 0$ then $(I - A)(I + A + A^2 + \\cdots + A^{m-1}) = I - A^m = I$, and the product in the other order is also $I$, so $I - A$ is invertible with that inverse (definition, mtx p13).",
        "If $A^m = 0$ then $A$ itself is **not** invertible: otherwise $A^m$ would be a product of invertible matrices, but $A^m = 0$.",
      ],
      formulas: [
        "A^m = 0 \\;\\Rightarrow\\; (I - A)^{-1} = I + A + A^2 + \\cdots + A^{m-1}",
        "A\\mathbf{x} = \\mathbf{b}:\\quad \\mathbf{x} = \\mathbf{x}_1 + \\mathbf{x}_0,\\quad A\\mathbf{x}_0 = \\mathbf{0}",
      ],
      example: {
        problem: "Let $N = \\begin{bmatrix} 0 & 2 & 3 \\\\ 0 & 0 & 4 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Show that $I - N$ is invertible and find its inverse.",
        steps: [
          "Compute powers: $N^2 = \\begin{bmatrix} 0 & 0 & 8 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ and $N^3 = N^2N = 0$.",
          "With $m = 3$: $(I - N)(I + N + N^2) = I - N^3 = I$, so $(I - N)^{-1} = I + N + N^2$.",
          "$I + N + N^2 = \\begin{bmatrix} 1 & 2 & 3 + 8 \\\\ 0 & 1 & 4 \\\\ 0 & 0 & 1 \\end{bmatrix}$. Check the $(1,3)$ entry of $(I - N)(I + N + N^2)$: $1\\cdot11 + (-2)\\cdot4 + (-3)\\cdot1 = 0$ ✓.",
        ],
        answer: "$(I - N)^{-1} = \\begin{bmatrix} 1 & 2 & 11 \\\\ 0 & 1 & 4 \\\\ 0 & 0 & 1 \\end{bmatrix}$.",
      },
      pitfalls: [
        "Forgetting the last term ($N^2$ above) of $I + A + \\cdots + A^{m-1}$ is the standard distractor.",
        "$A^2 = 0$ does not force $A = 0$, e.g. $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ (compare $AB = 0 \\not\\Rightarrow A = 0$ or $B = 0$, mtx p10).",
        "A solution of $A\\mathbf{x} = \\mathbf{0}$ is not itself a solution of $A\\mathbf{x} = \\mathbf{b}$ when $\\mathbf{b} \\ne \\mathbf{0}$; add it to a fixed solution.",
      ],
      recall: [
        { q: "$A^4 = 0$. What is $(I - A)^{-1}$?", a: "$I + A + A^2 + A^3$." },
        { q: "Can $A$ be invertible if $A^5 = 0$?", a: "No: $A^5$ would then be invertible, but it is $0$." },
        { q: "$\\mathbf{p}$ solves $A\\mathbf{x} = \\mathbf{b}$ and $A\\mathbf{v} = \\mathbf{0}$. Name another solution.", a: "$\\mathbf{p} + \\mathbf{v}$ (Tutorial 2 Q4b)." },
      ],
    },
    {
      title: "LU factorization",
      refs: [
        "Slides 2.3 Matrix Factorizations (alg p13)",
        "Slides 2.3.1 The LU factorization, Exercise 2.3.1 (alg p14–17)",
        "Slides 2.3.2 LU factorization procedure, Exercise 2.3.2 (alg p18–21)",
        "Tutorial 2 Q7",
        "PYP 2021–24: LU of a 3×4 matrix; solve with LU",
      ],
      intuition:
        "If you must solve $A\\mathbf{x} = \\mathbf{b}_1, A\\mathbf{x} = \\mathbf{b}_2, \\dots, A\\mathbf{x} = \\mathbf{b}_p$, computing $A^{-1}$ is inefficient. Instead factor $A = LU$ once: $U$ is an echelon form of $A$, and $L$ records the row reduction. Each new $\\mathbf{b}$ then needs two easy triangular solves.",
      keyIdeas: [
        "$A_{m\\times n} = L_{m\\times m}U_{m\\times n}$ with $L$ **unit lower triangular** (1s on the diagonal) and $U$ an **echelon form** of $A$ (upper triangular). **Assumption**: $A$ can be reduced to echelon form **without row interchanges**.",
        "**Solving** $A\\mathbf{x} = \\mathbf{b}$: $LU\\mathbf{x} = \\mathbf{b}$; let $\\mathbf{y} = U\\mathbf{x}$. Solve $L\\mathbf{y} = \\mathbf{b}$ for $\\mathbf{y}$ (**forward substitution**), then $U\\mathbf{x} = \\mathbf{y}$ for $\\mathbf{x}$ (**backward substitution**). Both are easy because $L$ and $U$ are triangular.",
        "**Procedure**: there are unit lower triangular elementary matrices with $E_p\\cdots E_1A = U$, so $A = (E_p\\cdots E_1)^{-1}U = LU$ with $L = (E_p\\cdots E_1)^{-1}$; the same row operations reduce $L$ to $I$. Row reduction of $A$ to $U$ produces $L$ without extra work.",
        "**Building $L$** (alg p20): at each pivot column, take the entries from the pivot down (the circled entries), divide them by the pivot and place the result into that column of $L$. Later columns use the entries of the **current** (already reduced) matrix.",
        "**Alternately** (alg p21): $L = E_{21}^{-1}E_{31}^{-1}E_{32}^{-1}$; just put the nonzero off-diagonal elements of these inverse elementary matrices into the appropriate positions of $L$.",
      ],
      formulas: [
        "A = LU,\\qquad L\\mathbf{y} = \\mathbf{b}\\ (\\text{forward}),\\qquad U\\mathbf{x} = \\mathbf{y}\\ (\\text{backward})",
        "E_p\\cdots E_1A = U \\;\\Rightarrow\\; L = (E_p\\cdots E_1)^{-1}",
      ],
      example: {
        problem:
          "(Tutorial 2 Q7) $A = \\begin{bmatrix} 2 & -2 & 4 \\\\ 1 & -3 & 1 \\\\ 3 & 7 & 5 \\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix} 0 \\\\ -5 \\\\ 7 \\end{bmatrix}$. Find $A = LU$ and solve $A\\mathbf{x} = \\mathbf{b}$.",
        steps: [
          "Column 1: circled entries $2, 1, 3$, pivot $2$ → $1, \\tfrac12, \\tfrac32$ in column 1 of $L$. $r2 \\leftarrow r2 - \\tfrac12 r1$ gives $[0, -2, -1]$; $r3 \\leftarrow r3 - \\tfrac32 r1$ gives $[0, 10, -1]$.",
          "Column 2: circled entries $-2, 10$, pivot $-2$ → $1, -5$ in column 2 of $L$. $r3 \\leftarrow r3 + 5r2$ gives $[0, 0, -6]$.",
          "$L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1/2 & 1 & 0 \\\\ 3/2 & -5 & 1 \\end{bmatrix}$, $U = \\begin{bmatrix} 2 & -2 & 4 \\\\ 0 & -2 & -1 \\\\ 0 & 0 & -6 \\end{bmatrix}$ (as given in the tutorial).",
          "Forward substitution, $L\\mathbf{y} = \\mathbf{b}$: $y_1 = 0$, $\\tfrac12 y_1 + y_2 = -5 \\Rightarrow y_2 = -5$, $\\tfrac32 y_1 - 5y_2 + y_3 = 7 \\Rightarrow y_3 = -18$.",
          "Backward substitution, $U\\mathbf{x} = \\mathbf{y}$: $-6x_3 = -18 \\Rightarrow x_3 = 3$; $-2x_2 - 3 = -5 \\Rightarrow x_2 = 1$; $2x_1 - 2 + 12 = 0 \\Rightarrow x_1 = -5$.",
        ],
        answer: "$\\mathbf{x} = (-5, 1, 3)$, the tutorial answer. Check: $2(-5) - 2(1) + 4(3) = 0$ ✓.",
      },
      pitfalls: [
        "The entry placed in $L$ is (circled entry)/(pivot) with its **own sign**: $r2 \\leftarrow r2 - 3r1$ puts $+3$ in $L$, the entry of $E_{21}^{-1}$, not the $-3$ of $E_{21}$.",
        "Computing the column 2 entries of $L$ from the original matrix instead of the reduced one.",
        "Stopping after $L\\mathbf{y} = \\mathbf{b}$: $\\mathbf{y}$ is an intermediate vector, not the answer.",
      ],
      recall: [
        { q: "What goes into $L$ when you do $r3 \\leftarrow r3 - 4r1$?", a: "$4$ in position $(3,1)$." },
        { q: "In what order are the two triangular systems solved?", a: "First $L\\mathbf{y} = \\mathbf{b}$ (forward), then $U\\mathbf{x} = \\mathbf{y}$ (backward)." },
        { q: "What size are $L$ and $U$ for a $3\\times4$ matrix $A$?", a: "$L$ is $3\\times3$ (unit lower triangular), $U$ is $3\\times4$ (echelon form)." },
      ],
    },
    {
      title: "When row interchanges are needed ($PA = LU$), and why LU saves work",
      refs: ["Slides 2.3 Exercise 2.3.3 (alg p21–22)", "Slides 2.3 Exercise 2.3.1 operation counts (alg p16–17)", "Slides 2.3 summary of flops (alg p22)"],
      intuition:
        "Sometimes a zero appears in a pivot position and a row swap is unavoidable. Doing the swap first with a permutation matrix $P$ puts the rows in a workable order, and then $PA$ has an ordinary LU factorization.",
      keyIdeas: [
        "If the assumption fails (a row interchange is needed), use a **permutation matrix**, e.g. $P = P_{23} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 1 & 0 \\end{bmatrix}$ switches rows 2 and 3.",
        "**Summary** (alg p22): for every $n\\times n$ matrix $A$ there exists a permutation matrix $P$ such that $PA = LU$, where $L$ is lower triangular with all diagonal entries equal to 1 and $U$ is upper triangular.",
        "Exercise 2.3.1 ($4\\times4$): solving through $LU$ takes 28 arithmetic operations (\"flops\"), excluding the cost of the factorization, against 62 flops for row reducing $[A \\;\\; \\mathbf{b}]$ to $[I \\;\\; \\mathbf{x}]$.",
        "For an $n\\times n$ dense matrix with $n$ moderately large (say $n \\ge 30$): LU factorization about $2n^3/3$ flops; finding $A^{-1}$ about $2n^3$ flops; solving $L\\mathbf{y} = \\mathbf{b}$ and $U\\mathbf{x} = \\mathbf{y}$: $2n^2$ flops; multiplying $\\mathbf{b}$ by $A^{-1}$: about $2n^2$ flops.",
      ],
      formulas: ["PA = LU", "\\text{LU} \\approx \\tfrac{2n^3}{3},\\quad A^{-1} \\approx 2n^3,\\quad L\\mathbf{y} = \\mathbf{b},\\ U\\mathbf{x} = \\mathbf{y}:\\ 2n^2 \\text{ flops}"],
      example: {
        problem: "(Exercise 2.3.3) $A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & -1 \\\\ 2 & -1 & -1 \\end{bmatrix}$. Find $P$, $L$, $U$ with $PA = LU$.",
        steps: [
          "$r2 \\leftarrow r2 - r1$, $r3 \\leftarrow r3 - 2r1$ give $\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 0 & -2 \\\\ 0 & -3 & -3 \\end{bmatrix}$: the $(2,2)$ pivot position holds $0$, so $A$ cannot be reduced without a row interchange.",
          "Switch rows 2 and 3 first: $P = P_{23}$ and $PA = \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & -1 & -1 \\\\ 1 & 1 & -1 \\end{bmatrix}$.",
          "Reduce $PA$: circled entries $1, 2, 1$ with pivot $1$ give column 1 of $L$ = $(1, 2, 1)$; $r2 \\leftarrow r2 - 2r1$, $r3 \\leftarrow r3 - r1$ give rows $[0, -3, -3]$, $[0, 0, -2]$, already echelon, so the $(3,2)$ entry of $L$ is $0/(-3) = 0$.",
        ],
        answer: "$PA = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 1 & 0 & 1 \\end{bmatrix}\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & -3 & -3 \\\\ 0 & 0 & -2 \\end{bmatrix} = LU$ with $P = P_{23}$.",
      },
      pitfalls: [
        "Writing $A = LU$ for a matrix that needed a row swap: the factorization is of $PA$, not of $A$.",
        "Computing $A^{-1}$ to solve many systems is the **inefficient** method on the slides (about $2n^3$ flops versus $2n^3/3$ for LU).",
      ],
      recall: [
        { q: "What does $P_{23}$ do when multiplied on the left?", a: "It switches rows 2 and 3." },
        { q: "About how many flops does an LU factorization of a large dense $n\\times n$ matrix cost? Finding $A^{-1}$?", a: "About $2n^3/3$; about $2n^3$." },
        { q: "Once $L$ and $U$ are known, what does each new $\\mathbf{b}$ cost?", a: "$2n^2$ flops for $L\\mathbf{y} = \\mathbf{b}$ and $U\\mathbf{x} = \\mathbf{y}$." },
      ],
    },
    {
      title: "Spectral factorization $A = PDP^{-1}$ and powers of $A$",
      refs: ["Tutorial 2 Q8"],
      intuition:
        "If $A = PDP^{-1}$ with $D$ diagonal, then in $A^k$ every inner $P^{-1}P$ cancels, leaving $PD^kP^{-1}$, and a power of a diagonal matrix is just the powers of its diagonal entries. The tutorial says this factorization is useful when computing high powers of $A$.",
      keyIdeas: [
        "$A^2 = PDP^{-1}PDP^{-1} = PD^2P^{-1}$, $A^3 = PD^3P^{-1}$, and in general $A^k = PD^kP^{-1}$ for every positive integer $k$.",
        "For $D = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1/2 & 0 \\\\ 0 & 0 & 1/3 \\end{bmatrix}$: $D^k = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1/2^k & 0 \\\\ 0 & 0 & 1/3^k \\end{bmatrix}$, so $A^k = P\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1/2^k & 0 \\\\ 0 & 0 & 1/3^k \\end{bmatrix}P^{-1}$.",
      ],
      formulas: ["A = PDP^{-1} \\;\\Rightarrow\\; A^k = PD^kP^{-1}"],
      example: {
        problem: "$A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}$. Compute $A^3$.",
        steps: [
          "$A^3 = PD^3P^{-1}$ with $D^3 = \\begin{bmatrix} 8 & 0 \\\\ 0 & 1 \\end{bmatrix}$.",
          "$P^{-1} = \\frac{1}{2 - 1}\\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix} = \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix}$.",
          "$PD^3 = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} 8 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 8 & 1 \\\\ 8 & 2 \\end{bmatrix}$.",
          "$A^3 = \\begin{bmatrix} 8 & 1 \\\\ 8 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix} = \\begin{bmatrix} 15 & -7 \\\\ 14 & -6 \\end{bmatrix}$.",
        ],
        answer: "$A^3 = \\begin{bmatrix} 15 & -7 \\\\ 14 & -6 \\end{bmatrix}$.",
      },
      pitfalls: [
        "$A^k = P^{-1}D^kP$ is the wrong order. Check against $k = 1$: it must give back $A = PDP^{-1}$.",
        "$A^k$ is **not** the matrix of $k$th powers of the entries of $A$; only the diagonal matrix $D$ is powered entry by entry.",
      ],
      recall: [
        { q: "$A = PDP^{-1}$. What is $A^k$?", a: "$PD^kP^{-1}$." },
        { q: "$A = PDP^{-1}$ with $D = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$. What is $A^{100}$?", a: "$PIP^{-1} = I$, because $D^{100} = I$." },
      ],
    },
  ],
  playbook: [
    "If you see a $2\\times2$ inverse → $\\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$; check $AA^{-1} = I$ on one entry before choosing an option.",
    "If you see $A^{-1}$ given and \"solve $A\\mathbf{x} = \\mathbf{b}$\" → $\\mathbf{x} = A^{-1}\\mathbf{b}$ (Theorem 2.1). For $A^T\\mathbf{y} = \\mathbf{b}$ use $(A^T)^{-1} = (A^{-1})^T$.",
    "If you see the inverse of a product, transpose or scalar multiple → reverse the order, $(A^T)^{-1} = (A^{-1})^T$, invert the scalar (Theorem 2.2).",
    "If you see \"solve for $X$\" → strip each factor from the side it is on, collect $X$ terms and factor with $I$; explain why each inverse you use exists.",
    "If you see $A^m = \\ldots$ with $A$ invertible and $B$ sandwiched → multiply by powers of $A^{-1}$ on the left and on the right separately (e.g. $A^4 = ABA^2 + 2A^3 \\Rightarrow A = B + 2I$).",
    "If you see \"a product is invertible, which must be invertible?\" → every square factor is invertible (Theorem 2.4 (8), (9)); a sum inside a factor stays together ($B + C$, not $B$ and $C$).",
    "If you see a statement about a square matrix → it is either equivalent to \"$A$ invertible\" (Theorems 2.4, 4.9) or not. If $A$ is not square → Theorem 2.4 does not apply; use pivots (Theorem 1.2 for spanning).",
    "If you see an elementary matrix → do the row operation to $I$; its inverse is the same type of operation reversed; repeating a replacement multiplies the multiple ($E^m$ adds $m$ times as much).",
    "If you see a list of row operations reducing $A$ to $I$ → $A^{-1} = E_p\\cdots E_1$ (Theorem 2.3) and $A = E_1^{-1}\\cdots E_p^{-1}$.",
    "If you see $A^m = 0$ → $A$ is singular, and $(I - A)^{-1} = I + A + \\cdots + A^{m-1}$.",
    "If you see LU → divide the circled entries by the pivot to fill $L$, echelon form into $U$; solve $L\\mathbf{y} = \\mathbf{b}$ (forward) then $U\\mathbf{x} = \\mathbf{y}$ (backward). A zero pivot needing a swap → $PA = LU$.",
    "If you see $A = PDP^{-1}$ and a power → $A^k = PD^kP^{-1}$; look for $D^k = D$ or $D^k = I$ shortcuts (diagonal entries $\\pm1$).",
    "If you see one solution plus the solutions of $A\\mathbf{x} = \\mathbf{0}$ → all solutions are $\\mathbf{x}_1 + \\mathbf{x}_0$ (Tutorial 2 Q4b); test candidates by checking that $\\mathbf{x} - \\mathbf{x}_1$ solves $A\\mathbf{x} = \\mathbf{0}$.",
  ],
};
