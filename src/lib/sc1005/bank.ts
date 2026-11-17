// Assembles the SC1005 question bank from src/data/sc1005/questions.
import { QUESTIONS_BY_TOPIC } from "@/data/sc1005/questions";
import { TOPICS } from "./topics";
import type { Question } from "./types";

let cache: Question[] | null = null;

export function getBank(): Question[] {
  if (cache) return cache;
  cache = TOPICS.flatMap((t) => QUESTIONS_BY_TOPIC[t.id].map((q, i) => ({ ...q, id: `C${t.ch}-${i + 1}`, topic: t.id }) as Question));
  return cache;
}
