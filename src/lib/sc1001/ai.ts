"use client";

// Gemini (Google AI Studio) called straight from the browser with the viewer's own API key, which is
// kept in this browser's localStorage and sent only to generativelanguage.googleapis.com. The site is
// public, so a server-side key would let anyone spend it. AI output is advisory: coding marks always
// come from the test cases.

import type { CodingProblem, OpenQ, ScQuestion } from "./types";

const BASE = "https://generativelanguage.googleapis.com/v1beta";
export const KEY_URL = "https://aistudio.google.com/apikey";
/** Google's alias for its current Flash model, available on the free tier. */
export const DEFAULT_MODEL = "gemini-flash-latest";

export interface AiConfig {
  key: string;
  model: string;
}

async function call<T>(cfg: AiConfig, path: string, init?: RequestInit): Promise<T> {
  if (!cfg.key) throw new Error("Add your Gemini API key first.");
  const res = await fetch(`${BASE}/${path}`, { ...init, headers: { "Content-Type": "application/json", "x-goog-api-key": cfg.key, ...init?.headers } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg: string = body?.error?.message ?? `Gemini request failed (${res.status})`;
    if (res.status === 429) throw new Error(`Gemini free-tier limit reached — wait a minute and retry, or pick another model. (${msg})`);
    if (/API key/i.test(msg)) throw new Error("Gemini rejected the API key. Check it at aistudio.google.com/apikey.");
    throw new Error(msg);
  }
  return body as T;
}

/** Models this key can use for text generation, newest-looking first. */
export async function listModels(cfg: AiConfig): Promise<string[]> {
  const r = await call<{ models?: { name: string; supportedGenerationMethods?: string[] }[] }>(cfg, "models?pageSize=200");
  return (r.models ?? [])
    .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => m.name.replace(/^models\//, ""))
    .filter((id) => /^gemini/.test(id) && !/image|tts|audio|live|embedding|vision|robotics|computer-use/.test(id))
    .sort()
    .reverse();
}

interface GenResponse {
  candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
}

async function generate(cfg: AiConfig, prompt: string, json: boolean): Promise<string> {
  const r = await call<GenResponse>(cfg, `models/${encodeURIComponent(cfg.model || DEFAULT_MODEL)}:generateContent`, {
    method: "POST",
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, ...(json ? { responseMimeType: "application/json" } : {}) },
    }),
  });
  const text = r.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text.trim()) throw new Error(r.promptFeedback?.blockReason ? `Gemini blocked the request (${r.promptFeedback.blockReason}).` : "Gemini returned an empty reply — try again.");
  return text.trim();
}

function parseJson<T>(text: string): T {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("The AI reply was not JSON — try again.");
  return JSON.parse(m[0]) as T;
}

const COURSE = "NTU SC1001 (Introduction to Computational Thinking and Programming, Python 3)";

const questionText = (q: ScQuestion) =>
  `${q.prompt}${q.code ? `\n\nCODE:\n${q.code}` : ""}${q.kind === "mcq" ? `\n\nOPTIONS:\n${q.options.map((o, i) => `${"ABCD"[i]}) ${o}`).join("\n")}` : ""}`;

const problemText = (p: CodingProblem) =>
  `PROBLEM: ${p.title}\n${p.statement}\nINPUT: ${p.inputFormat}\nOUTPUT: ${p.outputFormat}\nCONSTRAINTS: ${p.constraints}\nSAMPLE INPUT:\n${p.samples[0]?.input ?? ""}\nSAMPLE OUTPUT:\n${p.samples[0]?.output ?? ""}`;

