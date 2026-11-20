"use client";

import Link from "next/link";
import { useState } from "react";
import { FormulaBox } from "@/components/he1002/FormulaBox";
import { Graphs } from "@/components/he1002/Graph";
import { dataFor } from "@/data/he1002";
import { TOPICS, topicById } from "@/lib/he1002/topics";
import type { TopicId } from "@/lib/he1002/types";

/** Bold term that, in "Hide terms" mode, stays blurred until clicked. */
function Term({ children }: { children: string }) {
  const [shown, setShown] = useState(false);
  return (
    <span className={`term ${shown ? "shown" : ""}`} onClick={() => setShown((s) => !s)} title="Click to reveal / hide">
      {children}
    </span>
  );
}

function Cell({ text, hideable }: { text: string; hideable: boolean }) {
  const [shown, setShown] = useState(false);
  if (!hideable) return <td style={{ whiteSpace: "pre-line" }}>{text}</td>;
  return (
    <td className={`term-cell ${shown ? "shown" : ""}`} onClick={() => setShown((s) => !s)}>
      <strong>{text}</strong>
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
        <span className="small muted">Lecture {t.n} of 12</span>
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
        <Link className="btn" href={`/he1002/flashcards?topic=${topic}`}>
          🃏 Flashcards ({d.flashcards.length})
        </Link>
        <Link className="btn" href={`/he1002/quiz?topic=${topic}`}>
          ✏️ Quiz ({d.quiz.length})
        </Link>
        <Link className="btn primary" href={`/he1002/questions?topic=${topic}`}>
          📝 Exam questions ({d.exam.length})
        </Link>
      </div>

      <div className="lesson-grid">
        <nav className="toc">
          {d.sections.map((s, i) => (
            <a key={s.title} href={`#s${i + 1}`}>
              {i + 1}. {s.title}
            </a>
          ))}
        </nav>
        <div className={`${hide ? "hide-terms" : ""} ${hideF ? "hide-formulas" : ""}`} key={round}>
          {d.sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="card notes-section" style={{ scrollMarginTop: 72 }}>
              <h2>
                <span className="sec-num">{i + 1}</span>
                {s.title}
              </h2>
              {s.intro && <p className="muted small" style={{ marginTop: 0 }}>{s.intro}</p>}
              {s.points.map((p, j) => (
                <div className="point" key={j}>
                  {p.term && (
                    <>
                      <Term>{p.term}</Term>
                      {": "}
                    </>
                  )}
                  <span style={{ whiteSpace: "pre-line" }}>{p.text}</span>
                  {p.eg && <div className="eg">{p.eg}</div>}
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
                          <th key={k}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.slice(1).map((row, r) => (
                        <tr key={r}>
                          {row.map((c, k) => (
                            <Cell key={k} text={c} hideable={hide && k === 0} />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.diagrams && <Graphs gs={s.diagrams} />}
              {s.worked?.map((w, k) => (
                <details key={k} className="worked">
                  <summary>Worked example{s.worked!.length > 1 ? ` ${k + 1}` : ""}</summary>
                  <div style={{ whiteSpace: "pre-line", marginTop: 6 }}>{w.problem}</div>
                  <div className="sol">{w.solution}</div>
                </details>
              ))}
            </section>
          ))}
          <div className="row" style={{ marginTop: 24 }}>
            {prev && (
              <Link className="btn" href={`/he1002/learn/${prev.id}`}>
                ← {prev.name}
              </Link>
            )}
            <span className="spacer" />
            {next && (
              <Link className="btn" href={`/he1002/learn/${next.id}`}>
                {next.name} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
