import type { ExamQ, Flashcard, QuizQ, TopicData, TopicId } from "@/lib/he1004/types";
import algebra from "./algebra";
import constrained from "./constrained";
import derivativesUse from "./derivatives-use";
import differentiation from "./differentiation";
import functionProps from "./function-props";
import functions from "./functions";
import integration from "./integration";
import matrices from "./matrices";
import multivariable from "./multivariable";
import optimisation from "./optimisation";
import sumsLogicSets from "./sums-logic-sets";

export const DATA: TopicData[] = [algebra, sumsLogicSets, functions, functionProps, differentiation, derivativesUse, optimisation, integration, matrices, multivariable, constrained];

export const dataFor = (id: TopicId) => DATA.find((d) => d.id === id)!;

export type TQuiz = QuizQ & { topic: TopicId };
export type TCard = Flashcard & { topic: TopicId };
export type TExam = ExamQ & { topic: TopicId };

export const ALL_QUIZ: TQuiz[] = DATA.flatMap((d) => d.quiz.map((q) => ({ ...q, topic: d.id })));
export const ALL_CARDS: TCard[] = DATA.flatMap((d) => d.flashcards.map((c) => ({ ...c, topic: d.id })));
export const ALL_EXAM: TExam[] = DATA.flatMap((d) => d.exam.map((q) => ({ ...q, topic: d.id })));

export const examById = (id: string) => ALL_EXAM.find((q) => q.id === id);

/** Formula bank: every formula from the content pages, in lecture order. */
export interface TFormula {
  id: string;
  topic: TopicId;
  section: string;
  name: string;
  tex: string;
  note?: string;
}
export const ALL_FORMULAS: TFormula[] = DATA.flatMap((d) =>
  d.sections.flatMap((s) => (s.formulas ?? []).map((f) => ({ ...f, topic: d.id, section: s.title }))).map((f, i) => ({ ...f, id: `${d.id}-f${i + 1}` })),
);
