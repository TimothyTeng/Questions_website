import type { Metadata } from "next";
import { Suspense } from "react";
import { QuizEntry } from "./Quiz";

export const metadata: Metadata = { title: "MCQ quiz · HE1004 Prep" };

export default function He1004QuizPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading quiz…</div>}>
      <QuizEntry />
    </Suspense>
  );
}
