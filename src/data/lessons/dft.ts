import type { Lesson } from "@/lib/types";

// Lesson: Chapter 8A DFT, taught as a change of basis.
// Course convention: W[k,n] = e^{-j2*pi*k*n/N}; analysis X = W x; synthesis x = (1/N) W^H X.
// All worked-example arithmetic was checked numerically (Python/numpy).

export const dftLesson: Lesson = {
  topic: "dft",
  bigPicture:
    "The DFT is a **change of basis** in $\\mathbb C^N$. A signal $x$ (samples in time, i.e. coordinates in the standard basis) is re-expressed in the **Fourier basis**: complex exponential sequences $e^{j2\\pi kn/N}$ that spin around the unit circle at $N$ different speeds. Because these basis vectors are mutually orthogonal, each coordinate is found independently with an inner product: that is the **analysis** equation $X = Wx$. Putting the scaled, phase-shifted exponentials back together is the **synthesis** equation $x = \\frac1N W^HX$. $|X[k]|$ says how much of frequency $2\\pi k/N$ the signal contains, and $\\angle X[k]$ says how far that exponential must be phase-shifted to line up with $x$.",
  sections: [
    {
      title: "Complex vectors, conjugate transpose and the inner product",
      intuition:
        "For real vectors, $\\mathbf b^T\\mathbf b$ is a squared length. For complex vectors that breaks ($j \\cdot j = -1$), so we conjugate one side: $\\bar b_i b_i = |b_i|^2$ is always real and non-negative. That one conjugate is the whole difference between real and complex inner products.",
      keyIdeas: [
        "$\\mathbf z \\in \\mathbb C^N$ is a column of $N$ complex numbers.",
        "Conjugate transpose (Hermitian) $\\mathbf b^H = \\overline{\\mathbf b}^T$: transpose **and** conjugate every entry.",
        "Canonical inner product: $\\langle \\mathbf a, \\mathbf b\\rangle = \\sum_i a_i\\overline{b_i} = \\mathbf b^H\\mathbf a$ (the **second** argument is conjugated).",
        "Conjugate symmetry: $\\langle \\mathbf b, \\mathbf a\\rangle = \\overline{\\langle \\mathbf a, \\mathbf b\\rangle}$, so order matters.",
        "Norm: $\\|\\mathbf b\\| = \\sqrt{\\langle \\mathbf b, \\mathbf b\\rangle} = \\sqrt{\\mathbf b^H\\mathbf b} = \\sqrt{\\sum|b_i|^2}$, always real.",
        "Projection still works: $\\text{proj}_{\\mathbf b}\\mathbf v = \\frac{\\langle \\mathbf v, \\mathbf b\\rangle}{\\mathbf b^H\\mathbf b}\\mathbf b$; if $\\mathbf v = \\beta\\mathbf b$ the projection recovers $\\mathbf v$ exactly, with the complex scale $\\beta$ giving magnitude and phase.",
      ],
      formulas: [
        "\\langle \\mathbf a, \\mathbf b\\rangle = \\sum_{i=0}^{N-1} a_i\\,\\overline{b_i} = \\mathbf b^H\\mathbf a",
        "\\|\\mathbf b\\| = \\sqrt{\\mathbf b^H\\mathbf b} = \\sqrt{\\textstyle\\sum_i |b_i|^2}",
      ],
      example: {
        problem:
          "(Lecture example) $\\mathbf a = [1 + j,\\ 2 - j,\\ 3 - j,\\ 4 + j]^T$, $\\mathbf b = [1,\\ j,\\ -1,\\ -j]^T$. Find $\\|\\mathbf b\\|$ and $\\langle \\mathbf a, \\mathbf b\\rangle$.",
        steps: [
          "Each entry of $\\mathbf b$ has modulus 1, so $\\mathbf b^H\\mathbf b = 1 + 1 + 1 + 1 = 4$ and $\\|\\mathbf b\\| = 2$.",
          "Conjugate $\\mathbf b$: $\\overline{\\mathbf b} = [1, -j, -1, j]$ (this row is $\\mathbf b^H$).",
          "Multiply entry-wise: $(1 + j)(1) = 1 + j$; $(2 - j)(-j) = -2j + j^2 = -1 - 2j$; $(3 - j)(-1) = -3 + j$; $(4 + j)(j) = 4j + j^2 = -1 + 4j$.",
          "Sum: real parts $1 - 1 - 3 - 1 = -4$, imaginary parts $1 - 2 + 1 + 4 = 4$.",
        ],
        answer: "$\\|\\mathbf b\\| = 2$, $\\langle \\mathbf a, \\mathbf b\\rangle = \\mathbf b^H\\mathbf a = -4 + 4j$.",
      },
      pitfalls: [
        "Computing $\\mathbf b^T\\mathbf b$ for a norm: for $[1, j, -1, -j]$ it gives 0, which is nonsense as a length.",
        "Conjugating the wrong vector: $\\mathbf a^H\\mathbf b = \\langle \\mathbf b, \\mathbf a\\rangle$ is the conjugate of the answer.",
        "Forgetting to conjugate when taking $W^H$ (a plain transpose of the symmetric $W$ is just $W$ again).",
      ],
      recall: [
        { q: "$\\langle [1 + j,\\ 2 - j], [j,\\ 1]\\rangle = ?$", a: "$(1 + j)(-j) + (2 - j)(1) = 3 - 2j$." },
        { q: "Why is the second argument conjugated?", a: "So that $\\langle \\mathbf b, \\mathbf b\\rangle = \\sum |b_i|^2$ is real and non-negative, giving a valid length." },
        { q: "What is $\\|\\mathbf b\\|$ for a length-$N$ vector whose entries all have modulus 1?", a: "$\\sqrt N$." },
      ],
    },
    {
      title: "Complex exponential sequences: which way do they spin?",
      intuition:
        "$z_n = e^{j\\omega n}$ is a dot on the unit circle that jumps by angle $\\omega$ every sample. Positive $\\omega$: anticlockwise. Negative $\\omega$: clockwise. Because angles wrap every $2\\pi$, a big jump one way looks exactly like a small jump the other way (the wagon-wheel effect / aliasing).",
      keyIdeas: [
        "$e^{j\\omega n}$ has modulus 1 for every $n$; $\\omega$ is the digital angular frequency in **rad/sample**.",
        "$\\omega > 0$ rotates anticlockwise; $\\omega < 0$ rotates clockwise.",
        "Aliasing: $\\omega$ and $\\omega \\pm 2\\pi$ give identical samples. Visually, take the representative in $(-\\pi, \\pi]$.",
        "Scaling a sequence by $\\beta = |\\beta|e^{j\\phi}$ scales its length by $|\\beta|$ and phase-shifts every sample by $\\phi$.",
        "$Ae^{j(\\omega n + \\phi)}$: amplitude $A$, frequency $\\omega$, phase $\\phi$.",
      ],
      formulas: [
        "z_n = e^{j\\omega n},\\quad z_{n+1} = z_n\\,e^{j\\omega}",
        "e^{j(\\omega + 2\\pi)n} = e^{j\\omega n}\\quad (n \\text{ integer})",
      ],
      example: {
        problem: "Describe $z_n = e^{j\\pi n/2}$ and $y_n = e^{j3\\pi n/2}$ for $n = 0, \\dots, 3$.",
        steps: [
          "$z_n$: angle step $+\\pi/2$, so $z = [1, j, -1, -j]$: anticlockwise, a quarter-turn per sample.",
          "$y_n$: angle step $3\\pi/2$. Since $3\\pi/2 - 2\\pi = -\\pi/2$, $y_n = e^{-j\\pi n/2}$.",
          "So $y = [1, -j, -1, j]$: visually clockwise at $\\pi/2$ rad/sample, and $y = \\overline{z}$.",
        ],
        answer: "$z$ rotates anticlockwise at $\\pi/2$ rad/sample; $y$ is its conjugate, rotating clockwise at $\\pi/2$ rad/sample.",
      },
      pitfalls: [
        "Calling $e^{-j\\omega n}$ ($\\omega > 0$) anticlockwise: the minus sign means clockwise.",
        "Reporting a rate like $3\\pi/2$ rad/sample when the question asks what the rotation **looks** like; reduce into $(-\\pi, \\pi]$.",
      ],
      recall: [
        { q: "Direction and rate of $e^{-j\\pi n/3}$?", a: "Clockwise, $\\pi/3$ rad/sample." },
        { q: "What does $e^{j7\\pi n/4}$ look like?", a: "Same samples as $e^{-j\\pi n/4}$: clockwise at $\\pi/4$ rad/sample." },
        { q: "Effect of multiplying a sequence by $e^{j\\pi/4}$?", a: "A phase shift: every sample rotated by $\\pi/4$, lengths unchanged." },
      ],
    },
    {
      title: "The DFT matrix W",
      intuition:
        "Stack $N$ spinning sequences as the rows of a matrix: row $k$ spins **clockwise** $k$ steps of $2\\pi/N$ per sample. Multiplying a signal by row $k$ and summing asks 'how much does $x$ look like this spinning pattern?'.",
      keyIdeas: [
        "$W$ is $N \\times N$ with $W[k, n] = e^{-j2\\pi kn/N}$, rows $k = 0..N-1$, columns $n = 0..N-1$.",
        "Row $k$ rotates **clockwise** at $\\omega = 2\\pi k/N$ rad/sample (for $k < N/2$).",
        "Row $N - k$ is the conjugate of row $k$: for $k > N/2$, row $k$ visually rotates **anticlockwise** at $2\\pi(N - k)/N$.",
        "Row 0 is all ones (DC); for even $N$, row $N/2$ is $[1, -1, 1, -1, \\dots]$.",
        "$W$ is symmetric ($W^T = W$) since $kn = nk$.",
        "Rows (and columns) are orthogonal, each with squared norm $N$: $W^HW = WW^H = NI$, so $W^{-1} = \\frac1N W^H$.",
        "Synthesis matrix $W^H$ has columns $e^{+j2\\pi kn/N}$, which rotate **anticlockwise**.",
      ],
      formulas: [
        "W[k, n] = e^{-j2\\pi kn/N},\\qquad W^HW = NI,\\qquad W^{-1} = \\tfrac1N W^H",
        "W_{N=4} = \\begin{bmatrix} 1 & 1 & 1 & 1 \\\\ 1 & -j & -1 & j \\\\ 1 & -1 & 1 & -1 \\\\ 1 & j & -1 & -j \\end{bmatrix}",
      ],
      example: {
        problem:
          "For $N = 8$: (i) how does row $k = 2$ rotate? (ii) how does row $k = 6$ rotate? (iii) find $W[3, 5]$.",
        steps: [
          "(i) Row 2: $e^{-j(2\\pi \\cdot 2/8)n} = e^{-j(\\pi/2)n} = [1, -j, -1, j, \\dots]$. Negative step, so **clockwise** at $\\pi/2$ rad/sample.",
          "(ii) Row 6: step $-2\\pi \\cdot 6/8 = -3\\pi/2 \\equiv +\\pi/2$. Samples $[1, j, -1, -j, \\dots]$: visually **anticlockwise** at $2\\pi(8 - 6)/8 = \\pi/2$ rad/sample, the conjugate of row 2.",
          "(iii) $W[3, 5] = e^{-j2\\pi \\cdot 15/8}$. Reduce $15 \\bmod 8 = 7$: $e^{-j7\\pi/4} = e^{j\\pi/4}$ (add $2\\pi$).",
          "So $W[3, 5] = \\tfrac{\\sqrt2}{2} + \\tfrac{\\sqrt2}{2}j \\approx 0.707 + 0.707j$.",
        ],
        answer: "(i) clockwise, $\\pi/2$ rad/sample; (ii) anticlockwise, $\\pi/2$ rad/sample; (iii) $e^{j\\pi/4}$.",
      },
      pitfalls: [
        "Mixing up $W$ (minus sign, clockwise rows) and $W^H$ (plus sign, anticlockwise columns).",
        "Saying the rows are orthonormal: their squared norm is $N$, hence the $\\frac1N$ in the inverse.",
        "Using $2\\pi k$ instead of $2\\pi k/N$ for the frequency of row $k$.",
      ],
      recall: [
        { q: "Row $k = 1$ of $W$ for $N = 16$: direction and rate?", a: "Clockwise, $2\\pi/16 = \\pi/8$ rad/sample. First terms: $1, e^{-j\\pi/8}, e^{-j\\pi/4}, e^{-j3\\pi/8}$." },
        { q: "What is $W^{-1}$?", a: "$\\frac1N W^H$, because $W^HW = NI$." },
        { q: "How are rows $k$ and $N - k$ related?", a: "Complex conjugates: same rate, opposite direction of rotation." },
      ],
    },
    {
      title: "Analysis: X = W x",
      intuition:
        "Each DFT coefficient is an inner product: $X[k] = \\langle x, \\text{basis}_k\\rangle$ where the basis vector is $e^{+j2\\pi kn/N}$ (conjugating it gives row $k$ of $W$). It measures how much of that spinning pattern is in $x$, and with what phase.",
      keyIdeas: [
        "$X[k] = \\sum_{n=0}^{N-1} x[n]e^{-j2\\pi kn/N}$, $k = 0, \\dots, N-1$; in matrix form $X = Wx$.",
        "No $\\frac1N$ in the analysis equation (course convention); it lives in the synthesis.",
        "$X[0] = \\sum_n x[n]$: the DC term.",
        "Even for real $x$, $X$ is generally complex.",
        "Shortcut: for small $N$, write each $e^{-j2\\pi kn/N}$ as a power of $e^{-j2\\pi/N}$ (for $N = 4$ that is $-j$).",
      ],
      formulas: [
        "X[k] = \\sum_{n=0}^{N-1} x[n]\\,e^{-j2\\pi kn/N}",
      ],
      example: {
        problem: "(Tutorial 8A Q5a) Given $x = [2, 0, 0, 3]^T$, find $X$ with $N = 4$.",
        steps: [
          "Only $n = 0$ and $n = 3$ contribute: $X[k] = 2 + 3e^{-j2\\pi k \\cdot 3/4} = 2 + 3e^{-j3\\pi k/2}$.",
          "Note $e^{-j3\\pi/2} = j$, so $X[k] = 2 + 3j^k$.",
          "$k = 0$: $2 + 3 = 5$. $k = 1$: $2 + 3j$. $k = 2$: $2 + 3j^2 = -1$. $k = 3$: $2 + 3j^3 = 2 - 3j$.",
          "Check: $X[0] = 5$ is the sum of samples, and $X[3] = \\overline{X[1]}$ as expected for real $x$.",
        ],
        answer: "$X = [5,\\ 2 + 3j,\\ -1,\\ 2 - 3j]^T$",
      },
      pitfalls: [
        "Using $e^{+j\\dots}$ in the analysis equation: that gives the conjugated answer.",
        "Dividing by $N$ in the analysis step.",
        "Forgetting that the exponent uses the product $kn$, not $k + n$.",
      ],
      recall: [
        { q: "$X[0]$ for $x = [1, 2, 3, 4, 5, 6]$?", a: "$21$, the sum of the samples." },
        { q: "$X[2]$ for $x = [1, 2, 3, 4]$?", a: "Row 2 is $[1, -1, 1, -1]$, so $1 - 2 + 3 - 4 = -2$." },
        { q: "Is $X$ real when $x$ is real?", a: "Not in general; it is conjugate-symmetric: $X[N - k] = \\overline{X[k]}$." },
      ],
    },
    {
      title: "Synthesis: x = (1/N) Wᴴ X",
      intuition:
        "Synthesis rebuilds the signal as a sum of anticlockwise-spinning exponentials. Each $X[k]$ is a complex 'knob': its modulus sets how big that exponential is, and its angle sets the phase shift. The $\\frac1N$ undoes the factor $N$ picked up in analysis.",
      keyIdeas: [
        "$x[n] = \\frac1N\\sum_{k=0}^{N-1} X[k]e^{+j2\\pi kn/N}$; in matrix form $x = \\frac1N W^HX$.",
        "Columns of $W^H$ are the Fourier basis vectors; $X$ holds the coordinates of $x$ in that basis.",
        "Check: $\\frac1N W^H(Wx) = \\frac1N(NI)x = x$.",
        "If $X$ is **not** conjugate-symmetric, $x$ comes out complex.",
        "A single non-zero bin $X[k_0] = NAe^{j\\phi}$ synthesises to $x[n] = Ae^{j(2\\pi k_0n/N + \\phi)}$.",
      ],
      formulas: [
        "x[n] = \\frac1N\\sum_{k=0}^{N-1} X[k]\\,e^{+j2\\pi kn/N}",
      ],
      example: {
        problem: "Given $X = [4, 1, 0, 3]^T$ with $N = 4$, find $x$.",
        steps: [
          "$x[n] = \\frac14\\left(4 + 1\\cdot e^{j\\pi n/2} + 0 + 3e^{j3\\pi n/2}\\right)$; note $e^{j\\pi/2} = j$ and $e^{j3\\pi/2} = -j$.",
          "$n = 0$: $\\frac14(4 + 1 + 3) = 2$.",
          "$n = 1$: $\\frac14(4 + j + 3(-j)) = \\frac14(4 - 2j) = 1 - 0.5j$.",
          "$n = 2$: $\\frac14(4 + (-1) + 3(-1)) = 0$.",
          "$n = 3$: $\\frac14(4 + (-j) + 3(j)) = \\frac14(4 + 2j) = 1 + 0.5j$.",
        ],
        answer: "$x = [2,\\ 1 - 0.5j,\\ 0,\\ 1 + 0.5j]^T$ (complex, since $X[3] \\ne \\overline{X[1]}$).",
      },
      pitfalls: [
        "Forgetting the $\\frac1N$ (answer comes out $N$ times too big).",
        "Using the analysis sign $e^{-j\\dots}$ in synthesis.",
        "Expecting a real $x$ from a spectrum that isn't conjugate-symmetric.",
      ],
      recall: [
        { q: "With $N = 4$, $X = N[0, 3e^{-j\\pi/4}, 0, 0]^T$. What is $x[n]$?", a: "$3e^{j(\\pi n/2 - \\pi/4)}$: anticlockwise at $\\pi/2$ rad/sample, amplitude 3, phase $-\\pi/4$." },
        { q: "Synthesis of $X = [8, 0, 0, 0]$ with $N = 4$?", a: "$x = [2, 2, 2, 2]$: a constant (DC) signal." },
        { q: "Where does the $\\frac1N$ go in this course?", a: "In the inverse (synthesis) equation: $x = \\frac1N W^HX$." },
      ],
    },
    {
      title: "Single tones, real sinusoids and DFT properties",
      intuition:
        "A complex exponential that lands exactly on a DFT frequency is one basis vector, so it lights up one bin. A real cosine or sine is the sum of two counter-rotating exponentials (positive and negative frequency), so it lights up two mirror bins $k_0$ and $N - k_0$ with half the amplitude each.",
      keyIdeas: [
        "$x[n] = Ae^{j(2\\pi k_0n/N + \\phi)} \\Rightarrow X[k_0] = NAe^{j\\phi}$, all other $X[k] = 0$.",
        "$A\\cos(2\\pi k_0n/N + \\phi) \\Rightarrow X[k_0] = \\frac{NA}{2}e^{j\\phi}$, $X[N - k_0] = \\frac{NA}{2}e^{-j\\phi}$.",
        "$A\\sin(\\cdot)$: same magnitudes $\\frac{NA}{2}$, but phases $\\phi - \\pi/2$ at $k_0$ and $-(\\phi - \\pi/2)$ at $N - k_0$ (since $\\frac{1}{2j} = \\frac12e^{-j\\pi/2}$).",
        "Real $x$: $X[N - k] = \\overline{X[k]}$ (conjugate symmetry); $X[0]$ is real.",
        "Linearity: DFT$(\\alpha x + \\beta y) = \\alpha X + \\beta Y$.",
        "Parseval: $\\sum_n|x[n]|^2 = \\frac1N\\sum_k|X[k]|^2$.",
        "Circular shift by $m$: $X[k] \\to X[k]e^{-j2\\pi km/N}$ (phases change, magnitudes don't).",
      ],
      formulas: [
        "A\\cos\\theta = \\tfrac{A}{2}e^{j\\theta} + \\tfrac{A}{2}e^{-j\\theta},\\qquad A\\sin\\theta = \\tfrac{A}{2j}e^{j\\theta} - \\tfrac{A}{2j}e^{-j\\theta}",
        "\\sum_{n}|x[n]|^2 = \\frac1N\\sum_k |X[k]|^2",
      ],
      example: {
        problem:
          "(Tutorial 8A Q6d/e) $N = 16$. Find $X[k]$ for (d) $x[n] = 3e^{j(2\\pi n/16 + \\pi/3)}$ and (e) $x[n] = 3\\sin(2\\pi n/16 + \\pi/3)$.",
        steps: [
          "(d) This is one exponential at $k_0 = 1$ with $A = 3$, $\\phi = \\pi/3$. So $X[1] = 16 \\cdot 3e^{j\\pi/3} = 48e^{j\\pi/3}$, all other bins 0.",
          "(e) Write $\\sin\\theta = \\frac{e^{j\\theta} - e^{-j\\theta}}{2j}$ with $\\theta = 2\\pi n/16 + \\pi/3$. Since $\\frac{1}{2j} = \\frac12e^{-j\\pi/2}$ and $-\\frac{1}{2j} = \\frac12e^{j\\pi/2}$:",
          "$x[n] = \\frac32e^{j(\\pi/3 - \\pi/2)}e^{j2\\pi n/16} + \\frac32e^{-j(\\pi/3 - \\pi/2)}e^{-j2\\pi n/16}$.",
          "The first term is bin 1: $X[1] = 16 \\cdot \\frac32 e^{-j\\pi/6} = 24e^{-j\\pi/6}$. The second ($e^{-j2\\pi n/16} = e^{j2\\pi \\cdot 15n/16}$) is bin 15: $X[15] = 24e^{j\\pi/6}$.",
          "Check: $X[15] = \\overline{X[1]}$, as required for the real signal in (e). The complex tone in (d) has no such symmetry.",
        ],
        answer: "(d) $X[1] = 48e^{j\\pi/3}$, others 0. (e) $X[1] = 24e^{-j\\pi/6}$, $X[15] = 24e^{j\\pi/6}$, others 0.",
      },
      pitfalls: [
        "Putting a real cosine into a single bin: it needs two ($k_0$ and $N - k_0$), each of size $NA/2$.",
        "Forgetting the extra $-\\pi/2$ phase for a sine.",
        "Applying conjugate symmetry to a signal not stated to be real.",
        "Parseval without the $\\frac1N$ (or with it on the wrong side).",
      ],
      recall: [
        { q: "$N = 8$, $x[n] = \\cos(2\\pi \\cdot 2n/8)$. Non-zero bins?", a: "$X[2] = X[6] = 4$." },
        { q: "Real $x$, $N = 8$, $X[3] = 2 - 5j$. $X[5] = ?$", a: "$\\overline{X[3]} = 2 + 5j$." },
        { q: "$x = [2, 0, 0, 3]$: check Parseval.", a: "$\\sum|x|^2 = 13$; $\\sum|X|^2 = 25 + 13 + 1 + 13 = 52 = 4 \\cdot 13$." },
        { q: "Does a circular shift change $|X[k]|$?", a: "No, it multiplies $X[k]$ by $e^{-j2\\pi km/N}$, which has modulus 1." },
      ],
    },
  ],
  playbook: [
    "If asked how row $k$ of $W$ rotates → step is $-2\\pi k/N$: clockwise at $2\\pi k/N$ if $k < N/2$; if $k > N/2$, anticlockwise at $2\\pi(N - k)/N$.",
    "If asked about columns of $W^H$ (synthesis) → same rates, opposite direction (anticlockwise for small $k$).",
    "If you need a single entry $W[k, n]$ → reduce $kn \\bmod N$, then $e^{-j2\\pi(kn \\bmod N)/N}$.",
    "If you see 'find $X$' for small $N$ → write $W$ (for $N = 4$: powers of $-j$) and compute $X[k] = \\sum_n x[n]e^{-j2\\pi kn/N}$, then check $X[0] = \\sum x$.",
    "If you see 'find $x$ from $X$' → use $+j$ in the exponent and remember the $\\frac1N$.",
    "If $X$ has one non-zero bin $X[k_0]$ → $x[n] = \\frac{X[k_0]}{N}e^{j2\\pi k_0n/N}$, a single rotating phasor.",
    "If $x$ is a single complex exponential $Ae^{j(2\\pi k_0n/N + \\phi)}$ → $X[k_0] = NAe^{j\\phi}$, everything else 0.",
    "If $x$ is a real cosine/sine at $k_0$ → two bins, $k_0$ and $N - k_0$, each of magnitude $NA/2$; sine adds a $-\\pi/2$ phase at $k_0$.",
    "If the signal is real and one coefficient is given → $X[N - k] = \\overline{X[k]}$; if 'real' is not stated → 'Not enough information'.",
    "If asked for a complex inner product or norm → conjugate the **second** vector; norm uses $\\sum|b_i|^2$.",
    "If asked for $W^HW$, $W^{-1}$, or orthonormality → $W^HW = NI$, $W^{-1} = \\frac1N W^H$, rows orthogonal but **not** unit length.",
    "If asked for total energy in the frequency domain → $\\sum|X|^2 = N\\sum|x|^2$.",
  ],
};
