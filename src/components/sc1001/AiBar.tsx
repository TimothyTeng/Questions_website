"use client";

import { useEffect, useState } from "react";
import { DEFAULT_MODEL, KEY_URL, listModels, type AiConfig } from "@/lib/sc1001/ai";
import { usePref } from "@/lib/sc1001/store";

/** The viewer's Gemini key and model, remembered in this browser. */
export function useAi() {
  const [key, setKey] = usePref("gemini-key", "");
  const [model, setModel] = usePref("gemini-model", DEFAULT_MODEL);
  const cfg: AiConfig = { key, model };
  return { cfg, ready: !!key, key, setKey, model, setModel };
}

let modelCache: { key: string; models: Promise<string[]> } | null = null;

/** Key entry when there is none; otherwise the model picker and a way to change the key. */
export function AiBar({ ai }: { ai: ReturnType<typeof useAi> }) {
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    if (!ai.key) return;
    if (modelCache?.key !== ai.key) modelCache = { key: ai.key, models: listModels(ai.cfg).catch(() => []) };
    let live = true;
    modelCache.models.then((m) => live && setModels(m));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refetch only when the key changes
  }, [ai.key]);

  if (!ai.ready || editing)
    return (
      <div className="row small ai-bar">
        <span className="badge">AI · Gemini</span>
        <input
          type="password"
          className="answer-input"
          style={{ width: 260, padding: "4px 8px" }}
          placeholder="Paste your Gemini API key"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
          aria-label="Gemini API key"
        />
        <button
          className="btn sm primary"
          disabled={!draft.trim()}
          onClick={() => {
            ai.setKey(draft.trim());
            setDraft("");
            setEditing(false);
          }}
        >
          Save key
        </button>
        {editing && (
          <button className="btn sm" onClick={() => setEditing(false)}>
            Cancel
          </button>
        )}
        <a href={KEY_URL} target="_blank" rel="noreferrer">
          Get a free key ↗
        </a>
        <span className="muted">Stored only in this browser.</span>
      </div>
    );

  return (
    <div className="row small ai-bar">
      <span className="badge">AI · Gemini</span>
      <select value={ai.model} onChange={(e) => ai.setModel(e.target.value)} aria-label="Gemini model">
        {[...new Set([ai.model, DEFAULT_MODEL, ...models])].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <button className="link-btn" onClick={() => setEditing(true)}>
        Change key
      </button>
      <button
        className="link-btn"
        onClick={() => {
          if (confirm("Remove your Gemini API key from this browser?")) ai.setKey("");
        }}
      >
        Remove key
      </button>
    </div>
  );
}
