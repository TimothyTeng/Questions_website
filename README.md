# NTU Course Prep

Revision site for two NTU courses. The home page (`/`) picks the course; each course is one tab.

# SC1004 Linear Algebra for Computing (`/sc1004`)

All 12 topics: vectors, matrices, linear systems, linear transformations, matrix algebra, determinants and vector spaces (first half), then orthogonality, least squares, eigenvalues, complex numbers and the DFT (second half).

- **Learn** (`/sc1004/learn`): each topic taught as intuition → key ideas → formulas → step-by-step worked example → exam traps → recall cards, plus an "if you see X, do Y" playbook and interactive figures.
- **Practice** (`/sc1004/practice`): 100 concept + generated questions per topic plus past-paper-style questions written to the difficulty of the final. Choose random, a half of the semester, or specific topics/subtopics; filter to past-paper style; choose when answers are revealed. Progress is stored in the browser.
- **Mock final** (`/sc1004/mock`): the real format — 20 five-option MCQs (10 per half), 5 marks each, 2 hours.

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
- `src/data/exam/*.ts` – past-paper-style questions calibrated to the SC1004 final
- `src/lib/bank.ts` – assembles the question bank
- `src/data/lessons/*.ts` – Learn tab content

# SC1001 Prep (`/sc1001`)

Revision for SC1001 Introduction to Computational Thinking and Programming (Python). The final quiz is 90 min on HackerEarth.

- **Practice** (`/sc1001/practice`): 406 questions over 14 topics. MCQ, short answer ("type the exact output") and open-ended. Open-ended answers are marked against a rubric, either by Gemini or by you. Practice questions have AI hints.
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
- `src/lib/sc1001/ai-server.ts` + `src/app/api/sc1001/ai/route.ts`: Gemini hints, optional open-answer marking and code review. The browser sends only question/problem ids and the student's answer or code; the server builds the prompts. Set `GEMINI_API_KEY` (free from https://aistudio.google.com/apikey) in `.env.local` locally or in Vercel's Environment Variables — see `.env.example`. Test-case marks never depend on AI.
