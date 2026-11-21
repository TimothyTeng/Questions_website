"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ExamCard, fmtMarks } from "@/components/he1004/ExamCard";
import { ALL_EXAM, type TExam } from "@/data/he1004";
import { chatMarkingPrompt, copyText } from "@/lib/he1004/chatPrompt";
import { downloadExamDoc, type AnswerPlacement, type ExamGroup } from "@/lib/he1004/docExport";
import { clearAttempts, queuePosition, startQueue, useAttempts, usePref } from "@/lib/he1004/store";
import { KINDS, PAPER, PARTS, TOPICS, topicById } from "@/lib/he1004/topics";
import type { ExamKind, TopicId } from "@/lib/he1004/types";

type Pool = "all" | "new" | "notfull";
const COUNTS = [5, 10, 20, 0];
const DEFAULT_MODEL = "gemini-flash-latest";
const DRAFTS = "he1004-drafts-v1";
const LETTERS = "abcdefghij";

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const topicOrder = (q: TExam) => TOPICS.findIndex((t) => t.id === q.topic);
const courseOrder = (qs: TExam[]) => [...qs].sort((a, b) => topicOrder(a) - topicOrder(b) || ALL_EXAM.indexOf(a) - ALL_EXAM.indexOf(b));

/** Practice sets are grouped by topic, in course order. */
function byTopic(qs: TExam[]): ExamGroup[] {
  return TOPICS.map((t) => ({ title: `Lecture Note ${t.n} · ${t.name}`, qs: courseOrder(qs.filter((q) => q.topic === t.id)) })).filter((g) => g.qs.length);
}

/**
 * A random paper in the past-paper format: Question 1–4, five 5-mark parts each, drawn from the topics that question
 * covers (round-robin so one topic doesn't dominate; at most one "spot the wrong statements" part per question).
 */
function mockPaper(topics: TopicId[]): ExamGroup[] {
  const used = new Set<string>();
  return PAPER.map((p) => {
    const ts = shuffle(p.topics.filter((t) => topics.includes(t)));
    const pools = new Map(ts.map((t) => [t, shuffle(ALL_EXAM.filter((q) => q.topic === t && !used.has(q.id)))]));
    const picked: TExam[] = [];
    let selects = 0;
    while (picked.length < 5 && [...pools.values()].some((l) => l.length))
      for (const t of ts) {
        const l = pools.get(t)!;
        while (l.length && (used.has(l[0].id) || (l[0].kind === "select" && selects >= 1))) l.shift();
        if (!l.length || picked.length >= 5) continue;
        const q = l.shift()!;
        if (q.kind === "select") selects++;
        used.add(q.id);
        picked.push(q);
      }
    // Calculations first, "spot the wrong statements" and explain parts last, like the past paper.
    const rank = (q: TExam) => ({ calc: 0, proof: 1, select: 2, explain: 3 })[q.kind];
    return { title: p.name, paper: p.q, qs: picked.sort((a, b) => rank(a) - rank(b) || topicOrder(a) - topicOrder(b)) };
  }).filter((g) => g.qs.length);
}

