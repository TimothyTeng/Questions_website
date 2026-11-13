import type { ScDraft } from "@/lib/sc1001/types";

export const booleanSelection: ScDraft[] = [
  // ---------- MCQ ----------
  {
    kind: "mcq",
    subtopic: "Relational operators",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "tom = 19\nprint(tom > 18)\nprint(tom == '19')",
    options: ["True\nTrue", "true\nfalse", "True\nFalse", "19\nFalse"],
    answer: 2,
    verify: true,
    solution:
      "`tom > 18` is `True`. `tom == '19'` compares the **int** 19 with the **string** `'19'`; values of different types are never equal, so it is `False` (no error — `==` between different types is allowed). Booleans print with a capital letter: `True` / `False`.",
  },
  {
    kind: "mcq",
    subtopic: "if / if-else",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "temp = 37.5\nif temp > 37.5:\n    print('Fever')\nelse:\n    print('Normal')\nprint('Done')",
    options: ["Fever\nDone", "Normal\nDone", "Normal", "Fever\nNormal\nDone"],
    answer: 1,
    verify: true,
    solution:
      "`37.5 > 37.5` is `False` (strictly greater), so the `else` block runs and prints `Normal`. `print('Done')` is not indented, so it is **outside** the if-else and always runs. Exactly one of the two branches runs, never both.",
  },
  {
    kind: "mcq",
    subtopic: "Boolean values",
    difficulty: "easy",
    prompt: "What happens when the following code is run?",
    code: "c = true\nprint(c)",
    options: [
      "true",
      "True",
      "NameError: name 'true' is not defined. Did you mean: 'True'?",
      "SyntaxError: invalid syntax",
    ],
    answer: 2,
    verify: true,
    solution:
      "Python is case-sensitive. The boolean literals are `True` and `False` with capital letters. `true` is treated as an ordinary variable name, and since no variable called `true` exists, a **NameError** is raised (Python even suggests `True`). It is not a SyntaxError because `true` is a perfectly legal name — it just has not been assigned.",
  },
  {
    kind: "mcq",
    subtopic: "Logical operators & precedence",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "a, b, c = 4, 7, 12\nprint(a < 5 or b == 0 and 15 > c > 12)",
    options: ["False", "7", "None", "True"],
    answer: 3,
    verify: true,
    solution:
      "`and` has **higher precedence** than `or`, so this is `a < 5 or (b == 0 and 15 > c > 12)`.\n- `b == 0` → False, and `15 > c > 12` means `15 > 12 and 12 > 12` → False, so the bracket is False\n- `a < 5` → `4 < 5` → True\n- `True or False` → **True**\nEvaluating strictly left to right, `(a < 5 or b == 0) and (15 > c > 12)` = `True and False` would give the wrong answer `False`. The result is a bool, not one of the numbers.",
  },
  {
    kind: "mcq",
    subtopic: "Chained comparisons",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "print((10 > 5) > 1, 10 > 5 > 1)",
    options: ["False True", "True True", "True False", "False False"],
    answer: 0,
    verify: true,
    solution:
      "With brackets, `(10 > 5)` is evaluated first and gives `True`; then `True > 1` compares 1 > 1 (True behaves as 1), which is **False**.\nWithout brackets, `10 > 5 > 1` is a **chained comparison**, meaning `10 > 5 and 5 > 1`, which is **True**. The brackets change the meaning.",
  },
  {
    kind: "mcq",
    subtopic: "Logical operators & precedence",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(True or False and False)",
    options: ["False", "True", "None", "SyntaxError: invalid syntax"],
    answer: 1,
    verify: true,
    solution:
      "Precedence is `not` > `and` > `or`. So the expression is `True or (False and False)` = `True or False` = **True**. Evaluating strictly left to right — `(True or False) and False` — would give the wrong answer `False`.",
  },
  {
    kind: "mcq",
    subtopic: "Logical operators & precedence",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "is_member = False\nhas_coupon = True\nis_weekend = False\ndiscount = has_coupon and (is_member or is_weekend)\nif discount:\n    print('Discount applied')\nelse:\n    print('Full price')",
    options: ["Discount applied", "True", "Full price", "Discount applied\nFull price"],
    answer: 2,
    verify: true,
    solution:
      "The bracket is evaluated first: `is_member or is_weekend` → `False or False` → False. Then `has_coupon and False` → `True and False` → **False**. Since `discount` is False, the `else` branch prints `Full price`.",
  },
  {
    kind: "mcq",
    subtopic: "Truthiness",
    difficulty: "easy",
    prompt: "Which one of these values is treated as **False** in an `if` condition?",
    options: ["`'0'`", "`' '`", "`-1`", "`0.0`"],
    answer: 3,
    solution:
      "Falsy values include `False`, `None`, zero of any numeric type (`0`, `0.0`) and empty collections such as `''` and `[]`. Everything else is truthy.\n- `'0'` and `' '` are **non-empty strings** (one character each), so they are truthy.\n- `-1` is a non-zero number, so it is truthy.\n- `0.0` is zero, so it is falsy.",
  },
  {
    kind: "mcq",
    subtopic: "Truthiness",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(bool('False'), bool(0.0), bool(' '), bool(None))",
    options: ["False False False False", "True False True False", "False False True False", "True False False False"],
    answer: 1,
    verify: true,
    solution:
      "`bool()` checks truthiness, not the text inside a string.\n- `'False'` is a non-empty string → **True**\n- `0.0` is zero → False\n- `' '` contains one space, so it is non-empty → **True**\n- `None` → False",
  },
  {
    kind: "mcq",
    subtopic: "Boolean expressions returning values",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(0 or 'a', 3 and 0, '' or 0)",
    options: ["True False False", "a 0 ''", "a 0 0", "0 3 0"],
    answer: 2,
    verify: true,
    solution:
      "`and` / `or` return **one of their operands**, not necessarily `True`/`False`.\n- `x or y` returns `x` if `x` is truthy, otherwise `y`: `0 or 'a'` → `'a'`; `'' or 0` → `0` (both falsy, so the last one is returned).\n- `x and y` returns `x` if `x` is falsy, otherwise `y`: `3 and 0` → `0`.\nSo `print` shows `a 0 0` (strings are printed without quotes).",
  },
  {
    kind: "mcq",
    subtopic: "Boolean expressions returning values",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print(5 and 7, 0 and 7, 5 or 7, None or False)",
    options: ["True False True False", "5 0 7 None", "7 0 7 False", "7 0 5 False"],
    answer: 3,
    verify: true,
    solution:
      "- `5 and 7`: 5 is truthy, so `and` returns the second operand → `7`\n- `0 and 7`: 0 is falsy, so `and` stops and returns it → `0`\n- `5 or 7`: 5 is truthy, so `or` returns it → `5`\n- `None or False`: None is falsy, so `or` returns the second operand → `False`",
  },
  {
    kind: "mcq",
    subtopic: "String comparison",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print('apple' < 'banana', 'Zoo' < 'apple')",
    options: ["True True", "True False", "False True", "False False"],
    answer: 0,
    verify: true,
    solution:
      "Strings are compared **character by character** using their Unicode (ASCII) codes. `'a'` (97) < `'b'` (98), so `'apple' < 'banana'` is True. All uppercase letters come before all lowercase letters: `'Z'` is 90 and `'a'` is 97, so `'Zoo' < 'apple'` is also **True**, even though Z comes after a in the alphabet.",
  },
  {
    kind: "mcq",
    subtopic: "String comparison",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print('10' < '9', 10 < 9)",
    options: ["False False", "True True", "True False", "False True"],
    answer: 2,
    verify: true,
    solution:
      "`'10'` and `'9'` are **strings**, so they are compared character by character: the first characters are `'1'` and `'9'`, and `'1'` < `'9'`, so `'10' < '9'` is **True** (length does not matter). As integers, `10 < 9` is False. This is why numbers read with `input()` must be converted before comparing.",
  },
  {
    kind: "mcq",
    subtopic: "String comparison",
    difficulty: "medium",
    prompt: "What happens when the following code is run?",
    code: "age = '5'\nprint(age < 7)",
    options: [
      "True",
      "TypeError: '<' not supported between instances of 'str' and 'int'",
      "False",
      "ValueError: invalid literal for int() with base 10: '5'",
    ],
    answer: 1,
    verify: true,
    solution:
      "Ordering operators (`<`, `>`, `<=`, `>=`) cannot compare a `str` with an `int`, so Python raises a **TypeError**. (By contrast, `==` between a str and an int is allowed and simply gives `False`.) Fix it with `int(age) < 7`.",
  },
  {
    kind: "mcq",
    subtopic: "== vs is",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "a = [1, 2]\nb = [1, 2]\nc = a\nprint(a == b, a is b, a is c)",
    options: ["True True True", "True False False", "False False True", "True False True"],
    answer: 3,
    verify: true,
    solution:
      "`==` compares **values**; `is` checks whether two names refer to the **same object**.\n- `a == b`: same contents → True\n- `a is b`: two separate lists were created → False\n- `a is c`: `c = a` makes `c` another name for the very same list → True",
  },
  {
    kind: "mcq",
    subtopic: "Indentation & blocks",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "a = 8\nif a > 10:\n    print(a)\n    print(a * 2)\nprint(a + 1)",
    options: ["8\n16\n9", "16\n9", "9", "Nothing is printed"],
    answer: 2,
    verify: true,
    solution:
      "`8 > 10` is False, so the whole indented block (both `print(a)` and `print(a * 2)`) is skipped. `print(a + 1)` is not indented, so it is not part of the if-block and always runs, printing `9`.",
  },
  {
    kind: "mcq",
    subtopic: "Indentation & blocks",
    difficulty: "medium",
    prompt: "What happens when the following code is run?",
    code: "x = 4\nif x > 2:\nprint('big')",
    options: [
      "big",
      "Nothing is printed",
      "SyntaxError: invalid syntax",
      "IndentationError: expected an indented block after 'if' statement on line 2",
    ],
    answer: 3,
    verify: true,
    solution:
      "After the colon of an `if`, Python requires an **indented block**. Here `print('big')` is at the same level as the `if`, so the program cannot even be compiled and an `IndentationError` (a kind of syntax error) is reported before anything runs. Indent the `print` line to fix it.",
  },

  // ---------- Short answer ----------
  {
    kind: "short",
    subtopic: "if / if-else",
    difficulty: "medium",
    prompt: "What exactly does this code print?",
    code: "a = 6 + 5\nif a > 8:\n    print('big')\n    print('still big')\nif a < 9:\n    print('small')\nprint('end')",
    accept: ["big\nstill big\nend"],
    verify: true,
    solution:
      "`a` is 11. The first `if` is True, so both indented lines run: `big`, `still big`. The second `if` is a **separate** statement (not an `else`), and `11 < 9` is False, so `small` is skipped. `print('end')` is unindented and always runs.",
  },
  {
    kind: "short",
    subtopic: "Relational operators",
    difficulty: "easy",
    prompt: "What does this code print?",
    code: "n = 17\nprint(n % 2 == 1)",
    accept: ["True"],
    verify: true,
    solution:
      "Arithmetic is done before comparison: `17 % 2` is 1, and `1 == 1` is **True**. This is the standard test for an odd number.",
  },
  {
    kind: "short",
    subtopic: "Boolean expressions returning values",
    difficulty: "medium",
    prompt: "What does this code print?",
    code: "print(not 0 and 4)",
    accept: ["4"],
    verify: true,
    solution:
      "`not` binds more tightly than `and`, so this is `(not 0) and 4`. `0` is falsy, so `not 0` is `True`. `True and 4`: the first operand is truthy, so `and` returns the second operand, **4** (not `True`).",
  },
  {
    kind: "short",
    subtopic: "Truthiness",
    difficulty: "hard",
    prompt: "What exactly does this code print?",
    code: "x = 0\nif x:\n    print('A')\nif not x:\n    print('B')\nif x == False:\n    print('C')\nif x is None:\n    print('D')",
    accept: ["B\nC"],
    verify: true,
    solution:
      "Four separate `if` statements, each checked independently.\n- `if x:` → 0 is falsy, skip `A`.\n- `if not x:` → True, print `B`.\n- `if x == False:` → `False` has the value 0, so `0 == False` is True, print `C`.\n- `if x is None:` → 0 is not the `None` object, skip `D`.",
  },
  {
    kind: "short",
    subtopic: "String comparison",
    difficulty: "medium",
    prompt: "What does this code print?",
    code: "print(max('apple', 'Banana'))",
    accept: ["apple"],
    verify: true,
    solution:
      "`max` uses `<`/`>` on strings, which compares character codes. `'a'` (97) is greater than `'B'` (66) because every lowercase letter has a larger code than every uppercase letter, so the \"larger\" string is **apple**.",
  },
  {
    kind: "short",
    subtopic: "Boolean values",
    difficulty: "easy",
    prompt: "What does this code print?",
    code: "print(type(3 > 2))",
    accept: ["<class 'bool'>"],
    verify: true,
    solution: "A comparison produces a value of type `bool` (here `True`), so `type()` gives `<class 'bool'>`.",
  },
  {
    kind: "short",
    subtopic: "Boolean values",
    difficulty: "medium",
    prompt: "What does this code print?",
    code: "print(True + True + False)",
    accept: ["2"],
    verify: true,
    solution:
      "`bool` is a subtype of `int`: `True` behaves as 1 and `False` as 0 in arithmetic. 1 + 1 + 0 = **2** (an int, so it prints `2`, not `True`).",
  },
  {
    kind: "short",
    subtopic: "Chained comparisons",
    difficulty: "hard",
    prompt: "What does this code print?",
    code: "a = 3\nprint(a < 5 == True)",
    accept: ["False"],
    verify: true,
    solution:
      "`<` and `==` are both comparison operators, so this is a **chained comparison**: `a < 5 and 5 == True`. `3 < 5` is True, but `5 == True` means `5 == 1`, which is False. So the result is **False**. To get the intended meaning you would need brackets: `(a < 5) == True` (or simply `a < 5`).",
  },

  // ---------- Open ----------
  {
    kind: "open",
    subtopic: "Writing boolean expressions",
    difficulty: "medium",
    prompt:
      "A garden sprinkler should switch on only when **all** of these hold:\n- the soil is dry (`soil_dry` is a bool),\n- it is not raining (`raining` is a bool),\n- the hour (`hour`, an int from 0 to 23) is between 6 and 9 inclusive **or** between 18 and 20 inclusive.\nWrite a single Python boolean expression for `sprinkler_on`, and explain why brackets are needed.",
    modelAnswer:
      "```\nsprinkler_on = soil_dry and not raining and (6 <= hour <= 9 or 18 <= hour <= 20)\n```\nThe brackets are needed because `and` has higher precedence than `or`. Without them the expression would mean `(soil_dry and not raining and 6 <= hour <= 9) or (18 <= hour <= 20)`, which would switch the sprinkler on every evening even if it is raining or the soil is wet.",
    rubric: [
      { point: "Uses `and` to combine soil_dry, not raining and the time condition", marks: 1 },
      { point: "Uses `not raining` (or `raining == False`) correctly", marks: 1 },
      { point: "Correct inclusive ranges, e.g. `6 <= hour <= 9 or 18 <= hour <= 20`", marks: 1 },
      { point: "Brackets around the `or` part, with the explanation that `and` binds tighter than `or`", marks: 1 },
    ],
    solution:
      "Translate each condition into a sub-expression, join the \"all of\" conditions with `and`, and bracket the \"either/or\" part so that precedence does not split it.",
  },
  {
    kind: "open",
    subtopic: "if / if-else",
    difficulty: "easy",
    prompt:
      "Write a Python program that reads an integer from the user and prints `Even` if it is even, or `Odd` otherwise.\n\nSample run:\n```\nEnter a number: 7\nOdd\n```",
    modelAnswer:
      "```\nn = int(input('Enter a number: '))\nif n % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')\n```",
    rubric: [
      { point: "Reads the input and converts it with `int()`", marks: 1 },
      { point: "Correct condition using `%` (e.g. `n % 2 == 0`)", marks: 1 },
      { point: "Correct if-else structure with colons and indentation, printing the right word", marks: 1 },
    ],
    solution:
      "Without `int()`, `n` would be a `str` (because `input()` returns a string) and `n % 2` would raise a TypeError. Using `if`/`else` guarantees exactly one message.",
  },
  {
    kind: "open",
    subtopic: "== vs is",
    difficulty: "medium",
    prompt:
      "Explain the difference between `==` and `is` in Python. Give a short example where `==` is `True` but `is` is `False`, and state when `is` is the right operator to use.",
    modelAnswer:
      "`==` tests **equality of value**: do the two objects contain the same data? `is` tests **identity**: are the two names referring to the very same object in memory?\nExample:\n```\na = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)  # True  - same contents\nprint(a is b)  # False - two different list objects\n```\n`is` should be used for checking against singletons such as `None` (`if x is None:`). For comparing numbers, strings or lists, use `==`.",
    rubric: [
      { point: "`==` compares values / contents", marks: 1 },
      { point: "`is` compares identity (same object)", marks: 1 },
      { point: "Valid example where `==` is True and `is` is False (e.g. two equal lists)", marks: 1 },
      { point: "States that `is` is appropriate for `None` (and `==` for ordinary value comparison)", marks: 1 },
    ],
    solution:
      "Value vs identity. Two separately created lists with equal contents are the clearest example. Do not rely on `is` for numbers or strings: whether equal values share one object is an implementation detail.",
  },
  {
    kind: "open",
    subtopic: "Indentation & blocks",
    difficulty: "medium",
    prompt:
      "A student wants the program below to print `Pass` and `Well done` **only** when the mark is at least 50, and to print `End` in every case. Identify the **two** mistakes and write the corrected program.",
    code: "mark = int(input('Mark: '))\nif mark >= 50\n    print('Pass')\nprint('Well done')\nprint('End')",
    modelAnswer:
      "1. The `if` line is missing its colon — a SyntaxError (`expected ':'`).\n2. `print('Well done')` is not indented, so it is outside the if-block and would run for every mark (a logic error).\n\nCorrected:\n```\nmark = int(input('Mark: '))\nif mark >= 50:\n    print('Pass')\n    print('Well done')\nprint('End')\n```",
    rubric: [
      { point: "Identifies the missing colon after the condition (syntax error)", marks: 1 },
      { point: "Identifies that `print('Well done')` must be indented to belong to the if-block", marks: 1 },
      { point: "Corrected program with `End` left unindented so it always prints", marks: 1 },
    ],
    solution:
      "In Python the colon starts a block and the **indentation defines which statements belong to it**. One mistake stops the program from running at all; the other runs but gives the wrong output.",
  },
];
