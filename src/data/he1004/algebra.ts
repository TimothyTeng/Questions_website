import type { TopicData } from "@/lib/he1004/types";

// Lecture Note 1 (Introductory Topics I: (Simple) Algebra) and Assignment 1.
// Note: money amounts are written as "dollars" in words because a bare dollar sign is the maths delimiter.
const r = String.raw;

const data: TopicData = {
  id: "algebra",
  sections: [
    // ------------------------------------------------------------------ 1.1
    {
      title: "1.1 The Real Numbers",
      intro: r`The real numbers $\mathbb{R}$ are built up from the integers. Every real number is **either rational or irrational** — never both.`,
      points: [
        { term: "Positive integers (natural numbers)", text: r`$1, 2, 3, 4, \ldots$` },
        { term: "Negative integers", text: r`$-1, -2, -3, -4, \ldots$` },
        { term: "Integers", text: r`The positive integers and the negative integers, together with $0$, make up the integers.` },
        { term: "Even and odd numbers", text: r`Even numbers: $0, \pm 2, \pm 4, \pm 6, \pm 8, \ldots$ Odd numbers: $\pm 1, \pm 3, \pm 5, \pm 7, \ldots$` },
        {
          term: "Rational numbers",
          text: r`A rational number can be written in the form $\dfrac{a}{b}$, where $a$ and $b$ are both integers and $b$ is nonzero.`,
          eg: r`$\frac{1}{2}$, $-\frac{3}{4}$, $5 = \frac{5}{1}$, $9.35 = \frac{935}{100} = \frac{187}{20}$, $0.1666\ldots = \frac{1}{6}$`,
        },
        {
          term: "Irrational numbers",
          text: r`If a real number is not a rational number, then it must be an irrational number. An irrational number **cannot** be written in the form $\frac{a}{b}$ with $a$ and $b$ integers.`,
          eg: r`$\sqrt{2} \approx 1.414\ldots$ and $\pi \approx 3.14159\ldots$ (their decimals never end and never repeat)`,
        },
        { term: "Real numbers", text: r`Real numbers = rational numbers + irrational numbers. Therefore a real number can be either **rational or irrational**.` },
        {
          term: "Recurring decimals are rational",
          text: r`A decimal that ends (e.g. $9.35$) or repeats forever (e.g. $0.1\dot{6} = 0.1666\ldots$) can be written as a fraction of integers, so it is rational.`,
          eg: r`$1 \div 6 = 0.1666\ldots$, so $0.1666\ldots = \frac{1}{6}$.`,
        },
        {
          term: "Sums (Assignment 1 Q1)",
          text: r`The sum of two rationals is always rational: $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$ with $ad+bc$, $bd$ integers and $bd \neq 0$. But the sum of two irrationals **can** be rational: $\sqrt{2} + (-\sqrt{2}) = 0$.`,
        },
      ],
      table: [
        ["Number", "Integer?", "Rational?", "Irrational?"],
        [r`$-3$`, "Yes", r`Yes ($-\frac{3}{1}$)`, "No"],
        [r`$9.35$`, "No", r`Yes ($\frac{187}{20}$)`, "No"],
        [r`$0.1666\ldots$`, "No", r`Yes ($\frac{1}{6}$)`, "No"],
        [r`$\sqrt{2}$`, "No", "No", "Yes"],
        [r`$\pi$`, "No", "No", "Yes"],
      ],
      figures: [
        {
          title: "Rational and irrational numbers on the real line",
          xr: [-3, 4],
          yr: [-1, 1],
          numberLine: true,
          points: [
            { at: [-2, 0], label: "-2" },
            { at: [-0.5, 0], label: "-1/2" },
            { at: [0.75, 0], label: "3/4" },
            { at: [Math.SQRT2, 0], label: "√2", tone: 1 },
            { at: [2.5, 0], label: "5/2" },
            { at: [Math.PI, 0], label: "π", tone: 1 },
          ],
          caption: "Dark points are rational (a/b with integers a, b); orange points √2 and π are irrational. Together they fill the whole real line.",
        },
      ],
      worked: [
        {
          source: "Assignment 1 Q1",
          problem: r`True or false? Justify each answer.
(a) $0.1\dot{6} = 0.1666\ldots$ is a rational number. (b) $9.35$ is an irrational number. (c) The sum of two rational numbers is always a rational number. (d) The sum of two irrational numbers can never be a rational number.`,
          solution: r`(a) **True.** Let $x = 0.1666\ldots$. Then $100x = 16.666\ldots$ and $10x = 1.666\ldots$, so $90x = 15$ and $x = \frac{15}{90} = \frac{1}{6}$ (check: $1 \div 6 = 0.1666\ldots$). It is a ratio of integers with nonzero denominator.
(b) **False.** $9.35 = \frac{935}{100} = \frac{187}{20}$, a ratio of integers, so it is rational.
(c) **True.** If $\frac{a}{b}$ and $\frac{c}{d}$ are rational ($a,b,c,d$ integers, $b,d \neq 0$), then $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$. Here $ad+bc$ and $bd$ are integers and $bd \neq 0$, so the sum is rational.
(d) **False.** Counter-example: $\sqrt{2}$ and $-\sqrt{2}$ are irrational but $\sqrt{2} + (-\sqrt{2}) = 0 = \frac{0}{1}$ is rational.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 1.2
    {
      title: "1.2 Integer Powers",
      intro: r`Powers are used in practically every branch of applied mathematics, including economics — for example, compound interest.`,
      points: [
        { term: "Definition", text: r`If $a$ is any number and $n$ is a positive integer, $a^n = a \times a \times \cdots \times a$ ($n$ factors of $a$). This is the $n$th power of $a$: $a$ is the **base** and $n$ is the **exponent**.` },
        { term: "Zero exponent", text: r`We define $a^0 = 1$ for $a \neq 0$. If $a = 0$, the expression $0^0$ is not defined.`, eg: r`$5(\sqrt{\pi} - \sin 60^\circ)^0 = 5 \times 1 = 5$, since $\sqrt{\pi} - \sin 60^\circ \neq 0$.` },
        { term: "Negative exponent", text: r`We define $a^{-n} = \dfrac{1}{a^n}$, i.e. $a^{-n} = \frac{1}{a} \times \frac{1}{a} \times \cdots \times \frac{1}{a}$ ($n$ factors of $\frac{1}{a}$), for $a \neq 0$.`, eg: r`$2^{-3} = \frac{1}{8}$; $\left(\frac{1}{3^{-2}}\right)^{-2} = (3^2)^{-2} = 9^{-2} = \frac{1}{81}$` },
        { term: "Any integer exponent", text: r`With these definitions the exponent (power) can be any integer. Non-integer (fractional) exponents are covered in 1.5.` },
        { term: "Properties of powers", text: r`(i) $a^r \times a^s = a^{r+s}$; (ii) $(a^r)^s = a^{rs}$; (iii) in general $(a+b)^r \neq a^r + b^r$.`, eg: r`$x^4 x^{15} = x^{19}$; $\dfrac{x^{-2}}{x^5} = x^{-2} \cdot x^{-5} = x^{-7} = \dfrac{1}{x^7}$` },
        { term: "Powers of a product", text: r`From the definition ($n$ factors), a power of a product raises every factor: $(xy)^n = x^n y^n$. This is used in Assignment 1 Q2(b) and (d).`, eg: r`$(x^a x^b y^c)^3 = (x^{a+b} y^c)^3 = x^{3a+3b} y^{3c}$` },
        { term: "Compound interest (one year)", text: r`If the original amount is $K$ dollars and the interest rate is $i\%$ per year, after one year the amount is $K + K \times i\% = K\left(1 + \frac{i}{100}\right)$ dollars. The **growth factor** per year is $1 + \frac{i}{100}$ and the growth is $i\%$.` },
        { term: "Compound interest (t years)", text: r`After $t$ whole years, with interest added to the capital every year, $K$ dollars grows to $K\left(1 + \frac{i}{100}\right)^t$.` },
        { term: "Interpreting t = 0", text: r`$\left(1 + \frac{8}{100}\right)^0 = 1$: after $0$ years no interest has been added, so the amount is still the original $K$.` },
      ],
      formulas: [
        { name: "Definition of a power", tex: r`a^n = \underbrace{a \times a \times \cdots \times a}_{n \text{ factors}}` },
        { name: "Zero and negative exponents", tex: r`a^0 = 1,\qquad a^{-n} = \frac{1}{a^n}\qquad (a \neq 0)` },
        { name: "Property (i)", tex: r`a^r \times a^s = a^{r+s}` },
        { name: "Property (ii)", tex: r`(a^r)^s = a^{rs}` },
        { name: "Property (iii) — a warning", tex: r`(a+b)^r \neq a^r + b^r \ \text{(in general)}` },
        { name: "Compound interest", tex: r`K\left(1 + \frac{i}{100}\right)^t`, note: r`$K$ = original amount, $i\%$ = yearly interest rate, $t$ = number of whole years.` },
      ],
      figures: [
        {
          title: "Compound growth of 1000 dollars",
          x: "t (years)",
          y: "amount",
          xr: [0, 10],
          yr: [900, 2300],
          curves: [
            { f: "1000*1.08^x", label: "8% per year" },
            { f: "1000*1.04^x", label: "4% per year", tone: 1 },
          ],
          points: [
            { at: [0, 1000], label: "1000" },
            { at: [1, 1080], label: "1080", guides: true },
            { at: [4, 1360.49], label: "1360.48", guides: true },
          ],
          caption: "1000(1.08)^t: each year the amount is multiplied by the growth factor 1.08, so the growth speeds up in dollar terms. At t = 0 the amount is the original 1000.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 1 example",
          problem: r`You deposit 1000 dollars in the bank at 8% per year. How much is there (a) by the end of the year, (b) by the end of year 4? (c) How do we interpret $\left(1 + \frac{8}{100}\right)^0$?`,
          solution: r`(a) $K\left(1 + \frac{i}{100}\right) = 1000\left(1 + \frac{8}{100}\right) = 1000 \times 1.08 = 1080$ dollars.
(b) $K\left(1 + \frac{i}{100}\right)^t = 1000\left(1 + \frac{8}{100}\right)^4 = 1000 \times 1.36048896 \approx 1360.48$ dollars.
(c) $\left(1 + \frac{8}{100}\right)^0 = 1$, so $K\left(1 + \frac{8}{100}\right)^0 = K$: after $0$ years the money is still the original deposit.`,
        },
        {
          source: "Assignment 1 Q2(a)–(c), (f), (g)",
          problem: r`Simplify (a) $x^4 x^{15}$ (b) $(x^a x^b y^c)^3$ (c) $\dfrac{x^{-2}}{x^5}$ (f) $\left(\dfrac{1}{3^{-2}}\right)^{-2}$ (g) $5(\sqrt{\pi} - \sin 60)^0$`,
          solution: r`(a) $x^{4+15} = x^{19}$.
(b) $x^a x^b = x^{a+b}$, so $(x^{a+b} y^c)^3 = x^{3(a+b)} y^{3c} = x^{3a+3b} y^{3c}$.
(c) $\frac{x^{-2}}{x^5} = x^{-2} \cdot x^{-5} = x^{-7} = \frac{1}{x^7}$.
(f) $\frac{1}{3^{-2}} = 3^2 = 9$, so the expression is $9^{-2} = \frac{1}{81}$.
(g) $\sqrt{\pi} \approx 1.772$ and $\sin 60 \neq \sqrt{\pi}$, so the base is nonzero and $(\ldots)^0 = 1$. The answer is $5 \times 1 = 5$.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 1.3
    {
      title: "1.3 Rules of Algebra",
      intro: r`If $a$, $b$ and $c$ are arbitrary numbers, the usual rules of algebra hold. The three quadratic identities are the ones you use most.`,
      points: [
        { term: "Order and grouping", text: r`$a + b = b + a$, $(a+b)+c = a+(b+c)$, $ab = ba$, $(ab)c = a(bc)$.` },
        { term: "Zero, one and inverses", text: r`$a + 0 = a$, $a + (-a) = 0$, $1 \cdot a = a$, $a a^{-1} = 1$ for $a \neq 0$.` },
        { term: "Signs", text: r`$(-a)b = a(-b) = -ab$ and $(-a)(-b) = ab$.` },
        { term: "Distributive laws", text: r`$a(b + c) = ab + ac$ and $(a + b)c = ac + bc$.`, eg: r`$(y+a)(y-b) = y^2 - by + ay - ab = y^2 + (a-b)y - ab$` },
        { term: "Quadratic identities", text: r`$(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, and $(a+b)(a-b) = a^2 - b^2$ (the **difference of squares** formula).` },
        { term: "Difference of squares as a shortcut", text: r`Big squares that are close together are easy to subtract: $201^2 - 199^2 = (201+199)(201-199) = 400 \times 2 = 800$.` },
        { term: "Solving equations by factorising", text: r`If a product is $0$, one of the factors is $0$ (Assignment 1 Q5).`, eg: r`$x^2 - 36 = (x-6)(x+6) = 0 \Rightarrow x = \pm 6$; $x^2 + 5x + 6 = (x+2)(x+3) = 0 \Rightarrow x = -2$ or $x = -3$` },
      ],
      formulas: [
        { name: "Commutative / associative", tex: r`a+b=b+a,\quad (a+b)+c=a+(b+c),\quad ab=ba,\quad (ab)c=a(bc)` },
        { name: "Identities and inverses", tex: r`a+0=a,\quad a+(-a)=0,\quad 1\cdot a=a,\quad aa^{-1}=1\ (a\neq 0)` },
        { name: "Sign rules", tex: r`(-a)b=a(-b)=-ab,\qquad (-a)(-b)=ab` },
        { name: "Distributive laws", tex: r`a(b+c)=ab+ac,\qquad (a+b)c=ac+bc` },
        { name: "Square of a sum", tex: r`(a+b)^2=a^2+2ab+b^2` },
        { name: "Square of a difference", tex: r`(a-b)^2=a^2-2ab+b^2` },
        { name: "Difference of squares", tex: r`(a+b)(a-b)=a^2-b^2` },
      ],
      worked: [
        {
          source: "Lecture Note 1 exercise",
          problem: r`Expand or evaluate: 1. $(a+b)^3$ 2. $(y+a)(y-b)$ 3. $201^2 - 199^2$ 4. $\dfrac{1000^2}{252^2 - 248^2}$`,
          solution: r`1. $(a+b)^3 = (a+b)(a+b)^2 = (a+b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3$.
2. $(y+a)(y-b) = y^2 - by + ay - ab = y^2 + (a-b)y - ab$.
3. $201^2 - 199^2 = (201 + 199)(201 - 199) = 400 \times 2 = 800$.
4. $252^2 - 248^2 = (252+248)(252-248) = 500 \times 4 = 2000$, so $\frac{1000^2}{2000} = \frac{1\,000\,000}{2000} = 500$.`,
        },
        {
          source: "Assignment 1 Q4 [PEQ]",
          problem: r`Calculate $\dfrac{100^2}{101^2 - 99^2}$ without using a calculator.`,
          solution: r`Difference of squares: $101^2 - 99^2 = (101 + 99)(101 - 99) = 200 \times 2 = 400$ (check: $10\,201 - 9801 = 400$).
Hence $\frac{100^2}{400} = \frac{10\,000}{400} = 25$.`,
        },
        {
          source: "Assignment 1 Q5(a)–(c) [PEQ]",
          problem: r`Solve (a) $x^2 - 36 = 0$ (b) $x^2 + 5x + 6 = 0$ (c) $4x - 3y = 1$ and $2x + 9y = 4$.`,
          solution: r`(a) $x^2 - 36 = (x-6)(x+6) = 0$, so $x = 6$ or $x = -6$.
(b) Two numbers with product $6$ and sum $5$ are $2$ and $3$: $(x+2)(x+3) = 0$, so $x = -2$ or $x = -3$.
(c) Multiply the first equation by $3$: $12x - 9y = 3$. Add the second: $14x = 7$, so $x = \frac{1}{2}$. Then $4\left(\frac{1}{2}\right) - 3y = 1 \Rightarrow 2 - 3y = 1 \Rightarrow y = \frac{1}{3}$. Check: $2\left(\frac{1}{2}\right) + 9\left(\frac{1}{3}\right) = 1 + 3 = 4$. ✓`,
        },
      ],
    },
    // ------------------------------------------------------------------ 1.4
    {
      title: "1.4 Fractions",
      intro: r`$a \div b = \dfrac{a}{b} = \dfrac{\text{numerator}}{\text{denominator}} = a/b$.`,
      points: [
        { term: "Proper fraction", text: r`If $a < b$ (for positive $a$, $b$), the fraction $\frac{a}{b}$ is called a proper fraction.`, eg: r`$\frac{3}{4}$` },
        { term: "Improper fraction", text: r`If $a > b$, the fraction is called an improper fraction.`, eg: r`$\frac{7}{4}$` },
        { term: "Cancelling a common factor", text: r`$\dfrac{a \cdot c}{b \cdot c} = \dfrac{a}{b}$, where $c$ is the **common factor**; $b$ and $c$ are nonzero.` },
        {
          term: "Only common factors can be removed",
          text: r`$\dfrac{x + y}{x} \neq y$: $x$ is not a common factor of the numerator. But $\dfrac{x + xy}{x} = \dfrac{x(1+y)}{x} = 1 + y$: now $x$ is a common factor and can be removed.`,
        },
        { term: "Signs in fractions", text: r`$\dfrac{-a}{-b} = \dfrac{a}{b}$ and $-\dfrac{a}{b} = \dfrac{(-1)a}{b} = \dfrac{-a}{b}$.` },
        { term: "Adding fractions", text: r`Same denominator: add the numerators. Different denominators: $\dfrac{a}{b} + \dfrac{c}{d} = \dfrac{ad + bc}{bd}$.`, eg: r`$\frac{1}{x-1} - \frac{1}{x+1} = \frac{(x+1) - (x-1)}{(x-1)(x+1)} = \frac{2}{x^2 - 1}$` },
        { term: "Multiplying and dividing", text: r`Multiply numerators and denominators. To divide, multiply by the reciprocal: $\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \cdot \dfrac{d}{c} = \dfrac{ad}{bc}$.` },
        {
          term: "Factorise first",
          text: r`To simplify an algebraic fraction, factorise numerator and denominator (common factor, quadratic identities), then cancel common factors.`,
          eg: r`$\dfrac{K^3 - KL^2}{(K+L)^2} = \dfrac{K(K-L)(K+L)}{(K+L)^2} = \dfrac{K(K-L)}{K+L}$`,
        },
      ],
      formulas: [
        { name: "Cancelling (rule 1)", tex: r`\frac{a\cdot c}{b\cdot c}=\frac{a}{b}\qquad (b\neq 0,\ c\neq 0)` },
        { name: "Signs", tex: r`\frac{-a}{-b}=\frac{(-a)(-1)}{(-b)(-1)}=\frac{a}{b},\qquad -\frac{a}{b}=(-1)\frac{a}{b}=\frac{(-1)a}{b}=\frac{-a}{b}` },
        { name: "Same denominator", tex: r`\frac{a}{c}+\frac{b}{c}=\frac{a+b}{c}` },
        { name: "Different denominators", tex: r`\frac{a}{b}+\frac{c}{d}=\frac{a\cdot d+b\cdot c}{b\cdot d}` },
        { name: "Whole number plus fraction", tex: r`a+\frac{b}{c}=\frac{a\cdot c+b}{c}` },
        { name: "Multiplying", tex: r`a\cdot\frac{b}{c}=\frac{a\cdot b}{c},\qquad \frac{a}{b}\cdot\frac{c}{d}=\frac{a\cdot c}{b\cdot d}` },
        { name: "Dividing", tex: r`\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\cdot\frac{d}{c}=\frac{a\cdot d}{b\cdot c}` },
      ],
      worked: [
        {
          source: "Assignment 1 Q2(d), (e)",
          problem: r`Simplify (d) $\dfrac{L^{\alpha}(LK)^{\beta}}{L^{2\alpha + \beta} K^2}$ (e) $\dfrac{K^3 - KL^2}{(K+L)^2}$`,
          solution: r`(d) $(LK)^{\beta} = L^{\beta} K^{\beta}$, so the numerator is $L^{\alpha + \beta} K^{\beta}$. Dividing: $L^{\alpha + \beta - (2\alpha + \beta)} K^{\beta - 2} = L^{-\alpha} K^{\beta - 2} = \dfrac{K^{\beta - 2}}{L^{\alpha}}$.
(e) Take out the common factor $K$ and use the difference of squares: $K^3 - KL^2 = K(K^2 - L^2) = K(K - L)(K + L)$. Cancel the common factor $K + L$ (assume $K + L \neq 0$): $\dfrac{K(K-L)(K+L)}{(K+L)^2} = \dfrac{K(K-L)}{K+L}$.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 1.5
    {
      title: "1.5 Fractional Powers",
      intro: r`Sometimes the exponent is a fraction rather than an integer.`,
      points: [
        { term: "Definition", text: r`$a^{p/q} = \sqrt[q]{a^p}$, where (in general) $a > 0$, $p$ is an integer and $q$ is a natural number. (Alternatively, $p$ and $q$ are integers with $q \neq 0$.)`, eg: r`$16^{3/4} = \sqrt[4]{16^3} = (\sqrt[4]{16})^3 = 2^3 = 8$` },
        { term: "nth root", text: r`If $p = 1$ and $q = n$ ($n$ a natural number, $a$ positive), $a^{1/n} = \sqrt[n]{a}$ is the $n$th root of $a$.` },
        { term: "Square root", text: r`With $q = n = 2$: $a^{1/2} = \sqrt[2]{a} = \sqrt{a}$. Here $a$ must be **non-negative**, because no real number squared is negative.` },
        { term: "Cube root", text: r`With $q = n = 3$: $a^{1/3} = \sqrt[3]{a}$. Here $a$ **can be negative**, since $q$ is odd.`, eg: r`$(-8)^{1/3} = -2$ because $(-2)^3 = -8$, but $(-16)^{1/4}$ is not a real number.` },
        { term: "Rules carry over", text: r`The properties of powers from 1.2 also hold for fractional exponents.`, eg: r`$(x^{1/2} x^{1/3})^6 = (x^{5/6})^6 = x^5$; $27^{-2/3} = \frac{1}{(\sqrt[3]{27})^2} = \frac{1}{9}$` },
        { term: "Remark", text: r`In general $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$.`, eg: r`$\sqrt{9 + 16} = \sqrt{25} = 5$, but $\sqrt{9} + \sqrt{16} = 7$.` },
        {
          term: "Rationalising a denominator",
          text: r`To make a denominator like $\sqrt{5} - \sqrt{2}$ rational, multiply top and bottom by $\sqrt{5} + \sqrt{2}$ and use the difference of squares: $(\sqrt{5} - \sqrt{2})(\sqrt{5} + \sqrt{2}) = 5 - 2 = 3$.`,
        },
        { term: "Even roots need a non-negative inside", text: r`When an equation contains $\sqrt[4]{x - 6}$ (an even root), any solution must satisfy $x - 6 \ge 0$. Check every candidate.` },
      ],
      formulas: [
        { name: "Fractional power", tex: r`a^{p/q}=\sqrt[q]{a^p}` },
        { name: "nth root", tex: r`a^{1/n}=\sqrt[n]{a}` },
        { name: "Square root (a ≥ 0)", tex: r`a^{1/2}=\sqrt{a}` },
        { name: "Warning", tex: r`\sqrt{a+b}\neq\sqrt{a}+\sqrt{b}\ \text{(in general)}` },
      ],
      figures: [
        {
          title: "y = √x is only defined for x ≥ 0; y = ∛x for every x",
          xr: [-8, 9],
          yr: [-2.5, 3.5],
          curves: [
            { f: "sqrt(x)", label: "y = √x" },
            { f: "cbrt(x)", label: "y = ∛x", tone: 1, dashed: true },
          ],
          points: [{ at: [-8, -2], label: "(-8, -2)", tone: 1 }],
          caption: "Square roots (q even) need a ≥ 0; cube roots (q odd) also work for negative a, e.g. (−8)^(1/3) = −2.",
        },
      ],
      worked: [
        {
          source: "Assignment 1 Q3",
          problem: r`Rationalise the denominator of $\dfrac{1}{\sqrt{5} - \sqrt{2}}$, i.e. make the denominator a rational number.`,
          solution: r`Multiply numerator and denominator by $\sqrt{5} + \sqrt{2}$:
$$\frac{1}{\sqrt{5} - \sqrt{2}} \cdot \frac{\sqrt{5} + \sqrt{2}}{\sqrt{5} + \sqrt{2}} = \frac{\sqrt{5} + \sqrt{2}}{(\sqrt{5})^2 - (\sqrt{2})^2} = \frac{\sqrt{5} + \sqrt{2}}{5 - 2} = \frac{\sqrt{5} + \sqrt{2}}{3}.$$`,
        },
        {
          source: "Assignment 1 Q5(d) [PEQ]",
          problem: r`Solve $x^3 \times \sqrt[4]{x - 6} = 0$ (if it has solutions).`,
          solution: r`A fourth root is an even root, so we need $x - 6 \ge 0$, i.e. $x \ge 6$.
A product is zero only if a factor is zero: $x^3 = 0$ gives $x = 0$, but then $\sqrt[4]{0 - 6} = \sqrt[4]{-6}$ is not a real number, so $x = 0$ is **rejected**. $\sqrt[4]{x - 6} = 0$ gives $x = 6$, which satisfies $x \ge 6$.
The only solution is $x = 6$.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 1.6
    {
      title: "1.6 Inequalities",
      intro: r`Real numbers consist of negative and positive numbers, as well as zero, ordered along the real line.`,
      points: [
        { term: "Strict inequalities", text: r`We use $>$ and $<$ for strict inequalities.`, eg: r`$5 > 3$, $x < 2$` },
        { term: "Weak inequalities", text: r`We use $\ge$ and $\le$ for weak inequalities (equality allowed).`, eg: r`$x \ge 0$, $y \le 4$` },
        { term: "Positive and negative", text: r`For a positive number $a$ we write $a > 0$ ($a$ is greater than zero), or $0 < a$. If $a$ is negative we write $a < 0$ (or $0 > a$).` },
        { term: "Chaining", text: r`If $a > b$ and $b > c$, then $a > c$.` },
        { term: "(a) Multiply by a positive number", text: r`If both sides of an inequality are multiplied by a positive number, the direction of the inequality is **unchanged**: $a > b$ and $c > 0 \Rightarrow ac > bc$.`, eg: r`$5 > 3 \Rightarrow 5 \times 2 > 3 \times 2$, i.e. $10 > 6$` },
        { term: "(b) Multiply by a negative number", text: r`If both sides are multiplied by a negative number, the direction of the inequality is **reversed**: $a > b$ and $c < 0 \Rightarrow ac < bc$.`, eg: r`$5 > 3 \Rightarrow 5 \times (-1) < 3 \times (-1)$, i.e. $-5 < -3$` },
        { term: "Adding inequalities", text: r`If $a > b$ and $c > d$, then $a + c > b + d$.` },
        { term: "Double inequality", text: r`Two inequalities that are valid **simultaneously** are often written as a double inequality. If $x < y$ and $y < z$, we write $x < y < z$ (or $z > y > x$). The inequalities must face the same direction.` },
        {
          term: "When you cannot combine",
          text: r`If $x < y$ and $y > z$, we do not know how $x$ and $z$ compare, so no double inequality can be written: $x < z < y$? $z < x < y$? — either could be true. Forms such as $x < y > z$ are not valid double inequalities.`,
        },
      ],
      formulas: [
        { name: "Transitivity", tex: r`a>b\ \text{and}\ b>c\ \Rightarrow\ a>c` },
        { name: "Multiply by c > 0", tex: r`a>b\ \text{and}\ c>0\ \Rightarrow\ ac>bc` },
        { name: "Multiply by c < 0 (reverse!)", tex: r`a>b\ \text{and}\ c<0\ \Rightarrow\ ac<bc` },
        { name: "Add inequalities", tex: r`a>b\ \text{and}\ c>d\ \Rightarrow\ a+c>b+d` },
      ],
      figures: [
        {
          title: "Multiplying 5 > 3 by −1 reverses the inequality",
          xr: [-6, 6],
          yr: [-1, 1],
          numberLine: true,
          points: [
            { at: [3, 0], label: "3" },
            { at: [5, 0], label: "5" },
            { at: [-3, 0], label: "-3", tone: 1 },
            { at: [-5, 0], label: "-5", tone: 1 },
          ],
          caption: "5 is to the right of 3, but after multiplying by −1 the order flips: −5 is to the LEFT of −3, so −5 < −3.",
        },
      ],
      worked: [
        {
          source: "Modelled on Lecture Note 1 property (b)",
          problem: r`Solve (a) $3 - 2x > 7$ (b) $-1 < 2x + 3 \le 9$. Write each answer as an interval.`,
          solution: r`(a) Subtract $3$ from both sides: $-2x > 4$. Multiply both sides by $-\frac{1}{2}$ (a negative number), which **reverses** the inequality: $x < -2$. Interval: $(-\infty, -2)$.
(b) Subtract $3$ from all three parts: $-4 < 2x \le 6$. Multiply by $\frac{1}{2}$ (positive, direction unchanged): $-2 < x \le 3$. Interval: $(-2, 3]$.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 1.7
    {
      title: "1.7 Intervals and Absolute Values",
      intro: r`If $a$ and $b$ are any two numbers on the real line, the set of all numbers that lie between $a$ and $b$ is called an **interval**.`,
      points: [
        { term: "Open interval", text: r`Endpoints not included: $(a, b)$ is all $x$ with $a < x < b$.`, eg: r`$(2, 9)$: $2 < x < 9$` },
        { term: "Closed interval", text: r`Both endpoints included: $[a, b]$ is all $x$ with $a \le x \le b$.`, eg: r`$[2, 9]$: $2 \le x \le 9$` },
        { term: "Half-open interval", text: r`Only one endpoint included: $(a, b]$ means $a < x \le b$ and $[a, b)$ means $a \le x < b$.`, eg: r`$(2, 9]$ and $[2, 9)$` },
        { term: "Bounded intervals", text: r`The intervals above are all **bounded** intervals: they are bounded by numbers (e.g. $2$ and $9$).` },
        { term: "Unbounded intervals", text: r`Some intervals are unbounded — there is no endpoint on one side: $[a, \infty)$, $(a, \infty)$, $(-\infty, b)$, $(-\infty, b]$, … A round bracket is always used next to $\infty$ or $-\infty$.` },
        { term: "Absolute value", text: r`The distance between $a$ and $0$ on the real line is the absolute value of $a$, written $|a|$. If $a \ge 0$ it is $a$ itself; if $a < 0$ it is the positive number $-a$ (distance must be positive).` },
        { term: "Rewriting |x − 2|", text: r`$|x - 2| = x - 2$ if $x \ge 2$, and $|x - 2| = -(x - 2) = 2 - x$ if $x < 2$.` },
        { term: "Remark (1)", text: r`If $a$ is positive and $|x| < a$, the distance from $x$ to $0$ is less than $a$, so $|x| < a$ implies $-a < x < a$.`, eg: r`$|x - 3| \le 2 \Rightarrow -2 \le x - 3 \le 2 \Rightarrow 1 \le x \le 5$, i.e. $[1, 5]$` },
        { term: "Remark (2)", text: r`If $a$ is non-negative and $|x| \le a$, the distance from $x$ to $0$ is at most $a$, so $|x| \le a$ implies $-a \le x \le a$.` },
      ],
      formulas: [
        { name: "Absolute value", tex: r`|a|=\begin{cases} a, & \text{if } a\ge 0\\ -a, & \text{if } a<0\end{cases}` },
        { name: "|x − 2| without bars", tex: r`|x-2|=\begin{cases} x-2, & \text{if } x\ge 2\\ 2-x, & \text{if } x<2\end{cases}` },
        { name: "Remark (1)", tex: r`|x|<a\ \Rightarrow\ -a<x<a\qquad (a>0)` },
        { name: "Remark (2)", tex: r`|x|\le a\ \Rightarrow\ -a\le x\le a\qquad (a\ge 0)` },
      ],
      table: [
        ["Notation", "Name", "All x satisfying"],
        [r`$(a, b)$`, "open interval from a to b", r`$a < x < b$`],
        [r`$[a, b]$`, "closed interval from a to b", r`$a \le x \le b$`],
        [r`$(a, b]$`, "half-open interval from a to b", r`$a < x \le b$`],
        [r`$[a, b)$`, "half-open interval from a to b", r`$a \le x < b$`],
      ],
      figures: [
        {
          title: "Open interval (2, 9): 2 < x < 9",
          xr: [0, 11],
          yr: [-1, 1],
          numberLine: true,
          segments: [{ from: [2, 0], to: [9, 0] }],
          points: [
            { at: [2, 0], open: true },
            { at: [9, 0], open: true },
          ],
          caption: "Open circles: the endpoints 2 and 9 are NOT included.",
        },
        {
          title: "Closed interval [2, 9]: 2 ≤ x ≤ 9",
          xr: [0, 11],
          yr: [-1, 1],
          numberLine: true,
          segments: [{ from: [2, 0], to: [9, 0] }],
          points: [{ at: [2, 0] }, { at: [9, 0] }],
          caption: "Filled circles: both endpoints are included.",
        },
        {
          title: "Half-open intervals (2, 9] and [2, 9)",
          xr: [0, 11],
          yr: [-1, 1],
          numberLine: true,
          segments: [{ from: [2, 0], to: [9, 0] }],
          points: [
            { at: [2, 0], open: true },
            { at: [9, 0] },
          ],
          labels: [{ at: [5.5, 0], text: "(2, 9]: 2 < x ≤ 9" }],
          caption: "Only one endpoint is included. Shown: (2, 9]. For [2, 9) the circles swap: 2 filled, 9 open.",
        },
        {
          title: "Unbounded interval [2, ∞): x ≥ 2",
          xr: [0, 11],
          yr: [-1, 1],
          numberLine: true,
          segments: [{ from: [2, 0], to: [10.8, 0], arrow: true }],
          points: [{ at: [2, 0] }],
          caption: "No right-hand endpoint: the interval continues forever to the right.",
        },
        {
          title: "|x| < 3 means −3 < x < 3",
          xr: [-5, 5],
          yr: [-1, 1],
          numberLine: true,
          segments: [{ from: [-3, 0], to: [3, 0] }],
          points: [
            { at: [-3, 0], open: true },
            { at: [3, 0], open: true },
            { at: [0, 0], label: "0" },
          ],
          caption: "All points whose distance from 0 is less than 3: the open interval (−3, 3).",
        },
        {
          title: "y = |x − 2|",
          xr: [-2, 6],
          yr: [-0.5, 4.5],
          curves: [{ f: "abs(x-2)", label: "y = |x − 2|" }],
          points: [{ at: [2, 0], label: "(2, 0)" }],
          labels: [
            { at: [-0.2, 3.3], text: "2 − x  (x < 2)" },
            { at: [3.9, 3.3], text: "x − 2  (x ≥ 2)" },
          ],
          caption: "The distance from x to 2: it equals x − 2 to the right of 2 and 2 − x to the left.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 1 example",
          problem: r`Use the definition of absolute value to rewrite $|x - 2|$ without absolute-value signs.`,
          solution: r`Apply $|a| = a$ if $a \ge 0$ and $|a| = -a$ if $a < 0$ with $a = x - 2$:
$$|x - 2| = \begin{cases} x - 2, & \text{if } x \ge 2 \\ -(x - 2) = 2 - x, & \text{if } x < 2 \end{cases}$$`,
        },
        {
          source: "Modelled on Lecture Note 1 remarks",
          problem: r`Solve $|2x + 1| < 5$ and write the answer as an interval.`,
          solution: r`By remark (1), $|2x + 1| < 5$ implies $-5 < 2x + 1 < 5$. Subtract $1$: $-6 < 2x < 4$. Multiply by $\frac{1}{2}$ (positive): $-3 < x < 2$. Answer: the open interval $(-3, 2)$.`,
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "algebra-c1", type: "concept", front: r`The numbers $1, 2, 3, 4, \ldots$ (the positive integers).`, back: "natural numbers", why: "Positive integers are also called natural numbers. Adding the negative integers and 0 gives the integers." },
    { id: "algebra-c2", type: "concept", front: r`A number that can be written as $\frac{a}{b}$ with $a$, $b$ integers and $b \neq 0$.`, back: "rational number", why: r`E.g. $\frac{1}{2}$, $5 = \frac{5}{1}$, $9.35 = \frac{187}{20}$, $0.1666\ldots = \frac{1}{6}$.` },
    { id: "algebra-c3", type: "concept", front: r`A real number that cannot be written as $\frac{a}{b}$ with $a$, $b$ integers.`, back: "irrational number", why: r`E.g. $\sqrt{2}$ and $\pi$. Every real number is either rational or irrational.` },
    { id: "algebra-c4", type: "concept", front: r`In $a^n$, the name of $n$.`, back: "exponent", why: r`$a$ is the base and $n$ is the exponent (or power): $a^n$ is the $n$th power of $a$.` },
    { id: "algebra-c5", type: "concept", front: r`A fraction $\frac{a}{b}$ with $a < b$ (e.g. $\frac{3}{4}$).`, back: "proper fraction", why: r`If instead $a > b$ (e.g. $\frac{7}{4}$) it is an improper fraction.` },
    { id: "algebra-c6", type: "concept", front: r`A fraction $\frac{a}{b}$ with $a > b$ (e.g. $\frac{7}{4}$).`, back: "improper fraction", why: r`If $a < b$ the fraction is proper.` },
    { id: "algebra-c7", type: "concept", front: r`In $\frac{a \cdot c}{b \cdot c} = \frac{a}{b}$, what is $c$ called?`, back: "common factor", why: r`Only a common factor (a factor of the WHOLE numerator and the WHOLE denominator) can be cancelled: $\frac{x + y}{x} \neq y$, but $\frac{x + xy}{x} = 1 + y$.` },
    { id: "algebra-c8", type: "concept", front: r`The formula $(a+b)(a-b) = a^2 - b^2$.`, back: "difference of squares", why: r`Used to evaluate $201^2 - 199^2$ quickly, to factorise $x^2 - 36$, and to rationalise $\frac{1}{\sqrt{5} - \sqrt{2}}$.` },
    { id: "algebra-c9", type: "concept", front: r`An inequality written with $>$ or $<$ (equality not allowed).`, back: "strict inequality", why: r`$\ge$ and $\le$ give weak inequalities.` },
    { id: "algebra-c10", type: "concept", front: r`An inequality written with $\ge$ or $\le$.`, back: "weak inequality", why: r`Weak inequalities allow equality, e.g. $x \ge 0$.` },
    { id: "algebra-c11", type: "concept", front: r`The set of all $x$ with $a < x < b$ — neither endpoint included.`, back: "open interval", why: r`Written $(a, b)$; drawn with open circles at $a$ and $b$.` },
    { id: "algebra-c12", type: "concept", front: r`The set of all $x$ with $a \le x \le b$ — both endpoints included.`, back: "closed interval", why: r`Written $[a, b]$; drawn with filled circles at $a$ and $b$.` },
    { id: "algebra-c13", type: "concept", front: r`An interval such as $(a, b]$ or $[a, b)$ that includes exactly one endpoint.`, back: "half-open interval", why: r`$(a, b]$: $a < x \le b$; $[a, b)$: $a \le x < b$.` },
    { id: "algebra-c14", type: "concept", front: r`The distance between a real number $a$ and $0$ on the real line.`, back: "absolute value", why: r`Written $|a|$: equals $a$ if $a \ge 0$ and $-a$ if $a < 0$.` },
    { id: "algebra-c15", type: "concept", front: r`Two inequalities that hold simultaneously and face the same way, written together as $x < y < z$.`, back: "double inequality", why: r`Only possible when both face the same direction: $x < y$ and $y < z$. From $x < y$ and $y > z$ no double inequality can be formed.` },

    // method
    {
      id: "algebra-m1", type: "method",
      front: r`True/False: $0.1666\ldots$ ($0.1\dot{6}$) is a rational number.`,
      back: r`True — it equals $\frac{1}{6}$, a ratio of integers.`,
      why: r`Let $x = 0.1666\ldots$. Then $100x = 16.666\ldots$ and $10x = 1.666\ldots$; subtracting, $90x = 15$, so $x = \frac{15}{90} = \frac{1}{6}$. A repeating decimal is always rational. (Similarly $9.35 = \frac{187}{20}$ is rational, so "9.35 is irrational" is false.)`,
    },
    {
      id: "algebra-m2", type: "method",
      front: r`Prove: the sum of two rational numbers is always rational.`,
      back: r`Write them as $\frac{a}{b}$, $\frac{c}{d}$; the sum $\frac{ad + bc}{bd}$ is a ratio of integers with $bd \neq 0$.`,
      why: r`1. Let the numbers be $\frac{a}{b}$ and $\frac{c}{d}$ with $a, b, c, d$ integers, $b, d \neq 0$.
2. $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$.
3. $ad + bc$ and $bd$ are integers (products and sums of integers) and $bd \neq 0$.
4. So the sum has the form (integer)/(nonzero integer): it is rational.`,
    },
    {
      id: "algebra-m3", type: "method",
      front: r`True/False: the sum of two irrational numbers can never be rational.`,
      back: r`False — counter-example: $\sqrt{2} + (-\sqrt{2}) = 0$.`,
      why: r`To disprove an "always/never" statement, one counter-example is enough. $\sqrt{2}$ and $-\sqrt{2}$ are both irrational, but their sum $0 = \frac{0}{1}$ is rational. (Another: $(1 + \sqrt{2}) + (1 - \sqrt{2}) = 2$.)`,
    },
    {
      id: "algebra-m4", type: "method",
      front: r`Simplify $\dfrac{L^{\alpha}(LK)^{\beta}}{L^{2\alpha + \beta}K^2}$.`,
      back: r`$L^{-\alpha}K^{\beta - 2} = \dfrac{K^{\beta - 2}}{L^{\alpha}}$`,
      why: r`1. Expand the product power: $(LK)^{\beta} = L^{\beta}K^{\beta}$.
2. Combine powers of the same base: numerator $= L^{\alpha + \beta}K^{\beta}$.
3. Divide by subtracting exponents ($a^r \cdot a^{-s} = a^{r-s}$): $L^{\alpha + \beta - 2\alpha - \beta}K^{\beta - 2} = L^{-\alpha}K^{\beta - 2}$.`,
    },
    {
      id: "algebra-m5", type: "method",
      front: r`Simplify $\dfrac{K^3 - KL^2}{(K + L)^2}$.`,
      back: r`$\dfrac{K(K - L)}{K + L}$ — factorise, then cancel the common factor $K + L$.`,
      why: r`1. Common factor: $K^3 - KL^2 = K(K^2 - L^2)$.
2. Difference of squares: $K^2 - L^2 = (K - L)(K + L)$.
3. $\frac{K(K-L)(K+L)}{(K+L)(K+L)}$ — cancel one $(K + L)$ (assuming $K + L \neq 0$).
Never cancel terms that are added: only whole factors.`,
    },
    {
      id: "algebra-m6", type: "method",
      front: r`Evaluate $\left(\dfrac{1}{3^{-2}}\right)^{-2}$.`,
      back: r`$\frac{1}{81}$`,
      why: r`1. $3^{-2} = \frac{1}{9}$, so $\frac{1}{3^{-2}} = 9 = 3^2$.
2. $(3^2)^{-2} = 3^{-4} = \frac{1}{81}$ (or $9^{-2} = \frac{1}{81}$).`,
    },
    {
      id: "algebra-m7", type: "method",
      front: r`Evaluate $5(\sqrt{\pi} - \sin 60)^0$.`,
      back: r`$5$ — any nonzero number to the power $0$ is $1$.`,
      why: r`$a^0 = 1$ for $a \neq 0$. Check the base is nonzero: $\sqrt{\pi} \approx 1.772$ while $\sin 60$ is at most $1$, so $\sqrt{\pi} - \sin 60 \neq 0$. Hence $5 \times 1 = 5$. (Only $0^0$ is undefined.)`,
    },
    {
      id: "algebra-m8", type: "method",
      front: r`How do you rationalise the denominator of $\dfrac{1}{\sqrt{5} - \sqrt{2}}$?`,
      back: r`Multiply top and bottom by $\sqrt{5} + \sqrt{2}$: answer $\dfrac{\sqrt{5} + \sqrt{2}}{3}$.`,
      why: r`Multiply by the same expression with the opposite sign so the difference of squares removes the roots:
$(\sqrt{5} - \sqrt{2})(\sqrt{5} + \sqrt{2}) = 5 - 2 = 3$ (rational). Numerator becomes $\sqrt{5} + \sqrt{2}$.`,
    },
    {
      id: "algebra-m9", type: "method",
      front: r`Calculate $\dfrac{100^2}{101^2 - 99^2}$ without a calculator.`,
      back: r`Difference of squares: denominator $= 200 \times 2 = 400$, so the answer is $25$.`,
      why: r`$101^2 - 99^2 = (101 + 99)(101 - 99) = 200 \times 2 = 400$. Then $\frac{10\,000}{400} = 25$. Same idea: $\frac{1000^2}{252^2 - 248^2} = \frac{1\,000\,000}{500 \times 4} = 500$.`,
    },
    {
      id: "algebra-m10", type: "method",
      front: r`Solve $x^2 + 5x + 6 = 0$.`,
      back: r`Factorise: $(x + 2)(x + 3) = 0$, so $x = -2$ or $x = -3$.`,
      why: r`Find two numbers whose product is $6$ and whose sum is $5$: $2$ and $3$. A product is $0$ only if a factor is $0$. Similarly $x^2 - 36 = (x - 6)(x + 6) = 0$ gives $x = \pm 6$.`,
    },
    {
      id: "algebra-m11", type: "method",
      front: r`Solve the system $4x - 3y = 1$, $2x + 9y = 4$.`,
      back: r`Eliminate $y$: $x = \frac{1}{2}$, $y = \frac{1}{3}$.`,
      why: r`1. Multiply the first equation by $3$: $12x - 9y = 3$.
2. Add to the second: $14x = 7$, so $x = \frac{1}{2}$.
3. Substitute: $4 \cdot \frac{1}{2} - 3y = 1 \Rightarrow y = \frac{1}{3}$.
4. Check in the second equation: $1 + 3 = 4$. ✓`,
    },
    {
      id: "algebra-m12", type: "method",
      front: r`Solve $x^3 \times \sqrt[4]{x - 6} = 0$.`,
      back: r`$x = 6$ only ($x = 0$ is rejected because $\sqrt[4]{-6}$ is not real).`,
      why: r`1. Domain: an even (4th) root needs $x - 6 \ge 0$, so $x \ge 6$.
2. Set each factor to $0$: $x^3 = 0 \Rightarrow x = 0$ (not in the domain — reject); $\sqrt[4]{x - 6} = 0 \Rightarrow x = 6$ (valid).`,
    },
    {
      id: "algebra-m13", type: "method",
      front: r`How much does $K$ dollars grow to after $t$ years at $i\%$ per year compound interest? (e.g. 1000 at 8% for 4 years)`,
      back: r`$K\left(1 + \frac{i}{100}\right)^t$; e.g. $1000(1.08)^4 \approx 1360.48$.`,
      why: r`Each year the amount is multiplied by the growth factor $1 + \frac{i}{100}$, so after $t$ years it is multiplied $t$ times. $1000 \times 1.08^4 = 1000 \times 1.36048896 \approx 1360.48$ dollars. At $t = 0$ the factor is $1.08^0 = 1$: the amount is the original deposit.`,
    },
    {
      id: "algebra-m14", type: "method",
      front: r`Solve $3 - 2x > 7$.`,
      back: r`$-2x > 4$; dividing by $-2$ reverses the sign: $x < -2$, i.e. $(-\infty, -2)$.`,
      why: r`1. Subtract $3$ from both sides: $-2x > 4$.
2. Multiply both sides by $-\frac{1}{2}$, a NEGATIVE number, so the direction is reversed: $x < -2$.
Multiplying by a positive number keeps the direction.`,
    },
    {
      id: "algebra-m15", type: "method",
      front: r`Solve $|x - 3| \le 2$.`,
      back: r`$-2 \le x - 3 \le 2$, so $1 \le x \le 5$, i.e. $[1, 5]$.`,
      why: r`Use $|u| \le a \Rightarrow -a \le u \le a$ with $u = x - 3$, $a = 2$. Add $3$ to all three parts: $1 \le x \le 5$. Weak inequality → closed interval. (For $|u| < a$ you get $-a < u < a$ and an open interval.)`,
    },
    {
      id: "algebra-m16", type: "method",
      front: r`Rewrite $|x - 2|$ without absolute-value signs.`,
      back: r`$x - 2$ if $x \ge 2$; $2 - x$ if $x < 2$.`,
      why: r`Apply $|a| = a$ for $a \ge 0$ and $|a| = -a$ for $a < 0$ with $a = x - 2$. $x - 2 \ge 0 \iff x \ge 2$; otherwise $|x - 2| = -(x - 2) = 2 - x$.`,
    },
    {
      id: "algebra-m17", type: "method",
      front: r`Expand $(a + b)^3$.`,
      back: r`$a^3 + 3a^2b + 3ab^2 + b^3$`,
      why: r`$(a + b)^3 = (a + b)(a + b)^2 = (a + b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3$.`,
    },
    {
      id: "algebra-m18", type: "method",
      front: r`Given $x < y$ and $y > z$, can you write a double inequality?`,
      back: r`No — the relation between $x$ and $z$ is unknown.`,
      why: r`A double inequality needs both inequalities facing the same direction ($x < y$ and $y < z$ gives $x < y < z$). With $x < y$, $y > z$: $x = 1, y = 5, z = 2$ gives $x < z < y$, but $x = 3, y = 5, z = 1$ gives $z < x < y$. Either can happen.`,
    },

    // formula
    { id: "algebra-f1", type: "formula", front: "Property (i) of powers: product of powers", back: r`$a^r \times a^s = a^{r+s}$`, why: r`Multiply powers of the same base by adding exponents, e.g. $x^4 x^{15} = x^{19}$.` },
    { id: "algebra-f2", type: "formula", front: "Property (ii) of powers: power of a power", back: r`$(a^r)^s = a^{rs}$`, why: r`E.g. $(3^2)^{-2} = 3^{-4}$. Property (iii) warns $(a + b)^r \neq a^r + b^r$.` },
    { id: "algebra-f3", type: "formula", front: "Zero and negative exponents", back: r`$a^0 = 1$, $a^{-n} = \frac{1}{a^n}$ ($a \neq 0$)`, why: r`$a^{-n}$ is $n$ factors of $\frac{1}{a}$. $0^0$ is not defined.` },
    { id: "algebra-f4", type: "formula", front: "Compound interest: K dollars at i% per year for t years", back: r`$K\left(1 + \frac{i}{100}\right)^t$`, why: r`Growth factor per year: $1 + \frac{i}{100}$. Interest is added to the capital every year.` },
    { id: "algebra-f5", type: "formula", front: "The three quadratic identities", back: r`$(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$`, why: "Use them to expand, to factorise, to do mental arithmetic (201² − 199²) and to rationalise denominators." },
    { id: "algebra-f6", type: "formula", front: "Adding fractions with different denominators", back: r`$\dfrac{a}{b} + \dfrac{c}{d} = \dfrac{ad + bc}{bd}$`, why: r`Also used to prove the sum of two rationals is rational.` },
    { id: "algebra-f7", type: "formula", front: "Dividing fractions", back: r`$\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \cdot \dfrac{d}{c} = \dfrac{ad}{bc}$`, why: "Multiply by the reciprocal of the divisor." },
    { id: "algebra-f8", type: "formula", front: "Fractional power", back: r`$a^{p/q} = \sqrt[q]{a^p}$`, why: r`$a^{1/n} = \sqrt[n]{a}$. For even $q$ (e.g. square roots) $a$ must be non-negative; for odd $q$ (cube roots) $a$ can be negative.` },
    { id: "algebra-f9", type: "formula", front: "Definition of absolute value", back: r`$|a| = a$ if $a \ge 0$; $|a| = -a$ if $a < 0$`, why: "It is the distance from a to 0, so it is never negative." },
    { id: "algebra-f10", type: "formula", front: "|x| < a and |x| ≤ a as double inequalities", back: r`$|x| < a \Rightarrow -a < x < a$; $|x| \le a \Rightarrow -a \le x \le a$`, why: r`Distance from $x$ to $0$ less than (or at most) $a$. Use it to solve $|x - 3| \le 2$ etc.` },
    { id: "algebra-f11", type: "formula", front: "Multiplying an inequality a > b by c", back: r`$c > 0$: $ac > bc$ (unchanged); $c < 0$: $ac < bc$ (reversed)`, why: r`E.g. $5 > 3 \Rightarrow -5 < -3$ after multiplying by $-1$.` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 1.1
    {
      id: "algebra-q1", kind: "mcq", sub: "Real numbers",
      prompt: r`Which of the following is an irrational number?`,
      options: [r`$0.1666\ldots$`, r`$9.35$`, r`$\sqrt{2}$`, r`$\sqrt{9}$`],
      answer: 2,
      explain: r`$0.1666\ldots = \frac{1}{6}$, $9.35 = \frac{187}{20}$ and $\sqrt{9} = 3$ are all rational. $\sqrt{2}$ cannot be written as a ratio of integers.`,
    },
    {
      id: "algebra-q2", kind: "mcq", sub: "Real numbers",
      prompt: r`The repeating decimal $0.1666\ldots$ equals`,
      options: [r`$\frac{1}{6}$`, r`$\frac{1}{16}$`, r`$\frac{16}{100}$`, r`$\frac{166}{1000}$`],
      answer: 0,
      explain: r`$x = 0.1666\ldots$: $100x - 10x = 16.666\ldots - 1.666\ldots = 15$, so $x = \frac{15}{90} = \frac{1}{6}$. The other options are finite decimals ($0.0625$, $0.16$, $0.166$).`,
    },
    {
      id: "algebra-q3", kind: "mcq", sub: "Real numbers",
      prompt: r`Which statement is TRUE?`,
      options: [
        "The sum of two irrational numbers is always irrational.",
        "The sum of two rational numbers is always rational.",
        r`$9.35$ is irrational because it has decimals.`,
        "Every real number is rational.",
      ],
      answer: 1,
      explain: r`$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$ is a ratio of integers. $\sqrt{2} + (-\sqrt{2}) = 0$ disproves the first; $9.35 = \frac{187}{20}$ is rational; $\sqrt{2}$ is a real number that is not rational.`,
    },
    {
      id: "algebra-q4", kind: "fill", sub: "Real numbers",
      prompt: r`An irrational number ____ be written in the form $\frac{a}{b}$ where $a$ and $b$ are integers.`,
      answers: [["cannot", "can not", "can't"]],
      explain: r`By definition an irrational number is a real number that is not rational, so it cannot be written as $\frac{a}{b}$.`,
    },
    // 1.2
    {
      id: "algebra-q5", kind: "fill", sub: "Integer powers",
      prompt: r`$2^{-3} =$ ____ (as a decimal or fraction)`,
      answers: [["0.125", "1/8"]],
      explain: r`$a^{-n} = \frac{1}{a^n}$, so $2^{-3} = \frac{1}{2^3} = \frac{1}{8} = 0.125$.`,
    },
    {
      id: "algebra-q6", kind: "mcq", sub: "Integer powers",
      prompt: r`$x^4 x^{15} =$`,
      options: [r`$x^{19}$`, r`$x^{60}$`, r`$x^{11}$`, r`$2x^{19}$`],
      answer: 0,
      explain: r`Property (i): $a^r \times a^s = a^{r+s}$, so $x^{4+15} = x^{19}$. Multiplying the exponents ($x^{60}$) is the rule for $(a^r)^s$.`,
    },
    {
      id: "algebra-q7", kind: "mcq", sub: "Integer powers",
      prompt: r`$(x^a x^b y^c)^3 =$`,
      options: [r`$x^{3a+3b}y^{3c}$`, r`$x^{3ab}y^{3c}$`, r`$x^{a+b+3}y^{c+3}$`, r`$x^{3a+3b}y^{c}$`],
      answer: 0,
      explain: r`$x^a x^b = x^{a+b}$; cubing raises every factor to the power 3: $(x^{a+b})^3 (y^c)^3 = x^{3a+3b}y^{3c}$.`,
    },
    {
      id: "algebra-q8", kind: "mcq", sub: "Integer powers",
      prompt: r`$\dfrac{x^{-2}}{x^5} =$`,
      options: [r`$\dfrac{1}{x^7}$`, r`$x^3$`, r`$\dfrac{1}{x^3}$`, r`$x^{-10}$`],
      answer: 0,
      explain: r`$\frac{x^{-2}}{x^5} = x^{-2} \cdot x^{-5} = x^{-7} = \frac{1}{x^7}$.`,
    },
    {
      id: "algebra-q9", kind: "fill", sub: "Integer powers",
      prompt: r`$\left(\dfrac{1}{3^{-2}}\right)^{-2} = \dfrac{1}{n}$ where $n =$ ____`,
      answers: [["81"]],
      explain: r`$\frac{1}{3^{-2}} = 3^2 = 9$, and $9^{-2} = \frac{1}{81}$.`,
    },
    {
      id: "algebra-q10", kind: "mcq", sub: "Integer powers",
      prompt: r`$5(\sqrt{\pi} - \sin 60)^0 =$`,
      options: [r`$5$`, r`$0$`, r`$1$`, r`$5(\sqrt{\pi} - \sin 60)$`],
      answer: 0,
      explain: r`The base $\sqrt{\pi} - \sin 60$ is not zero, and $a^0 = 1$ for $a \neq 0$. So the value is $5 \times 1 = 5$. (The power applies only to the bracket, not to the 5.)`,
    },
    {
      id: "algebra-q11", kind: "mcq", sub: "Integer powers",
      prompt: r`Which of these is NOT true in general?`,
      options: [r`$(a + b)^r = a^r + b^r$`, r`$a^r \times a^s = a^{r+s}$`, r`$(a^r)^s = a^{rs}$`, r`$a^{-n} = \frac{1}{a^n}$ for $a \neq 0$`],
      answer: 0,
      explain: r`Property (iii): $(a + b)^r \neq a^r + b^r$ in general, e.g. $(1 + 1)^2 = 4$ but $1^2 + 1^2 = 2$.`,
    },
    {
      id: "algebra-q12", kind: "fill", sub: "Compound interest",
      prompt: r`1000 dollars is deposited at 8% interest per year. By the end of the first year it has grown to ____ dollars.`,
      answers: [["1080"]],
      explain: r`$K\left(1 + \frac{i}{100}\right) = 1000 \times 1.08 = 1080$.`,
    },
    {
      id: "algebra-q13", kind: "fill", sub: "Compound interest",
      prompt: r`1000 dollars at 8% compound interest per year grows to ____ dollars by the end of year 4 (2 d.p.).`,
      answers: [["1360.49", "1360.48"]],
      explain: r`$1000\left(1 + \frac{8}{100}\right)^4 = 1000 \times 1.36048896 = 1360.48896 \approx 1360.49$ (the lecture note writes $\approx 1360.48$).`,
    },
    {
      id: "algebra-q14", kind: "mcq", sub: "Compound interest",
      prompt: r`How should $K\left(1 + \frac{8}{100}\right)^0$ be interpreted?`,
      options: [
        r`The amount after $0$ years — the original deposit $K$`,
        "The amount after one year",
        "Zero: no money after 0 years",
        "The interest earned in the first year",
      ],
      answer: 0,
      explain: r`$\left(1 + \frac{8}{100}\right)^0 = 1$, so the expression equals $K$: before any interest is added, you still have your original deposit.`,
    },
    {
      id: "algebra-q15", kind: "fill", sub: "Compound interest",
      prompt: r`5000 dollars at 4% compound interest per year is worth ____ dollars after 2 years.`,
      answers: [["5408"]],
      explain: r`$5000(1.04)^2 = 5000 \times 1.0816 = 5408$.`,
    },
    // 1.3
    {
      id: "algebra-q16", kind: "mcq", sub: "Quadratic identities",
      prompt: r`$(a - b)^2 =$`,
      options: [r`$a^2 - 2ab + b^2$`, r`$a^2 - b^2$`, r`$a^2 + b^2$`, r`$a^2 - 2ab - b^2$`],
      answer: 0,
      explain: r`$(a - b)(a - b) = a^2 - ab - ab + b^2 = a^2 - 2ab + b^2$. $a^2 - b^2$ is $(a + b)(a - b)$.`,
    },
    {
      id: "algebra-q17", kind: "mcq", sub: "Rules of algebra",
      prompt: r`$(y + a)(y - b) =$`,
      options: [r`$y^2 + (a - b)y - ab$`, r`$y^2 + (a + b)y - ab$`, r`$y^2 - ab$`, r`$y^2 + (a - b)y + ab$`],
      answer: 0,
      explain: r`Distributive law: $y \cdot y - y \cdot b + a \cdot y - a \cdot b = y^2 + (a - b)y - ab$.`,
    },
    {
      id: "algebra-q18", kind: "mcq", sub: "Rules of algebra",
      prompt: r`$(a + b)^3 =$`,
      options: [r`$a^3 + 3a^2b + 3ab^2 + b^3$`, r`$a^3 + b^3$`, r`$a^3 + 2a^2b + 2ab^2 + b^3$`, r`$a^3 + 3ab + b^3$`],
      answer: 0,
      explain: r`$(a + b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3$.`,
    },
    {
      id: "algebra-q19", kind: "fill", sub: "Difference of squares",
      prompt: r`Without a calculator: $201^2 - 199^2 =$ ____`,
      answers: [["800"]],
      explain: r`$(201 + 199)(201 - 199) = 400 \times 2 = 800$.`,
    },
    {
      id: "algebra-q20", kind: "fill", sub: "Difference of squares",
      prompt: r`$\dfrac{1000^2}{252^2 - 248^2} =$ ____`,
      answers: [["500"]],
      explain: r`$252^2 - 248^2 = (500)(4) = 2000$, and $\frac{1\,000\,000}{2000} = 500$.`,
    },
    {
      id: "algebra-q21", kind: "fill", sub: "Difference of squares",
      prompt: r`$\dfrac{100^2}{101^2 - 99^2} =$ ____`,
      answers: [["25"]],
      explain: r`$101^2 - 99^2 = (101 + 99)(101 - 99) = 200 \times 2 = 400$, so $\frac{10\,000}{400} = 25$.`,
    },
    {
      id: "algebra-q22", kind: "mcq", sub: "Solving equations",
      prompt: r`The solutions of $x^2 + 5x + 6 = 0$ are`,
      options: [r`$x = -2$ and $x = -3$`, r`$x = 2$ and $x = 3$`, r`$x = -1$ and $x = -6$`, r`$x = 1$ and $x = 6$`],
      answer: 0,
      explain: r`$x^2 + 5x + 6 = (x + 2)(x + 3)$ ($2 \times 3 = 6$, $2 + 3 = 5$). Setting each factor to zero gives $x = -2$ or $x = -3$.`,
    },
    {
      id: "algebra-q23", kind: "mcq", sub: "Solving equations",
      prompt: r`Solve $4x - 3y = 1$ and $2x + 9y = 4$.`,
      options: [r`$x = \frac{1}{2},\ y = \frac{1}{3}$`, r`$x = \frac{1}{3},\ y = \frac{1}{2}$`, r`$x = 1,\ y = 1$`, r`$x = \frac{1}{2},\ y = -\frac{1}{3}$`],
      answer: 0,
      explain: r`$3 \times$ (first): $12x - 9y = 3$. Add the second: $14x = 7 \Rightarrow x = \frac{1}{2}$. Then $2 - 3y = 1 \Rightarrow y = \frac{1}{3}$. Check: $1 + 3 = 4$. ✓`,
    },
    // 1.4
    {
      id: "algebra-q24", kind: "mcq", sub: "Fractions",
      prompt: r`Which simplification is correct (for $x \neq 0$)?`,
      options: [r`$\dfrac{x + xy}{x} = 1 + y$`, r`$\dfrac{x + y}{x} = y$`, r`$\dfrac{x + y}{x} = 1 + y$`, r`$\dfrac{x + xy}{x} = xy$`],
      answer: 0,
      explain: r`Only common factors cancel. $x + xy = x(1 + y)$ has the common factor $x$, so $\frac{x(1+y)}{x} = 1 + y$. In $\frac{x + y}{x}$, $x$ is not a factor of the numerator: $\frac{x + y}{x} = 1 + \frac{y}{x}$.`,
    },
    {
      id: "algebra-q25", kind: "mcq", sub: "Fractions",
      prompt: r`$\dfrac{a}{b} + \dfrac{c}{d} =$`,
      options: [r`$\dfrac{ad + bc}{bd}$`, r`$\dfrac{a + c}{b + d}$`, r`$\dfrac{ac}{bd}$`, r`$\dfrac{ab + cd}{bd}$`],
      answer: 0,
      explain: r`Put both over the common denominator $bd$: $\frac{ad}{bd} + \frac{bc}{bd} = \frac{ad + bc}{bd}$. Adding tops and bottoms separately is a classic mistake.`,
    },
    {
      id: "algebra-q26", kind: "mcq", sub: "Fractions",
      prompt: r`$\dfrac{a}{b} \div \dfrac{c}{d} =$`,
      options: [r`$\dfrac{ad}{bc}$`, r`$\dfrac{ac}{bd}$`, r`$\dfrac{bc}{ad}$`, r`$\dfrac{a}{bcd}$`],
      answer: 0,
      explain: r`Multiply by the reciprocal: $\frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc}$.`,
    },
    {
      id: "algebra-q27", kind: "mcq", sub: "Fractions",
      prompt: r`$\dfrac{K^3 - KL^2}{(K + L)^2}$ simplifies to`,
      options: [r`$\dfrac{K(K - L)}{K + L}$`, r`$K - L$`, r`$\dfrac{K^3 - KL^2}{K^2 + L^2}$`, r`$\dfrac{K}{K + L}$`],
      answer: 0,
      explain: r`$K^3 - KL^2 = K(K^2 - L^2) = K(K - L)(K + L)$. Cancel one factor $K + L$: $\frac{K(K - L)}{K + L}$.`,
    },
    {
      id: "algebra-q28", kind: "mcq", sub: "Fractions",
      prompt: r`For a positive fraction $\frac{a}{b}$ with $a > b$, e.g. $\frac{7}{4}$, the fraction is called`,
      options: ["an improper fraction", "a proper fraction", "an irrational fraction", "a mixed fraction"],
      answer: 0,
      explain: r`$a < b$: proper fraction; $a > b$: improper fraction.`,
    },
    // 1.5
    {
      id: "algebra-q29", kind: "fill", sub: "Fractional powers",
      prompt: r`$8^{2/3} =$ ____`,
      answers: [["4"]],
      explain: r`$8^{2/3} = \sqrt[3]{8^2} = (\sqrt[3]{8})^2 = 2^2 = 4$.`,
    },
    {
      id: "algebra-q30", kind: "mcq", sub: "Fractional powers",
      prompt: r`Rationalising the denominator, $\dfrac{1}{\sqrt{5} - \sqrt{2}} =$`,
      options: [r`$\dfrac{\sqrt{5} + \sqrt{2}}{3}$`, r`$\dfrac{\sqrt{5} - \sqrt{2}}{3}$`, r`$\dfrac{\sqrt{5} + \sqrt{2}}{7}$`, r`$\sqrt{5} + \sqrt{2}$`],
      answer: 0,
      explain: r`Multiply top and bottom by $\sqrt{5} + \sqrt{2}$: the denominator becomes $(\sqrt{5})^2 - (\sqrt{2})^2 = 5 - 2 = 3$.`,
    },
    {
      id: "algebra-q31", kind: "mcq", sub: "Fractional powers",
      prompt: r`Which of these is NOT a real number?`,
      options: [r`$(-16)^{1/4}$`, r`$(-8)^{1/3}$`, r`$16^{1/4}$`, r`$8^{-1/3}$`],
      answer: 0,
      explain: r`An even root ($q = 4$) of a negative number is not real: no real number to the 4th power is $-16$. $(-8)^{1/3} = -2$ is fine since $q = 3$ is odd; $16^{1/4} = 2$; $8^{-1/3} = \frac{1}{2}$.`,
    },
    {
      id: "algebra-q32", kind: "mcq", sub: "Fractional powers",
      prompt: r`$\sqrt{9 + 16} =$`,
      options: [r`$5$`, r`$7$`, r`$\sqrt{9} + \sqrt{16}$`, r`$25$`],
      answer: 0,
      explain: r`$\sqrt{25} = 5$. In general $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$ (that would give $3 + 4 = 7$).`,
    },
    {
      id: "algebra-q33", kind: "mcq", sub: "Fractional powers",
      prompt: r`The solution set of $x^3 \times \sqrt[4]{x - 6} = 0$ is`,
      options: [r`$x = 6$ only`, r`$x = 0$ only`, r`$x = 0$ and $x = 6$`, "no solution"],
      answer: 0,
      explain: r`The 4th root needs $x - 6 \ge 0$. $x = 0$ makes $\sqrt[4]{-6}$ undefined, so it is rejected; $x = 6$ works.`,
    },
    // 1.6
    {
      id: "algebra-q34", kind: "mcq", sub: "Inequalities",
      prompt: r`If both sides of an inequality are multiplied by a negative number, the direction of the inequality is`,
      options: ["reversed", "unchanged", "reversed only if the number is −1", "turned into an equation"],
      answer: 0,
      explain: r`E.g. $5 > 3$ times $-1$ gives $-5 < -3$. Multiplying by a positive number leaves the direction unchanged.`,
    },
    {
      id: "algebra-q35", kind: "mcq", sub: "Inequalities",
      prompt: r`Solve $3 - 2x > 7$.`,
      options: [r`$x < -2$`, r`$x > -2$`, r`$x > 2$`, r`$x < 2$`],
      answer: 0,
      explain: r`$-2x > 4$. Multiplying by $-\frac{1}{2}$ (negative) reverses the sign: $x < -2$.`,
    },
    {
      id: "algebra-q36", kind: "mcq", sub: "Double inequalities",
      prompt: r`Given only that $x < y$ and $y > z$, which is correct?`,
      options: [
        "No double inequality relating x, y and z can be written",
        r`$x < z < y$`,
        r`$z < x < y$`,
        r`$x < y > z$ is a valid double inequality`,
      ],
      answer: 0,
      explain: r`The inequalities face opposite directions, so the order of $x$ and $z$ is unknown (both $x < z$ and $z < x$ are possible). A double inequality needs both to face the same way.`,
    },
    {
      id: "algebra-q37", kind: "fill", sub: "Double inequalities",
      prompt: r`The solution of $-1 < 2x + 3 \le 9$ is $a < x \le b$ with $a =$ ____ and $b =$ ____`,
      answers: [["-2"], ["3"]],
      explain: r`Subtract 3: $-4 < 2x \le 6$. Multiply by $\frac{1}{2}$ (positive): $-2 < x \le 3$, i.e. the half-open interval $(-2, 3]$.`,
    },
    // 1.7
    {
      id: "algebra-q38", kind: "mcq", sub: "Intervals",
      prompt: r`The interval $[2, 9)$ is the set of all $x$ with`,
      options: [r`$2 \le x < 9$`, r`$2 < x \le 9$`, r`$2 \le x \le 9$`, r`$2 < x < 9$`],
      answer: 0,
      explain: r`A square bracket includes the endpoint, a round bracket excludes it. $[2, 9)$ is a half-open interval: $2 \le x < 9$.`,
    },
    {
      id: "algebra-q39", kind: "mcq", sub: "Absolute value",
      prompt: r`For $x < 2$, $|x - 2|$ equals`,
      options: [r`$2 - x$`, r`$x - 2$`, r`$x + 2$`, r`$-x - 2$`],
      answer: 0,
      explain: r`If $x < 2$ then $x - 2 < 0$, so $|x - 2| = -(x - 2) = 2 - x$.`,
    },
    {
      id: "algebra-q40", kind: "fill", sub: "Absolute value",
      prompt: r`The solution of $|x - 3| \le 2$ is the closed interval $[a, b]$ with $a =$ ____ and $b =$ ____`,
      answers: [["1"], ["5"]],
      explain: r`$|x - 3| \le 2 \Rightarrow -2 \le x - 3 \le 2 \Rightarrow 1 \le x \le 5$.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "algebra-x1", kind: "proof", sub: "Rational and irrational numbers",
      source: "Assignment 1 Q1",
      prompt: r`True or false? Give a clear justification for each answer.
(a) $0.1\dot{6} = 0.1666\ldots$ is a rational number.
(b) $9.35$ is an irrational number.
(c) The sum of two rational numbers is always a rational number.
(d) The sum of two irrational numbers can never be a rational number.`,
      marks: 5,
      rubric: [
        { point: r`(a) True, with $0.1666\ldots$ shown equal to $\frac{1}{6}$ (a ratio of integers)`, marks: 1.25 },
        { point: r`(b) False, with $9.35 = \frac{935}{100} = \frac{187}{20}$`, marks: 1.25 },
        { point: r`(c) True, with the general argument $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$, integers over a nonzero integer`, marks: 1.25 },
        { point: r`(d) False, with a valid counter-example such as $\sqrt{2} + (-\sqrt{2}) = 0$`, marks: 1.25 },
      ],
      model: r`(a) **True.** Let $x = 0.1666\ldots$. Then $100x = 16.666\ldots$ and $10x = 1.666\ldots$, so $100x - 10x = 15$, i.e. $90x = 15$ and $x = \frac{15}{90} = \frac{1}{6}$. Since $1$ and $6$ are integers and $6 \neq 0$, the number is rational.
(b) **False.** $9.35 = \frac{935}{100} = \frac{187}{20}$, a ratio of integers with nonzero denominator, so it is rational.
(c) **True.** Let the numbers be $\frac{a}{b}$ and $\frac{c}{d}$ with $a, b, c, d$ integers and $b, d \neq 0$. Then $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$; $ad + bc$ and $bd$ are integers and $bd \neq 0$. Hence the sum is rational.
(d) **False.** $\sqrt{2}$ and $-\sqrt{2}$ are both irrational, but $\sqrt{2} + (-\sqrt{2}) = 0 = \frac{0}{1}$ is rational. One counter-example disproves a "never" statement.`,
      answer: "(a) True (b) False (c) True (d) False",
    },
    {
      id: "algebra-x2", kind: "calc", sub: "Integer powers",
      source: "Assignment 1 Q2(a)–(d)",
      prompt: r`Condense or simplify:
(a) $x^4x^{15}$ (b) $(x^a x^b y^c)^3$ (c) $\dfrac{x^{-2}}{x^5}$ (d) $\dfrac{L^{\alpha}(LK)^{\beta}}{L^{2\alpha + \beta}K^2}$`,
      marks: 5,
      rubric: [
        { point: r`(a) $x^{19}$ using $a^r a^s = a^{r+s}$`, marks: 1 },
        { point: r`(b) $x^{3a+3b}y^{3c}$`, marks: 1 },
        { point: r`(c) $x^{-7} = \frac{1}{x^7}$`, marks: 1 },
        { point: r`(d) expands $(LK)^{\beta} = L^{\beta}K^{\beta}$ and combines exponents correctly`, marks: 1 },
        { point: r`(d) final answer $L^{-\alpha}K^{\beta - 2} = \frac{K^{\beta - 2}}{L^{\alpha}}$`, marks: 1 },
      ],
      model: r`(a) $x^4 x^{15} = x^{4 + 15} = x^{19}$.
(b) $x^a x^b = x^{a+b}$, so $(x^{a+b}y^c)^3 = (x^{a+b})^3(y^c)^3 = x^{3a+3b}y^{3c}$.
(c) $\frac{x^{-2}}{x^5} = x^{-2}\cdot x^{-5} = x^{-7} = \frac{1}{x^7}$.
(d) $(LK)^{\beta} = L^{\beta}K^{\beta}$, so the numerator is $L^{\alpha}L^{\beta}K^{\beta} = L^{\alpha+\beta}K^{\beta}$. Dividing by $L^{2\alpha+\beta}K^2$:
$$L^{\alpha + \beta - (2\alpha + \beta)}K^{\beta - 2} = L^{-\alpha}K^{\beta - 2} = \frac{K^{\beta - 2}}{L^{\alpha}}.$$`,
      answer: r`(a) $x^{19}$ (b) $x^{3a+3b}y^{3c}$ (c) $x^{-7}$ (d) $L^{-\alpha}K^{\beta-2}$`,
    },
    {
      id: "algebra-x3", kind: "calc", sub: "Powers and fractions",
      source: "Assignment 1 Q2(e)–(g)",
      prompt: r`Simplify:
(e) $\dfrac{K^3 - KL^2}{(K + L)^2}$ (f) $\left(\dfrac{1}{3^{-2}}\right)^{-2}$ (g) $5(\sqrt{\pi} - \sin 60)^0$`,
      marks: 5,
      rubric: [
        { point: r`(e) factorises the numerator as $K(K - L)(K + L)$ (common factor + difference of squares)`, marks: 1 },
        { point: r`(e) cancels the common factor to get $\frac{K(K - L)}{K + L}$`, marks: 1 },
        { point: r`(f) $\frac{1}{3^{-2}} = 9$ and final answer $\frac{1}{81}$`, marks: 1.5 },
        { point: r`(g) notes the base is nonzero so the power is $1$; answer $5$`, marks: 1.5 },
      ],
      model: r`(e) $K^3 - KL^2 = K(K^2 - L^2) = K(K - L)(K + L)$. So
$$\frac{K(K - L)(K + L)}{(K + L)^2} = \frac{K(K - L)}{K + L}\quad (K + L \neq 0).$$
(f) $3^{-2} = \frac{1}{9}$, so $\frac{1}{3^{-2}} = 9 = 3^2$. Then $(3^2)^{-2} = 3^{-4} = \frac{1}{81}$.
(g) $\sqrt{\pi} \approx 1.772$, which differs from $\sin 60$, so the base is nonzero and $(\sqrt{\pi} - \sin 60)^0 = 1$. Hence $5 \times 1 = 5$.`,
      answer: r`(e) $\frac{K(K-L)}{K+L}$ (f) $\frac{1}{81}$ (g) $5$`,
    },
    {
      id: "algebra-x4", kind: "calc", sub: "Difference of squares",
      source: "Assignment 1 Q3 and Q4 [PEQ]",
      prompt: r`(a) Rationalise the denominator of $\dfrac{1}{\sqrt{5} - \sqrt{2}}$, i.e. make the denominator a rational number.
(b) Calculate $\dfrac{100^2}{101^2 - 99^2}$ without using a calculator.`,
      marks: 5,
      rubric: [
        { point: r`(a) multiplies numerator and denominator by $\sqrt{5} + \sqrt{2}$`, marks: 1.5 },
        { point: r`(a) denominator $5 - 2 = 3$; answer $\frac{\sqrt{5} + \sqrt{2}}{3}$`, marks: 1 },
        { point: r`(b) uses $101^2 - 99^2 = (101 + 99)(101 - 99) = 400$`, marks: 1.5 },
        { point: r`(b) answer $25$`, marks: 1 },
      ],
      model: r`(a) Multiply top and bottom by $\sqrt{5} + \sqrt{2}$ and use $(a - b)(a + b) = a^2 - b^2$:
$$\frac{1}{\sqrt{5} - \sqrt{2}}\cdot\frac{\sqrt{5} + \sqrt{2}}{\sqrt{5} + \sqrt{2}} = \frac{\sqrt{5} + \sqrt{2}}{5 - 2} = \frac{\sqrt{5} + \sqrt{2}}{3}.$$
(b) $101^2 - 99^2 = (101 + 99)(101 - 99) = 200 \times 2 = 400$. Hence
$$\frac{100^2}{101^2 - 99^2} = \frac{10\,000}{400} = 25.$$`,
      answer: r`(a) $\frac{\sqrt{5}+\sqrt{2}}{3}$ (b) $25$`,
    },
    {
      id: "algebra-x5", kind: "calc", sub: "Solving equations",
      source: "Assignment 1 Q5(a), (b) [PEQ]",
      prompt: r`Solve the following equations (if they have solutions): (a) $x^2 - 36 = 0$ (b) $x^2 + 5x + 6 = 0$`,
      marks: 5,
      rubric: [
        { point: r`(a) factorises $x^2 - 36 = (x - 6)(x + 6)$ (difference of squares)`, marks: 1.5 },
        { point: r`(a) $x = 6$ or $x = -6$`, marks: 1 },
        { point: r`(b) factorises $x^2 + 5x + 6 = (x + 2)(x + 3)$`, marks: 1.5 },
        { point: r`(b) $x = -2$ or $x = -3$`, marks: 1 },
      ],
      model: r`(a) $x^2 - 36 = x^2 - 6^2 = (x - 6)(x + 6) = 0$. A product is zero only if a factor is zero, so $x = 6$ or $x = -6$.
(b) We need two numbers with product $6$ and sum $5$: $2$ and $3$. So $x^2 + 5x + 6 = (x + 2)(x + 3) = 0$, giving $x = -2$ or $x = -3$.
Check: $(-2)^2 + 5(-2) + 6 = 4 - 10 + 6 = 0$ and $(-3)^2 + 5(-3) + 6 = 9 - 15 + 6 = 0$.`,
      answer: r`(a) $x = \pm 6$ (b) $x = -2$ or $x = -3$`,
    },
    {
      id: "algebra-x6", kind: "calc", sub: "Solving equations",
      source: "Assignment 1 Q5(c) [PEQ]",
      prompt: r`Solve the system of equations $4x - 3y = 1$ and $2x + 9y = 4$.`,
      marks: 5,
      rubric: [
        { point: r`Eliminates one variable correctly (e.g. $3\times$ first equation added to the second: $14x = 7$)`, marks: 2 },
        { point: r`$x = \frac{1}{2}$`, marks: 1.5 },
        { point: r`$y = \frac{1}{3}$ by back-substitution`, marks: 1 },
        { point: "Checks the solution in the other equation", marks: 0.5 },
      ],
      model: r`Multiply the first equation by $3$: $12x - 9y = 3$. Add the second equation $2x + 9y = 4$: $14x = 7$, so $x = \frac{1}{2}$.
Substitute into $4x - 3y = 1$: $2 - 3y = 1$, so $3y = 1$ and $y = \frac{1}{3}$.
Check in $2x + 9y = 4$: $2\cdot\frac{1}{2} + 9\cdot\frac{1}{3} = 1 + 3 = 4$. ✓`,
      answer: r`$x = \frac{1}{2},\ y = \frac{1}{3}$`,
    },
    {
      id: "algebra-x7", kind: "calc", sub: "Fractional powers",
      source: "Assignment 1 Q5(d) [PEQ]",
      prompt: r`Solve $x^3 \times \sqrt[4]{x - 6} = 0$ (if it has solutions).`,
      marks: 5,
      rubric: [
        { point: r`States the domain: an even (4th) root needs $x - 6 \ge 0$, i.e. $x \ge 6$`, marks: 2 },
        { point: r`Sets each factor to zero: $x^3 = 0$ or $\sqrt[4]{x - 6} = 0$`, marks: 1 },
        { point: r`Rejects $x = 0$ since $\sqrt[4]{-6}$ is not a real number`, marks: 1 },
        { point: r`Final answer: $x = 6$ only`, marks: 1 },
      ],
      model: r`$\sqrt[4]{x - 6} = (x - 6)^{1/4}$ is an even root, which is only a real number when $x - 6 \ge 0$, i.e. $x \ge 6$.
A product is zero only if one factor is zero:
- $x^3 = 0 \Rightarrow x = 0$. But then $\sqrt[4]{0 - 6} = \sqrt[4]{-6}$ is not a real number, so $x = 0$ is **rejected**.
- $\sqrt[4]{x - 6} = 0 \Rightarrow x - 6 = 0 \Rightarrow x = 6$, which satisfies $x \ge 6$: $6^3 \times \sqrt[4]{0} = 0$. ✓
The only solution is $x = 6$.`,
      answer: r`$x = 6$`,
    },
    {
      id: "algebra-x8", kind: "calc", sub: "Rules of algebra",
      source: "Lecture Note 1 exercise",
      prompt: r`Expand or evaluate (without a calculator):
(a) $(a + b)^3$ (b) $(y + a)(y - b)$ (c) $201^2 - 199^2$ (d) $\dfrac{1000^2}{252^2 - 248^2}$`,
      marks: 5,
      rubric: [
        { point: r`(a) $a^3 + 3a^2b + 3ab^2 + b^3$ with working via $(a + b)(a^2 + 2ab + b^2)$`, marks: 1.25 },
        { point: r`(b) $y^2 + (a - b)y - ab$`, marks: 1.25 },
        { point: r`(c) $(201 + 199)(201 - 199) = 800$`, marks: 1.25 },
        { point: r`(d) denominator $500 \times 4 = 2000$; answer $500$`, marks: 1.25 },
      ],
      model: r`(a) $(a + b)^3 = (a + b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3$.
(b) $(y + a)(y - b) = y^2 - by + ay - ab = y^2 + (a - b)y - ab$.
(c) Difference of squares: $201^2 - 199^2 = (201 + 199)(201 - 199) = 400 \times 2 = 800$.
(d) $252^2 - 248^2 = (252 + 248)(252 - 248) = 500 \times 4 = 2000$, so $\frac{1000^2}{2000} = \frac{1\,000\,000}{2000} = 500$.`,
      answer: r`(a) $a^3 + 3a^2b + 3ab^2 + b^3$ (b) $y^2 + (a-b)y - ab$ (c) $800$ (d) $500$`,
    },
    {
      id: "algebra-x9", kind: "calc", sub: "Compound interest",
      source: "Lecture Note 1 example (extended)",
      prompt: r`(a) You deposit 1000 dollars in the bank at an interest rate of 8% per year, compounded yearly. How much will you have by the end of year 4?
(b) How do we interpret $\left(1 + \frac{8}{100}\right)^0$?
(c) A deposit of 2000 dollars grows to 2420 dollars after 2 years with yearly compound interest at $i\%$. Find $i$.`,
      marks: 5,
      rubric: [
        { point: r`(a) uses $K\left(1 + \frac{i}{100}\right)^t$ with $K = 1000$, $i = 8$, $t = 4$`, marks: 1 },
        { point: r`(a) $\approx 1360.49$ dollars (1360.48 accepted)`, marks: 1 },
        { point: r`(b) it equals $1$: after $0$ years the amount is the original deposit`, marks: 1 },
        { point: r`(c) sets up $2000\left(1 + \frac{i}{100}\right)^2 = 2420$, i.e. $\left(1 + \frac{i}{100}\right)^2 = 1.21$`, marks: 1 },
        { point: r`(c) $1 + \frac{i}{100} = 1.1$, so $i = 10$`, marks: 1 },
      ],
      model: r`(a) After $t$ years, $K$ grows to $K\left(1 + \frac{i}{100}\right)^t$:
$$1000\left(1 + \frac{8}{100}\right)^4 = 1000 \times 1.08^4 = 1000 \times 1.36048896 \approx 1360.49 \text{ dollars}.$$
(b) $\left(1 + \frac{8}{100}\right)^0 = 1$, so $K\left(1 + \frac{8}{100}\right)^0 = K$: at $t = 0$ no interest has been added yet and you have exactly your original deposit.
(c) $2000\left(1 + \frac{i}{100}\right)^2 = 2420 \Rightarrow \left(1 + \frac{i}{100}\right)^2 = 1.21$. Taking the (positive) square root, $1 + \frac{i}{100} = 1.21^{1/2} = 1.1$, so $\frac{i}{100} = 0.1$ and $i = 10$. Check: $2000 \times 1.1^2 = 2000 \times 1.21 = 2420$. ✓`,
      answer: r`(a) $\approx 1360.49$ dollars (b) $1$: the original deposit (c) $i = 10$`,
    },
    {
      id: "algebra-x10", kind: "proof", sub: "Real numbers and roots",
      source: "Modelled on Assignment 1 Q1",
      prompt: r`True or false? Give a clear justification for each answer.
(a) $1.272727\ldots$ (with "27" repeating) is a rational number.
(b) $\sqrt{2} \times \sqrt{8}$ is an irrational number.
(c) $(-8)^{1/3}$ is a real number.
(d) $\sqrt{a + b} = \sqrt{a} + \sqrt{b}$ for all non-negative numbers $a$ and $b$.`,
      marks: 5,
      rubric: [
        { point: r`(a) True: shows $1.2727\ldots = \frac{14}{11}$`, marks: 1.25 },
        { point: r`(b) False: $\sqrt{2}\sqrt{8} = 2^{1/2}\cdot 2^{3/2} = 2^2 = 4$ (or $\sqrt{16} = 4$), which is rational`, marks: 1.25 },
        { point: r`(c) True: $(-2)^3 = -8$; cube root ($q$ odd) of a negative number is allowed`, marks: 1.25 },
        { point: r`(d) False with a counter-example, e.g. $a = 9$, $b = 16$: $5 \neq 7$`, marks: 1.25 },
      ],
      model: r`(a) **True.** Let $x = 1.2727\ldots$. Then $100x = 127.2727\ldots$, so $100x - x = 126$ and $x = \frac{126}{99} = \frac{14}{11}$ — a ratio of integers.
(b) **False.** $\sqrt{8} = 8^{1/2} = (2^3)^{1/2} = 2^{3/2}$, so $\sqrt{2}\times\sqrt{8} = 2^{1/2 + 3/2} = 2^2 = 4 = \frac{4}{1}$, which is rational.
(c) **True.** $(-8)^{1/3} = \sqrt[3]{-8} = -2$ since $(-2)^3 = -8$. For an odd root ($q = 3$) the base may be negative.
(d) **False.** Counter-example: $a = 9$, $b = 16$: $\sqrt{9 + 16} = \sqrt{25} = 5$, but $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$.`,
      answer: "(a) True (b) False (c) True (d) False",
    },
    {
      id: "algebra-x11", kind: "calc", sub: "Inequalities",
      source: "Modelled on Lecture Note 1 (1.6–1.7)",
      prompt: r`Solve the following inequalities and write each solution as an interval.
(a) $3 - 2x > 7$ (b) $-1 < 2x + 3 \le 9$`,
      marks: 5,
      rubric: [
        { point: r`(a) $-2x > 4$`, marks: 0.5 },
        { point: r`(a) multiplies by a negative number and REVERSES the inequality`, marks: 1 },
        { point: r`(a) $x < -2$, interval $(-\infty, -2)$`, marks: 1 },
        { point: r`(b) subtracts 3 from all three parts: $-4 < 2x \le 6$`, marks: 0.5 },
        { point: r`(b) multiplies by $\frac{1}{2}$ keeping the direction`, marks: 0.5 },
        { point: r`(b) $-2 < x \le 3$, half-open interval $(-2, 3]$`, marks: 1.5 },
      ],
      model: r`(a) Subtract $3$ from both sides: $-2x > 4$. Multiply both sides by $-\frac{1}{2}$; because this number is negative the direction of the inequality is reversed: $x < -2$. Solution: $(-\infty, -2)$ (unbounded, $-2$ not included).
(b) This is a double inequality. Subtract $3$ from every part: $-4 < 2x \le 6$. Multiply every part by $\frac{1}{2}$ (positive, so the directions are unchanged): $-2 < x \le 3$. Solution: the half-open interval $(-2, 3]$.`,
      answer: r`(a) $(-\infty, -2)$ (b) $(-2, 3]$`,
    },
    {
      id: "algebra-x12", kind: "calc", sub: "Absolute value",
      source: "Modelled on Lecture Note 1 (1.7)",
      prompt: r`(a) Use the definition of absolute value to rewrite $|x - 2|$ without absolute-value signs.
(b) Solve $|x - 3| \le 2$. (c) Solve $|2x + 1| < 5$.
Write the answers to (b) and (c) as intervals.`,
      marks: 5,
      rubric: [
        { point: r`(a) $x - 2$ for $x \ge 2$ and $2 - x$ for $x < 2$`, marks: 1.5 },
        { point: r`(b) $-2 \le x - 3 \le 2$ giving $[1, 5]$`, marks: 1.5 },
        { point: r`(c) $-5 < 2x + 1 < 5$`, marks: 1 },
        { point: r`(c) $-3 < x < 2$, open interval $(-3, 2)$`, marks: 1 },
      ],
      model: r`(a) $|a| = a$ if $a \ge 0$ and $-a$ if $a < 0$. With $a = x - 2$:
$$|x - 2| = \begin{cases} x - 2, & x \ge 2 \\ 2 - x, & x < 2 \end{cases}$$
(b) $|u| \le a$ implies $-a \le u \le a$: $-2 \le x - 3 \le 2$. Add $3$: $1 \le x \le 5$, the closed interval $[1, 5]$.
(c) $|u| < a$ implies $-a < u < a$: $-5 < 2x + 1 < 5$. Subtract $1$: $-6 < 2x < 4$. Multiply by $\frac{1}{2}$: $-3 < x < 2$, the open interval $(-3, 2)$.`,
      answer: r`(b) $[1, 5]$ (c) $(-3, 2)$`,
      figures: [
        {
          title: "|x − 3| ≤ 2: all x within distance 2 of 3",
          xr: [-1, 7],
          yr: [-1, 1],
          numberLine: true,
          segments: [{ from: [1, 0], to: [5, 0] }],
          points: [{ at: [1, 0] }, { at: [5, 0] }, { at: [3, 0], label: "3", tone: 1 }],
          caption: "The closed interval [1, 5], centred at 3 with radius 2.",
        },
      ],
    },
    {
      id: "algebra-x13", kind: "select", sub: "Mixed algebra facts",
      source: "Modelled on Lecture Note 1",
      prompt: r`Which TWO of the following statements are wrong?`,
      statements: [
        r`Every integer is a rational number.`,
        r`$0.1666\ldots$ is an irrational number because its decimals never end.`,
        r`$a^r \times a^s = a^{r+s}$.`,
        r`$(a + b)^2 = a^2 + b^2$ for all numbers $a$ and $b$.`,
        r`If $a > b$ and $c < 0$, then $ac < bc$.`,
        r`$|x| \le 3$ implies $-3 \le x \le 3$.`,
      ],
      wrong: [1, 3],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (iv) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong.** $0.1666\ldots$ repeats, and $0.1666\ldots = \frac{1}{6}$, a ratio of integers — it is rational. Only decimals that never end AND never repeat (like $\sqrt{2}$, $\pi$) are irrational.
**(iv) is wrong.** $(a + b)^2 = a^2 + 2ab + b^2$; e.g. $(1 + 1)^2 = 4 \neq 2$. (Property (iii): $(a + b)^r \neq a^r + b^r$ in general.)
The others are correct: (i) $n = \frac{n}{1}$; (iii) is property (i) of powers; (v) multiplying by a negative number reverses the inequality; (vi) is remark (2) on absolute values.`,
      answer: "(ii) and (iv)",
    },
    {
      id: "algebra-x14", kind: "calc", sub: "Fractions",
      source: "Modelled on Lecture Note 1 (1.4) and Assignment 1 Q2(e)",
      prompt: r`Simplify as far as possible (assume all denominators are nonzero):
(a) $\dfrac{x + xy}{x}$ (b) $\dfrac{1}{x - 1} - \dfrac{1}{x + 1}$ (c) $\dfrac{x^2 - 9}{x^2 + 6x + 9}$`,
      marks: 5,
      rubric: [
        { point: r`(a) takes out the common factor: $\frac{x(1 + y)}{x} = 1 + y$`, marks: 1 },
        { point: r`(b) common denominator $(x - 1)(x + 1)$ with numerator $(x + 1) - (x - 1)$`, marks: 1 },
        { point: r`(b) $\frac{2}{x^2 - 1}$`, marks: 1 },
        { point: r`(c) factorises: $x^2 - 9 = (x - 3)(x + 3)$ and $x^2 + 6x + 9 = (x + 3)^2$`, marks: 1 },
        { point: r`(c) cancels $(x + 3)$: $\frac{x - 3}{x + 3}$`, marks: 1 },
      ],
      model: r`(a) $x$ is a common factor of the whole numerator: $\frac{x + xy}{x} = \frac{x(1 + y)}{x} = 1 + y$.
(b) Use $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$:
$$\frac{1}{x - 1} - \frac{1}{x + 1} = \frac{(x + 1) - (x - 1)}{(x - 1)(x + 1)} = \frac{2}{x^2 - 1}.$$
(c) Difference of squares and $(a + b)^2 = a^2 + 2ab + b^2$:
$$\frac{x^2 - 9}{x^2 + 6x + 9} = \frac{(x - 3)(x + 3)}{(x + 3)^2} = \frac{x - 3}{x + 3}.$$
Only common factors may be cancelled — the $x^2$ terms cannot simply be "cancelled".`,
      answer: r`(a) $1 + y$ (b) $\frac{2}{x^2 - 1}$ (c) $\frac{x-3}{x+3}$`,
    },
    {
      id: "algebra-x15", kind: "calc", sub: "Fractional powers",
      source: "Modelled on Lecture Note 1 (1.5) and Assignment 1 Q2",
      prompt: r`Without a calculator:
(a) evaluate $16^{3/4}$; (b) evaluate $27^{-2/3}$; (c) simplify $(x^{1/2}\cdot x^{1/3})^6$ for $x > 0$; (d) explain why $(-16)^{1/4}$ is not a real number.`,
      marks: 5,
      rubric: [
        { point: r`(a) $16^{3/4} = (\sqrt[4]{16})^3 = 2^3 = 8$`, marks: 1 },
        { point: r`(b) $27^{-2/3} = \frac{1}{(\sqrt[3]{27})^2} = \frac{1}{9}$`, marks: 1.5 },
        { point: r`(c) $x^{1/2 + 1/3} = x^{5/6}$, then $(x^{5/6})^6 = x^5$`, marks: 1.5 },
        { point: r`(d) even root of a negative number: no real number to the 4th power is negative`, marks: 1 },
      ],
      model: r`(a) $16^{3/4} = \sqrt[4]{16^3} = (\sqrt[4]{16})^3 = 2^3 = 8$.
(b) $27^{-2/3} = \frac{1}{27^{2/3}} = \frac{1}{(\sqrt[3]{27})^2} = \frac{1}{3^2} = \frac{1}{9}$.
(c) $x^{1/2}\cdot x^{1/3} = x^{1/2 + 1/3} = x^{5/6}$, and $(x^{5/6})^6 = x^{5}$.
(d) $(-16)^{1/4} = \sqrt[4]{-16}$ would be a number whose 4th power is $-16$. Any real number raised to an even power is $\ge 0$, so no such real number exists. (For odd roots a negative base is fine, e.g. $(-8)^{1/3} = -2$.)`,
      answer: r`(a) $8$ (b) $\frac{1}{9}$ (c) $x^5$`,
    },
    {
      id: "algebra-x16", kind: "explain", sub: "Inequalities",
      source: "Lecture Note 1 (1.6)",
      prompt: r`(a) Starting from $5 > 3$, multiply both sides by $2$ and then by $-1$. State the general rule for what happens to the direction of an inequality when both sides are multiplied by a positive number and by a negative number.
(b) Suppose $x < y$ and $y > z$. Can these be written as a double inequality? Explain.`,
      marks: 5,
      rubric: [
        { point: r`(a) $10 > 6$ and $-5 < -3$ correctly computed`, marks: 0.5 },
        { point: r`(a) positive multiplier: direction unchanged`, marks: 1 },
        { point: r`(a) negative multiplier: direction reversed`, marks: 1 },
        { point: r`(b) No — a double inequality needs both inequalities to face the same direction`, marks: 1 },
        { point: r`(b) shows the order of $x$ and $z$ is unknown (e.g. numerical examples giving $x < z$ and $z < x$)`, marks: 1.5 },
      ],
      model: r`(a) $5 \times 2 > 3 \times 2$, i.e. $10 > 6$: the direction is **unchanged**. $5 \times (-1) = -5$ and $3 \times (-1) = -3$, and $-5 < -3$: the direction is **reversed**.
General rule: if $a > b$ and $c > 0$ then $ac > bc$; if $a > b$ and $c < 0$ then $ac < bc$.
(b) **No.** Two inequalities can be written as a double inequality only when they hold simultaneously and face the same direction (e.g. $x < y$ and $y < z$ give $x < y < z$). Here $y$ is bigger than both $x$ and $z$, but we do not know how $x$ and $z$ compare: $x = 1, y = 5, z = 2$ gives $x < z < y$, while $x = 3, y = 5, z = 1$ gives $z < x < y$. So neither $x < z < y$ nor $z < x < y$ can be concluded, and "$x < y > z$" is not a valid double inequality.`,
      answer: "(a) unchanged for positive, reversed for negative (b) No",
    },
  ],
};

export default data;
