// SC1005 Digital Logic content types.
//
// Text fields (prompt, solution, options, lesson text) use the markup rendered by components/sc1005/Text.tsx:
//   ```…```   fenced code block (Verilog), `inline code`
//   $…$       inline KaTeX math, $$…$$ display math (never inside code)
//   **bold**, a line starting with "- " is a bullet, each line is a paragraph.
// Boolean expressions are written with primes for NOT (A'B + C'), as in the course notes.

export type TopicId =
  | "intro"
  | "number-codes"
  | "boolean"
  | "arithmetic"
  | "kmaps"
  | "ic-tech"
  | "comb-blocks"
  | "verilog-comb"
  | "sequential"
  | "seq-verilog"
  | "fsm"
  | "fsm-verilog"
  | "verilog-recap";

export type Difficulty = "easy" | "medium" | "hard";
export type Kind = "mcq" | "short" | "open";

// ---------------------------------------------------------------------------------------------
// Figures: declarative diagrams drawn as SVG (components/sc1005/figures).

export type GateType =
  | "AND"
  | "OR"
  | "NOT"
  | "BUF"
  | "NAND"
  | "NOR"
  | "XOR"
  | "XNOR"
  /** in: [D, CLK]. Outputs: id (Q) and `${id}.qn` (Q'). Rising-edge triggered. */
  | "DFF"
  /** in: [T, CLK]. Outputs: id, `${id}.qn`. */
  | "TFF"
  /** in: [J, K, CLK]. Outputs: id, `${id}.qn`. */
  | "JKFF"
  /** in: [D, EN]. Transparent while EN = 1. Outputs: id, `${id}.qn`. */
  | "DLATCH"
  /** in: [I0, I1, S]. */
  | "MUX2"
  /** in: [A, EN]. Output is high-impedance (z) while EN = 0. */
  | "TBUF";

export interface GateSpec {
  /** Output net name. Other gates refer to it by this id. */
  id: string;
  type: GateType;
  /**
   * Input nets: a circuit input name or another gate's id. Prefix "!" for an inversion bubble on
   * that pin (e.g. "!A"); use "Q1.qn" for a flip-flop's Q' output.
   */
  in: string[];
  /** Text drawn on/above the gate (e.g. "G1"). */
  label?: string;
  /** Force the column (1 = first gate column). Normally computed from the logic depth. */
  col?: number;
}

export interface CircuitSpec {
  inputs: string[];
  gates: GateSpec[];
  /** Gate ids shown as labelled outputs on the right. Defaults to gates nothing else reads. */
  outputs?: string[];
  /** Show internal net names (gate ids) next to each gate output. */
  showNets?: boolean;
}

export interface FsmState {
  id: string;
  /** Text in the circle, e.g. "S0" or "00/0" (Moore output after the slash). */
  label?: string;
  /** Grid position; one unit ≈ one state width. */
  x: number;
  y: number;
}

export interface FsmEdge {
  from: string;
  to: string;
  /** e.g. "1", "0/1" (Mealy input/output), "x=1". */
  label?: string;
  /** Curvature: 0 straight, positive bends left of the direction of travel. Auto when omitted. */
  bend?: number;
  /** Self-loop side (from === to). */
  loop?: "top" | "bottom" | "left" | "right";
}

export interface WaveSignal {
  name: string;
  /**
   * One character per time unit: 0 1 (levels), x (unknown, hatched), z (high-impedance),
   * "=" (bus value: takes the next entry of `data`), "." (continue previous), "|" is ignored.
   */
  wave: string;
  data?: string[];
}

export type Figure =
  | { kind: "table"; head: string[]; rows: (string | number)[][]; caption?: string }
  | {
      kind: "kmap";
      /** 2–4 variables, MSB first, e.g. ["A","B","C","D"]: rows are AB, columns CD. */
      vars: string[];
      /** One char per minterm index 0..2^n-1: "0", "1", "x"/"d" (don't care), "-" (blank). */
      values: string;
      caption?: string;
      showIndex?: boolean;
      /** Loops to draw, as product terms ("A'B", "CD'") or sum terms ("(A+B')"). */
      groups?: string[];
    }
  | { kind: "wave"; signals: WaveSignal[]; caption?: string; /** Labels under the time grid (one per unit). */ ticks?: string[]; /** Dashed vertical markers at these time units. */ marks?: number[] }
  | { kind: "circuit"; circuit: CircuitSpec; caption?: string }
  | { kind: "fsm"; states: FsmState[]; edges: FsmEdge[]; initial?: string; caption?: string }
  /** Hand-drawn SVG (use currentColor so it works in dark mode). */
  | { kind: "svg"; svg: string; caption?: string };

// ---------------------------------------------------------------------------------------------
// Questions

interface Base {
  subtopic: string;
  difficulty: Difficulty;
  prompt: string;
  /** Verilog (or other) listing shown under the prompt. */
  code?: string;
  figures?: Figure[];
  /** Worked solution shown after answering. */
  solution: string;
  solutionFigures?: Figure[];
  /** Where the question style comes from, e.g. "PYP 2021-22 S1 Q1", "Tutorial 4 Q3". */
  source?: string;
}

export interface McqQ extends Base {
  kind: "mcq";
  /** Exactly 5 options (A–E), as on the exam's OMR sheet. */
  options: string[];
  answer: number;
}

export interface ShortQ extends Base {
  kind: "short";
  /** Accepted answers. accept[0] is shown as the answer. */
  accept: string[];
  /**
   * How a typed answer is compared:
   *  - "text" (default): ignoring case, spaces and underscores
   *  - "number": numerically (decimal)
   *  - "expr": a Boolean expression over `vars`, equivalent to accept[0] on every input row
   */
  match?: "text" | "number" | "expr";
  vars?: string[];
  /** With match "expr": the answer must also use no more literals than accept[0] (a minimal form). */
  minimal?: boolean;
  /** With match "expr": truth-table rows (minterm numbers over `vars`) that are don't cares and are not compared. */
  dontCares?: number[];
  placeholder?: string;
}

export interface RubricPoint {
  point: string;
  marks: number;
}

export interface OpenQ extends Base {
  kind: "open";
  modelAnswer: string;
  modelFigures?: Figure[];
  rubric: RubricPoint[];
}

export type Draft = McqQ | ShortQ | OpenQ;
export type Question = Draft & { id: string; topic: TopicId };

export const marksFor = (q: Draft) => (q.kind === "open" ? q.rubric.reduce((s, r) => s + r.marks, 0) : 1);

// ---------------------------------------------------------------------------------------------
// Lessons

export interface WorkedExample {
  problem: string;
  figures?: Figure[];
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
  /** Interactive figure ids from this topic's module in components/sc1005/viz/topics. */
  visuals?: string[];
  keyIdeas: string[];
  /** Static diagrams (truth tables, circuits, K-maps, waveforms, state diagrams). */
  figures?: Figure[];
  /** Display formulas (LaTeX, without $$). */
  formulas?: string[];
  /** Code listings (Verilog). */
  code?: { title?: string; code: string }[];
  example?: WorkedExample;
  pitfalls?: string[];
  recall: RecallCard[];
}

export interface Lesson {
  topic: TopicId;
  bigPicture: string;
  sections: LessonSection[];
  /** "If you see X, do Y" exam playbook lines. */
  playbook: string[];
}
