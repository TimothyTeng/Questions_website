// Server side of the SC1001 AI features (used only by src/app/api/sc1001/ai/route.ts).
// The Gemini key comes from the GEMINI_API_KEY environment variable and never reaches the browser.
// Prompts are built here from question/problem ids, so the route can't be used as a general chatbot.

import { getScBank, problemBySlug } from "./bank";
import type { CodingProblem, OpenQ, ScQuestion } from "./types";

const BASE = "https://generativelanguage.googleapis.com/v1beta";
/** Google's alias for its current Flash model, available on the free tier. */
export const DEFAULT_MODEL = "gemini-flash-latest";
/**
 * Tried in order after the chosen model when it is overloaded, rate-limited or missing. Free-tier
 * quotas are per model, so another model often answers when one is busy. Unknown names are skipped.
 */
const FALLBACK_MODELS = ["gemini-flash-latest", "gemini-flash-lite-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
/** Give up on fallbacks after this long, to stay inside serverless time limits. */
const TOTAL_BUDGET_MS = 25_000;

export class AiError extends Error {
  constructor(
    message: string,
    public status = 500,
    /** "busy": overloaded, retry the same model; "skip": rate-limited or unknown, try the next model. */
    public retry?: "busy" | "skip",
  ) {
    super(message);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function apiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiError("AI is not set up: add GEMINI_API_KEY to the server's environment variables (.env.local or Vercel → Settings → Environment Variables).", 503);
  return key;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, { ...init, headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey() }, cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg: string = body?.error?.message ?? `Gemini request failed (${res.status})`;
    if (/API key/i.test(msg)) throw new AiError("Gemini rejected GEMINI_API_KEY. Check the key at aistudio.google.com/apikey.", 502);
    if (res.status === 429) throw new AiError("Gemini free-tier limit reached — wait a minute and retry.", 429, "skip");
    if (res.status === 404) throw new AiError(msg, 502, "skip");
    if (res.status === 503 || res.status === 500) throw new AiError("Gemini is busy right now — try again in a minute.", 503, "busy");
    throw new AiError(msg, 502);
  }
  return body as T;
}

/** Models the key can use for text generation, newest-looking first. */
export async function listModels(): Promise<string[]> {
  const r = await call<{ models?: { name: string; supportedGenerationMethods?: string[] }[] }>("models?pageSize=200");
  return (r.models ?? [])
    .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => m.name.replace(/^models\//, ""))
    .filter((id) => /^gemini/.test(id) && !/image|tts|audio|live|embedding|vision|robotics|computer-use/.test(id))
    .sort()
    .reverse();
}

interface GenResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  promptFeedback?: { blockReason?: string };
}

/** Calls the chosen model, retrying a busy model once and then falling back to other free models. */
async function generate(model: string, prompt: string, json: boolean): Promise<string> {
  const start = Date.now();
  let last: unknown;
  for (const m of [...new Set([model, ...FALLBACK_MODELS])]) {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (Date.now() - start > TOTAL_BUDGET_MS) throw last;
      try {
        return await generateOnce(m, prompt, json);
      } catch (e) {
        last = e;
        if (!(e instanceof AiError) || !e.retry) throw e;
        if (e.retry === "skip") break;
        await sleep(1000);
      }
    }
  }
  throw last;
}

