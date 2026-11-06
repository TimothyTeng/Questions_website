import type { Lesson } from "@/lib/types";

export const leastSquaresLesson: Lesson = {
  topic: "least-squares",
  bigPicture:
    "When $A\\mathbf{x} = \\mathbf{b}$ has no solution (typically more equations than unknowns, with noisy data), we settle for the $\\hat{\\mathbf{x}}$ that makes $A\\hat{\\mathbf{x}}$ as close to $\\mathbf{b}$ as possible. Geometrically $A\\hat{\\mathbf{x}}$ must be $\\hat{\\mathbf{b}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$, so the residual $\\mathbf{b}-A\\hat{\\mathbf{x}}$ is orthogonal to $\\operatorname{Col}A$. That orthogonality is the normal equations $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$. They can be solved directly, with $QR$ ($R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$), or packaged as a projection matrix $P = A(A^TA)^{-1}A^T = QQ^T$. Regression is the same problem: fitting $y = \\beta_0 + \\beta_1x$ (or any model linear in the $\\beta$'s) is least squares with a design matrix $X$.",
  sections: [
    {
      title: "Consistency and the least-squares problem",
      intuition:
        "$A\\mathbf{x}$ can only reach vectors in $\\operatorname{Col}A$. If $\\mathbf{b}$ is outside it, no $\\mathbf{x}$ works exactly, so we aim for the point of $\\operatorname{Col}A$ nearest to $\\mathbf{b}$.",
      keyIdeas: [
        "$A\\mathbf{x} = \\mathbf{b}$ is consistent $\\iff \\mathbf{b}\\in\\operatorname{Col}A \\iff \\operatorname{rank}A = \\operatorname{rank}[A\\,|\\,\\mathbf{b}]$. ($\\operatorname{rank}A > \\operatorname{rank}[A|\\mathbf{b}]$ is impossible.)",
        "Consistent with $\\operatorname{rank}A = n$ means a unique solution; consistent with $\\operatorname{rank}A < n$ means infinitely many; $\\operatorname{rank}A < \\operatorname{rank}[A|\\mathbf{b}]$ means inconsistent.",
        "Over-determined ($m \\gg n$) systems are *typically* inconsistent; under-determined ($m \\ll n$) systems typically have infinitely many solutions. \"Typically\" is not \"always\".",
        "A **least-squares solution** $\\hat{\\mathbf{x}}$ minimises $\\|\\mathbf{b}-A\\mathbf{x}\\|$ over all $\\mathbf{x}\\in\\mathbb{R}^n$. Then $A\\hat{\\mathbf{x}} = \\hat{\\mathbf{b}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$ (Best Approximation Theorem).",
        "If the system is consistent, the least-squares solutions are exactly the ordinary solutions, and the error is 0.",
      ],
      formulas: ["\\hat{\\mathbf{x}} = \\arg\\min_{\\mathbf{x}}\\|\\mathbf{b}-A\\mathbf{x}\\|, \\qquad A\\hat{\\mathbf{x}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}"],
      example: {
        problem:
          "$A = \\begin{bmatrix}1&0\\\\0&1\\\\1&1\\end{bmatrix}$, $\\mathbf{b} = (1,1,0)$. Is $A\\mathbf{x}=\\mathbf{b}$ consistent? If not, find the least-squares solution and error.",
        steps: [
          "The first two rows force $x_1 = 1$, $x_2 = 1$, but then row 3 gives $x_1+x_2 = 2 \\ne 0$. So $\\operatorname{rank}A = 2 < \\operatorname{rank}[A|\\mathbf{b}] = 3$: inconsistent.",
          "$A^TA = \\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$ and $A^T\\mathbf{b} = (1, 1)$.",
          "Solve $2x_1+x_2 = 1$, $x_1+2x_2 = 1$: $\\hat{\\mathbf{x}} = (1/3, 1/3)$.",
          "$A\\hat{\\mathbf{x}} = (1/3, 1/3, 2/3)$, so the residual is $(2/3, 2/3, -2/3)$. It is orthogonal to both columns ✓.",
          "Error $= \\sqrt{3\\cdot 4/9} = 2/\\sqrt3 \\approx 1.155$.",
        ],
        answer: "Inconsistent; $\\hat{\\mathbf{x}} = (1/3,1/3)$ with least-squares error $2/\\sqrt3$.",
      },
      pitfalls: [
        "\"Over-determined ⇒ inconsistent\" is not a theorem. Whether $\\mathbf{b}\\in\\operatorname{Col}A$ depends on $\\mathbf{b}$, so without it the answer is \"not enough information\".",
        "The least-squares error is $\\|\\mathbf{b}-A\\hat{\\mathbf{x}}\\|$, not its square, unless the question says \"sum of squared errors\".",
      ],
      recall: [
        { q: "Rank test for consistency?", a: "$\\operatorname{rank}A = \\operatorname{rank}[A|\\mathbf{b}]$ (equivalently $\\mathbf{b}\\in\\operatorname{Col}A$)." },
        { q: "What vector does $A\\hat{\\mathbf{x}}$ equal?", a: "$\\hat{\\mathbf{b}} = \\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$, the closest point of $\\operatorname{Col}A$ to $\\mathbf{b}$." },
      ],
    },
    {
      title: "The normal equations",
      intuition:
        "At the best $\\hat{\\mathbf{x}}$, the error vector $\\mathbf{b}-A\\hat{\\mathbf{x}}$ sticks straight out of $\\operatorname{Col}A$, so it is orthogonal to every column. Writing \"orthogonal to every column\" as one matrix equation gives the normal equations.",
      keyIdeas: [
        "$\\mathbf{b}-A\\hat{\\mathbf{x}}\\in(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$, so $A^T(\\mathbf{b}-A\\hat{\\mathbf{x}}) = \\mathbf{0}$, i.e. $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$.",
        "The set of least-squares solutions **equals** the solution set of the normal equations (Lay Thm 13).",
        "The normal equations are **always consistent**, because $\\hat{\\mathbf{b}}\\in\\operatorname{Col}A$ guarantees some $\\hat{\\mathbf{x}}$.",
        "$A^TA$ is always $n\\times n$ and symmetric, with $\\operatorname{rank}(A^TA) = \\operatorname{rank}A$.",
        "If $A^TA$ is invertible: $\\hat{\\mathbf{x}} = (A^TA)^{-1}A^T\\mathbf{b}$.",
      ],
      formulas: [
        "A^TA\\,\\hat{\\mathbf{x}} = A^T\\mathbf{b}",
        "\\hat{\\mathbf{x}} = (A^TA)^{-1}A^T\\mathbf{b} \\quad (\\text{independent columns})",
      ],
      example: {
        problem:
          "Find the least-squares solution and error for $A = \\begin{bmatrix}4&0\\\\0&2\\\\1&1\\end{bmatrix}$, $\\mathbf{b} = (2,0,11)$.",
        steps: [
          "$A^TA = \\begin{bmatrix}16+0+1 & 0+0+1\\\\ 1 & 0+4+1\\end{bmatrix} = \\begin{bmatrix}17&1\\\\1&5\\end{bmatrix}$.",
          "$A^T\\mathbf{b} = (4\\cdot2 + 0 + 11,\\ 0+0+11) = (19, 11)$.",
          "$\\det A^TA = 85-1 = 84$, so $\\hat{\\mathbf{x}} = \\tfrac{1}{84}\\begin{bmatrix}5&-1\\\\-1&17\\end{bmatrix}\\begin{bmatrix}19\\\\11\\end{bmatrix} = \\tfrac{1}{84}(84, 168) = (1,2)$.",
          "$A\\hat{\\mathbf{x}} = (4,4,3)$, residual $(-2,-4,8)$; check $(-2,-4,8)\\cdot(4,0,1) = 0$ and $(-2,-4,8)\\cdot(0,2,1) = 0$ ✓.",
          "Error $= \\sqrt{4+16+64} = \\sqrt{84}$.",
        ],
        answer: "$\\hat{\\mathbf{x}} = (1,2)$, least-squares error $\\sqrt{84}\\approx 9.17$.",
      },
      pitfalls: [
        "\"Normal equations have no solution when $A^TA$ is singular\" is **false**: there are infinitely many solutions.",
        "Do not write $\\hat{\\mathbf{x}} = A^{-1}\\mathbf{b}$ for a non-square $A$. $(A^TA)^{-1}A^T$ is not $A^{-1}(A^T)^{-1}A^T$.",
        "The residual is orthogonal to $\\operatorname{Col}A$ and to $\\hat{\\mathbf{b}}$, but generally **not** to $\\mathbf{b}$.",
      ],
      recall: [
        { q: "State the normal equations.", a: "$A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$." },
        { q: "Can the normal equations be inconsistent?", a: "Never. They always have at least one solution." },
        { q: "Which subspace contains the residual $\\mathbf{b}-A\\hat{\\mathbf{x}}$?", a: "$(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$." },
      ],
    },
    {
      title: "When is $\\hat{\\mathbf{x}}$ unique?",
      intuition:
        "The closest point $\\hat{\\mathbf{b}}$ is always unique. But if the columns of $A$ are redundant, several combinations of them build the same $\\hat{\\mathbf{b}}$, so the recipe $\\hat{\\mathbf{x}}$ is not unique.",
      keyIdeas: [
        "These are equivalent: (a) $\\hat{\\mathbf{x}}$ is unique for every $\\mathbf{b}$; (b) the columns of $A$ are linearly independent; (c) $A^TA$ is invertible; (d) $\\operatorname{Nul}A = \\{\\mathbf{0}\\}$.",
        "If they fail, the least-squares solutions are $\\hat{\\mathbf{x}}_p + \\operatorname{Nul}A$: infinitely many, all with the **same** $A\\hat{\\mathbf{x}} = \\hat{\\mathbf{b}}$ and the same error.",
        "A wide matrix ($m < n$) **always** has dependent columns, so it always has infinitely many least-squares solutions.",
        "A tall matrix ($m > n$) *may* have independent columns. Check the rank.",
        "Causes of a singular $A^TA$ (course): redundant/duplicate features (dependent columns), or more features than data points.",
      ],
      formulas: ["\\{\\hat{\\mathbf{x}}\\} = \\hat{\\mathbf{x}}_p + \\operatorname{Nul}A, \\qquad \\hat{\\mathbf{b}} = A\\hat{\\mathbf{x}}\\ \\text{unique}"],
      example: {
        problem: "$A = \\begin{bmatrix}1&2\\\\1&2\\\\1&2\\end{bmatrix}$, $\\mathbf{b} = (1,2,6)$. Describe all least-squares solutions and $\\hat{\\mathbf{b}}$.",
        steps: [
          "Column 2 $= 2\\times$ column 1, so the columns are dependent and $A^TA = \\begin{bmatrix}3&6\\\\6&12\\end{bmatrix}$ is singular (det $= 0$).",
          "$A^T\\mathbf{b} = (1+2+6,\\ 2+4+12) = (9, 18)$.",
          "The normal equations reduce to a single equation, $3x_1 + 6x_2 = 9$, i.e. $x_1 + 2x_2 = 3$: infinitely many solutions, e.g. $(3,0)$ or $(1,1)$.",
          "Every solution gives $A\\hat{\\mathbf{x}} = (x_1+2x_2)(1,1,1) = (3,3,3) = \\hat{\\mathbf{b}}$, which is unique (the projection of $\\mathbf{b}$ onto the line through $(1,1,1)$).",
        ],
        answer: "$\\hat{\\mathbf{x}} = (3-2t,\\ t)$ for any $t$; $\\hat{\\mathbf{b}} = (3,3,3)$ in every case.",
      },
      pitfalls: [
        "\"The least-squares solution is always unique\" is **false** (sample paper).",
        "Not unique $\\hat{\\mathbf{x}}$ does **not** mean not unique $\\hat{\\mathbf{b}}$. The projection is always unique.",
        "\"$A$ is $5\\times3$\" alone does not decide uniqueness. You need the rank, otherwise the answer is \"not enough information\".",
      ],
      recall: [
        { q: "Three equivalent conditions for a unique $\\hat{\\mathbf{x}}$?", a: "Independent columns of $A$; $A^TA$ invertible; $\\operatorname{Nul}A = \\{\\mathbf{0}\\}$." },
        { q: "If $\\hat{\\mathbf{x}}$ is not unique, is $A\\hat{\\mathbf{x}}$ unique?", a: "Yes: it is always $\\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{b}$." },
      ],
    },
    {
      title: "The projection matrix $P$",
      intuition:
        "Substitute $\\hat{\\mathbf{x}}$ back into $A\\hat{\\mathbf{x}}$ and you get one matrix that turns any $\\mathbf{b}$ into its shadow on $\\operatorname{Col}A$. A shadow of a shadow is the same shadow, so $P^2 = P$.",
      keyIdeas: [
        "Independent columns: $\\hat{\\mathbf{b}} = P\\mathbf{b}$ with $P = A(A^TA)^{-1}A^T$ ($m\\times m$). With $A = QR$: $P = QQ^T$.",
        "Line case: $P = \\dfrac{\\mathbf{a}\\mathbf{a}^T}{\\mathbf{a}^T\\mathbf{a}}$.",
        "Properties: $P^2 = P$ (idempotent) and $P^T = P$ (symmetric). $\\operatorname{rank}P = \\operatorname{trace}P = \\dim\\operatorname{Col}A$, and its eigenvalues are only 0 and 1.",
        "$I - P$ projects onto $(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$; $(I-P)\\mathbf{b}$ is the residual.",
        "$P$ is singular unless $\\operatorname{Col}A = \\mathbb{R}^m$ (then $P = I$).",
      ],
      formulas: [
        "P = A(A^TA)^{-1}A^T = QQ^T",
        "P^2 = P, \\quad P^T = P, \\quad \\mathbf{b} = P\\mathbf{b} + (I-P)\\mathbf{b}",
      ],
      example: {
        problem: "Find $P$ for the line spanned by $\\mathbf{a} = (1,2)$, verify $P^2 = P$, and project $\\mathbf{b} = (3,1)$.",
        steps: [
          "$\\mathbf{a}^T\\mathbf{a} = 5$ and $\\mathbf{a}\\mathbf{a}^T = \\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$, so $P = \\tfrac15\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$.",
          "$P^2 = \\tfrac{1}{25}\\begin{bmatrix}5&10\\\\10&20\\end{bmatrix} = \\tfrac15\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix} = P$ ✓. $P$ is symmetric ✓, and its trace is 1 = rank ✓.",
          "$P\\mathbf{b} = \\tfrac15(3+2,\\ 6+4) = (1, 2)$.",
          "Residual $(I-P)\\mathbf{b} = (2,-1)$, and $(2,-1)\\cdot(1,2) = 0$ ✓.",
        ],
        answer: "$P = \\tfrac15\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$; $P\\mathbf{b} = (1,2)$.",
      },
      pitfalls: [
        "Do not \"simplify\" $A(A^TA)^{-1}A^T$ to $I$. That needs $A^{-1}$, which does not exist for tall $A$.",
        "$I-P$ projects onto $\\operatorname{Nul}A^T$, **not** $\\operatorname{Nul}A$.",
        "$P = QQ^T$ requires $Q$ with orthonormal columns spanning $\\operatorname{Col}A$, i.e. the economy $Q$ from $A = QR$.",
      ],
      recall: [
        { q: "Two defining properties of an orthogonal projection matrix?", a: "$P^2 = P$ and $P^T = P$." },
        { q: "$P$ in terms of the economy QR factors?", a: "$P = QQ^T$." },
        { q: "Rank of $P$ for a $6\\times2$ $A$ with independent columns?", a: "2, so $P$ ($6\\times6$) is singular." },
      ],
    },
    {
      title: "Least squares via QR",
      intuition:
        "With $A = QR$, the messy $A^TA$ becomes $R^TR$, and the normal equations collapse to an upper-triangular system. This is faster and numerically safer, because it avoids forming $A^TA$.",
      keyIdeas: [
        "If $A$ ($m\\times n$) has independent columns and $A = QR$ (economy), then the unique least-squares solution satisfies $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$.",
        "Derivation: $A^TA = R^TQ^TQR = R^TR$ and $A^T\\mathbf{b} = R^TQ^T\\mathbf{b}$. Cancel the invertible $R^T$ to get $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$.",
        "Solve by **back-substitution** (last variable first). Formally $\\hat{\\mathbf{x}} = R^{-1}Q^T\\mathbf{b}$.",
        "$A\\hat{\\mathbf{x}} = QR\\hat{\\mathbf{x}} = QQ^T\\mathbf{b} = \\hat{\\mathbf{b}}$, consistent with $P = QQ^T$.",
        "Special case: if $A$ itself has orthonormal columns, then $\\hat{\\mathbf{x}} = A^T\\mathbf{b}$.",
      ],
      formulas: ["R\\,\\hat{\\mathbf{x}} = Q^T\\mathbf{b}, \\qquad \\hat{\\mathbf{x}} = R^{-1}Q^T\\mathbf{b}"],
      example: {
        problem:
          "$A = \\begin{bmatrix}3&1\\\\6&2\\\\0&2\\end{bmatrix} = QR$ with $\\mathbf{q}_1 = (1,2,0)/\\sqrt5$, $\\mathbf{q}_2 = (0,0,1)$, $R = \\begin{bmatrix}3\\sqrt5&\\sqrt5\\\\0&2\\end{bmatrix}$. Solve the least-squares problem for $\\mathbf{b} = (5,0,4)$.",
        steps: [
          "$Q^T\\mathbf{b} = (\\mathbf{q}_1\\cdot\\mathbf{b},\\ \\mathbf{q}_2\\cdot\\mathbf{b}) = (5/\\sqrt5,\\ 4) = (\\sqrt5,\\ 4)$.",
          "Back-substitute the bottom row: $2x_2 = 4 \\Rightarrow x_2 = 2$.",
          "Top row: $3\\sqrt5\\,x_1 + \\sqrt5\\cdot2 = \\sqrt5 \\Rightarrow 3x_1 + 2 = 1 \\Rightarrow x_1 = -1/3$.",
          "Check with the normal equations: $A^TA = \\begin{bmatrix}45&15\\\\15&9\\end{bmatrix}$, $A^T\\mathbf{b} = (15, 13)$; $45(-\\tfrac13)+15(2) = 15$ ✓ and $15(-\\tfrac13)+9(2) = 13$ ✓.",
        ],
        answer: "$\\hat{\\mathbf{x}} = (-1/3,\\ 2)$.",
      },
      pitfalls: [
        "It is $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$, not $R\\hat{\\mathbf{x}} = \\mathbf{b}$ and not $\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$ (unless $R = I$).",
        "The formula assumes $R$ is invertible (independent columns). With dependent columns, $R$ is singular and the solution is not unique.",
        "Back-substitution goes from the **bottom** row up.",
      ],
      recall: [
        { q: "Least-squares equation using QR?", a: "$R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$." },
        { q: "Why is QR preferred over forming $A^TA$?", a: "$R$ is triangular (easy back-substitution), and it avoids the numerical problems of computing $A^TA$." },
      ],
    },
    {
      title: "Linear models and regression",
      intuition:
        "Each data point $(x_j, y_j)$ is one equation saying \"the model should hit this point\". With more points than parameters the equations conflict, so least squares picks the parameters with the smallest total squared vertical miss.",
      keyIdeas: [
        "Write the model as $X\\boldsymbol\\beta = \\mathbf{y}$: $X$ is the **design matrix**, $\\boldsymbol\\beta$ the **parameter vector**, $\\mathbf{y}$ the **observation vector**. Residual vector: $\\boldsymbol\\epsilon = \\mathbf{y}-X\\boldsymbol\\beta$.",
        "Line $y = \\beta_0 + \\beta_1x$: row $j$ of $X$ is $(1, x_j)$. Solve $X^TX\\boldsymbol\\beta = X^T\\mathbf{y}$.",
        "**Linear in the parameters** is what matters, not linear in $x$. $y = \\beta_0+\\beta_1x+\\beta_2x^2$, $\\beta_0 + \\beta_1\\sin x$ and $\\beta_0 + \\beta_1\\ln x$ all work: column $k$ of $X$ is the $k$-th basis function evaluated at the $x_j$.",
        "Not linear: $\\beta_0e^{\\beta_1x}$ (you can take logs to linearise, but that is a different fit).",
        "If at least two $x_j$ are distinct, the line's $X$ has independent columns, so $\\hat{\\boldsymbol\\beta}$ is unique. The error is zero iff the points lie exactly on the curve.",
      ],
      formulas: [
        "X = \\begin{bmatrix}1 & x_1\\\\ \\vdots & \\vdots\\\\ 1 & x_n\\end{bmatrix}, \\qquad X^TX\\hat{\\boldsymbol\\beta} = X^T\\mathbf{y}",
        "\\text{quadratic: row } j = (1,\\ x_j,\\ x_j^2)",
      ],
      example: {
        problem: "Fit $y = \\beta_0 + \\beta_1x$ to $(0,1), (1,1), (2,4)$ by least squares.",
        steps: [
          "$X = \\begin{bmatrix}1&0\\\\1&1\\\\1&2\\end{bmatrix}$, $\\mathbf{y} = (1,1,4)$.",
          "$X^TX = \\begin{bmatrix}3 & 3\\\\3 & 5\\end{bmatrix}$ ($n$, $\\sum x$; $\\sum x$, $\\sum x^2$) and $X^T\\mathbf{y} = (6, 9)$ ($\\sum y$, $\\sum xy$).",
          "$\\det = 15 - 9 = 6$, so $\\hat{\\boldsymbol\\beta} = \\tfrac16\\begin{bmatrix}5&-3\\\\-3&3\\end{bmatrix}\\begin{bmatrix}6\\\\9\\end{bmatrix} = \\tfrac16(3, 9) = (0.5, 1.5)$.",
          "Predictions $(0.5, 2, 3.5)$, residuals $(0.5,-1,0.5)$: they sum to 0 and $\\sum x_j\\epsilon_j = 0$ ✓ (orthogonal to both columns).",
          "Sum of squared errors $= 0.25+1+0.25 = 1.5$.",
        ],
        answer: "$y = 0.5 + 1.5x$.",
      },
      pitfalls: [
        "The $y$-values go into $\\mathbf{y}$, never into $X$.",
        "Keep the column order of $X$ consistent with the order of $\\boldsymbol\\beta$ (usually the constant column first).",
        "\"Nonlinear curve\" does not mean nonlinear least squares. Check whether the parameters appear linearly.",
        "The least-squares line minimises **vertical** squared distances, not perpendicular distances.",
      ],
      recall: [
        { q: "Row $j$ of the design matrix for $y = \\beta_0+\\beta_1x+\\beta_2x^2$?", a: "$(1, x_j, x_j^2)$." },
        { q: "Is $y = \\beta_0 + \\beta_1\\cos x$ a linear model?", a: "Yes: it is linear in $\\beta_0, \\beta_1$, with columns $1$ and $\\cos x_j$." },
        { q: "With an intercept term, what do the residuals always sum to?", a: "Zero, because the residual is orthogonal to the column of ones." },
      ],
    },
  ],
  playbook: [
    "If you see \"is $A\\mathbf{x}=\\mathbf{b}$ consistent?\" → compare $\\operatorname{rank}A$ with $\\operatorname{rank}[A|\\mathbf{b}]$ (or test $\\mathbf{b}\\in\\operatorname{Col}A$); if $\\mathbf{b}$ is unspecified, it is \"not enough information\".",
    "If you see \"find the least-squares solution\" → compute $A^TA$ and $A^T\\mathbf{b}$, solve $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$, then check the residual is orthogonal to each column.",
    "If you see \"$\\hat{\\mathbf{x}}$ always unique?\" → **False**; unique iff the columns are independent iff $A^TA$ is invertible.",
    "If you see \"normal equations have no solution when $A^TA$ is singular\" → **False**; they are always consistent (infinitely many solutions in that case).",
    "If you see a wide $A$ ($m<n$) → $A^TA$ is singular and there are infinitely many least-squares solutions, always.",
    "If you see a tall $A$ with no rank given → uniqueness is \"not enough information\".",
    "If you see $A = QR$ in a least-squares question → solve $R\\hat{\\mathbf{x}} = Q^T\\mathbf{b}$ by back-substitution.",
    "If you see $P = A(A^TA)^{-1}A^T$ → it equals $QQ^T$; $P^2 = P$, $P^T = P$, rank $= \\operatorname{rank}A$; it is singular unless $P = I$.",
    "If you see $I-P$ → it projects onto $(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$ and gives the residual.",
    "If you see \"least-squares error\" → compute $\\|\\mathbf{b}-A\\hat{\\mathbf{x}}\\|$ (a square root); it is the same for every least-squares solution.",
    "If you see data points and a model → build $X$ row by row from the basis functions, put the $y$'s in $\\mathbf{y}$, and solve $X^TX\\boldsymbol\\beta = X^T\\mathbf{y}$.",
    "If you see \"is this model linear?\" → ask whether each $\\beta$ appears only as a coefficient, never inside a function.",
  ],
};
