"use client";

import { useSyncExternalStore } from "react";
import { makeProgressStore } from "@/lib/progress";

// HE1002 per-browser history: topic-quiz attempts, flashcard self-ratings and formula-card self-ratings are kept apart.
export const { recordAnswers, resetProgress, useProgress } = makeProgressStore("he1002-quiz-v1");

const cards = makeProgressStore("he1002-cards-v1");
export const recordCards = cards.recordAnswers;
export const resetCards = cards.resetProgress;
export const useCardProgress = cards.useProgress;

// ------------------------------------------------------------------ preferences

const prefListeners = new Set<() => void>();
export function usePref(key: string, fallback: string): [string, (v: string) => void] {
  const k = `he1002-pref:${key}`;
  const value = useSyncExternalStore(
    (cb) => {
      prefListeners.add(cb);
      return () => prefListeners.delete(cb);
    },
    () => {
      try {
        return localStorage.getItem(k) ?? fallback;
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );
  return [
    value,
    (v: string) => {
      try {
        localStorage.setItem(k, v);
      } catch {
        /* ignore */
      }
      prefListeners.forEach((l) => l());
    },
  ];
}

// ------------------------------------------------------------------ exam-question attempts + AI marking queue

export interface Img {
  mimeType: string;
  data: string;
}

export type AttemptStatus = "queued" | "marking" | "done" | "error";

export interface Attempt {
  answer: string;
  /** Attached photo (kept only while it waits to be marked, to save storage). */
  image?: Img;
  hadImage?: boolean;
  /** How it is being marked. */
  by: "ai" | "self";
  status: AttemptStatus;
  /** One score per rubric item. */
  scores?: number[];
  feedback?: string;
  error?: string;
  /** Automatic retries used for this job. */
  tries?: number;
  /** Backed-off jobs wait until this time before retrying. */
  notBefore?: number;
  /** When it was queued (queue order). */
  ts: number;
  model?: string;
}

const KEY = "he1002-exam-v1";
type Attempts = Record<string, Attempt>;
const listeners = new Set<() => void>();
let snap: Attempts | null = null;
const EMPTY: Attempts = {};

function read(): Attempts {
  if (snap) return snap;
  try {
    snap = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Attempts;
  } catch {
    snap = {};
  }
  return snap;
}

function write(a: Attempts) {
  snap = a;
  try {
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // Storage full (usually photos): keep photos in memory only and save the rest.
    try {
      const slim = Object.fromEntries(Object.entries(a).map(([k, v]) => [k, { ...v, image: undefined }]));
      localStorage.setItem(KEY, JSON.stringify(slim));
    } catch {
      /* storage unavailable */
    }
  }
  listeners.forEach((l) => l());
}

const update = (id: string, f: (a: Attempt | undefined) => Attempt | undefined) => {
  const all = { ...read() };
  const next = f(all[id]);
  if (next) all[id] = next;
  else delete all[id];
  write(all);
};

export function useAttempts(): Attempts {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => EMPTY,
  );
}

export const clearAttempt = (id: string) => update(id, () => undefined);
export const clearAttempts = (ids: string[]) => {
  const all = { ...read() };
  for (const id of ids) delete all[id];
  write(all);
};

/** Self-marking: store the ticked rubric scores directly. */
export function selfMark(id: string, answer: string, scores: number[]) {
  update(id, (a) => ({ answer, hadImage: a?.hadImage, by: "self", status: "done", scores, ts: a?.ts ?? Date.now() }));
}

/** Submit an answer for Gemini marking. It is marked in the background; the queue survives reloads. */
export function submitForAi(id: string, answer: string, image: Img | undefined, model: string) {
  update(id, () => ({ answer, image, hadImage: !!image, by: "ai", status: "queued", ts: Date.now(), tries: 0, model }));
  pump();
}

export function retryAi(id: string) {
  update(id, (a) => (a ? { ...a, status: "queued", error: undefined, tries: 0, notBefore: 0 } : a));
  pump();
}

/** Position in the marking queue (1 = being marked next), or 0 if not waiting. */
export function queuePosition(all: Attempts, id: string): number {
  const waiting = Object.entries(all)
    .filter(([, a]) => a.status === "queued" || a.status === "marking")
    .sort((x, y) => (x[1].status === "marking" ? -1 : y[1].status === "marking" ? 1 : x[1].ts - y[1].ts))
    .map(([k]) => k);
  return waiting.indexOf(id) + 1;
}

// One request at a time keeps us under Gemini's free-tier rate limits; failures back off and retry.
const MAX_TRIES = 4;
let running = false;
let timer: ReturnType<typeof setTimeout> | null = null;
let started = false;

/** Call once on the client: re-queues anything interrupted by a reload and starts the worker. */
export function startQueue() {
  if (started || typeof window === "undefined") return;
  started = true;
  const all = { ...read() };
  let changed = false;
  for (const [k, a] of Object.entries(all))
    // Interrupted by the reload (in flight, or its request aborted by the unload): go again straight away.
    if (a.status === "marking" || (a.status === "queued" && a.error?.startsWith("Network error"))) {
      all[k] = { ...a, status: "queued", notBefore: 0, error: undefined };
      changed = true;
    }
  if (changed) write(all);
  window.addEventListener("online", () => pump());
  pump();
}

// Gemini's free tier allows about 5 requests/min on Flash models and 15/min on Flash-Lite. The queue
// paces itself to stay just under that (counting requests made before a reload too), instead of
// firing and getting rate-limited.
const RATE_KEY = "he1002-ai-sent-v1";
export const rpmFor = (model?: string) => (/lite/i.test(model ?? "") ? 14 : 4);

function sentRecently(): number[] {
  const cutoff = Date.now() - 60_000;
  try {
    return (JSON.parse(localStorage.getItem(RATE_KEY) ?? "[]") as number[]).filter((t) => t > cutoff);
  } catch {
    return [];
  }
}

function noteSent() {
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify([...sentRecently(), Date.now()]));
  } catch {
    /* ignore */
  }
}

