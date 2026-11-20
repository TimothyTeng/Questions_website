import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionsEntry } from "./Questions";

export const metadata: Metadata = { title: "Exam questions · HE1002 Prep" };

export default function He1002QuestionsPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading questions…</div>}>
      <QuestionsEntry />
    </Suspense>
  );
}
