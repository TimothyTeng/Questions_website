// A tiny, safe expression compiler for plot curves: "x^2 - 3*x + 2", "ln(x)", "30/(x+2)", "(650-0.25*x)^(3/2)".
// Grammar: expr = term (("+"|"-") term)* ; term = unary (("*"|"/") unary)* ; unary = "-" unary | power ;
// power = atom ("^" unary)? ; atom = number | "x" | const | fn "(" expr ")" | "(" expr ")".

type Fn = (x: number) => number;

const FNS: Record<string, (v: number) => number> = {
  ln: Math.log,
  log: Math.log,
  log10: Math.log10,
  exp: Math.exp,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
};
const CONSTS: Record<string, number> = { e: Math.E, pi: Math.PI };

const cache = new Map<string, Fn>();

export function compile(src: string): Fn {
  const hit = cache.get(src);
  if (hit) return hit;
  const toks = src.match(/\d*\.?\d+(?:e[+-]?\d+)?|[a-z_][a-z0-9_]*|[-+*/^()]/gi);
  if (!toks || toks.join("") !== src.replace(/\s+/g, "")) throw new Error(`Bad expression: ${src}`);
  let i = 0;
  const peek = () => toks[i];
  const eat = (t?: string) => {
    const v = toks[i++];
    if (t && v !== t) throw new Error(`Expected "${t}" in ${src}`);
    return v;
  };

  function expr(): Fn {
    let f = term();
    while (peek() === "+" || peek() === "-") {
      const op = eat();
      const a = f;
      const b = term();
      f = op === "+" ? (x) => a(x) + b(x) : (x) => a(x) - b(x);
    }
    return f;
  }
  function term(): Fn {
    let f = unary();
    while (peek() === "*" || peek() === "/") {
      const op = eat();
      const a = f;
      const b = unary();
      f = op === "*" ? (x) => a(x) * b(x) : (x) => a(x) / b(x);
    }
    return f;
  }
  function unary(): Fn {
    if (peek() === "-") {
      eat();
      const a = unary();
      return (x) => -a(x);
    }
    if (peek() === "+") {
      eat();
      return unary();
    }
    return power();
  }
  function power(): Fn {
    const a = atom();
    if (peek() === "^") {
      eat();
      const b = unary();
      return (x) => {
        const base = a(x);
        const ex = b(x);
        // Odd roots of negatives, e.g. x^(1/3) for x < 0.
        if (base < 0 && !Number.isInteger(ex)) {
          for (const d of [3, 5, 7]) {
            const n = Math.round(ex * d);
            if (Math.abs(n - ex * d) < 1e-9 && n % 2 !== 0) return -Math.pow(-base, ex);
            if (Math.abs(n - ex * d) < 1e-9) return Math.pow(-base, ex);
          }
          return NaN;
        }
        return Math.pow(base, ex);
      };
    }
    return a;
  }
  function atom(): Fn {
    const t = eat();
    if (t === undefined) throw new Error(`Unexpected end of ${src}`);
    if (t === "(") {
      const f = expr();
      eat(")");
      return f;
    }
    if (/^\d|^\./.test(t)) {
      const v = Number(t);
      return () => v;
    }
    const name = t.toLowerCase();
    if (name === "x") return (x) => x;
    if (name in CONSTS) {
      const v = CONSTS[name];
      return () => v;
    }
    if (name in FNS) {
      const g = FNS[name];
      eat("(");
      const a = expr();
      eat(")");
      return (x) => g(a(x));
    }
    throw new Error(`Unknown name "${t}" in ${src}`);
  }

  const f = expr();
  if (i !== toks.length) throw new Error(`Unexpected "${toks[i]}" in ${src}`);
  cache.set(src, f);
  return f;
}

/** Evaluate safely: NaN/±Infinity for anything undefined. */
export function evalAt(src: string, x: number): number {
  try {
    const v = compile(src)(x);
    return Number.isFinite(v) ? v : NaN;
  } catch {
    return NaN;
  }
}
