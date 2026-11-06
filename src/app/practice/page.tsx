import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeEntry } from "./Practice";

export const metadata: Metadata = { title: "Practice · LA CA2 Mastery" };

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading questions…</div>}>
      <PracticeEntry />
    </Suspense>
  );
}
