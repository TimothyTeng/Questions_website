"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_CARDS, ALL_FORMULAS } from "@/data/he1002";
import { termMatches } from "@/lib/he1002/grading";
import { recordCards, useCardProgress } from "@/lib/he1002/store";
import { PARTS, TOPICS, topicById } from "@/lib/he1002/topics";
import type { TopicId } from "@/lib/he1002/types";

type Pool = "all" | "notknown" | "missed";
type Deck = "concept" | "scenario" | "formula";

/** One card in a session: a concept/scenario flashcard or a formula from the formula bank. */
interface Card {
  id: string;
  topic: TopicId;
  deck: Deck;
  front: string;
  /** Small line above the front, e.g. which section a formula is from. */
  context?: string;
  back: string;
  why?: string;
}

const CARDS: Card[] = [
  ...ALL_CARDS.map((c) => ({ id: c.id, topic: c.topic, deck: c.type, front: c.front, back: c.back, why: c.why })),
  ...ALL_FORMULAS.map((f) => ({
    id: f.id,
    topic: f.topic,
    deck: "formula" as const,
    context: f.section,
    front: `${f.name}${f.note ? `\n(${f.note})` : ""}`,
    back: f.expr,
  })),
];

const DECKS: { d: Deck; label: string; hint: string }[] = [
  { d: "concept", label: "📖 Terms", hint: "definition → name the term" },
  { d: "scenario", label: "🧩 Scenarios", hint: "hypothetical situation → work it out" },
  { d: "formula", label: "🧮 Formulas", hint: "formula name → write the formula" },
];

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsEntry() {
  const sp = useSearchParams();
  const topic = sp.get("topic");
  const initial = TOPICS.find((t) => t.id === topic)?.id;
  const deck = sp.get("deck");
  const decks: Deck[] = deck === "formulas" ? ["formula"] : deck === "scenarios" ? ["scenario"] : deck === "terms" ? ["concept"] : ["concept", "scenario"];
  return <Flashcards key={`${initial ?? "all"}-${deck}`} initialTopic={initial} initialDecks={decks} />;
}

