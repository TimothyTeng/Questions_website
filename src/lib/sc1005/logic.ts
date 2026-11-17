// Boolean logic engine for SC1005: expression parsing, truth tables, minimisation (Quine–McCluskey)
// and gate-level circuit simulation. Shared by the question checker, the figures and the Learn tab.

import type { CircuitSpec, GateSpec } from "./types";

export type Bit = 0 | 1;
/** A net value: 0, 1, null (unknown / oscillating) or "z" (high impedance). */
export type Val = Bit | null | "z";

// ---------------------------------------------------------------------------------------------
// Expressions

export type Expr =
  | { t: "var"; name: string }
  | { t: "const"; v: Bit }
  | { t: "not"; e: Expr }
  | { t: "and" | "or" | "xor"; es: Expr[] };

/**
 * Parses A'B + C(D + E)', ~A & B, A ⊕ B, (A+B')(C+D)… Juxtaposition is AND. Precedence: NOT > AND > XOR > OR.
 * Variable names are matched longest-first from `vars`; without `vars`, a name is a letter followed by digits.
 * Matching ignores case when that is unambiguous.
 */
export function parseExpr(src: string, vars?: string[]): Expr {
  const names = vars ? [...vars].sort((a, b) => b.length - a.length) : null;
  const ci = !!names && new Set(names.map((n) => n.toLowerCase())).size === names.length;
  let i = 0;
  const s = src.replace(/[’‘`]/g, "'").replace(/[·•∙]/g, "*").replace(/[¬]/g, "~").replace(/[⊕]/g, "^").replace(/\bxor\b/gi, "^").replace(/\band\b/gi, "*").replace(/\bor\b/gi, "+").replace(/\bnot\b/gi, "~");
  const ws = () => {
    while (i < s.length && /\s/.test(s[i])) i++;
  };
  const fail = (msg: string): never => {
    throw new Error(`${msg} at position ${i + 1}`);
  };

  function name(): string | null {
    if (names) {
      for (const n of names) {
        const seg = s.slice(i, i + n.length);
        if (seg === n || (ci && seg.toLowerCase() === n.toLowerCase())) {
          i += n.length;
          return n;
        }
      }
      return null;
    }
    const m = /^[A-Za-z][0-9]*/.exec(s.slice(i));
    if (!m) return null;
    i += m[0].length;
    return m[0];
  }

  function atom(): Expr {
    ws();
    const c = s[i];
    if (c === "(" || c === "[") {
      i++;
      const e = or();
      ws();
      if (s[i] !== ")" && s[i] !== "]") fail("Missing closing bracket");
      i++;
      return e;
    }
    if (c === "0" || c === "1") {
      i++;
      return { t: "const", v: c === "1" ? 1 : 0 };
    }
    const n = name();
    if (n === null) fail(i >= s.length ? "Expression ends too early" : `Unexpected "${c}"`);
    return { t: "var", name: n! };
  }

  function unary(): Expr {
    ws();
    if (s[i] === "~" || s[i] === "!") {
      i++;
      return { t: "not", e: unary() };
    }
    let e = atom();
    for (;;) {
      ws();
      if (s[i] === "'") {
        i++;
        e = { t: "not", e };
      } else break;
    }
    return e;
  }

  const startsAtom = () => {
    ws();
    const c = s[i];
    if (c === undefined) return false;
    return c === "(" || c === "[" || c === "~" || c === "!" || c === "0" || c === "1" || /[A-Za-z]/.test(c);
  };

  function and(): Expr {
    const es = [unary()];
    for (;;) {
      ws();
      if (s[i] === "*" || s[i] === "&" || s[i] === ".") {
        i++;
        es.push(unary());
      } else if (startsAtom()) es.push(unary());
      else break;
    }
    return es.length === 1 ? es[0] : { t: "and", es };
  }

  function xor(): Expr {
    const es = [and()];
    for (;;) {
      ws();
      if (s[i] === "^") {
        i++;
        es.push(and());
      } else break;
    }
    return es.length === 1 ? es[0] : { t: "xor", es };
  }

  function or(): Expr {
    const es = [xor()];
    for (;;) {
      ws();
      if (s[i] === "+" || s[i] === "|") {
        i++;
        es.push(xor());
      } else break;
    }
    return es.length === 1 ? es[0] : { t: "or", es };
  }

  const e = or();
  ws();
  if (i < s.length) fail(`Unexpected "${s[i]}"`);
  return e;
}

export function evalExpr(e: Expr, env: Record<string, Bit>): Bit {
  switch (e.t) {
    case "var":
      return env[e.name] ?? 0;
    case "const":
      return e.v;
    case "not":
      return evalExpr(e.e, env) ? 0 : 1;
    case "and":
      return e.es.every((x) => evalExpr(x, env)) ? 1 : 0;
    case "or":
      return e.es.some((x) => evalExpr(x, env)) ? 1 : 0;
    case "xor":
      return (e.es.reduce((a, x) => a ^ evalExpr(x, env), 0) & 1) as Bit;
  }
}

export function exprVars(e: Expr, out = new Set<string>()): Set<string> {
  if (e.t === "var") out.add(e.name);
  else if (e.t === "not") exprVars(e.e, out);
  else if (e.t !== "const") e.es.forEach((x) => exprVars(x, out));
  return out;
}

/** Number of literal occurrences (a variable, complemented or not). */
export function literalCount(e: Expr): number {
  if (e.t === "var") return 1;
  if (e.t === "const") return 0;
  if (e.t === "not") return literalCount(e.e);
  return e.es.reduce((s, x) => s + literalCount(x), 0);
}

/** Environment for row `m` of a truth table over `vars` (vars[0] is the MSB). */
export function rowEnv(vars: string[], m: number): Record<string, Bit> {
  const env: Record<string, Bit> = {};
  vars.forEach((v, k) => (env[v] = ((m >> (vars.length - 1 - k)) & 1) as Bit));
  return env;
}

/** Output column of the truth table (index = minterm number). */
export function truthTable(e: Expr, vars: string[]): Bit[] {
  return Array.from({ length: 1 << vars.length }, (_, m) => evalExpr(e, rowEnv(vars, m)));
}

export const minterms = (e: Expr, vars: string[]) => truthTable(e, vars).flatMap((v, m) => (v ? [m] : []));

/** Same output on every row of the truth table, except rows listed in `ignore` (don't cares). */
export function equivalent(a: Expr, b: Expr, vars: string[], ignore: number[] = []): boolean {
  const ta = truthTable(a, vars);
  const tb = truthTable(b, vars);
  return ta.every((v, k) => v === tb[k] || ignore.includes(k));
}

// ---------------------------------------------------------------------------------------------
// Minimisation

/** A product term: bit k of `mask` set means variable k (LSB = last var) is absent; `value` holds the literals. */
export interface Implicant {
  value: number;
  mask: number;
}

export const covers = (p: Implicant, m: number) => (m & ~p.mask) === (p.value & ~p.mask);
const bitCount = (x: number) => {
  let c = 0;
  for (; x; x &= x - 1) c++;
  return c;
};

export function primeImplicants(n: number, ones: number[], dcs: number[] = []): Implicant[] {
  let cur = [...new Set([...ones, ...dcs])].map((m) => ({ value: m, mask: 0 }));
  const primes: Implicant[] = [];
  while (cur.length) {
    const used = new Set<number>();
    const next = new Map<string, Implicant>();
    for (let a = 0; a < cur.length; a++)
      for (let b = a + 1; b < cur.length; b++) {
        const p = cur[a];
        const q = cur[b];
        if (p.mask !== q.mask) continue;
        const d = (p.value ^ q.value) & ~p.mask;
        if (bitCount(d) !== 1) continue;
        used.add(a).add(b);
        const r = { value: p.value & ~d, mask: p.mask | d };
        next.set(`${r.value}/${r.mask}`, r);
      }
    cur.forEach((p, k) => {
      if (!used.has(k)) primes.push(p);
    });
    cur = [...next.values()];
  }
  void n;
  return primes;
}

/** A minimum cover: fewest terms, then fewest literals. Exact for the ≤ 6-variable functions used here. */
export function minimalCover(n: number, ones: number[], dcs: number[] = []): Implicant[] {
  if (ones.length === 0) return [];
  const primes = primeImplicants(n, ones, dcs);
  const lits = (p: Implicant) => n - bitCount(p.mask);
  const chosen: Implicant[] = [];
  let left = [...ones];
  // Essential primes first.
  for (;;) {
    const ess = left.map((m) => primes.filter((p) => covers(p, m))).find((ps) => ps.length === 1)?.[0];
    if (!ess) break;
    if (!chosen.includes(ess)) chosen.push(ess);
    left = left.filter((m) => !covers(ess, m));
  }
  if (!left.length) return chosen;
  const cands = primes.filter((p) => !chosen.includes(p) && left.some((m) => covers(p, m)));
  let best: Implicant[] | null = null;
  let bestCost = [Infinity, Infinity];
  const search = (k: number, pick: Implicant[], rem: number[]) => {
    if (!rem.length) {
      const cost = [pick.length, pick.reduce((s, p) => s + lits(p), 0)];
      if (cost[0] < bestCost[0] || (cost[0] === bestCost[0] && cost[1] < bestCost[1])) {
        best = [...pick];
        bestCost = cost;
      }
      return;
    }
    if (pick.length >= bestCost[0] || k >= cands.length) return;
    // Branch on the first uncovered minterm: one of its covering primes must be chosen.
    const m = rem[0];
    for (const p of cands.slice(k).filter((p) => covers(p, m))) search(k, [...pick, p], rem.filter((x) => !covers(p, x)));
  };
  search(0, [], left);
  return [...chosen, ...(best ?? [])];
}

/** "A'BC" for a product term (vars[0] is the MSB). */
export function productString(p: Implicant, vars: string[]): string {
  const n = vars.length;
  const s = vars
    .map((v, k) => {
      const bit = 1 << (n - 1 - k);
      if (p.mask & bit) return "";
      return p.value & bit ? v : `${v}'`;
    })
    .join("");
  return s || "1";
}

