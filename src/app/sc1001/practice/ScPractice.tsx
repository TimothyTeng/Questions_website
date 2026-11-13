"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ScQuestionCard } from "@/components/sc1001/ScQuestionCard";
import { getScBank } from "@/lib/sc1001/bank";
import { answered, isCorrect, scoreOf, type OpenMark, type Response } from "@/lib/sc1001/grading";
import { recordScAnswers, useScProgress } from "@/lib/sc1001/store";
import { SC_TOPICS } from "@/lib/sc1001/topics";
import type { Difficulty, ScKind, ScQuestion, ScTopicId } from "@/lib/sc1001/types";
import { fmtTime, shuffle } from "@/lib/sc1001/util";

type Pool = "all" | "unseen" | "wrong";

interface Settings {
  topics: ScTopicId[];
  kinds: ScKind[];
  difficulty: Difficulty | "all";
  pool: Pool;
  count: number;
  /** Reveal answers after this many questions; 0 = only at the end. */
  batch: number;
}

const ALL_KINDS: ScKind[] = ["mcq", "short", "open"];
const DEFAULTS: Settings = { topics: [], kinds: ["mcq", "short"], difficulty: "all", pool: "all", count: 10, batch: 1 };
const COUNTS = [5, 10, 20, 30, 50];
const BATCHES = [
  { v: 1, label: "After each question" },
  { v: 5, label: "Every 5" },
  { v: 10, label: "Every 10" },
  { v: 0, label: "At the end (exam style)" },
];
const KIND_LABEL: Record<ScKind, string> = { mcq: "MCQ", short: "Short answer", open: "Open-ended" };

/** Reads ?topic=… so the hub can deep-link a topic. */
export function ScPracticeEntry() {
  const topic = useSearchParams().get("topic");
  const initial = SC_TOPICS.find((t) => t.id === topic)?.id;
  return <ScPractice key={initial ?? "all"} initialTopic={initial} />;
}

