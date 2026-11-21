import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "derivatives-use",
  sections: [
    // ------------------------------------------------------------------ 6.1
    {
      title: "6.1 Implicit Differentiation",
      intro: r`In many economic models the variables are not linked explicitly as $y = f(x)$; they are defined **implicitly** by an equation in $x$ and $y$. Implicit differentiation finds $y' = \frac{dy}{dx}$ without solving for $y$.`,
      points: [
        {
          term: "Implicit function",
          text: r`$y$ is treated as a function $y(x)$ defined by an equation such as $xy = 5$ or $y^3 + 3x^2y = 13$. Sometimes we can solve for $y$ (here $y = 5/x$), but often (as in $y^3 + 3x^2y = 13$) it is difficult or impossible.`,
        },
        {
          term: "Key idea",
          text: r`The equation holds for **all** values of $x$, so the derivatives of both sides with respect to $x$ must also be equal.`,
          eg: r`$x\,y(x) = 5 \Rightarrow 1\cdot y(x) + x\,y'(x) = 0$`,
        },
        {
          term: "Step 1",
          text: r`Differentiate each side of the equation with respect to $x$, treating $y$ as a function of $x$ (this usually needs the **chain rule**: every time you differentiate a term containing $y$, multiply by $y'$).`,
          eg: r`$\frac{d}{dx}(y^3) = 3y^2y'$, $\ \frac{d}{dx}(x^2y) = 2xy + x^2y'$, $\ \frac{d}{dx}(e^{2y}) = 2e^{2y}y'$`,
        },
        { term: "Step 2", text: r`Collect all the $y'$ terms on one side and solve the resulting equation for $y'$.` },
        {
          term: "Slope at a point",
          text: r`The formula for $y'$ usually contains both $x$ and $y$. To get the slope at a point $(x_0, y_0)$ on the curve, substitute **both** coordinates (check first that the point satisfies the equation).`,
        },
        {
          term: "Tangent line",
          text: r`Once you have the slope $m = y'(x_0)$ at $(x_0, y_0)$, the tangent line is $y - y_0 = m(x - x_0)$.`,
        },
        {
          term: "Second derivative",
          text: r`Found by repeating the procedure: differentiate the equation that contains $y'$ once more (product and chain rules, remembering $y'$ is itself a function of $x$), solve for $y''$, then substitute the expression for $y'$.`,
        },
        {
          term: "Unknown function inside",
          text: r`If the equation contains a general differentiable function $g$ of an expression $u(x, y)$, use the chain rule: $\frac{d}{dx}g(u) = g'(u)\,\frac{du}{dx}$.`,
          eg: r`$\frac{d}{dx}g(xy + x) = g'(xy + x)\,(y + xy' + 1)$`,
        },
        {
          term: "Variables in exponents",
          text: r`For an equation like $x^y = y^x$, take natural logs of both sides first ($y\ln x = x\ln y$), then differentiate implicitly.`,
        },
        {
          term: "Macro model",
          text: r`With $Y = C + I$ and $C = C(Y)$, differentiating with respect to $I$ gives $\frac{dY}{dI} = C'(Y)\frac{dY}{dI} + 1$, so $\frac{dY}{dI} = \frac{1}{1 - C'(Y)}$, where $C'(Y)$ is the marginal propensity to consume (MPC). The larger the MPC, the larger $\frac{dY}{dI}$.`,
          eg: r`MPC $= 0.5 \Rightarrow \frac{dY}{dI} = 2$; MPC $= 0.8 \Rightarrow 5$; MPC $= 0.9 \Rightarrow 10$.`,
        },
      ],
      formulas: [
        { name: "Chain rule on a power of y", tex: r`\frac{d}{dx}\left[y^n\right] = n\,y^{n-1}\,y'` },
        { name: "Product of x and y", tex: r`\frac{d}{dx}\left[xy\right] = y + x\,y'` },
        { name: "Tangent line at (x₀, y₀)", tex: r`y - y_0 = y'(x_0)\,(x - x_0)` },
        { name: "National income model", tex: r`Y = C(Y) + I \;\Rightarrow\; \frac{dY}{dI} = \frac{1}{1 - C'(Y)}`, note: r`$C'(Y)$ = MPC.` },
      ],
      figures: [
        {
          title: "y³ + 3x²y = 13 and its tangent at (2, 1)",
          xr: [-4, 4],
          yr: [0, 2.8],
          curves: [{ f: "cbrt(6.5+sqrt(42.25+x^6))+cbrt(6.5-sqrt(42.25+x^6))", label: "y³ + 3x²y = 13" }],
          segments: [{ from: [0.5, 2.2], to: [3.5, -0.2], tone: 1, label: "slope −4/5" }],
          points: [{ at: [2, 1], label: "(2, 1)", guides: true }],
          caption: "We cannot easily write y = f(x), yet implicit differentiation gives the slope −4/5 at (2, 1).",
        },
        {
          title: "Past paper curve y²e²ˣ = 3y + x² near (0, 3)",
          xr: [-0.4, 1],
          yr: [0, 7],
          curves: [{ f: "(3+sqrt(9+4*x^2*exp(2*x)))/(2*exp(2*x))", label: "y²e²ˣ = 3y + x²" }],
          segments: [{ from: [-0.4, 5.4], to: [0.5, 0], tone: 1, label: "y = 3 − 6x" }],
          points: [{ at: [0, 3], label: "(0, 3)" }],
          caption: "At (0, 3) the slope is −6, so the tangent line is y = 3 − 6x.",
        },
      ],
      worked: [
        {
          problem: r`$xy = 5$. Find $y'(x)$ by implicit differentiation.`,
          solution: r`Treat $y$ as $y(x)$: $x\,y(x) = 5$ holds for all $x$.
Differentiate both sides: $1\cdot y(x) + x\,y'(x) = 0$.
So $y'(x) = -\frac{y(x)}{x}$. Substituting $y = \frac{5}{x}$ gives $y'(x) = -\frac{5}{x^2}$ (the same as differentiating $y = 5/x$ directly).`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`$y^3 + 3x^2y = 13$. Find the slope of the graph at $(x, y) = (2, 1)$.`,
          solution: r`Check: $1 + 3(4)(1) = 13$ ✓.
Differentiate: $3y^2y' + 6xy + 3x^2y' = 0$ (chain rule on $y^3$, product rule on $3x^2y$).
Solve: $y' = \frac{-6xy}{3y^2 + 3x^2}$.
At $(2,1)$: $y' = -\frac{6\times2\times1}{3\times1 + 3\times2^2} = -\frac{12}{15} = -\frac{4}{5}$.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`$xy = 5$. Find $y''$.`,
          solution: r`First derivative: $y + xy' = 0$.
Differentiate again: $y' + \frac{dx}{dx}\,y' + x\,y'' = 0$, i.e. $y' + y' + xy'' = 0$.
So $y'' = -\frac{2y'}{x}$ with $y' = -\frac{5}{x^2}$, giving $y'' = \frac{10}{x^3}$.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`National income: $Y = C + I$, consumption $C = 200 + bY$ with MPC $b$. (i) Find $Y$ as a function of $I$. (ii) Find $\frac{dY}{dI}$.`,
          solution: r`(i) $Y = 200 + bY + I \Rightarrow Y = \frac{200}{1-b} + \frac{I}{1-b}$. The slide's working uses $b = 0.5$: $Y = 400 + 2I$. (With $b = 0.8$: $Y = 1000 + 5I$.)
(ii) $\frac{dY}{dI} = \frac{1}{1-b}$: $= 2$ when MPC $= 0.5$, $= 5$ when MPC $= 0.8$, $= 10$ when MPC $= 0.9$. The larger the MPC, the larger $\frac{dY}{dI}$.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`Find $\frac{dy}{dx}$ when $x^y = y^x$.`,
          solution: r`Take logs: $y\ln x = x\ln y$.
Differentiate: $y'\ln x + \frac{y}{x} = \ln y + \frac{x}{y}y'$.
Collect: $y'\left(\ln x - \frac{x}{y}\right) = \ln y - \frac{y}{x}$, so
$$y' = \frac{\ln y - \frac{y}{x}}{\ln x - \frac{x}{y}} = \frac{y(x\ln y - y)}{x(y\ln x - x)}.$$`,
          source: "Assignment 7 Q5(c)",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.2
    {
      title: "6.2 Differentiating the Inverse",
      intro: r`If $f$ is one-to-one it has an inverse $f^{-1}$ (written $g$ in Lecture Note 4.3). Implicit differentiation links their derivatives.`,
      points: [
        { term: "Notation", text: r`$f^{-1}(x) = g(x)$, the inverse function of a one-to-one $f$ (Lecture Note 4, Section 4.3).` },
        {
          term: "Reciprocal rule",
          text: r`If both $f$ and $f^{-1}$ are differentiable, then $f' = \frac{1}{(f^{-1})'}$, i.e. $\frac{dy}{dx} = \frac{1}{dx/dy}$, or equivalently $(f^{-1})' = \frac{1}{f'}$.`,
        },
        {
          term: "Meaning of f′",
          text: r`$f' = \frac{dy}{dx}$ is the slope: a one-unit change in the input $x$ changes the output $y$ by $f'$ units. E.g. $\frac{dy}{dx} = 2$ means $y$ rises by 2 when $x$ rises by 1.`,
        },
        {
          term: "Meaning of (f⁻¹)′",
          text: r`For the inverse the input is $y$ and the output is $x$, so its slope is $(f^{-1})' = \frac{dx}{dy}$: the slope of the inverse function is the **reciprocal** of the slope of the original function (at corresponding points).`,
        },
        {
          term: "Two routes",
          text: r`Either take the reciprocal of $\frac{dy}{dx}$ (and rewrite it in terms of $y$ if needed), or find the inverse $x = f^{-1}(y)$ explicitly and differentiate it with respect to $y$. Both give the same answer.`,
        },
      ],
      formulas: [
        { name: "Derivative of the inverse", tex: r`(f^{-1})' = \frac{1}{f'} \quad\Leftrightarrow\quad \frac{dx}{dy} = \frac{1}{dy/dx}` },
      ],
      figures: [
        {
          title: "Reciprocal slopes: f(x) = x² (x ≥ 0) and f⁻¹(x) = √x",
          xr: [0, 2.2],
          yr: [0, 2.2],
          curves: [
            { f: "x^2", label: "f(x) = x²", to: 1.48 },
            { f: "sqrt(x)", label: "f⁻¹(x) = √x", tone: 2 },
            { f: "x", dashed: true, tone: 3, label: "y = x" },
          ],
          segments: [
            { from: [0.6, 0.2], to: [1.6, 2.2], tone: 1, label: "slope 2" },
            { from: [0.2, 0.6], to: [2.2, 1.6], tone: 1, label: "slope 1/2" },
          ],
          points: [{ at: [1, 1], label: "(1, 1)" }],
          caption: "Reflecting in y = x swaps the roles of x and y, so the slope 2 of f becomes the slope 1/2 of its inverse.",
        },
      ],
      worked: [
        {
          problem: r`$y = 2x$. (a) What is the slope of the function? (b) What is the slope of the inverse function?`,
          solution: r`(a) $f' = \frac{dy}{dx} = 2$.
(b) $(f^{-1})' = \frac{1}{f'} = \frac{1}{2}$.
Alternatively, the inverse is $x = \frac{1}{2}y$, so $\frac{dx}{dy} = \frac{1}{2}$.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`$y = e^{5x}$. Find the slope of the inverse function.`,
          solution: r`$\frac{dy}{dx} = 5e^{5x}$, so the slope of the inverse is $\frac{1}{5e^{5x}} = \frac{1}{5y}$.
Directly: the inverse is $x = \frac{1}{5}\ln y$, so $\frac{dx}{dy} = 0.2\cdot\frac{1}{y} = \frac{1}{5y}$ ✓.`,
          source: "Lecture Note 6 example",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.3
    {
      title: "6.3 Linear Approximations",
      intro: r`Near a point $a$, a differentiable function is close to its tangent line. Using the tangent line in place of the function is a **linear approximation**.`,
      points: [
        {
          term: "Linear approximation",
          text: r`Around the point $a$: $f(x) \approx f(a) + f'(a)(x - a)$, valid when $x$ is close to $a$. The right-hand side is the tangent line to $y = f(x)$ at $x = a$.`,
        },
        {
          term: "Recipe",
          text: r`Compute $f(a)$ and $f'(a)$, plug into the formula, then evaluate the approximation at the $x$ you need.`,
        },
        {
          term: "Accuracy",
          text: r`The approximation is good only when $x$ is close to $a$: $\sqrt[3]{1.03} \approx 1.01$ (true value $1.0099$), but $\sqrt[3]{8} \approx 3.33$ (true value $2$) because $x = 8$ is far from $a = 1$.`,
        },
        {
          term: "ln(1 + x) ≈ x",
          text: r`A very popular linear approximation around $x = 0$: $\ln(1 + x) \approx \ln(1 + 0) + \frac{1}{1+0}\cdot x = x$.`,
          eg: r`$\ln(1.01) \approx 0.01$`,
        },
      ],
      formulas: [
        { name: "Linear approximation about x = a", tex: r`f(x) \approx f(a) + f'(a)(x - a)`, note: "Valid for x close to a." },
        { name: "Popular special case", tex: r`\ln(1 + x) \approx x \quad (x \text{ close to } 0)` },
      ],
      figures: [
        {
          title: "∛x and its tangent line at a = 1",
          xr: [0, 9],
          yr: [0, 3.6],
          curves: [
            { f: "cbrt(x)", label: "y = ∛x" },
            { f: "1+(x-1)/3", label: "1 + (x−1)/3", tone: 1, dashed: true },
          ],
          points: [
            { at: [1, 1], label: "a = 1", guides: true },
            { at: [8, 2], label: "true ∛8 = 2" },
            { at: [8, 3.333], label: "approx 3.33", tone: 1 },
          ],
          caption: "Near a = 1 the tangent line hugs the curve; at x = 8 (far from a) the error is large.",
        },
        {
          title: "ln(1 + x) ≈ x near 0",
          xr: [-0.8, 1.5],
          yr: [-1.6, 1.4],
          curves: [
            { f: "ln(1+x)", label: "ln(1 + x)" },
            { f: "x", label: "y = x", tone: 1, dashed: true },
          ],
          points: [{ at: [0, 0], label: "a = 0" }],
          caption: "The line y = x is the tangent to ln(1 + x) at x = 0, so ln(1.01) ≈ 0.01.",
        },
      ],
      worked: [
        {
          problem: r`Find the linear approximation of $\sqrt[3]{x}$ around $a = 1$.`,
          solution: r`$f(x) = x^{1/3}$, $f'(x) = \frac{1}{3}x^{-2/3}$, so $f(1) = 1$ and $f'(1) = \frac{1}{3}$.
$f(x) \approx f(1) + f'(1)(x - 1) \Rightarrow \sqrt[3]{x} \approx 1 + \frac{1}{3}(x - 1)$.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`Use $\sqrt[3]{x} \approx 1 + \frac{1}{3}(x - 1)$ to estimate (a) $\sqrt[3]{1.03}$ and (b) $\sqrt[3]{8}$.`,
          solution: r`(a) $x = 1.03$ is very close to $a = 1$: $\sqrt[3]{1.03} \approx 1 + \frac{1}{3}(0.03) = 1.01$. The correct value to four decimals is $1.0099$, so the estimate is good.
(b) $\sqrt[3]{8} \approx 1 + \frac{1}{3}(7) = 3.33$, but the correct value is $2$. The error is big because $x = 8$ is far from $a = 1$.`,
          source: "Lecture Note 6 example",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.4
    {
      title: "6.4 Polynomial Approximations",
      intro: r`When the linear approximation is not precise enough, add higher-order terms. The result is a Taylor polynomial.`,
      points: [
        {
          term: "Quadratic approximation",
          text: r`Around $x = a$: $f(x) \approx f(a) + f'(a)(x - a) + \frac{1}{2!}f''(a)(x - a)^2$, for $x$ close to $a$.`,
        },
        {
          term: "Example",
          text: r`$\sqrt[3]{x} \approx 1 + \frac{1}{3}(x - 1) + \frac{1}{2!}\left(-\frac{2}{9}\right)(x - 1)^2 = 1 + \frac{1}{3}(x-1) - \frac{1}{9}(x-1)^2$ around $a = 1$. It gives $\sqrt[3]{1.03} \approx 1.0099$, more precise than the linear value $1.01$.`,
        },
        {
          term: "nth-order Taylor polynomial",
          text: r`If the higher-order derivatives exist we can continue: $f(x) \approx f(a) + f'(a)(x-a) + \frac{1}{2!}f''(a)(x-a)^2 + \frac{1}{3!}f'''(a)(x-a)^3 + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n$. This is the $n$th-order Taylor polynomial (approximation) for $f$ about $x = a$.`,
        },
        {
          term: "Remainder",
          text: r`The difference between $f(x)$ and the Taylor polynomial is called the remainder $R$: $f(x) = f(a) + f'(a)(x-a) + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n + R$.`,
        },
        { term: "In economics", text: r`Linear and quadratic approximations are the most popular approximations in economic models.` },
        {
          term: "Role of curvature",
          text: r`The first-order (linear) approximation is the tangent line, so it ignores how the graph bends. The second derivative $f''(a)$ measures that curvature, and the quadratic term $\frac{1}{2}f''(a)(x-a)^2$ corrects for it. If $f''(a) < 0$ the graph bends below its tangent, so the linear approximation **overestimates** (e.g. $\sqrt[3]{1.03}$: $1.01 > 1.0099$); if $f''(a) > 0$ it **underestimates** (e.g. $2e^{0.01}$: $2.02 < 2.0201$). The terms left out of the quadratic approximation involve $(x-a)^3$ and higher powers, which are tiny when $x$ is close to $a$.`,
        },
      ],
      formulas: [
        { name: "Quadratic (second-order) approximation", tex: r`f(x) \approx f(a) + f'(a)(x - a) + \frac{1}{2!}f''(a)(x - a)^2` },
        {
          name: "nth-order Taylor polynomial about a",
          tex: r`f(x) \approx f(a) + f'(a)(x-a) + \frac{1}{2!}f''(a)(x-a)^2 + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n`,
        },
        { name: "Taylor formula with remainder", tex: r`f(x) = f(a) + f'(a)(x-a) + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n + R` },
      ],
      table: [
        ["Order", "Approximation about $a$", "Uses"],
        ["1st (linear)", "$f(a) + f'(a)(x-a)$", "value and slope (tangent line)"],
        ["2nd (quadratic)", "$f(a) + f'(a)(x-a) + \\frac{1}{2}f''(a)(x-a)^2$", "value, slope and curvature"],
        ["$n$th", "$\\sum_{k=0}^{n} \\frac{1}{k!}f^{(k)}(a)(x-a)^k$", "derivatives up to order $n$"],
      ],
      figures: [
        {
          title: "∛x: linear vs quadratic approximation about a = 1",
          xr: [0, 3],
          yr: [0, 1.8],
          curves: [
            { f: "cbrt(x)", label: "∛x" },
            { f: "1+(x-1)/3", label: "linear", tone: 1, dashed: true },
            { f: "1+(x-1)/3-(x-1)^2/9", label: "quadratic", tone: 2 },
          ],
          points: [{ at: [1, 1], label: "a = 1" }],
          caption: "∛x bends downwards (f″(1) = −2/9 < 0), so the tangent line overestimates; the quadratic bends with the curve and stays close for longer.",
        },
        {
          title: "2eˣ: first- and second-order approximations about 0",
          xr: [-1.5, 1.5],
          yr: [0, 9],
          curves: [
            { f: "2*exp(x)", label: "2eˣ" },
            { f: "2+2*x", label: "2 + 2x", tone: 1, dashed: true },
            { f: "2+2*x+x^2", label: "2 + 2x + x²", tone: 2 },
          ],
          points: [{ at: [0, 2], label: "a = 0" }],
          caption: "2eˣ bends upwards (f″(0) = 2 > 0), so the tangent line lies below the curve and underestimates.",
        },
        {
          title: "ln(1 + x): x and x − x²/2",
          xr: [-0.8, 1.5],
          yr: [-1.6, 1.4],
          curves: [
            { f: "ln(1+x)", label: "ln(1 + x)" },
            { f: "x", label: "x", tone: 1, dashed: true },
            { f: "x-x^2/2", label: "x − x²/2", tone: 2 },
          ],
          caption: "With f″(0) = −1 the quadratic approximation of ln(1 + x) about 0 is x − x²/2.",
        },
      ],
      worked: [
        {
          problem: r`Find the quadratic approximation of $\sqrt[3]{x}$ around $a = 1$ and use it to estimate $\sqrt[3]{1.03}$.`,
          solution: r`$f'(x) = \frac{1}{3}x^{-2/3}$, $f''(x) = -\frac{2}{9}x^{-5/3}$, so $f(1) = 1$, $f'(1) = \frac{1}{3}$, $f''(1) = -\frac{2}{9}$.
$$\sqrt[3]{x} \approx 1 + \frac{1}{3}(x - 1) + \frac{1}{2!}\left(-\frac{2}{9}\right)(x - 1)^2 = 1 + \frac{1}{3}(x-1) - \frac{1}{9}(x-1)^2.$$
At $x = 1.03$: $1 + 0.01 - \frac{0.0009}{9} = 1.01 - 0.0001 = 1.0099$, more precise than the linear approximation $1.01$.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`$f(x) = 2e^x$. (a) Find the first-order Taylor expansion. (b) Find the second-order Taylor expansion. (c) Estimate $f(0.01)$ with each (true value $2.02010033417$).`,
          solution: r`Expand about $a = 0$ (the point near $0.01$): $f(0) = f'(0) = f''(0) = 2e^0 = 2$.
(a) $f(x) \approx 2 + 2x$.
(b) $f(x) \approx 2 + 2x + \frac{1}{2!}(2)x^2 = 2 + 2x + x^2$.
(c) Linear: $2 + 0.02 = 2.02$ (error $\approx 0.0001$). Quadratic: $2 + 0.02 + 0.0001 = 2.0201$ (error $\approx 0.0000003$). The quadratic is far more accurate.`,
          source: "Assignment 7 Q8",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.5
    {
      title: "6.5 Elasticities",
      intro: r`The derivative measures the effect of a **1-unit** change in $x$ on $y$. Economists usually prefer **percentage** changes, which leads to elasticity.`,
      points: [
        {
          term: "Problem with D′(P)",
          text: r`If $D(P)$ is the demand function, $D'(P)$ measures the change in demand when the price rises by one Singapore dollar. This (1) ignores **size effects**: raising the price of coffee by one dollar is not the same as raising the price of cars; and (2) ignores **measurement scale** effects: measuring quantity in kg or pounds, or prices in SGD or USD, would significantly change the number.`,
        },
        {
          term: "Elasticity",
          text: r`Measures the percentage change in the dependent variable per percentage change in the independent variable. For demand: $\varepsilon_D = \frac{\Delta D/D}{\Delta P/P} = \frac{\Delta D}{\Delta P}\times\frac{P}{D}$. Letting $\Delta P \to 0$: $\varepsilon_D = \frac{dD}{dP}\times\frac{P}{D}$.`,
        },
        {
          term: "General definition",
          text: r`For a differentiable $f$ at a point $x$ with $f(x) \neq 0$: $\varepsilon_x = \frac{df(x)}{dx}\times\frac{x}{f(x)} = f'(x)\,\frac{x}{f(x)}$. Conceptually it is the same as $\frac{\Delta f/f}{\Delta x/x}$ as $\Delta x \to 0$. Income elasticities, supply elasticities and substitution elasticities all use this definition.`,
        },
        {
          term: "Power functions",
          text: r`$f(x) = Ax^b$ has elasticity $\varepsilon_x = Abx^{b-1}\cdot\frac{x}{Ax^b} = b$, the same at every $x$.`,
        },
        {
          term: "Elastic / inelastic",
          text: r`If $|\varepsilon_x| > 1$, $f$ is **elastic** at $x$; if $|\varepsilon_x| = 1$, **unit elastic**; if $|\varepsilon_x| < 1$, **inelastic**; if $|\varepsilon_x| = 0$, **completely inelastic**.`,
        },
        {
          term: "Per-unit tax on producers",
          text: r`A tax of $t$ per unit on producers means producers keep only $P - t$ of the price $P$, so the supply curve $Q^S = S(P)$ shifts to $Q^S = S(P - t)$ (Lecture Note 4.1). Find the new equilibrium, then the elasticity there.`,
          eg: r`$Q^S = 10 + P$, 2-dollar tax: $Q^S = 10 + (P - 2) = 8 + P$.`,
        },
        {
          term: "Percentage tax on producers",
          text: r`A sales tax of $5\%$ on producers means producers keep $0.95P$ of each price $P$, so $Q^S = 12 + P$ becomes $Q^S = 12 + 0.95P$ (Past paper Q3(d)).`,
        },
        {
          term: "Who bears the tax?",
          text: r`In the tobacco tax of Assignment 4, consumers and producers shared the burden equally, but this is not always the case. If demand is **perfectly inelastic** (vertical demand curve) the price rises by the full tax, so **consumers** bear all of it. If demand is **perfectly elastic** (horizontal demand curve) the price consumers pay cannot rise, so **producers** bear all of it.`,
        },
        {
          term: "Linear demand",
          text: r`For $Q^D = a - bP$: $\varepsilon_D = -b\cdot\frac{P}{Q}$, which changes along the curve.`,
        },
      ],
      formulas: [
        { name: "Price elasticity of demand", tex: r`\varepsilon_D = \frac{\Delta D/D}{\Delta P/P} \to \frac{dD}{dP}\times\frac{P}{D}` },
        { name: "Elasticity of f with respect to x", tex: r`\varepsilon_x = f'(x)\,\frac{x}{f(x)}, \quad f(x)\neq 0` },
        { name: "Constant-elasticity function", tex: r`f(x) = Ax^b \;\Rightarrow\; \varepsilon_x = b` },
      ],
      table: [
        ["$|\\varepsilon_x|$", "Terminology", "1% rise in $x$ changes $f$ by"],
        ["$> 1$", "elastic", "more than 1%"],
        ["$= 1$", "unit elastic", "exactly 1%"],
        ["$< 1$", "inelastic", "less than 1%"],
        ["$= 0$", "completely inelastic", "0%"],
      ],
      figures: [
        {
          title: "A 2-dollar tax on producers shifts supply (Assignment 8 Q2)",
          x: "Q",
          y: "P",
          xr: [8, 22],
          yr: [0, 14],
          curves: [
            { f: "22-x", label: "Demand", from: 8, to: 22 },
            { f: "x-10", label: "Supply", tone: 2, from: 10, to: 22 },
            { f: "x-8", label: "Supply + tax", tone: 1, from: 8, to: 22 },
          ],
          points: [
            { at: [16, 6], label: "before (16, 6)", guides: true },
            { at: [15, 7], label: "after (15, 7)", guides: true, tone: 1 },
          ],
          caption: "Qˢ = 10 + P becomes Qˢ = 8 + P: price rises from 6 to 7, quantity falls from 16 to 15; elasticity of demand at the new equilibrium is −7/15.",
        },
      ],
      worked: [
        {
          problem: r`$f(x) = Ax^b$. Find the elasticity.`,
          solution: r`$\varepsilon_x = f'(x)\cdot\frac{x}{f(x)} = Abx^{b-1}\cdot\frac{x}{Ax^b} = b$. The elasticity is constant.`,
          source: "Lecture Note 6 example",
        },
        {
          problem: r`Supply $Q^S = 10 + P$, demand $Q^D = 22 - P$. The government imposes a 2-dollar tobacco tax per pack on producers. Find the price elasticity of demand at the equilibrium price and quantity, and explain.`,
          solution: r`New supply: producers receive $P - 2$, so $Q^S = 10 + (P - 2) = 8 + P$.
Equilibrium: $8 + P = 22 - P \Rightarrow P = 7$, $Q = 15$ (before the tax: $P = 6$, $Q = 16$).
$\frac{dQ^D}{dP} = -1$, so $\varepsilon_D = -1\times\frac{7}{15} = -\frac{7}{15} \approx -0.47$.
Since $|\varepsilon_D| < 1$, demand is inelastic at the equilibrium: a 1% rise in price lowers the quantity demanded by only about 0.47%. Consumers now pay 7 (up 1) and producers keep 5 (down 1), so the 2-dollar burden is shared equally.`,
          source: "Assignment 8 Q2",
        },
        {
          problem: r`Demand $D = 100 - 10P$. Find the price elasticity at $P = 4$ and classify it.`,
          solution: r`$D(4) = 60$, $D'(P) = -10$. $\varepsilon_D = -10\times\frac{4}{60} = -\frac{2}{3}$. $|\varepsilon_D| < 1$: inelastic.`,
          source: "Modelled on Lecture Note 6 (demand from Lecture Note 4)",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.6
    {
      title: "6.6 Continuity",
      points: [
        { term: "Intuition", text: r`A function is continuous if small changes in the independent variable induce small changes in the function value.` },
        {
          term: "Geometrically",
          text: r`A function is continuous on an interval if its graph is connected, i.e. it has no breaks: if you can draw the curve without lifting your pencil, it is continuous.`,
        },
        {
          term: "Definition",
          text: r`$f$ is continuous at $x = a$ if $f(a) = \lim_{x\to a} f(x)$. This needs three things: (i) $f$ must be defined at $x = a$; (ii) the limit of $f(x)$ as $x \to a$ must exist; (iii) this limit must be exactly equal to $f(a)$.`,
        },
        {
          term: "Violations",
          text: r`(i) fails: a "hole", e.g. $\frac{x^2-1}{x-1}$ is undefined at $x = 1$. (ii) fails: a jump, the graph approaches different values from the left and right. (iii) fails: the limit exists but $f(a)$ is some other value.`,
        },
        {
          term: "Building continuous functions",
          text: r`Any function constructed from continuous functions by addition, subtraction, multiplication, division (except by zero) and composition is continuous at all points where it is defined.`,
        },
        {
          term: "Properties",
          text: r`If $f$ and $g$ are continuous at $a$: (a) $f + g$ and $f - g$ are continuous at $a$; (b) $f\cdot g$ and $f/g$ (if $g(a)\neq0$) are continuous at $a$; (c) $[f(x)]^r$ is continuous at $a$ if $[f(a)]^r$ is defined ($r$ any real number); (d) if $f$ is continuous and has an inverse on an interval $I$, its inverse $f^{-1}$ is continuous on $f(I)$.`,
        },
      ],
      formulas: [{ name: "Continuity at x = a", tex: r`\lim_{x\to a} f(x) = f(a)` }],
      figures: [
        {
          title: "A jump: the limit at x = 1 does not exist",
          xr: [-1, 3],
          yr: [0, 6.5],
          curves: [
            { f: "0.5*x+0.5", from: -1, to: 1 },
            { f: "(x-1)^2+2", from: 1, to: 3, label: "y = f(x)" },
          ],
          points: [
            { at: [1, 1], open: true },
            { at: [1, 2], label: "f(1) = 2" },
          ],
          caption: "From the left f(x) → 1, from the right f(x) → 2: you must lift the pencil, so f is not continuous at 1 (condition ii fails).",
        },
        {
          title: "A hole: (x² − 1)/(x − 1) is undefined at x = 1",
          xr: [-1, 3],
          yr: [0, 4],
          curves: [{ f: "(x^2-1)/(x-1)", label: "y = (x² − 1)/(x − 1)" }],
          points: [{ at: [1, 2], open: true, label: "lim = 2, but f(1) undefined" }],
          caption: "The limit exists (= 2) but f is not defined at 1, so condition (i) fails.",
        },
      ],
      worked: [
        {
          problem: r`Is $f(x) = \frac{x^2 - 1}{x - 1}$ continuous at $x = 1$?`,
          solution: r`(i) $f(1) = \frac{0}{0}$ is undefined, so $f$ is **not** continuous at $1$, even though $\lim_{x\to1}\frac{(x-1)(x+1)}{x-1} = \lim_{x\to1}(x + 1) = 2$ exists.`,
          source: "Modelled on Lecture Note 6",
        },
        {
          problem: r`$f(x) = 2x + a$ for $x \le 1$ and $f(x) = x^2 + 3$ for $x > 1$. Find $a$ so that $f$ is continuous at $x = 1$.`,
          solution: r`$f(1) = 2 + a$ and the left-hand values approach $2 + a$; the right-hand values approach $1 + 3 = 4$. The limit exists and equals $f(1)$ only if $2 + a = 4$, so $a = 2$.`,
          source: "Modelled on Lecture Note 6",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.7
    {
      title: "6.7 More on Limits (Continuity versus Differentiability)",
      points: [
        {
          term: "Continuity does not imply differentiability",
          text: r`A function can be continuous at $a$ yet have a sharp corner there. At $(a, f(a))$ there is then no unique tangent, so $f$ has no derivative at $x = a$, but $f$ is continuous at $x = a$.`,
          eg: r`$f(x) = |x|$ is continuous at $0$ but not differentiable there (slope $-1$ from the left, $+1$ from the right).`,
        },
        {
          term: "Differentiability implies continuity",
          text: r`If $f$ is differentiable at $x = a$ then $f'(a) = \lim_{x\to a}\frac{f(x) - f(a)}{x - a}$ exists, and this forces $\lim_{x\to a} f(x) = f(a)$, i.e. $f$ is continuous at $a$.`,
        },
        {
          term: "Proof",
          text: r`For $x \neq a$: $f(x) - f(a) = \frac{f(x) - f(a)}{x - a}\cdot(x - a)$. Taking limits, $\lim_{x\to a}[f(x) - f(a)] = f'(a)\cdot 0 = 0$, so $\lim_{x\to a} f(x) = f(a)$.`,
        },
      ],
      formulas: [
        { name: "Derivative at a", tex: r`f'(a) = \lim_{x\to a}\frac{f(x) - f(a)}{x - a}` },
        { name: "Logical link", tex: r`\text{differentiable at } a \;\Rightarrow\; \text{continuous at } a \quad(\text{not conversely})` },
      ],
      figures: [
        {
          title: "Continuous but not differentiable at a = 2",
          xr: [0, 4],
          yr: [0, 3],
          curves: [{ f: "2-abs(x-2)", label: "f(x) = 2 − |x − 2|" }],
          segments: [
            { from: [1.2, 1.2], to: [2.8, 2.8], dashed: true, tone: 1, label: "slope 1" },
            { from: [1.2, 2.8], to: [2.8, 1.2], dashed: true, tone: 1, label: "slope −1" },
          ],
          points: [{ at: [2, 2], label: "(a, f(a))", guides: true }],
          caption: "No break, so f is continuous at 2, but the corner has no unique tangent, so f′(2) does not exist.",
        },
      ],
      worked: [
        {
          problem: r`Prove that if $f$ is differentiable at $x = a$ then $f$ is continuous at $x = a$.`,
          solution: r`Differentiable means $f'(a) = \lim_{x\to a}\frac{f(x)-f(a)}{x-a}$ exists.
For $x \neq a$, $f(x) - f(a) = \frac{f(x)-f(a)}{x-a}\,(x - a)$.
So $\lim_{x\to a}[f(x) - f(a)] = f'(a)\cdot\lim_{x\to a}(x - a) = f'(a)\cdot 0 = 0$.
Hence $\lim_{x\to a} f(x) = f(a)$: $f$ is continuous at $a$. ∎`,
          source: "Lecture Note 6 (\"Can you prove it?\")",
        },
      ],
    },
    // ------------------------------------------------------------------ 6.8
    {
      title: "6.8 L'Hôpital's Rule",
      intro: r`We often need $\lim_{x\to a}\frac{f(x)}{g(x)}$ where both numerator and denominator tend to $0$ (or both to $\infty$). Substitution gives the meaningless $\frac{0}{0}$ or $\frac{\infty}{\infty}$.`,
      points: [
        {
          term: "L'Hôpital's rule",
          text: r`If $\lim_{x\to a} f(x) = 0$ and $\lim_{x\to a} g(x) = 0$ (or both are $\infty$), then $\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}$, where $\lim f'(x)$ and $\lim g'(x)$ exist. Published by Guillaume de L'Hôpital, proved by Johann Bernoulli. It also works for $x \to \infty$.`,
        },
        {
          term: "Check the form first",
          text: r`Only use the rule for $\frac{0}{0}$ or $\frac{\infty}{\infty}$. If substitution gives a finite answer, that is the limit.`,
          eg: r`$\lim_{x\to2}\frac{x-2}{x^2-1} = \frac{0}{3} = 0$ (L'Hôpital would wrongly give $\frac14$).`,
        },
        {
          term: "Differentiate separately",
          text: r`Differentiate the numerator and the denominator **separately** (not the quotient rule). If the result is still $\frac{0}{0}$ or $\frac{\infty}{\infty}$, apply the rule again.`,
        },
        {
          term: "Powers vs exponentials",
          text: r`Repeated use gives $\lim_{x\to\infty}\frac{x^n}{e^x} = \lim\frac{n(n-1)\cdots1}{e^x} = 0$: $e^x$ grows faster than any power of $x$.`,
        },
        {
          term: "Differences",
          text: r`For a form like $\infty - \infty$, e.g. $\sqrt{x^2 - x} - x$, first rewrite it as a single fraction (multiply by the conjugate) before taking the limit.`,
        },
        {
          term: "Variable powers",
          text: r`For a limit of $f(x)^{g(x)}$, take the natural log: $\ln\left(f^g\right) = g\ln f$. Find the limit $L$ of $g\ln f$ (often with L'Hôpital), and the original limit is $e^L$.`,
        },
      ],
      formulas: [
        {
          name: "L'Hôpital's rule",
          tex: r`\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}`,
          note: r`Only for the forms $\frac{0}{0}$ or $\frac{\infty}{\infty}$.`,
        },
        { name: "Exponential beats powers", tex: r`\lim_{x\to\infty}\frac{x^n}{e^x} = 0` },
      ],
      figures: [
        {
          title: "(2x − 4)/(x³ − 8) near x = 2",
          xr: [0, 4],
          yr: [0, 0.6],
          curves: [{ f: "(2*x-4)/(x^3-8)", label: "(2x − 4)/(x³ − 8)" }],
          points: [{ at: [2, 0.1667], open: true, label: "limit 1/6", guides: true }],
          caption: "At x = 2 the quotient is 0/0, but the graph approaches 1/6, the value L'Hôpital's rule gives.",
        },
      ],
      worked: [
        {
          problem: r`Evaluate (a) $\lim_{x\to2}\frac{2x-4}{x^3-8}$ (b) $\lim_{x\to\infty}\frac{2x^2-x}{1-5x^2}$ (c) $\lim_{x\to\infty}\frac{x^n}{e^x}$.`,
          solution: r`(a) $\frac{0}{0}$: $= \lim_{x\to2}\frac{2}{3x^2} = \frac{2}{12} = \frac{1}{6}$.
(b) $\frac{\infty}{\infty}$: $= \lim_{x\to\infty}\frac{4x - 1}{-10x} = \lim_{x\to\infty}\frac{4}{-10} = -\frac{2}{5}$.
(c) $\frac{\infty}{\infty}$: $= \lim\frac{nx^{n-1}}{e^x} = \lim\frac{n(n-1)x^{n-2}}{e^x} = \dots = \lim\frac{n(n-1)\cdots1}{e^x} = 0$.`,
          source: "Lecture Note 6 exercise (a)–(c)",
        },
        {
          problem: r`Evaluate $\lim_{x\to\infty}\left(\sqrt{x^2 - x} - x\right)$.`,
          solution: r`This is $\infty - \infty$. Multiply by the conjugate:
$$\sqrt{x^2-x} - x = \frac{(x^2 - x) - x^2}{\sqrt{x^2-x} + x} = \frac{-x}{\sqrt{x^2-x} + x} = \frac{-1}{\sqrt{1 - \frac1x} + 1}$$ (divide top and bottom by $x > 0$).
As $x\to\infty$, $\frac1x \to 0$, so the limit is $\frac{-1}{1 + 1} = -\frac{1}{2}$.`,
          source: "Lecture Note 6 exercise (d); Assignment 8 Q1(c)",
        },
        {
          problem: r`Find (a) $\lim_{x\to1}\frac{x-1}{x^2-1}$ (b) $\lim_{x\to2}\frac{x-2}{x^2-1}$.`,
          solution: r`(a) $\frac{0}{0}$, so L'Hôpital: $\lim_{x\to1}\frac{1}{2x} = \frac{1}{2}$. (Or factor: $\frac{x-1}{(x-1)(x+1)} = \frac{1}{x+1} \to \frac12$.)
(b) Substitution gives $\frac{0}{3}$, not an indeterminate form, so the limit is simply $0$.`,
          source: "Assignment 8 Q1(a), (b)",
        },
        {
          problem: r`Evaluate $\lim_{x\to\infty}\left(\frac{1}{x}\right)^{\frac{1}{\ln x}}$, if it exists.`,
          solution: r`Take logs: $\ln\left[\left(\frac1x\right)^{1/\ln x}\right] = \frac{1}{\ln x}\cdot\ln\frac{1}{x} = \frac{-\ln x}{\ln x} = -1$ for every $x > 1$.
So the expression equals $e^{-1}$ for all $x > 1$, and the limit is $e^{-1} = \frac{1}{e} \approx 0.368$.`,
          source: "Past paper Q1(a)",
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    {
      id: "derivatives-use-c1",
      type: "concept",
      front: r`$y$ is linked to $x$ by an equation such as $y^3 + 3x^2y = 13$ instead of being written as $y = f(x)$.`,
      back: "implicit function",
      why: r`The equation defines $y$ as a function of $x$ implicitly; we can still find $y'$ by implicit differentiation.`,
    },
    {
      id: "derivatives-use-c2",
      type: "concept",
      front: r`Differentiate both sides of an equation in $x$ and $y$ with respect to $x$, treating $y$ as a function of $x$, then solve for $y'$.`,
      back: "implicit differentiation",
      why: r`Works because the equation holds for all $x$, so both sides have equal derivatives.`,
    },
    {
      id: "derivatives-use-c3",
      type: "concept",
      front: r`$C'(Y)$ in the model $Y = C(Y) + I$: the extra consumption from one more unit of income.`,
      back: "marginal propensity to consume",
      why: r`MPC; it gives $\frac{dY}{dI} = \frac{1}{1 - \text{MPC}}$.`,
    },
    {
      id: "derivatives-use-c4",
      type: "concept",
      front: r`The function $f^{-1}$ that reverses $f$; its slope is the reciprocal $\frac{1}{f'}$.`,
      back: "inverse function",
      why: r`Exists when $f$ is one-to-one (Lecture Note 4.3); $(f^{-1})' = \frac{dx}{dy} = \frac{1}{dy/dx}$.`,
    },
    {
      id: "derivatives-use-c5",
      type: "concept",
      front: r`$f(a) + f'(a)(x - a)$, used in place of $f(x)$ for $x$ close to $a$.`,
      back: "linear approximation",
      why: r`It is the tangent line at $x = a$; also called the first-order Taylor approximation.`,
    },
    {
      id: "derivatives-use-c6",
      type: "concept",
      front: r`$f(a) + f'(a)(x-a) + \frac{1}{2!}f''(a)(x-a)^2 + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n$`,
      back: "Taylor polynomial",
      why: r`The $n$th-order Taylor polynomial (approximation) for $f$ about $x = a$.`,
    },
    {
      id: "derivatives-use-c7",
      type: "concept",
      front: r`The difference $R$ between $f(x)$ and its $n$th-order Taylor polynomial.`,
      back: "remainder",
      why: r`$f(x) = f(a) + f'(a)(x-a) + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n + R$.`,
    },
    {
      id: "derivatives-use-c8",
      type: "concept",
      front: r`The percentage change in the dependent variable per 1% change in the independent variable, $f'(x)\frac{x}{f(x)}$.`,
      back: "elasticity",
      why: r`Unlike $f'(x)$, it is free of size and measurement-scale effects.`,
    },
    {
      id: "derivatives-use-c9",
      type: "concept",
      front: r`$|\varepsilon_x| > 1$`,
      back: "elastic",
      why: r`A 1% change in $x$ changes $f$ by more than 1%.`,
    },
    {
      id: "derivatives-use-c10",
      type: "concept",
      front: r`$|\varepsilon_x| = 1$`,
      back: "unit elastic",
      why: r`A 1% change in $x$ changes $f$ by exactly 1%.`,
    },
    {
      id: "derivatives-use-c11",
      type: "concept",
      front: r`$|\varepsilon_x| < 1$`,
      back: "inelastic",
      why: r`A 1% change in $x$ changes $f$ by less than 1%. E.g. $-\frac{7}{15}$ in Assignment 8 Q2.`,
    },
    {
      id: "derivatives-use-c12",
      type: "concept",
      front: r`$|\varepsilon_x| = 0$`,
      back: "completely inelastic",
      why: r`$f$ does not respond at all to changes in $x$ (vertical demand curve: perfectly inelastic demand).`,
    },
    {
      id: "derivatives-use-c13",
      type: "concept",
      front: r`A function with $\lim_{x\to a} f(x) = f(a)$; its graph can be drawn without lifting the pencil.`,
      back: "continuous",
      why: r`Needs: $f(a)$ defined, the limit exists, and the limit equals $f(a)$.`,
    },
    {
      id: "derivatives-use-c14",
      type: "concept",
      front: r`The rule $\lim\frac{f(x)}{g(x)} = \lim\frac{f'(x)}{g'(x)}$ for limits of the form $\frac{0}{0}$ or $\frac{\infty}{\infty}$.`,
      back: "L'Hopital's rule",
      why: r`Published by L'Hôpital, proved by Johann Bernoulli. Differentiate numerator and denominator separately.`,
    },
    // method
    {
      id: "derivatives-use-c15",
      type: "method",
      front: r`Find the slope of $y^3 + 3x^2y = 13$ at $(2, 1)$.`,
      back: r`Differentiate implicitly, solve for $y'$, substitute: $y' = -\frac{4}{5}$.`,
      why: r`$3y^2y' + 6xy + 3x^2y' = 0 \Rightarrow y' = \frac{-6xy}{3y^2 + 3x^2}$. At $(2,1)$: $-\frac{12}{15} = -\frac45$.`,
    },
    {
      id: "derivatives-use-c16",
      type: "method",
      front: r`Find $\frac{dy}{dx}$ of $y^2e^{2x} = 3y + x^2$ at $(0, 3)$.`,
      back: r`Product + chain rule on the left, then substitute $(0,3)$: $y' = -6$.`,
      why: r`$2yy'e^{2x} + 2y^2e^{2x} = 3y' + 2x$. At $(0,3)$: $6y' + 18 = 3y' \Rightarrow y' = -6$.`,
    },
    {
      id: "derivatives-use-c17",
      type: "method",
      front: r`Find the tangent line to an implicit curve at a point $(x_0, y_0)$.`,
      back: r`Get the slope $m$ by implicit differentiation at $(x_0,y_0)$, then $y - y_0 = m(x - x_0)$.`,
      why: r`Past paper Q2(d): slope $-6$ at $(0,3)$ gives $y - 3 = -6(x - 0)$, i.e. $y = 3 - 6x$. Always check the point lies on the curve.`,
    },
    {
      id: "derivatives-use-c18",
      type: "method",
      front: r`Find $y''$ for an implicit equation, e.g. $xy = 5$.`,
      back: r`Differentiate the $y'$-equation again, solve for $y''$, substitute $y'$: $y'' = \frac{10}{x^3}$.`,
      why: r`$y + xy' = 0 \Rightarrow y' + y' + xy'' = 0 \Rightarrow y'' = -\frac{2y'}{x}$, and $y' = -\frac{5}{x^2}$ gives $y'' = \frac{10}{x^3}$.`,
    },
    {
      id: "derivatives-use-c19",
      type: "method",
      front: r`$g(xy + x) = x^3e^{2y} + \ln(x^4)$ with $g$ a given differentiable function. Find $y'$.`,
      back: r`Chain rule: $g'(xy+x)(y + xy' + 1)$ on the left; collect $y'$ terms; $y' = \frac{3x^2e^{2y} + \frac4x - (1+y)g'(xy+x)}{xg'(xy+x) - 2x^3e^{2y}}$.`,
      why: r`LHS: $g'(xy+x)\,(y + xy' + 1)$. RHS: $3x^2e^{2y} + 2x^3e^{2y}y' + \frac{4}{x}$ (as $\ln x^4 = 4\ln x$). Move $y'$ terms together: $y'\left[xg'(xy+x) - 2x^3e^{2y}\right] = 3x^2e^{2y} + \frac4x - (y+1)g'(xy+x)$.`,
    },
    {
      id: "derivatives-use-c20",
      type: "method",
      front: r`Find $y'$ when $x^y = y^x$.`,
      back: r`Take logs first: $y\ln x = x\ln y$, then differentiate implicitly.`,
      why: r`$y'\ln x + \frac{y}{x} = \ln y + \frac{x}{y}y' \Rightarrow y' = \frac{\ln y - y/x}{\ln x - x/y}$.`,
    },
    {
      id: "derivatives-use-c21",
      type: "method",
      front: r`$Y = C + I$, $C = C(Y)$. Find $\frac{dY}{dI}$; then evaluate for $C = 1600 + 0.8Y$.`,
      back: r`Differentiate w.r.t. $I$: $\frac{dY}{dI} = \frac{1}{1 - C'(Y)}$; here $\frac{1}{1-0.8} = 5$.`,
      why: r`$\frac{dY}{dI} = C'(Y)\frac{dY}{dI} + 1 \Rightarrow \frac{dY}{dI}(1 - C'(Y)) = 1$. With MPC $0.8$: $5$. A 1-dollar rise in investment raises equilibrium income by 5 dollars.`,
    },
    {
      id: "derivatives-use-c22",
      type: "method",
      front: r`Find the slope of the inverse function of $y = e^{5x}$.`,
      back: r`Reciprocal of $\frac{dy}{dx}$: $\frac{dx}{dy} = \frac{1}{5e^{5x}} = \frac{1}{5y}$.`,
      why: r`Check directly: $x = \frac15\ln y \Rightarrow \frac{dx}{dy} = \frac{1}{5y}$.`,
    },
    {
      id: "derivatives-use-c23",
      type: "method",
      front: r`Estimate $\sqrt[3]{1.03}$ with a linear approximation.`,
      back: r`Linearise $\sqrt[3]{x}$ about $a = 1$: $1 + \frac13(x - 1)$, giving $1.01$.`,
      why: r`$f(1) = 1$, $f'(x) = \frac13x^{-2/3}$ so $f'(1) = \frac13$. $1 + \frac{0.03}{3} = 1.01$ (true $1.0099$). Choose $a$ close to $x$ where $f(a)$ is easy.`,
    },
    {
      id: "derivatives-use-c24",
      type: "method",
      front: r`$f(x) = 2e^x$: first- and second-order Taylor approximations, and $f(0.01)$ from each.`,
      back: r`$2 + 2x$ and $2 + 2x + x^2$; estimates $2.02$ and $2.0201$.`,
      why: r`About $0$: $f(0) = f'(0) = f''(0) = 2$. Second order adds $\frac{1}{2!}\cdot2x^2 = x^2$. True value $2.0201003$: the quadratic is much closer.`,
    },
    {
      id: "derivatives-use-c25",
      type: "method",
      front: r`Explain why the second-order approximation can be more accurate than the first for $x$ near $a$.`,
      back: r`The linear one is the tangent and ignores curvature; the term $\frac12f''(a)(x-a)^2$ accounts for it.`,
      why: r`If $f''(a) < 0$ the tangent overestimates, if $f''(a) > 0$ it underestimates; the quadratic term corrects that. What is left involves $(x-a)^3$ and higher powers, tiny near $a$. If $f''(a) = 0$ the two coincide (hence "can").`,
    },
    {
      id: "derivatives-use-c26",
      type: "method",
      front: r`Find the elasticity of $f(x) = Ax^b$.`,
      back: r`$\varepsilon_x = f'(x)\frac{x}{f(x)} = b$ (constant).`,
      why: r`$Abx^{b-1}\cdot\frac{x}{Ax^b} = b$.`,
    },
    {
      id: "derivatives-use-c27",
      type: "method",
      front: r`$Q^S = 10 + P$, $Q^D = 22 - P$, 2-dollar tax per pack on producers. Elasticity of demand at equilibrium?`,
      back: r`Shift supply to $Q^S = 8 + P$; equilibrium $P = 7$, $Q = 15$; $\varepsilon_D = -\frac{7}{15} \approx -0.47$ (inelastic).`,
      why: r`Producers keep $P - 2$, so $Q^S = 10 + (P - 2)$. $8 + P = 22 - P \Rightarrow P = 7$. $\varepsilon_D = \frac{dQ^D}{dP}\cdot\frac{P}{Q} = -1\cdot\frac{7}{15}$.`,
    },
    {
      id: "derivatives-use-c28",
      type: "method",
      front: r`$Q^S = 12 + P$, $Q^D = 32 - P$, 5% sales tax on producers: equilibrium and elasticity.`,
      back: r`$Q^S = 12 + 0.95P$; $P \approx 10.26$, $Q \approx 21.74$, $\varepsilon_D \approx -0.47$.`,
      why: r`Producers keep $0.95P$. $12 + 0.95P = 32 - P \Rightarrow P = \frac{20}{1.95} \approx 10.26$, $Q \approx 21.74$, $\varepsilon_D = -\frac{10.26}{21.74} \approx -0.47$: inelastic.`,
    },
    {
      id: "derivatives-use-c29",
      type: "method",
      front: r`Check whether $f$ is continuous at $x = a$.`,
      back: r`Check (i) $f(a)$ is defined, (ii) $\lim_{x\to a}f(x)$ exists, (iii) the limit equals $f(a)$.`,
      why: r`For a piecewise function compare the left-hand and right-hand values with $f(a)$. Sums, products, quotients (non-zero denominator) and compositions of continuous functions are continuous where defined.`,
    },
    {
      id: "derivatives-use-c30",
      type: "method",
      front: r`Evaluate $\lim_{x\to a}\frac{f(x)}{g(x)}$.`,
      back: r`Substitute first. Only if you get $\frac00$ or $\frac{\infty}{\infty}$, use L'Hôpital: $\lim\frac{f'}{g'}$ (repeat if needed).`,
      why: r`Assignment 8 Q1(a): $\frac{x-1}{x^2-1}$ at $1$ is $\frac00$, so $\lim\frac{1}{2x} = \frac12$. Q1(b): $\frac{x-2}{x^2-1}$ at $2$ is $\frac03 = 0$, no L'Hôpital.`,
    },
    {
      id: "derivatives-use-c31",
      type: "method",
      front: r`Evaluate $\lim_{x\to\infty}\left(\sqrt{x^2-x} - x\right)$.`,
      back: r`Multiply by the conjugate: $\frac{-x}{\sqrt{x^2-x}+x} \to -\frac{1}{2}$.`,
      why: r`$(\sqrt{x^2-x}-x)\cdot\frac{\sqrt{x^2-x}+x}{\sqrt{x^2-x}+x} = \frac{-x}{\sqrt{x^2-x}+x} = \frac{-1}{\sqrt{1-1/x}+1} \to \frac{-1}{2}$.`,
    },
    {
      id: "derivatives-use-c32",
      type: "method",
      front: r`Evaluate $\lim_{x\to\infty}\left(\frac1x\right)^{1/\ln x}$.`,
      back: r`Take $\ln$: $\frac{1}{\ln x}\ln\frac1x = -1$, so the limit is $e^{-1}$.`,
      why: r`$\ln\frac1x = -\ln x$, so the log of the expression is exactly $-1$ for $x > 1$; exponentiate: $e^{-1} \approx 0.368$.`,
    },
    {
      id: "derivatives-use-c33",
      type: "method",
      front: r`Prove that differentiability at $a$ implies continuity at $a$.`,
      back: r`Write $f(x) - f(a) = \frac{f(x)-f(a)}{x-a}(x-a) \to f'(a)\cdot0 = 0$.`,
      why: r`So $\lim_{x\to a}f(x) = f(a)$. The converse is false: $|x|$ is continuous at $0$ but has no unique tangent there.`,
    },
    // formula
    {
      id: "derivatives-use-c34",
      type: "formula",
      front: r`Derivative of $y^n$ when $y = y(x)$`,
      back: r`$\frac{d}{dx}y^n = ny^{n-1}y'$`,
      why: r`Chain rule; used on every $y$-term in implicit differentiation.`,
    },
    {
      id: "derivatives-use-c35",
      type: "formula",
      front: "Derivative of the inverse function",
      back: r`$(f^{-1})' = \frac{1}{f'}$, i.e. $\frac{dx}{dy} = \frac{1}{dy/dx}$`,
      why: r`The slope of the inverse is the reciprocal of the original slope (at corresponding points).`,
    },
    {
      id: "derivatives-use-c36",
      type: "formula",
      front: "Tangent line at a point",
      back: r`$y - y_0 = y'(x_0)(x - x_0)$`,
      why: r`Point-slope form; for implicit curves find $y'$ at $(x_0, y_0)$ first.`,
    },
    {
      id: "derivatives-use-c37",
      type: "formula",
      front: r`Linear approximation about $x = a$`,
      back: r`$f(x) \approx f(a) + f'(a)(x - a)$`,
      why: r`Good only for $x$ close to $a$. Special case: $\ln(1+x) \approx x$ near $0$.`,
    },
    {
      id: "derivatives-use-c38",
      type: "formula",
      front: r`Quadratic approximation about $x = a$`,
      back: r`$f(x) \approx f(a) + f'(a)(x-a) + \frac{1}{2!}f''(a)(x-a)^2$`,
      why: r`Do not forget the $\frac{1}{2!}$; it captures the curvature $f''(a)$.`,
    },
    {
      id: "derivatives-use-c39",
      type: "formula",
      front: r`$n$th-order Taylor polynomial about $x = a$`,
      back: r`$\sum_{k=0}^{n}\frac{1}{k!}f^{(k)}(a)(x-a)^k$`,
      why: r`$= f(a) + f'(a)(x-a) + \frac{1}{2!}f''(a)(x-a)^2 + \dots + \frac{1}{n!}f^{(n)}(a)(x-a)^n$; $f(x)$ equals this plus the remainder $R$.`,
    },
    {
      id: "derivatives-use-c40",
      type: "formula",
      front: "Elasticity of f with respect to x",
      back: r`$\varepsilon_x = f'(x)\frac{x}{f(x)}$`,
      why: r`For demand: $\varepsilon_D = \frac{dD}{dP}\cdot\frac{P}{D}$, the limit of $\frac{\Delta D/D}{\Delta P/P}$.`,
    },
    {
      id: "derivatives-use-c41",
      type: "formula",
      front: r`Continuity at $x = a$`,
      back: r`$\lim_{x\to a}f(x) = f(a)$`,
      why: r`Three conditions: $f(a)$ defined, limit exists, limit equals $f(a)$.`,
    },
    {
      id: "derivatives-use-c42",
      type: "formula",
      front: "L'Hôpital's rule",
      back: r`$\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}$`,
      why: r`Only when the original limit is of the form $\frac00$ or $\frac{\infty}{\infty}$.`,
    },
  ],

  // ==================================================================== quiz
  quiz: [
    // --- implicit differentiation
    {
      id: "derivatives-use-q1",
      kind: "mcq",
      sub: "Implicit differentiation",
      prompt: r`If $xy = 5$, implicit differentiation gives $y' =$`,
      options: [r`$-\frac{y}{x}$`, r`$\frac{y}{x}$`, r`$-\frac{x}{y}$`, r`$\frac{x}{y}$`],
      answer: 0,
      explain: r`Product rule: $1\cdot y + xy' = 0 \Rightarrow y' = -\frac{y}{x}$ $(= -\frac{5}{x^2})$.`,
    },
    {
      id: "derivatives-use-q2",
      kind: "mcq",
      sub: "Implicit differentiation",
      prompt: r`With $y = y(x)$, $\frac{d}{dx}\left(y^2\right) =$`,
      options: [r`$2y\,y'$`, r`$2y$`, r`$2x\,y$`, r`$y^2\,y'$`],
      answer: 0,
      explain: r`Chain rule: differentiate $y^2$ with respect to $y$ ($2y$), then multiply by $\frac{dy}{dx} = y'$.`,
    },
    {
      id: "derivatives-use-q3",
      kind: "fill",
      sub: "Implicit differentiation",
      prompt: r`For $y^3 + 3x^2y = 13$, the slope $y'$ at $(2, 1)$ is ____ .`,
      answers: [["-0.8", "-4/5"]],
      explain: r`$3y^2y' + 6xy + 3x^2y' = 0 \Rightarrow y' = \frac{-6xy}{3y^2 + 3x^2} = \frac{-12}{3 + 12} = -\frac45$.`,
    },
    {
      id: "derivatives-use-q4",
      kind: "mcq",
      sub: "Implicit differentiation",
      prompt: r`For $2xy - 3y^2 - 12 = 0$, $\frac{dy}{dx} =$`,
      options: [r`$\frac{y}{3y - x}$`, r`$\frac{y}{x - 3y}$`, r`$\frac{x}{3y - x}$`, r`$\frac{2y}{2x - 6y}$`],
      answer: 0,
      explain: r`$2y + 2xy' - 6yy' = 0 \Rightarrow y'(6y - 2x) = 2y \Rightarrow y' = \frac{y}{3y - x}$. (Assignment 7 Q5(a).) Option D has the sign wrong.`,
    },
    {
      id: "derivatives-use-q5",
      kind: "fill",
      sub: "Implicit differentiation",
      prompt: r`For $y^2e^{2x} = 3y + x^2$, $\frac{dy}{dx}$ at $(0, 3)$ equals ____ .`,
      answers: [["-6"]],
      explain: r`$2yy'e^{2x} + 2y^2e^{2x} = 3y' + 2x$. At $(0,3)$: $6y' + 18 = 3y' \Rightarrow 3y' = -18 \Rightarrow y' = -6$. (Past paper Q2(c).)`,
    },
    {
      id: "derivatives-use-q6",
      kind: "mcq",
      sub: "Tangent lines",
      prompt: r`The tangent line to $y^2e^{2x} = 3y + x^2$ at $(0, 3)$ is`,
      options: [r`$y = 3 - 6x$`, r`$y = 3 + 6x$`, r`$y = -6x$`, r`$y = 6 - 3x$`],
      answer: 0,
      explain: r`Slope $-6$ at $(0,3)$: $y - 3 = -6(x - 0) \Rightarrow y = 3 - 6x$. (Past paper Q2(d).)`,
    },
    {
      id: "derivatives-use-q7",
      kind: "mcq",
      sub: "Second derivative",
      prompt: r`If $xy = 5$, then $y'' =$`,
      options: [r`$\frac{10}{x^3}$`, r`$-\frac{10}{x^3}$`, r`$\frac{5}{x^3}$`, r`$-\frac{5}{x^2}$`],
      answer: 0,
      explain: r`$y + xy' = 0 \Rightarrow 2y' + xy'' = 0 \Rightarrow y'' = -\frac{2y'}{x} = -\frac{2}{x}\left(-\frac{5}{x^2}\right) = \frac{10}{x^3}$. Option D is $y'$, not $y''$.`,
    },
    {
      id: "derivatives-use-q8",
      kind: "mcq",
      sub: "Implicit differentiation",
      prompt: r`The most efficient first step to find $y'$ when $x^y = y^x$ is to`,
      options: [
        r`take natural logs: $y\ln x = x\ln y$`,
        r`use the power rule: $yx^{y-1} = xy^{x-1}$`,
        r`solve explicitly for $y$`,
        r`differentiate as if $y$ were a constant`,
      ],
      answer: 0,
      explain: r`The variable appears in the exponent, so the power rule does not apply. Taking logs turns the powers into products: $y\ln x = x\ln y$, then differentiate implicitly. (Assignment 7 Q5(c).)`,
    },
    {
      id: "derivatives-use-q9",
      kind: "fill",
      sub: "Macro model",
      prompt: r`$Y = C + I$ with $C = 1600 + 0.8Y$. Then $\frac{dY}{dI} =$ ____ .`,
      answers: [["5"]],
      explain: r`$\frac{dY}{dI} = \frac{1}{1 - C'(Y)} = \frac{1}{1 - 0.8} = 5$. (Assignment 7 Q7(b).)`,
    },
    {
      id: "derivatives-use-q10",
      kind: "fill",
      sub: "Macro model",
      prompt: r`In $Y = C + I$, if the MPC is $0.9$ then $\frac{dY}{dI} =$ ____ .`,
      answers: [["10"]],
      explain: r`$\frac{1}{1 - 0.9} = 10$. The larger the MPC, the larger $\frac{dY}{dI}$ (MPC $0.5 \to 2$, $0.8 \to 5$, $0.9 \to 10$).`,
    },
    // --- inverse
    {
      id: "derivatives-use-q11",
      kind: "fill",
      sub: "Derivative of the inverse",
      prompt: r`For $y = 2x$, the slope of the inverse function is ____ .`,
      answers: [["0.5", "1/2"]],
      explain: r`$(f^{-1})' = \frac{1}{f'} = \frac12$. Directly: $x = \frac12y$, so $\frac{dx}{dy} = \frac12$.`,
    },
    {
      id: "derivatives-use-q12",
      kind: "mcq",
      sub: "Derivative of the inverse",
      prompt: r`For $y = e^{5x}$, the slope of the inverse function, $\frac{dx}{dy}$, is`,
      options: [r`$\frac{1}{5y}$`, r`$5y$`, r`$5e^{5x}$`, r`$\frac{5}{y}$`],
      answer: 0,
      explain: r`$\frac{dy}{dx} = 5e^{5x} = 5y$, so $\frac{dx}{dy} = \frac{1}{5y}$. Check: $x = \frac15\ln y$ gives $\frac{1}{5y}$.`,
    },
    {
      id: "derivatives-use-q13",
      kind: "mcq",
      sub: "Derivative of the inverse",
      prompt: r`$f(x) = x^3 + x$ is one-to-one and $f(1) = 2$. The slope of $f^{-1}$ at $y = 2$ is`,
      options: [r`$\frac14$`, r`$4$`, r`$\frac{1}{13}$`, r`$13$`],
      answer: 0,
      explain: r`$f'(x) = 3x^2 + 1$, so $f'(1) = 4$. The inverse's slope at the corresponding point $y = 2$ is $\frac{1}{f'(1)} = \frac14$. (Using $x = 2$ instead, $f'(2) = 13$, is the common mistake.)`,
    },
    // --- linear approximation
    {
      id: "derivatives-use-q14",
      kind: "mcq",
      sub: "Linear approximation",
      prompt: r`The linear approximation of $\sqrt[3]{x}$ around $a = 1$ is`,
      options: [r`$1 + \frac13(x - 1)$`, r`$1 + 3(x - 1)$`, r`$\frac13 + (x - 1)$`, r`$1 - \frac23(x - 1)$`],
      answer: 0,
      explain: r`$f(1) = 1$, $f'(x) = \frac13x^{-2/3}$ so $f'(1) = \frac13$: $f(x) \approx 1 + \frac13(x-1)$.`,
    },
    {
      id: "derivatives-use-q15",
      kind: "fill",
      sub: "Linear approximation",
      prompt: r`Using $\sqrt[3]{x} \approx 1 + \frac13(x - 1)$, the estimate of $\sqrt[3]{8}$ is ____ (2 d.p.).`,
      answers: [["3.33", "10/3"]],
      explain: r`$1 + \frac{7}{3} = 3.33$, but the true value is $2$: the error is big because $x = 8$ is far from $a = 1$.`,
    },
    {
      id: "derivatives-use-q16",
      kind: "mcq",
      sub: "Linear approximation",
      prompt: r`Using $\ln(1 + x) \approx x$ near $x = 0$, $\ln(1.02) \approx$`,
      options: [r`$0.02$`, r`$1.02$`, r`$0.2$`, r`$0.002$`],
      answer: 0,
      explain: r`$\ln(1 + 0.02) \approx 0.02$ (true value $0.0198$).`,
    },
    {
      id: "derivatives-use-q17",
      kind: "mcq",
      sub: "Linear approximation",
      prompt: r`The linear approximation of $\sqrt{x}$ around $a = 4$ is`,
      options: [r`$2 + \frac14(x - 4)$`, r`$2 + \frac12(x - 4)$`, r`$2 + 4(x - 4)$`, r`$4 + \frac14(x - 2)$`],
      answer: 0,
      explain: r`$f(4) = 2$, $f'(x) = \frac{1}{2\sqrt x}$ so $f'(4) = \frac14$. Hence $\sqrt x \approx 2 + \frac14(x - 4)$.`,
    },
    {
      id: "derivatives-use-q18",
      kind: "mcq",
      sub: "Linear approximation",
      prompt: r`$\sqrt[3]{1.03} \approx 1.01$ is accurate but $\sqrt[3]{8} \approx 3.33$ is poor (both from the tangent at $a = 1$) because`,
      options: [
        r`$x = 8$ is far from $a = 1$`,
        r`$\sqrt[3]{x}$ is not differentiable at $8$`,
        r`the approximation only works for $x < 1$`,
        r`$f'(8)$ should have been used`,
      ],
      answer: 0,
      explain: r`$f(x) \approx f(a) + f'(a)(x - a)$ only holds for $x$ close to $a$; the curve bends away from the tangent as $x$ moves away.`,
    },
    // --- polynomial approximation
    {
      id: "derivatives-use-q19",
      kind: "mcq",
      sub: "Quadratic approximation",
      prompt: r`The quadratic approximation of $\sqrt[3]{x}$ around $a = 1$ is`,
      options: [
        r`$1 + \frac13(x-1) - \frac19(x-1)^2$`,
        r`$1 + \frac13(x-1) - \frac29(x-1)^2$`,
        r`$1 + \frac13(x-1) + \frac19(x-1)^2$`,
        r`$1 + \frac13(x-1) - \frac13(x-1)^2$`,
      ],
      answer: 0,
      explain: r`$f''(x) = -\frac29x^{-5/3}$, $f''(1) = -\frac29$, and the term is $\frac{1}{2!}f''(1)(x-1)^2 = -\frac19(x-1)^2$. Option B forgets the $\frac{1}{2!}$.`,
    },
    {
      id: "derivatives-use-q20",
      kind: "mcq",
      sub: "Quadratic approximation",
      prompt: r`The second-order Taylor approximation of $f(x) = 2e^x$ about $0$ is`,
      options: [r`$2 + 2x + x^2$`, r`$2 + 2x + 2x^2$`, r`$1 + x + \frac12x^2$`, r`$2 + x + \frac12x^2$`],
      answer: 0,
      explain: r`$f(0) = f'(0) = f''(0) = 2$, so $2 + 2x + \frac{1}{2!}(2)x^2 = 2 + 2x + x^2$. (Assignment 7 Q8(b).)`,
    },
    {
      id: "derivatives-use-q21",
      kind: "mcq",
      sub: "Taylor polynomial",
      prompt: r`In the Taylor polynomial about $a$, the term in $(x - a)^3$ is`,
      options: [r`$\frac{1}{6}f'''(a)(x-a)^3$`, r`$\frac{1}{3}f'''(a)(x-a)^3$`, r`$f'''(a)(x-a)^3$`, r`$\frac12f'''(a)(x-a)^3$`],
      answer: 0,
      explain: r`The $n$th term is $\frac{1}{n!}f^{(n)}(a)(x-a)^n$, and $3! = 6$.`,
    },
    {
      id: "derivatives-use-q22",
      kind: "mcq",
      sub: "Curvature",
      prompt: r`If $f''(a) < 0$, then for $x$ close to $a$ the linear approximation $f(a) + f'(a)(x-a)$`,
      options: [r`overestimates $f(x)$`, r`underestimates $f(x)$`, r`is exact`, r`cannot be used`],
      answer: 0,
      explain: r`$f''(a) < 0$ means the graph bends downward, below its tangent line, so the tangent gives values that are too large; the quadratic term $\frac12f''(a)(x-a)^2 < 0$ corrects this. Example: $\sqrt[3]{1.03}$: $1.01 > 1.0099$.`,
    },
    {
      id: "derivatives-use-q23",
      kind: "mcq",
      sub: "Quadratic approximation",
      prompt: r`Using the second-order approximation of $e^x$ about $0$, $e^{0.1} \approx$`,
      options: [r`$1.105$`, r`$1.1$`, r`$1.11$`, r`$1.0105$`],
      answer: 0,
      explain: r`$e^x \approx 1 + x + \frac{1}{2}x^2$: $1 + 0.1 + 0.005 = 1.105$ (true $1.10517$). $1.1$ is the linear value; $1.11$ forgets the $\frac{1}{2!}$.`,
    },
    // --- elasticity
    {
      id: "derivatives-use-q24",
      kind: "mcq",
      sub: "Elasticity",
      prompt: r`The elasticity of $f(x) = 3x^{-2}$ with respect to $x$ is`,
      options: [r`$-2$`, r`$-6$`, r`$2$`, r`$-6x^{-3}$`],
      answer: 0,
      explain: r`$Ax^b$ has constant elasticity $b$: $\varepsilon_x = -6x^{-3}\cdot\frac{x}{3x^{-2}} = -2$. Option D is $f'(x)$, not the elasticity.`,
    },
    {
      id: "derivatives-use-q25",
      kind: "fill",
      sub: "Elasticity",
      prompt: r`Demand $D = 100 - 10P$. The price elasticity of demand at $P = 4$ is ____ (2 d.p.).`,
      answers: [["-0.67", "-2/3"]],
      explain: r`$D(4) = 60$, $D' = -10$: $\varepsilon_D = -10\times\frac{4}{60} = -\frac23 \approx -0.67$.`,
    },
    {
      id: "derivatives-use-q26",
      kind: "mcq",
      sub: "Elasticity",
      prompt: r`A price elasticity of demand of $-\frac23$ means demand is`,
      options: ["inelastic", "elastic", "unit elastic", "completely inelastic"],
      answer: 0,
      explain: r`$|\varepsilon| = \frac23 < 1$: inelastic. A 1% price rise cuts quantity demanded by about $0.67\%$.`,
    },
    {
      id: "derivatives-use-q27",
      kind: "mcq",
      sub: "Elasticity",
      prompt: r`Why do economists prefer elasticity to the derivative $D'(P)$?`,
      options: [
        "It uses percentage changes, so it is free of size and measurement-scale effects",
        "It is always positive",
        "It is always constant along a demand curve",
        "It does not need the demand function to be differentiable",
      ],
      answer: 0,
      explain: r`$D'(P)$ depends on units (kg vs pounds, SGD vs USD) and on size (one dollar on coffee vs cars). Elasticity compares percentage changes. It is negative for demand and usually varies along the curve.`,
    },
    {
      id: "derivatives-use-q28",
      kind: "fill",
      sub: "Tax and elasticity",
      prompt: r`$Q^S = 10 + P$, $Q^D = 22 - P$, and a 2-dollar tax per pack is imposed on producers. The new equilibrium price is ____ and quantity is ____ .`,
      answers: [["7"], ["15"]],
      explain: r`Producers keep $P - 2$: $Q^S = 8 + P$. $8 + P = 22 - P \Rightarrow P = 7$, $Q = 15$. (Assignment 8 Q2.)`,
    },
    {
      id: "derivatives-use-q29",
      kind: "fill",
      sub: "Tax and elasticity",
      prompt: r`At that equilibrium ($P = 7$, $Q = 15$, $Q^D = 22 - P$) the price elasticity of demand is ____ (2 d.p.).`,
      answers: [["-0.47", "-7/15"]],
      explain: r`$\varepsilon_D = \frac{dQ^D}{dP}\cdot\frac{P}{Q} = -1\times\frac{7}{15} \approx -0.47$: inelastic.`,
    },
    {
      id: "derivatives-use-q30",
      kind: "fill",
      sub: "Tax and elasticity",
      prompt: r`$Q^S = 12 + P$, $Q^D = 32 - P$, and a 5% sales tax is imposed on producers. The equilibrium price is about ____ (2 d.p.).`,
      answers: [["10.26", "10.24"]],
      explain: r`Producers keep $0.95P$: $12 + 0.95P = 32 - P \Rightarrow 1.95P = 20 \Rightarrow P \approx 10.26$, $Q \approx 21.74$, $\varepsilon_D \approx -0.47$. (If the tax is instead added on top, $P = 1.05P_s$, you get $P \approx 10.24$.) Past paper Q3(d).`,
    },
    {
      id: "derivatives-use-q31",
      kind: "mcq",
      sub: "Tax burden",
      prompt: r`A per-unit tax is imposed on producers and demand is perfectly inelastic. Who bears the tax?`,
      options: ["Consumers bear all of it", "Producers bear all of it", "They always share it equally", "Nobody: the price does not change"],
      answer: 0,
      explain: r`With a vertical demand curve quantity cannot fall, so the price rises by the full tax: consumers pay it all. With perfectly elastic demand producers would bear it all.`,
    },
    // --- continuity
    {
      id: "derivatives-use-q32",
      kind: "mcq",
      sub: "Continuity",
      prompt: r`Why is $f(x) = \frac{x^2-1}{x-1}$ not continuous at $x = 1$?`,
      options: [
        r`$f(1)$ is not defined`,
        r`$\lim_{x\to1}f(x)$ does not exist`,
        r`the limit exists but differs from $f(1) = 0$`,
        r`it is continuous at $x = 1$`,
      ],
      answer: 0,
      explain: r`$f(1) = \frac00$ is undefined, so condition (i) fails, even though $\lim_{x\to1}f(x) = \lim(x+1) = 2$ exists.`,
    },
    {
      id: "derivatives-use-q33",
      kind: "fill",
      sub: "Continuity",
      prompt: r`$f(x) = 2x + a$ for $x \le 1$ and $f(x) = x^2 + 3$ for $x > 1$. $f$ is continuous at $x = 1$ when $a =$ ____ .`,
      answers: [["2"]],
      explain: r`Need $f(1) = 2 + a$ to equal the right-hand limit $1 + 3 = 4$, so $a = 2$.`,
    },
    {
      id: "derivatives-use-q34",
      kind: "mcq",
      sub: "Continuity vs differentiability",
      prompt: r`At $x = 0$, the function $f(x) = |x|$ is`,
      options: [
        "continuous but not differentiable",
        "differentiable but not continuous",
        "both continuous and differentiable",
        "neither continuous nor differentiable",
      ],
      answer: 0,
      explain: r`No break, so continuous; but the corner has slope $-1$ on the left and $+1$ on the right, so there is no unique tangent. "Differentiable but not continuous" is impossible: differentiability implies continuity.`,
    },
    // --- L'Hôpital
    {
      id: "derivatives-use-q35",
      kind: "fill",
      sub: "L'Hôpital's rule",
      prompt: r`$\lim_{x\to2}\frac{2x-4}{x^3-8} =$ ____ .`,
      answers: [["1/6", "0.167"]],
      explain: r`$\frac00$, so L'Hôpital: $\lim_{x\to2}\frac{2}{3x^2} = \frac{2}{12} = \frac16$.`,
    },
    {
      id: "derivatives-use-q36",
      kind: "mcq",
      sub: "L'Hôpital's rule",
      prompt: r`$\lim_{x\to\infty}\frac{2x^2 - x}{1 - 5x^2} =$`,
      options: [r`$-\frac25$`, r`$\frac25$`, r`$2$`, r`$0$`],
      answer: 0,
      explain: r`$\frac{\infty}{\infty}$: $\lim\frac{4x - 1}{-10x} = \lim\frac{4}{-10} = -\frac25$ (L'Hôpital twice).`,
    },
    {
      id: "derivatives-use-q37",
      kind: "fill",
      sub: "L'Hôpital's rule",
      prompt: r`$\lim_{x\to1}\frac{x-1}{x^2-1} =$ ____ .`,
      answers: [["0.5", "1/2"]],
      explain: r`$\frac00$: L'Hôpital gives $\lim\frac{1}{2x} = \frac12$. (Assignment 8 Q1(a).)`,
    },
    {
      id: "derivatives-use-q38",
      kind: "mcq",
      sub: "L'Hôpital's rule",
      prompt: r`$\lim_{x\to2}\frac{x-2}{x^2-1} =$`,
      options: [r`$0$`, r`$\frac14$`, r`$\frac13$`, "does not exist"],
      answer: 0,
      explain: r`Substitution gives $\frac{0}{3} = 0$. This is not $\frac00$, so L'Hôpital's rule must not be used (it would wrongly give $\frac{1}{2x} = \frac14$). (Assignment 8 Q1(b).)`,
    },
    {
      id: "derivatives-use-q39",
      kind: "fill",
      sub: "Limits at infinity",
      prompt: r`$\lim_{x\to\infty}\left(\sqrt{x^2 - x} - x\right) =$ ____ .`,
      answers: [["-0.5", "-1/2"]],
      explain: r`Conjugate: $\frac{-x}{\sqrt{x^2-x} + x} = \frac{-1}{\sqrt{1 - 1/x} + 1} \to -\frac12$. (Assignment 8 Q1(c).)`,
    },
    {
      id: "derivatives-use-q40",
      kind: "mcq",
      sub: "Limits of powers",
      prompt: r`$\lim_{x\to\infty}\left(\frac1x\right)^{1/\ln x} =$`,
      options: [r`$e^{-1}$`, r`$0$`, r`$1$`, r`$e$`],
      answer: 0,
      explain: r`Its log is $\frac{1}{\ln x}\ln\frac1x = \frac{-\ln x}{\ln x} = -1$, so the expression equals $e^{-1}$ for every $x > 1$. (Past paper Q1(a).)`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "derivatives-use-x1",
      kind: "calc",
      sub: "Implicit differentiation",
      prompt: r`Find the first derivative of $y^2e^{2x} = 3y + x^2$ evaluated at $(0, 3)$.`,
      marks: 5,
      rubric: [
        { point: r`Differentiates the left side correctly with product and chain rules: $2yy'e^{2x} + 2y^2e^{2x}$`, marks: 2 },
        { point: r`Differentiates the right side: $3y' + 2x$`, marks: 1 },
        { point: r`Substitutes $x = 0$, $y = 3$ and solves the linear equation for $y'$`, marks: 1 },
        { point: r`Correct answer $y' = -6$`, marks: 1 },
      ],
      model: r`Check the point: $3^2e^0 = 9$ and $3(3) + 0 = 9$ ✓.
Treat $y$ as a function of $x$ and differentiate both sides:
$$\frac{d}{dx}\left(y^2e^{2x}\right) = 2y\,y'\,e^{2x} + y^2\cdot2e^{2x}, \qquad \frac{d}{dx}(3y + x^2) = 3y' + 2x.$$
So $2yy'e^{2x} + 2y^2e^{2x} = 3y' + 2x$.
At $(0, 3)$: $2(3)y'(1) + 2(9)(1) = 3y' + 0 \Rightarrow 6y' + 18 = 3y' \Rightarrow 3y' = -18$.
$$y' = -6.$$`,
      answer: r`$\frac{dy}{dx} = -6$ at $(0,3)$`,
      source: "Past paper Q2(c)",
    },
    {
      id: "derivatives-use-x2",
      kind: "calc",
      sub: "Tangent lines",
      prompt: r`Find the equation of the tangent line to $y^2e^{2x} = 3y + x^2$ at $(0, 3)$.`,
      marks: 5,
      rubric: [
        { point: r`Implicit differentiation: $2yy'e^{2x} + 2y^2e^{2x} = 3y' + 2x$`, marks: 2 },
        { point: r`Slope at $(0,3)$ is $-6$`, marks: 1 },
        { point: r`Uses point-slope form $y - 3 = -6(x - 0)$`, marks: 1 },
        { point: r`Final equation $y = 3 - 6x$`, marks: 1 },
      ],
      model: r`Differentiate implicitly: $2yy'e^{2x} + 2y^2e^{2x} = 3y' + 2x$.
At $(0,3)$: $6y' + 18 = 3y' \Rightarrow y' = -6$, so the slope of the tangent is $m = -6$.
Point-slope form through $(0, 3)$: $y - 3 = -6(x - 0)$.
$$y = 3 - 6x.$$`,
      answer: r`$y = 3 - 6x$`,
      figures: [
        {
          xr: [-0.4, 1],
          yr: [0, 7],
          curves: [{ f: "(3+sqrt(9+4*x^2*exp(2*x)))/(2*exp(2*x))", label: "curve" }],
          segments: [{ from: [-0.4, 5.4], to: [0.5, 0], tone: 1, label: "y = 3 − 6x" }],
          points: [{ at: [0, 3], label: "(0, 3)" }],
        },
      ],
      source: "Past paper Q2(d)",
    },
    {
      id: "derivatives-use-x3",
      kind: "calc",
      sub: "Implicit differentiation",
      prompt: r`Suppose $y$ is defined implicitly as a function of $x$ by $g(xy + x) = x^3e^{2y} + \ln(x^4)$, where $g$ is a given differentiable function. Find an expression for $y'$.`,
      marks: 5,
      rubric: [
        { point: r`Chain rule on the left: $g'(xy + x)\,(y + xy' + 1)$`, marks: 2 },
        { point: r`Right side: $3x^2e^{2y} + 2x^3e^{2y}y' + \frac{4}{x}$`, marks: 1 },
        { point: r`Collects the $y'$ terms and solves for $y'$ correctly`, marks: 2 },
      ],
      model: r`Differentiate both sides with respect to $x$, treating $y = y(x)$.
Left: by the chain rule, with $u = xy + x$ and $\frac{du}{dx} = y + xy' + 1$:
$$\frac{d}{dx}g(xy + x) = g'(xy + x)\,(y + xy' + 1).$$
Right: $\frac{d}{dx}\left(x^3e^{2y}\right) = 3x^2e^{2y} + x^3\cdot2e^{2y}y'$ and $\frac{d}{dx}\ln(x^4) = \frac{d}{dx}4\ln x = \frac{4}{x}$.
So $g'(xy+x)\,(y + 1) + xg'(xy+x)\,y' = 3x^2e^{2y} + 2x^3e^{2y}y' + \frac4x$.
Collect $y'$: $y'\left[xg'(xy+x) - 2x^3e^{2y}\right] = 3x^2e^{2y} + \frac{4}{x} - (1+y)g'(xy+x)$.
$$y' = \frac{3x^2e^{2y} + \frac{4}{x} - (1+y)\,g'(xy+x)}{x\,g'(xy+x) - 2x^3e^{2y}}.$$`,
      answer: r`$y' = \dfrac{3x^2e^{2y} + 4/x - (1+y)g'(xy+x)}{xg'(xy+x) - 2x^3e^{2y}}$`,
      source: "Past paper Q2(e)",
    },
    {
      id: "derivatives-use-x4",
      kind: "calc",
      sub: "Implicit differentiation",
      prompt: r`Find the first derivatives $\frac{dy}{dx}$ of: (a) $2xy - 3y^2 - 12 = 0$; (b) $x - y + 3xy = e^x$; (c) $x^y = y^x$.`,
      marks: 5,
      rubric: [
        { point: r`(a) $2y + 2xy' - 6yy' = 0 \Rightarrow y' = \frac{y}{3y - x}$`, marks: 1.5 },
        { point: r`(b) $1 - y' + 3y + 3xy' = e^x \Rightarrow y' = \frac{e^x - 1 - 3y}{3x - 1}$`, marks: 1.5 },
        { point: r`(c) Takes logs, $y\ln x = x\ln y$, differentiates and solves: $y' = \frac{\ln y - y/x}{\ln x - x/y}$`, marks: 2 },
      ],
      model: r`(a) $\frac{d}{dx}(2xy) = 2y + 2xy'$, $\frac{d}{dx}(3y^2) = 6yy'$: $2y + 2xy' - 6yy' = 0 \Rightarrow y'(6y - 2x) = 2y$, so
$$y' = \frac{y}{3y - x}.$$
(b) $1 - y' + 3y + 3xy' = e^x \Rightarrow y'(3x - 1) = e^x - 1 - 3y$, so
$$y' = \frac{e^x - 1 - 3y}{3x - 1}.$$
(c) Take natural logs: $y\ln x = x\ln y$. Differentiate: $y'\ln x + \frac{y}{x} = \ln y + \frac{x}{y}y'$, so $y'\left(\ln x - \frac{x}{y}\right) = \ln y - \frac{y}{x}$ and
$$y' = \frac{\ln y - \frac yx}{\ln x - \frac xy} = \frac{y(x\ln y - y)}{x(y\ln x - x)}.$$
(E.g. at $(2, 4)$: $y' = \frac{\ln4 - 2}{\ln2 - 0.5} \approx -3.18$.)`,
      answer: r`(a) $\frac{y}{3y-x}$ (b) $\frac{e^x - 1 - 3y}{3x - 1}$ (c) $\frac{\ln y - y/x}{\ln x - x/y}$`,
      source: "Assignment 7 Q5",
    },
    {
      id: "derivatives-use-x5",
      kind: "calc",
      sub: "Second derivative",
      prompt: r`Find $\frac{dy}{dx}$ and $\frac{d^2y}{dx^2}$ by implicit differentiation when $x - y + 3xy = e^x$.`,
      marks: 5,
      rubric: [
        { point: r`First derivative: $1 - y' + 3y + 3xy' = e^x$, so $y' = \frac{e^x - 1 - 3y}{3x - 1}$`, marks: 2 },
        { point: r`Differentiates again correctly: $-y'' + 6y' + 3xy'' = e^x$`, marks: 2 },
        { point: r`$y'' = \frac{e^x - 6y'}{3x - 1}$ with $y'$ substituted`, marks: 1 },
      ],
      model: r`Differentiate once: $1 - y' + 3y + 3xy' = e^x$ (product rule on $3xy$), so
$$y' = \frac{e^x - 1 - 3y}{3x - 1}.$$
Differentiate $1 - y' + 3y + 3xy' = e^x$ again: $-y'' + 3y' + (3y' + 3xy'') = e^x$, i.e. $y''(3x - 1) + 6y' = e^x$.
$$y'' = \frac{e^x - 6y'}{3x - 1} = \frac{e^x}{3x - 1} - \frac{6(e^x - 1 - 3y)}{(3x - 1)^2}.$$
(Check: the equation gives $y = \frac{e^x - x}{3x - 1}$; at $x = 1$, $y \approx 0.859$, $y' \approx -0.430$, $y'' \approx 2.648$, matching numerical differentiation.)`,
      answer: r`$y' = \frac{e^x - 1 - 3y}{3x-1}$, $y'' = \frac{e^x - 6y'}{3x - 1}$`,
      source: "Assignment 7 Q6(a)",
    },
    {
      id: "derivatives-use-x6",
      kind: "calc",
      sub: "Second derivative",
      prompt: r`Find $\frac{dy}{dx}$ and $\frac{d^2y}{dx^2}$ by implicit differentiation when $2xy - 3y^2 - 12 = \frac{1}{x}$.`,
      marks: 5,
      rubric: [
        { point: r`$2y + 2xy' - 6yy' = -\frac{1}{x^2}$`, marks: 1 },
        { point: r`$y' = \frac{2y + 1/x^2}{6y - 2x}$ (or equivalent)`, marks: 1 },
        { point: r`Differentiates again: $4y' + 2xy'' - 6(y')^2 - 6yy'' = \frac{2}{x^3}$`, marks: 2 },
        { point: r`$y'' = \frac{1/x^3 - 2y' + 3(y')^2}{x - 3y}$`, marks: 1 },
      ],
      model: r`Differentiate: $2y + 2xy' - 6yy' = -\frac{1}{x^2}$. So $y'(2x - 6y) = -\frac{1}{x^2} - 2y$ and
$$y' = \frac{2y + \frac{1}{x^2}}{6y - 2x} = \frac{1 + 2x^2y}{x^2(6y - 2x)}.$$
Differentiate $2y + 2xy' - 6yy' = -x^{-2}$ again:
$2y' + (2y' + 2xy'') - (6y'\cdot y' + 6yy'') = 2x^{-3}$, i.e. $y''(2x - 6y) = \frac{2}{x^3} - 4y' + 6(y')^2$.
$$y'' = \frac{\frac{1}{x^3} - 2y' + 3(y')^2}{x - 3y},$$
with $y'$ from above. (Numerical check at $x = 8$, $y \approx 4.419$: $y' \approx 0.842$, $y'' \approx -0.0847$.)`,
      answer: r`$y' = \frac{2y + 1/x^2}{6y - 2x}$, $y'' = \frac{1/x^3 - 2y' + 3y'^2}{x - 3y}$`,
      source: "Assignment 7 Q6(b)",
    },
    {
      id: "derivatives-use-x7",
      kind: "explain",
      sub: "Macro model",
      prompt: r`In a standard macroeconomic model for determining national income in a closed economy, $Y = C + I$ where $C = C(Y)$. (a) Find $\frac{dY}{dI}$ and explain your answer clearly. (b) Suppose $C = 1600 + 0.8Y$. Calculate $\frac{dY}{dI}$.`,
      marks: 5,
      rubric: [
        { point: r`Differentiates $Y = C(Y) + I$ with respect to $I$ using the chain rule: $\frac{dY}{dI} = C'(Y)\frac{dY}{dI} + 1$`, marks: 2 },
        { point: r`Solves: $\frac{dY}{dI} = \frac{1}{1 - C'(Y)}$`, marks: 1 },
        { point: r`Explains: $C'(Y)$ is the MPC; with $0 < $ MPC $< 1$ a rise in $I$ raises $Y$ by more than the rise in $I$, more so the larger the MPC`, marks: 1 },
        { point: r`(b) $\frac{dY}{dI} = \frac{1}{1 - 0.8} = 5$`, marks: 1 },
      ],
      model: r`(a) $Y$ is defined implicitly as a function of $I$ by $Y = C(Y) + I$. Differentiate both sides with respect to $I$ (chain rule on $C(Y)$):
$$\frac{dY}{dI} = C'(Y)\,\frac{dY}{dI} + 1 \;\Rightarrow\; \frac{dY}{dI}\bigl(1 - C'(Y)\bigr) = 1 \;\Rightarrow\; \frac{dY}{dI} = \frac{1}{1 - C'(Y)}.$$
$C'(Y)$ is the marginal propensity to consume. A rise in investment raises income directly; the extra income raises consumption by $C'(Y)$ per unit, which raises income again, and so on. With $0 < C'(Y) < 1$, $\frac{dY}{dI} > 1$, and the larger the MPC the larger $\frac{dY}{dI}$ (MPC $0.5 \to 2$, $0.9 \to 10$).
(b) $C'(Y) = 0.8$, so $\frac{dY}{dI} = \frac{1}{1 - 0.8} = 5$: a 1-dollar increase in investment raises equilibrium income by 5 dollars. (Directly: $Y = 1600 + 0.8Y + I \Rightarrow Y = 8000 + 5I$.)`,
      answer: r`(a) $\frac{1}{1 - C'(Y)}$ (b) $5$`,
      source: "Assignment 7 Q7",
    },
    {
      id: "derivatives-use-x8",
      kind: "calc",
      sub: "Taylor approximation",
      prompt: r`Suppose $f(x) = 2e^x$. (a) Find the first-order Taylor expansion (linear approximation) about $0$. (b) Find the second-order Taylor expansion about $0$. (c) Find $f(0.01)$ from (a) and from (b), and compare with the true value $f(0.01) = 2.02010033417$.`,
      marks: 5,
      rubric: [
        { point: r`(a) $f(0) = f'(0) = 2$; $f(x) \approx 2 + 2x$`, marks: 1.5 },
        { point: r`(b) $f''(0) = 2$; $f(x) \approx 2 + 2x + x^2$ (with the $\frac{1}{2!}$)`, marks: 1.5 },
        { point: r`(c) $2.02$ and $2.0201$; the second-order value is much closer to the true value`, marks: 2 },
      ],
      model: r`$f(x) = f'(x) = f''(x) = 2e^x$, so $f(0) = f'(0) = f''(0) = 2$.
(a) $f(x) \approx f(0) + f'(0)x = 2 + 2x$.
(b) $f(x) \approx 2 + 2x + \frac{1}{2!}(2)x^2 = 2 + 2x + x^2$.
(c) Linear: $2 + 2(0.01) = 2.02$, error $\approx 0.0001003$.
Quadratic: $2 + 0.02 + 0.0001 = 2.0201$, error $\approx 0.00000033$.
The second-order approximation is about 300 times more accurate because it also captures the curvature ($f''(0) = 2 > 0$, so the tangent line underestimates).`,
      answer: r`$2 + 2x$; $2 + 2x + x^2$; $2.02$ and $2.0201$`,
      source: "Assignment 7 Q8",
    },
    {
      id: "derivatives-use-x9",
      kind: "explain",
      sub: "Taylor approximation",
      prompt: r`Let $f(x)$ be a nonlinear function that is twice continuously differentiable in a neighbourhood of $x = a$. Write down its first-order and second-order Taylor approximations about $a$. Explain why the second-order approximation **can** be more accurate for $x$ close to $a$, with particular reference to the role of the second derivative (curvature).`,
      marks: 5,
      rubric: [
        { point: r`First order: $f(x) \approx f(a) + f'(a)(x - a)$`, marks: 1 },
        { point: r`Second order: $f(x) \approx f(a) + f'(a)(x - a) + \frac{1}{2!}f''(a)(x - a)^2$`, marks: 1 },
        { point: r`The first-order approximation is the tangent line: it matches value and slope at $a$ but ignores curvature, so its error near $a$ comes mainly from the term $\frac12f''(a)(x-a)^2$ (overestimate if $f''(a) < 0$, underestimate if $f''(a) > 0$)`, marks: 1.5 },
        { point: r`The second-order term uses $f''(a)$ to bend with the curve; the neglected terms involve $(x-a)^3$ and higher, which are much smaller for $x$ near $a$; "can" because if $f''(a) = 0$ (or $x$ is far from $a$) there is no gain`, marks: 1.5 },
      ],
      model: r`**First order:** $f(x) \approx f(a) + f'(a)(x - a)$.
**Second order:** $f(x) \approx f(a) + f'(a)(x - a) + \frac{1}{2!}f''(a)(x - a)^2$.
The first-order approximation is the tangent line at $a$: it uses only the value $f(a)$ and the slope $f'(a)$, so it treats $f$ as if it were a straight line. A nonlinear $f$ bends away from its tangent, and the second derivative $f''(a)$ measures that bending (curvature). If $f''(a) < 0$ the graph bends below the tangent, so the linear approximation overestimates; if $f''(a) > 0$ it bends above, so the linear approximation underestimates. For $x$ near $a$ the main part of this error is $\frac{1}{2}f''(a)(x - a)^2$.
The second-order approximation adds exactly this curvature term, so it bends in the same direction as the curve. What is still left out involves $(x - a)^3$ and higher powers, which are far smaller than $(x - a)^2$ when $x$ is close to $a$. Example: $\sqrt[3]{1.03}$: linear $1.01$, quadratic $1.0099$ = true value to 4 d.p.
It **can** (not must) be more accurate: if $f''(a) = 0$ the two approximations coincide, and far from $a$ neither need be good (e.g. $\sqrt[3]{8}$ from $a = 1$).`,
      answer: r`$f(a) + f'(a)(x-a)$ and $f(a) + f'(a)(x-a) + \frac12f''(a)(x-a)^2$; the second captures curvature`,
      source: "Past paper Q4(e)",
    },
    {
      id: "derivatives-use-x10",
      kind: "calc",
      sub: "Limits",
      prompt: r`Find the following limits: (a) $\lim_{x\to1}\frac{x-1}{x^2-1}$ (b) $\lim_{x\to2}\frac{x-2}{x^2-1}$ (c) $\lim_{x\to\infty}\left(\sqrt{x^2 - x} - x\right)$.`,
      marks: 5,
      rubric: [
        { point: r`(a) Recognises $\frac00$ and applies L'Hôpital (or factorises): limit $= \frac12$`, marks: 1.5 },
        { point: r`(b) Notes the form is $\frac03$ (not indeterminate) so the limit is $0$ by direct substitution`, marks: 1.5 },
        { point: r`(c) Multiplies by the conjugate and simplifies to $\frac{-1}{\sqrt{1 - 1/x} + 1}$; limit $= -\frac12$`, marks: 2 },
      ],
      model: r`(a) At $x = 1$ we get $\frac00$. L'Hôpital: $\lim_{x\to1}\frac{1}{2x} = \frac12$. (Or $\frac{x-1}{(x-1)(x+1)} = \frac{1}{x+1} \to \frac12$.)
(b) At $x = 2$: numerator $0$, denominator $4 - 1 = 3$. Not an indeterminate form; the quotient is continuous at $2$, so the limit is $\frac{0}{3} = 0$. (Using L'Hôpital here would wrongly give $\frac14$.)
(c) $\infty - \infty$, so rewrite:
$$\sqrt{x^2-x} - x = \frac{(x^2 - x) - x^2}{\sqrt{x^2-x} + x} = \frac{-x}{\sqrt{x^2-x} + x} = \frac{-1}{\sqrt{1 - \frac1x} + 1}.$$
As $x\to\infty$ this tends to $\frac{-1}{1 + 1} = -\frac12$.`,
      answer: r`(a) $\frac12$ (b) $0$ (c) $-\frac12$`,
      source: "Assignment 8 Q1",
    },
    {
      id: "derivatives-use-x11",
      kind: "calc",
      sub: "Tangent lines",
      prompt: r`Show that $(1, 2)$ lies on the curve $x^2y + y^3 = 10$, and find the equation of the tangent line to the curve at that point.`,
      marks: 5,
      rubric: [
        { point: r`Verifies $1\cdot2 + 8 = 10$`, marks: 1 },
        { point: r`Implicit differentiation: $2xy + x^2y' + 3y^2y' = 0$`, marks: 2 },
        { point: r`Slope at $(1,2)$: $y' = -\frac{4}{13}$`, marks: 1 },
        { point: r`Tangent $y - 2 = -\frac{4}{13}(x - 1)$, i.e. $y = -\frac{4}{13}x + \frac{30}{13}$`, marks: 1 },
      ],
      model: r`On the curve: $1^2(2) + 2^3 = 2 + 8 = 10$ ✓.
Differentiate: $2xy + x^2y' + 3y^2y' = 0 \Rightarrow y' = \frac{-2xy}{x^2 + 3y^2}$.
At $(1,2)$: $y' = \frac{-4}{1 + 12} = -\frac{4}{13}$.
Tangent: $y - 2 = -\frac{4}{13}(x - 1)$, i.e.
$$y = -\frac{4}{13}x + \frac{30}{13}.$$`,
      answer: r`$y = -\frac{4}{13}x + \frac{30}{13}$`,
      source: "Modelled on Past paper Q2(c)–(d)",
    },
    {
      id: "derivatives-use-x12",
      kind: "calc",
      sub: "Limits of powers",
      prompt: r`Evaluate $\lim_{x\to\infty}\left(\frac{1}{x}\right)^{\frac{1}{\ln x}}$, if it exists.`,
      marks: 5,
      rubric: [
        { point: r`Takes the natural log (or writes the power as $e^{(\ln(1/x))/\ln x}$)`, marks: 2 },
        { point: r`Uses $\ln\frac1x = -\ln x$ to get exponent $-1$`, marks: 2 },
        { point: r`Limit $= e^{-1}$`, marks: 1 },
      ],
      model: r`Let $L(x) = \left(\frac1x\right)^{1/\ln x}$ for $x > 1$. Then
$$\ln L(x) = \frac{1}{\ln x}\cdot\ln\frac{1}{x} = \frac{-\ln x}{\ln x} = -1.$$
So $L(x) = e^{-1}$ for every $x > 1$, and therefore
$$\lim_{x\to\infty}\left(\frac1x\right)^{1/\ln x} = e^{-1} = \frac1e \approx 0.368.$$
The limit exists.`,
      answer: r`$e^{-1}$`,
      source: "Past paper Q1(a)",
    },
    {
      id: "derivatives-use-x13",
      kind: "calc",
      sub: "Tax and elasticity",
      prompt: r`Suppose the cigarette supply is $Q^S = 10 + P$ and the demand is $Q^D = 22 - P$. If the government imposes a 2-dollar tobacco tax per pack on the producers, calculate the price elasticity of demand at the equilibrium price and quantity. Explain your answer.`,
      marks: 5,
      rubric: [
        { point: r`New supply after the tax: $Q^S = 10 + (P - 2) = 8 + P$`, marks: 1 },
        { point: r`New equilibrium $P = 7$, $Q = 15$`, marks: 1.5 },
        { point: r`$\varepsilon_D = \frac{dQ^D}{dP}\cdot\frac{P}{Q} = -\frac{7}{15} \approx -0.47$`, marks: 1.5 },
        { point: r`Explains: $|\varepsilon_D| < 1$, inelastic; a 1% price rise lowers quantity demanded by about 0.47%`, marks: 1 },
      ],
      model: r`The producers pay 2 dollars per pack, so they keep only $P - 2$ of the price $P$. Supply becomes $Q^S = 10 + (P - 2) = 8 + P$.
Equilibrium: $8 + P = 22 - P \Rightarrow 2P = 14 \Rightarrow P = 7$, $Q = 22 - 7 = 15$. (Before the tax: $P = 6$, $Q = 16$.)
Price elasticity of demand: $\frac{dQ^D}{dP} = -1$, so
$$\varepsilon_D = -1\times\frac{7}{15} = -\frac{7}{15} \approx -0.47.$$
Since $|\varepsilon_D| < 1$, demand is **inelastic** at the equilibrium: a 1% increase in price reduces quantity demanded by only about 0.47%. Consumers pay 1 dollar more (6 → 7) and producers receive 1 dollar less (6 → 5), so the tax burden is shared equally here.`,
      answer: r`$P = 7$, $Q = 15$, $\varepsilon_D = -\frac{7}{15} \approx -0.47$ (inelastic)`,
      figures: [
        {
          x: "Q",
          y: "P",
          xr: [8, 22],
          yr: [0, 14],
          curves: [
            { f: "22-x", label: "Demand" },
            { f: "x-10", label: "Supply", tone: 2, from: 10 },
            { f: "x-8", label: "Supply + tax", tone: 1 },
          ],
          points: [
            { at: [16, 6], label: "(16, 6)" },
            { at: [15, 7], label: "(15, 7)", guides: true, tone: 1 },
          ],
        },
      ],
      source: "Assignment 8 Q2",
    },
    {
      id: "derivatives-use-x14",
      kind: "calc",
      sub: "Tax and elasticity",
      prompt: r`Consider the supply $Q^S = 12 + P$ and the demand $Q^D = 32 - P$. Suppose the government imposes a 5% sales tax on the producers. Calculate the equilibrium price, equilibrium quantity, and price elasticity of demand at the equilibrium point.`,
      marks: 5,
      rubric: [
        { point: r`Producers keep $95\%$ of the price: $Q^S = 12 + 0.95P$`, marks: 1 },
        { point: r`Equilibrium price $P = \frac{20}{1.95} \approx 10.26$`, marks: 1 },
        { point: r`Equilibrium quantity $Q \approx 21.74$`, marks: 1 },
        { point: r`$\varepsilon_D = -1\cdot\frac{P}{Q} \approx -0.47$ (inelastic)`, marks: 2 },
      ],
      model: r`With a 5% sales tax on producers, for each price $P$ paid by consumers the producers keep $0.95P$. Supply becomes $Q^S = 12 + 0.95P$.
Equilibrium: $12 + 0.95P = 32 - P \Rightarrow 1.95P = 20 \Rightarrow P = \frac{20}{1.95} = \frac{400}{39} \approx 10.26$.
$Q = 32 - 10.26 \approx 21.74$ (exactly $\frac{848}{39}$).
Elasticity: $\frac{dQ^D}{dP} = -1$, so
$$\varepsilon_D = -1\times\frac{10.26}{21.74} = -\frac{25}{53} \approx -0.47.$$
$|\varepsilon_D| < 1$, so demand is inelastic at equilibrium. (Before the tax: $P = 10$, $Q = 22$. If instead the 5% is added on top of the producer price, $P = 1.05P_s$, then $Q^S = 12 + \frac{P}{1.05}$, giving $P \approx 10.24$, $Q \approx 21.76$, $\varepsilon_D \approx -0.47$: the same conclusion.)`,
      answer: r`$P \approx 10.26$, $Q \approx 21.74$, $\varepsilon_D \approx -0.47$`,
      source: "Past paper Q3(d)",
    },
    {
      id: "derivatives-use-x15",
      kind: "proof",
      sub: "Continuity vs differentiability",
      prompt: r`True or false? Justify each. (a) If $f$ is differentiable at $x = a$, then $f$ is continuous at $x = a$. (b) If $f$ is continuous at $x = a$, then $f$ is differentiable at $x = a$.`,
      marks: 5,
      rubric: [
        { point: r`(a) True, with $f(x) - f(a) = \frac{f(x) - f(a)}{x - a}(x - a)$`, marks: 1.5 },
        { point: r`(a) Takes the limit: $f'(a)\cdot0 = 0$, so $\lim_{x\to a}f(x) = f(a)$`, marks: 1.5 },
        { point: r`(b) False, with a valid counter-example (e.g. $|x|$ at $0$) and reason: no unique tangent / left and right slopes differ`, marks: 2 },
      ],
      model: r`(a) **True.** Since $f$ is differentiable at $a$, $f'(a) = \lim_{x\to a}\frac{f(x) - f(a)}{x - a}$ exists. For $x \neq a$,
$$f(x) - f(a) = \frac{f(x) - f(a)}{x - a}\cdot(x - a).$$
Taking limits: $\lim_{x\to a}[f(x) - f(a)] = f'(a)\cdot\lim_{x\to a}(x - a) = f'(a)\cdot0 = 0$. Hence $\lim_{x\to a}f(x) = f(a)$, which is the definition of continuity at $a$.
(b) **False.** Counter-example: $f(x) = |x|$ at $a = 0$. It is continuous ($\lim_{x\to0}|x| = 0 = f(0)$; no break in the graph), but $\frac{f(x) - f(0)}{x - 0} = \frac{|x|}{x}$ equals $1$ for $x > 0$ and $-1$ for $x < 0$, so the limit does not exist. The graph has a corner at $0$ with no unique tangent. Continuity does not imply differentiability.`,
      answer: "(a) True (b) False, e.g. |x| at 0",
      source: "Lecture Note 6, Section 6.7",
    },
    {
      id: "derivatives-use-x16",
      kind: "select",
      sub: "Derivatives in use",
      prompt: r`Which **TWO** of the following statements are **wrong**? Write down the corresponding Roman numerals only.`,
      statements: [
        r`If $f$ is differentiable at $x = a$, then $f$ is continuous at $x = a$.`,
        r`L'Hôpital's rule states that $\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\left(\frac{f(x)}{g(x)}\right)'$ whenever the limit is of the form $\frac{0}{0}$.`,
        r`For $f(x) = Ax^b$ with $A \neq 0$, the elasticity $\varepsilon_x = f'(x)\frac{x}{f(x)}$ equals $b$ for every $x > 0$.`,
        r`The slope of the inverse function of $y = e^{5x}$ is $\frac{dx}{dy} = \frac{1}{5y}$.`,
        r`By L'Hôpital's rule, $\lim_{x\to2}\frac{x-2}{x^2-1} = \lim_{x\to2}\frac{1}{2x} = \frac14$.`,
        r`A function that is continuous at $x = a$ need not be differentiable at $x = a$.`,
      ],
      wrong: [1, 4],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (v) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong:** L'Hôpital's rule differentiates the numerator and the denominator **separately**: $\lim\frac{f(x)}{g(x)} = \lim\frac{f'(x)}{g'(x)}$, not the derivative of the quotient.
**(v) is wrong:** at $x = 2$ the quotient is $\frac{0}{3}$, not an indeterminate form, so L'Hôpital's rule does not apply. The limit is simply $\frac03 = 0$ (Assignment 8 Q1(b)).
The others are true: (i) differentiability implies continuity; (iii) $Abx^{b-1}\cdot\frac{x}{Ax^b} = b$; (iv) $\frac{dx}{dy} = \frac{1}{5e^{5x}} = \frac{1}{5y}$; (vi) e.g. $|x|$ at $0$.`,
      answer: "(ii) and (v)",
      source: "Modelled on Past paper Q4(c)–(d)",
    },
  ],
};

export default data;
