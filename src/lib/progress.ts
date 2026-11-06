"use client";

import { useSyncExternalStore } from "react";

// Per-question attempt history kept in localStorage (this browser only).

export interface QStat {
  attempts: number;
  correct: number;
  /** Was the most recent attempt correct? */
  last: boolean;
  ts: number;
}
export type Progress = Record<string, QStat>;

const KEY = "la-ca2-progress-v1";
const listeners = new Set<() => void>();
let snapshot: Progress | null = null;
const EMPTY: Progress = {};

function read(): Progress {
  if (snapshot) return snapshot;
  try {
    snapshot = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Progress;
  } catch {
    snapshot = {};
  }
  return snapshot;
}

function write(p: Progress) {
  snapshot = p;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable: keep in memory only */
  }
  listeners.forEach((l) => l());
}

export function recordAnswers(results: { id: string; correct: boolean }[]) {
  const p = { ...read() };
  const now = Date.now();
  for (const r of results) {
    const s = p[r.id] ?? { attempts: 0, correct: 0, last: false, ts: 0 };
    p[r.id] = { attempts: s.attempts + 1, correct: s.correct + (r.correct ? 1 : 0), last: r.correct, ts: now };
  }
  write(p);
}

export function resetProgress() {
  write({});
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => EMPTY,
  );
}

/** Small per-viewer flags (e.g. lesson sections marked as understood). */
export function useFlag(key: string): [boolean, (v: boolean) => void] {
  const k = `la-ca2-flag:${key}`;
  const value = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      try {
        return localStorage.getItem(k) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
  const set = (v: boolean) => {
    try {
      if (v) localStorage.setItem(k, "1");
      else localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };
  return [value, set];
}
