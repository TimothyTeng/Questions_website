import type { CodingProblem } from "@/lib/sc1001/types";

// Deterministic pseudo-random integers in [lo, hi] (Park–Miller), for the large hidden tests.
function randomInts(count: number, lo: number, hi: number, seed: number): number[] {
  let s = seed;
  return Array.from({ length: count }, () => {
    s = (s * 48271) % 2147483647;
    return lo + (s % (hi - lo + 1));
  });
}

const join = (xs: number[]) => xs.join(" ");
const sortedCopy = (xs: number[]) => [...xs].sort((a, b) => a - b);
// 100 000 distinct sorted values: -150000, -149997, ..., 149997.
const STEP3 = Array.from({ length: 100000 }, (_, i) => 3 * i - 150000);

function insertionTrace(a: number[]): string {
  const xs = [...a];
  const out = [join(xs)];
  for (let i = 1; i < xs.length; i++) {
    const key = xs[i];
    let j = i - 1;
    while (j >= 0 && xs[j] > key) {
      xs[j + 1] = xs[j];
      j--;
    }
    xs[j + 1] = key;
    out.push(join(xs));
  }
  return out.join("\n") + "\n";
}

function firstLastCase(arr: number[], queries: number[]) {
  const pos = new Map<number, [number, number]>();
  arr.forEach((v, i) => pos.set(v, [pos.get(v)?.[0] ?? i, i]));
  const output = queries.map((q) => (pos.get(q) ?? [-1, -1]).join(" ")).join("\n") + "\n";
  return { input: `${arr.length}\n${join(arr)}\n${queries.length}\n${join(queries)}\n`, output };
}

const listCase = (xs: number[], output: string) => ({ input: `${xs.length}\n${join(xs)}\n`, output });
const SORTED_DUPS = sortedCopy(randomInts(100000, 0, 20000, 7));

