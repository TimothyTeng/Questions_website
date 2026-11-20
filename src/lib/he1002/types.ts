// HE1002 Macroeconomics I: content, flashcards, topic quizzes and exam-style questions.
// Everything in src/data/he1002 must come from the 12 HE1002 lecture decks, the 12 problem sets
// (and their answer guides) and the "HE1002 Examination (with examples)" document — nothing outside the syllabus.

export type TopicId =
  | "gdp"
  | "cpi"
  | "unemployment"
  | "growth"
  | "saving"
  | "money"
  | "inflation"
  | "adas"
  | "policy"
  | "keynesian"
  | "open-basics"
  | "open-theory";

// ------------------------------------------------------------------ diagrams

/**
 * A simple economics diagram drawn on a 0–10 × 0–10 grid (origin bottom-left).
 * Lines are polylines; points can sit at fixed coordinates or at the intersection of two named lines.
 */
export interface Graph {
  title?: string;
  /** Horizontal axis label, e.g. "Real GDP (Y)". */
  x: string;
  /** Vertical axis label, e.g. "Price level (P)". */
  y: string;
  lines: GLine[];
  points?: GPoint[];
  /** Shift arrows, e.g. from AD1 to AD2. */
  arrows?: { from: [number, number]; to: [number, number] }[];
  /** One-sentence caption under the diagram. */
  caption?: string;
}

export interface GLine {
  /** Label drawn at the end of the line, e.g. "AD₁", "SRAS", "LRAS", "45°". Must be unique within the graph. */
  label: string;
  /** Polyline vertices in 0–10 grid units. Two points make a straight line; 3–5 points make a curve. */
  pts: [number, number][];
  dashed?: boolean;
  /** 0 = accent (default), 1 = second colour, 2 = third colour, 3 = grey (old/initial curve). */
  tone?: 0 | 1 | 2 | 3;
}

export interface GPoint {
  /** Fixed position… */
  at?: [number, number];
  /** …or the intersection of two lines, given by their labels (preferred: always lands exactly on the curves). */
  on?: [string, string];
  /** Label beside the dot, e.g. "A", "E₁". */
  label?: string;
  /** Tick text written on the horizontal axis under the point, with a dashed guide, e.g. "Y₁". */
  xTick?: string;
  /** Tick text written on the vertical axis level with the point, with a dashed guide, e.g. "P₁". */
  yTick?: string;
}

// ------------------------------------------------------------------ Learn: content pages

/** One idea on a content page. `term` is bolded (and blurred in "Hide terms" mode); `eg` is a short example. */
export interface Point {
  term?: string;
  text: string;
  eg?: string;
}

/** A formula to memorise, shown in a highlighted box, e.g. { name: "GDP deflator", expr: "Nominal GDP ÷ Real GDP × 100" }. */
export interface Formula {
  name: string;
  expr: string;
  note?: string;
}

export interface Section {
  title: string;
  intro?: string;
  points: Point[];
  formulas?: Formula[];
  /** Optional comparison table: first row is the header. */
  table?: string[][];
  diagrams?: Graph[];
  /** Optional worked example: a short problem and its step-by-step solution (lines separated by \n). */
  worked?: { problem: string; solution: string }[];
}

// ------------------------------------------------------------------ Learn: flashcards

/**
 * concept: front gives a definition / description, back is the TERM (typed guess is auto-checked).
 * scenario: front is a hypothetical situation + question ("What happens to the price level and output in the short run?"),
 *           back is the short answer, `why` walks through the reasoning step by step.
 */
export interface Flashcard {
  id: string;
  type: "concept" | "scenario";
  front: string;
  back: string;
  why: string;
}

// ------------------------------------------------------------------ Learn: topic quiz (answers after every 5)

interface QBase {
  id: string;
  /** Short sub-topic label, e.g. "GDP components". */
  sub: string;
  /** Shown after marking: why the answer is right. */
  explain: string;
}

/**
 * Fill-in-the-blank. The prompt marks each blank with "____" (exactly four underscores).
 * `answers[i]` lists every accepted answer for blank i. Numeric answers ("4.5", "57.5%", "$320") are
 * matched numerically with a small rounding tolerance; text answers tolerate small spelling slips.
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
  answer: number;
}

export type QuizQ = FillQ | McqQ;

// ------------------------------------------------------------------ Questions page: exam format

/**
 * The HE1002 final exam has no MCQs:
 *  Q1 calc    — 13 calculation questions × 3 marks (state the formula, show working)
 *  Q2 short   — 9 short-answer questions × 3 marks (3–4 sentences)
 *  Q3 tf      — 8 true/false questions × 3 marks (explain the reasoning)
 *  Q4 diagram — one 2-part diagram question, 5 + 5 marks
 */
export type ExamSection = "calc" | "short" | "tf" | "diagram";

export interface RubricItem {
  /** What the answer must contain to earn these marks. */
  point: string;
  marks: number;
}

export interface ExamQ {
  id: string;
  section: ExamSection;
  sub: string;
  /** For tf: the statement only (the UI adds "True or false:"). For diagram: the shared stem; the parts go in `parts`. */
  prompt: string;
  /** Diagram questions only: (a) and (b), 5 marks each. */
  parts?: { label: string; prompt: string; marks: number }[];
  /** 3 for calc/short/tf, 10 for diagram. Must equal the sum of rubric marks. */
  marks: number;
  rubric: RubricItem[];
  /** Model answer with the formula and working (calc), or the full written answer. */
  model: string;
  /** tf only: whether the statement is true. */
  tf?: boolean;
  /** calc only: the final answer, e.g. "57.5%". */
  answer?: string;
  /** The diagram a full-marks answer would draw. */
  diagram?: Graph[];
  /** Where the idea comes from, e.g. "Problem Set 3 Q2", "Exam example", "Lecture 3". */
  source?: string;
}

export interface TopicData {
  id: TopicId;
  sections: Section[];
  flashcards: Flashcard[];
  quiz: QuizQ[];
  exam: ExamQ[];
}
