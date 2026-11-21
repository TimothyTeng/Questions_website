import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "functions",
  sections: [
    // ------------------------------------------------------------------ 3.1
    {
      title: "3.1 Introduction",
      intro: "A function describes how one variable depends on another. Economics is full of them: consumption depends on income, cost depends on output, tax revenue depends on the tax rate.",
      points: [
        {
          term: "Function (dependence)",
          text: "One variable is a function of another if the **first** variable (the dependent variable) depends upon the **second** (the independent variable).",
        },
        {
          term: "Area of a circle",
          text: r`The area of a circle depends on its radius $r$: $A = \pi r^2$ with $\pi = 3.14159\ldots$ Mathematically, $\text{Area} = f(r)$.`,
        },
        {
          term: "Consumption",
          text: r`$\text{Consumption} = a + 0.8Y$, where $Y$ is disposable income and $a$ is **autonomous consumption** (consumption when income is zero). Mathematically, $\text{Consumption} = f(Y)$.`,
        },
        {
          term: "Labour cost",
          text: r`Monthly labour cost $= 2000 \times L$ dollars, where $L$ is the number of workers. Mathematically, $\text{Labour cost} = f(L)$.`,
        },
        {
          term: "Graphs",
          text: "The dependence between two variables can also be illustrated by a graph: the independent variable on the horizontal axis, the dependent variable on the vertical axis.",
        },
        {
          term: "Laffer curve",
          text: r`There is a **non-linear** relationship between tax revenue and the tax rate. Tax revenue depends on the tax rate, so $\text{tax revenue} = f(\text{tax rate})$. Revenue rises with the rate up to some rate $a$, then falls, reaching zero at a $100\%$ rate.`,
        },
      ],
      figures: [
        {
          title: "The Laffer curve",
          x: "tax rate (%)",
          y: "tax revenue",
          xr: [0, 110],
          yr: [0, 115],
          curves: [{ f: "x*(100-x)/25", from: 0, to: 100, label: "revenue" }],
          points: [
            { at: [50, 100], label: "maximum at rate a", guides: true },
            { at: [100, 0], label: "100%" },
          ],
          caption: "Tax revenue = f(tax rate): revenue rises up to the rate a, then falls to zero at 100%. The relationship is not a straight line.",
        },
      ],
    },

    // ------------------------------------------------------------------ 3.2
    {
      title: "3.2 Domain and Range",
      intro: "Before using a function you must know which inputs are allowed (the domain) and which outputs can occur (the range).",
      points: [
        {
          term: "Function",
          text: r`A **function** of a real variable $x$ with domain $D$ is a **rule** that assigns a **unique** real number $f(x)$ to each number $x$ in $D$. We write $y = f(x)$.`,
        },
        {
          term: "Dependent and independent variable",
          text: r`In $y = f(x)$, $y$ is the **dependent** variable; $x$ is the **independent** variable, also called the **argument** of $f$.`,
        },
        {
          term: "Domain",
          text: r`The set of all **possible** values that $x$ can take in a given context is the **domain** of the function.`,
        },
        {
          term: "Image and range",
          text: r`The value $f(x)$ into which an $x$ value is mapped is the **image** of that $x$ value. The set of all images (all values $f(x)$ as $x$ varies over the whole domain) is the **range** of $f$.`,
        },
        {
          term: "Unique output, not unique input",
          text: r`Each $x$ **uniquely** determines a $y$ value. The converse is not required: more than one $x$ may legitimately be associated with the same $y$.`,
          eg: r`$y = x^2$ is a function: $x = 3$ gives only $y = 9$. But $y = 25$ comes from both $x = 5$ and $x = -5$.`,
        },
        {
          term: "Increasing",
          text: r`$f$ is **increasing** if $x_1 < x_2$ implies $f(x_1) \le f(x_2)$, and **strictly increasing** if $x_1 < x_2$ implies $f(x_1) < f(x_2)$.`,
        },
        {
          term: "Decreasing",
          text: r`$f$ is **decreasing** if $x_1 < x_2$ implies $f(x_1) \ge f(x_2)$, and **strictly decreasing** if $x_1 < x_2$ implies $f(x_1) > f(x_2)$.`,
        },
        {
          term: "How to find a domain",
          text: r`Start from all real numbers and remove the $x$ values where the formula breaks:
- a denominator cannot be $0$;
- the expression under a square root (even root) must be $\ge 0$;
- under a square root **in a denominator** it must be $> 0$;
- the argument of $\ln$ must be $> 0$ (see 3.8);
- in an economic context, quantities such as output are $\ge 0$.`,
        },
        {
          term: "How to find a range",
          text: r`Build the function up step by step from the domain and track the set of values at each step, e.g. $x \ge -1 \Rightarrow x + 1 \ge 0 \Rightarrow \sqrt{x+1} \ge 0 \Rightarrow 1 - \sqrt{x+1} \le 1$.`,
        },
        {
          term: "Fixed and variable cost",
          text: r`For a total cost function $C(x)$, the **fixed cost** is the part that does not depend on output (the constant term) and the **variable cost** is the rest. Average variable cost $= \dfrac{\text{variable cost}}{x}$, average fixed cost $= \dfrac{\text{fixed cost}}{x}$.`,
          eg: r`$C(x) = 2x^2 - x + 25$: fixed cost $25$, variable cost $2x^2 - x$.`,
        },
      ],
      table: [
        ["Expression in $f(x)$", "Condition for $x$ to be in the domain"],
        [r`$\dfrac{1}{g(x)}$`, r`$g(x) \ne 0$`],
        [r`$\sqrt{g(x)}$`, r`$g(x) \ge 0$`],
        [r`$\dfrac{1}{\sqrt{g(x)}}$`, r`$g(x) > 0$`],
        [r`$\ln g(x)$`, r`$g(x) > 0$`],
        ["Output, units, workers", r`$x \ge 0$`],
      ],
      figures: [
        {
          title: "y = x²: one y for each x, but not one x for each y",
          xr: [-6.5, 6.5],
          yr: [-2, 30],
          curves: [{ f: "x^2", label: "y = x²", from: -5.4, to: 5.4 }],
          points: [
            { at: [-5, 25], label: "(−5, 25)", guides: true },
            { at: [5, 25], label: "(5, 25)", guides: true },
            { at: [3, 9], label: "(3, 9)", guides: true, tone: 1 },
          ],
          caption: "x = 3 gives only y = 9, so y = x² is a function. The converse fails: y = 25 comes from x = 5 and x = −5.",
        },
        {
          title: "h(x) = 1 − √(x + 1)",
          xr: [-2, 8],
          yr: [-2.5, 2],
          curves: [{ f: "1-sqrt(x+1)", label: "h(x)" }],
          points: [{ at: [-1, 1], label: "(−1, 1): largest value", guides: true }],
          caption: "Domain x ≥ −1 (the square root needs x + 1 ≥ 0). Range h(x) ≤ 1: the curve starts at height 1 and falls without bound.",
        },
        {
          title: "f(x) = 1 / √(1 − x)",
          xr: [-8, 1.5],
          yr: [-0.5, 4],
          curves: [{ f: "1/sqrt(1-x)", label: "f(x)", to: 0.97 }],
          segments: [{ from: [1, -0.5], to: [1, 4], dashed: true, tone: 3, label: "x = 1 excluded" }],
          caption: "Domain x < 1 (need 1 − x > 0, strictly, because it is under a root in the denominator). Range f(x) > 0: always positive, never 0.",
        },
        {
          title: "A domain and range on the axes",
          xr: [0, 6],
          yr: [0, 6.5],
          curves: [{ f: "0.5*(x-3)^3-1.5*(x-3)+3", from: 1, to: 5.3, label: "f" }],
          segments: [
            { from: [1, 0.15], to: [5.3, 0.15], tone: 1, label: "domain D" },
            { from: [0.15, 2], to: [0.15, 5.63], tone: 2, label: "range" },
          ],
          points: [
            { at: [1, 2], guides: true },
            { at: [5.3, 5.63], guides: true },
          ],
          caption: "The domain is the set of x values the graph covers; the range is the set of heights it reaches.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 3 exercise",
          problem: r`Find the domains of (a) $f(x) = \dfrac{1}{x+1}$, (b) $h(x) = \sqrt{x}$, (c) $g(x) = x^2$.`,
          solution: r`(a) The denominator cannot be zero: $x + 1 \ne 0$, so the domain is all real $x \ne -1$.
(b) The square root needs $x \ge 0$: domain $[0, \infty)$.
(c) $x^2$ is defined for every real number: domain $(-\infty, \infty)$.`,
        },
        {
          source: "Lecture Note 3 exercise",
          problem: r`The cost of producing $x$ units of a commodity is $C(x) = 200 + 10x$. (a) Find the domain and range of the cost function. (b) Calculate the cost of producing 10 units. (c) Calculate the marginal cost.`,
          solution: r`(a) Output cannot be negative, so the domain is $x \ge 0$. $C$ is increasing, so the smallest cost is $C(0) = 200$ and the range is $C \ge 200$, i.e. $[200, \infty)$.
(b) $C(10) = 200 + 10(10) = 300$.
(c) $C$ is linear with slope $10$: each extra unit raises cost by $10$, so the marginal cost is $10$.`,
        },
        {
          source: "Assignment 3 Q4(a)",
          problem: r`Find the domain and range of $h(x) = 1 - \sqrt{x+1}$.`,
          solution: r`**Domain:** need $x + 1 \ge 0$, so $x \ge -1$: $D = [-1, \infty)$.
**Range:** for $x \ge -1$, $\sqrt{x+1}$ takes every value in $[0, \infty)$ (it is $0$ at $x = -1$ and grows without bound). So $1 - \sqrt{x+1}$ takes every value in $(-\infty, 1]$.
Range $= (-\infty, 1]$.`,
        },
        {
          source: "Assignment 3 Q4(b)",
          problem: r`Find the domain and range of $h(x) = \pi^{1/\sqrt{25 - x}}$, where $\dfrac{1}{\sqrt{25-x}}$ is the exponent.`,
          solution: r`**Domain:** the square root is in a denominator, so $25 - x > 0$, i.e. $x < 25$: $D = (-\infty, 25)$.
**Range:** for $x < 25$, $\sqrt{25 - x}$ takes every value in $(0, \infty)$, so the exponent $u = \dfrac{1}{\sqrt{25-x}}$ also takes every value in $(0, \infty)$.
Since $\pi > 1$, $\pi^u$ is increasing in $u$; as $u \to 0^+$, $\pi^u \to 1$ and as $u \to \infty$, $\pi^u \to \infty$. $u = 0$ is never reached, so $h(x) > 1$.
Range $= (1, \infty)$.`,
        },
        {
          source: "Assignment 3 Q4(c)",
          problem: r`Find the domain and range of $f(x) = \dfrac{1}{\sqrt{1 - x}}$.`,
          solution: r`**Domain:** the root is in the denominator, so $1 - x > 0$, i.e. $x < 1$: $D = (-\infty, 1)$.
**Range:** $\sqrt{1-x}$ takes every value in $(0, \infty)$, so its reciprocal takes every value in $(0, \infty)$.
Range $= (0, \infty)$.`,
        },
        {
          source: "Assignment 3 Q5",
          problem: r`A total cost function is $C(x) = 2x^2 - x + 25$. Find the average variable cost and the average fixed cost of producing 2 units of output.`,
          solution: r`Fixed cost $= 25$ (the part not depending on $x$); variable cost $VC(x) = 2x^2 - x$.
$AVC(x) = \dfrac{2x^2 - x}{x} = 2x - 1$, so $AVC(2) = 2(2) - 1 = 3$.
$AFC(x) = \dfrac{25}{x}$, so $AFC(2) = \dfrac{25}{2} = 12.5$.
(Check: average total cost $= C(2)/2 = (8 - 2 + 25)/2 = 15.5 = 3 + 12.5$.)`,
        },
      ],
    },

    // ------------------------------------------------------------------ 3.3
    {
      title: "3.3 Linear Functions",
      intro: "Linear functions occur very often in economics: consumption functions, supply and demand curves, simple cost functions.",
      points: [
        {
          term: "Linear function",
          text: r`$f(x) = ax + b$ (or $y = ax + b$), where $a$ and $b$ are constants. Its graph is a straight line.`,
        },
        {
          term: "Slope",
          text: r`The **slope** of the line is $a$, because $a$ measures the change in the value of the function when $x$ increases by $1$ unit.`,
        },
        {
          term: "Intercept",
          text: r`$b$ is the **intercept**: the height of the line when $x = 0$ (since $y = a \cdot 0 + b = b$).`,
        },
        {
          term: "Sign of the slope",
          text: r`The slope $a$ can be negative, positive or zero: $a > 0$ the line rises, $a < 0$ the line falls, $a = 0$ the line is horizontal.`,
        },
        {
          term: "Where it crosses the x-axis",
          text: r`If $a \ne 0$, setting $ax + b = 0$ gives $x = -\dfrac{b}{a}$.`,
        },
        {
          term: "Slope from two points",
          text: r`For a line $l$ through two **distinct** points $(x_1, y_1)$ and $(x_2, y_2)$ with $x_2 \ne x_1$, the slope is $a = \dfrac{y_2 - y_1}{x_2 - x_1}$ (rise over run).`,
        },
        {
          term: "Point–slope form",
          text: r`The line through $(x_1, y_1)$ with slope $a$ is $y - y_1 = a(x - x_1)$.`,
        },
        {
          term: "Economic examples",
          text: r`- Consumption function $C = f(Y) = a + bY$
- Supply curve $S = 10 + 2P$
- Demand curve $D = 100 - P$`,
        },
        {
          term: "General supply and demand",
          text: r`A general linear supply function is $S = \alpha + \beta P$ with $\alpha, \beta$ positive parameters (upward sloping). A general linear demand function is $D = a - bP$ with $a, b$ positive parameters (downward sloping).`,
        },
        {
          term: "Marginal propensity to consume (MPC)",
          text: r`In $C = a + bY$ the slope $b$ is the MPC: the extra consumption from one extra unit of income.`,
        },
        {
          term: "Savings function",
          text: r`In a closed economy with no government, income is either consumed or saved: $Y = C + S$, so $S = Y - C$. With $C = a + bY$, $S = -a + (1 - b)Y$. The slope $1 - b$ is the **marginal propensity to save** (MPS), and $\text{MPC} + \text{MPS} = 1$.`,
        },
      ],
      formulas: [
        { name: "Linear function", tex: r`f(x) = ax + b` },
        { name: "Slope through two points", tex: r`a = \frac{y_2 - y_1}{x_2 - x_1},\quad x_2 \ne x_1` },
        { name: "Point–slope form", tex: r`y - y_1 = a(x - x_1)` },
        { name: "x-intercept", tex: r`ax + b = 0 \iff x = -\frac{b}{a}\quad (a \ne 0)` },
        { name: "Savings from consumption", tex: r`S = Y - C,\quad C = a + bY \;\Rightarrow\; S = -a + (1-b)Y`, note: r`MPC $= b$, MPS $= 1 - b$, so MPC + MPS $= 1$.` },
      ],
      figures: [
        {
          title: "y = ax + b with a < 0",
          xr: [-1, 10],
          yr: [-1, 5.5],
          curves: [{ f: "-0.5*x+4", label: "y = −0.5x + 4" }],
          points: [
            { at: [0, 4], label: "intercept b = 4" },
            { at: [8, 0], label: "x = −b/a = 8" },
          ],
          caption: "Negative slope: the line falls by 0.5 each time x rises by 1. It crosses the x-axis at x = −b/a.",
        },
        {
          title: "y = ax + b with a > 0",
          xr: [-1, 8],
          yr: [-0.5, 6],
          curves: [{ f: "0.5*x+1.5", label: "y = 0.5x + 1.5" }],
          points: [
            { at: [1, 2], label: "P = (1, 2)" },
            { at: [5, 4], label: "Q = (5, 4)" },
            { at: [0, 1.5], label: "b = 1.5" },
          ],
          segments: [
            { from: [1, 2], to: [5, 2], dashed: true, tone: 1, label: "x₂ − x₁ = 4" },
            { from: [5, 2], to: [5, 4], dashed: true, tone: 2, label: "y₂ − y₁ = 2" },
          ],
          caption: "Slope = rise / run = (4 − 2)/(5 − 1) = 0.5: the height rises 0.5 for every 1 unit increase in x.",
        },
        {
          title: "Consumption and savings: C = 500 + 0.7Y, S = −500 + 0.3Y",
          x: "Y",
          y: "C, S",
          xr: [0, 3000],
          yr: [-600, 2700],
          curves: [
            { f: "500+0.7*x", label: "C = 500 + 0.7Y" },
            { f: "-500+0.3*x", label: "S = −500 + 0.3Y", tone: 1 },
          ],
          points: [
            { at: [0, 500], label: "autonomous consumption 500" },
            { at: [0, -500], label: "−500", tone: 1 },
          ],
          caption: "Slope of C = MPC = 0.7; slope of S = MPS = 0.3. At every income level C + S = Y, so the slopes add to 1.",
        },
        {
          title: "Supply S = 10 + 2P and demand D = 100 − P",
          x: "P",
          y: "quantity",
          xr: [0, 60],
          yr: [0, 110],
          curves: [
            { f: "10+2*x", label: "S", to: 48 },
            { f: "100-x", label: "D", tone: 1 },
          ],
          points: [{ at: [30, 70], label: "S = D at P = 30, Q = 70", guides: true }],
          caption: "Supply slopes up (β = 2 > 0), demand slopes down (slope −1). They meet where 10 + 2P = 100 − P.",
        },
      ],
      worked: [
        {
          source: "Assignment 3 Q3",
          problem: r`A closed economy has no government; income is either consumed or saved, $C = C(Y)$ and $S = S(Y)$, with $C = 500 + 0.7Y$. (a) What is the MPC? (b) Find the savings function. (c) What does the slope of the savings function mean? (d) Add the slopes of the consumption and savings functions. Does the result make sense?`,
          solution: r`(a) MPC $=$ slope of $C = 0.7$: each extra dollar of income raises consumption by $0.70$. The graph of $C$ is a straight line with intercept $500$ (autonomous consumption) and slope $0.7$.
(b) $S = Y - C = Y - (500 + 0.7Y) = -500 + 0.3Y$.
(c) The slope $0.3$ is the **marginal propensity to save**: each extra dollar of income raises savings by $0.30$.
(d) $0.7 + 0.3 = 1$. Yes: every extra dollar of income must be either consumed or saved, so the two marginal propensities must add up to $1$.`,
        },
        {
          source: "Modelled on Lecture Note 3, 3.3",
          problem: r`Find the equation of the straight line through $(2, 5)$ and $(6, 13)$.`,
          solution: r`Slope $a = \dfrac{13 - 5}{6 - 2} = \dfrac{8}{4} = 2$.
Point–slope form through $(2, 5)$: $y - 5 = 2(x - 2)$, so $y = 2x + 1$.
Check with $(6, 13)$: $2(6) + 1 = 13$. ✓`,
        },
      ],
    },

    // ------------------------------------------------------------------ 3.4
    {
      title: "3.4 Quadratic Functions",
      intro: "Many economic relationships first fall to a minimum and then rise, or rise to a maximum and then fall (tax revenue against the tax rate, salary against age). Quadratic functions have exactly this shape.",
      points: [
        {
          term: "Why not linear?",
          text: "Economists often need more complicated functions than linear ones to describe economic phenomena acceptably, e.g. tax revenue versus tax rate (the Laffer curve) or age versus salary.",
        },
        {
          term: "Quadratic function",
          text: r`$f(x) = ax^2 + bx + c$, where $a$, $b$, $c$ are constants and $a \ne 0$. Its graph is called a **parabola**.`,
        },
        {
          term: "Completed-square form",
          text: r`$ax^2 + bx + c = a\left(x + \dfrac{b}{2a}\right)^2 - \dfrac{b^2 - 4ac}{4a}$. Expand the right side to check: $a x^2 + bx + \dfrac{b^2}{4a} - \dfrac{b^2}{4a} + c$.`,
        },
        {
          term: "Minimum when a > 0",
          text: r`If $a > 0$ the squared term is $\ge 0$, so $f$ is smallest when $x = -\dfrac{b}{2a}$: a U-shaped parabola that decreases down to a minimum and then increases.`,
        },
        {
          term: "Maximum when a < 0",
          text: r`If $a < 0$ the squared term is $\le 0$, so $f$ is largest at $x = -\dfrac{b}{2a}$: an upside-down parabola that increases up to a maximum and then decreases (like the Laffer curve).`,
        },
        {
          term: "Vertex value",
          text: r`At $x = -\dfrac{b}{2a}$ the squared term is $0$, so $f\!\left(-\dfrac{b}{2a}\right) = -\dfrac{b^2 - 4ac}{4a} = \dfrac{4ac - b^2}{4a}$.`,
        },
        {
          term: "Roots (where the parabola meets the x-axis)",
          text: r`Setting the completed-square form to zero: $\left(x + \dfrac{b}{2a}\right)^2 = \dfrac{b^2 - 4ac}{4a^2}$. If $b^2 - 4ac \ge 0$ this gives $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$; if $b^2 - 4ac < 0$ there are no real roots. Simple cases can be factorised directly.`,
          eg: r`$x^2 - 4x + 3 = (x - 1)(x - 3) = 0$ gives $x = 1$ or $x = 3$.`,
        },
      ],
      formulas: [
        { name: "Quadratic function", tex: r`f(x) = ax^2 + bx + c,\quad a \ne 0` },
        { name: "Completed-square form", tex: r`ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}` },
        { name: "Vertex", tex: r`x = -\frac{b}{2a},\qquad f\!\left(-\frac{b}{2a}\right) = \frac{4ac - b^2}{4a}`, note: "Minimum if a > 0, maximum if a < 0." },
        { name: "Roots", tex: r`ax^2 + bx + c = 0 \iff x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\quad (b^2 - 4ac \ge 0)` },
      ],
      figures: [
        {
          title: "a > 0: f(x) = x² − 4x + 3 = (x − 2)² − 1",
          xr: [-0.5, 4.5],
          yr: [-1.6, 5],
          curves: [{ f: "x^2-4*x+3", label: "f(x)" }],
          points: [
            { at: [2, -1], label: "minimum (2, −1)", guides: true },
            { at: [1, 0], label: "root 1" },
            { at: [3, 0], label: "root 3" },
          ],
          caption: "Decreases down to the minimum at x = −b/2a = 2, then increases. Roots at x = 1 and x = 3.",
        },
        {
          title: "a < 0: f(x) = −2x² + 12x − 10 = −2(x − 3)² + 8",
          xr: [0, 6],
          yr: [-3, 10],
          curves: [{ f: "-2*x^2+12*x-10", label: "f(x)" }],
          points: [
            { at: [3, 8], label: "maximum (3, 8)", guides: true },
            { at: [1, 0], label: "root 1" },
            { at: [5, 0], label: "root 5" },
          ],
          caption: "Increases up to the maximum at x = 3, then decreases. The range is f(x) ≤ 8.",
        },
      ],
      worked: [
        {
          source: "Modelled on Lecture Note 3, 3.4",
          problem: r`For $f(x) = x^2 - 4x + 3$, write $f$ in completed-square form, find its minimum point and its roots.`,
          solution: r`Here $a = 1$, $b = -4$, $c = 3$. $-\dfrac{b}{2a} = 2$ and $\dfrac{b^2 - 4ac}{4a} = \dfrac{16 - 12}{4} = 1$.
So $f(x) = (x - 2)^2 - 1$. Since $a = 1 > 0$, the minimum is $-1$ at $x = 2$.
Roots: $(x - 2)^2 = 1 \Rightarrow x - 2 = \pm 1 \Rightarrow x = 1$ or $x = 3$.`,
        },
        {
          source: "Modelled on Lecture Note 3, 3.4",
          problem: r`For $f(x) = -2x^2 + 12x - 10$, find the maximum value, where it occurs, and the roots.`,
          solution: r`$a = -2$, $b = 12$, $c = -10$. $x = -\dfrac{b}{2a} = -\dfrac{12}{-4} = 3$.
$f(3) = -18 + 36 - 10 = 8$ (or $\dfrac{4ac - b^2}{4a} = \dfrac{80 - 144}{-8} = 8$). So $f(x) = -2(x - 3)^2 + 8$.
Since $a < 0$, $8$ is the **maximum**, at $x = 3$.
Roots: $-2(x - 3)^2 + 8 = 0 \Rightarrow (x - 3)^2 = 4 \Rightarrow x = 1$ or $x = 5$.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 3.5
    {
      title: "3.5 Polynomials",
      intro: "Linear, quadratic and cubic functions are all special cases of polynomials.",
      points: [
        {
          term: "Cubic function",
          text: r`$f(x) = ax^3 + bx^2 + cx + d$, where $a, b, c, d$ are constants and $a \ne 0$.`,
        },
        {
          term: "Cubics in economics",
          text: "Cubic functions are not as popular as linear and quadratic functions in economic models. An economic example is the **cost function** $C(Q)$, which rises steeply at first, flattens, then rises steeply again.",
        },
        {
          term: "General polynomial of degree n",
          text: r`$p(x) = a_n x^n + a_{n-1}x^{n-1} + \cdots + a_1 x + a_0$, where the $a$'s are constants and $a_n \ne 0$. This is a polynomial of **degree** $n$ with **coefficients** $a_n, a_{n-1}, \ldots, a_0$.`,
        },
        {
          term: "Special cases",
          text: r`$n = 1$: linear function; $n = 2$: quadratic function; $n = 3$: cubic function.`,
        },
      ],
      formulas: [
        { name: "Cubic function", tex: r`f(x) = ax^3 + bx^2 + cx + d,\quad a \ne 0` },
        { name: "Polynomial of degree n", tex: r`p(x) = a_n x^n + a_{n-1}x^{n-1} + \cdots + a_1 x + a_0,\quad a_n \ne 0` },
      ],
      figures: [
        {
          title: "A cubic cost function C(Q) = Q³ − 6Q² + 15Q + 10",
          x: "Q",
          y: "C",
          xr: [0, 5.3],
          yr: [0, 70],
          curves: [{ f: "x^3-6*x^2+15*x+10", label: "C(Q)" }],
          points: [{ at: [0, 10], label: "fixed cost 10" }],
          caption: "Cost rises quickly at first, flattens out, then rises steeply again: the typical shape of a cubic cost function.",
        },
      ],
      worked: [
        {
          source: "Modelled on Lecture Note 3, 3.5",
          problem: r`State the degree and the coefficients of $p(x) = 4x^5 - 3x^2 + 7$.`,
          solution: r`The highest power with a nonzero coefficient is $x^5$, so the degree is $n = 5$.
Coefficients: $a_5 = 4$, $a_4 = 0$, $a_3 = 0$, $a_2 = -3$, $a_1 = 0$, $a_0 = 7$.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 3.6
    {
      title: "3.6 Power Functions",
      intro: "In a power function the variable is the base and the exponent is a fixed number.",
      points: [
        {
          term: "Power function",
          text: r`$f(x) = Ax^r$, with $x > 0$, $r \in \mathbb{R}$ and $A \in \mathbb{R}$.`,
        },
        {
          term: "Why x > 0",
          text: r`For many values of $r$, such as $r = 0.5$, $x^r$ is not defined for negative $x$ (e.g. $(-4)^{0.5} = \sqrt{-4}$).`,
        },
        {
          term: "Why exclude x = 0",
          text: r`$0^r$ is undefined if $r < 0$ (e.g. $0^{-1} = 1/0$). For $r > 0$, including $x = 0$ is possible.`,
        },
        {
          term: "Graphs of y = xʳ for r > 0",
          text: r`All pass through $(0, 0)$ and $(1, 1)$ and are increasing. For $r > 1$ (e.g. $x^2, x^3$) the curve is below $y = x$ on $(0, 1)$ and above it for $x > 1$; for $0 < r < 1$ (e.g. $x^{1/2}, x^{1/3}$) it is the other way round.`,
        },
        {
          term: "Graphs of y = xʳ for r < 0",
          text: r`The curve passes through $(1, 1)$, is decreasing, becomes very large as $x$ approaches $0$ and approaches $0$ as $x$ grows (e.g. $y = x^{-1} = 1/x$).`,
        },
      ],
      formulas: [
        { name: "Power function", tex: r`f(x) = Ax^r,\quad x > 0` },
        { name: "Fractional and negative powers", tex: r`x^{1/2} = \sqrt{x},\quad x^{1/3} = \sqrt[3]{x},\quad x^{-r} = \frac{1}{x^r}` },
      ],
      figures: [
        {
          title: "y = xʳ for r = 3, 2, 1, 1/2, 1/3",
          xr: [0, 2.5],
          yr: [0, 2.6],
          curves: [
            { f: "x^3", label: "x³", to: 1.37 },
            { f: "x^2", label: "x²", to: 1.6, tone: 1 },
            { f: "x", label: "x", to: 2.4, tone: 3 },
            { f: "x^0.5", label: "x^(1/2)", tone: 2 },
            { f: "x^(1/3)", label: "x^(1/3)", tone: 1 },
          ],
          points: [{ at: [1, 1], label: "(1, 1)", guides: true }],
          caption: "Every curve passes through (1, 1). Larger r: lower on (0, 1), steeper after x = 1.",
        },
        {
          title: "y = xʳ with r < 0 (here r = −1)",
          xr: [0, 3.6],
          yr: [0, 3.6],
          curves: [{ f: "x^(-1)", label: "y = 1/x", from: 0.28 }],
          points: [{ at: [1, 1], label: "(1, 1)", guides: true }],
          caption: "Negative exponent: decreasing, undefined at x = 0, approaching 0 as x grows.",
        },
      ],
      worked: [
        {
          source: "Modelled on Lecture Note 3, 3.6",
          problem: r`Evaluate $f(x) = 8x^{-2/3}$ at $x = 8$, and explain why $x = 0$ is excluded from its domain.`,
          solution: r`$8^{1/3} = 2$, so $8^{-2/3} = \dfrac{1}{(8^{1/3})^2} = \dfrac{1}{4}$ and $f(8) = 8 \cdot \dfrac{1}{4} = 2$.
The exponent $r = -2/3 < 0$, so $0^{-2/3} = 1/0^{2/3}$ would divide by zero: $x = 0$ must be excluded.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 3.7
    {
      title: "3.7 Exponential Functions",
      intro: "Population, prices and investments that grow (or shrink) by a fixed percentage each year follow exponential functions.",
      points: [
        {
          term: "Exponential growth or decay",
          text: r`A quantity that increases (decreases) by a **fixed factor** per unit of time is said to increase (decrease) exponentially. If the fixed factor is $a$, this leads to the exponential function $f(t) = Aa^t$, where $a$ and $A$ are positive constants.`,
        },
        {
          term: "a > 1",
          text: r`If $a > 1$, $f$ is increasing (exponential growth).`,
        },
        {
          term: "0 < a < 1",
          text: r`If $0 < a < 1$, $f$ is decreasing (exponential decay).`,
        },
        {
          term: "Starting value",
          text: r`Because $f(0) = Aa^0 = A$, we can write $f(t) = f(0)a^t$: $A$ is the value at time $0$.`,
        },
        {
          term: "Growth factor from a percentage",
          text: r`Growth of $p\%$ per period means multiplying by $a = 1 + \frac{p}{100}$ each period; a fall of $p\%$ means $a = 1 - \frac{p}{100}$.`,
          eg: r`$1.8\%$ growth: $a = 1.018$. A growth rate of $-0.6\%$: $a = 0.994$.`,
        },
        {
          term: "General exponential function",
          text: r`With base $a > 0$, $f(x) = Aa^x$, where $a$ is the factor by which $f(x)$ changes when $x$ increases by $1$.`,
        },
        {
          term: "Exponential vs power function",
          text: r`There is a difference between exponential and power functions. In a **power** function $x^r$ the variable is the **base** and the exponent is fixed; in an **exponential** function $a^x$ the base is fixed and the variable is the **exponent**.`,
          eg: r`$x^2$ is a power function; $2^x$ is an exponential function.`,
        },
        {
          term: "Solving for the time",
          text: r`To find when $Aa^t$ reaches a value $B$, take $\ln$ of both sides of $a^t = B/A$ (see 3.8): $t\ln a = \ln(B/A)$, so $t = \dfrac{\ln(B/A)}{\ln a}$.`,
        },
      ],
      formulas: [
        { name: "Exponential function", tex: r`f(t) = Aa^t = f(0)\,a^t,\quad a, A > 0` },
        { name: "Growth factor", tex: r`a = 1 + \frac{p}{100}\quad (p\%\text{ growth per period})` },
        { name: "Time to go from A to B", tex: r`Aa^t = B \iff t = \frac{\ln(B/A)}{\ln a}` },
      ],
      figures: [
        {
          title: "Growth (a > 1) and decay (0 < a < 1)",
          x: "t",
          xr: [-3, 3],
          yr: [0, 8],
          curves: [
            { f: "2*1.5^x", label: "2(1.5)ᵗ, a > 1" },
            { f: "2*0.5^x", label: "2(0.5)ᵗ, 0 < a < 1", tone: 1, from: -2 },
          ],
          points: [{ at: [0, 2], label: "A = f(0) = 2" }],
          caption: "Both start at A = f(0) = 2. With a = 1.5 the curve rises; with a = 0.5 it falls towards 0 but stays positive.",
        },
        {
          title: "Power x² versus exponential 2ˣ",
          xr: [0, 5.6],
          yr: [0, 40],
          curves: [
            { f: "x^2", label: "x² (power)", tone: 1 },
            { f: "2^x", label: "2ˣ (exponential)" },
          ],
          points: [
            { at: [2, 4], label: "(2, 4)" },
            { at: [4, 16], label: "(4, 16)" },
          ],
          caption: "x² has the variable in the base, 2ˣ has it in the exponent. They meet at x = 2 and x = 4; after x = 4 the exponential is above.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 3 example",
          problem: r`If Singapore's population is increasing by $1.8\%$ annually, how many years would it take for the population to grow from 5.9 million to 6.9 million?`,
          solution: r`After $t$ years the population is $5.9 \times (1.018)^t$ million. Set it equal to 6.9:
$$5.9 \times (1.018)^t = 6.9 \iff (1.018)^t = \frac{6.9}{5.9} \approx 1.1695.$$
Take $\ln$ of both sides: $t\ln(1.018) = \ln\!\left(\dfrac{6.9}{5.9}\right)$, so
$$t = \frac{\ln(6.9/5.9)}{\ln(1.018)} = \frac{0.15657}{0.01784} \approx 8.78 \text{ years}.$$`,
        },
        {
          source: "Assignment 4 Q1(a)",
          problem: r`Japan's population growth rate is $-0.6\%$ on average annually. How many years will it take for the population to decrease from 126.5 million to below 100 million?`,
          solution: r`Factor per year: $a = 1 - 0.006 = 0.994$. After $t$ years: $126.5(0.994)^t$.
Solve $126.5(0.994)^t = 100$: $(0.994)^t = \dfrac{100}{126.5}$, so
$$t = \frac{\ln(100/126.5)}{\ln(0.994)} = \frac{-0.23507}{-0.0060181} \approx 39.06.$$
After 39 years the population is $126.5(0.994)^{39} \approx 100.04$ million (still above 100); after 40 years it is $\approx 99.44$ million. So it takes **40 years** to fall below 100 million.`,
        },
        {
          source: "Assignment 4 Q1(b)",
          problem: r`Simon invests 100,000 dollars in the stock market and earns a $20\%$ yearly return consistently for 50 years. What is his portfolio worth after 50 years?`,
          solution: r`Factor per year $a = 1.2$, starting value $A = 100{,}000$.
$$f(50) = 100{,}000 \times (1.2)^{50} \approx 100{,}000 \times 9100.44 \approx 910{,}043{,}815 \text{ dollars},$$
about 910 million dollars.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 3.8
    {
      title: "3.8 Logarithmic Functions",
      intro: "Logarithms let us solve equations in which the unknown is an exponent.",
      points: [
        {
          term: "Typical questions",
          text: r`- At the present rate of inflation, how long will it take the price level to double?
- If the economy grows at $3\%$ per year, how long will it take to double GDP?
- If 1,000 dollars is invested at an annual rate of $0.1\%$, how long until the account reaches 1,100 dollars? This means solving $1000 \times (1.001)^x = 1100$.`,
        },
        {
          term: "Unknown as an exponent",
          text: r`All these questions involve solving equations of the form $a^x = b$ for $x$: the **unknown** $x$ occurs as an **exponent**. We need logarithms to solve them.`,
        },
        {
          term: "Natural logarithm",
          text: r`If $e^u = a$, we call $u$ the **natural logarithm** of $a$ and write $u = \ln(a) = \log_e(a)$.`,
        },
        {
          term: "Inverse relationship",
          text: r`Since $e^u = a$ and $u = \ln(a)$: $e^{\ln(a)} = a$ for any positive number $a$. Here $e = 2.718281828459\ldots$`,
        },
        {
          term: "Uniqueness",
          text: r`$e^u$ is a strictly increasing function of $u$, so $\ln(a)$ is uniquely determined by $e^{\ln(a)} = a$. Consequence: if $\ln A = \ln B$ then $A = B$.`,
        },
        {
          term: "Only positive arguments",
          text: r`$e^u > 0$ for every $u$, so $\ln(a)$ is defined only for $a > 0$: $\ln(-3)$ and $\ln(0)$ do not exist.`,
        },
        {
          term: "Rules for ln",
          text: r`For positive $x$ and $y$:
- (1) $\ln(xy) = \ln(x) + \ln(y)$
- (2) $\ln\!\left(\frac{x}{y}\right) = \ln(x) - \ln(y)$
- (3) $\ln x^p = p\ln(x)$
- (4) $\ln(1) = 0$, $\ln(e) = 1$`,
        },
        {
          term: "No rule for sums",
          text: r`There are **no** simple formulas for $\ln(x + y)$ or $\ln(x - y)$. In particular $\ln(x + y) \ne \ln x + \ln y$.`,
        },
        {
          term: "Solving aˣ = b",
          text: r`Take $\ln$ of both sides and use rule (3): $x\ln a = \ln b$, so $x = \dfrac{\ln b}{\ln a}$.`,
        },
        {
          term: "Solving equations with ln",
          text: r`Use rules (1)–(3) to collect each side into a single logarithm, then use uniqueness ($\ln A = \ln B \Rightarrow A = B$) or exponentiate. **Always check** each answer makes every $\ln$ argument positive and reject any that do not.`,
        },
      ],
      formulas: [
        { name: "Definition of ln", tex: r`e^u = a \iff u = \ln a\quad (a > 0),\qquad e^{\ln a} = a` },
        { name: "Product rule", tex: r`\ln(xy) = \ln x + \ln y` },
        { name: "Quotient rule", tex: r`\ln\frac{x}{y} = \ln x - \ln y` },
        { name: "Power rule", tex: r`\ln x^p = p\ln x` },
        { name: "Special values", tex: r`\ln 1 = 0,\qquad \ln e = 1` },
        { name: "Solving an exponential equation", tex: r`a^x = b \iff x = \frac{\ln b}{\ln a}` },
      ],
      figures: [
        {
          title: "eˣ and ln x: mirror images in y = x",
          xr: [-3, 5],
          yr: [-3, 5],
          curves: [
            { f: "exp(x)", label: "eˣ" },
            { f: "ln(x)", label: "ln x", tone: 1 },
            { f: "x", label: "y = x", dashed: true, tone: 3 },
          ],
          points: [
            { at: [0, 1], label: "(0, 1)" },
            { at: [1, 0], label: "(1, 0)", tone: 1 },
          ],
          caption: "u = ln a exactly when eᵘ = a, so swapping the roles of x and y turns one graph into the other: they are reflections in y = x. eˣ is always positive, so ln x exists only for x > 0.",
        },
        {
          title: "y = ln x",
          xr: [-0.5, 8],
          yr: [-3, 2.5],
          curves: [{ f: "ln(x)", label: "ln x", from: 0.04 }],
          points: [
            { at: [1, 0], label: "ln 1 = 0", guides: true },
            { at: [2.71828, 1], label: "ln e = 1", guides: true },
          ],
          caption: "Strictly increasing, negative for 0 < x < 1, zero at x = 1, equal to 1 at x = e ≈ 2.718. No graph for x ≤ 0.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 3 exercise",
          problem: r`Evaluate (a) $\ln(1)$, (b) $\ln(-3)$, (c) $\ln(e)$.`,
          solution: r`(a) $e^0 = 1$, so $\ln 1 = 0$.
(b) $e^u > 0$ for every $u$, so no $u$ gives $e^u = -3$: $\ln(-3)$ is **undefined**.
(c) $e^1 = e$, so $\ln e = 1$.`,
        },
        {
          source: "Lecture Note 3 exercise",
          problem: r`Expand $\ln\!\left(\dfrac{a + b}{\sqrt{c}}\right)$ (with $a + b > 0$, $c > 0$).`,
          solution: r`Quotient rule: $\ln(a + b) - \ln\sqrt{c}$. Power rule with $\sqrt{c} = c^{1/2}$: $\ln(a + b) - \frac{1}{2}\ln c$.
$\ln(a + b)$ cannot be split further: there is no rule for the log of a sum.`,
        },
        {
          source: "Lecture Note 3, 3.8",
          problem: r`If 1,000 dollars is invested at $0.1\%$ per year, how long until the account reaches 1,100 dollars? How long does GDP take to double at $3\%$ growth per year?`,
          solution: r`$1000(1.001)^x = 1100 \Rightarrow (1.001)^x = 1.1 \Rightarrow x = \dfrac{\ln 1.1}{\ln 1.001} \approx 95.36$ years.
$(1.03)^t = 2 \Rightarrow t = \dfrac{\ln 2}{\ln 1.03} \approx 23.45$ years.`,
        },
        {
          source: "Assignment 4 Q2",
          problem: r`(a) Express $\ln\!\left(a^{-1/3}b^3e^2\right)$ in terms of $\ln a$ and $\ln b$. (b) Write $2\ln x - 0.5\ln y - \ln 1$ as a single logarithm.`,
          solution: r`(a) Product rule then power rule: $\ln a^{-1/3} + \ln b^3 + \ln e^2 = -\frac{1}{3}\ln a + 3\ln b + 2\ln e = -\frac{1}{3}\ln a + 3\ln b + 2$.
(b) $\ln 1 = 0$. Power rule: $2\ln x = \ln x^2$ and $0.5\ln y = \ln y^{1/2} = \ln\sqrt{y}$. Quotient rule: $\ln x^2 - \ln\sqrt{y} = \ln\dfrac{x^2}{\sqrt{y}}$.`,
        },
        {
          source: "Assignment 4 Q3(a)–(c)",
          problem: r`(a) If $y = 6e^{4x}$, express $x$ in terms of $y$ using natural logarithms. (b) Solve $2\ln x + \ln 3 = \ln 75$. (c) Solve $\ln(x^2 - 10) - \ln x = 2\ln 3$.`,
          solution: r`(a) $e^{4x} = \dfrac{y}{6} \Rightarrow 4x = \ln\dfrac{y}{6} \Rightarrow x = \dfrac{1}{4}\ln\dfrac{y}{6} = \dfrac{1}{4}(\ln y - \ln 6)$ (for $y > 0$).
(b) Left side $= \ln x^2 + \ln 3 = \ln(3x^2)$. So $3x^2 = 75$, $x^2 = 25$, $x = \pm 5$. $\ln x$ needs $x > 0$, so $x = 5$.
(c) Left side $= \ln\dfrac{x^2 - 10}{x}$, right side $= \ln 9$. So $\dfrac{x^2 - 10}{x} = 9 \Rightarrow x^2 - 9x - 10 = 0 \Rightarrow (x - 10)(x + 1) = 0$. $x = -1$ is rejected ($\ln(-1)$ undefined); $x = 10$ works ($x^2 - 10 = 90 > 0$). So $x = 10$.`,
        },
        {
          source: "Assignment 4 Q3(d)",
          problem: r`Solve $3^{x+1} = 3^{2x-1} + 6$.`,
          solution: r`Let $u = 3^x > 0$. Then $3^{x+1} = 3u$ and $3^{2x-1} = \dfrac{(3^x)^2}{3} = \dfrac{u^2}{3}$.
$3u = \dfrac{u^2}{3} + 6 \Rightarrow 9u = u^2 + 18 \Rightarrow u^2 - 9u + 18 = 0 \Rightarrow (u - 3)(u - 6) = 0$.
$3^x = 3 \Rightarrow x = 1$; $3^x = 6 \Rightarrow x = \dfrac{\ln 6}{\ln 3} \approx 1.631$.
Check $x = 1$: $9 = 3 + 6$ ✓. Check $3^x = 6$: $3^{x+1} = 18$, $3^{2x-1} = 36/3 = 12$, $12 + 6 = 18$ ✓.`,
        },
        {
          source: "Assignment 4 Q3(e)",
          problem: r`Solve $\dfrac{2 - \ln(x^7)}{7 - \ln(x^2)} = -[\ln(x)]^2$.`,
          solution: r`Power rule: $\ln x^7 = 7\ln x$, $\ln x^2 = 2\ln x$ (for $x > 0$). Let $u = \ln x$:
$$\frac{2 - 7u}{7 - 2u} = -u^2 \Rightarrow 2 - 7u = -7u^2 + 2u^3 \Rightarrow 2u^3 - 7u^2 + 7u - 2 = 0.$$
$u = 1$ is a root ($2 - 7 + 7 - 2 = 0$), so $(u - 1)(2u^2 - 5u + 2) = 0 \Rightarrow (u - 1)(2u - 1)(u - 2) = 0$.
$u = 1, \tfrac{1}{2}, 2$ (none makes $7 - 2u = 0$), so $x = e$, $x = e^{1/2} = \sqrt{e}$, $x = e^2$.`,
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "functions-c1", type: "concept", front: r`In $y = f(x)$, the variable $y$, whose value depends on the other variable`, back: "dependent variable", why: r`$y$ depends on $x$; $x$ is the independent variable (the argument of $f$).` },
    { id: "functions-c2", type: "concept", front: r`In $y = f(x)$, the variable $x$, also called the argument of $f$`, back: "independent variable", why: "Its value is chosen freely within the domain; the function then determines y." },
    { id: "functions-c3", type: "concept", front: r`The set of all possible values that $x$ can take in a given context`, back: "domain", why: "E.g. the domain of 1/(x + 1) is all x ≠ −1; for a cost function C(x), output x ≥ 0." },
    { id: "functions-c4", type: "concept", front: r`The value $f(x)$ into which an $x$ value is mapped`, back: "image", why: "The set of all images is the range." },
    { id: "functions-c5", type: "concept", front: r`The set of all values $f(x)$ as $x$ varies over the entire domain`, back: "range", why: r`E.g. $h(x) = 1 - \sqrt{x+1}$ has range $(-\infty, 1]$.` },
    { id: "functions-c6", type: "concept", front: r`A function for which $x_1 < x_2$ implies $f(x_1) < f(x_2)$`, back: "strictly increasing", why: r`With $\le$ instead of $<$ the function is (weakly) increasing.` },
    { id: "functions-c7", type: "concept", front: r`The name of the graph of $f(x) = ax^2 + bx + c$, $a \ne 0$`, back: "parabola", why: "U-shaped if a > 0 (minimum), upside-down if a < 0 (maximum)." },
    { id: "functions-c8", type: "concept", front: "The curve showing that tax revenue first rises and then falls as the tax rate rises from 0 to 100%", back: "Laffer curve", why: "Tax revenue = f(tax rate) is a non-linear relationship; revenue is maximised at some rate a and is zero at 100%." },
    { id: "functions-c9", type: "concept", front: r`In the consumption function $C = a + bY$, the slope $b$`, back: "marginal propensity to consume", why: "The extra consumption from one extra unit of income (MPC). The constant a is autonomous consumption." },
    { id: "functions-c10", type: "concept", front: r`In $C = a + bY$, the constant $a$ (consumption when income is zero)`, back: "autonomous consumption", why: "It is the intercept of the consumption line." },
    { id: "functions-c11", type: "concept", front: r`The number $u$ such that $e^u = a$ (for $a > 0$)`, back: "natural logarithm", why: r`Written $u = \ln a = \log_e a$, so $e^{\ln a} = a$.` },

    // formula
    { id: "functions-c12", type: "formula", front: "Slope of the line through two distinct points", back: r`$a = \dfrac{y_2 - y_1}{x_2 - x_1}$, $x_2 \ne x_1$`, why: "Rise over run. Use it first whenever you are given two points on a line." },
    { id: "functions-c13", type: "formula", front: r`Equation of the line through $(x_1, y_1)$ with slope $a$`, back: r`$y - y_1 = a(x - x_1)$`, why: "Point–slope form: after finding the slope, plug in one point and rearrange to y = ax + b." },
    { id: "functions-c14", type: "formula", front: "Completed-square form of a quadratic", back: r`$ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}$`, why: "Shows the vertex at x = −b/2a; a minimum if a > 0, a maximum if a < 0." },
    { id: "functions-c15", type: "formula", front: "Vertex (max or min point) of a quadratic", back: r`$x = -\dfrac{b}{2a}$, value $\dfrac{4ac - b^2}{4a}$`, why: "Minimum if a > 0, maximum if a < 0. You can also just substitute x = −b/2a into f." },
    { id: "functions-c16", type: "formula", front: "General polynomial of degree n", back: r`$p(x) = a_n x^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0$, $a_n \ne 0$`, why: "n = 1 linear, n = 2 quadratic, n = 3 cubic." },
    { id: "functions-c17", type: "formula", front: "Power function", back: r`$f(x) = Ax^r$, $x > 0$`, why: "The variable is the base; the exponent r is fixed. x > 0 because e.g. x^0.5 is undefined for x < 0 and 0^r is undefined for r < 0." },
    { id: "functions-c18", type: "formula", front: "Exponential function", back: r`$f(t) = Aa^t = f(0)a^t$, $a, A > 0$`, why: "Increasing if a > 1, decreasing if 0 < a < 1. A is the starting value f(0)." },
    { id: "functions-c19", type: "formula", front: "Growth factor for p% growth per period", back: r`$a = 1 + \dfrac{p}{100}$ (a fall of $p\%$: $a = 1 - \dfrac{p}{100}$)`, why: "E.g. 1.8% growth gives a = 1.018; −0.6% gives a = 0.994." },
    { id: "functions-c20", type: "formula", front: "Definition of the natural logarithm", back: r`$e^u = a \iff u = \ln a$; $e^{\ln a} = a$ for $a > 0$`, why: "ln undoes the exponential. Because eᵘ > 0 always, ln a exists only for a > 0." },
    { id: "functions-c21", type: "formula", front: "Product and quotient rules for ln", back: r`$\ln(xy) = \ln x + \ln y$; $\ln\frac{x}{y} = \ln x - \ln y$`, why: "x, y > 0. Note there is NO rule for ln(x + y) or ln(x − y)." },
    { id: "functions-c22", type: "formula", front: "Power rule for ln, and ln of 1 and e", back: r`$\ln x^p = p\ln x$; $\ln 1 = 0$, $\ln e = 1$`, why: "The power rule brings an unknown exponent down so you can solve for it." },
    { id: "functions-c23", type: "formula", front: r`Savings function from $C = a + bY$ (closed economy, no government)`, back: r`$S = Y - C = -a + (1 - b)Y$`, why: "MPS = 1 − b, so MPC + MPS = 1." },

    // method
    { id: "functions-c24", type: "method", front: "How do you find the domain of a function given by a formula?", back: "Start with all real x; remove values that make a denominator 0, a square root's inside negative (or ≤ 0 if the root is in a denominator) or a log's argument ≤ 0.", why: r`- $\dfrac{1}{x+1}$: $x \ne -1$.
- $\sqrt{x}$: $x \ge 0$.
- $\dfrac{1}{\sqrt{1-x}}$: $1 - x > 0$, so $x < 1$.
- $\ln g(x)$: $g(x) > 0$.
- Economic context: output, units, workers $\ge 0$.` },
    { id: "functions-c25", type: "method", front: r`Find the domain and range of $h(x) = 1 - \sqrt{x+1}$.`, back: r`Domain $x \ge -1$; range $(-\infty, 1]$.`, why: r`Domain: $x + 1 \ge 0 \Rightarrow x \ge -1$.
Range: build up: $\sqrt{x+1}$ takes all values in $[0, \infty)$, so $1 - \sqrt{x+1}$ takes all values $\le 1$.` },
    { id: "functions-c26", type: "method", front: r`Find the domain and range of $h(x) = \pi^{1/\sqrt{25-x}}$.`, back: r`Domain $x < 25$; range $(1, \infty)$.`, why: r`Root in a denominator: $25 - x > 0$, so $x < 25$.
The exponent $u = 1/\sqrt{25-x}$ takes every value in $(0, \infty)$.
$\pi > 1$, so $\pi^u$ is increasing: it tends to $1$ as $u \to 0^+$ (never reaching it) and grows without bound. Range $(1, \infty)$.` },
    { id: "functions-c27", type: "method", front: r`Find the domain and range of $f(x) = \dfrac{1}{\sqrt{1-x}}$.`, back: r`Domain $x < 1$; range $(0, \infty)$.`, why: r`$1 - x > 0$ strictly (cannot divide by $\sqrt{0}$). $\sqrt{1-x}$ takes all values in $(0, \infty)$, and so does its reciprocal.` },
    { id: "functions-c28", type: "method", front: r`$C(x) = 2x^2 - x + 25$. Find the average variable cost and average fixed cost at $x = 2$.`, back: "AVC = 2x − 1 = 3; AFC = 25/x = 12.5.", why: r`Fixed cost = constant term $25$; variable cost $= 2x^2 - x$.
$AVC = (2x^2 - x)/x = 2x - 1 = 3$ at $x = 2$.
$AFC = 25/x = 12.5$ at $x = 2$.` },
    { id: "functions-c29", type: "method", front: r`$C(x) = 200 + 10x$: domain, range, cost of 10 units and marginal cost?`, back: "Domain x ≥ 0, range C ≥ 200, C(10) = 300, MC = 10.", why: r`Output cannot be negative, so $x \ge 0$; $C$ is increasing so its smallest value is $C(0) = 200$.
$C(10) = 200 + 100 = 300$.
Linear with slope $10$: each extra unit adds $10$ to cost, so MC $= 10$.` },
    { id: "functions-c30", type: "method", front: r`$C = 500 + 0.7Y$ in a closed economy with no government. Find the MPC, the savings function and the MPS.`, back: r`MPC $= 0.7$; $S = -500 + 0.3Y$; MPS $= 0.3$.`, why: r`MPC = slope of $C$ = $0.7$.
Income is consumed or saved: $S = Y - C = Y - 500 - 0.7Y = -500 + 0.3Y$.
MPS = slope of $S$ = $0.3$: each extra dollar of income adds $0.30$ to savings. MPC + MPS $= 1$ because each extra dollar is either consumed or saved.` },
    { id: "functions-c31", type: "method", front: "How do you find the equation of a straight line through two points?", back: "Slope a = (y₂ − y₁)/(x₂ − x₁), then y − y₁ = a(x − x₁) and rearrange.", why: r`E.g. $(2, 5)$ and $(6, 13)$: $a = 8/4 = 2$; $y - 5 = 2(x - 2)$, so $y = 2x + 1$. Check the second point: $2(6) + 1 = 13$.` },
    { id: "functions-c32", type: "method", front: "How do you find the maximum or minimum of a quadratic and where it occurs?", back: "Vertex at x = −b/2a; substitute to get the value. a > 0 gives a minimum, a < 0 a maximum.", why: r`E.g. $f(x) = -2x^2 + 12x - 10$: $x = -12/(2 \cdot -2) = 3$, $f(3) = -18 + 36 - 10 = 8$. $a < 0$, so the maximum is $8$ at $x = 3$, i.e. $f(x) = -2(x - 3)^2 + 8$.` },
    { id: "functions-c33", type: "method", front: "Population falls 0.6% per year. How many years to go from 126.5 million to below 100 million?", back: "Solve 126.5(0.994)ᵗ = 100: t ≈ 39.06, so 40 years.", why: r`Factor $a = 0.994$. $(0.994)^t = 100/126.5$.
$t = \dfrac{\ln(100/126.5)}{\ln 0.994} = \dfrac{-0.23507}{-0.0060181} \approx 39.06$.
After 39 years it is still $\approx 100.04$ million, so it takes **40** whole years to get below 100 million.` },
    { id: "functions-c34", type: "method", front: "100,000 dollars grows at 20% a year for 50 years. Final value?", back: r`$100{,}000(1.2)^{50} \approx 910{,}043{,}815$ dollars.`, why: r`Exponential growth with $A = 100{,}000$ and $a = 1.2$: $f(t) = A a^t$, so $f(50) = 100{,}000 \times 1.2^{50} \approx 100{,}000 \times 9100.44$.` },
    { id: "functions-c35", type: "method", front: r`How do you solve $Aa^t = B$ for $t$? (e.g. $5.9(1.018)^t = 6.9$)`, back: "Divide by A, take ln of both sides, use the power rule: t = ln(B/A)/ln a. Here t ≈ 8.78 years.", why: r`$(1.018)^t = 6.9/5.9$.
$t\ln 1.018 = \ln(6.9/5.9)$.
$t = \dfrac{\ln(6.9/5.9)}{\ln 1.018} = \dfrac{0.15657}{0.01784} \approx 8.78$.` },
    { id: "functions-c36", type: "method", front: r`Expand $\ln\!\left(a^{-1/3}b^3e^2\right)$ in terms of $\ln a$ and $\ln b$.`, back: r`$-\frac{1}{3}\ln a + 3\ln b + 2$`, why: r`Product rule: $\ln a^{-1/3} + \ln b^3 + \ln e^2$.
Power rule: $-\frac{1}{3}\ln a + 3\ln b + 2\ln e$, and $\ln e = 1$.` },
    { id: "functions-c37", type: "method", front: r`Write $2\ln x - 0.5\ln y - \ln 1$ as a single logarithm.`, back: r`$\ln\dfrac{x^2}{\sqrt{y}}$`, why: r`$\ln 1 = 0$. Power rule: $2\ln x = \ln x^2$, $0.5\ln y = \ln\sqrt{y}$. Quotient rule: $\ln x^2 - \ln\sqrt{y} = \ln(x^2/\sqrt{y})$.` },
    { id: "functions-c38", type: "method", front: r`Make $x$ the subject of $y = 6e^{4x}$.`, back: r`$x = \frac{1}{4}\ln\frac{y}{6}$`, why: r`Divide by 6: $e^{4x} = y/6$. Take ln (definition of ln): $4x = \ln(y/6)$. Divide by 4: $x = \frac{1}{4}(\ln y - \ln 6)$.` },
    { id: "functions-c39", type: "method", front: r`Solve $2\ln x + \ln 3 = \ln 75$.`, back: r`$x = 5$`, why: r`Combine: $\ln x^2 + \ln 3 = \ln(3x^2)$. Uniqueness of ln: $3x^2 = 75$, $x^2 = 25$, $x = \pm 5$. Reject $x = -5$ because $\ln(-5)$ is undefined.` },
    { id: "functions-c40", type: "method", front: r`Solve $\ln(x^2 - 10) - \ln x = 2\ln 3$.`, back: r`$x = 10$ (reject $x = -1$).`, why: r`Quotient and power rules: $\ln\dfrac{x^2 - 10}{x} = \ln 9$, so $x^2 - 10 = 9x$, $x^2 - 9x - 10 = 0$, $(x - 10)(x + 1) = 0$. $x = -1$ makes $\ln x$ undefined; $x = 10$ gives positive arguments.` },
    { id: "functions-c41", type: "method", front: r`Solve $3^{x+1} = 3^{2x-1} + 6$.`, back: r`Let $u = 3^x$: $u^2 - 9u + 18 = 0$, so $x = 1$ or $x = \frac{\ln 6}{\ln 3} \approx 1.631$.`, why: r`$3^{x+1} = 3u$ and $3^{2x-1} = u^2/3$.
$3u = u^2/3 + 6 \Rightarrow u^2 - 9u + 18 = 0 \Rightarrow u = 3$ or $u = 6$.
$3^x = 3 \Rightarrow x = 1$; $3^x = 6 \Rightarrow x\ln 3 = \ln 6$.` },
    { id: "functions-c42", type: "method", front: r`Solve $\dfrac{2 - \ln(x^7)}{7 - \ln(x^2)} = -[\ln x]^2$.`, back: r`Let $u = \ln x$: $(u - 1)(2u - 1)(u - 2) = 0$, so $x = e, \sqrt{e}, e^2$.`, why: r`Power rule: $\dfrac{2 - 7u}{7 - 2u} = -u^2$.
Cross-multiply: $2 - 7u = -7u^2 + 2u^3$, so $2u^3 - 7u^2 + 7u - 2 = 0$.
$u = 1$ is a root; dividing gives $2u^2 - 5u + 2 = (2u - 1)(u - 2)$.
$u = 1, \tfrac12, 2 \Rightarrow x = e^u$.` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 3.1
    {
      id: "functions-q1", kind: "mcq", sub: "Introduction",
      prompt: r`Monthly labour cost $= 2000 \times L$, where $L$ is the number of workers. Which statement is correct?`,
      options: [
        r`Labour cost is the dependent variable and $L$ is the independent variable: Labour cost $= f(L)$.`,
        r`$L$ is the dependent variable: $L = f(\text{Labour cost})$.`,
        r`Both are independent variables.`,
        r`Labour cost is the independent variable because it is measured in dollars.`,
      ],
      answer: 0,
      explain: "The cost depends on how many workers are hired, so cost is the dependent variable and L is the independent variable (the argument).",
    },
    {
      id: "functions-q2", kind: "mcq", sub: "Introduction",
      prompt: "The Laffer curve describes the relationship between tax revenue and the tax rate as…",
      options: [
        "linear and increasing: a higher rate always raises revenue",
        "non-linear: revenue rises up to some rate a, then falls to zero at a 100% rate",
        "linear and decreasing",
        "constant: revenue does not depend on the rate",
      ],
      answer: 1,
      explain: "Tax revenue = f(tax rate) is non-linear: it increases up to a maximum at rate a and then decreases, reaching zero at 100%.",
    },
    // 3.2
    {
      id: "functions-q3", kind: "mcq", sub: "Domain and range",
      prompt: r`Why is $y = x^2$ a function even though $y = 25$ comes from both $x = 5$ and $x = -5$?`,
      options: [
        r`It is not a function for that reason.`,
        r`Because each $x$ determines exactly one $y$; several $x$ values may share the same $y$.`,
        r`Because each $y$ determines exactly one $x$.`,
        r`Because its domain is $x \ge 0$ only.`,
      ],
      answer: 1,
      explain: "A function must assign a unique y to each x. The converse is not required, so two x values with the same image are allowed.",
    },
    {
      id: "functions-q4", kind: "mcq", sub: "Domain and range",
      prompt: r`What is the domain of $f(x) = \dfrac{1}{x + 1}$?`,
      options: [r`All real $x \ne -1$`, r`$x > -1$`, r`All real $x \ne 1$`, r`$x \ge 0$`],
      answer: 0,
      explain: r`Only division by zero is a problem: $x + 1 \ne 0$, i.e. $x \ne -1$. Negative values such as $x = -3$ are fine ($f(-3) = -\tfrac12$).`,
    },
    {
      id: "functions-q5", kind: "mcq", sub: "Domain and range",
      prompt: r`What is the domain of $h(x) = \sqrt{x}$?`,
      options: [r`$x > 0$`, r`$x \ge 0$`, r`All real $x$`, r`$x \ne 0$`],
      answer: 1,
      explain: r`The square root needs a non-negative argument, and $\sqrt{0} = 0$ is fine: $x \ge 0$.`,
    },
    {
      id: "functions-q6", kind: "fill", sub: "Domain and range",
      prompt: r`The cost of producing $x$ units is $C(x) = 200 + 10x$. The cost of producing 10 units is ____ and the marginal cost is ____.`,
      answers: [["300"], ["10"]],
      explain: r`$C(10) = 200 + 10(10) = 300$. $C$ is linear with slope $10$, so each extra unit costs $10$: MC $= 10$.`,
    },
    {
      id: "functions-q7", kind: "mcq", sub: "Domain and range",
      prompt: r`What is the range of $h(x) = 1 - \sqrt{x + 1}$?`,
      options: [r`$[1, \infty)$`, r`$(-\infty, 1]$`, r`$[-1, \infty)$`, r`$(-\infty, 1)$`],
      answer: 1,
      explain: r`Domain $x \ge -1$. Then $\sqrt{x+1}$ takes all values in $[0, \infty)$, so $1 - \sqrt{x+1}$ takes all values $\le 1$ (equal to $1$ at $x = -1$). $[-1, \infty)$ is the domain, not the range.`,
    },
    {
      id: "functions-q8", kind: "mcq", sub: "Domain and range",
      prompt: r`What is the range of $h(x) = \pi^{1/\sqrt{25 - x}}$ (the exponent is $\frac{1}{\sqrt{25-x}}$)?`,
      options: [r`$(0, \infty)$`, r`$[1, \infty)$`, r`$(1, \infty)$`, r`$(0, 1)$`],
      answer: 2,
      explain: r`Domain $x < 25$. The exponent $u = 1/\sqrt{25-x}$ takes every value in $(0, \infty)$ but never $0$. Since $\pi > 1$, $\pi^u > \pi^0 = 1$ and grows without bound: range $(1, \infty)$, with $1$ itself not reached.`,
    },
    {
      id: "functions-q9", kind: "mcq", sub: "Domain and range",
      prompt: r`Domain and range of $f(x) = \dfrac{1}{\sqrt{1 - x}}$?`,
      options: [
        r`Domain $x \le 1$, range $[0, \infty)$`,
        r`Domain $x < 1$, range $(0, \infty)$`,
        r`Domain $x > 1$, range $(0, \infty)$`,
        r`Domain $x < 1$, range $[1, \infty)$`,
      ],
      answer: 1,
      explain: r`The root is in the denominator, so $1 - x > 0$ strictly: $x < 1$. $\sqrt{1-x}$ takes all values in $(0, \infty)$ and so does its reciprocal; it is never $0$. (It is less than 1 when $x < 0$, e.g. $f(-3) = \tfrac12$.)`,
    },
    {
      id: "functions-q10", kind: "fill", sub: "Domain and range",
      prompt: r`A total cost function is $C(x) = 2x^2 - x + 25$. At $x = 2$ the average variable cost is ____ and the average fixed cost is ____.`,
      answers: [["3"], ["12.5", "25/2"]],
      explain: r`Variable cost $2x^2 - x$, fixed cost $25$. $AVC = 2x - 1 = 3$; $AFC = 25/2 = 12.5$.`,
    },
    {
      id: "functions-q11", kind: "mcq", sub: "Domain and range",
      prompt: r`A function $f$ is called (weakly) **increasing** if $x_1 < x_2$ implies…`,
      options: [r`$f(x_1) \le f(x_2)$`, r`$f(x_1) \ge f(x_2)$`, r`$f(x_1) > f(x_2)$`, r`$f(x_1) = f(x_2)$`],
      answer: 0,
      explain: r`Increasing: $f(x_1) \le f(x_2)$. Strictly increasing uses $<$. The $\ge$ and $>$ versions define decreasing and strictly decreasing.`,
    },
    // 3.3
    {
      id: "functions-q12", kind: "mcq", sub: "Linear functions",
      prompt: r`In the linear function $y = ax + b$, what does $a$ measure?`,
      options: [
        r`The height of the line when $x = 0$`,
        r`The change in $y$ when $x$ increases by 1 unit`,
        r`The value of $x$ where the line meets the $x$-axis`,
        r`The value of $y$ when $x = 1$`,
      ],
      answer: 1,
      explain: r`$a$ is the slope: $f(x + 1) - f(x) = a$. The height at $x = 0$ is the intercept $b$; the $x$-axis crossing is $-b/a$.`,
    },
    {
      id: "functions-q13", kind: "fill", sub: "Linear functions",
      prompt: r`The straight line through $(2, 5)$ and $(6, 13)$ has slope ____ and intercept ____.`,
      answers: [["2"], ["1"]],
      explain: r`Slope $= \dfrac{13 - 5}{6 - 2} = 2$. $y - 5 = 2(x - 2) \Rightarrow y = 2x + 1$, so the intercept is $1$.`,
    },
    {
      id: "functions-q14", kind: "fill", sub: "Linear functions",
      prompt: r`The line $y = -0.5x + 4$ crosses the $x$-axis at $x =$ ____.`,
      answers: [["8"]],
      explain: r`$x = -\dfrac{b}{a} = -\dfrac{4}{-0.5} = 8$. Check: $-0.5(8) + 4 = 0$.`,
    },
    {
      id: "functions-q15", kind: "mcq", sub: "Linear functions",
      prompt: "Which is the general linear demand function from the notes (with positive parameters)?",
      options: [r`$D = a - bP$, $a, b > 0$`, r`$D = a + bP$, $a, b > 0$`, r`$D = -a + bP$, $a, b > 0$`, r`$D = aP^b$`],
      answer: 0,
      explain: r`Demand falls as price rises, so its slope $-b$ is negative. The general supply function is $S = \alpha + \beta P$ with $\alpha, \beta > 0$ (upward sloping).`,
    },
    {
      id: "functions-q16", kind: "fill", sub: "Consumption and savings",
      prompt: r`With $C = 500 + 0.7Y$ (closed economy, no government), the MPC is ____ and the marginal propensity to save is ____.`,
      answers: [["0.7", "7/10"], ["0.3", "3/10"]],
      explain: r`MPC = slope of $C$ = $0.7$. $S = Y - C = -500 + 0.3Y$, so MPS $= 0.3$. They sum to $1$.`,
    },
    {
      id: "functions-q17", kind: "mcq", sub: "Consumption and savings",
      prompt: r`If $C = 500 + 0.7Y$ and income is either consumed or saved, the savings function is…`,
      options: [r`$S = 500 + 0.3Y$`, r`$S = -500 + 0.3Y$`, r`$S = -500 - 0.7Y$`, r`$S = 500 - 0.3Y$`],
      answer: 1,
      explain: r`$S = Y - C = Y - 500 - 0.7Y = -500 + 0.3Y$. The intercept is negative: at zero income households dissave $500$ to fund autonomous consumption.`,
    },
    {
      id: "functions-q18", kind: "mcq", sub: "Consumption and savings",
      prompt: r`In $S = -500 + 0.3Y$, the slope $0.3$ means…`,
      options: [
        "savings are 30% of total income at every income level",
        "each extra dollar of income raises savings by 0.30 dollars",
        "each extra dollar of savings raises income by 0.30 dollars",
        "consumption is 0.3 times income",
      ],
      answer: 1,
      explain: r`The slope is the marginal propensity to save: the change in $S$ when $Y$ rises by 1. It is not the average share (because of the $-500$ intercept, $S/Y \ne 0.3$).`,
    },
    {
      id: "functions-q19", kind: "fill", sub: "Linear functions",
      prompt: r`Supply is $S = 10 + 2P$ and demand is $D = 100 - P$. They are equal at $P =$ ____, where the quantity is ____.`,
      answers: [["30"], ["70"]],
      explain: r`$10 + 2P = 100 - P \Rightarrow 3P = 90 \Rightarrow P = 30$. Quantity $= 10 + 60 = 70$ (and $100 - 30 = 70$).`,
    },
    // 3.4
    {
      id: "functions-q20", kind: "mcq", sub: "Quadratic functions",
      prompt: r`Which is the completed-square form of $ax^2 + bx + c$?`,
      options: [
        r`$a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}$`,
        r`$a\left(x - \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}$`,
        r`$a\left(x + \frac{b}{2a}\right)^2 + \frac{b^2 - 4ac}{4a}$`,
        r`$a\left(x + \frac{b}{a}\right)^2 - \frac{b^2 - 4ac}{2a}$`,
      ],
      answer: 0,
      explain: r`Expanding $a\left(x + \frac{b}{2a}\right)^2 = ax^2 + bx + \frac{b^2}{4a}$; subtracting $\frac{b^2 - 4ac}{4a} = \frac{b^2}{4a} - c$ leaves $ax^2 + bx + c$.`,
    },
    {
      id: "functions-q21", kind: "fill", sub: "Quadratic functions",
      prompt: r`$f(x) = x^2 - 4x + 3$ has its minimum at $x =$ ____, and the minimum value is ____.`,
      answers: [["2"], ["-1"]],
      explain: r`$x = -\frac{b}{2a} = \frac{4}{2} = 2$; $f(2) = 4 - 8 + 3 = -1$. Equivalently $f(x) = (x - 2)^2 - 1$.`,
    },
    {
      id: "functions-q22", kind: "mcq", sub: "Quadratic functions",
      prompt: r`For $f(x) = -2x^2 + 12x - 10$, which statement is true?`,
      options: [
        r`It has a minimum value of $8$ at $x = 3$.`,
        r`It has a maximum value of $8$ at $x = 3$.`,
        r`It has a maximum value of $-10$ at $x = 0$.`,
        r`It has a maximum value of $8$ at $x = -3$.`,
      ],
      answer: 1,
      explain: r`$a = -2 < 0$, so the parabola opens downwards and has a maximum at $x = -\frac{12}{2(-2)} = 3$: $f(3) = -18 + 36 - 10 = 8$.`,
    },
    {
      id: "functions-q23", kind: "fill", sub: "Quadratic functions",
      prompt: r`The roots of $x^2 - 6x + 5 = 0$ are $x =$ ____ (smaller) and $x =$ ____ (larger).`,
      answers: [["1"], ["5"]],
      explain: r`$x^2 - 6x + 5 = (x - 1)(x - 5)$. Or complete the square: $(x - 3)^2 - 4 = 0 \Rightarrow x - 3 = \pm 2$.`,
    },
    // 3.5
    {
      id: "functions-q24", kind: "mcq", sub: "Polynomials",
      prompt: r`What is the degree of $p(x) = 4x^5 - 3x^2 + 7$?`,
      options: ["5", "3", "2", "7"],
      answer: 0,
      explain: r`The degree is the highest power with a nonzero coefficient: $x^5$ (coefficient $a_5 = 4$). $7$ is the constant term $a_0$.`,
    },
    {
      id: "functions-q25", kind: "mcq", sub: "Polynomials",
      prompt: "Which economic function is given in the notes as an example of a cubic function?",
      options: ["The cost function", "The linear demand function", "The consumption function", "The Laffer curve"],
      answer: 0,
      explain: "Cubic functions are less common in economic models; the cost function C(Q) is the standard example. Consumption and demand are linear; the Laffer curve is the quadratic example.",
    },
    // 3.6
    {
      id: "functions-q26", kind: "mcq", sub: "Power functions",
      prompt: r`Why is the power function $f(x) = Ax^r$ defined only for $x > 0$?`,
      options: [
        r`Because $A$ must be positive`,
        r`Because for values like $r = 0.5$, $x^r$ is undefined for negative $x$, and $0^r$ is undefined if $r < 0$`,
        r`Because power functions are always increasing`,
        r`Because $x^r$ is negative when $x$ is negative`,
      ],
      answer: 1,
      explain: r`$(-4)^{0.5} = \sqrt{-4}$ does not exist, and $0^{-1} = 1/0$ is undefined. For $r > 0$, $x = 0$ could be included.`,
    },
    {
      id: "functions-q27", kind: "mcq", sub: "Power functions",
      prompt: r`For $y = x^r$ with $r < 0$, the graph…`,
      options: [
        r`passes through $(0, 0)$ and is increasing`,
        r`passes through $(1, 1)$ and is decreasing`,
        r`passes through $(0, 1)$ and is decreasing`,
        r`is a straight line through $(1, 1)$`,
      ],
      answer: 1,
      explain: r`$1^r = 1$ for every $r$, so the graph passes through $(1, 1)$. With $r < 0$, e.g. $y = 1/x$, it falls as $x$ increases and is undefined at $x = 0$.`,
    },
    {
      id: "functions-q28", kind: "mcq", sub: "Power functions",
      prompt: "Which of these is an exponential function (not a power function)?",
      options: [r`$f(x) = x^3$`, r`$f(x) = 5x^{0.5}$`, r`$f(x) = 3 \cdot 2^x$`, r`$f(x) = x^{-2}$`],
      answer: 2,
      explain: r`In $3 \cdot 2^x$ the base is fixed and the variable is the exponent: exponential ($A = 3$, $a = 2$). The others have the variable in the base with a fixed exponent: power functions.`,
    },
    // 3.7
    {
      id: "functions-q29", kind: "mcq", sub: "Exponential functions",
      prompt: r`For $f(t) = 5(0.8)^t$, which statement is correct?`,
      options: [
        r`$f$ is increasing and $f(0) = 5$`,
        r`$f$ is decreasing and $f(0) = 5$`,
        r`$f$ is decreasing and $f(0) = 4$`,
        r`$f$ is decreasing and becomes negative for large $t$`,
      ],
      answer: 1,
      explain: r`$0 < a = 0.8 < 1$, so $f$ is decreasing (falls by $20\%$ per period). $f(0) = 5 \cdot 0.8^0 = 5$. It stays positive, approaching $0$.`,
    },
    {
      id: "functions-q30", kind: "fill", sub: "Exponential functions",
      prompt: r`Singapore's population grows $1.8\%$ a year. Growing from 5.9 million to 6.9 million takes about ____ years (1 decimal place).`,
      answers: [["8.8", "8.78"]],
      explain: r`$5.9(1.018)^t = 6.9 \Rightarrow t = \dfrac{\ln(6.9/5.9)}{\ln 1.018} = \dfrac{0.15657}{0.01784} \approx 8.78 \approx 8.8$ years.`,
    },
    {
      id: "functions-q31", kind: "fill", sub: "Exponential functions",
      prompt: r`A population of 126.5 million shrinks by $0.6\%$ a year. The number of whole years until it is below 100 million is ____.`,
      answers: [["40"]],
      explain: r`$t = \dfrac{\ln(100/126.5)}{\ln 0.994} \approx 39.06$. After 39 years it is $\approx 100.04$ million, after 40 years $\approx 99.44$ million: 40 years.`,
    },
    {
      id: "functions-q32", kind: "mcq", sub: "Exponential functions",
      prompt: r`100,000 dollars earns $20\%$ a year for 50 years. Which expression gives the final value?`,
      options: [
        r`$100{,}000 \times 1.2^{50}$`,
        r`$100{,}000 \times 0.2^{50}$`,
        r`$100{,}000 \times (1 + 0.2 \times 50)$`,
        r`$100{,}000 \times 50^{1.2}$`,
      ],
      answer: 0,
      explain: r`Growth by a fixed factor $a = 1.2$ each year: $f(t) = 100{,}000(1.2)^t$, so $f(50) \approx 910{,}043{,}815$. $1 + 0.2 \times 50$ ignores compounding; $50^{1.2}$ confuses power and exponential.`,
    },
    // 3.8
    {
      id: "functions-q33", kind: "fill", sub: "Logarithms",
      prompt: r`$\ln(1) =$ ____ and $\ln(e) =$ ____.`,
      answers: [["0"], ["1"]],
      explain: r`$e^0 = 1$, so $\ln 1 = 0$; $e^1 = e$, so $\ln e = 1$.`,
    },
    {
      id: "functions-q34", kind: "mcq", sub: "Logarithms",
      prompt: r`What is $\ln(-3)$?`,
      options: [r`$-\ln 3$`, r`Undefined, because $e^u > 0$ for every $u$`, r`$0$`, r`$\frac{1}{\ln 3}$`],
      answer: 1,
      explain: r`$\ln(-3)$ would be the $u$ with $e^u = -3$, but $e^u$ is always positive. $\ln a$ exists only for $a > 0$.`,
    },
    {
      id: "functions-q35", kind: "mcq", sub: "Logarithms",
      prompt: r`Expand $\ln\!\left(\dfrac{a + b}{\sqrt{c}}\right)$.`,
      options: [
        r`$\ln a + \ln b - \frac{1}{2}\ln c$`,
        r`$\ln(a + b) - \frac{1}{2}\ln c$`,
        r`$\ln(a + b) - 2\ln c$`,
        r`$\dfrac{\ln(a + b)}{\frac{1}{2}\ln c}$`,
      ],
      answer: 1,
      explain: r`Quotient rule then power rule: $\ln(a + b) - \ln c^{1/2} = \ln(a + b) - \frac12\ln c$. There is no rule splitting $\ln(a + b)$.`,
    },
    {
      id: "functions-q36", kind: "mcq", sub: "Logarithms",
      prompt: r`$\ln\!\left(a^{-1/3}b^3e^2\right) =$`,
      options: [
        r`$-\frac{1}{3}\ln a + 3\ln b + 2$`,
        r`$-\frac{1}{3}\ln a \cdot 3\ln b \cdot 2$`,
        r`$\frac{1}{3}\ln a + 3\ln b + 2$`,
        r`$-\frac{1}{3}\ln a + 3\ln b + e^2$`,
      ],
      answer: 0,
      explain: r`Product rule: add the logs. Power rule: $\ln a^{-1/3} = -\frac13\ln a$, $\ln b^3 = 3\ln b$, $\ln e^2 = 2\ln e = 2$.`,
    },
    {
      id: "functions-q37", kind: "mcq", sub: "Logarithms",
      prompt: r`Write $2\ln x - 0.5\ln y - \ln 1$ as a single logarithm.`,
      options: [r`$\ln\dfrac{x^2}{\sqrt{y}}$`, r`$\ln\dfrac{2x}{0.5y}$`, r`$\ln\left(x^2 - \sqrt{y}\right)$`, r`$\ln\dfrac{x^2}{\sqrt{y}} - 1$`],
      answer: 0,
      explain: r`$\ln 1 = 0$ (not 1). $2\ln x = \ln x^2$, $0.5\ln y = \ln\sqrt{y}$, and a difference of logs is the log of a quotient.`,
    },
    {
      id: "functions-q38", kind: "mcq", sub: "Logarithms",
      prompt: r`If $y = 6e^{4x}$, then $x =$`,
      options: [r`$\frac{1}{4}\ln\frac{y}{6}$`, r`$\frac{\ln y}{24}$`, r`$4\ln\frac{y}{6}$`, r`$\frac{1}{4}\ln y - 6$`],
      answer: 0,
      explain: r`$e^{4x} = y/6 \Rightarrow 4x = \ln(y/6) \Rightarrow x = \frac14\ln(y/6)$. You must divide by 6 before taking logs.`,
    },
    {
      id: "functions-q39", kind: "fill", sub: "Logarithms",
      prompt: r`Solve $2\ln x + \ln 3 = \ln 75$: $x =$ ____. Solve $\ln(x^2 - 10) - \ln x = 2\ln 3$: $x =$ ____.`,
      answers: [["5"], ["10"]],
      explain: r`First: $\ln(3x^2) = \ln 75 \Rightarrow x^2 = 25 \Rightarrow x = 5$ ($x > 0$ needed).
Second: $\dfrac{x^2 - 10}{x} = 9 \Rightarrow (x - 10)(x + 1) = 0$; reject $x = -1$, so $x = 10$.`,
    },
    {
      id: "functions-q40", kind: "mcq", sub: "Logarithms",
      prompt: r`The solutions of $3^{x+1} = 3^{2x-1} + 6$ are…`,
      options: [
        r`$x = 1$ and $x = \dfrac{\ln 6}{\ln 3}$`,
        r`$x = 3$ and $x = 6$`,
        r`$x = 1$ only`,
        r`$x = \ln 3$ and $x = \ln 6$`,
      ],
      answer: 0,
      explain: r`With $u = 3^x$: $3u = u^2/3 + 6 \Rightarrow u^2 - 9u + 18 = 0 \Rightarrow u = 3, 6$. These are values of $3^x$, not of $x$: $3^x = 3 \Rightarrow x = 1$; $3^x = 6 \Rightarrow x = \ln 6/\ln 3 \approx 1.631$.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "functions-x1", kind: "calc", sub: "Domain and range",
      prompt: r`Find the domain and the range of (i) $h(x) = 1 - \sqrt{x + 1}$ and (ii) $f(x) = \dfrac{1}{\sqrt{1 - x}}$.`,
      marks: 5,
      rubric: [
        { point: r`(i) Domain $x \ge -1$ from $x + 1 \ge 0$`, marks: 1 },
        { point: r`(i) Range $(-\infty, 1]$, with reasoning ($\sqrt{x+1} \ge 0$ takes all values $\ge 0$)`, marks: 1.5 },
        { point: r`(ii) Domain $x < 1$ (strict, because the root is in the denominator)`, marks: 1.5 },
        { point: r`(ii) Range $(0, \infty)$`, marks: 1 },
      ],
      model: r`**(i)** The square root requires $x + 1 \ge 0$, so the domain is $[-1, \infty)$.
For $x \ge -1$, $\sqrt{x + 1}$ takes every value in $[0, \infty)$ ($0$ at $x = -1$, growing without bound). Hence $1 - \sqrt{x+1}$ takes every value in $(-\infty, 1]$. Range $= (-\infty, 1]$.
**(ii)** We need $\sqrt{1 - x}$ defined and nonzero (it is a denominator): $1 - x > 0$, so the domain is $(-\infty, 1)$.
For $x < 1$, $\sqrt{1 - x}$ takes every value in $(0, \infty)$; so does its reciprocal. Range $= (0, \infty)$.`,
      answer: r`(i) $D = [-1, \infty)$, $R = (-\infty, 1]$; (ii) $D = (-\infty, 1)$, $R = (0, \infty)$`,
      source: "Assignment 3 Q4(a), (c)",
    },
    {
      id: "functions-x2", kind: "calc", sub: "Domain and range",
      prompt: r`Find the domain and the range of $h(x) = \pi^{\frac{1}{\sqrt{25 - x}}}$, where $\dfrac{1}{\sqrt{25 - x}}$ is the exponent.`,
      marks: 5,
      rubric: [
        { point: r`Domain: $25 - x > 0$ (root in a denominator), so $x < 25$`, marks: 2 },
        { point: r`Exponent $u = 1/\sqrt{25 - x}$ takes all values in $(0, \infty)$`, marks: 1 },
        { point: r`Uses $\pi > 1$ so $\pi^u$ is increasing, $\pi^u \to 1$ as $u \to 0^+$: range $(1, \infty)$`, marks: 2 },
      ],
      model: r`**Domain.** The exponent contains $\sqrt{25 - x}$ in a denominator, so we need $25 - x > 0$: $x < 25$. Domain $= (-\infty, 25)$.
**Range.** As $x$ runs over $(-\infty, 25)$, $25 - x$ runs over $(0, \infty)$, so $\sqrt{25 - x}$ runs over $(0, \infty)$ and $u = \dfrac{1}{\sqrt{25 - x}}$ also runs over $(0, \infty)$.
Since $\pi \approx 3.14 > 1$, $\pi^u$ is strictly increasing in $u$. As $u \to 0^+$ (i.e. $x \to -\infty$), $\pi^u \to \pi^0 = 1$ but never equals 1; as $u \to \infty$ (i.e. $x \to 25^-$), $\pi^u \to \infty$.
Range $= (1, \infty)$.`,
      answer: r`Domain $x < 25$; range $(1, \infty)$`,
      source: "Assignment 3 Q4(b)",
    },
    {
      id: "functions-x3", kind: "calc", sub: "Cost functions",
      prompt: r`A firm's total cost function is $C(x) = 2x^2 - x + 25$, where $x$ is output. Find the average variable cost and the average fixed cost of producing 2 units of output.`,
      marks: 5,
      rubric: [
        { point: r`Identifies fixed cost $25$ and variable cost $2x^2 - x$`, marks: 2 },
        { point: r`$AVC = 2x - 1$, so $AVC(2) = 3$`, marks: 1.5 },
        { point: r`$AFC = 25/x$, so $AFC(2) = 12.5$`, marks: 1.5 },
      ],
      model: r`The fixed cost is the part of $C$ that does not change with output: $FC = 25$. The variable cost is $VC(x) = 2x^2 - x$.
$$AVC(x) = \frac{VC(x)}{x} = \frac{2x^2 - x}{x} = 2x - 1 \quad\Rightarrow\quad AVC(2) = 3.$$
$$AFC(x) = \frac{FC}{x} = \frac{25}{x} \quad\Rightarrow\quad AFC(2) = 12.5.$$
Check: average total cost $= C(2)/2 = (8 - 2 + 25)/2 = 15.5 = 3 + 12.5$.`,
      answer: "AVC = 3, AFC = 12.5",
      source: "Assignment 3 Q5",
    },
    {
      id: "functions-x4", kind: "calc", sub: "Consumption and savings",
      prompt: r`In a closed economy with no government intervention, households either consume or save their income: $C = C(Y)$ and $S = S(Y)$. Suppose $C = 500 + 0.7Y$.
(a) What is the marginal propensity to consume? Sketch the consumption function.
(b) Determine the corresponding savings function.`,
      marks: 5,
      rubric: [
        { point: r`MPC $= 0.7$ identified as the slope of $C$`, marks: 1 },
        { point: r`Sketch: straight line, intercept $500$, slope $0.7$`, marks: 1 },
        { point: r`Uses $Y = C + S$, i.e. $S = Y - C$`, marks: 1.5 },
        { point: r`$S = -500 + 0.3Y$`, marks: 1.5 },
      ],
      model: r`(a) $C = 500 + 0.7Y$ is linear with slope $0.7$, so the **MPC is 0.7**: each extra dollar of income raises consumption by 0.70 dollars. The graph is a straight line in the $(Y, C)$ plane starting at $C = 500$ (autonomous consumption) when $Y = 0$ and rising $0.7$ for each unit of $Y$ (e.g. through $(1000, 1200)$).
(b) Income is either consumed or saved: $Y = C + S$. So
$$S = Y - C = Y - (500 + 0.7Y) = -500 + 0.3Y.$$`,
      answer: r`MPC $= 0.7$; $S = -500 + 0.3Y$`,
      figures: [
        {
          x: "Y",
          y: "C, S",
          xr: [0, 3000],
          yr: [-600, 2700],
          curves: [
            { f: "500+0.7*x", label: "C = 500 + 0.7Y" },
            { f: "-500+0.3*x", label: "S = −500 + 0.3Y", tone: 1 },
          ],
          points: [{ at: [0, 500], label: "500" }, { at: [0, -500], label: "−500", tone: 1 }],
        },
      ],
      source: "Assignment 3 Q3(a)–(b)",
    },
    {
      id: "functions-x5", kind: "explain", sub: "Consumption and savings",
      prompt: r`With $C = 500 + 0.7Y$ and savings function $S = -500 + 0.3Y$ (closed economy, no government):
(a) What does the slope of the savings function mean?
(b) If you add the slope coefficients of the consumption and savings functions, what do you find? Does it make sense? Show that the same holds for any linear consumption function $C = a + bY$.`,
      marks: 5,
      rubric: [
        { point: r`Slope $0.3$ = marginal propensity to save: savings rise by 0.30 per extra dollar of income`, marks: 1.5 },
        { point: r`$0.7 + 0.3 = 1$`, marks: 1 },
        { point: r`Explains: every extra dollar of income is either consumed or saved`, marks: 1.5 },
        { point: r`General case: $S = -a + (1 - b)Y$, so MPC + MPS $= b + (1 - b) = 1$`, marks: 1 },
      ],
      model: r`(a) The slope of $S$, $0.3$, is the **marginal propensity to save (MPS)**: when income rises by 1 dollar, savings rise by 0.30 dollars.
(b) MPC + MPS $= 0.7 + 0.3 = 1$. This makes sense: in a closed economy with no government, income has only two uses, so each extra dollar of income must be split between extra consumption and extra saving; the two shares must add up to the whole dollar.
In general, $C = a + bY$ gives $S = Y - C = -a + (1 - b)Y$, so MPC + MPS $= b + (1 - b) = 1$ for any linear consumption function.`,
      answer: "MPS = 0.3; MPC + MPS = 1 because income is either consumed or saved",
      source: "Assignment 3 Q3(c)–(d)",
    },
    {
      id: "functions-x6", kind: "calc", sub: "Linear functions",
      prompt: r`A linear demand function $D = a - bP$ passes through the points $(P, D) = (10, 80)$ and $(30, 40)$.
(a) Find $a$ and $b$.
(b) Supply is $S = 10 + 2P$. Find the price and quantity at which supply equals demand.`,
      marks: 5,
      rubric: [
        { point: r`Slope $= \dfrac{40 - 80}{30 - 10} = -2$`, marks: 1 },
        { point: r`Point–slope form gives $D = 100 - 2P$ ($a = 100$, $b = 2$)`, marks: 1.5 },
        { point: r`Sets $10 + 2P = 100 - 2P$`, marks: 1 },
        { point: r`$P = 22.5$, $Q = 55$`, marks: 1.5 },
      ],
      model: r`(a) Slope $= \dfrac{D_2 - D_1}{P_2 - P_1} = \dfrac{40 - 80}{30 - 10} = -2$, so $b = 2$.
Point–slope form through $(10, 80)$: $D - 80 = -2(P - 10)$, so $D = 100 - 2P$: $a = 100$, $b = 2$. Check: $100 - 2(30) = 40$. ✓
(b) $10 + 2P = 100 - 2P \Rightarrow 4P = 90 \Rightarrow P = 22.5$. Quantity $= 10 + 2(22.5) = 55$ (and $100 - 45 = 55$ ✓).`,
      answer: r`$D = 100 - 2P$; $P = 22.5$, $Q = 55$`,
      source: "Modelled on Lecture Note 3, 3.3 (supply and demand lines)",
    },
    {
      id: "functions-x7", kind: "proof", sub: "Quadratic functions",
      prompt: r`Show that $ax^2 + bx + c = a\left(x + \dfrac{b}{2a}\right)^2 - \dfrac{b^2 - 4ac}{4a}$ for $a \ne 0$. Hence show that if $a < 0$ the quadratic has a maximum value $\dfrac{4ac - b^2}{4a}$, attained at $x = -\dfrac{b}{2a}$.`,
      marks: 5,
      rubric: [
        { point: r`Expands $a\left(x + \frac{b}{2a}\right)^2 = ax^2 + bx + \frac{b^2}{4a}$`, marks: 1.5 },
        { point: r`Simplifies to $ax^2 + bx + c$`, marks: 1 },
        { point: r`Argues $a\left(x + \frac{b}{2a}\right)^2 \le 0$ when $a < 0$, equal to $0$ only at $x = -\frac{b}{2a}$`, marks: 1.5 },
        { point: r`Concludes the maximum value $-\frac{b^2 - 4ac}{4a} = \frac{4ac - b^2}{4a}$`, marks: 1 },
      ],
      model: r`Expand the right-hand side:
$$a\left(x + \frac{b}{2a}\right)^2 = a\left(x^2 + \frac{b}{a}x + \frac{b^2}{4a^2}\right) = ax^2 + bx + \frac{b^2}{4a}.$$
Then $ax^2 + bx + \dfrac{b^2}{4a} - \dfrac{b^2 - 4ac}{4a} = ax^2 + bx + \dfrac{b^2 - b^2 + 4ac}{4a} = ax^2 + bx + c$, as required.
Now let $a < 0$. A square is never negative, so $\left(x + \frac{b}{2a}\right)^2 \ge 0$ and multiplying by $a < 0$ gives $a\left(x + \frac{b}{2a}\right)^2 \le 0$, with equality only when $x = -\frac{b}{2a}$. Therefore
$$f(x) \le 0 - \frac{b^2 - 4ac}{4a} = \frac{4ac - b^2}{4a}$$
for every $x$, with equality at $x = -\frac{b}{2a}$. So the maximum value is $\frac{4ac - b^2}{4a}$, attained at $x = -\frac{b}{2a}$.`,
      answer: r`Maximum $\dfrac{4ac - b^2}{4a}$ at $x = -\dfrac{b}{2a}$`,
      source: "Lecture Note 3, 3.4",
    },
    {
      id: "functions-x8", kind: "calc", sub: "Quadratic functions",
      prompt: r`Tax revenue (in billions) as a function of the tax rate index $x$ is modelled by $R(x) = -2x^2 + 12x - 10$. Write $R$ in completed-square form, find the rate that maximises revenue and the maximum revenue, and find the two rates at which revenue is zero.`,
      marks: 5,
      rubric: [
        { point: r`$R(x) = -2(x - 3)^2 + 8$`, marks: 2 },
        { point: r`Maximum since $a = -2 < 0$: $R = 8$ at $x = 3$`, marks: 1.5 },
        { point: r`Zeros at $x = 1$ and $x = 5$`, marks: 1.5 },
      ],
      model: r`$a = -2$, $b = 12$, $c = -10$. $-\dfrac{b}{2a} = -\dfrac{12}{-4} = 3$, and $\dfrac{b^2 - 4ac}{4a} = \dfrac{144 - 80}{-8} = -8$.
So $R(x) = -2(x - 3)^2 - (-8) = -2(x - 3)^2 + 8$. (Check: $-2(x^2 - 6x + 9) + 8 = -2x^2 + 12x - 10$. ✓)
Since $a = -2 < 0$, $-2(x - 3)^2 \le 0$, so revenue is **maximised at $x = 3$** with **$R = 8$**.
Zeros: $-2(x - 3)^2 + 8 = 0 \Rightarrow (x - 3)^2 = 4 \Rightarrow x - 3 = \pm 2 \Rightarrow x = 1$ or $x = 5$.`,
      answer: r`$R = -2(x - 3)^2 + 8$; max 8 at $x = 3$; zero at $x = 1, 5$`,
      figures: [
        {
          xr: [0, 6],
          yr: [-3, 10],
          curves: [{ f: "-2*x^2+12*x-10", label: "R(x)" }],
          points: [{ at: [3, 8], label: "(3, 8)", guides: true }, { at: [1, 0] }, { at: [5, 0] }],
        },
      ],
      source: "Modelled on Lecture Note 3, 3.4 (Laffer-type quadratic)",
    },
    {
      id: "functions-x9", kind: "calc", sub: "Exponential functions",
      prompt: r`Japan's population is decreasing. If the population growth rate is $-0.6\%$ on average annually, how many years will it take for the population to decrease from 126.5 million to below 100 million?`,
      marks: 5,
      rubric: [
        { point: r`Model $126.5(0.994)^t$ with factor $0.994$`, marks: 1.5 },
        { point: r`Takes logs: $t\ln 0.994 = \ln(100/126.5)$`, marks: 1.5 },
        { point: r`$t \approx 39.06$`, marks: 1 },
        { point: r`Concludes 40 years (population still above 100 million after 39 years)`, marks: 1 },
      ],
      model: r`A growth rate of $-0.6\%$ means a factor $a = 1 - 0.006 = 0.994$ per year, so after $t$ years the population is $126.5(0.994)^t$ million.
Solve $126.5(0.994)^t = 100$:
$$(0.994)^t = \frac{100}{126.5} \;\Rightarrow\; t\ln(0.994) = \ln\!\left(\frac{100}{126.5}\right) \;\Rightarrow\; t = \frac{\ln(0.79051)}{\ln(0.994)} = \frac{-0.23507}{-0.0060181} \approx 39.06.$$
Check: $126.5(0.994)^{39} \approx 100.04$ million (not yet below 100) and $126.5(0.994)^{40} \approx 99.44$ million. So it takes **40 years**.`,
      answer: "About 39.06 years, i.e. below 100 million after 40 years",
      source: "Assignment 4 Q1(a)",
    },
    {
      id: "functions-x10", kind: "calc", sub: "Exponential functions",
      prompt: r`Simon invests 100,000 dollars in the stock market and earns a $20\%$ yearly return consistently.
(a) What is his portfolio worth after 50 years?
(b) After how many whole years does the portfolio first exceed 1,000,000 dollars?`,
      marks: 5,
      rubric: [
        { point: r`Model $f(t) = 100{,}000(1.2)^t$`, marks: 1 },
        { point: r`(a) $f(50) \approx 910{,}043{,}815$ dollars`, marks: 1.5 },
        { point: r`(b) $1.2^t = 10 \Rightarrow t = \ln 10/\ln 1.2 \approx 12.63$`, marks: 1.5 },
        { point: r`(b) 13 years`, marks: 1 },
      ],
      model: r`The portfolio grows by the fixed factor $a = 1.2$ each year: $f(t) = 100{,}000(1.2)^t$.
(a) $f(50) = 100{,}000 \times 1.2^{50} \approx 100{,}000 \times 9100.44 \approx 910{,}043{,}815$ dollars (about 910 million).
(b) $100{,}000(1.2)^t = 1{,}000{,}000 \Rightarrow 1.2^t = 10 \Rightarrow t = \dfrac{\ln 10}{\ln 1.2} = \dfrac{2.3026}{0.18232} \approx 12.63$.
Check: $1.2^{12} \approx 8.92$ (portfolio $\approx 891{,}610$) and $1.2^{13} \approx 10.70$ (portfolio $\approx 1{,}069{,}932$). It first exceeds 1 million after **13 years**.`,
      answer: "(a) ≈ 910,043,815 dollars; (b) 13 years",
      source: "Assignment 4 Q1(b) (part (b) modelled on the Lecture Note 3 doubling-time questions)",
    },
    {
      id: "functions-x11", kind: "calc", sub: "Logarithm rules",
      prompt: r`Use the rules of natural logarithms to
(a) express $\ln\!\left(a^{-\frac{1}{3}}b^3e^2\right)$ in terms of $\ln a$ and $\ln b$;
(b) write $2\ln(x) - 0.5\ln(y) - \ln(1)$ as a single logarithm.`,
      marks: 5,
      rubric: [
        { point: r`(a) Product rule: $\ln a^{-1/3} + \ln b^3 + \ln e^2$`, marks: 1 },
        { point: r`(a) Power rule and $\ln e = 1$: $-\frac13\ln a + 3\ln b + 2$`, marks: 1.5 },
        { point: r`(b) $\ln 1 = 0$ and power rule: $\ln x^2 - \ln y^{1/2}$`, marks: 1.5 },
        { point: r`(b) Quotient rule: $\ln\dfrac{x^2}{\sqrt{y}}$`, marks: 1 },
      ],
      model: r`(a) By the product rule, $\ln\!\left(a^{-1/3}b^3e^2\right) = \ln a^{-1/3} + \ln b^3 + \ln e^2$. By the power rule this is $-\frac13\ln a + 3\ln b + 2\ln e = -\frac13\ln a + 3\ln b + 2$, since $\ln e = 1$.
(b) $\ln 1 = 0$. By the power rule, $2\ln x = \ln x^2$ and $0.5\ln y = \ln y^{1/2} = \ln\sqrt{y}$. By the quotient rule,
$$2\ln x - 0.5\ln y - \ln 1 = \ln x^2 - \ln\sqrt{y} = \ln\frac{x^2}{\sqrt{y}}.$$`,
      answer: r`(a) $-\frac13\ln a + 3\ln b + 2$; (b) $\ln\dfrac{x^2}{\sqrt{y}}$`,
      source: "Assignment 4 Q2",
    },
    {
      id: "functions-x12", kind: "calc", sub: "Solving log equations",
      prompt: r`(a) Consider $y = 6e^{4x}$. Express $x$ in terms of $y$ using logarithms base $e$.
(b) Solve $2\ln(x) + \ln(3) = \ln(75)$.`,
      marks: 5,
      rubric: [
        { point: r`(a) $e^{4x} = y/6$, then $4x = \ln(y/6)$`, marks: 1.5 },
        { point: r`(a) $x = \frac14\ln\frac{y}{6}$`, marks: 1 },
        { point: r`(b) Combines to $\ln(3x^2) = \ln 75$, so $x^2 = 25$`, marks: 1.5 },
        { point: r`(b) $x = 5$, rejecting $x = -5$ since $\ln x$ requires $x > 0$`, marks: 1 },
      ],
      model: r`(a) Divide by 6: $e^{4x} = \dfrac{y}{6}$. By the definition of $\ln$ (for $y > 0$): $4x = \ln\dfrac{y}{6}$, so
$$x = \frac{1}{4}\ln\frac{y}{6} = \frac{1}{4}(\ln y - \ln 6).$$
(b) Power rule: $2\ln x = \ln x^2$; product rule: $\ln x^2 + \ln 3 = \ln(3x^2)$. So $\ln(3x^2) = \ln 75$, and since $\ln$ is strictly increasing, $3x^2 = 75$, $x^2 = 25$, $x = \pm 5$.
$\ln x$ is only defined for $x > 0$, so $x = -5$ is rejected: **$x = 5$**. (Check: $2\ln 5 + \ln 3 = \ln 25 + \ln 3 = \ln 75$. ✓)`,
      answer: r`(a) $x = \frac14\ln(y/6)$; (b) $x = 5$`,
      source: "Assignment 4 Q3(a)–(b)",
    },
    {
      id: "functions-x13", kind: "calc", sub: "Solving log equations",
      prompt: r`Solve $\ln(x^2 - 10) - \ln(x) = 2\ln(3)$.`,
      marks: 5,
      rubric: [
        { point: r`Quotient and power rules: $\ln\dfrac{x^2 - 10}{x} = \ln 9$`, marks: 1.5 },
        { point: r`$x^2 - 9x - 10 = 0$`, marks: 1 },
        { point: r`Factorises: $x = 10$ or $x = -1$`, marks: 1 },
        { point: r`Rejects $x = -1$ (log of a negative number); answer $x = 10$`, marks: 1.5 },
      ],
      model: r`Left side (quotient rule): $\ln\dfrac{x^2 - 10}{x}$. Right side (power rule): $2\ln 3 = \ln 9$.
Since $\ln$ is strictly increasing, $\dfrac{x^2 - 10}{x} = 9 \Rightarrow x^2 - 10 = 9x \Rightarrow x^2 - 9x - 10 = 0 \Rightarrow (x - 10)(x + 1) = 0$.
So $x = 10$ or $x = -1$. For $x = -1$, $\ln(x) = \ln(-1)$ is undefined (and $x^2 - 10 = -9 < 0$), so it is rejected.
For $x = 10$: $x^2 - 10 = 90 > 0$ and $x > 0$; $\ln 90 - \ln 10 = \ln 9 = 2\ln 3$. ✓
**$x = 10$.**`,
      answer: r`$x = 10$`,
      source: "Assignment 4 Q3(c)",
    },
    {
      id: "functions-x14", kind: "calc", sub: "Solving exponential equations",
      prompt: r`Solve $3^{x+1} = 3^{2x-1} + 6$.`,
      marks: 5,
      rubric: [
        { point: r`Substitutes $u = 3^x$: $3^{x+1} = 3u$, $3^{2x-1} = u^2/3$`, marks: 1.5 },
        { point: r`$u^2 - 9u + 18 = 0$, so $u = 3$ or $u = 6$`, marks: 1.5 },
        { point: r`$x = 1$`, marks: 1 },
        { point: r`$x = \dfrac{\ln 6}{\ln 3} \approx 1.631$`, marks: 1 },
      ],
      model: r`Let $u = 3^x$ ($u > 0$). Then $3^{x+1} = 3 \cdot 3^x = 3u$ and $3^{2x-1} = \dfrac{(3^x)^2}{3} = \dfrac{u^2}{3}$.
The equation becomes $3u = \dfrac{u^2}{3} + 6$. Multiply by 3: $9u = u^2 + 18$, so $u^2 - 9u + 18 = 0$, i.e. $(u - 3)(u - 6) = 0$.
Both roots are positive, so both are valid values of $3^x$:
- $3^x = 3 \Rightarrow x = 1$.
- $3^x = 6 \Rightarrow x\ln 3 = \ln 6 \Rightarrow x = \dfrac{\ln 6}{\ln 3} \approx 1.631$.
Check: $x = 1$: $3^2 = 9 = 3^1 + 6$ ✓. $3^x = 6$: $3^{x+1} = 18$ and $3^{2x-1} + 6 = 36/3 + 6 = 18$ ✓.`,
      answer: r`$x = 1$ or $x = \ln 6/\ln 3 \approx 1.631$`,
      source: "Assignment 4 Q3(d)",
    },
    {
      id: "functions-x15", kind: "calc", sub: "Solving log equations",
      prompt: r`Solve $\dfrac{2 - \ln(x^7)}{7 - \ln(x^2)} = -[\ln(x)]^2$.`,
      marks: 5,
      rubric: [
        { point: r`Power rule and $u = \ln x$: $\dfrac{2 - 7u}{7 - 2u} = -u^2$`, marks: 1.5 },
        { point: r`Cubic $2u^3 - 7u^2 + 7u - 2 = 0$`, marks: 1 },
        { point: r`Factorises $(u - 1)(2u - 1)(u - 2) = 0$`, marks: 1.5 },
        { point: r`$x = e$, $x = \sqrt{e}$, $x = e^2$`, marks: 1 },
      ],
      model: r`For $x > 0$, the power rule gives $\ln x^7 = 7\ln x$ and $\ln x^2 = 2\ln x$. Let $u = \ln x$:
$$\frac{2 - 7u}{7 - 2u} = -u^2 \;\Rightarrow\; 2 - 7u = -u^2(7 - 2u) = -7u^2 + 2u^3 \;\Rightarrow\; 2u^3 - 7u^2 + 7u - 2 = 0.$$
$u = 1$ is a root ($2 - 7 + 7 - 2 = 0$). Dividing by $(u - 1)$: $2u^3 - 7u^2 + 7u - 2 = (u - 1)(2u^2 - 5u + 2) = (u - 1)(2u - 1)(u - 2)$.
So $u = 1$, $u = \frac12$ or $u = 2$; none makes the denominator $7 - 2u$ zero.
$\ln x = 1 \Rightarrow x = e$; $\ln x = \frac12 \Rightarrow x = e^{1/2} = \sqrt{e}$; $\ln x = 2 \Rightarrow x = e^2$.
(Check $x = e$: $\frac{2 - 7}{7 - 2} = -1 = -1^2$ ✓.)`,
      answer: r`$x = e,\ \sqrt{e},\ e^2$`,
      source: "Assignment 4 Q3(e)",
    },
    {
      id: "functions-x16", kind: "select", sub: "Functions: mixed facts",
      prompt: "Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.",
      statements: [
        r`$\ln(xy) = \ln(x) + \ln(y)$ for all positive $x$ and $y$.`,
        r`$\ln(x + y) = \ln(x) + \ln(y)$ for all positive $x$ and $y$.`,
        r`The exponential function $f(t) = 5(0.8)^t$ is decreasing and $f(0) = 5$.`,
        r`The slope of the straight line through $(1, 3)$ and $(4, 12)$ is $3$.`,
        r`The domain of $f(x) = \dfrac{1}{\sqrt{1 - x}}$ is $x \le 1$.`,
        r`$y = x^2$ is a function even though $x = 5$ and $x = -5$ give the same value of $y$.`,
      ],
      wrong: [1, 4],
      marks: 5,
      rubric: [
        { point: "Identifies (ii)", marks: 2.5 },
        { point: "Identifies (v)", marks: 2.5 },
      ],
      model: r`**(ii) is wrong.** There is no simple formula for $\ln(x + y)$. Counter-example: $x = y = 1$ gives $\ln 2 \approx 0.693$ on the left but $\ln 1 + \ln 1 = 0$ on the right. ($\ln x + \ln y = \ln(xy)$, statement (i).)
**(v) is wrong.** At $x = 1$ the denominator is $\sqrt{0} = 0$, so $f(1)$ is undefined; the domain is $x < 1$.
The others are true: (i) is the product rule; (iii) $0 < 0.8 < 1$ so $f$ decreases, and $f(0) = 5 \cdot 0.8^0 = 5$; (iv) slope $= \frac{12 - 3}{4 - 1} = 3$; (vi) each $x$ gives a unique $y$, and a function allows several $x$ values to share a $y$.`,
      answer: "(ii) and (v)",
      source: "Modelled on past paper Q4(c)–(d) style, Lecture Note 3 content",
    },
  ],
};

export default data;
