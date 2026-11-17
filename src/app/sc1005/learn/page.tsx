import type { Metadata } from "next";
import Link from "next/link";
import { TxtInline } from "@/components/sc1005/Text";
import { LESSONS } from "@/data/sc1005/lessons";
import { PARTS, TOPICS } from "@/lib/sc1005/topics";

export const metadata: Metadata = { title: "Learn · SC1005 Prep" };

export default function Sc1005LearnIndex() {
  return (
    <div className="page">
      <h1>Learn</h1>
      <p className="lead">
        All 13 chapters, each taught as intuition → interactive figure → key ideas → diagrams → worked example → exam traps → recall. The figures are live: click inputs, step the clock and watch the logic
        happen.
      </p>
      {PARTS.map((p) => (
        <section key={p.part} style={{ marginBottom: 28 }}>
          <h2>
            {p.name} <span className="small muted">· {p.note}</span>
          </h2>
          <div className="grid cols-3">
            {TOPICS.filter((t) => t.part === p.part).map((t) => {
              const l = LESSONS.find((x) => x.topic === t.id)!;
              return (
                <Link key={t.id} href={`/sc1005/learn/${t.id}`} className="card" style={{ color: "inherit", borderTop: `4px solid ${t.color}` }}>
                  <div className="row small muted" style={{ marginBottom: 4 }}>
                    Chapter {t.ch} · {l.sections.length} sections · {l.sections.reduce((a, s) => a + (s.visuals?.length ?? 0), 0)} interactive figures
                  </div>
                  <h2>{t.name}</h2>
                  <p className="small muted" style={{ marginTop: 0 }}>
                    {t.blurb}
                  </p>
                  <ol className="small" style={{ paddingLeft: 18, margin: 0 }}>
                    {l.sections.map((s) => (
                      <li key={s.title}>
                        <TxtInline text={s.title} />
                      </li>
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
