import type { Lesson } from "@/lib/types";

export const matricesLesson: Lesson = {
  topic: "matrices",
  bigPicture:
    "A matrix is a rectangular table of numbers, and almost everything later in the course is phrased with it: a system of equations is $A\\mathbf{x} = \\mathbf{b}$, a linear transformation is $\\mathbf{x}\\mapsto A\\mathbf{x}$, a change of basis is a matrix product. This topic is the toolkit. First the bookkeeping (size, entries $a_{ij}$, equality, sums and scalar multiples, all done entry by entry). Then the one operation that is **not** entry by entry: the product $AB$, built from dot products of rows with columns, which is best understood through columns ($A\\mathbf{x}$ is a combination of the columns of $A$). The product is associative and distributive but **not commutative**, and two other rules from ordinary numbers fail too (no cancellation, zero divisors). Powers and polynomials of a square matrix, transpose and trace, and special shapes (diagonal, triangular, symmetric, skew-symmetric, outer products $\\mathbf{u}\\mathbf{v}^T$) come next, and the topic ends with the $2\\times2$ inverse formula and solving simple matrix equations by multiplying on the correct side.",
  sections: [
    {
      title: "Notation, equality, sums and scalar multiples",
      intuition:
        "A matrix is a table: its size is (rows) × (columns), and $a_{ij}$ is the entry in row $i$, column $j$. Adding two matrices or multiplying by a number happens entry by entry, so it behaves exactly like arithmetic with numbers.",
      keyIdeas: [
        "$A = [a_{ij}]$ of size $m\\times n$ has $m$ rows and $n$ columns ($mn$ entries). Row index first, column index second. A $1\\times n$ matrix is a row vector, an $m\\times1$ matrix a column vector; if $m = n$ the matrix is square and $a_{11}, a_{22},\\dots,a_{nn}$ form its **main diagonal**.",
        "A matrix can be defined by a rule $a_{ij} = f(i,j)$, e.g. $a_{ij} = i + j$ or $a_{ij} = (-1)^{i+j}$. Build it one row at a time: fix $i$, run $j = 1,\\dots,n$.",
        "**Equality**: $A = B$ iff they have the **same size** and $a_{ij} = b_{ij}$ for every $i, j$. Matching entries turns one matrix equation into several scalar equations.",
        "$A + B$ and $A - B$ are defined only for matrices of the same size, entry by entry. The scalar multiple $cA$ multiplies every entry by $c$. $0$ is the zero matrix and $-A = (-1)A$.",
        "These obey the usual rules: $A + B = B + A$, $(A+B)+C = A+(B+C)$, $c(A+B) = cA + cB$, $(c+d)A = cA + dA$, $c(dA) = (cd)A$.",
      ],
      formulas: ["(A+B)_{ij} = a_{ij} + b_{ij}, \\qquad (cA)_{ij} = c\\,a_{ij}"],
      example: {
        problem:
          "$A = [a_{ij}]$ and $B = [b_{ij}]$ are $2\\times3$ with $a_{ij} = 2i - j$ and $b_{ij} = (-1)^{i+j}$. Find $3A - 2B$.",
        steps: [
          "Row 1 of $A$ ($i = 1$): $2-1,\\ 2-2,\\ 2-3 = 1, 0, -1$. Row 2 ($i = 2$): $4-1,\\ 4-2,\\ 4-3 = 3, 2, 1$. So $A = \\begin{bmatrix}1&0&-1\\\\3&2&1\\end{bmatrix}$.",
          "$(-1)^{i+j}$ is $+1$ when $i + j$ is even: $B = \\begin{bmatrix}1&-1&1\\\\-1&1&-1\\end{bmatrix}$ (a checkerboard of signs).",
          "$3A = \\begin{bmatrix}3&0&-3\\\\9&6&3\\end{bmatrix}$ and $2B = \\begin{bmatrix}2&-2&2\\\\-2&2&-2\\end{bmatrix}$.",
          "Subtract entry by entry: $3A - 2B = \\begin{bmatrix}1&2&-5\\\\11&4&5\\end{bmatrix}$. Spot check the $(2,3)$ entry: $3(1) - 2(-1) = 5$ ✓.",
        ],
        answer: "$3A - 2B = \\begin{bmatrix}1&2&-5\\\\11&4&5\\end{bmatrix}$.",
      },
      pitfalls: [
        "$a_{ij}$ is row $i$, column $j$. Writing the rule column by column produces $A^T$, which is a different matrix (and a different size if $A$ is not square).",
        "A $2\\times3$ and a $3\\times2$ matrix cannot be added, and $\\begin{bmatrix}1&2\\end{bmatrix} \\ne \\begin{bmatrix}1\\\\2\\end{bmatrix}$: equal entries are not enough, the sizes must match.",
        "When solving for unknowns from $A = B$, use **every** entry. An extra entry can make the system inconsistent (then no values work).",
      ],
      recall: [
        { q: "A matrix has 4 rows and 7 columns. What is its size, and where is $a_{32}$?", a: "$4\\times7$ ($28$ entries); $a_{32}$ sits in row 3, column 2." },
        { q: "$A$ is $3\\times3$ with $a_{ij} = i + j$. What is $a_{11} + a_{22} + a_{33}$?", a: "$2 + 4 + 6 = 12$." },
        { q: "Solve $\\begin{bmatrix}x+y & 3\\\\ 1 & x-y\\end{bmatrix} = \\begin{bmatrix}5 & 3\\\\ 1 & 1\\end{bmatrix}$.", a: "$x + y = 5$, $x - y = 1$, so $x = 3$, $y = 2$." },
      ],
    },
    {
      title: "Matrix multiplication: rows times columns, combinations of columns",
      intuition:
        "$A\\mathbf{x}$ mixes the columns of $A$ using the entries of $\\mathbf{x}$ as weights. The product $AB$ just does this for every column of $B$ at once, which is why each entry of $AB$ is a row of $A$ dotted with a column of $B$.",
      visuals: ["ax-columns", "product-explorer"],
      keyIdeas: [
        "**Size rule**: $(m\\times n)(n\\times p) = m\\times p$. $AB$ is defined only when (columns of $A$) $=$ (rows of $B$); the outer numbers give the size of the result.",
        "**Entry**: $(AB)_{ij} = (\\text{row } i \\text{ of } A)\\cdot(\\text{column } j \\text{ of } B) = \\sum_k a_{ik}b_{kj}$.",
        "**Matrix–vector**: $A\\mathbf{x} = x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n$, a linear combination of the **columns** of $A$ with weights the entries of $\\mathbf{x}$. In particular $A\\mathbf{e}_j = \\mathbf{a}_j$ and $\\mathbf{e}_i^TA\\mathbf{e}_j = a_{ij}$.",
        "**Column method**: column $j$ of $AB$ is $A\\mathbf{b}_j$, a combination of the columns of $A$ with weights taken from column $j$ of $B$. So every column of $AB$ lies in the span of the columns of $A$.",
        "**Row method**: row $i$ of $AB$ is $(\\text{row } i \\text{ of } A)\\,B$, a combination of the **rows of $B$** with weights taken from row $i$ of $A$.",
        "To get one entry, row or column, never compute the whole product. Pick the method that only touches what you need.",
      ],
      formulas: [
        "(AB)_{ij} = \\sum_{k=1}^{n} a_{ik}b_{kj}",
        "A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n, \\qquad AB = \\begin{bmatrix} A\\mathbf{b}_1 & A\\mathbf{b}_2 & \\cdots & A\\mathbf{b}_p\\end{bmatrix}",
        "\\operatorname{row}_i(AB) = \\operatorname{row}_i(A)\\,B = a_{i1}\\operatorname{row}_1(B) + \\cdots + a_{in}\\operatorname{row}_n(B)",
      ],
      example: {
        problem:
          "$A = \\begin{bmatrix}2&-1&3\\\\0&4&1\\\\5&2&-2\\end{bmatrix}$, $B = \\begin{bmatrix}1&3&0\\\\-2&1&4\\\\3&0&2\\end{bmatrix}$. Find (i) the first row of $BA$, (ii) the second column of $AB$, (iii) the first column of $BA$ as a combination of the columns of $B$.",
        steps: [
          "(i) Row method: row 1 of $BA$ = (row 1 of $B$)$A = 1\\,\\operatorname{row}_1(A) + 3\\,\\operatorname{row}_2(A) + 0\\,\\operatorname{row}_3(A) = (2,-1,3) + (0,12,3) = (2, 11, 6)$.",
          "(ii) Column method: column 2 of $AB$ = $A\\mathbf{b}_2$ with $\\mathbf{b}_2 = (3,1,0)$, so it is $3\\mathbf{a}_1 + 1\\mathbf{a}_2 + 0\\mathbf{a}_3 = 3(2,0,5) + (-1,4,2) = (5, 4, 17)$.",
          "(iii) Column 1 of $BA$ = $B\\mathbf{a}_1$, and $\\mathbf{a}_1 = (2,0,5)$ supplies the weights: $2\\mathbf{b}_1 + 0\\mathbf{b}_2 + 5\\mathbf{b}_3 = 2(1,-2,3) + 5(0,4,2) = (2, 16, 16)$.",
          "Cross-check: the first entry of (iii) must equal the first entry of (i), and both are $2$ ✓.",
        ],
        answer:
          "(i) $(2, 11, 6)$; (ii) $(5, 4, 17)^T$; (iii) column 1 of $BA$ $= 2\\mathbf{b}_1 + 0\\mathbf{b}_2 + 5\\mathbf{b}_3 = (2,16,16)^T$.",
      },
      pitfalls: [
        "Check sizes before anything else: a $3\\times2$ times a $3\\times2$ is undefined. \"$AB$ defined\" does not mean \"$BA$ defined\".",
        "A row of $BA$ uses a row of $B$ and **all of** $A$. Keep the order of the letters: in $BA$, the weights come from $B$ for rows and from $A$ for columns.",
        "$A\\mathbf{x}$ combines the **columns** of $A$, not the rows. ($\\mathbf{x}^TA$ combines the rows.)",
        "$(AB)_{ij} \\ne a_{ij}b_{ij}$. Multiplying entry by entry is not matrix multiplication.",
      ],
      recall: [
        { q: "Size of $AB$ for $A$ $2\\times3$ and $B$ $3\\times5$? Is $BA$ defined?", a: "$2\\times5$. $BA$ would be $(3\\times5)(2\\times3)$: not defined." },
        { q: "Column 2 of $AB$ in words?", a: "$A$ times column 2 of $B$: the columns of $A$ combined with weights from column 2 of $B$." },
        { q: "If row 3 of $A$ is zero, what is row 3 of $AB$?", a: "Zero: it is $(\\text{row } 3 \\text{ of } A)B = \\mathbf{0}^TB$." },
      ],
    },
    {
      title: "What breaks: order, cancellation and zero divisors",
      intuition:
        "A product $AB$ means \"do $B$, then do $A$\". Rotating then reflecting is usually not the same as reflecting then rotating, so order matters. Two other habits from numbers fail too: you cannot cancel a matrix, and two nonzero matrices can multiply to zero.",
      visuals: ["order-matters"],
      keyIdeas: [
        "Still true: $A(BC) = (AB)C$, $A(B+C) = AB + AC$, $(B+C)A = BA + CA$, $c(AB) = (cA)B = A(cB)$, $I_mA = A = AI_n$.",
        "**Not commutative**: in general $AB \\ne BA$. If $A$ is $2\\times3$ and $B$ is $3\\times2$ they even have different sizes ($2\\times2$ vs $3\\times3$). When $AB = BA$ we say $A$ and $B$ **commute** (e.g. $A$ with $I$, $A$ with its own powers, any two diagonal matrices).",
        "**No cancellation**: $AB = AC$ does **not** imply $B = C$, and $BA = CA$ does not either. It does when $A$ is invertible (multiply by $A^{-1}$).",
        "**Zero divisors**: $AB = 0$ is possible with $A \\ne 0$ and $B \\ne 0$; even $A^2 = 0$ with $A\\ne0$ (e.g. $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$). $AB = 0$ also does not force $BA = 0$.",
        "Expansions keep the order: $(A+B)^2 = A^2 + AB + BA + B^2$ and $(A+B)(A-B) = A^2 - AB + BA - B^2$. They reduce to the school formulas **iff** $AB = BA$. Likewise $(AB)^2 = ABAB$, not $A^2B^2$.",
        "**Commutator** $[A,B] = AB - BA$: $[B,A] = -[A,B]$, $[A,A] = 0$, $[A, B+C] = [A,B] + [A,C]$, $[A,BC] = [A,B]C + B[A,C]$, and $\\operatorname{tr}[A,B] = 0$, so $[A,B] = I_n$ is impossible.",
      ],
      formulas: [
        "(A+B)^2 = A^2 + AB + BA + B^2",
        "[A,B] = AB - BA, \\qquad [A,BC] = [A,B]\\,C + B\\,[A,C]",
      ],
      example: {
        problem:
          "$A = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$, $B = \\begin{bmatrix}2&-4\\\\-1&2\\end{bmatrix}$. Compute $AB$ and $BA$. What does this say about cancellation?",
        steps: [
          "$AB$: row 1 of $A$ with the columns of $B$: $1(2)+2(-1) = 0$, $1(-4)+2(2) = 0$; row 2: $2(2)+4(-1) = 0$, $2(-4)+4(2) = 0$. So $AB = 0$.",
          "$BA$: row 1 of $B$: $2(1)+(-4)(2) = -6$, $2(2)+(-4)(4) = -12$; row 2: $-1(1)+2(2) = 3$, $-1(2)+2(4) = 6$. So $BA = \\begin{bmatrix}-6&-12\\\\3&6\\end{bmatrix}\\ne0$.",
          "Neither factor is zero, yet $AB = 0$: zero divisors exist, and $AB = 0$ does not give $BA = 0$.",
          "Cancellation fails: $AB = 0 = A\\cdot 0$ but $B \\ne 0$. (Here $A$ is not invertible: $\\det A = 4 - 4 = 0$.)",
        ],
        answer: "$AB = 0$ while $BA = \\begin{bmatrix}-6&-12\\\\3&6\\end{bmatrix}$; $AB = A\\cdot0$ with $B\\ne0$, so you cannot cancel $A$.",
      },
      pitfalls: [
        "$(A+B)^2 = A^2 + 2AB + B^2$ and $(A+B)(A-B) = A^2 - B^2$ are **false** in general. They need $AB = BA$.",
        "$AB = 0 \\Rightarrow A = 0$ or $B = 0$ is false; so is $A^2 = A \\Rightarrow A \\in\\{0, I\\}$ and $A^2 = I \\Rightarrow A = \\pm I$ (try $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$).",
        "To test whether two matrices commute you must compute both products; one pair of matching entries proves nothing.",
        "\"Which matrices commute with $A$\": write $X$ with unknown entries, set $AX = XA$ and match all four entries.",
      ],
      recall: [
        { q: "When is $(A+B)^2 = A^2 + 2AB + B^2$?", a: "Exactly when $AB = BA$ (the difference is $BA - AB$)." },
        { q: "A nonzero $2\\times2$ matrix $N$ with $N^2 = 0$?", a: "$N = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$ (any strictly upper triangular $2\\times2$ matrix)." },
        { q: "Why can $AB - BA$ never equal $I_n$?", a: "$\\operatorname{tr}(AB - BA) = \\operatorname{tr}(AB) - \\operatorname{tr}(BA) = 0$, but $\\operatorname{tr}(I_n) = n$." },
      ],
    },
    {
      title: "Powers and matrix polynomials",
      intuition:
        "A square matrix commutes with its own powers, so polynomials in one matrix $A$ behave like ordinary polynomials. A relation such as $A^2 = pA + qI$ is a rewriting rule: every higher power can be pushed back down to a combination of $A$ and $I$.",
      keyIdeas: [
        "Powers only exist for **square** $A$: $A^0 = I$, $A^k = A\\cdot A^{k-1}$, $A^rA^s = A^{r+s}$, $(A^r)^s = A^{rs}$.",
        "For $p(x) = c_0 + c_1x + \\cdots + c_kx^k$, $p(A) = c_0I + c_1A + \\cdots + c_kA^k$. The constant becomes $c_0I$, not $c_0$ added to every entry. Polynomials in the same $A$ commute and factor like numbers.",
        "**Every $2\\times2$ matrix satisfies $A^2 - (\\operatorname{tr}A)A + (\\det A)I = 0$** (Cayley–Hamilton). So \"find $k$ with $A^2 = kA - 2I$\" is answered by $k = \\operatorname{tr}A$ when $\\det A = 2$; verify by computing $A^2$.",
        "**Reduction**: if $M^2 = pM + qI$ and $M^n = a_nM + b_nI$, then $M^{n+1} = a_nM^2 + b_nM = (pa_n + b_n)M + qa_nI$. Iterate from $M^1 = 1M + 0I$.",
        "Diagonal: $D^k = \\operatorname{diag}(d_1^k,\\dots,d_n^k)$. Triangular: $A^k$ is triangular with diagonal entries $a_{ii}^k$.",
        "Special patterns: $A^2 = A$ (idempotent) gives $A^k = A$; $A^2 = I$ (involution) gives $A^{\\text{even}} = I$, $A^{\\text{odd}} = A$; $N^k = 0$ (nilpotent) gives $(I-N)(I + N + \\cdots + N^{k-1}) = I$.",
      ],
      formulas: [
        "A^2 - (\\operatorname{tr}A)\\,A + (\\det A)\\,I = 0 \\qquad (A \\text{ is } 2\\times2)",
        "M^2 = pM + qI,\\ M^n = a_nM + b_nI \\ \\Rightarrow\\ M^{n+1} = (pa_n + b_n)M + q\\,a_n I",
      ],
      example: {
        problem: "A square matrix $M$ satisfies $M^2 = I - M$. Write $M^6$ in the form $aI + bM$.",
        steps: [
          "$M^3 = M\\cdot M^2 = M - M^2 = M - (I - M) = 2M - I$.",
          "$M^4 = M\\cdot M^3 = 2M^2 - M = 2(I - M) - M = 2I - 3M$.",
          "$M^5 = 2M - 3M^2 = 2M - 3(I - M) = -3I + 5M$.",
          "$M^6 = -3M + 5M^2 = -3M + 5(I - M) = 5I - 8M$. The coefficients are Fibonacci numbers with alternating signs ($M^7 = -8I + 13M$, $M^8 = 13I - 21M$).",
        ],
        answer: "$M^6 = 5I - 8M$.",
      },
      pitfalls: [
        "In $p(A)$ the constant term is $c_0I$. Adding $c_0$ to every entry is the most common slip.",
        "Do not \"divide\" $A^2 = 2A$ by $A$: it does not give $A = 2I$ (e.g. $A = 0$ or $A = \\begin{bmatrix}2&0\\\\0&0\\end{bmatrix}$ also work).",
        "When asked for $k$ with $A^2 = kA + cI$, compare a **non-diagonal** entry first: it does not involve $I$, so it gives $k$ directly.",
      ],
      recall: [
        { q: "$A = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$. Express $A^2$ using $A$ and $I$.", a: "$A^2 = (a+d)A - (ad-bc)I$." },
        { q: "If $A^2 = A$, what is $A^{10}$?", a: "$A$ (each extra factor of $A$ changes nothing)." },
        { q: "$D = \\operatorname{diag}(2,-1)$. Find $D^5$.", a: "$\\operatorname{diag}(32, -1)$." },
      ],
    },
    {
      title: "Transpose and trace",
      intuition:
        "The transpose flips a matrix across its main diagonal, so rows become columns. The trace adds up the main diagonal. Trace is robust: it ignores the order in a product, $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$, even though $AB \\ne BA$.",
      keyIdeas: [
        "$(A^T)_{ij} = a_{ji}$; an $m\\times n$ matrix becomes $n\\times m$. Row $i$ of $A$ is column $i$ of $A^T$.",
        "$(A^T)^T = A$, $(A+B)^T = A^T + B^T$, $(cA)^T = cA^T$, and **$(AB)^T = B^TA^T$** (order reverses; $(ABC)^T = C^TB^TA^T$). Also $(A^k)^T = (A^T)^k$.",
        "Dot products: $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}^T\\mathbf{v}$, and $(A\\mathbf{x})\\cdot\\mathbf{y} = \\mathbf{x}\\cdot(A^T\\mathbf{y})$.",
        "$\\operatorname{tr}A = a_{11} + \\cdots + a_{nn}$ (square only). $\\operatorname{tr}(A+B) = \\operatorname{tr}A + \\operatorname{tr}B$, $\\operatorname{tr}(cA) = c\\operatorname{tr}A$, $\\operatorname{tr}(A^T) = \\operatorname{tr}A$.",
        "$\\operatorname{tr}(AB) = \\operatorname{tr}(BA) = \\sum_{i,j}a_{ij}b_{ji}$ whenever both products are square, even for $A$ $m\\times n$, $B$ $n\\times m$. Cyclic shifts are allowed ($\\operatorname{tr}(ABC) = \\operatorname{tr}(BCA) = \\operatorname{tr}(CAB)$); arbitrary swaps are not ($\\operatorname{tr}(ACB)$ may differ).",
        "$\\operatorname{tr}(A^TA) = \\sum_{i,j}a_{ij}^2 \\ge 0$, with equality only for $A = 0$. But $\\operatorname{tr}(AB) \\ne \\operatorname{tr}A\\cdot\\operatorname{tr}B$ in general.",
      ],
      formulas: [
        "(AB)^T = B^TA^T",
        "\\operatorname{tr}(AB) = \\operatorname{tr}(BA) = \\sum_{i,j} a_{ij}b_{ji}, \\qquad \\operatorname{tr}(A^TA) = \\sum_{i,j}a_{ij}^2",
      ],
      example: {
        problem:
          "$A = \\begin{bmatrix}2&-1\\\\0&3\\\\1&4\\end{bmatrix}$ ($3\\times2$), $B = \\begin{bmatrix}1&0&-2\\\\3&1&1\\end{bmatrix}$ ($2\\times3$). Find $\\operatorname{tr}(AB)$, $\\operatorname{tr}(BA)$ and $\\operatorname{tr}(A^TB^T)$ without computing a full product.",
        steps: [
          "Only the diagonal of $AB$ ($3\\times3$) is needed: $(AB)_{11} = 2(1)+(-1)(3) = -1$, $(AB)_{22} = 0(0)+3(1) = 3$, $(AB)_{33} = 1(-2)+4(1) = 2$. So $\\operatorname{tr}(AB) = 4$.",
          "$BA$ is $2\\times2$: $(BA)_{11} = 1(2)+0(0)+(-2)(1) = 0$, $(BA)_{22} = 3(-1)+1(3)+1(4) = 4$. So $\\operatorname{tr}(BA) = 4$, as the theorem promises, although $AB$ and $BA$ have different sizes.",
          "$A^TB^T = (BA)^T$, and transposing does not change the trace: $\\operatorname{tr}(A^TB^T) = \\operatorname{tr}(BA) = 4$.",
        ],
        answer: "All three traces equal $4$.",
      },
      pitfalls: [
        "$(AB)^T = A^TB^T$ is wrong; for non-square factors it is usually not even defined.",
        "$\\operatorname{tr}(AB) = \\operatorname{tr}A\\,\\operatorname{tr}B$ is wrong (try $A = B = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$: $\\operatorname{tr}(AB) = 2$, $\\operatorname{tr}A\\operatorname{tr}B = 0$).",
        "Trace needs a square matrix, but $AB$ can be square when $A$ and $B$ are not. Always check the size of the product.",
        "For three factors only cyclic rotations keep the trace: $\\operatorname{tr}(ABC) = \\operatorname{tr}(CAB)$, but $\\operatorname{tr}(ABC)$ and $\\operatorname{tr}(CBA)$ can differ.",
      ],
      recall: [
        { q: "$(ABC)^T = ?$", a: "$C^TB^TA^T$." },
        { q: "$A$ is $2\\times5$, $B$ is $5\\times2$. Compare $\\operatorname{tr}(AB)$ and $\\operatorname{tr}(BA)$.", a: "They are equal, even though $AB$ is $2\\times2$ and $BA$ is $5\\times5$." },
        { q: "$\\operatorname{tr}(A^TA) = 0$. What is $A$?", a: "$A = 0$, since the trace is the sum of the squares of all entries." },
      ],
    },
    {
      title: "Special matrices: diagonal, triangular, symmetric, skew, outer products",
      intuition:
        "Structure saves work. Diagonal matrices multiply entry by entry, triangular matrices keep their shape under products, and every square matrix splits into a symmetric part plus a skew-symmetric part. An outer product $\\mathbf{u}\\mathbf{v}^T$ is the simplest nonzero matrix of all: every column is a multiple of $\\mathbf{u}$.",
      keyIdeas: [
        "**Identity** $I_n$: $AI = IA = A$. **Diagonal** $D$: off-diagonal entries $0$. $DA$ scales the **rows** of $A$ by $d_1,\\dots,d_n$; $AD$ scales the **columns**. Diagonal matrices commute with each other.",
        "**Upper triangular**: $a_{ij} = 0$ for $i > j$; **lower**: $a_{ij} = 0$ for $i < j$. Sums and products of upper triangular matrices are upper triangular, with $(AB)_{ii} = a_{ii}b_{ii}$. The transpose of an upper triangular matrix is lower triangular.",
        "**Symmetric**: $A^T = A$ ($a_{ij} = a_{ji}$). **Skew-symmetric**: $A^T = -A$, which forces $a_{ii} = 0$. Only the zero matrix is both.",
        "For any square $A$: $A + A^T$ is symmetric, $A - A^T$ is skew, and $A = \\tfrac12(A + A^T) + \\tfrac12(A - A^T)$ (unique split). For any $A$ (any size): $AA^T$ and $A^TA$ are symmetric.",
        "If $A, B$ are symmetric then $(AB)^T = BA$, so $AB$ is symmetric **iff** $AB = BA$.",
        "**Outer product** $\\mathbf{u}\\mathbf{v}^T$ ($\\mathbf{u}\\in\\mathbb{R}^m$, $\\mathbf{v}\\in\\mathbb{R}^n$) is $m\\times n$ with entries $u_iv_j$: each column is a multiple of $\\mathbf{u}$, each row a multiple of $\\mathbf{v}^T$, rank 1 when both are nonzero. $(\\mathbf{u}\\mathbf{v}^T)\\mathbf{w} = (\\mathbf{v}\\cdot\\mathbf{w})\\mathbf{u}$; if $m = n$, $\\operatorname{tr}(\\mathbf{u}\\mathbf{v}^T) = \\mathbf{u}\\cdot\\mathbf{v}$ and $(\\mathbf{u}\\mathbf{v}^T)^2 = (\\mathbf{v}\\cdot\\mathbf{u})\\,\\mathbf{u}\\mathbf{v}^T$.",
      ],
      formulas: [
        "A = \\underbrace{\\tfrac12(A + A^T)}_{\\text{symmetric}} + \\underbrace{\\tfrac12(A - A^T)}_{\\text{skew-symmetric}}",
        "(\\mathbf{u}\\mathbf{v}^T)_{ij} = u_iv_j, \\qquad \\operatorname{tr}(\\mathbf{u}\\mathbf{v}^T) = \\mathbf{v}^T\\mathbf{u}",
      ],
      example: {
        problem:
          "Write $A = \\begin{bmatrix}2&5&-1\\\\1&0&4\\\\3&-2&6\\end{bmatrix}$ as $S + K$ with $S$ symmetric and $K$ skew-symmetric.",
        steps: [
          "$A^T = \\begin{bmatrix}2&1&3\\\\5&0&-2\\\\-1&4&6\\end{bmatrix}$.",
          "$S = \\tfrac12(A + A^T) = \\tfrac12\\begin{bmatrix}4&6&2\\\\6&0&2\\\\2&2&12\\end{bmatrix} = \\begin{bmatrix}2&3&1\\\\3&0&1\\\\1&1&6\\end{bmatrix}$ (symmetric ✓).",
          "$K = \\tfrac12(A - A^T) = \\tfrac12\\begin{bmatrix}0&4&-4\\\\-4&0&6\\\\4&-6&0\\end{bmatrix} = \\begin{bmatrix}0&2&-2\\\\-2&0&3\\\\2&-3&0\\end{bmatrix}$ (zero diagonal, $k_{ji} = -k_{ij}$ ✓).",
          "Check one entry: $s_{13} + k_{13} = 1 + (-2) = -1 = a_{13}$ ✓.",
        ],
        answer: "$S = \\begin{bmatrix}2&3&1\\\\3&0&1\\\\1&1&6\\end{bmatrix}$, $K = \\begin{bmatrix}0&2&-2\\\\-2&0&3\\\\2&-3&0\\end{bmatrix}$.",
      },
      pitfalls: [
        "The product of two symmetric matrices is **not** automatically symmetric; it is symmetric exactly when they commute.",
        "Forgetting the $\\tfrac12$: $A + A^T$ is symmetric, but $A \\ne (A + A^T) + (A - A^T)$ (that sum is $2A$).",
        "$\\mathbf{u}\\mathbf{v}^T$ is a matrix, $\\mathbf{u}^T\\mathbf{v}$ is a number. They are linked by $\\operatorname{tr}(\\mathbf{u}\\mathbf{v}^T) = \\mathbf{u}^T\\mathbf{v}$.",
        "$DA$ scales rows, $AD$ scales columns. Swapping these is a typical distractor.",
      ],
      recall: [
        { q: "What must the diagonal of a skew-symmetric matrix be?", a: "All zeros ($a_{ii} = -a_{ii}$)." },
        { q: "$\\mathbf{u}\\in\\mathbb{R}^3$, $\\mathbf{v}\\in\\mathbb{R}^4$ nonzero. Size and rank of $\\mathbf{u}\\mathbf{v}^T$?", a: "$3\\times4$, rank 1." },
        { q: "Is $A^TA$ symmetric when $A$ is $5\\times2$?", a: "Yes: $(A^TA)^T = A^T(A^T)^T = A^TA$ (it is $2\\times2$)." },
      ],
    },
    {
      title: "The 2×2 inverse and simple matrix equations",
      intuition:
        "The inverse undoes $A$: $A^{-1}A = AA^{-1} = I$. For $2\\times2$ matrices there is a one-line formula. With inverses, matrix equations are solved like ordinary ones, except that you must multiply on the correct side, because order matters.",
      keyIdeas: [
        "$A = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ is invertible iff $\\det A = ad - bc \\ne 0$; then $A^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$ (swap the diagonal, negate the off-diagonal, divide by the determinant).",
        "Rules: $(A^{-1})^{-1} = A$, $(kA)^{-1} = \\tfrac1k A^{-1}$ ($k\\ne0$), $(A^T)^{-1} = (A^{-1})^T$, $(AB)^{-1} = B^{-1}A^{-1}$ (order reverses), $(A^k)^{-1} = (A^{-1})^k$.",
        "If $(kA)^{-1} = M$ is given, invert both sides: $kA = M^{-1}$, so $A = \\tfrac1k M^{-1}$.",
        "$AX = B \\Rightarrow X = A^{-1}B$ (multiply on the **left**); $XA = B \\Rightarrow X = BA^{-1}$ (on the **right**). There is no division; $A^{-1}B$ and $BA^{-1}$ usually differ.",
        "With an invertible $A$, cancellation is valid: $AB = AC \\Rightarrow B = C$.",
        "Polynomial trick: if $A^2 - 3A + 2I = 0$ then $A(3I - A) = 2I$, so $A^{-1} = \\tfrac12(3I - A)$. Any relation with a nonzero constant term gives the inverse as a polynomial in $A$.",
      ],
      formulas: [
        "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}",
        "(kA)^{-1} = \\tfrac1k A^{-1}, \\qquad (AB)^{-1} = B^{-1}A^{-1}, \\qquad (A^T)^{-1} = (A^{-1})^T",
      ],
      example: {
        problem: "If $(5A)^{-1} = \\begin{bmatrix}4&-3\\\\-1&1\\end{bmatrix}$, find $A$.",
        steps: [
          "Let $M = \\begin{bmatrix}4&-3\\\\-1&1\\end{bmatrix}$. Inverting both sides of $(5A)^{-1} = M$ gives $5A = M^{-1}$.",
          "$\\det M = 4(1) - (-3)(-1) = 1$, so $M^{-1} = \\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}$.",
          "$A = \\tfrac15 M^{-1} = \\tfrac15\\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}$.",
          "Check: $(5A)M = \\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}\\begin{bmatrix}4&-3\\\\-1&1\\end{bmatrix} = \\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$ ✓.",
        ],
        answer: "$A = \\dfrac15\\begin{bmatrix}1&3\\\\1&4\\end{bmatrix}$.",
      },
      pitfalls: [
        "$(kA)^{-1} = kA^{-1}$ is wrong; the scalar inverts too: $\\tfrac1k A^{-1}$.",
        "Forgetting to divide by $\\det A$, or negating the diagonal instead of the off-diagonal.",
        "$XA = B$ gives $X = BA^{-1}$, not $A^{-1}B$. Multiply both sides on the same side as $A$ sits.",
        "$(A + B)^{-1} \\ne A^{-1} + B^{-1}$, and $(AB)^{-1} \\ne A^{-1}B^{-1}$ in general.",
      ],
      recall: [
        { q: "Inverse of $\\begin{bmatrix}2&1\\\\5&3\\end{bmatrix}$?", a: "$\\det = 1$, so $\\begin{bmatrix}3&-1\\\\-5&2\\end{bmatrix}$." },
        { q: "Solve $XA = B$ for $X$ ($A$ invertible).", a: "$X = BA^{-1}$." },
        { q: "$A^2 - 4A + 3I = 0$. Find $A^{-1}$.", a: "$A(4I - A) = 3I$, so $A^{-1} = \\tfrac13(4I - A)$." },
      ],
    },
  ],
  playbook: [
    "If you see a product → write the sizes first: $(m\\times n)(n\\times p) = m\\times p$. Undefined products are a favourite distractor.",
    "If you see \"the $(i,j)$ entry of $AB$\" → dot row $i$ of $A$ with column $j$ of $B$. Do not compute the whole matrix.",
    "If you see \"a row of $BA$\" → (that row of $B$)$\\times A$ = a combination of the rows of $A$. \"A column of $AB$\" → $A\\times$(that column of $B$) = a combination of the columns of $A$.",
    "If you see \"express a column of $AB$ as a combination of the columns of $A$\" → the weights are the matching column of $B$.",
    "If you see $a_{ij} = f(i,j)$ → write out the matrix row by row ($i$ fixed), then look for structure: $f(i,j) = f(j,i)$ means symmetric, $f(j,i) = -f(i,j)$ means skew.",
    "If you see $(A+B)^2$, $(A+B)(A-B)$ or $(AB)^2$ → expand keeping order; the school formula holds only if $AB = BA$.",
    "If you see $AB = 0$ or $AB = AC$ → no conclusion about $A$, $B$, $C$ unless something is invertible. Expect \"False\" or \"cannot be determined\".",
    "If you see $A^2 = kA + cI$ for a $2\\times2$ matrix → $k = \\operatorname{tr}A$, $c = -\\det A$. Confirm with one off-diagonal entry of $A^2$.",
    "If you see $M^2 = pM + qI$ and a high power $M^n$ → iterate $M^{n+1} = M\\cdot M^n$ and substitute $M^2$ each time; tabulate $(a_n, b_n)$.",
    "If you see a transpose of a product → reverse the order: $(AB)^T = B^TA^T$. Same rule for inverses: $(AB)^{-1} = B^{-1}A^{-1}$.",
    "If you see the trace of a product or sum → use linearity, $\\operatorname{tr}(A^T) = \\operatorname{tr}A$ and $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$; only diagonal entries are ever needed.",
    "If you see symmetric/skew statements → test with transposes: $(A + A^T)^T = A + A^T$, $(AB)^T = BA$ for symmetric $A, B$, skew diagonals are zero.",
    "If you see $\\mathbf{u}\\mathbf{v}^T$ → $m\\times n$, rank 1, columns $\\parallel\\mathbf{u}$, rows $\\parallel\\mathbf{v}^T$, $\\operatorname{tr} = \\mathbf{u}\\cdot\\mathbf{v}$.",
    "If you see $(kA)^{-1} = M$ → $A = \\tfrac1k M^{-1}$; for $2\\times2$ use swap–negate–divide. For $AX = B$ multiply by $A^{-1}$ on the left, for $XA = B$ on the right.",
  ],
};
