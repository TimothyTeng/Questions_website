// Shared content types.
//
// Text fields ("prompt", "solution", option strings, lesson text) use a small markup:
//   $...$    inline KaTeX math
//   $$...$$  display KaTeX math (on its own line)
//   **bold**
//   a newline starts a new paragraph; a line starting with "- " is a bullet.
// Complex numbers use j (engineering notation), as in the course notes.

export type TopicId =
  // first half
  | "vectors"
  | "matrices"
  | "systems"
  | "transformations"
  | "matrix-algebra"
  | "determinants"
  | "vector-spaces"
  // second half
  | "orthogonality"
  | "least-squares"
  | "eigen"
  | "complex"
  | "dft";

export type QuestionKind = "mcq" | "tfn";

export interface Question {
  id: string;
  topic: TopicId;
  subtopic: string;
  kind: QuestionKind;
  prompt: string;
  /** For "tfn": exactly TFN_OPTIONS. For "mcq": 5 options, last one usually "None of the above". */
  options: string[];
  /** Index into options. */
  answer: number;
  /** Worked solution / explanation shown after answering. */
  solution: string;
  /**
   * Where in the course materials this question's method and facts come from, e.g.
   * "Slides 4.2 (p12); Tutorial 4 Q1" or "PYP AY25/26 S1 Q5". Required for first-half topics.
   */
  ref?: string;
  /** "exam": hand-written in the style and difficulty of the SC1004 final (past-paper style). */
  source: "generated" | "concept" | "exam";
}

/** A hand-written conceptual question (id/topic/source are filled in when the bank is built). */
export type ConceptQuestion = Omit<Question, "id" | "topic" | "source">;

export const TFN_OPTIONS = ["True", "False", "Not enough information to determine"];

export interface WorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface RecallCard {
  q: string;
  a: string;
}

export interface LessonSection {
  title: string;
  /** One or two sentences of intuition: the "why" before the "how". */
  intuition: string;
  /** Short key facts / definitions / theorems. */
  keyIdeas: string[];
  /** Display formulas (LaTeX, without $$). */
  formulas?: string[];
  example?: WorkedExample;
  /** Common mistakes / exam traps. */
  pitfalls?: string[];
  /** Active-recall prompts (answer hidden until clicked). */
  recall: RecallCard[];
  /** Interactive figure ids (from the topic's module in components/viz/topics) shown after the intuition. */
  visuals?: string[];
  /** Course materials this section is taken from (slide pages, tutorial / past-paper questions). */
  refs?: string[];
}

export interface Lesson {
  topic: TopicId;
  /** One-paragraph overview: what this topic is for and how the pieces connect. */
  bigPicture: string;
  sections: LessonSection[];
  /** "If you see X, do Y" exam playbook lines. */
  playbook: string[];
}