/** "(A + B' + C)" for the sum term that is 0 exactly on the cells of implicant p. */
export function sumString(p: Implicant, vars: string[]): string {
  const n = vars.length;
  const lits = vars.flatMap((v, k) => {
    const bit = 1 << (n - 1 - k);
    if (p.mask & bit) return [];
    return [p.value & bit ? `${v}'` : v];
  });
  return lits.length ? `(${lits.join(" + ")})` : "0";
}

export function minimalSop(vars: string[], ones: number[], dcs: number[] = []): string {
  const n = vars.length;
  if (!ones.length) return "0";
  const cover = minimalCover(n, ones, dcs);
  if (cover.some((p) => p.mask === (1 << n) - 1)) return "1";
  return sortTerms(cover, n)
    .map((p) => productString(p, vars))
    .join(" + ");
}

export function minimalPos(vars: string[], ones: number[], dcs: number[] = []): string {
  const n = vars.length;
  const zeros = Array.from({ length: 1 << n }, (_, m) => m).filter((m) => !ones.includes(m) && !dcs.includes(m));
  if (!zeros.length) return "1";
  const cover = minimalCover(n, zeros, dcs);
  if (cover.some((p) => p.mask === (1 << n) - 1)) return "0";
  return sortTerms(cover, n)
    .map((p) => sumString(p, vars))
    .join("");
}

