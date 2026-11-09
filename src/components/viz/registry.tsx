"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { TopicId } from "@/lib/types";

// Which interactive figures appear in which lesson section (by section index), and lazy
// loaders for each topic's figure module so a lesson only downloads its own figures.

export const SECTION_VISUALS: Record<TopicId, Record<number, string[]>> = {
  orthogonality: {
    0: ["dot-product"],
    1: ["complement-3d"],
    2: ["projection-line"],
    3: ["orthogonal-matrix"],
    4: ["projection-plane-3d"],
    5: ["gram-schmidt-3d"],
  },
  "least-squares": {
    0: ["ls-geometry-3d"],
    2: ["ls-dependent-3d"],
    5: ["regression-fit"],
  },
  eigen: {
    0: ["eigen-hunter"],
    1: ["det-lambda"],
    5: ["powers-iterate"],
    6: ["eigenbasis-grid"],
    7: ["complex-eigen-spiral"],
  },
  complex: {
    2: ["argand"],
    3: ["multiply"],
    4: ["de-moivre"],
    5: ["nth-roots"],
    6: ["quadratic-roots"],
  },
  dft: {
    1: ["phasor-spin"],
    2: ["dft-matrix-clocks"],
    3: ["dft-spectrum"],
    4: ["dft-synthesis"],
  },
};

type TopicVisual = ComponentType<{ id: string }>;
const loading = () => <div className="viz" style={{ height: 320, display: "grid", placeItems: "center" }}><span className="muted small">Loading figure…</span></div>;

const MODULES: Record<TopicId, TopicVisual> = {
  orthogonality: dynamic(() => import("./topics/orthogonality"), { ssr: false, loading }),
  "least-squares": dynamic(() => import("./topics/least-squares"), { ssr: false, loading }),
  eigen: dynamic(() => import("./topics/eigen"), { ssr: false, loading }),
  complex: dynamic(() => import("./topics/complex"), { ssr: false, loading }),
  dft: dynamic(() => import("./topics/dft"), { ssr: false, loading }),
};

export function SectionVisuals({ topic, section }: { topic: TopicId; section: number }) {
  const ids = SECTION_VISUALS[topic]?.[section];
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
