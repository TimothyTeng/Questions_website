import type { Metadata } from "next";
import Link from "next/link";
import { Dashboard } from "./Dashboard";

export const metadata: Metadata = {
  title: "SC1005 Prep",
  description: "Learn and practise SC1005 Digital Logic: number systems to FSMs in Verilog, with interactive circuits and past-paper-style questions.",
};

export default function Sc1005Home() {
  return (
    <div className="page">
      <h1>SC1005 · Digital Logic</h1>
      <p className="lead">
        From number systems and Boolean algebra to flip-flops, FSMs and Verilog. Recent finals are 1 hour, closed book: a block of five-option OMR MCQs (Verilog, flip-flops, reading circuits and state
        diagrams) followed by structured design questions (gate circuits and timing, writing Verilog modules, building circuits from MUXes and comparators). Older papers add K-maps, 2&apos;s complement and
        BCD arithmetic, CMOS and active-low design.
      </p>
      <div className="grid" style={{ marginBottom: 28, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <Link href="/sc1005/learn" className="card" style={{ color: "inherit" }}>
          <h2>📘 Learn</h2>
          <p className="muted small" style={{ margin: 0 }}>
            13 chapters with live visualisations: toggle gate inputs and watch signals propagate, minimise K-maps, ripple carries through adders, see CMOS transistors switch, clock flip-flops and step FSMs
            through input sequences.
          </p>
        </Link>
        <Link href="/sc1005/practice" className="card" style={{ color: "inherit" }}>
          <h2>✍️ Practice</h2>
          <p className="muted small" style={{ margin: 0 }}>
            400 questions at past-paper difficulty, built from the lectures, tutorials and past papers: OMR-style MCQs, short answers (Boolean expressions marked by truth table) and structured design / Verilog
            questions with rubrics.
          </p>
        </Link>
      </div>
      <Dashboard />
    </div>
  );
}
