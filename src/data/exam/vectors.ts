import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

const NOTA = "None of the above";

/** Questions in the style and difficulty of the SC1004 final (20 five-option MCQs). */
export const vectorsExam: ConceptQuestion[] = [
  {
    subtopic: "Unit vectors & angles",
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
      "Write $\\mathbf{x} = (a,b,c)$ with $a^2+b^2+c^2 = 1$.\nAngle with the $x$-axis: $\\mathbf{x}\\cdot\\mathbf{i} = \\|\\mathbf{x}\\|\\|\\mathbf{i}\\|\\cos\\tfrac{\\pi}{4}$, so $a = \\tfrac{1}{\\sqrt2}$ and $b^2+c^2 = \\tfrac12$.\n$\\|\\mathbf{x}-\\mathbf{j}-\\mathbf{k}\\|^2 = a^2 + (b-1)^2 + (c-1)^2 = 1 - 2(b+c) + 2 = 1$, so $b + c = 1$.\nThen $2bc = (b+c)^2 - (b^2+c^2) = \\tfrac12$, so $b, c$ are the roots of $t^2 - t + \\tfrac14 = 0$: $b = c = \\tfrac12$.\nCheck (a): $\\|\\mathbf{x}-\\mathbf{j}-\\mathbf{k}\\|^2 = \\tfrac12 + \\tfrac94 + \\tfrac94 = 5$. (c) has first component $\\tfrac12$ (angle $\\pi/3$) and (d) has $-\\tfrac{1}{\\sqrt2}$ (angle $3\\pi/4$).",
    ref: "PYP AY25/26 S1 Q1; Slides 0A (vec p19–p22)",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt:
      "The plane $\\Pi$ is given by $\\mathbf{r} = [1,0,2]^T + \\lambda[1,1,-2]^T + \\mu[-1,3,-1]^T$, $\\lambda, \\mu\\in\\mathbb{R}$. Which of the following points lies on $\\Pi$?",
    options: ["$(4,1,-1)$", "$(2,4,1)$", "$(4,-1,-1)$", "$(4,-1,1)$", NOTA],
    answer: 2,
    solution:
      "A point $(x,y,z)$ is on $\\Pi$ iff $x = 1+\\lambda-\\mu$, $y = \\lambda+3\\mu$, $z = 2-2\\lambda-\\mu$ has a solution $\\lambda, \\mu$. Solve the first two, then check the third.\n$(4,-1,-1)$: $\\lambda-\\mu = 3$, $\\lambda+3\\mu = -1$ give $\\mu = -1$, $\\lambda = 2$; then $z = 2-4+1 = -1$ ✓.\n$(4,1,-1)$: $\\mu = -\\tfrac12$, $\\lambda = \\tfrac52$, so $z = 2-5+\\tfrac12 = -\\tfrac52 \\ne -1$.\n$(2,4,1)$: $\\mu = \\tfrac34$, $\\lambda = \\tfrac74$, so $z = -\\tfrac94 \\ne 1$.\n$(4,-1,1)$: $\\lambda = 2$, $\\mu = -1$ again, but $z = -1 \\ne 1$ (a sign slip in the last component).",
    ref: "Slides 0A Vector equations of planes (vec p29); PYP AY24/25 S2 Q2",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt:
      "Consider the plane passing through the point $(2,5,-1)$ with normal vector $\\mathbf{n} = [3,\\ -1,\\ 2]^T$. Which of the following points lies on the plane?",
    options: ["$(1,2,-1)$", "$(0,1,1)$", "$(2,0,-3)$", "$(-1,2,1)$", NOTA],
    answer: 0,
    solution:
      "Point-normal: $3(x-2) - (y-5) + 2(z+1) = 0$, i.e. $3x - y + 2z = 6 - 5 - 2 = -1$.\n$(1,2,-1)$: $3 - 2 - 2 = -1$ ✓.\n$(0,1,1)$: $0 - 1 + 2 = 1$ (this is the point you accept if you get the sign of the right-hand side wrong). $(2,0,-3)$: $6 - 6 = 0$. $(-1,2,1)$: $-3 - 2 + 2 = -3$.",
    ref: "PYP AY24/25 S2 Q1; Slides 0A (vec p27)",
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
    ref: "PYP AY24/25 S2 Q2",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ with $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 4$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 6$. Then $(\\|\\mathbf{v}\\|,\\ \\mathbf{u}\\cdot\\mathbf{v}) =$",
    options: ["$(\\sqrt{17},\\ 5)$", "$(\\sqrt{17},\\ -5)$", "$(\\sqrt{34},\\ -5)$", "$(\\sqrt{17},\\ -20)$", NOTA],
    answer: 1,
    solution:
      "Expand: $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.\nAdding (parallelogram law): $16 + 36 = 2(9) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = 17$.\nSubtracting: $16 - 36 = 4\\,\\mathbf{u}\\cdot\\mathbf{v}$, so $\\mathbf{u}\\cdot\\mathbf{v} = -5$.\nTraps: $\\sqrt{34}$ forgets the factor 2 on $\\|\\mathbf{v}\\|^2$; $-20$ forgets to divide by 4; $+5$ subtracts in the wrong order.",
    ref: "PYP AY24/25 S2 Q13; PYP AY23/24 S1 Q3(b); Slides 0A (vec p22)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\in\\mathbb{R}^n$ and let $k$ be a scalar. Which of the following statements are correct?\nI. $\\|k\\mathbf{u}\\| = |k|\\,\\|\\mathbf{u}\\|$\nII. $\\mathbf{u}\\cdot(\\mathbf{v}-\\mathbf{w}) = \\mathbf{u}\\cdot\\mathbf{v}-\\mathbf{u}\\cdot\\mathbf{w}$\nIII. $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$\nIV. If $\\mathbf{u}\\ne\\mathbf{0}$ and $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}$, then $\\mathbf{v} = \\mathbf{w}$",
    options: ["I and II only", "I, II and III only", "II and III only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "I. True: theorem on the norm (slides).\nII. True: an additional property of the dot product (slides).\nIII. True: Cauchy–Schwarz inequality.\nIV. False: $\\mathbf{u} = \\mathbf{i}$, $\\mathbf{v} = \\mathbf{j}$, $\\mathbf{w} = \\mathbf{k}$ give $0 = 0$ but $\\mathbf{v}\\ne\\mathbf{w}$.\nSo **I, II and III only**.",
    ref: "Slides 0A (vec p18, p22–p24)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{x} = [1,0,2]^T$, $\\mathbf{y} = [1,-1,0]^T$ and $\\mathbf{z} = [0,2,1]^T$. What is the maximum value of $|\\mathbf{v}^T(2\\mathbf{x}-\\mathbf{y}+\\mathbf{z})|$ over all $\\mathbf{v}\\in\\mathbb{R}^3$ with $\\|\\mathbf{v}\\|\\le 3$?",
    options: ["$35$", "$105$", "$\\sqrt{35}$", "$3\\sqrt{35}$", NOTA],
    answer: 3,
    solution:
      "$\\mathbf{w} = 2\\mathbf{x}-\\mathbf{y}+\\mathbf{z} = (2-1+0,\\ 0+1+2,\\ 4-0+1) = (1,3,5)$, so $\\|\\mathbf{w}\\| = \\sqrt{35}$.\nCauchy–Schwarz: $|\\mathbf{v}^T\\mathbf{w}| = |\\mathbf{v}\\cdot\\mathbf{w}| \\le \\|\\mathbf{v}\\|\\|\\mathbf{w}\\| \\le 3\\sqrt{35}$, and $\\mathbf{v} = \\tfrac{3}{\\sqrt{35}}\\mathbf{w}$ (norm 3) gives $\\mathbf{v}\\cdot\\mathbf{w} = \\tfrac{3}{\\sqrt{35}}\\cdot35 = 3\\sqrt{35}$, so the bound is reached.\n$\\sqrt{35}$ ignores the radius 3; $105 = 3\\|\\mathbf{w}\\|^2$ uses the squared norm.",
    ref: "PYP AY25/26 S2 Q13; Slides 0A Cauchy–Schwarz inequality (vec p24)",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt: "The line through $A(2,-1,3)$ and $B(4,3,-1)$ intersects the $x$–$z$ plane at the point",
    options: ["$\\left(\\tfrac72,\\ 2,\\ 0\\right)$", "$(0,\\ -5,\\ 7)$", "$\\left(\\tfrac32,\\ 0,\\ 4\\right)$", "$\\left(\\tfrac52,\\ 0,\\ -2\\right)$", NOTA],
    answer: 4,
    solution:
      "$\\overrightarrow{AB} = (2,4,-4)$, so the line is $(2+2t,\\ -1+4t,\\ 3-4t)$.\nThe $x$–$z$ plane is $y = 0$: $-1 + 4t = 0$ gives $t = \\tfrac14$, so the point is $\\left(\\tfrac52,\\ 0,\\ 2\\right)$, which is not listed: **None of the above**.\n$(\\tfrac72, 2, 0)$ is where it meets the $x$–$y$ plane ($z = 0$), $(0,-5,7)$ the $y$–$z$ plane ($x = 0$), $(\\tfrac32, 0, 4)$ uses $t = -\\tfrac14$, and $(\\tfrac52, 0, -2)$ has a sign slip in $z$.",
    ref: "Tutorial 0A Q10",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "mcq",
    prompt:
      "Let $\\Pi$ be the plane through $(1,2,-1)$ with normal vector $[2,-1,3]^T$. A line in 3D can be uniquely defined by a point and two vectors orthogonal to the direction of the line. $L_1$ passes through $(0,0,-1)$ with normal vectors $[0,0,1]^T$ and $[2,-1,0]^T$. $L_2$ passes through $(1,1,0)$ with normal vectors $[0,1,0]^T$ and $[2,0,3]^T$. Which line(s) lie on $\\Pi$ (i.e. every point on the line is also on the plane)?",
    options: ["Neither", "$L_1$ only", "$L_2$ only", "Both $L_1$ and $L_2$", "Cannot be determined"],
    answer: 1,
    solution:
      "$\\Pi$: $2(x-1) - (y-2) + 3(z+1) = 0$, i.e. $2x - y + 3z = -3$.\n$L_1$: its direction $\\mathbf{v}$ satisfies $\\mathbf{v}\\cdot(0,0,1) = 0$ and $\\mathbf{v}\\cdot(2,-1,0) = 0$, i.e. $v_3 = 0$ and $v_2 = 2v_1$, so $\\mathbf{v} = (1,2,0)$. Substituting $(t,\\ 2t,\\ -1)$: $2t - 2t - 3 = -3$ for every $t$ ✓, so $L_1$ lies on $\\Pi$.\n$L_2$: $v_2 = 0$ and $2v_1 + 3v_3 = 0$, so $\\mathbf{v} = (3,0,-2)$. Substituting $(1+3t,\\ 1,\\ -2t)$: $2 + 6t - 1 - 6t = 1 \\ne -3$ for every $t$, so $L_2$ never meets $\\Pi$.\nAnswer: **$L_1$ only**. (Checking only the directions would wrongly give \"both\".)",
    ref: "PYP AY24/25 S2 Q11",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "The equation of the plane passing through $(2,-1,3)$ with normal vector $[1,-3,2]^T$ is",
    options: ["$x - 3y + 2z = -11$", "$2x - y + 3z = 11$", "$x - 3y + 2z = 5$", "$x - 3y + 2z = 11$", NOTA],
    answer: 3,
    solution:
      "Point-normal: $(x-2) - 3(y+1) + 2(z-3) = 0$, so $x - 3y + 2z = 2 + 3 + 6 = 11$.\nCheck: $2 + 3 + 6 = 11$ ✓.\n$-11$ is the sign slip on the right-hand side; $2x - y + 3z = 11$ swaps the point and the normal; $5$ comes from $2 - 3 + 6$ (dropping the sign of $y_0 = -1$).",
    ref: "PYP AY25/26 S2 Q1; Tutorial 0A Q8",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{a} = \\begin{bmatrix}1\\\\0\\end{bmatrix}$ and $\\mathbf{b} = \\begin{bmatrix}-\\tfrac12\\\\ \\tfrac{\\sqrt3}{2}\\end{bmatrix}$. The angle $\\theta$ between $\\mathbf{a}$ and $\\mathbf{b}$ and the length of $\\mathbf{b}$ are",
    options: [
      "$\\theta = \\tfrac{\\pi}{3},\\ \\|\\mathbf{b}\\| = 1$",
      "$\\theta = \\tfrac{2\\pi}{3},\\ \\|\\mathbf{b}\\| = 1$",
      "$\\theta = \\tfrac{2\\pi}{3},\\ \\|\\mathbf{b}\\| = 2$",
      "$\\theta = \\tfrac{5\\pi}{6},\\ \\|\\mathbf{b}\\| = 1$",
      NOTA,
    ],
    answer: 1,
    solution:
      "$\\|\\mathbf{b}\\| = \\sqrt{\\tfrac14 + \\tfrac34} = 1$ and $\\|\\mathbf{a}\\| = 1$.\n$\\mathbf{a}\\cdot\\mathbf{b} = -\\tfrac12$, so $\\cos\\theta = \\dfrac{-1/2}{1\\cdot1} = -\\tfrac12$ and $\\theta = \\tfrac{2\\pi}{3}$ (obtuse, since $\\mathbf{a}\\cdot\\mathbf{b} < 0$).\n$\\tfrac{\\pi}{3}$ drops the minus sign; $\\tfrac{5\\pi}{6}$ reads $\\cos\\theta$ as $-\\tfrac{\\sqrt3}{2}$.",
    ref: "PYP AY23/24 S1 Q3(a); Slides 0A (vec p17, p20)",
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
    ref: "Tutorial 0A Q6; Slides 0A Orthogonality (vec p26)",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "A constant force of magnitude $14$ acts in the direction of $[2,3,6]^T$ and moves a particle from $P(1,-1,2)$ to $Q(3,0,1)$. The work done (Work $= \\mathbf{F}\\cdot\\mathbf{r}$, $\\mathbf{r}$ the displacement) is",
    options: ["$2$", "$1$", "$14$", "$-2$", NOTA],
    answer: 0,
    solution:
      "$\\|[2,3,6]^T\\| = 7$, so $\\mathbf{F} = 14\\cdot\\tfrac17(2,3,6) = (4,6,12)$.\n$\\mathbf{r} = \\overrightarrow{PQ} = (2,1,-1)$.\nWork $= 8 + 6 - 12 = 2$.\n$1$ uses $(2,3,6)$ unscaled; $14$ multiplies $(2,3,6)$ by 14 without normalizing; $-2$ uses $P - Q$.",
    ref: "Tutorial 0A Q7; Slides 0A Unit vector (vec p18)",
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
      "The first two components do not involve $h$: $2a + b = 4$ and $a - 2b = 7$. Then $5a = 15$, so $a = 3$ and $b = -2$.\nThe third component then forces $h = -3a + 4b = -9 - 8 = -17$.\nFor any other $h$ the equations are inconsistent, so (e) is false. $h = 17$ is the sign slip $3a - 4b$.",
    ref: "Tutorial 0A Q1; Slides 0A Linear combination (vec p16)",
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
    ref: "Tutorial 0A Q2; Slides 0A (vec p8, p12, p18)",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt: "Which of the following statements is **false**?",
    options: [
      "The point $(1,2,3)$ lies on the plane $x + y - z = 0$.",
      "The line $\\mathbf{x} = (1,2,3) + t(1,-1,0)$ does not meet the plane $x + y + 5z = 0$.",
      "The distance between $(1,2,3)$ and $(3,0,4)$ is $9$.",
      "The vectors $(1,2,-1)$ and $(3,-1,1)$ are orthogonal.",
      "The unit vector in the same direction as $(2,-1,2)$ is $\\left(\\tfrac23,-\\tfrac13,\\tfrac23\\right)$.",
    ],
    answer: 2,
    solution:
      "(a) True: $1 + 2 - 3 = 0$.\n(b) True: substituting $(1+t,\\ 2-t,\\ 3)$ gives $1 + t + 2 - t + 15 = 18 \\ne 0$ for every $t$.\n(c) **False**: $\\sqrt{2^2 + 2^2 + 1^2} = \\sqrt9 = 3$, not $9$ (the square root was forgotten).\n(d) True: $3 - 2 - 1 = 0$.\n(e) True: $\\|(2,-1,2)\\| = 3$.",
    ref: "Slides 0A (vec p18–p19, p26–p28); Tutorial 0A Q4, Q5, Q10",
  },
  {
    subtopic: "Dot product & angle",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u} = [k,2,1]^T$ and $\\mathbf{v} = [k,-3,-4]^T$. For how many integers $k$ is the angle between $\\mathbf{u}$ and $\\mathbf{v}$ obtuse?",
    options: ["$3$", "$6$", "$7$", "$9$", NOTA],
    answer: 2,
    solution:
      "$\\theta$ is obtuse if $\\mathbf{u}\\cdot\\mathbf{v} < 0$. $\\mathbf{u}\\cdot\\mathbf{v} = k^2 - 6 - 4 = k^2 - 10$.\n$k^2 < 10 \\iff k\\in\\{-3,-2,-1,0,1,2,3\\}$: **7** integers.\n$3$ counts only positive $k$, $6$ forgets $k = 0$.",
    ref: "Slides 0A Dot product (vec p20–p21)",
  },
  {
    subtopic: "Unit vectors & angles",
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
      "Dot with the standard unit vectors: $v_1 = \\mathbf{v}\\cdot\\mathbf{i} = \\|\\mathbf{v}\\|\\|\\mathbf{i}\\|\\cos60^\\circ = 4\\cdot\\tfrac12 = 2$ and $v_2 = \\mathbf{v}\\cdot\\mathbf{j} = 4\\cos45^\\circ = 2\\sqrt2$.\n$\\|\\mathbf{v}\\|^2 = 16$ gives $v_3^2 = 16 - 4 - 8 = 4$, so $v_3 = \\pm2$. The angle with the $z$-axis is acute, so $\\mathbf{v}\\cdot\\mathbf{k} = v_3 > 0$: $v_3 = 2$.\n(a) swaps the $x$ and $y$ angles, (b) takes the obtuse angle with the $z$-axis, (c) has length 2 instead of 4.",
    ref: "PYP AY25/26 S1 Q1; Slides 0A (vec p17, p19–p20)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$ with $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{u}+\\mathbf{v}\\| = 7$ and $\\|\\mathbf{u}-\\mathbf{v}\\| = 5$. If $\\theta$ is the angle between $\\mathbf{u}$ and $\\mathbf{v}$, then $\\cos\\theta =$",
    options: ["$\\tfrac{2}{\\sqrt7}$", "$\\tfrac17$", "$\\tfrac{1}{\\sqrt7}$", "$\\tfrac{3}{\\sqrt7}$", NOTA],
    answer: 2,
    solution:
      "Expand $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.\nSubtracting: $49 - 25 = 4\\,\\mathbf{u}\\cdot\\mathbf{v}$, so $\\mathbf{u}\\cdot\\mathbf{v} = 6$.\nAdding (parallelogram law): $49 + 25 = 2(9) + 2\\|\\mathbf{v}\\|^2$, so $\\|\\mathbf{v}\\|^2 = 28$ and $\\|\\mathbf{v}\\| = 2\\sqrt7$.\n$\\cos\\theta = \\dfrac{6}{3\\cdot2\\sqrt7} = \\dfrac{1}{\\sqrt7}$.\n$\\tfrac{2}{\\sqrt7}$ comes from dividing by 2 instead of 4 when subtracting.",
    ref: "PYP AY24/25 S2 Q13; PYP AY23/24 S1 Q3(b); Slides 0A (vec p20, p22)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt:
      "Let $\\mathbf{a}, \\mathbf{b}\\in\\mathbb{R}^n$ with $\\|\\mathbf{a}\\| = \\|\\mathbf{b}\\| = 2$ and $\\|\\mathbf{a}-\\mathbf{b}\\| = 2$. Then the angle between $\\mathbf{a}$ and $\\mathbf{b}$ is $\\pi/3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\|\\mathbf{a}-\\mathbf{b}\\|^2 = \\|\\mathbf{a}\\|^2 - 2\\,\\mathbf{a}\\cdot\\mathbf{b} + \\|\\mathbf{b}\\|^2$: $4 = 4 - 2\\,\\mathbf{a}\\cdot\\mathbf{b} + 4$, so $\\mathbf{a}\\cdot\\mathbf{b} = 2$.\n$\\cos\\theta = \\dfrac{2}{2\\cdot2} = \\dfrac12$, so $\\theta = \\pi/3$. **True**.",
    ref: "PYP AY23/24 S1 Q3(b); Slides 0A (vec p20, p22)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "tfn",
    prompt:
      "There exist vectors $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^3$ with $\\|\\mathbf{u}\\| = 2$, $\\|\\mathbf{v}\\| = 5$ and $\\mathbf{u}\\cdot\\mathbf{v} = 11$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Cauchy–Schwarz: $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\| = 10$. Since $11 > 10$, no such vectors exist (equivalently, $\\cos\\theta = \\tfrac{11}{10} > 1$ is impossible). **False**.",
    ref: "Slides 0A Angles in R^n, Cauchy–Schwarz inequality (vec p24)",
  },
  {
    subtopic: "Line–plane intersection",
    kind: "tfn",
    prompt:
      "The line $\\mathbf{x} = [2,0,1]^T + t[1,1,-1]^T$ lies on the plane $2x - y + z = 5$ (every point on the line is also on the plane).",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Substitute $x = 2+t$, $y = t$, $z = 1-t$: $2(2+t) - t + (1-t) = 5 + 0t = 5$.\nThe equation holds for every $t$, so every point of the line is on the plane. (Equivalently, $(2,-1,1)\\cdot(1,1,-1) = 0$ and the point $(2,0,1)$ satisfies the equation.) **True**.",
    ref: "PYP AY24/25 S2 Q11; Slides 0A (vec p27–p28)",
  },
  {
    subtopic: "Norm identities & inequalities",
    kind: "mcq",
    prompt:
      "Let $\\mathbf{u}, \\mathbf{v}\\in\\mathbb{R}^n$. Which of the following statements are correct?\nI. $\\|\\mathbf{u}+\\mathbf{v}\\|^2+\\|\\mathbf{u}-\\mathbf{v}\\|^2 = 2\\|\\mathbf{u}\\|^2+2\\|\\mathbf{v}\\|^2$\nII. $\\|\\mathbf{u}+\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$\nIII. If $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}-\\mathbf{v}\\|$, then $\\mathbf{u}\\cdot\\mathbf{v} = 0$.\nIV. If $\\|\\mathbf{u}+\\mathbf{v}\\| = \\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$, then $\\mathbf{u}\\cdot\\mathbf{v} = 0$.",
    options: ["I and II only", "I, II and III only", "II and III only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "Expand $\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = (\\mathbf{u}\\pm\\mathbf{v})\\cdot(\\mathbf{u}\\pm\\mathbf{v}) = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$.\nII. This is the expansion: True.\nI. Add the two expansions: True (parallelogram law).\nIII. Equal norms give $2\\,\\mathbf{u}\\cdot\\mathbf{v} = -2\\,\\mathbf{u}\\cdot\\mathbf{v}$, so $\\mathbf{u}\\cdot\\mathbf{v} = 0$: True.\nIV. False: take $\\mathbf{u}\\ne\\mathbf{0}$ and $\\mathbf{v} = 2\\mathbf{u}$. Then $\\|3\\mathbf{u}\\| = 3\\|\\mathbf{u}\\| = \\|\\mathbf{u}\\|+\\|2\\mathbf{u}\\|$, but $\\mathbf{u}\\cdot\\mathbf{v} = 2\\|\\mathbf{u}\\|^2 \\ne 0$.\nSo **I, II and III only**.",
    ref: "Slides 0A (vec p18, p22, p25); PYP AY24/25 S2 Q13",
  },
  {
    subtopic: "Lines & planes",
    kind: "mcq",
    prompt:
      "A vector equation of the plane that contains the line $\\mathbf{x} = [1,2,0]^T + t[1,-1,2]^T$ and the point $(2,0,3)$ is",
    options: [
      "$\\mathbf{x} = [1,2,0]^T + t_1[1,-1,2]^T + t_2[2,0,3]^T$",
      "$\\mathbf{x} = t_1[1,-1,2]^T + t_2[1,-2,3]^T$",
      "$\\mathbf{x} = [1,2,0]^T + t_1[1,-1,2]^T + t_2[1,-2,3]^T$",
      "$\\mathbf{x} = [1,2,0]^T + t_1[1,-1,2]^T + t_2[-2,2,-4]^T$",
      NOTA,
    ],
    answer: 2,
    solution:
      "The plane contains the point $\\mathbf{x}_0 = (1,2,0)$ and is parallel to the line's direction $\\mathbf{v}_1 = (1,-1,2)$ and to the vector from $(1,2,0)$ to $(2,0,3)$, $\\mathbf{v}_2 = (1,-2,3)$. These are not scalar multiples of each other (noncollinear), so $\\mathbf{x} = \\mathbf{x}_0 + t_1\\mathbf{v}_1 + t_2\\mathbf{v}_2$.\nCheck: $t_2 = 0$ gives the line, and $t_1 = 0,\\ t_2 = 1$ gives $(2,0,3)$ ✓.\n(a) uses the **position vector** $(2,0,3)$ instead of a displacement; (b) drops $\\mathbf{x}_0$, so it describes a plane through the origin, which does not contain $(1,2,0)$; (d) uses two collinear vectors, so it is only the original line.",
    ref: "Slides 0A Vector equations of planes (vec p29); Tutorial 0A Q9",
  },
];
