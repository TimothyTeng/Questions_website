"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/hp1000/QuestionCard";
import { ALL_QUESTIONS, type TQuestion } from "@/data/hp1000";
import { downloadDoc, type AnswerPlacement } from "@/lib/hp1000/docExport";
import { answered, fmtScore, isCorrect, scoreOf, type Response, type WrittenMark } from "@/lib/hp1000/grading";
import { recordAnswers, useProgress } from "@/lib/hp1000/store";
import { PARTS, TOPICS, topicById } from "@/lib/hp1000/topics";
import type { Kind, TopicId } from "@/lib/hp1000/types";

type Pool = "all" | "unseen" | "wrong";
const KINDS: { k: Kind; label: string }[] = [
  { k: "fill", label: "Fill in the blank" },
  { k: "mcq", label: "MCQ" },
  { k: "written", label: "Short answer (self-marked)" },
];
const PER_TOPIC = [5, 10, 15, 20, 0];

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuestionsEntry() {
  const topic = useSearchParams().get("topic");
  const initial = TOPICS.find((t) => t.id === topic)?.id;
  return <Questions key={initial ?? "all"} initialTopic={initial} />;
}

function Questions({ initialTopic }: { initialTopic?: TopicId }) {
  const progress = useProgress();
  const [topics, setTopics] = useState<TopicId[]>(initialTopic ? [initialTopic] : []);
  const [kinds, setKinds] = useState<Kind[]>(["fill", "mcq"]);
  const [perTopic, setPerTopic] = useState(initialTopic ? 10 : 5);
  const [pool, setPool] = useState<Pool>("all");
  const [mixed, setMixed] = useState(false);
  const [placement, setPlacement] = useState<AnswerPlacement>("every5");

  const [phase, setPhase] = useState<"setup" | "quiz" | "done">("setup");
  const [qs, setQs] = useState<TQuestion[]>([]);
  /** Each batch is up to 5 consecutive indices into qs (one topic per batch unless mixed). */
  const [batches, setBatches] = useState<number[][]>([]);
  const [bi, setBi] = useState(0);
  const [resp, setResp] = useState<Record<number, Response>>({});
  const [marks, setMarks] = useState<Record<number, WrittenMark>>({});
  const [revealed, setRevealed] = useState(false);

  const chosenTopics = useMemo(() => (topics.length ? topics : TOPICS.map((t) => t.id)), [topics]);
  const matching = useMemo(
    () =>
      ALL_QUESTIONS.filter((q) => {
        if (!chosenTopics.includes(q.topic) || !kinds.includes(q.kind)) return false;
        const st = progress[q.id];
        if (pool === "unseen" && st) return false;
        if (pool === "wrong" && (!st || st.last)) return false;
        return true;
      }),
    [chosenTopics, kinds, pool, progress],
  );

  const begin = (list: TQuestion[], groupByTopic: boolean) => {
    const ordered: TQuestion[] = [];
    const bs: number[][] = [];
    const push = (chunk: TQuestion[]) => {
      bs.push(chunk.map((_, j) => ordered.length + j));
      ordered.push(...chunk);
    };
    if (groupByTopic) {
      for (const t of TOPICS) {
        const tq = list.filter((q) => q.topic === t.id);
        for (let i = 0; i < tq.length; i += 5) push(tq.slice(i, i + 5));
      }
    } else for (let i = 0; i < list.length; i += 5) push(list.slice(i, i + 5));
    setQs(ordered);
    setBatches(bs);
    setBi(0);
    setResp({});
    setMarks({});
    setRevealed(false);
    setPhase("quiz");
    window.scrollTo({ top: 0 });
  };

  const startQuiz = () => {
    let list: TQuestion[] = [];
    for (const t of chosenTopics) {
      const tq = shuffle(matching.filter((q) => q.topic === t));
      list.push(...(perTopic ? tq.slice(0, perTopic) : tq));
    }
    list = shuffle(list);
    begin(list, !mixed);
  };

  const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);
  const docTitle = () => {
    const names = topics.length === 0 ? "All topics" : topics.length <= 2 ? topics.map((t) => topicById(t).name).join(" + ") : `${topics.length} topics`;
    return `HP1000 practice - ${names}`;
  };

  if (phase === "setup") {
    const total = chosenTopics.reduce((a, t) => {
      const n = matching.filter((q) => q.topic === t).length;
      return a + (perTopic ? Math.min(perTopic, n) : n);
    }, 0);
    return (
      <div className="page narrow stack">
        <div>
          <h1>Questions</h1>
          <p className="lead">
            {ALL_QUESTIONS.length} questions written from the lecture slides in the style of the official practice questions (marked “Official practice” when they are the course&apos;s own). Questions
            come five at a time from one topic, and the answers are shown after each five. Fill-in-the-blank answers are auto-marked and spelling slips are not penalised, as in the exam; short answers are
            self-marked against model points.
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
                    {pt.name} only
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
              {KINDS.map(({ k, label }) => (
                <button key={k} className={`chip ${kinds.includes(k) ? "on" : ""}`} onClick={() => setKinds((p) => (p.length === 1 && p[0] === k ? p : toggle(p, k)))}>
                  {label} ({ALL_QUESTIONS.filter((q) => q.kind === k && chosenTopics.includes(q.topic)).length})
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <span className="field-label">Questions per topic</span>
            <div className="row">
              {PER_TOPIC.map((c) => (
                <button key={c} className={`chip ${perTopic === c ? "on" : ""}`} onClick={() => setPerTopic(c)}>
                  {c || "All"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid cols-3" style={{ gap: 20 }}>
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
                <button className={`chip ${!mixed ? "on" : ""}`} onClick={() => setMixed(false)}>
                  Topic by topic
                </button>
                <button className={`chip ${mixed ? "on" : ""}`} onClick={() => setMixed(true)}>
                  Mixed
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <span className="muted small">
              {total} question{total === 1 ? "" : "s"} · answers after every 5
            </span>
            <span className="spacer" />
            <button className="btn primary" disabled={!total} onClick={startQuiz}>
              Start {total} →
            </button>
          </div>
        </div>

        <div className="card">
          <h3>📄 Download as a Word document</h3>
          <p className="small muted" style={{ marginTop: 0 }}>
            Exports every question matching the topics, types and pool above ({matching.length} questions), grouped by topic in lecture order, with blank lines to write on.
          </p>
          <div className="row">
            {(
              [
                ["every5", "Answers after every 5"],
                ["end", "Answer key at end of each topic"],
                ["none", "No answers"],
              ] as [AnswerPlacement, string][]
            ).map(([k, label]) => (
              <button key={k} className={`chip ${placement === k ? "on" : ""}`} onClick={() => setPlacement(k)}>
                {label}
              </button>
            ))}
            <span className="spacer" />
            <button className="btn primary" disabled={!matching.length} onClick={() => downloadDoc(matching, placement, docTitle())}>
              ⬇ Download .doc
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const results = qs.map((q, i) => ({ q, i, ...scoreOf(q, resp[i], marks[i]), ok: isCorrect(q, resp[i], marks[i]) }));
    const got = results.reduce((a, r) => a + r.got, 0);
    const max = results.reduce((a, r) => a + r.max, 0);
    const wrong = results.filter((r) => !r.ok);
    const perTopicStats = TOPICS.map((t) => {
      const rs = results.filter((r) => r.q.topic === t.id);
      return { t, got: rs.reduce((a, r) => a + r.got, 0), max: rs.reduce((a, r) => a + r.max, 0) };
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
            <button className="btn primary" onClick={() => begin(shuffle(wrong.map((r) => r.q)), true)}>
              Retry the {wrong.length} I got wrong
            </button>
          )}
          <button className="btn" onClick={() => setPhase("setup")}>
            New set
          </button>
        </div>
        {wrong.length > 0 && <h2>Review</h2>}
        {wrong.map((r) => (
          <QuestionCard key={r.i} q={r.q} num={r.i + 1} response={resp[r.i]} onResponse={() => {}} revealed mark={marks[r.i]} />
        ))}
      </div>
    );
  }

  const batch = batches[bi];
  const bqs = batch.map((i) => qs[i]);
  const topicsInBatch = [...new Set(bqs.map((q) => q.topic))];
  const answeredN = batch.filter((i) => answered(qs[i], resp[i])).length;
  const bGot = batch.reduce((a, i) => a + scoreOf(qs[i], resp[i], marks[i]).got, 0);
  const bMax = batch.reduce((a, i) => a + scoreOf(qs[i], resp[i], marks[i]).max, 0);
  const pendingWritten = batch.filter((i) => qs[i].kind === "written" && !marks[i]).length;
  const last = bi + 1 >= batches.length;

  const check = () => {
    recordAnswers(batch.filter((i) => qs[i].kind !== "written").map((i) => ({ id: qs[i].id, correct: isCorrect(qs[i], resp[i]) })));
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
  const setMark = (i: number, m: WrittenMark) => {
    setMarks((p) => ({ ...p, [i]: m }));
    recordAnswers([{ id: qs[i].id, correct: isCorrect(qs[i], resp[i], m) }]);
  };

  return (
    <div className="page narrow stack">
      <div className="batch-head">
        <div>
          <h2 style={{ margin: 0 }}>
            {topicsInBatch.length === 1 ? topicById(topicsInBatch[0]).name : "Mixed topics"} · Q{batch[0] + 1}–{batch[batch.length - 1] + 1} of {qs.length}
          </h2>
          <span className="small muted">
            Set {bi + 1} of {batches.length} · {revealed ? `${fmtScore(bGot)}/${bMax} in this set${pendingWritten ? " (mark your short answers below)" : ""}` : `${answeredN}/${batch.length} answered`}
          </span>
        </div>
        <span className="spacer" />
        <button className="btn" onClick={() => setPhase("setup")}>
          Quit
        </button>
      </div>
      <div className="bar">
        <div style={{ width: `${(100 * (revealed ? bi + 1 : bi)) / batches.length}%`, background: "var(--accent)" }} />
      </div>
      {batch.map((i) => (
        <QuestionCard
          key={`${bi}-${qs[i].id}`}
          q={qs[i]}
          num={i + 1}
          response={resp[i]}
          onResponse={(r) => setResp((p) => ({ ...p, [i]: r }))}
          revealed={revealed}
          mark={marks[i]}
          onMark={(m) => setMark(i, m)}
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
