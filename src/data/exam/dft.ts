import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

/** Questions in the style and difficulty of the SC1004 final (AY24/25 S2 – AY25/26 S2 DFT parts). */
// Course convention (as in the lesson): W[k, n] = e^{-j2*pi*k*n/N}; analysis X = W x (no 1/N);
// synthesis x = (1/N) W^H X, i.e. x[n] = (1/N) sum_k X[k] e^{+j2*pi*k*n/N}. j is the imaginary unit.
// TFN answers: 0 = True, 1 = False, 2 = Not enough information to determine.
// Every numeric answer was re-checked with numpy (scratch script, not part of the repo).
export const dftExam: ConceptQuestion[] = [
  // D1: identify x(n) from X(k), N = 8 (cf. AY25/26 S1 Q19)
  {
    subtopic: "Synthesis (inverse DFT)",
    kind: "mcq",
    prompt:
      "An $N = 8$ point signal has DFT coefficients $X[2] = 12e^{j\\pi/6}$, $X[6] = 12e^{-j\\pi/6}$ and $X[k] = 0$ for all other $k$. Then $x[n]$, $n = 0, \\dots, 7$, is",
    options: [
      "$3\\cos(\\pi n/2 + \\pi/6)$",
      "$3\\cos(\\pi n/4 + \\pi/6)$",
      "$1.5\\cos(\\pi n/2 + \\pi/6)$",
      "$3\\cos(\\pi n/2 - \\pi/6)$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "Synthesis: $x[n] = \\frac18\\sum_k X[k]e^{j2\\pi kn/8}$. Bin $2$ has frequency $2\\pi \\cdot 2/8 = \\pi/2$, and bin $6$ has $e^{j2\\pi \\cdot 6n/8} = e^{j3\\pi n/2} = e^{-j\\pi n/2}$.\n$$x[n] = \\tfrac18\\left(12e^{j(\\pi n/2 + \\pi/6)} + 12e^{-j(\\pi n/2 + \\pi/6)}\\right) = \\tfrac{12}{8}\\cdot 2\\cos(\\pi n/2 + \\pi/6) = 3\\cos(\\pi n/2 + \\pi/6).$$\nThe mirror bins are conjugates ($X[6] = \\overline{X[2]}$), so $x$ is real. Traps: (b) uses $2\\pi/N$ instead of $2\\pi k/N$; (c) uses only one of the two bins; (d) takes the phase from $X[6]$ instead of $X[2]$.",
  },
  // D2: identify x(n), N = 4
  {
    subtopic: "Synthesis (inverse DFT)",
    kind: "mcq",
    prompt: "The 4-point DFT of a signal $x$ is $X = [4,\\ -2j,\\ 0,\\ 2j]^T$. Then $x =$",
    options: ["$[1, 0, 1, 2]^T$", "$[4, 8, 4, 0]^T$", "$[1, 2, 1, 0]^T$", "$[0, 1, 2, 1]^T$", "None of the above"],
    answer: 2,
    solution:
      "For $N = 4$, $e^{j2\\pi n/4} = j^n$ and $e^{j2\\pi \\cdot 3n/4} = (-j)^n$, so $x[n] = \\frac14\\left(4 - 2j\\cdot j^n + 2j\\cdot(-j)^n\\right)$.\n- $n = 0$: $\\frac14(4 - 2j + 2j) = 1$\n- $n = 1$: $\\frac14(4 + 2 + 2) = 2$\n- $n = 2$: $\\frac14(4 + 2j - 2j) = 1$\n- $n = 3$: $\\frac14(4 - 2 - 2) = 0$\nSo $x = [1, 2, 1, 0]^T$. Check: $X[0] = 1 + 2 + 1 + 0 = 4$ ✓, and $X[1] = 1 - 2j - 1 + 0 = -2j$ ✓.\nTraps: (a) uses $e^{-j\\dots}$ in the synthesis (time-reversed answer); (b) forgets the $\\frac1N$.",
  },
  // D3: identify x(n) with a sine and DC, N = 8
  {
    subtopic: "Synthesis (inverse DFT)",
    kind: "mcq",
    prompt:
      "An $N = 8$ point signal has $X[0] = 8$, $X[1] = -4j$, $X[7] = 4j$ and $X[k] = 0$ otherwise. Then $x[n] =$",
    options: [
      "$1 - \\sin(\\pi n/4)$",
      "$1 + \\sin(\\pi n/4)$",
      "$8 + 8\\sin(\\pi n/4)$",
      "$1 + \\cos(\\pi n/4)$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "$x[n] = \\frac18\\left(8 - 4je^{j\\pi n/4} + 4je^{-j\\pi n/4}\\right) = 1 - \\frac{4j}{8}\\left(e^{j\\pi n/4} - e^{-j\\pi n/4}\\right)$.\nUse $e^{j\\theta} - e^{-j\\theta} = 2j\\sin\\theta$: $-\\frac{4j}{8}\\cdot 2j\\sin(\\pi n/4) = -\\frac{8j^2}{8}\\sin(\\pi n/4) = \\sin(\\pi n/4)$.\nSo $x[n] = 1 + \\sin(\\pi n/4)$. (Matches the rule: $A\\sin$ at bin $k_0$ gives $X[k_0] = \\frac{NA}{2}e^{-j\\pi/2} = -4j$.)\nTraps: (a) comes from using $e^{-j\\dots}$ in the synthesis; (c) forgets $\\frac1N$; (d) is what a **real** $X[1] = X[7] = 4$ would give.",
  },
  // D4: DFT matrix statements (cf. AY25/26 S1 Q20, AY25/26 S2 Q19)
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt:
      "Let $W$ be the $N \\times N$ DFT matrix, $W[k, n] = e^{-j2\\pi kn/N}$. Which of the following statements are correct?\n- I. $W^HW = NI$.\n- II. $W^{-1} = \\frac1N W^H$.\n- III. $\\mathbf x \\mapsto W\\mathbf x$ is a linear transformation from $\\mathbb C^N$ to $\\mathbb C^N$.\n- IV. For $0 < k < N/2$, column $k$ of $W$ is a phasor sequence rotating clockwise at $2\\pi k/N$ rad/sample.\n- V. The columns of $W$ form an orthonormal basis of $\\mathbb C^N$.\n- VI. $W$ is Hermitian, i.e. $W^H = W$.",
    options: ["I and II only", "I, II and III only", "I, II, III and V only", "I, II, III and IV only", "All of the above"],
    answer: 3,
    solution:
      "I: the columns are mutually orthogonal and each has squared norm $\\sum_n|e^{-j\\theta}|^2 = N$. True.\nII: follows from I. True.\nIII: matrix multiplication is linear, and $W$ maps $N$-vectors to $N$-vectors. True.\nIV: $W$ is symmetric ($kn = nk$), so column $k$ equals row $k$: $e^{-j(2\\pi k/N)n}$, a negative angle step, i.e. clockwise at $2\\pi k/N$ rad/sample. True.\nV: orthogonal but each column has length $\\sqrt N$, not $1$. False (that is why $\\frac1N$ appears in II).\nVI: $W^H = \\overline{W}^T = \\overline{W} \\neq W$ (e.g. $W[1, 1] = e^{-j2\\pi/N}$ is not real for $N \\ge 3$). $W$ is symmetric, not Hermitian. False.\nAnswer: I, II, III and IV only.",
  },
  // D5: TFN column direction for k > N/2
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt:
      "For $N = 8$, column $k = 6$ of the DFT matrix $W$ (entries $e^{-j2\\pi \\cdot 6n/8}$, $n = 0, \\dots, 7$) is a sequence that visually rotates anticlockwise at $\\pi/2$ rad/sample.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The angle step is $-2\\pi \\cdot 6/8 = -3\\pi/2$. Adding $2\\pi$ gives the equivalent step $+\\pi/2$, so the samples are $1, j, -1, -j, 1, \\dots$: anticlockwise at $\\pi/2$ rad/sample.\nEquivalently, column $N - k$ is the conjugate of column $k$; column $2$ rotates clockwise at $\\pi/2$, so column $6$ rotates anticlockwise at the same rate. **True.**",
  },
  // D6: W^2 x
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt: "Let $W$ be the $6 \\times 6$ DFT matrix and $\\mathbf x = [1, 2, 3, 4, 5, 6]^T$. Then $W^2\\mathbf x =$",
    options: [
      "$6[1, 2, 3, 4, 5, 6]^T$",
      "$6[1, 6, 5, 4, 3, 2]^T$",
      "$36[1, 2, 3, 4, 5, 6]^T$",
      "$[1, 6, 5, 4, 3, 2]^T$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "Entry $(k, m)$ of $W^2$ is $\\sum_{n=0}^{N-1} e^{-j2\\pi kn/N}e^{-j2\\pi nm/N} = \\sum_n e^{-j2\\pi n(k + m)/N}$. This geometric sum of $N$-th roots of unity is $N$ when $k + m \\equiv 0 \\pmod N$ and $0$ otherwise.\nSo $(W^2\\mathbf x)[k] = N\\,x[(-k) \\bmod N]$: $W^2$ is $N$ times the **index-reversal** permutation, not $NI$.\n$W^2\\mathbf x = 6[x_0, x_5, x_4, x_3, x_2, x_1]^T = 6[1, 6, 5, 4, 3, 2]^T$.\nTrap: (a) confuses $W^2$ with $W^HW = NI$; there is no conjugate here.",
  },
  // D7: DFT, elementwise product, inverse DFT = circular convolution (cf. AY24/25 S2 Q18)
  {
    subtopic: "Circular convolution",
    kind: "mcq",
    prompt:
      "Let $\\mathbf x = [1, 2, 0, -1]^T$ and $\\mathbf y = [2, 0, 1, 0]^T$, with 4-point DFTs $X = W\\mathbf x$ and $Y = W\\mathbf y$. Define $Z[k] = X[k]Y[k]$ for $k = 0, \\dots, 3$, and $\\mathbf z = \\frac14 W^HZ$. Then $\\mathbf z =$",
    options: ["$[2, 3, 1, 0]^T$", "$[2, 4, 1, 0]^T$", "$[2, 0, 0, 0]^T$", "$[8, 12, 4, 0]^T$", "None of the above"],
    answer: 0,
    solution:
      "Multiplying DFTs element by element corresponds to **circular convolution** in time: $z[n] = \\sum_{m=0}^{3} x[m]\\,y[(n - m) \\bmod 4]$.\nQuick route: the linear convolution is $(1 + 2t - t^3)(2 + t^2) = 2 + 4t + t^2 + 0t^3 + 0t^4 - t^5$, i.e. $[2, 4, 1, 0, 0, -1, 0]$. Wrap indices $4, 5, 6$ back onto $0, 1, 2$: $[2 + 0,\\ 4 - 1,\\ 1 + 0,\\ 0] = [2, 3, 1, 0]$.\nDirect check: $z[1] = x_0y_1 + x_1y_0 + x_2y_3 + x_3y_2 = 0 + 4 + 0 - 1 = 3$.\nTraps: (b) is linear convolution truncated without wrapping; (c) multiplies $\\mathbf x$ and $\\mathbf y$ element-wise in time; (d) forgets the $\\frac14$.",
  },
  // D8: phase ramp = circular shift
  {
    subtopic: "Circular convolution",
    kind: "mcq",
    prompt:
      "Let $\\mathbf x = [3, 1, 4, 1]^T$ with 4-point DFT $X$. Define $Z[k] = e^{-j\\pi k/2}X[k]$, $k = 0, \\dots, 3$, and let $\\mathbf z$ be the inverse DFT of $Z$. Then $\\mathbf z =$",
    options: ["$[1, 4, 1, 3]^T$", "$[3, -j, -4, j]^T$", "$[1, 3, 1, 4]^T$", "$[4, 1, 3, 1]^T$", "None of the above"],
    answer: 2,
    solution:
      "$e^{-j\\pi k/2} = e^{-j2\\pi k \\cdot 1/4}$ is the DFT of the shifted impulse $\\delta[n - 1] = [0, 1, 0, 0]$ (row $k$ of $W$ picks out $W[k, 1]$). So $Z = X \\cdot \\text{DFT}(\\delta[n - 1])$, and the inverse DFT is the circular convolution of $\\mathbf x$ with $\\delta[n - 1]$: a circular **delay** by one sample.\n$z[n] = x[(n - 1) \\bmod 4]$: $\\mathbf z = [x_3, x_0, x_1, x_2]^T = [1, 3, 1, 4]^T$.\nTraps: (a) shifts the wrong way (advance); (b) multiplies $x[n]$ by $e^{-j\\pi n/2}$, which is a frequency shift, not a time shift; (d) shifts by two.",
  },
  // D9: real cosine with phase -> two bins
  {
    subtopic: "Single tones",
    kind: "mcq",
    prompt:
      "Let $x[n] = 2\\cos(3\\pi n/4 - \\pi/3)$ for $n = 0, \\dots, 7$ ($N = 8$). Only two DFT coefficients are nonzero. They are",
    options: [
      "$X[3] = 8e^{j\\pi/3}$, $X[5] = 8e^{-j\\pi/3}$",
      "$X[3] = 16e^{-j\\pi/3}$, $X[5] = 16e^{j\\pi/3}$",
      "$X[3] = e^{-j\\pi/3}$, $X[5] = e^{j\\pi/3}$",
      "$X[3] = 8e^{-j\\pi/3}$, $X[5] = 8e^{j\\pi/3}$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$3\\pi/4 = 2\\pi \\cdot 3/8$, so the tone sits on bin $k_0 = 3$. Split the cosine: $2\\cos\\theta = e^{j\\theta} + e^{-j\\theta}$, so\n$x[n] = e^{-j\\pi/3}e^{j2\\pi \\cdot 3n/8} + e^{j\\pi/3}e^{-j2\\pi \\cdot 3n/8}$, and $e^{-j2\\pi \\cdot 3n/8} = e^{j2\\pi \\cdot 5n/8}$ is bin $5$.\nAn exponential $\\beta e^{j2\\pi k_0n/N}$ contributes $X[k_0] = N\\beta$, so $X[3] = 8e^{-j\\pi/3}$ and $X[5] = 8e^{j\\pi/3}$ (conjugates, as $x$ is real).\nTraps: (a) swaps the phases; (b) uses $NA$ instead of $NA/2$ per bin; (c) divides by $N$ in the analysis step.",
  },
  // D10: Parseval
  {
    subtopic: "DFT properties",
    kind: "mcq",
    prompt:
      "A real signal of length $N = 8$ has DFT $X[0] = 4$, $X[2] = 2 + 2j$, $X[6] = 2 - 2j$ and $X[k] = 0$ otherwise. What is $\\sum_{n=0}^{7}|x[n]|^2$?",
    options: ["$32$", "$2$", "$8$", "$16$", "None of the above"],
    answer: 4,
    solution:
      "Parseval with the course convention: $\\sum_n|x[n]|^2 = \\frac1N\\sum_k|X[k]|^2$ (because $\\|W\\mathbf x\\|^2 = \\mathbf x^HW^HW\\mathbf x = N\\|\\mathbf x\\|^2$).\n$\\sum_k|X[k]|^2 = 16 + 8 + 8 = 32$, so $\\sum_n|x[n]|^2 = 32/8 = 4$, which is not listed.\n(Check by synthesis: $x = [1, 0, 0, 1, 1, 0, 0, 1]^T$, energy $4$.) Trap: (a) forgets the $\\frac1N$.",
  },
  // D11: TFN conjugate symmetry
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "$X = [3,\\ 1 + j,\\ 2,\\ 1 + j]^T$ is the 4-point DFT of a **real** signal $\\mathbf x$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "A real signal must have a conjugate-symmetric DFT: $X[N - k] = \\overline{X[k]}$. Here $X[3]$ should equal $\\overline{X[1]} = 1 - j$, but it is $1 + j$.\nIndeed the synthesis gives $\\mathbf x = [1.75 + 0.5j,\\ 0.25,\\ 0.75 - 0.5j,\\ 0.25]^T$, which is complex. **False.**",
  },
  // D12: TFN X[N/2] of a real signal
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "If $\\mathbf x$ is a real signal of even length $N$, then $X[N/2]$ is real.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$X[N/2] = \\sum_n x[n]e^{-j2\\pi(N/2)n/N} = \\sum_n x[n]e^{-j\\pi n} = \\sum_n (-1)^nx[n]$, an alternating sum of real numbers. **True.**\n(Also from conjugate symmetry: $X[N/2] = \\overline{X[N - N/2]} = \\overline{X[N/2]}$, so it equals its own conjugate.)",
  },
  // D13: sum of all entries of W
  {
    subtopic: "DFT matrix",
    kind: "mcq",
    prompt: "Let $W$ be the $6 \\times 6$ DFT matrix. What is the sum of all $36$ entries of $W$?",
    options: ["$0$", "$6$", "$36$", "$1$", "None of the above"],
    answer: 1,
    solution:
      "The sum of all entries is $\\mathbf 1^TW\\mathbf 1$. Now $W\\mathbf 1$ is the DFT of the constant signal $[1, 1, \\dots, 1]$: $X[0] = 6$ and $X[k] = \\sum_n e^{-j2\\pi kn/6} = 0$ for $k \\neq 0$ (the $6$-th roots of unity sum to zero).\nSo $\\mathbf 1^TW\\mathbf 1 = \\mathbf 1^T[6, 0, 0, 0, 0, 0]^T = 6 = N$.\nTrap: (c) assumes every entry contributes $1$; only row/column $0$ is all ones, every other row sums to $0$.",
  },
  // D14: single bin -> rotating phasor
  {
    subtopic: "Single tones",
    kind: "mcq",
    prompt:
      "An $N = 8$ point signal has $X[3] = 8j$ and $X[k] = 0$ for $k \\neq 3$. Which describes $x[n]$?",
    options: [
      "$x[n] = e^{j(3\\pi n/4 + \\pi/2)}$: starts at $j$ and rotates anticlockwise at $3\\pi/4$ rad/sample",
      "$x[n] = e^{-j(3\\pi n/4 - \\pi/2)}$: starts at $j$ and rotates clockwise at $3\\pi/4$ rad/sample",
      "$x[n] = 8e^{j(3\\pi n/4 + \\pi/2)}$: starts at $8j$ and rotates anticlockwise at $3\\pi/4$ rad/sample",
      "$x[n] = e^{j(3\\pi n/8 + \\pi/2)}$: starts at $j$ and rotates anticlockwise at $3\\pi/8$ rad/sample",
      "None of the above",
    ],
    answer: 0,
    solution:
      "$x[n] = \\frac18 X[3]e^{j2\\pi \\cdot 3n/8} = je^{j3\\pi n/4} = e^{j\\pi/2}e^{j3\\pi n/4} = e^{j(3\\pi n/4 + \\pi/2)}$.\nAmplitude $|8j|/8 = 1$, phase $\\pi/2$ (so $x[0] = j$), step $+3\\pi/4$ rad/sample; since $3\\pi/4 < \\pi$ it visually rotates anticlockwise.\nTraps: (b) uses the analysis sign; (c) forgets $\\frac1N$; (d) uses $\\pi k/N$ instead of $2\\pi k/N$.",
  },
  // D15: property statements
  {
    subtopic: "DFT properties",
    kind: "mcq",
    prompt:
      "Let $X$ be the $N$-point DFT of $\\mathbf x \\in \\mathbb C^N$. Which of the following statements are correct?\n- I. If $\\mathbf x$ is real, then $X[N - k] = \\overline{X[k]}$ for $k = 1, \\dots, N - 1$.\n- II. If $\\mathbf x$ is real, then $X[0]$ is real.\n- III. If every $X[k]$ is real, then $\\mathbf x$ is real.\n- IV. Circularly shifting $\\mathbf x$ changes the phases of the $X[k]$ but not their magnitudes $|X[k]|$.\n- V. $\\|X\\|^2 = N\\|\\mathbf x\\|^2$.",
    options: ["I and II only", "I, II and IV only", "I, II, IV and V only", "I, II, III and IV only", "All of the above"],
    answer: 2,
    solution:
      "I: conjugate symmetry of real signals. True.\nII: $X[0] = \\sum_n x[n]$, a sum of reals. True.\nIII: False. $X = [0, 4, 0, 0]$ is real, but its synthesis is $x[n] = e^{j\\pi n/2} = [1, j, -1, -j]$. A real $\\mathbf x$ needs a **conjugate-symmetric** $X$, not a real one.\nIV: a circular shift by $m$ multiplies $X[k]$ by $e^{-j2\\pi km/N}$, which has modulus $1$. True.\nV: $\\|W\\mathbf x\\|^2 = \\mathbf x^HW^HW\\mathbf x = N\\|\\mathbf x\\|^2$ (Parseval). True.\nAnswer: I, II, IV and V only.",
  },
  // D16: DFT coefficient as an inner product
  {
    subtopic: "Inner product view",
    kind: "mcq",
    prompt:
      "Let $\\mathbf x = [1, 2, 3, 4]^T$ and let $\\mathbf b_1 = [e^{j2\\pi n/4}]_{n=0}^{3} = [1, j, -1, -j]^T$ be the $k = 1$ Fourier basis vector for $N = 4$. With $\\langle \\mathbf x, \\mathbf b\\rangle = \\mathbf b^H\\mathbf x$, what is $\\langle \\mathbf x, \\mathbf b_1\\rangle$?",
    options: ["$-2 - 2j$", "$10$", "$(-2 + 2j)/4$", "$-2 + 2j$", "None of the above"],
    answer: 3,
    solution:
      "$\\mathbf b_1^H = [1, -j, -1, j]$, which is exactly row $1$ of $W$. So $\\langle \\mathbf x, \\mathbf b_1\\rangle = X[1]$:\n$1 \\cdot 1 + 2(-j) + 3(-1) + 4(j) = (1 - 3) + (-2 + 4)j = -2 + 2j$.\nTraps: (a) forgets to conjugate $\\mathbf b_1$ ($\\mathbf b_1^T\\mathbf x$); (b) is $X[0]$; (c) divides by $N$, but the analysis equation has no $\\frac1N$ in this course.",
  },
  // D17: DC plus alternating component
  {
    subtopic: "Synthesis (inverse DFT)",
    kind: "mcq",
    prompt: "An $N = 8$ point signal has $X[0] = 16$, $X[4] = -8$ and $X[k] = 0$ otherwise. Then $\\mathbf x =$",
    options: [
      "$[3, 1, 3, 1, 3, 1, 3, 1]^T$",
      "$[2, 0, 0, 0, -1, 0, 0, 0]^T$",
      "$[8, 24, 8, 24, 8, 24, 8, 24]^T$",
      "$[1, 1, 1, 1, 3, 3, 3, 3]^T$",
      "None of the above",
    ],
    answer: 4,
    solution:
      "Bin $4 = N/2$ has frequency $\\pi$: $e^{j2\\pi \\cdot 4n/8} = e^{j\\pi n} = (-1)^n$.\n$x[n] = \\frac18\\left(16 + (-8)(-1)^n\\right) = 2 - (-1)^n$, so $\\mathbf x = [1, 3, 1, 3, 1, 3, 1, 3]^T$, which is not listed.\nTraps: (a) flips the sign of the $(-1)^n$ term; (b) treats the scaled coefficients as time samples; (c) forgets the $\\frac1N$; (d) confuses the highest frequency with a step.",
  },
  // D18: period-2 signal has only even bins
  {
    subtopic: "DFT properties",
    kind: "mcq",
    prompt:
      "For $N = 4$, let $\\mathbf x = [a, b, a, b]^T$ where $a, b$ are arbitrary complex numbers. Which DFT coefficients are zero for **every** choice of $a$ and $b$?",
    options: ["$X[0]$ and $X[2]$", "$X[2]$ only", "$X[1]$ only", "$X[1]$ and $X[3]$", "None of them in general"],
    answer: 3,
    solution:
      "With $W$ for $N = 4$ (powers of $-j$): $X[k] = a + b(-j)^k + a(-j)^{2k} + b(-j)^{3k} = \\left(a + b(-j)^k\\right)\\left(1 + (-1)^k\\right)$.\nFor odd $k$, $1 + (-1)^k = 0$, so $X[1] = X[3] = 0$ always. For even $k$: $X[0] = 2a + 2b$, $X[2] = 2a - 2b$, generally nonzero.\nInterpretation: $\\mathbf x$ repeats every 2 samples, so it can only contain the frequencies $0$ and $\\pi$ (bins $0$ and $2$).",
  },
  // D19: TFN norm scaling
  {
    subtopic: "DFT matrix",
    kind: "tfn",
    prompt: "For every $\\mathbf x \\in \\mathbb C^N$, $\\|W\\mathbf x\\| = \\sqrt N\\,\\|\\mathbf x\\|$, where $W$ is the $N \\times N$ DFT matrix.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\|W\\mathbf x\\|^2 = (W\\mathbf x)^H(W\\mathbf x) = \\mathbf x^HW^HW\\mathbf x = \\mathbf x^H(NI)\\mathbf x = N\\|\\mathbf x\\|^2$. Taking square roots: $\\|W\\mathbf x\\| = \\sqrt N\\|\\mathbf x\\|$. **True.** So $\\frac{1}{\\sqrt N}W$ is unitary (length-preserving), while $W$ itself stretches every vector by $\\sqrt N$.",
  },
  // D20: circular convolution with a two-tap filter
  {
    subtopic: "Circular convolution",
    kind: "mcq",
    prompt:
      "Let $\\mathbf x = [1, 1, 1, 0]^T$ and $\\mathbf y = [1, 0, 0, 1]^T$ with 4-point DFTs $X$ and $Y$. If $Z[k] = X[k]Y[k]$ and $\\mathbf z = \\frac14W^HZ$, then $\\mathbf z =$",
    options: ["$[1, 2, 2, 1]^T$", "$[2, 2, 1, 1]^T$", "$[1, 0, 0, 0]^T$", "$[8, 8, 4, 4]^T$", "None of the above"],
    answer: 1,
    solution:
      "$\\mathbf z$ is the circular convolution $z[n] = \\sum_m y[m]\\,x[(n - m) \\bmod 4]$. Since $\\mathbf y = \\delta[n] + \\delta[n - 3]$:\n$z[n] = x[n] + x[(n - 3) \\bmod 4] = x[n] + x[(n + 1) \\bmod 4]$.\n$z = [x_0 + x_1,\\ x_1 + x_2,\\ x_2 + x_3,\\ x_3 + x_0] = [2, 2, 1, 1]$.\nTraps: (a) adds $x[n - 1]$ instead (shift the wrong way); (c) multiplies $\\mathbf x$ and $\\mathbf y$ element-wise in time; (d) forgets the $\\frac14$.",
  },
  // D21: TFN, flat magnitude spectrum
  {
    subtopic: "DFT properties",
    kind: "tfn",
    prompt: "A signal $\\mathbf x$ of length $8$ has $|X[k]| = 2$ for every $k$. Then $\\mathbf x$ is real.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Magnitudes alone say nothing about conjugate symmetry of the phases.\n$\\mathbf x = [2, 0, 0, 0, 0, 0, 0, 0]^T$ has $X[k] = 2$ for all $k$ (real signal). $\\mathbf x = [2j, 0, \\dots, 0]^T$ has $X[k] = 2j$, also $|X[k]| = 2$, but is complex.\nBoth fit the data, so **not enough information**.",
  },
];