/** A nudge for a practice question that does not give the answer away. */
export async function questionHint(cfg: AiConfig, q: ScQuestion, attempt: string, previous: string[]): Promise<string> {
  const answer = q.kind === "mcq" ? `Correct option: ${"ABCD"[q.answer]}` : q.kind === "short" ? `Correct answer: ${q.accept[0]}` : `Model answer: ${q.modelAnswer}`;
  return generate(
    cfg,
    `You are a patient tutor for ${COURSE}. A student wants a HINT for this question.

QUESTION:
${questionText(q)}

(For you only — never reveal it.) ${answer}
Explanation: ${q.solution}

${attempt.trim() ? `The student's current answer/working: ${attempt}` : "The student has not answered yet."}
${previous.length ? `Hints already given (go one step further, don't repeat them):\n- ${previous.join("\n- ")}` : ""}

Give ONE short hint (2-4 sentences): point to the concept or the first step to trace, e.g. which line to look at or what value a variable has after the first iteration. Do NOT state the final answer, the correct option letter, or the full output. Plain text; wrap code in backticks.`,
    false,
  );
}

/** A hint based on the student's current code for a coding problem. */
export async function codeHint(cfg: AiConfig, p: CodingProblem, code: string, lastRun: string | null, stuck: string): Promise<string> {
  return generate(
    cfg,
    `You are a patient tutor for ${COURSE}. Students solve HackerEarth-style problems: read stdin, print stdout, marked by hidden test cases.

${problemText(p)}

STUDENT'S CURRENT CODE:
\`\`\`python
${code}
\`\`\`
${lastRun ? `\nLAST RUN RESULT:\n${lastRun}\n` : ""}${stuck.trim() ? `\nTHE STUDENT SAYS: ${stuck}\n` : ""}
Give a HINT based on what their code does right now:
- If there is a bug, say which line or idea is wrong and why, without writing the fixed code.
- If they are just starting, suggest the next step or the approach (e.g. which data structure or loop) and the input parsing.
- Mention an edge case or efficiency issue only if it matters.
At most 5 sentences, with a code fragment of 2 lines or less if it really helps. Never write the full solution. Plain text; wrap code in backticks.`,
    false,
  );
}

export interface OpenGrade {
  scores: number[];
  feedback: string;
}

export async function gradeOpen(cfg: AiConfig, q: OpenQ, answer: string): Promise<OpenGrade> {
  const rubric = q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks > 1 ? "s" : ""}) ${r.point}`).join("\n");
  const prompt = `You are a strict but fair marker for ${COURSE}.
Mark the student's answer against the rubric. Award each rubric point 0..its marks (whole numbers); give credit for equivalent correct ideas or code even if worded differently from the model answer. Python code answers must be correct to earn marks.

QUESTION:
${q.prompt}${q.code ? `\n\nCODE:\n${q.code}` : ""}

MODEL ANSWER:
${q.modelAnswer}

RUBRIC:
${rubric}

STUDENT ANSWER:
${answer.trim() || "(blank)"}

Reply with ONLY a JSON object: {"scores": [one integer per rubric point, in order], "feedback": "2-4 sentences: what was right, what was missing, how to improve"}`;
  const g = parseJson<OpenGrade>(await generate(cfg, prompt, true));
  const scores = q.rubric.map((r, i) => Math.max(0, Math.min(r.marks, Math.round(Number(g.scores?.[i]) || 0))));
  return { scores, feedback: String(g.feedback ?? "") };
}

export interface CodeReview {
  summary: string;
  issues: string[];
  complexity: string;
  hint: string;
}

export async function reviewCode(cfg: AiConfig, p: CodingProblem, code: string, passed: number, total: number, firstFail: string | null): Promise<CodeReview> {
  const prompt = `You are a helpful tutor reviewing a student's Python solution for a ${COURSE} HackerEarth-style problem (stdin -> stdout).

${problemText(p)}

STUDENT CODE:
${code}

RESULT: passed ${passed}/${total} hidden tests.${firstFail ? `\nFIRST FAILING CASE:\n${firstFail}` : ""}

Do not write a full solution. Reply with ONLY a JSON object:
{"summary": "1-2 sentences on correctness", "issues": ["specific bugs / edge cases / style problems, max 5"], "complexity": "time complexity of the student's code and whether it is fast enough", "hint": "one nudge towards fixing the main problem without giving away the code"}`;
  const r = parseJson<CodeReview>(await generate(cfg, prompt, true));
  return { summary: String(r.summary ?? ""), issues: Array.isArray(r.issues) ? r.issues.map(String) : [], complexity: String(r.complexity ?? ""), hint: String(r.hint ?? "") };
}
