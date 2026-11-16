import type { Lesson } from "@/lib/types";

export const vectorsLesson: Lesson = {
  topic: "vectors",
  bigPicture:
    "Vectors are the language of the whole course: a vector is an arrow with a length and a direction, and once you fix the origin it is just a list of numbers. The chain goes: arrows (add head-to-tail, stretch by scalars) → components in $\\mathbb{R}^2$, $\\mathbb{R}^3$, $\\mathbb{R}^n$ and linear combinations → length, unit vectors and distance → the dot product, which turns angles and perpendicularity into arithmetic → norm identities (parallelogram law, Cauchy–Schwarz) → the cross product in $\\mathbb{R}^3$, which manufactures normals and areas → lines and planes written in point–normal, general, vector and parametric form, and how they meet. Final-exam questions here are short but multi-step: build a normal with a cross product, substitute a parametric line into a plane, or recover $\\|\\mathbf{v}\\|$ and $\\mathbf{u}\\cdot\\mathbf{v}$ from norms of sums and differences.",
  sections: [
    {
      title: "Geometric vectors: arrows, addition and scalar multiples",
      intuition:
        "A vector only remembers how far and which way, not where it starts. Adding vectors means following arrows head-to-tail, and multiplying by a scalar stretches, shrinks or flips the arrow.",
      visuals: ["vector-arith"],
      keyIdeas: [
        "The vector $\\overrightarrow{AB}$ has **initial point** $A$ and **terminal point** $B$. Its length is the magnitude, and the arrowhead gives the direction.",
        "**Equivalent (equal) vectors** have the same length and the same direction, wherever they are drawn. Translating an arrow does not change the vector. The **zero vector** $\\mathbf{0}$ has length 0 and no definite direction.",
        "**Parallelogram rule**: put $\\mathbf{u}$ and $\\mathbf{v}$ tail to tail; $\\mathbf{u}+\\mathbf{v}$ is the diagonal from the common tail. **Triangle rule**: put the tail of $\\mathbf{v}$ at the head of $\\mathbf{u}$; $\\mathbf{u}+\\mathbf{v}$ runs from the tail of $\\mathbf{u}$ to the head of $\\mathbf{v}$. Both give the same vector, so $\\mathbf{u}+\\mathbf{v} = \\mathbf{v}+\\mathbf{u}$.",
        "$-\\mathbf{v}$ has the same length as $\\mathbf{v}$ and the opposite direction. $\\mathbf{u}-\\mathbf{v} = \\mathbf{u}+(-\\mathbf{v})$: with the tails together, it is the arrow **from the head of $\\mathbf{v}$ to the head of $\\mathbf{u}$**.",
        "$k\\mathbf{v}$ has length $|k|\\,\\|\\mathbf{v}\\|$. It points the same way as $\\mathbf{v}$ if $k>0$ and the opposite way if $k<0$; $k\\mathbf{v} = \\mathbf{0}$ if $k = 0$ or $\\mathbf{v} = \\mathbf{0}$.",
        "**Parallel = collinear**: $\\mathbf{u}$ and $\\mathbf{v}$ are parallel if one is a scalar multiple of the other ($k$ may be negative). $\\mathbf{0}$ is parallel to every vector. Points $A, B, C$ are collinear iff $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel.",
      ],
      formulas: [
        "\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}, \\qquad \\overrightarrow{BA} = -\\overrightarrow{AB}",
        "\\mathbf{u}-\\mathbf{v} = \\mathbf{u}+(-\\mathbf{v}), \\qquad \\|k\\mathbf{v}\\| = |k|\\,\\|\\mathbf{v}\\|",
      ],
      example: {
        problem:
          "$ABCD$ is a parallelogram with $\\overrightarrow{AB} = \\mathbf{u}$ and $\\overrightarrow{AD} = \\mathbf{v}$. $M$ is the midpoint of $CD$. Express $\\overrightarrow{AC}$, $\\overrightarrow{BD}$, $\\overrightarrow{AM}$ and $\\overrightarrow{AC}-\\overrightarrow{BD}$ in terms of $\\mathbf{u}$ and $\\mathbf{v}$.",
        steps: [
          "Triangle rule along $A\\to B\\to C$: $\\overrightarrow{AC} = \\overrightarrow{AB}+\\overrightarrow{BC} = \\mathbf{u}+\\mathbf{v}$, since $\\overrightarrow{BC}$ is equivalent to $\\overrightarrow{AD} = \\mathbf{v}$.",
          "$\\overrightarrow{BD} = \\overrightarrow{BA}+\\overrightarrow{AD} = -\\mathbf{u}+\\mathbf{v} = \\mathbf{v}-\\mathbf{u}$ (head of $\\mathbf{u}$ to head of $\\mathbf{v}$).",
          "$\\overrightarrow{DC}$ is equivalent to $\\overrightarrow{AB} = \\mathbf{u}$, so $\\overrightarrow{DM} = \\tfrac12\\mathbf{u}$ and $\\overrightarrow{AM} = \\overrightarrow{AD}+\\overrightarrow{DM} = \\mathbf{v}+\\tfrac12\\mathbf{u}$.",
          "$\\overrightarrow{AC}-\\overrightarrow{BD} = (\\mathbf{u}+\\mathbf{v})-(\\mathbf{v}-\\mathbf{u}) = 2\\mathbf{u}$.",
        ],
        answer: "$\\overrightarrow{AC} = \\mathbf{u}+\\mathbf{v}$, $\\overrightarrow{BD} = \\mathbf{v}-\\mathbf{u}$, $\\overrightarrow{AM} = \\tfrac12\\mathbf{u}+\\mathbf{v}$, $\\overrightarrow{AC}-\\overrightarrow{BD} = 2\\mathbf{u}$.",
      },
      pitfalls: [
        "$\\mathbf{u}-\\mathbf{v}$ points **towards** $\\mathbf{u}$ (from the head of $\\mathbf{v}$). Reversing it gives $\\mathbf{v}-\\mathbf{u} = -(\\mathbf{u}-\\mathbf{v})$, a classic distractor.",
        "\"Parallel\" includes opposite directions. $(2,-4)$ and $(-1,2)$ are parallel ($k = -2$).",
        "Equal vectors need not share an initial point. Only length and direction matter.",
      ],
      recall: [
        { q: "What is $\\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CA}$?", a: "$\\mathbf{0}$: following the arrows brings you back to $A$." },
        { q: "With tails together, where does $\\mathbf{u}-\\mathbf{v}$ start and end?", a: "From the head of $\\mathbf{v}$ to the head of $\\mathbf{u}$." },
        { q: "Length and direction of $-3\\mathbf{v}$?", a: "Length $3\\|\\mathbf{v}\\|$, opposite direction to $\\mathbf{v}$." },
      ],
    },
    {
      title: "Components, $\\mathbb{R}^n$ and linear combinations",
      intuition:
        "Put every arrow's tail at the origin and a vector becomes a list of numbers: where its head lands. All the geometry of arrows becomes componentwise arithmetic, and it works the same way in any number of dimensions.",
      visuals: ["lin-comb"],
      keyIdeas: [
        "With the initial point at the origin, the coordinates of the terminal point are the **components**: $\\mathbf{v} = (v_1, v_2, v_3)$. Two vectors are equal iff all their components are equal.",
        "Vector from $P_1(x_1,y_1,z_1)$ to $P_2(x_2,y_2,z_2)$: $\\overrightarrow{P_1P_2} = (x_2-x_1,\\ y_2-y_1,\\ z_2-z_1)$. **Terminal minus initial.**",
        "$\\mathbb{R}^n$ is the set of ordered $n$-tuples $(v_1,\\dots,v_n)$. Addition and scalar multiplication are componentwise, and the usual laws hold: $\\mathbf{u}+\\mathbf{v} = \\mathbf{v}+\\mathbf{u}$, $(\\mathbf{u}+\\mathbf{v})+\\mathbf{w} = \\mathbf{u}+(\\mathbf{v}+\\mathbf{w})$, $k(\\mathbf{u}+\\mathbf{v}) = k\\mathbf{u}+k\\mathbf{v}$.",
        "Standard unit vectors: $\\mathbf{i} = (1,0,0)$, $\\mathbf{j} = (0,1,0)$, $\\mathbf{k} = (0,0,1)$, so $(a,b,c) = a\\mathbf{i}+b\\mathbf{j}+c\\mathbf{k}$. In $\\mathbb{R}^n$: $\\mathbf{e}_1,\\dots,\\mathbf{e}_n$.",
        "A **linear combination** of $\\mathbf{v}_1,\\dots,\\mathbf{v}_k$ is $c_1\\mathbf{v}_1+\\dots+c_k\\mathbf{v}_k$. To find $a, b$ with $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$, equate components: one equation per component. In $\\mathbb{R}^3$ that is 3 equations in 2 unknowns, so there may be **no** solution.",
      ],
      formulas: [
        "\\overrightarrow{P_1P_2} = (x_2-x_1,\\ y_2-y_1,\\ z_2-z_1)",
        "a\\mathbf{u}+b\\mathbf{v} = (au_1+bv_1,\\ au_2+bv_2,\\ \\dots,\\ au_n+bv_n)",
      ],
      example: {
        problem:
          "Let $\\mathbf{u} = (1,2,-1)$, $\\mathbf{v} = (3,0,2)$, $\\mathbf{w} = (-1,4,-4)$. Find scalars $a, b$ with $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$, if they exist.",
        steps: [
          "Components: $a + 3b = -1$, $\\ 2a + 0b = 4$, $\\ -a + 2b = -4$.",
          "The second equation gives $a = 2$. Then the first gives $3b = -3$, so $b = -1$.",
          "**Check the third equation**: $-2 + 2(-1) = -4$ ✓. All three hold, so the scalars exist.",
          "Verify: $2(1,2,-1) - (3,0,2) = (2-3,\\ 4-0,\\ -2-2) = (-1,4,-4)$ ✓.",
        ],
        answer: "$a = 2$, $b = -1$.",
      },
      pitfalls: [
        "Solving two of the equations and stopping: the third equation can fail, and then **no** such scalars exist ($\\mathbf{w}$ is not in the plane spanned by $\\mathbf{u}, \\mathbf{v}$).",
        "$\\overrightarrow{PQ} = Q - P$. Writing $P - Q$ gives the oppositely directed vector.",
        "The components of $\\overrightarrow{PQ}$ are not the coordinates of $Q$ unless $P$ is the origin.",
      ],
      recall: [
        { q: "Vector from $P(2,-1,4)$ to $Q(5,1,1)$?", a: "$Q - P = (3, 2, -3)$." },
        { q: "How many equations does $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$ give in $\\mathbb{R}^4$?", a: "Four (one per component), in two unknowns." },
        { q: "Write $(4,-2,7)$ using $\\mathbf{i},\\mathbf{j},\\mathbf{k}$.", a: "$4\\mathbf{i}-2\\mathbf{j}+7\\mathbf{k}$." },
      ],
    },
    {
      title: "Norm, unit vectors, distance and direction angles",
      intuition:
        "Length comes from Pythagoras, applied once per extra dimension. Dividing a vector by its length keeps the direction and throws away the size, which is exactly what a unit vector is.",
      keyIdeas: [
        "**Norm**: $\\|\\mathbf{v}\\| = \\sqrt{v_1^2+\\dots+v_n^2}$. $\\|\\mathbf{v}\\| \\ge 0$ with equality iff $\\mathbf{v} = \\mathbf{0}$, and $\\|k\\mathbf{v}\\| = |k|\\,\\|\\mathbf{v}\\|$.",
        "**Unit vector**: norm 1. Normalising, $\\mathbf{v}/\\|\\mathbf{v}\\|$ is the unit vector in the **same** direction as $\\mathbf{v}\\ne\\mathbf{0}$, and $-\\mathbf{v}/\\|\\mathbf{v}\\|$ is the **opposite** one. These are the only two unit vectors parallel to $\\mathbf{v}$.",
        "A vector of length $L$ in the direction of $\\mathbf{v}$ is $L\\,\\mathbf{v}/\\|\\mathbf{v}\\|$.",
        "**Distance**: $d(P,Q) = \\|\\overrightarrow{PQ}\\| = \\sqrt{(x_2-x_1)^2+\\dots}$; for vectors, $d(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u}-\\mathbf{v}\\|$.",
        "**Direction angles** $\\alpha,\\beta,\\gamma$ are the angles $\\mathbf{v}$ makes with the $x$-, $y$-, $z$-axes: $\\cos\\alpha = v_1/\\|\\mathbf{v}\\|$, etc. The unit vector is $(\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$, so $\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma = 1$.",
        "\"A unit vector $\\mathbf{x}$ makes angle $\\theta$ with the $z$-axis\" means $\\mathbf{x}\\cdot\\mathbf{k} = \\cos\\theta$, i.e. the third component is $\\cos\\theta$.",
      ],
      formulas: [
        "\\|\\mathbf{v}\\| = \\sqrt{v_1^2+v_2^2+\\cdots+v_n^2}, \\qquad \\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}",
        "\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma = 1",
      ],
      example: {
        problem:
          "A unit vector $\\mathbf{x}\\in\\mathbb{R}^3$ makes an angle of $60^\\circ$ with the $x$-axis, and $\\mathbf{x}-\\mathbf{j}$ is also a unit vector. If the $z$-component of $\\mathbf{x}$ is negative, find $\\mathbf{x}$.",
        steps: [
          "Write $\\mathbf{x} = (a,b,c)$ with $a^2+b^2+c^2 = 1$. The angle with the $x$-axis gives $a = \\mathbf{x}\\cdot\\mathbf{i} = \\cos 60^\\circ = \\tfrac12$.",
          "$\\|\\mathbf{x}-\\mathbf{j}\\|^2 = \\|\\mathbf{x}\\|^2 - 2\\,\\mathbf{x}\\cdot\\mathbf{j} + \\|\\mathbf{j}\\|^2 = 1 - 2b + 1$. Setting this equal to $1$ gives $b = \\tfrac12$.",
          "Then $c^2 = 1 - \\tfrac14 - \\tfrac14 = \\tfrac12$, and $c<0$ gives $c = -\\tfrac{1}{\\sqrt2}$.",
          "Check: $\\mathbf{x}-\\mathbf{j} = (\\tfrac12, -\\tfrac12, -\\tfrac{1}{\\sqrt2})$ has squared norm $\\tfrac14+\\tfrac14+\\tfrac12 = 1$ ✓.",
        ],
        answer: "$\\mathbf{x} = \\left(\\tfrac12,\\ \\tfrac12,\\ -\\tfrac{1}{\\sqrt2}\\right)$.",
      },
      pitfalls: [
        "Normalise by dividing by $\\|\\mathbf{v}\\|$, not $\\|\\mathbf{v}\\|^2$ and not the sum of the components.",
        "$\\|-3\\mathbf{v}\\| = 3\\|\\mathbf{v}\\|$, never negative.",
        "Direction angles cannot be chosen freely: $45^\\circ$ with all three axes is impossible because $3\\cdot\\tfrac12 \\ne 1$.",
      ],
      recall: [
        { q: "Unit vector opposite to $(3,-4)$?", a: "$(-\\tfrac35, \\tfrac45)$." },
        { q: "Norm of $(1,1,1,1)$ in $\\mathbb{R}^4$?", a: "$\\sqrt4 = 2$." },
        { q: "$\\mathbf{v}$ makes $60^\\circ$ with the $x$-axis and $45^\\circ$ with the $y$-axis. What are the possible values of $\\cos\\gamma$?", a: "$\\cos^2\\gamma = 1 - \\tfrac14 - \\tfrac12 = \\tfrac14$, so $\\cos\\gamma = \\pm\\tfrac12$ ($\\gamma = 60^\\circ$ or $120^\\circ$)." },
      ],
    },
    {
      title: "Dot product, angles and orthogonality",
      intuition:
        "The dot product multiplies matching components and adds. That single number measures how much two vectors point the same way, so it gives angles, right-angle tests and the work done by a force.",
      keyIdeas: [
        "$\\mathbf{u}\\cdot\\mathbf{v} = u_1v_1+\\dots+u_nv_n = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$ with $0\\le\\theta\\le\\pi$. The result is a **scalar**.",
        "Sign test: $\\mathbf{u}\\cdot\\mathbf{v}>0$ means acute, $=0$ means a right angle (**orthogonal**), $<0$ means obtuse. $\\mathbf{0}$ is orthogonal to every vector.",
        "Properties: $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{v}\\cdot\\mathbf{u}$; $\\mathbf{u}\\cdot(\\mathbf{v}+\\mathbf{w}) = \\mathbf{u}\\cdot\\mathbf{v}+\\mathbf{u}\\cdot\\mathbf{w}$; $k(\\mathbf{u}\\cdot\\mathbf{v}) = (k\\mathbf{u})\\cdot\\mathbf{v}$; $\\mathbf{v}\\cdot\\mathbf{v} = \\|\\mathbf{v}\\|^2$. There is **no cancellation law**: $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}$ does not give $\\mathbf{v} = \\mathbf{w}$. Also $(\\mathbf{u}\\cdot\\mathbf{v})\\cdot\\mathbf{w}$ is meaningless (scalar dot vector).",
        "**Right-angle triangle test**: triangle $ABC$ has a right angle at $B$ iff $\\overrightarrow{BA}\\cdot\\overrightarrow{BC} = 0$. Use the two vectors leaving the same vertex, and check all three vertices.",
        "**Work**: a constant force $\\mathbf{F}$ moving a particle from $P$ to $Q$ does work $W = \\mathbf{F}\\cdot\\overrightarrow{PQ}$ (displacement, not position).",
        "Light preview: the component of $\\mathbf{u}$ along $\\mathbf{v}$ is $\\mathbf{u}\\cdot\\mathbf{v}/\\|\\mathbf{v}\\|$, and the vector projection is $\\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{v}\\|^2}\\mathbf{v}$. Orthogonality covers this properly.",
      ],
      formulas: [
        "\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}",
        "W = \\mathbf{F}\\cdot\\overrightarrow{PQ}",
      ],
      example: {
        problem:
          "Do $A(1,0,2)$, $B(3,1,1)$, $C(4,0,2)$ form a right-angled triangle? Find $\\cos$ of the angle at $A$, and the work done by $\\mathbf{F} = (2,-1,3)$ moving a particle from $A$ to $C$.",
        steps: [
          "At $A$: $\\overrightarrow{AB} = (2,1,-1)$, $\\overrightarrow{AC} = (3,0,0)$, dot $= 6 \\ne 0$.",
          "At $B$: $\\overrightarrow{BA} = (-2,-1,1)$, $\\overrightarrow{BC} = (1,-1,1)$, dot $= -2+1+1 = 0$. **Right angle at $B$.**",
          "$\\cos A = \\dfrac{\\overrightarrow{AB}\\cdot\\overrightarrow{AC}}{\\|\\overrightarrow{AB}\\|\\|\\overrightarrow{AC}\\|} = \\dfrac{6}{\\sqrt6\\cdot 3} = \\dfrac{\\sqrt6}{3}$ (acute, as it must be).",
          "Work: $W = \\mathbf{F}\\cdot\\overrightarrow{AC} = (2,-1,3)\\cdot(3,0,0) = 6$.",
        ],
        answer: "Yes, right-angled at $B$; $\\cos A = \\sqrt6/3$; $W = 6$.",
      },
      pitfalls: [
        "For the angle **at** $B$ use $\\overrightarrow{BA}$ and $\\overrightarrow{BC}$. Using $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$ gives the supplementary (exterior) angle, which flips the sign of $\\cos$.",
        "A triangle can have its right angle at any vertex. Checking only one vertex and answering \"no\" is a common slip.",
        "Work uses the displacement $Q-P$, not the position vector of $Q$.",
      ],
      recall: [
        { q: "$\\mathbf{u}\\cdot\\mathbf{v} = -3$. Acute or obtuse?", a: "Obtuse ($\\cos\\theta<0$)." },
        { q: "Find $k$ so that $(1,k,2)\\perp(3,-1,1)$.", a: "$3 - k + 2 = 0$, so $k = 5$." },
        { q: "Does $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}$ with $\\mathbf{u}\\ne\\mathbf{0}$ force $\\mathbf{v} = \\mathbf{w}$?", a: "No. It only says $\\mathbf{v}-\\mathbf{w}\\perp\\mathbf{u}$." },
      ],
    },
    {
      title: "Norm identities: parallelogram law, polarization, Cauchy–Schwarz",
      intuition:
        "Expanding $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2$ like a square links lengths to the dot product. Adding the two expansions kills the cross term (parallelogram law); subtracting isolates it (polarization). Cauchy–Schwarz says the cross term can never exceed the product of the lengths.",
      visuals: ["parallelogram-law"],
      keyIdeas: [
        "$\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.",
        "**Parallelogram law**: $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$. The diagonals of a parallelogram are $\\mathbf{u}+\\mathbf{v}$ and $\\mathbf{u}-\\mathbf{v}$.",
        "**Polarization identity**: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14\\|\\mathbf{u}+\\mathbf{v}\\|^2-\\tfrac14\\|\\mathbf{u}-\\mathbf{v}\\|^2$. Norms alone determine the dot product.",
        "$\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}-\\mathbf{v}\\| \\iff \\mathbf{u}\\cdot\\mathbf{v} = 0$ (equal diagonals means the parallelogram is a rectangle).",
        "**Cauchy–Schwarz**: $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$, with equality iff $\\mathbf{u}, \\mathbf{v}$ are parallel. Hence $\\max_{\\|\\mathbf{v}\\|\\le r}|\\mathbf{v}\\cdot\\mathbf{w}| = r\\|\\mathbf{w}\\|$, attained at $\\mathbf{v} = r\\mathbf{w}/\\|\\mathbf{w}\\|$.",
        "**Triangle inequality**: $\\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$, with equality iff one vector is a non-negative multiple of the other. Also $\\big|\\|\\mathbf{u}\\|-\\|\\mathbf{v}\\|\\big| \\le \\|\\mathbf{u}\\pm\\mathbf{v}\\|$ and $d(\\mathbf{u},\\mathbf{w}) \\le d(\\mathbf{u},\\mathbf{v})+d(\\mathbf{v},\\mathbf{w})$.",
      ],
      formulas: [
        "\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2",
        "\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14\\|\\mathbf{u}+\\mathbf{v}\\|^2-\\tfrac14\\|\\mathbf{u}-\\mathbf{v}\\|^2",
        "|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|, \\qquad \\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|",
      ],
      example: {
        problem:
          "$\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 5$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 7$. Find $\\|\\mathbf{v}\\|$, $\\mathbf{u}\\cdot\\mathbf{v}$ and $\\cos\\theta$.",
        steps: [
          "Parallelogram law: $25 + 49 = 2(9) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = 28$ and $\\|\\mathbf{v}\\| = 2\\sqrt7$.",
          "Polarization: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14(25 - 49) = -6$.",
          "$\\cos\\theta = \\dfrac{-6}{3\\cdot 2\\sqrt7} = -\\dfrac{1}{\\sqrt7}$, so the angle is obtuse.",
          "Sanity check with Cauchy–Schwarz: $|{-6}| \\le 3\\cdot2\\sqrt7 \\approx 15.9$ ✓.",
        ],
        answer: "$\\|\\mathbf{v}\\| = 2\\sqrt7$, $\\mathbf{u}\\cdot\\mathbf{v} = -6$, $\\cos\\theta = -1/\\sqrt7$.",
      },
      pitfalls: [
        "Forgetting the factor 2 on the right of the parallelogram law, or forgetting to square the given norms.",
        "The Cauchy–Schwarz maximum is $r\\|\\mathbf{w}\\|$, not $r\\|\\mathbf{w}\\|^2$.",
        "The triangle inequality gives bounds, not values. From $\\|\\mathbf{u}\\|$ and $\\|\\mathbf{v}\\|$ alone, $\\|\\mathbf{u}+\\mathbf{v}\\|$ cannot be determined.",
      ],
      recall: [
        { q: "$\\|\\mathbf{u}+\\mathbf{v}\\| = 6$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 4$. Find $\\mathbf{u}\\cdot\\mathbf{v}$.", a: "$\\tfrac14(36-16) = 5$." },
        { q: "When does $|\\mathbf{u}\\cdot\\mathbf{v}| = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$?", a: "Exactly when $\\mathbf{u}$ and $\\mathbf{v}$ are parallel (including opposite directions or a zero vector)." },
        { q: "$\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 5$. Range of $\\|\\mathbf{u}-\\mathbf{v}\\|$?", a: "$3 \\le \\|\\mathbf{u}-\\mathbf{v}\\| \\le 7$." },
      ],
    },
    {
      title: "Cross product: normals and areas in $\\mathbb{R}^3$",
      intuition:
        "Given two directions in space, the cross product builds the one direction perpendicular to both. Its length is the area of the parallelogram they span, so it answers \"normal vector?\" and \"area?\" in a single computation.",
      visuals: ["cross-product-3d"],
      keyIdeas: [
        "Defined only in $\\mathbb{R}^3$: $\\mathbf{u}\\times\\mathbf{v} = (u_2v_3-u_3v_2,\\ u_3v_1-u_1v_3,\\ u_1v_2-u_2v_1)$, the cofactor expansion of $\\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\u_1&u_2&u_3\\\\v_1&v_2&v_3\\end{vmatrix}$. The result is a **vector**.",
        "$\\mathbf{u}\\times\\mathbf{v}$ is orthogonal to both $\\mathbf{u}$ and $\\mathbf{v}$; its direction follows the right-hand rule: $\\mathbf{i}\\times\\mathbf{j} = \\mathbf{k}$, $\\mathbf{j}\\times\\mathbf{k} = \\mathbf{i}$, $\\mathbf{k}\\times\\mathbf{i} = \\mathbf{j}$.",
        "**Anti-commutative**: $\\mathbf{v}\\times\\mathbf{u} = -(\\mathbf{u}\\times\\mathbf{v})$, and $\\mathbf{u}\\times\\mathbf{u} = \\mathbf{0}$. $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{0}$ iff $\\mathbf{u}, \\mathbf{v}$ are parallel. **Not associative**: $(\\mathbf{i}\\times\\mathbf{i})\\times\\mathbf{j} = \\mathbf{0}$ but $\\mathbf{i}\\times(\\mathbf{i}\\times\\mathbf{j}) = -\\mathbf{j}$.",
        "$\\|\\mathbf{u}\\times\\mathbf{v}\\| = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\sin\\theta$ = **area of the parallelogram** spanned by $\\mathbf{u}, \\mathbf{v}$. Triangle $ABC$ has area $\\tfrac12\\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\|$. Lagrange: $\\|\\mathbf{u}\\times\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2-(\\mathbf{u}\\cdot\\mathbf{v})^2$.",
        "A normal to the plane through $A, B, C$ is $\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}$. A direction perpendicular to two given normals $\\mathbf{n}_1, \\mathbf{n}_2$ is $\\mathbf{n}_1\\times\\mathbf{n}_2$.",
        "$|\\mathbf{u}\\cdot(\\mathbf{v}\\times\\mathbf{w})|$ is the volume of the parallelepiped on $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}$ (equal to $|\\det[\\mathbf{u}\\ \\mathbf{v}\\ \\mathbf{w}]|$, see Determinants).",
      ],
      formulas: [
        "\\mathbf{u}\\times\\mathbf{v} = \\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\u_1&u_2&u_3\\\\v_1&v_2&v_3\\end{vmatrix} = (u_2v_3-u_3v_2)\\,\\mathbf{i} - (u_1v_3-u_3v_1)\\,\\mathbf{j} + (u_1v_2-u_2v_1)\\,\\mathbf{k}",
        "\\text{Area}_{\\triangle ABC} = \\tfrac12\\,\\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\|",
      ],
      example: {
        problem: "Find the area of the triangle with vertices $A(1,-1,0)$, $B(2,1,-1)$, $C(-1,1,2)$ and a unit normal to its plane.",
        steps: [
          "$\\overrightarrow{AB} = (1,2,-1)$ and $\\overrightarrow{AC} = (-2,2,2)$.",
          "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (2\\cdot2-(-1)\\cdot2,\\ (-1)(-2)-1\\cdot2,\\ 1\\cdot2-2\\cdot(-2)) = (6, 0, 6)$.",
          "Check orthogonality: $(6,0,6)\\cdot(1,2,-1) = 0$ and $(6,0,6)\\cdot(-2,2,2) = 0$ ✓.",
          "$\\|(6,0,6)\\| = 6\\sqrt2$, so the area is $\\tfrac12\\cdot6\\sqrt2 = 3\\sqrt2$. Unit normal: $(6,0,6)/(6\\sqrt2) = (1,0,1)/\\sqrt2$.",
        ],
        answer: "Area $= 3\\sqrt2$; unit normal $\\pm\\tfrac{1}{\\sqrt2}(1,0,1)$.",
      },
      pitfalls: [
        "The middle component carries a minus sign in the cofactor expansion: it is $u_3v_1-u_1v_3$, not $u_1v_3-u_3v_1$.",
        "Triangle area needs the $\\tfrac12$; parallelogram area does not.",
        "$\\mathbf{u}\\times\\mathbf{v}$ and $\\mathbf{v}\\times\\mathbf{u}$ are both valid normals (opposite directions), so plane equations come out the same up to sign.",
      ],
      recall: [
        { q: "$\\mathbf{k}\\times\\mathbf{j} = ?$", a: "$-\\mathbf{i}$ (since $\\mathbf{j}\\times\\mathbf{k} = \\mathbf{i}$)." },
        { q: "$\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 5$, $\\mathbf{u}\\cdot\\mathbf{v} = 6$. Find $\\|\\mathbf{u}\\times\\mathbf{v}\\|$.", a: "$\\sqrt{4\\cdot25-36} = 8$." },
        { q: "What does $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{0}$ tell you?", a: "$\\mathbf{u}$ and $\\mathbf{v}$ are parallel (or one is $\\mathbf{0}$)." },
      ],
    },
    {
      title: "Lines and planes: point-normal, general, vector and parametric forms",
      intuition:
        "A line is a point plus one free direction; a plane is a point plus two free directions, or equivalently a point plus one normal that it must stay perpendicular to. Every form of equation encodes one of these descriptions.",
      keyIdeas: [
        "**Line** through $P_0$ parallel to $\\mathbf{d}\\ne\\mathbf{0}$: vector form $\\mathbf{x} = P_0 + t\\mathbf{d}$; parametric form $x = x_0+ta,\\ y = y_0+tb,\\ z = z_0+tc$. Through two points: $\\mathbf{d} = \\overrightarrow{PQ}$, so $\\mathbf{x} = P + t(Q-P)$ ($t = 0$ at $P$, $t = 1$ at $Q$).",
        "Equations of a line are not unique: any point on it and any nonzero multiple of $\\mathbf{d}$ work. Two parametrisations describe the same line iff their directions are parallel and a point of one lies on the other.",
        "In $\\mathbb{R}^2$ a line also has a **point-normal** form $a(x-x_0)+b(y-y_0) = 0$, with normal $\\mathbf{n} = (a,b)$ and direction $(b,-a)$.",
        "**Plane**, point-normal: $\\mathbf{n}\\cdot(\\mathbf{x}-P_0) = 0$, i.e. $a(x-x_0)+b(y-y_0)+c(z-z_0) = 0$. **General form** $ax+by+cz = d$ with $d = \\mathbf{n}\\cdot P_0$; the coefficients $(a,b,c)$ are a normal.",
        "**Plane, vector form**: $\\mathbf{x} = P_0 + t_1\\mathbf{v}_1 + t_2\\mathbf{v}_2$ with $\\mathbf{v}_1, \\mathbf{v}_2$ **non-parallel**; parametric form is the same thing component by component. To convert to general form: $\\mathbf{n} = \\mathbf{v}_1\\times\\mathbf{v}_2$, then $d = \\mathbf{n}\\cdot P_0$.",
        "A point lies on a plane iff it satisfies the equation. Planes are parallel iff their normals are parallel; a line is parallel to a plane iff $\\mathbf{d}\\cdot\\mathbf{n} = 0$, and perpendicular to it iff $\\mathbf{d}\\parallel\\mathbf{n}$.",
      ],
      formulas: [
        "\\text{line: } \\mathbf{x} = P_0 + t\\,\\mathbf{d}, \\qquad \\text{plane: } \\mathbf{x} = P_0 + t_1\\mathbf{v}_1 + t_2\\mathbf{v}_2",
        "a(x-x_0)+b(y-y_0)+c(z-z_0) = 0 \\iff ax+by+cz = d,\\quad d = ax_0+by_0+cz_0",
        "\\mathbf{n} = \\mathbf{v}_1\\times\\mathbf{v}_2",
      ],
      example: {
        problem:
          "Find the vector, parametric and general equations of the plane through $P_0(2,-1,1)$ parallel to $\\mathbf{v}_1 = (1,0,-2)$ and $\\mathbf{v}_2 = (0,3,1)$.",
        steps: [
          "Vector form: $(x,y,z) = (2,-1,1) + t_1(1,0,-2) + t_2(0,3,1)$.",
          "Parametric: $x = 2+t_1,\\ y = -1+3t_2,\\ z = 1-2t_1+t_2$.",
          "Normal: $\\mathbf{n} = \\mathbf{v}_1\\times\\mathbf{v}_2 = (0\\cdot1-(-2)\\cdot3,\\ (-2)\\cdot0-1\\cdot1,\\ 1\\cdot3-0\\cdot0) = (6,-1,3)$.",
          "$d = \\mathbf{n}\\cdot P_0 = 12+1+3 = 16$, so $6x-y+3z = 16$. Check with $t_1 = t_2 = 1$: the point $(3,2,0)$ gives $18-2+0 = 16$ ✓.",
        ],
        answer: "$6x - y + 3z = 16$, or equivalently $6(x-2)-(y+1)+3(z-1) = 0$.",
      },
      pitfalls: [
        "Do not confuse a line's **direction** with a plane's **normal**: the line $\\mathbf{x} = P_0+t\\mathbf{n}$ is perpendicular to the plane with normal $\\mathbf{n}$, not inside it.",
        "Sign of $d$: $ax+by+cz = ax_0+by_0+cz_0$. Moving it across as $-d$ and then forgetting is a frequent slip.",
        "A \"plane\" $\\mathbf{x} = P_0+s\\mathbf{u}+t\\mathbf{v}$ with $\\mathbf{u}\\parallel\\mathbf{v}$ is only a line.",
      ],
      recall: [
        { q: "A normal to $3x - y + 4z = 7$?", a: "$(3,-1,4)$ (or any nonzero multiple)." },
        { q: "Parametric equations of the line through $(1,0,2)$ and $(3,1,-1)$?", a: "$x = 1+2t,\\ y = t,\\ z = 2-3t$." },
        { q: "How do you turn $\\mathbf{x} = P_0+s\\mathbf{u}+t\\mathbf{v}$ into $ax+by+cz = d$?", a: "$\\mathbf{n} = \\mathbf{u}\\times\\mathbf{v} = (a,b,c)$, then $d = \\mathbf{n}\\cdot P_0$." },
      ],
    },
    {
      title: "Where lines meet planes: intersections, containment and distance",
      intuition:
        "Substitute the line's parametric coordinates into the plane equation and you get one equation in $t$. Its three possible outcomes (one solution, none, every $t$) are exactly \"crosses\", \"parallel\" and \"lies in\".",
      visuals: ["line-plane-3d"],
      keyIdeas: [
        "**Line ∩ plane**: substitute $x(t), y(t), z(t)$ into $ax+by+cz = d$. If $\\mathbf{n}\\cdot\\mathbf{d} \\ne 0$ there is exactly one $t$, so one point. If $\\mathbf{n}\\cdot\\mathbf{d} = 0$ the line is parallel to the plane: it **lies in** the plane if $P_0$ satisfies the equation, otherwise it never meets it.",
        "Plane in vector form and line in vector form: set $P_0+\\lambda\\mathbf{a}+\\mu\\mathbf{b} = Q_0+\\beta\\mathbf{d}$ and solve the $3\\times3$ system for $\\lambda, \\mu, \\beta$.",
        "**Coordinate planes**: $xy$-plane is $z = 0$, $yz$-plane is $x = 0$, $xz$-plane is $y = 0$. The plane $ax+by+cz = d$ meets the $x$-axis at $(d/a, 0, 0)$, and so on.",
        "**Distance** from $P(x_0,y_0,z_0)$ to $ax+by+cz = d$: $D = \\dfrac{|ax_0+by_0+cz_0-d|}{\\sqrt{a^2+b^2+c^2}}$. Distance between parallel planes: rewrite them with the **same** $(a,b,c)$, then $|d_1-d_2|/\\|\\mathbf{n}\\|$.",
        "Two lines in $\\mathbb{R}^3$ are parallel, intersect in one point, or are **skew** (neither). Test by solving $P_1+t\\mathbf{d}_1 = P_2+s\\mathbf{d}_2$ with all three components.",
        "A line described as \"perpendicular to $\\mathbf{n}_1$ and $\\mathbf{n}_2$\" (e.g. the intersection of two planes) has direction $\\mathbf{n}_1\\times\\mathbf{n}_2$.",
      ],
      formulas: [
        "D = \\frac{|ax_0+by_0+cz_0-d|}{\\sqrt{a^2+b^2+c^2}}",
        "\\mathbf{n}\\cdot(P_0+t\\mathbf{d}) = d \\;\\Rightarrow\\; t = \\frac{d-\\mathbf{n}\\cdot P_0}{\\mathbf{n}\\cdot\\mathbf{d}} \\quad (\\mathbf{n}\\cdot\\mathbf{d}\\ne0)",
      ],
      example: {
        problem:
          "The line $L$ passes through $A(2,-1,3)$ and $B(4,1,2)$. Find where $L$ meets the $xy$-plane and the plane $x+y+z = 1$, and the distance from $A$ to that plane.",
        steps: [
          "$\\mathbf{d} = \\overrightarrow{AB} = (2,2,-1)$, so $x = 2+2t,\\ y = -1+2t,\\ z = 3-t$.",
          "$xy$-plane: $z = 3-t = 0 \\Rightarrow t = 3$, giving $(8, 5, 0)$.",
          "Plane: $(2+2t)+(-1+2t)+(3-t) = 4+3t = 1 \\Rightarrow t = -1$, giving $(0,-3,4)$. Check: $0-3+4 = 1$ ✓.",
          "Distance: $\\dfrac{|2-1+3-1|}{\\sqrt{1+1+1}} = \\dfrac{3}{\\sqrt3} = \\sqrt3$.",
        ],
        answer: "$xy$-plane at $(8,5,0)$; the plane at $(0,-3,4)$; distance $\\sqrt3$.",
      },
      pitfalls: [
        "The $xy$-plane is $z = 0$ (not $x = y$). Read which coordinate must vanish.",
        "If $\\mathbf{n}\\cdot\\mathbf{d} = 0$ do not divide by it: test one point to decide between \"lies in the plane\" and \"no intersection\".",
        "In the distance formula, subtract $d$ and divide by $\\|\\mathbf{n}\\|$, not $\\|\\mathbf{n}\\|^2$. For parallel planes, match the normals first ($-4x+2y-4z = 12$ is $2x-y+2z = -6$).",
        "Two non-parallel lines in $\\mathbb{R}^3$ need not meet. Check the third equation.",
      ],
      recall: [
        { q: "When does the line $P_0+t\\mathbf{d}$ lie in the plane $\\mathbf{n}\\cdot\\mathbf{x} = d$?", a: "When $\\mathbf{n}\\cdot\\mathbf{d} = 0$ **and** $\\mathbf{n}\\cdot P_0 = d$." },
        { q: "Distance from the origin to $2x - y + 2z = 9$?", a: "$9/3 = 3$." },
        { q: "Where does $2x+3y-6z = 12$ cut the $y$-axis?", a: "$(0, 4, 0)$." },
      ],
    },
  ],
  playbook: [
    "If you see \"find $a, b$ with $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$\" → equate components, solve two equations, and **check the remaining one** before answering.",
    "If you see an initial point with a given terminal point $Q$ → $P = Q - \\mathbf{u}$; for \"oppositely directed to $\\mathbf{v}$\" take $\\mathbf{u} = -k\\mathbf{v}$ with $k>0$.",
    "If you see \"unit vector in the direction of $\\mathbf{v}$\" → $\\mathbf{v}/\\|\\mathbf{v}\\|$; opposite direction → $-\\mathbf{v}/\\|\\mathbf{v}\\|$.",
    "If you see a unit vector at angle $\\theta$ with an axis → that component equals $\\cos\\theta$; use $\\|\\mathbf{x}\\| = 1$ and expand any other norm condition like $\\|\\mathbf{x}+\\mathbf{i}\\|^2 = 1+2x_1+1$.",
    "If you see acute/obtuse/orthogonal → only the sign of $\\mathbf{u}\\cdot\\mathbf{v}$ matters.",
    "If you see \"right-angled triangle\" → dot the two edge vectors leaving each vertex; one zero means yes.",
    "If you see work → $W = \\mathbf{F}\\cdot(Q-P)$; build $\\mathbf{F}$ from magnitude × unit direction first if needed.",
    "If you see $\\|\\mathbf{u}+\\mathbf{v}\\|$ and $\\|\\mathbf{u}-\\mathbf{v}\\|$ → parallelogram law for $\\|\\mathbf{v}\\|$, polarization $\\tfrac14(\\|\\mathbf{u}+\\mathbf{v}\\|^2-\\|\\mathbf{u}-\\mathbf{v}\\|^2)$ for $\\mathbf{u}\\cdot\\mathbf{v}$.",
    "If you see \"maximum of $|\\mathbf{v}^T\\mathbf{w}|$ over $\\|\\mathbf{v}\\|\\le r$\" → Cauchy–Schwarz, answer $r\\|\\mathbf{w}\\|$.",
    "If you see a plane through three points, or through a point and two directions → $\\mathbf{n}$ = cross product of two in-plane vectors, then $d = \\mathbf{n}\\cdot P_0$.",
    "If you see triangle or parallelogram area in $\\mathbb{R}^3$ → $\\tfrac12\\|\\overrightarrow{AB}\\times\\overrightarrow{AC}\\|$ or $\\|\\mathbf{u}\\times\\mathbf{v}\\|$.",
    "If you see a line meeting a plane → substitute the parametric line into the plane and solve for $t$; if the coefficient of $t$ is 0, the line is parallel (in the plane iff the constant also matches).",
    "If you see \"which line lies in the plane\" → need direction $\\cdot\\,\\mathbf{n} = 0$ **and** one point on the plane.",
    "If you see distance from a point to a plane → $|ax_0+by_0+cz_0-d|/\\sqrt{a^2+b^2+c^2}$; for parallel planes, scale to the same normal first.",
  ],
};
