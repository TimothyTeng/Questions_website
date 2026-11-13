"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { reviewCode, type CodeReview } from "@/lib/sc1001/ai";
import type { RunResult } from "@/lib/sc1001/harness";
import { normalizeOutput, verdictOf, VERDICT_LABEL, type Verdict } from "@/lib/sc1001/judge";
import { preloadPython, runPython, usePyStatus } from "@/lib/sc1001/python";
import { loadDraft, recordSubmission, saveDraft, usePref } from "@/lib/sc1001/store";
import type { CodingProblem } from "@/lib/sc1001/types";
import { AiBar, useAi } from "./AiBar";
import { Md } from "./Md";

const CodeEditor = dynamic(() => import("./CodeEditor").then((m) => m.CodeEditor), {
  ssr: false,
  loading: () => <div className="muted small" style={{ padding: 12 }}>Loading editor…</div>,
});

interface CaseResult {
  input: string;
  expected?: string;
  r: RunResult;
  verdict?: Verdict;
}

type Console =
  | { kind: "idle" }
  | { kind: "running"; label: string }
  | { kind: "run"; custom: boolean; cases: CaseResult[] }
  | { kind: "submit"; cases: CaseResult[]; passed: number };

export function CodingWorkspace({
  problem: p,
  mode = "practice",
  code: controlledCode,
  onCodeChange,
  onSubmitted,
}: {
  problem: CodingProblem;
  /** "mock": no AI review / reference solution / hidden-case reveal, code owned by the caller. */
  mode?: "practice" | "mock";
  code?: string;
  onCodeChange?: (code: string) => void;
  onSubmitted?: (passed: number, total: number) => void;
}) {
  const py = usePyStatus();
  const ai = useAi();
  const [theme, setTheme] = usePref("editor-theme", "auto");
  const systemDark = useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-color-scheme: dark)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
  const dark = theme === "dark" || (theme === "auto" && systemDark);
  const [fontSizeStr, setFontSize] = usePref("editor-font", "14");
  const fontSize = Number(fontSizeStr) || 14;
  const [ownCode, setOwnCode] = useState(() => (mode === "practice" ? (loadDraft(p.slug) ?? p.starter) : p.starter));
  const code = controlledCode ?? ownCode;
  const [useCustom, setUseCustom] = useState(false);
  const [custom, setCustom] = useState(p.samples[0]?.input ?? "");
  const [out, setOut] = useState<Console>({ kind: "idle" });
  const [split, setSplit] = useState(42);
  const [showRef, setShowRef] = useState(false);
  const [revealFail, setRevealFail] = useState(false);
  const [review, setReview] = useState<CodeReview | { error: string } | "loading" | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const limit = p.timeLimitMs ?? 3000;
  const busy = out.kind === "running";

  useEffect(() => {
    preloadPython().catch(() => {});
  }, []);

  const setCode = (v: string) => {
    if (onCodeChange) onCodeChange(v);
    else setOwnCode(v);
    if (mode === "practice") saveDraft(p.slug, v === p.starter ? null : v);
  };

  const runCases = async (cases: { input: string; output?: string }[], label: string) => {
    const results: CaseResult[] = [];
    for (let i = 0; i < cases.length; i++) {
      setOut({ kind: "running", label: `${label} ${cases.length > 1 ? `${i + 1}/${cases.length}` : ""}…` });
      const r = await runPython(code, cases[i].input, limit);
      results.push({ input: cases[i].input, expected: cases[i].output, r, verdict: cases[i].output === undefined ? undefined : verdictOf(r, cases[i].output!) });
    }
    return results;
  };

  const run = async () => {
    const cases = useCustom ? [{ input: custom }] : p.samples;
    const results = await runCases(cases, useCustom ? "Running" : "Running sample");
    setOut({ kind: "run", custom: useCustom, cases: results });
  };

  const submit = async () => {
    setReview(null);
    setRevealFail(false);
    const results = await runCases(p.tests, "Running test case");
    const passed = results.filter((c) => c.verdict === "AC").length;
    setOut({ kind: "submit", cases: results, passed });
    recordSubmission(p.slug, passed, p.tests.length);
    onSubmitted?.(passed, p.tests.length);
  };

  const askReview = async () => {
    if (out.kind !== "submit") return;
    setReview("loading");
    const fail = out.cases.find((c) => c.verdict !== "AC");
    const failText = fail ? `input:\n${fail.input}\nexpected:\n${fail.expected}\ngot:\n${fail.r.timedOut ? "(time limit exceeded)" : fail.r.error || fail.r.stdout}` : null;
    try {
      setReview(await reviewCode(p, code, out.passed, out.cases.length, failText, ai.model));
    } catch (e) {
      setReview({ error: String((e as Error)?.message ?? e) });
    }
  };

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    const box = wrap.current!.getBoundingClientRect();
    const move = (ev: PointerEvent) => setSplit(Math.min(70, Math.max(25, ((ev.clientX - box.left) / box.width) * 100)));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className="ide" ref={wrap} style={{ "--split": `${split}%` } as React.CSSProperties}>
      <section className="ide-problem">
        <div className="row" style={{ marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>{p.title}</h2>
          <span className={`badge diff-${p.difficulty}`}>{p.difficulty === "easy" ? "Easy" : "Medium"}</span>
          <span className="badge">{p.tests.length} test cases · {p.tests.length} marks</span>
        </div>
        <Md text={p.statement} />
        <h4>Input format</h4>
        <Md text={p.inputFormat} />
        <h4>Output format</h4>
        <Md text={p.outputFormat} />
        <h4>Constraints</h4>
        <Md text={p.constraints} />
        {p.samples.map((s, i) => (
          <div key={i} className="sample">
            <div className="sample-io">
              <div>
                <div className="sample-label">
                  Sample input {p.samples.length > 1 ? i + 1 : ""}
                  <button className="link-btn" onClick={() => navigator.clipboard?.writeText(s.input)}>
                    Copy
                  </button>
                </div>
                <pre className="code">{s.input}</pre>
              </div>
              <div>
                <div className="sample-label">Sample output {p.samples.length > 1 ? i + 1 : ""}</div>
                <pre className="code">{s.output}</pre>
              </div>
            </div>
            {s.explanation && <Md text={`**Explanation:** ${s.explanation}`} className="small" />}
          </div>
        ))}
        <p className="small muted">
          Read input with <code>input()</code> or <code>sys.stdin</code> and print only the answer. Don’t print prompts like <code>input(&quot;Enter n: &quot;)</code> — they become part of your output, as on HackerEarth.
          {p.leetcode && mode === "practice" && (
            <>
              {" "}
              Similar problem:{" "}
              <a href={p.leetcode} target="_blank" rel="noreferrer">
                LeetCode ↗
              </a>
            </>
          )}
        </p>
      </section>

      <div className="ide-divider" onPointerDown={startDrag} role="separator" aria-orientation="vertical" />

      <section className="ide-right">
        <div className="ide-toolbar">
          <span className="badge" title={py.error}>
            {py.state === "ready" ? `Python ${py.version}` : py.state === "error" ? "Python failed to load" : `Python 3 · loading…`}
          </span>
          <span className="spacer" />
          <button className="btn sm" onClick={() => setFontSize(String(Math.max(11, fontSize - 1)))} aria-label="Smaller font">
            A−
          </button>
          <button className="btn sm" onClick={() => setFontSize(String(Math.min(22, fontSize + 1)))} aria-label="Larger font">
            A+
          </button>
          <button className="btn sm" onClick={() => setTheme(dark ? "light" : "dark")}>
            {dark ? "☀ Light" : "☾ Dark"}
          </button>
          <button
            className="btn sm"
            onClick={() => {
              if (confirm("Reset the editor to the starter code?")) setCode(p.starter);
            }}
          >
            Reset
          </button>
        </div>
        <div className="ide-editor">
          <CodeEditor value={code} onChange={setCode} dark={dark} fontSize={fontSize} />
        </div>
        <div className="ide-console">
          <label className="row small" style={{ gap: 6 }}>
            <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} /> Provide custom input
          </label>
          {useCustom && <textarea className="mono-input" rows={4} value={custom} onChange={(e) => setCustom(e.target.value)} spellCheck={false} aria-label="Custom input" />}
          <ConsoleView out={out} mode={mode} revealFail={revealFail} />
          {out.kind === "submit" && mode === "practice" && (
            <div className="stack" style={{ marginTop: 10 }}>
              <div className="row">
                {out.passed < out.cases.length && (
                  <button className="btn sm" onClick={() => setRevealFail((v) => !v)}>
                    {revealFail ? "Hide" : "Show"} first failing case
                  </button>
                )}
                <button className="btn sm" onClick={() => setShowRef((v) => !v)}>
                  {showRef ? "Hide" : "Show"} reference solution
                </button>
                <button className="btn sm" disabled={!ai.signedIn || review === "loading"} onClick={askReview}>
                  {review === "loading" ? "Reviewing…" : "AI review"}
                </button>
              </div>
              <AiBar ai={ai} />
              {review && review !== "loading" && <ReviewView review={review} />}
              {showRef && <pre className="code">{p.reference}</pre>}
            </div>
          )}
        </div>
        <div className="ide-actions">
          <span className="small muted">Time limit {limit / 1000}s per test</span>
          <span className="spacer" />
          <button className="btn" disabled={busy || py.state === "error"} onClick={run}>
            Compile &amp; Test
          </button>
          <button className="btn primary" disabled={busy || py.state === "error"} onClick={submit}>
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}

