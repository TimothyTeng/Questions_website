import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

// Hand-written conceptual questions for Chapter 8A: complex vectors and the DFT.
// Course convention: W[k,n] = e^{-j2*pi*k*n/N}, X = W x, x = (1/N) W^H X.
// All numerical answers were checked numerically (Python/numpy).

export const dftConcepts: ConceptQuestion[] = [
  // ---------------------------------------------------------------- MCQ ----
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt:
      "For $N = 8$, row $k = 2$ of the DFT analysis matrix $W$ (entries $e^{-j2\\pi kn/N}$, $n = 0, \\dots, 7$) is a complex exponential sequence that rotates:",
    options: [
      "anticlockwise, with $\\omega = \\pi/2$ rad/sample",
      "clockwise, with $\\omega = \\pi/4$ rad/sample",
      "clockwise, with $\\omega = \\pi/2$ rad/sample",
      "anticlockwise, with $\\omega = \\pi/4$ rad/sample",
      "None of the above",
    ],
    answer: 2,
    solution:
      "Row $k$ is $e^{-j(2\\pi k/N)n}$, so the angle changes by $-2\\pi k/N$ per sample. For $k = 2$, $N = 8$: $-2\\pi(2)/8 = -\\pi/2$ rad/sample.\nThe negative sign means **clockwise** rotation: the row is $1, -j, -1, j, 1, -j, -1, j$.\nSo it rotates clockwise at $\\pi/2$ rad/sample ($\\pi/4$ is the rate of row $k = 1$).",
  },
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt:
      "For $N = 8$, row $k = 6$ of the DFT matrix $W$ is **visually** (taking the smallest angular step) a complex exponential that rotates:",
    options: [
      "clockwise, with $\\omega = 3\\pi/2$ rad/sample",
      "anticlockwise, with $\\omega = \\pi/2$ rad/sample",
      "clockwise, with $\\omega = \\pi/2$ rad/sample",
      "anticlockwise, with $\\omega = 3\\pi/4$ rad/sample",
      "None of the above",
    ],
    answer: 1,
    solution:
      "Row 6 is $e^{-j(12\\pi/8)n} = e^{-j(3\\pi/2)n}$. A clockwise step of $3\\pi/2$ lands at the same place as an anticlockwise step of $\\pi/2$, since $-3\\pi/2 + 2\\pi = \\pi/2$.\nSo the samples are $1, j, -1, -j, \\dots$: it looks like an anticlockwise rotation at $2\\pi(N - k)/N = 2\\pi(2)/8 = \\pi/2$ rad/sample (aliasing).\nIn general row $N - k$ rotates at the same rate as row $k$ but in the opposite direction; here row 6 is the conjugate of row 2.",
  },
  {
    subtopic: "Analysis & synthesis",
    kind: "mcq",
    prompt: "Given $x = [2, 0, 0, 3]^T$ and $N = 4$, find the DFT coefficients $X = Wx$.",
    options: [
      "$[5,\\ 2 - 3j,\\ -1,\\ 2 + 3j]^T$",
      "$[5,\\ 2 + 3j,\\ 1,\\ 2 - 3j]^T$",
      "$[1.25,\\ 0.5 + 0.75j,\\ -0.25,\\ 0.5 - 0.75j]^T$",
      "$[5,\\ 2 + 3j,\\ -1,\\ 2 - 3j]^T$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$X[k] = \\sum_n x[n]e^{-j2\\pi kn/4} = 2 + 3e^{-j2\\pi k \\cdot 3/4} = 2 + 3e^{-j3\\pi k/2} = 2 + 3j^k$.\n$k = 0$: $5$; $k = 1$: $2 + 3j$; $k = 2$: $2 - 3 = -1$; $k = 3$: $2 - 3j$.\nUsing $e^{+j}$ (the synthesis sign) gives the conjugated distractor; dividing by $N$ gives the scaled one (in this course $1/N$ sits in the **inverse**).",
  },
  {
    subtopic: "Analysis & synthesis",
    kind: "mcq",
    prompt: "Given DFT coefficients $X = [4, 1, 0, 3]^T$ with $N = 4$, what is $x = \\frac1N W^H X$?",
    options: [
      "$[2,\\ 1 + 0.5j,\\ 0,\\ 1 - 0.5j]^T$",
      "$[8,\\ 4 - 2j,\\ 0,\\ 4 + 2j]^T$",
      "$[2,\\ 1 - 0.5j,\\ 0,\\ 1 + 0.5j]^T$",
      "$[2,\\ 1,\\ 0,\\ 1]^T$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$x[n] = \\frac14\\left(4 + 1\\cdot e^{j\\pi n/2} + 0 + 3e^{j3\\pi n/2}\\right)$, using the **positive** exponent for synthesis.\n$n = 0$: $(4 + 1 + 3)/4 = 2$. $n = 1$: $(4 + j - 3j)/4 = 1 - 0.5j$. $n = 2$: $(4 - 1 - 3)/4 = 0$. $n = 3$: $(4 - j + 3j)/4 = 1 + 0.5j$.\nNote $x$ is complex because $X$ is not conjugate-symmetric ($X[3] = 3 \\ne \\overline{X[1]} = 1$). Forgetting $1/N$ gives the $[8, \\dots]$ option.",
  },
  {
    subtopic: "Analysis & synthesis",
    kind: "mcq",
    prompt:
      "With $N = 4$, $X = N\\,[0,\\ 3e^{-j\\pi/4},\\ 0,\\ 0]^T$. Which expression describes $x[n]$, $n = 0, \\dots, 3$?",
    options: [
      "$3e^{-j(\\pi n/2 - \\pi/4)}$",
      "$12e^{j(\\pi n/2 - \\pi/4)}$",
      "$3\\cos(\\pi n/2 - \\pi/4)$",
      "$\\tfrac34 e^{j(\\pi n/2 - \\pi/4)}$",
      "None of the above",
    ],
    answer: 4,
    solution:
      "Only bin $k = 1$ is non-zero, so $x[n] = \\frac1N X[1] e^{j2\\pi(1)n/4} = \\frac1N \\cdot N \\cdot 3e^{-j\\pi/4} e^{j\\pi n/2} = 3e^{j(\\pi n/2 - \\pi/4)}$.\nThat is a single complex exponential rotating **anticlockwise** at $\\pi/2$ rad/sample with amplitude 3 and phase $-\\pi/4$ (samples $\\approx 2.12 - 2.12j,\\ 2.12 + 2.12j, \\dots$).\nIt is not listed: the first option has the wrong rotation sign, the second/fourth have the wrong amplitude, and a real cosine would need a second bin at $k = 3$. Answer: **None of the above**.",
  },
  {
    subtopic: "DFT properties",
    kind: "mcq",
    prompt: "For $x = [1, 2, 3, 4]^T$ ($N = 4$), what is $X[2]$?",
    options: ["$10$", "$-2 + 2j$", "$2$", "$-2$", "None of the above"],
    answer: 3,
    solution:
      "Row $k = N/2 = 2$ of $W$ is $e^{-j\\pi n} = (-1)^n = [1, -1, 1, -1]$, so $X[2]$ is the alternating sum.\n$X[2] = 1 - 2 + 3 - 4 = -2$. ($10$ is $X[0]$, the plain sum/DC term, and $-2 + 2j$ is $X[1]$.)",
  },
  {
    subtopic: "DFT properties",
    kind: "mcq",
    prompt: "A **real** signal of length $N = 8$ has $X[3] = 2 - 5j$. What is $X[5]$?",
    options: ["$2 + 5j$", "$2 - 5j$", "$-2 + 5j$", "$-2 - 5j$", "None of the above"],
    answer: 0,
    solution:
      "For real $x$, the DFT is conjugate-symmetric: $X[N - k] = \\overline{X[k]}$.\nHere $N - 3 = 5$, so $X[5] = \\overline{2 - 5j} = 2 + 5j$.\nIntuition: row 5 of $W$ is the conjugate of row 3, and conjugating a real-weighted sum conjugates the result.",
  },
  {
    subtopic: "Single-tone spectra",
    kind: "mcq",
    prompt: "For $N = 16$, let $x[n] = 3e^{j(2\\pi n/16 + \\pi/3)}$. Which describes its DFT $X[k]$?",
    options: [
      "$X[1] = 3e^{j\\pi/3}$, all other $X[k] = 0$",
      "$X[1] = 24e^{j\\pi/3}$ and $X[15] = 24e^{-j\\pi/3}$, others 0",
      "$X[15] = 48e^{j\\pi/3}$, all other $X[k] = 0$",
      "$X[1] = 48e^{j\\pi/3}$, all other $X[k] = 0$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$x$ is exactly $3e^{j\\pi/3}$ times the $k_0 = 1$ basis sequence $e^{j2\\pi(1)n/16}$. By orthogonality, only $X[1]$ is non-zero.\n$X[1] = \\sum_n 3e^{j\\pi/3} e^{j2\\pi n/16} e^{-j2\\pi n/16} = 16 \\cdot 3e^{j\\pi/3} = 48e^{j\\pi/3}$.\nA single complex exponential gives a single bin of size $N \\cdot A$; the two-bin answer is what a **real** cosine would give.",
  },
  {
    subtopic: "Single-tone spectra",
    kind: "mcq",
    prompt: "For $N = 16$, let $x[n] = 3\\sin(2\\pi n/16 + \\pi/3)$. What is $X[1]$?",
    options: [
      "$24e^{j\\pi/3}$",
      "$48e^{-j\\pi/6}$",
      "$24e^{j\\pi/6}$",
      "$24e^{-j5\\pi/6}$",
      "None of the above",
    ],
    answer: 4,
    solution:
      "$\\sin\\phi = \\frac{e^{j\\phi} - e^{-j\\phi}}{2j}$, and $\\frac{1}{2j} = \\frac12 e^{-j\\pi/2}$. So $x[n] = \\frac32 e^{j(\\pi/3 - \\pi/2)}e^{j2\\pi n/16} + \\frac32 e^{-j(\\pi/3 - \\pi/2)}e^{-j2\\pi n/16}$.\nHence $X[1] = 16 \\cdot \\frac32 e^{-j\\pi/6} = 24e^{-j\\pi/6}$ and $X[15] = 24e^{j\\pi/6}$ (conjugate, as $x$ is real).\n$24e^{-j\\pi/6}$ is not listed ($24e^{j\\pi/6}$ is $X[15]$), so the answer is **None of the above**.",
  },
  {
    subtopic: "Complex inner product",
    kind: "mcq",
    prompt:
      "Using the canonical inner product $\\langle \\mathbf a, \\mathbf b\\rangle = \\sum_i a_i \\overline{b_i} = \\mathbf b^H\\mathbf a$, compute $\\langle \\mathbf a, \\mathbf b \\rangle$ for $\\mathbf a = [1 + j,\\ 2 - j]^T$, $\\mathbf b = [j,\\ 1]^T$.",
    options: ["$1 + 0j$", "$3 - 2j$", "$3 + 2j$", "$1 + 2j$", "None of the above"],
    answer: 1,
    solution:
      "Conjugate the **second** vector: $\\overline{\\mathbf b} = [-j, 1]$.\n$\\langle \\mathbf a, \\mathbf b \\rangle = (1 + j)(-j) + (2 - j)(1) = (-j - j^2) + 2 - j = (1 - j) + 2 - j = 3 - 2j$.\n$3 + 2j$ is $\\langle \\mathbf b, \\mathbf a\\rangle = \\overline{\\langle \\mathbf a, \\mathbf b\\rangle}$; $1 + 0j$ comes from not conjugating at all ($\\mathbf b^T\\mathbf a$).",
  },
  {
    subtopic: "Complex inner product",
    kind: "mcq",
    prompt: "Find $\\|\\mathbf b\\|$ for $\\mathbf b = [1 + j,\\ 1 - j,\\ 2j]^T$.",
    options: ["$2j$", "$2$", "$8$", "$2\\sqrt2$", "None of the above"],
    answer: 3,
    solution:
      "$\\|\\mathbf b\\| = \\sqrt{\\mathbf b^H\\mathbf b} = \\sqrt{\\sum |b_i|^2} = \\sqrt{2 + 2 + 4} = \\sqrt8 = 2\\sqrt2$.\nThe trap is $\\mathbf b^T\\mathbf b = (1 + j)^2 + (1 - j)^2 + (2j)^2 = 2j - 2j - 4 = -4$, whose 'square root' $2j$ is not a length. Conjugating guarantees a real, non-negative norm.",
  },
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt: "For $N = 8$, what is the entry $W[3, 5]$ (row $k = 3$, column $n = 5$) of the DFT matrix?",
    options: [
      "$\\tfrac{\\sqrt2}{2} - \\tfrac{\\sqrt2}{2}j$",
      "$-\\tfrac{\\sqrt2}{2} - \\tfrac{\\sqrt2}{2}j$",
      "$\\tfrac{\\sqrt2}{2} + \\tfrac{\\sqrt2}{2}j$",
      "$-\\tfrac{\\sqrt2}{2} + \\tfrac{\\sqrt2}{2}j$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$W[k, n] = e^{-j2\\pi kn/N} = e^{-j2\\pi \\cdot 15/8} = e^{-j15\\pi/4}$.\nAdd $4\\pi$ to bring it into $(-\\pi, \\pi]$: $-15\\pi/4 + 4\\pi = \\pi/4$.\nSo $W[3, 5] = e^{j\\pi/4} = \\tfrac{\\sqrt2}{2} + \\tfrac{\\sqrt2}{2}j$. Reducing $kn$ mod $N$ first ($15 \\bmod 8 = 7$, angle $-7\\pi/4 \\equiv \\pi/4$) is the fastest route.",
  },
  {
    subtopic: "DFT properties",
    kind: "mcq",
    prompt: "For $x = [1, -1, 2, 0]^T$ ($N = 4$), what is $\\sum_{k=0}^{3} |X[k]|^2$?",
    options: ["$6$", "$1.5$", "$24$", "$96$", "None of the above"],
    answer: 2,
    solution:
      "Parseval (DFT form, $1/N$ in the inverse): $\\sum_n |x[n]|^2 = \\frac1N \\sum_k |X[k]|^2$, so $\\sum_k |X[k]|^2 = N\\sum_n |x[n]|^2$.\n$\\sum |x|^2 = 1 + 1 + 4 + 0 = 6$, so $\\sum |X|^2 = 4 \\cdot 6 = 24$.\n(Directly: $X = [2, -1 + j, 4, -1 - j]$, giving $4 + 2 + 16 + 2 = 24$.) This works because $W^HW = NI$.",
  },
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt: "For the $N \\times N$ DFT matrix $W$, the product $W^H W$ equals:",
    options: ["$I$", "$\\frac1N I$", "$W^2$", "$W$", "None of the above"],
    answer: 4,
    solution:
      "Entry $(j, k)$ of $W^HW$ is the inner product of columns $j$ and $k$ of $W$. Distinct columns are orthogonal (0), and each column has $N$ entries of modulus 1, so its squared norm is $N$.\nHence $W^HW = NI$, which is not listed: **None of the above**.\nThis is exactly why $W^{-1} = \\frac1N W^H$: $W$ is orthogonal but not ortho**normal** (that would need a $1/\\sqrt N$ scaling).",
  },

  // ---------------------------------------------------------------- TFN ----
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt: "The rows of the $N \\times N$ DFT matrix $W$ are orthonormal.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The rows are mutually orthogonal, but each has $N$ entries of modulus 1, so its squared norm is $N$, not 1.\nThat is why $WW^H = W^HW = NI$ and the inverse carries the factor $\\frac1N$. Only $\\frac{1}{\\sqrt N}W$ would be unitary (orthonormal rows).",
  },
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt: "For $N = 8$, row $k = 1$ of the analysis matrix $W$ is a complex exponential sequence rotating anticlockwise.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Row 1 is $e^{-j(2\\pi/8)n} = e^{-j(\\pi/4)n}$: the angle **decreases** by $\\pi/4$ each sample, so it rotates **clockwise**.\nIt is the synthesis matrix $W^H$ whose columns $e^{+j2\\pi kn/N}$ rotate anticlockwise.",
  },
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt: "For $N = 8$, column $k = 1$ of the synthesis matrix $W^H$ is a complex exponential sequence rotating anticlockwise at $\\pi/4$ rad/sample.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$W^H$ is the conjugate transpose of $W$, so its column $k$ is the conjugate of row $k$ of $W$: $e^{+j2\\pi kn/N}$.\nFor $k = 1$, $N = 8$ this is $e^{j(\\pi/4)n}$: a positive angular step of $\\pi/4$ rad/sample, i.e. anticlockwise.",
  },
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "$X[0]$ equals the sum of all the samples $x[0] + x[1] + \\dots + x[N-1]$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Row $k = 0$ of $W$ is $e^{0} = [1, 1, \\dots, 1]$, so $X[0] = \\sum_n x[n]$.\nThis is the DC (zero-frequency) term: $N$ times the average value of the signal.",
  },
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "A length-8 signal $x$ has $X[3] = 1 + 2j$. Then $X[5] = 1 - 2j$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Conjugate symmetry $X[N - k] = \\overline{X[k]}$ holds only when $x$ is **real**.\nThe question does not say $x$ is real. For a complex $x$ (e.g. a single complex exponential at $k = 3$) $X[5]$ could be 0 or anything else. So we cannot determine it.",
  },
  {
    subtopic: "Complex inner product",
    kind: "tfn",
    prompt: "For complex vectors, $\\langle \\mathbf a, \\mathbf b \\rangle = \\langle \\mathbf b, \\mathbf a \\rangle$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The complex inner product is conjugate-symmetric: $\\langle \\mathbf b, \\mathbf a\\rangle = \\mathbf a^H\\mathbf b = \\overline{\\mathbf b^H\\mathbf a} = \\overline{\\langle \\mathbf a, \\mathbf b\\rangle}$.\nThe two are equal only when the inner product is real. E.g. $\\mathbf a = [j]$, $\\mathbf b = [1]$: $\\langle \\mathbf a, \\mathbf b\\rangle = j$ but $\\langle \\mathbf b, \\mathbf a\\rangle = -j$.",
  },
  {
    subtopic: "Complex inner product",
    kind: "tfn",
    prompt: "For a complex vector $\\mathbf b \\in \\mathbb C^N$, its norm is $\\|\\mathbf b\\| = \\sqrt{\\mathbf b^T\\mathbf b}$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "For complex vectors you must use the conjugate transpose: $\\|\\mathbf b\\| = \\sqrt{\\mathbf b^H\\mathbf b} = \\sqrt{\\sum |b_i|^2}$.\n$\\mathbf b^T\\mathbf b = \\sum b_i^2$ can be negative or complex: for $\\mathbf b = [1, j, -1, -j]$ it is $1 - 1 + 1 - 1 = 0$, although $\\|\\mathbf b\\| = 2$.",
  },
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt: "The DFT matrix is symmetric: $W^T = W$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$W[k, n] = e^{-j2\\pi kn/N}$ depends only on the product $kn$, and $kn = nk$, so $W[k, n] = W[n, k]$.\nSo rows and columns of $W$ are the same sequences. Note $W$ is symmetric but **not** Hermitian: $W^H = \\overline{W} \\ne W$.",
  },
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "If $x$ is a real signal, then all its DFT coefficients $X[k]$ are real.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The rows of $W$ are complex, so $X[k]$ is generally complex even for real $x$. E.g. $x = [2, 0, 0, 3]$ gives $X = [5, 2 + 3j, -1, 2 - 3j]$.\nWhat real $x$ guarantees is conjugate symmetry $X[N - k] = \\overline{X[k]}$ (and real $X[0]$, plus real $X[N/2]$ for even $N$).",
  },
  {
    subtopic: "Single-tone spectra",
    kind: "tfn",
    prompt: "For $N = 8$ and $x[n] = e^{j2\\pi \\cdot 3n/8}$, the only non-zero DFT coefficient is $X[3] = 8$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$x$ is exactly the conjugate of row 3 of $W$, so $X[3] = \\sum_n e^{j2\\pi 3n/8}e^{-j2\\pi 3n/8} = \\sum_n 1 = N = 8$.\nEvery other row of $W$ is orthogonal to it, so $X[k] = 0$ for $k \\ne 3$. In general $Ae^{j(2\\pi k_0n/N + \\phi)} \\to X[k_0] = NAe^{j\\phi}$.",
  },
  {
    subtopic: "Single-tone spectra",
    kind: "tfn",
    prompt: "For $N = 8$, $x[n] = \\cos(2\\pi \\cdot 2n/8)$ has exactly one non-zero DFT coefficient, $X[2]$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A real cosine is the sum of two complex exponentials: $\\cos\\phi = \\frac12 e^{j\\phi} + \\frac12 e^{-j\\phi}$.\nThe $e^{-j2\\pi 2n/8}$ part equals $e^{j2\\pi 6n/8}$, i.e. bin $N - k_0 = 6$. So $X[2] = X[6] = N \\cdot \\frac12 = 4$, two non-zero bins.",
  },
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "A length-4 signal has $X[0] = 12$. Therefore $x = [3, 3, 3, 3]^T$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$X[0] = \\sum_n x[n] = 12$ only fixes the sum (DC component) of the samples.\n$[3, 3, 3, 3]$ fits, but so does $[12, 0, 0, 0]$ or $[6, 6, 0, 0]$; they differ in $X[1], X[2], X[3]$, which are not given. Not enough information.",
  },
  {
    subtopic: "Complex exponentials",
    kind: "tfn",
    prompt: "The sequence $z_n = e^{j\\omega n}$ with $\\omega = -\\pi/3$ rotates clockwise by $\\pi/3$ radians per sample.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Each step multiplies by $e^{j\\omega} = e^{-j\\pi/3}$, which adds $-\\pi/3$ to the angle.\nA negative angle step is a clockwise rotation; $\\omega > 0$ would rotate anticlockwise. Since $|\\omega| < \\pi$ there is no aliasing ambiguity.",
  },
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt: "For $N = 8$, rows $k = 1$ and $k = 7$ of $W$ rotate at the same rate ($\\pi/4$ rad/sample) but in opposite directions.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Row 7 is $e^{-j(7\\pi/4)n}$, and $-7\\pi/4 + 2\\pi = \\pi/4$, so it equals $e^{+j(\\pi/4)n}$: anticlockwise at $\\pi/4$.\nRow 1 is $e^{-j(\\pi/4)n}$: clockwise at $\\pi/4$. In general row $N - k$ is the conjugate of row $k$.",
  },
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "Circularly shifting a signal $x$ (e.g. $x[n] \\to x[(n - 1) \\bmod N]$) changes the magnitudes $|X[k]|$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A circular shift by $m$ multiplies each coefficient by a phase factor: $X[k] \\to X[k]e^{-j2\\pi km/N}$.\nThat factor has modulus 1, so $|X[k]|$ is unchanged; only the phases change. E.g. $[2, 0, 0, 3] \\to [3, 2, 0, 0]$ turns $X = [5, 2 + 3j, -1, 2 - 3j]$ into $[5, 3 - 2j, 1, 3 + 2j]$, same magnitudes.",
  },
  {
    subtopic: "Complex inner product",
    kind: "tfn",
    prompt: "Two vectors $\\mathbf a, \\mathbf b \\in \\mathbb C^3$ with $\\|\\mathbf a\\| = \\|\\mathbf b\\| = 1$ satisfy $|\\langle \\mathbf a, \\mathbf b\\rangle| = 1$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Cauchy-Schwarz gives only $|\\langle \\mathbf a, \\mathbf b\\rangle| \\le \\|\\mathbf a\\|\\|\\mathbf b\\| = 1$.\nEquality holds when $\\mathbf b$ is a complex multiple of $\\mathbf a$ (same direction, possibly phase-shifted); orthogonal unit vectors give 0. Without knowing their directions we cannot determine it.",
  },
];
