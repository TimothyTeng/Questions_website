"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ExamCard } from "@/components/he1002/ExamCard";
import { ALL_EXAM, type TExam } from "@/data/he1002";
import { chatMarkingPrompt, copyText } from "@/lib/he1002/chatPrompt";
import { downloadExamDoc, type AnswerPlacement } from "@/lib/he1002/docExport";
import { clearAttempts, queuePosition, startQueue, useAttempts, usePref } from "@/lib/he1002/store";
import { PARTS, SECTIONS, TOPICS, topicById } from "@/lib/he1002/topics";
import type { ExamSection, TopicId } from "@/lib/he1002/types";

type Pool = "all" | "new" | "notfull";
const COUNTS = [5, 10, 20, 0];
const DEFAULT_MODEL = "gemini-flash-latest";
const DRAFTS = "he1002-drafts-v1";

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Orders questions like the paper: Q1 calc, Q2 short, Q3 T/F, Q4 diagram; lecture order inside each. */
const paperOrder = (qs: TExam[]) =>
  [...qs].sort((a, b) => SECTIONS.findIndex((s) => s.s === a.section) - SECTIONS.findIndex((s) => s.s === b.section) || ALL_EXAM.indexOf(a) - ALL_EXAM.indexOf(b));

/** A random paper in the exam format, spread across the chosen topics. */
function mockPaper(topics: TopicId[]): TExam[] {
  const out: TExam[] = [];
  for (const sec of SECTIONS) {
    const pool = shuffle(ALL_EXAM.filter((q) => q.section === sec.s && topics.includes(q.topic)));
    // Round-robin over topics so one lecture doesn't dominate.
    const byTopic = new Map<TopicId, TExam[]>();
    for (const q of pool) byTopic.set(q.topic, [...(byTopic.get(q.topic) ?? []), q]);
    const order = shuffle([...byTopic.keys()]);
    const picked: TExam[] = [];
    while (picked.length < sec.count && [...byTopic.values()].some((l) => l.length))
      for (const t of order) {
        const l = byTopic.get(t)!;
        if (l.length && picked.length < sec.count) picked.push(l.shift()!);
      }
    out.push(...picked);
  }
  return paperOrder(out);
}

const numberOf = (qs: TExam[], q: TExam) => {
  const sec = SECTIONS.find((s) => s.s === q.section)!;
  const same = qs.filter((x) => x.section === q.section);
  return same.length === 1 && sec.s === "diagram" ? `Q${sec.q}` : `Q${sec.q}.${same.indexOf(q) + 1}`;
};

export function QuestionsEntry() {
  const topic = useSearchParams().get("topic");
  const initial = TOPICS.find((t) => t.id === topic)?.id;
  return <Questions key={initial ?? "all"} initialTopic={initial} />;
}

