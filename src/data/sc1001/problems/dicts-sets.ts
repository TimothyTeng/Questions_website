import type { CodingProblem } from "@/lib/sc1001/types";

// Deterministic pseudo-random generator for the large hidden tests: r(lo, hi) is an integer in [lo, hi].
function rng(seed: number) {
  let s = seed >>> 0;
  return (lo: number, hi: number) => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return lo + ((s >>> 8) % (hi - lo + 1));
  };
}
function shuffled<T>(seed: number, items: T[]): T[] {
  const r = rng(seed);
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = r(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const listInput = (nums: (number | string)[], first = `${nums.length}`) => `${first}\n${nums.join(" ")}\n`;

function majorityCase(seed: number, n: number, value: number) {
  const r = rng(seed);
  const k = Math.floor(n / 2) + 1;
  const nums = [...Array.from({ length: k }, () => value), ...Array.from({ length: n - k }, () => r(-1000000, 1000000))];
  return { input: listInput(shuffled(seed + 1, nums)), output: `${value}\n` };
}
const distinctValues = (seed: number, n: number) => shuffled(seed, Array.from({ length: n }, (_, i) => 3 * i - 150000));
function groupAnagramsCase(seed: number, n: number, letters: string, minLen: number, maxLen: number) {
  const r = rng(seed);
  const words = Array.from({ length: n }, () => {
    let w = "";
    const len = r(minLen, maxLen);
    for (let i = 0; i < len; i++) w += letters[r(0, letters.length - 1)];
    return w;
  });
  const groups = new Map<string, string[]>();
  for (const w of words) {
    const key = w.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(w);
  }
  return { input: listInput(words), output: [...groups.values()].map((g) => g.join(" ")).join("\n") + "\n" };
}
function topKCase(seed: number, n: number, k: number, skewed: boolean) {
  const r = rng(seed);
  const nums = Array.from({ length: n }, () => (skewed ? r(-1000, -1000 + r(0, 2000)) : r(-1000, 1000)));
  const counts = new Map<number, number>();
  for (const x of nums) counts.set(x, (counts.get(x) ?? 0) + 1);
  const order = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)! || a - b);
  return { input: listInput(nums, `${n} ${k}`), output: order.slice(0, k).join(" ") + "\n" };
}

