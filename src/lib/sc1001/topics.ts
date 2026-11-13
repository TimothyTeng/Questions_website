import type { ScTopicId } from "./types";

export interface ScTopicMeta {
  id: ScTopicId;
  name: string;
  week: string;
  blurb: string;
  color: string;
}

export const SC_TOPICS: ScTopicMeta[] = [
  { id: "ct-basics", name: "Computational Thinking & Languages", week: "Wk 1", blurb: "CT pillars, abstraction, compilers vs interpreters, program errors", color: "#4b5bdc" },
  { id: "flowchart-pseudo", name: "Flowcharts & Pseudocode", week: "Wk 2", blurb: "Flowchart symbols, pseudocode conventions, tracing algorithms", color: "#0f9488" },
  { id: "types-vars-io", name: "Data Types, Variables & I/O", week: "Wk 2", blurb: "int/float/str/bool, operators, precedence, input(), print(), casting", color: "#c2410c" },
  { id: "boolean-selection", name: "Boolean & Selection Basics", week: "Wk 3", blurb: "Relational & logical operators, if / else, truthiness", color: "#9333ea" },
  { id: "more-selection", name: "More on Selection", week: "Wk 3", blurb: "elif chains, nesting, short-circuiting, conditional expressions, match", color: "#be185d" },
  { id: "repetition", name: "Repetition (Loops)", week: "Wk 4", blurb: "for / while, range, break / continue, loop-else, nested loops", color: "#2563eb" },
  { id: "strings", name: "Strings", week: "Wk 5", blurb: "Indexing, slicing, immutability, methods, f-strings", color: "#059669" },
  { id: "composite", name: "Composite Types", week: "Wk 5", blurb: "Lists, tuples, dicts, sets, comprehensions, aliasing & copying", color: "#d97706" },
  { id: "functions", name: "Functions & Procedural Abstraction", week: "Wk 6, 9", blurb: "Parameters, return, scope, defaults, keyword args, lambda", color: "#7c3aed" },
  { id: "decomposition-patterns", name: "Decomposition & Pattern Recognition", week: "Wk 8, 10, 11", blurb: "Breaking problems down, generalising patterns, reusable functions", color: "#db2777" },
  { id: "recursion", name: "Recursion", week: "Wk 10", blurb: "Base / recursive cases, call stack, tracing, recursion vs iteration", color: "#0891b2" },
  { id: "complexity", name: "Accumulation & Complexity", week: "Wk 11", blurb: "Accumulator patterns, counting steps, Big-O", color: "#65a30d" },
  { id: "search-sort", name: "Searching & Sorting", week: "Wk 12", blurb: "Linear / binary search, bubble, selection, insertion, merge sort", color: "#ea580c" },
  { id: "exceptions", name: "Exception Handling", week: "Wk 12", blurb: "try / except / else / finally, raise, common error types", color: "#dc2626" },
];

export const scTopicById = (id: ScTopicId) => SC_TOPICS.find((t) => t.id === id)!;
