import type { CodingProblem } from "@/lib/sc1001/types";

// Deterministic pseudo-random matrix with values in [-99, 99] (Park–Miller), for the large hidden tests.
function randomMatrix(rows: number, cols: number, seed: number): number[][] {
  let s = seed;
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => {
      s = (s * 48271) % 2147483647;
      return (s % 199) - 99;
    }),
  );
}

const matrixText = (m: number[][]) => m.map((row) => row.join(" ")).join("\n") + "\n";
const transpose = (m: number[][]) => m[0].map((_, j) => m.map((row) => row[j]));
const rotateClockwise = (m: number[][]) => m[0].map((_, j) => m.map((row) => row[j]).reverse());

function spiral(m: number[][]): number[] {
  const out: number[] = [];
  let top = 0, bottom = m.length - 1, left = 0, right = m[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) out.push(m[top][j]);
    for (let i = top + 1; i <= bottom; i++) out.push(m[i][right]);
    if (top < bottom && left < right) {
      for (let j = right - 1; j >= left; j--) out.push(m[bottom][j]);
      for (let i = bottom - 1; i > top; i--) out.push(m[i][left]);
    }
    top++; bottom--; left++; right--;
  }
  return out;
}

const rcCase = (m: number[][], output: string) => ({ input: `${m.length} ${m[0].length}\n` + matrixText(m), output });
const squareCase = (m: number[][], output: string) => ({ input: `${m.length}\n` + matrixText(m), output });

