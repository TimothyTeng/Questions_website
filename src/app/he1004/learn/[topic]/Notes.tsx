"use client";

import Link from "next/link";
import { useState } from "react";
import { Rich, RichInline } from "@/components/Rich";
import { Figures } from "@/components/he1004/Figure";
import { FormulaBox } from "@/components/he1004/FormulaBox";
import { dataFor } from "@/data/he1004";
import { TOPICS, topicById } from "@/lib/he1004/topics";
import type { TopicId } from "@/lib/he1004/types";

/** Bold term that, in "Hide terms" mode, stays blurred until clicked. */
function Term({ children }: { children: string }) {
  const [shown, setShown] = useState(false);
  return (
    <span className={`term ${shown ? "shown" : ""}`} onClick={() => setShown((s) => !s)} title="Click to reveal / hide">
      <RichInline text={children} />
    </span>
  );
}

function Cell({ text, hideable, head }: { text: string; hideable: boolean; head?: boolean }) {
  const [shown, setShown] = useState(false);
  if (!hideable)
    return (
      <td>
        {head ? (
          <strong>
            <Rich text={text} />
          </strong>
        ) : (
          <Rich text={text} />
        )}
      </td>
    );
  return (
    <td className={`term-cell ${shown ? "shown" : ""}`} onClick={() => setShown((s) => !s)}>
      <strong>
        <Rich text={text} />
      </strong>
    </td>
  );
}

export function Notes({ topic }: { topic: TopicId }) {
  const t = topicById(topic);
  const d = dataFor(topic);
  const [hide, setHide] = useState(false);
  const [hideF, setHideF] = useState(false);
  // Remount whenever a mode flips so every blurred item starts hidden again.
  const [round, setRound] = useState(0);
  const idx = TOPICS.findIndex((x) => x.id === topic);
  const prev = TOPICS[idx - 1];
  const next = TOPICS[idx + 1];

  return (
    <div className="page">
      <div className="row" style={{ marginBottom: 6 }}>
        <span className="dot" style={{ background: t.color }} />
        <span className="small muted">
          Topic {idx + 1} of {TOPICS.length} · {t.from}
        </span>
      </div>
      <h1>{t.name}</h1>
      <p className="lead">{t.blurb}</p>
      <div className="row" style={{ marginBottom: 20 }}>
        <button
          className={`chip ${hide ? "on" : ""}`}
          onClick={() => {
            setHide((h) => !h);
            setRound((r) => r + 1);
          }}
        >
          🙈 Hide terms {hide ? "on" : "off"}
        </button>
        <button
          className={`chip ${hideF ? "on" : ""}`}
          onClick={() => {
            setHideF((h) => !h);
            setRound((r) => r + 1);
          }}
        >
          🧮 Hide formulas {hideF ? "on" : "off"}
        </button>
        {(hide || hideF) && <span className="small muted">Recall it, then click the blur to check.</span>}
        <span className="spacer" />
        <Link className="btn" href={`/he1004/flashcards?topic=${topic}`}>
          🃏 Flashcards ({d.flashcards.length})
        </Link>
        <Link className="btn" href={`/he1004/quiz?topic=${topic}`}>
          ✏️ MCQ quiz ({d.quiz.length})
        </Link>
        <Link className="btn primary" href={`/he1004/questions?topic=${topic}`}>
          📝 Exam questions ({d.exam.length})
        </Link>
      </div>

      <div className="lesson-grid">
        <nav className="toc">
          {d.sections.map((s, i) => (
            <a key={s.title} href={`#s${i + 1}`}>
              {s.title}
            </a>
          ))}
        </nav>
        <div className={`${hide ? "hide-terms" : ""} ${hideF ? "hide-formulas" : ""}`} key={round}>
          {d.sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="card notes-section" style={{ scrollMarginTop: 72 }}>
              <h2>{s.title}</h2>
              {s.intro && <Rich className="muted small" text={s.intro} />}
              {s.points.map((p, j) => (
                <div className="point" key={j}>
                  {p.term && (
                    <>
                      <Term>{p.term}</Term>
                      {": "}
                    </>
                  )}
                  <Rich text={p.text} />
                  {p.eg && (
                    <div className="eg">
                      <Rich text={p.eg} />
                    </div>
                  )}
                </div>
              ))}
              {s.formulas && (
                <div className="formulas">
                  {s.formulas.map((f, k) => (
                    <FormulaBox key={k} f={f} />
                  ))}
                </div>
              )}
              {s.table && (
                <div className="table-wrap">
                  <table className="notes-table">
                    <thead>
                      <tr>
                        {s.table[0].map((h, k) => (
                          <th key={k}>
                            <Rich text={h} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.slice(1).map((row, r) => (
                        <tr key={r}>
                          {row.map((c, k) => (
                            <Cell key={k} text={c} hideable={hide && k === 0} head={k === 0} />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.figures && <Figures fs={s.figures} />}
              {s.worked?.map((w, k) => (
                <details key={k} className="worked">
                  <summary>
                    Worked example{s.worked!.length > 1 ? ` ${k + 1}` : ""}
                    {w.source && <span className="small muted"> · {w.source}</span>}
                  </summary>
                  <div style={{ marginTop: 6 }}>
                    <Rich text={w.problem} />
                  </div>
                  <div className="sol">
                    <Rich text={w.solution} />
                  </div>
                </details>
              ))}
            </section>
          ))}
          <div className="row" style={{ marginTop: 24 }}>
            {prev && (
              <Link className="btn" href={`/he1004/learn/${prev.id}`}>
                ← {prev.name}
              </Link>
            )}
            <span className="spacer" />
            {next && (
              <Link className="btn" href={`/he1004/learn/${next.id}`}>
                {next.name} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
