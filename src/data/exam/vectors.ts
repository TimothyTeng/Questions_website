import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const vectorsExam: ConceptQuestion[] = [
  {
    subtopic: "Direction angles",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{x}\\in\\mathbb{R}^3$ be a unit vector that makes an angle of $\\pi/4$ with the $x$-axis. If $\\mathbf{x}-\\mathbf{j}-\\mathbf{k}$ is also a unit vector, then $\\mathbf{x} =$",
    options: [
      "$\\left[\\tfrac{1}{\\sqrt2},\\ -\\tfrac12,\\ -\\tfrac12\\right]^T$",
      "$\\left[\\tfrac{1}{\\sqrt2},\\ \\tfrac12,\\ \\tfrac12\\right]^T$",
      "$\\left[\\tfrac12,\\ \\tfrac12,\\ \\tfrac{1}{\\sqrt2}\\right]^T$",
      "$\\left[-\\tfrac{1}{\\sqrt2},\\ \\tfrac12,\\ \\tfrac12\\right]^T$",
      NOTA,
    ],
    answer: 1,
    solution:
      "Write $\\mathbf{x} = (a,b,c)$ with $a^2+b^2+c^2 = 1$.\nAngle with the $x$-axis: $a = \\mathbf{x}\\cdot\\mathbf{i} = \\cos\\tfrac{\\pi}{4} = \\tfrac{1}{\\sqrt2}$, so $b^2+c^2 = \\tfrac12$.\n$\\|\\mathbf{x}-\\mathbf{j}-\\mathbf{k}\\|^2 = \\|\\mathbf{x}\\|^2 - 2(b+c) + 2 = 3 - 2(b+c) = 1$, so $b + c = 1$.\nThen $2bc = (b+c)^2 - (b^2+c^2) = \\tfrac12$, so $b, c$ are the roots of $t^2 - t + \\tfrac14 = 0$: $b = c = \\tfrac12$.\nCheck (a): $\\|\\mathbf{x}-\\mathbf{j}-\\mathbf{k}\\|^2 = \\tfrac12 + \\tfrac94 + \\tfrac94 = 5$. (c) makes $60^\\circ$ with the $x$-axis and (d) makes $135^\\circ$.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "The equation of the plane passing through $A(1,0,2)$, $B(2,1,0)$ and $C(0,3,1)$ is",
    options: ["$x + y - 2z = -3$", "$5x - 3y + 4z = 13$", "$5x + 3y + 4z = 13$", "$5x + 3y + 4z = -13$", NOTA],
    answer: 2,
    solution:
      "$\\overrightarrow{AB} = (1,1,-2)$, $\\overrightarrow{AC} = (-1,3,-1)$.\n$\\mathbf{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = (1\\cdot(-1)-(-2)\\cdot3,\\ (-2)(-1)-1\\cdot(-1),\\ 1\\cdot3-1\\cdot(-1)) = (5,3,4)$.\n$d = \\mathbf{n}\\cdot A = 5 + 0 + 8 = 13$, so $5x+3y+4z = 13$.\nCheck: $B$: $10+3+0 = 13$ ✓; $C$: $0+9+4 = 13$ ✓.\n(a) uses $\\overrightarrow{AB}$ itself as the normal; (b) is the sign slip on the middle cross-product component.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt:
      "Consider the plane passing through the point $(2,5,-1)$ with normal vector $\\mathbf{n} = [3,\\ -1,\\ 2]^T$. Which of the following points lies on the plane?",
    options: ["$(1,2,-1)$", "$(0,1,1)$", "$(2,0,-3)$", "$(-1,2,1)$", NOTA],
    answer: 0,
    solution:
      "Plane: $3(x-2) - (y-5) + 2(z+1) = 0$, i.e. $3x - y + 2z = 6 - 5 - 2 = -1$.\n$(1,2,-1)$: $3 - 2 - 2 = -1$ ✓.\n$(0,1,1)$: $0 - 1 + 2 = 1$ (this is the point you accept if you get the sign of $d$ wrong). $(2,0,-3)$: $6 - 6 = 0$. $(-1,2,1)$: $-3 - 2 + 2 = -3$.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt:
      "A plane is given by $\\mathbf{r} = [1,2,0]^T + \\lambda[1,0,2]^T + \\mu[0,1,-1]^T$ and a line by $\\mathbf{s} = [3,1,4]^T + \\beta[1,1,0]^T$, where $\\lambda, \\mu, \\beta\\in\\mathbb{R}$. At the point where the line meets the plane, the values of $\\beta$ and $\\mu$ are",
    options: ["$\\beta = -1,\\ \\mu = -2$", "$\\beta = 1,\\ \\mu = 2$", "$\\beta = -1,\\ \\mu = 2$", "$\\beta = -2,\\ \\mu = -1$", NOTA],
    answer: 0,
    solution:
      "Set $\\mathbf{r} = \\mathbf{s}$ componentwise:\n$1 + \\lambda = 3 + \\beta$, $\\ 2 + \\mu = 1 + \\beta$, $\\ 2\\lambda - \\mu = 4$.\nFrom the first two: $\\lambda = 2 + \\beta$ and $\\mu = \\beta - 1$. Substituting: $2(2+\\beta) - (\\beta - 1) = \\beta + 5 = 4$, so $\\beta = -1$, $\\lambda = 1$, $\\mu = -2$.\nCheck: plane point $(1+1,\\ 2-2,\\ 2+2) = (2,0,4)$ and line point $(3-1,\\ 1-1,\\ 4) = (2,0,4)$ ✓.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ with $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 4$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 6$. Then $(\\|\\mathbf{v}\\|,\\ \\mathbf{u}\\cdot\\mathbf{v}) =$",
    options: ["$(\\sqrt{17},\\ 5)$", "$(\\sqrt{17},\\ -5)$", "$(\\sqrt{34},\\ -5)$", "$(\\sqrt{17},\\ -20)$", NOTA],
    answer: 1,
    solution:
      "Parallelogram law: $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$, so $16 + 36 = 18 + 2\\|\\mathbf{v}\\|^2$ and $\\|\\mathbf{v}\\|^2 = 17$.\nPolarization: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14(16 - 36) = -5$.\nTraps: $\\sqrt{34}$ forgets the factor 2 on $\\|\\mathbf{v}\\|^2$; $-20$ forgets the $\\tfrac14$; $+5$ subtracts in the wrong order.",
  },
  {
    subtopic: "Cross product",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}$ be vectors in $\\mathbb{R}^3$. Which of the following statements are correct?\nI. $\\|\\mathbf{u}\\times\\mathbf{v}\\|^2 + (\\mathbf{u}\\cdot\\mathbf{v})^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2$\nII. $(\\mathbf{u}\\times\\mathbf{v})\\cdot\\mathbf{u} = 0$\nIII. $\\mathbf{u}\\times(\\mathbf{v}\\times\\mathbf{w}) = (\\mathbf{u}\\times\\mathbf{v})\\times\\mathbf{w}$\nIV. If $\\mathbf{u}\\ne\\mathbf{0}$ and $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{u}\\times\\mathbf{w}$, then $\\mathbf{v} = \\mathbf{w}$",
    options: ["II only", "I and II only", "I, II and IV only", "II and III only", "All of the above"],
    answer: 1,
    solution:
      "I. True: $\\|\\mathbf{u}\\times\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2\\sin^2\\theta$ and $(\\mathbf{u}\\cdot\\mathbf{v})^2 = \\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2\\cos^2\\theta$ (Lagrange's identity).\nII. True: $\\mathbf{u}\\times\\mathbf{v}$ is orthogonal to $\\mathbf{u}$.\nIII. False: not associative. $\\mathbf{i}\\times(\\mathbf{i}\\times\\mathbf{j}) = \\mathbf{i}\\times\\mathbf{k} = -\\mathbf{j}$, but $(\\mathbf{i}\\times\\mathbf{i})\\times\\mathbf{j} = \\mathbf{0}$.\nIV. False: $\\mathbf{u}\\times(\\mathbf{v}-\\mathbf{w}) = \\mathbf{0}$ only says $\\mathbf{v}-\\mathbf{w}$ is parallel to $\\mathbf{u}$; e.g. $\\mathbf{w} = \\mathbf{v}+\\mathbf{u}$.\nSo **I and II only**.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{x} = [1,0,2]^T$, $\\mathbf{y} = [1,-1,0]^T$ and $\\mathbf{z} = [0,2,1]^T$. What is the maximum value of $|\\mathbf{v}^T(2\\mathbf{x}-\\mathbf{y}+\\mathbf{z})|$ over all $\\mathbf{v}\\in\\mathbb{R}^3$ with $\\|\\mathbf{v}\\|\\le 3$?",
    options: ["$35$", "$105$", "$\\sqrt{35}$", "$3\\sqrt{35}$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{w} = 2\\mathbf{x}-\\mathbf{y}+\\mathbf{z} = (2-1+0,\\ 0+1+2,\\ 4-0+1) = (1,3,5)$, so $\\|\\mathbf{w}\\| = \\sqrt{35}$.\nCauchy–Schwarz: $|\\mathbf{v}^T\\mathbf{w}| \\le \\|\\mathbf{v}\\|\\|\\mathbf{w}\\| \\le 3\\sqrt{35}$, with equality at $\\mathbf{v} = 3\\mathbf{w}/\\|\\mathbf{w}\\|$.\n$\\sqrt{35}$ ignores the radius 3; $105 = 3\\|\\mathbf{w}\\|^2$ uses the squared norm.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line through $A(2,-1,3)$ and $B(4,3,-1)$ intersects the $xz$-plane at the point",
    options: ["$\\left(\\tfrac72,\\ 2,\\ 0\\right)$", "$(0,\\ -5,\\ 7)$", "$\\left(\\tfrac32,\\ 0,\\ 4\\right)$", "$\\left(\\tfrac52,\\ 0,\\ -2\\right)$", NOTA],
    answer: 4,
    solution:
      "$\\overrightarrow{AB} = (2,4,-4)$, so the line is $(2+2t,\\ -1+4t,\\ 3-4t)$.\nThe $xz$-plane is $y = 0$: $-1 + 4t = 0$ gives $t = \\tfrac14$, so the point is $\\left(\\tfrac52,\\ 0,\\ 2\\right)$, which is not listed: **None of the above**.\n$(\\tfrac72, 2, 0)$ is where it meets the $xy$-plane ($z = 0$), $(0,-5,7)$ is the $yz$-plane ($x = 0$), $(\\tfrac32, 0, 4)$ uses $t = -\\tfrac14$, and $(\\tfrac52, 0, -2)$ has a sign slip in $z$.",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt:
      "Let $\\Pi$ be the plane through $(1,2,-1)$ with normal vector $[2,-1,3]^T$. The line $L_1$ passes through $(0,0,-1)$ and is perpendicular to both $[0,0,1]^T$ and $[2,-1,0]^T$. The line $L_2$ passes through $(1,1,0)$ and is perpendicular to both $[0,1,0]^T$ and $[2,0,3]^T$. Which line(s) lie on $\\Pi$?",
    options: ["Neither", "$L_1$ only", "$L_2$ only", "Both $L_1$ and $L_2$", "Cannot be determined"],
    answer: 1,
    solution:
      "$\\Pi$: $2(x-1) - (y-2) + 3(z+1) = 0$, i.e. $2x - y + 3z = -3$.\n$L_1$: direction $[0,0,1]^T\\times[2,-1,0]^T = (0\\cdot0-1\\cdot(-1),\\ 1\\cdot2-0\\cdot0,\\ 0\\cdot(-1)-0\\cdot2) = (1,2,0)$. $\\mathbf{n}\\cdot\\mathbf{d} = 2 - 2 + 0 = 0$ (parallel), and the point gives $0 - 0 - 3 = -3$ ✓, so $L_1$ lies in $\\Pi$.\n$L_2$: direction $[0,1,0]^T\\times[2,0,3]^T = (1\\cdot3-0\\cdot0,\\ 0\\cdot2-0\\cdot3,\\ 0\\cdot0-1\\cdot2) = (3,0,-2)$. $\\mathbf{n}\\cdot\\mathbf{d} = 6 - 6 = 0$ (parallel), but the point gives $2 - 1 + 0 = 1 \\ne -3$. So $L_2$ is parallel to $\\Pi$ but never meets it.\nAnswer: **$L_1$ only**. (Checking only the directions would wrongly give \"both\".)",
  },
  {
    subtopic: "Distance to a plane",
    kind: "mcq",
    prompt:
      "Let $\\Pi_1: 6x - 2y + 3z = 4$, and let $\\Pi_2$ be the plane through $(1,-2,2)$ parallel to $\\Pi_1$. The distance between $\\Pi_1$ and $\\Pi_2$ is",
    options: ["$\\tfrac{20}{7}$", "$\\tfrac{12}{49}$", "$\\tfrac{12}{7}$", "$12$", NOTA],
    answer: 2,
    solution:
      "$\\Pi_2$ has the same normal $(6,-2,3)$: $6(1) - 2(-2) + 3(2) = 16$, so $\\Pi_2: 6x - 2y + 3z = 16$.\n$\\|\\mathbf{n}\\| = \\sqrt{36+4+9} = 7$, so the distance is $\\dfrac{|16 - 4|}{7} = \\dfrac{12}{7}$.\n(Equivalently, the distance from $(1,-2,2)$ to $\\Pi_1$.) $\\tfrac{20}{7}$ comes from $d = -16$ (sign slip), $\\tfrac{12}{49}$ divides by $\\|\\mathbf{n}\\|^2$, and $12$ forgets to divide.",
  },
  {
    subtopic: "Cross product",
    kind: "mcq",
    prompt:
      "For the triangle with vertices $A(1,0,1)$, $B(3,2,1)$ and $C(2,-1,3)$, the area of the triangle and the angle at $A$ are, respectively,",
    options: [
      "$2\\sqrt3$ and $90^\\circ$",
      "$4\\sqrt3$ and $90^\\circ$",
      "$2\\sqrt3$ and $60^\\circ$",
      "$\\sqrt3$ and $90^\\circ$",
      NOTA,
    ],
    answer: 0,
    solution:
      "$\\overrightarrow{AB} = (2,2,0)$, $\\overrightarrow{AC} = (1,-1,2)$.\nAngle: $\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 2 - 2 + 0 = 0$, so the angle at $A$ is $90^\\circ$.\nArea: $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (2\\cdot2-0\\cdot(-1),\\ 0\\cdot1-2\\cdot2,\\ 2\\cdot(-1)-2\\cdot1) = (4,-4,-4)$, with norm $\\sqrt{48} = 4\\sqrt3$, so the area is $\\tfrac12\\cdot4\\sqrt3 = 2\\sqrt3$.\nCross-check with the right angle: $\\tfrac12\\|\\overrightarrow{AB}\\|\\|\\overrightarrow{AC}\\| = \\tfrac12\\cdot2\\sqrt2\\cdot\\sqrt6 = 2\\sqrt3$ ✓. $4\\sqrt3$ is the parallelogram.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Let $A(1,2,0)$, $B(2,0,1)$ and $C(k,1,3)$. The set of all real $k$ for which triangle $ABC$ has a right angle is",
    options: ["$\\{2\\}$", "$\\{-4\\}$", "$\\{-2,\\ 4\\}$", "$\\{2,\\ -4\\}$", NOTA],
    answer: 3,
    solution:
      "Test each vertex.\nAt $A$: $\\overrightarrow{AB} = (1,-2,1)$, $\\overrightarrow{AC} = (k-1,-1,3)$, dot $= k - 1 + 2 + 3 = k + 4$, zero at $k = -4$.\nAt $B$: $\\overrightarrow{BA} = (-1,2,-1)$, $\\overrightarrow{BC} = (k-2,1,2)$, dot $= -k + 2 + 2 - 2 = 2 - k$, zero at $k = 2$.\nAt $C$: $\\overrightarrow{CA} = (1-k,1,-3)$, $\\overrightarrow{CB} = (2-k,-1,-2)$, dot $= (1-k)(2-k) - 1 + 6 = k^2 - 3k + 7$, whose discriminant $9 - 28 < 0$ means it is never zero.\nSo $k\\in\\{2, -4\\}$. Checking only the vertex $B$ gives the trap answer $\\{2\\}$.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "A constant force of magnitude $14$ acts in the direction of $[2,3,6]^T$ and moves a particle from $P(1,-1,2)$ to $Q(3,0,1)$. The work done (Work $= \\mathbf{F}\\cdot\\mathbf{r}$, $\\mathbf{r}$ the displacement) is",
    options: ["$2$", "$1$", "$14$", "$-2$", NOTA],
    answer: 0,
    solution:
      "$\\|[2,3,6]^T\\| = 7$, so $\\mathbf{F} = 14\\cdot\\tfrac17(2,3,6) = (4,6,12)$.\n$\\mathbf{r} = \\overrightarrow{PQ} = (2,1,-1)$.\n$W = 8 + 6 - 12 = 2$.\n$1$ uses $(2,3,6)$ unscaled; $14$ multiplies $(2,3,6)$ by 14 without normalising; $-2$ uses $P - Q$.",
  },
  {
    subtopic: "Linear combinations",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u} = [2,1,-3]^T$, $\\mathbf{v} = [1,-2,4]^T$ and $\\mathbf{w} = [4,7,h]^T$. For which $h$ is $\\mathbf{w} = a\\mathbf{u}+b\\mathbf{v}$ for some scalars $a, b$, and what are $a, b$ then?",
    options: [
      "$h = 17$, $a = 3$, $b = -2$",
      "$h = -17$, $a = 3$, $b = -2$",
      "$h = -17$, $a = -2$, $b = 3$",
      "$h = -1$, $a = 3$, $b = 2$",
      "Such $a, b$ exist for every $h$",
    ],
    answer: 1,
    solution:
      "The first two components do not involve $h$: $2a + b = 4$ and $a - 2b = 7$. Then $5a = 15$, so $a = 3$ and $b = -2$.\nThe third component then forces $h = -3a + 4b = -9 - 8 = -17$.\nFor any other $h$ the system is inconsistent, so (e) is false. $h = 17$ is the sign slip $3a - 4b$.",
  },
  {
    subtopic: "Components",
    kind: "mcq",
    prompt:
      "A vector $\\mathbf{u}$ has terminal point $Q(-1,4,2)$, length $6$, and is oppositely directed to $\\mathbf{v} = [2,-1,2]^T$. The initial point of $\\mathbf{u}$ is",
    options: ["$(-5,6,-2)$", "$(-3,5,0)$", "$(1,3,4)$", "$(-3,-2,-6)$", NOTA],
    answer: 4,
    solution:
      "$\\|\\mathbf{v}\\| = 3$, so $\\mathbf{u} = -\\tfrac63\\mathbf{v} = (-4,2,-4)$.\n$\\mathbf{u} = Q - P$ gives $P = Q - \\mathbf{u} = (-1+4,\\ 4-2,\\ 2+4) = (3,2,6)$, which is not listed: **None of the above**.\nTraps: $(-5,6,-2) = Q + \\mathbf{u}$; $(-3,5,0) = Q - \\mathbf{v}$ and $(1,3,4) = Q + \\mathbf{v}$ ignore the length; $(-3,-2,-6) = \\mathbf{u} - Q$.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "Which of the following statements is **false**?",
    options: [
      "The planes $2x - y + z = 1$ and $-4x + 2y - 2z = 3$ are parallel.",
      "The line $\\mathbf{x} = (1,2,3) + t(1,-1,0)$ is parallel to the plane $x + y + 5z = 0$.",
      "The distance from the origin to the plane $2x + y - 2z = 6$ is $6$.",
      "The plane through the origin containing $(1,0,1)$ and $(0,1,1)$ has normal vector $(1,1,-1)$.",
      "The lines $(1+2t,\\ 3-t,\\ 4t)$ and $(3+4s,\\ 2-2s,\\ 4+8s)$ are the same line.",
    ],
    answer: 2,
    solution:
      "(a) True: the normals $(2,-1,1)$ and $(-4,2,-2) = -2(2,-1,1)$ are parallel (and the planes are distinct).\n(b) True: $(1,-1,0)\\cdot(1,1,5) = 0$. (The line is parallel to the plane without lying in it, since $1+2+15 \\ne 0$.)\n(c) **False**: the distance is $|0 - 6|/\\sqrt{4+1+4} = 6/3 = 2$.\n(d) True: $(1,0,1)\\times(0,1,1) = (-1,-1,1)$, a multiple of $(1,1,-1)$.\n(e) True: $(4,-2,8) = 2(2,-1,4)$ and $(3,2,4)$ is the first line at $t = 1$.",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u} = [k,2,1]^T$ and $\\mathbf{v} = [k,-3,-4]^T$. For how many integers $k$ is the angle between $\\mathbf{u}$ and $\\mathbf{v}$ obtuse?",
    options: ["$3$", "$6$", "$7$", "$9$", NOTA],
    answer: 2,
    solution:
      "Obtuse $\\iff \\mathbf{u}\\cdot\\mathbf{v} < 0$, as long as the vectors are not oppositely parallel. $\\mathbf{u}\\cdot\\mathbf{v} = k^2 - 6 - 4 = k^2 - 10$.\n$k^2 < 10 \\iff k\\in\\{-3,-2,-1,0,1,2,3\\}$: **7** integers.\nThe vectors are never parallel: matching $z$-components needs $\\mathbf{u} = -\\tfrac14\\mathbf{v}$, but then $2 \\ne \\tfrac34$.\n$3$ counts only positive $k$, $6$ forgets $k = 0$.",
  },
  {
    subtopic: "Direction angles",
    kind: "mcq",
    prompt:
      "A vector $\\mathbf{v}\\in\\mathbb{R}^3$ with $\\|\\mathbf{v}\\| = 4$ makes an angle of $60^\\circ$ with the $x$-axis, $45^\\circ$ with the $y$-axis, and an acute angle with the $z$-axis. Then $\\mathbf{v} =$",
    options: [
      "$[2\\sqrt2,\\ 2,\\ 2]^T$",
      "$[2,\\ 2\\sqrt2,\\ -2]^T$",
      "$[1,\\ \\sqrt2,\\ 1]^T$",
      "$[2,\\ 2\\sqrt2,\\ 2]^T$",
      NOTA,
    ],
    answer: 3,
    solution:
      "$\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma = 1$: $\\tfrac14 + \\tfrac12 + \\cos^2\\gamma = 1$, so $\\cos\\gamma = \\tfrac12$ (acute).\n$\\mathbf{v} = 4(\\cos\\alpha, \\cos\\beta, \\cos\\gamma) = 4\\left(\\tfrac12, \\tfrac{\\sqrt2}{2}, \\tfrac12\\right) = (2, 2\\sqrt2, 2)$.\n(a) swaps the $x$ and $y$ angles, (b) takes the obtuse $\\gamma$, (c) is the unit vector scaled by 2 instead of 4.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ with $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 7$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 5$. If $\\theta$ is the angle between $\\mathbf{u}$ and $\\mathbf{v}$, then $\\cos\\theta =$",
    options: ["$\\tfrac{2}{\\sqrt7}$", "$\\tfrac17$", "$\\tfrac{1}{\\sqrt7}$", "$\\tfrac{3}{\\sqrt7}$", NOTA],
    answer: 2,
    solution:
      "Polarization: $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14(49 - 25) = 6$.\nParallelogram law: $49 + 25 = 2(9) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = 28$ and $\\|\\mathbf{v}\\| = 2\\sqrt7$.\n$\\cos\\theta = \\dfrac{6}{3\\cdot2\\sqrt7} = \\dfrac{1}{\\sqrt7}$.\n$\\tfrac{2}{\\sqrt7}$ comes from using $\\tfrac12$ instead of $\\tfrac14$ in the polarization identity.",
  },
  {
    subtopic: "Cross product",
    kind: "tfn",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$ be nonzero with $\\mathbf{u}\\times\\mathbf{v} = \\mathbf{0}$ and $\\mathbf{u}\\cdot\\mathbf{v} < 0$. Then $\\mathbf{u} = c\\mathbf{v}$ for some scalar $c < 0$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\mathbf{u}\\times\\mathbf{v} = \\mathbf{0}$ with both nonzero means they are parallel: $\\mathbf{u} = c\\mathbf{v}$ with $c \\ne 0$.\nThen $\\mathbf{u}\\cdot\\mathbf{v} = c\\|\\mathbf{v}\\|^2 < 0$ forces $c < 0$. **True** (the angle is $180^\\circ$).",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ with $\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 5$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 7$. Then $\\mathbf{v} = -\\tfrac52\\mathbf{u}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 4 - 2\\,\\mathbf{u}\\cdot\\mathbf{v} + 25 = 49$ gives $\\mathbf{u}\\cdot\\mathbf{v} = -10 = -\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$.\nThis is equality in Cauchy–Schwarz with a negative sign, so $\\mathbf{v}$ is a negative multiple of $\\mathbf{u}$: $\\mathbf{v} = c\\mathbf{u}$ with $c\\cdot4 = -10$, $c = -\\tfrac52$. (Equivalently, equality in the triangle inequality $\\|\\mathbf{u}+(-\\mathbf{v})\\| = \\|\\mathbf{u}\\|+\\|-\\mathbf{v}\\|$.) **True**.",
  },
  {
    subtopic: "Lines & planes",
    kind: "tfn",
    prompt:
      "The lines $L_1: \\mathbf{x} = [1,0,2]^T + t[2,1,-1]^T$ and $L_2: \\mathbf{x} = [3,1,0]^T + s[1,-1,2]^T$ intersect.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Solve $1 + 2t = 3 + s$, $t = 1 - s$, $2 - t = 2s$.\nThe first two give $1 + 2 - 2s = 3 + s$, so $s = 0$ and $t = 1$. The third equation then reads $2 - 1 = 0$, which is false.\nThe directions $(2,1,-1)$ and $(1,-1,2)$ are not parallel either, so the lines are **skew**. **False**.",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$. Which of the following statements are correct?\nI. $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$\nII. $\\mathbf{u}\\cdot\\mathbf{v} = \\tfrac14\\|\\mathbf{u}+\\mathbf{v}\\|^2 - \\tfrac14\\|\\mathbf{u}-\\mathbf{v}\\|^2$\nIII. If $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}-\\mathbf{v}\\|$, then $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal.\nIV. If $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$, then $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal.",
    options: ["I and II only", "I, II and III only", "II and III only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "Expand $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.\nI. Add the two expansions: True (parallelogram law).\nII. Subtract them and divide by 4: True (polarization).\nIII. By II, equal norms give $\\mathbf{u}\\cdot\\mathbf{v} = 0$: True.\nIV. False: equality in the triangle inequality means $\\mathbf{u}, \\mathbf{v}$ point the **same** way (e.g. $\\mathbf{v} = 2\\mathbf{u}$), the opposite of orthogonal. For orthogonal vectors, $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2+\\|\\mathbf{v}\\|^2$ instead.\nSo **I, II and III only**.",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt:
      "The plane that contains the line $\\mathbf{x} = [1,2,0]^T + t[1,-1,2]^T$ and the point $(2,0,3)$ has equation",
    options: ["$x - y - z = -1$", "$3x - y - 2z = 1$", "$x + y + z = 3$", "$x - y - z = 1$", NOTA],
    answer: 0,
    solution:
      "Two directions in the plane: $\\mathbf{d} = (1,-1,2)$ and the vector from $(1,2,0)$ to $(2,0,3)$, $(1,-2,3)$.\n$\\mathbf{n} = (1,-1,2)\\times(1,-2,3) = ((-1)\\cdot3-2\\cdot(-2),\\ 2\\cdot1-1\\cdot3,\\ 1\\cdot(-2)-(-1)\\cdot1) = (1,-1,-1)$.\n$d = \\mathbf{n}\\cdot(1,2,0) = -1$, so $x - y - z = -1$. Check $(2,0,3)$: $2 - 0 - 3 = -1$ ✓, and $\\mathbf{n}\\cdot\\mathbf{d} = 1 + 1 - 2 = 0$ ✓.\n(b) crosses $\\mathbf{d}$ with the **position vector** $(2,0,3)$ instead of a displacement. (c) passes through $(1,2,0)$ but its normal is not orthogonal to $\\mathbf{d}$, so it does not contain the line.",
  },
];
