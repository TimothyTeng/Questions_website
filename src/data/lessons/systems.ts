import type { Lesson } from "@/lib/types";

export const systemsLesson: Lesson = {
  topic: "systems",
  bigPicture:
    "Almost every question in the course eventually becomes \"solve a linear system\". This chapter gives one algorithm, row reduction, and one way of reading its output: **pivots**. Write the system as an augmented matrix, row reduce to echelon form (to answer *does a solution exist?*) and on to the unique reduced echelon form (to write *all* solutions). A row $[0\\ \\cdots\\ 0 \\mid c]$ with $c\\ne0$ means no solution; otherwise each non-pivot column is a free variable, and free variables mean infinitely many solutions. The same pivot count then answers the geometric questions: $A\\mathbf{x} = \\mathbf{b}$ is a statement about **combinations of the columns**, so \"is $\\mathbf{b}$ in the span?\" is a consistency question, \"do the columns span $\\mathbb{R}^m$?\" means a pivot in every **row**, and \"are the columns independent?\" means a pivot in every **column**. Solution sets always look like $\\mathbf{p} + (\\text{solutions of } A\\mathbf{x}=\\mathbf{0})$.",
  sections: [
    {
      title: "Linear systems and their geometry",
      intuition:
        "Each linear equation in two unknowns is a line, and in three unknowns a plane. Solving the system means finding the points that lie on **all** of them at once. Lines and planes can meet in a point, not meet at all, or overlap in a whole line or plane, so there are only three possible outcomes.",
      visuals: ["system-lines"],
      keyIdeas: [
        "A **linear equation** in $x_1,\\dots,x_n$ has the form $a_1x_1 + \\cdots + a_nx_n = b$ with constant coefficients. No products $x_1x_2$, no powers, no $\\sqrt{x}$, $\\sin x$ of the unknowns ($\\sqrt2\\,x_1$ is fine: the coefficient may be any constant).",
        "A **solution** is a list $(s_1,\\dots,s_n)$ satisfying every equation. The **solution set** is the set of all solutions; two systems are **equivalent** if they have the same solution set.",
        "**Every linear system has no solution, exactly one solution, or infinitely many solutions.** Never exactly two: if $\\mathbf{p}\\ne\\mathbf{q}$ are solutions, so is every point $\\mathbf{p} + t(\\mathbf{q}-\\mathbf{p})$ on the line through them.",
        "**Consistent** = at least one solution; **inconsistent** = none.",
        "In $\\mathbb{R}^2$: two lines cross (unique), are parallel (none) or coincide (infinite). In $\\mathbb{R}^3$: planes can meet in a point, a line, a plane, or nowhere; three planes can fail to have a common point even when every pair meets (a \"triangular prism\").",
      ],
      formulas: ["a_1x_1 + a_2x_2 + \\cdots + a_nx_n = b"],
      example: {
        problem:
          "Classify each system and give the solution if it is unique: (a) $x + 2y = 4,\\ 3x - y = 5$; (b) $x + 2y = 4,\\ 2x + 4y = 9$; (c) $x + 2y = 4,\\ 2x + 4y = 8$.",
        steps: [
          "(a) From the first equation $x = 4 - 2y$. Substituting: $3(4-2y) - y = 5 \\Rightarrow 12 - 7y = 5 \\Rightarrow y = 1$, $x = 2$. Different slopes, so the lines cross once.",
          "(b) Twice the first equation is $2x + 4y = 8$, but the second says $2x + 4y = 9$. Subtracting gives $0 = 1$: parallel lines, **no solution**.",
          "(c) The second equation is exactly twice the first: the same line, so **infinitely many** solutions $(4 - 2t,\\ t)$, $t\\in\\mathbb{R}$.",
        ],
        answer: "(a) unique, $(x,y) = (2,1)$; (b) inconsistent; (c) infinitely many, $(4-2t, t)$.",
      },
      pitfalls: [
        "\"A linear system can have exactly two solutions\" is always **False**.",
        "More equations than unknowns does **not** force inconsistency, and more unknowns than equations does **not** force infinitely many solutions (the system may be inconsistent). Check with row reduction.",
        "Two planes in $\\mathbb{R}^3$ can never meet in a single point: two equations in three unknowns give no solution or infinitely many.",
      ],
      recall: [
        { q: "What are the possible numbers of solutions of a linear system?", a: "$0$, $1$ or infinitely many." },
        { q: "Is $3x_1 - \\sqrt{5}\\,x_2 = \\pi$ linear? Is $x_1x_2 = 1$?", a: "Yes (constant coefficients); no (product of unknowns)." },
        { q: "Three planes, each pair intersecting in a line, but no point common to all three. How many solutions?", a: "None: the system is inconsistent." },
      ],
    },
    {
      title: "Augmented matrices and elementary row operations",
      intuition:
        "Elimination only ever does three things to equations: swap them, scale one, or add a multiple of one to another. Each move is reversible, so no solution is ever gained or lost. The augmented matrix is just bookkeeping that drops the variable names.",
      visuals: ["row-op-lines"],
      keyIdeas: [
        "**Coefficient matrix** $A$ ($m\\times n$: $m$ equations, $n$ unknowns) and **augmented matrix** $[A \\mid \\mathbf{b}]$ ($m\\times(n+1)$).",
        "**Elementary row operations**: (1) **replacement** $R_i \\leftarrow R_i + cR_j$ ($j\\ne i$); (2) **interchange** $R_i \\leftrightarrow R_j$; (3) **scaling** $R_i \\leftarrow cR_i$ with $c \\ne 0$.",
        "Each is reversible: undo $R_i + cR_j$ with $R_i - cR_j$, a swap with the same swap, and scaling by $c$ with scaling by $1/c$.",
        "Matrices are **row equivalent** ($A \\sim B$) if a sequence of row operations turns one into the other. **Row-equivalent augmented matrices have the same solution set.**",
        "Row operations change the rows (the individual equations) but never the solution set, so they never change whether a system is consistent.",
      ],
      formulas: ["R_i \\leftarrow R_i + cR_j, \\qquad R_i \\leftrightarrow R_j, \\qquad R_i \\leftarrow cR_i\\ (c\\ne0)"],
      example: {
        problem:
          "Solve $x_1 + 2x_2 - x_3 = -1$, $\\ 2x_1 + 5x_2 + x_3 = 0$, $\\ -x_1 + x_2 + 4x_3 = 1$.",
        steps: [
          "Augmented matrix: $\\left[\\begin{array}{ccc|c} 1 & 2 & -1 & -1 \\\\ 2 & 5 & 1 & 0 \\\\ -1 & 1 & 4 & 1 \\end{array}\\right]$.",
          "$R_2 \\leftarrow R_2 - 2R_1$ and $R_3 \\leftarrow R_3 + R_1$: $\\left[\\begin{array}{ccc|c} 1 & 2 & -1 & -1 \\\\ 0 & 1 & 3 & 2 \\\\ 0 & 3 & 3 & 0 \\end{array}\\right]$.",
          "$R_3 \\leftarrow R_3 - 3R_2$: the last row becomes $[0\\ 0\\ -6 \\mid -6]$, so $x_3 = 1$.",
          "Back-substitute: $x_2 = 2 - 3x_3 = -1$, then $x_1 = -1 - 2x_2 + x_3 = -1 + 2 + 1 = 2$.",
          "Check in equation 3: $-2 + (-1) + 4 = 1$ ✓.",
        ],
        answer: "$(x_1, x_2, x_3) = (2, -1, 1)$, the unique solution.",
      },
      pitfalls: [
        "Scaling by $0$ is **not** allowed (it destroys information and is not reversible).",
        "\"$R_2 \\leftarrow R_1 + R_3$\" is not an elementary operation: the replaced row must keep itself ($R_2 \\leftarrow R_2 + cR_j$). Overwriting $R_2$ with something that does not involve it throws the old equation away, so the move is not reversible and can enlarge the solution set.",
        "Apply every operation to the **whole** augmented row, including the right-hand side.",
      ],
      recall: [
        { q: "Which operation undoes $R_3 \\leftarrow R_3 - 4R_1$?", a: "$R_3 \\leftarrow R_3 + 4R_1$." },
        { q: "Can a row operation turn a consistent system into an inconsistent one?", a: "No. Row-equivalent augmented matrices have the same solution set." },
        { q: "What size is the augmented matrix of 4 equations in 6 unknowns?", a: "$4\\times7$." },
      ],
    },
    {
      title: "Echelon form, RREF and pivots",
      intuition:
        "Echelon form is a staircase: each nonzero row starts further right than the one above it. That is already enough to see whether a solution exists. Going on to the **reduced** form, with 1s on the steps and zeros above them, lets you read off every solution, and that reduced form is unique.",
      keyIdeas: [
        "**Echelon form (REF)**: (1) zero rows at the bottom; (2) each leading entry is in a column to the right of the leading entry above it; (3) entries below a leading entry are zero.",
        "**Reduced echelon form (RREF)**: also (4) each leading entry is $1$ and (5) it is the only nonzero entry in its column.",
        "**Uniqueness**: every matrix is row equivalent to **exactly one** RREF. Echelon forms are **not** unique (you can scale rows or add lower rows to upper ones).",
        "A **pivot position** is a location that holds a leading 1 in the RREF (equivalently a leading entry in any echelon form). A **pivot column** is a column of $A$ containing a pivot position. The pivot positions are the same in every echelon form.",
        "**Row reduction algorithm**: forward phase (left-most nonzero column, choose a nonzero pivot, swap it up, create zeros below, repeat on the submatrix) gives REF; backward phase (scale pivots to 1, create zeros above, right to left) gives RREF.",
        "#pivots $\\le \\min(m, n)$, because no row and no column can contain two pivots.",
      ],
      example: {
        problem:
          "Find the RREF and the pivot columns of $\\left[\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 1 \\\\ 2 & 4 & 1 & 0 & 8 \\\\ 1 & 2 & 2 & -3 & 7 \\end{array}\\right]$.",
        steps: [
          "$R_2 \\leftarrow R_2 - 2R_1$ and $R_3 \\leftarrow R_3 - R_1$: rows 2 and 3 both become $[0\\ 0\\ 3\\ {-6} \\mid 6]$.",
          "$R_3 \\leftarrow R_3 - R_2$ gives a zero row. Echelon form: $\\left[\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 1 \\\\ 0 & 0 & 3 & -6 & 6 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$. Column 2 has no pivot: below and at row 2 it is all zero.",
          "Backward phase: $R_2 \\leftarrow \\tfrac13 R_2 = [0\\ 0\\ 1\\ {-2} \\mid 2]$, then $R_1 \\leftarrow R_1 + R_2 = [1\\ 2\\ 0\\ 1 \\mid 3]$.",
          "RREF: $\\left[\\begin{array}{cccc|c} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & -2 & 2 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$.",
        ],
        answer: "Pivot columns 1 and 3 (of the coefficient part). No pivot in the augmented column, so the system is consistent.",
      },
      pitfalls: [
        "\"The echelon form of a matrix is unique\" is **False**; the **reduced** echelon form is unique.",
        "Pivot columns are columns of the **original** $A$, located by looking at an echelon form. The entry of $A$ at a pivot position may even be $0$ before a row swap.",
        "A pivot must be the **first** nonzero entry of its row. A row $[0\\ 0\\ 3\\ {-6}]$ has its pivot in column 3, not column 4.",
      ],
      recall: [
        { q: "Which form is unique: echelon or reduced echelon?", a: "Only the reduced echelon form (RREF)." },
        { q: "Can a $3\\times5$ matrix have 4 pivot positions?", a: "No. At most one pivot per row, so at most 3." },
        { q: "What two extra conditions turn an echelon form into RREF?", a: "Every leading entry is 1, and each leading 1 is the only nonzero entry in its column." },
      ],
    },
    {
      title: "Free variables and the general solution",
      intuition:
        "In the RREF, each pivot row says \"this basic variable equals a constant minus some free variables\". The free variables can be anything you like, so you name them as parameters, and the solution set becomes one fixed point plus all combinations of a few direction vectors.",
      keyIdeas: [
        "Variables in pivot columns are **basic**; the others are **free**. #free variables $= n - (\\#\\text{pivots of } A)$ for a consistent system.",
        "**General solution**: solve each RREF row for its basic variable, in terms of free variables only. Free variables become parameters $s, t, \\dots$.",
        "**Parametric vector form**: $\\mathbf{x} = \\mathbf{p} + s\\mathbf{v}_1 + t\\mathbf{v}_2 + \\cdots$. Here $\\mathbf{p}$ (all free variables $= 0$) is one particular solution, and each $\\mathbf{v}_i$ has a $1$ in its own free slot, $0$ in the other free slots, and **minus** the RREF entries in the basic slots.",
        "The description is not unique: any particular solution can replace $\\mathbf{p}$, and any basis of the same directions can replace the $\\mathbf{v}_i$. The **set** is the same.",
        "Geometrically: one free variable gives a line, two give a plane (through $\\mathbf{p}$, parallel to the span of the $\\mathbf{v}_i$).",
      ],
      formulas: ["\\mathbf{x} = \\mathbf{p} + s\\,\\mathbf{v}_1 + t\\,\\mathbf{v}_2, \\qquad s, t \\in \\mathbb{R}"],
      example: {
        problem:
          "Write the general solution of the system with RREF $\\left[\\begin{array}{cccc|c} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & -2 & 2 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$ in parametric vector form.",
        steps: [
          "Pivot columns 1 and 3, so $x_1, x_3$ are basic and $x_2, x_4$ are free.",
          "Row 1: $x_1 + 2x_2 + x_4 = 3 \\Rightarrow x_1 = 3 - 2x_2 - x_4$. Row 2: $x_3 - 2x_4 = 2 \\Rightarrow x_3 = 2 + 2x_4$.",
          "Set $x_2 = s$, $x_4 = t$: $\\mathbf{x} = (3 - 2s - t,\\ s,\\ 2 + 2t,\\ t)$.",
          "Split by parameter: $\\mathbf{x} = [3, 0, 2, 0]^T + s[-2, 1, 0, 0]^T + t[-1, 0, 2, 1]^T$.",
          "Check a direction: the RREF rows applied to $[-1,0,2,1]^T$ give $-1 + 0 + 0 + 1 = 0$ and $2 - 2 = 0$ ✓.",
        ],
        answer: "$\\mathbf{x} = [3,0,2,0]^T + s[-2,1,0,0]^T + t[-1,0,2,1]^T$: a plane in $\\mathbb{R}^4$ through $(3,0,2,0)$.",
      },
      pitfalls: [
        "Sign slip: moving a free variable across the equals sign flips its sign. The RREF entry $+2$ in column 2 becomes $-2$ in the direction vector.",
        "Do not forget the $1$ in the free variable's own slot (and $0$ in the other free slots).",
        "Two answers that look different can describe the same set: $\\mathbf{p} + \\mathbf{v}_1$ is also a particular solution. Test an option by checking it satisfies the equations, not by comparing it with yours entry by entry.",
      ],
      recall: [
        { q: "A consistent system in 6 unknowns has 4 pivots. How many free variables?", a: "$6 - 4 = 2$, so the solution set is a plane (2 parameters)." },
        { q: "What is $\\mathbf{p}$ in the parametric vector form?", a: "The particular solution obtained by setting all free variables to $0$ (any other particular solution also works)." },
        { q: "RREF row $x_1 - 4x_3 = 5$ with $x_3$ free. What is $x_1$?", a: "$x_1 = 5 + 4x_3$." },
      ],
    },
    {
      title: "Existence and uniqueness; systems with a parameter",
      intuition:
        "Two separate questions, answered by two places in the echelon form. **Existence** depends only on the last column: the system is inconsistent exactly when some row says $0 = c$ with $c \\ne 0$. **Uniqueness** depends only on the coefficient columns: are there free variables?",
      keyIdeas: [
        "**Existence and Uniqueness Theorem**: a system is consistent **iff** the rightmost column of the augmented matrix is **not** a pivot column, i.e. no echelon row has the form $[0\\ \\cdots\\ 0 \\mid c]$ with $c \\ne 0$.",
        "If consistent: **unique** solution when there are no free variables (a pivot in every column of $A$), **infinitely many** when there is at least one free variable.",
        "**With a parameter** (e.g. $a$, $k$, $\\lambda$): eliminate *without dividing by expressions in the parameter*, reach a last row like $[0\\ 0\\ f(a) \\mid g(a)]$, then split into cases: $f(a)\\ne0$ → unique; $f(a)=0, g(a)=0$ → infinitely many; $f(a)=0, g(a)\\ne0$ → none.",
        "For a **square** coefficient matrix, \"unique for every $\\mathbf{b}$\" ⟺ $\\det A \\ne 0$. The special parameter values are the roots of $\\det A$, and each root still has to be tested for none vs infinitely many.",
        "**Find a constant so the system is consistent** (e.g. $\\mathbf{b} = [b_1, b_2, p]^T$): reduce $[A \\mid \\mathbf{b}]$ symbolically; the zero row of $A$ must have a $0$ on the right.",
        "**Find unknown coefficients from a known solution**: substitute the solution; each equation becomes a linear equation in the unknown coefficients.",
      ],
      formulas: ["\\left[\\begin{array}{ccc|c} * & * & * & * \\\\ 0 & * & * & * \\\\ 0 & 0 & f(a) & g(a) \\end{array}\\right] \\quad\\Rightarrow\\quad \\begin{cases} f\\ne0: & \\text{unique} \\\\ f=0,\\ g=0: & \\text{infinitely many} \\\\ f=0,\\ g\\ne0: & \\text{none} \\end{cases}"],
      example: {
        problem:
          "For which $a$ does $x + y + z = 2$, $\\ x + 2y - z = 1$, $\\ 2x + 3y + (a^2 - 9)z = a$ have no solution, infinitely many, exactly one?",
        steps: [
          "$R_2 \\leftarrow R_2 - R_1$: $[0\\ 1\\ {-2} \\mid {-1}]$. $\\ R_3 \\leftarrow R_3 - 2R_1$: $[0\\ 1\\ a^2 - 11 \\mid a - 4]$.",
          "$R_3 \\leftarrow R_3 - R_2$: $[0\\ 0\\ a^2 - 9 \\mid a - 3] = [0\\ 0\\ (a-3)(a+3) \\mid a - 3]$.",
          "$a \\ne \\pm3$: pivot in every column, **exactly one** solution.",
          "$a = 3$: the row is $[0\\ 0\\ 0 \\mid 0]$, $z$ is free, **infinitely many** solutions.",
          "$a = -3$: the row is $[0\\ 0\\ 0 \\mid -6]$, i.e. $0 = -6$: **no solution**.",
        ],
        answer: "None for $a = -3$; infinitely many for $a = 3$; exactly one for $a \\ne \\pm 3$.",
      },
      pitfalls: [
        "Never divide by $(a - 3)$ or $(a^2-9)$ mid-reduction; you would silently throw away the special cases.",
        "The two roots of $f(a)$ usually behave **differently**: one gives $0 = 0$, the other $0 = c$. Answering \"$a = \\pm3$\" for *no solution* is the classic trap.",
        "A zero row $[0\\ \\cdots\\ 0 \\mid 0]$ does **not** automatically mean infinitely many solutions (e.g. 3 equations, 2 unknowns, 2 pivots: unique). Count pivots against the number of unknowns.",
      ],
      recall: [
        { q: "When is a system inconsistent?", a: "Exactly when an echelon form of the augmented matrix has a row $[0\\ \\cdots\\ 0\\mid c]$ with $c\\ne0$ (the last column is a pivot column)." },
        { q: "A consistent system has a free variable. How many solutions?", a: "Infinitely many." },
        { q: "$kx + 2y = 1$, $8x + ky = 2$: which $k$ need special attention, and what happens there?", a: "$\\det = k^2 - 16 = 0$: $k = \\pm4$. $k = 4$: the second equation is twice the first, infinitely many. $k = -4$: it becomes $8x - 4y = 2$ against $-2\\times$(first) $= -2$, no solution." },
      ],
    },
    {
      title: "$A\\mathbf{x} = \\mathbf{b}$, vector equations and span",
      intuition:
        "$A\\mathbf{x}$ is a **combination of the columns of $A$** with weights from $\\mathbf{x}$. So solving $A\\mathbf{x} = \\mathbf{b}$ asks: can $\\mathbf{b}$ be built from the columns? The set of everything that can be built is the span, and the pivots of $A$ tell you whether it fills all of $\\mathbb{R}^m$.",
      visuals: ["span-3d"],
      keyIdeas: [
        "Three equivalent forms: the **system**, the **vector equation** $x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n = \\mathbf{b}$, and the **matrix equation** $A\\mathbf{x} = \\mathbf{b}$ with $A = [\\mathbf{a}_1 \\cdots \\mathbf{a}_n]$. All have augmented matrix $[\\mathbf{a}_1 \\cdots \\mathbf{a}_n \\mid \\mathbf{b}]$.",
        "$\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ = all linear combinations $c_1\\mathbf{v}_1 + \\cdots + c_p\\mathbf{v}_p$. It always contains $\\mathbf{0}$ and each $\\mathbf{v}_i$. In $\\mathbb{R}^3$: the span of one nonzero vector is a line through $\\mathbf{0}$; of two non-parallel vectors, a plane through $\\mathbf{0}$.",
        "$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\dots,\\mathbf{a}_n\\}$ **iff** $A\\mathbf{x} = \\mathbf{b}$ is consistent. The set of all such $\\mathbf{b}$ is the **column space** $C(A)$.",
        "**Theorem (spanning)**: for an $m\\times n$ matrix $A$, these are equivalent: (a) $A\\mathbf{x}=\\mathbf{b}$ has a solution for **every** $\\mathbf{b}\\in\\mathbb{R}^m$; (b) the columns of $A$ span $\\mathbb{R}^m$; (c) $A$ has a pivot position in **every row**.",
        "Consequence: if $n < m$, the columns can never span $\\mathbb{R}^m$ (at most $n$ pivots for $m$ rows).",
        "Properties: $A(\\mathbf{u}+\\mathbf{v}) = A\\mathbf{u} + A\\mathbf{v}$ and $A(c\\mathbf{u}) = cA\\mathbf{u}$.",
      ],
      formulas: ["A\\mathbf{x} = \\begin{bmatrix}\\mathbf{a}_1 & \\cdots & \\mathbf{a}_n\\end{bmatrix}\\begin{bmatrix}x_1\\\\ \\vdots\\\\ x_n\\end{bmatrix} = x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n"],
      example: {
        problem:
          "Let $\\mathbf{a}_1 = [1, 0, -2]^T$, $\\mathbf{a}_2 = [2, 1, -1]^T$, $\\mathbf{b} = [4, 1, h]^T$. For which $h$ is $\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$? Do $\\mathbf{a}_1, \\mathbf{a}_2$ span $\\mathbb{R}^3$?",
        steps: [
          "Augmented matrix $\\left[\\begin{array}{cc|c} 1 & 2 & 4 \\\\ 0 & 1 & 1 \\\\ -2 & -1 & h \\end{array}\\right]$.",
          "$R_3 \\leftarrow R_3 + 2R_1$: $[0\\ 3 \\mid h + 8]$. Then $R_3 \\leftarrow R_3 - 3R_2$: $[0\\ 0 \\mid h + 5]$.",
          "Consistent iff $h + 5 = 0$, i.e. $h = -5$. Then $x_2 = 1$, $x_1 = 2$: $\\mathbf{b} = 2\\mathbf{a}_1 + \\mathbf{a}_2$. Check the third entry: $2(-2) + (-1) = -5$ ✓.",
          "Two vectors give at most 2 pivots for 3 rows, so they span only a plane, not $\\mathbb{R}^3$.",
        ],
        answer: "$h = -5$; no, $\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ is a plane through the origin.",
      },
      pitfalls: [
        "The vectors go in as **columns** of the augmented matrix, not rows.",
        "\"Pivot in every row\" (spanning / always consistent) is different from \"pivot in every column\" (independence / uniqueness). Read which one the question needs.",
        "A span with more than one vector has infinitely many vectors in it, not \"exactly $p$ vectors\". $\\{\\mathbf{a}_1,\\mathbf{a}_2,\\mathbf{a}_3\\}$ has 3 vectors; $\\operatorname{Span}\\{\\dots\\}$ has infinitely many.",
        "Checking the pivots of $[A\\mid\\mathbf{b}]$ for *one* $\\mathbf{b}$ says nothing about *every* $\\mathbf{b}$; for that, count the pivots of $A$ itself.",
      ],
      recall: [
        { q: "$A\\mathbf{x}$ is a linear combination of what?", a: "Of the columns of $A$, with the entries of $\\mathbf{x}$ as weights." },
        { q: "When do the columns of a $4\\times6$ matrix span $\\mathbb{R}^4$?", a: "When $A$ has a pivot in every row, i.e. 4 pivots." },
        { q: "Can the columns of a $5\\times3$ matrix span $\\mathbb{R}^5$?", a: "Never: at most 3 pivots for 5 rows." },
      ],
    },
    {
      title: "Homogeneous systems and the structure of solution sets",
      intuition:
        "$A\\mathbf{x} = \\mathbf{0}$ always has the trivial solution, and its solution set is a span through the origin (a point, line, plane…). The solutions of $A\\mathbf{x} = \\mathbf{b}$ are that same set, **shifted** by any one particular solution, so it is parallel to it.",
      keyIdeas: [
        "A **homogeneous** system $A\\mathbf{x} = \\mathbf{0}$ is always consistent ($\\mathbf{x} = \\mathbf{0}$, the **trivial** solution).",
        "It has a **nontrivial** solution iff it has at least one free variable, iff $A$ has fewer pivots than columns.",
        "**More unknowns than equations** ($n > m$) ⇒ a free variable ⇒ nontrivial solutions exist, always.",
        "For a **square** $A$: nontrivial solutions exist iff $A$ is singular ($\\det A = 0$). This is the standard \"find $k$ so that the system has a nontrivial solution\" question.",
        "**Solution set structure**: if $\\mathbf{p}$ is any one solution of $A\\mathbf{x} = \\mathbf{b}$, then the solution set is $\\{\\mathbf{p} + \\mathbf{v}_h : A\\mathbf{v}_h = \\mathbf{0}\\}$. Differences of two solutions of $A\\mathbf{x} = \\mathbf{b}$ solve $A\\mathbf{x} = \\mathbf{0}$.",
        "**Reading backwards**: from a complete solution $\\mathbf{x} = \\mathbf{p} + c\\mathbf{v}_1 + d\\mathbf{v}_2$ you get #free variables (number of parameters), the rank ($n - $ #free), and the RREF (basic-variable rows with **negated** direction entries; zero rows below).",
      ],
      formulas: ["\\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{b}\\} = \\mathbf{p} + \\{\\mathbf{v}_h : A\\mathbf{v}_h = \\mathbf{0}\\}"],
      example: {
        problem:
          "$A$ is $3\\times3$ and the complete solution of $A\\mathbf{x} = \\mathbf{b}$ is $\\mathbf{x} = [2, 0, -1]^T + t[-3, 1, 0]^T$. Find the RREF $R$ of $A$, the reduced right-hand side $\\mathbf{d}$, and describe the solutions of $A\\mathbf{x} = \\mathbf{0}$.",
        steps: [
          "One parameter, attached to $x_2$ (its slot is $1$ and $x_2$ appears in no other way), so $x_2$ is free and $x_1, x_3$ are basic: rank $2$.",
          "Read the components: $x_1 = 2 - 3t$, $x_2 = t$, $x_3 = -1$. With $t = x_2$: $x_1 + 3x_2 = 2$ and $x_3 = -1$.",
          "So $R = \\begin{bmatrix} 1 & 3 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$ and $\\mathbf{d} = [2, -1, 0]^T$. Note $+3$ in $R$ against $-3$ in the direction vector.",
          "Homogeneous solutions: $\\mathbf{x} = t[-3, 1, 0]^T$, a line through the origin. The solution set of $A\\mathbf{x} = \\mathbf{b}$ is the parallel line through $(2, 0, -1)$.",
        ],
        answer: "$R = \\begin{bmatrix} 1 & 3 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$, $\\mathbf{d} = [2,-1,0]^T$; $A\\mathbf{x} = \\mathbf{0}$ has solutions $t[-3,1,0]^T$.",
      },
      pitfalls: [
        "If $\\mathbf{p}$ and $\\mathbf{q}$ solve $A\\mathbf{x} = \\mathbf{b}$ ($\\mathbf{b}\\ne\\mathbf{0}$), then $\\mathbf{p}+\\mathbf{q}$ does **not** (it gives $2\\mathbf{b}$), but $\\mathbf{p} - \\mathbf{q}$ solves $A\\mathbf{x} = \\mathbf{0}$ and any affine combination $\\alpha\\mathbf{p} + (1-\\alpha)\\mathbf{q}$ solves $A\\mathbf{x} = \\mathbf{b}$.",
        "\"$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution\" does not mean $A\\mathbf{x} = \\mathbf{b}$ is always solvable (a tall $A$ may miss some $\\mathbf{b}$). It means solutions, when they exist, are unique.",
        "When recovering the RREF from a solution, the free columns get the **negatives** of the direction-vector entries, and the number of zero rows is $m - \\operatorname{rank}$.",
      ],
      recall: [
        { q: "Does a homogeneous system of 3 equations in 5 unknowns have a nontrivial solution?", a: "Yes, always: at most 3 pivots for 5 unknowns, so at least 2 free variables." },
        { q: "$\\mathbf{p}, \\mathbf{q}$ solve $A\\mathbf{x} = \\mathbf{b}$. What does $\\mathbf{p} - \\mathbf{q}$ solve?", a: "$A\\mathbf{x} = \\mathbf{0}$." },
        { q: "A 5-equation, 4-unknown homogeneous system has 4 pivots. How many solutions?", a: "Exactly one, the trivial solution (no free variables)." },
      ],
    },
    {
      title: "Linear independence",
      intuition:
        "Vectors are independent when none of them is redundant: no vector can be built from the others. In matrix language, the only way to combine the columns into $\\mathbf{0}$ is with all weights zero, which is the homogeneous system having only the trivial solution.",
      keyIdeas: [
        "$\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ is **linearly independent** if $c_1\\mathbf{v}_1 + \\cdots + c_p\\mathbf{v}_p = \\mathbf{0}$ forces $c_1 = \\cdots = c_p = 0$; otherwise **dependent** (a nontrivial **dependence relation** exists).",
        "The columns of $A$ are independent **iff** $A\\mathbf{x}=\\mathbf{0}$ has only the trivial solution **iff** $A$ has a pivot in **every column**.",
        "Quick facts: a set containing $\\mathbf{0}$ is dependent; one vector is independent iff it is nonzero; two vectors are dependent iff one is a multiple of the other; **more vectors than entries** ($p > n$ in $\\mathbb{R}^n$) ⇒ dependent.",
        "**Characterisation**: a set of two or more vectors is dependent iff **at least one** vector is a combination of the others (not necessarily every one, and not necessarily the last one listed).",
        "$n$ vectors in $\\mathbb{R}^n$: independent iff $\\det[\\mathbf{v}_1\\cdots\\mathbf{v}_n]\\ne0$. With a parameter, the dependent values are the roots of this determinant. Example: $\\{[1,1,1],[a,b,c],[a^2,b^2,c^2]\\}$ (Vandermonde) is independent iff $a, b, c$ are distinct.",
        "**Combinations of independent vectors**: if $\\{\\mathbf{u},\\mathbf{v},\\mathbf{w}\\}$ is independent, a set of combinations is independent iff its coefficient matrix is invertible. E.g. $\\{\\mathbf{u}+\\mathbf{v}, \\mathbf{u}-\\mathbf{v}\\}$ is independent, $\\{\\mathbf{u}-\\mathbf{v}, \\mathbf{v}-\\mathbf{w}, \\mathbf{w}-\\mathbf{u}\\}$ is not (they sum to $\\mathbf{0}$).",
      ],
      formulas: [
        "c_1\\mathbf{v}_1 + \\cdots + c_p\\mathbf{v}_p = \\mathbf{0} \\ \\Rightarrow\\ c_1 = \\cdots = c_p = 0",
        "\\det\\begin{bmatrix} 1 & a & a^2 \\\\ 1 & b & b^2 \\\\ 1 & c & c^2 \\end{bmatrix} = (b-a)(c-a)(c-b)",
      ],
      example: {
        problem: "For which $h$ are $\\mathbf{v}_1 = [1, 2, -1]^T$, $\\mathbf{v}_2 = [0, 1, 3]^T$, $\\mathbf{v}_3 = [2, h, 1]^T$ linearly dependent?",
        steps: [
          "Put the vectors in as **columns**: $\\begin{bmatrix} 1 & 0 & 2 \\\\ 2 & 1 & h \\\\ -1 & 3 & 1 \\end{bmatrix}$.",
          "$R_2 \\leftarrow R_2 - 2R_1$: $[0\\ 1\\ h-4]$. $\\ R_3 \\leftarrow R_3 + R_1$: $[0\\ 3\\ 3]$.",
          "$R_3 \\leftarrow R_3 - 3R_2$: $[0\\ 0\\ 3 - 3(h-4)] = [0\\ 0\\ 15 - 3h]$.",
          "No pivot in column 3 iff $15 - 3h = 0$, i.e. $h = 5$. (Check with the determinant: $1(1-3h) - 0 + 2(6+1) = 15 - 3h$ ✓.)",
        ],
        answer: "Dependent exactly when $h = 5$ (then $\\mathbf{v}_3 = 2\\mathbf{v}_1 + \\mathbf{v}_2$); independent for $h \\ne 5$.",
      },
      pitfalls: [
        "\"Three vectors in $\\mathbb{R}^4$ are independent\" is not automatic. Few vectors can still be dependent; only *too many* vectors force dependence.",
        "\"If $\\{\\mathbf{v}_1,\\mathbf{v}_2,\\mathbf{v}_3\\}$ is dependent then $\\mathbf{v}_3$ is a combination of $\\mathbf{v}_1, \\mathbf{v}_2$\" is **False** (e.g. $\\mathbf{v}_1 = 2\\mathbf{v}_2$ with $\\mathbf{v}_3$ unrelated).",
        "Pairwise non-parallel does **not** mean independent: $[1,0],[0,1],[1,1]$ are pairwise non-parallel but dependent.",
        "For combinations, statements without \"$\\mathbf{u},\\mathbf{v},\\mathbf{w}$ independent\" may be \"not enough information\", unless the coefficient matrix is singular (then dependent regardless).",
      ],
      recall: [
        { q: "Are any 4 vectors in $\\mathbb{R}^3$ dependent?", a: "Yes: more vectors than entries." },
        { q: "Columns of $A$ independent ⟺ ?", a: "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution ⟺ a pivot in every column." },
        { q: "Is $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{v}+\\mathbf{w},\\ \\mathbf{u}+\\mathbf{w}\\}$ independent when $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ are?", a: "Yes: the coefficient matrix has determinant $2 \\ne 0$." },
      ],
    },
  ],
  playbook: [
    "If you see a system with a parameter ($a$, $k$, $\\lambda$) → eliminate without dividing by the parameter, get the last row $[0\\ 0\\ f \\mid g]$, then test each root of $f$ separately: $g = 0$ → infinitely many, $g \\ne 0$ → none.",
    "If you see \"unique solution for all $\\lambda$ except…\" with a square system → solve $\\det A = 0$; then check each root for none vs infinitely many.",
    "If you see \"find $p$ / $h$ so that the system is consistent\" or \"$\\mathbf{b}\\in\\operatorname{Span}$\" → row reduce $[A \\mid \\mathbf{b}]$ symbolically and set the entry beside the zero row of $A$ to $0$.",
    "If you see \"homogeneous… nontrivial solution\" → square: $\\det A = 0$; non-square with $n > m$: always yes.",
    "If you see a complete solution $\\mathbf{p} + c\\mathbf{v}_1 + d\\mathbf{v}_2$ → #parameters = #free variables, rank $= n - $ #free; the RREF rows have the **negated** direction entries in the free columns and $\\mathbf{p}$'s basic entries on the right.",
    "If you see \"does $A\\mathbf{x} = \\mathbf{b}$ have a solution for every $\\mathbf{b}$\" or \"do the columns span $\\mathbb{R}^m$\" → count pivots of $A$: need one in **every row**.",
    "If you see \"unique\", \"only the trivial solution\" or \"columns independent\" → need a pivot in **every column**.",
    "If you see an augmented echelon form → first scan for $[0\\ \\cdots\\ 0 \\mid c\\ne0]$ (inconsistent), *then* count free variables.",
    "If you see \"find $t$ so that $A\\mathbf{x} = \\mathbf{0}$ has $k$ free variables\" → you need rank $= n - k$; find the $t$ that makes the extra row a combination of the others.",
    "If you see vectors with a parameter (e.g. $[1,x,0],[0,x^2,1],[0,1,x]$) → independent iff $\\det \\ne 0$; solve $\\det = 0$ for the dependent values.",
    "If you see more vectors than entries, or a set containing $\\mathbf{0}$ → dependent, no computation needed.",
    "If you see combinations like $\\mathbf{u}+\\mathbf{v}, \\mathbf{u}-\\mathbf{v}, \\mathbf{u}-2\\mathbf{v}+\\mathbf{w}$ → write the coefficient matrix; invertible ⟺ independent (given $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ independent).",
    "If you see two solutions $\\mathbf{p},\\mathbf{q}$ of $A\\mathbf{x} = \\mathbf{b}$ → $\\mathbf{p}-\\mathbf{q}$ solves $A\\mathbf{x}=\\mathbf{0}$; a combination $\\alpha\\mathbf{p}+\\beta\\mathbf{q}$ solves $A\\mathbf{x}=\\mathbf{b}$ iff $\\alpha+\\beta = 1$.",
    "If you see \"$A$ is $3\\times3$ and $A\\mathbf{x}=\\mathbf{y}$ has no solution for some $\\mathbf{y}$\" → $A$ is singular, so $A\\mathbf{x}=\\mathbf{0}$ has nontrivial solutions and **no** $A\\mathbf{x}=\\mathbf{z}$ has a unique solution.",
  ],
};