/** Larger groups (fewer literals) first, then a stable order by the variables used. */
function sortTerms(ps: Implicant[], n: number) {
  return [...ps].sort((a, b) => n - bitCount(a.mask) - (n - bitCount(b.mask)) || b.mask - a.mask || a.value - b.value);
}

/** Parses a product ("A'BC") or sum ("(A+B'+C)") term into the set of minterm cells it covers (sum: the 0-cells). */
export function termCells(term: string, vars: string[]): number[] {
  const t = term.trim();
  const isSum = t.startsWith("(") || t.includes("+");
  const e = parseExpr(t, vars);
  const tt = truthTable(e, vars);
  return tt.flatMap((v, m) => ((isSum ? v === 0 : v === 1) ? [m] : []));
}

// ---------------------------------------------------------------------------------------------
// Circuits

const SEQ: GateSpec["type"][] = ["DFF", "TFF", "JKFF", "DLATCH"];
export const isSequential = (g: GateSpec) => SEQ.includes(g.type);

/** Strips "!" and ".qn" from a pin reference. */
export function netOf(ref: string): { net: string; invert: boolean; qn: boolean } {
  const invert = ref.startsWith("!");
  let net = invert ? ref.slice(1) : ref;
  const qn = net.endsWith(".qn");
  if (qn) net = net.slice(0, -3);
  return { net, invert, qn };
}

