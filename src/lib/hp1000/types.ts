// HP1000 Introduction to Psychology: content, flashcards and questions.
// Everything in src/data/hp1000 must come from the HP1000 lecture slides and the
// "Midterm Quiz and Final Exam Details + Practice" document — nothing outside the syllabus.

export type TopicId =
  | "bio"
  | "sensation"
  | "learning"
  | "memory"
  | "cognition"
  | "disorders"
  | "personality"
  | "development"
  | "motivation"
  | "stress"
  | "social";

/** One idea on a content page. `term` is bolded; `eg` is a short worked example shown under it. */
export interface Point {
  term?: string;
  text: string;
  eg?: string;
}

export interface Section {
  title: string;
  /** Optional one-line framing shown under the heading. */
  intro?: string;
  points: Point[];
  /** Optional comparison table: first row is the header. */
  table?: string[][];
}

/** Scenario → name the theory/term. */
export interface Flashcard {
  id: string;
  /** A short hypothetical example (2–4 sentences). Ends with a question such as "Which term?" */
  scenario: string;
  /** The term/theory exactly as the slides name it. */
  answer: string;
  /** One or two sentences: the definition + which detail in the scenario gives it away. */
  why: string;
}

interface QBase {
  id: string;
  /** Short sub-topic label, e.g. "Operant conditioning". */
  sub: string;
  /** True when copied from the course's official practice document. */
  official?: boolean;
  /** Shown after marking: why the answer is right (and why tempting wrong answers are wrong). */
  explain: string;
}

/**
 * Fill-in-the-blank. The prompt marks each blank with "____" (four underscores).
 * `answers[i]` lists every accepted answer for blank i (spelling slips are tolerated by the marker).
 */
export interface FillQ extends QBase {
  kind: "fill";
  prompt: string;
  answers: string[][];
}

export interface McqQ extends QBase {
  kind: "mcq";
  prompt: string;
  options: string[];
  /** Index into options. */
  answer: number;
}

/** Section C-style short answer: self-marked against model points. */
export interface WrittenQ extends QBase {
  kind: "written";
  prompt: string;
  marks: number;
  /** Each item is one mark-worthy point of a model answer. */
  points: string[];
}

export type Question = FillQ | McqQ | WrittenQ;
export type Kind = Question["kind"];

export interface TopicData {
  id: TopicId;
  sections: Section[];
  flashcards: Flashcard[];
  questions: Question[];
}
