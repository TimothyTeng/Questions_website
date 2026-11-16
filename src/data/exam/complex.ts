import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

/** Questions in the style and difficulty of the SC1004 final (AY24/25 S2 – AY25/26 S2 complex-number parts). */
// The finals write i; this site writes j (j^2 = -1). Arg z is the principal argument in (-pi, pi].
// TFN answers: 0 = True, 1 = False, 2 = Not enough information to determine.
// Every numeric answer was re-checked with Python (scratch script, not part of the repo).
export const complexExam: ConceptQuestion[] = [
  // C1: exponential form of a quotient of powers
  {
    subtopic: "Polar & exponential form",
    kind: "mcq",
    prompt: "Express $z = \\dfrac{(1 - j)^5}{(\\sqrt3 + j)^2}$ in exponential form $re^{j\\theta}$ with $\\theta$ the principal argument.",
    options: [
      "$\\sqrt2\\,e^{-j5\\pi/12}$",
      "$2\\sqrt2\\,e^{j5\\pi/12}$",
      "$\\sqrt2\\,e^{j7\\pi/12}$",
      "$\\sqrt2\\,e^{j5\\pi/12}$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$1 - j = \\sqrt2\\,e^{-j\\pi/4}$, so $(1 - j)^5 = (\\sqrt2)^5e^{-j5\\pi/4} = 4\\sqrt2\\,e^{-j5\\pi/4}$.\n$\\sqrt3 + j = 2e^{j\\pi/6}$, so $(\\sqrt3 + j)^2 = 4e^{j\\pi/3}$.\nDivide: modulus $4\\sqrt2/4 = \\sqrt2$; angle $-\\tfrac{5\\pi}{4} - \\tfrac{\\pi}{3} = -\\tfrac{19\\pi}{12}$. Add $2\\pi$ to bring it into $(-\\pi, \\pi]$: $-\\tfrac{19\\pi}{12} + \\tfrac{24\\pi}{12} = \\tfrac{5\\pi}{12}$.\nSo $z = \\sqrt2\\,e^{j5\\pi/12}$. Traps: (b) forgets to square the modulus $2$; (c) forgets to double the angle $\\pi/6$ of the denominator.",
  },
  // C2: cube root of a complicated expression to 2 d.p. (cf. AY25/26 S1 Q18)
  {
    subtopic: "Roots",
    kind: "mcq",
    prompt:
      "Which of the following is one of the values of $z = \\left(\\dfrac{(2 + 2j)(1 - \\sqrt3\\,j)}{-1 + j}\\right)^{1/3}$? (Modulus and argument in radians to 2 d.p.)",
    options: [
      "$1.59\\,e^{j0.87}$",
      "$1.33\\,e^{-j0.87}$",
      "$1.59\\,e^{j1.22}$",
      "$1.59\\,e^{j2.97}$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "Convert each factor: $2 + 2j = 2\\sqrt2\\,e^{j\\pi/4}$, $1 - \\sqrt3\\,j = 2e^{-j\\pi/3}$, $-1 + j = \\sqrt2\\,e^{j3\\pi/4}$ (second quadrant).\n$w = \\dfrac{2\\sqrt2 \\cdot 2}{\\sqrt2}e^{j(\\pi/4 - \\pi/3 - 3\\pi/4)} = 4e^{-j5\\pi/6}$.\nThe three cube roots have modulus $4^{1/3} \\approx 1.587 \\approx 1.59$ and angles $\\dfrac{-5\\pi/6 + 2\\pi k}{3}$:\n$k = 0$: $-5\\pi/18 \\approx -0.87$; $k = 1$: $7\\pi/18 \\approx 1.22$; $k = -1$: $-17\\pi/18 \\approx -2.97$.\nSo $1.59\\,e^{j1.22}$ is a root. Traps: (a) and (d) have the wrong sign on a correct-looking angle (their cubes have argument $+5\\pi/6$); (b) divides the modulus by 3 instead of taking the cube root.",
  },
  // C3: power quotient back to rectangular form
  {
    subtopic: "De Moivre",
    kind: "mcq",
    prompt: "Evaluate $z = \\dfrac{(-1 + j)^7}{(\\sqrt3 - j)^3}$ in rectangular form.",
    options: ["$-1 + j$", "$1 - j$", "$-1 - j$", "$2 - 2j$", "None of the above"],
    answer: 1,
    solution:
      "$-1 + j = \\sqrt2\\,e^{j3\\pi/4}$, so $(-1 + j)^7 = 8\\sqrt2\\,e^{j21\\pi/4} = 8\\sqrt2\\,e^{j5\\pi/4}$ (subtract $4\\pi$) $= 8\\sqrt2\\,e^{-j3\\pi/4}$.\n$\\sqrt3 - j = 2e^{-j\\pi/6}$, so $(\\sqrt3 - j)^3 = 8e^{-j\\pi/2} = -8j$.\n$z = \\sqrt2\\,e^{j(-3\\pi/4 + \\pi/2)} = \\sqrt2\\,e^{-j\\pi/4} = 1 - j$.\nTrap: using $\\arctan(1/(-1)) = -\\pi/4$ for $-1 + j$ (wrong quadrant) flips the answer to $-1 + j$. Option (d) has modulus $2\\sqrt2$ instead of $8\\sqrt2/8 = \\sqrt2$.",
  },
  // C4: arg vs Arg statements (cf. AY25/26 S2 Q18)
  {
    subtopic: "Arguments",
    kind: "mcq",
    prompt:
      "Here $\\text{Arg}\\,z \\in (-\\pi, \\pi]$ is the principal argument and $\\arg z$ denotes the set of all arguments of $z$ (values differing by multiples of $2\\pi$). For nonzero $z, z_1, z_2$, which of the following statements are correct?\n- I. $\\text{Arg}(z_1z_2) = \\text{Arg}\\,z_1 + \\text{Arg}\\,z_2$.\n- II. $\\arg(z_1z_2) = \\arg z_1 + \\arg z_2$.\n- III. $\\text{Arg}\\,\\bar z = -\\text{Arg}\\,z$.\n- IV. $\\text{Arg}(-1) = \\pi$.\n- V. $\\text{Arg}(1/z) = -\\text{Arg}\\,z$.",
    options: ["II and IV only", "I, II and IV only", "II, III, IV and V only", "IV only", "All of the above"],
    answer: 0,
    solution:
      "I: False. $z_1 = z_2 = -1$: $\\text{Arg}(1) = 0$ but $\\pi + \\pi = 2\\pi \\notin (-\\pi, \\pi]$. The sum of principal arguments can leave the interval.\nII: True. Multiplying adds angles, and as **sets** (mod $2\\pi$) the identity always holds.\nIII: False for negative reals: $\\bar z = z = -1$ has $\\text{Arg} = \\pi$, but $-\\pi$ is not a principal value. (It holds for every $z$ off the negative real axis.)\nIV: True, by the convention $(-\\pi, \\pi]$.\nV: $1/z = \\bar z/|z|^2$ has the same argument as $\\bar z$, so V fails for exactly the same $z$ as III (e.g. $z = -2$: $\\text{Arg}(-1/2) = \\pi \\ne -\\pi$). False.\nAnswer: II and IV only.",
  },
  // C5: TFN Arg(z^2)
  {
    subtopic: "Arguments",
    kind: "tfn",
    prompt: "For $z = -1 + j$, $\\text{Arg}(z^2) = 2\\,\\text{Arg}(z)$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\text{Arg}(z) = 3\\pi/4$ (second quadrant), so $2\\,\\text{Arg}(z) = 3\\pi/2$.\nBut $z^2 = 1 - 2j + j^2 = -2j$, whose principal argument is $-\\pi/2$. The two differ by $2\\pi$: $3\\pi/2$ is a valid argument of $z^2$ but not the **principal** one. **False.**",
  },
  // C6: De Moivre for sin 3 theta (cf. AY24/25 S2 Q16)
  {
    subtopic: "De Moivre",
    kind: "mcq",
    prompt:
      "Using De Moivre's theorem, $\\sin 3\\theta = a\\sin\\theta + b\\sin^3\\theta$ for all real $\\theta$. What is $b$?",
    options: ["$4$", "$-4$", "$3$", "$-3$", "None of the above"],
    answer: 1,
    solution:
      "$(\\cos\\theta + j\\sin\\theta)^3 = \\cos 3\\theta + j\\sin 3\\theta$. Expand the left side with $c = \\cos\\theta$, $s = \\sin\\theta$:\n$$c^3 + 3jc^2s + 3j^2cs^2 + j^3s^3 = (c^3 - 3cs^2) + j(3c^2s - s^3).$$\nImaginary parts: $\\sin 3\\theta = 3c^2s - s^3 = 3(1 - s^2)s - s^3 = 3s - 4s^3$.\nSo $a = 3$, $b = -4$. (Check at $\\theta = \\pi/2$: $\\sin(3\\pi/2) = -1 = 3 - 4$.) Option (a) is the coefficient in $\\cos 3\\theta = 4\\cos^3\\theta - 3\\cos\\theta$.",
  },
  // C7: De Moivre for cos 4 theta
  {
    subtopic: "De Moivre",
    kind: "mcq",
    prompt:
      "Using De Moivre's theorem, $\\cos 4\\theta = a\\cos^4\\theta + b\\cos^2\\theta + c$ for all real $\\theta$. Then $(a, b, c) =$",
    options: ["$(8, -8, 1)$", "$(1, -6, 1)$", "$(8, 8, -1)$", "$(6, -8, 1)$", "None of the above"],
    answer: 0,
    solution:
      "Real part of $(c + js)^4$ with $c = \\cos\\theta$, $s = \\sin\\theta$: the terms with even powers of $j$ are $c^4 + 6c^2(js)^2 + (js)^4 = c^4 - 6c^2s^2 + s^4$.\nSubstitute $s^2 = 1 - c^2$:\n$$c^4 - 6c^2(1 - c^2) + (1 - c^2)^2 = c^4 - 6c^2 + 6c^4 + 1 - 2c^2 + c^4 = 8c^4 - 8c^2 + 1.$$\nSo $(a, b, c) = (8, -8, 1)$. Checks: $\\theta = 0$ gives $8 - 8 + 1 = 1 = \\cos 0$ ✓; $\\theta = \\pi/2$ gives $1 = \\cos 2\\pi$ ✓. Option (b) stops before replacing $s^2$ by $1 - c^2$.",
  },
  // C8: counting solutions of an Arg / modulus system (cf. AY24/25 S2 Q15)
  {
    subtopic: "Argand diagram",
    kind: "mcq",
    prompt:
      "How many complex numbers $z$ satisfy both $(\\text{Arg}\\,z)^2 - 2\\,\\text{Arg}\\,z - 3 = 0$ and $|z|^2 + (\\text{Im}\\,z)^2 = 3$? ($\\text{Arg}\\,z \\in (-\\pi, \\pi]$.)",
    options: ["$0$", "$1$", "$2$", "$3$", "$4$"],
    answer: 2,
    solution:
      "$(\\text{Arg}\\,z - 3)(\\text{Arg}\\,z + 1) = 0$ gives $\\text{Arg}\\,z = 3$ or $-1$. **Both** are principal values: $-\\pi < -1$ and $3 < \\pi \\approx 3.1416$. So $z$ lies on one of two rays from the origin.\nOn a ray $z = re^{j\\theta}$ ($r > 0$), the second equation is $r^2 + r^2\\sin^2\\theta = 3$, i.e. $r = \\sqrt{3/(1 + \\sin^2\\theta)}$: exactly one positive $r$ per ray ($r \\approx 1.72$ for $\\theta = 3$, $r \\approx 1.33$ for $\\theta = -1$).\nTotal: $2$ solutions. Traps: discarding $\\text{Arg} = 3$ as 'more than $\\pi$' gives 1; counting $r = \\pm\\sqrt{\\cdot}$ gives 4, but a modulus is positive.",
  },
  // C9: circle and ray on the Argand diagram
  {
    subtopic: "Argand diagram",
    kind: "mcq",
    prompt: "How many complex numbers $z$ satisfy both $|z - j| = 1$ and $\\text{Arg}\\,z = \\pi/4$?",
    options: ["$0$", "$1$", "$2$", "$4$", "Infinitely many"],
    answer: 1,
    solution:
      "$|z - j| = 1$ is the circle with centre $(0, 1)$ and radius $1$; it passes through the origin. $\\text{Arg}\\,z = \\pi/4$ is the open ray $z = t(1 + j)$, $t > 0$ (the origin has no argument).\nSubstitute: $|t + (t - 1)j|^2 = t^2 + (t - 1)^2 = 1 \\Rightarrow 2t^2 - 2t = 0 \\Rightarrow t = 0$ or $t = 1$.\n$t = 0$ is $z = 0$, which is excluded because $\\text{Arg}\\,0$ is undefined. So only $z = 1 + j$: **one** solution. Trap: the line $y = x$ meets the circle twice, but only one point is on the ray.",
  },
  // C10: complex inner product properties (cf. AY24/25 S2 Q17)
  {
    subtopic: "Complex inner product",
    kind: "mcq",
    prompt:
      "For $\\mathbf u, \\mathbf v, \\mathbf w \\in \\mathbb C^n$ and $c \\in \\mathbb C$, the inner product is $\\langle \\mathbf u, \\mathbf v\\rangle = \\sum_i u_i\\overline{v_i} = \\mathbf v^H\\mathbf u$. Which of the following statements are correct?\n- I. $\\langle \\mathbf u, \\mathbf v\\rangle = \\overline{\\langle \\mathbf v, \\mathbf u\\rangle}$.\n- II. $\\langle c\\mathbf u, \\mathbf v\\rangle = c\\langle \\mathbf u, \\mathbf v\\rangle$.\n- III. $\\langle \\mathbf u, c\\mathbf v\\rangle = c\\langle \\mathbf u, \\mathbf v\\rangle$.\n- IV. $\\langle \\mathbf u, \\mathbf u\\rangle$ is real, and $\\langle \\mathbf u, \\mathbf u\\rangle > 0$ whenever $\\mathbf u \\neq \\mathbf 0$.\n- V. $\\langle \\mathbf u + \\mathbf w, \\mathbf v\\rangle = \\langle \\mathbf u, \\mathbf v\\rangle + \\langle \\mathbf w, \\mathbf v\\rangle$.",
    options: ["I and IV only", "II and IV only", "I, II, III and IV only", "I, II, IV and V only", "All of the above"],
    answer: 3,
    solution:
      "I: $\\overline{\\langle \\mathbf v, \\mathbf u\\rangle} = \\overline{\\sum v_i\\overline{u_i}} = \\sum \\overline{v_i}u_i = \\langle \\mathbf u, \\mathbf v\\rangle$. True (conjugate symmetry).\nII: $\\sum (cu_i)\\overline{v_i} = c\\sum u_i\\overline{v_i}$. True (linear in the first slot).\nIII: $\\sum u_i\\overline{cv_i} = \\bar c\\sum u_i\\overline{v_i} = \\bar c\\langle \\mathbf u, \\mathbf v\\rangle$. False unless $c$ is real: the second slot is **conjugate**-linear.\nIV: $\\langle \\mathbf u, \\mathbf u\\rangle = \\sum |u_i|^2$, real and positive for $\\mathbf u \\neq \\mathbf 0$. True.\nV: additivity in the first slot. True.\nAnswer: I, II, IV and V only.",
  },
  // C11: compute a complex inner product
  {
    subtopic: "Complex inner product",
    kind: "mcq",
    prompt:
      "Let $\\mathbf u = [2 - j,\\ 1 + 3j]^T$ and $\\mathbf v = [1 + j,\\ -2j]^T$. With $\\langle \\mathbf u, \\mathbf v\\rangle = \\mathbf v^H\\mathbf u$, what is $\\langle \\mathbf u, \\mathbf v\\rangle$?",
    options: ["$-5 - j$", "$-5 + j$", "$9 - j$", "$9 + j$", "None of the above"],
    answer: 0,
    solution:
      "Conjugate the **second** vector: $\\overline{\\mathbf v} = [1 - j,\\ 2j]$.\n$(2 - j)(1 - j) = 2 - 2j - j + j^2 = 1 - 3j$.\n$(1 + 3j)(2j) = 2j + 6j^2 = -6 + 2j$.\nSum: $\\langle \\mathbf u, \\mathbf v\\rangle = -5 - j$.\nTraps: (b) is $\\langle \\mathbf v, \\mathbf u\\rangle = \\mathbf u^H\\mathbf v$, the conjugate; (c) forgets to conjugate at all ($\\mathbf v^T\\mathbf u$).",
  },
  // C12: exponential form via Euler
  {
    subtopic: "Polar & exponential form",
    kind: "mcq",
    prompt: "For $0 < \\alpha < \\pi/2$, the number $\\dfrac{1 + j\\tan\\alpha}{1 - j\\tan\\alpha}$ equals",
    options: ["$e^{j\\alpha}$", "$e^{-j2\\alpha}$", "$e^{j2\\alpha}$", "$\\cos 2\\alpha$", "None of the above"],
    answer: 2,
    solution:
      "Multiply top and bottom by $\\cos\\alpha > 0$:\n$$\\frac{\\cos\\alpha + j\\sin\\alpha}{\\cos\\alpha - j\\sin\\alpha} = \\frac{e^{j\\alpha}}{e^{-j\\alpha}} = e^{j2\\alpha}.$$\nSanity check: numerator and denominator are conjugates, so the quotient has modulus $1$ (rules out (d)), and the angles subtract: $\\alpha - (-\\alpha) = 2\\alpha$.",
  },
  // C13: smallest n with w^n real
  {
    subtopic: "De Moivre",
    kind: "mcq",
    prompt: "Let $w = \\dfrac{\\sqrt3 + j}{1 - j}$. What is the smallest positive integer $n$ for which $w^n$ is a real number?",
    options: ["$3$", "$5$", "$6$", "$24$", "None of the above"],
    answer: 4,
    solution:
      "$w = \\dfrac{2e^{j\\pi/6}}{\\sqrt2\\,e^{-j\\pi/4}} = \\sqrt2\\,e^{j5\\pi/12}$, so $w^n = 2^{n/2}e^{j5n\\pi/12}$.\n$w^n$ is real iff $5n\\pi/12$ is a multiple of $\\pi$, i.e. $12 \\mid 5n$, i.e. $12 \\mid n$ (as $\\gcd(5, 12) = 1$). The smallest is $n = 12$: $w^{12} = 64e^{j5\\pi} = -64$. Not listed.\nTraps: $n = 6$ gives $w^6 = 8e^{j5\\pi/2} = 8j$ (purely imaginary); $n = 24$ is the smallest with $w^n$ real and **positive** ($4096$); $n = 5$ confuses the numerator of $5\\pi/12$ with the period.",
  },
  // C14: TFN modulus of a sum with known arguments
  {
    subtopic: "Polar & exponential form",
    kind: "tfn",
    prompt:
      "If $|z_1| = 2$, $\\text{Arg}\\,z_1 = \\pi/3$, $|z_2| = 3$ and $\\text{Arg}\\,z_2 = 5\\pi/6$, then $|z_1 + z_2| = \\sqrt{13}$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The arguments differ by $5\\pi/6 - \\pi/3 = \\pi/2$, so $z_1$ and $z_2$ are perpendicular on the Argand diagram and Pythagoras applies: $|z_1 + z_2|^2 = 2^2 + 3^2 = 13$.\n(Rectangular check: $z_1 = 1 + \\sqrt3\\,j$, $z_2 = -\\tfrac{3\\sqrt3}{2} + \\tfrac32 j$; the sum has $|\\cdot|^2 = 13$.) **True.** With only the moduli given it would be undetermined; the arguments settle it.",
  },
  // C15: TFN product of roots
  {
    subtopic: "Roots",
    kind: "tfn",
    prompt: "The product of the four fourth roots of $-16$ is $-16$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The roots are $2e^{j(\\pi + 2\\pi k)/4}$, $k = 0, 1, 2, 3$: angles $\\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4$.\nProduct: modulus $2^4 = 16$, angle $\\pi/4 + 3\\pi/4 + 5\\pi/4 + 7\\pi/4 = 4\\pi \\equiv 0$. So the product is $+16$.\n(Equivalently, the roots of $z^4 + 16 = 0$ have product $(-1)^4 \\cdot 16 = 16$; or pair conjugates: $(\\sqrt2 + \\sqrt2 j)(\\sqrt2 - \\sqrt2 j) = 4$ twice.) **False.**",
  },
  // C16: modulus of a product/quotient
  {
    subtopic: "Polar & exponential form",
    kind: "mcq",
    prompt: "Find $|z|$ for $z = \\dfrac{(3 + 4j)^3(1 - j)^4}{(2 - j)^2}$.",
    options: ["$20$", "$50$", "$125$", "$223.61$", "None of the above"],
    answer: 4,
    solution:
      "Moduli multiply and divide, so there is no need to expand anything:\n$|3 + 4j|^3 = 5^3 = 125$, $|1 - j|^4 = (\\sqrt2)^4 = 4$, $|2 - j|^2 = (\\sqrt5)^2 = 5$.\n$|z| = \\dfrac{125 \\cdot 4}{5} = 100$, which is not listed.\nTraps: $50$ uses $|1 - j|^4 = 2$; $223.61 = 500/\\sqrt5$ forgets to square $|2 - j|$; $20 = 500/25$ squares it twice.",
  },
  // C17: locus on the Argand diagram
  {
    subtopic: "Argand diagram",
    kind: "mcq",
    prompt: "On the Argand diagram, the set of all $z$ with $|z - 1| = |z + j|$ is",
    options: [
      "the line $\\text{Im}\\,z = \\text{Re}\\,z$",
      "the line $\\text{Im}\\,z = -\\text{Re}\\,z$",
      "the circle $|z| = 1$",
      "the line $\\text{Re}\\,z = 1$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "$|z - 1|$ is the distance from $z$ to $1 = (1, 0)$ and $|z + j| = |z - (-j)|$ is the distance to $-j = (0, -1)$. Points equidistant from two points form their perpendicular bisector.\nAlgebraically, with $z = x + yj$: $(x - 1)^2 + y^2 = x^2 + (y + 1)^2 \\Rightarrow -2x + 1 = 2y + 1 \\Rightarrow y = -x$.\nSo the locus is the line $\\text{Im}\\,z = -\\text{Re}\\,z$. Trap: reading $|z + j|$ as the distance to $+j$ gives $y = x$.",
  },
  // C18: quadratic with complex coefficients
  {
    subtopic: "Polynomial roots",
    kind: "mcq",
    prompt: "The roots of $z^2 - (3 + 2j)z + (1 + 3j) = 0$ are",
    options: [
      "$1 + j$ and $1 - j$",
      "$1 - j$ and $2 - j$",
      "$-1 - j$ and $-2 - j$",
      "$1 + j$ and $2 + j$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "For a monic quadratic the roots have sum $3 + 2j$ and product $1 + 3j$. Test (d): $(1 + j) + (2 + j) = 3 + 2j$ ✓ and $(1 + j)(2 + j) = 2 + j + 2j + j^2 = 1 + 3j$ ✓.\n(Quadratic formula: $\\Delta = (3 + 2j)^2 - 4(1 + 3j) = 5 + 12j - 4 - 12j = 1$, so $z = \\frac{(3 + 2j) \\pm 1}{2}$.)\nTrap: the coefficients are **not** real, so the roots need not be a conjugate pair; (a) wrongly assumes they must be. (b) is the conjugate pair of the true roots, which solves the conjugated equation.",
  },
  // C19: Euler identity, real part
  {
    subtopic: "Euler identities",
    kind: "mcq",
    prompt: "For $0 < \\theta < 2\\pi$, what is $\\text{Re}\\left(\\dfrac{e^{j\\theta}}{1 - e^{j\\theta}}\\right)$?",
    options: ["$-\\tfrac12$", "$\\tfrac12$", "$0$", "$\\tfrac12\\cot(\\theta/2)$", "None of the above"],
    answer: 0,
    solution:
      "Factor out the half-angle: $1 - e^{j\\theta} = e^{j\\theta/2}(e^{-j\\theta/2} - e^{j\\theta/2}) = -2j\\sin(\\theta/2)\\,e^{j\\theta/2}$.\nSo $\\dfrac{e^{j\\theta}}{1 - e^{j\\theta}} = \\dfrac{e^{j\\theta/2}}{-2j\\sin(\\theta/2)} = \\dfrac{j(\\cos\\frac\\theta2 + j\\sin\\frac\\theta2)}{2\\sin\\frac\\theta2} = -\\tfrac12 + \\tfrac{j}{2}\\cot\\tfrac\\theta2$.\nThe real part is $-\\tfrac12$ for every $\\theta$ in the range; (d) is the imaginary part (without the $j$). Quick check at $\\theta = \\pi$: $\\frac{-1}{2} = -\\frac12$ ✓.",
  },
  // C20: 1 + e^{j theta} in polar form
  {
    subtopic: "Euler identities",
    kind: "mcq",
    prompt: "For $0 < \\theta < \\pi$, the polar (exponential) form of $1 + e^{j\\theta}$ is",
    options: [
      "$2\\cos\\theta\\,e^{j\\theta/2}$",
      "$2\\sin(\\theta/2)\\,e^{j\\theta/2}$",
      "$2\\cos(\\theta/2)\\,e^{j\\theta/2}$",
      "$2\\cos(\\theta/2)\\,e^{j\\theta}$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "Pull out $e^{j\\theta/2}$: $1 + e^{j\\theta} = e^{j\\theta/2}(e^{-j\\theta/2} + e^{j\\theta/2}) = 2\\cos(\\theta/2)\\,e^{j\\theta/2}$.\nFor $0 < \\theta < \\pi$, $\\cos(\\theta/2) > 0$, so this is a genuine polar form: modulus $2\\cos(\\theta/2)$, argument $\\theta/2$.\nGeometric check: $1$ and $e^{j\\theta}$ are unit vectors, so their sum bisects the angle between them, at angle $\\theta/2$.",
  },
  // C21: TFN, purely imaginary z
  {
    subtopic: "Arguments",
    kind: "tfn",
    prompt: "If $z \\neq 0$ and $\\bar z = -z$, then $\\text{Arg}\\,z = \\pi/2$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "With $z = a + bj$, $\\bar z = -z$ means $a - bj = -a - bj$, so $a = 0$: $z = bj$ is purely imaginary with $b \\neq 0$.\nIf $b > 0$, $\\text{Arg}\\,z = \\pi/2$; if $b < 0$, $\\text{Arg}\\,z = -\\pi/2$. Both are possible (e.g. $z = 3j$ or $z = -3j$), so **not enough information**.",
  },
];