const not = (v: Val): Val => (v === 0 ? 1 : v === 1 ? 0 : null);

function gateOut(g: GateSpec, ins: Val[], state: Record<string, Bit>, cur: Val): Val {
  const known = (xs: Val[]) => xs.every((x) => x === 0 || x === 1);
  switch (g.type) {
    case "AND":
    case "NAND": {
      const v: Val = ins.some((x) => x === 0) ? 0 : known(ins) ? 1 : null;
      return g.type === "AND" ? v : not(v);
    }
    case "OR":
    case "NOR": {
      const v: Val = ins.some((x) => x === 1) ? 1 : known(ins) ? 0 : null;
      return g.type === "OR" ? v : not(v);
    }
    case "XOR":
    case "XNOR": {
      if (!known(ins)) return null;
      const v = (ins as Bit[]).reduce((a: number, x) => a ^ x, 0) as Bit;
      return g.type === "XOR" ? v : not(v);
    }
    case "NOT":
      return not(ins[0]);
    case "BUF":
      return ins[0] === "z" ? null : ins[0];
    case "MUX2":
      return ins[2] === 0 ? ins[0] : ins[2] === 1 ? ins[1] : ins[0] === ins[1] ? ins[0] : null;
    case "TBUF":
      return ins[1] === 1 ? (ins[0] === "z" ? null : ins[0]) : ins[1] === 0 ? "z" : null;
    case "DLATCH":
      return ins[1] === 1 ? (ins[0] === "z" ? null : ins[0]) : ins[1] === 0 ? (cur ?? state[g.id] ?? 0) : null;
    default:
      return state[g.id] ?? 0;
  }
}

/**
 * Settles the circuit. `state` holds flip-flop contents; `prev` (optional) holds the previous net values so
 * that latches and cross-coupled gates (e.g. an SR latch built from NORs) remember their state.
 * Returns every net value, with flip-flop Q' under `${id}.qn`.
 */
export function evalCircuit(c: CircuitSpec, inputs: Record<string, Val>, state: Record<string, Bit> = {}, prev: Record<string, Val> = {}): Record<string, Val> {
  const v: Record<string, Val> = { ...inputs };
  for (const g of c.gates) v[g.id] = prev[g.id] ?? (isSequential(g) ? (state[g.id] ?? 0) : null);
  const read = (ref: string): Val => {
    const { net, invert, qn } = netOf(ref);
    let x = v[net] ?? null;
    if (qn) x = not(x);
    return invert ? not(x) : x;
  };
  let stable = false;
  for (let iter = 0; iter < 4 * c.gates.length + 8 && !stable; iter++) {
    stable = true;
    for (const g of c.gates) {
      const out = gateOut(g, g.in.map(read), state, v[g.id]);
      if (out !== v[g.id]) {
        v[g.id] = out;
        stable = false;
      }
    }
  }
  if (!stable) for (const g of c.gates) if (!isSequential(g)) v[g.id] = prev[g.id] === v[g.id] ? v[g.id] : null;
  for (const g of c.gates) if (isSequential(g)) v[`${g.id}.qn`] = not(v[g.id]);
  return v;
}

