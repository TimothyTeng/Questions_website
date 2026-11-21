import type { ExamKind, TopicId } from "./types";

export interface Topic {
  id: TopicId;
  /** Lecture note number. */
  n: number;
  part: 1 | 2 | 3;
  name: string;
  blurb: string;
  color: string;
  /** Where the content comes from. */
  from: string;
}

export const TOPICS: Topic[] = [
  { id: "algebra", n: 1, part: 1, name: "Algebra", blurb: "Real, rational and irrational numbers, integer powers and compound interest, rules of algebra and the quadratic identities, fractions, fractional powers and roots, inequalities, intervals and absolute values", color: "#4f46e5", from: "Lecture Note 1 · Assignment 1" },
  { id: "sums-logic-sets", n: 2, part: 1, name: "Sums, Logic & Sets", blurb: "Summation notation and the rules for sums, double sums, implication, necessary and sufficient conditions, direct and indirect proof, deductive vs inductive reasoning, sets, subsets, complements and Venn diagrams", color: "#0d9488", from: "Lecture Note 2 · Assignments 2–3" },
  { id: "functions", n: 3, part: 1, name: "Functions of One Variable", blurb: "Domain and range, linear functions and slopes, quadratics, polynomials, power functions, exponential growth and decay, natural logarithms and their rules", color: "#ea580c", from: "Lecture Note 3 · Assignments 3–4" },
  { id: "function-props", n: 4, part: 1, name: "Properties of Functions", blurb: "Shifting graphs (and taxes shifting supply), new functions from old, one-to-one and inverse functions, general functions", color: "#be185d", from: "Lecture Note 4 · Assignments 5–6" },
  { id: "differentiation", n: 5, part: 2, name: "Differentiation", blurb: "Slopes and tangents, the derivative and its definition, increasing/decreasing functions, rates of change and marginal concepts, limits, differentiation rules, the chain rule, higher derivatives, derivatives of exponentials and logarithms", color: "#2563eb", from: "Lecture Note 5 · Assignments 5–7" },
  { id: "derivatives-use", n: 6, part: 2, name: "Derivatives in Use", blurb: "Implicit differentiation and tangent lines, differentiating the inverse, linear and polynomial (Taylor) approximations, elasticities, continuity, more on limits, L'Hôpital's rule", color: "#059669", from: "Lecture Note 6 · Assignments 7–8" },
  { id: "optimisation", n: 7, part: 2, name: "Single-Variable Optimisation", blurb: "Maximum and minimum points, the first-derivative test, the extreme value theorem, local extreme points and the second-derivative test, inflection points, profit and revenue maximisation", color: "#d97706", from: "Lecture Note 7 · Assignments 7–8" },
  { id: "integration", n: 8, part: 2, name: "Integration", blurb: "Indefinite integrals, area and definite integrals, properties of definite integrals, integration by parts and by substitution, infinite intervals, consumer and producer surplus", color: "#7c3aed", from: "Lecture Note 8 · Assignment 9" },
  { id: "matrices", n: 9, part: 3, name: "Basic Matrix Algebra", blurb: "Matrix operations (addition, scalar and matrix multiplication), the transpose, determinants, the inverse of a matrix, symmetric and idempotent matrices", color: "#db2777", from: "Lecture Note 9 · Assignment 10" },
  { id: "multivariable", n: 10, part: 3, name: "Functions of Many Variables", blurb: "Functions of two variables and their graphs, partial derivatives, higher-order and mixed partials, the Hessian, functions of more variables, Cobb–Douglas functions", color: "#0891b2", from: "Lecture Note 10 · past paper" },
  { id: "constrained", n: 11, part: 3, name: "Two-Variable & Constrained Optimisation", blurb: "Chain rules, stationary points, necessary and sufficient conditions for two-variable extrema, constrained optimisation and utility maximisation with a budget", color: "#65a30d", from: "Lecture Note 11 · past paper" },
];

export const PARTS = [
  { part: 1 as const, name: "Foundations", note: "Lecture Notes 1–4" },
  { part: 2 as const, name: "Single-variable calculus", note: "Lecture Notes 5–8" },
  { part: 3 as const, name: "Matrices & many variables", note: "Lecture Notes 9–11" },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;

export const KINDS: { k: ExamKind; name: string; note: string }[] = [
  { k: "calc", name: "Calculation", note: "Show every step of your working; state the rule you use." },
  { k: "proof", name: "Prove / justify", note: "Give a clear justification or proof (or a counter-example to disprove)." },
  { k: "select", name: "Spot the wrong statements", note: "Write down the Roman numerals of the TWO wrong statements only." },
  { k: "explain", name: "Write down & explain", note: "State the result, then explain the reasoning in a few sentences." },
];

export const kindMeta = (k: ExamKind) => KINDS.find((x) => x.k === k)!;

/**
 * Mock paper layout, following the past paper: 4 questions × 5 parts × 5 marks.
 *  Q1 — algebra, sums, limits and basic integrals
 *  Q2 — limits, the definition of the derivative, implicit differentiation and tangents
 *  Q3 — optimisation and economic applications (profit, revenue, surplus, tax and elasticity)
 *  Q4 — many variables, constrained optimisation, matrices and approximations
 */
export const PAPER: { q: number; name: string; topics: TopicId[] }[] = [
  { q: 1, name: "Algebra, sums, limits & integrals", topics: ["algebra", "sums-logic-sets", "functions", "function-props", "integration"] },
  { q: 2, name: "Limits & differentiation", topics: ["differentiation", "derivatives-use"] },
  { q: 3, name: "Optimisation & economic applications", topics: ["optimisation", "integration", "derivatives-use"] },
  { q: 4, name: "Many variables, matrices & approximations", topics: ["multivariable", "constrained", "matrices", "derivatives-use"] },
];
