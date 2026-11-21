import type { TExam } from "@/data/he1004";
import { texPng } from "./mathImg";
import { figurePng, FIG_H, FIG_W } from "./plot";
import { kindMeta, topicById } from "./topics";

export type AnswerPlacement = "after" | "end" | "none";

/** A set as it is laid out: mock papers are Question 1–4 with parts (a)–(e); practice sets are grouped by topic. */
export interface ExamGroup {
  title: string;
  /** Mock-paper questions are numbered "1(a)…"; practice groups number questions 1, 2, 3… across the set. */
  paper?: number;
  qs: TExam[];
}

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
const LETTERS = "abcdefghij";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

interface Img {
  name: string;
  data: string;
}

/** Ruled answer lines, as on the exam paper. */
const lines = (n: number) => "<p class=line>&nbsp;</p>".repeat(n);

/** Rich text (see components/Rich.tsx) → Word-friendly HTML with every formula as an embedded PNG. */
async function rich(text: string, imgs: Img[], inline = false): Promise<string> {
  const math = async (tex: string, display: boolean) => {
    const m = await texPng(tex, display);
    if (!m) return `<span class=tex>${esc(tex)}</span>`;
    const name = `img${imgs.length + 1}.png`;
    imgs.push({ name, data: m.data });
    const tag = `<img src="${name}" width=${m.w} height=${m.h} style="vertical-align:${m.valign}px" alt="${esc(tex).replace(/"/g, "&quot;")}"/>`;
    return display ? `</p><p class=disp>${tag}</p><p>` : tag;
  };
  const inlineHtml = async (s: string) => {
    let bold = false;
    const parts = s.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);
    const out: string[] = [];
    for (const part of parts) {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) out.push(await math(part.slice(2, -2), true));
      else if (part.startsWith("$") && part.endsWith("$") && part.length > 2) out.push(await math(part.slice(1, -1), false));
      else out.push(esc(part).replace(/\*\*/g, () => ((bold = !bold) ? "<b>" : "</b>")));
    }
    return out.join("") + (bold ? "</b>" : "");
  };
  if (inline) return inlineHtml(text);

  // Keep newlines inside $$..$$ blocks from splitting paragraphs.
  const paras: string[] = [];
  let buf = "";
  for (const line of text.split("\n")) {
    buf = buf ? `${buf}\n${line}` : line;
    if ((buf.match(/\$\$/g)?.length ?? 0) % 2 === 0) {
      paras.push(buf);
      buf = "";
    }
  }
  if (buf) paras.push(buf);
  let html = "";
  for (const raw of paras) {
    const line = raw.trim();
    if (!line) continue;
    const bullet = /^[-•]\s+/.test(line);
    const body = await inlineHtml(bullet ? line.replace(/^[-•]\s+/, "") : line);
    html += bullet ? `<p class=bul>•&nbsp; ${body}</p>` : `<p>${body}</p>`;
  }
  return html.replace(/<p><\/p>/g, "");
}

async function stem(q: TExam, label: string, imgs: Img[]): Promise<string> {
  let s = `<table class=qt><tr><td class=ql>${label}</td><td class=qb>${await rich(q.prompt, imgs)}`;
  if (q.kind === "select")
    for (let i = 0; i < (q.statements ?? []).length; i++) s += `<p class=st>(${ROMAN[i]})&nbsp; ${await rich(q.statements![i], imgs, true)}</p>`;
  s += `<p class=mk>(${q.marks} marks)</p></td></tr></table>`;
  return s;
}

async function answerHtml(q: TExam, label: string, imgs: Img[]): Promise<string> {
  const verdict = q.kind === "select" ? `(${(q.wrong ?? []).map((w) => ROMAN[w]).join(") and (")})` : q.answer ? await rich(q.answer, imgs, true) : "";
  let h = `<div class=ans><p class=ansh>Answer ${label}${verdict ? ` — ${verdict}` : ""}</p>`;
  h += await rich(q.model, imgs);
  for (const f of q.figures ?? []) {
    try {
      const name = `img${imgs.length + 1}.png`;
      imgs.push({ name, data: await figurePng(f) });
      h += `<p><img src="${name}" width=${Math.round(FIG_W * 0.75)} height=${Math.round(FIG_H * 0.75)} alt="figure"/></p>`;
    } catch {
      /* skip a figure that fails to render */
    }
  }
  h += `<table class=rub><tr><th>Marking rubric</th><th>Marks</th></tr>`;
  for (const r of q.rubric) h += `<tr><td>${await rich(r.point, imgs, true)}</td><td class=m>${r.marks}</td></tr>`;
  return h + `</table></div>`;
}

