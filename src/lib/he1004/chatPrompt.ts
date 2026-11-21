import type { TExam } from "@/data/he1004";
import { kindMeta, topicById } from "./topics";

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

const stem = (q: TExam) => (q.kind !== "select" ? q.prompt : `${q.prompt}\n${(q.statements ?? []).map((s, i) => `(${ROMAN[i]}) ${s}`).join("\n")}`);

/**
 * Plain-text marking prompt to paste into any chatbot when Gemini marking is unavailable.
 * Contains the marking instructions, then each question with its rubric, model answer and the student's answer.
 */
export function chatMarkingPrompt(items: { q: TExam; num: string; answer: string; hadImage?: boolean }[]): string {
  const total = items.reduce((a, x) => a + x.q.marks, 0);
  const head = `You are a strict but fair examiner for NTU HE1004 Mathematics for Economists I. Maths is written in LaTeX between $ signs.
Mark each of my answers below ONLY against its rubric. Award each rubric point 0 up to its marks. Give credit for equivalent correct working even if it differs from the model answer, but not for vague or contradictory statements.
Part-type rules:
- Calculation: method marks need the set-up and key steps; a bare final answer earns at most the accuracy marks. Accept equivalent forms and follow-through from small slips.
- Prove / justify: the verdict alone earns little; marks need a valid argument or a counter-example that works.
- Which TWO statements are wrong: marks only for the correct numerals.
- Write down & explain: marks for the correct results and a clear explanation of each rubric idea.

For EACH question reply with:
<number> — <score>/<marks>
- one line per rubric point: awarded/available and why
- Feedback: what was missing or wrong, and the exact fix
Finish with a table of all scores and the total out of ${total}.

${items.length} question${items.length === 1 ? "" : "s"}, ${total} marks.`;

  const body = items.map(({ q, num, answer, hadImage }) => {
    const t = topicById(q.topic);
    return `==================== ${num} · ${kindMeta(q.kind).name} · ${q.marks} marks · Lecture Note ${t.n}: ${t.name} ====================
QUESTION:
${stem(q)}

RUBRIC:
${q.rubric.map((r, i) => `${i + 1}. (${r.marks} mark${r.marks === 1 ? "" : "s"}) ${r.point}`).join("\n")}

MODEL ANSWER${q.kind === "select" ? ` (wrong statements: ${(q.wrong ?? []).map((w) => `(${ROMAN[w]})`).join(" and ")})` : q.answer ? ` (final answer: ${q.answer})` : ""}:
${q.model}

MY ANSWER:
${answer.trim() || "(blank)"}${hadImage ? "\n(I also wrote working on paper that is not included here — mark only the text above.)" : ""}`;
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
