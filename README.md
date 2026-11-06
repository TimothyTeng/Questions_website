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
