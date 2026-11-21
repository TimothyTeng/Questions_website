"use client";

import { useState } from "react";
import { Rich } from "@/components/Rich";
import type { TExam } from "@/data/he1004";
import { chatMarkingPrompt, copyText } from "@/lib/he1004/chatPrompt";
import { clearAttempt, retryAi, selfMark, submitForAi, type Attempt, type Img } from "@/lib/he1004/store";
import { kindMeta, topicById } from "@/lib/he1004/topics";
import { Figures } from "./Figure";

export const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

/** Shrinks a photo to ≤1600 px JPEG so it uploads quickly and fits in storage. */
async function loadImage(file: File): Promise<Img> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("Could not read that image."));
      img.src = url;
    });
    const k = Math.min(1, 1600 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * k);
    c.height = Math.round(img.height * k);
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return { mimeType: "image/jpeg", data: c.toDataURL("image/jpeg", 0.85).split(",")[1] };
  } finally {
    URL.revokeObjectURL(url);
  }
}

const sum = (xs: number[] = []) => xs.reduce((a, b) => a + b, 0);
export const fmtMarks = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** "ii, vi" ↔ [1, 5] */
const picksOf = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z]+/)
    .map((r) => ROMAN.indexOf(r))
    .filter((i) => i >= 0);

/** Auto-mark a "which TWO are wrong" part: 2.5 per correct pick, minus 2.5 per extra wrong pick (never below 0). */
export function markSelect(q: TExam, picks: number[]): number[] {
  const wrong = q.wrong ?? [];
  const extra = picks.filter((p) => !wrong.includes(p)).length;
  const scores = wrong.map((w, i) => (picks.includes(w) ? q.rubric[i]?.marks ?? 2.5 : 0));
  let penalty = extra * 2.5;
  for (let i = scores.length - 1; i >= 0 && penalty > 0; i--) {
    const cut = Math.min(scores[i], penalty);
    scores[i] -= cut;
    penalty -= cut;
  }
  return scores;
}

