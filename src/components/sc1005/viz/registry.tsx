"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { TopicId } from "@/lib/sc1005/types";

// Lazy loaders for each chapter's interactive figures, so a lesson only downloads its own.

type TopicVisual = ComponentType<{ id: string }>;
const loading = () => (
  <div className="viz" style={{ height: 280, display: "grid", placeItems: "center" }}>
    <span className="muted small">Loading figure…</span>
  </div>
);

const MODULES: Record<TopicId, TopicVisual> = {
  intro: dynamic(() => import("./topics/intro"), { ssr: false, loading }),
  "number-codes": dynamic(() => import("./topics/number-codes"), { ssr: false, loading }),
  boolean: dynamic(() => import("./topics/boolean"), { ssr: false, loading }),
  arithmetic: dynamic(() => import("./topics/arithmetic"), { ssr: false, loading }),
  kmaps: dynamic(() => import("./topics/kmaps"), { ssr: false, loading }),
  "ic-tech": dynamic(() => import("./topics/ic-tech"), { ssr: false, loading }),
  "comb-blocks": dynamic(() => import("./topics/comb-blocks"), { ssr: false, loading }),
  "verilog-comb": dynamic(() => import("./topics/verilog-comb"), { ssr: false, loading }),
  sequential: dynamic(() => import("./topics/sequential"), { ssr: false, loading }),
  "seq-verilog": dynamic(() => import("./topics/seq-verilog"), { ssr: false, loading }),
  fsm: dynamic(() => import("./topics/fsm"), { ssr: false, loading }),
  "fsm-verilog": dynamic(() => import("./topics/fsm-verilog"), { ssr: false, loading }),
  "verilog-recap": dynamic(() => import("./topics/verilog-recap"), { ssr: false, loading }),
};

export function LessonVisuals({ topic, ids }: { topic: TopicId; ids?: string[] }) {
  if (!ids?.length) return null;
  const M = MODULES[topic];
  return (
    <>
      {ids.map((id) => (
        <M key={id} id={id} />
      ))}
    </>
  );
}
