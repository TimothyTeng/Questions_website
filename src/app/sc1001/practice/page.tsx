import type { Metadata } from "next";
import { Suspense } from "react";
import { ScPracticeEntry } from "./ScPractice";

export const metadata: Metadata = { title: "Practice · SC1001 Prep" };

export default function ScPracticePage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading questions…</div>}>
      <ScPracticeEntry />
    </Suspense>
  );
}
