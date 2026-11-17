"use client";

import type { Figure } from "@/lib/sc1005/types";
import { TxtInline } from "../Text";
import { CircuitSvg } from "./Circuit";
import { FsmSvg } from "./Fsm";
import { KMapSvg } from "./KMap";
import { WaveSvg } from "./Wave";

/** Renders any declarative Figure with its caption. */
export function FigureView({ fig }: { fig: Figure }) {
  return (
    <figure className="sc5-fig">
      <div className="sc5-fig-body">
        <FigureBody fig={fig} />
      </div>
      {fig.caption && (
        <figcaption className="small muted">
          <TxtInline text={fig.caption} />
        </figcaption>
      )}
    </figure>
  );
}

function FigureBody({ fig }: { fig: Figure }) {
  switch (fig.kind) {
    case "table":
      return <TableView head={fig.head} rows={fig.rows} />;
    case "kmap":
      return <KMapSvg vars={fig.vars} values={fig.values} groups={fig.groups} showIndex={fig.showIndex} />;
    case "wave":
      return <WaveSvg signals={fig.signals} ticks={fig.ticks} marks={fig.marks} />;
    case "circuit":
      return <CircuitSvg circuit={fig.circuit} />;
    case "fsm":
      return <FsmSvg states={fig.states} edges={fig.edges} initial={fig.initial} />;
    case "svg":
      return <div className="sc5-raw-svg" dangerouslySetInnerHTML={{ __html: fig.svg }} />;
  }
}

export function TableView({ head, rows, highlightRow }: { head: string[]; rows: (string | number)[][]; highlightRow?: number }) {
  return (
    <table className="sc5-table">
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i}>
              <TxtInline text={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={highlightRow === i ? "hl" : undefined}>
            {r.map((c, j) => (
              <td key={j}>
                <TxtInline text={String(c)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Figures({ figs }: { figs?: Figure[] }) {
  if (!figs?.length) return null;
  return (
    <div className="sc5-figs">
      {figs.map((f, i) => (
        <FigureView key={i} fig={f} />
      ))}
    </div>
  );
}
