import type { TopicData } from "@/lib/he1004/types";

// Built from Lecture Note 10 (Functions of Many Variables: 10.1–10.5) and past paper Q4(a), Q4(c).

const data: TopicData = {
  id: "multivariable",
  sections: [
    // ------------------------------------------------------------------ 10.1
    {
      title: "10.1 Functions of Two Variables",
      intro: String.raw`Most relationships in economics involve more than two variables. Most of the difficulties arise in the step from one variable to two, so we start with functions of two variables; the properties of one-variable functions extend easily.`,
      points: [
        {
          term: "Why many variables?",
          text: String.raw`One consumer's demand for a Double McSpicy depends on its price, the consumer's income, the prices of substitutes (Mighty Zinger from KFC) and complements (French fries), and advertising expenditure.`,
        },
        {
          term: "Function of two variables",
          text: String.raw`A function $f$ of two real variables $x$ and $y$ with domain $D$ is a rule that assigns to each pair of numbers $(x, y) \in D$ a **uniquely defined** outgoing number $z$. We write $z = f(x, y)$.`,
          eg: String.raw`Example [3]: $f(x, y) = xy + 2y$, also written $z = xy + 2y$.`,
        },
        {
          term: "Independent and dependent variables",
          text: String.raw`$x$ and $y$ are the **independent variables** (the arguments of $f$); $z$ is the **dependent variable**. In economics $x$ and $y$ are often called **exogenous** variables and $z$ the **endogenous** variable.`,
        },
        {
          term: "Graphs",
          text: String.raw`$z = f(x, y)$ can be drawn as a surface in three dimensions: e.g. $z = x^2 + y^2$ is a bowl. It can also be pictured as a machine: two inputs $x$ and $y$ go into $f$ and it produces the output $z$.`,
        },
        {
          term: "Domain",
          text: String.raw`The set of all possible pairs $(x, y)$ of the independent variables.`,
        },
        {
          term: "Range",
          text: String.raw`The set of corresponding values of the dependent variable $z$.`,
        },
        {
          term: "Example [4]",
          text: String.raw`$z = f(x, y) = \sqrt{x} + y^2$ needs $x \ge 0$ (square root), while $y$ can be any real number: $D = \{(x, y) : x \ge 0 \text{ and } y \in \mathbb{R}\}$. Both terms are $\ge 0$ and every value $\ge 0$ is reached, so the range is $z \in [0, \infty)$.`,
          eg: String.raw`$f(0,0) = 0$, $f(1,-2) = \sqrt1 + 4 = 5$, $f(4,3) = 2 + 9 = 11$, $f(25,100) = 5 + 10000 = 10005$.`,
        },
        {
          term: "Example [5]: demand for milk",
          text: String.raw`Frisch and Haavelmo found $C = A \times \dfrac{I^{2.08}}{P^{1.05}}$ ($A > 0$ a constant), where $C$ is milk consumption, $P$ the relative price of milk and $I$ income per family. $C$ is a function of the two variables $I$ and $P$.`,
        },
      ],
      formulas: [
        { name: "Function of two variables", tex: String.raw`z = f(x, y), \quad (x, y) \in D` },
        { name: "Example [4] domain and range", tex: String.raw`f(x,y) = \sqrt{x} + y^2: \quad D = \{(x,y): x \ge 0,\ y \in \mathbb{R}\}, \quad z \in [0, \infty)` },
        { name: "Milk demand (Example [5])", tex: String.raw`C = A\,\frac{I^{2.08}}{P^{1.05}}` },
      ],
      figures: [
        {
          title: "Domain of f(x, y) = √x + y²",
          xr: [-2, 4],
          yr: [-4, 4],
          shade: [{ f: "4", g: "-4", from: 0, to: 4, tone: 2, label: "D: x ≥ 0" }],
          segments: [{ from: [0, -4], to: [0, 4], tone: 2 }],
          caption: "Every point with x ≥ 0 (any y) is allowed — the half-plane on and to the right of the y-axis. Points with x < 0 are excluded because √x is undefined.",
        },
        {
          title: "Seeing z = x² + y² from above",
          xr: [-3.5, 3.5],
          yr: [-3.5, 3.5],
          curves: [
            { f: "sqrt(1 - x^2)", label: "z = 1", from: -1, to: 1 },
            { f: "-sqrt(1 - x^2)", from: -1, to: 1 },
            { f: "sqrt(4 - x^2)", label: "z = 4", from: -2, to: 2, tone: 1 },
            { f: "-sqrt(4 - x^2)", from: -2, to: 2, tone: 1 },
            { f: "sqrt(9 - x^2)", label: "z = 9", from: -3, to: 3, tone: 2 },
            { f: "-sqrt(9 - x^2)", from: -3, to: 3, tone: 2 },
          ],
          caption: "The circles drawn under the bowl in the lecture's 3-D graph: each circle joins the (x, y) pairs that give the same height z = x² + y². Wider circles = higher z.",
        },
        {
          title: "Curves of constant f(x, y) = xy",
          xr: [0, 6],
          yr: [0, 6],
          curves: [
            { f: "1/x", label: "xy = 1", from: 0.17 },
            { f: "4/x", label: "xy = 4", tone: 1, from: 0.67 },
            { f: "9/x", label: "xy = 9", tone: 2, from: 1.5 },
          ],
          points: [{ at: [2, 2], label: "(2, 2): xy = 4", guides: true, tone: 1 }],
          caption: "Each curve y = c/x shows all (x, y) with xy = c. Moving to a curve further from the origin raises f.",
        },
      ],
      worked: [
        {
          problem: String.raw`Example [4]: for $z = f(x, y) = \sqrt{x} + y^2$, find the domain and range, and evaluate $f(1, -2)$ and $f(25, 100)$.`,
          solution: String.raw`$\sqrt{x}$ requires $x \ge 0$; $y^2$ is defined for every $y$. So $D = \{(x, y): x \ge 0 \text{ and } y \in \mathbb{R}\}$.
$\sqrt{x} \ge 0$ and $y^2 \ge 0$, so $z \ge 0$; $z = 0$ at $(0,0)$ and $z$ grows without bound, so the range is $[0, \infty)$.
$f(1, -2) = \sqrt1 + (-2)^2 = 1 + 4 = 5$; $\;f(25, 100) = \sqrt{25} + 100^2 = 5 + 10000 = 10005$.`,
          source: "Lecture Note 10 Example [4]",
        },
      ],
    },
    // ------------------------------------------------------------------ 10.2
    {
      title: "10.2 Partial Derivatives with Two Variables",
      intro: String.raw`A partial derivative measures how $z$ changes when **one** independent variable changes and the other is held fixed. In this lecture we restrict attention to variations in either $x$ or $y$ (if both change simultaneously, the result is obtained by combining the individual effects).`,
      points: [
        {
          term: "Example [6]",
          text: String.raw`A firm's profit from inputs $x$ and $y$ is $z = x^3 + 2y^2$. Holding $y$ constant, $2y^2$ is a constant, so the change of $z$ with respect to $x$ is $3x^2$. Holding $x$ constant, the change of $z$ with respect to $y$ is $4y$.`,
        },
        {
          term: "Partial derivative notation",
          text: String.raw`We write $\dfrac{\partial z}{\partial x}$ instead of $\dfrac{dz}{dx}$ for the derivative of $z$ with respect to $x$ when $y$ is held fixed — the $\partial$ reminds the reader that only one independent variable is changing. Similarly $\dfrac{\partial z}{\partial y}$ when $x$ is held fixed. Read $\dfrac{\partial z}{\partial x}$ as "the partial derivative of $z$ with respect to $x$" or "partial $z$ partial $x$".`,
          eg: String.raw`$z = x^3 + 2y^2 \Rightarrow \dfrac{\partial z}{\partial x} = 3x^2$, $\dfrac{\partial z}{\partial y} = 4y$.`,
        },
        {
          term: "Definition",
          text: String.raw`If $z = f(x, y)$: (a) $\dfrac{\partial z}{\partial x} = \dfrac{\partial f}{\partial x}$ is the partial derivative of $f(x,y)$ with respect to $x$ when $y$ is held constant; (b) $\dfrac{\partial z}{\partial y} = \dfrac{\partial f}{\partial y}$ is the partial derivative with respect to $y$ when $x$ is held constant.`,
        },
        {
          term: "Other symbols (first-order partials)",
          text: String.raw`$\dfrac{\partial z}{\partial x} = \dfrac{\partial f}{\partial x} = \dfrac{\partial f(x,y)}{\partial x} = z'_x = f'_x(x,y) = f'_x = f'_1(x,y)$, and $\dfrac{\partial z}{\partial y} = z'_y = f'_y(x,y) = f'_y = f'_2(x,y)$. The subscript 1 or 2 says which argument (first or second) you differentiate with respect to.`,
        },
        {
          term: "Same rules as one variable",
          text: String.raw`All the differentiation rules for one variable (Lecture Note 5: power, sum, product, quotient, chain, exponential and log rules) apply. The partial derivative is mostly the same mechanics as the ordinary derivative: just **treat the other variable as a constant**.`,
          eg: String.raw`Example [7]: $f = x^3y + x^2y^2 + x + y^2 \Rightarrow f'_x = 3x^2y + 2xy^2 + 1$, $f'_y = x^3 + 2x^2y + 2y$.`,
        },
        {
          term: "Marginal product",
          text: String.raw`For a production function $Q = f(L, K)$, $\dfrac{\partial f}{\partial L}$ is the **marginal product of labour** $MP_L$ and $\dfrac{\partial f}{\partial K}$ is the **marginal product of capital** $MP_K$.`,
          eg: String.raw`Example [8]: $Q = L^{1/2}K^{1/2} \Rightarrow MP_L = \tfrac12 L^{-1/2}K^{1/2}$, $MP_K = \tfrac12 L^{1/2}K^{-1/2}$.`,
        },
        {
          term: "Marginal utility",
          text: String.raw`For a utility function $u(x, y)$, $\dfrac{\partial u}{\partial x}$ is the **marginal utility of $x$**, $MU_x$, and $\dfrac{\partial u}{\partial y} = MU_y$.`,
          eg: String.raw`Example [9]: $u = \ln(xy) \Rightarrow MU_x = \dfrac{y}{xy} = \dfrac1x$, $MU_y = \dfrac1y$ (chain rule).`,
        },
        {
          term: "Cobb–Douglas (past paper)",
          text: String.raw`For $Q = f(L, K) = 4L^{0.5}K^{0.5}$: $\dfrac{\partial f}{\partial L} = 4(0.5)L^{-0.5}K^{0.5} = 2\sqrt{K/L} > 0$ and $\dfrac{\partial f}{\partial K} = 2\sqrt{L/K} > 0$ for $L, K > 0$. Both are never 0, so there is no point in the interior where both partial derivatives vanish (no stationary point).`,
        },
      ],
      formulas: [
        { name: "Partial derivative notation", tex: String.raw`\frac{\partial z}{\partial x} = \frac{\partial f}{\partial x} = z'_x = f'_x(x,y) = f'_1(x,y), \qquad \frac{\partial z}{\partial y} = z'_y = f'_y(x,y) = f'_2(x,y)` },
        { name: "Example [6]", tex: String.raw`z = x^3 + 2y^2: \quad \frac{\partial z}{\partial x} = 3x^2, \quad \frac{\partial z}{\partial y} = 4y` },
        { name: "Example [8] marginal products", tex: String.raw`Q = L^{1/2}K^{1/2}: \quad MP_L = \tfrac12 L^{-1/2}K^{1/2}, \quad MP_K = \tfrac12 L^{1/2}K^{-1/2}` },
        { name: "Example [9] marginal utilities", tex: String.raw`u = \ln(xy): \quad MU_x = \frac1x, \quad MU_y = \frac1y` },
        { name: "Power rule, one variable at a time", tex: String.raw`\frac{\partial}{\partial L}\left(A L^{\alpha}K^{\beta}\right) = \alpha A L^{\alpha - 1}K^{\beta}` , note: String.raw`$K^{\beta}$ is a constant when $K$ is held fixed.` },
      ],
      figures: [
        {
          title: "Cross-section of z = x³ + 2y², holding y = 1",
          x: "x",
          y: "z",
          xr: [-2, 2.2],
          yr: [-6, 12],
          curves: [
            { f: "x^3 + 2", label: "z = x³ + 2" },
            { f: "3*x", label: "slope 3", dashed: true, tone: 1, from: -0.5, to: 2.2 },
          ],
          points: [{ at: [1, 3], label: "(1, 3)", guides: true }],
          caption: "Fixing y = 1 turns z into a one-variable function of x. Its slope at x = 1 is ∂z/∂x = 3x² = 3 — the partial derivative is the slope of this cross-section.",
        },
        {
          title: "Cross-section of z = x³ + 2y², holding x = 1",
          x: "y",
          y: "z",
          xr: [-2, 2.5],
          yr: [-2, 14],
          curves: [
            { f: "1 + 2*x^2", label: "z = 1 + 2y²" },
            { f: "4*x - 1", label: "slope 4", dashed: true, tone: 1, from: 0, to: 2.5 },
          ],
          points: [{ at: [1, 3], label: "(y, z) = (1, 3)", guides: true }],
          caption: "Now x is held at 1 and only y varies. The slope at y = 1 is ∂z/∂y = 4y = 4.",
        },
        {
          title: "Q = 4L^0.5 K^0.5 as a function of L (K fixed)",
          x: "L",
          y: "Q",
          xr: [0, 10],
          yr: [0, 30],
          curves: [
            { f: "4*sqrt(x)", label: "K = 1" },
            { f: "8*sqrt(x)", label: "K = 4", tone: 1 },
          ],
          caption: "For fixed K > 0, Q always rises with L (MP_L = 2√(K/L) > 0, never zero) and Q → ∞ as L → ∞. Q = 0 when L = 0, the smallest possible output.",
        },
        {
          title: "Combinations of L and K giving the same Q = 4L^0.5 K^0.5",
          x: "L",
          y: "K",
          xr: [0, 10],
          yr: [0, 10],
          curves: [
            { f: "4/x", label: "Q = 8", from: 0.4 },
            { f: "9/x", label: "Q = 12", tone: 1, from: 0.9 },
            { f: "16/x", label: "Q = 16", tone: 2, from: 1.6 },
          ],
          points: [{ at: [4, 4], label: "(4, 4): Q = 16", tone: 2 }],
          caption: "4√(LK) = Q ⇔ K = Q²/(16L). Each curve shows the input pairs producing the same output; more of both inputs reaches a higher curve.",
        },
      ],
      worked: [
        {
          problem: String.raw`Example [7]: find $\dfrac{\partial f}{\partial x}$ and $\dfrac{\partial f}{\partial y}$ for $f(x, y) = x^3y + x^2y^2 + x + y^2$.`,
          solution: String.raw`Treat $y$ as a constant: $\dfrac{\partial f}{\partial x} = 3x^2y + 2xy^2 + 1 + 0 = 3x^2y + 2xy^2 + 1$.
Treat $x$ as a constant: $\dfrac{\partial f}{\partial y} = x^3 + 2x^2y + 0 + 2y = x^3 + 2x^2y + 2y$.`,
          source: "Lecture Note 10 Example [7]",
        },
        {
          problem: String.raw`Example [8]: for $Q = f(L, K) = L^{1/2}K^{1/2}$, find $\dfrac{\partial f}{\partial L}$ and $\dfrac{\partial f}{\partial K}$.`,
          solution: String.raw`Holding $K$ fixed (power rule in $L$): $MP_L = \dfrac{\partial f}{\partial L} = \tfrac12 L^{-1/2}K^{1/2}$.
Holding $L$ fixed: $MP_K = \dfrac{\partial f}{\partial K} = \tfrac12 L^{1/2}K^{-1/2}$.`,
          source: "Lecture Note 10 Example [8]",
        },
        {
          problem: String.raw`Example [9]: find the marginal utilities for $u(x, y) = \ln(xy)$.`,
          solution: String.raw`Chain rule, holding $y$ fixed: $\dfrac{\partial u}{\partial x} = \dfrac{1}{xy}\cdot y = \dfrac{1}{x} = MU_x$.
Holding $x$ fixed: $\dfrac{\partial u}{\partial y} = \dfrac{1}{xy}\cdot x = \dfrac{1}{y} = MU_y$.`,
          source: "Lecture Note 10 Example [9]",
        },
      ],
    },
    // ------------------------------------------------------------------ 10.3
    {
      title: "10.3 Higher-Order Partial Derivatives",
      intro: String.raw`The first-order partial derivatives $\dfrac{\partial f}{\partial x}$ and $\dfrac{\partial f}{\partial y}$ are, in general, functions of two variables themselves — so we can differentiate them again.`,
      points: [
        {
          term: "First-order partial derivatives",
          text: String.raw`$\dfrac{\partial f}{\partial x}$ and $\dfrac{\partial f}{\partial y}$. For Example [7]: $\dfrac{\partial f}{\partial x} = 3x^2y + 2xy^2 + 1$ and $\dfrac{\partial f}{\partial y} = x^3 + 2x^2y + 2y$.`,
        },
        {
          term: "Second-order partial derivatives",
          text: String.raw`Differentiating each first-order partial with respect to $x$ and to $y$ (provided it is differentiable) gives **four** new functions:
(a) $\dfrac{\partial}{\partial x}\Big(\dfrac{\partial f}{\partial x}\Big) = \dfrac{\partial^2 f}{\partial x^2}$; (b) $\dfrac{\partial}{\partial y}\Big(\dfrac{\partial f}{\partial x}\Big) = \dfrac{\partial^2 f}{\partial y\,\partial x}$; (c) $\dfrac{\partial}{\partial x}\Big(\dfrac{\partial f}{\partial y}\Big) = \dfrac{\partial^2 f}{\partial x\,\partial y}$; (d) $\dfrac{\partial}{\partial y}\Big(\dfrac{\partial f}{\partial y}\Big) = \dfrac{\partial^2 f}{\partial y^2}$.`,
        },
        {
          term: "Order notation",
          text: String.raw`$\dfrac{\partial}{\partial y}\Big(\dfrac{\partial f}{\partial x}\Big) = \dfrac{\partial^2 f}{\partial y\,\partial x} = f''_{xy} = f''_{12}$ means: take the partial derivative with respect to $x$ **first**, then $y$.`,
        },
        {
          term: "Mixed (cross) partials",
          text: String.raw`(b) and (c) involve both variables. In Example [7] both equal $3x^2 + 4xy$.`,
          eg: String.raw`Example [7]: $f''_{xx} = 6xy + 2y^2$, $f''_{xy} = f''_{yx} = 3x^2 + 4xy$, $f''_{yy} = 2x^2 + 2$.`,
        },
        {
          term: "Young's theorem",
          text: String.raw`If $f(x, y)$ is twice differentiable, then $\dfrac{\partial^2 f}{\partial y\,\partial x} = \dfrac{\partial^2 f}{\partial x\,\partial y}$: the **order of differentiation does not matter**. Use it as a check on your working.`,
        },
      ],
      formulas: [
        { name: "Second-order partials", tex: String.raw`\frac{\partial^2 f}{\partial x^2}, \quad \frac{\partial^2 f}{\partial y\,\partial x} = f''_{xy} = f''_{12}, \quad \frac{\partial^2 f}{\partial x\,\partial y} = f''_{yx} = f''_{21}, \quad \frac{\partial^2 f}{\partial y^2}` },
        { name: "Young's theorem", tex: String.raw`\frac{\partial^2 f}{\partial y\,\partial x} = \frac{\partial^2 f}{\partial x\,\partial y}`, note: "For twice-differentiable f." },
        { name: "Example [10]", tex: String.raw`f = x^2y^3: \quad f''_{xx} = 2y^3, \quad f''_{xy} = f''_{yx} = 6xy^2, \quad f''_{yy} = 6x^2y` },
      ],
      worked: [
        {
          problem: String.raw`Example [7] continued: find all second-order partial derivatives of $f(x, y) = x^3y + x^2y^2 + x + y^2$.`,
          solution: String.raw`From $\dfrac{\partial f}{\partial x} = 3x^2y + 2xy^2 + 1$: $\dfrac{\partial^2 f}{\partial x^2} = 6xy + 2y^2$ and $\dfrac{\partial^2 f}{\partial y\,\partial x} = 3x^2 + 4xy$.
From $\dfrac{\partial f}{\partial y} = x^3 + 2x^2y + 2y$: $\dfrac{\partial^2 f}{\partial x\,\partial y} = 3x^2 + 4xy$ and $\dfrac{\partial^2 f}{\partial y^2} = 2x^2 + 2$.
The two mixed partials agree, as Young's theorem says.`,
          source: "Lecture Note 10 Example [7]",
        },
        {
          problem: String.raw`Example [10]: find the first- and second-order partial derivatives of $f(x, y) = x^2y^3$.`,
          solution: String.raw`$\dfrac{\partial f}{\partial x} = 2xy^3$, $\dfrac{\partial f}{\partial y} = 3x^2y^2$.
(a) $\dfrac{\partial^2 f}{\partial x^2} = 2y^3$; (b) $\dfrac{\partial^2 f}{\partial y\,\partial x} = \dfrac{\partial}{\partial y}(2xy^3) = 6xy^2$;
(c) $\dfrac{\partial^2 f}{\partial x\,\partial y} = \dfrac{\partial}{\partial x}(3x^2y^2) = 6xy^2$; (d) $\dfrac{\partial^2 f}{\partial y^2} = 6x^2y$.
(b) = (c), confirming Young's theorem.`,
          source: "Lecture Note 10 Example [10]",
        },
      ],
    },
    // ------------------------------------------------------------------ 10.4
    {
      title: "10.4 Functions of More Variables",
      intro: String.raw`Two-variable functions extend to any number of variables. Many important economic quantities depend on a very large number of variables.`,
      points: [
        {
          term: "Economic examples",
          text: String.raw`GDP depends on many variables, e.g. $GDP = f(C, I, G, X, M)$. Salary depends on years of education, experience, age, major, gender, CGPA, job position, etc.: $Salary = f(educ, exper, age, major, gender, CGPA, job\ position)$.`,
        },
        {
          term: "Function of n variables",
          text: String.raw`A function $f$ of $n$ variables $(x_1, x_2, x_3, \dots, x_n)$ with domain $D$ is a rule that assigns to each $n$-vector $\mathbf{x} = (x_1, x_2, x_3, \dots, x_n)$ in $D$ a uniquely defined outgoing number $z$.`,
        },
        {
          term: "Example [11]: linear function",
          text: String.raw`$f(x, y, g) = 2x + 6y + 3g + 1$ is a linear function of the three independent variables $x$, $y$ and $g$.`,
        },
        {
          term: "Example [12]: demand for sugar",
          text: String.raw`Schultz estimated US sugar demand in 1929–35 as $D = 108.83 - 6.0294P + 0.164W - 0.4217t$, where $D$ = demand, $P$ = price of sugar, $W$ = a production index and $t$ = the date ($t = 0$ is 1929).`,
        },
        {
          term: "Example [13]: three-input production",
          text: String.raw`$Q = f(L, K, M) = L^{1/5}K^{2/5}M^{3/5}$, where $L$ is labour, $K$ capital and $M$ materials and supplies.`,
        },
      ],
      formulas: [
        { name: "Function of n variables", tex: String.raw`z = f(\mathbf{x}) = f(x_1, x_2, \dots, x_n), \quad \mathbf{x} \in D` },
        { name: "Sugar demand (Example [12])", tex: String.raw`D = 108.83 - 6.0294P + 0.164W - 0.4217t` },
        { name: "Three-input production (Example [13])", tex: String.raw`Q = L^{1/5}K^{2/5}M^{3/5}` },
      ],
      worked: [
        {
          problem: String.raw`Example [11]: evaluate $f(x, y, g) = 2x + 6y + 3g + 1$ at $(1, 1, 1)$ and at $(2, 0, -1)$.`,
          solution: String.raw`$f(1, 1, 1) = 2 + 6 + 3 + 1 = 12$; $\;f(2, 0, -1) = 4 + 0 - 3 + 1 = 2$.`,
          source: "Lecture Note 10 Example [11]",
        },
      ],
    },
    // ------------------------------------------------------------------ 10.5
    {
      title: "10.5 Partial Derivatives with More Variables",
      intro: String.raw`Everything about partial derivatives extends to $n$ variables: differentiate with respect to one variable while holding **all** the others constant. Collecting the second-order partials in a square array gives the Hessian matrix.`,
      points: [
        {
          term: "Partial derivative in n variables",
          text: String.raw`For $f(\mathbf{x}) = f(x_1, x_2, \dots, x_n)$, $\dfrac{\partial f}{\partial x_i}$ ($i = 1, 2, \dots, n$) is the partial derivative of $f$ with respect to $x_i$ when all the other independent variables $x_j$ ($j \neq i$) are held constant.`,
        },
        {
          term: "Interpretation",
          text: String.raw`$\dfrac{\partial f}{\partial x_i}$ is approximately equal to the change in $z = f(x_1, \dots, x_n)$ caused by an **increase in $x_i$ of one unit** while the other $x_j$ are held constant.`,
          eg: String.raw`Sugar demand: $\dfrac{\partial D}{\partial P} = -6.0294$, so a one-unit rise in the price of sugar (with $W$ and $t$ fixed) lowers demand by about 6.03 units.`,
        },
        {
          term: "Limit formula",
          text: String.raw`Mathematically, $\dfrac{\partial f}{\partial x_i}$ is the limit as $h \to 0$ of $\dfrac{f(x_1, \dots, x_i + h, \dots, x_n) - f(x_1, \dots, x_i, \dots, x_n)}{h}$ — only $x_i$ is nudged.`,
        },
        {
          term: "Example [14]",
          text: String.raw`$f(x_1, x_2, x_3) = 5x_1^2 + x_1x_2^3 - x_2^2x_3^2 + x_3^3$: $\dfrac{\partial f}{\partial x_1} = 10x_1 + x_2^3$, $\dfrac{\partial f}{\partial x_2} = 3x_1x_2^2 - 2x_2x_3^2$, $\dfrac{\partial f}{\partial x_3} = -2x_2^2x_3 + 3x_3^2$.`,
        },
        {
          term: "How many second-order partials?",
          text: String.raw`Each of the $n$ first-order partials gives $n$ second-order partials $\dfrac{\partial}{\partial x_k}\Big(\dfrac{\partial f}{\partial x_i}\Big) = \dfrac{\partial^2 f}{\partial x_k\,\partial x_i} = f''_{ik}$, with $k, i = 1, \dots, n$. So there are $n^2$ second-order partial derivatives in total.`,
          eg: String.raw`$n = 2$ (Example [7]): $2^2 = 4$; $n = 3$: $9$.`,
        },
        {
          term: "Hessian matrix",
          text: String.raw`Put the $n^2$ second-order partials into an $n \times n$ matrix: $f''(\mathbf{x}) = \begin{pmatrix} f''_{11} & \cdots & f''_{1n} \\ \vdots & & \vdots \\ f''_{n1} & \cdots & f''_{nn} \end{pmatrix}$. This is the **Hessian matrix**. By Young's theorem $f''_{ik} = f''_{ki}$, so it is symmetric.`,
          eg: String.raw`Example [7]: $\begin{pmatrix} f''_{xx} & f''_{xy} \\ f''_{yx} & f''_{yy} \end{pmatrix} = \begin{pmatrix} 6xy + 2y^2 & 3x^2 + 4xy \\ 3x^2 + 4xy & 2x^2 + 2 \end{pmatrix}$`,
        },
        {
          term: "Hessian and its determinant (past paper)",
          text: String.raw`For a $2 \times 2$ Hessian, the determinant is $f''_{11}f''_{22} - f''_{12}f''_{21}$ (rule from Lecture Note 9).`,
          eg: String.raw`$z = xy + e^x + 2y$: $H = \begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$, $|H| = e^x \cdot 0 - 1 \cdot 1 = -1$.`,
        },
      ],
      formulas: [
        { name: "Partial derivative (n variables)", tex: String.raw`\frac{\partial f}{\partial x_i} = \lim_{h \to 0}\frac{f(x_1, \dots, x_i + h, \dots, x_n) - f(x_1, \dots, x_i, \dots, x_n)}{h}`, note: String.raw`≈ the change in $f$ from a one-unit increase in $x_i$, others fixed.` },
        { name: "Second-order partials", tex: String.raw`\frac{\partial}{\partial x_k}\left(\frac{\partial f}{\partial x_i}\right) = \frac{\partial^2 f}{\partial x_k\,\partial x_i} = f''_{ik}, \qquad n^2 \text{ in total}` },
        { name: "Hessian matrix", tex: String.raw`f''(\mathbf{x}) = \begin{pmatrix} f''_{11}(\mathbf{x}) & f''_{12}(\mathbf{x}) & \cdots & f''_{1n}(\mathbf{x}) \\ f''_{21}(\mathbf{x}) & f''_{22}(\mathbf{x}) & \cdots & f''_{2n}(\mathbf{x}) \\ \vdots & \vdots & & \vdots \\ f''_{n1}(\mathbf{x}) & f''_{n2}(\mathbf{x}) & \cdots & f''_{nn}(\mathbf{x}) \end{pmatrix}` },
        { name: "2 × 2 Hessian", tex: String.raw`H = \begin{pmatrix} f''_{xx} & f''_{xy} \\ f''_{yx} & f''_{yy} \end{pmatrix}, \qquad |H| = f''_{xx}f''_{yy} - f''_{xy}f''_{yx}` },
      ],
      worked: [
        {
          problem: String.raw`Example [14]: find the second-order partial derivatives of $f(x_1, x_2, x_3) = 5x_1^2 + x_1x_2^3 - x_2^2x_3^2 + x_3^3$.`,
          solution: String.raw`From $f'_1 = 10x_1 + x_2^3$: $f''_{11} = 10$, $f''_{12} = 3x_2^2$, $f''_{13} = 0$.
From $f'_2 = 3x_1x_2^2 - 2x_2x_3^2$: $f''_{21} = 3x_2^2$, $f''_{22} = 6x_1x_2 - 2x_3^2$, $f''_{23} = -4x_2x_3$.
From $f'_3 = -2x_2^2x_3 + 3x_3^2$: $f''_{31} = 0$, $f''_{32} = -4x_2x_3$, $f''_{33} = -2x_2^2 + 6x_3$.
$n = 3$ gives $3^2 = 9$ second-order partials, and the mixed ones pair up ($f''_{12} = f''_{21}$, etc.).`,
          source: "Lecture Note 10 Example [14]",
        },
        {
          problem: String.raw`Example [15]: find the Hessian matrix of $f(x_1, x_2, x_3) = 5x_1^2 + x_1x_2^3 + x_2^2x_3^2 + x_3^3$.`,
          solution: String.raw`$f'_1 = 10x_1 + x_2^3$, $f'_2 = 3x_1x_2^2 + 2x_2x_3^2$, $f'_3 = 2x_2^2x_3 + 3x_3^2$.
$H = \begin{pmatrix} f''_{11} & f''_{12} & f''_{13} \\ f''_{21} & f''_{22} & f''_{23} \\ f''_{31} & f''_{32} & f''_{33} \end{pmatrix} = \begin{pmatrix} 10 & 3x_2^2 & 0 \\ 3x_2^2 & 6x_1x_2 + 2x_3^2 & 4x_2x_3 \\ 0 & 4x_2x_3 & 2x_2^2 + 6x_3 \end{pmatrix}$.`,
          source: "Lecture Note 10 Example [15]",
        },
        {
          problem: String.raw`Past paper Q4(a): suppose $z = xy + e^x + 2y$. Calculate the Hessian matrix and its determinant.`,
          solution: String.raw`First-order: $z'_x = y + e^x$, $z'_y = x + 2$.
Second-order: $z''_{xx} = e^x$, $z''_{xy} = \dfrac{\partial}{\partial y}(y + e^x) = 1$, $z''_{yx} = \dfrac{\partial}{\partial x}(x + 2) = 1$, $z''_{yy} = 0$.
$H = \begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$, $\;|H| = e^x(0) - (1)(1) = -1$ (for every $(x, y)$).`,
          source: "Past paper Q4(a)",
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "multivariable-c1", type: "concept", front: String.raw`A rule assigning to each pair $(x, y)$ in a domain $D$ a uniquely defined number $z$.`, back: "function of two variables", why: String.raw`Written $z = f(x, y)$.` },
    { id: "multivariable-c2", type: "concept", front: String.raw`In $z = f(x, y)$, the name for $x$ and $y$ (the arguments of $f$).`, back: "independent variables", why: String.raw`In economics they are often called exogenous variables.` },
    { id: "multivariable-c3", type: "concept", front: String.raw`In $z = f(x, y)$, the name for $z$.`, back: "dependent variable", why: String.raw`In economics it is often called the endogenous variable.` },
    { id: "multivariable-c4", type: "concept", front: String.raw`The economics name for the inputs $x$ and $y$ of $z = f(x, y)$, determined outside the model.`, back: "exogenous variables", why: String.raw`The output $z$ is the endogenous variable.` },
    { id: "multivariable-c5", type: "concept", front: String.raw`The set of all possible pairs $(x, y)$ of the independent variables.`, back: "domain", why: String.raw`E.g. $\sqrt{x} + y^2$ has domain $\{(x,y): x \ge 0,\ y \in \mathbb{R}\}$.` },
    { id: "multivariable-c6", type: "concept", front: String.raw`The set of values of the dependent variable $z$ that the function produces.`, back: "range", why: String.raw`E.g. $\sqrt{x} + y^2$ has range $[0, \infty)$.` },
    { id: "multivariable-c7", type: "concept", front: String.raw`The derivative of $f(x, y)$ with respect to $x$ when $y$ is held constant, written $\partial f/\partial x$.`, back: "partial derivative", why: String.raw`The $\partial$ reminds the reader that only one independent variable changes.` },
    { id: "multivariable-c8", type: "concept", front: String.raw`$\partial f/\partial L$ for a production function $Q = f(L, K)$.`, back: "marginal product of labour", why: String.raw`$MP_L$; e.g. $\tfrac12 L^{-1/2}K^{1/2}$ for $Q = L^{1/2}K^{1/2}$.` },
    { id: "multivariable-c9", type: "concept", front: String.raw`$\partial u/\partial x$ for a utility function $u(x, y)$.`, back: "marginal utility", why: String.raw`$MU_x$; e.g. $1/x$ for $u = \ln(xy)$.` },
    { id: "multivariable-c10", type: "concept", front: String.raw`The four functions $\partial^2 f/\partial x^2$, $\partial^2 f/\partial y\partial x$, $\partial^2 f/\partial x\partial y$, $\partial^2 f/\partial y^2$.`, back: "second-order partial derivatives", why: String.raw`Obtained by differentiating the first-order partials again with respect to $x$ and $y$.` },
    { id: "multivariable-c11", type: "concept", front: String.raw`The result that $\partial^2 f/\partial y\,\partial x = \partial^2 f/\partial x\,\partial y$ for a twice-differentiable $f$.`, back: "Young's theorem", why: String.raw`The order of differentiation does not matter.` },
    { id: "multivariable-c12", type: "concept", front: String.raw`The $n \times n$ matrix of all second-order partial derivatives $f''_{ik}$ of a function of $n$ variables.`, back: "Hessian matrix", why: String.raw`Written $f''(\mathbf{x})$; for two variables $\begin{pmatrix} f''_{xx} & f''_{xy} \\ f''_{yx} & f''_{yy} \end{pmatrix}$.` },
    { id: "multivariable-c13", type: "concept", front: String.raw`A rule that assigns to each $n$-vector $\mathbf{x} = (x_1, \dots, x_n)$ in $D$ a uniquely defined number $z$.`, back: "function of n variables", why: String.raw`E.g. $GDP = f(C, I, G, X, M)$ or $Q = L^{1/5}K^{2/5}M^{3/5}$.` },

    // formula
    { id: "multivariable-c14", type: "formula", front: "Notation for the first-order partial derivatives", back: String.raw`$\frac{\partial z}{\partial x} = z'_x = f'_x(x,y) = f'_1(x,y)$; $\frac{\partial z}{\partial y} = z'_y = f'_y(x,y) = f'_2(x,y)$`, why: String.raw`Subscript 1 or 2 = differentiate with respect to the first or second argument.` },
    { id: "multivariable-c15", type: "formula", front: String.raw`Meaning of $f''_{xy} = f''_{12}$`, back: String.raw`$\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right) = \frac{\partial^2 f}{\partial y\,\partial x}$: $x$ first, then $y$`, why: String.raw`The subscripts are read left to right in the order of differentiation.` },
    { id: "multivariable-c16", type: "formula", front: "Partial derivative as a limit (n variables)", back: String.raw`$\frac{\partial f}{\partial x_i} = \lim_{h\to0}\frac{f(\dots, x_i + h, \dots) - f(\dots, x_i, \dots)}{h}$`, why: String.raw`Only $x_i$ changes; all other variables are held constant. Roughly, the change in $f$ when $x_i$ rises by one unit.` },
    { id: "multivariable-c17", type: "formula", front: "Number of second-order partials of a function of n variables", back: String.raw`$n^2$, arranged in an $n \times n$ Hessian`, why: String.raw`Each of the $n$ first-order partials can be differentiated with respect to each of the $n$ variables.` },
    { id: "multivariable-c18", type: "formula", front: "2 × 2 Hessian and its determinant", back: String.raw`$H = \begin{pmatrix} f''_{xx} & f''_{xy} \\ f''_{yx} & f''_{yy} \end{pmatrix}$, $|H| = f''_{xx}f''_{yy} - (f''_{xy})^2$`, why: String.raw`Young's theorem makes the off-diagonal entries equal, so the determinant is $f''_{xx}f''_{yy} - f''_{xy}f''_{yx}$.` },
    { id: "multivariable-c19", type: "formula", front: String.raw`Partial derivatives of a power function $AL^{\alpha}K^{\beta}$`, back: String.raw`$\frac{\partial}{\partial L} = \alpha AL^{\alpha-1}K^{\beta}$, $\frac{\partial}{\partial K} = \beta AL^{\alpha}K^{\beta-1}$`, why: String.raw`Ordinary power rule with the other input treated as a constant (Examples [8], [13]; past paper Q4(c)).` },

    // method
    { id: "multivariable-c20", type: "method", front: String.raw`Find $\partial z/\partial x$ and $\partial z/\partial y$ for $z = x^3 + 2y^2$.`, back: String.raw`$\partial z/\partial x = 3x^2$, $\partial z/\partial y = 4y$.`, why: String.raw`Holding $y$ fixed, $2y^2$ is a constant (derivative 0); holding $x$ fixed, $x^3$ is a constant.` },
    { id: "multivariable-c21", type: "method", front: String.raw`Find $\partial f/\partial y$ for $f = x^3y + x^2y^2 + x + y^2$.`, back: String.raw`$x^3 + 2x^2y + 2y$`, why: String.raw`Treat $x$ as a constant: $x^3y \to x^3$, $x^2y^2 \to 2x^2y$, $x \to 0$, $y^2 \to 2y$.` },
    { id: "multivariable-c22", type: "method", front: String.raw`Find $MP_L$ and $MP_K$ for $Q = L^{1/2}K^{1/2}$.`, back: String.raw`$MP_L = \tfrac12L^{-1/2}K^{1/2}$, $MP_K = \tfrac12L^{1/2}K^{-1/2}$.`, why: String.raw`Power rule in one input while the other is a constant multiplier.` },
    { id: "multivariable-c23", type: "method", front: String.raw`Find the marginal utilities of $u(x, y) = \ln(xy)$.`, back: String.raw`$MU_x = 1/x$, $MU_y = 1/y$.`, why: String.raw`Chain rule: $\frac{\partial u}{\partial x} = \frac{1}{xy}\cdot y = \frac1x$. Similarly $\frac{\partial u}{\partial y} = \frac{1}{xy}\cdot x = \frac1y$.` },
    { id: "multivariable-c24", type: "method", front: String.raw`State the domain and range of $z = \sqrt{x} + y^2$.`, back: String.raw`$D = \{(x,y): x \ge 0,\ y \in \mathbb{R}\}$; range $[0, \infty)$.`, why: String.raw`The square root needs $x \ge 0$; $y^2$ works for all $y$. Both terms are $\ge 0$ and can be made as large as you like.` },
    { id: "multivariable-c25", type: "method", front: String.raw`Find all second-order partials of $f = x^2y^3$.`, back: String.raw`$f''_{xx} = 2y^3$, $f''_{xy} = f''_{yx} = 6xy^2$, $f''_{yy} = 6x^2y$.`, why: String.raw`$f'_x = 2xy^3$, $f'_y = 3x^2y^2$. Differentiate each again with respect to $x$ and $y$; the mixed partials agree (Young).` },
    { id: "multivariable-c26", type: "method", front: String.raw`Past paper Q4(a): Hessian and its determinant for $z = xy + e^x + 2y$.`, back: String.raw`$H = \begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$, $|H| = -1$.`, why: String.raw`1. $z'_x = y + e^x$, $z'_y = x + 2$.
2. $z''_{xx} = e^x$, $z''_{xy} = z''_{yx} = 1$, $z''_{yy} = 0$.
3. $|H| = e^x \cdot 0 - 1 \cdot 1 = -1$.` },
    { id: "multivariable-c27", type: "method", front: String.raw`Find the Hessian of $f = x^3y + x^2y^2 + x + y^2$.`, back: String.raw`$\begin{pmatrix} 6xy + 2y^2 & 3x^2 + 4xy \\ 3x^2 + 4xy & 2x^2 + 2 \end{pmatrix}$`, why: String.raw`From $f'_x = 3x^2y + 2xy^2 + 1$ and $f'_y = x^3 + 2x^2y + 2y$, differentiate each again. At $(1,1)$ it is $\begin{pmatrix} 8 & 7 \\ 7 & 4 \end{pmatrix}$ with determinant $32 - 49 = -17$.` },
    { id: "multivariable-c28", type: "method", front: String.raw`How do you find the Hessian of a function of three variables, e.g. $f(x_1, x_2, x_3)$?`, back: String.raw`Find the 3 first-order partials, differentiate each with respect to $x_1, x_2, x_3$, and place $f''_{ik}$ in row $i$, column $k$ of a $3 \times 3$ matrix.`, why: String.raw`For $5x_1^2 + x_1x_2^3 + x_2^2x_3^2 + x_3^3$ (Example [15]): $\begin{pmatrix} 10 & 3x_2^2 & 0 \\ 3x_2^2 & 6x_1x_2 + 2x_3^2 & 4x_2x_3 \\ 0 & 4x_2x_3 & 2x_2^2 + 6x_3 \end{pmatrix}$. It is symmetric — a good check.` },
    { id: "multivariable-c29", type: "method", front: String.raw`Past paper Q4(c): for $Q = 4L^{0.5}K^{0.5}$, which TWO statements are wrong?`, back: String.raw`(i) "no global minimum on $L, K \ge 0$" and (vi) "the exponent $\alpha$ must lie between 0 and 1".`, why: String.raw`(i) $f \ge 0$ and $f(0, K) = 0$, so the global minimum 0 is attained when $L = 0$ or $K = 0$.
(vi) A Cobb–Douglas exponent can be any value — e.g. the milk demand $C = AI^{2.08}/P^{1.05}$ has exponent 2.08.
True: (ii) $MP_L = 2\sqrt{K/L}$; (iii) $f'_L > 0$ so no stationary point; (iv) both limits are $\infty$; (v) $f''_{LK} = (LK)^{-1/2} > 0$.` },
    { id: "multivariable-c30", type: "method", front: String.raw`Show that $Q = 4L^{0.5}K^{0.5}$ has no stationary point with $L, K > 0$.`, back: String.raw`$\partial Q/\partial L = 2\sqrt{K/L} > 0$ for all $L, K > 0$, so it is never 0.`, why: String.raw`A stationary point needs both first-order partials equal to 0. Here $f'_L$ and $f'_K = 2\sqrt{L/K}$ are strictly positive in the interior.` },
    { id: "multivariable-c31", type: "method", front: String.raw`Find the mixed partial $\partial^2 f/\partial L\,\partial K$ of $f = 4L^{0.5}K^{0.5}$ and its sign.`, back: String.raw`$(LK)^{-1/2} > 0$.`, why: String.raw`$f'_L = 2L^{-0.5}K^{0.5}$; differentiate with respect to $K$: $2(0.5)L^{-0.5}K^{-0.5} = \frac{1}{\sqrt{LK}} > 0$.` },
    { id: "multivariable-c32", type: "method", front: String.raw`Find $\partial f/\partial x_2$ for $f = 5x_1^2 + x_1x_2^3 - x_2^2x_3^2 + x_3^3$.`, back: String.raw`$3x_1x_2^2 - 2x_2x_3^2$`, why: String.raw`Hold $x_1$ and $x_3$ constant: $5x_1^2 \to 0$, $x_1x_2^3 \to 3x_1x_2^2$, $-x_2^2x_3^2 \to -2x_2x_3^2$, $x_3^3 \to 0$.` },
    { id: "multivariable-c33", type: "method", front: String.raw`Use the limit definition to find $\partial f/\partial x$ for $f(x, y) = x^2y$.`, back: String.raw`$\lim_{h\to0}\frac{(x+h)^2y - x^2y}{h} = 2xy$.`, why: String.raw`$(x+h)^2y - x^2y = (2xh + h^2)y$. Divide by $h$: $2xy + hy$. Let $h \to 0$: $2xy$. Only $x$ is nudged; $y$ stays fixed.` },
    { id: "multivariable-c34", type: "method", front: String.raw`Interpret $\partial C/\partial P$ and $\partial C/\partial I$ for milk demand $C = AI^{2.08}/P^{1.05}$.`, back: String.raw`$\partial C/\partial P = -1.05AI^{2.08}P^{-2.05} < 0$; $\partial C/\partial I = 2.08AI^{1.08}P^{-1.05} > 0$.`, why: String.raw`Write $C = AI^{2.08}P^{-1.05}$ and use the power rule in one variable at a time. Higher price (income fixed) lowers milk consumption; higher income (price fixed) raises it.` },
    { id: "multivariable-c35", type: "method", front: String.raw`Find $\partial Q/\partial M$ for $Q = L^{1/5}K^{2/5}M^{3/5}$ at $L = K = M = 32$.`, back: String.raw`$\tfrac35 L^{1/5}K^{2/5}M^{-2/5} = 1.2$.`, why: String.raw`$Q(32,32,32) = 32^{6/5} = 64$. $\partial Q/\partial M = \tfrac35\,Q/M = \tfrac35 \cdot \tfrac{64}{32} = 1.2$.` },
    { id: "multivariable-c36", type: "method", front: String.raw`Verify Young's theorem for $f = x^2e^{3y}$.`, back: String.raw`Both mixed partials equal $6xe^{3y}$.`, why: String.raw`$f'_x = 2xe^{3y} \Rightarrow \frac{\partial^2 f}{\partial y\partial x} = 6xe^{3y}$. $f'_y = 3x^2e^{3y} \Rightarrow \frac{\partial^2 f}{\partial x\partial y} = 6xe^{3y}$. Equal ✓.` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 10.1
    {
      id: "multivariable-q1", kind: "mcq", sub: "Functions of two variables",
      prompt: String.raw`In $z = f(x, y)$, $x$ and $y$ are called`,
      options: ["independent (exogenous) variables", "dependent (endogenous) variables", "the range of f", "partial derivatives"],
      answer: 0,
      explain: String.raw`$x$ and $y$ are the independent variables (arguments of $f$), often called exogenous in economics; $z$ is the dependent (endogenous) variable.`,
    },
    {
      id: "multivariable-q2", kind: "mcq", sub: "Functions of two variables",
      prompt: String.raw`What is the domain of $f(x, y) = \sqrt{x} + y^2$?`,
      options: [
        String.raw`$\{(x, y): x \ge 0,\ y \in \mathbb{R}\}$`,
        String.raw`$\{(x, y): x \ge 0,\ y \ge 0\}$`,
        String.raw`all $(x, y) \in \mathbb{R}^2$`,
        String.raw`$\{(x, y): x > 0,\ y \neq 0\}$`,
      ],
      answer: 0,
      explain: String.raw`Only the square root restricts the inputs: $x \ge 0$. $y^2$ is defined for every real $y$.`,
    },
    {
      id: "multivariable-q3", kind: "mcq", sub: "Functions of two variables",
      prompt: String.raw`What is the range of $f(x, y) = \sqrt{x} + y^2$?`,
      options: [String.raw`$[0, \infty)$`, String.raw`$(0, \infty)$`, String.raw`$(-\infty, \infty)$`, String.raw`$[1, \infty)$`],
      answer: 0,
      explain: String.raw`Both terms are $\ge 0$, $f(0,0) = 0$, and $f$ can be made arbitrarily large, so $z \in [0, \infty)$.`,
    },
    {
      id: "multivariable-q4", kind: "fill", sub: "Functions of two variables",
      prompt: String.raw`For $f(x, y) = \sqrt{x} + y^2$, $f(1, -2)$ = ____.`,
      answers: [["5"]],
      explain: String.raw`$\sqrt1 + (-2)^2 = 1 + 4 = 5$.`,
    },
    {
      id: "multivariable-q5", kind: "fill", sub: "Functions of two variables",
      prompt: String.raw`For $f(x, y) = \sqrt{x} + y^2$, $f(25, 100)$ = ____.`,
      answers: [["10005"]],
      explain: String.raw`$\sqrt{25} + 100^2 = 5 + 10000 = 10005$.`,
    },
    {
      id: "multivariable-q6", kind: "mcq", sub: "Functions of two variables",
      prompt: String.raw`In the milk-demand relation $C = A \times \dfrac{I^{2.08}}{P^{1.05}}$, which is the dependent variable?`,
      options: [String.raw`$C$, milk consumption`, String.raw`$I$, income per family`, String.raw`$P$, the relative price`, String.raw`$A$, the constant`],
      answer: 0,
      explain: String.raw`$C$ is a function of the two independent variables $I$ and $P$; $A$ is a positive constant.`,
    },
    // 10.2
    {
      id: "multivariable-q7", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`For $z = x^3 + 2y^2$, $\dfrac{\partial z}{\partial x}$ is`,
      options: [String.raw`$3x^2$`, String.raw`$3x^2 + 4y$`, String.raw`$3x^2 + 2y^2$`, String.raw`$4y$`],
      answer: 0,
      explain: String.raw`Hold $y$ constant, so $2y^2$ is a constant with derivative 0: $\partial z/\partial x = 3x^2$.`,
    },
    {
      id: "multivariable-q8", kind: "fill", sub: "Partial derivatives",
      prompt: String.raw`For $z = x^3 + 2y^2$, $\dfrac{\partial z}{\partial y}$ at $(x, y) = (5, 2)$ is ____.`,
      answers: [["8"]],
      explain: String.raw`$\partial z/\partial y = 4y$ (no $x$ in it), so at $y = 2$ it is 8.`,
    },
    {
      id: "multivariable-q9", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`For $f(x, y) = x^3y + x^2y^2 + x + y^2$, $\dfrac{\partial f}{\partial y}$ is`,
      options: [
        String.raw`$x^3 + 2x^2y + 2y$`,
        String.raw`$3x^2y + 2xy^2 + 1$`,
        String.raw`$x^3 + 2x^2y + 1 + 2y$`,
        String.raw`$3x^2 + 4xy + 2y$`,
      ],
      answer: 0,
      explain: String.raw`Treat $x$ as constant: $x^3y \to x^3$, $x^2y^2 \to 2x^2y$, $x \to 0$, $y^2 \to 2y$ (Example [7]).`,
    },
    {
      id: "multivariable-q10", kind: "fill", sub: "Partial derivatives",
      prompt: String.raw`For $f(x, y) = x^3y + x^2y^2 + x + y^2$, $\dfrac{\partial f}{\partial x}$ at $(1, 1)$ is ____.`,
      answers: [["6"]],
      explain: String.raw`$\partial f/\partial x = 3x^2y + 2xy^2 + 1 = 3 + 2 + 1 = 6$ at $(1,1)$.`,
    },
    {
      id: "multivariable-q11", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`For $Q = L^{1/2}K^{1/2}$, the marginal product of capital is`,
      options: [
        String.raw`$\tfrac12 L^{1/2}K^{-1/2}$`,
        String.raw`$\tfrac12 L^{-1/2}K^{1/2}$`,
        String.raw`$\tfrac14 L^{-1/2}K^{-1/2}$`,
        String.raw`$\tfrac12 K^{-1/2}$`,
      ],
      answer: 0,
      explain: String.raw`Hold $L$ fixed and differentiate $K^{1/2}$: $MP_K = L^{1/2}\cdot\tfrac12K^{-1/2}$. Forgetting the constant $L^{1/2}$ gives the last option (Example [8]).`,
    },
    {
      id: "multivariable-q12", kind: "fill", sub: "Partial derivatives",
      prompt: String.raw`For $Q = L^{1/2}K^{1/2}$, $MP_L$ at $L = 4$, $K = 16$ is ____.`,
      answers: [["1"]],
      explain: String.raw`$MP_L = \tfrac12 L^{-1/2}K^{1/2} = \tfrac12 \cdot \tfrac12 \cdot 4 = 1$.`,
    },
    {
      id: "multivariable-q13", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`For $u(x, y) = \ln(xy)$, the marginal utility of $x$ is`,
      options: [String.raw`$\dfrac1x$`, String.raw`$\dfrac{1}{xy}$`, String.raw`$\dfrac{y}{x}$`, String.raw`$\ln y$`],
      answer: 0,
      explain: String.raw`Chain rule: $\dfrac{1}{xy}\cdot y = \dfrac1x$ (Example [9]).`,
    },
    {
      id: "multivariable-q14", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`The symbol $f'_2(x, y)$ means`,
      options: [
        String.raw`$\dfrac{\partial f}{\partial y}$`,
        String.raw`$\dfrac{\partial f}{\partial x}$`,
        String.raw`the second derivative $\dfrac{\partial^2 f}{\partial x^2}$`,
        String.raw`$f$ evaluated at $y = 2$`,
      ],
      answer: 0,
      explain: String.raw`The subscript says which argument: 1 = the first ($x$), 2 = the second ($y$). So $f'_2 = f'_y = \partial f/\partial y$.`,
    },
    {
      id: "multivariable-q15", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`For $Q = f(L, K) = 4L^{0.5}K^{0.5}$, the marginal product of labour is`,
      options: [String.raw`$2\sqrt{K/L}$`, String.raw`$2\sqrt{L/K}$`, String.raw`$4\sqrt{K/L}$`, String.raw`$0.5\sqrt{K/L}$`],
      answer: 0,
      explain: String.raw`$4 \times 0.5\,L^{-0.5}K^{0.5} = 2\sqrt{K/L}$ — past paper Q4(c)(ii) is true.`,
    },
    {
      id: "multivariable-q16", kind: "fill", sub: "Partial derivatives",
      prompt: String.raw`For $Q = 4L^{0.5}K^{0.5}$, $\dfrac{\partial Q}{\partial L}$ at $L = 4$, $K = 9$ is ____.`,
      answers: [["3"]],
      explain: String.raw`$2\sqrt{K/L} = 2\sqrt{9/4} = 2 \times 1.5 = 3$.`,
    },
    {
      id: "multivariable-q17", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`For $z = xy + e^x + 2y$, $\dfrac{\partial z}{\partial x}$ is`,
      options: [String.raw`$y + e^x$`, String.raw`$y + e^x + 2$`, String.raw`$x + 2$`, String.raw`$xy + e^x$`],
      answer: 0,
      explain: String.raw`Hold $y$ fixed: $xy \to y$, $e^x \to e^x$, $2y \to 0$ (past paper Q4(a)).`,
    },
    {
      id: "multivariable-q18", kind: "mcq", sub: "Partial derivatives",
      prompt: String.raw`Holding $y$ fixed at $y_0$ and graphing $z = f(x, y_0)$ against $x$, what is $\dfrac{\partial f}{\partial x}(x_0, y_0)$?`,
      options: [
        String.raw`The slope of that cross-section curve at $x = x_0$`,
        String.raw`The height of the curve at $x = x_0$`,
        String.raw`The area under the curve`,
        String.raw`The slope of the curve obtained by holding $x$ fixed`,
      ],
      answer: 0,
      explain: String.raw`With $y$ fixed, $f$ is an ordinary function of $x$; its derivative — the slope of that curve — is the partial derivative with respect to $x$.`,
    },
    // 10.3
    {
      id: "multivariable-q19", kind: "mcq", sub: "Second-order partials",
      prompt: String.raw`For $f(x, y) = x^2y^3$, $\dfrac{\partial^2 f}{\partial x^2}$ is`,
      options: [String.raw`$2y^3$`, String.raw`$2xy^3$`, String.raw`$6xy^2$`, String.raw`$6x^2y$`],
      answer: 0,
      explain: String.raw`$f'_x = 2xy^3$; differentiating again with respect to $x$ gives $2y^3$ (Example [10]).`,
    },
    {
      id: "multivariable-q20", kind: "mcq", sub: "Second-order partials",
      prompt: String.raw`For $f(x, y) = x^2y^3$, $\dfrac{\partial^2 f}{\partial x\,\partial y}$ is`,
      options: [String.raw`$6xy^2$`, String.raw`$3x^2y^2$`, String.raw`$6x^2y$`, String.raw`$2y^3$`],
      answer: 0,
      explain: String.raw`$\dfrac{\partial}{\partial x}(3x^2y^2) = 6xy^2$, the same as $\dfrac{\partial}{\partial y}(2xy^3) = 6xy^2$ (Young's theorem).`,
    },
    {
      id: "multivariable-q21", kind: "mcq", sub: "Second-order partials",
      prompt: String.raw`$f''_{xy} = f''_{12} = \dfrac{\partial^2 f}{\partial y\,\partial x}$ means`,
      options: [
        String.raw`differentiate with respect to $x$ first, then $y$`,
        String.raw`differentiate with respect to $y$ first, then $x$`,
        String.raw`multiply $f'_x$ by $f'_y$`,
        String.raw`differentiate with respect to $x$ twice`,
      ],
      answer: 0,
      explain: String.raw`$\dfrac{\partial}{\partial y}\Big(\dfrac{\partial f}{\partial x}\Big)$: the inner derivative (with respect to $x$) is taken first.`,
    },
    {
      id: "multivariable-q22", kind: "mcq", sub: "Second-order partials",
      prompt: "Young's theorem says that, for a twice-differentiable f(x, y),",
      options: [
        String.raw`$\dfrac{\partial^2 f}{\partial y\,\partial x} = \dfrac{\partial^2 f}{\partial x\,\partial y}$`,
        String.raw`$\dfrac{\partial^2 f}{\partial x^2} = \dfrac{\partial^2 f}{\partial y^2}$`,
        String.raw`$\dfrac{\partial f}{\partial x} = \dfrac{\partial f}{\partial y}$`,
        String.raw`all second-order partials are positive`,
      ],
      answer: 0,
      explain: "The order of differentiation does not matter for the mixed partials.",
    },
    {
      id: "multivariable-q23", kind: "fill", sub: "Second-order partials",
      prompt: String.raw`For $f(x, y) = x^3y + x^2y^2 + x + y^2$, $\dfrac{\partial^2 f}{\partial y^2}$ at $(1, 1)$ is ____.`,
      answers: [["4"]],
      explain: String.raw`$f''_{yy} = \dfrac{\partial}{\partial y}(x^3 + 2x^2y + 2y) = 2x^2 + 2 = 4$ at $x = 1$.`,
    },
    {
      id: "multivariable-q24", kind: "fill", sub: "Second-order partials",
      prompt: String.raw`For the same $f$, the mixed partial $\dfrac{\partial^2 f}{\partial y\,\partial x}$ at $(1, 1)$ is ____.`,
      answers: [["7"]],
      explain: String.raw`$\dfrac{\partial}{\partial y}(3x^2y + 2xy^2 + 1) = 3x^2 + 4xy = 3 + 4 = 7$.`,
    },
    {
      id: "multivariable-q25", kind: "mcq", sub: "Second-order partials",
      prompt: String.raw`For $f(L, K) = 4L^{0.5}K^{0.5}$ with $L, K > 0$, the mixed partial $\dfrac{\partial^2 f}{\partial L\,\partial K}$ is`,
      options: [
        String.raw`$\dfrac{1}{\sqrt{LK}}$, which is positive`,
        String.raw`$-\dfrac{1}{\sqrt{LK}}$, which is negative`,
        String.raw`0`,
        String.raw`$2\sqrt{K/L}$`,
      ],
      answer: 0,
      explain: String.raw`$f'_K = 2L^{0.5}K^{-0.5}$; $\dfrac{\partial}{\partial L}$: $2(0.5)L^{-0.5}K^{-0.5} = (LK)^{-1/2} > 0$. Past paper Q4(c)(v) is true.`,
    },
    // 10.4
    {
      id: "multivariable-q26", kind: "fill", sub: "More variables",
      prompt: String.raw`For $f(x, y, g) = 2x + 6y + 3g + 1$, $f(1, 1, 1)$ = ____.`,
      answers: [["12"]],
      explain: String.raw`$2 + 6 + 3 + 1 = 12$ (Example [11]).`,
    },
    {
      id: "multivariable-q27", kind: "fill", sub: "More variables",
      prompt: String.raw`For $Q = L^{1/5}K^{2/5}M^{3/5}$, $Q(32, 32, 32)$ = ____.`,
      answers: [["64"]],
      explain: String.raw`$32^{1/5 + 2/5 + 3/5} = 32^{6/5} = (32^{1/5})^6 = 2^6 = 64$.`,
    },
    {
      id: "multivariable-q28", kind: "mcq", sub: "More variables",
      prompt: String.raw`In the sugar demand $D = 108.83 - 6.0294P + 0.164W - 0.4217t$, what is $\dfrac{\partial D}{\partial P}$ and what does it mean?`,
      options: [
        String.raw`$-6.0294$: a one-unit rise in price, with $W$ and $t$ fixed, lowers demand by about 6.03`,
        String.raw`$-6.0294$: a one-unit rise in price lowers demand by 6.0294%`,
        String.raw`$108.83 - 6.0294$: demand when the price is 1`,
        String.raw`$0.164$: the effect of price on demand`,
      ],
      answer: 0,
      explain: String.raw`The partial derivative is the coefficient of $P$; it approximates the change in $D$ from a one-unit increase in $P$ with all other variables held constant.`,
    },
    // 10.5
    {
      id: "multivariable-q29", kind: "mcq", sub: "Partials with more variables",
      prompt: String.raw`For $f(x_1, x_2, x_3) = 5x_1^2 + x_1x_2^3 - x_2^2x_3^2 + x_3^3$, $\dfrac{\partial f}{\partial x_2}$ is`,
      options: [
        String.raw`$3x_1x_2^2 - 2x_2x_3^2$`,
        String.raw`$3x_1x_2^2 + 2x_2x_3^2$`,
        String.raw`$10x_1 + 3x_1x_2^2 - 2x_2x_3^2$`,
        String.raw`$x_2^3 - 2x_2^2x_3$`,
      ],
      answer: 0,
      explain: String.raw`Hold $x_1$ and $x_3$ fixed: $x_1x_2^3 \to 3x_1x_2^2$ and $-x_2^2x_3^2 \to -2x_2x_3^2$; the other terms vanish (Example [14]).`,
    },
    {
      id: "multivariable-q30", kind: "fill", sub: "Partials with more variables",
      prompt: String.raw`A function of 4 variables has ____ second-order partial derivatives.`,
      answers: [["16"]],
      explain: String.raw`$n^2 = 4^2 = 16$, arranged in a $4 \times 4$ Hessian.`,
    },
    {
      id: "multivariable-q31", kind: "fill", sub: "Partials with more variables",
      prompt: String.raw`For $Q = L^{1/5}K^{2/5}M^{3/5}$, $\dfrac{\partial Q}{\partial M}$ at $L = K = M = 32$ is ____.`,
      answers: [["1.2", "6/5"]],
      explain: String.raw`$\dfrac{\partial Q}{\partial M} = \tfrac35 L^{1/5}K^{2/5}M^{-2/5} = \tfrac35 \cdot \dfrac{Q}{M} = \tfrac35 \cdot \dfrac{64}{32} = 1.2$.`,
    },
    {
      id: "multivariable-q32", kind: "mcq", sub: "Hessian",
      prompt: String.raw`What is the Hessian of $z = xy + e^x + 2y$?`,
      options: [
        String.raw`$\begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} y + e^x & 1 \\ 1 & x + 2 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} e^x & 0 \\ 0 & 0 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} e^x & 1 \\ 1 & 2 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`$z'_x = y + e^x$, $z'_y = x + 2$; then $z''_{xx} = e^x$, $z''_{xy} = z''_{yx} = 1$, $z''_{yy} = 0$. The second option lists first-order partials (past paper Q4(a)).`,
    },
    {
      id: "multivariable-q33", kind: "fill", sub: "Hessian",
      prompt: String.raw`The determinant of the Hessian of $z = xy + e^x + 2y$ is ____.`,
      answers: [["-1"]],
      explain: String.raw`$|H| = e^x \cdot 0 - 1 \cdot 1 = -1$, whatever $x$ and $y$ are.`,
    },
    {
      id: "multivariable-q34", kind: "fill", sub: "Hessian",
      prompt: String.raw`For $f(x, y) = x^3y + x^2y^2 + x + y^2$, the determinant of the Hessian at $(1, 1)$ is ____.`,
      answers: [["-17"]],
      explain: String.raw`$H(1,1) = \begin{pmatrix} 6xy + 2y^2 & 3x^2 + 4xy \\ 3x^2 + 4xy & 2x^2 + 2 \end{pmatrix} = \begin{pmatrix} 8 & 7 \\ 7 & 4 \end{pmatrix}$, so $|H| = 32 - 49 = -17$.`,
    },
    {
      id: "multivariable-q35", kind: "mcq", sub: "Hessian",
      prompt: String.raw`In the Hessian of Example [15], $f = 5x_1^2 + x_1x_2^3 + x_2^2x_3^2 + x_3^3$, what is $f''_{22}$?`,
      options: [String.raw`$6x_1x_2 + 2x_3^2$`, String.raw`$3x_2^2$`, String.raw`$4x_2x_3$`, String.raw`$6x_1x_2$`],
      answer: 0,
      explain: String.raw`$f'_2 = 3x_1x_2^2 + 2x_2x_3^2$, so $f''_{22} = 6x_1x_2 + 2x_3^2$. Dropping the $x_3$ term gives the last option.`,
    },
    {
      id: "multivariable-q36", kind: "mcq", sub: "Cobb–Douglas statements",
      prompt: String.raw`For $f(L, K) = 4L^{0.5}K^{0.5}$ on $L, K \ge 0$, which statement is true?`,
      options: [
        String.raw`$f$ has a global minimum value of 0, reached when $L = 0$ or $K = 0$`,
        String.raw`$f$ has no global minimum on $L, K \ge 0$`,
        String.raw`$f$ has a stationary point where $L = K$`,
        String.raw`$\lim_{L\to\infty} f(L, K)$ is finite for fixed $K > 0$`,
      ],
      answer: 0,
      explain: String.raw`$f \ge 0$ everywhere and $f(0, K) = f(L, 0) = 0$, so 0 is the global minimum (past paper Q4(c)(i) is wrong). $f'_L = 2\sqrt{K/L} > 0$, so there is no interior stationary point, and $f \to \infty$ as $L \to \infty$.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "multivariable-x1", kind: "calc", sub: "Hessian",
      prompt: String.raw`Suppose $z = xy + e^x + 2y$. Calculate the Hessian matrix and its determinant.`,
      marks: 5,
      rubric: [
        { point: String.raw`Correct first-order partials $z'_x = y + e^x$, $z'_y = x + 2$`, marks: 1.5 },
        { point: String.raw`Correct second-order partials $e^x$, $1$, $1$, $0$`, marks: 1.5 },
        { point: String.raw`Hessian $\begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$`, marks: 1 },
        { point: String.raw`Determinant $-1$`, marks: 1 },
      ],
      model: String.raw`First-order partial derivatives: $z'_x = y + e^x$, $\;z'_y = x + 2$.
Second-order: $z''_{xx} = \dfrac{\partial}{\partial x}(y + e^x) = e^x$; $\;z''_{xy} = \dfrac{\partial}{\partial y}(y + e^x) = 1$; $\;z''_{yx} = \dfrac{\partial}{\partial x}(x + 2) = 1$; $\;z''_{yy} = \dfrac{\partial}{\partial y}(x + 2) = 0$.
Hessian: $H = \begin{pmatrix} z''_{xx} & z''_{xy} \\ z''_{yx} & z''_{yy} \end{pmatrix} = \begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$.
Determinant: $|H| = e^x \cdot 0 - 1 \cdot 1 = -1$ (for all $x, y$).`,
      answer: String.raw`$H = \begin{pmatrix} e^x & 1 \\ 1 & 0 \end{pmatrix}$, $|H| = -1$`,
      source: "Past paper Q4(a)",
    },
    {
      id: "multivariable-x2", kind: "select", sub: "Cobb–Douglas",
      prompt: String.raw`Consider the production function $Q = f(L, K) = 4L^{0.5}K^{0.5}$, where $L \ge 0$ is labour input and $K \ge 0$ is capital input. For statements involving derivatives, consider $L > 0$ and $K > 0$. For limits, hold the other input fixed and strictly positive. Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.`,
      statements: [
        String.raw`There is no global minimum of $f$ on the domain $L, K \ge 0$.`,
        String.raw`The marginal product of labour is $\dfrac{\partial f(L,K)}{\partial L} = 2\sqrt{\dfrac{K}{L}}$.`,
        String.raw`There is no stationary point in the interior of the domain ($L > 0$, $K > 0$).`,
        String.raw`$\lim_{L\to\infty} f(L, K) = \infty$ for fixed $K > 0$, and $\lim_{K\to\infty} f(L, K) = \infty$ for fixed $L > 0$.`,
        String.raw`The mixed second-order partial derivative $\dfrac{\partial^2 f(L,K)}{\partial L\,\partial K}$ is positive for $L > 0$ and $K > 0$.`,
        String.raw`For a Cobb–Douglas function $f(L, K) = 4L^{\alpha}K^{\beta}$, defined for $L, K > 0$, the exponent $\alpha$ must lie between 0 and 1.`,
      ],
      wrong: [0, 5],
      marks: 5,
      rubric: [
        { point: "Identifies (i) as wrong", marks: 2.5 },
        { point: "Identifies (vi) as wrong", marks: 2.5 },
      ],
      model: String.raw`**(i) is wrong.** $f(L, K) = 4\sqrt{LK} \ge 0$ on the domain, and $f(0, K) = f(L, 0) = 0$. So the global minimum value 0 **is** attained (at every point with $L = 0$ or $K = 0$).
**(vi) is wrong.** Nothing restricts a Cobb–Douglas exponent to $(0, 1)$: $4L^{\alpha}K^{\beta}$ is a valid function for any $\alpha$ (e.g. Lecture Note 10's milk demand $C = AI^{2.08}P^{-1.05}$ has exponents 2.08 and $-1.05$).
Check of the true ones: (ii) $\partial f/\partial L = 4(0.5)L^{-0.5}K^{0.5} = 2\sqrt{K/L}$. (iii) $\partial f/\partial L = 2\sqrt{K/L} > 0$ (and $\partial f/\partial K = 2\sqrt{L/K} > 0$) for all $L, K > 0$, so the first-order partials are never both zero. (iv) $4\sqrt{K}\sqrt{L} \to \infty$ as $L \to \infty$, and symmetrically in $K$. (v) $\dfrac{\partial}{\partial K}\big(2L^{-0.5}K^{0.5}\big) = L^{-0.5}K^{-0.5} = 1/\sqrt{LK} > 0$.`,
      answer: "(i) and (vi)",
      source: "Past paper Q4(c)",
    },
    {
      id: "multivariable-x3", kind: "select", sub: "Cobb–Douglas",
      prompt: String.raw`Consider $Q = f(L, K) = 6L^{1/3}K^{2/3}$ with $L, K > 0$. Which TWO of the following statements are wrong? Write down the Roman numerals only.`,
      statements: [
        String.raw`The marginal product of labour is $2L^{-2/3}K^{2/3}$.`,
        String.raw`The marginal product of capital is $4\left(\dfrac{L}{K}\right)^{1/3}$.`,
        String.raw`$\dfrac{\partial^2 f}{\partial L^2} > 0$ for all $L, K > 0$.`,
        String.raw`$\dfrac{\partial^2 f}{\partial L\,\partial K} = \dfrac43 L^{-2/3}K^{-1/3}$.`,
        String.raw`By Young's theorem, $\dfrac{\partial^2 f}{\partial K\,\partial L}$ equals the expression in (iv).`,
        String.raw`$f$ has a stationary point wherever $L = K$.`,
      ],
      wrong: [2, 5],
      marks: 5,
      rubric: [
        { point: "Identifies (iii) as wrong", marks: 2.5 },
        { point: "Identifies (vi) as wrong", marks: 2.5 },
      ],
      model: String.raw`$f'_L = 6 \cdot \tfrac13 L^{-2/3}K^{2/3} = 2L^{-2/3}K^{2/3}$ (so (i) is true); $f'_K = 6 \cdot \tfrac23 L^{1/3}K^{-1/3} = 4(L/K)^{1/3}$ ((ii) true).
**(iii) is wrong.** $f''_{LL} = 2 \cdot (-\tfrac23)L^{-5/3}K^{2/3} = -\tfrac43 L^{-5/3}K^{2/3} < 0$.
(iv) True: $\dfrac{\partial}{\partial K}\big(2L^{-2/3}K^{2/3}\big) = \tfrac43 L^{-2/3}K^{-1/3}$; and (v) is Young's theorem — check: $\dfrac{\partial}{\partial L}\big(4L^{1/3}K^{-1/3}\big) = \tfrac43 L^{-2/3}K^{-1/3}$. ✓
**(vi) is wrong.** A stationary point needs $f'_L = f'_K = 0$, but $f'_L = 2L^{-2/3}K^{2/3} > 0$ for all $L, K > 0$, so there is no stationary point at all (e.g. at $L = K = 1$, $f'_L = 2 \neq 0$).`,
      answer: "(iii) and (vi)",
      source: "Modelled on past paper Q4(c)",
    },
    {
      id: "multivariable-x4", kind: "calc", sub: "Second-order partials",
      prompt: String.raw`Let $f(x, y) = x^3y + x^2y^2 + x + y^2$. Find the first-order and second-order partial derivatives, write down the Hessian matrix, and evaluate its determinant at $(1, 1)$.`,
      marks: 5,
      rubric: [
        { point: String.raw`$f'_x = 3x^2y + 2xy^2 + 1$, $f'_y = x^3 + 2x^2y + 2y$`, marks: 1.5 },
        { point: String.raw`$f''_{xx} = 6xy + 2y^2$, $f''_{xy} = f''_{yx} = 3x^2 + 4xy$, $f''_{yy} = 2x^2 + 2$`, marks: 2 },
        { point: String.raw`$H(1,1) = \begin{pmatrix} 8 & 7 \\ 7 & 4 \end{pmatrix}$ and $|H| = -17$`, marks: 1.5 },
      ],
      model: String.raw`First-order: $f'_x = 3x^2y + 2xy^2 + 1$, $\;f'_y = x^3 + 2x^2y + 2y$.
Second-order: $f''_{xx} = 6xy + 2y^2$, $\;f''_{xy} = \dfrac{\partial}{\partial y}(f'_x) = 3x^2 + 4xy$, $\;f''_{yx} = \dfrac{\partial}{\partial x}(f'_y) = 3x^2 + 4xy$, $\;f''_{yy} = 2x^2 + 2$ (mixed partials equal — Young's theorem).
$H = \begin{pmatrix} 6xy + 2y^2 & 3x^2 + 4xy \\ 3x^2 + 4xy & 2x^2 + 2 \end{pmatrix}$, so $H(1,1) = \begin{pmatrix} 8 & 7 \\ 7 & 4 \end{pmatrix}$ and $|H(1,1)| = 8 \cdot 4 - 7 \cdot 7 = 32 - 49 = -17$.`,
      answer: String.raw`$H(1,1) = \begin{pmatrix} 8 & 7 \\ 7 & 4 \end{pmatrix}$, $|H| = -17$`,
      source: "Lecture Note 10 Example [7] (with determinant as in past paper Q4(a))",
    },
    {
      id: "multivariable-x5", kind: "calc", sub: "Hessian",
      prompt: String.raw`Let $f(x_1, x_2, x_3) = 5x_1^2 + x_1x_2^3 - x_2^2x_3^2 + x_3^3$. (i) Find the three first-order partial derivatives. (ii) Find the Hessian matrix. (iii) Evaluate the Hessian and its determinant at $(1, 1, 1)$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $10x_1 + x_2^3$, $3x_1x_2^2 - 2x_2x_3^2$, $-2x_2^2x_3 + 3x_3^2$`, marks: 1.5 },
        { point: String.raw`(ii) correct $3 \times 3$ Hessian (symmetric)`, marks: 2 },
        { point: String.raw`(iii) $H(1,1,1) = \begin{pmatrix} 10 & 3 & 0 \\ 3 & 4 & -4 \\ 0 & -4 & 4 \end{pmatrix}$ and $|H| = -36$`, marks: 1.5 },
      ],
      model: String.raw`(i) $f'_1 = 10x_1 + x_2^3$, $\;f'_2 = 3x_1x_2^2 - 2x_2x_3^2$, $\;f'_3 = -2x_2^2x_3 + 3x_3^2$.
(ii) $H = \begin{pmatrix} 10 & 3x_2^2 & 0 \\ 3x_2^2 & 6x_1x_2 - 2x_3^2 & -4x_2x_3 \\ 0 & -4x_2x_3 & -2x_2^2 + 6x_3 \end{pmatrix}$.
(iii) At $(1,1,1)$: $H = \begin{pmatrix} 10 & 3 & 0 \\ 3 & 4 & -4 \\ 0 & -4 & 4 \end{pmatrix}$.
Cofactor expansion along row 1: $|H| = 10(4 \cdot 4 - (-4)(-4)) - 3(3 \cdot 4 - (-4) \cdot 0) + 0 = 10(0) - 3(12) = -36$.`,
      answer: String.raw`$|H(1,1,1)| = -36$`,
      source: "Lecture Note 10 Example [14]",
    },
    {
      id: "multivariable-x6", kind: "calc", sub: "Functions of two variables",
      prompt: String.raw`Consider $z = f(x, y) = \sqrt{x} + y^2$. (i) State the domain and the range of $f$, with reasons. (ii) Evaluate $f(4, 3)$ and $f(25, 100)$. (iii) Find $\dfrac{\partial z}{\partial x}$ and $\dfrac{\partial z}{\partial y}$ for $x > 0$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) domain $\{(x,y): x \ge 0,\ y \in \mathbb{R}\}$ with reason`, marks: 1.5 },
        { point: String.raw`(i) range $[0, \infty)$ with reason`, marks: 1 },
        { point: "(ii) 11 and 10005", marks: 1 },
        { point: String.raw`(iii) $\frac{1}{2\sqrt{x}}$ and $2y$`, marks: 1.5 },
      ],
      model: String.raw`(i) $\sqrt{x}$ is defined only for $x \ge 0$, and $y^2$ for every real $y$: $D = \{(x, y): x \ge 0 \text{ and } y \in \mathbb{R}\}$. Since $\sqrt{x} \ge 0$ and $y^2 \ge 0$, $z \ge 0$; $z = 0$ at $(0,0)$ and $z$ can be arbitrarily large, so the range is $[0, \infty)$.
(ii) $f(4, 3) = 2 + 9 = 11$; $f(25, 100) = 5 + 10000 = 10005$.
(iii) $\dfrac{\partial z}{\partial x} = \dfrac{1}{2}x^{-1/2} = \dfrac{1}{2\sqrt{x}}$ (holding $y$ fixed); $\dfrac{\partial z}{\partial y} = 2y$ (holding $x$ fixed).`,
      answer: String.raw`$D = \{x \ge 0, y \in \mathbb{R}\}$, range $[0,\infty)$; 11, 10005; $\frac{1}{2\sqrt x}$, $2y$`,
      source: "Lecture Note 10 Example [4]",
    },
    {
      id: "multivariable-x7", kind: "calc", sub: "Marginal products",
      prompt: String.raw`A firm's production function is $Q = f(L, K) = L^{1/2}K^{1/2}$. (i) Find $MP_L$ and $MP_K$. (ii) Evaluate them at $L = 16$, $K = 4$. (iii) Find $\dfrac{\partial^2 f}{\partial K\,\partial L}$ and state its sign.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $MP_L = \tfrac12L^{-1/2}K^{1/2}$, $MP_K = \tfrac12L^{1/2}K^{-1/2}$`, marks: 2 },
        { point: String.raw`(ii) $MP_L = 0.25$, $MP_K = 1$`, marks: 1.5 },
        { point: String.raw`(iii) $\tfrac14 L^{-1/2}K^{-1/2} > 0$`, marks: 1.5 },
      ],
      model: String.raw`(i) Holding $K$ fixed: $MP_L = \dfrac{\partial f}{\partial L} = \tfrac12L^{-1/2}K^{1/2}$. Holding $L$ fixed: $MP_K = \dfrac{\partial f}{\partial K} = \tfrac12L^{1/2}K^{-1/2}$.
(ii) $MP_L = \tfrac12 \cdot \tfrac{1}{4} \cdot 2 = 0.25$; $\;MP_K = \tfrac12 \cdot 4 \cdot \tfrac12 = 1$.
(iii) $\dfrac{\partial}{\partial K}\Big(\tfrac12L^{-1/2}K^{1/2}\Big) = \tfrac14 L^{-1/2}K^{-1/2} = \dfrac{1}{4\sqrt{LK}} > 0$ for $L, K > 0$ (at $(16, 4)$ it equals $1/32$).`,
      answer: String.raw`$MP_L = 0.25$, $MP_K = 1$; $f''_{LK} = \frac{1}{4\sqrt{LK}} > 0$`,
      source: "Lecture Note 10 Example [8]",
    },
    {
      id: "multivariable-x8", kind: "calc", sub: "Marginal utility",
      prompt: String.raw`Let $u(x, y) = \tfrac14\ln(xy)$ for $x, y > 0$. (i) Find the marginal utilities $MU_x$ and $MU_y$. (ii) Find all second-order partial derivatives and the Hessian. (iii) Find the determinant of the Hessian.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $MU_x = \frac{1}{4x}$, $MU_y = \frac{1}{4y}$`, marks: 1.5 },
        { point: String.raw`(ii) $u''_{xx} = -\frac{1}{4x^2}$, $u''_{yy} = -\frac{1}{4y^2}$, $u''_{xy} = u''_{yx} = 0$`, marks: 2 },
        { point: String.raw`(iii) $|H| = \frac{1}{16x^2y^2}$`, marks: 1.5 },
      ],
      model: String.raw`(i) Chain rule: $MU_x = \tfrac14 \cdot \dfrac{1}{xy}\cdot y = \dfrac{1}{4x}$; $\;MU_y = \tfrac14 \cdot \dfrac{1}{xy}\cdot x = \dfrac{1}{4y}$.
(ii) $u''_{xx} = -\dfrac{1}{4x^2}$, $\;u''_{xy} = \dfrac{\partial}{\partial y}\Big(\dfrac{1}{4x}\Big) = 0$, $\;u''_{yx} = 0$, $\;u''_{yy} = -\dfrac{1}{4y^2}$.
$H = \begin{pmatrix} -\frac{1}{4x^2} & 0 \\ 0 & -\frac{1}{4y^2} \end{pmatrix}$.
(iii) $|H| = \Big(-\dfrac{1}{4x^2}\Big)\Big(-\dfrac{1}{4y^2}\Big) - 0 = \dfrac{1}{16x^2y^2}$.`,
      answer: String.raw`$MU_x = \frac{1}{4x}$, $MU_y = \frac{1}{4y}$; $|H| = \frac{1}{16x^2y^2}$`,
      source: "Modelled on Lecture Note 10 Example [9] and past paper Q4(a)–(b)",
    },
    {
      id: "multivariable-x9", kind: "proof", sub: "Young's theorem",
      prompt: String.raw`Let $f(x, y) = x^2e^{3y}$. Find all second-order partial derivatives and show that the result agrees with Young's theorem.`,
      marks: 5,
      rubric: [
        { point: String.raw`$f'_x = 2xe^{3y}$, $f'_y = 3x^2e^{3y}$`, marks: 1.5 },
        { point: String.raw`$f''_{xx} = 2e^{3y}$, $f''_{yy} = 9x^2e^{3y}$`, marks: 1 },
        { point: String.raw`Both mixed partials $= 6xe^{3y}$`, marks: 1.5 },
        { point: "States Young's theorem and concludes they agree", marks: 1 },
      ],
      model: String.raw`$f'_x = 2xe^{3y}$ (hold $y$ fixed); $\;f'_y = x^2 \cdot 3e^{3y} = 3x^2e^{3y}$ (chain rule, hold $x$ fixed).
$f''_{xx} = 2e^{3y}$; $\;f''_{yy} = 9x^2e^{3y}$.
$\dfrac{\partial^2 f}{\partial y\,\partial x} = \dfrac{\partial}{\partial y}\big(2xe^{3y}\big) = 6xe^{3y}$; $\;\dfrac{\partial^2 f}{\partial x\,\partial y} = \dfrac{\partial}{\partial x}\big(3x^2e^{3y}\big) = 6xe^{3y}$.
Young's theorem: for a twice-differentiable $f$, $\dfrac{\partial^2 f}{\partial y\,\partial x} = \dfrac{\partial^2 f}{\partial x\,\partial y}$. Both equal $6xe^{3y}$, so the order of differentiation does not matter here, as the theorem says. $\blacksquare$`,
      answer: String.raw`$f''_{xy} = f''_{yx} = 6xe^{3y}$`,
      source: "Modelled on Lecture Note 10 Example [10]",
    },
    {
      id: "multivariable-x10", kind: "explain", sub: "Economic interpretation",
      prompt: String.raw`Frisch and Haavelmo estimated milk demand as $C = A \times \dfrac{I^{2.08}}{P^{1.05}}$, where $A > 0$, $C$ is milk consumption, $P$ the relative price of milk and $I$ income per family. Find $\dfrac{\partial C}{\partial I}$ and $\dfrac{\partial C}{\partial P}$, state their signs, and explain what each means.`,
      marks: 5,
      rubric: [
        { point: String.raw`$\partial C/\partial I = 2.08AI^{1.08}P^{-1.05}$`, marks: 1.5 },
        { point: String.raw`$\partial C/\partial P = -1.05AI^{2.08}P^{-2.05}$`, marks: 1.5 },
        { point: "Correct signs with interpretation (other variable held fixed)", marks: 2 },
      ],
      model: String.raw`Write $C = AI^{2.08}P^{-1.05}$.
$\dfrac{\partial C}{\partial I} = 2.08AI^{1.08}P^{-1.05} > 0$ (hold $P$ fixed, power rule in $I$). With the price fixed, a one-unit rise in income raises milk consumption by approximately this amount: milk consumption rises with income.
$\dfrac{\partial C}{\partial P} = -1.05AI^{2.08}P^{-2.05} < 0$ (hold $I$ fixed). With income fixed, a one-unit rise in the relative price lowers consumption by approximately $1.05AI^{2.08}P^{-2.05}$: demand slopes down in price.
Both signs follow because $A, I, P > 0$, so all powers are positive.`,
      answer: String.raw`$\partial C/\partial I > 0$, $\partial C/\partial P < 0$`,
      source: "Lecture Note 10 Example [5]",
    },
    {
      id: "multivariable-x11", kind: "explain", sub: "Economic interpretation",
      prompt: String.raw`US sugar demand in 1929–35 was estimated as $D = 108.83 - 6.0294P + 0.164W - 0.4217t$ ($P$ = price of sugar, $W$ = a production index, $t$ = date with $t = 0$ in 1929). (i) Find the three first-order partial derivatives and interpret each. (ii) How many second-order partial derivatives does $D$ have, and what are they?`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $\partial D/\partial P = -6.0294$, $\partial D/\partial W = 0.164$, $\partial D/\partial t = -0.4217$`, marks: 1.5 },
        { point: "(i) interpretation: approximate change in D from a one-unit increase, others held constant", marks: 2 },
        { point: String.raw`(ii) $3^2 = 9$, all equal to 0`, marks: 1.5 },
      ],
      model: String.raw`(i) $\dfrac{\partial D}{\partial P} = -6.0294$: raising the sugar price by one unit, with $W$ and $t$ held constant, lowers demand by about 6.03 units.
$\dfrac{\partial D}{\partial W} = 0.164$: a one-unit rise in the production index (other variables fixed) raises demand by about 0.164.
$\dfrac{\partial D}{\partial t} = -0.4217$: each extra year (price and index fixed) lowers demand by about 0.42.
(ii) With $n = 3$ variables there are $n^2 = 9$ second-order partials. Each first-order partial is a constant, so all nine are 0 (the Hessian is the $3 \times 3$ zero matrix).`,
      answer: "−6.0294, 0.164, −0.4217; nine second-order partials, all 0",
      source: "Lecture Note 10 Example [12]",
    },
    {
      id: "multivariable-x12", kind: "calc", sub: "More variables",
      prompt: String.raw`The production function is $Q = f(L, K, M) = L^{1/5}K^{2/5}M^{3/5}$. (i) Find $\dfrac{\partial Q}{\partial L}$, $\dfrac{\partial Q}{\partial K}$ and $\dfrac{\partial Q}{\partial M}$. (ii) Evaluate $Q$ and the three partial derivatives at $L = K = M = 32$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $\tfrac15L^{-4/5}K^{2/5}M^{3/5}$, $\tfrac25L^{1/5}K^{-3/5}M^{3/5}$, $\tfrac35L^{1/5}K^{2/5}M^{-2/5}$`, marks: 2.5 },
        { point: String.raw`(ii) $Q = 64$`, marks: 1 },
        { point: "(ii) 0.4, 0.8 and 1.2", marks: 1.5 },
      ],
      model: String.raw`(i) Power rule in one input, the others held constant:
$\dfrac{\partial Q}{\partial L} = \tfrac15L^{-4/5}K^{2/5}M^{3/5}$, $\;\dfrac{\partial Q}{\partial K} = \tfrac25L^{1/5}K^{-3/5}M^{3/5}$, $\;\dfrac{\partial Q}{\partial M} = \tfrac35L^{1/5}K^{2/5}M^{-2/5}$.
(ii) $Q = 32^{1/5}\cdot32^{2/5}\cdot32^{3/5} = 32^{6/5} = 2^6 = 64$.
Note $\dfrac{\partial Q}{\partial L} = \tfrac15\dfrac{Q}{L}$ etc. So $\dfrac{\partial Q}{\partial L} = \tfrac15\cdot\tfrac{64}{32} = 0.4$, $\;\dfrac{\partial Q}{\partial K} = \tfrac25 \cdot 2 = 0.8$, $\;\dfrac{\partial Q}{\partial M} = \tfrac35 \cdot 2 = 1.2$.`,
      answer: "Q = 64; partials 0.4, 0.8, 1.2",
      source: "Lecture Note 10 Example [13]",
    },
    {
      id: "multivariable-x13", kind: "calc", sub: "Definition",
      prompt: String.raw`Use the definition of the partial derivative, $\dfrac{\partial f}{\partial x} = \lim_{h\to0}\dfrac{f(x + h, y) - f(x, y)}{h}$, to find $\dfrac{\partial f}{\partial x}$ for $f(x, y) = x^2y$. Check your answer with the usual rules, and also find $\dfrac{\partial f}{\partial y}$.`,
      marks: 5,
      rubric: [
        { point: String.raw`Correct difference quotient with only $x$ changed`, marks: 1.5 },
        { point: String.raw`Simplifies to $2xy + hy$`, marks: 1.5 },
        { point: String.raw`Limit $2xy$; check by rules`, marks: 1 },
        { point: String.raw`$\partial f/\partial y = x^2$`, marks: 1 },
      ],
      model: String.raw`$\dfrac{f(x + h, y) - f(x, y)}{h} = \dfrac{(x + h)^2y - x^2y}{h} = \dfrac{(x^2 + 2xh + h^2 - x^2)y}{h} = \dfrac{(2xh + h^2)y}{h} = 2xy + hy$.
As $h \to 0$: $\dfrac{\partial f}{\partial x} = 2xy$.
Check: treating $y$ as a constant, $\dfrac{\partial}{\partial x}(x^2y) = 2xy$. ✓
Holding $x$ fixed: $\dfrac{\partial f}{\partial y} = x^2$.`,
      answer: String.raw`$\partial f/\partial x = 2xy$, $\partial f/\partial y = x^2$`,
      source: "Lecture Note 10 (10.5 definition); modelled on past paper Q2(b)",
    },
    {
      id: "multivariable-x14", kind: "proof", sub: "Cobb–Douglas",
      prompt: String.raw`For $Q = f(L, K) = 4L^{0.5}K^{0.5}$ with $L, K \ge 0$: (i) show that $f$ has no stationary point with $L > 0$, $K > 0$; (ii) show that $f$ does have a global minimum on $L, K \ge 0$; (iii) show that $\dfrac{\partial^2 f}{\partial L\,\partial K} > 0$ for $L, K > 0$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $f'_L = 2\sqrt{K/L} > 0$ (and $f'_K > 0$), so never both zero`, marks: 2 },
        { point: String.raw`(ii) $f \ge 0$ and $f(0, K) = 0$: minimum 0`, marks: 1.5 },
        { point: String.raw`(iii) $f''_{LK} = 1/\sqrt{LK} > 0$`, marks: 1.5 },
      ],
      model: String.raw`(i) $f'_L = 2L^{-0.5}K^{0.5} = 2\sqrt{K/L}$ and $f'_K = 2\sqrt{L/K}$. For $L, K > 0$ both are strictly positive, so the first-order conditions $f'_L = 0$, $f'_K = 0$ can never hold: no interior stationary point.
