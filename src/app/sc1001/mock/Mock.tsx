"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CodingWorkspace } from "@/components/sc1001/CodingWorkspace";
import { ScQuestionCard } from "@/components/sc1001/ScQuestionCard";
import { getProblems, getScBank } from "@/lib/sc1001/bank";
import { answered, isCorrect, scoreOf, type OpenMark, type Response } from "@/lib/sc1001/grading";
import { recordScAnswers } from "@/lib/sc1001/store";
import { SC_TOPICS } from "@/lib/sc1001/topics";
import type { CodingProblem, ScQuestion, ScTopicId } from "@/lib/sc1001/types";
import { fmtTime, shuffle } from "@/lib/sc1001/util";

// A mock test lives in localStorage so a refresh (or closing the tab) doesn't lose it.

interface Attempt {
  questionIds: string[];
  problemSlugs: string[];
  durationMs: number;
  startedAt: number;
  finishedAt?: number;
  responses: Record<string, Response>;
  marks: Record<string, OpenMark>;
  flags: string[];
  code: Record<string, string>;
  coding: Record<string, { passed: number; total: number }>;
}

const KEY = "sc1001-mock-v1";
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

export function Mock() {
  const attempt = useAttempt();
  if (!attempt) return <Builder />;
  if (!attempt.finishedAt) return <Runner a={attempt} />;
  return <Results a={attempt} />;
}

// ---------------------------------------------------------------- builder

interface Config {
  minutes: number;
  nQuestions: number;
  nOpen: number;
  nEasy: number;
  nMedium: number;
  topics: ScTopicId[];
}

const PRESETS: { name: string; blurb: string; c: Omit<Config, "topics"> }[] = [
  { name: "Final quiz (90 min)", blurb: "15 MCQ/short · 2 open-ended · 3 coding (1 easy, 2 medium)", c: { minutes: 90, nQuestions: 15, nOpen: 2, nEasy: 1, nMedium: 2 } },
  { name: "Coding only (60 min)", blurb: "4 coding problems (2 easy, 2 medium)", c: { minutes: 60, nQuestions: 0, nOpen: 0, nEasy: 2, nMedium: 2 } },
  { name: "Quick quiz (20 min)", blurb: "15 MCQ/short-answer questions", c: { minutes: 20, nQuestions: 15, nOpen: 0, nEasy: 0, nMedium: 0 } },
];

function pickSpread(pool: ScQuestion[], n: number): ScQuestion[] {
  const byTopic = SC_TOPICS.map((t) => shuffle(pool.filter((q) => q.topic === t.id))).filter((x) => x.length);
  const out: ScQuestion[] = [];
  for (let i = 0; out.length < Math.min(n, pool.length); i++) for (const arr of shuffle(byTopic)) if (arr[i] && out.length < n) out.push(arr[i]);
  return out;
}

function start(questionIds: string[], problemSlugs: string[], minutes: number) {
  writeAttempt({ questionIds, problemSlugs, durationMs: minutes * 60_000, startedAt: Date.now(), responses: {}, marks: {}, flags: [], code: {}, coding: {} });
}

