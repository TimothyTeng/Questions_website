"use client";

import { Rich, RichInline } from "@/components/Rich";
import type { TQuiz } from "@/data/he1004";
import { blankCorrect, fmtScore, scoreOf, type Response } from "@/lib/he1004/grading";
import { topicById } from "@/lib/he1004/topics";

const LETTERS = ["A", "B", "C", "D", "E"];

export function QuizCard({
  q,
  num,
  response,
  onResponse,
  revealed,
  onEnter,
}: {
  q: TQuiz;
  num: number;
  response: Response;
  onResponse: (r: Response) => void;
  revealed: boolean;
  /** Pressing Enter in the last blank. */
  onEnter?: () => void;
}) {
  const topic = topicById(q.topic);
  const { got, max } = scoreOf(q, response);
  const state = !revealed ? "" : got === max ? "correct" : "wrong";
  const blanks = Array.isArray(response) ? response : [];

  return (
    <article className={`card q ${state}`} id={`q-${num}`}>
      <div className="q-head">
        <span className="q-num">Q{num}</span>
        <span className="dot" style={{ background: topic.color }} />
        <span className="small muted">
          {topic.name} · {q.sub}
        </span>
        <span className="spacer" />
        <span className="badge">{q.kind === "fill" ? "Quick answer" : "MCQ"}</span>
      </div>

      {q.kind === "fill" && (
        <div className="fill-prompt">
          {q.prompt.split("____").map((part, i, arr) => (
            <span key={i}>
              <RichInline text={part} />
              {i < arr.length - 1 && (
                <input
                  aria-label={`Blank ${i + 1}`}
                  className={revealed ? (blankCorrect(q, i, blanks[i]) ? "ok" : "bad") : ""}
                  value={blanks[i] ?? ""}
                  disabled={revealed}
                  autoComplete="off"
                  spellCheck={false}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && i === arr.length - 2) onEnter?.();
                  }}
                  onChange={(e) => {
                    const next = [...blanks];
                    next[i] = e.target.value;
                    onResponse(next);
                  }}
                />
              )}
            </span>
          ))}
        </div>
      )}

      {q.kind === "mcq" && (
        <>
          <Rich text={q.prompt} />
          <div className="opts">
            {q.options.map((o, i) => {
              let cls = "opt";
              if (revealed) {
                if (i === q.answer) cls += " right";
                else if (i === response) cls += " wrongsel";
              } else if (i === response) cls += " sel";
              return (
                <button key={i} className={cls} disabled={revealed} onClick={() => onResponse(i)}>
                  <span className="letter">{LETTERS[i]}.</span>
                  <Rich text={o} />
                </button>
              );
            })}
          </div>
        </>
      )}

      {revealed && (
        <div className="solution">
          <div style={{ marginBottom: 6 }}>
            <span className={`verdict ${got === max ? "good" : ""}`} style={got === max ? undefined : { color: "var(--bad)" }}>
              {got === max ? "✓ Correct" : got > 0 ? `Partly right (${fmtScore(got)}/1)` : response === undefined ? "Not answered" : "✗ Not quite"}
            </span>{" "}
            · Answer:{" "}
            <strong>{q.kind === "fill" ? q.answers.map((a) => a[0]).join(" ; ") : <RichInline text={`${LETTERS[q.answer]}. ${q.options[q.answer]}`} />}</strong>
            {q.kind === "fill" && q.answers.some((a) => a.length > 1) && (
              <span className="small muted"> (also accepted: {q.answers.flatMap((a) => a.slice(1)).join(", ")})</span>
            )}
          </div>
          <Rich className="small" text={q.explain} />
        </div>
      )}
    </article>
  );
}
