import type { Lesson } from "@/lib/types";

// Lesson: Chapter 8A complex numbers (course uses j, with j^2 = -1).
// All worked-example arithmetic was checked numerically (Python/numpy).

export const complexLesson: Lesson = {
  topic: "complex",
  bigPicture:
    "Complex numbers extend the real line to a plane so that every polynomial has roots (e.g. $x^2 + 1 = 0$ has $x = \\pm j$). The same number has three faces: **rectangular** $a + bj$ (best for adding), **polar** $r(\\cos\\theta + j\\sin\\theta)$ and **complex exponential** $re^{j\\theta}$ (best for multiplying, powers and roots). Euler's formula $e^{j\\theta} = \\cos\\theta + j\\sin\\theta$ links them, and turns multiplication into 'multiply lengths, add angles'. That rotating-phasor picture is exactly what the DFT is built on: every DFT basis vector is a sequence $e^{j\\omega n}$ spinning around the unit circle.",
  sections: [
    {
      title: "What j is, and rectangular arithmetic",
      intuition:
        "$j$ is a quarter-turn: multiplying by $j$ rotates a number by $90^\\circ$ anticlockwise, so doing it twice flips the sign, which is why $j^2 = -1$. Rectangular arithmetic is just ordinary algebra with that one rule.",
      keyIdeas: [
        "$z = a + bj$ with $a = \\text{Re}(z)$, $b = \\text{Im}(z)$ (both real). This is rectangular (Cartesian) form.",
        "Equality: $a + bj = c + dj$ iff $a = c$ **and** $b = d$ (compare real and imaginary parts separately).",
        "Add/subtract component-wise; multiply by expanding and replacing $j^2$ with $-1$.",
        "Powers of $j$ cycle with period 4: $1, j, -1, -j$.",
      ],
      formulas: [
        "j^2 = -1,\\quad j^3 = -j,\\quad j^4 = 1",
        "(a + bj)(c + dj) = (ac - bd) + (ad + bc)j",
      ],
      example: {
        problem:
          "(Tutorial 8A Q1) Evaluate $z = (2 - j)^2 + \\dfrac{7 - 4j}{2 + j} - \\dfrac{1}{1 + j}$ in rectangular form.",
        steps: [
          "Square: $(2 - j)^2 = 4 - 4j + j^2 = 3 - 4j$.",
          "Divide by multiplying by the conjugate: $\\frac{(7 - 4j)(2 - j)}{(2 + j)(2 - j)} = \\frac{14 - 7j - 8j + 4j^2}{5} = \\frac{10 - 15j}{5} = 2 - 3j$.",
          "Reciprocal: $\\frac{1}{1 + j} = \\frac{1 - j}{2} = 0.5 - 0.5j$.",
          "Combine: $(3 - 4j) + (2 - 3j) - (0.5 - 0.5j) = 4.5 - 6.5j$.",
        ],
        answer: "$z = 4.5 - 6.5j$ (in exponential form $\\approx 7.91e^{-j0.97}$).",
      },
      pitfalls: [
        "Writing $(2 - j)^2 = 4 + j^2$: you forgot the cross term $-4j$.",
        "Sign slips when subtracting a complex number: $-(0.5 - 0.5j) = -0.5 + 0.5j$.",
        "$j^{n}$ for large $n$: reduce $n$ mod 4, don't multiply out.",
      ],
      recall: [
        { q: "What is $j^{2027}$?", a: "$2027 = 4\\cdot 506 + 3$, so $j^{2027} = j^3 = -j$." },
        { q: "Expand $(1 + 2j)(3 - j)$.", a: "$3 - j + 6j - 2j^2 = 5 + 5j$." },
        { q: "When are two complex numbers equal?", a: "When their real parts are equal **and** their imaginary parts are equal." },
      ],
    },
    {
      title: "Conjugate, modulus and division",
      intuition:
        "The conjugate $\\bar z$ is the mirror image of $z$ in the real axis. Multiplying a number by its mirror image cancels the imaginary part and leaves the squared length, which is the trick that makes division possible.",
      keyIdeas: [
        "$\\overline{a + bj} = a - bj$; in exponential form $\\overline{re^{j\\theta}} = re^{-j\\theta}$ (negate the angle).",
        "$|z| = \\sqrt{a^2 + b^2}$ is the distance from the origin; $z\\bar z = |z|^2$ is always real and $\\ge 0$.",
        "To divide, multiply top and bottom by the conjugate of the denominator.",
        "Conjugation distributes: $\\overline{z_1 \\pm z_2} = \\bar z_1 \\pm \\bar z_2$, $\\overline{z_1z_2} = \\bar z_1\\bar z_2$. Also $z + \\bar z = 2\\text{Re}(z)$.",
        "Moduli multiply and divide: $|z_1z_2| = |z_1||z_2|$, $|z_1/z_2| = |z_1|/|z_2|$, but $|z_1 + z_2| \\le |z_1| + |z_2|$ only.",
      ],
      formulas: [
        "z\\bar z = (a + bj)(a - bj) = a^2 + b^2 = |z|^2",
        "\\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2}",
      ],
      example: {
        problem: "Compute $\\dfrac{2 + 3j}{1 + j}$ and check its modulus.",
        steps: [
          "Multiply top and bottom by $\\overline{1 + j} = 1 - j$; the denominator becomes $|1 + j|^2 = 2$.",
          "Numerator: $(2 + 3j)(1 - j) = 2 - 2j + 3j - 3j^2 = 5 + j$.",
          "So the quotient is $\\frac{5 + j}{2} = 2.5 + 0.5j$.",
          "Check moduli: $|2 + 3j|/|1 + j| = \\sqrt{13}/\\sqrt2 = \\sqrt{6.5}$, and $|2.5 + 0.5j| = \\sqrt{6.25 + 0.25} = \\sqrt{6.5}$. ✓",
        ],
        answer: "$2.5 + 0.5j$",
      },
      pitfalls: [
        "Dividing by $|z_2|$ instead of $|z_2|^2$ after multiplying by $\\bar z_2$.",
        "Assuming $|z_1 + z_2| = |z_1| + |z_2|$: only true when they point the same way.",
        "$1/j = -j$, not $j$.",
      ],
      recall: [
        { q: "What is $(3 - 4j)\\overline{(3 - 4j)}$?", a: "$|3 - 4j|^2 = 9 + 16 = 25$." },
        { q: "Why multiply by the conjugate when dividing?", a: "Because $z_2\\bar z_2 = |z_2|^2$ is real, so the denominator becomes a real number." },
        { q: "$|z_1| = 3$, $|z_2| = 4$. What can $|z_1 + z_2|$ be?", a: "Anything from 1 to 7: it depends on the angle between them (5 only if perpendicular)." },
      ],
    },
    {
      title: "Argand diagram, polar & exponential form",
      intuition:
        "Plot $a + bj$ as the point $(a, b)$. Then instead of 'how far right and how far up' you can say 'how far from the origin ($r$) and at what angle ($\\theta$)': the same point in polar coordinates. Euler's formula packs that into $re^{j\\theta}$.",
      keyIdeas: [
        "Modulus $r = |z| = \\sqrt{a^2 + b^2}$; argument $\\theta$ measured from the positive real axis, **anticlockwise positive**, in radians.",
        "Euler: $e^{j\\theta} = \\cos\\theta + j\\sin\\theta$, so $z = r(\\cos\\theta + j\\sin\\theta) = re^{j\\theta}$.",
        "The argument is not unique ($\\theta + 2\\pi k$ is the same point). The **principal argument** $\\text{Arg}(z) \\in (-\\pi, \\pi]$.",
        "Use $\\theta = \\text{atan2}(b, a)$, not $\\arctan(b/a)$: arctan only returns angles in $(-\\pi/2, \\pi/2)$, i.e. quadrants 1 and 4.",
        "Quadrant fix: if $a < 0$, add $\\pi$ (when $b \\ge 0$) or subtract $\\pi$ (when $b < 0$) from $\\arctan(b/a)$.",
        "Unit circle: $|z| = 1$; e.g. $1 = e^{j0}$, $j = e^{j\\pi/2}$, $-1 = e^{j\\pi}$, $-j = e^{-j\\pi/2}$.",
      ],
      formulas: [
        "z = a + bj = r(\\cos\\theta + j\\sin\\theta) = re^{j\\theta}",
        "a = r\\cos\\theta,\\quad b = r\\sin\\theta,\\quad r = \\sqrt{a^2 + b^2},\\quad \\theta = \\operatorname{atan2}(b, a)",
      ],
      example: {
        problem: "Write $z_1 = -\\sqrt3 + j$ and $z_2 = -2 - 2j$ in exponential form with principal arguments.",
        steps: [
          "$z_1$: $r = \\sqrt{3 + 1} = 2$. It is in quadrant 2 ($a < 0$, $b > 0$). Reference angle $\\arctan(1/\\sqrt3) = \\pi/6$, so $\\theta = \\pi - \\pi/6 = 5\\pi/6$.",
          "Note the calculator trap: $\\arctan\\left(\\frac{1}{-\\sqrt3}\\right) = -\\pi/6$, which is the angle of $\\sqrt3 - j$ (quadrant 4). Adding $\\pi$ gives $5\\pi/6$. ✓",
          "$z_2$: $r = \\sqrt{4 + 4} = 2\\sqrt2$. Quadrant 3 ($a < 0$, $b < 0$). Reference angle $\\pi/4$, so $\\theta = -\\pi + \\pi/4 = -3\\pi/4$ (stay inside $(-\\pi, \\pi]$, so not $5\\pi/4$).",
        ],
        answer: "$z_1 = 2e^{j5\\pi/6}$, $z_2 = 2\\sqrt2\\,e^{-j3\\pi/4}$.",
      },
      pitfalls: [
        "Trusting $\\arctan(b/a)$ for points with $a < 0$: you get the angle of $-z$.",
        "Giving $5\\pi/4$ or $-5\\pi/6$ etc. when the question asks for the **principal** argument (must be in $(-\\pi, \\pi]$).",
        "Negative real numbers: $\\text{Arg}(-5) = \\pi$, not $-\\pi$.",
        "Mixing degrees and radians: the course uses radians.",
      ],
      recall: [
        { q: "Principal argument of $-1 - j$?", a: "$-3\\pi/4$ (third quadrant), not $\\pi/4$." },
        { q: "Rectangular form of $4e^{j2\\pi/3}$?", a: "$4(-\\tfrac12 + j\\tfrac{\\sqrt3}{2}) = -2 + 2\\sqrt3\\,j$." },
        { q: "What interval does the principal argument live in?", a: "$(-\\pi, \\pi]$: includes $\\pi$, excludes $-\\pi$." },
      ],
    },
    {
      title: "Multiplication, division and Euler identities",
      intuition:
        "In exponential form, multiplying is easy because exponents add: $r_1e^{j\\theta_1} \\cdot r_2e^{j\\theta_2} = r_1r_2e^{j(\\theta_1 + \\theta_2)}$. Geometrically, multiplying by $z_2$ **scales** by $|z_2|$ and **rotates** by $\\text{Arg}(z_2)$.",
      keyIdeas: [
        "Multiply: multiply lengths, add angles. Divide: divide lengths, subtract angles.",
        "Multiplying by $e^{j\\phi}$ (modulus 1) is a pure rotation by $\\phi$: a phase shift.",
        "After adding angles, reduce back into $(-\\pi, \\pi]$ by adding/subtracting $2\\pi$.",
        "From Euler: $e^{j\\theta} + e^{-j\\theta} = 2\\cos\\theta$ and $e^{j\\theta} - e^{-j\\theta} = 2j\\sin\\theta$.",
        "Euler's identity: $e^{j\\pi} + 1 = 0$.",
      ],
      formulas: [
        "z_1z_2 = r_1r_2\\,e^{j(\\theta_1 + \\theta_2)},\\qquad \\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\,e^{j(\\theta_1 - \\theta_2)}",
        "\\cos\\theta = \\frac{e^{j\\theta} + e^{-j\\theta}}{2},\\qquad \\sin\\theta = \\frac{e^{j\\theta} - e^{-j\\theta}}{2j}",
      ],
      example: {
        problem: "Let $z_1 = 4e^{j\\pi/6}$ and $z_2 = 2e^{-j\\pi/3}$. Find $z_1z_2$ and $z_1/z_2$.",
        steps: [
          "Product: lengths $4 \\cdot 2 = 8$; angles $\\pi/6 + (-\\pi/3) = -\\pi/6$. So $z_1z_2 = 8e^{-j\\pi/6} = 8(\\tfrac{\\sqrt3}{2} - \\tfrac12 j) = 4\\sqrt3 - 4j \\approx 6.93 - 4j$.",
          "Quotient: lengths $4/2 = 2$; angles $\\pi/6 - (-\\pi/3) = \\pi/2$. So $z_1/z_2 = 2e^{j\\pi/2} = 2j$.",
          "Sanity check: $2j \\cdot z_2 = 2e^{j\\pi/2} \\cdot 2e^{-j\\pi/3} = 4e^{j\\pi/6} = z_1$. ✓",
        ],
        answer: "$z_1z_2 = 8e^{-j\\pi/6}$, $z_1/z_2 = 2j$.",
      },
      pitfalls: [
        "Adding the moduli instead of multiplying them.",
        "Leaving an angle like $7\\pi/6$ when the principal value $-5\\pi/6$ is required.",
        "Mixing up $2\\cos\\theta$ (sum) and $2j\\sin\\theta$ (difference).",
      ],
      recall: [
        { q: "$2e^{j\\pi/3} \\cdot 3e^{j5\\pi/6}$ with principal argument?", a: "$6e^{j7\\pi/6} = 6e^{-j5\\pi/6}$." },
        { q: "Simplify $e^{j\\theta} + e^{-j\\theta}$.", a: "$2\\cos\\theta$." },
        { q: "What does multiplying by $e^{j\\pi/4}$ do geometrically?", a: "Rotates by $\\pi/4$ anticlockwise; the modulus is unchanged." },
      ],
    },
    {
      title: "De Moivre's theorem: powers",
      intuition:
        "Raising to the $n$-th power is multiplying $z$ by itself $n$ times, so the length gets raised to the $n$ and the angle gets added $n$ times. A spiral: each step scales by $r$ and turns by $\\theta$.",
      keyIdeas: [
        "$(re^{j\\theta})^n = r^ne^{jn\\theta}$, valid for all integers $n$ (including negative).",
        "Convert to exponential form first; expanding $(a + bj)^n$ binomially is slow and error-prone.",
        "After multiplying the angle by $n$, reduce it mod $2\\pi$ to read off the answer.",
        "Quick check: $|z^n| = |z|^n$.",
      ],
      formulas: [
        "(re^{j\\theta})^n = r^n e^{jn\\theta} = r^n(\\cos n\\theta + j\\sin n\\theta)",
      ],
      example: {
        problem: "Evaluate $(1 + \\sqrt3\\,j)^5$.",
        steps: [
          "Exponential form: $r = \\sqrt{1 + 3} = 2$, $\\theta = \\arctan(\\sqrt3) = \\pi/3$ (first quadrant, so no correction).",
          "De Moivre: $2^5 e^{j5\\pi/3} = 32e^{j5\\pi/3}$.",
          "Reduce: $5\\pi/3 - 2\\pi = -\\pi/3$, so the result is $32e^{-j\\pi/3}$.",
          "Rectangular: $32(\\cos(-\\pi/3) + j\\sin(-\\pi/3)) = 32(\\tfrac12 - j\\tfrac{\\sqrt3}{2}) = 16 - 16\\sqrt3\\,j \\approx 16 - 27.71j$.",
        ],
        answer: "$32e^{-j\\pi/3} = 16 - 16\\sqrt3\\,j$",
      },
      pitfalls: [
        "Using the wrong quadrant for $\\theta$ before multiplying by $n$; the error is multiplied too.",
        "Raising the angle to the power $n$ ($\\theta^n$) instead of multiplying ($n\\theta$).",
        "Forgetting the conjugate when the base is written as $\\overline{(1 + 2j)}$.",
      ],
      recall: [
        { q: "$(1 + j)^8 = ?$", a: "$(\\sqrt2)^8e^{j2\\pi} = 16$." },
        { q: "$(1 + j)^{-4} = ?$", a: "$(\\sqrt2)^{-4}e^{-j\\pi} = -\\tfrac14$." },
        { q: "$|(3 + 4j)^3| = ?$", a: "$5^3 = 125$." },
      ],
    },
    {
      title: "n-th roots of a complex number",
      intuition:
        "Going backwards from a power: which $z$ satisfy $z^n = w$? Because angles that differ by $2\\pi$ are the same point, dividing the angle by $n$ produces $n$ different answers. They sit on a circle, evenly spaced like the vertices of a regular $n$-gon.",
      keyIdeas: [
        "Write $w = Re^{j\\phi}$. The $n$ roots are $z_k = R^{1/n}e^{j(\\phi + 2\\pi k)/n}$, $k = 0, 1, \\dots, n-1$.",
        "All roots have the same modulus $R^{1/n}$; consecutive roots differ in angle by $2\\pi/n$.",
        "There are exactly $n$ distinct roots for $w \\ne 0$, and they sum to 0 (for $n \\ge 2$).",
        "Roots of unity: $z^n = 1$ gives $e^{j2\\pi k/n}$; these are exactly the entries that appear in the DFT matrix.",
        "A fractional power like $w^{1/2}$ is multi-valued: list every root unless told 'principal'.",
      ],
      formulas: [
        "z_k = |w|^{1/n}\\, e^{j\\left(\\frac{\\phi}{n} + \\frac{2\\pi k}{n}\\right)},\\quad k = 0, 1, \\dots, n - 1",
      ],
      example: {
        problem: "Find all fourth roots of $-16$. Then evaluate $z = \\left(2e^{j\\pi/4}(1 - j)\\right)^{1/2}$ to 2 d.p.",
        steps: [
          "$-16 = 16e^{j\\pi}$. Modulus of each root: $16^{1/4} = 2$.",
          "Angles: $\\frac{\\pi + 2\\pi k}{4} = \\frac{\\pi}{4} + \\frac{k\\pi}{2}$, i.e. $\\pi/4, 3\\pi/4, 5\\pi/4\\,(=-3\\pi/4), 7\\pi/4\\,(=-\\pi/4)$.",
          "Rectangular: $2e^{j\\pi/4} = \\sqrt2 + \\sqrt2 j$, and the others are $-\\sqrt2 + \\sqrt2 j$, $-\\sqrt2 - \\sqrt2 j$, $\\sqrt2 - \\sqrt2 j$. Check: $(\\sqrt2 + \\sqrt2j)^4 = (4j)^2 = -16$. ✓",
          "Second part: $1 - j = \\sqrt2e^{-j\\pi/4}$, so the base is $2\\sqrt2\\,e^{j(\\pi/4 - \\pi/4)} = 2\\sqrt2 \\approx 2.83$, a positive real number.",
          "Square roots: $\\sqrt{2\\sqrt2}\\,e^{j(0 + 2\\pi k)/2}$, i.e. $2^{3/4} \\approx 1.68$ at angle 0 or $\\pi$.",
        ],
        answer: "Fourth roots of $-16$: $\\pm\\sqrt2 \\pm \\sqrt2 j$ (all four sign combinations). $z = \\pm 1.68$.",
      },
      pitfalls: [
        "Giving only one root (the 'calculator' answer) when the question wants all $n$.",
        "Dividing the modulus by $n$ instead of taking the $n$-th root.",
        "Spacing roots by $\\phi/n$ instead of $2\\pi/n$.",
        "Forgetting to convert the base to exponential form first (e.g. not spotting that $2e^{j\\pi/4}(1 - j)$ is real).",
      ],
      recall: [
        { q: "How many roots does $z^6 = 3 + 4j$ have, and what is their modulus?", a: "6 roots, each of modulus $5^{1/6}$, spaced by $\\pi/3$." },
        { q: "Cube roots of $8j$?", a: "$2e^{j\\pi/6}, 2e^{j5\\pi/6}, 2e^{-j\\pi/2}$, i.e. $\\sqrt3 + j$, $-\\sqrt3 + j$, $-2j$." },
        { q: "What is the sum of the 5 fifth roots of any $w \\ne 0$?", a: "0: they are symmetric about the origin (vertices of a regular pentagon)." },
      ],
    },
    {
      title: "Roots of real quadratics",
      intuition:
        "The discriminant tells you how the parabola meets the x-axis: crosses twice, touches once, or misses. When it misses, the roots don't vanish; they move off the real line into the complex plane as a mirror-image (conjugate) pair.",
      keyIdeas: [
        "For $ax^2 + bx + c = 0$ (real $a \\ne 0, b, c$), $\\Delta = b^2 - 4ac$.",
        "$\\Delta > 0$: two distinct real roots. $\\Delta = 0$: one repeated real root $-b/2a$. $\\Delta < 0$: complex-conjugate pair $-\\frac{b}{2a} \\pm j\\frac{\\sqrt{-\\Delta}}{2a}$.",
        "Real coefficients force non-real roots into conjugate pairs (they have equal modulus).",
        "Fundamental theorem of algebra: a degree-$n$ polynomial has exactly $n$ complex roots counted with multiplicity.",
      ],
      formulas: [
        "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a},\\qquad \\sqrt{-d} = j\\sqrt d \\ (d > 0)",
      ],
      example: {
        problem:
          "(Tutorial 8A Q2) $y = -2x^2 + 3x - c$, $c$ real. (a) Find $c$ for a repeated root. (b) Roots when $c = -2$. (c), (d) Nature of roots as $c \\to +\\infty$ and $c \\to -\\infty$.",
        steps: [
          "Here $a = -2$, $b = 3$, constant $= -c$, so $\\Delta = 9 - 4(-2)(-c) = 9 - 8c$.",
          "(a) Repeated root: $9 - 8c = 0 \\Rightarrow c = 9/8$ (root $x = -b/2a = 3/4$).",
          "(b) $c = -2$: $\\Delta = 9 + 16 = 25$, $x = \\frac{-3 \\pm 5}{-4}$, so $x = -\\tfrac12$ or $x = 2$.",
          "(c) $c \\to +\\infty$: $\\Delta = 9 - 8c \\to -\\infty < 0$, so a complex-conjugate pair.",
          "(d) $c \\to -\\infty$: $\\Delta \\to +\\infty > 0$, so two distinct real roots.",
        ],
        answer: "(a) $c = 9/8$; (b) $x = 2, -\\tfrac12$; (c) complex roots; (d) real (distinct) roots.",
      },
      pitfalls: [
        "Sign errors when the constant term is $-c$ rather than $c$.",
        "Forgetting to divide by $2a$ (especially when $a$ is negative).",
        "Claiming a real quadratic can have roots like $2 + 3j$ and $2 - j$: impossible, they must be conjugates.",
      ],
      recall: [
        { q: "Roots of $x^2 + 4x + 13$?", a: "$\\Delta = -36$, so $x = -2 \\pm 3j$." },
        { q: "If $3 - 2j$ is a root of a real quadratic, what is the other root?", a: "$3 + 2j$ (its conjugate)." },
        { q: "What does $\\Delta = 0$ mean geometrically?", a: "The parabola just touches the x-axis: one repeated real root." },
      ],
    },
  ],
  playbook: [
    "If you see a sum or difference of complex numbers → stay in rectangular form and add components.",
    "If you see a product, quotient, power or root → convert to exponential form $re^{j\\theta}$ first.",
    "If you see a fraction with a complex denominator → multiply top and bottom by the denominator's conjugate.",
    "If you need an argument → sketch the point, find the quadrant, use atan2; then reduce into $(-\\pi, \\pi]$.",
    "If an answer option has a sensible modulus but the angle looks 'off by $\\pi$' → it is the quadrant trap; check signs of Re and Im.",
    "If you see $z^n$ → $r^n e^{jn\\theta}$, then reduce the angle mod $2\\pi$ and convert back if needed.",
    "If you see $w^{1/n}$ or 'solve $z^n = w$' → $n$ roots, modulus $|w|^{1/n}$, angles $(\\phi + 2\\pi k)/n$; test each option against this list.",
    "If you see a real quadratic → compute $\\Delta = b^2 - 4ac$ first: $>0$ real distinct, $=0$ repeated, $<0$ conjugate pair.",
    "If you see $e^{j\\theta} \\pm e^{-j\\theta}$ → replace with $2\\cos\\theta$ or $2j\\sin\\theta$.",
    "If you see $z\\bar z$ or need $|z|^2$ → it is $a^2 + b^2$, a real number.",
    "If a True/False claims a single value but the equation has several solutions (e.g. $z^2 = -4 \\Rightarrow z = 2j$) → consider 'Not enough information'.",
    "If you see $|z_1 + z_2|$ with only moduli given → not determined (depends on the angle); products and quotients of moduli are determined.",
  ],
};
