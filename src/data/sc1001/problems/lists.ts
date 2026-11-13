import type { CodingProblem } from "@/lib/sc1001/types";

// Deterministic pseudo-random generator for the large hidden tests: r(lo, hi) is an integer in [lo, hi].
function rng(seed: number) {
  let s = seed >>> 0;
  return (lo: number, hi: number) => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return lo + ((s >>> 8) % (hi - lo + 1));
  };
}
const randomList = (seed: number, n: number, lo: number, hi: number) => {
  const r = rng(seed);
  return Array.from({ length: n }, () => r(lo, hi));
};
function shuffled<T>(seed: number, items: T[]): T[] {
  const r = rng(seed);
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = r(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const listInput = (nums: number[], first = `${nums.length}`) => `${first}\n${nums.join(" ")}\n`;

// Two Sum: every value is a multiple of 4 except one value ≡ 1 and one ≡ 2 (mod 4), so the only pair
// summing to a number ≡ 3 (mod 4) is that pair.
function twoSumCase(seed: number, n: number, i: number, j: number) {
  const r = rng(seed);
  const nums = Array.from({ length: n }, () => 4 * r(-250000, 250000));
  nums[i] = 4 * r(-1000, 1000) + 1;
  nums[j] = 4 * r(-1000, 1000) + 2;
  return { input: listInput(nums, `${n} ${nums[i] + nums[j]}`), output: `${Math.min(i, j)} ${Math.max(i, j)}\n` };
}
function maxProfit(prices: number[]): number {
  let lowest = prices[0];
  let best = 0;
  for (const p of prices) {
    lowest = Math.min(lowest, p);
    best = Math.max(best, p - lowest);
  }
  return best;
}
function productsExceptSelf(nums: number[]): number[] {
  const out = new Array<number>(nums.length).fill(1);
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    out[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out.map((x) => (x === 0 ? 0 : x)); // no "-0"
}
// Mostly ±1 with twenty 2s and ten 3s, so every product stays below 2^53 and is exact in JS.
function productList(seed: number, n: number, zeroAt?: number): number[] {
  const r = rng(seed);
  const nums: number[] = Array.from({ length: n }, () => (r(0, 9) < 7 ? 1 : -1));
  for (let k = 0; k < 20; k++) nums[r(0, n - 1)] = 2;
  for (let k = 0; k < 10; k++) nums[r(0, n - 1)] = 3;
  if (zeroAt !== undefined) nums[zeroAt] = 0;
  return nums;
}
function kadane(nums: number[]): number {
  let best = nums[0];
  let cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}

export const listsProblems: CodingProblem[] = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "medium",
    topics: ["composite", "complexity"],
    leetcode: "https://leetcode.com/problems/two-sum/",
    statement:
      "You are given a list of `n` integers `nums` and a `target`. Exactly one pair of **different positions** `i < j` has `nums[i] + nums[j] == target`. Find that pair.\n\nWith up to 10^5 numbers, trying every pair is too slow. Hint: walk through the list once, and for each number ask a dictionary whether its partner `target - nums[j]` has already been seen (and at which index).",
    inputFormat: "The first line holds `n` and `target`. The second line holds the `n` integers of `nums`, separated by spaces.",
    outputFormat: "Print the two indices `i j` (0-based, `i < j`) separated by a space.",
    constraints: "2 ≤ n ≤ 10^5\n-10^9 ≤ nums[i], target ≤ 10^9\nExactly one valid pair exists.",
    samples: [
      { input: "4 9\n2 7 11 15\n", output: "0 1\n", explanation: "`nums[0] + nums[1] = 2 + 7 = 9`." },
      { input: "3 6\n3 2 4\n", output: "1 2\n" },
    ],
    tests: [
      { input: "2 6\n3 3\n", output: "0 1\n" },
      { input: "5 0\n-3 4 3 90 -10\n", output: "0 2\n" },
      { input: "2 -5\n-2 -3\n", output: "0 1\n" },
      { input: "6 10\n1 2 3 4 5 6\n", output: "3 5\n" },
      { input: "5 100\n50 1 2 3 50\n", output: "0 4\n" },
      { input: "4 2\n0 -1 3 5\n", output: "1 2\n" },
      twoSumCase(11, 100000, 99998, 99999),
      twoSumCase(12, 100000, 99999, 50000),
      twoSumCase(13, 100000, 0, 99999),
    ],
    starter: "n, target = map(int, input().split())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n, target = map(int, input().split())\nnums = list(map(int, input().split()))\nseen = {}\nfor j in range(n):\n    need = target - nums[j]\n    if need in seen:\n        print(seen[need], j)\n        break\n    seen[nums[j]] = j\n",
    timeLimitMs: 3000,
  },
  {
    slug: "best-time-to-buy-and-sell",
    title: "Best Time to Buy and Sell",
    difficulty: "easy",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    statement:
      "`prices[i]` is the price of a share on day `i`. You may buy one share on some day and sell it on a **later** day. Find the largest profit you can make. If no trade makes money, the answer is 0 (you simply don't trade).\n\nOne pass is enough: remember the lowest price seen so far and, for each day, check the profit of selling on that day.",
    inputFormat: "The first line holds `n`, the number of days. The second line holds `n` integers, the prices.",
    outputFormat: "A single integer: the maximum profit.",
    constraints: "1 ≤ n ≤ 10^5\n0 ≤ prices[i] ≤ 10^4",
    samples: [
      { input: "6\n7 1 5 3 6 4\n", output: "5\n", explanation: "Buy on day 2 (price 1) and sell on day 5 (price 6) for a profit of 5. You cannot sell at 7 because day 1 comes before you buy." },
      { input: "5\n7 6 4 3 1\n", output: "0\n", explanation: "Prices only go down, so the best is to not trade at all." },
    ],
    tests: [
      { input: "1\n5\n", output: "0\n" },
      { input: "2\n1 2\n", output: "1\n" },
      { input: "2\n2 1\n", output: "0\n" },
      { input: "6\n3 3 3 3 3 3\n", output: "0\n" },
      { input: "7\n2 4 1 7 5 3 6\n", output: "6\n" },
      { input: "5\n1 2 3 4 5\n", output: "4\n" },
      { input: "8\n9 2 8 1 3 4 2 7\n", output: "6\n" },
      (() => { const p = randomList(31, 100000, 0, 10000); return { input: listInput(p), output: `${maxProfit(p)}\n` }; })(),
      (() => { const p = Array.from({ length: 100000 }, (_, i) => 10000 - Math.floor(i / 10)); return { input: listInput(p), output: `${maxProfit(p)}\n` }; })(),
    ],
    starter: "n = int(input())\nprices = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nprices = list(map(int, input().split()))\nlowest = prices[0]\nbest = 0\nfor p in prices:\n    if p < lowest:\n        lowest = p\n    if p - lowest > best:\n        best = p - lowest\nprint(best)\n",
  },
  {
    slug: "move-zeroes",
    title: "Move Zeroes to the End",
    difficulty: "easy",
    topics: ["composite"],
    leetcode: "https://leetcode.com/problems/move-zeroes/",
    statement:
      "Given a list of integers, move every `0` to the end of the list while keeping the other numbers in their original relative order.",
    inputFormat: "The first line holds `n`. The second line holds `n` integers separated by spaces.",
    outputFormat: "The rearranged list on one line, numbers separated by single spaces.",
    constraints: "1 ≤ n ≤ 10^4\n-10^9 ≤ each number ≤ 10^9",
    samples: [
      { input: "5\n0 1 0 3 12\n", output: "1 3 12 0 0\n" },
    ],
    tests: [
      { input: "1\n0\n", output: "0\n" },
      { input: "1\n5\n", output: "5\n" },
      { input: "3\n0 0 0\n", output: "0 0 0\n" },
      { input: "4\n1 2 3 4\n", output: "1 2 3 4\n" },
      { input: "6\n0 0 1 -2 0 3\n", output: "1 -2 3 0 0 0\n" },
      { input: "5\n4 0 0 0 0\n", output: "4 0 0 0 0\n" },
      { input: "7\n0 -1 0 -1 0 2 2\n", output: "-1 -1 2 2 0 0 0\n" },
    ],
    starter: "n = int(input())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nnums = list(map(int, input().split()))\nresult = []\nfor x in nums:\n    if x != 0:\n        result.append(x)\nwhile len(result) < n:\n    result.append(0)\nprint(' '.join(str(x) for x in result))\n",
  },
  {
    slug: "missing-number",
    title: "Missing Number",
    difficulty: "easy",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/missing-number/",
    statement:
      "A list holds `n` **distinct** integers, all taken from the range `0, 1, 2, …, n`. That range has `n + 1` numbers, so exactly one of them is missing. Find it.",
    inputFormat: "The first line holds `n`. The second line holds the `n` integers in any order.",
    outputFormat: "The missing integer.",
    constraints: "1 ≤ n ≤ 10^5",
    samples: [
      { input: "3\n3 0 1\n", output: "2\n", explanation: "The numbers should be 0, 1, 2, 3; `2` is missing." },
      { input: "9\n9 6 4 2 3 5 7 0 1\n", output: "8\n" },
    ],
    tests: [
      { input: "1\n0\n", output: "1\n" },
      { input: "1\n1\n", output: "0\n" },
      { input: "2\n0 1\n", output: "2\n" },
      { input: "2\n2 0\n", output: "1\n" },
      { input: "5\n5 4 3 2 1\n", output: "0\n" },
      { input: "6\n0 1 2 3 4 5\n", output: "6\n" },
      (() => { const nums = shuffled(41, Array.from({ length: 100001 }, (_, i) => i).filter((x) => x !== 31337)); return { input: listInput(nums), output: "31337\n" }; })(),
    ],
    starter: "n = int(input())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nnums = list(map(int, input().split()))\nprint(n * (n + 1) // 2 - sum(nums))\n",
  },
  {
    slug: "product-except-self",
    title: "Product of the Others",
    difficulty: "medium",
    topics: ["composite", "complexity"],
    leetcode: "https://leetcode.com/problems/product-of-array-except-self/",
    statement:
      "Given a list `nums` of `n` integers, build a list `answer` where `answer[i]` is the product of every element of `nums` **except** `nums[i]`.\n\nDon't divide (the list may contain zeros), and don't recompute each product from scratch: with `n` up to 10^5 that is far too slow. Hint: `answer[i]` = (product of everything to the left of `i`) × (product of everything to the right of `i`), and both can be built up in one pass each.",
    inputFormat: "The first line holds `n`. The second line holds the `n` integers separated by spaces.",
    outputFormat: "The `n` values of `answer` on one line, separated by single spaces.",
    constraints: "2 ≤ n ≤ 10^5\n-30 ≤ nums[i] ≤ 30\nEvery value of `answer` fits in a 64-bit integer.",
    samples: [
      { input: "4\n1 2 3 4\n", output: "24 12 8 6\n", explanation: "For index 0: 2 × 3 × 4 = 24. For index 1: 1 × 3 × 4 = 12, and so on." },
      { input: "5\n-1 1 0 -3 3\n", output: "0 0 9 0 0\n", explanation: "Every product except the one that skips the `0` contains the `0`." },
    ],
    tests: [
      { input: "2\n3 5\n", output: "5 3\n" },
      { input: "2\n0 0\n", output: "0 0\n" },
      { input: "3\n0 2 3\n", output: "6 0 0\n" },
      { input: "4\n-1 -2 -3 -4\n", output: "-24 -12 -8 -6\n" },
      { input: "5\n2 2 2 2 2\n", output: "16 16 16 16 16\n" },
      { input: "6\n1 -1 1 -1 1 -1\n", output: "-1 1 -1 1 -1 1\n" },
      { input: "4\n0 4 0 2\n", output: "0 0 0 0\n" },
      (() => { const nums = productList(51, 100000); return { input: listInput(nums), output: productsExceptSelf(nums).join(" ") + "\n" }; })(),
      (() => { const nums = productList(52, 100000, 76543); return { input: listInput(nums), output: productsExceptSelf(nums).join(" ") + "\n" }; })(),
    ],
    starter: "n = int(input())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nnums = list(map(int, input().split()))\nresult = [1] * n\nprefix = 1\nfor i in range(n):\n    result[i] = prefix\n    prefix *= nums[i]\nsuffix = 1\nfor i in range(n - 1, -1, -1):\n    result[i] *= suffix\n    suffix *= nums[i]\nprint(' '.join(str(x) for x in result))\n",
    timeLimitMs: 3000,
  },
  {
    slug: "maximum-subarray",
    title: "Maximum Subarray Sum",
    difficulty: "medium",
    topics: ["composite", "complexity"],
    leetcode: "https://leetcode.com/problems/maximum-subarray/",
    statement:
      "Given a list of integers, find the largest possible sum of a **non-empty** run of consecutive elements.\n\nWith up to 10^5 numbers, adding up every possible run is too slow. Hint: scan once, keeping the best sum of a run that **ends at the current position** — either extend the previous run or start a new one here, whichever is larger.",
    inputFormat: "The first line holds `n`. The second line holds `n` integers separated by spaces.",
    outputFormat: "A single integer: the maximum subarray sum.",
    constraints: "1 ≤ n ≤ 10^5\n-10^4 ≤ each number ≤ 10^4",
    samples: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4\n", output: "6\n", explanation: "The subarray `4 -1 2 1` has the largest sum, 6." },
      { input: "1\n1\n", output: "1\n" },
    ],
    tests: [
      { input: "1\n-7\n", output: "-7\n" },
      { input: "3\n-3 -1 -2\n", output: "-1\n" },
      { input: "5\n5 4 -1 7 8\n", output: "23\n" },
      { input: "4\n1 2 3 4\n", output: "10\n" },
      { input: "6\n-1 3 -2 5 -10 4\n", output: "6\n" },
      { input: "5\n0 0 0 0 0\n", output: "0\n" },
      (() => { const nums = randomList(61, 100000, -10000, 10000); return { input: listInput(nums), output: `${kadane(nums)}\n` }; })(),
      (() => { const nums = randomList(62, 100000, -10000, -1); return { input: listInput(nums), output: `${kadane(nums)}\n` }; })(),
      (() => { const nums = randomList(63, 100000, -9000, 10000); return { input: listInput(nums), output: `${kadane(nums)}\n` }; })(),
    ],
    starter: "n = int(input())\nnums = list(map(int, input().split()))\n\n# Write your code here\n",
    reference: "n = int(input())\nnums = list(map(int, input().split()))\nbest = nums[0]\ncurrent = nums[0]\nfor x in nums[1:]:\n    current = max(x, current + x)\n    best = max(best, current)\nprint(best)\n",
    timeLimitMs: 3000,
  },
];
