"use client";

import Link from "next/link";
import { useState } from "react";
import { Figures } from "@/components/sc1005/figures/Figure";
import { CodeBlock, TexBlock, Txt, TxtInline } from "@/components/sc1005/Text";
import { LessonVisuals } from "@/components/sc1005/viz/registry";
import { useFlag } from "@/lib/progress";
import { TOPICS, topicById } from "@/lib/sc1005/topics";
import type { Lesson, LessonSection, RecallCard, TopicId, WorkedExample } from "@/lib/sc1005/types";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const meta = topicById(lesson.topic);
  const idx = TOPICS.findIndex((t) => t.id === lesson.topic);
  const nextTopic = TOPICS[idx + 1];
  return (
    <div className="page learn-layout">
      <aside className="toc card" style={{ padding: 10 }}>
        <div className="small muted" style={{ padding: "4px 10px" }}>
          Chapter {meta.ch}
        </div>
        <a href="#big-picture">Big picture</a>
        {lesson.sections.map((s, i) => (
          <a key={i} href={`#s${i + 1}`}>
            {i + 1}. <TxtInline text={s.title} />
          </a>
        ))}
        <a href="#playbook">Exam playbook</a>
        <div style={{ padding: "10px" }}>
          <Link className="btn primary" href={`/sc1005/practice?topic=${lesson.topic}`} style={{ width: "100%", justifyContent: "center" }}>
            Practise this chapter
          </Link>
        </div>
      </aside>

      <main className="stack">
        <div>
          <div className="row small muted">
            <Link href="/sc1005/learn">Learn</Link> / Ch {meta.ch} {meta.name}
          </div>
          <h1 style={{ color: meta.color }}>
            {meta.ch}. {meta.name}
          </h1>
        </div>
        <section id="big-picture" className="card" style={{ borderTop: `4px solid ${meta.color}` }}>
          <h2>Big picture</h2>
          <Txt text={lesson.bigPicture} />
        </section>

        {lesson.sections.map((s, i) => (
          <SectionCard key={i} s={s} n={i + 1} topic={lesson.topic} />
        ))}

        {lesson.playbook.length > 0 && (
          <section id="playbook" className="card">
            <h2>Exam playbook — “if you see X, do Y”</h2>
            <p className="small muted">Cover the right-hand side and say the move out loud before reading it.</p>
            <ul className="rich" style={{ paddingLeft: 20 }}>
              {lesson.playbook.map((p, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <TxtInline text={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="row">
          <Link className="btn primary" href={`/sc1005/practice?topic=${lesson.topic}`}>
            Practise {meta.name} →
          </Link>
          {nextTopic && (
            <Link className="btn" href={`/sc1005/learn/${nextTopic.id}`}>
              Next: Ch {nextTopic.ch} {nextTopic.name}
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

function SectionCard({ s, n, topic }: { s: LessonSection; n: number; topic: TopicId }) {
  const [done, setDone] = useFlag(`sc1005:${topic}:s${n}`);
  return (
    <section id={`s${n}`} className="card">
      <div className="row">
        <h2 style={{ margin: 0 }}>
          {n}. <TxtInline text={s.title} />
        </h2>
        <span className="spacer" />
        <label className="small muted row" style={{ gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} /> Got it
        </label>
      </div>

      <div className="callout intuition">
        <div className="callout-title">Intuition</div>
        <Txt text={s.intuition} />
      </div>

      <LessonVisuals topic={topic} ids={s.visuals} />

      <h3>Key ideas</h3>
      <ul className="rich md" style={{ paddingLeft: 20 }}>
        {s.keyIdeas.map((k, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            <TxtInline text={k} />
          </li>
        ))}
      </ul>

      <Figures figs={s.figures} />

      {s.formulas && s.formulas.length > 0 && (
        <>
          <h3>Formulas</h3>
          {s.formulas.map((f, i) => (
            <TexBlock key={i} tex={f} />
          ))}
        </>
      )}

      {s.code && s.code.length > 0 && (
        <>
          <h3>Code</h3>
          {s.code.map((c, i) => (
            <CodeBlock key={i} code={c.code} title={c.title} />
          ))}
        </>
      )}

      {s.example && <Example ex={s.example} />}

      {s.pitfalls && s.pitfalls.length > 0 && (
        <div className="callout pitfall">
          <div className="callout-title">Exam traps</div>
          <ul className="rich md" style={{ paddingLeft: 20, margin: 0 }}>
            {s.pitfalls.map((p, i) => (
              <li key={i}>
                <TxtInline text={p} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Check yourself</h3>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        {s.recall.map((r, i) => (
          <Flash key={i} card={r} />
        ))}
      </div>
    </section>
  );
}

function Example({ ex }: { ex: WorkedExample }) {
  const [shown, setShown] = useState(0);
  const all = shown >= ex.steps.length;
  return (
    <div style={{ marginTop: 14 }}>
      <h3>Worked example</h3>
      <Txt text={ex.problem} />
      <Figures figs={ex.figures} />
      <p className="small muted" style={{ margin: "6px 0" }}>
        Try the next step yourself, then reveal it.
      </p>
      <ol className="steps rich md">
        {ex.steps.slice(0, shown).map((st, i) => (
          <li key={i}>
            <Txt text={st} />
          </li>
        ))}
      </ol>
      {all ? (
        <div className="callout" style={{ background: "var(--good-soft)" }}>
          <div className="callout-title">Answer</div>
          <Txt text={ex.answer} />
        </div>
      ) : (
        <div className="row">
          <button className="btn" onClick={() => setShown(shown + 1)}>
            Reveal step {shown + 1} of {ex.steps.length}
          </button>
          <button className="btn" onClick={() => setShown(ex.steps.length)} style={{ border: "none" }}>
            Show all
          </button>
        </div>
      )}
    </div>
  );
}

function Flash({ card }: { card: RecallCard }) {
  const [open, setOpen] = useState(false);
  return (
    <button className="flash" onClick={() => setOpen(!open)}>
      <TxtInline text={card.q} />
      {open ? (
        <div className="ans">
          <TxtInline text={card.a} />
        </div>
      ) : (
        <div className="small muted" style={{ marginTop: 6 }}>
          Tap to reveal
        </div>
      )}
    </button>
  );
}