(ii) $f(L, K) = 4\sqrt{LK} \ge 0$ for all $L, K \ge 0$, and $f(0, K) = 0$ (also $f(L, 0) = 0$). So the smallest value, 0, is attained: $f$ has a global minimum of 0 on the boundary.
(iii) $\dfrac{\partial}{\partial K}\big(2L^{-0.5}K^{0.5}\big) = 2 \cdot 0.5\,L^{-0.5}K^{-0.5} = \dfrac{1}{\sqrt{LK}} > 0$. $\blacksquare$`,
      answer: String.raw`No interior stationary point; global min 0 at $L = 0$ or $K = 0$; $f''_{LK} = 1/\sqrt{LK} > 0$`,
      source: "Modelled on past paper Q4(c)",
    },
    {
      id: "multivariable-x15", kind: "calc", sub: "Second-order partials",
      prompt: String.raw`Let $f(x, y) = x^2y^3$. Find all first- and second-order partial derivatives, write down the Hessian, and evaluate its determinant at $(1, -1)$.`,
      marks: 5,
      rubric: [
        { point: String.raw`$f'_x = 2xy^3$, $f'_y = 3x^2y^2$`, marks: 1 },
        { point: String.raw`$f''_{xx} = 2y^3$, $f''_{xy} = f''_{yx} = 6xy^2$, $f''_{yy} = 6x^2y$`, marks: 2 },
        { point: String.raw`$H(1,-1) = \begin{pmatrix} -2 & 6 \\ 6 & -6 \end{pmatrix}$`, marks: 1 },
        { point: String.raw`$|H| = -24$`, marks: 1 },
      ],
      model: String.raw`$f'_x = 2xy^3$, $\;f'_y = 3x^2y^2$.
$f''_{xx} = 2y^3$, $\;f''_{xy} = \dfrac{\partial}{\partial y}(2xy^3) = 6xy^2$, $\;f''_{yx} = \dfrac{\partial}{\partial x}(3x^2y^2) = 6xy^2$, $\;f''_{yy} = 6x^2y$.
$H = \begin{pmatrix} 2y^3 & 6xy^2 \\ 6xy^2 & 6x^2y \end{pmatrix}$; at $(1, -1)$: $H = \begin{pmatrix} -2 & 6 \\ 6 & -6 \end{pmatrix}$.
$|H| = (-2)(-6) - (6)(6) = 12 - 36 = -24$.`,
      answer: String.raw`$|H(1,-1)| = -24$`,
      source: "Lecture Note 10 Example [10]",
    },
  ],
};

export default data;
