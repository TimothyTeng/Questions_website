import type { Lesson } from "@/lib/types";

export const eigenLesson: Lesson = {
  topic: "eigen",
  bigPicture:
    "Most vectors change direction when you multiply them by a square matrix $A$. **Eigenvectors** are the special nonzero vectors that keep their direction: $A$ only stretches, shrinks or flips them by a factor $\\lambda$, the **eigenvalue**. You find the eigenvalues from the characteristic equation $\\det(A - \\lambda I) = 0$, then find each eigenspace $\\text{Nul}(A - \\lambda I)$ by row reduction. If $A$ has $n$ independent eigenvectors, you can use them as a basis. In that basis $A$ becomes a diagonal matrix $D$, so $A = PDP^{-1}$. That makes powers $A^k = PD^kP^{-1}$ easy and tells you the long-term behaviour of $A^k\\mathbf{x}$. For real $2 \\times 2$ matrices with no real eigenvalues, the eigenvalues are complex conjugates $a \\pm bj$, and $A$ acts like a rotation combined with a scaling.",
  sections: [
    {
      title: "Eigenvalues, eigenvectors and eigenspaces",
      intuition:
        "Picture $A$ moving every arrow in the plane. Most arrows get knocked off their line. A few stay on their own line through the origin, and those are the eigenvectors. The eigenvalue tells you how much they get stretched.",
      keyIdeas: [
        "Only **square** matrices have eigenvalues and eigenvectors.",
        "$\\lambda$ is an eigenvalue of $A$ if $A\\mathbf{x} = \\lambda\\mathbf{x}$ has a **nonzero** solution $\\mathbf{x}$. Such an $\\mathbf{x}$ is an eigenvector for $\\lambda$.",
        "An eigenvalue **can** be $0$, but an eigenvector can **never** be $\\mathbf{0}$.",
        "$A\\mathbf{x} = \\lambda\\mathbf{x} \\iff (A - \\lambda I)\\mathbf{x} = \\mathbf{0}$, so the eigenvectors for $\\lambda$ are the nonzero vectors in $\\text{Nul}(A - \\lambda I)$.",
        "The **eigenspace** of $\\lambda$ is $\\text{Nul}(A - \\lambda I)$: all eigenvectors for $\\lambda$ together with $\\mathbf{0}$. It is a subspace, so any nonzero multiple of an eigenvector is also an eigenvector.",
        "To check whether a given $\\mathbf{u}$ is an eigenvector, compute $A\\mathbf{u}$ and see whether it is a scalar multiple of $\\mathbf{u}$. To check whether a given $\\lambda$ is an eigenvalue, see whether $A - \\lambda I$ is singular, i.e. whether it has a free variable.",
      ],
      formulas: [
        "A\\mathbf{x} = \\lambda\\mathbf{x}, \\quad \\mathbf{x} \\neq \\mathbf{0}",
        "E_\\lambda = \\text{Nul}(A - \\lambda I)",
      ],
      example: {
        problem:
          "Let $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$. (i) Is $\\mathbf{u} = [1,1]^T$ an eigenvector? (ii) Show $\\lambda = 2$ is an eigenvalue and find a basis for its eigenspace.",
        steps: [
          "(i) Compute $A\\mathbf{u} = [4 + 1, 2 + 3]^T = [5, 5]^T = 5\\mathbf{u}$. So $\\mathbf{u}$ is an eigenvector with eigenvalue $5$.",
          "(ii) Form $A - 2I = \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}$.",
          "Row reduce: $R_2 \\to R_2 - R_1$ gives $\\begin{bmatrix} 2 & 1 \\\\ 0 & 0 \\end{bmatrix}$. There is a free variable, so $(A - 2I)\\mathbf{x} = \\mathbf{0}$ has nonzero solutions and $2$ is an eigenvalue.",
          "From $2x_1 + x_2 = 0$, let $x_1 = t$, so $x_2 = -2t$ and $\\mathbf{x} = t[1, -2]^T$.",
          "Check: $A[1,-2]^T = [4 - 2, 2 - 6]^T = [2, -4]^T = 2[1,-2]^T$. ✓",
        ],
        answer:
          "$[1,1]^T$ is an eigenvector for $\\lambda = 5$. The eigenspace for $\\lambda = 2$ is $\\text{span}\\{[1,-2]^T\\}$.",
      },
      pitfalls: [
        "Saying $\\mathbf{0}$ is an eigenvector. It always satisfies $A\\mathbf{0} = \\lambda\\mathbf{0}$, so it is excluded by definition.",
        "Thinking an eigenvector is unique. Any nonzero multiple works too, and MATLAB's eig returns unit-length versions, so they look different from Lay's but point the same way.",
        "Solving $(A - \\lambda I)\\mathbf{x} = \\mathbf{0}$ and getting only $\\mathbf{x} = \\mathbf{0}$ means $\\lambda$ is **not** an eigenvalue. Recheck your $\\lambda$.",
      ],
      recall: [
        { q: "Can $0$ be an eigenvalue? Can $\\mathbf{0}$ be an eigenvector?", a: "$0$ can be an eigenvalue (exactly when $A$ is singular). $\\mathbf{0}$ can never be an eigenvector." },
        { q: "What subspace is the eigenspace of $\\lambda$?", a: "$\\text{Nul}(A - \\lambda I)$." },
        { q: "Fastest way to test whether $\\mathbf{u}$ is an eigenvector?", a: "Compute $A\\mathbf{u}$ and check whether it equals $c\\mathbf{u}$ for some scalar $c$. If so, $c$ is the eigenvalue." },
      ],
    },
    {
      title: "Characteristic equation, trace and determinant",
      intuition:
        "$\\lambda$ is an eigenvalue exactly when $A - \\lambda I$ squashes some nonzero vector to $\\mathbf{0}$, i.e. when it is singular. Singular means determinant zero, which gives a polynomial equation in $\\lambda$.",
      keyIdeas: [
        "**Characteristic equation:** $\\det(A - \\lambda I) = 0$. The left side is a degree-$n$ polynomial (the characteristic polynomial). Its roots, counted with multiplicity, are the $n$ eigenvalues.",
        "**Triangular matrices** (upper, lower, diagonal): the eigenvalues are the diagonal entries.",
        "$\\lambda = 0$ is an eigenvalue $\\iff \\det A = 0 \\iff A$ is **not invertible**. This is another entry in the Invertible Matrix Theorem.",
        "$\\text{tr}(A) = \\lambda_1 + \\cdots + \\lambda_n$ and $\\det A = \\lambda_1 \\lambda_2 \\cdots \\lambda_n$, counting multiplicity.",
        "For $2 \\times 2$: $\\det(A - \\lambda I) = \\lambda^2 - (\\text{tr}A)\\lambda + \\det A$.",
        "**Row operations change eigenvalues.** You cannot row reduce $A$ first and then read eigenvalues off the diagonal.",
      ],
      formulas: [
        "\\det(A - \\lambda I) = 0",
        "\\lambda^2 - (\\text{tr}A)\\,\\lambda + \\det A = 0 \\quad (2 \\times 2)",
        "\\text{tr}(A) = \\sum_i \\lambda_i, \\qquad \\det(A) = \\prod_i \\lambda_i",
      ],
      example: {
        problem:
          "Find the characteristic polynomial and eigenvalues of $A = \\begin{bmatrix} 5 & -2 \\\\ 1 & 2 \\end{bmatrix}$, and check them using the trace and determinant.",
        steps: [
          "$A - \\lambda I = \\begin{bmatrix} 5 - \\lambda & -2 \\\\ 1 & 2 - \\lambda \\end{bmatrix}$.",
          "$\\det(A - \\lambda I) = (5 - \\lambda)(2 - \\lambda) - (-2)(1) = \\lambda^2 - 7\\lambda + 10 + 2 = \\lambda^2 - 7\\lambda + 12$.",
          "Factor: $(\\lambda - 3)(\\lambda - 4) = 0$, so $\\lambda = 3$ or $\\lambda = 4$.",
          "Check: $\\text{tr}A = 5 + 2 = 7 = 3 + 4$ ✓ and $\\det A = 10 + 2 = 12 = 3 \\times 4$ ✓.",
        ],
        answer: "$\\lambda^2 - 7\\lambda + 12$; the eigenvalues are $3$ and $4$.",
      },
      pitfalls: [
        "Sign slip on the off-diagonal product: $-(-2)(1) = +2$, not $-2$.",
        "Reading eigenvalues off the diagonal of a matrix that is **not** triangular, or off a row-reduced matrix.",
        "Forgetting multiplicity in trace/det. If the eigenvalues are $2, 2, 5$ then $\\det = 20$, not $10$.",
      ],
      recall: [
        { q: "Eigenvalues of $\\begin{bmatrix} 3 & 7 & 1 \\\\ 0 & -1 & 4 \\\\ 0 & 0 & 2 \\end{bmatrix}$?", a: "It is triangular, so $3, -1, 2$." },
        { q: "$A$ is $3 \\times 3$ with eigenvalues $2, -1, 0.5$. Find $\\det A$ and $\\text{tr}A$.", a: "$\\det A = 2(-1)(0.5) = -1$ and $\\text{tr}A = 2 - 1 + 0.5 = 1.5$." },
        { q: "What does it mean if $0$ is an eigenvalue?", a: "$\\det A = 0$, so $A$ is singular (not invertible) and $\\text{Nul}A \\neq \\{\\mathbf{0}\\}$." },
      ],
    },
    {
      title: "Eigenvalues of related matrices: $A^k$, $A^{-1}$, $A + cI$, $A^T$",
      intuition:
        "If $A$ stretches $\\mathbf{v}$ by $\\lambda$, then applying $A$ twice stretches it by $\\lambda^2$, undoing $A$ shrinks it by $1/\\lambda$, and adding $c\\mathbf{v}$ shifts the factor by $c$. The eigenvector stays the same and only the number changes.",
      keyIdeas: [
        "$A^k$ has eigenvalues $\\lambda^k$ with the **same** eigenvectors.",
        "$A^{-1}$ (if it exists, i.e. no $\\lambda = 0$) has eigenvalues $1/\\lambda$ with the same eigenvectors.",
        "$A + cI$ has eigenvalues $\\lambda + c$, and $cA$ has eigenvalues $c\\lambda$, both with the same eigenvectors.",
        "Any polynomial: $p(A)$ has eigenvalues $p(\\lambda)$, e.g. $A^2 - A + I$ has eigenvalues $\\lambda^2 - \\lambda + 1$.",
        "$A^T$ has the **same eigenvalues** as $A$ (same characteristic polynomial) but generally **different eigenvectors**.",
      ],
      formulas: [
        "A\\mathbf{v} = \\lambda\\mathbf{v} \\;\\Rightarrow\\; A^k\\mathbf{v} = \\lambda^k\\mathbf{v},\\quad A^{-1}\\mathbf{v} = \\tfrac{1}{\\lambda}\\mathbf{v},\\quad (A + cI)\\mathbf{v} = (\\lambda + c)\\mathbf{v}",
        "\\det(A^T - \\lambda I) = \\det(A - \\lambda I)",
      ],
      example: {
        problem:
          "$A$ is $3 \\times 3$ with eigenvalues $2, -1, 4$. Find the eigenvalues of $A^{-1}$, of $A + 3I$, and of $A^2 - A + I$, and find $\\det(A^2 - A + I)$.",
        steps: [
          "No eigenvalue is $0$, so $A^{-1}$ exists, and its eigenvalues are $\\tfrac12, -1, \\tfrac14$.",
          "$A + 3I$: add $3$ to each eigenvalue to get $5, 2, 7$.",
          "$A^2 - A + I$: compute $\\lambda^2 - \\lambda + 1$ for each. $\\lambda = 2$: $4 - 2 + 1 = 3$. $\\lambda = -1$: $1 + 1 + 1 = 3$. $\\lambda = 4$: $16 - 4 + 1 = 13$.",
          "The determinant is the product of the eigenvalues: $3 \\times 3 \\times 13 = 117$.",
        ],
        answer: "$A^{-1}$: $\\tfrac12, -1, \\tfrac14$. $A + 3I$: $5, 2, 7$. $A^2 - A + I$: $3, 3, 13$, with determinant $117$.",
      },
      pitfalls: [
        "$A + 3I$ adds $3$; it does **not** multiply the eigenvalues by $3$.",
        "Reciprocal of $-1$ is $-1$, not $1$. Keep the signs.",
        "$\\det(cA) = c^n \\det A$, not $c\\det A$.",
        "Assuming $A^T$ has the same eigenvectors as $A$. Only the eigenvalues are guaranteed to match.",
      ],
      recall: [
        { q: "Eigenvalues of $A^3$ if $A$ has eigenvalues $-2, 1$?", a: "$-8, 1$." },
        { q: "Do $A$ and $A^T$ share eigenvectors?", a: "Not in general. They share eigenvalues only." },
        { q: "$A$ has eigenvalues $1, -2, 3$. What is $\\det(2A)$?", a: "$2^3 \\cdot (1)(-2)(3) = -48$." },
      ],
    },
    {
      title: "Multiplicity, independence and similarity",
      intuition:
        "A repeated eigenvalue is a \"double root\", but it may or may not come with enough eigenvector directions. Similar matrices are the same transformation seen in different coordinates, so they share everything that does not depend on coordinates, such as eigenvalues, trace and determinant, but not the eigenvectors themselves.",
      keyIdeas: [
        "**Algebraic multiplicity:** how many times $\\lambda$ is a root of the characteristic polynomial. **Geometric multiplicity:** $\\dim\\text{Nul}(A - \\lambda I)$.",
        "Always $1 \\le \\text{geometric} \\le \\text{algebraic}$.",
        "Eigenvectors for **distinct** eigenvalues are linearly independent. The converse is false: $I$ has many independent eigenvectors that all share $\\lambda = 1$.",
        "**Similar:** $B = P^{-1}AP$ for some invertible $P$. Then $A$ and $B$ have the same characteristic polynomial, so the same eigenvalues (with multiplicities), trace and determinant.",
        "If $A\\mathbf{v} = \\lambda\\mathbf{v}$, the matching eigenvector of $B = P^{-1}AP$ is $P^{-1}\\mathbf{v}$, which is usually a different vector.",
        "Same eigenvalues does **not** imply similar: $\\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$ and $2I$ both have eigenvalues $2, 2$ but are not similar.",
        "Similarity is **not** row equivalence. Row operations change eigenvalues; similarity does not.",
      ],
      formulas: [
        "B = P^{-1}AP \\;\\Rightarrow\\; \\det(B - \\lambda I) = \\det(A - \\lambda I)",
        "1 \\le \\dim\\text{Nul}(A - \\lambda I) \\le \\text{alg. mult}(\\lambda)",
      ],
      example: {
        problem:
          "For $A = \\begin{bmatrix} 3 & 0 & 0 \\\\ 1 & 3 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$, find the algebraic and geometric multiplicity of each eigenvalue.",
        steps: [
          "$A$ is lower triangular, so its eigenvalues are $3, 3, 5$. Algebraic multiplicities: $\\lambda = 3$ has 2 and $\\lambda = 5$ has 1.",
          "$A - 3I = \\begin{bmatrix} 0 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}$ has 2 pivots (rows 2 and 3), so its rank is $2$.",
          "Geometric multiplicity of $3$ is $3 - 2 = 1$. The eigenspace is $\\text{span}\\{[0,1,0]^T\\}$ (since $x_1 = 0$, $x_3 = 0$, and $x_2$ is free).",
          "$\\lambda = 5$ has algebraic multiplicity 1, so its geometric multiplicity is also 1.",
        ],
        answer:
          "$\\lambda = 3$: algebraic 2, geometric 1. $\\lambda = 5$: algebraic 1, geometric 1. There are only 2 independent eigenvectors in total.",
      },
      pitfalls: [
        "Assuming a repeated eigenvalue automatically gives that many eigenvectors. You must compute $\\text{rank}(A - \\lambda I)$.",
        "Claiming that matrices with the same eigenvalues are similar. This is only guaranteed when both are diagonalizable.",
        "Claiming similar matrices have the same eigenvectors. They correspond through $P^{-1}$.",
      ],
      recall: [
        { q: "Define geometric multiplicity.", a: "$\\dim\\text{Nul}(A - \\lambda I)$, the number of independent eigenvectors for $\\lambda$." },
        { q: "Name 4 things similar matrices share.", a: "Characteristic polynomial, eigenvalues (with multiplicity), trace, determinant (also rank)." },
        { q: "If $B = P^{-1}AP$ and $A\\mathbf{v} = \\lambda\\mathbf{v}$, what is an eigenvector of $B$?", a: "$P^{-1}\\mathbf{v}$, with the same eigenvalue $\\lambda$." },
      ],
    },
    {
      title: "Diagonalization $A = PDP^{-1}$",
      intuition:
        "If you can find $n$ independent eigenvector directions, use them as your coordinate axes. Along each axis, $A$ just multiplies by its eigenvalue, so in these coordinates $A$ is the diagonal matrix $D$.",
      keyIdeas: [
        "$A$ ($n \\times n$) is diagonalizable $\\iff$ $A$ has $n$ **linearly independent eigenvectors**.",
        "Then $P = [\\mathbf{v}_1 \\cdots \\mathbf{v}_n]$ (eigenvectors as columns) and $D = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)$, **in the same order**.",
        "$n$ distinct eigenvalues $\\Rightarrow$ diagonalizable (sufficient, **not** necessary).",
        "With repeated eigenvalues, $A$ is diagonalizable $\\iff$ every eigenspace dimension equals the algebraic multiplicity, i.e. the eigenspace dimensions add up to $n$.",
        "Diagonalizable and invertible are **unrelated**: $\\text{diag}(1,0)$ is diagonalizable but singular; $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ is invertible but not diagonalizable.",
        "To verify a given factorisation, check $AP = PD$. This avoids computing $P^{-1}$.",
      ],
      formulas: [
        "A = PDP^{-1} \\iff AP = PD",
        "P = \\begin{bmatrix} \\mathbf{v}_1 & \\cdots & \\mathbf{v}_n \\end{bmatrix}, \\quad D = \\begin{bmatrix} \\lambda_1 & & \\\\ & \\ddots & \\\\ & & \\lambda_n \\end{bmatrix}",
      ],
      example: {
        problem: "Diagonalize $A = \\begin{bmatrix} 3 & -1 \\\\ 2 & 0 \\end{bmatrix}$.",
        steps: [
          "$\\det(A - \\lambda I) = (3 - \\lambda)(-\\lambda) + 2 = \\lambda^2 - 3\\lambda + 2 = (\\lambda - 1)(\\lambda - 2)$, so $\\lambda = 2, 1$.",
          "$\\lambda = 2$: $A - 2I = \\begin{bmatrix} 1 & -1 \\\\ 2 & -2 \\end{bmatrix}$, so $x_1 = x_2$ and $\\mathbf{v}_1 = [1, 1]^T$.",
          "$\\lambda = 1$: $A - I = \\begin{bmatrix} 2 & -1 \\\\ 2 & -1 \\end{bmatrix}$, so $x_2 = 2x_1$ and $\\mathbf{v}_2 = [1, 2]^T$.",
          "$P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}$. Here $\\det P = 1$, so $P^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix}$.",
          "Check $AP = \\begin{bmatrix} 3 - 1 & 3 - 2 \\\\ 2 & 2 \\end{bmatrix} = \\begin{bmatrix} 2 & 1 \\\\ 2 & 2 \\end{bmatrix}$ and $PD = \\begin{bmatrix} 2 & 1 \\\\ 2 & 2 \\end{bmatrix}$ ✓.",
        ],
        answer:
          "$A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $D = \\text{diag}(2, 1)$.",
      },
      pitfalls: [
        "Listing eigenvalues in $D$ in a different order from the eigenvector columns in $P$.",
        "\"$n$ distinct eigenvalues\" is sufficient only. A matrix with repeated eigenvalues may still be diagonalizable (e.g. $I$). When eigenvalues repeat and the matrix isn't given, the answer is often \"Not enough information\".",
        "$P$ is not unique: scaling columns or reordering (together with $D$) gives other valid factorisations.",
      ],
      recall: [
        { q: "Necessary and sufficient condition for diagonalizability?", a: "$n$ linearly independent eigenvectors (eigenspace dimensions add up to $n$)." },
        { q: "Is a $3 \\times 3$ matrix with eigenvalues $2, 2, 5$ diagonalizable?", a: "Not enough information. It depends on whether $\\dim\\text{Nul}(A - 2I) = 2$." },
        { q: "Quick way to verify $A = PDP^{-1}$?", a: "Check $AP = PD$ (and that $P$ is invertible)." },
      ],
    },
    {
      title: "Powers $A^k$ and long-term behaviour of $A^k\\mathbf{x}$",
      intuition:
        "Write $\\mathbf{x}$ as a mix of eigenvectors. Each time you apply $A$, each part gets multiplied by its own eigenvalue. After many steps, the part with the largest $|\\lambda|$ outgrows all the others, as long as that part is actually present in $\\mathbf{x}$.",
      keyIdeas: [
        "$A^k = PD^kP^{-1}$, where $D^k$ just raises each diagonal entry to the $k$-th power.",
        "If $\\mathbf{x} = c_1\\mathbf{v}_1 + \\cdots + c_n\\mathbf{v}_n$ then $A^k\\mathbf{x} = c_1\\lambda_1^k\\mathbf{v}_1 + \\cdots + c_n\\lambda_n^k\\mathbf{v}_n$.",
        "$|\\lambda| < 1$: that term decays to $\\mathbf{0}$. $\\lambda = 1$: that term stays fixed. $|\\lambda| > 1$: that term blows up.",
        "The **dominant** term is the one with the largest $|\\lambda|$ **among terms with $c_i \\neq 0$**. If its coefficient is $0$, move on to the next largest.",
        "If the dominant $\\lambda > 1$, the entries of $A^k\\mathbf{x}$ go to $\\pm\\infty$ with signs equal to the signs of $c_i\\mathbf{v}_i$ (an entry that is $0$ in $\\mathbf{v}_i$ is controlled by the other terms).",
        "If the dominant $\\lambda < -1$, the signs alternate with $k$, so there is no limit. If all $|\\lambda| < 1$ the limit is $\\mathbf{0}$. If the dominant $\\lambda = 1$, the limit is $c_i\\mathbf{v}_i$.",
      ],
      formulas: [
        "A^k = PD^kP^{-1}, \\qquad D^k = \\text{diag}(\\lambda_1^k, \\dots, \\lambda_n^k)",
        "A^k\\mathbf{x} = c_1\\lambda_1^k\\mathbf{v}_1 + c_2\\lambda_2^k\\mathbf{v}_2 + \\cdots + c_n\\lambda_n^k\\mathbf{v}_n",
      ],
      example: {
        problem:
          "$A$ has eigenpairs $\\lambda_1 = 2,\\ \\mathbf{v}_1 = [1,-1,1]^T$; $\\lambda_2 = 1,\\ \\mathbf{v}_2 = [1,1,0]^T$; $\\lambda_3 = 0.5,\\ \\mathbf{v}_3 = [0,0,1]^T$. Find the limit of $A^k\\mathbf{x}$ as $k \\to \\infty$ for (i) $\\mathbf{x} = 3\\mathbf{v}_1 - \\mathbf{v}_2 + 2\\mathbf{v}_3$ and (ii) $\\mathbf{y} = 0\\mathbf{v}_1 - \\mathbf{v}_2 + 2\\mathbf{v}_3$.",
        steps: [
          "(i) $A^k\\mathbf{x} = 3(2^k)\\mathbf{v}_1 - (1^k)\\mathbf{v}_2 + 2(0.5^k)\\mathbf{v}_3$.",
          "As $k \\to \\infty$: $0.5^k \\to 0$, $1^k = 1$, and $2^k \\to \\infty$. The $\\mathbf{v}_1$ term dominates because $c_1 = 3 \\neq 0$.",
          "$3 \\cdot 2^k[1, -1, 1]^T = [3 \\cdot 2^k, -3 \\cdot 2^k, 3 \\cdot 2^k]^T \\to [+\\infty, -\\infty, +\\infty]^T$.",
          "(ii) Now $c_1 = 0$, so $A^k\\mathbf{y} = -\\mathbf{v}_2 + 2(0.5)^k\\mathbf{v}_3 \\to -\\mathbf{v}_2 = [-1, -1, 0]^T$.",
        ],
        answer: "(i) $[+\\infty, -\\infty, +\\infty]^T$. (ii) $[-1, -1, 0]^T$.",
      },
      pitfalls: [
        "Ignoring a **zero coefficient**: the largest eigenvalue only matters if its eigenvector is actually in $\\mathbf{x}$.",
        "Forgetting the sign of $c_i$. A negative coefficient flips every sign of $\\mathbf{v}_i$.",
        "A negative dominant eigenvalue ($\\lambda < -1$) oscillates and has no limit. Pick \"None of the above\" if every option is a fixed limit.",
        "Computing $A^k$ by raising the entries of $A$ to the $k$-th power. Only works for diagonal matrices.",
      ],
      recall: [
        { q: "Eigenvalues $1$ and $0.3$; $\\mathbf{x} = 2\\mathbf{v}_1 + 5\\mathbf{v}_2$. Limit of $A^k\\mathbf{x}$?", a: "$2\\mathbf{v}_1$." },
        { q: "All $|\\lambda_i| < 1$. Limit of $A^k\\mathbf{x}$?", a: "$\\mathbf{0}$ for every $\\mathbf{x}$." },
        { q: "Why does $A = PDP^{-1}$ make $A^k$ easy?", a: "The inner $P^{-1}P$ factors cancel: $A^k = PD^kP^{-1}$, and $D^k$ is just entrywise powers on the diagonal." },
      ],
    },
    {
      title: "Coordinates, change of basis and $A$ in an eigenvector basis",
      intuition:
        "A basis is a set of measuring sticks. The $\\mathcal{B}$-coordinates of $\\mathbf{x}$ say how many of each stick you need. If the sticks are eigenvectors of $A$, applying $A$ just rescales each count, so the matrix of the transformation is diagonal.",
      keyIdeas: [
        "If $\\mathcal{B} = \\{\\mathbf{b}_1, \\dots, \\mathbf{b}_n\\}$ is a basis and $P_\\mathcal{B} = [\\mathbf{b}_1 \\cdots \\mathbf{b}_n]$, then $\\mathbf{x} = P_\\mathcal{B}[\\mathbf{x}]_\\mathcal{B}$ and $[\\mathbf{x}]_\\mathcal{B} = P_\\mathcal{B}^{-1}\\mathbf{x}$.",
        "The $\\mathcal{B}$-matrix of $T(\\mathbf{x}) = A\\mathbf{x}$ is $[T]_\\mathcal{B} = P^{-1}AP$, which is similar to $A$.",
        "If $\\mathcal{B}$ consists of eigenvectors of $A$, then $[T]_\\mathcal{B} = D$, the diagonal matrix of eigenvalues. This is what \"diagonalization\" means geometrically.",
        "To compute $A\\mathbf{x}$ in that basis: find $[\\mathbf{x}]_\\mathcal{B}$, multiply each coordinate by its eigenvalue, then convert back with $P$.",
      ],
      formulas: [
        "\\mathbf{x} = P_\\mathcal{B}[\\mathbf{x}]_\\mathcal{B}, \\qquad [\\mathbf{x}]_\\mathcal{B} = P_\\mathcal{B}^{-1}\\mathbf{x}",
        "[T]_\\mathcal{B} = P^{-1}AP = D \\text{ when the columns of } P \\text{ are eigenvectors}",
      ],
      example: {
        problem:
          "$A$ has eigenvectors $\\mathbf{b}_1 = [1,1]^T$ ($\\lambda = 2$) and $\\mathbf{b}_2 = [1,-1]^T$ ($\\lambda = -1$). Let $\\mathbf{x} = [5, 1]^T$. Find $[\\mathbf{x}]_\\mathcal{B}$, $[T]_\\mathcal{B}$ and $A\\mathbf{x}$.",
        steps: [
          "Solve $c_1[1,1]^T + c_2[1,-1]^T = [5,1]^T$: $c_1 + c_2 = 5$ and $c_1 - c_2 = 1$, so $c_1 = 3$, $c_2 = 2$. Thus $[\\mathbf{x}]_\\mathcal{B} = [3, 2]^T$.",
          "Since $\\mathcal{B}$ is an eigenvector basis, $[T]_\\mathcal{B} = D = \\begin{bmatrix} 2 & 0 \\\\ 0 & -1 \\end{bmatrix}$.",
          "$[A\\mathbf{x}]_\\mathcal{B} = D[\\mathbf{x}]_\\mathcal{B} = [6, -2]^T$.",
          "Convert back: $A\\mathbf{x} = 6\\mathbf{b}_1 - 2\\mathbf{b}_2 = [6 - 2, 6 + 2]^T = [4, 8]^T$.",
          "Check: $A = PDP^{-1} = \\begin{bmatrix} 0.5 & 1.5 \\\\ 1.5 & 0.5 \\end{bmatrix}$ and $A[5,1]^T = [2.5 + 1.5, 7.5 + 0.5]^T = [4, 8]^T$ ✓.",
        ],
        answer: "$[\\mathbf{x}]_\\mathcal{B} = [3,2]^T$, $[T]_\\mathcal{B} = \\text{diag}(2,-1)$, and $A\\mathbf{x} = [4, 8]^T$.",
      },
      pitfalls: [
        "Giving $\\mathcal{B}$-coordinates when the question asks for the standard vector (or the other way round).",
        "Using $P$ where you need $P^{-1}$: $[\\mathbf{x}]_\\mathcal{B} = P^{-1}\\mathbf{x}$, not $P\\mathbf{x}$.",
      ],
      recall: [
        { q: "Matrix of $\\mathbf{x} \\mapsto A\\mathbf{x}$ relative to an eigenvector basis?", a: "The diagonal matrix $D$ of the corresponding eigenvalues." },
        { q: "How are $[T]_\\mathcal{B}$ and $A$ related?", a: "$[T]_\\mathcal{B} = P^{-1}AP$, so they are similar." },
      ],
    },
    {
      title: "Complex eigenvalues of real $2 \\times 2$ matrices",
      intuition:
        "A rotation keeps no real line fixed, so it has no real eigenvectors. Its eigenvalues are complex, $a \\pm bj$. The modulus $r = |\\lambda|$ is the scaling and the argument $\\varphi$ is the rotation angle.",
      keyIdeas: [
        "If $\\det(A - \\lambda I) = 0$ has negative discriminant, the eigenvalues are complex: $\\lambda = a \\pm bj$ (course notation: $j^2 = -1$).",
        "For **real** $A$, complex eigenvalues and eigenvectors come in **conjugate pairs**: if $A\\mathbf{v} = \\lambda\\mathbf{v}$ then $A\\bar{\\mathbf{v}} = \\bar{\\lambda}\\bar{\\mathbf{v}}$.",
        "A real $n \\times n$ matrix with $n$ odd always has at least one real eigenvalue.",
        "Rotation-scaling matrix $C = \\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix}$ has $\\lambda = a \\pm bj$, $r = \\sqrt{a^2 + b^2}$, $\\varphi = \\arg(a + bj)$, and $C = r\\begin{bmatrix} \\cos\\varphi & -\\sin\\varphi \\\\ \\sin\\varphi & \\cos\\varphi \\end{bmatrix}$.",
        "Any real $2 \\times 2$ $A$ with eigenvalue $\\lambda = a - bj$ and eigenvector $\\mathbf{v}$ satisfies $A = PCP^{-1}$, where $P = [\\text{Re}\\,\\mathbf{v}\\ \\ \\text{Im}\\,\\mathbf{v}]$.",
        "Powers: $A^k$ scales by $r^k$ and rotates by $k\\varphi$. If $r > 1$, points spiral outward; if $r < 1$, they spiral inward to $\\mathbf{0}$; if $r = 1$, they stay on a closed (elliptical) orbit.",
      ],
      formulas: [
        "\\lambda = a \\pm bj, \\qquad r = |\\lambda| = \\sqrt{a^2 + b^2}, \\qquad \\tan\\varphi = \\tfrac{b}{a}",
        "C = \\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix} = r\\begin{bmatrix} \\cos\\varphi & -\\sin\\varphi \\\\ \\sin\\varphi & \\cos\\varphi \\end{bmatrix}",
      ],
      example: {
        problem:
          "Find the eigenvalues of $A = \\begin{bmatrix} 1 & -2 \\\\ 1 & 3 \\end{bmatrix}$, an eigenvector for $\\lambda = 2 - j$, and the scale factor and rotation angle.",
        steps: [
          "$\\text{tr}A = 4$ and $\\det A = 3 + 2 = 5$, so $\\lambda^2 - 4\\lambda + 5 = 0$ and $\\lambda = \\dfrac{4 \\pm \\sqrt{16 - 20}}{2} = 2 \\pm j$.",
          "For $\\lambda = 2 - j$: $A - \\lambda I = \\begin{bmatrix} -1 + j & -2 \\\\ 1 & 1 + j \\end{bmatrix}$. The rows are dependent, so use row 2: $x_1 + (1 + j)x_2 = 0$.",
          "Take $x_2 = 1$, so $x_1 = -1 - j$ and $\\mathbf{v} = [-1 - j,\\ 1]^T$. Check row 1: $(-1 + j)(-1 - j) - 2 = (1 + 1) - 2 = 0$ ✓.",
          "By conjugation, $\\bar{\\mathbf{v}} = [-1 + j,\\ 1]^T$ is an eigenvector for $2 + j$.",
          "$r = |2 \\pm j| = \\sqrt{4 + 1} = \\sqrt{5} \\approx 2.236$ and $\\varphi = \\tan^{-1}(1/2) \\approx 26.57^\\circ$.",
        ],
        answer:
          "$\\lambda = 2 \\pm j$; $\\mathbf{v} = [-1 - j, 1]^T$ for $2 - j$; $A$ is similar to a rotation by $\\approx 26.57^\\circ$ combined with scaling by $\\sqrt{5}$, so $A^k\\mathbf{x}$ spirals outward.",
      },
      pitfalls: [
        "Taking $r = a^2 + b^2$ instead of $\\sqrt{a^2 + b^2}$.",
        "Mixing up the angle: $\\tan\\varphi = b/a$ (imaginary over real), so for $\\sqrt{3} \\pm j$ it is $30^\\circ$, not $60^\\circ$.",
        "Thinking a real matrix can have a single unpaired complex eigenvalue. Non-real eigenvalues always come with their conjugate.",
      ],
      recall: [
        { q: "Eigenvalues of $\\begin{bmatrix} 3 & -4 \\\\ 4 & 3 \\end{bmatrix}$, plus $r$ and $\\varphi$?", a: "$3 \\pm 4j$, $r = 5$, $\\varphi = \\tan^{-1}(4/3) \\approx 53.13^\\circ$." },
        { q: "If $\\mathbf{v}$ is an eigenvector for $\\lambda$ (real $A$), what goes with $\\bar{\\lambda}$?", a: "$\\bar{\\mathbf{v}}$, the entrywise complex conjugate." },
        { q: "$|\\lambda| < 1$ for complex $\\lambda$: what happens to $A^k\\mathbf{x}$?", a: "It spirals inward to $\\mathbf{0}$." },
      ],
    },
  ],
  playbook: [
    "If asked whether $\\mathbf{u}$ is an eigenvector, compute $A\\mathbf{u}$ and check whether it is a multiple of $\\mathbf{u}$. Don't solve the characteristic equation.",
    "If asked whether $\\lambda$ is an eigenvalue, check whether $A - \\lambda I$ is singular (a free variable, or $\\det = 0$).",
    "If you see a triangular matrix, read the eigenvalues straight off the diagonal. If the matrix was row-reduced, do NOT.",
    "If you see a $2 \\times 2$ matrix, use $\\lambda^2 - (\\text{tr}A)\\lambda + \\det A = 0$, then check with sum = trace and product = det.",
    "If given the eigenvalues of $A$ and asked about $A^k$, $A^{-1}$, $A + cI$, $cA$ or $p(A)$, apply the same operation to each $\\lambda$. The eigenvectors stay the same. For $A^T$, the eigenvalues stay the same.",
    "If asked for $\\det$ or invertibility from eigenvalues, multiply them. A zero eigenvalue means singular.",
    "If asked \"is $A$ diagonalizable?\": distinct eigenvalues means yes. With repeated $\\lambda$, compare $\\dim\\text{Nul}(A - \\lambda I)$ with the multiplicity. If only the eigenvalues are given and one repeats, answer \"Not enough information\".",
    "If asked about similarity, first compare the eigenvalues (and trace/det). Different means not similar. Same eigenvalues with both diagonalizable means similar. Same eigenvalues but one not diagonalizable means not similar.",
    "If asked for $A^k$, diagonalize and compute $PD^kP^{-1}$. Verify with $k = 1$ (you should get back $A$).",
    "If asked about $A^k\\mathbf{x}$ as $k \\to \\infty$, write $\\mathbf{x}$ in eigenvector coordinates. Keep the term with the largest $|\\lambda|$ whose coefficient is not $0$, then look at the signs of $c_i\\mathbf{v}_i$: $\\lambda > 1$ gives $\\pm\\infty$ entry-wise, $\\lambda = 1$ gives $c_i\\mathbf{v}_i$, all $|\\lambda| < 1$ gives $\\mathbf{0}$, and $\\lambda < -1$ gives no limit.",
    "If you see $\\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix}$, write $\\lambda = a \\pm bj$, $r = \\sqrt{a^2 + b^2}$ (scaling) and $\\varphi = \\tan^{-1}(b/a)$ (rotation). For $A^k$, use $r^k$ and $k\\varphi$.",
    "If a TFN statement says \"always\" but you can build a counterexample (e.g. $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, $\\text{diag}(1,0)$, $I$), answer False. If the truth depends on unknown entries or on unknown coefficients of $\\mathbf{x}$, answer \"Not enough information\".",
  ],
};