/**
 * Builds a Word document of HE1004 exam-style questions laid out like the paper and downloads it. Model answers and
 * rubrics go after each question, at the end, or are left out. Saved as a single-file web page (MHTML) with a .doc
 * name, so Word opens it with the maths and figures embedded as images.
 */
export async function downloadExamDoc(groups: ExamGroup[], placement: AnswerPlacement, title: string) {
  const imgs: Img[] = [];
  const parts: string[] = [];
  const key: string[] = [];
  const all = groups.flatMap((g) => g.qs);
  const total = all.reduce((a, q) => a + q.marks, 0);
  let n = 0;

  for (const g of groups) {
    const marks = g.qs.reduce((a, q) => a + q.marks, 0);
    parts.push(g.paper ? `<h2>Question ${g.paper} <span class=tot>(TOTAL: ${marks} marks)</span></h2><p class=note>${esc(g.title)}</p>` : `<h2>${esc(g.title)} <span class=tot>(${marks} marks)</span></h2>`);
    for (let i = 0; i < g.qs.length; i++) {
      const q = g.qs[i];
      const label = g.paper ? `(${LETTERS[i]})` : `${++n}.`;
      const full = g.paper ? `${g.paper}(${LETTERS[i]})` : `${n}`;
      const t = topicById(q.topic);
      parts.push(`<p class=tag>L${t.n} ${esc(t.name)} · ${esc(q.sub)} · ${esc(kindMeta(q.kind).name)}${q.source ? ` · ${esc(q.source)}` : ""}</p>`);
      parts.push(await stem(q, label, imgs));
      parts.push(lines(q.kind === "select" ? 2 : 9));
      if (placement !== "none") {
        const a = await answerHtml(q, full, imgs);
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
body { font-family: Cambria, "Times New Roman", serif; font-size: 11pt; line-height: 1.4; }
h1 { font-size: 18pt; margin: 0 0 4pt; }
h2 { font-size: 13pt; margin: 18pt 0 2pt; text-decoration: underline; }
h2 .tot { font-weight: normal; text-decoration: none; font-size: 11pt; }
p { margin: 0 0 4pt; }
p.disp { text-align: center; margin: 4pt 0; }
p.bul { margin-left: 12pt; }
.note { color: #555; font-size: 9.5pt; margin: 0 0 8pt; }
.tag { color: #888; font-size: 8.5pt; margin: 10pt 0 0; }
table.qt { border-collapse: collapse; width: 100%; }
table.qt td { vertical-align: top; padding: 0; }
td.ql { width: 1cm; font-weight: bold; }
.st { margin-left: 10pt; }
.mk { text-align: right; color: #333; }
.line { border-bottom: 1px solid #999; margin: 0; height: 18pt; }
.tex { font-family: Consolas, monospace; font-size: 9.5pt; color: #444; }
.ans { background: #f1f4fb; border: 1px solid #c8d1ea; padding: 6pt 8pt; margin: 6pt 0 14pt; }
.ansh { font-weight: bold; color: #1f3a93; margin: 0 0 4pt; }
table.rub { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin-top: 4pt; }
table.rub th, table.rub td { border: 1px solid #c8d1ea; padding: 3pt 5pt; text-align: left; vertical-align: top; }
table.rub td.m { text-align: center; width: 1.4cm; }
</style></head>
<body><h1>${esc(title)}</h1>
<p style="color:#666;font-size:9pt">HE1004 Mathematics for Economists I · ${all.length} parts · ${total} marks · answer all parts, showing your working · written from the lecture notes, assignments and past paper in the exam format.</p>
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

/** A single-file web page (multipart/related): Word opens it as a document with the images inline. */
function mhtml(html: string, imgs: Img[]): Blob {
  const B = "----=_NextPart_HE1004_0000";
  const base = "file:///C:/he1004/";
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
