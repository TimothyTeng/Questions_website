"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_CARDS, type TCard } from "@/data/hp1000";
import { termMatches } from "@/lib/hp1000/grading";
import { recordCards, useCardProgress } from "@/lib/hp1000/store";
import { PARTS, TOPICS, topicById } from "@/lib/hp1000/topics";
import type { TopicId } from "@/lib/hp1000/types";

type Pool = "all" | "notknown" | "missed";

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsEntry() {
  const topic = useSearchParams().get("topic");
  const initial = TOPICS.find((t) => t.id === topic)?.id;
  return <Flashcards key={initial ?? "all"} initialTopic={initial} />;
}

function Flashcards({ initialTopic }: { initialTopic?: TopicId }) {
  const progress = useCardProgress();
  const [topics, setTopics] = useState<TopicId[]>(initialTopic ? [initialTopic] : []);
  const [pool, setPool] = useState<Pool>("all");
  const [phase, setPhase] = useState<"setup" | "deck" | "done">("setup");
  const [deck, setDeck] = useState<TCard[]>([]);
  const [pos, setPos] = useState(0);
  const [guess, setGuess] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [got, setGot] = useState<Set<string>>(new Set());
  const [missedIds, setMissedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const matching = useMemo(
    () =>
      ALL_CARDS.filter((c) => {
        if (topics.length && !topics.includes(c.topic)) return false;
        const st = progress[c.id];
        if (pool === "notknown" && st?.last) return false;
        if (pool === "missed" && (!st || st.last)) return false;
        return true;
      }),
    [topics, pool, progress],
  );

  const start = (cards: TCard[]) => {
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
  const guessOk = card ? termMatches(guess, card.answer) : false;

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
      if (e.key === "1" || e.key.toLowerCase() === "g" || e.key === "ArrowRight") rate(true);
      else if (e.key === "2" || e.key.toLowerCase() === "m" || e.key === "ArrowLeft") rate(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, flipped, rate]);

  const toggle = (id: TopicId) => setTopics((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  if (phase === "setup") {
    return (
      <div className="page narrow">
        <h1>Flashcards</h1>
        <p className="lead">
          Each card is a made-up scenario. Name the theory or term it shows — the short-answer section asks exactly this. Type your guess (optional), press Enter to flip, then mark yourself. Missed cards
          return at the end of the deck.
        </p>
        <div className="card">
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
                    {pt.name} only
                  </button>
                );
              })}
            </div>
            <div className="row">
              {TOPICS.map((t) => (
                <button key={t.id} className={`chip ${topics.includes(t.id) ? "on" : ""}`} onClick={() => toggle(t.id)}>
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
    const missed = ALL_CARDS.filter((c) => missedIds.has(c.id));
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
            <h3>Terms to revisit</h3>
            <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
              {missed.map((c) => (
                <li key={c.id}>
                  <strong>{c.answer}</strong> <span className="muted">— {topicById(c.topic).name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const t = topicById(card.topic);
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
        <div className="small muted">
          <span className="dot" style={{ background: t.color, marginRight: 6 }} />
          {t.name}
        </div>
        <div className="scenario">{card.scenario}</div>
        <input
          ref={inputRef}
          className={`answer-input ${flipped && guess.trim() ? (guessOk ? "ok" : "bad") : ""}`}
          placeholder="Name the term / theory… (Enter to flip)"
          value={guess}
          disabled={flipped}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setFlipped(true);
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
            <div className="answer">{card.answer}</div>
            {guess.trim() && (
              <div className={`small verdict ${guessOk ? "good" : ""}`} style={guessOk ? undefined : { color: "var(--bad)" }}>
                {guessOk ? "✓ Your answer matches" : `✗ You wrote “${guess}”`}
              </div>
            )}
            <p style={{ margin: "8px 0 14px" }}>{card.why}</p>
            <div className="row">
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
