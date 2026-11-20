"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QuizCard } from "@/components/he1002/QuizCard";
import { ALL_QUIZ, type TQuiz } from "@/data/he1002";
import { answered, fmtScore, isCorrect, scoreOf, type Response } from "@/lib/he1002/grading";
import { recordAnswers, useProgress } from "@/lib/he1002/store";
import { PARTS, TOPICS, topicById } from "@/lib/he1002/topics";
import type { TopicId } from "@/lib/he1002/types";

type Pool = "all" | "unseen" | "wrong";
type Kind = "fill" | "mcq";
const PER_TOPIC = [5, 10, 20, 0];

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizEntry() {
  const topic = useSearchParams().get("topic");
  const initial = TOPICS.find((t) => t.id === topic)?.id;
  return <Quiz key={initial ?? "all"} initialTopic={initial} />;
}

function Quiz({ initialTopic }: { initialTopic?: TopicId }) {
  const progress = useProgress();
  const [topics, setTopics] = useState<TopicId[]>(initialTopic ? [initialTopic] : []);
  const [kinds, setKinds] = useState<Kind[]>(["fill"]);
  const [perTopic, setPerTopic] = useState(initialTopic ? 0 : 10);
  const [pool, setPool] = useState<Pool>("all");
  const [order, setOrder] = useState<"lecture" | "shuffle">("lecture");

  const [phase, setPhase] = useState<"setup" | "quiz" | "done">("setup");
  const [qs, setQs] = useState<TQuiz[]>([]);
  const [batches, setBatches] = useState<number[][]>([]);
  const [bi, setBi] = useState(0);
  const [resp, setResp] = useState<Record<number, Response>>({});
  const [revealed, setRevealed] = useState(false);

  const chosenTopics = useMemo(() => (topics.length ? topics : TOPICS.map((t) => t.id)), [topics]);
  const matching = useMemo(
    () =>
      ALL_QUIZ.filter((q) => {
        if (!chosenTopics.includes(q.topic) || !kinds.includes(q.kind)) return false;
        const st = progress[q.id];
        if (pool === "unseen" && st) return false;
        if (pool === "wrong" && (!st || st.last)) return false;
        return true;
      }),
    [chosenTopics, kinds, pool, progress],
  );

  /** Batches of 5, never mixing topics, in lecture order. */
  const begin = (list: TQuiz[]) => {
    const ordered: TQuiz[] = [];
    const bs: number[][] = [];
    for (const t of TOPICS) {
      const tq = list.filter((q) => q.topic === t.id);
      for (let i = 0; i < tq.length; i += 5) {
        const chunk = tq.slice(i, i + 5);
        bs.push(chunk.map((_, j) => ordered.length + j));
        ordered.push(...chunk);
      }
    }
    setQs(ordered);
    setBatches(bs);
    setBi(0);
    setResp({});
    setRevealed(false);
    setPhase("quiz");
    window.scrollTo({ top: 0 });
  };

  const start = () => {
    const list: TQuiz[] = [];
    for (const t of chosenTopics) {
      let tq = matching.filter((q) => q.topic === t);
      if (order === "shuffle" || (perTopic && perTopic < tq.length)) tq = shuffle(tq);
      if (perTopic) tq = tq.slice(0, perTopic);
      // "In lecture order" keeps the data's order (which follows the slides) even after sampling.
      if (order === "lecture") tq.sort((a, b) => ALL_QUIZ.indexOf(a) - ALL_QUIZ.indexOf(b));
      list.push(...tq);
    }
    begin(list);
  };

  const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);

  if (phase === "setup") {
    const total = chosenTopics.reduce((a, t) => {
      const n = matching.filter((q) => q.topic === t).length;
      return a + (perTopic ? Math.min(perTopic, n) : n);
    }, 0);
    return (
      <div className="page narrow stack">
        <div>
          <h1>Topic quiz</h1>
          <p className="lead">
            Short-answer fill-in-the-blanks to make the terms and formulas stick, plus a few MCQs. Questions come five at a time from one lecture, with the answers and explanations after each five.
            Spelling slips are forgiven; numbers are accepted at the stated rounding.
          </p>
        </div>
        <div className="card">
          <div className="field">
            <span className="field-label">Topics</span>
            <div className="row" style={{ marginBottom: 6 }}>
              <button className={`chip ${topics.length === 0 ? "on" : ""}`} onClick={() => setTopics([])}>
                🎲 All topics
              </button>
              {PARTS.map((pt) => {
                const ids = TOPICS.filter((t) => t.part === pt.part).map((t) => t.id);
                const on = ids.length === topics.length && ids.every((id) => topics.includes(id));
                return (
                  <button key={pt.part} className={`chip ${on ? "on" : ""}`} onClick={() => setTopics(on ? [] : ids)}>
                    {pt.note}
                  </button>
                );
              })}
            </div>
            <div className="row">
              {TOPICS.map((t) => (
                <button key={t.id} className={`chip ${topics.includes(t.id) ? "on" : ""}`} onClick={() => setTopics((p) => toggle(p, t.id))}>
                  <span className="dot" style={{ background: t.color, marginRight: 6 }} />
                  {t.n}. {t.name}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <span className="field-label">Question types</span>
            <div className="row">
              {(
                [
                  ["fill", "✏️ Short answer (fill in the blank)"],
                  ["mcq", "MCQ"],
                ] as [Kind, string][]
              ).map(([k, label]) => (
                <button key={k} className={`chip ${kinds.includes(k) ? "on" : ""}`} onClick={() => setKinds((p) => (p.length === 1 && p[0] === k ? p : toggle(p, k)))}>
                  {label} ({ALL_QUIZ.filter((q) => q.kind === k && chosenTopics.includes(q.topic)).length})
                </button>
              ))}
            </div>
          </div>
          <div className="grid cols-3" style={{ gap: 20 }}>
            <div className="field">
              <span className="field-label">Per topic</span>
              <div className="row">
                {PER_TOPIC.map((c) => (
                  <button key={c} className={`chip ${perTopic === c ? "on" : ""}`} onClick={() => setPerTopic(c)}>
                    {c || "All"}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="field-label">Pool</span>
              <div className="row">
                {(["all", "unseen", "wrong"] as Pool[]).map((k) => (
                  <button key={k} className={`chip ${pool === k ? "on" : ""}`} onClick={() => setPool(k)}>
                    {k === "all" ? "All" : k === "unseen" ? "Unseen" : "Got wrong"}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="field-label">Order</span>
              <div className="row">
                <button className={`chip ${order === "lecture" ? "on" : ""}`} onClick={() => setOrder("lecture")}>
                  Lecture order
                </button>
                <button className={`chip ${order === "shuffle" ? "on" : ""}`} onClick={() => setOrder("shuffle")}>
                  Shuffled
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <span className="muted small">
              {total} question{total === 1 ? "" : "s"} · answers after every 5
            </span>
            <span className="spacer" />
            <button className="btn primary" disabled={!total} onClick={start}>
              Start {total} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const results = qs.map((q, i) => ({ q, i, ...scoreOf(q, resp[i]), ok: isCorrect(q, resp[i]) }));
    const got = results.reduce((a, r) => a + r.got, 0);
    const max = results.length;
    const wrong = results.filter((r) => !r.ok);
    const perTopicStats = TOPICS.map((t) => {
      const rs = results.filter((r) => r.q.topic === t.id);
      return { t, got: rs.reduce((a, r) => a + r.got, 0), max: rs.length };
    }).filter((x) => x.max);
    return (
      <div className="page narrow stack">
        <div>
          <h1>
            Score: {fmtScore(got)} / {max} ({Math.round((100 * got) / Math.max(1, max))}%)
          </h1>
          <p className="lead">{wrong.length ? `${wrong.length} to review below.` : "Everything right — nice."}</p>
        </div>
        <div className="card">
          <h3>By topic</h3>
          {perTopicStats.map(({ t, got, max }) => (
            <div key={t.id} style={{ marginBottom: 10 }}>
              <div className="row small">
                <span className="dot" style={{ background: t.color }} />
                {t.name}
                <span className="spacer" />
                {fmtScore(got)}/{max}
              </div>
              <div className="bar">
                <div style={{ width: `${(100 * got) / max}%`, background: t.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {wrong.length > 0 && (
            <button className="btn primary" onClick={() => begin(wrong.map((r) => r.q))}>
              Retry the {wrong.length} I got wrong
            </button>
          )}
          <button className="btn" onClick={() => setPhase("setup")}>
            New quiz
          </button>
        </div>
        {wrong.length > 0 && <h2>Review</h2>}
        {wrong.map((r) => (
          <QuizCard key={r.i} q={r.q} num={r.i + 1} response={resp[r.i]} onResponse={() => {}} revealed />
        ))}
      </div>
    );
  }

  const batch = batches[bi];
  const t = topicById(qs[batch[0]].topic);
  const answeredN = batch.filter((i) => answered(qs[i], resp[i])).length;
  const bGot = batch.reduce((a, i) => a + scoreOf(qs[i], resp[i]).got, 0);
  const last = bi + 1 >= batches.length;

  const check = () => {
    recordAnswers(batch.map((i) => ({ id: qs[i].id, correct: isCorrect(qs[i], resp[i]) })));
    setRevealed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = () => {
    if (last) setPhase("done");
    else {
      setBi(bi + 1);
      setRevealed(false);
    }
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page narrow stack">
      <div className="batch-head">
        <div>
          <h2 style={{ margin: 0 }}>
            <span className="dot" style={{ background: t.color, marginRight: 8 }} />
            {t.name} · Q{batch[0] + 1}–{batch[batch.length - 1] + 1} of {qs.length}
          </h2>
          <span className="small muted">
            Set {bi + 1} of {batches.length} · {revealed ? `${fmtScore(bGot)}/${batch.length} in this set` : `${answeredN}/${batch.length} answered`}
          </span>
        </div>
        <span className="spacer" />
        <button className="btn" onClick={() => setPhase("done")}>
          Finish
        </button>
      </div>
      <div className="bar">
        <div style={{ width: `${(100 * (revealed ? bi + 1 : bi)) / batches.length}%`, background: "var(--accent)" }} />
      </div>
      {batch.map((i, k) => (
        <QuizCard
          key={`${bi}-${qs[i].id}`}
          q={qs[i]}
          num={i + 1}
          response={resp[i]}
          onResponse={(r) => setResp((p) => ({ ...p, [i]: r }))}
          revealed={revealed}
          onEnter={() => {
            const nextQ = document.querySelector<HTMLInputElement>(`#q-${batch[k + 1] + 1} input`);
            if (nextQ) nextQ.focus();
            else if (!revealed) check();
          }}
        />
      ))}
      <div className="row">
        <span className="spacer" />
        {!revealed ? (
          <button className="btn primary" onClick={check}>
            {answeredN < batch.length ? `Check answers (${batch.length - answeredN} blank)` : "Check answers"}
          </button>
        ) : (
          <button className="btn primary" onClick={next}>
            {last ? "See results" : "Next 5 →"}
          </button>
        )}
      </div>
    </div>
  );
}
