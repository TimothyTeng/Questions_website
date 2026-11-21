import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "optimisation",

  // ================================================================ sections
  sections: [
    // ------------------------------------------------------------ 7.1
    {
      title: "7.1 Introduction",
      intro: r`Optimisation means finding where a function reaches its **largest** or **smallest** value. In economics: the output that maximises profit or revenue, or the point where cost is lowest.`,
      points: [
        {
          term: "Extreme points",
          text: r`Points in the domain of a function where it reaches its largest and its smallest values are called **maximum** and **minimum points**, or **extreme points**.`,
        },
        {
          term: "Maximum point",
          text: r`If $f(x)$ has domain $D$, then $c \in D$ is a maximum point for $f$ $\iff$ $f(x) \le f(c)$ for all $x \in D$.`,
        },
        {
          term: "Minimum point",
          text: r`$d \in D$ is a minimum point for $f$ $\iff$ $f(x) \ge f(d)$ for all $x \in D$.`,
        },
        {
          term: "Strict maximum / minimum",
          text: r`If $f(c)$ is strictly larger than the value at any other point of $D$, $c$ is a **strict** maximum point. Similarly $d$ is a strict minimum point if $f(x) > f(d)$ for all $x \in D$, $x \ne d$.`,
        },
        {
          term: "Max ↔ min conversion",
          text: r`We can easily turn a maximisation problem into a minimisation problem and vice versa: $c$ maximises $f$ exactly when $c$ minimises $-f$. The graph of $-f$ is the graph of $f$ flipped about the $x$-axis.`,
          eg: r`$f(x) = -x^2 + 2x + 1$ has a maximum at $x = 1$, so $-f(x) = x^2 - 2x - 1$ has a minimum at $x = 1$. Likewise $x^2$ is smallest at $x = 0$, so $-x^2$ is largest at $x = 0$.`,
        },
        {
          term: "Necessary first-order condition (F.O.C.)",
          text: r`Suppose $f$ is differentiable in an interval $I$ and $c$ is an **interior** point of $I$. For $x = c$ to be a maximum or minimum point of $f$ in $I$, a necessary condition is $f'(c) = 0$.`,
        },
        {
          term: "Stationary point",
          text: r`A point $c$ with $f'(c) = 0$ is called a stationary point (the tangent there is horizontal).`,
        },
        {
          term: "Necessary, NOT sufficient",
          text: r`$f'(x) = 0$ is necessary for a differentiable function to have a maximum or minimum at an interior point, but it is **not sufficient**: it does not tell you whether the point is a max, a min, or neither (e.g. $f(x) = x^3$ has $f'(0) = 0$ but no max or min at $0$).`,
        },
        {
          term: "Non-differentiable points",
          text: r`If $f$ is not differentiable everywhere in $I$, we cannot rely on $f'(x) = 0$ alone: at a point $x = d$ where $f'(d)$ is undefined (a sharp corner/cusp) the function can still have its minimum or maximum.`,
        },
      ],
      formulas: [
        { name: "Maximum point", tex: r`c \text{ is a max point} \iff f(x) \le f(c)\ \ \forall x \in D` },
        { name: "Minimum point", tex: r`d \text{ is a min point} \iff f(x) \ge f(d)\ \ \forall x \in D` },
        { name: "First-order condition (interior, differentiable)", tex: r`f'(c) = 0` },
        { name: "Max of f = min of −f", tex: r`\max_x f(x) \iff \min_x \,[-f(x)]` },
      ],
      figures: [
        {
          title: "Maximum of f = minimum of −f",
          xr: [-1.5, 3.5],
          yr: [-3, 3],
          curves: [
            { f: "-x^2 + 2*x + 1", label: "f(x)" },
            { f: "x^2 - 2*x - 1", label: "−f(x)", tone: 1 },
          ],
          points: [
            { at: [1, 2], label: "max (1, 2)" },
            { at: [1, -2], label: "min (1, −2)", tone: 1 },
          ],
          segments: [
            { from: [1, 2], to: [1, -2], dashed: true, tone: 3 },
            { from: [0.4, 2], to: [1.6, 2], tone: 3 },
            { from: [0.4, -2], to: [1.6, -2], tone: 3 },
          ],
          caption: "Flipping the graph about the x-axis turns the maximum at x = 1 into a minimum at x = 1. At both points the tangent is horizontal: f′(1) = 0.",
        },
        {
          title: "Minimum at a point where f′ does not exist",
          xr: [0, 4.5],
          yr: [0, 3],
          curves: [{ f: "1 + sqrt(abs(x-2))", from: 0.5, to: 4 }],
          points: [
            { at: [0.5, 2.2247], label: "a" },
            { at: [2, 1], label: "d: min, f′(d) undefined", guides: true, tone: 1 },
            { at: [4, 2.4142], label: "b: max", guides: true, tone: 2 },
          ],
          caption: "Like Example [4]: the graph has a sharp point at x = d, so f′(d) does not exist — yet the minimum is there. Setting f′(x) = 0 would never find it.",
        },
      ],
      worked: [
        {
          problem: r`**Example [2]** $f(x) = -x^2 + 2x + 1$. Where is the maximum? What about $-f(x)$?`,
          solution: r`$f'(x) = -2x + 2 = 0 \Rightarrow x = 1$, and $f(1) = -1 + 2 + 1 = 2$. Since $f(x) = 2 - (x-1)^2 \le 2$ for all $x$, $x = 1$ is a maximum point.
Then $-f(x) = x^2 - 2x - 1 = (x-1)^2 - 2 \ge -2$, so $-f$ has a **minimum** at the same point $x = 1$.`,
          source: "Lecture Note 7 Example [2]",
        },
        {
          problem: r`**Example [3]** $f(x) = x^2$. Where is the smallest value? How about $-f(x) = -x^2$?`,
          solution: r`$x^2 \ge 0 = f(0)$ for all $x$, so the minimum is at $x = 0$.
$-x^2 \le 0$ for all $x$, so $-x^2$ has its **maximum** at $x = 0$ — the same point, with min and max swapped.`,
          source: "Lecture Note 7 Example [3]",
        },
      ],
    },

    // ------------------------------------------------------------ 7.2
    {
      title: "7.2 Simple Tests for Extreme Points",
      intro: r`The **first-derivative test**: look at the sign of $f'(x)$ on each side of the stationary point.`,
      points: [
        {
          term: "Set-up",
          text: r`Suppose $f(x)$ is differentiable in an interval $I$ and has only **one** stationary point $x = c$ (so $f'(c) = 0$).`,
        },
        {
          term: "Maximum (first-derivative test)",
          text: r`If $f'(x) \ge 0$ for $x \le c$ and $f'(x) \le 0$ for $x \ge c$, then $x = c$ is a **maximum** point: $f$ rises up to $c$ and falls after it.`,
          eg: r`Example [5]: $f(x) = -x^2$, $f'(x) = -2x = 0 \Rightarrow x = 0$. For $x < 0$, $f'(x) > 0$; for $x > 0$, $f'(x) < 0$. So $f$ has a maximum at $x = 0$.`,
        },
        {
          term: "Minimum (first-derivative test)",
          text: r`If $f'(x) \le 0$ for $x \le c$ and $f'(x) \ge 0$ for $x \ge c$, then $x = c$ is a **minimum** point: $f$ falls down to $c$ and rises after it.`,
          eg: r`Example [6]: $f(x) = x^2 - x - 6$, $f'(x) = 2x - 1 = 0 \Rightarrow x = 0.5$. $f'(0.49) = -0.02 < 0$ and $f'(0.51) = 0.02 > 0$, so $x = 0.5$ is a minimum.`,
        },
        {
          term: "Relative (local) extrema",
          text: r`When $f$ has several stationary points (Assignment 8 Q3), apply the same sign check **near each one**: $f'$ changing from $+$ to $-$ gives a relative maximum, from $-$ to $+$ a relative minimum. If $f'$ does not change sign, the point is neither.`,
        },
        {
          term: "Checking the sign",
          text: r`Factorise $f'(x)$ and read its sign on each interval between the stationary points, or plug in a test value on each side (as the notes do with $0.49$ and $0.51$).`,
        },
        {
          term: "Revenue maximisation by increasing/decreasing",
          text: r`For a total revenue function, $MR = TR'(Q)$. Where $MR > 0$, TR is increasing; where $MR < 0$, TR is decreasing. The revenue-maximising $Q$ is where MR switches from positive to negative ($MR = 0$).`,
          eg: r`Assignment 7 Q3: $P = 6 - \tfrac12 Q$ gives $TR = 6Q - \tfrac12 Q^2$, $MR = 6 - Q$: TR rises for $Q < 6$, falls for $Q > 6$, so maximum revenue $TR = 18$ at $Q = 6$.`,
        },
      ],
      formulas: [
        { name: "First-derivative test: maximum", tex: r`f'(x) \ge 0 \ (x \le c),\quad f'(x) \le 0 \ (x \ge c) \;\Rightarrow\; c \text{ is a max}` },
        { name: "First-derivative test: minimum", tex: r`f'(x) \le 0 \ (x \le c),\quad f'(x) \ge 0 \ (x \ge c) \;\Rightarrow\; c \text{ is a min}` },
      ],
      table: [
        ["Sign of $f'$ left of $c$", "Sign of $f'$ right of $c$", "Conclusion at $c$"],
        ["$+$ (rising)", "$-$ (falling)", "maximum"],
        ["$-$ (falling)", "$+$ (rising)", "minimum"],
        ["same sign on both sides", "same sign on both sides", "neither (no max or min)"],
      ],
      figures: [
        {
          title: "Example [6]: f(x) = x² − x − 6 and its derivative",
          xr: [-2, 3],
          yr: [-7, 5],
          curves: [
            { f: "x^2 - x - 6", label: "f(x)" },
            { f: "2*x - 1", label: "f′(x)", tone: 1, dashed: true },
          ],
          points: [
            { at: [0.5, -6.25], label: "min (0.5, −6.25)", guides: true },
            { at: [0.5, 0], label: "f′ = 0", tone: 1 },
          ],
          labels: [
            { at: [-1.4, -1.6], text: "f′ < 0: f falls", tone: 1 },
            { at: [1.7, 0.4], text: "f′ > 0: f rises", tone: 1 },
          ],
          caption: "f′ changes from negative to positive at x = 0.5, so the first-derivative test gives a minimum there.",
        },
        {
          title: "Assignment 8 Q3: C(Q) = Q³ − 5Q² + 8Q + 20",
          x: "Q",
          y: "C",
          xr: [0, 3],
          yr: [19.5, 26.5],
          curves: [{ f: "x^3 - 5*x^2 + 8*x + 20", label: "C(Q)" }],
          points: [
            { at: [1.3333, 24.1481], label: "relative max (4/3, 24.15)", guides: true },
            { at: [2, 24], label: "relative min (2, 24)", guides: true, tone: 1 },
          ],
          caption: "C′ = (3Q − 4)(Q − 2): positive, then negative between 4/3 and 2, then positive again.",
        },
      ],
      worked: [
        {
          problem: r`**Example [6]** Use the simple test to classify the stationary point of $f(x) = x^2 - x - 6$.`,
          solution: r`$f'(x) = 2x - 1 = 0 \Rightarrow x = 0.5$.
If $x < 0.5$, e.g. $x = 0.49$: $f'(0.49) = 0.98 - 1 < 0$.
If $x > 0.5$, e.g. $x = 0.51$: $f'(0.51) = 1.02 - 1 = 0.02 > 0$.
$f'$ goes from negative to positive, so $x = 0.5$ is a minimum, with $f(0.5) = 0.25 - 0.5 - 6 = -6.25$.`,
          source: "Lecture Note 7 Example [6]",
        },
        {
          problem: r`**Assignment 8 Q3** The cost function is $C(Q) = Q^3 - 5Q^2 + 8Q + 20$. Use the first-derivative test to find the relative extrema.`,
          solution: r`$C'(Q) = 3Q^2 - 10Q + 8 = (3Q - 4)(Q - 2) = 0 \Rightarrow Q = \tfrac43$ or $Q = 2$.
Sign of $C'$: for $Q < \tfrac43$ (e.g. $Q = 1$) $C' = 1 > 0$; for $\tfrac43 < Q < 2$ (e.g. $Q = 1.5$) $C' = -0.25 < 0$; for $Q > 2$ (e.g. $Q = 3$) $C' = 5 > 0$.
- At $Q = \tfrac43$: $C'$ changes $+ \to -$, a **relative maximum**, $C(\tfrac43) = \tfrac{652}{27} \approx 24.15$.
- At $Q = 2$: $C'$ changes $- \to +$, a **relative minimum**, $C(2) = 8 - 20 + 16 + 20 = 24$.`,
          source: "Assignment 8 Q3",
        },
        {
          problem: r`**Assignment 7 Q3(e)** The inverse demand is $P = 6 - \tfrac12 Q$. Using MR and where TR is increasing/decreasing, find the revenue-maximising $Q$. Does it make sense?`,
          solution: r`$TR = PQ = 6Q - \tfrac12 Q^2$ (for $0 \le Q \le 12$, so that $P \ge 0$), $MR = TR'(Q) = 6 - Q$.
$MR > 0$ for $0 \le Q < 6$: TR increasing. $MR < 0$ for $6 < Q \le 12$: TR decreasing.
So TR is maximised at $Q = 6$, $TR = 36 - 18 = 18$ (price $P = 3$).
It makes sense: while MR is positive, selling one more unit adds revenue; beyond $Q = 6$ the price cut needed to sell more units lowers total revenue.`,
          source: "Assignment 7 Q3(e)",
        },
      ],
    },

    // ------------------------------------------------------------ 7.3
    {
      title: "7.3 The Extreme Value Theorem",
      intro: r`On a **closed, bounded** interval a continuous function always has a maximum and a minimum — and they can sit at the end points.`,
      points: [
        {
          term: "Extreme value theorem",
          text: r`If $f$ is a **continuous** function over a **closed bounded** interval $[a, b]$, then there is a point $d$ in $[a,b]$ where $f$ has a minimum and a point $c$ in $[a,b]$ where $f$ has a maximum: $f(d) \le f(x) \le f(c)$ for all $x$ in $[a, b]$.`,
        },
        {
          term: "Intuitive but hard to prove",
          text: r`The theorem is very intuitive, but its proof is extremely difficult (not examined).`,
        },
        {
          term: "Three types of candidates",
          text: r`Every extreme point must be one of:
- an **interior** point of $I$ where $f'(x) = 0$ (stationary point);
- an **end point** of $I$ (if the end points are included, i.e. a closed interval);
- an interior point of $I$ where $f'$ **does not exist**.`,
        },
        {
          term: "Summary [1]",
          text: r`If $f$ is differentiable on the whole interval: find the stationary points **and** the boundary points, then compare the $f(x)$ values — the largest is the maximum, the smallest the minimum.`,
        },
        {
          term: "Summary [2]",
          text: r`If $f$ is not differentiable somewhere, you must also check all the non-differentiable points.`,
        },
        {
          term: "Economic capacity limits",
          text: r`A capacity limit (e.g. at most 1500 cars a year) makes the domain a closed interval $[0, \text{capacity}]$. The profit at $q = 0$ and at full capacity must be compared with the stationary points — the best output may be at capacity.`,
        },
      ],
      formulas: [
        { name: "Extreme value theorem", tex: r`f \text{ continuous on } [a,b] \;\Rightarrow\; \exists\, c, d \in [a,b]:\ f(d) \le f(x) \le f(c)\ \ \forall x \in [a,b]` },
        { name: "Candidates on [a, b]", tex: r`\{\,x : f'(x) = 0\,\} \;\cup\; \{a,\, b\} \;\cup\; \{\,x : f'(x) \text{ does not exist}\,\}` },
      ],
      figures: [
        {
          title: "Example [7]: f(x) = 3x² − 6x + 5 on [0, 3]",
          xr: [-0.3, 3.4],
          yr: [0, 15.5],
          curves: [{ f: "3*x^2 - 6*x + 5", from: 0, to: 3 }],
          points: [
            { at: [0, 5], label: "f(0) = 5" },
            { at: [1, 2], label: "min (1, 2)", guides: true, tone: 1 },
            { at: [3, 14], label: "max (3, 14)", guides: true, tone: 2 },
          ],
          caption: "The minimum is at the stationary point x = 1, but the maximum is at the end point x = 3, where f′(3) = 12 ≠ 0.",
        },
        {
          title: "Past paper Q3(a): profit with capacity 1500 (millions of dollars)",
          x: "q",
          y: "profit (millions)",
          xr: [0, 1600],
          yr: [-30, 120],
          curves: [{ f: "30 - 0.36*x + 0.00075*x^2 - x^3/3000000", from: 0, to: 1500 }],
          points: [
            { at: [0, 30], label: "q = 0: 30" },
            { at: [300, -19.5], label: "local min (300, −19.5)", tone: 1 },
            { at: [1200, 102], label: "max (1200, 102)", guides: true, tone: 2 },
            { at: [1500, 52.5], label: "capacity: 52.5", tone: 3 },
          ],
          caption: "Compare the stationary points q = 300, 1200 with the end points q = 0, 1500: the largest profit is 102 million at q = 1200.",
        },
      ],
      worked: [
        {
          problem: r`**Example [7]** Find the maximum and minimum of $f(x) = 3x^2 - 6x + 5$ with $x \in [0, 3]$.`,
          solution: r`$f$ is differentiable (so continuous) everywhere on the closed interval $[0,3]$, so a maximum and a minimum exist.
$f'(x) = 6x - 6 = 0 \Rightarrow x = 1$, and $f(1) = 3 - 6 + 5 = 2$.
End points: $f(0) = 5$, $f(3) = 3 \times 9 - 6 \times 3 + 5 = 14$.
Comparing $2, 5, 14$: the **minimum** is at $x = 1$ ($f = 2$) and the **maximum** is at $x = 3$ ($f = 14$).`,
          source: "Lecture Note 7 Example [7]",
        },
        {
          problem: r`**Past paper Q3(a)** A firm can produce at most 1500 sports cars a year. Selling $q$ cars gives profit $\pi(q) = 30{,}000{,}000 - 360{,}000q + 750q^2 - \tfrac13 q^3$ dollars. How many cars maximise profit?`,
          solution: r`Domain $0 \le q \le 1500$ (closed): by the extreme value theorem a maximum exists, at a stationary point or an end point.
$\pi'(q) = -360{,}000 + 1500q - q^2 = 0 \iff q^2 - 1500q + 360{,}000 = 0 \iff (q - 300)(q - 1200) = 0$.
$\pi''(q) = 1500 - 2q$: $\pi''(300) = 900 > 0$ (local min), $\pi''(1200) = -900 < 0$ (local max).
Compare: $\pi(0) = 30{,}000{,}000$, $\pi(300) = -19{,}500{,}000$, $\pi(1200) = 102{,}000{,}000$, $\pi(1500) = 52{,}500{,}000$.
The producer should sell **1200 cars**, earning a maximum profit of 102,000,000 dollars.`,
          source: "Past paper Q3(a)",
        },
        {
          problem: r`**Assignment 8 Q4** $R(Q) = 1200Q - 2Q^2$, $C(Q) = Q^3 - 61.25Q^2 + 1528.5Q + 200$. (a) Find $\pi(Q)$. (b) Find $Q^*$ with $\pi'(Q^*) = 0$. (c) Which output maximises profit? Confirm with the first-derivative test.`,
          solution: r`(a) $\pi(Q) = R - C = -Q^3 + 59.25Q^2 - 328.5Q - 200$.
(b) $\pi'(Q) = -3Q^2 + 118.5Q - 328.5 = -3(Q^2 - 39.5Q + 109.5) = -3(Q - 3)(Q - 36.5) = 0 \Rightarrow Q^* = 3$ or $Q^* = 36.5$.
(c) Sign of $\pi'$: negative for $0 < Q < 3$, positive for $3 < Q < 36.5$, negative for $Q > 36.5$.
At $Q = 36.5$, $\pi'$ changes $+ \to -$: maximum, $\pi(36.5) = 18{,}118.4375 \approx 18{,}118.44$. ($Q = 3$ is a local minimum with $\pi(3) = -679.25$.) Profit is maximised at **$Q = 36.5$**.`,
          source: "Assignment 8 Q4",
        },
      ],
    },

    // ------------------------------------------------------------ 7.4
    {
      title: "7.4 Local Extreme Points",
      intro: r`A **local** (relative) max/min is the highest/lowest point compared with nearby points only; the **global** max/min is over the whole interval.`,
      points: [
        {
          term: "Local maxima and minima",
          text: r`Picture a graph on $[a, b]$ with mountain tops $P_1$ (at $c_1$), $P_2$ (at $c_2$) and valley bottoms $Q_1$ (at $d_1$), $Q_2$ (at $d_2$). The mountain tops are **local maxima** and the valley bottoms are **local minima**.`,
        },
        {
          term: "Local vs global",
          text: r`For the whole interval $[a,b]$ in that figure, the global maximum is at the end point $x = b$ and the global minimum at $x = a$. On the smaller interval $(a, d_1)$, $P_1$ at $c_1$ is a maximum; on $(a, d_2)$, $P_2$ at $c_2$ is; on $(a, c_2)$ or $(c_1, b)$, $Q_1$ at $d_1$ is a minimum.`,
        },
        {
          term: "Why a second test",
          text: r`$f'(c) = 0$ does not tell us whether $c$ is a maximum or minimum — we need the **second-derivative test**.`,
        },
        {
          term: "Second-derivative test",
          text: r`Let $f$ be twice differentiable in $I$ and $c$ an interior point of $I$.
- $f'(c) = 0$ and $f''(c) < 0$ $\Rightarrow$ $x = c$ is a **strict local maximum** point.
- $f'(c) = 0$ and $f''(c) > 0$ $\Rightarrow$ $x = c$ is a **strict local minimum** point.`,
        },
        {
          term: "Geometric intuition",
          text: r`Case A, $f''(c) < 0$: the slope is decreasing through $0$ (from $+$ to $-$), the curve bends down like a cap — a peak. Case B, $f''(c) > 0$: the slope is increasing through $0$ (from $-$ to $+$), the curve bends up like a cup — a valley.`,
        },
        {
          term: "Remark: f″(c) = 0",
          text: r`If $f'(c) = 0$ and $f''(c) = 0$, the test is inconclusive: $x = c$ can be a max, a min, or neither. E.g. at $x = 0$: $x^4$ has a min, $-x^4$ a max, $x^3$ neither. Use the first-derivative test (sign of $f'$) instead.`,
        },
        {
          term: "Only local!",
          text: r`Without checking the whole interval, the second-derivative test only tells you a point is a **local** max/min. In Example [9], $f(-2)$ is a local maximum but not the global one, because $x^2e^x \to \infty$ as $x \to \infty$.`,
        },
      ],
      formulas: [
        { name: "Second-derivative test: max", tex: r`f'(c) = 0,\ f''(c) < 0 \;\Rightarrow\; \text{strict local max at } c` },
        { name: "Second-derivative test: min", tex: r`f'(c) = 0,\ f''(c) > 0 \;\Rightarrow\; \text{strict local min at } c` },
        { name: "Inconclusive case", tex: r`f'(c) = 0,\ f''(c) = 0 \;\Rightarrow\; \text{max, min or neither}` },
      ],
      figures: [
        {
          title: "Example [8]/[11]: f(x) = x³/9 − x²/6 − 2x/3 + 1",
          xr: [-3, 4],
          yr: [-1.5, 2.5],
          curves: [{ f: "x^3/9 - x^2/6 - 2*x/3 + 1" }],
          points: [
            { at: [-1, 1.3889], label: "local max (−1, 25/18)", guides: true },
            { at: [2, -0.1111], label: "local min (2, −1/9)", guides: true, tone: 1 },
            { at: [0.5, 0.6389], label: "inflection x = 1/2", tone: 2 },
          ],
          caption: "f″(−1) = −1 < 0 gives the local max, f″(2) = 1 > 0 the local min; the inflection point lies halfway between them.",
        },
        {
          title: "Case A and Case B of the second-derivative test",
          xr: [-0.5, 4.5],
          yr: [0, 5],
          curves: [
            { f: "4 - 2*(x-1)^2", from: -0.3, to: 2.3 },
            { f: "1 + 2*(x-3)^2", from: 1.7, to: 4.3, tone: 1 },
          ],
          points: [
            { at: [1, 4], label: "f″(c) < 0: max" },
            { at: [3, 1], label: "f″(c) > 0: min", tone: 1 },
          ],
          segments: [
            { from: [0.4, 4], to: [1.6, 4], dashed: true, tone: 3 },
            { from: [2.4, 1], to: [3.6, 1], dashed: true, tone: 3 },
          ],
          caption: "Both points are stationary (horizontal tangent). Bending down (cap) → maximum; bending up (cup) → minimum.",
        },
        {
          title: "Example [9]: y = x²eˣ",
          xr: [-5, 1],
          yr: [-0.2, 2.8],
          curves: [{ f: "x^2*exp(x)" }],
          points: [
            { at: [-2, 0.5413], label: "local max (−2, 4e⁻²)", guides: true },
            { at: [0, 0], label: "local min (0, 0)", tone: 1 },
          ],
          caption: "f(−2) ≈ 0.54 is only a local maximum: the graph shoots above it for x > 0.",
        },
        {
          title: "Remark: f′(0) = f″(0) = 0 can be anything",
          xr: [-1.2, 1.2],
          yr: [-1.5, 1.5],
          curves: [
            { f: "x^4", tone: 1 },
            { f: "-x^4", tone: 2 },
            { f: "x^3" },
          ],
          points: [{ at: [0, 0] }],
          labels: [
            { at: [0.55, 1.25], text: "x⁴: min", tone: 1 },
            { at: [0.55, -1.25], text: "−x⁴: max", tone: 2 },
            { at: [-0.95, 0.35], text: "x³: neither" },
          ],
          caption: "All three have f′(0) = 0 and f″(0) = 0, yet 0 is a min, a max and neither respectively.",
        },
      ],
      worked: [
        {
          problem: r`**Example [8]** $f(x) = \tfrac19 x^3 - \tfrac16 x^2 - \tfrac23 x + 1$. Find the value(s) with $f'(x) = 0$ and classify them.`,
          solution: r`$f'(x) = \tfrac13 x^2 - \tfrac13 x - \tfrac23 = \tfrac13(x^2 - x - 2) = \tfrac13(x - 2)(x + 1)$, so $f'(x) = 0$ at $x = -1$ and $x = 2$. (The slide prints $x = 1$ and $x = -2$, but factorising — and the graph — show $x = -1$ and $x = 2$.)
$f''(x) = \tfrac23 x - \tfrac13$: $f''(-1) = -1 < 0$ → local max, $f(-1) = \tfrac{25}{18}$; $f''(2) = 1 > 0$ → local min, $f(2) = -\tfrac19$.`,
          source: "Lecture Note 7 Example [8]",
        },
        {
          problem: r`**Example [9]** $f(x) = x^2e^x$. Find the stationary points and the maxima/minima (if they exist).`,
          solution: r`(i) $f'(x) = 2xe^x + x^2e^x = (2 + x)xe^x = 0 \Rightarrow x = -2$ or $x = 0$ (since $e^x > 0$).
(ii) $f''(x) = (2e^x + 2xe^x) + (2xe^x + x^2e^x) = (2 + 4x + x^2)e^x$.
$f''(-2) = (2 - 8 + 4)e^{-2} = -2e^{-2} < 0$ → $f(-2) = 4e^{-2} \approx 0.541$ is a **local maximum**.
$f''(0) = 2e^0 = 2 > 0$ → $f(0) = 0$ is a **local minimum**.
Without checking the whole domain we can only call them local: in fact $f(0) = 0$ is also the global min (as $x^2e^x \ge 0$), but $f(-2)$ is not the global max ($f \to \infty$ as $x \to \infty$).`,
          source: "Lecture Note 7 Example [9]",
        },
        {
          problem: r`**Past paper Q3(b)** The inverse demand is $p = (650 - 0.25q)^{3/2}$. What output maximises total revenue? Confirm with the second-derivative test.`,
          solution: r`$TR(q) = q(650 - 0.25q)^{3/2}$ for $0 \le q \le 2600$ (price $\ge 0$).
Product + chain rule: $TR'(q) = (650 - 0.25q)^{3/2} + q \cdot \tfrac32(650 - 0.25q)^{1/2}(-0.25)$
$= (650 - 0.25q)^{1/2}\,[\,650 - 0.25q - 0.375q\,] = (650 - 0.25q)^{1/2}(650 - 0.625q)$.
$TR' = 0 \Rightarrow q = 1040$ (or $q = 2600$, where $p = 0$ and $TR = 0$).
$TR''(q) = -\tfrac18(650 - 0.25q)^{-1/2}(650 - 0.625q) - 0.625(650 - 0.25q)^{1/2}$.
At $q = 1040$ the first term is $0$: $TR''(1040) = -0.625\sqrt{390} \approx -12.34 < 0$ → maximum.
Sell **$q = 1040$**: $p = 390^{3/2} \approx 7701.88$, $TR \approx 8{,}009{,}958$.`,
          source: "Past paper Q3(b)",
        },
      ],
    },

    // ------------------------------------------------------------ 7.5
    {
      title: "7.5 Inflection Points",
      intro: r`Concavity describes how the graph **bends**; an inflection point is where the bending switches direction.`,
      points: [
        {
          term: "Concave and convex",
          text: r`$f$ is **concave** if the line segment (chord) joining any two points on the graph is **below** the graph, or on it. $f$ is **convex** if the chord is **above** the graph, or on it.`,
        },
        {
          term: "Inflection point",
          text: r`Points at which a function changes from being convex to concave, or vice versa, are called **inflection points**.`,
          eg: r`If $f''(x) \ge 0$ to the left of $c$ and $f''(x) \le 0$ to the right, the graph changes from convex to concave at $P = (c, f(c))$, and $f''(c) = 0$.`,
        },
        {
          term: "Test for inflection points",
          text: r`Let $f$ have a continuous second derivative in $I$, and $c$ an interior point of $I$.
- If $c$ is an inflection point for $f$, then $f''(c) = 0$ (necessary).
- If $f''(c) = 0$ **and** $f''(x)$ changes sign at $c$, then $c$ is an inflection point (sufficient).`,
        },
        {
          term: "f″(c) = 0 is not enough",
          text: r`Example [10]: $f(x) = x^4$ has $f''(x) = 12x^2$, so $f''(0) = 0$. But $f''(x) \ge 0$ on both sides of $0$ — it does not change sign — so $x = 0$ is **not** an inflection point.`,
        },
        {
          term: "Strictly concave",
          text: r`$f''(x) < 0$ for all $x \in (a, b)$ $\Rightarrow$ $f$ is strictly concave in $(a, b)$.`,
        },
        {
          term: "Strictly convex",
          text: r`$f''(x) > 0$ for all $x \in (a, b)$ $\Rightarrow$ $f$ is strictly convex in $(a, b)$.`,
        },
        {
          term: "Sign of f′ is free",
          text: r`Concavity puts no restriction on the sign of $f'(x)$. Four combinations: (i) $f'' < 0, f' > 0$ and (ii) $f'' < 0, f' < 0$ are concave (increasing / decreasing); (iii) $f'' > 0, f' > 0$ and (iv) $f'' > 0, f' < 0$ are convex (increasing / decreasing).`,
        },
        {
          term: "Cost curves",
          text: r`For a cubic cost function the inflection point of TC is where $TC'' = 0$, which is exactly where marginal cost $MC = TC'$ is smallest: TC is concave while MC falls and convex while MC rises.`,
        },
      ],
      formulas: [
        { name: "Strictly concave", tex: r`f''(x) < 0 \ \ \forall x \in (a,b) \;\Rightarrow\; f \text{ strictly concave on } (a,b)` },
        { name: "Strictly convex", tex: r`f''(x) > 0 \ \ \forall x \in (a,b) \;\Rightarrow\; f \text{ strictly convex on } (a,b)` },
        { name: "Inflection point test", tex: r`f''(c) = 0 \text{ and } f'' \text{ changes sign at } c \;\Rightarrow\; c \text{ is an inflection point}` },
      ],
      table: [
        ["Case", "$f'(x)$", "$f''(x)$", "Shape"],
        ["(i)", "$> 0$", "$< 0$", "increasing, concave"],
        ["(ii)", "$< 0$", "$< 0$", "decreasing, concave"],
        ["(iii)", "$> 0$", "$> 0$", "increasing, convex"],
        ["(iv)", "$< 0$", "$> 0$", "decreasing, convex"],
      ],
      figures: [
        {
          title: "Convex: chord above the graph",
          xr: [-2, 2.5],
          yr: [-0.5, 5],
          curves: [{ f: "x^2", label: "x²" }],
          segments: [{ from: [-1.5, 2.25], to: [2, 4], dashed: true, tone: 1 }],
          points: [
            { at: [-1.5, 2.25], tone: 1 },
            { at: [2, 4], tone: 1 },
          ],
          labels: [{ at: [-0.4, 3.9], text: "chord above → convex", tone: 1 }],
        },
        {
          title: "Concave: chord below the graph",
          xr: [0, 4.5],
          yr: [-2.5, 2],
          curves: [{ f: "ln(x)", label: "ln x" }],
          segments: [{ from: [0.3, -1.204], to: [4, 1.3863], dashed: true, tone: 1 }],
          points: [
            { at: [0.3, -1.204], tone: 1 },
            { at: [4, 1.3863], tone: 1 },
          ],
          labels: [{ at: [2.4, -0.6], text: "chord below → concave", tone: 1 }],
        },
        {
          title: "The four combinations of f′ and f″",
          xr: [-0.2, 7.8],
          yr: [0, 3.3],
          curves: [
            { f: "2.5 - (x-1.5)^2", from: 0, to: 1.5 },
            { f: "2.5 - (x-2)^2", from: 2, to: 3.5 },
            { f: "0.25 + (x-4)^2", from: 4, to: 5.5, tone: 1 },
            { f: "0.25 + (x-7.5)^2", from: 6, to: 7.5, tone: 1 },
          ],
          labels: [
            { at: [0.5, 3.0], text: "(i) f′>0, f″<0" },
            { at: [2.6, 3.0], text: "(ii) f′<0, f″<0" },
            { at: [4.6, 3.0], text: "(iii) f′>0, f″>0", tone: 1 },
            { at: [6.6, 3.0], text: "(iv) f′<0, f″>0", tone: 1 },
          ],
          caption: "(i), (ii) concave (bend down); (iii), (iv) convex (bend up) — whether the function rises or falls.",
        },
        {
          title: "TC = 2Q³ − 18Q² + 60Q + 250: inflection at Q = 3",
          x: "Q",
          y: "TC",
          xr: [0, 6.2],
          yr: [240, 420],
          curves: [{ f: "2*x^3 - 18*x^2 + 60*x + 250", label: "TC" }],
          points: [{ at: [3, 322], label: "inflection (3, 322)", guides: true, tone: 2 }],
          labels: [
            { at: [0.8, 335], text: "concave: TC″ < 0" },
            { at: [4.6, 318], text: "convex: TC″ > 0", tone: 1 },
          ],
          caption: "TC″ = 12Q − 36 changes sign from − to + at Q = 3, which is also where MC = TC′ is smallest.",
        },
      ],
      worked: [
        {
          problem: r`**Example [10]** $f(x) = x^4$. Is $x = 0$ an inflection point?`,
          solution: r`$f''(x) = 12x^2$, and $f''(0) = 0$.
But $f''(x) = 12x^2 > 0$ for $x < 0$ and for $x > 0$: $f''$ does **not** change sign at $x = 0$ (the function is convex on both sides). So $x = 0$ is **not** an inflection point — $f''(c) = 0$ alone is not sufficient.`,
          source: "Lecture Note 7 Example [10]",
        },
        {
          problem: r`**Example [11]** Find possible inflection points for $f(x) = \tfrac19 x^3 - \tfrac16 x^2 - \tfrac23 x + 1$.`,
          solution: r`$f'(x) = \tfrac13 x^2 - \tfrac13 x - \tfrac23$, $f''(x) = \tfrac23 x - \tfrac13 = \tfrac13(2x - 1)$.
$f''(x) = 0$ when $x = \tfrac12$, so $\tfrac12$ could be an inflection point.
Before $x = \tfrac12$ ($x < \tfrac12$): $f''(x) < 0$. After ($x > \tfrac12$): $f''(x) > 0$.
$f''(\tfrac12) = 0$ and $f''$ changes sign from negative to positive, so $x = \tfrac12$ **is** an inflection point (concave → convex).`,
          source: "Lecture Note 7 Example [11]",
        },
      ],
    },
  ],

  // ================================================================ flashcards
  flashcards: [
    // ---- concept
    {
      id: "optimisation-c1",
      type: "concept",
      front: r`Points in the domain where a function reaches its largest and its smallest values.`,
      back: "extreme points",
      why: r`Maximum and minimum points together are called extreme points (Lecture Note 7.1).`,
    },
    {
      id: "optimisation-c2",
      type: "concept",
      front: r`A point $c$ with $f'(c) = 0$ (horizontal tangent).`,
      back: "stationary point",
      why: r`The first-order condition $f'(c) = 0$ defines a stationary point — the only interior candidates for a max/min of a differentiable function.`,
    },
    {
      id: "optimisation-c3",
      type: "concept",
      front: r`$f(c)$ is strictly larger than $f(x)$ at every other point $x$ of the domain.`,
      back: "strict maximum point",
      why: r`A strict maximum: $f(x) < f(c)$ for all $x \in D$, $x \ne c$. Without "strict", ties ($f(x) = f(c)$) are allowed.`,
    },
    {
      id: "optimisation-c4",
      type: "concept",
      front: r`The condition $f'(x) = 0$ for an interior max/min of a differentiable function — something that must hold, but does not guarantee a max or min.`,
      back: "necessary condition (first-order condition)",
      why: r`$f'(c) = 0$ is **necessary but not sufficient**: $x^3$ has $f'(0) = 0$ but no extremum at 0.`,
    },
    {
      id: "optimisation-c5",
      type: "concept",
      front: r`A continuous function on a closed bounded interval $[a,b]$ always has a maximum point and a minimum point.`,
      back: "extreme value theorem",
      why: r`$f(d) \le f(x) \le f(c)$ for all $x \in [a,b]$. Very intuitive; the proof is extremely difficult.`,
    },
    {
      id: "optimisation-c6",
      type: "concept",
      front: r`A "mountain top" of the graph: higher than all nearby points, but not necessarily the highest point on the whole interval.`,
      back: "local maximum",
      why: r`In the notes' figure, $P_1$ and $P_2$ are local maxima while the global maximum on $[a,b]$ is at the end point $b$.`,
    },
    {
      id: "optimisation-c7",
      type: "concept",
      front: r`A "valley bottom" of the graph: lower than all nearby points.`,
      back: "local minimum",
      why: r`$Q_1$ and $Q_2$ in the notes' figure; a local minimum need not be the global minimum (that was at the end point $a$).`,
    },
    {
      id: "optimisation-c8",
      type: "concept",
      front: r`The largest value of $f$ over the **whole** interval or domain.`,
      back: "global maximum",
      why: r`Found by comparing all candidates: stationary points, end points and points where $f'$ does not exist.`,
    },
    {
      id: "optimisation-c9",
      type: "concept",
      front: r`A point where a function changes from convex to concave, or from concave to convex.`,
      back: "inflection point",
      why: r`At an inflection point $f''(c) = 0$ and $f''$ changes sign.`,
    },
    {
      id: "optimisation-c10",
      type: "concept",
      front: r`A function whose chord between any two points on the graph lies **below** (or on) the graph.`,
      back: "concave",
      why: r`Concave = bends down like a cap; for twice-differentiable $f$, $f'' < 0$ on $(a,b)$ gives strict concavity.`,
    },
    {
      id: "optimisation-c11",
      type: "concept",
      front: r`A function whose chord between any two points on the graph lies **above** (or on) the graph.`,
      back: "convex",
      why: r`Convex = bends up like a cup; $f'' > 0$ on $(a,b)$ gives strict convexity.`,
    },
    {
      id: "optimisation-c12",
      type: "concept",
      front: r`What we call $f$ on $(a,b)$ when $f''(x) < 0$ for every $x \in (a,b)$.`,
      back: "strictly concave",
      why: r`Definition in Lecture Note 7.5; similarly $f'' > 0$ everywhere on $(a,b)$ means strictly convex.`,
    },

    // ---- formula
    {
      id: "optimisation-f1",
      type: "formula",
      front: "Necessary first-order condition (F.O.C.)",
      back: r`$f'(c) = 0$ at an interior max/min of a differentiable $f$`,
      why: r`Use it to find the stationary points — the interior candidates. It does not classify them.`,
    },
    {
      id: "optimisation-f2",
      type: "formula",
      front: "First-derivative test for a maximum",
      back: r`$f'(x) \ge 0$ for $x \le c$ and $f'(x) \le 0$ for $x \ge c$ $\Rightarrow$ $c$ is a max`,
      why: r`The function rises up to $c$ and falls after it. For a relative max, check the sign change just around $c$.`,
    },
    {
      id: "optimisation-f3",
      type: "formula",
      front: "First-derivative test for a minimum",
      back: r`$f'(x) \le 0$ for $x \le c$ and $f'(x) \ge 0$ for $x \ge c$ $\Rightarrow$ $c$ is a min`,
      why: r`The function falls down to $c$ and rises after it (Example [6], $x^2 - x - 6$ at $x = 0.5$).`,
    },
    {
      id: "optimisation-f4",
      type: "formula",
      front: "Second-derivative test",
      back: r`$f'(c) = 0, f''(c) < 0$ ⇒ strict local max; $f'(c) = 0, f''(c) > 0$ ⇒ strict local min`,
      why: r`Needs $f$ twice differentiable and $c$ interior. If $f''(c) = 0$ the test says nothing (max, min or neither).`,
    },
    {
      id: "optimisation-f5",
      type: "formula",
      front: "Extreme value theorem (inequality form)",
      back: r`$f$ continuous on $[a,b]$ ⇒ $\exists\, c, d$: $f(d) \le f(x) \le f(c)$ for all $x \in [a,b]$`,
      why: r`Guarantees the max and min exist on a closed bounded interval; then compare stationary points, end points and non-differentiable points.`,
    },
    {
      id: "optimisation-f6",
      type: "formula",
      front: "Test for inflection points",
      back: r`Inflection at $c$ ⇒ $f''(c) = 0$; and $f''(c) = 0$ with $f''$ changing sign at $c$ ⇒ inflection at $c$`,
      why: r`$f''(c) = 0$ is necessary, the sign change makes it sufficient ($x^4$ fails the sign change at 0).`,
    },
    {
      id: "optimisation-f7",
      type: "formula",
      front: "Strict concavity / convexity from f″",
      back: r`$f'' < 0$ on $(a,b)$ ⇒ strictly concave; $f'' > 0$ on $(a,b)$ ⇒ strictly convex`,
      why: r`The sign of $f'$ does not matter: a concave function can be increasing or decreasing.`,
    },
    {
      id: "optimisation-f8",
      type: "formula",
      front: "Max ↔ min conversion",
      back: r`$c$ maximises $f$ $\iff$ $c$ minimises $-f$`,
      why: r`Example [2]: $-x^2 + 2x + 1$ has a max at $x = 1$; $x^2 - 2x - 1$ has a min at $x = 1$.`,
    },
    {
      id: "optimisation-f9",
      type: "formula",
      front: "Profit-maximising first-order condition",
      back: r`$\pi(Q) = R(Q) - C(Q)$, $\pi'(Q) = R'(Q) - C'(Q) = 0$, i.e. $MR = MC$`,
      why: r`Then classify with the first- or second-derivative test, and check end points if output is restricted (capacity).`,
    },
    {
      id: "optimisation-f10",
      type: "formula",
      front: "Candidates for a global extremum on an interval I",
      back: r`Interior points with $f'(x) = 0$; end points (if in $I$); interior points where $f'$ does not exist`,
      why: r`Every extreme point belongs to one of these three cases — evaluate $f$ at all of them and compare.`,
    },

    // ---- method
    {
      id: "optimisation-m1",
      type: "method",
      front: r`Find the maximum and minimum of $f(x) = 3x^2 - 6x + 5$ on $[0, 3]$.`,
      back: r`Stationary point $x = 1$ ($f = 2$); end points $f(0) = 5$, $f(3) = 14$ ⇒ min 2 at $x = 1$, max 14 at $x = 3$.`,
      why: r`1. $f$ is continuous on a closed interval ⇒ max and min exist (extreme value theorem).
2. $f'(x) = 6x - 6 = 0 \Rightarrow x = 1$, $f(1) = 2$.
3. End points: $f(0) = 5$, $f(3) = 27 - 18 + 5 = 14$.
4. Compare: smallest 2 (at $x = 1$), largest 14 (at $x = 3$). The max is at an end point, where $f' \ne 0$!`,
    },
    {
      id: "optimisation-m2",
      type: "method",
      front: r`Use the first-derivative test to find the relative extrema of $C(Q) = Q^3 - 5Q^2 + 8Q + 20$.`,
      back: r`$C' = (3Q - 4)(Q - 2)$: relative max at $Q = 4/3$ ($C = 652/27 \approx 24.15$), relative min at $Q = 2$ ($C = 24$).`,
      why: r`1. $C'(Q) = 3Q^2 - 10Q + 8 = (3Q - 4)(Q - 2) = 0 \Rightarrow Q = \tfrac43, 2$.
2. Signs: $C' > 0$ for $Q < \tfrac43$, $C' < 0$ for $\tfrac43 < Q < 2$, $C' > 0$ for $Q > 2$.
3. $+ \to -$ at $\tfrac43$: relative max; $- \to +$ at $2$: relative min.
4. Values: $C(\tfrac43) = \tfrac{652}{27}$, $C(2) = 24$.`,
    },
    {
      id: "optimisation-m3",
      type: "method",
      front: r`Given $R(Q)$ and $C(Q)$, find the profit-maximising output (Assignment 8 Q4: $R = 1200Q - 2Q^2$, $C = Q^3 - 61.25Q^2 + 1528.5Q + 200$).`,
      back: r`$\pi = R - C$, solve $\pi'(Q) = 0$ ⇒ $Q = 3, 36.5$; $\pi'$ goes $+ \to -$ at $36.5$ ⇒ max at $Q = 36.5$.`,
      why: r`1. $\pi(Q) = -Q^3 + 59.25Q^2 - 328.5Q - 200$.
2. $\pi'(Q) = -3Q^2 + 118.5Q - 328.5 = -3(Q - 3)(Q - 36.5)$.
3. First-derivative test: $\pi' < 0$ on $(0, 3)$, $> 0$ on $(3, 36.5)$, $< 0$ for $Q > 36.5$.
4. Max at $Q = 36.5$ with $\pi \approx 18{,}118.44$; $Q = 3$ is a local min.`,
    },
    {
      id: "optimisation-m4",
      type: "method",
      front: r`Maximise profit $\pi(q)$ when output is limited by capacity, $0 \le q \le 1500$ (past paper Q3(a)).`,
      back: r`Closed interval ⇒ compare $\pi$ at stationary points inside $[0, 1500]$ AND at the end points $q = 0$, $q = 1500$.`,
      why: r`1. $\pi'(q) = -360{,}000 + 1500q - q^2 = -(q - 300)(q - 1200) = 0 \Rightarrow q = 300, 1200$.
2. $\pi''(q) = 1500 - 2q$: $q = 300$ local min, $q = 1200$ local max.
3. $\pi(0) = 30$m, $\pi(300) = -19.5$m, $\pi(1200) = 102$m, $\pi(1500) = 52.5$m.
4. Best: $q = 1200$ cars. (If capacity were 1000, $q = 1200$ is infeasible and the max is at the end point $q = 1000$.)`,
    },
    {
      id: "optimisation-m5",
      type: "method",
      front: r`Maximise total revenue for a nonlinear inverse demand $p = (650 - 0.25q)^{3/2}$ (past paper Q3(b)).`,
      back: r`$TR = q(650 - 0.25q)^{3/2}$; $TR' = (650 - 0.25q)^{1/2}(650 - 0.625q) = 0 \Rightarrow q = 1040$; $TR''(1040) < 0$ ⇒ max.`,
      why: r`1. Product + chain rule: $TR' = (650 - 0.25q)^{3/2} - 0.375q(650 - 0.25q)^{1/2}$.
2. Factor out $(650 - 0.25q)^{1/2}$: bracket $650 - 0.625q = 0 \Rightarrow q = 1040$.
3. $TR'' = -\tfrac18(650 - 0.25q)^{-1/2}(650 - 0.625q) - 0.625(650 - 0.25q)^{1/2}$; at $q = 1040$ this is $-0.625\sqrt{390} \approx -12.34 < 0$.
4. Maximum TR $= 1040 \cdot 390^{3/2} \approx 8.01$ million.`,
    },
    {
      id: "optimisation-m6",
      type: "method",
      front: r`Find and classify the stationary points of $f(x) = x^2e^x$ (Example [9]).`,
      back: r`$f' = x(x + 2)e^x = 0 \Rightarrow x = 0, -2$; $f'' = (x^2 + 4x + 2)e^x$: $f''(-2) < 0$ local max, $f''(0) > 0$ local min.`,
      why: r`1. Product rule: $f'(x) = 2xe^x + x^2e^x = (2 + x)xe^x$; $e^x > 0$ so $x = 0$ or $x = -2$.
2. $f''(x) = (2 + 4x + x^2)e^x$.
3. $f''(-2) = -2e^{-2} < 0$ → local max $f(-2) = 4e^{-2}$; $f''(0) = 2 > 0$ → local min $f(0) = 0$.
4. Only **local** unless you check the whole domain.`,
    },
    {
      id: "optimisation-m7",
      type: "method",
      front: r`How do you find the inflection points of $f$? (e.g. $f(x) = \tfrac19 x^3 - \tfrac16 x^2 - \tfrac23 x + 1$)`,
      back: r`Solve $f''(x) = 0$, then check that $f''$ changes sign there. Here $f'' = \tfrac13(2x - 1)$ ⇒ inflection at $x = \tfrac12$.`,
      why: r`1. $f'(x) = \tfrac13 x^2 - \tfrac13 x - \tfrac23$, $f''(x) = \tfrac23 x - \tfrac13$.
2. $f''(x) = 0 \Rightarrow x = \tfrac12$ (a candidate).
3. $x < \tfrac12$: $f'' < 0$; $x > \tfrac12$: $f'' > 0$ — sign changes.
4. So $x = \tfrac12$ is an inflection point (concave → convex).`,
    },
    {
      id: "optimisation-m8",
      type: "method",
      front: r`Is $x = 0$ an inflection point of $f(x) = x^4$?`,
      back: r`No: $f''(0) = 0$, but $f''(x) = 12x^2 \ge 0$ does not change sign at 0.`,
      why: r`$f''(c) = 0$ is only necessary. You must also show the sign change. $x^4$ is convex on both sides of 0 (0 is actually its minimum).`,
    },
    {
      id: "optimisation-m9",
      type: "method",
      front: r`The second-derivative test gives $f''(c) = 0$ at a stationary point. What now?`,
      back: r`The test is inconclusive (max, min or neither) — use the first-derivative test: check the sign of $f'$ on each side of $c$.`,
      why: r`$x^4$, $-x^4$ and $x^3$ all have $f'(0) = f''(0) = 0$, but 0 is a min, a max and neither. The sign of $f'$ around $c$ decides: $- \to +$ min, $+ \to -$ max, no change neither.`,
    },
    {
      id: "optimisation-m10",
      type: "method",
      front: r`You found a local maximum with the second-derivative test. How do you decide whether it is the global maximum?`,
      back: r`Check the whole interval: compare with the end points / the behaviour as $x \to \pm\infty$ and the other candidates.`,
      why: r`Example [9]: $x^2e^x$ has a local max at $x = -2$ ($\approx 0.54$), but $f(1) = e > 0.54$ and $f \to \infty$ as $x \to \infty$, so it is not global. On a closed interval, compare all candidate values.`,
    },
    {
      id: "optimisation-m11",
      type: "method",
      front: r`Find the revenue-maximising $Q$ for $P = 6 - \tfrac12 Q$ using only where TR is increasing/decreasing (Assignment 7 Q3(e)).`,
      back: r`$TR = 6Q - \tfrac12 Q^2$, $MR = 6 - Q$: $MR > 0$ for $Q < 6$, $MR < 0$ for $Q > 6$ ⇒ max at $Q = 6$, $TR = 18$.`,
      why: r`TR increases while $MR > 0$ and decreases while $MR < 0$, so the peak is where MR switches sign. It makes sense: beyond $Q = 6$ the price cut needed to sell an extra unit lowers total revenue.`,
    },
    {
      id: "optimisation-m12",
      type: "method",
      front: r`The function has a sharp corner (e.g. $|x - 2|$ on $[0, 5]$). How do you find its max and min?`,
      back: r`Also check the point where $f'$ does not exist: min at $x = 2$ ($f = 0$), max at the end point $x = 5$ ($f = 3$).`,
      why: r`Candidates: stationary points (none here), end points $f(0) = 2$, $f(5) = 3$, and the non-differentiable point $f(2) = 0$. Compare: min 0 at $x = 2$, max 3 at $x = 5$.`,
    },
    {
      id: "optimisation-m13",
      type: "method",
      front: r`How do you tell whether $f$ is concave or convex on an interval, and whether it is increasing or decreasing?`,
      back: r`Sign of $f''$ gives the bending ($< 0$ concave, $> 0$ convex); sign of $f'$ gives the direction ($> 0$ increasing, $< 0$ decreasing).`,
      why: r`Four combinations: (i) $f' > 0, f'' < 0$ increasing concave; (ii) $f' < 0, f'' < 0$ decreasing concave; (iii) $f' > 0, f'' > 0$ increasing convex; (iv) $f' < 0, f'' > 0$ decreasing convex.`,
    },
    {
      id: "optimisation-m14",
      type: "method",
      front: r`Find the stationary points of $f(x) = \tfrac19 x^3 - \tfrac16 x^2 - \tfrac23 x + 1$ (Example [8]).`,
      back: r`$f' = \tfrac13(x^2 - x - 2) = \tfrac13(x - 2)(x + 1) = 0 \Rightarrow x = -1, 2$.`,
      why: r`Take out the common factor $\tfrac13$, then factorise the quadratic. Classify with $f''(x) = \tfrac23 x - \tfrac13$: $f''(-1) = -1 < 0$ local max, $f''(2) = 1 > 0$ local min. (The slide misprints the roots as $1$ and $-2$.)`,
    },
    {
      id: "optimisation-m15",
      type: "method",
      front: r`Find the workforce $L$ that maximises output $Q = 16\sqrt{L} - L$.`,
      back: r`$dQ/dL = 8L^{-1/2} - 1 = 0 \Rightarrow L = 64$; $d^2Q/dL^2 = -4L^{-3/2} < 0$ ⇒ max, $Q = 64$.`,
      why: r`1. $MP_L = 8/\sqrt{L} - 1$ (positive but falling: 7, 3, 5/3, 1 at $L = 1, 4, 9, 16$).
2. $MP_L = 0 \Rightarrow \sqrt{L} = 8 \Rightarrow L = 64$.
3. Second derivative negative for every $L > 0$ → maximum. $Q(64) = 128 - 64 = 64$.`,
    },
    {
      id: "optimisation-m16",
      type: "method",
      front: r`Find the inflection point of $TC = 2Q^3 - 18Q^2 + 60Q + 250$ and relate it to MC.`,
      back: r`$TC'' = 12Q - 36 = 0 \Rightarrow Q = 3$ (sign $- \to +$): inflection at $(3, 322)$, where $MC$ is minimised ($MC(3) = 6$).`,
      why: r`$MC = TC' = 6Q^2 - 36Q + 60$; $MC' = TC'' = 12Q - 36 = 0$ at $Q = 3$ and $MC'' = 12 > 0$ → MC minimum. TC is concave for $Q < 3$ (MC falling) and convex for $Q > 3$ (MC rising).`,
    },
  ],

  // ================================================================ quiz
  quiz: [
    // ---- 7.1 introduction & FOC
    {
      id: "optimisation-q1",
      kind: "mcq",
      sub: "Definitions",
      prompt: r`For $f$ with domain $D$, the point $c \in D$ is a **maximum point** if and only if…`,
      options: [r`$f(x) \ge f(c)$ for all $x \in D$`, r`$f'(c) = 0$`, r`$f(x) \le f(c)$ for all $x \in D$`, r`$f''(c) < 0$`],
      answer: 2,
      explain: r`By definition $c$ is a maximum point $\iff f(x) \le f(c)$ for every $x$ in the domain. $f'(c) = 0$ and $f''(c) < 0$ are tests that may help find it, not the definition (an end-point max can have $f'(c) \ne 0$).`,
    },
    {
      id: "optimisation-q2",
      kind: "mcq",
      sub: "Definitions",
      prompt: r`$f(x) = -x^2 + 2x + 1$ has a maximum at $x = 1$. Then $-f(x) = x^2 - 2x - 1$ has…`,
      options: ["a maximum at $x = 1$", "a minimum at $x = 1$", "a minimum at $x = -1$", "no minimum"],
      answer: 1,
      explain: r`Multiplying by $-1$ flips the graph about the $x$-axis: the max of $f$ becomes the min of $-f$ at the same $x$. Indeed $x^2 - 2x - 1 = (x-1)^2 - 2$ is smallest at $x = 1$.`,
    },
    {
      id: "optimisation-q3",
      kind: "fill",
      sub: "Definitions",
      prompt: r`$f(x) = -x^2 + 2x + 1$ reaches its maximum value ____ at $x$ = ____.`,
      answers: [["2"], ["1"]],
      explain: r`$f'(x) = -2x + 2 = 0 \Rightarrow x = 1$, and $f(1) = -1 + 2 + 1 = 2$. (Also $f(x) = 2 - (x - 1)^2 \le 2$.)`,
    },
    {
      id: "optimisation-q4",
      kind: "mcq",
      sub: "First-order condition",
      prompt: r`For a differentiable function, the first-order condition $f'(c) = 0$ at an interior point $c$ is…`,
      options: ["sufficient but not necessary", "both necessary and sufficient", "neither necessary nor sufficient", "necessary but not sufficient for $c$ to be a max or min"],
      answer: 3,
      explain: r`Every interior max/min of a differentiable function has $f'(c) = 0$ (necessary), but $f'(c) = 0$ does not guarantee one: $f(x) = x^3$ has $f'(0) = 0$ and no max or min at 0.`,
    },
    {
      id: "optimisation-q5",
      kind: "mcq",
      sub: "First-order condition",
      prompt: r`Which function has a stationary point at $x = 0$ that is **neither** a maximum nor a minimum?`,
      options: [r`$x^3$`, r`$x^2$`, r`$-x^2$`, r`$x^4$`],
      answer: 0,
      explain: r`All four have $f'(0) = 0$. But $x^3 < 0$ for $x < 0$ and $> 0$ for $x > 0$, so 0 is neither; $x^2$ and $x^4$ have a min, $-x^2$ a max.`,
    },
    {
      id: "optimisation-q6",
      kind: "mcq",
      sub: "First-order condition",
      prompt: r`On $[a, b]$ the graph of $f$ has a sharp point (cusp) at $x = d$, where it is lowest. Why can't $f'(x) = 0$ find this minimum?`,
      options: [r`$f'(d) > 0$`, r`$d$ is an end point`, r`$f'(d)$ does not exist, so $d$ is not a stationary point`, r`The minimum of $f$ does not exist`],
      answer: 2,
      explain: r`The F.O.C. only applies where $f$ is differentiable. At a cusp $f'(d)$ is undefined (Example [4]), so points where $f'$ does not exist must be checked separately.`,
    },

    // ---- 7.2 first-derivative test
    {
      id: "optimisation-q7",
      kind: "fill",
      sub: "First-derivative test",
      prompt: r`$f(x) = x^2 - x - 6$ has a stationary point at $x$ = ____, where its minimum value is ____.`,
      answers: [["0.5", "1/2"], ["-6.25", "-25/4"]],
      explain: r`$f'(x) = 2x - 1 = 0 \Rightarrow x = 0.5$. $f'(0.49) < 0$, $f'(0.51) > 0$, so it is a minimum: $f(0.5) = 0.25 - 0.5 - 6 = -6.25$.`,
    },
    {
      id: "optimisation-q8",
      kind: "mcq",
      sub: "First-derivative test",
      prompt: r`$f$ is differentiable with a single stationary point $c$; $f'(x) \ge 0$ for $x \le c$ and $f'(x) \le 0$ for $x \ge c$. Then $c$ is…`,
      options: ["a minimum point", "an inflection point", "impossible to classify without $f''$", "a maximum point"],
      answer: 3,
      explain: r`$f$ rises up to $c$ and falls after it, so $c$ is a maximum (first-derivative test). Example [5]: $f(x) = -x^2$ at $x = 0$.`,
    },
    {
      id: "optimisation-q9",
      kind: "mcq",
      sub: "First-derivative test",
      prompt: r`For $C(Q) = Q^3 - 5Q^2 + 8Q + 20$ (Assignment 8 Q3), the stationary points are…`,
      options: [r`$Q = -\tfrac43$ and $Q = -2$`, r`$Q = \tfrac43$ and $Q = 2$`, r`$Q = 1$ and $Q = \tfrac83$`, r`$Q = \tfrac23$ and $Q = 4$`],
      answer: 1,
      explain: r`$C'(Q) = 3Q^2 - 10Q + 8 = (3Q - 4)(Q - 2) = 0 \Rightarrow Q = \tfrac43$ or $Q = 2$. Check: $3(\tfrac43)^2 - 10(\tfrac43) + 8 = \tfrac{16}{3} - \tfrac{40}{3} + \tfrac{24}{3} = 0$.`,
    },
    {
      id: "optimisation-q10",
      kind: "mcq",
      sub: "First-derivative test",
      prompt: r`For the same cost function, $C'(Q) > 0$ just left of $Q = \tfrac43$ and $C'(Q) < 0$ just right of it. So $Q = \tfrac43$ is…`,
      options: ["a relative maximum", "a relative minimum", "neither", "an inflection point"],
      answer: 0,
      explain: r`$C'$ changes from $+$ to $-$: $C$ rises then falls, so $Q = \tfrac43$ is a relative maximum with $C = \tfrac{652}{27} \approx 24.15$.`,
    },
    {
      id: "optimisation-q11",
      kind: "fill",
      sub: "First-derivative test",
      prompt: r`The relative minimum of $C(Q) = Q^3 - 5Q^2 + 8Q + 20$ is at $Q = 2$, with value ____.`,
      answers: [["24"]],
      explain: r`$C'$ changes from $-$ to $+$ at $Q = 2$. $C(2) = 8 - 20 + 16 + 20 = 24$.`,
    },
    {
      id: "optimisation-q12",
      kind: "fill",
      sub: "Revenue maximisation",
      prompt: r`With inverse demand $P = 6 - \tfrac12 Q$, total revenue is maximised at $Q$ = ____, where maximum revenue is ____.`,
      answers: [["6"], ["18"]],
      explain: r`$TR = 6Q - \tfrac12 Q^2$, $MR = 6 - Q$. $MR > 0$ (TR increasing) for $Q < 6$ and $MR < 0$ (TR decreasing) for $Q > 6$, so the max is at $Q = 6$: $TR = 36 - 18 = 18$.`,
    },
    {
      id: "optimisation-q13",
      kind: "mcq",
      sub: "Revenue maximisation",
      prompt: r`For $P = 6 - \tfrac12 Q$, on which interval is TR **decreasing**?`,
      options: [r`$0 \le Q < 6$`, r`$0 \le Q < 12$`, r`$Q > 12$`, r`$6 < Q \le 12$`],
      answer: 3,
      explain: r`$MR = 6 - Q < 0 \iff Q > 6$; and $P \ge 0$ requires $Q \le 12$. So TR decreases on $6 < Q \le 12$.`,
    },

    // ---- 7.3 extreme value theorem
    {
      id: "optimisation-q14",
      kind: "mcq",
      sub: "Extreme value theorem",
      prompt: "The extreme value theorem guarantees a maximum and a minimum when $f$ is…",
      options: ["differentiable on an open interval $(a, b)$", "continuous on the whole real line", "continuous on a closed bounded interval $[a, b]$", "has a stationary point in $[a,b]$"],
      answer: 2,
      explain: r`The hypotheses are: $f$ **continuous** and the interval **closed and bounded**. Then $f(d) \le f(x) \le f(c)$ for some $c, d \in [a,b]$.`,
    },
    {
      id: "optimisation-q15",
      kind: "mcq",
      sub: "Extreme value theorem",
      prompt: "When searching for the global max of $f$ on an interval $I$, which list of candidates is complete?",
      options: [
        "Only the points where $f'(x) = 0$",
        "Interior points with $f'(x) = 0$, end points of $I$ (if included), interior points where $f'$ does not exist",
        "Only the end points of $I$",
        "Points where $f''(x) = 0$ and the end points",
      ],
      answer: 1,
      explain: r`Every extreme point is a stationary point, an end point (closed interval), or a point where $f'$ does not exist. Points with $f'' = 0$ are inflection candidates, not extremum candidates.`,
    },
    {
      id: "optimisation-q16",
      kind: "fill",
      sub: "Extreme value theorem",
      prompt: r`For $f(x) = 3x^2 - 6x + 5$ on $[0, 3]$: the maximum value is ____ (at $x$ = ____) and the minimum value is ____.`,
      answers: [["14"], ["3"], ["2"]],
      explain: r`$f'(x) = 6x - 6 = 0 \Rightarrow x = 1$, $f(1) = 2$. End points $f(0) = 5$, $f(3) = 14$. Max 14 at $x = 3$ (an end point), min 2 at $x = 1$.`,
    },
    {
      id: "optimisation-q17",
      kind: "mcq",
      sub: "Extreme value theorem",
      prompt: r`$f(x) = x^2 - 4x + 3$ on $[0, 5]$. Where is the maximum?`,
      options: [r`$x = 2$`, r`$x = 0$`, r`$x = 5$`, "There is no maximum"],
      answer: 2,
      explain: r`$f'(x) = 2x - 4 = 0 \Rightarrow x = 2$, $f(2) = -1$ (the minimum). End points: $f(0) = 3$, $f(5) = 8$. Largest is $8$ at $x = 5$.`,
    },
    {
      id: "optimisation-q18",
      kind: "mcq",
      sub: "Non-differentiable points",
      prompt: r`$f(x) = |x - 2|$ on $[0, 5]$. Which is correct?`,
      options: [r`Min 0 at $x = 2$ (where $f'$ does not exist); max 3 at $x = 5$`, r`Min 0 at $x = 2$ (where $f'(2) = 0$); max 3 at $x = 5$`, r`Min 2 at $x = 0$; max 3 at $x = 5$`, "No minimum, since $f'(x) = 0$ has no solution"],
      answer: 0,
      explain: r`$f'(x) = \pm1$, never 0; $f'$ does not exist at the corner $x = 2$. Candidates: $f(0) = 2$, $f(2) = 0$, $f(5) = 3$. Min 0 at $x = 2$, max 3 at $x = 5$.`,
    },
    {
      id: "optimisation-q19",
      kind: "fill",
      sub: "Profit with capacity",
      prompt: r`Past paper Q3(a): $\pi(q) = 30{,}000{,}000 - 360{,}000q + 750q^2 - \tfrac13 q^3$, $0 \le q \le 1500$. Setting $\pi'(q) = 0$ gives $q = 300$ and $q$ = ____.`,
      answers: [["1200"]],
      explain: r`$\pi'(q) = -360{,}000 + 1500q - q^2 = 0 \iff q^2 - 1500q + 360{,}000 = 0 \iff (q - 300)(q - 1200) = 0$.`,
    },
    {
      id: "optimisation-q20",
      kind: "mcq",
      sub: "Profit with capacity",
      prompt: r`For the same car producer (capacity 1500), how many cars maximise profit?`,
      options: ["300", "1500", "0", "1200"],
      answer: 3,
      explain: r`Compare all candidates: $\pi(0) = 30$m, $\pi(300) = -19.5$m, $\pi(1200) = 102$m, $\pi(1500) = 52.5$m (dollars). The maximum is at $q = 1200$.`,
    },
    {
      id: "optimisation-q21",
      kind: "mcq",
      sub: "Profit with capacity",
      prompt: r`Suppose instead the capacity were **1000** cars ($0 \le q \le 1000$), same profit function. The profit-maximising output is…`,
      options: ["1200", "1000 (the capacity end point)", "300", "0"],
      answer: 1,
      explain: r`$q = 1200$ is no longer feasible; $q = 300$ is a local min. $\pi' > 0$ on $(300, 1000]$, so profit keeps rising to the end point: $\pi(1000) \approx 86.67$m $> \pi(0) = 30$m. Max at $q = 1000$.`,
    },
    {
      id: "optimisation-q22",
      kind: "fill",
      sub: "Profit maximisation",
      prompt: r`Assignment 8 Q4: $\pi(Q) = -Q^3 + 59.25Q^2 - 328.5Q - 200$. The profit-maximising output is $Q$ = ____.`,
      answers: [["36.5"]],
      explain: r`$\pi'(Q) = -3Q^2 + 118.5Q - 328.5 = -3(Q - 3)(Q - 36.5)$. $\pi'$ changes $+ \to -$ at $Q = 36.5$ (max) and $- \to +$ at $Q = 3$ (min). $\pi(36.5) \approx 18{,}118.44$.`,
    },

    // ---- 7.4 local extremes, second-derivative test
    {
      id: "optimisation-q23",
      kind: "mcq",
      sub: "Second-derivative test",
      prompt: r`$f'(c) = 0$ and $f''(c) < 0$ at an interior point $c$. Then $c$ is…`,
      options: ["a strict local minimum point", "an inflection point", "a strict local maximum point", "not a stationary point"],
      answer: 2,
      explain: r`Second-derivative test (a): $f'(c) = 0$ and $f''(c) < 0$ ⇒ strict local max. The slope is decreasing through zero — the graph bends down like a cap.`,
    },
    {
      id: "optimisation-q24",
      kind: "mcq",
      sub: "Second-derivative test",
      prompt: r`The stationary points of $f(x) = \tfrac19 x^3 - \tfrac16 x^2 - \tfrac23 x + 1$ are…`,
      options: [r`$x = 1$ and $x = -2$`, r`$x = \tfrac12$ only`, r`$x = 0$ and $x = 3$`, r`$x = -1$ and $x = 2$`],
      answer: 3,
      explain: r`$f'(x) = \tfrac13 x^2 - \tfrac13 x - \tfrac23 = \tfrac13(x - 2)(x + 1)$, so $x = -1$ or $x = 2$. ($x = \tfrac12$ is where $f'' = 0$ — the inflection point.)`,
    },
    {
      id: "optimisation-q25",
      kind: "fill",
      sub: "Second-derivative test",
      prompt: r`For $f(x) = x^2e^x$, $f''(x) = (x^2 + 4x + 2)e^x$. Then $f''(0)$ = ____, so $x = 0$ is a local ____.`,
      answers: [["2"], ["minimum", "min"]],
      explain: r`$f''(0) = (0 + 0 + 2)e^0 = 2 > 0$ ⇒ local minimum, $f(0) = 0$.`,
    },
    {
      id: "optimisation-q26",
      kind: "mcq",
      sub: "Second-derivative test",
      prompt: r`For $f(x) = x^2e^x$, which statement about $x = -2$ is correct?`,
      options: [
        r`$f''(-2) = -2e^{-2} < 0$, so $f(-2) = 4e^{-2}$ is a local maximum`,
        r`$f''(-2) = -2e^{-2} < 0$, so $f(-2)$ is the global maximum`,
        r`$f''(-2) > 0$, so $f(-2)$ is a local minimum`,
        r`$f'(-2) \ne 0$, so it is not a stationary point`,
      ],
      answer: 0,
      explain: r`$f''(-2) = (4 - 8 + 2)e^{-2} = -2e^{-2} < 0$ → local max with $f(-2) = 4e^{-2} \approx 0.54$. It is not global: $f(1) = e \approx 2.72$ is bigger, and $f \to \infty$ as $x \to \infty$.`,
    },
    {
      id: "optimisation-q27",
      kind: "mcq",
      sub: "Second-derivative test",
      prompt: r`At a stationary point $c$, $f''(c) = 0$. What can you conclude?`,
      options: ["$c$ is an inflection point", "Nothing yet: $c$ could be a max, a min or neither", "$c$ is neither a max nor a min", "$c$ is a minimum"],
      answer: 1,
      explain: r`The remark in the notes: if $f'(c) = 0$ and $f''(c) = 0$, any outcome is possible ($x^4$: min; $-x^4$: max; $x^3$: neither). Use the sign of $f'$ around $c$.`,
    },
    {
      id: "optimisation-q28",
      kind: "mcq",
      sub: "Revenue maximisation",
      prompt: r`Past paper Q3(b): $TR(q) = q(650 - 0.25q)^{3/2}$. Which is $TR'(q)$?`,
      options: [
        r`$\tfrac32(650 - 0.25q)^{1/2}$`,
        r`$(650 - 0.25q)^{1/2}(650 - 0.375q)$`,
        r`$(650 - 0.25q)^{1/2}(650 - 0.625q)$`,
        r`$(650 - 0.25q)^{3/2} - 0.25q(650 - 0.25q)^{1/2}$`,
      ],
      answer: 2,
      explain: r`Product + chain rule: $TR' = (650 - 0.25q)^{3/2} + q\cdot\tfrac32(650 - 0.25q)^{1/2}(-0.25) = (650 - 0.25q)^{1/2}[650 - 0.25q - 0.375q] = (650 - 0.25q)^{1/2}(650 - 0.625q)$.`,
    },
    {
      id: "optimisation-q29",
      kind: "fill",
      sub: "Revenue maximisation",
      prompt: r`For $p = (650 - 0.25q)^{3/2}$, total revenue is maximised at $q$ = ____.`,
      answers: [["1040"]],
      explain: r`$TR' = (650 - 0.25q)^{1/2}(650 - 0.625q) = 0 \Rightarrow q = 650/0.625 = 1040$. $TR''(1040) = -0.625\sqrt{390} \approx -12.34 < 0$ ⇒ maximum.`,
    },
    {
      id: "optimisation-q30",
      kind: "fill",
      sub: "Second-derivative test",
      prompt: r`$Q = 16\sqrt{L} - L$. Output is maximised at $L$ = ____, giving $Q$ = ____.`,
      answers: [["64"], ["64"]],
      explain: r`$dQ/dL = 8L^{-1/2} - 1 = 0 \Rightarrow \sqrt{L} = 8 \Rightarrow L = 64$. $d^2Q/dL^2 = -4L^{-3/2} < 0$ ⇒ max. $Q = 16 \cdot 8 - 64 = 64$.`,
    },

    // ---- 7.5 inflection points & concavity
    {
      id: "optimisation-q31",
      kind: "mcq",
      sub: "Concave and convex",
      prompt: "A function is **concave** if the line segment joining any two points on its graph lies…",
      options: ["above the graph (or on it)", "on the $x$-axis", "parallel to the tangent", "below the graph (or on it)"],
      answer: 3,
      explain: r`Concave: chord below the graph (bends down, like $\ln x$). Convex: chord above the graph (bends up, like $x^2$).`,
    },
    {
      id: "optimisation-q32",
      kind: "mcq",
      sub: "Concave and convex",
      prompt: r`On $(a, b)$, $f'(x) > 0$ and $f''(x) < 0$. Then $f$ is…`,
      options: ["increasing and strictly convex", "increasing and strictly concave", "decreasing and strictly concave", "decreasing and strictly convex"],
      answer: 1,
      explain: r`$f' > 0$: increasing. $f'' < 0$ on all of $(a,b)$: strictly concave. This is combination (i) in the notes (e.g. $\ln x$, $\sqrt{x}$).`,
    },
    {
      id: "optimisation-q33",
      kind: "fill",
      sub: "Inflection points",
      prompt: r`$f(x) = \tfrac19 x^3 - \tfrac16 x^2 - \tfrac23 x + 1$ has an inflection point at $x$ = ____.`,
      answers: [["0.5", "1/2"]],
      explain: r`$f''(x) = \tfrac23 x - \tfrac13 = \tfrac13(2x - 1) = 0 \Rightarrow x = \tfrac12$, and $f''$ changes sign from $-$ to $+$ there, so it is an inflection point.`,
    },
    {
      id: "optimisation-q34",
      kind: "mcq",
      sub: "Inflection points",
      prompt: r`$f(x) = x^4$ has $f''(0) = 0$. Is $x = 0$ an inflection point?`,
      options: [r`No, because $f''(x) = 12x^2$ does not change sign at $0$`, r`Yes, because $f''(0) = 0$`, r`Yes, because $f'(0) = 0$`, r`No, because $f''(0)$ does not exist`],
      answer: 0,
      explain: r`$f''(c) = 0$ is necessary, not sufficient. $12x^2 \ge 0$ on both sides of 0, so $f$ stays convex: no change of concavity, no inflection point.`,
    },
    {
      id: "optimisation-q35",
      kind: "mcq",
      sub: "Inflection points",
      prompt: r`Which condition guarantees that $c$ is an inflection point of $f$ (with $f''$ continuous)?`,
      options: [r`$f''(c) = 0$ only`, r`$f'(c) = 0$ and $f''(c) = 0$`, r`$f''(c) = 0$ and $f''$ changes sign at $c$`, r`$f'(c) = 0$ and $f'$ changes sign at $c$`],
      answer: 2,
      explain: r`Test for inflection points: $f''(c) = 0$ **and** a sign change of $f''$ at $c$. A sign change of $f'$ indicates a max/min instead.`,
    },
    {
      id: "optimisation-q36",
      kind: "fill",
      sub: "Inflection points",
      prompt: r`$TC(Q) = 2Q^3 - 18Q^2 + 60Q + 250$ has an inflection point at $Q$ = ____, where marginal cost equals ____.`,
      answers: [["3"], ["6"]],
      explain: r`$TC'' = 12Q - 36 = 0 \Rightarrow Q = 3$, sign $- \to +$. $MC = 6Q^2 - 36Q + 60$, so $MC(3) = 54 - 108 + 60 = 6$ — the minimum of MC.`,
    },
    {
      id: "optimisation-q37",
      kind: "mcq",
      sub: "Inflection points",
      prompt: r`$f(x) = x^3 - 6x^2 + 9x + 1$. Which is correct?`,
      options: [
        r`Local min at $x = 1$, local max at $x = 3$, inflection at $x = 2$`,
        r`Local max at $x = 1$, local min at $x = 3$, no inflection point`,
        r`Inflection points at $x = 1$ and $x = 3$`,
        r`Local max at $x = 1$, local min at $x = 3$, inflection at $x = 2$`,
      ],
      answer: 3,
      explain: r`$f' = 3(x - 1)(x - 3)$; $f'' = 6x - 12$: $f''(1) = -6 < 0$ (max), $f''(3) = 6 > 0$ (min); $f'' = 0$ at $x = 2$ with a sign change (inflection).`,
    },
  ],

  // ================================================================ exam
  exam: [
    {
      id: "optimisation-x1",
      kind: "calc",
      sub: "Profit with capacity (extreme value theorem)",
      prompt: r`A firm can produce a maximum of 1500 sports cars every year. If the producer sells $q$ cars, then the profit is $\pi(q) = 30{,}000{,}000 - 360{,}000q + 750q^2 - \tfrac13 q^3$ in dollars. How many cars should the producer try to sell to maximise the profit?`,
      marks: 5,
      rubric: [
        { point: r`Correct $\pi'(q) = -360{,}000 + 1500q - q^2$ and stationary points $q = 300$, $q = 1200$`, marks: 1.5 },
        { point: r`Classifies them, e.g. $\pi''(q) = 1500 - 2q$: $q = 300$ local min, $q = 1200$ local max`, marks: 1 },
        { point: r`Recognises the closed domain $[0, 1500]$ and evaluates $\pi$ at the end points $q = 0$ and $q = 1500$ as well as the stationary points`, marks: 1.5 },
        { point: r`Correct conclusion: $q = 1200$ cars, maximum profit 102,000,000 dollars`, marks: 1 },
      ],
      model: r`The feasible outputs form the closed interval $0 \le q \le 1500$ and $\pi$ is a polynomial (continuous), so by the extreme value theorem a maximum exists, either at a stationary point or at an end point.
**Stationary points.** $\pi'(q) = -360{,}000 + 1500q - q^2 = 0 \iff q^2 - 1500q + 360{,}000 = 0 \iff (q - 300)(q - 1200) = 0$, so $q = 300$ or $q = 1200$ (both in $[0, 1500]$).
**Classify.** $\pi''(q) = 1500 - 2q$: $\pi''(300) = 900 > 0$ → local minimum; $\pi''(1200) = -900 < 0$ → local maximum.
**Compare all candidates.**
- $\pi(0) = 30{,}000{,}000$
- $\pi(300) = 30{,}000{,}000 - 108{,}000{,}000 + 67{,}500{,}000 - 9{,}000{,}000 = -19{,}500{,}000$
- $\pi(1200) = 30{,}000{,}000 - 432{,}000{,}000 + 1{,}080{,}000{,}000 - 576{,}000{,}000 = 102{,}000{,}000$
- $\pi(1500) = 30{,}000{,}000 - 540{,}000{,}000 + 1{,}687{,}500{,}000 - 1{,}125{,}000{,}000 = 52{,}500{,}000$
The producer should sell **1200 cars**, earning the maximum profit of 102 million dollars.`,
      answer: r`$q = 1200$ cars (profit 102,000,000 dollars)`,
      source: "Past paper Q3(a)",
    },
    {
      id: "optimisation-x2",
      kind: "calc",
      sub: "Profit with capacity (end-point maximum)",
      prompt: r`A firm can produce at most **1000** sports cars a year. Selling $q$ cars gives profit $\pi(q) = 30{,}000{,}000 - 360{,}000q + 750q^2 - \tfrac13 q^3$ dollars, $0 \le q \le 1000$. How many cars maximise profit, and what is the maximum profit?`,
      marks: 5,
      rubric: [
        { point: r`Stationary points from $\pi'(q) = -(q - 300)(q - 1200) = 0$`, marks: 1 },
        { point: r`Notes $q = 1200$ lies outside $[0, 1000]$ and $q = 300$ is a local minimum`, marks: 1 },
        { point: r`Evaluates $\pi(0)$, $\pi(300)$ and $\pi(1000)$`, marks: 2 },
        { point: r`Conclusion: maximum at the end point $q = 1000$, profit $\approx 86{,}666{,}667$ dollars`, marks: 1 },
      ],
      model: r`Closed interval $[0, 1000]$, continuous $\pi$ ⇒ a maximum exists (extreme value theorem). Candidates: stationary points inside the interval and the two end points.
$\pi'(q) = -360{,}000 + 1500q - q^2 = -(q - 300)(q - 1200)$, so $\pi'(q) = 0$ at $q = 300$ and $q = 1200$. But $q = 1200 > 1000$ is **not feasible**.
$\pi''(300) = 1500 - 600 = 900 > 0$: $q = 300$ is a local minimum. For $300 < q \le 1000$, $\pi'(q) = -(q - 300)(q - 1200) > 0$, so profit rises all the way to capacity.
Compare: $\pi(0) = 30{,}000{,}000$; $\pi(300) = -19{,}500{,}000$; $\pi(1000) = 30{,}000{,}000 - 360{,}000{,}000 + 750{,}000{,}000 - 333{,}333{,}333.33 = 86{,}666{,}666.67$.
The maximum is at the **end point $q = 1000$** (produce at full capacity) with profit $\approx 86{,}666{,}667$ dollars. Here $\pi'(1000) = 140{,}000 \ne 0$: setting $\pi' = 0$ alone would have missed it.`,
      answer: r`$q = 1000$ (capacity), profit $\approx 86{,}666{,}667$ dollars`,
      figures: [
        {
          title: "Capacity 1000: the maximum is at the end point",
          x: "q",
          y: "profit (millions)",
          xr: [0, 1550],
          yr: [-30, 120],
          curves: [
            { f: "30 - 0.36*x + 0.00075*x^2 - x^3/3000000", from: 0, to: 1000 },
            { f: "30 - 0.36*x + 0.00075*x^2 - x^3/3000000", from: 1000, to: 1500, dashed: true, tone: 3 },
          ],
          points: [
            { at: [300, -19.5], label: "local min", tone: 1 },
            { at: [1000, 86.667], label: "max at capacity (1000, 86.7)", guides: true, tone: 2 },
            { at: [1200, 102], label: "infeasible", open: true, tone: 3 },
          ],
          segments: [{ from: [1000, -30], to: [1000, 120], dashed: true, tone: 3, label: "capacity" }],
        },
      ],
      source: "Modelled on Past paper Q3(a)",
    },
    {
      id: "optimisation-x3",
      kind: "calc",
      sub: "Revenue maximisation (second-derivative test)",
      prompt: r`Suppose a producer faces a nonlinear inverse demand function $p = (650 - 0.25q)^{3/2}$. What is the amount of output $q$ it should try to sell to maximise the total revenue? Use the second-derivative test to confirm your result.`,
      marks: 5,
      rubric: [
        { point: r`Writes $TR(q) = q(650 - 0.25q)^{3/2}$ and differentiates with product and chain rules`, marks: 1.5 },
        { point: r`Simplifies $TR'(q) = (650 - 0.25q)^{1/2}(650 - 0.625q)$ and solves $TR' = 0$: $q = 1040$`, marks: 1.5 },
        { point: r`Second derivative evaluated at $q = 1040$: $TR''(1040) = -0.625\sqrt{390} \approx -12.34 < 0$`, marks: 1.5 },
        { point: r`Concludes $q = 1040$ maximises TR (TR $\approx 8.01$ million)`, marks: 0.5 },
      ],
      model: r`$TR(q) = pq = q(650 - 0.25q)^{3/2}$, defined for $0 \le q \le 2600$ (so that $p \ge 0$).
**First derivative** (product rule, chain rule):
$$TR'(q) = (650 - 0.25q)^{3/2} + q\cdot\tfrac32(650 - 0.25q)^{1/2}\cdot(-0.25) = (650 - 0.25q)^{1/2}\big[650 - 0.25q - 0.375q\big] = (650 - 0.25q)^{1/2}(650 - 0.625q).$$
$TR'(q) = 0 \Rightarrow 650 - 0.625q = 0 \Rightarrow q = 1040$ (the other root $q = 2600$ gives $p = 0$, $TR = 0$).
**Second derivative.** Differentiating $TR' = (650 - 0.25q)^{1/2}(650 - 0.625q)$:
$$TR''(q) = \tfrac12(650 - 0.25q)^{-1/2}(-0.25)(650 - 0.625q) + (650 - 0.25q)^{1/2}(-0.625).$$
At $q = 1040$: $650 - 0.625(1040) = 0$ and $650 - 0.25(1040) = 390$, so $TR''(1040) = -0.625\sqrt{390} \approx -12.34 < 0$.
By the second-derivative test $q = 1040$ is a (strict local) maximum; as it is the only stationary point in $(0, 2600)$ and $TR(0) = TR(2600) = 0$, it is the global maximum. The firm should sell **$q = 1040$**, at $p = 390^{3/2} \approx 7701.88$, giving $TR \approx 8{,}009{,}958$.`,
      answer: r`$q = 1040$ ($TR''(1040) \approx -12.34 < 0$)`,
      figures: [
        {
          title: "TR(q) = q(650 − 0.25q)^(3/2), in millions",
          x: "q",
          y: "TR (millions)",
          xr: [0, 2700],
          yr: [0, 9],
          curves: [{ f: "x*(650 - 0.25*x)^(3/2)/1000000", from: 0, to: 2600, label: "TR" }],
          points: [{ at: [1040, 8.01], label: "max (1040, 8.01)", guides: true, tone: 2 }],
        },
      ],
      source: "Past paper Q3(b)",
    },
    {
      id: "optimisation-x4",
      kind: "calc",
      sub: "Revenue maximisation (second-derivative test)",
      prompt: r`A producer faces the inverse demand function $p = (300 - 0.5q)^{1/2}$. Find the output $q$ that maximises total revenue, confirm it with the second-derivative test, and state the maximum revenue.`,
      marks: 5,
      rubric: [
        { point: r`$TR = q(300 - 0.5q)^{1/2}$ and correct $TR'(q) = (300 - 0.5q)^{-1/2}(300 - 0.75q)$`, marks: 1.5 },
        { point: r`$TR' = 0 \Rightarrow q = 400$`, marks: 1 },
        { point: r`$TR''(400) = -0.075 < 0$ ⇒ maximum`, marks: 1.5 },
        { point: r`$p = 10$, maximum $TR = 4000$`, marks: 1 },
      ],
      model: r`$TR(q) = q(300 - 0.5q)^{1/2}$ for $0 \le q \le 600$.
$TR'(q) = (300 - 0.5q)^{1/2} + q\cdot\tfrac12(300 - 0.5q)^{-1/2}(-0.5) = (300 - 0.5q)^{-1/2}\big[(300 - 0.5q) - 0.25q\big] = (300 - 0.5q)^{-1/2}(300 - 0.75q)$.
$TR' = 0 \Rightarrow q = 400$.
$TR''(q) = (300 - 0.5q)^{-1/2}(-0.75) + (300 - 0.75q)\cdot\big(-\tfrac12\big)(300 - 0.5q)^{-3/2}(-0.5)$.
At $q = 400$: $300 - 0.75(400) = 0$ and $300 - 0.5(400) = 100$, so $TR''(400) = -0.75/\sqrt{100} = -0.075 < 0$ → maximum.
Price $p = \sqrt{100} = 10$, maximum revenue $TR = 400 \times 10 = 4000$.`,
      answer: r`$q = 400$, $TR = 4000$`,
      source: "Modelled on Past paper Q3(b)",
    },
    {
      id: "optimisation-x5",
      kind: "calc",
      sub: "First-derivative test",
      prompt: r`Suppose the cost function is $C(Q) = Q^3 - 5Q^2 + 8Q + 20$. Use the first-derivative test to find the relative extrema of the cost function.`,
      marks: 5,
      rubric: [
        { point: r`$C'(Q) = 3Q^2 - 10Q + 8 = (3Q - 4)(Q - 2)$, stationary points $Q = \tfrac43, 2$`, marks: 1.5 },
        { point: r`Sign of $C'$ on each interval ($+$, $-$, $+$) shown with test values or factor signs`, marks: 1.5 },
        { point: r`Relative max at $Q = \tfrac43$, $C = \tfrac{652}{27} \approx 24.15$`, marks: 1 },
        { point: r`Relative min at $Q = 2$, $C = 24$`, marks: 1 },
      ],
      model: r`$C'(Q) = 3Q^2 - 10Q + 8 = (3Q - 4)(Q - 2) = 0 \Rightarrow Q = \tfrac43$ or $Q = 2$.
**Sign of $C'$:**
- $Q < \tfrac43$ (e.g. $Q = 1$): $C'(1) = 3 - 10 + 8 = 1 > 0$ — $C$ increasing.
- $\tfrac43 < Q < 2$ (e.g. $Q = 1.5$): $C'(1.5) = 6.75 - 15 + 8 = -0.25 < 0$ — $C$ decreasing.
- $Q > 2$ (e.g. $Q = 3$): $C'(3) = 27 - 30 + 8 = 5 > 0$ — $C$ increasing.
At $Q = \tfrac43$, $C'$ changes from $+$ to $-$ → **relative maximum**: $C(\tfrac43) = \tfrac{64}{27} - \tfrac{80}{9} + \tfrac{32}{3} + 20 = \tfrac{652}{27} \approx 24.15$.
At $Q = 2$, $C'$ changes from $-$ to $+$ → **relative minimum**: $C(2) = 8 - 20 + 16 + 20 = 24$.`,
      answer: r`Relative max $C(4/3) = 652/27 \approx 24.15$; relative min $C(2) = 24$`,
      source: "Assignment 8 Q3",
    },
    {
      id: "optimisation-x6",
      kind: "calc",
      sub: "Profit maximisation (first-derivative test)",
      prompt: r`The revenue function is $R(Q) = 1200Q - 2Q^2$ and the total cost function is $C(Q) = Q^3 - 61.25Q^2 + 1528.5Q + 200$. Find the profit function $\pi(Q)$, the output levels $Q^*$ with $\pi'(Q^*) = 0$, and the output that maximises profit. Use the first-derivative test to confirm your finding.`,
      marks: 5,
      rubric: [
        { point: r`$\pi(Q) = -Q^3 + 59.25Q^2 - 328.5Q - 200$`, marks: 1 },
        { point: r`$\pi'(Q) = -3Q^2 + 118.5Q - 328.5 = 0 \Rightarrow Q^* = 3$ or $36.5$`, marks: 1.5 },
        { point: r`First-derivative test: $\pi' < 0$ on $(0,3)$, $> 0$ on $(3, 36.5)$, $< 0$ beyond $36.5$`, marks: 1.5 },
        { point: r`Profit maximised at $Q = 36.5$ ($\pi \approx 18{,}118.44$); $Q = 3$ is a minimum`, marks: 1 },
      ],
      model: r`(a) $\pi(Q) = R(Q) - C(Q) = 1200Q - 2Q^2 - Q^3 + 61.25Q^2 - 1528.5Q - 200 = -Q^3 + 59.25Q^2 - 328.5Q - 200$.
(b) $\pi'(Q) = -3Q^2 + 118.5Q - 328.5 = -3(Q^2 - 39.5Q + 109.5) = -3(Q - 3)(Q - 36.5)$.
So $\pi'(Q^*) = 0$ at $Q^* = 3$ and $Q^* = 36.5$.
(c) First-derivative test using the factorised form $-3(Q - 3)(Q - 36.5)$:
- $0 < Q < 3$: both brackets negative, product positive, times $-3$: $\pi' < 0$ (e.g. $\pi'(1) = -213$).
- $3 < Q < 36.5$: $\pi' > 0$ (e.g. $\pi'(10) = 556.5$).
- $Q > 36.5$: $\pi' < 0$ (e.g. $\pi'(40) = -388.5$).
At $Q = 36.5$, $\pi'$ changes from $+$ to $-$, so profit is maximised there: $\pi(36.5) = 18{,}118.4375 \approx 18{,}118.44$. ($Q = 3$, where $\pi'$ changes $- \to +$, is a local minimum with $\pi(3) = -679.25$.)
The profit-maximising output is **$Q = 36.5$**.`,
      answer: r`$Q = 36.5$ (max profit $\approx 18{,}118.44$)`,
      source: "Assignment 8 Q4",
    },
    {
      id: "optimisation-x7",
      kind: "calc",
      sub: "Profit maximisation (second-derivative test)",
      prompt: r`A firm has revenue $R(Q) = 120Q - 3Q^2$ and cost $C(Q) = Q^3 - 18Q^2 + 147Q + 50$, $Q \ge 0$. Find the output that maximises profit, use the second-derivative test to confirm it, and compute the maximum profit.`,
      marks: 5,
      rubric: [
        { point: r`$\pi(Q) = -Q^3 + 15Q^2 - 27Q - 50$`, marks: 1 },
        { point: r`$\pi'(Q) = -3(Q - 1)(Q - 9) = 0 \Rightarrow Q = 1, 9$`, marks: 1.5 },
        { point: r`$\pi''(Q) = -6Q + 30$: $\pi''(9) = -24 < 0$ max, $\pi''(1) = 24 > 0$ min`, marks: 1.5 },
        { point: r`Maximum profit $\pi(9) = 193$ (greater than $\pi(0) = -50$)`, marks: 1 },
      ],
      model: r`$\pi(Q) = R - C = 120Q - 3Q^2 - Q^3 + 18Q^2 - 147Q - 50 = -Q^3 + 15Q^2 - 27Q - 50$.
$\pi'(Q) = -3Q^2 + 30Q - 27 = -3(Q^2 - 10Q + 9) = -3(Q - 1)(Q - 9) = 0 \Rightarrow Q = 1$ or $Q = 9$.
$\pi''(Q) = -6Q + 30$: $\pi''(1) = 24 > 0$ → local min; $\pi''(9) = -24 < 0$ → local max.
$\pi(9) = -729 + 1215 - 243 - 50 = 193$. Check the end point: $\pi(0) = -50 < 193$, and $\pi' < 0$ for all $Q > 9$, so $Q = 9$ is the global maximum on $Q \ge 0$.
Profit is maximised at **$Q = 9$** with $\pi = 193$.`,
      answer: r`$Q = 9$, $\pi = 193$`,
      source: "Modelled on Assignment 8 Q4",
    },
    {
      id: "optimisation-x8",
      kind: "explain",
      sub: "Revenue maximisation (increasing/decreasing)",
      prompt: r`The inverse demand for a product is $P = 6 - \tfrac12 Q$. Find the TR and MR functions, the intervals on which TR is increasing and decreasing, and hence the level of $Q$ that maximises revenue. Does your answer make sense? Explain.`,
      marks: 5,
      rubric: [
        { point: r`$TR = 6Q - \tfrac12 Q^2$ and $MR = 6 - Q$`, marks: 1 },
        { point: r`TR increasing for $0 \le Q < 6$ ($MR > 0$), decreasing for $6 < Q \le 12$ ($MR < 0$)`, marks: 1.5 },
        { point: r`Revenue maximised at $Q = 6$, $TR = 18$ ($P = 3$)`, marks: 1 },
        { point: r`Economic explanation: extra units add revenue while $MR > 0$; beyond $Q = 6$ the price cut lowers revenue`, marks: 1.5 },
      ],
      model: r`$TR = P \cdot Q = 6Q - \tfrac12 Q^2$, relevant for $0 \le Q \le 12$ (price non-negative).
$MR = \dfrac{d\,TR}{dQ} = 6 - Q$.
- $MR > 0 \iff Q < 6$: TR is **increasing** on $0 \le Q < 6$.
- $MR < 0 \iff Q > 6$: TR is **decreasing** on $6 < Q \le 12$.
TR rises up to $Q = 6$ and falls afterwards (first-derivative test), so revenue is maximised at **$Q = 6$**, with $P = 3$ and $TR = 36 - 18 = 18$.
This makes sense: to sell more the firm must cut the price on all units. While $MR > 0$ the extra unit's revenue outweighs the loss from the lower price; at $Q = 6$ the two effects balance ($MR = 0$), and beyond it selling more reduces total revenue. The TR graph is an inverted parabola with its peak at $(6, 18)$.`,
      answer: r`$Q = 6$, maximum $TR = 18$`,
      figures: [
        {
          title: "TR = 6Q − Q²/2",
          x: "Q",
          y: "TR",
          xr: [0, 12.5],
          yr: [0, 20],
          curves: [{ f: "6*x - x^2/2", from: 0, to: 12, label: "TR" }],
          points: [{ at: [6, 18], label: "max (6, 18)", guides: true, tone: 2 }],
          labels: [
            { at: [1.2, 12], text: "MR > 0" },
            { at: [10, 12], text: "MR < 0" },
          ],
        },
      ],
      source: "Assignment 7 Q3(e)",
    },
    {
      id: "optimisation-x9",
      kind: "calc",
      sub: "Extreme value theorem",
      prompt: r`Find the maximum and minimum values of $f(x) = x^3 - 3x$ on the interval $[0, 3]$, and state where they occur.`,
      marks: 5,
      rubric: [
        { point: r`States a max and min exist (continuous function on a closed interval)`, marks: 0.5 },
        { point: r`$f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm1$; only $x = 1$ lies in $[0,3]$`, marks: 1.5 },
        { point: r`Evaluates $f(0) = 0$, $f(1) = -2$, $f(3) = 18$`, marks: 2 },
        { point: r`Max 18 at $x = 3$; min $-2$ at $x = 1$`, marks: 1 },
      ],
      model: r`$f$ is a polynomial, hence continuous on the closed bounded interval $[0, 3]$: by the extreme value theorem it has a maximum and a minimum there.
$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1) = 0 \Rightarrow x = 1$ or $x = -1$. Only $x = 1$ is in $[0, 3]$.
Candidates: $f(0) = 0$, $f(1) = 1 - 3 = -2$, $f(3) = 27 - 9 = 18$.
**Maximum** $18$ at $x = 3$ (an end point); **minimum** $-2$ at $x = 1$ (a stationary point).`,
      answer: r`Max $18$ at $x = 3$; min $-2$ at $x = 1$`,
      source: "Modelled on Lecture Note 7 Example [7]",
    },
    {
      id: "optimisation-x10",
      kind: "calc",
      sub: "Second-derivative test",
      prompt: r`Consider $f(x) = x^2e^{-x}$. Find the stationary points and use the second-derivative test to classify them as local maxima or minima.`,
      marks: 5,
      rubric: [
        { point: r`$f'(x) = (2x - x^2)e^{-x} = x(2 - x)e^{-x}$; stationary points $x = 0, 2$`, marks: 1.5 },
        { point: r`$f''(x) = (x^2 - 4x + 2)e^{-x}$`, marks: 1.5 },
        { point: r`$f''(0) = 2 > 0$: local min $f(0) = 0$`, marks: 1 },
        { point: r`$f''(2) = -2e^{-2} < 0$: local max $f(2) = 4e^{-2} \approx 0.541$`, marks: 1 },
      ],
      model: r`**First derivative** (product rule): $f'(x) = 2xe^{-x} - x^2e^{-x} = x(2 - x)e^{-x}$. Since $e^{-x} > 0$, $f'(x) = 0 \iff x = 0$ or $x = 2$.
**Second derivative:** $f''(x) = (2 - 2x)e^{-x} - (2x - x^2)e^{-x} = (x^2 - 4x + 2)e^{-x}$.
- $f''(0) = 2e^0 = 2 > 0$ → $x = 0$ is a **local minimum**, $f(0) = 0$.
- $f''(2) = (4 - 8 + 2)e^{-2} = -2e^{-2} < 0$ → $x = 2$ is a **local maximum**, $f(2) = 4e^{-2} \approx 0.541$.
(These are local statements; checking the whole real line, $f(0) = 0$ is also the global min since $f \ge 0$, but $f(2)$ is not the global max because $f \to \infty$ as $x \to -\infty$.)`,
      answer: r`Local min at $x = 0$ ($f = 0$); local max at $x = 2$ ($f = 4e^{-2}$)`,
      source: "Modelled on Lecture Note 7 Example [9]",
    },
    {
      id: "optimisation-x11",
      kind: "calc",
      sub: "Local extrema and inflection points",
      prompt: r`For $f(x) = x^3 - 6x^2 + 9x + 1$, find and classify all stationary points, and find any inflection point (justify that it is one).`,
      marks: 5,
      rubric: [
        { point: r`$f'(x) = 3(x - 1)(x - 3)$, stationary points $x = 1, 3$`, marks: 1 },
        { point: r`$f''(x) = 6x - 12$: local max at $(1, 5)$, local min at $(3, 1)$`, marks: 2 },
        { point: r`$f''(x) = 0$ at $x = 2$ and $f''$ changes sign ($-$ to $+$), so $(2, 3)$ is an inflection point`, marks: 2 },
      ],
      model: r`$f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3) = 0 \Rightarrow x = 1$ or $x = 3$.
$f''(x) = 6x - 12$.
- $f''(1) = -6 < 0$ → strict local **maximum**, $f(1) = 1 - 6 + 9 + 1 = 5$.
- $f''(3) = 6 > 0$ → strict local **minimum**, $f(3) = 27 - 54 + 27 + 1 = 1$.
**Inflection:** $f''(x) = 0 \iff x = 2$. For $x < 2$, $f''(x) < 0$ (concave); for $x > 2$, $f''(x) > 0$ (convex). $f''$ is zero and changes sign at $x = 2$, so $(2, f(2)) = (2, 3)$ is an inflection point.`,
      answer: r`Local max $(1, 5)$, local min $(3, 1)$, inflection point $(2, 3)$`,
      source: "Modelled on Lecture Note 7 Examples [8] and [11]",
    },
    {
      id: "optimisation-x12",
      kind: "proof",
      sub: "Inflection points (cost curves)",
      prompt: r`A firm's total cost is $TC(Q) = 2Q^3 - 18Q^2 + 60Q + 250$. Show that TC has an inflection point at $Q = 3$, and show that marginal cost $MC = TC'(Q)$ reaches its minimum at the same output. State where TC is concave and where it is convex.`,
      marks: 5,
      rubric: [
        { point: r`$TC''(Q) = 12Q - 36 = 0$ at $Q = 3$`, marks: 1 },
        { point: r`Sign change of $TC''$ ($< 0$ for $Q < 3$, $> 0$ for $Q > 3$) ⇒ inflection at $(3, 322)$; concave on $(0, 3)$, convex for $Q > 3$`, marks: 2 },
        { point: r`$MC = 6Q^2 - 36Q + 60$, $MC' = 12Q - 36 = 0$ at $Q = 3$, $MC'' = 12 > 0$ ⇒ minimum $MC(3) = 6$`, marks: 2 },
      ],
      model: r`$TC'(Q) = MC = 6Q^2 - 36Q + 60$ and $TC''(Q) = 12Q - 36$.
**Inflection point.** $TC''(Q) = 0 \iff Q = 3$. For $0 < Q < 3$, $TC''(Q) < 0$ (TC strictly concave); for $Q > 3$, $TC''(Q) > 0$ (TC strictly convex). $TC''$ is zero at $Q = 3$ and changes sign, so by the test for inflection points $Q = 3$ is an inflection point, at $TC(3) = 54 - 162 + 180 + 250 = 322$.
**Minimum MC.** $MC'(Q) = 12Q - 36 = 0 \iff Q = 3$, and $MC''(Q) = 12 > 0$, so by the second-derivative test MC has a strict minimum at $Q = 3$ with $MC(3) = 54 - 108 + 60 = 6$.
Since $MC' = TC''$, the output where TC switches from concave to convex is exactly where MC stops falling and starts rising.`,
      answer: r`Inflection at $(3, 322)$; MC minimum $= 6$ at $Q = 3$; concave for $Q < 3$, convex for $Q > 3$`,
      source: "Modelled on Assignment 7 Q1",
    },
    {
      id: "optimisation-x13",
      kind: "proof",
      sub: "Necessary vs sufficient conditions",
      prompt: r`Prove or disprove each statement (assume $f$ is twice differentiable):
(i) If $f'(c) = 0$, then $x = c$ is either a maximum or a minimum point of $f$.
(ii) If $f''(c) = 0$, then $x = c$ is an inflection point of $f$.`,
      marks: 5,
      rubric: [
        { point: r`(i) False, with a valid counter-example such as $f(x) = x^3$ at $c = 0$, explaining $f$ takes values below and above $f(0)$ (or $f'$ does not change sign)`, marks: 2.5 },
        { point: r`(ii) False, with a valid counter-example such as $f(x) = x^4$ at $c = 0$, showing $f''(x) = 12x^2$ does not change sign`, marks: 2.5 },
      ],
      model: r`**(i) False.** $f'(c) = 0$ is only a *necessary* condition. Counter-example: $f(x) = x^3$, $f'(x) = 3x^2$, so $f'(0) = 0$. But $f(x) < 0 = f(0)$ for $x < 0$ and $f(x) > 0 = f(0)$ for $x > 0$, so $x = 0$ is neither a maximum nor a minimum (equivalently, $f'(x) = 3x^2 \ge 0$ on both sides — no sign change in the first-derivative test).
**(ii) False.** $f''(c) = 0$ is only necessary for an inflection point; $f''$ must also change sign. Counter-example (Lecture Note Example [10]): $f(x) = x^4$, $f''(x) = 12x^2$, $f''(0) = 0$. But $f''(x) > 0$ for $x < 0$ and for $x > 0$, so $f$ is convex on both sides and $x = 0$ is not an inflection point (it is in fact the minimum).`,
      answer: "Both statements are false (counter-examples $x^3$ and $x^4$ at $x = 0$)",
      source: "Lecture Note 7 (F.O.C. remark, Example [10])",
    },
    {
      id: "optimisation-x14",
      kind: "explain",
      sub: "Finding global extrema",
      prompt: r`Explain why $f'(x) = 0$ is a necessary but not a sufficient condition for a differentiable function to have a maximum or minimum at an interior point. Then explain how you would find the global maximum and minimum of a continuous function $f$ on a closed interval $[a, b]$, and why the extreme value theorem matters.`,
      marks: 5,
      rubric: [
        { point: r`Necessary: at an interior max/min of a differentiable function the tangent is horizontal, so $f'(c) = 0$`, marks: 1 },
        { point: r`Not sufficient: a stationary point may be neither (e.g. $x^3$ at 0); classify with first/second-derivative test`, marks: 1 },
        { point: r`Extreme value theorem: continuous $f$ on closed bounded $[a,b]$ has a max and a min`, marks: 1 },
        { point: r`Candidates: stationary points, end points $a, b$, points where $f'$ does not exist; evaluate $f$ at all and compare`, marks: 2 },
      ],
      model: r`**Necessary.** If $f$ is differentiable on an interval $I$ and has a max or min at an interior point $c$, the graph has a horizontal tangent there, so $f'(c) = 0$ (first-order condition). So every interior extremum is a stationary point.
**Not sufficient.** The converse fails: $f(x) = x^3$ has $f'(0) = 0$ but rises through 0, so 0 is neither a max nor a min. A stationary point must be classified — by the sign change of $f'$ (first-derivative test) or the sign of $f''(c)$ (second-derivative test) — and even then the test only shows a *local* extremum.
**Global extrema on $[a,b]$.** If $f$ is continuous on the closed bounded interval $[a,b]$, the extreme value theorem guarantees points $c, d \in [a,b]$ with $f(d) \le f(x) \le f(c)$ for all $x$ — so a max and a min exist and we only need to locate them. Every extreme point is one of:
- an interior point with $f'(x) = 0$;
- an end point $a$ or $b$;
- an interior point where $f'$ does not exist.
Evaluate $f$ at all these candidates; the largest value is the global maximum and the smallest the global minimum. End points matter: in Example [7], $3x^2 - 6x + 5$ on $[0,3]$ has its maximum 14 at the end point $x = 3$, where $f'(3) \ne 0$.`,
      answer: "F.O.C. is necessary (horizontal tangent) but not sufficient ($x^3$); compare $f$ at stationary points, end points and non-differentiable points",
      source: "Lecture Note 7.1 and 7.3",
    },
    {
      id: "optimisation-x15",
      kind: "select",
      sub: "Optimisation concepts",
      prompt: r`Which **TWO** of the following statements are wrong? Write down the corresponding Roman numerals only.`,
      statements: [
        r`If $f$ is continuous on the closed bounded interval $[a, b]$, then $f$ has both a maximum point and a minimum point in $[a, b]$.`,
        r`If $f'(c) = 0$ and $f''(c) > 0$ at an interior point $c$, then $x = c$ is a strict local maximum point.`,
        r`For $f(x) = x^4$, $f''(0) = 0$ but $x = 0$ is not an inflection point.`,
        r`Every stationary point of a differentiable function is either a maximum point or a minimum point.`,
        r`If $f''(x) < 0$ for all $x \in (a, b)$, then $f$ is strictly concave in $(a, b)$.`,
        r`$x = c$ is a minimum point of $f$ if and only if it is a maximum point of $-f$.`,
      ],
      wrong: [1, 3],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (iv) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong:** $f'(c) = 0$ with $f''(c) > 0$ gives a strict local **minimum** (the graph bends up like a cup); $f''(c) < 0$ would give a maximum.
**(iv) is wrong:** $f'(c) = 0$ is necessary but not sufficient. $f(x) = x^3$ has a stationary point at $0$ that is neither a max nor a min.
The others are true: (i) is the extreme value theorem; (iii) is Example [10] ($f'' = 12x^2$ does not change sign); (v) is the definition of strict concavity; (vi) is the max ↔ min conversion ($f(x) \ge f(c) \iff -f(x) \le -f(c)$).`,
      answer: "(ii) and (iv)",
      source: "Lecture Note 7 (modelled on past paper Q4(c) format)",
    },
    {
      id: "optimisation-x16",
      kind: "calc",
      sub: "Second-derivative test (production)",
      prompt: r`The production function is $Q = 16\sqrt{L} - L$, where $L$ is the size of the workforce. Find the workforce that maximises output, confirm it is a maximum using the second-derivative test, and state the maximum output. Comment briefly on $MP_L$ at $L = 1, 4, 9, 16$.`,
      marks: 5,
      rubric: [
        { point: r`$MP_L = dQ/dL = 8L^{-1/2} - 1$ and values $7, 3, \tfrac53, 1$ (positive but diminishing)`, marks: 1.5 },
        { point: r`$MP_L = 0 \Rightarrow L = 64$`, marks: 1 },
        { point: r`$d^2Q/dL^2 = -4L^{-3/2} < 0$ ⇒ maximum`, marks: 1.5 },
        { point: r`Maximum output $Q = 64$`, marks: 1 },
      ],
      model: r`$MP_L = \dfrac{dQ}{dL} = 16 \cdot \tfrac12 L^{-1/2} - 1 = \dfrac{8}{\sqrt{L}} - 1$.
At $L = 1, 4, 9, 16$: $MP_L = 7, 3, \tfrac53, 1$ — positive (output still rising) but falling: diminishing marginal product of labour.
**F.O.C.:** $\dfrac{8}{\sqrt{L}} - 1 = 0 \Rightarrow \sqrt{L} = 8 \Rightarrow L = 64$.
**Second-derivative test:** $\dfrac{d^2Q}{dL^2} = -4L^{-3/2} < 0$ for all $L > 0$, in particular at $L = 64$, so $L = 64$ is a strict local maximum (and, as $Q$ is strictly concave for $L > 0$ with a single stationary point, the global maximum).
Maximum output: $Q = 16\sqrt{64} - 64 = 128 - 64 = 64$.`,
      answer: r`$L = 64$, maximum $Q = 64$`,
      source: "Modelled on Assignment 7 Q4",
    },
  ],
};

export default data;
