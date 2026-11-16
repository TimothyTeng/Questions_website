import type { Lesson } from "@/lib/types";

export const vectorSpacesLesson: Lesson = {
  topic: "vector-spaces",
  bigPicture:
    "A vector space is any collection you can add and scale without leaving it: arrows in $\\mathbb{R}^n$, polynomials, matrices, functions. The pieces build on each other. **Subspaces** are the flat sets through the origin (lines, planes, …) and are recognised with a three-part test. Every matrix carries four of them: the **null space** $N(A)$ (solutions of $A\\mathbf{x} = \\mathbf{0}$), the **column space** $C(A)$ (the $\\mathbf{b}$'s that make $A\\mathbf{x} = \\mathbf{b}$ consistent), the **row space** $C(A^T)$ and $N(A^T)$. A **basis** is a spanning set with no redundancy; its size is the **dimension**. Row reduction gives bases for all of these at once, and the **Rank Theorem** $\\operatorname{rank}A + \\dim N(A) = n$ ties them together. Finally, a basis turns any vector, polynomial or matrix into a column of numbers, its **coordinates** $[\\mathbf{x}]_{\\mathcal{B}}$, and change-of-basis matrices translate between coordinate systems.",
  sections: [
    {
      title: "Vector spaces and subspaces",
      intuition:
        "A subspace is a \"flat\" set through the origin that you can never escape by adding or scaling. Lines and planes through $\\mathbf{0}$ qualify; anything shifted away from the origin, curved, bounded or made of two separate pieces does not.",
      visuals: ["subspace-test"],
      keyIdeas: [
        "A **vector space** $V$ is a set with addition and scalar multiplication satisfying the 10 axioms (closure under both operations, commutativity, associativity, a zero vector, additive inverses, distributive laws, $1\\mathbf{u} = \\mathbf{u}$). Examples: $\\mathbb{R}^n$; $\\mathbb{P}_n$ (polynomials of degree $\\le n$); $M_{m\\times n}$ ($m\\times n$ matrices); functions $\\mathbb{R}\\to\\mathbb{R}$.",
        "**Subspace test.** $H \\subseteq V$ is a subspace iff (1) $\\mathbf{0} \\in H$, (2) $\\mathbf{u}, \\mathbf{v} \\in H \\Rightarrow \\mathbf{u} + \\mathbf{v} \\in H$, (3) $\\mathbf{u} \\in H \\Rightarrow c\\mathbf{u} \\in H$ for every scalar $c$. All the other axioms are inherited from $V$.",
        "**Always subspaces:** $\\{\\mathbf{0}\\}$ and $V$ itself; any $\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$; the solution set of a **homogeneous** linear system; the intersection $H\\cap K$ of two subspaces; the symmetric matrices in $M_{n\\times n}$ ($(A+B)^T = A+B$ and $(cA)^T = cA$).",
        "**Classic non-subspaces:** a plane or line **not** through the origin ($\\mathbf{0}$ missing); $\\{z = 0 \\text{ or } y = 0\\}$ and other **unions** such as the two axes (not closed under $+$); half-spaces like $x_1 + x_2 + x_3 \\ge 0$ (not closed under multiplication by $-1$); the unit ball $\\|\\mathbf{x}\\| \\le 1$ (not closed under scaling by $2$); sets defined by nonlinear equations such as $y = x^2$ or $xy = 0$.",
        "The union $H\\cup K$ of two subspaces is usually **not** a subspace (only when one contains the other). The intersection always is.",
      ],
      formulas: [
        "H \\text{ subspace} \\iff \\mathbf{0}\\in H,\\quad \\mathbf{u}+\\mathbf{v}\\in H,\\quad c\\mathbf{u}\\in H",
        "\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\} = \\{c_1\\mathbf{v}_1 + \\dots + c_p\\mathbf{v}_p : c_i \\in \\mathbb{R}\\}",
      ],
      example: {
        problem:
          "Which are subspaces of $\\mathbb{R}^3$? $U = \\{(x,y,z) : z = 0 \\text{ or } y = 0\\}$, $W = \\{(x,y,z) : x - 2y + z = 0\\}$, $P = \\{(x,y,z) : x + y - 2z = 4\\}$.",
        steps: [
          "$U$: contains $\\mathbf{0}$ and is closed under scaling, but $(1,1,0) \\in U$ (since $z = 0$) and $(0,0,1) \\in U$ (since $y = 0$) add to $(1,1,1)$ with $y \\ne 0$ and $z \\ne 0$. Not closed under $+$, so **not** a subspace.",
          "$W$: it is $N\\big([\\,1\\ \\ {-2}\\ \\ 1\\,]\\big)$, the null space of a $1\\times3$ matrix. Directly: if $\\mathbf{u}, \\mathbf{v}$ satisfy the equation, so does $\\mathbf{u} + \\mathbf{v}$ (add the equations) and $c\\mathbf{u}$ (multiply by $c$); $\\mathbf{0}$ satisfies it. **Subspace.**",
          "$P$: $(0,0,0)$ gives $0 \\ne 4$, so $\\mathbf{0}\\notin P$. **Not** a subspace. (E.g. $(4,0,0)$ and $(0,4,0)$ are in $P$ but their sum gives $8 \\ne 4$.)",
          "The parallel plane through the origin, $x + y - 2z = 0$, **is** a subspace.",
        ],
        answer: "Only $W$ is a subspace.",
      },
      pitfalls: [
        "Checking only that $\\mathbf{0}$ is in the set is not enough: $\\{z = 0 \\text{ or } y = 0\\}$ and $\\{x_1+x_2+x_3 \\ge 0\\}$ both contain $\\mathbf{0}$ and still fail.",
        "To show a set is **not** a subspace, one concrete counterexample is enough. To show it **is**, you must check all three conditions for arbitrary vectors and scalars.",
        "A half-space is closed under addition and under **positive** scaling. The failure is the scalar $-1$, which is easy to miss.",
        "$\\mathbb{R}^2$ is **not** a subspace of $\\mathbb{R}^3$ (its vectors have 2 entries). The plane $\\{(x,y,0)\\}$ is a subspace of $\\mathbb{R}^3$ that looks like $\\mathbb{R}^2$.",
      ],
      recall: [
        { q: "What are the three conditions of the subspace test?", a: "Contains $\\mathbf{0}$; closed under addition; closed under scalar multiplication." },
        { q: "Why is the unit ball in $\\mathbb{R}^3$ not a subspace?", a: "It is not closed under scalar multiplication: $(1,0,0)$ is in it but $2(1,0,0)$ is not." },
        { q: "Is the intersection of two subspaces a subspace? The union?", a: "The intersection always is. The union generally is not (e.g. the $x$-axis $\\cup$ the $y$-axis)." },
      ],
    },
    {
      title: "Null space, column space and row space",
      intuition:
        "Every matrix answers two questions. Which $\\mathbf{x}$ does $A$ send to $\\mathbf{0}$? That is $N(A)$, living in $\\mathbb{R}^n$. Which $\\mathbf{b}$ can $A$ reach? That is $C(A)$, living in $\\mathbb{R}^m$. The row space $C(A^T)$ is the span of the rows, back in $\\mathbb{R}^n$.",
      visuals: ["column-space-3d"],
      keyIdeas: [
        "For an $m\\times n$ matrix $A$: $N(A) = \\{\\mathbf{x}\\in\\mathbb{R}^n : A\\mathbf{x} = \\mathbf{0}\\}$ is a subspace of $\\mathbb{R}^n$ (**implicit** description: you must row reduce to list its vectors).",
        "$C(A) = \\operatorname{Span}\\{\\mathbf{a}_1,\\dots,\\mathbf{a}_n\\} = \\{A\\mathbf{x} : \\mathbf{x}\\in\\mathbb{R}^n\\}$ is a subspace of $\\mathbb{R}^m$ (**explicit**: its vectors are written down directly).",
        "**$A\\mathbf{x} = \\mathbf{b}$ is consistent $\\iff \\mathbf{b}\\in C(A)$.** $C(A) = \\mathbb{R}^m$ iff $A\\mathbf{x} = \\mathbf{b}$ is solvable for every $\\mathbf{b}$ iff $A$ has a pivot in every row.",
        "Row space $C(A^T)$: the span of the rows of $A$, a subspace of $\\mathbb{R}^n$. Left null space $N(A^T)$: a subspace of $\\mathbb{R}^m$.",
        "**Explicit description of $N(A)$:** row reduce to RREF, write the pivot variables in terms of the free variables, and split the general solution into (free variable) $\\times$ (fixed vector). Those vectors span $N(A)$ and are automatically independent.",
        "To find $A$ with a given set as $C(A)$: write the set as $\\{r\\mathbf{u} + s\\mathbf{v} + t\\mathbf{w}\\}$; the coefficient vectors of the parameters are the columns of $A$.",
        "**$AB = 0 \\Rightarrow C(B) \\subseteq N(A)$**: every column $\\mathbf{b}_j$ of $B$ satisfies $A\\mathbf{b}_j = \\mathbf{0}$. For $A = \\mathbf{u}\\mathbf{v}^T$ (nonzero $\\mathbf{u}, \\mathbf{v}$): $C(A) = \\operatorname{Span}\\{\\mathbf{u}\\}$ and $C(A^T) = \\operatorname{Span}\\{\\mathbf{v}\\}$.",
      ],
      formulas: [
        "N(A) = \\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\} \\subseteq \\mathbb{R}^n, \\qquad C(A) = \\{A\\mathbf{x}\\} \\subseteq \\mathbb{R}^m",
        "C(A^T) \\subseteq \\mathbb{R}^n, \\qquad N(A^T) \\subseteq \\mathbb{R}^m",
      ],
      example: {
        problem:
          "Let $A = \\begin{bmatrix} 1 & 2 & -1 \\\\ 2 & 5 & 0 \\\\ -1 & -1 & 3 \\end{bmatrix}$. Describe $N(A)$ explicitly, find the condition for $\\mathbf{b}\\in C(A)$, and decide whether $\\mathbf{b} = (1, 4, 1)$ is in $C(A)$.",
        steps: [
          "Row reduce $[A \\mid \\mathbf{b}]$: $R_2 - 2R_1$ gives $(0, 1, 2 \\mid b_2 - 2b_1)$; $R_3 + R_1$ gives $(0, 1, 2 \\mid b_3 + b_1)$; then $R_3 - R_2$ gives $(0, 0, 0 \\mid 3b_1 - b_2 + b_3)$.",
          "So $C(A) = \\{\\mathbf{b} : 3b_1 - b_2 + b_3 = 0\\}$, a plane through the origin in $\\mathbb{R}^3$ (rank 2). Check column 1: $3 - 2 - 1 = 0$ ✓.",
          "For $\\mathbf{b} = (1,4,1)$: $3 - 4 + 1 = 0$, so $\\mathbf{b} \\in C(A)$ and $A\\mathbf{x} = \\mathbf{b}$ is consistent.",
          "For $N(A)$ take $\\mathbf{b} = \\mathbf{0}$: RREF is $\\begin{bmatrix} 1 & 0 & -5 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 0 \\end{bmatrix}$, so $x_1 = 5x_3$, $x_2 = -2x_3$, $x_3$ free.",
          "$N(A) = \\{x_3(5, -2, 1)\\} = \\operatorname{Span}\\{(5,-2,1)\\}$. Check: $A(5,-2,1)^T = (5-4-1,\\ 10-10,\\ -5+2+3) = \\mathbf{0}$ ✓.",
        ],
        answer: "$N(A) = \\operatorname{Span}\\{(5,-2,1)\\}$; $C(A) = \\{3b_1 - b_2 + b_3 = 0\\}$; $(1,4,1) \\in C(A)$.",
      },
      pitfalls: [
        "$N(A)$ lives in $\\mathbb{R}^n$ (number of **columns**) and $C(A)$ in $\\mathbb{R}^m$ (number of **rows**). A $3\\times 5$ matrix has $N(A)\\subseteq\\mathbb{R}^5$ and $C(A)\\subseteq\\mathbb{R}^3$.",
        "The solution set of $A\\mathbf{x} = \\mathbf{b}$ with $\\mathbf{b}\\ne\\mathbf{0}$ is **not** a subspace (it misses $\\mathbf{0}$); it is $N(A)$ shifted by a particular solution.",
        "\"$\\mathbf{b}\\in C(A)$\" is the same question as \"is $A\\mathbf{x} = \\mathbf{b}$ consistent?\" Do not try to compute $C(A)$ some other way.",
        "$AB = 0$ gives $C(B)\\subseteq N(A)$, not $C(A)\\subseteq N(B)$.",
      ],
      recall: [
        { q: "$A$ is $4\\times 7$. In which $\\mathbb{R}^k$ do $N(A)$, $C(A)$, $C(A^T)$, $N(A^T)$ live?", a: "$N(A), C(A^T) \\subseteq \\mathbb{R}^7$; $C(A), N(A^T) \\subseteq \\mathbb{R}^4$." },
        { q: "When is $A\\mathbf{x} = \\mathbf{b}$ consistent, in subspace language?", a: "Exactly when $\\mathbf{b} \\in C(A)$." },
        { q: "If $AB = 0$, how are $C(B)$ and $N(A)$ related?", a: "$C(B) \\subseteq N(A)$, because $A$ kills every column of $B$." },
      ],
    },
    {
      title: "Linear independence, spanning sets and bases",
      intuition:
        "A basis is a spanning set with all redundancy removed: enough vectors to reach everything, and none that can be built from the others. The same definitions work for polynomials and matrices, because coordinates turn them into columns of numbers.",
      keyIdeas: [
        "$\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ is **linearly independent** if $c_1\\mathbf{v}_1 + \\dots + c_p\\mathbf{v}_p = \\mathbf{0}$ forces all $c_i = 0$. Otherwise there is a **dependence relation**, and some $\\mathbf{v}_j$ is a combination of the others.",
        "In $\\mathbb{P}_n$ or $M_{m\\times n}$: write each element as its coordinate vector with respect to the standard basis ($\\{1, t, \\dots, t^n\\}$ or the matrices $E_{ij}$) and test those columns. Example: $p_1 = 1 + t$, $p_2 = 1 - t$, $p_3 = 2$ satisfy $p_1 + p_2 - p_3 = 0$.",
        "A **basis** of $H$ is a linearly independent set that spans $H$. Standard bases: $\\{\\mathbf{e}_1,\\dots,\\mathbf{e}_n\\}$ for $\\mathbb{R}^n$; $\\{1, t, \\dots, t^n\\}$ for $\\mathbb{P}_n$; $\\{E_{ij}\\}$ for $M_{m\\times n}$.",
        "**Spanning Set Theorem**: if $\\mathbf{v}_k$ is a combination of the others, removing it does not change the span. Keep removing until the set is independent; what is left is a basis. Given $4\\mathbf{v}_1 + 5\\mathbf{v}_2 - 3\\mathbf{v}_3 = \\mathbf{0}$ (all coefficients nonzero), **any** two of the three form a basis of $\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2,\\mathbf{v}_3\\}$ (if no two are parallel).",
        "A basis is both a **smallest spanning set** and a **largest independent set**.",
        "Basis of a plane through $\\mathbf{0}$, e.g. $x + 2y + z = 0$: solve for one variable, $x = -2y - z$, so $(x,y,z) = y(-2,1,0) + z(-1,0,1)$, giving the basis $\\{(-2,1,0), (-1,0,1)\\}$.",
        "Any set containing $\\mathbf{0}$ is dependent. Two vectors are dependent iff one is a multiple of the other. More than $n$ vectors in $\\mathbb{R}^n$ are always dependent.",
      ],
      formulas: [
        "c_1\\mathbf{v}_1 + \\dots + c_p\\mathbf{v}_p = \\mathbf{0} \\ \\Rightarrow\\ c_1 = \\dots = c_p = 0 \\quad (\\text{independent})",
      ],
      example: {
        problem:
          "In $\\mathbb{P}_2$, are $\\mathbf{p}_1 = 1 + t^2$, $\\mathbf{p}_2 = t + t^2$, $\\mathbf{p}_3 = 1 + 2t + 3t^2$ linearly independent? Find a basis for $H = \\operatorname{Span}\\{\\mathbf{p}_1,\\mathbf{p}_2,\\mathbf{p}_3\\}$.",
        steps: [
          "Coordinates w.r.t. $\\{1, t, t^2\\}$: $[\\mathbf{p}_1] = (1,0,1)$, $[\\mathbf{p}_2] = (0,1,1)$, $[\\mathbf{p}_3] = (1,2,3)$.",
          "Row reduce $\\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 2 \\\\ 1 & 1 & 3 \\end{bmatrix}$ (coordinate vectors as columns): $R_3 - R_1 - R_2 = (0,0,0)$, so only 2 pivots. Dependent.",
          "Read the relation off the RREF: column 3 $= 1\\cdot$column 1 $+ 2\\cdot$column 2, i.e. $\\mathbf{p}_3 = \\mathbf{p}_1 + 2\\mathbf{p}_2$. Check: $(1 + t^2) + 2(t + t^2) = 1 + 2t + 3t^2$ ✓.",
          "By the Spanning Set Theorem drop $\\mathbf{p}_3$; $\\mathbf{p}_1, \\mathbf{p}_2$ are not multiples of each other, so they are independent.",
        ],
        answer: "Dependent ($\\mathbf{p}_3 = \\mathbf{p}_1 + 2\\mathbf{p}_2$); a basis for $H$ is $\\{1 + t^2,\\ t + t^2\\}$, so $\\dim H = 2$.",
      },
      pitfalls: [
        "\"Pairwise non-parallel\" does **not** mean independent once there are three or more vectors: $(1,0), (0,1), (1,1)$ are pairwise non-parallel but dependent.",
        "A spanning set may contain redundant vectors; a basis may not. \"Spans $H$\" alone does not make a set a basis.",
        "Given a dependence relation, you may only remove a vector whose coefficient is **nonzero**. If $2\\mathbf{v}_1 - \\mathbf{v}_2 + 0\\mathbf{v}_3 = \\mathbf{0}$, then $\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$ is **not** a basis.",
      ],
      recall: [
        { q: "What is a basis of $H$?", a: "A linearly independent set that spans $H$." },
        { q: "What is the basis of the plane $x + 2y + z = 0$ obtained by solving for $x$?", a: "$\\{(-2,1,0), (-1,0,1)\\}$." },
        { q: "How do you test polynomials in $\\mathbb{P}_n$ for independence?", a: "Replace each by its coefficient vector w.r.t. $\\{1, t, \\dots, t^n\\}$ and row reduce those vectors." },
      ],
    },
    {
      title: "Bases for $N(A)$, $C(A)$ and $C(A^T)$",
      intuition:
        "One row reduction gives all three bases. Row operations change the columns but keep every dependence relation among them, so the pivot positions in $R$ tell you **which** columns of $A$ to keep. They also keep the row space, so the rows of $R$ are fair game.",
      keyIdeas: [
        "**$C(A)$**: the **pivot columns of $A$** (the original matrix) form a basis. The pivot columns of the echelon form $R$ usually do **not** lie in $C(A)$.",
        "**$C(A^T)$**: the **nonzero rows of $R$** (any echelon form) form a basis, because row operations do not change the row space.",
        "**$N(A)$**: one vector per free variable from the explicit description of the solutions of $A\\mathbf{x} = \\mathbf{0}$.",
        "Row equivalent matrices have the **same row space** and the **same null space**, but in general **different column spaces**. Example: $\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} \\sim \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ but their column spaces are different lines.",
        "Rows of the **original** $A$ in the pivot-row positions are generally **not** a basis of the row space (row swaps can move rows around). Use the rows of $R$.",
      ],
      formulas: [
        "\\dim C(A) = \\dim C(A^T) = \\#\\text{pivots} = \\operatorname{rank}A, \\qquad \\dim N(A) = \\#\\text{free variables}",
      ],
      example: {
        problem:
          "Let $A = \\begin{bmatrix} 1 & 2 & 0 & 4 \\\\ 2 & 4 & -1 & 3 \\\\ 3 & 6 & 2 & 22 \\end{bmatrix}$. Find bases for $C(A)$, $C(A^T)$ and $N(A)$.",
        steps: [
          "$R_2 - 2R_1 = (0,0,-1,-5)$, $R_3 - 3R_1 = (0,0,2,10)$, then $R_3 + 2R_2 = \\mathbf{0}$ and $-R_2$: $R = \\begin{bmatrix} 1 & 2 & 0 & 4 \\\\ 0 & 0 & 1 & 5 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$. Pivots in columns 1 and 3.",
          "$C(A)$: pivot columns **of $A$**: $(1,2,3)$ and $(0,-1,2)$. (The pivot columns of $R$, $(1,0,0)$ and $(0,1,0)$, are not even in $C(A)$: $C(A)$ is the plane $7b_1 - 2b_2 - b_3 = 0$ and $(1,0,0)$ gives $7 \\ne 0$.)",
          "$C(A^T)$: nonzero rows of $R$: $(1,2,0,4)$ and $(0,0,1,5)$.",
          "$N(A)$: $x_1 = -2x_2 - 4x_4$, $x_3 = -5x_4$, free $x_2, x_4$: $\\mathbf{x} = x_2(-2,1,0,0) + x_4(-4,0,-5,1)$.",
          "Check: $A(-4,0,-5,1)^T = (-4+4,\\ -8+5+3,\\ -12-10+22) = \\mathbf{0}$ ✓. Dimensions: $2 + 2 = 4 = n$ ✓.",
        ],
        answer: "$C(A)$: $\\{(1,2,3), (0,-1,2)\\}$; $C(A^T)$: $\\{(1,2,0,4), (0,0,1,5)\\}$; $N(A)$: $\\{(-2,1,0,0), (-4,0,-5,1)\\}$.",
      },
      pitfalls: [
        "**The #1 trap:** basis of $C(A)$ = pivot columns of $A$, **not** of $R$.",
        "Forgetting the sign flip when solving for pivot variables: from $x_1 + 2x_2 + 4x_4 = 0$ you get $x_1 = -2x_2 - 4x_4$, so the null-space vectors carry $-2$ and $-4$.",
        "\"Row equivalent $\\Rightarrow$ same column space\" is **false**; \"same row space\" and \"same null space\" are **true**.",
      ],
      recall: [
        { q: "Which columns form a basis of $C(A)$?", a: "The pivot columns of the original matrix $A$." },
        { q: "Which rows form a basis of the row space?", a: "The nonzero rows of an echelon form of $A$." },
        { q: "Which of $N(A)$, $C(A)$, $C(A^T)$ can change under row operations?", a: "Only $C(A)$." },
      ],
    },
    {
      title: "Dimension",
      intuition:
        "Every basis of a space has the same number of vectors, so that number, the dimension, measures the number of independent directions (free parameters) in the space.",
      keyIdeas: [
        "$\\dim\\mathbb{R}^n = n$, $\\dim\\mathbb{P}_n = n + 1$, $\\dim M_{m\\times n} = mn$, $\\dim\\{\\mathbf{0}\\} = 0$. The space of all functions is infinite-dimensional.",
        "$n\\times n$ symmetric matrices: $\\dfrac{n(n+1)}{2}$ ($3\\times3$: **6**). Skew-symmetric ($A^T = -A$): $\\dfrac{n(n-1)}{2}$ ($3\\times3$: **3**). Diagonal: $n$. Upper triangular: $\\dfrac{n(n+1)}{2}$.",
        "Subspaces of $\\mathbb{R}^3$ by dimension: $0$ = the origin, $1$ = lines through $\\mathbf{0}$, $2$ = planes through $\\mathbf{0}$, $3$ = $\\mathbb{R}^3$.",
        "If $\\dim V = n$: any $n$ independent vectors form a basis, and any $n$ vectors that span $V$ form a basis (**Basis Theorem**). More than $n$ vectors are dependent; fewer than $n$ cannot span.",
        "If $H \\subseteq V$ is a subspace, $\\dim H \\le \\dim V$, and an independent set in $H$ can be **extended** to a basis of $V$.",
        "**Extending a basis to $\\mathbb{R}^n$**: put the independent vectors as rows, row reduce, and add the standard vectors $\\mathbf{e}_j$ for the non-pivot columns $j$.",
        "$\\dim\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\} = \\operatorname{rank}[\\mathbf{v}_1\\ \\cdots\\ \\mathbf{v}_p]$. E.g. $(2,-5), (-4,10), (-3,6)$ span all of $\\mathbb{R}^2$: dimension 2.",
      ],
      formulas: [
        "\\dim\\mathbb{P}_n = n+1, \\qquad \\dim M_{m\\times n} = mn, \\qquad \\dim\\{\\text{sym } n\\times n\\} = \\tfrac{n(n+1)}{2}",
      ],
      example: {
        problem:
          "Let $W = \\operatorname{Span}\\{(1,2,0,1),\\ (2,4,0,2),\\ (0,1,1,-1)\\}$. Find a basis and the dimension of $W$, and extend the basis to a basis of $\\mathbb{R}^4$.",
        steps: [
          "$(2,4,0,2) = 2(1,2,0,1)$, so drop it (Spanning Set Theorem). $(1,2,0,1)$ and $(0,1,1,-1)$ are not parallel, hence independent.",
          "Basis of $W$: $\\{(1,2,0,1), (0,1,1,-1)\\}$, so $\\dim W = 2$.",
          "As rows these are already in echelon form with pivots in columns 1 and 2. The missing pivot columns are 3 and 4, so add $\\mathbf{e}_3$ and $\\mathbf{e}_4$.",
          "Check: the matrix with rows $(1,2,0,1), (0,1,1,-1), (0,0,1,0), (0,0,0,1)$ is upper triangular with diagonal $1,1,1,1$, so its determinant is $1 \\ne 0$ ✓.",
        ],
        answer: "$\\dim W = 2$; a basis of $\\mathbb{R}^4$ is $\\{(1,2,0,1), (0,1,1,-1), \\mathbf{e}_3, \\mathbf{e}_4\\}$.",
      },
      pitfalls: [
        "$\\dim\\mathbb{P}_n = n + 1$, not $n$ (count the constant term).",
        "The number of vectors you are **given** is not the dimension. Remove the dependent ones first.",
        "A plane in $\\mathbb{R}^4$ has dimension 2 even though its vectors have 4 entries.",
      ],
      recall: [
        { q: "$\\dim$ of the $3\\times3$ symmetric matrices? Skew-symmetric?", a: "$6$ and $3$." },
        { q: "$\\dim\\mathbb{P}_4$?", a: "$5$ (basis $1, t, t^2, t^3, t^4$)." },
        { q: "You have 4 independent vectors in a 4-dimensional space. Do they span it?", a: "Yes, by the Basis Theorem they form a basis." },
      ],
    },
    {
      title: "Rank and the Rank Theorem",
      intuition:
        "Each column of $A$ either gets a pivot (a new direction in $C(A)$) or becomes a free variable (a direction in $N(A)$). So the column count $n$ splits exactly into rank plus nullity.",
      keyIdeas: [
        "$\\operatorname{rank}A = \\dim C(A) = \\dim C(A^T) = $ number of pivots. Hence $\\operatorname{rank}A^T = \\operatorname{rank}A$.",
        "**Rank Theorem**: $\\operatorname{rank}A + \\dim N(A) = n$ (columns). For $A^T$: $\\operatorname{rank}A + \\dim N(A^T) = m$ (rows).",
        "$\\operatorname{rank}A \\le \\min(m, n)$. A $6\\times4$ matrix has rank at most 4; its columns can be independent but can never span $\\mathbb{R}^6$.",
        "Rank 1: $A = \\mathbf{u}\\mathbf{v}^T$ with $\\mathbf{u}, \\mathbf{v} \\ne \\mathbf{0}$ (every row is a multiple of $\\mathbf{v}^T$). $a_{ij} = i + j$ ($n \\ge 2$): row $i$ $= i(1,\\dots,1) + (1,2,\\dots,n)$, so rank $2$. $\\operatorname{rank}(B^TB) = \\operatorname{rank}B$ because $N(B^TB) = N(B)$.",
        "**Invertible Matrix Theorem additions** ($n\\times n$ $A$): $A$ invertible $\\iff$ columns form a basis of $\\mathbb{R}^n$ $\\iff C(A) = \\mathbb{R}^n \\iff \\operatorname{rank}A = n \\iff \\dim N(A) = 0 \\iff N(A) = \\{\\mathbf{0}\\}$.",
        "Reading a complete solution $\\mathbf{x} = \\mathbf{p} + c\\mathbf{v} + d\\mathbf{w}$ of $A\\mathbf{x} = \\mathbf{b}$: $\\dim N(A) = 2$ (count the independent free directions, not $\\mathbf{p}$), so $\\operatorname{rank}A = n - 2$.",
        "If $\\operatorname{rank}A = m$ (a pivot in every row) then $A\\mathbf{x} = \\mathbf{b}$ is consistent for every $\\mathbf{b}$. E.g. 5 equations, 6 unknowns, $\\dim N(A) = 1$: rank $= 5 = m$, so always solvable.",
      ],
      formulas: [
        "\\operatorname{rank}A + \\dim N(A) = n, \\qquad \\operatorname{rank}A + \\dim N(A^T) = m",
        "\\operatorname{rank}A = \\operatorname{rank}A^T = \\dim C(A) = \\dim C(A^T)",
      ],
      example: {
        problem:
          "$A$ is $5\\times 7$ with $\\operatorname{rank}A = 3$. Find $\\dim N(A)$, $\\dim C(A^T)$, $\\operatorname{rank}A^T$ and $\\dim N(A^T)$. Is $A\\mathbf{x} = \\mathbf{b}$ consistent for every $\\mathbf{b}\\in\\mathbb{R}^5$?",
        steps: [
          "Rank Theorem with $n = 7$ columns: $\\dim N(A) = 7 - 3 = 4$.",
          "$\\dim C(A^T) = \\operatorname{rank}A = 3$ and $\\operatorname{rank}A^T = 3$.",
          "$A^T$ is $7\\times5$ with rank 3, so $\\dim N(A^T) = 5 - 3 = 2$.",
          "$C(A)$ is a 3-dimensional subspace of $\\mathbb{R}^5$, not all of $\\mathbb{R}^5$, so some $\\mathbf{b}$ make the system inconsistent.",
        ],
        answer: "$\\dim N(A) = 4$, $\\dim C(A^T) = 3$, $\\operatorname{rank}A^T = 3$, $\\dim N(A^T) = 2$; no.",
      },
      pitfalls: [
        "The Rank Theorem uses $n$ = number of **columns**. For $N(A^T)$ use $m$ = number of rows.",
        "\"$\\dim N(A) = 3$ for an $8\\times10$ matrix\" gives rank $7 < 8$, so $A\\mathbf{x} = \\mathbf{b}$ is **not** always solvable.",
        "Rank can never exceed the smaller dimension: a $3\\times 8$ matrix has rank $\\le 3$, so $\\dim N(A) \\ge 5$.",
      ],
      recall: [
        { q: "State the Rank Theorem.", a: "$\\operatorname{rank}A + \\dim N(A) = n$, the number of columns." },
        { q: "Rank of an $n\\times n$ ($n\\ge 2$) matrix with $a_{ij} = i + j$?", a: "Always $2$." },
        { q: "$A$ is $n\\times n$ with $N(A) = \\{\\mathbf{0}\\}$. What is its rank? Is it invertible?", a: "Rank $n$; yes, by the Invertible Matrix Theorem." },
      ],
    },
    {
      title: "Coordinates and change of basis",
      intuition:
        "A basis is a coordinate grid. $[\\mathbf{x}]_{\\mathcal{B}}$ records how many steps along each basis vector reach $\\mathbf{x}$. Change the grid and the same vector gets new coordinates, related by one invertible matrix.",
      visuals: ["coordinates-grid"],
      keyIdeas: [
        "If $\\mathcal{B} = \\{\\mathbf{b}_1,\\dots,\\mathbf{b}_n\\}$ is a basis, each $\\mathbf{x}$ has a **unique** representation $\\mathbf{x} = c_1\\mathbf{b}_1 + \\dots + c_n\\mathbf{b}_n$, and $[\\mathbf{x}]_{\\mathcal{B}} = (c_1,\\dots,c_n)$.",
        "In $\\mathbb{R}^n$: $P_{\\mathcal{B}} = [\\mathbf{b}_1\\ \\cdots\\ \\mathbf{b}_n]$ gives $\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$, so $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$.",
        "In $\\mathbb{P}_n$ w.r.t. $\\{1, t, \\dots, t^n\\}$, the coordinates are just the coefficients: $[3 + 2t - t^2] = (3, 2, -1)$.",
        "The **coordinate mapping** $\\mathbf{x} \\mapsto [\\mathbf{x}]_{\\mathcal{B}}$ is a one-to-one linear map of $V$ onto $\\mathbb{R}^n$ (an isomorphism). So questions about independence, span or dimension in $\\mathbb{P}_n$ or $M_{m\\times n}$ become questions about columns in $\\mathbb{R}^n$.",
        "**Change of basis**: $P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = \\big[\\,[\\mathbf{b}_1]_{\\mathcal{C}}\\ \\cdots\\ [\\mathbf{b}_n]_{\\mathcal{C}}\\,\\big]$ satisfies $[\\mathbf{x}]_{\\mathcal{C}} = P_{\\mathcal{C}\\leftarrow\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$, and $(P_{\\mathcal{C}\\leftarrow\\mathcal{B}})^{-1} = P_{\\mathcal{B}\\leftarrow\\mathcal{C}}$.",
        "If $\\mathbf{a}_1 = 4\\mathbf{b}_1 - \\mathbf{b}_2$, the vector $(4, -1, 0)$ is the **first column** of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$, not the first row.",
        "In $\\mathbb{R}^n$: $P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = P_{\\mathcal{C}}^{-1}P_{\\mathcal{B}}$, found by row reducing $[\\,\\mathbf{c}_1 \\cdots \\mathbf{c}_n \\mid \\mathbf{b}_1 \\cdots \\mathbf{b}_n\\,] \\sim [\\,I \\mid P_{\\mathcal{C}\\leftarrow\\mathcal{B}}\\,]$.",
      ],
      formulas: [
        "\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}, \\qquad [\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}",
        "[\\mathbf{x}]_{\\mathcal{C}} = P_{\\mathcal{C}\\leftarrow\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}, \\qquad P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = \\big[\\,[\\mathbf{b}_1]_{\\mathcal{C}}\\ \\cdots\\ [\\mathbf{b}_n]_{\\mathcal{C}}\\,\\big]",
      ],
      example: {
        problem:
          "(a) $\\mathcal{B} = \\{(3,1), (5,2)\\}$. Find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = (4,1)$. (b) $\\mathcal{A}, \\mathcal{B}$ are bases of $V$ with $\\mathbf{a}_1 = 2\\mathbf{b}_1 + \\mathbf{b}_2$, $\\mathbf{a}_2 = \\mathbf{b}_1 - \\mathbf{b}_2$. Find $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$ and $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = \\mathbf{a}_1 + 3\\mathbf{a}_2$.",
        steps: [
          "(a) $P_{\\mathcal{B}} = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$, $\\det = 1$, $P_{\\mathcal{B}}^{-1} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}$.",
          "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}(4,1) = (8 - 5,\\ -4 + 3) = (3, -1)$. Check: $3(3,1) - (5,2) = (4,1)$ ✓.",
          "(b) Columns are $\\mathcal{B}$-coordinates of the $\\mathbf{a}_j$: $P_{\\mathcal{B}\\leftarrow\\mathcal{A}} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}$.",
          "$[\\mathbf{x}]_{\\mathcal{A}} = (1, 3)$, so $[\\mathbf{x}]_{\\mathcal{B}} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} = (5, -2)$.",
          "Check by substitution: $(2\\mathbf{b}_1 + \\mathbf{b}_2) + 3(\\mathbf{b}_1 - \\mathbf{b}_2) = 5\\mathbf{b}_1 - 2\\mathbf{b}_2$ ✓.",
        ],
        answer: "(a) $[\\mathbf{x}]_{\\mathcal{B}} = (3, -1)$. (b) $P_{\\mathcal{B}\\leftarrow\\mathcal{A}} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}$, $[\\mathbf{x}]_{\\mathcal{B}} = (5,-2)$.",
      },
      pitfalls: [
        "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$, not $P_{\\mathcal{B}}\\mathbf{x}$. $P_{\\mathcal{B}}$ goes **from** $\\mathcal{B}$-coordinates **to** standard coordinates.",
        "Coefficients of $\\mathbf{a}_j$ go in **columns** of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$. Writing them as rows gives the transpose, the most common wrong option.",
        "The order of the basis matters: reordering $\\mathcal{B}$ reorders $[\\mathbf{x}]_{\\mathcal{B}}$.",
        "$P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$ and $P_{\\mathcal{B}\\leftarrow\\mathcal{C}}$ are inverses, not transposes.",
      ],
      recall: [
        { q: "How do you compute $[\\mathbf{x}]_{\\mathcal{B}}$ in $\\mathbb{R}^n$?", a: "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$, i.e. solve $P_{\\mathcal{B}}\\mathbf{c} = \\mathbf{x}$." },
        { q: "What are the columns of $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$?", a: "The $\\mathcal{C}$-coordinate vectors of $\\mathbf{b}_1, \\dots, \\mathbf{b}_n$." },
        { q: "Why can independence in $\\mathbb{P}_2$ be tested with vectors in $\\mathbb{R}^3$?", a: "The coordinate map w.r.t. $\\{1, t, t^2\\}$ is a one-to-one linear map onto $\\mathbb{R}^3$, so it preserves dependence relations." },
      ],
    },
  ],
  playbook: [
    "If you see \"is this set a subspace?\" → test $\\mathbf{0}$ first, then look for a union (\"or\"), an inequality, a constant term, or a nonlinear term; each gives a quick counterexample. Homogeneous linear equations or a span → yes.",
    "If you see $\\{(\\ldots r\\ldots, \\ldots s\\ldots, \\ldots t\\ldots)\\}$ and \"find $A$ with this column space\" → the coefficient vectors of $r, s, t$ are the columns of $A$.",
    "If you see \"for which $\\mathbf{b}$ (or $p$) is $A\\mathbf{x} = \\mathbf{b}$ consistent?\" → row reduce $[A \\mid \\mathbf{b}]$; the zero rows of $A$ give the conditions for $\\mathbf{b} \\in C(A)$.",
    "If you see \"basis for $C(A)$\" → pivot columns of the **original** $A$. \"Basis for the row space\" → nonzero rows of $R$. \"Basis for $N(A)$\" → one vector per free variable, with the sign flip.",
    "If you see \"row equivalent matrices have the same …\" → row space and null space: yes; column space: no.",
    "If you see a dependence relation $c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + c_3\\mathbf{v}_3 = \\mathbf{0}$ → remove any vector with a **nonzero** coefficient to get a basis of the span.",
    "If you see polynomials or matrices and \"independent / basis / dimension\" → convert to coordinate vectors w.r.t. the standard basis and row reduce.",
    "If you see $\\dim$ of a matrix space → count free entries: $M_{m\\times n}$: $mn$; symmetric: $n(n+1)/2$; skew: $n(n-1)/2$; $\\mathbb{P}_n$: $n+1$.",
    "If you see the shape $m\\times n$ and the rank $r$ → $\\dim N(A) = n - r$, $\\dim C(A^T) = r$, $\\dim N(A^T) = m - r$, and $r \\le \\min(m,n)$.",
    "If you see a complete solution $\\mathbf{p} + c\\mathbf{v} + d\\mathbf{w}$ → $\\dim N(A)$ = number of independent free vectors, then $\\operatorname{rank}A = n - \\dim N(A)$.",
    "If you see $a_{ij} = i + j$, $\\mathbf{u}\\mathbf{v}^T$ or $B^TB$ → rank $2$, rank $1$, and $\\operatorname{rank}B$ respectively.",
    "If you see $AB = 0$ → $C(B) \\subseteq N(A)$, so $\\operatorname{rank}B \\le \\dim N(A) = n - \\operatorname{rank}A$.",
    "If you see $[\\mathbf{x}]_{\\mathcal{B}}$ in $\\mathbb{R}^n$ → solve $P_{\\mathcal{B}}\\mathbf{c} = \\mathbf{x}$ (or use $P_{\\mathcal{B}}^{-1}$) and check by recombining.",
    "If you see relations $\\mathbf{a}_j = \\sum b$'s → their coefficients form the **columns** of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$; then $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}\\leftarrow\\mathcal{A}}[\\mathbf{x}]_{\\mathcal{A}}$.",
  ],
};
