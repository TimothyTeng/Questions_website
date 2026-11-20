import { useId } from "react";
import { graphSvg, SCREEN } from "@/lib/he1002/graph";
import type { Graph } from "@/lib/he1002/types";

/** An economics diagram from a Graph spec (see lib/he1002/graph.ts). */
export function GraphView({ g }: { g: Graph }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <figure className="graph">
      <div className="graph-svg" dangerouslySetInnerHTML={{ __html: graphSvg(g, SCREEN, `g${uid}`) }} />
      {g.caption && <figcaption className="small muted">{g.caption}</figcaption>}
    </figure>
  );
}

export function Graphs({ gs }: { gs: Graph[] }) {
  return (
    <div className="graphs">
      {gs.map((g, i) => (
        <GraphView key={i} g={g} />
      ))}
    </div>
  );
}
