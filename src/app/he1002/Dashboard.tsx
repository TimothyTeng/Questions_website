"use client";

import Link from "next/link";
import { ALL_CARDS, ALL_EXAM, ALL_QUIZ } from "@/data/he1002";
import { resetCards, resetProgress, useAttempts, useCardProgress, useProgress } from "@/lib/he1002/store";
import { PARTS, TOPICS } from "@/lib/he1002/topics";

export function Dashboard() {
  const progress = useProgress();
  const cards = useCardProgress();
  const attempts = useAttempts();
  const stats = TOPICS.map((t) => {
    const qs = ALL_QUIZ.filter((q) => q.topic === t.id);
    const cs = ALL_CARDS.filter((c) => c.topic === t.id);
    const es = ALL_EXAM.filter((q) => q.topic === t.id);
    const marked = es.filter((q) => attempts[q.id]?.status === "done");
    return {
      t,
      total: qs.length,
      mastered: qs.filter((q) => progress[q.id]?.last).length,
      cards: cs.length,
      known: cs.filter((c) => cards[c.id]?.last).length,
      exam: es.length,
      examDone: marked.length,
      examGot: marked.reduce((a, q) => a + (attempts[q.id].scores ?? []).reduce((x, y) => x + y, 0), 0),
      examMax: marked.reduce((a, q) => a + q.marks, 0),
    };
  });
  const any = Object.keys(progress).length + Object.keys(cards).length;

  return (
    <section className="card">
      <div className="row" style={{ marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Your progress</h2>
        <span className="spacer" />
        <span className="small muted">
          {ALL_QUIZ.length} quiz questions · {ALL_CARDS.length} flashcards · {ALL_EXAM.length} exam questions
        </span>
        {any > 0 && (
          <button
            className="btn small"
            onClick={() => {
              if (confirm("Reset HE1002 quiz and flashcard progress on this device? (Exam-question marks are kept.)")) {
                resetProgress();
                resetCards();
              }
            }}
          >
            Reset
          </button>
        )}
      </div>
      {PARTS.map((p) => (
        <div key={p.part} style={{ marginBottom: 18 }}>
          <h3 style={{ margin: "0 0 10px" }}>
            {p.name} <span className="small muted">· {p.note}</span>
          </h3>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
            {stats
              .filter((s) => s.t.part === p.part)
              .map(({ t, total, mastered, cards, known, exam, examDone, examGot, examMax }) => (
                <div key={t.id}>
                  <div className="row small" style={{ marginBottom: 4, flexWrap: "nowrap" }}>
                    <span className="dot" style={{ background: t.color }} />
                    <strong>
                      {t.n}. {t.name}
                    </strong>
                  </div>
                  <div className="bar" title={`${mastered} of ${total} quiz questions right on last attempt`}>
                    <div style={{ width: `${(100 * mastered) / Math.max(1, total)}%`, background: t.color }} />
                  </div>
                  <div className="small muted" style={{ marginTop: 4 }}>
                    Quiz {mastered}/{total} · Cards {known}/{cards} · Exam Qs {examDone}/{exam}
                    {examMax ? ` (${Math.round((100 * examGot) / examMax)}%)` : ""}
                  </div>
                  <div className="row small" style={{ marginTop: 4, gap: 12 }}>
                    <Link href={`/he1002/learn/${t.id}`}>Learn</Link>
                    <Link href={`/he1002/flashcards?topic=${t.id}`}>Cards</Link>
                    <Link href={`/he1002/quiz?topic=${t.id}`}>Quiz</Link>
                    <Link href={`/he1002/questions?topic=${t.id}`}>Exam Qs</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <p className="small muted" style={{ marginBottom: 0 }}>
        Progress is saved in this browser only.
      </p>
    </section>
  );
}
