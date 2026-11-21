import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionsEntry } from "./Questions";

export const metadata: Metadata = { title: "Exam questions · HE1004 Prep" };

export default function He1004QuestionsPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading questions…</div>}>
      <QuestionsEntry />
    </Suspense>
  );
}