export const dictsSetsProblems: CodingProblem[] = [
  {
    slug: "majority-element",
    title: "Majority Element",
    difficulty: "easy",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/majority-element/",
    statement:
      "In a list of `n` integers, one value appears **more than** `n / 2` times. Find that value.\n\nA dictionary that counts how often each value appears is a natural fit.",
    inputFormat: "The first line holds `n`. The second line holds the `n` integers separated by spaces.",
    outputFormat: "The majority value.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ each number ≤ 10^9\nA majority value always exists.",
    samples: [
      { input: "3\n3 2 3\n", output: "3\n" },
      { input: "7\n2 2 1 1 1 2 2\n", output: "2\n", explanation: "`2` appears 4 times, which is more than 7 / 2 = 3.5." },
    ],
    tests: [
      { input: "1\n5\n", output: "5\n" },
      { input: "2\n-4 -4\n", output: "-4\n" },
      { input: "5\n1 1 1 2 3\n", output: "1\n" },
      { input: "5\n9 8 9 8 9\n", output: "9\n" },
      { input: "6\n0 0 0 0 1 2\n", output: "0\n" },
      { input: "7\n-1 4 -1 4 -1 4 -1\n", output: "-1\n" },
      majorityCase(71, 100000, 777),
      majorityCase(72, 99999, -123456789),
    ],
    starter: "n = int(input())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nnums = list(map(int, input().split()))\ncounts = {}\nfor x in nums:\n    counts[x] = counts.get(x, 0) + 1\nfor x in counts:\n    if counts[x] > n // 2:\n        print(x)\n        break\n",
  },
  {
    slug: "first-repeated-value",
    title: "First Repeated Value",
    difficulty: "easy",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/contains-duplicate/",
    statement:
      "Read a list of integers from left to right. Find the first value that you meet **for the second time** — that is, the value whose second occurrence comes earliest in the list. If every value is different, report that there is none.\n\nWith up to 10^5 numbers, `x in some_list` inside a loop is too slow; a **set** answers \"have I seen `x` before?\" instantly.",
    inputFormat: "The first line holds `n`. The second line holds the `n` integers separated by spaces.",
    outputFormat: "The first repeated value, or `NONE` if no value repeats.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ each number ≤ 10^9",
    samples: [
      { input: "6\n3 1 4 1 5 3\n", output: "1\n", explanation: "Reading left to right, the second `1` (position 4) appears before the second `3` (position 6), so `1` is the first value seen twice." },
      { input: "4\n1 2 3 4\n", output: "NONE\n" },
    ],
    tests: [
      { input: "1\n9\n", output: "NONE\n" },
      { input: "2\n5 5\n", output: "5\n" },
      { input: "5\n-1 -2 -3 -2 -1\n", output: "-2\n" },
      { input: "6\n7 8 9 9 8 7\n", output: "9\n" },
      { input: "5\n0 1 2 3 0\n", output: "0\n" },
      { input: "3\n10 20 30\n", output: "NONE\n" },
      { input: listInput(distinctValues(81, 100000)), output: "NONE\n" },
      (() => { const nums = distinctValues(82, 99999); return { input: listInput([...nums, nums[5]]), output: `${nums[5]}\n` }; })(),
    ],
    starter: "n = int(input())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nnums = list(map(int, input().split()))\nseen = set()\nanswer = 'NONE'\nfor x in nums:\n    if x in seen:\n        answer = x\n        break\n    seen.add(x)\nprint(answer)\n",
  },
  {
    slug: "word-pattern",
    title: "Word Pattern",
    difficulty: "easy",
    topics: ["composite", "strings"],
    leetcode: "https://leetcode.com/problems/word-pattern/",
    statement:
      "You are given a `pattern` of letters and a sentence of words. The sentence **follows** the pattern if each letter can stand for exactly one word so that replacing every letter of the pattern by its word gives the sentence — and no two different letters stand for the same word.\n\nFor example, `abba` is followed by `dog cat cat dog` but not by `dog cat cat fish` or `dog dog dog dog`.",
    inputFormat: "Two lines: the `pattern` (lowercase letters), then the sentence (words separated by single spaces).",
    outputFormat: "Print `True` if the sentence follows the pattern, otherwise `False`.",
    constraints: "1 ≤ len(pattern) ≤ 300\n1 ≤ number of words ≤ 300\nWords contain lowercase English letters only.",
    samples: [
      { input: "abba\ndog cat cat dog\n", output: "True\n", explanation: "`a` ↔ `dog` and `b` ↔ `cat`." },
      { input: "abba\ndog cat cat fish\n", output: "False\n", explanation: "`a` would have to stand for both `dog` and `fish`." },
      { input: "ab\ndog dog\n", output: "False\n", explanation: "`a` and `b` would both stand for `dog`." },
    ],
    tests: [
      { input: "abba\ndog dog dog dog\n", output: "False\n" },
      { input: "a\nhello\n", output: "True\n" },
      { input: "ab\nhello\n", output: "False\n" },
      { input: "abc\nb c a\n", output: "True\n" },
      { input: "aaa\nx x x\n", output: "True\n" },
      { input: "abc\nx x y\n", output: "False\n" },
      { input: "abab\nred blue red blue\n", output: "True\n" },
      { input: "aba\ncat cat cat\n", output: "False\n" },
      { input: "jquery\njquery\n", output: "False\n" },
    ],
    starter: "pattern = input().strip()\nwords = input().split()\n\n# Write your code here\n",
    reference: "pattern = input().strip()\nwords = input().split()\nok = len(pattern) == len(words)\nletter_to_word = {}\nword_to_letter = {}\nif ok:\n    for i in range(len(words)):\n        p = pattern[i]\n        w = words[i]\n        if letter_to_word.get(p, w) != w or word_to_letter.get(w, p) != p:\n            ok = False\n            break\n        letter_to_word[p] = w\n        word_to_letter[w] = p\nprint(ok)\n",
  },
  {
    slug: "group-anagrams",
    title: "Group the Anagrams",
    difficulty: "medium",
    topics: ["composite", "strings"],
    leetcode: "https://leetcode.com/problems/group-anagrams/",
    statement:
      "Group a list of words so that words that are anagrams of each other (same letters, same counts, any order) end up in the same group.\n\nPrint the groups in a fixed order:\n- groups are ordered by where their **first** word appears in the input;\n- inside a group, words keep their input order (a word that appears twice is listed twice).\n\nHint: two words are anagrams exactly when their sorted letters are equal, so `''.join(sorted(word))` makes a good dictionary key.",
    inputFormat: "The first line holds `n`. The second line holds `n` words separated by spaces.",
    outputFormat: "One line per group, with the words of the group separated by single spaces.",
    constraints: "1 ≤ n ≤ 2 × 10^4\n1 ≤ length of each word ≤ 10\nWords contain lowercase English letters only.",
    samples: [
      { input: "6\neat tea tan ate nat bat\n", output: "eat tea ate\ntan nat\nbat\n", explanation: "`eat` starts the first group, `tan` the second and `bat` the third. Inside each group the words keep their input order." },
    ],
    tests: [
      { input: "1\na\n", output: "a\n" },
      { input: "3\nabc def ghi\n", output: "abc\ndef\nghi\n" },
      { input: "4\nab ba ab ba\n", output: "ab ba ab ba\n" },
      { input: "5\nlisten silent enlist google gogole\n", output: "listen silent enlist\ngoogle gogole\n" },
      { input: "6\nabc bca cab xyz zyx a\n", output: "abc bca cab\nxyz zyx\na\n" },
      { input: "4\na b a b\n", output: "a a\nb b\n" },
      { input: "8\nstop pots tops opts spot post star rats\n", output: "stop pots tops opts spot post\nstar rats\n" },
      groupAnagramsCase(91, 20000, "abcde", 3, 5),
      groupAnagramsCase(92, 20000, "abcdefg", 4, 7),
    ],
    starter: "n = int(input())\nwords = input().split()\n\n# Write your code here\n",
    reference: "n = int(input())\nwords = input().split()\ngroups = {}\nfor w in words:\n    key = ''.join(sorted(w))\n    if key not in groups:\n        groups[key] = []\n    groups[key].append(w)\nfor group in groups.values():\n    print(' '.join(group))\n",
    timeLimitMs: 3000,
  },
  {
    slug: "top-k-frequent",
    title: "Top K Frequent Numbers",
    difficulty: "medium",
    topics: ["composite", "search-sort"],
    leetcode: "https://leetcode.com/problems/top-k-frequent-elements/",
    statement:
      "Given a list of integers and a number `k`, find the `k` values that appear most often.\n\nOrder the answer by frequency, most frequent first. When two values appear the same number of times, the **smaller value comes first**.\n\nCount with a dictionary, then sort. (Sorting a list of `(-count, value)` tuples gives exactly this order.) Calling `nums.count(x)` for every distinct `x` is too slow for 10^5 numbers.",
    inputFormat: "The first line holds `n` and `k`. The second line holds the `n` integers separated by spaces.",
    outputFormat: "The `k` values on one line, separated by single spaces, in the order described.",
    constraints: "1 ≤ n ≤ 10^5\n-10^4 ≤ each number ≤ 10^4\n1 ≤ k ≤ number of distinct values",
    samples: [
      { input: "6 2\n1 1 1 2 2 3\n", output: "1 2\n", explanation: "`1` appears 3 times and `2` appears twice." },
      { input: "6 2\n7 5 5 7 6 4\n", output: "5 7\n", explanation: "`5` and `7` both appear twice. They tie, so the smaller value `5` comes first." },
    ],
    tests: [
      { input: "1 1\n7\n", output: "7\n" },
      { input: "5 3\n5 4 3 2 1\n", output: "1 2 3\n" },
      { input: "6 1\n-1 -1 2 2 3 3\n", output: "-1\n" },
      { input: "8 2\n3 3 3 -2 -2 -2 9 9\n", output: "-2 3\n" },
      { input: "7 3\n1 2 2 3 3 3 4\n", output: "3 2 1\n" },
      { input: "10 4\n8 8 -8 -8 -8 0 0 0 0 5\n", output: "0 -8 8 5\n" },
      topKCase(101, 100000, 10, false),
      topKCase(102, 100000, 50, true),
    ],
    starter: "n, k = map(int, input().split())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n, k = map(int, input().split())\nnums = list(map(int, input().split()))\ncounts = {}\nfor x in nums:\n    counts[x] = counts.get(x, 0) + 1\npairs = []\nfor x in counts:\n    pairs.append((-counts[x], x))\npairs.sort()\nanswer = []\nfor i in range(k):\n    answer.append(str(pairs[i][1]))\nprint(' '.join(answer))\n",
    timeLimitMs: 3000,
  },
];