/** Question label in a laid-out set: "Q1(a)" in a mock paper, "Q3" in a practice set. */
function labels(groups: ExamGroup[]): Map<string, string> {
  const m = new Map<string, string>();
  let n = 0;
  for (const g of groups) g.qs.forEach((q, i) => m.set(q.id, g.paper ? `Q${g.paper}(${LETTERS[i]})` : `Q${++n}`));
  return m;
}

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
  const [kinds, setKinds] = useState<ExamKind[]>(["calc", "proof", "select", "explain"]);
  const [count, setCount] = useState(initialTopic ? 0 : 10);
  const [pool, setPool] = useState<Pool>("all");
  const [placement, setPlacement] = useState<AnswerPlacement>("end");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState("");

  const [phase, setPhase] = useState<"setup" | "set">("setup");
  const [groups, setGroups] = useState<ExamGroup[]>([]);
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
    fetch("/api/he1004/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "models" }) })
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
      courseOrder(
        ALL_EXAM.filter((q) => {
          if (!chosenTopics.includes(q.topic) || !kinds.includes(q.kind)) return false;
          const a = attempts[q.id];
          if (pool === "new" && a) return false;
          if (pool === "notfull" && a?.status === "done" && (a.scores ?? []).reduce((x, y) => x + y, 0) === q.marks) return false;
          return true;
        }),
      ),
    [chosenTopics, kinds, pool, attempts],
  );

  const topicLabel = () => (topics.length === 0 ? "All topics" : topics.length <= 2 ? topics.map((t) => topicById(t).name).join(" + ") : `${topics.length} topics`);

  const open = (gs: ExamGroup[], title: string) => {
    setGroups(gs);
    setSetTitle(title);
    setSavedSet(JSON.stringify({ groups: gs.map((g) => ({ title: g.title, paper: g.paper, ids: g.qs.map((q) => q.id) })), title }));
    setPhase("set");
    window.scrollTo({ top: 0 });
  };

  const practiceList = () => {
    // Sample round-robin over topics so a small set still covers several topics.
    if (!count) return matching;
    const lists = TOPICS.map((t) => shuffle(matching.filter((q) => q.topic === t.id))).filter((l) => l.length);
    const out: TExam[] = [];
    while (out.length < count && lists.some((l) => l.length)) for (const l of shuffle(lists)) if (l.length && out.length < count) out.push(l.shift()!);
    return out;
  };

  const resume = (() => {
    try {
      const s = JSON.parse(savedSet) as { groups: { title: string; paper?: number; ids: string[] }[]; title: string };
      const gs = s.groups
        .map((g) => ({ title: g.title, paper: g.paper, qs: g.ids.map((id) => ALL_EXAM.find((q) => q.id === id)).filter((q): q is TExam => !!q) }))
        .filter((g) => g.qs.length);
      return gs.length ? { groups: gs, title: s.title } : null;
    } catch {
      return null;
    }
  })();

  const download = async (gs: ExamGroup[], title: string) => {
    setBusy(true);
    try {
      await downloadExamDoc(gs, placement, title);
    } catch (e) {
      alert(`Could not build the document: ${e instanceof Error ? e.message : e}`);
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
            {ALL_EXAM.length} exam parts in the past-paper format (5 marks each), every one with a marking rubric and a full model answer. Work on paper, then either type your working or attach a photo
            and press <em>Submit for Gemini marking</em>. Answers are marked one by one in the background while you carry on. Or self-mark against the rubric. &ldquo;Which TWO statements are
            wrong&rdquo; parts are marked instantly.
          </p>
        </div>

        {resume && (
          <div className="card row">
            <div>
              <strong>Continue: {resume.title}</strong>
              <div className="small muted">
                {resume.groups.reduce((a, g) => a + g.qs.length, 0)} parts · {resume.groups.flatMap((g) => g.qs).filter((q) => attempts[q.id]?.status === "done").length} marked
              </div>
            </div>
            <span className="spacer" />
            <button className="btn primary" onClick={() => open(resume.groups, resume.title)}>
              Resume →
            </button>
          </div>
        )}

        <div className="card">
          <div className="field">
            <span className="field-label">Mode</span>
            <div className="row">
              <button className={`chip ${mode === "practice" ? "on" : ""}`} onClick={() => setMode("practice")}>
                🎯 Practice by topic / type
              </button>
              <button className={`chip ${mode === "mock" ? "on" : ""}`} onClick={() => setMode("mock")}>
                📄 Mock paper (4 questions × 5 parts = 100 marks)
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
                <span className="field-label">Question types</span>
                <div className="row">
                  {KINDS.map((k) => (
                    <button key={k.k} className={`chip ${kinds.includes(k.k) ? "on" : ""}`} onClick={() => setKinds((p) => (p.length === 1 && p[0] === k.k ? p : toggle(p, k.k)))}>
                      {k.name} ({ALL_EXAM.filter((q) => q.kind === k.k && chosenTopics.includes(q.topic)).length})
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
          {mode === "mock" && (
            <div className="small muted" style={{ marginBottom: 12 }}>
              Laid out like the past paper:
              <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
                {PAPER.map((p) => (
                  <li key={p.q}>
                    <strong>Question {p.q}</strong> ({p.name}): {p.topics.map((t) => `L${topicById(t).n}`).join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="row">
            <span className="muted small">{mode === "practice" ? `${total} part${total === 1 ? "" : "s"} · ${total * 5} marks` : "20 parts drawn at random from the chosen topics"}</span>
            <span className="spacer" />
            {mode === "practice" ? (
              <button className="btn primary" disabled={!total} onClick={() => open(byTopic(practiceList()), `Practice · ${topicLabel()}`)}>
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
              ? `Exports all ${matching.length} parts matching the topics, types and pool above, grouped by topic with ruled answer lines.`
              : "Exports a freshly generated mock paper (Question 1–4, parts (a)–(e)) with ruled answer lines."}{" "}
            Maths and graphs are embedded as images. Model answers include the full working and the marking rubric.
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
              onClick={() => (mode === "practice" ? download(byTopic(matching), `HE1004 questions - ${topicLabel()}`) : download(mockPaper(chosenTopics), `HE1004 mock paper - ${topicLabel()}`))}
            >
              {busy ? "Preparing…" : "⬇ Download .doc"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- answering a set
  const qs = groups.flatMap((g) => g.qs);
  const label = labels(groups);
  const marked = qs.filter((q) => attempts[q.id]?.status === "done");
  const waiting = qs.filter((q) => attempts[q.id]?.status === "queued" || attempts[q.id]?.status === "marking");
  const failed = qs.filter((q) => attempts[q.id]?.status === "error");
  const got = marked.reduce((a, q) => a + (attempts[q.id].scores ?? []).reduce((x, y) => x + y, 0), 0);
  const max = marked.reduce((a, q) => a + q.marks, 0);
  const totalMarks = qs.reduce((a, q) => a + q.marks, 0);

  /** Copies every answered part (or, if none are answered yet, every part) as a chatbot marking prompt. */
  const copyForChatbot = async () => {
    const all = qs.map((q) => ({ q, num: label.get(q.id)!, answer: attempts[q.id]?.answer ?? drafts[q.id] ?? "", hadImage: attempts[q.id]?.hadImage }));
    const answeredItems = all.filter((x) => x.answer.trim());
    const items = answeredItems.length ? answeredItems : all;
    const ok = await copyText(chatMarkingPrompt(items));
    setCopied(ok ? `Copied ${items.length} part${items.length === 1 ? "" : "s"}${answeredItems.length ? " with your answers" : " (none answered yet)"}. Paste into any chatbot.` : "Copy failed");
    setTimeout(() => setCopied(""), 5000);
  };

  return (
    <div className="page narrow stack">
      <div className="batch-head">
        <div>
          <h2 style={{ margin: 0 }}>{setTitle}</h2>
          <span className="small muted">
            {qs.length} parts · {totalMarks} marks
          </span>
        </div>
        <span className="spacer" />
        <button className="btn" onClick={copyForChatbot} title="Copy the questions, rubrics, model answers and your answers as a marking prompt for ChatGPT, Claude, etc.">
          📋 Copy for chatbot
        </button>
        <button className="btn" disabled={busy} onClick={() => download(groups, `HE1004 ${setTitle.replace(/·/g, "-")}`)}>
          {busy ? "Preparing…" : "⬇ Download .doc"}
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
                  {fmtMarks(got)}/{max}
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
                if (confirm("Clear the marks for every part in this set so you can redo it?")) clearAttempts(qs.filter((q) => !waiting.includes(q)).map((q) => q.id));
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
              <a key={q.id} href={`#x-${q.id}`} className={cls} title={a?.status === "done" ? `${fmtMarks((a.scores ?? []).reduce((x, y) => x + y, 0))}/${q.marks}` : (a?.status ?? "not answered")}>
                {label.get(q.id)!.slice(1)}
              </a>
            );
          })}
        </div>
      </div>

      {groups.map((g, gi) => (
        <section key={gi} className="stack">
          <h2 style={{ marginTop: 18 }}>
            {g.paper ? `Question ${g.paper}` : g.title}{" "}
            <span className="small muted">
              ({g.paper ? `${g.title} · ` : ""}
              {g.qs.reduce((a, q) => a + q.marks, 0)} marks)
            </span>
          </h2>
          {g.qs.map((q) => (
            <ExamCard
              key={q.id}
              q={q}
              num={label.get(q.id)!}
              attempt={attempts[q.id]}
              queuePos={queuePosition(attempts, q.id)}
              model={model}
              draft={drafts[q.id] ?? ""}
              onDraft={(s) => setDraft(q.id, s)}
            />
          ))}
        </section>
      ))}
      <div className="row">
        <span className="spacer" />
        <button className="btn" onClick={() => setPhase("setup")}>
          ← Back to setup
        </button>
      </div>
    </div>
  );
}
