import type { Lesson } from "@/lib/types";

export const determinantsLesson: Lesson = {
  topic: "determinants",
  bigPicture:
    "The determinant packs a square matrix into one number that answers two questions at once: **is $A$ invertible?** ($|A| \\ne 0$) and **by what factor does $\\mathbf{x}\\mapsto A\\mathbf{x}$ scale areas and volumes?** ($|\\det A|$, with the sign recording whether orientation flips). The chain goes: definition by cofactor expansion → the triangular shortcut → how each row operation changes $|A|$, which gives the fast method (row reduce, multiply pivots) → the algebra rules $|AB| = |A||B|$, $|A^T| = |A|$, $|kA| = k^n|A|$ → invertibility tests with a parameter → Cramer's rule and $A^{-1} = \\operatorname{adj}A/|A|$ → areas and volumes. Exam questions almost never ask for a brute-force $4\\times4$ expansion; they test the rules (row operations, $k^n$, products and inverses) and the pattern-spotting that makes a determinant collapse.",
  sections: [
    {
      title: "2×2 and 3×3 determinants, minors and cofactor expansion",
      intuition:
        "A determinant is built recursively: an $n\\times n$ determinant is a signed combination of $(n-1)\\times(n-1)$ determinants. You may expand along **any** row or column and get the same number, so always pick the line with the most zeros.",
      keyIdeas: [
        "$2\\times2$: $\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$.",
        "**Minor** $M_{ij}$: the determinant of the matrix left after deleting row $i$ and column $j$. **Cofactor** $C_{ij} = (-1)^{i+j}M_{ij}$.",
        "Sign pattern (checkerboard), starting with $+$ in the top-left: $\\begin{bmatrix} + & - & + & \\cdots \\\\ - & + & - & \\\\ + & - & + & \\\\ \\vdots & & & \\ddots \\end{bmatrix}$.",
        "Cofactor expansion along row $i$: $|A| = a_{i1}C_{i1} + a_{i2}C_{i2} + \\dots + a_{in}C_{in}$; along column $j$: $|A| = a_{1j}C_{1j} + \\dots + a_{nj}C_{nj}$. Every row and column gives the same answer.",
        "Zero entries kill their whole term, so a row or column with one nonzero entry reduces an $n\\times n$ determinant to a single $(n-1)\\times(n-1)$ one.",
        "Sarrus' diagonal rule works **only** for $3\\times3$. Never use it on a $4\\times4$.",
      ],
      formulas: [
        "|A| = \\sum_{j=1}^{n} a_{ij}C_{ij} = \\sum_{i=1}^{n} a_{ij}C_{ij}, \\qquad C_{ij} = (-1)^{i+j}M_{ij}",
        "\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)",
      ],
      example: {
        problem:
          "Evaluate $|A|$ for $A = \\begin{bmatrix} 2 & 0 & 0 & 3 \\\\ 1 & -1 & 0 & 4 \\\\ 5 & 2 & 0 & 1 \\\\ 0 & 3 & 1 & -2 \\end{bmatrix}$.",
        steps: [
          "Column 3 has only one nonzero entry, $a_{43} = 1$. Expanding along column 3 leaves one term: $|A| = a_{43}C_{43}$.",
          "Sign: $(-1)^{4+3} = -1$, so $C_{43} = -M_{43}$ with $M_{43} = \\begin{vmatrix} 2 & 0 & 3 \\\\ 1 & -1 & 4 \\\\ 5 & 2 & 1 \\end{vmatrix}$ (delete row 4 and column 3).",
          "Expand $M_{43}$ along row 1 (it has a zero): $2\\begin{vmatrix} -1 & 4 \\\\ 2 & 1 \\end{vmatrix} - 0 + 3\\begin{vmatrix} 1 & -1 \\\\ 5 & 2 \\end{vmatrix} = 2(-1-8) + 3(2+5) = -18 + 21 = 3$.",
          "$|A| = (1)(-1)(3) = -3$.",
        ],
        answer: "$|A| = -3$.",
      },
      pitfalls: [
        "Forgetting the sign $(-1)^{i+j}$ is the most common error. Position $(4,3)$ has sign $-$, position $(2,2)$ has $+$.",
        "The minor $M_{ij}$ deletes row $i$ **and** column $j$; $C_{ij}$ and $C_{ji}$ are different numbers in general.",
        "Sarrus' rule for a $4\\times4$ gives nonsense. Use cofactors or row reduction.",
      ],
      recall: [
        { q: "What is $C_{23}$ in terms of $M_{23}$?", a: "$C_{23} = (-1)^{5}M_{23} = -M_{23}$." },
        { q: "Which row or column should you expand along?", a: "The one with the most zeros; the answer is the same for every choice." },
        { q: "Sign attached to $a_{31}$ in a cofactor expansion?", a: "$(-1)^{3+1} = +$." },
      ],
    },
    {
      title: "Triangular matrices, row operations and the pivot method",
      intuition:
        "Expanding a triangular matrix down its first column again and again leaves just the diagonal. Row reduction turns any matrix into a triangular one, and each row operation changes the determinant in a predictable way, so you can track the change and multiply the pivots.",
      keyIdeas: [
        "If $A$ is triangular (upper or lower, including diagonal), $|A|$ is the **product of the diagonal entries**.",
        "**Replacement** $R_i \\to R_i + kR_j$: determinant unchanged.",
        "**Interchange** $R_i \\leftrightarrow R_j$: determinant changes sign.",
        "**Scaling** $R_i \\to kR_i$: determinant multiplied by $k$ (only one row is scaled).",
        "For a sequence of operations, multiply the factors: $|B| = (-1)^{\\#\\text{swaps}}\\,(k_1k_2\\cdots)\\,|A|$.",
        "Pivot method: reduce $A$ to an echelon form $U$ using replacements and $r$ interchanges only. Then $|A| = (-1)^r \\times (\\text{product of the pivots on the diagonal of } U)$. If some column has no pivot, $|A| = 0$.",
      ],
      formulas: [
        "|A| = (-1)^{r}\\,u_{11}u_{22}\\cdots u_{nn}",
        "R_i \\to R_i + kR_j:\\ \\times1, \\qquad R_i \\leftrightarrow R_j:\\ \\times(-1), \\qquad R_i \\to kR_i:\\ \\times k",
      ],
      example: {
        problem: "Find $|A|$ by row reduction, $A = \\begin{bmatrix} 0 & 2 & 4 \\\\ 1 & 3 & -1 \\\\ 2 & 8 & 6 \\end{bmatrix}$.",
        steps: [
          "$R_1 \\leftrightarrow R_2$ (one interchange, sign flips): $\\begin{bmatrix} 1 & 3 & -1 \\\\ 0 & 2 & 4 \\\\ 2 & 8 & 6 \\end{bmatrix}$.",
          "$R_3 \\to R_3 - 2R_1$ (no change): $R_3 = (0, 2, 8)$.",
          "$R_3 \\to R_3 - R_2$ (no change): $R_3 = (0, 0, 4)$. Now $U = \\begin{bmatrix} 1 & 3 & -1 \\\\ 0 & 2 & 4 \\\\ 0 & 0 & 4 \\end{bmatrix}$.",
          "Pivots $1, 2, 4$ with one interchange: $|A| = (-1)^1(1)(2)(4) = -8$.",
        ],
        answer: "$|A| = -8$.",
      },
      pitfalls: [
        "A replacement $R_1 \\to R_1 + 7R_2$ does **not** multiply the determinant by 7.",
        "\"$R_i \\to 2R_i + R_j$\" is a scaling **and** a replacement: it multiplies the determinant by 2.",
        "If you divide a row by a pivot to make it 1 during reduction, you must multiply that factor back in.",
        "Scaling one row by $k$ multiplies by $k$; scaling the whole matrix ($kA$) multiplies by $k^n$.",
      ],
      recall: [
        { q: "$|A| = 3$. Swap two rows, then triple one row. New determinant?", a: "$(-1)(3)(3) = -9$." },
        { q: "Determinant of an upper triangular matrix with diagonal $2, -1, 5$?", a: "$-10$." },
        { q: "Echelon form reached with 2 interchanges, pivots $3, -2, 1$. What is $|A|$?", a: "$(-1)^2(3)(-2)(1) = -6$." },
      ],
      visuals: ["row-ops-area"],
    },
    {
      title: "Transposes, column operations and patterns that collapse a determinant",
      intuition:
        "Because $|A^T| = |A|$, everything true for rows is true for columns. Most exam determinants are designed to collapse: look for repeated or dependent rows, a common factor, or a row/column sum that is the same everywhere.",
      keyIdeas: [
        "$|A^T| = |A|$, so column operations have the same effects as row operations (replacement $\\times1$, swap $\\times(-1)$, scale $\\times k$).",
        "$|A| = 0$ if $A$ has a zero row/column, two equal rows/columns, two proportional rows/columns, or more generally any linear dependence among its rows or columns (e.g. $R_2 + R_4 = R_6$).",
        "Combinations of columns: if $B = [\\,\\mathbf{b}_1 \\cdots \\mathbf{b}_n]$ with each $\\mathbf{b}_j$ a combination of the columns of $A$, then $B = AM$ and $|B| = |A||M|$. E.g. $|[\\mathbf{a}_1 + \\mathbf{a}_2,\\ \\mathbf{a}_2 + \\mathbf{a}_3,\\ \\mathbf{a}_3 + \\mathbf{a}_1]| = 2|A|$.",
        "Entry scaling: $b_{ij} = c^{i+j}a_{ij}$ means $B = DAD$ with $D = \\operatorname{diag}(c, c^2, \\dots, c^n)$, so $|B| = c^{2(1+2+\\cdots+n)}|A| = c^{n(n+1)}|A|$. For $b_{ij} = c^{i-j}a_{ij}$, $B = DAD^{-1}$ and $|B| = |A|$.",
        "Constant row sum trick: if every row sums to $s$, add all columns to column 1 to get a column of $s$'s and factor $s$ out. This gives $\\det(I + \\text{(rows all equal to } (a,b,c,d))) = 1 + a + b + c + d$.",
        "Vandermonde: $\\begin{vmatrix} 1 & 1 & 1 \\\\ a & b & c \\\\ a^2 & b^2 & c^2 \\end{vmatrix} = (b-a)(c-a)(c-b)$, nonzero iff $a, b, c$ are distinct.",
        "A matrix with exactly one nonzero entry in each row and column (a scaled permutation) has determinant $\\pm$(product of those entries); the sign is $(-1)^{\\#\\text{swaps}}$ needed to bring them to the diagonal.",
      ],
      formulas: [
        "|A^T| = |A|, \\qquad b_{ij} = c^{i+j}a_{ij} \\Rightarrow |B| = c^{n(n+1)}|A|",
        "\\begin{vmatrix} 1 & 1 & 1 \\\\ a & b & c \\\\ a^2 & b^2 & c^2 \\end{vmatrix} = (b-a)(c-a)(c-b)",
      ],
      example: {
        problem:
          "Evaluate $\\begin{vmatrix} 1+a & b & c & d \\\\ a & 1+b & c & d \\\\ a & b & 1+c & d \\\\ a & b & c & 1+d \\end{vmatrix}$.",
        steps: [
          "Every row sums to $1 + a + b + c + d$. Add columns 2, 3, 4 to column 1 (replacements, no change): column 1 becomes $(1+a+b+c+d)(1,1,1,1)^T$.",
          "Factor $1+a+b+c+d$ out of column 1: $(1+a+b+c+d)\\begin{vmatrix} 1 & b & c & d \\\\ 1 & 1+b & c & d \\\\ 1 & b & 1+c & d \\\\ 1 & b & c & 1+d \\end{vmatrix}$.",
          "Subtract row 1 from rows 2, 3, 4: they become $(0,1,0,0)$, $(0,0,1,0)$, $(0,0,0,1)$. The matrix is now upper triangular with diagonal $1,1,1,1$.",
          "So the determinant is $(1+a+b+c+d)\\cdot 1 = 1 + a + b + c + d$.",
        ],
        answer: "$1 + a + b + c + d$.",
      },
      pitfalls: [
        "$|A| = 0$ does **not** require two proportional rows: the rows of $\\begin{bmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{bmatrix}$ are dependent ($R_1 + R_3 = 2R_2$) without any two being proportional.",
        "In $b_{ij} = c^{i+j}a_{ij}$ every entry gets **two** factors (one from its row, one from its column), so the exponent is $n(n+1)$, not $n(n+1)/2$.",
        "Vandermonde sign: $(a-b)(a-c)(b-c) = -(b-a)(c-a)(c-b)$. Keep \"later minus earlier\".",
      ],
      recall: [
        { q: "$A$ is $6\\times6$ with $R_2 + R_4 = R_6$. What is $|A|$?", a: "$0$: the rows are linearly dependent ($R_6 \\to R_6 - R_2 - R_4$ makes a zero row)." },
        { q: "$|A| = 3$ ($3\\times3$). What is $|[\\mathbf{a}_1 + \\mathbf{a}_2,\\ \\mathbf{a}_2 + \\mathbf{a}_3,\\ \\mathbf{a}_3 + \\mathbf{a}_1]|$?", a: "$|A|\\cdot\\begin{vmatrix}1&0&1\\\\1&1&0\\\\0&1&1\\end{vmatrix} = 3\\cdot2 = 6$." },
        { q: "$|A| = 2$ ($3\\times3$) and $b_{ij} = 2^{i+j}a_{ij}$. $|B| = ?$", a: "$2^{12}\\cdot 2 = 2^{13}$." },
      ],
    },
    {
      title: "Products, inverses, powers and scalar multiples",
      intuition:
        "Determinants turn matrix multiplication into number multiplication. Almost every \"find $|\\cdots|$\" question is solved by peeling off one factor at a time, remembering that a scalar comes out once **per row**.",
      keyIdeas: [
        "$|AB| = |A||B|$ (so $|AB| = |BA|$ even though $AB \\ne BA$), $|A^k| = |A|^k$, $|A^{-1}| = 1/|A|$, $|A^T| = |A|$.",
        "$|kA| = k^n|A|$ for $A$ of size $n\\times n$. In particular $|-A| = (-1)^n|A|$: equal to $|A|$ for even $n$, $-|A|$ for odd $n$.",
        "$|A + B| \\ne |A| + |B|$ in general: there is **no** sum rule.",
        "$|A^TA^{-1}| = |A|/|A| = 1$; $|A^TA| = |A|^2 \\ge 0$.",
        "If $Q^TQ = I$ ($Q$ orthogonal) then $|Q|^2 = 1$, so $|Q| = \\pm1$ (rotations $+1$, reflections $-1$).",
        "Nilpotent: $A^k = 0 \\Rightarrow |A|^k = 0 \\Rightarrow |A| = 0$. Idempotent $A^2 = A \\Rightarrow |A| \\in \\{0, 1\\}$.",
        "Skew-symmetric of **odd** order: $|A| = |A^T| = |-A| = (-1)^n|A| = -|A|$, so $|A| = 0$. Even order: no conclusion.",
        "$|\\operatorname{adj}A| = |A|^{n-1}$ (from $A\\operatorname{adj}A = |A|I$).",
      ],
      formulas: [
        "|AB| = |A||B|, \\quad |A^{-1}| = \\frac{1}{|A|}, \\quad |A^T| = |A|, \\quad |kA| = k^n|A|",
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
        "$|5A| = 5|A|$ is **false** for $n \\ge 2$: it is $5^n|A|$. This exact statement appeared as the false option in a recent final.",
        "$A^2 = I$ gives $|A| = \\pm1$, not necessarily $1$. $A^2 = 4I$ ($3\\times3$) gives $|A| = \\pm 8$: \"cannot be determined\".",
        "$A^3 = 8I$ ($3\\times3$) gives $|A|^3 = 512$, so $|A| = 8$ exactly: a real number has only one real cube root.",
        "Do not invent $|A + B| = |A| + |B|$; if only $|A|$, $|B|$ are known, $|A + B|$ cannot be determined.",
      ],
      recall: [
        { q: "$A$ is $4\\times4$ with $|A| = 5$. What is $|-A|$?", a: "$(-1)^4\\cdot5 = 5$." },
        { q: "Why is $|A^TA| \\ge 0$?", a: "$|A^TA| = |A^T||A| = |A|^2 \\ge 0$." },
        { q: "$A$ is $5\\times5$ and skew-symmetric. $|A| = ?$", a: "$0$, because $|A| = (-1)^5|A|$." },
      ],
    },
    {
      title: "Determinants and invertibility",
      intuition:
        "Row reduction never turns a zero determinant into a nonzero one or vice versa, so $|A| \\ne 0$ exactly when the echelon form has a full set of pivots, i.e. exactly when $A$ is invertible.",
      keyIdeas: [
        "$A$ ($n\\times n$) is invertible $\\iff |A| \\ne 0$.",
        "Equivalent to $|A| \\ne 0$: $n$ pivots; columns (and rows) linearly independent; $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution; $A\\mathbf{x} = \\mathbf{b}$ has a unique solution for every $\\mathbf{b}$; columns span $\\mathbb{R}^n$; $\\operatorname{rank}A = n$.",
        "$|A| = 0 \\iff A$ singular $\\iff$ $A\\mathbf{x} = \\mathbf{0}$ has nontrivial solutions $\\iff$ columns dependent.",
        "Parameter questions: compute $|A|$ as a polynomial in $k$ and solve $|A| = 0$. Simplify with row/column operations first and look for a factor to pull out.",
        "$AB$ is invertible iff both $A$ and $B$ are (square case), since $|AB| = |A||B|$.",
        "A square system with $|A| = 0$ has either **no** solution or **infinitely many**: the determinant alone cannot tell which.",
      ],
      formulas: ["A^{-1} \\text{ exists} \\iff |A| \\ne 0"],
      example: {
        problem:
          "For which $k$ does $kx_1 + x_2 + x_3 = 1$, $x_1 + kx_2 + x_3 = 1$, $x_1 + x_2 + kx_3 = 1$ fail to have a unique solution?",
        steps: [
          "Unique solution $\\iff |A| \\ne 0$ with $A = \\begin{bmatrix} k & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{bmatrix}$.",
          "Every row sums to $k + 2$. Add columns 2 and 3 to column 1 and factor: $|A| = (k+2)\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{vmatrix}$.",
          "Subtract row 1 from rows 2 and 3: $\\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & k-1 & 0 \\\\ 0 & 0 & k-1 \\end{vmatrix} = (k-1)^2$. So $|A| = (k+2)(k-1)^2$.",
          "$|A| = 0$ for $k = -2$ or $k = 1$. ($k = 1$: three identical equations, infinitely many solutions; $k = -2$: adding the equations gives $0 = 3$, no solution.)",
        ],
        answer: "Exactly two values: $k = 1$ and $k = -2$.",
      },
      pitfalls: [
        "Expanding a parametric $3\\times3$ blindly gives a cubic that is hard to factor. Use the row-sum or a replacement first to expose a factor.",
        "\"$|A| = 0$, so $A\\mathbf{x} = \\mathbf{b}$ has no solution\" is wrong: it may have infinitely many.",
        "Count roots of $(k-1)^2$ once: the question \"how many values of $k$\" counts distinct values.",
      ],
      recall: [
        { q: "$|A| = -7$. Does $A\\mathbf{x} = \\mathbf{0}$ have nontrivial solutions?", a: "No: $|A| \\ne 0$, so $A$ is invertible and only $\\mathbf{x} = \\mathbf{0}$ works." },
        { q: "For which $k$ is $\\begin{bmatrix} k & 4 \\\\ 1 & k \\end{bmatrix}$ singular?", a: "$k^2 - 4 = 0$: $k = \\pm 2$." },
        { q: "$|A| = 0$ for a square $A$. How many solutions can $A\\mathbf{x} = \\mathbf{b}$ have?", a: "None or infinitely many, depending on $\\mathbf{b}$." },
      ],
    },
    {
      title: "Cramer's rule and the adjugate formula for $A^{-1}$",
      intuition:
        "When $|A| \\ne 0$ every unknown is a ratio of two determinants. Stacking those ratios for $A\\mathbf{x} = \\mathbf{e}_j$ gives a closed formula for $A^{-1}$ built from cofactors.",
      keyIdeas: [
        "**Cramer's rule** (needs $|A| \\ne 0$): $x_i = \\dfrac{|A_i(\\mathbf{b})|}{|A|}$, where $A_i(\\mathbf{b})$ is $A$ with **column** $i$ replaced by $\\mathbf{b}$.",
        "**Adjugate**: $\\operatorname{adj}A = $ the **transpose** of the cofactor matrix, $(\\operatorname{adj}A)_{ij} = C_{ji}$.",
        "$A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj}A$, so $(A^{-1})_{ij} = \\dfrac{C_{ji}}{|A|}$. For $2\\times2$: $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.",
        "$A\\,\\operatorname{adj}A = \\operatorname{adj}A\\,A = |A|\\,I$ for **every** square $A$ (even singular ones).",
        "Cramer's rule is a theoretical tool (formulas, parameter dependence, one unknown only); for full solutions row reduction is faster.",
      ],
      formulas: [
        "x_i = \\frac{|A_i(\\mathbf{b})|}{|A|}, \\qquad A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A, \\qquad (\\operatorname{adj}A)_{ij} = C_{ji}",
      ],
      example: {
        problem:
          "$A = \\begin{bmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 0 \\\\ 0 & 3 & 1 \\end{bmatrix}$. Find $(A^{-1})_{23}$, then use Cramer's rule to find $x_3$ in $A\\mathbf{x} = (3, 2, 1)^T$.",
        steps: [
          "$|A| = 1(1 - 0) - 0 + 2(6 - 0) = 13$ (row 1).",
          "$(A^{-1})_{23} = C_{32}/|A|$ (note the swapped indices). $C_{32} = (-1)^{5}\\begin{vmatrix} 1 & 2 \\\\ 2 & 0 \\end{vmatrix} = -(0 - 4) = 4$, so $(A^{-1})_{23} = \\tfrac{4}{13}$.",
          "Cramer: replace column 3 by $\\mathbf{b}$: $|A_3(\\mathbf{b})| = \\begin{vmatrix} 1 & 0 & 3 \\\\ 2 & 1 & 2 \\\\ 0 & 3 & 1 \\end{vmatrix} = 1(1-6) - 0 + 3(6-0) = 13$.",
          "$x_3 = 13/13 = 1$. (Check: $\\mathbf{x} = (1,0,1)$ gives $A\\mathbf{x} = (3,2,1)$ ✓.)",
        ],
        answer: "$(A^{-1})_{23} = \\tfrac{4}{13}$ and $x_3 = 1$.",
      },
      pitfalls: [
        "Forgetting the transpose: $(A^{-1})_{23}$ uses $C_{32}$, not $C_{23}$.",
        "Cramer's rule replaces a **column**, not a row, and only applies when $|A| \\ne 0$.",
        "$\\operatorname{adj}(kA) = k^{n-1}\\operatorname{adj}A$ and $|\\operatorname{adj}A| = |A|^{n-1}$: the exponent is $n-1$, not $n$.",
      ],
      recall: [
        { q: "$(\\operatorname{adj}A)_{12}$ equals which cofactor?", a: "$C_{21}$." },
        { q: "What is $A\\operatorname{adj}A$?", a: "$|A|\\,I$." },
        { q: "$A$ is $3\\times3$ with $|A| = 4$. What is $|\\operatorname{adj}A|$?", a: "$4^{2} = 16$." },
      ],
    },
    {
      title: "Area, volume and linear transformations",
      intuition:
        "The columns of $A$ are where the unit square (or cube) lands under $\\mathbf{x}\\mapsto A\\mathbf{x}$. The determinant is the signed area (volume) of that image, and since a linear map stretches every tiny square the same way, **every** region's area gets multiplied by $|\\det A|$.",
      keyIdeas: [
        "Area of the parallelogram spanned by $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^2$: $|\\det[\\mathbf{u}\\ \\mathbf{v}]|$. Volume of the parallelepiped spanned by $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\in\\mathbb{R}^3$: $|\\det[\\mathbf{u}\\ \\mathbf{v}\\ \\mathbf{w}]|$.",
        "If the shape does not start at the origin, use **edge vectors** (differences of vertices), not position vectors.",
        "Triangle with vertices $P, Q, R$: area $= \\tfrac12|\\det[Q-P\\ \\ R-P]|$. (A tetrahedron is $\\tfrac16$ of the parallelepiped.)",
        "For $T(\\mathbf{x}) = A\\mathbf{x}$: $\\text{area}(T(S)) = |\\det A|\\cdot\\text{area}(S)$ in $\\mathbb{R}^2$, and the same with volumes in $\\mathbb{R}^3$. The image of the unit cube has volume $|\\det A|$.",
        "Compositions multiply: applying $A$ then $B$ scales by $|\\det B||\\det A| = |\\det(BA)|$.",
        "Sign of $\\det A$: positive means orientation is preserved, negative means it is flipped (a reflection is involved). $\\det A = 0$ means the image is flattened (zero area/volume).",
      ],
      formulas: [
        "\\text{Area} = |\\det[\\mathbf{u}\\ \\mathbf{v}]|, \\qquad \\text{Volume} = |\\det[\\mathbf{u}\\ \\mathbf{v}\\ \\mathbf{w}]|",
        "\\text{vol}(T(S)) = |\\det A|\\cdot\\text{vol}(S)",
      ],
      example: {
        problem:
          "$S$ is the parallelepiped with a vertex at the origin and adjacent vertices $(1,0,2)$, $(2,1,0)$, $(0,3,1)$. Find its volume, and the volume of $T(S)$ for $T(\\mathbf{x}) = A\\mathbf{x}$, $A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 0 & 3 & 1 \\\\ 1 & 0 & -1 \\end{bmatrix}$.",
        steps: [
          "Edge vectors as columns: $\\det\\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 2 & 0 & 1 \\end{bmatrix} = 1(1-0) - 2(0-6) + 0 = 13$, so $\\text{vol}(S) = 13$.",
          "$\\det A = 2(-3-0) - 1(0-1) + 0 = -6 + 1 = -5$ (row 1).",
          "$\\text{vol}(T(S)) = |\\det A|\\cdot\\text{vol}(S) = 5\\cdot 13 = 65$.",
          "The negative sign of $\\det A$ only says $T$ reverses orientation; volumes use the absolute value.",
        ],
        answer: "$\\text{vol}(S) = 13$, $\\text{vol}(T(S)) = 65$.",
      },
      pitfalls: [
        "A volume of $-12$ is never an answer: take $|\\det A|$.",
        "Forgetting the $\\tfrac12$ for triangles (or using $\\tfrac12$ for a parallelogram).",
        "Using vertex coordinates directly when no vertex is at the origin. Subtract the base vertex first.",
      ],
      recall: [
        { q: "Volume of the image of the unit cube under $A$?", a: "$|\\det A|$." },
        { q: "$T$ has $\\det A = -3$ and $S$ has area 4. Area of $T(S)$?", a: "$12$." },
        { q: "What does $\\det A < 0$ mean geometrically for $\\mathbf{x}\\mapsto A\\mathbf{x}$ in $\\mathbb{R}^2$?", a: "The map flips orientation (the image of the unit square is \"turned over\")." },
      ],
      visuals: ["det-area-2d", "det-volume-3d"],
    },
  ],
  playbook: [
    "If you see a matrix with a row or column of mostly zeros → expand along it; one nonzero entry reduces the size by one in a single step.",
    "If you see a $4\\times4$ (or bigger) numeric determinant with no zeros → row reduce to triangular form, count interchanges, multiply pivots.",
    "If you see \"$B$ is obtained from $A$ by …\" → replacement $\\times1$, interchange $\\times(-1)$, scaling one row by $k$ $\\times k$; multiply the factors.",
    "If you see the columns of $B$ written as combinations of $\\mathbf{a}_1, \\dots, \\mathbf{a}_n$ → write $B = AM$ and use $|B| = |A||M|$.",
    "If you see $|kA|$, $|A^{-1}|$, $|A^T|$, $|AB|$ → peel factors: $k^n$, $1/|A|$, $|A|$, $|A||B|$. Never $|kA| = k|A|$.",
    "If you see $b_{ij} = c^{i+j}a_{ij}$ → $|B| = c^{n(n+1)}|A|$ (each entry gets a row factor and a column factor); $c^{i-j}$ → $|B| = |A|$.",
    "If you see rows that are equal, proportional, or satisfy a relation like $R_2 + R_4 = R_6$ → the determinant is 0.",
    "If you see every row summing to the same thing (e.g. $1+a+b+c+d$ patterns, $k$ on the diagonal and 1's elsewhere) → add all columns into column 1 and factor.",
    "If you see rows $1, x, x^2$ → Vandermonde: product of differences; singular exactly when two nodes coincide.",
    "If you see \"for which $k$ is $A$ singular / not invertible / $A\\mathbf{x} = \\mathbf{0}$ nontrivial / unique solution fails\" → solve $|A| = 0$.",
    "If you see $A^2 = I$, $A^2 = 4I$, $Q^TQ = I$ → $|A| = \\pm$ something; the sign is \"cannot be determined\". For $A^3 = cI$ the real cube root is unique.",
    "If you see skew-symmetric of odd order, $A^k = 0$, or $A^TA$ → $|A| = 0$, $|A| = 0$, $|A^TA| = |A|^2 \\ge 0$.",
    "If you see one unknown requested with $|A| \\ne 0$ → Cramer: replace that **column** by $\\mathbf{b}$, divide by $|A|$. One entry of $A^{-1}$ → $C_{ji}/|A|$.",
    "If you see area/volume → $|\\det|$ of edge vectors (½ for triangles); under $T(\\mathbf{x}) = A\\mathbf{x}$ multiply by $|\\det A|$.",
  ],
};
