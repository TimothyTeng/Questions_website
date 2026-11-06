import type { Question, TopicId } from "@/lib/types";

export const NONE = "None of the above";

export type Rng = {
  next(): number;
  int(lo: number, hi: number): number;
  nz(lo: number, hi: number): number;
  pick<T>(xs: readonly T[]): T;
  shuffle<T>(xs: T[]): T[];
  chance(p: number): boolean;
};

export function makeRng(seed: number): Rng {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (lo: number, hi: number) => lo + Math.floor(next() * (hi - lo + 1));
  return {
    next,
    int,
    nz(lo, hi) {
      for (;;) {
        const v = int(lo, hi);
        if (v !== 0) return v;
      }
    },
    pick: (xs) => xs[Math.floor(next() * xs.length)],
    shuffle<T>(xs: T[]) {
      const a = [...xs];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    chance: (p) => next() < p,
  };
}

/** A generated question before it gets an id. */
export type Draft = Omit<Question, "id" | "topic" | "source">;

/**
 * Build a CA2-style 5-option MCQ: four candidate answers + "None of the above".
 * Options are LaTeX strings (wrapped in $..$ here). Occasionally the correct answer is
 * withheld so that "None of the above" is right, as in the real paper.
 */
export function mcq(
  rng: Rng,
  args: { subtopic: string; prompt: string; correct: string; distractors: string[]; solution: string; math?: boolean; noneRate?: number },
): Draft {
  const wrap = (s: string) => (args.math === false ? s : `$${s}$`);
  const seen = new Set<string>([args.correct]);
  const ds: string[] = [];
  for (const d of args.distractors) {
    if (!seen.has(d)) {
      seen.add(d);
      ds.push(d);
    }
  }
  if (ds.length < 3) throw new Error(`not enough distractors for: ${args.prompt.slice(0, 60)}`);
  const useNone = ds.length >= 4 && rng.chance(args.noneRate ?? 0.12);
  const picked = rng.shuffle(ds).slice(0, useNone ? 4 : 3);
  const opts = useNone ? picked : rng.shuffle([args.correct, ...picked]);
  const options = [...opts.map(wrap), NONE];
  const answer = useNone ? 4 : opts.indexOf(args.correct);
  const solution = useNone
    ? `${args.solution}\nThe correct value $${args.correct}$ is not among options (a)–(d), so the answer is **None of the above**.`
    : args.solution;
  return { subtopic: args.subtopic, kind: "mcq", prompt: args.prompt, options, answer, solution };
}

/** True / False / Not-enough-information question. */
export function tfn(args: { subtopic: string; prompt: string; answer: 0 | 1 | 2; solution: string }): Draft {
  return {
    subtopic: args.subtopic,
    kind: "tfn",
    prompt: args.prompt,
    options: ["True", "False", "Not enough information to determine"],
    answer: args.answer,
    solution: args.solution,
  };
}

/** Run each generator repeatedly (round-robin) until `count` unique-prompt questions exist. */
export function produce(rng: Rng, gens: ((rng: Rng) => Draft)[], count: number, topic: TopicId): Draft[] {
  const out: Draft[] = [];
  const prompts = new Set<string>();
  let i = 0;
  let guard = 0;
  while (out.length < count) {
    if (++guard > count * 50) throw new Error(`${topic}: could not produce ${count} questions`);
    const g = gens[i % gens.length];
    i++;
    let q: Draft;
    try {
      q = g(rng);
    } catch (e) {
      // Degenerate random draw (singular matrix, too few distinct distractors, ...): retry.
      if (e instanceof Error && /^(retry|not enough|Frac)/.test(e.message)) continue;
      throw e;
    }
    if (prompts.has(q.prompt)) continue;
    prompts.add(q.prompt);
    out.push(q);
  }
  return out;
}

export function retry(): never {
  throw new Error("retry");
}

export const ORD = ["first", "second", "third", "fourth"];
