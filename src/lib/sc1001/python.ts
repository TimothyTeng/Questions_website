"use client";

import { useSyncExternalStore } from "react";
import { HARNESS, PYODIDE_URL, type RunResult } from "./harness";

// One shared Pyodide worker for the whole tab. Runs are queued one at a time; a run that exceeds
// its time limit terminates the worker (there is no other way to stop a busy wasm thread without
// cross-origin isolation) and a fresh one is started for the next run.

export type PyStatus = { state: "idle" | "loading" | "ready" | "error"; version?: string; error?: string };

let status: PyStatus = { state: "idle" };
const listeners = new Set<() => void>();
const setStatus = (s: PyStatus) => {
  status = s;
  listeners.forEach((l) => l());
};

let worker: Worker | null = null;
let ready: Promise<void> | null = null;
let queue: Promise<unknown> = Promise.resolve();
let nextId = 1;
const pending = new Map<number, (r: RunResult) => void>();

function spawn(): Promise<void> {
  setStatus({ state: "loading", version: status.version });
  const w = new Worker("/sc1001/py-worker.js", { type: "module" });
  worker = w;
  return new Promise<void>((resolve, reject) => {
    w.onmessage = (e) => {
      const m = e.data;
      if (m.type === "ready") {
        setStatus({ state: "ready", version: m.version });
        resolve();
      } else if (m.type === "init-error") {
        setStatus({ state: "error", error: m.error });
        reject(new Error(m.error));
      } else if (m.type === "result") {
        pending.get(m.id)?.(m.result);
        pending.delete(m.id);
      }
    };
    w.onerror = (e) => {
      setStatus({ state: "error", error: e.message || "Python worker failed to start" });
      reject(new Error(e.message));
    };
    w.postMessage({ type: "init", indexURL: PYODIDE_URL, harness: HARNESS });
  });
}

/** Start loading Python in the background (call when an editor mounts). */
export function preloadPython(): Promise<void> {
  if (!ready) {
    ready = spawn();
    ready.catch(() => {
      ready = null;
    });
  }
  return ready;
}

function runOnce(code: string, stdin: string, timeoutMs: number): Promise<RunResult> {
  return preloadPython().then(
    () =>
      new Promise<RunResult>((resolve) => {
        const id = nextId++;
        const timer = setTimeout(() => {
          pending.delete(id);
          worker?.terminate();
          worker = null;
          ready = null;
          resolve({ stdout: "", stderr: "", error: null, ms: timeoutMs, timedOut: true });
          preloadPython().catch(() => {});
        }, timeoutMs);
        pending.set(id, (r) => {
          clearTimeout(timer);
          resolve(r);
        });
        worker!.postMessage({ type: "run", id, code, stdin });
      }),
  );
}

/** Run `code` with `stdin` as its input. Calls are serialised. */
export function runPython(code: string, stdin: string, timeoutMs = 3000): Promise<RunResult> {
  const p = queue.then(() => runOnce(code, stdin, timeoutMs));
  queue = p.catch(() => {});
  return p;
}

export function usePyStatus(): PyStatus {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => status,
    () => status,
  );
}
