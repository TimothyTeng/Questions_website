import type { ScDraft } from "@/lib/sc1001/types";

export const strings: ScDraft[] = [
  // ---------------- MCQ ----------------
  {
    kind: "mcq",
    subtopic: "indexing & slicing",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "s = 'Computing'\nprint(s[2], s[-2])",
    options: ["o n", "m i", "m n", "p g"],
    answer: 2,
    verify: true,
    solution:
      "Positive indices count from 0 on the left: C(0) o(1) **m(2)**. Negative indices count from -1 on the right: g(-1) **n(-2)**. So the output is `m n`. `o` comes from treating the first character as index 1; `i` comes from treating `-2` as two places before the last character (that would be `-3`).",
  },
  {
    kind: "mcq",
    subtopic: "indexing & slicing",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "s = 'Hello World'\nprint(s[3:8])",
    options: ["lo Wo", "lo W", "llo Wo", "lo Wor"],
    answer: 0,
    verify: true,
    solution:
      "A slice `[start:finish]` includes `start` but stops **before** `finish`, so it takes indices 3, 4, 5, 6, 7: `l`, `o`, space, `W`, `o` → `lo Wo`. `lo Wor` wrongly includes index 8; `llo Wo` starts at index 2.",
  },
  {
    kind: "mcq",
    subtopic: "indexing & slicing",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = 'abcdefghij'\nprint(s[1:8:3])",
    options: ["bdfh", "cfi", "be", "beh"],
    answer: 3,
    verify: true,
    solution:
      "Start at index 1 and jump 3 each time while the index is below 8: 1, 4, 7 → `b`, `e`, `h`. `bdfh` uses a step of 2, `cfi` starts at index 2, and `be` forgets that index 7 is still before the stop value 8.",
  },
  {
    kind: "mcq",
    subtopic: "indexing & slicing",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = 'PYTHON'\nprint(s[4:1:-1])",
    options: ["THO", "OHT", "OHTY", "NOHT"],
    answer: 1,
    verify: true,
    solution:
      "With a negative step the slice walks **right to left**: it starts at index 4 (`O`) and goes 4, 3, 2, stopping before index 1. That gives `O`, `H`, `T` → `OHT`. `OHTY` wrongly includes the stop index 1; `THO` is the forward slice `s[2:5]`.",
  },
  {
    kind: "mcq",
    subtopic: "indexing & slicing",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "s = 'racecars'\nprint('[' + s[1:5:-1] + ']')\nprint('[' + s[5:1:-1] + ']')",
    options: ["[ceca]\n[acec]", "[]\n[acec]", "[]\n[ceca]", "[acec]\n[]"],
    answer: 1,
    verify: true,
    solution:
      "With step `-1` the slice moves leftwards, so the start must be to the **right** of the stop. `s[1:5:-1]` starts at 1 and can never move left towards 5, so it is the empty string `''`. `s[5:1:-1]` takes indices 5, 4, 3, 2 → `a`, `c`, `e`, `c` → `acec`. A common mistake is to think `s[1:5:-1]` means \"`s[1:5]` reversed\" (`ceca`).",
  },
  {
    kind: "mcq",
    subtopic: "immutability",
    difficulty: "easy",
    prompt: "What happens when this code runs?",
    code: "word = 'code'\nword[0] = 'C'\nprint(word)",
    options: ["Code", "code", "TypeError: 'str' object does not support item assignment", "Ccode"],
    answer: 2,
    verify: true,
    solution:
      "Strings are **immutable**: you can read `word[0]` but you cannot assign to it, so Python raises `TypeError` before `print` runs. To get `Code` you must build a new string, e.g. `word = 'C' + word[1:]` or `word.capitalize()`.",
  },
  {
    kind: "mcq",
    subtopic: "string methods",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "text = 'banana'\nprint(text.find('an'), text.find('an', 2), text.find('x'))",
    options: ["1 1 -1", "2 4 -1", "1 3 0", "1 3 -1"],
    answer: 3,
    verify: true,
    solution:
      "`find` returns the index of the **first** match. `'an'` first appears at index 1. With a start argument of 2, the search begins at index 2, so the next `'an'` is at index 3. A substring that is not present gives **-1** (not 0, which is a valid index).",
  },
  {
    kind: "mcq",
    subtopic: "string methods",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = 'hello'\nprint(s.find('z'))\nprint(s.index('z'))",
    options: ["-1\n-1", "-1\nValueError: substring not found", "ValueError: substring not found", "0\n-1"],
    answer: 1,
    verify: true,
    solution:
      "`find` and `index` both locate a substring, but they differ when it is **missing**: `find` returns `-1`, while `index` raises `ValueError: substring not found`. The first `print` therefore succeeds and shows `-1` before the error on the second line.",
  },
  {
    kind: "mcq",
    subtopic: "string methods",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "s = 'hello wORLD'\nprint(s.capitalize())\nprint(s.title())",
    options: ["Hello wORLD\nHello WORLD", "Hello world\nHello world", "Hello world\nHello World", "HELLO WORLD\nHello World"],
    answer: 2,
    verify: true,
    solution:
      "`capitalize()` makes the first character upper case and **all the rest lower case** → `Hello world`. `title()` makes the first letter of **each word** upper case and the rest lower → `Hello World`. Neither keeps the original `wORLD` casing.",
  },
  {
    kind: "mcq",
    subtopic: "string methods",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = 'red,green,,blue'\nparts = s.split(',')\nprint(len(parts), '-'.join(parts))",
    options: ["3 red-green-blue", "4 red-green-blue", "3 red-green--blue", "4 red-green--blue"],
    answer: 3,
    verify: true,
    solution:
      "Splitting on an explicit separator keeps empty pieces: the two adjacent commas produce an empty string, so `parts` is `['red', 'green', '', 'blue']` (length **4**). Joining with `'-'` puts a dash between every pair, including around the empty string → `red-green--blue`. (Only `split()` with no argument discards empty pieces.)",
  },
  {
    kind: "mcq",
    subtopic: "string methods",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "str1 = 'ab'\nstr2 = '12'\nprint(str2.join(str1), str1.join(str2))",
    options: ["a12b 1ab2", "1ab2 a12b", "ab12 12ab", "a1b2 1a2b"],
    answer: 0,
    verify: true,
    solution:
      "`base.join(target)` puts `base` **between** the characters of `target`. `str2.join(str1)` inserts `'12'` between `a` and `b` → `a12b`. `str1.join(str2)` inserts `'ab'` between `1` and `2` → `1ab2`. `join` is not concatenation (`ab12`) and not interleaving (`a1b2`).",
  },
  {
    kind: "mcq",
    subtopic: "ord/chr & comparison",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "print(chr(ord('a') + 3), ord('B') - ord('A'))",
    options: ["c 1", "d 1", "D 1", "d 66"],
    answer: 1,
    verify: true,
    solution:
      "`ord('a')` is 97; adding 3 gives 100 and `chr(100)` is `'d'` (a → b → c → d). Letters are consecutive codes, so `ord('B') - ord('A')` is 66 - 65 = **1**. `c` comes from counting `a` as the first step; `D` confuses lower- and upper-case codes.",
  },
  {
    kind: "mcq",
    subtopic: "ord/chr & comparison",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "print('apple' < 'Banana', 'Zoo' < 'apple', '10' < '9')",
    options: ["True False False", "True True False", "False True False", "False True True"],
    answer: 3,
    verify: true,
    solution:
      "Strings are compared character by character using their codes. All upper-case letters (65-90) come **before** all lower-case letters (97-122), so `'a' < 'B'` is False and `'Z' < 'a'` is True. `'10' < '9'` compares `'1'` with `'9'` first, and `'1'` is smaller, so it is True even though 10 > 9 as numbers.",
  },
  {
    kind: "mcq",
    subtopic: "string methods",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = '  banana split  '\nt = s.strip().replace('a', 'o', 2)\nprint(t, s.count('a'), t.count('a'))",
    options: ["bonona split 3 1", "bonona split 1 1", "bonono split 3 0", "bonona split 3 3"],
    answer: 0,
    verify: true,
    solution:
      "`strip()` removes the outer spaces and `replace('a', 'o', 2)` changes only the **first two** `a`s → `bonona split`. These methods return a **new** string; `s` itself is unchanged and still contains three `a`s, while `t` has one left. `bonono` ignores the count argument; `1 1` assumes `s` was modified.",
  },
  {
    kind: "mcq",
    subtopic: "string processing",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "s = 'Programming'\nresult = ''\nfor ch in s:\n    if ch not in result:\n        result = ch + result\nprint(result)",
    options: ["Progamin", "gnimmargorP", "nimagorP", "nigmaorP"],
    answer: 2,
    verify: true,
    solution:
      "Each character is added only the first time it is seen, and it is put at the **front** (`ch + result`). First-seen order is P r o g a m i n (the repeated r, m, g are skipped), so the result is that sequence reversed: `nimagorP`. `Progamin` would be produced by `result + ch`; `gnimmargorP` is `s[::-1]` without removing duplicates.",
  },
  {
    kind: "mcq",
    subtopic: "string processing",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = 'R2-D2 & C3PO'\nletters = 0\ndigits = 0\nfor ch in s:\n    if ch.isdigit():\n        digits += 1\n    elif ch.isalpha():\n        letters += 1\nprint(letters, digits)",
    options: ["5 3", "3 5", "6 3", "5 4"],
    answer: 0,
    verify: true,
    solution:
      "Letters: R, D, C, P, O → **5**. Digits: 2, 2, 3 → **3**. The `-`, `&` and spaces are neither letters nor digits, so they are not counted. Note the `O` in `C3PO` is the letter O, not the digit 0.",
  },
  {
    kind: "mcq",
    subtopic: "f-strings & escapes",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "name = 'ann'\nscore = 87.456\nprint(f'{name.upper()} scored {score:.1f}%')",
    options: ["ANN scored 87.4%", "ann scored 87.5%", "ANN scored 87.456%", "ANN scored 87.5%"],
    answer: 3,
    verify: true,
    solution:
      "Inside an f-string, `{...}` is evaluated: `name.upper()` gives `ANN`, and the format spec `:.1f` rounds to one decimal place → `87.5` (87.456 rounds up, it is not truncated to 87.4). The `%` after the braces is just a literal character.",
  },

  // ---------------- short ----------------
  {
    kind: "short",
    subtopic: "string operators",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "print('ab' * 3 + 'c')",
    accept: ["abababc"],
    verify: true,
    solution: "`*` binds tighter than `+`, so `'ab' * 3` is evaluated first → `ababab`, then `'c'` is concatenated → `abababc`.",
  },
  {
    kind: "short",
    subtopic: "f-strings & escapes",
    difficulty: "easy",
    prompt: "What number is printed by the following code?",
    code: "s = 'a\\nb\\\\c'\nprint(len(s))",
    accept: ["5"],
    verify: true,
    solution:
      "Each escape sequence is a **single** character: `\\n` is one newline character and `\\\\` is one backslash. The string holds `a`, newline, `b`, backslash, `c` → length **5** (not 7, which counts the backslashes in the source code).",
  },
  {
    kind: "short",
    subtopic: "indexing & slicing",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "s = 'Hello World'\nprint(s[-5:] + s[:-6])",
    accept: ["WorldHello"],
    verify: true,
    solution:
      "`s[-5:]` takes the last five characters → `World`. `s[:-6]` stops before index -6 (the space at index 5), giving indices 0-4 → `Hello`. Concatenation adds no space: `WorldHello`.",
  },
  {
    kind: "short",
    subtopic: "string processing",
    difficulty: "medium",
    prompt: "What number is printed by the following code?",
    code: "s = 'Computational Thinking'\ncount = 0\nfor ch in s.lower():\n    if ch in 'aeiou':\n        count += 1\nprint(count)",
    accept: ["8"],
    verify: true,
    solution:
      "Vowels in `computational`: o, u, a, i, o, a (6). Vowels in `thinking`: i, i (2). Total **8**. Lowering first means upper-case vowels would also be counted (there are none here).",
  },
  {
    kind: "short",
    subtopic: "string processing",
    difficulty: "medium",
    prompt: "What is printed by the following code? (Write each output line on its own line.)",
    code: "words = ['level', 'Noon', 'python', 'racecar', 'abca']\nfor w in words:\n    if w.lower() == w.lower()[::-1]:\n        print(w)",
    accept: ["level\nNoon\nracecar"],
    verify: true,
    solution:
      "A word is printed if it reads the same reversed, ignoring case. `level` and `racecar` are palindromes; `Noon` becomes `noon`, which is also one. `python` and `abca` (reversed `acba`) are not. The original word (with its capital N) is printed.",
  },
  {
    kind: "short",
    subtopic: "ord/chr & comparison",
    difficulty: "hard",
    prompt: "What is printed by the following code?",
    code: "s = 'zebra'\nout = ''\nfor ch in s:\n    out += chr((ord(ch) - ord('a') + 3) % 26 + ord('a'))\nprint(out)",
    accept: ["cheud"],
    verify: true,
    solution:
      "This is a Caesar shift of 3. Each letter is turned into a position 0-25, shifted by 3, wrapped with `% 26`, and turned back into a letter. z (25) → 28 % 26 = 2 → `c`; e → `h`; b → `e`; r → `u`; a → `d`. Without `% 26`, `z` would become `}` instead of wrapping to `c`.",
  },
  {
    kind: "short",
    subtopic: "string methods",
    difficulty: "medium",
    prompt: "What number is printed by the following code?",
    code: "print('mississippi'.replace('ss', 'S').find('S', 3))",
    accept: ["4"],
    verify: true,
    solution:
      "Methods chain left to right. `replace` turns `mississippi` into `miSiSippi` (m0 i1 S2 i3 S4 ...). `find('S', 3)` starts searching at index 3, so it skips the `S` at 2 and finds the one at index **4**.",
  },
  {
    kind: "short",
    subtopic: "string operators",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "s = 'abcdefg'\nprint('cde' in s, 'ace' in s, s in s)",
    accept: ["True False True"],
    verify: true,
    solution:
      "`in` tests for a **contiguous** substring. `cde` appears as a block; `ace` does not (the letters are there but not next to each other). Any string is contained in itself, so `s in s` is True.",
  },

  // ---------------- open ----------------
  {
    kind: "open",
    subtopic: "immutability",
    difficulty: "easy",
    prompt:
      "Explain what it means for Python strings to be **immutable**. Given `s = 'Hello'`, explain why `s[0] = 'J'` fails, and show one correct way to make `s` refer to `'Jello'`.",
    modelAnswer:
      "Immutable means a string object cannot be changed after it is created: you can read characters with indexing or slicing, but you cannot assign to an index or delete characters. `s[0] = 'J'` tries to change the existing string in place, so Python raises `TypeError: 'str' object does not support item assignment`.\nInstead, build a **new** string and rebind the variable to it:\n```\ns = 'Hello'\ns = 'J' + s[1:]      # or s.replace('H', 'J', 1)\nprint(s)             # Jello\n```\nString methods such as `upper()` or `replace()` also never modify the original; they return new strings.",
    rubric: [
      { point: "Immutable = the string's contents cannot be changed after creation", marks: 1 },
      { point: "s[0] = 'J' raises a TypeError (item assignment not supported)", marks: 1 },
      { point: "Correct fix that builds a new string, e.g. 'J' + s[1:] or replace, and reassigns s", marks: 1 },
    ],
    solution:
      "Key idea: you never change a string, you create a new one and point the variable at it. Slicing plus concatenation (`'J' + s[1:]`) is the standard pattern from the lecture (`'spam'` → `'slam'`).",
  },
  {
    kind: "open",
    subtopic: "string processing",
    difficulty: "easy",
    prompt:
      "Write Python code that, given a string `text`, counts how many **vowels** and how many **consonants** it contains (ignore case; digits, spaces and punctuation count as neither), then prints the two counts. For `text = 'Hello, World 2024!'` it should print `3 7`.",
    modelAnswer:
      "```\ntext = 'Hello, World 2024!'\nvowels = 0\nconsonants = 0\nfor ch in text.lower():\n    if ch.isalpha():\n        if ch in 'aeiou':\n            vowels += 1\n        else:\n            consonants += 1\nprint(vowels, consonants)\n```",
    rubric: [
      { point: "Iterates over every character of the string", marks: 1 },
      { point: "Handles case, e.g. by using lower() or checking both cases", marks: 1 },
      { point: "Only letters are classified (isalpha), so digits/punctuation are skipped", marks: 1 },
      { point: "Correct vowel test (in 'aeiou') and counters printed", marks: 1 },
    ],
    solution:
      "The trap is counting every non-vowel as a consonant: spaces, commas, digits and `!` must be excluded with `isalpha()`. Lower-casing first lets one membership test `ch in 'aeiou'` handle both cases.",
  },
  {
    kind: "open",
    subtopic: "string methods",
    difficulty: "medium",
    prompt:
      "Write a function `reverse_words(sentence)` that returns a new string with the **words** in reverse order, separated by single spaces. Extra spaces in the input should be ignored, e.g. `reverse_words('  the quick   brown fox ')` returns `'fox brown quick the'`.",
    modelAnswer:
      "```\ndef reverse_words(sentence):\n    words = sentence.split()\n    return ' '.join(words[::-1])\n\nprint(reverse_words('  the quick   brown fox '))   # fox brown quick the\n```\n`split()` with no argument splits on any run of whitespace and drops empty pieces, so the extra spaces disappear. Reversing the list (not the string) keeps each word's letters in order.",
    rubric: [
      { point: "Uses split() (no argument) to get the words, which also removes extra spaces", marks: 1 },
      { point: "Reverses the order of the list of words (e.g. [::-1] or reverse())", marks: 1 },
      { point: "Joins with a single space using ' '.join and returns the result", marks: 1 },
    ],
    solution:
      "Reversing the whole string with `sentence[::-1]` is wrong: it reverses the letters too (`xof nworb ...`). Using `split(' ')` instead of `split()` would keep empty strings and produce extra spaces.",
  },
  {
    kind: "open",
    subtopic: "string processing",
    difficulty: "hard",
    prompt:
      "Write a function `is_palindrome(s)` that returns `True` if `s` reads the same forwards and backwards when **case and all non-letter characters are ignored**, and `False` otherwise. For example `is_palindrome('A man, a plan, a canal: Panama')` is `True` and `is_palindrome('Hello')` is `False`.",
    modelAnswer:
      "```\ndef is_palindrome(s):\n    cleaned = ''\n    for ch in s:\n        if ch.isalpha():\n            cleaned += ch.lower()\n    return cleaned == cleaned[::-1]\n\nprint(is_palindrome('A man, a plan, a canal: Panama'))  # True\nprint(is_palindrome('Hello'))                           # False\n```\nAn equivalent two-pointer version compares `cleaned[i]` with `cleaned[len(cleaned) - 1 - i]` for `i` in `range(len(cleaned) // 2)` and returns `False` on the first mismatch.",
    rubric: [
      { point: "Removes non-letter characters (isalpha or equivalent)", marks: 1 },
      { point: "Normalises case (lower() or upper())", marks: 1 },
      { point: "Correct palindrome test, e.g. compare with [::-1] or two indices moving inwards", marks: 2 },
      { point: "Returns a Boolean (not just printing)", marks: 1 },
    ],
    solution:
      "Build a cleaned string first (new string, since strings are immutable), then compare it with its reverse. Forgetting to remove spaces/punctuation makes `'A man, a plan...'` fail; forgetting to lower-case makes `'Aa'` fail.",
  },
];
