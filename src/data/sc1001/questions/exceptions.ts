import type { ScDraft } from "@/lib/sc1001/types";

export const exceptions: ScDraft[] = [
  // ---------------- MCQ ----------------
  {
    kind: "mcq",
    subtopic: "syntax vs runtime",
    difficulty: "easy",
    prompt: "Which of these lines causes a **syntax error** (the program does not start running at all), rather than an exception at run time?",
    options: ["x = int('abc')", "print(10 / 0)", "print('total'", "nums = [1, 2]; print(nums[2])"],
    answer: 2,
    solution:
      "`print('total'` is missing its closing bracket, so Python cannot even parse the program: **SyntaxError** before anything runs, and `try/except` around it cannot help. The others are valid Python that fail only when executed: `ValueError`, `ZeroDivisionError` and `IndexError` respectively.",
  },
  {
    kind: "mcq",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "What is the last line of output when this code runs?",
    code: "age = int('12a')\nprint(age)",
    options: [
      "TypeError: int() argument must be a string",
      "ValueError: invalid literal for int() with base 10: '12a'",
      "12",
      "SyntaxError: invalid syntax",
    ],
    answer: 1,
    verify: true,
    solution:
      "`int()` accepts a string, so the **type** is right, but its **value** `'12a'` is not a valid integer: **ValueError**. The program stops, so `print(age)` never runs. It is not a syntax error, because the code itself is valid Python.",
  },
  {
    kind: "mcq",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "What is the last line of output when this code runs?",
    code: "count = 4\nprint('Items: ' + count)",
    options: [
      "Items: 4",
      "ValueError: invalid literal for int() with base 10: 'Items: '",
      "NameError: name 'count' is not defined",
      "TypeError: can only concatenate str (not \"int\") to str",
    ],
    answer: 3,
    verify: true,
    solution:
      "`+` between a `str` and an `int` is an operation on incompatible **types**: **TypeError**. Python never converts the number automatically; use `str(count)` or an f-string. `count` is defined, so it is not a NameError.",
  },
  {
    kind: "mcq",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "What is the last line of output when this code runs?",
    code: "prices = {'tea': 1.5, 'coffee': 2.0}\nprint(prices['juice'])",
    options: ["KeyError: 'juice'", "IndexError: list index out of range", "None", "ValueError: 'juice' is not in list"],
    answer: 0,
    verify: true,
    solution:
      "Looking up a key that a dictionary does not have raises **KeyError** with the missing key. Dictionaries do not raise IndexError (that is for sequence positions), and `[]` does not return `None`; only `prices.get('juice')` would.",
  },
  {
    kind: "mcq",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "What is printed when this code runs?",
    code: "marks = [70, 85, 90]\nfor i in range(4):\n    print(marks[i])",
    options: [
      "70\n85\n90",
      "70\n85\n90\nNone",
      "70\n85\n90\nIndexError: list index out of range",
      "IndexError: list index out of range",
    ],
    answer: 2,
    verify: true,
    solution:
      "Indices 0, 1, 2 are valid and print normally. When `i` is 3 the index is past the end of the list, raising **IndexError**. The three values printed before the error are still shown; the error stops the program from that point on.",
  },
  {
    kind: "mcq",
    subtopic: "try/except",
    difficulty: "easy",
    prompt: "Python programmers usually prefer the **EAFP** style (\"Easier to Ask Forgiveness than Permission\"). Which description matches EAFP?",
    options: [
      "Check every condition with `if` statements before performing an operation",
      "Never handle errors and let the program crash",
      "Use `assert` statements instead of exceptions",
      "Attempt the operation inside `try` and deal with any failure in `except`",
    ],
    answer: 3,
    solution:
      "EAFP: just run the code in a `try` suite and clean up in `except` if it fails. This keeps the normal logic separate from the error handling. Checking everything first with `if` is the opposite style, **LBYL** (Look Before You Leap), which tends to make code longer and harder to read.",
  },
  {
    kind: "mcq",
    subtopic: "try/except",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "try:\n    print('A')\n    x = 10 / 0\n    print('B')\nexcept ZeroDivisionError:\n    print('C')\nprint('D')",
    options: ["A\nB\nC\nD", "A\nC\nD", "A\nC", "C\nD"],
    answer: 1,
    verify: true,
    solution:
      "`A` prints, then `10 / 0` raises ZeroDivisionError. The **rest of the try suite is skipped** (so no `B`), the matching `except` prints `C`, and execution continues after the try/except group with `D`.",
  },
  {
    kind: "mcq",
    subtopic: "else/finally",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def f(m, n):\n    try:\n        r = m // n\n    except ZeroDivisionError:\n        print('zero')\n    else:\n        print(r)\n    finally:\n        print('bye')\n\nf(7, 2)\nf(7, 0)",
    options: ["3\nbye\nzero\nbye", "3\nzero\nbye", "3\nbye\nzero", "3.5\nbye\nzero\nbye"],
    answer: 0,
    verify: true,
    solution:
      "`f(7, 2)`: no error, so `else` prints `7 // 2 = 3`, then `finally` prints `bye`.\n`f(7, 0)`: ZeroDivisionError, so `except` prints `zero` (the `else` is skipped), then `finally` prints `bye` again.\n`finally` runs **every** time. `//` is floor division, so the result is 3, not 3.5.",
  },
  {
    kind: "mcq",
    subtopic: "multiple except",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "try:\n    n = int('4.5')\n    print('number', n)\nexcept TypeError:\n    print('type')\nexcept ValueError:\n    print('value')\nexcept Exception:\n    print('other')",
    options: ["number 4", "type", "value\nother", "value"],
    answer: 3,
    verify: true,
    solution:
      "`int('4.5')` raises **ValueError** (a string that is not a whole number; `int()` does not truncate strings). Python checks the `except` clauses top to bottom and runs only the **first** match, so `value` is printed and `other` is skipped even though `Exception` would also match.",
  },
  {
    kind: "mcq",
    subtopic: "multiple except",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "try:\n    print(5 / 0)\nexcept Exception:\n    print('general')\nexcept ZeroDivisionError:\n    print('zero')",
    options: ["zero", "general", "general\nzero", "ZeroDivisionError: division by zero"],
    answer: 1,
    verify: true,
    solution:
      "`Exception` matches almost every runtime error, including ZeroDivisionError. Because it is listed **first**, it handles the error and the later, more specific clause is never reached. Always put specific exceptions before general ones.",
  },
  {
    kind: "mcq",
    subtopic: "Exception as e",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "try:\n    nums = [1, 2]\n    print(nums[5])\nexcept Exception as e:\n    print('Error:', e)",
    options: [
      "Error: IndexError",
      "Error: list index out of range",
      "Error: IndexError: list index out of range",
      "Error: e",
    ],
    answer: 1,
    verify: true,
    solution:
      "`as e` binds the exception object to `e`. Printing it shows only its **message**, `list index out of range`, not the class name. To show the type as well, use `type(e).__name__`.",
  },
  {
    kind: "mcq",
    subtopic: "raise",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "def set_age(a):\n    if a < 0:\n        raise ValueError('age cannot be negative')\n    print('age set')\n    return a\n\ntry:\n    set_age(-3)\nexcept ValueError as e:\n    print(e)",
    options: ["age set", "ValueError: age cannot be negative", "age cannot be negative", "age set\nage cannot be negative"],
    answer: 2,
    verify: true,
    solution:
      "`raise` creates a ValueError with the custom message and immediately leaves the function, so `age set` is never printed. The caller's `except ValueError as e` catches it and `print(e)` shows just the message.",
  },
  {
    kind: "mcq",
    subtopic: "propagation",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "def inner():\n    print('inner start')\n    x = int('x')\n    print('inner end')\n\ndef outer():\n    print('outer start')\n    inner()\n    print('outer end')\n\ntry:\n    outer()\nexcept ValueError:\n    print('caught')\nprint('done')",
    options: [
      "outer start\ninner start\ncaught\ndone",
      "outer start\ninner start\ninner end\nouter end\ndone",
      "outer start\ninner start\ncaught\nouter end\ndone",
      "outer start\ninner start\nValueError: invalid literal for int() with base 10: 'x'",
    ],
    answer: 0,
    verify: true,
    solution:
      "The ValueError in `inner` is not handled there, so it **propagates** up: `inner` stops (no `inner end`), then `outer` stops too (no `outer end`), until the `try` in the main program catches it and prints `caught`. Execution then continues after the try/except with `done`. Control never returns into the functions after the exception.",
  },
  {
    kind: "mcq",
    subtopic: "else/finally",
    difficulty: "medium",
    prompt: "What is printed when this code runs?",
    code: "try:\n    print('start')\n    print([1, 2][2])\nexcept KeyError:\n    print('key problem')\nfinally:\n    print('cleanup')\nprint('end')",
    options: [
      "start\nkey problem\ncleanup\nend",
      "start\ncleanup\nend",
      "start\nIndexError: list index out of range",
      "start\ncleanup\nIndexError: list index out of range",
    ],
    answer: 3,
    verify: true,
    solution:
      "The error is an **IndexError**, which the `except KeyError` clause does not match. `finally` still runs (`cleanup`) on the way out, but the exception is not handled, so the program then halts with the IndexError and `end` is never printed.",
  },
  {
    kind: "mcq",
    subtopic: "else/finally",
    difficulty: "easy",
    prompt: "Which ordering of clauses in a try statement is **valid** Python?",
    options: [
      "try → except → finally → else",
      "try → else → except",
      "try → except → else → finally",
      "try → finally → except",
    ],
    answer: 2,
    solution:
      "The order must be `try`, one or more `except`, an optional `else`, then an optional `finally` last. Putting `else` after `finally`, or `except` after `else`/`finally`, is a **SyntaxError**.",
  },
  {
    kind: "mcq",
    subtopic: "else/finally",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "def f():\n    try:\n        return 'from try'\n    finally:\n        print('finally runs')\n\nprint(f())",
    options: ["from try", "finally runs\nfrom try", "from try\nfinally runs", "finally runs"],
    answer: 1,
    verify: true,
    solution:
      "The `return` value is computed, but before the function actually exits, the `finally` suite runs and prints `finally runs`. Only then does `f()` hand back `'from try'` to the outer `print`. `finally` runs even when the try suite leaves via `return`.",
  },
  {
    kind: "mcq",
    subtopic: "try/except",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "data = ['4', 'x', '0', '5']\ntotal = 0\nfor s in data:\n    try:\n        total += 20 // int(s)\n    except ValueError:\n        print('bad', s)\n    except ZeroDivisionError:\n        print('zero')\nprint(total)",
    options: ["bad x\nzero\n9", "bad x\n5", "bad x\nzero\n5", "bad x\nzero\n29"],
    answer: 0,
    verify: true,
    solution:
      "The try/except is **inside** the loop, so an error only skips the current item.\n'4': 20 // 4 = 5 → total 5. 'x': ValueError → `bad x`. '0': ZeroDivisionError → `zero`. '5': 20 // 5 = 4 → total **9**.\nIf the try were around the whole loop, it would stop at 'x' and print 5.",
  },

  // ---------------- short ----------------
  {
    kind: "short",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "Which exception (class name only) is raised by `open('missing.txt')` when the file does not exist?",
    accept: ["FileNotFoundError", "FileNotFoundError:"],
    solution: "Opening a non-existent file for reading raises **FileNotFoundError** (a subclass of `OSError`).",
  },
  {
    kind: "short",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "Which exception (class name only) is raised by `len(42)`?",
    accept: ["TypeError", "TypeError:"],
    solution: "`len()` needs a sized object such as a string or list. An `int` is the wrong **type** of argument, so Python raises **TypeError** (`object of type 'int' has no len()`).",
  },
  {
    kind: "short",
    subtopic: "common exceptions",
    difficulty: "easy",
    prompt: "Which exception (class name only) is raised by `print(score)` if no variable `score` has been assigned anywhere?",
    accept: ["NameError", "NameError:"],
    solution: "Using a name that has never been assigned (or is misspelled) raises **NameError**: `name 'score' is not defined`.",
  },
  {
    kind: "short",
    subtopic: "try/except",
    difficulty: "medium",
    prompt: "What number is printed?",
    code: "count = 0\nfor v in ['7', 'seven', '7.0', ' 70 ']:\n    try:\n        int(v)\n        count += 1\n    except ValueError:\n        pass\nprint(count)",
    accept: ["2"],
    verify: true,
    solution:
      "`int('7')` works. `'seven'` and `'7.0'` raise ValueError (`int()` does not accept decimal points in strings). `int(' 70 ')` works because surrounding whitespace is ignored. So **2** conversions succeed.",
  },
  {
    kind: "short",
    subtopic: "else/finally",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "for d in [2, 0]:\n    try:\n        r = 10 / d\n    except ZeroDivisionError:\n        print('E', end='')\n    else:\n        print('S', end='')\n    finally:\n        print('F', end='')\nprint()",
    accept: ["SFEF"],
    verify: true,
    solution:
      "d = 2: no error → `else` prints S, `finally` prints F.\nd = 0: ZeroDivisionError → `except` prints E, `finally` prints F.\nResult: **SFEF**. `else` only runs when the try suite finished without an exception; `finally` always runs.",
  },
  {
    kind: "short",
    subtopic: "Exception as e",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "stock = {'apple': 3}\ntry:\n    print(stock['pear'])\nexcept KeyError as e:\n    print('Missing:', e)",
    accept: ["Missing: 'pear'"],
    verify: true,
    solution:
      "A KeyError's message is the **repr** of the missing key, so printing `e` shows it with quotes: **Missing: 'pear'**. (Other exceptions such as ValueError print a plain message.)",
  },
  {
    kind: "short",
    subtopic: "raise",
    difficulty: "medium",
    prompt: "What is printed? Give every line, including the last line of any error message.",
    code: "def withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError('insufficient funds')\n    return balance - amount\n\nprint(withdraw(100, 30))\nprint(withdraw(50, 80))\nprint('end')",
    accept: ["70\nValueError: insufficient funds"],
    verify: true,
    solution:
      "The first call returns 70. The second call raises ValueError with the custom message; nothing catches it, so the program halts and `end` is never printed. The last line of the traceback is **ValueError: insufficient funds**.",
  },
  {
    kind: "short",
    subtopic: "input validation",
    difficulty: "hard",
    prompt:
      "This loop simulates re-prompting a user: `responses` stands in for three successive `input()` calls. What is printed? Give every line.",
    code: "responses = ['abc', '-5', '12']\ni = 0\nwhile True:\n    s = responses[i]\n    i += 1\n    try:\n        n = int(s)\n        if n < 0:\n            raise ValueError('must not be negative')\n        break\n    except ValueError as e:\n        print('Retry:', e)\nprint(n, i)",
    accept: ["Retry: invalid literal for int() with base 10: 'abc'\nRetry: must not be negative\n12 3"],
    verify: true,
    solution:
      "'abc': `int()` raises ValueError, so its message is printed.\n'-5': converts fine, but our own `raise` sends control to the same `except`, printing the custom message.\n'12': valid, `break` leaves the loop. `n` is 12 and 3 responses were used: **12 3**.\nThe pattern `while True` + `try` + `break` on success is the standard way to keep asking until the input is valid.",
  },

  // ---------------- open ----------------
  {
    kind: "open",
    subtopic: "syntax vs runtime",
    difficulty: "easy",
    prompt:
      "Explain the difference between a **syntax error** and an **exception** (runtime error) in Python. Give one example of each, and say which of the two can be handled with `try`/`except`.",
    modelAnswer:
      "A syntax error means the code breaks Python's grammar, so the interpreter cannot parse it and **no** part of the program runs, e.g. `if x > 3` (missing colon) or `print('hi'` (missing bracket).\nAn exception happens while a syntactically valid program is running, when an operation cannot be carried out, e.g. `10 / 0` raises ZeroDivisionError or `int('abc')` raises ValueError. Statements before it have already run.\nOnly exceptions can be caught with `try`/`except`; a syntax error must be fixed in the code.",
    rubric: [
      { point: "Syntax error: code violates the language rules and is detected before the program runs", marks: 1 },
      { point: "Exception: error detected during execution of valid code", marks: 1 },
      { point: "A correct example of each", marks: 1 },
      { point: "Only exceptions can be handled by try/except", marks: 1 },
    ],
    solution: "Key idea: syntax errors are found when Python **reads** the program; exceptions occur when it **runs** a particular line.",
  },
  {
    kind: "open",
    subtopic: "input validation",
    difficulty: "medium",
    prompt:
      "The program below crashes if the user types a non-number or a divisor of 0. Rewrite it so that it **keeps asking** for both numbers until a division succeeds, printing a suitable message for each kind of error.",
    code: "dividend = float(input('dividend: '))\ndivisor = float(input('divisor: '))\nprint('result =', dividend / divisor)",
    modelAnswer:
      "```\nwhile True:\n    try:\n        dividend = float(input('dividend: '))\n        divisor = float(input('divisor: '))\n        result = dividend / divisor\n    except ValueError:\n        print(\"Couldn't convert to a float, try again\")\n    except ZeroDivisionError:\n        print('Cannot divide by 0, try again')\n    else:\n        print('result =', result)\n        break\n```",
    rubric: [
      { point: "Loop that repeats until valid input (e.g. `while True` with `break`, or a flag)", marks: 1 },
      { point: "Input conversion and division inside a `try` suite", marks: 1 },
      { point: "Separate `except ValueError` and `except ZeroDivisionError` with suitable messages", marks: 1 },
      { point: "Result printed and loop exited only on success (in `else` or after the risky lines)", marks: 1 },
    ],
    solution:
      "Avoid a bare `except:` here: it would also hide typing mistakes in your own code. Placing `break` after the division inside `try` is also acceptable, since it is only reached if no exception occurred.",
  },
  {
    kind: "open",
    subtopic: "else/finally",
    difficulty: "medium",
    prompt:
      "Describe when each part of a `try` / `except` / `else` / `finally` statement is executed. Give a realistic reason for putting code in `finally` rather than after the whole statement.",
    modelAnswer:
      "- `try`: always runs first, until it finishes or an exception is raised (the remaining lines of the try suite are then skipped).\n- `except X`: runs only if an exception of type X (or a subclass) was raised in the try suite; only the first matching clause runs.\n- `else`: runs only if the try suite completed **without** an exception.\n- `finally`: runs last in **every** case: no error, handled error, unhandled error, or even a `return`/`break` inside try.\nReason: clean-up that must happen no matter what, e.g. closing a file or network connection, or printing a 'Goodbye' message. Code placed after the statement would be skipped if the exception were not caught or if the try suite returned.",
    rubric: [
      { point: "try runs first; remaining try lines skipped once an exception occurs", marks: 1 },
      { point: "except runs only on a matching exception (first match only)", marks: 1 },
      { point: "else runs only when no exception occurred", marks: 1 },
      { point: "finally always runs, with a valid clean-up example and why code after the statement is not equivalent", marks: 2 },
    ],
    solution: "Remember the fixed order: try → except(s) → else → finally. Any other order is a SyntaxError.",
  },
  {
    kind: "open",
    subtopic: "raise",
    difficulty: "hard",
    prompt:
      "Write a function `average_score(items)` that takes a list of strings such as `['80', 'abc', '95', '']`. It should convert each string to an `int`, **skip** any that cannot be converted, and return the average of the valid scores. If there are no valid scores, it must `raise` a `ValueError` with the message `'no valid scores'`. Then write calling code that prints the average, or prints the error message if the exception is raised.",
    modelAnswer:
      "```\ndef average_score(items):\n    scores = []\n    for s in items:\n        try:\n            scores.append(int(s))\n        except ValueError:\n            pass          # skip invalid entries\n    if not scores:\n        raise ValueError('no valid scores')\n    return sum(scores) / len(scores)\n\ntry:\n    print(average_score(['80', 'abc', '95', '']))   # 87.5\n    print(average_score(['x', 'y']))\nexcept ValueError as e:\n    print('Error:', e)                                # Error: no valid scores\n```",
    rubric: [
      { point: "try/except ValueError inside the loop so one bad item does not stop the rest", marks: 1 },
      { point: "Correct average of the valid scores only", marks: 1 },
      { point: "`raise ValueError('no valid scores')` when the list of valid scores is empty (avoids ZeroDivisionError)", marks: 1 },
      { point: "Caller wraps the call in try/except ValueError as e and prints the message", marks: 1 },
    ],
    solution:
      "The `raise` turns a situation that would otherwise produce a confusing ZeroDivisionError into a clear, documented error, and lets the **caller** decide how to handle it. The exception propagates out of the function to the nearest matching `except`.",
  },
];
