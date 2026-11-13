// SC1001 content types.
//
// Text fields ("prompt", "solution", "statement", …) use a small markup (see components/sc1001/Md.tsx):
//   **bold**, `inline code`, a line starting with "- " is a bullet,
//   ```…``` fenced blocks are shown as code, a blank line / newline starts a new paragraph.

export type ScTopicId =
  | "ct-basics"
  | "flowchart-pseudo"
  | "types-vars-io"
  | "boolean-selection"
  | "more-selection"
  | "repetition"
  | "strings"
  | "composite"
  | "functions"
  | "decomposition-patterns"
  | "recursion"
  | "complexity"
  | "search-sort"
  | "exceptions";

export type Difficulty = "easy" | "medium" | "hard";
export type ScKind = "mcq" | "short" | "open";

interface Base {
  subtopic: string;
  difficulty: Difficulty;
  prompt: string;
  /** Python snippet shown under the prompt. */
  code?: string;
  /** Worked explanation shown after answering. */
  solution: string;
  /**
   * The answer is the exact stdout of `code` (checked by `npm run check:sc1001`):
   * MCQ → options[answer], short → accept[0].
   */
  verify?: boolean;
}

export interface McqQ extends Base {
  kind: "mcq";
  /** Exactly 4 options. */
  options: string[];
  answer: number;
}

export interface ShortQ extends Base {
  kind: "short";
  /** Accepted answers; compared after trimming each line and dropping blank trailing lines. */
  accept: string[];
}

export interface RubricPoint {
  point: string;
  marks: number;
}

export interface OpenQ extends Base {
  kind: "open";
  modelAnswer: string;
  rubric: RubricPoint[];
}

export type ScDraft = McqQ | ShortQ | OpenQ;
export type ScQuestion = ScDraft & { id: string; topic: ScTopicId };

export interface IoCase {
  input: string;
  output: string;
}

export interface CodingProblem {
  slug: string;
  title: string;
  difficulty: "easy" | "medium";
  topics: ScTopicId[];
  /** Similar LeetCode problem, for reference only. */
  leetcode?: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  samples: (IoCase & { explanation?: string })[];
  /** Hidden tests; 1 mark each. */
  tests: IoCase[];
  starter: string;
  reference: string;
  timeLimitMs?: number;
}

export const marksFor = (q: ScQuestion) => (q.kind === "open" ? q.rubric.reduce((s, r) => s + r.marks, 0) : 1);
