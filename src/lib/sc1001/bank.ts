// Assembles the SC1001 question bank and problem set from src/data/sc1001.
import { PROBLEMS } from "@/data/sc1001/problems";
import { QUESTIONS_BY_TOPIC } from "@/data/sc1001/questions";
import { SC_TOPICS } from "./topics";
import type { CodingProblem, ScQuestion, ScTopicId } from "./types";

const PREFIX: Record<ScTopicId, string> = {
  "ct-basics": "CT",
  "flowchart-pseudo": "FLOW",
  "types-vars-io": "TYPE",
  "boolean-selection": "BOOL",
  "more-selection": "SEL",
  repetition: "LOOP",
  strings: "STR",
  composite: "COMP",
  functions: "FUNC",
  "decomposition-patterns": "DEC",
  recursion: "REC",
  complexity: "CPLX",
  "search-sort": "SORT",
  exceptions: "EXC",
};

let cache: ScQuestion[] | null = null;

export function getScBank(): ScQuestion[] {
  if (cache) return cache;
  cache = SC_TOPICS.flatMap((t) => QUESTIONS_BY_TOPIC[t.id].map((q, i) => ({ ...q, id: `${PREFIX[t.id]}-${i + 1}`, topic: t.id }) as ScQuestion));
  return cache;
}

export const getProblems = (): CodingProblem[] => PROBLEMS;
export const problemBySlug = (slug: string) => PROBLEMS.find((p) => p.slug === slug);
