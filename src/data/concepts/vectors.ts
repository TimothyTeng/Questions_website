import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

export const vectorsConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- TFN (16)
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt:
      "The arrows $\\overrightarrow{AB}$ and $\\overrightarrow{CD}$ have the same length and the same direction, but $A \\ne C$. Then $\\overrightarrow{AB} = \\overrightarrow{CD}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "A vector is determined by its length and direction only. Translating an arrow does not change it, so arrows with different initial points but the same length and direction are **equivalent (equal)** vectors. **True**.",
  },
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt: "For all vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, $\\mathbf{u}-\\mathbf{v} = \\mathbf{v}-\\mathbf{u}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\mathbf{v}-\\mathbf{u} = -(\\mathbf{u}-\\mathbf{v})$: same length, opposite direction. They are equal only when $\\mathbf{u}-\\mathbf{v} = \\mathbf{0}$, i.e. $\\mathbf{u} = \\mathbf{v}$. Counterexample: $\\mathbf{u} = \\mathbf{i}$, $\\mathbf{v} = \\mathbf{0}$ gives $\\mathbf{i} \\ne -\\mathbf{i}$. **False**.",
  },
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}\\ne\\mathbf{0}$. If $\\mathbf{v}$ is parallel to $\\mathbf{u}$, then $\\mathbf{v} = k\\mathbf{u}$ for some scalar $k$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Parallel means the arrows lie along the same or opposite directions (or $\\mathbf{v} = \\mathbf{0}$). With $\\mathbf{u}\\ne\\mathbf{0}$, take $k = \\pm\\|\\mathbf{v}\\|/\\|\\mathbf{u}\\|$ (sign by direction), or $k = 0$ if $\\mathbf{v} = \\mathbf{0}$. **True**. (The hypothesis $\\mathbf{u}\\ne\\mathbf{0}$ matters: $\\mathbf{0}$ is parallel to everything, but a nonzero $\\mathbf{v}$ is never $k\\mathbf{0}$.)",
  },
  {
    subtopic: "Geometric vectors",
    kind: "tfn",
    prompt: "The points $A(1,2,3)$, $B(2,4,7)$ and $C(4,8,15)$ are collinear.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\overrightarrow{AB} = (1,2,4)$ and $\\overrightarrow{AC} = (3,6,12) = 3\\overrightarrow{AB}$. The two vectors from $A$ are parallel and share the point $A$, so $A, B, C$ lie on one line. **True**.",
  },
  {
    subtopic: "Linear combinations",
    kind: "tfn",
    prompt: "There exist scalars $a, b$ such that $a(1,0,1) + b(0,1,1) = (2,3,4)$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Components: $a = 2$, $b = 3$, and $a + b = 4$. The first two force $a = 2, b = 3$, but then $a+b = 5 \\ne 4$. The system is inconsistent, so no such scalars exist. **False**. (Trap: stopping after the first two equations.)",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "tfn",
    prompt: "If $\\|\\mathbf{u}\\| = \\|\\mathbf{v}\\|$, then $\\mathbf{u} = \\mathbf{v}$ or $\\mathbf{u} = -\\mathbf{v}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Equal length says nothing about direction. $\\mathbf{u} = (1,0)$ and $\\mathbf{v} = (0,1)$ both have norm 1, but neither $\\mathbf{u} = \\mathbf{v}$ nor $\\mathbf{u} = -\\mathbf{v}$. **False**. (The statement does hold in $\\mathbb{R}^1$, which is why it feels plausible.)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "tfn",
    prompt: "If $\\mathbf{u}\\cdot\\mathbf{v} = 0$, then $\\mathbf{u} = \\mathbf{0}$ or $\\mathbf{v} = \\mathbf{0}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A zero dot product means the vectors are **orthogonal**, which happens for plenty of nonzero pairs, e.g. $(1,2)\\cdot(2,-1) = 0$. **False**.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "tfn",
    prompt: "Let $\\mathbf{u}\\ne\\mathbf{0}$. If $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}$, then $\\mathbf{v} = \\mathbf{w}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "There is no cancellation law for the dot product. The equation says $\\mathbf{u}\\cdot(\\mathbf{v}-\\mathbf{w}) = 0$, i.e. $\\mathbf{v}-\\mathbf{w}$ is orthogonal to $\\mathbf{u}$, not that it is zero. Example: $\\mathbf{u} = \\mathbf{i}$, $\\mathbf{v} = \\mathbf{j}$, $\\mathbf{w} = \\mathbf{k}$ gives $0 = 0$ but $\\mathbf{j}\\ne\\mathbf{k}$. **False**.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt: "Vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$ satisfy $\\|\\mathbf{u}\\| = 3$ and $\\|\\mathbf{v}\\| = 4$. Then $\\|\\mathbf{u}+\\mathbf{v}\\| = 5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\|\\mathbf{u}+\\mathbf{v}\\|^2 = 9 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + 16$, which depends on the angle. It equals 25 only if $\\mathbf{u}\\perp\\mathbf{v}$; in general the triangle inequality only gives $1 \\le \\|\\mathbf{u}+\\mathbf{v}\\| \\le 7$. The angle is not given, so **Not enough information**.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt: "If $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}-\\mathbf{v}\\|$, then $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Square both sides: $\\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 - 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$, so $4\\,\\mathbf{u}\\cdot\\mathbf{v} = 0$. (By polarization, $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14(\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\|\\mathbf{u}-\\mathbf{v}\\|^2) = 0$.) Geometrically: a parallelogram with equal diagonals is a rectangle. **True**.",
  },
  {
    subtopic: "Cross product",
    kind: "tfn",
    prompt: "For all $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$, $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{v}\\times\\mathbf{u}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The cross product is **anti-commutative**: $\\mathbf{v}\\times\\mathbf{u} = -(\\mathbf{u}\\times\\mathbf{v})$. E.g. $\\mathbf{i}\\times\\mathbf{j} = \\mathbf{k}$ but $\\mathbf{j}\\times\\mathbf{i} = -\\mathbf{k}$. They agree only when $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{0}$ (parallel vectors). **False**.",
  },
  {
    subtopic: "Cross product",
    kind: "tfn",
    prompt: "Vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$ satisfy $\\|\\mathbf{u}\\| = 3$ and $\\|\\mathbf{v}\\| = 4$. Then $\\|\\mathbf{u}\\times\\mathbf{v}\\| = 12$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\|\\mathbf{u}\\times\\mathbf{v}\\| = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\sin\\theta = 12\\sin\\theta$, which is 12 only when $\\mathbf{u}\\perp\\mathbf{v}$ and 0 when they are parallel. The angle is not given, so **Not enough information**.",
  },
  {
    subtopic: "Cross product",
    kind: "tfn",
    prompt: "If $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$ satisfy both $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{0}$ and $\\mathbf{u}\\cdot\\mathbf{v} = 0$, then $\\mathbf{u} = \\mathbf{0}$ or $\\mathbf{v} = \\mathbf{0}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Use Lagrange's identity: $\\|\\mathbf{u}\\times\\mathbf{v}\\|^2 + (\\mathbf{u}\\cdot\\mathbf{v})^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2$. The left side is $0 + 0$, so $\\|\\mathbf{u}\\|\\|\\mathbf{v}\\| = 0$. Geometrically: two nonzero vectors cannot be both parallel ($\\sin\\theta = 0$) and perpendicular ($\\cos\\theta = 0$). **True**.",
  },
  {
    subtopic: "Lines & planes",
    kind: "tfn",
    prompt: "Two lines in $\\mathbb{R}^3$ that are not parallel must intersect.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "In $\\mathbb{R}^3$ non-parallel lines can be **skew**. Example: the $x$-axis $(t,0,0)$ and the line $(0,s,1)$. Equating gives $t = 0$, $s = 0$ and $0 = 1$, which is impossible. (In $\\mathbb{R}^2$ the statement would be true.) **False**.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "tfn",
    prompt:
      "A line has direction vector $\\mathbf{d}$ and a plane has normal vector $\\mathbf{n}$, with $\\mathbf{n}\\cdot\\mathbf{d} = 0$. Then the line lies in the plane.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\mathbf{n}\\cdot\\mathbf{d} = 0$ says the line is **parallel** to the plane. It then either lies in the plane (if one of its points satisfies the plane equation) or never meets it. No point of the line is given, so **Not enough information**.",
  },
  {
    subtopic: "Lines & planes",
    kind: "tfn",
    prompt:
      "The set $\\{(1,2,0) + s(1,-1,2) + t(-2,2,-4) : s, t\\in\\mathbb{R}\\}$ is a plane in $\\mathbb{R}^3$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$(-2,2,-4) = -2(1,-1,2)$, so the two direction vectors are parallel. Then $s(1,-1,2) + t(-2,2,-4) = (s-2t)(1,-1,2)$, and the set is just the **line** $(1,2,0) + r(1,-1,2)$. A plane in vector form needs two non-parallel directions. **False**.",
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
      "$\\overrightarrow{BC} = \\mathbf{v}-\\mathbf{u}$ (head of $\\mathbf{u}$ to head of $\\mathbf{v}$), so $\\overrightarrow{BM} = \\tfrac12(\\mathbf{v}-\\mathbf{u})$.\n$\\overrightarrow{AM} = \\overrightarrow{AB}+\\overrightarrow{BM} = \\mathbf{u} + \\tfrac12\\mathbf{v} - \\tfrac12\\mathbf{u} = \\tfrac12(\\mathbf{u}+\\mathbf{v})$.\n$\\tfrac12(\\mathbf{v}-\\mathbf{u})$ is $\\overrightarrow{BM}$, not $\\overrightarrow{AM}$.",
  },
  {
    subtopic: "Geometric vectors",
    kind: "mcq",
    prompt: "Which of the following vectors is parallel to $\\mathbf{v} = (2,-6,4)$?",
    options: ["$(1,3,2)$", "$(3,-9,4)$", "$(-1,3,-2)$", "$(2,6,-4)$", NOTA],
    answer: 2,
    solution:
      "Parallel means a scalar multiple: $(-1,3,-2) = -\\tfrac12(2,-6,4)$. A negative scalar is allowed: opposite direction still counts as parallel.\n$(1,3,2)$ and $(2,6,-4)$ have the wrong sign pattern, and $(3,-9,4)$ has ratios $\\tfrac32, \\tfrac32, 1$, which are not all equal.",
  },
  {
    subtopic: "Geometric vectors",
    kind: "mcq",
    prompt: "For which value of $k$ are the points $A(1,-1,2)$, $B(3,0,5)$ and $C(7,2,k)$ collinear?",
    options: ["$k = 11$", "$k = 9$", "$k = 7$", "$k = 13$", NOTA],
    answer: 0,
    solution:
      "$\\overrightarrow{AB} = (2,1,3)$ and $\\overrightarrow{AC} = (6,3,k-2)$. The first two components give $\\overrightarrow{AC} = 3\\overrightarrow{AB}$, so $k - 2 = 9$ and $k = 11$.\nTrap: $k = 9$ forgets that $\\overrightarrow{AC}$ is $C - A$ (it sets the third coordinate of $C$ itself to 9).",
  },
  {
    subtopic: "Components",
    kind: "mcq",
    prompt: "The vector $\\mathbf{u} = (4,-2,1)$ has terminal point $Q(1,3,-2)$. Its initial point is",
    options: ["$(5,1,-1)$", "$(-3,5,-3)$", "$(3,-5,3)$", "$(-3,5,3)$", NOTA],
    answer: 1,
    solution:
      "$\\mathbf{u} = Q - P$, so $P = Q - \\mathbf{u} = (1-4,\\ 3+2,\\ -2-1) = (-3, 5, -3)$.\n$(5,1,-1) = Q + \\mathbf{u}$ is the terminal point of $\\mathbf{u}$ drawn **from** $Q$; $(3,-5,3) = \\mathbf{u} - Q$ has the sign flipped.",
  },
  {
    subtopic: "Components",
    kind: "mcq",
    prompt:
      "A vector $\\mathbf{u}$ with $\\|\\mathbf{u}\\| = 6$ is oppositely directed to $\\mathbf{v} = (1,-2,2)$ and has terminal point $Q(0,1,-1)$. The initial point of $\\mathbf{u}$ is",
    options: ["$(2,-3,3)$", "$(-2,5,-5)$", "$(-2,3,-3)$", "$(1,-1,1)$", NOTA],
    answer: 0,
    solution:
      "$\\|\\mathbf{v}\\| = 3$, so $\\mathbf{u} = -\\tfrac{6}{3}\\mathbf{v} = (-2,4,-4)$.\n$P = Q - \\mathbf{u} = (0+2,\\ 1-4,\\ -1+4) = (2,-3,3)$.\nCheck: $Q - P = (-2,4,-4)$ ✓. $(-2,5,-5) = Q + \\mathbf{u}$ is the usual sign slip.",
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
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "mcq",
    prompt: "The norm of $\\mathbf{v} = (1,-2,3,-1,1)\\in\\mathbb{R}^5$ is",
    options: ["$2$", "$4$", "$8$", "$16$", NOTA],
    answer: 1,
    solution:
      "$\\|\\mathbf{v}\\| = \\sqrt{1+4+9+1+1} = \\sqrt{16} = 4$.\n$2$ is the plain sum of the components, $8$ the sum of their absolute values, and $16 = \\|\\mathbf{v}\\|^2$ (forgot the square root).",
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
      "$\\|\\mathbf{v}\\| = \\sqrt{4+1+4} = 3$. Opposite unit vector: $-\\mathbf{v}/\\|\\mathbf{v}\\| = \\left(-\\tfrac23, \\tfrac13, \\tfrac23\\right)$.\n(a) has the same direction as $\\mathbf{v}$; (b) divides by $\\|\\mathbf{v}\\|^2 = 9$; (c) has length 3.",
  },
  {
    subtopic: "Norm & unit vectors",
    kind: "mcq",
    prompt: "The distance between $P(1,-2,4)$ and $Q(3,1,-2)$ is",
    options: ["$11$", "$49$", "$7$", "$\\sqrt{11}$", NOTA],
    answer: 2,
    solution:
      "$\\overrightarrow{PQ} = (2, 3, -6)$ and $d(P,Q) = \\sqrt{4+9+36} = \\sqrt{49} = 7$.\n$11$ adds the absolute differences, $49$ forgets the square root.",
  },
  {
    subtopic: "Direction angles",
    kind: "mcq",
    prompt: "Which triple $(\\alpha, \\beta, \\gamma)$ can be the angles a nonzero vector in $\\mathbb{R}^3$ makes with the positive $x$-, $y$- and $z$-axes?",
    options: [
      "$(45^\\circ, 45^\\circ, 45^\\circ)$",
      "$(60^\\circ, 60^\\circ, 60^\\circ)$",
      "$(30^\\circ, 30^\\circ, 90^\\circ)$",
      "$(90^\\circ, 90^\\circ, 45^\\circ)$",
      NOTA,
    ],
    answer: 4,
    solution:
      "Direction angles must satisfy $\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma = 1$.\n(a) $\\tfrac12\\cdot3 = \\tfrac32$; (b) $\\tfrac14\\cdot3 = \\tfrac34$; (c) $\\tfrac34+\\tfrac34+0 = \\tfrac32$; (d) $0+0+\\tfrac12 = \\tfrac12$. None equals 1, so **None of the above**. (A valid triple would be $(60^\\circ, 45^\\circ, 120^\\circ)$: $\\tfrac14+\\tfrac12+\\tfrac14 = 1$.)",
  },
  {
    subtopic: "Direction angles",
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
      "Let $\\mathbf{x} = (a,b,c)$, $\\|\\mathbf{x}\\| = 1$. Angle with the $y$-axis: $b = \\mathbf{x}\\cdot\\mathbf{j} = \\cos\\tfrac{3\\pi}{4} = -\\tfrac{1}{\\sqrt2}$.\n$\\|\\mathbf{x}-\\mathbf{i}\\|^2 = \\|\\mathbf{x}\\|^2 - 2a + 1 = 2 - 2a = 1$, so $a = \\tfrac12$.\nThen $c^2 = 1 - \\tfrac14 - \\tfrac12 = \\tfrac14$, so $c = \\pm\\tfrac12$. Option (a) matches. (b) has $a = -\\tfrac12$; (c) makes angle $\\tfrac{\\pi}{4}$ with the $y$-axis; (d) has $b = -\\tfrac12$ (angle $\\tfrac{2\\pi}{3}$).",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "Find $k$ such that $\\mathbf{u} = (k, 2, -1)$ and $\\mathbf{v} = (3, k, 4)$ are orthogonal.",
    options: ["$k = -\\tfrac45$", "$k = 4$", "$k = \\tfrac54$", "$k = -4$", NOTA],
    answer: 4,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v} = 3k + 2k - 4 = 5k - 4 = 0$, so $k = \\tfrac45$.\nThat value is not listed, so **None of the above**. ($-\\tfrac45$ is a sign slip, $\\tfrac54$ inverts the fraction, and $4$ drops the $2k$ term.)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "For which values of $k$ is the angle between $\\mathbf{u} = (k, 1, 2)$ and $\\mathbf{v} = (k, -3, 1)$ obtuse?",
    options: ["$-1 < k < 1$", "$k < -1$ or $k > 1$", "$k < 1$", "$k = \\pm1$", NOTA],
    answer: 0,
    solution:
      "Obtuse $\\iff \\mathbf{u}\\cdot\\mathbf{v} < 0$ (and the vectors are not oppositely parallel).\n$\\mathbf{u}\\cdot\\mathbf{v} = k^2 - 3 + 2 = k^2 - 1 < 0 \\iff -1 < k < 1$.\nThey are never parallel (the $z$-components force a factor of 2, but then $1 \\ne -6$), so the answer is $-1 < k < 1$. At $k = \\pm1$ the angle is exactly $90^\\circ$.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "Let $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\in\\mathbb{R}^3$ and let $k$ be a scalar. Which expression is **not** defined?",
    options: [
      "$(\\mathbf{u}\\cdot\\mathbf{v})\\,\\mathbf{w}$",
      "$\\mathbf{u}\\cdot(\\mathbf{v}+k\\mathbf{w})$",
      "$\\|\\mathbf{u}\\|\\,(\\mathbf{v}\\cdot\\mathbf{w})$",
      "$\\mathbf{u}\\times(\\mathbf{v}\\times\\mathbf{w})$",
      "$(\\mathbf{u}\\cdot\\mathbf{v})\\cdot\\mathbf{w}$",
    ],
    answer: 4,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v}$ is a **scalar**, and the dot product needs two vectors, so $(\\mathbf{u}\\cdot\\mathbf{v})\\cdot\\mathbf{w}$ is meaningless.\n(a) scalar times vector ✓; (b) vector dot vector ✓; (c) scalar times scalar ✓; (d) cross product of two vectors in $\\mathbb{R}^3$ ✓.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Suppose $\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 3$ and $\\mathbf{u}\\cdot\\mathbf{v} = -1$. Then $(2\\mathbf{u}+\\mathbf{v})\\cdot(\\mathbf{u}-3\\mathbf{v}) =$",
    options: ["$-19$", "$-24$", "$-14$", "$-26$", NOTA],
    answer: 2,
    solution:
      "Expand like a product of brackets:\n$(2\\mathbf{u}+\\mathbf{v})\\cdot(\\mathbf{u}-3\\mathbf{v}) = 2\\|\\mathbf{u}\\|^2 - 6\\,\\mathbf{u}\\cdot\\mathbf{v} + \\mathbf{v}\\cdot\\mathbf{u} - 3\\|\\mathbf{v}\\|^2 = 8 + 6 - 1 - 27 = -14$.\n$-19$ drops the cross terms; $-24$ comes from a sign slip on $-6\\,\\mathbf{u}\\cdot\\mathbf{v}$.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{v}\\| = 5$ and the angle between them is $\\tfrac{2\\pi}{3}$. Then $\\|\\mathbf{u}+\\mathbf{v}\\| =$",
    options: ["$7$", "$\\sqrt{34}$", "$\\sqrt{19}$", "$8$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{u}\\cdot\\mathbf{v} = 3\\cdot5\\cos\\tfrac{2\\pi}{3} = -\\tfrac{15}{2}$.\n$\\|\\mathbf{u}+\\mathbf{v}\\|^2 = 9 + 2(-\\tfrac{15}{2}) + 25 = 19$, so $\\|\\mathbf{u}+\\mathbf{v}\\| = \\sqrt{19}$.\n$7$ uses $\\cos = +\\tfrac12$, $\\sqrt{34}$ forgets the cross term, and $8$ simply adds the lengths.",
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
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "A constant force $\\mathbf{F} = (4,-1,2)$ moves a particle from $P(2,0,-3)$ to $Q(5,-2,1)$. The work done $W = \\mathbf{F}\\cdot\\mathbf{r}$, where $\\mathbf{r}$ is the displacement, is",
    options: ["$-22$", "$24$", "$2$", "$22$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{r} = \\overrightarrow{PQ} = (3,-2,4)$, so $W = 12 + 2 + 8 = 22$.\n$-22$ uses $P - Q$; $24 = \\mathbf{F}\\cdot Q$ and $2 = \\mathbf{F}\\cdot P$ use position vectors instead of the displacement.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 5$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 8$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 6$. Then $\\|\\mathbf{v}\\| =$",
    options: ["$\\sqrt{50}$", "$5$", "$\\sqrt{14}$", "$10$", NOTA],
    answer: 1,
    solution:
      "Parallelogram law: $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$.\n$64 + 36 = 50 + 2\\|\\mathbf{v}\\|^2 \\Rightarrow \\|\\mathbf{v}\\|^2 = 25$, so $\\|\\mathbf{v}\\| = 5$.\n$\\sqrt{50}$ forgets the factor 2 on $\\|\\mathbf{v}\\|^2$.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "Vectors $\\mathbf{u}, \\mathbf{v}$ satisfy $\\|\\mathbf{u}+\\mathbf{v}\\| = 2\\sqrt5$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 4$. Then $\\mathbf{u}\\cdot\\mathbf{v} =$",
    options: ["$4$", "$\\tfrac12$", "$-1$", "$2\\sqrt5 - 4$", NOTA],
    answer: 4,
    solution:
      "Polarization: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\tfrac14\\|\\mathbf{u}-\\mathbf{v}\\|^2 = \\tfrac14(20 - 16) = 1$.\n$1$ is not listed, so **None of the above**. ($4$ forgets the $\\tfrac14$, $\\tfrac12$ uses $\\tfrac18$, $-1$ subtracts the wrong way round.)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "Let $\\mathbf{w} = (2,-1,2)$. The maximum value of $\\mathbf{x}\\cdot\\mathbf{w}$ over all $\\mathbf{x}\\in\\mathbb{R}^3$ with $\\|\\mathbf{x}\\| \\le 2$ is",
    options: ["$3$", "$6$", "$18$", "$9$", NOTA],
    answer: 1,
    solution:
      "Cauchy–Schwarz: $\\mathbf{x}\\cdot\\mathbf{w} \\le \\|\\mathbf{x}\\|\\|\\mathbf{w}\\| \\le 2\\cdot3 = 6$, with equality at $\\mathbf{x} = 2\\mathbf{w}/\\|\\mathbf{w}\\| = \\tfrac23(2,-1,2)$, which is parallel to $\\mathbf{w}$.\n$18 = 2\\|\\mathbf{w}\\|^2$ is the common slip of using $\\|\\mathbf{w}\\|^2$.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 4$ and $\\|\\mathbf{v}\\| = 7$. Which value is **impossible** for $\\|\\mathbf{u}+\\mathbf{v}\\|$?",
    options: ["$3$", "$11$", "$2$", "$7$", "All of these values are possible"],
    answer: 2,
    solution:
      "Triangle inequality and its reverse: $|\\|\\mathbf{u}\\|-\\|\\mathbf{v}\\|| \\le \\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$, so $3 \\le \\|\\mathbf{u}+\\mathbf{v}\\| \\le 11$.\n$3$ (opposite directions), $11$ (same direction) and $7$ (some angle in between) are attainable; $2$ is not.",
  },
  {
    subtopic: "Cross product",
    kind: "mcq",
    prompt: "$(1,2,0)\\times(0,1,3) =$",
    options: ["$(6,-3,1)$", "$(6,3,1)$", "$(-6,3,-1)$", "$(6,-3,-1)$", NOTA],
    answer: 0,
    solution:
      "$(u_2v_3-u_3v_2,\\ u_3v_1-u_1v_3,\\ u_1v_2-u_2v_1) = (2\\cdot3-0\\cdot1,\\ 0\\cdot0-1\\cdot3,\\ 1\\cdot1-2\\cdot0) = (6,-3,1)$.\nCheck: $(6,-3,1)\\cdot(1,2,0) = 0$ and $(6,-3,1)\\cdot(0,1,3) = 0$ ✓. $(6,3,1)$ is the missing-minus slip on the middle component; $(-6,3,-1)$ is $\\mathbf{v}\\times\\mathbf{u}$.",
  },
  {
    subtopic: "Cross product",
    kind: "mcq",
    prompt: "$(\\mathbf{i}\\times\\mathbf{j})\\times\\mathbf{j} =$",
    options: ["$\\mathbf{0}$", "$\\mathbf{i}$", "$-\\mathbf{i}$", "$\\mathbf{k}$", NOTA],
    answer: 2,
    solution:
      "$\\mathbf{i}\\times\\mathbf{j} = \\mathbf{k}$, then $\\mathbf{k}\\times\\mathbf{j} = -(\\mathbf{j}\\times\\mathbf{k}) = -\\mathbf{i}$.\n$\\mathbf{0}$ is $\\mathbf{i}\\times(\\mathbf{j}\\times\\mathbf{j})$: the cross product is not associative, so the brackets matter.",
  },
  {
    subtopic: "Cross product",
    kind: "mcq",
    prompt: "$\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 5$ and $\\mathbf{u}\\cdot\\mathbf{v} = -6$. Then $\\|\\mathbf{u}\\times\\mathbf{v}\\| =$",
    options: ["$4$", "$8$", "$64$", "$\\sqrt{136}$", NOTA],
    answer: 1,
    solution:
      "Lagrange's identity: $\\|\\mathbf{u}\\times\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2 - (\\mathbf{u}\\cdot\\mathbf{v})^2 = 100 - 36 = 64$, so $\\|\\mathbf{u}\\times\\mathbf{v}\\| = 8$.\n(Equivalently $\\cos\\theta = -\\tfrac35$, $\\sin\\theta = \\tfrac45$, and $2\\cdot5\\cdot\\tfrac45 = 8$.) The sign of $\\mathbf{u}\\cdot\\mathbf{v}$ does not matter because it is squared.",
  },
  {
    subtopic: "Cross product",
    kind: "mcq",
    prompt: "The area of the triangle with vertices $A(1,0,0)$, $B(0,2,0)$ and $C(0,0,2)$ is",
    options: ["$2\\sqrt6$", "$\\sqrt6$", "$6$", "$12$", NOTA],
    answer: 1,
    solution:
      "$\\overrightarrow{AB} = (-1,2,0)$, $\\overrightarrow{AC} = (-1,0,2)$.\n$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (2\\cdot2-0\\cdot0,\\ 0\\cdot(-1)-(-1)\\cdot2,\\ (-1)\\cdot0-2\\cdot(-1)) = (4,2,2)$, with norm $\\sqrt{24} = 2\\sqrt6$.\nArea $= \\tfrac12\\cdot2\\sqrt6 = \\sqrt6$. $2\\sqrt6$ is the parallelogram (forgot the $\\tfrac12$).",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "Which point lies on the line through $A(1,-2,3)$ and $B(4,0,1)$?",
    options: ["$(4,2,1)$", "$(-2,-4,1)$", "$(5,0,1)$", "$(7,2,-1)$", NOTA],
    answer: 3,
    solution:
      "Direction $\\overrightarrow{AB} = (3,2,-2)$, so the line is $(1+3t,\\ -2+2t,\\ 3-2t)$.\n$(7,2,-1)$: $t = 2$ from the $x$-coordinate gives $y = 2$ and $z = -1$ ✓.\n$(-2,-4,1)$: $t = -1$ gives $z = 5 \\ne 1$. $(4,2,1)$: $t = 1$ gives $y = 0$. $(5,0,1)$: $t = \\tfrac43$ gives $y = \\tfrac23$.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "In $\\mathbb{R}^2$, the line through $(1,2)$ with normal vector $\\mathbf{n} = (3,-1)$ has equation",
    options: ["$x + 3y = 7$", "$3x - y = -1$", "$3x - y = 1$", "$3x - y = 5$", NOTA],
    answer: 2,
    solution:
      "Point-normal form: $3(x-1) - (y-2) = 0$, i.e. $3x - y = 3 - 2 = 1$.\n$x + 3y = 7$ treats $(3,-1)$ as a **direction** vector instead of a normal.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "The plane through $(2,-1,3)$ with normal vector $(1,4,-2)$ is",
    options: ["$x+4y-2z = 8$", "$x+4y-2z = -8$", "$2x - y + 3z = -8$", "$x+4y-2z = -4$", NOTA],
    answer: 1,
    solution:
      "Point-normal: $(x-2) + 4(y+1) - 2(z-3) = 0$, so $x + 4y - 2z = 2 - 4 - 6 = -8$.\nOption (c) swaps the roles of the point and the normal.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "The plane $\\mathbf{x} = (1,0,2) + s(1,1,0) + t(0,1,-1)$, $s,t\\in\\mathbb{R}$, has general equation",
    options: ["$x - y - z = 1$", "$x + y + z = 3$", "$-x + y + z = -1$", "$x - y - z = -1$", NOTA],
    answer: 3,
    solution:
      "Normal: $(1,1,0)\\times(0,1,-1) = (1\\cdot(-1)-0\\cdot1,\\ 0\\cdot0-1\\cdot(-1),\\ 1\\cdot1-1\\cdot0) = (-1,1,1)$.\n$d = (-1,1,1)\\cdot(1,0,2) = 1$, so $-x + y + z = 1$, i.e. $x - y - z = -1$.\nCheck with $s = t = 1$: $(2,2,1)$ gives $2 - 2 - 1 = -1$ ✓.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "A line passes through the origin and is perpendicular to both $(1,2,-1)$ and $(2,0,1)$. A direction vector for it is",
    options: ["$(2,3,-4)$", "$(-2,-3,4)$", "$(3,2,0)$", "$(2,-3,-4)$", NOTA],
    answer: 3,
    solution:
      "A vector perpendicular to both is their cross product: $(1,2,-1)\\times(2,0,1) = (2\\cdot1-(-1)\\cdot0,\\ (-1)\\cdot2-1\\cdot1,\\ 1\\cdot0-2\\cdot2) = (2,-3,-4)$.\nCheck: $(2,-3,-4)\\cdot(1,2,-1) = 2-6+4 = 0$ and $(2,-3,-4)\\cdot(2,0,1) = 4-4 = 0$ ✓.\n$(2,3,-4)$ is the missing-minus slip on the middle component, and $(-2,-3,4)$ flips the wrong signs (its dot product with $(1,2,-1)$ is $-12$). Any nonzero multiple of $(2,-3,-4)$, such as $(-2,3,4)$, would also be correct.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line $x = 3+t,\\ y = -2+2t,\\ z = 5-t$ meets the $yz$-plane at",
    options: ["$(0,-8,8)$", "$(0,-2,5)$", "$(0,-8,2)$", "$(0,4,2)$", NOTA],
    answer: 0,
    solution:
      "The $yz$-plane is $x = 0$: $3 + t = 0$ gives $t = -3$, so $y = -2-6 = -8$ and $z = 5+3 = 8$.\n$(0,4,2)$ uses $t = +3$; $(0,-2,5)$ just deletes the $x$-coordinate of the base point.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line $x = 1+2t,\\ y = -1+t,\\ z = 2-t$ meets the plane $x + 2y + 3z = 13$ at",
    options: ["$(9,3,-2)$", "$(17,7,-6)$", "$(-15,-9,10)$", "$(3,0,1)$", NOTA],
    answer: 1,
    solution:
      "Substitute: $(1+2t) + 2(-1+t) + 3(2-t) = 5 + t = 13$, so $t = 8$ and the point is $(17, 7, -6)$.\nCheck: $17 + 14 - 18 = 13$ ✓.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line $\\mathbf{x} = (1,0,2) + t(2,-1,1)$ and the plane $x + 3y + z = 5$:",
    options: [
      "meet in exactly one point",
      "the line lies in the plane",
      "are parallel and do not meet",
      "the line is perpendicular to the plane",
      "Cannot be determined",
    ],
    answer: 2,
    solution:
      "$\\mathbf{n}\\cdot\\mathbf{d} = (1,3,1)\\cdot(2,-1,1) = 2 - 3 + 1 = 0$, so the line is parallel to the plane.\nTest the base point: $1 + 0 + 2 = 3 \\ne 5$, so it is not in the plane. Substituting confirms it: $(1+2t) + 3(-t) + (2+t) = 3 = 5$ has no solution.",
  },
  {
    subtopic: "Distance to a plane",
    kind: "mcq",
    prompt: "The distance from $P(1,-2,3)$ to the plane $2x + y - 2z = 4$ is",
    options: ["$\\tfrac{10}{9}$", "$2$", "$10$", "$\\tfrac{10}{3}$", NOTA],
    answer: 3,
    solution:
      "$D = \\dfrac{|2(1) + (-2) - 2(3) - 4|}{\\sqrt{4+1+4}} = \\dfrac{|-10|}{3} = \\dfrac{10}{3}$.\n$2$ forgets to subtract $d = 4$; $\\tfrac{10}{9}$ divides by $\\|\\mathbf{n}\\|^2$.",
  },
  {
    subtopic: "Distance to a plane",
    kind: "mcq",
    prompt: "The distance between the parallel planes $x - 2y + 2z = 3$ and $2x - 4y + 4z = 12$ is",
    options: ["$3$", "$\\tfrac32$", "$1$", "$9$", NOTA],
    answer: 2,
    solution:
      "First give both planes the same normal: $2x - 4y + 4z = 12 \\iff x - 2y + 2z = 6$.\nDistance $= \\dfrac{|6 - 3|}{\\sqrt{1+4+4}} = \\dfrac33 = 1$.\n$3$ compares $12$ with $3$ directly; $\\tfrac32$ does that and then divides by $\\|(2,-4,4)\\| = 6$.",
  },
];
