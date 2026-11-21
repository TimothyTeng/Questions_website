import { useId } from "react";
import { RichInline } from "@/components/Rich";
import { figureSvg, SCREEN } from "@/lib/he1004/plot";
import type { Figure } from "@/lib/he1004/types";

/** A function plot or Venn diagram from a Figure spec (see lib/he1004/plot.ts). */
export function FigureView({ f }: { f: Figure }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <figure className="graph">
      <div className="graph-svg" dangerouslySetInnerHTML={{ __html: figureSvg(f, SCREEN, `f${uid}`) }} />
      {f.caption && (
        <figcaption className="small muted">
          <RichInline text={f.caption} />
        </figcaption>
      )}
    </figure>
  );
}

export function Figures({ fs }: { fs: Figure[] }) {
  return (
    <div className="graphs">
      {fs.map((f, i) => (
        <FigureView key={i} f={f} />
      ))}
    </div>
  );
}