function Questions({ initialTopic }: { initialTopic?: TopicId }) {
  const attempts = useAttempts();
  const [model, setModel] = usePref("gemini-model", DEFAULT_MODEL);
  const [savedSet, setSavedSet] = usePref("set", "");
  const [models, setModels] = useState<string[]>([]);

  const [mode, setMode] = useState<"practice" | "mock">("practice");
  const [topics, setTopics] = useState<TopicId[]>(initialTopic ? [initialTopic] : []);
  const [sections, setSections] = useState<ExamSection[]>(["calc", "short", "tf", "diagram"]);
  const [count, setCount] = useState(initialTopic ? 0 : 10);
  const [pool, setPool] = useState<Pool>("all");
  const [placement, setPlacement] = useState<AnswerPlacement>("end");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState("");

  const [phase, setPhase] = useState<"setup" | "set">("setup");
  const [qs, setQs] = useState<TExam[]>([]);
  const [setTitle, setSetTitle] = useState("");
  // Drafts only show once a set is open (never in the server-rendered setup screen), so reading storage here is safe.
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(DRAFTS) ?? "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    startQueue();
    fetch("/api/he1002/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "models" }) })
      .then((r) => (r.ok ? r.json() : { models: [] }))
      .then((b) => setModels(b.models ?? []))
      .catch(() => {});
  }, []);

  const setDraft = (id: string, s: string) =>
    setDrafts((d) => {
      const next = { ...d, [id]: s };
      if (!s) delete next[id];
      try {
        localStorage.setItem(DRAFTS, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });

  const chosenTopics = useMemo(() => (topics.length ? topics : TOPICS.map((t) => t.id)), [topics]);
  const matching = useMemo(
    () =>
      paperOrder(
        ALL_EXAM.filter((q) => {
          if (!chosenTopics.includes(q.topic) || !sections.includes(q.section)) return false;
          const a = attempts[q.id];
          if (pool === "new" && a) return false;
          if (pool === "notfull" && a?.status === "done" && (a.scores ?? []).reduce((x, y) => x + y, 0) === q.marks) return false;
          return true;
        }),
      ),
    [chosenTopics, sections, pool, attempts],
  );

  const topicLabel = () => (topics.length === 0 ? "All topics" : topics.length <= 2 ? topics.map((t) => topicById(t).name).join(" + ") : `${topics.length} topics`);

  const open = (list: TExam[], title: string) => {
    setQs(list);
    setSetTitle(title);
    setSavedSet(JSON.stringify({ ids: list.map((q) => q.id), title }));
    setPhase("set");
    window.scrollTo({ top: 0 });
  };

  const startPractice = () => {
    // Sample per section so a small set still mixes question types.
    let list: TExam[] = [];
    if (count) {
      const bySec = SECTIONS.map((s) => shuffle(matching.filter((q) => q.section === s.s))).filter((l) => l.length);
      while (list.length < count && bySec.some((l) => l.length)) for (const l of bySec) if (l.length && list.length < count) list.push(l.shift()!);
    } else list = matching;
    open(paperOrder(list), `Practice · ${topicLabel()}`);
  };

  const resume = (() => {
    try {
      const s = JSON.parse(savedSet) as { ids: string[]; title: string };
      const list = s.ids.map((id) => ALL_EXAM.find((q) => q.id === id)).filter((q): q is TExam => !!q);
      return list.length ? { list, title: s.title } : null;
    } catch {
      return null;
    }
  })();

  const download = async (list: TExam[], title: string) => {
    setBusy(true);
    try {
      await downloadExamDoc(list, placement, title);
    } finally {
      setBusy(false);
    }
  };

  const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);
  const modelPicker = (
    <select className="ai-model" value={model} onChange={(e) => setModel(e.target.value)} aria-label="Gemini model" title="Gemini model used for marking">
      {[...new Set([model, DEFAULT_MODEL, ...models])].map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );

  if (phase === "setup") {
    const total = count ? Math.min(count, matching.length) : matching.length;
    return (
      <div className="page narrow stack">
        <div>
          <h1>Exam questions</h1>
          <p className="lead">
            {ALL_EXAM.length} questions in the HE1002 exam format, each with a marking rubric and model answer. Write your answer, press <em>Submit for Gemini marking</em> and move straight on — answers
            are marked one by one in the background as you go (the queue survives a page reload, and failed requests retry). You can also self-mark against the rubric.
          </p>
        </div>

        {resume && (
          <div className="card row">
            <div>
              <strong>Continue: {resume.title}</strong>
              <div className="small muted">
                {resume.list.length} questions · {resume.list.filter((q) => attempts[q.id]?.status === "done").length} marked
              </div>
            </div>
            <span className="spacer" />
            <button className="btn primary" onClick={() => open(resume.list, resume.title)}>
              Resume →
            </button>
          </div>
        )}

        <div className="card">
          <div className="field">
            <span className="field-label">Mode</span>
            <div className="row">
              <button className={`chip ${mode === "practice" ? "on" : ""}`} onClick={() => setMode("practice")}>
                🎯 Practice by topic / section
              </button>
              <button className={`chip ${mode === "mock" ? "on" : ""}`} onClick={() => setMode("mock")}>
                📄 Mock paper (13 + 9 + 8 + 1 = 100 marks)
              </button>
            </div>
          </div>
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
          {mode === "practice" && (
            <>
              <div className="field">
                <span className="field-label">Sections</span>
                <div className="row">
                  {SECTIONS.map((s) => (
                    <button key={s.s} className={`chip ${sections.includes(s.s) ? "on" : ""}`} onClick={() => setSections((p) => (p.length === 1 && p[0] === s.s ? p : toggle(p, s.s)))}>
                      Q{s.q} {s.name} ({ALL_EXAM.filter((q) => q.section === s.s && chosenTopics.includes(q.topic)).length})
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid cols-3" style={{ gap: 20 }}>
                <div className="field">
                  <span className="field-label">How many</span>
                  <div className="row">
                    {COUNTS.map((c) => (
                      <button key={c} className={`chip ${count === c ? "on" : ""}`} onClick={() => setCount(c)}>
                        {c || "All"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <span className="field-label">Pool</span>
                  <div className="row">
                    {(
                      [
                        ["all", "All"],
                        ["new", "Not attempted"],
                        ["notfull", "Not full marks"],
                      ] as [Pool, string][]
                    ).map(([k, label]) => (
                      <button key={k} className={`chip ${pool === k ? "on" : ""}`} onClick={() => setPool(k)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="row">
            <span className="muted small">{mode === "practice" ? `${total} question${total === 1 ? "" : "s"}` : "31 questions drawn at random, spread over the chosen topics"}</span>
            <span className="spacer" />
            {mode === "practice" ? (
              <button className="btn primary" disabled={!total} onClick={startPractice}>
                Start {total} →
              </button>
            ) : (
              <button className="btn primary" onClick={() => open(mockPaper(chosenTopics), `Mock paper · ${topicLabel()}`)}>
                Generate mock paper →
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <h3>📄 Download as a Word document</h3>
          <p className="small muted" style={{ marginTop: 0 }}>
            {mode === "practice"
              ? `Exports all ${matching.length} questions matching the topics, sections and pool above, laid out like the paper with ruled answer lines.`
              : "Exports a freshly generated mock paper for the chosen topics, laid out like the exam with ruled answer lines."}{" "}
            Model answers include the rubric and the diagrams.
          </p>
          <div className="row">
            {(
              [
                ["end", "Answers at the end"],
                ["after", "Answer after each question"],
                ["none", "Questions only"],
              ] as [AnswerPlacement, string][]
            ).map(([k, label]) => (
              <button key={k} className={`chip ${placement === k ? "on" : ""}`} onClick={() => setPlacement(k)}>
                {label}
              </button>
            ))}
            <span className="spacer" />
            <button
              className="btn primary"
              disabled={busy || (mode === "practice" && !matching.length)}
              onClick={() => (mode === "practice" ? download(matching, `HE1002 questions - ${topicLabel()}`) : download(mockPaper(chosenTopics), `HE1002 mock paper - ${topicLabel()}`))}
            >
              {busy ? "Preparing…" : "⬇ Download .doc"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- answering a set
  const marked = qs.filter((q) => attempts[q.id]?.status === "done");
  const waiting = qs.filter((q) => attempts[q.id]?.status === "queued" || attempts[q.id]?.status === "marking");
  const failed = qs.filter((q) => attempts[q.id]?.status === "error");
  const got = marked.reduce((a, q) => a + (attempts[q.id].scores ?? []).reduce((x, y) => x + y, 0), 0);
  const max = marked.reduce((a, q) => a + q.marks, 0);
  const totalMarks = qs.reduce((a, q) => a + q.marks, 0);

  /** Copies every answered question (or, if none are answered yet, every question) as a chatbot marking prompt. */
  const copyForChatbot = async () => {
    const all = qs.map((q) => ({ q, num: numberOf(qs, q), answer: attempts[q.id]?.answer ?? drafts[q.id] ?? "", hadImage: attempts[q.id]?.hadImage }));
    const answeredItems = all.filter((x) => x.answer.trim());
    const items = answeredItems.length ? answeredItems : all;
    const ok = await copyText(chatMarkingPrompt(items));
    setCopied(ok ? `Copied ${items.length} question${items.length === 1 ? "" : "s"}${answeredItems.length ? " with your answers" : " (none answered yet)"} — paste into any chatbot` : "Copy failed");
    setTimeout(() => setCopied(""), 5000);
  };

  return (
    <div className="page narrow stack">
      <div className="batch-head">
        <div>
          <h2 style={{ margin: 0 }}>{setTitle}</h2>
          <span className="small muted">
            {qs.length} questions · {totalMarks} marks
          </span>
        </div>
        <span className="spacer" />
        <button className="btn" onClick={copyForChatbot} title="Copy the questions, rubrics, model answers and your answers as a marking prompt for ChatGPT, Claude, etc.">
          📋 Copy for chatbot
        </button>
        <button className="btn" disabled={busy} onClick={() => download(qs, `HE1002 ${setTitle.replace(/·/g, "-")}`)}>
          {busy ? "Preparing…" : "⬇ .doc"}
        </button>
        <button className="btn" onClick={() => setPhase("setup")}>
          ← Setup
        </button>
      </div>

      {copied && <div className="feedback">{copied}</div>}
      <div className="card queue-bar">
        <div className="row small">
          <span className="badge">AI · Gemini</span>
          {modelPicker}
          <span>
            <strong>{marked.length}</strong>/{qs.length} marked
            {max ? (
              <>
                {" "}
                · score{" "}
                <strong>
                  {got}/{max}
                </strong>{" "}
                ({Math.round((100 * got) / max)}%)
              </>
            ) : null}
          </span>
          {waiting.length > 0 && <span className="status marking">✨ {waiting.length} being marked</span>}
          {failed.length > 0 && <span className="status error">⚠ {failed.length} failed</span>}
          <span className="spacer" />
          {(marked.length > 0 || failed.length > 0) && (
            <button
              className="btn sm"
              onClick={() => {
                if (confirm("Clear the marks for every question in this set so you can redo it?")) clearAttempts(qs.filter((q) => !waiting.includes(q)).map((q) => q.id));
              }}
            >
              Redo set
            </button>
          )}
        </div>
        <div className="qnav" style={{ marginTop: 8 }}>
          {qs.map((q) => {
            const a = attempts[q.id];
            const cls = a?.status === "done" ? "done" : a?.status === "error" ? "err" : a ? "wait" : "";
            return (
              <a key={q.id} href={`#x-${q.id}`} className={cls} title={a?.status === "done" ? `${(a.scores ?? []).reduce((x, y) => x + y, 0)}/${q.marks}` : a?.status ?? "not answered"}>
                {numberOf(qs, q).slice(1)}
              </a>
            );
          })}
        </div>
      </div>

      {SECTIONS.map((sec) => {
        const list = qs.filter((q) => q.section === sec.s);
        if (!list.length) return null;
        return (
          <section key={sec.s} className="stack">
            <h2 style={{ marginTop: 18 }}>
              Question {sec.q} · {sec.name} <span className="small muted">({list.reduce((a, q) => a + q.marks, 0)} marks)</span>
            </h2>
            {list.map((q) => (
              <ExamCard
                key={q.id}
                q={q}
                num={numberOf(qs, q)}
                attempt={attempts[q.id]}
                queuePos={queuePosition(attempts, q.id)}
                model={model}
                draft={drafts[q.id] ?? ""}
                onDraft={(s) => setDraft(q.id, s)}
              />
            ))}
          </section>
        );
      })}
      <div className="row">
        <span className="spacer" />
        <button className="btn" onClick={() => setPhase("setup")}>
          ← Back to setup
        </button>
      </div>
    </div>
  );
}
