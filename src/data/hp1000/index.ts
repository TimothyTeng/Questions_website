import type { Flashcard, Question, TopicData, TopicId } from "@/lib/hp1000/types";
import bio from "./bio";
import cognition from "./cognition";
import development from "./development";
import disorders from "./disorders";
import learning from "./learning";
import memory from "./memory";
import motivation from "./motivation";
import personality from "./personality";
import sensation from "./sensation";
import social from "./social";
import stress from "./stress";

export const DATA: TopicData[] = [bio, sensation, learning, memory, cognition, disorders, personality, development, motivation, stress, social];

export const dataFor = (id: TopicId) => DATA.find((d) => d.id === id)!;

export type TQuestion = Question & { topic: TopicId };
export type TCard = Flashcard & { topic: TopicId };

export const ALL_QUESTIONS: TQuestion[] = DATA.flatMap((d) => d.questions.map((q) => ({ ...q, topic: d.id })));
export const ALL_CARDS: TCard[] = DATA.flatMap((d) => d.flashcards.map((c) => ({ ...c, topic: d.id })));
