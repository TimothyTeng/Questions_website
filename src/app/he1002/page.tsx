import type { Metadata } from "next";
import Link from "next/link";
import { Dashboard } from "./Dashboard";

export const metadata: Metadata = {
  title: "HE1002 Prep",
  description: "Revise HE1002 Macroeconomics I: notes, flashcards, a formula bank, topic quizzes and exam-format questions built only from the lectures and problem sets.",
};

const CARDS = [
  { href: "/he1002/learn", icon: "📘", name: "Learn", text: "Each lecture as revision notes with every definition, formula, worked example and diagram. Switch on Hide terms to test yourself on the names." },
  { href: "/he1002/flashcards", icon: "🃏", name: "Flashcards", text: "Definition → term cards, hypothetical scenarios to work through, and a Formulas deck. Missed cards come back until you know them." },
  { href: "/he1002/quiz", icon: "✏️", name: "Topic quiz", text: "Short-answer fill-in-the-blanks (plus some MCQs) for every lecture, five at a time with the answers after each five." },
  { href: "/he1002/formulas", icon: "🧮", name: "Formula bank", text: "Every formula in one place, grouped by lecture. Hide the right-hand sides to test yourself, or drill them as flashcards." },
  { href: "/he1002/questions", icon: "📝", name: "Exam questions", text: "Calculation, short-answer, true/false and diagram questions in the exam format, with rubrics, Gemini marking as you go, and a Word download." },
];

export default function He1002Home() {
  return (
    <div className="page">
      <h1>HE1002 · Macroeconomics I</h1>
      <p className="lead">
        Final exam (closed book, calculator allowed, no MCQs): Q1 13 calculations × 3 marks (state the formula, show working) · Q2 9 short answers × 3 marks · Q3 8 true/false with explanation × 3
        marks · Q4 one 2-part diagram question, 10 marks. Everything here comes only from the 12 lecture decks, the problem sets and the exam-format document.
      </p>
      <div className="grid" style={{ marginBottom: 28, gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className="card" style={{ color: "inherit" }}>
            <h2>
              {c.icon} {c.name}
            </h2>
            <p className="muted small" style={{ margin: 0 }}>
              {c.text}
            </p>
          </Link>
        ))}
      </div>
      <Dashboard />
    </div>
  );
}
