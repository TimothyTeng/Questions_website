import type { Lesson } from "@/lib/types";

export const orthogonalityLesson: Lesson = {
  topic: "orthogonality",
  bigPicture:
    "Orthogonality turns geometry (lengths, angles, \"closest point\") into algebra built on the dot product. The chain goes: dot product → orthogonal complements, linking $\\operatorname{Row}$/$\\operatorname{Col}$ with $\\operatorname{Nul}$ → orthogonal bases, where coordinates are just dot products → projection onto a subspace, the unique closest point → Gram–Schmidt, which builds an orthogonal basis from any basis → $A = QR$. Every idea feeds straight into least squares: the best approximate solution of $A\\mathbf{x} = \\mathbf{b}$ is the projection of $\\mathbf{b}$ onto $\\operatorname{Col}A$.",
  sections: [
    {
      title: "Dot product, norm, angle and the inequalities",
      intuition:
        "The dot product measures how much two vectors point the same way. A vector's length is the square root of its dot product with itself, and dividing by the lengths gives the cosine of the angle.",
      keyIdeas: [
        "$\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}^T\\mathbf{v} = u_1v_1 + \\dots + u_nv_n$. It is symmetric, linear in each argument, and $\\mathbf{u}\\cdot\\mathbf{u} \\ge 0$ with equality only for $\\mathbf{u} = \\mathbf{0}$.",
        "Norm: $\\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v}\\cdot\\mathbf{v}}$; $\\|c\\mathbf{v}\\| = |c|\\,\\|\\mathbf{v}\\|$. Unit vector in the direction of $\\mathbf{v}$: $\\mathbf{v}/\\|\\mathbf{v}\\|$ (normalising).",
        "Distance: $\\operatorname{dist}(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u}-\\mathbf{v}\\|$.",
        "Sign of $\\mathbf{u}\\cdot\\mathbf{v}$: positive means an acute angle, zero means perpendicular, negative means obtuse.",
        "**Cauchy–Schwarz**: $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$, with equality iff $\\mathbf{u}, \\mathbf{v}$ are parallel (dependent). **Triangle**: $\\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$.",
      ],
      formulas: [
        "\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}",
        "\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2",
      ],
      example: {
        problem:
          "Find the angle between $\\mathbf{u} = (1,1,0)$ and $\\mathbf{v} = (1,0,1)$, and the unit vector in the direction of $\\mathbf{u}$.",
        steps: [
          "$\\mathbf{u}\\cdot\\mathbf{v} = 1\\cdot1 + 1\\cdot0 + 0\\cdot1 = 1$.",
          "$\\|\\mathbf{u}\\| = \\sqrt{1+1+0} = \\sqrt2$ and $\\|\\mathbf{v}\\| = \\sqrt2$.",
          "$\\cos\\theta = 1/(\\sqrt2\\cdot\\sqrt2) = 1/2$, so $\\theta = 60^\\circ$.",
          "Unit vector: $\\mathbf{u}/\\|\\mathbf{u}\\| = (1/\\sqrt2,\\ 1/\\sqrt2,\\ 0)$.",
        ],
        answer: "$\\theta = 60^\\circ$; $\\hat{\\mathbf{u}} = (1/\\sqrt2, 1/\\sqrt2, 0)$.",
      },
      pitfalls: [
        "Cauchy–Schwarz equality holds for **any** parallel pair (including opposite directions), not just $\\mathbf{u} = \\mathbf{v}$.",
        "The triangle inequality gives a bound, not a value. Knowing only $\\|\\mathbf{u}\\|$ and $\\|\\mathbf{v}\\|$, $\\|\\mathbf{u}+\\mathbf{v}\\|$ is \"not enough information\".",
        "$\\|\\mathbf{u}+\\mathbf{v}\\|^2 \\ne \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2$ unless $\\mathbf{u}\\perp\\mathbf{v}$. Do not forget the cross term.",
      ],
      recall: [
        { q: "When is $|\\mathbf{u}\\cdot\\mathbf{v}| = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$?", a: "Exactly when $\\mathbf{u}$ and $\\mathbf{v}$ are linearly dependent (one is a scalar multiple of the other)." },
        { q: "What does a negative dot product tell you about the angle?", a: "The angle is obtuse ($90^\\circ < \\theta \\le 180^\\circ$)." },
        { q: "Range of $\\|\\mathbf{u}+\\mathbf{v}\\|$ if $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{v}\\| = 4$?", a: "Between $1$ and $7$. It is $5$ if they are orthogonal." },
      ],
    },
    {
      title: "Orthogonality and orthogonal complements",
      intuition:
        "$W^\\perp$ is everything perpendicular to a whole subspace. Each row of $A$ dotted with a solution of $A\\mathbf{x} = \\mathbf{0}$ gives zero, so null spaces are exactly orthogonal complements of row spaces.",
      keyIdeas: [
        "$\\mathbf{u}\\perp\\mathbf{v}$ iff $\\mathbf{u}\\cdot\\mathbf{v} = 0$. $\\mathbf{0}$ is orthogonal to every vector.",
        "**Pythagoras**: $\\mathbf{u}\\perp\\mathbf{v} \\iff \\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2+\\|\\mathbf{v}\\|^2$ (both directions).",
        "$W^\\perp = \\{\\mathbf{z} : \\mathbf{z}\\cdot\\mathbf{w} = 0\\ \\forall\\mathbf{w}\\in W\\}$ is a subspace. To test membership it is enough to check orthogonality to a **spanning set** of $W$.",
        "$W\\cap W^\\perp = \\{\\mathbf{0}\\}$, $(W^\\perp)^\\perp = W$, and $\\dim W + \\dim W^\\perp = n$.",
        "For $A$ ($m\\times n$): $(\\operatorname{Row}A)^\\perp = \\operatorname{Nul}A$ (in $\\mathbb{R}^n$) and $(\\operatorname{Col}A)^\\perp = \\operatorname{Nul}A^T$ (in $\\mathbb{R}^m$).",
      ],
      formulas: [
        "(\\operatorname{Row}A)^\\perp = \\operatorname{Nul}A, \\qquad (\\operatorname{Col}A)^\\perp = \\operatorname{Nul}(A^T)",
        "\\dim W + \\dim W^\\perp = n",
      ],
      example: {
        problem: "Let $W = \\{\\mathbf{x}\\in\\mathbb{R}^3 : x_1 - 2x_2 + x_3 = 0\\}$. Find a basis for $W$ and for $W^\\perp$.",
        steps: [
          "$W = \\operatorname{Nul}A$ with $A = \\begin{bmatrix}1 & -2 & 1\\end{bmatrix}$. Free variables $x_2, x_3$: $x_1 = 2x_2 - x_3$.",
          "Basis of $W$: $(2,1,0)$ and $(-1,0,1)$, so $\\dim W = 2$.",
          "$W^\\perp = (\\operatorname{Nul}A)^\\perp = \\operatorname{Row}A = \\operatorname{Span}\\{(1,-2,1)\\}$.",
          "Check: $(1,-2,1)\\cdot(2,1,0) = 0$ and $(1,-2,1)\\cdot(-1,0,1) = 0$. Dimensions $2 + 1 = 3$ ✓.",
        ],
        answer: "$W = \\operatorname{Span}\\{(2,1,0),(-1,0,1)\\}$, $W^\\perp = \\operatorname{Span}\\{(1,-2,1)\\}$.",
      },
      pitfalls: [
        "Do not swap the pairs: Row goes with $\\operatorname{Nul}A$, Col goes with $\\operatorname{Nul}A^T$. Check which space ($\\mathbb{R}^n$ or $\\mathbb{R}^m$) each lives in.",
        "Being orthogonal to *some* vectors of $W$ is not enough. You need orthogonality to a full spanning set.",
        "Dimension questions: $\\dim\\operatorname{Nul}A = n - r$ and $\\dim\\operatorname{Nul}A^T = m - r$.",
      ],
      recall: [
        { q: "$(\\operatorname{Col}A)^\\perp = ?$", a: "$\\operatorname{Nul}(A^T)$, a subspace of $\\mathbb{R}^m$." },
        { q: "Why is $W\\cap W^\\perp = \\{\\mathbf{0}\\}$?", a: "A vector in both is orthogonal to itself: $\\|\\mathbf{x}\\|^2 = 0$, so $\\mathbf{x} = \\mathbf{0}$." },
        { q: "$A$ is $4\\times6$ with rank 3. What are $\\dim(\\operatorname{Row}A)^\\perp$ and $\\dim(\\operatorname{Col}A)^\\perp$?", a: "$6-3 = 3$ and $4-3 = 1$." },
      ],
    },
    {
      title: "Orthogonal sets and projection onto a line",
      intuition:
        "With an orthogonal basis you never need to row-reduce to find coordinates. Each coefficient is one dot product, because the other basis vectors \"don't interfere\".",
      keyIdeas: [
        "Orthogonal set: every pair is orthogonal. An orthogonal set of **nonzero** vectors is linearly independent, so $n$ of them in $\\mathbb{R}^n$ form a basis.",
        "If $\\{\\mathbf{u}_1,\\dots,\\mathbf{u}_p\\}$ is an orthogonal basis of $W$ and $\\mathbf{y}\\in W$, then $\\mathbf{y} = \\sum c_j\\mathbf{u}_j$ with $c_j = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_j}{\\mathbf{u}_j\\cdot\\mathbf{u}_j}$.",
        "Projection onto a line $L = \\operatorname{Span}\\{\\mathbf{u}\\}$: $\\hat{\\mathbf{y}} = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}\\mathbf{u}$. The residual $\\mathbf{z} = \\mathbf{y}-\\hat{\\mathbf{y}}$ is orthogonal to $\\mathbf{u}$.",
        "The projection depends only on the line, not on which nonzero $\\mathbf{u}$ spans it. Rescaling $\\mathbf{u}$ cancels out.",
        "Distance from $\\mathbf{y}$ to the line is $\\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|$.",
      ],
      formulas: [
        "\\operatorname{Proj}_L\\mathbf{y} = \\frac{\\mathbf{y}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}\\,\\mathbf{u} = \\frac{\\mathbf{u}\\mathbf{u}^T}{\\mathbf{u}^T\\mathbf{u}}\\,\\mathbf{y}",
      ],
      example: {
        problem: "Write $\\mathbf{y} = (7,6)$ as a vector in $\\operatorname{Span}\\{\\mathbf{u}\\}$, $\\mathbf{u} = (4,2)$, plus a vector orthogonal to $\\mathbf{u}$. Find the distance from $\\mathbf{y}$ to the line.",
        steps: [
          "$\\mathbf{y}\\cdot\\mathbf{u} = 28 + 12 = 40$ and $\\mathbf{u}\\cdot\\mathbf{u} = 16 + 4 = 20$.",
          "$\\hat{\\mathbf{y}} = (40/20)(4,2) = (8,4)$.",
          "$\\mathbf{z} = \\mathbf{y}-\\hat{\\mathbf{y}} = (-1, 2)$. Check: $(-1,2)\\cdot(4,2) = -4+4 = 0$ ✓.",
          "Distance $= \\|\\mathbf{z}\\| = \\sqrt{1+4} = \\sqrt5$.",
        ],
        answer: "$\\mathbf{y} = (8,4) + (-1,2)$; the distance is $\\sqrt5$.",
      },
      pitfalls: [
        "\"Every orthogonal set is independent\" is **false**, because the set may contain $\\mathbf{0}$.",
        "The denominator is $\\mathbf{u}\\cdot\\mathbf{u} = \\|\\mathbf{u}\\|^2$, not $\\|\\mathbf{u}\\|$.",
        "Check which of $\\hat{\\mathbf{y}}$ or $\\mathbf{z}$ the question asks for. MCQs list both.",
      ],
      recall: [
        { q: "Coefficient $c_j$ of $\\mathbf{y}$ along an orthogonal basis vector $\\mathbf{u}_j$?", a: "$c_j = (\\mathbf{y}\\cdot\\mathbf{u}_j)/(\\mathbf{u}_j\\cdot\\mathbf{u}_j)$." },
        { q: "Is an orthogonal set always linearly independent?", a: "Only if it contains no zero vector." },
      ],
    },
    {
      title: "Orthonormal sets, $U^TU = I$, and orthogonal matrices",
      intuition:
        "Normalise an orthogonal set and the denominators become 1. Packing the vectors into a matrix $U$, the whole \"dot every pair\" table is $U^TU = I$. Whether $UU^T$ is also $I$ depends on whether $U$ is square.",
      keyIdeas: [
        "Orthonormal set: orthogonal **and** every vector has length 1.",
        "$U$ ($m\\times n$) has orthonormal columns $\\iff U^TU = I_n$. Then $\\|U\\mathbf{x}\\| = \\|\\mathbf{x}\\|$ and $(U\\mathbf{x})\\cdot(U\\mathbf{y}) = \\mathbf{x}\\cdot\\mathbf{y}$, even when $U$ is tall.",
        "**Orthogonal matrix** = **square** matrix with orthonormal columns. Then $U^{-1} = U^T$, $UU^T = I$ too, the rows are orthonormal as well, and $\\det U = \\pm1$.",
        "**Tall** $U$ ($m > n$) with orthonormal columns: $UU^T$ is $m\\times m$ with rank $n$, **not** $I_m$. It is the projection matrix onto $\\operatorname{Col}U$.",
        "\"Orthogonal columns\" alone (not unit length) does **not** make an orthogonal matrix: $U^TU$ is only diagonal.",
      ],
      formulas: [
        "U^TU = I_n \\quad (\\text{orthonormal columns})",
        "UU^T = \\operatorname{Proj}_{\\operatorname{Col}U} \\quad (m > n), \\qquad UU^T = I \\quad (m = n)",
      ],
      example: {
        problem:
          "$U = \\begin{bmatrix}1/\\sqrt2 & 0\\\\ 1/\\sqrt2 & 0\\\\ 0 & 1\\end{bmatrix}$. Compute $U^TU$ and $UU^T$, then project $\\mathbf{y} = (2,0,5)$ onto $\\operatorname{Col}U$.",
        steps: [
          "Columns have length $\\sqrt{1/2+1/2} = 1$ and $1$, and their dot product is $0$, so $U^TU = I_2$.",
          "$UU^T = \\begin{bmatrix}1/2 & 1/2 & 0\\\\ 1/2 & 1/2 & 0\\\\ 0 & 0 & 1\\end{bmatrix} \\ne I_3$ (rank 2).",
          "$\\hat{\\mathbf{y}} = UU^T\\mathbf{y} = (1, 1, 5)$.",
          "Check: $\\mathbf{y}-\\hat{\\mathbf{y}} = (1,-1,0)$ is orthogonal to $(1,1,0)/\\sqrt2$ and to $(0,0,1)$ ✓.",
        ],
        answer: "$U^TU = I_2$, $UU^T$ is a rank-2 projection, and $\\operatorname{Proj}_{\\operatorname{Col}U}\\mathbf{y} = (1,1,5)$.",
      },
      pitfalls: [
        "\"Orthogonal matrix\" means orthonormal columns **and** square. Both conditions are traps.",
        "$U^TU = I$ for a tall $U$ does **not** imply $UU^T = I$.",
        "Length preservation $\\|U\\mathbf{x}\\| = \\|\\mathbf{x}\\|$ only needs $U^TU = I$; $U$ does not have to be square.",
      ],
      recall: [
        { q: "$U$ is $5\\times3$ with orthonormal columns. What are $U^TU$ and $UU^T$?", a: "$U^TU = I_3$; $UU^T$ is the $5\\times5$ rank-3 projection onto $\\operatorname{Col}U$." },
        { q: "Is $\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$ orthogonal?", a: "No: the columns are orthogonal but have length $\\sqrt2$ ($U^TU = 2I$)." },
        { q: "Inverse of an orthogonal matrix?", a: "Its transpose: $U^{-1} = U^T$." },
      ],
    },
    {
      title: "Orthogonal decomposition and best approximation",
      intuition:
        "Any vector splits uniquely into a part inside $W$ and a part perpendicular to $W$. The inside part is the closest point of $W$ to $\\mathbf{y}$, which is the whole idea behind least squares.",
      keyIdeas: [
        "**Orthogonal Decomposition Theorem**: every $\\mathbf{y}$ can be written **uniquely** as $\\mathbf{y} = \\hat{\\mathbf{y}} + \\mathbf{z}$ with $\\hat{\\mathbf{y}}\\in W$, $\\mathbf{z}\\in W^\\perp$.",
        "With an **orthogonal** basis $\\{\\mathbf{u}_1,\\dots,\\mathbf{u}_p\\}$ of $W$: $\\hat{\\mathbf{y}} = \\sum \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_j}{\\mathbf{u}_j\\cdot\\mathbf{u}_j}\\mathbf{u}_j$. With an **orthonormal** basis (columns of $U$): $\\hat{\\mathbf{y}} = UU^T\\mathbf{y}$.",
        "$\\hat{\\mathbf{y}}$ depends only on $W$, not on the basis chosen.",
        "If $\\mathbf{y}\\in W$ then $\\operatorname{Proj}_W\\mathbf{y} = \\mathbf{y}$; if $\\mathbf{y}\\in W^\\perp$ then $\\operatorname{Proj}_W\\mathbf{y} = \\mathbf{0}$.",
        "**Best Approximation**: $\\|\\mathbf{y}-\\hat{\\mathbf{y}}\\| < \\|\\mathbf{y}-\\mathbf{v}\\|$ for every $\\mathbf{v}\\in W$, $\\mathbf{v}\\ne\\hat{\\mathbf{y}}$. So $\\operatorname{dist}(\\mathbf{y},W) = \\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|$.",
      ],
      formulas: [
        "\\operatorname{Proj}_W\\mathbf{y} = \\frac{\\mathbf{y}\\cdot\\mathbf{u}_1}{\\mathbf{u}_1\\cdot\\mathbf{u}_1}\\mathbf{u}_1 + \\cdots + \\frac{\\mathbf{y}\\cdot\\mathbf{u}_p}{\\mathbf{u}_p\\cdot\\mathbf{u}_p}\\mathbf{u}_p",
        "\\|\\mathbf{y}\\|^2 = \\|\\hat{\\mathbf{y}}\\|^2 + \\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|^2",
      ],
      example: {
        problem:
          "$\\mathbf{u}_1 = (2,5,-1)$, $\\mathbf{u}_2 = (-2,1,1)$, $W = \\operatorname{Span}\\{\\mathbf{u}_1,\\mathbf{u}_2\\}$, $\\mathbf{y} = (1,2,3)$. Find $\\operatorname{Proj}_W\\mathbf{y}$ and $\\operatorname{dist}(\\mathbf{y}, W)$.",
        steps: [
          "Check orthogonality: $\\mathbf{u}_1\\cdot\\mathbf{u}_2 = -4+5-1 = 0$ ✓, so the formula may be used.",
          "$\\mathbf{y}\\cdot\\mathbf{u}_1 = 2+10-3 = 9$, $\\mathbf{u}_1\\cdot\\mathbf{u}_1 = 30$; $\\mathbf{y}\\cdot\\mathbf{u}_2 = -2+2+3 = 3$, $\\mathbf{u}_2\\cdot\\mathbf{u}_2 = 6$.",
          "$\\hat{\\mathbf{y}} = \\tfrac{9}{30}(2,5,-1) + \\tfrac36(-2,1,1) = (0.6,1.5,-0.3) + (-1,0.5,0.5) = (-0.4, 2, 0.2)$.",
          "$\\mathbf{z} = \\mathbf{y}-\\hat{\\mathbf{y}} = (1.4, 0, 2.8)$. Check: $\\mathbf{z}\\cdot\\mathbf{u}_1 = 2.8 - 2.8 = 0$ and $\\mathbf{z}\\cdot\\mathbf{u}_2 = -2.8+2.8 = 0$ ✓.",
          "$\\operatorname{dist} = \\|\\mathbf{z}\\| = \\sqrt{1.96 + 7.84} = \\sqrt{9.8} = 7/\\sqrt5 \\approx 3.13$.",
        ],
        answer: "$\\operatorname{Proj}_W\\mathbf{y} = (-2/5, 2, 1/5)$ and $\\operatorname{dist}(\\mathbf{y},W) = 7/\\sqrt5$.",
      },
      pitfalls: [
        "The sum formula needs an **orthogonal** basis. With a merely independent basis, run Gram–Schmidt first or use $A(A^TA)^{-1}A^T$. Unless orthogonality is stated, the answer may be \"not enough information\".",
        "$UU^T\\mathbf{y}$ needs **orthonormal** columns. With orthogonal-but-not-unit columns, use the fraction formula.",
        "\"$\\operatorname{Proj}_{\\operatorname{Col}A}\\mathbf{y} = \\operatorname{Proj}_{\\operatorname{Col}B}\\mathbf{y}$\" holds iff the column spaces are equal, not iff $A = B$.",
      ],
      recall: [
        { q: "Is $\\operatorname{Proj}_W\\mathbf{y}$ unique?", a: "Yes. The orthogonal decomposition is unique, so the projection does not depend on the basis." },
        { q: "What is the closest point in $W$ to $\\mathbf{y}$?", a: "$\\hat{\\mathbf{y}} = \\operatorname{Proj}_W\\mathbf{y}$, at distance $\\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|$." },
        { q: "What is $\\operatorname{Proj}_W\\mathbf{y}$ if $\\mathbf{y}\\in W$?", a: "$\\mathbf{y}$ itself." },
      ],
    },
    {
      title: "Gram–Schmidt and QR factorization",
      intuition:
        "Gram–Schmidt takes any basis and, one vector at a time, subtracts the projection onto what has already been built, leaving only the new perpendicular direction. Recording the coefficients you used gives $A = QR$.",
      keyIdeas: [
        "$\\mathbf{v}_1 = \\mathbf{x}_1$, $\\mathbf{v}_k = \\mathbf{x}_k - \\sum_{j<k}\\dfrac{\\mathbf{x}_k\\cdot\\mathbf{v}_j}{\\mathbf{v}_j\\cdot\\mathbf{v}_j}\\mathbf{v}_j$. Normalise at the end: $\\mathbf{q}_k = \\mathbf{v}_k/\\|\\mathbf{v}_k\\|$.",
        "$\\operatorname{Span}\\{\\mathbf{v}_1..\\mathbf{v}_k\\} = \\operatorname{Span}\\{\\mathbf{x}_1..\\mathbf{x}_k\\}$ for **every** $k$. This nesting is why $R$ is upper triangular.",
        "**Economy QR** of $A$ ($m\\times n$): $Q$ is $m\\times n$ with orthonormal columns, $\\operatorname{Col}Q = \\operatorname{Col}A$; $R = Q^TA$ is $n\\times n$ upper triangular. **Complete QR**: $Q$ is $m\\times m$ orthogonal and $R$ is $m\\times n$ (zero rows added).",
        "$R$ is invertible **iff** the columns of $A$ are linearly independent. A dependent column makes Gram–Schmidt produce $\\mathbf{0}$, giving a zero on the diagonal of $R$.",
        "$Q^TQ = I_n$ always. $QQ^T$ is the projection onto $\\operatorname{Col}A$, and equals $I$ only when $A$ is square.",
      ],
      formulas: [
        "A = QR, \\qquad R = Q^TA, \\qquad r_{ij} = \\mathbf{q}_i\\cdot\\mathbf{a}_j\\ (i\\le j)",
      ],
      example: {
        problem: "Find the QR factorization of $A = \\begin{bmatrix}3&1\\\\6&2\\\\0&2\\end{bmatrix}$.",
        steps: [
          "$\\mathbf{v}_1 = \\mathbf{x}_1 = (3,6,0)$, $\\mathbf{v}_1\\cdot\\mathbf{v}_1 = 45$.",
          "$\\mathbf{x}_2\\cdot\\mathbf{v}_1 = 3+12+0 = 15$, so $\\mathbf{v}_2 = (1,2,2) - \\tfrac{15}{45}(3,6,0) = (1,2,2)-(1,2,0) = (0,0,2)$.",
          "Normalise: $\\mathbf{q}_1 = (3,6,0)/\\sqrt{45} = (1,2,0)/\\sqrt5$ and $\\mathbf{q}_2 = (0,0,1)$.",
          "$R = Q^TA$: $r_{11} = \\mathbf{q}_1\\cdot\\mathbf{a}_1 = 15/\\sqrt5 = 3\\sqrt5$, $r_{12} = \\mathbf{q}_1\\cdot\\mathbf{a}_2 = 5/\\sqrt5 = \\sqrt5$, $r_{22} = \\mathbf{q}_2\\cdot\\mathbf{a}_2 = 2$.",
          "Check: $Q\\,R$ column 2 $= \\sqrt5\\,\\mathbf{q}_1 + 2\\mathbf{q}_2 = (1,2,0)+(0,0,2) = (1,2,2)$ ✓.",
        ],
        answer:
          "$Q = \\begin{bmatrix}1/\\sqrt5 & 0\\\\ 2/\\sqrt5 & 0\\\\ 0 & 1\\end{bmatrix}$, $R = \\begin{bmatrix}3\\sqrt5 & \\sqrt5\\\\ 0 & 2\\end{bmatrix}$.",
      },
      pitfalls: [
        "Subtract projections onto the **new** $\\mathbf{v}_j$'s, not onto the original $\\mathbf{x}_j$'s.",
        "Normalising during the process is fine. Just do not forget to normalise before forming $Q$; with unnormalised columns, $R \\ne Q^TA$.",
        "\"$R$ is invertible\" is not automatic. It requires independent columns of $A$; if that is not given, the answer is \"not enough information\".",
        "Economy $Q$ (tall) has $QQ^T \\ne I$.",
      ],
      recall: [
        { q: "How do you get $R$ once $Q$ is known?", a: "$R = Q^TA$ (because $Q^TQ = I$)." },
        { q: "When is $R$ invertible?", a: "Exactly when the columns of $A$ are linearly independent." },
        { q: "What does $QQ^T$ do for tall $A = QR$?", a: "It projects onto $\\operatorname{Col}A$ (it is not the identity)." },
      ],
    },
  ],
  playbook: [
    "If you see an angle or \"acute/obtuse\" → compute $\\cos\\theta = \\mathbf{u}\\cdot\\mathbf{v}/(\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|)$; the sign of the dot product decides acute or obtuse.",
    "If you see only lengths $\\|\\mathbf{u}\\|$, $\\|\\mathbf{v}\\|$ and a question about $\\|\\mathbf{u}+\\mathbf{v}\\|$ → no angle given, so answer \"not enough information\" (the triangle inequality only bounds it).",
    "If you see $(\\operatorname{Row}A)^\\perp$ or $(\\operatorname{Col}A)^\\perp$ → $\\operatorname{Nul}A$ (dimension $n-r$) or $\\operatorname{Nul}A^T$ (dimension $m-r$).",
    "If you see \"orthogonal set ⇒ independent\" → check for the zero vector; it is only true for nonzero vectors.",
    "If you see a projection formula as a sum of fractions → first check $\\mathbf{u}_i\\cdot\\mathbf{u}_j = 0$; if orthogonality is not given, think \"not enough information\" or use Gram–Schmidt.",
    "If you see \"orthogonal matrix\" → demand square **and** orthonormal columns; orthogonal-but-not-unit columns do not count.",
    "If you see a tall $U$ or $Q$ with orthonormal columns → $U^TU = I$, but $UU^T$ is a projection matrix (rank $n$), not $I$.",
    "If you see \"is $\\operatorname{Proj}_W\\mathbf{y}$ unique / basis-dependent?\" → unique, depends only on $W$.",
    "If you see distance from $\\mathbf{y}$ to $W$ → compute $\\|\\mathbf{y}-\\operatorname{Proj}_W\\mathbf{y}\\|$ (Best Approximation Theorem).",
    "If you see Gram–Schmidt → $\\mathbf{v}_k = \\mathbf{x}_k - \\sum (\\mathbf{x}_k\\cdot\\mathbf{v}_j/\\mathbf{v}_j\\cdot\\mathbf{v}_j)\\mathbf{v}_j$, then check that each new vector is orthogonal to the earlier ones.",
    "If you see QR → $Q$ = normalised Gram–Schmidt vectors, $R = Q^TA$ (upper triangular); $R$ is invertible iff $A$ has independent columns.",
    "If you see two matrices with \"the same projection\" → compare column spaces, not the matrices themselves.",
  ],
};
