import type { ScDraft } from "@/lib/sc1001/types";

export const functions: ScDraft[] = [
  // ---------- MCQ ----------
  {
    kind: "mcq",
    subtopic: "Parameters & arguments",
    difficulty: "easy",
    prompt: "Consider the definition and call below. Which statement uses the terms correctly?",
    code: "def area(width, height):\n    return width * height\n\nresult = area(3, 5)",
    options: [
      "`3` and `5` are parameters; `width` and `height` are arguments",
      "`area` is the argument and `result` is the parameter",
      "`width`, `height`, `3` and `5` are all parameters",
      "`width` and `height` are parameters; `3` and `5` are arguments",
    ],
    answer: 3,
    solution:
      "**Parameters** are the names listed in the `def` header (`width`, `height`); **arguments** are the actual values supplied in the call (`3`, `5`). When the function is called, each parameter is bound to the object of the corresponding argument. The first option swaps the two terms.",
  },
  {
    kind: "mcq",
    subtopic: "return vs print",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def double(n):\n    print(n * 2)\n\nx = double(4)\nprint(x)",
    options: ["8\nNone", "8\n8", "None\n8", "8"],
    answer: 0,
    verify: true,
    solution:
      "`double(4)` **prints** 8 but has no `return` statement, so it returns `None`. That `None` is stored in `x`, and `print(x)` shows `None`. Printing a value is not the same as returning it: only `return` hands a value back to the caller, so `8\\n8` is wrong.",
  },
  {
    kind: "mcq",
    subtopic: "Positional & keyword arguments",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def describe(name, age, city):\n    print(name, age, city)\n\ndescribe(age=20, city='Jurong', name='Mei')",
    options: ["20 Jurong Mei", "Mei 20 Jurong", "TypeError: describe() got multiple values for argument 'name'", "age city name"],
    answer: 1,
    verify: true,
    solution:
      "**Keyword arguments** are matched to parameters by name, not by position, so `name='Mei'`, `age=20`, `city='Jurong'` regardless of the order in the call. The function prints its parameters in the order `name, age, city`: `Mei 20 Jurong`. No parameter receives two values, so there is no `TypeError`.",
  },
  {
    kind: "mcq",
    subtopic: "Positional & keyword arguments",
    difficulty: "medium",
    prompt: "Given the definition below, which call is **invalid** (Python rejects it before the function runs)?",
    code: "def book(room, nights=1, breakfast=False):\n    return room, nights, breakfast",
    options: ["`book('A1')`", "`book('A1', breakfast=True)`", "`book(nights=2, 'A1')`", "`book('A1', 3, True)`"],
    answer: 2,
    solution:
      "In a call, **positional arguments must come before keyword arguments**. `book(nights=2, 'A1')` puts a positional argument after a keyword one, which is a `SyntaxError`. The other calls are fine: `book('A1')` uses both defaults, `book('A1', breakfast=True)` skips `nights` (keeps its default) and `book('A1', 3, True)` fills all three positionally.",
  },
  {
    kind: "mcq",
    subtopic: "Mutable default argument",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def collect(x, bucket=[]):\n    bucket.append(x)\n    return bucket\n\na = collect(1)\nb = collect(2)\nprint(a, b)",
    options: ["[1] [2]", "[1] [1, 2]", "[2] [2]", "[1, 2] [1, 2]"],
    answer: 3,
    verify: true,
    solution:
      "A default value is created **once**, when the `def` statement runs, not on every call. Both calls use the *same* list object as `bucket`, so the second call appends 2 to the list that already holds 1. `a` and `b` refer to that same list, so both print `[1, 2]`. `[1] [1, 2]` would only be right if `a` were a separate copy. The usual fix is `bucket=None` and `if bucket is None: bucket = []` inside the function.",
  },
  {
    kind: "mcq",
    subtopic: "Multiple return values",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def min_max(nums):\n    return min(nums), max(nums)\n\nresult = min_max([4, 9, 1, 7])\nprint(type(result).__name__, result)",
    options: ["tuple (1, 9)", "list [1, 9]", "int 1", "tuple 1 9"],
    answer: 0,
    verify: true,
    solution:
      "`return a, b` returns **one** object: a tuple `(a, b)`. Assigned to a single name, `result` is the tuple `(1, 9)`, which prints with parentheses. Writing `lo, hi = min_max(...)` would unpack it into two names. The function does not stop at the first value (so not `int 1`), and a tuple is not a list.",
  },
  {
    kind: "mcq",
    subtopic: "Scope (local vs global)",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "count = 10\n\ndef bump():\n    count = 99\n    return count\n\nprint(bump(), count)",
    options: ["99 99", "10 10", "99 10", "UnboundLocalError: cannot access local variable 'count' where it is not associated with a value"],
    answer: 2,
    verify: true,
    solution:
      "Assigning to `count` inside `bump` creates a new **local** variable that only exists while the function runs. The global `count` is untouched and stays 10. So `bump()` returns 99 and the global `count` is still 10. There is no error because the local `count` is assigned before it is read.",
  },
  {
    kind: "mcq",
    subtopic: "Scope (local vs global)",
    difficulty: "medium",
    prompt: "What happens when this code runs?",
    code: "total = 5\n\ndef add_one():\n    total = total + 1\n    return total\n\nprint(add_one())",
    options: [
      "6",
      "5",
      "NameError: name 'total' is not defined",
      "UnboundLocalError: cannot access local variable 'total' where it is not associated with a value",
    ],
    answer: 3,
    verify: true,
    solution:
      "Because `total` is **assigned** somewhere in `add_one`, Python treats `total` as local throughout the whole function. The right-hand side `total + 1` then reads the local `total` before it has a value, raising `UnboundLocalError` (a kind of `NameError`, but with this specific message). It does not fall back to the global 5. Fix: add `global total` as the first line, or better, pass the value in as a parameter and return the new value.",
  },
  {
    kind: "mcq",
    subtopic: "Passing mutable objects",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def add_bonus(marks):\n    for i in range(len(marks)):\n        marks[i] += 5\n\nscores = [60, 70]\nadd_bonus(scores)\nprint(scores)",
    options: ["[65, 75]", "[60, 70]", "None", "[60, 70, 5]"],
    answer: 0,
    verify: true,
    solution:
      "The parameter `marks` and the argument `scores` refer to the **same list object**. `marks[i] += 5` changes elements of that list in place, so the change is visible through `scores` after the call: `[65, 75]`. The function returns `None`, but we print `scores`, not the return value.",
  },
  {
    kind: "mcq",
    subtopic: "Passing mutable objects",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "def update(nums, n):\n    nums.append(n)\n    nums = nums + [n * 10]\n    n = n * 2\n    return nums\n\na = [1, 2]\nk = 3\nb = update(a, k)\nprint(a, b, k)",
    options: ["[1, 2] [1, 2, 3, 30] 3", "[1, 2, 3] [1, 2, 3, 30] 3", "[1, 2, 3, 30] [1, 2, 3, 30] 6", "[1, 2, 3, 30] [1, 2, 3, 30] 3"],
    answer: 1,
    verify: true,
    solution:
      "Step by step:\n- `nums.append(n)` **mutates** the shared list, so `a` becomes `[1, 2, 3]`.\n- `nums = nums + [n * 10]` builds a **new** list `[1, 2, 3, 30]` and rebinds only the local name `nums`; `a` is unaffected.\n- `n = n * 2` rebinds the local `n`; the global `k` (an immutable int) stays 3.\nSo `a` is `[1, 2, 3]`, `b` (the returned new list) is `[1, 2, 3, 30]`, and `k` is 3.",
  },
  {
    kind: "mcq",
    subtopic: "Lambda, sorted, map & filter",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "words = ['kiwi', 'fig', 'banana', 'apple']\nprint(sorted(words, key=lambda w: len(w)))",
    options: [
      "['apple', 'banana', 'fig', 'kiwi']",
      "['banana', 'apple', 'kiwi', 'fig']",
      "['fig', 'kiwi', 'apple', 'banana']",
      "[3, 4, 5, 6]",
    ],
    answer: 2,
    verify: true,
    solution:
      "The `key` function is applied to each element and the elements are ordered by those keys: lengths 4, 3, 6, 5 → `fig`(3), `kiwi`(4), `apple`(5), `banana`(6). `sorted` returns the original **elements**, not the keys, so `[3, 4, 5, 6]` is wrong; alphabetical order would only happen without a key.",
  },
  {
    kind: "mcq",
    subtopic: "Lambda, sorted, map & filter",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "nums = [3, 8, 5, 12, 7]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(list(map(lambda x: x // 2, evens)))",
    options: ["[4, 6]", "[8, 12]", "[1, 4, 2, 6, 3]", "[True, False]"],
    answer: 0,
    verify: true,
    solution:
      "`filter` keeps the elements for which the lambda is `True`: `[8, 12]`. `map` then applies `x // 2` to each kept element: `[4, 6]`. `[1, 4, 2, 6, 3]` would be `map` applied to the whole list without filtering.",
  },
  {
    kind: "mcq",
    subtopic: "Functions as values",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def square(x):\n    return x * x\n\ndef apply_twice(f, x):\n    return f(f(x))\n\nprint(apply_twice(square, 3))",
    options: ["9", "18", "81", "TypeError: 'function' object is not subscriptable"],
    answer: 2,
    verify: true,
    solution:
      "Functions are objects, so `square` (without parentheses) can be passed as an argument. Inside `apply_twice`, `f(f(3))` is `square(square(3))` = `square(9)` = **81**. 9 is applying it only once; 18 would be doubling.",
  },
  {
    kind: "mcq",
    subtopic: "Docstrings & abstraction",
    difficulty: "easy",
    prompt: "Which statement about a **docstring** is correct?",
    code: "def c2f(celsius):\n    \"\"\"Convert a temperature from Celsius to Fahrenheit.\"\"\"\n    return celsius * 1.8 + 32",
    options: [
      "It is a `#` comment placed above the `def` line",
      "It is the value the function returns when it has no `return` statement",
      "It is a required argument describing what the function does",
      "It is a string literal as the first statement of the body, shown by `help(c2f)` and stored in `c2f.__doc__`",
    ],
    answer: 3,
    solution:
      "A docstring is a string literal written as the **first statement** of the function body. Python stores it in `__doc__`, and `help()` displays it, so callers can learn *what* the function does without reading *how* it does it. A `#` comment is ignored entirely, and a function with no `return` returns `None`, not its docstring.",
  },
  {
    kind: "mcq",
    subtopic: "Docstrings & abstraction",
    difficulty: "easy",
    prompt: "Which of the following is **not** a benefit of procedural abstraction (wrapping a task in a function)?",
    options: [
      "The same code can be reused by calling the function many times",
      "A caller only needs to know what the function does, its inputs and its output, not how it works",
      "The program always runs faster because each function is executed in parallel",
      "A bug in the logic only has to be fixed in one place",
    ],
    answer: 2,
    solution:
      "Functions give **reuse**, **abstraction** (hide the details behind a name, parameters and return value), **easier maintenance** (fix once) and **readability**. They do not make code run in parallel or automatically faster; a function call actually adds a small overhead.",
  },
  {
    kind: "mcq",
    subtopic: "Lambda, sorted, map & filter",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "students = [('Ann', 85), ('Ben', 92), ('Cal', 85), ('Dee', 70)]\nranked = sorted(students, key=lambda s: (-s[1], s[0]))\nprint([name for name, _ in ranked])",
    options: [
      "['Dee', 'Ann', 'Cal', 'Ben']",
      "['Ben', 'Cal', 'Ann', 'Dee']",
      "['Ann', 'Ben', 'Cal', 'Dee']",
      "['Ben', 'Ann', 'Cal', 'Dee']",
    ],
    answer: 3,
    verify: true,
    solution:
      "The key is a tuple, and tuples compare element by element. `-s[1]` sorts by score **descending** (92 first); ties on score (Ann and Cal, both 85) are broken by `s[0]`, the name, **ascending**. Result: Ben, Ann, Cal, Dee. `['Dee', ...]` would be ascending score; `['Ben', 'Cal', 'Ann', ...]` gets the tie-break backwards.",
  },
  {
    kind: "mcq",
    subtopic: "Built-in functions",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def total(values):\n    sum = 0\n    for v in values:\n        sum += v\n    return sum\n\nprint(total([1, 2, 3]), sum([4, 5]))",
    options: ["TypeError: 'int' object is not callable", "6 9", "6 6", "0 9"],
    answer: 1,
    verify: true,
    solution:
      "Inside `total`, `sum = 0` creates a **local** variable that hides the built-in `sum` only within that function. Outside, the name `sum` is looked up using the LEGB rule (Local, Enclosing, Global, Built-in) and finds the built-in function, so `sum([4, 5])` is 9. A `TypeError` would happen only if `sum` had been reassigned at the global level. (Shadowing built-ins is still bad style.)",
  },

  // ---------- Short answer ----------
  {
    kind: "short",
    subtopic: "return vs print",
    difficulty: "easy",
    prompt: "What is printed by the following code? (Write each output line on its own line.)",
    code: "print(print('hi'))",
    accept: ["hi\nNone"],
    verify: true,
    solution:
      "The inner `print('hi')` runs first and outputs `hi`. `print` returns `None`, so the outer call prints `None`. Output: `hi` then `None`.",
  },
  {
    kind: "short",
    subtopic: "Scope (local vs global)",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "score = 0\n\ndef win():\n    global score\n    score += 3\n\nwin()\nwin()\nprint(score)",
    accept: ["6"],
    verify: true,
    solution:
      "`global score` makes the assignment inside `win` update the **global** variable instead of creating a local one. Two calls add 3 twice: 0 + 3 + 3 = **6**. Without `global`, `score += 3` would raise `UnboundLocalError`.",
  },
  {
    kind: "short",
    subtopic: "Defining & calling",
    difficulty: "medium",
    prompt: "What value is printed?",
    code: "def f(x):\n    return x + 2\n\ndef g(x):\n    return f(x) * f(x - 1)\n\nprint(g(3))",
    accept: ["20"],
    verify: true,
    solution:
      "Functions can call other functions. `g(3)` computes `f(3) * f(2)` = `5 * 4` = **20**. Each call to `f` has its own local `x`.",
  },
  {
    kind: "short",
    subtopic: "Scope (local vs global)",
    difficulty: "easy",
    prompt: "Which Python keyword must be written inside a function before the function can **reassign** a module-level variable `counter` (rather than creating a new local variable)? Answer with one word.",
    accept: ["global"],
    solution:
      "`global counter` tells Python that assignments to `counter` inside the function refer to the global variable. Reading a global without assigning to it does not need the keyword.",
  },
  {
    kind: "short",
    subtopic: "return vs print",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def first_neg(nums):\n    for i in range(len(nums)):\n        if nums[i] < 0:\n            return i\n    return -1\n\nprint(first_neg([4, 0, -2, -7]), first_neg([1, 2]))",
    accept: ["2 -1"],
    verify: true,
    solution:
      "`return` ends the function immediately, even in the middle of a loop. In `[4, 0, -2, -7]` the first negative is at index **2**, so the loop stops there (index 3 is never checked). `[1, 2]` has no negatives, the loop finishes and the final `return -1` runs. Output: `2 -1`.",
  },
  {
    kind: "short",
    subtopic: "Scope (local vs global)",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "x = 'global'\n\ndef outer():\n    x = 'enclosing'\n    def inner():\n        return x\n    x = 'changed'\n    return inner()\n\nprint(outer(), x)",
    accept: ["changed global"],
    verify: true,
    solution:
      "By the **LEGB** rule, `inner` has no local `x`, so it uses the **enclosing** `x` from `outer`. The lookup happens when `inner()` is *called*, and by then `outer`'s `x` is `'changed'`. The global `x` was never reassigned (the assignments in `outer` are local to `outer`), so it is still `'global'`.",
  },
  {
    kind: "short",
    subtopic: "Default arguments",
    difficulty: "hard",
    prompt: "What value is printed?",
    code: "rate = 5\n\ndef interest(p, r=rate):\n    return p * r // 100\n\nrate = 10\nprint(interest(200))",
    accept: ["10"],
    verify: true,
    solution:
      "Default values are evaluated **once, when the `def` statement runs**. At that moment `rate` is 5, so `r` defaults to 5 forever after; changing the global `rate` to 10 later has no effect. `200 * 5 // 100` = **10** (not 20).",
  },
  {
    kind: "short",
    subtopic: "Built-in functions",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "print(list(map(len, ['ab', '', 'xyz'])))",
    accept: ["[2, 0, 3]"],
    verify: true,
    solution:
      "`map` applies a function to every element. Here the built-in `len` is passed as a value (no parentheses), giving the lengths 2, 0 and 3. `list(...)` turns the map object into a list: `[2, 0, 3]`.",
  },

  // ---------- Open ----------
  {
    kind: "open",
    subtopic: "Defining & calling",
    difficulty: "medium",
    prompt:
      "Write a function `count_vowels(text)` that **returns** the number of vowels (`a e i o u`, upper or lower case) in the string `text`. Include a docstring. Then write one line that calls it with `'Computational Thinking'` and prints the result (it should print 8).",
    modelAnswer:
      "```\ndef count_vowels(text):\n    \"\"\"Return the number of vowels (a, e, i, o, u; any case) in text.\"\"\"\n    count = 0\n    for ch in text.lower():\n        if ch in 'aeiou':\n            count += 1\n    return count\n\nprint(count_vowels('Computational Thinking'))   # 8\n```",
    rubric: [
      { point: "Correct header with one parameter and a docstring as the first statement", marks: 1 },
      { point: "Loops over the characters and tests vowel membership case-insensitively (e.g. `lower()` and `in 'aeiou'`)", marks: 2 },
      { point: "Uses `return count` (does not just print inside the function)", marks: 1 },
      { point: "Correct call whose result is printed by the caller", marks: 1 },
    ],
    solution:
      "Keep the function pure: it takes input through its parameter and gives output through `return`, so the caller decides whether to print, store or compare the result. Common mistakes: printing inside the function (then the call returns `None`), or missing upper-case vowels because the text was not converted with `lower()`.",
  },
  {
    kind: "open",
    subtopic: "Mutable default argument",
    difficulty: "medium",
    prompt:
      "The function below is meant to start a **fresh** list whenever no list is passed in. Explain what the program actually prints and why, then rewrite `add_item` so that it behaves as intended.",
    code: "def add_item(item, item_list=[]):\n    item_list.append(item)\n    return item_list\n\nlist1 = add_item('apple')\nlist2 = add_item('banana')\nlist3 = add_item('cherry', ['grape'])\nprint(list1, list2, list3)",
    modelAnswer:
      "It prints `['apple', 'banana'] ['apple', 'banana'] ['grape', 'cherry']`.\nThe default list `[]` is created only once, when `def` runs. Every call that omits `item_list` shares that same list object, so `'banana'` is appended to the list that already holds `'apple'`, and `list1` and `list2` refer to the same list. The third call passes its own list, so it is unaffected.\nFix: use `None` as the default and create a new list inside the function.\n```\ndef add_item(item, item_list=None):\n    if item_list is None:\n        item_list = []\n    item_list.append(item)\n    return item_list\n```",
    rubric: [
      { point: "Correct output stated", marks: 1 },
      { point: "Explains that the default is evaluated once at definition time and the same list is shared between calls", marks: 2 },
      { point: "Correct fix using `None` (or equivalent) so a new list is created on each call", marks: 2 },
    ],
    solution:
      "This is the **mutable default argument trap**. Immutable defaults (numbers, strings, `None`) are safe; mutable defaults (lists, dicts) persist between calls.",
  },
  {
    kind: "open",
    subtopic: "Docstrings & abstraction",
    difficulty: "easy",
    prompt:
      "The code below repeats the same calculation for every item. Write a function `discounted(price, rate)` that returns the discounted price rounded to 2 decimal places, then rewrite the program to use it. Give **two** reasons why the function version is better.",
    code: "price = 120\nrate = 0.10\nprint('Shirt:', round(price - price * rate, 2))\nprice = 80\nrate = 0.25\nprint('Cap:', round(price - price * rate, 2))\nprice = 45.5\nrate = 0.05\nprint('Socks:', round(price - price * rate, 2))",
    modelAnswer:
      "```\ndef discounted(price, rate):\n    \"\"\"Return price after applying discount rate (0.25 = 25%).\"\"\"\n    return round(price - price * rate, 2)\n\nprint('Shirt:', discounted(120, 0.10))\nprint('Cap:', discounted(80, 0.25))\nprint('Socks:', discounted(45.5, 0.05))\n```\nReasons: the formula is written once, so a mistake or a change in the discount logic is fixed in one place; the program is shorter and easier to read; the function can be tested on its own and reused for any number of items (e.g. in a loop).",
    rubric: [
      { point: "Function with two parameters that returns (not prints) the rounded result", marks: 2 },
      { point: "Program rewritten to call the function for each item with correct arguments", marks: 1 },
      { point: "Two valid benefits (reuse, single place to change/fix, readability, easier testing)", marks: 2 },
    ],
    solution:
      "Spot what is the **same** (the formula) and what **differs** (price, rate, label). The parts that differ become parameters; the part that stays the same becomes the function body.",
  },
  {
    kind: "open",
    subtopic: "Lambda, sorted, map & filter",
    difficulty: "medium",
    prompt:
      "Write a function `top_n(records, n)` where `records` is a list of `(name, score)` tuples. It returns a list of the names of the `n` highest scorers, highest first, breaking ties by name in alphabetical order. Use `sorted` with a `lambda` key. The original list must **not** be modified.\nExample: `top_n([('Ann', 85), ('Ben', 92), ('Cal', 85), ('Dee', 70)], 3)` returns `['Ben', 'Ann', 'Cal']`.",
    modelAnswer:
      "```\ndef top_n(records, n):\n    \"\"\"Return names of the n best scorers; ties broken alphabetically.\"\"\"\n    ranked = sorted(records, key=lambda r: (-r[1], r[0]))\n    return [name for name, score in ranked[:n]]\n```\n`sorted` returns a new list, so `records` is unchanged (unlike `records.sort()`).",
    rubric: [
      { point: "Uses `sorted(records, key=lambda ...)` producing a new list (no in-place `.sort()` on the argument)", marks: 1 },
      { point: "Key sorts by score descending and name ascending, e.g. `(-r[1], r[0])`", marks: 2 },
      { point: "Slices the first n and returns only the names", marks: 1 },
    ],
    solution:
      "A tuple key lets one `sorted` call handle a primary and a secondary order. Negating the score reverses only that part; `reverse=True` would also reverse the name order and break the tie rule.",
  },
];
