import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

// Hand-written conceptual questions for Chapter 8A: complex numbers.
// All numerical answers were checked numerically (Python/numpy).

export const complexConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- MCQ ----
  {
    subtopic: "Polar form",
    kind: "mcq",
    prompt:
      "Express $z = -1 - \\sqrt{3}\\,j$ in complex exponential form using the **principal** argument $\\theta \\in (-\\pi, \\pi]$.",
    options: [
      "$2e^{j\\pi/3}$",
      "$2e^{-j\\pi/3}$",
      "$2e^{j2\\pi/3}$",
      "$2e^{-j2\\pi/3}$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$|z| = \\sqrt{1 + 3} = 2$. The point $(-1, -\\sqrt{3})$ is in the **third quadrant**, so the angle must lie between $-\\pi$ and $-\\pi/2$.\nNaively $\\arctan(\\frac{-\\sqrt3}{-1}) = \\arctan(\\sqrt3) = \\pi/3$, which is the first-quadrant angle; the correct value is $\\text{atan2}(-\\sqrt3, -1) = \\pi/3 - \\pi = -2\\pi/3$.\nSo $z = 2e^{-j2\\pi/3}$.",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "mcq",
    prompt:
      "Which of the following is one of the values of $z = \\left(2e^{j\\pi/3}(1+j)\\right)^{1/2}$, to 2 d.p.?",
    options: [
      "$1.33 + 1.02j$",
      "$1.02 + 1.33j$",
      "$1.68 + 0j$",
      "$-0.73 + 2.73j$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "Write $1 + j = \\sqrt2 e^{j\\pi/4}$, so the base is $2\\sqrt2\\, e^{j(\\pi/3 + \\pi/4)} = 2\\sqrt2\\, e^{j7\\pi/12}$.\nSquare roots: modulus $(2\\sqrt2)^{1/2} = 2^{3/4} \\approx 1.682$, angle $\\frac{7\\pi/12 + 2\\pi k}{2}$, i.e. $7\\pi/24$ (k = 0) or $7\\pi/24 + \\pi$ (k = 1).\n$1.682(\\cos 52.5^\\circ + j\\sin 52.5^\\circ) \\approx 1.02 + 1.33j$; the other root is $-1.02 - 1.33j$. Option $-0.73 + 2.73j$ is the base itself, not its root.",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "mcq",
    prompt: "Evaluate $(-1 + j)^6$.",
    options: ["$8j$", "$-8j$", "$8$", "$-8$", "None of the above"],
    answer: 0,
    solution:
      "$-1 + j$ is in the second quadrant: $r = \\sqrt2$, $\\theta = 3\\pi/4$.\nBy De Moivre, $(\\sqrt2)^6 e^{j\\,6 \\cdot 3\\pi/4} = 8e^{j9\\pi/2} = 8e^{j\\pi/2}$ (subtract $4\\pi$).\nSo the result is $8j$. Using $\\theta = \\pi/4$ (the angle of $1 + j$, a quadrant error) would give $8e^{j3\\pi/2} = -8j$, the trap option.",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "mcq",
    prompt: "Which of the following is **NOT** a cube root of $8j$?",
    options: [
      "$\\sqrt3 + j$",
      "$-\\sqrt3 + j$",
      "$2j$",
      "$-2j$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$8j = 8e^{j\\pi/2}$, so the cube roots are $2e^{j(\\pi/6 + 2\\pi k/3)}$, $k = 0, 1, 2$: angles $\\pi/6$, $5\\pi/6$, $3\\pi/2 \\,(=-\\pi/2)$.\nThese are $\\sqrt3 + j$, $-\\sqrt3 + j$ and $-2j$, equally spaced by $2\\pi/3$.\n$2j$ has angle $\\pi/2$ and $(2j)^3 = 8j^3 = -8j \\ne 8j$, so it is not a root.",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "mcq",
    prompt: "Simplify $\\dfrac{3 + 4j}{1 - 2j}$.",
    options: ["$-1 + 2j$", "$1 - 2j$", "$-1 - 2j$", "$\\frac{11}{5} - \\frac{2}{5}j$", "None of the above"],
    answer: 0,
    solution:
      "Multiply numerator and denominator by the conjugate of the denominator, $1 + 2j$, so the denominator becomes $|1 - 2j|^2 = 5$ (real).\nNumerator: $(3 + 4j)(1 + 2j) = 3 + 6j + 4j + 8j^2 = -5 + 10j$.\nSo the quotient is $\\frac{-5 + 10j}{5} = -1 + 2j$. Check: $(-1 + 2j)(1 - 2j) = -1 + 2j + 2j - 4j^2 = 3 + 4j$.",
  },
  {
    subtopic: "Quadratic roots",
    kind: "mcq",
    prompt: "Find the roots of $x^2 + 4x + 13 = 0$.",
    options: ["$2 \\pm 3j$", "$-2 \\pm 3j$", "$-4 \\pm 6j$", "$-2 \\pm \\sqrt{3}\\,j$", "None of the above"],
    answer: 1,
    solution:
      "Discriminant $b^2 - 4ac = 16 - 52 = -36 < 0$, so there is a complex-conjugate pair.\n$x = \\frac{-4 \\pm \\sqrt{-36}}{2} = \\frac{-4 \\pm 6j}{2} = -2 \\pm 3j$.\nForgetting to divide by $2a$ gives the distractor $-4 \\pm 6j$; using $\\sqrt{36}$ incorrectly as $\\sqrt3$ gives $-2 \\pm \\sqrt3 j$.",
  },
  {
    subtopic: "Polar form",
    kind: "mcq",
    prompt:
      "Evaluate $z = (2 - j)^2 + \\dfrac{7 - 4j}{2 + j} - \\dfrac{1}{1 + j}$ and give it in complex exponential form (2 d.p., principal argument in radians).",
    options: [
      "$7.91e^{j0.97}$",
      "$7.91e^{-j0.97}$",
      "$7.91e^{-j0.61}$",
      "$62.5e^{-j0.97}$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "$(2 - j)^2 = 4 - 4j + j^2 = 3 - 4j$. $\\frac{7 - 4j}{2 + j} = \\frac{(7 - 4j)(2 - j)}{5} = \\frac{10 - 15j}{5} = 2 - 3j$. $\\frac{1}{1 + j} = \\frac{1 - j}{2} = 0.5 - 0.5j$.\nSo $z = 3 - 4j + 2 - 3j - 0.5 + 0.5j = 4.5 - 6.5j$ (fourth quadrant).\n$|z| = \\sqrt{4.5^2 + 6.5^2} = \\sqrt{62.5} \\approx 7.91$ and $\\theta = \\text{atan2}(-6.5, 4.5) \\approx -0.97$ rad, giving $7.91e^{-j0.97}$. (62.5 is $|z|^2$, not $|z|$.)",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "mcq",
    prompt: "Given $z = \\overline{(1 + 2j)}$, evaluate $z^4$.",
    options: ["$7 - 24j$", "$-7 - 24j$", "$25$", "$7 + 24j$", "None of the above"],
    answer: 4,
    solution:
      "$z = 1 - 2j$. Square twice: $z^2 = 1 - 4j + 4j^2 = -3 - 4j$, then $z^4 = (-3 - 4j)^2 = 9 + 24j + 16j^2 = -7 + 24j$.\n$-7 + 24j$ is not listed, so the answer is **None of the above**.\nSanity check: $|z^4| = |z|^4 = (\\sqrt5)^4 = 25 = |-7 + 24j|$. Note $-7 - 24j$ would be $(1 + 2j)^4$, i.e. forgetting the conjugate.",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "mcq",
    prompt: "Find $\\left|\\dfrac{3 + 4j}{1 - j}\\right|$ (2 d.p.).",
    options: ["$5.00$", "$2.50$", "$3.54$", "$7.07$", "None of the above"],
    answer: 2,
    solution:
      "Modulus of a quotient is the quotient of moduli: $|z_1/z_2| = |z_1|/|z_2|$.\n$|3 + 4j| = 5$ and $|1 - j| = \\sqrt2$, so the answer is $5/\\sqrt2 \\approx 3.54$.\nNo need to do the full division; 7.07 is $5\\sqrt2$ (multiplying instead of dividing), and 2.50 is $5/2$ (using $|z_2|^2$).",
  },
  {
    subtopic: "Polar form",
    kind: "mcq",
    prompt: "Write $z = 2e^{-j3\\pi/4}$ in rectangular form.",
    options: [
      "$-\\sqrt2 - \\sqrt2\\,j$",
      "$\\sqrt2 - \\sqrt2\\,j$",
      "$-\\sqrt2 + \\sqrt2\\,j$",
      "$\\sqrt2 + \\sqrt2\\,j$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "$z = 2(\\cos(-3\\pi/4) + j\\sin(-3\\pi/4))$. An angle of $-3\\pi/4$ is $135^\\circ$ **clockwise** from the positive real axis, which lands in the third quadrant.\n$\\cos(-3\\pi/4) = -\\frac{\\sqrt2}{2}$ and $\\sin(-3\\pi/4) = -\\frac{\\sqrt2}{2}$, so $z = -\\sqrt2 - \\sqrt2\\,j$.",
  },
  {
    subtopic: "Multiplication & division",
    kind: "mcq",
    prompt:
      "Let $z_1 = 2e^{j\\pi/3}$ and $z_2 = 3e^{j5\\pi/6}$. Give $z_1 z_2$ using the principal argument.",
    options: [
      "$5e^{j7\\pi/6}$",
      "$6e^{-j5\\pi/6}$",
      "$6e^{j\\pi/2}$",
      "$6e^{j5\\pi/6}$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "Multiplication: multiply lengths, add angles. $|z_1 z_2| = 2 \\cdot 3 = 6$ (not $2 + 3$).\nAngle: $\\pi/3 + 5\\pi/6 = 7\\pi/6$, which is outside $(-\\pi, \\pi]$; subtract $2\\pi$ to get $-5\\pi/6$.\nSo $z_1 z_2 = 6e^{-j5\\pi/6}$ (third quadrant, $\\approx -5.20 - 3j$).",
  },
  {
    subtopic: "Quadratic roots",
    kind: "mcq",
    prompt: "Given $y = -2x^2 + 3x - c$ with $c = -2$, find the roots of $y = 0$.",
    options: [
      "$x = -2,\\ x = \\tfrac12$",
      "$x = \\tfrac34 \\pm \\tfrac{\\sqrt7}{4}j$",
      "$x = 2,\\ x = -\\tfrac12$",
      "$x = 1,\\ x = -1$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "With $c = -2$: $-2x^2 + 3x + 2 = 0 \\iff 2x^2 - 3x - 2 = 0 \\iff (2x + 1)(x - 2) = 0$.\nDiscriminant $9 - 4(-2)(2) = 25 > 0$, so two distinct real roots: $x = 2$ and $x = -\\tfrac12$.\nThe complex option comes from wrongly using $c = +2$ (discriminant $9 - 16 = -7$).",
  },
  {
    subtopic: "Quadratic roots",
    kind: "mcq",
    prompt: "For $y = -2x^2 + 3x - c$ ($c$ real), which value of $c$ gives exactly one repeated real root?",
    options: ["$c = -\\tfrac98$", "$c = \\tfrac98$", "$c = \\tfrac32$", "$c = \\tfrac{9}{4}$", "None of the above"],
    answer: 1,
    solution:
      "A repeated root needs discriminant $b^2 - 4ac = 0$ with $a = -2$, $b = 3$, and constant term $-c$.\n$9 - 4(-2)(-c) = 9 - 8c = 0 \\Rightarrow c = 9/8$.\nFor $c > 9/8$ the discriminant is negative (complex pair); for $c < 9/8$ it is positive (two real roots).",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "mcq",
    prompt: "Evaluate $(1 + j)^{-4}$.",
    options: ["$-4$", "$\\tfrac14$", "$-\\tfrac14 j$", "$-\\tfrac14$", "None of the above"],
    answer: 3,
    solution:
      "$1 + j = \\sqrt2 e^{j\\pi/4}$. De Moivre holds for negative integers too: $(\\sqrt2)^{-4} e^{-j\\pi} = \\tfrac14 \\cdot (-1) = -\\tfrac14$.\nCheck: $(1 + j)^2 = 2j$, $(1 + j)^4 = (2j)^2 = -4$, and $1/(-4) = -\\tfrac14$.",
  },

  // ---------------------------------------------------------------- TFN ----
  {
    subtopic: "Definitions",
    kind: "tfn",
    prompt: "$j^{2026} = -1$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Powers of $j$ cycle with period 4: $j^0 = 1, j^1 = j, j^2 = -1, j^3 = -j$.\n$2026 = 4 \\cdot 506 + 2$, so $j^{2026} = j^2 = -1$. Geometrically, each factor $j$ rotates by $\\pi/2$, and 2026 quarter-turns leave you a half-turn from 1.",
  },
  {
    subtopic: "Polar form",
    kind: "tfn",
    prompt: "The principal argument of $z = -1 - j$ is $\\pi/4$, since $\\arctan\\left(\\frac{-1}{-1}\\right) = \\pi/4$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\arctan(y/x)$ loses the signs of $x$ and $y$: $-1 - j$ and $1 + j$ give the same ratio.\n$-1 - j$ lies in the **third** quadrant, so $\\text{Arg}(z) = \\text{atan2}(-1, -1) = -3\\pi/4$.\nAlways sketch the point on the Argand diagram before trusting a calculator's arctan.",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "tfn",
    prompt: "For every complex number $z$, the product $z\\bar z$ is a non-negative real number.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $z = a + bj$ then $z\\bar z = (a + bj)(a - bj) = a^2 - b^2j^2 = a^2 + b^2 = |z|^2 \\ge 0$.\nThis is exactly why multiplying by the conjugate makes a denominator real, and why the complex norm uses conjugates.",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "tfn",
    prompt: "For all complex numbers $z_1, z_2$: $|z_1 + z_2| = |z_1| + |z_2|$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Addition is vector addition on the Argand diagram, so only the triangle inequality $|z_1 + z_2| \\le |z_1| + |z_2|$ holds.\nEquality needs the two numbers to point in the same direction. Counterexample: $|1 + (-1)| = 0 \\ne 2$.\n(It is moduli of **products** that multiply exactly: $|z_1z_2| = |z_1||z_2|$.)",
  },
  {
    subtopic: "Multiplication & division",
    kind: "tfn",
    prompt: "Multiplying a complex number $z$ by $j$ rotates it anticlockwise by $\\pi/2$ about the origin without changing its modulus.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$j = 1e^{j\\pi/2}$. Multiplying multiplies lengths (by 1) and adds angles (adds $\\pi/2$).\nE.g. $j(3 + 4j) = -4 + 3j$, still modulus 5, rotated a quarter-turn anticlockwise.",
  },
  {
    subtopic: "Quadratic roots",
    kind: "tfn",
    prompt: "A quadratic $ax^2 + bx + c$ with **real** coefficients can have roots $2 + 3j$ and $2 - j$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "For real coefficients, non-real roots come in complex-conjugate pairs: if $2 + 3j$ is a root, $2 - 3j$ must be the other.\nEquivalently, the sum of roots $-b/a$ and product $c/a$ must be real, but $(2 + 3j) + (2 - j) = 4 + 2j$ is not real.",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "tfn",
    prompt:
      "If $w \\ne 0$, the equation $z^5 = w$ has exactly 5 distinct solutions, all with modulus $|w|^{1/5}$ and equally spaced in angle by $2\\pi/5$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Write $w = re^{j\\theta}$. Then $z = r^{1/5} e^{j(\\theta + 2\\pi k)/5}$ for $k = 0, \\dots, 4$.\nAll have the same modulus $r^{1/5}$ and consecutive angles differ by $2\\pi/5$, so they form the vertices of a regular pentagon centred at the origin.",
  },
  {
    subtopic: "Polar form",
    kind: "tfn",
    prompt: "Given $|z| = 2$ and that $z$ lies in the second quadrant, $\\text{Re}(z) = -1$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The second quadrant only tells us $\\pi/2 < \\theta < \\pi$, so $\\text{Re}(z) = 2\\cos\\theta$ can be anything in $(-2, 0)$.\n$\\text{Re}(z) = -1$ only if $\\theta = 2\\pi/3$; e.g. $z = 2e^{j3\\pi/4}$ has $\\text{Re}(z) = -\\sqrt2$. The argument is not given, so we cannot determine it.",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "tfn",
    prompt: "The equation $z^3 = 8$ has only one solution, $z = 2$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Over the complex numbers, $z^3 = 8e^{j0}$ has **three** roots $2e^{j2\\pi k/3}$: $2$, $-1 + \\sqrt3 j$ and $-1 - \\sqrt3 j$.\n$z = 2$ is just the only **real** root. The fundamental theorem of algebra guarantees $n$ roots (with multiplicity) for a degree-$n$ polynomial.",
  },
  {
    subtopic: "Euler's formula",
    kind: "tfn",
    prompt: "For real $\\theta$, $e^{j\\theta} + e^{-j\\theta} = 2\\sin\\theta$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "By Euler, $e^{\\pm j\\theta} = \\cos\\theta \\pm j\\sin\\theta$. Adding cancels the imaginary parts: $e^{j\\theta} + e^{-j\\theta} = 2\\cos\\theta$.\nSubtracting gives $e^{j\\theta} - e^{-j\\theta} = 2j\\sin\\theta$. A conjugate pair always sums to twice its real part, which is the cosine.",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "tfn",
    prompt: "For all complex $z_1, z_2$: $\\overline{z_1 z_2} = \\bar z_1\\, \\bar z_2$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "In exponential form, $z_1z_2 = r_1r_2e^{j(\\theta_1 + \\theta_2)}$; conjugating negates the angle, giving $r_1r_2e^{-j(\\theta_1 + \\theta_2)} = (r_1e^{-j\\theta_1})(r_2e^{-j\\theta_2}) = \\bar z_1 \\bar z_2$.\nConjugation also distributes over sums and quotients.",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "tfn",
    prompt: "Given $|z_1| = 3$ and $|z_2| = 4$, then $|z_1 + z_2| = 5$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$|z_1 + z_2|$ depends on the angle between the two numbers: it can be anything from $|4 - 3| = 1$ to $4 + 3 = 7$.\nIt equals 5 only when they are perpendicular (e.g. $3$ and $4j$). Without the arguments we cannot determine it.",
  },
  {
    subtopic: "De Moivre & roots",
    kind: "tfn",
    prompt: "Given that $z^2 = -4$, then $z = 2j$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$z^2 = -4 = 4e^{j\\pi}$ has two square roots: $2e^{j\\pi/2} = 2j$ and $2e^{j3\\pi/2} = -2j$.\nBoth satisfy the equation, so $z$ could be $2j$ or $-2j$; the information given does not pin down which.",
  },
  {
    subtopic: "Polar form",
    kind: "tfn",
    prompt: "The principal argument of $z = -5$ is $-\\pi$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$-5$ lies on the negative real axis, so its angle is $\\pm\\pi$. The principal argument is defined in $(-\\pi, \\pi]$, which **includes** $\\pi$ and excludes $-\\pi$.\nSo $\\text{Arg}(-5) = \\pi$ and $-5 = 5e^{j\\pi}$.",
  },
  {
    subtopic: "Quadratic roots",
    kind: "tfn",
    prompt:
      "If a real quadratic has discriminant $b^2 - 4ac < 0$, its two roots are complex conjugates and therefore have equal modulus.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "With a negative discriminant the roots are $-\\frac{b}{2a} \\pm j\\frac{\\sqrt{4ac - b^2}}{2a}$, a conjugate pair.\nConjugates are mirror images in the real axis, so $|z| = |\\bar z|$. (Both moduli equal $\\sqrt{c/a}$, since the product of roots is $z\\bar z = |z|^2 = c/a$.)",
  },
  {
    subtopic: "Arithmetic & conjugate",
    kind: "tfn",
    prompt: "$\\dfrac{1}{j} = j$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Multiply top and bottom by $\\bar j = -j$: $\\frac{1}{j} = \\frac{-j}{-j^2} = \\frac{-j}{1} = -j$.\nIn polar form: $1/e^{j\\pi/2} = e^{-j\\pi/2} = -j$ (division subtracts angles). Check: $j \\cdot (-j) = -j^2 = 1$.",
  },
];
