"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { getBank } from "@/lib/bank";
import { recordAnswers, useProgress } from "@/lib/progress";
import { TOPICS } from "@/lib/topics";
import type { Question, TopicId } from "@/lib/types";

type Scope = "random" | "topics";
type Pool = "all" | "unseen" | "wrong";
type Kind = "all" | "mcq" | "tfn";

interface Settings {
  scope: Scope;
  topics: TopicId[];
  subtopic: string;
  pool: Pool;
  kind: Kind;
  count: number;
  /** Reveal answers after this many questions; 0 = only at the end. */
  batch: number;
}

const DEFAULTS: Settings = { scope: "random", topics: [], subtopic: "all", pool: "all", kind: "all", count: 10, batch: 0 };
const COUNTS = [5, 10, 20, 30, 50];
const BATCHES = [
  { v: 1, label: "After each question" },
  { v: 5, label: "Every 5" },
  { v: 10, label: "Every 10" },
  { v: 0, label: "At the end (exam style)" },
];

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Reads ?topic=… so Learn/Home links can preselect a topic. */
export function PracticeEntry() {
  const topic = useSearchParams().get("topic");
  const initialTopic = TOPICS.find((t) => t.id === topic)?.id;
  return <Practice key={initialTopic ?? "all"} initialTopic={initialTopic} />;
}

