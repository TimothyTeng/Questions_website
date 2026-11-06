"use client";

import { useMemo, useState } from "react";
import index from "@/data/notes-index.json";

interface Doc {
  id: string;
  file: string;
  title: string;
  group: string;
  kind: "pdf" | "image" | "download";
}

const DOCS: Doc[] = [
  { id: "ch6-orthogonality", file: "ch6-orthogonality.pdf", title: "Ch 6 · Orthogonality (lecture notes)", group: "Orthogonality", kind: "pdf" },
  { id: "tut6-orthogonality", file: "tut6-orthogonality.pdf", title: "Tutorial 6 questions", group: "Orthogonality", kind: "pdf" },
  { id: "ch7-least-squares", file: "ch7-least-squares.pdf", title: "Ch 7 · Least Squares (lecture notes)", group: "Least Squares", kind: "pdf" },
  { id: "tut7-least-squares", file: "tut7-least-squares.pdf", title: "Tutorial 7 questions", group: "Least Squares", kind: "pdf" },
  { id: "ch8-eigen", file: "ch8-eigen.pdf", title: "Ch 8.1 · Eigenvalues & Eigenvectors (lecture notes)", group: "Eigenvalues", kind: "pdf" },
  { id: "tut8-eigen", file: "tut8-eigen.pdf", title: "Tutorial 8 questions", group: "Eigenvalues", kind: "pdf" },
  { id: "eigen-poster", file: "eigen-if-then-poster.png", title: "Eigen “If → Then” poster", group: "Eigenvalues", kind: "image" },
  { id: "ch8a-complex-dft", file: "ch8a-complex-dft.pdf", title: "Ch 8A · Complex Numbers & DFT (lecture notes)", group: "Complex Numbers & DFT", kind: "pdf" },
  { id: "tut8a-complex-dft", file: "tut8a-complex-dft.pdf", title: "Tutorial 8A questions", group: "Complex Numbers & DFT", kind: "pdf" },
  { id: "ca2-sample", file: "ca2-sample-questions.docx", title: "CA2 sample questions (.docx)", group: "Exam", kind: "download" },
];

const GROUPS = [...new Set(DOCS.map((d) => d.group))];
const INDEX = index as { doc: string; page: number; text: string }[];

export function Notes() {
  const [docId, setDocId] = useState(DOCS[0].id);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const doc = DOCS.find((d) => d.id === docId)!;

  const hits = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return [];
    return INDEX.filter((p) => {
      const t = p.text.toLowerCase();
      return words.every((w) => t.includes(w));
    }).slice(0, 60);
  }, [query]);

  const open = (id: string, pg = 1) => {
    setDocId(id);
    setPage(pg);
  };

  const src = `/notes/${doc.file}#page=${page}&view=FitH`;

  return (
    <div className="page" style={{ maxWidth: 1400 }}>
      <h1>Notes</h1>
      <p className="lead">The original lecture notes and tutorials. Search the text, then jump straight to the page.</p>
      <div className="notes-layout">
        <aside className="card" style={{ padding: 12 }}>
          <input type="search" placeholder="Search notes, e.g. “normal equation”, “Gram”, “DFT matrix”" value={query} onChange={(e) => setQuery(e.target.value)} />
          {query.trim().length > 1 && (
            <div style={{ margin: "8px 0 14px", maxHeight: 340, overflowY: "auto" }}>
              <div className="small muted" style={{ padding: "4px" }}>
                {hits.length === 60 ? "60+" : hits.length} matching page{hits.length === 1 ? "" : "s"}
                {hits.length === 0 && " — many slides are images, so try the Learn tab too"}
              </div>
              {hits.map((h) => (
                <button key={`${h.doc}-${h.page}`} className="hit" onClick={() => open(h.doc, h.page)}>
                  <strong>
                    {DOCS.find((d) => d.id === h.doc)?.title} · p.{h.page}
                  </strong>
                  <div className="muted">
                    <Snippet text={h.text} query={query} />
                  </div>
                </button>
              ))}
            </div>
          )}
          {GROUPS.map((g) => (
            <div key={g} style={{ marginTop: 10 }}>
              <div className="small muted" style={{ fontWeight: 600, padding: "0 10px 4px" }}>
                {g}
              </div>
              {DOCS.filter((d) => d.group === g).map((d) =>
                d.kind === "download" ? (
                  <a key={d.id} className="doc-item" href={`/notes/${d.file}`} download>
                    ⬇ {d.title}
                  </a>
                ) : (
                  <button key={d.id} className={`doc-item ${d.id === docId ? "on" : ""}`} onClick={() => open(d.id)}>
                    {d.kind === "image" ? "🖼 " : "📄 "}
                    {d.title}
                  </button>
                ),
              )}
            </div>
          ))}
        </aside>
        <div>
          <div className="row" style={{ marginBottom: 8 }}>
            <strong>{doc.title}</strong>
            {doc.kind === "pdf" && <span className="small muted">page {page}</span>}
            <span className="spacer" />
            <a className="btn" href={`/notes/${doc.file}`} target="_blank" rel="noreferrer">
              Open in new tab ↗
            </a>
          </div>
          {doc.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/notes/${doc.file}`} alt={doc.title} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border)" }} />
          ) : (
            <iframe key={src} className="viewer" src={src} title={doc.title} />
          )}
        </div>
      </div>
    </div>
  );
}

function Snippet({ text, query }: { text: string; query: string }) {
  const w = query.toLowerCase().split(/\s+/).filter((x) => x.length > 1)[0] ?? "";
  const i = text.toLowerCase().indexOf(w);
  const from = Math.max(0, i - 60);
  const s = (from > 0 ? "…" : "") + text.slice(from, i + w.length + 90) + "…";
  const j = s.toLowerCase().indexOf(w);
  if (j < 0 || !w) return <>{s}</>;
  return (
    <>
      {s.slice(0, j)}
      <mark>{s.slice(j, j + w.length)}</mark>
      {s.slice(j + w.length)}
    </>
  );
}
