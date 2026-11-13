import type { ScDraft } from "@/lib/sc1001/types";

export const repetition: ScDraft[] = [
  {
    kind: "mcq",
    subtopic: "range()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "for i in range(2, 10, 3):\n    print(i, end=' ')",
    options: ["2 5 8 ", "2 5 8 11 ", "3 6 9 ", "2 4 6 8 "],
    answer: 0,
    verify: true,
    solution: "`range(2, 10, 3)` starts at 2 and adds 3 while the value is still **less than** 10: 2, 5, 8. 11 is not produced because the stop value is exclusive.",
  },
  {
    kind: "short",
    subtopic: "continue",
    difficulty: "medium",
    prompt: "What value does this code print?",
    code: "total = 0\nfor i in range(5):\n    if i % 2 == 0:\n        continue\n    total += i\nprint(total)",
    accept: ["4"],
    verify: true,
    solution: "`continue` skips the rest of the body for even `i` (0, 2, 4), so only 1 and 3 are added: 1 + 3 = **4**.",
  },
  {
    kind: "open",
    subtopic: "while vs for",
    difficulty: "medium",
    prompt: "Explain when you would choose a `while` loop over a `for` loop in Python. Give one example of each.",
    modelAnswer:
      "A `for` loop is used for definite iteration: when the number of repetitions is known in advance or we iterate over a sequence, e.g. `for name in names: print(name)`.\nA `while` loop is used for indefinite iteration: we repeat until a condition changes and do not know how many times in advance, e.g. reading input until the user types 'End': `while (s := input()) != 'End': ...`.",
    rubric: [
      { point: "for = definite iteration / iterating over a sequence or known count", marks: 1 },
      { point: "while = indefinite iteration, repeats while a condition holds", marks: 1 },
      { point: "A correct example of each", marks: 1 },
    ],
    solution: "Key distinction: **definite** (for) vs **indefinite** (while) iteration. A sentinel-controlled input loop is the classic `while` example.",
  },

  // ---------------- MCQ ----------------
  {
    kind: "mcq",
    subtopic: "range()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "for i in range(5, 0, -1):\n    print(i, end=' ')",
    options: ["5 4 3 2 1 0 ", "1 2 3 4 5 ", "5 4 3 2 1 ", "4 3 2 1 0 "],
    answer: 2,
    verify: true,
    solution:
      "With a negative step, `range` counts **down** from the start and stops before reaching the stop value. Start 5 is included and stop 0 is excluded: 5, 4, 3, 2, 1.",
  },
  {
    kind: "mcq",
    subtopic: "range()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "print(list(range(3, 15, 4)))",
    options: ["[3, 7, 11]", "[3, 7, 11, 15]", "[4, 8, 12]", "[3, 4, 5, 6]"],
    answer: 0,
    verify: true,
    solution:
      "Start at 3 and add 4 while the value is **less than** 15: 3, 7, 11. The next value would be 15, which is excluded because the stop value is exclusive.",
  },
  {
    kind: "mcq",
    subtopic: "counters & accumulators",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "count = 0\nfor ch in 'banana':\n    if ch == 'a':\n        count += 1\nprint(count)",
    options: ["2", "1", "6", "3"],
    answer: 3,
    verify: true,
    solution:
      "A `for` loop over a string visits each character in turn. `'banana'` has three `'a'`s (positions 1, 3, 5), so the counter ends at 3. The answer 6 would mean counting every character.",
  },
  {
    kind: "mcq",
    subtopic: "break / continue",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "for ch in 'python':\n    if ch == 'h':\n        break\n    print(ch, end='')",
    options: ["pyth", "pyt", "python", "py"],
    answer: 1,
    verify: true,
    solution:
      "Characters are printed until `ch` is `'h'`. At that point `break` runs **before** the `print`, so `'h'` and everything after it are never printed. Output: `pyt`.",
  },
  {
    kind: "mcq",
    subtopic: "infinite loops",
    difficulty: "medium",
    prompt: "What happens when this code runs?",
    code: "i = 0\nwhile i < 5:\n    if i == 2:\n        continue\n    print(i)\n    i += 1",
    options: [
      "It prints 0, 1, 3, 4 and stops",
      "It prints 0, 1, 2, 3, 4 and stops",
      "It prints 0 and 1, then loops forever without printing anything else",
      "It prints 0 and 1, then stops with an error",
    ],
    answer: 2,
    solution:
      "When `i` reaches 2, `continue` jumps back to the condition **before** `i += 1` runs. So `i` stays 2 forever and the loop never ends. In a `while` loop, make sure the update still happens on every path, e.g. increment before `continue`.",
  },
  {
    kind: "mcq",
    subtopic: "loop else",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "for n in [3, 5, 8, 9]:\n    if n % 2 == 0:\n        print('found', n)\n        break\nelse:\n    print('none')",
    options: ["found 8", "found 8\nnone", "none", "found 3"],
    answer: 0,
    verify: true,
    solution:
      "The loop finds the first even number, 8, prints it and `break`s. A loop's `else` block runs **only if the loop ends without `break`**, so `none` is not printed.",
  },
  {
    kind: "mcq",
    subtopic: "loop variable after loop",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "for i in range(2, 8, 2):\n    pass\nprint(i)",
    options: ["8", "6", "7", "NameError: name 'i' is not defined"],
    answer: 1,
    verify: true,
    solution:
      "`range(2, 8, 2)` produces 2, 4, 6. The loop variable still exists after the loop and keeps the **last value assigned**, which is 6. It never becomes 8, because 8 is not produced by the range.",
  },
  {
    kind: "mcq",
    subtopic: "nested loops & patterns",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "for i in range(1, 4):\n    print('*' * i)",
    options: ["***\n**\n*", "*\n**\n***\n****", "*\n*\n*", "*\n**\n***"],
    answer: 3,
    verify: true,
    solution:
      "`i` takes 1, 2, 3 (4 is excluded). `'*' * i` repeats the star `i` times, giving lines of 1, 2 and 3 stars.",
  },
  {
    kind: "mcq",
    subtopic: "nested loops & patterns",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "for i in range(3):\n    for j in range(i, 3):\n        print(j, end='')\n    print()",
    options: ["012\n012\n012", "0\n01\n012", "012\n12\n2", "012\n123\n234"],
    answer: 2,
    verify: true,
    solution:
      "The inner loop starts at the current `i`: i = 0 → 0 1 2; i = 1 → 1 2; i = 2 → 2. `end=''` keeps digits on one line, and the bare `print()` ends each row.",
  },
  {
    kind: "mcq",
    subtopic: "enumerate / zip",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "for i, c in enumerate('abc', 1):\n    print(i, c)",
    options: ["1 a\n2 b\n3 c", "0 a\n1 b\n2 c", "a 1\nb 2\nc 3", "1 abc"],
    answer: 0,
    verify: true,
    solution:
      "`enumerate(seq, start)` yields `(index, item)` pairs, counting from `start`. With `start=1` the indices are 1, 2, 3. Without the second argument they would start at 0.",
  },
  {
    kind: "mcq",
    subtopic: "enumerate / zip",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "names = ['Ann', 'Ben', 'Cal']\nscores = [70, 85]\nfor n, s in zip(names, scores):\n    print(n, s)",
    options: ["Ann 70\nBen 85\nCal None", "Ann 70\nBen 85", "Ann Ben Cal\n70 85", "ValueError: lists have different lengths"],
    answer: 1,
    verify: true,
    solution:
      "`zip` pairs items position by position and **stops at the shortest** sequence. `scores` has only 2 items, so `'Cal'` is never paired and no error is raised.",
  },
  {
    kind: "mcq",
    subtopic: "while loops",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "a, b = 0, 1\nwhile b < 20:\n    a, b = b, a + b\nprint(a, b)",
    options: ["8 13", "21 34", "13 20", "13 21"],
    answer: 3,
    verify: true,
    solution:
      "Trace (a, b): (0,1) → (1,1) → (1,2) → (2,3) → (3,5) → (5,8) → (8,13) → (13,21). The loop checks `b < 20` **before** each pass: 13 < 20 allows one more update to (13, 21), and then 21 < 20 is False, so the loop ends.",
  },
  {
    kind: "mcq",
    subtopic: "loop else",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "n = 10\nwhile n > 0:\n    n -= 4\n    if n == 2:\n        break\nelse:\n    print('finished')\nprint(n)",
    options: ["2", "finished\n2", "finished\n-2", "-2"],
    answer: 0,
    verify: true,
    solution:
      "n goes 10 → 6 → 2. When n is 2, `break` exits the loop, so the `while`'s `else` block is **skipped** (it only runs when the condition becomes False). Then `print(n)` prints 2.",
  },
  {
    kind: "mcq",
    subtopic: "off-by-one",
    difficulty: "easy",
    prompt: "Which loop prints the integers 1 to 10 inclusive, one per line?",
    options: [
      "for i in range(10): print(i)",
      "for i in range(1, 10): print(i)",
      "for i in range(1, 11): print(i)",
      "for i in range(0, 11): print(i + 1)",
    ],
    answer: 2,
    solution:
      "The stop value is exclusive, so to include 10 you need `range(1, 11)`. `range(10)` gives 0–9, `range(1, 10)` gives 1–9, and `range(0, 11)` with `i + 1` gives 1–11, which is one value too many.",
  },
  {
    kind: "mcq",
    subtopic: "counters & accumulators",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "p = 1\nfor k in range(1, 6, 2):\n    p *= k\nprint(p)",
    options: ["120", "15", "105", "9"],
    answer: 1,
    verify: true,
    solution:
      "`k` takes 1, 3, 5. A product accumulator starts at **1** (not 0): 1 × 1 × 3 × 5 = 15. 120 is 5! (all of 1–5) and 9 is the sum.",
  },
  {
    kind: "mcq",
    subtopic: "range()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "for i in range(5, 1):\n    print(i)\nprint('done')",
    options: ["5\n4\n3\n2\ndone", "5\n4\n3\n2", "5\n4\n3\n2\n1\ndone", "done"],
    answer: 3,
    verify: true,
    solution:
      "The default step is +1, so `range(5, 1)` counts **up** from 5 toward 1 and is empty. The loop body never runs. Counting down needs a negative step: `range(5, 1, -1)`.",
  },

  // ---------------- short ----------------
  {
    kind: "short",
    subtopic: "while loops",
    difficulty: "medium",
    prompt: "What value is printed?",
    code: "n = 10\nwhile n > 0:\n    n -= 3\nprint(n)",
    accept: ["-2"],
    verify: true,
    solution:
      "n: 10 → 7 → 4 → 1 → -2. After n becomes 1, the condition `1 > 0` is still True, so it is reduced once more to -2. Then the test fails. The loop overshoots 0 because the step does not divide 10 evenly.",
  },
  {
    kind: "short",
    subtopic: "loop else",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "for n in [3, 5, 7]:\n    if n % 2 == 0:\n        print('even found')\n        break\nelse:\n    print('all odd')",
    accept: ["all odd"],
    verify: true,
    solution:
      "No element is even, so `break` never runs. The loop finishes normally, so its `else` block runs and prints `all odd`. This is the standard search pattern: `else` means 'not found'.",
  },
  {
    kind: "short",
    subtopic: "counting iterations",
    difficulty: "medium",
    prompt: "What value is printed?",
    code: "count = 0\nfor i in range(4):\n    for j in range(i):\n        count += 1\nprint(count)",
    accept: ["6"],
    verify: true,
    solution:
      "The inner loop runs `i` times: 0 + 1 + 2 + 3 = 6. It runs 0 times when i = 0, because `range(0)` is empty.",
  },
  {
    kind: "short",
    subtopic: "counting iterations",
    difficulty: "medium",
    prompt: "What value is printed?",
    code: "i = 1\ncount = 0\nwhile i < 100:\n    i *= 3\n    count += 1\nprint(count)",
    accept: ["5"],
    verify: true,
    solution:
      "i takes 1 → 3 → 9 → 27 → 81 → 243, one multiplication per pass. That is 5 passes. After the 5th, i = 243 and `243 < 100` is False.",
  },
  {
    kind: "short",
    subtopic: "sentinel loops",
    difficulty: "easy",
    prompt: "In the list below, -1 is a sentinel that marks the end of the real data. What value is printed?",
    code: "data = [4, 7, 2, -1, 9]\ntotal = 0\nfor x in data:\n    if x == -1:\n        break\n    total += x\nprint(total)",
    accept: ["13"],
    verify: true,
    solution:
      "The loop adds 4 + 7 + 2 = 13, then meets the sentinel -1 and `break`s. The sentinel itself is not added, and neither is the 9 after it.",
  },
  {
    kind: "short",
    subtopic: "nested loops & patterns",
    difficulty: "hard",
    prompt: "What is printed by the following code? (Write it on one line, separated by single spaces.)",
    code: "for i in range(1, 4):\n    for j in range(1, 4):\n        if j == i:\n            continue\n        if i + j > 4:\n            break\n        print(f'{i}{j}', end=' ')",
    accept: ["12 13 21 31"],
    verify: true,
    solution:
      "i = 1: j = 1 skipped (`continue`), then 12 and 13 (sums 3 and 4 are not > 4). i = 2: 21, j = 2 skipped, j = 3 gives sum 5 → `break` (inner loop only). i = 3: 31, then j = 2 gives sum 5 → `break`. Result: `12 13 21 31`.",
  },
  {
    kind: "short",
    subtopic: "counting iterations",
    difficulty: "easy",
    prompt: "What value is printed?",
    code: "count = 0\nfor i in range(0, 20, 5):\n    count += 1\nprint(count)",
    accept: ["4"],
    verify: true,
    solution: "`range(0, 20, 5)` gives 0, 5, 10, 15. 20 is excluded, so the body runs 4 times.",
  },

  // ---------------- open ----------------
  {
    kind: "open",
    subtopic: "while vs for",
    difficulty: "easy",
    prompt: "Rewrite the following `for` loop as an equivalent `while` loop that prints exactly the same output.",
    code: "for i in range(10, 0, -2):\n    print(i)",
    modelAnswer:
      "```\ni = 10\nwhile i > 0:\n    print(i)\n    i -= 2\n```\nBoth print 10, 8, 6, 4, 2 on separate lines.",
    rubric: [
      { point: "Initialises the counter to 10 before the loop", marks: 1 },
      { point: "Correct condition (i > 0) so 0 is excluded", marks: 1 },
      { point: "Decrements by 2 inside the loop body, after printing", marks: 1 },
    ],
    solution:
      "A `range(start, stop, step)` loop maps to: initialise to `start`; loop while the counter has not reached `stop` (`>` for a negative step, `<` for a positive one); update by `step` at the end of the body.",
  },
  {
    kind: "open",
    subtopic: "sentinel loops",
    difficulty: "medium",
    prompt:
      "Write a Python program that repeatedly reads daily temperatures (floats) from the user until the user types `done`. It should then print how many days had a temperature **above 25** degrees. Use a sentinel-controlled loop.",
    modelAnswer:
      "```\ncount = 0\ns = input('Temperature (or done): ')\nwhile s != 'done':\n    if float(s) > 25:\n        count += 1\n    s = input('Temperature (or done): ')\nprint('Days above 25:', count)\n```",
    rubric: [
      { point: "Counter initialised to 0 before the loop", marks: 1 },
      { point: "Loop ends on the sentinel 'done' and the sentinel is not processed as data", marks: 1 },
      { point: "Converts input to float and counts only values > 25", marks: 1 },
      { point: "Reads the next value inside the loop (no infinite loop) and prints the count after the loop", marks: 1 },
    ],
    solution:
      "Sentinel pattern: read once before the loop, test the sentinel in the `while` condition, and read again at the end of the body. An equivalent version uses `while True:` with `if s == 'done': break`.",
  },
  {
    kind: "open",
    subtopic: "nested loops & patterns",
    difficulty: "hard",
    prompt:
      "Given a positive integer `n` (already assigned), use **nested** `for` loops to print a hollow square of `*` of size `n`. For `n = 4` the output is:\n```\n****\n*  *\n*  *\n****\n```\nUse `print('*', end='')` or `print(' ', end='')` for each character.",
    modelAnswer:
      "```\nfor row in range(n):\n    for col in range(n):\n        if row == 0 or row == n - 1 or col == 0 or col == n - 1:\n            print('*', end='')\n        else:\n            print(' ', end='')\n    print()\n```",
    rubric: [
      { point: "Outer loop over n rows, inner loop over n columns", marks: 1 },
      { point: "Correct border condition (first/last row or first/last column)", marks: 2 },
      { point: "Uses end='' within a row and a newline after each row", marks: 1 },
    ],
    solution:
      "A cell is on the border if its row or column index is 0 or n − 1. The bare `print()` after the inner loop ends each row. Forgetting `end=''` puts every character on its own line.",
  },
];
