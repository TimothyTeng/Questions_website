import type { Metadata } from "next";
import { Suspense } from "react";
import { QuizEntry } from "./Quiz";

export const metadata: Metadata = { title: "Topic quiz · HE1002 Prep" };

export default function He1002QuizPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading quiz…</div>}>
      <QuizEntry />
    </Suspense>
  );
}
