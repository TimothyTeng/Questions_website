import type { Lesson } from "@/lib/types";

export const vectorsLesson: Lesson = {
  topic: "vectors",
  bigPicture:
    "Vectors are the language of the whole course: a vector has a magnitude and a direction, and once its initial point is at the origin it is just a list of components. The chapter goes: arrows (triangle and parallelogram rules, negatives, scalar multiples) → components in $R^2$, $R^3$, $R^n$ and linear combinations → norm, unit vectors and distance → the dot product, which turns angles and orthogonality into arithmetic, plus the Cauchy–Schwarz and triangle inequalities → lines and planes in point-normal, vector and parametric form. Final-exam questions here are short but multi-step: write a plane from a point and a normal, find where a line meets a plane, or recover $\\|\\mathbf{v}\\|$ and $\\mathbf{u}\\cdot\\mathbf{v}$ by expanding norms with the dot product.",
  sections: [
    {
      title: "Geometric vectors: arrows, addition and scalar multiples",
      refs: ["Slides 0A Vectors in 2-D, 3-D and n-D (vec p4–p10)"],
      intuition:
        "A vector only remembers its length and its direction, not where it is drawn. Adding vectors means following arrows head-to-tail, and multiplying by a scalar stretches, shrinks or flips the arrow.",
      visuals: ["vector-arith"],
      keyIdeas: [
        "The vector $\\mathbf{v} = \\overrightarrow{AB}$ has **initial point** $A$ and **terminal point** $B$. The length of the arrow is the magnitude of the vector, and the arrowhead gives its direction.",
        "**Equivalent (equal) vectors** have the same length and the same direction, wherever they are drawn. The **zero vector** $\\mathbf{0}$ has coinciding initial and terminal points and length zero.",
        "**Parallelogram rule**: position $\\mathbf{v}$ and $\\mathbf{w}$ so their initial points coincide; $\\mathbf{v}+\\mathbf{w}$ is the arrow from the common initial point to the opposite vertex of the parallelogram. **Triangle rule**: put the initial point of $\\mathbf{w}$ at the terminal point of $\\mathbf{v}$; $\\mathbf{v}+\\mathbf{w}$ runs from the initial point of $\\mathbf{v}$ to the terminal point of $\\mathbf{w}$. Both rules give the same sum, and $\\mathbf{v}+\\mathbf{w} = \\mathbf{w}+\\mathbf{v}$. Addition is also associative: $\\mathbf{u}+(\\mathbf{v}+\\mathbf{w}) = (\\mathbf{u}+\\mathbf{v})+\\mathbf{w}$.",
        "$-\\mathbf{v}$ has the same length as $\\mathbf{v}$ but the opposite direction, and $\\mathbf{w}-\\mathbf{v} = \\mathbf{w}+(-\\mathbf{v})$. With the initial points of $\\mathbf{v}$ and $\\mathbf{w}$ together, $\\mathbf{w}-\\mathbf{v}$ is the arrow **from the terminal point of $\\mathbf{v}$ to the terminal point of $\\mathbf{w}$**.",
        "$k\\mathbf{v}$ has length $|k|$ times the length of $\\mathbf{v}$. Its direction is the same as $\\mathbf{v}$ if $k>0$ and opposite to $\\mathbf{v}$ if $k<0$; if $k = 0$ or $\\mathbf{v} = \\mathbf{0}$, then $k\\mathbf{v} = \\mathbf{0}$.",
        "**Parallel and collinear vectors** mean the same thing: $\\mathbf{v}$ and $k\\mathbf{v}$ are parallel (collinear), because translating a vector does not change it. The scalar $k$ may be negative.",
      ],
      formulas: [
        "\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}, \\qquad \\overrightarrow{BA} = -\\overrightarrow{AB}",
        "\\mathbf{w}-\\mathbf{v} = \\mathbf{w}+(-\\mathbf{v})",
      ],
      example: {
        problem:
          "$ABCD$ is a parallelogram with $\\overrightarrow{AB} = \\mathbf{u}$ and $\\overrightarrow{AD} = \\mathbf{v}$. $M$ is the midpoint of $CD$. Express $\\overrightarrow{AC}$, $\\overrightarrow{BD}$, $\\overrightarrow{AM}$ and $\\overrightarrow{AC}-\\overrightarrow{BD}$ in terms of $\\mathbf{u}$ and $\\mathbf{v}$.",
        steps: [
          "Triangle rule along $A\\to B\\to C$: $\\overrightarrow{AC} = \\overrightarrow{AB}+\\overrightarrow{BC} = \\mathbf{u}+\\mathbf{v}$, since $\\overrightarrow{BC}$ is equivalent to $\\overrightarrow{AD} = \\mathbf{v}$.",
          "$\\overrightarrow{BD} = \\overrightarrow{BA}+\\overrightarrow{AD} = -\\mathbf{u}+\\mathbf{v} = \\mathbf{v}-\\mathbf{u}$ (from the terminal point of $\\mathbf{u}$ to the terminal point of $\\mathbf{v}$).",
          "$\\overrightarrow{DC}$ is equivalent to $\\overrightarrow{AB} = \\mathbf{u}$, so $\\overrightarrow{DM} = \\tfrac12\\mathbf{u}$ and $\\overrightarrow{AM} = \\overrightarrow{AD}+\\overrightarrow{DM} = \\mathbf{v}+\\tfrac12\\mathbf{u}$.",
          "$\\overrightarrow{AC}-\\overrightarrow{BD} = (\\mathbf{u}+\\mathbf{v})-(\\mathbf{v}-\\mathbf{u}) = 2\\mathbf{u}$.",
        ],
        answer: "$\\overrightarrow{AC} = \\mathbf{u}+\\mathbf{v}$, $\\overrightarrow{BD} = \\mathbf{v}-\\mathbf{u}$, $\\overrightarrow{AM} = \\tfrac12\\mathbf{u}+\\mathbf{v}$, $\\overrightarrow{AC}-\\overrightarrow{BD} = 2\\mathbf{u}$.",
      },
      pitfalls: [
        "$\\mathbf{w}-\\mathbf{v}$ points **towards** $\\mathbf{w}$ (from the terminal point of $\\mathbf{v}$). Reversing it gives $\\mathbf{v}-\\mathbf{w} = -(\\mathbf{w}-\\mathbf{v})$, a classic distractor.",
        "\"Parallel\" includes opposite directions: $(2,-4)$ and $(-1,2)$ are parallel ($k = -2$).",
        "Equal vectors need not share an initial point. Only length and direction matter.",
      ],
      recall: [
        { q: "What is $\\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CA}$?", a: "$\\mathbf{0}$: following the arrows brings you back to $A$." },
        { q: "With initial points together, where does $\\mathbf{w}-\\mathbf{v}$ start and end?", a: "From the terminal point of $\\mathbf{v}$ to the terminal point of $\\mathbf{w}$." },
        { q: "Length and direction of $-3\\mathbf{v}$?", a: "Length $3$ times that of $\\mathbf{v}$, opposite direction to $\\mathbf{v}$." },
      ],
    },
    {
      title: "Components, $R^n$ and linear combinations",
      refs: ["Slides 0A Vectors in coordinate systems, n-D space (vec p11–p16)", "Slides 0A Standard unit vectors (vec p19)", "Tutorial 0A Q1, Q2"],
      intuition:
        "Put the initial point at the origin and a vector becomes a list of numbers: the coordinates of its terminal point. All the arrow operations become componentwise arithmetic, and it works the same way in any number of dimensions.",
      visuals: ["lin-comb"],
      keyIdeas: [
        "With the initial point at the origin, the coordinates of the terminal point are the **components**: $\\mathbf{v} = (v_1, v_2, v_3)$. Two vectors are equal if and only if their corresponding components are equal.",
        "Initial point not at the origin: $\\overrightarrow{P_1P_2} = \\overrightarrow{OP_2}-\\overrightarrow{OP_1} = (x_2-x_1,\\ y_2-y_1,\\ z_2-z_1)$. **Terminal minus initial.**",
        "$R^n$ is the set of all ordered $n$-tuples $(v_1,\\dots,v_n)$, with zero vector $\\mathbf{0} = (0,\\dots,0)$. Addition, scalar multiplication, $-\\mathbf{v}$ and $\\mathbf{w}-\\mathbf{v}$ are componentwise.",
        "The rules from the slides' theorems: $\\mathbf{u}+\\mathbf{v} = \\mathbf{v}+\\mathbf{u}$, $(\\mathbf{u}+\\mathbf{v})+\\mathbf{w} = \\mathbf{u}+(\\mathbf{v}+\\mathbf{w})$, $\\mathbf{u}+\\mathbf{0} = \\mathbf{u}$, $\\mathbf{u}+(-\\mathbf{u}) = \\mathbf{0}$, $k(\\mathbf{u}+\\mathbf{v}) = k\\mathbf{u}+k\\mathbf{v}$, $(k+m)\\mathbf{u} = k\\mathbf{u}+m\\mathbf{u}$, $k(m\\mathbf{u}) = (km)\\mathbf{u}$, $1\\mathbf{u} = \\mathbf{u}$; also $0\\mathbf{v} = \\mathbf{0}$, $k\\mathbf{0} = \\mathbf{0}$, $(-1)\\mathbf{v} = -\\mathbf{v}$.",
        "Standard unit vectors: $\\mathbf{i} = (1,0,0)$, $\\mathbf{j} = (0,1,0)$, $\\mathbf{k} = (0,0,1)$ in $R^3$ (and $\\mathbf{i} = (1,0)$, $\\mathbf{j} = (0,1)$ in $R^2$); in $R^n$: $\\mathbf{e}_1,\\dots,\\mathbf{e}_n$.",
        "$\\mathbf{w}$ is a **linear combination** of $\\mathbf{v}_1,\\dots,\\mathbf{v}_n$ if $\\mathbf{w} = k_1\\mathbf{v}_1+\\dots+k_n\\mathbf{v}_n$; the scalars $k_i$ are the **coefficients**. To find $a, b$ with $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$, equate components: one equation per component. In $R^3$ or $R^4$ that is more equations than unknowns, so there may be **no** solution.",
      ],
      formulas: [
        "\\overrightarrow{P_1P_2} = (x_2-x_1,\\ y_2-y_1,\\ z_2-z_1)",
        "\\mathbf{v}+\\mathbf{w} = (v_1+w_1,\\ \\dots,\\ v_n+w_n), \\qquad k\\mathbf{v} = (kv_1,\\ \\dots,\\ kv_n)",
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
        "Solving two of the equations and stopping: the remaining equation can fail, and then **no** such scalars exist.",
        "$\\overrightarrow{PQ} = Q - P$. Writing $P - Q$ gives the oppositely directed vector.",
        "The components of $\\overrightarrow{PQ}$ are not the coordinates of $Q$ unless $P$ is the origin.",
      ],
      recall: [
        { q: "Vector from $P(2,-1,4)$ to $Q(5,1,1)$?", a: "$Q - P = (3, 2, -3)$." },
        { q: "How many equations does $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$ give in $R^4$?", a: "Four (one per component), in two unknowns." },
        { q: "Write $(4,-2,7)$ as a linear combination of $\\mathbf{i},\\mathbf{j},\\mathbf{k}$.", a: "$4\\mathbf{i}-2\\mathbf{j}+7\\mathbf{k}$." },
      ],
    },
    {
      title: "Norm, unit vectors and distance",
      refs: ["Slides 0A Norm, unit vector, distance in R^n (vec p17–p19)", "Tutorial 0A Q2, Q3, Q4, Q5"],
      intuition:
        "Length comes from Pythagoras, applied once per extra dimension. Dividing a vector by its length keeps the direction and throws away the size, which is exactly what a unit vector is.",
      keyIdeas: [
        "**Norm** (length, magnitude): $\\|\\mathbf{v}\\| = \\sqrt{v_1^2+\\dots+v_n^2}$. Theorem: $\\|\\mathbf{v}\\| \\ge 0$; $\\|\\mathbf{v}\\| = 0$ if and only if $\\mathbf{v} = \\mathbf{0}$; $\\|k\\mathbf{v}\\| = |k|\\,\\|\\mathbf{v}\\|$.",
        "**Unit vector**: a vector of norm 1, useful for specifying a direction when length is not relevant. **Normalizing** a nonzero $\\mathbf{v}$: $\\mathbf{u} = \\frac{1}{\\|\\mathbf{v}\\|}\\mathbf{v}$ is the unit vector in the same direction as $\\mathbf{v}$; $-\\frac{1}{\\|\\mathbf{v}\\|}\\mathbf{v}$ is oppositely directed.",
        "A vector of length $L$ in the direction of $\\mathbf{v}$ is $L$ times the unit vector: $\\frac{L}{\\|\\mathbf{v}\\|}\\mathbf{v}$ (since $\\|k\\mathbf{v}\\| = |k|\\,\\|\\mathbf{v}\\|$).",
        "**Distance** between points $\\mathbf{u}, \\mathbf{v}$ in $R^n$: $d(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u}-\\mathbf{v}\\| = \\sqrt{(u_1-v_1)^2+\\dots+(u_n-v_n)^2}$.",
      ],
      formulas: [
        "\\|\\mathbf{v}\\| = \\sqrt{v_1^2+v_2^2+\\cdots+v_n^2}, \\qquad \\mathbf{u} = \\frac{1}{\\|\\mathbf{v}\\|}\\mathbf{v}",
        "d(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u}-\\mathbf{v}\\|",
      ],
      example: {
        problem:
          "Find the initial point of a vector $\\mathbf{u}$ of length $6$ with terminal point $Q(0,1,-1)$ that is oppositely directed to $\\mathbf{v} = (1,-2,2)$.",
        steps: [
          "$\\|\\mathbf{v}\\| = \\sqrt{1+4+4} = 3$, so the unit vector opposite to $\\mathbf{v}$ is $-\\tfrac13(1,-2,2)$.",
          "Length 6: $\\mathbf{u} = 6\\cdot\\left(-\\tfrac13\\right)(1,-2,2) = (-2,4,-4)$. Check: $\\|\\mathbf{u}\\| = \\sqrt{4+16+16} = 6$ ✓.",
          "$\\mathbf{u} = \\overrightarrow{PQ} = Q - P$, so $P = Q - \\mathbf{u} = (0+2,\\ 1-4,\\ -1+4) = (2,-3,3)$.",
        ],
        answer: "$P = (2,-3,3)$.",
      },
      pitfalls: [
        "Normalize by dividing by $\\|\\mathbf{v}\\|$, not $\\|\\mathbf{v}\\|^2$ and not the sum of the components.",
        "$\\|-3\\mathbf{v}\\| = 3\\|\\mathbf{v}\\|$, never negative.",
        "$\\|3\\mathbf{u}\\|-\\|5\\mathbf{v}\\|+\\|\\mathbf{w}\\|$ is not $\\|3\\mathbf{u}-5\\mathbf{v}+\\mathbf{w}\\|$ (Tutorial 0A Q3 asks for both).",
      ],
      recall: [
        { q: "Unit vector oppositely directed to $(3,-4)$?", a: "$(-\\tfrac35, \\tfrac45)$." },
        { q: "Norm of $(1,1,1,1)$ in $R^4$?", a: "$\\sqrt4 = 2$." },
        { q: "Distance between $(3,3,3)$ and $(1,0,4)$?", a: "$\\sqrt{4+9+1} = \\sqrt{14}$." },
      ],
    },
    {
      title: "Dot product, angles and orthogonality",
      refs: ["Slides 0A Dot product, component form (vec p20–p21)", "Slides 0A Angles in R^n, Orthogonality (vec p24, p26)", "Tutorial 0A Q4, Q6, Q7"],
      intuition:
        "The dot product multiplies matching components and adds. That single number measures how much two vectors point the same way, so it gives angles, right-angle tests and the work done by a force.",
      keyIdeas: [
        "$\\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$ with $0\\le\\theta\\le\\pi$, and in components $\\mathbf{u}\\cdot\\mathbf{v} = u_1v_1+\\dots+u_nv_n$. The result is a **scalar**. If $\\mathbf{u} = \\mathbf{0}$ or $\\mathbf{v} = \\mathbf{0}$, $\\mathbf{u}\\cdot\\mathbf{v} = 0$.",
        "Angle: $\\theta = \\cos^{-1}\\left(\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}\\right)$. $\\theta$ is acute if $\\mathbf{u}\\cdot\\mathbf{v}>0$, obtuse if $\\mathbf{u}\\cdot\\mathbf{v}<0$, and $\\theta = \\pi/2$ if $\\mathbf{u}\\cdot\\mathbf{v} = 0$.",
        "**Orthogonal**: nonzero $\\mathbf{u}, \\mathbf{v}$ with $\\mathbf{u}\\cdot\\mathbf{v} = 0$. An **orthogonal set** is a nonempty set in which all pairs of distinct vectors are orthogonal.",
        "**Right-angle triangle test** (Tutorial 0A Q6): triangle $ABC$ has a right angle at $B$ iff $\\overrightarrow{BA}\\cdot\\overrightarrow{BC} = 0$. Use the two vectors leaving the same vertex, and check all three vertices.",
        "**Work** (Tutorial 0A Q7): Work $= \\mathbf{F}\\cdot\\mathbf{r}$, where $\\mathbf{r} = \\overrightarrow{PQ}$ is the displacement (not a position vector).",
      ],
      formulas: [
        "\\mathbf{u}\\cdot\\mathbf{v} = u_1v_1+\\cdots+u_nv_n = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos\\theta",
        "\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}",
      ],
      example: {
        problem:
          "Do $A(1,0,2)$, $B(3,1,1)$, $C(4,0,2)$ form a right-angled triangle? Find $\\cos$ of the angle at $A$, and the work done by $\\mathbf{F} = (2,-1,3)$ moving a particle from $A$ to $C$.",
        steps: [
          "At $A$: $\\overrightarrow{AB} = (2,1,-1)$, $\\overrightarrow{AC} = (3,0,0)$, dot $= 6 \\ne 0$.",
          "At $B$: $\\overrightarrow{BA} = (-2,-1,1)$, $\\overrightarrow{BC} = (1,-1,1)$, dot $= -2+1+1 = 0$. **Right angle at $B$.**",
          "$\\cos A = \\dfrac{\\overrightarrow{AB}\\cdot\\overrightarrow{AC}}{\\|\\overrightarrow{AB}\\|\\|\\overrightarrow{AC}\\|} = \\dfrac{6}{\\sqrt6\\cdot 3} = \\dfrac{\\sqrt6}{3}$ (positive dot product, so acute).",
          "Work: $\\mathbf{r} = \\overrightarrow{AC} = (3,0,0)$, so $\\mathbf{F}\\cdot\\mathbf{r} = (2,-1,3)\\cdot(3,0,0) = 6$.",
        ],
        answer: "Yes, right-angled at $B$; $\\cos A = \\sqrt6/3$; work $= 6$.",
      },
      pitfalls: [
        "For the angle **at** $B$ use $\\overrightarrow{BA}$ and $\\overrightarrow{BC}$. Using $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$ flips the sign of the dot product, and so of $\\cos$.",
        "A triangle can have its right angle at any vertex. Checking only one vertex and answering \"no\" is a common slip.",
        "Work uses the displacement $Q-P$, not the position vector of $Q$.",
      ],
      recall: [
        { q: "$\\mathbf{u}\\cdot\\mathbf{v} = -3$. Acute or obtuse?", a: "Obtuse ($\\mathbf{u}\\cdot\\mathbf{v}<0$)." },
        { q: "Find $k$ so that $(1,k,2)$ and $(3,-1,1)$ are orthogonal.", a: "$3 - k + 2 = 0$, so $k = 5$." },
        { q: "$\\cos\\theta$ for $\\mathbf{u} = (3,3,3)$, $\\mathbf{v} = (1,0,4)$?", a: "$\\dfrac{3+0+12}{\\sqrt{27}\\sqrt{17}} = \\dfrac{15}{\\sqrt{27}\\sqrt{17}}$ (Tutorial 0A Q4)." },
      ],
    },
    {
      title: "Dot product algebra: expanding norms, Cauchy–Schwarz, triangle inequality",
      refs: [
        "Slides 0A Algebraic properties of the dot product (vec p22–p23)",
        "Slides 0A Angles in R^n, Geometry in R^n (vec p24–p25)",
        "PYP AY25/26 S1 Q1",
        "PYP AY24/25 S2 Q13",
        "PYP AY23/24 S1 Q3(b)",
        "PYP AY25/26 S2 Q13",
      ],
      intuition:
        "Because $\\mathbf{v}\\cdot\\mathbf{v} = \\|\\mathbf{v}\\|^2$ and the dot product distributes, you can expand $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2$ like a square. That links lengths to the dot product, which is how the past-paper questions recover a missing length or angle.",
      visuals: ["parallelogram-law"],
      keyIdeas: [
        "$\\mathbf{v}\\cdot\\mathbf{v} = v_1^2+\\dots+v_n^2 = \\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v}\\cdot\\mathbf{v}}$.",
        "Properties: $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{v}\\cdot\\mathbf{u}$ [symmetry]; $\\mathbf{u}\\cdot(\\mathbf{v}+\\mathbf{w}) = \\mathbf{u}\\cdot\\mathbf{v}+\\mathbf{u}\\cdot\\mathbf{w}$ [distributive]; $k(\\mathbf{u}\\cdot\\mathbf{v}) = (k\\mathbf{u})\\cdot\\mathbf{v} = \\mathbf{u}\\cdot(k\\mathbf{v})$ [homogeneity]; $\\mathbf{v}\\cdot\\mathbf{v}\\ge0$ with equality iff $\\mathbf{v} = \\mathbf{0}$ [positivity]; also $\\mathbf{0}\\cdot\\mathbf{v} = 0$, $(\\mathbf{u}\\pm\\mathbf{v})\\cdot\\mathbf{w} = \\mathbf{u}\\cdot\\mathbf{w}\\pm\\mathbf{v}\\cdot\\mathbf{w}$.",
        "Expanding with these properties: $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = (\\mathbf{u}\\pm\\mathbf{v})\\cdot(\\mathbf{u}\\pm\\mathbf{v}) = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$. Adding the two versions gives the parallelogram law $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$ (PYP AY24/25 S2 Q13).",
        "\"A unit vector $\\mathbf{x}$ makes angle $\\theta$ with the $z$-axis\" means $\\mathbf{x}\\cdot\\mathbf{k} = \\|\\mathbf{x}\\|\\|\\mathbf{k}\\|\\cos\\theta = \\cos\\theta$, i.e. the third component is $\\cos\\theta$ (PYP AY25/26 S1 Q1).",
        "**Cauchy–Schwarz inequality**: $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$. This is why $-1 \\le \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|} \\le 1$ and the angle $\\theta$ is always defined.",
        "**Triangle inequalities**: $\\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$ [for vectors] and $d(\\mathbf{u},\\mathbf{v}) \\le d(\\mathbf{u},\\mathbf{w})+d(\\mathbf{w},\\mathbf{v})$ [for distances].",
      ],
      formulas: [
        "\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2",
        "\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2",
        "|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|, \\qquad \\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|",
      ],
      example: {
        problem:
          "$\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 5$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 7$. Find $\\|\\mathbf{v}\\|$, $\\mathbf{u}\\cdot\\mathbf{v}$ and $\\cos\\theta$.",
        steps: [
          "Parallelogram law: $25 + 49 = 2(9) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = 28$ and $\\|\\mathbf{v}\\| = 2\\sqrt7$.",
          "Expand one norm: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = 9 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + 28 = 25$, so $\\mathbf{u}\\cdot\\mathbf{v} = -6$.",
          "$\\cos\\theta = \\dfrac{-6}{3\\cdot 2\\sqrt7} = -\\dfrac{1}{\\sqrt7}$, so the angle is obtuse.",
          "Sanity check with Cauchy–Schwarz: $|{-6}| \\le 3\\cdot2\\sqrt7 \\approx 15.9$ ✓.",
        ],
        answer: "$\\|\\mathbf{v}\\| = 2\\sqrt7$, $\\mathbf{u}\\cdot\\mathbf{v} = -6$, $\\cos\\theta = -1/\\sqrt7$.",
      },
      pitfalls: [
        "Forgetting the factor 2 on the right of the parallelogram law, or forgetting to square the given norms.",
        "$\\|\\mathbf{u}+\\mathbf{v}\\|^2 \\ne \\|\\mathbf{u}\\|^2+\\|\\mathbf{v}\\|^2$ in general: the cross term $2\\,\\mathbf{u}\\cdot\\mathbf{v}$ vanishes only when $\\mathbf{u}\\cdot\\mathbf{v} = 0$.",
        "The triangle inequality gives a bound, not a value. From $\\|\\mathbf{u}\\|$ and $\\|\\mathbf{v}\\|$ alone, $\\|\\mathbf{u}+\\mathbf{v}\\|$ cannot be determined.",
      ],
      recall: [
        { q: "$\\|\\mathbf{a}\\| = \\|\\mathbf{b}\\| = 2$ and $\\mathbf{a}\\cdot\\mathbf{b} = \\alpha$. What is $\\|\\mathbf{a}-\\mathbf{b}\\|^2$?", a: "$4 - 2\\alpha + 4 = 8 - 2\\alpha$ (PYP AY23/24 S1 Q3(b))." },
        { q: "$\\|\\mathbf{u}\\| = 4$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 2$, $\\|\\mathbf{u}-\\mathbf{v}\\| = 6$. Find $\\|\\mathbf{v}\\|$.", a: "$4 + 36 = 2(16) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\| = 2$ (PYP AY24/25 S2 Q13)." },
        { q: "$\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 5$. Largest possible value of $\\mathbf{u}\\cdot\\mathbf{v}$?", a: "$10$, by Cauchy–Schwarz ($\\mathbf{v} = \\tfrac52\\mathbf{u}$ attains it)." },
      ],
    },
    {
      title: "Lines and planes: point-normal, vector and parametric forms",
      refs: [
        "Slides 0A Lines and planes determined by points and normals (vec p27)",
        "Slides 0A Vector and parametric equations of lines and planes (vec p28–p29)",
        "Tutorial 0A Q8, Q9, Q10",
        "PYP AY25/26 S2 Q1",
        "PYP AY24/25 S2 Q1",
      ],
      intuition:
        "A line is a point plus one free direction; a plane is a point plus two free directions, or a point plus one normal that every direction in it must be orthogonal to. Each form of equation encodes one of these descriptions.",
      keyIdeas: [
        "A **normal** $\\mathbf{n}$ is a nonzero vector orthogonal to the line or plane. Point-normal equation: $\\mathbf{n}\\cdot\\overrightarrow{P_0P} = 0$. Line in $R^2$ with $\\mathbf{n} = (a,b)$: $a(x-x_0)+b(y-y_0) = 0$. Plane in $R^3$ with $\\mathbf{n} = (a,b,c)$: $a(x-x_0)+b(y-y_0)+c(z-z_0) = 0$.",
        "Multiplying out the point-normal equation gives the form $ax+by+cz = ax_0+by_0+cz_0$ (e.g. PYP AY25/26 S2 Q1: $2x - y + z = -7$). A point lies on the plane iff it satisfies the equation.",
        "**Line, vector form**: the line through $\\mathbf{x}_0$ parallel to $\\mathbf{v}$ is $\\mathbf{x} = \\mathbf{x}_0 + t\\mathbf{v}$ (or $\\mathbf{x}-\\mathbf{x}_0 = t\\mathbf{v}$), $-\\infty<t<\\infty$; $t$ is a **parameter**. If $\\mathbf{x}_0 = \\mathbf{0}$ the line passes through the origin. Through two points $A, B$: take $\\mathbf{v} = \\overrightarrow{AB}$ (Tutorial 0A Q10).",
        "**Plane, vector form**: the plane through $\\mathbf{x}_0$ parallel to the **noncollinear** vectors $\\mathbf{v}_1, \\mathbf{v}_2$ is $\\mathbf{x} = \\mathbf{x}_0 + t_1\\mathbf{v}_1 + t_2\\mathbf{v}_2$, with parameters $t_1, t_2$. If $\\mathbf{x}_0 = \\mathbf{0}$ it passes through the origin.",
        "**Parametric equations** are the vector form written component by component, e.g. $x = -3-5t_2,\\ y = 1-3t_1+t_2,\\ z = 6t_1+2t_2$ (Tutorial 0A Q9).",
      ],
      formulas: [
        "a(x-x_0)+b(y-y_0)+c(z-z_0) = 0",
        "\\text{line: } \\mathbf{x} = \\mathbf{x}_0 + t\\,\\mathbf{v}, \\qquad \\text{plane: } \\mathbf{x} = \\mathbf{x}_0 + t_1\\mathbf{v}_1 + t_2\\mathbf{v}_2",
      ],
      example: {
        problem:
          "(a) Find the point-normal equation of the plane through $P(-1,3,-2)$ with normal $\\mathbf{n} = (-2,1,-1)$, and multiply it out. (b) Find the vector and parametric equations of the plane through $(2,-1,1)$ parallel to $\\mathbf{v}_1 = (1,0,-2)$ and $\\mathbf{v}_2 = (0,3,1)$.",
        steps: [
          "(a) Point-normal: $-2(x+1) + (y-3) - (z+2) = 0$ (Tutorial 0A Q8).",
          "Multiply out: $-2x + y - z - 2 - 3 - 2 = 0$, i.e. $-2x + y - z = 7$, or $2x - y + z = -7$ (PYP AY25/26 S2 Q1). Check $P$: $-2 - 3 - 2 = -7$ ✓.",
          "(b) $\\mathbf{v}_1, \\mathbf{v}_2$ are not scalar multiples of each other, so they are noncollinear. Vector form: $(x,y,z) = (2,-1,1) + t_1(1,0,-2) + t_2(0,3,1)$.",
          "Parametric: $x = 2+t_1,\\ y = -1+3t_2,\\ z = 1-2t_1+t_2$.",
        ],
        answer: "(a) $-2(x+1)+(y-3)-(z+2) = 0$, i.e. $2x - y + z = -7$. (b) $x = 2+t_1,\\ y = -1+3t_2,\\ z = 1-2t_1+t_2$.",
      },
      pitfalls: [
        "Do not confuse a line's **direction** $\\mathbf{v}$ (parallel to the line) with a **normal** $\\mathbf{n}$ (orthogonal to it). In $R^2$, the line through $(1,2)$ with normal $(3,-1)$ is $3x - y = 1$, not $x + 3y = 7$.",
        "Sign of the right-hand side: $ax+by+cz = ax_0+by_0+cz_0$. Check by substituting $P_0$.",
        "A \"plane\" $\\mathbf{x} = \\mathbf{x}_0+t_1\\mathbf{v}_1+t_2\\mathbf{v}_2$ needs $\\mathbf{v}_1, \\mathbf{v}_2$ noncollinear; if $\\mathbf{v}_2 = k\\mathbf{v}_1$ the set is only a line.",
      ],
      recall: [
        { q: "A normal to $3x - y + 4z = 7$?", a: "$(3,-1,4)$, read off the coefficients of the multiplied-out point-normal form." },
        { q: "Vector equation of the line through $A(1,4,6)$ and $B(3,4,7)$?", a: "$\\mathbf{r} = (1,4,6) + t(2,0,1)$ (Tutorial 0A Q10)." },
        { q: "Does the plane $\\mathbf{x} = t_1(1,2,0) + t_2(0,1,1)$ pass through the origin?", a: "Yes: $\\mathbf{x}_0 = \\mathbf{0}$ (take $t_1 = t_2 = 0$)." },
      ],
    },
    {
      title: "Where lines meet planes",
      refs: ["Slides 0A Vector and parametric equations (vec p28–p29)", "Tutorial 0A Q10", "PYP AY24/25 S2 Q2", "PYP AY24/25 S2 Q11"],
      visuals: ["line-plane-3d"],
      intuition:
        "A point of the line has coordinates depending on $t$. Asking where it meets a plane means asking which $t$ makes those coordinates satisfy the plane's equation: one $t$, no $t$, or every $t$.",
      keyIdeas: [
        "**Coordinate planes**: the $x$–$y$ plane is $z = 0$, the $y$–$z$ plane is $x = 0$, the $x$–$z$ plane is $y = 0$. To find where a line meets the $x$–$y$ plane, set its $z$-coordinate to 0, solve for $t$, and substitute back (Tutorial 0A Q10: $(1,4,6)+t(2,0,1)$ meets it at $t = -6$, the point $(-11,4,0)$).",
        "**Line meets a plane given by an equation**: substitute the parametric equations $x(t), y(t), z(t)$ into $ax+by+cz = d$ and solve the resulting equation in $t$.",
        "**Line meets a plane given in vector form** (PYP AY24/25 S2 Q2): set $\\mathbf{x}_0+\\lambda\\mathbf{a}+\\mu\\mathbf{b} = \\mathbf{y}_0+\\beta\\mathbf{d}$, equate components and solve the $3\\times3$ system for $\\lambda, \\mu, \\beta$.",
        "**A line lies on a plane** when **every** point of the line satisfies the plane's equation (PYP AY24/25 S2 Q11). Substituting $\\mathbf{x}_0+t\\mathbf{v}$ into $\\mathbf{n}\\cdot\\mathbf{x} = d$ gives $\\mathbf{n}\\cdot\\mathbf{x}_0 + t\\,(\\mathbf{n}\\cdot\\mathbf{v}) = d$; this holds for every $t$ exactly when $\\mathbf{n}\\cdot\\mathbf{v} = 0$ **and** $\\mathbf{n}\\cdot\\mathbf{x}_0 = d$. If $\\mathbf{n}\\cdot\\mathbf{v} = 0$ but $\\mathbf{n}\\cdot\\mathbf{x}_0 \\ne d$, no $t$ works and the line never meets the plane.",
        "A line may also be described by a point and two vectors orthogonal to its direction (PYP AY24/25 S2 Q11). Its direction $\\mathbf{v}$ then satisfies $\\mathbf{v}\\cdot\\mathbf{a} = 0$ and $\\mathbf{v}\\cdot\\mathbf{b} = 0$; solve these two equations for $\\mathbf{v}$.",
      ],
      formulas: [
        "\\mathbf{n}\\cdot(\\mathbf{x}_0+t\\mathbf{v}) = d \\iff \\mathbf{n}\\cdot\\mathbf{x}_0 + t\\,(\\mathbf{n}\\cdot\\mathbf{v}) = d",
      ],
      example: {
        problem:
          "The line $L$ passes through $A(2,-1,3)$ and $B(4,1,2)$. Find where $L$ meets the $x$–$y$ plane and where it meets the plane $x+y+z = 1$.",
        steps: [
          "$\\mathbf{v} = \\overrightarrow{AB} = (2,2,-1)$, so $x = 2+2t,\\ y = -1+2t,\\ z = 3-t$.",
          "$x$–$y$ plane: $z = 3-t = 0 \\Rightarrow t = 3$, giving $(8, 5, 0)$.",
          "Plane: $(2+2t)+(-1+2t)+(3-t) = 4+3t = 1 \\Rightarrow t = -1$, giving $(0,-3,4)$.",
          "Check: $0-3+4 = 1$ ✓.",
        ],
        answer: "$x$–$y$ plane at $(8,5,0)$; the plane $x+y+z=1$ at $(0,-3,4)$.",
      },
      pitfalls: [
        "The $x$–$y$ plane is $z = 0$ (not $x = y$). Read which coordinate must vanish.",
        "If the coefficient of $t$ is 0 after substituting, do not divide by it: compare the constants to decide between \"lies on the plane\" (every $t$) and \"never meets it\" (no $t$).",
        "For \"which line lies on the plane\", checking only the direction is not enough: one point of the line must also satisfy the equation.",
      ],
      recall: [
        { q: "When does the line $\\mathbf{x}_0+t\\mathbf{v}$ lie on the plane $\\mathbf{n}\\cdot\\mathbf{x} = d$?", a: "When $\\mathbf{n}\\cdot\\mathbf{v} = 0$ **and** $\\mathbf{n}\\cdot\\mathbf{x}_0 = d$." },
        { q: "Where does $x = 3+t,\\ y = -2+2t,\\ z = 5-t$ meet the $y$–$z$ plane?", a: "$x = 0$ gives $t = -3$: the point $(0,-8,8)$." },
        { q: "Plane $\\mathbf{r} = \\mathbf{x}_0+\\lambda\\mathbf{a}+\\mu\\mathbf{b}$ and line $\\mathbf{s} = \\mathbf{y}_0+\\beta\\mathbf{d}$: how do you find the meeting point?", a: "Set $\\mathbf{r} = \\mathbf{s}$, equate the three components and solve for $\\lambda, \\mu, \\beta$." },
      ],
    },
  ],
  playbook: [
    "If you see \"find $a, b$ with $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$\" → equate components, solve two equations, and **check the remaining ones** before answering.",
    "If you see an initial point with a given terminal point $Q$ → $P = Q - \\mathbf{u}$; for \"oppositely directed to $\\mathbf{v}$\" take $\\mathbf{u} = k\\mathbf{v}$ with $k<0$.",
    "If you see \"unit vector in the direction of $\\mathbf{v}$\" → $\\frac{1}{\\|\\mathbf{v}\\|}\\mathbf{v}$; opposite direction → $-\\frac{1}{\\|\\mathbf{v}\\|}\\mathbf{v}$; length $L$ → multiply the unit vector by $L$.",
    "If you see a unit vector at angle $\\theta$ with an axis → that component equals $\\cos\\theta$ (dot with $\\mathbf{i}$, $\\mathbf{j}$ or $\\mathbf{k}$); use $\\|\\mathbf{x}\\| = 1$ and expand any other norm condition, e.g. $\\|\\mathbf{x}+\\mathbf{i}\\|^2 = 1+2x_1+1$.",
    "If you see acute/obtuse/orthogonal → only the sign of $\\mathbf{u}\\cdot\\mathbf{v}$ matters.",
    "If you see \"right-angled triangle\" → dot the two edge vectors leaving each vertex; one zero means yes.",
    "If you see work → $\\mathbf{F}\\cdot\\mathbf{r}$ with $\\mathbf{r} = Q-P$; build $\\mathbf{F}$ from magnitude × unit direction first if needed.",
    "If you see $\\|\\mathbf{u}+\\mathbf{v}\\|$ and $\\|\\mathbf{u}-\\mathbf{v}\\|$ → parallelogram law for $\\|\\mathbf{v}\\|$; expand $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2\\pm2\\,\\mathbf{u}\\cdot\\mathbf{v}+\\|\\mathbf{v}\\|^2$ for $\\mathbf{u}\\cdot\\mathbf{v}$.",
    "If you see \"maximum of $|\\mathbf{v}^T\\mathbf{w}|$ over $\\|\\mathbf{v}\\|\\le r$\" → Cauchy–Schwarz bound $r\\|\\mathbf{w}\\|$, reached at $\\mathbf{v} = \\frac{r}{\\|\\mathbf{w}\\|}\\mathbf{w}$.",
    "If you see a plane through a point with a normal → $a(x-x_0)+b(y-y_0)+c(z-z_0) = 0$; multiply out and check the point.",
    "If you see a plane through a point parallel to two vectors (or through three points) → vector form $\\mathbf{x} = \\mathbf{x}_0+t_1\\mathbf{v}_1+t_2\\mathbf{v}_2$ with displacement vectors, then read off the parametric equations.",
    "If you see a line meeting a coordinate plane or a plane equation → substitute the parametric line and solve for $t$.",
    "If you see a plane and a line both in vector form → equate them and solve for the parameters.",
    "If you see \"which line lies on the plane\" → need direction $\\cdot\\,\\mathbf{n} = 0$ **and** one point on the plane.",
  ],
};
