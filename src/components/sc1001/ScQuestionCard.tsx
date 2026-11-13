"use client";

import { useState } from "react";
import { gradeOpen } from "@/lib/sc1001/ai";
import { scoreOf, shortCorrect, type OpenMark, type Response } from "@/lib/sc1001/grading";
import { scTopicById } from "@/lib/sc1001/topics";
import type { OpenQ, ScQuestion } from "@/lib/sc1001/types";
import { AiBar, useAi } from "./AiBar";
import { Code, Md, MdInline } from "./Md";

const LETTERS = ["A", "B", "C", "D"];
const KIND_LABEL = { mcq: "MCQ", short: "Short answer", open: "Open-ended" };

export function ScQuestionCard({
  q,
  num,
  response,
  onResponse,
  revealed,
  mark,
  onMark,
  showMeta = true,
}: {
  q: ScQuestion;
  num: number;
  response: Response;
  onResponse: (r: Response) => void;
  revealed: boolean;
  mark?: OpenMark;
  onMark?: (m: OpenMark) => void;
  /** Hide topic/id (e.g. during a mock test). */
  showMeta?: boolean;
}) {
  const topic = scTopicById(q.topic);
  const { got, max } = scoreOf(q, response, mark);
  const state = !revealed || (q.kind === "open" && !mark) ? "" : got === max ? "correct" : "wrong";
  return (
    <article className={`card q ${state}`} id={`q-${num}`}>
      <div className="q-head">
        <span className="q-num">Q{num}</span>
        {showMeta && (
          <>
            <span className="dot" style={{ background: topic.color }} />
            <span className="small muted">
              {topic.name} · {q.subtopic}
            </span>
          </>
        )}
        <span className="spacer" />
        <span className="badge">{KIND_LABEL[q.kind]}</span>
        <span className={`badge diff-${q.difficulty}`}>{q.difficulty}</span>
        {q.kind === "open" && <span className="badge">{max} marks</span>}
        {showMeta && <span className="badge">{q.id}</span>}
      </div>
      <Md text={q.prompt} />
      {q.code && <Code code={q.code} />}

      {q.kind === "mcq" && (
        <div className="opts">
          {q.options.map((o, i) => {
            let cls = "opt";
            if (revealed) {
              if (i === q.answer) cls += " right";
              else if (i === response) cls += " wrongsel";
            } else if (i === response) cls += " sel";
            return (
              <button key={i} className={cls} disabled={revealed} onClick={() => onResponse(i)}>
                <span className="letter">{LETTERS[i]})</span>
                {/* Output-style options are shown exactly as printed. */}
                {q.verify || o.includes("\n") ? <pre className="code">{o}</pre> : <MdInline text={o} />}
              </button>
            );
          })}
        </div>
      )}

      {q.kind === "short" && (
        <div style={{ marginTop: 10 }}>
          {q.verify ? (
            <textarea
              className="answer-input mono"
              rows={2}
              placeholder="Type the exact output (one line per printed line)"
              value={typeof response === "string" ? response : ""}
              disabled={revealed}
              onChange={(e) => onResponse(e.target.value)}
              spellCheck={false}
            />
          ) : (
            <input
              className="answer-input"
              placeholder="Your answer"
              value={typeof response === "string" ? response : ""}
              disabled={revealed}
              onChange={(e) => onResponse(e.target.value)}
              spellCheck={false}
            />
          )}
        </div>
      )}

      {q.kind === "open" && (
        <textarea
          className="answer-input mono"
          rows={7}
          style={{ marginTop: 10 }}
          placeholder="Write your answer (text, pseudocode or Python)"
          value={typeof response === "string" ? response : ""}
          disabled={revealed}
          onChange={(e) => onResponse(e.target.value)}
          spellCheck={false}
        />
      )}

      {revealed && (
        <div className="solution">
          {q.kind === "mcq" && (
            <div className={`verdict ${state === "correct" ? "good" : "bad"}`} style={{ marginBottom: 6 }}>
              {response === undefined ? "Not answered" : state === "correct" ? "Correct" : "Incorrect"} — answer: ({LETTERS[q.answer]})
            </div>
          )}
          {q.kind === "short" && (
            <div style={{ marginBottom: 6 }}>
              <div className={`verdict ${shortCorrect(q, response) ? "good" : "bad"}`}>{!response ? "Not answered" : shortCorrect(q, response) ? "Correct" : "Incorrect"} — answer:</div>
              <pre className="code">{q.accept[0]}</pre>
            </div>
          )}
          {q.kind === "open" && <OpenMarking q={q} answer={typeof response === "string" ? response : ""} mark={mark} onMark={onMark} />}
          <Md text={q.solution} />
        </div>
      )}
    </article>
  );
}

function OpenMarking({ q, answer, mark, onMark }: { q: OpenQ; answer: string; mark?: OpenMark; onMark?: (m: OpenMark) => void }) {
  const ai = useAi();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const scores = mark?.scores ?? q.rubric.map(() => 0);
  const total = scores.reduce((s, x) => s + x, 0);
  const max = q.rubric.reduce((s, r) => s + r.marks, 0);

  const markWithAi = async () => {
    setBusy(true);
    setErr("");
    try {
      const g = await gradeOpen(q, answer, ai.model);
      onMark?.({ ...g, by: "ai" });
    } catch (e) {
      setErr(String((e as Error)?.message ?? e));
    } finally {
      setBusy(false);
    }
  };
  const setScore = (i: number, v: number) => onMark?.({ scores: scores.map((s, j) => (j === i ? v : s)), by: "self", feedback: mark?.by === "ai" ? mark.feedback : undefined });

  return (
    <div className="stack" style={{ marginBottom: 12 }}>
      <div>
        <div className="sample-label">Model answer</div>
        <Md text={q.modelAnswer} />
      </div>
      <div>
        <div className="row">
          <div className="sample-label">Rubric — {mark ? `${total} / ${max}` : `not marked yet (${max} marks)`}</div>
          {mark && <span className="badge">{mark.by === "ai" ? "marked by AI — adjust if you disagree" : "self-marked"}</span>}
        </div>
        {q.rubric.map((r, i) => (
          <div key={i} className="row small" style={{ marginTop: 4, flexWrap: "nowrap", alignItems: "flex-start" }}>
            <select value={scores[i]} onChange={(e) => setScore(i, Number(e.target.value))} aria-label={`Marks for rubric point ${i + 1}`} style={{ padding: "2px 6px" }}>
              {Array.from({ length: r.marks + 1 }, (_, k) => (
                <option key={k} value={k}>
                  {k}/{r.marks}
                </option>
              ))}
            </select>
            <MdInline text={r.point} />
          </div>
        ))}
      </div>
      {mark?.feedback && <div className="callout intuition small">{mark.feedback}</div>}
      <div className="row">
        <button className="btn sm primary" disabled={!ai.signedIn || busy || !answer.trim()} onClick={markWithAi}>
          {busy ? "Marking…" : mark?.by === "ai" ? "Re-mark with AI" : "Mark with AI"}
        </button>
        {!mark && (
          <button className="btn sm" onClick={() => onMark?.({ scores, by: "self" })}>
            Save self-mark
          </button>
        )}
      </div>
      <AiBar ai={ai} />
      {err && <div className="small" style={{ color: "var(--bad)" }}>{err}</div>}
    </div>
  );
}