function Flashcards({ initialTopic, initialDecks }: { initialTopic?: TopicId; initialDecks: Deck[] }) {
  const progress = useCardProgress();
  const [topics, setTopics] = useState<TopicId[]>(initialTopic ? [initialTopic] : []);
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [pool, setPool] = useState<Pool>("all");
  const [phase, setPhase] = useState<"setup" | "deck" | "done">("setup");
  const [deck, setDeck] = useState<Card[]>([]);
  const [pos, setPos] = useState(0);
  const [guess, setGuess] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [got, setGot] = useState<Set<string>>(new Set());
  const [missedIds, setMissedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const inTopics = useCallback((c: Card) => !topics.length || topics.includes(c.topic), [topics]);
  const matching = useMemo(
    () =>
      CARDS.filter((c) => {
        if (!inTopics(c) || !decks.includes(c.deck)) return false;
        const st = progress[c.id];
        if (pool === "notknown" && st?.last) return false;
        if (pool === "missed" && (!st || st.last)) return false;
        return true;
      }),
    [inTopics, decks, pool, progress],
  );

  const start = (cards: Card[]) => {
    setDeck(shuffle(cards));
    setPos(0);
    setGuess("");
    setFlipped(false);
    setGot(new Set());
    setMissedIds(new Set());
    setPhase("deck");
  };

  const card = deck[pos];
  const firstPass = card ? !got.has(card.id) && !missedIds.has(card.id) : false;
  // Only short term answers are auto-checked; scenarios and formulas are self-rated against the back.
  const autoCheck = card?.deck === "concept";
  const guessOk = card && autoCheck ? termMatches(guess, card.back) : false;

  const rate = useCallback(
    (ok: boolean) => {
      if (!card) return;
      recordCards([{ id: card.id, correct: ok }]);
      if (ok) setGot((s) => new Set(s).add(card.id));
      else {
        setMissedIds((s) => new Set(s).add(card.id));
        // Missed cards come back later in the same session until you get them.
        setDeck((d) => [...d, card]);
      }
      setGuess("");
      setFlipped(false);
      if (pos + 1 >= deck.length + (ok ? 0 : 1)) setPhase("done");
      else setPos((p) => p + 1);
    },
    [card, pos, deck.length],
  );

  useEffect(() => {
    if (phase !== "deck") return;
    if (!flipped) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (!flipped) return;
      if (e.key === "1" || e.key === "ArrowRight") rate(true);
      else if (e.key === "2" || e.key === "ArrowLeft") rate(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, flipped, rate]);

  const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);

  if (phase === "setup") {
    return (
      <div className="page narrow">
        <h1>Flashcards</h1>
        <p className="lead">
          <strong>Terms</strong>: a definition on the front, name the term. <strong>Scenarios</strong>: a hypothetical situation, work out what happens or how to solve it. <strong>Formulas</strong>: the
          formula&apos;s name, write it out. Type your answer (optional), press Enter to flip, then mark yourself. Missed cards return at the end of the deck.
        </p>
        <div className="card">
          <div className="field">
            <span className="field-label">Deck</span>
            <div className="row">
              {DECKS.map(({ d, label, hint }) => (
                <button key={d} title={hint} className={`chip ${decks.includes(d) ? "on" : ""}`} onClick={() => setDecks((p) => (p.length === 1 && p[0] === d ? p : toggle(p, d)))}>
                  {label} ({CARDS.filter((c) => c.deck === d && inTopics(c)).length})
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <span className="field-label">Topics</span>
            <div className="row" style={{ marginBottom: 6 }}>
              <button className={`chip ${topics.length === 0 ? "on" : ""}`} onClick={() => setTopics([])}>
                🎲 All topics
              </button>
              {PARTS.map((pt) => {
                const ids = TOPICS.filter((t) => t.part === pt.part).map((t) => t.id);
                const on = ids.length === topics.length && ids.every((id) => topics.includes(id));
                return (
                  <button key={pt.part} className={`chip ${on ? "on" : ""}`} onClick={() => setTopics(on ? [] : ids)}>
                    {pt.note}
                  </button>
                );
              })}
            </div>
            <div className="row">
              {TOPICS.map((t) => (
                <button key={t.id} className={`chip ${topics.includes(t.id) ? "on" : ""}`} onClick={() => setTopics((p) => toggle(p, t.id))}>
                  <span className="dot" style={{ background: t.color, marginRight: 6 }} />
                  {t.n}. {t.name}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <span className="field-label">Cards</span>
            <div className="row">
              {(
                [
                  ["all", "All"],
                  ["notknown", "Not yet known"],
                  ["missed", "Missed last time"],
                ] as [Pool, string][]
              ).map(([k, label]) => (
                <button key={k} className={`chip ${pool === k ? "on" : ""}`} onClick={() => setPool(k)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <span className="small muted">
              {matching.length} card{matching.length === 1 ? "" : "s"}
            </span>
            <span className="spacer" />
            <button className="btn primary" disabled={!matching.length} onClick={() => start(matching)}>
              Start {matching.length} cards →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const missed = CARDS.filter((c) => missedIds.has(c.id));
    return (
      <div className="page narrow stack">
        <h1>Deck done</h1>
        <p className="lead">
          {got.size} card{got.size === 1 ? "" : "s"} known{missed.length ? ` · ${missed.length} needed more than one go` : " · no misses"}.
        </p>
        <div className="row">
          {missed.length > 0 && (
            <button className="btn primary" onClick={() => start(missed)}>
              Drill the {missed.length} I missed
            </button>
          )}
          <button className="btn" onClick={() => setPhase("setup")}>
            New deck
          </button>
        </div>
        {missed.length > 0 && (
          <div className="card">
            <h3>To revisit</h3>
            <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
              {missed.map((c) => (
                <li key={c.id} style={{ whiteSpace: "pre-line" }}>
                  {c.deck === "concept" ? <strong>{c.back}</strong> : c.deck === "formula" ? <><strong>{c.front.split("\n")[0]}</strong>: {c.back}</> : c.front.slice(0, 120) + (c.front.length > 120 ? "…" : "")}{" "}
                  <span className="muted">— {topicById(c.topic).name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const t = topicById(card.topic);
  const label = card.deck === "concept" ? "Name the term" : card.deck === "scenario" ? "Work it out" : "Write the formula";
  return (
    <div className="page narrow stack">
      <div className="row">
        <h2 style={{ margin: 0 }}>
          Card {pos + 1} of {deck.length}
        </h2>
        <span className="small muted">
          {got.size} known{missedIds.size ? ` · ${missedIds.size} missed` : ""}
          {!firstPass ? " · repeat" : ""}
        </span>
        <span className="spacer" />
        <button className="btn" onClick={() => setPhase("done")}>
          End
        </button>
      </div>
      <div className="bar">
        <div style={{ width: `${(100 * pos) / deck.length}%`, background: "var(--accent)" }} />
      </div>
      <article className="card flash" style={{ borderTop: `4px solid ${t.color}` }}>
        <div className="row small muted">
          <span className="dot" style={{ background: t.color }} />
          {t.name}
          {card.context && <span>· {card.context}</span>}
          <span className="spacer" />
          <span className="badge">{label}</span>
        </div>
        <div className="scenario" style={{ whiteSpace: "pre-line" }}>
          {card.front}
        </div>
        <textarea
          ref={inputRef}
          rows={card.deck === "scenario" ? 3 : 1}
          className={`answer-input ${flipped && autoCheck && guess.trim() ? (guessOk ? "ok" : "bad") : ""}`}
          style={{ minHeight: 0 }}
          placeholder={card.deck === "concept" ? "Name the term… (Enter to flip)" : card.deck === "formula" ? "Write the formula… (Enter to flip)" : "Your answer… (Enter to flip, Shift+Enter for a new line)"}
          value={guess}
          disabled={flipped}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setFlipped(true);
            }
          }}
          spellCheck={false}
          autoComplete="off"
        />
        {!flipped ? (
          <div className="row">
            <span className="spacer" />
            <button className="btn primary" onClick={() => setFlipped(true)}>
              Flip <span className="kbd">Enter</span>
            </button>
          </div>
        ) : (
          <div className="reveal">
            <div className={`answer back ${card.deck === "formula" ? "mono" : ""}`} style={card.deck === "scenario" ? { fontSize: "1.1rem" } : undefined}>
              {card.back}
            </div>
            {autoCheck && guess.trim() && (
              <div className={`small verdict ${guessOk ? "good" : ""}`} style={guessOk ? undefined : { color: "var(--bad)" }}>
                {guessOk ? "✓ Your answer matches" : `✗ You wrote “${guess}”`}
              </div>
            )}
            {!autoCheck && guess.trim() && <div className="small muted">You wrote: “{guess}” — compare it with the answer above.</div>}
            {card.why && <p style={{ margin: "8px 0 14px", whiteSpace: "pre-line" }}>{card.why}</p>}
            <div className="row" style={{ marginTop: card.why ? 0 : 12 }}>
              <button className="btn" onClick={() => rate(false)}>
                ✗ Missed <span className="kbd">2</span>
              </button>
              <span className="spacer" />
              <button className="btn primary" onClick={() => rate(true)}>
                ✓ Got it <span className="kbd">1</span>
              </button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
