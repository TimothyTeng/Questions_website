// Python-side runner shared by the browser worker (public/sc1001/py-worker.js) and scripts/check-sc1001.ts,
// so answers are checked with exactly the interpreter and I/O handling the site uses.
//
// Each run gets fresh globals and its own stdin/stdout, like a HackerEarth test case:
// input() / sys.stdin read the test input, print() goes to the captured stdout.

export const PYODIDE_VERSION = "314.0.7";
export const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/** Max captured output per run, in characters. */
export const OUTPUT_LIMIT = 2_000_000;

export const HARNESS = `
import io, linecache, sys, time, traceback

class _ScCapped(io.StringIO):
    def write(self, s):
        if self.tell() + len(s) > ${OUTPUT_LIMIT}:
            raise RuntimeError("Output limit exceeded")
        return super().write(s)

def _sc_run(src, stdin_text):
    out, err = _ScCapped(), _ScCapped()
    saved = sys.stdin, sys.stdout, sys.stderr
    sys.stdin, sys.stdout, sys.stderr = io.StringIO(stdin_text), out, err
    # Lets tracebacks quote the offending source line.
    linecache.cache["main.py"] = (len(src), None, src.splitlines(True), "main.py")
    error = None
    t0 = time.perf_counter()
    try:
        exec(compile(src, "main.py", "exec"), {"__name__": "__main__"})
    except SystemExit as e:
        if e.code not in (None, 0):
            error = f"SystemExit: {e.code}"
    except BaseException as e:
        # Drop this wrapper's own frame so the traceback starts at main.py.
        tb = e.__traceback__.tb_next if e.__traceback__ else None
        error = "".join(traceback.format_exception(type(e), e, tb))
    finally:
        ms = (time.perf_counter() - t0) * 1000
        sys.stdin, sys.stdout, sys.stderr = saved
    return [out.getvalue(), err.getvalue(), error, ms]
`;

export interface RunResult {
  stdout: string;
  stderr: string;
  /** Python traceback, if the program raised. */
  error: string | null;
  ms: number;
  timedOut?: boolean;
}
