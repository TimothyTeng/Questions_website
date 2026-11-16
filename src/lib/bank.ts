// Builds the question bank: hand-written concept questions, past-paper-style exam questions and
// deterministic generated ones, per topic.
import { complexConcepts } from "@/data/concepts/complex";
import { determinantsConcepts } from "@/data/concepts/determinants";
import { dftConcepts } from "@/data/concepts/dft";
import { eigenConcepts } from "@/data/concepts/eigen";
import { leastSquaresConcepts } from "@/data/concepts/least-squares";
import { matricesConcepts } from "@/data/concepts/matrices";
import { matrixAlgebraConcepts } from "@/data/concepts/matrix-algebra";
import { orthogonalityConcepts } from "@/data/concepts/orthogonality";
import { systemsConcepts } from "@/data/concepts/systems";
import { transformationsConcepts } from "@/data/concepts/transformations";
import { vectorSpacesConcepts } from "@/data/concepts/vector-spaces";
import { vectorsConcepts } from "@/data/concepts/vectors";
import { complexExam } from "@/data/exam/complex";
import { determinantsExam } from "@/data/exam/determinants";
import { dftExam } from "@/data/exam/dft";
import { eigenExam } from "@/data/exam/eigen";
import { leastSquaresExam } from "@/data/exam/least-squares";
import { matricesExam } from "@/data/exam/matrices";
import { matrixAlgebraExam } from "@/data/exam/matrix-algebra";
import { orthogonalityExam } from "@/data/exam/orthogonality";
import { systemsExam } from "@/data/exam/systems";
import { transformationsExam } from "@/data/exam/transformations";
import { vectorSpacesExam } from "@/data/exam/vector-spaces";
import { vectorsExam } from "@/data/exam/vectors";
import { makeRng, produce, type Draft, type Rng } from "./gen/common";
import { complexGens } from "./gen/complex";
import { determinantsGens } from "./gen/determinants";
import { dftGens } from "./gen/dft";
import { eigenGens } from "./gen/eigen";
import { leastSquaresGens } from "./gen/leastSquares";
import { matricesGens } from "./gen/matrices";
import { matrixAlgebraGens } from "./gen/matrixAlgebra";
import { orthogonalityGens } from "./gen/orthogonality";
import { systemsGens } from "./gen/systems";
import { transformationsGens } from "./gen/transformations";
import { vectorSpacesGens } from "./gen/vectorSpaces";
import { vectorsGens } from "./gen/vectors";
import type { ConceptQuestion, Question, TopicId } from "./types";

/** Concept + generated questions per topic; past-paper-style exam questions come on top. */
export const PER_TOPIC = 100;

interface Source {
  topic: TopicId;
  /** Id prefix, e.g. "VEC" gives VEC-C1, VEC-E1, VEC-G1. Never change one: ids key saved progress. */
  prefix: string;
  seed: number;
  concepts: ConceptQuestion[];
  exam: ConceptQuestion[];
  gens: ((rng: Rng) => Draft)[];
}

const SOURCES: Source[] = [
  { topic: "vectors", prefix: "VEC", seed: 1001, concepts: vectorsConcepts, exam: vectorsExam, gens: vectorsGens },
  { topic: "matrices", prefix: "MTX", seed: 1101, concepts: matricesConcepts, exam: matricesExam, gens: matricesGens },
  { topic: "systems", prefix: "SYS", seed: 1201, concepts: systemsConcepts, exam: systemsExam, gens: systemsGens },
  { topic: "transformations", prefix: "LTR", seed: 1301, concepts: transformationsConcepts, exam: transformationsExam, gens: transformationsGens },
  { topic: "matrix-algebra", prefix: "ALG", seed: 2001, concepts: matrixAlgebraConcepts, exam: matrixAlgebraExam, gens: matrixAlgebraGens },
  { topic: "determinants", prefix: "DET", seed: 3001, concepts: determinantsConcepts, exam: determinantsExam, gens: determinantsGens },
  { topic: "vector-spaces", prefix: "VSP", seed: 4001, concepts: vectorSpacesConcepts, exam: vectorSpacesExam, gens: vectorSpacesGens },
  { topic: "orthogonality", prefix: "ORT", seed: 6001, concepts: orthogonalityConcepts, exam: orthogonalityExam, gens: orthogonalityGens },
  { topic: "least-squares", prefix: "LEA", seed: 7001, concepts: leastSquaresConcepts, exam: leastSquaresExam, gens: leastSquaresGens },
  { topic: "eigen", prefix: "EIG", seed: 8001, concepts: eigenConcepts, exam: eigenExam, gens: eigenGens },
  { topic: "complex", prefix: "COM", seed: 8101, concepts: complexConcepts, exam: complexExam, gens: complexGens },
  { topic: "dft", prefix: "DFT", seed: 8201, concepts: dftConcepts, exam: dftExam, gens: dftGens },
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
    const n = s.gens.length ? PER_TOPIC - concepts.length : 0;
    const generated = produce(makeRng(s.seed), s.gens, n, s.topic).map(tidyDraft);
    const own = (q: ConceptQuestion, id: string, source: Question["source"]): Question => ({ ...q, options: [...q.options], id, topic: s.topic, source });
    concepts.forEach((q, i) => out.push(own(q, `${s.prefix}-C${i + 1}`, "concept")));
    s.exam.forEach((q, i) => out.push(own(q, `${s.prefix}-E${i + 1}`, "exam")));
    generated.forEach((q, i) => out.push({ ...q, id: `${s.prefix}-G${i + 1}`, topic: s.topic, source: "generated" }));
  }
  cache = out;
  return out;
}
