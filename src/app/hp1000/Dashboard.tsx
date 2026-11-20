"use client";

import Link from "next/link";
import { ALL_CARDS, ALL_QUESTIONS } from "@/data/hp1000";
import { resetCards, resetProgress, useCardProgress, useProgress } from "@/lib/hp1000/store";
import { PARTS, TOPICS } from "@/lib/hp1000/topics";

export function Dashboard() {
  const progress = useProgress();
  const cards = useCardProgress();
  const stats = TOPICS.map((t) => {
    const qs = ALL_QUESTIONS.filter((q) => q.topic === t.id);
    const cs = ALL_CARDS.filter((c) => c.topic === t.id);
    const seen = qs.filter((q) => progress[q.id]);
    return {
      t,
      total: qs.length,
      seen: seen.length,
      mastered: seen.filter((q) => progress[q.id].last).length,
      cards: cs.length,
      known: cs.filter((c) => cards[c.id]?.last).length,
      missed: cs.filter((c) => cards[c.id] && !cards[c.id].last).length,
    };
  });
  const any = stats.some((s) => s.seen || s.known || s.missed);

  return (
    <section className="card">
      <div className="row" style={{ marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Your progress</h2>
        <span className="spacer" />
        <span className="small muted">
          {ALL_QUESTIONS.length} questions · {ALL_CARDS.length} flashcards
        </span>
        {any && (
          <button
            className="btn small"
            onClick={() => {
              if (confirm("Reset all HP1000 question and flashcard progress on this device?")) {
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
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {stats
              .filter((s) => s.t.part === p.part)
              .map(({ t, total, seen, mastered, cards, known, missed }) => (
                <div key={t.id}>
                  <div className="row small" style={{ marginBottom: 4, flexWrap: "nowrap" }}>
                    <span className="dot" style={{ background: t.color }} />
                    <strong>
                      {t.n}. {t.name}
                    </strong>
                  </div>
                  <div className="bar" title={`${mastered} of ${total} questions right on last attempt`}>
                    <div style={{ width: `${(100 * mastered) / Math.max(1, total)}%`, background: t.color }} />
                  </div>
                  <div className="small muted" style={{ marginTop: 4 }}>
                    Questions {mastered}/{total}
                    {seen - mastered ? ` · ${seen - mastered} to fix` : ""} · Cards {known}/{cards}
                    {missed ? ` · ${missed} missed` : ""}
                  </div>
                  <div className="row small" style={{ marginTop: 4, gap: 12 }}>
                    <Link href={`/hp1000/learn/${t.id}`}>Learn</Link>
                    <Link href={`/hp1000/flashcards?topic=${t.id}`}>Flashcards</Link>
                    <Link href={`/hp1000/questions?topic=${t.id}`}>Questions</Link>
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
