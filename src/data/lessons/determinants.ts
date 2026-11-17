import type { Lesson } from "@/lib/types";

export const determinantsLesson: Lesson = {
  topic: "determinants",
  bigPicture:
    "The notes define the determinant $|A|$ of a square matrix by its **properties** (Rules 1–10 in 3.1) and compute it by **elimination**: reduce $A$ to an upper triangular $U$, then $|A| = \\pm$(product of the pivots). The same rules tell you when $A$ is invertible ($|A| \\ne 0$) and give the algebra $|AB| = |A||B|$, $|A^T| = |A|$, $|kA| = k^n|A|$, $|A^{-1}| = 1/|A|$. Section 3.2 reads $|A|$ geometrically: the area (or volume) of the parallelogram (parallelepiped) determined by the columns of $A$ is $\\text{abs}(|A|)$. Section 3.3 uses this for linear transformations: $T(\\mathbf{x}) = A\\mathbf{x}$ multiplies every area (volume) by $\\text{abs}(|A|)$. Exam questions test the rules (row operations, $k^n$, products and inverses), the patterns that make a determinant collapse, and areas/volumes.",
  sections: [
    {
      title: "The defining properties: Rules 1–6",
      refs: ["Slides 3.1 Properties of determinants, Rules 1–6 (det p3–5)", "Tutor slides, Tutorial 3 Q1 (tut5 p4–5)", "PYP AY25/26 S2 Q2"],
      intuition:
        "Rules 1–3 are the definition: they say what $|I|$ is, what a row exchange does and how $|A|$ reacts to one row being scaled or split. Every other rule follows from these, so a question like \"$B$ is obtained from $A$ by these row operations\" is answered by multiplying one factor per operation.",
      keyIdeas: [
        "**Rule 1.** $|I| = 1$ for the $n\\times n$ identity matrix.",
        "**Rule 2.** Exchanging two rows changes the sign of the determinant. A permutation matrix $P$ obtained with $r$ row exchanges has $|P| = 1$ for even $r$ and $|P| = -1$ for odd $r$.",
        "**Rule 3.** $|A|$ is a linear function of each row separately: multiplying **one** row by $t$ multiplies $|A|$ by $t$; and if one row is a sum, the determinant splits into a sum, **provided the other rows do not change**.",
        "**Rule 4.** If two rows of $A$ are equal, $|A| = 0$ (exchange them: by Rule 2 $|A| = -|A|$).",
        "**Rule 5.** Subtracting a multiple of one row from another row leaves $|A|$ unchanged (follows from Rules 3 and 4).",
        "**Rule 6.** A matrix with a row of zeros has $|A| = 0$.",
        "For a sequence of operations multiply the factors: exchange $\\times(-1)$, scaling one row by $t$ $\\times t$, replacement $\\times 1$.",
      ],
      formulas: [
        "\\begin{vmatrix} ta & tb \\\\ c & d \\end{vmatrix} = t\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}, \\qquad \\begin{vmatrix} c & d \\\\ a & b \\end{vmatrix} = -\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}, \\qquad \\begin{vmatrix} a & b \\\\ c - la & d - lb \\end{vmatrix} = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}",
        "\\begin{vmatrix} a + a' & b + b' \\\\ c & d \\end{vmatrix} = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} + \\begin{vmatrix} a' & b' \\\\ c & d \\end{vmatrix}",
      ],
      example: {
        problem:
          "$A$ is a $3\\times3$ matrix with $|A| = -2$. $B$ is obtained from $A$ by: interchanging rows 1 and 3; then multiplying row 2 by 5; then adding 7 times row 2 to row 1. Find $|B|$.",
        steps: [
          "Interchange rows 1 and 3: Rule 2, factor $-1$. The determinant is now $2$.",
          "Multiply row 2 by 5: Rule 3, factor $5$. The determinant is now $10$.",
          "Add 7 times row 2 to row 1: Rule 5, no change (the 7 never enters).",
          "$|B| = (-1)(5)(1)(-2) = 10$.",
        ],
        answer: "$|B| = 10$.",
      },
      pitfalls: [
        "A replacement $R_1 \\to R_1 + 7R_2$ does **not** multiply the determinant by 7.",
        "\"$R_i \\to 2R_i + R_j$\" is a scaling **and** a replacement: it multiplies the determinant by 2.",
        "Rule 3 scales **one** row. Multiplying the whole matrix by $t$ scales all $n$ rows, so $|tA| = t^n|A|$.",
        "The sum rule in Rule 3 only works when the other rows stay the same, so $|A + B| \\ne |A| + |B|$ in general.",
      ],
      recall: [
        { q: "$|A| = 3$. Swap two rows, then triple one row. New determinant?", a: "$(-1)(3)(3) = -9$." },
        { q: "Which rules make $|A| = 0$ immediately?", a: "Rule 4 (two equal rows) and Rule 6 (a row of zeros)." },
        { q: "$|P|$ for a permutation matrix built with 3 row exchanges?", a: "$-1$ (odd number of exchanges)." },
      ],
      visuals: ["row-ops-area"],
    },
    {
      title: "Triangular matrices and the product of pivots: Rule 7",
      refs: ["Slides 3.1 Rules 5, 7 and 8 (det p5–8)", "Tutorial 3 Q2; tutor slides (tut5 p7–9)", "Tutor slides, 2×2 and 3×3 formulas (tut5 p3, p12)"],
      intuition:
        "For a diagonal matrix, factor $a_{11}, a_{22}, \\dots$ out of the rows (Rule 3) and you are left with $|I| = 1$. A triangular matrix can be made diagonal by Rule 5 without changing $|A|$. Elimination turns any $A$ into a triangular $U$, so $|A|$ is just the product of the pivots, with a sign for each row exchange.",
      keyIdeas: [
        "**Rule 7.** If $A$ is triangular (upper, lower or diagonal), $|A| = a_{11}a_{22}\\cdots a_{nn}$, the product of the diagonal entries.",
        "Elimination (Rule 5) does not change $|A|$, so $|A| = |U|$ without row exchanges and $|A| = \\pm|U|$ with row exchanges: $+$ for an even number of exchanges, $-$ for an odd number.",
        "Hence $|A| = \\pm(\\text{product of the pivots})$.",
        "$2\\times2$: $\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$ (the product of the two pivots).",
        "$3\\times3$ (tutorial formula, along row 1): $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$.",
        "If you divide a row by a number during elimination (Rule 3), multiply that number back in.",
      ],
      formulas: [
        "|A| = \\pm|U| = \\pm\\,u_{11}u_{22}\\cdots u_{nn}",
        "\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)",
      ],
      example: {
        problem: "Reduce $A = \\begin{bmatrix} 0 & 2 & 4 \\\\ 1 & 3 & -1 \\\\ 2 & 8 & 6 \\end{bmatrix}$ to $U$ to find $|A|$ as the product of pivots.",
        steps: [
          "$R_1 \\leftrightarrow R_2$ (one row exchange, sign flips): $\\begin{bmatrix} 1 & 3 & -1 \\\\ 0 & 2 & 4 \\\\ 2 & 8 & 6 \\end{bmatrix}$.",
          "$R_3 \\to R_3 - 2R_1$ (Rule 5, no change): $R_3 = (0, 2, 8)$.",
          "$R_3 \\to R_3 - R_2$ (no change): $R_3 = (0, 0, 4)$. Now $U = \\begin{bmatrix} 1 & 3 & -1 \\\\ 0 & 2 & 4 \\\\ 0 & 0 & 4 \\end{bmatrix}$.",
          "Pivots $1, 2, 4$ and one exchange: $|A| = -(1)(2)(4) = -8$. Check with the $3\\times3$ formula: $0(18 + 8) - 2(6 + 2) + 4(8 - 6) = -8$.",
        ],
        answer: "$|A| = -8$.",
      },
      pitfalls: [
        "The product of the diagonal of $A$ itself means nothing unless $A$ is already triangular.",
        "Count the row exchanges: an odd number flips the sign.",
        "In the $3\\times3$ formula the middle term has a minus sign: $-b(di - fg)$.",
      ],
      recall: [
        { q: "Determinant of an upper triangular matrix with diagonal $2, -1, 5$?", a: "$-10$." },
        { q: "Elimination used 2 row exchanges, pivots $3, -2, 1$. What is $|A|$?", a: "$+(3)(-2)(1) = -6$." },
        { q: "Tutorial 3 Q2: $A = \\begin{bmatrix} 1&1&1\\\\1&2&3\\\\1&2&2 \\end{bmatrix}$. $|A| = ?$", a: "$U$ has pivots $1, 1, -1$, so $|A| = -1$." },
      ],
    },
    {
      title: "Singular or invertible: Rule 8",
      refs: ["Slides 3.1 Rules 6–8 (det p5–8)", "Slides 2.2 Theorem 2.4, the Invertible Matrix Theorem (alg p10)", "PYP AY24/25 S2 Q5"],
      intuition:
        "Elimination never changes whether $|A|$ is zero. If $A$ is singular, $U$ has a zero row and $|A| = 0$; if $A$ is invertible, $U$ has $n$ nonzero pivots and their product is not zero.",
      keyIdeas: [
        "**Rule 8.** If $A$ is singular, $|A| = 0$. If $A$ is invertible, $|A| \\ne 0$.",
        "So $|A| \\ne 0$ goes together with every statement of the Invertible Matrix Theorem: $A$ has $n$ pivot positions; $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution; the columns of $A$ are linearly independent; $A\\mathbf{x} = \\mathbf{b}$ has a solution for each $\\mathbf{b}$; the columns span $\\mathbb{R}^n$; $A^T$ is invertible.",
        "If one row is a combination of others, e.g. $R_2 + R_4 = R_6$, then $R_6 \\to R_6 - R_2 - R_4$ (Rule 5) gives a zero row (Rule 6), so $|A| = 0$. The same holds for columns.",
        "Parameter questions (\"for which $k$ is $A$ singular / not invertible / does $A\\mathbf{x} = \\mathbf{0}$ have a nontrivial solution\"): compute $|A|$ as an expression in $k$ and solve $|A| = 0$. Simplify with Rule 5 first and look for a factor to pull out with Rule 3.",
      ],
      formulas: ["A \\text{ invertible} \\iff |A| \\ne 0"],
      example: {
        problem:
          "For which $k$ does $kx_1 + x_2 + x_3 = 1$, $x_1 + kx_2 + x_3 = 1$, $x_1 + x_2 + kx_3 = 1$ fail to have a unique solution?",
        steps: [
          "The solution is unique exactly when $A = \\begin{bmatrix} k & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{bmatrix}$ is invertible, i.e. $|A| \\ne 0$.",
          "Add columns 2 and 3 to column 1 (Rule 5 for columns, no change): every entry of column 1 becomes $k + 2$. Factor it out (Rule 3): $|A| = (k+2)\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{vmatrix}$.",
          "Subtract row 1 from rows 2 and 3: $\\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & k-1 & 0 \\\\ 0 & 0 & k-1 \\end{vmatrix} = (k-1)^2$ (Rule 7). So $|A| = (k+2)(k-1)^2$.",
          "$|A| = 0$ for $k = -2$ or $k = 1$.",
        ],
        answer: "Exactly two values: $k = 1$ and $k = -2$.",
      },
      pitfalls: [
        "$|A| = 0$ does **not** need two equal or proportional rows: in $\\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$, $R_1 + R_3 = 2R_2$, so $R_3 \\to R_3 + R_1 - 2R_2$ gives a zero row.",
        "Expanding a parametric $3\\times3$ blindly gives a cubic that is hard to factor. Use a column or row replacement first to expose a factor.",
        "\"How many values of $k$\" counts distinct values: $(k-1)^2$ gives one value.",
      ],
      recall: [
        { q: "$|A| = -7$. Does $A\\mathbf{x} = \\mathbf{0}$ have nontrivial solutions?", a: "No: $|A| \\ne 0$, so $A$ is invertible and only $\\mathbf{x} = \\mathbf{0}$ works." },
        { q: "For which $k$ is $\\begin{bmatrix} k & 4 \\\\ 1 & k \\end{bmatrix}$ singular?", a: "$k^2 - 4 = 0$: $k = \\pm 2$." },
        { q: "$A$ is $6\\times6$ with row 2 + row 4 = row 6. $|A| = ?$", a: "$0$." },
      ],
    },
    {
      title: "Products and transposes: Rules 9 and 10",
      refs: ["Slides 3.1 Rules 9–10 (det p9–10)", "Tutorial 3 Q1, Q3; tutor slides (tut5 p5–6, p10–12)", "PYP AY25/26 S1 Q10; older PYPs: |Q| when QᵀQ = I, |AᵀA⁻¹|"],
      intuition:
        "Rule 9 turns matrix multiplication into number multiplication, and Rule 10 says rows and columns behave the same. Almost every \"find $|\\cdots|$\" question is solved by peeling off one factor at a time, remembering that a scalar comes out once **per row**.",
      keyIdeas: [
        "**Rule 9.** $|AB| = |A||B|$. So $|A^2| = |A|^2$ and $|AB| = |BA|$.",
        "**Rule 10.** $|A^T| = |A|$. All the properties apply to **columns** as well as rows.",
        "$|A^{-1}| = 1/|A|$, because $|AA^{-1}| = |I| = 1$.",
        "$|kA| = k^n|A|$ for an $n\\times n$ matrix: Rule 3 once for each of the $n$ rows. For $3\\times3$: $|\\tfrac12A| = (\\tfrac12)^3|A|$, $|-A| = (-1)^3|A| = -|A|$.",
        "Consequences used in the finals: $|A||A^{-1}| = 1$; $|A^TA^{-1}| = |A|/|A| = 1$; $|A^TA| = |A|^2 \\ge 0$; $Q^TQ = I \\Rightarrow |Q|^2 = 1 \\Rightarrow |Q| = \\pm1$; $A^3 = 0 \\Rightarrow |A|^3 = 0 \\Rightarrow |A| = 0$.",
        "Skew-symmetric $3\\times3$ ($A = -A^T$): $|A| = |-A^T| = (-1)^3|A^T| = -|A|$, so $|A| = 0$ (Tutorial 3 Q3).",
      ],
      formulas: [
        "|AB| = |A||B|, \\quad |A^T| = |A|, \\quad |A^{-1}| = \\frac{1}{|A|}, \\quad |kA| = k^n|A|",
      ],
      example: {
        problem: "$A$ and $B$ are $3\\times3$ with $|A| = 2$ and $|B| = -3$. Find $|2A^TB^{-1}A^2|$ and $|{-\\tfrac12}A^{-1}|$.",
        steps: [
          "$|2A^TB^{-1}A^2| = 2^3\\,|A^T|\\,|B^{-1}|\\,|A|^2 = 8\\cdot 2\\cdot\\left(-\\tfrac13\\right)\\cdot 4$.",
          "$= -\\tfrac{64}{3}$.",
          "$|{-\\tfrac12}A^{-1}| = \\left(-\\tfrac12\\right)^3\\cdot\\tfrac12 = -\\tfrac18\\cdot\\tfrac12 = -\\tfrac1{16}$.",
          "Check the trap: writing $2|A^T|\\cdots$ instead of $2^3|A^T|\\cdots$ would give $-\\tfrac{16}{3}$.",
        ],
        answer: "$-\\tfrac{64}{3}$ and $-\\tfrac{1}{16}$.",
      },
      pitfalls: [
        "$|5A| = 5|A|$ is **false** for a $3\\times3$ matrix: it is $5^3|A|$. This exact statement was the false option in AY25/26 S1 Q10.",
        "$A^2 = I$ gives $|A| = \\pm1$, not necessarily $1$; the same for $Q^TQ = I$.",
        "There is no sum rule: $|A + B| \\ne |A| + |B|$ in general (Rule 3 only splits one row while the others stay fixed).",
      ],
      recall: [
        { q: "Tutorial 3 Q1: $A$ is $3\\times3$ with $|A| = -1$. Find $|\\tfrac12A|$, $|-A|$, $|A^2|$, $|A^{-1}|$.", a: "$-\\tfrac18$, $1$, $1$, $-1$." },
        { q: "Why is $|A^TA| \\ge 0$?", a: "$|A^TA| = |A^T||A| = |A|^2 \\ge 0$." },
        { q: "$Q^TQ = I$. Possible values of $|Q|$?", a: "$\\pm1$." },
      ],
    },
    {
      title: "Column operations and patterns that collapse a determinant",
      refs: ["Slides 3.1 Rules 2–7 and \"all the above properties apply to columns also\" (det p10)", "Slides 3.2 column operations (det p12)", "PYP AY24/25 S2 Q9; older PYPs: b_ij = 2^{i+j}a_ij, scaling columns by 4 and 3/4, sparse 5×5"],
      intuition:
        "Most exam determinants are designed to collapse. Because every rule works for columns too, you can factor numbers out of rows **and** columns, add columns together, or exchange rows until the matrix is triangular.",
      keyIdeas: [
        "Column versions of the rules: exchanging two columns $\\times(-1)$; scaling one column by $t$ $\\times t$; adding a multiple of one column to another $\\times 1$.",
        "Scaling column 1 by 4 and column 2 by $\\tfrac34$ multiplies $|A|$ by $4\\cdot\\tfrac34 = 3$.",
        "Entry scaling $b_{ij} = c^{i+j}a_{ij}$ ($n\\times n$): factor $c^i$ out of row $i$ and $c^j$ out of column $j$ (Rule 3), so $|B| = c^{(1+\\cdots+n)}\\,c^{(1+\\cdots+n)}|A| = c^{n(n+1)}|A|$. For $n = 3$, $c = 2$: $|B| = 2^{12}|A|$.",
        "Same row sum: if every row sums to $s$, add all columns to column 1 (no change), so column 1 is all $s$; factor $s$ out and subtract row 1 from the other rows.",
        "Exactly one nonzero entry in each row and column: exchange rows until the entries sit on the diagonal (Rule 2), then multiply them (Rule 7). The sign is $(-1)^{\\text{number of exchanges}}$.",
        "Columns of $B$ written as combinations of the columns of $A$: either use column operations, or write $B = AM$ (column $j$ of $M$ holds the coefficients of column $j$ of $B$) and use Rule 9: $|B| = |A||M|$.",
      ],
      formulas: [
        "b_{ij} = c^{i+j}a_{ij} \\Rightarrow |B| = c^{n(n+1)}|A|",
      ],
      example: {
        problem:
          "Evaluate $\\begin{vmatrix} 1+a & b & c & d \\\\ a & 1+b & c & d \\\\ a & b & 1+c & d \\\\ a & b & c & 1+d \\end{vmatrix}$ (AY24/25 S2 Q9).",
        steps: [
          "Every row sums to $1 + a + b + c + d$. Add columns 2, 3, 4 to column 1 (no change): column 1 becomes $(1+a+b+c+d)(1,1,1,1)^T$.",
          "Factor $1+a+b+c+d$ out of column 1 (Rule 3): $(1+a+b+c+d)\\begin{vmatrix} 1 & b & c & d \\\\ 1 & 1+b & c & d \\\\ 1 & b & 1+c & d \\\\ 1 & b & c & 1+d \\end{vmatrix}$.",
          "Subtract row 1 from rows 2, 3, 4 (Rule 5): they become $(0,1,0,0)$, $(0,0,1,0)$, $(0,0,0,1)$. The matrix is upper triangular with diagonal $1,1,1,1$.",
          "By Rule 7 the determinant is $(1+a+b+c+d)\\cdot 1 = 1 + a + b + c + d$.",
        ],
        answer: "$1 + a + b + c + d$.",
      },
      pitfalls: [
        "In $b_{ij} = c^{i+j}a_{ij}$ every entry gets **two** factors (one from its row, one from its column), so the exponent is $n(n+1)$, not $n(n+1)/2$.",
        "When columns are rebuilt from the **original** columns (e.g. $[\\mathbf{a}_1 + \\mathbf{a}_2,\\ \\mathbf{a}_2 + \\mathbf{a}_3,\\ \\mathbf{a}_3 + \\mathbf{a}_1]$), it is not a sequence of replacements; use $|B| = |A||M|$.",
        "For the one-entry-per-row pattern, count the row exchanges carefully: the sign is easy to get wrong.",
      ],
      recall: [
        { q: "$|A| = 2$ ($3\\times3$) and $b_{ij} = 2^{i+j}a_{ij}$. $|B| = ?$", a: "$2^{12}\\cdot 2 = 2^{13}$." },
        { q: "Column 1 of $A$ is scaled by 4 and column 2 by $\\tfrac34$. New determinant?", a: "$3|A|$." },
        { q: "$|A| = 3$ ($3\\times3$). What is $|[\\mathbf{a}_1 + \\mathbf{a}_2,\\ \\mathbf{a}_2 + \\mathbf{a}_3,\\ \\mathbf{a}_3 + \\mathbf{a}_1]|$?", a: "$|A|\\cdot\\begin{vmatrix}1&0&1\\\\1&1&0\\\\0&1&1\\end{vmatrix} = 3\\cdot2 = 6$." },
      ],
    },
    {
      title: "Determinants as area or volume: Theorem 3.1",
      refs: ["Slides 3.2 Theorem 3.1 (det p11–15)", "Slides 3.2 Exercise 3.2.1 (det p16)", "Tutorial 3 Q4; tutor slides (tut5 p3, p13–15)"],
      intuition:
        "For a diagonal matrix the columns determine a rectangle (or box) whose area (volume) is $\\text{abs}(|A|)$. Exchanging two columns or adding a multiple of one column to another changes neither the shape's area (volume) nor $\\text{abs}(|A|)$, and these operations turn any $A$ into a diagonal matrix. So the two always agree.",
      keyIdeas: [
        "**Theorem 3.1.** If $A$ is $2\\times2$, the area of the parallelogram determined by the columns of $A$ is $\\text{abs}(|A|)$. If $A$ is $3\\times3$, the volume of the parallelepiped determined by the columns of $A$ is $\\text{abs}(|A|)$.",
        "Adding $c\\,\\mathbf{a}_1$ to $\\mathbf{a}_2$ keeps the same base and the same height, so the area (volume) is unchanged.",
        "Translating a parallelogram does not change its area. If no vertex is at the origin, subtract one vertex from all four: the two vertices **adjacent** to it give the columns of $A$.",
        "A parallelepiped with one vertex at the origin and adjacent vertices $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}$ has volume $\\text{abs}(|[\\mathbf{u}\\ \\mathbf{v}\\ \\mathbf{w}]|)$.",
      ],
      formulas: [
        "\\text{area} = \\text{abs}\\left(|[\\mathbf{a}_1\\ \\mathbf{a}_2]|\\right), \\qquad \\text{volume} = \\text{abs}\\left(|[\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{a}_3]|\\right)",
      ],
      example: {
        problem: "Calculate the area of the parallelogram determined by the points $(-2,-2)$, $(0,3)$, $(4,-1)$, $(6,4)$ (Exercise 3.2.1).",
        steps: [
          "Translate so that $(-2,-2)$ goes to the origin: subtract $(-2,-2)$ from each vertex. The new vertices are $(0,0)$, $(2,5)$, $(6,1)$, $(8,6)$.",
          "The vertices adjacent to the origin are $(2,5)$ and $(6,1)$ (their sum is the fourth vertex $(8,6)$), so the parallelogram is determined by the columns of $A = \\begin{bmatrix} 2 & 6 \\\\ 5 & 1 \\end{bmatrix}$.",
          "$|A| = 2 - 30 = -28$.",
          "Area $= \\text{abs}(-28) = 28$.",
        ],
        answer: "Area $= 28$.",
      },
      pitfalls: [
        "An area or volume is never negative: take $\\text{abs}(|A|)$.",
        "Using the position vectors of the vertices directly is wrong unless one vertex is the origin.",
        "Pick the two vertices **adjacent** to the base vertex, not the opposite one.",
      ],
      recall: [
        { q: "Volume of the parallelepiped with a vertex at the origin and adjacent vertices $(1,3,0), (-2,0,2), (-1,3,-1)$?", a: "$\\text{abs}(-18) = 18$ (Tutorial 3 Q4)." },
        { q: "Does exchanging the two columns of $A$ change the area of the parallelogram?", a: "No; it only changes the sign of $|A|$." },
        { q: "Area of the parallelogram determined by the columns of $\\begin{bmatrix} 3 & 0 \\\\ 0 & -2 \\end{bmatrix}$?", a: "$\\text{abs}(-6) = 6$, a $3\\times2$ rectangle." },
      ],
      visuals: ["det-area-2d"],
    },
    {
      title: "Linear transformations scale area and volume: Theorem 3.2",
      refs: ["Slides 3.3 Theorem 3.2 (det p17–20)", "PYP AY25/26 S2 Q4; older PYP: volume of a parallelepiped before and after T"],
      intuition:
        "A parallelogram determined by $\\mathbf{b}_1, \\mathbf{b}_2$ is sent by $T(\\mathbf{x}) = A\\mathbf{x}$ to the parallelogram determined by $A\\mathbf{b}_1, A\\mathbf{b}_2$, the columns of $AB$. By Rule 9 its area is $\\text{abs}(|A|)\\,\\text{abs}(|B|)$: the old area times $\\text{abs}(|A|)$.",
      keyIdeas: [
        "**Theorem 3.2.** Let $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ be determined by a $2\\times2$ matrix $A$. If $S$ is a parallelogram, area of $T(S) = \\text{abs}(|A|)\\times$ area of $S$. If $T$ is determined by a $3\\times3$ matrix $A$ and $S$ is a parallelepiped, volume of $T(S) = \\text{abs}(|A|)\\times$ volume of $S$.",
        "Proof idea: $S = \\{s_1\\mathbf{b}_1 + s_2\\mathbf{b}_2 : 0 \\le s_1, s_2 \\le 1\\}$, $T(S)$ is determined by the columns of $AB$ with $B = [\\mathbf{b}_1\\ \\mathbf{b}_2]$, and $\\text{abs}(|AB|) = \\text{abs}(|A|)\\,\\text{abs}(|B|)$. A parallelogram $\\mathbf{p} + S$ not at the origin works the same way since translation does not affect area.",
        "The image of the unit cube (unit square) has volume (area) $\\text{abs}(|A|)$.",
        "Theorem 3.2 applies to arbitrary shapes too: the unit disk ($\\pi 1^2$) is sent by $A = \\begin{bmatrix} a & 0 \\\\ 0 & b \\end{bmatrix}$ to the ellipse $\\tfrac{x_1^2}{a^2} + \\tfrac{x_2^2}{b^2} = 1$ of area $ab\\times\\pi = \\pi ab$.",
        "Applying $T$ twice multiplies by $\\text{abs}(|A|)$ twice: $\\text{abs}(|A^2|) = |A|^2$.",
      ],
      formulas: [
        "\\text{area of } T(S) = \\text{abs}(|A|)\\times\\text{area of } S, \\qquad \\text{volume of } T(S) = \\text{abs}(|A|)\\times\\text{volume of } S",
      ],
      example: {
        problem:
          "$S$ is the parallelepiped with a vertex at the origin and adjacent vertices $(1,0,2)$, $(2,1,0)$, $(0,3,1)$. Find its volume, and the volume of $T(S)$ for $T(\\mathbf{x}) = A\\mathbf{x}$, $A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 0 & 3 & 1 \\\\ 1 & 0 & -1 \\end{bmatrix}$.",
        steps: [
          "Adjacent vertices as columns (Theorem 3.1): $\\begin{vmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 2 & 0 & 1 \\end{vmatrix} = 1(1-0) - 2(0-6) + 0 = 13$, so the volume of $S$ is $13$.",
          "$|A| = 2(-3-0) - 1(0-1) + 0(0 - 3) = -6 + 1 = -5$ (3×3 formula).",
          "Volume of $T(S) = \\text{abs}(|A|)\\times 13 = 5\\cdot 13 = 65$ (Theorem 3.2).",
        ],
        answer: "Volume of $S = 13$, volume of $T(S) = 65$.",
      },
      pitfalls: [
        "A volume of $-12$ is never an answer: use $\\text{abs}(|A|)$.",
        "Multiply by $\\text{abs}(|A|)$ to go from $S$ to $T(S)$; divide to go back.",
        "The factor is $\\text{abs}(|A|)$, not the sum of the diagonal entries or the largest entry.",
      ],
      recall: [
        { q: "Volume of the image of the unit cube under $A$?", a: "$\\text{abs}(|A|)$." },
        { q: "$T$ has $|A| = -3$ and $S$ has area 4. Area of $T(S)$?", a: "$12$." },
        { q: "Area of the ellipse $\\tfrac{x_1^2}{a^2} + \\tfrac{x_2^2}{b^2} = 1$?", a: "$\\pi ab$: the unit disk times $\\text{abs}(|A|) = ab$." },
      ],
      visuals: ["det-volume-3d"],
    },
  ],
  playbook: [
    "If you see \"$B$ is obtained from $A$ by …\" → exchange $\\times(-1)$, scaling one row (or column) by $t$ $\\times t$, replacement $\\times1$; multiply the factors.",
    "If you see a numeric $3\\times3$ → the tutorial formula $a(ei - fh) - b(di - fg) + c(dh - eg)$, or elimination.",
    "If you see a $4\\times4$ (or bigger) numeric determinant → eliminate to triangular $U$, count the row exchanges, multiply the pivots.",
    "If you see $|kA|$, $|A^{-1}|$, $|A^T|$, $|AB|$ → peel factors: $k^n$, $1/|A|$, $|A|$, $|A||B|$. Never $|kA| = k|A|$.",
    "If you see $b_{ij} = c^{i+j}a_{ij}$ → factor $c^i$ from each row and $c^j$ from each column: $|B| = c^{n(n+1)}|A|$.",
    "If you see the columns of $B$ written as combinations of $\\mathbf{a}_1, \\dots, \\mathbf{a}_n$ → column operations, or $B = AM$ and $|B| = |A||M|$.",
    "If you see rows (columns) that are equal, proportional, or satisfy a relation like $R_2 + R_4 = R_6$ → Rule 5 makes a zero row, so the determinant is 0.",
    "If you see every row summing to the same thing (e.g. $1+a+b+c+d$ patterns, $k$ on the diagonal and 1's elsewhere) → add all columns into column 1 and factor.",
    "If you see one nonzero entry in each row and column → exchange rows until it is diagonal; sign $= (-1)^{\\text{exchanges}}$.",
    "If you see \"for which $k$ is $A$ singular / not invertible / $A\\mathbf{x} = \\mathbf{0}$ nontrivial / unique solution fails\" → solve $|A| = 0$ (Rule 8).",
    "If you see $A^2 = I$ or $Q^TQ = I$ → $|A| = \\pm1$; the sign cannot be determined. If you see $A^3 = 0$ or skew-symmetric $3\\times3$ → $|A| = 0$. If you see $A^TA$ → $|A|^2 \\ge 0$.",
    "If you see area/volume → $\\text{abs}(|A|)$ with the adjacent edge vectors as columns (translate a vertex to the origin first); under $T(\\mathbf{x}) = A\\mathbf{x}$ multiply by $\\text{abs}(|A|)$.",
  ],
};
