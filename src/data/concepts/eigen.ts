import type { ConceptQuestion } from "@/lib/types";
import { TFN_OPTIONS } from "@/lib/types";

// Hand-written conceptual questions for Eigenvalues & Eigenvectors (Lay 5.1-5.6, course Chapter 8.1).
// TFN answers: 0 = True, 1 = False, 2 = Not enough information to determine.

export const eigenConcepts: ConceptQuestion[] = [
  // 1
  {
    subtopic: "Definition",
    kind: "tfn",
    prompt: "If $A\\mathbf{x} = \\lambda \\mathbf{x}$ for some scalar $\\lambda$ and some vector $\\mathbf{x}$, then $\\mathbf{x}$ is an eigenvector of $A$.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "An eigenvector must be **nonzero**. The zero vector satisfies $A\\mathbf{0} = \\lambda\\mathbf{0}$ for every $\\lambda$, so the equation alone does not make $\\mathbf{x}$ an eigenvector. The statement is false because it does not require $\\mathbf{x} \\neq \\mathbf{0}$.",
  },
  // 2
  {
    subtopic: "Characteristic equation",
    kind: "mcq",
    prompt:
      "Given $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$, which statement is **False**?",
    options: [
      "$5$ is an eigenvalue of $A$",
      "$\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$ is an eigenvector of $A$",
      "$\\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}$ is an eigenvector of $A$ for $\\lambda = 2$",
      "The eigenvalues of $A$ are repeated",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$\\det(A - \\lambda I) = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 5)(\\lambda - 2)$, so the eigenvalues are $5$ and $2$, which are distinct. Check: $A[1,1]^T = [5,5]^T = 5[1,1]^T$ and $A[1,-2]^T = [2,-4]^T = 2[1,-2]^T$. So (a), (b), (c) are true and (d) is false.",
  },
  // 3
  {
    subtopic: "Characteristic equation",
    kind: "tfn",
    prompt: "The eigenvalues of a triangular matrix are the entries on its main diagonal.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "For triangular $A$, $A - \\lambda I$ is also triangular, so its determinant is the product of its diagonal entries: $\\det(A - \\lambda I) = (a_{11} - \\lambda)(a_{22} - \\lambda)\\cdots(a_{nn} - \\lambda)$. Its roots are exactly the diagonal entries. This holds for upper and lower triangular matrices (and diagonal ones).",
  },
  // 4
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "A $3 \\times 3$ matrix with eigenvalues $2, 2, 5$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Since $\\lambda = 2$ is repeated, diagonalizability depends on whether its eigenspace $\\text{Nul}(A - 2I)$ is 2-dimensional. $\\text{diag}(2,2,5)$ is diagonalizable, but $\\begin{bmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$ has only a 1-dimensional eigenspace for $2$ and is not. The eigenvalues alone cannot decide it.",
  },
  // 5
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "mcq",
    prompt:
      "A $3 \\times 3$ matrix $A$ has eigenvalues $2, -1, 4$. What are the eigenvalues of $A^{-1}$?",
    options: [
      "$\\tfrac{1}{2}, -1, \\tfrac{1}{4}$",
      "$-2, 1, -4$",
      "$2, -1, 4$",
      "$\\tfrac{1}{2}, 1, \\tfrac{1}{4}$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "No eigenvalue is $0$, so $A$ is invertible. From $A\\mathbf{v} = \\lambda\\mathbf{v}$, multiply by $A^{-1}$ and divide by $\\lambda$: $A^{-1}\\mathbf{v} = \\tfrac{1}{\\lambda}\\mathbf{v}$. So the eigenvalues are the reciprocals $\\tfrac12, -1, \\tfrac14$ (with the same eigenvectors). Note $\\tfrac{1}{-1} = -1$, not $1$.",
  },
  // 6
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "A $3 \\times 3$ matrix with eigenvalues $1, 2, 3$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Eigenvectors for distinct eigenvalues are linearly independent, so three distinct eigenvalues give three independent eigenvectors in $\\mathbb{R}^3$. Putting them as the columns of $P$ gives an invertible $P$ with $A = PDP^{-1}$. Having $n$ distinct eigenvalues is a sufficient condition for diagonalizability.",
  },
  // 7
  {
    subtopic: "Characteristic equation",
    kind: "tfn",
    prompt: "If $0$ is an eigenvalue of $A$, then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$0$ is an eigenvalue exactly when $A\\mathbf{x} = \\mathbf{0}$ has a nonzero solution, i.e. when $\\det(A - 0I) = \\det A = 0$. So $0$ being an eigenvalue means $A$ is **singular**, not invertible.",
  },
  // 8
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "mcq",
    prompt:
      "A $3 \\times 3$ matrix $A$ has eigenvalues $1, -2, 3$. What are the eigenvalues of $A + 3I$?",
    options: [
      "$3, -6, 9$",
      "$4, 1, 6$",
      "$1, -2, 3$",
      "$4, 5, 6$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "If $A\\mathbf{v} = \\lambda\\mathbf{v}$ then $(A + 3I)\\mathbf{v} = A\\mathbf{v} + 3\\mathbf{v} = (\\lambda + 3)\\mathbf{v}$. So every eigenvalue shifts by $3$: $1 + 3 = 4$, $-2 + 3 = 1$, $3 + 3 = 6$. Shifting by $cI$ keeps the same eigenvectors. Option (a) is the trap of multiplying instead of adding.",
  },
  // 9
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "An $n \\times n$ matrix $A$ is diagonalizable if and only if $A$ has $n$ distinct eigenvalues.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Distinct eigenvalues are **sufficient** but not **necessary**. The condition that is both necessary and sufficient is that $A$ has $n$ linearly independent eigenvectors. For example $I_n$ is diagonal (so diagonalizable) but has only one eigenvalue, $1$.",
  },
  // 10
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "tfn",
    prompt: "$A$ and $A + 5I$ have the same eigenvectors.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$(A + 5I)\\mathbf{v} = \\lambda'\\mathbf{v}$ is the same as $A\\mathbf{v} = (\\lambda' - 5)\\mathbf{v}$. So $\\mathbf{v}$ is an eigenvector of $A + 5I$ exactly when it is an eigenvector of $A$; only the eigenvalues shift by $5$. Equivalently, $(A + 5I) - (\\lambda + 5)I = A - \\lambda I$, so the eigenspaces are identical.",
  },
  // 11
  {
    subtopic: "Trace and determinant",
    kind: "mcq",
    prompt:
      "A $3 \\times 3$ matrix $A$ has eigenvalues $1, -2, 3$. What is $\\det(2A)$?",
    options: [
      "$-12$",
      "$48$",
      "$-48$",
      "$-6$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$\\det A$ is the product of the eigenvalues: $1 \\cdot (-2) \\cdot 3 = -6$. For an $n \\times n$ matrix, $\\det(cA) = c^n \\det A$, so $\\det(2A) = 2^3(-6) = -48$. Equivalently, $2A$ has eigenvalues $2, -4, 6$, whose product is $-48$. Option (a) forgets that the $2$ scales every row.",
  },
  // 12
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "If $A$ is diagonalizable, then $A$ is invertible.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Diagonalizability depends on having enough eigenvectors. Invertibility depends on whether $0$ is an eigenvalue. These are separate conditions. $\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}$ is already diagonal but is singular, so the statement is false.",
  },
  // 13
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "If $A$ is invertible, then $A$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "$A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ has $\\det A = 1$, so it is invertible. Its only eigenvalue is $1$ with $\\text{Nul}(A - I) = \\text{span}\\{[1,0]^T\\}$, which is 1-dimensional. So it lacks 2 independent eigenvectors and is not diagonalizable. Invertibility and diagonalizability are independent properties.",
  },
  // 14
  {
    subtopic: "Complex eigenvalues",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} \\sqrt{3} & -1 \\\\ 1 & \\sqrt{3} \\end{bmatrix}$. Geometrically, the map $\\mathbf{x} \\mapsto A\\mathbf{x}$ is:",
    options: [
      "a rotation by $60^\\circ$ followed by scaling by $2$",
      "a rotation by $30^\\circ$ followed by scaling by $4$",
      "a rotation by $30^\\circ$ followed by scaling by $\\sqrt{3}$",
      "a rotation by $60^\\circ$ followed by scaling by $4$",
      "None of the above",
    ],
    answer: 4,
    solution:
      "$A$ has the rotation-scaling form $\\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix}$ with $a = \\sqrt{3}$, $b = 1$, so $\\lambda = \\sqrt{3} \\pm j$. The scale is $r = |\\lambda| = \\sqrt{3 + 1} = 2$ and the angle is $\\varphi = \\tan^{-1}(1/\\sqrt{3}) = 30^\\circ$. So the correct answer, rotation by $30^\\circ$ with scaling by $2$, is not listed.",
  },
  // 15
  {
    subtopic: "Similarity",
    kind: "tfn",
    prompt: "Similar matrices have the same eigenvalues.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "If $B = P^{-1}AP$ then $B - \\lambda I = P^{-1}(A - \\lambda I)P$, so $\\det(B - \\lambda I) = \\det(P^{-1})\\det(A - \\lambda I)\\det(P) = \\det(A - \\lambda I)$. Similar matrices have the same characteristic polynomial, so they have the same eigenvalues with the same algebraic multiplicities.",
  },
  // 16
  {
    subtopic: "Similarity",
    kind: "tfn",
    prompt: "If $A$ and $B$ are similar, then they have the same eigenvectors.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "If $B = P^{-1}AP$ and $A\\mathbf{v} = \\lambda\\mathbf{v}$, then $B(P^{-1}\\mathbf{v}) = P^{-1}A\\mathbf{v} = \\lambda P^{-1}\\mathbf{v}$. So the eigenvector of $B$ is $P^{-1}\\mathbf{v}$, which is generally a different vector. Similarity preserves eigenvalues but not eigenvectors.",
  },
  // 17
  {
    subtopic: "Complex eigenvalues",
    kind: "mcq",
    prompt:
      "Let $A = \\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix}$. What is $A^8$?",
    options: [
      "$8I$",
      "$16I$",
      "$-16I$",
      "$256I$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "$A$ has the form $\\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix}$ with $\\lambda = 1 \\pm j$, $r = \\sqrt{2}$, $\\varphi = 45^\\circ$. So $A$ rotates by $45^\\circ$ and scales by $\\sqrt{2}$. $A^8$ rotates by $8 \\times 45^\\circ = 360^\\circ$, which is no rotation, and scales by $(\\sqrt{2})^8 = 16$. So $A^8 = 16I$. As a check, $A^4 = -4I$, so $A^8 = (-4I)^2 = 16I$.",
  },
  // 18
  {
    subtopic: "Eigenvalues of related matrices",
    kind: "tfn",
    prompt: "A square matrix $A$ and its transpose $A^T$ have the same eigenvalues.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "$\\det(A^T - \\lambda I) = \\det\\big((A - \\lambda I)^T\\big) = \\det(A - \\lambda I)$, so $A$ and $A^T$ have the same characteristic polynomial and the same eigenvalues. Their eigenvectors are generally **different**, though.",
  },
  // 19
  {
    subtopic: "Characteristic equation",
    kind: "tfn",
    prompt:
      "If $U$ is an echelon form of $A$ obtained by row operations, then $A$ and $U$ have the same eigenvalues.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "Row operations preserve the solution set of $A\\mathbf{x} = \\mathbf{0}$, but they do **not** preserve eigenvalues. For example $A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$ has eigenvalues $0, 2$, but $R_2 \\to R_2 - R_1$ gives $\\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}$ with eigenvalues $1, 0$. Do not read eigenvalues off the diagonal of a row-reduced matrix.",
  },
  // 20
  {
    subtopic: "Similarity",
    kind: "mcq",
    prompt:
      "Which of the following matrices is similar to $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}$?",
    options: [
      "$\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 2 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & 0 \\\\ 0 & 0 \\end{bmatrix}$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "$A$ is triangular with distinct eigenvalues $1, 3$, so it is diagonalizable and therefore similar to $\\text{diag}(1,3)$. Swapping the columns of $P$ shows it is also similar to $\\text{diag}(3,1)$. The other options have different eigenvalues: (a) $1,1$; (c) $1,4$; (d) $4,0$. Similar matrices must share eigenvalues, so those cannot be similar to $A$.",
  },
  // 21
  {
    subtopic: "Linear independence",
    kind: "tfn",
    prompt:
      "If $\\mathbf{v}_1$ and $\\mathbf{v}_2$ are eigenvectors of $A$ corresponding to distinct eigenvalues, then $\\{\\mathbf{v}_1, \\mathbf{v}_2\\}$ is linearly independent.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "This is a theorem (Lay Thm 5.2). Suppose $\\mathbf{v}_2 = c\\mathbf{v}_1$. Then applying $A$ gives $\\lambda_2 c\\mathbf{v}_1 = \\lambda_1 c\\mathbf{v}_1$, so $c(\\lambda_2 - \\lambda_1)\\mathbf{v}_1 = \\mathbf{0}$. Since $\\lambda_1 \\neq \\lambda_2$ and $\\mathbf{v}_1 \\neq \\mathbf{0}$, $c = 0$, which would make $\\mathbf{v}_2 = \\mathbf{0}$, a contradiction. The result extends to any number of distinct eigenvalues.",
  },
  // 22
  {
    subtopic: "Diagonalization",
    kind: "mcq",
    prompt: "Which of the following matrices is **not** diagonalizable?",
    options: [
      "$\\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 3 \\\\ 0 & 5 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & 1 \\\\ 0 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "(a) is already diagonal. (b) has distinct eigenvalues $2, 5$. (d) has distinct eigenvalues $\\pm 1$. In (c), $\\lambda = 4$ has algebraic multiplicity 2, but $A - 4I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$ has rank 1, so the eigenspace is only 1-dimensional. There are not enough independent eigenvectors, so (c) is not diagonalizable.",
  },
  // 23
  {
    subtopic: "Complex eigenvalues",
    kind: "tfn",
    prompt: "A real $2 \\times 2$ matrix has eigenvalue $3 + 2j$. Then $3 - 2j$ is also an eigenvalue.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "A real matrix has a characteristic polynomial with real coefficients, so its non-real roots come in conjugate pairs. If $A\\mathbf{v} = \\lambda\\mathbf{v}$, taking conjugates gives $A\\bar{\\mathbf{v}} = \\bar{\\lambda}\\bar{\\mathbf{v}}$. So $3 - 2j$ is an eigenvalue with eigenvector $\\bar{\\mathbf{v}}$.",
  },
  // 24
  {
    subtopic: "Complex eigenvalues",
    kind: "tfn",
    prompt: "A real $3 \\times 3$ matrix can have three eigenvalues that are all non-real.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "The characteristic polynomial is a real cubic, and non-real roots come in conjugate pairs. So the number of non-real eigenvalues is even (0 or 2), and at least one eigenvalue of a real $3 \\times 3$ matrix is real. (Equivalently, every real cubic crosses the $\\lambda$-axis.)",
  },
  // 25
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt:
      "A $3 \\times 3$ matrix $A$ has eigenpairs $\\lambda_1 = 2,\\ \\mathbf{v}_1 = [1, -1, 1]^T$; $\\lambda_2 = 1,\\ \\mathbf{v}_2 = [1, 1, 0]^T$; $\\lambda_3 = 0.5,\\ \\mathbf{v}_3 = [0, 0, 1]^T$. Let $\\mathbf{x} = -\\mathbf{v}_1 + 2\\mathbf{v}_2 + 4\\mathbf{v}_3$. As $k \\to +\\infty$, $A^k\\mathbf{x}$ tends to:",
    options: [
      "$[+\\infty, -\\infty, +\\infty]^T$",
      "$[-\\infty, +\\infty, -\\infty]^T$",
      "$[2, 2, 0]^T$",
      "$[0, 0, 0]^T$",
      "None of the above",
    ],
    answer: 1,
    solution:
      "$A^k\\mathbf{x} = -1(2)^k\\mathbf{v}_1 + 2(1)^k\\mathbf{v}_2 + 4(0.5)^k\\mathbf{v}_3$. The $\\mathbf{v}_3$ term decays to $\\mathbf{0}$ and the $\\mathbf{v}_2$ term stays at $[2,2,0]^T$, but the $\\mathbf{v}_1$ term has $|\\lambda_1| = 2 > 1$ and a nonzero coefficient, so it dominates. Since $-2^k[1,-1,1]^T = [-2^k, 2^k, -2^k]^T$, the entries go to $[-\\infty, +\\infty, -\\infty]^T$. The negative coefficient flips every sign of $\\mathbf{v}_1$.",
  },
  // 26
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt:
      "Same $A$ as before: eigenpairs $\\lambda_1 = 2,\\ \\mathbf{v}_1 = [1, -1, 1]^T$; $\\lambda_2 = 1,\\ \\mathbf{v}_2 = [1, 1, 0]^T$; $\\lambda_3 = 0.5,\\ \\mathbf{v}_3 = [0, 0, 1]^T$. Now let $\\mathbf{x} = 0\\mathbf{v}_1 + 3\\mathbf{v}_2 + 5\\mathbf{v}_3$. As $k \\to +\\infty$, $A^k\\mathbf{x}$ tends to:",
    options: [
      "$[0, 0, 0]^T$",
      "$[+\\infty, -\\infty, +\\infty]^T$",
      "$[3, 3, 5]^T$",
      "$[3, 3, 0]^T$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "$A^k\\mathbf{x} = 3(1)^k\\mathbf{v}_2 + 5(0.5)^k\\mathbf{v}_3$. The coefficient of the dominant eigenvector $\\mathbf{v}_1$ is $0$, so it never appears. The $\\lambda = 1$ term stays fixed at $3\\mathbf{v}_2 = [3,3,0]^T$ and the $\\lambda = 0.5$ term decays to $\\mathbf{0}$. So $A^k\\mathbf{x} \\to [3, 3, 0]^T$.",
  },
  // 27
  {
    subtopic: "Multiplicity",
    kind: "tfn",
    prompt:
      "A $5 \\times 5$ matrix $A$ has eigenvalue $4$ with algebraic multiplicity $3$. Then the eigenspace of $A$ for $\\lambda = 4$ is 3-dimensional.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The geometric multiplicity (dimension of $\\text{Nul}(A - 4I)$) satisfies $1 \\le \\text{geo} \\le \\text{alg} = 3$. It could be 1, 2 or 3 depending on the actual entries of $A$. Without more information about $A$, you cannot tell.",
  },
  // 28
  {
    subtopic: "Multiplicity",
    kind: "tfn",
    prompt: "The geometric multiplicity of an eigenvalue can be larger than its algebraic multiplicity.",
    options: TFN_OPTIONS,
    answer: 1,
    solution:
      "For every eigenvalue, $1 \\le \\dim \\text{Nul}(A - \\lambda I) \\le$ (multiplicity of $\\lambda$ as a root of the characteristic polynomial). The geometric multiplicity can be **smaller**, which is what makes a matrix non-diagonalizable, but never larger.",
  },
  // 29
  {
    subtopic: "Powers of A",
    kind: "mcq",
    prompt:
      "A $2 \\times 2$ matrix $A$ has eigenpairs $\\lambda_1 = -2,\\ \\mathbf{v}_1 = [1, 1]^T$ and $\\lambda_2 = 0.5,\\ \\mathbf{v}_2 = [1, -1]^T$. Let $\\mathbf{x} = \\mathbf{v}_1 + \\mathbf{v}_2$. As $k \\to +\\infty$, $A^k\\mathbf{x}$ tends to:",
    options: [
      "$[+\\infty, +\\infty]^T$",
      "$[-\\infty, -\\infty]^T$",
      "$[0, 0]^T$",
      "$[1, -1]^T$",
      "None of the above",
    ],
    answer: 4,
    solution:
      "$A^k\\mathbf{x} = (-2)^k[1,1]^T + (0.5)^k[1,-1]^T$. The second term decays, but $(-2)^k$ alternates sign: $+4, -8, +16, -32, \\dots$ So the entries swing between large positive and large negative values and do not tend to any limit, not even $\\pm\\infty$. None of the listed limits is correct.",
  },
  // 30
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt:
      "A $4 \\times 4$ matrix $A$ has eigenvalues $1, 1, 3, 3$, with $\\dim \\text{Nul}(A - I) = 2$ and $\\dim \\text{Nul}(A - 3I) = 2$. Then $A$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "Each eigenspace has dimension equal to the algebraic multiplicity ($2$ and $2$), so the eigenspace dimensions add up to $4 = n$. Combining a basis of each eigenspace gives 4 linearly independent eigenvectors, so $A = PDP^{-1}$ with $D = \\text{diag}(1,1,3,3)$.",
  },
  // 31
  {
    subtopic: "Diagonalization",
    kind: "mcq",
    prompt:
      "$A = PDP^{-1}$ with $P = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}$. What is $A^3$?",
    options: [
      "$\\begin{bmatrix} 27 & -1 \\\\ 8 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 8 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 15 & -7 \\\\ 14 & -6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 15 & -6 \\\\ 14 & -7 \\end{bmatrix}$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$A^3 = PD^3P^{-1}$ with $D^3 = \\text{diag}(8, 1)$ and $P^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix}$ ($\\det P = 1$). Then $PD^3 = \\begin{bmatrix} 8 & 1 \\\\ 8 & 2 \\end{bmatrix}$ and $PD^3P^{-1} = \\begin{bmatrix} 16 - 1 & -8 + 1 \\\\ 16 - 2 & -8 + 2 \\end{bmatrix} = \\begin{bmatrix} 15 & -7 \\\\ 14 & -6 \\end{bmatrix}$. Option (a) cubes the entries of $A = \\begin{bmatrix} 3 & -1 \\\\ 2 & 0 \\end{bmatrix}$ one by one, which is wrong. Option (b) is $D^3$, not $A^3$.",
  },
  // 32
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "A $2 \\times 2$ real matrix with trace $5$ and determinant $6$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "For a $2 \\times 2$ matrix, $\\det(A - \\lambda I) = \\lambda^2 - (\\text{tr}A)\\lambda + \\det A = \\lambda^2 - 5\\lambda + 6 = (\\lambda - 2)(\\lambda - 3)$. The eigenvalues $2$ and $3$ are distinct, so there are 2 independent eigenvectors and $A$ is diagonalizable.",
  },
  // 33
  {
    subtopic: "Characteristic equation",
    kind: "mcq",
    prompt:
      "Which vector is an eigenvector of $A = \\begin{bmatrix} 1 & 6 \\\\ 5 & 2 \\end{bmatrix}$?",
    options: [
      "$\\begin{bmatrix} 3 \\\\ -2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 6 \\\\ -5 \\end{bmatrix}$",
      "None of the above",
    ],
    answer: 3,
    solution:
      "Test each vector by computing $A\\mathbf{u}$ and checking whether it is a multiple of $\\mathbf{u}$. $A[6,-5]^T = [6 - 30, 30 - 10]^T = [-24, 20]^T = -4[6,-5]^T$, so it is an eigenvector for $\\lambda = -4$. The others fail: $A[3,-2]^T = [-9,11]^T$, $A[1,2]^T = [13,9]^T$, $A[2,1]^T = [8,12]^T$. (The other eigenvalue is $7$, with eigenvector $[1,1]^T$.)",
  },
  // 34
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "A $2 \\times 2$ real matrix with trace $4$ and determinant $4$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "The characteristic polynomial is $\\lambda^2 - 4\\lambda + 4 = (\\lambda - 2)^2$, so $\\lambda = 2$ is repeated. $2I$ (trace 4, det 4) is diagonalizable, but $\\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$ (also trace 4, det 4) is not. Trace and determinant alone cannot decide it.",
  },
  // 35
  {
    subtopic: "Multiplicity",
    kind: "mcq",
    prompt:
      "For $A = \\begin{bmatrix} 3 & 0 & 0 \\\\ 1 & 3 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}$, what are the algebraic and geometric multiplicities of $\\lambda = 3$?",
    options: [
      "algebraic $2$, geometric $1$",
      "algebraic $2$, geometric $2$",
      "algebraic $1$, geometric $1$",
      "algebraic $3$, geometric $1$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "$A$ is lower triangular, so its eigenvalues are $3, 3, 5$, which makes the algebraic multiplicity of $3$ equal to $2$. $A - 3I = \\begin{bmatrix} 0 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}$ has rank 2, so $\\dim \\text{Nul}(A - 3I) = 3 - 2 = 1$. The geometric multiplicity is 1 (eigenspace $\\text{span}\\{[0,1,0]^T\\}$), so $A$ is not diagonalizable.",
  },
  // 36
  {
    subtopic: "Powers of A",
    kind: "tfn",
    prompt:
      "A $2 \\times 2$ matrix $A$ has eigenvalues $1$ and $0.5$. For a given nonzero vector $\\mathbf{x}$, $A^k\\mathbf{x} \\to \\mathbf{0}$ as $k \\to \\infty$.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "Write $\\mathbf{x} = c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2$ (eigenvalues $1$ and $0.5$). Then $A^k\\mathbf{x} = c_1\\mathbf{v}_1 + c_2(0.5)^k\\mathbf{v}_2 \\to c_1\\mathbf{v}_1$. That limit is $\\mathbf{0}$ only if $c_1 = 0$, i.e. if $\\mathbf{x}$ lies on the $\\lambda = 0.5$ eigenline. Since $\\mathbf{x}$ is not specified, you cannot decide.",
  },
  // 37
  {
    subtopic: "Characteristic equation",
    kind: "mcq",
    prompt:
      "What is the characteristic polynomial of $A = \\begin{bmatrix} 5 & -2 \\\\ 1 & 2 \\end{bmatrix}$?",
    options: [
      "$\\lambda^2 + 7\\lambda + 12$",
      "$\\lambda^2 - 7\\lambda + 8$",
      "$\\lambda^2 - 7\\lambda + 12$",
      "$\\lambda^2 - 3\\lambda + 12$",
      "None of the above",
    ],
    answer: 2,
    solution:
      "$\\det(A - \\lambda I) = (5 - \\lambda)(2 - \\lambda) - (-2)(1) = \\lambda^2 - 7\\lambda + 10 + 2 = \\lambda^2 - 7\\lambda + 12$. As a check, this is $\\lambda^2 - (\\text{tr}A)\\lambda + \\det A$ with $\\text{tr}A = 7$ and $\\det A = 12$. It factors as $(\\lambda - 3)(\\lambda - 4)$. Option (b) is the sign slip $10 - 2$.",
  },
  // 38
  {
    subtopic: "Diagonalization",
    kind: "tfn",
    prompt: "A $3 \\times 3$ matrix whose only eigenvalues are $1$ and $2$ is diagonalizable.",
    options: TFN_OPTIONS,
    answer: 2,
    solution:
      "A $3 \\times 3$ matrix has 3 eigenvalues counted with multiplicity, so one of $1$ or $2$ is repeated. Whether that repeated eigenvalue has a 2-dimensional eigenspace is unknown. $\\text{diag}(1,1,2)$ is diagonalizable, but $\\begin{bmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}$ is not.",
  },
  // 39
  {
    subtopic: "Change of basis",
    kind: "mcq",
    prompt:
      "$A$ is $2 \\times 2$ with eigenvectors $\\mathbf{b}_1 = [1, 1]^T$ ($\\lambda = 2$) and $\\mathbf{b}_2 = [1, -1]^T$ ($\\lambda = -1$). For $\\mathbf{x} = [5, 1]^T$, what is $A\\mathbf{x}$?",
    options: [
      "$[4, 8]^T$",
      "$[10, -1]^T$",
      "$[8, 4]^T$",
      "$[6, -2]^T$",
      "None of the above",
    ],
    answer: 0,
    solution:
      "First find the coordinates of $\\mathbf{x}$ in the eigenvector basis: $c_1 + c_2 = 5$ and $c_1 - c_2 = 1$ give $c_1 = 3$, $c_2 = 2$, so $[\\mathbf{x}]_\\mathcal{B} = [3, 2]^T$. In this basis $A$ acts as $D = \\text{diag}(2, -1)$, so $[A\\mathbf{x}]_\\mathcal{B} = [6, -2]^T$. Converting back gives $A\\mathbf{x} = 6\\mathbf{b}_1 - 2\\mathbf{b}_2 = [6 - 2, 6 + 2]^T = [4, 8]^T$. Option (d) is the $\\mathcal{B}$-coordinates, not $A\\mathbf{x}$ itself.",
  },
  // 40
  {
    subtopic: "Trace and determinant",
    kind: "tfn",
    prompt:
      "A $2 \\times 2$ matrix $A$ has eigenvalues $3$ and $-3$. Then $A^2 = 9I$.",
    options: TFN_OPTIONS,
    answer: 0,
    solution:
      "The eigenvalues $3$ and $-3$ are distinct, so $A = PDP^{-1}$ with $D = \\text{diag}(3, -3)$. Then $A^2 = PD^2P^{-1} = P(9I)P^{-1} = 9I$. Without diagonalizability this would fail (a repeated eigenvalue with too few eigenvectors), but distinct eigenvalues guarantee it here.",
  },
];
