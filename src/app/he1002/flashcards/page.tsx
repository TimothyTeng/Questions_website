import type { Metadata } from "next";
import { Suspense } from "react";
import { FlashcardsEntry } from "./Flashcards";

export const metadata: Metadata = { title: "Flashcards · HE1002 Prep" };

export default function He1002FlashcardsPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading cards…</div>}>
      <FlashcardsEntry />
    </Suspense>
  );
}
