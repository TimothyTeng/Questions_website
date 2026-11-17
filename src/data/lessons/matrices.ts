import type { Lesson } from "@/lib/types";

export const matricesLesson: Lesson = {
  topic: "matrices",
  bigPicture:
    "A matrix is a rectangular array of numbers, and the rest of the course is written with it ($A\\mathbf{x} = \\mathbf{b}$, standard matrices, $N(A)$, $C(A)$, ...). This chapter (0B) is the toolkit. First the bookkeeping: size, entries $a_{ij}$, equality, sums and scalar multiples, all done entry by entry. Then the terminology for square matrices (main diagonal, trace, diagonal and identity matrices) and the transpose, with symmetric and skew-symmetric matrices. Then the one operation that is **not** entry by entry: the product $AB$, which can be computed entry by entry, column by column or row by row, and $A\\mathbf{x}$ is a linear combination of the columns of $A$. The product is associative and distributive, but $AB \\ne BA$ in general and $AB = 0$ does not force $A = 0$ or $B = 0$. The chapter ends with the inverse of a matrix and the $2\\times2$ inverse formula.",
  sections: [
    {
      title: "Notation, equality, sums and scalar multiples",
      refs: ["Slides 0B I. Matrix Notation and Terminology (mtx p4)", "Slides 0B II. Operations on Matrices (mtx p7–8)", "PYP AY25/26 S1 Q7 ($a_{ij} = i + j$)"],
      intuition:
        "A matrix is a table: its size is (rows) × (columns), and $a_{ij}$ is the entry in row $i$, column $j$. Equality, addition, subtraction and multiplication by a scalar all work entry by entry, so they behave exactly like arithmetic with numbers.",
      keyIdeas: [
        "An $m\\times n$ matrix $A = [a_{ij}]$ has $m$ rows and $n$ columns; $a_{ij}$ is the element in the $i^{th}$ row and $j^{th}$ column. A matrix with only one column (row) is a **column (row) vector**. A matrix with $n$ rows and $n$ columns is a **square matrix of order $n$**, and $a_{11}, a_{22}, \\dots, a_{nn}$ lie on its **main (leading) diagonal**.",
        "A matrix can be given by a rule $a_{ij} = f(i,j)$, e.g. $a_{ij} = i + j$. Build it one row at a time: fix $i$, run $j = 1, \\dots, n$.",
        "**Equality**: $A = B$ when they have the **same size** and $a_{ij} = b_{ij}$ for every $i, j$. Matching entries turns one matrix equation into several scalar equations.",
        "**Sum / difference**: $A \\pm B$ (same size only) has entries $a_{ij} \\pm b_{ij}$. **Scalar multiple**: $sA$ multiplies every entry by $s$; $(-1)B$ is written $-B$.",
        "Properties: $A + B = B + A$, $A + (B + C) = (A + B) + C$, $(s + q)A = sA + qA$, $q(sA) = (qs)A$, $s(A + B) = sA + sB$.",
      ],
      formulas: ["A + B = [a_{ij} + b_{ij}], \\qquad sA = [s\\,a_{ij}]"],
      example: {
        problem:
          "$A = [a_{ij}]$ and $B = [b_{ij}]$ are $2\\times3$ with $a_{ij} = 2i - j$ and $b_{ij} = (-1)^{i+j}$. Find $3A - 2B$.",
        steps: [
          "Row 1 of $A$ ($i = 1$): $2-1,\\ 2-2,\\ 2-3 = 1, 0, -1$. Row 2 ($i = 2$): $4-1,\\ 4-2,\\ 4-3 = 3, 2, 1$. So $A = \\begin{bmatrix}1&0&-1\\\\3&2&1\\end{bmatrix}$.",
          "$(-1)^{i+j}$ is $+1$ when $i + j$ is even: $B = \\begin{bmatrix}1&-1&1\\\\-1&1&-1\\end{bmatrix}$.",
          "$3A = \\begin{bmatrix}3&0&-3\\\\9&6&3\\end{bmatrix}$ and $2B = \\begin{bmatrix}2&-2&2\\\\-2&2&-2\\end{bmatrix}$.",
          "Subtract entry by entry: $3A - 2B = \\begin{bmatrix}1&2&-5\\\\11&4&5\\end{bmatrix}$. Spot check the $(2,3)$ entry: $3(1) - 2(-1) = 5$ ✓.",
        ],
        answer: "$3A - 2B = \\begin{bmatrix}1&2&-5\\\\11&4&5\\end{bmatrix}$.",
      },
      pitfalls: [
        "$a_{ij}$ is row $i$, column $j$. Writing the rule column by column produces $A^T$, a different matrix (and a different size if $A$ is not square).",
        "A $2\\times3$ and a $3\\times2$ matrix cannot be added, and $\\begin{bmatrix}1&2\\end{bmatrix} \\ne \\begin{bmatrix}1\\\\2\\end{bmatrix}$: equal entries are not enough, the sizes must match.",
        "When solving for unknowns from $A = B$, use **every** entry. An extra entry can make the equations inconsistent (then no values work).",
      ],
      recall: [
        { q: "A matrix has 4 rows and 7 columns. What is its size, and where is $a_{32}$?", a: "$4\\times7$; $a_{32}$ sits in row 3, column 2." },
        { q: "$A$ is $3\\times3$ with $a_{ij} = i + j$. Write its main diagonal.", a: "$a_{11}, a_{22}, a_{33} = 2, 4, 6$." },
        { q: "Solve $\\begin{bmatrix}x+y & 3\\\\ 1 & x-y\\end{bmatrix} = \\begin{bmatrix}5 & 3\\\\ 1 & 1\\end{bmatrix}$.", a: "$x + y = 5$, $x - y = 1$, so $x = 3$, $y = 2$." },
      ],
    },
    {
      title: "Trace, diagonal and identity matrices, transpose, symmetric and skew-symmetric",
      refs: ["Slides 0B I. Matrix Notation and Terminology (mtx p5–6)", "Slides 0B II. Operations on Matrices (mtx p8)", "Tutorial 0B Q1"],
      intuition:
        "The trace adds up the main diagonal. The transpose flips a matrix so that rows become columns. A symmetric matrix is unchanged by the flip; a skew-symmetric one changes sign.",
      keyIdeas: [
        "**Trace** of a square matrix: $\\operatorname{trace} A = a_{11} + a_{22} + \\cdots + a_{nn}$, the sum of the leading diagonal. Only the diagonal entries are ever needed.",
        "A **diagonal matrix** is a square matrix whose only non-zero elements are on the leading diagonal. The **unit (identity) matrix** $I$ is the diagonal matrix with $a_{11} = a_{22} = \\cdots = a_{nn} = 1$.",
        "**Transpose**: $A^T$ is the $n\\times m$ matrix obtained by interchanging the rows and columns of the $m\\times n$ matrix $A$: the $(i,j)$ entry of $A^T$ is $a_{ji}$. Row $i$ of $A$ becomes column $i$ of $A^T$, and the main diagonal stays where it is.",
        "$(A^T)^T = A$, $(A + B)^T = A^T + B^T$, $(sA)^T = sA^T$.",
        "**Symmetric**: $A^T = A$, i.e. $a_{ij} = a_{ji}$. **Skew-symmetric**: $A^T = -A$, i.e. $a_{ij} = -a_{ji}$. Taking $i = j$ in $a_{ii} = -a_{ii}$ shows every diagonal entry of a skew-symmetric matrix is $0$.",
      ],
      formulas: ["\\operatorname{trace} A = a_{11} + a_{22} + \\cdots + a_{nn}, \\qquad (A^T)_{ij} = a_{ji}"],
      example: {
        problem:
          "$B = \\begin{bmatrix}3&1&0\\\\2&-1&5\\\\4&0&2\\end{bmatrix}$, $C = \\begin{bmatrix}1&0&2\\\\-1&3&1\\end{bmatrix}$, $D = \\begin{bmatrix}2&1\\\\0&-2\\\\1&4\\end{bmatrix}$. Find $\\operatorname{trace}(C^TD^T + 2B^T)$ (Tutorial 0B Q1(ii) style).",
        steps: [
          "Sizes: $C^T$ is $3\\times2$ and $D^T$ is $2\\times3$, so $C^TD^T$ is $3\\times3$, the same size as $2B^T$. Only diagonal entries are needed.",
          "$(C^TD^T)_{ii}$ = (row $i$ of $C^T$)$\\cdot$(column $i$ of $D^T$) = (column $i$ of $C$)$\\cdot$(row $i$ of $D$): $(1,-1)\\cdot(2,1) = 1$, $(0,3)\\cdot(0,-2) = -6$, $(2,1)\\cdot(1,4) = 6$. Sum: $1$.",
          "The diagonal of $B^T$ is the diagonal of $B$: $3, -1, 2$. So the diagonal of $2B^T$ sums to $2(3 - 1 + 2) = 8$.",
          "$\\operatorname{trace}(C^TD^T + 2B^T) = 1 + 8 = 9$.",
        ],
        answer: "$9$.",
      },
      pitfalls: [
        "Trace is defined only for square matrices. Check the size of the matrix inside the trace first.",
        "The $(i,j)$ entry of $A^T$ is $a_{ji}$, and $A^T$ of an $m\\times n$ matrix is $n\\times m$.",
        "A skew-symmetric matrix must have zeros on its diagonal; a matrix with $a_{22} = 3$ cannot be skew-symmetric.",
      ],
      recall: [
        { q: "$\\operatorname{trace}$ of $\\begin{bmatrix}4&7\\\\-2&1\\end{bmatrix}$?", a: "$4 + 1 = 5$." },
        { q: "Size of $A^T$ for $A$ of size $2\\times5$?", a: "$5\\times2$." },
        { q: "What must the diagonal of a skew-symmetric matrix be?", a: "All zeros ($a_{ii} = -a_{ii}$)." },
      ],
    },
    {
      title: "Matrix multiplication: entries, columns, rows and linear combinations",
      refs: ["Slides 0B II. Operations on Matrices (mtx p9)", "Slides 0B Matrix Multiplication by Columns and by Rows (mtx p11)", "Slides 0B Matrix Products as Linear Combinations (mtx p12)", "Slides 2.1 Matrix Multiplication (alg p3–4)", "Tutorial 0B Q2, Q3"],
      intuition:
        "$A\\mathbf{x}$ mixes the columns of $A$ using the entries of $\\mathbf{x}$ as weights. The product $AB$ does this for every column of $B$ at once, which is why each entry of $AB$ is a row of $A$ combined with a column of $B$.",
      visuals: ["ax-columns", "product-explorer"],
      keyIdeas: [
        "**Size rule**: $A$ $m\\times r$ times $B$ $r\\times n$ gives $AB$ of size $m\\times n$. $AB$ is defined only when (columns of $A$) $=$ (rows of $B$).",
        "**Entry**: $c_{ij} = \\sum_{k=1}^{r} a_{ik}b_{kj}$: row $i$ of $A$ against column $j$ of $B$.",
        "**Column method**: $AB = A\\begin{bmatrix}\\mathbf{b}_1 & \\cdots & \\mathbf{b}_n\\end{bmatrix} = \\begin{bmatrix}A\\mathbf{b}_1 & \\cdots & A\\mathbf{b}_n\\end{bmatrix}$, where $\\mathbf{b}_j$ is the $j^{th}$ column of $B$.",
        "**Row method**: row $i$ of $AB$ is $\\mathbf{a}_iB$, where $\\mathbf{a}_i$ is the $i^{th}$ row of $A$.",
        "**Linear combination** (Theorem, mtx p12): for $A$ $m\\times n$ and $\\mathbf{x}$ $n\\times1$, $A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n$, a linear combination of the **columns** of $A$ with coefficients the entries of $\\mathbf{x}$. So column $j$ of $AB$ is a combination of the columns of $A$ with weights from column $j$ of $B$.",
        "Multiplying by $B$ and then by $A$ is the same as multiplying by the single matrix $AB$: $A(B\\mathbf{x}) = (AB)\\mathbf{x}$.",
      ],
      formulas: [
        "c_{ij} = \\sum_{k=1}^{r} a_{ik}b_{kj}",
        "AB = \\begin{bmatrix} A\\mathbf{b}_1 & A\\mathbf{b}_2 & \\cdots & A\\mathbf{b}_n\\end{bmatrix}, \\qquad A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n",
      ],
      example: {
        problem:
          "$A = \\begin{bmatrix}2&-1&3\\\\0&4&1\\\\5&2&-2\\end{bmatrix}$, $B = \\begin{bmatrix}1&3&0\\\\-2&1&4\\\\3&0&2\\end{bmatrix}$. Find (i) the first row of $BA$, (ii) the second column of $AB$, (iii) the first column of $BA$ as a linear combination of the columns of $B$ (Tutorial 0B Q2–Q3 style).",
        steps: [
          "(i) Row method: row 1 of $BA$ = (row 1 of $B$)$A = 1\\,(2,-1,3) + 3\\,(0,4,1) + 0\\,(5,2,-2) = (2, 11, 6)$.",
          "(ii) Column method: column 2 of $AB$ = $A\\mathbf{b}_2$ with $\\mathbf{b}_2 = (3,1,0)$, i.e. $3\\mathbf{a}_1 + 1\\mathbf{a}_2 + 0\\mathbf{a}_3 = 3(2,0,5) + (-1,4,2) = (5, 4, 17)$.",
          "(iii) Column 1 of $BA$ = $B\\mathbf{a}_1$, and $\\mathbf{a}_1 = (2,0,5)$ supplies the weights: $2\\mathbf{b}_1 + 0\\mathbf{b}_2 + 5\\mathbf{b}_3 = 2(1,-2,3) + 5(0,4,2) = (2, 16, 16)$.",
          "Cross-check: the first entry of (iii) is the $(1,1)$ entry of $BA$, which is also the first entry of (i). Both are $2$ ✓.",
        ],
        answer:
          "(i) $(2, 11, 6)$; (ii) $(5, 4, 17)^T$; (iii) column 1 of $BA$ $= 2\\mathbf{b}_1 + 0\\mathbf{b}_2 + 5\\mathbf{b}_3 = (2,16,16)^T$.",
      },
      pitfalls: [
        "Check sizes before anything else: a $3\\times2$ times a $3\\times2$ is undefined. \"$AB$ defined\" does not mean \"$BA$ defined\".",
        "A row of $BA$ uses one row of $B$ and **all of** $A$; a column of $AB$ uses all of $A$ and one column of $B$.",
        "$A\\mathbf{x}$ combines the **columns** of $A$, not the rows.",
        "$(AB)_{ij} \\ne a_{ij}b_{ij}$. Multiplying entry by entry is not matrix multiplication.",
      ],
      recall: [
        { q: "Size of $AB$ for $A$ $2\\times3$ and $B$ $3\\times5$? Is $BA$ defined?", a: "$2\\times5$. $BA$ would be $(3\\times5)(2\\times3)$: not defined." },
        { q: "Column 2 of $AB$ in words?", a: "$A$ times column 2 of $B$: the columns of $A$ combined with weights from column 2 of $B$." },
        { q: "If row 3 of $A$ is zero, what is row 3 of $AB$?", a: "Zero: it is (row 3 of $A$)$B$." },
      ],
    },
    {
      title: "Properties of matrix multiplication: what holds and what breaks",
      refs: ["Slides 0B Properties of Matrix Multiplication (mtx p10)", "Slides 2.1 Matrix Multiplication (alg p3–4)", "PYP older: commutator $[A,B]C + B[A,C] = [A,BC]$; which pairs of transformations commute"],
      intuition:
        "$AB$ means \"multiply by $B$, then by $A$\", and doing two things in the other order usually gives a different result. Two habits from ordinary numbers fail: $AB \\ne BA$ in general, and a product can be zero although neither factor is.",
      visuals: ["order-matters"],
      keyIdeas: [
        "Still true: $(kA)B = k(AB) = A(kB)$, $A(BC) = (AB)C$, $(A + B)C = AC + BC$, $A(B + C) = AB + AC$, $I_mA = AI_n = A$ for $A$ $m\\times n$.",
        "**Transpose of a product**: $(AB)^T = B^TA^T$ (the order reverses).",
        "$AB \\ne BA$ in general: $\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ but $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix} = \\begin{bmatrix}0&0\\\\1&0\\end{bmatrix}$. When $AB = BA$ the matrices are said to commute.",
        "$AB = 0$ does **not** imply $A = 0$ or $B = 0$: $\\begin{bmatrix}1&1\\\\2&2\\end{bmatrix}\\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix} = \\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$. Hence $AB = AC$ does not imply $B = C$ either ($A(B - C) = 0$).",
        "Expanding with the distributive laws keeps the order: $(A + B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2$, which is $A^2 + 2AB + B^2$ only when $AB = BA$.",
        "**Commutator** (past papers): $[A,B] = AB - BA$. Expanding gives identities such as $[A,B]C + B[A,C] = ABC - BAC + BAC - BCA = [A, BC]$.",
      ],
      formulas: [
        "(AB)^T = B^TA^T, \\qquad A(BC) = (AB)C, \\qquad A(B + C) = AB + AC",
        "[A,B] = AB - BA, \\qquad [A,B]\\,C + B\\,[A,C] = [A,BC]",
      ],
      example: {
        problem:
          "$A = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$, $B = \\begin{bmatrix}2&-4\\\\-1&2\\end{bmatrix}$. Compute $AB$ and $BA$.",
        steps: [
          "$AB$: row 1 of $A$ with the columns of $B$: $1(2)+2(-1) = 0$, $1(-4)+2(2) = 0$; row 2: $2(2)+4(-1) = 0$, $2(-4)+4(2) = 0$. So $AB = 0$.",
          "$BA$: row 1 of $B$: $2(1)+(-4)(2) = -6$, $2(2)+(-4)(4) = -12$; row 2: $-1(1)+2(2) = 3$, $-1(2)+2(4) = 6$. So $BA = \\begin{bmatrix}-6&-12\\\\3&6\\end{bmatrix}$.",
          "Neither factor is zero, yet $AB = 0$; and $AB = 0$ while $BA \\ne 0$, so $AB \\ne BA$.",
        ],
        answer: "$AB = 0$ while $BA = \\begin{bmatrix}-6&-12\\\\3&6\\end{bmatrix} \\ne 0$.",
      },
      pitfalls: [
        "$(AB)^T = A^TB^T$ is wrong; the order reverses. For non-square factors $A^TB^T$ is often not even defined.",
        "$(A+B)^2 = A^2 + 2AB + B^2$ and $(A+B)(A-B) = A^2 - B^2$ are **false** in general; they need $AB = BA$.",
        "To decide whether two matrices commute, compute both products and compare every entry.",
        "\"Find the unknowns so that $A$ and $B$ commute\": write $AB$ and $BA$ with the unknowns and match all entries (equality of matrices).",
      ],
      recall: [
        { q: "$(ABC)^T = ?$", a: "$C^TB^TA^T$ (apply $(XY)^T = Y^TX^T$ twice)." },
        { q: "Expand $(A+B)^2$ for square matrices.", a: "$A^2 + AB + BA + B^2$." },
        { q: "Does $AB = 0$ force $A = 0$ or $B = 0$?", a: "No: $\\begin{bmatrix}1&1\\\\2&2\\end{bmatrix}\\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix} = 0$ (slide example)." },
      ],
    },
    {
      title: "Powers of a square matrix (past-paper problems)",
      refs: ["Slides 0B Properties of Matrix Multiplication (mtx p10)", "PYP AY25/26 S1 Q2 ($M^2 = I - M$)", "PYP older: find $c, d$ with $A^2 = I$; find $k$ with $A^2 = kA - 2I$"],
      intuition:
        "$A^2 = AA$ needs $A$ square. Past papers use a given relation such as $M^2 = I - M$ as a rewriting rule: every time $M^2$ appears, replace it, so higher powers come back down to a combination of $M$ and $I$. Unknown entries are found by computing $A^2$ and comparing entries.",
      keyIdeas: [
        "$A^2 = AA$, $A^3 = AAA$, ... are defined only for **square** $A$. By associativity $M^{n+1} = M\\cdot M^n$.",
        "**Reduction**: if $M^2 = pM + qI$ and $M^n = aM + bI$, then $M^{n+1} = aM^2 + bM$; substitute $M^2$ and collect the $M$ and $I$ terms. Repeat until the required power appears.",
        "**Unknown entries**: to solve $A^2 = I$ or $A^2 = kA + cI$, compute $A^2$ entry by entry and compare with the right-hand side (equality of matrices). An off-diagonal entry has no $I$ contribution, which often gives $k$ at once; check all entries.",
      ],
      formulas: ["M^2 = pM + qI,\\ M^n = aM + bI \\ \\Rightarrow\\ M^{n+1} = aM^2 + bM = (pa + b)M + qa\\,I"],
      example: {
        problem: "A square matrix $M$ satisfies $M^2 = I - M$. Write $M^6$ in the form $aI + bM$.",
        steps: [
          "$M^3 = M\\cdot M^2 = M - M^2 = M - (I - M) = 2M - I$.",
          "$M^4 = M\\cdot M^3 = 2M^2 - M = 2(I - M) - M = 2I - 3M$.",
          "$M^5 = 2M - 3M^2 = 2M - 3(I - M) = -3I + 5M$.",
          "$M^6 = -3M + 5M^2 = -3M + 5(I - M) = 5I - 8M$. Two more steps give $M^7 = -8I + 13M$ and $M^8 = 13I - 21M$ (the past-paper answer $n = 8$).",
        ],
        answer: "$M^6 = 5I - 8M$.",
      },
      pitfalls: [
        "In $kA - 2I$ the $2I$ only touches the diagonal entries. Subtracting $2$ from every entry is a common slip.",
        "Do not \"divide\" $A^2 = 2A$ by $A$: it does not give $A = 2I$ ($A = 0$ also works).",
        "$A^2$ is $AA$, not the matrix of squared entries.",
      ],
      recall: [
        { q: "Find $k$ with $A^2 = kA - 2I$ for $A = \\begin{bmatrix}3&-2\\\\4&-2\\end{bmatrix}$.", a: "$A^2 = \\begin{bmatrix}1&-2\\\\4&-4\\end{bmatrix}$; the $(1,2)$ entries give $-2 = -2k$, so $k = 1$ (all entries check)." },
        { q: "If $A^2 = A$, what is $A^{3}$?", a: "$A^3 = A^2A = AA = A$." },
        { q: "$M^2 = I - M$. Express $M^3$.", a: "$M^3 = M - M^2 = 2M - I$." },
      ],
    },
    {
      title: "Inverse of a matrix and simple matrix equations",
      refs: ["Slides 0B Inverse of a Matrix (mtx p13)", "Tutorial 0B Q4", "PYP AY25/26 S2 Q5 ($A^{-1}(X+Y)B = A^{-1}$)", "PYP older: $A^m = 0 \\Rightarrow I - A$ invertible; $A^4 = ABA^2 + 2A^3$"],
      intuition:
        "The inverse undoes $A$: $AA^{-1} = A^{-1}A = I$. For $2\\times2$ matrices there is a one-line formula. With inverses, matrix equations are solved like ordinary ones, except that you must multiply on the correct side, because order matters.",
      keyIdeas: [
        "**Definition**: a square $A$ is **invertible** if there is $B$ with $AB = BA = I$; $B$ is the **inverse** $A^{-1}$. If no such matrix exists, $A$ is **singular**.",
        "$A = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ is invertible if and only if $ad - bc \\ne 0$, and then $A^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$. The number $ad - bc$ is the **determinant**, written $|A|$ or $\\det(A)$.",
        "**Theorems**: if $A$, $B$ are invertible of the same size, $AB$ is invertible and $(AB)^{-1} = B^{-1}A^{-1}$. If $A$ is invertible, so is $A^T$, and $(A^T)^{-1} = (A^{-1})^T$.",
        "If $(kA)^{-1} = M$ is given (Tutorial 0B Q4): $kA$ is the inverse of $M$, so $kA = M^{-1}$ and $A = \\tfrac1k M^{-1}$.",
        "$AX = B \\Rightarrow X = A^{-1}B$ (multiply on the **left** by $A^{-1}$); $XA = B \\Rightarrow X = BA^{-1}$ (on the **right**). With an invertible $A$, $AB = AC$ gives $B = C$.",
        "To show a matrix is invertible, exhibit a matrix that multiplies it to $I$. E.g. if $A^m = 0$ then $(I - A)(I + A + \\cdots + A^{m-1}) = I - A^m = I$.",
      ],
      formulas: [
        "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}",
        "(AB)^{-1} = B^{-1}A^{-1}, \\qquad (A^T)^{-1} = (A^{-1})^T",
      ],
      example: {
        problem: "If $(5A)^{-1} = \\begin{bmatrix}4&-3\\\\-1&1\\end{bmatrix}$, find $A$ (Tutorial 0B Q4 style).",
        steps: [
          "Let $M = \\begin{bmatrix}4&-3\\\\-1&1\\end{bmatrix}$. Since $(5A)^{-1} = M$, the matrix $5A$ is the inverse of $M$: $5A = M^{-1}$.",
          "$ad - bc = 4(1) - (-3)(-1) = 1$, so $M^{-1} = \\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}$.",
          "$A = \\tfrac15 M^{-1} = \\tfrac15\\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}$.",
          "Check: $(5A)M = \\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}\\begin{bmatrix}4&-3\\\\-1&1\\end{bmatrix} = \\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$ ✓.",
        ],
        answer: "$A = \\dfrac15\\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}$.",
      },
      pitfalls: [
        "From $5A = M^{-1}$ you **divide** by $5$; multiplying by $5$ is the usual slip.",
        "Forgetting to divide by $ad - bc$, or negating the diagonal instead of the off-diagonal entries.",
        "$XA = B$ gives $X = BA^{-1}$, not $A^{-1}B$. Multiply both sides on the same side as $A$ sits.",
        "$(AB)^{-1} \\ne A^{-1}B^{-1}$ in general: the order reverses.",
      ],
      recall: [
        { q: "Inverse of $\\begin{bmatrix}2&1\\\\5&3\\end{bmatrix}$?", a: "$ad - bc = 1$, so $\\begin{bmatrix}3&-1\\\\-5&2\\end{bmatrix}$." },
        { q: "Solve $XA = B$ for $X$ ($A$ invertible).", a: "$X = BA^{-1}$." },
        { q: "$A^3 = 0$. Why is $I - A$ invertible?", a: "$(I - A)(I + A + A^2) = I - A^3 = I$, so $(I - A)^{-1} = I + A + A^2$." },
      ],
    },
  ],
  playbook: [
    "If you see a product → write the sizes first: $(m\\times r)(r\\times n) = m\\times n$. Undefined products are a favourite distractor.",
    "If you see \"the $(i,j)$ entry of $AB$\" → row $i$ of $A$ against column $j$ of $B$. Do not compute the whole matrix.",
    "If you see \"a row of $BA$\" → (that row of $B$)$\\times A$ (row method). \"A column of $AB$\" → $A\\times$(that column of $B$) (column method).",
    "If you see \"express a column of $AB$ as a linear combination of the columns of $A$\" → the weights are the matching column of $B$ (Theorem, mtx p12).",
    "If you see $a_{ij} = f(i,j)$ → write out the matrix row by row ($i$ fixed). $f(i,j) = f(j,i)$ for all $i, j$ means symmetric; $f(j,i) = -f(i,j)$ means skew-symmetric.",
    "If you see a trace → only the diagonal entries matter; for a product, compute just the diagonal entries (row $i$ against column $i$).",
    "If you see a transpose of a product → reverse the order: $(AB)^T = B^TA^T$. Same for inverses: $(AB)^{-1} = B^{-1}A^{-1}$.",
    "If you see $(A+B)^2$ or $(A+B)(A-B)$ → expand keeping order; the school formula holds only if $AB = BA$.",
    "If you see $AB = 0$ or $AB = AC$ → no conclusion about $A$, $B$, $C$ unless something is invertible.",
    "If you see $M^2 = pM + qI$ and a high power $M^n$ → multiply by $M$ and substitute $M^2$ each time; tabulate the coefficients.",
    "If you see unknowns with $A^2 = I$ or $A^2 = kA + cI$ → compute $A^2$ and compare entries (off-diagonal first).",
    "If you see $(kA)^{-1} = M$ → $A = \\tfrac1k M^{-1}$; for $2\\times2$ swap the diagonal, negate the off-diagonal, divide by $ad - bc$. For $AX = B$ multiply by $A^{-1}$ on the left, for $XA = B$ on the right.",
  ],
};
