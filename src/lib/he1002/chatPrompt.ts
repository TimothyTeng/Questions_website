import type { TExam } from "@/data/he1002";
import { sectionMeta, topicById } from "./topics";

/**
 * Plain-text marking prompt to paste into any chatbot when Gemini marking is unavailable.
 * Contains the marking instructions, then each question with its rubric, model answer and the student's answer.
 */
export function chatMarkingPrompt(items: { q: TExam; num: string; answer: string; hadImage?: boolean }[]): string {
  const total = items.reduce((a, x) => a + x.q.marks, 0);
  const head = `You are a strict but fair examiner for NTU HE1002 Macroeconomics I (Mankiw, Principles of Macroeconomics).
Mark each of my answers below ONLY against its rubric. Award each rubric point 0 up to its marks (whole numbers). Give credit for equivalent correct ideas even if worded differently from the model answer, but not for vague or contradictory statements.
Section rules:
- Calculation: I must state the formula and show working; a correct final number alone cannot get full marks. Accept equivalent rounding.
- Short answer: award a point only if the idea is clearly stated.
- True/false: a correct verdict with no reasoning earns at most the verdict mark.
- Diagram: I describe my diagram in words; give diagram marks only if axes, curve labels, the shift and its direction, and the equilibria are clearly described.

For EACH question reply with:
<number> — <score>/<marks>
- one line per rubric point: awarded/available and why
- Feedback: what was missing or wrong, and the exact fix
Finish with a table of all scores and the total out of ${total}.

${items.length} question${items.length === 1 ? "" : "s"}, ${total} marks.`;

  const body = items.map(({ q, num, answer, hadImage }) => {
    const t = topicById(q.topic);
    const sec = sectionMeta(q.section);
    const stem =
      q.section === "tf"
        ? `True or false: ${q.prompt}`
        : q.parts
          ? `${q.prompt}\n${q.parts.map((p) => `${p.label} ${p.prompt} (${p.marks} marks)`).join("\n")}`
          : q.prompt;
    return `==================== ${num} · ${sec.name} · ${q.marks} marks · Lecture ${t.n}: ${t.name} ====================
QUESTION:
${stem}

RUBRIC:
${q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks > 1 ? "s" : ""}) ${r.point}`).join("\n")}

MODEL ANSWER${q.section === "tf" ? ` (correct verdict: ${q.tf ? "TRUE" : "FALSE"})` : q.answer ? ` (final answer: ${q.answer})` : ""}:
${q.model}

MY ANSWER:
${answer.trim() || "(blank)"}${hadImage ? "\n(I also drew a diagram/working on paper that is not included here — mark only the text above.)" : ""}`;
  });

  return [head, ...body].join("\n\n");
}

/** Copies text, falling back to a hidden textarea where the async clipboard API is unavailable. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}
