"use client";

import type { Question } from "@/lib/types";
import { topicById } from "@/lib/topics";
import { Rich, RichInline } from "./Rich";

const LETTERS = ["a", "b", "c", "d", "e"];
const TFN_LETTERS = ["A", "B", "C"];

export function QuestionCard({
  q,
  num,
  picked,
  onPick,
  revealed,
}: {
  q: Question;
  num: number;
  picked: number | undefined;
  onPick: (i: number) => void;
  revealed: boolean;
}) {
  const topic = topicById(q.topic);
  const state = revealed ? (picked === q.answer ? "correct" : "wrong") : "";
  const letters = q.kind === "tfn" ? TFN_LETTERS : LETTERS;
  return (
    <article className={`card q ${state}`} id={`q-${num}`}>
      <div className="q-head">
        <span className="q-num">Q{num}</span>
        <span className="dot" style={{ background: topic.color }} />
        <span className="small muted">
          {topic.name} · {q.subtopic}
        </span>
        <span className="spacer" />
        <span className="badge">{q.kind === "tfn" ? "True / False / NEI" : "MCQ"}</span>
        <span className="badge">{q.id}</span>
      </div>
      {q.kind === "tfn" && <div className="small muted" style={{ marginBottom: 6 }}>Answer with (A) True, (B) False, (C) Not enough information to determine.</div>}
      <Rich text={q.prompt} />
      <div className="opts">
        {q.options.map((o, i) => {
          let cls = "opt";
          if (revealed) {
            if (i === q.answer) cls += " right";
            else if (i === picked) cls += " wrongsel";
          } else if (i === picked) cls += " sel";
          return (
            <button key={i} className={cls} disabled={revealed} onClick={() => onPick(i)}>
              <span className="letter">{letters[i]})</span>
              <span>
                <RichInline text={o} />
              </span>
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="solution">
          <div className={`verdict ${state === "correct" ? "good" : "bad"}`} style={{ marginBottom: 6 }}>
            {picked === undefined ? "Not answered" : state === "correct" ? "Correct" : "Incorrect"} — answer: ({letters[q.answer]})
          </div>
          <Rich text={q.solution} />
        </div>
      )}
    </article>
  );
}
