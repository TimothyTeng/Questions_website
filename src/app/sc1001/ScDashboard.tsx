"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getProblems, getScBank } from "@/lib/sc1001/bank";
import { resetProblemStats, resetScProgress, useProblemStats, useScProgress } from "@/lib/sc1001/store";
import { SC_TOPICS } from "@/lib/sc1001/topics";

export function ScDashboard() {
  const bank = useMemo(() => getScBank(), []);
  const progress = useScProgress();
  const stats = useProblemStats();
  const problems = getProblems();
  const solved = problems.filter((p) => stats[p.slug] && stats[p.slug].best === stats[p.slug].total).length;
  const marks = problems.reduce((s, p) => s + (stats[p.slug]?.best ?? 0), 0);
  const allMarks = problems.reduce((s, p) => s + p.tests.length, 0);

  const rows = SC_TOPICS.map((t) => {
    const qs = bank.filter((q) => q.topic === t.id);
    const seen = qs.filter((q) => progress[q.id]);
    const right = seen.filter((q) => progress[q.id].last);
    return { t, total: qs.length, seen: seen.length, right: right.length };
  });

  return (
    <div className="card">
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Your progress</h2>
        <span className="spacer" />
        <span className="small muted">
          Coding: {solved}/{problems.length} solved · {marks}/{allMarks} test-case marks
        </span>
        <button
          className="btn sm"
          onClick={() => {
            if (confirm("Reset all SC1001 progress in this browser?")) {
              resetScProgress();
              resetProblemStats();
            }
          }}
        >
          Reset
        </button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 }}>
        {rows.map(({ t, total, seen, right }) => (
          <Link key={t.id} href={`/sc1001/practice?topic=${t.id}`} style={{ color: "inherit" }}>
            <div className="row small">
              <span className="dot" style={{ background: t.color }} />
              <span>{t.name}</span>
              <span className="muted">{t.week}</span>
              <span className="spacer" />
              <span className="muted">
                {right}/{seen} right · {seen}/{total} seen
              </span>
            </div>
            <div className="bar" style={{ marginTop: 4 }}>
              <div style={{ width: `${(100 * right) / Math.max(1, total)}%`, background: t.color }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