/** Applies one rising clock edge to every flip-flop, given the settled net values before the edge. */
export function clockEdge(c: CircuitSpec, nets: Record<string, Val>, state: Record<string, Bit>): Record<string, Bit> {
  const read = (ref: string): Val => {
    const { net, invert, qn } = netOf(ref);
    let x = nets[net] ?? null;
    if (qn) x = not(x);
    return invert ? not(x) : x;
  };
  const next = { ...state };
  for (const g of c.gates) {
    const q = state[g.id] ?? 0;
    const b = (x: Val): Bit => (x === 1 ? 1 : 0);
    if (g.type === "DFF") next[g.id] = b(read(g.in[0]));
    else if (g.type === "TFF") next[g.id] = (read(g.in[0]) === 1 ? 1 - q : q) as Bit;
    else if (g.type === "JKFF") {
      const j = read(g.in[0]);
      const k = read(g.in[1]);
      next[g.id] = (j === 1 && k === 1 ? 1 - q : j === 1 ? 1 : k === 1 ? 0 : q) as Bit;
    }
  }
  return next;
}

/** True when some gate output feeds back (through combinational gates) into its own input, e.g. an SR latch. */
export function hasFeedback(c: CircuitSpec): boolean {
  const byId = new Map(c.gates.map((g) => [g.id, g]));
  const state = new Map<string, 1 | 2>();
  const visit = (id: string): boolean => {
    const g = byId.get(id);
    if (!g || isSequential(g)) return false;
    if (state.get(id) === 1) return true;
    if (state.get(id) === 2) return false;
    state.set(id, 1);
    const cyc = g.in.some((r) => visit(netOf(r).net));
    state.set(id, 2);
    return cyc;
  };
  return c.gates.some((g) => visit(g.id));
}

/** Truth table of a combinational circuit: rows over `c.inputs` (first input = MSB), one column per output. */
export function circuitTable(c: CircuitSpec, outputs = defaultOutputs(c)): Record<string, Val[]> {
  const res: Record<string, Val[]> = Object.fromEntries(outputs.map((o) => [o, []]));
  for (let m = 0; m < 1 << c.inputs.length; m++) {
    const nets = evalCircuit(c, rowEnv(c.inputs, m));
    for (const o of outputs) res[o].push(nets[o] ?? null);
  }
  return res;
}

/** Gates whose output no other gate reads. */
export function defaultOutputs(c: CircuitSpec): string[] {
  if (c.outputs) return c.outputs;
  const read = new Set(c.gates.flatMap((g) => g.in.map((r) => netOf(r).net)));
  return c.gates.filter((g) => !read.has(g.id)).map((g) => g.id);
}

/** Problems with a circuit spec (unknown nets, duplicate ids, wrong pin counts). Empty when valid. */
export function checkCircuit(c: CircuitSpec): string[] {
  const errs: string[] = [];
  const nets = new Set(c.inputs);
  for (const g of c.gates) {
    if (nets.has(g.id)) errs.push(`duplicate net "${g.id}"`);
    nets.add(g.id);
  }
  const pins: Partial<Record<GateSpec["type"], number>> = { NOT: 1, BUF: 1, DFF: 2, TFF: 2, JKFF: 3, DLATCH: 2, MUX2: 3, TBUF: 2 };
  for (const g of c.gates) {
    const want = pins[g.type];
    if (want !== undefined && g.in.length !== want) errs.push(`${g.type} "${g.id}" needs ${want} inputs, has ${g.in.length}`);
    if (want === undefined && g.in.length < 2) errs.push(`${g.type} "${g.id}" needs at least 2 inputs`);
    for (const r of g.in) {
      const { net, qn } = netOf(r);
      if (!nets.has(net)) errs.push(`gate "${g.id}" reads unknown net "${net}"`);
      if (qn && !c.gates.find((x) => x.id === net && isSequential(x))) errs.push(`"${r}": .qn only exists on flip-flops/latches`);
    }
  }
  for (const o of c.outputs ?? []) if (!nets.has(o)) errs.push(`unknown output "${o}"`);
  return errs;
}

// ---------------------------------------------------------------------------------------------
// Number helpers

export const toBin = (x: number, bits: number) => (((x % 2 ** bits) + 2 ** bits) % 2 ** bits).toString(2).padStart(bits, "0");
export const fromTwos = (bin: string) => {
  const u = parseInt(bin, 2);
  return bin[0] === "1" ? u - 2 ** bin.length : u;
};
export const gray = (x: number) => x ^ (x >> 1);
