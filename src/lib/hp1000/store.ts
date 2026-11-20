"use client";

import { makeProgressStore } from "@/lib/progress";

// HP1000 per-browser history: question attempts and flashcard self-ratings are kept apart.
export const { recordAnswers, resetProgress, useProgress } = makeProgressStore("hp1000-progress-v1");

const cards = makeProgressStore("hp1000-cards-v1");
export const recordCards = cards.recordAnswers;
export const resetCards = cards.resetProgress;
export const useCardProgress = cards.useProgress;
