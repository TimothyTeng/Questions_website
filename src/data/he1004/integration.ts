import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "integration",
  sections: [
    // ------------------------------------------------------------------ 8.1
    {
      title: "8.1 Indefinite Integrals",
      intro: r`Integration is the **reverse of differentiation**: we are given a derivative and must reconstruct the original function (an **antiderivative**).`,
      points: [
        {
          term: "Integration",
          text: r`Finding the original function from its derivative, i.e. reconstructing $F(x)$ from $F'(x)$. It is the "inverse" of differentiation, so the result is also called an **antiderivative**.`,
          eg: r`If $F'(x) = x^2$ then $F(x) = \frac{1}{3}x^3 + C$, because $\frac{d}{dx}\left(\frac{1}{3}x^3 + C\right) = x^2$.`,
        },
        {
          term: "Notation",
          text: r`Differentiation: $\frac{d}{dx}F(x) = F'(x)$ takes $F(x) \mapsto F'(x)$. Integration: $\int F'(x)\,dx = F(x)$ goes back from $F'(x)$ to $F(x)$.`,
        },
        {
          term: "Integral sign and integrand",
          text: r`$\int$ is the **integral sign**; the function being integrated, $f(x)$ in $\int f(x)\,dx$, is the **integrand**.`,
        },
        {
          term: "Indefinite integral",
          text: r`$\int f(x)\,dx = F(x) + C$ whenever $F'(x) = f(x)$. $C$ is an arbitrary constant called the **constant of integration**.`,
        },
        {
          term: "A whole class of functions",
          text: r`$F(x) + C$ is not one definite function: it is a whole family of functions (one for each $C$), and they all have the same derivative $F'(x) = f(x)$.`,
          eg: r`$\frac{1}{3}x^3 - 1$, $\frac{1}{3}x^3$ and $\frac{1}{3}x^3 + 1$ all have derivative $x^2$.`,
        },
        {
          term: "Differentiation undoes integration",
          text: r`By the definition, $\frac{d}{dx}\int F'(x)\,dx = F'(x)$: differentiation and integration cancel each other out. Use this to **check** any integral: differentiate your answer and you must get the integrand back.`,
        },
        {
          term: "Remark",
          text: r`$\frac{d}{dx}a^x = a^x\ln a$, which is why $\int a^x\,dx = \frac{1}{\ln a}a^x + C$.`,
        },
        {
          term: "Constant of integration in economics",
          text: r`If $C'(x)$ is marginal cost, then $C(x) = \int C'(x)\,dx$ and the constant of integration is the **fixed cost**, because $C(0)$ = cost when nothing is produced = the constant.`,
        },
      ],
      formulas: [
        { name: "(i) Power rule", tex: r`\int x^a\,dx = \frac{1}{a+1}x^{a+1} + C,\quad a \neq -1`, note: r`$a$ is a fixed number; works for fractional and negative powers except $a = -1$.` },
        { name: "(ii) One over x", tex: r`\int \frac{1}{x}\,dx = \ln|x| + C`, note: r`This is the missing case $a = -1$ of the power rule.` },
        { name: "(iii) Exponential", tex: r`\int e^{ax}\,dx = \frac{1}{a}e^{ax} + C`, note: r`For $a \neq 0$; with $a = 1$: $\int e^x\,dx = e^x + C$.` },
        { name: "(iv) General exponential", tex: r`\int a^x\,dx = \frac{1}{\ln a}a^x + C,\quad a > 0,\ a \neq 1` },
        { name: "(v) Constant multiple", tex: r`\int a f(x)\,dx = a\int f(x)\,dx`, note: r`$a$ is a constant.` },
        { name: "(vi) Sum rule", tex: r`\int \big(f(x) + g(x)\big)\,dx = \int f(x)\,dx + \int g(x)\,dx` },
      ],
      table: [
        ["Function $f(x)$", "Derivative $f'(x)$", "Indefinite integral $\\int f(x)\\,dx$"],
        ["$x^a$", "$a x^{a-1}$", "$\\frac{1}{a+1}x^{a+1} + C$ $(a \\neq -1)$"],
        ["$\\frac{1}{x}$", "$-\\frac{1}{x^2}$", "$\\ln|x| + C$"],
        ["$e^{ax}$", "$a e^{ax}$", "$\\frac{1}{a}e^{ax} + C$"],
        ["$a^x$", "$a^x \\ln a$", "$\\frac{1}{\\ln a}a^x + C$"],
      ],
      figures: [
        {
          title: "A family of antiderivatives of x²",
          xr: [-2, 2],
          yr: [-3, 3],
          curves: [
            { f: "x^3/3 + 1", label: "C = 1", tone: 1 },
            { f: "x^3/3", label: "C = 0", tone: 0 },
            { f: "x^3/3 - 1", label: "C = -1", tone: 2 },
          ],
          caption: "F(x) = x³/3 + C for three values of C. The curves are vertical shifts of each other, so at every x they have the same slope x². That is why an indefinite integral always carries + C.",
        },
        {
          title: "Cost from marginal cost (Example 6)",
          x: "x",
          y: "C(x)",
          xr: [0, 5],
          yr: [0, 250],
          curves: [{ f: "2*x^3/3 + x^2 + 5*x + 100", label: "C(x)" }],
          points: [{ at: [0, 100], label: "fixed cost C(0) = 100", guides: true }],
          caption: "C(x) = (2/3)x³ + x² + 5x + 100. Integrating MC gives every term except the constant; the constant is pinned down by the fixed cost C(0) = 100.",
        },
      ],
      worked: [
        {
          problem: r`Example [1]: we know $F'(x) = x^2$. What is $F(x)$?`,
          solution: r`Ask which function has derivative $x^2$. Since $\frac{d}{dx}\left(\frac{1}{3}x^3\right) = x^2$,
$$F(x) = \frac{1}{3}x^3 + C,$$
where $C$ is an arbitrary constant (the constant of integration).`,
          source: "Lecture Note 8 Example [1]",
        },
        {
          problem: r`Example [3]: $\int 4x^2\,dx$`,
          solution: r`$\int 4x^2\,dx = 4\int x^2\,dx$ [by (v)]
$= 4 \times \frac{1}{3}x^3 + C = \frac{4}{3}x^3 + C$ [by (i)].`,
          source: "Lecture Note 8 Example [3]",
        },
        {
          problem: r`Example [4]: $\int (e^x + 2x)\,dx$`,
          solution: r`$\int (e^x + 2x)\,dx = \int e^x\,dx + \int 2x\,dx$ [by (vi)]
$= (e^x + C_1) + \left(2 \times \frac{1}{2}x^2 + C_2\right)$ [by (iii), (v) and (i)]
$= e^x + x^2 + C$, where $C = C_1 + C_2$ is just one arbitrary constant.`,
          source: "Lecture Note 8 Example [4]",
        },
        {
          problem: r`Example [5]: $\int \frac{2}{3}x^2\,dx$`,
          solution: r`$\int \frac{2}{3}x^2\,dx = \frac{2}{3}\cdot\frac{1}{3}x^3 + C = \frac{2}{9}x^3 + C$ [by (v) and (i)].`,
          source: "Lecture Note 8 Example [5]",
        },
        {
          problem: r`Example [6]: marginal cost is $C'(x) = 2x^2 + 2x + 5$ and fixed cost is $100$. Find the cost function $C(x)$.`,
          solution: r`$C(x) = \int C'(x)\,dx = \int (2x^2 + 2x + 5)\,dx = \frac{2}{3}x^3 + x^2 + 5x + c.$
The constant $c$ is the **fixed cost**: if the firm produces nothing, cost is only the fixed cost, $C(0) = 100$.
Plug in $x = 0$: $C(0) = \frac{2}{3}(0)^3 + (0)^2 + 5(0) + c = c = 100$.
$$C(x) = \frac{2}{3}x^3 + x^2 + 5x + 100.$$`,
          source: "Lecture Note 8 Example [6]",
        },
      ],
    },
    // ------------------------------------------------------------------ 8.2
    {
      title: "8.2 Area and Definite Integrals",
      intro: r`The integral computes **areas**: the area under a continuous, nonnegative curve between $x = a$ and $x = b$ is a definite integral.`,
      points: [
        {
          term: "Area under a curve",
          text: r`If $f$ is continuous and nonnegative, the area $A$ under its graph over $[a, b]$ is $A = \int_a^b f(x)\,dx$.`,
        },
        {
          term: "Definite integral",
          text: r`When the integral sign carries a **lower limit** $a$ and an **upper limit** $b$, it is a definite integral:
$$\int_a^b f(x)\,dx = \Big|_a^b F(x) = F(b) - F(a),$$
where $F$ is any indefinite integral of $f$, i.e. $F'(x) = f(x)$ for all $x \in (a, b)$.`,
        },
        {
          term: "Why C disappears",
          text: r`Using $F(x) + C$ instead of $F(x)$: $[F(b) + C] - [F(a) + C] = F(b) - F(a)$. The constant cancels, so a definite integral is a **number**, not a family of functions.`,
        },
        {
          term: "Recipe",
          text: r`(1) find an antiderivative $F(x)$; (2) evaluate it at the upper limit; (3) subtract its value at the lower limit.`,
          eg: r`$\int_0^1 x^2\,dx = \frac{1}{3}(1)^3 - \frac{1}{3}(0)^3 = \frac{1}{3}$.`,
        },
      ],
      formulas: [
        { name: "Definite integral", tex: r`\int_a^b f(x)\,dx = \Big|_a^b F(x) = F(b) - F(a),\qquad F'(x) = f(x)` },
        { name: "Area under a nonnegative curve", tex: r`A = \int_a^b f(x)\,dx` },
      ],
      figures: [
        {
          title: "Area as a definite integral (Example [7])",
          xr: [0, 5],
          yr: [0, 4],
          curves: [{ f: "0.3*(x-2)^2 + 1", label: "f(x)" }],
          shade: [{ f: "0.3*(x-2)^2 + 1", from: 1, to: 4, label: "A" }],
          points: [
            { at: [1, 0], label: "a" },
            { at: [4, 0], label: "b" },
          ],
          caption: "A = ∫ₐᵇ f(x) dx: the area between the graph of a continuous, nonnegative f and the x-axis from x = a to x = b.",
        },
        {
          title: "Area under y = x² over [0, 1] (Example [8])",
          xr: [-0.2, 1.4],
          yr: [0, 2],
          curves: [{ f: "x^2", label: "y = x²" }],
          shade: [{ f: "x^2", from: 0, to: 1, label: "1/3" }],
          points: [{ at: [1, 1], label: "(1, 1)", guides: true }],
          caption: "∫₀¹ x² dx = F(1) − F(0) = 1/3 − 0 = 1/3 with F(x) = x³/3.",
        },
      ],
      worked: [
        {
          problem: r`Example [8]: compute the area under $y = x^2$ over $[0, 1]$.`,
          solution: r`An indefinite integral is $\int x^2\,dx = \frac{1}{3}x^3 + C$. The area is from $x = 0$ to $x = 1$:
$$F(1) - F(0) = \left(\frac{1}{3} + C\right) - (0 + C) = \frac{1}{3}.$$`,
          source: "Lecture Note 8 Example [8]",
        },
        {
          problem: r`Example [9]: $\int_2^5 x^2\,dx$`,
          solution: r`$\int_2^5 x^2\,dx = \Big|_2^5 \frac{1}{3}x^3 = \frac{1}{3}\left(5^3 - 2^3\right) = \frac{1}{3}(125 - 8) = \frac{117}{3} = 39.$`,
          source: "Lecture Note 8 Example [9]",
        },
        {
          problem: r`Example [10]: $\int_0^1 e^x\,dx$`,
          solution: r`$\int_0^1 e^x\,dx = \Big|_0^1 e^x = (e^1 + C) - (e^0 + C) = e - 1 \approx 1.718.$`,
          source: "Lecture Note 8 Example [10]",
        },
      ],
    },
    // ------------------------------------------------------------------ 8.3
    {
      title: "8.3 Properties of Definite Integrals",
      intro: r`If $f$ is continuous on an interval containing $a$, $b$ and $c$, four properties follow directly from $\int_a^b f(x)\,dx = F(b) - F(a)$.`,
      points: [
        {
          term: "(1) Swapping the limits",
          text: r`$\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx$.
Proof: $\int_a^b f\,dx = F(b) - F(a)$ while $\int_b^a f\,dx = F(a) - F(b)$, the negative.`,
        },
        {
          term: "(2) Equal limits",
          text: r`$\int_a^a f(x)\,dx = 0$.
Proof: $\Big|_a^a F(x) = F(a) - F(a) = 0$.`,
        },
        {
          term: "(3) Constant multiple",
          text: r`$\int_a^b \alpha f(x)\,dx = \alpha\int_a^b f(x)\,dx$ for any number $\alpha$ (clear from rule (v)).`,
        },
        {
          term: "(4) Splitting the interval",
          text: r`$\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx$.
Proof: $[F(c) - F(a)] + [F(b) - F(c)] = F(b) - F(a)$.`,
        },
        {
          term: "Sum rule for definite integrals",
          text: r`Rule (vi) carries over: $\int_a^b [f(x) + g(x)]\,dx = \int_a^b f(x)\,dx + \int_a^b g(x)\,dx$, so you can integrate term by term.`,
        },
      ],
      formulas: [
        { name: "(1)", tex: r`\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx` },
        { name: "(2)", tex: r`\int_a^a f(x)\,dx = 0` },
        { name: "(3)", tex: r`\int_a^b \alpha f(x)\,dx = \alpha\int_a^b f(x)\,dx` },
        { name: "(4)", tex: r`\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx` },
      ],
      figures: [
        {
          title: "Property (4): splitting [a, b] at c",
          xr: [0, 5],
          yr: [0, 3],
          curves: [{ f: "1 + 0.5*sqrt(x)", label: "f(x)" }],
          shade: [
            { f: "1 + 0.5*sqrt(x)", from: 1, to: 2.5, tone: 0, label: "a to c" },
            { f: "1 + 0.5*sqrt(x)", from: 2.5, to: 4, tone: 1, label: "c to b" },
          ],
          points: [
            { at: [1, 0], label: "a" },
            { at: [2.5, 0], label: "c" },
            { at: [4, 0], label: "b" },
          ],
          caption: "The area over [a, b] is the area over [a, c] plus the area over [c, b].",
        },
      ],
      worked: [
        {
          problem: r`Evaluate $\int_1^4 3\sqrt{x}\,dx$.`,
          solution: r`By (3), $\int_1^4 3x^{1/2}\,dx = 3\int_1^4 x^{1/2}\,dx$. By (i), $\int x^{1/2}\,dx = \frac{2}{3}x^{3/2}$, so
$$3\cdot\Big|_1^4 \tfrac{2}{3}x^{3/2} = \Big|_1^4 2x^{3/2} = 2(4)^{3/2} - 2(1)^{3/2} = 2(8) - 2 = 14.$$`,
          source: "Assignment 9 Q1(d)",
        },
        {
          problem: r`Given $\int_0^2 f(x)\,dx = 5$ and $\int_2^6 f(x)\,dx = 7$, find $\int_0^6 f(x)\,dx$, $\int_6^2 f(x)\,dx$ and $\int_2^2 f(x)\,dx$.`,
          solution: r`By (4): $\int_0^6 f\,dx = \int_0^2 f\,dx + \int_2^6 f\,dx = 5 + 7 = 12$.
By (1): $\int_6^2 f\,dx = -\int_2^6 f\,dx = -7$.
By (2): $\int_2^2 f\,dx = 0$.`,
          source: "Practice on Lecture Note 8 properties (1), (2), (4)",
        },
      ],
    },
    // ------------------------------------------------------------------ 8.4
    {
      title: "8.4 Integration by Parts",
      intro: r`Integration by parts is the product rule run backwards. Use it for integrals of a **product** that rules (i)–(vi) cannot handle, such as $\int x e^x\,dx$.`,
      points: [
        {
          term: "Derivation",
          text: r`Product rule (Lecture Note 5): $\big(f(x)g(x)\big)' = f'(x)g(x) + f(x)g'(x)$. Integrate both sides:
$f(x)g(x) = \int f'(x)g(x)\,dx + \int f(x)g'(x)\,dx$, and rearrange to get the formula.`,
        },
        {
          term: "Integration by parts",
          text: r`$$\int f(x)g'(x)\,dx = f(x)g(x) - \int f'(x)g(x)\,dx$$`,
        },
        {
          term: "The integral of a product is not the product of integrals",
          text: r`$\int x e^x\,dx \neq \left(\frac{1}{2}x^2\right)e^x$. Differentiate $\frac{1}{2}x^2e^x$ and you do not get $xe^x$.`,
        },
        {
          term: "Choosing f and g′",
          text: r`Pick $g'$ so that you can integrate it, and $f$ so that the new integral $\int f'(x)g(x)\,dx$ is **easier** than the original. A bad choice "leads to nowhere" (the new integral is harder).`,
          eg: r`$\int xe^x\,dx$: $f = x$ (becomes $1$), $g' = e^x$. $\int \ln x\,dx$: $f = \ln x$, $g' = 1$.`,
        },
        {
          term: "When the original integral reappears",
          text: r`Sometimes the right-hand side contains the original integral again (Example [12]). Move it to the left-hand side and divide: $2\int \frac{1}{x}\ln x\,dx = (\ln x)^2 + C$.`,
        },
        {
          term: "Definite integrals by parts",
          text: r`Find the antiderivative by parts, then evaluate it at the limits as usual: $\int_a^b f g'\,dx = \Big|_a^b \big[\ldots\big]$.`,
          eg: r`$\int_0^1 xe^x\,dx = \Big|_0^1 (xe^x - e^x) = (e - e) - (0 - 1) = 1$.`,
        },
      ],
      formulas: [
        { name: "Integration by parts", tex: r`\int f(x)g'(x)\,dx = f(x)g(x) - \int f'(x)g(x)\,dx` },
        { name: "Product rule (the source)", tex: r`\big(f(x)g(x)\big)' = f'(x)g(x) + f(x)g'(x)` },
      ],
      table: [
        ["Integral", "$f(x)$ (differentiate)", "$g'(x)$ (integrate)", "Result"],
        ["$\\int xe^x\\,dx$", "$x$", "$e^x$", "$xe^x - e^x + C$"],
        ["$\\int \\frac{1}{x}\\ln x\\,dx$", "$\\ln x$", "$\\frac{1}{x}$", "$\\frac{1}{2}(\\ln x)^2 + C$"],
        ["$\\int \\ln x\\,dx$", "$\\ln x$", "$1$", "$x\\ln x - x + C$"],
      ],
      worked: [
        {
          problem: r`Example [11]: $\int xe^x\,dx$`,
          solution: r`Rules (i)–(vi) do not apply to a product, so use parts with $f(x) = x$ and $g'(x) = e^x$, giving $f'(x) = 1$, $g(x) = e^x$:
$$\int xe^x\,dx = x\cdot e^x - \int 1\cdot e^x\,dx = xe^x - e^x + C.$$
Check: $\frac{d}{dx}(xe^x - e^x) = e^x + xe^x - e^x = xe^x$. ✓`,
          source: "Lecture Note 8 Example [11]",
        },
        {
          problem: r`Example [12]: $\int \frac{1}{x}\ln x\,dx$`,
          solution: r`Taking $f = \frac{1}{x}$, $g' = \ln x$ leads nowhere. Instead take $f(x) = \ln x$ and $g'(x) = \frac{1}{x}$, so $f'(x) = \frac{1}{x}$ and $g(x) = \ln x$:
$$\int \ln x\cdot\frac{1}{x}\,dx = \ln x\cdot\ln x - \int \frac{1}{x}\ln x\,dx.$$
The original integral reappears on the right; move it to the left:
$2\int \frac{1}{x}\ln x\,dx = (\ln x)^2 + C \;\Rightarrow\; \int \frac{1}{x}\ln x\,dx = \frac{1}{2}(\ln x)^2 + C$ (writing $\frac{1}{2}C$ as $C$).`,
          source: "Lecture Note 8 Example [12] = Past paper Q1(e)",
        },
        {
          problem: r`$\int \ln x\,dx$, where $x$ is positive.`,
          solution: r`Write $\ln x = \ln x\cdot 1$ and take $f(x) = \ln x$, $g'(x) = 1$, so $f'(x) = \frac{1}{x}$ and $g(x) = x$:
$$\int \ln x\,dx = x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - \int 1\,dx = x\ln x - x + C.$$
Check: $\frac{d}{dx}(x\ln x - x) = \ln x + 1 - 1 = \ln x$. ✓`,
          source: "Assignment 9 Q1(c)",
        },
      ],
    },
    // ------------------------------------------------------------------ 8.5
    {
      title: "8.5 Integration by Substitution",
      intro: r`Substitution (change of variable) is the chain rule run backwards. Look for an "inside function" $g(x)$ whose derivative $g'(x)$ also appears in the integrand (possibly up to a constant).`,
      points: [
        {
          term: "Integration by substitution",
          text: r`$$\int f\big(g(x)\big)g'(x)\,dx = \int f(u)\,du,\qquad u = g(x).$$
$g'(x)$ is the derivative of the inside function of $f(g(x))$.`,
        },
        {
          term: "Step 1",
          text: r`Decide the $u$ function: $u = g(x)$ (usually the inside of a power, root, exponential or logarithm).`,
        },
        {
          term: "Step 2",
          text: r`Compute $\frac{du}{dx} = g'(x)$, then obtain $du = g'(x)\,dx$.`,
        },
        {
          term: "Step 3",
          text: r`Rewrite and find the integral entirely in terms of $u$ and $du$.`,
        },
        {
          term: "Step 4",
          text: r`Change the $u$ expression back to an $x$ expression.`,
        },
        {
          term: "Fixing a missing constant",
          text: r`If $g'(x)$ appears only up to a constant factor, multiply and divide by that constant first.`,
          eg: r`$\int 8x^2(3x^3-1)^{16}\,dx = \frac{8}{9}\int 9x^2(3x^3-1)^{16}\,dx$, because $du = 9x^2\,dx$.`,
        },
        {
          term: "Leftover x",
          text: r`If an $x$ is left over after substituting, express it in $u$ from the substitution itself.`,
          eg: r`In $\int x\sqrt{x+1}\,dx$ with $u = x + 1$: $x = u - 1$ and $du = dx$.`,
        },
        {
          term: "Definite integrals",
          text: r`Find the antiderivative by substitution, change back to $x$ (step 4), then evaluate at the original limits.`,
        },
      ],
      formulas: [
        { name: "Substitution", tex: r`\int f\big(g(x)\big)g'(x)\,dx = \int f(u)\,du,\quad u = g(x),\ du = g'(x)\,dx` },
        { name: "Useful special case", tex: r`\int \frac{g'(x)}{g(x)}\,dx = \ln|g(x)| + C`, note: r`Substitution $u = g(x)$ turns it into $\int \frac{1}{u}\,du$.` },
      ],
      worked: [
        {
          problem: r`Example [13]: $\int (x^2 + 10)^{50}\,2x\,dx$`,
          solution: r`Rules (i)–(vi) cannot be used directly and parts fails. Set $u = x^2 + 10$; then $\frac{du}{dx} = 2x$, so $du = 2x\,dx$ and the integral becomes
$$\int u^{50}\,du = \frac{1}{51}u^{51} + C = \frac{1}{51}(x^2 + 10)^{51} + C.$$`,
          source: "Lecture Note 8 Example [13]",
        },
        {
          problem: r`Example [14]: $\int 8x^2(3x^3 - 1)^{16}\,dx$`,
          solution: r`Set $u = 3x^3 - 1$, so $du = 9x^2\,dx$. Make $9x^2$ appear:
$$\int 8x^2(3x^3-1)^{16}\,dx = \frac{8}{9}\int (3x^3-1)^{16}\,9x^2\,dx = \frac{8}{9}\int u^{16}\,du$$
$$= \frac{8}{9}\cdot\frac{1}{17}u^{17} + C = \frac{8}{153}(3x^3 - 1)^{17} + C.$$`,
          source: "Lecture Note 8 Example [14]",
        },
        {
          problem: r`$\int \left(2e^{2x} + \frac{14x}{7x^2 + 5}\right)dx$`,
          solution: r`Split by (vi).
First term, by (v) and (iii): $\int 2e^{2x}\,dx = 2\cdot\frac{1}{2}e^{2x} = e^{2x}$.
Second term: let $u = 7x^2 + 5$, so $du = 14x\,dx$: $\int \frac{14x}{7x^2+5}\,dx = \int \frac{1}{u}\,du = \ln|u| = \ln(7x^2 + 5)$ (no absolute value needed as $7x^2 + 5 > 0$).
$$\int \left(2e^{2x} + \frac{14x}{7x^2 + 5}\right)dx = e^{2x} + \ln(7x^2 + 5) + C.$$`,
          source: "Assignment 9 Q1(a)",
        },
        {
          problem: r`$\int x\sqrt{x + 1}\,dx$`,
          solution: r`Let $u = x + 1$, so $du = dx$ and $x = u - 1$:
$$\int x\sqrt{x+1}\,dx = \int (u - 1)u^{1/2}\,du = \int \left(u^{3/2} - u^{1/2}\right)du = \frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2} + C$$
$$= \frac{2}{5}(x + 1)^{5/2} - \frac{2}{3}(x + 1)^{3/2} + C.$$
(Parts with $f = x$, $g' = \sqrt{x+1}$ gives the equivalent form $\frac{2}{3}x(x+1)^{3/2} - \frac{4}{15}(x+1)^{5/2} + C$.)`,
          source: "Assignment 9 Q1(b)",
        },
        {
          problem: r`$\int_0^1 e^{\frac{4}{3}y}\,dy$`,
          solution: r`By (iii) with $a = \frac{4}{3}$ (or substitute $u = \frac{4}{3}y$, $du = \frac{4}{3}dy$): $\int e^{\frac{4}{3}y}\,dy = \frac{3}{4}e^{\frac{4}{3}y} + C$. So
$$\int_0^1 e^{\frac{4}{3}y}\,dy = \Big|_0^1 \tfrac{3}{4}e^{\frac{4}{3}y} = \frac{3}{4}\left(e^{4/3} - 1\right) \approx 2.095.$$`,
          source: "Assignment 9 Q1(e)",
        },
      ],
    },
    // ------------------------------------------------------------------ 8.6
    {
      title: "8.6 Infinite Intervals of Integration",
      intro: r`An integral over an infinite interval (an **improper integral**) is defined as a limit of ordinary definite integrals.`,
      points: [
        {
          term: "Integral over [a, ∞)",
          text: r`If $f$ is continuous and $\int_a^b f(x)\,dx$ is defined for each $b \geq a$, define
$$\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx.$$
If this limit exists and is finite, $f$ is **integrable** over $[a, \infty)$.`,
        },
        {
          term: "Converge",
          text: r`If the limit exists (and is finite), the improper integral is said to **converge**.`,
        },
        {
          term: "Diverge",
          text: r`If the limit does not exist, the improper integral is said to **diverge**.`,
          eg: r`$\int_1^\infty \frac{1}{x}\,dx = \lim_{b\to\infty}(\ln b - \ln 1) = \lim_{b\to\infty}\ln b$, which does not exist, so it diverges.`,
        },
        {
          term: "Integral over (−∞, b]",
          text: r`Analogously, when $f$ is continuous on $(-\infty, b]$: $\int_{-\infty}^b f(x)\,dx = \lim_{a\to-\infty}\int_a^b f(x)\,dx$, which converges if the limit exists and diverges otherwise.`,
        },
        {
          term: "Recipe",
          text: r`(1) replace $\infty$ by $b$; (2) evaluate the ordinary definite integral as a function of $b$; (3) take $\lim_{b\to\infty}$. Useful facts: $e^{-\lambda b} \to 0$ for $\lambda > 0$ and $\frac{1}{b} \to 0$, while $\ln b \to \infty$.`,
        },
      ],
      formulas: [
        { name: "Improper integral (upper limit)", tex: r`\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx` },
        { name: "Improper integral (lower limit)", tex: r`\int_{-\infty}^b f(x)\,dx = \lim_{a\to-\infty}\int_a^b f(x)\,dx` },
        { name: "Example [15]", tex: r`\int_0^\infty \lambda e^{-\lambda x}\,dx = 1\quad(\lambda > 0)` },
      ],
      figures: [
        {
          title: "Area to infinity under f(x) = λe^(−λx), λ = 1 (Example [15])",
          xr: [0, 6],
          yr: [0, 1.2],
          curves: [{ f: "exp(-x)", label: "e^(−x)" }],
          shade: [{ f: "exp(-x)", from: 0, to: 6, label: "area = 1" }],
          segments: [{ from: [4.2, 0.35], to: [5.8, 0.35], arrow: true, tone: 3, label: "to ∞" }],
          caption: "The region never ends, yet its area is finite: ∫₀ᵇ e^(−x) dx = 1 − e^(−b) → 1 as b → ∞, so the improper integral converges to 1.",
        },
        {
          title: "Converges vs diverges on [1, ∞)",
          xr: [0, 8],
          yr: [0, 1.5],
          curves: [
            { f: "1/x", label: "1/x (diverges)", tone: 1, from: 0.67 },
            { f: "1/x^2", label: "1/x² (converges)", tone: 0, from: 0.82 },
          ],
          shade: [{ f: "1/x^2", from: 1, to: 8, label: "area → 1" }],
          points: [{ at: [1, 1], label: "(1, 1)" }],
          caption: "∫₁ᵇ x^(−2) dx = 1 − 1/b → 1 (converges), but ∫₁ᵇ (1/x) dx = ln b → ∞ (diverges), even though both curves approach 0.",
        },
      ],
      worked: [
        {
          problem: r`Example [15]: compute the area below the graph of $f(x) = \lambda e^{-\lambda x}$ ($\lambda > 0$) over $[0, \infty)$.`,
          solution: r`By (v) and (iii), $\int \lambda e^{-\lambda x}\,dx = \lambda\cdot\frac{1}{-\lambda}e^{-\lambda x} = -e^{-\lambda x}$. So
$$A = \int_0^\infty \lambda e^{-\lambda x}\,dx = \lim_{b\to\infty}\int_0^b \lambda e^{-\lambda x}\,dx = \lim_{b\to\infty}\Big|_0^b \left(-e^{-\lambda x}\right)$$
$$= \lim_{b\to\infty}\left(-e^{-\lambda b}\right) - \left(-e^{0}\right) = 0 - (-1) = 1.$$
The improper integral converges to $1$.`,
          source: "Lecture Note 8 Example [15]",
        },
        {
          problem: r`Evaluate $\displaystyle\lim_{x\to\infty}\frac{\int_0^x \ln(y + 1)\,dy}{x^2}$, if it exists.`,
          solution: r`**Step 1: the integral.** Substitute $u = y + 1$ ($du = dy$) and use $\int \ln u\,du = u\ln u - u$ (by parts, Assignment 9 Q1(c)):
$\int \ln(y+1)\,dy = (y+1)\ln(y+1) - (y+1) + C$. The constant $-1$ cancels in a definite integral, so
$$\int_0^x \ln(y+1)\,dy = \Big|_0^x \big[(y+1)\ln(y+1) - y\big] = (x+1)\ln(x+1) - x - (1\cdot\ln 1 - 0) = (x+1)\ln(x+1) - x.$$
**Step 2: the limit.** As $x \to \infty$ both $(x+1)\ln(x+1) - x \to \infty$ and $x^2 \to \infty$, an "$\infty/\infty$" form, so use L'Hôpital's rule (Lecture Note 6):
$$\lim_{x\to\infty}\frac{(x+1)\ln(x+1) - x}{x^2} = \lim_{x\to\infty}\frac{\ln(x+1) + 1 - 1}{2x} = \lim_{x\to\infty}\frac{\ln(x+1)}{2x}.$$
Still $\infty/\infty$; apply it again: $\lim_{x\to\infty}\frac{1/(x+1)}{2} = 0$.
The limit exists and equals $0$.`,
          source: "Past paper Q2(a)",
        },
      ],
    },
    // ------------------------------------------------------------------ Economics
    {
      title: "Economic Applications: Marginal Functions and Surplus",
      intro: r`Two exam favourites use integration: recovering **total** cost/revenue/profit from **marginal** functions (Example 6, past paper Q3(e)), and **consumer and producer surplus** as areas (Assignment 9 Q2, past paper Q3(c)).`,
      points: [
        {
          term: "Total from marginal",
          text: r`Since $C'(q) = MC(q)$ and $R'(q) = MR(q)$: $C(q) = \int MC(q)\,dq$ and $R(q) = \int MR(q)\,dq$. Each comes with its own constant of integration.`,
        },
        {
          term: "Pinning down the constants",
          text: r`Cost: the constant equals the fixed cost $C(0)$; if instead you are told the cost at some output (e.g. $C(100) = 100{,}000$), substitute it to solve for the constant. Revenue: selling nothing earns nothing, $R(0) = 0$, so the revenue constant is $0$.`,
        },
        {
          term: "Profit",
          text: r`$\pi(q) = R(q) - C(q)$. A negative value of $\pi$ is a **loss**.`,
        },
        {
          term: "Equilibrium",
          text: r`Set inverse demand equal to inverse supply, $D(Q) = S(Q)$, and solve for $Q^*$ (reject negative roots); then $P^* = D(Q^*)$.`,
        },
        {
          term: "Consumer surplus",
          text: r`The area between the inverse demand curve and the horizontal line $P = P^*$, from $Q = 0$ to $Q^*$:
$$CS = \int_0^{Q^*}\big[D(Q) - P^*\big]\,dQ = \int_0^{Q^*} D(Q)\,dQ - P^*Q^*.$$`,
        },
        {
          term: "Producer surplus",
          text: r`The area between the line $P = P^*$ and the inverse supply curve, from $Q = 0$ to $Q^*$:
$$PS = \int_0^{Q^*}\big[P^* - S(Q)\big]\,dQ = P^*Q^* - \int_0^{Q^*} S(Q)\,dQ.$$`,
        },
        {
          term: "Area between two curves",
          text: r`Both surpluses are areas between two curves: if $f(x) \geq g(x)$ on $[a, b]$, the area between them is $\int_a^b [f(x) - g(x)]\,dx$ (upper minus lower), which by the sum rule is $\int_a^b f\,dx - \int_a^b g\,dx$.`,
        },
      ],
      formulas: [
        { name: "Cost from marginal cost", tex: r`C(q) = \int MC(q)\,dq,\qquad \text{constant} = C(0) = \text{fixed cost}` },
        { name: "Revenue from marginal revenue", tex: r`R(q) = \int MR(q)\,dq,\qquad R(0) = 0` },
        { name: "Consumer surplus", tex: r`CS = \int_0^{Q^*} D(Q)\,dQ - P^*Q^*` },
        { name: "Producer surplus", tex: r`PS = P^*Q^* - \int_0^{Q^*} S(Q)\,dQ` },
        { name: "Area between curves", tex: r`\int_a^b \big[f(x) - g(x)\big]\,dx,\quad f \geq g \text{ on } [a, b]` },
      ],
      figures: [
        {
          title: "Consumer and producer surplus (Assignment 9 Q2)",
          x: "Q",
          y: "P",
          xr: [0, 6],
          yr: [0, 21],
          curves: [
            { f: "20/(x+1)", label: "demand P = 20/(Q+1)" },
            { f: "x+2", label: "supply P = Q+2", tone: 1 },
            { f: "5", label: "P* = 5", dashed: true, tone: 3 },
          ],
          shade: [
            { f: "20/(x+1)", g: "5", from: 0, to: 3, tone: 0, label: "CS" },
            { f: "5", g: "x+2", from: 0, to: 3, tone: 1, label: "PS" },
          ],
          points: [{ at: [3, 5], label: "E (3, 5)", guides: true }],
          caption: "CS = ∫₀³ 20/(Q+1) dQ − 15 = 20 ln 4 − 15 ≈ 12.73 (between demand and P* = 5). PS = 15 − ∫₀³ (Q+2) dQ = 4.5 (between P* = 5 and supply).",
        },
        {
          title: "Consumer surplus (past paper Q3(c))",
          x: "q",
          y: "p",
          xr: [0, 8],
          yr: [0, 16],
          curves: [
            { f: "30/(x+2)", label: "demand p = 30/(q+2)" },
            { f: "x+1", label: "supply p = q+1", tone: 1 },
            { f: "5", label: "p* = 5", dashed: true, tone: 3 },
          ],
          shade: [{ f: "30/(x+2)", g: "5", from: 0, to: 4, tone: 0, label: "CS" }],
          points: [{ at: [4, 5], label: "E (4, 5)", guides: true }],
          caption: "Equilibrium at q* = 4, p* = 5. CS = ∫₀⁴ 30/(q+2) dq − 20 = 30 ln 3 − 20 ≈ 12.96.",
        },
      ],
      worked: [
        {
          problem: r`Inverse demand $P = \frac{20}{Q+1}$, inverse supply $P = Q + 2$. (a) Find the equilibrium price and quantity. (b) Find the consumer surplus. (c) Find the producer surplus.`,
          solution: r`**(a)** $\frac{20}{Q+1} = Q + 2 \Rightarrow 20 = (Q+2)(Q+1) = Q^2 + 3Q + 2 \Rightarrow Q^2 + 3Q - 18 = 0 \Rightarrow (Q + 6)(Q - 3) = 0$.
Reject $Q = -6$: $Q^* = 3$, $P^* = 3 + 2 = 5$.
**(b)** $\int_0^3 \frac{20}{Q+1}\,dQ = \Big|_0^3 20\ln(Q+1) = 20\ln 4 - 20\ln 1 = 20\ln 4$ (substitute $u = Q + 1$).
$CS = 20\ln 4 - P^*Q^* = 20\ln 4 - 15 \approx 27.73 - 15 = 12.73$.
**(c)** $\int_0^3 (Q + 2)\,dQ = \Big|_0^3 \left(\tfrac{1}{2}Q^2 + 2Q\right) = 4.5 + 6 = 10.5$.
$PS = P^*Q^* - 10.5 = 15 - 10.5 = 4.5$.`,
          source: "Assignment 9 Q2",
        },
        {
          problem: r`Inverse demand $p = \frac{30}{q+2}$, inverse supply $p = q + 1$. Calculate the consumer surplus.`,
          solution: r`Equilibrium: $\frac{30}{q+2} = q + 1 \Rightarrow 30 = q^2 + 3q + 2 \Rightarrow q^2 + 3q - 28 = 0 \Rightarrow (q + 7)(q - 4) = 0$, so $q^* = 4$, $p^* = 5$.
$\int_0^4 \frac{30}{q+2}\,dq = \Big|_0^4 30\ln(q+2) = 30\ln 6 - 30\ln 2 = 30\ln 3$.
$CS = 30\ln 3 - p^*q^* = 30\ln 3 - 20 \approx 32.96 - 20 = 12.96$.`,
          source: "Past paper Q3(c)",
        },
        {
          problem: r`$MR(q) = 44 - 5q$, $MC(q) = 3q + 20$, and the cost of producing $100$ units is $100{,}000$ dollars. Derive the profit function and the profit or loss from selling $200$ units.`,
          solution: r`$R(q) = \int (44 - 5q)\,dq = 44q - \frac{5}{2}q^2 + c_1$, and $R(0) = 0$ gives $c_1 = 0$.
$C(q) = \int (3q + 20)\,dq = \frac{3}{2}q^2 + 20q + c_2$. From $C(100) = 100{,}000$: $15{,}000 + 2{,}000 + c_2 = 100{,}000 \Rightarrow c_2 = 83{,}000$.
$\pi(q) = R(q) - C(q) = 44q - 2.5q^2 - 1.5q^2 - 20q - 83{,}000 = -4q^2 + 24q - 83{,}000$.
$\pi(200) = -4(40{,}000) + 24(200) - 83{,}000 = -160{,}000 + 4{,}800 - 83{,}000 = -238{,}200$: a **loss of 238,200 dollars**.`,
          source: "Past paper Q3(e)",
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "integration-c1", type: "concept", front: "Reconstructing a function from its derivative: the reverse process of differentiation.", back: "integration", why: r`Integration takes $F'(x)$ back to $F(x)$; its result is also called an antiderivative.` },
    { id: "integration-c2", type: "concept", front: r`The arbitrary constant $C$ in $\int f(x)\,dx = F(x) + C$.`, back: "constant of integration", why: r`Every $F(x) + C$ has the same derivative $f(x)$, so the constant cannot be recovered from the derivative alone.` },
    { id: "integration-c3", type: "concept", front: r`The function $f(x)$ that sits inside $\int f(x)\,dx$.`, back: "integrand", why: r`$\int$ is the integral sign and $f(x)$ is the integrand.` },
    { id: "integration-c4", type: "concept", front: r`$\int f(x)\,dx = F(x) + C$: a whole class of functions, all with derivative $f(x)$.`, back: "indefinite integral", why: r`No limits of integration, so the answer is a family of functions, not a number.` },
    { id: "integration-c5", type: "concept", front: r`An integral with a lower limit $a$ and an upper limit $b$, equal to $F(b) - F(a)$.`, back: "definite integral", why: r`$\int_a^b f(x)\,dx = F(b) - F(a)$; the constant $C$ cancels, so the result is a number.` },
    { id: "integration-c6", type: "concept", front: r`The economic meaning of the constant $c$ in $C(x) = \int MC\,dx$.`, back: "fixed cost", why: r`At $x = 0$ every other term vanishes, so $C(0) = c$: the cost of producing nothing.` },
    { id: "integration-c7", type: "concept", front: r`What an improper integral $\int_a^\infty f(x)\,dx$ is said to do when $\lim_{b\to\infty}\int_a^b f(x)\,dx$ exists and is finite.`, back: "converges", why: r`E.g. $\int_0^\infty \lambda e^{-\lambda x}\,dx = 1$ converges.` },
    { id: "integration-c8", type: "concept", front: r`What an improper integral is said to do when the limit $\lim_{b\to\infty}\int_a^b f(x)\,dx$ does not exist.`, back: "diverges", why: r`E.g. $\int_1^\infty \frac{1}{x}\,dx = \lim_{b\to\infty}\ln b$ does not exist.` },
    { id: "integration-c9", type: "concept", front: r`The area between the inverse demand curve and the horizontal line $P = P^*$, from $0$ to $Q^*$.`, back: "consumer surplus", why: r`$CS = \int_0^{Q^*} D(Q)\,dQ - P^*Q^*$.` },
    { id: "integration-c10", type: "concept", front: r`The area between the horizontal line $P = P^*$ and the inverse supply curve, from $0$ to $Q^*$.`, back: "producer surplus", why: r`$PS = P^*Q^* - \int_0^{Q^*} S(Q)\,dQ$.` },
    { id: "integration-c11", type: "concept", front: "The integration method obtained by integrating both sides of the product rule.", back: "integration by parts", why: r`$\int f g'\,dx = fg - \int f'g\,dx$.` },
    { id: "integration-c12", type: "concept", front: "The integration method (change of variable) that comes from the chain rule.", back: "integration by substitution", why: r`$\int f(g(x))g'(x)\,dx = \int f(u)\,du$ with $u = g(x)$.` },
    // formula
    { id: "integration-c13", type: "formula", front: r`Rule (i): $\int x^a\,dx$`, back: r`$\frac{1}{a+1}x^{a+1} + C$, for $a \neq -1$`, why: r`Raise the power by one and divide by the new power. Check by differentiating. Fails only for $a = -1$ (division by zero).` },
    { id: "integration-c14", type: "formula", front: r`Rule (ii): $\int \frac{1}{x}\,dx$`, back: r`$\ln|x| + C$`, why: r`The case $a = -1$ that the power rule cannot handle.` },
    { id: "integration-c15", type: "formula", front: r`Rules (iii) and (iv): $\int e^{ax}\,dx$ and $\int a^x\,dx$`, back: r`$\frac{1}{a}e^{ax} + C$ and $\frac{1}{\ln a}a^x + C$ ($a > 0$, $a \neq 1$)`, why: r`Divide by what differentiation would multiply by: $\frac{d}{dx}e^{ax} = ae^{ax}$ and $\frac{d}{dx}a^x = a^x\ln a$.` },
    { id: "integration-c16", type: "formula", front: "Rules (v) and (vi): constants and sums", back: r`$\int af(x)\,dx = a\int f(x)\,dx$; $\int (f + g)\,dx = \int f\,dx + \int g\,dx$`, why: r`Integrate term by term and pull constants out; combine the separate constants into one $C$.` },
    { id: "integration-c17", type: "formula", front: "Definition of the definite integral", back: r`$\int_a^b f(x)\,dx = \Big|_a^b F(x) = F(b) - F(a)$, where $F' = f$`, why: r`Any antiderivative works because $C$ cancels: $[F(b) + C] - [F(a) + C]$.` },
    { id: "integration-c18", type: "formula", front: "Properties (1), (2) and (4) of definite integrals", back: r`$\int_a^b f = -\int_b^a f$; $\int_a^a f = 0$; $\int_a^b f = \int_a^c f + \int_c^b f$`, why: r`Each follows from writing every integral as a difference of $F$-values.` },
    { id: "integration-c19", type: "formula", front: "Integration by parts", back: r`$\int f(x)g'(x)\,dx = f(x)g(x) - \int f'(x)g(x)\,dx$`, why: r`Integrate the product rule $(fg)' = f'g + fg'$ and rearrange. Use for products such as $xe^x$, $\ln x$, $\frac{1}{x}\ln x$.` },
    { id: "integration-c20", type: "formula", front: "Integration by substitution", back: r`$\int f(g(x))g'(x)\,dx = \int f(u)\,du$ with $u = g(x)$, $du = g'(x)\,dx$`, why: r`Use when the derivative of an inside function appears as a factor, e.g. $(x^2+10)^{50}\,2x$.` },
    { id: "integration-c21", type: "formula", front: r`Improper integral $\int_a^\infty f(x)\,dx$`, back: r`$\lim_{b\to\infty}\int_a^b f(x)\,dx$ (converges if the limit exists and is finite)`, why: r`Similarly $\int_{-\infty}^b f\,dx = \lim_{a\to-\infty}\int_a^b f\,dx$.` },
    { id: "integration-c22", type: "formula", front: "Consumer and producer surplus", back: r`$CS = \int_0^{Q^*} D(Q)\,dQ - P^*Q^*$, $PS = P^*Q^* - \int_0^{Q^*} S(Q)\,dQ$`, why: r`$P^*Q^*$ is the rectangle under the price line; CS is the area above it under demand, PS the area below it above supply.` },
    // method
    { id: "integration-c23", type: "method", front: r`Find $C(x)$ given $MC = 2x^2 + 2x + 5$ and fixed cost $100$.`, back: r`$C(x) = \frac{2}{3}x^3 + x^2 + 5x + 100$`, why: r`1. Integrate MC term by term: $\frac{2}{3}x^3 + x^2 + 5x + c$.
2. The constant is fixed cost: $C(0) = c = 100$.
3. Write the full function.` },
    { id: "integration-c24", type: "method", front: r`Derive profit given $MR = 44 - 5q$, $MC = 3q + 20$, $C(100) = 100{,}000$; find $\pi(200)$.`, back: r`$\pi(q) = -4q^2 + 24q - 83{,}000$; $\pi(200) = -238{,}200$ (a loss)`, why: r`1. $R = 44q - 2.5q^2$ (constant $0$ since $R(0) = 0$).
2. $C = 1.5q^2 + 20q + c$; $C(100) = 17{,}000 + c = 100{,}000 \Rightarrow c = 83{,}000$.
3. $\pi = R - C = -4q^2 + 24q - 83{,}000$.
4. $\pi(200) = -160{,}000 + 4{,}800 - 83{,}000 = -238{,}200$.` },
    { id: "integration-c25", type: "method", front: r`$\int xe^x\,dx$`, back: r`Parts with $f = x$, $g' = e^x$: $xe^x - e^x + C$`, why: r`$f' = 1$, $g = e^x$: $\int xe^x\,dx = xe^x - \int 1\cdot e^x\,dx = xe^x - e^x + C$. Choose $f = x$ because it becomes $1$ when differentiated.` },
    { id: "integration-c26", type: "method", front: r`$\int \frac{1}{x}\ln x\,dx$`, back: r`$\frac{1}{2}(\ln x)^2 + C$`, why: r`Parts with $f = \ln x$, $g' = \frac{1}{x}$ ($f' = \frac{1}{x}$, $g = \ln x$): $\int \frac{1}{x}\ln x\,dx = (\ln x)^2 - \int \frac{1}{x}\ln x\,dx$. Move the integral across: $2\int = (\ln x)^2 + C$, so $\int = \frac{1}{2}(\ln x)^2 + C$. (Or substitute $u = \ln x$, $du = \frac{1}{x}dx$: $\int u\,du = \frac{1}{2}u^2 + C$.)` },
    { id: "integration-c27", type: "method", front: r`$\int \ln x\,dx$`, back: r`Parts with $f = \ln x$, $g' = 1$: $x\ln x - x + C$`, why: r`$f' = \frac{1}{x}$, $g = x$: $x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - x + C$.` },
    { id: "integration-c28", type: "method", front: r`$\int x\sqrt{x + 1}\,dx$`, back: r`Substitute $u = x + 1$: $\frac{2}{5}(x+1)^{5/2} - \frac{2}{3}(x+1)^{3/2} + C$`, why: r`$du = dx$ and $x = u - 1$: $\int (u-1)u^{1/2}\,du = \int (u^{3/2} - u^{1/2})\,du = \frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2} + C$, then put $u = x + 1$ back.` },
    { id: "integration-c29", type: "method", front: r`$\int \left(2e^{2x} + \frac{14x}{7x^2+5}\right)dx$`, back: r`$e^{2x} + \ln(7x^2 + 5) + C$`, why: r`Split the sum. $\int 2e^{2x}\,dx = 2\cdot\frac{1}{2}e^{2x}$. For the fraction, $u = 7x^2 + 5$, $du = 14x\,dx$, so it is $\int \frac{du}{u} = \ln|u|$.` },
    { id: "integration-c30", type: "method", front: r`$\int (x^2+10)^{50}\,2x\,dx$ or $\int 8x^2(3x^3-1)^{16}\,dx$`, back: r`Substitute the inside: $\frac{1}{51}(x^2+10)^{51} + C$; $\frac{8}{153}(3x^3-1)^{17} + C$`, why: r`1. $u$ = inside of the power. 2. $du = g'(x)\,dx$ ($2x\,dx$; $9x^2\,dx$). 3. Fix constants: $8x^2 = \frac{8}{9}\cdot 9x^2$. 4. Integrate $u^n$ and substitute back.` },
    { id: "integration-c31", type: "method", front: r`$\int_1^4 3\sqrt{x}\,dx$ and $\int_0^1 e^{\frac{4}{3}y}\,dy$`, back: r`$14$ and $\frac{3}{4}(e^{4/3} - 1) \approx 2.095$`, why: r`$\int 3x^{1/2}\,dx = 2x^{3/2}$: $2(8) - 2(1) = 14$. $\int e^{\frac{4}{3}y}\,dy = \frac{3}{4}e^{\frac{4}{3}y}$: $\frac{3}{4}e^{4/3} - \frac{3}{4}$.` },
    { id: "integration-c32", type: "method", front: r`How do you evaluate an improper integral such as $\int_0^\infty \lambda e^{-\lambda x}\,dx$?`, back: r`Replace $\infty$ by $b$, integrate, let $b \to \infty$; here the answer is $1$.`, why: r`$\int_0^b \lambda e^{-\lambda x}\,dx = \Big|_0^b(-e^{-\lambda x}) = 1 - e^{-\lambda b} \to 1$ as $b \to \infty$ (since $\lambda > 0$). The limit exists, so it converges.` },
    { id: "integration-c33", type: "method", front: r`Does $\int_1^\infty \frac{1}{x}\,dx$ converge? Does $\int_1^\infty \frac{1}{x^2}\,dx$?`, back: r`$\frac{1}{x}$: diverges; $\frac{1}{x^2}$: converges to $1$.`, why: r`$\int_1^b \frac{1}{x}\,dx = \ln b \to \infty$: no finite limit. $\int_1^b x^{-2}\,dx = \Big|_1^b(-x^{-1}) = 1 - \frac{1}{b} \to 1$.` },
    { id: "integration-c34", type: "method", front: r`Evaluate $\lim_{x\to\infty}\frac{\int_0^x \ln(y+1)\,dy}{x^2}$.`, back: r`Integrate first, then L'Hôpital twice: the limit is $0$.`, why: r`1. $\int_0^x \ln(y+1)\,dy = (x+1)\ln(x+1) - x$ (substitute $u = y + 1$, then $\int \ln u\,du = u\ln u - u$).
2. $\infty/\infty$: L'Hôpital gives $\frac{\ln(x+1)}{2x}$.
3. Again: $\frac{1/(x+1)}{2} \to 0$.` },
    { id: "integration-c35", type: "method", front: r`Find the equilibrium for $P = \frac{20}{Q+1}$ and $P = Q + 2$.`, back: r`$Q^* = 3$, $P^* = 5$`, why: r`Set equal: $20 = (Q+2)(Q+1) = Q^2 + 3Q + 2$, so $Q^2 + 3Q - 18 = (Q+6)(Q-3) = 0$. Reject the negative root.` },
    { id: "integration-c36", type: "method", front: r`Consumer surplus for $P = \frac{20}{Q+1}$, equilibrium $(Q^*, P^*) = (3, 5)$.`, back: r`$CS = 20\ln 4 - 15 \approx 12.73$`, why: r`$\int_0^3 \frac{20}{Q+1}\,dQ = 20\ln(Q+1)\Big|_0^3 = 20\ln 4$. Subtract the rectangle $P^*Q^* = 15$.` },
    { id: "integration-c37", type: "method", front: r`Producer surplus for supply $P = Q + 2$, equilibrium $(3, 5)$.`, back: r`$PS = 15 - 10.5 = 4.5$`, why: r`$\int_0^3 (Q + 2)\,dQ = \frac{9}{2} + 6 = 10.5$ is the area under supply; $PS = P^*Q^* - 10.5 = 15 - 10.5$.` },
    { id: "integration-c38", type: "method", front: r`Consumer surplus for demand $p = \frac{30}{q+2}$ and supply $p = q + 1$.`, back: r`$q^* = 4$, $p^* = 5$, $CS = 30\ln 3 - 20 \approx 12.96$`, why: r`1. $30 = (q+1)(q+2) \Rightarrow q^2 + 3q - 28 = (q+7)(q-4) = 0 \Rightarrow q^* = 4$, $p^* = 5$.
2. $\int_0^4 \frac{30}{q+2}\,dq = 30\ln 6 - 30\ln 2 = 30\ln 3$.
3. $CS = 30\ln 3 - 4\times 5$.` },
    { id: "integration-c39", type: "method", front: "Parts or substitution? How do you choose?", back: r`Derivative of an inside function present as a factor → substitution; product of unrelated types ($x\cdot e^x$, $\ln x\cdot 1$) → parts.`, why: r`Substitution: $(x^2+10)^{50}\,2x$, $\frac{14x}{7x^2+5}$, $x\sqrt{x+1}$. Parts: $xe^x$, $\ln x$, $\frac{1}{x}\ln x$. In parts, differentiate the factor that gets simpler ($x$, $\ln x$) and integrate the other.` },
    { id: "integration-c40", type: "method", front: r`How do you check an indefinite integral?`, back: r`Differentiate your answer; you must get the integrand back.`, why: r`$\frac{d}{dx}\int f(x)\,dx = f(x)$ because differentiation and integration cancel. E.g. $\frac{d}{dx}(x\ln x - x) = \ln x + 1 - 1 = \ln x$.` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 8.1
    {
      id: "integration-q1", kind: "mcq", sub: "Basic formulas",
      prompt: r`$\int x^5\,dx = $`,
      options: [r`$\frac{1}{6}x^6 + C$`, r`$5x^4 + C$`, r`$x^6 + C$`, r`$\frac{1}{5}x^6 + C$`],
      answer: 0,
      explain: r`Rule (i) with $a = 5$: $\frac{1}{5+1}x^{5+1} + C = \frac{1}{6}x^6 + C$. ($5x^4$ is the derivative, not the integral.)`,
    },
    {
      id: "integration-q2", kind: "mcq", sub: "Basic formulas",
      prompt: r`$\int \frac{1}{x}\,dx = $`,
      options: [r`$\ln|x| + C$`, r`$\frac{x^0}{0} + C$`, r`$-\frac{1}{x^2} + C$`, r`$e^x + C$`],
      answer: 0,
      explain: r`Rule (ii). The power rule fails for $a = -1$ (it would divide by $0$); $-\frac{1}{x^2}$ is the derivative of $\frac{1}{x}$.`,
    },
    {
      id: "integration-q3", kind: "mcq", sub: "Basic formulas",
      prompt: r`$\int e^{3x}\,dx = $`,
      options: [r`$\frac{1}{3}e^{3x} + C$`, r`$3e^{3x} + C$`, r`$e^{3x} + C$`, r`$\frac{1}{4}e^{4x} + C$`],
      answer: 0,
      explain: r`Rule (iii) with $a = 3$: $\frac{1}{3}e^{3x} + C$. Check: $\frac{d}{dx}\frac{1}{3}e^{3x} = e^{3x}$.`,
    },
    {
      id: "integration-q4", kind: "mcq", sub: "Basic formulas",
      prompt: r`$\int 2^x\,dx = $`,
      options: [r`$\frac{2^x}{\ln 2} + C$`, r`$2^x\ln 2 + C$`, r`$x\,2^{x-1} + C$`, r`$\frac{2^{x+1}}{x+1} + C$`],
      answer: 0,
      explain: r`Rule (iv): $\int a^x\,dx = \frac{1}{\ln a}a^x + C$. $2^x\ln 2$ is the derivative; the power-rule-style answers treat $x$ as the base, which is wrong.`,
    },
    {
      id: "integration-q5", kind: "mcq", sub: "Basic formulas",
      prompt: r`$\int \frac{2}{3}x^2\,dx = $`,
      options: [r`$\frac{2}{9}x^3 + C$`, r`$\frac{2}{3}x^3 + C$`, r`$\frac{4}{3}x + C$`, r`$\frac{1}{2}x^3 + C$`],
      answer: 0,
      explain: r`By (v) and (i): $\frac{2}{3}\cdot\frac{1}{3}x^3 + C = \frac{2}{9}x^3 + C$ (Lecture Note 8 Example [5]).`,
    },
    {
      id: "integration-q6", kind: "mcq", sub: "Indefinite integral",
      prompt: r`Which of the following is **not** an antiderivative of $3x^2$?`,
      options: [r`$3x^3$`, r`$x^3 + 5$`, r`$x^3 - \pi$`, r`$x^3$`],
      answer: 0,
      explain: r`Antiderivatives are $x^3 + C$ for any constant $C$; all of $x^3$, $x^3 + 5$, $x^3 - \pi$ have derivative $3x^2$. But $\frac{d}{dx}3x^3 = 9x^2$.`,
    },
    {
      id: "integration-q7", kind: "mcq", sub: "Indefinite integral",
      prompt: r`$\frac{d}{dx}\int F'(x)\,dx = $`,
      options: [r`$F'(x)$`, r`$F(x)$`, r`$F''(x)$`, r`$F(x) + C$`],
      answer: 0,
      explain: r`Differentiation and integration cancel: $\int F'(x)\,dx = F(x) + C$, whose derivative is $F'(x)$.`,
    },
    {
      id: "integration-q8", kind: "fill", sub: "Indefinite integral",
      prompt: r`$\int x^{-1/2}\,dx = k\,x^{1/2} + C$ where $k$ = ____.`,
      answers: [["2"]],
      explain: r`Rule (i) with $a = -\frac{1}{2}$: $\frac{1}{1/2}x^{1/2} = 2x^{1/2}$.`,
    },
    {
      id: "integration-q9", kind: "fill", sub: "Cost from marginal cost",
      prompt: r`Marginal cost is $C'(x) = 2x^2 + 2x + 5$ and fixed cost is $100$. The cost of producing $x = 3$ units is $C(3)$ = ____.`,
      answers: [["142"]],
      explain: r`$C(x) = \frac{2}{3}x^3 + x^2 + 5x + 100$ (Example [6]). $C(3) = \frac{2}{3}(27) + 9 + 15 + 100 = 18 + 9 + 15 + 100 = 142$.`,
    },
    // 8.2
    {
      id: "integration-q10", kind: "fill", sub: "Definite integrals",
      prompt: r`$\int_2^5 x^2\,dx$ = ____.`,
      answers: [["39", "117/3"]],
      explain: r`$\frac{1}{3}x^3\Big|_2^5 = \frac{1}{3}(125 - 8) = \frac{117}{3} = 39$ (Example [9]).`,
    },
    {
      id: "integration-q11", kind: "fill", sub: "Definite integrals",
      prompt: r`The area under $y = x^2$ over $[0, 1]$ is ____ (give a fraction or decimal).`,
      answers: [["1/3", "0.333", "0.33"]],
      explain: r`$\int_0^1 x^2\,dx = \frac{1}{3}(1)^3 - \frac{1}{3}(0)^3 = \frac{1}{3}$ (Example [8]).`,
    },
    {
      id: "integration-q12", kind: "mcq", sub: "Definite integrals",
      prompt: r`$\int_0^1 e^x\,dx = $`,
      options: [r`$e - 1$`, r`$e$`, r`$1$`, r`$e + 1$`],
      answer: 0,
      explain: r`$e^x\Big|_0^1 = e^1 - e^0 = e - 1$ (Example [10]). Forgetting $e^0 = 1$ gives $e$.`,
    },
    {
      id: "integration-q13", kind: "fill", sub: "Definite integrals",
      prompt: r`$\int_0^2 (3x^2 + 2x)\,dx$ = ____.`,
      answers: [["12"]],
      explain: r`$\Big|_0^2 (x^3 + x^2) = (8 + 4) - 0 = 12$.`,
    },
    {
      id: "integration-q14", kind: "mcq", sub: "Definite integrals",
      prompt: r`Why can the constant $C$ be ignored when evaluating $\int_a^b f(x)\,dx$?`,
      options: [
        r`$[F(b) + C] - [F(a) + C] = F(b) - F(a)$: it cancels`,
        r`Because $C = 0$ for every function`,
        r`Because definite integrals are only defined for $f \geq 0$`,
        r`Because $C$ is the fixed cost, which is zero in the long run`,
      ],
      answer: 0,
      explain: r`Whatever antiderivative you use, the same $C$ is added at both limits and subtracted away. $C$ is not zero in general (it matters in indefinite integrals).`,
    },
    // 8.3
    {
      id: "integration-q15", kind: "mcq", sub: "Properties",
      prompt: r`Given $\int_2^5 x^2\,dx = 39$, the value of $\int_5^2 x^2\,dx$ is`,
      options: [r`$-39$`, r`$39$`, r`$0$`, r`$\frac{1}{39}$`],
      answer: 0,
      explain: r`Property (1): swapping the limits changes the sign, $\int_5^2 = -\int_2^5 = -39$.`,
    },
    {
      id: "integration-q16", kind: "fill", sub: "Properties",
      prompt: r`$\int_3^3 (x^4 + e^x)\,dx$ = ____.`,
      answers: [["0"]],
      explain: r`Property (2): equal limits give $F(3) - F(3) = 0$, whatever the integrand.`,
    },
    {
      id: "integration-q17", kind: "fill", sub: "Properties",
      prompt: r`If $\int_0^2 f(x)\,dx = 5$ and $\int_2^6 f(x)\,dx = 7$, then $\int_0^6 f(x)\,dx$ = ____ and $\int_6^2 3f(x)\,dx$ = ____.`,
      answers: [["12"], ["-21"]],
      explain: r`Property (4): $5 + 7 = 12$. Properties (1) and (3): $\int_6^2 3f\,dx = -3\int_2^6 f\,dx = -21$.`,
    },
    {
      id: "integration-q18", kind: "fill", sub: "Properties",
      prompt: r`$\int_1^4 3\sqrt{x}\,dx$ = ____.`,
      answers: [["14"]],
      explain: r`$\int 3x^{1/2}\,dx = 2x^{3/2}$, so $2(4)^{3/2} - 2(1)^{3/2} = 16 - 2 = 14$ (Assignment 9 Q1(d)).`,
    },
    // 8.4
    {
      id: "integration-q19", kind: "mcq", sub: "Integration by parts",
      prompt: r`Which is the integration by parts formula?`,
      options: [
        r`$\int f g'\,dx = fg - \int f'g\,dx$`,
        r`$\int f g'\,dx = f'g - \int fg'\,dx$`,
        r`$\int f g'\,dx = \int f\,dx \cdot \int g'\,dx$`,
        r`$\int f g'\,dx = fg + \int f'g\,dx$`,
      ],
      answer: 0,
      explain: r`Integrating the product rule $(fg)' = f'g + fg'$ gives $fg = \int f'g\,dx + \int fg'\,dx$; rearrange. The integral of a product is not the product of the integrals.`,
    },
    {
      id: "integration-q20", kind: "mcq", sub: "Integration by parts",
      prompt: r`$\int xe^x\,dx = $`,
      options: [r`$xe^x - e^x + C$`, r`$\frac{1}{2}x^2e^x + C$`, r`$xe^x + e^x + C$`, r`$e^x + C$`],
      answer: 0,
      explain: r`$f = x$, $g' = e^x$: $xe^x - \int 1\cdot e^x\,dx = xe^x - e^x + C$. $\frac{1}{2}x^2e^x$ wrongly multiplies the separate integrals (Example [11]).`,
    },
    {
      id: "integration-q21", kind: "mcq", sub: "Integration by parts",
      prompt: r`$\int \ln x\,dx$ ($x > 0$) $=$`,
      options: [r`$x\ln x - x + C$`, r`$\frac{1}{x} + C$`, r`$x\ln x + C$`, r`$\frac{1}{2}(\ln x)^2 + C$`],
      answer: 0,
      explain: r`Parts with $f = \ln x$, $g' = 1$: $x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - x + C$. $\frac{1}{x}$ is the derivative of $\ln x$ (Assignment 9 Q1(c)).`,
    },
    {
      id: "integration-q22", kind: "mcq", sub: "Integration by parts",
      prompt: r`$\int \frac{1}{x}\ln x\,dx = $`,
      options: [r`$\frac{1}{2}(\ln x)^2 + C$`, r`$(\ln x)^2 + C$`, r`$\ln(\ln x) + C$`, r`$x\ln x - x + C$`],
      answer: 0,
      explain: r`Parts with $f = \ln x$, $g' = \frac{1}{x}$: $\int = (\ln x)^2 - \int$, so $2\int = (\ln x)^2 + C$ and $\int = \frac{1}{2}(\ln x)^2 + C$ (Example [12], past paper Q1(e)).`,
    },
    {
      id: "integration-q23", kind: "mcq", sub: "Integration by parts",
      prompt: r`Using parts with $f = x$, $g' = e^{2x}$: $\int xe^{2x}\,dx = $`,
      options: [r`$\frac{1}{2}xe^{2x} - \frac{1}{4}e^{2x} + C$`, r`$2xe^{2x} - 4e^{2x} + C$`, r`$\frac{1}{2}xe^{2x} - \frac{1}{2}e^{2x} + C$`, r`$xe^{2x} - e^{2x} + C$`],
      answer: 0,
      explain: r`$g = \frac{1}{2}e^{2x}$, $f' = 1$: $\frac{1}{2}xe^{2x} - \int \frac{1}{2}e^{2x}\,dx = \frac{1}{2}xe^{2x} - \frac{1}{4}e^{2x} + C$.`,
    },
    {
      id: "integration-q24", kind: "fill", sub: "Integration by parts",
      prompt: r`$\int_0^1 xe^x\,dx$ = ____.`,
      answers: [["1"]],
      explain: r`$\Big|_0^1(xe^x - e^x) = (e - e) - (0 - 1) = 1$.`,
    },
    // 8.5
    {
      id: "integration-q25", kind: "mcq", sub: "Substitution",
      prompt: r`$\int (x^2 + 10)^{50}\,2x\,dx = $`,
      options: [r`$\frac{1}{51}(x^2 + 10)^{51} + C$`, r`$\frac{1}{51}(x^2 + 10)^{51}x^2 + C$`, r`$50(x^2 + 10)^{49}\,2x + C$`, r`$\frac{2}{51}(x^2 + 10)^{51} + C$`],
      answer: 0,
      explain: r`$u = x^2 + 10$, $du = 2x\,dx$: $\int u^{50}\,du = \frac{1}{51}u^{51} + C$ (Example [13]). The $2x\,dx$ is used up by $du$.`,
    },
    {
      id: "integration-q26", kind: "mcq", sub: "Substitution",
      prompt: r`$\int 8x^2(3x^3 - 1)^{16}\,dx = $`,
      options: [r`$\frac{8}{153}(3x^3 - 1)^{17} + C$`, r`$\frac{8}{17}(3x^3 - 1)^{17} + C$`, r`$\frac{8}{51}(3x^3 - 1)^{17} + C$`, r`$\frac{72}{17}(3x^3 - 1)^{17} + C$`],
      answer: 0,
      explain: r`$u = 3x^3 - 1$, $du = 9x^2\,dx$, so $8x^2\,dx = \frac{8}{9}du$: $\frac{8}{9}\cdot\frac{1}{17}u^{17} = \frac{8}{153}(3x^3 - 1)^{17} + C$ (Example [14]).`,
    },
    {
      id: "integration-q27", kind: "mcq", sub: "Substitution",
      prompt: r`$\int \frac{14x}{7x^2 + 5}\,dx = $`,
      options: [r`$\ln(7x^2 + 5) + C$`, r`$14x\ln(7x^2 + 5) + C$`, r`$\frac{1}{14x}\ln(7x^2 + 5) + C$`, r`$\frac{7x^2}{\frac{7}{3}x^3 + 5x} + C$`],
      answer: 0,
      explain: r`$u = 7x^2 + 5$, $du = 14x\,dx$: $\int \frac{du}{u} = \ln|u| + C = \ln(7x^2 + 5) + C$ (Assignment 9 Q1(a)).`,
    },
    {
      id: "integration-q28", kind: "fill", sub: "Substitution",
      prompt: r`$\int_0^1 2x(x^2 + 1)^3\,dx$ = ____.`,
      answers: [["3.75", "15/4"]],
      explain: r`$u = x^2 + 1$, $du = 2x\,dx$: antiderivative $\frac{1}{4}(x^2+1)^4$. Value: $\frac{1}{4}(2^4 - 1^4) = \frac{15}{4} = 3.75$.`,
    },
    {
      id: "integration-q29", kind: "mcq", sub: "Substitution",
      prompt: r`$\int x\sqrt{x + 1}\,dx = $`,
      options: [
        r`$\frac{2}{5}(x+1)^{5/2} - \frac{2}{3}(x+1)^{3/2} + C$`,
        r`$\frac{2}{5}(x+1)^{5/2} + C$`,
        r`$\frac{1}{2}x^2\cdot\frac{2}{3}(x+1)^{3/2} + C$`,
        r`$\frac{2}{3}x(x+1)^{3/2} + C$`,
      ],
      answer: 0,
      explain: r`$u = x + 1$, $x = u - 1$, $du = dx$: $\int (u^{3/2} - u^{1/2})\,du = \frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2} + C$ (Assignment 9 Q1(b)). The other options forget the leftover $x$ or multiply separate integrals.`,
    },
    {
      id: "integration-q30", kind: "mcq", sub: "Substitution",
      prompt: r`$\int_0^1 e^{\frac{4}{3}y}\,dy = $`,
      options: [r`$\frac{3}{4}(e^{4/3} - 1)$`, r`$\frac{4}{3}(e^{4/3} - 1)$`, r`$\frac{3}{4}e^{4/3}$`, r`$e^{4/3} - 1$`],
      answer: 0,
      explain: r`$\int e^{\frac{4}{3}y}\,dy = \frac{3}{4}e^{\frac{4}{3}y}$; evaluate: $\frac{3}{4}e^{4/3} - \frac{3}{4}e^0 = \frac{3}{4}(e^{4/3} - 1) \approx 2.095$ (Assignment 9 Q1(e)).`,
    },
    // 8.6
    {
      id: "integration-q31", kind: "mcq", sub: "Infinite intervals",
      prompt: r`For $\lambda > 0$, $\int_0^\infty \lambda e^{-\lambda x}\,dx = $`,
      options: [r`$1$`, r`$\lambda$`, r`$\frac{1}{\lambda}$`, r`It diverges`],
      answer: 0,
      explain: r`$\lim_{b\to\infty}\Big|_0^b(-e^{-\lambda x}) = \lim_{b\to\infty}(1 - e^{-\lambda b}) = 1$ (Example [15]).`,
    },
    {
      id: "integration-q32", kind: "fill", sub: "Infinite intervals",
      prompt: r`$\int_1^\infty x^{-2}\,dx$ = ____.`,
      answers: [["1"]],
      explain: r`$\int_1^b x^{-2}\,dx = \Big|_1^b(-x^{-1}) = 1 - \frac{1}{b} \to 1$ as $b \to \infty$.`,
    },
    {
      id: "integration-q33", kind: "mcq", sub: "Infinite intervals",
      prompt: r`$\int_1^\infty \frac{1}{x}\,dx$`,
      options: [r`diverges, since $\int_1^b \frac{1}{x}\,dx = \ln b \to \infty$`, r`converges to $0$, since $\frac{1}{x} \to 0$`, r`converges to $1$`, r`converges to $\ln 1 = 0$`],
      answer: 0,
      explain: r`The integrand tending to $0$ is not enough. $\lim_{b\to\infty}\ln b$ does not exist (it is infinite), so the improper integral diverges.`,
    },
    {
      id: "integration-q34", kind: "fill", sub: "Infinite intervals",
      prompt: r`$\int_0^\infty e^{-2x}\,dx$ = ____.`,
      answers: [["0.5", "1/2"]],
      explain: r`$\int_0^b e^{-2x}\,dx = \Big|_0^b\left(-\frac{1}{2}e^{-2x}\right) = \frac{1}{2} - \frac{1}{2}e^{-2b} \to \frac{1}{2}$.`,
    },
    {
      id: "integration-q35", kind: "mcq", sub: "Limits of integrals",
      prompt: r`$\lim_{x\to\infty}\frac{\int_0^x \ln(y+1)\,dy}{x^2} = $`,
      options: [r`$0$`, r`$\frac{1}{2}$`, r`$1$`, r`$\infty$`],
      answer: 0,
      explain: r`The integral is $(x+1)\ln(x+1) - x$. L'Hôpital: $\frac{\ln(x+1)}{2x}$, then $\frac{1/(x+1)}{2} \to 0$ (past paper Q2(a)).`,
    },
    // economics
    {
      id: "integration-q36", kind: "fill", sub: "Surplus",
      prompt: r`For inverse demand $P = \frac{20}{Q+1}$ and inverse supply $P = Q + 2$, the equilibrium quantity is ____ and the equilibrium price is ____.`,
      answers: [["3"], ["5"]],
      explain: r`$20 = (Q+2)(Q+1) \Rightarrow Q^2 + 3Q - 18 = (Q+6)(Q-3) = 0 \Rightarrow Q^* = 3$, $P^* = 5$ (Assignment 9 Q2(a)).`,
    },
    {
      id: "integration-q37", kind: "mcq", sub: "Surplus",
      prompt: r`With $P = \frac{20}{Q+1}$ and equilibrium $(Q^*, P^*) = (3, 5)$, consumer surplus is`,
      options: [r`$20\ln 4 - 15 \approx 12.73$`, r`$20\ln 4 \approx 27.73$`, r`$20\ln 3 - 15 \approx 6.97$`, r`$15 - 20\ln 4$`],
      answer: 0,
      explain: r`$\int_0^3 \frac{20}{Q+1}\,dQ = 20\ln 4 - 20\ln 1 = 20\ln 4$, minus the rectangle $P^*Q^* = 15$ (Assignment 9 Q2(b)). Note the upper limit gives $\ln(3+1)$, not $\ln 3$.`,
    },
    {
      id: "integration-q38", kind: "fill", sub: "Surplus",
      prompt: r`With inverse supply $P = Q + 2$ and equilibrium $(Q^*, P^*) = (3, 5)$, producer surplus is ____.`,
      answers: [["4.5", "9/2"]],
      explain: r`$PS = 15 - \int_0^3 (Q + 2)\,dQ = 15 - (4.5 + 6) = 4.5$ (Assignment 9 Q2(c)).`,
    },
    {
      id: "integration-q39", kind: "mcq", sub: "Surplus",
      prompt: r`Inverse demand $p = \frac{30}{q+2}$, inverse supply $p = q + 1$. The consumer surplus is`,
      options: [r`$30\ln 3 - 20 \approx 12.96$`, r`$30\ln 6 - 20 \approx 33.75$`, r`$30\ln 3 \approx 32.96$`, r`$30\ln 4 - 20 \approx 21.59$`],
      answer: 0,
      explain: r`Equilibrium $q^* = 4$, $p^* = 5$. $\int_0^4 \frac{30}{q+2}\,dq = 30\ln 6 - 30\ln 2 = 30\ln 3$; subtract $p^*q^* = 20$ (past paper Q3(c)). Forgetting the lower limit gives $30\ln 6$.`,
    },
    {
      id: "integration-q40", kind: "fill", sub: "Total from marginal",
      prompt: r`$MR = 44 - 5q$, $MC = 3q + 20$ and $C(100) = 100{,}000$. The profit from selling $200$ units is ____ dollars (negative for a loss).`,
      answers: [["-238200", "-238,200"]],
      explain: r`$R = 44q - 2.5q^2$, $C = 1.5q^2 + 20q + 83{,}000$, so $\pi = -4q^2 + 24q - 83{,}000$ and $\pi(200) = -160{,}000 + 4{,}800 - 83{,}000 = -238{,}200$ (past paper Q3(e)).`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "integration-x1", kind: "calc", sub: "Basic formulas and substitution",
      prompt: r`Evaluate $\displaystyle\int \left(2e^{2x} + \frac{14x}{7x^2 + 5}\right)dx$.`,
      marks: 5,
      rubric: [
        { point: r`Splits by the sum rule and integrates $2e^{2x}$ to $e^{2x}$`, marks: 1.5 },
        { point: r`Substitution $u = 7x^2 + 5$, $du = 14x\,dx$, giving $\int \frac{1}{u}\,du$`, marks: 1.5 },
        { point: r`$\ln(7x^2 + 5)$ (or $\ln|7x^2+5|$)`, marks: 1 },
        { point: r`Correct final answer including $+ C$`, marks: 1 },
      ],
      model: r`By rule (vi), integrate each term separately.
$\int 2e^{2x}\,dx = 2\cdot\frac{1}{2}e^{2x} = e^{2x}$ (rules (v) and (iii)).
For the second term let $u = 7x^2 + 5$. Then $\frac{du}{dx} = 14x$, so $du = 14x\,dx$ and
$$\int \frac{14x}{7x^2 + 5}\,dx = \int \frac{1}{u}\,du = \ln|u| = \ln(7x^2 + 5),$$
since $7x^2 + 5 > 0$. Hence
$$\int \left(2e^{2x} + \frac{14x}{7x^2 + 5}\right)dx = e^{2x} + \ln(7x^2 + 5) + C.$$
Check: $\frac{d}{dx}\left[e^{2x} + \ln(7x^2+5)\right] = 2e^{2x} + \frac{14x}{7x^2+5}$. ✓`,
      answer: r`$e^{2x} + \ln(7x^2 + 5) + C$`,
      source: "Assignment 9 Q1(a)",
    },
    {
      id: "integration-x2", kind: "calc", sub: "Substitution",
      prompt: r`Evaluate $\displaystyle\int x\sqrt{x + 1}\,dx$.`,
      marks: 5,
      rubric: [
        { point: r`Substitution $u = x + 1$ with $du = dx$ and $x = u - 1$`, marks: 2 },
        { point: r`Integrand rewritten as $u^{3/2} - u^{1/2}$ and integrated: $\frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2}$`, marks: 2 },
        { point: r`Back in terms of $x$, with $+ C$`, marks: 1 },
      ],
      model: r`Let $u = x + 1$. Then $du = dx$ and $x = u - 1$:
$$\int x\sqrt{x+1}\,dx = \int (u - 1)u^{1/2}\,du = \int \left(u^{3/2} - u^{1/2}\right)du = \frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2} + C.$$
Changing back to $x$:
$$\int x\sqrt{x+1}\,dx = \frac{2}{5}(x+1)^{5/2} - \frac{2}{3}(x+1)^{3/2} + C.$$
(Alternative: parts with $f = x$, $g' = (x+1)^{1/2}$, $g = \frac{2}{3}(x+1)^{3/2}$ gives $\frac{2}{3}x(x+1)^{3/2} - \frac{4}{15}(x+1)^{5/2} + C$, which is the same function.)`,
      answer: r`$\frac{2}{5}(x+1)^{5/2} - \frac{2}{3}(x+1)^{3/2} + C$`,
      source: "Assignment 9 Q1(b)",
    },
    {
      id: "integration-x3", kind: "calc", sub: "Integration by parts",
      prompt: r`Evaluate $\displaystyle\int \ln(x)\,dx$, where $x$ is positive.`,
      marks: 5,
      rubric: [
        { point: r`Writes $\ln x = \ln x\cdot 1$ and chooses $f = \ln x$, $g' = 1$`, marks: 1.5 },
        { point: r`$f' = \frac{1}{x}$, $g = x$ and applies the formula: $x\ln x - \int x\cdot\frac{1}{x}\,dx$`, marks: 2 },
        { point: r`$x\ln x - x + C$`, marks: 1.5 },
      ],
      model: r`Integration by parts: $\int f(x)g'(x)\,dx = f(x)g(x) - \int f'(x)g(x)\,dx$.
Take $f(x) = \ln x$ and $g'(x) = 1$, so $f'(x) = \frac{1}{x}$ and $g(x) = x$:
$$\int \ln x\,dx = x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - \int 1\,dx = x\ln x - x + C.$$
Check: $\frac{d}{dx}(x\ln x - x) = \ln x + x\cdot\frac{1}{x} - 1 = \ln x$. ✓`,
      answer: r`$x\ln x - x + C$`,
      source: "Assignment 9 Q1(c)",
    },
    {
      id: "integration-x4", kind: "calc", sub: "Definite integrals",
      prompt: r`Evaluate (a) $\displaystyle\int_1^4 3\sqrt{x}\,dx$ and (b) $\displaystyle\int_0^1 e^{\frac{4}{3}y}\,dy$.`,
      marks: 5,
      rubric: [
        { point: r`(a) Antiderivative $2x^{3/2}$`, marks: 1 },
        { point: r`(a) $2(8) - 2(1) = 14$`, marks: 1.5 },
        { point: r`(b) Antiderivative $\frac{3}{4}e^{\frac{4}{3}y}$`, marks: 1 },
        { point: r`(b) $\frac{3}{4}(e^{4/3} - 1) \approx 2.095$`, marks: 1.5 },
      ],
      model: r`**(a)** $\int 3x^{1/2}\,dx = 3\cdot\frac{2}{3}x^{3/2} = 2x^{3/2}$ (rules (v), (i)). So
$$\int_1^4 3\sqrt{x}\,dx = \Big|_1^4 2x^{3/2} = 2(4)^{3/2} - 2(1)^{3/2} = 2(8) - 2 = 14.$$
**(b)** By rule (iii) with $a = \frac{4}{3}$: $\int e^{\frac{4}{3}y}\,dy = \frac{3}{4}e^{\frac{4}{3}y}$. So
$$\int_0^1 e^{\frac{4}{3}y}\,dy = \Big|_0^1 \tfrac{3}{4}e^{\frac{4}{3}y} = \frac{3}{4}e^{4/3} - \frac{3}{4}e^0 = \frac{3}{4}\left(e^{4/3} - 1\right) \approx 2.095.$$`,
      answer: r`(a) $14$; (b) $\frac{3}{4}(e^{4/3} - 1) \approx 2.095$`,
      source: "Assignment 9 Q1(d), (e)",
    },
    {
      id: "integration-x5", kind: "calc", sub: "Consumer surplus",
      prompt: r`Suppose the inverse demand function is $P = \frac{20}{Q+1}$ and the inverse supply function is $P = Q + 2$. Find the equilibrium price and quantity, and the consumer surplus.`,
      marks: 5,
      rubric: [
        { point: r`Sets demand = supply and obtains $Q^2 + 3Q - 18 = 0$`, marks: 1 },
        { point: r`$Q^* = 3$ (rejecting $Q = -6$), $P^* = 5$`, marks: 1 },
        { point: r`Sets up $CS = \int_0^3 \frac{20}{Q+1}\,dQ - P^*Q^*$`, marks: 1.5 },
        { point: r`$CS = 20\ln 4 - 15 \approx 12.73$`, marks: 1.5 },
      ],
      model: r`**Equilibrium.** $\frac{20}{Q+1} = Q + 2 \Rightarrow 20 = (Q+2)(Q+1) = Q^2 + 3Q + 2 \Rightarrow Q^2 + 3Q - 18 = 0 \Rightarrow (Q+6)(Q-3) = 0$.
Quantity cannot be negative, so $Q^* = 3$ and $P^* = 3 + 2 = 5$.
**Consumer surplus** = area between the demand curve and the price line $P = 5$ from $0$ to $3$:
$$CS = \int_0^3 \frac{20}{Q+1}\,dQ - P^*Q^* = \Big|_0^3 20\ln(Q+1) - 15 = 20\ln 4 - 20\ln 1 - 15 = 20\ln 4 - 15 \approx 12.73.$$
(The integral uses $u = Q + 1$, $du = dQ$, $\int \frac{20}{u}\,du = 20\ln|u|$.)`,
      answer: r`$Q^* = 3$, $P^* = 5$, $CS = 20\ln 4 - 15 \approx 12.73$`,
      figures: [
        {
          x: "Q",
          y: "P",
          xr: [0, 6],
          yr: [0, 21],
          curves: [
            { f: "20/(x+1)", label: "demand" },
            { f: "x+2", label: "supply", tone: 1 },
          ],
          shade: [{ f: "20/(x+1)", g: "5", from: 0, to: 3, label: "CS" }],
          points: [{ at: [3, 5], label: "(3, 5)", guides: true }],
        },
      ],
      source: "Assignment 9 Q2(a), (b)",
    },
    {
      id: "integration-x6", kind: "calc", sub: "Producer surplus",
      prompt: r`With inverse demand $P = \frac{20}{Q+1}$ and inverse supply $P = Q + 2$, find the producer surplus.`,
      marks: 5,
      rubric: [
        { point: r`Equilibrium $Q^* = 3$, $P^* = 5$ (with working)`, marks: 2 },
        { point: r`Sets up $PS = P^*Q^* - \int_0^3 (Q + 2)\,dQ$`, marks: 1.5 },
        { point: r`$\int_0^3 (Q+2)\,dQ = 10.5$ and $PS = 4.5$`, marks: 1.5 },
      ],
      model: r`Equilibrium: $20 = (Q+2)(Q+1) \Rightarrow Q^2 + 3Q - 18 = (Q+6)(Q-3) = 0$, so $Q^* = 3$, $P^* = 5$.
Producer surplus = area between the price line $P = 5$ and the supply curve from $0$ to $3$:
$$PS = P^*Q^* - \int_0^3 (Q + 2)\,dQ = 15 - \Big|_0^3\left(\tfrac{1}{2}Q^2 + 2Q\right) = 15 - (4.5 + 6) = 15 - 10.5 = 4.5.$$`,
      answer: r`$PS = 4.5$`,
      source: "Assignment 9 Q2(c)",
    },
    {
      id: "integration-x7", kind: "calc", sub: "Integration by parts",
      prompt: r`Evaluate $\displaystyle\int \frac{1}{x}\ln(x)\,dx$.`,
      marks: 5,
      rubric: [
        { point: r`Chooses $f = \ln x$, $g' = \frac{1}{x}$ (so $f' = \frac{1}{x}$, $g = \ln x$), or substitution $u = \ln x$, $du = \frac{1}{x}dx$`, marks: 2 },
        { point: r`Parts: $\int \frac{1}{x}\ln x\,dx = (\ln x)^2 - \int \frac{1}{x}\ln x\,dx$ and moves the integral across (or substitution: $\int u\,du$)`, marks: 1.5 },
        { point: r`$\frac{1}{2}(\ln x)^2 + C$`, marks: 1.5 },
      ],
      model: r`Integration by parts with $f(x) = \ln x$ and $g'(x) = \frac{1}{x}$, so $f'(x) = \frac{1}{x}$ and $g(x) = \ln x$:
$$\int \ln x\cdot\frac{1}{x}\,dx = \ln x\cdot\ln x - \int \frac{1}{x}\ln x\,dx.$$
The original integral appears on both sides. Moving it to the left:
$$2\int \frac{1}{x}\ln x\,dx = (\ln x)^2 + C \;\Rightarrow\; \int \frac{1}{x}\ln x\,dx = \frac{1}{2}(\ln x)^2 + C.$$
(Equivalently, substitute $u = \ln x$, $du = \frac{1}{x}dx$: $\int u\,du = \frac{1}{2}u^2 + C$.)
Check: $\frac{d}{dx}\frac{1}{2}(\ln x)^2 = \ln x\cdot\frac{1}{x}$. ✓`,
      answer: r`$\frac{1}{2}(\ln x)^2 + C$`,
      source: "Past paper Q1(e) (Lecture Note 8 Example [12])",
    },
    {
      id: "integration-x8", kind: "calc", sub: "Limits of integrals",
      prompt: r`Evaluate $\displaystyle\lim_{x\to\infty}\frac{\int_0^x \ln(y + 1)\,dy}{x^2}$, if it exists.`,
      marks: 5,
      rubric: [
        { point: r`Antiderivative of $\ln(y+1)$: $(y+1)\ln(y+1) - y$ (by parts / substitution)`, marks: 1.5 },
        { point: r`Definite integral $\int_0^x \ln(y+1)\,dy = (x+1)\ln(x+1) - x$`, marks: 1 },
        { point: r`Recognises $\infty/\infty$ and applies L'Hôpital: $\frac{\ln(x+1)}{2x}$`, marks: 1.5 },
        { point: r`Applies it again (or otherwise) to get the limit $0$`, marks: 1 },
      ],
      model: r`**The integral.** Substitute $u = y + 1$ ($du = dy$); by parts with $f = \ln u$, $g' = 1$: $\int \ln u\,du = u\ln u - u$. So an antiderivative of $\ln(y+1)$ is $(y+1)\ln(y+1) - (y+1)$, or equally $(y+1)\ln(y+1) - y$ (constants cancel in a definite integral). Hence
$$\int_0^x \ln(y+1)\,dy = \Big|_0^x\big[(y+1)\ln(y+1) - y\big] = (x+1)\ln(x+1) - x - (1\cdot\ln 1 - 0) = (x+1)\ln(x+1) - x.$$
**The limit.** Numerator and denominator both $\to \infty$ as $x \to \infty$, so by L'Hôpital's rule:
$$\lim_{x\to\infty}\frac{(x+1)\ln(x+1) - x}{x^2} = \lim_{x\to\infty}\frac{\ln(x+1) + (x+1)\cdot\frac{1}{x+1} - 1}{2x} = \lim_{x\to\infty}\frac{\ln(x+1)}{2x}.$$
This is again $\infty/\infty$; applying the rule once more:
$$\lim_{x\to\infty}\frac{\frac{1}{x+1}}{2} = \lim_{x\to\infty}\frac{1}{2(x+1)} = 0.$$
The limit exists and equals $0$.`,
      answer: r`$0$`,
      source: "Past paper Q2(a)",
    },
    {
      id: "integration-x9", kind: "calc", sub: "Consumer surplus",
      prompt: r`Suppose the inverse demand function is $p = \frac{30}{q + 2}$ and the inverse supply function is $p = q + 1$. Calculate the consumer surplus.`,
      marks: 5,
      rubric: [
        { point: r`Equilibrium equation $q^2 + 3q - 28 = 0$`, marks: 1 },
        { point: r`$q^* = 4$, $p^* = 5$`, marks: 1 },
        { point: r`$CS = \int_0^4 \frac{30}{q+2}\,dq - p^*q^*$`, marks: 1 },
        { point: r`$\int_0^4 \frac{30}{q+2}\,dq = 30\ln 6 - 30\ln 2 = 30\ln 3$`, marks: 1 },
        { point: r`$CS = 30\ln 3 - 20 \approx 12.96$`, marks: 1 },
      ],
      model: r`**Equilibrium.** $\frac{30}{q+2} = q + 1 \Rightarrow 30 = (q+1)(q+2) = q^2 + 3q + 2 \Rightarrow q^2 + 3q - 28 = 0 \Rightarrow (q+7)(q-4) = 0$.
So $q^* = 4$ (reject $-7$) and $p^* = 4 + 1 = 5$.
**Consumer surplus.**
$$CS = \int_0^4 \frac{30}{q+2}\,dq - p^*q^* = \Big|_0^4 30\ln(q+2) - 20 = 30\ln 6 - 30\ln 2 - 20 = 30\ln 3 - 20 \approx 12.96.$$`,
      answer: r`$CS = 30\ln 3 - 20 \approx 12.96$`,
      figures: [
        {
          x: "q",
          y: "p",
          xr: [0, 8],
          yr: [0, 16],
          curves: [
            { f: "30/(x+2)", label: "demand" },
            { f: "x+1", label: "supply", tone: 1 },
          ],
          shade: [{ f: "30/(x+2)", g: "5", from: 0, to: 4, label: "CS" }],
          points: [{ at: [4, 5], label: "(4, 5)", guides: true }],
        },
      ],
      source: "Past paper Q3(c)",
    },
    {
      id: "integration-x10", kind: "calc", sub: "Total from marginal",
      prompt: r`The marginal revenue function for a good is $MR(q) = 44 - 5q$. The marginal cost is $MC(q) = 3q + 20$, and the cost of producing $100$ units is $100{,}000$ dollars. Derive the profit function and calculate the profit or loss from selling $200$ units.`,
      marks: 5,
      rubric: [
        { point: r`$R(q) = 44q - 2.5q^2$ using $R(0) = 0$`, marks: 1 },
        { point: r`$C(q) = 1.5q^2 + 20q + c$ and $c = 83{,}000$ from $C(100) = 100{,}000$`, marks: 2 },
        { point: r`$\pi(q) = -4q^2 + 24q - 83{,}000$`, marks: 1 },
        { point: r`$\pi(200) = -238{,}200$, i.e. a loss of $238{,}200$ dollars`, marks: 1 },
      ],
      model: r`**Revenue.** $R(q) = \int (44 - 5q)\,dq = 44q - \frac{5}{2}q^2 + c_1$. Selling nothing earns nothing, $R(0) = 0$, so $c_1 = 0$.
**Cost.** $C(q) = \int (3q + 20)\,dq = \frac{3}{2}q^2 + 20q + c_2$. Using $C(100) = 100{,}000$:
$\frac{3}{2}(10{,}000) + 20(100) + c_2 = 15{,}000 + 2{,}000 + c_2 = 100{,}000 \Rightarrow c_2 = 83{,}000$.
**Profit.**
$$\pi(q) = R(q) - C(q) = 44q - 2.5q^2 - 1.5q^2 - 20q - 83{,}000 = -4q^2 + 24q - 83{,}000.$$
$\pi(200) = -4(40{,}000) + 24(200) - 83{,}000 = -160{,}000 + 4{,}800 - 83{,}000 = -238{,}200.$
Selling $200$ units gives a **loss of 238,200 dollars**.`,
      answer: r`$\pi(q) = -4q^2 + 24q - 83{,}000$; loss of $238{,}200$ dollars`,
      source: "Past paper Q3(e)",
    },
    {
      id: "integration-x11", kind: "calc", sub: "Total from marginal",
      prompt: r`A firm's marginal cost is $C'(x) = 3x^2 - 4x + 10$, and the cost of producing $2$ units is $70$. Find the cost function $C(x)$, the fixed cost, and the cost of producing $10$ units.`,
      marks: 5,
      rubric: [
        { point: r`$C(x) = x^3 - 2x^2 + 10x + c$`, marks: 2 },
        { point: r`$C(2) = 20 + c = 70 \Rightarrow c = 50$ = fixed cost`, marks: 1.5 },
        { point: r`$C(10) = 950$`, marks: 1.5 },
      ],
      model: r`$C(x) = \int (3x^2 - 4x + 10)\,dx = x^3 - 2x^2 + 10x + c$.
Using $C(2) = 70$: $8 - 8 + 20 + c = 70 \Rightarrow c = 50$.
So $C(x) = x^3 - 2x^2 + 10x + 50$; the fixed cost is $C(0) = 50$.
$C(10) = 1000 - 200 + 100 + 50 = 950$.`,
      answer: r`$C(x) = x^3 - 2x^2 + 10x + 50$; fixed cost $50$; $C(10) = 950$`,
      source: "Modelled on Lecture Note 8 Example [6] and past paper Q3(e)",
    },
    {
      id: "integration-x12", kind: "calc", sub: "Surplus",
      prompt: r`Suppose the inverse demand function is $p = \frac{24}{q + 1}$ and the inverse supply function is $p = q + 3$. Find the equilibrium, the consumer surplus and the producer surplus.`,
      marks: 5,
      rubric: [
        { point: r`$q^2 + 4q - 21 = 0 \Rightarrow q^* = 3$, $p^* = 6$`, marks: 1.5 },
        { point: r`$CS = \int_0^3 \frac{24}{q+1}\,dq - 18 = 24\ln 4 - 18 \approx 15.27$`, marks: 2 },
        { point: r`$PS = 18 - \int_0^3 (q+3)\,dq = 18 - 13.5 = 4.5$`, marks: 1.5 },
      ],
      model: r`**Equilibrium.** $24 = (q+3)(q+1) = q^2 + 4q + 3 \Rightarrow q^2 + 4q - 21 = (q+7)(q-3) = 0$, so $q^* = 3$, $p^* = 6$ and $p^*q^* = 18$.
**CS.** $\int_0^3 \frac{24}{q+1}\,dq = \Big|_0^3 24\ln(q+1) = 24\ln 4$, so $CS = 24\ln 4 - 18 \approx 33.27 - 18 = 15.27$.
**PS.** $\int_0^3 (q + 3)\,dq = \Big|_0^3\left(\tfrac{1}{2}q^2 + 3q\right) = 4.5 + 9 = 13.5$, so $PS = 18 - 13.5 = 4.5$.`,
      answer: r`$(q^*, p^*) = (3, 6)$; $CS = 24\ln 4 - 18 \approx 15.27$; $PS = 4.5$`,
      source: "Modelled on Assignment 9 Q2 and past paper Q3(c)",
    },
    {
      id: "integration-x13", kind: "proof", sub: "Infinite intervals",
      prompt: r`Show that for any $\lambda > 0$, the area below the graph of $f(x) = \lambda e^{-\lambda x}$ over $[0, \infty)$ equals $1$.`,
      marks: 5,
      rubric: [
        { point: r`Writes the area as $\lim_{b\to\infty}\int_0^b \lambda e^{-\lambda x}\,dx$`, marks: 1.5 },
        { point: r`Antiderivative $-e^{-\lambda x}$`, marks: 1.5 },
        { point: r`$1 - e^{-\lambda b} \to 1$ because $e^{-\lambda b} \to 0$ for $\lambda > 0$; concludes it converges to $1$`, marks: 2 },
      ],
      model: r`By definition of an integral over an infinite interval,
$$A = \int_0^\infty \lambda e^{-\lambda x}\,dx = \lim_{b\to\infty}\int_0^b \lambda e^{-\lambda x}\,dx.$$
By (v) and (iii) with $a = -\lambda$: $\int \lambda e^{-\lambda x}\,dx = \lambda\cdot\frac{1}{-\lambda}e^{-\lambda x} = -e^{-\lambda x}$. So
$$\int_0^b \lambda e^{-\lambda x}\,dx = \Big|_0^b\left(-e^{-\lambda x}\right) = -e^{-\lambda b} - (-e^0) = 1 - e^{-\lambda b}.$$
Since $\lambda > 0$, $e^{-\lambda b} \to 0$ as $b \to \infty$, so $A = \lim_{b\to\infty}(1 - e^{-\lambda b}) = 1$. The improper integral converges and the area is $1$.`,
      answer: r`$A = 1$`,
      figures: [
        {
          xr: [0, 6],
          yr: [0, 1.2],
          curves: [{ f: "exp(-x)", label: "λ = 1" }],
          shade: [{ f: "exp(-x)", from: 0, to: 6 }],
        },
      ],
      source: "Lecture Note 8 Example [15]",
    },
    {
      id: "integration-x14", kind: "proof", sub: "Infinite intervals",
      prompt: r`True or false? Justify each answer. (a) $\int_1^\infty \frac{1}{x^2}\,dx$ converges to $1$. (b) Since $\frac{1}{x} \to 0$ as $x \to \infty$, $\int_1^\infty \frac{1}{x}\,dx$ converges.`,
      marks: 5,
      rubric: [
        { point: r`(a) $\int_1^b x^{-2}\,dx = 1 - \frac{1}{b}$`, marks: 1.5 },
        { point: r`(a) Limit $1$ as $b \to \infty$: TRUE`, marks: 1 },
        { point: r`(b) $\int_1^b \frac{1}{x}\,dx = \ln b$`, marks: 1.5 },
        { point: r`(b) $\ln b \to \infty$, the limit does not exist: FALSE (diverges)`, marks: 1 },
      ],
      model: r`**(a) True.** $\int_1^b x^{-2}\,dx = \Big|_1^b\left(-x^{-1}\right) = -\frac{1}{b} + 1$. As $b \to \infty$, $\frac{1}{b} \to 0$, so $\int_1^\infty \frac{1}{x^2}\,dx = \lim_{b\to\infty}\left(1 - \frac{1}{b}\right) = 1$: it converges to $1$.
**(b) False.** $\int_1^b \frac{1}{x}\,dx = \Big|_1^b \ln|x| = \ln b - \ln 1 = \ln b$. As $b \to \infty$, $\ln b \to \infty$, so the limit does not exist and the improper integral **diverges**. An integrand tending to $0$ is not enough for convergence.`,
      answer: r`(a) True, value $1$; (b) False, it diverges`,
      source: "Modelled on Lecture Note 8 §8.6",
    },
    {
      id: "integration-x15", kind: "select", sub: "Integration rules",
      prompt: r`Which **TWO** of the following statements are wrong? Write down the corresponding Roman numerals only.`,
      statements: [
        r`$\int x^a\,dx = \frac{1}{a+1}x^{a+1} + C$ for every real number $a$.`,
        r`$\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx$ for a continuous function $f$.`,
        r`$\int xe^x\,dx = \left(\frac{1}{2}x^2\right)e^x + C$.`,
        r`If $F'(x) = f(x)$, then every function $F(x) + C$ has the same derivative $f(x)$.`,
        r`$\int a^x\,dx = \frac{1}{\ln a}a^x + C$ for $a > 0$, $a \neq 1$.`,
        r`For $\lambda > 0$, $\int_0^\infty \lambda e^{-\lambda x}\,dx$ converges to $1$.`,
      ],
      wrong: [0, 2],
      marks: 5,
      rubric: [
        { point: "Identifies (i) as wrong", marks: 2.5 },
        { point: "Identifies (iii) as wrong", marks: 2.5 },
      ],
      model: r`**(i) is wrong:** the power rule needs $a \neq -1$; for $a = -1$ it divides by zero, and instead $\int \frac{1}{x}\,dx = \ln|x| + C$.
**(iii) is wrong:** the integral of a product is not the product of the integrals. By parts ($f = x$, $g' = e^x$): $\int xe^x\,dx = xe^x - e^x + C$. (Differentiating $\frac{1}{2}x^2e^x$ gives $xe^x + \frac{1}{2}x^2e^x \neq xe^x$.)
(ii) is property (1); (iv) is the definition of the indefinite integral; (v) is rule (iv); (vi) is Example [15].`,
      answer: "(i) and (iii)",
      source: "Modelled on past paper Q4(c), (d) format; content from Lecture Note 8",
    },
    {
      id: "integration-x16", kind: "explain", sub: "Definite integrals",
      prompt: r`Explain why the constant of integration $C$ can be ignored when evaluating a definite integral $\int_a^b f(x)\,dx$, but not when finding a cost function from marginal cost. Illustrate with $MC = 2x^2 + 2x + 5$ and fixed cost $100$.`,
      marks: 5,
      rubric: [
        { point: r`States $\int_a^b f(x)\,dx = F(b) - F(a)$ with $F' = f$`, marks: 1 },
        { point: r`Shows $[F(b) + C] - [F(a) + C] = F(b) - F(a)$: $C$ cancels`, marks: 1.5 },
        { point: r`Indefinite integral is a family; $C(x) = \frac{2}{3}x^3 + x^2 + 5x + c$ needs the constant pinned down`, marks: 1 },
        { point: r`$C(0) = c$ = fixed cost $= 100$, so $C(x) = \frac{2}{3}x^3 + x^2 + 5x + 100$`, marks: 1.5 },
      ],
      model: r`A definite integral is defined as $\int_a^b f(x)\,dx = F(b) - F(a)$ where $F$ is any antiderivative of $f$. If we use $F(x) + C$ instead, then $[F(b) + C] - [F(a) + C] = F(b) - F(a)$: the same constant is added at both limits and cancels, so the result is a single number whichever $C$ we choose.
An indefinite integral, however, is a whole family $F(x) + C$ of functions with the same derivative. A cost function is one particular member of this family, so $C$ must be determined from extra information. With $MC = 2x^2 + 2x + 5$:
$C(x) = \int (2x^2 + 2x + 5)\,dx = \frac{2}{3}x^3 + x^2 + 5x + c$.
At $x = 0$ all other terms vanish, so $C(0) = c$: the cost of producing nothing, i.e. the **fixed cost**. Given fixed cost $100$, $c = 100$ and $C(x) = \frac{2}{3}x^3 + x^2 + 5x + 100$.`,
      answer: r`$C$ cancels in $F(b) - F(a)$; in $C(x)$ it is the fixed cost, $C(x) = \frac{2}{3}x^3 + x^2 + 5x + 100$`,
      source: "Lecture Note 8 §8.2 and Example [6]",
    },
  ],
};

export default data;