function RubricPicker({ q, scores, setScores }: { q: TExam; scores: number[]; setScores: (f: (s: number[]) => number[]) => void }) {
  return (
    <table className="rubric">
      <tbody>
        {q.rubric.map((r, i) => {
          const steps = Number.isInteger(r.marks) ? Array.from({ length: r.marks + 1 }, (_, k) => k) : [0, r.marks];
          return (
            <tr key={i}>
              <td>
                <Rich text={r.point} />
              </td>
              <td className="m">
                <select className="ai-model" value={scores[i]} onChange={(e) => setScores((s) => s.map((x, j) => (j === i ? Number(e.target.value) : x)))}>
                  {steps.map((k) => (
                    <option key={k} value={k}>
                      {fmtMarks(k)}/{fmtMarks(r.marks)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function ExamCard({
  q,
  num,
  attempt,
  queuePos,
  model,
  draft,
  onDraft,
}: {
  q: TExam;
  num: string;
  attempt?: Attempt;
  /** 1-based place in the marking queue, 0 if not waiting. */
  queuePos: number;
  model: string;
  draft: string;
  onDraft: (s: string) => void;
}) {
  const t = topicById(q.topic);
  const kind = kindMeta(q.kind);
  const isSelect = q.kind === "select";
  const [img, setImg] = useState<Img | undefined>();
  const [imgErr, setImgErr] = useState("");
  const [selfing, setSelfing] = useState(false);
  const [selfScores, setSelfScores] = useState<number[]>(() => q.rubric.map(() => 0));
  const [peek, setPeek] = useState(false);
  const [copied, setCopied] = useState(false);

  const locked = !!attempt;
  const done = attempt?.status === "done";
  const waiting = attempt?.status === "queued" || attempt?.status === "marking";
  const got = done ? sum(attempt?.scores) : 0;
  const answerText = attempt?.answer ?? draft;
  const showModel = done || peek || attempt?.status === "error";
  const state = done ? (got === q.marks ? "correct" : got >= q.marks / 2 ? "" : "wrong") : "";
  const picks = isSelect ? picksOf(answerText) : [];

  const submit = () => {
    submitForAi(q.id, draft, img, model);
    setImg(undefined);
    setPeek(false);
  };

  const togglePick = (i: number) => {
    const next = picks.includes(i) ? picks.filter((p) => p !== i) : [...picks, i].sort((a, b) => a - b);
    onDraft(next.map((p) => ROMAN[p]).join(", "));
  };

  return (
    <article className={`card q ${state}`} id={`x-${q.id}`} style={{ scrollMarginTop: 120 }}>
      <div className="q-head">
        <span className="q-num">{num}</span>
        <span className="dot" style={{ background: t.color }} />
        <span className="small muted">
          {t.name} · {q.sub}
        </span>
        <span className="spacer" />
        {q.source && <span className="badge">{q.source}</span>}
        <span className="badge">{kind.name}</span>
        <span className="badge">{q.marks} marks</span>
        <button
          className="btn sm"
          title="Copy this question, its rubric, the model answer and your answer as a marking prompt for any chatbot"
          onClick={async () => {
            if (await copyText(chatMarkingPrompt([{ q, num, answer: answerText, hadImage: attempt?.hadImage || !!img }]))) {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }}
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>

      <div className="exam-stem">
        <Rich text={q.prompt} />
      </div>
      {isSelect && (
        <div className="statements">
          {q.statements!.map((s, i) => {
            const on = picks.includes(i);
            const cls = done ? ((q.wrong ?? []).includes(i) ? "right" : on ? "wrongpick" : "") : on ? "on" : "";
            return (
              <label key={i} className={cls}>
                <input type="checkbox" checked={on} disabled={locked} onChange={() => togglePick(i)} />
                <span className="num">({ROMAN[i]})</span>
                <Rich text={s} />
              </label>
            );
          })}
        </div>
      )}
      <div className="small muted" style={{ margin: "6px 0 8px" }}>
        {kind.note}
        {!isSelect && " Type your working, or attach a photo of your handwritten working for Gemini to read."}
      </div>

      {!isSelect && (
        <textarea
          className="answer-input"
          placeholder={q.kind === "calc" ? "Working: …\nAnswer: …" : q.kind === "proof" ? "Claim, then the justification / proof (or a counter-example)…" : "Your answer…"}
          value={answerText}
          disabled={locked}
          onChange={(e) => onDraft(e.target.value)}
          style={{ minHeight: 130 }}
        />
      )}

      {!locked && isSelect && (
        <div className="row" style={{ marginTop: 8 }}>
          <span className="small muted">{picks.length ? `Your answer: ${picks.map((p) => `(${ROMAN[p]})`).join(", ")}` : "Tick the TWO wrong statements."}</span>
          <span className="spacer" />
          <button className="btn sm" onClick={() => setPeek((p) => !p)}>
            {peek ? "Hide" : "Peek at"} model answer
          </button>
          <button className="btn primary sm" disabled={!picks.length} onClick={() => selfMark(q.id, draft, markSelect(q, picks), "auto")}>
            ✓ Check answer
          </button>
        </div>
      )}

      {!locked && !isSelect && (
        <div className="row" style={{ marginTop: 8 }}>
          <label className="btn sm" style={{ cursor: "pointer" }}>
            📷 {img ? "Replace photo" : "Attach photo"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                setImgErr("");
                try {
                  setImg(await loadImage(f));
                } catch (err) {
                  setImgErr(err instanceof Error ? err.message : "Could not read that image.");
                }
              }}
            />
          </label>
          {img && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- local preview of a data URL */}
              <img className="thumb" src={`data:${img.mimeType};base64,${img.data}`} alt="Attached working" />
              <button className="btn sm" onClick={() => setImg(undefined)}>
                Remove
              </button>
            </>
          )}
          {imgErr && <span className="small" style={{ color: "var(--bad)" }}>{imgErr}</span>}
          <span className="spacer" />
          <button className="btn sm" onClick={() => setPeek((p) => !p)}>
            {peek ? "Hide" : "Peek at"} model answer
          </button>
          <button className="btn sm" onClick={() => setSelfing((s) => !s)}>
            ✓ Self-mark
          </button>
          <button className="btn primary sm" disabled={!draft.trim() && !img} onClick={submit} title="Queued and marked in the background, so you can carry on with the next question">
            ✨ Submit for Gemini marking
          </button>
        </div>
      )}

      {/* Self-marking against the rubric (also offered when Gemini marking failed) */}
      {selfing && (!locked || attempt?.status === "error") && (
        <div className="solution">
          <div className="small" style={{ marginBottom: 6 }}>
            <strong>Mark yourself against the rubric</strong> ({fmtMarks(sum(selfScores))}/{q.marks}). Open the model answer to compare.
          </div>
          <RubricPicker q={q} scores={selfScores} setScores={setSelfScores} />
          <div className="row">
            <span className="spacer" />
            <button
              className="btn primary sm"
              onClick={() => {
                selfMark(q.id, attempt?.answer ?? draft, selfScores);
                setSelfing(false);
              }}
            >
              Save {fmtMarks(sum(selfScores))}/{q.marks}
            </button>
          </div>
        </div>
      )}

      {/* Marking status / result */}
      {attempt && (
        <div className="row" style={{ marginTop: 10 }}>
          {attempt.status === "queued" && <span className="status queued">⏳ Queued for marking{queuePos > 1 ? ` · #${queuePos} in line` : " · next up"}</span>}
          {attempt.status === "marking" && <span className="status marking">✨ Gemini is marking…</span>}
          {attempt.status === "error" && <span className="status error">⚠ Not marked</span>}
          {done && (
            <span className="status done">
              {attempt.by === "ai" ? "✨ Gemini" : attempt.by === "auto" ? "✓ Auto-marked" : "✓ Self-marked"}: {fmtMarks(got)}/{q.marks}
            </span>
          )}
          {attempt.hadImage && <span className="small muted">📷 photo attached</span>}
          {attempt.error && <span className="small" style={{ color: attempt.status === "error" ? "var(--bad)" : "var(--muted)" }}>{attempt.error}</span>}
          <span className="spacer" />
          {attempt.status === "error" && (
            <>
              <button className="btn sm" onClick={() => retryAi(q.id)}>
                Retry Gemini
              </button>
              <button className="btn sm" onClick={() => setSelfing(true)}>
                Self-mark
              </button>
            </>
          )}
          {waiting && <span className="small muted">You can move on; the mark appears here when it&apos;s ready.</span>}
          {!waiting && (
            <button
              className="btn sm"
              onClick={() => {
                onDraft(attempt.answer);
                clearAttempt(q.id);
                setSelfing(false);
                setSelfScores(q.rubric.map(() => 0));
              }}
            >
              ↺ Try again
            </button>
          )}
        </div>
      )}

      {showModel && (
        <div className="solution">
          {done && attempt?.feedback && <div className="feedback">{attempt.feedback}</div>}
          <table className="rubric">
            <tbody>
              {q.rubric.map((r, i) => {
                const s = attempt?.scores?.[i] ?? 0;
                return (
                  <tr key={i} className={done ? (s === r.marks ? "full" : s > 0 ? "part" : "zero") : ""}>
                    <td>
                      <Rich text={r.point} />
                    </td>
                    <td className="m">{done ? `${fmtMarks(s)}/${fmtMarks(r.marks)}` : fmtMarks(r.marks)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="small" style={{ fontWeight: 700, margin: "10px 0 4px" }}>
            Model answer
            {isSelect ? ` — (${(q.wrong ?? []).map((w) => ROMAN[w]).join(") and (")})` : ""}
          </div>
          {q.answer && !isSelect && (
            <div className="small" style={{ marginBottom: 6 }}>
              <strong>Final answer:</strong> <Rich className="inline-rich" text={q.answer} />
            </div>
          )}
          <div className="model-answer">
            <Rich text={q.model} />
          </div>
          {q.figures && <Figures fs={q.figures} />}
        </div>
      )}
    </article>
  );
}
