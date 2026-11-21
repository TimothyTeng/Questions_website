import type { TopicData } from "@/lib/he1004/types";

// Lecture Note 4: Properties of Functions (4.1 Shifting Graphs, 4.2 New Functions from Old,
// 4.3 Inverse Functions, 4.4 General Functions) + Assignment 5 Q1–Q2 and Assignment 6 Q1, Q4.

const data: TopicData = {
  id: "function-props",
  sections: [
    // ------------------------------------------------------------------ 4.1
    {
      title: "4.1 Shifting Graphs",
      intro: String.raw`Four rules tell you how the graph of $y = f(x)$ moves when the formula is changed. The lecture illustrates each one with $y = \sqrt{x}$. The same idea explains how a per-unit tax on producers shifts the supply curve.`,
      points: [
        {
          term: "Rule 1: add a constant",
          text: String.raw`If $y = f(x)$ is replaced by $y = f(x) + c$, the graph is moved **upwards** by $c$ units if $c > 0$ (**downwards** if $c$ is negative).`,
          eg: String.raw`$y = \sqrt{x} + 2$ starts at $(0, 2)$; $y = \sqrt{x} - 2$ starts at $(0, -2)$ and crosses the $x$-axis at $x = 4$.`,
        },
        {
          term: "Rule 2: replace x by x + c",
          text: String.raw`If $y = f(x)$ is replaced by $y = f(x + c)$, the graph is moved $c$ units to the **left** if $c > 0$ (to the **right** if $c$ is negative). Watch the direction: a plus sign inside moves the graph left.`,
          eg: String.raw`$y = \sqrt{x + 2}$ starts at $(-2, 0)$; $y = \sqrt{x - 2}$ starts at $(2, 0)$.`,
        },
        {
          term: "Rule 3: multiply by a constant",
          text: String.raw`If $y = f(x)$ is replaced by $y = c\,f(x)$, the graph is **stretched vertically** if $c > 0$ (stretched vertically and **reflected about the $x$-axis** if $c$ is negative).`,
          eg: String.raw`$y = 2\sqrt{x}$ is twice as high as $y = \sqrt{x}$ at every $x$; $y = -\sqrt{x}$ is the mirror image of $y = \sqrt{x}$ in the $x$-axis.`,
        },
        {
          term: "Rule 4: replace x by −x",
          text: String.raw`If $y = f(x)$ is replaced by $y = f(-x)$, the graph is **reflected about the $y$-axis**.`,
          eg: String.raw`$y = \sqrt{-x}$ is defined for $x \le 0$ and is the mirror image of $y = \sqrt{x}$ in the $y$-axis.`,
        },
        {
          term: "Per-unit tax on producers",
          text: String.raw`If the government imposes a tax of $t$ dollars per unit on producers, a producer who sells at market price $P$ keeps only $P - t$. So the supply function $Q^S = S(P)$ becomes $Q^S = S(P - t)$: replace $P$ by $P - t$ (rule 2 with $c = -t$).`,
          eg: String.raw`$Q^S = 10 + 2P$ with a 1-dollar tax becomes $Q^S = 10 + 2(P - 1) = 8 + 2P$.`,
        },
        {
          term: "Tax in the usual (Q, P) diagram",
          text: String.raw`With $Q$ on the horizontal axis and $P$ on the vertical axis, the supply curve written as $P$ in terms of $Q$ moves **up by $t$** (rule 1): for every quantity, producers now need a price $t$ higher. The new equilibrium is where the new supply meets the (unchanged) demand.`,
          eg: String.raw`$P = \frac{Q - 10}{2}$ becomes $P = \frac{Q - 10}{2} + 1 = \frac{Q - 8}{2}$.`,
        },
      ],
      formulas: [
        { name: "Shift up / down", tex: String.raw`y = f(x) + c \quad (c > 0:\ \text{up } c;\ c < 0:\ \text{down})` },
        { name: "Shift left / right", tex: String.raw`y = f(x + c) \quad (c > 0:\ \text{left } c;\ c < 0:\ \text{right})` },
        { name: "Vertical stretch", tex: String.raw`y = c\,f(x) \quad (c < 0 \text{ also reflects about the } x\text{-axis})` },
        { name: "Reflection about the y-axis", tex: String.raw`y = f(-x)` },
        { name: "Supply after a per-unit tax t on producers", tex: String.raw`Q^S = S(P) \;\longrightarrow\; Q^S = S(P - t)` },
      ],
      table: [
        ["New formula", "What happens to the graph of $y = f(x)$", "Example with $\\sqrt{x}$"],
        ["$f(x) + c$", "up $c$ ($c > 0$) / down ($c < 0$)", "$\\sqrt{x} + 2$: up 2"],
        ["$f(x + c)$", "left $c$ ($c > 0$) / right ($c < 0$)", "$\\sqrt{x + 2}$: left 2"],
        ["$c\\,f(x)$", "vertical stretch; also flipped in the $x$-axis if $c < 0$", "$2\\sqrt{x}$, $-\\sqrt{x}$"],
        ["$f(-x)$", "reflected about the $y$-axis", "$\\sqrt{-x}$"],
      ],
      figures: [
        {
          title: "Rule 1: y = f(x) + c",
          xr: [0, 5.5],
          yr: [-2.5, 4.8],
          curves: [
            { f: "sqrt(x)+2", label: "y = √x + 2", to: 5, tone: 1 },
            { f: "sqrt(x)", label: "y = √x", to: 5 },
            { f: "sqrt(x)-2", label: "y = √x − 2", to: 5, tone: 2 },
          ],
          points: [
            { at: [0, 2], tone: 1 },
            { at: [0, 0] },
            { at: [0, -2], tone: 2 },
            { at: [4, 0], label: "(4, 0)", tone: 2 },
          ],
          caption: "Adding 2 moves √x up 2 units; subtracting 2 moves it down 2 units.",
        },
        {
          title: "Rule 2: y = f(x + c)",
          xr: [-2.5, 5.5],
          yr: [-0.5, 2.8],
          curves: [
            { f: "sqrt(x+2)", label: "√(x + 2)", to: 2, tone: 1 },
            { f: "sqrt(x)", label: "√x", to: 3.5 },
            { f: "sqrt(x-2)", label: "√(x − 2)", to: 5, tone: 2 },
          ],
          points: [
            { at: [-2, 0], label: "(−2, 0)", tone: 1 },
            { at: [0, 0] },
            { at: [2, 0], label: "(2, 0)", tone: 2 },
          ],
          caption: "√(x + 2) is √x moved 2 units LEFT; √(x − 2) is √x moved 2 units RIGHT.",
        },
        {
          title: "Rule 3: y = c f(x)",
          xr: [0, 5.5],
          yr: [-2.6, 4.8],
          curves: [
            { f: "2*sqrt(x)", label: "y = 2√x", to: 5, tone: 1 },
            { f: "sqrt(x)", label: "y = √x", to: 5, dashed: true },
            { f: "-sqrt(x)", label: "y = −√x", to: 5, tone: 2 },
          ],
          caption: "c = 2 stretches the graph vertically; c = −1 reflects it about the x-axis.",
        },
        {
          title: "Rule 4: y = f(−x)",
          xr: [-5.5, 5.5],
          yr: [-0.5, 3],
          curves: [
            { f: "sqrt(-x)", label: "y = √(−x)", from: -5, to: 0, tone: 1 },
            { f: "sqrt(x)", label: "y = √x", from: 0, to: 5, dashed: true },
          ],
          caption: "Replacing x by −x reflects the graph about the y-axis.",
        },
        {
          title: "A 1-dollar per-unit tax shifts supply up by 1",
          x: "Q",
          y: "P",
          xr: [62, 76],
          yr: [26, 38],
          curves: [
            { f: "(x-10)/2", label: "S before", tone: 3, dashed: true },
            { f: "(x-8)/2", label: "S after tax", tone: 1 },
            { f: "100-x", label: "D", tone: 0 },
          ],
          points: [
            { at: [70, 30], label: "before (70, 30)", tone: 3 },
            { at: [208 / 3, 92 / 3], label: "after (69.33, 30.67)", tone: 1, guides: true },
          ],
          segments: [{ from: [66, 28], to: [66, 29], arrow: true, tone: 1, label: "+1" }],
          caption: "Qˢ = 10 + 2P, Qᴰ = 100 − P. With the tax, Qˢ = 8 + 2P: equilibrium P = 92/3 ≈ 30.67, Q = 208/3 ≈ 69.33.",
        },
      ],
      worked: [
        {
          problem: String.raw`Suppose the supply curve is $Q^S = 10 + 2P$ and the demand curve is $Q^D = 100 - P$. If the government imposes a 1-dollar tax per unit on the producers, find the new supply curve function and the equilibrium.`,
          solution: String.raw`**Before the tax:** $10 + 2P = 100 - P \Rightarrow 3P = 90 \Rightarrow P = 30$, $Q = 70$.
**New supply:** producers keep $P - 1$ of each unit's price, so replace $P$ by $P - 1$:
$$Q^S = 10 + 2(P - 1) = 8 + 2P.$$
**New equilibrium:** $8 + 2P = 100 - P \Rightarrow 3P = 92 \Rightarrow P = \frac{92}{3} \approx 30.67$.
Then $Q = 100 - \frac{92}{3} = \frac{208}{3} \approx 69.33$ (check: $8 + 2 \cdot \frac{92}{3} = \frac{208}{3}$).
The price buyers pay rises by $\frac{2}{3}$ (less than the full tax) and the quantity traded falls from $70$ to about $69.33$.`,
          source: "Lecture Note 4 exercise",
        },
        {
          problem: String.raw`Describe how the graph of $y = 2\sqrt{x + 3} - 1$ is obtained from the graph of $y = \sqrt{x}$, and give its starting point.`,
          solution: String.raw`Apply the rules one at a time:
- $\sqrt{x} \to \sqrt{x + 3}$: rule 2 with $c = 3 > 0$, move **3 units left** (start moves to $(-3, 0)$).
- $\sqrt{x + 3} \to 2\sqrt{x + 3}$: rule 3, **stretch vertically** by factor 2 (start stays at $(-3, 0)$).
- $2\sqrt{x + 3} \to 2\sqrt{x + 3} - 1$: rule 1 with $c = -1$, move **1 unit down**.
Starting point: $(-3, -1)$.`,
          source: "Modelled on Lecture Note 4, 4.1",
        },
      ],
    },
    // ------------------------------------------------------------------ 4.2
    {
      title: "4.2 New Functions from Old",
      intro: String.raw`Functions can be combined: added, subtracted, multiplied, or fed into one another (composition). Economic models use these constantly: average cost, profit and composite functions.`,
      points: [
        {
          term: "Sum",
          text: String.raw`Suppose $f$ and $g$ are functions with the same domain $D$. The function $F$ defined by $F(x) = f(x) + g(x)$ is called the **sum** of $f$ and $g$, and we write $F = f + g$.`,
        },
        {
          term: "Difference",
          text: String.raw`The function $F$ defined by $F(x) = f(x) - g(x)$ is called the **difference** of $f$ and $g$, and we write $F = f - g$. Sums and differences of functions are often used in economic models.`,
        },
        {
          term: "Average cost",
          text: String.raw`If producing $Q$ units costs $C(Q)$, the cost per unit of output, called **average cost**, is $AC = \frac{C(Q)}{Q}$ ($Q > 0$).`,
          eg: String.raw`For the cubic cost function $C(Q) = aQ^3 + bQ^2 + cQ + d$: $AC = aQ^2 + bQ + c + \frac{d}{Q}$, the **sum** of the quadratic $y = aQ^2 + bQ + c$ and the hyperbola $y = d/Q$.`,
        },
        {
          term: "Profit function",
          text: String.raw`If $R(Q)$ is the revenue from producing and selling $Q$ units, the profit function is the **difference** $\pi(Q) = R(Q) - C(Q)$. In the lecture's figure the cost function is cubic and the revenue function is **linear** (a straight line through the origin); profit is positive between the two points where the curves cross.`,
        },
        {
          term: "Composite function",
          text: String.raw`If $y$ is a function of $u$, $y = f(u)$, and $u$ is a function of $x$, $u = g(x)$, then $y$ can be regarded as a function of $x$: $y = f(u) = f(g(x))$. We call $y$ a **composite function** of $x$.`,
        },
        {
          term: "Kernel (interior) and exterior function",
          text: String.raw`In $y = f(g(x))$, $g(x)$ is called the **kernel** or **interior** function, while $f$ is called the **exterior** function. Work from the inside out: first compute $u = g(x)$, then $f(u)$.`,
        },
        {
          term: "Notation f ∘ g",
          text: String.raw`$f(g(x))$ is often denoted by $f \circ g$ or $(f \circ g)(x)$ (read "$f$ of $g$"). In general $f \circ g \neq g \circ f$: the order matters.`,
          eg: String.raw`$f(x) = x^2$, $g(x) = 1 + x$: $(f \circ g)(x) = (1 + x)^2$ but $(g \circ f)(x) = 1 + x^2$.`,
        },
        {
          term: "Remark: composition is not the product",
          text: String.raw`$(f \circ g)(x)$ and $(f \cdot g)(x)$ are two different concepts. $(f \cdot g)(x)$ is the **product** of $f$ and $g$: $(f \cdot g)(x) = f(x) \times g(x)$.`,
          eg: String.raw`With $f(x) = x^2$, $g(x) = 1 + x$: $(f \cdot g)(x) = x^2(1 + x) = x^2 + x^3$, while $(f \circ g)(x) = (1 + x)^2$.`,
        },
      ],
      formulas: [
        { name: "Sum and difference", tex: String.raw`(f + g)(x) = f(x) + g(x), \qquad (f - g)(x) = f(x) - g(x)` },
        { name: "Average cost", tex: String.raw`AC(Q) = \frac{C(Q)}{Q}, \quad Q > 0` },
        { name: "Average cost of a cubic cost function", tex: String.raw`C(Q) = aQ^3 + bQ^2 + cQ + d \;\Rightarrow\; AC = aQ^2 + bQ + c + \frac{d}{Q}` },
        { name: "Profit", tex: String.raw`\pi(Q) = R(Q) - C(Q)` },
        { name: "Composite function", tex: String.raw`(f \circ g)(x) = f(g(x)), \qquad f \circ g \neq g \circ f \text{ in general}` },
        { name: "Product of functions", tex: String.raw`(f \cdot g)(x) = f(x) \times g(x)` },
      ],
      figures: [
        {
          title: "Average cost = quadratic + hyperbola",
          x: "Q",
          y: "y",
          xr: [0, 5],
          yr: [0, 12],
          curves: [
            { f: "0.5*x^2+1", label: "aQ² + bQ + c", dashed: true, tone: 2 },
            { f: "4/x", label: "d/Q", dashed: true, tone: 1, from: 0.34 },
            { f: "0.5*x^2+1+4/x", label: "AC(Q)", from: 0.4 },
          ],
          points: [{ at: [1.587, 4.78], label: "lowest AC" }],
          caption: "Illustration with a = 0.5, b = 0, c = 1, d = 4: AC(Q) = 0.5Q² + 1 + 4/Q. Near Q = 0 the d/Q part dominates; for large Q the quadratic part dominates.",
        },
        {
          title: "Profit = revenue − cost",
          x: "Q",
          y: "y",
          xr: [0, 5],
          yr: [-8, 45],
          curves: [
            { f: "x^3-6*x^2+14*x+4", label: "C(Q)", tone: 1 },
            { f: "8*x", label: "R(Q)", tone: 2 },
            { f: "-x^3+6*x^2-6*x-4", label: "π(Q)" },
          ],
          points: [
            { at: [2, 16], guides: true },
            { at: [4.449, 35.6], guides: true },
            { at: [2, 0], label: "π = 0" },
            { at: [4.449, 0], label: "π = 0" },
          ],
          caption: "Illustration: C(Q) = Q³ − 6Q² + 14Q + 4 (cubic), R(Q) = 8Q (linear). π(Q) = R(Q) − C(Q) > 0 exactly where R lies above C (2 < Q < 2 + √6).",
        },
        {
          title: "f ∘ g ≠ g ∘ f",
          xr: [-3, 2],
          yr: [-0.5, 6],
          curves: [
            { f: "(1+x)^2", label: "(f∘g)(x) = (1 + x)²" },
            { f: "1+x^2", label: "(g∘f)(x) = 1 + x²", tone: 1 },
          ],
          caption: "f(x) = x², g(x) = 1 + x. The two composites are different functions (they agree only at x = 0).",
        },
      ],
      worked: [
        {
          problem: String.raw`The cost of producing $Q$ units is $C(Q)$. What is average cost? If $C(Q) = aQ^3 + bQ^2 + cQ + d$, find $AC$.`,
          solution: String.raw`Average cost is cost per unit of output: $AC = \frac{C(Q)}{Q}$, $Q > 0$.
Divide each term by $Q$:
$$AC = \frac{aQ^3 + bQ^2 + cQ + d}{Q} = aQ^2 + bQ + c + \frac{d}{Q}.$$
So $AC$ is the sum of the quadratic $y = aQ^2 + bQ + c$ and the hyperbola $y = d/Q$.`,
          source: "Lecture Note 4 example",
        },
        {
          problem: String.raw`Let $f(x) = x^2$ and $g(x) = 1 + x$. Find $(f \circ g)(x)$ and $(g \circ f)(x)$.`,
          solution: String.raw`$(f \circ g)(x) = f(g(x)) = f(1 + x) = (1 + x)^2 = 1 + 2x + x^2$.
$(g \circ f)(x) = g(f(x)) = g(x^2) = 1 + x^2$.
They differ (e.g. at $x = 1$: $4$ vs $2$), so $f \circ g \neq g \circ f$.
Compare with the product: $(f \cdot g)(x) = x^2(1 + x)$.`,
          source: "Lecture Note 4 exercise",
        },
        {
          problem: String.raw`A firm has revenue $R(Q) = 50Q$ and cost $C(Q) = Q^3 - 6Q^2 + 15Q + 32$. Write down the profit function and find the profit at $Q = 2$ and $Q = 10$.`,
          solution: String.raw`$\pi(Q) = R(Q) - C(Q) = 50Q - Q^3 + 6Q^2 - 15Q - 32 = -Q^3 + 6Q^2 + 35Q - 32$.
$\pi(2) = -8 + 24 + 70 - 32 = 54$ (profit).
$\pi(10) = -1000 + 600 + 350 - 32 = -82$ (a loss of 82).`,
          source: "Modelled on Lecture Note 4 example",
        },
      ],
    },
    // ------------------------------------------------------------------ 4.3
    {
      title: "4.3 Inverse Functions",
      intro: String.raw`A function takes $x$ to $y = f(x)$. An inverse function goes back from $y$ to $x$, and it exists only when no two different $x$ values give the same $y$.`,
      points: [
        {
          term: "Going backwards",
          text: String.raw`A function gives $x \Rightarrow y = f(x)$, but **not necessarily** $x \Leftarrow y = f(x)$: knowing $y$ need not pin down $x$.`,
          eg: String.raw`$y = x^2$: from $y = 4$ we cannot tell whether $x = 2$ or $x = -2$.`,
        },
        {
          term: "One-to-one",
          text: String.raw`$f$ is **one-to-one** if different $x$ values always give different $y$ values: each $y$ in the range comes from exactly one $x$. Equivalently, $f(x_1) = f(x_2)$ only when $x_1 = x_2$.`,
        },
        {
          term: "Inverse function",
          text: String.raw`Let $f$ be a function with domain $A$ and range $B$. **If and only if** $f$ is one-to-one, it has an inverse function $g$ with **domain $B$ and range $A$**. For each $y \in B$, $g(y)$ is the unique $x$ in $A$ such that $f(x) = y$:
$$g(y) = x \iff y = f(x), \quad x \in A,\ y \in B.$$`,
        },
        {
          term: "Undoing",
          text: String.raw`The inverse $g$ **undoes** what $f$ did to $x$: $g(f(x)) = x$ for every $x$ in $A$ (and $f(g(y)) = y$ for every $y$ in $B$). The inverse is also written $f^{-1}$, so $f^{-1}(f(x)) = x$.`,
          eg: String.raw`If $f$ is one-to-one and $10$ is in its domain, $f^{-1}(f(10)) = 10$.`,
        },
        {
          term: "How to find an inverse",
          text: String.raw`Write $y = f(x)$ and solve for $x$ in terms of $y$. If there is exactly one solution for each $y$ in the range, that formula is $x = f^{-1}(y)$. Swap the letters if you want it as a function of $x$. If some $y$ comes from two $x$ values, the inverse does not exist.`,
          eg: String.raw`$y = 4x - 3 \Rightarrow x = \frac{y + 3}{4}$, so $f^{-1}(x) = \frac{x + 3}{4}$.`,
        },
        {
          term: "Domain of the inverse",
          text: String.raw`The domain of $f^{-1}$ is the range of $f$. When the inverse is a formula, you can find it as the set of values where that formula is defined (e.g. a $\ln$ needs a positive argument, a fraction needs a non-zero denominator).`,
        },
        {
          term: "Inverse demand function",
          text: String.raw`The demand function gives quantity as a function of price, $D = f(P)$. Solving for $P$ in terms of $D$ gives the **inverse demand function** $P = f^{-1}(D)$ (price buyers will pay for quantity $D$).`,
          eg: String.raw`$D = 100 - 10P \Rightarrow P = 10 - \frac{D}{10}$.`,
        },
        {
          term: "Reading graphs",
          text: String.raw`If the graph of $f$ over its domain $A$ is always rising (or always falling), each $y$ in $B = f(A)$ is hit once, so $f$ is one-to-one and has an inverse. If some horizontal line $y = y_1$ meets the graph at two points $x_1 \neq x_2$, then $f(x_1) = f(x_2) = y_1$, so $f$ is **not** one-to-one and has no inverse.`,
        },
        {
          term: "Graph of the inverse",
          text: String.raw`Because $g(y) = x \iff y = f(x)$, the point $(a, b)$ lies on the graph of $f$ exactly when $(b, a)$ lies on the graph of $f^{-1}$. So, drawn on the same axes, the graphs of $f$ and $f^{-1}$ are mirror images in the line $y = x$.`,
        },
      ],
      formulas: [
        { name: "Defining property of the inverse", tex: String.raw`g(y) = x \iff y = f(x), \quad x \in A,\ y \in B` },
        { name: "Domain and range swap", tex: String.raw`f: A \to B \text{ one-to-one} \;\Rightarrow\; f^{-1}: B \to A` },
        { name: "The inverse undoes f", tex: String.raw`f^{-1}(f(x)) = x, \qquad f(f^{-1}(y)) = y` },
      ],
      table: [
        ["Function", "One-to-one?", "Inverse"],
        ["$y = 4x - 3$", "yes", "$x = \\frac{y + 3}{4}$"],
        ["$y = x^2,\\ x \\ge 0$", "yes", "$x = \\sqrt{y},\\ y \\ge 0$"],
        ["$y = x^3$", "yes", "$x = \\sqrt[3]{y}$, all real $y$"],
        ["$y = x^2$ (all $x$)", "no: $f(2) = f(-2) = 4$", "does not exist"],
        ["$y = |x| + 2$", "no: $f(1) = f(-1) = 3$", "does not exist"],
      ],
      figures: [
        {
          title: "y = 4x − 3 and its inverse",
          xr: [-4, 5],
          yr: [-4, 5],
          curves: [
            { f: "4*x-3", label: "y = 4x − 3", tone: 0 },
            { f: "(x+3)/4", label: "y = (x + 3)/4", tone: 1 },
            { f: "x", label: "y = x", dashed: true, tone: 3 },
          ],
          points: [
            { at: [2, 5], label: "(2, 5)" },
            { at: [5, 2], label: "(5, 2)", tone: 1 },
            { at: [1, 1] },
          ],
          caption: "(2, 5) is on f, so (5, 2) is on the inverse: the graphs are reflections in y = x.",
        },
        {
          title: "y = x² (x ≥ 0) and y = √x",
          xr: [0, 3],
          yr: [0, 3],
          curves: [
            { f: "x^2", label: "y = x², x ≥ 0", from: 0, to: 1.73 },
            { f: "sqrt(x)", label: "y = √x", tone: 1 },
            { f: "x", label: "y = x", dashed: true, tone: 3 },
          ],
          points: [
            { at: [1.5, 2.25], label: "(1.5, 2.25)" },
            { at: [2.25, 1.5], label: "(2.25, 1.5)", tone: 1 },
          ],
          caption: "Restricting y = x² to x ≥ 0 makes it one-to-one; its inverse is x = √y (drawn as y = √x).",
        },
        {
          title: "y = x² on all of ℝ is not one-to-one",
          xr: [-3, 3],
          yr: [-0.5, 6],
          curves: [{ f: "x^2", label: "y = x²" }],
          segments: [{ from: [-3, 4], to: [3, 4], dashed: true, tone: 1, label: "y = 4" }],
          points: [
            { at: [-2, 4], label: "x = −2", guides: true, tone: 1 },
            { at: [2, 4], label: "x = 2", guides: true, tone: 1 },
          ],
          caption: "y = 4 comes from both x = 2 and x = −2, so we cannot go back from y to x: no inverse.",
        },
        {
          title: "f(x) = (4eˣ + 1)/(2eˣ − 3)",
          xr: [-4, 4],
          yr: [-8, 8],
          curves: [
            { f: "(4*exp(x)+1)/(2*exp(x)-3)", to: 0.38 },
            { f: "(4*exp(x)+1)/(2*exp(x)-3)", from: 0.43, label: "f" },
          ],
          segments: [
            { from: [-4, 2], to: [4, 2], dashed: true, tone: 3, label: "y = 2" },
            { from: [-4, -1 / 3], to: [4, -1 / 3], dashed: true, tone: 3, label: "y = −1/3" },
            { from: [0.405, -8], to: [0.405, 8], dashed: true, tone: 3 },
          ],
          caption: "Assignment 6 Q1: the range of f is y < −1/3 or y > 2, which is exactly the domain of f⁻¹(x) = ln((3x + 1)/(2x − 4)).",
        },
      ],
      worked: [
        {
          problem: String.raw`(a) Find the inverse function of $y = 4x - 3$.
(b) The demand function is a function of $P$, $D = f(P)$. Suppose $D = 100 - 10P$. Find the inverse demand function.`,
          solution: String.raw`(a) $y = 4x - 3 \Rightarrow 4x = y + 3 \Rightarrow x = \frac{y + 3}{4}$. As a function of $x$: $f^{-1}(x) = \frac{x + 3}{4}$. Check: $f^{-1}(f(2)) = f^{-1}(5) = 2$.
(b) $D = 100 - 10P \Rightarrow 10P = 100 - D \Rightarrow P = 10 - \frac{D}{10} = 10 - 0.1D$. Check: $P = 3$ gives $D = 70$, and $10 - 7 = 3$.`,
          source: "Lecture Note 4 exercise (a), (b)",
        },
        {
          problem: String.raw`(c) The lecture shows two graphs: $f$, rising over the whole interval $A$ with range $f(A) = B$; and $g$, which rises to a peak, falls, then rises again, so that a level $y_1$ is reached at two points $x_1$ and $x_2$ in $A$. Which function has an inverse?`,
          solution: String.raw`$f$ is always increasing on $A$, so every $y \in B$ comes from exactly one $x \in A$: $f$ is one-to-one and has an inverse with domain $B$ and range $A$.
For $g$, $g(x_1) = g(x_2) = y_1$ with $x_1 \neq x_2$: going back from $y_1$ we cannot tell which $x$ we started from, so $g$ is not one-to-one and has **no** inverse on $A$.`,
          source: "Lecture Note 4 exercise (c)",
        },
        {
          problem: String.raw`Find the inverse function, if it exists: (a) $y = x^2$, $x \ge 0$; (b) $y = x^3$; (c) $y = |x| + 2$; (d) $P = 120 - 5Q$; (e) $F = \frac{9}{5}C + 32$.`,
          solution: String.raw`(a) For $x \ge 0$, $x^2$ is one-to-one with range $y \ge 0$: $x = \sqrt{y}$, $y \ge 0$.
(b) $x^3$ is one-to-one on all of $\mathbb{R}$: $x = \sqrt[3]{y} = y^{1/3}$, for all real $y$.
(c) Not one-to-one: $x = 1$ and $x = -1$ both give $y = 3$. **No inverse.**
(d) $5Q = 120 - P \Rightarrow Q = 24 - \frac{P}{5}$.
(e) $\frac{9}{5}C = F - 32 \Rightarrow C = \frac{5}{9}(F - 32)$.`,
          source: "Assignment 5 Q2",
        },
        {
          problem: String.raw`$f(x) = \frac{4e^x + 1}{2e^x - 3}$ is one-to-one. (a) Find $f^{-1}$. (b) Find the domain of $f^{-1}$.`,
          solution: String.raw`(a) Put $y = \frac{4e^x + 1}{2e^x - 3}$ and solve for $x$:
$$y(2e^x - 3) = 4e^x + 1 \Rightarrow 2ye^x - 4e^x = 3y + 1 \Rightarrow e^x(2y - 4) = 3y + 1 \Rightarrow e^x = \frac{3y + 1}{2y - 4}.$$
Take $\ln$: $x = \ln\frac{3y + 1}{2y - 4}$, so $f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right)$.
(b) $\ln$ needs a positive argument: $\frac{3x + 1}{2x - 4} > 0$. Numerator and denominator must have the same sign:
- both positive: $x > -\frac{1}{3}$ and $x > 2$, i.e. $x > 2$;
- both negative: $x < -\frac{1}{3}$ and $x < 2$, i.e. $x < -\frac{1}{3}$.
Domain of $f^{-1}$: $x < -\frac{1}{3}$ or $x > 2$, i.e. $(-\infty, -\frac{1}{3}) \cup (2, \infty)$ (this is the range of $f$).`,
          source: "Assignment 6 Q1",
        },
      ],
    },
    // ------------------------------------------------------------------ 4.4
    {
      title: "4.4 General Functions",
      intro: String.raw`What makes a rule a function: every element of the domain must be sent to one and only one value.`,
      points: [
        {
          term: "Function",
          text: String.raw`A function is a rule which to each element in the domain associates **one and only one** element in the range.`,
        },
        {
          term: "Image",
          text: String.raw`$f(x)$ is often called the **image** of the element $x$ by the function $f$.`,
        },
        {
          term: "Many-to-one is allowed",
          text: String.raw`We **can** have many $x$ to one $y$.`,
          eg: String.raw`$f(x) = |x|$: $f(-3) = f(3) = 3$. Still a function.`,
        },
        {
          term: "One-to-many is not allowed",
          text: String.raw`We **cannot** have one $x$ to many $y$.`,
          eg: String.raw`$f(x) = 5$ if $x \le 0$, $f(x) = 2x$ if $x \ge 0$ gives $x = 0$ two values ($5$ and $0$): not a function.`,
        },
        {
          term: "One-to-one",
          text: String.raw`If we have one $x$ to one $y$, then the **inverse function**, $f^{-1}$, exists.`,
        },
        {
          term: "Vertical line test",
          text: String.raw`A curve in the $xy$-plane is the graph of a function exactly when every vertical line meets it **at most once**. A curve that opens sideways (like a parabola lying on its side) is cut twice by some vertical line, so it is not a function of $x$.`,
        },
        {
          term: "Even function",
          text: String.raw`$f$ is even if $f(-x) = f(x)$ for all $x$: by rule 4 of 4.1, its graph is unchanged by reflection about the $y$-axis. If its domain is all real numbers, $f(-1) = f(1)$ with $-1 \neq 1$, so it is not one-to-one and has **no inverse**.`,
          eg: String.raw`$f(x) = x^2$ and $f(x) = |x|$ are even.`,
        },
        {
          term: "Careful with f(a − b)",
          text: String.raw`In general $f(a - b) \neq f(a) - f(b)$: a function need not "distribute" over subtraction.`,
          eg: String.raw`$f(x) = x^2$, $a = 2$, $b = 1$: $f(1) = 1$ but $f(2) - f(1) = 3$.`,
        },
      ],
      figures: [
        {
          title: "Vertical line test: a function",
          xr: [-0.5, 5],
          yr: [0, 4],
          curves: [{ f: "0.15*(x-1)*(x-1)*(4.6-x)+1.6", from: 0, to: 4.8 }],
          segments: [{ from: [3.3, 0], to: [3.3, 4], tone: 3 }],
          points: [{ at: [3.3, 2.632], tone: 1 }],
          caption: "Every vertical line meets the curve at most once: y is a function of x.",
        },
        {
          title: "Vertical line test: not a function",
          xr: [0, 5],
          yr: [0, 4],
          curves: [
            { f: "2+sqrt(x-1.5)", from: 1.5, to: 4.8 },
            { f: "2-sqrt(x-1.5)", from: 1.5, to: 4.8 },
          ],
          segments: [{ from: [3.5, 0], to: [3.5, 4], tone: 3 }],
          points: [
            { at: [3.5, 3.414], tone: 1 },
            { at: [3.5, 0.586], tone: 1 },
          ],
          caption: "A sideways parabola: one x gives two y values, so it is not a function of x.",
        },
        {
          title: "Assignment 5 Q1(b): not a function",
          xr: [-3, 3],
          yr: [-1, 7],
          curves: [
            { f: "5", from: -3, to: 0, label: "5 (x ≤ 0)", tone: 1 },
            { f: "2*x", from: 0, to: 3, label: "2x (x ≥ 0)" },
          ],
          points: [
            { at: [0, 5], label: "(0, 5)", tone: 1 },
            { at: [0, 0], label: "(0, 0)" },
          ],
          segments: [{ from: [0, -1], to: [0, 7], dashed: true, tone: 3 }],
          caption: "Both branches include x = 0, so x = 0 is sent to 5 AND to 0: one x to two y.",
        },
      ],
      worked: [
        {
          problem: String.raw`Which of the following are functions? Briefly explain.
(a) $f(x) = |x|$ (b) $f(x) = 5$ if $x \le 0$, $f(x) = 2x$ if $x \ge 0$ (c) $f(x) = e^x - 1$ (d) $f(x) = \sqrt{2}\,x^u + d$, where $u$ and $d$ are positive constants.`,
          solution: String.raw`(a) **Function.** Each $x$ has exactly one absolute value. It is many-to-one ($|-2| = |2|$), which is allowed.
(b) **Not a function.** Both conditions include $x = 0$, so $f(0) = 5$ and $f(0) = 2 \cdot 0 = 0$: one $x$ is sent to two values.
(c) **Function.** $e^x$ is a single number for each $x$, so $e^x - 1$ is too.
(d) **Function.** For each $x$ in the domain, $x^u$ is one number, so $\sqrt{2}\,x^u + d$ is one number.`,
          source: "Assignment 5 Q1",
        },
        {
          problem: String.raw`True or false? Justify. (a) If $f$ is one-to-one and $10$ is in the domain of $f$, then $f^{-1}(f(10)) = 10$. (b) For any function $f$, $f(a - b) = f(a) - f(b)$. (c) If $f$ is an even function whose domain is all real numbers, then $f$ does not have an inverse function.`,
          solution: String.raw`(a) **True.** Let $y = f(10)$. By definition $f^{-1}(y)$ is the unique $x$ with $f(x) = y$, and $x = 10$ is that number: the inverse undoes what $f$ did.
(b) **False.** Counter-example: $f(x) = x^2$, $a = 2$, $b = 1$: $f(a - b) = f(1) = 1$ but $f(a) - f(b) = 4 - 1 = 3$.
(c) **True.** Even means $f(-x) = f(x)$. Take $x = 1$: $f(-1) = f(1)$ with $-1 \neq 1$, so two different $x$ give the same $y$; $f$ is not one-to-one and has no inverse.`,
          source: "Assignment 6 Q4",
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ flashcards
  flashcards: [
    // concept
    { id: "function-props-c1", type: "concept", front: String.raw`The function $F(x) = f(x) + g(x)$ (with $f$, $g$ on the same domain)`, back: "Sum", why: String.raw`Written $F = f + g$. Sums of functions appear in economic models, e.g. average cost $= (aQ^2 + bQ + c) + d/Q$.` },
    { id: "function-props-c2", type: "concept", front: String.raw`The function $F(x) = f(x) - g(x)$`, back: "Difference", why: String.raw`Written $F = f - g$. Example: profit $\pi(Q) = R(Q) - C(Q)$.` },
    { id: "function-props-c3", type: "concept", front: String.raw`Cost per unit of output, $C(Q)/Q$`, back: "Average cost", why: String.raw`$AC = \frac{C(Q)}{Q}$ for $Q > 0$.` },
    { id: "function-props-c4", type: "concept", front: String.raw`$\pi(Q) = R(Q) - C(Q)$`, back: "Profit function", why: "Revenue minus cost; a difference of two functions." },
    { id: "function-props-c5", type: "concept", front: String.raw`$y = f(u)$ with $u = g(x)$, so $y = f(g(x))$ is regarded as a function of $x$`, back: "Composite function", why: String.raw`Written $(f \circ g)(x)$, read "$f$ of $g$".` },
    { id: "function-props-c6", type: "concept", front: String.raw`In $y = f(g(x))$, the name for $g(x)$ (besides "kernel")`, back: "Interior function (inner function)", why: String.raw`$g(x)$ is the kernel or interior function; $f$ is the exterior function.` },
    { id: "function-props-c7", type: "concept", front: String.raw`In $y = f(g(x))$, the name for $f$`, back: "Exterior function", why: String.raw`It is applied last, to the output $u = g(x)$ of the interior function.` },
    { id: "function-props-c8", type: "concept", front: String.raw`$(f \cdot g)(x) = f(x) \times g(x)$`, back: "Product", why: String.raw`Not the same as the composite $(f \circ g)(x) = f(g(x))$.` },
    { id: "function-props-c9", type: "concept", front: String.raw`A function for which different $x$ always give different $y$ (each $y$ comes from exactly one $x$)`, back: "One-to-one function", why: "Exactly the functions that have an inverse." },
    { id: "function-props-c10", type: "concept", front: String.raw`The function $g$ with $g(y) = x \iff y = f(x)$, domain = range of $f$, range = domain of $f$`, back: "Inverse function", why: String.raw`Written $f^{-1}$. It undoes what $f$ did to $x$: $f^{-1}(f(x)) = x$.` },
    { id: "function-props-c11", type: "concept", front: String.raw`Demand $D = f(P)$ solved for price: $P = f^{-1}(D)$`, back: "Inverse demand function", why: String.raw`E.g. $D = 100 - 10P \Rightarrow P = 10 - 0.1D$.` },
    { id: "function-props-c12", type: "concept", front: "A curve is the graph of a function exactly when every vertical line meets it at most once", back: "Vertical line test", why: "A sideways parabola fails: one x gives two y." },
    { id: "function-props-c13", type: "concept", front: String.raw`The value $f(x)$, viewed as where $f$ sends the element $x$`, back: "Image", why: String.raw`"$f(x)$ is the image of $x$ by $f$".` },
    { id: "function-props-c14", type: "concept", front: String.raw`A function with $f(-x) = f(x)$ for all $x$ (graph symmetric about the $y$-axis)`, back: "Even function", why: String.raw`With domain all of $\mathbb{R}$ it has no inverse, since $f(-1) = f(1)$.` },

    // formula
    { id: "function-props-c15", type: "formula", front: String.raw`Effect of $y = f(x) + c$ on the graph`, back: String.raw`Moved **up** $c$ units if $c > 0$, **down** if $c < 0$.`, why: String.raw`Every height changes by $c$. E.g. $\sqrt{x} - 2$ starts at $(0, -2)$.` },
    { id: "function-props-c16", type: "formula", front: String.raw`Effect of $y = f(x + c)$ on the graph`, back: String.raw`Moved $c$ units **left** if $c > 0$, **right** if $c < 0$.`, why: String.raw`The value $f$ had at $x$ now occurs at $x - c$. E.g. $\sqrt{x + 2}$ starts at $(-2, 0)$.` },
    { id: "function-props-c17", type: "formula", front: String.raw`Effect of $y = c\,f(x)$ on the graph`, back: String.raw`Stretched vertically ($c > 0$); stretched and reflected about the $x$-axis if $c < 0$.`, why: String.raw`E.g. $2\sqrt{x}$ is twice as tall; $-\sqrt{x}$ is $\sqrt{x}$ flipped in the $x$-axis.` },
    { id: "function-props-c18", type: "formula", front: String.raw`Effect of $y = f(-x)$ on the graph`, back: String.raw`Reflected about the $y$-axis.`, why: String.raw`E.g. $\sqrt{-x}$, defined for $x \le 0$.` },
    { id: "function-props-c19", type: "formula", front: "Supply after a per-unit tax t on producers", back: String.raw`$Q^S = S(P)$ becomes $Q^S = S(P - t)$.`, why: String.raw`Producers keep only $P - t$ of the market price. In a $(Q, P)$ diagram the supply curve moves up by $t$.` },
    { id: "function-props-c20", type: "formula", front: String.raw`Average cost of $C(Q) = aQ^3 + bQ^2 + cQ + d$`, back: String.raw`$AC = aQ^2 + bQ + c + \frac{d}{Q}$, $Q > 0$.`, why: "Quadratic plus hyperbola: divide every term by Q." },
    { id: "function-props-c21", type: "formula", front: "Composite function notation", back: String.raw`$(f \circ g)(x) = f(g(x))$; in general $f \circ g \neq g \circ f$.`, why: String.raw`Apply $g$ first (inside), then $f$.` },
    { id: "function-props-c22", type: "formula", front: "Defining property of the inverse g of f (domain A, range B)", back: String.raw`$g(y) = x \iff y = f(x)$, $x \in A$, $y \in B$.`, why: "Exists if and only if f is one-to-one; the inverse has domain B and range A." },

    // method
    { id: "function-props-c23", type: "method", front: String.raw`$Q^S = 10 + 2P$, $Q^D = 100 - P$. A 1-dollar per-unit tax is imposed on producers. New supply and equilibrium?`, back: String.raw`$Q^S = 8 + 2P$; $P = \frac{92}{3} \approx 30.67$, $Q = \frac{208}{3} \approx 69.33$.`, why: String.raw`1. Producers keep $P - 1$: $Q^S = 10 + 2(P - 1) = 8 + 2P$.
2. Set $Q^S = Q^D$: $8 + 2P = 100 - P \Rightarrow 3P = 92$.
3. $P = 92/3$, $Q = 100 - 92/3 = 208/3$. (Before the tax: $P = 30$, $Q = 70$.)` },
    { id: "function-props-c24", type: "method", front: "How do you find the new supply function after a per-unit tax t on producers?", back: String.raw`Replace $P$ by $P - t$ in $Q^S = S(P)$, then solve $S(P - t) = D(P)$ for the new equilibrium.`, why: String.raw`The buyer pays $P$, the producer receives $P - t$, and supply depends on what the producer receives. Equivalently, in a $(Q, P)$ diagram the inverse supply curve moves up by $t$.` },
    { id: "function-props-c25", type: "method", front: String.raw`Describe how to get $y = 2\sqrt{x + 3} - 1$ from $y = \sqrt{x}$.`, back: "Left 3, stretch vertically by 2, down 1; it starts at (−3, −1).", why: String.raw`Peel the changes one at a time: $x \to x + 3$ (rule 2, left 3), multiply by 2 (rule 3, vertical stretch), subtract 1 (rule 1, down 1). Track the starting point $(0,0) \to (-3,0) \to (-3,0) \to (-3,-1)$.` },
    { id: "function-props-c26", type: "method", front: String.raw`$f(x) = x^2$, $g(x) = 1 + x$. Find $(f \circ g)(x)$ and $(g \circ f)(x)$.`, back: String.raw`$(f \circ g)(x) = (1 + x)^2$; $(g \circ f)(x) = 1 + x^2$.`, why: String.raw`Substitute the inner function into the outer one: $f(g(x)) = f(1 + x) = (1 + x)^2$ and $g(f(x)) = g(x^2) = 1 + x^2$. They differ, so $f \circ g \neq g \circ f$. The product is different again: $x^2(1 + x)$.` },
    { id: "function-props-c27", type: "method", front: "How do you find the inverse of a one-to-one function y = f(x)?", back: "Solve y = f(x) for x in terms of y; that is f⁻¹(y). Swap letters to write it in x.", why: String.raw`Then state its domain = the range of $f$. Check: $f^{-1}(f(x))$ should give back $x$. Example: $y = 4x - 3 \Rightarrow x = \frac{y + 3}{4}$.` },
    { id: "function-props-c28", type: "method", front: "How do you show a function has NO inverse?", back: "Find two different x values with the same y (so f is not one-to-one).", why: String.raw`E.g. $y = |x| + 2$: $f(1) = f(-1) = 3$. $y = x^2$ on $\mathbb{R}$: $f(2) = f(-2) = 4$. An even function on $\mathbb{R}$: $f(-1) = f(1)$.` },
    { id: "function-props-c29", type: "method", front: String.raw`Find the inverse demand function of $D = 100 - 10P$.`, back: String.raw`$P = 10 - \frac{D}{10}$.`, why: String.raw`Solve for $P$: $10P = 100 - D$, so $P = 10 - 0.1D$.` },
    { id: "function-props-c30", type: "method", front: String.raw`Find the inverse, if it exists: $y = x^2$, $x \ge 0$; $y = x^3$; $y = |x| + 2$.`, back: String.raw`$x = \sqrt{y}$ ($y \ge 0$); $x = \sqrt[3]{y}$; no inverse.`, why: String.raw`$x^2$ on $x \ge 0$ and $x^3$ on $\mathbb{R}$ are always increasing, so one-to-one. $|x| + 2$ gives $3$ at $x = \pm 1$, so it is not one-to-one.` },
    { id: "function-props-c31", type: "method", front: String.raw`Find the inverse of $P = 120 - 5Q$ and of $F = \frac{9}{5}C + 32$.`, back: String.raw`$Q = 24 - \frac{P}{5}$; $C = \frac{5}{9}(F - 32)$.`, why: String.raw`Linear functions with non-zero slope are one-to-one. Isolate the other variable: $5Q = 120 - P$; $\frac{9}{5}C = F - 32$.` },
    { id: "function-props-c32", type: "method", front: String.raw`Inverse of the one-to-one $f(x) = \frac{4e^x + 1}{2e^x - 3}$?`, back: String.raw`$f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right)$.`, why: String.raw`1. $y(2e^x - 3) = 4e^x + 1$.
2. Collect the $e^x$ terms: $e^x(2y - 4) = 3y + 1$.
3. $e^x = \frac{3y + 1}{2y - 4}$, take $\ln$: $x = \ln\frac{3y + 1}{2y - 4}$.` },
    { id: "function-props-c33", type: "method", front: String.raw`Domain of $f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right)$?`, back: String.raw`$x < -\frac{1}{3}$ or $x > 2$.`, why: String.raw`Need $\frac{3x + 1}{2x - 4} > 0$: top and bottom same sign. Both positive: $x > 2$. Both negative: $x < -\frac{1}{3}$. (This is the range of $f$.)` },
    { id: "function-props-c34", type: "method", front: "How do you decide whether a rule (formula, piecewise rule or graph) is a function?", back: "Check that every x in the domain is sent to exactly one value (vertical line test for graphs).", why: String.raw`Many $x$ to one $y$ is fine ($|x|$). One $x$ to two $y$ is not: e.g. $f(x) = 5$ if $x \le 0$, $2x$ if $x \ge 0$ sends $x = 0$ to both $5$ and $0$.` },
    { id: "function-props-c35", type: "method", front: String.raw`True or false: if $f$ is one-to-one and $10$ is in its domain, $f^{-1}(f(10)) = 10$.`, back: "True: the inverse undoes what f did.", why: String.raw`$f^{-1}(y)$ is the unique $x$ with $f(x) = y$; for $y = f(10)$ that $x$ is $10$.` },
    { id: "function-props-c36", type: "method", front: String.raw`True or false: for any function $f$, $f(a - b) = f(a) - f(b)$.`, back: "False: give a counter-example.", why: String.raw`$f(x) = x^2$, $a = 2$, $b = 1$: $f(1) = 1$ but $f(2) - f(1) = 3$. (Also $f(x) = x + 1$: $a - b + 1 \neq a - b$.)` },
    { id: "function-props-c37", type: "method", front: "True or false: an even function whose domain is all real numbers has no inverse.", back: "True: f(−1) = f(1), so it is not one-to-one.", why: String.raw`Even means $f(-x) = f(x)$. Two different inputs $1$ and $-1$ give the same output, so going back from $y = f(1)$ is ambiguous.` },
    { id: "function-props-c38", type: "method", front: String.raw`Find $AC$ for $C(Q) = 2Q^3 - Q^2 + 5Q + 40$ and evaluate it at $Q = 4$.`, back: String.raw`$AC = 2Q^2 - Q + 5 + \frac{40}{Q}$; $AC(4) = 43$.`, why: String.raw`Divide each term by $Q$. At $Q = 4$: $32 - 4 + 5 + 10 = 43$ (check: $C(4) = 172$, $172/4 = 43$).` },
  ],

  // ------------------------------------------------------------------ quiz
  quiz: [
    // 4.1
    {
      id: "function-props-q1",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`Compared with the graph of $y = f(x)$, the graph of $y = f(x) - 3$ is:`,
      options: ["moved 3 units down", "moved 3 units up", "moved 3 units right", "moved 3 units left"],
      answer: 0,
      explain: String.raw`Rule 1: $f(x) + c$ moves the graph up $c$ units if $c > 0$, down if $c < 0$. Here $c = -3$: down 3.`,
    },
    {
      id: "function-props-q2",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`Compared with the graph of $y = f(x)$, the graph of $y = f(x + 2)$ is:`,
      options: ["moved 2 units right", "moved 2 units left", "moved 2 units up", "stretched vertically by 2"],
      answer: 1,
      explain: String.raw`Rule 2: $f(x + c)$ moves the graph $c$ units to the **left** when $c > 0$. E.g. $\sqrt{x + 2}$ starts at $x = -2$.`,
    },
    {
      id: "function-props-q3",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`The graph of $y = \sqrt{x - 2}$ starts at which point?`,
      options: ["$(2, 0)$", "$(-2, 0)$", "$(0, -2)$", "$(0, 2)$"],
      answer: 0,
      explain: String.raw`$\sqrt{x - 2} = f(x + c)$ with $c = -2 < 0$: $\sqrt{x}$ moved 2 units right. It starts where $x - 2 = 0$, at $(2, 0)$.`,
    },
    {
      id: "function-props-q4",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`The graph of $y = -\sqrt{x}$ is the graph of $y = \sqrt{x}$:`,
      options: ["reflected about the $y$-axis", "reflected about the $x$-axis", "moved 1 unit down", "moved 1 unit left"],
      answer: 1,
      explain: String.raw`Rule 3 with $c = -1 < 0$: $c\,f(x)$ is reflected about the $x$-axis (every height changes sign).`,
    },
    {
      id: "function-props-q5",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`The graph of $y = f(-x)$ is the graph of $y = f(x)$:`,
      options: ["reflected about the $x$-axis", "reflected about the line $y = x$", "reflected about the $y$-axis", "moved left by 1"],
      answer: 2,
      explain: String.raw`Rule 4: replacing $x$ by $-x$ reflects the graph about the $y$-axis, e.g. $\sqrt{-x}$ is the mirror image of $\sqrt{x}$.`,
    },
    {
      id: "function-props-q6",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`Compared with $y = \sqrt{x}$, the graph of $y = 2\sqrt{x}$ is:`,
      options: ["moved 2 units up", "moved 2 units left", "stretched vertically (twice as high at every $x$)", "reflected about the $x$-axis"],
      answer: 2,
      explain: String.raw`Rule 3: $c\,f(x)$ with $c = 2 > 0$ stretches the graph vertically. At $x = 4$: $\sqrt{4} = 2$ but $2\sqrt{4} = 4$. Moving up 2 would be $\sqrt{x} + 2$.`,
    },
    {
      id: "function-props-q7",
      kind: "fill",
      sub: "Shifting graphs",
      prompt: String.raw`The graph of $y = \sqrt{x} - 2$ crosses the $x$-axis at $x =$ ____.`,
      answers: [["4"]],
      explain: String.raw`Set $\sqrt{x} - 2 = 0 \Rightarrow \sqrt{x} = 2 \Rightarrow x = 4$. (The graph is $\sqrt{x}$ moved down 2.)`,
    },
    {
      id: "function-props-q8",
      kind: "mcq",
      sub: "Shifting graphs",
      prompt: String.raw`Which graph is $y = \sqrt{x}$ moved 3 units to the right and 1 unit up?`,
      options: [String.raw`$y = \sqrt{x - 3} + 1$`, String.raw`$y = \sqrt{x + 3} + 1$`, String.raw`$y = \sqrt{x - 1} + 3$`, String.raw`$y = \sqrt{x + 1} - 3$`],
      answer: 0,
      explain: String.raw`Right 3: replace $x$ by $x - 3$ (rule 2 with $c = -3$). Up 1: add 1 (rule 1). Result $\sqrt{x - 3} + 1$, starting at $(3, 1)$.`,
    },
    {
      id: "function-props-q9",
      kind: "fill",
      sub: "Tax and supply",
      prompt: String.raw`Supply is $Q^S = 10 + 2P$. After a 1-dollar per-unit tax on producers, the new supply function is $Q^S =$ ____ $+ 2P$.`,
      answers: [["8"]],
      explain: String.raw`Producers keep $P - 1$, so $Q^S = 10 + 2(P - 1) = 8 + 2P$.`,
    },
    {
      id: "function-props-q10",
      kind: "fill",
      sub: "Tax and supply",
      prompt: String.raw`With $Q^S = 10 + 2P$, $Q^D = 100 - P$ and a 1-dollar per-unit tax on producers, the new equilibrium price is $P =$ ____ and quantity $Q =$ ____ (2 d.p. or fractions).`,
      answers: [["92/3", "30.67"], ["208/3", "69.33"]],
      explain: String.raw`New supply $8 + 2P$. Set $8 + 2P = 100 - P$: $3P = 92$, $P = 92/3 \approx 30.67$, $Q = 100 - 92/3 = 208/3 \approx 69.33$.`,
    },
    {
      id: "function-props-q11",
      kind: "mcq",
      sub: "Tax and supply",
      prompt: String.raw`In a diagram with $Q$ on the horizontal axis and $P$ on the vertical axis, a per-unit tax of $t$ dollars on producers:`,
      options: ["moves the supply curve up by $t$", "moves the supply curve down by $t$", "moves the demand curve down by $t$", "does not move either curve"],
      answer: 0,
      explain: String.raw`Supply becomes $S(P - t)$: to supply the same quantity, producers need a market price $t$ higher. E.g. $P = \frac{Q - 10}{2}$ becomes $P = \frac{Q - 10}{2} + 1$, up by 1. Demand is unchanged.`,
    },
    {
      id: "function-props-q12",
      kind: "mcq",
      sub: "Tax and supply",
      prompt: String.raw`$Q^S = 12 + P$, $Q^D = 32 - P$. The government imposes a 2-dollar per-unit tax on producers. The new equilibrium is:`,
      options: ["$P = 11$, $Q = 21$", "$P = 10$, $Q = 22$", "$P = 12$, $Q = 20$", "$P = 9$, $Q = 23$"],
      answer: 0,
      explain: String.raw`New supply $Q^S = 12 + (P - 2) = 10 + P$. Set $10 + P = 32 - P \Rightarrow P = 11$, $Q = 21$. (Without the tax: $P = 10$, $Q = 22$; moving supply the wrong way gives $P = 9$.)`,
    },
    // 4.2
    {
      id: "function-props-q13",
      kind: "fill",
      sub: "New functions from old",
      prompt: String.raw`The function $F(x) = f(x) - g(x)$ is called the ____ of $f$ and $g$.`,
      answers: [["difference"]],
      explain: String.raw`$F = f - g$ is the difference of $f$ and $g$ ($F = f + g$ would be the sum). Profit $R - C$ is an example.`,
    },
    {
      id: "function-props-q14",
      kind: "mcq",
      sub: "Average cost",
      prompt: String.raw`If $C(Q) = aQ^3 + bQ^2 + cQ + d$, the average cost is:`,
      options: [String.raw`$aQ^2 + bQ + c + \frac{d}{Q}$`, String.raw`$aQ^2 + bQ + c + d$`, String.raw`$3aQ^2 + 2bQ + c$`, String.raw`$aQ^4 + bQ^3 + cQ^2 + dQ$`],
      answer: 0,
      explain: String.raw`$AC = C(Q)/Q$: divide **every** term by $Q$, including the constant $d$, which becomes $d/Q$. (Multiplying by $Q$ is the wrong direction.)`,
    },
    {
      id: "function-props-q15",
      kind: "fill",
      sub: "Average cost",
      prompt: String.raw`$C(Q) = 2Q^3 - Q^2 + 5Q + 40$. The average cost at $Q = 4$ is ____.`,
      answers: [["43"]],
      explain: String.raw`$AC = 2Q^2 - Q + 5 + \frac{40}{Q}$. At $Q = 4$: $32 - 4 + 5 + 10 = 43$. Check: $C(4) = 128 - 16 + 20 + 40 = 172$ and $172/4 = 43$.`,
    },
    {
      id: "function-props-q16",
      kind: "mcq",
      sub: "Average cost",
      prompt: String.raw`The average cost $AC = aQ^2 + bQ + c + \frac{d}{Q}$ of a cubic cost function is the sum of:`,
      options: ["a quadratic and a hyperbola", "a cubic and a hyperbola", "a linear function and a quadratic", "two hyperbolas"],
      answer: 0,
      explain: String.raw`$y = aQ^2 + bQ + c$ is a quadratic and $y = d/Q$ is a hyperbola; $AC$ is their sum.`,
    },
    {
      id: "function-props-q17",
      kind: "fill",
      sub: "Profit",
      prompt: String.raw`$R(Q) = 20Q$ and $C(Q) = Q^2 + 4Q + 15$. The profit at $Q = 5$ is ____.`,
      answers: [["40"]],
      explain: String.raw`$\pi(Q) = R(Q) - C(Q)$. $R(5) = 100$, $C(5) = 25 + 20 + 15 = 60$, so $\pi(5) = 40$.`,
    },
    {
      id: "function-props-q18",
      kind: "mcq",
      sub: "Profit",
      prompt: String.raw`In the lecture's profit example $\pi(Q) = R(Q) - C(Q)$, the cost function is cubic. The revenue function is:`,
      options: ["linear", "cubic", "a hyperbola", "exponential"],
      answer: 0,
      explain: String.raw`$R(Q)$ is drawn as a straight line from the origin (a linear function, e.g. price times quantity). Profit is positive between the two quantities where $R$ and $C$ cross.`,
    },
    {
      id: "function-props-q19",
      kind: "mcq",
      sub: "Composite functions",
      prompt: String.raw`$f(x) = x^2$ and $g(x) = 1 + x$. Then $(f \circ g)(x) =$`,
      options: [String.raw`$(1 + x)^2$`, String.raw`$1 + x^2$`, String.raw`$x^2(1 + x)$`, String.raw`$x^2 + x + 1$`],
      answer: 0,
      explain: String.raw`$(f \circ g)(x) = f(g(x)) = f(1 + x) = (1 + x)^2$. $1 + x^2$ is $g \circ f$; $x^2(1 + x)$ is the product $f \cdot g$.`,
    },
    {
      id: "function-props-q20",
      kind: "mcq",
      sub: "Composite functions",
      prompt: String.raw`$f(x) = x^2$ and $g(x) = 1 + x$. Then $(g \circ f)(x) =$`,
      options: [String.raw`$(1 + x)^2$`, String.raw`$1 + x^2$`, String.raw`$x^2(1 + x)$`, String.raw`$1 + 2x + x^2$`],
      answer: 1,
      explain: String.raw`$(g \circ f)(x) = g(f(x)) = g(x^2) = 1 + x^2$. Since this differs from $(f \circ g)(x) = (1 + x)^2$, $f \circ g \neq g \circ f$.`,
    },
    {
      id: "function-props-q21",
      kind: "fill",
      sub: "Composite functions",
      prompt: String.raw`$f(x) = x^2$, $g(x) = 1 + x$. Then $(f \circ g)(2) =$ ____ and $(g \circ f)(2) =$ ____.`,
      answers: [["9"], ["5"]],
      explain: String.raw`$(f \circ g)(2) = f(g(2)) = f(3) = 9$. $(g \circ f)(2) = g(f(2)) = g(4) = 5$.`,
    },
    {
      id: "function-props-q22",
      kind: "mcq",
      sub: "Composite functions",
      prompt: String.raw`$f(x) = x^2$ and $g(x) = 1 + x$. The product $(f \cdot g)(x)$ is:`,
      options: [String.raw`$x^2 + x^3$`, String.raw`$(1 + x)^2$`, String.raw`$1 + x^2$`, String.raw`$x^2 + x + 1$`],
      answer: 0,
      explain: String.raw`$(f \cdot g)(x) = f(x) \times g(x) = x^2(1 + x) = x^2 + x^3$. Do not confuse it with the composite $(f \circ g)(x) = (1 + x)^2$.`,
    },
    {
      id: "function-props-q23",
      kind: "mcq",
      sub: "Composite functions",
      prompt: String.raw`In the composite function $y = f(g(x))$, $g(x)$ is called the kernel or:`,
      options: ["interior function", "exterior function", "inverse function", "product function"],
      answer: 0,
      explain: String.raw`$g(x)$ is the kernel or **interior** function (applied first); $f$ is the **exterior** function (applied last).`,
    },
    {
      id: "function-props-q24",
      kind: "fill",
      sub: "Composite functions",
      prompt: String.raw`$f(u) = \sqrt{u}$ and $g(x) = x^2 + 9$. Then $f(g(4)) =$ ____.`,
      answers: [["5"]],
      explain: String.raw`Inside first: $g(4) = 16 + 9 = 25$. Then $f(25) = \sqrt{25} = 5$.`,
    },
    // 4.3
    {
      id: "function-props-q25",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`The inverse function of $y = 4x - 3$ is:`,
      options: [String.raw`$x = \frac{y + 3}{4}$`, String.raw`$x = \frac{y - 3}{4}$`, String.raw`$x = 4y + 3$`, String.raw`$x = \frac{1}{4x - 3}$`],
      answer: 0,
      explain: String.raw`$y = 4x - 3 \Rightarrow 4x = y + 3 \Rightarrow x = \frac{y + 3}{4}$. Check: $x = 2$ gives $y = 5$, and $\frac{5 + 3}{4} = 2$. The inverse is not the reciprocal.`,
    },
    {
      id: "function-props-q26",
      kind: "fill",
      sub: "Inverse functions",
      prompt: String.raw`$f(x) = 4x - 3$. Then $f^{-1}(9) =$ ____.`,
      answers: [["3"]],
      explain: String.raw`$f^{-1}(9)$ is the $x$ with $4x - 3 = 9$, so $x = 3$. (Or use $f^{-1}(y) = \frac{y + 3}{4} = \frac{12}{4} = 3$.)`,
    },
    {
      id: "function-props-q27",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`The demand function is $D = 100 - 10P$. The inverse demand function is:`,
      options: [String.raw`$P = 10 - \frac{D}{10}$`, String.raw`$P = 100 - \frac{D}{10}$`, String.raw`$P = 10 - 10D$`, String.raw`$P = \frac{D - 100}{10}$`],
      answer: 0,
      explain: String.raw`$10P = 100 - D \Rightarrow P = 10 - \frac{D}{10}$. Check: $P = 3 \Rightarrow D = 70 \Rightarrow 10 - 7 = 3$.`,
    },
    {
      id: "function-props-q28",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`Which of these functions does **not** have an inverse?`,
      options: [String.raw`$y = |x| + 2$`, String.raw`$y = x^3$`, String.raw`$y = x^2,\ x \ge 0$`, String.raw`$F = \frac{9}{5}C + 32$`],
      answer: 0,
      explain: String.raw`$|x| + 2$ is not one-to-one: $x = 1$ and $x = -1$ both give $3$. The others are one-to-one, with inverses $\sqrt[3]{y}$, $\sqrt{y}$ and $\frac{5}{9}(F - 32)$.`,
    },
    {
      id: "function-props-q29",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`The inverse of the inverse demand function $P = 120 - 5Q$ is:`,
      options: [String.raw`$Q = 24 - \frac{P}{5}$`, String.raw`$Q = 120 - \frac{P}{5}$`, String.raw`$Q = 24 - 5P$`, String.raw`$Q = \frac{P - 120}{5}$`],
      answer: 0,
      explain: String.raw`$5Q = 120 - P \Rightarrow Q = \frac{120 - P}{5} = 24 - \frac{P}{5}$. Check: $Q = 4 \Rightarrow P = 100 \Rightarrow 24 - 20 = 4$.`,
    },
    {
      id: "function-props-q30",
      kind: "fill",
      sub: "Inverse functions",
      prompt: String.raw`$F = \frac{9}{5}C + 32$ converts Celsius to Fahrenheit. Using the inverse function, $F = 212$ corresponds to $C =$ ____.`,
      answers: [["100"]],
      explain: String.raw`Inverse: $C = \frac{5}{9}(F - 32)$. With $F = 212$: $C = \frac{5}{9} \times 180 = 100$.`,
    },
    {
      id: "function-props-q31",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`The one-to-one function $f(x) = \frac{4e^x + 1}{2e^x - 3}$ has inverse:`,
      options: [String.raw`$f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right)$`, String.raw`$f^{-1}(x) = \ln\left(\frac{2x - 4}{3x + 1}\right)$`, String.raw`$f^{-1}(x) = \frac{2e^x - 3}{4e^x + 1}$`, String.raw`$f^{-1}(x) = \ln\left(\frac{3x - 1}{2x + 4}\right)$`],
      answer: 0,
      explain: String.raw`$y(2e^x - 3) = 4e^x + 1 \Rightarrow e^x(2y - 4) = 3y + 1 \Rightarrow e^x = \frac{3y + 1}{2y - 4} \Rightarrow x = \ln\frac{3y + 1}{2y - 4}$. The reciprocal $\frac{2e^x - 3}{4e^x + 1}$ is $1/f$, not $f^{-1}$.`,
    },
    {
      id: "function-props-q32",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`The domain of $f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right)$ is:`,
      options: [String.raw`$x < -\frac{1}{3}$ or $x > 2$`, String.raw`$-\frac{1}{3} < x < 2$`, String.raw`$x \neq 2$`, String.raw`$x > 2$ only`],
      answer: 0,
      explain: String.raw`Need $\frac{3x + 1}{2x - 4} > 0$: numerator and denominator the same sign. Both positive gives $x > 2$; both negative gives $x < -\frac{1}{3}$. This equals the range of $f$.`,
    },
    {
      id: "function-props-q33",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`$f$ is one-to-one with domain $A$ and range $B$. Its inverse function has:`,
      options: ["domain B and range A", "domain A and range B", "domain A and range A", "domain B and range B"],
      answer: 0,
      explain: String.raw`The inverse goes back from $y \in B$ to $x \in A$: $g(y) = x \iff y = f(x)$. Domain and range swap.`,
    },
    {
      id: "function-props-q34",
      kind: "fill",
      sub: "Inverse functions",
      prompt: String.raw`$f$ is one-to-one and $f(10) = 7$. Then $f^{-1}(7) =$ ____.`,
      answers: [["10"]],
      explain: String.raw`$g(y) = x \iff y = f(x)$. Since $7 = f(10)$, $f^{-1}(7) = 10$: the inverse undoes what $f$ did.`,
    },
    {
      id: "function-props-q35",
      kind: "mcq",
      sub: "Inverse functions",
      prompt: String.raw`Drawn on the same axes, the graphs of a one-to-one function $f$ and its inverse $f^{-1}$ are mirror images in:`,
      options: ["the line $y = x$", "the $x$-axis", "the $y$-axis", "the line $y = -x$"],
      answer: 0,
      explain: String.raw`$(a, b)$ is on $f$ exactly when $(b, a)$ is on $f^{-1}$; swapping coordinates reflects a point in $y = x$. E.g. $(2, 5)$ on $y = 4x - 3$ and $(5, 2)$ on $y = \frac{x + 3}{4}$.`,
    },
    // 4.4
    {
      id: "function-props-q36",
      kind: "mcq",
      sub: "General functions",
      prompt: String.raw`Which of the following is **not** a function?`,
      options: [String.raw`$f(x) = 5$ if $x \le 0$, $f(x) = 2x$ if $x \ge 0$`, String.raw`$f(x) = |x|$`, String.raw`$f(x) = e^x - 1$`, String.raw`$f(x) = \sqrt{2}\,x^u + d$ ($u, d > 0$)`],
      answer: 0,
      explain: String.raw`Both pieces include $x = 0$, giving $f(0) = 5$ and $f(0) = 0$: one $x$ to two values. The others give exactly one value for each $x$ ($|x|$ is many-to-one, which is allowed).`,
    },
    {
      id: "function-props-q37",
      kind: "mcq",
      sub: "General functions",
      prompt: String.raw`For a rule to be a function:`,
      options: ["many x to one y is allowed, but one x to many y is not", "one x to many y is allowed, but many x to one y is not", "both are allowed", "neither is allowed"],
      answer: 0,
      explain: String.raw`A function associates to each element of the domain one and only one element. Many-to-one (like $x^2$: $2$ and $-2$ both go to $4$) is fine; one-to-many is not.`,
    },
    {
      id: "function-props-q38",
      kind: "fill",
      sub: "General functions",
      prompt: String.raw`For the rule "$f(x) = 5$ if $x \le 0$, $f(x) = 2x$ if $x \ge 0$", the input $x = 0$ is sent to two values: $5$ and ____.`,
      answers: [["0"]],
      explain: String.raw`Second piece at $x = 0$: $2 \cdot 0 = 0$. Two outputs for one input, so the rule is not a function.`,
    },
    {
      id: "function-props-q39",
      kind: "mcq",
      sub: "General functions",
      prompt: String.raw`Why does an even function with domain all real numbers have no inverse?`,
      options: [String.raw`Because $f(-1) = f(1)$, so it is not one-to-one`, "Because its graph fails the vertical line test", String.raw`Because $f(0)$ must be $0$`, "Because even functions are never increasing"],
      answer: 0,
      explain: String.raw`Even means $f(-x) = f(x)$. Two different inputs ($-1$ and $1$) give the same output, so we cannot go back from $y$ to a unique $x$. It is still a function, so it passes the vertical line test.`,
    },
  ],

  // ------------------------------------------------------------------ exam
  exam: [
    {
      id: "function-props-x1",
      kind: "calc",
      sub: "Tax shifting supply",
      prompt: String.raw`Suppose the supply curve is $Q^S = 10 + 2P$ and the demand curve is $Q^D = 100 - P$. If the government imposes a 1-dollar tax per unit on the producers, find the new supply curve function and the equilibrium price and quantity.`,
      marks: 5,
      rubric: [
        { point: String.raw`Replaces $P$ by $P - 1$ (producers keep $P - 1$)`, marks: 1 },
        { point: String.raw`New supply $Q^S = 8 + 2P$`, marks: 1 },
        { point: String.raw`Sets $8 + 2P = 100 - P$`, marks: 1 },
        { point: String.raw`$P = \frac{92}{3} \approx 30.67$`, marks: 1 },
        { point: String.raw`$Q = \frac{208}{3} \approx 69.33$`, marks: 1 },
      ],
      model: String.raw`With a per-unit tax of 1 dollar, a producer selling at market price $P$ keeps only $P - 1$, so supply depends on $P - 1$:
$$Q^S = 10 + 2(P - 1) = 8 + 2P.$$
(In a $(Q, P)$ diagram this moves the supply curve up by 1.)
Equilibrium: $Q^S = Q^D$:
$$8 + 2P = 100 - P \;\Rightarrow\; 3P = 92 \;\Rightarrow\; P = \frac{92}{3} \approx 30.67.$$
$$Q = 100 - \frac{92}{3} = \frac{208}{3} \approx 69.33.$$
Check: $8 + 2 \cdot \frac{92}{3} = \frac{24 + 184}{3} = \frac{208}{3}$. (Before the tax $P = 30$, $Q = 70$.)`,
      answer: String.raw`$Q^S = 8 + 2P$; $P = 92/3 \approx 30.67$, $Q = 208/3 \approx 69.33$`,
      figures: [
        {
          x: "Q",
          y: "P",
          xr: [62, 76],
          yr: [26, 38],
          curves: [
            { f: "(x-10)/2", label: "S before", tone: 3, dashed: true },
            { f: "(x-8)/2", label: "S after", tone: 1 },
            { f: "100-x", label: "D" },
          ],
          points: [
            { at: [70, 30], label: "(70, 30)", tone: 3 },
            { at: [208 / 3, 92 / 3], label: "(69.33, 30.67)", tone: 1, guides: true },
          ],
          caption: "The tax moves supply up by 1; the new equilibrium has a higher price and lower quantity.",
        },
      ],
      source: "Lecture Note 4 exercise",
    },
    {
      id: "function-props-x2",
      kind: "calc",
      sub: "Tax shifting supply",
      prompt: String.raw`Consider the supply $Q^S = 12 + P$ and the demand $Q^D = 32 - P$. Suppose the government imposes a tax of 2 dollars per unit on the producers. Find the new supply function, the new equilibrium price and quantity, and the price the producers keep per unit.`,
      marks: 5,
      rubric: [
        { point: String.raw`New supply $Q^S = 12 + (P - 2) = 10 + P$`, marks: 2 },
        { point: String.raw`Equilibrium $P = 11$, $Q = 21$ from $10 + P = 32 - P$`, marks: 2 },
        { point: String.raw`Producers keep $11 - 2 = 9$ per unit`, marks: 1 },
      ],
      model: String.raw`**New supply.** Producers keep $P - 2$ of the market price, so replace $P$ by $P - 2$:
$$Q^S = 12 + (P - 2) = 10 + P.$$
**Equilibrium.** $10 + P = 32 - P \Rightarrow 2P = 22 \Rightarrow P = 11$, and $Q = 32 - 11 = 21$.
**Producers' price.** $11 - 2 = 9$ per unit.
(Before the tax: $12 + P = 32 - P$ gives $P = 10$, $Q = 22$. Buyers now pay 1 more and producers keep 1 less.)`,
      answer: String.raw`$Q^S = 10 + P$; $P = 11$, $Q = 21$; producers keep 9`,
      source: "Modelled on Lecture Note 4 exercise and Past paper Q3(d)",
    },
    {
      id: "function-props-x3",
      kind: "explain",
      sub: "Shifting graphs",
      prompt: String.raw`Explain, step by step, how the graph of $y = 2\sqrt{x + 3} - 1$ is obtained from the graph of $y = \sqrt{x}$. State the rule used at each step and give the starting point of the new graph.`,
      marks: 5,
      rubric: [
        { point: String.raw`$\sqrt{x + 3}$: moved 3 units left (rule $f(x + c)$, $c > 0$)`, marks: 1.5 },
        { point: String.raw`$2\sqrt{x + 3}$: stretched vertically by factor 2 (rule $c\,f(x)$)`, marks: 1.5 },
        { point: String.raw`$-1$: moved 1 unit down (rule $f(x) + c$, $c < 0$)`, marks: 1 },
        { point: String.raw`Starting point $(-3, -1)$`, marks: 1 },
      ],
      model: String.raw`- Replace $x$ by $x + 3$: $y = f(x + c)$ with $c = 3 > 0$ moves the graph **3 units to the left**. $\sqrt{x + 3}$ starts at $(-3, 0)$.
- Multiply by 2: $y = c\,f(x)$ with $c = 2 > 0$ **stretches the graph vertically** (every height doubles). The start $(-3, 0)$ is unchanged since $2 \times 0 = 0$.
- Subtract 1: $y = f(x) + c$ with $c = -1$ moves the graph **1 unit down**.
The new graph starts at $(-3, -1)$ and rises to the right (e.g. it passes through $(1, 3)$ since $2\sqrt{4} - 1 = 3$).`,
      answer: "Left 3, vertical stretch by 2, down 1; starts at (−3, −1)",
      source: "Modelled on Lecture Note 4, 4.1",
    },
    {
      id: "function-props-x4",
      kind: "proof",
      sub: "General functions",
      prompt: String.raw`Which of the following are functions? Briefly explain your answer.
(a) $f(x) = |x|$
(b) $f(x) = 5$ if $x \le 0$, $f(x) = 2x$ if $x \ge 0$
(c) $f(x) = e^x - 1$
(d) $f(x) = \sqrt{2}\,x^u + d$, where $u$ and $d$ are positive constants`,
      marks: 5,
      rubric: [
        { point: String.raw`States a function associates one and only one value to each $x$ (many-to-one allowed)`, marks: 1 },
        { point: String.raw`(b) is not a function: $x = 0$ gives both $5$ and $0$`, marks: 2 },
        { point: String.raw`(a), (c), (d) are functions, each with a brief reason`, marks: 2 },
      ],
      model: String.raw`A function associates to each element in the domain **one and only one** value; many $x$ to one $y$ is allowed, one $x$ to many $y$ is not.
(a) **Function.** Every $x$ has a single absolute value. It is many-to-one ($|-2| = |2| = 2$), which is allowed.
(b) **Not a function.** Both conditions $x \le 0$ and $x \ge 0$ include $x = 0$, so $f(0) = 5$ and $f(0) = 2(0) = 0$: one $x$ is associated with two values. (Its graph fails the vertical line test at $x = 0$.)
(c) **Function.** $e^x$ is one number for each $x$, so $e^x - 1$ is one number.
(d) **Function.** For each $x$ in the domain, $x^u$ is a single number, so $\sqrt{2}\,x^u + d$ is a single number.`,
      answer: "(a), (c), (d) are functions; (b) is not",
      source: "Assignment 5 Q1",
    },
    {
      id: "function-props-x5",
      kind: "calc",
      sub: "Inverse functions",
      prompt: String.raw`Find the inverse function, if it exists: (a) $y = x^2$ where $x \ge 0$; (b) $y = x^3$; (c) $y = |x| + 2$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(a) $x = \sqrt{y}$ with $y \ge 0$ (one-to-one on $x \ge 0$)`, marks: 2 },
        { point: String.raw`(b) $x = \sqrt[3]{y}$ for all real $y$`, marks: 1.5 },
        { point: String.raw`(c) no inverse, with a counter-example such as $f(1) = f(-1) = 3$`, marks: 1.5 },
      ],
      model: String.raw`(a) On $x \ge 0$, different $x$ give different $x^2$, so the function is one-to-one with range $y \ge 0$. Solving $y = x^2$ with $x \ge 0$: $x = \sqrt{y}$, $y \ge 0$ (as a function of $x$: $f^{-1}(x) = \sqrt{x}$, $x \ge 0$).
(b) $x^3$ is one-to-one on all of $\mathbb{R}$ (range all real numbers): $x = \sqrt[3]{y} = y^{1/3}$, i.e. $f^{-1}(x) = \sqrt[3]{x}$.
(c) $y = |x| + 2$ is **not** one-to-one: $x = 1$ and $x = -1$ both give $y = 3$, so from $y = 3$ we cannot recover $x$. **No inverse function exists.**`,
      answer: String.raw`(a) $\sqrt{y}$, $y \ge 0$; (b) $\sqrt[3]{y}$; (c) does not exist`,
      source: "Assignment 5 Q2(a)–(c)",
    },
    {
      id: "function-props-x6",
      kind: "calc",
      sub: "Inverse functions",
      prompt: String.raw`Find the inverse function, if it exists: (a) $P = 120 - 5Q$; (b) $F = \frac{9}{5}C + 32$. For (b), use your answer to find the Celsius temperature $C$ when $F = 77$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(a) $Q = 24 - \frac{P}{5}$ (or $\frac{120 - P}{5}$)`, marks: 2 },
        { point: String.raw`(b) $C = \frac{5}{9}(F - 32)$`, marks: 2 },
        { point: String.raw`$C = 25$ when $F = 77$`, marks: 1 },
      ],
      model: String.raw`Both are linear with non-zero slope, so they are one-to-one and have inverses.
(a) $P = 120 - 5Q \Rightarrow 5Q = 120 - P \Rightarrow Q = \frac{120 - P}{5} = 24 - \frac{P}{5}$. (This turns an inverse demand function back into a demand function.)
(b) $F = \frac{9}{5}C + 32 \Rightarrow \frac{9}{5}C = F - 32 \Rightarrow C = \frac{5}{9}(F - 32)$.
At $F = 77$: $C = \frac{5}{9} \times 45 = 25$. Check: $\frac{9}{5}(25) + 32 = 45 + 32 = 77$.`,
      answer: String.raw`$Q = 24 - P/5$; $C = \frac{5}{9}(F - 32)$, $C = 25$`,
      source: "Assignment 5 Q2(d)–(e)",
    },
    {
      id: "function-props-x7",
      kind: "calc",
      sub: "Inverse functions",
      prompt: String.raw`The function $f(x) = \frac{4e^x + 1}{2e^x - 3}$ is a one-to-one function. (a) Find the inverse function, denoted by $f^{-1}$. (b) Find the domain of this inverse function.`,
      marks: 5,
      rubric: [
        { point: String.raw`Cross-multiplies and collects $e^x$: $e^x(2y - 4) = 3y + 1$`, marks: 1.5 },
        { point: String.raw`$f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right)$`, marks: 1.5 },
        { point: String.raw`Requires $\frac{3x + 1}{2x - 4} > 0$ and analyses the signs`, marks: 1 },
        { point: String.raw`Domain $x < -\frac{1}{3}$ or $x > 2$`, marks: 1 },
      ],
      model: String.raw`(a) Let $y = \frac{4e^x + 1}{2e^x - 3}$. Multiply out:
$$y(2e^x - 3) = 4e^x + 1 \;\Rightarrow\; 2ye^x - 4e^x = 3y + 1 \;\Rightarrow\; e^x(2y - 4) = 3y + 1.$$
So $e^x = \frac{3y + 1}{2y - 4}$ and, taking $\ln$, $x = \ln\left(\frac{3y + 1}{2y - 4}\right)$. Writing the variable as $x$:
$$f^{-1}(x) = \ln\left(\frac{3x + 1}{2x - 4}\right).$$
Check: $f(0) = \frac{5}{-1} = -5$ and $f^{-1}(-5) = \ln\frac{-14}{-14} = \ln 1 = 0$.
(b) The logarithm needs $\frac{3x + 1}{2x - 4} > 0$, so numerator and denominator have the same sign:
- both positive: $x > -\frac{1}{3}$ and $x > 2 \Rightarrow x > 2$;
- both negative: $x < -\frac{1}{3}$ and $x < 2 \Rightarrow x < -\frac{1}{3}$.
Domain of $f^{-1}$: $(-\infty, -\frac{1}{3}) \cup (2, \infty)$. (This is the range of $f$: as $e^x \to 0$, $f \to -\frac{1}{3}$; as $e^x \to \infty$, $f \to 2$.)`,
      answer: String.raw`$f^{-1}(x) = \ln\frac{3x + 1}{2x - 4}$, domain $x < -\frac{1}{3}$ or $x > 2$`,
      source: "Assignment 6 Q1",
    },
    {
      id: "function-props-x8",
      kind: "proof",
      sub: "Inverse and general functions",
      prompt: String.raw`True or False? Justify your answer.
(a) If $f(x)$ is a one-to-one function and $10$ is in the domain of $f(x)$, then $f^{-1}(f(10)) = 10$.
(b) For any function $f$, $f(a - b) = f(a) - f(b)$.
(c) If $f$ is an even function with a domain that has all the real values, then $f$ does not have an inverse function.`,
      marks: 5,
      rubric: [
        { point: String.raw`(a) True: $f^{-1}(y)$ is the unique $x$ with $f(x) = y$; the inverse undoes $f$`, marks: 1.5 },
        { point: String.raw`(b) False, with a valid counter-example`, marks: 2 },
        { point: String.raw`(c) True: $f(-1) = f(1)$ so $f$ is not one-to-one`, marks: 1.5 },
      ],
      model: String.raw`(a) **True.** Since $f$ is one-to-one it has an inverse, defined by $f^{-1}(y) = x \iff y = f(x)$. Put $y = f(10)$: the unique $x$ with $f(x) = f(10)$ is $x = 10$, so $f^{-1}(f(10)) = 10$. The inverse undoes what $f$ did to $10$.
(b) **False.** Counter-example: $f(x) = x^2$, $a = 2$, $b = 1$. Then $f(a - b) = f(1) = 1$, but $f(a) - f(b) = 4 - 1 = 3 \neq 1$.
(c) **True.** Even means $f(-x) = f(x)$ for all $x$. With domain all of $\mathbb{R}$, take $x = 1$: $f(-1) = f(1)$ although $-1 \neq 1$. Two different inputs give the same output, so $f$ is not one-to-one and therefore has no inverse function.`,
      answer: "(a) True (b) False (c) True",
      source: "Assignment 6 Q4",
    },
    {
      id: "function-props-x9",
      kind: "calc",
      sub: "Composite functions",
      prompt: String.raw`Let $f(x) = x^2$ and $g(x) = 1 + x$. Find $(f \circ g)(x)$, $(g \circ f)(x)$ and $(f \cdot g)(x)$, and evaluate each at $x = 2$. What does this show?`,
      marks: 5,
      rubric: [
        { point: String.raw`$(f \circ g)(x) = (1 + x)^2$`, marks: 1 },
        { point: String.raw`$(g \circ f)(x) = 1 + x^2$`, marks: 1 },
        { point: String.raw`$(f \cdot g)(x) = x^2(1 + x)$`, marks: 1 },
        { point: String.raw`Values $9$, $5$, $12$ at $x = 2$`, marks: 1 },
        { point: String.raw`Conclusion: $f \circ g \neq g \circ f$, and composition differs from the product`, marks: 1 },
      ],
      model: String.raw`$(f \circ g)(x) = f(g(x)) = f(1 + x) = (1 + x)^2$; at $x = 2$: $9$.
$(g \circ f)(x) = g(f(x)) = g(x^2) = 1 + x^2$; at $x = 2$: $5$.
$(f \cdot g)(x) = f(x) \times g(x) = x^2(1 + x) = x^2 + x^3$; at $x = 2$: $12$.
Since $9 \neq 5$, $f \circ g \neq g \circ f$: the order of composition matters. And $(f \circ g)(x)$ and $(f \cdot g)(x)$ are different concepts (composition substitutes one function into the other; the product multiplies their values).`,
      answer: String.raw`$(1 + x)^2$, $1 + x^2$, $x^2 + x^3$; values 9, 5, 12`,
      source: "Lecture Note 4 exercise and remark",
    },
    {
      id: "function-props-x10",
      kind: "calc",
      sub: "Inverse functions",
      prompt: String.raw`(i) Find the inverse function of $y = 4x - 3$.
(ii) The demand function is a function of $P$, $D = f(P)$. Suppose a specific demand function is $D = 100 - 10P$. Find the inverse demand function and use it to find the price at which 40 units are demanded.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $x = \frac{y + 3}{4}$, i.e. $f^{-1}(x) = \frac{x + 3}{4}$`, marks: 2 },
        { point: String.raw`(ii) $P = 10 - \frac{D}{10}$`, marks: 2 },
        { point: String.raw`$P = 6$ when $D = 40$`, marks: 1 },
      ],
      model: String.raw`(i) $y = 4x - 3$ is linear with slope $4 \neq 0$, so it is one-to-one. Solve for $x$: $4x = y + 3 \Rightarrow x = \frac{y + 3}{4}$. As a function of $x$: $f^{-1}(x) = \frac{x + 3}{4}$. Check: $f(2) = 5$, $f^{-1}(5) = 2$.
(ii) Solve $D = 100 - 10P$ for $P$: $10P = 100 - D \Rightarrow P = 10 - \frac{D}{10}$.
At $D = 40$: $P = 10 - 4 = 6$. Check: $100 - 10(6) = 40$.`,
      answer: String.raw`$f^{-1}(x) = \frac{x + 3}{4}$; $P = 10 - D/10$, $P = 6$`,
      source: "Lecture Note 4 exercise (a), (b)",
    },
    {
      id: "function-props-x11",
      kind: "calc",
      sub: "Average cost",
      prompt: String.raw`The cost of producing $Q$ units of a commodity is $C(Q) = Q^3 - 6Q^2 + 15Q + 32$. Find the average cost function $AC(Q)$, state which two simple functions it is the sum of, and compute the average cost at $Q = 4$.`,
      marks: 5,
      rubric: [
        { point: String.raw`$AC = \frac{C(Q)}{Q}$, $Q > 0$`, marks: 1 },
        { point: String.raw`$AC = Q^2 - 6Q + 15 + \frac{32}{Q}$`, marks: 2 },
        { point: String.raw`Sum of the quadratic $Q^2 - 6Q + 15$ and the hyperbola $32/Q$`, marks: 1 },
        { point: String.raw`$AC(4) = 15$`, marks: 1 },
      ],
      model: String.raw`Average cost is cost per unit of output: $AC(Q) = \frac{C(Q)}{Q}$ for $Q > 0$.
$$AC(Q) = \frac{Q^3 - 6Q^2 + 15Q + 32}{Q} = Q^2 - 6Q + 15 + \frac{32}{Q}.$$
It is the sum of the quadratic function $y = Q^2 - 6Q + 15$ and the hyperbola $y = 32/Q$ (the form $aQ^2 + bQ + c + d/Q$ with $a = 1$, $b = -6$, $c = 15$, $d = 32$).
At $Q = 4$: $16 - 24 + 15 + 8 = 15$. Check: $C(4) = 64 - 96 + 60 + 32 = 60$ and $60/4 = 15$.`,
      answer: String.raw`$AC = Q^2 - 6Q + 15 + 32/Q$; $AC(4) = 15$`,
      source: "Modelled on Lecture Note 4 example",
    },
    {
      id: "function-props-x12",
      kind: "calc",
      sub: "Profit",
      prompt: String.raw`A firm's revenue from producing and selling $Q$ units is $R(Q) = 50Q$ and its cost is $C(Q) = Q^3 - 6Q^2 + 15Q + 32$. Derive the profit function $\pi(Q)$ and calculate the profit or loss at $Q = 2$ and at $Q = 10$.`,
      marks: 5,
      rubric: [
        { point: String.raw`$\pi(Q) = R(Q) - C(Q)$`, marks: 1 },
        { point: String.raw`$\pi(Q) = -Q^3 + 6Q^2 + 35Q - 32$`, marks: 2 },
        { point: String.raw`$\pi(2) = 54$ (profit)`, marks: 1 },
        { point: String.raw`$\pi(10) = -82$ (a loss of 82)`, marks: 1 },
      ],
      model: String.raw`Profit is the difference of revenue and cost:
$$\pi(Q) = R(Q) - C(Q) = 50Q - (Q^3 - 6Q^2 + 15Q + 32) = -Q^3 + 6Q^2 + 35Q - 32.$$
$\pi(2) = -8 + 24 + 70 - 32 = 54$: a profit of 54 (check: $R(2) = 100$, $C(2) = 46$).
$\pi(10) = -1000 + 600 + 350 - 32 = -82$: a loss of 82 (check: $R(10) = 500$, $C(10) = 582$).`,
      answer: String.raw`$\pi(Q) = -Q^3 + 6Q^2 + 35Q - 32$; profit 54 at $Q = 2$, loss 82 at $Q = 10$`,
      source: "Modelled on Lecture Note 4 example",
    },
    {
      id: "function-props-x13",
      kind: "explain",
      sub: "One-to-one functions",
      prompt: String.raw`The figures show two functions defined on an interval $A$. The first, $f$, is increasing over all of $A$ with range $f(A) = B$. The second, $g$, rises to a peak, falls and then rises again, and the level $y_1$ is reached at the points $x_1 < x_2$ (and once more). Explain which of $f$ and $g$ has an inverse function on $A$, and state the domain and range of that inverse.`,
      marks: 5,
      rubric: [
        { point: String.raw`States the condition: an inverse exists if and only if the function is one-to-one`, marks: 1 },
        { point: String.raw`$f$ is increasing, so each $y \in B$ comes from exactly one $x$: $f$ has an inverse`, marks: 1.5 },
        { point: String.raw`Domain of $f^{-1}$ is $B$, range is $A$`, marks: 1 },
        { point: String.raw`$g(x_1) = g(x_2) = y_1$ with $x_1 \neq x_2$, so $g$ has no inverse`, marks: 1.5 },
      ],
      model: String.raw`A function with domain $A$ and range $B$ has an inverse **if and only if** it is one-to-one.
**$f$:** it is increasing on all of $A$, so different $x$ give different $y$; each $y \in B = f(A)$ is the image of exactly one $x \in A$. Hence $f$ is one-to-one and has an inverse $f^{-1}$ with **domain $B$ and range $A$**, where $f^{-1}(y) = x \iff y = f(x)$.
**$g$:** the horizontal level $y_1$ is reached at $x_1$ and $x_2$ with $x_1 \neq x_2$, so $g(x_1) = g(x_2) = y_1$. Starting from $y_1$ we cannot tell which $x$ produced it, so $g$ is not one-to-one and has **no** inverse on $A$. (It is still a function: many $x$ to one $y$ is allowed.)`,
      answer: "Only f has an inverse (domain B, range A); g is not one-to-one",
      figures: [
        {
          title: "f: increasing on A",
          xr: [0, 5.5],
          yr: [0, 3.5],
          curves: [{ f: "sqrt(x-1)+1", from: 1, to: 5, label: "f" }],
          points: [
            { at: [1, 1], guides: true },
            { at: [5, 3], guides: true },
          ],
          labels: [
            { at: [3, 0.2], text: "A" },
            { at: [0.2, 2], text: "B" },
          ],
        },
        {
          title: "g: not one-to-one on A",
          xr: [-0.3, 4],
          yr: [-1.2, 5.5],
          curves: [{ f: "x^3-6*x^2+9*x+1", from: -0.2, to: 3.85, label: "g" }],
          segments: [{ from: [-0.3, 3], to: [4, 3], dashed: true, tone: 3, label: "y₁" }],
          points: [
            { at: [0.268, 3], label: "x₁", guides: true, tone: 1 },
            { at: [2, 3], label: "x₂", guides: true, tone: 1 },
            { at: [3.732, 3], tone: 1 },
          ],
        },
      ],
      source: "Lecture Note 4 exercise (c)",
    },
    {
      id: "function-props-x14",
      kind: "calc",
      sub: "Inverse functions",
      prompt: String.raw`The function $f(x) = \frac{e^x + 2}{e^x - 1}$ is one-to-one. (a) Find its inverse function $f^{-1}$. (b) Find the domain of $f^{-1}$.`,
      marks: 5,
      rubric: [
        { point: String.raw`Cross-multiplies and collects $e^x$: $e^x(y - 1) = y + 2$`, marks: 1.5 },
        { point: String.raw`$f^{-1}(x) = \ln\left(\frac{x + 2}{x - 1}\right)$`, marks: 1.5 },
        { point: String.raw`Requires $\frac{x + 2}{x - 1} > 0$ and analyses the signs`, marks: 1 },
        { point: String.raw`Domain $x < -2$ or $x > 1$`, marks: 1 },
      ],
      model: String.raw`(a) Let $y = \frac{e^x + 2}{e^x - 1}$. Then
$$y(e^x - 1) = e^x + 2 \;\Rightarrow\; ye^x - e^x = y + 2 \;\Rightarrow\; e^x(y - 1) = y + 2 \;\Rightarrow\; e^x = \frac{y + 2}{y - 1}.$$
Taking $\ln$: $x = \ln\frac{y + 2}{y - 1}$, so $f^{-1}(x) = \ln\left(\frac{x + 2}{x - 1}\right)$.
Check: $f(\ln 2) = \frac{2 + 2}{2 - 1} = 4$ and $f^{-1}(4) = \ln\frac{6}{3} = \ln 2$.
(b) Need $\frac{x + 2}{x - 1} > 0$:
- both positive: $x > -2$ and $x > 1 \Rightarrow x > 1$;
- both negative: $x < -2$ and $x < 1 \Rightarrow x < -2$.
Domain of $f^{-1}$: $x < -2$ or $x > 1$, i.e. $(-\infty, -2) \cup (1, \infty)$, which is the range of $f$.`,
      answer: String.raw`$f^{-1}(x) = \ln\frac{x + 2}{x - 1}$; domain $x < -2$ or $x > 1$`,
      source: "Modelled on Assignment 6 Q1",
    },
    {
      id: "function-props-x15",
      kind: "select",
      sub: "Shifting, composite and inverse functions",
      prompt: "Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.",
      statements: [
        String.raw`The graph of $y = f(x - 3)$ is the graph of $y = f(x)$ moved 3 units to the right.`,
        String.raw`The graph of $y = -f(x)$ is the graph of $y = f(x)$ reflected about the $y$-axis.`,
        String.raw`If $f(x) = x^2$ and $g(x) = 1 + x$, then $(f \circ g)(x) \neq (g \circ f)(x)$.`,
        String.raw`For any functions $f$ and $g$, $(f \cdot g)(x) = f(g(x))$.`,
        String.raw`If $f$ is one-to-one with domain $A$ and range $B$, then $f^{-1}$ has domain $B$ and range $A$.`,
        String.raw`A function may associate many $x$ with one $y$, but never one $x$ with many $y$.`,
      ],
      wrong: [1, 3],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (iv) as wrong", marks: 2.5 },
      ],
      model: String.raw`**(ii) is wrong.** $y = -f(x)$ is $c\,f(x)$ with $c = -1$: the graph is reflected about the **$x$-axis**. Reflection about the $y$-axis is $y = f(-x)$.
**(iv) is wrong.** $(f \cdot g)(x) = f(x) \times g(x)$ is the product; $f(g(x))$ is the composite $(f \circ g)(x)$. E.g. with $f(x) = x^2$, $g(x) = 1 + x$: $x^2(1 + x) \neq (1 + x)^2$.
The others are true: (i) $f(x + c)$ with $c = -3$ moves right 3; (iii) $(1 + x)^2 \neq 1 + x^2$; (v) the inverse swaps domain and range; (vi) is the definition of a function.`,
      answer: "(ii) and (iv)",
      source: "Modelled on Past paper Q4(c)–(d) style, Lecture Note 4",
    },
    {
      id: "function-props-x16",
      kind: "select",
      sub: "Tax and inverse functions",
      prompt: "Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.",
      statements: [
        String.raw`If supply is $Q^S = 10 + 2P$, a 1-dollar per-unit tax on producers changes it to $Q^S = 8 + 2P$.`,
        String.raw`With $Q^S = 10 + 2P$ and $Q^D = 100 - P$, the 1-dollar per-unit tax raises the equilibrium price by exactly 1 dollar.`,
        String.raw`The inverse demand function of $D = 100 - 10P$ is $P = 10 - 0.1D$.`,
        String.raw`$y = x^3$ has the inverse $x = \sqrt[3]{y}$, defined for all real $y$.`,
        String.raw`$y = |x| + 2$ has the inverse function $x = y - 2$.`,
        String.raw`$y = x^2$ with $x \ge 0$ has the inverse $x = \sqrt{y}$, $y \ge 0$.`,
      ],
      wrong: [1, 4],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (v) as wrong", marks: 2.5 },
      ],
      model: String.raw`**(ii) is wrong.** Before the tax $P = 30$; after it, $8 + 2P = 100 - P$ gives $P = \frac{92}{3} \approx 30.67$. The price rises by only $\frac{2}{3}$ of a dollar, not by the full 1 dollar.
**(v) is wrong.** $y = |x| + 2$ is not one-to-one ($x = 1$ and $x = -1$ both give $y = 3$), so it has no inverse. ($x = y - 2$ only undoes it for $x \ge 0$.)
The others are true: (i) $10 + 2(P - 1) = 8 + 2P$; (iii) $10P = 100 - D$; (iv) $x^3$ is one-to-one on $\mathbb{R}$; (vi) $x^2$ is one-to-one on $x \ge 0$.`,
      answer: "(ii) and (v)",
      source: "Modelled on Assignment 5 Q2 and Lecture Note 4 exercise",
    },
  ],
};

export default data;
