import type { ScDraft } from "@/lib/sc1001/types";

export const recursion: ScDraft[] = [
  {
    kind: "mcq",
    subtopic: "base & recursive case",
    difficulty: "easy",
    prompt: "In a recursive function, which part is responsible for **stopping** the chain of recursive calls?",
    options: [
      "The recursive step, because it makes the problem smaller",
      "The `return` keyword, wherever it appears",
      "The base case, which returns a result without calling the function again",
      "The function's parameter list",
    ],
    answer: 2,
    solution:
      "The **base case** (conquer) solves the smallest problem directly and returns without recursing, so the calls stop there. The recursive step (divide) only moves *towards* the base case; it never stops the recursion by itself. A `return` inside the recursive step still makes a recursive call first.",
  },
  {
    kind: "mcq",
    subtopic: "tracing",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(5))",
    options: ["24", "720", "15", "120"],
    answer: 3,
    verify: true,
    solution:
      "`fact(5) = 5 * fact(4) = 5 * 4 * fact(3) = 5 * 4 * 3 * 2 * fact(1) = 5 * 4 * 3 * 2 * 1 = ` **120**. 24 is `fact(4)`, 720 is `fact(6)`, and 15 is 1 + 2 + 3 + 4 + 5 (a sum, not a product).",
  },
  {
    kind: "short",
    subtopic: "tracing",
    difficulty: "easy",
    prompt: "What does this code print?",
    code: "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(4072))",
    accept: ["13"],
    verify: true,
    solution:
      "Each call peels off the last digit with `n % 10` and recurses on the rest with `n // 10`: 2 + (7 + (0 + (4 + 0))) = **13**. The call `digit_sum(0)` is the base case and contributes 0.",
  },
  {
    kind: "mcq",
    subtopic: "print order",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def show(n):\n    if n == 0:\n        return\n    print(n, end=' ')\n    show(n - 1)\n\nshow(3)",
    options: ["1 2 3", "3 2 1", "3 2 1 0", "3"],
    answer: 1,
    verify: true,
    solution:
      "The `print` comes **before** the recursive call, so each call prints its own `n` and then recurses: 3, then 2, then 1. `show(0)` hits the base case and returns without printing, so 0 is never shown.",
  },
  {
    kind: "mcq",
    subtopic: "print order",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def show(n):\n    if n == 0:\n        return\n    show(n - 1)\n    print(n)\n\nshow(3)",
    options: ["3\n2\n1", "0\n1\n2\n3", "1\n2\n3", "1\n2"],
    answer: 2,
    verify: true,
    solution:
      "Here the `print` comes **after** the recursive call. `show(3)` first calls `show(2)`, which first calls `show(1)`, which first calls `show(0)` (returns, prints nothing). Only then do the pending prints run as the calls return: 1, then 2, then 3. Printing before the call would give 3 2 1.",
  },
  {
    kind: "mcq",
    subtopic: "print order",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "def echo(n):\n    if n == 0:\n        print('*')\n        return\n    print(n)\n    echo(n - 1)\n    print(n)\n\necho(2)",
    options: ["2\n1\n*\n2\n1", "2\n1\n*", "1\n2\n*\n2\n1", "2\n1\n*\n1\n2"],
    answer: 3,
    verify: true,
    solution:
      "On the way **down** each call prints `n` before recursing: 2, 1, then `echo(0)` prints `*`. On the way **back up** the calls finish in reverse order (last called, first finished), so the second `print(n)` runs for 1 and then 2. Output: 2, 1, *, 1, 2. Option `2 1 * 2 1` wrongly assumes the calls finish in the order they started.",
  },
  {
    kind: "short",
    subtopic: "number of calls",
    difficulty: "medium",
    prompt: "How many times is `fib` called in total (including the first call)? Give the number printed.",
    code: "count = 0\n\ndef fib(n):\n    global count\n    count += 1\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nfib(5)\nprint(count)",
    accept: ["15"],
    verify: true,
    solution:
      "Let C(n) be the number of calls for `fib(n)`. C(0) = C(1) = 1 and C(n) = 1 + C(n-1) + C(n-2). So C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 1 + 9 + 5 = **15**. The answer is not 5 or 6: each call with n ≥ 2 makes **two** calls, so the call tree branches and the same values are recomputed.",
  },
  {
    kind: "mcq",
    subtopic: "missing base case",
    difficulty: "easy",
    prompt: "What happens when the following code is run?",
    code: "def countdown(n):\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)",
    options: [
      "It prints 3, 2, 1, 0 and then stops",
      "It prints 3, 2, 1, 0, -1, -2, ... until Python stops it with a `RecursionError`",
      "It loops forever without ever producing an error",
      "It raises a `SyntaxError` because there is no `return` statement",
    ],
    answer: 1,
    solution:
      "There is **no base case**, so every call makes another call with a smaller `n`. Each call adds a frame to the call stack; when the depth passes Python's recursion limit (about 1000), Python raises `RecursionError: maximum recursion depth exceeded`. It does not run forever like a `while True` loop, and a missing `return` is perfectly legal (the function returns `None`).",
  },
  {
    kind: "mcq",
    subtopic: "missing base case",
    difficulty: "medium",
    prompt: "What is the output (including any error message) of this code?",
    code: "def half(n):\n    if n == 0:\n        return 0\n    return 1 + half(n - 2)\n\nprint(half(4))\nprint(half(5))",
    options: [
      "2\n3",
      "2\n2",
      "2\nRecursionError: maximum recursion depth exceeded",
      "RecursionError: maximum recursion depth exceeded",
    ],
    answer: 2,
    verify: true,
    solution:
      "`half(4)` → `half(2)` → `half(0)` = 0, so it returns 2 and prints **2**. `half(5)` goes 5, 3, 1, -1, -3, ... and **skips over** the base case `n == 0`, so it never stops and raises `RecursionError`. A base case must be reachable for every valid input (e.g. use `n <= 0`).",
  },
  {
    kind: "mcq",
    subtopic: "tracing",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def power(b, e):\n    if e == 0:\n        return 1\n    return b * power(b, e - 1)\n\nprint(power(3, 4))",
    options: ["81", "12", "64", "243"],
    answer: 0,
    verify: true,
    solution:
      "`power(3, 4) = 3 * power(3, 3) = 3 * 3 * 3 * 3 * power(3, 0) = 81 * 1 =` **81**. 12 would be 3 × 4, 64 is 4³ (base and exponent swapped), and 243 is 3⁵ (one multiplication too many).",
  },
  {
    kind: "short",
    subtopic: "tracing",
    difficulty: "easy",
    prompt: "What does this code print?",
    code: "def rev(s):\n    if s == '':\n        return ''\n    return rev(s[1:]) + s[0]\n\nprint(rev('stack'))",
    accept: ["kcats"],
    verify: true,
    solution:
      "`rev(s)` reverses the rest of the string and puts the first character at the **end**: `rev('stack') = rev('tack') + 's' = (rev('ack') + 't') + 's' = ...` = **kcats**.",
  },
  {
    kind: "mcq",
    subtopic: "tracing",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def is_pal(s):\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_pal(s[1:-1])\n\nprint(is_pal('level'), is_pal('abca'), is_pal(''))",
    options: ["True False False", "True True True", "False False True", "True False True"],
    answer: 3,
    verify: true,
    solution:
      "`'level'`: l = l, e = e, then `'v'` has length 1 → **True**. `'abca'`: a = a, then `'bc'` has b ≠ c → **False** (the outer letters matching is not enough). `''` has length 0 ≤ 1, so the base case returns **True**.",
  },
  {
    kind: "short",
    subtopic: "tracing",
    difficulty: "medium",
    prompt: "What does this code print?",
    code: "def to_bin(n):\n    if n < 2:\n        return str(n)\n    return to_bin(n // 2) + str(n % 2)\n\nprint(to_bin(13))",
    accept: ["1101"],
    verify: true,
    solution:
      "13 // 2 = 6 r 1, 6 // 2 = 3 r 0, 3 // 2 = 1 r 1, and 1 is the base case. The recursive result is placed **before** the current remainder, so the remainders come out in reverse order of computation: `'1' + '1' + '0' + '1'` = **1101** (8 + 4 + 1 = 13). Writing the remainders in the order computed would wrongly give 1011.",
  },
  {
    kind: "mcq",
    subtopic: "list recursion",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "def total(lst):\n    if len(lst) == 1:\n        return lst[0]\n    return lst[0] + total(lst[1:])\n\nprint(total([4, -2, 7, 1]))",
    options: ["12", "10", "4", "11"],
    answer: 1,
    verify: true,
    solution:
      "`total` adds the first element to the total of the tail `lst[1:]`: 4 + (-2 + (7 + 1)) = **10**. 12 ignores the minus sign, 4 is just the first element, and 11 forgets the last element (the base case returns `lst[0]`, it does not discard it).",
  },
  {
    kind: "mcq",
    subtopic: "list recursion",
    difficulty: "medium",
    prompt: "Using the same `total` function, what happens when it is called with an empty list?",
    code: "def total(lst):\n    if len(lst) == 1:\n        return lst[0]\n    return lst[0] + total(lst[1:])\n\nprint(total([]))",
    options: [
      "0",
      "None",
      "RecursionError: maximum recursion depth exceeded",
      "IndexError: list index out of range",
    ],
    answer: 3,
    verify: true,
    solution:
      "`len([])` is 0, not 1, so the base case is skipped and the recursive step evaluates `lst[0]` on an empty list → **IndexError**. It fails *before* any recursive call, so it is not a `RecursionError`. Using `if lst == []: return 0` as the base case would handle every list, including the empty one.",
  },
  {
    kind: "mcq",
    subtopic: "accumulator",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def foo(num, acc=1):\n    if num == 0:\n        return acc\n    return foo(num // 10, acc * (num % 10))\n\nprint(foo(234))",
    options: ["9", "24", "0", "1"],
    answer: 1,
    verify: true,
    solution:
      "The accumulator collects the **product** of the digits: `foo(234, 1)` → `foo(23, 4)` → `foo(2, 12)` → `foo(0, 24)`, which returns **24**. 9 would be the digit *sum*; 1 is only the starting value of `acc`; 0 would need a 0 digit.",
  },
  {
    kind: "mcq",
    subtopic: "accumulator",
    difficulty: "easy",
    prompt: "A recursive function is described as **tail recursive**. What does this mean?",
    options: [
      "Its base case is written at the end of the function",
      "It recurses on the tail `lst[1:]` of a list",
      "The recursive call is the very last action, and its result is returned directly with no further work",
      "It calls itself exactly twice in the recursive step",
    ],
    answer: 2,
    solution:
      "In tail recursion the final `return` is a *pure* recursive call, e.g. `return factorial_acc(n - 1, acc * n)`. Nothing is left to do after the call returns, so no intermediate results pile up; the partial result travels in the accumulator parameter. `return n * fact(n - 1)` is **not** tail recursive because the multiplication happens after the call returns. Recursing on `lst[1:]` is unrelated to the term.",
  },
  {
    kind: "mcq",
    subtopic: "memoisation",
    difficulty: "hard",
    prompt: "This Fibonacci function stores results it has already computed in `memo`. What is printed?",
    code: "calls = 0\nmemo = {}\n\ndef fib(n):\n    global calls\n    calls += 1\n    if n in memo:\n        return memo[n]\n    if n < 2:\n        result = n\n    else:\n        result = fib(n - 1) + fib(n - 2)\n    memo[n] = result\n    return result\n\nprint(fib(10), calls)",
    options: ["55 177", "89 19", "55 11", "55 19"],
    answer: 3,
    verify: true,
    solution:
      "F(10) = **55** (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55). Counting calls: the chain `fib(10)`, `fib(9)`, ..., `fib(1)` is 10 calls, `fib(2)` also calls `fib(0)` (1 call), and each of `fib(3)` ... `fib(10)` makes a second call `fib(n - 2)` that is found in `memo` immediately (8 calls). Total 10 + 1 + 8 = **19**. Without memoisation it would be 177 calls; 11 forgets the cheap memo-hit calls, which still count.",
  },
  {
    kind: "short",
    subtopic: "list recursion",
    difficulty: "easy",
    prompt: "What does this code print?",
    code: "def count_even(lst):\n    if lst == []:\n        return 0\n    rest = count_even(lst[1:])\n    if lst[0] % 2 == 0:\n        return rest + 1\n    return rest\n\nprint(count_even([3, 8, 6, 1, 4, 7]))",
    accept: ["3"],
    verify: true,
    solution:
      "Each call counts the even numbers in the tail, then adds 1 if its own first element is even. The even values are 8, 6 and 4, so the result is **3**.",
  },
  {
    kind: "short",
    subtopic: "number of calls",
    difficulty: "medium",
    prompt: "What value of `num` is printed?",
    code: "num = 0\n\ndef length(s):\n    global num\n    num += 1\n    if s == '':\n        return 0\n    return 1 + length(s[1:])\n\nlength('python')\nprint(num)",
    accept: ["7"],
    verify: true,
    solution:
      "`length` is called on `'python'`, `'ython'`, `'thon'`, `'hon'`, `'on'`, `'n'` and finally `''` (the base case). That is 6 + 1 = **7** calls. The common mistake is 6: the call that reaches the base case is still a call and still increments `num`.",
  },
  {
    kind: "short",
    subtopic: "tracing",
    difficulty: "hard",
    prompt: "What does this code print?",
    code: "def mystery(a, b):\n    if b == 0:\n        return 0\n    if b % 2 == 0:\n        return mystery(a + a, b // 2)\n    return mystery(a + a, b // 2) + a\n\nprint(mystery(7, 6))",
    accept: ["42"],
    verify: true,
    solution:
      "`mystery(7, 6)`: b even → `mystery(14, 3)`; b odd → `mystery(28, 1) + 14`; `mystery(28, 1)`: b odd → `mystery(56, 0) + 28 = 0 + 28 = 28`. So `mystery(14, 3) = 28 + 14 = 42`, and that is returned unchanged: **42**. The function multiplies `a * b` by halving `b` and doubling `a`, adding `a` whenever `b` is odd.",
  },
  {
    kind: "mcq",
    subtopic: "recursion vs iteration",
    difficulty: "medium",
    prompt: "Which statement is a genuine **disadvantage** of a recursive solution compared with an equivalent loop in Python?",
    options: [
      "Recursive functions cannot return a value to the caller",
      "Recursion can only be used on lists, not on numbers or strings",
      "Every recursive solution runs in exponential time",
      "Each call adds a frame to the call stack, so deep recursion uses extra memory and may hit the recursion limit",
    ],
    answer: 3,
    solution:
      "Every pending call keeps its own frame (parameters, local variables, return point) on the call stack until it returns. With large inputs this costs memory and can raise `RecursionError`, whereas a loop uses a fixed number of variables. The other options are false: recursive functions return values all the time, work on any data, and many (e.g. factorial, list sum) take linear time. Recursion's advantage is that divide-and-conquer problems are often shorter and clearer to express.",
  },
  {
    kind: "mcq",
    subtopic: "base & recursive case",
    difficulty: "easy",
    prompt: "A function computes the sum of a list with the recursive step `return lst[0] + f(lst[1:])`. Which base case makes it work for **every** list, including the empty list?",
    options: [
      "`if len(lst) == 1: return lst[0]`",
      "`if lst == []: return 0`",
      "`if lst == []: return 1`",
      "`if lst[0] == 0: return 0`",
    ],
    answer: 1,
    solution:
      "The sum of an empty list is 0, and every slice `lst[1:]` eventually becomes `[]`, so `if lst == []: return 0` covers all inputs. `len(lst) == 1` works for non-empty lists but crashes on `[]`; returning 1 would add 1 to every total; `lst[0] == 0` stops at the first zero (or crashes on `[]`).",
  },
  {
    kind: "mcq",
    subtopic: "list recursion",
    difficulty: "medium",
    prompt: "A binary tree is stored as nested lists `[value, left, right]`, where a missing child is `None`. What is printed?",
    code: "def tree_sum(t):\n    if t is None:\n        return 0\n    return t[0] + tree_sum(t[1]) + tree_sum(t[2])\n\ntree = [5, [3, None, None], [8, [7, None, None], None]]\nprint(tree_sum(tree))",
    options: ["16", "23", "8", "4"],
    answer: 1,
    verify: true,
    solution:
      "The tree is 5 with children 3 and 8, and 8 has a left child 7. `tree_sum` adds each node's value to the sums of its two subtrees, with an empty subtree (`None`) contributing 0: 5 + 3 + 8 + 7 = **23**. 16 forgets the grandchild 7, 8 is the maximum, and 4 is the number of nodes.",
  },
  {
    kind: "short",
    subtopic: "accumulator",
    difficulty: "medium",
    prompt: "This function counts the ways to climb `n` stairs taking 1 or 2 steps at a time, using two accumulators. What does it print?",
    code: "def ways(n, a=1, b=1):\n    if n == 0:\n        return a\n    if n == 1:\n        return b\n    return ways(n - 1, b, a + b)\n\nprint(ways(6))",
    accept: ["13"],
    verify: true,
    solution:
      "`a` and `b` hold two consecutive counts; each call shifts them along one step and decreases `n`: `ways(6,1,1)` → `ways(5,1,2)` → `ways(4,2,3)` → `ways(3,3,5)` → `ways(2,5,8)` → `ways(1,8,13)`, which returns `b` = **13**. Stopping one step early gives the tempting 8. This is the Fibonacci sequence shifted by one (W(n) = F(n+1)).",
  },
  {
    kind: "open",
    subtopic: "accumulator",
    difficulty: "medium",
    prompt:
      "Write **two** recursive functions that return the number of vowels (`a`, `e`, `i`, `o`, `u`, lowercase only) in a string `s`:\n- `count_vowels(s)` — recursive, **without** an accumulator.\n- `count_vowels_acc(s, acc=0)` — **tail recursive**, using an accumulator.\nFor example, both return 3 for `'recursion'`.",
    modelAnswer:
      "```\ndef count_vowels(s):\n    if s == '':\n        return 0\n    rest = count_vowels(s[1:])\n    if s[0] in 'aeiou':\n        return 1 + rest\n    return rest\n\ndef count_vowels_acc(s, acc=0):\n    if s == '':\n        return acc\n    if s[0] in 'aeiou':\n        return count_vowels_acc(s[1:], acc + 1)\n    return count_vowels_acc(s[1:], acc)\n```\nThe first version adds 1 **after** the recursive call returns; the second carries the running count in `acc` so every recursive call is the last action (tail call).",
    rubric: [
      { point: "Correct base case for the empty string (returns 0 / returns acc)", marks: 1 },
      { point: "Non-accumulator version: recurses on `s[1:]` and adds 1 when `s[0]` is a vowel", marks: 1 },
      { point: "Accumulator version passes `acc + 1` or `acc` in the recursive call", marks: 1 },
      { point: "Accumulator version is genuinely tail recursive (`return f(...)` with no work after the call)", marks: 1 },
    ],
    solution:
      "Both versions shrink the string by one character per call until the empty string. Common errors: returning `None` from the accumulator base case instead of `acc`, or writing `return 1 + count_vowels_acc(...)`, which is no longer tail recursive.",
  },
  {
    kind: "open",
    subtopic: "recursion vs iteration",
    difficulty: "easy",
    prompt:
      "Rewrite the recursive function below **without recursion**, using a loop and an accumulator variable. Then state one advantage of the iterative version.",
    code: "def power(b, e):\n    if e == 0:\n        return 1\n    return b * power(b, e - 1)",
    modelAnswer:
      "```\ndef power(b, e):\n    result = 1\n    for _ in range(e):\n        result = result * b\n    return result\n```\nThe accumulator `result` starts at the base-case value 1 and is multiplied by `b` once per step, exactly `e` times.\nAdvantage: the loop uses a fixed amount of memory (no stack frame per step), so it cannot raise `RecursionError` for large `e` and avoids the overhead of function calls.",
    rubric: [
      { point: "Accumulator initialised to 1 (the base-case value) before the loop", marks: 1 },
      { point: "Loop runs exactly `e` times multiplying the accumulator by `b`, and the accumulator is returned", marks: 1 },
      { point: "Valid advantage, e.g. no call-stack growth / no RecursionError / less call overhead", marks: 1 },
    ],
    solution:
      "Recursion → iteration: the base-case value becomes the accumulator's initial value, and the recursive step's operation becomes the loop body. Initialising `result = 0` is a common slip that always returns 0.",
  },
  {
    kind: "open",
    subtopic: "list recursion",
    difficulty: "hard",
    prompt:
      "The **Hamming weight** of a binary string is the number of `1`s in it. Write a **recursive** function `weight_strings(n, c)` that returns a list of all binary strings of length `n` with Hamming weight **exactly** `c` (any order). For example, `weight_strings(3, 2)` returns `['110', '101', '011']` in some order, and `weight_strings(2, 3)` returns `[]`.",
    modelAnswer:
      "```\ndef weight_strings(n, c):\n    if c < 0 or c > n:\n        return []          # impossible\n    if n == 0:\n        return ['']        # one string: the empty string\n    result = []\n    for s in weight_strings(n - 1, c - 1):\n        result.append('1' + s)     # first char is 1\n    for s in weight_strings(n - 1, c):\n        result.append('0' + s)     # first char is 0\n    return result\n```\nEvery valid string starts with either `1` (then the remaining n-1 characters need weight c-1) or `0` (the remaining characters need weight c). Combining the two sub-results covers every string exactly once.",
    rubric: [
      { point: "Base case n == 0 returns `['']` (a list containing the empty string)", marks: 1 },
      { point: "Handles impossible cases (c < 0 or c > n) by returning `[]`", marks: 1 },
      { point: "Recursive step: prefix '1' to strings from (n-1, c-1)", marks: 1 },
      { point: "Recursive step: prefix '0' to strings from (n-1, c) and combines both lists", marks: 1 },
    ],
    solution:
      "The key decomposition is on the first character. A frequent bug is returning `[]` instead of `['']` when n == 0, which makes every result empty because there is nothing to prefix.",
  },
  {
    kind: "open",
    subtopic: "memoisation",
    difficulty: "medium",
    prompt:
      "The naive recursive Fibonacci function `fib(n)` (with `return fib(n - 1) + fib(n - 2)`) becomes very slow for `n` around 35. Explain **why**, and write a version `fib_memo(n, memo)` that uses a dictionary to avoid the problem.",
    modelAnswer:
      "Why: each call with n ≥ 2 makes two calls, and the same subproblems are solved again and again — e.g. `fib(5)` computes `fib(3)` twice and `fib(2)` three times. The number of calls grows roughly like 2ⁿ (exponential).\n```\ndef fib_memo(n, memo):\n    if n in memo:\n        return memo[n]\n    if n < 2:\n        result = n\n    else:\n        result = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    memo[n] = result\n    return result\n\nprint(fib_memo(35, {}))   # 9227465\n```\nEach value of n is now computed only once and then looked up, so only about 2n calls are made (linear).",
    rubric: [
      { point: "Explains repeated computation of the same subproblems / branching into two calls", marks: 1 },
      { point: "States the growth is exponential (about 2ⁿ calls)", marks: 1 },
      { point: "Checks the dictionary before computing and returns the stored value", marks: 1 },
      { point: "Stores each newly computed result in the dictionary before returning", marks: 1 },
    ],
    solution:
      "Memoisation trades a little memory (a dictionary of n entries) for a huge saving in time: from exponential to linear. Forgetting to store the result (`memo[n] = result`) gives a correct but still exponential function.",
  },
];
