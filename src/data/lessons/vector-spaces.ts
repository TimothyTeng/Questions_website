import type { Lesson } from "@/lib/types";

export const vectorSpacesLesson: Lesson = {
  topic: "vector-spaces",
  bigPicture:
    "A vector space is a set of objects (arrows in $\\mathbb{R}^n$, polynomials in $\\mathbb{P}_n$, matrices, functions) that you can add and multiply by scalars, subject to ten axioms. **Subspaces** are subsets that are vector spaces in their own right, recognised with a three-part test. Every $m\\times n$ matrix gives three of them: the **null space** $N(A)$ (solutions of $A\\mathbf{x} = \\mathbf{0}$), the **column space** $C(A)$ (the $\\mathbf{b}$'s that make $A\\mathbf{x} = \\mathbf{b}$ consistent) and the **row space** $C(A^T)$. A **basis** is a linearly independent spanning set; the number of vectors in it is the **dimension**. Row reduction gives bases for $N(A)$, $C(A)$ and $C(A^T)$ at once, and the **Rank Theorem** $\\text{rank of } A + \\dim N(A) = n$ ties them together. Finally, a basis turns every vector into a column of numbers, its **coordinate vector** $[\\mathbf{x}]_{\\mathcal{B}}$, and the matrix $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$ converts $\\mathcal{B}$-coordinates into $\\mathcal{C}$-coordinates.",
  sections: [
    {
      title: "Vector spaces and subspaces",
      intuition:
        "A subspace is a set you can never leave by adding two of its vectors or by scaling one of them, and it must contain $\\mathbf{0}$. Lines and planes through the origin qualify; a plane shifted away from the origin, a union of two planes, a half-space or a ball does not.",
      visuals: ["subspace-test"],
      refs: [
        "Slides 4.1 Vector spaces (vsp p5–11)",
        "Slides 4.2 Subspaces (vsp p12–14)",
        "Slides 4.3 Subspace spanned by a set, Theorem 4.1 (vsp p15–16)",
        "Tutorial 4 Q1–Q4",
        "PYP AY25/26 S2 Q7; older PYP T/F (union of the axes and the lines y = ±x)",
        "Additional practice problems (half-space, ball)",
      ],
      keyIdeas: [
        "A **vector space** is a nonempty set $V$ of objects (vectors) with two operations, addition and multiplication by scalars, satisfying **ten axioms** for all $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}$ in $V$ and scalars $c, d$: (1) $\\mathbf{u} + \\mathbf{v}$ is in $V$; (2) $\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}$; (3) $(\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})$; (4) there is a zero vector with $\\mathbf{u} + \\mathbf{0} = \\mathbf{u}$; (5) each $\\mathbf{u}$ has a $-\\mathbf{u}$ with $\\mathbf{u} + (-\\mathbf{u}) = \\mathbf{0}$; (6) $c\\mathbf{u}$ is in $V$; (7) $c(\\mathbf{u} + \\mathbf{v}) = c\\mathbf{u} + c\\mathbf{v}$; (8) $(c + d)\\mathbf{u} = c\\mathbf{u} + d\\mathbf{u}$; (9) $c(d\\mathbf{u}) = (cd)\\mathbf{u}$; (10) $1\\mathbf{u} = \\mathbf{u}$.",
        "From the axioms: $0\\mathbf{u} = \\mathbf{0}$, $c\\mathbf{0} = \\mathbf{0}$ and $-\\mathbf{u} = (-1)\\mathbf{u}$.",
        "**Examples:** $\\mathbb{R}^n$; the doubly infinite sequences $\\mathbb{S}$; $\\mathbb{P}_n$, the polynomials of degree **up to** $n$ (zero vector: the zero polynomial; negative of $\\mathbf{p}$: $(-1)\\mathbf{p}$); the real-valued functions on a set $\\mathbb{D}$, with $(\\mathbf{f} + \\mathbf{g})(t) = \\mathbf{f}(t) + \\mathbf{g}(t)$ and $(c\\mathbf{f})(t) = c\\mathbf{f}(t)$ (zero vector: the function $\\mathbf{f}(t) = 0$); the $3\\times3$ matrices $M_{3\\times3}$.",
        "**Subspace** $H$ of $V$: (a) the zero vector of $V$ is in $H$; (b) $H$ is closed under vector addition; (c) $H$ is closed under scalar multiplication. A subspace is itself a vector space: axioms 1, 4 and 6 are (a)–(c), axioms 2, 3, 7–10 hold automatically, and axiom 5 follows from (c) with $c = -1$.",
        "**Subspaces you meet:** the zero subspace $\\{\\mathbf{0}\\}$; $\\mathbb{P}_n$ inside $\\mathbb{P}$; the set of solutions of a **homogeneous** system $A\\mathbf{x} = \\mathbf{0}$; any $\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ (**Theorem 4.1**); the $3\\times3$ symmetric matrices in $M_{3\\times3}$ ($(A + B)^T = A + B$, $(cA)^T = cA$); the intersection $H\\cap K$ of two subspaces.",
        "To show a set is a subspace, write it as a span (e.g. $(a - 3b, b - a, a, b) = a(1,-1,1,0) + b(-3,1,0,1)$) or as the solutions of a homogeneous system, or check (a)–(c) directly.",
        "**Not subspaces:** a plane or line **not** through the origin (no $\\mathbf{0}$); $\\{z = 0 \\text{ or } y = 0\\}$ and the union of lines through $\\mathbf{0}$ (not closed under addition); the half-space $x_1 + x_2 + x_3 \\ge 0$ (not closed under multiplication by $-1$); the ball $x_1^2 + x_2^2 + x_3^2 \\le 1$ (not closed under scalar multiplication).",
        "$\\mathbb{R}^2$ is **not** a subspace of $\\mathbb{R}^3$ (its vectors have only 2 entries), but $H = \\{(s, t, 0)\\}$ is a subspace of $\\mathbb{R}^3$.",
      ],
      formulas: [
        "H \\text{ subspace} \\iff \\mathbf{0}\\in H,\\quad \\mathbf{u}+\\mathbf{v}\\in H,\\quad c\\mathbf{u}\\in H",
        "\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\} = \\{c_1\\mathbf{v}_1 + \\dots + c_p\\mathbf{v}_p\\} \\text{ is a subspace (Theorem 4.1)}",
      ],
      example: {
        problem:
          "Which are subspaces of $\\mathbb{R}^3$? $U = \\{(x,y,z) : z = 0 \\text{ or } y = 0\\}$, $W = \\{(x,y,z) : x - 2y + z = 0\\}$, $P = \\{(x,y,z) : x + y - 2z = 4\\}$.",
        steps: [
          "$U$: contains $\\mathbf{0}$ and is closed under scaling, but $(1,1,0) \\in U$ (since $z = 0$) and $(0,0,1) \\in U$ (since $y = 0$) add to $(1,1,1)$, which has $y \\ne 0$ and $z \\ne 0$. Not closed under $+$, so **not** a subspace.",
          "$W$: it is the set of solutions of the homogeneous equation $x - 2y + z = 0$, i.e. $N\\big([\\,1\\ \\ {-2}\\ \\ 1\\,]\\big)$, so it is a subspace (Theorem 4.2). Directly: $\\mathbf{0}$ satisfies the equation, and if $\\mathbf{u}, \\mathbf{v}$ do, so do $\\mathbf{u} + \\mathbf{v}$ (add the equations) and $c\\mathbf{u}$ (multiply by $c$).",
          "$P$: $(0,0,0)$ gives $0 \\ne 4$, so $\\mathbf{0}\\notin P$: **not** a subspace. (As in Tutorial 4 Q2: $(4,0,0)$ and $(0,4,0)$ are in $P$, but their sum $(4,4,0)$ gives $8 \\ne 4$.)",
          "The parallel plane through the origin, $x + y - 2z = 0$, **is** a subspace.",
        ],
        answer: "Only $W$ is a subspace.",
      },
      pitfalls: [
        "Checking only that $\\mathbf{0}$ is in the set is not enough: $\\{z = 0 \\text{ or } y = 0\\}$ and $\\{x_1+x_2+x_3 \\ge 0\\}$ both contain $\\mathbf{0}$ and still fail.",
        "To show a set is **not** a subspace, one concrete counterexample is enough. To show it **is**, check all three conditions for arbitrary vectors and scalars.",
        "The half-space is closed under addition and under **positive** scaling. The failure is the scalar $-1$, which is easy to miss.",
        "$\\mathbb{P}_n$ means degree **up to** $n$. The polynomials of degree exactly $n$ do not contain the zero polynomial.",
      ],
      recall: [
        { q: "What are the three properties of a subspace?", a: "Contains the zero vector; closed under vector addition; closed under scalar multiplication." },
        { q: "Why is the ball $x_1^2 + x_2^2 + x_3^2 \\le 1$ not a subspace of $\\mathbb{R}^3$?", a: "Not closed under scalar multiplication: $(1,0,0)$ is in it but $2(1,0,0)$ is not." },
        { q: "Is the intersection of two subspaces a subspace? The union?", a: "The intersection always is (Tutorial 4 Q3). The union in general is not, e.g. the $x$-axis together with the $y$-axis." },
      ],
    },
    {
      title: "Null space and column space",
      intuition:
        "Every matrix answers two questions. Which $\\mathbf{x}$ does $A$ send to $\\mathbf{0}$? That is $N(A)$, living in $\\mathbb{R}^n$. Which $\\mathbf{b}$ can $A\\mathbf{x}$ reach? That is $C(A)$, living in $\\mathbb{R}^m$.",
      visuals: ["column-space-3d"],
      refs: [
        "Slides 4.4 The null space of a matrix, Theorem 4.2 (vsp p17–22)",
        "Slides 4.5 The column space of a matrix, Theorem 4.3 and the N(A)/C(A) table (vsp p23–26)",
        "Slides 4.6 Kernel and range: T(x) = Ax gives kernel N(A), range C(A) (vsp p27–28)",
        "Tutorial 4 Q4, Q5, Q6",
        "PYP fill-ins: N(Aᵀ) ⊆ Rᵐ, AB = 0 ⇒ C(B) ⊆ N(A), consistent b = column space; PYP AY24/25 S2 Q7 (A = xrᵀ); older PYP (p for which Ax = [3, 9, p] is consistent)",
      ],
      keyIdeas: [
        "For an $m\\times n$ matrix $A$: $N(A) = \\{\\mathbf{x} \\text{ in } \\mathbb{R}^n : A\\mathbf{x} = \\mathbf{0}\\}$ is a subspace of $\\mathbb{R}^n$ (**Theorem 4.2**). It is defined **implicitly**: you are given only the condition $A\\mathbf{x} = \\mathbf{0}$. To test a given $\\mathbf{v}$, just compute $A\\mathbf{v}$.",
        "$C(A) = \\operatorname{Span}\\{\\mathbf{a}_1,\\dots,\\mathbf{a}_n\\} = \\{\\mathbf{b} : \\mathbf{b} = A\\mathbf{x} \\text{ for some } \\mathbf{x}\\}$ is a subspace of $\\mathbb{R}^m$ (**Theorem 4.3**). It is defined **explicitly**: every column of $A$ is in $C(A)$. To test a given $\\mathbf{v}$, row reduce $[\\,A\\ \\ \\mathbf{v}\\,]$.",
        "**$A\\mathbf{x} = \\mathbf{b}$ is consistent exactly when $\\mathbf{b}$ is in $C(A)$.** $C(A) = \\mathbb{R}^m$ iff $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}$ in $\\mathbb{R}^m$; $N(A) = \\{\\mathbf{0}\\}$ iff $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.",
        "**Spanning set for $N(A)$:** row reduce $[\\,A\\ \\ \\mathbf{0}\\,]$ to reduced echelon form, write the general solution in terms of the free variables, and decompose it into a linear combination of vectors whose weights are the free variables.",
        "**Finding $A$ with a given set as $C(A)$:** write the set as $\\{r\\mathbf{u} + s\\mathbf{v} + t\\mathbf{w}\\}$; the vectors multiplying the parameters are the columns of $A$ (Tutorial 4 Q5).",
        "For $T(\\mathbf{x}) = A\\mathbf{x}$: kernel of $T$ $= N(A)$ and range of $T$ $= C(A)$.",
        "$N(A^T)$ is a subspace of $\\mathbb{R}^m$. If $AB = 0$, then $A\\mathbf{b}_j = \\mathbf{0}$ for every column of $B$, so $C(B) \\subseteq N(A)$. For nonzero $\\mathbf{x}, \\mathbf{r}$ and $A = \\mathbf{x}\\mathbf{r}^T$: $C(A) = \\operatorname{Span}\\{\\mathbf{x}\\}$ and the row space is $\\operatorname{Span}\\{\\mathbf{r}\\}$.",
      ],
      formulas: [
        "N(A) = \\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\} \\subseteq \\mathbb{R}^n, \\qquad C(A) = \\{A\\mathbf{x} : \\mathbf{x}\\in\\mathbb{R}^n\\} \\subseteq \\mathbb{R}^m",
      ],
      example: {
        problem:
          "Let $A = \\begin{bmatrix} 1 & 2 & -1 \\\\ 2 & 5 & 0 \\\\ -1 & -1 & 3 \\end{bmatrix}$. Find a spanning set for $N(A)$, the condition for $\\mathbf{b}$ to be in $C(A)$, and decide whether $\\mathbf{b} = (1, 4, 1)$ is in $C(A)$.",
        steps: [
          "Row reduce $[\\,A\\ \\ \\mathbf{b}\\,]$: $R_2 - 2R_1$ gives $(0, 1, 2 \\mid b_2 - 2b_1)$; $R_3 + R_1$ gives $(0, 1, 2 \\mid b_3 + b_1)$; then $R_3 - R_2$ gives $(0, 0, 0 \\mid 3b_1 - b_2 + b_3)$.",
          "So $A\\mathbf{x} = \\mathbf{b}$ is consistent, i.e. $\\mathbf{b}\\in C(A)$, exactly when $3b_1 - b_2 + b_3 = 0$. Check with column 1: $3 - 2 - 1 = 0$ ✓.",
          "For $\\mathbf{b} = (1,4,1)$: $3 - 4 + 1 = 0$, so $\\mathbf{b} \\in C(A)$.",
          "For $N(A)$ take $\\mathbf{b} = \\mathbf{0}$ and continue to reduced echelon form: $\\begin{bmatrix} 1 & 0 & -5 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 0 \\end{bmatrix}$, so $x_1 = 5x_3$, $x_2 = -2x_3$, $x_3$ free.",
          "$\\mathbf{x} = x_3(5, -2, 1)$, so $\\{(5,-2,1)\\}$ spans $N(A)$. Check: $A(5,-2,1)^T = (5-4-1,\\ 10-10,\\ -5+2+3) = \\mathbf{0}$ ✓.",
        ],
        answer: "$N(A) = \\operatorname{Span}\\{(5,-2,1)\\}$; $\\mathbf{b}\\in C(A) \\iff 3b_1 - b_2 + b_3 = 0$; $(1,4,1) \\in C(A)$.",
      },
      pitfalls: [
        "$N(A)$ lives in $\\mathbb{R}^n$ (number of **columns**) and $C(A)$ in $\\mathbb{R}^m$ (number of **rows**). A $3\\times 5$ matrix has $N(A)\\subseteq\\mathbb{R}^5$ and $C(A)\\subseteq\\mathbb{R}^3$.",
        "The solution set of $A\\mathbf{x} = \\mathbf{b}$ with $\\mathbf{b}\\ne\\mathbf{0}$ is **not** a subspace: it does not contain $\\mathbf{0}$.",
        "$AB = 0$ gives $C(B)\\subseteq N(A)$, not $C(A)\\subseteq N(B)$.",
      ],
      recall: [
        { q: "$A$ is $4\\times 7$. In which $\\mathbb{R}^k$ do $N(A)$, $C(A)$ and $N(A^T)$ live?", a: "$N(A) \\subseteq \\mathbb{R}^7$; $C(A), N(A^T) \\subseteq \\mathbb{R}^4$." },
        { q: "When is $A\\mathbf{x} = \\mathbf{b}$ consistent, in subspace language?", a: "Exactly when $\\mathbf{b}$ is in $C(A)$." },
        { q: "If $AB = 0$, how are $C(B)$ and $N(A)$ related?", a: "$C(B) \\subseteq N(A)$, because $A$ sends every column of $B$ to $\\mathbf{0}$." },
      ],
    },
    {
      title: "Linear independence, bases and the Spanning Set Theorem",
      intuition:
        "A basis is a spanning set with all redundancy removed: enough vectors to build everything in the space, and none that can be built from the others.",
      refs: [
        "Slides 4.7 Bases: linear independence, Theorem 4.4, basis, standard bases (vsp p29–35)",
        "Slides 4.8 The Spanning Set Theorem, Theorem 4.5 (vsp p36–37)",
        "Tutorial 4 Q7, Q8, Q9",
        "PYP AY25/26 S2 Q8; PYP AY25/26 S1 Q9; older PYP (coordinates in P2 and basis of the span)",
      ],
      keyIdeas: [
        "$\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ is **linearly independent** if $x_1\\mathbf{v}_1 + \\dots + x_p\\mathbf{v}_p = \\mathbf{0}$ has only the trivial solution. It is **linearly dependent** if there are weights $c_1,\\dots,c_p$, not all zero, with $c_1\\mathbf{v}_1 + \\dots + c_p\\mathbf{v}_p = \\mathbf{0}$ (a **linear dependence relation**).",
        "One vector: independent iff $\\mathbf{v}\\ne\\mathbf{0}$. Two vectors: dependent iff one is a multiple of the other. Any set containing $\\mathbf{0}$ is dependent. More than $n$ vectors in $\\mathbb{R}^n$ are dependent.",
        "**Theorem 4.4:** $\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ with $\\mathbf{v}_1 \\ne \\mathbf{0}$ is dependent iff some $\\mathbf{v}_j$ ($j > 1$) is a linear combination of the preceding vectors.",
        "The same definitions work for polynomials: $\\mathbf{p}_1(t) = 1$, $\\mathbf{p}_2(t) = t$, $\\mathbf{p}_3(t) = 4 - t$ are dependent ($\\mathbf{p}_3 = 4\\mathbf{p}_1 - \\mathbf{p}_2$), and $1 + t$, $1 - t$, $2$ satisfy $\\mathbf{p}_1 + \\mathbf{p}_2 - \\mathbf{p}_3 = \\mathbf{0}$.",
        "A **basis** $\\mathcal{B} = \\{\\mathbf{b}_1,\\dots,\\mathbf{b}_p\\}$ for $H$ is (i) linearly independent and (ii) spans $H$. Standard bases: $\\{\\mathbf{e}_1,\\dots,\\mathbf{e}_n\\}$ for $\\mathbb{R}^n$ and $\\{1, t, \\dots, t^n\\}$ for $\\mathbb{P}_n$. The columns of an invertible $n\\times n$ matrix form a basis for $\\mathbb{R}^n$ (Theorem 2.4).",
        "**Spanning Set Theorem (Theorem 4.5):** if some $\\mathbf{v}_k$ in $S$ is a linear combination of the others, removing it leaves a set that still spans $H = \\operatorname{Span} S$; if $H \\ne \\{\\mathbf{0}\\}$, some subset of $S$ is a basis for $H$.",
        "Given $4\\mathbf{v}_1 + 5\\mathbf{v}_2 - 3\\mathbf{v}_3 = \\mathbf{0}$ (all weights nonzero, no two vectors parallel), each vector is a combination of the other two, so any two of them form a basis for $\\operatorname{Span}\\{\\mathbf{v}_1,\\mathbf{v}_2,\\mathbf{v}_3\\}$ (Tutorial 4 Q8).",
        "**Basis of a plane through $\\mathbf{0}$**, e.g. $x + 2y + z = 0$: solve for one variable, $x = -2y - z$, so $(x,y,z) = y(-2,1,0) + z(-1,0,1)$ and $\\{(-2,1,0), (-1,0,1)\\}$ is a basis (Tutorial 4 Q7).",
      ],
      formulas: [
        "x_1\\mathbf{v}_1 + \\dots + x_p\\mathbf{v}_p = \\mathbf{0} \\text{ has only the trivial solution} \\iff \\text{linearly independent}",
      ],
      example: {
        problem:
          "In $\\mathbb{P}_2$, are $\\mathbf{p}_1 = 1 + t^2$, $\\mathbf{p}_2 = t + t^2$, $\\mathbf{p}_3 = 1 + 2t + 3t^2$ linearly independent? Find a basis for $H = \\operatorname{Span}\\{\\mathbf{p}_1,\\mathbf{p}_2,\\mathbf{p}_3\\}$.",
        steps: [
          "Coordinates w.r.t. $\\{1, t, t^2\\}$: $(1,0,1)$, $(0,1,1)$, $(1,2,3)$. The polynomials are dependent exactly when these coordinate vectors are (the coordinate mapping keeps linear combinations).",
          "Row reduce $\\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 2 \\\\ 1 & 1 & 3 \\end{bmatrix}$ (coordinate vectors as columns): $R_3 - R_1 - R_2 = (0,0,0)$, so only 2 pivots. Dependent.",
          "The reduced matrix shows column 3 $= 1\\cdot$column 1 $+ 2\\cdot$column 2, i.e. $\\mathbf{p}_3 = \\mathbf{p}_1 + 2\\mathbf{p}_2$. Check: $(1 + t^2) + 2(t + t^2) = 1 + 2t + 3t^2$ ✓.",
          "By the Spanning Set Theorem drop $\\mathbf{p}_3$; $\\mathbf{p}_1, \\mathbf{p}_2$ are not multiples of each other, so they are independent.",
        ],
        answer: "Dependent ($\\mathbf{p}_3 = \\mathbf{p}_1 + 2\\mathbf{p}_2$); a basis for $H$ is $\\{1 + t^2,\\ t + t^2\\}$.",
      },
      pitfalls: [
        "With three or more vectors, \"no two are multiples of each other\" does **not** mean independent: $(1,0), (0,1), (1,1)$ are dependent.",
        "A spanning set may contain redundant vectors; a basis may not. \"Spans $H$\" alone does not make a set a basis.",
        "Given a dependence relation, you may only remove a vector whose weight is **nonzero**. If $2\\mathbf{v}_1 - \\mathbf{v}_2 + 0\\mathbf{v}_3 = \\mathbf{0}$, then $\\mathbf{v}_3$ is not a combination of the others, and $\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$ is dependent.",
        "The normal vector of a plane $ax + by + cz = 0$ is **not** in the plane; it is never part of a basis for it.",
      ],
      recall: [
        { q: "What is a basis for $H$?", a: "A linearly independent set that spans $H$." },
        { q: "What does the Spanning Set Theorem allow you to do?", a: "Remove a vector that is a linear combination of the others without changing the span; some subset of the spanning set is a basis." },
        { q: "How do you test polynomials in $\\mathbb{P}_n$ for independence?", a: "Write each as its coordinate vector w.r.t. $\\{1, t, \\dots, t^n\\}$ and row reduce those vectors." },
      ],
    },
    {
      title: "Bases for $N(A)$, $C(A)$ and $C(A^T)$",
      intuition:
        "One row reduction gives all three bases. Row operations change the columns but keep every dependence relation among them, so the pivot positions tell you **which** columns of $A$ to keep. They do not change the row space, so the nonzero rows of the echelon form can be used directly.",
      refs: [
        "Slides 4.9 Bases for N(A) and C(A), Theorem 4.6, Exercises 4.9.1–4.9.2 (vsp p38–43)",
        "Slides 4.13 The row space, Theorem 4.7, Exercise 4.13.1 (vsp p58–61)",
        "Older PYP: dims & bases of C(A), N(A), C(Aᵀ); basis of the row space; T/F row equivalent ⇒ same column space (F)",
      ],
      keyIdeas: [
        "**$N(A)$:** the spanning-set method (one vector per free variable) gives vectors that are linearly independent, so it produces a **basis** for $N(A)$ when $N(A)$ contains nonzero vectors.",
        "If $A$ is row reduced to $B$, then $A\\mathbf{x} = \\mathbf{0}$ and $B\\mathbf{x} = \\mathbf{0}$ have exactly the same solutions, so the columns of $A$ have **exactly the same linear dependence relationships** as the columns of $B$.",
        "**Theorem 4.6:** the **pivot columns of $A$** form a basis for $C(A)$. Use the columns of the original $A$, not of the echelon form: row operations can change the column space.",
        "**Row space** $C(A^T)$: all linear combinations of the rows of $A$, a subspace of $\\mathbb{R}^n$.",
        "**Theorem 4.7:** row equivalent matrices have the same row space. If $B$ is in echelon form, the nonzero rows of $B$ form a basis for the row space of $A$ (and of $B$).",
        "So row equivalent matrices have the same row space and the same null space, but in general **not** the same column space.",
      ],
      formulas: [
        "\\dim C(A) = \\#\\text{pivot columns}, \\qquad \\dim N(A) = \\#\\text{free variables}",
      ],
      example: {
        problem:
          "Let $A = \\begin{bmatrix} 1 & 2 & 0 & 4 \\\\ 2 & 4 & -1 & 3 \\\\ 3 & 6 & 2 & 22 \\end{bmatrix}$. Find bases for $C(A)$, $C(A^T)$ and $N(A)$.",
        steps: [
          "$R_2 - 2R_1 = (0,0,-1,-5)$, $R_3 - 3R_1 = (0,0,2,10)$, then $R_3 + 2R_2 = \\mathbf{0}$ and $-R_2$: $B = \\begin{bmatrix} 1 & 2 & 0 & 4 \\\\ 0 & 0 & 1 & 5 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}$. Pivots in columns 1 and 3.",
          "$C(A)$: columns 1 and 3 **of $A$**: $(1,2,3)$ and $(0,-1,2)$. (Not the columns $(1,0,0)$, $(0,1,0)$ of $B$.)",
          "$C(A^T)$: nonzero rows of $B$ (Theorem 4.7): $(1,2,0,4)$ and $(0,0,1,5)$.",
          "$N(A)$: $x_1 = -2x_2 - 4x_4$, $x_3 = -5x_4$, free $x_2, x_4$: $\\mathbf{x} = x_2(-2,1,0,0) + x_4(-4,0,-5,1)$.",
          "Check: $A(-4,0,-5,1)^T = (-4+4,\\ -8+5+3,\\ -12-10+22) = \\mathbf{0}$ ✓.",
        ],
        answer: "$C(A)$: $\\{(1,2,3), (0,-1,2)\\}$; $C(A^T)$: $\\{(1,2,0,4), (0,0,1,5)\\}$; $N(A)$: $\\{(-2,1,0,0), (-4,0,-5,1)\\}$.",
      },
      pitfalls: [
        "**The #1 trap:** a basis for $C(A)$ is the pivot columns of $A$, **not** of the echelon form (\"columns 1, 2 and 4 of $A$ (not $B$!)\").",
        "Forgetting the sign flip when solving for pivot variables: from $x_1 + 2x_2 + 4x_4 = 0$ you get $x_1 = -2x_2 - 4x_4$, so the null-space vectors carry $-2$ and $-4$.",
        "\"Row equivalent $\\Rightarrow$ same column space\" is **false**; \"same row space\" (Theorem 4.7) and \"same null space\" are **true**.",
      ],
      recall: [
        { q: "Which columns form a basis for $C(A)$?", a: "The pivot columns of the original matrix $A$ (Theorem 4.6)." },
        { q: "Which rows form a basis for the row space?", a: "The nonzero rows of an echelon form of $A$ (Theorem 4.7)." },
        { q: "Which of $N(A)$, $C(A)$, $C(A^T)$ can change under row operations?", a: "Only $C(A)$." },
      ],
    },
    {
      title: "Dimension",
      intuition:
        "The dimension counts the vectors in a basis: the number of independent directions in the space. To find it, find a basis (or count free parameters after removing the redundant ones).",
      refs: [
        "Slides 4.11 Dimension of a vector space, Exercise 4.11.1 (vsp p50–51)",
        "Slides 4.12 Dimensions of C(A) and N(A), Exercise 4.12.1 (vsp p52–57)",
        "Slides 4.7 standard basis for Pₙ (vsp p35)",
        "Tutorial 4 Q11, Q12",
        "PYP AY25/26 S1 Q5 (3×3 symmetric matrices); older PYP: dim P₄ = 5; basis & dimension of W in R⁴ and extend to a basis of R⁴",
      ],
      keyIdeas: [
        "**Definition:** $\\dim V$ is the number of vectors in a basis for $V$; $\\dim\\{\\mathbf{0}\\} = 0$.",
        "$\\dim\\mathbb{R}^n = n$ (standard basis). $\\dim\\mathbb{P}_2 = 3$ (basis $\\{1, t, t^2\\}$), and in general $\\{1, t, \\dots, t^n\\}$ gives $\\dim\\mathbb{P}_n = n + 1$ (e.g. $\\dim\\mathbb{P}_4 = 5$).",
        "Subspaces of $\\mathbb{R}^3$: 0-dimensional $\\{\\mathbf{0}\\}$, 1-dimensional lines through $\\mathbf{0}$, 2-dimensional planes through $\\mathbf{0}$, and $\\mathbb{R}^3$ itself.",
        "**Parametric sets** such as $H = \\{(a - 3b + 6c,\\ 5a + 4d,\\ b - 2c - d,\\ 5d)\\}$: write $H$ as the span of the vectors multiplying $a, b, c, d$, remove the redundant ones, and count what is left.",
        "$\\dim C(A) = $ number of pivot columns of $A$; $\\dim N(A) = $ number of free variables. So $\\dim\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ is the number of pivots of $[\\,\\mathbf{v}_1\\ \\cdots\\ \\mathbf{v}_p\\,]$; e.g. $(2,-5), (-4,10), (-3,6)$ span a 2-dimensional subspace of $\\mathbb{R}^2$ (Tutorial 4 Q11).",
        "**Matrix spaces:** count the entries you may choose freely. A $3\\times3$ symmetric matrix $\\begin{bmatrix} a & b & c \\\\ b & d & e \\\\ c & e & f \\end{bmatrix}$ is fixed by $a, \\dots, f$, so the $3\\times3$ symmetric matrices have dimension **6**.",
        "**Checking a basis of $\\mathbb{R}^n$:** $n$ vectors form a basis for $\\mathbb{R}^n$ exactly when the $n\\times n$ matrix with these columns is invertible (Theorem 2.4 / 4.9), e.g. when it has $n$ pivots or a nonzero determinant. This is how to extend a basis of a subspace to a basis of $\\mathbb{R}^n$.",
      ],
      formulas: [
        "\\dim\\mathbb{R}^n = n, \\qquad \\dim\\mathbb{P}_n = n+1, \\qquad \\dim C(A) = \\#\\text{pivot columns}, \\qquad \\dim N(A) = \\#\\text{free variables}",
      ],
      example: {
        problem:
          "Let $W$ be the subspace of $\\mathbb{R}^4$ spanned by $\\mathbf{w}_1 = (1,-2,5,-3)$, $\\mathbf{w}_2 = (2,3,1,-4)$, $\\mathbf{w}_3 = (3,8,-3,-5)$. Find a basis and the dimension of $W$, and extend the basis to a basis of $\\mathbb{R}^4$.",
        steps: [
          "Row reduce $[\\,\\mathbf{w}_1\\ \\mathbf{w}_2\\ \\mathbf{w}_3\\,]$: there are pivots in columns 1 and 2 only, and indeed $\\mathbf{w}_3 = -\\mathbf{w}_1 + 2\\mathbf{w}_2$ (check: $-(1,-2,5,-3) + 2(2,3,1,-4) = (3,8,-3,-5)$ ✓).",
          "By the Spanning Set Theorem drop $\\mathbf{w}_3$. $\\mathbf{w}_1, \\mathbf{w}_2$ are not multiples of each other, so $\\{\\mathbf{w}_1, \\mathbf{w}_2\\}$ is a basis and $\\dim W = 2$.",
          "Try adding $\\mathbf{e}_3, \\mathbf{e}_4$: the matrix $[\\,\\mathbf{w}_1\\ \\mathbf{w}_2\\ \\mathbf{e}_3\\ \\mathbf{e}_4\\,] = \\begin{bmatrix} 1 & 2 & 0 & 0 \\\\ -2 & 3 & 0 & 0 \\\\ 5 & 1 & 1 & 0 \\\\ -3 & -4 & 0 & 1 \\end{bmatrix}$ has determinant $(1\\cdot3 - 2\\cdot(-2))\\cdot1\\cdot1 = 7 \\ne 0$ (expand along the last two columns).",
          "So the matrix is invertible and its 4 columns form a basis for $\\mathbb{R}^4$ (Theorem 4.9).",
        ],
        answer: "$\\dim W = 2$ with basis $\\{\\mathbf{w}_1, \\mathbf{w}_2\\}$; $\\{\\mathbf{w}_1, \\mathbf{w}_2, \\mathbf{e}_3, \\mathbf{e}_4\\}$ is a basis for $\\mathbb{R}^4$.",
      },
      pitfalls: [
        "$\\dim\\mathbb{P}_n = n + 1$, not $n$ (count the constant term).",
        "The number of vectors you are **given** is not the dimension. Remove the dependent ones first.",
        "A plane in $\\mathbb{R}^4$ has dimension 2 even though its vectors have 4 entries.",
      ],
      recall: [
        { q: "$\\dim$ of the $3\\times3$ symmetric matrices?", a: "$6$ (free entries $a_{11}, a_{22}, a_{33}, a_{12}, a_{13}, a_{23}$)." },
        { q: "$\\dim\\mathbb{P}_4$?", a: "$5$ (basis $1, t, t^2, t^3, t^4$)." },
        { q: "How do you read $\\dim N(A)$ and $\\dim C(A)$ off an echelon form?", a: "$\\dim N(A)$ = number of free variables; $\\dim C(A)$ = number of pivot columns." },
      ],
    },
    {
      title: "Rank and the Rank Theorem",
      intuition:
        "Each column of $A$ either has a pivot (a new direction in $C(A)$) or gives a free variable (a direction in $N(A)$). So the number of columns $n$ splits exactly into rank plus $\\dim N(A)$.",
      refs: [
        "Slides 4.14 Rank, Theorem 4.8 (Rank Theorem), Exercise 4.14.1, Theorem 4.9 (IMT continued) (vsp p62–67)",
        "Tutorial 4 Q13, Q14, Q16",
        "PYP AY25/26 S1 Q4, Q7; PYP AY25/26 S2 Q9; PYP AY24/25 S2 Q7, Q8, Q10",
        "Older PYP: dim N(BᵀB) and rank BᵀB; rank uvᵀ = 1; max rank of 6×4 = 4; rank ≤ p; 8×10 with dim N(A) = 3",
      ],
      keyIdeas: [
        "**Definition:** the **rank** of $A$ is the dimension of the column space of $A$. It is the number of pivot columns, and also the dimension of the row space: rank of $A = \\dim C(A) = \\dim C(A^T)$. Hence rank of $A^T$ = rank of $A$ (Tutorial 4 Q13).",
        "$\\dim N(A)$ = number of free variables = number of columns without pivots.",
        "**Theorem 4.8 (Rank Theorem):** if $A$ has $n$ columns, then rank of $A + \\dim N(A) = n$.",
        "Applied to $A^T$ (which has $m$ columns and the same rank): rank of $A + \\dim N(A^T) = m$.",
        "The rank is at most the number of rows and at most the number of columns: a $6\\times4$ matrix has rank at most 4.",
        "Every column of $\\mathbf{u}\\mathbf{v}^T$ ($\\mathbf{u}, \\mathbf{v}$ nonzero) is a multiple of $\\mathbf{u}$, so its rank is 1. For $a_{ij} = i + j$, row $i$ is $i(1,\\dots,1) + (1,2,\\dots,n)$, so the rank is $2$ (Tutorial 4 Q16).",
        "$N(B^TB) = N(B)$: if $B^TB\\mathbf{x} = \\mathbf{0}$ then $\\mathbf{x}^TB^TB\\mathbf{x} = \\|B\\mathbf{x}\\|^2 = 0$, so $B\\mathbf{x} = \\mathbf{0}$. Hence $\\dim N(B^TB) = \\dim N(B)$ and rank of $B^TB$ = rank of $B$.",
        "**Reading a complete solution** $\\mathbf{x} = \\mathbf{p} + c\\mathbf{v} + d\\mathbf{w}$ of $A\\mathbf{x} = \\mathbf{b}$: $\\dim N(A) = 2$ (count the independent free directions, not $\\mathbf{p}$), so rank of $A = n - 2$.",
        "**Exercise 4.14.1:** 40 equations in 42 unknowns with $\\dim N(A) = 2$ give $\\dim C(A) = 40$; the only 40-dimensional subspace of $\\mathbb{R}^{40}$ is $\\mathbb{R}^{40}$, so $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}$.",
        "**Theorem 4.9 (IMT continued)**, $A$ $n\\times n$: $A$ invertible $\\iff$ the columns of $A$ form a basis for $\\mathbb{R}^n$ $\\iff C(A) = \\mathbb{R}^n \\iff \\dim C(A) = n \\iff$ rank of $A = n \\iff N(A) = \\{\\mathbf{0}\\} \\iff \\dim N(A) = 0$.",
      ],
      formulas: [
        "\\text{rank of } A + \\dim N(A) = n \\quad (\\text{Theorem 4.8})",
        "\\text{rank of } A = \\dim C(A) = \\dim C(A^T)",
      ],
      example: {
        problem:
          "$A$ is $5\\times 7$ with rank of $A = 3$. Find $\\dim N(A)$, $\\dim C(A^T)$, the rank of $A^T$ and $\\dim N(A^T)$. Is $A\\mathbf{x} = \\mathbf{b}$ consistent for every $\\mathbf{b}$ in $\\mathbb{R}^5$?",
        steps: [
          "Rank Theorem with $n = 7$ columns: $\\dim N(A) = 7 - 3 = 4$.",
          "$\\dim C(A^T) = $ rank of $A = 3$, and the rank of $A^T$ is also $3$.",
          "$A^T$ is $7\\times5$ (5 columns) with rank 3, so by the Rank Theorem $\\dim N(A^T) = 5 - 3 = 2$.",
          "$C(A)$ is a 3-dimensional subspace of $\\mathbb{R}^5$, not all of $\\mathbb{R}^5$, so some $\\mathbf{b}$ are not in $C(A)$ and give an inconsistent system.",
        ],
        answer: "$\\dim N(A) = 4$, $\\dim C(A^T) = 3$, rank of $A^T = 3$, $\\dim N(A^T) = 2$; no.",
      },
      pitfalls: [
        "The Rank Theorem uses $n$ = number of **columns**. For $N(A^T)$ use the number of rows of $A$.",
        "\"$\\dim N(A) = 3$ for an $8\\times10$ matrix\" gives rank $7 < 8$, so $A\\mathbf{x} = \\mathbf{b}$ is **not** always solvable.",
        "Rank can never exceed the number of rows: a $3\\times 8$ matrix has rank $\\le 3$, so $\\dim N(A) \\ge 5$.",
      ],
      recall: [
        { q: "State the Rank Theorem (Theorem 4.8).", a: "If $A$ has $n$ columns, rank of $A + \\dim N(A) = n$." },
        { q: "Rank of an $n\\times n$ ($n\\ge 4$) matrix with $a_{ij} = i + j$?", a: "Always $2$." },
        { q: "$A$ is $n\\times n$ with $N(A) = \\{\\mathbf{0}\\}$. What is its rank? Is it invertible?", a: "Rank $n$; yes, by Theorem 4.9." },
      ],
    },
    {
      title: "Coordinates and change of basis",
      intuition:
        "A basis is a coordinate grid. $[\\mathbf{x}]_{\\mathcal{B}}$ records how many steps along each basis vector reach $\\mathbf{x}$. Change the grid and the same vector gets new coordinates.",
      visuals: ["coordinates-grid"],
      refs: [
        "Slides 4.10 Coordinate systems, Exercises 4.10.1–4.10.2, P_B (vsp p44–49)",
        "Slides 4.15 Change of basis, Exercise 4.15.1, Theorem 4.9 (P_{C←B}) (vsp p68–70)",
        "Tutorial 4 Q10, Q15",
        "PYP AY25/26 S1 Q6; older PYP: coordinates in P2 w.r.t. {1, x, x²}; coordinates of v w.r.t. a basis; T/F P with columns [f₁]_G, [f₂]_G",
      ],
      keyIdeas: [
        "If $\\mathcal{B} = \\{\\mathbf{b}_1,\\dots,\\mathbf{b}_n\\}$ is a basis for $V$, each $\\mathbf{x}$ in $V$ can be written in exactly one way as $\\mathbf{x} = c_1\\mathbf{b}_1 + \\dots + c_n\\mathbf{b}_n$. The weights are the $\\mathcal{B}$-coordinates of $\\mathbf{x}$, and $[\\mathbf{x}]_{\\mathcal{B}} = (c_1,\\dots,c_n)$ is the $\\mathcal{B}$-coordinate vector.",
        "In $\\mathbb{R}^n$: $P_{\\mathcal{B}} = [\\,\\mathbf{b}_1\\ \\cdots\\ \\mathbf{b}_n\\,]$ changes $\\mathcal{B}$-coordinates into standard coordinates, $\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$. $P_{\\mathcal{B}}$ is invertible (its columns form a basis), so $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$.",
        "In the standard basis $\\mathcal{E}$, $[\\mathbf{x}]_{\\mathcal{E}} = \\mathbf{x}$. In $\\mathbb{P}_n$ w.r.t. $\\{1, t, \\dots, t^n\\}$ the coordinates are the coefficients: $[3 + 2t - t^2] = (3, 2, -1)$.",
        "The coordinate mapping $\\mathbf{x} \\mapsto [\\mathbf{x}]_{\\mathcal{B}}$ is a one-to-one linear transformation: $[c_1\\mathbf{u}_1 + \\dots + c_p\\mathbf{u}_p]_{\\mathcal{B}} = c_1[\\mathbf{u}_1]_{\\mathcal{B}} + \\dots + c_p[\\mathbf{u}_p]_{\\mathcal{B}}$. So dependence relations among polynomials are the same as among their coordinate vectors.",
        "**Change of basis (Theorem 4.9, slide 70):** for bases $\\mathcal{B}$ and $\\mathcal{C}$ of $V$ there is a unique matrix $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$ with $[\\mathbf{x}]_{\\mathcal{C}} = P_{\\mathcal{C}\\leftarrow\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}$. Its columns are the $\\mathcal{C}$-coordinate vectors of the vectors in $\\mathcal{B}$: $P_{\\mathcal{C}\\leftarrow\\mathcal{B}} = \\big[\\,[\\mathbf{b}_1]_{\\mathcal{C}}\\ \\cdots\\ [\\mathbf{b}_n]_{\\mathcal{C}}\\,\\big]$.",
        "If $\\mathbf{b}_1 = 4\\mathbf{c}_1 + \\mathbf{c}_2$, then $(4, 1)$ is the **first column** of $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$, not the first row (Exercise 4.15.1).",
        "In $\\mathbb{R}^n$, find each column $[\\mathbf{b}_j]_{\\mathcal{C}}$ by solving $P_{\\mathcal{C}}\\mathbf{c} = \\mathbf{b}_j$, i.e. $[\\mathbf{b}_j]_{\\mathcal{C}} = P_{\\mathcal{C}}^{-1}\\mathbf{b}_j$.",
      ],
      formulas: [
        "\\mathbf{x} = P_{\\mathcal{B}}[\\mathbf{x}]_{\\mathcal{B}}, \\qquad [\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}",
        "[\\mathbf{x}]_{\\mathcal{C}} = \\underset{\\mathcal{C}\\leftarrow\\mathcal{B}}{P}[\\mathbf{x}]_{\\mathcal{B}}, \\qquad \\underset{\\mathcal{C}\\leftarrow\\mathcal{B}}{P} = \\big[\\,[\\mathbf{b}_1]_{\\mathcal{C}}\\ \\cdots\\ [\\mathbf{b}_n]_{\\mathcal{C}}\\,\\big]",
      ],
      example: {
        problem:
          "(a) $\\mathcal{B} = \\{(3,1), (5,2)\\}$. Find $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = (4,1)$. (b) $\\mathcal{A}, \\mathcal{B}$ are bases of $V$ with $\\mathbf{a}_1 = 2\\mathbf{b}_1 + \\mathbf{b}_2$, $\\mathbf{a}_2 = \\mathbf{b}_1 - \\mathbf{b}_2$. Find $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$ and $[\\mathbf{x}]_{\\mathcal{B}}$ for $\\mathbf{x} = \\mathbf{a}_1 + 3\\mathbf{a}_2$.",
        steps: [
          "(a) $P_{\\mathcal{B}} = \\begin{bmatrix} 3 & 5 \\\\ 1 & 2 \\end{bmatrix}$, $|P_{\\mathcal{B}}| = 1$, $P_{\\mathcal{B}}^{-1} = \\begin{bmatrix} 2 & -5 \\\\ -1 & 3 \\end{bmatrix}$.",
          "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}(4,1) = (8 - 5,\\ -4 + 3) = (3, -1)$. Check: $3(3,1) - (5,2) = (4,1)$ ✓.",
          "(b) Columns are the $\\mathcal{B}$-coordinates of the $\\mathbf{a}_j$: $[\\mathbf{a}_1]_{\\mathcal{B}} = (2,1)$, $[\\mathbf{a}_2]_{\\mathcal{B}} = (1,-1)$, so $P_{\\mathcal{B}\\leftarrow\\mathcal{A}} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}$.",
          "$[\\mathbf{x}]_{\\mathcal{A}} = (1, 3)$, so $[\\mathbf{x}]_{\\mathcal{B}} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} = (5, -2)$.",
          "Check by substitution: $(2\\mathbf{b}_1 + \\mathbf{b}_2) + 3(\\mathbf{b}_1 - \\mathbf{b}_2) = 5\\mathbf{b}_1 - 2\\mathbf{b}_2$ ✓.",
        ],
        answer: "(a) $[\\mathbf{x}]_{\\mathcal{B}} = (3, -1)$. (b) $P_{\\mathcal{B}\\leftarrow\\mathcal{A}} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}$, $[\\mathbf{x}]_{\\mathcal{B}} = (5,-2)$.",
      },
      pitfalls: [
        "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$, not $P_{\\mathcal{B}}\\mathbf{x}$. $P_{\\mathcal{B}}$ goes **from** $\\mathcal{B}$-coordinates **to** standard coordinates.",
        "The coefficients of $\\mathbf{a}_j$ go in **column** $j$ of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$. Writing them as rows gives the transpose, the most common wrong option.",
        "$[\\mathbf{x}]_{\\mathcal{A}}$, $[\\mathbf{x}]_{\\mathcal{B}}$ and $\\mathbf{x}$ itself are different columns of numbers for the same vector; read carefully which one is asked for.",
      ],
      recall: [
        { q: "How do you compute $[\\mathbf{x}]_{\\mathcal{B}}$ in $\\mathbb{R}^n$?", a: "$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x}$, i.e. solve $P_{\\mathcal{B}}\\mathbf{c} = \\mathbf{x}$." },
        { q: "What are the columns of $P_{\\mathcal{C}\\leftarrow\\mathcal{B}}$?", a: "The $\\mathcal{C}$-coordinate vectors $[\\mathbf{b}_1]_{\\mathcal{C}}, \\dots, [\\mathbf{b}_n]_{\\mathcal{C}}$." },
        { q: "Why can independence in $\\mathbb{P}_2$ be tested with vectors in $\\mathbb{R}^3$?", a: "The coordinate mapping w.r.t. $\\{1, t, t^2\\}$ is a one-to-one linear transformation, so a combination of polynomials is $\\mathbf{0}$ exactly when the same combination of their coordinate vectors is." },
      ],
    },
  ],
  playbook: [
    "If you see \"is this set a subspace?\" → test $\\mathbf{0}$ first, then look for an \"or\" (union), an inequality, a constant term or a nonlinear term; each gives a quick counterexample. Homogeneous linear equations or a span → yes.",
    "If you see $\\{(\\ldots r\\ldots, \\ldots s\\ldots, \\ldots t\\ldots)\\}$ and \"find $A$ with this column space\" → the vectors multiplying $r, s, t$ are the columns of $A$.",
    "If you see \"for which $\\mathbf{b}$ (or $p$) is $A\\mathbf{x} = \\mathbf{b}$ consistent?\" → row reduce $[\\,A\\ \\ \\mathbf{b}\\,]$; a zero row of $A$ gives the condition for $\\mathbf{b} \\in C(A)$.",
    "If you see \"basis for $C(A)$\" → pivot columns of the **original** $A$. \"Basis for the row space\" → nonzero rows of an echelon form. \"Basis for $N(A)$\" → one vector per free variable, with the sign flip.",
    "If you see \"row equivalent matrices have the same …\" → row space and null space: yes; column space: no.",
    "If you see a dependence relation $c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + c_3\\mathbf{v}_3 = \\mathbf{0}$ → remove a vector with a **nonzero** weight to get a smaller spanning set (Spanning Set Theorem).",
    "If you see polynomials and \"independent / basis / dimension\" → write their coordinate vectors w.r.t. $\\{1, t, t^2, \\dots\\}$ and row reduce.",
    "If you see \"dimension of a set of matrices\" → write the general matrix with as few free letters as the conditions allow; the number of letters is the dimension (3×3 symmetric: 6).",
    "If you see the shape $m\\times n$ and the rank $r$ → $\\dim N(A) = n - r$, $\\dim C(A^T) = r$, $\\dim N(A^T) = m - r$, and $r$ is at most $m$ and at most $n$.",
    "If you see a complete solution $\\mathbf{p} + c\\mathbf{v} + d\\mathbf{w}$ → $\\dim N(A)$ = number of independent free vectors, then rank of $A = n - \\dim N(A)$.",
    "If you see $a_{ij} = i + j$, $\\mathbf{u}\\mathbf{v}^T$ or $B^TB$ → rank $2$, rank $1$, and rank of $B$ respectively.",
    "If you see $AB = 0$ → $C(B) \\subseteq N(A)$, so rank of $B \\le \\dim N(A)$.",
    "If you see $[\\mathbf{x}]_{\\mathcal{B}}$ in $\\mathbb{R}^n$ → solve $P_{\\mathcal{B}}\\mathbf{c} = \\mathbf{x}$ (or use $P_{\\mathcal{B}}^{-1}$) and check by recombining.",
    "If you see relations $\\mathbf{a}_j = \\dots\\mathbf{b}$'s → their coefficients form the **columns** of $P_{\\mathcal{B}\\leftarrow\\mathcal{A}}$; then $[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}\\leftarrow\\mathcal{A}}[\\mathbf{x}]_{\\mathcal{A}}$.",
  ],
};
