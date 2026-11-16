import type { Metadata } from "next";
import Link from "next/link";
import { LaDashboard } from "./LaDashboard";

export const metadata: Metadata = {
  title: "SC1004 Prep",
  description: "Learn and practise SC1004 Linear Algebra for Computing: vectors to vector spaces, orthogonality to the DFT, with final-exam-style questions.",
};

export default function Sc1004Home() {
  return (
    <div className="page">
      <h1>SC1004 · Linear Algebra for Computing</h1>
      <p className="lead">
        The final is 2 hours, restricted open book (one A4 sheet): 20 five-option MCQs worth 5 marks each, about half on each half of the semester. Learn each idea, then drill until it sticks.
      </p>
      <div className="grid" style={{ marginBottom: 28, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <Link href="/sc1004/learn" className="card" style={{ color: "inherit" }}>
          <h2>📘 Learn</h2>
          <p className="muted small" style={{ margin: 0 }}>
            12 topics, first and second half: intuition → key ideas → step-by-step worked examples → exam traps → recall cards, with interactive figures.
          </p>
        </Link>
        <Link href="/sc1004/practice" className="card" style={{ color: "inherit" }}>
          <h2>✍️ Practice</h2>
          <p className="muted small" style={{ margin: 0 }}>
            1,200+ questions by topic or at random, including past-paper-style questions written to the difficulty of the final. Answers after each question, every 5/10 or at the end.
          </p>
        </Link>
        <Link href="/sc1004/mock" className="card" style={{ color: "inherit" }}>
          <h2>⏱ Mock final</h2>
          <p className="muted small" style={{ margin: 0 }}>
            20 questions in the real paper&apos;s mix (10 per half, mostly past-paper style) against a 2-hour clock, marked out of 100.
          </p>
        </Link>
      </div>
      <LaDashboard />
    </div>
  );
}
