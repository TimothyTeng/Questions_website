"use client";

import { checkShort, scoreOf, type OpenMark, type Response } from "@/lib/sc1005/grading";
import { topicById } from "@/lib/sc1005/topics";
import type { OpenQ, Question } from "@/lib/sc1005/types";
import { Figures } from "./figures/Figure";
import { CodeBlock, Txt, TxtInline } from "./Text";

const LETTERS = ["A", "B", "C", "D", "E"];
const KIND_LABEL = { mcq: "MCQ", short: "Short answer", open: "Structured" };

export function QuestionCard({
  q,
  num,
  response,
  onResponse,
  revealed,
  mark,
  onMark,
}: {
  q: Question;
  num: number;
  response: Response;
  onResponse: (r: Response) => void;
  revealed: boolean;
  mark?: OpenMark;
  onMark?: (m: OpenMark) => void;
}) {
  const topic = topicById(q.topic);
  const { got, max } = scoreOf(q, response, mark);
  const state = !revealed || (q.kind === "open" && !mark) ? "" : got === max ? "correct" : "wrong";
  return (
    <article className={`card q ${state}`} id={`q-${num}`}>
      <div className="q-head">
        <span className="q-num">Q{num}</span>
        <span className="dot" style={{ background: topic.color }} />
        <span className="small muted">
          Ch {topic.ch} {topic.name} · {q.subtopic}
        </span>
        <span className="spacer" />
        <span className="badge">{KIND_LABEL[q.kind]}</span>
        <span className={`badge diff-${q.difficulty}`}>{q.difficulty}</span>
        {q.kind === "open" && <span className="badge">{max} marks</span>}
        <span className="badge">{q.id}</span>
      </div>
      <Txt text={q.prompt} />
      <Figures figs={q.figures} />
      {q.code && <CodeBlock code={q.code} />}

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
                <span className="letter">{LETTERS[i]}.</span>
                {o.includes("\n") ? <pre className="code">{o}</pre> : <TxtInline text={o} />}
              </button>
            );
          })}
        </div>
      )}

      {q.kind === "short" && (
        <div style={{ marginTop: 10 }}>
          <input
            className="answer-input"
            placeholder={q.placeholder ?? (q.match === "expr" ? `Boolean expression, e.g. A'B + C(D + E)'` : q.match === "number" ? "A number" : "Your answer")}
            value={typeof response === "string" ? response : ""}
            disabled={revealed}
            onChange={(e) => onResponse(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          {q.match === "expr" && !revealed && (
            <div className="small muted" style={{ marginTop: 4 }}>
              Write NOT as a prime (A&apos;) or ~A, AND by juxtaposition (AB) or *, OR as +, XOR as ^. Marked by comparing truth tables{q.minimal ? "; must be a minimum form" : ""}.
            </div>
          )}
        </div>
      )}

      {q.kind === "open" && (
        <textarea
          className="answer-input"
          rows={8}
          style={{ marginTop: 10 }}
          placeholder="Write your answer (working, expressions or Verilog), then compare with the model answer"
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
              {response === undefined ? "Not answered" : state === "correct" ? "Correct" : "Incorrect"} — answer: {LETTERS[q.answer]}
            </div>
          )}
          {q.kind === "short" && <ShortVerdictView q={q} response={response} />}
          {q.kind === "open" && <OpenMarking q={q} mark={mark} onMark={onMark} />}
          <Txt text={q.solution} />
          <Figures figs={q.solutionFigures} />
          {q.source && <div className="small muted src">{q.source}</div>}
        </div>
      )}
    </article>
  );
}

function ShortVerdictView({ q, response }: { q: Extract<Question, { kind: "short" }>; response: Response }) {
  const v = checkShort(q, response);
  return (
    <div style={{ marginBottom: 6 }}>
      <div className={`verdict ${v.ok ? "good" : "bad"}`}>
        {!response ? "Not answered" : v.ok ? "Correct" : "Incorrect"} — answer: <TxtInline text={q.match === "expr" ? `\`${q.accept[0]}\`` : q.accept[0]} />
      </div>
      {v.note && <div className="expr-note">{v.note}</div>}
    </div>
  );
}

function OpenMarking({ q, mark, onMark }: { q: OpenQ & { id: string }; mark?: OpenMark; onMark?: (m: OpenMark) => void }) {
  const scores = mark?.scores ?? q.rubric.map(() => 0);
  const total = scores.reduce((s, x) => s + x, 0);
  const max = q.rubric.reduce((s, r) => s + r.marks, 0);
  const setScore = (i: number, v: number) => onMark?.({ scores: scores.map((s, j) => (j === i ? v : s)) });
  return (
    <div className="stack" style={{ marginBottom: 12 }}>
      <div>
        <div className="sample-label">Model answer</div>
        <Txt text={q.modelAnswer} />
        <Figures figs={q.modelFigures} />
      </div>
      <div>
        <div className="row">
          <div className="sample-label">Mark yourself — {mark ? `${total} / ${max}` : `not marked yet (${max} marks)`}</div>
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
            <TxtInline text={r.point} />
          </div>
        ))}
      </div>
      {!mark && (
        <div className="row">
          <button className="btn sm primary" onClick={() => onMark?.({ scores })}>
            Save my marks
          </button>
        </div>
      )}
    </div>
  );
}