async function generateOnce(model: string, prompt: string, json: boolean): Promise<string> {
  const r = await call<GenResponse>(`models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      // Thinking models count their reasoning towards this limit, so leave plenty of room.
      generationConfig: { temperature: 0.3, maxOutputTokens: 4096, ...(json ? { responseMimeType: "application/json" } : {}) },
    }),
  });
  const text = r.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text.trim()) throw new AiError(r.promptFeedback?.blockReason ? `Gemini blocked the request (${r.promptFeedback.blockReason}).` : "Gemini returned an empty reply — try again.", 502);
  return text.trim();
}

function parseJson<T>(text: string): T {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new AiError("The AI reply was not JSON — try again.", 502);
  return JSON.parse(m[0]) as T;
}

// ---------------------------------------------------------------- request validation

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

function question(id: unknown): ScQuestion {
  const q = getScBank().find((x) => x.id === id);
  if (!q) throw new AiError("Unknown question.", 400);
  return q;
}
function problem(slug: unknown): CodingProblem {
  const p = typeof slug === "string" ? problemBySlug(slug) : undefined;
  if (!p) throw new AiError("Unknown problem.", 400);
  return p;
}
const modelOf = (v: unknown) => (typeof v === "string" && /^gemini[\w.-]*$/.test(v) ? v : DEFAULT_MODEL);

// ---------------------------------------------------------------- prompts

const COURSE = "NTU SC1001 (Introduction to Computational Thinking and Programming, Python 3)";

const questionText = (q: ScQuestion) =>
  `${q.prompt}${q.code ? `\n\nCODE:\n${q.code}` : ""}${q.kind === "mcq" ? `\n\nOPTIONS:\n${q.options.map((o, i) => `${"ABCD"[i]}) ${o}`).join("\n")}` : ""}`;

const problemText = (p: CodingProblem) =>
  `PROBLEM: ${p.title}\n${p.statement}\nINPUT: ${p.inputFormat}\nOUTPUT: ${p.outputFormat}\nCONSTRAINTS: ${p.constraints}\nSAMPLE INPUT:\n${p.samples[0]?.input ?? ""}\nSAMPLE OUTPUT:\n${p.samples[0]?.output ?? ""}`;

export async function questionHint(body: Record<string, unknown>): Promise<{ hint: string }> {
  const q = question(body.questionId);
  const attempt = str(body.attempt, 2000);
  const previous = (Array.isArray(body.previous) ? body.previous : []).slice(-4).map((h) => str(h, 800));
  const answer = q.kind === "mcq" ? `Correct option: ${"ABCD"[q.answer]}` : q.kind === "short" ? `Correct answer: ${q.accept[0]}` : `Model answer: ${q.modelAnswer}`;
  const hint = await generate(
    modelOf(body.model),
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
  return { hint };
}

export async function codeHint(body: Record<string, unknown>): Promise<{ hint: string }> {
  const p = problem(body.slug);
  const code = str(body.code, 8000);
  const lastRun = str(body.lastRun, 3000);
  const stuck = str(body.stuck, 500);
  const hint = await generate(
    modelOf(body.model),
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
  return { hint };
}

export async function gradeOpen(body: Record<string, unknown>): Promise<{ scores: number[]; feedback: string }> {
  const q = question(body.questionId);
  if (q.kind !== "open") throw new AiError("Only open-ended questions can be AI-marked.", 400);
  const answer = str(body.answer, 4000);
  const rubric = q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks > 1 ? "s" : ""}) ${r.point}`).join("\n");
  const g = parseJson<{ scores?: unknown[]; feedback?: unknown }>(
    await generate(
      modelOf(body.model),
      `You are a strict but fair marker for ${COURSE}.
Mark the student's answer against the rubric. Award each rubric point 0..its marks (whole numbers); give credit for equivalent correct ideas or code even if worded differently from the model answer. Python code answers must be correct to earn marks.

QUESTION:
${q.prompt}${q.code ? `\n\nCODE:\n${q.code}` : ""}

MODEL ANSWER:
${(q as OpenQ).modelAnswer}

RUBRIC:
${rubric}

STUDENT ANSWER:
${answer.trim() || "(blank)"}

Reply with ONLY a JSON object: {"scores": [one integer per rubric point, in order], "feedback": "2-4 sentences: what was right, what was missing, how to improve"}`,
      true,
    ),
  );
  const scores = q.rubric.map((r, i) => Math.max(0, Math.min(r.marks, Math.round(Number(g.scores?.[i]) || 0))));
  return { scores, feedback: String(g.feedback ?? "") };
}

export async function reviewCode(body: Record<string, unknown>) {
  const p = problem(body.slug);
  const passed = Number(body.passed) || 0;
  const firstFail = str(body.firstFail, 3000);
  const r = parseJson<{ summary?: unknown; issues?: unknown; complexity?: unknown; hint?: unknown }>(
    await generate(
      modelOf(body.model),
      `You are a helpful tutor reviewing a student's Python solution for a ${COURSE} HackerEarth-style problem (stdin -> stdout).

${problemText(p)}

STUDENT CODE:
${str(body.code, 8000)}

RESULT: passed ${passed}/${p.tests.length} hidden tests.${firstFail ? `\nFIRST FAILING CASE:\n${firstFail}` : ""}

Do not write a full solution. Reply with ONLY a JSON object:
{"summary": "1-2 sentences on correctness", "issues": ["specific bugs / edge cases / style problems, max 5"], "complexity": "time complexity of the student's code and whether it is fast enough", "hint": "one nudge towards fixing the main problem without giving away the code"}`,
      true,
    ),
  );
  return { summary: String(r.summary ?? ""), issues: Array.isArray(r.issues) ? r.issues.map(String) : [], complexity: String(r.complexity ?? ""), hint: String(r.hint ?? "") };
}
