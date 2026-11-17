import type { Lesson } from "@/lib/types";

export const systemsLesson: Lesson = {
  topic: "systems",
  bigPicture:
    "Almost every question in the course eventually becomes \"solve a linear system\". The tool is **row reduction**: write the system as an augmented matrix, use elementary row operations to reach an echelon form (to see *whether* a solution exists) and then the reduced row echelon form (to write down *all* solutions). Everything is read off the **pivots**. A row $[0\\ \\cdots\\ 0 \\mid c]$ with $c\\ne0$ means no solution; otherwise each column without a pivot gives a free variable, and a free variable means infinitely many solutions. The same pivots answer the questions about vectors: $A\\mathbf{x} = \\mathbf{b}$ asks whether $\\mathbf{b}$ is a **combination of the columns** of $A$, so \"is $\\mathbf{b}$ in the span?\" is a consistency question, \"do the columns span $\\mathbb{R}^m$?\" means a pivot in every **row**, and \"are the columns linearly independent?\" means a pivot in every **column**.",
  sections: [
    {
      title: "Linear systems, augmented matrices and row operations",
      intuition:
        "Elimination only ever does three things to the equations: add a multiple of one equation to another, swap two equations, or multiply one by a nonzero number. Each move can be undone, so no solution is gained or lost. The augmented matrix is just bookkeeping that drops the variable names.",
      visuals: ["system-lines", "row-op-lines"],
      refs: [
        "Tutorial 1 Q2, Q12",
        "Slides 2.2 elementary row operations and elementary matrices (alg p7–8)",
        "Slides 2.2 Theorem 2.3 (alg p9)",
        "Additional practice problems (system $-m_1x + y = b_1$, $-m_2x + y = b_2$)",
        "PYP AY24/25 S2 Q5",
      ],
      keyIdeas: [
        "A system of $m$ linear equations in $n$ unknowns: each equation has the form $a_1x_1 + \\cdots + a_nx_n = b$. Its **coefficient matrix** $A$ is $m\\times n$ and its **augmented matrix** $[A \\mid \\mathbf{b}]$ is $m\\times(n+1)$.",
        "A linear system has **no solution**, **exactly one solution** or **infinitely many solutions**. It is **consistent** if it has at least one solution and **inconsistent** if it has none.",
        "**Elementary row operations**: (1) replacement $r_i \\leftarrow r_i + c\\,r_j$; (2) interchange $r_i \\leftrightarrow r_j$; (3) scaling $r_i \\leftarrow c\\,r_i$ with $c \\ne 0$.",
        "Each operation can be undone by one of the same type: $r_3 \\leftarrow r_3 - 4r_1$ is undone by $r_3 \\leftarrow r_3 + 4r_1$ (this is why every elementary matrix is invertible).",
        "Matrices are **row equivalent** if a sequence of elementary row operations turns one into the other. Row-equivalent augmented matrices describe systems with the **same solution set**, so row reduction never changes the answer.",
        "In two unknowns each equation is a line: the lines cross (exactly one solution), are parallel (no solution) or are the same line (infinitely many).",
      ],
      formulas: ["r_i \\leftarrow r_i + c\\,r_j, \\qquad r_i \\leftrightarrow r_j, \\qquad r_i \\leftarrow c\\,r_i\\ (c\\ne0)"],
      example: {
        problem:
          "Solve $x_1 + 2x_2 - x_3 = -1$, $\\ 2x_1 + 5x_2 + x_3 = 0$, $\\ -x_1 + x_2 + 4x_3 = 1$.",
        steps: [
          "Augmented matrix: $\\left[\\begin{array}{ccc|c} 1 & 2 & -1 & -1 \\\\ 2 & 5 & 1 & 0 \\\\ -1 & 1 & 4 & 1 \\end{array}\\right]$.",
          "$r_2 \\leftarrow r_2 - 2r_1$ and $r_3 \\leftarrow r_3 + r_1$: $\\left[\\begin{array}{ccc|c} 1 & 2 & -1 & -1 \\\\ 0 & 1 & 3 & 2 \\\\ 0 & 3 & 3 & 0 \\end{array}\\right]$.",
          "$r_3 \\leftarrow r_3 - 3r_2$: the last row becomes $[0\\ 0\\ -6 \\mid -6]$, so $x_3 = 1$.",
          "Back-substitute: $x_2 = 2 - 3x_3 = -1$, then $x_1 = -1 - 2x_2 + x_3 = -1 + 2 + 1 = 2$.",
          "Check in equation 3: $-2 + (-1) + 4 = 1$ ✓.",
        ],
        answer: "$(x_1, x_2, x_3) = (2, -1, 1)$, the unique solution.",
      },
      pitfalls: [
        "Scaling by $0$ is **not** allowed: it cannot be undone.",
        "\"$r_2 \\leftarrow r_1 + r_3$\" is not an elementary operation: a replacement must keep the row it replaces ($r_2 \\leftarrow r_2 + c\\,r_j$).",
        "Apply every operation to the **whole** augmented row, including the right-hand side.",
      ],
      recall: [
        { q: "Which operation undoes $r_3 \\leftarrow r_3 - 4r_1$?", a: "$r_3 \\leftarrow r_3 + 4r_1$." },
        { q: "What size is the augmented matrix of 4 equations in 6 unknowns?", a: "$4\\times7$." },
        { q: "What are the possible numbers of solutions of a linear system?", a: "None, exactly one, or infinitely many." },
      ],
    },
    {
      title: "Echelon form, RREF and pivots",
      intuition:
        "Echelon form is a staircase: each nonzero row starts further right than the row above it. That is already enough to see whether a solution exists. Going on to the **reduced** form, with 1s on the steps and zeros above them, lets you read off every solution.",
      refs: [
        "Tutorial 1 Q5, Q11, Q12",
        "PYP AY25/26 S1 Q8",
        "PYP AY21/22 S1 Q1(a), AY22/23 S1 Q1(a): working towards a reduced row echelon form by elementary row operations",
        "Slides 2.2 Theorem 2.4 (alg p10): $n$ pivot positions",
      ],
      keyIdeas: [
        "**Echelon form**: (1) any zero rows are at the bottom; (2) each leading (first nonzero) entry is in a column to the right of the leading entry of the row above; (3) all entries below a leading entry are zero.",
        "**Reduced row echelon form (RREF)**: in addition, (4) each leading entry is $1$ and (5) it is the only nonzero entry in its column.",
        "To row reduce: work from the left; pick a nonzero entry in the first column that is not all zero (swap it up if needed) and create zeros below it; repeat on the rows below. Then scale each leading entry to $1$ and create zeros above it.",
        "A **pivot position** is the position of a leading entry in an echelon form (a leading 1 in the RREF). A **pivot column** is a column of $A$ that contains a pivot position.",
        "A row or a column can contain at most one pivot, so an $m\\times n$ matrix has at most $\\min(m, n)$ pivots.",
      ],
      example: {
        problem:
          "Find the RREF and the pivot columns of $\\left[\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 1 \\\\ 2 & 4 & 1 & 0 & 8 \\\\ 1 & 2 & 2 & -3 & 7 \\end{array}\\right]$.",
        steps: [
          "$r_2 \\leftarrow r_2 - 2r_1$ and $r_3 \\leftarrow r_3 - r_1$: rows 2 and 3 both become $[0\\ 0\\ 3\\ {-6} \\mid 6]$.",
          "$r_3 \\leftarrow r_3 - r_2$ gives a zero row. Echelon form: $\\left[\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 1 \\\\ 0 & 0 & 3 & -6 & 6 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$. The leading entry of row 2 is in column 3, so column 2 has no pivot.",
          "Scale and clear upwards: $r_2 \\leftarrow \\tfrac13 r_2 = [0\\ 0\\ 1\\ {-2} \\mid 2]$, then $r_1 \\leftarrow r_1 + r_2 = [1\\ 2\\ 0\\ 1 \\mid 3]$.",
          "RREF: $\\left[\\begin{array}{cccc|c} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & -2 & 2 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right]$.",
        ],
        answer: "Pivot columns 1 and 3 (of the coefficient part). No pivot in the augmented column, so the system is consistent.",
      },
      pitfalls: [
        "A pivot is the **first** nonzero entry of its row. A row $[0\\ 0\\ 3\\ {-6}]$ has its pivot in column 3, not column 4.",
        "Pivot columns are columns of the **original** $A$, found by looking at an echelon form.",
        "Echelon form only needs zeros **below** the leading entries; the RREF also needs zeros **above** them and leading entries equal to $1$.",
      ],
      recall: [
        { q: "Can a $3\\times5$ matrix have 4 pivot positions?", a: "No. At most one pivot per row, so at most 3." },
        { q: "What two extra conditions turn an echelon form into the RREF?", a: "Every leading entry is 1, and each leading 1 is the only nonzero entry in its column." },
        { q: "A homogeneous system of 5 equations in 4 unknowns has 4 pivots. How many solutions?", a: "Exactly one (the trivial solution): a pivot in every one of the 4 variable columns, so no free variables (Tutorial 1 Q12)." },
      ],
    },
    {
      title: "Leading and free variables; the general solution",
      intuition:
        "In the RREF, each nonzero row says \"this leading variable equals a constant minus some free variables\". The free variables can be anything you like, so you name them as parameters, and the solution set becomes one fixed vector plus combinations of a few direction vectors.",
      refs: [
        "Additional practice problems (leading variables, free variables, general solution)",
        "Tutorial 1 Q11",
        "Slides 4.4 Exercise 4.4.2 (vsp p19): set the free variable",
        "PYP AY21/22 S1 Q1(c): complete solution $\\mathbf{x} = \\mathbf{p} + c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2$",
      ],
      keyIdeas: [
        "Variables in pivot columns are **leading** (basic) variables; the others are **free** variables. For a consistent system, #free variables $= n - (\\#\\text{pivots of } A)$.",
        "**General solution**: solve each nonzero RREF row for its leading variable in terms of the free variables, and let the free variables be parameters $s, t, \\dots$.",
        "In vector form (the **complete solution**): $\\mathbf{x} = \\mathbf{p} + s\\mathbf{v}_1 + t\\mathbf{v}_2 + \\cdots$. $\\mathbf{p}$ is the solution with all free variables $= 0$; each $\\mathbf{v}_i$ has a $1$ in its own free slot, $0$ in the other free slots, and **minus** the RREF entries in the leading slots.",
        "One free variable gives a line of solutions, two give a plane.",
      ],
      formulas: ["\\mathbf{x} = \\mathbf{p} + s\\,\\mathbf{v}_1 + t\\,\\mathbf{v}_2, \\qquad s, t \\in \\mathbb{R}"],
      example: {
        problem:
          "(Additional practice) $\\ w + x + y + z = 6$, $\\ w + y + z = 4$, $\\ w + y = 2$. List the leading and free variables and write the general solution. What happens if the equation $-2w + y = 5$ is added? What if $-2w - 2y = -3$ is added instead?",
        steps: [
          "Augmented matrix $\\left[\\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 6 \\\\ 1 & 0 & 1 & 1 & 4 \\\\ 1 & 0 & 1 & 0 & 2 \\end{array}\\right]$ (columns $w, x, y, z$).",
          "$r_2 \\leftarrow r_2 - r_1$: $[0\\ {-1}\\ 0\\ 0 \\mid {-2}]$. $\\ r_3 \\leftarrow r_3 - r_1$: $[0\\ {-1}\\ 0\\ {-1} \\mid {-4}]$. $\\ r_3 \\leftarrow r_3 - r_2$: $[0\\ 0\\ 0\\ {-1} \\mid {-2}]$.",
          "Scale rows 2 and 3 by $-1$, then $r_1 \\leftarrow r_1 - r_2 - r_3$. RREF: $\\left[\\begin{array}{cccc|c} 1 & 0 & 1 & 0 & 2 \\\\ 0 & 1 & 0 & 0 & 2 \\\\ 0 & 0 & 0 & 1 & 2 \\end{array}\\right]$.",
          "Pivots in the $w, x, z$ columns: leading variables $w, x, z$; free variable $y$. With $y = t$: $w = 2 - t$, $x = 2$, $z = 2$, i.e. $(w, x, y, z) = (2 - t,\\ 2,\\ t,\\ 2) = [2, 2, 0, 2]^T + t[-1, 0, 1, 0]^T$.",
          "Adding $-2w + y = 5$: $-2(2 - t) + t = 5 \\Rightarrow 3t = 9 \\Rightarrow t = 3$, the single solution $(-1, 2, 3, 2)$. Check: $-1 + 2 + 3 + 2 = 6$ ✓, $-1 + 3 + 2 = 4$ ✓, $-1 + 3 = 2$ ✓, $2 + 3 = 5$ ✓.",
          "Adding $-2w - 2y = -3$ instead: $-2(2 - t) - 2t = -4$ for every $t$, never $-3$. The new system has **no solution**.",
        ],
        answer: "Leading $w, x, z$; free $y$; general solution $(2 - t, 2, t, 2)$. With $-2w + y = 5$: only $(-1, 2, 3, 2)$. With $-2w - 2y = -3$: inconsistent.",
      },
      pitfalls: [
        "Sign slip: moving a free variable across the equals sign flips its sign. An RREF entry $+2$ in a free column becomes $-2$ in the direction vector.",
        "Do not forget the $1$ in the free variable's own slot (and $0$ in the other free slots).",
        "Two answers that look different can describe the same set of solutions. Test an option by substituting it into the equations, not by comparing it entry by entry with yours.",
      ],
      recall: [
        { q: "A consistent system in 6 unknowns has 4 pivots. How many free variables?", a: "$6 - 4 = 2$." },
        { q: "What is $\\mathbf{p}$ in $\\mathbf{x} = \\mathbf{p} + s\\mathbf{v}_1 + t\\mathbf{v}_2$?", a: "The solution obtained by setting all free variables to $0$." },
        { q: "RREF row $x_1 - 4x_3 = 5$ with $x_3$ free. What is $x_1$?", a: "$x_1 = 5 + 4x_3$." },
      ],
    },
    {
      title: "Existence and uniqueness; systems with a parameter",
      intuition:
        "Two separate questions, answered by two places in the echelon form. **Existence** depends on the last column: the system is inconsistent exactly when some row says $0 = c$ with $c \\ne 0$. **Uniqueness** depends on the coefficient columns: are there free variables?",
      refs: [
        "Tutorial 1 Q1, Q2",
        "PYP AY24/25 S2 Q5",
        "PYP AY22/23 S1 Q1(a): value of $a$ for infinitely many solutions",
        "PYP AY21/22 S1 Q1(a): coefficients $a, b, c$ from a given solution",
        "PYP (written papers): $p$ for which $A\\mathbf{x} = [3, 9, p]^T$ is consistent",
        "Additional practice problems (when is $-m_1x + y = b_1$, $-m_2x + y = b_2$ consistent?)",
        "Slides 2.2 Theorem 2.4 (alg p10); Slides 3.1 Rule 8 (det p8)",
      ],
      keyIdeas: [
        "A system is **inconsistent** exactly when an echelon form of $[A \\mid \\mathbf{b}]$ has a row $[0\\ \\cdots\\ 0 \\mid c]$ with $c \\ne 0$ (the equation $0 = c$).",
        "If it is consistent: **exactly one** solution when there are no free variables (a pivot in every column of $A$), **infinitely many** when there is at least one free variable.",
        "**With a parameter** ($a$, $k$, $\\lambda$): eliminate *without dividing by expressions in the parameter*, reach a last row like $[0\\ 0\\ f(a) \\mid g(a)]$, then split into cases: $f(a)\\ne0$ → exactly one; $f(a)=0, g(a)=0$ → infinitely many; $f(a)=0, g(a)\\ne0$ → none.",
        "For a **square** $A$ (Theorem 2.4 with Rule 8 of determinants): $A$ has $n$ pivots ⟺ $A$ is invertible ⟺ $|A| \\ne 0$, and then $A\\mathbf{x} = \\mathbf{b}$ has exactly one solution for every $\\mathbf{b}$. So the special parameter values are the roots of $|A| = 0$, and each root must still be tested for none vs infinitely many. For $2\\times2$: $|A| = ad - bc$.",
        "**Find a constant so the system is consistent** (e.g. $\\mathbf{b} = [b_1, b_2, p]^T$): reduce $[A \\mid \\mathbf{b}]$ with the letter in it; the zero row of $A$ must have $0$ on the right.",
        "**Find unknown coefficients from a known solution**: substitute the solution; each equation becomes an equation in the unknown coefficients.",
      ],
      formulas: ["\\left[\\begin{array}{ccc|c} * & * & * & * \\\\ 0 & * & * & * \\\\ 0 & 0 & f(a) & g(a) \\end{array}\\right] \\quad\\Rightarrow\\quad \\begin{cases} f\\ne0: & \\text{exactly one} \\\\ f=0,\\ g=0: & \\text{infinitely many} \\\\ f=0,\\ g\\ne0: & \\text{none} \\end{cases}"],
      example: {
        problem:
          "For which $a$ does $x + y + z = 2$, $\\ x + 2y - z = 1$, $\\ 2x + 3y + (a^2 - 9)z = a$ have (i) no solution, (ii) infinitely many solutions, (iii) exactly one solution? (Same type as Tutorial 1 Q2.)",
        steps: [
          "$r_2 \\leftarrow r_2 - r_1$: $[0\\ 1\\ {-2} \\mid {-1}]$. $\\ r_3 \\leftarrow r_3 - 2r_1$: $[0\\ 1\\ a^2 - 11 \\mid a - 4]$.",
          "$r_3 \\leftarrow r_3 - r_2$: $[0\\ 0\\ a^2 - 9 \\mid a - 3] = [0\\ 0\\ (a-3)(a+3) \\mid a - 3]$.",
          "$a \\ne \\pm3$: pivot in every column, **exactly one** solution.",
          "$a = 3$: the row is $[0\\ 0\\ 0 \\mid 0]$, $z$ is free, **infinitely many** solutions.",
          "$a = -3$: the row is $[0\\ 0\\ 0 \\mid -6]$, i.e. $0 = -6$: **no solution**.",
        ],
        answer: "(i) $a = -3$; (ii) $a = 3$; (iii) $a \\ne \\pm 3$.",
      },
      pitfalls: [
        "Never divide by $(a - 3)$ or $(a^2-9)$ mid-reduction; you would silently throw away the special cases.",
        "The two roots of $f(a)$ usually behave **differently**: one gives $0 = 0$, the other $0 = c$. Answering \"$a = \\pm3$\" for *no solution* is the classic trap (compare Tutorial 1 Q2: none at $a = -4$, infinitely many at $a = 4$).",
        "A zero row $[0\\ \\cdots\\ 0 \\mid 0]$ does **not** automatically mean infinitely many solutions (e.g. 3 equations, 2 unknowns, 2 pivots: exactly one). Count pivots against the number of unknowns.",
      ],
      recall: [
        { q: "When is a system inconsistent?", a: "Exactly when an echelon form of the augmented matrix has a row $[0\\ \\cdots\\ 0\\mid c]$ with $c\\ne0$." },
        { q: "A consistent system has a free variable. How many solutions?", a: "Infinitely many." },
        { q: "$kx + 2y = 1$, $8x + ky = 2$: which $k$ need special attention, and what happens there?", a: "$|A| = k^2 - 16 = 0$: $k = \\pm4$. $k = 4$: the second equation is twice the first, infinitely many. $k = -4$: $8x - 4y = 2$ but $-2\\times$(first) gives $8x - 4y = -2$, no solution." },
      ],
    },
    {
      title: "$A\\mathbf{x} = \\mathbf{b}$, linear combinations and span",
      intuition:
        "$A\\mathbf{x}$ is a **combination of the columns of $A$** with weights from $\\mathbf{x}$. So solving $A\\mathbf{x} = \\mathbf{b}$ asks: can $\\mathbf{b}$ be built from the columns? The set of everything that can be built is the span, and the pivots of $A$ tell you whether it fills all of $\\mathbb{R}^m$.",
      visuals: ["span-3d"],
      refs: [
        "Slides 0B Matrix products as linear combinations (mtx p12)",
        "Slides 2.2 Theorem 1.2, recalled from Chapter 1 (alg p11)",
        "Slides 4.5 (vsp p24): columns of $A$ span $\\mathbb{R}^m$ iff $A\\mathbf{x} = \\mathbf{b}$ has a solution for each $\\mathbf{b}$",
        "Slides 4.3 (vsp p15): definition of Span",
        "Tutorial 1 Q3, Q4, Q5",
        "PYP AY21/22 S1 Q1(b): do the vectors span a line, a plane or $\\mathbb{R}^3$?",
        "PYP AY22/23 S1 Q1(b): does $\\mathbf{w}$ belong to $\\operatorname{Span}\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$?",
      ],
      keyIdeas: [
        "$A\\mathbf{x} = x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n$: a linear combination of the columns of $A$ with the entries of $\\mathbf{x}$ as weights. So the **system**, the **vector equation** $x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n = \\mathbf{b}$ and the **matrix equation** $A\\mathbf{x} = \\mathbf{b}$ are the same problem, with augmented matrix $[\\mathbf{a}_1 \\cdots \\mathbf{a}_n \\mid \\mathbf{b}]$.",
        "$\\operatorname{Span}\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ is the set of all linear combinations $c_1\\mathbf{v}_1 + \\cdots + c_p\\mathbf{v}_p$. It contains $\\mathbf{0}$ and each $\\mathbf{v}_i$, and infinitely many vectors as soon as one $\\mathbf{v}_i \\ne \\mathbf{0}$.",
        "In $\\mathbb{R}^3$: the span of one nonzero vector is a line through the origin; of two vectors that are not multiples of each other, a plane through the origin; three vectors with 3 pivots span all of $\\mathbb{R}^3$.",
        "$\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\dots,\\mathbf{a}_n\\}$ **iff** $A\\mathbf{x} = \\mathbf{b}$ is consistent.",
        "**Theorem 1.2**: for an $m\\times n$ matrix $A$ these are equivalent: (a) for each $\\mathbf{b}\\in\\mathbb{R}^m$, $A\\mathbf{x}=\\mathbf{b}$ has a solution; (b) each $\\mathbf{b}\\in\\mathbb{R}^m$ is a linear combination of the columns of $A$; (c) the columns of $A$ span $\\mathbb{R}^m$; (d) $A$ has a pivot position in **every row**.",
        "Consequence: if $n < m$, the columns can never span $\\mathbb{R}^m$ (at most $n$ pivots for $m$ rows).",
        "If $\\mathbf{u}$ and $\\mathbf{v}$ are in $\\operatorname{Span}\\{\\mathbf{w}_1,\\mathbf{w}_2,\\mathbf{w}_3\\}$, so is $\\mathbf{u}+\\mathbf{v}$: add the two combinations and collect the coefficients of each $\\mathbf{w}_i$ (Tutorial 1 Q4).",
      ],
      formulas: ["A\\mathbf{x} = \\begin{bmatrix}\\mathbf{a}_1 & \\cdots & \\mathbf{a}_n\\end{bmatrix}\\begin{bmatrix}x_1\\\\ \\vdots\\\\ x_n\\end{bmatrix} = x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n"],
      example: {
        problem:
          "Let $\\mathbf{a}_1 = [1, 0, -2]^T$, $\\mathbf{a}_2 = [2, 1, -1]^T$, $\\mathbf{b} = [4, 1, h]^T$. For which $h$ is $\\mathbf{b}\\in\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$? Do $\\mathbf{a}_1, \\mathbf{a}_2$ span $\\mathbb{R}^3$?",
        steps: [
          "Augmented matrix $\\left[\\begin{array}{cc|c} 1 & 2 & 4 \\\\ 0 & 1 & 1 \\\\ -2 & -1 & h \\end{array}\\right]$ (the vectors go in as **columns**).",
          "$r_3 \\leftarrow r_3 + 2r_1$: $[0\\ 3 \\mid h + 8]$. Then $r_3 \\leftarrow r_3 - 3r_2$: $[0\\ 0 \\mid h + 5]$.",
          "Consistent iff $h + 5 = 0$, i.e. $h = -5$. Then $x_2 = 1$, $x_1 = 2$: $\\mathbf{b} = 2\\mathbf{a}_1 + \\mathbf{a}_2$. Check the third entry: $2(-2) + (-1) = -5$ ✓.",
          "Two columns give at most 2 pivots for 3 rows, so by Theorem 1.2 they do not span $\\mathbb{R}^3$; their span is a plane through the origin.",
        ],
        answer: "$h = -5$; no, $\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ is a plane through the origin.",
      },
      pitfalls: [
        "The vectors go in as **columns** of the augmented matrix, not rows.",
        "\"Pivot in every row\" (spanning, always consistent) is different from \"pivot in every column\" (independence, uniqueness). Read which one the question needs.",
        "$\\{\\mathbf{a}_1,\\mathbf{a}_2,\\mathbf{a}_3\\}$ has 3 vectors, but $\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2,\\mathbf{a}_3\\}$ has infinitely many (Tutorial 1 Q3).",
        "Checking $[A\\mid\\mathbf{b}]$ for *one* $\\mathbf{b}$ says nothing about *every* $\\mathbf{b}$; for that, count the pivots of $A$ itself.",
      ],
      recall: [
        { q: "$A\\mathbf{x}$ is a linear combination of what?", a: "Of the columns of $A$, with the entries of $\\mathbf{x}$ as weights." },
        { q: "When do the columns of a $4\\times6$ matrix span $\\mathbb{R}^4$?", a: "When $A$ has a pivot in every row, i.e. 4 pivots (Theorem 1.2)." },
        { q: "Can the columns of a $5\\times3$ matrix span $\\mathbb{R}^5$?", a: "Never: at most 3 pivots for 5 rows." },
      ],
    },
    {
      title: "Homogeneous systems and the complete solution",
      intuition:
        "$A\\mathbf{x} = \\mathbf{0}$ always has the solution $\\mathbf{x} = \\mathbf{0}$; the question is whether there are others, and that is again a free-variable question. Reading a complete solution backwards tells you the pivots and the RREF.",
      refs: [
        "Tutorial 1 Q1, Q6, Q7, Q11, Q12",
        "Slides 4.4 (vsp p19–20): solutions of $A\\mathbf{x} = \\mathbf{0}$",
        "Slides 2.2 Theorem 2.4 (alg p10); Slides 3.1 Rule 8 (det p8)",
        "PYP AY25/26 S1 Q8; AY24/25 S2 Q8; AY21/22 S1 Q1(c): RREF $R$ and $\\mathbf{d}$ from a complete solution",
        "PYP AY25/26 S2 Q10",
        "PYP (written papers): find $t$ so that $A\\mathbf{x} = \\mathbf{0}$ has 3 free variables",
      ],
      keyIdeas: [
        "A **homogeneous** system $A\\mathbf{x} = \\mathbf{0}$ is always consistent: $\\mathbf{x} = \\mathbf{0}$ is the **trivial** solution.",
        "It has a **nontrivial** solution iff it has at least one free variable, i.e. iff $A$ has fewer pivots than columns.",
        "**More unknowns than equations** ($n > m$) ⇒ at most $m$ pivots for $n$ columns ⇒ a free variable ⇒ nontrivial solutions always exist.",
        "For a **square** $A$: $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution ⟺ $A$ is invertible (Theorem 2.4) ⟺ $|A| \\ne 0$ (Rule 8). So \"find $k$ for a non-trivial solution\" means solving $|A| = 0$ (Tutorial 1 Q1).",
        "In a complete solution $\\mathbf{x} = \\mathbf{p} + c\\mathbf{v}_1 + d\\mathbf{v}_2$, the vector $\\mathbf{p}$ solves $A\\mathbf{x} = \\mathbf{b}$, and the combinations $c\\mathbf{v}_1 + d\\mathbf{v}_2$ are the solutions of $A\\mathbf{x} = \\mathbf{0}$ (same RREF, right-hand column replaced by zeros).",
        "**Reading backwards**: #parameters = #free variables; #pivots $= n - $ #free; each RREF row is \"leading variable $+$ (**negated** direction entries) $\\times$ free variables $=$ that entry of $\\mathbf{p}$\"; the remaining rows are zero.",
        "If a $3\\times3$ $A$ has $A\\mathbf{x} = \\mathbf{y}$ with no solution for some $\\mathbf{y}$, then $A$ has fewer than 3 pivots, so there is a free variable and **no** $A\\mathbf{x} = \\mathbf{z}$ has exactly one solution (Tutorial 1 Q7).",
      ],
      example: {
        problem:
          "(Tutorial 1 Q11) The solution of $A\\mathbf{x} = \\mathbf{b}$ ($A$ is $3\\times3$) is $\\mathbf{x} = [5, 0, 0]^T + c[3, 1, 0]^T + d[2, 0, 1]^T$, $c, d\\in\\mathbb{R}$. Find the RREF of $A$, and describe the solutions of $A\\mathbf{x} = \\mathbf{0}$.",
        steps: [
          "Two parameters, attached to $x_2 = c$ and $x_3 = d$: $x_2, x_3$ are free and $x_1$ is the only leading variable, so $A$ has $3 - 2 = 1$ pivot.",
          "Read the first component: $x_1 = 5 + 3x_2 + 2x_3$, i.e. $x_1 - 3x_2 - 2x_3 = 5$.",
          "So the RREF is $\\begin{bmatrix} 1 & -3 & -2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ (and the reduced right-hand side is $[5, 0, 0]^T$). Note $-3, -2$ in the RREF against $+3, +2$ in the direction vectors.",
          "The solutions of $A\\mathbf{x} = \\mathbf{0}$ are $c[3,1,0]^T + d[2,0,1]^T$: a plane through the origin.",
        ],
        answer: "RREF $= \\begin{bmatrix} 1 & -3 & -2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ (option (e) in the tutorial); $A\\mathbf{x} = \\mathbf{0}$ has solutions $c[3,1,0]^T + d[2,0,1]^T$.",
      },
      pitfalls: [
        "\"$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution\" does not mean $A\\mathbf{x} = \\mathbf{b}$ is always solvable when $A$ is not square (a $5\\times4$ matrix with 4 pivots misses some $\\mathbf{b}$). It means solutions, when they exist, are unique.",
        "When recovering the RREF from a solution, the free columns get the **negatives** of the direction-vector entries, and the number of zero rows is $m - $ #pivots.",
      ],
      recall: [
        { q: "Does a homogeneous system of 3 equations in 5 unknowns have a nontrivial solution?", a: "Yes, always: at most 3 pivots for 5 unknowns, so at least 2 free variables." },
        { q: "Give a $2\\times2$ matrix $A$ whose solution set of $A\\mathbf{x} = \\mathbf{0}$ is the line through $(4, 1)$ and the origin.", a: "For example $\\begin{bmatrix} 1 & -4 \\\\ 1 & -4 \\end{bmatrix}$: both rows say $x_1 = 4x_2$ (Tutorial 1 Q6)." },
        { q: "$A$ is $3\\times3$ and $A\\mathbf{x} = \\mathbf{y}$ has no solution for some $\\mathbf{y}$. Is there a $\\mathbf{z}$ with exactly one solution of $A\\mathbf{x} = \\mathbf{z}$?", a: "No. Fewer than 3 pivots means a free variable, so every consistent $A\\mathbf{x} = \\mathbf{z}$ has infinitely many solutions (Tutorial 1 Q7)." },
      ],
    },
    {
      title: "Linear independence",
      intuition:
        "Vectors are independent when none of them is redundant. In matrix language, the only way to combine the columns into $\\mathbf{0}$ is with all weights zero, which is the homogeneous system having only the trivial solution.",
      refs: [
        "Slides 4.7 (vsp p29–30): definition; one vector, two vectors, sets containing $\\mathbf{0}$; Theorem 4.4",
        "Slides 2.2 Theorem 2.4 (alg p10): (4) ⟺ (5); Slides 3.1 Rule 8 (det p8)",
        "Tutorial 1 Q8",
        "PYP AY25/26 S1 Q9",
        "PYP AY2021-S2 Q1(c): $[1,1,1]^T, [a,b,c]^T, [a^2,b^2,c^2]^T$",
        "PYP (written papers): are $\\mathbf{u}+\\mathbf{v}$, $\\mathbf{u}-\\mathbf{v}$, $\\mathbf{u}-2\\mathbf{v}+\\mathbf{w}$ independent?; columns of every $3\\times5$ matrix are dependent",
        "Additional practice problems Q.19, Q.23",
      ],
      keyIdeas: [
        "$\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ is **linearly independent** if $x_1\\mathbf{v}_1 + \\cdots + x_p\\mathbf{v}_p = \\mathbf{0}$ has only the trivial solution; it is **linearly dependent** if there are weights $c_1, \\dots, c_p$, not all zero, with $c_1\\mathbf{v}_1 + \\cdots + c_p\\mathbf{v}_p = \\mathbf{0}$.",
        "The columns of $A$ are independent **iff** $A\\mathbf{x}=\\mathbf{0}$ has only the trivial solution **iff** $A$ has a pivot in **every column**.",
        "One vector is independent iff it is nonzero; two vectors are dependent iff one is a multiple of the other; any set containing $\\mathbf{0}$ is dependent.",
        "**Theorem 4.4**: a set $\\{\\mathbf{v}_1,\\dots,\\mathbf{v}_p\\}$ of two or more vectors with $\\mathbf{v}_1\\ne\\mathbf{0}$ is dependent iff some $\\mathbf{v}_j$ ($j > 1$) is a linear combination of the preceding vectors. (So *some* vector is redundant, not necessarily every one.)",
        "**More vectors than entries** ($p > n$ in $\\mathbb{R}^n$) ⇒ at most $n$ pivots for $p$ columns ⇒ dependent.",
        "$n$ vectors in $\\mathbb{R}^n$: independent iff $A = [\\mathbf{v}_1\\cdots\\mathbf{v}_n]$ has $n$ pivots iff $|A|\\ne0$ (Theorem 2.4, Rule 8). With a parameter, row reduce and find when a pivot becomes $0$.",
        "**Combinations of independent vectors**: to test $\\{\\mathbf{u}+\\mathbf{v},\\ \\mathbf{u}-\\mathbf{v},\\ \\mathbf{u}-2\\mathbf{v}+\\mathbf{w}\\}$ when $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ are independent, set $c_1(\\mathbf{u}+\\mathbf{v}) + c_2(\\mathbf{u}-\\mathbf{v}) + c_3(\\mathbf{u}-2\\mathbf{v}+\\mathbf{w}) = \\mathbf{0}$ and collect: $(c_1+c_2+c_3)\\mathbf{u} + (c_1-c_2-2c_3)\\mathbf{v} + c_3\\mathbf{w} = \\mathbf{0}$. Independence of $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ makes each bracket $0$, a homogeneous system in $c_1, c_2, c_3$; here it forces $c_3 = 0$, then $c_1 = c_2 = 0$, so the set is independent.",
      ],
      formulas: ["x_1\\mathbf{v}_1 + \\cdots + x_p\\mathbf{v}_p = \\mathbf{0} \\ \\text{has only the trivial solution} \\iff \\text{independent}"],
      example: {
        problem: "For which $h$ are $\\mathbf{v}_1 = [1, 2, -1]^T$, $\\mathbf{v}_2 = [0, 1, 3]^T$, $\\mathbf{v}_3 = [2, h, 1]^T$ linearly dependent?",
        steps: [
          "Put the vectors in as **columns**: $\\begin{bmatrix} 1 & 0 & 2 \\\\ 2 & 1 & h \\\\ -1 & 3 & 1 \\end{bmatrix}$.",
          "$r_2 \\leftarrow r_2 - 2r_1$: $[0\\ 1\\ h-4]$. $\\ r_3 \\leftarrow r_3 + r_1$: $[0\\ 3\\ 3]$.",
          "$r_3 \\leftarrow r_3 - 3r_2$: $[0\\ 0\\ 3 - 3(h-4)] = [0\\ 0\\ 15 - 3h]$.",
          "No pivot in column 3 (a free variable, so a nontrivial solution of $A\\mathbf{x} = \\mathbf{0}$) iff $15 - 3h = 0$, i.e. $h = 5$.",
        ],
        answer: "Dependent exactly when $h = 5$ (then $\\mathbf{v}_3 = 2\\mathbf{v}_1 + \\mathbf{v}_2$); independent for $h \\ne 5$.",
      },
      pitfalls: [
        "\"Three vectors in $\\mathbb{R}^4$ are independent\" is not automatic. Few vectors can still be dependent; only *too many* vectors force dependence.",
        "\"If $\\{\\mathbf{v}_1,\\mathbf{v}_2,\\mathbf{v}_3\\}$ is dependent then $\\mathbf{v}_3$ is a combination of $\\mathbf{v}_1, \\mathbf{v}_2$\" is **False** (e.g. $\\mathbf{v}_2 = 2\\mathbf{v}_1$ with $\\mathbf{v}_3$ unrelated).",
        "Before row reducing with a parameter, look for two parallel vectors or two proportional rows: then the answer is \"dependent for every value\" (Tutorial 1 Q8: answer \"all values of $h$\").",
        "For combinations, the conclusion needs $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ to be independent. Without that, \"not enough information\", unless a nontrivial choice of $c_i$ makes every bracket zero (then dependent regardless).",
      ],
      recall: [
        { q: "Are any 4 vectors in $\\mathbb{R}^3$ dependent?", a: "Yes: more vectors than entries (at most 3 pivots for 4 columns)." },
        { q: "Columns of $A$ independent ⟺ ?", a: "$A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution ⟺ a pivot in every column." },
        { q: "When are $(p, q)$ and $(r, s)$ linearly dependent?", a: "When one is a multiple of the other, i.e. $ps = qr$ (Additional practice Q.23)." },
      ],
    },
  ],
  playbook: [
    "If you see a system with a parameter ($a$, $k$, $\\lambda$) → eliminate without dividing by the parameter, get the last row $[0\\ 0\\ f \\mid g]$, then test each root of $f$ separately: $g = 0$ → infinitely many, $g \\ne 0$ → none.",
    "If you see \"unique solution for all $\\lambda$ except…\" with a square system → solve $|A| = 0$; then check each root for none vs infinitely many.",
    "If you see \"find $p$ / $h$ so that the system is consistent\" or \"is $\\mathbf{b}\\in\\operatorname{Span}$?\" → row reduce $[A \\mid \\mathbf{b}]$ with the letter in it and set the entry beside the zero row of $A$ to $0$.",
    "If you see \"find $a, b, c$ so that $(x, y, z) = \\dots$ is a solution\" → substitute and solve for the coefficients.",
    "If you see \"homogeneous… nontrivial solution\" → square: $|A| = 0$; more unknowns than equations: always yes.",
    "If you see a complete solution $\\mathbf{p} + c\\mathbf{v}_1 + d\\mathbf{v}_2$ → #parameters = #free variables, #pivots $= n - $ #free; the RREF rows have the **negated** direction entries in the free columns and $\\mathbf{p}$'s leading entries on the right.",
    "If you see \"does $A\\mathbf{x} = \\mathbf{b}$ have a solution for every $\\mathbf{b}$\" or \"do the columns span $\\mathbb{R}^m$\" → count pivots of $A$: need one in **every row** (Theorem 1.2).",
    "If you see \"unique\", \"only the trivial solution\" or \"columns independent\" → need a pivot in **every column**.",
    "If you see an augmented echelon form → first scan for $[0\\ \\cdots\\ 0 \\mid c\\ne0]$ (inconsistent), *then* count free variables.",
    "If you see \"find $t$ so that $A\\mathbf{x} = \\mathbf{0}$ has $k$ free variables\" → you need exactly $n - k$ pivots; find the $t$ that turns the extra row into a zero row.",
    "If you see vectors with a parameter (e.g. $[1,x,0],[0,x^2,1],[0,1,x]$) → put them in as columns and row reduce (or solve $|A| = 0$); dependent exactly when a pivot vanishes.",
    "If you see more vectors than entries, or a set containing $\\mathbf{0}$ → dependent, no computation needed.",
    "If you see combinations like $\\mathbf{u}+\\mathbf{v}, \\mathbf{u}-\\mathbf{v}, \\mathbf{u}-2\\mathbf{v}+\\mathbf{w}$ → set $c_1(\\dots) + c_2(\\dots) + c_3(\\dots) = \\mathbf{0}$, collect the coefficients of $\\mathbf{u},\\mathbf{v},\\mathbf{w}$, set each to $0$ and solve for the $c_i$.",
    "If you see \"$A$ is $3\\times3$ and $A\\mathbf{x}=\\mathbf{y}$ has no solution for some $\\mathbf{y}$\" → fewer than 3 pivots, so $A\\mathbf{x}=\\mathbf{0}$ has nontrivial solutions and **no** $A\\mathbf{x}=\\mathbf{z}$ has exactly one solution.",
  ],
};
