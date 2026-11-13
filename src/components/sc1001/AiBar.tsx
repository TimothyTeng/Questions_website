"use client";

import { useEffect, useState } from "react";
import { isSignedIn, listModels, signIn } from "@/lib/sc1001/ai";
import { usePref } from "@/lib/sc1001/store";

/** Puter sign-in state and the chosen model ("" = Puter's default). */
export function useAi() {
  const [signedIn, setSignedIn] = useState(false);
  const [model, setModel] = usePref("ai-model", "");
  useEffect(() => {
    // Puter.js loads lazily; re-check a few times until it is there.
    let n = 0;
    const h = setInterval(() => {
      setSignedIn(isSignedIn());
      if (++n > 20 || window.puter) clearInterval(h);
    }, 500);
    return () => clearInterval(h);
  }, []);
  const doSignIn = async () => {
    await signIn();
    setSignedIn(isSignedIn());
  };
  return { signedIn, model, setModel, signIn: doSignIn };
}

export function AiBar({ ai }: { ai: ReturnType<typeof useAi> }) {
  const [models, setModels] = useState<string[]>([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (ai.signedIn) listModels().then(setModels, () => {});
  }, [ai.signedIn]);
  return (
    <div className="row small ai-bar">
      <span className="badge">AI · Puter</span>
      {ai.signedIn ? (
        <>
          <span className="muted">Signed in</span>
          <select value={ai.model} onChange={(e) => ai.setModel(e.target.value)} aria-label="AI model">
            <option value="">Default model</option>
            {ai.model && !models.includes(ai.model) && <option value={ai.model}>{ai.model}</option>}
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </>
      ) : (
        <button
          className="btn"
          onClick={() => {
            setErr("");
            ai.signIn().catch((e) => setErr(String(e?.message ?? e)));
          }}
        >
          Sign in to Puter for AI marking
        </button>
      )}
      {err && <span style={{ color: "var(--bad)" }}>{err}</span>}
    </div>
  );
}
