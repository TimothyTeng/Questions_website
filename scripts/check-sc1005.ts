// Validates the SC1005 question bank and lessons: counts, option/answer shape, expression answers,
// figure specs (circuits, K-maps, waveforms, state diagrams), KaTeX, and that every lesson visual id
// is handled by its topic module.
//   npm run check:sc1005            all topics
//   npm run check:sc1005 -- kmaps   only topics whose id contains "kmaps"
import { readFileSync } from "node:fs";
import katex from "katex";
import { LESSONS } from "@/data/sc1005/lessons";
import { QUESTIONS_BY_TOPIC } from "@/data/sc1005/questions";
import { checkCircuit, parseExpr, termCells, truthTable } from "@/lib/sc1005/logic";
import { TOPICS } from "@/lib/sc1005/topics";
import type { Draft, Figure, Lesson } from "@/lib/sc1005/types";

const filter = process.argv[2] ?? "";
let errors = 0;
const err = (where: string, msg: string) => {
  errors++;
  console.log(`  ✗ ${where}: ${msg}`);
};

function checkText(where: string, text: string | undefined) {
  if (!text) return;
  const noCode = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]+`/g, "");
  for (const m of noCode.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g)) {
    try {
      katex.renderToString(m[1] ?? m[2], { throwOnError: true, displayMode: !!m[1] });
    } catch (e) {
      err(where, `KaTeX: ${(e as Error).message.split("\n")[0]}`);
    }
  }
  if ((noCode.replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, "").match(/\$/g)?.length ?? 0) > 0) err(where, "unpaired $ (put code in backticks)");
  if ((text.match(/```/g)?.length ?? 0) % 2) err(where, "unclosed ``` fence");
}

function checkFigure(where: string, f: Figure) {
  checkText(`${where} caption`, f.caption);
  switch (f.kind) {
    case "circuit":
      checkCircuit(f.circuit).forEach((e) => err(where, `circuit: ${e}`));
      break;
    case "kmap": {
      const n = f.vars.length;
      if (n < 2 || n > 4) err(where, `kmap needs 2–4 vars, has ${n}`);
      if (f.values.length !== 1 << n) err(where, `kmap values has ${f.values.length} chars, needs ${1 << n}`);
      if (/[^01xXd-]/.test(f.values)) err(where, `kmap values may only use 0 1 x d -`);
      for (const g of f.groups ?? [])
        try {
          if (!termCells(g, f.vars).length) err(where, `kmap group "${g}" covers no cells`);
        } catch (e) {
          err(where, `kmap group "${g}": ${(e as Error).message}`);
        }
      break;
    }
    case "wave": {
      const lens = f.signals.map((s) => s.wave.replace(/\|/g, "").length);
      if (new Set(lens).size > 1) err(where, `wave signals have different lengths: ${f.signals.map((s, i) => `${s.name}=${lens[i]}`).join(", ")}`);
      for (const s of f.signals) {
        if (/[^01xXzZhHlL=.|]/.test(s.wave)) err(where, `wave "${s.name}" has an unknown character`);
        const need = (s.wave.match(/=/g) ?? []).length;
        if (need > (s.data?.length ?? 0)) err(where, `wave "${s.name}" has ${need} "=" but ${s.data?.length ?? 0} data labels`);
      }
      if (f.ticks && f.ticks.length !== lens[0]) err(where, `wave ticks (${f.ticks.length}) ≠ length (${lens[0]})`);
      break;
    }
    case "fsm": {
      const ids = new Set(f.states.map((s) => s.id));
      if (ids.size !== f.states.length) err(where, "fsm: duplicate state ids");
      for (const e of f.edges) if (!ids.has(e.from) || !ids.has(e.to)) err(where, `fsm edge ${e.from}→${e.to} names an unknown state`);
      if (f.initial && !ids.has(f.initial)) err(where, `fsm initial "${f.initial}" unknown`);
      const pos = new Set(f.states.map((s) => `${s.x},${s.y}`));
      if (pos.size !== f.states.length) err(where, "fsm: two states at the same position");
      break;
    }
    case "table":
      for (const r of f.rows) if (r.length !== f.head.length) err(where, `table row has ${r.length} cells, header has ${f.head.length}`);
      f.head.forEach((h) => checkText(where, h));
      break;
    case "svg":
      if (!f.svg.trim().startsWith("<svg")) err(where, "svg figure must start with <svg");
      break;
  }
}

