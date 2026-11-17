import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const vectorsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt:
      "The arrows $\\overrightarrow{AB}$ and $\\overrightarrow{CD}$ have the same length and the same direction, but $A \\ne C$. Then $\\overrightarrow{AB} = \\overrightarrow{CD}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Equivalent (equal) vectors are defined as vectors with the same length and direction; translating a vector does not change it. So arrows with different initial points but the same length and direction are **equal**. **True**.",
    ref: "Slides 0A (vec p4, p9)",
  },
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt: "For all vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, $\\mathbf{u}-\\mathbf{v} = \\mathbf{v}-\\mathbf{u}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\mathbf{v}-\\mathbf{u} = -(\\mathbf{u}-\\mathbf{v})$: same length, opposite direction. They are equal only when $\\mathbf{u}-\\mathbf{v} = \\mathbf{0}$, i.e. $\\mathbf{u} = \\mathbf{v}$. Counterexample: $\\mathbf{u} = \\mathbf{i}$, $\\mathbf{v} = \\mathbf{0}$ gives $\\mathbf{i} \\ne -\\mathbf{i}$. **False**.",
    ref: "Slides 0A Vector subtraction (vec p7, p14)",
  },
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}\\ne\\mathbf{0}$. If $\\mathbf{v}$ is parallel (collinear) to $\\mathbf{u}$, then $\\mathbf{v} = k\\mathbf{u}$ for some scalar $k$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "In the slides, parallel and collinear vectors are exactly $\\mathbf{u}$ and $k\\mathbf{u}$: the scalar multiple $k\\mathbf{u}$ points the same way ($k>0$) or the opposite way ($k<0$), with length $|k|$ times that of $\\mathbf{u}$. **True**.",
    ref: "Slides 0A Scalar multiplication, Parallel and collinear vectors (vec p8–p9)",
  },
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt: "For the points $A(1,2,3)$, $B(2,4,7)$ and $C(4,8,15)$, the vectors $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are collinear.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\overrightarrow{AB} = B - A = (1,2,4)$ and $\\overrightarrow{AC} = C - A = (3,6,12) = 3\\overrightarrow{AB}$. One is a scalar multiple of the other, so they are collinear (parallel). **True**.",
    ref: "Slides 0A (vec p9, p12)",
  },
  {
    subtopic: "Linear combinations",
    kind: "tfn",
    prompt: "There exist scalars $a, b$ such that $a(1,0,1) + b(0,1,1) = (2,3,4)$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Components: $a = 2$, $b = 3$, and $a + b = 4$. The first two force $a = 2, b = 3$, but then $a+b = 5 \\ne 4$. The equations are inconsistent, so no such scalars exist. **False**. (Trap: stopping after the first two equations.)",
    ref: "Slides 0A Linear combination (vec p16); Tutorial 0A Q1",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "tfn",
    prompt: "If $\\|\\mathbf{u}\\| = \\|\\mathbf{v}\\|$, then $\\mathbf{u} = \\mathbf{v}$ or $\\mathbf{u} = -\\mathbf{v}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Equal length says nothing about direction. $\\mathbf{u} = (1,0)$ and $\\mathbf{v} = (0,1)$ both have norm 1, but neither $\\mathbf{u} = \\mathbf{v}$ nor $\\mathbf{u} = -\\mathbf{v}$. **False**.",
    ref: "Slides 0A Norm (vec p17)",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "tfn",
    prompt: "For every vector $\\mathbf{v}\\in\\mathbb{R}^n$ and every scalar $k$, $\\|k\\mathbf{v}\\| = k\\|\\mathbf{v}\\|$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The theorem on the slides is $\\|k\\mathbf{v}\\| = |k|\\,\\|\\mathbf{v}\\|$. With $k = -2$ and $\\mathbf{v} = (1,0)$: $\\|{-2}\\mathbf{v}\\| = 2$, but $k\\|\\mathbf{v}\\| = -2$. A norm is never negative. **False**.",
    ref: "Slides 0A Norm of a vector theorem (vec p18)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "tfn",
    prompt: "If $\\mathbf{u}\\cdot\\mathbf{v} = 0$, then $\\mathbf{u} = \\mathbf{0}$ or $\\mathbf{v} = \\mathbf{0}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A zero dot product of nonzero vectors means they are **orthogonal**, which happens for plenty of pairs, e.g. $(1,2)\\cdot(2,-1) = 2 - 2 = 0$. **False**.",
    ref: "Slides 0A Orthogonality (vec p26)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}\\ne\\mathbf{0}$. If $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}$, then $\\mathbf{v} = \\mathbf{w}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Counterexample: $\\mathbf{u} = \\mathbf{i}$, $\\mathbf{v} = \\mathbf{j}$, $\\mathbf{w} = \\mathbf{k}$ gives $\\mathbf{u}\\cdot\\mathbf{v} = 0 = \\mathbf{u}\\cdot\\mathbf{w}$, but $\\mathbf{j}\\ne\\mathbf{k}$. (By the property $\\mathbf{u}\\cdot(\\mathbf{v}-\\mathbf{w}) = \\mathbf{u}\\cdot\\mathbf{v}-\\mathbf{u}\\cdot\\mathbf{w}$, the equation only says $\\mathbf{u}\\cdot(\\mathbf{v}-\\mathbf{w}) = 0$.) **False**.",
    ref: "Slides 0A Algebraic properties of the dot product (vec p22–p23)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "tfn",
    prompt: "If $\\mathbf{u}, \\mathbf{v}$ are nonzero and $\\mathbf{u}\\cdot\\mathbf{v} > 0$, then the angle between $\\mathbf{u}$ and $\\mathbf{v}$ is acute.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\cos\\theta = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|} > 0$, so $\\theta$ is acute (slides: $\\theta$ is acute if $\\mathbf{u}\\cdot\\mathbf{v}>0$). **True**.",
    ref: "Slides 0A Dot product (vec p20)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "tfn",
    prompt: "The set $\\{(1,0,1),\\ (0,1,0),\\ (-1,0,1)\\}$ is an orthogonal set.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Check every pair of distinct vectors: $(1,0,1)\\cdot(0,1,0) = 0$, $(1,0,1)\\cdot(-1,0,1) = -1+0+1 = 0$, $(0,1,0)\\cdot(-1,0,1) = 0$. All pairs are orthogonal. **True**.",
    ref: "Slides 0A Orthogonality (vec p26)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt: "Vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$ satisfy $\\|\\mathbf{u}\\| = 3$ and $\\|\\mathbf{v}\\| = 4$. Then $\\|\\mathbf{u}+\\mathbf{v}\\| = 5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\|\\mathbf{u}+\\mathbf{v}\\|^2 = 9 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + 16$, which depends on $\\mathbf{u}\\cdot\\mathbf{v}$, i.e. on the angle. It equals 25 only if $\\mathbf{u}\\cdot\\mathbf{v} = 0$; the triangle inequality only gives $\\|\\mathbf{u}+\\mathbf{v}\\| \\le 7$. The angle is not given, so **Not enough information**.",
    ref: "Slides 0A (vec p22, p25)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}, \\mathbf{v}$ be nonzero. If $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}-\\mathbf{v}\\|$, then $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Square both sides and expand with the dot-product properties: $\\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 - 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$, so $4\\,\\mathbf{u}\\cdot\\mathbf{v} = 0$. Nonzero vectors with $\\mathbf{u}\\cdot\\mathbf{v} = 0$ are orthogonal. **True**.",
    ref: "Slides 0A (vec p22, p26); PYP AY23/24 S1 Q3(b)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt: "For all $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$, $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The slides give only the triangle inequality $\\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$. Counterexample: $\\mathbf{u} = \\mathbf{i}$, $\\mathbf{v} = \\mathbf{j}$ in $\\mathbb{R}^2$: $\\|\\mathbf{i}+\\mathbf{j}\\| = \\sqrt2$ but $\\|\\mathbf{i}\\|+\\|\\mathbf{j}\\| = 2$. **False**.",
    ref: "Slides 0A Geometry in R^n (vec p25)",
  },
  {
    subtopic: "Lines & planes",
    kind: "tfn",
    prompt: "The line $\\mathbf{x} = (2,-1,4) + t(-4,2,-8)$ passes through the origin.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Look for $t$ with $(2-4t,\\ -1+2t,\\ 4-8t) = (0,0,0)$: all three components give $t = \\tfrac12$. So the origin is on the line, even though $\\mathbf{x}_0 \\ne \\mathbf{0}$ in this description. **True**.",
    ref: "Slides 0A Vector equations of lines (vec p28)",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "tfn",
    prompt:
      "A line $\\mathbf{x} = \\mathbf{x}_0 + t\\mathbf{v}$ and a plane with normal vector $\\mathbf{n}$ satisfy $\\mathbf{n}\\cdot\\mathbf{v} = 0$. Then the line lies on the plane.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Substituting the line into the plane equation $\\mathbf{n}\\cdot\\mathbf{x} = d$ gives $\\mathbf{n}\\cdot\\mathbf{x}_0 + t\\,(\\mathbf{n}\\cdot\\mathbf{v}) = d$, i.e. $\\mathbf{n}\\cdot\\mathbf{x}_0 = d$. If $\\mathbf{x}_0$ satisfies the plane equation every $t$ works and the line lies on the plane; otherwise no $t$ works and the line never meets it. Neither $\\mathbf{x}_0$ nor $d$ is given, so **Not enough information**.",
    ref: "Slides 0A (vec p27–p28); PYP AY24/25 S2 Q11",
  },
  {
    subtopic: "Lines & planes",
    kind: "tfn",
    prompt:
      "The set $\\{(1,2,0) + s(1,-1,2) + t(-2,2,-4) : s, t\\in\\mathbb{R}\\}$ is a plane in $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(-2,2,-4) = -2(1,-1,2)$, so the two vectors are collinear. Then $s(1,-1,2) + t(-2,2,-4) = (s-2t)(1,-1,2)$, and the set is just the **line** $(1,2,0) + r(1,-1,2)$. The vector form of a plane needs two **noncollinear** vectors. **False**.",
    ref: "Slides 0A Vector equations of planes (vec p29)",
  },

  // ---------------------------------------------------------------- MCQ
  {
    subtopic: "Geometric vectors",
    kind: "mcq",
    prompt:
      "In triangle $ABC$, $M$ is the midpoint of $BC$. If $\\overrightarrow{AB} = \\mathbf{u}$ and $\\overrightarrow{AC} = \\mathbf{v}$, then $\\overrightarrow{AM} =$",
    options: ["$\\mathbf{u}+\\mathbf{v}$", "$\\tfrac12(\\mathbf{v}-\\mathbf{u})$", "$\\mathbf{u}+\\tfrac12\\mathbf{v}$", "$\\tfrac12(\\mathbf{u}+\\mathbf{v})$", NOTA],
    answer: 3,
    solution:
      "$\\overrightarrow{BC} = \\mathbf{v}-\\mathbf{u}$ (from the terminal point of $\\mathbf{u}$ to the terminal point of $\\mathbf{v}$), so $\\overrightarrow{BM} = \\tfrac12(\\mathbf{v}-\\mathbf{u})$.\nTriangle rule: $\\overrightarrow{AM} = \\overrightarrow{AB}+\\overrightarrow{BM} = \\mathbf{u} + \\tfrac12\\mathbf{v} - \\tfrac12\\mathbf{u} = \\tfrac12(\\mathbf{u}+\\mathbf{v})$.\n$\\tfrac12(\\mathbf{v}-\\mathbf{u})$ is $\\overrightarrow{BM}$, not $\\overrightarrow{AM}$.",
    ref: "Slides 0A Vector addition, subtraction, scalar multiplication (vec p5–p8)",
  },
  {
    subtopic: "Geometric vectors",
    kind: "mcq",
    prompt: "Which of the following vectors is parallel to $\\mathbf{v} = (2,-6,4)$?",
    options: ["$(1,3,2)$", "$(3,-9,4)$", "$(-1,3,-2)$", "$(2,6,-4)$", NOTA],
    answer: 2,
    solution:
      "Parallel means a scalar multiple: $(-1,3,-2) = -\\tfrac12(2,-6,4)$. A negative scalar is allowed: the opposite direction still counts as parallel.\n$(1,3,2)$ and $(2,6,-4)$ have the wrong sign pattern, and $(3,-9,4)$ has ratios $\\tfrac32, \\tfrac32, 1$, which are not all equal.",
    ref: "Slides 0A Parallel and collinear vectors (vec p8–p9)",
  },
  {
    subtopic: "Geometric vectors",
    kind: "mcq",
    prompt: "Let $A(1,-1,2)$, $B(3,0,5)$ and $C(7,2,k)$. For which value of $k$ are $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ collinear?",
    options: ["$k = 11$", "$k = 9$", "$k = 7$", "$k = 13$", NOTA],
    answer: 0,
    solution:
      "$\\overrightarrow{AB} = (2,1,3)$ and $\\overrightarrow{AC} = (6,3,k-2)$. The first two components give $\\overrightarrow{AC} = 3\\overrightarrow{AB}$, so $k - 2 = 9$ and $k = 11$.\nTrap: $k = 9$ forgets that $\\overrightarrow{AC}$ is $C - A$ (it sets the third coordinate of $C$ itself to 9).",
    ref: "Slides 0A (vec p9, p12)",
  },
  {
    subtopic: "Components",
    kind: "mcq",
    prompt: "The vector $\\mathbf{u} = (4,-2,1)$ has terminal point $Q(1,3,-2)$. Its initial point is",
    options: ["$(5,1,-1)$", "$(-3,5,-3)$", "$(3,-5,3)$", "$(-3,5,3)$", NOTA],
    answer: 1,
    solution:
      "$\\mathbf{u} = \\overrightarrow{PQ} = Q - P$, so $P = Q - \\mathbf{u} = (1-4,\\ 3+2,\\ -2-1) = (-3, 5, -3)$.\n$(5,1,-1) = Q + \\mathbf{u}$ is the terminal point of $\\mathbf{u}$ drawn **from** $Q$; $(3,-5,3) = \\mathbf{u} - Q$ has the sign flipped.",
    ref: "Slides 0A Vectors with initial point not at origin (vec p12); Tutorial 0A Q2",
  },
  {
    subtopic: "Components",
    kind: "mcq",
    prompt:
      "A vector $\\mathbf{u}$ with $\\|\\mathbf{u}\\| = 9$ is oppositely directed to $\\mathbf{v} = (2,1,-2)$ and has terminal point $Q(1,0,2)$. The initial point of $\\mathbf{u}$ is",
    options: ["$(-5,-3,8)$", "$(7,3,-4)$", "$(-7,-3,4)$", "$(3,1,0)$", NOTA],
    answer: 1,
    solution:
      "$\\|\\mathbf{v}\\| = \\sqrt{4+1+4} = 3$, so $\\mathbf{u} = -\\tfrac{9}{3}\\mathbf{v} = (-6,-3,6)$.\n$P = Q - \\mathbf{u} = (1+6,\\ 0+3,\\ 2-6) = (7,3,-4)$.\nCheck: $Q - P = (-6,-3,6)$ ✓. $(-5,-3,8) = Q + \\mathbf{u}$ is the usual sign slip, $(-7,-3,4) = \\mathbf{u} - Q$, and $(3,1,0) = Q + \\mathbf{v}$ ignores the length.",
    ref: "Slides 0A (vec p8, p12, p18); Tutorial 0A Q2",
  },
  {
    subtopic: "Linear combinations",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u} = (2,-1,3)$, $\\mathbf{v} = (1,1,-2)$ and $\\mathbf{w} = (1,-5,12)$. Find scalars $a, b$ with $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$.",
    options: ["$a = -3,\\ b = 2$", "$a = 2,\\ b = 3$", "$a = -2,\\ b = 3$", "$a = 2,\\ b = -3$", NOTA],
    answer: 3,
    solution:
      "Components: $2a + b = 1$, $-a + b = -5$, $3a - 2b = 12$.\nSubtract the second from the first: $3a = 6$, so $a = 2$ and $b = -3$.\nCheck the third: $3(2) - 2(-3) = 12$ ✓.",
    ref: "Slides 0A Linear combination (vec p16); Tutorial 0A Q1",
  },
  {
    subtopic: "Linear combinations",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u} = (1,2,0)$, $\\mathbf{v} = (0,1,1)$ and $\\mathbf{w} = (2,3,1)$. Which statement about the equation $a\\mathbf{u}+b\\mathbf{v} = \\mathbf{w}$ is correct?",
    options: [
      "It has the unique solution $a = 2,\\ b = -1$",
      "It has the unique solution $a = 2,\\ b = 1$",
      "It has the unique solution $a = -1,\\ b = 2$",
      "It has infinitely many solutions",
      "It has no solution",
    ],
    answer: 4,
    solution:
      "Components: $a = 2$, $2a + b = 3$, $b = 1$.\nThe first two give $a = 2$, $b = -1$, but the third demands $b = 1$. Contradiction, so there is **no solution**: $\\mathbf{w}$ is not a linear combination of $\\mathbf{u}$ and $\\mathbf{v}$.\nOption (a) is what you get if you skip the third equation; (b) is what you get from the first and third.",
    ref: "Slides 0A Linear combination (vec p16); Tutorial 0A Q1",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "mcq",
    prompt: "The norm of $\\mathbf{v} = (1,-2,3,-1,1)\\in\\mathbb{R}^5$ is",
    options: ["$2$", "$4$", "$8$", "$16$", NOTA],
    answer: 1,
    solution:
      "$\\|\\mathbf{v}\\| = \\sqrt{1+4+9+1+1} = \\sqrt{16} = 4$.\n$2$ is the plain sum of the components, $8$ the sum of their absolute values, and $16 = \\|\\mathbf{v}\\|^2$ (forgot the square root).",
    ref: "Slides 0A Norm (vec p17); Tutorial 0A Q3",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "mcq",
    prompt: "The unit vector oppositely directed to $\\mathbf{v} = (2,-1,-2)$ is",
    options: [
      "$\\left(\\tfrac23, -\\tfrac13, -\\tfrac23\\right)$",
      "$\\left(-\\tfrac29, \\tfrac19, \\tfrac29\\right)$",
      "$(-2, 1, 2)$",
      "$\\left(-\\tfrac23, \\tfrac13, \\tfrac23\\right)$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$\\|\\mathbf{v}\\| = \\sqrt{4+1+4} = 3$. Normalizing and flipping the direction: $-\\frac{1}{\\|\\mathbf{v}\\|}\\mathbf{v} = \\left(-\\tfrac23, \\tfrac13, \\tfrac23\\right)$.\n(a) has the same direction as $\\mathbf{v}$; (b) divides by $\\|\\mathbf{v}\\|^2 = 9$; (c) has length 3.",
    ref: "Slides 0A Unit vector (vec p18); Tutorial 0A Q5",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "mcq",
    prompt: "The distance between $\\mathbf{u} = (1,-2,4)$ and $\\mathbf{v} = (3,1,-2)$ is",
    options: ["$11$", "$49$", "$7$", "$\\sqrt{11}$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{u}-\\mathbf{v} = (-2, -3, 6)$ and $d(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u}-\\mathbf{v}\\| = \\sqrt{4+9+36} = \\sqrt{49} = 7$.\n$11$ adds the absolute differences, $49$ forgets the square root.",
    ref: "Slides 0A Distance in R^n (vec p19); Tutorial 0A Q4",
  },
  {
    subtopic: "Unit vectors & angles",
    kind: "mcq",
    prompt:
      "A unit vector $\\mathbf{x}\\in\\mathbb{R}^3$ makes an angle of $\\tfrac{3\\pi}{4}$ with the $y$-axis, and $\\mathbf{x}-\\mathbf{i}$ is also a unit vector. Which of the following could be $\\mathbf{x}$?",
    options: [
      "$\\left(\\tfrac12, -\\tfrac{1}{\\sqrt2}, \\tfrac12\\right)$",
      "$\\left(-\\tfrac12, -\\tfrac{1}{\\sqrt2}, \\tfrac12\\right)$",
      "$\\left(\\tfrac12, \\tfrac{1}{\\sqrt2}, -\\tfrac12\\right)$",
      "$\\left(\\tfrac{1}{\\sqrt2}, -\\tfrac12, \\tfrac12\\right)$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Let $\\mathbf{x} = (a,b,c)$, $\\|\\mathbf{x}\\| = 1$. Angle with the $y$-axis: $\\mathbf{x}\\cdot\\mathbf{j} = \\|\\mathbf{x}\\|\\|\\mathbf{j}\\|\\cos\\tfrac{3\\pi}{4}$, so $b = -\\tfrac{1}{\\sqrt2}$.\n$\\|\\mathbf{x}-\\mathbf{i}\\|^2 = \\mathbf{x}\\cdot\\mathbf{x} - 2\\,\\mathbf{x}\\cdot\\mathbf{i} + \\mathbf{i}\\cdot\\mathbf{i} = 2 - 2a = 1$, so $a = \\tfrac12$.\nThen $c^2 = 1 - \\tfrac14 - \\tfrac12 = \\tfrac14$, so $c = \\pm\\tfrac12$. Option (a) matches. (b) has $a = -\\tfrac12$; (c) has $b = +\\tfrac{1}{\\sqrt2}$ (angle $\\tfrac{\\pi}{4}$); (d) has $b = -\\tfrac12$.",
    ref: "PYP AY25/26 S1 Q1; Slides 0A (vec p19–p22)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "Find $k$ such that $\\mathbf{u} = (k, 2, -1)$ and $\\mathbf{v} = (3, k, 4)$ are orthogonal.",
    options: ["$k = -\\tfrac45$", "$k = 4$", "$k = \\tfrac54$", "$k = -4$", NOTA],
    answer: 4,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v} = 3k + 2k - 4 = 5k - 4 = 0$, so $k = \\tfrac45$.\nThat value is not listed, so **None of the above**. ($-\\tfrac45$ is a sign slip, $\\tfrac54$ inverts the fraction, and $4$ drops the $2k$ term.)",
    ref: "Slides 0A Component form of dot product, Orthogonality (vec p21, p26)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "For which values of $k$ is the angle between $\\mathbf{u} = (k, 1, 2)$ and $\\mathbf{v} = (k, -3, 1)$ obtuse?",
    options: ["$-1 < k < 1$", "$k < -1$ or $k > 1$", "$k < 1$", "$k = \\pm1$", NOTA],
    answer: 0,
    solution:
      "$\\theta$ is obtuse if $\\mathbf{u}\\cdot\\mathbf{v} < 0$.\n$\\mathbf{u}\\cdot\\mathbf{v} = k^2 - 3 + 2 = k^2 - 1 < 0 \\iff -1 < k < 1$.\nAt $k = \\pm1$ the dot product is 0 and $\\theta = \\pi/2$; for $|k|>1$ the angle is acute.",
    ref: "Slides 0A Dot product (vec p20–p21)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "Let $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\in\\mathbb{R}^3$ and let $k$ be a scalar. Which expression is **not** defined?",
    options: [
      "$(\\mathbf{u}\\cdot\\mathbf{v})\\,\\mathbf{w}$",
      "$\\mathbf{u}\\cdot(\\mathbf{v}+k\\mathbf{w})$",
      "$\\|\\mathbf{u}\\|\\,(\\mathbf{v}\\cdot\\mathbf{w})$",
      "$\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{w}\\|$",
      "$(\\mathbf{u}\\cdot\\mathbf{v})\\cdot\\mathbf{w}$",
    ],
    answer: 4,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v}$ is a **scalar**, and the dot product is defined between two vectors, so $(\\mathbf{u}\\cdot\\mathbf{v})\\cdot\\mathbf{w}$ is meaningless.\n(a) scalar times vector ✓; (b) vector dot vector ✓; (c) scalar times scalar ✓; (d) scalar plus scalar ✓.",
    ref: "Slides 0A Dot product (vec p20–p22)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Suppose $\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 3$ and $\\mathbf{u}\\cdot\\mathbf{v} = -1$. Then $(2\\mathbf{u}+\\mathbf{v})\\cdot(\\mathbf{u}-3\\mathbf{v}) =$",
    options: ["$-19$", "$-24$", "$-14$", "$-26$", NOTA],
    answer: 2,
    solution:
      "Expand with the distributive and homogeneity properties and $\\mathbf{v}\\cdot\\mathbf{v} = \\|\\mathbf{v}\\|^2$:\n$(2\\mathbf{u}+\\mathbf{v})\\cdot(\\mathbf{u}-3\\mathbf{v}) = 2\\|\\mathbf{u}\\|^2 - 6\\,\\mathbf{u}\\cdot\\mathbf{v} + \\mathbf{v}\\cdot\\mathbf{u} - 3\\|\\mathbf{v}\\|^2 = 8 + 6 - 1 - 27 = -14$.\n$-19$ drops the cross terms; $-24$ comes from a sign slip on $-6\\,\\mathbf{u}\\cdot\\mathbf{v}$.",
    ref: "Slides 0A Algebraic properties of the dot product (vec p22–p23)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{v}\\| = 5$ and the angle between them is $\\tfrac{2\\pi}{3}$. Then $\\|\\mathbf{u}+\\mathbf{v}\\| =$",
    options: ["$7$", "$\\sqrt{34}$", "$\\sqrt{19}$", "$8$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta = 3\\cdot5\\cos\\tfrac{2\\pi}{3} = -\\tfrac{15}{2}$.\n$\\|\\mathbf{u}+\\mathbf{v}\\|^2 = (\\mathbf{u}+\\mathbf{v})\\cdot(\\mathbf{u}+\\mathbf{v}) = 9 + 2(-\\tfrac{15}{2}) + 25 = 19$, so $\\|\\mathbf{u}+\\mathbf{v}\\| = \\sqrt{19}$.\n$7$ uses $\\cos = +\\tfrac12$, $\\sqrt{34}$ forgets the cross term, and $8$ simply adds the lengths.",
    ref: "Slides 0A (vec p20, p22)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "Consider the triangle with vertices $P(2,0,1)$, $Q(3,2,-1)$ and $R(5,2,0)$. Which statement is correct?",
    options: [
      "It has a right angle at $P$",
      "It has a right angle at $Q$",
      "It has a right angle at $R$",
      "It is not a right-angled triangle",
      "Cannot be determined",
    ],
    answer: 1,
    solution:
      "Test the two edge vectors leaving each vertex.\nAt $P$: $\\overrightarrow{PQ} = (1,2,-2)$, $\\overrightarrow{PR} = (3,2,-1)$, dot $= 3+4+2 = 9$.\nAt $Q$: $\\overrightarrow{QP} = (-1,-2,2)$, $\\overrightarrow{QR} = (2,0,1)$, dot $= -2+0+2 = 0$ ✓.\nAt $R$: $\\overrightarrow{RP} = (-3,-2,1)$, $\\overrightarrow{RQ} = (-2,0,-1)$, dot $= 6-1 = 5$.\nRight angle at $Q$.",
    ref: "Tutorial 0A Q6; Slides 0A Orthogonality (vec p26)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "A constant force $\\mathbf{F} = (4,-1,2)$ moves a particle from $P(2,0,-3)$ to $Q(5,-2,1)$. The work done, Work $= \\mathbf{F}\\cdot\\mathbf{r}$ where $\\mathbf{r}$ is the displacement, is",
    options: ["$-22$", "$24$", "$2$", "$22$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{r} = \\overrightarrow{PQ} = (3,-2,4)$, so Work $= 12 + 2 + 8 = 22$.\n$-22$ uses $P - Q$; $24 = \\mathbf{F}\\cdot Q$ and $2 = \\mathbf{F}\\cdot P$ use position vectors instead of the displacement.",
    ref: "Tutorial 0A Q7",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 5$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 8$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 6$. Then $\\|\\mathbf{v}\\| =$",
    options: ["$\\sqrt{50}$", "$5$", "$\\sqrt{14}$", "$10$", NOTA],
    answer: 1,
    solution:
      "Parallelogram law: $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$ (add the expansions $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2\\pm2\\,\\mathbf{u}\\cdot\\mathbf{v}+\\|\\mathbf{v}\\|^2$).\n$64 + 36 = 50 + 2\\|\\mathbf{v}\\|^2 \\Rightarrow \\|\\mathbf{v}\\|^2 = 25$, so $\\|\\mathbf{v}\\| = 5$.\n$\\sqrt{50}$ forgets the factor 2 on $\\|\\mathbf{v}\\|^2$.",
    ref: "PYP AY24/25 S2 Q13; Slides 0A (vec p22)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "Vectors $\\mathbf{u}, \\mathbf{v}$ satisfy $\\|\\mathbf{u}+\\mathbf{v}\\| = 2\\sqrt5$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 4$. Then $\\mathbf{u}\\cdot\\mathbf{v} =$",
    options: ["$4$", "$\\tfrac12$", "$-1$", "$2\\sqrt5 - 4$", NOTA],
    answer: 4,
    solution:
      "Expand both: $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2 = 20$ and $\\|\\mathbf{u}-\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 - 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2 = 16$.\nSubtract: $4\\,\\mathbf{u}\\cdot\\mathbf{v} = 4$, so $\\mathbf{u}\\cdot\\mathbf{v} = 1$.\n$1$ is not listed, so **None of the above**. ($4$ forgets to divide by 4, $\\tfrac12$ divides by 8, $-1$ subtracts the wrong way round.)",
    ref: "Slides 0A Algebraic properties of the dot product (vec p22); PYP AY23/24 S1 Q3(b)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "Let $\\mathbf{w} = (2,-1,2)$. The maximum value of $\\mathbf{x}\\cdot\\mathbf{w}$ over all $\\mathbf{x}\\in\\mathbb{R}^3$ with $\\|\\mathbf{x}\\| \\le 2$ is",
    options: ["$3$", "$6$", "$18$", "$9$", NOTA],
    answer: 1,
    solution:
      "Cauchy–Schwarz: $\\mathbf{x}\\cdot\\mathbf{w} \\le \\|\\mathbf{x}\\|\\|\\mathbf{w}\\| \\le 2\\cdot3 = 6$.\nThe bound is reached: $\\mathbf{x} = \\tfrac23(2,-1,2)$ has $\\|\\mathbf{x}\\| = 2$ and $\\mathbf{x}\\cdot\\mathbf{w} = \\tfrac23\\cdot9 = 6$.\n$18 = 2\\|\\mathbf{w}\\|^2$ is the common slip of using $\\|\\mathbf{w}\\|^2$.",
    ref: "Slides 0A Cauchy–Schwarz inequality (vec p24); PYP AY25/26 S2 Q13",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 4$ and $\\|\\mathbf{v}\\| = 7$. Which value is **impossible** for $\\|\\mathbf{u}+\\mathbf{v}\\|$?",
    options: ["$3$", "$11$", "$2$", "$7$", "All of these values are possible"],
    answer: 2,
    solution:
      "$\\|\\mathbf{u}+\\mathbf{v}\\|^2 = 16 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + 49$, and Cauchy–Schwarz gives $-28 \\le \\mathbf{u}\\cdot\\mathbf{v} \\le 28$. So $9 \\le \\|\\mathbf{u}+\\mathbf{v}\\|^2 \\le 121$, i.e. $3 \\le \\|\\mathbf{u}+\\mathbf{v}\\| \\le 11$.\n$3$ ($\\mathbf{v} = -\\tfrac74\\mathbf{u}$), $11$ ($\\mathbf{v} = \\tfrac74\\mathbf{u}$) and $7$ ($\\mathbf{u}\\cdot\\mathbf{v} = -8$) are attainable; $2$ is not.",
    ref: "Slides 0A (vec p22, p24–p25)",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "Which point lies on the line through $A(1,-2,3)$ and $B(4,0,1)$?",
    options: ["$(4,2,1)$", "$(-2,-4,1)$", "$(5,0,1)$", "$(7,2,-1)$", NOTA],
    answer: 3,
    solution:
      "Direction $\\overrightarrow{AB} = (3,2,-2)$, so the line is $\\mathbf{x} = (1,-2,3) + t(3,2,-2)$, i.e. $(1+3t,\\ -2+2t,\\ 3-2t)$.\n$(7,2,-1)$: $t = 2$ from the $x$-coordinate gives $y = 2$ and $z = -1$ ✓.\n$(-2,-4,1)$: $t = -1$ gives $z = 5 \\ne 1$. $(4,2,1)$: $t = 1$ gives $y = 0$. $(5,0,1)$: $t = \\tfrac43$ gives $y = \\tfrac23$.",
    ref: "Slides 0A Vector equations of lines (vec p28); Tutorial 0A Q10",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "In $\\mathbb{R}^2$, the line through $(1,2)$ with normal vector $\\mathbf{n} = (3,-1)$ has equation",
    options: ["$x + 3y = 7$", "$3x - y = -1$", "$3x - y = 1$", "$3x - y = 5$", NOTA],
    answer: 2,
    solution:
      "Point-normal equation of a line: $3(x-1) - (y-2) = 0$, i.e. $3x - y = 3 - 2 = 1$.\n$x + 3y = 7$ treats $(3,-1)$ as a **direction** vector instead of a normal.",
    ref: "Slides 0A Point-normal equation of line (vec p27)",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "The plane through $(2,-1,3)$ with normal vector $(1,4,-2)$ is",
    options: ["$x+4y-2z = 8$", "$x+4y-2z = -8$", "$2x - y + 3z = -8$", "$x+4y-2z = -4$", NOTA],
    answer: 1,
    solution:
      "Point-normal: $(x-2) + 4(y+1) - 2(z-3) = 0$, so $x + 4y - 2z = 2 - 4 - 6 = -8$.\nOption (c) swaps the roles of the point and the normal.",
    ref: "Slides 0A (vec p27); Tutorial 0A Q8; PYP AY25/26 S2 Q1",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt:
      "The plane through $(1,-2,0)$ parallel to $\\mathbf{v}_1 = (2,0,1)$ and $\\mathbf{v}_2 = (-1,3,0)$ has parametric equations",
    options: [
      "$x = 1+2t_1-t_2,\\ y = -2+3t_2,\\ z = t_1$",
      "$x = 2+t_1-t_2,\\ y = -2t_1+3t_2,\\ z = 1$",
      "$x = 1+2t_1-t_2,\\ y = -2+3t_1,\\ z = t_2$",
      "$x = 2t_1-t_2,\\ y = 3t_2,\\ z = t_1$",
      NOTA,
    ],
    answer: 0,
    solution:
      "Vector form: $(x,y,z) = (1,-2,0) + t_1(2,0,1) + t_2(-1,3,0)$. Reading off components:\n$x = 1+2t_1-t_2$, $y = -2+0t_1+3t_2$, $z = 0+t_1+0t_2$.\n(b) swaps the roles of the point and $\\mathbf{v}_1$; (c) mixes up which parameter multiplies which component; (d) forgets the point, giving a plane through the origin.",
    ref: "Slides 0A Vector and parametric equations of planes (vec p29); Tutorial 0A Q9",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "Which of the following is a vector equation of the plane through $A(1,0,2)$, $B(2,1,0)$ and $C(0,3,1)$?",
    options: [
      "$\\mathbf{x} = (1,0,2) + t_1(2,1,0) + t_2(0,3,1)$",
      "$\\mathbf{x} = t_1(1,1,-2) + t_2(-1,3,-1)$",
      "$\\mathbf{x} = (1,0,2) + t_1(1,1,-2) + t_2(-1,3,-1)$",
      "$\\mathbf{x} = (1,0,2) + t_1(1,1,-2) + t_2(-2,-2,4)$",
      NOTA,
    ],
    answer: 2,
    solution:
      "Use the point $A$ and two vectors in the plane: $\\overrightarrow{AB} = (1,1,-2)$ and $\\overrightarrow{AC} = (-1,3,-1)$. They are not scalar multiples of each other, so they are noncollinear, and $\\mathbf{x} = (1,0,2) + t_1(1,1,-2) + t_2(-1,3,-1)$.\nCheck: $t_1 = 1, t_2 = 0$ gives $B$; $t_1 = 0, t_2 = 1$ gives $C$ ✓.\n(a) uses the position vectors of $B, C$ instead of $\\overrightarrow{AB}, \\overrightarrow{AC}$; (b) drops the point, so it passes through the origin (which is not on this plane); (d) uses two collinear vectors, so it is only a line.",
    ref: "Slides 0A Vector equations of planes (vec p29); Tutorial 0A Q9",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line $x = 3+t,\\ y = -2+2t,\\ z = 5-t$ meets the $y$–$z$ plane at",
    options: ["$(0,-8,8)$", "$(0,-2,5)$", "$(0,-8,2)$", "$(0,4,2)$", NOTA],
    answer: 0,
    solution:
      "The $y$–$z$ plane is $x = 0$: $3 + t = 0$ gives $t = -3$, so $y = -2-6 = -8$ and $z = 5+3 = 8$.\n$(0,4,2)$ uses $t = +3$; $(0,-2,5)$ just deletes the $x$-coordinate of the base point.",
    ref: "Tutorial 0A Q10",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line $x = 1+2t,\\ y = -1+t,\\ z = 2-t$ meets the plane $x + 2y + 3z = 13$ at",
    options: ["$(9,3,-2)$", "$(17,7,-6)$", "$(-15,-9,10)$", "$(3,0,1)$", NOTA],
    answer: 1,
    solution:
      "Substitute the parametric equations into the plane: $(1+2t) + 2(-1+t) + 3(2-t) = 5 + t = 13$, so $t = 8$ and the point is $(17, 7, -6)$.\nCheck: $17 + 14 - 18 = 13$ ✓.",
    ref: "Slides 0A Parametric equations (vec p28); Tutorial 0A Q10",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line $\\mathbf{x} = (1,0,2) + t(2,-1,1)$ and the plane $x + 3y + z = 5$:",
    options: [
      "meet in exactly one point",
      "the line lies on the plane",
      "do not meet",
      "meet in exactly two points",
      "Cannot be determined",
    ],
    answer: 2,
    solution:
      "Substitute $x = 1+2t$, $y = -t$, $z = 2+t$: $(1+2t) + 3(-t) + (2+t) = 3$ for every $t$.\nThe equation becomes $3 = 5$, which no $t$ satisfies, so the line never meets the plane. (Had the constant matched, every $t$ would work and the line would lie on the plane.)",
    ref: "Slides 0A (vec p28); PYP AY24/25 S2 Q11",
  },
];
