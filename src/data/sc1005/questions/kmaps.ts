import type { Draft } from "@/lib/sc1005/types";

/** K-map values string: "1" at `ones`, "x" at `dcs`, "0" elsewhere. */
const vals = (n: number, ones: number[], dcs: number[] = []) =>
  Array.from({ length: 1 << n }, (_, m) => (ones.includes(m) ? "1" : dcs.includes(m) ? "x" : "0")).join("");
const V4 = ["A", "B", "C", "D"];

export const kmapsQuestions: Draft[] = [
  // ------------------------------------------------------------------ minterms, maxterms, canonical forms
  {
    kind: "mcq",
    subtopic: "Minterms and maxterms",
    difficulty: "easy",
    source: "Style: Lecture 5 slide 5-8",
    prompt: "For a function F(A, B, C, D) with A as the MSB, which pair gives the minterm $m_{11}$ and the maxterm $M_{11}$?",
    options: [
      "$m_{11}$ = AB'CD and $M_{11}$ = A' + B + C' + D'",
      "$m_{11}$ = A'BC'D' and $M_{11}$ = A + B' + C + D",
      "$m_{11}$ = AB'CD and $M_{11}$ = A + B' + C + D",
      "$m_{11}$ = A'BC'D' and $M_{11}$ = A' + B + C' + D'",
      "$m_{11}$ = ABC'D and $M_{11}$ = A' + B' + C + D'",
    ],
    answer: 0,
    solution:
      "11 = 1011, so on row 11: A = 1, B = 0, C = 1, D = 1.\n- Minterm: complement the variables that are 0 → $m_{11}$ = AB'CD (it is 1 only on row 11).\n- Maxterm: complement the variables that are 1 → $M_{11}$ = A' + B + C' + D' (it is 0 only on row 11).\nThe second option has both polarities reversed (it is $m_4$ and $M_4$). The third mixes a correct minterm with the maxterm $M_4$. The last option reads the bits in the wrong order (1101 = 13).",
  },
  {
    kind: "mcq",
    subtopic: "Canonical forms from a truth table",
    difficulty: "easy",
    source: "Style: Lecture 5 slides 5-13, 5-14",
    prompt: "The truth table below defines F(X, Y, Z). Which line gives both canonical forms correctly?",
    figures: [
      {
        kind: "table",
        head: ["X", "Y", "Z", "F"],
        rows: [
          [0, 0, 0, 1],
          [0, 0, 1, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 1],
          [1, 0, 0, 0],
          [1, 0, 1, 1],
          [1, 1, 0, 1],
          [1, 1, 1, 0],
        ],
      },
    ],
    options: [
      "F = Σm(0, 3, 5, 6) = ΠM(1, 2, 4, 7)",
      "F = Σm(0, 3, 5, 6) = ΠM(0, 3, 5, 6)",
      "F = Σm(1, 2, 4, 7) = ΠM(0, 3, 5, 6)",
      "F = Σm(0, 3, 5, 6) = ΠM(6, 5, 3, 0)",
      "F = Σm(1, 2, 4, 7) = ΠM(1, 2, 4, 7)",
    ],
    answer: 0,
    solution:
      "F = 1 on rows 0, 3, 5, 6, so F = Σm(0, 3, 5, 6). The product of maxterms collects the rows where F = 0: rows 1, 2, 4, 7, so F = ΠM(1, 2, 4, 7).\nThe two lists are always complementary. Σm(1, 2, 4, 7) and ΠM(0, 3, 5, 6) both describe $F'$ (odd parity), not F. This F is even parity: it could be named ODD* (active low) or EVEN (active high).",
  },
  {
    kind: "mcq",
    subtopic: "Converting between Σm and ΠM",
    difficulty: "medium",
    source: "Style: Lecture 5 slide 5-15",
    prompt: "F(A, B, C, D) = ΠM(0, 1, 4, 5, 10, 11, 14, 15). Which of the following correctly expresses the complement $F'$?",
    options: ["Σm(2, 3, 6, 7, 8, 9, 12, 13)", "Σm(0, 1, 4, 5, 10, 11, 14, 15)", "ΠM(2, 3, 6, 7, 8, 9, 12, 13)", "ΠM(0, 1, 4, 5, 10, 11, 14, 15)", "There are multiple correct answers"],
    answer: 4,
    solution:
      "F = 0 on rows 0, 1, 4, 5, 10, 11, 14, 15, so F = 1 on rows 2, 3, 6, 7, 8, 9, 12, 13.\n- $F'$ is 1 where F is 0: $F'$ = Σm(0, 1, 4, 5, 10, 11, 14, 15). Correct.\n- $F'$ is 0 where F is 1: $F'$ = ΠM(2, 3, 6, 7, 8, 9, 12, 13). Also correct.\nThe other two options (Σm(2, 3, 6, 7, 8, 9, 12, 13) and the given ΠM list) are F itself. Since two options are correct, the answer is \"There are multiple correct answers\". (In fact F = A'C + AC' = A ⊕ C.)",
  },
  {
    kind: "short",
    subtopic: "Expanding to minterms",
    difficulty: "easy",
    source: "Style: L7 practice Q2",
    prompt: "F(A, B, C) = A'B + BC'. List the minterm numbers of F in increasing order, separated by commas (e.g. 1,4,5).",
    accept: ["2,3,6", "m(2,3,6)", "Σm(2,3,6)", "sum m(2,3,6)", "m2,m3,m6", "m2+m3+m6"],
    match: "text",
    placeholder: "e.g. 1,4,5",
    solution:
      "Fill in each missing variable both ways:\n- A'B (C missing) = A'BC' + A'BC = 010, 011 → $m_2$, $m_3$.\n- BC' (A missing) = A'BC' + ABC' = 010, 110 → $m_2$, $m_6$.\n$m_2$ appears in both terms but is listed once: F = Σm(2, 3, 6) = ΠM(0, 1, 4, 5, 7).",
  },
  {
    kind: "short",
    subtopic: "Expanding to minterms",
    difficulty: "easy",
    source: "Style: Lecture 5 slides 5-30 to 5-32",
    prompt: "How many minterms of F(A, B, C, D) does the product term A'C cover? (Equivalently: how many cells are inside its loop on a 4-variable K-map?)",
    accept: ["4"],
    match: "number",
    solution: "A'C fixes 2 of the 4 variables (A = 0, C = 1). The other 2 (B and D) can each be 0 or 1: $2^2$ = 4 minterms, namely 0010, 0011, 0110, 0111 = $m_2$, $m_3$, $m_6$, $m_7$. In general a term with $k$ literals in an $n$-variable map covers $2^{n-k}$ cells.",
  },
  // ------------------------------------------------------------------ standard forms & algebra
  {
    kind: "mcq",
    subtopic: "SOP and POS forms",
    difficulty: "easy",
    source: "Lecture 5 slide 5-20",
    prompt: "Which of the following expressions is in sum-of-products (SOP) form?",
    options: ["f = (xy)'z + xz'", "f = xy(x' + z)'", "f = x'y + z + xy'z'", "f = (x + y)(x' + z)", "f = (xy + z)(x' + y)"],
    answer: 2,
    solution:
      "An SOP is an OR of product terms in which every factor is a single literal. x'y + z + xy'z' qualifies: a single literal (z) is a valid product term.\n- (xy)'z + xz': (xy)' is a complement over a product, not a literal.\n- xy(x' + z)': complement over a sum.\n- (x + y)(x' + z): this is a POS.\n- (xy + z)(x' + y): a product appears inside a sum term; it is neither SOP nor POS.",
  },
  {
    kind: "short",
    subtopic: "Algebraic minimisation",
    difficulty: "medium",
    source: "Style: L7 practice Q4 (Lecture 5 slide 5-23)",
    prompt: "Use Boolean algebra to simplify F(X, Y, Z) = XY'Z + XY(X'Z')' to a minimum sum-of-products expression.",
    accept: ["XY + XZ", "XZ + XY"],
    match: "expr",
    vars: ["X", "Y", "Z"],
    minimal: true,
    placeholder: "e.g. X'Y + Z",
    solution:
      "- De Morgan: (X'Z')' = X + Z.\n- XY(X + Z) = XY + XYZ = XY (absorption).\n- F = XY'Z + XY = X(Y'Z + Y) = X(Y + Z) (since $Y + Y'Z = Y + Z$).\n- Minimum SOP: **F = XY + XZ**. (The factored form X(Y + Z) is equivalent but is not an SOP.)",
  },
  // ------------------------------------------------------------------ K-map basics
  {
    kind: "mcq",
    subtopic: "K-map adjacency",
    difficulty: "medium",
    source: "Style: Lecture 5 slides 5-25, 5-29",
    prompt: "A 4-variable K-map has rows AB and columns CD, both labelled 00, 01, 11, 10. Which set lists **all** the cells that are logically adjacent to $m_8$?",
    figures: [{ kind: "kmap", vars: V4, values: "----------------", showIndex: true }],
    options: ["$m_0$, $m_9$, $m_{10}$, $m_{12}$", "$m_9$ and $m_{12}$ only", "$m_7$, $m_9$, $m_{12}$", "$m_9$, $m_{12}$, $m_{13}$", "$m_0$, $m_4$, $m_9$, $m_{12}$"],
    answer: 0,
    solution:
      "Adjacent cells differ in exactly one bit. 8 = 1000; flipping each bit gives 0000 ($m_0$), 1100 ($m_{12}$), 1010 ($m_{10}$), 1001 ($m_9$).\nOn the map $m_8$ is in row 10, column 00. $m_{12}$ (row above) and $m_9$ (column to the right) touch it. $m_0$ is adjacent by wrapping from the bottom row to the top row, and $m_{10}$ by wrapping from the left column to the right column. Every cell of a 4-variable map has exactly 4 neighbours. $m_7$ is numerically next to 8 but differs in all four bits, and $m_{13}$ is a diagonal (two bits).",
  },
  {
    kind: "mcq",
    subtopic: "K-map looping rules",
    difficulty: "medium",
    source: "Style: Lecture 5 slide 5-33",
    prompt: "On a 4-variable K-map (rows AB, columns CD in Gray order), which proposed loop of 1s is **not** allowed?",
    options: [
      "The four corner cells $m_0$, $m_2$, $m_8$, $m_{10}$",
      "$m_1$, $m_3$, $m_9$, $m_{11}$",
      "$m_3$, $m_7$, $m_{15}$, $m_{11}$",
      "$m_0$, $m_1$, $m_2$, $m_3$, $m_4$, $m_5$",
      "$m_5$, $m_7$, $m_{13}$, $m_{15}$",
    ],
    answer: 3,
    solution:
      "Loops must contain $2^k$ cells forming a rectangle (wrap-around allowed). Six cells is not a power of two: $m_0$–$m_5$ must be covered by two overlapping loops instead, e.g. A'B' (0–3) and A'C' (0, 1, 4, 5).\nThe others are valid: the corners give B'D', {1, 3, 9, 11} gives B'D, the column CD = 11 gives CD, and the centre square gives BD.",
  },
  {
    kind: "mcq",
    subtopic: "Minimum SOP from a K-map",
    difficulty: "medium",
    source: "Style: Tut 4 Q2",
    prompt: "Use the K-map to find the minimum-cost SOP expression for F(A, B, C, D).",
    figures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 2, 5, 8, 10, 13]), showIndex: true }],
    options: ["F = B'D' + BC'D", "F = A'B'D' + AB'D' + BC'D", "F = B'D' + BD", "F = B'D' + A'BC'D + ABC'D", "F = B'D' + C'D"],
    answer: 0,
    solution:
      "F = Σm(0, 2, 5, 8, 10, 13).\n- The four corners (0, 2, 8, 10) form one wrap-around loop: B = 0, D = 0 throughout → B'D'.\n- $m_5$ and $m_{13}$ are vertically adjacent (rows 01 and 11): B = 1, C = 0, D = 1 → BC'D.\nF = B'D' + BC'D (2 terms, 5 literals).\nThe second and fourth options are correct functions but not minimum (they miss the wrap-around merges). B'D' + BD adds $m_7$, $m_{15}$, and C'D adds $m_1$, $m_9$, which are 0s.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 2, 5, 8, 10, 13]), groups: ["B'D'", "BC'D"], showIndex: true }],
  },
  {
    kind: "short",
    subtopic: "Minimum SOP from a K-map",
    difficulty: "medium",
    source: "Style: Tut 4 Q2, PYP 2016-17 S2 Q2(b)",
    prompt: "F(A, B, C, D) = Σm(0, 1, 2, 5, 8, 9, 10, 13). Use a K-map to find the minimum-cost SOP expression for F.",
    accept: ["B'D' + C'D"],
    match: "expr",
    vars: V4,
    minimal: true,
    placeholder: "e.g. A'B + CD'",
    solution:
      "Plot the 1s:\n- The four corners 0, 2, 8, 10 → one wrap-around loop B'D' (B = 0, D = 0).\n- Column CD = 01 holds 1, 5, 13, 9: the whole column is a 4-cell loop C'D.\n- Every 1 is covered: **F = B'D' + C'D**.\nB'C' (0, 1, 8, 9) is also a valid 4-cell loop, but all its cells are already covered by the two loops above, so adding it would break the \"fewest loops\" rule.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 1, 2, 5, 8, 9, 10, 13]), groups: ["B'D'", "C'D"], showIndex: true }],
  },
  // ------------------------------------------------------------------ choosing loops (biggest, fewest)
  {
    kind: "mcq",
    subtopic: "Minimum SOP from a K-map",
    difficulty: "medium",
    source: "PYP 2016-17 S2 Q2(b)",
    prompt: "Use a Karnaugh map to simplify F(a, b, c, d) = a'c'd' + a'bc + a'b'cd + ab'c'd' and obtain a minimum-cost sum-of-products expression.",
    options: ["F = b'c'd' + a'cd + a'bd'", "F = a'c'd' + a'cd + a'bc + ab'c'd'", "F = b'c'd' + a'cd + a'bc", "F = c'd' + a'cd + a'bd'", "F = b'd' + a'cd + a'bd'"],
    answer: 0,
    solution:
      "Expand each term into minterms (a is the MSB):\n- a'c'd' → 0000, 0100 = $m_0$, $m_4$. a'bc → 0110, 0111 = $m_6$, $m_7$. a'b'cd → $m_3$. ab'c'd' → $m_8$.\nSo F = Σm(0, 3, 4, 6, 7, 8). No 4-cell loop of 1s exists, so every loop has 2 cells.\n- $m_3$ can only be looped with $m_7$ → a'cd.\n- $m_8$ can only be looped with $m_0$ (wrap-around between rows 00 and 10) → b'c'd'.\n- $m_4$ and $m_6$ are left; they are neighbours (wrap-around between columns 00 and 10) → a'bd'.\n**F = b'c'd' + a'cd + a'bd'** (3 loops, 9 literals).\nThe second option is correct but uses 4 terms. The third leaves $m_4$ uncovered. c'd' also covers $m_{12}$ and b'd' also covers $m_2$ and $m_{10}$, which are 0s.",
    solutionFigures: [{ kind: "kmap", vars: ["a", "b", "c", "d"], values: vals(4, [0, 3, 4, 6, 7, 8]), groups: ["b'c'd'", "a'cd", "a'bd'"], showIndex: true }],
  },
  {
    kind: "mcq",
    subtopic: "Minimum POS from a K-map",
    difficulty: "medium",
    source: "PYP 2018-19 S2 Q1(e)",
    prompt: "F(A, B, C, D) = Σm(0, 2, 5, 7, 8, 9, 10, 13, 15). Using a Karnaugh map, which is a minimum-cost product-of-sums (POS) expression for F?",
    figures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 2, 5, 7, 8, 9, 10, 13, 15]), showIndex: true }],
    options: ["F = (B' + D)(A + B + D')(B + C' + D')", "F = (B + D')(A' + B' + D)(B' + C + D)", "F = BD' + A'B'D + B'CD", "F = (B' + D)(A + B + C + D')(B + C' + D')", "F = (B' + D)(B + D')"],
    answer: 0,
    solution:
      "The 0s are at 1, 3, 4, 6, 11, 12, 14. Loop the 0s; in each sum term a variable that is 0 over the loop appears uncomplemented and one that is 1 appears complemented.\n- 4, 6, 12, 14 (rows 01 and 11, columns 00 and 10): B = 1, D = 0 → (B' + D).\n- $m_1$ can only be looped with $m_3$: A = 0, B = 0, D = 1 → (A + B + D').\n- $m_{11}$ can only be looped with $m_3$: B = 0, C = 1, D = 1 → (B + C' + D').\n**F = (B' + D)(A + B + D')(B + C' + D')** (3 sum terms, 8 literals).\nThe second option uses SOP polarity. BD' + A'B'D + B'CD is F' (the 0-loops read as product terms). The fourth is correct but (A + B + C + D') is a single-cell loop where a 2-cell loop was possible. (B + D') would also cover $m_9$, which is a 1.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 2, 5, 7, 8, 9, 10, 13, 15]), groups: ["(B' + D)", "(A + B + D')", "(B + C' + D')"], showIndex: true }],
  },
  {
    kind: "mcq",
    subtopic: "Choosing loops: biggest and fewest",
    difficulty: "hard",
    source: "Style: Lecture 5 slide 5-33 (looping rules)",
    prompt: "F(A, B, C, D) = Σm(0, 4, 5, 7, 8, 9, 13, 15). Which expression is the minimum-cost SOP for F?",
    figures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 4, 5, 7, 8, 9, 13, 15]), showIndex: true }],
    options: ["F = BD + A'C'D' + AB'C'", "F = BD + B'C'D' + A'BC' + AC'D", "F = BD + A'C'D' + AC'D", "F = BD + C'D' + AB'C'", "F = BD + A'C'D' + B'C'D' + AB'C'"],
    answer: 0,
    solution:
      "Apply the lecture rules: every 1 must be looped, using the biggest loops and the fewest loops.\n- The only 4-cell loop is BD (5, 7, 13, 15), and it is the only loop that can cover $m_7$ and $m_{15}$ with 2 literals. Take it.\n- Left to cover: 0, 4, 8, 9. None of them can be in a 4-cell loop, so 2-cell loops are needed. A'C'D' takes 0 and 4; AB'C' takes 8 and 9. Total: 3 loops, 8 literals.\nThe second option also covers F but uses 4 loops (looping 0 with 8 first leaves 4 and 9 needing a loop each). The third misses $m_8$. C'D' in the fourth also covers $m_{12}$, which is a 0. The last contains a redundant loop (B'C'D': its 1s are already covered).",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 4, 5, 7, 8, 9, 13, 15]), groups: ["BD", "A'C'D'", "AB'C'"], showIndex: true }],
  },
  // ------------------------------------------------------------------ POS
  {
    kind: "mcq",
    subtopic: "Minimum POS from a K-map",
    difficulty: "medium",
    source: "Style: PYP 2017-18 S2 Q2(b)",
    prompt: "By looping the 0s, find the minimum-cost product-of-sums (POS) expression for F.",
    figures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 1, 3, 4, 5, 7, 8, 12, 13, 15]), showIndex: true }],
    options: ["F = (C' + D)(A' + B + D')", "F = (C + D')(A + B' + D)", "F = CD' + AB'D", "F = (C' + D)(A' + B + C + D')", "F = (C' + D')(A' + B + D)"],
    answer: 0,
    solution:
      "The 0s are at 2, 6, 10, 14, 9, 11.\n- Column CD = 10 (2, 6, 14, 10): C = 1 and D = 0 throughout. In a sum term a 1 gives a complemented literal and a 0 an uncomplemented one → (C' + D).\n- 9 and 11 (row 10, columns 01 and 11): A = 1, B = 0, D = 1 → (A' + B + D').\nF = (C' + D)(A' + B + D'): 2 sum terms, 5 literals.\nCD' + AB'D is $F'$ (the loops read as product terms). The second option uses SOP polarity. (A' + B + C + D') covers only $m_9$ and leaves $m_{11}$ uncovered. The last has the wrong polarity on C, D.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 1, 3, 4, 5, 7, 8, 12, 13, 15]), groups: ["(C' + D)", "(A' + B + D')"], showIndex: true }],
  },
  {
    kind: "short",
    subtopic: "Minimum POS from a K-map",
    difficulty: "medium",
    source: "Style: Tut 4 Q2(b)",
    prompt: "G(P, Q, R, S) = ΠM(1, 3, 5, 7, 13, 15). Use a K-map to find the minimum-cost POS expression for G.",
    accept: ["(P + S')(Q' + S')"],
    match: "expr",
    vars: ["P", "Q", "R", "S"],
    minimal: true,
    placeholder: "e.g. (P + Q')(R + S)",
    solution:
      "Mark the 0s at 1, 3, 5, 7, 13, 15 (rows PQ, columns RS).\n- 1, 3, 5, 7 (rows 00 and 01, columns 01 and 11): P = 0, S = 1 → (P + S').\n- 5, 7, 13, 15 (rows 01 and 11, columns 01 and 11): Q = 1, S = 1 → (Q' + S').\n**G = (P + S')(Q' + S')**. R does not appear: it changes inside both loops.\n(Looping the 1s instead gives the SOP G = S' + PQ'.)",
    solutionFigures: [{ kind: "kmap", vars: ["P", "Q", "R", "S"], values: vals(4, [0, 2, 4, 6, 8, 9, 10, 11, 12, 14]), groups: ["(P + S')", "(Q' + S')"], showIndex: true }],
  },
  // ------------------------------------------------------------------ don't cares
  {
    kind: "short",
    subtopic: "Don't cares (SOP)",
    difficulty: "hard",
    source: "Style: Tut 4 Q3",
    prompt: "Simplify F(A, B, C, D) = Σm(4, 6, 9, 11, 12, 14) with don't-care conditions d(1, 3, 13). Give a minimum SOP expression.",
    accept: ["B'D + BD'", "BD' + B'D"],
    match: "expr",
    dontCares: [1, 3, 13],
    vars: V4,
    minimal: true,
    placeholder: "e.g. AB + C'D",
    solution:
      "- 4, 6, 12, 14 (rows 01 and 11, columns 00 and 10) form a 4-cell loop by wrap-around: B = 1, D = 0 → BD'. No don't care is needed.\n- 9 and 11 are 1s; with the don't cares at 1 and 3 they complete the 4-cell loop 1, 3, 9, 11: B = 0, D = 1 → B'D.\n- The don't care at 13 is not used: it would not make any loop bigger, so it is implemented as 0.\n**F = B'D + BD'** (that is, F = B ⊕ D).",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [4, 6, 9, 11, 12, 14], [1, 3, 13]), groups: ["BD'", "B'D"], showIndex: true }],
  },
  {
    kind: "short",
    subtopic: "Don't cares (POS)",
    difficulty: "hard",
    source: "Style: Tut 4 Q4",
    prompt: "F(A, B, C, D) = Σm(1, 3, 7, 11, 15) with don't cares d(0, 2, 5). Give a minimum POS expression for F.",
    accept: ["D(A' + C)", "(A' + C)D"],
    match: "expr",
    dontCares: [0, 2, 5],
    vars: V4,
    minimal: true,
    placeholder: "e.g. (A + B)(C' + D)",
    solution:
      "The 0s are at 4, 6, 8, 9, 10, 12, 13, 14.\n- Column CD = 00 (0, 4, 12, 8) with column 10 (2, 6, 14, 10) forms an 8-cell loop D = 0 if the don't cares at 0 and 2 are taken as 0 → (D).\n- 8, 9, 12, 13 (rows 11 and 10, columns 00 and 01): A = 1, C = 0 → (A' + C).\n- **F = D(A' + C)**: 3 literals. The don't care at 5 is left out (implemented as 1).\nFor comparison the minimum SOP needs 4 literals: CD + A'D (or CD + A'B').",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [1, 3, 7, 11, 15], [0, 2, 5]), groups: ["(D)", "(A' + C)"], showIndex: true }],
  },
  {
    kind: "mcq",
    subtopic: "Don't cares (BCD inputs)",
    difficulty: "medium",
    source: "Style: Lecture 5 slide 5-38",
    prompt: "The input ABCD is a BCD digit (A is the MSB), so codes 1010 to 1111 never occur. Output F = 1 when the digit is divisible by 3 (0 counts as divisible). Which is a minimum-cost SOP for F?",
    options: ["F = A'B'C'D' + A'B'CD + A'BCD' + AB'C'D", "F = AD + B'CD + BCD' + A'B'C'D'", "F = AD + CD + BC + A'B'C'D'", "F = AD + B'CD + BCD'", "F = AD + B'C + BCD' + B'C'D'"],
    answer: 1,
    solution:
      "F = Σm(0, 3, 6, 9) + d(10, 11, 12, 13, 14, 15).\n- $m_9$ with don't cares 11, 13, 15 → AD (4 cells).\n- $m_3$ with don't care 11 → B'CD. $m_6$ with don't care 14 → BCD'.\n- $m_0$ has no neighbouring 1 or X (1, 2, 4 and 8 are all 0s), so it stays alone: A'B'C'D'.\nF = AD + B'CD + BCD' + A'B'C'D' (12 literals).\nThe first option is the canonical SOP: correct but not minimum. CD would include $m_7$ (a 0), and BC includes $m_7$ too. The fourth misses digit 0. B'C covers $m_2$ and B'C'D' covers $m_8$, both 0s.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [0, 3, 6, 9], [10, 11, 12, 13, 14, 15]), groups: ["AD", "B'CD", "BCD'", "A'B'C'D'"], showIndex: true }],
  },
  {
    kind: "mcq",
    subtopic: "Don't cares and multiple minimum designs",
    difficulty: "hard",
    source: "Style: Lecture 5 slides 5-39 to 5-43",
    prompt: "A circuit takes a BCD digit ABCD and outputs Z = 1 when the digit is 6 or more. The K-map is shown (X = don't care). Which is a minimum-cost POS expression for Z?",
    figures: [{ kind: "kmap", vars: V4, values: vals(4, [6, 7, 8, 9], [10, 11, 12, 13, 14, 15]), showIndex: true }],
    options: ["Z = (A + B)(A + C)", "Z = (A + C)(B + C')", "Z = (A + B)(A + C)(A + D)", "Z = (A' + B)(A' + C)", "There are multiple correct answers"],
    answer: 4,
    solution:
      "The 0s are at minterms 0–5; the don't cares are 10–15.\n- (A + B): 0 only when A = 0 and B = 0, the top row 0, 1, 3, 2.\n- (A + C): A = 0, C = 0 → 0, 1, 4, 5.\n- (B + C'): B = 0, C = 1 → 2, 3, 10, 11, using the don't cares 10, 11 as 0s.\nBoth (A + B)(A + C) and (A + C)(B + C') cover all six 0s with two 4-cell loops (4 literals), so both are minimum. (A + B)(B' + C) is a third. This mirrors the lecture's BCD < 6 example, where several designs are equally good.\n(A + D) would make $m_6$ (a 1) equal 0, and (A' + B)(A' + C) loops the wrong half of the map.",
    solutionFigures: [
      { kind: "kmap", vars: V4, values: vals(4, [6, 7, 8, 9], [10, 11, 12, 13, 14, 15]), groups: ["(A + B)", "(A + C)"], caption: "Design 1" },
      { kind: "kmap", vars: V4, values: vals(4, [6, 7, 8, 9], [10, 11, 12, 13, 14, 15]), groups: ["(A + C)", "(B + C')"], caption: "Design 2" },
    ],
  },
  // ------------------------------------------------------------------ word problems
  {
    kind: "short",
    subtopic: "Design from a specification",
    difficulty: "hard",
    source: "Style: L8 practice Q2",
    prompt: "A 4-bit unsigned number N = ABCD (A = MSB) drives a circuit whose output P = 1 exactly when N is a prime number (2, 3, 5, 7, 11, 13). Find a minimum SOP expression for P.",
    accept: ["A'B'C + B'CD + BC'D + A'CD", "A'B'C + B'CD + BC'D + A'BD"],
    match: "expr",
    vars: V4,
    minimal: true,
    placeholder: "e.g. A'BC + B'D",
    solution:
      "P = Σm(2, 3, 5, 7, 11, 13). No 4-cell loop of 1s exists, so all loops have 2 cells. Possible loops: A'B'C (2, 3), B'CD (3, 11), BC'D (5, 13), A'CD (3, 7), A'BD (5, 7).\n- $m_2$ can only be looped as A'B'C, $m_{11}$ only as B'CD, $m_{13}$ only as BC'D, so these three loops are needed.\n- They leave $m_7$, which is covered by either A'CD or A'BD.\n**P = A'B'C + B'CD + BC'D + A'CD** (or with A'BD as the last term). Both have 4 terms and 12 literals.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [2, 3, 5, 7, 11, 13]), groups: ["A'B'C", "B'CD", "BC'D", "A'CD"], showIndex: true }],
  },
  {
    kind: "short",
    subtopic: "Design from a specification",
    difficulty: "hard",
    source: "Style: PYP 2018-19 S2 Q3(a)(i) (2-bit comparator truth table)",
    prompt: "Two 2-bit unsigned numbers $A = A_1A_0$ and $B = B_1B_0$ are compared. Output G = 1 only when A > B. Find a minimum SOP for G in terms of A1, A0, B1, B0 (type them as A1, A0, B1, B0).",
    accept: ["A1B1' + A0B1'B0' + A1A0B0'"],
    match: "expr",
    vars: ["A1", "A0", "B1", "B0"],
    minimal: true,
    placeholder: "e.g. A1B1' + ...",
    solution:
      "Order the variables A1 A0 B1 B0 (rows A1A0, columns B1B0). G = 1 for (A, B) = (1,0), (2,0), (2,1), (3,0), (3,1), (3,2): G = Σm(4, 8, 9, 12, 13, 14).\n- A1 = 1 and B1 = 0 decides A > B whatever the low bits: 8, 9, 12, 13 → A1B1'.\n- Equal high bits: then A0 = 1, B0 = 0 is needed. $m_4$ (A = 1, B = 0) loops with $m_{12}$ → A0B1'B0'. $m_{14}$ (A = 3, B = 2) loops with $m_{12}$ → A1A0B0'.\n**G = A1B1' + A0B1'B0' + A1A0B0'** (3 terms, 8 literals). Each loop contains a 1 that no other loop can cover, so none can be dropped.",
    solutionFigures: [{ kind: "kmap", vars: ["A1", "A0", "B1", "B0"], values: vals(4, [4, 8, 9, 12, 13, 14]), groups: ["A1B1'", "A0B1'B0'", "A1A0B0'"], showIndex: true }],
  },
  {
    kind: "short",
    subtopic: "Design from a specification",
    difficulty: "medium",
    source: "Style: PYP 2016-17 S2 Q1(d)",
    prompt: "A 4-input voting circuit outputs M = 1 when at least three of the inputs A, B, C, D are 1. Find a minimum SOP expression for M.",
    accept: ["ABC + ABD + ACD + BCD"],
    match: "expr",
    vars: V4,
    minimal: true,
    placeholder: "e.g. AB + CD",
    solution:
      "M = Σm(7, 11, 13, 14, 15): $m_{15}$ (all four 1) and the four rows with exactly one 0.\nEach row with one 0 can only loop with $m_{15}$, giving four 2-cell loops, all needed:\n- 7 + 15 → BCD, 11 + 15 → ACD, 13 + 15 → ABD, 14 + 15 → ABC.\n**M = ABC + ABD + ACD + BCD** (12 literals). No 4-cell loop exists, since that would need two 1s each with two 0 inputs.",
    solutionFigures: [{ kind: "kmap", vars: V4, values: vals(4, [7, 11, 13, 14, 15]), groups: ["BCD", "ACD", "ABD", "ABC"], showIndex: true }],
  },
  // ------------------------------------------------------------------ NAND / NOR
  {
    kind: "mcq",
    subtopic: "NAND-only circuits",
    difficulty: "medium",
    source: "Style: Tut 4 Q1(e)",
    prompt: "What Boolean function F does this NAND-only circuit realise? (A bubble on an input pin means that input is complemented.)",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C", "D"],
          gates: [
            { id: "N1", type: "NAND", in: ["A", "!C"] },
            { id: "N2", type: "NAND", in: ["B", "C"] },
            { id: "N3", type: "NAND", in: ["!B", "D"] },
            { id: "F", type: "NAND", in: ["N1", "N2", "N3"] },
          ],
          outputs: ["F"],
        },
      },
    ],
    options: ["F = AC' + BC + B'D", "F = (A' + C)(B' + C')(B + D')", "F = (A + C')(B + C)(B' + D)", "F = A'C + B'C' + BD'", "F = AC'·BC·B'D"],
    answer: 0,
    solution:
      "N1 = (AC')', N2 = (BC)', N3 = (B'D)'.\nF = (N1·N2·N3)' = N1' + N2' + N3' (De Morgan) = AC' + BC + B'D.\nA two-level NAND-NAND circuit is an AND-OR circuit in disguise: each first-level NAND is a product term and the output NAND ORs them.\nThe second option is N1·N2·N3 itself, i.e. $F'$. The third reads the gates as OR-AND. The fourth complements every literal, and the last forgets the OR.",
  },
  {
    kind: "mcq",
    subtopic: "NOR-only circuits",
    difficulty: "medium",
    source: "Style: Tut 4 Q1(f), PYP 2018-19 S2 Q1(d)",
    prompt: "Which expression(s) describe the output F of this NOR-only circuit?",
    figures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B", "C"],
          gates: [
            { id: "N1", type: "NOR", in: ["A", "B"] },
            { id: "N2", type: "NOR", in: ["!A", "C"] },
            { id: "F", type: "NOR", in: ["N1", "N2"] },
          ],
          outputs: ["F"],
        },
      },
    ],
    options: ["F = (A + B)(A' + C)", "F = AB + A'C", "F = (A' + B')(A + C')", "F = AC + A'B", "There are multiple correct answers"],
    answer: 4,
    solution:
      "N1 = (A + B)', N2 = (A' + C)'.\nF = (N1 + N2)' = N1'·N2' = (A + B)(A' + C): NOR-NOR is OR-AND, a POS.\nMultiplying out: (A + B)(A' + C) = AA' + AC + A'B + BC = AC + A'B + BC = AC + A'B (BC is the consensus term).\nSo both (A + B)(A' + C) and AC + A'B are correct: **there are multiple correct answers**. AB + A'C swaps the roles of B and C, and (A' + B')(A + C') complements every literal.",
  },
  // ------------------------------------------------------------------ active-high / active-low, enable
  {
    kind: "mcq",
    subtopic: "Active-low signals",
    difficulty: "easy",
    source: "Style: Lecture 6 slides 6-19 to 6-22",
    prompt: "A register has a control input named LOAD*. Which statement is correct?",
    options: [
      "The register loads when LOAD* = 0; LOAD* = 0 is its asserted level",
      "The register loads when LOAD* = 1, because asserted always means logic 1",
      "LOAD* = 0 means the signal is negated",
      "The * means the register ignores LOAD* when it is 0",
      "LOAD* and LOAD describe opposite effects on the register",
    ],
    answer: 0,
    solution:
      "The * marks an **active-low** signal: its named effect (loading) happens when it is 0. Asserted means \"at the active level\": 0 for an active-low signal, 1 for an active-high one. So LOAD* = 0 is asserted (the register loads) and LOAD* = 1 is negated.\nLOAD and LOAD* name the same effect (loading) with opposite active levels.",
  },
  {
    kind: "mcq",
    subtopic: "Enable and disable",
    difficulty: "medium",
    source: "Style: Lecture 5 slides 5-46 to 5-48, L8 practice Q4",
    prompt: "A circuit has an active-low enable EN*, a data input D and an active-high output F. When enabled, F follows D. When disabled, F is held at its negated level. Which expression gives F?",
    options: ["F = EN*'·D", "F = EN*·D", "F = EN*' + D", "F = (EN* + D)'", "F = EN* + D"],
    answer: 0,
    solution:
      "Enabled means EN* asserted, i.e. EN* = 0; then F = D. Disabled (EN* = 1) must hold the active-high output at its negated level, 0. An AND gate with EN*' does exactly that: F = EN*'·D (an AND gate with a bubble on its EN* pin).\nEN*·D enables on the wrong level. EN*' + D would force F = 1 when enabled. (EN* + D)' = EN*'·D' inverts the data. EN* + D forces F = 1 when disabled.",
  },
  {
    kind: "mcq",
    subtopic: "Active-low outputs",
    difficulty: "hard",
    source: "Style: PYP 2018-19 S1 Q1(e)",
    prompt: "A circuit has inputs EN*, A and B* (* = active low) and an active-low output Y*. Y* is asserted only when EN* is asserted, A is asserted and B* is negated. Which expression gives Y*?",
    options: ["Y* = EN* + A' + B*'", "Y* = EN*'·A·B*", "Y* = EN* + A' + B*", "Y* = EN*·A'·B*'", "Y* = EN*' + A + B*'"],
    answer: 0,
    solution:
      "Translate each condition into a logic level:\n- EN* asserted → EN* = 0 → literal EN*'.\n- A asserted → A = 1 → literal A.\n- B* negated → B* = 1 → literal B*.\nThe assertion condition is C = EN*'·A·B*. Y* is active low, so it must be 0 exactly when C = 1: Y* = C' = (EN*'·A·B*)' = **EN* + A' + B*'** (De Morgan).\nEN*'·A·B* is the active-high output (Y), with the opposite level. The other options get one or more polarities wrong. Note that the disabled case (EN* = 1) correctly gives Y* = 1, the negated level.",
  },
  {
    kind: "mcq",
    subtopic: "Enable circuits and waveforms",
    difficulty: "medium",
    source: "Style: PYP 2020-21 S2 Q2(b)",
    prompt: "An active-high output F is asserted only when the active-low enable EN* is asserted and inputs A and B differ. Given the waveforms below (one value per time slot t = 0 to 7), what is F in slots 0 to 7?",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "EN*", wave: "11000011" },
          { name: "A", wave: "01100110" },
          { name: "B", wave: "00001101" },
        ],
        ticks: ["0", "1", "2", "3", "4", "5", "6", "7"],
      },
    ],
    options: ["0 0 1 0 1 0 0 0", "0 1 0 0 0 0 1 1", "0 1 1 0 1 0 1 1", "0 0 0 1 0 1 0 0", "1 1 0 1 0 1 1 1"],
    answer: 0,
    solution:
      "F = EN*'·(A ⊕ B).\n- A ⊕ B per slot: 0 1 1 0 1 0 1 1.\n- EN* is 0 (asserted) only in slots 2 to 5, so F can be 1 only there: slots 2–5 of A ⊕ B are 1 0 1 0.\nF = 0 0 1 0 1 0 0 0. In slots 1, 6 and 7 A and B differ, but the circuit is disabled and F stays at its negated level 0.\nThe second option uses EN* instead of EN*', the third ignores the enable, the fourth uses XNOR, and the last is $F'$.",
    solutionFigures: [
      {
        kind: "wave",
        signals: [
          { name: "EN*", wave: "11000011" },
          { name: "A", wave: "01100110" },
          { name: "B", wave: "00001101" },
          { name: "A⊕B", wave: "01101011" },
          { name: "F", wave: "00101000" },
        ],
        ticks: ["0", "1", "2", "3", "4", "5", "6", "7"],
      },
    ],
  },
  // ------------------------------------------------------------------ structured (open) questions
  {
    kind: "open",
    subtopic: "Canonical forms, K-map POS and function",
    difficulty: "medium",
    source: "PYP 2020-21 S2 Q2(a)",
    prompt:
      "Table Q2 shows the truth table of a logic circuit with inputs U, V, W and outputs Y and Z.\n(i) Write the canonical sum-of-minterm expression for each output. (2 marks)\n(ii) Use Karnaugh maps to obtain a minimum-cost POS (product-of-sum) expression for each of the outputs Y and Z. Show the loops clearly. (6 marks)\n(iii) Briefly describe the function performed by this circuit. (2 marks)",
    figures: [
      {
        kind: "table",
        head: ["U", "V", "W", "Y", "Z"],
        rows: [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 1],
          [0, 1, 0, 0, 1],
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 1, 1, 0],
          [1, 1, 0, 1, 0],
          [1, 1, 1, 1, 1],
        ],
        caption: "Table Q2",
      },
    ],
    modelAnswer:
      "(i) Y(U, V, W) = Σm(3, 5, 6, 7) = U'VW + UV'W + UVW' + UVW.\nZ(U, V, W) = Σm(1, 2, 4, 7) = U'V'W + U'VW' + UV'W' + UVW.\n(ii) Y: the 0s are at 0, 1, 2, 4.\n- 0 and 1 (U = 0, V = 0) → (U + V).\n- 0 and 2 (U = 0, W = 0) → (U + W).\n- 0 and 4 (V = 0, W = 0) → (V + W).\nY = (U + V)(U + W)(V + W).\nZ: the 0s are at 0, 3, 5, 6. No two of them are adjacent, so each loop is a single cell and the minimum POS is the canonical one:\nZ = (U + V + W)(U + V' + W')(U' + V + W')(U' + V' + W).\n(iii) The circuit is a **full adder**: it adds the three bits U, V and W. Z is the sum bit (1 when an odd number of inputs are 1) and Y is the carry out (1 when two or more inputs are 1).",
    modelFigures: [
      { kind: "kmap", vars: ["U", "V", "W"], values: vals(3, [3, 5, 6, 7]), groups: ["(U + V)", "(U + W)", "(V + W)"], showIndex: true, caption: "Y: three 2-cell 0-loops" },
      { kind: "kmap", vars: ["U", "V", "W"], values: vals(3, [1, 2, 4, 7]), groups: ["(U + V + W)", "(U + V' + W')", "(U' + V + W')", "(U' + V' + W)"], showIndex: true, caption: "Z: four single-cell 0-loops" },
    ],
    rubric: [
      { point: "(i) Correct Σm list for Y (3, 5, 6, 7) and for Z (1, 2, 4, 7)", marks: 2 },
      { point: "(ii) Y: three correct 0-loops drawn (0–1, 0–2, 0–4)", marks: 2 },
      { point: "(ii) Y = (U + V)(U + W)(V + W) with correct sum-term polarities", marks: 2 },
      { point: "(ii) Z: correct K-map, notes no adjacent 0s, gives the 4-factor POS", marks: 2 },
      { point: "(iii) Identifies a full adder: Z = sum, Y = carry out of U + V + W", marks: 2 },
    ],
    solution: "See the model answer. Key checks: Y has three 2-cell 0-loops that all share cell 0; Z has no adjacent 0s (no loops bigger than one cell); the circuit is a full adder.",
  },
  {
    kind: "open",
    subtopic: "Active-low design with waveforms",
    difficulty: "hard",
    source: "Style: PYP 2020-21 S2 Q2(b)",
    prompt:
      "A logic circuit has inputs EN*, A*, B, C and an output F*, where * denotes an active-low signal. F* is asserted only when EN* is asserted and either of the following holds:\n- A* and B are both asserted, or\n- exactly one of B and C is asserted.\n(i) Sketch a logic circuit diagram with appropriate bubbles to show the logic function clearly. (4 marks)\n(ii) Sketch the waveform of F* for the input waveforms below, one value per 1 ms slot. (3 marks)",
    figures: [
      {
        kind: "wave",
        signals: [
          { name: "EN*", wave: "10000001" },
          { name: "A*", wave: "11001100" },
          { name: "B", wave: "01100111" },
          { name: "C", wave: "00101100" },
        ],
        ticks: ["0", "1", "2", "3", "4", "5", "6", "7"],
      },
    ],
    modelAnswer:
      "(i) Assertion condition: EN*'·(A*'·B + (B ⊕ C)).\n- AND gate with a bubble on its A* input: P = A*'·B (\"A* asserted and B asserted\").\n- XOR gate: Q = B ⊕ C (\"exactly one of B, C asserted\").\n- OR gate: R = P + Q.\n- Output gate: an AND with a bubble on the EN* input and a bubble on the output (i.e. a NAND with an inverted EN* input), because F* is active low: F* = (EN*'·R)' = EN* + R'.\nThe bubbles match the active-low signals EN*, A* and F* (bubble-to-bubble).\n(ii) Slot by slot:\n- t = 0: EN* = 1 (disabled) → F* = 1.\n- t = 1: B ⊕ C = 1 → F* = 0.\n- t = 2: A* = 0 and B = 1 → P = 1 → F* = 0.\n- t = 3: A* = 0 but B = 0, and B ⊕ C = 0 → F* = 1.\n- t = 4: B ⊕ C = 1 → F* = 0.\n- t = 5: A* = 1 (negated), B = C = 1 → F* = 1.\n- t = 6: A* = 0, B = 1 → F* = 0.\n- t = 7: EN* = 1 (disabled) → F* = 1, even though B ⊕ C = 1.\nF* = 1 0 0 1 0 1 0 1.",
    modelFigures: [
      {
        kind: "circuit",
        circuit: {
          inputs: ["EN*", "A*", "B", "C"],
          gates: [
            { id: "P", type: "AND", in: ["!A*", "B"] },
            { id: "Q", type: "XOR", in: ["B", "C"] },
            { id: "R", type: "OR", in: ["P", "Q"] },
            { id: "F*", type: "NAND", in: ["!EN*", "R"] },
          ],
          outputs: ["F*"],
        },
        caption: "Bubbles on the A* and EN* pins and on the output match the active-low signals.",
      },
      {
        kind: "wave",
        signals: [
          { name: "EN*", wave: "10000001" },
          { name: "A*", wave: "11001100" },
          { name: "B", wave: "01100111" },
          { name: "C", wave: "00101100" },
          { name: "F*", wave: "10010101" },
        ],
        ticks: ["0", "1", "2", "3", "4", "5", "6", "7"],
      },
    ],
    rubric: [
      { point: "AND of A*' and B with a bubble on the A* input", marks: 1 },
      { point: "XOR (or equivalent gates) for exactly one of B, C", marks: 1 },
      { point: "OR of the two conditions, gated by EN*' with a bubble on the EN* pin", marks: 1 },
      { point: "Active-low output shown with an output bubble (NAND), F* = (EN*'·R)'", marks: 1 },
      { point: "F* = 1 while disabled (t = 0 and t = 7)", marks: 1 },
      { point: "Correct F* in slots 1–6: 0 0 1 0 1 0", marks: 2 },
    ],
    solution: "See the model answer. F* = (EN*'·(A*'B + B ⊕ C))' gives F* = 1 0 0 1 0 1 0 1.",
  },
  {
    kind: "open",
    subtopic: "Design from a specification, NAND implementation",
    difficulty: "medium",
    source: "Style: PYP 2017-18 S1 Q2(a)",
    prompt:
      "A logic circuit has four inputs A, B*, C, D* (* = active low) and an active-high output F. F is asserted when:\n- both A and B* are asserted, or\n- C is asserted and D* is negated, or\n- A is negated and both B* and D* are asserted.\n(i) Draw the K-map of F in terms of the logic levels of A, B*, C, D* and show your loops. (4 marks)\n(ii) Write the minimum-cost SOP expression for F. (2 marks)\n(iii) Draw a NAND-only implementation (complemented inputs are available). (2 marks)",
    modelAnswer:
      "Translate to logic levels: A asserted → A = 1; B* asserted → B* = 0; C asserted → C = 1; D* negated → D* = 1; D* asserted → D* = 0.\nF = A·B*' + C·D* + A'·B*'·D*'.\n(i) With variables ordered A, B*, C, D*: F = Σm(0, 2, 3, 7, 8, 9, 10, 11, 15).\n- B*'D*' (A, C free): 0, 2, 8, 10, the four corners.\n- AB*': row 10 (8, 9, 11, 10).\n- CD*: column 11 (3, 7, 15, 11).\nAll three loops are needed (0 is covered only by B*'D*', 9 only by AB*', 7 only by CD*). B*'C is another valid loop, but its 1s are already covered, so it would be redundant.\n(ii) **F = AB*' + CD* + B*'D*'** (3 terms, 6 literals). The third product term absorbed A' from the specification thanks to the corner loop.\n(iii) NAND-NAND: F = ((A·B*')'·(C·D*)'·(B*'·D*')')'. Three 2-input NANDs feed one 3-input NAND.",
    modelFigures: [
      { kind: "kmap", vars: ["A", "B*", "C", "D*"], values: vals(4, [0, 2, 3, 7, 8, 9, 10, 11, 15]), groups: ["B*'D*'", "AB*'", "CD*"], showIndex: true },
      {
        kind: "circuit",
        circuit: {
          inputs: ["A", "B*", "C", "D*"],
          gates: [
            { id: "N1", type: "NAND", in: ["A", "!B*"] },
            { id: "N2", type: "NAND", in: ["C", "D*"] },
            { id: "N3", type: "NAND", in: ["!B*", "!D*"] },
            { id: "F", type: "NAND", in: ["N1", "N2", "N3"] },
          ],
          outputs: ["F"],
        },
      },
    ],
    rubric: [
      { point: "Correct translation of asserted/negated to logic levels", marks: 1 },
      { point: "Correct K-map entries (1s at 0, 2, 3, 7, 8, 9, 10, 11, 15)", marks: 1 },
      { point: "Correct loops including the four-corner loop", marks: 2 },
      { point: "F = AB*' + CD* + B*'D*'", marks: 2 },
      { point: "Correct NAND-NAND circuit", marks: 2 },
    ],
    solution: "See the model answer: F = AB*' + CD* + B*'D*', implemented as NAND-NAND.",
  },
];
