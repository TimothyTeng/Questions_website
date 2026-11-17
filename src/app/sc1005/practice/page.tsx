import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeEntry } from "./Practice";

export const metadata: Metadata = { title: "Practice · SC1005 Prep" };

export default function Sc1005PracticePage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading questions…</div>}>
      <PracticeEntry />
    </Suspense>
  );
}
