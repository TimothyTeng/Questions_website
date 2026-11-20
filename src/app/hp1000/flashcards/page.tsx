import type { Metadata } from "next";
import { Suspense } from "react";
import { FlashcardsEntry } from "./Flashcards";

export const metadata: Metadata = { title: "Flashcards · HP1000 Prep" };

export default function Hp1000FlashcardsPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading cards…</div>}>
      <FlashcardsEntry />
    </Suspense>
  );
}
