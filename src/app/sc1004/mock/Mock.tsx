"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { getBank } from "@/lib/bank";
import { recordAnswers } from "@/lib/progress";
import { HALVES, TOPICS } from "@/lib/topics";
import type { Question } from "@/lib/types";

// A mock final in the format of the real paper: 20 five-option MCQs, 5 marks each, 2 hours.
// The attempt lives in localStorage so a refresh (or closing the tab) doesn't lose it.

interface Attempt {
  ids: string[];
  durationMs: number;
  startedAt: number;
  finishedAt?: number;
  picks: Record<string, number>;
  flags: string[];
}

type Scope = "both" | 1 | 2;

const KEY = "la-mock-v1";
const listeners = new Set<() => void>();
let snap: Attempt | null | undefined;

function readAttempt(): Attempt | null {
  if (snap !== undefined) return snap;
  try {
    snap = JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    snap = null;
  }
  return snap!;
}
function writeAttempt(a: Attempt | null) {
  snap = a;
  try {
    if (a) localStorage.setItem(KEY, JSON.stringify(a));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable: keep in memory */
  }
  listeners.forEach((l) => l());
}
const update = (f: (a: Attempt) => Attempt) => {
  const a = readAttempt();
  if (a) writeAttempt(f(a));
};
function useAttempt() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    readAttempt,
    () => null,
  );
}

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTime(ms: number) {
  const sec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

/**
 * n questions spread as evenly as possible over the given topics (in syllabus order, like the paper),
 * optionally taking past-paper-style questions first (topping up from the rest of the topic when they run out).
 */
function pickSpread(bank: Question[], topicIds: string[], n: number, examFirst: boolean): Question[] {
  const pools = topicIds.map((t) => {
    const qs = bank.filter((q) => q.topic === t);
    if (!examFirst) return shuffle(qs);
    return [...shuffle(qs.filter((q) => q.source === "exam")), ...shuffle(qs.filter((q) => q.source !== "exam"))];
  });
  const order = shuffle(topicIds.map((_, i) => i));
  const taken: Question[][] = topicIds.map(() => []);
  let total = 0;
  for (let round = 0; total < n; round++) {
    let progressed = false;
    for (const i of order) {
      if (total >= n) break;
      const q = pools[i][round];
      if (q) {
        taken[i].push(q);
        total++;
        progressed = true;
      }
    }
    if (!progressed) break;
  }
  return taken.flat();
}

export function Mock() {
  const attempt = useAttempt();
  if (!attempt) return <Builder />;
  if (!attempt.finishedAt) return <Runner a={attempt} />;
  return <Results a={attempt} />;
}

// ---------------------------------------------------------------- builder

function Builder() {
  const bank = useMemo(() => getBank(), []);
  const [scope, setScope] = useState<Scope>("both");
  const [examFirst, setExamFirst] = useState(true);
  const [minutes, setMinutes] = useState(120);
  const exam = bank.filter((q) => q.source === "exam").length;

  const start = () => {
    const ids = (h: 1 | 2) => TOPICS.filter((t) => t.half === h).map((t) => t.id);
    const qs =
      scope === "both"
        ? [...pickSpread(bank, ids(1), 10, examFirst), ...pickSpread(bank, ids(2), 10, examFirst)]
        : pickSpread(bank, ids(scope), 20, examFirst);
    writeAttempt({ ids: qs.map((q) => q.id), durationMs: minutes * 60_000, startedAt: Date.now(), picks: {}, flags: [] });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page narrow">
      <h1>Mock final</h1>
      <p className="lead">
        Same format as the SC1004 final: 20 five-option MCQs, 5 marks each, 2 hours. Questions run in syllabus order, roughly half from each half of the
        semester. You only see answers when you submit.
      </p>
      <div className="card">
        <div className="field">
          <span className="field-label">Topics</span>
          <div className="row">
            <button className={`chip ${scope === "both" ? "on" : ""}`} onClick={() => setScope("both")}>
              Whole course (10 + 10)
            </button>
            {HALVES.map((h) => (
              <button key={h.half} className={`chip ${scope === h.half ? "on" : ""}`} onClick={() => setScope(h.half)}>
                {h.name} only <span className="muted small">({h.note})</span>
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="field-label">Questions</span>
          <div className="row">
            <button className={`chip ${examFirst ? "on" : ""}`} onClick={() => setExamFirst(true)}>
              Past-paper style first ({exam} available)
            </button>
            <button className={`chip ${!examFirst ? "on" : ""}`} onClick={() => setExamFirst(false)}>
              Anything from the bank
            </button>
          </div>
        </div>
        <div className="field">
          <span className="field-label">Time limit</span>
          <div className="row">
            {[60, 90, 120, 0].map((m) => (
              <button key={m} className={`chip ${minutes === m ? "on" : ""}`} onClick={() => setMinutes(m)}>
                {m ? `${m} min${m === 120 ? " (real)" : ""}` : "Untimed"}
              </button>
            ))}
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <span className="spacer" />
          <button className="btn primary" onClick={start}>
            Start mock →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- runner

function useQuestions(a: Attempt): Question[] {
  return useMemo(() => {
    const byId = new Map(getBank().map((q) => [q.id, q]));
    return a.ids.map((id) => byId.get(id)).filter((q): q is Question => !!q);
  }, [a.ids]);
}

function finish(questions: Question[]) {
  const a = readAttempt();
  if (!a || a.finishedAt) return;
  recordAnswers(questions.map((q) => ({ id: q.id, correct: a.picks[q.id] === q.answer })));
  writeAttempt({ ...a, finishedAt: Date.now() });
  window.scrollTo({ top: 0 });
}

function Runner({ a }: { a: Attempt }) {
  const questions = useQuestions(a);
  const [i, setI] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const left = a.durationMs ? a.startedAt + a.durationMs - now : Infinity;

  useEffect(() => {
    const h = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(h);
  }, []);
  useEffect(() => {
    if (left <= 0) finish(questions);
  }, [left, questions]);

  const q = questions[i];
  if (!q) return null;
  const answered = questions.filter((x) => a.picks[x.id] !== undefined).length;
  const flagged = a.flags.includes(q.id);
  const go = (n: number) => {
    setI(Math.max(0, Math.min(questions.length - 1, n)));
    window.scrollTo({ top: 0 });
  };
  const submit = () => {
    const blank = questions.length - answered;
    if (confirm(blank ? `Submit with ${blank} unanswered question${blank === 1 ? "" : "s"}?` : "Submit the mock?")) finish(questions);
  };

  return (
    <div className="page narrow stack">
      <div className="row">
        <div>
          <h2 style={{ margin: 0 }}>
            Question {i + 1} of {questions.length}
          </h2>
          <span className="small muted">
            {answered}/{questions.length} answered · {a.durationMs ? `${fmtTime(left)} left` : `${fmtTime(now - a.startedAt)} elapsed`}
          </span>
        </div>
        <span className="spacer" />
        <button className="btn" onClick={() => confirm("Abandon this mock? Your answers will be lost.") && writeAttempt(null)}>
          Abandon
        </button>
        <button className="btn primary" onClick={submit}>
          Submit
        </button>
      </div>
      <div className="row" style={{ gap: 6 }}>
        {questions.map((x, k) => {
          const done = a.picks[x.id] !== undefined;
          const flag = a.flags.includes(x.id);
          return (
            <button
              key={x.id}
              className={`chip ${k === i ? "on" : ""}`}
              style={{ minWidth: 40, justifyContent: "center", ...(done && k !== i ? { background: "var(--accent-soft)" } : {}), ...(flag ? { borderColor: "var(--warn)" } : {}) }}
              onClick={() => go(k)}
              title={`${done ? "Answered" : "Unanswered"}${flag ? " · flagged" : ""}`}
            >
              {k + 1}
              {flag ? " ⚑" : ""}
            </button>
          );
        })}
      </div>
      <QuestionCard
        key={q.id}
        q={q}
        num={i + 1}
        picked={a.picks[q.id]}
        onPick={(o) => update((x) => ({ ...x, picks: { ...x.picks, [q.id]: o } }))}
        revealed={false}
      />
      <div className="row">
        <button className="btn" disabled={i === 0} onClick={() => go(i - 1)}>
          ← Previous
        </button>
        <button className="btn" onClick={() => update((x) => ({ ...x, flags: flagged ? x.flags.filter((f) => f !== q.id) : [...x.flags, q.id] }))}>
          {flagged ? "Unflag" : "⚑ Flag for review"}
        </button>
        <span className="spacer" />
        {i < questions.length - 1 ? (
          <button className="btn primary" onClick={() => go(i + 1)}>
            Next →
          </button>
        ) : (
          <button className="btn primary" onClick={submit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- results

function Results({ a }: { a: Attempt }) {
  const questions = useQuestions(a);
  const results = questions.map((q, i) => ({ q, i, ok: a.picks[q.id] === q.answer }));
  const score = results.filter((r) => r.ok).length;
  const perTopic = TOPICS.map((t) => {
    const rs = results.filter((r) => r.q.topic === t.id);
    return { t, n: rs.length, ok: rs.filter((r) => r.ok).length };
  }).filter((x) => x.n);
  const [onlyWrong, setOnlyWrong] = useState(true);
  const shown = onlyWrong ? results.filter((r) => !r.ok) : results;

  return (
    <div className="page narrow stack">
      <div>
        <h1>
          {score * 5} / {questions.length * 5} marks
        </h1>
        <p className="lead">
          {score} of {questions.length} correct ({Math.round((100 * score) / Math.max(1, questions.length))}%) · time used {fmtTime((a.finishedAt ?? 0) - a.startedAt)}
        </p>
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
              <Link href={`/sc1004/learn/${t.id}`} style={{ marginLeft: 10 }}>
                Revise
              </Link>
            </div>
            <div className="bar">
              <div style={{ width: `${(100 * ok) / n}%`, background: t.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <button className="btn primary" onClick={() => writeAttempt(null)}>
          New mock
        </button>
        <span className="spacer" />
        <button className={`chip ${onlyWrong ? "on" : ""}`} onClick={() => setOnlyWrong(true)}>
          Mistakes only
        </button>
        <button className={`chip ${!onlyWrong ? "on" : ""}`} onClick={() => setOnlyWrong(false)}>
          All questions
        </button>
      </div>
      {shown.length === 0 && <p className="muted">No mistakes — full marks.</p>}
      {shown.map((r) => (
        <QuestionCard key={r.q.id} q={r.q} num={r.i + 1} picked={a.picks[r.q.id]} onPick={() => {}} revealed />
      ))}
    </div>
  );
}
