import type { CodingProblem } from "@/lib/sc1001/types";

// Expected outputs for the larger hidden tests, computed the same way as the reference.
function hanoiOutput(n: number): string {
  const moves: string[] = [];
  const solve = (k: number, from: string, via: string, to: string) => {
    if (k === 0) return;
    solve(k - 1, from, to, via);
    moves.push(`Move disk ${k} from ${from} to ${to}`);
    solve(k - 1, via, from, to);
  };
  solve(n, "A", "B", "C");
  return [String(moves.length), ...moves].join("\n") + "\n";
}

function permutationsOutput(s: string): string {
  const out: string[] = [];
  const build = (prefix: string, rest: string) => {
    if (rest === "") out.push(prefix);
    for (let i = 0; i < rest.length; i++) build(prefix + rest[i], rest.slice(0, i) + rest.slice(i + 1));
  };
  build("", [...s].sort().join(""));
  return out.join("\n") + "\n";
}

export const recursionProblems: CodingProblem[] = [
  {
    slug: "recursive-digit-sum",
    title: "Recursive Digit Sum",
    difficulty: "easy",
    topics: ["recursion"],
    leetcode: "https://leetcode.com/problems/add-digits/",
    statement:
      "Given a non-negative integer `n`, print two values:\n- the **sum of its digits**, and\n- its **digital root**: keep replacing the number by the sum of its digits until only one digit is left.\n\nSolve both with **recursive functions** (no loops), for example:\n- `digit_sum(n)`: if `n < 10` return `n`, otherwise return `n % 10 + digit_sum(n // 10)`.\n- `digital_root(n)`: if `n < 10` return `n`, otherwise return `digital_root(digit_sum(n))`.",
    inputFormat: "A single integer `n`.",
    outputFormat: "One line with the digit sum and the digital root of `n`, separated by a space.",
    constraints: "0 ≤ n ≤ 10^18",
    samples: [
      { input: "9875\n", output: "29 2\n", explanation: "9 + 8 + 7 + 5 = 29. Then 2 + 9 = 11, and 1 + 1 = 2, so the digital root is 2." },
      { input: "7\n", output: "7 7\n" },
    ],
    tests: [
      { input: "0\n", output: "0 0\n" },
      { input: "5\n", output: "5 5\n" },
      { input: "10\n", output: "1 1\n" },
      { input: "99\n", output: "18 9\n" },
      { input: "1000000000000000000\n", output: "1 1\n" },
      { input: "999999999999999999\n", output: "162 9\n" },
      { input: "123456789\n", output: "45 9\n" },
      { input: "38\n", output: "11 2\n" },
      { input: "505050505050\n", output: "30 3\n" },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference:
      "def digit_sum(n):\n    if n < 10:\n        return n\n    return n % 10 + digit_sum(n // 10)\n\ndef digital_root(n):\n    if n < 10:\n        return n\n    return digital_root(digit_sum(n))\n\nn = int(input())\nprint(digit_sum(n), digital_root(n))\n",
  },
  {
    slug: "recursive-palindrome",
    title: "Recursive Palindrome Check",
    difficulty: "easy",
    topics: ["recursion", "strings"],
    leetcode: "https://leetcode.com/problems/valid-palindrome/",
    statement:
      "A line of text is a **palindrome** if, after removing every character that is not a letter or a digit and converting all letters to lowercase, it reads the same forwards and backwards.\n\nWrite a **recursive** function `is_pal(s, left, right)` that checks the cleaned string between positions `left` and `right`:\n- if `left >= right`, it is a palindrome;\n- if `s[left] != s[right]`, it is not;\n- otherwise check `is_pal(s, left + 1, right - 1)`.\n\nA line with no letters or digits at all counts as a palindrome.\n\nUseful string methods: `ch.isalnum()`, `s.lower()`.",
    inputFormat: "One line of text (it may contain spaces and punctuation).",
    outputFormat: "Print `YES` if the line is a palindrome, otherwise print `NO`.",
    constraints: "1 ≤ length of the line ≤ 1000",
    samples: [
      { input: "Was it a car or a cat I saw?\n", output: "YES\n", explanation: "Cleaned, the line becomes `wasitacaroracatisaw`, which reads the same backwards." },
      { input: "Recursion\n", output: "NO\n" },
    ],
    tests: [
      { input: "a\n", output: "YES\n" },
      { input: "ab\n", output: "NO\n" },
      { input: "Aa\n", output: "YES\n" },
      { input: "!!! ...\n", output: "YES\n" },
      { input: "No lemon, no melon\n", output: "YES\n" },
      { input: "race a car\n", output: "NO\n" },
      { input: "0P\n", output: "NO\n" },
      { input: "12321\n", output: "YES\n" },
      { input: "Step on no pets!\n", output: "YES\n" },
      { input: "bhbe gha gc iedb ijfiih cicd ceaeg abjihe efbia ihc ejcd i gfh j j dgdf hbjdgi jhbahb bjca f i cfdjbi jba ccbhfc fejbhi jgg dac cibb fijhia bi f d hjjjj h fgadi ddjhb ehcie bg jecfe ace iabg d hhbbc ajhghi hg ajgghg hedgi i hhjfei j cdbcdi ahi chifbc fija b be da jeg be ajh j hh hh hjcid d egb d fe gb jibhc bgfia hicja chhhig igba ge bbici chfhee bbcdif ff bjca cj hedh i bfjbc jecifb begi cbggi ide jd d ei gbe i jgdjf gd af jhfjfa ib fia hijjef fagdcf!FCDGAF FEJJIH AIF BI AFJFHJ FA DG FJDGJ I EBG IE D DJ EDI IGGBC IGEB BFICEJ CBJFB I HDEH JC ACJB FF FIDCBB EEHFHC ICIBB EG ABGI GIHHHC AJCIH AIFGB CHBIJ BG EF D BGE D DICJH HH HH J HJA EB GEJ AD EB B AJIF CBFIHC IHA IDCBDC J IEFJHH I IGDEH GHGGJA GH IHGHJA CBBHH D GBAI ECA EFCEJ GB EICHE BHJDD IDAGF H JJJJH D F IB AIHJIF BBIC CAD GGJ IHBJEF CFHBCC ABJ IBJDFC I F ACJB BHABHJ IGDJBH FDGD J J HFG I DCJE CHI AIBFE EHIJBA GEAEC DCIC HIIFJI BDEI CG AHG EBHB\n", output: "YES\n" },
      { input: "hc jgxd hgcacj dei eaig h fhi jjd ifdd a id bb ahghe i fhdeba eeabe bacjd eah dfhcag ggd h fhifff bdafi ge hjdf hjdia i ab b eddj cjbgcf jhfjj cc hea cj fbb jgaha h b jhabdj jbh c fhhghi bibbfe gj fhg jfgih b ee jjhdee ich ghcdi dib bgjg abihdj fgaei efjbe g ac ic hjaif ehdcb gd dhcgc e ibhdbi e fid bd ebfde ed gha eecicg ijhfb bdj fa dj ij dfi iea c c egeieb i b dhcfdd df ej dafhic e aj aaciaj hebcfj ffe hi bf g ed jbbadc eibch ejhf ga ijijdb bbj!JBB BDJIJI AG FHJE HCBIE CDABBJ DE G FB IH EFF JFCBEH JAICAA JA E CIHFAD JE FD DDFCHD B I BEIEGE C C AEI IFD JI JD AF JDB BFHJI GCICEE AHG DE EDFBE DB DIF E IBDHBI E CGCHD DG BCDHE FIAJH CI CA G EBJFE IEAGF JDHIBA GJGB BID IDCHG HCI EEDHJJ EE B HIGFJ GHF JG EFBBIB IHGHHF C HBJ JDBAHJ B H AHAGJ BBF JC AEH CC JJFHJ FCGBJC JDDE B BA I AIDJH FDJH EG IFADB FFFIHF H DGG GACHFD HAE DJCAB EBAEE ABEDHF I EHGHA BB DI A DDFI DJJ IHF H GIAE IED JCACGH DGGJ CH\n", output: "NO\n" },
    ],
    starter: "line = input()\n\n# Write your code here\n",
    reference:
      "def is_pal(s, left, right):\n    if left >= right:\n        return True\n    if s[left] != s[right]:\n        return False\n    return is_pal(s, left + 1, right - 1)\n\nline = input()\ncleaned = ''\nfor ch in line:\n    if ch.isalnum():\n        cleaned += ch.lower()\nif is_pal(cleaned, 0, len(cleaned) - 1):\n    print('YES')\nelse:\n    print('NO')\n",
  },
  {
    slug: "tower-of-hanoi",
    title: "Tower of Hanoi",
    difficulty: "easy",
    topics: ["recursion"],
    statement:
      "There are three pegs `A`, `B` and `C`. Peg `A` holds `n` disks of different sizes, numbered `1` (smallest, on top) to `n` (largest, at the bottom). Move the whole stack to peg `C`, following the rules:\n- move one disk at a time (the top disk of some peg);\n- never place a larger disk on top of a smaller one.\n\nUse the classic recursive strategy: to move `k` disks from `X` to `Z` using `Y`, first move `k − 1` disks from `X` to `Y` (using `Z`), then move disk `k` from `X` to `Z`, then move the `k − 1` disks from `Y` to `Z` (using `X`).\n\nPrint the total number of moves, then every move in order.",
    inputFormat: "A single integer `n`.",
    outputFormat: "First line: the number of moves. Then one line per move in the form `Move disk k from X to Y`.",
    constraints: "1 ≤ n ≤ 10",
    samples: [
      { input: "2\n", output: "3\nMove disk 1 from A to B\nMove disk 2 from A to C\nMove disk 1 from B to C\n", explanation: "Move the small disk out of the way to B, move disk 2 to C, then put disk 1 back on top of it." },
      { input: "1\n", output: "1\nMove disk 1 from A to C\n" },
    ],
    tests: [
      { input: "3\n", output: "7\nMove disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B\nMove disk 3 from A to C\nMove disk 1 from B to A\nMove disk 2 from B to C\nMove disk 1 from A to C\n" },
      { input: "4\n", output: hanoiOutput(4) },
      { input: "5\n", output: hanoiOutput(5) },
      { input: "7\n", output: hanoiOutput(7) },
      { input: "8\n", output: hanoiOutput(8) },
      { input: "10\n", output: hanoiOutput(10) },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference:
      "def hanoi(k, src, via, dst, moves):\n    if k == 0:\n        return\n    hanoi(k - 1, src, dst, via, moves)\n    moves.append('Move disk ' + str(k) + ' from ' + src + ' to ' + dst)\n    hanoi(k - 1, via, src, dst, moves)\n\nn = int(input())\nmoves = []\nhanoi(n, 'A', 'B', 'C', moves)\nprint(len(moves))\nfor m in moves:\n    print(m)\n",
  },
  {
    slug: "climbing-stairs-memo",
    title: "Climbing Stairs (1, 2 or 3 Steps)",
    difficulty: "medium",
    topics: ["recursion", "complexity"],
    leetcode: "https://leetcode.com/problems/climbing-stairs/",
    statement:
      "A staircase has `n` steps. With each move you may climb **1, 2 or 3** steps. In how many different ways can you reach the top exactly?\n\nThe number of ways satisfies `ways(n) = ways(n − 1) + ways(n − 2) + ways(n − 3)`, with `ways(0) = 1` (you are already at the top) and no ways for a negative number of steps.\n\nA plain recursive function makes an exponential number of calls and is far too slow for large `n`. Use **memoization**: store each `ways(k)` in a dictionary the first time you compute it and reuse it afterwards.",
    inputFormat: "A single integer `n`.",
    outputFormat: "The number of ways to climb the `n` steps (it can be very large; Python integers handle that).",
    constraints: "1 ≤ n ≤ 300",
    samples: [
      { input: "3\n", output: "4\n", explanation: "The 4 ways are 1+1+1, 1+2, 2+1 and 3." },
      { input: "4\n", output: "7\n", explanation: "1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1." },
    ],
    tests: [
      { input: "1\n", output: "1\n" },
      { input: "2\n", output: "2\n" },
      { input: "5\n", output: "13\n" },
      { input: "10\n", output: "274\n" },
      { input: "20\n", output: "121415\n" },
      { input: "36\n", output: "2082876103\n" },
      { input: "50\n", output: "10562230626642\n" },
      { input: "100\n", output: "180396380815100901214157639\n" },
      { input: "200\n", output: "52622583840983769603765180599790256716084480555530641\n" },
      { input: "300\n", output: "15350287614359738671843506567023635268924281173051801861566524609184461020990367\n" },
    ],
    starter: "n = int(input())\n\n# Write your code here\n",
    reference:
      "memo = {}\n\ndef ways(n):\n    if n < 0:\n        return 0\n    if n == 0:\n        return 1\n    if n in memo:\n        return memo[n]\n    memo[n] = ways(n - 1) + ways(n - 2) + ways(n - 3)\n    return memo[n]\n\nn = int(input())\nprint(ways(n))\n",
    timeLimitMs: 2000,
  },
  {
    slug: "string-permutations",
    title: "All Permutations in Order",
    difficulty: "medium",
    topics: ["recursion", "strings"],
    leetcode: "https://leetcode.com/problems/permutations/",
    statement:
      "Given a word made of **distinct** lowercase letters, print every arrangement (permutation) of its letters in **lexicographic (dictionary) order**, one per line.\n\nGenerate them **recursively**: start with the letters in alphabetical order; for each letter in turn, fix it as the next character and recursively permute the remaining letters. Done in this order, the permutations come out already sorted.\n\nDo not use `itertools`.",
    inputFormat: "A single word `s`.",
    outputFormat: "All `len(s)!` permutations of `s`, one per line, in lexicographic order.",
    constraints: "1 ≤ len(s) ≤ 7\nAll letters of `s` are distinct lowercase letters.",
    samples: [
      { input: "abc\n", output: "abc\nacb\nbac\nbca\ncab\ncba\n", explanation: "3! = 6 permutations, listed in dictionary order." },
      { input: "ba\n", output: "ab\nba\n", explanation: "The input letters are not necessarily sorted; the output must still start with `ab`." },
    ],
    tests: [
      { input: "z\n", output: "z\n" },
      { input: "xy\n", output: "xy\nyx\n" },
      { input: "cab\n", output: "abc\nacb\nbac\nbca\ncab\ncba\n" },
      { input: "dcba\n", output: permutationsOutput("dcba") },
      { input: "maths\n", output: permutationsOutput("maths") },
      { input: "python\n", output: permutationsOutput("python") },
      { input: "gfedcba\n", output: permutationsOutput("gfedcba") },
      { input: "zqmkaex\n", output: permutationsOutput("zqmkaex") },
    ],
    starter: "s = input().strip()\n\n# Write your code here\n",
    reference:
      "def permute(prefix, rest, out):\n    if rest == '':\n        out.append(prefix)\n        return\n    for i in range(len(rest)):\n        permute(prefix + rest[i], rest[:i] + rest[i + 1:], out)\n\ns = input().strip()\nletters = ''.join(sorted(s))\nresult = []\npermute('', letters, result)\nprint('\\n'.join(result))\n",
    timeLimitMs: 3000,
  },
];
