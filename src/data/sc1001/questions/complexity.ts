import type { ScDraft } from "@/lib/sc1001/types";

export const complexity: ScDraft[] = [
  {
    kind: "mcq",
    subtopic: "accumulator pattern",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "total = 1\nfor x in [2, 3, 4]:\n    total *= x\nprint(total)",
    options: ["9", "24", "1", "10"],
    answer: 1,
    verify: true,
    solution:
      "The accumulator `total` starts at 1 (the identity for multiplication) and is multiplied by each element: 1 × 2 × 3 × 4 = **24**. 9 is the sum 2 + 3 + 4, and 10 is that sum plus the starting value 1.",
  },
  {
    kind: "short",
    subtopic: "accumulator pattern",
    difficulty: "easy",
    prompt: "What does this code print?",
    code: "result = ''\nfor ch in 'banana':\n    if ch not in result:\n        result += ch\nprint(result)",
    accept: ["ban"],
    verify: true,
    solution:
      "The string accumulator `result` starts empty and only gains a character the **first** time that character is seen: b, a, n. Later `a` and `n` are already in `result` and are skipped, giving **ban**.",
  },
  {
    kind: "mcq",
    subtopic: "accumulator pattern",
    difficulty: "medium",
    prompt: "The function below is meant to return the largest value in a list. What does it print for this call?",
    code: "def biggest(lst):\n    best = 0\n    for x in lst:\n        if x > best:\n            best = x\n    return best\n\nprint(biggest([-7, -3, -12]))",
    options: ["-3", "-12", "-7", "0"],
    answer: 3,
    verify: true,
    solution:
      "`best` starts at 0, and no element is greater than 0, so it is never updated and **0** is returned — a value not even in the list. The correct initialisation for a max accumulator is the first element (`best = lst[0]`), as in the lecture's `max_value`. Then the answer would be -3.",
  },
  {
    kind: "short",
    subtopic: "counting steps",
    difficulty: "easy",
    prompt: "How many times is `count += 1` executed? Give the number printed.",
    code: "count = 0\nfor i in range(4):\n    for j in range(5):\n        count += 1\nprint(count)",
    accept: ["20"],
    verify: true,
    solution:
      "The inner loop runs 5 times for **each** of the 4 outer iterations: 4 × 5 = **20**. Adding them (4 + 5 = 9) is the classic mistake; nested loops multiply.",
  },
  {
    kind: "short",
    subtopic: "counting steps",
    difficulty: "medium",
    prompt: "How many times is `count += 1` executed? Give the number printed.",
    code: "count = 0\nfor i in range(6):\n    for j in range(i):\n        count += 1\nprint(count)",
    accept: ["15"],
    verify: true,
    solution:
      "The inner loop depends on `i`: it runs 0, 1, 2, 3, 4, 5 times. Total = 0 + 1 + 2 + 3 + 4 + 5 = **15** = 6 × 5 / 2. This is about half of 6 × 6 = 36, but still grows like n²/2, i.e. O(n²).",
  },
  {
    kind: "short",
    subtopic: "counting steps",
    difficulty: "medium",
    prompt: "What does this code print?",
    code: "n = 100\nsteps = 0\nwhile n > 1:\n    n = n // 2\n    steps += 1\nprint(steps)",
    accept: ["6"],
    verify: true,
    solution:
      "`n` goes 100 → 50 → 25 → 12 → 6 → 3 → 1, which is **6** halvings. A loop that halves its variable each time runs about log₂ n times (log₂ 100 ≈ 6.6), which is why halving loops are O(log n). 50 or 100 would be the answer for a loop that only subtracts.",
  },
  {
    kind: "short",
    subtopic: "simplifying Big-O",
    difficulty: "easy",
    prompt: "An algorithm needs `T(n) = 4n³ + 2n² + 30n + 9` steps in the worst case. Give its time complexity in Big-O notation.",
    accept: ["O(n^3)", "O(n**3)", "O(n³)", "O(n3)", "n^3", "n³"],
    solution:
      "Keep only the fastest-growing term and drop its constant factor: 4n³ dominates 2n², 30n and 9 for large n, so T(n) is **O(n³)**. Writing O(4n³) is not wrong in value but is not simplified.",
  },
  {
    kind: "mcq",
    subtopic: "simplifying Big-O",
    difficulty: "medium",
    prompt: "An algorithm takes `T(n) = 5n² + 2ⁿ` steps. What is its time complexity?",
    options: ["O(n²)", "O(5n²)", "O(2ⁿ)", "O(n² · 2ⁿ)"],
    answer: 2,
    solution:
      "An exponential term eventually outgrows any polynomial: for n = 20, 5n² = 2000 but 2ⁿ ≈ 1,000,000. So 2ⁿ dominates and T(n) is **O(2ⁿ)**. We **add** the terms, so they are not multiplied; O(5n²) both keeps a constant and picks the wrong term.",
  },
  {
    kind: "mcq",
    subtopic: "simplifying Big-O",
    difficulty: "medium",
    prompt: "An algorithm takes `T(n) = 3n + n log n + 50` steps. What is its time complexity?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
    answer: 3,
    solution:
      "n log n grows faster than 3n (because log n eventually exceeds 3) and much faster than the constant 50, so T(n) is **O(n log n)**. O(n) ignores the log factor, and O(n²) is too large — n log n grows more slowly than n².",
  },
  {
    kind: "mcq",
    subtopic: "Big-O of code",
    difficulty: "easy",
    prompt: "What is the time complexity of `total(lst)` where `n = len(lst)`?",
    code: "def total(lst):\n    s = 0\n    for x in lst:\n        s += x\n    return s",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    answer: 1,
    solution:
      "The loop body runs once per element, so T(n) ≈ 2n + 2 steps, which is **O(n)** — linear. Doubling the list doubles the work. It is not O(1) because the work depends on the list length.",
  },
  {
    kind: "mcq",
    subtopic: "Big-O of code",
    difficulty: "easy",
    prompt: "What is the time complexity of this function, where `n = len(lst)` (assume `lst` is non-empty)?",
    code: "def ends(lst):\n    print('Checking ends')\n    return lst[0] + lst[-1]",
    options: ["O(n)", "O(2)", "O(1)", "O(log n)"],
    answer: 2,
    solution:
      "Indexing a list by position takes the same time no matter how long the list is, and there is no loop. The function always does about 2 steps, and constant work is written **O(1)** (not O(2) — constants are dropped).",
  },
  {
    kind: "mcq",
    subtopic: "Big-O of code",
    difficulty: "medium",
    prompt: "What is the worst-case time complexity of `pairs(lst)` where `n = len(lst)`?",
    code: "def pairs(lst):\n    n = len(lst)\n    count = 0\n    for i in range(n):\n        for j in range(i + 1, n):\n            if lst[i] == lst[j]:\n                count += 1\n    return count",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    answer: 2,
    solution:
      "The inner loop runs n-1, n-2, ..., 1, 0 times, a total of n(n-1)/2 = n²/2 - n/2 comparisons. Dropping the constant ½ and the lower-order term leaves **O(n²)**. Starting the inner loop at `i + 1` halves the work but does not change the growth rate.",
  },
  {
    kind: "mcq",
    subtopic: "Big-O of code",
    difficulty: "medium",
    prompt: "What is the time complexity of `num_digits(n)` in terms of the value `n`?",
    code: "def num_digits(n):\n    count = 0\n    while n > 0:\n        n //= 10\n        count += 1\n    return count",
    options: ["O(log n)", "O(n)", "O(1)", "O(n²)"],
    answer: 0,
    solution:
      "Each iteration divides `n` by 10, so the loop runs once per digit — about log₁₀ n times. Logarithms of different bases differ only by a constant factor, so this is **O(log n)**. It is not O(n): for n = 1,000,000 the loop runs only 7 times.",
  },
  {
    kind: "mcq",
    subtopic: "Big-O of code",
    difficulty: "hard",
    prompt: "What is the time complexity of `f(n)`?",
    code: "def f(n):\n    total = 0\n    i = 1\n    while i < n:\n        for j in range(n):\n            total += 1\n        i *= 2\n    return total",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
    answer: 1,
    solution:
      "The outer loop doubles `i` each time, so it runs about log₂ n times. For **each** of those iterations the inner loop runs n times. Total ≈ n × log₂ n, i.e. **O(n log n)**. O(n²) assumes the outer loop runs n times; O(log n) forgets the inner loop.",
  },
  {
    kind: "mcq",
    subtopic: "Big-O of code",
    difficulty: "medium",
    prompt: "What is the time complexity of `stats(lst)` where `n = len(lst)`?",
    code: "def stats(lst):\n    total = 0\n    for x in lst:\n        total += x\n    biggest = lst[0]\n    for x in lst:\n        if x > biggest:\n            biggest = x\n    return total, biggest",
    options: ["O(n²)", "O(2n)", "O(n)", "O(log n)"],
    answer: 2,
    solution:
      "The two loops run **one after the other**, not nested, so the work is n + n = 2n steps (plus constants). Dropping the constant gives **O(n)**. Only nested loops multiply to give O(n²); O(2n) is not simplified.",
  },
  {
    kind: "mcq",
    subtopic: "list vs set/dict",
    difficulty: "easy",
    prompt: "Which operation takes **O(1)** time on average, regardless of how many items are stored?",
    options: [
      "`x in my_list`",
      "`x in my_set`",
      "`my_list.index(x)`",
      "`my_list.count(x)`",
    ],
    answer: 1,
    solution:
      "Sets (and dictionary keys) use hashing, so checking membership jumps almost directly to where `x` would be: **O(1)** on average. The three list operations all scan the list element by element, which is O(n) in the worst case.",
  },
  {
    kind: "mcq",
    subtopic: "list vs set/dict",
    difficulty: "hard",
    prompt: "Both `a` and `b` are lists of length n. What is the worst-case time complexity of `common(a, b)`?",
    code: "def common(a, b):\n    result = []\n    for x in a:\n        if x in b:\n            result.append(x)\n    return result",
    options: ["O(n)", "O(n log n)", "O(1)", "O(n²)"],
    answer: 3,
    solution:
      "There is only one visible loop, but `x in b` on a **list** is itself a hidden loop that may scan all n elements. n iterations × O(n) each = **O(n²)**. Converting `b` to a set first (`b = set(b)`, O(n)) makes each lookup O(1) on average, bringing the whole function down to O(n).",
  },
  {
    kind: "mcq",
    subtopic: "best/worst case",
    difficulty: "easy",
    prompt: "Linear search checks the elements of a list of length n one by one until it finds the target. What is its **best-case** time complexity?",
    options: [
      "O(1), when the target is the first element",
      "O(n), when the target is the first element",
      "O(1), when the target is not in the list",
      "O(log n), when the target is in the middle",
    ],
    answer: 0,
    solution:
      "If the target is at index 0, the search returns after a single comparison, no matter how long the list is: **O(1)**. The **worst** case is when the target is last or absent, needing n comparisons, O(n). Big-O analysis in this course usually reports the worst case because it bounds every input.",
  },
  {
    kind: "mcq",
    subtopic: "growth rates",
    difficulty: "easy",
    prompt: "Which list orders the complexity classes from **slowest-growing** to **fastest-growing**?",
    options: [
      "O(1), O(n), O(log n), O(n²), O(n log n), O(2ⁿ)",
      "O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)",
      "O(log n), O(1), O(n), O(n²), O(n log n), O(2ⁿ)",
      "O(1), O(log n), O(n), O(n log n), O(2ⁿ), O(n²)",
    ],
    answer: 1,
    solution:
      "Constant < logarithmic < linear < n log n < quadratic (polynomial) < exponential: **O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)**. log n grows far slower than n, n log n sits between n and n², and any exponential eventually overtakes any polynomial.",
  },
  {
    kind: "mcq",
    subtopic: "growth rates",
    difficulty: "medium",
    prompt: "An O(n²) algorithm takes 3 seconds on an input of size 10,000. Roughly how long would you expect it to take on an input of size 20,000?",
    options: ["6 seconds", "9 seconds", "12 seconds", "24 seconds"],
    answer: 2,
    solution:
      "For quadratic growth, doubling n multiplies the time by 2² = 4, so 3 × 4 = **12 seconds**. 6 seconds is what a linear O(n) algorithm would take, and 24 seconds (×8) would correspond to O(n³).",
  },
  {
    kind: "mcq",
    subtopic: "growth rates",
    difficulty: "easy",
    prompt: "What is the time complexity of this recursive Fibonacci function?",
    code: "def rFib(n):\n    if n == 0:\n        return 0\n    elif n == 1:\n        return 1\n    return rFib(n - 1) + rFib(n - 2)",
    options: ["O(n)", "O(log n)", "O(n²)", "O(2ⁿ)"],
    answer: 3,
    solution:
      "Each call with n ≥ 2 makes **two** further calls, so the call tree roughly doubles at each level and has depth n: about 2ⁿ calls, **O(2ⁿ)** (exponential). The iterative version that keeps only the last two values runs one loop of about n steps, which is O(n).",
  },
  {
    kind: "short",
    subtopic: "counting steps",
    difficulty: "hard",
    prompt: "How many times is `count += 1` executed? Give the number printed.",
    code: "count = 0\nn = 16\ni = n\nwhile i > 0:\n    for j in range(i):\n        count += 1\n    i //= 2\nprint(count)",
    accept: ["31"],
    verify: true,
    solution:
      "The outer loop runs with i = 16, 8, 4, 2, 1 and the inner loop runs i times each: 16 + 8 + 4 + 2 + 1 = **31**. Although there are nested loops, the inner work halves each time, so the total is less than 2n — this code is O(n), not O(n log n) or O(n²).",
  },
  {
    kind: "short",
    subtopic: "simplifying Big-O",
    difficulty: "medium",
    prompt: "An algorithm takes `T(n) = 2ⁿ + 3ⁿ` steps. Give its time complexity in Big-O notation.",
    accept: ["O(3^n)", "O(3**n)", "O(3ⁿ)", "3^n", "3ⁿ"],
    solution:
      "3ⁿ / 2ⁿ = (1.5)ⁿ grows without bound, so 3ⁿ dominates and T(n) is **O(3ⁿ)**. Unlike constant factors, the **base** of an exponential matters: O(2ⁿ) and O(3ⁿ) are different classes, so the answer is not O(2ⁿ).",
  },
  {
    kind: "short",
    subtopic: "simplifying Big-O",
    difficulty: "easy",
    prompt: "An algorithm takes `T(n) = 5000n + 0.01n²` steps. Give its time complexity in Big-O notation.",
    accept: ["O(n^2)", "O(n**2)", "O(n²)", "O(n2)", "n^2", "n²"],
    solution:
      "Big-O describes growth as n → ∞, not which term is bigger for small n. Even with a tiny coefficient, 0.01n² overtakes 5000n once n > 500,000, so T(n) is **O(n²)**. Choosing O(n) because 5000 is a large constant is the trap.",
  },
  {
    kind: "mcq",
    subtopic: "accumulator pattern",
    difficulty: "medium",
    prompt: "Consider the loop below for some positive integer `n`. Which statement is true **at the end of each iteration** (i.e. what does the accumulator hold after processing `i`)?",
    code: "total = 0\nfor i in range(1, n + 1):\n    total += i * i",
    options: [
      "`total` equals `i * i`",
      "`total` equals 1 + 2 + ... + i",
      "`total` equals 1² + 2² + ... + i²",
      "`total` equals n²",
    ],
    answer: 2,
    solution:
      "Before the loop the accumulator holds the empty sum 0. Each iteration adds the next square, so after processing `i` it holds the sum of all squares so far: **1² + 2² + ... + i²**. This informal loop invariant also tells us the final value: 1² + ... + n². `total = i * i` would only hold if the code used `=` instead of `+=`.",
  },
  {
    kind: "open",
    subtopic: "counting steps",
    difficulty: "medium",
    prompt:
      "Assume each line executes in one step. Count the number of steps `T(n)` that `count_neg` takes in the **worst case** for a list of length n, then give its Big-O complexity with a one-line justification.",
    code: "def count_neg(lst):\n    count = 0\n    i = 0\n    while i < len(lst):\n        if lst[i] < 0:\n            count += 1\n        i += 1\n    return count",
    modelAnswer:
      "Worst case: every element is negative, so `count += 1` runs every time.\n- `count = 0`, `i = 0`: 2 steps\n- `while` test: n + 1 times (the last test fails)\n- `if` test, `count += 1`, `i += 1`: 3 steps × n iterations = 3n\n- `return count`: 1 step\nT(n) = 2 + (n + 1) + 3n + 1 = **4n + 4**.\nFor large n the constant 4 and the coefficient 4 are irrelevant to the growth rate, so T(n) is **O(n)** (linear): doubling the list roughly doubles the work.",
    rubric: [
      { point: "Identifies the worst case (all elements negative)", marks: 1 },
      { point: "Correct per-line counts leading to a linear expression such as 4n + 4 (accept 4n + 3 if the final failing test is not counted)", marks: 2 },
      { point: "Concludes O(n) by dropping constants / lower-order terms", marks: 1 },
    ],
    solution:
      "Follow the lecture's linear-search analysis: count how many times each line runs, add them up, then keep the dominant term without its constant.",
  },
  {
    kind: "open",
    subtopic: "accumulator pattern",
    difficulty: "easy",
    prompt:
      "Using an **iterative** accumulator, write `running_max(lst)` that returns a new list whose i-th element is the largest value among `lst[0]` ... `lst[i]`. For example, `running_max([3, 1, 4, 1, 5, 2])` returns `[3, 3, 4, 4, 5, 5]`. Assume `lst` is non-empty. State the time complexity.",
    modelAnswer:
      "```\ndef running_max(lst):\n    best = lst[0]\n    result = []\n    for x in lst:\n        if x > best:\n            best = x\n        result.append(best)\n    return result\n```\nTwo accumulators are used: `best` (the maximum so far, initialised to the first element) and `result` (the list being built). Each element is processed once with O(1) work, so the function is **O(n)**.",
    rubric: [
      { point: "`best` initialised from the list (e.g. `lst[0]`), not 0", marks: 1 },
      { point: "Updates `best` and appends it to the result list on every iteration", marks: 1 },
      { point: "Returns the built list; states O(n) with a reason (single pass)", marks: 1 },
    ],
    solution:
      "Initialising `best = 0` fails for all-negative lists. Recomputing `max(lst[:i+1])` for every i also works but is O(n²), since each slice and max is O(n).",
  },
  {
    kind: "open",
    subtopic: "list vs set/dict",
    difficulty: "hard",
    prompt:
      "The function below checks whether a list contains any repeated value. State its worst-case time complexity with justification. Then write a faster version and give its complexity.",
    code: "def has_duplicate(lst):\n    for i in range(len(lst)):\n        for j in range(i + 1, len(lst)):\n            if lst[i] == lst[j]:\n                return True\n    return False",
    modelAnswer:
      "Worst case (no duplicates, so it never returns early): the inner loop runs (n-1) + (n-2) + ... + 1 = n(n-1)/2 times, which is **O(n²)**.\nFaster version using a set:\n```\ndef has_duplicate(lst):\n    seen = set()\n    for x in lst:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False\n```\nEach `in` check and `add` on a set is O(1) on average, and the loop runs at most n times, so the new version is **O(n)**. (Using a list for `seen` would bring it back to O(n²), because `x in list` is O(n).)",
    rubric: [
      { point: "Original is O(n²), justified by counting about n²/2 comparisons in the worst case", marks: 1 },
      { point: "Identifies the worst case as no duplicates (no early return)", marks: 1 },
      { point: "Correct faster version using a set (or dict) of seen values", marks: 1 },
      { point: "States the new version is O(n) because set membership/insert is O(1) on average", marks: 1 },
    ],
    solution:
      "Trading memory (the set) for time is a common way to remove an inner loop. An alternative is `return len(set(lst)) != len(lst)`, also O(n).",
  },
  {
    kind: "open",
    subtopic: "growth rates",
    difficulty: "medium",
    prompt:
      "Algorithm A needs `100n` steps and algorithm B needs `n²` steps on an input of size n.\n- Which is faster when n = 50? When n = 1000?\n- For what values of n is A faster?\n- Which would you choose for very large inputs, and how does Big-O explain your choice?",
    modelAnswer:
      "- n = 50: A takes 5,000 steps, B takes 2,500, so **B is faster**. n = 1000: A takes 100,000 steps, B takes 1,000,000, so **A is faster**.\n- 100n < n² when n > 100, so A is faster for n > 100 (they are equal at n = 100).\n- For large inputs choose **A**. A is O(n) and B is O(n²); Big-O describes how the step count grows as n increases, ignoring constant factors like 100. However large the constant, a linear algorithm eventually beats a quadratic one.",
    rubric: [
      { point: "Correct comparison at n = 50 (B faster) and n = 1000 (A faster) with step counts", marks: 1 },
      { point: "Finds the crossover n = 100 (A faster for n > 100)", marks: 1 },
      { point: "Chooses A for large inputs, identifying A as O(n) and B as O(n²)", marks: 1 },
      { point: "Explains that Big-O ignores constant factors and describes growth as n becomes large", marks: 1 },
    ],
    solution:
      "This shows why execution time on one small input is not a reliable way to compare algorithms: the constant factor wins for small n, but the growth order wins as n becomes large.",
  },
];
