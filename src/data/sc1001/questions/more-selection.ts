import type { ScDraft } from "@/lib/sc1001/types";

export const moreSelection: ScDraft[] = [
  // ---------------- MCQ ----------------
  {
    kind: "mcq",
    subtopic: "if-elif-else order",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "score = 85\nif score >= 50:\n    print('Pass')\nelif score >= 80:\n    print('Distinction')\nelse:\n    print('Fail')",
    options: ["Distinction", "Pass\nDistinction", "Pass", "Fail"],
    answer: 2,
    verify: true,
    solution:
      "An `if-elif-else` chain runs **only the first** branch whose condition is True. `85 >= 50` is True, so `Pass` is printed and the remaining branches are skipped, even though `85 >= 80` is also True. To reach `Distinction`, the stricter test (`>= 80`) must come first.",
  },
  {
    kind: "mcq",
    subtopic: "if-elif-else order",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "mark = 95\nif 90 <= mark <= 100:\n    print('A')\nif 80 <= mark < 90:\n    print('B')\nif 70 <= mark < 80:\n    print('C')\nelse:\n    print('F')",
    options: ["A", "A\nF", "F", "A\nC\nF"],
    answer: 1,
    verify: true,
    solution:
      "These are **three separate** `if` statements, not one chain. The first prints `A`. The `else` belongs only to the last `if 70 <= mark < 80`, which is False for 95, so `F` is printed as well. Using `elif` for the 2nd and 3rd tests would print only `A`.",
  },
  {
    kind: "mcq",
    subtopic: "short-circuit",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "x = 0\nif x != 0 and 10 / x > 1:\n    print('big')\nelse:\n    print('small')",
    options: ["big", "ZeroDivisionError: division by zero", "big\nsmall", "small"],
    answer: 3,
    verify: true,
    solution:
      "`and` uses **short-circuit evaluation**: `x != 0` is False, so the whole condition is already False and `10 / x` is never evaluated. No division by zero happens and the `else` branch prints `small`.",
  },
  {
    kind: "mcq",
    subtopic: "short-circuit",
    difficulty: "medium",
    prompt: "The two tests from a safe division check have been swapped. What happens when this runs?",
    code: "x = 0\nif 10 / x > 1 and x != 0:\n    print('big')\nelse:\n    print('small')",
    options: ["ZeroDivisionError: division by zero", "small", "big", "Nothing is printed"],
    answer: 0,
    verify: true,
    solution:
      "Operands of `and` are evaluated **left to right**. Now `10 / x` is evaluated first with `x = 0`, which raises `ZeroDivisionError` before `x != 0` is ever checked. The guard condition must come **before** the risky one.",
  },
  {
    kind: "mcq",
    subtopic: "conditional expression",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "n = 7\nlabel = 'even' if n % 2 == 0 else 'odd'\nprint(label)",
    options: ["even", "odd", "True", "False"],
    answer: 1,
    verify: true,
    solution:
      "`a if cond else b` evaluates to `a` when `cond` is True, otherwise `b`. `7 % 2 == 0` is False, so `label` is `'odd'`. The expression yields one of the two values, not a Boolean.",
  },
  {
    kind: "mcq",
    subtopic: "conditional expression",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "a, b = 4, 9\nprint(a if a > b else b if b % 2 == 0 else -b)",
    options: ["9", "4", "-9", "-4"],
    answer: 2,
    verify: true,
    solution:
      "Chained conditional expressions group to the right: `a if a > b else (b if b % 2 == 0 else -b)`. `4 > 9` is False, so the inner expression is used. `9 % 2 == 0` is False, so the result is `-b` = **-9**.",
  },
  {
    kind: "mcq",
    subtopic: "membership in",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "ch = 'E'\nif ch in 'aeiou':\n    print('vowel')\nelse:\n    print('consonant')",
    options: ["consonant", "vowel", "True", "vowel\nconsonant"],
    answer: 0,
    verify: true,
    solution:
      "`in` checks whether `'E'` occurs as a substring of `'aeiou'`. String comparison is **case-sensitive**, and uppercase `'E'` is not in the lowercase string, so the `else` branch prints `consonant`. A fix is `ch.lower() in 'aeiou'`.",
  },
  {
    kind: "mcq",
    subtopic: "combining conditions",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "x = 5\nif x == 1 or 2:\n    print('one or two')\nelse:\n    print('something else')",
    options: ["something else", "False", "one or two\nsomething else", "one or two"],
    answer: 3,
    verify: true,
    solution:
      "The condition is parsed as `(x == 1) or 2`, not `x == (1 or 2)`. `x == 1` is False, so `or` returns `2`, which is truthy (any non-zero number counts as True). The `if` branch runs. The intended test is `x == 1 or x == 2` or `x in (1, 2)`.",
  },
  {
    kind: "mcq",
    subtopic: "nested if",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "a, b, c = 4, 9, 7\nif a >= b:\n    if a >= c:\n        print('max is', a)\n    else:\n        print('max is', c)\nelse:\n    if b >= c:\n        print('max is', b)\n    else:\n        print('max is', c)",
    options: ["max is 7", "max is 9", "max is 4", "max is 9\nmax is 7"],
    answer: 1,
    verify: true,
    solution:
      "`4 >= 9` is False, so control goes to the outer `else`. There, `9 >= 7` is True, so `max is 9` is printed. Only one leaf of the nested structure ever runs.",
  },
  {
    kind: "mcq",
    subtopic: "nested if",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "x = 5\nif x > 10:\n    if x > 20:\n        print('A')\nelse:\n    print('B')\nprint('C')",
    options: ["C", "A\nC", "B\nC", "B"],
    answer: 2,
    verify: true,
    solution:
      "In Python, **indentation decides** which `if` an `else` belongs to. This `else` is level with `if x > 10`, so it pairs with the outer test. `5 > 10` is False, so `B` is printed, then `C` (which is outside both `if`s) always runs.",
  },
  {
    kind: "mcq",
    subtopic: "classification logic",
    difficulty: "hard",
    prompt:
      "A student wrote this leap-year checker. (Rule: a year is a leap year if it is divisible by 4, **except** century years, which must also be divisible by 400.) What does it print for 1900?",
    code: "year = 1900\nif year % 4 == 0:\n    print('leap')\nelif year % 100 == 0:\n    print('not leap')\nelif year % 400 == 0:\n    print('leap')\nelse:\n    print('not leap')",
    options: ["leap", "not leap", "leap\nnot leap", "Nothing is printed"],
    answer: 0,
    verify: true,
    solution:
      "1900 is divisible by 4, so the **first** branch fires and prints `leap`; the century check is never reached. That output is wrong, because 1900 is not a leap year. When conditions overlap, test the most specific case first: `% 400`, then `% 100`, then `% 4`.",
  },
  {
    kind: "mcq",
    subtopic: "classification logic",
    difficulty: "medium",
    prompt: "What is printed by the following BMI classifier?",
    code: "weight = 95\nheight = 1.75\nbmi = weight / height ** 2\nif bmi < 18.5:\n    print('Underweight')\nelif bmi >= 18.5:\n    print('Normal')\nelif bmi >= 25:\n    print('Overweight')\nelse:\n    print('Obese')",
    options: ["Obese", "Normal", "Overweight", "Normal\nOverweight"],
    answer: 1,
    verify: true,
    solution:
      "bmi = 95 / 3.0625 ≈ 31.0. It is not `< 18.5`, but it **is** `>= 18.5`, so `Normal` is printed and the chain stops. The later branches can never run, because every value reaching them has already matched one of the first two. Each `elif` should test an upper bound, e.g. `elif bmi < 25:`.",
  },
  {
    kind: "mcq",
    subtopic: "match-case",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "day = 3\nmatch day:\n    case 1:\n        print('Monday')\n    case 2 | 3 | 4:\n        print('Midweek')\n    case _:\n        print('Other')",
    options: ["Monday", "Other", "Midweek\nOther", "Midweek"],
    answer: 3,
    verify: true,
    solution:
      "`case 2 | 3 | 4` matches if `day` equals any of those values, so `Midweek` is printed. `match` runs **only the first** matching case. The wildcard `case _` is a catch-all used only when nothing above matched.",
  },
  {
    kind: "mcq",
    subtopic: "match-case",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "cmd = 'stop'\nmatch cmd:\n    case 'go':\n        print('Going')\n    case 'stop':\n        print('Stopping')\n    case 'pause':\n        print('Pausing')\n    case _:\n        print('Unknown')\nprint('Done')",
    options: ["Stopping", "Stopping\nPausing\nUnknown\nDone", "Stopping\nDone", "Unknown\nDone"],
    answer: 2,
    verify: true,
    solution:
      "Python's `match` has **no fall-through** (unlike `switch` in C/Java). After `case 'stop'` runs, the statement ends, and the next line `print('Done')` runs. No `break` is needed.",
  },
  {
    kind: "mcq",
    subtopic: "combining conditions",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "a = True\nb = False\nif not a or b:\n    print('X')\nelif a and not b:\n    print('Y')\nelse:\n    print('Z')",
    options: ["Y", "X", "Z", "X\nY"],
    answer: 0,
    verify: true,
    solution:
      "`not` binds tighter than `or`: `(not a) or b` = `False or False` = False. Next, `a and (not b)` = `True and True` = True, so `Y` is printed.",
  },
  {
    kind: "mcq",
    subtopic: "combining conditions",
    difficulty: "easy",
    prompt: "Which condition is True **exactly** when the integer `x` is between 1 and 10 inclusive?",
    options: ["x >= 1 or x <= 10", "x in range(1, 10)", "1 <= x and <= 10", "1 <= x <= 10"],
    answer: 3,
    solution:
      "`1 <= x <= 10` is a chained comparison meaning `1 <= x and x <= 10`. Using `or` is True for **every** number. `range(1, 10)` stops at 9, so 10 is excluded. `1 <= x and <= 10` is a syntax error because `<= 10` has no left operand.",
  },
  {
    kind: "mcq",
    subtopic: "truthiness",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "s = ''\nif s:\n    print('has text')\nelse:\n    print('empty')",
    options: ["has text", "empty", "False", "Nothing is printed"],
    answer: 1,
    verify: true,
    solution:
      "A condition does not have to be a Boolean. Empty strings, `0`, `0.0`, empty lists and `None` count as **False**; everything else counts as True. `''` is empty, so the `else` branch runs.",
  },

  // ---------------- short ----------------
  {
    kind: "short",
    subtopic: "nested if",
    difficulty: "medium",
    prompt: "Look carefully at the indentation of the `else`. What is printed by the following code?",
    code: "x = 5\nif x > 10:\n    if x > 20:\n        print('A')\n    else:\n        print('B')\nprint('C')",
    accept: ["C"],
    verify: true,
    solution:
      "Here the `else` is indented to line up with `if x > 20`, so it belongs to the **inner** `if`. Because `5 > 10` is False, the whole inner block (including that `else`) is skipped. Only `C` is printed. This is the Python version of the 'dangling else' problem: indentation decides which `if` owns the `else`.",
  },
  {
    kind: "short",
    subtopic: "short-circuit",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "name = ''\ndisplay = name or 'Guest'\nprint(display)",
    accept: ["Guest"],
    verify: true,
    solution:
      "`or` returns its **first truthy operand** (or the last operand if none is truthy). `''` is falsy, so the result is `'Guest'`. This is a common idiom for providing a default value.",
  },
  {
    kind: "short",
    subtopic: "classification logic",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "year = 1900\nif year % 400 == 0:\n    print('leap')\nelif year % 100 == 0:\n    print('not leap')\nelif year % 4 == 0:\n    print('leap')\nelse:\n    print('not leap')",
    accept: ["not leap"],
    verify: true,
    solution:
      "`1900 % 400` is 300 (not 0), so the first test fails. `1900 % 100 == 0` is True, so `not leap` is printed. Because the most specific test comes first, this version handles century years correctly.",
  },
  {
    kind: "short",
    subtopic: "match-case",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "status = 404\nmatch status:\n    case 200:\n        print('OK')\n    case 500:\n        print('Server error')\nprint('end')",
    accept: ["end"],
    verify: true,
    solution:
      "No case matches 404 and there is no wildcard `case _`, so the `match` does nothing. That is not an error. Only the following `print('end')` produces output.",
  },
  {
    kind: "short",
    subtopic: "if-elif-else order",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "mark = 79.5\nif mark >= 80:\n    grade = 'A'\nelif mark >= 70:\n    grade = 'B'\nelif mark >= 60:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint('Grade:', grade)",
    accept: ["Grade: B"],
    verify: true,
    solution:
      "`79.5 >= 80` is False and `79.5 >= 70` is True, so `grade = 'B'`. `print` puts a space between its two arguments, giving `Grade: B`.",
  },
  {
    kind: "short",
    subtopic: "nested if",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "a, b, c = 3, 3, 5\nif a == b:\n    if b == c:\n        print('all equal')\n    else:\n        print('two equal')\nelif a == c or b == c:\n    print('two equal')\nelse:\n    print('all different')",
    accept: ["two equal"],
    verify: true,
    solution:
      "`a == b` (3 == 3) is True, so we enter the outer block. Inside, `b == c` (3 == 5) is False, so the inner `else` prints `two equal`. The `elif` and outer `else` are skipped.",
  },
  {
    kind: "short",
    subtopic: "short-circuit",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "x = 4\nresult = x > 5 and x / 0 > 1\nprint(result)",
    accept: ["False"],
    verify: true,
    solution:
      "`x > 5` is False, so `and` stops immediately and returns that False. `x / 0` is never evaluated, so there is no `ZeroDivisionError`.",
  },
  {
    kind: "short",
    subtopic: "short-circuit",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "x = 0\ny = x and 10 / x\nprint(y)",
    accept: ["0"],
    verify: true,
    solution:
      "`and` returns its **first falsy operand** (or the last operand if all are truthy). `x` is `0`, which is falsy, so `y` becomes `0` itself, not `False`, and `10 / x` is never run. So `0` is printed.",
  },

  // ---------------- open ----------------
  {
    kind: "open",
    subtopic: "if-elif-else order",
    difficulty: "easy",
    prompt:
      "A courier charges $5 for parcels up to 1 kg, $8 up to 5 kg, $12 up to 10 kg, and $20 above 10 kg. The code below prints `12` for a 3 kg parcel instead of `8`. Explain why, then rewrite it so it is correct.",
    code: "weight = 3\nif weight <= 1:\n    fee = 5\nif weight <= 5:\n    fee = 8\nif weight <= 10:\n    fee = 12\nelse:\n    fee = 20\nprint(fee)",
    modelAnswer:
      "The three `if` statements are independent, so **every** one is tested. For 3 kg, `weight <= 5` sets fee to 8, then `weight <= 10` is also True and overwrites fee with 12. The `else` belongs only to the last `if`.\n\nCorrect version, using one `if-elif-else` chain so that only the first matching branch runs:\n```\nweight = 3\nif weight <= 1:\n    fee = 5\nelif weight <= 5:\n    fee = 8\nelif weight <= 10:\n    fee = 12\nelse:\n    fee = 20\nprint(fee)\n```",
    rubric: [
      { point: "Explains that separate ifs are all evaluated, so a later true condition overwrites fee", marks: 1 },
      { point: "Notes the else only pairs with the last if", marks: 1 },
      { point: "Rewrites as a single if-elif-else chain with conditions in the right order", marks: 2 },
    ],
    solution:
      "Separate `if`s are not mutually exclusive. When ranges overlap (every value ≤ 5 is also ≤ 10), you need an `elif` chain, tested from the smallest bound upward.",
  },
  {
    kind: "open",
    subtopic: "classification logic",
    difficulty: "medium",
    prompt:
      "A year is a leap year if it is divisible by 4 but not by 100, **or** if it is divisible by 400. Assuming `year` already holds an integer, write Python code that prints `Leap` or `Not leap` using a **single** `if-else` whose condition combines `and`/`or`/`not`. State what your code prints for 1900, 2000 and 2024.",
    modelAnswer:
      "```\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print('Leap')\nelse:\n    print('Not leap')\n```\n1900 → Not leap (divisible by 100 but not 400); 2000 → Leap (divisible by 400); 2024 → Leap (divisible by 4, not by 100).",
    rubric: [
      { point: "Correct divisibility tests using %", marks: 1 },
      { point: "Correctly combines with and/or (parentheses or equivalent precedence)", marks: 2 },
      { point: "Correct outputs for 1900, 2000 and 2024", marks: 1 },
    ],
    solution:
      "`and` binds tighter than `or`, so the parentheses are optional but make the intent clear. A common error is writing `year % 4 == 0 or year % 100 != 0`, which wrongly accepts 1900.",
  },
  {
    kind: "open",
    subtopic: "short-circuit",
    difficulty: "medium",
    prompt:
      "Explain **short-circuit evaluation** for `and` and `or` in Python. Use it to explain why `if x != 0 and 10 / x > 1:` is safe when `x` is 0, but `if 10 / x > 1 and x != 0:` is not.",
    modelAnswer:
      "Python evaluates `and`/`or` left to right and stops as soon as the result is known.\n- `A and B`: if `A` is False the result must be False, so `B` is **not evaluated**.\n- `A or B`: if `A` is True the result must be True, so `B` is **not evaluated**.\nIn `x != 0 and 10 / x > 1` with x = 0, `x != 0` is False, so the division is skipped and the condition is simply False. In `10 / x > 1 and x != 0`, the division is evaluated first and raises `ZeroDivisionError` before the guard is checked. So the guard must come first.",
    rubric: [
      { point: "Correct description of short-circuit for and", marks: 1 },
      { point: "Correct description of short-circuit for or", marks: 1 },
      { point: "Explains the first version skips the division when x is 0", marks: 1 },
      { point: "Explains the second version evaluates 10 / x first and raises ZeroDivisionError", marks: 1 },
    ],
    solution: "Key idea: **left-to-right, stop early**. Put cheap or protective checks (guards) before conditions that could crash.",
  },
  {
    kind: "open",
    subtopic: "nested if",
    difficulty: "hard",
    prompt:
      "A cinema prices tickets by age: under 12 pay $5, 12 to 64 pay $10, and 65 or older pay $6. Students aged 12 to 64 get $2 off. Assuming `age` (int) and `is_student` (bool) are already set, write code that sets `price` and prints it. Use a nested `if` for the student discount. Then give the price for (age 20, student), (age 70, student) and (age 8, not student).",
    modelAnswer:
      "```\nif age < 12:\n    price = 5\nelif age < 65:\n    if is_student:\n        price = 10 - 2\n    else:\n        price = 10\nelse:\n    price = 6\nprint(price)\n```\n(20, student) → 8; (70, student) → 6, because the discount applies only to ages 12 to 64; (8, not student) → 5.",
    rubric: [
      { point: "Correct age ranges with if-elif-else (boundaries 12 and 65 handled correctly)", marks: 2 },
      { point: "Student discount nested only inside the 12–64 branch", marks: 1 },
      { point: "Correct prices for the three test cases", marks: 1 },
    ],
    solution:
      "Because the chain is ordered, `elif age < 65` already implies `age >= 12`, so there is no need to retest it. Putting the student check at the top level would wrongly discount seniors and children.",
  },
];
