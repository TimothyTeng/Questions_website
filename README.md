# LA CA2 Mastery

Revision site for SC1004 Linear Algebra CA2: Orthogonality, Least Squares, Eigenvalues & Eigenvectors, Complex Numbers and the DFT.

- **Learn** (`/learn`): each topic taught as intuition → key ideas → formulas → step-by-step worked example → exam traps → recall cards, plus an "if you see X, do Y" playbook.
- **Practice** (`/practice`): 500 CA2-style questions (100 per topic). Choose random or specific topics/subtopics, number of questions, and when answers are revealed (each question, every 5/10, or at the end). Progress is stored in the browser.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # validate the question bank (counts, options, KaTeX)
npm run build
```

## Where things live

- `src/data/concepts/*.ts` – hand-written conceptual questions (True/False/NEI and MCQ)
- `src/lib/gen/*.ts` – seeded generators for the computational questions; answers are computed with exact fractions (`src/lib/math`)
- `src/lib/bank.ts` – assembles the 500-question bank
- `src/data/lessons/*.ts` – Learn tab content

# SC1001 Prep (`/sc1001`)

Revision for SC1001 Introduction to Computational Thinking and Programming (Python). The final quiz is 90 min on HackerEarth.

- **Practice** (`/sc1001/practice`): 406 questions over 14 topics. MCQ, short answer ("type the exact output") and open-ended. Open-ended answers are marked against a rubric, either by Puter.js AI or by you.
- **Coding** (`/sc1001/code`): 41 LeetCode easy/medium-style problems in HackerEarth stdin/stdout format. Python 3.14 (Pyodide) runs in the browser, in a Monaco editor. Submit runs the hidden tests: 1 mark per test, with AC/WA/RE/TLE verdicts.
- **Mock test** (`/sc1001/mock`): a timed test (90-min preset or custom), or one built from questions you pick. It has a question navigator and mark-for-review, keeps your attempt across reloads, and shows marks at the end.

```bash
npm run check:sc1001            # run every "what is printed" answer and every reference solution with Pyodide
npm run check:sc1001 -- strings # only topics/problems matching "strings"
```

## Where things live

- `src/data/sc1001/questions/<topic>.ts`: questions (`verify: true` means the answer is the snippet's real output)
- `src/data/sc1001/problems/*.ts`: coding problems with samples, hidden tests, starter and reference code
- `src/lib/sc1001/harness.ts`: the Python runner shared by the browser worker (`public/sc1001/py-worker.js`) and the check script
- `src/lib/sc1001/ai.ts`: Puter.js marking and code review. Each user signs in with their own free Puter account. Test-case marks never depend on AI.
