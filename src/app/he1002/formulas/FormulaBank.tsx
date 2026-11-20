"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_FORMULAS } from "@/data/he1002";
import { useCardProgress } from "@/lib/he1002/store";
import { TOPICS } from "@/lib/he1002/topics";
import { FormulaBox } from "@/components/he1002/FormulaBox";

export function FormulaBank() {
  const [hide, setHide] = useState(false);
  const [round, setRound] = useState(0);
  const [q, setQ] = useState("");
  const progress = useCardProgress();
  const needle = q.trim().toLowerCase();
  const known = ALL_FORMULAS.filter((f) => progress[f.id]?.last).length;

  return (
    <div className="page">
      <h1>Formula bank</h1>
      <p className="lead">
        All {ALL_FORMULAS.length} formulas from the lectures, grouped by lecture. Turn on <em>Hide formulas</em> and recall each one from its name, or drill them as flashcards ({known}/{ALL_FORMULAS.length}{" "}
        known so far). In the exam&apos;s calculation section you must state the formula you use.
      </p>
      <div className="row" style={{ marginBottom: 20 }}>
        <button
          className={`chip ${hide ? "on" : ""}`}
          onClick={() => {
            setHide((h) => !h);
            setRound((r) => r + 1);
          }}
        >
          🙈 Hide formulas {hide ? "on" : "off"}
        </button>
        <input type="search" placeholder="Search formulas…" value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 260 }} />
        <span className="spacer" />
        <Link className="btn primary" href="/he1002/flashcards?deck=formulas">
          🃏 Drill all formulas
        </Link>
      </div>
      <div className={hide ? "hide-formulas" : ""} key={round}>
        {TOPICS.map((t) => {
          const fs = ALL_FORMULAS.filter(
            (f) => f.topic === t.id && (!needle || `${f.name} ${f.expr} ${f.note ?? ""} ${f.section}`.toLowerCase().includes(needle)),
          );
          if (!fs.length) return null;
          return (
            <section key={t.id} className="card notes-section" style={{ borderTop: `4px solid ${t.color}` }}>
              <div className="row" style={{ marginBottom: 6 }}>
                <h2 style={{ margin: 0 }}>
                  <span className="sec-num">{t.n}</span>
                  {t.name}
                </h2>
                <span className="spacer" />
                <Link className="btn sm" href={`/he1002/flashcards?deck=formulas&topic=${t.id}`}>
                  Drill these {fs.length}
                </Link>
                <Link className="btn sm" href={`/he1002/learn/${t.id}`}>
                  Notes
                </Link>
              </div>
              <div className="formulas" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {fs.map((f) => (
                  <FormulaBox key={f.id} f={f} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
