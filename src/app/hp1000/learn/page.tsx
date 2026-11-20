import type { Metadata } from "next";
import Link from "next/link";
import { dataFor } from "@/data/hp1000";
import { PARTS, TOPICS } from "@/lib/hp1000/topics";

export const metadata: Metadata = { title: "Learn · HP1000 Prep" };

export default function Hp1000LearnIndex() {
  return (
    <div className="page">
      <h1>Learn</h1>
      <p className="lead">
        Revision notes for all 11 lectures, in lecture order. Every term is given with its slide definition and, where it helps, an everyday example of it. Turn on <em>Hide terms</em> inside a topic to
        blur the names and practise recalling them from the definitions.
      </p>
      {PARTS.map((p) => (
        <section key={p.part} style={{ marginBottom: 28 }}>
          <h2>
            {p.name} <span className="small muted">· {p.note}</span>
          </h2>
          <div className="grid cols-3">
            {TOPICS.filter((t) => t.part === p.part).map((t) => {
              const d = dataFor(t.id);
              const terms = d.sections.reduce((a, s) => a + s.points.length, 0);
              return (
                <Link key={t.id} href={`/hp1000/learn/${t.id}`} className="card" style={{ color: "inherit", borderTop: `4px solid ${t.color}` }}>
                  <div className="small muted" style={{ marginBottom: 4 }}>
                    Lecture {t.n} · {terms} terms · {d.flashcards.length} flashcards · {d.questions.length} questions
                  </div>
                  <h2>{t.name}</h2>
                  <ol className="small" style={{ paddingLeft: 18, margin: 0 }}>
                    {d.sections.map((s) => (
                      <li key={s.title}>{s.title}</li>
                    ))}
                  </ol>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