export function Practice({ initialTopic }: { initialTopic?: TopicId }) {
  const bank = useMemo(() => getBank(), []);
  const progress = useProgress();
  // Deep link: /practice?topic=eigen
  const [s, setS] = useState<Settings>(initialTopic ? { ...DEFAULTS, scope: "topics", topics: [initialTopic] } : DEFAULTS);
  const [phase, setPhase] = useState<"setup" | "quiz" | "done">("setup");
  const [qs, setQs] = useState<Question[]>([]);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [start, setStart] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [t0, setT0] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (phase !== "quiz") return;
    const h = setInterval(() => setElapsed(Date.now() - t0), 1000);
    return () => clearInterval(h);
  }, [phase, t0]);

  const subtopics = useMemo(() => {
    if (s.scope !== "topics" || s.topics.length !== 1) return [];
    return [...new Set(bank.filter((q) => q.topic === s.topics[0]).map((q) => q.subtopic))].sort();
  }, [bank, s.scope, s.topics]);

  const pool = useMemo(
    () =>
      bank.filter((q) => {
        if (s.scope === "topics" && !s.topics.includes(q.topic)) return false;
        if (subtopics.length && s.subtopic !== "all" && q.subtopic !== s.subtopic) return false;
        if (s.kind !== "all" && q.kind !== s.kind) return false;
        const st = progress[q.id];
        if (s.pool === "unseen" && st) return false;
        if (s.pool === "wrong" && (!st || st.last)) return false;
        return true;
      }),
    [bank, s, subtopics.length, progress],
  );

  const begin = (list: Question[]) => {
    setQs(list);
    setPicks({});
    setStart(0);
    setRevealed(false);
    setT0(Date.now());
    setElapsed(0);
    setPhase("quiz");
    window.scrollTo({ top: 0 });
  };

  const startQuiz = () => {
    // Random mode spreads questions evenly over topics before shuffling.
    let list: Question[];
    if (s.scope === "random") {
      const byTopic = TOPICS.map((t) => shuffle(pool.filter((q) => q.topic === t.id)));
      list = [];
      for (let i = 0; list.length < Math.min(s.count, pool.length); i++)
        for (const arr of shuffle(byTopic)) if (arr[i] && list.length < s.count) list.push(arr[i]);
      list = shuffle(list);
    } else list = shuffle(pool).slice(0, s.count);
    begin(list);
  };

  const size = s.batch === 0 ? qs.length : s.batch;
  const current = qs.slice(start, start + size);
  const answeredInBatch = current.filter((_, i) => picks[start + i] !== undefined).length;

  const check = () => {
    recordAnswers(current.map((q, i) => ({ id: q.id, correct: picks[start + i] === q.answer })));
    setRevealed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = () => {
    if (start + size >= qs.length) {
      setPhase("done");
    } else {
      setStart(start + size);
      setRevealed(false);
    }
    window.scrollTo({ top: 0 });
  };

  const toggleTopic = (id: TopicId) =>
    setS((p) => ({ ...p, scope: "topics", subtopic: "all", topics: p.topics.includes(id) ? p.topics.filter((t) => t !== id) : [...p.topics, id] }));

  if (phase === "setup") {
    const n = Math.min(s.count, pool.length);
    return (
      <div className="page narrow">
        <h1>Practice</h1>
        <p className="lead">500 CA2-style questions: 5-option MCQs (with “None of the above”) and True / False / Not-enough-information statements, each with a worked solution.</p>
        <div className="card">
          <div className="field">
            <span className="field-label">Questions from</span>
            <div className="row">
              <button className={`chip ${s.scope === "random" ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, scope: "random", topics: [], subtopic: "all" }))}>
                🎲 Random — all topics
              </button>
              {TOPICS.map((t) => (
                <button key={t.id} className={`chip ${s.scope === "topics" && s.topics.includes(t.id) ? "on" : ""}`} onClick={() => toggleTopic(t.id)}>
                  <span className="dot" style={{ background: t.color, marginRight: 6 }} />
                  {t.name}
                </button>
              ))}
            </div>
            {s.scope === "topics" && s.topics.length === 0 && <p className="small muted">Pick one or more topics.</p>}
          </div>

          {subtopics.length > 0 && (
            <div className="field">
              <label htmlFor="sub">Subtopic</label>
              <select id="sub" value={s.subtopic} onChange={(e) => setS((p) => ({ ...p, subtopic: e.target.value }))}>
                <option value="all">All subtopics</option>
                {subtopics.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="field">
            <span className="field-label">Number of questions</span>
            <div className="row">
              {COUNTS.map((c) => (
                <button key={c} className={`chip ${s.count === c ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, count: c }))}>
                  {c}
                </button>
              ))}
              <input
                type="number"
                min={1}
                max={500}
                value={s.count}
                aria-label="Custom number of questions"
                onChange={(e) => setS((p) => ({ ...p, count: Math.max(1, Math.min(500, Number(e.target.value) || 1)) }))}
                style={{ width: 90 }}
              />
            </div>
          </div>

          <div className="field">
            <span className="field-label">Show answers</span>
            <div className="row">
              {BATCHES.map((b) => (
                <button key={b.v} className={`chip ${s.batch === b.v ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, batch: b.v }))}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid cols-3" style={{ gap: 20 }}>
            <div className="field">
              <span className="field-label">Question type</span>
              <div className="row">
                {(["all", "mcq", "tfn"] as Kind[]).map((k) => (
                  <button key={k} className={`chip ${s.kind === k ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, kind: k }))}>
                    {k === "all" ? "Both" : k === "mcq" ? "MCQ" : "T / F / NEI"}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="field-label">Pool</span>
              <div className="row">
                {(["all", "unseen", "wrong"] as Pool[]).map((k) => (
                  <button key={k} className={`chip ${s.pool === k ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, pool: k }))}>
                    {k === "all" ? "All" : k === "unseen" ? "Unseen" : "Got wrong"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: 8 }}>
            <span className="muted small">
              {pool.length} matching question{pool.length === 1 ? "" : "s"}
              {pool.length < s.count && pool.length > 0 ? ` — the set will have ${pool.length}` : ""}
            </span>
            <span className="spacer" />
            <button className="btn primary" disabled={n === 0} onClick={startQuiz}>
              Start {n} question{n === 1 ? "" : "s"} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const results = qs.map((q, i) => ({ q, i, ok: picks[i] === q.answer }));
    const score = results.filter((r) => r.ok).length;
    const wrong = results.filter((r) => !r.ok);
    const perTopic = TOPICS.map((t) => {
      const rs = results.filter((r) => r.q.topic === t.id);
      return { t, n: rs.length, ok: rs.filter((r) => r.ok).length };
    }).filter((x) => x.n);
    return (
      <div className="page narrow stack">
        <div>
          <h1>
            Score: {score} / {qs.length} ({Math.round((100 * score) / qs.length)}%)
          </h1>
          <p className="lead">Time: {fmtTime(elapsed)}</p>
        </div>
        <div className="card">
          <h3>By topic</h3>
          {perTopic.map(({ t, n, ok }) => (
            <div key={t.id} style={{ marginBottom: 10 }}>
              <div className="row small">
                <span className="dot" style={{ background: t.color }} />
                {t.name}
                <span className="spacer" />
                {ok}/{n}
              </div>
              <div className="bar">
                <div style={{ width: `${(100 * ok) / n}%`, background: t.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {wrong.length > 0 && (
            <button className="btn primary" onClick={() => begin(shuffle(wrong.map((r) => r.q)))}>
              Retry the {wrong.length} I got wrong
            </button>
          )}
          <button className="btn" onClick={() => setPhase("setup")}>
            New set
          </button>
        </div>
        {wrong.length > 0 && <h2>Review mistakes</h2>}
        {wrong.map((r) => (
          <QuestionCard key={r.i} q={r.q} num={r.i + 1} picked={picks[r.i]} onPick={() => {}} revealed />
        ))}
      </div>
    );
  }

  const end = Math.min(start + size, qs.length);
  const last = end >= qs.length;
  const batchScore = current.filter((q, i) => picks[start + i] === q.answer).length;
  return (
    <div className="page narrow stack">
      <div className="row">
        <div>
          <h2 style={{ margin: 0 }}>
            {current.length === 1 ? `Question ${start + 1}` : `Questions ${start + 1}–${end}`} of {qs.length}
          </h2>
          <span className="small muted">
            {fmtTime(elapsed)} · {revealed ? `${batchScore}/${current.length} correct in this set` : `${answeredInBatch}/${current.length} answered`}
          </span>
        </div>
        <span className="spacer" />
        <button className="btn" onClick={() => setPhase("setup")}>
          Quit
        </button>
      </div>
      <div className="bar">
        <div style={{ width: `${(100 * (revealed ? end : start)) / qs.length}%`, background: "var(--accent)" }} />
      </div>
      {current.map((q, i) => (
        <QuestionCard
          key={`${start}-${q.id}`}
          q={q}
          num={start + i + 1}
          picked={picks[start + i]}
          onPick={(o) => setPicks((p) => ({ ...p, [start + i]: o }))}
          revealed={revealed}
        />
      ))}
      <div className="row">
        <span className="spacer" />
        {!revealed ? (
          <button className="btn primary" onClick={check}>
            {answeredInBatch < current.length ? `Check answers (${current.length - answeredInBatch} unanswered)` : "Check answers"}
          </button>
        ) : (
          <button className="btn primary" onClick={next}>
            {last ? "See results" : `Next ${Math.min(size, qs.length - end)} →`}
          </button>
        )}
      </div>
    </div>
  );
}

function fmtTime(ms: number) {
  const sec = Math.floor(ms / 1000);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

