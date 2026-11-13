import type { ScDraft } from "@/lib/sc1001/types";

export const typesVarsIo: ScDraft[] = [
  // ---------- MCQ ----------
  {
    kind: "mcq",
    subtopic: "Data types & type()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "x = 7 / 2\nprint(type(x))",
    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "3.5"],
    answer: 1,
    verify: true,
    solution:
      "In Python 3 the `/` operator is **true division** and always produces a `float`, even when both operands are `int` (`7 / 2` is `3.5`, and `8 / 2` would be `4.0`). `type(x)` reports the class, so `<class 'float'>` is printed, not the value `3.5`. `<class 'int'>` would be the result of `7 // 2`.",
  },
  {
    kind: "mcq",
    subtopic: "Variable naming",
    difficulty: "easy",
    prompt: "Which of the following is a **valid** Python variable name?",
    options: ["`2nd_place`", "`user-name`", "`class`", "`_total2`"],
    answer: 3,
    solution:
      "An identifier may contain letters, digits and underscores, must **not start with a digit**, and must not be a keyword.\n- `2nd_place` starts with a digit.\n- `user-name` contains `-`, which Python reads as subtraction.\n- `class` is a reserved keyword.\n- `_total2` starts with an underscore and contains only letters, digits and `_`, so it is valid.",
  },
  {
    kind: "mcq",
    subtopic: "Arithmetic operators",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "print(17 // 5, 17 % 5)",
    options: ["3 2", "3.4 2", "2 3", "3 2.0"],
    answer: 0,
    verify: true,
    solution:
      "`//` is floor (integer) division: 17 / 5 = 3.4, floored to **3**. `%` gives the remainder: 17 = 5 × 3 + **2**. Both operands are `int`, so both results are `int` (no `.0`). `print` separates the two values with a space.",
  },
  {
    kind: "mcq",
    subtopic: "Arithmetic operators",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(-7 // 2, -7 % 2)",
    options: ["-3 -1", "-3 1", "-4 1", "-4 -1"],
    answer: 2,
    verify: true,
    solution:
      "`//` rounds **down towards negative infinity**, not towards zero: -7 / 2 = -3.5, floored to **-4**. Python keeps the identity `a == (a // b) * b + a % b`, so `-7 % 2` = -7 - (-4 × 2) = **1**. The result of `%` takes the sign of the divisor (2 is positive). `-3 -1` is what C/Java would give (truncation towards zero).",
  },
  {
    kind: "mcq",
    subtopic: "Operator precedence",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(2 ** 3 ** 2)",
    options: ["64", "512", "36", "81"],
    answer: 1,
    verify: true,
    solution:
      "`**` is **right-associative**, so the expression is `2 ** (3 ** 2)` = `2 ** 9` = **512**. Reading it left to right as `(2 ** 3) ** 2` would give 64 — a common trap.",
  },
  {
    kind: "mcq",
    subtopic: "Operator precedence",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "print(-2 ** 2, (-2) ** 2)",
    options: ["4 4", "-4 -4", "4 -4", "-4 4"],
    answer: 3,
    verify: true,
    solution:
      "`**` binds **more tightly** than the unary minus, so `-2 ** 2` means `-(2 ** 2)` = **-4**. With brackets, `(-2) ** 2` squares negative two and gives **4**.",
  },
  {
    kind: "mcq",
    subtopic: "Operator precedence",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(10 - 4 / 2 * 3)",
    options: ["4.0", "9.0", "4", "1.0"],
    answer: 0,
    verify: true,
    solution:
      "`/` and `*` have the same precedence and are evaluated left to right, both before `-`: `4 / 2` = 2.0, then `2.0 * 3` = 6.0, then `10 - 6.0` = **4.0**. The result is a `float` because `/` always produces a float, so `4` (an int) is wrong. `9.0` comes from wrongly doing `2 * 3` first; `1.0` from doing `10 - 4` first.",
  },
  {
    kind: "mcq",
    subtopic: "print() sep and end",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "print('a', 'b', 'c', sep='-')",
    options: ["a b c", "abc-", "a-b-c", "-a-b-c-"],
    answer: 2,
    verify: true,
    solution:
      "`sep` is the string placed **between** consecutive values (default is a single space). It is not added before the first or after the last value, so the output is `a-b-c`.",
  },
  {
    kind: "mcq",
    subtopic: "print() sep and end",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print('Hi', end='')\nprint('there', end='!')\nprint()\nprint('Bye')",
    options: ["Hi there!\nBye", "Hithere!\nBye", "Hi\nthere!\nBye", "Hithere!\n\nBye"],
    answer: 1,
    verify: true,
    solution:
      "`end` replaces the newline normally printed at the end of `print`. The first call prints `Hi` with nothing after it, the second prints `there!` with no newline, and the empty `print()` only outputs the newline that finishes the line `Hithere!`. Then `Bye` is printed on the next line. There is no blank line, because the empty `print()` ends the current line rather than adding an extra one.",
  },
  {
    kind: "mcq",
    subtopic: "Type conversion",
    difficulty: "medium",
    prompt: "What happens when the following code is run?",
    code: "n = int('3.7')\nprint(n)",
    options: ["3", "4", "3.7", "ValueError: invalid literal for int() with base 10: '3.7'"],
    answer: 3,
    verify: true,
    solution:
      "`int()` can convert a **string** only if it looks like a whole number (e.g. `'37'`, `' -5 '`). The string `'3.7'` contains a decimal point, so a `ValueError` is raised. Note the difference: `int(3.7)` (a float) truncates to 3, and `int(float('3.7'))` also gives 3 — but `int('3.7')` fails.",
  },
  {
    kind: "mcq",
    subtopic: "Type conversion",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "x = '5'\ny = 2\nprint(x * y)",
    options: ["55", "10", "52", "TypeError: can't multiply sequence by non-int of type 'str'"],
    answer: 0,
    verify: true,
    solution:
      "`x` is the **string** `'5'`, not the number 5. Multiplying a string by an integer repeats it, so `'5' * 2` is `'55'`. To get 10 you would need `int(x) * y`. There is no error because `str * int` is a valid operation (repetition).",
  },
  {
    kind: "mcq",
    subtopic: "Type conversion",
    difficulty: "easy",
    prompt: "What happens when the following code is run?",
    code: "age = 20\nprint('Age: ' + age)",
    options: ["Age: 20", "Age:20", "TypeError: can only concatenate str (not \"int\") to str", "Age: + 20"],
    answer: 2,
    verify: true,
    solution:
      "`+` between a `str` and an `int` is not allowed — Python does not convert automatically. Fixes: `print('Age: ' + str(age))`, `print('Age:', age)` (comma lets `print` handle the conversion), or `print(f'Age: {age}')`.",
  },
  {
    kind: "mcq",
    subtopic: "round() and float precision",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "print(round(2.5), round(3.5), round(2.675, 2))",
    options: ["3 4 2.68", "2 4 2.67", "2 3 2.67", "3 4 2.67"],
    answer: 1,
    verify: true,
    solution:
      "Python's `round()` uses **round-half-to-even** (banker's rounding): an exact .5 goes to the nearest **even** integer, so `round(2.5)` is 2 and `round(3.5)` is 4. For `round(2.675, 2)`, the float `2.675` is actually stored as 2.67499999… (binary cannot represent it exactly), so it rounds down to **2.67**.",
  },
  {
    kind: "mcq",
    subtopic: "f-strings & format specs",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "price = 3.14159\nprint(f'${price:.2f}')",
    options: ["$3.14", "$3.142", "$3.1", "${price:.2f}"],
    answer: 0,
    verify: true,
    solution:
      "In an f-string, `{price:.2f}` formats the value as a fixed-point number with **2 digits after the decimal point**: 3.14. The `$` before the brace is ordinary text. `.2f` is not 2 significant figures (that would be `3.1`). The `f` prefix makes Python substitute the value, so the braces are not printed literally.",
  },
  {
    kind: "mcq",
    subtopic: "f-strings & format specs",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "n = 42\nprint(f'[{n:>5}][{n:<5}]')",
    options: ["[42][42]", "[42   ][   42]", "[00042][42000]", "[   42][42   ]"],
    answer: 3,
    verify: true,
    solution:
      "`:>5` right-aligns the value in a field **5 characters wide** (3 spaces, then `42`). `:<5` left-aligns it (`42`, then 3 spaces). Padding uses spaces unless a fill character is given (e.g. `:0>5` would give `00042`).",
  },
  {
    kind: "mcq",
    subtopic: "Assignment & swap",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "a, b, c = 1, 2, 3\na, b, c = c, a, b\nprint(a, b, c)",
    options: ["3 3 3", "1 2 3", "3 1 2", "2 3 1"],
    answer: 2,
    verify: true,
    solution:
      "In a multiple assignment the **whole right-hand side is evaluated first** using the old values: `(c, a, b)` = `(3, 1, 2)`. Only then are the values assigned to `a, b, c`. So `a = 3`, `b = 1`, `c = 2`. `3 3 3` would happen only if the assignments were done one at a time.",
  },
  {
    kind: "mcq",
    subtopic: "input() returns str",
    difficulty: "easy",
    prompt: "The user types `25` and presses Enter when this program runs. What is printed?",
    code: "x = input('Enter a number: ')\nprint(type(x))",
    options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "25"],
    answer: 1,
    solution:
      "`input()` **always returns a string**, whatever the user types. To use it as a number you must convert it, e.g. `int(x)` or `float(x)`. (The prompt `Enter a number: ` also appears on screen, but the value printed by `print` is `<class 'str'>`.)",
  },

  // ---------- Short answer ----------
  {
    kind: "short",
    subtopic: "Operator precedence",
    difficulty: "easy",
    prompt: "What value does this code print?",
    code: "print(2 + 3 * 4 ** 2)",
    accept: ["50"],
    verify: true,
    solution: "Precedence: `**` first, then `*`, then `+`. `4 ** 2` = 16, `3 * 16` = 48, `2 + 48` = **50**.",
  },
  {
    kind: "short",
    subtopic: "Augmented assignment",
    difficulty: "medium",
    prompt: "What value does this code print?",
    code: "x = 5\nx += 3\nx *= 2\nx //= 3\nx **= 2\nprint(x)",
    accept: ["25"],
    verify: true,
    solution:
      "Trace each line: `x += 3` → 8, `x *= 2` → 16, `x //= 3` → 5 (16 / 3 = 5.33, floored), `x **= 2` → **25**. Every operand is an `int` and `//` keeps it an `int`, so there is no `.0`.",
  },
  {
    kind: "short",
    subtopic: "round() and float precision",
    difficulty: "easy",
    prompt: "What exactly does this code print?",
    code: "print(0.1 + 0.2)",
    accept: ["0.30000000000000004"],
    verify: true,
    solution:
      "0.1 and 0.2 cannot be stored exactly in binary floating point, so their sum is slightly more than 0.3 and Python prints **0.30000000000000004**. This is why floats should not be compared with `==`; use something like `abs(a - b) < 1e-9` or `round()` instead.",
  },
  {
    kind: "short",
    subtopic: "Variables & assignment",
    difficulty: "medium",
    prompt: "What exactly does this code print?",
    code: "count = 3\nCount = count * 2\ncount = Count + count\nprint(count, 'Count')",
    accept: ["9 Count"],
    verify: true,
    solution:
      "Python is **case-sensitive**: `count` and `Count` are two different variables. `Count` = 3 × 2 = 6, then `count` = 6 + 3 = 9. The second argument `'Count'` is a string literal (in quotes), so the word `Count` is printed, not the variable's value. Output: `9 Count`.",
  },
  {
    kind: "short",
    subtopic: "Type conversion",
    difficulty: "medium",
    prompt: "What value does this code print?",
    code: "print(int(float('4.9')) + int(True))",
    accept: ["5"],
    verify: true,
    solution:
      "`float('4.9')` is 4.9; `int(4.9)` **truncates** (drops the fractional part, no rounding) to 4. `True` behaves as the integer 1, so `int(True)` is 1. 4 + 1 = **5**.",
  },
  {
    kind: "short",
    subtopic: "Arithmetic operators",
    difficulty: "hard",
    prompt: "What exactly does this code print?",
    code: "print(7.5 // 2, -7.5 % 2)",
    accept: ["3.0 0.5"],
    verify: true,
    solution:
      "`//` and `%` also work on floats, and the result is a float. `7.5 // 2` = floor(3.75) = **3.0**. For `-7.5 % 2`, `-7.5 // 2` = floor(-3.75) = -4, so the remainder is -7.5 - (-4 × 2) = **0.5** (the result has the sign of the divisor). Output: `3.0 0.5`.",
  },
  {
    kind: "short",
    subtopic: "Data types & type()",
    difficulty: "medium",
    prompt: "What exactly does this code print? (Two lines.)",
    code: "result = print('Hi')\nprint(result, type(result))",
    accept: ["Hi\nNone <class 'NoneType'>"],
    verify: true,
    solution:
      "`print('Hi')` displays `Hi`, but the function itself **returns `None`** (it has no useful return value). So `result` is `None`, whose type is `NoneType`. The second line prints `None <class 'NoneType'>`.",
  },
  {
    kind: "short",
    subtopic: "print() sep and end",
    difficulty: "medium",
    prompt: "What exactly does this code print?",
    code: "print(1, 2, 3, sep='', end='#')\nprint(4)",
    accept: ["123#4"],
    verify: true,
    solution:
      "`sep=''` puts nothing between the values, giving `123`. `end='#'` replaces the usual newline with `#`, so the next `print(4)` continues on the same line: `123#4`.",
  },

  // ---------- Open ----------
  {
    kind: "open",
    subtopic: "Variable naming",
    difficulty: "easy",
    prompt:
      "For each name below, state whether it is a **valid** Python variable name. If it is invalid, give the reason.\n- `my_score`\n- `2fast`\n- `for`\n- `Phone#`\n- `_temp`\n- `Total`",
    modelAnswer:
      "- `my_score`: valid.\n- `2fast`: invalid — a name cannot start with a digit.\n- `for`: invalid — `for` is a reserved keyword.\n- `Phone#`: invalid — `#` is not allowed (only letters, digits and `_`); Python treats `#` as the start of a comment.\n- `_temp`: valid — names may start with an underscore.\n- `Total`: valid — and it is a different variable from `total` because Python is case-sensitive.",
    rubric: [
      { point: "Correctly identifies the three valid names (`my_score`, `_temp`, `Total`)", marks: 1 },
      { point: "`2fast` invalid: cannot start with a digit", marks: 1 },
      { point: "`for` invalid: reserved keyword", marks: 1 },
      { point: "`Phone#` invalid: `#` is not an allowed character", marks: 1 },
    ],
    solution:
      "Rules: letters, digits and underscores only; must start with a letter or `_`; must not be a keyword; case-sensitive. Apply each rule to every name.",
  },
  {
    kind: "open",
    subtopic: "input() returns str",
    difficulty: "medium",
    prompt:
      "Write a Python program that reads the **unit price** of an item (may have decimals) and the **quantity** bought (a whole number), each on its own line, and prints the total cost with exactly 2 decimal places.\n\nSample run:\n```\nPrice: 2.5\nQuantity: 3\nTotal: $7.50\n```",
    modelAnswer:
      "```\nprice = float(input('Price: '))\nqty = int(input('Quantity: '))\ntotal = price * qty\nprint(f'Total: ${total:.2f}')\n```",
    rubric: [
      { point: "Uses `input()` to read both values", marks: 1 },
      { point: "Converts the price with `float()` and the quantity with `int()` (input returns a string)", marks: 1 },
      { point: "Computes price × quantity correctly", marks: 1 },
      { point: "Prints with 2 decimal places, e.g. `:.2f` or `format(total, '.2f')`", marks: 1 },
    ],
    solution:
      "The key points are that `input()` returns a `str` (so `'2.5' * '3'` would be an error) and that `.2f` gives exactly 2 decimals, whereas `round(total, 2)` would print `7.5`, not `7.50`.",
  },
  {
    kind: "open",
    subtopic: "round() and float precision",
    difficulty: "medium",
    prompt:
      "Explain why `0.1 + 0.2 == 0.3` evaluates to `False` in Python. Then write a correct boolean expression that checks whether `a + b` is \"equal\" to `c` for floats `a`, `b`, `c`.",
    modelAnswer:
      "Floats are stored in binary with a limited number of bits. Values such as 0.1 and 0.2 have no exact binary representation (like 1/3 in decimal), so they are stored as close approximations. Adding them gives 0.30000000000000004, which is a different float from the stored value of 0.3, so `==` returns `False`.\nCompare with a tolerance instead: `abs((a + b) - c) < 1e-9` (or `math.isclose(a + b, c)`, or compare `round(a + b, 9) == round(c, 9)`).",
    rubric: [
      { point: "Floats are stored in binary with limited precision; 0.1/0.2/0.3 cannot be represented exactly", marks: 1 },
      { point: "The tiny representation errors make the sum differ from 0.3, so `==` is False", marks: 1 },
      { point: "Gives a correct tolerance-based comparison (e.g. `abs(a + b - c) < 1e-9`)", marks: 1 },
    ],
    solution: "Never test floats for exact equality; compare the absolute difference against a small tolerance.",
  },
  {
    kind: "open",
    subtopic: "Assignment & swap",
    difficulty: "hard",
    prompt:
      "For each statement below, executed in the order shown in a fresh Python shell, state the outcome (the value stored, the output, or the error and why).",
    code: "c = 10\n7 = a\na = c + 1\na + c = c\nimport = 5\na, b = c, a\nb, c, a = a, b\nx = y = 4\nprint(A)",
    modelAnswer:
      "- `c = 10`: OK, `c` is 10.\n- `7 = a`: SyntaxError — the left side of `=` must be a variable, not a literal (and `a` is not defined yet anyway).\n- `a = c + 1`: OK, `a` is 11.\n- `a + c = c`: SyntaxError — cannot assign to an expression.\n- `import = 5`: SyntaxError — `import` is a keyword.\n- `a, b = c, a`: OK — right side evaluated first (10, 11), so `a` is 10 and `b` is 11.\n- `b, c, a = a, b`: ValueError — not enough values to unpack (expected 3, got 2).\n- `x = y = 4`: OK, chained assignment; both `x` and `y` are 4.\n- `print(A)`: NameError — `A` is not defined (names are case-sensitive; only `a` exists).",
    rubric: [
      { point: "Identifies `7 = a` and `a + c = c` as invalid assignment targets (SyntaxError)", marks: 1 },
      { point: "Identifies `import = 5` as a keyword misuse (SyntaxError)", marks: 1 },
      { point: "Correctly traces `a, b = c, a` (a = 10, b = 11) using simultaneous evaluation", marks: 1 },
      { point: "Identifies the unpacking mismatch in `b, c, a = a, b` (ValueError)", marks: 1 },
      { point: "Explains `x = y = 4` and the NameError for `A` (case sensitivity)", marks: 1 },
    ],
    solution:
      "Assignment needs a **name** on the left and evaluates the whole right-hand side first. In multiple assignment the number of targets must match the number of values. Keywords cannot be used as names and Python is case-sensitive.",
  },
];
