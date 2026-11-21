import type { TopicData } from "@/lib/he1004/types";

const r = String.raw;

const data: TopicData = {
  id: "sums-logic-sets",
  sections: [
    // ------------------------------------------------------------------ 2.1
    {
      title: "2.1 Summation Notation",
      intro: r`Summation notation is a compact way to write long sums. It is used everywhere in statistics and econometrics (means, variances, covariances).`,
      points: [
        {
          term: "Census example",
          text: r`A country has 27 urban planning areas and $N_i$ is the population of area $i$. Total population $= N_1 + N_2 + \dots + N_{27}$, written $\sum_{i=1}^{27} N_i$ and read "the sum from $i = 1$ to $i = 27$ of $N_i$".`,
        },
        {
          term: "Sigma",
          text: r`The capital Greek letter sigma, $\Sigma$, is the summation symbol.`,
        },
        {
          term: "How to read it",
          text: r`$\sum_{i=1}^{n} N_i$ means: substitute successive integers for the index $i$, starting at $i = 1$ and ending at $i = n$, and add all the resulting terms.`,
        },
        {
          term: "The index need not start at 1",
          text: r`The lower limit can be any integer.`,
          eg: r`$\sum_{i=4}^{7} N_i = N_4 + N_5 + N_6 + N_7$ is the total population of the 4 areas numbered 4 to 7.`,
        },
        {
          term: "General rule",
          text: r`The upper limit is at least the lower limit ($n \ge i$), and both are integers. A sum from $i = m$ to $i = n$ has $n - m + 1$ terms.`,
          eg: r`$\sum_{i=0}^{10}$ has 11 terms; $\sum_{i=4}^{7}$ has 4 terms.`,
        },
        {
          term: "Only the index changes",
          text: r`Anything that does not carry the summation index stays the same in every term (it behaves like a constant).`,
          eg: r`In $\sum_{i=0}^{3} x_i y_j$ only $i$ runs, so $y_j$ is the same in every term: $y_j(x_0 + x_1 + x_2 + x_3)$.`,
        },
      ],
      formulas: [
        { name: "Summation notation", tex: r`\sum_{i=1}^{n} a_i = a_1 + a_2 + \dots + a_n` },
        { name: "Sum not starting at 1", tex: r`\sum_{i=4}^{7} N_i = N_4 + N_5 + N_6 + N_7` },
      ],
      worked: [
        {
          problem: r`Expand the summation (a) $\sum_{i=1}^{4} \dfrac{y_i}{x_i}$, (b) $\sum_{k=1}^{3} 5k$, (c) $\sum_{i=0}^{3} (x_i y_j)$.`,
          solution: r`(a) Substitute $i = 1, 2, 3, 4$: $\dfrac{y_1}{x_1} + \dfrac{y_2}{x_2} + \dfrac{y_3}{x_3} + \dfrac{y_4}{x_4}$.
Note this is **not** $\dfrac{y_1 + y_2 + y_3 + y_4}{x_1 + x_2 + x_3 + x_4}$.
(b) Substitute $k = 1, 2, 3$: $5(1) + 5(2) + 5(3) = 5 + 10 + 15 = 30$.
(c) The index is $i$, running from 0 to 3; $j$ is not the index, so $y_j$ is fixed: $x_0 y_j + x_1 y_j + x_2 y_j + x_3 y_j = y_j(x_0 + x_1 + x_2 + x_3)$.`,
          source: "Lecture Note 2 exercise (2.1)",
        },
        {
          problem: r`Express $5 + 5 \times 2^1 + 5 \times 2^2 + 5 \times 2^3 + \dots + 5 \times 2^{10}$ using summation notation.`,
          solution: r`Every term has the form $5 \times 2^i$. The first term is $5 = 5 \times 2^0$, so $i$ starts at 0, and the last term has $i = 10$.
$$5 + 5 \times 2^1 + \dots + 5 \times 2^{10} = \sum_{i=0}^{10} 5 \cdot 2^i$$
(11 terms.) Equivalently, by the homogeneity rule of 2.2, $5\sum_{i=0}^{10} 2^i$.`,
          source: "Lecture Note 2 exercise (2.1)",
        },
      ],
    },

    // ------------------------------------------------------------------ 2.2
    {
      title: "2.2 Rules for Sums",
      intro: r`Three properties of the sigma notation let you split sums, pull out constants and add up constants. Combined, they simplify almost any sum.`,
      points: [
        {
          term: "Additivity property (1)",
          text: r`The sum of a sum is the sum of the separate sums: $\sum_{i=1}^{n}(a_i + b_i) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i$.`,
        },
        {
          term: "Homogeneity property (2)",
          text: r`A constant factor can be taken outside the sum: $\sum_{i=1}^{n} c\,a_i = c\sum_{i=1}^{n} a_i$.`,
        },
        {
          term: "Sum of a constant (3)",
          text: r`Setting $a_i = 1$ for all $i$ in (2): $\sum_{i=1}^{n} c = nc$, i.e. "a constant $c$ summed $n$ times is equal to $n$ times $c$".`,
          eg: r`$\sum_{i=1}^{3} 3 = 9$, not 3.`,
        },
        {
          term: "Rules in combination",
          text: r`$\sum_{i=1}^{n}(a_i + b_i - c_i + d) = \sum a_i + \sum b_i - \sum c_i + nd$ when $d$ is a constant.`,
        },
        {
          term: "Splitting the range",
          text: r`Consecutive ranges join up: $\sum_{i=1}^{n} x_i + \sum_{i=n+1}^{N} x_i = \sum_{i=1}^{N} x_i$.`,
        },
        {
          term: "No rule for ratios or products",
          text: r`There is no property that splits a ratio: in general $\sum_{i=1}^{n} \dfrac{x_i}{y_i} \ne \dfrac{\sum x_i}{\sum y_i}$ (and likewise $\sum x_i y_i \ne \sum x_i \sum y_i$).`,
          eg: r`$x = (1, 1)$, $y = (1, 2)$: $\tfrac{1}{1} + \tfrac{1}{2} = 1.5$ but $\tfrac{2}{3} \approx 0.67$.`,
        },
        {
          term: "Means in sigma notation",
          text: r`$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$ and $\bar{y} = \frac{1}{n}\sum_{i=1}^{n} y_i$, so $\sum x_i = n\bar{x}$ and $\sum y_i = n\bar{y}$. $\bar{x}$ and $\bar{y}$ are constants inside any sum over $i$.`,
        },
        {
          term: "Deviations from the mean sum to zero",
          text: r`$\sum_{i=1}^{n}(x_i - \bar{x}) = \sum x_i - n\bar{x} = n\bar{x} - n\bar{x} = 0$ (Assignment 2 Q4(b)).`,
        },
        {
          term: "Cross-product identity",
          text: r`$\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}$ (Assignment 2 Q4(a)); this is how the past-paper Q1(c) is solved.`,
        },
      ],
      formulas: [
        { name: "Additivity property", tex: r`\sum_{i=1}^{n}(a_i + b_i) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i` },
        { name: "Homogeneity property", tex: r`\sum_{i=1}^{n} c\,a_i = c\sum_{i=1}^{n} a_i` },
        { name: "Sum of a constant", tex: r`\sum_{i=1}^{n} c = nc` },
        { name: "Rules combined", tex: r`\sum_{i=1}^{n}(a_i + b_i - c_i + d) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i - \sum_{i=1}^{n} c_i + nd` },
        { name: "Mean", tex: r`\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i \quad\Longrightarrow\quad \sum_{i=1}^{n} x_i = n\bar{x}` },
        { name: "Sum of deviations", tex: r`\sum_{i=1}^{n}(x_i - \bar{x}) = 0`, note: "Assignment 2 Q4(b)" },
        { name: "Cross-product identity", tex: r`\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}`, note: "Assignment 2 Q4(a); used in past paper Q1(c)" },
      ],
      figures: [
        {
          title: "Deviations from the mean cancel out",
          x: "x",
          xr: [0, 7],
          yr: [-0.6, 1.4],
          numberLine: true,
          points: [
            { at: [1, 0], label: "x₁ = 1" },
            { at: [2, 0], label: "x₂ = 2" },
            { at: [6, 0], label: "x₃ = 6" },
            { at: [3, 0], label: "mean = 3", tone: 1 },
          ],
          segments: [
            { from: [3, 0.45], to: [1, 0.45], arrow: true, tone: 1, label: "−2" },
            { from: [3, 0.9], to: [2, 0.9], arrow: true, tone: 1, label: "−1" },
            { from: [3, 0.45], to: [6, 0.45], arrow: true, tone: 2, label: "+3" },
          ],
          caption: "Data 1, 2, 6 has mean 3. The deviations −2, −1 and +3 add up to 0, as Σ(xᵢ − x̄) = 0 says for any data.",
        },
      ],
      worked: [
        {
          problem: r`Use the rules for sums to simplify (a) $\sum_{i=1}^{4}(x_i + y_i)$, (b) $\sum_{i=1}^{5}\left(\dfrac{x_i}{2}\right)^2 - 5$, (c) $\sum_{i=1}^{3}(x_i + 3)$.`,
          solution: r`(a) Additivity: $\sum_{i=1}^{4} x_i + \sum_{i=1}^{4} y_i = (x_1 + x_2 + x_3 + x_4) + (y_1 + y_2 + y_3 + y_4)$.
(b) $\left(\dfrac{x_i}{2}\right)^2 = \dfrac{1}{4}x_i^2$, so by homogeneity $\sum_{i=1}^{5}\dfrac{1}{4}x_i^2 - 5 = \dfrac{1}{4}(x_1^2 + x_2^2 + x_3^2 + x_4^2 + x_5^2) - 5$.
(The $-5$ is outside the sum. If it were inside the brackets it would be summed 5 times: $\frac{1}{4}\sum x_i^2 - 25$.)
(c) Additivity and the constant rule: $\sum_{i=1}^{3} x_i + \sum_{i=1}^{3} 3 = x_1 + x_2 + x_3 + 9$.`,
          source: "Lecture Note 2 exercise (2.2)",
        },
        {
          problem: r`Evaluate (a) $\sum_{j=1}^{n}\left(3\sum_{i=1}^{5} 2^i - 86\right)$, (b) $\sum_{j=0}^{3}(j+1)(j-1)$, (c) $\sum_{k=1}^{4}\dfrac{4y_k}{\sum_{i=1}^{2}(x_i - 2)}$, (d) $\sum_{i=1}^{n} x_i + \sum_{i=n+1}^{N} x_i$.`,
          solution: r`(a) Inner sum first: $\sum_{i=1}^{5} 2^i = 2 + 4 + 8 + 16 + 32 = 62$, so the bracket is $3(62) - 86 = 100$, a constant. Constant rule: $\sum_{j=1}^{n} 100 = 100n$.
(b) $(j+1)(j-1) = j^2 - 1$. For $j = 0, 1, 2, 3$: $-1 + 0 + 3 + 8 = 10$.
(c) The denominator does not involve $k$: $\sum_{i=1}^{2}(x_i - 2) = x_1 + x_2 - 4$, a constant. So the sum is $\dfrac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 4}$.
(d) The two ranges $1, \dots, n$ and $n+1, \dots, N$ join up: $\sum_{i=1}^{N} x_i$.`,
          source: "Assignment 2 Q3(a)–(d)",
        },
        {
          problem: r`Suppose $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$ and $\bar{y} = \frac{1}{n}\sum_{i=1}^{n} y_i$. Show that (a) $\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}$ and (b) $\sum_{i=1}^{n}(x_i - \bar{x}) = 0$.`,
          solution: r`(a) Expand the product and apply additivity and homogeneity ($\bar{x}, \bar{y}$ are constants):
$$\sum(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - \bar{y}\sum x_i - \bar{x}\sum y_i + \sum \bar{x}\bar{y}$$
Use $\sum x_i = n\bar{x}$, $\sum y_i = n\bar{y}$ and $\sum_{i=1}^{n}\bar{x}\bar{y} = n\bar{x}\bar{y}$:
$$= \sum x_i y_i - n\bar{x}\bar{y} - n\bar{x}\bar{y} + n\bar{x}\bar{y} = \sum x_i y_i - n\bar{x}\bar{y}$$
(b) $\sum(x_i - \bar{x}) = \sum x_i - n\bar{x} = n\bar{x} - n\bar{x} = 0$.`,
          source: "Assignment 2 Q4",
        },
        {
          problem: r`Suppose $\frac{1}{10}\sum_{i=1}^{10} x_i y_i = 250$, $\bar{y} = \frac{1}{10}\sum_{i=1}^{10} y_i = 20$ and $\bar{x} = \frac{1}{10}\sum_{i=1}^{10} x_i = 5$. Compute $\sum_{i=1}^{10}(x_i - \bar{x})(y_i - \bar{y})$.`,
          solution: r`By the cross-product identity with $n = 10$: $\sum x_i y_i = 10 \times 250 = 2500$, so
$$\sum_{i=1}^{10}(x_i - \bar{x})(y_i - \bar{y}) = 2500 - 10(5)(20) = 2500 - 1000 = 1500.$$
Watch out: the 250 is the **average** of $x_i y_i$, so multiply by 10 first.`,
          source: "Past paper Q1(c)",
        },
      ],
    },

    // ------------------------------------------------------------------ 2.3
    {
      title: "2.3 Double Sums",
      intro: r`A double sum combines two summation signs. It adds up every entry of a rectangular array (a spreadsheet).`,
      points: [
        {
          term: "The array",
          text: r`Numbers $a_{ij}$ arranged in $m$ rows and $n$ columns, with $1 \le i \le m$ (row) and $1 \le j \le n$ (column). The array can be regarded as a spreadsheet.`,
        },
        {
          term: "Economic example",
          text: r`$a_{ij}$ may be the total revenue of a firm from its sales in region $i$ in month $j$.`,
        },
        {
          term: "How many numbers",
          text: r`$m$ rows and $n$ columns give $mn$ numbers in all.`,
        },
        {
          term: "Order is immaterial",
          text: r`In a finite double sum the **order** of summation is immaterial: summing each row then adding the row totals gives the same as summing each column then adding the column totals. Here $n$ is the number of elements in each row and $m$ the number in each column.`,
        },
        {
          term: "Method",
          text: r`Work from the inside out: evaluate the inner sum treating the outer index as a constant, then evaluate the outer sum.`,
        },
      ],
      formulas: [
        { name: "Double sum: order immaterial", tex: r`\sum_{i=1}^{m}\sum_{j=1}^{n} a_{ij} = \sum_{j=1}^{n}\sum_{i=1}^{m} a_{ij}` },
      ],
      table: [
        ["", "$j = 1$", "$j = 2$", "$j = 3$", "Row total"],
        ["$i = 1$", "10", "1", "0", "11"],
        ["$i = 2$", "1", "2", "6", "9"],
        ["Column total", "11", "3", "6", "**20**"],
      ],
      worked: [
        {
          problem: r`For the array with rows $(10, 1, 0)$ and $(1, 2, 6)$, show that $\sum_{i=1}^{2}\sum_{j=1}^{3} a_{ij} = \sum_{j=1}^{3}\sum_{i=1}^{2} a_{ij}$.`,
          solution: r`Rows first: $(10 + 1 + 0) + (1 + 2 + 6) = 11 + 9 = 20$.
Columns first: $(10 + 1) + (1 + 2) + (0 + 6) = 11 + 3 + 6 = 20$.
Both orders give 20 (see the table above).`,
          source: "Lecture Note 2 example (2.3)",
        },
        {
          problem: r`Evaluate $\sum_{i=1}^{3}\sum_{j=1}^{4}(i + 2j)$.`,
          solution: r`Inner sum over $j$ (treat $i$ as fixed):
$$\sum_{j=1}^{4}(i + 2j) = (i+2) + (i+4) + (i+6) + (i+8) = 4i + 20$$
Outer sum: $\sum_{i=1}^{3}(4i + 20) = (4 + 20) + (8 + 20) + (12 + 20) = 84$.
Check the other order: $\sum_{i=1}^{3}(i + 2j) = 6 + 6j$, and $\sum_{j=1}^{4}(6 + 6j) = 24 + 60 = 84$.`,
          source: "Lecture Note 2 example (2.3)",
        },
        {
          problem: r`Evaluate $\sum_{j=1}^{4}\sum_{i=1}^{3}\dfrac{2i - j}{4}$.`,
          solution: r`Inner sum over $i$: $\sum_{i=1}^{3}(2i - j) = 2(1 + 2 + 3) - 3j = 12 - 3j$.
Outer sum: $\sum_{j=1}^{4}\dfrac{12 - 3j}{4} = \dfrac{1}{4}\left(48 - 3(1 + 2 + 3 + 4)\right) = \dfrac{48 - 30}{4} = \dfrac{18}{4} = 4.5$.`,
          source: "Assignment 2 Q3(e)",
        },
      ],
    },

    // ------------------------------------------------------------------ 2.4
    {
      title: "2.4 Few Aspects of Logic",
      intro: r`Necessary and sufficient conditions are used all the time in economics. They are both read off the implication arrow.`,
      points: [
        {
          term: "Implication",
          text: r`If whenever $P$ is true $Q$ is necessarily true, we write $P \Rightarrow Q$: "$P$ implies $Q$", "if $P$ then $Q$", or "$Q$ is a consequence of $P$".`,
          eg: r`John is a healthy person $\Rightarrow$ John breathes without difficulty; $x > 2 \Rightarrow x^2 > 4$.`,
        },
        {
          term: "Necessary condition",
          text: r`In $P \Rightarrow Q$, $Q$ is a **necessary condition** for $P$: $P$ is true only if $Q$ is true.`,
        },
        {
          term: "Sufficient condition",
          text: r`In $P \Rightarrow Q$, $P$ is a **sufficient condition** for $Q$: for $Q$ to be true it is sufficient that $P$ is true. But it is **not necessary** that $P$ holds to make $Q$ true.`,
        },
        {
          term: "Father example",
          text: r`A person is a father $\Rightarrow$ a person is male. Being a father is sufficient for being male, but not the only way to be male: e.g. a boy, or a man with no children, is male but not a father.`,
        },
        {
          term: "Converse",
          text: r`The converse of $P \Rightarrow Q$ is $Q \Rightarrow P$. It need not be true: male $\Rightarrow$ father is wrong, so fatherhood is not a necessary condition for maleness.`,
        },
        {
          term: "If and only if",
          text: r`If $Q$ is both necessary and sufficient for $P$, write $P \Leftrightarrow Q$, read "$P$ if and only if $Q$".`,
          eg: r`There are less than 30 days in the month $\Leftrightarrow$ February (both $\Rightarrow$ and $\Leftarrow$ hold).`,
        },
        {
          term: "Remarks 1–3: what to prove",
          text: r`- To prove $P \Rightarrow Q$, show that $Q$ follows logically from $P$.
- To prove $P \Leftarrow Q$, show that $P$ follows logically from $Q$.
- To prove $P \Leftrightarrow Q$, show that $P$ and $Q$ follow from each other (both directions).`,
        },
        {
          term: "Remark 4: contrapositive",
          text: r`$P \Rightarrow Q$ is equivalent to $\text{not } Q \Rightarrow \text{not } P$. If $Q$ fails, $P$ cannot have been true, because $P$ would have forced $Q$.`,
          eg: r`"If it is raining, the grass is getting wet" is logically equivalent to "If the grass is not getting wet, then it is not raining".`,
        },
        {
          term: "Choosing the arrow",
          text: r`Test each direction separately. If one direction has a counterexample, use the single arrow that holds; use $\Leftrightarrow$ only if both directions hold.`,
          eg: r`$x > 3 \Rightarrow x^2 > 9$, but $x^2 > 9 \not\Rightarrow x > 3$ (take $x = -4$).`,
        },
      ],
      formulas: [
        { name: "Sufficient / necessary", tex: r`P \text{ sufficient for } Q \;\iff\; Q \text{ necessary for } P \;\iff\; P \Rightarrow Q` },
        { name: "If and only if", tex: r`P \Leftrightarrow Q \quad\text{means}\quad P \Rightarrow Q \text{ and } Q \Rightarrow P` },
        { name: "Contrapositive (Remark 4)", tex: r`(P \Rightarrow Q) \;\text{is equivalent to}\; (\text{not } Q \Rightarrow \text{not } P)` },
      ],
      table: [
        ["Statement", "Read as", "Necessary / sufficient"],
        ["$P \\Rightarrow Q$", "$P$ implies $Q$; if $P$ then $Q$", "$P$ sufficient for $Q$; $Q$ necessary for $P$"],
        ["$P \\Leftarrow Q$", "$Q$ implies $P$", "$Q$ sufficient for $P$; $P$ necessary for $Q$"],
        ["$P \\Leftrightarrow Q$", "$P$ if and only if $Q$", "each is necessary and sufficient for the other"],
      ],
      figures: [
        {
          kind: "venn",
          title: "Father ⇒ male",
          sets: ["Fathers", "Males"],
          shade: ["11"],
          items: { "10": "empty", "01": "boys, men without children" },
          caption: "Every father is male, so the 'father but not male' region is empty: being a father is sufficient for being male. Males outside the father set show the converse fails: being a father is not necessary.",
        },
        {
          title: "x > 2 ⇒ x² > 4 (but not the converse)",
          x: "x",
          xr: [-5, 5],
          yr: [-0.6, 1.8],
          numberLine: true,
          segments: [
            { from: [2, 0.5], to: [5, 0.5], arrow: true, tone: 0, label: "P: x > 2" },
            { from: [2, 1.2], to: [5, 1.2], arrow: true, tone: 1, label: "Q: x² > 4" },
            { from: [-2, 1.2], to: [-5, 1.2], arrow: true, tone: 1 },
          ],
          points: [
            { at: [2, 0.5], open: true },
            { at: [2, 1.2], open: true, tone: 1 },
            { at: [-2, 1.2], open: true, tone: 1 },
            { at: [-2, 0], label: "−2" },
            { at: [2, 0], label: "2" },
          ],
          caption: "Every x in P also lies in Q, so P ⇒ Q. But x = −3 satisfies Q and not P, so Q does not imply P.",
        },
      ],
      worked: [
        {
          problem: r`Are these using the most suitable implication arrow? If not, give the most suitable arrow.
(a) $x > 3 \Leftrightarrow x^2 > 9$
(b) It is a rational number $\Rightarrow$ this number can be expressed as a meaningful ratio of two integers.
(c) $x$ is divisible by 2 $\Leftrightarrow$ $x$ is an even number.
(d) My car runs out of gas $\Leftarrow$ I cannot start my EV car.
(e) A person is eligible to vote in Singapore $\Leftarrow$ the person is 21 years or older.`,
          solution: r`(a) Not suitable. $x > 3 \Rightarrow x^2 > 9$ is true, but $x^2 > 9$ does not imply $x > 3$ (e.g. $x = -4$). Use $\Rightarrow$.
(b) Not the most suitable: a rational number is by definition $\frac{a}{b}$ with $a, b$ integers and $b \ne 0$, so both directions hold. Use $\Leftrightarrow$.
(c) Suitable: an integer divisible by 2 is even and an even number is divisible by 2. $\Leftrightarrow$ is correct.
(d) Not suitable. Not being able to start an EV does not mean it ran out of gas (an EV runs on electricity: a flat battery or a fault would stop it). Running out of gas also has no bearing on starting an EV, so no arrow holds in either direction for an EV. (For a petrol car the suitable arrow would be $\Rightarrow$: running out of gas means it cannot start, but it may fail to start for other reasons.)
(e) Not suitable. Being 21 or older does not make a person eligible (they must also be a citizen, for example), but an eligible voter must be 21 or older. Use $\Rightarrow$: being 21 or older is a necessary, not sufficient, condition.`,
          source: "Assignment 2 Q2",
        },
      ],
    },

    // ------------------------------------------------------------------ 2.5
    {
      title: "2.5 Mathematical Proofs",
      intro: r`Every theorem is an implication $P \Rightarrow Q$. There are two ways to prove it, both deductive.`,
      points: [
        {
          term: "Theorems",
          text: r`In mathematics the most important results are called theorems. Every theorem can be formulated as an implication $P \Rightarrow Q$.`,
        },
        {
          term: "Premises and conclusions",
          text: r`$P$ is a proposition (or series of propositions) called the **premises**: what we know. $Q$ is a proposition (or series of propositions) called the **conclusions**: what we want to know.`,
        },
        {
          term: "Direct proof",
          text: r`Start from the premises $P$ and successively work forward to the conclusions $Q$.`,
        },
        {
          term: "Indirect proof",
          text: r`To prove $P \Rightarrow Q$, suppose that $Q$ is **not** true and on that basis demonstrate that $P$ cannot be true either. This is legitimate because $P \Rightarrow Q$ is equivalent to $\text{not } Q \Rightarrow \text{not } P$.`,
        },
        {
          term: "Disproving a statement",
          text: r`To disprove "if $P$ then $Q$" it is enough to give one counterexample: a case where $P$ is true but $Q$ is false (used in Assignment 2 Q1).`,
        },
        {
          term: "Deductive reasoning",
          text: r`Both methods of proof are examples of deductive reasoning: reasoning based on consistent rules of logic.`,
        },
        {
          term: "Inductive reasoning",
          text: r`Many branches of science use inductive reasoning: drawing general conclusions based only on a few (or even one) observations. In mathematics inductive reasoning is **not** recognised as a form of proof; in economics it often turns out to be false.`,
          eg: r`A company's profit has risen in each of the past 20 years. This is a very good indication that it will rise again this year, but it is not a mathematical proof.`,
        },
      ],
      figures: [
        {
          title: "−x² + 5x − 4 > 0 only for 1 < x < 4",
          xr: [-0.5, 5.5],
          yr: [-5, 3],
          curves: [{ f: "-x^2 + 5*x - 4", label: "y = −x² + 5x − 4" }],
          shade: [{ f: "-x^2 + 5*x - 4", from: 1, to: 4, tone: 2, label: "P true" }],
          points: [
            { at: [1, 0], label: "1" },
            { at: [4, 0], label: "4" },
          ],
          caption: "The expression is positive exactly when 1 < x < 4, and every such x is positive: so P ⇒ x > 0. For x ≤ 0 the curve is at most −4.",
        },
      ],
      worked: [
        {
          problem: r`Use the two methods of proof to prove that $-x^2 + 5x - 4 > 0 \Rightarrow x > 0$.`,
          solution: r`**Direct proof.** Suppose $-x^2 + 5x - 4 > 0$. Multiplying by $-1$ reverses the inequality: $x^2 - 5x + 4 < 0$, i.e. $(x - 1)(x - 4) < 0$. A product is negative only when the factors have opposite signs, and $x - 1 > x - 4$, so $x - 1 > 0$ and $x - 4 < 0$: $1 < x < 4$. Hence $x > 0$.
**Indirect proof.** Suppose the conclusion is false, i.e. $x \le 0$. Then $-x^2 \le 0$ and $5x \le 0$, so $-x^2 + 5x - 4 \le -4 < 0$. So the premise $-x^2 + 5x - 4 > 0$ cannot be true. Since not $Q \Rightarrow$ not $P$, we have $P \Rightarrow Q$.`,
          source: "Lecture Note 2 example (2.5)",
        },
        {
          problem: r`Prove or disprove: (a) If $x > y$, then $x^2 > y^2$. (b) If $x + y > 0$ and $x > y$, then $x^2 > y^2$.`,
          solution: r`(a) **False.** Counterexample: $x = 1$, $y = -2$. Then $x > y$, but $x^2 = 1 < 4 = y^2$.
(b) **True** (direct proof). $x^2 - y^2 = (x + y)(x - y)$. The premises give $x + y > 0$ and $x - y > 0$, so the product of two positive numbers is positive: $x^2 - y^2 > 0$, i.e. $x^2 > y^2$.`,
          source: "Assignment 2 Q1(a)(b)",
        },
        {
          problem: r`Prove or disprove: (c) If $x, y$ are nonnegative, then $\dfrac{x + y}{2} \ge \sqrt{xy}$. (d) $\sum_{i=1}^{n}\dfrac{x_i}{y_i} = \dfrac{\sum_{i=1}^{n} x_i}{\sum_{i=1}^{n} y_i}$.`,
          solution: r`(c) **True.** Since $x, y \ge 0$, $\sqrt{x}$ and $\sqrt{y}$ exist and $(\sqrt{x})^2 = x$, $(\sqrt{y})^2 = y$, $\sqrt{x}\sqrt{y} = \sqrt{xy}$. A square is never negative:
$$(\sqrt{x} - \sqrt{y})^2 \ge 0 \;\Rightarrow\; x - 2\sqrt{xy} + y \ge 0 \;\Rightarrow\; \frac{x + y}{2} \ge \sqrt{xy}.$$
(Equality when $x = y$.)
(d) **False.** Counterexample: $n = 2$, $x_1 = x_2 = 1$, $y_1 = 1$, $y_2 = 2$. LHS $= \frac{1}{1} + \frac{1}{2} = 1.5$; RHS $= \frac{1 + 1}{1 + 2} = \frac{2}{3}$. $1.5 \ne \frac{2}{3}$.`,
          source: "Assignment 2 Q1(c)(d)",
        },
      ],
    },

    // ------------------------------------------------------------------ 2.6
    {
      title: "2.6 Essentials of Set Theory",
      intro: r`Sets give a precise language for collections of objects, and subsets are the set version of implication.`,
      points: [
        {
          term: "Set",
          text: r`A set is simply a **collection** of distinct objects: numbers or anything else.`,
          eg: r`All students enrolled in HE1004; the natural numbers bigger than 0 but smaller than 1 (there are none, so this is the empty set).`,
        },
        {
          term: "Elements",
          text: r`The objects in a set are called the **elements** (or **members**) of the set.`,
        },
        {
          term: "Set-builder notation",
          text: r`Not every set can be defined by listing its elements: for the set of all positive integers it is almost impossible to write them all down. Instead write $S = \{x : x \text{ is a positive integer}\}$. In general: $S = \{\text{a typical element} : \text{defining properties}\}$.`,
        },
        {
          term: "Membership",
          text: r`$x \in S$: $x$ is an element of $S$. $y \notin S$: $y$ is not an element of $S$.`,
        },
        {
          term: "Equal sets",
          text: r`$A = B$ if each element of $A$ is in $B$ and each element of $B$ is in $A$. Order does not matter.`,
          eg: r`$A = \{1, 0, 4\} = \{0, 4, 1\} = B$.`,
        },
        {
          term: "Subset",
          text: r`$A \subseteq B$ if every element of $A$ is in $B$.`,
          eg: r`$\{1, 2\} \subseteq \{1, 2, 3, 6, 10\}$.`,
        },
        {
          term: "Complement",
          text: r`The complement $A^c$ is the set of all elements in the universal set $\Omega$ that are not in $A$.`,
          eg: r`$\Omega = \{1, 2, \dots, 10\}$, $A = \{1, 2, 3\}$: $A^c = \{4, 5, 6, 7, 8, 9, 10\}$.`,
        },
        {
          term: "Remarks",
          text: r`- $A \subseteq A$ (every set is a subset of itself).
- If $A \subseteq B$ and $B \subseteq A$, then $A = B$.
- A set with no elements is the **empty set**, written $\{\}$ or $\emptyset$.`,
        },
        {
          term: "Number sets",
          text: r`$\mathbf{N} = \{1, 2, 3, 4, \dots\}$ (natural numbers); $\mathbf{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$ (integers); $\mathbf{Q} = \{\frac{a}{b} : a \text{ and } b \text{ are integers}, b \ne 0\}$ (rationals); $\mathbf{R}$ = all the numbers on the real line. Clearly $\mathbf{N} \subseteq \mathbf{Z} \subseteq \mathbf{Q} \subseteq \mathbf{R}$.`,
        },
        {
          term: "Set operations",
          text: r`Union $A \cup B$: elements in at least one of $A$ and $B$. Intersection $A \cap B$: elements in both. Difference $A \setminus B$ ("$A$ minus $B$"): elements in $A$ but not in $B$.`,
        },
        {
          term: "Subsets and implication",
          text: r`$A \subseteq B$ means $x \in A \Rightarrow x \in B$: being in $A$ is **sufficient** for being in $B$, and being in $B$ is **necessary** for being in $A$. $A = B$ means $x \in A \Leftrightarrow x \in B$ (Assignment 3 Q2).`,
        },
      ],
      formulas: [
        { name: "Union", tex: r`A \cup B = \{x : x \in A \text{ or } x \in B\}` },
        { name: "Intersection", tex: r`A \cap B = \{x : x \in A \text{ and } x \in B\}` },
        { name: "Difference (A minus B)", tex: r`A \setminus B = \{x : x \in A \text{ and } x \notin B\}` },
        { name: "Complement", tex: r`A^c = \{x \in \Omega : x \notin A\}` },
        { name: "Equality from subsets", tex: r`A \subseteq B \text{ and } B \subseteq A \;\Rightarrow\; A = B` },
      ],
      table: [
        ["Notation", "Name", "The set consists of"],
        ["$A \\cup B$", "$A$ union $B$", "the elements that belong to at least one of the sets $A$ and $B$"],
        ["$A \\cap B$", "$A$ intersection $B$", "the elements that belong to both $A$ and $B$"],
        ["$A \\setminus B$", "$A$ minus $B$", "the elements that belong to $A$ but not to $B$"],
        ["$A^c$", "complement of $A$", "the elements of the universal set $\\Omega$ that are not in $A$"],
      ],
      figures: [
        {
          kind: "venn",
          title: "C ⊆ A",
          sets: ["A", "C"],
          shade: ["11"],
          items: { "01": "empty" },
          caption: "C is a subset of A: no element of C lies outside A, so the 'C only' region is empty.",
        },
        {
          kind: "venn",
          title: "A ∪ B",
          sets: ["A", "B"],
          shade: ["10", "11", "01"],
          caption: "Union: everything in at least one of A and B.",
        },
        {
          kind: "venn",
          title: "A ∩ B",
          sets: ["A", "B"],
          shade: ["11"],
          caption: "Intersection: only the elements in both A and B.",
        },
        {
          kind: "venn",
          title: "A \\ B",
          sets: ["A", "B"],
          shade: ["10"],
          caption: "A minus B: the part of A that is not in B.",
        },
        {
          kind: "venn",
          title: "Complement Aᶜ",
          sets: ["A", "B"],
          shade: ["01", "00"],
          items: { "10": "1, 2, 3", "11": "4, 5", "01": "6, 7", "00": "8, 9, 10" },
          universe: "Ω = {1, …, 10}",
          caption: "With A = {1,…,5} and B = {4,…,7}: Aᶜ (shaded) = {6, 7, 8, 9, 10}, everything in Ω outside A.",
        },
        {
          kind: "venn",
          title: "Three sets: A ∩ (B ∪ C)",
          sets: ["A", "B", "C"],
          shade: ["110", "111", "101"],
          caption: "The lecture's three-set example: the shaded part of A that overlaps B or C.",
        },
        {
          title: "Feasible consumption set: 5x + 6y ≤ 30",
          x: "x (wings)",
          y: "y (bubble tea)",
          xr: [0, 9],
          yr: [0, 7],
          curves: [{ f: "(30 - 5*x)/6", from: 0, to: 6, label: "5x + 6y = 30" }],
          shade: [
            { f: "(30 - 5*x)/6", from: 0, to: 6, tone: 2, label: "feasible set F" },
            { f: "7", g: "(30 - 5*x)/6", from: 0, to: 6, tone: 1, label: "complement Fᶜ" },
            { f: "7", from: 6, to: 9, tone: 1 },
          ],
          points: [
            { at: [0, 5], label: "(0, 5)" },
            { at: [6, 0], label: "(6, 0)" },
          ],
          labels: [{ at: [6.2, 6.3], text: "Ω = whole quadrant x, y ≥ 0", tone: 3 }],
          caption: "Assignment 3 Q1. Green: affordable bundles (on or below the budget line). Orange: the infeasible complement. Together they make the universal set Ω, all bundles with x ≥ 0 and y ≥ 0.",
        },
      ],
      worked: [
        {
          problem: r`Let $A = \{2, 4, 6, 8, 10, 12\}$ and $C = \{1, 2, 4\}$. Find $A \cup C$, $A \cap C$, $A \setminus C$ and $C \setminus A$.`,
          solution: r`- $A \cup C = \{1, 2, 4, 6, 8, 10, 12\}$ (everything in at least one; 2 and 4 listed once).
- $A \cap C = \{2, 4\}$ (in both).
- $A \setminus C = \{6, 8, 10, 12\}$ (in $A$, not in $C$).
- $C \setminus A = \{1\}$ (in $C$, not in $A$).`,
          source: "Modelled on Lecture Note 2 set operations, sets from Assignment 3 Q2",
        },
        {
          problem: r`Bubble tea costs 6 dollars and a Mala chicken wing costs 5 dollars. With quantities $y$ (bubble tea) and $x$ (wings), a consumer has 30 dollars to spend. (a) Write down and draw the feasible (consumption) set. (b) Where is its complement (the infeasible set)? (c) Where is the universal set?`,
          solution: r`(a) Spending cannot exceed 30 dollars: $5x + 6y \le 30$, with $x \ge 0$, $y \ge 0$.
$$F = \{(x, y) : 5x + 6y \le 30,\ x \ge 0,\ y \ge 0\}$$
The budget line $5x + 6y = 30$ meets the axes at $(6, 0)$ (all wings) and $(0, 5)$ (all bubble tea). $F$ is the triangle with corners $(0,0)$, $(6,0)$, $(0,5)$, including the budget line (spending exactly 30 dollars). See the figure.
(b) The complement is everything in the universal set but not in $F$: $F^c = \{(x, y) : x \ge 0,\ y \ge 0,\ 5x + 6y > 30\}$, the region strictly above the budget line.
(c) The universal set is all possible consumption bundles, $\Omega = \{(x, y) : x \ge 0,\ y \ge 0\}$: the whole nonnegative quadrant (quantities cannot be negative). $\Omega = F \cup F^c$.`,
          source: "Assignment 3 Q1",
        },
        {
          problem: r`$A = \{2, 4, 6, 8, 10, 12\}$, $B = \{2, 4, 6\}$, $C = \{1, 2, 4\}$, $D = \{1, 2, 4\}$. Describe the relationship between each pair in terms of necessary and sufficient conditions: (a) $A$ and $B$, (b) $C$ and $D$, (c) $A$ and $C$.`,
          solution: r`(a) Every element of $B$ is in $A$, so $B \subseteq A$: $x \in B \Rightarrow x \in A$. Being in $B$ is **sufficient** for being in $A$, and being in $A$ is **necessary** for being in $B$. Not the other way round: $8 \in A$ but $8 \notin B$.
(b) $C = D$, so $x \in C \Leftrightarrow x \in D$: each is **necessary and sufficient** for the other.
(c) $1 \in C$ but $1 \notin A$, so $C \not\subseteq A$; $6 \in A$ but $6 \notin C$, so $A \not\subseteq C$. Membership of one is **neither necessary nor sufficient** for membership of the other (they only share $A \cap C = \{2, 4\}$).`,
          source: "Assignment 3 Q2",
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "sums-logic-sets-c1", type: "concept", front: r`The capital Greek letter used as the summation symbol.`, back: "sigma", why: r`$\Sigma$ (capital sigma): $\sum_{i=1}^{n} a_i = a_1 + \dots + a_n$.` },
    { id: "sums-logic-sets-c2", type: "concept", front: r`In $\sum_{i=4}^{7} N_i$, the letter $i$ that runs through successive integers 4, 5, 6, 7.`, back: "summation index", why: r`The index takes every integer from the lower limit to the upper limit; it need not start at 1.` },
    { id: "sums-logic-sets-c3", type: "concept", front: r`The rule $\sum_{i=1}^{n}(a_i + b_i) = \sum a_i + \sum b_i$.`, back: "additivity property", why: r`Property (1) of the sigma notation: a sum of sums splits into separate sums.` },
    { id: "sums-logic-sets-c4", type: "concept", front: r`The rule $\sum_{i=1}^{n} c\,a_i = c\sum_{i=1}^{n} a_i$.`, back: "homogeneity property", why: r`Property (2): a constant factor comes outside the sum.` },
    { id: "sums-logic-sets-c5", type: "concept", front: r`In $P \Rightarrow Q$, what $Q$ is for $P$ ("$P$ is true only if $Q$ is true").`, back: "necessary condition", why: r`$Q$ must hold whenever $P$ holds, so $Q$ is necessary for $P$.` },
    { id: "sums-logic-sets-c6", type: "concept", front: r`In $P \Rightarrow Q$, what $P$ is for $Q$ ("for $Q$ to be true it is enough that $P$ is true").`, back: "sufficient condition", why: r`$P$ being true suffices to establish $Q$, though $Q$ may also be true without $P$.` },
    { id: "sums-logic-sets-c7", type: "concept", front: r`How $P \Leftrightarrow Q$ is read: $Q$ is both necessary and sufficient for $P$.`, back: "if and only if", why: r`$P \Leftrightarrow Q$ means $P \Rightarrow Q$ and $Q \Rightarrow P$, e.g. fewer than 30 days in the month $\Leftrightarrow$ February.` },
    { id: "sums-logic-sets-c8", type: "concept", front: r`The statement $Q \Rightarrow P$ formed by reversing $P \Rightarrow Q$ (e.g. male $\Rightarrow$ father).`, back: "converse", why: r`The converse need not be true: father $\Rightarrow$ male holds, male $\Rightarrow$ father does not.` },
    { id: "sums-logic-sets-c9", type: "concept", front: r`The equivalent form "not $Q \Rightarrow$ not $P$" of $P \Rightarrow Q$.`, back: "contrapositive", why: r`Remark 4 in 2.4: $P \Rightarrow Q$ is equivalent to not $Q \Rightarrow$ not $P$. It is the basis of the indirect proof.` },
    { id: "sums-logic-sets-c10", type: "concept", front: r`A proof that starts from the premises $P$ and works forward step by step to the conclusions $Q$.`, back: "direct proof", why: r`One of the two types of proof in 2.5.` },
    { id: "sums-logic-sets-c11", type: "concept", front: r`A proof of $P \Rightarrow Q$ that supposes $Q$ is not true and shows $P$ cannot be true either.`, back: "indirect proof", why: r`Legitimate because $P \Rightarrow Q$ is equivalent to not $Q \Rightarrow$ not $P$.` },
    { id: "sums-logic-sets-c12", type: "concept", front: r`Reasoning based on consistent rules of logic (both direct and indirect proofs are examples).`, back: "deductive reasoning", why: r`Deductive reasoning is what counts as proof in mathematics.` },
    { id: "sums-logic-sets-c13", type: "concept", front: r`Drawing general conclusions from only a few (or even one) observations, e.g. "profit rose for 20 years so it will rise this year".`, back: "inductive reasoning", why: r`Not recognised as proof in mathematics; in economics it often turns out to be false.` },
    { id: "sums-logic-sets-c14", type: "concept", front: r`In a theorem $P \Rightarrow Q$, the name for $P$ (what we know).`, back: "premises", why: r`$P$ = premises (what we know); $Q$ = conclusions (what we want to know).` },
    { id: "sums-logic-sets-c15", type: "concept", front: r`A set with no elements, written $\{\}$ or $\emptyset$.`, back: "empty set", why: r`E.g. the natural numbers bigger than 0 but smaller than 1.` },
    { id: "sums-logic-sets-c16", type: "concept", front: r`The set $\Omega$ of all elements under consideration, used to define complements.`, back: "universal set", why: r`$A^c$ = elements of $\Omega$ not in $A$. In Assignment 3 Q1 it is the whole quadrant $x, y \ge 0$.` },
    { id: "sums-logic-sets-c17", type: "concept", front: r`$A^c$: the elements of the universal set that are not in $A$.`, back: "complement", why: r`$\Omega = \{1, \dots, 10\}$, $A = \{1, 2, 3\}$ gives $A^c = \{4, \dots, 10\}$.` },
    { id: "sums-logic-sets-c18", type: "concept", front: r`$A \subseteq B$: every element of $A$ is an element of $B$.`, back: "subset", why: r`$\{1, 2\} \subseteq \{1, 2, 3, 6, 10\}$; also $A \subseteq A$ always.` },
    { id: "sums-logic-sets-c19", type: "concept", front: r`$A \cup B$: the elements that belong to at least one of $A$ and $B$.`, back: "union", why: r`$A \cup B = \{x : x \in A \text{ or } x \in B\}$.` },
    { id: "sums-logic-sets-c20", type: "concept", front: r`$A \cap B$: the elements that belong to both $A$ and $B$.`, back: "intersection", why: r`$A \cap B = \{x : x \in A \text{ and } x \in B\}$.` },

    // method
    { id: "sums-logic-sets-c21", type: "method", front: r`Expand and evaluate $\sum_{k=1}^{3} 5k$.`, back: r`$5 + 10 + 15 = 30$`, why: r`Substitute $k = 1, 2, 3$ into $5k$ and add: $5(1) + 5(2) + 5(3) = 30$. (Or homogeneity: $5(1 + 2 + 3) = 30$.)` },
    { id: "sums-logic-sets-c22", type: "method", front: r`Write $5 + 5 \times 2^1 + 5 \times 2^2 + \dots + 5 \times 2^{10}$ in sigma notation.`, back: r`$\sum_{i=0}^{10} 5 \cdot 2^i$`, why: r`Find the general term $5 \times 2^i$. The first term $5 = 5 \times 2^0$, so start at $i = 0$; the last has $i = 10$. 11 terms.` },
    { id: "sums-logic-sets-c23", type: "method", front: r`Expand $\sum_{i=0}^{3} x_i y_j$.`, back: r`$y_j(x_0 + x_1 + x_2 + x_3)$`, why: r`Only the index $i$ changes. $j$ is not the summation index, so $y_j$ is the same in every term: $x_0 y_j + x_1 y_j + x_2 y_j + x_3 y_j$.` },
    { id: "sums-logic-sets-c24", type: "method", front: r`Simplify $\sum_{i=1}^{3}(x_i + 3)$ and $\sum_{i=1}^{5}\left(\frac{x_i}{2}\right)^2 - 5$.`, back: r`$\sum x_i + 9$ and $\frac{1}{4}\sum x_i^2 - 5$`, why: r`Additivity splits the first into $\sum x_i + \sum 3$, and the constant rule gives $\sum_{i=1}^{3} 3 = 9$. For the second, $(x_i/2)^2 = \frac{1}{4}x_i^2$; homogeneity pulls out $\frac{1}{4}$; the $-5$ is outside the sum so it is not multiplied by 5.` },
    { id: "sums-logic-sets-c25", type: "method", front: r`Evaluate $\sum_{j=1}^{n}\left(3\sum_{i=1}^{5} 2^i - 86\right)$.`, back: r`$100n$`, why: r`Inner sum first: $\sum_{i=1}^{5} 2^i = 62$. The bracket is $3(62) - 86 = 100$, which does not depend on $j$. A constant summed $n$ times: $100n$.` },
    { id: "sums-logic-sets-c26", type: "method", front: r`Evaluate $\sum_{k=1}^{4}\dfrac{4y_k}{\sum_{i=1}^{2}(x_i - 2)}$.`, back: r`$\dfrac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 4}$`, why: r`The denominator has no $k$, so it is a constant: $\sum_{i=1}^{2}(x_i - 2) = x_1 + x_2 - 4$. Homogeneity: pull out $\frac{4}{x_1 + x_2 - 4}$ and sum $y_k$ for $k = 1, \dots, 4$.` },
    { id: "sums-logic-sets-c27", type: "method", front: r`Evaluate a double sum such as $\sum_{i=1}^{3}\sum_{j=1}^{4}(i + 2j)$.`, back: r`Inner sum first (outer index fixed), then outer: answer 84.`, why: r`$\sum_{j=1}^{4}(i + 2j) = 4i + 2(1+2+3+4) = 4i + 20$. Then $\sum_{i=1}^{3}(4i + 20) = 4(6) + 60 = 84$. The order of summation does not matter, so you can check by summing over $i$ first: $\sum_{j=1}^{4}(6 + 6j) = 84$.` },
    { id: "sums-logic-sets-c28", type: "method", front: r`Given $\frac{1}{10}\sum_{i=1}^{10} x_i y_i = 250$, $\bar{y} = 20$, $\bar{x} = 5$, compute $\sum_{i=1}^{10}(x_i - \bar{x})(y_i - \bar{y})$.`, back: r`$\sum x_i y_i - n\bar{x}\bar{y} = 2500 - 1000 = 1500$`, why: r`Use the identity $\sum(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - n\bar{x}\bar{y}$. Convert the average to a total: $\sum x_i y_i = 10 \times 250 = 2500$. Then $2500 - 10 \times 5 \times 20 = 1500$. (Past paper Q1(c).)` },
    { id: "sums-logic-sets-c29", type: "method", front: r`Show that $\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - n\bar{x}\bar{y}$.`, back: r`Expand, split with additivity, then use $\sum x_i = n\bar{x}$, $\sum y_i = n\bar{y}$.`, why: r`$\sum(x_i y_i - \bar{y}x_i - \bar{x}y_i + \bar{x}\bar{y}) = \sum x_i y_i - \bar{y}(n\bar{x}) - \bar{x}(n\bar{y}) + n\bar{x}\bar{y} = \sum x_i y_i - n\bar{x}\bar{y}$. ($\bar{x}, \bar{y}$ are constants, so homogeneity and $\sum c = nc$ apply.)` },
    { id: "sums-logic-sets-c30", type: "method", front: r`Show that $\sum_{i=1}^{n}(x_i - \bar{x}) = 0$.`, back: r`$\sum x_i - n\bar{x} = n\bar{x} - n\bar{x} = 0$`, why: r`Additivity splits it into $\sum x_i - \sum \bar{x}$. $\bar{x}$ is a constant so $\sum_{i=1}^{n}\bar{x} = n\bar{x}$, and by definition of the mean $\sum x_i = n\bar{x}$.` },
    { id: "sums-logic-sets-c31", type: "method", front: r`Prove or disprove: if $x > y$, then $x^2 > y^2$.`, back: r`False: counterexample $x = 1$, $y = -2$.`, why: r`To disprove an implication, find one case where the premise is true and the conclusion false. $1 > -2$ but $1^2 = 1 < 4 = (-2)^2$.` },
    { id: "sums-logic-sets-c32", type: "method", front: r`Prove: if $x + y > 0$ and $x > y$, then $x^2 > y^2$.`, back: r`$x^2 - y^2 = (x + y)(x - y) > 0$ as a product of two positives.`, why: r`Direct proof: factor the difference of squares. The premises say $x + y > 0$ and $x - y > 0$, so $x^2 - y^2 > 0$.` },
    { id: "sums-logic-sets-c33", type: "method", front: r`Prove that $\dfrac{x + y}{2} \ge \sqrt{xy}$ for nonnegative $x, y$.`, back: r`Start from $(\sqrt{x} - \sqrt{y})^2 \ge 0$.`, why: r`Expanding gives $x - 2\sqrt{xy} + y \ge 0$, so $x + y \ge 2\sqrt{xy}$; divide by 2. Nonnegativity is needed so the square roots exist.` },
    { id: "sums-logic-sets-c34", type: "method", front: r`Prove or disprove: $\sum_{i=1}^{n}\dfrac{x_i}{y_i} = \dfrac{\sum x_i}{\sum y_i}$.`, back: r`False: $x = (1, 1)$, $y = (1, 2)$ gives $1.5 \ne \frac{2}{3}$.`, why: r`There is no rule for splitting a ratio inside a sum. A single numerical counterexample disproves the general claim.` },
    { id: "sums-logic-sets-c35", type: "method", front: r`How do you decide whether $\Rightarrow$, $\Leftarrow$ or $\Leftrightarrow$ is the most suitable arrow (e.g. $x > 3 \;?\; x^2 > 9$)?`, back: r`Test each direction; a counterexample rules a direction out. Here only $\Rightarrow$ holds.`, why: r`$x > 3 \Rightarrow x^2 > 9$ is true. $x^2 > 9 \Rightarrow x > 3$ fails for $x = -4$. So $\Leftrightarrow$ is too strong; use $\Rightarrow$. Use $\Leftrightarrow$ only when both directions hold (e.g. divisible by 2 $\Leftrightarrow$ even).` },
    { id: "sums-logic-sets-c36", type: "method", front: r`Prove $-x^2 + 5x - 4 > 0 \Rightarrow x > 0$ by an indirect proof.`, back: r`Assume $x \le 0$; then $-x^2 + 5x - 4 \le -4 < 0$, so the premise fails.`, why: r`Indirect proof: suppose not $Q$ ($x \le 0$). Then $-x^2 \le 0$ and $5x \le 0$, so the expression is at most $-4$. So not $P$. Since not $Q \Rightarrow$ not $P$ is equivalent to $P \Rightarrow Q$, done. (Direct: $(x-1)(x-4) < 0$ gives $1 < x < 4$, so $x > 0$.)` },
    { id: "sums-logic-sets-c37", type: "method", front: r`Describe $B = \{2, 4, 6\}$ and $A = \{2, 4, 6, 8, 10, 12\}$ in terms of necessary and sufficient conditions.`, back: r`$B \subseteq A$: $x \in B$ is sufficient for $x \in A$; $x \in A$ is necessary for $x \in B$.`, why: r`A subset relation is an implication: $x \in B \Rightarrow x \in A$. Equal sets give $\Leftrightarrow$ (necessary and sufficient); if neither is a subset of the other, membership is neither necessary nor sufficient.` },
    { id: "sums-logic-sets-c38", type: "method", front: r`Draw the feasible consumption set when bubble tea ($y$) costs 6 dollars, a chicken wing ($x$) costs 5 dollars and the budget is 30 dollars.`, back: r`$\{(x, y) : 5x + 6y \le 30, x \ge 0, y \ge 0\}$: triangle under the line through $(6, 0)$ and $(0, 5)$.`, why: r`Spending $5x + 6y$ cannot exceed 30. Intercepts: $y = 0 \Rightarrow x = 6$; $x = 0 \Rightarrow y = 5$. Shade on and below the line in the first quadrant. The complement (infeasible set) is above the line; the universal set is the whole quadrant $x, y \ge 0$.` },
    { id: "sums-logic-sets-c39", type: "method", front: r`Find $A \cup C$, $A \cap C$ and $A \setminus C$ for $A = \{2, 4, 6, 8, 10, 12\}$, $C = \{1, 2, 4\}$.`, back: r`$\{1, 2, 4, 6, 8, 10, 12\}$, $\{2, 4\}$, $\{6, 8, 10, 12\}$`, why: r`Union: everything in either (list repeats once). Intersection: only common elements. Difference: remove from $A$ anything that is in $C$.` },

    // formula
    { id: "sums-logic-sets-c40", type: "formula", front: "Sum of a constant (property 3)", back: r`$\sum_{i=1}^{n} c = nc$`, why: r`"A constant $c$ summed $n$ times is $n$ times $c$." Use whenever a term does not involve the index, e.g. $\sum_{i=1}^{3} 3 = 9$.` },
    { id: "sums-logic-sets-c41", type: "formula", front: "Rules for sums in combination", back: r`$\sum(a_i + b_i - c_i + d) = \sum a_i + \sum b_i - \sum c_i + nd$`, why: r`Additivity splits the sum, homogeneity moves constants out, and the constant $d$ summed $n$ times gives $nd$.` },
    { id: "sums-logic-sets-c42", type: "formula", front: "Interchanging a finite double sum", back: r`$\sum_{i=1}^{m}\sum_{j=1}^{n} a_{ij} = \sum_{j=1}^{n}\sum_{i=1}^{m} a_{ij}$`, why: r`The order of summation is immaterial: row totals then grand total = column totals then grand total. Use it to check a double-sum answer.` },
    { id: "sums-logic-sets-c43", type: "formula", front: "Cross-product (covariance) identity", back: r`$\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - n\bar{x}\bar{y}$`, why: r`Assignment 2 Q4(a). Use it when you are given $\sum x_i y_i$ (or its average) and the means, as in past paper Q1(c).` },
    { id: "sums-logic-sets-c44", type: "formula", front: "Implication and its contrapositive (Remark 4)", back: r`$P \Rightarrow Q$ is equivalent to not $Q \Rightarrow$ not $P$`, why: r`Justifies the indirect proof. Example: "raining $\Rightarrow$ grass wet" is equivalent to "grass not wet $\Rightarrow$ not raining".` },
    { id: "sums-logic-sets-c45", type: "formula", front: r`Union, intersection and $A \setminus B$ in set-builder form`, back: r`$\{x : x \in A \text{ or } x \in B\}$, $\{x : x \in A \text{ and } x \in B\}$, $\{x : x \in A \text{ and } x \notin B\}$`, why: r`"Or" for union (at least one), "and" for intersection (both), "in $A$ and not in $B$" for $A$ minus $B$.` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 2.1
    {
      id: "sums-logic-sets-q1",
      kind: "fill",
      sub: "Summation notation",
      prompt: r`$\sum_{k=1}^{3} 5k =$ ____`,
      answers: [["30"]],
      explain: r`Substitute $k = 1, 2, 3$: $5 + 10 + 15 = 30$.`,
    },
    {
      id: "sums-logic-sets-q2",
      kind: "fill",
      sub: "Summation notation",
      prompt: r`The sum $\sum_{i=4}^{7} N_i$ has ____ terms, and $\sum_{i=0}^{10} 5 \cdot 2^i$ has ____ terms.`,
      answers: [["4"], ["11"]],
      explain: r`A sum from $i = m$ to $i = n$ has $n - m + 1$ terms: $7 - 4 + 1 = 4$ ($N_4, N_5, N_6, N_7$) and $10 - 0 + 1 = 11$.`,
    },
    {
      id: "sums-logic-sets-q3",
      kind: "mcq",
      sub: "Summation notation",
      prompt: r`Which expression equals $5 + 5 \times 2^1 + 5 \times 2^2 + \dots + 5 \times 2^{10}$?`,
      options: [r`$\sum_{i=1}^{10} 5 \cdot 2^i$`, r`$\sum_{i=0}^{10} 5 \cdot 2^i$`, r`$\sum_{i=0}^{10} (5 \cdot 2)^i$`, r`$\sum_{i=1}^{11} 5 \cdot 2^i$`],
      answer: 1,
      explain: r`The general term is $5 \cdot 2^i$ and the first term is $5 = 5 \cdot 2^0$, so $i$ runs from 0 to 10. Starting at $i = 1$ misses the first 5; $(5 \cdot 2)^i = 10^i$ is a different sequence; $\sum_{i=1}^{11}$ ends at $5 \cdot 2^{11}$.`,
    },
    {
      id: "sums-logic-sets-q4",
      kind: "mcq",
      sub: "Summation notation",
      prompt: r`$\sum_{i=0}^{3} (x_i y_j)$ equals`,
      options: [r`$x_0 y_0 + x_1 y_1 + x_2 y_2 + x_3 y_3$`, r`$y_j(x_1 + x_2 + x_3)$`, r`$y_j(x_0 + x_1 + x_2 + x_3)$`, r`$4 x_i y_j$`],
      answer: 2,
      explain: r`The index is $i$ (from 0 to 3, four terms). $j$ is not the index, so $y_j$ stays fixed: $x_0 y_j + x_1 y_j + x_2 y_j + x_3 y_j = y_j(x_0 + x_1 + x_2 + x_3)$.`,
    },
    // 2.2
    {
      id: "sums-logic-sets-q5",
      kind: "fill",
      sub: "Rules for sums",
      prompt: r`$\sum_{i=1}^{20} 7 =$ ____`,
      answers: [["140"]],
      explain: r`A constant summed $n$ times: $\sum_{i=1}^{n} c = nc = 20 \times 7 = 140$ (not 7).`,
    },
    {
      id: "sums-logic-sets-q6",
      kind: "mcq",
      sub: "Rules for sums",
      prompt: r`$\sum_{i=1}^{3}(x_i + 3) =$`,
      options: [r`$\sum_{i=1}^{3} x_i + 3$`, r`$\sum_{i=1}^{3} x_i + 9$`, r`$3\sum_{i=1}^{3} x_i + 9$`, r`$\sum_{i=1}^{3} x_i + 6$`],
      answer: 1,
      explain: r`Additivity: $\sum x_i + \sum_{i=1}^{3} 3$, and the constant 3 summed 3 times is 9. So $x_1 + x_2 + x_3 + 9$.`,
    },
    {
      id: "sums-logic-sets-q7",
      kind: "mcq",
      sub: "Rules for sums",
      prompt: r`$\sum_{i=1}^{5}\left(\dfrac{x_i}{2}\right)^2 - 5 =$`,
      options: [r`$\frac{1}{2}\sum_{i=1}^{5} x_i^2 - 5$`, r`$\frac{1}{4}\sum_{i=1}^{5} x_i^2 - 25$`, r`$\frac{1}{4}\left(\sum_{i=1}^{5} x_i\right)^2 - 5$`, r`$\frac{1}{4}\sum_{i=1}^{5} x_i^2 - 5$`],
      answer: 3,
      explain: r`$(x_i/2)^2 = x_i^2/4$; homogeneity pulls out $\frac{1}{4}$. The $-5$ sits outside the sum, so it is subtracted once, not 5 times. The sum of squares is not the square of the sum.`,
    },
    {
      id: "sums-logic-sets-q8",
      kind: "fill",
      sub: "Rules for sums",
      prompt: r`$\sum_{j=0}^{3}(j + 1)(j - 1) =$ ____`,
      answers: [["10"]],
      explain: r`$(j+1)(j-1) = j^2 - 1$. For $j = 0, 1, 2, 3$: $-1 + 0 + 3 + 8 = 10$. (Remember the $j = 0$ term.)`,
    },
    {
      id: "sums-logic-sets-q9",
      kind: "fill",
      sub: "Rules for sums",
      prompt: r`$\sum_{j=1}^{n}\left(3\sum_{i=1}^{5} 2^i - 86\right) = c\,n$ where $c =$ ____`,
      answers: [["100"]],
      explain: r`$\sum_{i=1}^{5} 2^i = 2 + 4 + 8 + 16 + 32 = 62$, so the bracket is $186 - 86 = 100$, a constant. Summed $n$ times: $100n$.`,
    },
    {
      id: "sums-logic-sets-q10",
      kind: "mcq",
      sub: "Rules for sums",
      prompt: r`$\sum_{k=1}^{4}\dfrac{4y_k}{\sum_{i=1}^{2}(x_i - 2)} =$`,
      options: [
        r`$\dfrac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 4}$`,
        r`$\dfrac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 2}$`,
        r`$\sum_{k=1}^{4}\dfrac{4y_k}{x_k - 2}$`,
        r`$\dfrac{y_1 + y_2 + y_3 + y_4}{x_1 + x_2 - 4}$`,
      ],
      answer: 0,
      explain: r`The denominator has no $k$: $\sum_{i=1}^{2}(x_i - 2) = (x_1 - 2) + (x_2 - 2) = x_1 + x_2 - 4$ (the $-2$ is summed twice). Homogeneity pulls out $\frac{4}{x_1 + x_2 - 4}$ and leaves $\sum_{k=1}^{4} y_k$.`,
    },
    {
      id: "sums-logic-sets-q11",
      kind: "mcq",
      sub: "Rules for sums",
      prompt: r`Is $\sum_{i=1}^{n}\dfrac{x_i}{y_i} = \dfrac{\sum_{i=1}^{n} x_i}{\sum_{i=1}^{n} y_i}$ always true?`,
      options: [
        r`Yes, by the homogeneity property`,
        r`Yes, by the additivity property`,
        r`No: with $x = (1, 1)$, $y = (1, 2)$ the left side is 1.5 and the right side is $\frac{2}{3}$`,
        r`Only when $n$ is even`,
      ],
      answer: 2,
      explain: r`There is no rule that splits a ratio inside a sum. One counterexample disproves it: $\frac{1}{1} + \frac{1}{2} = 1.5$ but $\frac{1+1}{1+2} = \frac{2}{3}$.`,
    },
    {
      id: "sums-logic-sets-q12",
      kind: "mcq",
      sub: "Rules for sums",
      prompt: r`With $\bar{x} = \frac{1}{n}\sum x_i$ and $\bar{y} = \frac{1}{n}\sum y_i$, $\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})$ equals`,
      options: [r`$\sum x_i y_i - \bar{x}\bar{y}$`, r`$\sum x_i y_i - 2n\bar{x}\bar{y}$`, r`$\sum x_i y_i + n\bar{x}\bar{y}$`, r`$\sum x_i y_i - n\bar{x}\bar{y}$`],
      answer: 3,
      explain: r`Expanding: $\sum x_i y_i - \bar{y}\sum x_i - \bar{x}\sum y_i + n\bar{x}\bar{y} = \sum x_i y_i - n\bar{x}\bar{y} - n\bar{x}\bar{y} + n\bar{x}\bar{y} = \sum x_i y_i - n\bar{x}\bar{y}$.`,
    },
    {
      id: "sums-logic-sets-q13",
      kind: "fill",
      sub: "Rules for sums",
      prompt: r`For the data $x = 2, 4, 9$ (so $\bar{x} = 5$), $\sum_{i=1}^{3}(x_i - \bar{x}) =$ ____`,
      answers: [["0"]],
      explain: r`$(2 - 5) + (4 - 5) + (9 - 5) = -3 - 1 + 4 = 0$. In general $\sum(x_i - \bar{x}) = \sum x_i - n\bar{x} = 0$.`,
    },
    {
      id: "sums-logic-sets-q14",
      kind: "fill",
      sub: "Rules for sums",
      prompt: r`Five observations have $\sum_{i=1}^{5} x_i y_i = 120$, $\bar{x} = 3$ and $\bar{y} = 7$. Then $\sum_{i=1}^{5}(x_i - \bar{x})(y_i - \bar{y}) =$ ____`,
      answers: [["15"]],
      explain: r`$\sum x_i y_i - n\bar{x}\bar{y} = 120 - 5 \times 3 \times 7 = 120 - 105 = 15$.`,
    },
    // 2.3
    {
      id: "sums-logic-sets-q15",
      kind: "fill",
      sub: "Double sums",
      prompt: r`A firm records revenue $a_{ij}$ for 4 regions ($i$) in each of 6 months ($j$). The array contains ____ numbers.`,
      answers: [["24"]],
      explain: r`$m$ rows and $n$ columns give $mn = 4 \times 6 = 24$ numbers.`,
    },
    {
      id: "sums-logic-sets-q16",
      kind: "mcq",
      sub: "Double sums",
      prompt: r`For a finite double sum, $\sum_{i=1}^{m}\sum_{j=1}^{n} a_{ij}$ and $\sum_{j=1}^{n}\sum_{i=1}^{m} a_{ij}$ are`,
      options: [r`always equal: the order of summation is immaterial`, r`equal only if $m = n$`, r`equal only if $a_{ij} = a_{ji}$`, r`never equal`],
      answer: 0,
      explain: r`Both add up every entry of the array once: rows first or columns first gives the same grand total. No condition on $m$, $n$ or symmetry is needed.`,
    },
    {
      id: "sums-logic-sets-q17",
      kind: "fill",
      sub: "Double sums",
      prompt: r`For the array with rows $(10, 1, 0)$ and $(1, 2, 6)$: $\sum_{j=1}^{3} a_{2j} =$ ____ and $\sum_{i=1}^{2} a_{i3} =$ ____`,
      answers: [["9"], ["6"]],
      explain: r`$\sum_j a_{2j}$ adds row 2: $1 + 2 + 6 = 9$. $\sum_i a_{i3}$ adds column 3: $0 + 6 = 6$. ($i$ is the row, $j$ the column.)`,
    },
    {
      id: "sums-logic-sets-q18",
      kind: "fill",
      sub: "Double sums",
      prompt: r`$\sum_{i=1}^{3}\sum_{j=1}^{4}(i + 2j) =$ ____`,
      answers: [["84"]],
      explain: r`Inner: $\sum_{j=1}^{4}(i + 2j) = 4i + 20$. Outer: $\sum_{i=1}^{3}(4i + 20) = 24 + 28 + 32 = 84$.`,
    },
    {
      id: "sums-logic-sets-q19",
      kind: "fill",
      sub: "Double sums",
      prompt: r`$\sum_{j=1}^{4}\sum_{i=1}^{3}\dfrac{2i - j}{4} =$ ____`,
      answers: [["4.5", "9/2"]],
      explain: r`Inner: $\sum_{i=1}^{3}(2i - j) = 12 - 3j$. Outer: $\frac{1}{4}\sum_{j=1}^{4}(12 - 3j) = \frac{48 - 30}{4} = 4.5$.`,
    },
    // 2.4
    {
      id: "sums-logic-sets-q20",
      kind: "mcq",
      sub: "Necessary and sufficient",
      prompt: r`If $P \Rightarrow Q$, then`,
      options: [
        r`$P$ is a necessary condition for $Q$`,
        r`$Q$ is a sufficient condition for $P$`,
        r`$Q$ is a necessary condition for $P$`,
        r`$P$ and $Q$ are necessary and sufficient for each other`,
      ],
      answer: 2,
      explain: r`$P \Rightarrow Q$: $P$ is true only if $Q$ is true, so $Q$ is necessary for $P$ (and $P$ is sufficient for $Q$). Necessary and sufficient both ways needs $\Leftrightarrow$.`,
    },
    {
      id: "sums-logic-sets-q21",
      kind: "mcq",
      sub: "Necessary and sufficient",
      prompt: r`"A person is a father $\Rightarrow$ the person is male." Which statement is correct?`,
      options: [
        r`Being a father is necessary for being male`,
        r`Being a father is sufficient but not necessary for being male`,
        r`Being male is sufficient for being a father`,
        r`Being a father is necessary and sufficient for being male`,
      ],
      answer: 1,
      explain: r`Father $\Rightarrow$ male, so fatherhood is sufficient for maleness. The converse is wrong (a boy is male but not a father), so fatherhood is not necessary.`,
    },
    {
      id: "sums-logic-sets-q22",
      kind: "mcq",
      sub: "Choosing the arrow",
      prompt: r`The most suitable arrow in "$x > 3 \;\square\; x^2 > 9$" is`,
      options: [r`$\Leftrightarrow$`, r`$\Rightarrow$`, r`$\Leftarrow$`, r`no arrow holds`],
      answer: 1,
      explain: r`$x > 3$ gives $x^2 > 9$. But $x^2 > 9$ also holds for $x = -4$, which is not $> 3$, so the reverse fails. Only $\Rightarrow$ (Assignment 2 Q2(a)).`,
    },
    {
      id: "sums-logic-sets-q23",
      kind: "mcq",
      sub: "Choosing the arrow",
      prompt: r`The most suitable arrow in "$x$ is divisible by 2 $\;\square\;$ $x$ is an even number" is`,
      options: [r`$\Rightarrow$`, r`$\Leftarrow$`, r`$\Leftrightarrow$`, r`no arrow holds`],
      answer: 2,
      explain: r`Both directions hold: divisible by 2 means even, and even means divisible by 2. So the given $\Leftrightarrow$ is correct (Assignment 2 Q2(c)).`,
    },
    {
      id: "sums-logic-sets-q24",
      kind: "mcq",
      sub: "Choosing the arrow",
      prompt: r`The most suitable arrow in "A person is eligible to vote in Singapore $\;\square\;$ the person is 21 years or older" is`,
      options: [r`$\Leftarrow$`, r`$\Leftrightarrow$`, r`$\Rightarrow$`, r`no arrow holds`],
      answer: 2,
      explain: r`Every eligible voter is 21 or older, so eligible $\Rightarrow$ 21+. But being 21+ is not enough (e.g. a 30-year-old non-citizen is not eligible), so $\Leftarrow$ fails. Age 21+ is necessary, not sufficient (Assignment 2 Q2(e)).`,
    },
    {
      id: "sums-logic-sets-q25",
      kind: "mcq",
      sub: "Choosing the arrow",
      prompt: r`"There are less than 30 days in the month $\;\square\;$ February." The most suitable arrow is`,
      options: [r`$\Rightarrow$ only`, r`$\Leftarrow$ only`, r`$\Leftrightarrow$`, r`no arrow holds`],
      answer: 2,
      explain: r`Only February has fewer than 30 days ($\Rightarrow$), and February always has fewer than 30 days ($\Leftarrow$). Both hold, so $\Leftrightarrow$.`,
    },
    {
      id: "sums-logic-sets-q26",
      kind: "mcq",
      sub: "Contrapositive",
      prompt: r`$P \Rightarrow Q$ is logically equivalent to`,
      options: [r`$Q \Rightarrow P$`, r`$\text{not } P \Rightarrow \text{not } Q$`, r`$\text{not } Q \Rightarrow \text{not } P$`, r`$P \Leftrightarrow Q$`],
      answer: 2,
      explain: r`Remark 4: $P \Rightarrow Q$ is equivalent to not $Q \Rightarrow$ not $P$. $Q \Rightarrow P$ is the converse and need not hold; not $P \Rightarrow$ not $Q$ is equivalent to the converse.`,
    },
    {
      id: "sums-logic-sets-q27",
      kind: "mcq",
      sub: "Contrapositive",
      prompt: r`Which statement is logically equivalent to "If it is raining, the grass is getting wet"?`,
      options: [
        r`If the grass is getting wet, it is raining.`,
        r`If it is not raining, the grass is not getting wet.`,
        r`If the grass is not getting wet, then it is not raining.`,
        r`It is raining if and only if the grass is getting wet.`,
      ],
      answer: 2,
      explain: r`With $P$ = raining and $Q$ = grass wet, $P \Rightarrow Q$ is equivalent to not $Q \Rightarrow$ not $P$. The first option is the converse; the second is equivalent to the converse (a sprinkler could wet the grass).`,
    },
    // 2.5
    {
      id: "sums-logic-sets-q28",
      kind: "mcq",
      sub: "Proofs",
      prompt: r`An indirect proof of $P \Rightarrow Q$ begins by`,
      options: [
        r`assuming $P$ is true and working forward to $Q$`,
        r`supposing $Q$ is not true, then showing $P$ cannot be true`,
        r`checking that $Q$ holds in many observed cases`,
        r`assuming $Q$ is true and working back to $P$`,
      ],
      answer: 1,
      explain: r`Indirect proof: suppose not $Q$, deduce not $P$. Option A is the direct proof; option C is inductive reasoning (not a proof); option D would prove the converse $Q \Rightarrow P$.`,
    },
    {
      id: "sums-logic-sets-q29",
      kind: "mcq",
      sub: "Proofs",
      prompt: r`Which pair is a counterexample to "if $x > y$, then $x^2 > y^2$"?`,
      options: [r`$x = 3$, $y = 2$`, r`$x = 2$, $y = 0$`, r`$x = -2$, $y = 1$`, r`$x = 1$, $y = -3$`],
      answer: 3,
      explain: r`A counterexample needs the premise true and the conclusion false. $1 > -3$ but $1 < 9$. For $(3, 2)$ and $(2, 0)$ the conclusion holds; for $(-2, 1)$ the premise $x > y$ is false, so it says nothing.`,
    },
    {
      id: "sums-logic-sets-q30",
      kind: "fill",
      sub: "Proofs",
      prompt: r`$-x^2 + 5x - 4 > 0$ holds exactly when ____ $< x <$ ____`,
      answers: [["1"], ["4"]],
      explain: r`Multiply by $-1$: $x^2 - 5x + 4 < 0$, i.e. $(x - 1)(x - 4) < 0$, true for $1 < x < 4$. All such $x$ are positive, which proves $-x^2 + 5x - 4 > 0 \Rightarrow x > 0$ directly.`,
    },
    {
      id: "sums-logic-sets-q31",
      kind: "mcq",
      sub: "Proofs",
      prompt: r`The key step in proving $\dfrac{x + y}{2} \ge \sqrt{xy}$ for $x, y \ge 0$ is`,
      options: [r`$(x - y)^2 \ge 0$`, r`$(\sqrt{x} - \sqrt{y})^2 \ge 0$`, r`$(x + y)^2 \ge 0$`, r`$\sqrt{x + y} \ge \sqrt{x} + \sqrt{y}$`],
      answer: 1,
      explain: r`$(\sqrt{x} - \sqrt{y})^2 = x - 2\sqrt{xy} + y \ge 0$, so $x + y \ge 2\sqrt{xy}$. ($(x - y)^2 \ge 0$ gives $x^2 + y^2 \ge 2xy$, a different inequality.)`,
    },
    {
      id: "sums-logic-sets-q32",
      kind: "mcq",
      sub: "Deductive vs inductive",
      prompt: r`"A company's profit has risen in each of the past 20 years, so it will rise this year." This is`,
      options: [
        r`a direct proof`,
        r`an indirect proof`,
        r`inductive reasoning, which is not a mathematical proof`,
        r`deductive reasoning, so the conclusion is guaranteed`,
      ],
      answer: 2,
      explain: r`It draws a general conclusion from observations: inductive reasoning. It is a good indication, but not a proof; direct and indirect proofs are deductive.`,
    },
    // 2.6
    {
      id: "sums-logic-sets-q33",
      kind: "mcq",
      sub: "Sets",
      prompt: r`The set of natural numbers bigger than 0 but smaller than 1 is`,
      options: [r`$\{0, 1\}$`, r`$\{0.5\}$`, r`the empty set $\emptyset$`, r`$\mathbf{N}$`],
      answer: 2,
      explain: r`Natural numbers are $1, 2, 3, \dots$; none lies strictly between 0 and 1. A set with no elements is the empty set, $\{\}$ or $\emptyset$.`,
    },
    {
      id: "sums-logic-sets-q34",
      kind: "mcq",
      sub: "Sets",
      prompt: r`Universal set $\Omega = \{1, 2, \dots, 10\}$ and $A = \{1, 2, 3\}$. Then $A^c =$`,
      options: [r`$\{1, 2, 3\}$`, r`$\{4, 5, 6, 7, 8, 9, 10\}$`, r`$\emptyset$`, r`$\{1, 2, \dots, 10\}$`],
      answer: 1,
      explain: r`The complement is everything in $\Omega$ that is not in $A$: $\{4, 5, 6, 7, 8, 9, 10\}$.`,
    },
    {
      id: "sums-logic-sets-q35",
      kind: "fill",
      sub: "Set operations",
      prompt: r`$A = \{2, 4, 6, 8, 10, 12\}$, $C = \{1, 2, 4\}$. $A \cup C$ has ____ elements and $A \cap C$ has ____ elements.`,
      answers: [["7"], ["2"]],
      explain: r`$A \cup C = \{1, 2, 4, 6, 8, 10, 12\}$ (7 elements: 2 and 4 count once). $A \cap C = \{2, 4\}$ (2 elements).`,
    },
    {
      id: "sums-logic-sets-q36",
      kind: "mcq",
      sub: "Set operations",
      prompt: r`$A = \{2, 4, 6, 8, 10, 12\}$, $C = \{1, 2, 4\}$. $A \setminus C =$`,
      options: [r`$\{1\}$`, r`$\{2, 4\}$`, r`$\{1, 6, 8, 10, 12\}$`, r`$\{6, 8, 10, 12\}$`],
      answer: 3,
      explain: r`$A \setminus C$ = elements of $A$ that are not in $C$: remove 2 and 4 from $A$. $\{1\}$ is $C \setminus A$.`,
    },
    {
      id: "sums-logic-sets-q37",
      kind: "mcq",
      sub: "Sets and conditions",
      prompt: r`$B = \{2, 4, 6\}$ and $A = \{2, 4, 6, 8, 10, 12\}$. Which is correct?`,
      options: [
        r`$x \in A$ is sufficient for $x \in B$`,
        r`$x \in B$ is sufficient for $x \in A$`,
        r`$x \in B$ is necessary for $x \in A$`,
        r`$x \in A$ and $x \in B$ are necessary and sufficient for each other`,
      ],
      answer: 1,
      explain: r`$B \subseteq A$, so $x \in B \Rightarrow x \in A$: membership of $B$ is sufficient for membership of $A$ (and $x \in A$ is necessary for $x \in B$). Not conversely: $8 \in A$, $8 \notin B$.`,
    },
    {
      id: "sums-logic-sets-q38",
      kind: "mcq",
      sub: "Feasible set",
      prompt: r`Bubble tea ($y$) costs 6 dollars, a chicken wing ($x$) costs 5 dollars, and the budget is 30 dollars. The infeasible set (complement of the feasible set) is`,
      options: [
        r`$\{(x, y) : 5x + 6y \le 30,\ x, y \ge 0\}$`,
        r`$\{(x, y) : 6x + 5y > 30,\ x, y \ge 0\}$`,
        r`$\{(x, y) : 5x + 6y > 30,\ x, y \ge 0\}$`,
        r`$\{(x, y) : x \ge 0,\ y \ge 0\}$`,
      ],
      answer: 2,
      explain: r`Spending is $5x + 6y$ (price times quantity for each good). Feasible: $5x + 6y \le 30$. Its complement within the universal set $\{x, y \ge 0\}$ is $5x + 6y > 30$, above the budget line. Option A is the feasible set; option D is the universal set; option B swaps the prices.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "sums-logic-sets-x1",
      kind: "calc",
      sub: "Sums and means",
      prompt: r`Suppose $\dfrac{1}{10}\sum_{i=1}^{10} x_i y_i = 250$, $\bar{y} = \dfrac{1}{10}\sum_{i=1}^{10} y_i = 20$, and $\bar{x} = \dfrac{1}{10}\sum_{i=1}^{10} x_i = 5$. Compute $\sum_{i=1}^{10}(x_i - \bar{x})(y_i - \bar{y})$.`,
      marks: 5,
      rubric: [
        { point: r`Expands the product and uses $\sum x_i = n\bar{x}$, $\sum y_i = n\bar{y}$ to reach $\sum x_i y_i - n\bar{x}\bar{y}$`, marks: 2 },
        { point: r`Converts the average: $\sum x_i y_i = 10 \times 250 = 2500$`, marks: 1 },
        { point: r`$2500 - 10(5)(20) = 1500$`, marks: 2 },
      ],
      model: r`Expand and use the rules for sums ($\bar{x}, \bar{y}$ are constants):
$$\sum_{i=1}^{10}(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - \bar{y}\sum x_i - \bar{x}\sum y_i + 10\bar{x}\bar{y}$$
Since $\sum x_i = 10\bar{x}$ and $\sum y_i = 10\bar{y}$:
$$= \sum x_i y_i - 10\bar{x}\bar{y} - 10\bar{x}\bar{y} + 10\bar{x}\bar{y} = \sum x_i y_i - 10\bar{x}\bar{y}.$$
From the data, $\sum_{i=1}^{10} x_i y_i = 10 \times 250 = 2500$. Therefore
$$\sum_{i=1}^{10}(x_i - \bar{x})(y_i - \bar{y}) = 2500 - 10 \times 5 \times 20 = 2500 - 1000 = 1500.$$`,
      answer: "1500",
      source: "Past paper Q1(c)",
    },
    {
      id: "sums-logic-sets-x2",
      kind: "calc",
      sub: "Sums and means",
      prompt: r`Suppose $\dfrac{1}{8}\sum_{i=1}^{8} x_i y_i = 30$, $\bar{x} = \dfrac{1}{8}\sum_{i=1}^{8} x_i = 4$ and $\bar{y} = \dfrac{1}{8}\sum_{i=1}^{8} y_i = 6$. Compute $\sum_{i=1}^{8}(x_i - \bar{x})(y_i - \bar{y})$.`,
      marks: 5,
      rubric: [
        { point: r`Derives or quotes with justification $\sum(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - n\bar{x}\bar{y}$`, marks: 2 },
        { point: r`$\sum x_i y_i = 8 \times 30 = 240$`, marks: 1 },
        { point: r`$240 - 8(4)(6) = 48$`, marks: 2 },
      ],
      model: r`Expanding and using $\sum x_i = 8\bar{x}$, $\sum y_i = 8\bar{y}$, $\sum_{i=1}^{8}\bar{x}\bar{y} = 8\bar{x}\bar{y}$:
$$\sum(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - 8\bar{x}\bar{y} - 8\bar{x}\bar{y} + 8\bar{x}\bar{y} = \sum x_i y_i - 8\bar{x}\bar{y}.$$
$\sum x_i y_i = 8 \times 30 = 240$ and $8\bar{x}\bar{y} = 8 \times 4 \times 6 = 192$, so the sum is $240 - 192 = 48$.`,
      answer: "48",
      source: "Modelled on past paper Q1(c)",
    },
    {
      id: "sums-logic-sets-x3",
      kind: "calc",
      sub: "Sums and means",
      prompt: r`Twelve observations satisfy $\dfrac{1}{12}\sum_{i=1}^{12} x_i y_i = 15$, $\bar{x} = 3$ and $\bar{y} = 6$. Compute $\sum_{i=1}^{12}(x_i - \bar{x})(y_i - \bar{y})$ and $\sum_{i=1}^{12}(y_i - \bar{y})$.`,
      marks: 5,
      rubric: [
        { point: r`Uses $\sum(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - n\bar{x}\bar{y}$ with $\sum x_i y_i = 12 \times 15 = 180$`, marks: 2 },
        { point: r`$180 - 12(3)(6) = 180 - 216 = -36$`, marks: 2 },
        { point: r`$\sum(y_i - \bar{y}) = 12\bar{y} - 12\bar{y} = 0$`, marks: 1 },
      ],
      model: r`By the cross-product identity (expand; $\sum x_i = n\bar{x}$, $\sum y_i = n\bar{y}$):
$$\sum_{i=1}^{12}(x_i - \bar{x})(y_i - \bar{y}) = \sum x_i y_i - 12\bar{x}\bar{y}.$$
$\sum x_i y_i = 12 \times 15 = 180$ and $12\bar{x}\bar{y} = 12 \times 3 \times 6 = 216$, so the sum is $180 - 216 = -36$. (A negative value is fine: it means large $x$ tend to go with small $y$.)
For the second sum: $\sum(y_i - \bar{y}) = \sum y_i - 12\bar{y} = 12\bar{y} - 12\bar{y} = 0$. Deviations from the mean always sum to zero.`,
      answer: "−36 and 0",
      source: "Modelled on past paper Q1(c) and Assignment 2 Q4(b)",
    },
    {
      id: "sums-logic-sets-x4",
      kind: "proof",
      sub: "Rules for sums",
      prompt: r`Suppose $\bar{x} = \dfrac{1}{n}\sum_{i=1}^{n} x_i$ and $\bar{y} = \dfrac{1}{n}\sum_{i=1}^{n} y_i$.
(i) Show that $\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}$.
(ii) Show that $\sum_{i=1}^{n}(x_i - \bar{x})$ is always equal to 0.`,
      marks: 5,
      rubric: [
        { point: r`(i) Expands the product into four sums using additivity, with $\bar{x}, \bar{y}$ taken outside (homogeneity)`, marks: 1.5 },
        { point: r`(i) Uses $\sum x_i = n\bar{x}$, $\sum y_i = n\bar{y}$, $\sum_{i=1}^{n}\bar{x}\bar{y} = n\bar{x}\bar{y}$ and simplifies to the result`, marks: 1.5 },
        { point: r`(ii) $\sum(x_i - \bar{x}) = \sum x_i - n\bar{x} = 0$ with each step justified`, marks: 2 },
      ],
      model: r`(i) Expand the product:
$$\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y}) = \sum_{i=1}^{n}(x_i y_i - \bar{y}x_i - \bar{x}y_i + \bar{x}\bar{y}).$$
By additivity and homogeneity ($\bar{x}$ and $\bar{y}$ do not depend on $i$):
$$= \sum x_i y_i - \bar{y}\sum x_i - \bar{x}\sum y_i + \sum_{i=1}^{n}\bar{x}\bar{y}.$$
By definition of the means, $\sum x_i = n\bar{x}$ and $\sum y_i = n\bar{y}$; a constant summed $n$ times gives $\sum_{i=1}^{n}\bar{x}\bar{y} = n\bar{x}\bar{y}$. So
$$= \sum x_i y_i - n\bar{x}\bar{y} - n\bar{x}\bar{y} + n\bar{x}\bar{y} = \sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}.$$
(ii) By additivity and the constant rule,
$$\sum_{i=1}^{n}(x_i - \bar{x}) = \sum_{i=1}^{n} x_i - n\bar{x} = n\bar{x} - n\bar{x} = 0.$$`,
      answer: "Both identities follow from the rules for sums and Σxᵢ = n·x̄.",
      source: "Assignment 2 Q4",
    },
    {
      id: "sums-logic-sets-x5",
      kind: "proof",
      sub: "Prove or disprove",
      prompt: r`Prove or disprove the following statements.
(i) If $x > y$, then $x^2 > y^2$.
(ii) If $x + y > 0$ and $x > y$, then $x^2 > y^2$.`,
      marks: 5,
      rubric: [
        { point: r`(i) States it is false`, marks: 1 },
        { point: r`(i) Valid counterexample, e.g. $x = 1, y = -2$, with both sides checked`, marks: 1.5 },
        { point: r`(ii) Factors $x^2 - y^2 = (x + y)(x - y)$`, marks: 1.5 },
        { point: r`(ii) Both factors positive by the premises, so $x^2 > y^2$: true`, marks: 1 },
      ],
      model: r`(i) **False.** One counterexample is enough: take $x = 1$, $y = -2$. Then $x > y$ (since $1 > -2$) but $x^2 = 1 < 4 = y^2$. So the premise holds while the conclusion fails.
(ii) **True** (direct proof). Write
$$x^2 - y^2 = (x + y)(x - y).$$
The premises give $x + y > 0$ and $x > y$, i.e. $x - y > 0$. The product of two positive numbers is positive, so $x^2 - y^2 > 0$, i.e. $x^2 > y^2$. (The extra premise $x + y > 0$ is exactly what rules out the counterexample in (i), where $x + y = -1$.)`,
      answer: "(i) False, e.g. x = 1, y = −2; (ii) True.",
      source: "Assignment 2 Q1(a)(b)",
    },
    {
      id: "sums-logic-sets-x6",
      kind: "proof",
      sub: "Prove or disprove",
      prompt: r`Prove or disprove the following statements.
(i) If $x, y$ are nonnegative, then $\dfrac{x + y}{2} \ge \sqrt{xy}$.
(ii) $\sum_{i=1}^{n}\dfrac{x_i}{y_i} = \dfrac{\sum_{i=1}^{n} x_i}{\sum_{i=1}^{n} y_i}$.`,
      marks: 5,
      rubric: [
        { point: r`(i) Starts from $(\sqrt{x} - \sqrt{y})^2 \ge 0$ (using $x, y \ge 0$ so the roots exist)`, marks: 1.5 },
        { point: r`(i) Expands to $x + y - 2\sqrt{xy} \ge 0$ and concludes: true`, marks: 1 },
        { point: r`(ii) States false and gives a valid numerical counterexample`, marks: 1.5 },
        { point: r`(ii) Both sides computed correctly and shown unequal`, marks: 1 },
      ],
      model: r`(i) **True.** Because $x, y \ge 0$, $\sqrt{x}$ and $\sqrt{y}$ are real, with $(\sqrt{x})^2 = x$, $(\sqrt{y})^2 = y$ and $\sqrt{x}\sqrt{y} = \sqrt{xy}$. A square is never negative, so
$$(\sqrt{x} - \sqrt{y})^2 \ge 0 \;\Rightarrow\; x - 2\sqrt{xy} + y \ge 0 \;\Rightarrow\; x + y \ge 2\sqrt{xy} \;\Rightarrow\; \frac{x + y}{2} \ge \sqrt{xy}.$$
(Equality holds when $x = y$.)
(ii) **False.** Counterexample: $n = 2$, $x_1 = x_2 = 1$, $y_1 = 1$, $y_2 = 2$.
LHS $= \dfrac{1}{1} + \dfrac{1}{2} = 1.5$. RHS $= \dfrac{1 + 1}{1 + 2} = \dfrac{2}{3}$. Since $1.5 \ne \frac{2}{3}$, the statement is false in general: the rules for sums do not let you split a ratio.`,
      answer: "(i) True; (ii) False, e.g. x = (1, 1), y = (1, 2) gives 1.5 ≠ 2/3.",
      source: "Assignment 2 Q1(c)(d)",
    },
    {
      id: "sums-logic-sets-x7",
      kind: "calc",
      sub: "Evaluating sums",
      prompt: r`Evaluate the following sums.
(i) $\sum_{j=1}^{n}\left(3\sum_{i=1}^{5} 2^i - 86\right)$
(ii) $\sum_{j=0}^{3}(j + 1)(j - 1)$
(iii) $\sum_{k=1}^{4}\dfrac{4y_k}{\sum_{i=1}^{2}(x_i - 2)}$`,
      marks: 5,
      rubric: [
        { point: r`(i) Inner sum $= 62$, bracket $= 100$, answer $100n$`, marks: 2 },
        { point: r`(ii) Includes $j = 0$; $-1 + 0 + 3 + 8 = 10$`, marks: 1.5 },
        { point: r`(iii) Denominator $x_1 + x_2 - 4$ treated as a constant; answer $\frac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 4}$`, marks: 1.5 },
      ],
      model: r`(i) Inner sum first: $\sum_{i=1}^{5} 2^i = 2 + 4 + 8 + 16 + 32 = 62$. The bracket is $3(62) - 86 = 186 - 86 = 100$, which does not depend on $j$. A constant summed $n$ times: $\sum_{j=1}^{n} 100 = 100n$.
(ii) $(j + 1)(j - 1) = j^2 - 1$. Substituting $j = 0, 1, 2, 3$: $(-1) + 0 + 3 + 8 = 10$.
(iii) The denominator does not involve $k$: $\sum_{i=1}^{2}(x_i - 2) = (x_1 - 2) + (x_2 - 2) = x_1 + x_2 - 4$. By homogeneity,
$$\sum_{k=1}^{4}\frac{4y_k}{x_1 + x_2 - 4} = \frac{4}{x_1 + x_2 - 4}\sum_{k=1}^{4} y_k = \frac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 4}.$$`,
      answer: r`(i) $100n$; (ii) $10$; (iii) $\dfrac{4(y_1 + y_2 + y_3 + y_4)}{x_1 + x_2 - 4}$`,
      source: "Assignment 2 Q3(a)–(c)",
    },
    {
      id: "sums-logic-sets-x8",
      kind: "calc",
      sub: "Double sums",
      prompt: r`(i) Simplify $\sum_{i=1}^{n} x_i + \sum_{i=n+1}^{N} x_i$.
(ii) Evaluate $\sum_{j=1}^{4}\sum_{i=1}^{3}\dfrac{2i - j}{4}$.
(iii) Evaluate $\sum_{i=1}^{3}\sum_{j=1}^{4}(i + 2j)$.`,
      marks: 5,
      rubric: [
        { point: r`(i) $\sum_{i=1}^{N} x_i$`, marks: 1 },
        { point: r`(ii) Inner sum $12 - 3j$, outer sum gives $4.5$`, marks: 2 },
        { point: r`(iii) Inner sum $4i + 20$, outer sum gives $84$`, marks: 2 },
      ],
      model: r`(i) The ranges $1, \dots, n$ and $n + 1, \dots, N$ join to $1, \dots, N$: $\sum_{i=1}^{N} x_i$.
(ii) Inner sum (fix $j$): $\sum_{i=1}^{3}(2i - j) = 2(1 + 2 + 3) - 3j = 12 - 3j$. Outer sum:
$$\sum_{j=1}^{4}\frac{12 - 3j}{4} = \frac{1}{4}\left[48 - 3(1 + 2 + 3 + 4)\right] = \frac{48 - 30}{4} = 4.5.$$
(iii) Inner sum (fix $i$): $\sum_{j=1}^{4}(i + 2j) = (i + 2) + (i + 4) + (i + 6) + (i + 8) = 4i + 20$. Outer sum:
$$\sum_{i=1}^{3}(4i + 20) = 24 + 28 + 32 = 84.$$
Check by reversing the order (allowed for a finite double sum): $\sum_{i=1}^{3}(i + 2j) = 6 + 6j$, and $\sum_{j=1}^{4}(6 + 6j) = 24 + 60 = 84$.`,
      answer: r`(i) $\sum_{i=1}^{N} x_i$; (ii) 4.5; (iii) 84`,
      source: "Assignment 2 Q3(d)(e) and Lecture Note 2 example (2.3)",
    },
    {
      id: "sums-logic-sets-x9",
      kind: "calc",
      sub: "Double sums",
      prompt: r`Evaluate $\sum_{i=1}^{2}\sum_{j=1}^{3}(3i - j)$, and verify your answer by summing in the other order.`,
      marks: 5,
      rubric: [
        { point: r`Inner sum over $j$: $9i - 6$`, marks: 1.5 },
        { point: r`Outer sum: $3 + 12 = 15$`, marks: 1.5 },
        { point: r`Reversed order: inner over $i$ gives $9 - 2j$, outer gives $15$; notes order is immaterial`, marks: 2 },
      ],
      model: r`**Order 1.** Fix $i$: $\sum_{j=1}^{3}(3i - j) = 9i - (1 + 2 + 3) = 9i - 6$. Then $\sum_{i=1}^{2}(9i - 6) = 3 + 12 = 15$.
**Order 2.** Fix $j$: $\sum_{i=1}^{2}(3i - j) = 3(1 + 2) - 2j = 9 - 2j$. Then $\sum_{j=1}^{3}(9 - 2j) = 7 + 5 + 3 = 15$.
Both give 15, as expected: in a finite double sum the order of summation is immaterial.`,
      answer: "15",
      source: "Modelled on Lecture Note 2 example (2.3)",
    },
    {
      id: "sums-logic-sets-x10",
      kind: "explain",
      sub: "Implication arrows",
      prompt: r`Are the following using the most suitable implication arrow ($\Rightarrow$, $\Leftarrow$, $\Leftrightarrow$)? If not, give the most suitable arrow, with a brief reason.
(i) $x > 3 \Leftrightarrow x^2 > 9$
(ii) It is a rational number $\Rightarrow$ this number can be expressed as a meaningful ratio of two integers.
(iii) $x$ is divisible by 2 $\Leftrightarrow$ $x$ is an even number.
(iv) My car runs out of gas $\Leftarrow$ I cannot start my EV car.
(v) A person is eligible to vote in Singapore $\Leftarrow$ the person is 21 years or older.`,
      marks: 5,
      rubric: [
        { point: r`(i) Not suitable; $\Rightarrow$ with a counterexample to the reverse (e.g. $x = -4$)`, marks: 1 },
        { point: r`(ii) Not the most suitable; $\Leftrightarrow$ since a rational number is defined as $a/b$, $a, b$ integers, $b \ne 0$`, marks: 1 },
        { point: r`(iii) Suitable: both directions hold`, marks: 1 },
        { point: r`(iv) Not suitable: failing to start does not imply out of gas (an EV does not run on gas), so $\Leftarrow$ fails`, marks: 1 },
        { point: r`(v) Not suitable; $\Rightarrow$: 21+ is necessary but not sufficient`, marks: 1 },
      ],
      model: r`(i) **Not suitable.** $x > 3 \Rightarrow x^2 > 9$ holds, but $x^2 > 9$ does not imply $x > 3$: $x = -4$ gives $x^2 = 16 > 9$. Use $\Rightarrow$.
(ii) **Not the most suitable.** By definition $\mathbf{Q} = \{\frac{a}{b} : a, b \text{ integers}, b \ne 0\}$, so a number is rational exactly when it is a meaningful ratio of two integers. Both directions hold: use $\Leftrightarrow$.
(iii) **Suitable.** An integer divisible by 2 is even, and an even integer is divisible by 2: $\Leftrightarrow$.
(iv) **Not suitable.** "I cannot start my EV car" does not imply "my car runs out of gas": an EV runs on electricity, and could fail to start because of a flat battery or a fault. Running out of gas has no bearing on starting an EV either, so no arrow holds in either direction. (For a petrol car the suitable arrow would be $\Rightarrow$: running out of gas means it cannot start, but not starting can have other causes.)
(v) **Not suitable.** Being 21 or older does not make someone eligible (a 30-year-old non-citizen cannot vote), but every eligible voter is 21 or older. Use $\Rightarrow$: being 21+ is a necessary, not a sufficient, condition.`,
      answer: "(i) ⇒; (ii) ⇔; (iii) ⇔ is correct; (iv) ⇐ is wrong (no arrow holds for an EV); (v) ⇒",
      source: "Assignment 2 Q2",
    },
    {
      id: "sums-logic-sets-x11",
      kind: "proof",
      sub: "Direct and indirect proof",
      prompt: r`Use (i) a direct proof and (ii) an indirect proof to prove that $-x^2 + 5x - 4 > 0 \Rightarrow x > 0$. State why the indirect method is a valid proof.`,
      marks: 5,
      rubric: [
        { point: r`(i) Rewrites as $(x - 1)(x - 4) < 0$`, marks: 1 },
        { point: r`(i) Concludes $1 < x < 4$, hence $x > 0$`, marks: 1 },
        { point: r`(ii) Assumes $x \le 0$ and shows $-x^2 + 5x - 4 \le -4 < 0$`, marks: 2 },
        { point: r`Justifies: $P \Rightarrow Q$ is equivalent to not $Q \Rightarrow$ not $P$`, marks: 1 },
      ],
      model: r`Let $P$: $-x^2 + 5x - 4 > 0$ and $Q$: $x > 0$.
(i) **Direct proof.** Start from $P$. Multiply by $-1$ (reversing the inequality): $x^2 - 5x + 4 < 0$, i.e. $(x - 1)(x - 4) < 0$. A product is negative only when the factors have opposite signs. Since $x - 1 > x - 4$, we need $x - 1 > 0$ and $x - 4 < 0$, so $1 < x < 4$. In particular $x > 0$. So $P \Rightarrow Q$.
(ii) **Indirect proof.** Suppose $Q$ is false: $x \le 0$. Then $-x^2 \le 0$ and $5x \le 0$, so
$$-x^2 + 5x - 4 \le 0 + 0 - 4 = -4 < 0,$$
so $P$ is false. We have shown not $Q \Rightarrow$ not $P$.
This proves $P \Rightarrow Q$ because $P \Rightarrow Q$ is logically equivalent to not $Q \Rightarrow$ not $P$. Both are deductive proofs.`,
      answer: "Direct: P gives 1 < x < 4 so x > 0. Indirect: x ≤ 0 gives −x² + 5x − 4 ≤ −4 < 0.",
      source: "Lecture Note 2 example (2.5)",
    },
    {
      id: "sums-logic-sets-x12",
      kind: "explain",
      sub: "Feasible set",
      prompt: r`There are two goods, bubble tea and Mala chicken wings, with quantities $y$ and $x$. A bubble tea costs 6 dollars and a Mala chicken wing costs 5 dollars. A consumer has 30 dollars to spend on them for dinner.
(i) Draw and write down the feasible (consumption) set.
(ii) Where is the complement of the set, i.e. the infeasible set? Point it out in your graph.
(iii) Where is the universal set? Point it out in your graph.`,
      marks: 5,
      rubric: [
        { point: r`(i) Budget constraint $5x + 6y \le 30$ with $x, y \ge 0$, written as a set`, marks: 1.5 },
        { point: r`(i) Graph: budget line through $(6, 0)$ and $(0, 5)$, triangle below it (line included) shaded`, marks: 1.5 },
        { point: r`(ii) Complement: $5x + 6y > 30$, $x, y \ge 0$, the region above the line`, marks: 1 },
        { point: r`(iii) Universal set: all $(x, y)$ with $x \ge 0$, $y \ge 0$ (the whole first quadrant) $= F \cup F^c$`, marks: 1 },
      ],
      model: r`(i) Spending on wings is $5x$ and on bubble tea $6y$; the total cannot exceed 30 dollars, and quantities cannot be negative:
$$F = \{(x, y) : 5x + 6y \le 30,\ x \ge 0,\ y \ge 0\}.$$
The budget line $5x + 6y = 30$ has intercepts $(6, 0)$ (spend everything on wings) and $(0, 5)$ (everything on bubble tea). $F$ is the triangle with corners $(0, 0)$, $(6, 0)$, $(0, 5)$, including the budget line itself.
(ii) The complement (infeasible set) is everything in the universal set that is not in $F$:
$$F^c = \{(x, y) : x \ge 0,\ y \ge 0,\ 5x + 6y > 30\},$$
the region strictly above (to the right of) the budget line.
(iii) The universal set is all possible consumption bundles, $\Omega = \{(x, y) : x \ge 0,\ y \ge 0\}$: the whole nonnegative quadrant. It is the union $F \cup F^c$.`,
      answer: "F = {(x, y): 5x + 6y ≤ 30, x, y ≥ 0}; Fᶜ = region above the line; Ω = the whole quadrant x, y ≥ 0.",
      figures: [
        {
          title: "Budget: 5x + 6y ≤ 30",
          x: "x (wings)",
          y: "y (bubble tea)",
          xr: [0, 9],
          yr: [0, 7],
          curves: [{ f: "(30 - 5*x)/6", from: 0, to: 6, label: "5x + 6y = 30" }],
          shade: [
            { f: "(30 - 5*x)/6", from: 0, to: 6, tone: 2, label: "F (feasible)" },
            { f: "7", g: "(30 - 5*x)/6", from: 0, to: 6, tone: 1, label: "Fᶜ (infeasible)" },
            { f: "7", from: 6, to: 9, tone: 1 },
          ],
          points: [
            { at: [0, 5], label: "(0, 5)" },
            { at: [6, 0], label: "(6, 0)" },
          ],
          labels: [{ at: [6.2, 6.3], text: "Ω = F ∪ Fᶜ (x, y ≥ 0)", tone: 3 }],
          caption: "Green: the feasible set. Orange: its complement. The universal set is the whole quadrant.",
        },
      ],
      source: "Assignment 3 Q1",
    },
    {
      id: "sums-logic-sets-x13",
      kind: "explain",
      sub: "Sets and conditions",
      prompt: r`Suppose the sets $A = \{2, 4, 6, 8, 10, 12\}$, $B = \{2, 4, 6\}$ and $C = \{1, 2, 4\}$. In addition, the set $D = \{1, 2, 4\}$. Describe the relationships between the following pairs of sets in terms of necessary and sufficient conditions: (i) $A$ and $B$, (ii) $C$ and $D$, (iii) $A$ and $C$.`,
      marks: 5,
      rubric: [
        { point: r`(i) $B \subseteq A$: $x \in B$ sufficient for $x \in A$; $x \in A$ necessary for $x \in B$; not conversely (e.g. $8$)`, marks: 2 },
        { point: r`(ii) $C = D$: $x \in C \Leftrightarrow x \in D$, necessary and sufficient`, marks: 1.5 },
        { point: r`(iii) Neither is a subset (e.g. $1 \in C \setminus A$, $6 \in A \setminus C$): neither necessary nor sufficient`, marks: 1.5 },
      ],
      model: r`Being in one set is sufficient for being in another exactly when the first is a subset of the second ($X \subseteq Y$ means $x \in X \Rightarrow x \in Y$).
(i) Every element of $B$ is in $A$, so $B \subseteq A$: $x \in B \Rightarrow x \in A$. Being in $B$ is a **sufficient** condition for being in $A$, and being in $A$ is a **necessary** condition for being in $B$. The converse fails: $8 \in A$ but $8 \notin B$, so $x \in A$ is not sufficient for $x \in B$.
(ii) $C$ and $D$ have exactly the same elements, so $C = D$ (i.e. $C \subseteq D$ and $D \subseteq C$): $x \in C \Leftrightarrow x \in D$. Each is a **necessary and sufficient** condition for the other.
(iii) $1 \in C$ but $1 \notin A$, so $x \in C$ is not sufficient for $x \in A$; $6 \in A$ but $6 \notin C$, so $x \in A$ is not sufficient for $x \in C$. Hence membership of either set is **neither necessary nor sufficient** for membership of the other. They only overlap in $A \cap C = \{2, 4\}$.`,
      answer: "(i) x∈B sufficient for x∈A (x∈A necessary for x∈B); (ii) necessary and sufficient (C = D); (iii) neither.",
      figures: [
        {
          kind: "venn",
          title: "A, B and C",
          sets: ["A", "B", "C"],
          shade: ["001"],
          items: { "100": "8, 10, 12", "110": "6", "111": "2, 4", "001": "1" },
          caption: "B lies inside A (nothing in B only or B and C only). C has the element 1 outside A (shaded), and A has 6, 8, 10, 12 outside C.",
        },
      ],
      source: "Assignment 3 Q2",
    },
    {
      id: "sums-logic-sets-x14",
      kind: "calc",
      sub: "Set operations",
      prompt: r`Let the universal set be $\Omega = \{1, 2, 3, \dots, 10\}$, $A = \{1, 2, 3, 4, 5\}$ and $B = \{4, 5, 6, 7\}$. Find $A \cup B$, $A \cap B$, $A \setminus B$, $A^c$ and $(A \cup B)^c$. Is $A \cap B \subseteq A$?`,
      marks: 5,
      rubric: [
        { point: r`$A \cup B = \{1, \dots, 7\}$ and $A \cap B = \{4, 5\}$`, marks: 2 },
        { point: r`$A \setminus B = \{1, 2, 3\}$`, marks: 1 },
        { point: r`$A^c = \{6, \dots, 10\}$ and $(A \cup B)^c = \{8, 9, 10\}$`, marks: 1.5 },
        { point: r`Yes, every element of $A \cap B$ is in $A$`, marks: 0.5 },
      ],
      model: r`- $A \cup B$ (in at least one): $\{1, 2, 3, 4, 5, 6, 7\}$.
- $A \cap B$ (in both): $\{4, 5\}$.
- $A \setminus B$ (in $A$, not in $B$): $\{1, 2, 3\}$.
- $A^c$ (in $\Omega$, not in $A$): $\{6, 7, 8, 9, 10\}$.
- $(A \cup B)^c$ (in $\Omega$, not in $A \cup B$): $\{8, 9, 10\}$.
Yes: $4 \in A$ and $5 \in A$, so every element of $A \cap B$ is in $A$, i.e. $A \cap B \subseteq A$.`,
      answer: "{1,…,7}; {4, 5}; {1, 2, 3}; {6,…,10}; {8, 9, 10}; yes.",
      figures: [
        {
          kind: "venn",
          sets: ["A", "B"],
          shade: ["11"],
          items: { "10": "1, 2, 3", "11": "4, 5", "01": "6, 7", "00": "8, 9, 10" },
          universe: "Ω = {1, …, 10}",
          caption: "Shaded: A ∩ B = {4, 5}. Read every other answer off the regions.",
        },
      ],
      source: "Modelled on Lecture Note 2 (2.6) set operations and complement example",
    },
    {
      id: "sums-logic-sets-x15",
      kind: "select",
      sub: "Rules for sums",
      prompt: r`Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.`,
      statements: [
        r`$\sum_{i=1}^{n}(a_i + b_i) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i$.`,
        r`For a constant $c$, $\sum_{i=1}^{n} c = c$.`,
        r`For a finite double sum, $\sum_{i=1}^{m}\sum_{j=1}^{n} a_{ij} = \sum_{j=1}^{n}\sum_{i=1}^{m} a_{ij}$.`,
        r`$\sum_{i=1}^{n}\dfrac{x_i}{y_i} = \dfrac{\sum_{i=1}^{n} x_i}{\sum_{i=1}^{n} y_i}$ whenever all $y_i \ne 0$.`,
        r`With $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$, $\sum_{i=1}^{n}(x_i - \bar{x}) = 0$.`,
        r`$\sum_{i=4}^{7} N_i$ is the sum of 4 terms.`,
      ],
      wrong: [1, 3],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (iv) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong:** a constant $c$ summed $n$ times is $nc$, not $c$ (property (3)).
**(iv) is wrong:** there is no rule splitting a ratio inside a sum. Counterexample: $x = (1, 1)$, $y = (1, 2)$ gives $1.5$ on the left and $\frac{2}{3}$ on the right.
The others are correct: (i) is the additivity property; (iii) the order of a finite double sum is immaterial; (v) $\sum(x_i - \bar{x}) = n\bar{x} - n\bar{x} = 0$; (vi) $N_4, N_5, N_6, N_7$ are 4 terms.`,
      answer: "(ii) and (iv)",
      source: "Modelled on past paper Q4(c)/(d) format; Lecture Note 2 (2.1–2.3), Assignment 2",
    },
    {
      id: "sums-logic-sets-x16",
      kind: "select",
      sub: "Logic, proofs and sets",
      prompt: r`Which TWO of the following statements are wrong? Write down the corresponding Roman numerals only.`,
      statements: [
        r`If $P \Rightarrow Q$, then $Q$ is a necessary condition for $P$.`,
        r`$P \Rightarrow Q$ is logically equivalent to $Q \Rightarrow P$.`,
        r`$x > 2 \Rightarrow x^2 > 4$ is true, but $x^2 > 4 \Rightarrow x > 2$ is false.`,
        r`If $A \subseteq B$ and $B \subseteq A$, then $A = B$.`,
        r`$A \setminus B = \{x : x \in A \text{ or } x \notin B\}$.`,
        r`Inductive reasoning, such as concluding from 20 years of rising profits that profit will rise again, is not recognised as a mathematical proof.`,
      ],
      wrong: [1, 4],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (v) as wrong", marks: 2.5 },
      ],
      model: r`**(ii) is wrong:** $Q \Rightarrow P$ is the converse, which need not hold (father $\Rightarrow$ male, but not male $\Rightarrow$ father). The equivalent statement is not $Q \Rightarrow$ not $P$.
**(v) is wrong:** $A \setminus B$ is the set of elements in $A$ **and** not in $B$: $\{x : x \in A \text{ and } x \notin B\}$. With "or", it would also contain everything outside $B$.
The others are correct: (i) $P$ is true only if $Q$ is true; (iii) $x = -3$ satisfies $x^2 > 4$ but not $x > 2$; (iv) is a remark in 2.6; (vi) mathematics accepts only deductive proofs.`,
      answer: "(ii) and (v)",
      source: "Modelled on past paper Q4(c)/(d) format; Lecture Note 2 (2.4–2.6)",
    },
  ],
};

export default data;
