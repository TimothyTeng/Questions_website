import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "constrained",
  sections: [
    // ------------------------------------------------------------------ 11.1
    {
      title: "11.1 A Simple Chain Rule",
      intro: "Many economic models involve composite functions: the variables of a function are themselves functions of other basic variables.",
      points: [
        {
          term: "Composite functions",
          text: "Functions of one or several variables in which the variables are themselves functions of other basic variables.",
          eg: "Many economic growth models regard output as a function of capital and labour, both of which are functions of time.",
        },
        {
          term: "Set-up",
          text: r`Suppose $z$ is a function of $x$ and $y$, $z = F(x, y)$, and both $x$ and $y$ are functions of one variable $t$: $x = f(t)$, $y = g(t)$. Then $z = F(x, y) = F(f(t), g(t))$.`,
        },
        {
          term: "The question",
          text: r`How does a small increase in $t$ lead to an increase or a decrease in $z$? We want $\dfrac{dz}{dt}$, the change of $z$ with respect to $t$.`,
        },
        {
          term: "Total derivative",
          text: r`$\dfrac{dz}{dt} = \dfrac{\partial F(x,y)}{\partial x}\cdot\dfrac{dx}{dt} + \dfrac{\partial F(x,y)}{\partial y}\cdot\dfrac{dy}{dt} = F_1'(x,y)\,\dfrac{dx}{dt} + F_2'(x,y)\,\dfrac{dy}{dt}$. This derivative is called the **total derivative** of $z$ with respect to $t$.`,
        },
        {
          term: "Notation",
          text: r`$F_1'(x,y) = \dfrac{\partial F}{\partial x}$ is the partial derivative with respect to the 1st variable, $F_2'(x,y) = \dfrac{\partial F}{\partial y}$ with respect to the 2nd.`,
        },
        {
          term: "Method 1 (chain rule)",
          text: r`Find $F_1'$, $F_2'$, $\dfrac{dx}{dt}$, $\dfrac{dy}{dt}$, plug into the total-derivative formula, then substitute $x = f(t)$, $y = g(t)$ so the answer is in terms of $t$ only.`,
        },
        {
          term: "Method 2 (substitute first)",
          text: r`Substitute $x = f(t)$ and $y = g(t)$ into $F$ to get $z$ as a function of $t$ alone, then differentiate with the one-variable rules. Both methods must give the same answer, so one can check the other.`,
        },
      ],
      formulas: [
        { name: "Simple chain rule (total derivative)", tex: r`\frac{dz}{dt} = F_1'(x,y)\,\frac{dx}{dt} + F_2'(x,y)\,\frac{dy}{dt}`, note: r`For $z = F(x,y)$ with $x = f(t)$, $y = g(t)$.` },
      ],
      figures: [
        {
          title: "z(t) = t⁴ + 8t³ from Example [1]",
          x: "t",
          y: "z",
          xr: [0, 1.5],
          yr: [-3, 33],
          curves: [{ f: "x^4 + 8*x^3", label: "z = t⁴ + 8t³" }],
          segments: [{ from: [0.6, -2.2], to: [1.4, 20.2], dashed: true, tone: 1, label: "slope 28" }],
          points: [{ at: [1, 9], label: "t = 1, z = 9", guides: true }],
          caption: "With x = t² and y = 2t, z = F(x, y) = x² + y³ becomes t⁴ + 8t³. The total derivative dz/dt = 4t³ + 24t² is the slope of this curve: 28 at t = 1.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 11 Example [1]",
          problem: r`Suppose $F(x, y) = x^2 + y^3$ with $x = t^2$ and $y = 2t$. What is $\dfrac{dz}{dt}$?`,
          solution: r`**Method 1 (chain rule).** $F_1'(x,y) = 2x$ and $\dfrac{dx}{dt} = 2t$; $F_2'(x,y) = 3y^2$ and $\dfrac{dy}{dt} = 2$.
$$\frac{dz}{dt} = F_1'\frac{dx}{dt} + F_2'\frac{dy}{dt} = 2x\cdot 2t + 3y^2\cdot 2 = 2t^2\cdot 2t + 3(2t)^2\cdot 2 = 4t^3 + 24t^2.$$
(The slide prints the last term as $24t$; since $3y^2\cdot 2 = 3\cdot 4t^2\cdot 2 = 24t^2$, the correct answer is $4t^3 + 24t^2$, matching Method 2.)
**Method 2 (substitute first).** $F(x,y) = (t^2)^2 + (2t)^3 = t^4 + 8t^3$, so $\dfrac{dz}{dt} = 4t^3 + 24t^2$.`,
        },
        {
          source: "Modelled on Lecture Note 11 Example [1]",
          problem: r`Let $z = xy$ with $x = t^2$ and $y = t^3$. Find $\dfrac{dz}{dt}$ by both methods.`,
          solution: r`**Method 1.** $F_1' = y$, $F_2' = x$, $\dfrac{dx}{dt} = 2t$, $\dfrac{dy}{dt} = 3t^2$, so $\dfrac{dz}{dt} = y\cdot 2t + x\cdot 3t^2 = t^3\cdot 2t + t^2\cdot 3t^2 = 5t^4$.
**Method 2.** $z = t^2\cdot t^3 = t^5$, so $\dfrac{dz}{dt} = 5t^4$. ✓`,
        },
      ],
    },
    // ------------------------------------------------------------------ 11.2
    {
      title: "11.2 Chain Rules for Many Variables",
      intro: r`Now $x$ and $y$ depend not only on $t$ but also on another variable $s$.`,
      points: [
        {
          term: "Set-up",
          text: r`$x = f(t, s)$ and $y = g(t, s)$. Previously $z = F(f(t), g(t))$; now $z = F(x,y) = F(f(t,s), g(t,s))$.`,
        },
        {
          term: "The chain rule",
          text: r`If $z = F(x,y)$ with $x = f(t,s)$ and $y = g(t,s)$, then (a) $\dfrac{\partial F}{\partial t} = F_1'(x,y)\dfrac{\partial x}{\partial t} + F_2'(x,y)\dfrac{\partial y}{\partial t}$ and (b) $\dfrac{\partial F}{\partial s} = F_1'(x,y)\dfrac{\partial x}{\partial s} + F_2'(x,y)\dfrac{\partial y}{\partial s}$.`,
        },
        {
          term: "Partial, not total",
          text: r`Because $z$ now depends on two basic variables, we take partial derivatives: for $\dfrac{\partial F}{\partial t}$, $s$ is held fixed; for $\dfrac{\partial F}{\partial s}$, $t$ is held fixed.`,
        },
        {
          term: "Same pattern",
          text: r`Each formula is "(derivative of $F$ w.r.t. $x$) × (how $x$ moves) + (derivative of $F$ w.r.t. $y$) × (how $y$ moves)", with the movement measured in the variable you differentiate by.`,
        },
        {
          term: "Method 2 still works",
          text: r`Express $x$ and $y$ in terms of $t$ and $s$, expand $F$, then take the partial derivative with respect to $t$ (holding $s$ fixed) or $s$ (holding $t$ fixed).`,
        },
      ],
      formulas: [
        { name: "Chain rule, partial in t", tex: r`\frac{\partial F}{\partial t} = F_1'(x,y)\,\frac{\partial x}{\partial t} + F_2'(x,y)\,\frac{\partial y}{\partial t}`, note: r`$x = f(t,s)$, $y = g(t,s)$; $s$ held fixed.` },
        { name: "Chain rule, partial in s", tex: r`\frac{\partial F}{\partial s} = F_1'(x,y)\,\frac{\partial x}{\partial s} + F_2'(x,y)\,\frac{\partial y}{\partial s}`, note: r`$t$ held fixed.` },
      ],
      table: [
        ["", "Method 1: chain rule", "Method 2: substitute first"],
        ["Step 1", r`Find $F_1'$, $F_2'$ and the partials of $x$, $y$`, r`Write $F$ in terms of $t$ and $s$`],
        ["Step 2", "Plug into the chain-rule formula", r`Expand and differentiate (hold the other variable fixed)`],
        ["Step 3", r`Replace $x$, $y$ by their expressions in $t$, $s$`, "Simplify"],
        ["Best when", r`$F$ is complicated to expand`, r`The substitution is easy to expand`],
      ],
      worked: [
        {
          source: "Lecture Note 11 Example [2]",
          problem: r`$F(x,y) = x^2 + 2y^2$ with $x = t - s^2$ and $y = ts$. Find $\dfrac{\partial F}{\partial t}$ and $\dfrac{\partial F}{\partial s}$.`,
          solution: r`**Method 2 (substitute).** $F = (t - s^2)^2 + 2(ts)^2 = (t^2 - 2ts^2 + s^4) + 2t^2s^2$.
$\dfrac{\partial F}{\partial t} = 2t - 2s^2 + 4ts^2$ ($s$ held fixed); $\dfrac{\partial F}{\partial s} = -4ts + 4s^3 + 4t^2s$ ($t$ held fixed).
**Method 1 (chain rule).** $F_1' = 2x$, $F_2' = 4y$; $\dfrac{\partial x}{\partial t} = 1$, $\dfrac{\partial y}{\partial t} = s$, $\dfrac{\partial x}{\partial s} = -2s$, $\dfrac{\partial y}{\partial s} = t$.
$\dfrac{\partial F}{\partial t} = 2x\cdot 1 + 4y\cdot s = 2(t - s^2) + 4ts\cdot s = 2t - 2s^2 + 4ts^2$.
$\dfrac{\partial F}{\partial s} = 2x\cdot(-2s) + 4y\cdot t = -4s(t - s^2) + 4t^2s = -4ts + 4s^3 + 4t^2s$. Both methods agree.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 11.3
    {
      title: "11.3 Two Variables: Necessary Conditions",
      intro: "Most of the concepts learned for one-variable functions extend naturally to two-variable functions.",
      points: [
        {
          term: "Maximum at an interior point",
          text: r`Consider $z = f(x,y)$ defined on a set $S$ in the $xy$-plane ($S \subseteq D$). If $f$ attains its maximum at an interior point $(x_0, y_0)$ of $S$, then $(x_0, y_0)$ is the maximum point and $f(x_0, y_0)$ is the corresponding largest $z$ value.`,
        },
        {
          term: "Geometric Example [3]",
          text: r`The surface $z = f(x,y)$ has a peak $P = (x_0, y_0, f(x_0,y_0))$ above the point $(x_0, y_0)$ of $S$. The curves on the surface through $P$ in the $x$-direction and in the $y$-direction both have a horizontal tangent at $P$, i.e. both partial derivatives are $0$ there.`,
        },
        {
          term: "Theorem: necessary conditions for an interior extreme",
          text: r`A differentiable function $z = f(x,y)$ can only have a maximum or minimum at an interior point $(x_0, y_0)$ of $S$ if this point is a **stationary point**, i.e. it satisfies $f_1'(x,y) = 0$ and $f_2'(x,y) = 0$.`,
        },
        {
          term: "First-order conditions (FOC)",
          text: r`The two equations $f_1'(x,y) = 0$ and $f_2'(x,y) = 0$. Solve them simultaneously to find the stationary point(s).`,
        },
        {
          term: "Necessary, not sufficient",
          text: "FOC are NECESSARY conditions: if an interior point is a maximum or minimum point, it MUST satisfy the FOC. But not all stationary points are maximum or minimum points.",
        },
        {
          term: "Remarks",
          text: r`(a) A stationary point can be a maximum, a minimum, or neither. (b) To find out whether $(x_0, y_0)$ is a max or min, use the second-order condition test (11.4).`,
        },
        {
          term: "Interior only",
          text: r`The theorem is about interior points. A function can have its largest or smallest value on the boundary of the domain without any stationary point (e.g. $f(L,K) = 4L^{0.5}K^{0.5}$ on $L, K \ge 0$ has no interior stationary point, but its minimum value $0$ is reached on the boundary $L = 0$ or $K = 0$).`,
        },
      ],
      formulas: [
        { name: "First-order conditions (stationary point)", tex: r`f_1'(x_0,y_0) = \frac{\partial f}{\partial x} = 0 \quad\text{and}\quad f_2'(x_0,y_0) = \frac{\partial f}{\partial y} = 0` },
      ],
      figures: [
        {
          title: "Level curves around the maximum of Example [4]",
          xr: [-2, 12],
          yr: [0, 16],
          curves: [
            { f: "(42 - 2*x + sqrt(48 - 12*(x-5)^2))/4", from: 3, to: 7, tone: 0 },
            { f: "(42 - 2*x - sqrt(48 - 12*(x-5)^2))/4", from: 3, to: 7, tone: 0 },
            { f: "(42 - 2*x + sqrt(192 - 12*(x-5)^2))/4", from: 1, to: 9, tone: 2 },
            { f: "(42 - 2*x - sqrt(192 - 12*(x-5)^2))/4", from: 1, to: 9, tone: 2 },
            { f: "(42 - 2*x + sqrt(432 - 12*(x-5)^2))/4", from: -1, to: 11, tone: 1 },
            { f: "(42 - 2*x - sqrt(432 - 12*(x-5)^2))/4", from: -1, to: 11, tone: 1 },
          ],
          points: [{ at: [5, 8], label: "max (5, 8)" }],
          labels: [
            { at: [7.3, 9.2], text: "f ≈ 256.6", tone: 0 },
            { at: [8.6, 11.6], text: "f ≈ 238.6", tone: 2 },
            { at: [9.5, 14.5], text: "f ≈ 208.6", tone: 1 },
          ],
          caption: "f(x, y) = −2x² − 2xy − 2y² + 36x + 42y + √21. Level curves f = c are closed ovals shrinking onto the stationary point (5, 8), where f reaches its largest value 262.58.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 11 Example [4]",
          problem: r`Consider $f(x,y) = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$. Find the stationary point and the value of $f$ there.`,
          solution: r`FOC: $f_1'(x,y) = -4x - 2y + 36 = 0$ and $f_2'(x,y) = -2x - 4y + 42 = 0$.
From the first, $y = 18 - 2x$. Substitute: $-2x - 4(18 - 2x) + 42 = 0 \Rightarrow 6x - 30 = 0 \Rightarrow x = 5$, so $y = 8$.
The unique stationary point is $(x_0, y_0) = (5, 8)$ and
$f(5,8) = -50 - 80 - 128 + 180 + 336 + \sqrt{21} = 258 + \sqrt{21} \approx 262.58$.`,
        },
        {
          source: "Lecture Note 11 Example [4] (utility function)",
          problem: r`Consider the utility function $f(x,y) = \tfrac12 x^2 - 18y^2$. Find the stationary point.`,
          solution: r`$f_1'(x,y) = x = 0$ and $f_2'(x,y) = -36y = 0$ (the slide drops the minus sign; it does not change the solution).
So the stationary point is $(x_0, y_0) = (0, 0)$.
Is it a maximum or minimum? The first-order conditions do not tell us; we need the second-order test (11.4), which shows it is a saddle point.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 11.4
    {
      title: "11.4 Two Variables: Sufficient Conditions",
      intro: r`For one variable (Lecture Note 7) we checked the sign of $f''$ at a stationary point. For two variables there are four second-order partial derivatives, and we must consider them together.`,
      points: [
        {
          term: "Recall: one variable",
          text: r`For a stationary point $c$ of $y = f(x)$: if $f''(c) < 0$, $c$ is a local maximum point; if $f''(c) > 0$, $c$ is a local minimum point.`,
        },
        {
          term: "Four second-order partials",
          text: r`$f_{11}''$, $f_{12}''$, $f_{21}''$ and $f_{22}''$, with $f_{12}'' = f_{21}''$. All four are needed for the test.`,
        },
        {
          term: "Theorem: second derivative test",
          text: r`Let $f(x,y)$ have continuous second-order partial derivatives in a domain $S$ and let $(x_0, y_0)$ be an interior stationary point. Write $A = f_{11}''(x_0,y_0)$, $B = f_{12}''(x_0,y_0)$, $C = f_{22}''(x_0,y_0)$.`,
        },
        { term: "(i) Local maximum", text: r`If $A < 0$, $C < 0$ and $AC - B^2 > 0$, then $(x_0, y_0)$ is a (strict) local maximum point.` },
        { term: "(ii) Local minimum", text: r`If $A > 0$, $C > 0$ and $AC - B^2 > 0$, then $(x_0, y_0)$ is a (strict) local minimum point.` },
        { term: "(iii) Saddle point", text: r`If $AC - B^2 < 0$, then $(x_0, y_0)$ is a saddle point (neither a maximum nor a minimum).` },
        { term: "(iv) Inconclusive", text: r`If $AC - B^2 = 0$, then $(x_0, y_0)$ could be a local maximum, a local minimum, or a saddle point.` },
        {
          term: "Link to the Hessian",
          text: r`$AC - B^2$ is the determinant of the Hessian matrix (Lecture Note 10): $f''(\mathbf{x}) = \begin{pmatrix} f_{11}'' & f_{12}'' \\ f_{12}'' & f_{22}'' \end{pmatrix} = \begin{pmatrix} A & B \\ B & C \end{pmatrix}$, whose determinant is $f_{11}''f_{22}'' - f_{12}''f_{12}'' = AC - B^2$.`,
        },
        {
          term: "Evaluate at the point",
          text: r`$A$, $B$, $C$ are evaluated at the stationary point. For quadratic functions they are constants; for other functions (e.g. cubics) they change from point to point, so test each stationary point separately.`,
        },
      ],
      formulas: [
        { name: "A, B, C", tex: r`A = f_{11}''(x_0,y_0),\quad B = f_{12}''(x_0,y_0),\quad C = f_{22}''(x_0,y_0)` },
        { name: "Hessian and its determinant", tex: r`f''(\mathbf{x}) = \begin{pmatrix} A & B \\ B & C \end{pmatrix},\qquad \det = AC - B^2` },
        { name: "Local maximum", tex: r`A < 0,\; C < 0,\; AC - B^2 > 0 \;\Rightarrow\; \text{strict local max}` },
        { name: "Local minimum", tex: r`A > 0,\; C > 0,\; AC - B^2 > 0 \;\Rightarrow\; \text{strict local min}` },
        { name: "Saddle point", tex: r`AC - B^2 < 0 \;\Rightarrow\; \text{saddle point}` },
        { name: "Inconclusive case", tex: r`AC - B^2 = 0 \;\Rightarrow\; \text{max, min or saddle (test fails)}` },
      ],
      table: [
        [r`$A$, $C$`, r`$AC - B^2$`, r`$(x_0, y_0)$ is`],
        [r`both $< 0$`, r`$> 0$`, "strict local maximum"],
        [r`both $> 0$`, r`$> 0$`, "strict local minimum"],
        ["any", r`$< 0$`, "saddle point"],
        ["any", r`$= 0$`, "could be max, min or saddle"],
      ],
      figures: [
        {
          title: "Level curves near the saddle point of f = ½x² − 18y²",
          xr: [-6, 6],
          yr: [-1.2, 1.2],
          curves: [
            { f: "x/6", tone: 3, dashed: true },
            { f: "-x/6", tone: 3, dashed: true },
            { f: "sqrt(x^2 - 4)/6", from: 2, to: 6, tone: 1 },
            { f: "-sqrt(x^2 - 4)/6", from: 2, to: 6, tone: 1 },
            { f: "sqrt(x^2 - 4)/6", from: -6, to: -2, tone: 1 },
            { f: "-sqrt(x^2 - 4)/6", from: -6, to: -2, tone: 1 },
            { f: "sqrt(x^2 + 4)/6", tone: 2 },
            { f: "-sqrt(x^2 + 4)/6", tone: 2 },
          ],
          points: [{ at: [0, 0], label: "saddle (0, 0)" }],
          labels: [
            { at: [4.6, 0.35], text: "f = 2", tone: 1 },
            { at: [0, 0.5], text: "f = −2", tone: 2 },
            { at: [5.2, 1.0], text: "f = 0", tone: 3 },
          ],
          caption: "Along the x-axis f = ½x² rises away from (0, 0); along the y-axis f = −18y² falls. So (0, 0) is a stationary point but neither a max nor a min: AC − B² = (1)(−36) − 0 = −36 < 0.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 11 Example [5]",
          problem: r`Consider $f(x,y) = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$. Find the extrema.`,
          solution: r`From Example [4]: $f_1' = -4x - 2y + 36 = 0$, $f_2' = -2x - 4y + 42 = 0$, stationary point $(5, 8)$.
Second-order partials: $f_{11}'' = -4$, $f_{12}'' = -2$, $f_{21}'' = -2$, $f_{22}'' = -4$.
So $A = -4 < 0$, $C = -4 < 0$ and $AC - B^2 = 16 - 4 = 12 > 0$.
By the theorem, $(5, 8)$ is a (strict local) **maximum point**, with maximum value $f(5,8) \approx 262.58$.`,
        },
        {
          source: "Lecture Note 11 Example [4] completed",
          problem: r`Classify the stationary point $(0,0)$ of $f(x,y) = \tfrac12 x^2 - 18y^2$.`,
          solution: r`$f_1' = x$, $f_2' = -36y$, so $A = f_{11}'' = 1$, $B = f_{12}'' = 0$, $C = f_{22}'' = -36$.
$AC - B^2 = (1)(-36) - 0 = -36 < 0$, so $(0,0)$ is a **saddle point**: neither a maximum nor a minimum.`,
        },
      ],
    },
    // ------------------------------------------------------------------ 11.5
    {
      title: "11.5 Constrained Optimization",
      intro: "In many economic optimization problems the variables to be chosen must satisfy one or more constraints. Section 11.5 introduces the method of Lagrange multipliers.",
      points: [
        {
          term: "Constraints in economics",
          text: "The quantities of goods demanded by a consumer must satisfy the budget constraint; a firm produces goods with the constraint that cost cannot exceed a certain amount (say 100,000 dollars).",
        },
        {
          term: "Budget constraint",
          text: r`A consumer with $m$ available money spends it all on two goods, $x$ (price $P_x$ per unit) and $y$ (price $P_y$ per unit): $P_x x + P_y y = m$.`,
        },
        {
          term: "Graphical Example [6]: budget line",
          text: r`In the $xy$-plane the budget constraint is a straight line from $(m/P_x,\,0)$ to $(0,\,m/P_y)$ with slope $-P_x/P_y$. Bundles on or below the line are affordable.`,
          eg: r`$0.5x + 0.8y = 20$: intercepts $x = 40$, $y = 25$.`,
        },
        {
          term: "More is better",
          text: r`With $u(x,y) = xy$: $u(1,1) = 1$, $u(2,1) = 2$, $u(2,2) = 4$, $u(3,4) = 12$. The more you consume, the happier you are, but you cannot buy unlimited goods. So, given the budget, which $x$ and $y$ maximise utility?`,
        },
        {
          term: "Example [7]: level curves",
          text: r`Curves $u(x,y) = c_1$, $c_2$, $c_3$ with $c_3 > c_2 > c_1$ show levels of happiness. $c_3$ is not achievable: it is not feasible (not enough budget). $c_1$ is not the best choice: other affordable bundles make the consumer happier. $c_2$ is the utility-maximising level, reached at the point $P$ where the curve $u = c_2$ just touches the budget line.`,
        },
        {
          term: "General problem",
          text: r`Maximise $u(x,y)$ subject to $P_x x + P_y y = m$.`,
        },
        {
          term: "Lagrangian function",
          text: r`$L(x,y) = u(x,y) - \lambda(P_x x + P_y y - m)$, where $\lambda$ is the Lagrange multiplier.`,
        },
        {
          term: "First-order conditions",
          text: r`$L_x' = u_x' - \lambda P_x = 0$, $L_y' = u_y' - \lambda P_y = 0$, $L_\lambda' = P_x x + P_y y - m = 0$. Solve them to find the stationary point. The third condition is just the budget constraint.`,
        },
        {
          term: "Solving tip (from Example [8])",
          text: r`Move the $\lambda$ terms across and divide (Eq. 1)/(Eq. 2) to eliminate $\lambda$: $\dfrac{u_x'}{u_y'} = \dfrac{P_x}{P_y}$. This gives $y$ in terms of $x$; plug it into the budget constraint (Eq. 3).`,
        },
        {
          term: "Same idea as before",
          text: "There is not much difference between this and the unconstrained problems: we write down first-order conditions (now for L, including the λ equation) and solve them simultaneously.",
        },
        {
          term: "Shortcut for u = xy or u = a ln(xy)",
          text: r`Dividing the FOCs gives $\dfrac{y}{x} = \dfrac{P_x}{P_y}$, i.e. $P_x x = P_y y$: half of the budget is spent on each good, so $x = \dfrac{m}{2P_x}$ and $y = \dfrac{m}{2P_y}$. (Always show the Lagrange working in an exam.)`,
        },
      ],
      formulas: [
        { name: "Utility maximisation problem", tex: r`\max\; u(x,y)\quad\text{subject to}\quad P_x x + P_y y = m` },
        { name: "Lagrangian", tex: r`L(x,y) = u(x,y) - \lambda\,(P_x x + P_y y - m)` },
        { name: "Lagrange first-order conditions", tex: r`L_x' = u_x' - \lambda P_x = 0,\quad L_y' = u_y' - \lambda P_y = 0,\quad L_\lambda' = P_x x + P_y y - m = 0` },
        { name: "Eliminating λ (divide Eq. 1 by Eq. 2)", tex: r`\frac{u_x'}{u_y'} = \frac{P_x}{P_y}`, note: "Then substitute into the budget constraint." },
        { name: "Budget line intercepts and slope", tex: r`x\text{-intercept } \frac{m}{P_x},\quad y\text{-intercept } \frac{m}{P_y},\quad \text{slope } -\frac{P_x}{P_y}` },
      ],
      figures: [
        {
          title: "Example [8]: budget line 0.5x + 0.8y = 20 and level curves of u = xy",
          xr: [0, 45],
          yr: [0, 30],
          curves: [
            { f: "25 - 0.625*x", from: 0, to: 40, tone: 3, label: "0.5x + 0.8y = 20" },
            { f: "120/x", from: 4.2, to: 45, tone: 2, label: "u = 120 (c₁)" },
            { f: "250/x", from: 8.4, to: 45, tone: 0, label: "u = 250 (c₂)" },
            { f: "450/x", from: 15, to: 45, tone: 1, label: "u = 450 (c₃)" },
          ],
          shade: [{ f: "25 - 0.625*x", from: 0, to: 40, tone: 3, label: "affordable" }],
          points: [{ at: [20, 12.5], label: "P (20, 12.5)", guides: true }],
          caption: "The level curve xy = 250 just touches the budget line at P = (20, 12.5). xy = 450 lies entirely above the line (not feasible); xy = 120 cuts the line, so better affordable bundles exist.",
        },
        {
          title: "Past paper Q4(b): 5x + 10y = 100 and u = ¼ ln(xy)",
          xr: [0, 22],
          yr: [0, 12],
          curves: [
            { f: "10 - 0.5*x", from: 0, to: 20, tone: 3, label: "5x + 10y = 100" },
            { f: "25/x", from: 2.1, to: 22, tone: 2, label: "xy = 25" },
            { f: "50/x", from: 4.2, to: 22, tone: 0, label: "xy = 50" },
            { f: "100/x", from: 8.4, to: 22, tone: 1, label: "xy = 100" },
          ],
          points: [{ at: [10, 5], label: "(10, 5)", guides: true }],
          caption: "u = ¼ ln(xy) is constant exactly when xy is constant, so its level curves are y = c/x. The highest one touching the budget line is xy = 50, at x = 10, y = 5 (u = ¼ ln 50 ≈ 0.978).",
        },
        {
          title: "Firm: maximise Q = 4L⁰·⁵K⁰·⁵ subject to 4L + K = 80",
          x: "L",
          y: "K",
          xr: [0, 25],
          yr: [0, 85],
          curves: [
            { f: "80 - 4*x", from: 0, to: 20, tone: 3, label: "4L + K = 80" },
            { f: "225/x", from: 2.7, to: 25, tone: 2, label: "Q = 60" },
            { f: "400/x", from: 4.8, to: 25, tone: 0, label: "Q = 80" },
            { f: "625/x", from: 7.4, to: 25, tone: 1, label: "Q = 100" },
          ],
          points: [{ at: [10, 40], label: "(10, 40)", guides: true }],
          caption: "Q = 4√(LK) is constant when LK is constant (K = c/L). The cost line 4L + K = 80 touches the curve Q = 80 (LK = 400) at L = 10, K = 40.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 11 Example [8]",
          problem: r`The utility function is $u(x,y) = xy$, where $x$ is the quantity of satay and $y$ the quantity of otah (fish cake). A satay costs 0.50 dollars and an otah 0.80 dollars, and the budget is 20 dollars. Find the combination that maximises utility.`,
          solution: r`Max $u(x,y) = xy$ subject to $0.5x + 0.8y = 20$.
Lagrangian: $L(x,y) = xy - \lambda(0.5x + 0.8y - 20)$.
(Eq. 1) $L_x' = y - 0.5\lambda = 0$
(Eq. 2) $L_y' = x - 0.8\lambda = 0$
(Eq. 3) $L_\lambda' = 0.5x + 0.8y - 20 = 0$
(Eq. 1)/(Eq. 2): $\dfrac{y}{x} = \dfrac{0.5}{0.8} = \dfrac58$, so $y = \dfrac58 x$.
Into (Eq. 3): $0.5x + 0.8\cdot\dfrac58 x = 20 \Rightarrow 0.5x + 0.5x = 20 \Rightarrow x = 20$, and $y = \dfrac58\cdot 20 = 12.5$.
The consumer should buy 20 satays and 12.5 fish cakes ($\lambda = y/0.5 = 25$).`,
        },
        {
          source: "Past paper Q4(b)",
          problem: r`With a budget of 100 dollars spent entirely on goods $x$ (5 dollars per unit) and $y$ (10 dollars per unit), find the quantities that maximise $u(x,y) = \tfrac14\ln(xy)$.`,
          solution: r`Max $\tfrac14\ln(xy)$ subject to $5x + 10y = 100$. Since $\ln(xy) = \ln x + \ln y$, $L = \tfrac14\ln x + \tfrac14\ln y - \lambda(5x + 10y - 100)$.
$L_x' = \dfrac{1}{4x} - 5\lambda = 0$, $L_y' = \dfrac{1}{4y} - 10\lambda = 0$, $L_\lambda' = 5x + 10y - 100 = 0$.
Divide the first two: $\dfrac{1/(4x)}{1/(4y)} = \dfrac{y}{x} = \dfrac{5}{10}$, so $x = 2y$.
Budget: $5(2y) + 10y = 100 \Rightarrow 20y = 100 \Rightarrow y = 5$, $x = 10$ (and $\lambda = \dfrac{1}{4\cdot 10\cdot 5} = 0.005$).
Optimal bundle $x = 10$, $y = 5$, giving $u = \tfrac14\ln 50 \approx 0.978$.`,
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "constrained-c1", type: "concept", front: "Functions of one or several variables in which the variables are themselves functions of other basic variables.", back: "composite function", why: r`E.g. output $= F(K, L)$ where capital $K$ and labour $L$ are both functions of time $t$.` },
    { id: "constrained-c2", type: "concept", front: r`For $z = F(x,y)$ with $x = f(t)$, $y = g(t)$, the derivative $\dfrac{dz}{dt} = F_1'\dfrac{dx}{dt} + F_2'\dfrac{dy}{dt}$ is called the …`, back: "total derivative", why: r`It measures how a small increase in $t$ changes $z$ through both $x$ and $y$.` },
    { id: "constrained-c3", type: "concept", front: r`A point $(x_0, y_0)$ where $f_1'(x_0,y_0) = 0$ and $f_2'(x_0,y_0) = 0$.`, back: "stationary point", why: "Every interior max or min of a differentiable function is a stationary point, but a stationary point need not be a max or min." },
    { id: "constrained-c4", type: "concept", front: r`The pair of equations $f_1'(x,y) = 0$ and $f_2'(x,y) = 0$.`, back: "first-order conditions", why: "Abbreviated FOC. They are necessary conditions for an interior extreme point." },
    { id: "constrained-c5", type: "concept", front: "Conditions that every interior maximum or minimum MUST satisfy, but which do not guarantee that a point is a maximum or minimum.", back: "necessary conditions", why: "The FOC are necessary, not sufficient: a stationary point can be a max, a min, or neither (a saddle point)." },
    { id: "constrained-c6", type: "concept", front: r`A stationary point with $AC - B^2 < 0$: neither a maximum nor a minimum.`, back: "saddle point", why: r`E.g. $(0,0)$ for $f = \tfrac12x^2 - 18y^2$: $f$ rises along the $x$-axis and falls along the $y$-axis.` },
    { id: "constrained-c7", type: "concept", front: r`The matrix $\begin{pmatrix} f_{11}'' & f_{12}'' \\ f_{12}'' & f_{22}'' \end{pmatrix}$ of second-order partial derivatives.`, back: "Hessian matrix", why: r`Its determinant $f_{11}''f_{22}'' - (f_{12}'')^2 = AC - B^2$ is used in the second derivative test.` },
    { id: "constrained-c8", type: "concept", front: r`The function $L(x,y) = u(x,y) - \lambda(P_x x + P_y y - m)$.`, back: "Lagrangian function", why: "Its first-order conditions (in x, y and λ) give the constrained optimum." },
    { id: "constrained-c9", type: "concept", front: r`The extra variable $\lambda$ multiplying the constraint in the Lagrangian.`, back: "Lagrange multiplier", why: r`The method of Lagrange multipliers adds $-\lambda\times$(constraint) to the objective and sets all three partials to $0$.` },
    { id: "constrained-c10", type: "concept", front: r`The condition $P_x x + P_y y = m$ that a consumer spending all income $m$ must satisfy.`, back: "budget constraint", why: r`Graphically a straight line with intercepts $m/P_x$ and $m/P_y$ and slope $-P_x/P_y$.` },
    { id: "constrained-c11", type: "concept", front: r`The curve of all bundles $(x,y)$ with the same utility, $u(x,y) = c$.`, back: "level curve", why: r`For $u = xy$ (or $\ln(xy)$) these are $y = c/x$. The optimum is where the highest attainable one touches the budget line.` },
    // formula
    { id: "constrained-c12", type: "formula", front: r`Simple chain rule: $z = F(x,y)$, $x = f(t)$, $y = g(t)$`, back: r`$\dfrac{dz}{dt} = F_1'(x,y)\dfrac{dx}{dt} + F_2'(x,y)\dfrac{dy}{dt}$`, why: "Use when x and y depend on a single variable t. Then substitute x, y so the answer is in t only." },
    { id: "constrained-c13", type: "formula", front: r`Chain rule for $\dfrac{\partial F}{\partial t}$ when $x = f(t,s)$, $y = g(t,s)$`, back: r`$\dfrac{\partial F}{\partial t} = F_1'\dfrac{\partial x}{\partial t} + F_2'\dfrac{\partial y}{\partial t}$`, why: r`$s$ is held fixed.` },
    { id: "constrained-c14", type: "formula", front: r`Chain rule for $\dfrac{\partial F}{\partial s}$ when $x = f(t,s)$, $y = g(t,s)$`, back: r`$\dfrac{\partial F}{\partial s} = F_1'\dfrac{\partial x}{\partial s} + F_2'\dfrac{\partial y}{\partial s}$`, why: r`$t$ is held fixed.` },
    { id: "constrained-c15", type: "formula", front: "First-order conditions for an interior extreme of f(x, y)", back: r`$f_1'(x,y) = 0$ and $f_2'(x,y) = 0$`, why: "Solve simultaneously to get the stationary point(s)." },
    { id: "constrained-c16", type: "formula", front: "A, B, C in the second derivative test", back: r`$A = f_{11}''(x_0,y_0)$, $B = f_{12}''(x_0,y_0)$, $C = f_{22}''(x_0,y_0)$`, why: "Evaluated at the stationary point being tested." },
    { id: "constrained-c17", type: "formula", front: "Second derivative test: condition for a strict local maximum", back: r`$A < 0$, $C < 0$ and $AC - B^2 > 0$`, why: r`E.g. Example [5]: $A = C = -4$, $AC - B^2 = 12$ gives a max at $(5,8)$.` },
    { id: "constrained-c18", type: "formula", front: "Second derivative test: condition for a strict local minimum", back: r`$A > 0$, $C > 0$ and $AC - B^2 > 0$`, why: "Both own second partials positive and the Hessian determinant positive." },
    { id: "constrained-c19", type: "formula", front: "Second derivative test: saddle point and the inconclusive case", back: r`$AC - B^2 < 0$: saddle point. $AC - B^2 = 0$: could be max, min or saddle.`, why: "When the determinant is zero the test gives no conclusion." },
    { id: "constrained-c20", type: "formula", front: "Determinant of the 2×2 Hessian", back: r`$f_{11}''f_{22}'' - f_{12}''f_{12}'' = AC - B^2$`, why: r`Uses $f_{12}'' = f_{21}''$.` },
    { id: "constrained-c21", type: "formula", front: r`Lagrangian for max $u(x,y)$ s.t. $P_x x + P_y y = m$`, back: r`$L = u(x,y) - \lambda(P_x x + P_y y - m)$`, why: "Then set the partial derivatives with respect to x, y and λ equal to zero." },
    { id: "constrained-c22", type: "formula", front: "Lagrange first-order conditions (consumer problem)", back: r`$u_x' = \lambda P_x$, $u_y' = \lambda P_y$, $P_x x + P_y y = m$`, why: r`Dividing the first two eliminates $\lambda$: $u_x'/u_y' = P_x/P_y$.` },
    { id: "constrained-c23", type: "formula", front: r`Budget line $P_x x + P_y y = m$: intercepts and slope`, back: r`$x$-intercept $m/P_x$, $y$-intercept $m/P_y$, slope $-P_x/P_y$`, why: r`E.g. $0.5x + 0.8y = 20$ meets the axes at $x = 40$ and $y = 25$.` },
    // method
    {
      id: "constrained-c24",
      type: "method",
      front: r`Find $\dfrac{dz}{dt}$ for $F(x,y) = x^2 + y^3$, $x = t^2$, $y = 2t$.`,
      back: r`$\dfrac{dz}{dt} = 4t^3 + 24t^2$`,
      why: r`Method 1: $F_1' = 2x$, $x' = 2t$, $F_2' = 3y^2$, $y' = 2$: $2x\cdot2t + 3y^2\cdot 2 = 4t^3 + 24t^2$.
Method 2: $z = t^4 + 8t^3$, so $dz/dt = 4t^3 + 24t^2$.`,
    },
    {
      id: "constrained-c25",
      type: "method",
      front: r`How do you find $\dfrac{\partial F}{\partial t}$ and $\dfrac{\partial F}{\partial s}$ when $F = F(x,y)$, $x = f(t,s)$, $y = g(t,s)$?`,
      back: "Chain rule: F₁′·(partial of x) + F₂′·(partial of y), or substitute first and differentiate holding the other variable fixed.",
      why: r`1. Compute $F_1'$, $F_2'$.
2. Compute $\partial x/\partial t$, $\partial y/\partial t$ (or the $s$ versions).
3. $\dfrac{\partial F}{\partial t} = F_1'\dfrac{\partial x}{\partial t} + F_2'\dfrac{\partial y}{\partial t}$.
4. Replace $x$, $y$ by their formulas in $t$, $s$.
Check with Method 2: substitute, expand, differentiate.`,
    },
    {
      id: "constrained-c26",
      type: "method",
      front: r`$F = x^2 + 2y^2$, $x = t - s^2$, $y = ts$. Find $\dfrac{\partial F}{\partial t}$ and $\dfrac{\partial F}{\partial s}$.`,
      back: r`$\dfrac{\partial F}{\partial t} = 2t - 2s^2 + 4ts^2$, $\dfrac{\partial F}{\partial s} = -4ts + 4s^3 + 4t^2s$`,
      why: r`$F_1' = 2x$, $F_2' = 4y$. $\partial F/\partial t = 2x\cdot1 + 4y\cdot s = 2(t - s^2) + 4ts^2$.
$\partial F/\partial s = 2x(-2s) + 4y\cdot t = -4s(t - s^2) + 4t^2s$.`,
    },
    {
      id: "constrained-c27",
      type: "method",
      front: r`How do you find the stationary point(s) of $z = f(x,y)$?`,
      back: r`Set $f_1' = 0$ and $f_2' = 0$ and solve the two equations simultaneously.`,
      why: r`1. Differentiate partially with respect to $x$ and $y$.
2. Set both equal to $0$ (the FOC).
3. Solve (for quadratics: two linear equations; use substitution or elimination).
4. If asked, evaluate $f$ at the point.`,
    },
    {
      id: "constrained-c28",
      type: "method",
      front: r`Find the stationary point of $f = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$ and $f$ there.`,
      back: r`$(5, 8)$, $f(5,8) = 258 + \sqrt{21} \approx 262.58$`,
      why: r`$f_1' = -4x - 2y + 36 = 0$, $f_2' = -2x - 4y + 42 = 0$. From the first $y = 18 - 2x$; then $-2x - 72 + 8x + 42 = 0 \Rightarrow x = 5$, $y = 8$.`,
    },
    {
      id: "constrained-c29",
      type: "method",
      front: "How do you classify a stationary point of f(x, y)?",
      back: r`Compute $A = f_{11}''$, $B = f_{12}''$, $C = f_{22}''$ at the point and use the sign of $AC - B^2$ (and of $A$, $C$).`,
      why: r`$AC - B^2 > 0$ with $A, C < 0$: max. $AC - B^2 > 0$ with $A, C > 0$: min. $AC - B^2 < 0$: saddle. $AC - B^2 = 0$: inconclusive.`,
    },
    {
      id: "constrained-c30",
      type: "method",
      front: r`Classify the stationary point $(5,8)$ of $f = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$.`,
      back: r`$A = C = -4$, $B = -2$, $AC - B^2 = 12 > 0$: maximum point.`,
      why: r`$f_{11}'' = -4$, $f_{12}'' = f_{21}'' = -2$, $f_{22}'' = -4$. Both $A$, $C$ negative and $16 - 4 = 12 > 0$, so strict local max.`,
    },
    {
      id: "constrained-c31",
      type: "method",
      front: r`Find and classify the stationary point of $f(x,y) = \tfrac12 x^2 - 18y^2$.`,
      back: r`$(0,0)$; $A = 1$, $B = 0$, $C = -36$, $AC - B^2 = -36 < 0$: saddle point.`,
      why: r`FOC: $f_1' = x = 0$, $f_2' = -36y = 0$. The FOC alone cannot tell whether it is a max or min; the second derivative test shows it is neither.`,
    },
    {
      id: "constrained-c32",
      type: "method",
      front: r`Find and classify the stationary points of $f = x^3 - 3x + y^2 - 4y$.`,
      back: r`$(1, 2)$: local min ($AC - B^2 = 12$). $(-1, 2)$: saddle ($AC - B^2 = -12$).`,
      why: r`$f_1' = 3x^2 - 3 = 0 \Rightarrow x = \pm1$; $f_2' = 2y - 4 = 0 \Rightarrow y = 2$. $A = 6x$, $B = 0$, $C = 2$. At $x = 1$: $A = 6 > 0$, $C = 2 > 0$, $AC - B^2 = 12$. At $x = -1$: $AC - B^2 = -12 < 0$.`,
    },
    {
      id: "constrained-c33",
      type: "method",
      front: r`How do you maximise $u(x,y)$ subject to $P_x x + P_y y = m$?`,
      back: r`Lagrange: $L = u - \lambda(P_x x + P_y y - m)$; set $L_x' = L_y' = L_\lambda' = 0$; divide the first two to remove $\lambda$; substitute into the budget.`,
      why: r`1. Write the Lagrangian.
2. FOC: $u_x' - \lambda P_x = 0$, $u_y' - \lambda P_y = 0$, $P_x x + P_y y - m = 0$.
3. (Eq. 1)/(Eq. 2): $u_x'/u_y' = P_x/P_y$, giving $y$ in terms of $x$.
4. Plug into the budget constraint and solve for $x$, then $y$ (and $\lambda$ if asked).`,
    },
    {
      id: "constrained-c34",
      type: "method",
      front: r`Max $u = xy$ s.t. $0.5x + 0.8y = 20$ (satay and otah, Example [8]).`,
      back: r`$x = 20$, $y = 12.5$`,
      why: r`$L_x' = y - 0.5\lambda = 0$, $L_y' = x - 0.8\lambda = 0$. Divide: $y/x = 5/8$. Budget: $0.5x + 0.8(5x/8) = x = 20$, $y = 12.5$.`,
    },
    {
      id: "constrained-c35",
      type: "method",
      front: r`Past paper: budget 100 dollars, $P_x = 5$, $P_y = 10$, maximise $u = \tfrac14\ln(xy)$.`,
      back: r`$x = 10$, $y = 5$`,
      why: r`$L = \tfrac14\ln x + \tfrac14\ln y - \lambda(5x + 10y - 100)$. $\dfrac{1}{4x} = 5\lambda$, $\dfrac{1}{4y} = 10\lambda$; divide: $y/x = 1/2$, so $x = 2y$. Then $10y + 10y = 100$: $y = 5$, $x = 10$.`,
    },
    {
      id: "constrained-c36",
      type: "method",
      front: r`Quick check for $u = xy$ or $u = a\ln(xy)$ with budget $P_x x + P_y y = m$?`,
      back: r`Dividing the FOCs gives $P_x x = P_y y$: spend $m/2$ on each, so $x = m/(2P_x)$, $y = m/(2P_y)$.`,
      why: r`For $u = xy$: $y = \lambda P_x$, $x = \lambda P_y$. For $u = a\ln x + a\ln y$: $a/x = \lambda P_x$, $a/y = \lambda P_y$. Either way $y/x = P_x/P_y$. E.g. $m = 100$, $P_x = 5$, $P_y = 10$ gives $(10, 5)$.`,
    },
    {
      id: "constrained-c37",
      type: "method",
      front: r`Firm: maximise $Q = 4L^{0.5}K^{0.5}$ subject to $4L + K = 80$.`,
      back: r`$L = 10$, $K = 40$, $Q = 80$`,
      why: r`$L_L' = 2L^{-0.5}K^{0.5} - 4\lambda = 0$, $L_K' = 2L^{0.5}K^{-0.5} - \lambda = 0$. Divide: $K/L = 4$, so $K = 4L$. Constraint: $8L = 80$, $L = 10$, $K = 40$, $Q = 4\sqrt{400} = 80$.`,
    },
    {
      id: "constrained-c38",
      type: "method",
      front: r`Does $f(L,K) = 4L^{0.5}K^{0.5}$ have a stationary point with $L, K > 0$?`,
      back: r`No: $f_L' = 2\sqrt{K/L} > 0$ and $f_K' = 2\sqrt{L/K} > 0$, never zero.`,
      why: r`A stationary point needs both partials $= 0$. Both are strictly positive for $L, K > 0$. Its minimum value $0$ on $L, K \ge 0$ is reached on the boundary ($L = 0$ or $K = 0$), not at an interior stationary point.`,
    },
    {
      id: "constrained-c39",
      type: "method",
      front: r`Growth model: $Y = K^{1/2}L^{1/2}$ with $K = t + 3$, $L = 4t$. Find $\dfrac{dY}{dt}$ at $t = 1$.`,
      back: r`$\dfrac{dY}{dt} = 2.5$`,
      why: r`At $t = 1$: $K = L = 4$. $F_K' = \tfrac12 K^{-1/2}L^{1/2} = \tfrac12$, $dK/dt = 1$; $F_L' = \tfrac12 K^{1/2}L^{-1/2} = \tfrac12$, $dL/dt = 4$. $dY/dt = \tfrac12\cdot1 + \tfrac12\cdot4 = 2.5$.`,
    },
  ],

  // ==================================================================== quiz
  quiz: [
    // 11.1
    {
      id: "constrained-q1",
      kind: "mcq",
      sub: "Simple chain rule",
      prompt: "Which best describes a composite function in the sense of Lecture Note 11?",
      options: [
        "A function whose variables are themselves functions of other basic variables",
        "A function that is the sum of two other functions",
        "A function with two or more stationary points",
        "A function defined only on a constraint",
      ],
      answer: 0,
      explain: "Composite functions are functions of one or several variables in which the variables are themselves functions of other basic variables, e.g. output F(K, L) where K and L depend on time.",
    },
    {
      id: "constrained-q2",
      kind: "mcq",
      sub: "Simple chain rule",
      prompt: r`For $z = F(x,y)$ with $x = f(t)$ and $y = g(t)$, the total derivative $\dfrac{dz}{dt}$ equals`,
      options: [
        r`$F_1'(x,y)\dfrac{dx}{dt} + F_2'(x,y)\dfrac{dy}{dt}$`,
        r`$F_1'(x,y) + F_2'(x,y)$`,
        r`$F_1'(x,y)\dfrac{dx}{dt}\cdot F_2'(x,y)\dfrac{dy}{dt}$`,
        r`$\dfrac{dx}{dt} + \dfrac{dy}{dt}$`,
      ],
      answer: 0,
      explain: r`Each channel contributes (effect of the variable on $F$) × (how fast the variable changes with $t$), and the two channels are **added**.`,
    },
    {
      id: "constrained-q3",
      kind: "mcq",
      sub: "Simple chain rule",
      prompt: r`$F(x,y) = x^2 + y^3$ with $x = t^2$ and $y = 2t$. Then $\dfrac{dz}{dt} =$`,
      options: [r`$4t^3 + 24t^2$`, r`$4t^3 + 24t$`, r`$2t + 6t^2$`, r`$4t^3 + 8t^3$`],
      answer: 0,
      explain: r`$F_1' = 2x$, $\dfrac{dx}{dt} = 2t$; $F_2' = 3y^2$, $\dfrac{dy}{dt} = 2$. So $\dfrac{dz}{dt} = 2t^2\cdot 2t + 3(2t)^2\cdot 2 = 4t^3 + 24t^2$. Check: $z = t^4 + 8t^3$ gives the same. ($24t$ forgets that $y^2 = 4t^2$.)`,
    },
    {
      id: "constrained-q4",
      kind: "fill",
      sub: "Simple chain rule",
      prompt: r`With $F(x,y) = x^2 + y^3$, $x = t^2$, $y = 2t$, the value of $\dfrac{dz}{dt}$ at $t = 1$ is ____.`,
      answers: [["28"]],
      explain: r`$\dfrac{dz}{dt} = 4t^3 + 24t^2 = 4 + 24 = 28$ at $t = 1$.`,
    },
    {
      id: "constrained-q5",
      kind: "fill",
      sub: "Simple chain rule",
      prompt: r`Let $z = xy$ with $x = t^2$ and $y = t^3$. At $t = 1$, $\dfrac{dz}{dt} =$ ____.`,
      answers: [["5"]],
      explain: r`Chain rule: $y\cdot 2t + x\cdot 3t^2 = t^3\cdot 2t + t^2\cdot 3t^2 = 5t^4$, which is $5$ at $t = 1$. Check: $z = t^5$, $dz/dt = 5t^4$.`,
    },
    {
      id: "constrained-q6",
      kind: "fill",
      sub: "Simple chain rule",
      prompt: r`Output is $Y = K^{1/2}L^{1/2}$ with capital $K = 4t^2$ and labour $L = t^2$. At $t = 2$, $\dfrac{dY}{dt} =$ ____.`,
      answers: [["8"]],
      explain: r`$F_K' = \tfrac12\sqrt{L/K} = \tfrac12\cdot\tfrac12 = \tfrac14$, $dK/dt = 8t$; $F_L' = \tfrac12\sqrt{K/L} = \tfrac12\cdot 2 = 1$, $dL/dt = 2t$. So $dY/dt = \tfrac14\cdot 8t + 1\cdot 2t = 4t = 8$ at $t = 2$. Check: $Y = \sqrt{4t^4} = 2t^2$, $dY/dt = 4t$.`,
    },
    // 11.2
    {
      id: "constrained-q7",
      kind: "mcq",
      sub: "Chain rule, many variables",
      prompt: r`$F(x,y) = x^2 + 2y^2$ with $x = t - s^2$, $y = ts$. Then $\dfrac{\partial F}{\partial t} =$`,
      options: [r`$2t - 2s^2 + 4ts^2$`, r`$2t + 4ts^2$`, r`$2t - 2s^2 + 4t^2s$`, r`$2x + 4y$`],
      answer: 0,
      explain: r`$\dfrac{\partial F}{\partial t} = F_1'\dfrac{\partial x}{\partial t} + F_2'\dfrac{\partial y}{\partial t} = 2x\cdot 1 + 4y\cdot s = 2(t - s^2) + 4ts^2$.`,
    },
    {
      id: "constrained-q8",
      kind: "mcq",
      sub: "Chain rule, many variables",
      prompt: r`Same $F$: $F = x^2 + 2y^2$, $x = t - s^2$, $y = ts$. Then $\dfrac{\partial F}{\partial s} =$`,
      options: [r`$-4ts + 4s^3 + 4t^2s$`, r`$-4ts + 2s^3 + 4t^2s$`, r`$2t - 2s^2 + 4ts^2$`, r`$-2s + 4t$`],
      answer: 0,
      explain: r`$\dfrac{\partial x}{\partial s} = -2s$, $\dfrac{\partial y}{\partial s} = t$. So $2x(-2s) + 4y\cdot t = -4s(t - s^2) + 4t^2s = -4ts + 4s^3 + 4t^2s$.`,
    },
    {
      id: "constrained-q9",
      kind: "fill",
      sub: "Chain rule, many variables",
      prompt: r`For $F = x^2 + 2y^2$, $x = t - s^2$, $y = ts$, the value of $\dfrac{\partial F}{\partial t}$ at $t = 1$, $s = 1$ is ____.`,
      answers: [["4"]],
      explain: r`$\dfrac{\partial F}{\partial t} = 2t - 2s^2 + 4ts^2 = 2 - 2 + 4 = 4$.`,
    },
    {
      id: "constrained-q10",
      kind: "mcq",
      sub: "Chain rule, many variables",
      prompt: r`When computing $\dfrac{\partial F}{\partial s}$ for $F(x,y)$ with $x = f(t,s)$, $y = g(t,s)$, which variable is held fixed?`,
      options: [r`$t$`, r`$s$`, r`$x$`, r`Both $x$ and $y$`],
      answer: 0,
      explain: r`A partial derivative with respect to $s$ holds the other basic variable, $t$, fixed. $x$ and $y$ still change because they depend on $s$.`,
    },
    {
      id: "constrained-q11",
      kind: "fill",
      sub: "Chain rule, many variables",
      prompt: r`$F(x,y) = x + y^2$ with $x = ts$ and $y = t + s$. At $t = 2$, $s = 1$, $\dfrac{\partial F}{\partial s} =$ ____.`,
      answers: [["8"]],
      explain: r`$F_1' = 1$, $\dfrac{\partial x}{\partial s} = t = 2$; $F_2' = 2y = 2(3) = 6$, $\dfrac{\partial y}{\partial s} = 1$. So $1\cdot 2 + 6\cdot 1 = 8$. Check: $F = ts + (t+s)^2$, $\partial F/\partial s = t + 2(t+s) = 2 + 6 = 8$.`,
    },
    // 11.3
    {
      id: "constrained-q12",
      kind: "mcq",
      sub: "Necessary conditions",
      prompt: r`The first-order conditions for an interior stationary point of $z = f(x,y)$ are`,
      options: [
        r`$f_1'(x,y) = 0$ and $f_2'(x,y) = 0$`,
        r`$f_1'(x,y) + f_2'(x,y) = 0$`,
        r`$f_{11}''(x,y) = 0$ and $f_{22}''(x,y) = 0$`,
        r`$f(x,y) = 0$`,
      ],
      answer: 0,
      explain: "A stationary point makes BOTH first-order partial derivatives zero. One sum being zero is not enough, and second derivatives belong to the sufficient conditions.",
    },
    {
      id: "constrained-q13",
      kind: "mcq",
      sub: "Necessary conditions",
      prompt: "The first-order conditions are called necessary conditions because",
      options: [
        "any interior max or min must satisfy them, but a point satisfying them need not be a max or min",
        "any point satisfying them is a maximum",
        "any point satisfying them is a maximum or a minimum",
        "they are needed only when there is a constraint",
      ],
      answer: 0,
      explain: r`If an interior point is a max or min it MUST satisfy the FOC; but not every stationary point is a max or min (e.g. the saddle point $(0,0)$ of $\tfrac12x^2 - 18y^2$).`,
    },
    {
      id: "constrained-q14",
      kind: "fill",
      sub: "Necessary conditions",
      prompt: r`The stationary point of $f(x,y) = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$ is $x_0 =$ ____ and $y_0 =$ ____.`,
      answers: [["5"], ["8"]],
      explain: r`$-4x - 2y + 36 = 0$ and $-2x - 4y + 42 = 0$. From the first $y = 18 - 2x$; substituting, $-2x - 72 + 8x + 42 = 0$, so $x = 5$, $y = 8$.`,
    },
    {
      id: "constrained-q15",
      kind: "fill",
      sub: "Necessary conditions",
      prompt: r`For the same function, $f(5, 8) =$ ____ (2 decimal places).`,
      answers: [["262.58"]],
      explain: r`$f(5,8) = -50 - 80 - 128 + 180 + 336 + \sqrt{21} = 258 + 4.58 = 262.58$.`,
    },
    {
      id: "constrained-q16",
      kind: "mcq",
      sub: "Necessary conditions",
      prompt: r`The stationary point of $f(x,y) = x^2 + y^2 - 4x + 6y$ is`,
      options: [r`$(2, -3)$`, r`$(-2, 3)$`, r`$(4, -6)$`, r`$(2, 3)$`],
      answer: 0,
      explain: r`$f_1' = 2x - 4 = 0 \Rightarrow x = 2$; $f_2' = 2y + 6 = 0 \Rightarrow y = -3$.`,
    },
    {
      id: "constrained-q17",
      kind: "fill",
      sub: "Necessary conditions",
      prompt: r`The stationary point of $f(x,y) = x^2 + xy + y^2 - 6x$ is $x_0 =$ ____ and $y_0 =$ ____.`,
      answers: [["4"], ["-2"]],
      explain: r`$f_1' = 2x + y - 6 = 0$, $f_2' = x + 2y = 0 \Rightarrow x = -2y$. Then $-4y + y = 6$, so $y = -2$, $x = 4$.`,
    },
    {
      id: "constrained-q18",
      kind: "mcq",
      sub: "Necessary conditions",
      prompt: "Which statement about a stationary point of a two-variable function is correct?",
      options: [
        "It can be a maximum, a minimum, or neither",
        "It is always a maximum or a minimum",
        "It is always a saddle point",
        "It can only occur on the boundary of the domain",
      ],
      answer: 0,
      explain: "Remark (a) in the notes: a stationary point can be a maximum, a minimum or not a max/min. The second-order test decides which.",
    },
    // 11.4
    {
      id: "constrained-q19",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`With $A = f_{11}''$, $B = f_{12}''$, $C = f_{22}''$, the quantity $AC - B^2$ is`,
      options: [
        "the determinant of the Hessian matrix",
        "the trace of the Hessian matrix",
        "the sum of the first-order partial derivatives",
        "the Lagrange multiplier",
      ],
      answer: 0,
      explain: r`The Hessian is $\begin{pmatrix} A & B \\ B & C\end{pmatrix}$, whose determinant is $AC - B\cdot B = AC - B^2$.`,
    },
    {
      id: "constrained-q20",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`For $f = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$ at $(5,8)$: $A = -4$, $B = -2$, $C = -4$. The point is`,
      options: ["a strict local maximum", "a strict local minimum", "a saddle point", "impossible to classify"],
      answer: 0,
      explain: r`$A < 0$, $C < 0$ and $AC - B^2 = 16 - 4 = 12 > 0$, so case (i): strict local maximum.`,
    },
    {
      id: "constrained-q21",
      kind: "fill",
      sub: "Second derivative test",
      prompt: r`In Example [5] ($A = -4$, $B = -2$, $C = -4$), the determinant of the Hessian is $AC - B^2 =$ ____.`,
      answers: [["12"]],
      explain: r`$(-4)(-4) - (-2)^2 = 16 - 4 = 12$.`,
    },
    {
      id: "constrained-q22",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`The stationary point $(0,0)$ of $f(x,y) = \tfrac12x^2 - 18y^2$ is`,
      options: ["a saddle point", "a strict local maximum", "a strict local minimum", "not a stationary point"],
      answer: 0,
      explain: r`$A = 1$, $B = 0$, $C = -36$; $AC - B^2 = -36 < 0$, so saddle point. ($f$ rises along the $x$-axis and falls along the $y$-axis.)`,
    },
    {
      id: "constrained-q23",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`At an interior stationary point, $AC - B^2 = 0$. What can you conclude?`,
      options: [
        "It could be a local maximum, a local minimum or a saddle point",
        "It is a saddle point",
        "It is a local maximum",
        "It is a local minimum",
      ],
      answer: 0,
      explain: "Case (iv) of the theorem: when AC − B² = 0 the test is inconclusive.",
    },
    {
      id: "constrained-q24",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`Classify the stationary point $(4, -2)$ of $f(x,y) = x^2 + xy + y^2 - 6x$.`,
      options: ["strict local minimum", "strict local maximum", "saddle point", "inconclusive"],
      answer: 0,
      explain: r`$A = 2$, $B = 1$, $C = 2$. $A, C > 0$ and $AC - B^2 = 4 - 1 = 3 > 0$, so strict local minimum.`,
    },
    {
      id: "constrained-q25",
      kind: "fill",
      sub: "Second derivative test",
      prompt: r`The minimum value of $f(x,y) = x^2 + xy + y^2 - 6x$, at $(4,-2)$, is ____.`,
      answers: [["-12"]],
      explain: r`$f(4,-2) = 16 + (4)(-2) + 4 - 24 = 16 - 8 + 4 - 24 = -12$.`,
    },
    {
      id: "constrained-q26",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`At a stationary point, $A = 2$, $B = 3$, $C = 4$. The point is`,
      options: ["a saddle point", "a strict local minimum", "a strict local maximum", "inconclusive"],
      answer: 0,
      explain: r`$AC - B^2 = 8 - 9 = -1 < 0$, so it is a saddle point, even though $A$ and $C$ are both positive. Always check $AC - B^2$ first.`,
    },
    {
      id: "constrained-q27",
      kind: "mcq",
      sub: "Second derivative test",
      prompt: r`$f(x,y) = x^3 - 3x + y^2 - 4y$ has stationary points $(1,2)$ and $(-1,2)$. Which is correct?`,
      options: [
        r`$(1,2)$ is a local minimum and $(-1,2)$ is a saddle point`,
        r`$(1,2)$ is a saddle point and $(-1,2)$ is a local minimum`,
        "both are local minima",
        r`$(1,2)$ is a local maximum and $(-1,2)$ is a local minimum`,
      ],
      answer: 0,
      explain: r`$A = 6x$, $B = 0$, $C = 2$. At $(1,2)$: $A = 6$, $AC - B^2 = 12 > 0$, min. At $(-1,2)$: $A = -6$, $AC - B^2 = -12 < 0$, saddle.`,
    },
    // 11.5
    {
      id: "constrained-q28",
      kind: "mcq",
      sub: "Lagrange method",
      prompt: r`The Lagrangian for "maximise $u(x,y)$ subject to $P_x x + P_y y = m$" is`,
      options: [
        r`$L = u(x,y) - \lambda(P_x x + P_y y - m)$`,
        r`$L = u(x,y) - \lambda(P_x + P_y - m)$`,
        r`$L = \lambda u(x,y) - (P_x x + P_y y)$`,
        r`$L = u(x,y) + P_x x + P_y y - m$`,
      ],
      answer: 0,
      explain: r`Subtract $\lambda$ times the constraint written as "$\ldots = 0$": $P_x x + P_y y - m = 0$.`,
    },
    {
      id: "constrained-q29",
      kind: "mcq",
      sub: "Lagrange method",
      prompt: r`In the Lagrange method, the first-order condition $L_\lambda' = 0$ is`,
      options: [
        r`the budget constraint, $P_x x + P_y y - m = 0$`,
        r`$u_x' = \lambda P_x$`,
        r`$\lambda = 0$`,
        r`$u_x'/u_y' = P_x/P_y$`,
      ],
      answer: 0,
      explain: r`$\dfrac{\partial}{\partial\lambda}\left[u - \lambda(P_x x + P_y y - m)\right] = -(P_x x + P_y y - m)$; setting it to $0$ reproduces the budget constraint.`,
    },
    {
      id: "constrained-q30",
      kind: "mcq",
      sub: "Graphical view",
      prompt: r`In Example [7], level curves $u = c_1$, $c_2$, $c_3$ with $c_3 > c_2 > c_1$ are drawn with the budget line, and $u = c_2$ touches the line at $P$. Which is correct?`,
      options: [
        r`$c_3$ is not feasible and $c_2$ is the maximum utility`,
        r`$c_3$ is the maximum utility because it is the highest`,
        r`$c_1$ is optimal because it crosses the budget line twice`,
        "every point on the budget line gives the same utility",
      ],
      answer: 0,
      explain: r`$c_3$ lies beyond the budget (not achievable). $c_1$ is affordable but other bundles on the line are better. $c_2$ is the highest level the budget can reach, at $P$.`,
    },
    {
      id: "constrained-q31",
      kind: "mcq",
      sub: "Graphical view",
      prompt: r`The budget line $0.5x + 0.8y = 20$ meets the axes at`,
      options: [r`$x = 40$ and $y = 25$`, r`$x = 10$ and $y = 16$`, r`$x = 25$ and $y = 40$`, r`$x = 20$ and $y = 12.5$`],
      answer: 0,
      explain: r`Set $y = 0$: $x = 20/0.5 = 40$. Set $x = 0$: $y = 20/0.8 = 25$. ($(20, 12.5)$ is the optimum, not an intercept.)`,
    },
    {
      id: "constrained-q32",
      kind: "mcq",
      sub: "Lagrange method",
      prompt: r`For $u = xy$ the Lagrange FOCs are $y = \lambda P_x$ and $x = \lambda P_y$. Dividing them gives`,
      options: [r`$\dfrac{y}{x} = \dfrac{P_x}{P_y}$`, r`$\dfrac{y}{x} = \dfrac{P_y}{P_x}$`, r`$xy = P_x P_y$`, r`$x = y$`],
      answer: 0,
      explain: r`$\dfrac{y}{x} = \dfrac{\lambda P_x}{\lambda P_y} = \dfrac{P_x}{P_y}$, so $P_x x = P_y y$. In Example [8], $y/x = 0.5/0.8 = 5/8$.`,
    },
    {
      id: "constrained-q33",
      kind: "fill",
      sub: "Utility maximisation",
      prompt: r`Example [8]: maximise $u = xy$ subject to $0.5x + 0.8y = 20$. Then $x =$ ____ and $y =$ ____.`,
      answers: [["20"], ["12.5"]],
      explain: r`$y/x = 5/8$, so $y = \tfrac58x$. Budget: $0.5x + 0.8\cdot\tfrac58x = x = 20$; $y = \tfrac58\cdot20 = 12.5$.`,
    },
    {
      id: "constrained-q34",
      kind: "mcq",
      sub: "Utility maximisation",
      prompt: r`In Example [8] ($L = xy - \lambda(0.5x + 0.8y - 20)$), the value of $\lambda$ at the optimum is`,
      options: [r`$25$`, r`$12.5$`, r`$0.625$`, r`$40$`],
      answer: 0,
      explain: r`From $L_x' = y - 0.5\lambda = 0$: $\lambda = y/0.5 = 12.5/0.5 = 25$. Check with $L_y'$: $x - 0.8\lambda = 20 - 20 = 0$.`,
    },
    {
      id: "constrained-q35",
      kind: "fill",
      sub: "Utility maximisation",
      prompt: r`Past paper: budget 100 dollars, $P_x = 5$, $P_y = 10$, $u = \tfrac14\ln(xy)$. The optimal quantities are $x =$ ____ and $y =$ ____.`,
      answers: [["10"], ["5"]],
      explain: r`$\dfrac{1}{4x} = 5\lambda$ and $\dfrac{1}{4y} = 10\lambda$; dividing, $y/x = 1/2$ so $x = 2y$. Then $5(2y) + 10y = 100$: $y = 5$, $x = 10$.`,
    },
    {
      id: "constrained-q36",
      kind: "fill",
      sub: "Utility maximisation",
      prompt: r`Maximise $u = xy$ subject to $4x + 2y = 48$. Then $x =$ ____ and $y =$ ____.`,
      answers: [["6"], ["12"]],
      explain: r`$y = 4\lambda$, $x = 2\lambda$, so $y/x = 2$, $y = 2x$. Budget: $4x + 4x = 48$, $x = 6$, $y = 12$.`,
    },
    {
      id: "constrained-q37",
      kind: "mcq",
      sub: "Utility maximisation",
      prompt: r`Maximise $u = \tfrac14\ln(xy)$ subject to $3x + 4y = 120$. The optimum is`,
      options: [r`$(20, 15)$`, r`$(15, 20)$`, r`$(40, 30)$`, r`$(20, 30)$`],
      answer: 0,
      explain: r`$\dfrac{1}{4x} = 3\lambda$, $\dfrac{1}{4y} = 4\lambda$ give $y/x = 3/4$, i.e. $3x = 4y$: 60 dollars on each good. So $x = 60/3 = 20$, $y = 60/4 = 15$. Check: $60 + 60 = 120$.`,
    },
    {
      id: "constrained-q38",
      kind: "fill",
      sub: "Production with a cost constraint",
      prompt: r`A firm maximises $Q = 4L^{0.5}K^{0.5}$ subject to $4L + K = 80$. Then $L =$ ____, $K =$ ____ and the maximum output is $Q =$ ____.`,
      answers: [["10"], ["40"], ["80"]],
      explain: r`$2L^{-0.5}K^{0.5} = 4\lambda$ and $2L^{0.5}K^{-0.5} = \lambda$. Dividing: $K/L = 4$, so $K = 4L$. Cost: $4L + 4L = 80$, $L = 10$, $K = 40$, $Q = 4\sqrt{400} = 80$.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "constrained-x1",
      kind: "calc",
      sub: "Utility maximisation (Lagrange)",
      prompt: r`Suppose you have a budget of 100 dollars and would like to spend all your money on buying quantities $x$ and $y$ of two goods. If the unit price for $x$ is 5 dollars and for $y$ is 10 dollars, find the quantities $x$ and $y$ that maximise your utility function $u(x,y) = \tfrac14\ln(xy)$.`,
      marks: 5,
      rubric: [
        { point: r`Correct Lagrangian $L = \tfrac14\ln(xy) - \lambda(5x + 10y - 100)$`, marks: 1 },
        { point: r`Correct FOCs $\dfrac{1}{4x} - 5\lambda = 0$, $\dfrac{1}{4y} - 10\lambda = 0$, $5x + 10y = 100$`, marks: 1.5 },
        { point: r`Eliminates $\lambda$ to get $x = 2y$`, marks: 1 },
        { point: r`$x = 10$, $y = 5$`, marks: 1.5 },
      ],
      model: r`Maximise $u(x,y) = \tfrac14\ln(xy) = \tfrac14\ln x + \tfrac14\ln y$ subject to $5x + 10y = 100$.
Lagrangian: $L(x,y) = \tfrac14\ln x + \tfrac14\ln y - \lambda(5x + 10y - 100)$.
FOC:
(1) $L_x' = \dfrac{1}{4x} - 5\lambda = 0$
(2) $L_y' = \dfrac{1}{4y} - 10\lambda = 0$
(3) $L_\lambda' = 5x + 10y - 100 = 0$
(1)/(2): $\dfrac{1/(4x)}{1/(4y)} = \dfrac{5\lambda}{10\lambda} \Rightarrow \dfrac{y}{x} = \dfrac12 \Rightarrow x = 2y$.
Into (3): $5(2y) + 10y = 100 \Rightarrow 20y = 100 \Rightarrow y = 5$, so $x = 10$.
($\lambda = \dfrac{1}{4x\cdot5} = \dfrac{1}{200} = 0.005$.) The utility-maximising bundle is $x = 10$, $y = 5$, with $u = \tfrac14\ln 50 \approx 0.978$.`,
      answer: r`$x = 10$, $y = 5$`,
      figures: [
        {
          title: "Budget line 5x + 10y = 100 and level curves xy = c",
          xr: [0, 22],
          yr: [0, 12],
          curves: [
            { f: "10 - 0.5*x", from: 0, to: 20, tone: 3, label: "5x + 10y = 100" },
            { f: "50/x", from: 4.2, to: 22, tone: 0, label: "xy = 50" },
          ],
          points: [{ at: [10, 5], label: "(10, 5)", guides: true }],
        },
      ],
      source: "Past paper Q4(b)",
    },
    {
      id: "constrained-x2",
      kind: "calc",
      sub: "Utility maximisation (Lagrange)",
      prompt: r`The utility function is $u(x,y) = xy$, where $x$ is the quantity of satay and $y$ the quantity of otah. A satay costs 0.50 dollars and an otah 0.80 dollars, and the budget is 20 dollars. Using the method of Lagrange multipliers, find the utility-maximising combination and the value of $\lambda$.`,
      marks: 5,
      rubric: [
        { point: r`Lagrangian $L = xy - \lambda(0.5x + 0.8y - 20)$ and the three FOCs`, marks: 2 },
        { point: r`Divides to obtain $y = \tfrac58x$`, marks: 1 },
        { point: r`$x = 20$, $y = 12.5$`, marks: 1.5 },
        { point: r`$\lambda = 25$`, marks: 0.5 },
      ],
      model: r`Max $u = xy$ subject to $0.5x + 0.8y = 20$. $L(x,y) = xy - \lambda(0.5x + 0.8y - 20)$.
(Eq. 1) $L_x' = y - 0.5\lambda = 0$
(Eq. 2) $L_y' = x - 0.8\lambda = 0$
(Eq. 3) $L_\lambda' = 0.5x + 0.8y - 20 = 0$
(Eq. 1)/(Eq. 2): $\dfrac{y}{x} = \dfrac{0.5}{0.8} = \dfrac58$, so $y = \dfrac58x$.
(Eq. 3): $0.5x + 0.8\cdot\dfrac58x = 20 \Rightarrow x = 20$; $y = \dfrac58(20) = 12.5$.
From (Eq. 1): $\lambda = y/0.5 = 25$ (check (Eq. 2): $20 - 0.8(25) = 0$).
Buy 20 satays and 12.5 otah.`,
      answer: r`$x = 20$, $y = 12.5$, $\lambda = 25$`,
      source: "Lecture Note 11 Example [8]",
    },
    {
      id: "constrained-x3",
      kind: "calc",
      sub: "Utility maximisation (Lagrange)",
      prompt: r`A consumer with income 48 dollars spends it all on goods $x$ (price 4 dollars) and $y$ (price 2 dollars). Her utility is $u(x,y) = xy$. Find the utility-maximising quantities and the maximum utility.`,
      marks: 5,
      rubric: [
        { point: r`Lagrangian and FOCs $y = 4\lambda$, $x = 2\lambda$, $4x + 2y = 48$`, marks: 2 },
        { point: r`Eliminates $\lambda$: $y = 2x$`, marks: 1 },
        { point: r`$x = 6$, $y = 12$, $u = 72$`, marks: 2 },
      ],
      model: r`$L = xy - \lambda(4x + 2y - 48)$.
$L_x' = y - 4\lambda = 0$, $L_y' = x - 2\lambda = 0$, $L_\lambda' = 4x + 2y - 48 = 0$.
Dividing the first two: $\dfrac{y}{x} = \dfrac{4}{2} = 2$, so $y = 2x$.
Budget: $4x + 2(2x) = 48 \Rightarrow 8x = 48 \Rightarrow x = 6$, $y = 12$ ($\lambda = 3$).
Maximum utility $u = 6\times12 = 72$.`,
      answer: r`$x = 6$, $y = 12$, $u = 72$`,
      source: "Modelled on Lecture Note 11 Example [8]",
    },
    {
      id: "constrained-x4",
      kind: "calc",
      sub: "Utility maximisation (Lagrange)",
      prompt: r`A consumer has 90 dollars to spend on goods $x$ (price 3 dollars) and $y$ (price 1 dollar). Find the quantities that maximise $u(x,y) = \ln(x^2y)$.`,
      marks: 5,
      rubric: [
        { point: r`Writes $u = 2\ln x + \ln y$ (or differentiates correctly) and forms the Lagrangian`, marks: 1 },
        { point: r`FOCs $\dfrac{2}{x} = 3\lambda$, $\dfrac{1}{y} = \lambda$, $3x + y = 90$`, marks: 1.5 },
        { point: r`Eliminates $\lambda$: $y = 1.5x$`, marks: 1 },
        { point: r`$x = 20$, $y = 30$`, marks: 1.5 },
      ],
      model: r`$u = \ln(x^2y) = 2\ln x + \ln y$. $L = 2\ln x + \ln y - \lambda(3x + y - 90)$.
$L_x' = \dfrac{2}{x} - 3\lambda = 0$, $L_y' = \dfrac{1}{y} - \lambda = 0$, $L_\lambda' = 3x + y - 90 = 0$.
Dividing: $\dfrac{2/x}{1/y} = \dfrac{2y}{x} = 3 \Rightarrow y = 1.5x$.
Budget: $3x + 1.5x = 90 \Rightarrow x = 20$, $y = 30$ ($\lambda = 1/30$).`,
      answer: r`$x = 20$, $y = 30$`,
      source: "Modelled on Past paper Q4(b)",
    },
    {
      id: "constrained-x5",
      kind: "calc",
      sub: "Utility maximisation (Lagrange)",
      prompt: r`Maximise $u(x,y) = x^2y$ subject to the budget constraint $x + 2y = 30$, using a Lagrangian. Give $x$, $y$, $\lambda$ and the maximum utility.`,
      marks: 5,
      rubric: [
        { point: r`Lagrangian and FOCs $2xy = \lambda$, $x^2 = 2\lambda$, $x + 2y = 30$`, marks: 2 },
        { point: r`Eliminates $\lambda$: $x = 4y$`, marks: 1 },
        { point: r`$x = 20$, $y = 5$`, marks: 1 },
        { point: r`$\lambda = 200$, $u = 2000$`, marks: 1 },
      ],
      model: r`$L = x^2y - \lambda(x + 2y - 30)$.
$L_x' = 2xy - \lambda = 0$, $L_y' = x^2 - 2\lambda = 0$, $L_\lambda' = x + 2y - 30 = 0$.
Dividing: $\dfrac{2xy}{x^2} = \dfrac{1}{2} \Rightarrow \dfrac{2y}{x} = \dfrac12 \Rightarrow x = 4y$.
Budget: $4y + 2y = 30 \Rightarrow y = 5$, $x = 20$.
$\lambda = 2xy = 2(20)(5) = 200$ (check: $x^2 = 400 = 2\lambda$ ✓). $u = 20^2\cdot5 = 2000$.`,
      answer: r`$x = 20$, $y = 5$, $\lambda = 200$, $u = 2000$`,
      source: "Modelled on Lecture Note 11 Example [8]",
    },
    {
      id: "constrained-x6",
      kind: "calc",
      sub: "Production with a cost constraint",
      prompt: r`A firm has production function $Q = 4L^{0.5}K^{0.5}$. Labour costs 4 dollars per unit and capital 1 dollar per unit, and the firm's cost cannot exceed 80 dollars (it spends all of it). Use the Lagrange method to find the output-maximising $L$ and $K$, and the maximum output.`,
      marks: 5,
      rubric: [
        { point: r`Lagrangian $4L^{0.5}K^{0.5} - \lambda(4L + K - 80)$ and FOCs`, marks: 2 },
        { point: r`Eliminates $\lambda$: $K = 4L$`, marks: 1 },
        { point: r`$L = 10$, $K = 40$`, marks: 1 },
        { point: r`$Q = 80$`, marks: 1 },
      ],
      model: r`Max $Q = 4L^{0.5}K^{0.5}$ subject to $4L + K = 80$. $\mathcal{L} = 4L^{0.5}K^{0.5} - \lambda(4L + K - 80)$.
$\mathcal{L}_L' = 2L^{-0.5}K^{0.5} - 4\lambda = 0$
$\mathcal{L}_K' = 2L^{0.5}K^{-0.5} - \lambda = 0$
$\mathcal{L}_\lambda' = 4L + K - 80 = 0$
Dividing the first two: $\dfrac{2L^{-0.5}K^{0.5}}{2L^{0.5}K^{-0.5}} = \dfrac{K}{L} = 4 \Rightarrow K = 4L$.
Constraint: $4L + 4L = 80 \Rightarrow L = 10$, $K = 40$.
$Q = 4\sqrt{10\cdot40} = 4\sqrt{400} = 80$ ($\lambda = 2\sqrt{10/40} = 1$).`,
      answer: r`$L = 10$, $K = 40$, $Q = 80$`,
      source: "Modelled on Lecture Note 11 §11.5 (firm with a cost constraint) and Past paper Q4(c)",
    },
    {
      id: "constrained-x7",
      kind: "calc",
      sub: "Unconstrained max/min",
      prompt: r`Consider $f(x,y) = -2x^2 - 2xy - 2y^2 + 36x + 42y + \sqrt{21}$. Find the stationary point, the value of $f$ there, and use the second derivative test to classify it.`,
      marks: 5,
      rubric: [
        { point: r`FOCs $-4x - 2y + 36 = 0$, $-2x - 4y + 42 = 0$`, marks: 1 },
        { point: r`Stationary point $(5, 8)$ and $f(5,8) \approx 262.58$`, marks: 1.5 },
        { point: r`$A = -4$, $B = -2$, $C = -4$, $AC - B^2 = 12$`, marks: 1.5 },
        { point: "Concludes strict local maximum with reason", marks: 1 },
      ],
      model: r`FOC: $f_1' = -4x - 2y + 36 = 0$ and $f_2' = -2x - 4y + 42 = 0$.
From the first, $y = 18 - 2x$. Substituting: $-2x - 4(18 - 2x) + 42 = 0 \Rightarrow 6x = 30 \Rightarrow x = 5$, $y = 8$.
$f(5,8) = -50 - 80 - 128 + 180 + 336 + \sqrt{21} = 258 + \sqrt{21} \approx 262.58$.
Second-order partials: $A = f_{11}'' = -4$, $B = f_{12}'' = -2$, $C = f_{22}'' = -4$.
$A < 0$, $C < 0$ and $AC - B^2 = 16 - 4 = 12 > 0$, so $(5, 8)$ is a strict local maximum point, with maximum value $\approx 262.58$.`,
      answer: r`$(5, 8)$ is a maximum; $f(5,8) = 258 + \sqrt{21} \approx 262.58$`,
      source: "Lecture Note 11 Examples [4] and [5]",
    },
    {
      id: "constrained-x8",
      kind: "calc",
      sub: "Unconstrained max/min",
      prompt: r`Find the stationary point of $f(x,y) = x^2 + 2y^2 - 2xy - 4y + 5$, classify it using the second derivative test, and find the value of $f$ there.`,
      marks: 5,
      rubric: [
        { point: r`FOCs $2x - 2y = 0$ and $4y - 2x - 4 = 0$`, marks: 1 },
        { point: r`Stationary point $(2, 2)$`, marks: 1 },
        { point: r`$A = 2$, $B = -2$, $C = 4$, $AC - B^2 = 4 > 0$`, marks: 1.5 },
        { point: r`Strict local minimum, $f(2,2) = 1$`, marks: 1.5 },
      ],
      model: r`FOC: $f_1' = 2x - 2y = 0 \Rightarrow x = y$; $f_2' = 4y - 2x - 4 = 0 \Rightarrow 4y - 2y - 4 = 0 \Rightarrow y = 2$, so $x = 2$.
$A = f_{11}'' = 2$, $B = f_{12}'' = -2$, $C = f_{22}'' = 4$.
$A > 0$, $C > 0$, $AC - B^2 = 8 - 4 = 4 > 0$, so $(2,2)$ is a strict local minimum.
$f(2,2) = 4 + 8 - 8 - 8 + 5 = 1$.`,
      answer: r`$(2,2)$, strict local minimum, $f(2,2) = 1$`,
      source: "Modelled on Lecture Note 11 Examples [4] and [5]",
    },
    {
      id: "constrained-x9",
      kind: "calc",
      sub: "Unconstrained max/min",
      prompt: r`Find all stationary points of $f(x,y) = x^3 - 3x + y^2 - 4y$ and classify each one using the second derivative test.`,
      marks: 5,
      rubric: [
        { point: r`FOCs $3x^2 - 3 = 0$ and $2y - 4 = 0$`, marks: 1 },
        { point: r`Stationary points $(1, 2)$ and $(-1, 2)$`, marks: 1 },
        { point: r`$A = 6x$, $B = 0$, $C = 2$ evaluated at each point`, marks: 1 },
        { point: r`$(1,2)$: $AC - B^2 = 12 > 0$, $A, C > 0$, local minimum`, marks: 1 },
        { point: r`$(-1,2)$: $AC - B^2 = -12 < 0$, saddle point`, marks: 1 },
      ],
      model: r`FOC: $f_1' = 3x^2 - 3 = 0 \Rightarrow x = \pm1$; $f_2' = 2y - 4 = 0 \Rightarrow y = 2$.
Stationary points: $(1, 2)$ and $(-1, 2)$.
Second-order partials: $f_{11}'' = 6x$, $f_{12}'' = 0$, $f_{22}'' = 2$.
At $(1,2)$: $A = 6$, $B = 0$, $C = 2$; $AC - B^2 = 12 > 0$ with $A, C > 0$: strict local minimum, $f(1,2) = 1 - 3 + 4 - 8 = -6$.
At $(-1,2)$: $A = -6$, $B = 0$, $C = 2$; $AC - B^2 = -12 < 0$: saddle point ($f(-1,2) = -2$).`,
      answer: r`$(1,2)$ local minimum ($f = -6$); $(-1,2)$ saddle point`,
      source: "Modelled on Lecture Note 11 §11.4 theorem",
    },
    {
      id: "constrained-x10",
      kind: "proof",
      sub: "Saddle point",
      prompt: r`Consider the utility function $f(x,y) = \tfrac12x^2 - 18y^2$. Show that $(0,0)$ is the only stationary point, and show that it is neither a maximum nor a minimum point.`,
      marks: 5,
      rubric: [
        { point: r`FOCs $f_1' = x = 0$, $f_2' = -36y = 0$ give the unique point $(0,0)$`, marks: 1.5 },
        { point: r`$A = 1$, $B = 0$, $C = -36$, $AC - B^2 = -36 < 0$, so saddle point`, marks: 2 },
        { point: r`Justification: along $y = 0$, $f = \tfrac12x^2 > 0 = f(0,0)$; along $x = 0$, $f = -18y^2 < 0$`, marks: 1.5 },
      ],
      model: r`FOC: $f_1'(x,y) = x = 0$ and $f_2'(x,y) = -36y = 0$, so the only stationary point is $(0,0)$.
Second-order partials: $A = f_{11}'' = 1$, $B = f_{12}'' = 0$, $C = f_{22}'' = -36$. $AC - B^2 = -36 < 0$, so by case (iii) of the second derivative test $(0,0)$ is a saddle point.
Directly: $f(0,0) = 0$. For any $x \ne 0$, $f(x, 0) = \tfrac12x^2 > 0$, so $(0,0)$ is not a maximum. For any $y \ne 0$, $f(0, y) = -18y^2 < 0$, so it is not a minimum either. The first-order conditions alone could not tell us this: they are necessary but not sufficient.`,
      answer: r`$(0,0)$ is a saddle point ($AC - B^2 = -36 < 0$)`,
      source: "Lecture Note 11 Example [4] (utility function)",
    },
    {
      id: "constrained-x11",
      kind: "proof",
      sub: "Stationary points of Cobb–Douglas",
      prompt: r`Consider $Q = f(L,K) = 4L^{0.5}K^{0.5}$ on the domain $L \ge 0$, $K \ge 0$. (a) Show that $f$ has no stationary point in the interior $L > 0$, $K > 0$. (b) Does $f$ have a global minimum on $L, K \ge 0$? Justify your answer, and explain why (a) and (b) do not contradict the necessary conditions for an extreme point.`,
      marks: 5,
      rubric: [
        { point: r`$f_L' = 2\sqrt{K/L}$ and $f_K' = 2\sqrt{L/K}$, both $> 0$ for $L, K > 0$, so no stationary point`, marks: 2 },
        { point: r`$f \ge 0$ everywhere and $f = 0$ when $L = 0$ or $K = 0$: global minimum value $0$ exists`, marks: 2 },
        { point: "The necessary conditions apply only to interior points; the minimum is on the boundary", marks: 1 },
      ],
      model: r`(a) $f_L' = 4\cdot0.5L^{-0.5}K^{0.5} = 2\sqrt{K/L}$ and $f_K' = 2\sqrt{L/K}$. For $L > 0$, $K > 0$ both are strictly positive, so they can never both equal $0$: there is no interior stationary point.
(b) Yes. Since $L^{0.5} \ge 0$ and $K^{0.5} \ge 0$, $f(L,K) \ge 0$ for all $L, K \ge 0$, and $f(0, K) = f(L, 0) = 0$. So the global minimum value is $0$, attained at every point with $L = 0$ or $K = 0$. (Hence the statement "there is no global minimum of $f$ on $L, K \ge 0$" is false.)
No contradiction: the theorem says a differentiable function can only have a max or min at an **interior** point if that point is stationary. The minimum here occurs on the **boundary** of the domain, where the theorem does not apply.`,
      answer: "No interior stationary point; global minimum 0 on the boundary L = 0 or K = 0",
      source: "Past paper Q4(c)(i) and (iii)",
    },
    {
      id: "constrained-x12",
      kind: "calc",
      sub: "Simple chain rule",
      prompt: r`Let $z = F(x,y) = x^2y + y^2$ with $x = 2t$ and $y = t^2$. Find $\dfrac{dz}{dt}$ using the chain rule, check your answer by substituting first, and evaluate $\dfrac{dz}{dt}$ at $t = 1$.`,
      marks: 5,
      rubric: [
        { point: r`$F_1' = 2xy$, $F_2' = x^2 + 2y$, $\dfrac{dx}{dt} = 2$, $\dfrac{dy}{dt} = 2t$`, marks: 1.5 },
        { point: r`Chain rule gives $\dfrac{dz}{dt} = 20t^3$`, marks: 1.5 },
        { point: r`Check: $z = 5t^4$, derivative $20t^3$`, marks: 1 },
        { point: r`Value $20$ at $t = 1$`, marks: 1 },
      ],
      model: r`**Method 1.** $F_1'(x,y) = 2xy$, $F_2'(x,y) = x^2 + 2y$, $\dfrac{dx}{dt} = 2$, $\dfrac{dy}{dt} = 2t$.
$\dfrac{dz}{dt} = 2xy\cdot2 + (x^2 + 2y)\cdot 2t = 4(2t)(t^2) + (4t^2 + 2t^2)(2t) = 8t^3 + 12t^3 = 20t^3$.
**Method 2.** $z = (2t)^2t^2 + (t^2)^2 = 4t^4 + t^4 = 5t^4$, so $\dfrac{dz}{dt} = 20t^3$. ✓
At $t = 1$: $\dfrac{dz}{dt} = 20$.`,
      answer: r`$\dfrac{dz}{dt} = 20t^3$; $20$ at $t = 1$`,
      source: "Modelled on Lecture Note 11 Example [1]",
    },
    {
      id: "constrained-x13",
      kind: "calc",
      sub: "Chain rule, many variables",
      prompt: r`Let $F(x,y) = xy + y^2$ with $x = t + s$ and $y = ts$. Use the chain rule to find $\dfrac{\partial F}{\partial t}$ and $\dfrac{\partial F}{\partial s}$ in terms of $t$ and $s$, and verify one of them by substituting first.`,
      marks: 5,
      rubric: [
        { point: r`$F_1' = y$, $F_2' = x + 2y$ and the four partials of $x$, $y$`, marks: 1 },
        { point: r`$\dfrac{\partial F}{\partial t} = 2ts + s^2 + 2ts^2$`, marks: 1.5 },
        { point: r`$\dfrac{\partial F}{\partial s} = t^2 + 2ts + 2t^2s$`, marks: 1.5 },
        { point: r`Correct verification via $F = t^2s + ts^2 + t^2s^2$`, marks: 1 },
      ],
      model: r`$F_1' = y$, $F_2' = x + 2y$; $\dfrac{\partial x}{\partial t} = 1$, $\dfrac{\partial y}{\partial t} = s$, $\dfrac{\partial x}{\partial s} = 1$, $\dfrac{\partial y}{\partial s} = t$.
$\dfrac{\partial F}{\partial t} = y\cdot1 + (x + 2y)s = ts + (t + s + 2ts)s = 2ts + s^2 + 2ts^2$.
$\dfrac{\partial F}{\partial s} = y\cdot1 + (x + 2y)t = ts + (t + s + 2ts)t = t^2 + 2ts + 2t^2s$.
**Check.** $F = (t + s)ts + (ts)^2 = t^2s + ts^2 + t^2s^2$. Holding $s$ fixed: $\dfrac{\partial F}{\partial t} = 2ts + s^2 + 2ts^2$ ✓. Holding $t$ fixed: $\dfrac{\partial F}{\partial s} = t^2 + 2ts + 2t^2s$ ✓.`,
      answer: r`$\dfrac{\partial F}{\partial t} = 2ts + s^2 + 2ts^2$, $\dfrac{\partial F}{\partial s} = t^2 + 2ts + 2t^2s$`,
      source: "Modelled on Lecture Note 11 Example [2]",
    },
    {
      id: "constrained-x14",
      kind: "calc",
      sub: "Simple chain rule",
      prompt: r`In a growth model, output is $Y = F(K, L) = K^{1/2}L^{1/2}$, where capital $K = t + 3$ and labour $L = 4t$ are functions of time $t$. Use the chain rule to find $\dfrac{dY}{dt}$ at $t = 1$.`,
      marks: 5,
      rubric: [
        { point: r`$F_K' = \tfrac12K^{-1/2}L^{1/2}$, $F_L' = \tfrac12K^{1/2}L^{-1/2}$, $\dfrac{dK}{dt} = 1$, $\dfrac{dL}{dt} = 4$`, marks: 2 },
        { point: r`Chain rule set up $\dfrac{dY}{dt} = F_K'\dfrac{dK}{dt} + F_L'\dfrac{dL}{dt}$ with $K = L = 4$ at $t = 1$`, marks: 1.5 },
        { point: r`$\dfrac{dY}{dt} = 2.5$`, marks: 1.5 },
      ],
      model: r`$\dfrac{dY}{dt} = F_K'(K,L)\dfrac{dK}{dt} + F_L'(K,L)\dfrac{dL}{dt}$, with $F_K' = \tfrac12K^{-1/2}L^{1/2}$, $F_L' = \tfrac12K^{1/2}L^{-1/2}$, $\dfrac{dK}{dt} = 1$, $\dfrac{dL}{dt} = 4$.
At $t = 1$: $K = 4$, $L = 4$, so $F_K' = \tfrac12\cdot\dfrac{2}{2} = \tfrac12$ and $F_L' = \tfrac12$.
$\dfrac{dY}{dt} = \tfrac12(1) + \tfrac12(4) = 2.5$.
Check: $Y = \sqrt{4t(t + 3)} = 2\sqrt{t^2 + 3t}$, $\dfrac{dY}{dt} = \dfrac{2t + 3}{\sqrt{t^2 + 3t}} = \dfrac{5}{2} = 2.5$ at $t = 1$ ✓.`,
      answer: r`$\dfrac{dY}{dt} = 2.5$ at $t = 1$`,
      source: "Modelled on Lecture Note 11 §11.1 (growth models)",
    },
    {
      id: "constrained-x15",
      kind: "select",
      sub: "Two-variable optimisation facts",
      prompt: "Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.",
      statements: [
        r`If a differentiable function $f(x,y)$ has a maximum at an interior point $(x_0, y_0)$, then $f_1'(x_0,y_0) = 0$ and $f_2'(x_0,y_0) = 0$.`,
        r`Every stationary point of a differentiable function $f(x,y)$ is either a local maximum or a local minimum point.`,
        r`If $A = f_{11}''(x_0,y_0) < 0$, $C = f_{22}''(x_0,y_0) < 0$ and $AC - B^2 > 0$ at a stationary point, then it is a strict local maximum point.`,
        r`If $AC - B^2 = 0$ at a stationary point, then the point must be a saddle point.`,
        r`If $z = F(x,y)$ with $x = f(t)$ and $y = g(t)$, then $\dfrac{dz}{dt} = F_1'(x,y)\dfrac{dx}{dt} + F_2'(x,y)\dfrac{dy}{dt}$.`,
        r`For the Lagrangian $L = u(x,y) - \lambda(P_x x + P_y y - m)$, the condition $L_\lambda' = 0$ is the budget constraint $P_x x + P_y y = m$.`,
      ],
      wrong: [1, 3],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (iv) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong.** The first-order conditions are necessary, not sufficient: a stationary point can be a maximum, a minimum or neither. E.g. $(0,0)$ is a stationary point of $\tfrac12x^2 - 18y^2$ but a saddle point.
**(iv) is wrong.** When $AC - B^2 = 0$ the test is inconclusive: the point could be a local maximum, a local minimum or a saddle point. A saddle point is guaranteed only when $AC - B^2 < 0$.
(i) is the necessary-condition theorem, (iii) is case (i) of the second derivative test, (v) is the total derivative, and (vi) holds because $L_\lambda' = -(P_x x + P_y y - m)$.`,
      answer: "(ii) and (iv)",
      source: "Modelled on Past paper Q4(c)",
    },
    {
      id: "constrained-x16",
      kind: "explain",
      sub: "Graphical view of the Lagrange method",
      prompt: r`A consumer maximises $u(x,y) = xy$ subject to $P_x x + P_y y = m$. Using a diagram of the budget line and level curves $u(x,y) = c_1, c_2, c_3$ (with $c_3 > c_2 > c_1$), explain which level of utility the consumer reaches and where. Then show, using the Lagrange first-order conditions, that at the optimum $\dfrac{y}{x} = \dfrac{P_x}{P_y}$, and hence that the consumer spends exactly half of $m$ on each good.`,
      marks: 5,
      rubric: [
        { point: r`Budget line with intercepts $m/P_x$, $m/P_y$; $c_3$ not feasible, $c_1$ not optimal`, marks: 1.5 },
        { point: r`Optimum at $P$ where the highest attainable level curve $u = c_2$ just touches the budget line`, marks: 1 },
        { point: r`FOCs $y - \lambda P_x = 0$, $x - \lambda P_y = 0$ divided to give $y/x = P_x/P_y$`, marks: 1.5 },
        { point: r`Deduces $P_x x = P_y y = m/2$`, marks: 1 },
      ],
      model: r`**Diagram.** The budget line $P_x x + P_y y = m$ runs from $(m/P_x, 0)$ to $(0, m/P_y)$; bundles on or below it are affordable. The level curves $xy = c$ are curves $y = c/x$, and higher curves mean more utility.
- $u = c_3$ lies entirely above the budget line: not feasible (not enough budget).
- $u = c_1$ cuts the line: affordable, but moving along the line reaches higher curves, so it is not the best.
- $u = c_2$ is the highest level curve that can be reached: it just touches the budget line at the single point $P$, which is the utility-maximising bundle.
**Lagrange.** $L = xy - \lambda(P_x x + P_y y - m)$. FOC: $L_x' = y - \lambda P_x = 0$, $L_y' = x - \lambda P_y = 0$, $L_\lambda' = P_x x + P_y y - m = 0$.
Dividing the first two: $\dfrac{y}{x} = \dfrac{\lambda P_x}{\lambda P_y} = \dfrac{P_x}{P_y}$, so $P_x x = P_y y$.
Substituting into the budget: $P_x x + P_x x = m \Rightarrow P_x x = \dfrac m2$, and likewise $P_y y = \dfrac m2$. So half the income goes on each good: $x = \dfrac{m}{2P_x}$, $y = \dfrac{m}{2P_y}$ (e.g. Example [8]: $x = 20/1 = 20$, $y = 20/1.6 = 12.5$).`,
      answer: r`Optimum where $u = c_2$ touches the budget line; $y/x = P_x/P_y$, so $P_x x = P_y y = m/2$`,
      figures: [
        {
          title: "Budget line and level curves (Example [8] numbers)",
          xr: [0, 45],
          yr: [0, 30],
          curves: [
            { f: "25 - 0.625*x", from: 0, to: 40, tone: 3, label: "budget line" },
            { f: "120/x", from: 4.2, to: 45, tone: 2, label: "c₁" },
            { f: "250/x", from: 8.4, to: 45, tone: 0, label: "c₂" },
            { f: "450/x", from: 15, to: 45, tone: 1, label: "c₃" },
          ],
          points: [{ at: [20, 12.5], label: "P" }],
        },
      ],
      source: "Lecture Note 11 Examples [6]–[8]",
    },
  ],
};

export default data;
