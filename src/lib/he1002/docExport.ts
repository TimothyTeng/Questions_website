import type { TExam } from "@/data/he1002";
import { graphPng } from "./graph";
import { SECTIONS, topicById } from "./topics";

export type AnswerPlacement = "after" | "end" | "none";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");

interface Img {
  name: string;
  data: string;
}

/** Ruled answer lines, as on the exam paper. */
const lines = (n: number) => "<p class=line>&nbsp;</p>".repeat(n);

function stem(q: TExam): string {
  if (q.section === "tf") return `<p>True or false: ${esc(q.prompt)}</p>`;
  let s = `<p>${esc(q.prompt)}</p>`;
  if (q.parts) s += q.parts.map((p) => `<p>${esc(p.label)} ${esc(p.prompt)} <span class=mk>(${p.marks} marks)</span></p>`).join("");
  return s;
}

async function answerHtml(q: TExam, n: string, imgs: Img[]): Promise<string> {
  let h = `<div class=ans><p class=ansh>Answer ${n}${q.section === "tf" ? ` — <b>${q.tf ? "TRUE" : "FALSE"}</b>` : q.answer ? ` — <b>${esc(q.answer)}</b>` : ""}</p>`;
  h += `<p>${esc(q.model)}</p>`;
  for (const g of q.diagram ?? []) {
    try {
      const name = `img${imgs.length + 1}.png`;
      imgs.push({ name, data: await graphPng(g) });
      h += `<p><img src="${name}" width=255 height=225 alt="diagram"/>${g.caption ? `<br/><span class=cap>${esc(g.caption)}</span>` : ""}</p>`;
    } catch {
      /* skip a diagram that fails to render */
    }
  }
  h += `<table class=rub><tr><th>Marking rubric</th><th>Marks</th></tr>${q.rubric.map((r) => `<tr><td>${esc(r.point)}</td><td class=m>${r.marks}</td></tr>`).join("")}</table></div>`;
  return h;
}

/**
 * Builds a Word document of exam-style questions, grouped like the paper (Q1 calculations, Q2 short answers,
 * Q3 true/false, Q4 diagram), and downloads it. Model answers, rubrics and diagrams go after each question,
 * at the end, or are left out. Saved as a single-file web page (MHTML) with a .doc name so Word opens it
 * with the diagrams embedded.
 */
export async function downloadExamDoc(questions: TExam[], placement: AnswerPlacement, title: string) {
  const imgs: Img[] = [];
  const parts: string[] = [];
  const key: string[] = [];
  const total = questions.reduce((a, q) => a + q.marks, 0);

  for (const sec of SECTIONS) {
    const qs = questions.filter((q) => q.section === sec.s);
    if (!qs.length) continue;
    parts.push(`<h2>Question ${sec.q} — ${sec.name} (${qs.length} × ${sec.perQ} marks = ${qs.reduce((a, q) => a + q.marks, 0)} marks)</h2><p class=note>${esc(sec.note)}</p>`);
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      const n = sec.s === "diagram" && qs.length === 1 ? `${sec.q}` : `${sec.q}.${i + 1}`;
      const t = topicById(q.topic);
      parts.push(
        `<div class=q><p class=qh><b>${n}</b> <span class=tag>[${q.marks} marks] · L${t.n} ${esc(t.name)} · ${esc(q.sub)}${q.source ? ` · ${esc(q.source)}` : ""}</span></p>${stem(q)}${lines(sec.s === "diagram" ? 16 : 6)}</div>`,
      );
      if (placement !== "none") {
        const a = await answerHtml(q, n, imgs);
        if (placement === "after") parts.push(a);
        else key.push(a);
      }
    }
  }
  if (key.length) parts.push(`<h1 style="page-break-before:always">Model answers and marking rubrics</h1>${key.join("")}`);

  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>${esc(title)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page { size: 21cm 29.7cm; margin: 2cm; }
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.35; }
h1 { font-size: 18pt; margin: 0 0 4pt; }
h2 { font-size: 13pt; margin: 18pt 0 2pt; color: #1f3a93; border-bottom: 1px solid #1f3a93; }
.note { color: #555; font-size: 9.5pt; margin: 0 0 8pt; }
.q { margin: 0 0 8pt; }
.qh { margin: 6pt 0 2pt; }
.tag { color: #666; font-size: 9pt; }
.mk { color: #666; }
.line { border-bottom: 1px solid #999; margin: 0; height: 18pt; }
.ans { background: #f1f4fb; border: 1px solid #c8d1ea; padding: 6pt 8pt; margin: 6pt 0 14pt; }
.ansh { font-weight: bold; color: #1f3a93; margin: 0 0 4pt; }
.cap { color: #555; font-size: 9pt; }
table.rub { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin-top: 4pt; }
table.rub th, table.rub td { border: 1px solid #c8d1ea; padding: 3pt 5pt; text-align: left; vertical-align: top; }
table.rub td.m { text-align: center; width: 1.4cm; }
</style></head>
<body><h1>${esc(title)}</h1>
<p style="color:#666;font-size:9pt">HE1002 Macroeconomics I · ${questions.length} questions · ${total} marks · closed book, calculator allowed · written from the lecture slides and problem sets in the exam format.</p>
${parts.join("\n")}
</body></html>`;

  const blob = imgs.length ? mhtml(html, imgs) : new Blob(["\ufeff", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/[^\w\- ]+/g, "").replace(/\s+/g, "_")}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function b64utf8(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

const wrap = (b64: string) => b64.replace(/.{76}/g, "$&\r\n");

/** A single-file web page (multipart/related) — Word opens it as a document with the images inline. */
function mhtml(html: string, imgs: Img[]): Blob {
  const B = "----=_NextPart_HE1002_0000";
  const base = "file:///C:/he1002/";
  const page = html.replace(/src="(img\d+\.png)"/g, `src="${base}$1"`);
  const out = [
    "MIME-Version: 1.0",
    `Content-Type: multipart/related; boundary="${B}"; type="text/html"`,
    "",
    `--${B}`,
    `Content-Location: ${base}doc.htm`,
    "Content-Transfer-Encoding: base64",
    'Content-Type: text/html; charset="utf-8"',
    "",
    wrap(b64utf8(page)),
    "",
  ];
  for (const im of imgs) out.push(`--${B}`, `Content-Location: ${base}${im.name}`, "Content-Transfer-Encoding: base64", "Content-Type: image/png", "", wrap(im.data), "");
  out.push(`--${B}--`, "");
  return new Blob([out.join("\r\n")], { type: "application/msword" });
}
