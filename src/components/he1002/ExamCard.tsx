"use client";

import { useState } from "react";
import type { TExam } from "@/data/he1002";
import { chatMarkingPrompt, copyText } from "@/lib/he1002/chatPrompt";
import { clearAttempt, retryAi, selfMark, submitForAi, type Attempt, type Img } from "@/lib/he1002/store";
import { sectionMeta, topicById } from "@/lib/he1002/topics";
import { Graphs } from "./Graph";

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
  const sec = sectionMeta(q.section);
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

  const submit = () => {
    submitForAi(q.id, draft, img, model);
    setImg(undefined);
    setPeek(false);
  };

  return (
    <article className={`card q ${state}`} id={`x-${q.id}`} style={{ scrollMarginTop: 120 }}>
      <div className="q-head">
        <span className="q-num">{num}</span>
        <span className="dot" style={{ background: t.color }} />
        <span className="small muted">
          L{t.n} {t.name} · {q.sub}
        </span>
        <span className="spacer" />
        {q.source && <span className="badge">{q.source}</span>}
        <span className="badge">{sec.name}</span>
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
        {q.section === "tf" ? (
          <>
            <strong>True or false:</strong> {q.prompt}
          </>
        ) : (
          q.prompt
        )}
      </div>
      {q.parts && (
        <div className="parts">
          {q.parts.map((p) => (
            <div key={p.label}>
              <strong>{p.label}</strong> {p.prompt} <span className="small muted">({p.marks} marks)</span>
            </div>
          ))}
        </div>
      )}
      <div className="small muted" style={{ margin: "6px 0 8px" }}>
        {sec.note}
        {q.section === "diagram" && " Describe your diagram in words (axes, curves, the shift, old and new equilibrium) and/or attach a photo of it."}
      </div>

      <textarea
        className="answer-input"
        placeholder={
          q.section === "calc"
            ? "Formula: …\nWorking: …\nAnswer: …"
            : q.section === "tf"
              ? "True / False, because …"
              : q.section === "diagram"
                ? "(a) …\n(b) …"
                : "Your answer (3–4 sentences)…"
        }
        value={answerText}
        disabled={locked}
        onChange={(e) => onDraft(e.target.value)}
        style={{ minHeight: q.section === "diagram" ? 200 : 120 }}
      />

      {!locked && (
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
          <button className="btn primary sm" disabled={!draft.trim() && !img} onClick={submit} title="Queued and marked in the background — carry on with the next question">
            ✨ Submit for Gemini marking
          </button>
        </div>
      )}

      {/* Self-marking against the rubric */}
      {!locked && selfing && (
        <div className="solution">
          <div className="small" style={{ marginBottom: 6 }}>
            <strong>Mark yourself against the rubric</strong> ({sum(selfScores)}/{q.marks}):
          </div>
          <table className="rubric">
            <tbody>
              {q.rubric.map((r, i) => (
                <tr key={i}>
                  <td>{r.point}</td>
                  <td className="m">
                    <select className="ai-model" value={selfScores[i]} onChange={(e) => setSelfScores((s) => s.map((x, j) => (j === i ? Number(e.target.value) : x)))}>
                      {Array.from({ length: r.marks + 1 }, (_, k) => (
                        <option key={k} value={k}>
                          {k}/{r.marks}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <span className="spacer" />
            <button
              className="btn primary sm"
              onClick={() => {
                selfMark(q.id, draft, selfScores);
                setSelfing(false);
              }}
            >
              Save {sum(selfScores)}/{q.marks}
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
              {attempt.by === "ai" ? "✨ Gemini" : "✓ Self-marked"}: {got}/{q.marks}
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
          {waiting && <span className="small muted">You can move on — it&apos;ll appear here when marked.</span>}
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

      {attempt?.status === "error" && selfing && (
        <div className="solution">
          <table className="rubric">
            <tbody>
              {q.rubric.map((r, i) => (
                <tr key={i}>
                  <td>{r.point}</td>
                  <td className="m">
                    <select className="ai-model" value={selfScores[i]} onChange={(e) => setSelfScores((s) => s.map((x, j) => (j === i ? Number(e.target.value) : x)))}>
                      {Array.from({ length: r.marks + 1 }, (_, k) => (
                        <option key={k} value={k}>
                          {k}/{r.marks}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <span className="spacer" />
            <button
              className="btn primary sm"
              onClick={() => {
                selfMark(q.id, attempt.answer, selfScores);
                setSelfing(false);
              }}
            >
              Save {sum(selfScores)}/{q.marks}
            </button>
          </div>
        </div>
      )}

      {showModel && (
        <div className="solution">
          {done && attempt?.feedback && <div className="feedback">{attempt.feedback}</div>}
          {done && (
            <table className="rubric">
              <tbody>
                {q.rubric.map((r, i) => {
                  const s = attempt?.scores?.[i] ?? 0;
                  return (
                    <tr key={i} className={s === r.marks ? "full" : s > 0 ? "part" : "zero"}>
                      <td>{r.point}</td>
                      <td className="m">
                        {s}/{r.marks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!done && (
            <table className="rubric">
              <tbody>
                {q.rubric.map((r, i) => (
                  <tr key={i}>
                    <td>{r.point}</td>
                    <td className="m">{r.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="small" style={{ fontWeight: 700, margin: "10px 0 4px" }}>
            Model answer{q.section === "tf" ? ` — ${q.tf ? "TRUE" : "FALSE"}` : q.answer ? ` — ${q.answer}` : ""}
          </div>
          <div className="model-answer">{q.model}</div>
          {q.diagram && <Graphs gs={q.diagram} />}
        </div>
      )}
    </article>
  );
}
