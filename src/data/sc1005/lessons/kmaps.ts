import type { Lesson } from "@/lib/sc1005/types";

export const kmapsLesson: Lesson = {
  topic: "kmaps",
  bigPicture:
    "A **combinational** circuit has no memory: its output depends only on the inputs present right now, so a truth table describes it completely. This chapter is the pipeline from that truth table to the cheapest circuit. Every row has a **minterm** (1 on that row only) and a **maxterm** (0 on that row only), so the table can be written down at once as a canonical **sum of minterms** $\\sum m(\\ldots)$ or **product of maxterms** $\\prod M(\\ldots)$. Those canonical forms are long, so we minimise them into a **standard SOP or POS**, by algebra or, more easily, with a **Karnaugh map**: a truth table laid out (rows and columns in the order 00, 01, 11, 10) so that adjacent squares differ in only one variable and $AB + AB' = A$ becomes \"draw a loop\". Loops of 1s give an SOP; loops of 0s give a POS; using the biggest and fewest loops gives the minimum; **don't cares** let loops grow. A minimum SOP maps straight onto a NAND-NAND circuit and a minimum POS onto NOR-NOR. Finally, signals can be **active-low** (named with *), so you must translate \"asserted\" and \"negated\" into 0s and 1s and know how an **enable** input fixes a disabled output at 0 (active-high output) or 1 (active-low output). Exam questions combine all of this: canonical forms, a K-map with loops shown, a gate-level implementation, and a waveform or an active-low specification.",
  sections: [
    {
      title: "Combinational circuits, minterms and maxterms",
      intuition:
        "If the output depends only on the present inputs, the truth table is the whole specification. Minterms and maxterms are the vocabulary for naming one row of that table at a time.",
      keyIdeas: [
        "**Combinational** circuit: $O(t) = f[I_1(t), I_2(t), \\ldots, I_N(t)]$. No memory, unlike sequential circuits (Ch 9).",
        "Design flow: specification → truth table → Boolean expression → simplify → implement with the allowed gates.",
        "Number the rows by reading the inputs as a binary number with the **first-listed variable as the MSB**. For F(A, B, C, D), row 13 is A B C D = 1101.",
        "**Minterm** $m_i$: the AND of all $n$ variables, each **uncomplemented where row $i$ has a 1** and complemented where it has a 0. It equals 1 on row $i$ only. For 4 variables, $m_{13}$ = ABC'D.",
        "**Maxterm** $M_i$: the OR of all $n$ variables, each **uncomplemented where row $i$ has a 0** and complemented where it has a 1. It equals 0 on row $i$ only. $M_{13}$ = A' + B' + C + D'.",
        "$M_i = \\overline{m_i}$ (De Morgan). With $n$ inputs there are $2^n$ minterms and $2^n$ maxterms.",
      ],
      figures: [
        {
          kind: "table",
          head: ["X Y Z", "row", "minterm", "maxterm"],
          rows: [
            ["0 0 0", 0, "X'Y'Z' = $m_0$", "X + Y + Z = $M_0$"],
            ["0 0 1", 1, "X'Y'Z = $m_1$", "X + Y + Z' = $M_1$"],
            ["0 1 0", 2, "X'YZ' = $m_2$", "X + Y' + Z = $M_2$"],
            ["0 1 1", 3, "X'YZ = $m_3$", "X + Y' + Z' = $M_3$"],
            ["1 0 0", 4, "XY'Z' = $m_4$", "X' + Y + Z = $M_4$"],
            ["1 0 1", 5, "XY'Z = $m_5$", "X' + Y + Z' = $M_5$"],
            ["1 1 0", 6, "XYZ' = $m_6$", "X' + Y' + Z = $M_6$"],
            ["1 1 1", 7, "XYZ = $m_7$", "X' + Y' + Z' = $M_7$"],
          ],
          caption: "The 8 minterms and maxterms of three variables (X is the MSB). Minterm and maxterm of the same row have opposite literal polarities.",
        },
      ],
      example: {
        problem: "For F(A, B, C, D), write the minterm $m_6$ and the maxterm $M_6$, and check each on its own row.",
        steps: [
          "6 = 0110, so on row 6: A = 0, B = 1, C = 1, D = 0.",
          "Minterm: complement the variables that are 0 → $m_6$ = A'BCD'.",
          "Maxterm: complement the variables that are 1 → $M_6$ = A + B' + C' + D.",
          "Check: on row 6, A'BCD' = 1·1·1·1 = 1 and A + B' + C' + D = 0 + 0 + 0 + 0 = 0. On any other row at least one variable differs, so the minterm becomes 0 and the maxterm becomes 1.",
        ],
        answer: "$m_6$ = A'BCD', $M_6$ = A + B' + C' + D.",
      },
      pitfalls: [
        "Maxterms use the **opposite** polarity to minterms: a 0 in the row gives an uncomplemented literal in the maxterm.",
        "The first variable in F(A, B, C, D) is the MSB. Reading the row bits backwards turns $m_{11}$ (1011) into $m_{13}$ (1101).",
        "A minterm must contain **every** variable. A'B is not a minterm of F(A, B, C), it is a product term covering two minterms.",
      ],
      recall: [
        { q: "Minterm $m_5$ of F(X, Y, Z)?", a: "5 = 101 → XY'Z." },
        { q: "Maxterm $M_{2}$ of F(a, b, c, d)?", a: "2 = 0010 → a + b + c' + d." },
        { q: "On how many rows is a minterm equal to 1?", a: "Exactly one: its own row." },
      ],
    },
    {
      title: "Canonical forms: Σm, ΠM and converting between them",
      intuition:
        "Collect the rows where F = 1 and you have a sum of minterms; collect the rows where F = 0 and you have a product of maxterms. The two lists of row numbers are complementary, so converting is just \"list the other rows\".",
      visuals: ["canonical-builder"],
      keyIdeas: [
        "**Sum of minterms** (SOm, canonical SOP): OR together the minterms of every row with F = 1. Written $F(X,Y,Z) = \\sum m(1,2,4,7) = m_1 + m_2 + m_4 + m_7$.",
        "**Product of maxterms** (POM, canonical POS): AND together the maxterms of every row with F = 0. Written $F(X,Y,Z) = \\prod M(0,3,5,6) = M_0 M_3 M_5 M_6$.",
        "Conversion: the $\\prod M$ list is every row number **not** in the $\\sum m$ list. Together they list all $2^n$ rows exactly once.",
        "Complement: $F' = \\sum m(\\text{rows where } F=0) = \\prod M(\\text{rows where } F=1)$.",
        "To expand a product term to minterms, fill each missing variable both ways: for F(A, B, C), A'B = A'BC' + A'BC = $m_2 + m_3$. A term with $k$ missing variables covers $2^k$ minterms.",
        "Lecture convention: the sum of minterms suits an **active-high** output (list where it is true); the product of maxterms suits an **active-low** output. Odd parity of X, Y, Z can be named ODD (active high, 1 when odd) or EVEN* (active low, 0 when even).",
      ],
      formulas: ["F = \\sum_{i \\in S} m_i = \\prod_{i \\notin S} M_i, \\qquad F' = \\sum_{i \\notin S} m_i = \\prod_{i \\in S} M_i"],
      figures: [
        {
          kind: "table",
          head: ["X", "Y", "Z", "F"],
          rows: [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 0],
            [1, 1, 1, 1],
          ],
          caption: "Lecture example: F = 1 when an odd number of inputs are 1. F = Σm(1,2,4,7) = ΠM(0,3,5,6).",
        },
      ],
      example: {
        problem: "F(A, B, C) = A'B + AC'. Write F in both canonical forms and give $F'$ as a sum of minterms.",
        steps: [
          "A'B is missing C: A'BC' + A'BC = 010, 011 → $m_2, m_3$.",
          "AC' is missing B: AB'C' + ABC' = 100, 110 → $m_4, m_6$.",
          "So $F = \\sum m(2,3,4,6)$ = A'BC' + A'BC + AB'C' + ABC'.",
          "The remaining rows 0, 1, 5, 7 have F = 0: $F = \\prod M(0,1,5,7)$ = (A + B + C)(A + B + C')(A' + B + C')(A' + B' + C').",
          "$F' = \\sum m(0,1,5,7)$, the rows where F = 0.",
        ],
        answer: "$F = \\sum m(2,3,4,6) = \\prod M(0,1,5,7)$ and $F' = \\sum m(0,1,5,7)$.",
      },
      pitfalls: [
        "Writing $\\prod M(1,2,4,7)$ for the function $\\sum m(1,2,4,7)$. The maxterm list uses the **other** rows; $\\prod M(1,2,4,7)$ is $F'$.",
        "When two product terms share a minterm, list it once: A'B + BC' over (A, B, C) is $\\sum m(2,3,6)$, not $\\sum m(2,3,2,6)$.",
        "The variable order in F(A, B, C, D) fixes the row numbers. The same expression gives different index lists for F(D, C, B, A).",
      ],
      recall: [
        { q: "F(A,B,C) = Σm(0,2,6). Write F as a product of maxterms.", a: "ΠM(1,3,4,5,7)." },
        { q: "F(A,B,C,D) = ΠM(3,7,11,15). What is F' as a sum of minterms?", a: "Σm(3,7,11,15), the rows where F = 0 (here F' = CD)." },
        { q: "How many minterms does the product term B'D cover in F(A,B,C,D)?", a: "2 variables missing → $2^2$ = 4 (rows 1, 3, 9, 11)." },
      ],
    },
    {
      title: "Standard SOP and POS forms and algebraic minimisation",
      intuition:
        "Canonical forms use every variable in every term. Adjacent minterms combine by $xy + xy' = x$, so most functions have a much shorter standard form, and a shorter expression means fewer gates and fewer gate inputs.",
      keyIdeas: [
        "**Sum of products (SOP)**: an OR of product terms, each an AND of single literals. A product term need not contain every variable (xy + y'z).",
        "**Product of sums (POS)**: an AND of sum terms, each an OR of single literals: (x + y')(x' + z).",
        "Neither SOP nor POS: (xy)'z + xz' (complement over a product), xy(x' + z)' (complement over a sum), (xy + z)(x' + y) (a product inside a sum term).",
        "**Minimisation** aims to minimise the number of gates (fewest product or sum terms) and the number of inputs on each gate (fewest literals in each term). Several different minimum expressions can exist.",
        "Simplified expressions give simpler circuits: fewer gates, fewer connections, lower cost and improved reliability.",
        "Workhorse theorems: $xy + xy' = x$; $x + x'y = x + y$; $x + xy = x$; consensus $xy + x'z + yz = xy + x'z$; and their duals $(x+y)(x+y') = x$, $x(x' + y) = xy$.",
        "Methods listed in the lecture: the algebraic method (uses Boolean theorems, requires experience and skill), the Karnaugh map, the Quine–McCluskey (tabulation) method, and heuristic methods such as Espresso-II.",
      ],
      formulas: ["xy + xy' = x \\qquad (x+y)(x+y') = x \\qquad xy + x'z + yz = xy + x'z"],
      example: {
        problem: "F(A, B, C) = Σm(1, 3, 4, 6, 7). Find a minimum SOP and a minimum POS by algebra.",
        steps: [
          "SOP: F = A'B'C + A'BC + AB'C' + ABC' + ABC.",
          "A'B'C + A'BC = A'C(B' + B) = A'C. AB'C' + ABC' = AC'. Reuse ABC with ABC': ABC' + ABC = AB.",
          "Minimum SOP: **F = A'C + AC' + AB** (BC instead of AB is equally minimal: both cover row 7).",
          "POS: F = ΠM(0, 2, 5) = (A + B + C)(A + B' + C)(A' + B + C').",
          "(A + B + C)(A + B' + C) = A + C by $(x+y)(x+y') = x$ with x = A + C. Minimum POS: **F = (A + C)(A' + B + C')**.",
          "Check: (A + C)(A' + B + C') = AB + AC' + A'C + BC; BC is the consensus of A'C and AB, so it drops and the SOP returns.",
        ],
        answer: "F = A'C + AC' + AB = (A + C)(A' + B + C').",
      },
      pitfalls: [
        "(AB)' is not a literal. Expand it with De Morgan (A' + B') before calling an expression SOP.",
        "Algebra needs experience: it is easy to stop before the expression is fully simplified. A K-map is a good check.",
        "A minimum SOP and a minimum POS of the same function can have different costs (lecture: A + BCD versus (A + B)(A + C)(A + D)). Compare them if the question asks for \"the cheaper\" form.",
      ],
      recall: [
        { q: "Simplify Z = ABC + AB'(A'C')'.", a: "(A'C')' = A + C, so AB'(A + C) = AB' + AB'C = AB'. Z = ABC + AB' = A(BC + B') = AB' + AC." },
        { q: "Simplify X = (A' + B)(A + B + D)D'.", a: "(A' + B)(A + B + D) = B + A'D (distribute), times D' gives BD'. X = BD'." },
        { q: "Is f = (x + y)z' + w an SOP?", a: "No: (x + y)z' is a sum inside a product. Expanded, xz' + yz' + w is SOP." },
      ],
    },
    {
      title: "Karnaugh maps: layout, adjacency and looping rules",
      intuition:
        "A K-map gives the same information as the truth table in a different format: squares are labelled so that adjacent squares differ in only one variable. Then $AB + AB' = A$ is \"draw a loop around two neighbouring 1s\", and bigger loops cancel more variables.",
      visuals: ["kmap-adjacency"],
      keyIdeas: [
        "Rows and columns are labelled in the order **00, 01, 11, 10** (a Gray-code sequence), so neighbouring cells differ in one variable. Binary order (00, 01, 10, 11) breaks this.",
        "4-variable map (rows AB, columns CD), minterm numbers: row 00: 0 1 3 2; row 01: 4 5 7 6; row 11: 12 13 15 14; row 10: 8 9 11 10. Note the swapped last two columns and rows.",
        "The map **wraps around**: the left and right edges are adjacent, the top and bottom edges are adjacent, so the four corners (0, 2, 8, 10) form one group. Every cell of an $n$-variable map has $n$ neighbours.",
        "Looping rules (SOP): loop only 1s; loop sizes are powers of two ($2^k$ cells) and rectangular; no diagonal loops; every 1 must be in at least one loop; use the biggest and the fewest loops; cells may be in several loops.",
        "A loop of $2^k$ cells in an $n$-variable map is a product term with $n - k$ literals: keep each variable that is constant over the loop (uncomplemented if it is 1, complemented if it is 0) and drop those that change.",
        "OR the loop terms together to get the minimum SOP.",
      ],
      figures: [
        { kind: "kmap", vars: ["A", "B", "C", "D"], values: "----------------", showIndex: true, caption: "Cell numbering of a 4-variable K-map (small numbers). Rows AB and columns CD run 00, 01, 11, 10." },
        {
          kind: "kmap",
          vars: ["A", "B", "C", "D"],
          values: "0000000111111111",
          groups: ["A", "BCD"],
          caption: "Lecture example: the 8-cell loop gives A, the 2-cell loop (m7, m15) gives BCD, so Z = A + BCD.",
        },
      ],
      example: {
        problem: "Minimise F(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15) with a K-map.",
        figures: [{ kind: "kmap", vars: ["A", "B", "C", "D"], values: "1010010110100101", groups: ["B'D'", "BD"], showIndex: true }],
        steps: [
          "Fill the map: 1s at the four corners (0, 2, 8, 10) and in the centre square (5, 7, 13, 15).",
          "Corners: by wrap-around they are one 4-cell loop. Over it B = 0 and D = 0 while A and C change → B'D'.",
          "Centre: 5, 7, 13, 15 is a 2×2 loop with B = 1 and D = 1 → BD.",
          "Every 1 is covered by two loops of 4 cells, each giving 4 − 2 = 2 literals.",
        ],
        answer: "F = B'D' + BD (that is, B XNOR D).",
      },
      pitfalls: [
        "Labelling the columns 00, 01, 10, 11 (binary order): the map then has false neighbours and the loops give wrong terms.",
        "Missing wrap-around loops, especially the four corners and loops split between the top and bottom rows.",
        "Loops of 3, 5 or 6 cells, L-shapes and diagonals are not allowed. Cover such a region with two overlapping power-of-two loops.",
        "Taking a loop of 2 when a loop of 4 is available leaves an extra literal: always grow loops as far as they go.",
        "Use the **fewest** loops: if every 1 inside a loop is already covered by other loops, that loop is redundant and should be deleted.",
      ],
      recall: [
        { q: "Which cells are adjacent to m8 in a 4-variable map?", a: "m0, m9, m10 and m12 (flip one bit of 1000 each time). m0 and m10 are wrap-around neighbours." },
        { q: "How many literals does a loop of 8 cells give in a 4-variable map?", a: "4 − 3 = 1 literal." },
        { q: "Why are the rows and columns labelled 00, 01, 11, 10?", a: "So that physically adjacent cells differ in exactly one variable, which is what $AB + AB' = A$ needs." },
      ],
    },
    {
      title: "POS by looping 0s, and don't-care conditions",
      intuition:
        "Looping 1s gives an SOP (think minterms); looping 0s in the same way gives a POS (think maxterms). Don't cares are rows whose output you are free to choose, so you use each one only if it makes a loop bigger.",
      visuals: ["kmap-minimiser"],
      keyIdeas: [
        "**POS from a K-map**: loop the 0s with the same rules. Each loop gives a **sum term**: a variable that is 0 over the loop appears **uncomplemented**, one that is 1 appears **complemented**, one that changes is dropped. AND the sum terms.",
        "Compare costs: the lecture's Z = A + BCD (4 literals) versus Z = (A + B)(A + C)(A + D) (6 literals).",
        "**Don't care** (X or d): an input combination that will not occur (e.g. BCD codes 1010–1111) or for which it does not matter whether the output is 0 or 1. Tutorial notation: F = Σm(…) with d = Σm(…) listing the don't cares.",
        "SOP: an X looped with 1s is treated as 1; unlooped Xs are treated as 0. POS: an X looped with 0s is treated as 0; the others as 1. Loop an X only if it helps to form a bigger loop (so never draw a loop of Xs alone).",
        "Because each form uses the Xs differently, the minimum SOP and the minimum POS may differ on don't-care rows. Both are correct, and several minimum designs may exist.",
      ],
      figures: [
        {
          kind: "kmap",
          vars: ["A", "B", "C", "D"],
          values: "1111110000xxxxxx",
          groups: ["A'B'", "A'C'"],
          caption: "BCD digit < 6 (lecture): one SOP design, Z = A'B' + A'C'. A'C' + B'C and A'B' + BC' are equally minimal.",
        },
        {
          kind: "kmap",
          vars: ["A", "B", "C", "D"],
          values: "1111110000xxxxxx",
          groups: ["(A')", "(B' + C')"],
          caption: "The same function by looping 0s: Z = A'(B' + C'), only 3 literals.",
        },
      ],
      example: {
        problem: "The input ABCD is a BCD digit. Output F = 1 when the digit is 1, 2, 3 or 4. Find a minimum SOP and a minimum POS.",
        figures: [
          { kind: "kmap", vars: ["A", "B", "C", "D"], values: "0111100000xxxxxx", groups: ["B'C", "BC'D'", "A'B'D"], showIndex: true, caption: "SOP loops" },
          { kind: "kmap", vars: ["A", "B", "C", "D"], values: "0111100000xxxxxx", groups: ["(A')", "(B' + C')", "(B' + D')", "(B + C + D)"], showIndex: true, caption: "POS loops" },
        ],
        steps: [
          "F = Σm(1, 2, 3, 4) with don't cares d = Σm(10, 11, 12, 13, 14, 15).",
          "SOP: B'C covers 2, 3 with the Xs 10, 11 (a 4-cell loop). m4 joins X at 12: BC'D'. m1 joins 3: A'B'D.",
          "Minimum SOP: **F = B'C + BC'D' + A'B'D** (8 literals).",
          "POS: the 0s are at 0, 5, 6, 7, 8, 9. Rows 10 and 11 of the map (A = 1) are 0s and Xs, so (A') is one 8-cell loop.",
          "5, 7 with 13, 15 → (B' + D'); 6, 7 with 14, 15 → (B' + C'); m0 alone with m8 → (B + C + D).",
          "Minimum POS: **F = A'(B' + C')(B' + D')(B + C + D)** (8 literals, 4 sum terms).",
        ],
        answer: "F = B'C + BC'D' + A'B'D = A'(B' + C')(B' + D')(B + C + D).",
      },
      pitfalls: [
        "Writing the sum term with SOP polarity: a 0-loop where A = 1 throughout gives (A'), not (A).",
        "Treating every X as 1 (or making a loop of only Xs). Use an X only when it enlarges a loop.",
        "Assuming SOP and POS answers with don't cares must agree on every row. They need to agree only on the specified rows.",
      ],
      recall: [
        { q: "A loop of four 0s has A = 1, C = 0 throughout. Which sum term?", a: "(A' + C)." },
        { q: "In an SOP, what happens to a don't care that is not inside any loop?", a: "It is implemented as 0." },
        { q: "Why are BCD codes 1010–1111 don't cares?", a: "They are not valid BCD digits, so they never occur at the input." },
      ],
    },
    {
      title: "NAND-only and NOR-only implementations",
      intuition:
        "Put two bubbles on every internal wire of a two-level circuit and nothing changes. Pushing them into the gates turns AND-OR into NAND-NAND and OR-AND into NOR-NOR, so a minimum SOP or POS gives an all-NAND or all-NOR circuit directly.",
      visuals: ["nand-nor"],
      keyIdeas: [
        "**SOP → NAND-NAND**: one NAND per product term, feeding one output NAND. $F = AB + CD = \\overline{\\overline{AB}\\cdot\\overline{CD}}$.",
        "**POS → NOR-NOR**: one NOR per sum term, feeding one output NOR. $F = (A+B)(C+D) = \\overline{\\overline{A+B} + \\overline{C+D}}$.",
        "A single-literal term goes straight to the output gate **complemented**: F = A + BC' = $\\overline{A' \\cdot \\overline{BC'}}$.",
        "Complemented inputs are assumed available; otherwise make each with a NAND (or NOR) whose inputs are tied together.",
        "NAND-NAND realises an SOP; NOR-NOR realises a POS. Swapping them (NOR-NOR from an SOP) gives the **dual** function, which is wrong.",
        "NAND and NOR are each universal (NOT, AND and OR can all be built from them), so one IC type can implement any function.",
      ],
      figures: [
        {
          kind: "circuit",
          circuit: { inputs: ["A", "B", "C"], gates: [{ id: "P1", type: "NAND", in: ["A", "B"] }, { id: "P2", type: "NAND", in: ["!A", "C"] }, { id: "P3", type: "NAND", in: ["A", "!C"] }, { id: "F", type: "NAND", in: ["P1", "P2", "P3"] }], outputs: ["F"] },
          caption: "NAND-NAND for F = AB + A'C + AC' (Tutorial 4 Q1 function). Bubbles on input pins are the complemented inputs.",
        },
        {
          kind: "circuit",
          circuit: { inputs: ["A", "B", "C"], gates: [{ id: "S1", type: "NOR", in: ["A", "C"] }, { id: "S2", type: "NOR", in: ["!A", "B", "!C"] }, { id: "F", type: "NOR", in: ["S1", "S2"] }], outputs: ["F"] },
          caption: "NOR-NOR for the same function from its POS: F = (A + C)(A' + B + C').",
        },
      ],
      example: {
        problem: "Implement F = AC' + BC + D with NAND gates only (two levels, complemented inputs available), and write the NAND expression.",
        steps: [
          "Start from the SOP: one NAND per product term: $\\overline{AC'}$ and $\\overline{BC}$.",
          "The single literal D goes straight to the output NAND, complemented: D'.",
          "Output NAND: F = $\\overline{\\overline{AC'}\\cdot\\overline{BC}\\cdot D'}$.",
          "Check with De Morgan: $\\overline{XYZ} = X' + Y' + Z'$, so F = AC' + BC + D.",
          "Gates: two 2-input NANDs and one 3-input NAND (plus inverters for C' and D' if complements are not available).",
        ],
        answer: "F = ((AC')'·(BC)'·D')'",
      },
      pitfalls: [
        "Feeding a single-literal term into the output NAND uncomplemented. It must enter as its complement.",
        "Building NOR-NOR from an SOP or NAND-NAND from a POS. Match the form to the gate: SOP ↔ NAND, POS ↔ NOR.",
        "Counting the inverters for complemented inputs as free when the question restricts the gate type: say how you make them.",
      ],
      recall: [
        { q: "NAND-only form of F = AB' + C?", a: "F = ((AB')'·C')'." },
        { q: "NOR-only form of F = (A + B)(A' + C)?", a: "F = ((A + B)' + (A' + C)')'." },
        { q: "How do you make an inverter from a 2-input NAND?", a: "Tie both inputs together: (A·A)' = A'." },
      ],
    },
    {
      title: "Active-high and active-low signals, enabling, and design from a specification",
      intuition:
        "A signal's name says what it does; its active level says which voltage does it. Exam specifications are written in words like \"asserted\" and \"negated\", so the skill is translating them into 0s and 1s before you build the truth table.",
      visuals: ["active-low-enable"],
      keyIdeas: [
        "**Active high**: the named effect happens when the signal is 1. **Active low**: when it is 0. Active-low names carry a marker; the lecture shows several conventions, e.g. RESET*, /RECEIVE, TRANSMIT_L, READY−. This course uses *.",
        "**Asserted** = at its active level (1 for active high, 0 for active low). **Negated** (de-asserted) = the other level.",
        "The same wire can be named either way: ODD (active high) and EVEN* (active low) are identical signals. Write* = 0 means write; Add* = 0 means add.",
        "Translate the spec into literals: \"X asserted\" → X; \"Y* asserted\" → Y*' (it is 0); \"Y* negated\" → Y*. For an active-low output, write the condition C for assertion and set F* = C'.",
        "**Bubble-to-bubble**: draw a bubble on every gate pin that connects to an active-low signal, so the gate symbol reads directly in terms of asserted conditions.",
        "**Enable/disable**: when enabled the output follows the inputs; when disabled it is stuck at its **negated** level (0 for an active-high output, 1 for an active-low output). AND an active-high output with EN, or with EN*' for an active-low enable.",
        "Design procedure: spec → truth table (logic levels) → canonical form → K-map → minimum SOP/POS → gates (respecting any gate restrictions).",
      ],
      figures: [
        {
          kind: "wave",
          signals: [
            { name: "Open", wave: "001111000" },
            { name: "Reset*", wave: "110000111" },
          ],
          ticks: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
          caption: "Open (active high) and Reset* (active low) are both asserted from t = 2 to t = 6 and negated elsewhere.",
        },
        {
          kind: "circuit",
          circuit: { inputs: ["ChildSafe", "Unlock"], gates: [{ id: "Open", type: "AND", in: ["ChildSafe", "Unlock"] }], outputs: ["Open"] },
          caption: "Lecture enable example: when ChildSafe = 0 the circuit is disabled and Open is stuck at 0; when ChildSafe = 1, Open follows Unlock.",
        },
      ],
      example: {
        problem:
          "A circuit has inputs EN*, A, B and C* (* = active low) and an active-high output F. F is asserted only when EN* is asserted and either exactly one of A and B is asserted, or both A and B are asserted and C* is negated. Find a minimum SOP for F.",
        figures: [
          {
            kind: "circuit",
            circuit: {
              inputs: ["EN*", "A", "B", "C*"],
              gates: [
                { id: "P1", type: "AND", in: ["!A", "B"] },
                { id: "P2", type: "AND", in: ["A", "!B"] },
                { id: "P3", type: "AND", in: ["A", "C*"] },
                { id: "G", type: "OR", in: ["P1", "P2", "P3"] },
                { id: "F", type: "AND", in: ["!EN*", "G"] },
              ],
              outputs: ["F"],
            },
            caption: "F = EN*'·(A'B + AB' + AC*): the bubble on the EN* pin matches the active-low enable.",
          },
        ],
        steps: [
          "Enable: EN* asserted means EN* = 0, so F contains the factor EN*'. When EN* = 1, F = 0 (its negated level).",
          "\"Exactly one of A and B asserted\": A'B + AB'.",
          "\"A and B asserted and C* negated\": A·B·C* (C* negated means C* = 1).",
          "Inner function G(A, B, C*) = A'B + AB' + ABC* = Σm(2, 3, 4, 5, 7). On a 3-variable K-map: A'B (2, 3), AB' (4, 5), and m7 loops with m5 → AC*.",
          "G = A'B + AB' + AC* (BC* instead of AC* is equally minimal).",
        ],
        answer: "F = EN*'·A'B + EN*'·AB' + EN*'·AC* (i.e. F = EN*'(A'B + AB' + AC*)).",
      },
      pitfalls: [
        "Equating \"asserted\" with 1. For an active-low signal, asserted is 0.",
        "A disabled active-low output sits at 1, not 0.",
        "Dropping the * when writing expressions: A and A* are different signals with different meanings.",
        "Forgetting to apply the enable to every product term when expanding EN*'(…) into an SOP.",
      ],
      recall: [
        { q: "RESET* = 0. Is the reset asserted?", a: "Yes. RESET* is active low, so 0 is its asserted level." },
        { q: "An active-low output Y* is disabled. What level does it show?", a: "1, its negated level." },
        { q: "Output Z* is asserted when A is asserted and B* is negated. Write Z*.", a: "Asserted condition: A·B* = 1. Z* = (A·B*)' = A' + B*'." },
      ],
    },
  ],
  playbook: [
    "**\"Write the canonical sum of minterms\"**: list the rows with F = 1 as $\\sum m(\\ldots)$ or as full minterms; for the product of maxterms list the **other** rows, with literals complemented where the row bit is 1.",
    "**\"Simplify using algebra, give SOP\"**: expand any complement over a group with De Morgan, distribute, then apply $xy + xy' = x$, absorption and consensus. Check the result on a K-map.",
    "**\"Use a K-map, show the loops\"**: label rows and columns 00, 01, 11, 10; draw each loop as a power-of-two rectangle (wrap-around allowed); write one term per loop.",
    "**Minimum SOP**: loop every 1 using the biggest loops and the fewest loops (a square may be looped more than once). Delete any loop whose 1s are all covered by other loops.",
    "**Minimum POS**: loop the 0s; variable 0 over the loop → uncomplemented, 1 → complemented. AND the sum terms.",
    "**Don't cares**: use an X only if it enlarges a loop; never loop Xs alone. Mention that other equally minimal answers exist.",
    "**\"NAND only\" / \"NOR only\"**: NAND-NAND from the minimum SOP, NOR-NOR from the minimum POS. Single literals enter the output gate complemented.",
    "**Active-low specification (*)**: translate every \"asserted\"/\"negated\" into 0/1 first, build the truth table in logic levels, and for an active-low output write the assertion condition C and use F* = C'.",
    "**Enable input**: disabled output = negated level (0 for active high, 1 for active low); put EN (or EN*') into every product term, or AND it with the whole expression.",
    "**Waveform for an enabled circuit**: evaluate the output in each time slot between input edges. While disabled, the output is flat at its negated level whatever the data inputs do.",
  ],
};
