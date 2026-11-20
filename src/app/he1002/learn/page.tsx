import type { Metadata } from "next";
import Link from "next/link";
import { dataFor } from "@/data/he1002";
import { PARTS, TOPICS } from "@/lib/he1002/topics";

export const metadata: Metadata = { title: "Learn · HE1002 Prep" };

export default function He1002LearnIndex() {
  return (
    <div className="page">
      <h1>Learn</h1>
      <p className="lead">
        Revision notes for all 12 lectures, in lecture order: every term with its slide definition, the formulas, worked examples from the problem sets, and the diagrams. Each topic links to its flashcards
        and quiz.
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
              const formulas = d.sections.reduce((a, s) => a + (s.formulas?.length ?? 0), 0);
              return (
                <Link key={t.id} href={`/he1002/learn/${t.id}`} className="card" style={{ color: "inherit", borderTop: `4px solid ${t.color}` }}>
                  <div className="small muted" style={{ marginBottom: 4 }}>
                    Lecture {t.n} · {terms} terms · {formulas} formulas · {d.flashcards.length} cards · {d.quiz.length} quiz Qs
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
