// HE1004 Mathematics for Economists I: content, flashcards, topic quizzes and exam-format questions.
// Everything in src/data/he1004 must come ONLY from the HE1004 lecture notes (1–11), Assignments 1–10
// and the past-paper questions — nothing outside the syllabus.
//
// RICH TEXT: every user-facing string (prompts, points, model answers, flashcard faces, options…) is rendered
// with the small markup in components/Rich.tsx:
//   $…$ inline maths (KaTeX), $$…$$ display maths, **bold**, a newline starts a new paragraph,
//   a line starting with "- " is a bullet.
// Remember to escape backslashes in TS strings ("$\\frac{1}{x}$") or use String.raw`…`.

export type TopicId =
  | "algebra"
  | "sums-logic-sets"
  | "functions"
  | "function-props"
  | "differentiation"
  | "derivatives-use"
  | "optimisation"
  | "integration"
  | "matrices"
  | "multivariable"
  | "constrained";

// ------------------------------------------------------------------ figures

/**
 * A function plot on real axes. Expressions are in x, e.g. "x^2 - 3*x + 2", "ln(x)", "exp(-x)", "sqrt(x)", "abs(x-2)",
 * "30/(x+2)", "(650 - 0.25*x)^(3/2)". Supported: + - * / ^, parentheses, unary minus, numbers (incl. 1e-3),
 * constants e and pi, functions ln, log (= ln), log10, exp, sqrt, cbrt, abs. Use explicit "*" (write 2*x, not 2x).
 * Points where the expression is undefined (e.g. ln of a negative) are simply skipped.
 */
export interface Plot {
  kind?: "plot";
  title?: string;
  /** Axis names in plain text (no $…$), default "x" and "y", e.g. "Q", "TR". */
  x?: string;
  y?: string;
  /** Visible window. */
  xr: [number, number];
  yr: [number, number];
  curves?: Curve[];
  /** Shaded area between f and g (g defaults to 0, i.e. the x-axis) for from ≤ x ≤ to. */
  shade?: { f: string; g?: string; from: number; to: number; tone?: Tone; label?: string }[];
  points?: { at: [number, number]; label?: string; open?: boolean; /** dashed guides to both axes */ guides?: boolean; tone?: Tone }[];
  /** Straight segments: tangent lines, asymptotes, number-line brackets, arrows. */
  segments?: { from: [number, number]; to: [number, number]; dashed?: boolean; tone?: Tone; label?: string; arrow?: boolean }[];
  /** Free text placed at a point (plain text, keep it short). */
  labels?: { at: [number, number]; text: string; tone?: Tone }[];
  /** Draw only the horizontal axis (for number lines / intervals). */
  numberLine?: boolean;
  caption?: string;
}

export interface Curve {
  f: string;
  /** Plain-text label drawn at the right end, e.g. "f(x) = x²", "TR", "MC". */
  label?: string;
  /** Restrict the x-range of this curve (default: the whole window). */
  from?: number;
  to?: number;
  dashed?: boolean;
  tone?: Tone;
}

/** 0 = accent (default), 1 = orange, 2 = green, 3 = grey. */
export type Tone = 0 | 1 | 2 | 3;

/**
 * A Venn diagram with 2 or 3 sets inside a universal set U. `shade` lists regions to colour, as membership strings
 * over the sets in order, e.g. for sets [A, B]: "10" = in A only, "01" = in B only, "11" = in both, "00" = outside both.
 * For three sets use 3-character strings ("111", "100", …).
 */
export interface Venn {
  kind: "venn";
  title?: string;
  sets: string[];
  shade: string[];
  /** Optional elements written inside regions, keyed like `shade`, e.g. { "10": "1, 3", "11": "2" }. */
  items?: Record<string, string>;
  universe?: string;
  caption?: string;
}

export type Figure = Plot | Venn;

// ------------------------------------------------------------------ Learn: content pages

