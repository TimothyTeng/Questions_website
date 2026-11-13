import type { Metadata } from "next";
import Link from "next/link";
import { ScDashboard } from "./ScDashboard";

export const metadata: Metadata = {
  title: "SC1001 Prep",
  description: "Practise SC1001 Introduction to Computational Thinking and Programming: MCQ, short answer, open-ended and HackerEarth-style Python coding.",
};

const RESOURCES = [
  {
    href: "https://entuedu.sharepoint.com/sites/lib-repository/exam-question-papers",
    title: "NTU Library exam paper database",
    note: "Official past papers (NTU login; questions only). Quiz-only courses may not be listed — ask your lecturer for past quizzes.",
  },
  {
    href: "https://github.com/adriangohjw/NTU_CompSci",
    title: "adriangohjw/NTU_CompSci (GitHub)",
    note: "Free tutorials, labs and assignment answers from the predecessor course CZ1003 Introduction to Computational Thinking.",
  },
  {
    href: "https://www.studocu.com/sg/course/nanyang-technological-university/intro-of-computational-thinking/5726278",
    title: "Studocu — SC1003 / CZ1003",
    note: "Student-uploaded tutorials and solutions for the sibling course; partly paywalled.",
  },
  {
    href: "https://ntu-dsai.github.io/docs/Module-Review/Y1S1/sc1003-introduction-to-computational-thinking",
    title: "NTU-DSAI module review (SC1003)",
    note: "Topic overview and study tips for the sibling course.",
  },
];

export default function Sc1001Home() {
  return (
    <div className="page">
      <h1>SC1001 · Intro to Computational Thinking &amp; Programming</h1>
      <p className="lead">
        The final quiz is 90 minutes, closed book, on HackerEarth: Python coding (1 mark per test case passed) plus MCQ / short answer. Everything taught is examinable.
      </p>
      <div className="grid" style={{ marginBottom: 28, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <Link href="/sc1001/practice" className="card" style={{ color: "inherit" }}>
          <h2>✍️ Practice</h2>
          <p className="muted small" style={{ margin: 0 }}>
            400+ questions over 14 topics: MCQ, “what is printed” short answers and open-ended questions marked by AI or by rubric.
          </p>
        </Link>
        <Link href="/sc1001/code" className="card" style={{ color: "inherit" }}>
          <h2>💻 Coding</h2>
          <p className="muted small" style={{ margin: 0 }}>
            40+ LeetCode easy–medium style problems in a HackerEarth-like editor. Python 3.14 runs in your browser; hidden test cases, 1 mark each.
          </p>
        </Link>
        <Link href="/sc1001/mock" className="card" style={{ color: "inherit" }}>
          <h2>⏱ Mock test</h2>
          <p className="muted small" style={{ margin: 0 }}>
            A timed 90-minute quiz mixing questions and coding, or a test built from questions you pick.
          </p>
        </Link>
      </div>
      <ScDashboard />
      <div className="card" style={{ marginTop: 20 }}>
        <h2>Past papers &amp; resources</h2>
        <p className="small muted">
          No SC1001 past papers or quiz banks are publicly available. LeetCode has no official API and its terms forbid scraping, so the coding problems here are original, in HackerEarth stdin/stdout format, and link to the
          similar LeetCode problem.
        </p>
        <ul className="small" style={{ paddingLeft: 20, marginBottom: 0 }}>
          {RESOURCES.map((r) => (
            <li key={r.href} style={{ marginBottom: 6 }}>
              <a href={r.href} target="_blank" rel="noreferrer">
                {r.title} ↗
              </a>{" "}
              <span className="muted">— {r.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
