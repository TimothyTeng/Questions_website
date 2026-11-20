// Server side of HE1002 AI marking (used only by src/app/api/he1002/ai/route.ts).
// The prompt is built here from the question id, so the route only ever marks HE1002 exam questions.

import { examById } from "@/data/he1002";
import { AiError, generate, listModels, modelOf, parseJson, type InlineImage } from "@/lib/sc1001/ai-server";
import { sectionMeta } from "./topics";

export { AiError, listModels };

const COURSE = "NTU HE1002 Macroeconomics I (Mankiw, Principles of Macroeconomics)";
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

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

  const meta = sectionMeta(q.section);
  const stem =
    q.section === "tf"
      ? `True or false: ${q.prompt}`
      : q.parts
        ? `${q.prompt}\n${q.parts.map((p) => `${p.label} ${p.prompt} (${p.marks} marks)`).join("\n")}`
        : q.prompt;
  const rubric = q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks > 1 ? "s" : ""}) ${r.point}`).join("\n");
  const rules: Record<string, string> = {
    calc: "Calculation question: the student must state the formula used and show working. A correct final answer with no formula or working cannot get full marks. Accept equivalent rounding (e.g. 62.5 vs 62.50) and equivalent formula notation.",
    short: "Short-answer question (expected 3–4 sentences). Award a rubric point only if the idea is clearly stated; equivalent wording is fine.",
    tf: `True/false question. The correct verdict is ${q.tf ? "TRUE" : "FALSE"}. A correct verdict with no reasoning earns at most the verdict mark; reasoning that supports the wrong verdict earns little.`,
    diagram:
      "Diagram question. The student may describe their diagram in words and/or attach a photo of a hand-drawn diagram. Give diagram marks only if the axes, curve labels, the shift and its direction, and the equilibria are clearly shown or described.",
  };

  const g = parseJson<{ scores?: unknown[]; feedback?: unknown }>(
    await generate(
      modelOf(body.model),
      `You are a strict but fair examiner for ${COURSE}. Mark ONLY against the rubric, using the course's own concepts.

SECTION: Question ${meta.q} — ${meta.name} (${q.marks} marks). ${rules[q.section]}

QUESTION:
${stem}

MODEL ANSWER:
${q.model}

RUBRIC:
${rubric}

STUDENT ANSWER:
${answer.trim() || "(no typed answer — see the attached image)"}
${images.length ? "\nThe student attached an image of their handwritten working/diagram. Read it carefully and mark it together with any typed text." : ""}

Award each rubric point 0..its marks (whole numbers). Give credit for equivalent correct ideas even if worded differently from the model answer; do not give credit for vague or contradictory statements.
Reply with ONLY a JSON object: {"scores": [one integer per rubric point, in order], "feedback": "2-4 sentences: what earned marks, what was missing or wrong, and the exact fix"}`,
      true,
      images,
    ),
  );
  const scores = q.rubric.map((r, i) => Math.max(0, Math.min(r.marks, Math.round(Number(g.scores?.[i]) || 0))));
  return { scores, feedback: String(g.feedback ?? "") };
}
