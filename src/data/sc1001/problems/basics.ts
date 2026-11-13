import type { CodingProblem } from "@/lib/sc1001/types";

// Expected outputs for the larger hidden tests, computed here instead of pasted as huge literals.
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
function leapOutput(a: number, b: number): string {
  const years: number[] = [];
  for (let y = a; y <= b; y++) if (isLeap(y)) years.push(y);
  return years.length ? `${years.length}\n${years.join(" ")}\n` : "0\n";
}
function floydOutput(n: number): string {
  const rows: string[] = [];
  let k = 1;
  for (let row = 1; row <= n; row++) {
    const nums: number[] = [];
    for (let i = 0; i < row; i++) nums.push(k++);
    rows.push(nums.join(" "));
  }
  return rows.join("\n") + "\n";
}

export const basicsProblems: CodingProblem[] = [
  {
    slug: "fizzbuzz",
    title: "Fizz Buzz",
    difficulty: "easy",
    topics: ["repetition", "boolean-selection"],
    leetcode: "https://leetcode.com/problems/fizz-buzz/",
    statement:
      "Given an integer `n`, print the numbers from 1 to `n`, one per line, but:\n- print `FizzBuzz` instead of numbers divisible by both 3 and 5,\n- print `Fizz` instead of numbers divisible by 3 only,\n- print `Buzz` instead of numbers divisible by 5 only.",
    inputFormat: "A single integer `n`.",
    outputFormat: "`n` lines as described.",
    constraints: "1 ≤ n ≤ 10^4",
    samples: [{ input: "5\n", output: "1\n2\nFizz\n4\nBuzz\n" }],
    tests: [
      { input: "1\n", output: "1\n" },
      { input: "3\n", output: "1\n2\nFizz\n" },
      { input: "15\n", output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n" },
      { input: "10\n", output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n" },
      { input: "16\n", output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n" },
      { input: "30\n", output: Array.from({ length: 30 }, (_, i) => { const k = i + 1; return k % 15 === 0 ? "FizzBuzz" : k % 3 === 0 ? "Fizz" : k % 5 === 0 ? "Buzz" : String(k); }).join("\n") + "\n" },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference:
      "n = int(input())\nfor k in range(1, n + 1):\n    if k % 15 == 0:\n        print('FizzBuzz')\n    elif k % 3 == 0:\n        print('Fizz')\n    elif k % 5 == 0:\n        print('Buzz')\n    else:\n        print(k)\n",
  },
  {
    slug: "leap-years-in-range",
    title: "Leap Years in a Range",
    difficulty: "easy",
    topics: ["boolean-selection", "repetition"],
    statement:
      "A year is a **leap year** if it is divisible by 4, except that years divisible by 100 are only leap years when they are also divisible by 400. So 2024 and 2000 are leap years, but 1900 is not.\n\nGiven two years `a` and `b`, find every leap year from `a` to `b` inclusive.",
    inputFormat: "One line with two integers `a` and `b`, separated by a space.",
    outputFormat:
      "On the first line, print how many leap years there are. If there is at least one, print them on a second line in increasing order, separated by single spaces. If there are none, print only `0`.",
    constraints: "1 ≤ a ≤ b ≤ 10^4",
    samples: [
      { input: "2000 2012\n", output: "4\n2000 2004 2008 2012\n", explanation: "2000 is divisible by 400, so it is a leap year. 2004, 2008 and 2012 are divisible by 4 but not by 100." },
      { input: "1897 1903\n", output: "0\n", explanation: "1900 is divisible by 100 but not by 400, so it is **not** a leap year. There are no leap years in the range, so only `0` is printed." },
    ],
    tests: [
      { input: "1900 1900\n", output: "0\n" },
      { input: "2024 2024\n", output: "1\n2024\n" },
      { input: "2001 2003\n", output: "0\n" },
      { input: "1896 1912\n", output: "4\n1896 1904 1908 1912\n" },
      { input: "1 100\n", output: "24\n4 8 12 16 20 24 28 32 36 40 44 48 52 56 60 64 68 72 76 80 84 88 92 96\n" },
      { input: "1599 1601\n", output: "1\n1600\n" },
      { input: "2100 2100\n", output: "0\n" },
      { input: "1700 2000\n", output: "73\n1704 1708 1712 1716 1720 1724 1728 1732 1736 1740 1744 1748 1752 1756 1760 1764 1768 1772 1776 1780 1784 1788 1792 1796 1804 1808 1812 1816 1820 1824 1828 1832 1836 1840 1844 1848 1852 1856 1860 1864 1868 1872 1876 1880 1884 1888 1892 1896 1904 1908 1912 1916 1920 1924 1928 1932 1936 1940 1944 1948 1952 1956 1960 1964 1968 1972 1976 1980 1984 1988 1992 1996 2000\n" },
      { input: "2396 2404\n", output: "3\n2396 2400 2404\n" },
      { input: "1 10000\n", output: leapOutput(1, 10000) },
    ],
    starter: "a, b = map(int, input().split())\n\n# Write your code here\n",
    reference: "a, b = map(int, input().split())\nleap_years = []\nfor year in range(a, b + 1):\n    if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n        leap_years.append(str(year))\nprint(len(leap_years))\nif leap_years:\n    print(' '.join(leap_years))\n",
  },
  {
    slug: "floyds-triangle",
    title: "Floyd's Triangle",
    difficulty: "easy",
    topics: ["repetition"],
    statement:
      "Print a triangle of `n` rows filled with consecutive integers starting from 1. Row 1 holds one number, row 2 holds the next two numbers, row 3 the next three, and so on.",
    inputFormat: "A single integer `n`.",
    outputFormat: "`n` lines. Line `i` contains `i` integers separated by single spaces.",
    constraints: "1 ≤ n ≤ 60",
    samples: [
      { input: "4\n", output: "1\n2 3\n4 5 6\n7 8 9 10\n", explanation: "Row 1 has one number, row 2 has two numbers, and so on. The numbers keep counting up from where the previous row stopped." },
    ],
    tests: [
      { input: "1\n", output: "1\n" },
      { input: "2\n", output: "1\n2 3\n" },
      { input: "3\n", output: "1\n2 3\n4 5 6\n" },
      { input: "5\n", output: "1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15\n" },
      { input: "7\n", output: "1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15\n16 17 18 19 20 21\n22 23 24 25 26 27 28\n" },
      { input: "10\n", output: "1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15\n16 17 18 19 20 21\n22 23 24 25 26 27 28\n29 30 31 32 33 34 35 36\n37 38 39 40 41 42 43 44 45\n46 47 48 49 50 51 52 53 54 55\n" },
      { input: "15\n", output: "1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15\n16 17 18 19 20 21\n22 23 24 25 26 27 28\n29 30 31 32 33 34 35 36\n37 38 39 40 41 42 43 44 45\n46 47 48 49 50 51 52 53 54 55\n56 57 58 59 60 61 62 63 64 65 66\n67 68 69 70 71 72 73 74 75 76 77 78\n79 80 81 82 83 84 85 86 87 88 89 90 91\n92 93 94 95 96 97 98 99 100 101 102 103 104 105\n106 107 108 109 110 111 112 113 114 115 116 117 118 119 120\n" },
      { input: "40\n", output: floydOutput(40) },
      { input: "60\n", output: floydOutput(60) },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference: "n = int(input())\nk = 1\nfor row in range(1, n + 1):\n    numbers = []\n    for _ in range(row):\n        numbers.append(str(k))\n        k += 1\n    print(' '.join(numbers))\n",
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    difficulty: "easy",
    topics: ["functions", "repetition", "types-vars-io"],
    statement:
      "A shop is running a sale where every item has its own discount rate. Write a program that keeps reading items until the user types `End`, prints the discounted price of each item, and finally prints the total of all discounted prices.\n\nThe discounted price of an item with original price `p` and discount rate `r`% is `p × (100 − r) / 100`. Try writing a function `discounted_price(price, rate)` that returns it, so the formula lives in one place.\n\nThe sentinel `End` may be typed in any mix of upper and lower case (`End`, `end`, `END`, …).",
    inputFormat:
      "Zero or more lines, each with an item `label` (one word), its original `price` (a number with at most 2 decimal places) and its discount `rate` (an integer percentage), separated by spaces. The last line is the word `End` (in any letter case).",
    outputFormat:
      "For each item, in input order, print `label: original -> discounted` with both prices shown to exactly 2 decimal places. Then print `Total: T` where `T` is the sum of the discounted prices, to 2 decimal places.",
    constraints: "0 ≤ number of items ≤ 50\n0 < price ≤ 2000\n0 ≤ rate ≤ 100\nEvery discounted price is a whole number of cents, so there is no rounding ambiguity.",
    samples: [
      { input: "Shirt 50.00 20\nShoes 120 25\nCap 15.50 10\nEnd\n", output: "Shirt: 50.00 -> 40.00\nShoes: 120.00 -> 90.00\nCap: 15.50 -> 13.95\nTotal: 143.95\n", explanation: "Shirt: 50.00 × 80% = 40.00. Shoes: 120.00 × 75% = 90.00. Cap: 15.50 × 90% = 13.95. Total = 40.00 + 90.00 + 13.95 = 143.95." },
    ],
    tests: [
      { input: "End\n", output: "Total: 0.00\n" },
      { input: "end\n", output: "Total: 0.00\n" },
      { input: "Book 12.40 0\nEnd\n", output: "Book: 12.40 -> 12.40\nTotal: 12.40\n" },
      { input: "Voucher 30.00 100\nPen 2.50 20\nEND\n", output: "Voucher: 30.00 -> 0.00\nPen: 2.50 -> 2.00\nTotal: 2.00\n" },
      { input: "Laptop 1299.00 15\nMouse 25.90 10\nend\n", output: "Laptop: 1299.00 -> 1104.15\nMouse: 25.90 -> 23.31\nTotal: 1127.46\n" },
      { input: "Shirt 246.05 40\nJeans 1998.28 0\nCap 698.17 100\nSocks 80.19 0\nJacket 1419.29 0\nBag 1902.78 0\nWatch 1147.90 40\nLaptop 759.65 0\nMouse 1091.00 50\nKeyboard 316.91 100\nPen 872.15 100\nNotebook 1544.04 0\nEnd\n", output: "Shirt: 246.05 -> 147.63\nJeans: 1998.28 -> 1998.28\nCap: 698.17 -> 0.00\nSocks: 80.19 -> 80.19\nJacket: 1419.29 -> 1419.29\nBag: 1902.78 -> 1902.78\nWatch: 1147.90 -> 688.74\nLaptop: 759.65 -> 759.65\nMouse: 1091.00 -> 545.50\nKeyboard: 316.91 -> 0.00\nPen: 872.15 -> 0.00\nNotebook: 1544.04 -> 1544.04\nTotal: 9086.10\n" },
      { input: "Shirt 443.25 100\nJeans 1031.63 100\nCap 94.18 0\nSocks 954.25 40\nJacket 1110.48 50\nBag 431.20 50\nWatch 604.52 0\nLaptop 1337.38 50\nMouse 476.70 40\nKeyboard 1087.04 100\nPen 1874.73 100\nNotebook 1284.55 20\nBottle 1208.52 25\nUmbrella 1488.21 100\nHeadphones 1461.67 100\nCharger 851.10 100\nLamp 435.35 60\nChair 1851.28 50\nDesk 1281.64 50\nMug 895.12 100\nShirt 1711.57 0\nJeans 158.30 30\nCap 1879.48 0\nSocks 944.30 10\nJacket 66.44 0\nBag 1912.14 0\nWatch 1371.26 100\nLaptop 1545.23 0\nMouse 95.08 0\nKeyboard 1645.63 100\nPen 1960.00 5\nNotebook 1281.26 0\nBottle 1939.73 0\nUmbrella 1629.48 100\nHeadphones 63.45 40\nCharger 1276.44 50\nLamp 894.05 20\nChair 686.40 60\nDesk 47.28 100\nMug 1757.84 0\neNd\n", output: "Shirt: 443.25 -> 0.00\nJeans: 1031.63 -> 0.00\nCap: 94.18 -> 94.18\nSocks: 954.25 -> 572.55\nJacket: 1110.48 -> 555.24\nBag: 431.20 -> 215.60\nWatch: 604.52 -> 604.52\nLaptop: 1337.38 -> 668.69\nMouse: 476.70 -> 286.02\nKeyboard: 1087.04 -> 0.00\nPen: 1874.73 -> 0.00\nNotebook: 1284.55 -> 1027.64\nBottle: 1208.52 -> 906.39\nUmbrella: 1488.21 -> 0.00\nHeadphones: 1461.67 -> 0.00\nCharger: 851.10 -> 0.00\nLamp: 435.35 -> 174.14\nChair: 1851.28 -> 925.64\nDesk: 1281.64 -> 640.82\nMug: 895.12 -> 0.00\nShirt: 1711.57 -> 1711.57\nJeans: 158.30 -> 110.81\nCap: 1879.48 -> 1879.48\nSocks: 944.30 -> 849.87\nJacket: 66.44 -> 66.44\nBag: 1912.14 -> 1912.14\nWatch: 1371.26 -> 0.00\nLaptop: 1545.23 -> 1545.23\nMouse: 95.08 -> 95.08\nKeyboard: 1645.63 -> 0.00\nPen: 1960.00 -> 1862.00\nNotebook: 1281.26 -> 1281.26\nBottle: 1939.73 -> 1939.73\nUmbrella: 1629.48 -> 0.00\nHeadphones: 63.45 -> 38.07\nCharger: 1276.44 -> 638.22\nLamp: 894.05 -> 715.24\nChair: 686.40 -> 274.56\nDesk: 47.28 -> 0.00\nMug: 1757.84 -> 1757.84\nTotal: 23348.97\n" },
    ],
    starter: "line = input().strip()\n\n# Write your code here\n",
    reference: "def discounted_price(price, rate):\n    return price * (100 - rate) / 100\n\n\ntotal = 0\nline = input().strip()\nwhile line.lower() != 'end':\n    label, price, rate = line.split()\n    price = float(price)\n    new_price = discounted_price(price, int(rate))\n    print(f'{label}: {price:.2f} -> {new_price:.2f}')\n    total += new_price\n    line = input().strip()\nprint(f'Total: {total:.2f}')\n",
  },
  {
    slug: "digit-sum-chain",
    title: "Digit Sum Chain",
    difficulty: "easy",
    topics: ["repetition", "types-vars-io"],
    leetcode: "https://leetcode.com/problems/add-digits/",
    statement:
      "Start with a non-negative integer `n`. While it has more than one digit, replace it by the sum of its digits. Print every number in this chain, starting with `n` itself and ending with the final single-digit number.",
    inputFormat: "A single non-negative integer `n` (it can be very long, with no leading zeros).",
    outputFormat: "The numbers of the chain on one line, separated by ` -> ` (space, minus sign, greater-than sign, space).",
    constraints: "0 ≤ n < 10^100",
    samples: [
      { input: "9875\n", output: "9875 -> 29 -> 11 -> 2\n", explanation: "9 + 8 + 7 + 5 = 29, then 2 + 9 = 11, then 1 + 1 = 2, which has a single digit, so we stop." },
      { input: "7\n", output: "7\n", explanation: "7 already has a single digit, so the chain is just `7`." },
    ],
    tests: [
      { input: "0\n", output: "0\n" },
      { input: "10\n", output: "10 -> 1\n" },
      { input: "19\n", output: "19 -> 10 -> 1\n" },
      { input: "38\n", output: "38 -> 11 -> 2\n" },
      { input: "123456789\n", output: "123456789 -> 45 -> 9\n" },
      { input: "99999999999\n", output: "99999999999 -> 99 -> 18 -> 9\n" },
      { input: "1000000000000\n", output: "1000000000000 -> 1\n" },
      { input: "999999999999999999999999999999\n", output: "999999999999999999999999999999 -> 270 -> 9\n" },
      { input: "314159265358979323846264338327950288419716939937510582097494459\n", output: "314159265358979323846264338327950288419716939937510582097494459 -> 313 -> 7\n" },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference: "n = int(input())\nchain = [str(n)]\nwhile n >= 10:\n    total = 0\n    while n > 0:\n        total += n % 10\n        n //= 10\n    n = total\n    chain.append(str(n))\nprint(' -> '.join(chain))\n",
  },
  {
    slug: "count-primes",
    title: "Count Primes up to N",
    difficulty: "medium",
    topics: ["repetition", "composite", "complexity"],
    leetcode: "https://leetcode.com/problems/count-primes/",
    statement:
      "Count how many prime numbers are **less than or equal to** `n`. A prime is an integer greater than 1 whose only positive divisors are 1 and itself.\n\n`n` can be as large as one million, so testing every number by trial division is too slow. Hint: the **Sieve of Eratosthenes** keeps a list of `True`/`False` flags and crosses out the multiples of each prime it finds.",
    inputFormat: "A single integer `n`.",
    outputFormat: "A single integer: the number of primes `p` with `p ≤ n`.",
    constraints: "0 ≤ n ≤ 10^6",
    samples: [
      { input: "10\n", output: "4\n", explanation: "The primes up to 10 are 2, 3, 5 and 7." },
      { input: "1\n", output: "0\n", explanation: "There are no primes ≤ 1." },
    ],
    tests: [
      { input: "0\n", output: "0\n" },
      { input: "2\n", output: "1\n" },
      { input: "3\n", output: "2\n" },
      { input: "100\n", output: "25\n" },
      { input: "1000\n", output: "168\n" },
      { input: "7919\n", output: "1000\n" },
      { input: "65536\n", output: "6542\n" },
      { input: "100000\n", output: "9592\n" },
      { input: "500000\n", output: "41538\n" },
      { input: "999983\n", output: "78498\n" },
      { input: "1000000\n", output: "78498\n" },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference: "n = int(input())\nif n < 2:\n    print(0)\nelse:\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    i = 2\n    while i * i <= n:\n        if is_prime[i]:\n            for j in range(i * i, n + 1, i):\n                is_prime[j] = False\n        i += 1\n    print(sum(is_prime))\n",
    timeLimitMs: 4000,
  },
];
