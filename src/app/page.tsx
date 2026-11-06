import Link from "next/link";
import { Dashboard } from "./Dashboard";

export default function Home() {
  return (
    <div className="page">
      <h1>Master CA2: Orthogonality → DFT</h1>
      <p className="lead">Learn each idea, drill 500 exam-style questions, and keep the original notes one click away.</p>
      <div className="grid cols-3" style={{ marginBottom: 28 }}>
        <Link href="/learn" className="card" style={{ color: "inherit" }}>
          <h2>📘 Learn</h2>
          <p className="muted small" style={{ margin: 0 }}>
            Intuition → key ideas → step-by-step worked examples → exam traps → recall cards, for all five topics.
          </p>
        </Link>
        <Link href="/practice" className="card" style={{ color: "inherit" }}>
          <h2>✍️ Practice</h2>
          <p className="muted small" style={{ margin: 0 }}>
            500 CA2-difficulty questions. Random or by topic, any length, answers after each question, every 5/10, or at the end.
          </p>
        </Link>
        <Link href="/notes" className="card" style={{ color: "inherit" }}>
          <h2>📄 Notes</h2>
          <p className="muted small" style={{ margin: 0 }}>
            Lecture notes, tutorials and the CA2 sample paper, with full-text search that jumps to the right page.
          </p>
        </Link>
      </div>
      <Dashboard />
    </div>
  );
}
