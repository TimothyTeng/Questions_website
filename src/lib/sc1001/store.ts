"use client";

import { useSyncExternalStore } from "react";
import { makeProgressStore } from "@/lib/progress";

// SC1001 per-browser state: question attempts, code drafts and best scores per coding problem.

export const { recordAnswers: recordScAnswers, resetProgress: resetScProgress, useProgress: useScProgress } = makeProgressStore("sc1001-progress-v1");

export interface ProblemStat {
  best: number;
  total: number;
  ts: number;
}

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

function get(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function set(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

export const loadDraft = (slug: string): string | null => get(`sc1001-code:${slug}`);
export const saveDraft = (slug: string, code: string | null) => set(`sc1001-code:${slug}`, code);

const STATS_KEY = "sc1001-problems-v1";
let statsSnap: Record<string, ProblemStat> | null = null;
const EMPTY: Record<string, ProblemStat> = {};

function readStats(): Record<string, ProblemStat> {
  if (statsSnap) return statsSnap;
  try {
    statsSnap = JSON.parse(get(STATS_KEY) ?? "{}");
  } catch {
    statsSnap = {};
  }
  return statsSnap!;
}

export function recordSubmission(slug: string, passed: number, total: number) {
  const all = { ...readStats() };
  const prev = all[slug];
  if (!prev || passed >= prev.best) all[slug] = { best: passed, total, ts: Date.now() };
  statsSnap = all;
  set(STATS_KEY, JSON.stringify(all));
  notify();
}

export function resetProblemStats() {
  statsSnap = {};
  set(STATS_KEY, null);
  notify();
}

export const useProblemStats = () => useSyncExternalStore(subscribe, readStats, () => EMPTY);

/** A small remembered preference, e.g. editor theme or AI model. */
export function usePref(key: string, fallback: string): [string, (v: string) => void] {
  const k = `sc1001-pref:${key}`;
  const value = useSyncExternalStore(subscribe, () => get(k) ?? fallback, () => fallback);
  return [
    value,
    (v: string) => {
      set(k, v);
      notify();
    },
  ];
}
