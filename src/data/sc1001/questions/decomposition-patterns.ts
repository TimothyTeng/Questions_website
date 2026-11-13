import type { ScDraft } from "@/lib/sc1001/types";

export const decompositionPatterns: ScDraft[] = [
  // ---------- MCQ ----------
  {
    kind: "mcq",
    subtopic: "Decomposition",
    difficulty: "easy",
    prompt: "In computational thinking, what is **decomposition**?",
    options: [
      "Breaking a complex problem into smaller sub-problems that can be understood, implemented and tested individually",
      "Removing unnecessary details so that only the essential features of a problem remain",
      "Spotting similarities between problems so that one solution can be reused",
      "Writing the step-by-step instructions that a computer follows",
    ],
    answer: 0,
    solution:
      "Decomposition = **break the problem down** into manageable parts. The other options describe the other cornerstones: abstraction (hide detail), pattern recognition (find similarities) and algorithm design (write the steps).",
  },
  {
    kind: "mcq",
    subtopic: "Top-down design",
    difficulty: "easy",
    prompt: "Which description best matches **top-down design**?",
    options: [
      "Write every small helper function first and only decide later what the overall program should do",
      "Start with the whole problem, split it into a few major steps, then refine each step into smaller steps until each is simple enough to code directly",
      "Write the whole program as one long block and split it into functions only if it becomes too slow",
      "Test the finished program as a whole without testing any of its parts",
    ],
    answer: 1,
    solution:
      "Top-down design begins at the **top level** (the overall goal, e.g. `main()` calling `get_input`, `process`, `show_result`) and repeatedly refines each step. Building pieces first with no overall plan is the opposite (bottom-up without a design), and neither of the other options decomposes the problem at all.",
  },
  {
    kind: "mcq",
    subtopic: "Pattern recognition",
    difficulty: "easy",
    prompt: "Which statement best describes **pattern recognition** as a cornerstone of computational thinking?",
    options: [
      "Breaking a large problem into sub-problems",
      "Converting a flowchart into Python code",
      "Finding similarities or common differences among (decomposed) problems so that a known solution can be reused or generalised",
      "Checking that a program produces the correct output for every input",
    ],
    answer: 2,
    solution:
      "Pattern recognition looks for **common elements and common differences** between problems. Once a pattern is described, one generalised solution (often one parameterised function) can solve every instance. Breaking problems down is decomposition; checking outputs is testing.",
  },
  {
    kind: "mcq",
    subtopic: "Number & sequence patterns",
    difficulty: "easy",
    prompt: "The sequence `1, 4, 7, 10, 13, ...` has terms numbered `n = 1, 2, 3, ...`. Which expression gives the `n`-th term?",
    options: ["`3*n + 1`", "`n + 3`", "`3*(n - 2)`", "`3*n - 2`"],
    answer: 3,
    solution:
      "The common difference is 3, so the term has the form `3*n + c`. For `n = 1` the term is 1, so `3 + c = 1` and `c = -2`: `3*n - 2` (check: n = 4 gives 10). `3*n + 1` is off by one position (it gives 4 for n = 1), and `n + 3` ignores the step of 3.",
  },
  {
    kind: "mcq",
    subtopic: "Iterative accumulation",
    difficulty: "medium",
    prompt:
      "The code should compute `1/(2*3) + 2/(3*4) + 3/(4*5) + ... + 10/(11*12)`. Which expression correctly fills the blank (the target value in iteration `i`)?",
    code: "result = 0\nfor i in range(1, 11):\n    result = result + ______\nprint(result)",
    options: ["`i/((i+1)*(i+2))`", "`1/(i*(i+1))`", "`i/(i+1)*(i+2)`", "`(i+1)/((i+2)*(i+3))`"],
    answer: 0,
    solution:
      "List the targets: iteration 1 → `1/(2*3)`, iteration 2 → `2/(3*4)`; the numerator is `i` and the denominator is `(i+1)*(i+2)`. The brackets matter: `i/(i+1)*(i+2)` is evaluated left to right as `(i/(i+1))*(i+2)`, which multiplies instead of dividing. `(i+1)/((i+2)*(i+3))` is shifted by one term.",
  },
  {
    kind: "mcq",
    subtopic: "Iterative accumulation",
    difficulty: "medium",
    prompt:
      "To compute `1/20 + 2/19 + 3/18 + ... + 20/1` with `for i in range(1, 21):`, which target value should be added in iteration `i`?",
    options: ["`i/(20-i)`", "`i/(21-i)`", "`(21-i)/i`", "`i/(i-21)`"],
    answer: 1,
    solution:
      "Numerator and denominator always add up to 21, so the denominator is `21 - i`: i = 1 → `1/20`, i = 20 → `20/1`. `i/(20-i)` gives `1/19` first and crashes with `ZeroDivisionError` at i = 20; `(21-i)/i` flips every fraction (`20/1`, `19/2`, ...), which is a different series.",
  },
  {
    kind: "mcq",
    subtopic: "Iterative accumulation",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def alt_sum(n):\n    result = 0\n    for i in range(1, n + 1):\n        if i % 2 == 1:\n            result += i\n        else:\n            result -= i\n    return result\n\nprint(alt_sum(7), alt_sum(10))",
    options: ["-4 5", "28 55", "4 -5", "4 5"],
    answer: 2,
    verify: true,
    solution:
      "The function computes `1 - 2 + 3 - 4 + ...` (odd terms added, even terms subtracted). For n = 7: pairs `(1-2)+(3-4)+(5-6)` give -3, plus 7 = **4**. For n = 10: five pairs of -1 = **-5**. `28 55` are the plain sums with no sign changes.",
  },
  {
    kind: "mcq",
    subtopic: "Star patterns",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def row(n):\n    return '*' * n\n\nfor i in range(1, 4):\n    print(row(i))",
    options: ["***\n**\n*", "*\n**\n***", "*\n**\n***\n****", "***"],
    answer: 1,
    verify: true,
    solution:
      "`range(1, 4)` gives 1, 2, 3, and `row(i)` returns a string of `i` stars, so the rows have 1, 2 and 3 stars. The stop value 4 is excluded, so there is no 4-star row.",
  },
  {
    kind: "mcq",
    subtopic: "Star patterns",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def line(spaces, stars):\n    return ' ' * spaces + '*' * stars\n\nn = 3\nfor i in range(n):\n    print(line(n - 1 - i, 2 * i + 1))",
    options: ["*\n***\n*****", "*****\n ***\n  *", "  *\n ***\n*****", "  *\n  ***\n  *****"],
    answer: 2,
    verify: true,
    solution:
      "For row `i` = 0, 1, 2 the helper gets `(2, 1)`, `(1, 3)`, `(0, 5)`: the spaces shrink by 1 while the stars grow by 2, giving a centred pyramid. Recognising the pattern **spaces = n-1-i, stars = 2i+1** is what lets one helper draw every row.",
  },
  {
    kind: "mcq",
    subtopic: "Generalising with parameters",
    difficulty: "easy",
    prompt: "The code below repeats the same steps three times. Which function **best generalises** the repeated pattern?",
    code: "w1, h1 = 3, 4\nprint('Area:', w1 * h1, 'Perimeter:', 2 * (w1 + h1))\nw2, h2 = 5, 2\nprint('Area:', w2 * h2, 'Perimeter:', 2 * (w2 + h2))\nw3, h3 = 6, 6\nprint('Area:', w3 * h3, 'Perimeter:', 2 * (w3 + h3))",
    options: [
      "`def report(w1, h1, w2, h2, w3, h3):` that prints all three lines",
      "`def report():` that prints `w1 * h1` and `2 * (w1 + h1)`",
      "`def report(area, perimeter):` that just prints the two values it is given",
      "`def report(w, h):` that prints `w * h` and `2 * (w + h)`",
    ],
    answer: 3,
    solution:
      "What stays the **same** (the formulas and the message) goes in the body; what **differs** (width and height) becomes the parameters. `report(w, h)` works for any rectangle. The six-parameter version only works for exactly three rectangles, the no-parameter version is hard-wired to one rectangle, and `report(area, perimeter)` leaves the repeated calculations in the caller.",
  },
  {
    kind: "mcq",
    subtopic: "Tracing multi-function programs",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def is_even(n):\n    return n % 2 == 0\n\ndef square(n):\n    return n * n\n\ndef process(nums):\n    total = 0\n    for n in nums:\n        if is_even(n):\n            total += square(n)\n    return total\n\nprint(process([1, 2, 3, 4, 5]))",
    options: ["35", "6", "20", "55"],
    answer: 2,
    verify: true,
    solution:
      "`process` combines a **filter** (`is_even`), a **map** (`square`) and an **accumulation** (`total +=`). Only 2 and 4 pass the filter; their squares 4 + 16 = **20**. 35 is the sum of squares of the odd numbers, 6 is the sum of the evens without squaring, 55 squares everything.",
  },
  {
    kind: "mcq",
    subtopic: "Accumulate / filter / map",
    difficulty: "easy",
    prompt: "Which common pattern does this function follow?",
    code: "def passed(scores):\n    result = []\n    for s in scores:\n        if s >= 50:\n            result.append(s)\n    return result",
    options: [
      "Map: transform every element into a new value",
      "Filter: keep only the elements that satisfy a condition",
      "Accumulate: combine all elements into a single value",
      "Search: stop at the first element that matches",
    ],
    answer: 1,
    solution:
      "Each element is either copied unchanged or skipped depending on a condition, so this is a **filter** (equivalent to `list(filter(lambda s: s >= 50, scores))`). A map would append a *changed* value for every element; an accumulation would return one number; a search would `return` as soon as it finds a match.",
  },
  {
    kind: "mcq",
    subtopic: "Benefits of modularity",
    difficulty: "easy",
    prompt: "Why does decomposing a program into small functions make it **easier to test**?",
    options: [
      "Python skips functions that have already been tested",
      "Small functions cannot contain bugs",
      "Functions do not need test cases because they have docstrings",
      "Each function can be checked on its own with chosen inputs and expected outputs before the parts are combined",
    ],
    answer: 3,
    solution:
      "With decomposition you can **unit-test** each component (e.g. call `checkGuess([3,5,6,9], [3,5,9,6])` and expect `(2, 2)`) before wiring it into the main loop. When something fails, the error is narrowed to one small function. Small functions can still have bugs, and docstrings do not replace tests.",
  },
  {
    kind: "mcq",
    subtopic: "Tracing multi-function programs",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def make_row(n, ch):\n    return ch * n\n\ndef make_box(w, h):\n    lines = []\n    for r in range(h):\n        if r == 0 or r == h - 1:\n            lines.append(make_row(w, '#'))\n        else:\n            lines.append('#' + make_row(w - 2, '.') + '#')\n    return '\\n'.join(lines)\n\nprint(make_box(4, 3))",
    options: ["####\n#..#\n####", "####\n#....#\n####", "####\n####\n####", "#..#\n####\n#..#"],
    answer: 0,
    verify: true,
    solution:
      "For `h = 3` the rows are r = 0, 1, 2. The first and last rows are 4 `#`. The middle row is `'#' + '..' + '#'` because `make_row(w - 2, '.')` gives `w - 2 = 2` dots, keeping the width at 4. `'\\n'.join` puts the three rows on separate lines.",
  },
  {
    kind: "mcq",
    subtopic: "Divide and conquer",
    difficulty: "easy",
    prompt: "Which sequence correctly describes the **divide-and-conquer** strategy?",
    options: [
      "Solve the whole problem → decompose it → test it",
      "Compose the solutions → decompose the problem → solve each part",
      "Recognise patterns → remove details → write an algorithm",
      "Decompose the problem into sub-problems → solve each sub-problem → compose the sub-solutions into the final answer",
    ],
    answer: 3,
    solution:
      "Divide and conquer: **divide** (decompose into smaller sub-problems, often of the same form), **conquer** (solve each, directly when it is small enough), **combine** (compose their results). Recursion supports this naturally: e.g. the size of a tree is size(left) + 1 + size(right). The third option lists the CT cornerstones, not divide and conquer.",
  },
  {
    kind: "mcq",
    subtopic: "Divide and conquer",
    difficulty: "hard",
    prompt:
      "A complete binary tree is stored as a nested list `[left, root, right]`, and a leaf is a one-element list such as `[7]`. What is printed?",
    code: "def leaf_sum(t):\n    if len(t) == 1:\n        return t[0]\n    return leaf_sum(t[0]) + leaf_sum(t[2])\n\ntree = [[[7], 1, [9]], 3, [[8], 2, [4]]]\nprint(leaf_sum(tree))",
    options: ["34", "28", "6", "4"],
    answer: 1,
    verify: true,
    solution:
      "The problem is split into the left subtree and the right subtree, and the results are added. Note that the root value `t[1]` is **never added**, so only the leaves count: 7 + 9 + 8 + 4 = **28**. 34 would include the internal nodes 1, 3 and 2 (that needs `+ t[1]`); 4 is the number of leaves, not their sum.",
  },
  {
    kind: "mcq",
    subtopic: "Choosing helper functions",
    difficulty: "easy",
    prompt:
      "A student writes the whole Bulls and Cows (1A2B) game as one 80-line loop. Which decomposition best follows procedural abstraction?",
    options: [
      "`genNumbers(numList, count)` returns the target digits, `userGuess()` returns a validated guess as a list, `checkGuess(guess, answer)` returns `(bulls, cows)`; the main loop calls them until the guess is fully correct",
      "One function `game()` that contains the same 80 lines",
      "A separate function for each line of the original loop",
      "Global variables for the target, guess, bulls and cows, updated by functions that take no parameters and return nothing",
    ],
    answer: 0,
    solution:
      "Each helper does **one clear job** with explicit inputs (parameters) and outputs (return values), so it can be written and tested independently, and the main loop reads like the algorithm. Wrapping everything in one function changes nothing; one function per line is too fine-grained; communicating through globals hides each function's inputs and outputs and makes testing hard.",
  },

  // ---------- Short answer ----------
  {
    kind: "short",
    subtopic: "Pattern recognition",
    difficulty: "medium",
    prompt:
      "You already know that `1 + 2 + 3 + ... + 50 = 1275`. Use pattern recognition to find the value of `3 + 6 + 9 + ... + 150`.",
    accept: ["3825"],
    solution:
      "Each term is 3 times the corresponding term of the known sum: `3 + 6 + ... + 150 = 3 * (1 + 2 + ... + 50) = 3 * 1275 =` **3825**.",
  },
  {
    kind: "short",
    subtopic: "Pattern recognition",
    difficulty: "hard",
    prompt:
      "You already know that `1 + 2 + 3 + ... + 50 = 1275`. Use pattern recognition to find the value of `51 + 52 + 53 + ... + 100`.",
    accept: ["3775"],
    solution:
      "Write each term as 50 plus a term of the known sum: `51 = 50 + 1`, `52 = 50 + 2`, ..., `100 = 50 + 50`. There are 50 terms, so the total is `50 * 50 + (1 + 2 + ... + 50) = 2500 + 1275 =` **3775**.",
  },
  {
    kind: "short",
    subtopic: "Cellular automata",
    difficulty: "medium",
    prompt: "This helper from a cellular automaton simulator uses **wraparound** boundaries. What is printed?",
    code: "def get_neighborhood(state, i):\n    n = len(state)\n    return state[(i - 1) % n] + state[i] + state[(i + 1) % n]\n\ns = '10010'\nprint(get_neighborhood(s, 0), get_neighborhood(s, 4))",
    accept: ["010 101"],
    verify: true,
    solution:
      "With `n = 5`: for `i = 0` the left neighbour is `state[-1 % 5] = state[4] = '0'`, then `state[0] = '1'`, `state[1] = '0'` → `010`. For `i = 4`: `state[3] = '1'`, `state[4] = '0'`, and `(4 + 1) % 5 = 0` wraps to `state[0] = '1'` → `101`.",
  },
  {
    kind: "short",
    subtopic: "Cellular automata",
    difficulty: "hard",
    prompt:
      "The rule string lists the next cell for neighbourhoods `111, 110, 101, 100, 011, 010, 001, 000` in that order (rule 30 is `00011110`). What is printed?",
    code: "def rule_to_binary(rule):\n    return f'{rule:08b}'\n\ndef get_neighborhood(state, i):\n    n = len(state)\n    return state[(i - 1) % n] + state[i] + state[(i + 1) % n]\n\ndef next_state(state, rule_bits):\n    new = ''\n    for i in range(len(state)):\n        nb = get_neighborhood(state, i)\n        new += rule_bits[7 - int(nb, 2)]\n    return new\n\nprint(next_state('00100', rule_to_binary(30)))",
    accept: ["01110"],
    verify: true,
    solution:
      "`7 - int(nb, 2)` converts a neighbourhood to its position in the rule string (`111` → 0, `000` → 7). The neighbourhoods of `00100` are `000, 001, 010, 100, 000`. In rule 30, `000 → 0`, `001 → 1`, `010 → 1`, `100 → 1`, so the next row is **01110**. Every cell is computed from the *current* row, which is why `new` is built separately.",
  },
  {
    kind: "short",
    subtopic: "Number & sequence patterns",
    difficulty: "easy",
    prompt: "What is the next term of the sequence `2, 6, 12, 20, 30, ...`?",
    accept: ["42"],
    solution:
      "The differences are 4, 6, 8, 10, growing by 2, so the next difference is 12: 30 + 12 = **42**. Equivalently the n-th term is `n * (n + 1)` and 6 × 7 = 42.",
  },
  {
    kind: "short",
    subtopic: "Iterative accumulation",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def term(i):\n    return (i - 1) / i\n\ndef series(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += term(i)\n    return total\n\nprint(round(series(4), 2))",
    accept: ["1.92"],
    verify: true,
    solution:
      "`series(4)` accumulates `0/1 + 1/2 + 2/3 + 3/4` = 0 + 0.5 + 0.667 + 0.75 ≈ 1.9167, which rounds to **1.92**. Moving the target value into its own `term(i)` function means the same accumulation loop can be reused for any series by changing only `term`.",
  },
  {
    kind: "short",
    subtopic: "Tracing multi-function programs",
    difficulty: "medium",
    prompt: "What value is printed?",
    code: "def digits(n):\n    return [int(c) for c in str(n)]\n\ndef digit_sum(n):\n    return sum(digits(n))\n\ndef reduce_to_one(n):\n    while n >= 10:\n        n = digit_sum(n)\n    return n\n\nprint(reduce_to_one(9875))",
    accept: ["2"],
    verify: true,
    solution:
      "`digit_sum(9875)` = 9 + 8 + 7 + 5 = 29, still ≥ 10, so repeat: 2 + 9 = 11, then 1 + 1 = **2**, which is < 10 so the loop stops. Each function does one small job and `reduce_to_one` just repeats `digit_sum`.",
  },
  {
    kind: "short",
    subtopic: "Star patterns",
    difficulty: "easy",
    prompt: "What value is printed?",
    code: "def stars(row):\n    return 2 * row - 1\n\ntotal = 0\nfor r in range(1, 6):\n    total += stars(r)\nprint(total)",
    accept: ["25"],
    verify: true,
    solution:
      "`stars(r)` gives 1, 3, 5, 7, 9 for rows 1 to 5 (the stars in each row of a 5-row pyramid). Their sum is **25**; the sum of the first n odd numbers is always n².",
  },

  // ---------- Open ----------
  {
    kind: "open",
    subtopic: "Decomposition",
    difficulty: "medium",
    prompt:
      "A console to-do list application must let the user add a task (title and optional description), view all tasks, delete a task, mark a task as completed or pending, and filter tasks by status. Tasks are stored in a list called `tasks`.\nDecompose the application: describe how each task is stored, list **at least four** functions with their parameters and return values, and sketch the main loop that uses them.",
    modelAnswer:
      "Data: `tasks` is a list of dictionaries, e.g. `{'title': 'Lab 10', 'desc': '', 'done': False}`; the user selects a task by its number (index + 1).\nFunctions:\n- `add_task(tasks, title, desc='')`: appends a new task dict; returns nothing.\n- `show_tasks(task_list)`: prints each task with its number and status.\n- `delete_task(tasks, number)`: removes the task if `number` is valid; returns `True`/`False`.\n- `set_status(tasks, number, done)`: updates `'done'`; returns `True`/`False`.\n- `filter_tasks(tasks, status)`: returns a new list of tasks matching `'all'`, `'completed'` or `'pending'`.\n- `get_number(prompt, n)`: reads input until it is an integer from 1 to n.\nMain loop:\n```\ntasks = []\nwhile True:\n    show_menu()\n    choice = input('Enter your choice: ')\n    if choice == '1':\n        add_task(tasks, input('Title: '), input('Description: '))\n    elif choice == '2':\n        show_tasks(tasks)\n    ...\n    elif choice == '9':\n        break\n    else:\n        print('Invalid choice')\n```",
    rubric: [
      { point: "Sensible data structure for a task (e.g. dict or list with title, description, status)", marks: 1 },
      { point: "At least four functions, each doing one job, with clear parameters and return values", marks: 2 },
      { point: "Main loop that dispatches menu choices to the functions, handles invalid choices and allows exit", marks: 1 },
      { point: "Mentions validation of task numbers / input (handled in a helper rather than repeated)", marks: 1 },
    ],
    solution:
      "Good decompositions pass `tasks` in as a parameter instead of relying on globals, return results instead of printing where the caller needs the value (e.g. `filter_tasks` returns a list that `show_tasks` then prints), and keep input validation in one helper that every option reuses.",
  },
  {
    kind: "open",
    subtopic: "Generalising with parameters",
    difficulty: "medium",
    prompt:
      "The program below draws three left-aligned triangles. Identify the repeated pattern, write a function `triangle(height, ch)` that generalises it, and rewrite the program as three calls.",
    code: "for i in range(1, 4):\n    print('*' * i)\nfor i in range(1, 6):\n    print('#' * i)\nfor i in range(1, 3):\n    print('@' * i)",
    modelAnswer:
      "Pattern: every block prints rows 1 to h, where row i is the character repeated i times. Only the **height** (3, 5, 2) and the **character** change, so these become parameters.\n```\ndef triangle(height, ch):\n    \"\"\"Print a left-aligned triangle of the given height using ch.\"\"\"\n    for i in range(1, height + 1):\n        print(ch * i)\n\ntriangle(3, '*')\ntriangle(5, '#')\ntriangle(2, '@')\n```",
    rubric: [
      { point: "Identifies what is common (loop that prints ch * i) and what differs (height, character)", marks: 1 },
      { point: "Function with two parameters and correct loop bounds `range(1, height + 1)`", marks: 2 },
      { point: "Three correct calls reproducing the original output", marks: 1 },
    ],
    solution:
      "Watch the off-by-one: `range(1, 4)` in the original corresponds to a height of 3, so the general loop is `range(1, height + 1)`.",
  },
  {
    kind: "open",
    subtopic: "Choosing helper functions",
    difficulty: "hard",
    prompt:
      "In Bulls and Cows the target is a list of 4 **distinct** digits, e.g. `[3, 5, 9, 6]`. A guess (also a list of 4 digits) may repeat digits. A **bull** is a correct digit in the correct position; a **cow** is a digit that appears in the target at a different position. A target digit already counted as a bull cannot also count as a cow, and each target digit is matched at most once (target 3596, guess 3333 → 1 bull, 0 cows).\nWrite `checkGuess(guess, answer)` that returns the tuple `(bulls, cows)`. Use at least one helper function.",
    modelAnswer:
      "```\ndef count_bulls(guess, answer):\n    \"\"\"Number of positions where guess and answer agree.\"\"\"\n    bulls = 0\n    for i in range(len(answer)):\n        if guess[i] == answer[i]:\n            bulls += 1\n    return bulls\n\ndef checkGuess(guess, answer):\n    \"\"\"Return (bulls, cows); each target digit is matched at most once.\"\"\"\n    bulls = count_bulls(guess, answer)\n    used = [guess[i] == answer[i] for i in range(len(answer))]\n    cows = 0\n    for i in range(len(guess)):\n        if guess[i] == answer[i]:\n            continue                      # already a bull\n        for j in range(len(answer)):\n            if not used[j] and guess[i] == answer[j]:\n                used[j] = True            # this target digit is now taken\n                cows += 1\n                break\n    return bulls, cows\n```\nChecks: `checkGuess([3,5,6,9], [3,5,9,6])` → `(2, 2)`; `checkGuess([3,3,3,3], [3,5,9,6])` → `(1, 0)`; `checkGuess([1,2,3,4], [3,5,9,6])` → `(0, 1)`.",
    rubric: [
      { point: "Helper function with clear parameters and return value (e.g. counting bulls)", marks: 1 },
      { point: "Counts bulls correctly by comparing the same positions", marks: 1 },
      { point: "Counts cows only for non-bull positions and never matches a target digit twice", marks: 2 },
      { point: "Returns the tuple `(bulls, cows)` rather than printing", marks: 1 },
    ],
    solution:
      "The tricky part is repeated digits in the guess: a naive `if guess[i] in answer` counts 3333 as 1 bull **and** 3 cows. Marking target positions as used (or removing matched digits from a copy of the target) prevents double counting.",
  },
  {
    kind: "open",
    subtopic: "Iterative accumulation",
    difficulty: "medium",
    prompt:
      "Consider the series `1/2 - 2/3 + 3/4 - 4/5 + ... ± n/(n+1)` (the sign alternates, starting with +).\n(a) State the target value of iteration `i` and how its sign depends on `i`.\n(b) Write a function `alt_series(n)` that returns the sum. For example `alt_series(3)` is about 0.5833.",
    modelAnswer:
      "(a) Iteration i (from 1 to n) contributes `i/(i+1)`; it is **added** when i is odd and **subtracted** when i is even.\n(b)\n```\ndef alt_series(n):\n    \"\"\"Return 1/2 - 2/3 + 3/4 - ... up to n terms.\"\"\"\n    total = 0\n    for i in range(1, n + 1):\n        term = i / (i + 1)\n        if i % 2 == 1:\n            total += term\n        else:\n            total -= term\n    return total\n```",
    rubric: [
      { point: "Correct general target value `i/(i+1)`", marks: 1 },
      { point: "Correct sign rule (odd i add, even i subtract) implemented", marks: 1 },
      { point: "Accumulator initialised to 0, loop `range(1, n + 1)`, and `return total`", marks: 2 },
    ],
    solution:
      "Use the three elements of iterative accumulation: a **result variable**, a **for loop**, and the **target value** for iteration i. Write out the first few targets (`+1/2`, `-2/3`, `+3/4`) and generalise. Check: `alt_series(3)` = 0.5 - 0.6667 + 0.75 ≈ 0.5833.",
  },
];
