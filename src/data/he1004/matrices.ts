import type { TopicData } from "@/lib/he1004/types";

// Built from Lecture Note 9 (Basic Matrix Algebra: 9.1–9.4), Assignment 10 and past paper Q4(d).
// Assignment 10 Q1 matrices: A = (1 2; 5 1), B = C = (-1 0; 3 2), D = (-2 1 3; 3 0 1; 1 2 1)

const mA = String.raw`\begin{pmatrix} 1 & 2 \\ 5 & 1 \end{pmatrix}`;
const mB = String.raw`\begin{pmatrix} -1 & 0 \\ 3 & 2 \end{pmatrix}`;
const mD = String.raw`\begin{pmatrix} -2 & 1 & 3 \\ 3 & 0 & 1 \\ 1 & 2 & 1 \end{pmatrix}`;
const mM = String.raw`\begin{pmatrix} 2 & -2 & -4 \\ -1 & 3 & 4 \\ 1 & -2 & -3 \end{pmatrix}`;
// Lecture Note 9 Exercise [11]
const eA = String.raw`\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}`;
const eB = String.raw`\begin{pmatrix} 0 & -1 \\ 3 & 2 \end{pmatrix}`;
const eC = String.raw`\begin{pmatrix} 1 & 1 \\ 2 & 1 \end{pmatrix}`;

