import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "differentiation",
  sections: [
    // ------------------------------------------------------------------ 5.1
    {
      title: "5.1 Slope of Curves",
      intro: r`The use of the derivative is **essential** in economics: marginal cost, marginal revenue and marginal profit are all derivatives. The starting question is: for an arbitrary function $f$, how steep is its graph at a point?`,
      points: [
        {
          term: "Steepness at a point",
          text: r`Take the point $P = (a, f(a))$ on the graph of $y = f(x)$. The steepness of the graph at $P$ is measured by the slope of the **tangent** line $L$ that touches the curve at $P$.`,
        },
        {
          term: "Derivative at a point",
          text: r`The slope of the tangent to the graph at $P$ is called the **derivative of $f$ at the point $a$**, written $f'(a)$.`,
          eg: r`$f'(a)$ = the slope of the tangent to the curve $y = f(x)$ at $x = a$.`,
        },
        {
          term: "Approximation",
          text: r`For a small number $h$, the slope of the short line from $(a, f(a))$ to $(a+h, f(a+h))$ is close to the tangent slope: $f'(a) \approx \dfrac{f(a+h)-f(a)}{h}$.`,
          eg: r`$f(x) = x^2$, $a = 1$, $h = 0.01$: $\frac{1.0201 - 1}{0.01} = 2.01 \approx f'(1) = 2$.`,
        },
        {
          term: "Sign of the slope",
          text: r`$f'(a) > 0$: the tangent rises (the graph is going up at $a$); $f'(a) < 0$: the tangent falls; $f'(a) = 0$: the tangent is horizontal.`,
        },
      ],
      formulas: [
        { name: "Derivative as a slope", tex: r`f'(a) = \text{slope of the tangent to } y = f(x) \text{ at } x = a` },
        { name: "Approximation for small h", tex: r`f'(a) \approx \frac{f(a+h)-f(a)}{h}` },
      ],
      figures: [
        {
          title: "The tangent L at P = (a, f(a))",
          xr: [0, 6],
          yr: [0, 5.5],
          curves: [
            { f: "4 - (x-3)^2/2", label: "y = f(x)", from: 0.2, to: 5.8 },
            { f: "x + 1.5", label: "L (tangent)", from: 0, to: 3.8, tone: 1 },
          ],
          points: [{ at: [2, 3.5], label: "P = (a, f(a))", guides: true }],
          caption: "The tangent L touches the curve at P. Its slope is the derivative f′(a); here a = 2 and f′(2) = 1.",
        },
      ],
    },

    // ------------------------------------------------------------------ 5.2
    {
      title: "5.2 The Derivative versus Tangents",
      intro: r`The tangent is found as the limit of **secant** lines. This gives the formal definition of the derivative as a limit.`,
      points: [
        {
          term: "Secant",
          text: r`The straight line through two points $P$ and $Q$ on a curve is called a **secant**.`,
        },
        {
          term: "Tangent as a limit",
          text: r`Keep $P$ fixed and let $Q$ move (rotate) along the curve towards $P$. The secants approach a limiting straight line $PT$, which is called the **tangent** (line) to the curve **at $P$**.`,
        },
        {
          term: "Slope of the secant",
          text: r`With $P = (a, f(a))$ and $Q = (a+h, f(a+h))$: slope of $PQ = \dfrac{f(a+h)-f(a)}{(a+h)-a} = \dfrac{f(a+h)-f(a)}{h}$.`,
          eg: r`Recall: the slope of a straight line through $(x_1,y_1)$ and $(x_2,y_2)$ is $\dfrac{y_2-y_1}{x_2-x_1}$, where $x_2 \neq x_1$.`,
        },
        {
          term: "Push Q towards P",
          text: r`If $h \approx 0$, then $Q = (a+h, f(a+h))$ is very close to $P$ and the secant slope is very close to the tangent slope. Letting $h \to 0$ gives the slope of the curve at $x = a$.`,
        },
        {
          term: "Definition of the derivative",
          text: r`The derivative of $f$ at the point $a$ is $f'(a) = \displaystyle\lim_{h \to 0} \frac{f(a+h)-f(a)}{h}$.`,
          eg: r`At a general point $x$: $f'(x) = \displaystyle\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}$.`,
        },
        {
          term: "Method to calculate f′(a)",
          text: r`- 1. Add $h$ and compute $f(a+h)$.
- 2. Compute $f(a+h) - f(a)$.
- 3. Compute the ratio $\dfrac{f(a+h)-f(a)}{h}$ and simplify as much as possible (cancel the $h$).
- 4. Take the limit as $h \to 0$ to obtain $f'(a)$.`,
        },
      ],
      formulas: [
        { name: "Slope of the secant PQ", tex: r`\frac{f(a+h)-f(a)}{h}` },
        { name: "Definition of the derivative", tex: r`f'(a) = \lim_{h \to 0} \frac{f(a+h)-f(a)}{h}` },
      ],
      figures: [
        {
          title: "Secants PQ approach the tangent at P",
          xr: [0, 3.2],
          yr: [-0.5, 9],
          curves: [
            { f: "x^2", label: "f(x) = x²" },
            { f: "4*x - 3", from: 0.6, to: 3.1, tone: 3, dashed: true },
            { f: "3*x - 2", from: 0.5, to: 3.1, tone: 3, dashed: true },
            { f: "2.5*x - 1.5", from: 0.4, to: 3.1, tone: 3, dashed: true },
            { f: "2*x - 1", label: "tangent, slope 2", from: 0.3, to: 3.1, tone: 1 },
          ],
          points: [
            { at: [1, 1], label: "P" },
            { at: [3, 9], label: "Q (h = 2): slope 4" },
            { at: [2, 4], label: "Q (h = 1): slope 3" },
            { at: [1.5, 2.25], label: "Q (h = 0.5)" },
          ],
          caption: "For f(x) = x² at a = 1 the secant slope is 2 + h: 4, 3, 2.5, … As Q slides to P (h → 0) the secants turn towards the tangent, whose slope is f′(1) = 2.",
        },
        {
          title: "Rise over run of the secant",
          xr: [0, 2.6],
          yr: [-0.3, 5],
          curves: [{ f: "x^2", label: "f(x) = x²" }],
          points: [
            { at: [1, 1], label: "P = (a, f(a))", guides: true },
            { at: [2, 4], label: "Q = (a+h, f(a+h))", guides: true },
          ],
          segments: [
            { from: [1, 1], to: [2, 4], tone: 1 },
            { from: [1, 1], to: [2, 1], dashed: true, label: "h" },
            { from: [2, 1], to: [2, 4], dashed: true, label: "f(a+h) − f(a)" },
          ],
          caption: "Slope of PQ = [f(a+h) − f(a)] / h. Here (a+h)² − a² = 2ah + h².",
        },
      ],
      worked: [
        {
          source: "Lecture Note 5 exercise",
          problem: r`Consider $f(x) = x^2$. Use the definition to find the slope of the function at the point $a$.`,
          solution: r`$f(a+h) - f(a) = (a+h)^2 - a^2 = 2ah + h^2$.
$$\frac{f(a+h)-f(a)}{h} = \frac{2ah+h^2}{h} = \frac{h(2a+h)}{h} = 2a + h.$$
Letting $h \to 0$: $f'(a) = \displaystyle\lim_{h\to 0}(2a+h) = 2a$.
As $h \to 0$ the point $a+h$ gets close to $a$, i.e. $Q$ slides down the curve to $P$ and the secant rotates (clockwise) into the tangent.`,
        },
        {
          source: "Past paper Q2(b)",
          problem: r`The revenue function is $R(P) = \dfrac{5}{P}$, where $P$ is the price. Use the definition of the derivative to find $R'(P)$.`,
          solution: r`Step 1–2: $R(P+h) - R(P) = \dfrac{5}{P+h} - \dfrac{5}{P} = \dfrac{5P - 5(P+h)}{P(P+h)} = \dfrac{-5h}{P(P+h)}$.
Step 3: $\dfrac{R(P+h)-R(P)}{h} = \dfrac{-5}{P(P+h)}$.
Step 4: $R'(P) = \displaystyle\lim_{h\to 0}\frac{-5}{P(P+h)} = -\frac{5}{P^2}$.`,
        },
        {
          source: "Assignment 5 Q6",
          problem: r`$f(x) = ax^2 + bx + c$. (a) Using the definition, show $f'(x) = 2ax + b$. (b) For what value of $x$ is $f'(x) = 0$? (c) With $a = 2$, $b = 4$, $c = 10$, find the slope of the tangent at $(-1, 8)$.`,
          solution: r`(a) $f(x+h) - f(x) = a(2xh + h^2) + bh$, so $\dfrac{f(x+h)-f(x)}{h} = 2ax + ah + b \to 2ax + b$.
(b) $2ax + b = 0 \iff x = -\dfrac{b}{2a}$ (for $a \neq 0$).
(c) $f(x) = 2x^2 + 4x + 10$, $f(-1) = 2 - 4 + 10 = 8$ (the point is on the curve). $f'(x) = 4x + 4$, so $f'(-1) = 0$: the tangent at $(-1, 8)$ is horizontal.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.3
    {
      title: "5.3 Increasing and Decreasing Functions",
      intro: r`Let $I$ be an interval of $x$ values and take any two points $x_1 < x_2$ in $I$.`,
      points: [
        { term: "Increasing", text: r`If $f(x_2) \ge f(x_1)$ whenever $x_2 > x_1$, then $f$ is **increasing** in $I$.` },
        { term: "Strictly increasing", text: r`If $f(x_2) > f(x_1)$ whenever $x_2 > x_1$, then $f$ is **strictly increasing** in $I$.` },
        { term: "Decreasing", text: r`If $f(x_2) \le f(x_1)$ whenever $x_2 > x_1$, then $f$ is **decreasing** in $I$.` },
        { term: "Strictly decreasing", text: r`If $f(x_2) < f(x_1)$ whenever $x_2 > x_1$, then $f$ is **strictly decreasing** in $I$.` },
        { term: "Remark", text: r`$I$ represents the interval of $x$. "Increasing" (with $\ge$) allows flat pieces; "strictly increasing" (with $>$) does not.` },
        {
          term: "Link with the derivative",
          text: r`Since $f'(x)$ is the slope of the tangent: if $f'(x) \ge 0$ throughout $I$, $f$ is increasing in $I$; if $f'(x) \le 0$ throughout $I$, $f$ is decreasing in $I$. This is how Assignment 7 finds where TR increases (MR $\ge 0$) or decreases (MR $\le 0$).`,
        },
      ],
      table: [
        ["Whenever $x_2 > x_1$ in $I$", "$f$ is…"],
        ["$f(x_2) \\ge f(x_1)$", "increasing"],
        ["$f(x_2) > f(x_1)$", "strictly increasing"],
        ["$f(x_2) \\le f(x_1)$", "decreasing"],
        ["$f(x_2) < f(x_1)$", "strictly decreasing"],
      ],
      figures: [
        {
          title: "Increasing and decreasing regions of f(x) = x³ − 3x",
          xr: [-2.5, 2.5],
          yr: [-4, 4],
          curves: [
            { f: "x^3 - 3*x", from: -2.5, to: -1, tone: 2 },
            { f: "x^3 - 3*x", from: -1, to: 1, tone: 1 },
            { f: "x^3 - 3*x", from: 1, to: 2.5, tone: 2, label: "y = x³ − 3x" },
          ],
          points: [
            { at: [-1, 2], label: "(−1, 2)", guides: true },
            { at: [1, -2], label: "(1, −2)", guides: true },
          ],
          labels: [
            { at: [-2.1, 3.2], text: "increasing", tone: 2 },
            { at: [-0.4, 3.2], text: "decreasing", tone: 1 },
            { at: [1.3, 3.2], text: "increasing", tone: 2 },
          ],
          caption: "Green: the graph rises as x increases (f′ ≥ 0). Orange: it falls (f′ ≤ 0), here on −1 ≤ x ≤ 1.",
        },
        {
          title: "Decreasing but not strictly decreasing",
          xr: [0, 4],
          yr: [-0.5, 4],
          curves: [{ f: "3 - (x - 1 + abs(x-1))/2", label: "f", tone: 0 }],
          labels: [
            { at: [0.15, 3.4], text: "flat: f(x₂) = f(x₁)" },
            { at: [2.2, 2.4], text: "falling: f(x₂) < f(x₁)" },
          ],
          caption: "f(x₂) ≤ f(x₁) whenever x₂ > x₁, so f is decreasing on [0, 4]; it is not strictly decreasing because of the flat piece.",
        },
        {
          x: "Q",
          y: "TR, MR",
          title: "Assignment 7 Q3: TR = 6Q − Q²/2 and MR = 6 − Q",
          xr: [0, 12.5],
          yr: [-7, 20],
          curves: [
            { f: "6*x - x^2/2", label: "TR", from: 0, to: 12 },
            { f: "6 - x", label: "MR", from: 0, to: 12, tone: 1 },
          ],
          points: [{ at: [6, 18], label: "max TR = 18 at Q = 6", guides: true }],
          labels: [
            { at: [0.6, 12], text: "MR > 0: TR increasing", tone: 2 },
            { at: [8.4, 12], text: "MR < 0: TR decreasing", tone: 1 },
          ],
          caption: "TR rises while MR > 0 (0 ≤ Q < 6) and falls while MR < 0 (6 < Q ≤ 12). The top of TR is where MR = 0.",
        },
      ],
      worked: [
        {
          source: "Assignment 7 Q3",
          problem: r`The inverse demand function is $P = 6 - \frac12 Q$. (a) Find TR and sketch it. (b) Derive MR. (c)–(d) Find where TR is increasing and decreasing. (e) Find the $Q$ that maximises revenue. Does it make sense?`,
          solution: r`(a) $TR = P\cdot Q = 6Q - \frac12 Q^2$, for $0 \le Q \le 12$ (so that $P \ge 0$). It is an upside-down parabola through $(0,0)$ and $(12,0)$ with top at $(6, 18)$.
(b) $MR = \dfrac{d(TR)}{dQ} = 6 - Q$.
(c) $MR \ge 0 \iff Q \le 6$: TR is increasing on $0 \le Q \le 6$.
(d) $MR \le 0 \iff Q \ge 6$: TR is decreasing on $6 \le Q \le 12$.
(e) TR rises up to $Q = 6$ and falls afterwards, so revenue is largest at $Q = 6$: $TR = 36 - 18 = 18$ (price $P = 3$). It makes sense: while MR > 0 an extra unit adds revenue, once MR < 0 it reduces revenue, so the best output is where MR = 0.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.4
    {
      title: "5.4 Rates of Change",
      intro: r`The derivative measures the rate of change of a function. In economics this gives the **marginal** concepts.`,
      points: [
        {
          term: "Cost example (Lecture Note 3)",
          text: r`The cost of producing $x$ units is the linear function $C(x) = 200 + 10x$.`,
        },
        {
          term: "Marginal cost",
          text: r`$C'(x)$ is the marginal cost at $x$: $C'(x) = \displaystyle\lim_{h\to 0}\frac{C(x+h)-C(x)}{h}$, or $C'(x) \approx \dfrac{C(x+h)-C(x)}{h}$ for a very small $h$.`,
          eg: r`It is the extra cost of producing an additional very small unit of the product.`,
        },
        {
          term: "Marginal cost of C = 200 + 10x",
          text: r`$C'(x) = \displaystyle\lim_{h\to 0}\frac{200+10(x+h)-(200+10x)}{h} = \lim_{h\to 0}\frac{10h}{h} = 10$.`,
        },
        {
          term: "Profit",
          text: r`$\pi(x) = R(x) - C(x)$, where $R(x)$ is the revenue from selling $x$ units and $C(x)$ is the total cost of producing $x$ units.`,
        },
        { term: "Marginal revenue", text: r`$MR = R'(x)$.` },
        { term: "Marginal profit", text: r`$\pi'(x) = R'(x) - C'(x)$, i.e. marginal revenue minus marginal cost.` },
      ],
      formulas: [
        { name: "Marginal cost", tex: r`C'(x) = \lim_{h\to 0}\frac{C(x+h)-C(x)}{h}` },
        { name: "Profit", tex: r`\pi(x) = R(x) - C(x)` },
        { name: "Marginal revenue and marginal profit", tex: r`MR = R'(x), \qquad \pi'(x) = R'(x) - C'(x)` },
      ],
      worked: [
        {
          source: "Lecture Note 5 exercise",
          problem: r`Use the definition to compute the marginal cost, marginal revenue and marginal profit when $R(x) = dx$ and $C(x) = ax^2 + bx + c$ ($a, b, c, d$ constants).`,
          solution: r`$C(x+h) - C(x) = a(x+h)^2 + b(x+h) + c - (ax^2+bx+c) = 2axh + ah^2 + bh$.
$\dfrac{C(x+h)-C(x)}{h} = 2ax + ah + b \to 2ax + b$ as $h\to 0$. So $MC = C'(x) = 2ax + b$.
$\dfrac{R(x+h)-R(x)}{h} = \dfrac{d(x+h) - dx}{h} = \dfrac{dh}{h} = d$. So $MR = R'(x) = d$.
Marginal profit: $\pi'(x) = d - 2ax - b$.`,
        },
        {
          source: "Assignment 7 Q1",
          problem: r`$TC(Q) = 2Q^3 - 18Q^2 + 60Q + 250$. (a) Write down the variable cost function. (b) Find its first derivative and interpret it.`,
          solution: r`(a) Fixed cost is the part that does not depend on $Q$: $FC = TC(0) = 250$. So $VC(Q) = 2Q^3 - 18Q^2 + 60Q$.
(b) $VC'(Q) = 6Q^2 - 36Q + 60$. This is the **marginal cost**: the (approximate) extra cost of producing one more unit when output is $Q$. Fixed cost does not change with $Q$, so $VC'(Q) = TC'(Q)$.
Note $6Q^2 - 36Q + 60 = 6[(Q-3)^2 + 1] > 0$: each extra unit always adds to cost.`,
        },
        {
          source: "Assignment 7 Q2",
          problem: r`The inverse demand function is $P = -\frac12 Q + 50$. (a) Find TR. (b) Calculate MR at $Q = 20$ and interpret it.`,
          solution: r`(a) $TR = PQ = 50Q - \frac12 Q^2$.
(b) $MR = 50 - Q$, so $MR(20) = 30$. At an output of 20, selling one more unit raises total revenue by about 30. (Check: $TR(21) - TR(20) = 829.5 - 800 = 29.5 \approx 30$.)`,
        },
        {
          source: "Assignment 7 Q4",
          problem: r`The production function is $Q = 16\sqrt L - L$ ($Q$ output, $L$ workforce). Calculate $MP_L = \dfrac{dQ}{dL}$ at $L = 1, 4, 9, 16$ and discuss.`,
          solution: r`$MP_L = 16\cdot\frac12L^{-1/2} - 1 = \dfrac{8}{\sqrt L} - 1$.
$L = 1$: $7$; $L = 4$: $3$; $L = 9$: $\frac83 - 1 = \frac53 \approx 1.67$; $L = 16$: $2 - 1 = 1$.
An extra worker always adds output here ($MP_L > 0$), but less and less as the workforce grows: the marginal product of labour is diminishing. (It reaches 0 at $L = 64$; beyond that extra workers would reduce output.)`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.5
    {
      title: "5.5 Limits",
      intro: r`Suppose $f(x)$ and $g(x)$ are defined in a neighbourhood of $a$ (but not necessarily **at** $a$), with $\lim_{x\to a} f(x) = A$ and $\lim_{x\to a} g(x) = B$.`,
      points: [
        { term: "(i) Sum / difference", text: r`$\lim_{x\to a}\big(f(x) \pm g(x)\big) = A \pm B$.` },
        { term: "(ii) Product", text: r`$\lim_{x\to a}\big(f(x) \times g(x)\big) = A \times B$.` },
        { term: "(iii) Quotient", text: r`$\lim_{x\to a}\dfrac{f(x)}{g(x)} = \dfrac{A}{B}$, where $B \neq 0$.` },
        { term: "(iv) Power", text: r`$\lim_{x\to a}\big(f(x)\big)^r = A^r$, where $A^r$ is defined and $r$ is any real number.` },
        {
          term: "Direct substitution",
          text: r`For polynomials, roots and powers you can usually substitute $x = a$ directly (rules (i)–(iv)).`,
          eg: r`$\lim_{x\to a} 6x^r = 6a^r$; $\lim_{x\to 2}(x^2 - 5x + 4) = 4 - 10 + 4 = -2$; $\lim_{x\to 7}\sqrt2 = \sqrt2$.`,
        },
        {
          term: "0/0: factor and cancel",
          text: r`If substituting gives $\frac00$, factor the common factor $(x - a)$ out of top and bottom, cancel it (allowed because $x \neq a$ near $a$), then substitute.`,
          eg: r`$\dfrac{3x^2+3x-18}{x-2} = \dfrac{3(x+3)(x-2)}{x-2} = 3(x+3) \to 15$ as $x \to 2$.`,
        },
        {
          term: "0/0 with a square root: conjugate",
          text: r`Multiply top and bottom by the conjugate (e.g. $\sqrt{h+1}+1$) so the root disappears from the numerator, then cancel.`,
          eg: r`$\dfrac{\sqrt{h+1}-1}{h} = \dfrac{(h+1)-1}{h(\sqrt{h+1}+1)} = \dfrac{1}{\sqrt{h+1}+1} \to \dfrac12$.`,
        },
        {
          term: "x → ∞",
          text: r`Divide top and bottom by the highest power of $x$; terms like $\frac1x$ tend to 0. If the expression grows without bound (e.g. $e^x$), there is no finite limit.`,
        },
        {
          term: "Repeating expressions",
          text: r`For an infinitely nested expression, call it $y$, notice that $y$ appears inside itself, solve that equation, then take the limit.`,
          eg: r`$y = x\sqrt{x\sqrt{x\sqrt{x\cdots}}}$ satisfies $y = x\sqrt{y}$, so $y = x^2$.`,
        },
      ],
      formulas: [
        { name: "Sum, product, quotient rules for limits", tex: r`\lim_{x\to a}(f\pm g) = A\pm B,\quad \lim_{x\to a}(f g) = AB,\quad \lim_{x\to a}\frac{f}{g} = \frac{A}{B}\ (B\neq 0)` },
        { name: "Power rule for limits", tex: r`\lim_{x\to a}\big(f(x)\big)^r = A^r` },
      ],
      figures: [
        {
          title: "Limit at a point where f is not defined",
          xr: [0, 4],
          yr: [0, 22],
          curves: [{ f: "3*x + 9", label: "y = (3x² + 3x − 18)/(x − 2)" }],
          points: [{ at: [2, 15], label: "hole at x = 2; limit = 15", open: true, guides: true }],
          caption: "The function equals 3(x + 3) for every x ≠ 2 and is undefined at x = 2, but as x → 2 the values approach 15.",
        },
        {
          title: "√(x² − x) − x approaches −1/2",
          xr: [1, 40],
          yr: [-1, 0.2],
          curves: [{ f: "sqrt(x^2 - x) - x", label: "y = √(x² − x) − x" }],
          segments: [{ from: [1, -0.5], to: [40, -0.5], dashed: true, tone: 1, label: "y = −1/2" }],
          caption: "Past paper Q1(b): as x → ∞ the curve levels off at −1/2 (not 0, even though √(x² − x) ≈ x).",
        },
        {
          title: "Assignment 5 Q4: reading a limit from a graph",
          xr: [-0.3, 5.3],
          yr: [-3, 4],
          curves: [
            { f: "3 + (x-1)*2/0.35", from: 0, to: 1 },
            { f: "3/x", from: 1, to: 5, label: "y = f(x)" },
          ],
          points: [
            { at: [1, 3], label: "(1, 3)", guides: true },
            { at: [0.65, 1], label: "(0.65, 1)" },
            { at: [3, 1], label: "(3, 1)" },
          ],
          caption: "A straight line rises through (0.65, 1) to the peak (1, 3); then the curve falls through (3, 1). From either side, f(x) gets close to 3 as x gets close to 1.",
        },
      ],
      worked: [
        {
          source: "Lecture Note 5 exercise",
          problem: r`Evaluate (a) $\lim_{x\to a} 6x^r$, (b) $\lim_{x\to 2}\dfrac{3x^2+3x-18}{x-2}$, (c) $\lim_{h\to 0}\dfrac{\sqrt{h+1}-1}{h}$.`,
          solution: r`(a) By rules (ii) and (iv): $6a^r$ (where $a^r$ is defined).
(b) Substituting gives $\frac00$. Factor: $3x^2 + 3x - 18 = 3(x^2+x-6) = 3(x+3)(x-2)$. Cancel $(x-2)$: limit $= 3(2+3) = 15$.
(c) Multiply by $\sqrt{h+1}+1$: $\dfrac{(h+1)-1}{h(\sqrt{h+1}+1)} = \dfrac{1}{\sqrt{h+1}+1} \to \dfrac{1}{2}$.`,
        },
        {
          source: "Assignment 5 Q3",
          problem: r`Compute (a) $\lim_{x\to 7}\sqrt2$ (b) $\lim_{x\to 2}(x^2-5x+4)$ (c) $\lim_{x\to 4}\dfrac{x^2-16}{4\sqrt x - 8}$ (d) $\lim_{h\to 0}\dfrac{\sqrt{h+4}-2}{h}$ (e) $\lim_{x\to 2}\dfrac{x^2-2x}{x^3-8}$ (f) $\lim_{x\to\infty}\dfrac{e^x}{1-\frac1x}$.`,
          solution: r`(a) A constant: $\sqrt2$.
(b) Substitute: $4 - 10 + 4 = -2$.
(c) $\frac00$. Write $x^2 - 16 = (x-4)(x+4) = (\sqrt x - 2)(\sqrt x + 2)(x+4)$ and $4\sqrt x - 8 = 4(\sqrt x - 2)$. Cancel: $\dfrac{(\sqrt x+2)(x+4)}{4} \to \dfrac{4 \cdot 8}{4} = 8$.
(d) Conjugate: $\dfrac{(h+4)-4}{h(\sqrt{h+4}+2)} = \dfrac{1}{\sqrt{h+4}+2} \to \dfrac14$.
(e) $\dfrac{x(x-2)}{(x-2)(x^2+2x+4)} = \dfrac{x}{x^2+2x+4} \to \dfrac{2}{12} = \dfrac16$.
(f) The denominator $\to 1$ but $e^x \to \infty$, so the quotient grows without bound: there is no finite limit (it tends to $+\infty$).`,
        },
        {
          source: "Assignment 5 Q4",
          problem: r`The graph of $f$ is a straight line rising through $(0.65, 1)$ to the peak $(1, 3)$, followed by a curve falling through $(3, 1)$ (see the figure). Find $\lim_{x\to1}f(x)$.`,
          solution: r`Read the heights of the graph as $x$ gets close to 1. Coming from the left along the line, the heights approach 3; coming from the right along the falling curve, they also approach 3. The graph has no gap or jump at $x = 1$, so $\lim_{x\to1}f(x) = 3$ (which also equals $f(1)$).`,
        },
        {
          source: "Past paper Q1(b)",
          problem: r`Evaluate $\lim_{x\to\infty}\left(\sqrt{x^2-x} - x\right)$, if it exists.`,
          solution: r`Multiply and divide by the conjugate $\sqrt{x^2-x}+x$:
$$\sqrt{x^2-x}-x = \frac{(x^2-x) - x^2}{\sqrt{x^2-x}+x} = \frac{-x}{\sqrt{x^2-x}+x}.$$
Divide top and bottom by $x$ ($x > 0$, so $\sqrt{x^2-x} = x\sqrt{1-\frac1x}$): $\dfrac{-1}{\sqrt{1-\frac1x}+1} \to \dfrac{-1}{1+1} = -\dfrac12$.`,
        },
        {
          source: "Past paper Q1(d)",
          problem: r`Evaluate $\lim_{x\to 6}\left(x\sqrt{x\sqrt{x\sqrt{x\cdots}}}\right)$, if it exists.`,
          solution: r`Let $y = x\sqrt{x\sqrt{x\sqrt{x\cdots}}}$. The expression under the first square root is $y$ itself, so $y = x\sqrt{y}$.
For $y > 0$: $\sqrt y = x$, so $y = x^2$. (Check with powers: $x^{1+\frac12+\frac14+\cdots} = x^2$.)
Hence the limit is $\lim_{x\to 6}x^2 = 36$.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.6
    {
      title: "5.6 Some Basic Rules for Differentiation",
      intro: r`Using the definition $f'(x) = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h}$ $(*)$ every time is inefficient. Sections 5.6 and 5.7 give a systematic and efficient way of finding derivatives.`,
      points: [
        {
          term: "Notation",
          text: r`These are all equivalent: $f'(x) = y' = \dfrac{dy}{dx} = \dfrac{d}{dx}[f(x)]$.`,
        },
        {
          term: "Rule 1: constant",
          text: r`If $f$ is a constant function, its derivative is 0: $f'(x) = 0$. (Its graph is a horizontal line.)`,
        },
        {
          term: "Rule 2: adding a constant",
          text: r`If $A$ is a constant, then at the same value of $x$, $f(x) + A$ and $f(x)$ must have **the same slope** (the graph is only shifted up): $\dfrac{d}{dx}[f(x)+A] = \dfrac{d}{dx}[f(x)]$.`,
        },
        {
          term: "Rule 3: constant multiple",
          text: r`$\dfrac{d}{dx}[Af(x)] = A\dfrac{d}{dx}[f(x)] = Af'(x)$.`,
          eg: r`Why: $\displaystyle\lim_{h\to 0}\frac{Af(x+h)-Af(x)}{h} = A\lim_{h\to 0}\frac{f(x+h)-f(x)}{h} = Af'(x)$.`,
        },
        {
          term: "Using Rules 1–3",
          text: r`$\frac{d}{dx}[3+f(x)] = f'(x)$ (Rule 2); $\frac{d}{dx}[4f(x)] = 4f'(x)$ (Rule 3); $\frac{d}{dx}\left[\frac{f(x)+2}{3}\right] = \frac13 f'(x)$ (Rules 1, 2 and 3).`,
        },
        {
          term: "Power rule",
          text: r`$f(x) = x^a \Rightarrow f'(x) = ax^{a-1}$, where $a$ is an arbitrary constant.`,
          eg: r`$f(x) = 5x^2 \Rightarrow f'(x) = 10x^{2-1} = 10x$.`,
        },
        {
          term: "Sum / difference rule",
          text: r`If $f$ and $g$ are differentiable at $x$, so are $f + g$ and $f - g$: $F(x) = f(x) \pm g(x) \Rightarrow F'(x) = f'(x) \pm g'(x)$.`,
          eg: r`$f(x) = 3x^{1/2} + \frac{1}{100}x^{100} + 2 \Rightarrow f'(x) = \frac32 x^{-1/2} + x^{99}$.`,
        },
        {
          term: "Product rule",
          text: r`If $f$ and $g$ are differentiable at $x$, so is $F = f\times g$, and $F'(x) = f'(x)\times g(x) + f(x)\times g'(x)$.`,
        },
        {
          term: "Quotient rule",
          text: r`If $f$ and $g$ are differentiable at $x$ and $g(x) \neq 0$, then $F = \frac fg$ is differentiable at $x$ and $F'(x) = \dfrac{f'(x)g(x) - f(x)g'(x)}{(g(x))^2}$; in short $\left(\frac fg\right)' = \dfrac{f'g - fg'}{g^2}$.`,
        },
      ],
      formulas: [
        { name: "Equivalent notations", tex: r`f'(x) = y' = \frac{dy}{dx} = \frac{d}{dx}[f(x)]` },
        { name: "Rules 1–3", tex: r`\frac{d}{dx}[A] = 0,\qquad \frac{d}{dx}[f(x)+A] = f'(x),\qquad \frac{d}{dx}[Af(x)] = Af'(x)` },
        { name: "Power rule", tex: r`\frac{d}{dx}x^a = ax^{a-1}` },
        { name: "Sum / difference rule", tex: r`(f \pm g)' = f' \pm g'` },
        { name: "Product rule", tex: r`(f g)' = f'g + fg'` },
        { name: "Quotient rule", tex: r`\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2},\quad g \neq 0` },
      ],
      figures: [
        {
          title: "Rule 2: f(x) + A has the same slope as f(x)",
          xr: [-2, 2.5],
          yr: [-1, 8],
          curves: [
            { f: "x^2", label: "f(x) = x²" },
            { f: "x^2 + 2", label: "f(x) + 2", tone: 2 },
            { f: "2*x - 1", from: 0, to: 2.2, tone: 1, dashed: true },
            { f: "2*x + 1", from: 0, to: 2.2, tone: 1, dashed: true },
          ],
          points: [
            { at: [1, 1], label: "slope 2" },
            { at: [1, 3], label: "slope 2" },
          ],
          caption: "Adding the constant 2 shifts the graph up; at x = 1 both tangents have slope 2, so d/dx[f(x) + A] = f′(x).",
        },
      ],
      worked: [
        {
          source: "Lecture Note 5 exercise",
          problem: r`Compute the marginal cost, marginal revenue and marginal profit when $R(x) = bx$ and $C(x) = ax^2 + bx + c$.`,
          solution: r`$MC = C'(x) = 2ax + b$ (power rule, Rules 1 and 3). $MR = R'(x) = b$. Marginal profit $\pi'(x) = R'(x) - C'(x) = b - (2ax + b) = -2ax$.`,
        },
        {
          source: "Lecture Note 5 example",
          problem: r`Differentiate $F(x) = (x+1)(x^2+1)$ in two ways.`,
          solution: r`Method 1 (expand): $F(x) = x^3 + x^2 + x + 1$, so $F'(x) = 3x^2 + 2x + 1$.
Method 2 (product rule, $f = x+1$, $g = x^2+1$): $F'(x) = 1\times(x^2+1) + (x+1)\times 2x = x^2 + 1 + 2x^2 + 2x = 3x^2 + 2x + 1$.`,
        },
        {
          source: "Lecture Note 5 exercise",
          problem: r`$F(x) = \dfrac{3x-5}{x-2}$. Find $F'(x)$. What is the slope of $F$ at $x = 3$?`,
          solution: r`Quotient rule with $f = 3x - 5$, $f' = 3$, $g = x - 2$, $g' = 1$:
$$F'(x) = \frac{3(x-2) - (3x-5)(1)}{(x-2)^2} = \frac{-1}{(x-2)^2}.$$
At $x = 3$: $F'(3) = -1/1 = -1$.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.7
    {
      title: "5.7 Chain Rule",
      points: [
        {
          term: "Composite function",
          text: r`If $y$ is a function of $u$ and $u$ is a function of $x$, then $y$ is a **composite function** of $x$.`,
        },
        {
          term: "Chain reaction",
          text: r`A change in $x$ changes $u$, which in turn changes $y$: $x \to u \to y$. The change in $u$ due to $x$ is $\frac{du}{dx}$; the change in $y$ due to $u$ is $\frac{dy}{du}$.`,
        },
        {
          term: "Chain rule",
          text: r`$\dfrac{dy}{dx} = \dfrac{dy}{du}\times\dfrac{du}{dx}$.`,
          eg: r`$y = u^5$, $u = 1 - x^3$: $\frac{dy}{dx} = 5u^4 \times (0 - 3x^2) = -15x^2u^4 = -15x^2(1-x^3)^4$.`,
        },
        {
          term: "Alternative formulation",
          text: r`If $g$ is differentiable at $x_0$ and $f$ is differentiable at $u_0 = g(x_0)$, then $F(x) = f(g(x))$ is differentiable at $x_0$ and $F'(x_0) = f'(u_0)g'(x_0) = f'(g(x_0))\times g'(x_0)$: derivative of the outside (evaluated at the inside) times derivative of the inside.`,
        },
      ],
      formulas: [
        { name: "Chain rule", tex: r`\frac{dy}{dx} = \frac{dy}{du}\times\frac{du}{dx}` },
        { name: "Chain rule (alternative form)", tex: r`F(x) = f(g(x)) \;\Rightarrow\; F'(x_0) = f'(g(x_0))\, g'(x_0)` },
      ],
      worked: [
        {
          source: "Lecture Note 5 example / exercise",
          problem: r`Differentiate $y = (x^2+1)^{10}$.`,
          solution: r`Let $u = x^2 + 1$, $y = u^{10}$. Then $\frac{dy}{du} = 10u^9$ and $\frac{du}{dx} = 2x$, so
$$\frac{dy}{dx} = 10(x^2+1)^9 \times 2x = 20x(x^2+1)^9.$$`,
        },
        {
          source: "Lecture Note 5 exercise",
          problem: r`Differentiate $y = \left(\dfrac{x+1}{x}\right)^2$.`,
          solution: r`Outside: $u^2$ with $u = \frac{x+1}{x}$. Inside (quotient rule): $u' = \dfrac{1\cdot x - (x+1)\cdot 1}{x^2} = -\dfrac{1}{x^2}$.
$$\frac{dy}{dx} = 2\left(\frac{x+1}{x}\right)\times\left(-\frac{1}{x^2}\right) = -\frac{2(x+1)}{x^3}.$$`,
        },
        {
          source: "Assignment 6 Q2(f)",
          problem: r`Find $\dfrac{dy}{dx}$ for $y = \left(\dfrac{x+1}{\sqrt{x^2+4}}\right)^3 + 5$.`,
          solution: r`Let $u = \dfrac{x+1}{\sqrt{x^2+4}}$, so $y = u^3 + 5$ and $\frac{dy}{dx} = 3u^2 u'$.
Quotient rule, using $\frac{d}{dx}\sqrt{x^2+4} = \frac{x}{\sqrt{x^2+4}}$ (chain rule):
$$u' = \frac{\sqrt{x^2+4} - (x+1)\frac{x}{\sqrt{x^2+4}}}{x^2+4} = \frac{(x^2+4) - x^2 - x}{(x^2+4)^{3/2}} = \frac{4-x}{(x^2+4)^{3/2}}.$$
So $\dfrac{dy}{dx} = 3\dfrac{(x+1)^2}{x^2+4}\cdot\dfrac{4-x}{(x^2+4)^{3/2}} = \dfrac{3(x+1)^2(4-x)}{(x^2+4)^{5/2}}$.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.8
    {
      title: "5.8 Higher Derivatives",
      points: [
        {
          term: "First derivative",
          text: r`The derivative $f'$ of $f$ is often called the first derivative. If $f'$ is also differentiable, we can differentiate it again.`,
        },
        {
          term: "Second derivative",
          text: r`The derivative of $f'$ is the **second derivative** $(f')' = f''$; $f''(x)$ is the second derivative evaluated at a particular point $x$.`,
          eg: r`$f(x) = 2x^5 - 3x^3 + 2x$: $f' = 10x^4 - 9x^2 + 2$, $f'' = 40x^3 - 18x$, and the third derivative $f''' = 120x^2 - 18$.`,
        },
        {
          term: "Notation",
          text: r`$\dfrac{d^2y}{dx^2} = (y')' = f''(x) = \dfrac{d^2f(x)}{dx^2} = \dfrac{df'(x)}{dx}$. More generally the $n$th derivative is $\dfrac{d^ny}{dx^n} = f^{(n)}(x)$: differentiate $f(x)$ $n$ times.`,
        },
        {
          term: "If f″ ≥ 0",
          text: r`$f'$ is **increasing** (the slope gets steeper). If $f'' \ge 0$ for all $x$, $f$ is a **convex** function.`,
        },
        {
          term: "If f″ ≤ 0",
          text: r`$f'$ is **decreasing** (the slope gets flatter / more negative). If $f'' \le 0$ for all $x$, $f$ is a **concave** function.`,
        },
        {
          term: "If f″ = 0",
          text: r`$f'$ is **constant**. If $f'' = 0$ for all $x$ (a straight line), $f$ is both a concave and a convex function.`,
        },
        {
          term: "Why it matters",
          text: r`The distinction between convexity and concavity is absolutely important in many economic models. The sign of $f'$ says whether $f$ rises or falls; the sign of $f''$ says whether it does so at an increasing or a decreasing rate.`,
        },
      ],
      formulas: [
        { name: "Second derivative", tex: r`f''(x) = \frac{d^2y}{dx^2} = \frac{d}{dx}\big(f'(x)\big)` },
        { name: "nth derivative", tex: r`\frac{d^ny}{dx^n} = f^{(n)}(x)` },
      ],
      table: [
        ["", "$f'' \\ge 0$ (convex)", "$f'' \\le 0$ (concave)"],
        ["$f' \\ge 0$", "increasing, convex (faster and faster)", "increasing, concave (rising at a slower rate)"],
        ["$f' \\le 0$", "decreasing, convex (falling more slowly)", "decreasing, concave (falling faster and faster)"],
      ],
      figures: [
        {
          title: "Increasing: convex vs concave",
          xr: [0, 4],
          yr: [0, 6.5],
          curves: [
            { f: "exp(x/2) - 1", label: "convex (f″ ≥ 0)", tone: 0 },
            { f: "2*sqrt(x)", label: "concave (f″ ≤ 0)", tone: 1 },
          ],
          caption: "Both rise (f′ > 0). The convex one rises faster and faster; the concave one rises at a slower and slower rate.",
        },
        {
          title: "Decreasing: convex vs concave",
          xr: [0, 4],
          yr: [0, 4.5],
          curves: [
            { f: "4*exp(-x)", label: "convex (f″ ≥ 0)", tone: 0 },
            { f: "4 - x^2/4", label: "concave (f″ ≤ 0)", tone: 1 },
          ],
          caption: "Both fall (f′ < 0). The convex one levels off; the concave one falls more and more steeply.",
        },
        {
          x: "t",
          y: "P(t)",
          title: "Prices still increasing but at a slower rate",
          xr: [0, 6],
          yr: [3, 10.5],
          curves: [{ f: "10 - 6*exp(-0.5*x)", label: "P(t)" }],
          segments: [
            { from: [0, 4.5412], to: [2, 8.1804], tone: 1, dashed: true, label: "steep: P′ large" },
            { from: [3, 8.782], to: [5, 9.594], tone: 1, dashed: true, label: "flatter: P′ small, still > 0" },
          ],
          points: [
            { at: [1, 6.3608] },
            { at: [4, 9.188] },
          ],
          caption: "Assignment 6 Q3: P′(t) > 0 (still increasing) and P″(t) < 0 (the slope is falling), so P is increasing and concave.",
        },
      ],
      worked: [
        {
          source: "Assignment 6 Q3 (previous final exam question)",
          problem: r`A property report says: "Private residential property prices in Singapore are still increasing but at a slower rate." If $P(t)$ is the average price at time $t$, translate the statement into a statement on the sign of a certain derivative and draw a diagram.`,
          solution: r`"Still increasing": $P'(t) > 0$.
"At a slower rate": the rate of increase $P'(t)$ is itself falling, so $\dfrac{d}{dt}P'(t) = P''(t) < 0$.
Diagram: an upward-sloping curve that becomes flatter over time (increasing and concave), as in the figure above.`,
        },
      ],
    },

    // ------------------------------------------------------------------ 5.9
    {
      title: "5.9 Rules for Differentiation of Exponential and Logarithmic Functions",
      points: [
        {
          term: "Natural exponential function",
          text: r`$f(x) = e^x$ has the unique property that its derivative equals the function itself: $f' = e^x$, and every higher derivative is also $e^x$: $f^{(n)} = e^x$ for $n = 1, 2, 3, \dots$ This is a key reason why it is used so often.`,
        },
        {
          term: "e to a function",
          text: r`If $f(x) = e^{g(x)}$ then $f' = e^{g(x)}\times g'(x)$.`,
          eg: r`Why: let $u = g(x)$ and $y = e^u$; the chain reaction $x \to u \to y$ gives $\frac{dy}{dx} = \frac{dy}{du}\times\frac{du}{dx} = e^{u}\, g'(x)$. Example: $f(x) = e^{2x} \Rightarrow f' = 2e^{2x}$.`,
        },
        {
          term: "Natural logarithm",
          text: r`$g(x) = \ln x$ is the inverse of $e^x$: by definition $x = e^{\ln x}$. The inverse exists because $x$ and $g(x)\,(= y)$ are one-to-one.`,
        },
        {
          term: "Deriving (ln x)′",
          text: r`Differentiate both sides of $x = e^{g(x)}$ with respect to $x$: $\dfrac{dx}{dx} = 1$ and $\dfrac{d}{dx}e^{g(x)} = e^{g(x)}g'(x) = xg'(x)$. So $1 = xg'(x)$, i.e. $g'(x) = \dfrac1x$.`,
        },
        {
          term: "ln of a function",
          text: r`If $y = \ln h(x)$ then $\dfrac{dy}{dx} = \dfrac{h'(x)}{h(x)}$ (derivative of the inside **on top**).`,
          eg: r`$y = \ln(x^2+1) \Rightarrow \dfrac{dy}{dx} = \dfrac{2x}{x^2+1}$.`,
        },
        {
          term: "Simplify logs first",
          text: r`Using the log rules $\ln(AB) = \ln A + \ln B$, $\ln\frac AB = \ln A - \ln B$, $\ln A^p = p\ln A$ before differentiating saves a lot of work.`,
        },
        {
          term: "Powers with a variable exponent",
          text: r`Write a positive constant base as a power of $e$: $a^x = e^{x\ln a}$. Then use the $e^{g(x)}$ rule.`,
          eg: r`$y = a^x b^{x^2} = e^{x\ln a + x^2\ln b} \Rightarrow y' = a^x b^{x^2}(\ln a + 2x\ln b)$.`,
        },
      ],
      formulas: [
        { name: "Derivative of e^x", tex: r`\frac{d}{dx}e^x = e^x` },
        { name: "Derivative of e^{g(x)}", tex: r`\frac{d}{dx}e^{g(x)} = e^{g(x)}\,g'(x)` },
        { name: "Derivative of ln x", tex: r`\frac{d}{dx}\ln x = \frac{1}{x}` },
        { name: "Derivative of ln h(x)", tex: r`\frac{d}{dx}\ln h(x) = \frac{h'(x)}{h(x)}` },
      ],
      figures: [
        {
          title: "e^x and its tangent at x = 0",
          xr: [-2, 2],
          yr: [-0.5, 6],
          curves: [
            { f: "exp(x)", label: "y = eˣ" },
            { f: "x + 1", label: "tangent y = x + 1", tone: 1, dashed: true },
          ],
          points: [{ at: [0, 1], label: "(0, 1): slope e⁰ = 1" }],
          caption: "The slope of eˣ at any point equals its height; at x = 0 both are 1.",
        },
        {
          title: "ln x and its tangent at x = 2",
          xr: [0, 5],
          yr: [-2, 2],
          curves: [
            { f: "ln(x)", label: "g(x) = ln x" },
            { f: "ln(2) + (x-2)/2", label: "slope 1/2", tone: 1, dashed: true, from: 0.3, to: 5 },
          ],
          points: [{ at: [2, 0.6931], label: "(2, ln 2)" }],
          caption: "g′(x) = 1/x, so the slope at x = 2 is 1/2. The slope gets smaller as x grows (ln x is increasing and concave).",
        },
      ],
      worked: [
        {
          source: "Lecture Note 5 example",
          problem: r`Find the derivatives of $f(x) = e^{2x}$ and $y = \ln(x^2+1)$.`,
          solution: r`$f(x) = e^{g(x)}$ with $g(x) = 2x$: $f' = e^{2x}\times 2 = 2e^{2x}$.
$y = \ln h(x)$ with $h(x) = x^2+1$: $\dfrac{dy}{dx} = \dfrac{h'(x)}{h(x)} = \dfrac{2x}{x^2+1}$.`,
        },
        {
          source: "Lecture Note 5 exercise / Assignment 6 Q2(g)",
          problem: r`Find the first derivative of $y = A^xB^{x^2}$, where $A$ and $B$ are positive constants.`,
          solution: r`$A^x = e^{x\ln A}$ and $B^{x^2} = e^{x^2\ln B}$, so $y = e^{x\ln A + x^2\ln B}$.
By the $e^{g(x)}$ rule with $g(x) = x\ln A + x^2\ln B$, $g'(x) = \ln A + 2x\ln B$:
$$\frac{dy}{dx} = A^xB^{x^2}\left(\ln A + 2x\ln B\right).$$`,
        },
        {
          source: "Assignment 6 Q2(a)–(c)",
          problem: r`Find $\dfrac{dy}{dx}$: (a) $y = e^{\sqrt[3]{x}}$ (b) $y = e^{2x} + \sqrt{5 - \sqrt{4 - x^3}}$ (c) $y = \ln(x^2 + e^x)$.`,
          solution: r`(a) $g(x) = x^{1/3}$, $g'(x) = \frac13 x^{-2/3}$: $\dfrac{dy}{dx} = \dfrac{e^{\sqrt[3]{x}}}{3x^{2/3}}$.
(b) $\frac{d}{dx}e^{2x} = 2e^{2x}$. For the root use the chain rule twice: $\frac{d}{dx}\sqrt{4-x^3} = \frac{-3x^2}{2\sqrt{4-x^3}}$, so
$$\frac{d}{dx}\sqrt{5-\sqrt{4-x^3}} = \frac{1}{2\sqrt{5-\sqrt{4-x^3}}}\cdot\frac{3x^2}{2\sqrt{4-x^3}}.$$
$\dfrac{dy}{dx} = 2e^{2x} + \dfrac{3x^2}{4\sqrt{4-x^3}\,\sqrt{5-\sqrt{4-x^3}}}$.
(c) $\dfrac{dy}{dx} = \dfrac{2x + e^x}{x^2 + e^x}$.`,
        },
        {
          source: "Assignment 6 Q2(d)–(e)",
          problem: r`Find $\dfrac{dy}{dx}$: (d) $y = \ln\left(\dfrac{x^4+6}{x-10}\right)^{1/4}$ (e) $y = \sqrt{x}\,e^{2x}$.`,
          solution: r`(d) Simplify first: $y = \frac14\left[\ln(x^4+6) - \ln(x-10)\right]$, so
$$\frac{dy}{dx} = \frac14\left[\frac{4x^3}{x^4+6} - \frac{1}{x-10}\right] = \frac{x^3}{x^4+6} - \frac{1}{4(x-10)}.$$
(e) Product rule: $\dfrac{dy}{dx} = \dfrac{1}{2\sqrt x}e^{2x} + \sqrt x\cdot 2e^{2x} = \dfrac{e^{2x}(1+4x)}{2\sqrt x}$.`,
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "differentiation-c1", type: "concept", front: r`The straight line through two points $P$ and $Q$ on a curve.`, back: "secant", why: r`Its slope is $\frac{f(a+h)-f(a)}{h}$; letting $Q$ slide to $P$ turns it into the tangent.` },
    { id: "differentiation-c2", type: "concept", front: r`The limiting straight line $PT$ obtained by keeping $P$ fixed and letting $Q$ move along the curve to $P$.`, back: "tangent", why: r`The slope of the tangent at $x = a$ is the derivative $f'(a)$.` },
    { id: "differentiation-c3", type: "concept", front: r`The slope of the tangent to $y = f(x)$ at $x = a$, written $f'(a)$.`, back: "derivative", why: r`Defined as $f'(a) = \lim_{h\to 0}\frac{f(a+h)-f(a)}{h}$.` },
    { id: "differentiation-c4", type: "concept", front: r`$f(x_2) \ge f(x_1)$ whenever $x_2 > x_1$ in $I$.`, back: "increasing", why: r`With $\ge$ flat pieces are allowed; with $>$ it is strictly increasing.` },
    { id: "differentiation-c5", type: "concept", front: r`$f(x_2) > f(x_1)$ whenever $x_2 > x_1$ in $I$.`, back: "strictly increasing", why: r`Strict inequality: no flat pieces allowed.` },
    { id: "differentiation-c7", type: "concept", front: r`$C'(x)$: the extra cost of producing an additional very small unit of the product.`, back: "marginal cost", why: r`$C'(x) = \lim_{h\to 0}\frac{C(x+h)-C(x)}{h} \approx \frac{C(x+h)-C(x)}{h}$ for small $h$.` },
    { id: "differentiation-c8", type: "concept", front: r`$R'(x)$, the derivative of the revenue function.`, back: "marginal revenue", why: r`$MR = R'(x)$: the approximate extra revenue from selling one more unit.` },
    { id: "differentiation-c9", type: "concept", front: r`$\pi'(x) = R'(x) - C'(x)$.`, back: "marginal profit", why: r`Profit is $\pi(x) = R(x) - C(x)$, so its derivative is MR minus MC.` },
    { id: "differentiation-c10", type: "concept", front: r`$y$ is a function of $u$ and $u$ is a function of $x$; then $y$ is a … of $x$.`, back: "composite function", why: r`Differentiate it with the chain rule $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$.` },
    { id: "differentiation-c11", type: "concept", front: r`A function with $f''(x) \ge 0$ for all $x$.`, back: "convex", why: r`$f'' \ge 0$ means $f'$ is increasing: the slope keeps getting steeper.` },
    { id: "differentiation-c12", type: "concept", front: r`A function with $f''(x) \le 0$ for all $x$.`, back: "concave", why: r`$f'' \le 0$ means $f'$ is decreasing: e.g. rising at a slower and slower rate.` },
    { id: "differentiation-c13", type: "concept", front: r`The function whose derivative is equal to the function itself.`, back: "natural exponential function", why: r`$\frac{d}{dx}e^x = e^x$, and every higher derivative is $e^x$ too.` },
    { id: "differentiation-c14", type: "concept", front: r`The inverse function of $e^x$, defined by $x = e^{\ln x}$.`, back: "natural logarithm", why: r`$\ln x$; its derivative is $\frac1x$.` },

    // formula
    { id: "differentiation-c15", type: "formula", front: "Definition of the derivative", back: r`$f'(a) = \displaystyle\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}$`, why: r`Use it whenever a question says "use the definition of the derivative" (e.g. past paper Q2(b)).` },
    { id: "differentiation-c16", type: "formula", front: "Power rule", back: r`$\frac{d}{dx}x^a = ax^{a-1}$ for any constant $a$`, why: r`Works for fractional and negative powers too: $\frac{d}{dx}x^{1/2} = \frac12x^{-1/2}$.` },
    { id: "differentiation-c17", type: "formula", front: "Rules 1–3 (constants)", back: r`$\frac{d}{dx}A = 0$, $\ \frac{d}{dx}[f+A] = f'$, $\ \frac{d}{dx}[Af] = Af'$`, why: r`A constant added disappears (same slope); a constant factor stays in front.` },
    { id: "differentiation-c18", type: "formula", front: "Sum / difference rule", back: r`$(f \pm g)' = f' \pm g'$`, why: r`Differentiate term by term.` },
    { id: "differentiation-c19", type: "formula", front: "Product rule", back: r`$(fg)' = f'g + fg'$`, why: r`Use for products such as $\sqrt x\,e^{2x}$ or $(x+1)(x^2+1)$.` },
    { id: "differentiation-c20", type: "formula", front: "Quotient rule", back: r`$\left(\frac fg\right)' = \dfrac{f'g - fg'}{g^2}$, $g \neq 0$`, why: r`Order matters in the numerator: derivative of the top first, then minus.` },
    { id: "differentiation-c21", type: "formula", front: "Chain rule", back: r`$\dfrac{dy}{dx} = \dfrac{dy}{du}\times\dfrac{du}{dx}$, or $[f(g(x))]' = f'(g(x))\,g'(x)$`, why: r`For any function of a function: powers of brackets, roots of expressions, $e^{g(x)}$, $\ln h(x)$.` },
    { id: "differentiation-c22", type: "formula", front: r`Derivative of $e^{g(x)}$`, back: r`$e^{g(x)}\,g'(x)$`, why: r`Chain rule with $y = e^u$, $u = g(x)$. E.g. $(e^{2x})' = 2e^{2x}$.` },
    { id: "differentiation-c23", type: "formula", front: r`Derivative of $\ln h(x)$`, back: r`$\dfrac{h'(x)}{h(x)}$`, why: r`Special case $(\ln x)' = \frac1x$. Derivative of the inside goes on TOP.` },
    { id: "differentiation-c24", type: "formula", front: "Limit rules (i)–(iv)", back: r`limits of $f\pm g$, $fg$, $f/g$, $f^r$ are $A\pm B$, $AB$, $A/B$ ($B\neq 0$), $A^r$`, why: r`Valid when $\lim f = A$ and $\lim g = B$ exist; the quotient rule needs $B \neq 0$ (otherwise factor or use the conjugate first).` },

    // method
    { id: "differentiation-c25", type: "method", front: r`How do you find $f'(a)$ from the definition?`, back: r`Compute $f(a+h)$, then $f(a+h)-f(a)$, divide by $h$ and simplify, then let $h\to0$.`, why: r`1. Add $h$ and compute $f(a+h)$.
2. Compute $f(a+h) - f(a)$.
3. Form $\frac{f(a+h)-f(a)}{h}$ and simplify until the $h$ in the denominator cancels.
4. Take the limit $h \to 0$.` },
    { id: "differentiation-c26", type: "method", front: r`Use the definition of the derivative to find $R'(P)$ for $R(P) = \dfrac5P$. (Past paper Q2(b))`, back: r`$R'(P) = -\dfrac{5}{P^2}$`, why: r`$\frac5{P+h} - \frac5P = \frac{5P - 5P - 5h}{P(P+h)} = \frac{-5h}{P(P+h)}$. Divide by $h$: $\frac{-5}{P(P+h)}$. Let $h \to 0$: $-\frac5{P^2}$.` },
    { id: "differentiation-c27", type: "method", front: r`Use the definition to find the slope of $f(x) = x^2$ at $x = a$.`, back: r`$f'(a) = 2a$`, why: r`$(a+h)^2 - a^2 = 2ah + h^2$; divide by $h$: $2a + h$; let $h\to 0$: $2a$.` },
    { id: "differentiation-c28", type: "method", front: r`Use the definition to show $\frac{d}{dx}\sqrt x = \frac{1}{2\sqrt x}$.`, back: r`Multiply the difference quotient by the conjugate $\sqrt{x+h}+\sqrt x$, cancel $h$, let $h \to 0$.`, why: r`$\frac{\sqrt{x+h}-\sqrt x}{h}\cdot\frac{\sqrt{x+h}+\sqrt x}{\sqrt{x+h}+\sqrt x} = \frac{h}{h(\sqrt{x+h}+\sqrt x)} = \frac{1}{\sqrt{x+h}+\sqrt x} \to \frac{1}{2\sqrt x}$.` },
    { id: "differentiation-c29", type: "method", front: r`A limit gives $\frac00$ and top and bottom are polynomials, e.g. $\lim_{x\to2}\frac{3x^2+3x-18}{x-2}$.`, back: r`Factor out $(x-2)$, cancel, then substitute: answer 15.`, why: r`$3x^2+3x-18 = 3(x+3)(x-2)$. Cancelling $(x-2)$ is allowed because $x \neq 2$ near the limit point. $3(2+3) = 15$.` },
    { id: "differentiation-c30", type: "method", front: r`A $\frac00$ limit with a square root, e.g. $\lim_{h\to0}\frac{\sqrt{h+4}-2}{h}$.`, back: r`Multiply top and bottom by the conjugate $\sqrt{h+4}+2$: answer $\frac14$.`, why: r`$\frac{(h+4)-4}{h(\sqrt{h+4}+2)} = \frac{1}{\sqrt{h+4}+2} \to \frac{1}{2+2} = \frac14$.` },
    { id: "differentiation-c31", type: "method", front: r`Evaluate $\lim_{x\to4}\dfrac{x^2-16}{4\sqrt x-8}$. (Assignment 5 Q3(c))`, back: r`Factor $x-4 = (\sqrt x-2)(\sqrt x+2)$ and cancel $\sqrt x - 2$: answer 8.`, why: r`$x^2-16 = (\sqrt x-2)(\sqrt x+2)(x+4)$, $4\sqrt x - 8 = 4(\sqrt x-2)$. Limit $= \frac{(2+2)(4+4)}{4} = 8$.` },
    { id: "differentiation-c32", type: "method", front: r`Evaluate $\lim_{x\to\infty}\left(\sqrt{x^2-x}-x\right)$. (Past paper Q1(b))`, back: r`Multiply by the conjugate, then divide by $x$: answer $-\frac12$.`, why: r`$\sqrt{x^2-x}-x = \frac{-x}{\sqrt{x^2-x}+x} = \frac{-1}{\sqrt{1-1/x}+1} \to -\frac12$.` },
    { id: "differentiation-c33", type: "method", front: r`Evaluate $\lim_{x\to6}x\sqrt{x\sqrt{x\sqrt{x\cdots}}}$. (Past paper Q1(d))`, back: r`Let $y$ be the expression: $y = x\sqrt y$, so $y = x^2$; answer 36.`, why: r`The part under the first root is the whole expression again. $y = x\sqrt y \Rightarrow \sqrt y = x \Rightarrow y = x^2$ (for $y>0$). Then $\lim_{x\to6}x^2 = 36$. Check: $x^{1+\frac12+\frac14+\cdots} = x^2$.` },
    { id: "differentiation-c34", type: "method", front: r`Evaluate $\lim_{x\to\infty}\dfrac{e^x}{1-\frac1x}$. (Assignment 5 Q3(f))`, back: r`The denominator tends to 1 but $e^x \to \infty$: no finite limit (it tends to $+\infty$).`, why: r`$\frac1x \to 0$ so the denominator $\to 1$, while the numerator grows without bound. The quotient rule for limits does not apply because the numerator has no finite limit.` },
    { id: "differentiation-c35", type: "method", front: r`Given $R(x)$ and $C(x)$, find marginal cost, marginal revenue and marginal profit.`, back: r`$MC = C'(x)$, $MR = R'(x)$, marginal profit $= R'(x) - C'(x)$.`, why: r`E.g. $R = bx$, $C = ax^2+bx+c$: $MC = 2ax + b$, $MR = b$, $\pi'(x) = -2ax$. If asked to "use the definition", compute each with $\lim_{h\to0}$ instead.` },
    { id: "differentiation-c36", type: "method", front: r`$TC(Q) = 2Q^3-18Q^2+60Q+250$: find the variable cost and its derivative. (Assignment 7 Q1)`, back: r`$VC = 2Q^3-18Q^2+60Q$; $VC' = 6Q^2-36Q+60$ = marginal cost.`, why: r`Fixed cost $= TC(0) = 250$ is dropped. $VC'(Q)$ is the extra cost of one more unit; it equals $TC'(Q)$ since fixed cost does not vary with $Q$.` },
    { id: "differentiation-c37", type: "method", front: r`Find where $TR$ is increasing / decreasing for $P = 6 - \frac12Q$. (Assignment 7 Q3)`, back: r`$TR = 6Q - \frac12Q^2$, $MR = 6 - Q$: increasing on $0 \le Q \le 6$, decreasing on $6 \le Q \le 12$; max at $Q = 6$.`, why: r`TR is increasing where its derivative MR $\ge 0$ and decreasing where MR $\le 0$. The switch happens at MR = 0, $Q = 6$, where $TR = 18$.` },
    { id: "differentiation-c38", type: "method", front: r`"Prices are still increasing but at a slower rate." Translate into derivatives. (Assignment 6 Q3)`, back: r`$P'(t) > 0$ and $P''(t) < 0$: increasing and concave.`, why: r`"Increasing" is the sign of the first derivative. "At a slower rate" means the rate $P'(t)$ is falling, i.e. its derivative $P''(t)$ is negative. Sketch: a rising curve that flattens out.` },
    { id: "differentiation-c39", type: "method", front: r`Differentiate $y = \ln\left(\dfrac{x^4+6}{x-10}\right)^{1/4}$. (Assignment 6 Q2(d))`, back: r`Use log rules first: $y = \frac14[\ln(x^4+6) - \ln(x-10)]$, so $y' = \frac{x^3}{x^4+6} - \frac{1}{4(x-10)}$.`, why: r`$\ln A^{1/4} = \frac14\ln A$ and $\ln\frac AB = \ln A - \ln B$. Then $(\ln h)' = \frac{h'}{h}$ term by term: $\frac14\cdot\frac{4x^3}{x^4+6} - \frac14\cdot\frac{1}{x-10}$.` },
    { id: "differentiation-c40", type: "method", front: r`Differentiate $y = A^xB^{x^2}$ ($A, B > 0$). (Assignment 6 Q2(g))`, back: r`Rewrite as $e^{x\ln A + x^2\ln B}$: $y' = A^xB^{x^2}(\ln A + 2x\ln B)$.`, why: r`$A^x = e^{x\ln A}$, $B^{x^2} = e^{x^2\ln B}$. Then $(e^{g})' = e^{g}g'$ with $g' = \ln A + 2x\ln B$.` },
    { id: "differentiation-c41", type: "method", front: r`Differentiate $y = \left(\dfrac{x+1}{\sqrt{x^2+4}}\right)^3 + 5$. (Assignment 6 Q2(f))`, back: r`Chain rule outside, quotient rule inside: $y' = \dfrac{3(x+1)^2(4-x)}{(x^2+4)^{5/2}}$.`, why: r`$u = \frac{x+1}{\sqrt{x^2+4}}$, $u' = \frac{(x^2+4) - x(x+1)}{(x^2+4)^{3/2}} = \frac{4-x}{(x^2+4)^{3/2}}$. Then $y' = 3u^2u'$.` },
    { id: "differentiation-c42", type: "method", front: r`Show that $\frac{d}{dx}\ln x = \frac1x$ using $x = e^{\ln x}$.`, back: r`Differentiate both sides of $x = e^{g(x)}$: $1 = e^{g(x)}g'(x) = xg'(x)$, so $g'(x) = \frac1x$.`, why: r`Left side: $\frac{dx}{dx} = 1$. Right side by the $e^{g(x)}$ rule: $e^{g(x)}g'(x)$, and $e^{g(x)} = e^{\ln x} = x$.` },
    { id: "differentiation-c43", type: "method", front: r`Find $\lim_{x\to a}f(x)$ from a graph. (Assignment 5 Q4)`, back: r`Follow the graph towards $x = a$ from both sides and read the height it approaches (e.g. 3 at the peak $(1, 3)$).`, why: r`The limit is the value $f(x)$ gets close to as $x$ gets close to $a$; it does not need $f(a)$. If both sides head to the same height, that height is the limit. In Assignment 5 Q4 the line rises to $(1, 3)$ and the curve falls from it, so $\lim_{x\to1}f(x) = 3$.` },
    { id: "differentiation-c44", type: "method", front: r`Prove the product rule $(fg)' = f'g + fg'$ from the definition. (Assignment 5 Q5(d))`, back: r`Add and subtract $f(x+h)g(x)$ in the numerator, split into two quotients, take limits.`, why: r`$f(x+h)g(x+h) - f(x)g(x) = f(x+h)[g(x+h)-g(x)] + g(x)[f(x+h)-f(x)]$. Divide by $h$. As $h\to0$: $f(x+h) \to f(x)$ (because $f(x+h)-f(x) = h\cdot\frac{f(x+h)-f(x)}{h} \to 0\cdot f'(x) = 0$), so the limit is $f(x)g'(x) + g(x)f'(x)$.` },
    { id: "differentiation-c45", type: "method", front: r`Use the definition to show that $f(x) = ax^2 + bx + c$ has $f'(x) = 2ax + b$. (Assignment 5 Q6)`, back: r`$f(x+h) - f(x) = 2axh + ah^2 + bh$; divide by $h$: $2ax + ah + b \to 2ax + b$.`, why: r`Expand $a(x+h)^2 = ax^2 + 2axh + ah^2$; the $ax^2$, $bx$ and $c$ cancel. Then $f'(x) = 0$ at $x = -\frac{b}{2a}$. With $a, b, c = 2, 4, 10$: slope at $(-1, 8)$ is $4(-1) + 4 = 0$.` },
    { id: "differentiation-c46", type: "method", front: r`Find $MP_L = \frac{dQ}{dL}$ for $Q = 16\sqrt L - L$ at $L = 1, 4, 9, 16$. (Assignment 7 Q4)`, back: r`$MP_L = \frac{8}{\sqrt L} - 1$: 7, 3, 5/3, 1. Positive but falling.`, why: r`Power rule: $\frac{d}{dL}16L^{1/2} = 8L^{-1/2}$. Each extra worker adds output, but less and less as $L$ grows (diminishing marginal product of labour).` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 5.1–5.2
    {
      id: "differentiation-q1", kind: "mcq", sub: "Slope of curves",
      prompt: r`Geometrically, $f'(a)$ is…`,
      options: [r`the slope of the tangent to $y = f(x)$ at $x = a$`, r`the height of the graph at $x = a$`, r`the slope of the line from the origin to $(a, f(a))$`, r`the area under the graph up to $x = a$`],
      answer: 0,
      explain: r`The derivative of $f$ at $a$ is defined as the slope of the tangent to the graph at $P = (a, f(a))$. The height is $f(a)$, not $f'(a)$.`,
    },
    {
      id: "differentiation-q2", kind: "mcq", sub: "Secant and tangent",
      prompt: r`The straight line through two points $P$ and $Q$ on a curve is called a…`,
      options: ["tangent", "secant", "normal", "asymptote"],
      answer: 1,
      explain: r`A line through two points of the curve is a **secant**. Letting $Q$ slide along the curve to $P$ turns the secants into the **tangent** at $P$.`,
    },
    {
      id: "differentiation-q3", kind: "mcq", sub: "Definition of the derivative",
      prompt: r`Which formula is the definition of the derivative of $f$ at $a$?`,
      options: [
        r`$\displaystyle\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$`,
        r`$\displaystyle\lim_{h\to0}\frac{f(a+h)-f(a)}{a}$`,
        r`$\displaystyle\lim_{h\to\infty}\frac{f(a+h)-f(a)}{h}$`,
        r`$\displaystyle\lim_{h\to0}\frac{f(a+h)+f(a)}{h}$`,
      ],
      answer: 0,
      explain: r`The secant through $(a, f(a))$ and $(a+h, f(a+h))$ has slope $\frac{f(a+h)-f(a)}{(a+h)-a} = \frac{f(a+h)-f(a)}{h}$; the tangent slope is its limit as $h \to 0$ (Q slides to P), not as $h \to \infty$.`,
    },
    {
      id: "differentiation-q4", kind: "fill", sub: "Secant slopes",
      prompt: r`For $f(x) = x^2$, the secant through $x = 1$ and $x = 1 + h$ has slope $2 + h$. With $h = 0.5$ the secant slope is ____.`,
      answers: [["2.5", "5/2"]],
      explain: r`$\frac{(1.5)^2 - 1^2}{0.5} = \frac{2.25 - 1}{0.5} = 2.5 = 2 + 0.5$. As $h \to 0$ this tends to the tangent slope $f'(1) = 2$.`,
    },
    {
      id: "differentiation-q5", kind: "mcq", sub: "Definition of the derivative",
      prompt: r`For $f(x) = x^2$, the difference $f(a+h) - f(a)$ simplifies to…`,
      options: [r`$2ah + h^2$`, r`$h^2$`, r`$2a + h$`, r`$2ah$`],
      answer: 0,
      explain: r`$(a+h)^2 - a^2 = a^2 + 2ah + h^2 - a^2 = 2ah + h^2$. Dividing by $h$ gives $2a + h$ (option C is the quotient, not the difference), and the limit is $2a$.`,
    },
    {
      id: "differentiation-q6", kind: "fill", sub: "Definition of the derivative",
      prompt: r`Using the definition, the slope of $f(x) = x^2$ at $x = 3$ is ____.`,
      answers: [["6"]],
      explain: r`$\frac{(3+h)^2 - 9}{h} = \frac{6h + h^2}{h} = 6 + h \to 6$. (In general $f'(a) = 2a$.)`,
    },
    {
      id: "differentiation-q7", kind: "mcq", sub: "Definition of the derivative",
      prompt: r`For $R(P) = \dfrac5P$, the difference quotient $\dfrac{R(P+h) - R(P)}{h}$ simplifies to…`,
      options: [r`$\dfrac{-5}{P(P+h)}$`, r`$\dfrac{5}{P(P+h)}$`, r`$\dfrac{-5}{h\,P(P+h)}$`, r`$-\dfrac{5}{P^2}$`],
      answer: 0,
      explain: r`$\frac{5}{P+h} - \frac5P = \frac{5P - 5(P+h)}{P(P+h)} = \frac{-5h}{P(P+h)}$; divide by $h$: $\frac{-5}{P(P+h)}$. Only after letting $h\to0$ do we get $R'(P) = -\frac{5}{P^2}$ (past paper Q2(b)).`,
    },
    // 5.3
    {
      id: "differentiation-q8", kind: "mcq", sub: "Increasing functions",
      prompt: r`$f$ is **strictly increasing** in $I$ if, whenever $x_2 > x_1$ in $I$,…`,
      options: [r`$f(x_2) > f(x_1)$`, r`$f(x_2) \ge f(x_1)$`, r`$f(x_2) < f(x_1)$`, r`$f(x_2) \le f(x_1)$`],
      answer: 0,
      explain: r`Strict inequality $>$ gives strictly increasing; $\ge$ is just "increasing"; $<$ and $\le$ are (strictly) decreasing.`,
    },
    {
      id: "differentiation-q9", kind: "mcq", sub: "Increasing functions",
      prompt: r`A function is constant on $[0, 1]$ and then falls on $[1, 4]$. On $[0, 4]$ it is…`,
      options: ["decreasing but not strictly decreasing", "strictly decreasing", "increasing", "neither increasing nor decreasing"],
      answer: 0,
      explain: r`$f(x_2) \le f(x_1)$ for all $x_2 > x_1$, so it is decreasing. On the flat part $f(x_2) = f(x_1)$, so the strict inequality fails: not strictly decreasing.`,
    },
    {
      id: "differentiation-q10", kind: "mcq", sub: "Increasing functions",
      prompt: r`Demand is $P = 6 - \frac12 Q$ (Assignment 7 Q3). On which interval is total revenue increasing?`,
      options: [r`$0 \le Q \le 6$`, r`$6 \le Q \le 12$`, r`$0 \le Q \le 12$`, r`$0 \le Q \le 3$`],
      answer: 0,
      explain: r`$TR = 6Q - \frac12Q^2$, $MR = 6 - Q \ge 0$ exactly when $Q \le 6$. For $6 \le Q \le 12$ MR $\le 0$ and TR falls.`,
    },
    // 5.4
    {
      id: "differentiation-q11", kind: "fill", sub: "Marginal cost",
      prompt: r`For $C(x) = 200 + 10x$, the marginal cost is ____.`,
      answers: [["10"]],
      explain: r`$\frac{C(x+h)-C(x)}{h} = \frac{200 + 10x + 10h - 200 - 10x}{h} = 10$, so $C'(x) = 10$ for every $x$.`,
    },
    {
      id: "differentiation-q12", kind: "mcq", sub: "Marginal profit",
      prompt: r`With $\pi(x) = R(x) - C(x)$, marginal profit equals…`,
      options: [r`$R'(x) - C'(x)$`, r`$R'(x) + C'(x)$`, r`$\dfrac{R'(x)}{C'(x)}$`, r`$R(x) - C'(x)$`],
      answer: 0,
      explain: r`By the difference rule, $\pi'(x) = R'(x) - C'(x)$: marginal revenue minus marginal cost.`,
    },
    {
      id: "differentiation-q13", kind: "fill", sub: "Marginal revenue",
      prompt: r`Inverse demand is $P = -\frac12Q + 50$ (Assignment 7 Q2). Marginal revenue at $Q = 20$ is ____.`,
      answers: [["30"]],
      explain: r`$TR = PQ = 50Q - \frac12Q^2$, $MR = 50 - Q$, $MR(20) = 30$: one more unit sold raises revenue by about 30.`,
    },
    {
      id: "differentiation-q14", kind: "mcq", sub: "Marginal cost",
      prompt: r`$TC(Q) = 2Q^3 - 18Q^2 + 60Q + 250$ (Assignment 7 Q1). The variable cost function is…`,
      options: [r`$2Q^3 - 18Q^2 + 60Q$`, r`$2Q^3 - 18Q^2 + 60Q + 250$`, r`$6Q^2 - 36Q + 60$`, r`$250$`],
      answer: 0,
      explain: r`Fixed cost is the part that does not change with $Q$: $TC(0) = 250$. Variable cost $= TC - 250$. Option C is its derivative (marginal cost), option D is the fixed cost.`,
    },
    {
      id: "differentiation-q15", kind: "fill", sub: "Marginal cost",
      prompt: r`With $VC(Q) = 2Q^3 - 18Q^2 + 60Q$, the marginal cost at $Q = 2$ is ____.`,
      answers: [["12"]],
      explain: r`$VC'(Q) = 6Q^2 - 36Q + 60$, so $VC'(2) = 24 - 72 + 60 = 12$.`,
    },
    // 5.5
    {
      id: "differentiation-q16", kind: "fill", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to2}(x^2 - 5x + 4) =$ ____`,
      answers: [["-2"]],
      explain: r`A polynomial: substitute directly. $4 - 10 + 4 = -2$.`,
    },
    {
      id: "differentiation-q17", kind: "fill", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to2}\frac{3x^2+3x-18}{x-2} =$ ____`,
      answers: [["15"]],
      explain: r`Substitution gives $\frac00$. $3x^2 + 3x - 18 = 3(x+3)(x-2)$; cancel $(x-2)$: $3(x+3) \to 15$.`,
    },
    {
      id: "differentiation-q18", kind: "fill", sub: "Limits",
      prompt: r`$\displaystyle\lim_{h\to0}\frac{\sqrt{h+1}-1}{h} =$ ____`,
      answers: [["0.5", "1/2"]],
      explain: r`Multiply by $\sqrt{h+1}+1$: $\frac{h}{h(\sqrt{h+1}+1)} = \frac{1}{\sqrt{h+1}+1} \to \frac12$.`,
    },
    {
      id: "differentiation-q19", kind: "fill", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to4}\frac{x^2-16}{4\sqrt x - 8} =$ ____`,
      answers: [["8"]],
      explain: r`$x^2 - 16 = (\sqrt x - 2)(\sqrt x + 2)(x+4)$ and $4\sqrt x - 8 = 4(\sqrt x - 2)$. Cancel: $\frac{(\sqrt x+2)(x+4)}{4} \to \frac{4\cdot 8}{4} = 8$.`,
    },
    {
      id: "differentiation-q20", kind: "mcq", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to2}\frac{x^2-2x}{x^3-8} = $`,
      options: [r`$\frac16$`, r`$\frac12$`, r`$0$`, r`$\frac14$`],
      answer: 0,
      explain: r`$\frac{x(x-2)}{(x-2)(x^2+2x+4)} = \frac{x}{x^2+2x+4} \to \frac{2}{4+4+4} = \frac16$. (Remember $x^3 - 8 = (x-2)(x^2+2x+4)$.)`,
    },
    {
      id: "differentiation-q21", kind: "mcq", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to\infty}\frac{e^x}{1-\frac1x}$ is…`,
      options: [r`not finite: it tends to $+\infty$`, r`$0$`, r`$1$`, r`$e$`],
      answer: 0,
      explain: r`$\frac1x \to 0$ so the denominator $\to 1$, but $e^x$ grows without bound. There is no finite limit.`,
    },
    {
      id: "differentiation-q22", kind: "mcq", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2-x} - x\right) =$ (past paper Q1(b))`,
      options: [r`$-\frac12$`, r`$0$`, r`$-1$`, r`$-\infty$`],
      answer: 0,
      explain: r`$\sqrt{x^2-x} - x = \frac{-x}{\sqrt{x^2-x}+x} = \frac{-1}{\sqrt{1-1/x}+1} \to -\frac12$. "$\sqrt{x^2-x} \approx x$ so the answer is 0" is the classic trap.`,
    },
    {
      id: "differentiation-q23", kind: "fill", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to6}\left(x\sqrt{x\sqrt{x\sqrt{x\cdots}}}\right) =$ ____ (past paper Q1(d))`,
      answers: [["36"]],
      explain: r`Let $y$ be the expression. Then $y = x\sqrt y$, so $\sqrt y = x$ and $y = x^2$. Limit $= 6^2 = 36$.`,
    },
    {
      id: "differentiation-q24", kind: "mcq", sub: "Limits",
      prompt: r`$\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+4x} - x\right) =$`,
      options: [r`$2$`, r`$4$`, r`$0$`, r`$\frac12$`],
      answer: 0,
      explain: r`Conjugate: $\frac{(x^2+4x) - x^2}{\sqrt{x^2+4x}+x} = \frac{4x}{\sqrt{x^2+4x}+x} = \frac{4}{\sqrt{1+4/x}+1} \to \frac42 = 2$.`,
    },
    {
      id: "differentiation-q25", kind: "mcq", sub: "Limit rules",
      prompt: r`If $\lim_{x\to a}f(x) = A$ and $\lim_{x\to a}g(x) = B$, which rule needs an extra condition?`,
      options: [r`$\lim \frac{f}{g} = \frac AB$ (needs $B \neq 0$)`, r`$\lim (f+g) = A + B$`, r`$\lim (f\times g) = A\times B$`, r`$\lim (f-g) = A - B$`],
      answer: 0,
      explain: r`The quotient rule (iii) only holds when $B \neq 0$. If $B = 0$ (a $\frac00$ form) you must factor or use the conjugate first.`,
    },
    // 5.6
    {
      id: "differentiation-q26", kind: "mcq", sub: "Basic rules",
      prompt: r`$\dfrac{d}{dx}\left[\dfrac{f(x)+2}{3}\right] =$`,
      options: [r`$\frac13 f'(x)$`, r`$\frac13 f'(x) + \frac23$`, r`$\frac13\left(f'(x)+2\right)$`, r`$3f'(x)$`],
      answer: 0,
      explain: r`$\frac{f(x)+2}{3} = \frac13 f(x) + \frac23$. The constant $\frac23$ has derivative 0 (Rules 1–2) and the factor $\frac13$ stays (Rule 3).`,
    },
    {
      id: "differentiation-q27", kind: "mcq", sub: "Power rule",
      prompt: r`If $f(x) = 3x^{1/2} + \frac{1}{100}x^{100} + 2$, then $f'(x) =$`,
      options: [r`$\frac32x^{-1/2} + x^{99}$`, r`$\frac32x^{1/2} + x^{99}$`, r`$\frac32x^{-1/2} + x^{99} + 2$`, r`$6x^{-1/2} + x^{99}$`],
      answer: 0,
      explain: r`$3\cdot\frac12x^{-1/2} = \frac32x^{-1/2}$; $\frac{1}{100}\cdot100x^{99} = x^{99}$; the constant 2 disappears.`,
    },
    {
      id: "differentiation-q28", kind: "mcq", sub: "Product rule",
      prompt: r`Using the product rule, $\dfrac{d}{dx}\left[(x+1)(x^2+1)\right] =$`,
      options: [r`$3x^2 + 2x + 1$`, r`$2x$`, r`$2x(x+1)$`, r`$3x^2 + 1$`],
      answer: 0,
      explain: r`$f'g + fg' = 1\cdot(x^2+1) + (x+1)\cdot2x = 3x^2 + 2x + 1$. Option B is the common mistake $(fg)' = f'g'$.`,
    },
    {
      id: "differentiation-q29", kind: "fill", sub: "Quotient rule",
      prompt: r`For $F(x) = \dfrac{3x-5}{x-2}$, the slope of $F$ at $x = 3$ is ____.`,
      answers: [["-1"]],
      explain: r`$F'(x) = \frac{3(x-2) - (3x-5)}{(x-2)^2} = \frac{-1}{(x-2)^2}$, so $F'(3) = -1$.`,
    },
    {
      id: "differentiation-q30", kind: "mcq", sub: "Marginal profit",
      prompt: r`$R(x) = bx$ and $C(x) = ax^2 + bx + c$. Marginal profit is…`,
      options: [r`$-2ax$`, r`$b - 2ax$`, r`$-2ax - c$`, r`$2ax$`],
      answer: 0,
      explain: r`$MR = b$, $MC = 2ax + b$, so $\pi'(x) = b - 2ax - b = -2ax$.`,
    },
    // 5.7
    {
      id: "differentiation-q31", kind: "mcq", sub: "Chain rule",
      prompt: r`$y = u^5$ and $u = 1 - x^3$. Then $\dfrac{dy}{dx} =$`,
      options: [r`$-15x^2(1-x^3)^4$`, r`$15x^2(1-x^3)^4$`, r`$5(1-x^3)^4$`, r`$-3x^2(1-x^3)^5$`],
      answer: 0,
      explain: r`$\frac{dy}{du}\cdot\frac{du}{dx} = 5u^4\cdot(-3x^2) = -15x^2(1-x^3)^4$. Don't lose the minus sign from $\frac{d}{dx}(1-x^3) = -3x^2$.`,
    },
    {
      id: "differentiation-q32", kind: "mcq", sub: "Chain rule",
      prompt: r`$\dfrac{d}{dx}(x^2+1)^{10} =$`,
      options: [r`$20x(x^2+1)^9$`, r`$10(x^2+1)^9$`, r`$10x(x^2+1)^9$`, r`$20x(x^2+1)^{10}$`],
      answer: 0,
      explain: r`Outside: $10u^9$; inside: $2x$. Product: $20x(x^2+1)^9$.`,
    },
    {
      id: "differentiation-q33", kind: "fill", sub: "Chain rule",
      prompt: r`For $y = \left(\dfrac{x+1}{x}\right)^2$, $\dfrac{dy}{dx}$ at $x = 1$ is ____.`,
      answers: [["-4"]],
      explain: r`$\frac{dy}{dx} = 2\cdot\frac{x+1}{x}\cdot\left(-\frac{1}{x^2}\right) = -\frac{2(x+1)}{x^3}$. At $x = 1$: $-\frac{2\cdot2}{1} = -4$.`,
    },
    // 5.8
    {
      id: "differentiation-q34", kind: "fill", sub: "Higher derivatives",
      prompt: r`For $f(x) = 2x^5 - 3x^3 + 2x$, $f''(1) =$ ____`,
      answers: [["22"]],
      explain: r`$f' = 10x^4 - 9x^2 + 2$, $f'' = 40x^3 - 18x$, so $f''(1) = 40 - 18 = 22$.`,
    },
    {
      id: "differentiation-q35", kind: "mcq", sub: "Higher derivatives",
      prompt: r`"Property prices are still increasing but at a slower rate." With price $P(t)$ this means…`,
      options: [r`$P'(t) > 0$ and $P''(t) < 0$`, r`$P'(t) < 0$ and $P''(t) > 0$`, r`$P'(t) > 0$ and $P''(t) > 0$`, r`$P'(t) < 0$ and $P''(t) < 0$`],
      answer: 0,
      explain: r`Still increasing: $P' > 0$. Slower rate: the rate $P'$ is falling, so $P'' < 0$ (Assignment 6 Q3). The graph rises but flattens (concave).`,
    },
    {
      id: "differentiation-q36", kind: "mcq", sub: "Higher derivatives",
      prompt: r`If $f''(x) \ge 0$ for all $x$, then…`,
      options: [r`$f'$ is increasing and $f$ is convex`, r`$f'$ is decreasing and $f$ is concave`, r`$f$ is increasing`, r`$f'$ is constant`],
      answer: 0,
      explain: r`$f''$ is the derivative of $f'$, so $f'' \ge 0$ means $f'$ is increasing; with $f'' \ge 0$ for all $x$, $f$ is convex. It says nothing about the sign of $f'$ itself (option C).`,
    },
    // 5.9
    {
      id: "differentiation-q37", kind: "mcq", sub: "Exponential functions",
      prompt: r`$\dfrac{d}{dx}e^{2x} =$`,
      options: [r`$2e^{2x}$`, r`$e^{2x}$`, r`$2xe^{2x-1}$`, r`$e^{2}$`],
      answer: 0,
      explain: r`$(e^{g(x)})' = e^{g(x)}g'(x)$ with $g(x) = 2x$, $g' = 2$. The power rule does not apply to $e^{2x}$ (option C).`,
    },
    {
      id: "differentiation-q38", kind: "mcq", sub: "Logarithmic functions",
      prompt: r`$\dfrac{d}{dx}\ln(x^2+1) =$`,
      options: [r`$\dfrac{2x}{x^2+1}$`, r`$\dfrac{x^2+1}{2x}$`, r`$\dfrac{1}{x^2+1}$`, r`$\dfrac{1}{2x}$`],
      answer: 0,
      explain: r`$(\ln h)' = \frac{h'}{h}$ with $h = x^2 + 1$, $h' = 2x$. The derivative of the inside goes on top, not underneath (option B).`,
    },
    {
      id: "differentiation-q39", kind: "fill", sub: "Logarithmic functions",
      prompt: r`For $y = \ln(x^2 + e^x)$, $\dfrac{dy}{dx}$ at $x = 0$ is ____.`,
      answers: [["1"]],
      explain: r`$\frac{dy}{dx} = \frac{2x + e^x}{x^2 + e^x}$. At $x = 0$: $\frac{0 + 1}{0 + 1} = 1$.`,
    },
    {
      id: "differentiation-q40", kind: "mcq", sub: "Exponential functions",
      prompt: r`$y = a^xb^{x^2}$ with $a, b > 0$ constants. Then $\dfrac{dy}{dx} =$`,
      options: [r`$a^xb^{x^2}(\ln a + 2x\ln b)$`, r`$xa^{x-1}\cdot x^2b^{x^2-1}$`, r`$a^xb^{x^2}\ln a\ln b$`, r`$a^xb^{x^2}(\ln a + \ln b)$`],
      answer: 0,
      explain: r`$y = e^{x\ln a + x^2\ln b}$, so $y' = e^{x\ln a + x^2\ln b}\cdot(\ln a + 2x\ln b) = a^xb^{x^2}(\ln a + 2x\ln b)$.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "differentiation-x1", kind: "calc", sub: "Definition of the derivative",
      prompt: r`Suppose the revenue function is $R(P) = \dfrac{5}{P}$, where $P$ is the price of the product. Use the **definition of the derivative** to find $R'(P)$.`,
      marks: 5,
      rubric: [
        { point: r`Writes $R'(P) = \lim_{h\to0}\frac{R(P+h)-R(P)}{h}$ with $R(P+h) = \frac{5}{P+h}$`, marks: 1 },
        { point: r`Combines the fractions: $R(P+h)-R(P) = \frac{-5h}{P(P+h)}$`, marks: 2 },
        { point: r`Cancels $h$ to get $\frac{-5}{P(P+h)}$ and takes $h \to 0$`, marks: 1 },
        { point: r`Final answer $R'(P) = -\frac{5}{P^2}$`, marks: 1 },
      ],
      model: r`By definition, $R'(P) = \displaystyle\lim_{h\to0}\frac{R(P+h)-R(P)}{h}$.
$$R(P+h)-R(P) = \frac{5}{P+h} - \frac5P = \frac{5P - 5(P+h)}{P(P+h)} = \frac{-5h}{P(P+h)}.$$
So $\dfrac{R(P+h)-R(P)}{h} = \dfrac{-5}{P(P+h)}$, and letting $h\to0$:
$$R'(P) = -\frac{5}{P^2}.$$`,
      answer: r`$R'(P) = -\dfrac{5}{P^2}$`,
      source: "Past paper Q2(b)",
    },
    {
      id: "differentiation-x2", kind: "calc", sub: "Limits",
      prompt: r`Evaluate $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2-x} - x\right)$, if it exists.`,
      marks: 5,
      rubric: [
        { point: r`Multiplies and divides by the conjugate $\sqrt{x^2-x}+x$`, marks: 2 },
        { point: r`Simplifies to $\frac{-x}{\sqrt{x^2-x}+x}$ and divides top and bottom by $x$`, marks: 2 },
        { point: r`Correct limit $-\frac12$`, marks: 1 },
      ],
      model: r`$$\sqrt{x^2-x}-x = \frac{(\sqrt{x^2-x}-x)(\sqrt{x^2-x}+x)}{\sqrt{x^2-x}+x} = \frac{x^2 - x - x^2}{\sqrt{x^2-x}+x} = \frac{-x}{\sqrt{x^2-x}+x}.$$
For $x > 0$, $\sqrt{x^2-x} = x\sqrt{1-\frac1x}$. Dividing top and bottom by $x$:
$$\frac{-1}{\sqrt{1-\frac1x}+1} \to \frac{-1}{\sqrt{1}+1} = -\frac12 \quad (x\to\infty).$$
The limit exists and equals $-\frac12$.`,
      answer: r`$-\frac12$`,
      source: "Past paper Q1(b)",
    },
    {
      id: "differentiation-x3", kind: "calc", sub: "Limits",
      prompt: r`Evaluate $\displaystyle\lim_{x\to6}\left(x\sqrt{x\sqrt{x\sqrt{x\cdots}}}\right)$, if it exists.`,
      marks: 5,
      rubric: [
        { point: r`Sets $y = x\sqrt{x\sqrt{x\cdots}}$ and observes $y = x\sqrt y$ (or writes the power as $x^{1+\frac12+\frac14+\cdots}$)`, marks: 2 },
        { point: r`Solves to $y = x^2$ (for $y > 0$)`, marks: 2 },
        { point: r`Limit $= 36$`, marks: 1 },
      ],
      model: r`Let $y = x\sqrt{x\sqrt{x\sqrt{x\cdots}}}$. The expression under the first square root, $x\sqrt{x\sqrt{x\cdots}}$, is again $y$, so
$$y = x\sqrt{y}.$$
Since $y > 0$, divide by $\sqrt y$: $\sqrt y = x$, hence $y = x^2$.
(Check: $y = x^{1}\cdot x^{1/2}\cdot x^{1/4}\cdots = x^{1+\frac12+\frac14+\cdots} = x^2$.)
Therefore $\displaystyle\lim_{x\to6}y = \lim_{x\to6}x^2 = 36$.`,
      answer: "36",
      source: "Past paper Q1(d)",
    },
    {
      id: "differentiation-x4", kind: "calc", sub: "Limits",
      prompt: r`Compute the following limits:
(a) $\displaystyle\lim_{x\to7}\sqrt2$ (b) $\displaystyle\lim_{x\to2}(x^2-5x+4)$ (c) $\displaystyle\lim_{x\to4}\frac{x^2-16}{4\sqrt x-8}$`,
      marks: 5,
      rubric: [
        { point: r`(a) $\sqrt2$ and (b) $-2$ by direct substitution`, marks: 1 },
        { point: r`(c) Recognises $\frac00$ and factors $x^2-16 = (\sqrt x-2)(\sqrt x+2)(x+4)$, $4\sqrt x - 8 = 4(\sqrt x - 2)$`, marks: 2 },
        { point: r`(c) Cancels $\sqrt x - 2$ and substitutes`, marks: 1 },
        { point: r`(c) Correct value 8`, marks: 1 },
      ],
      model: r`(a) The function is the constant $\sqrt2$, so the limit is $\sqrt2$.
(b) Polynomial, substitute: $2^2 - 5(2) + 4 = -2$.
(c) Substituting gives $\frac{0}{0}$. Write $x - 4 = (\sqrt x - 2)(\sqrt x + 2)$, so $x^2 - 16 = (x-4)(x+4) = (\sqrt x-2)(\sqrt x+2)(x+4)$, and $4\sqrt x - 8 = 4(\sqrt x - 2)$. For $x \neq 4$:
$$\frac{x^2-16}{4\sqrt x - 8} = \frac{(\sqrt x+2)(x+4)}{4} \to \frac{(2+2)(4+4)}{4} = 8.$$`,
      answer: r`(a) $\sqrt2$ (b) $-2$ (c) $8$`,
      source: "Assignment 5 Q3(a)–(c)",
    },
    {
      id: "differentiation-x5", kind: "calc", sub: "Limits",
      prompt: r`Compute the following limits:
(d) $\displaystyle\lim_{h\to0}\frac{\sqrt{h+4}-2}{h}$ (e) $\displaystyle\lim_{x\to2}\frac{x^2-2x}{x^3-8}$ (f) $\displaystyle\lim_{x\to\infty}\frac{e^x}{1-\frac1x}$`,
      marks: 5,
      rubric: [
        { point: r`(d) Multiplies by the conjugate $\sqrt{h+4}+2$ and gets $\frac14$`, marks: 2 },
        { point: r`(e) Factors $x^3 - 8 = (x-2)(x^2+2x+4)$, cancels and gets $\frac16$`, marks: 2 },
        { point: r`(f) States the limit is not finite ($\to +\infty$) with reason`, marks: 1 },
      ],
      model: r`(d) $\dfrac{\sqrt{h+4}-2}{h}\cdot\dfrac{\sqrt{h+4}+2}{\sqrt{h+4}+2} = \dfrac{(h+4)-4}{h(\sqrt{h+4}+2)} = \dfrac{1}{\sqrt{h+4}+2} \to \dfrac{1}{4}$.
(e) $\dfrac{x^2-2x}{x^3-8} = \dfrac{x(x-2)}{(x-2)(x^2+2x+4)} = \dfrac{x}{x^2+2x+4} \to \dfrac{2}{12} = \dfrac16$.
(f) As $x\to\infty$, $\frac1x\to0$ so the denominator tends to 1, while $e^x$ increases without bound. The quotient therefore tends to $+\infty$: there is no finite limit.`,
      answer: r`(d) $\frac14$ (e) $\frac16$ (f) no finite limit ($+\infty$)`,
      source: "Assignment 5 Q3(d)–(f)",
    },
    {
      id: "differentiation-x6", kind: "calc", sub: "Exponential and log derivatives",
      prompt: r`Find $\dfrac{dy}{dx}$ for:
(a) $y = e^{\sqrt[3]{x}}$ (b) $y = e^{2x} + \sqrt{5-\sqrt{4-x^3}}$ (c) $y = \ln(x^2+e^x)$ (d) $y = \ln\left(\dfrac{x^4+6}{x-10}\right)^{1/4}$`,
      marks: 5,
      rubric: [
        { point: r`(a) $\frac{1}{3}x^{-2/3}e^{\sqrt[3]{x}}$ using $(e^{g})' = e^{g}g'$`, marks: 1 },
        { point: r`(b) $2e^{2x}$ plus correct double chain rule for the nested root`, marks: 2 },
        { point: r`(c) $\frac{2x+e^x}{x^2+e^x}$`, marks: 1 },
        { point: r`(d) Log rules then $\frac{x^3}{x^4+6} - \frac{1}{4(x-10)}$`, marks: 1 },
      ],
      model: r`(a) $g(x) = x^{1/3}$, $g'(x) = \frac13x^{-2/3}$: $\dfrac{dy}{dx} = \dfrac{e^{\sqrt[3]{x}}}{3x^{2/3}}$.
(b) $\frac{d}{dx}e^{2x} = 2e^{2x}$. Let $v = 4 - x^3$, $w = 5 - \sqrt v$. Then $\frac{dw}{dx} = -\frac{1}{2\sqrt v}\cdot(-3x^2) = \frac{3x^2}{2\sqrt{4-x^3}}$ and $\frac{d}{dx}\sqrt w = \frac{1}{2\sqrt w}\frac{dw}{dx}$. So
$$\frac{dy}{dx} = 2e^{2x} + \frac{3x^2}{4\sqrt{4-x^3}\,\sqrt{5-\sqrt{4-x^3}}}.$$
(c) $(\ln h)' = h'/h$: $\dfrac{dy}{dx} = \dfrac{2x+e^x}{x^2+e^x}$.
(d) $y = \frac14\left[\ln(x^4+6) - \ln(x-10)\right]$, so $\dfrac{dy}{dx} = \dfrac14\left[\dfrac{4x^3}{x^4+6} - \dfrac{1}{x-10}\right] = \dfrac{x^3}{x^4+6} - \dfrac{1}{4(x-10)}$.`,
      answer: r`(a) $\frac{e^{\sqrt[3]{x}}}{3x^{2/3}}$ (b) $2e^{2x} + \frac{3x^2}{4\sqrt{4-x^3}\sqrt{5-\sqrt{4-x^3}}}$ (c) $\frac{2x+e^x}{x^2+e^x}$ (d) $\frac{x^3}{x^4+6} - \frac{1}{4(x-10)}$`,
      source: "Assignment 6 Q2(a)–(d)",
    },
    {
      id: "differentiation-x7", kind: "calc", sub: "Product, quotient and chain rules",
      prompt: r`Find $\dfrac{dy}{dx}$ for:
(e) $y = \sqrt x\times e^{2x}$ (f) $y = \left(\dfrac{x+1}{\sqrt{x^2+4}}\right)^3 + 5$ (g) $y = A^xB^{x^2}$, where $A$ and $B$ are positive constants.`,
      marks: 5,
      rubric: [
        { point: r`(e) Product rule: $\frac{e^{2x}(1+4x)}{2\sqrt x}$ (or equivalent)`, marks: 1 },
        { point: r`(f) Chain rule $3u^2u'$ with quotient rule giving $u' = \frac{4-x}{(x^2+4)^{3/2}}$`, marks: 2 },
        { point: r`(g) Rewrites $A^xB^{x^2} = e^{x\ln A + x^2\ln B}$ and differentiates correctly`, marks: 2 },
      ],
      model: r`(e) $\dfrac{dy}{dx} = \dfrac{1}{2\sqrt x}e^{2x} + \sqrt x\cdot2e^{2x} = \dfrac{e^{2x}(1+4x)}{2\sqrt x}$.
(f) Let $u = \frac{x+1}{\sqrt{x^2+4}}$, so $y' = 3u^2u'$. With $\frac{d}{dx}\sqrt{x^2+4} = \frac{x}{\sqrt{x^2+4}}$,
$$u' = \frac{\sqrt{x^2+4} - (x+1)\frac{x}{\sqrt{x^2+4}}}{x^2+4} = \frac{4-x}{(x^2+4)^{3/2}}, \qquad \frac{dy}{dx} = \frac{3(x+1)^2(4-x)}{(x^2+4)^{5/2}}.$$
(g) $y = e^{x\ln A}\cdot e^{x^2\ln B} = e^{x\ln A + x^2\ln B}$. By $(e^{g})' = e^{g}g'$:
$$\frac{dy}{dx} = A^xB^{x^2}\left(\ln A + 2x\ln B\right).$$`,
      answer: r`(e) $\frac{e^{2x}(1+4x)}{2\sqrt x}$ (f) $\frac{3(x+1)^2(4-x)}{(x^2+4)^{5/2}}$ (g) $A^xB^{x^2}(\ln A + 2x\ln B)$`,
      source: "Assignment 6 Q2(e)–(g)",
    },
    {
      id: "differentiation-x8", kind: "explain", sub: "Higher derivatives",
      prompt: r`A sentence in a property report reads: "Private residential property prices in Singapore are still increasing but at a slower rate." If $P(t)$ denotes the average selling price of private residential property at time $t$, translate the statement into a statement on the sign of a certain derivative and draw it in a diagram.`,
      marks: 5,
      rubric: [
        { point: r`"Still increasing" $\Rightarrow P'(t) > 0$`, marks: 1.5 },
        { point: r`"At a slower rate" $\Rightarrow P'(t)$ is decreasing, i.e. $P''(t) < 0$`, marks: 2 },
        { point: r`Diagram: rising curve that becomes flatter (increasing, concave)`, marks: 1.5 },
      ],
      model: r`"Prices are still increasing" says the slope of $P(t)$ is positive: $P'(t) > 0$.
"At a slower rate" says the rate of increase $P'(t)$ is getting smaller over time, so the derivative of $P'(t)$ is negative: $P''(t) < 0$.
So $P$ is increasing and concave. In a diagram with $t$ on the horizontal axis and $P$ on the vertical axis, the curve rises but its tangent lines get flatter as $t$ increases (see figure).`,
      answer: r`$P'(t) > 0$ and $P''(t) < 0$`,
      figures: [
        {
          x: "t",
          y: "P(t)",
          xr: [0, 6],
          yr: [3, 10.5],
          curves: [{ f: "10 - 6*exp(-0.5*x)", label: "P(t)" }],
          segments: [
            { from: [0, 4.5412], to: [2, 8.1804], tone: 1, dashed: true },
            { from: [3, 8.782], to: [5, 9.594], tone: 1, dashed: true },
          ],
          caption: "Increasing (P′ > 0) but the tangents get flatter (P″ < 0).",
        },
      ],
      source: "Assignment 6 Q3 (previous final exam question)",
    },
    {
      id: "differentiation-x9", kind: "explain", sub: "Rates of change",
      prompt: r`Consider the total cost function $TC(Q) = 2Q^3 - 18Q^2 + 60Q + 250$, where $Q$ is the output level.
(a) Write down the variable cost function.
(b) Find the first derivative of the variable cost function and interpret the economic meaning of this derivative.`,
      marks: 5,
      rubric: [
        { point: r`Identifies fixed cost $= 250$ and $VC(Q) = 2Q^3 - 18Q^2 + 60Q$`, marks: 2 },
        { point: r`$VC'(Q) = 6Q^2 - 36Q + 60$`, marks: 1.5 },
        { point: r`Interprets it as marginal cost: the extra cost of producing one more unit at output $Q$ (equal to $TC'(Q)$)`, marks: 1.5 },
      ],
      model: r`(a) The fixed cost is the part of cost that does not depend on output: $TC(0) = 250$. Hence
$$VC(Q) = TC(Q) - 250 = 2Q^3 - 18Q^2 + 60Q.$$
(b) $VC'(Q) = 6Q^2 - 36Q + 60$.
This is the **marginal cost**: the rate at which cost rises with output, i.e. approximately the extra cost of producing one more unit when output is $Q$. Because fixed cost does not change with $Q$, $VC'(Q) = TC'(Q)$. Also $6Q^2 - 36Q + 60 = 6[(Q-3)^2 + 1] > 0$, so producing more always raises cost.`,
      answer: r`$VC = 2Q^3 - 18Q^2 + 60Q$; $VC' = 6Q^2 - 36Q + 60$ = marginal cost`,
      source: "Assignment 7 Q1",
    },
    {
      id: "differentiation-x10", kind: "calc", sub: "Rates of change",
      prompt: r`Suppose the (inverse) demand function is $P = -\frac12Q + 50$.
(a) Find an expression for the total revenue (TR) function in terms of $Q$.
(b) Calculate the marginal revenue (MR) at $Q = 20$, and interpret the economic meaning of your answer.`,
      marks: 5,
      rubric: [
        { point: r`$TR = PQ = 50Q - \frac12Q^2$`, marks: 1.5 },
        { point: r`$MR = \frac{d(TR)}{dQ} = 50 - Q$`, marks: 1.5 },
        { point: r`$MR(20) = 30$`, marks: 1 },
        { point: r`Interpretation: selling one more unit at $Q = 20$ raises TR by about 30`, marks: 1 },
      ],
      model: r`(a) $TR = P\times Q = \left(-\frac12Q + 50\right)Q = 50Q - \frac12Q^2$.
(b) $MR = \dfrac{d(TR)}{dQ} = 50 - Q$, so $MR(20) = 50 - 20 = 30$.
Interpretation: when 20 units are sold, selling one additional unit increases total revenue by approximately 30. (Indeed $TR(21) - TR(20) = 829.5 - 800 = 29.5$.)`,
      answer: r`$TR = 50Q - \frac12Q^2$; $MR(20) = 30$`,
      source: "Assignment 7 Q2",
    },
    {
      id: "differentiation-x11", kind: "calc", sub: "Increasing and decreasing",
      prompt: r`Suppose the (inverse) demand function for a product is $P = 6 - \frac12Q$.
(a) Find the total revenue function and sketch it ($TR$ vertical, $Q$ horizontal). (b) Derive the MR function. (c) Find the interval on which TR is increasing and (d) the interval on which it is decreasing. (e) Using (b)–(d), find the level of $Q$ that maximises revenue. Does it make sense?`,
      marks: 5,
      rubric: [
        { point: r`$TR = 6Q - \frac12Q^2$ with a correct sketch (inverted parabola, zeros at 0 and 12, top at $(6, 18)$)`, marks: 1 },
        { point: r`$MR = 6 - Q$`, marks: 1 },
        { point: r`Increasing on $0 \le Q \le 6$ (MR $\ge 0$) and decreasing on $6 \le Q \le 12$ (MR $\le 0$)`, marks: 2 },
        { point: r`Maximum revenue at $Q = 6$ ($TR = 18$), with the explanation that TR rises then falls`, marks: 1 },
      ],
      model: r`(a) $TR = PQ = 6Q - \frac12Q^2$, meaningful for $0 \le Q \le 12$ (where $P \ge 0$). Its graph is an upside-down parabola through $(0,0)$ and $(12,0)$.
(b) $MR = \dfrac{d(TR)}{dQ} = 6 - Q$.
(c) TR is increasing where $MR \ge 0$: $6 - Q \ge 0 \iff Q \le 6$, i.e. on $0 \le Q \le 6$.
(d) TR is decreasing where $MR \le 0$: $Q \ge 6$, i.e. on $6 \le Q \le 12$.
(e) TR increases up to $Q = 6$ and decreases after it, so revenue is maximised at $Q = 6$, where $TR = 36 - 18 = 18$ and $P = 3$. This makes sense: before $Q = 6$ each extra unit adds revenue ($MR > 0$); after it each extra unit lowers revenue ($MR < 0$); the peak is where $MR = 0$.`,
      answer: r`$TR = 6Q - \frac12Q^2$, $MR = 6 - Q$; increasing on $[0, 6]$, decreasing on $[6, 12]$; max at $Q = 6$ (TR = 18)`,
      figures: [
        {
          x: "Q",
          y: "TR, MR",
          xr: [0, 12.5],
          yr: [-7, 20],
          curves: [
            { f: "6*x - x^2/2", label: "TR", from: 0, to: 12 },
            { f: "6 - x", label: "MR", from: 0, to: 12, tone: 1 },
          ],
          points: [{ at: [6, 18], label: "(6, 18)", guides: true }],
        },
      ],
      source: "Assignment 7 Q3",
    },
    {
      id: "differentiation-x12", kind: "proof", sub: "Basic rules",
      prompt: r`The first derivative of $f$ is defined by $f'(x) = \lim_{h\to0}\frac{f(x+h)-f(x)}{h}$, the slope of the tangent to $f$ at $x$; similarly $g'(x) = \lim_{h\to0}\frac{g(x+h)-g(x)}{h}$. Use these definitions to prove:
(a) If $f(x) = c$, a constant, then $f'(x) = 0$.
(b) The first derivative of $cf(x)$, where $c$ is a constant, is $cf'(x)$.
(c) If $F(x) = f(x) + g(x)$, then $F'(x) = f'(x) + g'(x)$.`,
      marks: 5,
      rubric: [
        { point: r`(a) $\frac{c - c}{h} = 0$ for every $h \neq 0$, so the limit is 0`, marks: 1 },
        { point: r`(b) Factors $c$ out of the difference quotient and takes it outside the limit (product rule for limits)`, marks: 2 },
        { point: r`(c) Regroups the quotient as $\frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h}$ and uses the sum rule for limits`, marks: 2 },
      ],
      model: r`(a) $f(x+h) = c$ and $f(x) = c$, so $\dfrac{f(x+h)-f(x)}{h} = \dfrac{c-c}{h} = 0$ for every $h \neq 0$. Hence $f'(x) = \lim_{h\to0}0 = 0$.
(b) Let $G(x) = cf(x)$:
$$\frac{G(x+h)-G(x)}{h} = \frac{cf(x+h) - cf(x)}{h} = c\cdot\frac{f(x+h)-f(x)}{h}.$$
By limit rule (ii) (the constant $c$ has limit $c$), $G'(x) = c\displaystyle\lim_{h\to0}\frac{f(x+h)-f(x)}{h} = cf'(x)$.
(c) $$\frac{F(x+h)-F(x)}{h} = \frac{f(x+h)+g(x+h)-f(x)-g(x)}{h} = \frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h}.$$
Both quotients have limits, $f'(x)$ and $g'(x)$, so by limit rule (i) $F'(x) = f'(x) + g'(x)$.`,
      source: "Assignment 5 Q5(a)–(c)",
    },
    {
      id: "differentiation-x17", kind: "proof", sub: "Basic rules",
      prompt: r`Using the definitions $f'(x) = \lim_{h\to0}\frac{f(x+h)-f(x)}{h}$ and $g'(x) = \lim_{h\to0}\frac{g(x+h)-g(x)}{h}$, consider $F(x) = f(x)\times g(x)$. Show that $F'(x) = f(x)\times g'(x) + f'(x)\times g(x)$.`,
      marks: 5,
      rubric: [
        { point: r`Adds and subtracts $f(x+h)g(x)$: $F(x+h)-F(x) = f(x+h)[g(x+h)-g(x)] + g(x)[f(x+h)-f(x)]$`, marks: 2 },
        { point: r`Divides by $h$ and splits into the two difference quotients`, marks: 1 },
        { point: r`Justifies $f(x+h) \to f(x)$ and applies the sum/product rules for limits`, marks: 1 },
        { point: r`Concludes $F'(x) = f(x)g'(x) + f'(x)g(x)$`, marks: 1 },
      ],
      model: r`Add and subtract $f(x+h)g(x)$:
$$F(x+h) - F(x) = f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x) = f(x+h)\big[g(x+h)-g(x)\big] + g(x)\big[f(x+h)-f(x)\big].$$
Divide by $h$:
$$\frac{F(x+h)-F(x)}{h} = f(x+h)\cdot\frac{g(x+h)-g(x)}{h} + g(x)\cdot\frac{f(x+h)-f(x)}{h}.$$
As $h \to 0$: $f(x+h) - f(x) = h\cdot\frac{f(x+h)-f(x)}{h} \to 0\cdot f'(x) = 0$, so $f(x+h) \to f(x)$. The two quotients tend to $g'(x)$ and $f'(x)$. By the sum and product rules for limits,
$$F'(x) = f(x)g'(x) + g(x)f'(x).$$`,
      source: "Assignment 5 Q5(d)",
    },
    {
      id: "differentiation-x18", kind: "proof", sub: "Definition of the derivative",
      prompt: r`Consider $f(x) = ax^2 + bx + c$.
(a) Using the derivative definition, show that $f'(x) = 2ax + b$.
(b) For what value of $x$ is $f'(x) = 0$?
(c) Suppose $a$, $b$ and $c$ are 2, 4 and 10 respectively. Find the slope of the tangent line to this quadratic function at $(-1, 8)$.`,
      marks: 5,
      rubric: [
        { point: r`(a) $f(x+h) - f(x) = 2axh + ah^2 + bh$`, marks: 1 },
        { point: r`(a) Divides by $h$ and lets $h\to0$ to get $2ax + b$`, marks: 1.5 },
        { point: r`(b) $x = -\frac{b}{2a}$ ($a \neq 0$)`, marks: 1 },
        { point: r`(c) $f'(x) = 4x + 4$, slope at $x = -1$ is 0`, marks: 1.5 },
      ],
      model: r`(a) $f(x+h) = a(x^2 + 2xh + h^2) + b(x+h) + c$, so
$$f(x+h) - f(x) = 2axh + ah^2 + bh, \qquad \frac{f(x+h)-f(x)}{h} = 2ax + ah + b \to 2ax + b \ (h\to0).$$
(b) $2ax + b = 0 \iff x = -\dfrac{b}{2a}$ (assuming $a \neq 0$).
(c) $f(x) = 2x^2 + 4x + 10$; the point is on the curve since $f(-1) = 2 - 4 + 10 = 8$. $f'(x) = 4x + 4$, so $f'(-1) = 0$. The slope of the tangent at $(-1, 8)$ is 0 (a horizontal tangent; indeed $-\frac{b}{2a} = -1$).`,
      answer: r`(a) $2ax + b$ (b) $x = -\frac{b}{2a}$ (c) slope $= 0$`,
      source: "Assignment 5 Q6",
    },
    {
      id: "differentiation-x19", kind: "calc", sub: "Limits",
      prompt: r`The graph of a function $f$ is shown: a straight line rises from below the $x$-axis, through $(0.65, 1)$, up to the point $(1, 3)$; from $(1, 3)$ a curve falls through $(3, 1)$ and continues to decrease slowly towards the $x$-axis. Find $\lim_{x\to1}f(x)$, explaining how you read it from the graph.`,
      marks: 5,
      rubric: [
        { point: r`States that the limit is the value $f(x)$ approaches as $x$ gets close to 1 (not necessarily $f(1)$)`, marks: 1.5 },
        { point: r`Reads that the heights approach 3 as $x \to 1$ from values below 1 (along the line)`, marks: 1.5 },
        { point: r`Reads that the heights approach 3 as $x \to 1$ from values above 1 (along the curve); concludes the limit is 3`, marks: 2 },
      ],
      model: r`$\lim_{x\to1}f(x)$ is the height the graph approaches as $x$ gets closer and closer to 1, on both sides.
For $x$ slightly less than 1 we are on the rising line, and its height approaches 3 as $x \to 1$ (it reaches the point $(1, 3)$).
For $x$ slightly greater than 1 we are on the falling curve, which starts at $(1, 3)$, so its height also approaches 3.
Both sides head to the same height and there is no gap or jump at $x = 1$, so
$$\lim_{x\to1}f(x) = 3.$$
(The graph has a sharp corner at $(1, 3)$; that affects the slope there, not the limit of $f$.)`,
      answer: "3",
      figures: [
        {
          xr: [-0.3, 5.3],
          yr: [-3, 4],
          curves: [
            { f: "3 + (x-1)*2/0.35", from: 0, to: 1 },
            { f: "3/x", from: 1, to: 5, label: "y = f(x)" },
          ],
          points: [
            { at: [1, 3], label: "(1, 3)" },
            { at: [0.65, 1], label: "(0.65, 1)" },
            { at: [3, 1], label: "(3, 1)" },
          ],
        },
      ],
      source: "Assignment 5 Q4",
    },
    {
      id: "differentiation-x20", kind: "calc", sub: "Rates of change",
      prompt: r`If the production function is $Q = 16\sqrt L - L$, where $Q$ denotes output and $L$ denotes the size of the workforce, calculate the value of $MP_L = \dfrac{dQ}{dL}$ when $L = 1, 4, 9$ and $16$, and discuss the implications of these results.`,
      marks: 5,
      rubric: [
        { point: r`$MP_L = 8L^{-1/2} - 1 = \frac{8}{\sqrt L} - 1$`, marks: 1.5 },
        { point: r`Values 7, 3, $\frac53$, 1 (all four correct; 1 mark if two or three correct)`, marks: 2 },
        { point: r`Discussion: each extra worker raises output ($MP_L > 0$) but by less and less as $L$ rises (diminishing marginal product)`, marks: 1.5 },
      ],
      model: r`$Q = 16L^{1/2} - L$, so by the power rule
$$MP_L = \frac{dQ}{dL} = 16\cdot\tfrac12L^{-1/2} - 1 = \frac{8}{\sqrt L} - 1.$$
- $L = 1$: $8 - 1 = 7$
- $L = 4$: $4 - 1 = 3$
- $L = 9$: $\frac83 - 1 = \frac53 \approx 1.67$
- $L = 16$: $2 - 1 = 1$
**Implications:** $MP_L > 0$ at all four values, so adding a worker still increases output. But $MP_L$ falls as the workforce grows: at $L = 1$ an extra worker adds about 7 units, while at $L = 16$ an extra worker adds only about 1. The marginal product of labour is diminishing. ($MP_L$ reaches 0 at $L = 64$, after which extra workers would lower output.)`,
      answer: r`$MP_L = \frac{8}{\sqrt L} - 1$: 7, 3, $\frac53$, 1 — positive but diminishing`,
      source: "Assignment 7 Q4",
    },
    {
      id: "differentiation-x13", kind: "calc", sub: "Rates of change",
      prompt: r`Use the definition of the derivative to compute the marginal cost, marginal revenue and marginal profit when $R(x) = dx$ and $C(x) = ax^2 + bx + c$, where $a, b, c, d$ are constants.`,
      marks: 5,
      rubric: [
        { point: r`$C(x+h) - C(x) = 2axh + ah^2 + bh$`, marks: 1.5 },
        { point: r`Divides by $h$ and takes the limit: $MC = 2ax + b$`, marks: 1.5 },
        { point: r`$MR = \lim_{h\to0}\frac{d(x+h)-dx}{h} = d$`, marks: 1 },
        { point: r`Marginal profit $= d - 2ax - b$`, marks: 1 },
      ],
      model: r`**Marginal cost.** $C(x+h) - C(x) = a(x^2+2xh+h^2) + b(x+h) + c - ax^2 - bx - c = 2axh + ah^2 + bh$.
$$C'(x) = \lim_{h\to0}\frac{2axh + ah^2 + bh}{h} = \lim_{h\to0}(2ax + ah + b) = 2ax + b.$$
**Marginal revenue.** $R'(x) = \displaystyle\lim_{h\to0}\frac{d(x+h) - dx}{h} = \lim_{h\to0}\frac{dh}{h} = d$.
**Marginal profit.** $\pi(x) = R(x) - C(x)$, so $\pi'(x) = R'(x) - C'(x) = d - 2ax - b$.`,
      answer: r`$MC = 2ax + b$, $MR = d$, $\pi'(x) = d - 2ax - b$`,
      source: "Lecture Note 5 exercise",
    },
    {
      id: "differentiation-x14", kind: "proof", sub: "Definition of the derivative",
      prompt: r`Let $f(x) = \sqrt x$ for $x > 0$. Use the **definition of the derivative** to show that $f'(x) = \dfrac{1}{2\sqrt x}$.`,
      marks: 5,
      rubric: [
        { point: r`Sets up $\lim_{h\to0}\frac{\sqrt{x+h}-\sqrt x}{h}$`, marks: 1 },
        { point: r`Multiplies by the conjugate $\frac{\sqrt{x+h}+\sqrt x}{\sqrt{x+h}+\sqrt x}$ to get $\frac{h}{h(\sqrt{x+h}+\sqrt x)}$`, marks: 2 },
        { point: r`Cancels $h$ and takes the limit to obtain $\frac{1}{2\sqrt x}$`, marks: 2 },
      ],
      model: r`$$f'(x) = \lim_{h\to0}\frac{\sqrt{x+h}-\sqrt x}{h} = \lim_{h\to0}\frac{(\sqrt{x+h}-\sqrt x)(\sqrt{x+h}+\sqrt x)}{h(\sqrt{x+h}+\sqrt x)} = \lim_{h\to0}\frac{(x+h) - x}{h(\sqrt{x+h}+\sqrt x)}.$$
Cancel $h$: $\displaystyle\lim_{h\to0}\frac{1}{\sqrt{x+h}+\sqrt x} = \frac{1}{\sqrt x + \sqrt x} = \frac{1}{2\sqrt x}$. This agrees with the power rule: $\frac{d}{dx}x^{1/2} = \frac12x^{-1/2}$.`,
      answer: r`$f'(x) = \dfrac{1}{2\sqrt x}$`,
      source: "Modelled on Past paper Q2(b) and Lecture Note 5 limit exercise (c)",
    },
    {
      id: "differentiation-x15", kind: "calc", sub: "Limits",
      prompt: r`Evaluate, if they exist:
(a) $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+4x} - x\right)$ (b) $\displaystyle\lim_{x\to4}\sqrt{x\sqrt{x\sqrt{x\sqrt{x\cdots}}}}$`,
      marks: 5,
      rubric: [
        { point: r`(a) Conjugate gives $\frac{4x}{\sqrt{x^2+4x}+x}$`, marks: 1.5 },
        { point: r`(a) Divides by $x$ and obtains 2`, marks: 1 },
        { point: r`(b) Sets $S$ equal to the expression and uses $S = \sqrt{xS}$`, marks: 1.5 },
        { point: r`(b) $S = x$, limit $= 4$`, marks: 1 },
      ],
      model: r`(a) $$\sqrt{x^2+4x}-x = \frac{(x^2+4x) - x^2}{\sqrt{x^2+4x}+x} = \frac{4x}{\sqrt{x^2+4x}+x} = \frac{4}{\sqrt{1+\frac4x}+1} \to \frac{4}{2} = 2.$$
(b) Let $S = \sqrt{x\sqrt{x\sqrt{x\cdots}}}$. The part under the outer root is $x$ times $S$ again, so $S = \sqrt{xS}$. Squaring: $S^2 = xS$, and since $S > 0$, $S = x$. (Check: $x^{\frac12+\frac14+\frac18+\cdots} = x^1$.) Hence the limit is $\lim_{x\to4}x = 4$.`,
      answer: r`(a) 2 (b) 4`,
      source: "Modelled on Past paper Q1(b) and Q1(d)",
    },
    {
      id: "differentiation-x16", kind: "select", sub: "Rules of differentiation",
      prompt: r`Which TWO of the following statements are wrong?`,
      statements: [
        r`If $f(x) = e^{g(x)}$, then $f'(x) = e^{g(x)}\,g'(x)$.`,
        r`If $y = \ln h(x)$, then $\dfrac{dy}{dx} = \dfrac{h(x)}{h'(x)}$.`,
        r`For any constant $A$, $\dfrac{d}{dx}[f(x) + A] = f'(x)$.`,
        r`If $F(x) = f(x)\,g(x)$, then $F'(x) = f'(x)\,g'(x)$.`,
        r`If $f''(x) \ge 0$ for all $x$, then $f$ is a convex function.`,
        r`If $\lim_{x\to a}f(x) = A$ and $\lim_{x\to a}g(x) = B \neq 0$, then $\lim_{x\to a}\dfrac{f(x)}{g(x)} = \dfrac AB$.`,
      ],
      wrong: [1, 3],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (iv) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong:** the derivative of the inside goes on top: $\frac{d}{dx}\ln h(x) = \frac{h'(x)}{h(x)}$. E.g. $\frac{d}{dx}\ln(x^2+1) = \frac{2x}{x^2+1}$, not $\frac{x^2+1}{2x}$.
**(iv) is wrong:** the product rule is $F'(x) = f'(x)g(x) + f(x)g'(x)$. E.g. $F = x\cdot x = x^2$ has $F' = 2x$, but $f'g' = 1\cdot1 = 1$.
(i) is the chain rule for $e^{g(x)}$; (iii) is Rule 2 (a constant shifts the graph without changing the slope); (v) is the definition of convexity via $f''$; (vi) is limit rule (iii), which needs $B \neq 0$.`,
      answer: "(ii) and (iv)",
      source: "Lecture Note 5 rules",
    },
  ],
};

export default data;
