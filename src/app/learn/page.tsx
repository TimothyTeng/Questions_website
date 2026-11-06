import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import { RichInline } from "@/components/Rich";
import { TOPICS } from "@/lib/topics";

export const metadata: Metadata = { title: "Learn · LA CA2 Mastery" };

export default function LearnIndex() {
  return (
    <div className="page">
      <h1>Learn</h1>
      <p className="lead">Each topic is taught the same way, in short loops built on how memory actually works.</p>
      <div className="grid cols-3" style={{ marginBottom: 28 }}>
        <div className="card">
          <h3>1 · Intuition first</h3>
          <p className="small muted">Every section opens with the “why” in one or two sentences, so the formulas hang on a picture instead of floating alone.</p>
        </div>
        <div className="card">
          <h3>2 · Worked example, one step at a time</h3>
          <p className="small muted">Reveal each step only after predicting it yourself. Studying worked examples beats solving cold when a topic is new.</p>
        </div>
        <div className="card">
          <h3>3 · Retrieval practice</h3>
          <p className="small muted">Recall cards and the exam playbook make you pull facts out of memory, the single most effective revision habit. Then drill in Practice.</p>
        </div>
      </div>
      <div className="grid cols-3">
        {TOPICS.map((t) => {
          const l = lessons.find((x) => x.topic === t.id)!;
          return (
            <Link key={t.id} href={`/learn/${t.id}`} className="card" style={{ color: "inherit", borderTop: `4px solid ${t.color}` }}>
              <div className="row small muted" style={{ marginBottom: 4 }}>
                {t.chapter} · {l.sections.length} sections
              </div>
              <h2>{t.name}</h2>
              <p className="small muted" style={{ marginTop: 0 }}>{t.blurb}</p>
              <ol className="small" style={{ paddingLeft: 18, margin: 0 }}>
                {l.sections.map((s) => (
                  <li key={s.title}>
                    <RichInline text={s.title} />
                  </li>
                ))}
              </ol>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