export const searchSortProblems: CodingProblem[] = [
  {
    slug: "binary-search-index",
    title: "Binary Search",
    difficulty: "easy",
    topics: ["search-sort"],
    leetcode: "https://leetcode.com/problems/binary-search/",
    statement:
      "You are given a list of `n` **distinct** integers sorted in ascending order, and a `target` value. Print the index (0-based) of `target` in the list, or `-1` if it does not occur.\n\nImplement **binary search**: keep a range `low … high` that could still contain the target, look at the middle element, and discard the half that cannot contain it.\n\nDo not use `in`, `.index()` or a linear scan.",
    inputFormat: "Line 1: `n`.\nLine 2: `n` space-separated integers in ascending order.\nLine 3: `target`.",
    outputFormat: "A single integer: the index of `target`, or `-1`.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ each value, target ≤ 10^9",
    samples: [
      { input: "6\n-1 0 3 5 9 12\n9\n", output: "4\n", explanation: "`9` is at index 4." },
      { input: "6\n-1 0 3 5 9 12\n2\n", output: "-1\n", explanation: "`2` is not in the list." },
    ],
    tests: [
      { input: "1\n5\n5\n", output: "0\n" },
      { input: "1\n5\n-5\n", output: "-1\n" },
      { input: "2\n2 4\n4\n", output: "1\n" },
      { input: "7\n1 3 5 7 9 11 13\n1\n", output: "0\n" },
      { input: "7\n1 3 5 7 9 11 13\n13\n", output: "6\n" },
      { input: "6\n-50 -20 -7 -3 0 8\n-7\n", output: "2\n" },
      { input: "6\n-50 -20 -7 -3 0 8\n-100\n", output: "-1\n" },
      { input: "6\n-50 -20 -7 -3 0 8\n100\n", output: "-1\n" },
      { input: `100000\n${join(STEP3)}\n83331\n`, output: "77777\n" },
      { input: `100000\n${join(STEP3)}\n83332\n`, output: "-1\n" },
      { input: `100000\n${join(STEP3)}\n-150000\n`, output: "0\n" },
    ],
    starter: "n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\n\n# Write your code here\n",
    reference:
      "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nn = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\nprint(binary_search(arr, target))\n",
  },
  {
    slug: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "easy",
    topics: ["search-sort"],
    leetcode: "https://leetcode.com/problems/search-insert-position/",
    statement:
      "You are given a list of `n` **distinct** integers in ascending order and a `target`.\n\nIf `target` is in the list, print its index (0-based). If it is not, print the index where it would have to be inserted to keep the list sorted.\n\nUse **binary search**. Notice that when a standard binary search ends without finding the target, `low` is exactly the insertion position.",
    inputFormat: "Line 1: `n`.\nLine 2: `n` space-separated integers in ascending order.\nLine 3: `target`.",
    outputFormat: "A single integer: the index of `target`, or its insertion position.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ each value, target ≤ 10^9",
    samples: [
      { input: "4\n1 3 5 6\n5\n", output: "2\n", explanation: "`5` is found at index 2." },
      { input: "4\n1 3 5 6\n2\n", output: "1\n", explanation: "`2` would go between `1` and `3`, i.e. at index 1." },
    ],
    tests: [
      { input: "4\n1 3 5 6\n7\n", output: "4\n" },
      { input: "4\n1 3 5 6\n0\n", output: "0\n" },
      { input: "1\n4\n4\n", output: "0\n" },
      { input: "1\n4\n9\n", output: "1\n" },
      { input: "1\n4\n-9\n", output: "0\n" },
      { input: "5\n-10 -5 0 5 10\n-6\n", output: "1\n" },
      { input: "5\n-10 -5 0 5 10\n10\n", output: "4\n" },
      { input: `100000\n${join(STEP3)}\n83332\n`, output: "77778\n" },
      { input: `100000\n${join(STEP3)}\n1000000000\n`, output: "100000\n" },
      { input: `100000\n${join(STEP3)}\n-149999\n`, output: "1\n" },
    ],
    starter: "n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\n\n# Write your code here\n",
    reference:
      "n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\nlow, high = 0, n - 1\nanswer = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target:\n        answer = mid\n        break\n    elif arr[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nif answer == -1:\n    answer = low\nprint(answer)\n",
  },
  {
    slug: "insertion-sort-trace",
    title: "Insertion Sort, Pass by Pass",
    difficulty: "easy",
    topics: ["search-sort"],
    leetcode: "https://leetcode.com/problems/insertion-sort-list/",
    statement:
      "Sort a list of integers into ascending order using **insertion sort**, and show the list after every pass.\n\nIn pass `i` (for `i = 1, 2, …, n − 1`), take the element at index `i` (the *key*), shift every element of the already-sorted part `arr[0 … i−1]` that is **greater than** the key one position to the right, and put the key into the gap.\n\nFirst print the original list, then print the list after each pass. Do not use `sort()` or `sorted()`.",
    inputFormat: "Line 1: `n`.\nLine 2: `n` space-separated integers.",
    outputFormat: "`n` lines: the original list, then the list after passes 1 to `n − 1`. Each line has the numbers separated by single spaces.",
    constraints: "1 ≤ n ≤ 100\n-1000 ≤ each value ≤ 1000",
    samples: [
      { input: "6\n5 2 4 6 1 3\n", output: "5 2 4 6 1 3\n2 5 4 6 1 3\n2 4 5 6 1 3\n2 4 5 6 1 3\n1 2 4 5 6 3\n1 2 3 4 5 6\n", explanation: "Pass 1 inserts 2 before 5. Pass 2 inserts 4 between 2 and 5. Pass 3 leaves 6 where it is. Pass 4 moves 1 to the front, and pass 5 inserts 3 after 2." },
    ],
    tests: [
      { input: "1\n7\n", output: "7\n" },
      { input: "2\n2 1\n", output: "2 1\n1 2\n" },
      { input: "5\n1 2 3 4 5\n", output: "1 2 3 4 5\n1 2 3 4 5\n1 2 3 4 5\n1 2 3 4 5\n1 2 3 4 5\n" },
      { input: "5\n5 4 3 2 1\n", output: "5 4 3 2 1\n4 5 3 2 1\n3 4 5 2 1\n2 3 4 5 1\n1 2 3 4 5\n" },
      { input: "6\n3 -1 3 0 -1 2\n", output: "3 -1 3 0 -1 2\n-1 3 3 0 -1 2\n-1 3 3 0 -1 2\n-1 0 3 3 -1 2\n-1 -1 0 3 3 2\n-1 -1 0 2 3 3\n" },
      { input: "4\n0 0 0 0\n", output: "0 0 0 0\n0 0 0 0\n0 0 0 0\n0 0 0 0\n" },
      { input: "7\n-5 10 -15 20 -25 30 -35\n", output: "-5 10 -15 20 -25 30 -35\n-5 10 -15 20 -25 30 -35\n-15 -5 10 20 -25 30 -35\n-15 -5 10 20 -25 30 -35\n-25 -15 -5 10 20 30 -35\n-25 -15 -5 10 20 30 -35\n-35 -25 -15 -5 10 20 30\n" },
      (() => { const a = randomInts(30, -1000, 1000, 11); return listCase(a, insertionTrace(a)); })(),
      (() => { const a = randomInts(100, -1000, 1000, 12); return listCase(a, insertionTrace(a)); })(),
    ],
    starter: "n = int(input())\narr = list(map(int, input().split()))\n\n# Write your code here\n",
    reference:
      "n = int(input())\narr = list(map(int, input().split()))\nprint(' '.join(str(x) for x in arr))\nfor i in range(1, n):\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n        arr[j + 1] = arr[j]\n        j -= 1\n    arr[j + 1] = key\n    print(' '.join(str(x) for x in arr))\n",
  },
  {
    slug: "first-and-last-position",
    title: "First and Last Position",
    difficulty: "medium",
    topics: ["search-sort", "complexity"],
    leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    statement:
      "You are given a list of `n` integers sorted in non-decreasing order (values may repeat) and `q` queries. For each query value `x`, print the index of its **first** occurrence and of its **last** occurrence (0-based). If `x` does not occur, print `-1 -1`.\n\nThe list and the number of queries are large, so scanning the list for every query is too slow. Use **two binary searches** per query: one that keeps moving left after finding `x` (to find the first occurrence) and one that keeps moving right (to find the last).\n\nDo not use `.index()`, `.count()` or the `bisect` module.",
    inputFormat: "Line 1: `n`.\nLine 2: `n` space-separated integers in non-decreasing order.\nLine 3: `q`.\nLine 4: `q` space-separated query values.",
    outputFormat: "`q` lines; line `i` contains the first and last index of the `i`-th query value separated by a space, or `-1 -1`.",
    constraints: "1 ≤ n ≤ 10^5\n1 ≤ q ≤ 2 × 10^4\n-10^9 ≤ each value ≤ 10^9",
    samples: [
      { input: "6\n5 7 7 8 8 10\n3\n8 6 5\n", output: "3 4\n-1 -1\n0 0\n", explanation: "`8` occupies indices 3–4, `6` is absent, and `5` appears only at index 0." },
    ],
    tests: [
      { input: "1\n4\n2\n4 3\n", output: "0 0\n-1 -1\n" },
      { input: "5\n2 2 2 2 2\n3\n2 1 3\n", output: "0 4\n-1 -1\n-1 -1\n" },
      { input: "7\n-9 -9 -4 0 0 0 6\n5\n-9 0 6 -4 5\n", output: "0 1\n3 5\n6 6\n2 2\n-1 -1\n" },
      { input: "6\n1 2 3 4 5 6\n6\n6 5 4 3 2 1\n", output: "5 5\n4 4\n3 3\n2 2\n1 1\n0 0\n" },
      { input: "8\n-3 -3 -3 1 1 7 7 7\n4\n7 -3 1 -10\n", output: "5 7\n0 2\n3 4\n-1 -1\n" },
      firstLastCase(SORTED_DUPS, randomInts(20000, -10, 20010, 21)),
      firstLastCase(sortedCopy(randomInts(100000, -1000000000, 1000000000, 22)), randomInts(20000, -1000000000, 1000000000, 23)),
      firstLastCase(Array.from({ length: 100000 }, () => 42), [42, 41, 43]),
    ],
    starter: "n = int(input())\narr = list(map(int, input().split()))\nq = int(input())\nqueries = list(map(int, input().split()))\n\n# Write your code here\n",
    reference:
      "def first_index(arr, x):\n    low, high = 0, len(arr) - 1\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] < x:\n            low = mid + 1\n        else:\n            if arr[mid] == x:\n                ans = mid\n            high = mid - 1\n    return ans\n\ndef last_index(arr, x):\n    low, high = 0, len(arr) - 1\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] > x:\n            high = mid - 1\n        else:\n            if arr[mid] == x:\n                ans = mid\n            low = mid + 1\n    return ans\n\nn = int(input())\narr = list(map(int, input().split()))\nq = int(input())\nqueries = list(map(int, input().split()))\nout = []\nfor x in queries:\n    out.append(str(first_index(arr, x)) + ' ' + str(last_index(arr, x)))\nprint('\\n'.join(out))\n",
    timeLimitMs: 3000,
  },
  {
    slug: "merge-sort",
    title: "Merge Sort",
    difficulty: "medium",
    topics: ["search-sort", "recursion"],
    leetcode: "https://leetcode.com/problems/sort-an-array/",
    statement:
      "Sort a list of integers into ascending order by implementing **merge sort**:\n- a list of length 0 or 1 is already sorted;\n- otherwise split it into two halves, sort each half recursively, then **merge** the two sorted halves by repeatedly taking the smaller of the two front elements.\n\nThe list can have up to 50 000 elements, so a quadratic sort (bubble, selection, insertion) will be too slow. Do not use `sort()` or `sorted()`.",
    inputFormat: "Line 1: `n`.\nLine 2: `n` space-separated integers.",
    outputFormat: "One line with the `n` integers in ascending order, separated by single spaces.",
    constraints: "1 ≤ n ≤ 5 × 10^4\n-10^9 ≤ each value ≤ 10^9",
    samples: [
      { input: "7\n38 27 43 3 9 82 10\n", output: "3 9 10 27 38 43 82\n", explanation: "Split into [38, 27, 43] and [3, 9, 82, 10], sort each to [27, 38, 43] and [3, 9, 10, 82], then merge." },
      { input: "6\n5 1 1 2 0 0\n", output: "0 0 1 1 2 5\n" },
    ],
    tests: [
      { input: "1\n1\n", output: "1\n" },
      { input: "2\n2 1\n", output: "1 2\n" },
      { input: "6\n1 2 3 4 5 6\n", output: "1 2 3 4 5 6\n" },
      { input: "9\n9 8 7 6 5 4 3 2 1\n", output: "1 2 3 4 5 6 7 8 9\n" },
      { input: "7\n3 -3 0 3 -3 0 2\n", output: "-3 -3 0 0 2 3 3\n" },
      { input: "5\n1000000000 -1000000000 0 999999999 -999999999\n", output: "-1000000000 -999999999 0 999999999 1000000000\n" },
      (() => { const a = randomInts(1000, -1000, 1000, 31); return listCase(a, join(sortedCopy(a)) + "\n"); })(),
      (() => { const a = randomInts(50000, -1000000000, 1000000000, 32); return listCase(a, join(sortedCopy(a)) + "\n"); })(),
      (() => { const a = Array.from({ length: 50000 }, (_, i) => 50000 - i); return listCase(a, join(sortedCopy(a)) + "\n"); })(),
    ],
    starter: "n = int(input())\narr = list(map(int, input().split()))\n\n# Write your code here\n",
    reference:
      "def merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    return merge(merge_sort(arr[:mid]), merge_sort(arr[mid:]))\n\nn = int(input())\narr = list(map(int, input().split()))\nprint(' '.join(str(x) for x in merge_sort(arr)))\n",
    timeLimitMs: 3000,
  },
  {
    slug: "sort-colors",
    title: "Sort Colours in One Pass",
    difficulty: "medium",
    topics: ["search-sort", "composite"],
    leetcode: "https://leetcode.com/problems/sort-colors/",
    statement:
      "A list contains only the values `0`, `1` and `2` (think red, white and blue). Rearrange it so that all `0`s come first, then all `1`s, then all `2`s, and print it.\n\nDo it in a **single pass** over the list, swapping elements in place, using three positions (the *Dutch national flag* method):\n- `low`: everything before it is `0`;\n- `mid`: the element currently being examined;\n- `high`: everything after it is `2`.\n\nLook at `arr[mid]`: a `0` is swapped to `low` (advance both `low` and `mid`), a `1` stays (advance `mid`), a `2` is swapped to `high` (move `high` back, but do not advance `mid`). Do not use `sort()`, `sorted()` or `count()`.",
    inputFormat: "Line 1: `n`.\nLine 2: `n` space-separated integers, each `0`, `1` or `2`.",
    outputFormat: "One line with the rearranged list, separated by single spaces.",
    constraints: "1 ≤ n ≤ 10^5",
    samples: [
      { input: "6\n2 0 2 1 1 0\n", output: "0 0 1 1 2 2\n", explanation: "Two 0s, two 1s and two 2s." },
      { input: "3\n2 0 1\n", output: "0 1 2\n" },
    ],
    tests: [
      { input: "1\n0\n", output: "0\n" },
      { input: "1\n2\n", output: "2\n" },
      { input: "2\n1 0\n", output: "0 1\n" },
      { input: "8\n2 2 2 1 1 0 0 0\n", output: "0 0 0 1 1 2 2 2\n" },
      { input: "6\n0 0 1 1 2 2\n", output: "0 0 1 1 2 2\n" },
      { input: "4\n1 1 1 1\n", output: "1 1 1 1\n" },
      { input: "7\n2 1 2 1 2 1 2\n", output: "1 1 1 2 2 2 2\n" },
      (() => { const a = randomInts(200, 0, 2, 41); return listCase(a, join(sortedCopy(a)) + "\n"); })(),
      (() => { const a = randomInts(100000, 0, 2, 42); return listCase(a, join(sortedCopy(a)) + "\n"); })(),
      (() => { const a = randomInts(100000, 1, 2, 43); return listCase(a, join(sortedCopy(a)) + "\n"); })(),
    ],
    starter: "n = int(input())\narr = list(map(int, input().split()))\n\n# Write your code here\n",
    reference:
      "n = int(input())\narr = list(map(int, input().split()))\nlow, mid, high = 0, 0, n - 1\nwhile mid <= high:\n    if arr[mid] == 0:\n        arr[low], arr[mid] = arr[mid], arr[low]\n        low += 1\n        mid += 1\n    elif arr[mid] == 1:\n        mid += 1\n    else:\n        arr[mid], arr[high] = arr[high], arr[mid]\n        high -= 1\nprint(' '.join(str(x) for x in arr))\n",
  },
];
