import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

/** Questions in the style and difficulty of the SC1004 final (AY24/25 S2 – AY25/26 S2, Q15–Q20 eigen parts). */
// TFN answers: 0 = True, 1 = False, 2 = Not enough information to determine.
// Every numeric answer was re-checked with numpy (scratch script, not part of the repo).
export const eigenExam: ConceptQuestion[] = [
  // E1: repeated eigenvalue, AM vs GM (cf. AY25/26 S1 Q15)
  {
    subtopic: "Multiplicity",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} -2 & 0 \\\\ 3 & -2 \\end{bmatrix}$. Which of the following statements are correct?\n- I. $A$ is diagonalizable because its only eigenvalue $-2$ is repeated.\n- II. $A$ has two linearly independent eigenvectors.\n- III. The algebraic multiplicity of $\\lambda = -2$ is $2$ and its geometric multiplicity is $1$.\n- IV. $A$ is invertible.",
    options: ["I and II only", "III only", "III and IV only", "II, III and IV only", "None of the above"],
    answer: 2,
    solution:
      "$A$ is lower triangular, so its eigenvalues are the diagonal entries $-2, -2$: algebraic multiplicity $2$.\n$A + 2I = \\begin{bmatrix} 0 & 0 \\\\ 3 & 0 \\end{bmatrix}$ has rank $1$, so $\\dim\\text{Nul}(A + 2I) = 2 - 1 = 1$: geometric multiplicity $1$ (eigenspace $\\text{span}\\{[0, 1]^T\\}$). So III is true, and II is false: there is only one independent eigenvector.\nI is false: a repeated eigenvalue is exactly the situation where diagonalizability can **fail**, and here it does (GM $<$ AM).\nIV is true: $\\det A = (-2)(-2) = 4 \\neq 0$ (no zero eigenvalue).\nAnswer: III and IV only. Trap: invertible and diagonalizable are independent properties.",
  },
  // E2: parameter for diagonalizability
  {
    subtopic: "Diagonalization",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 0 & h & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}$, where $h$ is a real number. For which values of $h$ is $A$ diagonalizable?",
    options: ["$h \\notin \\{2, 3\\}$", "$h \\neq 2$", "$h \\neq 3$", "All real $h$", "None of the above"],
    answer: 1,
    solution:
      "$A$ is upper triangular, so its eigenvalues are $2, h, 3$.\n- If $h \\notin \\{2, 3\\}$: three distinct eigenvalues, so $A$ is diagonalizable.\n- If $h = 3$: eigenvalues $2, 3, 3$. $A - 3I = \\begin{bmatrix} -1 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ has rank $1$, so $\\dim\\text{Nul}(A - 3I) = 2 =$ AM. Diagonalizable.\n- If $h = 2$: eigenvalues $2, 2, 3$. $A - 2I = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ has rank $2$, so $\\dim\\text{Nul}(A - 2I) = 1 < 2$. Not diagonalizable.\nSo $A$ is diagonalizable exactly when $h \\neq 2$. Option (a) is the trap of assuming every repeated eigenvalue breaks diagonalizability; you must check the rank of $A - \\lambda I$ for each repeated $\\lambda$.",
  },
  // E3: eigenvector checks and A^k v (cf. AY25/26 S1 Q16)
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 2 \\end{bmatrix}$. Which of the following statements are correct?\n- I. $[2, 3]^T$ is an eigenvector of $A$ with eigenvalue $4$.\n- II. $A^k[-2, 2]^T = (-1)^k[-2, 2]^T$ for every positive integer $k$.\n- III. $[1, 1]^T$ is an eigenvector of $A$.\n- IV. $A^3[3, 2]^T = [127, 193]^T$.",
    options: ["I and II only", "I, II and IV only", "II and III only", "I, III and IV only", "All of the above"],
    answer: 1,
    solution:
      "I: $A[2, 3]^T = [2 + 6, 6 + 6]^T = [8, 12]^T = 4[2, 3]^T$. True.\nII: $A[-2, 2]^T = [-2 + 4, -6 + 4]^T = [2, -2]^T = -1 \\cdot [-2, 2]^T$, so $[-2, 2]^T$ is an eigenvector for $\\lambda = -1$ and $A^k[-2, 2]^T = (-1)^k[-2, 2]^T$. True.\nIII: $A[1, 1]^T = [3, 5]^T$, not a multiple of $[1, 1]^T$. False.\nIV: write $[3, 2]^T = c_1[2, 3]^T + c_2[1, -1]^T$: $2c_1 + c_2 = 3$, $3c_1 - c_2 = 2$ give $c_1 = c_2 = 1$. Then $A^3[3, 2]^T = 4^3[2, 3]^T + (-1)^3[1, -1]^T = [128 - 1, 192 + 1]^T = [127, 193]^T$. True.\nAnswer: I, II and IV only.",
  },
  // E4: y = A^3 x0 from eigen-decomposition (cf. AY25/26 S1 Q17)
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt:
      "A $2 \\times 2$ matrix $A$ has eigenvalues $\\lambda_1 = 2$ and $\\lambda_2 = -3$ with corresponding eigenvectors $\\mathbf{v}_1 = [1, -1]^T$ and $\\mathbf{v}_2 = [2, 1]^T$. Let $\\mathbf{x}_0 = 2\\mathbf{v}_1 - \\tfrac12\\mathbf{v}_2$ and $\\mathbf{y} = A^3\\mathbf{x}_0$. Then $\\mathbf{y} =$",
    options: [
      "$[7, -2.5]^T$",
      "$[-11, -29.5]^T$",
      "$[-62, 50]^T$",
      "$[43, -2.5]^T$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "Apply $A^3$ to each eigen-component separately: $A^3\\mathbf{v}_i = \\lambda_i^3\\mathbf{v}_i$.\n$$\\mathbf{y} = 2(2^3)\\mathbf{v}_1 - \\tfrac12(-3)^3\\mathbf{v}_2 = 16\\mathbf{v}_1 + 13.5\\mathbf{v}_2$$\n$= [16, -16]^T + [27, 13.5]^T = [43, -2.5]^T$.\nTraps: (a) is $A\\mathbf{x}_0$ (power 1); (b) uses $+27$ instead of $(-3)^3 = -27$; (c) swaps the eigenvalues of $\\mathbf{v}_1$ and $\\mathbf{v}_2$. There is no need to build $A$ itself.",
  },
  // E5: Markov chain limit (cf. AY25/26 S2 Q20)
  {
    subtopic: "Markov chains",
    kind: "mcq",
    prompt:
      "Each year the populations (in millions) of two cities evolve as $\\mathbf{x}_{k+1} = A\\mathbf{x}_k$ with $A = \\begin{bmatrix} 0.9 & 0.2 \\\\ 0.1 & 0.8 \\end{bmatrix}$ (each column sums to 1). If $\\mathbf{x}_0 = [5, 1]^T$, then as $k \\to \\infty$, $\\mathbf{x}_k$ tends to",
    options: [
      "$[4, 2]^T$",
      "$[\\tfrac23, \\tfrac13]^T$",
      "$[2, 4]^T$",
      "$[0, 0]^T$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "$\\text{tr}A = 1.7$, $\\det A = 0.72 - 0.02 = 0.7$, so $\\lambda^2 - 1.7\\lambda + 0.7 = (\\lambda - 1)(\\lambda - 0.7) = 0$.\n$\\lambda = 1$: $A - I = \\begin{bmatrix} -0.1 & 0.2 \\\\ 0.1 & -0.2 \\end{bmatrix}$ gives $x_1 = 2x_2$, so $\\mathbf{v}_1 = [2, 1]^T$.\n$\\lambda = 0.7$: $A - 0.7I = \\begin{bmatrix} 0.2 & 0.2 \\\\ 0.1 & 0.1 \\end{bmatrix}$ gives $\\mathbf{v}_2 = [1, -1]^T$.\n$[5, 1]^T = c_1[2, 1]^T + c_2[1, -1]^T$: $2c_1 + c_2 = 5$, $c_1 - c_2 = 1$, so $c_1 = 2$, $c_2 = 1$.\n$\\mathbf{x}_k = 2(1)^k[2, 1]^T + (0.7)^k[1, -1]^T \\to [4, 2]^T$.\nCheck: a column-stochastic matrix preserves the total ($5 + 1 = 6 = 4 + 2$). Option (b) is the steady-state **probability** vector, which forgets to scale by the total population.",
  },
  // E6: Markov with a negative eigenvalue
  {
    subtopic: "Markov chains",
    kind: "tfn",
    prompt:
      "$A = \\begin{bmatrix} 0.25 & 0.75 \\\\ 0.75 & 0.25 \\end{bmatrix}$ is a Markov (column-stochastic) matrix with a negative eigenvalue, so $A^k[1, 0]^T$ does not converge as $k \\to \\infty$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Eigenvalues: $\\text{tr}A = 0.5$, $\\det A = 0.0625 - 0.5625 = -0.5$, so $\\lambda^2 - 0.5\\lambda - 0.5 = (\\lambda - 1)(\\lambda + 0.5) = 0$, with eigenvectors $[1, 1]^T$ ($\\lambda = 1$) and $[1, -1]^T$ ($\\lambda = -0.5$).\n$[1, 0]^T = \\tfrac12[1, 1]^T + \\tfrac12[1, -1]^T$, so $A^k[1, 0]^T = \\tfrac12[1, 1]^T + \\tfrac12(-0.5)^k[1, -1]^T$.\nThe second term alternates in sign but its size $0.5^{k+1} \\to 0$, so $A^k[1, 0]^T \\to [0.5, 0.5]^T$. A negative eigenvalue only prevents convergence when $|\\lambda| \\ge 1$. **False.**",
  },
  // E7: find c and A from eigenpairs and A^2 x
  {
    subtopic: "Diagonalization",
    kind: "mcq",
    prompt:
      "A $2 \\times 2$ matrix $A$ has eigenvector $[1, 1]^T$ with eigenvalue $2$, and eigenvector $[1, -1]^T$ with eigenvalue $c$. It is known that $A^2[3, 1]^T = [17, -1]^T$ and $\\det A < 0$. Then $A =$",
    options: [
      "$\\begin{bmatrix} 5/2 & -1/2 \\\\ -1/2 & 5/2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 0 \\\\ 0 & -3 \\end{bmatrix}$",
      "$\\begin{bmatrix} -1/2 & 5/2 \\\\ 5/2 & -1/2 \\end{bmatrix}$",
      "$\\begin{bmatrix} -7/2 & 11/2 \\\\ 11/2 & -7/2 \\end{bmatrix}$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$[3, 1]^T = 2[1, 1]^T + 1[1, -1]^T$, so $A^2[3, 1]^T = 2 \\cdot 2^2[1, 1]^T + c^2[1, -1]^T = [8 + c^2,\\ 8 - c^2]^T$.\nSetting this equal to $[17, -1]^T$ gives $c^2 = 9$, so $c = \\pm 3$. The extra condition decides the sign: $\\det A = 2c < 0$, so $c = -3$.\nWith $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}$, $P^{-1} = \\tfrac12 P$ and $D = \\text{diag}(2, -3)$:\n$$A = PDP^{-1} = \\tfrac12\\begin{bmatrix} 2 + c & 2 - c \\\\ 2 - c & 2 + c \\end{bmatrix} = \\begin{bmatrix} -1/2 & 5/2 \\\\ 5/2 & -1/2 \\end{bmatrix}.$$\nCheck: $A[1, -1]^T = [-3, 3]^T = -3[1, -1]^T$. Option (a) is $c = +3$ (ignores $\\det A < 0$), (b) is $D$ itself, and (d) uses $c = -9$ (forgot that $A^2$ squares $c$).",
  },
  // E8: [0 c; c 0] decomposition
  {
    subtopic: "Diagonalization",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 0 & c \\\\ c & 0 \\end{bmatrix}$ with $c$ a nonzero real number. Which of the following statements are correct?\n- I. $A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}$ and $D = \\begin{bmatrix} c & 0 \\\\ 0 & -c \\end{bmatrix}$.\n- II. $A^{2k} = c^{2k}I$ for every positive integer $k$.\n- III. If $|c| < 1$, then $A^k\\mathbf{x} \\to \\mathbf{0}$ as $k \\to \\infty$ for every $\\mathbf{x} \\in \\mathbb{R}^2$.\n- IV. $A^{2k+1} = c^{2k+1}I$ for every positive integer $k$.",
    options: ["I and II only", "I and III only", "II and IV only", "I, II and III only", "All of the above"],
    answer: 3,
    solution:
      "I: $A[1, 1]^T = [c, c]^T = c[1, 1]^T$ and $A[1, -1]^T = [-c, c]^T = -c[1, -1]^T$, so the columns of $P$ are eigenvectors for $c$ and $-c$, matching $D$. True.\nII: $A^2 = PD^2P^{-1} = P(c^2I)P^{-1} = c^2I$, so $A^{2k} = (c^2I)^k = c^{2k}I$. True.\nIII: both eigenvalues $\\pm c$ have modulus $|c| < 1$, so every term $c_i\\lambda_i^k\\mathbf{v}_i \\to \\mathbf{0}$. True.\nIV: $A^{2k+1} = A^{2k}A = c^{2k}A$, which is **not** a multiple of $I$ (it has zero diagonal). False.\nAnswer: I, II and III only.",
  },
  // E9: complex eigenvalues (cf. AY24/25 S2 Q19)
  {
    subtopic: "Complex eigenvalues",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 1 & -3 \\\\ 1 & 3 \\end{bmatrix}$. Which of the following is correct?",
    options: [
      "$\\lambda = 2 \\pm \\sqrt{2}\\,j$ and $|\\lambda| = \\sqrt{6} > 1$",
      "$\\lambda = 2 \\pm 2\\sqrt{2}\\,j$ and $|\\lambda| = \\sqrt{12} > 1$",
      "$\\lambda = -2 \\pm \\sqrt{2}\\,j$ and $|\\lambda| = \\sqrt{6} > 1$",
      "$\\lambda = 2 \\pm \\sqrt{2}\\,j$ and $|\\lambda| = 6 > 1$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "$\\text{tr}A = 4$ and $\\det A = 3 - (-3)(1) = 6$, so $\\lambda^2 - 4\\lambda + 6 = 0$ and\n$$\\lambda = \\frac{4 \\pm \\sqrt{16 - 24}}{2} = \\frac{4 \\pm 2\\sqrt{2}\\,j}{2} = 2 \\pm \\sqrt{2}\\,j.$$\n$|\\lambda| = \\sqrt{4 + 2} = \\sqrt{6}$ (also $= \\sqrt{\\det A}$, since $\\lambda\\bar\\lambda = \\det A$). Since $\\sqrt6 > 1$, $A^k\\mathbf{x}$ spirals outward.\nTraps: (b) forgets to divide $\\sqrt{-8}$ by $2$; (c) has the sign of the trace wrong; (d) gives $|\\lambda|^2$ instead of $|\\lambda|$.",
  },
  // E10: when ||X_t|| -> 0 (cf. AY24/25 S2 Q20)
  {
    subtopic: "Dynamical systems",
    kind: "mcq",
    prompt:
      "Consider $X_{t+1} = AX_t$ with $A = \\begin{bmatrix} 0.5 & 1 \\\\ 0 & k \\end{bmatrix}$, $k$ real. For which values of $k$ does $\\|X_t\\| \\to 0$ as $t \\to \\infty$ for **every** initial vector $X_0$?",
    options: ["$0 \\le k < 1$", "$|k| < 1$", "$k < 1$", "$|k| < 0.5$", "None of the above"],
    answer: 1,
    solution:
      "$A$ is triangular, so its eigenvalues are $0.5$ and $k$.\nIf $k \\neq 0.5$ the eigenvalues are distinct, $A$ is diagonalizable, and $X_t = c_1(0.5)^t\\mathbf{v}_1 + c_2k^t\\mathbf{v}_2$. Every such $X_t$ tends to $\\mathbf{0}$ iff $|0.5| < 1$ and $|k| < 1$. If $|k| \\ge 1$, the choice $X_0 = \\mathbf{v}_2$ does not decay.\nIf $k = 0.5$: $A = 0.5I + N$ with $N = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$, $N^2 = 0$, so $A^t = 0.5^tI + t(0.5)^{t-1}N \\to 0$ as well.\nSo the condition is $|k| < 1$. Option (c) wrongly allows e.g. $k = -2$, whose term $(-2)^t$ blows up with alternating sign; the test is on $|\\lambda|$, not $\\lambda$.",
  },
  // E11: which X0 decays
  {
    subtopic: "Dynamical systems",
    kind: "mcq",
    prompt:
      "Consider $X_{t+1} = AX_t$ with $A = \\begin{bmatrix} 0.8 & 0.2 \\\\ 0.4 & 1 \\end{bmatrix}$. For which of the following initial vectors $X_0$ does $\\|X_t\\| \\to 0$ as $t \\to \\infty$?",
    options: ["$[1, 2]^T$", "$[2, 1]^T$", "$[1, 1]^T$", "$[3, 0]^T$", "None of the above"],
    answer: 4,
    solution:
      "$\\text{tr}A = 1.8$, $\\det A = 0.8 - 0.08 = 0.72$, so $\\lambda^2 - 1.8\\lambda + 0.72 = (\\lambda - 1.2)(\\lambda - 0.6) = 0$.\n$\\lambda = 1.2$: $A - 1.2I = \\begin{bmatrix} -0.4 & 0.2 \\\\ 0.4 & -0.2 \\end{bmatrix}$ gives $\\mathbf{v}_1 = [1, 2]^T$. $\\lambda = 0.6$: $A - 0.6I = \\begin{bmatrix} 0.2 & 0.2 \\\\ 0.4 & 0.4 \\end{bmatrix}$ gives $\\mathbf{v}_2 = [1, -1]^T$.\n$X_t = c_1(1.2)^t\\mathbf{v}_1 + c_2(0.6)^t\\mathbf{v}_2 \\to \\mathbf{0}$ only if $c_1 = 0$, i.e. $X_0$ is a multiple of $[1, -1]^T$.\nCheck the options: $[1, 2]^T = \\mathbf{v}_1$; $[2, 1]^T = \\mathbf{v}_1 + \\mathbf{v}_2$; $[1, 1]^T = \\tfrac23\\mathbf{v}_1 + \\tfrac13\\mathbf{v}_2$; $[3, 0]^T = \\mathbf{v}_1 + 2\\mathbf{v}_2$. All have $c_1 \\neq 0$, so all blow up. None of the above (e.g. $[2, -2]^T$ would work).",
  },
  // E12: six statements (cf. AY25/26 S2 Q16)
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "mcq",
    prompt:
      "Let $A$ and $B$ be $n \\times n$ matrices. Which of the following statements are correct?\n- I. If $A$ is invertible and $\\lambda$ is an eigenvalue of $A$, then $1/\\lambda$ is an eigenvalue of $A^{-1}$.\n- II. $A$ and $A^T$ have the same eigenvectors.\n- III. If $A$ is invertible, then $A$ is diagonalizable.\n- IV. Eigenvectors of $A$ corresponding to distinct eigenvalues are linearly independent.\n- V. If $A^2 = A$, then every eigenvalue of $A$ is $0$ or $1$.\n- VI. If $\\lambda$ is an eigenvalue of $A$ and $\\mu$ is an eigenvalue of $B$, then $\\lambda + \\mu$ is an eigenvalue of $A + B$.",
    options: ["I, IV and V only", "I, II, IV and V only", "I, III and IV only", "IV and V only", "All of the above"],
    answer: 0,
    solution:
      "I: $\\lambda \\neq 0$ (invertible) and $A\\mathbf{v} = \\lambda\\mathbf{v} \\Rightarrow \\mathbf{v} = \\lambda A^{-1}\\mathbf{v} \\Rightarrow A^{-1}\\mathbf{v} = \\tfrac1\\lambda\\mathbf{v}$. True.\nII: $A$ and $A^T$ share eigen**values**, not eigenvectors. E.g. $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 2 \\end{bmatrix}$ has eigenvector $[1, 1]^T$ for $2$, but $A^T[1, 1]^T = [1, 3]^T$. False.\nIII: $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ is invertible but has only one independent eigenvector. False.\nIV: standard theorem. True.\nV: $A\\mathbf{v} = \\lambda\\mathbf{v} \\Rightarrow A^2\\mathbf{v} = \\lambda^2\\mathbf{v}$, and $A^2\\mathbf{v} = A\\mathbf{v} = \\lambda\\mathbf{v}$, so $\\lambda^2 = \\lambda$, i.e. $\\lambda \\in \\{0, 1\\}$. True.\nVI: $A = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$, $B = \\begin{bmatrix} 0 & 0 \\\\ 1 & 0 \\end{bmatrix}$ both have only eigenvalue $0$, but $A + B = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$ has eigenvalues $\\pm 1$. False (eigenvalues add only when $A$ and $B$ share eigenvectors).\nAnswer: I, IV and V only.",
  },
  // E13: A^T A statements (cf. AY25/26 S2 Q17)
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "mcq",
    prompt:
      "Let $A$ be a real $m \\times n$ matrix. Which of the following statements are correct?\n- I. $A^TA$ is symmetric.\n- II. $\\mathbf{x}^TA^TA\\mathbf{x} = \\|A\\mathbf{x}\\|^2$ for every $\\mathbf{x} \\in \\mathbb{R}^n$.\n- III. Every eigenvalue of $A^TA$ is non-negative.\n- IV. If $A\\mathbf{v} = \\mathbf{0}$ for some $\\mathbf{v} \\neq \\mathbf{0}$, then $\\mathbf{v}$ is an eigenvector of $A^TA$ with eigenvalue $0$.\n- V. If $m = n$, the eigenvalues of $A^TA$ are the squares of the eigenvalues of $A$.",
    options: ["I and II only", "I, II and III only", "I, II, III and IV only", "All of the above", "II, III and V only"],
    answer: 2,
    solution:
      "I: $(A^TA)^T = A^T(A^T)^T = A^TA$. True.\nII: $\\mathbf{x}^TA^TA\\mathbf{x} = (A\\mathbf{x})^T(A\\mathbf{x}) = \\|A\\mathbf{x}\\|^2$. True.\nIII: if $A^TA\\mathbf{v} = \\mu\\mathbf{v}$ with $\\mathbf{v} \\neq \\mathbf{0}$, then by II $\\mu\\|\\mathbf{v}\\|^2 = \\mathbf{v}^TA^TA\\mathbf{v} = \\|A\\mathbf{v}\\|^2 \\ge 0$, so $\\mu \\ge 0$. True.\nIV: $A^TA\\mathbf{v} = A^T\\mathbf{0} = \\mathbf{0} = 0\\mathbf{v}$ with $\\mathbf{v} \\neq \\mathbf{0}$. True.\nV: $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ has eigenvalues $1, 1$, but $A^TA = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ has eigenvalues $\\frac{3 \\pm \\sqrt5}{2} \\approx 2.618, 0.382$. False (it holds for symmetric $A$, not in general).\nAnswer: I, II, III and IV only.",
  },
  // E14: TFN multiplicities
  {
    subtopic: "Multiplicity",
    kind: "tfn",
    prompt: "A $3 \\times 3$ matrix $A$ has eigenvalues $0, 3, 3$ and $\\text{rank}\\,A = 2$. Then $A$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "$\\text{rank}\\,A = 2$ only tells you $\\dim\\text{Nul}(A - 0I) = 1$, i.e. about the eigenvalue $0$, which is simple anyway. Diagonalizability hinges on the **repeated** eigenvalue $3$: is $\\dim\\text{Nul}(A - 3I) = 2$?\n$\\text{diag}(0, 3, 3)$ has rank 2 and is diagonalizable. $\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 3 & 1 \\\\ 0 & 0 & 3 \\end{bmatrix}$ also has rank 2 and eigenvalues $0, 3, 3$, but $A - 3I$ has rank 2, so the eigenspace for $3$ is only 1-dimensional and it is not diagonalizable. **Not enough information.**",
  },
  // E15: TFN from A u = lambda u data
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt:
      "A $2 \\times 2$ matrix $A$ satisfies $A\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 6 \\end{bmatrix}$ and $A\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -2 \\\\ -1 \\end{bmatrix}$. Then $A$ is diagonalizable and $\\det A = -3$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$[3, 6]^T = 3[1, 2]^T$ and $[-2, -1]^T = -1 \\cdot [2, 1]^T$, so $[1, 2]^T$ and $[2, 1]^T$ are eigenvectors with eigenvalues $3$ and $-1$.\nTwo distinct eigenvalues for a $2 \\times 2$ matrix, so $A$ is diagonalizable: $A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}$, $D = \\text{diag}(3, -1)$.\n$\\det A = \\det D = 3 \\cdot (-1) = -3$. **True.** You never need $A$'s entries: recognise each given product as a multiple of its input.",
  },
  // E16: TFN non-triangular defective matrix
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "The matrix $A = \\begin{bmatrix} 4 & -1 \\\\ 1 & 2 \\end{bmatrix}$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$\\text{tr}A = 6$, $\\det A = 8 + 1 = 9$, so $\\lambda^2 - 6\\lambda + 9 = (\\lambda - 3)^2$: a repeated eigenvalue $3$ (AM $= 2$).\n$A - 3I = \\begin{bmatrix} 1 & -1 \\\\ 1 & -1 \\end{bmatrix}$ has rank $1$, so $\\dim\\text{Nul}(A - 3I) = 1$ (eigenspace $\\text{span}\\{[1, 1]^T\\}$). GM $= 1 < 2 =$ AM, so there are not two independent eigenvectors. **False.** (A $2 \\times 2$ matrix with a repeated eigenvalue is diagonalizable only if it is already $\\lambda I$.)",
  },
  // E17: which is not an eigenvector
  {
    subtopic: "Eigenvectors",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{bmatrix}$. Which of the following is **not** an eigenvector of $A$?",
    options: [
      "$[1, -1, 0]^T$",
      "$[1, 1, -2]^T$",
      "$[2, 2, 2]^T$",
      "$[1, 2, 1]^T$",
      "Every vector listed in (a)–(d) is an eigenvector of $A$",
    ],
    answer: 3,
    solution:
      "$A = I + J$ where $J$ is the all-ones matrix. $J\\mathbf{x} = (x_1 + x_2 + x_3)[1, 1, 1]^T$.\n- If $x_1 + x_2 + x_3 = 0$, then $A\\mathbf{x} = \\mathbf{x}$: eigenvalue $1$. This covers $[1, -1, 0]^T$ and $[1, 1, -2]^T$.\n- $A[2, 2, 2]^T = [8, 8, 8]^T = 4[2, 2, 2]^T$: eigenvalue $4$.\n- $A[1, 2, 1]^T = [5, 6, 5]^T$, which is not a multiple of $[1, 2, 1]^T$.\nSo $[1, 2, 1]^T$ is not an eigenvector. (The eigenspace for $1$ is the plane $x_1 + x_2 + x_3 = 0$; any nonzero vector in it qualifies.)",
  },
  // E18: A^2025 for an involution
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt: "Let $A = \\begin{bmatrix} 3 & -4 \\\\ 2 & -3 \\end{bmatrix}$. Then $A^{2025} =$",
    options: [
      "$I$",
      "$-A$",
      "$A$",
      "$\\begin{bmatrix} 3^{2025} & (-4)^{2025} \\\\ 2^{2025} & (-3)^{2025} \\end{bmatrix}$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$\\text{tr}A = 0$ and $\\det A = -9 + 8 = -1$, so $\\lambda^2 - 1 = 0$: eigenvalues $1$ and $-1$ (distinct, so $A = PDP^{-1}$ with $D = \\text{diag}(1, -1)$).\nThen $A^2 = PD^2P^{-1} = PIP^{-1} = I$ (directly: $A^2 = \\begin{bmatrix} 9 - 8 & -12 + 12 \\\\ 6 - 6 & -8 + 9 \\end{bmatrix} = I$).\nSo $A^{2025} = (A^2)^{1012}A = A$. Option (d) raises entries to a power, which only works for diagonal matrices; (a) would be right for an even exponent.",
  },
  // E19: det of a polynomial in A
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "mcq",
    prompt: "A $3 \\times 3$ matrix $A$ has eigenvalues $1, -1, 2$. What is $\\det(A^2 + A + I)$?",
    options: ["$3$", "$7$", "$11$", "$-21$", "None of the above"],
    answer: 4,
    solution:
      "If $A\\mathbf{v} = \\lambda\\mathbf{v}$ then $(A^2 + A + I)\\mathbf{v} = (\\lambda^2 + \\lambda + 1)\\mathbf{v}$, so the eigenvalues of $A^2 + A + I$ are\n$1 + 1 + 1 = 3$, $\\ 1 - 1 + 1 = 1$, $\\ 4 + 2 + 1 = 7$.\nThe determinant is their product: $3 \\cdot 1 \\cdot 7 = 21$, which is not listed.\nTraps: (a) computes $(\\det A)^2 + \\det A + 1 = 4 - 2 + 1 = 3$ (determinant is not additive); (c) is the **sum** $3 + 1 + 7$, i.e. the trace.",
  },
  // E20: complex eigenvalues, period-4 powers
  {
    subtopic: "Complex eigenvalues",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 2 & -5 \\\\ 1 & -2 \\end{bmatrix}$. Which of the following statements are correct?\n- I. The eigenvalues of $A$ are $\\pm j$.\n- II. $A^2 = -I$.\n- III. $A^k\\mathbf{x} \\to \\mathbf{0}$ as $k \\to \\infty$ for every $\\mathbf{x} \\in \\mathbb{R}^2$.\n- IV. $A^{2026} = -I$.",
    options: ["I and II only", "I, II and III only", "II and IV only", "I, II and IV only", "All of the above"],
    answer: 3,
    solution:
      "I: $\\text{tr}A = 0$, $\\det A = -4 + 5 = 1$, so $\\lambda^2 + 1 = 0$ and $\\lambda = \\pm j$. True.\nII: $A^2 = \\begin{bmatrix} 4 - 5 & -10 + 10 \\\\ 2 - 2 & -5 + 4 \\end{bmatrix} = -I$. True. (Equivalently, $A$ satisfies its characteristic equation $\\lambda^2 + 1 = 0$.)\nIII: $|\\lambda| = 1$, so nothing decays; in fact $A^4 = (A^2)^2 = I$, so $A^k\\mathbf{x}$ cycles with period 4. False.\nIV: $A^{2026} = (A^2)^{1013} = (-I)^{1013} = -I$. True.\nAnswer: I, II and IV only.",
  },
  // E21: limit of A^k x when A is given (eigenvectors must be found)
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1.5 & -1 \\\\ 0.5 & 0 \\end{bmatrix}$. As $k \\to \\infty$, $A^k\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}$ tends to",
    options: ["$[0, 0]^T$", "$[-2, -1]^T$", "$[2, 1]^T$", "$[5, 5]^T$", "None of the above"],
    answer: 1,
    solution:
      "$\\text{tr}A = 1.5$, $\\det A = 0.5$, so $\\lambda^2 - 1.5\\lambda + 0.5 = (\\lambda - 1)(\\lambda - 0.5) = 0$.\n$\\lambda = 1$: $A - I = \\begin{bmatrix} 0.5 & -1 \\\\ 0.5 & -1 \\end{bmatrix}$ gives $\\mathbf{v}_1 = [2, 1]^T$. $\\lambda = 0.5$: $A - 0.5I = \\begin{bmatrix} 1 & -1 \\\\ 0.5 & -0.5 \\end{bmatrix}$ gives $\\mathbf{v}_2 = [1, 1]^T$.\n$[3, 4]^T = c_1[2, 1]^T + c_2[1, 1]^T$: $2c_1 + c_2 = 3$, $c_1 + c_2 = 4$, so $c_1 = -1$, $c_2 = 5$.\n$A^k[3, 4]^T = -1(1)^k[2, 1]^T + 5(0.5)^k[1, 1]^T \\to -[2, 1]^T = [-2, -1]^T$.\nTraps: (c) drops the sign of $c_1$; (d) keeps the decaying $\\lambda = 0.5$ term instead of the $\\lambda = 1$ term.",
  },
];
