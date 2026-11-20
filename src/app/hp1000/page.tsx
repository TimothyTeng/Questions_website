import type { Metadata } from "next";
import Link from "next/link";
import { Dashboard } from "./Dashboard";

export const metadata: Metadata = {
  title: "HP1000 Prep",
  description: "Revise HP1000 Introduction to Psychology: revision notes, scenario flashcards and exam-style questions built only from the lectures and practice questions.",
};

export default function Hp1000Home() {
  return (
    <div className="page">
      <h1>HP1000 · Introduction to Psychology</h1>
      <p className="lead">
        Final exam: Tue 24 Nov 2026, 9:00–11:30 am, Hall N, closed book. Section A: 48 MCQs (60 marks) · Section B: 10 fill-in-the-blanks (10 marks; one blank per answer, spelling slips not
        penalised) · Section C: 5 multi-part short-answer questions (30 marks). Cumulative, but material after recess week carries more weight. Everything here comes only from the 11 lecture decks and
        the official practice document.
      </p>
      <div className="grid" style={{ marginBottom: 28, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <Link href="/hp1000/learn" className="card" style={{ color: "inherit" }}>
          <h2>📘 Learn</h2>
          <p className="muted small" style={{ margin: 0 }}>
            Each lecture as tight revision notes: every term with its slide definition and an everyday example. Switch on <em>Hide terms</em> to test yourself on the names.
          </p>
        </Link>
        <Link href="/hp1000/flashcards" className="card" style={{ color: "inherit" }}>
          <h2>🃏 Flashcards</h2>
          <p className="muted small" style={{ margin: 0 }}>
            A hypothetical scenario on the front; name the theory or term. Type your guess, flip, and the cards you miss come back until you know them.
          </p>
        </Link>
        <Link href="/hp1000/questions" className="card" style={{ color: "inherit" }}>
          <h2>✍️ Questions</h2>
          <p className="muted small" style={{ margin: 0 }}>
            Fill-in-the-blanks (auto-marked), MCQs and Section C-style short answers, five per topic at a time with answers after each five. Download any set as a Word document.
          </p>
        </Link>
      </div>
      <Dashboard />
    </div>
  );
}
