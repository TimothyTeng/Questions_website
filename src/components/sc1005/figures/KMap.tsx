"use client";

import { gray, termCells } from "@/lib/sc1005/logic";

// Karnaugh map (2–4 variables) in Gray-code order, with optional loops drawn around product/sum terms.

export const LOOP_COLORS = ["#4b5bdc", "#d64545", "#1f9d6b", "#d97706", "#9333ea", "#0891b2", "#be185d", "#65a30d"];

export interface KMapGeometry {
  rowVars: string[];
  colVars: string[];
  rows: number[]; // Gray-ordered row codes
  cols: number[];
  /** Minterm index of the cell at (row position, column position). */
  cell: (r: number, c: number) => number;
  /** Position of minterm m: [row position, column position]. */
  pos: (m: number) => [number, number];
}

export function kmapGeometry(vars: string[]): KMapGeometry {
  const n = vars.length;
  const nr = n === 4 ? 2 : 1;
  const nc = n - nr;
  const rows = Array.from({ length: 1 << nr }, (_, i) => gray(i));
  const cols = Array.from({ length: 1 << nc }, (_, i) => gray(i));
  const cell = (r: number, c: number) => (rows[r] << nc) | cols[c];
  const pos = (m: number): [number, number] => [rows.indexOf(m >> nc), cols.indexOf(m & ((1 << nc) - 1))];
  return { rowVars: vars.slice(0, nr), colVars: vars.slice(nr), rows, cols, cell, pos };
}

/** Consecutive runs of positions (a wrapped group becomes two runs). */
function runs(ps: number[], len: number): [number, number][] {
  const s = [...new Set(ps)].sort((a, b) => a - b);
  if (s.length === len) return [[0, len - 1]];
  const out: [number, number][] = [];
  for (const p of s) {
    const last = out[out.length - 1];
    if (last && p === last[1] + 1) last[1] = p;
    else out.push([p, p]);
  }
  return out;
}

const CELL = 44;

export function KMapSvg({
  vars,
  values,
  groups = [],
  showIndex = false,
  onCellClick,
  groupColors = LOOP_COLORS,
}: {
  vars: string[];
  values: string;
  groups?: string[];
  showIndex?: boolean;
  onCellClick?: (m: number) => void;
  groupColors?: string[];
}) {
  const G = kmapGeometry(vars);
  const nrb = G.rowVars.length;
  const ncb = G.colVars.length;
  const ox = 30 + 9 * G.rowVars.join("").length;
  const oy = 46;
  const W = ox + G.cols.length * CELL + 14;
  const H = oy + G.rows.length * CELL + 14;
  const bits = (x: number, k: number) => x.toString(2).padStart(k, "0");

  const loops = groups.flatMap((t, gi) => {
    let cells: number[] = [];
    try {
      cells = termCells(t, vars);
    } catch {
      return [];
    }
    if (!cells.length) return [];
    const rp = runs(cells.map((m) => G.pos(m)[0]), G.rows.length);
    const cp = runs(cells.map((m) => G.pos(m)[1]), G.cols.length);
    const inset = 4 + (gi % 4) * 3;
    return rp.flatMap(([r0, r1]) =>
      cp.map(([c0, c1]) => (
        <rect
          key={`${gi}-${r0}-${c0}`}
          x={ox + c0 * CELL + inset}
          y={oy + r0 * CELL + inset}
          width={(c1 - c0 + 1) * CELL - 2 * inset}
          height={(r1 - r0 + 1) * CELL - 2 * inset}
          rx={12}
          fill="none"
          stroke={groupColors[gi % groupColors.length]}
          strokeWidth={2.4}
          opacity={0.9}
        />
      )),
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="kmap-svg" width={Math.round(W * 1.3)} role="img" aria-label={`Karnaugh map over ${vars.join(", ")}`}>
      <line x1={ox - 26} y1={oy - 36} x2={ox} y2={oy} stroke="var(--muted)" strokeWidth={1} />
      <text x={ox - 4} y={oy - 26} textAnchor="end" className="kmap-var">
        {G.colVars.join("")}
      </text>
      <text x={ox - 20} y={oy - 4} textAnchor="end" className="kmap-var">
        {G.rowVars.join("")}
      </text>
      {G.cols.map((c, i) => (
        <text key={`c${i}`} x={ox + i * CELL + CELL / 2} y={oy - 8} textAnchor="middle" className="kmap-head">
          {bits(c, ncb)}
        </text>
      ))}
      {G.rows.map((r, i) => (
        <text key={`r${i}`} x={ox - 6} y={oy + i * CELL + CELL / 2 + 4} textAnchor="end" className="kmap-head">
          {bits(r, nrb)}
        </text>
      ))}
      {G.rows.map((_, r) =>
        G.cols.map((__, c) => {
          const m = G.cell(r, c);
          const v = values[m] ?? "-";
          const shown = v === "-" ? "" : v === "d" || v === "x" || v === "X" ? "X" : v;
          return (
            <g key={`${r}-${c}`} onClick={onCellClick ? () => onCellClick(m) : undefined} className={onCellClick ? "kmap-cell live" : "kmap-cell"}>
              <rect x={ox + c * CELL} y={oy + r * CELL} width={CELL} height={CELL} fill={v === "1" ? "var(--good-soft)" : shown === "X" ? "var(--warn-soft)" : "var(--surface)"} stroke="var(--border)" />
              <text x={ox + c * CELL + CELL / 2} y={oy + r * CELL + CELL / 2 + 6} textAnchor="middle" className="kmap-val">
                {shown}
              </text>
              {showIndex && (
                <text x={ox + c * CELL + 4} y={oy + r * CELL + 11} className="kmap-idx">
                  {m}
                </text>
              )}
            </g>
          );
        }),
      )}
      <rect x={ox} y={oy} width={G.cols.length * CELL} height={G.rows.length * CELL} fill="none" stroke="var(--muted)" strokeWidth={1.4} />
      {loops}
    </svg>
  );
}
