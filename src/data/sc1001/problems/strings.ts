import type { CodingProblem } from "@/lib/sc1001/types";

// Deterministic pseudo-random generator for the large hidden tests: r(lo, hi) is an integer in [lo, hi].
function rng(seed: number) {
  let s = seed >>> 0;
  return (lo: number, hi: number) => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return lo + ((s >>> 8) % (hi - lo + 1));
  };
}
const randomString = (seed: number, length: number, alphabet: string) => {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[r(0, alphabet.length - 1)];
  return out;
};
const reversed = (s: string) => s.split("").reverse().join("");
function longestUnique(s: string): number {
  const last = new Map<string, number>();
  let start = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const prev = last.get(s[i]);
    if (prev !== undefined && prev >= start) start = prev + 1;
    last.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}
const ALNUM = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const PRINTABLE = Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i)).join(""); // '!' .. '~', no spaces

const palHalf = randomString(7, 50000, ALNUM + " ,.!?'");

export const stringsProblems: CodingProblem[] = [
  {
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "easy",
    topics: ["strings"],
    leetcode: "https://leetcode.com/problems/valid-palindrome/",
    statement:
      "A sentence counts as a palindrome if, after throwing away every character that is not a letter or a digit and ignoring upper/lower case, it reads the same forwards and backwards.\n\nGiven a line of text, decide whether it is a palindrome in this sense. A line with no letters or digits at all counts as a palindrome.",
    inputFormat: "One line of text `s` (it may contain spaces and punctuation, and may be empty).",
    outputFormat: "Print `True` if `s` is a palindrome as described, otherwise `False`.",
    constraints: "0 ≤ len(s) ≤ 10^5\n`s` contains printable ASCII characters only.",
    samples: [
      { input: "A man, a plan, a canal: Panama\n", output: "True\n", explanation: "Keeping only letters and digits in lowercase gives `amanaplanacanalpanama`, which reads the same backwards." },
      { input: "race a car\n", output: "False\n", explanation: "`raceacar` reversed is `racaecar`." },
    ],
    tests: [
      { input: "\n", output: "True\n" },
      { input: "a\n", output: "True\n" },
      { input: "ab\n", output: "False\n" },
      { input: "0P\n", output: "False\n" },
      { input: ".,!?\n", output: "True\n" },
      { input: "No 'x' in Nixon\n", output: "True\n" },
      { input: "Was it a car or a cat I saw?\n", output: "True\n" },
      { input: "12321\n", output: "True\n" },
      { input: "123 21!\n", output: "True\n" },
      { input: "abcCBA\n", output: "True\n" },
      { input: palHalf + reversed(palHalf) + "\n", output: "True\n" },
      { input: palHalf + "xy" + reversed(palHalf) + "\n", output: "False\n" },
    ],
    starter: "s = input()\n\n# Write your code here\n",
    reference: "s = input()\nchars = []\nfor c in s:\n    if c.isalnum():\n        chars.append(c.lower())\nprint(chars == chars[::-1])\n",
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "easy",
    topics: ["strings", "composite"],
    leetcode: "https://leetcode.com/problems/valid-anagram/",
    statement:
      "Two words are **anagrams** if one can be formed by rearranging all the letters of the other, using each letter exactly as many times as it appears. Given two words `s` and `t`, decide whether they are anagrams of each other.",
    inputFormat: "Two lines: the word `s`, then the word `t`.",
    outputFormat: "Print `True` if `s` and `t` are anagrams, otherwise `False`.",
    constraints: "1 ≤ len(s), len(t) ≤ 10^5\nBoth words contain lowercase English letters only.",
    samples: [
      { input: "listen\nsilent\n", output: "True\n" },
      { input: "rat\ncar\n", output: "False\n", explanation: "`rat` has a `t` but `car` has a `c` instead." },
    ],
    tests: [
      { input: "a\na\n", output: "True\n" },
      { input: "a\nb\n", output: "False\n" },
      { input: "ab\na\n", output: "False\n" },
      { input: "aab\naba\n", output: "True\n" },
      { input: "aabb\nabbb\n", output: "False\n" },
      { input: "anagram\nnagaram\n", output: "True\n" },
      { input: "abcdefghijklmnopqrstuvwxyz\nzyxwvutsrqponmlkjihgfedcba\n", output: "True\n" },
      { input: "aaaaab\naaaaaa\n", output: "False\n" },
    ],
    starter: "s = input().strip()\nt = input().strip()\n\n# Write your code here\n",
    reference: "s = input().strip()\nt = input().strip()\ncounts = {}\nfor c in s:\n    counts[c] = counts.get(c, 0) + 1\nfor c in t:\n    counts[c] = counts.get(c, 0) - 1\nok = True\nfor v in counts.values():\n    if v != 0:\n        ok = False\nprint(ok)\n",
  },
  {
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "easy",
    topics: ["strings", "repetition"],
    leetcode: "https://leetcode.com/problems/longest-common-prefix/",
    statement:
      "Given `n` words, find the longest string that every word starts with. If the words have no common first letter, there is no common prefix.",
    inputFormat: "The first line holds `n`. Each of the next `n` lines holds one word.",
    outputFormat: "Print the longest common prefix, or `NONE` if it is empty.",
    constraints: "1 ≤ n ≤ 200\n1 ≤ length of each word ≤ 200\nWords contain lowercase English letters only.",
    samples: [
      { input: "3\nflower\nflow\nflight\n", output: "fl\n" },
      { input: "3\ndog\nracecar\ncar\n", output: "NONE\n", explanation: "The words do not even share their first letter." },
    ],
    tests: [
      { input: "1\nalone\n", output: "alone\n" },
      { input: "2\nsame\nsame\n", output: "same\n" },
      { input: "2\nab\na\n", output: "a\n" },
      { input: "3\ninterview\ninternet\ninternal\n", output: "inter\n" },
      { input: "2\na\nb\n", output: "NONE\n" },
      { input: "4\nprefix\nprefixes\nprefixed\npre\n", output: "pre\n" },
      { input: "3\nabc\nabcd\nab\n", output: "ab\n" },
      { input: "5\nclass\nclassic\nclassroom\nclassy\nclasses\n", output: "class\n" },
      { input: "3\nxyz\nxy\nabc\n", output: "NONE\n" },
    ],
    starter: "n = int(input())\nwords = []\nfor _ in range(n):\n    words.append(input().strip())\n\n# Write your code here\n",
    reference: "n = int(input())\nwords = []\nfor _ in range(n):\n    words.append(input().strip())\nprefix = words[0]\nfor w in words[1:]:\n    while not w.startswith(prefix):\n        prefix = prefix[:-1]\nif prefix:\n    print(prefix)\nelse:\n    print('NONE')\n",
  },
  {
    slug: "reverse-words",
    title: "Reverse the Words",
    difficulty: "easy",
    topics: ["strings", "composite"],
    leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/",
    statement:
      "Given a line of words, print the words in reverse order. Words are separated by one or more spaces, and the line may start or end with spaces. The words themselves are not reversed.",
    inputFormat: "One line of text containing at least one word.",
    outputFormat: "The words in reverse order, separated by exactly one space, with no leading or trailing spaces.",
    constraints: "1 ≤ length of the line ≤ 10^4\nA word is a run of non-space characters.",
    samples: [
      { input: "the sky is blue\n", output: "blue is sky the\n" },
      { input: "  hello   world  \n", output: "world hello\n", explanation: "Extra spaces are removed: the output has exactly one space between words and none at the start." },
    ],
    tests: [
      { input: "single\n", output: "single\n" },
      { input: "a b\n", output: "b a\n" },
      { input: "  lots   of    spaces here \n", output: "here spaces of lots\n" },
      { input: "Python is FUN\n", output: "FUN is Python\n" },
      { input: "one two three four five six seven\n", output: "seven six five four three two one\n" },
      { input: "   leading\n", output: "leading\n" },
      { input: "a good   example\n", output: "example good a\n" },
    ],
    starter: "line = input()\n\n# Write your code here\n",
    reference: "words = input().split()\nwords.reverse()\nprint(' '.join(words))\n",
  },
  {
    slug: "roman-to-integer",
    title: "Roman Numeral to Integer",
    difficulty: "easy",
    topics: ["strings", "composite"],
    leetcode: "https://leetcode.com/problems/roman-to-integer/",
    statement:
      "Roman numerals use the symbols `I` = 1, `V` = 5, `X` = 10, `L` = 50, `C` = 100, `D` = 500 and `M` = 1000. Symbols are usually written from largest to smallest and added up, so `XII` = 12. When a smaller symbol appears directly before a larger one, it is subtracted instead: `IV` = 4, `IX` = 9, `XL` = 40, `XC` = 90, `CD` = 400, `CM` = 900.\n\nConvert a valid Roman numeral to an ordinary integer.",
    inputFormat: "One line holding a valid Roman numeral `s`.",
    outputFormat: "The integer value of `s`.",
    constraints: "The value of `s` is between 1 and 3999.",
    samples: [
      { input: "III\n", output: "3\n" },
      { input: "LVIII\n", output: "58\n", explanation: "L = 50, V = 5, III = 3." },
      { input: "MCMXCIV\n", output: "1994\n", explanation: "M = 1000, CM = 900, XC = 90, IV = 4, so the total is 1994." },
    ],
    tests: [
      { input: "I\n", output: "1\n" },
      { input: "IV\n", output: "4\n" },
      { input: "IX\n", output: "9\n" },
      { input: "XL\n", output: "40\n" },
      { input: "XC\n", output: "90\n" },
      { input: "CD\n", output: "400\n" },
      { input: "CM\n", output: "900\n" },
      { input: "MMMCMXCIX\n", output: "3999\n" },
      { input: "DCCCXC\n", output: "890\n" },
      { input: "MMXXVI\n", output: "2026\n" },
      { input: "XLIX\n", output: "49\n" },
    ],
    starter: "s = input().strip()\n\n# Write your code here\n",
    reference: "values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\ns = input().strip()\ntotal = 0\nfor i in range(len(s)):\n    if i + 1 < len(s) and values[s[i]] < values[s[i + 1]]:\n        total -= values[s[i]]\n    else:\n        total += values[s[i]]\nprint(total)\n",
  },
  {
    slug: "longest-unique-substring",
    title: "Longest Substring Without Repeats",
    difficulty: "medium",
    topics: ["strings", "composite", "complexity"],
    leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    statement:
      "Given a string `s`, find the length of the longest **substring** (a run of consecutive characters) in which no character appears twice.\n\n`s` can be 10^5 characters long, so checking every possible substring is far too slow. Try a **sliding window**: move a right end across the string, and whenever the new character is already inside the window, move the left end just past its previous position. A dictionary of last-seen positions makes this fast.",
    inputFormat: "One line holding the string `s` (no spaces).",
    outputFormat: "A single integer: the length of the longest substring without repeated characters.",
    constraints: "1 ≤ len(s) ≤ 10^5\n`s` contains printable ASCII characters other than space.",
    samples: [
      { input: "abcabcbb\n", output: "3\n", explanation: "`abc` is the longest substring with no repeated characters." },
      { input: "bbbbb\n", output: "1\n" },
      { input: "pwwkew\n", output: "3\n", explanation: "`wke` has length 3. Note that `pwke` is not a substring: its characters are not next to each other in `s`." },
    ],
    tests: [
      { input: "a\n", output: "1\n" },
      { input: "au\n", output: "2\n" },
      { input: "dvdf\n", output: "3\n" },
      { input: "abba\n", output: "2\n" },
      { input: "tmmzuxt\n", output: "5\n" },
      { input: "abcdefg\n", output: "7\n" },
      { input: "aab\n", output: "2\n" },
      (() => { const s = randomString(21, 100000, ALNUM); return { input: s + "\n", output: `${longestUnique(s)}\n` }; })(),
      (() => { const s = PRINTABLE.repeat(1000); return { input: s + "\n", output: `${longestUnique(s)}\n` }; })(),
      (() => { const s = "a".repeat(50000) + PRINTABLE + "z".repeat(40000); return { input: s + "\n", output: `${longestUnique(s)}\n` }; })(),
    ],
    starter: "s = input().strip()\n\n# Write your code here\n",
    reference: "s = input().strip()\nlast_seen = {}\nstart = 0\nbest = 0\nfor i in range(len(s)):\n    c = s[i]\n    if c in last_seen and last_seen[c] >= start:\n        start = last_seen[c] + 1\n    last_seen[c] = i\n    if i - start + 1 > best:\n        best = i - start + 1\nprint(best)\n",
    timeLimitMs: 3000,
  },
];