function Builder() {
  const bank = useMemo(() => getScBank(), []);
  const problems = getProblems();
  const [mode, setMode] = useState<"preset" | "pick">("preset");
  const [c, setC] = useState<Config>({ ...PRESETS[0].c, topics: [] });
  const [picked, setPicked] = useState<string[]>([]);
  const [pickedProblems, setPickedProblems] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const startGenerated = () => {
    const inTopics = (q: ScQuestion) => !c.topics.length || c.topics.includes(q.topic);
    const closed = pickSpread(bank.filter((q) => q.kind !== "open" && inTopics(q)), c.nQuestions);
    const open = pickSpread(bank.filter((q) => q.kind === "open" && inTopics(q)), c.nOpen);
    const probIn = (p: CodingProblem) => !c.topics.length || p.topics.some((t) => c.topics.includes(t));
    const pickP = (d: string, n: number) => {
      const pref = shuffle(problems.filter((p) => p.difficulty === d && probIn(p)));
      const rest = shuffle(problems.filter((p) => p.difficulty === d && !probIn(p)));
      return [...pref, ...rest].slice(0, n);
    };
    start([...shuffle(closed), ...open].map((q) => q.id), [...pickP("easy", c.nEasy), ...pickP("medium", c.nMedium)].map((p) => p.slug), c.minutes);
  };

  const num = (k: keyof Omit<Config, "topics">, label: string, max: number) => (
    <label className="field" style={{ marginBottom: 0 }}>
      <span className="field-label small">{label}</span>
      <input type="number" min={0} max={max} value={c[k]} onChange={(e) => setC((p) => ({ ...p, [k]: Math.max(0, Math.min(max, Number(e.target.value) || 0)) }))} style={{ width: 100 }} />
    </label>
  );

  const s = search.toLowerCase();
  const matchQ = bank.filter((q) => !s || q.id.toLowerCase().includes(s) || q.prompt.toLowerCase().includes(s) || q.subtopic.toLowerCase().includes(s) || q.topic.includes(s));
  const matchP = problems.filter((p) => !s || p.title.toLowerCase().includes(s) || p.slug.includes(s));

  return (
    <div className="page narrow">
      <h1>Mock test</h1>
      <p className="lead">
        Timed like the real HackerEarth quiz: questions and coding problems in one test, a countdown, a question navigator, and marks only at the end. Coding problems score 1 mark per hidden test case passed (your best submission counts).
      </p>
      <div className="row" style={{ marginBottom: 16 }}>
        <button className={`chip ${mode === "preset" ? "on" : ""}`} onClick={() => setMode("preset")}>
          Generate a test
        </button>
        <button className={`chip ${mode === "pick" ? "on" : ""}`} onClick={() => setMode("pick")}>
          Pick specific questions
        </button>
      </div>

      {mode === "preset" ? (
        <div className="card">
          <div className="field">
            <span className="field-label">Preset</span>
            <div className="grid cols-3">
              {PRESETS.map((p) => (
                <button key={p.name} className={`chip ${c.minutes === p.c.minutes && c.nQuestions === p.c.nQuestions && c.nEasy === p.c.nEasy ? "on" : ""}`} style={{ borderRadius: 10, textAlign: "left" }} onClick={() => setC((x) => ({ ...p.c, topics: x.topics }))}>
                  <strong>{p.name}</strong>
                  <div className="small muted">{p.blurb}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="row" style={{ alignItems: "flex-end", marginBottom: 18 }}>
            {num("minutes", "Minutes", 300)}
            {num("nQuestions", "MCQ / short", 100)}
            {num("nOpen", "Open-ended", 20)}
            {num("nEasy", "Easy coding", 10)}
            {num("nMedium", "Medium coding", 10)}
          </div>
          <div className="field">
            <span className="field-label">Topics (optional)</span>
            <div className="row">
              <button className={`chip ${c.topics.length === 0 ? "on" : ""}`} onClick={() => setC((p) => ({ ...p, topics: [] }))}>
                All topics
              </button>
              {SC_TOPICS.map((t) => (
                <button
                  key={t.id}
                  className={`chip ${c.topics.includes(t.id) ? "on" : ""}`}
                  onClick={() => setC((p) => ({ ...p, topics: p.topics.includes(t.id) ? p.topics.filter((x) => x !== t.id) : [...p.topics, t.id] }))}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <span className="spacer" />
            <button className="btn primary" disabled={c.nQuestions + c.nOpen + c.nEasy + c.nMedium === 0 || c.minutes === 0} onClick={startGenerated}>
              Start test →
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="row" style={{ marginBottom: 12 }}>
            <input type="search" placeholder="Search by id, topic, subtopic or text…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 360 }} />
            <span className="spacer" />
            {num("minutes", "Minutes", 300)}
          </div>
          <h3>Coding problems ({pickedProblems.length} picked)</h3>
          <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 16 }}>
            {matchP.map((p) => (
              <label key={p.slug} className="row small" style={{ padding: "3px 0", flexWrap: "nowrap" }}>
                <input type="checkbox" checked={pickedProblems.includes(p.slug)} onChange={() => setPickedProblems((x) => (x.includes(p.slug) ? x.filter((y) => y !== p.slug) : [...x, p.slug]))} />
                <span className={`badge diff-${p.difficulty}`}>{p.difficulty}</span>
                {p.title}
              </label>
            ))}
          </div>
          <h3>Questions ({picked.length} picked)</h3>
          <div style={{ maxHeight: 420, overflowY: "auto", marginBottom: 16 }}>
            {matchQ.slice(0, 300).map((q) => (
              <label key={q.id} className="row small" style={{ padding: "3px 0", flexWrap: "nowrap", alignItems: "flex-start" }}>
                <input type="checkbox" checked={picked.includes(q.id)} onChange={() => setPicked((x) => (x.includes(q.id) ? x.filter((y) => y !== q.id) : [...x, q.id]))} />
                <span className="badge" style={{ flex: "none" }}>
                  {q.id}
                </span>
                <span className="muted" style={{ flex: "none" }}>
                  {q.kind}
                </span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.prompt}</span>
              </label>
            ))}
            {matchQ.length > 300 && <p className="small muted">Showing the first 300 matches — search to narrow down.</p>}
          </div>
          <div className="row">
            <button
              className="btn"
              onClick={() => {
                setPicked([]);
                setPickedProblems([]);
              }}
            >
              Clear
            </button>
            <span className="spacer" />
            <button className="btn primary" disabled={picked.length + pickedProblems.length === 0 || c.minutes === 0} onClick={() => start(picked, pickedProblems, c.minutes)}>
              Start test with {picked.length + pickedProblems.length} item{picked.length + pickedProblems.length === 1 ? "" : "s"} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- runner

function useItems(a: Attempt) {
  return useMemo(() => {
    const bank = getScBank();
    const questions = a.questionIds.map((id) => bank.find((q) => q.id === id)).filter((q): q is ScQuestion => !!q);
    const problems = a.problemSlugs.map((s) => getProblems().find((p) => p.slug === s)).filter((p): p is CodingProblem => !!p);
    return { questions, problems };
  }, [a.questionIds, a.problemSlugs]);
}

/** Ends the attempt and records MCQ / short-answer results (open answers are recorded when marked). */
function finish(questions: ScQuestion[]) {
  const a = readAttempt();
  if (!a || a.finishedAt) return;
  recordScAnswers(questions.filter((q) => q.kind !== "open").map((q) => ({ id: q.id, correct: isCorrect(q, a.responses[q.id]) })));
  writeAttempt({ ...a, finishedAt: Date.now() });
}

function Runner({ a }: { a: Attempt }) {
  const { questions, problems } = useItems(a);
  const [cur, setCur] = useState<{ kind: "q" | "p"; i: number }>(questions.length ? { kind: "q", i: 0 } : { kind: "p", i: 0 });
  const [now, setNow] = useState(() => Date.now());
  const left = a.startedAt + a.durationMs - now;

  useEffect(() => {
    const h = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(h);
  }, []);
  useEffect(() => {
    if (left <= 0) finish(questions);
  }, [left, questions]);

  const q = cur.kind === "q" ? questions[cur.i] : undefined;
  const p = cur.kind === "p" ? problems[cur.i] : undefined;
  const nAnswered = questions.filter((x) => answered(a.responses[x.id])).length;
  const go = (d: number) => {
    const flat = [...questions.map((_, i) => ({ kind: "q" as const, i })), ...problems.map((_, i) => ({ kind: "p" as const, i }))];
    const idx = flat.findIndex((x) => x.kind === cur.kind && x.i === cur.i);
    const n = flat[idx + d];
    if (n) setCur(n);
  };

  return (
    <>
      <div className="mock-top">
        <strong>SC1001 mock test</strong>
        <span className="small muted">
          {nAnswered}/{questions.length} questions answered · {problems.filter((x) => a.coding[x.slug]).length}/{problems.length} problems submitted
        </span>
        <span className="spacer" />
        <span className={`mock-timer ${left < 5 * 60_000 ? "low" : ""}`}>⏱ {fmtTime(left)}</span>
        <button
          className="btn primary sm"
          onClick={() => {
            if (confirm("Finish the test and see your marks?")) finish(questions);
          }}
        >
          Finish test
        </button>
      </div>
      <div className="mock">
        <nav className="mock-nav">
          {questions.length > 0 && (
            <>
              <h4>Questions</h4>
              <div className="mock-grid">
                {questions.map((x, i) => (
                  <button
                    key={x.id}
                    className={`mock-cell ${answered(a.responses[x.id]) ? "answered" : ""} ${a.flags.includes(x.id) ? "flag" : ""} ${cur.kind === "q" && cur.i === i ? "current" : ""}`}
                    onClick={() => setCur({ kind: "q", i })}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
          {problems.length > 0 && (
            <>
              <h4>Programming</h4>
              {problems.map((x, i) => (
                <button key={x.slug} className={`mock-prob ${cur.kind === "p" && cur.i === i ? "current" : ""}`} onClick={() => setCur({ kind: "p", i })}>
                  <div>{x.title}</div>
                  <div className="small muted">
                    {a.coding[x.slug] ? `Best: ${a.coding[x.slug].passed}/${a.coding[x.slug].total}` : `Not submitted · ${x.tests.length} marks`}
                  </div>
                </button>
              ))}
            </>
          )}
          <p className="small muted" style={{ marginTop: 16 }}>
            Green = answered, orange dot = marked for review.
          </p>
        </nav>
        <main className="mock-main">
          {q && (
            <div className="page narrow stack" style={{ paddingTop: 20 }}>
              <ScQuestionCard
                key={q.id}
                q={q}
                num={cur.i + 1}
                response={a.responses[q.id]}
                onResponse={(r) => update((x) => ({ ...x, responses: { ...x.responses, [q.id]: r } }))}
                revealed={false}
                showMeta={false}
              />
              <div className="row">
                <button className="btn" disabled={cur.kind === "q" && cur.i === 0} onClick={() => go(-1)}>
                  ← Previous
                </button>
                <button className="btn" onClick={() => update((x) => ({ ...x, flags: x.flags.includes(q.id) ? x.flags.filter((f) => f !== q.id) : [...x.flags, q.id] }))}>
                  {a.flags.includes(q.id) ? "Unmark review" : "Mark for review"}
                </button>
                {answered(a.responses[q.id]) && (
                  <button className="btn" onClick={() => update((x) => ({ ...x, responses: { ...x.responses, [q.id]: undefined } }))}>
                    Clear answer
                  </button>
                )}
                <span className="spacer" />
                <button className="btn primary" onClick={() => go(1)}>
                  Save &amp; next →
                </button>
              </div>
            </div>
          )}
          {p && (
            <CodingWorkspace
              key={p.slug}
              problem={p}
              mode="mock"
              code={a.code[p.slug] ?? p.starter}
              onCodeChange={(v) => update((x) => ({ ...x, code: { ...x.code, [p.slug]: v } }))}
              onSubmitted={(passed, total) =>
                update((x) => ({ ...x, coding: { ...x.coding, [p.slug]: { passed: Math.max(passed, x.coding[p.slug]?.passed ?? 0), total } } }))
              }
            />
          )}
        </main>
      </div>
    </>
  );
}

// ---------------------------------------------------------------- results

function Results({ a }: { a: Attempt }) {
  const { questions, problems } = useItems(a);
  const qScores = questions.map((q) => scoreOf(q, a.responses[q.id], a.marks[q.id]));
  const qGot = qScores.reduce((s, x) => s + x.got, 0);
  const qMax = qScores.reduce((s, x) => s + x.max, 0);
  const cGot = problems.reduce((s, p) => s + (a.coding[p.slug]?.passed ?? 0), 0);
  const cMax = problems.reduce((s, p) => s + p.tests.length, 0);
  const total = qGot + cGot;
  const max = qMax + cMax;
  const unmarked = questions.filter((q) => q.kind === "open" && !a.marks[q.id]).length;
  const used = Math.min(a.durationMs, a.finishedAt! - a.startedAt);
  const perTopic = SC_TOPICS.map((t) => {
    const idx = questions.map((q, i) => (q.topic === t.id ? i : -1)).filter((i) => i >= 0);
    return { t, got: idx.reduce((s, i) => s + qScores[i].got, 0), max: idx.reduce((s, i) => s + qScores[i].max, 0) };
  }).filter((x) => x.max);

  return (
    <div className="page narrow stack">
      <div>
        <h1>
          Mock test: {total} / {max} ({Math.round((100 * total) / Math.max(1, max))}%)
        </h1>
        <p className="lead">
          Time used {fmtTime(used)} of {fmtTime(a.durationMs)}
          {unmarked ? ` · ${unmarked} open-ended answer${unmarked > 1 ? "s" : ""} still to mark (counted as 0)` : ""}
        </p>
      </div>
      <div className="grid cols-3">
        <div className="card">
          <h3>Questions</h3>
          <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
            {qGot} / {qMax}
          </div>
        </div>
        <div className="card">
          <h3>Programming</h3>
          <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
            {cGot} / {cMax}
          </div>
        </div>
      </div>
      {problems.length > 0 && (
        <div className="card">
          <h3>Programming</h3>
          <table className="tc-table">
            <tbody>
              {problems.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <Link href={`/sc1001/code/${p.slug}`}>{p.title}</Link>
                  </td>
                  <td>
                    <span className={`badge diff-${p.difficulty}`}>{p.difficulty}</span>
                  </td>
                  <td>{a.coding[p.slug] ? `${a.coding[p.slug].passed} / ${p.tests.length}` : `not submitted (0 / ${p.tests.length})`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small muted" style={{ marginBottom: 0 }}>
            Open a problem to keep working on it, see the failing case, the reference solution or an AI review.
          </p>
        </div>
      )}
      {perTopic.length > 0 && (
        <div className="card">
          <h3>Questions by topic</h3>
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
      )}
      <div className="row">
        <button
          className="btn primary"
          onClick={() => {
            if (unmarked === 0 || confirm("Some open-ended answers are not marked yet. Start a new test anyway?")) writeAttempt(null);
          }}
        >
          New mock test
        </button>
      </div>
      {questions.length > 0 && <h2>Review</h2>}
      {questions.map((q, i) => (
        <ScQuestionCard
          key={q.id}
          q={q}
          num={i + 1}
          response={a.responses[q.id]}
          onResponse={() => {}}
          revealed
          mark={a.marks[q.id]}
          onMark={(m) => {
            update((x) => ({ ...x, marks: { ...x.marks, [q.id]: m } }));
            recordScAnswers([{ id: q.id, correct: isCorrect(q, a.responses[q.id], m) }]);
          }}
        />
      ))}
    </div>
  );
}
