import type { CodingProblem } from "@/lib/sc1001/types";

// Rows of Pascal's triangle, for the larger hidden tests.
function pascalOutput(n: number): string {
  const rows: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row = [1];
    for (let j = 1; j <= i; j++) row.push(j === i ? 1 : rows[i - 1][j - 1] + rows[i - 1][j]);
    rows.push(row);
  }
  return rows.map((r) => r.join(" ")).join("\n") + "\n";
}

export const mathProblems: CodingProblem[] = [
  {
    slug: "happy-number",
    title: "Happy Number",
    difficulty: "easy",
    topics: ["repetition", "composite"],
    leetcode: "https://leetcode.com/problems/happy-number/",
    statement:
      "Take a positive integer `n` and replace it with the sum of the squares of its digits. Keep repeating this step.\n\nIf the number eventually becomes `1`, then `n` is called a **happy number**. Otherwise the numbers fall into a loop that never reaches `1`, and `n` is not happy.\n\nFor example, starting from 19: 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1, so 19 is happy.\n\nPrint whether `n` is happy. Hint: keep a set of the numbers you have already seen so you can detect a loop.",
    inputFormat: "A single integer `n`.",
    outputFormat: "Print `YES` if `n` is a happy number, otherwise print `NO`.",
    constraints: "1 ≤ n ≤ 10^9",
    samples: [
      { input: "19\n", output: "YES\n", explanation: "19 → 82 → 68 → 100 → 1, so 19 is happy." },
      { input: "2\n", output: "NO\n", explanation: "2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 → … The sequence loops back to 4 without ever reaching 1." },
    ],
    tests: [
      { input: "1\n", output: "YES\n" },
      { input: "7\n", output: "YES\n" },
      { input: "4\n", output: "NO\n" },
      { input: "10\n", output: "YES\n" },
      { input: "13\n", output: "YES\n" },
      { input: "145\n", output: "NO\n" },
      { input: "100000\n", output: "YES\n" },
      { input: "999999999\n", output: "NO\n" },
      { input: "1000000000\n", output: "YES\n" },
      { input: "986543210\n", output: "YES\n" },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference:
      "n = int(input())\nseen = set()\nwhile n != 1 and n not in seen:\n    seen.add(n)\n    total = 0\n    while n > 0:\n        d = n % 10\n        total += d * d\n        n //= 10\n    n = total\nif n == 1:\n    print('YES')\nelse:\n    print('NO')\n",
  },
  {
    slug: "gcd-and-lcm",
    title: "GCD and LCM",
    difficulty: "easy",
    topics: ["repetition", "functions"],
    leetcode: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
    statement:
      "Given two positive integers `a` and `b`, print their **greatest common divisor** (GCD) and their **least common multiple** (LCM).\n\nCompute the GCD with the Euclidean algorithm: while `b` is not 0, replace `(a, b)` with `(b, a % b)`; the GCD is the final `a`. Then use `lcm(a, b) = a * b // gcd(a, b)`.\n\nWrite the Euclidean algorithm yourself — do not use `math.gcd` or `math.lcm`.",
    inputFormat: "One line with two integers `a` and `b`, separated by a space.",
    outputFormat: "One line with the GCD and the LCM, separated by a space.",
    constraints: "1 ≤ a, b ≤ 10^12",
    samples: [
      { input: "12 18\n", output: "6 36\n", explanation: "The divisors common to 12 and 18 are 1, 2, 3, 6, so the GCD is 6. The smallest number divisible by both is 36." },
      { input: "7 5\n", output: "1 35\n" },
    ],
    tests: [
      { input: "1 1\n", output: "1 1\n" },
      { input: "5 5\n", output: "5 5\n" },
      { input: "17 51\n", output: "17 51\n" },
      { input: "51 17\n", output: "17 51\n" },
      { input: "48 180\n", output: "12 720\n" },
      { input: "1 1000000000000\n", output: "1 1000000000000\n" },
      { input: "1000000000000 999999999999\n", output: "1 999999999999000000000000\n" },
      { input: "600851475143 6857\n", output: "6857 600851475143\n" },
      { input: "1099511627776 847288609443\n", output: "1 931603678164736454688768\n" },
      { input: "123456789012 987654321098\n", output: "2 60966315568292943087588\n" },
      { input: "999999999989 999999999959\n", output: "1 999999999948000000000451\n" },
    ],
    starter: "a, b = map(int, input().split())\n\n# Write your code here\n",
    reference:
      "def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\na, b = map(int, input().split())\ng = gcd(a, b)\nprint(g, a * b // g)\n",
  },
  {
    slug: "pascals-triangle",
    title: "Pascal's Triangle",
    difficulty: "easy",
    topics: ["composite", "repetition"],
    leetcode: "https://leetcode.com/problems/pascals-triangle/",
    statement:
      "Pascal's triangle starts with a single `1` at the top. Each following row begins and ends with `1`, and every other entry is the sum of the two entries directly above it (the one above-left and the one above-right).\n\nGiven `n`, print the first `n` rows of Pascal's triangle.\n\nTip: build each row as a list from the previous row.",
    inputFormat: "A single integer `n`.",
    outputFormat: "`n` lines. Line `i` (1-based) contains the `i` numbers of row `i`, separated by single spaces.",
    constraints: "1 ≤ n ≤ 30",
    samples: [
      { input: "5\n", output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n", explanation: "Row 4 is `1 3 3 1`, so row 5 is 1, 1+3, 3+3, 3+1, 1 = `1 4 6 4 1`." },
      { input: "1\n", output: "1\n" },
    ],
    tests: [
      { input: "2\n", output: "1\n1 1\n" },
      { input: "3\n", output: "1\n1 1\n1 2 1\n" },
      { input: "4\n", output: "1\n1 1\n1 2 1\n1 3 3 1\n" },
      { input: "7\n", output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1\n1 6 15 20 15 6 1\n" },
      { input: "10\n", output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1\n1 6 15 20 15 6 1\n1 7 21 35 35 21 7 1\n1 8 28 56 70 56 28 8 1\n1 9 36 84 126 126 84 36 9 1\n" },
      { input: "18\n", output: pascalOutput(18) },
      { input: "25\n", output: pascalOutput(25) },
      { input: "30\n", output: pascalOutput(30) },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference:
      "n = int(input())\nrow = [1]\nfor i in range(n):\n    print(' '.join(str(x) for x in row))\n    nxt = [1]\n    for j in range(1, len(row)):\n        nxt.append(row[j - 1] + row[j])\n    nxt.append(1)\n    row = nxt\n",
  },
  {
    slug: "integer-square-root",
    title: "Integer Square Root",
    difficulty: "medium",
    topics: ["search-sort", "repetition"],
    leetcode: "https://leetcode.com/problems/sqrtx/",
    statement:
      "For each given non-negative integer `x`, print the integer part of its square root, i.e. the largest integer `r` such that `r * r ≤ x`.\n\nUse **binary search** on `r` over the range `0 … x`: if `mid * mid ≤ x`, the answer is at least `mid`; otherwise it is smaller than `mid`.\n\nDo not use `math.sqrt`, `math.isqrt` or `x ** 0.5`. (Floating-point square roots are not exact for numbers this large and give wrong answers on some tests.)",
    inputFormat: "The first line contains `T`, the number of queries. Each of the next `T` lines contains one integer `x`.",
    outputFormat: "`T` lines: the integer square root of each `x`, in the same order.",
    constraints: "1 ≤ T ≤ 1000\n0 ≤ x ≤ 10^18",
    samples: [
      { input: "3\n4\n8\n0\n", output: "2\n2\n0\n", explanation: "√4 = 2. √8 ≈ 2.83, whose integer part is 2. √0 = 0." },
    ],
    tests: [
      { input: "1\n0\n", output: "0\n" },
      { input: "1\n1\n", output: "1\n" },
      { input: "5\n2\n3\n15\n16\n17\n", output: "1\n1\n3\n4\n4\n" },
      { input: "3\n2147395599\n2147395600\n2147483647\n", output: "46339\n46340\n46340\n" },
      { input: "1\n1000000000000000000\n", output: "1000000000\n" },
      { input: "1\n999999999999999999\n", output: "999999999\n" },
      { input: "2\n999999998000000001\n999999998000000000\n", output: "999999999\n999999998\n" },
      { input: "4\n999999999999999999\n4503599761588224\n4503599761588223\n9007199254740993\n", output: "999999999\n67108864\n67108864\n94906265\n" },
      { input: "80\n158874949885269666\n216979915669660900\n792020494006695288\n626082206309527682\n229525228008889476\n876958680585740531\n310419540067506489\n859048534936058944\n171377806203539864\n598037142137846543\n243602335662102841\n501011724329602562\n15271802854506496\n143603188142712769\n401892739882295209\n661981072590937745\n654151789735401048\n844031575413271920\n640557130928995362\n913164282071733219\n63111921001581321\n526931382260196\n35323975923678657\n511493739268047872\n228319957914424059\n10697398140363528\n473263046501557224\n460900491799849210\n650089131927183787\n798474834821304481\n388937836297536194\n109300972904754327\n487325225011796223\n568510269288054373\n16973948276219235\n845758489568583309\n832386318936582281\n1959760209334041\n68118842904851509\n891986498812286247\n9175364699439376\n54466195460883844\n893295185141175747\n705050951708355882\n777388795701543935\n184724880329047020\n861037819431181599\n402572773521667984\n260086029247607808\n148900387703776900\n650498989298118782\n80763806616129168\n545830839163751716\n3483210254737983\n973139165209785033\n235577406792448899\n116440269426197119\n77089946194482168\n499333125490546213\n114897277736980458\n791179710201705888\n254055270173647849\n434971331471262096\n956886211724701143\n611999510865408576\n934176198875912280\n518416590372733440\n158109051470645521\n25046036738803608\n38284711611062436\n900640702229315488\n809958026810637965\n321265240646206609\n19029665326490808\n935945906007078728\n102919482658980618\n816413015043400643\n706544731716367565\n171889672284625488\n435006038350610076\n", output: "398591206\n465811030\n889955332\n791253566\n479087912\n936460720\n557153067\n926848712\n413978026\n773328611\n493560873\n707821816\n123579136\n378950113\n633950108\n813622192\n808796506\n918711910\n800348131\n955596296\n251220861\n22954986\n187946736\n715187904\n477828377\n103428226\n687941164\n678896525\n806281050\n893574191\n623648808\n330606976\n698086831\n753996199\n130284105\n919651286\n912352080\n44269179\n260995867\n944450368\n95788124\n233379938\n945142944\n839673121\n881696543\n429796324\n927921235\n634486228\n509986302\n385876130\n806535175\n284189736\n738803654\n59018727\n986478162\n485363169\n341233452\n277650762\n706635072\n338965009\n889482832\n504038957\n659523564\n978205608\n782303976\n966527908\n720011520\n397629289\n158259396\n195664794\n949020917\n899976681\n566802647\n137948052\n967442972\n320810664\n903555761\n840562152\n414595793\n659549875\n" },
    ],
    starter: "t = int(input())\nfor _ in range(t):\n    x = int(input())\n    # Write your code here\n",
    reference:
      "def isqrt(x):\n    lo, hi = 0, x\n    ans = 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid <= x:\n            ans = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans\n\nt = int(input())\nfor _ in range(t):\n    x = int(input())\n    print(isqrt(x))\n",
  },
];
