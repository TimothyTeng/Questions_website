import type { ScDraft } from "@/lib/sc1001/types";

export const searchSort: ScDraft[] = [
  // ---------------- MCQ ----------------
  {
    kind: "mcq",
    subtopic: "binary search",
    difficulty: "easy",
    prompt: "Which condition must hold for binary search to be guaranteed to give a correct answer?",
    options: [
      "The list must contain no duplicate values",
      "The list must have an even number of elements",
      "The list must be sorted",
      "The list must contain only integers",
    ],
    answer: 2,
    solution:
      "Binary search discards half of the list after comparing with the middle item. That is only safe if all items on one side are smaller and all on the other side are larger, i.e. the list is **sorted**. Duplicates, odd/even length and element type (strings work too) do not matter.",
  },
  {
    kind: "mcq",
    subtopic: "complexity",
    difficulty: "easy",
    prompt: "What is the **worst-case** time complexity of binary search on a sorted list of `n` items?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    solution:
      "Each iteration halves the search window, so at most about log₂ n + 1 iterations are needed: **O(log n)**. O(1) is the *best* case (target in the middle on the first try); O(n) is linear search.",
  },
  {
    kind: "mcq",
    subtopic: "sorted() vs sort()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "a = [3, 1, 2]\nb = sorted(a)\nprint(a, b)",
    options: ["[1, 2, 3] [1, 2, 3]", "[3, 1, 2] [3, 1, 2]", "[1, 2, 3] [3, 1, 2]", "[3, 1, 2] [1, 2, 3]"],
    answer: 3,
    verify: true,
    solution:
      "`sorted()` is a **function** that returns a **new** sorted list and leaves the original unchanged. So `a` is still `[3, 1, 2]` and `b` is `[1, 2, 3]`. Only the `list.sort()` method modifies the list in place.",
  },
  {
    kind: "mcq",
    subtopic: "sorted() vs sort()",
    difficulty: "easy",
    prompt: "What is printed by the following code?",
    code: "nums = [4, 2, 9]\nresult = nums.sort()\nprint(result)",
    options: ["[2, 4, 9]", "None", "[4, 2, 9]", "[9, 4, 2]"],
    answer: 1,
    verify: true,
    solution:
      "`list.sort()` sorts the list **in place** and returns `None`. `nums` becomes `[2, 4, 9]`, but `result` holds the return value, which is `None`. A common bug is writing `x = x.sort()` and losing the list.",
  },
  {
    kind: "mcq",
    subtopic: "bubble sort",
    difficulty: "medium",
    prompt: "The function below performs `passes` passes of bubble sort. What is printed?",
    code: "def bubble(a, passes):\n    n = len(a)\n    for p in range(passes):\n        for i in range(n - p - 1):\n            if a[i] > a[i + 1]:\n                a[i], a[i + 1] = a[i + 1], a[i]\n    return a\n\nprint(bubble([5, 1, 4, 2, 8, 3], 2))",
    options: ["[1, 4, 2, 5, 3, 8]", "[1, 2, 3, 4, 5, 8]", "[1, 2, 4, 3, 5, 8]", "[1, 2, 4, 5, 3, 8]"],
    answer: 2,
    verify: true,
    solution:
      "Pass 1: 5↔1, 5↔4, 5↔2, 5<8, 8↔3 → `[1, 4, 2, 5, 3, 8]` (8 is now final).\nPass 2 (stops before the last position): 1<4, 4↔2, 4<5, 5↔3 → `[1, 2, 4, 3, 5, 8]`.\n`[1, 4, 2, 5, 3, 8]` is the state after only one pass; the fully sorted list needs another pass.",
  },
  {
    kind: "mcq",
    subtopic: "bubble sort",
    difficulty: "easy",
    prompt: "Using the improved bubble sort (inner loop `range(len(alist) - passnum - 1)`, **no** early exit), how many comparisons are made when sorting **any** list of 6 elements?",
    options: ["5", "15", "30", "36"],
    answer: 1,
    solution:
      "Pass 1 makes 5 comparisons, pass 2 makes 4, … pass 5 makes 1: 5 + 4 + 3 + 2 + 1 = **15** = n(n − 1)/2. Without the early-exit flag the count does not depend on the input. 30 = 6 × 5 is what the original version (inner loop always `n − 1`) makes; 36 = n².",
  },
  {
    kind: "mcq",
    subtopic: "bubble sort",
    difficulty: "medium",
    prompt: "This bubble sort uses a `swapped` flag to exit early. How many passes does it perform?",
    code: "def bubble_sort(alist):\n    passes = 0\n    for passnum in range(len(alist) - 1):\n        passes += 1\n        swapped = False\n        for i in range(len(alist) - passnum - 1):\n            if alist[i] > alist[i + 1]:\n                alist[i], alist[i + 1] = alist[i + 1], alist[i]\n                swapped = True\n        if not swapped:\n            break\n    return passes\n\nprint(bubble_sort([2, 1, 3, 4, 5]))",
    options: ["1", "4", "5", "2"],
    answer: 3,
    verify: true,
    solution:
      "Pass 1 swaps 2 and 1, so `swapped` is `True` and the loop continues. Pass 2 finds no swaps, so it breaks: **2** passes. One pass is not enough because the algorithm only *knows* the list is sorted after a pass with no swaps. 4 would be the count without early exit.",
  },
  {
    kind: "mcq",
    subtopic: "linear search",
    difficulty: "easy",
    prompt: "A linear search is performed on an **unsorted** list of `n` distinct items. Which statement is correct?",
    options: [
      "The best case needs 1 comparison and the worst case needs n comparisons",
      "Every search needs exactly n comparisons",
      "The worst case needs about log₂ n comparisons",
      "Linear search cannot be used because the list is unsorted",
    ],
    answer: 0,
    solution:
      "Linear search checks items one by one from the start. Best case: the key is the first item (1 comparison, O(1)). Worst case: the key is last or absent (n comparisons, O(n)). It stops early when found, so not every search takes n. log₂ n is binary search, which (unlike linear search) needs a sorted list.",
  },
  {
    kind: "mcq",
    subtopic: "binary search",
    difficulty: "medium",
    prompt: "The binary search below records each `mid` index it examines. What is printed?",
    code: "def binary_search(a, target):\n    mids = []\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        mids.append(mid)\n        if a[mid] == target:\n            return mids\n        if a[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return mids\n\nprint(binary_search([3, 8, 11, 15, 21, 27, 30, 42], 30))",
    options: ["[3, 5]", "[3, 5, 6]", "[4, 6]", "[3, 4, 5, 6]"],
    answer: 1,
    verify: true,
    solution:
      "lo=0, hi=7 → mid=3 (15 < 30) so lo=4.\nlo=4, hi=7 → mid=5 (27 < 30) so lo=6.\nlo=6, hi=7 → mid=6 (30) found.\nMids: **[3, 5, 6]**. `[4, 6]` comes from rounding the middle up instead of using `//`.",
  },
  {
    kind: "mcq",
    subtopic: "binary search",
    difficulty: "medium",
    prompt: "At most how many times does the loop body of an iterative binary search run on a sorted list of **1000** elements?",
    options: ["1000", "500", "32", "10"],
    answer: 3,
    solution:
      "Each iteration halves the window: 1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1. That is at most **10** iterations (⌊log₂ 1000⌋ + 1 = 10, and 2¹⁰ = 1024 ≥ 1000). 1000 is the linear-search worst case; 500 is the linear-search average.",
  },
  {
    kind: "mcq",
    subtopic: "binary search",
    difficulty: "hard",
    prompt: "Binary search is (wrongly) applied to an unsorted list. What is printed?",
    code: "def binary_search(a, target):\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if a[mid] == target:\n            return mid\n        if a[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\nprint(binary_search([9, 2, 7, 4, 1], 9))",
    options: ["0", "4", "-1", "IndexError: list index out of range"],
    answer: 2,
    verify: true,
    solution:
      "mid=2: 7 < 9 so lo=3. mid=3: 4 < 9 so lo=4. mid=4: 1 < 9 so lo=5. Now lo > hi, so it returns **-1** even though 9 is at index 0. Binary search does not crash on unsorted data; it silently gives a wrong answer, which is why the sorted precondition matters. No IndexError occurs because `lo <= hi` keeps `mid` inside the list.",
  },
  {
    kind: "mcq",
    subtopic: "selection sort",
    difficulty: "medium",
    prompt: "Selection sort repeatedly finds the smallest remaining item and swaps it into the next position. What is printed after **2** passes?",
    code: "def selection(a, passes):\n    for i in range(passes):\n        m = i\n        for j in range(i + 1, len(a)):\n            if a[j] < a[m]:\n                m = j\n        a[i], a[m] = a[m], a[i]\n    return a\n\nprint(selection([29, 10, 14, 37, 13], 2))",
    options: ["[10, 13, 14, 37, 29]", "[10, 29, 14, 37, 13]", "[10, 13, 14, 29, 37]", "[10, 14, 29, 37, 13]"],
    answer: 0,
    verify: true,
    solution:
      "Pass 1: smallest is 10 (index 1), swap with index 0 → `[10, 29, 14, 37, 13]`.\nPass 2: smallest of `[29, 14, 37, 13]` is 13 (index 4), swap with index 1 → **`[10, 13, 14, 37, 29]`**.\nNote the swap moves 29 to the end; selection sort swaps rather than shifting, so `[10, 13, 14, 29, 37]` is wrong (that is fully sorted).",
  },
  {
    kind: "mcq",
    subtopic: "insertion sort",
    difficulty: "medium",
    prompt: "Insertion sort takes each item from index 1 onwards and inserts it into the sorted part on its left. What is printed when the outer loop is stopped after `i = 1` and `i = 2`?",
    code: "def insertion(a, last):\n    for i in range(1, last + 1):\n        key = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > key:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = key\n    return a\n\nprint(insertion([7, 3, 5, 1, 9], 2))",
    options: ["[3, 7, 5, 1, 9]", "[1, 3, 5, 7, 9]", "[3, 5, 1, 7, 9]", "[3, 5, 7, 1, 9]"],
    answer: 3,
    verify: true,
    solution:
      "i=1: insert 3 before 7 → `[3, 7, 5, 1, 9]`.\ni=2: insert 5 between 3 and 7 → **`[3, 5, 7, 1, 9]`**.\nAfter k insertions only the first k + 1 items are sorted among themselves; 1 and 9 have not been touched yet.",
  },
  {
    kind: "mcq",
    subtopic: "merge sort",
    difficulty: "easy",
    prompt: "The `merge` function from the lecture combines two sorted lists. What is printed?",
    code: "def merge(left_list, right_list):\n    result_list = []\n    while left_list and right_list:\n        if left_list[0] < right_list[0]:\n            result_list.append(left_list[0])\n            left_list.pop(0)\n        else:\n            result_list.append(right_list[0])\n            right_list.pop(0)\n    if left_list:\n        result_list.extend(left_list)\n    else:\n        result_list.extend(right_list)\n    return result_list\n\nprint(merge([1, 4, 9], [2, 3, 10]))",
    options: ["[1, 4, 9, 2, 3, 10]", "[1, 2, 3, 4, 9, 10]", "[1, 2, 4, 3, 9, 10]", "[1, 2, 3, 4, 9]"],
    answer: 1,
    verify: true,
    solution:
      "The fronts are compared repeatedly and the smaller one is moved: 1, 2, 3, 4, 9. The left list is then empty, so the remaining `[10]` is appended: **[1, 2, 3, 4, 9, 10]**. Forgetting the leftover step would lose 10.",
  },
  {
    kind: "mcq",
    subtopic: "merge sort",
    difficulty: "hard",
    prompt: "How many times in total is `mergesort` called (including the first call) when sorting a list of 5 elements?",
    code: "calls = 0\n\ndef mergesort(items):\n    global calls\n    calls += 1\n    if len(items) < 2:\n        return items\n    mid = len(items) // 2\n    left = mergesort(items[:mid])\n    right = mergesort(items[mid:])\n    return sorted(left + right)  # stands in for merge()\n\nmergesort([5, 3, 8, 1, 4])\nprint(calls)",
    options: ["5", "8", "9", "10"],
    answer: 2,
    verify: true,
    solution:
      "Split tree: [5 items] → [2] and [3]; [2] → [1] + [1]; [3] → [1] + [2]; that [2] → [1] + [1].\nCalls: 1 (size 5) + 2 (sizes 2, 3) + 4 (sizes 1, 1, 1, 2) + 2 (sizes 1, 1) = **9**. In general merge sort on n items makes 2n − 1 calls: n leaves (size 1) plus n − 1 internal splits.",
  },
  {
    kind: "mcq",
    subtopic: "complexity",
    difficulty: "easy",
    prompt: "Which sorting algorithm has a **worst-case** time complexity of O(n log n)?",
    options: ["Bubble sort", "Selection sort", "Insertion sort", "Merge sort"],
    answer: 3,
    solution:
      "Merge sort splits the list in half (log n levels) and does O(n) merging work per level: **O(n log n)** in every case. Bubble, selection and insertion sort are all O(n²) in the worst case (bubble and insertion sort are O(n) in the best case on already sorted input).",
  },
  {
    kind: "mcq",
    subtopic: "sorted() vs sort()",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "fruits = ['kiwi', 'fig', 'apple', 'pear', 'nut']\nprint(sorted(fruits, key=len))",
    options: [
      "['apple', 'fig', 'kiwi', 'nut', 'pear']",
      "['nut', 'fig', 'pear', 'kiwi', 'apple']",
      "['fig', 'nut', 'kiwi', 'pear', 'apple']",
      "['apple', 'kiwi', 'pear', 'fig', 'nut']",
    ],
    answer: 2,
    verify: true,
    solution:
      "`key=len` sorts by length: 3 (`fig`, `nut`), 4 (`kiwi`, `pear`), 5 (`apple`). Python's sort is **stable**, so items with equal keys keep their original relative order: `fig` before `nut`, `kiwi` before `pear`. Alphabetical order is ignored because only the key is compared.",
  },

  // ---------------- short ----------------
  {
    kind: "short",
    subtopic: "linear search",
    difficulty: "easy",
    prompt: "How many comparisons does this linear search make? Enter the number printed.",
    code: "data = [4, 8, 15, 16, 23, 42]\ncomparisons = 0\nfor item in data:\n    comparisons += 1\n    if item == 23:\n        break\nprint(comparisons)",
    accept: ["5"],
    verify: true,
    solution: "23 is at index 4, so the loop compares 4, 8, 15, 16 and 23 before `break`: **5** comparisons (position index + 1).",
  },
  {
    kind: "short",
    subtopic: "linear search",
    difficulty: "easy",
    prompt: "A linear search looks for a value that is **not** in a list of 50 items. How many comparisons with list items are made?",
    accept: ["50"],
    solution: "When the key is absent, linear search must examine every item before concluding it is not there: **50** comparisons. This is the worst case, O(n).",
  },
  {
    kind: "short",
    subtopic: "linear search",
    difficulty: "medium",
    prompt: "`list.index()` performs a linear search. What is printed? Write each line of output on its own line.",
    code: "foods = ['Subway', 'Mr Bean', 'Pizza Hut']\nprint(foods.index('Pizza Hut'))\ntry:\n    print(foods.index('pizza hut'))\nexcept ValueError:\n    print('not found')",
    accept: ["2\nnot found"],
    verify: true,
    solution:
      "`index()` returns the lowest index of a match, so the first call prints **2**. String comparison is case-sensitive, so `'pizza hut'` is not found. `index()` does **not** return -1 in that case; it raises a **ValueError**, which the `except` clause catches to print `not found`.",
  },
  {
    kind: "short",
    subtopic: "binary search",
    difficulty: "medium",
    prompt: "How many times does the `while` loop body run? Enter the number printed.",
    code: "a = [2, 4, 7, 9, 12, 15, 19]\ntarget = 8\nlo, hi = 0, len(a) - 1\nsteps = 0\nwhile lo <= hi:\n    steps += 1\n    mid = (lo + hi) // 2\n    if a[mid] == target:\n        break\n    if a[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nprint(steps)",
    accept: ["3"],
    verify: true,
    solution:
      "(lo, hi) = (0, 6): mid 3, 9 > 8 → hi = 2.\n(0, 2): mid 1, 4 < 8 → lo = 2.\n(2, 2): mid 2, 7 < 8 → lo = 3.\nNow lo = 3 > hi = 2, the window is empty and the loop stops after **3** iterations; 8 is not in the list.",
  },
  {
    kind: "short",
    subtopic: "bubble sort",
    difficulty: "easy",
    prompt: "How many swaps does bubble sort make on this list? Enter the number printed.",
    code: "a = [4, 3, 2, 1]\nswaps = 0\nfor p in range(len(a) - 1):\n    for i in range(len(a) - p - 1):\n        if a[i] > a[i + 1]:\n            a[i], a[i + 1] = a[i + 1], a[i]\n            swaps += 1\nprint(swaps)",
    accept: ["6"],
    verify: true,
    solution:
      "A reverse-sorted list is the worst case: every comparison causes a swap. Passes make 3 + 2 + 1 = **6** swaps (= n(n − 1)/2 for n = 4). In general each swap removes exactly one out-of-order pair.",
  },
  {
    kind: "short",
    subtopic: "binary search",
    difficulty: "medium",
    prompt: "What is printed by this recursive binary search? Write each line of output on its own line.",
    code: "def bsearch(a, target, lo, hi):\n    print(lo, hi)\n    if lo > hi:\n        return -1\n    mid = (lo + hi) // 2\n    if a[mid] == target:\n        return mid\n    if a[mid] < target:\n        return bsearch(a, target, mid + 1, hi)\n    return bsearch(a, target, lo, mid - 1)\n\na = [2, 4, 7, 9, 12, 15, 19]\nprint(bsearch(a, 19, 0, len(a) - 1))",
    accept: ["0 6\n4 6\n6 6\n6"],
    verify: true,
    solution:
      "Call (0, 6): mid 3, 9 < 19 → recurse on (4, 6).\nCall (4, 6): mid 5, 15 < 19 → recurse on (6, 6).\nCall (6, 6): mid 6, found → return 6.\nEach call prints its `lo hi` first, then the outer `print` shows the returned index **6**.",
  },
  {
    kind: "short",
    subtopic: "insertion sort",
    difficulty: "hard",
    prompt: "This insertion sort counts how many times an element is shifted one place to the right. Enter the number printed.",
    code: "a = [5, 2, 4, 6, 1, 3]\nshifts = 0\nfor i in range(1, len(a)):\n    key = a[i]\n    j = i - 1\n    while j >= 0 and a[j] > key:\n        a[j + 1] = a[j]\n        j -= 1\n        shifts += 1\n    a[j + 1] = key\nprint(shifts)",
    accept: ["9"],
    verify: true,
    solution:
      "Inserting 2 shifts 5 (1); 4 shifts 5 (1); 6 shifts nothing (0); 1 shifts 2, 4, 5, 6 (4); 3 shifts 4, 5, 6 (3). Total **9**. This equals the number of out-of-order pairs (inversions) in the original list, which is also the number of swaps bubble sort would make.",
  },
  {
    kind: "short",
    subtopic: "sorted() vs sort()",
    difficulty: "medium",
    prompt: "What is printed by the following code?",
    code: "scores = {'amy': 72, 'ben': 88, 'cal': 65}\nprint(sorted(scores, key=scores.get))",
    accept: ["['cal', 'amy', 'ben']"],
    verify: true,
    solution:
      "Iterating over a dictionary gives its **keys**, so `sorted()` returns a list of names. `key=scores.get` orders them by their values: 65 (`cal`), 72 (`amy`), 88 (`ben`) → **['cal', 'amy', 'ben']**. Without `key=` they would be sorted alphabetically.",
  },

  // ---------------- open ----------------
  {
    kind: "open",
    subtopic: "binary search",
    difficulty: "medium",
    prompt:
      "Write an **iterative** function `binary_search(a, target)` that returns the index of `target` in the ascending list `a`, or `-1` if it is not present. Do not use `in`, `index()` or any built-in search.",
    modelAnswer:
      "```\ndef binary_search(a, target):\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if a[mid] == target:\n            return mid\n        if a[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n```",
    rubric: [
      { point: "Initialises `lo = 0` and `hi = len(a) - 1`", marks: 1 },
      { point: "Loops while `lo <= hi` and computes `mid = (lo + hi) // 2`", marks: 1 },
      { point: "Returns `mid` when `a[mid] == target`", marks: 1 },
      { point: "Moves `lo = mid + 1` when the middle is too small and `hi = mid - 1` when it is too large", marks: 1 },
      { point: "Returns -1 after the loop when the window is empty", marks: 1 },
    ],
    solution:
      "Common mistakes: `while lo < hi` (misses the last one-element window), `lo = mid` or `hi = mid` (can loop forever), using `/` instead of `//` (float index), and returning -1 inside the loop.",
  },
  {
    kind: "open",
    subtopic: "insertion sort",
    difficulty: "medium",
    prompt:
      "Write a function `insertion_sort(a)` that sorts the list `a` into ascending order **in place** using insertion sort, then state its worst-case and best-case time complexity.",
    modelAnswer:
      "```\ndef insertion_sort(a):\n    for i in range(1, len(a)):\n        key = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > key:\n            a[j + 1] = a[j]   # shift larger item right\n            j -= 1\n        a[j + 1] = key        # drop key into the gap\n```\nWorst case (reverse-sorted input): O(n²), because item i may shift past all i items before it. Best case (already sorted): O(n), because the `while` condition fails immediately for every item.",
    rubric: [
      { point: "Outer loop from index 1 to the end, saving `a[i]` as the key", marks: 1 },
      { point: "Inner loop shifts larger items one place right while `j >= 0` and `a[j] > key`", marks: 1 },
      { point: "Places the key at `a[j + 1]` after the inner loop", marks: 1 },
      { point: "Worst case O(n²) and best case O(n), with a reason", marks: 1 },
    ],
    solution:
      "The loop invariant is: before iteration i, `a[0..i-1]` is sorted. Using `a[j] >= key` would still sort but would make the algorithm unstable. Forgetting `j >= 0` lets `j` reach -1, so `a[-1]` (the last element) is compared by mistake and the result can be corrupted.",
  },
  {
    kind: "open",
    subtopic: "linear search",
    difficulty: "easy",
    prompt:
      "Compare **linear search** and **binary search**: state what each requires of the list, their best-case and worst-case time complexities, and give one situation where linear search is the better choice.",
    modelAnswer:
      "Linear search checks items one at a time from the start; it works on any list, sorted or not. Best case O(1) (first item), worst case O(n) (last item or absent).\nBinary search repeatedly compares the target with the middle item and discards half of the list; it requires the list to be **sorted**. Best case O(1) (middle item), worst case O(log n).\nLinear search is better when the list is unsorted and only searched once or a few times (sorting first costs O(n log n), more than one O(n) scan), or when the list is very short.",
    rubric: [
      { point: "Linear search works on unsorted lists; binary search requires a sorted list", marks: 1 },
      { point: "Linear: best O(1), worst O(n)", marks: 1 },
      { point: "Binary: best O(1), worst O(log n)", marks: 1 },
      { point: "Valid situation favouring linear search, with a reason", marks: 1 },
    ],
    solution:
      "Remember there is no single best search algorithm: binary search is faster per search but only if the data is already sorted (or will be searched many times, so the one-off sort pays for itself).",
  },
  {
    kind: "open",
    subtopic: "merge sort",
    difficulty: "hard",
    prompt:
      "Explain how **merge sort** sorts `[38, 27, 43, 3, 9, 82]`. Show the divide steps and the merge steps, and state the time complexity of merge sort with a brief justification.",
    modelAnswer:
      "Divide (split in half until each part has fewer than 2 items):\n[38, 27, 43, 3, 9, 82] → [38, 27, 43] and [3, 9, 82]\n[38, 27, 43] → [38] and [27, 43] → [27] and [43]\n[3, 9, 82] → [3] and [9, 82] → [9] and [82]\nMerge (repeatedly take the smaller front item of two sorted lists, then append the leftovers):\n[27] + [43] → [27, 43]; [38] + [27, 43] → [27, 38, 43]\n[9] + [82] → [9, 82]; [3] + [9, 82] → [3, 9, 82]\n[27, 38, 43] + [3, 9, 82] → [3, 9, 27, 38, 43, 82]\nComplexity: O(n log n) in all cases. The list is halved about log₂ n times, and at each level of the recursion the merges together handle all n items, i.e. O(n) work per level.",
    rubric: [
      { point: "Correct recursive splitting down to single-element lists (base case: length < 2)", marks: 1 },
      { point: "Correct description of merging two sorted lists (compare fronts, move smaller, append leftovers)", marks: 1 },
      { point: "Correct intermediate merged lists and final result", marks: 1 },
      { point: "O(n log n) with justification: log n levels × O(n) merging per level", marks: 2 },
    ],
    solution:
      "Merge sort is a **divide-and-conquer**, recursive algorithm. Unlike bubble sort it does not sort in place: the merge step builds new lists, so it uses O(n) extra memory.",
  },
];
