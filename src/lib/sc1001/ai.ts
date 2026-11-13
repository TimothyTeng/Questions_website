"use client";

// Browser side of the SC1001 AI features. Requests go to our own route (/api/sc1001/ai), which holds
// the Gemini key (GEMINI_API_KEY) and builds the prompts. AI output is advisory: coding marks always
// come from the test cases.

import type { CodingProblem, OpenQ, ScQuestion } from "./types";

export const DEFAULT_MODEL = "gemini-flash-latest";

export interface AiConfig {
  model: string;
}

async function post<T>(action: string, cfg: AiConfig, fields: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/sc1001/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, model: cfg.model, ...fields }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error ?? `AI request failed (${res.status})`);
  return body as T;
}

export const listModels = async (cfg: AiConfig) => (await post<{ models: string[] }>("models", cfg, {})).models;

/** A nudge for a practice question that does not give the answer away. */
export const questionHint = async (cfg: AiConfig, q: ScQuestion, attempt: string, previous: string[]) =>
  (await post<{ hint: string }>("questionHint", cfg, { questionId: q.id, attempt, previous })).hint;

/** A hint based on the student's current code for a coding problem. */
export const codeHint = async (cfg: AiConfig, p: CodingProblem, code: string, lastRun: string | null, stuck: string) =>
  (await post<{ hint: string }>("codeHint", cfg, { slug: p.slug, code, lastRun, stuck })).hint;

export interface OpenGrade {
  scores: number[];
  feedback: string;
}

export const gradeOpen = (cfg: AiConfig, q: OpenQ & { id: string }, answer: string) => post<OpenGrade>("gradeOpen", cfg, { questionId: q.id, answer });

export interface CodeReview {
  summary: string;
  issues: string[];
  complexity: string;
  hint: string;
}

export const reviewCode = (cfg: AiConfig, p: CodingProblem, code: string, passed: number, _total: number, firstFail: string | null) =>
  post<CodeReview>("reviewCode", cfg, { slug: p.slug, code, passed, firstFail });
