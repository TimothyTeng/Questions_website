"use client";

// Puter.js AI (https://js.puter.com/v2/, loaded by src/app/sc1001/layout.tsx). Each viewer signs in
// with their own Puter account ("user pays"), so the site needs no API key. AI marks are advisory:
// coding marks always come from the test cases.

import type { CodingProblem, OpenQ } from "./types";

interface PuterChatResponse {
  message?: { content?: string | { text?: string }[] };
  toString(): string;
}
interface Puter {
  auth: { isSignedIn(): boolean; signIn(): Promise<unknown>; signOut?(): void };
  ai: {
    chat(prompt: string, opts?: { model?: string }): Promise<PuterChatResponse | string>;
    listModels?(): Promise<({ id: string; provider?: string } | string)[]>;
  };
}

declare global {
  interface Window {
    puter?: Puter;
  }
}

export const puter = () => (typeof window === "undefined" ? undefined : window.puter);

export const isSignedIn = () => {
  try {
    return !!puter()?.auth.isSignedIn();
  } catch {
    return false;
  }
};

/** Must be called from a click handler, or the popup is blocked. */
export async function signIn() {
  const p = puter();
  if (!p) throw new Error("Puter.js has not loaded (check your connection or ad blocker).");
  await p.auth.signIn();
}

/** Chat-capable models offered by Puter, preferring well-known families. Empty if unavailable. */
export async function listModels(): Promise<string[]> {
  const raw = (await puter()?.ai.listModels?.().catch(() => [])) ?? [];
  const ids = raw.map((m) => (typeof m === "string" ? m : m.id)).filter(Boolean);
  const keep = ids.filter((id) => /claude|gpt|gemini|deepseek|grok|qwen|llama|mistral/i.test(id) && !/image|tts|whisper|embed|audio|realtime|vision-preview/i.test(id));
  return [...new Set(keep)].sort();
}

function textOf(r: PuterChatResponse | string): string {
  if (typeof r === "string") return r;
  const c = r.message?.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.map((p) => p.text ?? "").join("");
  return String(r);
}

async function ask(prompt: string, model: string): Promise<string> {
  const p = puter();
  if (!p) throw new Error("Puter.js has not loaded.");
  if (!p.auth.isSignedIn()) throw new Error("Sign in to Puter first.");
  return textOf(await p.ai.chat(prompt, model ? { model } : undefined));
}

function parseJson<T>(text: string): T {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("The AI reply was not JSON.");
  return JSON.parse(m[0]) as T;
}

export interface OpenGrade {
  scores: number[];
  feedback: string;
}

export async function gradeOpen(q: OpenQ, answer: string, model: string): Promise<OpenGrade> {
  const rubric = q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks > 1 ? "s" : ""}) ${r.point}`).join("\n");
  const prompt = `You are a strict but fair marker for NTU SC1001 (Introduction to Computational Thinking and Programming, Python).
Mark the student's answer against the rubric. Award each rubric point 0..its marks (whole numbers); give credit for equivalent correct ideas or code even if worded differently from the model answer. Python code answers must be correct to earn marks.

QUESTION:
${q.prompt}${q.code ? `\n\nCODE:\n${q.code}` : ""}

MODEL ANSWER:
${q.modelAnswer}

RUBRIC:
${rubric}

STUDENT ANSWER:
${answer.trim() || "(blank)"}

Reply with ONLY a JSON object, no markdown: {"scores": [one integer per rubric point, in order], "feedback": "2-4 sentences: what was right, what was missing, how to improve"}`;
  const g = parseJson<OpenGrade>(await ask(prompt, model));
  const scores = q.rubric.map((r, i) => Math.max(0, Math.min(r.marks, Math.round(Number(g.scores?.[i]) || 0))));
  return { scores, feedback: String(g.feedback ?? "") };
}

export interface CodeReview {
  summary: string;
  issues: string[];
  complexity: string;
  hint: string;
}

export async function reviewCode(p: CodingProblem, code: string, passed: number, total: number, firstFail: string | null, model: string): Promise<CodeReview> {
  const prompt = `You are a helpful tutor reviewing a student's Python solution for an NTU SC1001 HackerEarth-style problem (stdin -> stdout).

PROBLEM: ${p.title}
${p.statement}
INPUT: ${p.inputFormat}
OUTPUT: ${p.outputFormat}
CONSTRAINTS: ${p.constraints}

STUDENT CODE:
${code}

RESULT: passed ${passed}/${total} hidden tests.${firstFail ? `\nFIRST FAILING CASE:\n${firstFail}` : ""}

Do not write a full solution. Reply with ONLY a JSON object, no markdown:
{"summary": "1-2 sentences on correctness", "issues": ["specific bugs / edge cases / style problems, max 5"], "complexity": "time complexity of the student's code and whether it is fast enough", "hint": "one nudge towards fixing the main problem without giving away the code"}`;
  const r = parseJson<CodeReview>(await ask(prompt, model));
  return { summary: String(r.summary ?? ""), issues: Array.isArray(r.issues) ? r.issues.map(String) : [], complexity: String(r.complexity ?? ""), hint: String(r.hint ?? "") };
}
