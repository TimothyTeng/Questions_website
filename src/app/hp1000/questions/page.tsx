import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionsEntry } from "./Questions";

export const metadata: Metadata = { title: "Questions · HP1000 Prep" };

export default function Hp1000QuestionsPage() {
  return (
    <Suspense fallback={<div className="page narrow muted">Loading questions…</div>}>
      <QuestionsEntry />
    </Suspense>
  );
}