function ConsoleView({ out, mode, revealFail }: { out: Console; mode: string; revealFail: boolean }) {
  if (out.kind === "idle") return <div className="console-box muted small">Run your code against the sample input with “Compile &amp; Test”, then “Submit” to be marked on the hidden test cases.</div>;
  if (out.kind === "running") return <div className="console-box small">⏳ {out.label}</div>;
  if (out.kind === "run")
    return (
      <div className="stack">
        {out.cases.map((c, i) => (
          <div key={i} className="console-box">
            <div className="row small">
              <strong>{out.custom ? "Custom input" : `Sample ${i + 1}`}</strong>
              {c.verdict && <span className={`verdict-pill v-${c.verdict}`}>{VERDICT_LABEL[c.verdict]}</span>}
              <span className="spacer" />
              <span className="muted">{c.r.timedOut ? "—" : `${Math.round(c.r.ms)} ms`}</span>
            </div>
            <IoBlock label="Your output" text={c.r.timedOut ? "Time limit exceeded" : c.r.stdout || "(no output)"} />
            {c.r.error && <IoBlock label="Error" text={c.r.error} bad />}
            {c.r.stderr && <IoBlock label="stderr" text={c.r.stderr} />}
            {c.verdict === "WA" && <IoBlock label="Expected output" text={normalizeOutput(c.expected!)} />}
          </div>
        ))}
      </div>
    );
  const fail = out.cases.find((c) => c.verdict !== "AC");
  return (
    <div className="console-box">
      <div className="row" style={{ marginBottom: 8 }}>
        <strong>
          Score: {out.passed} / {out.cases.length}
        </strong>
        <span className={`verdict-pill v-${out.passed === out.cases.length ? "AC" : "WA"}`}>
          {out.passed === out.cases.length ? "All test cases passed" : out.passed ? "Partially accepted" : "No test cases passed"}
        </span>
      </div>
      <table className="tc-table">
        <thead>
          <tr>
            <th>Test case</th>
            <th>Status</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {out.cases.map((c, i) => (
            <tr key={i}>
              <td>#{i + 1}</td>
              <td>
                <span className={`verdict-pill v-${c.verdict}`}>{VERDICT_LABEL[c.verdict!]}</span>
              </td>
              <td>{c.r.timedOut ? "—" : `${Math.round(c.r.ms)} ms`}</td>
              <td>{c.verdict === "AC" ? 1 : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {mode === "practice" && revealFail && fail && (
        <div className="stack" style={{ marginTop: 8 }}>
          <IoBlock label={`Input (test #${out.cases.indexOf(fail) + 1})`} text={fail.input} />
          <IoBlock label="Expected output" text={normalizeOutput(fail.expected!)} />
          <IoBlock label="Your output" text={fail.r.timedOut ? "Time limit exceeded" : fail.r.stdout || "(no output)"} />
          {fail.r.error && <IoBlock label="Error" text={fail.r.error} bad />}
        </div>
      )}
    </div>
  );
}

function IoBlock({ label, text, bad }: { label: string; text: string; bad?: boolean }) {
  return (
    <div>
      <div className="sample-label">{label}</div>
      <pre className={`code ${bad ? "bad" : ""}`}>{text.length > 4000 ? text.slice(0, 4000) + "\n… (truncated)" : text}</pre>
    </div>
  );
}

function ReviewView({ review }: { review: CodeReview | { error: string } }) {
  if ("error" in review) return <div className="callout pitfall small">{review.error}</div>;
  return (
    <div className="callout intuition small">
      <p style={{ marginTop: 0 }}>{review.summary}</p>
      {review.issues.length > 0 && (
        <ul>
          {review.issues.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      )}
      {review.complexity && (
        <p>
          <strong>Complexity:</strong> {review.complexity}
        </p>
      )}
      {review.hint && (
        <p style={{ marginBottom: 0 }}>
          <strong>Hint:</strong> {review.hint}
        </p>
      )}
    </div>
  );
}
