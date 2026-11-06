// Builds the 500-question bank: hand-written concept questions + deterministic generated ones.
import { complexConcepts } from "@/data/concepts/complex";
import { dftConcepts } from "@/data/concepts/dft";
import { eigenConcepts } from "@/data/concepts/eigen";
import { leastSquaresConcepts } from "@/data/concepts/least-squares";
import { orthogonalityConcepts } from "@/data/concepts/orthogonality";
import { makeRng, produce, type Draft, type Rng } from "./gen/common";
import { complexGens } from "./gen/complex";
import { dftGens } from "./gen/dft";
import { eigenGens } from "./gen/eigen";
import { leastSquaresGens } from "./gen/leastSquares";
import { orthogonalityGens } from "./gen/orthogonality";
import type { ConceptQuestion, Question, TopicId } from "./types";

export const PER_TOPIC = 100;

const SOURCES: { topic: TopicId; seed: number; concepts: ConceptQuestion[]; gens: ((rng: Rng) => Draft)[] }[] = [
  { topic: "orthogonality", seed: 6001, concepts: orthogonalityConcepts, gens: orthogonalityGens },
  { topic: "least-squares", seed: 7001, concepts: leastSquaresConcepts, gens: leastSquaresGens },
  { topic: "eigen", seed: 8001, concepts: eigenConcepts, gens: eigenGens },
  { topic: "complex", seed: 8101, concepts: complexConcepts, gens: complexGens },
  { topic: "dft", seed: 8201, concepts: dftConcepts, gens: dftGens },
];

/** Cosmetic clean-up of generated LaTeX: e^{j-x} → e^{-jx}, "+ -x" → "- x". */
const tidy = (s: string) => s.replace(/e\^\{j-/g, "e^{-j").replace(/\+ -(?=[\d\\])/g, "- ");
const tidyDraft = (q: Draft): Draft => ({ ...q, prompt: tidy(q.prompt), solution: tidy(q.solution), options: q.options.map(tidy) });

let cache: Question[] | null = null;

export function getBank(): Question[] {
  if (cache) return cache;
  const out: Question[] = [];
  for (const s of SOURCES) {
    const concepts = s.concepts.slice(0, PER_TOPIC);
    const generated = produce(makeRng(s.seed), s.gens, PER_TOPIC - concepts.length, s.topic).map(tidyDraft);
    const prefix = s.topic.slice(0, 3).toUpperCase();
    concepts.forEach((q, i) => out.push({ ...q, options: [...q.options], id: `${prefix}-C${i + 1}`, topic: s.topic, source: "concept" }));
    generated.forEach((q, i) => out.push({ ...q, id: `${prefix}-G${i + 1}`, topic: s.topic, source: "generated" }));
  }
  cache = out;
  return out;
}
