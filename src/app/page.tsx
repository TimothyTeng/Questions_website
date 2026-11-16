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
