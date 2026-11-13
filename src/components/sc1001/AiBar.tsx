"use client";

import { useEffect, useState } from "react";
import { DEFAULT_MODEL, listModels, type AiConfig } from "@/lib/sc1001/ai";
import { usePref } from "@/lib/sc1001/store";

/** The chosen Gemini model, remembered in this browser. The key lives on the server (GEMINI_API_KEY). */
export function useAi() {
  const [model, setModel] = usePref("gemini-model", DEFAULT_MODEL);
  const cfg: AiConfig = { model };
  return { cfg, model, setModel };
}

let modelCache: Promise<string[]> | null = null;

/** Model picker for the AI features. */
export function AiBar({ ai }: { ai: ReturnType<typeof useAi> }) {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    modelCache ??= listModels(ai.cfg).catch(() => {
      modelCache = null;
      return [];
    });
    let live = true;
    modelCache.then((m) => live && setModels(m));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the model list doesn't depend on the chosen model
  }, []);

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
    </div>
  );
}
