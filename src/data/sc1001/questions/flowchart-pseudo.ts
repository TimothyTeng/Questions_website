import type { ScDraft } from "@/lib/sc1001/types";

export const flowchartPseudo: ScDraft[] = [
  // ---------- MCQ ----------
  {
    kind: "mcq",
    subtopic: "Flowchart symbols",
    difficulty: "easy",
    prompt: "In a flowchart, which symbol is used for a step such as `Is age >= 18?` where the flow splits into two routes?",
    options: ["Oval", "Parallelogram", "Rectangle", "Diamond"],
    answer: 3,
    solution:
      "A **diamond** is the decision symbol: it holds a yes/no (true/false) question and has two exits. Ovals mark start/end, parallelograms are input/output, rectangles are processes.",
  },
  {
    kind: "mcq",
    subtopic: "Flowchart symbols",
    difficulty: "easy",
    prompt: "A **parallelogram** in a flowchart represents:",
    options: [
      "The start or end of the algorithm",
      "An input or output operation, such as reading a number or printing a result",
      "A calculation or assignment",
      "A point where the flow splits depending on a condition",
    ],
    answer: 1,
    solution:
      "Parallelogram = **input/output** (e.g. `INPUT mark`, `PRINT total`). Start/end is the oval (terminator), calculations are rectangles, decisions are diamonds.",
  },
  {
    kind: "mcq",
    subtopic: "Flowchart symbols",
    difficulty: "easy",
    prompt: "Which flowchart symbol is used to mark the **Start** and **End** of an algorithm?",
    options: ["Rectangle", "Diamond", "Oval (terminator)", "Small circle (connector)"],
    answer: 2,
    solution:
      "The **oval** (terminator) marks where the algorithm begins and ends. A small circle is a connector used to join parts of a flowchart, not to start or stop it.",
  },
  {
    kind: "mcq",
    subtopic: "Flowchart symbols",
    difficulty: "easy",
    prompt: "In which flowchart symbol would you write the step `total ← total + price`?",
    options: ["Rectangle (process)", "Parallelogram (input/output)", "Diamond (decision)", "Oval (terminator)"],
    answer: 0,
    solution:
      "Updating a variable with a calculation is a **process**, drawn as a rectangle. Nothing is read or displayed (so not a parallelogram) and no question is asked (so not a diamond).",
  },
  {
    kind: "mcq",
    subtopic: "Flowchart symbols",
    difficulty: "medium",
    prompt: "What is the purpose of a **connector** (a small labelled circle) in a flowchart?",
    options: [
      "It marks the point where the algorithm stops",
      "It links parts of a flowchart that continue elsewhere (e.g. on another page) without drawing long, crossing flow lines",
      "It represents a loop that repeats a fixed number of times",
      "It stores the value of a variable",
    ],
    answer: 1,
    solution:
      "A connector is a small circle with a label (e.g. `A`). Flow that reaches connector `A` continues at the other connector `A`, so a large flowchart can be split across pages or tidied up without messy crossing arrows.",
  },
  {
    kind: "mcq",
    subtopic: "Flowchart symbols",
    difficulty: "easy",
    prompt: "How many exit flow lines does a decision symbol normally have, and how are they labelled?",
    options: [
      "One, labelled with the next step",
      "Three, labelled Less / Equal / Greater",
      "None, because a decision ends the flowchart",
      "Two, labelled Yes/No (or True/False)",
    ],
    answer: 3,
    solution:
      "A decision asks a yes/no question, so it has exactly **two** exits labelled **Yes/No** or **True/False**. The program continues along one of the two routes.",
  },
  {
    kind: "mcq",
    subtopic: "Tracing flowcharts",
    difficulty: "medium",
    prompt:
      "Trace the flowchart described below. What value is output?\n```\n1. [Oval]          Start\n2. [Rectangle]     x ← 3, y ← 0\n3. [Diamond]       Is x > 0?   Yes → step 4,  No → step 6\n4. [Rectangle]     y ← y + x\n5. [Rectangle]     x ← x - 1, then flow line back to step 3\n6. [Parallelogram] Output y\n7. [Oval]          End\n```",
    options: ["6", "3", "5", "0"],
    answer: 0,
    solution:
      "The loop runs while `x > 0`: y = 0 + 3 = 3 (x→2), y = 3 + 2 = 5 (x→1), y = 5 + 1 = 6 (x→0). Now `x > 0` is false, so **6** is output. `5` comes from stopping one pass early.",
  },
  {
    kind: "mcq",
    subtopic: "Control structures",
    difficulty: "medium",
    prompt:
      "In a flowchart, a flow line leaves a process box and points **back up** to an earlier decision symbol. Which control structure does this create?",
    options: ["Sequence", "Selection", "Iteration", "Termination"],
    answer: 2,
    solution:
      "Returning to an earlier decision means the steps in between can run again: **iteration** (a loop). Selection is when the decision's two branches go forward to different steps and then rejoin; sequence is steps in a straight line.",
  },
  {
    kind: "mcq",
    subtopic: "Pseudocode conventions",
    difficulty: "easy",
    prompt: "Which of the following is **NOT** a recommended guideline for writing pseudocode?",
    options: [
      "Write one statement per line",
      "Capitalise keywords such as IF, WHILE and OUTPUT",
      "Indent to show which statements belong inside a structure",
      "Follow the exact syntax of Python so the pseudocode can be run directly",
    ],
    answer: 3,
    solution:
      "Pseudocode is meant for **humans**, not machines, and should be **programming-language independent**. The other guidelines (one statement per line, capitalised keywords, indentation, ending multi-line structures with END IF / END WHILE) are all recommended.",
  },
  {
    kind: "mcq",
    subtopic: "Pseudocode to Python",
    difficulty: "medium",
    prompt:
      "The pseudocode below is translated into Python. Which `for` line makes the Python version behave exactly like the pseudocode (same values of `i`)?\n```\nSET total TO 0\nFOR i FROM 1 TO 5\n    total ← total + i * i\nEND FOR\nOUTPUT total\n```",
    options: ["`for i in range(1, 5):`", "`for i in range(1, 6):`", "`for i in range(5):`", "`for i in range(2, 6):`"],
    answer: 1,
    solution:
      "Pseudocode `FROM 1 TO 5` **includes** 5, but Python's `range` stop value is exclusive, so you need `range(1, 6)` to get 1, 2, 3, 4, 5. `range(1, 5)` misses 5, `range(5)` gives 0 to 4, and `range(2, 6)` misses 1.",
  },
  {
    kind: "mcq",
    subtopic: "Tracing pseudocode",
    difficulty: "medium",
    prompt:
      "What is output by the pseudocode below when the user enters **68**?\n```\nINPUT score\nIF score >= 80 THEN\n    OUTPUT \"A\"\nELSE IF score >= 65 THEN\n    OUTPUT \"B\"\nELSE IF score >= 50 THEN\n    OUTPUT \"C\"\nELSE\n    OUTPUT \"F\"\nEND IF\n```",
    options: ["B", "C", "B and C", "F"],
    answer: 0,
    solution:
      "68 >= 80 is false, then 68 >= 65 is true, so **B** is output. In an IF / ELSE IF chain, once one branch is taken the rest are skipped, so C is not also output even though 68 >= 50.",
  },
  {
    kind: "mcq",
    subtopic: "Tracing pseudocode",
    difficulty: "hard",
    prompt:
      "What is output by this pseudocode when the user enters **6**?\n```\nINPUT n\ncount ← 0\nWHILE n ≠ 1\n    IF n is even THEN\n        n ← n / 2\n    ELSE\n        n ← 3 × n + 1\n    END IF\n    count ← count + 1\nEND WHILE\nOUTPUT count\n```",
    options: ["9", "8", "7", "6"],
    answer: 1,
    solution:
      "Sequence of `n`: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1. That is **8** updates, so count = 8. The loop checks `n ≠ 1` before each pass, so it stops as soon as n becomes 1; counting the starting value as well gives the tempting wrong answer 9.",
  },
  {
    kind: "mcq",
    subtopic: "Control structures",
    difficulty: "medium",
    prompt:
      "In a flowchart, the loop's decision `Is count < 5?` comes **before** the loop body. The variable `count` starts at 7. How many times is the loop body executed?",
    options: ["Once", "5 times", "0 times", "It loops forever"],
    answer: 2,
    solution:
      "This is a **pre-test** loop (like WHILE): the condition is checked first. `7 < 5` is false straight away, so the flow takes the No exit and the body runs **0 times**. A body that always runs at least once needs the test placed after it.",
  },
  {
    kind: "mcq",
    subtopic: "Control structures",
    difficulty: "easy",
    prompt: "An `IF ... ELSE ... END IF` block in pseudocode is an example of which basic control structure?",
    options: ["Sequence", "Selection", "Iteration", "Recursion"],
    answer: 1,
    solution:
      "IF/ELSE chooses **one of two paths** based on a condition: **selection** (branching). Iteration repeats steps (WHILE/FOR); sequence runs steps one after another.",
  },
  {
    kind: "mcq",
    subtopic: "Flowchart to pseudocode",
    difficulty: "easy",
    prompt:
      "A flowchart reads `mark`, then a diamond asks `Is mark >= 50?`. The Yes branch outputs `Pass`, the No branch outputs `Fail`, and both branches then go to End. Which pseudocode matches it?",
    options: [
      "WHILE mark >= 50: OUTPUT \"Pass\" END WHILE; OUTPUT \"Fail\"",
      "OUTPUT \"Pass\"; OUTPUT \"Fail\"; IF mark >= 50 THEN END IF",
      "INPUT mark; IF mark >= 50 THEN OUTPUT \"Pass\" ELSE OUTPUT \"Fail\" END IF",
      "INPUT mark; IF mark >= 50 THEN OUTPUT \"Pass\" END IF; OUTPUT \"Fail\"",
    ],
    answer: 2,
    solution:
      "A diamond whose two branches rejoin is an **IF ... ELSE ... END IF**. The last option is wrong because `Fail` would be output even for passing marks; the WHILE version would loop forever because `mark` never changes.",
  },
  {
    kind: "mcq",
    subtopic: "Pseudocode to Python",
    difficulty: "hard",
    prompt:
      "A student turned a FizzBuzz pseudocode into Python but ordered the conditions badly. What does this program print?",
    code: "for n in range(14, 16):\n    if n % 3 == 0:\n        print('Fizz')\n    elif n % 5 == 0:\n        print('Buzz')\n    elif n % 15 == 0:\n        print('FizzBuzz')\n    else:\n        print(n)",
    options: ["14\nFizzBuzz", "14\nBuzz", "14\nFizz", "FizzBuzz"],
    answer: 2,
    verify: true,
    solution:
      "14 is not a multiple of 3, 5 or 15, so `14` is printed. 15 **is** a multiple of 3, so the first branch fires and prints `Fizz`; the `elif` branches are skipped, so `FizzBuzz` can never be printed. The most specific test (`n % 15 == 0`) must come **first**.",
  },
  {
    kind: "mcq",
    subtopic: "Algorithm properties",
    difficulty: "medium",
    prompt:
      "In a flowchart, the loop decision is `Is total < 100?`, but nothing inside the loop ever changes `total`, which starts at 0. Which requirement of an algorithm does this flowchart break?",
    options: [
      "It must terminate after a finite number of steps",
      "Every input and output must use a parallelogram",
      "It must contain at least one decision",
      "Every variable must be printed",
    ],
    answer: 0,
    solution:
      "Since `total` stays 0, `0 < 100` is always true and the loop never ends (an **infinite loop**). Every algorithm **must terminate**. The fix is to update `total` inside the loop so the condition eventually becomes false.",
  },
  // ---------- Short ----------
  {
    kind: "short",
    subtopic: "Flowchart symbols",
    difficulty: "easy",
    prompt: "Name the flowchart shape used for a **process** step, such as a calculation or an assignment. (one word)",
    accept: ["Rectangle", "rectangle"],
    solution: "A **rectangle**. Diamonds are decisions, parallelograms are input/output, ovals are start/end.",
  },
  {
    kind: "short",
    subtopic: "Tracing flowcharts",
    difficulty: "medium",
    prompt:
      "Trace the flowchart described below. What value is output?\n```\n1. [Oval]          Start\n2. [Rectangle]     k ← 1, total ← 0\n3. [Diamond]       Is k <= 5?   Yes → step 4,  No → step 6\n4. [Rectangle]     total ← total + k\n5. [Rectangle]     k ← k + 2, then flow line back to step 3\n6. [Parallelogram] Output total\n7. [Oval]          End\n```",
    accept: ["9"],
    solution:
      "k takes the values 1, 3, 5 (then 7, which fails `k <= 5`). total = 1 + 3 + 5 = **9**.",
  },
  {
    kind: "short",
    subtopic: "Tracing pseudocode",
    difficulty: "medium",
    prompt:
      "What is output by the pseudocode below?\n```\ntotal ← 0\ncount ← 0\nFOR EACH score IN [72, 45, 90, 38, 66]\n    IF score >= 50 THEN\n        total ← total + score\n        count ← count + 1\n    END IF\nEND FOR\nOUTPUT total / count\n```",
    accept: ["76", "76.0"],
    solution:
      "Only the scores >= 50 are counted: 72, 90 and 66. total = 228 and count = 3, so the output is 228 / 3 = **76** (76.0 in Python, since `/` gives a float).",
  },
  {
    kind: "short",
    subtopic: "Pseudocode to Python",
    difficulty: "easy",
    prompt:
      "The pseudocode `SET fact TO 1; WHILE n > 1: fact ← fact × n; n ← n − 1; END WHILE; OUTPUT fact` was translated into Python as shown. What does it print?",
    code: "n = 5\nfact = 1\nwhile n > 1:\n    fact = fact * n\n    n = n - 1\nprint(fact)",
    accept: ["120"],
    verify: true,
    solution: "fact = 5 × 4 × 3 × 2 = **120**. The loop stops when n reaches 1 (multiplying by 1 would not change the result anyway).",
  },
  {
    kind: "short",
    subtopic: "Pseudocode conventions",
    difficulty: "easy",
    prompt: "In pseudocode, which keyword(s) mark the end of a `WHILE` structure?",
    accept: ["END WHILE", "ENDWHILE", "EndWhile", "End While", "end while"],
    solution:
      "**END WHILE** (also written ENDWHILE). Pseudocode guidelines say to explicitly end multi-line structures (END IF, END WHILE, END FOR) so the reader can see where the body stops.",
  },
  {
    kind: "short",
    subtopic: "Pseudocode to Python",
    difficulty: "medium",
    prompt:
      "A flowchart inputs the number of boys and girls, computes `total ← boys + girls`, and outputs each group's percentage of the class, rounded to the nearest whole number. It was coded in Python as shown, with inputs 13 and 17 already filled in. What is printed?",
    code: "boys = 13\ngirls = 17\ntotal = boys + girls\nprint('Boys:', str(round(boys / total * 100)) + '%')\nprint('Girls:', str(round(girls / total * 100)) + '%')",
    accept: ["Boys: 43%\nGirls: 57%"],
    verify: true,
    solution:
      "total = 30. 13/30 × 100 = 43.33..., which rounds to 43; 17/30 × 100 = 56.67..., which rounds to 57. Output: `Boys: 43%` then `Girls: 57%`.",
  },
  {
    kind: "short",
    subtopic: "Tracing pseudocode",
    difficulty: "hard",
    prompt:
      "What is output by this pseudocode?\n```\ncount ← 0\nFOR i FROM 1 TO 4\n    FOR j FROM i TO 4\n        count ← count + 1\n    END FOR\nEND FOR\nOUTPUT count\n```",
    accept: ["10"],
    solution:
      "The inner loop runs from `i` to 4 (inclusive): 4 times when i = 1, 3 times when i = 2, 2 times when i = 3, once when i = 4. Total 4 + 3 + 2 + 1 = **10**. (16 would be the answer if the inner loop always started at 1.)",
  },
  {
    kind: "short",
    subtopic: "Pseudocode conventions",
    difficulty: "easy",
    prompt:
      "What is the name for a way of describing an algorithm step by step in informal English, one step per line, using the structure (IF, WHILE, ...) of a programming language but meant for humans to read? (one word)",
    accept: ["pseudocode", "Pseudocode", "pseudo-code", "Pseudo-code"],
    solution:
      "**Pseudocode**. Unlike a flowchart it is written as text, and unlike real code it is not meant to be run by a computer.",
  },
  // ---------- Open ----------
  {
    kind: "open",
    subtopic: "Writing pseudocode",
    difficulty: "hard",
    prompt:
      "Write pseudocode that outputs each number from 1 to 30 on its own line, except: output `Hi` for multiples of 4, `Bye` for multiples of 6, and `HiBye` for numbers that are multiples of **both** 4 and 6.",
    modelAnswer:
      "```\nFOR n FROM 1 TO 30\n    IF n MOD 4 = 0 AND n MOD 6 = 0 THEN\n        OUTPUT \"HiBye\"\n    ELSE IF n MOD 4 = 0 THEN\n        OUTPUT \"Hi\"\n    ELSE IF n MOD 6 = 0 THEN\n        OUTPUT \"Bye\"\n    ELSE\n        OUTPUT n\n    END IF\nEND FOR\n```\n(The first test can also be written `n MOD 12 = 0`; note that 12, not 24, is the smallest number divisible by both 4 and 6.)",
    rubric: [
      { point: "Loop over 1 to 30 inclusive with correct start/end", marks: 1 },
      { point: "Tests the 'both' case FIRST (n MOD 4 = 0 AND n MOD 6 = 0, or n MOD 12 = 0; not MOD 24)", marks: 1 },
      { point: "Correct separate tests for multiples of 4 and of 6 using ELSE IF", marks: 1 },
      { point: "Outputs the number itself otherwise; proper keywords, indentation, END IF / END FOR", marks: 1 },
    ],
    solution:
      "Two classic mistakes: testing `MOD 4` before the combined case (so 12 and 24 print `Hi`), and using `MOD 24` because 4 × 6 = 24 (12 is a multiple of both, so it must print `HiBye`).",
  },
  {
    kind: "open",
    subtopic: "Designing flowcharts",
    difficulty: "medium",
    prompt:
      "A shop sells an item at a given unit price. Describe a flowchart (list each step with its symbol) that inputs the **price** and **quantity**, computes the total, gives a 10% discount if the total is more than $100, and outputs the amount to pay.",
    modelAnswer:
      "1. Oval: Start\n2. Parallelogram: Input price, quantity\n3. Rectangle: total ← price × quantity\n4. Diamond: Is total > 100?\n   - Yes → Rectangle: total ← total × 0.9 → go to step 5\n   - No → go to step 5\n5. Parallelogram: Output total\n6. Oval: End\nFlow lines (arrows) connect each step in order; both branches of the decision rejoin before the output.",
    rubric: [
      { point: "Start and End ovals", marks: 1 },
      { point: "Input and output steps in parallelograms", marks: 1 },
      { point: "Total computed in a process rectangle", marks: 1 },
      { point: "Decision diamond `total > 100` with Yes branch applying discount and both branches rejoining", marks: 1 },
    ],
    solution:
      "This is **sequence + selection**. A common error is outputting the total inside only one branch, so customers on the No branch never see a result: make both branches rejoin before the single output.",
  },
  {
    kind: "open",
    subtopic: "Debugging pseudocode",
    difficulty: "medium",
    prompt:
      "The pseudocode below is meant to read the temperatures for **8** days and output their average. Identify the errors and write a corrected version.\n```\nSET day TO 0\nWHILE day <= 8\n    INPUT temp\n    ADD temp TO sum\nEND WHILE\nSET average TO sum / 8\nOUTPUT average\n```",
    modelAnswer:
      "Errors:\n- `sum` is never initialised, so it has no starting value.\n- `day` is never increased inside the loop, so the loop never ends.\n- Starting at 0 with `day <= 8` would read 9 temperatures, not 8.\nCorrected:\n```\nSET sum TO 0\nSET day TO 1\nWHILE day <= 8\n    INPUT temp\n    ADD temp TO sum\n    ADD 1 TO day\nEND WHILE\nSET average TO sum / 8\nOUTPUT average\n```",
    rubric: [
      { point: "Identifies that sum must be initialised to 0", marks: 1 },
      { point: "Identifies missing increment of day (infinite loop)", marks: 1 },
      { point: "Identifies off-by-one: 0..8 reads 9 values; fixes start or condition", marks: 1 },
      { point: "Gives a corrected version that reads exactly 8 values and outputs the average", marks: 1 },
    ],
    solution:
      "Check every loop for three things: is everything **initialised**, is the loop variable **updated**, and does it run the **right number of times**? Dividing by 8 is correct once exactly 8 values are read.",
  },
  {
    kind: "open",
    subtopic: "Pseudocode to Python",
    difficulty: "medium",
    prompt:
      "Translate the pseudocode below into a Python program. (For example, input `472` should output `13`.)\n```\nINPUT n\ntotal ← 0\nWHILE n > 0\n    total ← total + (n MOD 10)\n    n ← n DIV 10\nEND WHILE\nOUTPUT total\n```",
    modelAnswer:
      "```\nn = int(input())\ntotal = 0\nwhile n > 0:\n    total = total + n % 10\n    n = n // 10\nprint(total)\n```",
    rubric: [
      { point: "Reads input and converts it with int()", marks: 1 },
      { point: "Correct while loop with condition n > 0 and indented body", marks: 1 },
      { point: "MOD → % and DIV → // (integer division, not /)", marks: 1 },
      { point: "Initialises total to 0 and prints it after the loop", marks: 1 },
    ],
    solution:
      "`MOD` becomes `%` and `DIV` becomes `//`. Using `/` would make `n` a float (47.2, 4.72, ...), so the loop runs far too many times and adds fractional remainders, giving a wrong answer. `input()` returns a string, so `int()` is required. For 472: 2 + 7 + 4 = 13.",
  },
];
