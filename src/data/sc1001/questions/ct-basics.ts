import type { ScDraft } from "@/lib/sc1001/types";

export const ctBasics: ScDraft[] = [
  // ---------- MCQ ----------
  {
    kind: "mcq",
    subtopic: "CT pillars",
    difficulty: "easy",
    prompt:
      "A student organising a hall event splits the job into smaller tasks: booking the venue, planning the food, arranging transport and drawing up the programme. Which computational thinking pillar is this?",
    options: ["Abstraction", "Decomposition", "Pattern recognition", "Algorithm design"],
    answer: 1,
    solution:
      "Breaking a big problem into smaller, more manageable sub-problems is **decomposition**. Abstraction is about ignoring unnecessary detail, pattern recognition is spotting similarities, and algorithm design is writing the step-by-step solution.",
  },
  {
    kind: "mcq",
    subtopic: "CT pillars",
    difficulty: "easy",
    prompt:
      "While writing programs to compute the average mark of Class A, Class B and Class C, a programmer notices that all three use exactly the same steps (add up the marks, count them, divide). Noticing this is an example of:",
    options: ["Decomposition", "Abstraction", "Pattern recognition", "Debugging"],
    answer: 2,
    solution:
      "Spotting that several problems share the same structure is **pattern recognition**. It lets us reuse one solution (e.g. one `average` function) for all three classes instead of solving each from scratch.",
  },
  {
    kind: "mcq",
    subtopic: "Abstraction",
    difficulty: "medium",
    prompt:
      "The MRT system map shows stations as dots and lines as coloured strips. It ignores real distances, street names and the actual curves of the tracks, yet it is exactly what a commuter needs to plan a trip. Which concept does this map best illustrate?",
    options: ["Decomposition", "Pattern recognition", "Algorithm design", "Abstraction"],
    answer: 3,
    solution:
      "**Abstraction** means keeping the details that matter for the task (which stations connect to which) and hiding the ones that do not (exact geography). A satellite photo of Singapore has more detail but is far less useful for counting stations or planning a route.",
  },
  {
    kind: "mcq",
    subtopic: "Algorithms",
    difficulty: "easy",
    prompt: "Which of the following is **NOT** a requirement for a correct algorithm?",
    options: [
      "Every step must be clear and unambiguous",
      "It must terminate after a finite number of steps",
      "It must be written in a programming language such as Python",
      "The order of the steps must be precisely specified",
    ],
    answer: 2,
    solution:
      "An algorithm is a precise, step-by-step procedure; it can be expressed in English, pseudocode or a flowchart. It only needs to be written in a programming language when we turn it into a **program** for the computer to run. The other three (unambiguous, terminates, ordered) are required.",
  },
  {
    kind: "mcq",
    subtopic: "Algorithms",
    difficulty: "medium",
    prompt: "Which statement best describes the relationship between an algorithm and a program?",
    options: [
      "A program is an algorithm encoded in a programming language so that a computer can execute it",
      "An algorithm is a program that has already been compiled into machine code",
      "Algorithms can be executed directly by the CPU, while programs need a human to follow them",
      "An algorithm and a program are the same thing; the words are interchangeable",
    ],
    answer: 0,
    solution:
      "Programming is taking an algorithm and **encoding** it in a programming language. The algorithm itself (e.g. written in pseudocode) is not directly readable by a computer; the program is what gets translated and executed.",
  },
  {
    kind: "mcq",
    subtopic: "Language levels",
    difficulty: "easy",
    prompt: "Machine language is best described as:",
    options: [
      "English-like statements that any processor can understand",
      "Instructions and data encoded as 0s and 1s, specific to a type of processor",
      "A high-level language that is translated by an interpreter",
      "A markup language used to describe web pages",
    ],
    answer: 1,
    solution:
      "Machine language is the computer's own language: binary-encoded instructions and data that are **specific to the processor type**. It is error-prone for humans to write directly, which is why high-level languages were invented. HTML is the markup language for web pages.",
  },
  {
    kind: "mcq",
    subtopic: "Language levels",
    difficulty: "medium",
    prompt: "Which statement about high-level programming languages (e.g. Python, C, Java) is TRUE?",
    options: [
      "They are executed directly by the CPU without any translation",
      "A high-level program always runs faster than an equivalent hand-written machine-code program",
      "The same high-level source code produces identical machine code on every processor",
      "They hide the internal operating details of the computer so programmers can focus on solving the problem",
    ],
    answer: 3,
    solution:
      "High-level languages provide **abstraction** from the hardware, making algorithms simpler to develop. They must be translated (compiled or interpreted) into machine language before running, the machine code differs between processor types, and they are not automatically faster than hand-tuned machine code.",
  },
  {
    kind: "mcq",
    subtopic: "Compiler vs interpreter",
    difficulty: "easy",
    prompt: "How does an **interpreter** process a high-level program?",
    options: [
      "It reads one statement at a time, translating and executing it before moving to the next",
      "It translates the whole program into an executable file, which is run later",
      "It converts the program into HTML so a web browser can display it",
      "It checks the program for logic errors and fixes them automatically",
    ],
    answer: 0,
    solution:
      "An interpreter translates and executes statements **one by one** at run time (Python, R, JavaScript). Translating the whole program into an executable first is what a **compiler** does (C, C++). Neither tool can detect logic errors for you.",
  },
  {
    kind: "mcq",
    subtopic: "Compiler vs interpreter",
    difficulty: "medium",
    prompt: "Which of the following is an advantage of a **compiled** language over an interpreted one?",
    options: [
      "It is easier to debug because errors are reported one statement at a time",
      "The same executable runs on any computing platform without recompiling",
      "After compilation, the program generally runs much faster",
      "Results appear almost immediately without translating the whole program first",
    ],
    answer: 2,
    solution:
      "Compiled programs **run very fast after compilation**, which is why C/C++ are used where speed matters. Easy debugging, portability across platforms and near-immediate results are advantages of **interpretation**; a compiled executable must be re-compiled for a different platform.",
  },
  {
    kind: "mcq",
    subtopic: "Compiler vs interpreter",
    difficulty: "medium",
    prompt: "Which pairing of languages with their usual translation approach is correct?",
    options: [
      "C: interpreted; Python: compiled; Java: compiled only",
      "C: compiled; Python: interpreted; Java: combination of compiling and interpreting",
      "C: compiled; Python: compiled; Java: interpreted only",
      "C: interpreted; Python: interpreted; Java: combination of compiling and interpreting",
    ],
    answer: 1,
    solution:
      "C and C++ are **compiled**; Python, R and JavaScript are **interpreted**; Java uses **both**: source is compiled to bytecode, which the Java Virtual Machine then interprets (with a JIT compiler speeding up hot code).",
  },
  {
    kind: "mcq",
    subtopic: "Compiler vs interpreter",
    difficulty: "medium",
    prompt: "A Java source file `Hello.java` is turned into `Hello.class`. What happens next when the program is run?",
    options: [
      "`Hello.class` is HTML that is displayed by a web browser",
      "`Hello.class` is native machine code that runs only on the processor it was compiled on",
      "`Hello.class` must be converted back to `Hello.java` before it can run",
      "`Hello.class` contains bytecode that the Java Virtual Machine (JVM) interprets, possibly JIT-compiling parts of it",
    ],
    answer: 3,
    solution:
      "Java is compiled to **bytecode** (`.class`), not to native machine code. The JVM interprets the bytecode, and may call a Just-In-Time compiler to compile frequently used parts at run time. This is why Java is portable across devices.",
  },
  {
    kind: "mcq",
    subtopic: "Errors",
    difficulty: "easy",
    prompt: "What kind of error does this code contain?",
    code: "x = 5\nif x > 3\n    print('big')",
    options: ["Syntax error", "Runtime error", "Logic error", "There is no error"],
    answer: 0,
    solution:
      "The `if` line is missing its colon, so the code breaks Python's grammar rules: a **syntax error**. Python reports it before running anything. A runtime error happens only while a syntactically valid program is running; a logic error gives wrong results with no error message.",
  },
  {
    kind: "mcq",
    subtopic: "Errors",
    difficulty: "medium",
    prompt: "What is the output when this program is run? (The last line of any error message is shown.)",
    code: "print('Start')\ncount = 0\nprint(10 / count)\nprint('End')",
    options: [
      "ZeroDivisionError: division by zero",
      "Start\n0\nEnd",
      "Start\nZeroDivisionError: division by zero",
      "Start\nEnd",
    ],
    answer: 2,
    verify: true,
    solution:
      "The code is syntactically valid, so it starts running: `Start` is printed. Dividing by `count` (0) raises a **runtime error**, `ZeroDivisionError`, which stops the program, so `End` is never printed. Statements before the crash still run.",
  },
  {
    kind: "mcq",
    subtopic: "Errors",
    difficulty: "hard",
    prompt:
      "The programmer wants to print the average of `a` and `b`. Which statement correctly describes what happens when the code is run?",
    code: "a = 4\nb = 6\navg = a + b / 2\nprint(avg)",
    options: [
      "It prints `7.0`; this is a logic error because no message is shown but the result is wrong",
      "It prints `5.0`; the code is correct",
      "It raises a runtime error because `/` produces a float",
      "Python reports a syntax error because brackets are required around `a + b`",
    ],
    answer: 0,
    solution:
      "Division has higher precedence than addition, so Python computes `a + (b / 2) = 4 + 3.0 = 7.0`. The program runs without complaint but gives the wrong answer: a **logic error**. The fix is `(a + b) / 2`. Brackets are optional syntax-wise, and mixing int and float is not an error.",
  },
  {
    kind: "mcq",
    subtopic: "Errors",
    difficulty: "hard",
    prompt:
      "This whole file is saved as `main.py` and run. What is the output? (The last line of any error message is shown.)",
    code: "print('one')\nprint('two')\nprint('three'",
    options: [
      "one\ntwo\nSyntaxError: '(' was never closed",
      "SyntaxError: '(' was never closed",
      "one\ntwo",
      "one\ntwo\nthree",
    ],
    answer: 1,
    verify: true,
    solution:
      "When running a script file, Python first parses (compiles to bytecode) the **whole file**. A syntax error anywhere means nothing runs, so not even `one` is printed. Compare with a runtime error, where the earlier lines do execute. (In the interactive REPL, each line is run as you enter it, so there `one` and `two` would appear first.)",
  },
  {
    kind: "mcq",
    subtopic: "IDE & REPL",
    difficulty: "easy",
    prompt: "At the Python interactive shell (the `>>>` prompt), you type `3 + 4` and press Enter, and `7` appears. Why does this happen?",
    options: [
      "The shell compiles the expression into an executable file and runs it",
      "The shell has a hidden `print()` built into every script file",
      "The shell is a Read-Eval-Print Loop: it reads your input, evaluates it, prints the result and waits for the next input",
      "`3 + 4` is a syntax error, and `7` is the error code",
    ],
    answer: 2,
    solution:
      "The interactive shell is a **REPL** (Read-Eval-Print Loop). It automatically displays the value of an expression you type. In a script file, `3 + 4` on its own line is evaluated but nothing is displayed unless you call `print()`.",
  },
  {
    kind: "mcq",
    subtopic: "IDE & REPL",
    difficulty: "medium",
    prompt: "What does an IDE (Integrated Development Environment) such as IDLE, Thonny or VS Code typically provide?",
    options: [
      "Only a compiler that turns Python into a standalone `.exe` file",
      "A code editor, a way to run the program and see its output, and debugging tools in one application",
      "A replacement for the Python interpreter that never reports errors",
      "A tool that converts pseudocode into flowcharts automatically",
    ],
    answer: 1,
    solution:
      "An IDE bundles an **editor** (with syntax highlighting), a way to **run** code (and usually a shell/REPL) and **debugging** tools such as breakpoints. It still uses the Python interpreter underneath, and errors are still reported.",
  },
  // ---------- Short ----------
  {
    kind: "short",
    subtopic: "CT pillars",
    difficulty: "easy",
    prompt:
      "Name the computational thinking pillar that focuses on identifying what is important in a problem and ignoring details that are not needed.",
    accept: ["Abstraction", "abstraction"],
    solution:
      "**Abstraction**: deciding which details to highlight and which to ignore. Jeannette Wing describes this process as underlying all of computational thinking.",
  },
  {
    kind: "short",
    subtopic: "Compiler vs interpreter",
    difficulty: "easy",
    prompt:
      "What is the name of the program that translates an **entire** high-level source program into machine-language instructions stored in an executable file, before the program is run?",
    accept: ["Compiler", "compiler", "a compiler", "A compiler"],
    solution:
      "A **compiler** (used by C and C++). An interpreter, by contrast, translates and executes one statement at a time while the program runs.",
  },
  {
    kind: "short",
    subtopic: "Errors",
    difficulty: "hard",
    prompt: "This program crashes. Type the **last line** of the error message exactly as Python shows it.",
    code: "price = 10\nqty = '5'\nprint(price * 2 + qty)",
    accept: ["TypeError: unsupported operand type(s) for +: 'int' and 'str'"],
    verify: true,
    solution:
      "`price * 2` is the int `20`, while `qty` is the **string** `'5'`. Python cannot add an `int` and a `str`, so it raises a `TypeError` at run time. It is a runtime error (the syntax is fine). Fix with `int(qty)`.",
  },
  {
    kind: "short",
    subtopic: "Errors",
    difficulty: "medium",
    prompt: "What is the complete output of this program? Include the last line of any error message.",
    code: "print('Hello')\nprint(score)\nscore = 90",
    accept: ["Hello\nNameError: name 'score' is not defined"],
    verify: true,
    solution:
      "`Hello` is printed first. On line 2, `score` has not been assigned yet (assignment happens on line 3), so Python raises a **NameError** at run time and stops. Order of statements matters: a variable must be created before it is used.",
  },
  {
    kind: "short",
    subtopic: "Abstraction",
    difficulty: "easy",
    prompt:
      "Niklaus Wirth wrote: Programs = Algorithms + Data Structures. Functions provide abstraction in algorithms. Strings, lists, tuples and dictionaries provide abstraction in ______. (one word)",
    accept: ["data", "Data", "data structures"],
    solution:
      "**Data** abstraction. Data structures such as lists and dictionaries let us work with a collection as one thing without caring how it is stored in memory, just as a function lets us use an algorithm without seeing its steps.",
  },
  {
    kind: "short",
    subtopic: "IDE & REPL",
    difficulty: "easy",
    prompt: "In the Python interactive shell you enter the two lines below, one at a time. What is displayed after the second line?\n```\n>>> x = 3\n>>> x * 2\n```",
    accept: ["6"],
    solution:
      "An assignment such as `x = 3` displays nothing. `x * 2` is an expression, so the REPL evaluates it and echoes its value: **6**. In a script you would need `print(x * 2)` to see it.",
  },
  {
    kind: "short",
    subtopic: "Errors",
    difficulty: "medium",
    prompt: "This code is meant to print the sum 1 + 2 + 3 + 4 + 5 = 15. What does it actually print?",
    code: "total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)",
    accept: ["10"],
    verify: true,
    solution:
      "`range(1, 5)` stops **before** 5, so only 1 + 2 + 3 + 4 = **10** is added. No error message appears; the program just gives the wrong answer, which is a **logic error**. Fix: `range(1, 6)`.",
  },
  {
    kind: "short",
    subtopic: "Compiler vs interpreter",
    difficulty: "medium",
    prompt:
      "Java source code is first compiled into an intermediate form, which the Java Virtual Machine then interprets. What is this intermediate form called? (one word)",
    accept: ["bytecode", "Bytecode", "byte code", "Java bytecode"],
    solution:
      "Java **bytecode** (stored in `.class` files). It is not tied to one processor, which makes Java portable; the JVM on each device interprets it (and may JIT-compile parts for speed).",
  },
  // ---------- Open ----------
  {
    kind: "open",
    subtopic: "CT pillars",
    difficulty: "medium",
    prompt:
      "A tour guide must plan a route that starts at a hotel, visits five attractions once each and returns to the hotel, keeping travel time short. Explain how **each** of the four computational thinking pillars could be applied to this problem.",
    modelAnswer:
      "- **Decomposition**: split the task into sub-problems, e.g. find travel times between every pair of places, choose the next attraction, repeat until all are visited, then return to the hotel.\n- **Pattern recognition**: notice that choosing each next stop is the same problem every time (from where I am now, which unvisited place is quickest to reach?), so one step can be repeated.\n- **Abstraction**: ignore irrelevant details like ticket prices or the scenery; model each place as a point and keep only the travel time between pairs (a distance table).\n- **Algorithm design**: write precise steps, e.g. start at hotel; WHILE unvisited attractions remain, go to the nearest unvisited one and mark it visited; finally return to the hotel.",
    rubric: [
      { point: "Decomposition: breaks the route problem into smaller sub-tasks", marks: 1 },
      { point: "Pattern recognition: identifies the repeated 'choose next stop' step or similarity", marks: 1 },
      { point: "Abstraction: keeps only travel times between places, ignores irrelevant details", marks: 1 },
      { point: "Algorithm design: gives clear ordered steps that terminate (e.g. nearest-unvisited loop)", marks: 1 },
    ],
    solution:
      "Each pillar must be tied to the specific problem, not just defined. A greedy 'go to the nearest unvisited attraction' algorithm is a good-enough answer; it does not have to find the optimal route.",
  },
  {
    kind: "open",
    subtopic: "Compiler vs interpreter",
    difficulty: "medium",
    prompt:
      "Compare a **compiler** and an **interpreter**. Your answer should explain how each translates a program, give one advantage of each, and name one language that uses each approach.",
    modelAnswer:
      "A compiler translates the entire source program into machine-language instructions (an executable file) before the program runs; the executable can then be launched directly. An interpreter reads one statement at a time and immediately translates and executes it before moving to the next.\nCompiler advantage: the program runs very fast after compilation (and the compiled code is compact). Interpreter advantage: results appear almost immediately and it is easy to debug; the code is portable across platforms.\nExamples: C or C++ (compiled); Python, R or JavaScript (interpreted). Java combines both.",
    rubric: [
      { point: "Compiler translates the whole program into an executable before running", marks: 1 },
      { point: "Interpreter translates and executes one statement at a time at run time", marks: 1 },
      { point: "A valid advantage of each (e.g. speed vs ease of debugging/portability)", marks: 1 },
      { point: "Correct example language for each", marks: 1 },
    ],
    solution:
      "Key contrast: **whole program, before running** (compiler) vs **statement by statement, while running** (interpreter). Do not claim compiled programs are portable: they must be re-compiled for each platform.",
  },
  {
    kind: "open",
    subtopic: "Errors",
    difficulty: "easy",
    prompt:
      "Explain the difference between a **syntax error**, a **runtime error** and a **logic error**. Give a short Python example of each.",
    modelAnswer:
      "- Syntax error: code that breaks the grammar rules of Python, so it cannot be run at all, e.g. `print('hi'` (missing bracket) or `if x > 3` (missing colon).\n- Runtime error: the code is valid but something goes wrong while it runs, and Python stops with an error message, e.g. `print(5 / 0)` gives ZeroDivisionError, or `int('abc')` gives ValueError.\n- Logic error: the program runs without any error message but produces the wrong result, e.g. computing an average as `a + b / 2` instead of `(a + b) / 2`.",
    rubric: [
      { point: "Syntax error: violates language rules, detected before the program runs, with example", marks: 1 },
      { point: "Runtime error: occurs during execution and stops the program, with example", marks: 1 },
      { point: "Logic error: no error message but wrong output, with example", marks: 1 },
    ],
    solution:
      "Logic errors are the hardest to find because Python cannot detect them; only testing with known expected outputs reveals them.",
  },
  {
    kind: "open",
    subtopic: "Abstraction",
    difficulty: "hard",
    prompt:
      "Explain what **abstraction** is and why it is important in computing. Then give one example of **algorithm abstraction** and one example of **data abstraction** from Python.",
    modelAnswer:
      "Abstraction is simplifying a problem by focusing on the details that matter and hiding or ignoring the rest. It is important because computing systems are very complex; abstraction distils what is essential and gives a manageable way to build solutions. Abstractions are often layered (e.g. high-level language over machine code), letting us work at the level of detail we need.\nAlgorithm abstraction: functions. E.g. we call `len(names)` or `sorted(scores)` without knowing the steps inside; similarly a user-defined `def average(marks):` hides how the average is computed.\nData abstraction: data structures. E.g. a list `scores = [70, 85, 92]` lets us treat many values as one object (append, index, loop over it) without knowing how Python stores it in memory; a dictionary maps names to marks.",
    rubric: [
      { point: "Defines abstraction: keep essential details, hide/ignore unnecessary ones", marks: 1 },
      { point: "Explains importance: manages complexity / layers of detail", marks: 1 },
      { point: "Valid algorithm abstraction example (a function used without knowing its internals)", marks: 1 },
      { point: "Valid data abstraction example (list/tuple/dict/string used as one unit)", marks: 1 },
    ],
    solution:
      "Link back to Wirth's 'Programs = Algorithms + Data Structures': functions abstract algorithms, data structures abstract data. High-level languages themselves are an abstraction over machine language.",
  },
];