function checkQuestion(where: string, q: Draft) {
  for (const k of ["subtopic", "prompt", "solution", "difficulty"] as const) if (!q[k]) err(where, `missing ${k}`);
  if (!["easy", "medium", "hard"].includes(q.difficulty)) err(where, `bad difficulty "${q.difficulty}"`);
  checkText(`${where} prompt`, q.prompt);
  checkText(`${where} solution`, q.solution);
  q.figures?.forEach((f, i) => checkFigure(`${where} fig${i + 1}`, f));
  q.solutionFigures?.forEach((f, i) => checkFigure(`${where} solfig${i + 1}`, f));
  if (q.kind === "mcq") {
    if (q.options.length !== 5) err(where, `MCQ needs 5 options (A–E), has ${q.options.length}`);
    if (!(q.answer >= 0 && q.answer < q.options.length) || !Number.isInteger(q.answer)) err(where, `answer index ${q.answer} out of range`);
    const norm = q.options.map((o) => o.replace(/\s+/g, " ").trim());
    if (new Set(norm).size !== norm.length) err(where, "duplicate options");
    q.options.forEach((o, i) => checkText(`${where} option ${i}`, o));
  } else if (q.kind === "short") {
    if (!q.accept.length || q.accept.some((a) => !a.trim())) err(where, "short answer needs non-empty accept[]");
    if (q.match === "number" && q.accept.some((a) => !Number.isFinite(Number(a)))) err(where, "match=number but an accepted answer is not a number");
    if (q.match === "expr") {
      if (!q.vars?.length) err(where, "match=expr needs vars");
      else
        try {
          const ref = truthTable(parseExpr(q.accept[0], q.vars), q.vars);
          for (const a of q.accept.slice(1)) {
            const t = truthTable(parseExpr(a, q.vars), q.vars);
            if (t.some((v, k) => v !== ref[k] && !q.dontCares?.includes(k))) err(where, `accepted expression "${a}" is not equivalent to "${q.accept[0]}"`);
          }
        } catch (e) {
          err(where, `expr answer does not parse: ${(e as Error).message}`);
        }
    }
  } else if (q.kind === "open") {
    if (!q.modelAnswer) err(where, "open question needs modelAnswer");
    if (!q.rubric?.length) err(where, "open question needs a rubric");
    if (q.rubric?.some((r) => !(r.marks > 0))) err(where, "rubric marks must be positive");
    checkText(`${where} model`, q.modelAnswer);
    q.modelFigures?.forEach((f, i) => checkFigure(`${where} modelfig${i + 1}`, f));
  } else err(where, `unknown kind "${(q as { kind: string }).kind}"`);
}

function checkLesson(l: Lesson) {
  const src = readFileSync(`src/components/sc1005/viz/topics/${l.topic}.tsx`, "utf8");
  checkText(`${l.topic} bigPicture`, l.bigPicture);
  l.sections.forEach((s, i) => {
    const w = `${l.topic} §${i + 1}`;
    for (const t of [s.intuition, ...s.keyIdeas, ...(s.pitfalls ?? []), ...s.recall.flatMap((r) => [r.q, r.a])]) checkText(w, t);
    s.figures?.forEach((f, j) => checkFigure(`${w} fig${j + 1}`, f));
    if (s.example) [s.example.problem, ...s.example.steps, s.example.answer].forEach((t) => checkText(`${w} example`, t));
    s.example?.figures?.forEach((f, j) => checkFigure(`${w} example fig${j + 1}`, f));
    s.formulas?.forEach((f) => {
      try {
        katex.renderToString(f, { throwOnError: true, displayMode: true });
      } catch (e) {
        err(w, `formula KaTeX: ${(e as Error).message.split("\n")[0]}`);
      }
    });
    for (const id of s.visuals ?? []) if (!src.includes(`"${id}"`)) err(w, `visual "${id}" is not handled in viz/topics/${l.topic}.tsx`);
  });
  l.playbook.forEach((p) => checkText(`${l.topic} playbook`, p));
}

let total = 0;
for (const t of TOPICS) {
  if (filter && !t.id.includes(filter)) continue;
  const qs = QUESTIONS_BY_TOPIC[t.id] ?? [];
  if (!QUESTIONS_BY_TOPIC[t.id]) err(t.id, "question export is missing (file mid-edit or import cycle?)");
  const kinds = { mcq: 0, short: 0, open: 0 };
  qs.forEach((q, i) => {
    kinds[q.kind] = (kinds[q.kind] ?? 0) + 1;
    checkQuestion(`Ch${t.ch} ${t.id} #${i + 1}`, q);
  });
  const lesson = LESSONS.find((l) => l?.topic === t.id);
  if (!lesson) err(t.id, "no lesson");
  else checkLesson(lesson);
  total += qs.length;
  console.log(`Ch${String(t.ch).padStart(2)} ${t.id.padEnd(14)} ${String(qs.length).padStart(3)} questions (mcq ${kinds.mcq}, short ${kinds.short}, open ${kinds.open}) · lesson ${lesson?.sections.length ?? 0} sections`);
}
console.log(`\n${total} questions · ${errors} problem${errors === 1 ? "" : "s"}`);
process.exit(errors ? 1 : 0);