/** One idea on a content page. `term` is bolded (and blurred in "Hide terms" mode); `eg` is a short example. */
export interface Point {
  term?: string;
  text: string;
  eg?: string;
}

/** A formula/rule to memorise. `tex` is raw LaTeX WITHOUT $ delimiters, e.g. "\\frac{d}{dx}\\ln x = \\frac{1}{x}". */
export interface Formula {
  name: string;
  tex: string;
  note?: string;
}

export interface Section {
  title: string;
  intro?: string;
  points: Point[];
  formulas?: Formula[];
  /** Optional comparison table: first row is the header. Cells are rich text. */
  table?: string[][];
  figures?: Figure[];
  /** Worked examples from the notes/assignments: problem and step-by-step solution (rich text). */
  worked?: { problem: string; solution: string; source?: string }[];
}

// ------------------------------------------------------------------ Learn: flashcards

/**
 * concept: front describes/defines something, back is the TERM (typed guess is auto-checked, so keep it a short name).
 * method:  front is a question TYPE or a short problem ("How do you find the inverse of a one-to-one function?",
 *          "Evaluate lim_{x→∞} (√(x²−x) − x)"), back is the method/answer in one or two lines, `why` is the full
 *          step-by-step method or worked solution.
 * formula: front names a rule ("Derivative of aˣ"), back is the formula (rich text with $…$), why = when to use it.
 */
export interface Flashcard {
  id: string;
  type: "concept" | "method" | "formula";
  front: string;
  back: string;
  why: string;
}

// ------------------------------------------------------------------ Learn: topic quiz (answers after every 5)

interface QBase {
  id: string;
  /** Short sub-topic label, e.g. "Chain rule". */
  sub: string;
  /** Shown after marking: why the answer is right (worked steps, rich text). */
  explain: string;
}

/**
 * Fill-in-the-blank. The prompt marks each blank with "____" (exactly four underscores, OUTSIDE any $…$).
 * `answers[i]` lists every accepted answer for blank i. Numeric answers ("4.5", "-2", "1360.48") are matched
 * numerically with a rounding tolerance; text answers tolerate small spelling slips.
 * Use fill blanks only for numbers or short words — never for algebraic expressions (use an MCQ for those).
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
 * The HE1004 final paper: 4 questions × 5 parts (a)–(e) × 5 marks = 100 marks. Part types seen in the past paper:
 *  calc    — evaluate / compute / find / derive (show working)
 *  proof   — prove or disprove / true-false with justification / show that
 *  select  — "Which TWO of the following statements are wrong?" (answer with the Roman numerals only)
 *  explain — write down and explain (e.g. Taylor approximations and the role of curvature)
 */
export type ExamKind = "calc" | "proof" | "select" | "explain";

export interface RubricItem {
  /** What the answer must contain to earn these marks. */
  point: string;
  marks: number;
}

export interface ExamQ {
  id: string;
  kind: ExamKind;
  sub: string;
  /** The question (rich text). For select: the stem only; the statements go in `statements`. */
  prompt: string;
  /** select only: the statements (i), (ii), … (rich text, no numeral prefix). */
  statements?: string[];
  /** select only: 0-based indices of the statements that are WRONG (exactly two). */
  wrong?: number[];
  /** Always 5 (one exam part). Must equal the sum of rubric marks. For select use two items of 2.5. */
  marks: number;
  rubric: RubricItem[];
  /** Full model answer with every step (rich text). For select: why each wrong statement is wrong. */
  model: string;
  /** Short final answer, e.g. "$e^{-1}$", "q = 1000 cars". */
  answer?: string;
  figures?: Figure[];
  /** Where it comes from, e.g. "Past paper Q3(a)", "Assignment 8 Q4", "Lecture Note 6 example". */
  source?: string;
}

export interface TopicData {
  id: TopicId;
  sections: Section[];
  flashcards: Flashcard[];
  quiz: QuizQ[];
  exam: ExamQ[];
}
