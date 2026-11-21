// Server side of HE1004 AI marking (used only by src/app/api/he1004/ai/route.ts).
// The prompt is built here from the question id, so the route only ever marks HE1004 exam questions.

import { examById } from "@/data/he1004";
import { AiError, generate, listModels, modelOf, parseJson, type InlineImage } from "@/lib/sc1001/ai-server";
import { kindMeta } from "./topics";
import type { ExamQ } from "./types";

export { AiError, listModels };

const COURSE = "NTU HE1004 Mathematics for Economists I";
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

/** The question as plain text (maths stays as LaTeX between $ signs, which the model reads fine). */
export function stemText(q: ExamQ): string {
  if (q.kind !== "select") return q.prompt;
  return `${q.prompt}\n${(q.statements ?? []).map((s, i) => `(${ROMAN[i]}) ${s}`).join("\n")}`;
}

export const KIND_RULES: Record<ExamQ["kind"], string> = {
  calc: "Calculation part: method marks need the correct set-up and the key steps shown; accuracy marks need the correct final answer. A bare final answer with no working earns at most the accuracy marks. Accept equivalent forms (e.g. 1/e vs e^{-1}, exact vs correctly rounded decimals) and follow-through from a small earlier slip where the method is right.",
  proof: "Prove / justify part: the verdict alone earns little; marks need a valid argument (algebraic proof, or a specific counter-example that actually works). Circular or hand-waving reasoning earns nothing.",
  select: "Which TWO statements are wrong: marks only for naming the correct numerals.",
  explain: "Write-down-and-explain part: award marks for the correct formulas/results and for a clear explanation of each idea the rubric lists; equivalent wording is fine.",
};

function image(v: unknown): InlineImage[] {
  if (!v || typeof v !== "object") return [];
  const { mimeType, data } = v as Record<string, unknown>;
  if (typeof mimeType !== "string" || !/^image\/(png|jpe?g|webp)$/.test(mimeType)) return [];
  if (typeof data !== "string" || data.length > 6_000_000) throw new AiError("Image too large (max ~4 MB).", 413);
  return [{ mimeType, data }];
}

export async function gradeExam(body: Record<string, unknown>): Promise<{ scores: number[]; feedback: string }> {
  const q = examById(String(body.questionId));
  if (!q) throw new AiError("Unknown question.", 400);
  const answer = str(body.answer, 6000);
  const images = image(body.image);
  if (!answer.trim() && !images.length) throw new AiError("Write an answer (or attach a photo of your working) first.", 400);

  const meta = kindMeta(q.kind);
  const rubric = q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks === 1 ? "" : "s"}) ${r.point}`).join("\n");

  const g = parseJson<{ scores?: unknown[]; feedback?: unknown }>(
    await generate(
      modelOf(body.model),
      `You are a strict but fair examiner for ${COURSE}. Mark ONLY against the rubric, using the methods taught in the course. Maths is written in LaTeX between $ signs.

PART TYPE: ${meta.name} (${q.marks} marks). ${KIND_RULES[q.kind]}

QUESTION:
${stemText(q)}

MODEL ANSWER${q.answer ? ` (final answer: ${q.answer})` : ""}:
${q.model}

RUBRIC:
${rubric}

STUDENT ANSWER:
${answer.trim() || "(no typed answer — see the attached image)"}
${images.length ? "\nThe student attached a photo of their handwritten working. Read it carefully and mark it together with any typed text." : ""}

Award each rubric point 0..its marks (whole numbers, or halves where a point is worth a non-integer). Give credit for equivalent correct working even if it differs from the model answer; do not give credit for vague or contradictory statements.
Reply with ONLY a JSON object: {"scores": [one number per rubric point, in order], "feedback": "2-4 sentences: what earned marks, what was missing or wrong, and the exact fix"}`,
      true,
      images,
    ),
  );
  const scores = q.rubric.map((r, i) => Math.max(0, Math.min(r.marks, Math.round(2 * (Number(g.scores?.[i]) || 0)) / 2)));
  return { scores, feedback: String(g.feedback ?? "") };
}
