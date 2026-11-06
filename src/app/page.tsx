import Link from "next/link";
import { Dashboard } from "./Dashboard";

export default function Home() {
  return (
    <div className="page">
      <h1>Master CA2: Orthogonality → DFT</h1>
      <p className="lead">Learn each idea, then drill 500 exam-style questions until it sticks.</p>
      <div className="grid" style={{ marginBottom: 28, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
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
      </div>
      <Dashboard />
    </div>
  );
}
