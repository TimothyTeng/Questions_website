// Module worker that runs student Python with Pyodide. Started by src/lib/sc1001/python.ts,
// which sends the shared harness (src/lib/sc1001/harness.ts) in the "init" message and kills
// this worker if a run exceeds its time limit.

let py = null;
let run = null;

self.onmessage = async (e) => {
  const msg = e.data;
  try {
    if (msg.type === "init") {
      const { loadPyodide } = await import(`${msg.indexURL}pyodide.mjs`);
      py = await loadPyodide({ indexURL: msg.indexURL });
      py.runPython(msg.harness);
      run = py.globals.get("_sc_run");
      const version = py.runPython("import sys; sys.version.split()[0]");
      self.postMessage({ type: "ready", version });
      return;
    }
    if (msg.type === "run") {
      const r = run(msg.code, msg.stdin);
      const [stdout, stderr, error, ms] = r.toJs();
      r.destroy();
      self.postMessage({ type: "result", id: msg.id, result: { stdout, stderr, error: error ?? null, ms } });
    }
  } catch (err) {
    self.postMessage({ type: msg.type === "init" ? "init-error" : "result", id: msg.id, error: String(err), result: { stdout: "", stderr: "", error: String(err), ms: 0 } });
  }
};
