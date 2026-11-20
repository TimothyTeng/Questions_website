import type { ExamQ, Flashcard, QuizQ, TopicData, TopicId } from "@/lib/he1002/types";
import adas from "./adas";
import cpi from "./cpi";
import gdp from "./gdp";
import growth from "./growth";
import inflation from "./inflation";
import keynesian from "./keynesian";
import money from "./money";
import openBasics from "./open-basics";
import openTheory from "./open-theory";
import policy from "./policy";
import saving from "./saving";
import unemployment from "./unemployment";

export const DATA: TopicData[] = [gdp, cpi, unemployment, growth, saving, money, inflation, adas, policy, keynesian, openBasics, openTheory];

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
  expr: string;
  note?: string;
}
export const ALL_FORMULAS: TFormula[] = DATA.flatMap((d) =>
  d.sections.flatMap((s) => (s.formulas ?? []).map((f) => ({ ...f, topic: d.id, section: s.title }))).map((f, i) => ({ ...f, id: `${d.id}-f${i + 1}` })),
);