/** Milliseconds until another request fits in the per-minute budget for this model. */
function rateWait(model?: string): number {
  const sent = sentRecently();
  const n = rpmFor(model);
  return sent.length < n ? 0 : Math.max(0, sent[sent.length - n] + 60_000 - Date.now() + 300);
}

function wakeIn(ms: number) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    pump();
  }, Math.max(500, ms));
}

function pump() {
  if (typeof window === "undefined" || running) return;
  const now = Date.now();
  const queued = Object.entries(read()).filter(([, a]) => a.status === "queued");
  const ready = queued.filter(([, a]) => (a.notBefore ?? 0) <= now).sort((x, y) => x[1].ts - y[1].ts)[0];
  if (ready) {
    const wait = rateWait(ready[1].model);
    if (!wait) {
      void work(ready[0], ready[1]);
      return;
    }
    const msg = `Pacing for the free-tier limit (${rpmFor(ready[1].model) + 1}/min) — starts in ~${Math.ceil(wait / 1000)}s`;
    if (ready[1].error !== msg) update(ready[0], (a) => (a ? { ...a, error: msg } : a));
    wakeIn(Math.min(wait, 1000));
    return;
  }
  // Nothing ready: wake up when the earliest backed-off job may retry.
  const wake = Math.min(...queued.map(([, a]) => a.notBefore ?? 0));
  if (queued.length && !timer) wakeIn(wake - now);
}

async function work(id: string, job: Attempt) {
  running = true;
  noteSent();
  update(id, (a) => (a ? { ...a, status: "marking", error: undefined } : a));
  try {
    const res = await fetch("/api/he1002/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "gradeExam", questionId: id, answer: job.answer, image: job.image, model: job.model }),
    });
    const body = await res.json().catch(() => ({}));
    const cur = read()[id];
    // The student may have cleared or resubmitted the question while it was being marked.
    if (!cur || cur.ts !== job.ts) return;
    if (res.ok) {
      update(id, (a) => (a ? { ...a, status: "done", scores: body.scores, feedback: body.feedback, image: undefined, error: undefined } : a));
      return;
    }
    const msg: string = body?.error ?? `Marking failed (${res.status})`;
    const tries = (cur.tries ?? 0) + 1;
    // Rate limits, overload and network/server hiccups are worth retrying; bad keys and bad requests are not.
    const transient = res.status === 429 || res.status >= 500;
    const permanent = /GEMINI_API_KEY|not set up|rejected/i.test(msg) || res.status === 400 || res.status === 413;
    if (transient && !permanent && tries < MAX_TRIES) {
      const wait = 15_000 * tries;
      update(id, (a) => (a ? { ...a, status: "queued", tries, notBefore: Date.now() + wait, error: `${msg} Retrying automatically…` } : a));
    } else update(id, (a) => (a ? { ...a, status: "error", tries, error: msg } : a));
  } catch {
    // Network down: keep it queued and try again shortly.
    const cur = read()[id];
    if (cur && cur.ts === job.ts) update(id, (a) => (a ? { ...a, status: "queued", notBefore: Date.now() + 10_000, error: "Network error — will retry." } : a));
  } finally {
    running = false;
    pump();
  }
}
