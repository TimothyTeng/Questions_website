import Link from "next/link";

const COURSES = [
  {
    href: "/sc1004",
    code: "SC1004",
    title: "Linear Algebra for Computing",
    blurb: "All 12 topics from vectors to the DFT: lessons with interactive figures, 1,200+ exam-style questions and a timed 20-question mock final.",
    color: "var(--t-orth)",
  },
  {
    href: "/sc1001",
    code: "SC1001",
    title: "Intro to Computational Thinking & Programming",
    blurb: "400+ MCQ / short-answer questions, HackerEarth-style Python coding in the browser and a 90-minute mock quiz.",
    color: "var(--t-ls)",
  },
  {
    href: "/sc1005",
    code: "SC1005",
    title: "Digital Logic",
    blurb: "13 chapters from number systems to FSMs in Verilog, taught with live circuit, K-map, timing and state-machine visualisations, plus 400 past-paper-style questions.",
    color: "var(--t-eig)",
  },
  {
    href: "/hp1000",
    code: "HP1000",
    title: "Introduction to Psychology",
    blurb: "All 11 lectures as revision notes, scenario flashcards for naming theories and terms, and fill-in-the-blank, MCQ and short-answer questions marked in batches of 5, with a Word download.",
    color: "var(--t-cx)",
  },
  {
    href: "/he1002",
    code: "HE1002",
    title: "Macroeconomics I",
    blurb: "All 12 lectures as notes with diagrams, term and scenario flashcards, a formula bank, fill-in-the-blank topic quizzes, and exam-format questions with rubrics and Gemini marking, downloadable as Word.",
    color: "var(--t-alg)",
  },
];

export default function Home() {
  return (
    <div className="page">
      <h1>Course prep</h1>
      <p className="lead">Pick a course. Progress is saved in this browser.</p>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {COURSES.map((c) => (
          <Link key={c.href} href={c.href} className="card" style={{ color: "inherit", borderTop: `4px solid ${c.color}` }}>
            <div className="small muted">{c.code}</div>
            <h2>{c.title}</h2>
            <p className="muted small" style={{ margin: 0 }}>
              {c.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
