import type { Metadata } from "next";
import Link from "next/link";
import { Dashboard } from "./Dashboard";

export const metadata: Metadata = {
  title: "HE1004 Prep",
  description: "Revise HE1004 Mathematics for Economists I: notes with graphs, method flashcards, MCQ quizzes and past-paper-style questions with rubrics, built only from the lecture notes, assignments and past paper.",
};

const CARDS = [
  { href: "/he1004/learn", icon: "📘", name: "Learn", text: "Each lecture note as revision notes with every definition, rule and worked example, plus graphs of the functions, tangents, areas and optima. Hide terms or formulas to test yourself." },
  { href: "/he1004/flashcards", icon: "🃏", name: "Flashcards", text: "Term cards, method cards that drill how to solve each question type in the assignments and past paper, and formula cards. Missed cards come back until you know them." },
  { href: "/he1004/quiz", icon: "✏️", name: "MCQ quiz", text: "MCQs plus quick numeric answers for every topic, five at a time with the worked answers after each five." },
  { href: "/he1004/formulas", icon: "🧮", name: "Formula bank", text: "Every rule in one place, grouped by topic. Hide the right-hand sides to test yourself, or drill them as flashcards." },
  { href: "/he1004/questions", icon: "📝", name: "Exam questions", text: "5-mark parts in the past-paper format, with rubrics, self-marking or Gemini marking (photo of your working allowed), mock papers and a Word download." },
];

export default function He1004Home() {
  return (
    <div className="page">
      <h1>HE1004 · Mathematics for Economists I</h1>
      <p className="lead">
        Final paper format (from the past paper): 4 questions × 5 parts (a)–(e) × 5 marks = 100 marks: calculations with full working, a few &ldquo;which TWO statements are wrong&rdquo; parts and
        short write-and-explain parts. Everything here comes only from Lecture Notes 1–11, Assignments 1–10 and the past-paper questions.
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