export const matricesProblems: CodingProblem[] = [
  {
    slug: "transpose-matrix",
    title: "Transpose a Matrix",
    difficulty: "easy",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/transpose-matrix/",
    statement:
      "The **transpose** of an `r × c` matrix `M` is the `c × r` matrix `T` with `T[j][i] = M[i][j]`: the rows of `M` become the columns of `T`.\n\nRead a matrix (as a list of lists) and print its transpose.",
    inputFormat: "Line 1: two integers `r` and `c`.\nNext `r` lines: `c` space-separated integers each.",
    outputFormat: "`c` lines, each with `r` space-separated integers: the transposed matrix.",
    constraints: "1 ≤ r, c ≤ 100\n-10^4 ≤ each value ≤ 10^4",
    samples: [
      { input: "2 3\n1 2 3\n4 5 6\n", output: "1 4\n2 5\n3 6\n", explanation: "The first row `1 2 3` becomes the first column." },
    ],
    tests: [
      { input: "1 1\n5\n", output: "5\n" },
      { input: "1 4\n1 2 3 4\n", output: "1\n2\n3\n4\n" },
      { input: "3 1\n1\n2\n3\n", output: "1 2 3\n" },
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9\n", output: "1 4 7\n2 5 8\n3 6 9\n" },
      { input: "3 2\n-1 0\n10000 -10000\n7 7\n", output: "-1 10000 7\n0 -10000 7\n" },
      { input: "4 6\n28 -86 -40 -95 -27 50\n37 -81 43 -59 -85 -96\n89 23 16 44 94 -81\n-26 -29 -65 -61 56 -50\n", output: "28 37 89 -26\n-86 -81 23 -29\n-40 43 16 -65\n-95 -59 44 -61\n-27 -85 94 56\n50 -96 -81 -50\n" },
      (() => { const m = randomMatrix(37, 53, 51); return rcCase(m, matrixText(transpose(m))); })(),
      (() => { const m = randomMatrix(100, 100, 52); return rcCase(m, matrixText(transpose(m))); })(),
    ],
    starter: "r, c = map(int, input().split())\nmatrix = []\nfor _ in range(r):\n    matrix.append(list(map(int, input().split())))\n\n# Write your code here\n",
    reference:
      "r, c = map(int, input().split())\nmatrix = []\nfor _ in range(r):\n    matrix.append(list(map(int, input().split())))\nfor j in range(c):\n    row = []\n    for i in range(r):\n        row.append(str(matrix[i][j]))\n    print(' '.join(row))\n",
  },
  {
    slug: "spiral-matrix",
    title: "Spiral Order",
    difficulty: "medium",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/spiral-matrix/",
    statement:
      "Print all elements of an `r × c` matrix in **spiral order**: start at the top-left corner, go right along the top row, down the right column, left along the bottom row, up the left column, and then continue inwards in the same clockwise way until every element has been printed exactly once.\n\nHint: keep four boundaries `top`, `bottom`, `left`, `right` and shrink them after walking each side. Be careful with a single remaining row or column so you do not print an element twice.",
    inputFormat: "Line 1: two integers `r` and `c`.\nNext `r` lines: `c` space-separated integers each.",
    outputFormat: "One line with all `r × c` elements in spiral order, separated by single spaces.",
    constraints: "1 ≤ r, c ≤ 100\n-10^4 ≤ each value ≤ 10^4",
    samples: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9\n", output: "1 2 3 6 9 8 7 4 5\n", explanation: "Right 1 2 3, down 6 9, left 8 7, up 4, then the centre 5." },
      { input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n", output: "1 2 3 4 8 12 11 10 9 5 6 7\n" },
    ],
    tests: [
      { input: "1 1\n7\n", output: "7\n" },
      { input: "1 5\n1 2 3 4 5\n", output: "1 2 3 4 5\n" },
      { input: "4 1\n1\n2\n3\n4\n", output: "1 2 3 4\n" },
      { input: "2 2\n1 2\n3 4\n", output: "1 2 4 3\n" },
      { input: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n", output: "1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10\n" },
      { input: "5 3\n1 2 3\n4 5 6\n7 8 9\n10 11 12\n13 14 15\n", output: "1 2 3 6 9 12 15 14 13 10 7 4 5 8 11\n" },
      { input: "3 6\n1 2 3 4 5 6\n7 8 9 10 11 12\n13 14 15 16 17 18\n", output: "1 2 3 4 5 6 12 18 17 16 15 14 13 7 8 9 10 11\n" },
      { input: "6 5\n-23 11 67 -63 78\n-96 18 81 45 -10\n-56 -9 -41 -82 78\n-75 -93 63 18 51\n-88 51 6 -55 -73\n62 -87 42 -67 -15\n", output: "-23 11 67 -63 78 -10 78 51 -73 -15 -67 42 -87 62 -88 -75 -56 -96 18 81 45 -82 18 -55 6 51 -93 -9 -41 63\n" },
      (() => { const m = randomMatrix(41, 17, 61); return rcCase(m, spiral(m).join(" ") + "\n"); })(),
      (() => { const m = randomMatrix(100, 100, 62); return rcCase(m, spiral(m).join(" ") + "\n"); })(),
      (() => { const m = randomMatrix(99, 100, 63); return rcCase(m, spiral(m).join(" ") + "\n"); })(),
    ],
    starter: "r, c = map(int, input().split())\nmatrix = []\nfor _ in range(r):\n    matrix.append(list(map(int, input().split())))\n\n# Write your code here\n",
    reference:
      "r, c = map(int, input().split())\nmatrix = []\nfor _ in range(r):\n    matrix.append(list(map(int, input().split())))\n\nresult = []\ntop, bottom, left, right = 0, r - 1, 0, c - 1\nwhile top <= bottom and left <= right:\n    for j in range(left, right + 1):\n        result.append(matrix[top][j])\n    for i in range(top + 1, bottom + 1):\n        result.append(matrix[i][right])\n    if top < bottom and left < right:\n        for j in range(right - 1, left - 1, -1):\n            result.append(matrix[bottom][j])\n        for i in range(bottom - 1, top, -1):\n            result.append(matrix[i][left])\n    top += 1\n    bottom -= 1\n    left += 1\n    right -= 1\nprint(' '.join(str(x) for x in result))\n",
  },
  {
    slug: "rotate-matrix",
    title: "Rotate a Square Matrix 90°",
    difficulty: "medium",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/rotate-image/",
    statement:
      "Rotate an `n × n` matrix by **90 degrees clockwise** and print the result. After rotation, the first row of the original matrix becomes the last column, the second row becomes the second-to-last column, and so on.\n\nTry to do it **in place** (without building a second matrix): first transpose the matrix by swapping `m[i][j]` with `m[j][i]` for `j > i`, then reverse each row.",
    inputFormat: "Line 1: `n`.\nNext `n` lines: `n` space-separated integers each.",
    outputFormat: "`n` lines with `n` space-separated integers each: the rotated matrix.",
    constraints: "1 ≤ n ≤ 100\n-10^4 ≤ each value ≤ 10^4",
    samples: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9\n", output: "7 4 1\n8 5 2\n9 6 3\n", explanation: "Row `1 2 3` becomes the right-most column (read top to bottom), and the left column `7 4 1` (read bottom to top) becomes the top row." },
    ],
    tests: [
      { input: "1\n42\n", output: "42\n" },
      { input: "2\n1 2\n3 4\n", output: "3 1\n4 2\n" },
      { input: "4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16\n", output: "15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11\n" },
      { input: "5\n-12 -11 -10 -9 -8\n-7 -6 -5 -4 -3\n-2 -1 0 1 2\n3 4 5 6 7\n8 9 10 11 12\n", output: "8 3 -2 -7 -12\n9 4 -1 -6 -11\n10 5 0 -5 -10\n11 6 1 -4 -9\n12 7 2 -3 -8\n" },
      { input: "3\n0 0 0\n0 1 0\n0 0 0\n", output: "0 0 0\n0 1 0\n0 0 0\n" },
      { input: "6\n67 86 59 64 70 -19\n96 67 98 -79 63 -68\n72 -59 3 -31 -59 49\n-4 -54 -44 97 49 -71\n-12 31 9 75 -97 -92\n-72 14 86 -96 27 -55\n", output: "-72 -12 -4 72 96 67\n14 31 -54 -59 67 86\n86 9 -44 3 98 59\n-96 75 97 -31 -79 64\n27 -97 49 -59 63 70\n-55 -92 -71 49 -68 -19\n" },
      (() => { const m = randomMatrix(31, 31, 71); return squareCase(m, matrixText(rotateClockwise(m))); })(),
      (() => { const m = randomMatrix(100, 100, 72); return squareCase(m, matrixText(rotateClockwise(m))); })(),
    ],
    starter: "n = int(input())\nmatrix = []\nfor _ in range(n):\n    matrix.append(list(map(int, input().split())))\n\n# Write your code here\n",
    reference:
      "n = int(input())\nm = []\nfor _ in range(n):\n    m.append(list(map(int, input().split())))\nfor i in range(n):\n    for j in range(i + 1, n):\n        m[i][j], m[j][i] = m[j][i], m[i][j]\nfor row in m:\n    row.reverse()\n    print(' '.join(str(x) for x in row))\n",
  },
];
