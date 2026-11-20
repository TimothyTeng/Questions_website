import type { TQuestion } from "@/data/hp1000";
import { TOPICS } from "./topics";

export type AnswerPlacement = "every5" | "end" | "none";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
const LETTERS = ["A", "B", "C", "D", "E"];

function questionHtml(q: TQuestion, n: number): string {
  const tag = q.kind === "fill" ? "Fill in the blank" : q.kind === "mcq" ? "MCQ" : `Short answer (${q.marks} marks)`;
  let body: string;
  if (q.kind === "fill") body = `<p>${esc(q.prompt).replace(/____/g, "<span class=blank>&nbsp;</span>")}</p>`;
  else if (q.kind === "mcq") body = `<p>${esc(q.prompt)}</p><p class=opts>${q.options.map((o, i) => `${LETTERS[i]}. ${esc(o)}`).join("<br/>")}</p>`;
  else body = `<p>${esc(q.prompt)}</p>${"<p class=line>&nbsp;</p>".repeat(Math.min(8, 2 + q.marks))}`;
  return `<div class=q><p class=qh><b>${n}.</b> <span class=tag>${tag} · ${esc(q.sub)}${q.official ? " · official practice" : ""}</span></p>${body}</div>`;
}

function answerHtml(q: TQuestion, n: number): string {
  let a: string;
  if (q.kind === "fill") a = `<b>${q.answers.map((x) => esc(x[0])).join(" ; ")}</b>`;
  else if (q.kind === "mcq") a = `<b>${LETTERS[q.answer]}. ${esc(q.options[q.answer])}</b>`;
  else a = `Model answer points:<ul>${q.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
  return `<p class=ans><b>${n}.</b> ${a}<br/><span class=why>${esc(q.explain)}</span></p>`;
}

/**
 * Builds a Word-compatible document (HTML in the .doc wrapper Word opens natively) and downloads it.
 * Questions are grouped by topic; answers go after every 5 questions, at the end of each topic, or nowhere.
 */
export function downloadDoc(questions: TQuestion[], placement: AnswerPlacement, title: string) {
  const parts: string[] = [];
  let n = 0;
  for (const t of TOPICS) {
    const qs = questions.filter((q) => q.topic === t.id);
    if (!qs.length) continue;
    parts.push(`<h2>${t.n}. ${esc(t.name)}</h2>`);
    const start = n;
    for (let i = 0; i < qs.length; i += 5) {
      const chunk = qs.slice(i, i + 5);
      const first = n;
      chunk.forEach((q) => parts.push(questionHtml(q, ++n)));
      if (placement === "every5") parts.push(`<div class=key><p class=keyh>Answers ${first + 1}–${n}</p>${chunk.map((q, j) => answerHtml(q, first + j + 1)).join("")}</div>`);
    }
    if (placement === "end") parts.push(`<div class=key><p class=keyh>Answer key — ${esc(t.name)}</p>${qs.map((q, j) => answerHtml(q, start + j + 1)).join("")}</div>`);
  }

  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${esc(title)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page { size: 21cm 29.7cm; margin: 2cm; }
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.35; }
h1 { font-size: 18pt; margin: 0 0 4pt; }
h2 { font-size: 14pt; margin: 18pt 0 6pt; color: #1f3a93; border-bottom: 1px solid #1f3a93; }
.q { margin: 0 0 10pt; }
.qh { margin: 0 0 2pt; }
.tag { color: #666; font-size: 9pt; }
.blank { display: inline-block; min-width: 3.5cm; border-bottom: 1px solid #000; }
.opts { margin: 2pt 0 0 14pt; }
.line { border-bottom: 1px solid #999; margin: 0; height: 16pt; }
.key { background: #f1f4fb; border: 1px solid #c8d1ea; padding: 6pt 8pt; margin: 6pt 0 14pt; }
.keyh { font-weight: bold; color: #1f3a93; margin: 0 0 4pt; }
.ans { margin: 0 0 5pt; }
.why { color: #444; font-size: 9.5pt; }
</style></head>
<body><h1>${esc(title)}</h1>
<p style="color:#666;font-size:9pt">HP1000 Introduction to Psychology · ${questions.length} questions · generated from the lecture slides and official practice questions.</p>
${parts.join("\n")}
</body></html>`;

  const blob = new Blob(["﻿", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/[^\w\- ]+/g, "").replace(/\s+/g, "_")}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
