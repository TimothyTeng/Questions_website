"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getProblems } from "@/lib/sc1001/bank";
import { useProblemStats } from "@/lib/sc1001/store";
import { SC_TOPICS, scTopicById } from "@/lib/sc1001/topics";
import type { ScTopicId } from "@/lib/sc1001/types";

type Status = "all" | "todo" | "partial" | "solved";

export function ProblemList() {
  const problems = getProblems();
  const stats = useProblemStats();
  const [topic, setTopic] = useState<ScTopicId | "all">("all");
  const [diff, setDiff] = useState<"all" | "easy" | "medium">("all");
  const [status, setStatus] = useState<Status>("all");
  const [q, setQ] = useState("");

  const usedTopics = useMemo(() => SC_TOPICS.filter((t) => problems.some((p) => p.topics.includes(t.id))), [problems]);
  const statusOf = (slug: string): Exclude<Status, "all"> => {
    const s = stats[slug];
    return !s ? "todo" : s.best === s.total ? "solved" : "partial";
  };
  const shown = problems.filter(
    (p) =>
      (topic === "all" || p.topics.includes(topic)) &&
      (diff === "all" || p.difficulty === diff) &&
      (status === "all" || statusOf(p.slug) === status) &&
      p.title.toLowerCase().includes(q.toLowerCase()),
  );
  const solved = problems.filter((p) => statusOf(p.slug) === "solved").length;

  return (
    <div className="page">
      <h1>Coding problems</h1>
      <p className="lead">
        HackerEarth-style: read from standard input, print to standard output, 1 mark per hidden test case. Runs Python 3.14 in your browser. {solved}/{problems.length} fully solved.
      </p>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row" style={{ marginBottom: 10 }}>
          <input type="search" placeholder="Search problems…" value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 280 }} />
          <select value={topic} onChange={(e) => setTopic(e.target.value as ScTopicId | "all")} aria-label="Topic">
            <option value="all">All topics</option>
            {usedTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {(["all", "easy", "medium"] as const).map((d) => (
            <button key={d} className={`chip ${diff === d ? "on" : ""}`} onClick={() => setDiff(d)}>
              {d === "all" ? "Any difficulty" : d === "easy" ? "Easy" : "Medium"}
            </button>
          ))}
          {(["all", "todo", "partial", "solved"] as const).map((s) => (
            <button key={s} className={`chip ${status === s ? "on" : ""}`} onClick={() => setStatus(s)}>
              {s === "all" ? "Any status" : s === "todo" ? "Not tried" : s === "partial" ? "Partial" : "Solved"}
            </button>
          ))}
        </div>
        <table className="plist">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Difficulty</th>
              <th>Topics</th>
              <th>Best score</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((p) => {
              const s = stats[p.slug];
              return (
                <tr key={p.slug}>
                  <td>
                    <Link href={`/sc1001/code/${p.slug}`}>{p.title}</Link>
                  </td>
                  <td>
                    <span className={`badge diff-${p.difficulty}`}>{p.difficulty === "easy" ? "Easy" : "Medium"}</span>
                  </td>
                  <td className="small muted">{p.topics.map((t) => scTopicById(t).name).join(", ")}</td>
                  <td className="small">{s ? `${s.best} / ${s.total}${s.best === s.total ? " ✓" : ""}` : <span className="muted">—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {shown.length === 0 && <p className="muted small">No problems match these filters.</p>}
      </div>
    </div>
  );
}