function ScPractice({ initialTopic }: { initialTopic?: ScTopicId }) {
  const bank = useMemo(() => getScBank(), []);
  const progress = useScProgress();
  const [s, setS] = useState<Settings>(initialTopic ? { ...DEFAULTS, topics: [initialTopic] } : DEFAULTS);
  const [phase, setPhase] = useState<"setup" | "quiz" | "done">("setup");
  const [qs, setQs] = useState<ScQuestion[]>([]);
  const [resp, setResp] = useState<Record<number, Response>>({});
  const [marks, setMarks] = useState<Record<number, OpenMark>>({});
  const [start, setStart] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [t0, setT0] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (phase !== "quiz") return;
    const h = setInterval(() => setElapsed(Date.now() - t0), 1000);
    return () => clearInterval(h);
  }, [phase, t0]);

  const pool = useMemo(
    () =>
      bank.filter((q) => {
        if (s.topics.length && !s.topics.includes(q.topic)) return false;
        if (!s.kinds.includes(q.kind)) return false;
        if (s.difficulty !== "all" && q.difficulty !== s.difficulty) return false;
        const st = progress[q.id];
        if (s.pool === "unseen" && st) return false;
        if (s.pool === "wrong" && (!st || st.last)) return false;
        return true;
      }),
    [bank, s, progress],
  );

  const begin = (list: ScQuestion[]) => {
    setQs(list);
    setResp({});
    setMarks({});
    setStart(0);
    setRevealed(false);
    setT0(Date.now());
    setElapsed(0);
    setPhase("quiz");
    window.scrollTo({ top: 0 });
  };

  const startQuiz = () => {
    // Spread questions evenly over the chosen topics before shuffling.
    const topics = s.topics.length ? s.topics : SC_TOPICS.map((t) => t.id);
    const byTopic = topics.map((t) => shuffle(pool.filter((q) => q.topic === t)));
    const list: ScQuestion[] = [];
    for (let i = 0; list.length < Math.min(s.count, pool.length); i++) for (const arr of shuffle(byTopic)) if (arr[i] && list.length < s.count) list.push(arr[i]);
    begin(shuffle(list));
  };

  const size = s.batch === 0 ? qs.length : s.batch;
  const current = qs.slice(start, start + size);
  const answeredInBatch = current.filter((_, i) => answered(resp[start + i])).length;

  const check = () => {
    recordScAnswers(current.flatMap((q, i) => (q.kind === "open" ? [] : [{ id: q.id, correct: isCorrect(q, resp[start + i]) }])));
    setRevealed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = () => {
    if (start + size >= qs.length) setPhase("done");
    else {
      setStart(start + size);
      setRevealed(false);
    }
    window.scrollTo({ top: 0 });
  };
  const setMark = (i: number, m: OpenMark) => {
    setMarks((p) => ({ ...p, [i]: m }));
    recordScAnswers([{ id: qs[i].id, correct: isCorrect(qs[i], resp[i], m) }]);
  };

  const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);

  if (phase === "setup") {
    const n = Math.min(s.count, pool.length);
    return (
      <div className="page narrow">
        <h1>SC1001 practice</h1>
        <p className="lead">{bank.length} questions from all 12 weeks: MCQ, short answer (type the exact output) and open-ended (marked by AI or by you against a rubric).</p>
        <div className="card">
          <div className="field">
            <span className="field-label">Topics</span>
            <div className="row">
              <button className={`chip ${s.topics.length === 0 ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, topics: [] }))}>
                🎲 All topics
              </button>
              {SC_TOPICS.map((t) => (
                <button key={t.id} className={`chip ${s.topics.includes(t.id) ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, topics: toggle(p.topics, t.id) }))}>
                  <span className="dot" style={{ background: t.color, marginRight: 6 }} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="field-label">Question types</span>
            <div className="row">
              {ALL_KINDS.map((k) => (
                <button key={k} className={`chip ${s.kinds.includes(k) ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, kinds: p.kinds.length === 1 && p.kinds[0] === k ? p.kinds : toggle(p.kinds, k) }))}>
                  {KIND_LABEL[k]}
                </button>
              ))}
            </div>
          </div>

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
              <span className="field-label">Difficulty</span>
              <div className="row">
                {(["all", "easy", "medium", "hard"] as const).map((d) => (
                  <button key={d} className={`chip ${s.difficulty === d ? "on" : ""}`} onClick={() => setS((p) => ({ ...p, difficulty: d }))}>
                    {d === "all" ? "Any" : d[0].toUpperCase() + d.slice(1)}
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
    const results = qs.map((q, i) => ({ q, i, ...scoreOf(q, resp[i], marks[i]), ok: isCorrect(q, resp[i], marks[i]) }));
    const got = results.reduce((a, r) => a + r.got, 0);
    const max = results.reduce((a, r) => a + r.max, 0);
    const unmarked = results.filter((r) => r.q.kind === "open" && !marks[r.i]).length;
    const wrong = results.filter((r) => !r.ok);
    const perTopic = SC_TOPICS.map((t) => {
      const rs = results.filter((r) => r.q.topic === t.id);
      return { t, max: rs.reduce((a, r) => a + r.max, 0), got: rs.reduce((a, r) => a + r.got, 0) };
    }).filter((x) => x.max);
    return (
      <div className="page narrow stack">
        <div>
          <h1>
            Score: {got} / {max} ({Math.round((100 * got) / Math.max(1, max))}%)
          </h1>
          <p className="lead">
            Time: {fmtTime(elapsed)}
            {unmarked ? ` · ${unmarked} open-ended answer${unmarked > 1 ? "s" : ""} not marked yet (counted as 0) — mark below` : ""}
          </p>
        </div>
        <div className="card">
          <h3>By topic</h3>
          {perTopic.map(({ t, got, max }) => (
            <div key={t.id} style={{ marginBottom: 10 }}>
              <div className="row small">
                <span className="dot" style={{ background: t.color }} />
                {t.name}
                <span className="spacer" />
                {got}/{max}
              </div>
              <div className="bar">
                <div style={{ width: `${(100 * got) / max}%`, background: t.color }} />
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
        {wrong.length > 0 && <h2>Review</h2>}
        {wrong.map((r) => (
          <ScQuestionCard key={r.i} q={r.q} num={r.i + 1} response={resp[r.i]} onResponse={() => {}} revealed mark={marks[r.i]} onMark={(m) => setMark(r.i, m)} />
        ))}
      </div>
    );
  }

  const end = Math.min(start + size, qs.length);
  const last = end >= qs.length;
  const batchGot = current.reduce((a, q, i) => a + scoreOf(q, resp[start + i], marks[start + i]).got, 0);
  const batchMax = current.reduce((a, q, i) => a + scoreOf(q, resp[start + i], marks[start + i]).max, 0);
  return (
    <div className="page narrow stack">
      <div className="row">
        <div>
          <h2 style={{ margin: 0 }}>
            {current.length === 1 ? `Question ${start + 1}` : `Questions ${start + 1}–${end}`} of {qs.length}
          </h2>
          <span className="small muted">
            {fmtTime(elapsed)} · {revealed ? `${batchGot}/${batchMax} marks in this set` : `${answeredInBatch}/${current.length} answered`}
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
        <ScQuestionCard
          key={`${start}-${q.id}`}
          q={q}
          num={start + i + 1}
          response={resp[start + i]}
          onResponse={(r) => setResp((p) => ({ ...p, [start + i]: r }))}
          revealed={revealed}
          mark={marks[start + i]}
          onMark={(m) => setMark(start + i, m)}
          allowHints
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