const data: TopicData = {
  id: "matrices",
  sections: [
    // ------------------------------------------------------------------ 9.1
    {
      title: "9.1 Matrix Operations",
      intro: String.raw`A matrix is a rectangular array of numbers. This section covers how to describe a matrix and the three basic operations: addition, multiplication by a scalar and matrix multiplication.`,
      points: [
        {
          term: "Matrix",
          text: String.raw`A rectangular array of numbers called **elements**. With $m$ rows and $n$ columns we have an $m$ by $n$ matrix, denoted by a bold capital letter: $\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix}$`,
        },
        {
          term: "Dimension (order)",
          text: String.raw`$\mathbf{A}$ has dimension (order) $m \times n$; it is an $m \times n$ matrix, also written $\mathbf{A} = (a_{ij})_{m \times n}$. It has $mn$ elements.`,
        },
        {
          term: "Element notation",
          text: String.raw`$a_{ij}$ is the element in the $i$th **row** and $j$th **column** (row first, then column).`,
          eg: String.raw`For $\mathbf{C} = \begin{pmatrix} -1 & 2 \\ 8 & 5 \\ 7 & 6 \\ 1 & 1 \end{pmatrix}$ ($4 \times 2$): $c_{32} = 6$, while $c_{33}$ does not exist (n/a) since $\mathbf{C}$ has only 2 columns.`,
        },
        {
          term: "Row and column vectors",
          text: String.raw`A matrix with only one row is a **row vector**; one with only one column is a **column vector**. Both are called vectors and are usually written with small bold letters.`,
          eg: String.raw`Column vector $\mathbf{a} = \begin{bmatrix} 1 \\ 4 \\ -3 \end{bmatrix}$; row vector $\mathbf{b} = \begin{bmatrix} 4 & 0.5 \end{bmatrix}$. $\mathbf{B} = (-1,\ 2,\ \sqrt3,\ 16)$ is $1 \times 4$ with $b_{13} = \sqrt3$.`,
        },
        {
          term: "Matrix addition",
          text: String.raw`If $\mathbf{A}$ and $\mathbf{B}$ have the **same dimension** $m \times n$, then $\mathbf{A} + \mathbf{B} = (a_{ij} + b_{ij})_{m \times n}$: add element by element. If the dimensions do not agree, $\mathbf{A} + \mathbf{B}$ cannot be computed.`,
          eg: String.raw`$\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix} + \begin{pmatrix} 1 & 0 \\ 7 & 1 \end{pmatrix} = \begin{pmatrix} 3 & 3 \\ 8 & 3 \end{pmatrix}$, but $\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix} + \begin{pmatrix} 2 \\ 4 \\ 7 \end{pmatrix}$ is undefined ($2 \times 2$ vs $3 \times 1$).`,
        },
        {
          term: "Multiplication by a scalar",
          text: String.raw`$\alpha\mathbf{A} = (\alpha a_{ij})_{m \times n}$: **each** element is multiplied by the number $\alpha$.`,
          eg: String.raw`$-\tfrac12\begin{pmatrix} 2 \\ 4 \\ 7 \end{pmatrix} = \begin{pmatrix} -1 \\ -2 \\ -3.5 \end{pmatrix}$; $\;5(4\ \ 1\ \ {-2}) = (20\ \ 5\ \ {-10})$.`,
        },
        {
          term: "Zero matrix",
          text: String.raw`$\mathbf{0}$ is the $m \times n$ matrix of zeros only. $\mathbf{A} + \mathbf{0} = \mathbf{A}$ and $\mathbf{A} + (-\mathbf{A}) = \mathbf{0}$.`,
        },
        {
          term: "Matrix multiplication",
          text: String.raw`If $\mathbf{A} = (a_{ij})_{m \times n}$ and $\mathbf{B} = (b_{ij})_{n \times p}$, then $\mathbf{C} = \mathbf{AB}$ is the $m \times p$ matrix whose $(i,j)$ element is the **inner product of row $i$ of $\mathbf{A}$ and column $j$ of $\mathbf{B}$**: $c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$.`,
        },
        {
          term: "When is AB defined?",
          text: String.raw`Only when the number of **columns of $\mathbf{A}$** equals the number of **rows of $\mathbf{B}$**; otherwise $\mathbf{AB}$ is undefined. New dimension: $(m \times n)(n \times p) = (m \times p)$.`,
          eg: String.raw`$\mathbf{A} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}$ ($2 \times 1$), $\mathbf{B} = (4\ \ 3)$ ($1 \times 2$): $\mathbf{AB}$ is $2 \times 2$ but $\mathbf{BA}$ is $1 \times 1$.`,
        },
        {
          term: "Order matters",
          text: String.raw`$\mathbf{AB}$ and $\mathbf{BA}$ are generally different — they may not even have the same size (Example [8]) or both be defined. Matrix multiplication is not commutative, so never reorder a product.`,
          eg: String.raw`$\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 7 & 1 \end{pmatrix} = \begin{pmatrix} 23 & 3 \\ 15 & 2 \end{pmatrix}$ but $\begin{pmatrix} 1 & 0 \\ 7 & 1 \end{pmatrix}\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix} = \begin{pmatrix} 2 & 3 \\ 15 & 23 \end{pmatrix}$.`,
        },
        {
          term: "Rules for matrix multiplication",
          text: String.raw`When the dimensions are compatible: $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$ (associative law), $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{AB} + \mathbf{AC}$ (left distributive law), $(\mathbf{A} + \mathbf{B})\mathbf{C} = \mathbf{AC} + \mathbf{BC}$ (right distributive law). The associative law lets you move brackets, **not** change the order: $\mathbf{ABCD} = \mathbf{CDAB}$ is false (past paper Q4(d)(i)).`,
        },
        {
          term: "Powers",
          text: String.raw`For a square matrix, $\mathbf{A}^2 = \mathbf{AA}$ (Assignment 10 Q2), $\mathbf{A}^3 = \mathbf{A}^2\mathbf{A}$.`,
        },
      ],
      formulas: [
        { name: "Sum", tex: String.raw`\mathbf{A} + \mathbf{B} = (a_{ij})_{m\times n} + (b_{ij})_{m\times n} = (a_{ij} + b_{ij})_{m \times n}`, note: "Same dimension only." },
        { name: "Scalar multiple", tex: String.raw`\alpha\mathbf{A} = \alpha(a_{ij})_{m\times n} = (\alpha a_{ij})_{m \times n}` },
        {
          name: "Rules for addition and scalars",
          tex: String.raw`\begin{aligned} &(\mathbf{A}+\mathbf{B})+\mathbf{C} = \mathbf{A}+(\mathbf{B}+\mathbf{C}), \quad \mathbf{A}+\mathbf{B} = \mathbf{B}+\mathbf{A}, \quad \mathbf{A}+\mathbf{0} = \mathbf{A}, \\ &\mathbf{A}+(-\mathbf{A}) = \mathbf{0}, \quad (\alpha+\beta)\mathbf{A} = \alpha\mathbf{A}+\beta\mathbf{A}, \quad \alpha(\mathbf{A}+\mathbf{B}) = \alpha\mathbf{A}+\alpha\mathbf{B} \end{aligned}`,
          note: String.raw`$\mathbf{A}, \mathbf{B}, \mathbf{C}$ any $m \times n$ matrices; $\alpha, \beta$ any real numbers.`,
        },
        { name: "Product element", tex: String.raw`c_{ij} = \sum_{r=1}^{n} a_{ir}b_{rj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}` },
        { name: "Dimension of a product", tex: String.raw`(m \times n) \times (n \times p) = (m \times p)` },
        {
          name: "2 × 2 product",
          tex: String.raw`\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} e & f \\ g & h \end{pmatrix} = \begin{pmatrix} ae + bg & af + bh \\ ce + dg & cf + dh \end{pmatrix}`,
        },
        {
          name: "Rules for multiplication",
          tex: String.raw`(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC}), \quad \mathbf{A}(\mathbf{B}+\mathbf{C}) = \mathbf{AB}+\mathbf{AC}, \quad (\mathbf{A}+\mathbf{B})\mathbf{C} = \mathbf{AC}+\mathbf{BC}`,
          note: "Associative, left distributive and right distributive laws.",
        },
      ],
      table: [
        ["Operation", "Defined when", "Dimension of result"],
        [String.raw`$\mathbf{A} + \mathbf{B}$`, "same dimension", String.raw`same as $\mathbf{A}$`],
        [String.raw`$\alpha\mathbf{A}$`, "always", String.raw`same as $\mathbf{A}$`],
        [String.raw`$\mathbf{AB}$`, String.raw`columns of $\mathbf{A}$ = rows of $\mathbf{B}$`, String.raw`(rows of $\mathbf{A}$) × (columns of $\mathbf{B}$)`],
      ],
      worked: [
        {
          problem: String.raw`Example [8]: $\mathbf{A} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}$, $\mathbf{B} = (4\ \ 3)$. Find $\mathbf{AB}$ and $\mathbf{BA}$.`,
          solution: String.raw`$\mathbf{AB}$: $(2 \times 1)(1 \times 2) = 2 \times 2$. $\mathbf{AB} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}(4\ \ 3) = \begin{pmatrix} 4 & 3 \\ -2 & -1.5 \end{pmatrix}$.
$\mathbf{BA}$: $(1 \times 2)(2 \times 1) = 1 \times 1$. $\mathbf{BA} = (4)(1) + (3)(-0.5) = 2.5$.`,
          source: "Lecture Note 9 Example [8]",
        },
        {
          problem: String.raw`Example [9]: compute $\begin{pmatrix} 1 & 0 & 3 \\ 2 & 1 & 5 \end{pmatrix}\begin{pmatrix} 1 & 3 \\ 2 & 5 \\ 6 & 2 \end{pmatrix}$.`,
          solution: String.raw`$(2 \times 3)(3 \times 2) = 2 \times 2$.
$= \begin{pmatrix} 1\cdot1 + 0\cdot2 + 3\cdot6 & 1\cdot3 + 0\cdot5 + 3\cdot2 \\ 2\cdot1 + 1\cdot2 + 5\cdot6 & 2\cdot3 + 1\cdot5 + 5\cdot2 \end{pmatrix} = \begin{pmatrix} 19 & 9 \\ 34 & 21 \end{pmatrix}$.`,
          source: "Lecture Note 9 Example [9]",
        },
        {
          problem: String.raw`Example [10]: compute $\begin{pmatrix} 1 & 0 \\ 1 & 4 \end{pmatrix}\begin{pmatrix} 0 & 3 \\ 4 & 5 \end{pmatrix}$.`,
          solution: String.raw`$= \begin{pmatrix} 1\times0 + 0\times4 & 1\times3 + 0\times5 \\ 1\times0 + 4\times4 & 1\times3 + 4\times5 \end{pmatrix} = \begin{pmatrix} 0 & 3 \\ 16 & 23 \end{pmatrix}$.`,
          source: "Lecture Note 9 Example [10]",
        },
        {
          problem: String.raw`Exercise [11]: verify the associative and both distributive laws for $\mathbf{A} = ${eA}$, $\mathbf{B} = ${eB}$, $\mathbf{C} = ${eC}$.`,
          solution: String.raw`$\mathbf{AB} = \begin{pmatrix} 6 & 3 \\ 3 & 2 \end{pmatrix}$, $\mathbf{BC} = \begin{pmatrix} -2 & -1 \\ 7 & 5 \end{pmatrix}$, $\mathbf{AC} = \begin{pmatrix} 5 & 3 \\ 2 & 1 \end{pmatrix}$.
**Associative:** $(\mathbf{AB})\mathbf{C} = \begin{pmatrix} 6 & 3 \\ 3 & 2 \end{pmatrix}${eC} = \begin{pmatrix} 12 & 9 \\ 7 & 5 \end{pmatrix}$ and $\mathbf{A}(\mathbf{BC}) = ${eA}\begin{pmatrix} -2 & -1 \\ 7 & 5 \end{pmatrix} = \begin{pmatrix} 12 & 9 \\ 7 & 5 \end{pmatrix}$. ✓
**Left distributive:** $\mathbf{B} + \mathbf{C} = \begin{pmatrix} 1 & 0 \\ 5 & 3 \end{pmatrix}$, $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$, and $\mathbf{AB} + \mathbf{AC} = \begin{pmatrix} 6+5 & 3+3 \\ 3+2 & 2+1 \end{pmatrix} = \begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$. ✓
**Right distributive:** $\mathbf{A} + \mathbf{B} = \begin{pmatrix} 1 & 1 \\ 3 & 3 \end{pmatrix}$, $(\mathbf{A} + \mathbf{B})\mathbf{C} = \begin{pmatrix} 3 & 2 \\ 9 & 6 \end{pmatrix}$, and $\mathbf{AC} + \mathbf{BC} = \begin{pmatrix} 5-2 & 3-1 \\ 2+7 & 1+5 \end{pmatrix} = \begin{pmatrix} 3 & 2 \\ 9 & 6 \end{pmatrix}$. ✓`,
          source: "Lecture Note 9 Exercise [11]",
        },
        {
          problem: String.raw`Assignment 10 Q1(a): with $\mathbf{A} = ${mA}$, $\mathbf{B} = \mathbf{C} = ${mB}$, find $2\mathbf{A} - \mathbf{B} + 4\mathbf{C}$ and $\mathbf{A} + 2\mathbf{B}$.`,
          solution: String.raw`$2\mathbf{A} = \begin{pmatrix} 2 & 4 \\ 10 & 2 \end{pmatrix}$, $-\mathbf{B} = \begin{pmatrix} 1 & 0 \\ -3 & -2 \end{pmatrix}$, $4\mathbf{C} = \begin{pmatrix} -4 & 0 \\ 12 & 8 \end{pmatrix}$.
Add element by element: $2\mathbf{A} - \mathbf{B} + 4\mathbf{C} = \begin{pmatrix} 2+1-4 & 4+0+0 \\ 10-3+12 & 2-2+8 \end{pmatrix} = \begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$.
$\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} 1-2 & 2+0 \\ 5+6 & 1+4 \end{pmatrix} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$.`,
          source: "Assignment 10 Q1(a)",
        },
      ],
    },
    // ------------------------------------------------------------------ 9.2
    {
      title: "9.2 Transpose",
      intro: String.raw`The transpose turns rows into columns. The notes write it as $\mathbf{A}'$ (or $\mathbf{A}^T$); both notations appear in Assignment 10 and the past paper.`,
      points: [
        {
          term: "Transpose",
          text: String.raw`For an $m \times n$ matrix $\mathbf{A}$, the transpose $\mathbf{A}'$ (or $\mathbf{A}^T$) is the $n \times m$ matrix whose first row is the first column of $\mathbf{A}$, whose second row is the second column of $\mathbf{A}$, and so on: the $(i,j)$ element of $\mathbf{A}'$ is $a_{ji}$.`,
          eg: String.raw`$\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}' = \begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix}$; $\;(4\ \ 3)' = \begin{pmatrix} 4 \\ 3 \end{pmatrix}$`,
        },
        {
          term: "Rules for transposition",
          text: String.raw`(a) $(\mathbf{A}')' = \mathbf{A}$; (b) $(\mathbf{A} + \mathbf{B})' = \mathbf{A}' + \mathbf{B}'$; (c) $(\alpha\mathbf{A})' = \alpha\mathbf{A}'$; (d) $(\mathbf{AB})' = \mathbf{B}'\mathbf{A}'$ — transpose each factor **and reverse the order**.`,
        },
        {
          term: "Transpose of a longer product",
          text: String.raw`Using rule (d) repeatedly: $(\mathbf{ABCD})' = \mathbf{D}'\mathbf{C}'\mathbf{B}'\mathbf{A}'$ (Assignment 10 Q3; past paper Q4(d)(ii) is TRUE).`,
        },
        {
          term: "Identity matrix",
          text: String.raw`$\mathbf{I}$ has 1s on the diagonal and 0s off the diagonal (defined in 9.4). It is **square and symmetric** (past paper Q4(d)(iv) is TRUE), and for any $n \times n$ matrix $\mathbf{B}$: $\mathbf{I}_n\mathbf{B} = \mathbf{B}\mathbf{I}_n = \mathbf{B}$ (Assignment 10 Q4 hint).`,
        },
        {
          term: "Symmetric matrix",
          text: String.raw`(Assignment 10 Q4.) A square matrix with $\mathbf{A}' = \mathbf{A}$, i.e. $a_{ij} = a_{ji}$ for all $i$ and $j$: a mirror image across the diagonal.`,
          eg: String.raw`$\mathbf{A}^T + \mathbf{A} = \begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$ for Assignment 10's $\mathbf{A}$. It is always symmetric since $(\mathbf{A}' + \mathbf{A})' = \mathbf{A} + \mathbf{A}'$.`,
        },
        {
          term: "Product with its transpose",
          text: String.raw`If $\mathbf{X}$ is $m \times n$, then $\mathbf{X}'\mathbf{X}$ is $(n \times m)(m \times n) = n \times n$ and is symmetric: $(\mathbf{X}'\mathbf{X})' = \mathbf{X}'(\mathbf{X}')' = \mathbf{X}'\mathbf{X}$ (rules (d) and (a)).`,
        },
      ],
      formulas: [
        { name: "Transpose element", tex: String.raw`\mathbf{A} = (a_{ij})_{m\times n} \implies \mathbf{A}' = (a_{ji})_{n \times m}` },
        { name: "(a) Double transpose", tex: String.raw`(\mathbf{A}')' = \mathbf{A}` },
        { name: "(b) Transpose of a sum", tex: String.raw`(\mathbf{A}+\mathbf{B})' = \mathbf{A}' + \mathbf{B}'` },
        { name: "(c) Transpose of a scalar multiple", tex: String.raw`(\alpha\mathbf{A})' = \alpha\mathbf{A}'` },
        { name: "(d) Transpose of a product", tex: String.raw`(\mathbf{AB})' = \mathbf{B}'\mathbf{A}'`, note: "Reverse the order." },
        { name: "Four factors", tex: String.raw`(\mathbf{ABCD})' = \mathbf{D}'\mathbf{C}'\mathbf{B}'\mathbf{A}'` },
        { name: "Symmetric", tex: String.raw`\mathbf{A}' = \mathbf{A} \iff a_{ij} = a_{ji} \text{ for all } i, j` },
      ],
      worked: [
        {
          problem: String.raw`Example [12](i): find $\mathbf{A}'$ for $\mathbf{A} = ${eA}$.`,
          solution: String.raw`Row 1 $(1, 2)$ becomes column 1 and row 2 $(0, 1)$ becomes column 2: $\mathbf{A}' = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$.`,
          source: "Lecture Note 9 Example [12]",
        },
        {
          problem: String.raw`Example [13]: verify rules (a)–(d) using $\mathbf{A} = ${eA}$ and $\mathbf{B} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ (take $\alpha = 3$ for (c)).`,
          solution: String.raw`$\mathbf{A}' = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$, $\mathbf{B}' = \mathbf{B}$.
(a) $(\mathbf{A}')' = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix} = \mathbf{A}$. ✓
(b) $\mathbf{A} + \mathbf{B} = \begin{pmatrix} 2 & 2 \\ 0 & 2 \end{pmatrix}$, so $(\mathbf{A} + \mathbf{B})' = \begin{pmatrix} 2 & 0 \\ 2 & 2 \end{pmatrix}$; $\mathbf{A}' + \mathbf{B}' = \begin{pmatrix} 1+1 & 0 \\ 2 & 1+1 \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 2 & 2 \end{pmatrix}$. ✓
(c) $(3\mathbf{A})' = \begin{pmatrix} 3 & 6 \\ 0 & 3 \end{pmatrix}' = \begin{pmatrix} 3 & 0 \\ 6 & 3 \end{pmatrix} = 3\mathbf{A}'$. ✓
(d) $\mathbf{AB} = \mathbf{A}$, so $(\mathbf{AB})' = \mathbf{A}' = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$; $\mathbf{B}'\mathbf{A}' = \mathbf{I}\mathbf{A}' = \mathbf{A}'$. ✓`,
          source: "Lecture Note 9 Example [13]",
        },
        {
          problem: String.raw`Assignment 10 Q1(b): find $\mathbf{A}^T + \mathbf{A}$ and $(\mathbf{A} + 2\mathbf{B})^T$ for $\mathbf{A} = ${mA}$, $\mathbf{B} = ${mB}$.`,
          solution: String.raw`$\mathbf{A}^T = \begin{pmatrix} 1 & 5 \\ 2 & 1 \end{pmatrix}$, so $\mathbf{A}^T + \mathbf{A} = \begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$.
$\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$, so $(\mathbf{A} + 2\mathbf{B})^T = \begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$.`,
          source: "Assignment 10 Q1(b)",
        },
        {
          problem: String.raw`Assignment 10 Q3: show that $(\mathbf{ABCD})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$.`,
          solution: String.raw`Use rule (d), $(\mathbf{XY})^T = \mathbf{Y}^T\mathbf{X}^T$, three times, grouping with the associative law:
$(\mathbf{ABCD})^T = \big((\mathbf{ABC})\mathbf{D}\big)^T = \mathbf{D}^T(\mathbf{ABC})^T = \mathbf{D}^T\big((\mathbf{AB})\mathbf{C}\big)^T = \mathbf{D}^T\mathbf{C}^T(\mathbf{AB})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$. $\blacksquare$`,
          source: "Assignment 10 Q3",
        },
        {
          problem: String.raw`Past paper Q4(d)(iii): if $\mathbf{A}$ is symmetric and idempotent ($\mathbf{AA} = \mathbf{A}$), is $(\mathbf{AIA}^T\mathbf{A})^T = \mathbf{A}^T$?`,
          solution: String.raw`$\mathbf{AI} = \mathbf{A}$ and $\mathbf{A}^T = \mathbf{A}$, so $\mathbf{AIA}^T\mathbf{A} = \mathbf{AAA} = (\mathbf{AA})\mathbf{A} = \mathbf{AA} = \mathbf{A}$.
Hence $(\mathbf{AIA}^T\mathbf{A})^T = \mathbf{A}^T$: **true**.`,
          source: "Past paper Q4(d)(iii)",
        },
      ],
    },
    // ------------------------------------------------------------------ 9.3
    {
      title: "9.3 Determinants of the Matrices",
      intro: String.raw`The determinant $|\mathbf{A}|$ is a single number computed from a square matrix. You need the $2 \times 2$ and $3 \times 3$ cases ($n \times n$ beyond that is not tested).`,
      points: [
        {
          term: "2 × 2 determinant",
          text: String.raw`For $\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}$: multiply the diagonal elements, multiply the off-diagonal elements, and subtract the off-diagonal product from the diagonal product: $|\mathbf{A}| = a_{11}a_{22} - a_{12}a_{21}$.`,
          eg: String.raw`$\begin{vmatrix} 4 & 1 \\ 3 & 2 \end{vmatrix} = 4 \times 2 - 1 \times 3 = 5$; $\;\begin{vmatrix} a & y \\ x & b \end{vmatrix} = ab - xy$.`,
        },
        {
          term: "3 × 3 determinant",
          text: String.raw`$|\mathbf{A}| = a_{11}a_{22}a_{33} - a_{11}a_{23}a_{32} + a_{12}a_{23}a_{31} - a_{12}a_{21}a_{33} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31}$.`,
        },
        {
          term: "Expansion by cofactors",
          text: String.raw`Equivalently, expand along the first row with signs $+, -, +$: each first-row element times the $2 \times 2$ determinant left after deleting its row and column. This is usually the easiest way to compute by hand.`,
        },
        {
          term: "Determinant of the transpose",
          text: String.raw`(Past paper Q4(d)(v), TRUE.) $|\mathbf{A}'| = |\mathbf{A}|$. For $2 \times 2$: $\begin{vmatrix} a & c \\ b & d \end{vmatrix} = ad - cb$, the same number as $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$.`,
        },
      ],
      formulas: [
        { name: "2 × 2 determinant", tex: String.raw`|\mathbf{A}| = \begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}` },
        {
          name: "3 × 3 determinant",
          tex: String.raw`|\mathbf{A}| = a_{11}a_{22}a_{33} - a_{11}a_{23}a_{32} + a_{12}a_{23}a_{31} - a_{12}a_{21}a_{33} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31}`,
        },
        {
          name: "Expansion by cofactors",
          tex: String.raw`|\mathbf{A}| = a_{11}\begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} - a_{12}\begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} + a_{13}\begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}`,
          note: "Signs alternate +, −, + along the first row.",
        },
        { name: "Transpose", tex: String.raw`|\mathbf{A}'| = |\mathbf{A}|` },
      ],
      worked: [
        {
          problem: String.raw`Example [16]: find $|\mathbf{A}|$ for $\mathbf{A} = \begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 1 & 0 & 2 \end{pmatrix}$.`,
          solution: String.raw`$|\mathbf{A}| = 1\begin{vmatrix} 1 & 0 \\ 0 & 2 \end{vmatrix} - 2\begin{vmatrix} 0 & 0 \\ 1 & 2 \end{vmatrix} + 1\begin{vmatrix} 0 & 1 \\ 1 & 0 \end{vmatrix} = 1 \times 2 - 2 \times 0 + 1 \times (-1) = 1$.`,
          source: "Lecture Note 9 Example [16]",
        },
        {
          problem: String.raw`Assignment 10 Q1(c): find $|(\mathbf{A} + 2\mathbf{B})^T|$, where $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$.`,
          solution: String.raw`$(\mathbf{A} + 2\mathbf{B})^T = \begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$, so $|(\mathbf{A} + 2\mathbf{B})^T| = (-1)(5) - (11)(2) = -27$.
Check: $|\mathbf{A} + 2\mathbf{B}| = (-1)(5) - (2)(11) = -27$, as $|\mathbf{A}'| = |\mathbf{A}|$.`,
          source: "Assignment 10 Q1(c)",
        },
        {
          problem: String.raw`Assignment 10 Q1(d): find $|\mathbf{D}|$ for $\mathbf{D} = ${mD}$.`,
          solution: String.raw`Expand along the first row $(-2, 1, 3)$ with signs $+, -, +$:
$|\mathbf{D}| = -2\begin{vmatrix} 0 & 1 \\ 2 & 1 \end{vmatrix} - 1\begin{vmatrix} 3 & 1 \\ 1 & 1 \end{vmatrix} + 3\begin{vmatrix} 3 & 0 \\ 1 & 2 \end{vmatrix} = -2(0 - 2) - 1(3 - 1) + 3(6 - 0) = 4 - 2 + 18 = 20$.`,
          source: "Assignment 10 Q1(d)",
        },
      ],
    },
    // ------------------------------------------------------------------ 9.4
    {
      title: "9.4 The Inverse of a Matrix",
      intro: String.raw`The inverse plays the role of $1/a$ for a number. This section also covers the idempotent matrices of Assignment 10 Q2 and Q4.`,
      points: [
        {
          term: "Inverse",
          text: String.raw`For a $2 \times 2$ matrix $\mathbf{A}$, $\mathbf{A}^{-1}$ is an inverse of $\mathbf{A}$ if $\mathbf{AA}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.`,
        },
        {
          term: "Identity matrix",
          text: String.raw`The matrix with 1s on the diagonal and 0s off the diagonal is the identity matrix $\mathbf{I}$. It acts like the number 1.`,
        },
        {
          term: "Number analogy",
          text: String.raw`If $\mathbf{A}$ were a number, say 9, its inverse would be $9^{-1}$, and $9 \times \frac19 = 1$. For matrices, "$=1$" becomes "$=\mathbf{I}$".`,
        },
        {
          term: "2 × 2 inverse formula",
          text: String.raw`If $\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ and $|\mathbf{A}| = ad - bc \neq 0$, then $\mathbf{A}^{-1} = \frac{1}{|\mathbf{A}|}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$: swap the diagonal elements, change the signs of the off-diagonal elements, divide by the determinant. If $|\mathbf{A}| = 0$ there is no inverse.`,
        },
        {
          term: "Check an inverse",
          text: String.raw`Multiply back: $\mathbf{AA}^{-1}$ must give $\mathbf{I}$. This catches sign slips.`,
        },
        {
          term: "Determinant of the inverse",
          text: String.raw`(Past paper Q4(d)(vi) is WRONG.) $|\mathbf{A}^{-1}| = \dfrac{1}{|\mathbf{A}|}$, not $|\mathbf{A}|$. From the $2 \times 2$ formula: $|\mathbf{A}^{-1}| = \frac{1}{|\mathbf{A}|^2}(da - bc) = \frac{1}{|\mathbf{A}|}$.`,
          eg: String.raw`$|\mathbf{C}| = -2$ for $\mathbf{C} = ${mB}$, but $|\mathbf{C}^{-1}| = -\tfrac12$.`,
        },
        {
          term: "Inverse of a transpose",
          text: String.raw`$(\mathbf{A}^{-1})' = (\mathbf{A}')^{-1}$, because $(\mathbf{A}^{-1})'\mathbf{A}' = (\mathbf{AA}^{-1})' = \mathbf{I}' = \mathbf{I}$ by rule (d). So the inverse of a symmetric matrix is symmetric (used in Assignment 10 Q4).`,
        },
        {
          term: "Idempotent matrix",
          text: String.raw`(Assignment 10 Q2.) A square matrix with $\mathbf{A}^2 = \mathbf{A}$, where $\mathbf{A}^2 = \mathbf{AA}$. Test it by computing $\mathbf{AA}$ and comparing element by element. Then $\mathbf{A}^3 = \mathbf{A}^2\mathbf{A} = \mathbf{AA} = \mathbf{A}$ too.`,
          eg: String.raw`$\mathbf{I}$ is idempotent: $\mathbf{II} = \mathbf{I}$.`,
        },
        {
          term: "Showing symmetric and idempotent",
          text: String.raw`(Assignment 10 Q4.) To show $\mathbf{A}' = \mathbf{A}$ use the transposition rules; to show $\mathbf{AA} = \mathbf{A}$ expand the product and simplify with $\mathbf{MM}^{-1} = \mathbf{I}$ and $\mathbf{I}_n\mathbf{B} = \mathbf{B}$.`,
        },
      ],
      formulas: [
        { name: "Definition of inverse", tex: String.raw`\mathbf{AA}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}` },
        {
          name: "2 × 2 inverse",
          tex: String.raw`\mathbf{A}^{-1} = \frac{1}{|\mathbf{A}|}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}, \quad ad - bc \neq 0`,
        },
        { name: "Determinant of inverse", tex: String.raw`|\mathbf{A}^{-1}| = \frac{1}{|\mathbf{A}|}` },
        { name: "Inverse and transpose", tex: String.raw`(\mathbf{A}^{-1})' = (\mathbf{A}')^{-1}` },
        { name: "Idempotent", tex: String.raw`\mathbf{A}^2 = \mathbf{AA} = \mathbf{A}` },
      ],
      worked: [
        {
          problem: String.raw`Example [17]: find the inverse of $\mathbf{A} = \begin{pmatrix} 1 & 1 \\ -1 & 2 \end{pmatrix}$.`,
          solution: String.raw`$|\mathbf{A}| = ad - bc = (1)(2) - (1)(-1) = 2 - (-1) = 3$.
$\mathbf{A}^{-1} = \frac{1}{3}\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$.
Check: $\begin{pmatrix} 1 & 1 \\ -1 & 2 \end{pmatrix}\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 3 & 0 \\ 0 & 3 \end{pmatrix}$, and $\frac13$ of this is $\mathbf{I}$. ✓`,
          source: "Lecture Note 9 Example [17]",
        },
        {
          problem: String.raw`Assignment 10 Q1(e): find $\mathbf{C}^{-1}$ and $(\mathbf{A} + 2\mathbf{B})^{-1}$, where $\mathbf{C} = ${mB}$ and $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$.`,
          solution: String.raw`$|\mathbf{C}| = (-1)(2) - (0)(3) = -2$, so $\mathbf{C}^{-1} = \frac{1}{-2}\begin{pmatrix} 2 & 0 \\ -3 & -1 \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ \tfrac32 & \tfrac12 \end{pmatrix}$. Check: $\mathbf{CC}^{-1} = \begin{pmatrix} 1 & 0 \\ -3 + 3 & 1 \end{pmatrix} = \mathbf{I}$. ✓
$|\mathbf{A} + 2\mathbf{B}| = -27$, so $(\mathbf{A} + 2\mathbf{B})^{-1} = \frac{1}{-27}\begin{pmatrix} 5 & -2 \\ -11 & -1 \end{pmatrix} = \begin{pmatrix} -\tfrac{5}{27} & \tfrac{2}{27} \\ \tfrac{11}{27} & \tfrac{1}{27} \end{pmatrix}$.
Check: $\begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}\begin{pmatrix} -5 & 2 \\ 11 & 1 \end{pmatrix} = \begin{pmatrix} 27 & 0 \\ 0 & 27 \end{pmatrix}$; dividing by 27 gives $\mathbf{I}$. ✓`,
          source: "Assignment 10 Q1(e)",
        },
        {
          problem: String.raw`Assignment 10 Q2: is $\mathbf{M} = ${mM}$ idempotent?`,
          solution: String.raw`Compute $\mathbf{M}^2 = \mathbf{MM}$ row by column.
Row 1: $(2)(2) + (-2)(-1) + (-4)(1) = 2$; $(2)(-2) + (-2)(3) + (-4)(-2) = -2$; $(2)(-4) + (-2)(4) + (-4)(-3) = -4$.
Row 2: $-2 - 3 + 4 = -1$; $2 + 9 - 8 = 3$; $4 + 12 - 12 = 4$.
Row 3: $2 + 2 - 3 = 1$; $-2 - 6 + 6 = -2$; $-4 - 8 + 9 = -3$.
So $\mathbf{M}^2 = ${mM} = \mathbf{M}$: **yes, $\mathbf{M}$ is idempotent.**`,
          source: "Assignment 10 Q2",
        },
        {
          problem: String.raw`Assignment 10 Q4: let $\mathbf{A} = \mathbf{I} - \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ where $\mathbf{X}$ is $m \times n$. Show that $\mathbf{A}$ is symmetric and idempotent.`,
          solution: String.raw`Write $\mathbf{P} = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ ($m \times m$), so $\mathbf{A} = \mathbf{I}_m - \mathbf{P}$.
**Symmetric.** $(\mathbf{X}'\mathbf{X})' = \mathbf{X}'\mathbf{X}$, so its inverse is symmetric: $\big((\mathbf{X}'\mathbf{X})^{-1}\big)' = \big((\mathbf{X}'\mathbf{X})'\big)^{-1} = (\mathbf{X}'\mathbf{X})^{-1}$.
Then $\mathbf{P}' = (\mathbf{X}')'\big((\mathbf{X}'\mathbf{X})^{-1}\big)'\mathbf{X}' = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' = \mathbf{P}$ (rule (d), reversed order), so $\mathbf{A}' = \mathbf{I}' - \mathbf{P}' = \mathbf{I} - \mathbf{P} = \mathbf{A}$.
**Idempotent.** $\mathbf{P}^2 = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\underbrace{\mathbf{X}'\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}}_{\mathbf{I}_n}\mathbf{X}' = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' = \mathbf{P}$.
$\mathbf{A}^2 = (\mathbf{I} - \mathbf{P})(\mathbf{I} - \mathbf{P}) = \mathbf{I} - \mathbf{P} - \mathbf{P} + \mathbf{P}^2 = \mathbf{I} - 2\mathbf{P} + \mathbf{P} = \mathbf{I} - \mathbf{P} = \mathbf{A}$. $\blacksquare$`,
          source: "Assignment 10 Q4",
        },
      ],
    },
  ],

  // ==================================================================== flashcards
  flashcards: [
    // concept
    { id: "matrices-c1", type: "concept", front: String.raw`A rectangular array of numbers arranged in rows and columns.`, back: "matrix", why: String.raw`The numbers are its elements; $m$ rows and $n$ columns make an $m \times n$ matrix.` },
    { id: "matrices-c2", type: "concept", front: String.raw`The numbers inside a matrix; $a_{ij}$ is the one in row $i$, column $j$.`, back: "elements", why: String.raw`Row index first, column index second: in a $4 \times 2$ matrix $c_{32}$ exists but $c_{33}$ does not.` },
    { id: "matrices-c3", type: "concept", front: String.raw`The description "$m \times n$" of a matrix with $m$ rows and $n$ columns.`, back: "dimension", why: String.raw`Also called the order. An $m \times n$ matrix has $mn$ elements.` },
    { id: "matrices-c4", type: "concept", front: String.raw`A matrix with only one row, e.g. $(4\ \ 0.5)$.`, back: "row vector", why: String.raw`A $1 \times n$ matrix; vectors are usually written in small bold letters.` },
    { id: "matrices-c5", type: "concept", front: String.raw`A matrix with only one column, e.g. $\begin{pmatrix} 1 \\ 4 \\ -3 \end{pmatrix}$.`, back: "column vector", why: String.raw`An $m \times 1$ matrix.` },
    { id: "matrices-c6", type: "concept", front: String.raw`The $m \times n$ matrix $\mathbf{0}$ with $\mathbf{A} + \mathbf{0} = \mathbf{A}$.`, back: "zero matrix", why: String.raw`It consists of zeros only; also $\mathbf{A} + (-\mathbf{A}) = \mathbf{0}$.` },
    { id: "matrices-c7", type: "concept", front: String.raw`A matrix with the same number of rows and columns.`, back: "square matrix", why: String.raw`Only square matrices have determinants, inverses and powers $\mathbf{A}^2$.` },
    { id: "matrices-c8", type: "concept", front: String.raw`The $n \times m$ matrix whose rows are the columns of an $m \times n$ matrix $\mathbf{A}$, written $\mathbf{A}'$ or $\mathbf{A}^T$.`, back: "transpose", why: String.raw`Its $(i,j)$ element is $a_{ji}$.` },
    { id: "matrices-c9", type: "concept", front: String.raw`A square matrix with $\mathbf{A}' = \mathbf{A}$, i.e. $a_{ij} = a_{ji}$ for all $i, j$.`, back: "symmetric matrix", why: String.raw`Mirror image across the diagonal, e.g. $\begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$ (Assignment 10 Q4 hint).` },
    { id: "matrices-c10", type: "concept", front: String.raw`A square matrix with $\mathbf{A}^2 = \mathbf{A}$.`, back: "idempotent matrix", why: String.raw`Test it by computing $\mathbf{AA}$ and comparing with $\mathbf{A}$ (Assignment 10 Q2).` },
    { id: "matrices-c11", type: "concept", front: String.raw`The matrix with 1s on the diagonal and 0s off the diagonal.`, back: "identity matrix", why: String.raw`$\mathbf{I}$: square, symmetric, and $\mathbf{IB} = \mathbf{BI} = \mathbf{B}$.` },
    { id: "matrices-c12", type: "concept", front: String.raw`The matrix $\mathbf{A}^{-1}$ with $\mathbf{AA}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$.`, back: "inverse", why: String.raw`Exists only when $|\mathbf{A}| \neq 0$; like $9^{-1}$ for the number 9.` },
    { id: "matrices-c13", type: "concept", front: String.raw`The law $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$.`, back: "associative law", why: String.raw`Brackets can move but the order cannot change: $\mathbf{ABCD} = \mathbf{CDAB}$ is false (past paper Q4(d)(i)).` },
    { id: "matrices-c14", type: "concept", front: String.raw`The law $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{AB} + \mathbf{AC}$.`, back: "left distributive law", why: String.raw`The right distributive law is $(\mathbf{A} + \mathbf{B})\mathbf{C} = \mathbf{AC} + \mathbf{BC}$.` },
    { id: "matrices-c15", type: "concept", front: String.raw`The number $a_{11}a_{22} - a_{12}a_{21}$ computed from a $2 \times 2$ matrix.`, back: "determinant", why: String.raw`Written $|\mathbf{A}|$: diagonal product minus off-diagonal product.` },

    // formula
    { id: "matrices-c16", type: "formula", front: "Matrix addition and scalar multiplication", back: String.raw`$\mathbf{A} + \mathbf{B} = (a_{ij} + b_{ij})_{m\times n}$, $\;\alpha\mathbf{A} = (\alpha a_{ij})_{m \times n}$`, why: String.raw`Addition needs the same dimension; a scalar multiplies every element.` },
    { id: "matrices-c17", type: "formula", front: "Rules for addition and multiplication by scalars", back: String.raw`$(\mathbf{A}+\mathbf{B})+\mathbf{C} = \mathbf{A}+(\mathbf{B}+\mathbf{C})$, $\mathbf{A}+\mathbf{B} = \mathbf{B}+\mathbf{A}$, $\mathbf{A}+\mathbf{0} = \mathbf{A}$, $\mathbf{A}+(-\mathbf{A}) = \mathbf{0}$, $(\alpha+\beta)\mathbf{A} = \alpha\mathbf{A}+\beta\mathbf{A}$, $\alpha(\mathbf{A}+\mathbf{B}) = \alpha\mathbf{A}+\alpha\mathbf{B}$`, why: String.raw`Rules (a)–(f) of 9.1 for $m \times n$ matrices. Note addition IS commutative, unlike multiplication.` },
    { id: "matrices-c18", type: "formula", front: "Element (i, j) of a product AB", back: String.raw`$c_{ij} = \sum_{r=1}^{n} a_{ir}b_{rj}$`, why: String.raw`Inner product of row $i$ of $\mathbf{A}$ and column $j$ of $\mathbf{B}$; dimension $(m \times n)(n \times p) = m \times p$.` },
    { id: "matrices-c19", type: "formula", front: "Rules for matrix multiplication", back: String.raw`$(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$, $\mathbf{A}(\mathbf{B}+\mathbf{C}) = \mathbf{AB}+\mathbf{AC}$, $(\mathbf{A}+\mathbf{B})\mathbf{C} = \mathbf{AC}+\mathbf{BC}$`, why: String.raw`Associative, left and right distributive laws (verified in Exercise [11]). There is no rule $\mathbf{AB} = \mathbf{BA}$.` },
    { id: "matrices-c20", type: "formula", front: "Rules for transposition", back: String.raw`$(\mathbf{A}')' = \mathbf{A}$, $(\mathbf{A}+\mathbf{B})' = \mathbf{A}'+\mathbf{B}'$, $(\alpha\mathbf{A})' = \alpha\mathbf{A}'$, $(\mathbf{AB})' = \mathbf{B}'\mathbf{A}'$`, why: String.raw`Rule (d) reverses the order; repeated, it gives $(\mathbf{ABCD})' = \mathbf{D}'\mathbf{C}'\mathbf{B}'\mathbf{A}'$.` },
    { id: "matrices-c21", type: "formula", front: "2 × 2 determinant", back: String.raw`$\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$`, why: String.raw`E.g. $\begin{vmatrix} 4 & 1 \\ 3 & 2 \end{vmatrix} = 8 - 3 = 5$.` },
    { id: "matrices-c22", type: "formula", front: "3 × 3 determinant by cofactors", back: String.raw`$a_{11}\begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} - a_{12}\begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} + a_{13}\begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}$`, why: String.raw`Expands to $a_{11}a_{22}a_{33} - a_{11}a_{23}a_{32} + a_{12}a_{23}a_{31} - a_{12}a_{21}a_{33} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31}$.` },
    { id: "matrices-c23", type: "formula", front: "2 × 2 inverse", back: String.raw`$\mathbf{A}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$`, why: String.raw`Swap the diagonal, negate the off-diagonal, divide by $|\mathbf{A}| \neq 0$.` },
    { id: "matrices-c24", type: "formula", front: "Determinants of the transpose and the inverse", back: String.raw`$|\mathbf{A}'| = |\mathbf{A}|$ and $|\mathbf{A}^{-1}| = 1/|\mathbf{A}|$`, why: String.raw`Past paper Q4(d): (v) is true; (vi) "$|\mathbf{A}| = |\mathbf{A}^{-1}|$ always" is wrong.` },

    // method
    { id: "matrices-c25", type: "method", front: String.raw`Can you add $\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix}$ and $\begin{pmatrix} 2 \\ 4 \\ 7 \end{pmatrix}$?`, back: String.raw`No: dimensions $2 \times 2$ and $3 \times 1$ do not agree.`, why: String.raw`Addition is element by element, so both matrices must have the same dimension (Example [4]).` },
    { id: "matrices-c26", type: "method", front: String.raw`Compute $2\mathbf{A} - \mathbf{B} + 4\mathbf{C}$ for Assignment 10's $\mathbf{A} = ${mA}$, $\mathbf{B} = \mathbf{C} = ${mB}$.`, back: String.raw`Scale each matrix, then add element by element: $\begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$.`, why: String.raw`$2\mathbf{A} = \begin{pmatrix} 2 & 4 \\ 10 & 2 \end{pmatrix}$, $-\mathbf{B} = \begin{pmatrix} 1 & 0 \\ -3 & -2 \end{pmatrix}$, $4\mathbf{C} = \begin{pmatrix} -4 & 0 \\ 12 & 8 \end{pmatrix}$; sum $\begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$.` },
    { id: "matrices-c27", type: "method", front: String.raw`$\mathbf{A} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}$, $\mathbf{B} = (4\ \ 3)$. Find $\mathbf{AB}$ and $\mathbf{BA}$.`, back: String.raw`$\mathbf{AB} = \begin{pmatrix} 4 & 3 \\ -2 & -1.5 \end{pmatrix}$ ($2 \times 2$); $\mathbf{BA} = 2.5$ ($1 \times 1$).`, why: String.raw`Check dimensions first: $(2 \times 1)(1 \times 2) = 2 \times 2$, $(1 \times 2)(2 \times 1) = 1 \times 1$.
$\mathbf{AB}$: each element is (row of $\mathbf{A}$)(column of $\mathbf{B}$), e.g. $(-0.5)(3) = -1.5$. $\mathbf{BA} = 4(1) + 3(-0.5) = 2.5$.` },
    { id: "matrices-c28", type: "method", front: String.raw`How do you multiply $\begin{pmatrix} 1 & 0 & 3 \\ 2 & 1 & 5 \end{pmatrix}\begin{pmatrix} 1 & 3 \\ 2 & 5 \\ 6 & 2 \end{pmatrix}$?`, back: String.raw`Row $i$ times column $j$ for each element: $\begin{pmatrix} 19 & 9 \\ 34 & 21 \end{pmatrix}$.`, why: String.raw`$(2 \times 3)(3 \times 2) = 2 \times 2$. $1+0+18 = 19$, $3+0+6 = 9$, $2+2+30 = 34$, $6+5+10 = 21$.` },
    { id: "matrices-c29", type: "method", front: String.raw`Verify the left distributive law for $\mathbf{A} = ${eA}$, $\mathbf{B} = ${eB}$, $\mathbf{C} = ${eC}$.`, back: String.raw`Compute both sides separately: each equals $\begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$.`, why: String.raw`$\mathbf{B} + \mathbf{C} = \begin{pmatrix} 1 & 0 \\ 5 & 3 \end{pmatrix}$, $\mathbf{A}(\mathbf{B}+\mathbf{C}) = \begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$.
$\mathbf{AB} = \begin{pmatrix} 6 & 3 \\ 3 & 2 \end{pmatrix}$, $\mathbf{AC} = \begin{pmatrix} 5 & 3 \\ 2 & 1 \end{pmatrix}$, sum $\begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$. ✓` },
    { id: "matrices-c30", type: "method", front: String.raw`Find $|\mathbf{A}|$ for $\mathbf{A} = \begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 1 & 0 & 2 \end{pmatrix}$.`, back: String.raw`Expand by cofactors along row 1: $|\mathbf{A}| = 1$.`, why: String.raw`$1\begin{vmatrix} 1 & 0 \\ 0 & 2 \end{vmatrix} - 2\begin{vmatrix} 0 & 0 \\ 1 & 2 \end{vmatrix} + 1\begin{vmatrix} 0 & 1 \\ 1 & 0 \end{vmatrix} = 2 - 0 - 1 = 1$.` },
    { id: "matrices-c31", type: "method", front: String.raw`Find $|\mathbf{D}|$ for $\mathbf{D} = ${mD}$ (Assignment 10 Q1(d)).`, back: String.raw`Cofactors along row 1 with signs $+,-,+$: $|\mathbf{D}| = 20$.`, why: String.raw`$-2(0\cdot1 - 1\cdot2) - 1(3\cdot1 - 1\cdot1) + 3(3\cdot2 - 0\cdot1) = 4 - 2 + 18 = 20$.` },
    { id: "matrices-c32", type: "method", front: String.raw`Find the inverse of $\begin{pmatrix} 1 & 1 \\ -1 & 2 \end{pmatrix}$.`, back: String.raw`$|\mathbf{A}| = 3$, so $\mathbf{A}^{-1} = \frac13\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$.`, why: String.raw`1. $ad - bc = 2 - (-1) = 3 \neq 0$.
2. Swap the diagonal (1 and 2), negate the off-diagonal ($1 \to -1$, $-1 \to 1$).
3. Divide by 3. Check: $\mathbf{AA}^{-1} = \mathbf{I}$.` },
    { id: "matrices-c33", type: "method", front: String.raw`Find $(\mathbf{A} + 2\mathbf{B})^{-1}$ where $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$.`, back: String.raw`Determinant $-27$; inverse $= \frac{1}{-27}\begin{pmatrix} 5 & -2 \\ -11 & -1 \end{pmatrix}$.`, why: String.raw`$|\cdot| = (-1)(5) - (2)(11) = -27 \neq 0$. Swap $-1 \leftrightarrow 5$, negate $2$ and $11$, divide by $-27$: $\begin{pmatrix} -5/27 & 2/27 \\ 11/27 & 1/27 \end{pmatrix}$.` },
    { id: "matrices-c34", type: "method", front: String.raw`Is a given square matrix idempotent? (Assignment 10 Q2)`, back: String.raw`Compute $\mathbf{AA}$; it is idempotent iff $\mathbf{AA} = \mathbf{A}$ in every element.`, why: String.raw`For $${mM}$, every element of $\mathbf{M}^2$ matches $\mathbf{M}$ (e.g. row 1, column 1: $4 + 2 - 4 = 2$), so yes. A single mismatched element is enough to say no.` },
    { id: "matrices-c35", type: "method", front: String.raw`Show $(\mathbf{ABCD})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$.`, back: String.raw`Group as $(\mathbf{ABC})\mathbf{D}$ and apply $(\mathbf{XY})' = \mathbf{Y}'\mathbf{X}'$ three times.`, why: String.raw`$(\mathbf{ABCD})^T = \mathbf{D}^T(\mathbf{ABC})^T = \mathbf{D}^T\mathbf{C}^T(\mathbf{AB})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$.` },
    { id: "matrices-c36", type: "method", front: String.raw`Show $\mathbf{A} = \mathbf{I} - \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ is symmetric and idempotent.`, back: String.raw`Symmetric: transpose with rule (d), using $(\mathbf{X}'\mathbf{X})' = \mathbf{X}'\mathbf{X}$. Idempotent: expand $(\mathbf{I} - \mathbf{P})^2$ and use $\mathbf{X}'\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1} = \mathbf{I}_n$.`, why: String.raw`Let $\mathbf{P} = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$.
$\mathbf{P}' = \mathbf{X}\big((\mathbf{X}'\mathbf{X})^{-1}\big)'\mathbf{X}' = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' = \mathbf{P}$, so $\mathbf{A}' = \mathbf{I} - \mathbf{P} = \mathbf{A}$.
$\mathbf{P}^2 = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{I}_n\mathbf{X}' = \mathbf{P}$, so $\mathbf{A}^2 = \mathbf{I} - 2\mathbf{P} + \mathbf{P}^2 = \mathbf{I} - \mathbf{P} = \mathbf{A}$.` },
    { id: "matrices-c37", type: "method", front: String.raw`Simplify $(\mathbf{AIA}^T\mathbf{A})^T$ when $\mathbf{A}$ is symmetric and idempotent.`, back: String.raw`$= \mathbf{A}^T$ (past paper Q4(d)(iii) is true).`, why: String.raw`$\mathbf{AI} = \mathbf{A}$, $\mathbf{A}^T = \mathbf{A}$, so $\mathbf{AIA}^T\mathbf{A} = \mathbf{AAA} = \mathbf{A}$ (idempotent twice). Transposing gives $\mathbf{A}^T$.` },
    { id: "matrices-c38", type: "method", front: String.raw`Past paper Q4(d): which TWO matrix statements are wrong?`, back: String.raw`(i) $\mathbf{ABCD} = \mathbf{CDAB}$ and (vi) $|\mathbf{A}| = |\mathbf{A}^{-1}|$.`, why: String.raw`(i) The associative law only regroups; it never reorders.
(vi) $|\mathbf{A}^{-1}| = 1/|\mathbf{A}|$; e.g. $|\mathbf{C}| = -2$ but $|\mathbf{C}^{-1}| = -\tfrac12$.
True: (ii) product transpose, (iii) $= \mathbf{A}^T$, (iv) identity square and symmetric, (v) $|\mathbf{A}^T| = |\mathbf{A}|$.` },
    { id: "matrices-c39", type: "method", front: String.raw`Find the dimensions of $\mathbf{X}'\mathbf{X}$ and $\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ when $\mathbf{X}$ is $m \times n$.`, back: String.raw`$\mathbf{X}'\mathbf{X}$ is $n \times n$; $\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ is $m \times m$.`, why: String.raw`$(n \times m)(m \times n) = n \times n$. Then $(m \times n)(n \times n)(n \times m) = m \times m$, so the $\mathbf{I}$ in Assignment 10 Q4 is $\mathbf{I}_m$.` },
  ],

  // ==================================================================== quiz
  quiz: [
    // 9.1 basics
    {
      id: "matrices-q1", kind: "mcq", sub: "Matrix basics",
      prompt: String.raw`What is the dimension of $\mathbf{C} = \begin{pmatrix} -1 & 2 \\ 8 & 5 \\ 7 & 6 \\ 1 & 1 \end{pmatrix}$?`,
      options: [String.raw`$4 \times 2$`, String.raw`$2 \times 4$`, String.raw`$8 \times 1$`, String.raw`$4 \times 4$`],
      answer: 0,
      explain: String.raw`Rows first, then columns: 4 rows and 2 columns, so $4 \times 2$.`,
    },
    {
      id: "matrices-q2", kind: "fill", sub: "Matrix basics",
      prompt: String.raw`For the same $\mathbf{C}$, the element $c_{32}$ = ____.`,
      answers: [["6"]],
      explain: String.raw`Row 3 is $(7, 6)$; column 2 of that row is 6.`,
    },
    {
      id: "matrices-q3", kind: "fill", sub: "Matrix basics",
      prompt: String.raw`A $3 \times 5$ matrix has ____ elements.`,
      answers: [["15"]],
      explain: String.raw`An $m \times n$ matrix has $mn = 3 \times 5 = 15$ elements.`,
    },
    {
      id: "matrices-q4", kind: "mcq", sub: "Matrix basics",
      prompt: String.raw`$\mathbf{b} = (4\ \ 0.5)$ is best described as`,
      options: ["a row vector", "a column vector", "a square matrix", "a scalar"],
      answer: 0,
      explain: String.raw`It has one row (it is $1 \times 2$), so it is a row vector.`,
    },
    // 9.1 addition & scalar
    {
      id: "matrices-q5", kind: "mcq", sub: "Addition & scalars",
      prompt: String.raw`$\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix} + \begin{pmatrix} 2 \\ 4 \\ 7 \end{pmatrix}$ equals`,
      options: [
        "It is undefined",
        String.raw`$\begin{pmatrix} 4 & 3 \\ 5 & 2 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 4 & 5 \\ 5 & 6 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 4 \\ 5 \\ 7 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`Addition needs the same dimension; $2 \times 2$ and $3 \times 1$ do not agree (Example [4]).`,
    },
    {
      id: "matrices-q6", kind: "fill", sub: "Addition & scalars",
      prompt: String.raw`$-\tfrac12\begin{pmatrix} 2 \\ 4 \\ 7 \end{pmatrix}$ has third element ____.`,
      answers: [["-3.5", "-7/2"]],
      explain: String.raw`Every element is multiplied by $-\tfrac12$: $-\tfrac12 \times 7 = -3.5$.`,
    },
    {
      id: "matrices-q7", kind: "mcq", sub: "Addition & scalars",
      prompt: String.raw`With $\mathbf{A} = ${mA}$ and $\mathbf{B} = \mathbf{C} = ${mB}$, what is $2\mathbf{A} - \mathbf{B} + 4\mathbf{C}$?`,
      options: [
        String.raw`$\begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} -3 & 4 \\ 13 & 4 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & 4 \\ 25 & 12 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} -1 & 4 \\ 19 & 6 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`$\begin{pmatrix} 2+1-4 & 4+0+0 \\ 10-3+12 & 2-2+8 \end{pmatrix} = \begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$. Remember to negate every element of $\mathbf{B}$.`,
    },
    {
      id: "matrices-q8", kind: "fill", sub: "Addition & scalars",
      prompt: String.raw`For the same matrices, the element in row 2, column 1 of $\mathbf{A} + 2\mathbf{B}$ is ____.`,
      answers: [["11"]],
      explain: String.raw`$a_{21} + 2b_{21} = 5 + 2(3) = 11$; $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$.`,
    },
    {
      id: "matrices-q9", kind: "mcq", sub: "Addition & scalars",
      prompt: String.raw`Which is **not** one of the rules for matrix addition and multiplication by scalars?`,
      options: [
        String.raw`$\alpha(\mathbf{A} + \mathbf{B}) = \alpha\mathbf{A} + \mathbf{B}$`,
        String.raw`$\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}$`,
        String.raw`$(\alpha + \beta)\mathbf{A} = \alpha\mathbf{A} + \beta\mathbf{A}$`,
        String.raw`$\mathbf{A} + (-\mathbf{A}) = \mathbf{0}$`,
      ],
      answer: 0,
      explain: String.raw`The correct rule is $\alpha(\mathbf{A} + \mathbf{B}) = \alpha\mathbf{A} + \alpha\mathbf{B}$: the scalar multiplies both matrices.`,
    },
    // 9.1 multiplication
    {
      id: "matrices-q10", kind: "mcq", sub: "Matrix multiplication",
      prompt: String.raw`If $\mathbf{P}$ is $2 \times 3$ and $\mathbf{Q}$ is $3 \times 2$, what is the dimension of $\mathbf{PQ}$?`,
      options: [String.raw`$2 \times 2$`, String.raw`$3 \times 3$`, String.raw`$2 \times 3$`, "It is not defined"],
      answer: 0,
      explain: String.raw`$(2 \times 3)(3 \times 2)$: inner 3s match, outer numbers give $2 \times 2$. ($\mathbf{QP}$ would be $3 \times 3$.)`,
    },
    {
      id: "matrices-q11", kind: "fill", sub: "Matrix multiplication",
      prompt: String.raw`For $\mathbf{A} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}$ and $\mathbf{B} = (4\ \ 3)$, $\mathbf{BA}$ = ____.`,
      answers: [["2.5", "5/2"]],
      explain: String.raw`$\mathbf{BA}$ is $(1 \times 2)(2 \times 1) = 1 \times 1$: $4(1) + 3(-0.5) = 2.5$ (Example [8]).`,
    },
    {
      id: "matrices-q12", kind: "mcq", sub: "Matrix multiplication",
      prompt: String.raw`For the same $\mathbf{A} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}$, $\mathbf{B} = (4\ \ 3)$, what is $\mathbf{AB}$?`,
      options: [
        String.raw`$\begin{pmatrix} 4 & 3 \\ -2 & -1.5 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 4 & -2 \\ 3 & -1.5 \end{pmatrix}$`,
        "2.5",
        "It is undefined",
      ],
      answer: 0,
      explain: String.raw`$(2 \times 1)(1 \times 2) = 2 \times 2$; element $(i,j)$ = $a_{i1}b_{1j}$: row 1 $(4, 3)$, row 2 $(-2, -1.5)$.`,
    },
    {
      id: "matrices-q13", kind: "fill", sub: "Matrix multiplication",
      prompt: String.raw`In $\begin{pmatrix} 1 & 0 & 3 \\ 2 & 1 & 5 \end{pmatrix}\begin{pmatrix} 1 & 3 \\ 2 & 5 \\ 6 & 2 \end{pmatrix}$, the element in row 2, column 1 is ____.`,
      answers: [["34"]],
      explain: String.raw`Row 2 $(2, 1, 5)$ times column 1 $(1, 2, 6)$: $2 + 2 + 30 = 34$ (Example [9]).`,
    },
    {
      id: "matrices-q14", kind: "fill", sub: "Matrix multiplication",
      prompt: String.raw`With $\mathbf{A} = ${mA}$ and $\mathbf{B} = ${mB}$, the element in row 1, column 1 of $\mathbf{AB}$ is ____.`,
      answers: [["5"]],
      explain: String.raw`$(1)(-1) + (2)(3) = 5$.`,
    },
    {
      id: "matrices-q15", kind: "mcq", sub: "Matrix multiplication",
      prompt: String.raw`$\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 7 & 1 \end{pmatrix} = \begin{pmatrix} 23 & 3 \\ 15 & 2 \end{pmatrix}$ while the product in the other order is $\begin{pmatrix} 2 & 3 \\ 15 & 23 \end{pmatrix}$. This shows`,
      options: [
        String.raw`in general $\mathbf{AB} \neq \mathbf{BA}$`,
        "the associative law fails",
        "the distributive law fails",
        "one of the products was computed wrongly",
      ],
      answer: 0,
      explain: String.raw`Matrix multiplication is not commutative, so the order of factors matters. The associative and distributive laws always hold when dimensions are compatible.`,
    },
    {
      id: "matrices-q16", kind: "mcq", sub: "Matrix multiplication",
      prompt: "Which equation is guaranteed by the associative law (whenever the products are defined)?",
      options: [
        String.raw`$\mathbf{ABCD} = (\mathbf{AB})(\mathbf{CD})$`,
        String.raw`$\mathbf{ABCD} = \mathbf{CDAB}$`,
        String.raw`$\mathbf{AB} = \mathbf{BA}$`,
        String.raw`$\mathbf{ABCD} = \mathbf{DCBA}$`,
      ],
      answer: 0,
      explain: String.raw`The associative law regroups without reordering: $\mathbf{ABCD} = (\mathbf{AB})(\mathbf{CD})$. Reordering is not allowed — past paper Q4(d)(i) is wrong.`,
    },
    {
      id: "matrices-q17", kind: "mcq", sub: "Matrix multiplication",
      prompt: String.raw`Which is the right distributive law?`,
      options: [
        String.raw`$(\mathbf{A} + \mathbf{B})\mathbf{C} = \mathbf{AC} + \mathbf{BC}$`,
        String.raw`$(\mathbf{A} + \mathbf{B})\mathbf{C} = \mathbf{CA} + \mathbf{CB}$`,
        String.raw`$\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{BA} + \mathbf{CA}$`,
        String.raw`$(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$`,
      ],
      answer: 0,
      explain: String.raw`$\mathbf{C}$ stays on the right: $(\mathbf{A} + \mathbf{B})\mathbf{C} = \mathbf{AC} + \mathbf{BC}$. The left law is $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{AB} + \mathbf{AC}$; the last option is the associative law.`,
    },
    {
      id: "matrices-q18", kind: "fill", sub: "Matrix multiplication",
      prompt: String.raw`For $\mathbf{A} = ${eA}$, $\mathbf{B} = ${eB}$, $\mathbf{C} = ${eC}$, the element in row 1, column 1 of $(\mathbf{AB})\mathbf{C}$ is ____.`,
      answers: [["12"]],
      explain: String.raw`$\mathbf{AB} = \begin{pmatrix} 6 & 3 \\ 3 & 2 \end{pmatrix}$; row 1 times column 1 of $\mathbf{C}$: $6(1) + 3(2) = 12$. $\mathbf{A}(\mathbf{BC})$ gives the same 12 (Exercise [11]).`,
    },
    // 9.2 transpose
    {
      id: "matrices-q19", kind: "mcq", sub: "Transpose",
      prompt: String.raw`What is $\mathbf{A}^T$ for $\mathbf{A} = ${mA}$?`,
      options: [
        String.raw`$\begin{pmatrix} 1 & 5 \\ 2 & 1 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & 2 \\ 5 & 1 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & -2 \\ -5 & 1 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 2 & 1 \\ 1 & 5 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`Row 1 $(1, 2)$ becomes column 1 and row 2 $(5, 1)$ becomes column 2.`,
    },
    {
      id: "matrices-q20", kind: "fill", sub: "Transpose",
      prompt: String.raw`If $\mathbf{B} = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$, the element in row 1, column 3 of $\mathbf{B}'$ is ____.`,
      answers: [["7"]],
      explain: String.raw`$(\mathbf{B}')_{13} = b_{31} = 7$. In full, $\mathbf{B}' = \begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix}$.`,
    },
    {
      id: "matrices-q21", kind: "mcq", sub: "Transpose",
      prompt: String.raw`If $\mathbf{A}$ is $2 \times 5$, what is the dimension of $\mathbf{A}'$?`,
      options: [String.raw`$5 \times 2$`, String.raw`$2 \times 5$`, String.raw`$5 \times 5$`, String.raw`$2 \times 2$`],
      answer: 0,
      explain: String.raw`The transpose of an $m \times n$ matrix is $n \times m$.`,
    },
    {
      id: "matrices-q22", kind: "mcq", sub: "Transpose",
      prompt: String.raw`Which is always equal to $(\mathbf{AB})'$?`,
      options: [String.raw`$\mathbf{B}'\mathbf{A}'$`, String.raw`$\mathbf{A}'\mathbf{B}'$`, String.raw`$\mathbf{BA}$`, String.raw`$\mathbf{AB}$`],
      answer: 0,
      explain: String.raw`Rule (d): transpose each factor and reverse the order. ($\mathbf{A}'\mathbf{B}'$ may not even be defined.)`,
    },
    {
      id: "matrices-q23", kind: "mcq", sub: "Transpose",
      prompt: String.raw`$(\mathbf{ABCD})^T$ equals`,
      options: [
        String.raw`$\mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$`,
        String.raw`$\mathbf{A}^T\mathbf{B}^T\mathbf{C}^T\mathbf{D}^T$`,
        String.raw`$\mathbf{D}^T\mathbf{B}^T\mathbf{C}^T\mathbf{A}^T$`,
        String.raw`$\mathbf{DCBA}$`,
      ],
      answer: 0,
      explain: String.raw`Apply $(\mathbf{XY})^T = \mathbf{Y}^T\mathbf{X}^T$ repeatedly (Assignment 10 Q3).`,
    },
    {
      id: "matrices-q24", kind: "fill", sub: "Transpose",
      prompt: String.raw`For $\mathbf{A} = ${mA}$, the element in row 1, column 2 of $\mathbf{A}^T + \mathbf{A}$ is ____.`,
      answers: [["7"]],
      explain: String.raw`$\begin{pmatrix} 1 & 5 \\ 2 & 1 \end{pmatrix} + \begin{pmatrix} 1 & 2 \\ 5 & 1 \end{pmatrix} = \begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$.`,
    },
    {
      id: "matrices-q25", kind: "mcq", sub: "Transpose",
      prompt: "Which matrix is symmetric?",
      options: [
        String.raw`$\begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & 2 \\ 5 & 1 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & 0 & 2 \\ -1 & 3 & 1 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} -1 & 0 \\ 3 & 2 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`Symmetric means square with $a_{ij} = a_{ji}$; only the first has $a_{12} = a_{21}$. The $2 \times 3$ matrix is not even square.`,
    },
    {
      id: "matrices-q26", kind: "mcq", sub: "Transpose",
      prompt: String.raw`Which statement about the identity matrix $\mathbf{I}_n$ is **false**?`,
      options: [
        String.raw`$\mathbf{I}_n$ can be a $2 \times 3$ matrix`,
        String.raw`$\mathbf{I}_n$ is symmetric`,
        String.raw`$\mathbf{I}_n\mathbf{B} = \mathbf{B}\mathbf{I}_n = \mathbf{B}$ for any $n \times n$ matrix $\mathbf{B}$`,
        String.raw`$\mathbf{I}_n\mathbf{I}_n = \mathbf{I}_n$`,
      ],
      answer: 0,
      explain: String.raw`An identity matrix is always square and symmetric (past paper Q4(d)(iv) is true), and $\mathbf{II} = \mathbf{I}$.`,
    },
    // 9.3 determinants
    {
      id: "matrices-q27", kind: "fill", sub: "Determinants",
      prompt: String.raw`$\begin{vmatrix} 4 & 1 \\ 3 & 2 \end{vmatrix}$ = ____.`,
      answers: [["5"]],
      explain: String.raw`Diagonal product minus off-diagonal product: $4 \times 2 - 1 \times 3 = 5$ (Example [14]).`,
    },
    {
      id: "matrices-q28", kind: "mcq", sub: "Determinants",
      prompt: String.raw`$\begin{vmatrix} a & y \\ x & b \end{vmatrix}$ equals`,
      options: [String.raw`$ab - xy$`, String.raw`$xy - ab$`, String.raw`$ay - xb$`, String.raw`$ab + xy$`],
      answer: 0,
      explain: String.raw`Diagonal $a \cdot b$ minus off-diagonal $y \cdot x$: $ab - xy$ (Example [15]).`,
    },
    {
      id: "matrices-q29", kind: "fill", sub: "Determinants",
      prompt: String.raw`$|(\mathbf{A} + 2\mathbf{B})^T|$, where $(\mathbf{A} + 2\mathbf{B})^T = \begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$, is ____.`,
      answers: [["-27"]],
      explain: String.raw`$(-1)(5) - (11)(2) = -27$ (Assignment 10 Q1(c)).`,
    },
    {
      id: "matrices-q30", kind: "fill", sub: "Determinants",
      prompt: String.raw`$|\mathbf{A}|$ for $\mathbf{A} = \begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 1 & 0 & 2 \end{pmatrix}$ is ____.`,
      answers: [["1"]],
      explain: String.raw`$1(1 \cdot 2 - 0) - 2(0 \cdot 2 - 0 \cdot 1) + 1(0 \cdot 0 - 1 \cdot 1) = 2 - 0 - 1 = 1$ (Example [16]).`,
    },
    {
      id: "matrices-q31", kind: "fill", sub: "Determinants",
      prompt: String.raw`$|\mathbf{D}|$ for $\mathbf{D} = ${mD}$ is ____.`,
      answers: [["20"]],
      explain: String.raw`$-2(0 - 2) - 1(3 - 1) + 3(6 - 0) = 4 - 2 + 18 = 20$ (Assignment 10 Q1(d)).`,
    },
    {
      id: "matrices-q32", kind: "mcq", sub: "Determinants",
      prompt: String.raw`If $|\mathbf{A}| = -27$, what is $|\mathbf{A}'|$?`,
      options: ["−27", "27", "−1/27", "It cannot be determined"],
      answer: 0,
      explain: String.raw`$|\mathbf{A}'| = |\mathbf{A}|$ always (past paper Q4(d)(v) is true).`,
    },
    // 9.4 inverse
    {
      id: "matrices-q33", kind: "mcq", sub: "Inverse",
      prompt: String.raw`What is the inverse of $\begin{pmatrix} 1 & 1 \\ -1 & 2 \end{pmatrix}$?`,
      options: [
        String.raw`$\frac13\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$`,
        String.raw`$\frac11\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$`,
        String.raw`$\frac13\begin{pmatrix} 2 & 1 \\ -1 & 1 \end{pmatrix}$`,
        String.raw`$\frac13\begin{pmatrix} 1 & -1 \\ 1 & 2 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`$|\mathbf{A}| = 2 - (-1) = 3$ (not $2 - 1$). Swap diagonal, negate off-diagonal: $\frac13\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$ (Example [17]).`,
    },
    {
      id: "matrices-q34", kind: "mcq", sub: "Inverse",
      prompt: String.raw`What is $\mathbf{C}^{-1}$ for $\mathbf{C} = ${mB}$?`,
      options: [
        String.raw`$\begin{pmatrix} -1 & 0 \\ \tfrac32 & \tfrac12 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & 0 \\ -\tfrac32 & -\tfrac12 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} -1 & 0 \\ \tfrac13 & \tfrac12 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} -1 & 0 \\ -\tfrac32 & \tfrac12 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`$|\mathbf{C}| = -2$; $\mathbf{C}^{-1} = \frac{1}{-2}\begin{pmatrix} 2 & 0 \\ -3 & -1 \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ \tfrac32 & \tfrac12 \end{pmatrix}$.`,
    },
    {
      id: "matrices-q35", kind: "fill", sub: "Inverse",
      prompt: String.raw`$(\mathbf{A} + 2\mathbf{B})^{-1}$ with $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$ has row 2, column 1 element ____ (fraction or 2 d.p.).`,
      answers: [["11/27", "0.41"]],
      explain: String.raw`$\frac{1}{-27}\begin{pmatrix} 5 & -2 \\ -11 & -1 \end{pmatrix}$: the $(2,1)$ element is $\frac{-11}{-27} = \frac{11}{27} \approx 0.41$.`,
    },
    {
      id: "matrices-q36", kind: "mcq", sub: "Inverse",
      prompt: String.raw`A $2 \times 2$ matrix has an inverse exactly when`,
      options: ["its determinant is not 0", "it is symmetric", "its determinant is positive", "all its elements are non-zero"],
      answer: 0,
      explain: String.raw`The formula divides by $ad - bc$, so we need $|\mathbf{A}| \neq 0$. A negative determinant is fine.`,
    },
    {
      id: "matrices-q37", kind: "fill", sub: "Inverse",
      prompt: String.raw`If $|\mathbf{A}| = 4$, then $|\mathbf{A}^{-1}|$ = ____.`,
      answers: [["0.25", "1/4"]],
      explain: String.raw`$|\mathbf{A}^{-1}| = 1/|\mathbf{A}| = 1/4$, not 4 — which is why past paper Q4(d)(vi) is wrong.`,
    },
    {
      id: "matrices-q38", kind: "mcq", sub: "Idempotent matrices",
      prompt: "Which matrix is idempotent?",
      options: [
        String.raw`$\begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$`,
        String.raw`$\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$`,
      ],
      answer: 0,
      explain: String.raw`$\begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix}^2 = \begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix}$ ✓. The others square to $4\mathbf{I}$, $\mathbf{I}$ and $\begin{pmatrix} 1 & 4 \\ 0 & 1 \end{pmatrix}$.`,
    },
    {
      id: "matrices-q39", kind: "mcq", sub: "Idempotent matrices",
      prompt: String.raw`If $\mathbf{A}$ is symmetric and idempotent, $\mathbf{AIA}^T\mathbf{A}$ simplifies to`,
      options: [String.raw`$\mathbf{A}$`, String.raw`$\mathbf{I}$`, String.raw`$\mathbf{A}^3$ but no further`, String.raw`$\mathbf{A}^{-1}$`],
      answer: 0,
      explain: String.raw`$\mathbf{AI} = \mathbf{A}$ and $\mathbf{A}^T = \mathbf{A}$, so it is $\mathbf{AAA} = (\mathbf{AA})\mathbf{A} = \mathbf{AA} = \mathbf{A}$.`,
    },
    {
      id: "matrices-q40", kind: "fill", sub: "Idempotent matrices",
      prompt: String.raw`If $\mathbf{X}$ is a $5 \times 3$ matrix, then $\mathbf{X}'\mathbf{X}$ is a ____ × ____ matrix.`,
      answers: [["3"], ["3"]],
      explain: String.raw`$\mathbf{X}'$ is $3 \times 5$, so $\mathbf{X}'\mathbf{X}$ is $(3 \times 5)(5 \times 3) = 3 \times 3$.`,
    },
  ],

  // ==================================================================== exam
  exam: [
    {
      id: "matrices-x1", kind: "calc", sub: "Matrix operations",
      prompt: String.raw`Let $\mathbf{A} = ${mA}$, $\mathbf{B} = ${mB}$ and $\mathbf{C} = ${mB}$. Compute (i) $2\mathbf{A} - \mathbf{B} + 4\mathbf{C}$, (ii) $\mathbf{A} + 2\mathbf{B}$, (iii) $\mathbf{A}^T + \mathbf{A}$ and (iv) $(\mathbf{A} + 2\mathbf{B})^T$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) correct scalar multiples and sum $\begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$`, marks: 1.5 },
        { point: String.raw`(ii) $\begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$`, marks: 1 },
        { point: String.raw`(iii) correct transpose and $\begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$`, marks: 1.5 },
        { point: String.raw`(iv) $\begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$`, marks: 1 },
      ],
      model: String.raw`(i) $2\mathbf{A} = \begin{pmatrix} 2 & 4 \\ 10 & 2 \end{pmatrix}$, $-\mathbf{B} = \begin{pmatrix} 1 & 0 \\ -3 & -2 \end{pmatrix}$, $4\mathbf{C} = \begin{pmatrix} -4 & 0 \\ 12 & 8 \end{pmatrix}$, so $2\mathbf{A} - \mathbf{B} + 4\mathbf{C} = \begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$.
(ii) $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} 1 - 2 & 2 + 0 \\ 5 + 6 & 1 + 4 \end{pmatrix} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$.
(iii) $\mathbf{A}^T = \begin{pmatrix} 1 & 5 \\ 2 & 1 \end{pmatrix}$, so $\mathbf{A}^T + \mathbf{A} = \begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$ (symmetric, as it must be).
(iv) $(\mathbf{A} + 2\mathbf{B})^T = \begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$.`,
      answer: String.raw`$\begin{pmatrix} -1 & 4 \\ 19 & 8 \end{pmatrix}$, $\begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$, $\begin{pmatrix} 2 & 7 \\ 7 & 2 \end{pmatrix}$, $\begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$`,
      source: "Assignment 10 Q1(a)–(b)",
    },
    {
      id: "matrices-x2", kind: "calc", sub: "Determinants & inverses",
      prompt: String.raw`With $\mathbf{A} = ${mA}$, $\mathbf{B} = \mathbf{C} = ${mB}$, find (i) $|(\mathbf{A} + 2\mathbf{B})^T|$, (ii) $\mathbf{C}^{-1}$ and (iii) $(\mathbf{A} + 2\mathbf{B})^{-1}$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $(\mathbf{A} + 2\mathbf{B})^T$ correct and determinant $-27$`, marks: 1.5 },
        { point: String.raw`(ii) $|\mathbf{C}| = -2$ and $\mathbf{C}^{-1} = \begin{pmatrix} -1 & 0 \\ 3/2 & 1/2 \end{pmatrix}$`, marks: 1.5 },
        { point: String.raw`(iii) correct use of the $2 \times 2$ inverse formula`, marks: 1 },
        { point: String.raw`(iii) $\frac{1}{27}\begin{pmatrix} -5 & 2 \\ 11 & 1 \end{pmatrix}$`, marks: 1 },
      ],
      model: String.raw`(i) $\mathbf{A} + 2\mathbf{B} = \begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}$, so $(\mathbf{A} + 2\mathbf{B})^T = \begin{pmatrix} -1 & 11 \\ 2 & 5 \end{pmatrix}$ and $|(\mathbf{A} + 2\mathbf{B})^T| = (-1)(5) - (11)(2) = -27$.
(ii) $|\mathbf{C}| = (-1)(2) - (0)(3) = -2 \neq 0$. $\mathbf{C}^{-1} = \frac{1}{-2}\begin{pmatrix} 2 & 0 \\ -3 & -1 \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 3/2 & 1/2 \end{pmatrix}$. Check: $\begin{pmatrix} -1 & 0 \\ 3 & 2 \end{pmatrix}\begin{pmatrix} -1 & 0 \\ 3/2 & 1/2 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.
(iii) $|\mathbf{A} + 2\mathbf{B}| = -27$, so $(\mathbf{A} + 2\mathbf{B})^{-1} = \frac{1}{-27}\begin{pmatrix} 5 & -2 \\ -11 & -1 \end{pmatrix} = \begin{pmatrix} -5/27 & 2/27 \\ 11/27 & 1/27 \end{pmatrix}$. Check: $\begin{pmatrix} -1 & 2 \\ 11 & 5 \end{pmatrix}\begin{pmatrix} -5 & 2 \\ 11 & 1 \end{pmatrix} = \begin{pmatrix} 27 & 0 \\ 0 & 27 \end{pmatrix}$, divided by 27 gives $\mathbf{I}$.`,
      answer: String.raw`$-27$; $\mathbf{C}^{-1} = \begin{pmatrix} -1 & 0 \\ 3/2 & 1/2 \end{pmatrix}$; $(\mathbf{A}+2\mathbf{B})^{-1} = \frac{1}{27}\begin{pmatrix} -5 & 2 \\ 11 & 1 \end{pmatrix}$`,
      source: "Assignment 10 Q1(c), (e)",
    },
    {
      id: "matrices-x3", kind: "calc", sub: "Determinants",
      prompt: String.raw`Compute $|\mathbf{D}|$ for $\mathbf{D} = ${mD}$, and hence write down $|\mathbf{D}^T|$.`,
      marks: 5,
      rubric: [
        { point: "Correct cofactor expansion set-up with signs +, −, +", marks: 2 },
        { point: String.raw`Correct $2 \times 2$ minors $-2$, $2$, $6$`, marks: 1.5 },
        { point: String.raw`$|\mathbf{D}| = 20$ and $|\mathbf{D}^T| = 20$`, marks: 1.5 },
      ],
      model: String.raw`Expand along the first row:
$|\mathbf{D}| = -2\begin{vmatrix} 0 & 1 \\ 2 & 1 \end{vmatrix} - 1\begin{vmatrix} 3 & 1 \\ 1 & 1 \end{vmatrix} + 3\begin{vmatrix} 3 & 0 \\ 1 & 2 \end{vmatrix} = -2(0 - 2) - 1(3 - 1) + 3(6 - 0) = 4 - 2 + 18 = 20$.
Since $|\mathbf{D}^T| = |\mathbf{D}|$, $|\mathbf{D}^T| = 20$.`,
      answer: String.raw`$|\mathbf{D}| = |\mathbf{D}^T| = 20$`,
      source: "Assignment 10 Q1(d)",
    },
    {
      id: "matrices-x4", kind: "proof", sub: "Idempotent matrices",
      prompt: String.raw`A square matrix $\mathbf{A}$ is idempotent if $\mathbf{A}^2 = \mathbf{A}$, where $\mathbf{A}^2 = \mathbf{AA}$. Is $\mathbf{M} = ${mM}$ idempotent? Justify your answer.`,
      marks: 5,
      rubric: [
        { point: String.raw`States the test: compute $\mathbf{MM}$ and compare with $\mathbf{M}$`, marks: 1 },
        { point: String.raw`Correct rows of $\mathbf{M}^2$ (1 mark per row)`, marks: 3 },
        { point: String.raw`Concludes $\mathbf{M}^2 = \mathbf{M}$, so $\mathbf{M}$ is idempotent`, marks: 1 },
      ],
      model: String.raw`Compute $\mathbf{M}^2 = \mathbf{MM}$ (row of first × column of second):
Row 1: $4 + 2 - 4 = 2$, $\;-4 - 6 + 8 = -2$, $\;-8 - 8 + 12 = -4$.
Row 2: $-2 - 3 + 4 = -1$, $\;2 + 9 - 8 = 3$, $\;4 + 12 - 12 = 4$.
Row 3: $2 + 2 - 3 = 1$, $\;-2 - 6 + 6 = -2$, $\;-4 - 8 + 9 = -3$.
$\mathbf{M}^2 = ${mM} = \mathbf{M}$, so **$\mathbf{M}$ is idempotent**.`,
      answer: String.raw`Yes: $\mathbf{M}^2 = \mathbf{M}$`,
      source: "Assignment 10 Q2",
    },
    {
      id: "matrices-x5", kind: "proof", sub: "Transpose",
      prompt: String.raw`Show that $(\mathbf{ABCD})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$, where the products are defined.`,
      marks: 5,
      rubric: [
        { point: String.raw`States $(\mathbf{XY})^T = \mathbf{Y}^T\mathbf{X}^T$ and groups with the associative law`, marks: 2 },
        { point: String.raw`Applies the rule step by step (three applications)`, marks: 2 },
        { point: "Reaches the required result clearly", marks: 1 },
      ],
      model: String.raw`By rule (d) of transposition, $(\mathbf{XY})^T = \mathbf{Y}^T\mathbf{X}^T$. By the associative law, $\mathbf{ABCD} = (\mathbf{ABC})\mathbf{D}$, so
$(\mathbf{ABCD})^T = \mathbf{D}^T(\mathbf{ABC})^T$.
Again, $\mathbf{ABC} = (\mathbf{AB})\mathbf{C}$, so $(\mathbf{ABC})^T = \mathbf{C}^T(\mathbf{AB})^T$.
Finally $(\mathbf{AB})^T = \mathbf{B}^T\mathbf{A}^T$.
Hence $(\mathbf{ABCD})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$. $\blacksquare$`,
      answer: String.raw`Apply $(\mathbf{XY})^T = \mathbf{Y}^T\mathbf{X}^T$ three times`,
      source: "Assignment 10 Q3",
    },
    {
      id: "matrices-x6", kind: "proof", sub: "Symmetric & idempotent",
      prompt: String.raw`Let $\mathbf{A} = \mathbf{I} - \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$, where $\mathbf{X}$ is an $m \times n$ matrix and $\mathbf{X}'\mathbf{X}$ is invertible. Show that $\mathbf{A}$ is symmetric and idempotent. [Hint: for any $n \times n$ matrix $\mathbf{B}$, $\mathbf{I}_n\mathbf{B} = \mathbf{B}\mathbf{I}_n = \mathbf{B}$; a matrix is symmetric if $a_{ij} = a_{ji}$ for all $i, j$.]`,
      marks: 5,
      rubric: [
        { point: String.raw`Shows $\mathbf{X}'\mathbf{X}$ and its inverse are symmetric`, marks: 1 },
        { point: String.raw`Transposes $\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ correctly (reversed order) to get $\mathbf{A}' = \mathbf{A}$`, marks: 1.5 },
        { point: String.raw`Shows $\mathbf{P}^2 = \mathbf{P}$ using $\mathbf{X}'\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1} = \mathbf{I}_n$`, marks: 1.5 },
        { point: String.raw`Expands $(\mathbf{I} - \mathbf{P})^2 = \mathbf{I} - \mathbf{P}$ to conclude idempotent`, marks: 1 },
      ],
      model: String.raw`Let $\mathbf{P} = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$, an $m \times m$ matrix, so $\mathbf{A} = \mathbf{I}_m - \mathbf{P}$.
**Symmetric.** $(\mathbf{X}'\mathbf{X})' = \mathbf{X}'(\mathbf{X}')' = \mathbf{X}'\mathbf{X}$, so $\mathbf{X}'\mathbf{X}$ is symmetric. Its inverse is symmetric too: $\big((\mathbf{X}'\mathbf{X})^{-1}\big)'(\mathbf{X}'\mathbf{X})' = \big((\mathbf{X}'\mathbf{X})(\mathbf{X}'\mathbf{X})^{-1}\big)' = \mathbf{I}' = \mathbf{I}$, hence $\big((\mathbf{X}'\mathbf{X})^{-1}\big)' = \big((\mathbf{X}'\mathbf{X})'\big)^{-1} = (\mathbf{X}'\mathbf{X})^{-1}$.
Then $\mathbf{P}' = (\mathbf{X}')'\big((\mathbf{X}'\mathbf{X})^{-1}\big)'\mathbf{X}' = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' = \mathbf{P}$, and $\mathbf{A}' = \mathbf{I}' - \mathbf{P}' = \mathbf{I} - \mathbf{P} = \mathbf{A}$.
**Idempotent.** $\mathbf{P}^2 = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}' = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{I}_n\mathbf{X}' = \mathbf{P}$.
So $\mathbf{A}^2 = (\mathbf{I} - \mathbf{P})(\mathbf{I} - \mathbf{P}) = \mathbf{I} - \mathbf{P} - \mathbf{P} + \mathbf{P}^2 = \mathbf{I} - 2\mathbf{P} + \mathbf{P} = \mathbf{I} - \mathbf{P} = \mathbf{A}$. $\blacksquare$`,
      answer: String.raw`$\mathbf{A}' = \mathbf{A}$ and $\mathbf{A}^2 = \mathbf{A}$`,
      source: "Assignment 10 Q4",
    },
    {
      id: "matrices-x7", kind: "select", sub: "Matrix properties",
      prompt: "Which TWO of the following statements are wrong? Write down the Roman numerals only.",
      statements: [
        String.raw`Consider the matrices $\mathbf{A}, \mathbf{B}, \mathbf{C}$ and $\mathbf{D}$. According to the associative law, $\mathbf{ABCD} = \mathbf{CDAB}$.`,
        String.raw`For the matrices $\mathbf{A}, \mathbf{B}, \mathbf{C}$ and $\mathbf{D}$, it is always true that $(\mathbf{ABCD})^T = \mathbf{D}^T\mathbf{C}^T\mathbf{B}^T\mathbf{A}^T$.`,
        String.raw`If the matrix $\mathbf{A}$ is symmetric and idempotent, then $(\mathbf{AIA}^T\mathbf{A})^T = \mathbf{A}^T$.`,
        String.raw`An identity matrix $\mathbf{I}$ must be a square and symmetric matrix.`,
        String.raw`The determinant of the matrix $\mathbf{A}$ is always equal to the determinant of $\mathbf{A}^T$.`,
        String.raw`The determinant of the matrix $\mathbf{A}$ is always equal to the determinant of $\mathbf{A}^{-1}$.`,
      ],
      wrong: [0, 5],
      marks: 5,
      rubric: [
        { point: "Identifies (i) as wrong", marks: 2.5 },
        { point: "Identifies (vi) as wrong", marks: 2.5 },
      ],
      model: String.raw`**(i) is wrong.** The associative law $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$ only allows regrouping, never reordering. Matrix multiplication is not commutative (e.g. $\mathbf{AB} \neq \mathbf{BA}$ for Assignment 10's $\mathbf{A}, \mathbf{B}$), so $\mathbf{ABCD} \neq \mathbf{CDAB}$ in general.
**(vi) is wrong.** $|\mathbf{A}^{-1}| = 1/|\mathbf{A}|$. E.g. $\mathbf{C} = \begin{pmatrix} -1 & 0 \\ 3 & 2 \end{pmatrix}$ has $|\mathbf{C}| = -2$ but $|\mathbf{C}^{-1}| = -1/2$.
The others are true: (ii) apply $(\mathbf{XY})^T = \mathbf{Y}^T\mathbf{X}^T$ repeatedly; (iii) $\mathbf{AIA}^T\mathbf{A} = \mathbf{AAA} = \mathbf{A}$, so its transpose is $\mathbf{A}^T$; (iv) $\mathbf{I}$ is $n \times n$ with $a_{ij} = a_{ji}$; (v) $|\mathbf{A}^T| = |\mathbf{A}|$.`,
      answer: "(i) and (vi)",
      source: "Past paper Q4(d)",
    },
    {
      id: "matrices-x8", kind: "select", sub: "Matrix properties",
      prompt: "Which TWO of the following statements are wrong? Write down the Roman numerals only.",
      statements: [
        String.raw`If $\mathbf{A}$ is $2 \times 3$ and $\mathbf{B}$ is $3 \times 2$, then $\mathbf{AB}$ is a $2 \times 2$ matrix.`,
        String.raw`For any two square matrices $\mathbf{A}$ and $\mathbf{B}$ of the same dimension, $\mathbf{AB} = \mathbf{BA}$.`,
        String.raw`$(\mathbf{A} + \mathbf{B})' = \mathbf{A}' + \mathbf{B}'$ for matrices of the same dimension.`,
        String.raw`If $|\mathbf{A}| = 0$, then the $2 \times 2$ matrix $\mathbf{A}$ has no inverse.`,
        String.raw`If $\mathbf{A}$ is idempotent, then $\mathbf{A}^3 = \mathbf{A}$.`,
        String.raw`The transpose of a $2 \times 3$ matrix is also a $2 \times 3$ matrix.`,
      ],
      wrong: [1, 5],
      marks: 5,
      rubric: [
        { point: "Identifies (ii) as wrong", marks: 2.5 },
        { point: "Identifies (vi) as wrong", marks: 2.5 },
      ],
      model: String.raw`**(ii) is wrong.** Matrix multiplication is not commutative: $\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 7 & 1 \end{pmatrix} = \begin{pmatrix} 23 & 3 \\ 15 & 2 \end{pmatrix}$ but $\begin{pmatrix} 1 & 0 \\ 7 & 1 \end{pmatrix}\begin{pmatrix} 2 & 3 \\ 1 & 2 \end{pmatrix} = \begin{pmatrix} 2 & 3 \\ 15 & 23 \end{pmatrix}$.
**(vi) is wrong.** The transpose of an $m \times n$ matrix is $n \times m$, so a $2 \times 3$ matrix has a $3 \times 2$ transpose.
True: (i) $(2 \times 3)(3 \times 2) = 2 \times 2$; (iii) rule (b) of transposition; (iv) the inverse formula divides by $|\mathbf{A}|$; (v) $\mathbf{A}^3 = \mathbf{A}^2\mathbf{A} = \mathbf{AA} = \mathbf{A}$.`,
      answer: "(ii) and (vi)",
      source: "Modelled on past paper Q4(d)",
    },
    {
      id: "matrices-x9", kind: "calc", sub: "Matrix multiplication",
      prompt: String.raw`Let $\mathbf{A} = \begin{pmatrix} 1 \\ -0.5 \end{pmatrix}$ and $\mathbf{B} = (4\ \ 3)$. (i) State the dimensions of $\mathbf{AB}$ and $\mathbf{BA}$. (ii) Compute $\mathbf{AB}$ and $\mathbf{BA}$. (iii) Compute $\begin{pmatrix} 1 & 0 & 3 \\ 2 & 1 & 5 \end{pmatrix}\begin{pmatrix} 1 & 3 \\ 2 & 5 \\ 6 & 2 \end{pmatrix}$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) $\mathbf{AB}$ is $2 \times 2$, $\mathbf{BA}$ is $1 \times 1$, with reasoning $(m \times n)(n \times p)$`, marks: 1 },
        { point: String.raw`(ii) $\mathbf{AB} = \begin{pmatrix} 4 & 3 \\ -2 & -1.5 \end{pmatrix}$ and $\mathbf{BA} = 2.5$`, marks: 2 },
        { point: String.raw`(iii) $\begin{pmatrix} 19 & 9 \\ 34 & 21 \end{pmatrix}$ with row-by-column working`, marks: 2 },
      ],
      model: String.raw`(i) $(2 \times 1)(1 \times 2) = 2 \times 2$, so $\mathbf{AB}$ is $2 \times 2$; $(1 \times 2)(2 \times 1) = 1 \times 1$, so $\mathbf{BA}$ is $1 \times 1$.
(ii) $\mathbf{AB} = \begin{pmatrix} 1 \cdot 4 & 1 \cdot 3 \\ -0.5 \cdot 4 & -0.5 \cdot 3 \end{pmatrix} = \begin{pmatrix} 4 & 3 \\ -2 & -1.5 \end{pmatrix}$; $\mathbf{BA} = 4(1) + 3(-0.5) = 2.5$.
(iii) $(2 \times 3)(3 \times 2) = 2 \times 2$:
$\begin{pmatrix} 1\cdot1 + 0\cdot2 + 3\cdot6 & 1\cdot3 + 0\cdot5 + 3\cdot2 \\ 2\cdot1 + 1\cdot2 + 5\cdot6 & 2\cdot3 + 1\cdot5 + 5\cdot2 \end{pmatrix} = \begin{pmatrix} 19 & 9 \\ 34 & 21 \end{pmatrix}$.`,
      answer: String.raw`$\mathbf{AB} = \begin{pmatrix} 4 & 3 \\ -2 & -1.5 \end{pmatrix}$, $\mathbf{BA} = 2.5$, product $\begin{pmatrix} 19 & 9 \\ 34 & 21 \end{pmatrix}$`,
      source: "Lecture Note 9 Examples [8]–[9]",
    },
    {
      id: "matrices-x10", kind: "proof", sub: "Rules for multiplication",
      prompt: String.raw`Verify the associative law and the left and right distributive laws for $\mathbf{A} = ${eA}$, $\mathbf{B} = ${eB}$, $\mathbf{C} = ${eC}$.`,
      marks: 5,
      rubric: [
        { point: String.raw`Associative: $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC}) = \begin{pmatrix} 12 & 9 \\ 7 & 5 \end{pmatrix}$`, marks: 2 },
        { point: String.raw`Left distributive: both sides $\begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$`, marks: 1.5 },
        { point: String.raw`Right distributive: both sides $\begin{pmatrix} 3 & 2 \\ 9 & 6 \end{pmatrix}$`, marks: 1.5 },
      ],
      model: String.raw`$\mathbf{AB} = \begin{pmatrix} 6 & 3 \\ 3 & 2 \end{pmatrix}$, $\mathbf{BC} = \begin{pmatrix} -2 & -1 \\ 7 & 5 \end{pmatrix}$, $\mathbf{AC} = \begin{pmatrix} 5 & 3 \\ 2 & 1 \end{pmatrix}$.
**Associative.** $(\mathbf{AB})\mathbf{C} = \begin{pmatrix} 6 + 6 & 6 + 3 \\ 3 + 4 & 3 + 2 \end{pmatrix} = \begin{pmatrix} 12 & 9 \\ 7 & 5 \end{pmatrix}$; $\mathbf{A}(\mathbf{BC}) = \begin{pmatrix} -2 + 14 & -1 + 10 \\ 7 & 5 \end{pmatrix} = \begin{pmatrix} 12 & 9 \\ 7 & 5 \end{pmatrix}$. ✓
**Left distributive.** $\mathbf{B} + \mathbf{C} = \begin{pmatrix} 1 & 0 \\ 5 & 3 \end{pmatrix}$, $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \begin{pmatrix} 1 + 10 & 0 + 6 \\ 5 & 3 \end{pmatrix} = \begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$; $\mathbf{AB} + \mathbf{AC} = \begin{pmatrix} 11 & 6 \\ 5 & 3 \end{pmatrix}$. ✓
**Right distributive.** $\mathbf{A} + \mathbf{B} = \begin{pmatrix} 1 & 1 \\ 3 & 3 \end{pmatrix}$, $(\mathbf{A} + \mathbf{B})\mathbf{C} = \begin{pmatrix} 1 + 2 & 1 + 1 \\ 3 + 6 & 3 + 3 \end{pmatrix} = \begin{pmatrix} 3 & 2 \\ 9 & 6 \end{pmatrix}$; $\mathbf{AC} + \mathbf{BC} = \begin{pmatrix} 5 - 2 & 3 - 1 \\ 2 + 7 & 1 + 5 \end{pmatrix} = \begin{pmatrix} 3 & 2 \\ 9 & 6 \end{pmatrix}$. ✓`,
      answer: "All three laws hold for these matrices",
      source: "Lecture Note 9 Exercise [11]",
    },
    {
      id: "matrices-x11", kind: "proof", sub: "Transpose",
      prompt: String.raw`Using $\mathbf{A} = ${eA}$, $\mathbf{B} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ and $\alpha = 3$, verify the rules for transposition: (a) $(\mathbf{A}')' = \mathbf{A}$, (b) $(\mathbf{A} + \mathbf{B})' = \mathbf{A}' + \mathbf{B}'$, (c) $(\alpha\mathbf{A})' = \alpha\mathbf{A}'$, (d) $(\mathbf{AB})' = \mathbf{B}'\mathbf{A}'$.`,
      marks: 5,
      rubric: [
        { point: String.raw`Correct $\mathbf{A}' = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$ and (a)`, marks: 1 },
        { point: String.raw`(b) both sides $\begin{pmatrix} 2 & 0 \\ 2 & 2 \end{pmatrix}$`, marks: 1.5 },
        { point: String.raw`(c) both sides $\begin{pmatrix} 3 & 0 \\ 6 & 3 \end{pmatrix}$`, marks: 1 },
        { point: String.raw`(d) both sides $\begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$`, marks: 1.5 },
      ],
      model: String.raw`$\mathbf{A}' = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$ and $\mathbf{B}' = \mathbf{B} = \mathbf{I}$.
(a) $(\mathbf{A}')' = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix} = \mathbf{A}$. ✓
(b) $\mathbf{A} + \mathbf{B} = \begin{pmatrix} 2 & 2 \\ 0 & 2 \end{pmatrix}$, so $(\mathbf{A} + \mathbf{B})' = \begin{pmatrix} 2 & 0 \\ 2 & 2 \end{pmatrix}$; $\mathbf{A}' + \mathbf{B}' = \begin{pmatrix} 2 & 0 \\ 2 & 2 \end{pmatrix}$. ✓
(c) $3\mathbf{A} = \begin{pmatrix} 3 & 6 \\ 0 & 3 \end{pmatrix}$, so $(3\mathbf{A})' = \begin{pmatrix} 3 & 0 \\ 6 & 3 \end{pmatrix} = 3\mathbf{A}'$. ✓
(d) $\mathbf{AB} = \mathbf{AI} = \mathbf{A}$, so $(\mathbf{AB})' = \mathbf{A}' = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$; $\mathbf{B}'\mathbf{A}' = \mathbf{IA}' = \mathbf{A}'$. ✓`,
      answer: "All four rules hold",
      source: "Lecture Note 9 Example [13]",
    },
    {
      id: "matrices-x12", kind: "calc", sub: "Determinants & inverses",
      prompt: String.raw`(i) Find $|\mathbf{A}|$ for $\mathbf{A} = \begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 1 & 0 & 2 \end{pmatrix}$. (ii) Find the inverse of $\mathbf{G} = \begin{pmatrix} 1 & 1 \\ -1 & 2 \end{pmatrix}$ and verify that $\mathbf{GG}^{-1} = \mathbf{I}$.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) cofactor expansion set up correctly`, marks: 1 },
        { point: String.raw`(i) $|\mathbf{A}| = 1$`, marks: 1 },
        { point: String.raw`(ii) $|\mathbf{G}| = 3$ and $\mathbf{G}^{-1} = \frac13\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$`, marks: 2 },
        { point: String.raw`(ii) correct verification $\mathbf{GG}^{-1} = \mathbf{I}$`, marks: 1 },
      ],
      model: String.raw`(i) $|\mathbf{A}| = 1\begin{vmatrix} 1 & 0 \\ 0 & 2 \end{vmatrix} - 2\begin{vmatrix} 0 & 0 \\ 1 & 2 \end{vmatrix} + 1\begin{vmatrix} 0 & 1 \\ 1 & 0 \end{vmatrix} = 1(2) - 2(0) + 1(-1) = 1$.
(ii) $|\mathbf{G}| = (1)(2) - (1)(-1) = 3 \neq 0$, so $\mathbf{G}^{-1} = \frac13\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$.
Check: $\begin{pmatrix} 1 & 1 \\ -1 & 2 \end{pmatrix}\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 2 + 1 & -1 + 1 \\ -2 + 2 & 1 + 2 \end{pmatrix} = \begin{pmatrix} 3 & 0 \\ 0 & 3 \end{pmatrix}$, and $\frac13$ of this is $\mathbf{I}$. ✓`,
      answer: String.raw`$|\mathbf{A}| = 1$; $\mathbf{G}^{-1} = \frac13\begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$`,
      source: "Lecture Note 9 Examples [16]–[17]",
    },
    {
      id: "matrices-x13", kind: "calc", sub: "Matrix multiplication",
      prompt: String.raw`Let $\mathbf{A} = ${mA}$ and $\mathbf{E} = \begin{pmatrix} 1 & 0 & 2 \\ -1 & 3 & 1 \end{pmatrix}$. (i) Compute $\mathbf{AE}$. (ii) Is $\mathbf{EA}$ defined? (iii) Write down $\mathbf{E}'$ and its dimension.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) correct dimension $2 \times 3$ and row-by-column method`, marks: 1 },
        { point: String.raw`(i) $\mathbf{AE} = \begin{pmatrix} -1 & 6 & 4 \\ 4 & 3 & 11 \end{pmatrix}$`, marks: 2 },
        { point: String.raw`(ii) not defined, since $3 \neq 2$`, marks: 1 },
        { point: String.raw`(iii) $\mathbf{E}'$ correct, $3 \times 2$`, marks: 1 },
      ],
      model: String.raw`(i) $(2 \times 2)(2 \times 3)$ gives a $2 \times 3$ matrix.
Row 1 $(1, 2)$: $1 - 2 = -1$, $0 + 6 = 6$, $2 + 2 = 4$. Row 2 $(5, 1)$: $5 - 1 = 4$, $0 + 3 = 3$, $10 + 1 = 11$.
$\mathbf{AE} = \begin{pmatrix} -1 & 6 & 4 \\ 4 & 3 & 11 \end{pmatrix}$.
(ii) $\mathbf{EA}$ is $(2 \times 3)(2 \times 2)$: columns of $\mathbf{E}$ (3) $\neq$ rows of $\mathbf{A}$ (2), so it is **undefined**.
(iii) $\mathbf{E}' = \begin{pmatrix} 1 & -1 \\ 0 & 3 \\ 2 & 1 \end{pmatrix}$, a $3 \times 2$ matrix.`,
      answer: String.raw`$\mathbf{AE} = \begin{pmatrix} -1 & 6 & 4 \\ 4 & 3 & 11 \end{pmatrix}$; $\mathbf{EA}$ undefined; $\mathbf{E}'$ is $3 \times 2$`,
      source: "Modelled on Lecture Note 9 Example [9] and Assignment 10 Q1",
    },
    {
      id: "matrices-x14", kind: "calc", sub: "Idempotent matrices",
      prompt: String.raw`Let $\mathbf{N} = \begin{pmatrix} 2 & -1 \\ 2 & -1 \end{pmatrix}$. (i) Is $\mathbf{N}$ idempotent? (ii) Is it symmetric? (iii) Find $|\mathbf{N}|$ and say whether $\mathbf{N}^{-1}$ exists.`,
      marks: 5,
      rubric: [
        { point: String.raw`(i) computes $\mathbf{N}^2 = \begin{pmatrix} 2 & -1 \\ 2 & -1 \end{pmatrix}$`, marks: 1.5 },
        { point: "(i) concludes idempotent", marks: 0.5 },
        { point: String.raw`(ii) not symmetric since $n_{12} = -1 \neq 2 = n_{21}$`, marks: 1 },
        { point: String.raw`(iii) $|\mathbf{N}| = 0$, so no inverse`, marks: 2 },
      ],
      model: String.raw`(i) $\mathbf{N}^2 = \begin{pmatrix} 4 - 2 & -2 + 1 \\ 4 - 2 & -2 + 1 \end{pmatrix} = \begin{pmatrix} 2 & -1 \\ 2 & -1 \end{pmatrix} = \mathbf{N}$, so $\mathbf{N}$ **is idempotent**.
(ii) $\mathbf{N}' = \begin{pmatrix} 2 & 2 \\ -1 & -1 \end{pmatrix} \neq \mathbf{N}$ ($n_{12} = -1$, $n_{21} = 2$), so it is **not symmetric**.
(iii) $|\mathbf{N}| = (2)(-1) - (-1)(2) = -2 + 2 = 0$, so $\mathbf{N}^{-1}$ **does not exist** (the formula would divide by 0).`,
      answer: "Idempotent; not symmetric; |N| = 0, so no inverse",
      source: "Modelled on Assignment 10 Q1–Q2",
    },
    {
      id: "matrices-x15", kind: "calc", sub: "Determinants",
      prompt: String.raw`Let $\mathbf{F} = \begin{pmatrix} 1 & 2 & 0 \\ 3 & -1 & 4 \\ 2 & 0 & 1 \end{pmatrix}$. Compute $|\mathbf{F}|$ and $|\mathbf{F}'|$, and state whether $|\mathbf{F}^{-1}|$ exists; if so, give its value.`,
      marks: 5,
      rubric: [
        { point: "Correct first-row cofactor expansion with signs +, −, +", marks: 2 },
        { point: String.raw`Correct minors $-1$ and $-5$, giving $|\mathbf{F}| = 9$`, marks: 2 },
        { point: String.raw`$|\mathbf{F}'| = 9$; $|\mathbf{F}^{-1}| = 1/9$`, marks: 1 },
      ],
      model: String.raw`$|\mathbf{F}| = 1\begin{vmatrix} -1 & 4 \\ 0 & 1 \end{vmatrix} - 2\begin{vmatrix} 3 & 4 \\ 2 & 1 \end{vmatrix} + 0\begin{vmatrix} 3 & -1 \\ 2 & 0 \end{vmatrix} = 1(-1 - 0) - 2(3 - 8) + 0 = -1 + 10 = 9$.
$|\mathbf{F}'| = |\mathbf{F}| = 9$. Since $|\mathbf{F}| \neq 0$, $\mathbf{F}^{-1}$ exists and $|\mathbf{F}^{-1}| = 1/|\mathbf{F}| = 1/9$.`,
      answer: String.raw`$|\mathbf{F}| = |\mathbf{F}'| = 9$; $|\mathbf{F}^{-1}| = 1/9$`,
      source: "Modelled on Lecture Note 9 Example [16] and Assignment 10 Q1(d)",
    },
  ],
};

export default data;
