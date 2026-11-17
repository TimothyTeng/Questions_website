"use client";

import { makeProgressStore } from "@/lib/progress";

// SC1005 per-browser question attempts.
export const { recordAnswers, resetProgress, useProgress } = makeProgressStore("sc1005-progress-v1");
