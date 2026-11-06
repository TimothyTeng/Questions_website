"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getBank } from "@/lib/bank";
import { resetProgress, useProgress } from "@/lib/progress";
import { TOPICS } from "@/lib/topics";

export function Dashboard() {
  const bank = useMemo(() => getBank(), []);
  const progress = useProgress();
  const stats = TOPICS.map((t) => {
    const qs = bank.filter((q) => q.topic === t.id);
    const seen = qs.filter((q) => progress[q.id]);
    const mastered = seen.filter((q) => progress[q.id].last);
    return { t, total: qs.length, seen: seen.length, mastered: mastered.length, wrong: seen.length - mastered.length };
  });
  const totalSeen = stats.reduce((s, x) => s + x.seen, 0);
  const totalWrong = stats.reduce((s, x) => s + x.wrong, 0);
  const totalMastered = stats.reduce((s, x) => s + x.mastered, 0);

  return (
    <section className="card">
      <div className="row" style={{ marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Your progress</h2>
        <span className="spacer" />
        <span className="small muted">
          {totalMastered} mastered · {totalSeen} attempted · {500 - totalSeen} unseen
        </span>
        {totalSeen > 0 && (
          <button className="btn small" onClick={() => confirm("Reset all progress on this device?") && resetProgress()}>
            Reset
          </button>
        )}
      </div>
      <div className="grid cols-5">
        {stats.map(({ t, total, seen, mastered, wrong }) => (
          <div key={t.id}>
            <div className="row small" style={{ marginBottom: 4 }}>
              <span className="dot" style={{ background: t.color }} />
              <strong>{t.name}</strong>
            </div>
            <div className="bar" title={`${mastered} of ${total} correct on last attempt`}>
              <div style={{ width: `${(100 * mastered) / total}%`, background: t.color }} />
            </div>
            <div className="small muted" style={{ marginTop: 4 }}>
              {mastered}/{total} mastered{wrong ? ` · ${wrong} to fix` : ""}
              {seen === 0 ? " · not started" : ""}
            </div>
            <div className="row small" style={{ marginTop: 4, gap: 12 }}>
              <Link href={`/learn/${t.id}`}>Learn</Link>
              <Link href={`/practice?topic=${t.id}`}>Practise</Link>
            </div>
          </div>
        ))}
      </div>
      {totalWrong > 0 && (
        <p className="small" style={{ marginBottom: 0, marginTop: 16 }}>
          You have <strong>{totalWrong}</strong> question{totalWrong === 1 ? "" : "s"} whose last attempt was wrong — in Practice choose <em>Pool: Got wrong</em> to redo them.
        </p>
      )}
      <p className="small muted" style={{ marginBottom: 0 }}>Progress is saved in this browser only.</p>
    </section>
  );
}
