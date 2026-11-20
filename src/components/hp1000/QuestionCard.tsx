"use client";

import type { TQuestion } from "@/data/hp1000";
import { blankCorrect, fmtScore, scoreOf, type Response, type WrittenMark } from "@/lib/hp1000/grading";
import { topicById } from "@/lib/hp1000/topics";

const LETTERS = ["A", "B", "C", "D", "E"];
const KIND_LABEL = { fill: "Fill in the blank", mcq: "MCQ", written: "Short answer" };

export function QuestionCard({
  q,
  num,
  response,
  onResponse,
  revealed,
  mark,
  onMark,
}: {
  q: TQuestion;
  num: number;
  response: Response;
  onResponse: (r: Response) => void;
  revealed: boolean;
  mark?: WrittenMark;
  onMark?: (m: WrittenMark) => void;
}) {
  const topic = topicById(q.topic);
  const { got, max } = scoreOf(q, response, mark);
  const state = !revealed || (q.kind === "written" && !mark) ? "" : got === max ? "correct" : "wrong";
  const blanks = Array.isArray(response) ? (response as string[]) : [];

  return (
    <article className={`card q ${state}`} id={`q-${num}`}>
      <div className="q-head">
        <span className="q-num">Q{num}</span>
        <span className="dot" style={{ background: topic.color }} />
        <span className="small muted">
          {topic.name} · {q.sub}
        </span>
        <span className="spacer" />
        {q.official && <span className="badge" title="From the course's official practice document">Official practice</span>}
        <span className="badge">{KIND_LABEL[q.kind]}</span>
        {q.kind === "written" && <span className="badge">{q.marks} marks</span>}
      </div>

      {q.kind === "fill" && (
        <div className="fill-prompt">
          {q.prompt.split("____").map((part, i, arr) => (
            <span key={i}>
              <span style={{ whiteSpace: "pre-line" }}>{part}</span>
              {i < arr.length - 1 && (
                <input
                  aria-label={`Blank ${i + 1}`}
                  className={revealed ? (blankCorrect(q, i, blanks[i]) ? "ok" : "bad") : ""}
                  value={blanks[i] ?? ""}
                  disabled={revealed}
                  autoComplete="off"
                  spellCheck={false}
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
          <div style={{ whiteSpace: "pre-line" }}>{q.prompt}</div>
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
                  <span>{o}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {q.kind === "written" && (
        <>
          <div style={{ whiteSpace: "pre-line" }}>{q.prompt}</div>
          <textarea
            className="answer-input"
            style={{ marginTop: 10 }}
            placeholder="Write your answer: name the concept, define it, and tie it to details in the scenario."
            value={blanks[0] ?? ""}
            disabled={revealed}
            onChange={(e) => onResponse([e.target.value])}
          />
        </>
      )}

      {revealed && (
        <div className="solution">
          {q.kind === "fill" && (
            <div style={{ marginBottom: 6 }}>
              <span className={`verdict ${got === max ? "good" : ""}`} style={got === max ? undefined : { color: "var(--bad)" }}>
                {got === max ? "✓ Correct" : got > 0 ? `Partly right (${fmtScore(got)}/1)` : "✗ Not quite"}
              </span>{" "}
              · Answer: <strong>{q.answers.map((a) => a[0]).join(" ; ")}</strong>
              {q.answers.some((a) => a.length > 1) && (
                <span className="small muted"> (also accepted: {q.answers.flatMap((a) => a.slice(1)).join(", ")})</span>
              )}
            </div>
          )}
          {q.kind === "mcq" && (
            <div style={{ marginBottom: 6 }}>
              <span className={`verdict ${got === max ? "good" : ""}`} style={got === max ? undefined : { color: "var(--bad)" }}>
                {got === max ? "✓ Correct" : response === undefined ? "Not answered" : "✗ Incorrect"}
              </span>{" "}
              · Answer: <strong>{LETTERS[q.answer]}. {q.options[q.answer]}</strong>
            </div>
          )}
          {q.kind === "written" && (
            <div style={{ marginBottom: 8 }}>
              <div className="small" style={{ marginBottom: 4 }}>
                <strong>Mark yourself</strong> — tick each point your answer makes ({fmtScore(got)}/{max}):
              </div>
              {q.points.map((p, i) => (
                <label key={i} className="model-point">
                  <input
                    type="checkbox"
                    checked={mark?.includes(i) ?? false}
                    onChange={(e) => {
                      const cur = mark ?? [];
                      onMark?.(e.target.checked ? [...cur, i] : cur.filter((x) => x !== i));
                    }}
                  />
                  <span>{p}</span>
                </label>
              ))}
              {!mark && (
                <button className="btn sm" onClick={() => onMark?.([])}>
                  None of these
                </button>
              )}
            </div>
          )}
          <div className="small" style={{ whiteSpace: "pre-line" }}>
            {q.explain}
          </div>
        </div>
      )}
    </article>
  );
}
