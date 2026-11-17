"use client";

import type { ReactNode } from "react";
import type { WaveSignal } from "@/lib/sc1005/types";

// Timing diagram: one row per signal, one character per time unit (see WaveSignal in lib/sc1005/types).

interface Seg {
  ch: string;
  t0: number;
  len: number;
  label?: string;
}

export function waveSegments(s: WaveSignal): Seg[] {
  const segs: Seg[] = [];
  let data = 0;
  let t = 0;
  for (const raw of s.wave.replace(/\|/g, "")) {
    const ch = raw === "h" || raw === "H" ? "1" : raw === "l" || raw === "L" ? "0" : raw === "X" ? "x" : raw;
    const last = segs[segs.length - 1];
    if (ch === "." && last) last.len++;
    else if (last && ch === last.ch && ch !== "=") last.len++;
    else segs.push({ ch: ch === "." ? "x" : ch, t0: t, len: 1, label: ch === "=" ? (s.data?.[data++] ?? "") : undefined });
    t++;
  }
  return segs;
}

const U = 30;
const ROW = 34;
const HI = 6;
const LO = 24;

export function WaveSvg({
  signals,
  ticks,
  marks,
  cursor,
  unit = U,
}: {
  signals: WaveSignal[];
  ticks?: string[];
  marks?: number[];
  /** Highlight time unit (e.g. the current step in an animation). */
  cursor?: number;
  unit?: number;
}) {
  const nameW = 14 + 7.5 * Math.max(2, ...signals.map((s) => s.name.length));
  const len = Math.max(1, ...signals.map((s) => s.wave.replace(/\|/g, "").length));
  const W = nameW + len * unit + 10;
  const H = signals.length * ROW + (ticks ? 22 : 8);
  const x = (t: number) => nameW + t * unit;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="wave-svg" width={Math.round(W * 1.25)} role="img" aria-label="Timing diagram">
      {Array.from({ length: len + 1 }, (_, t) => (
        <line key={`g${t}`} x1={x(t)} y1={0} x2={x(t)} y2={signals.length * ROW} stroke="var(--border)" strokeWidth={0.8} />
      ))}
      {cursor !== undefined && <rect x={x(cursor)} y={0} width={unit} height={signals.length * ROW} fill="var(--accent-soft)" />}
      {marks?.map((m) => (
        <line key={`m${m}`} x1={x(m)} y1={0} x2={x(m)} y2={signals.length * ROW} stroke="var(--accent)" strokeDasharray="4 3" strokeWidth={1.2} />
      ))}
      {signals.map((s, i) => {
        const y0 = i * ROW;
        const segs = waveSegments(s);
        const els: ReactNode[] = [];
        let lvl: number | null = null;
        let pts: string[] = [];
        const flush = (k: string) => {
          if (pts.length) els.push(<polyline key={k} points={pts.join(" ")} fill="none" stroke="var(--text)" strokeWidth={1.8} />);
          pts = [];
        };
        segs.forEach((g, k) => {
          const xa = x(g.t0);
          const xb = x(g.t0 + g.len);
          if (g.ch === "0" || g.ch === "1") {
            const y = y0 + (g.ch === "1" ? HI : LO);
            if (lvl !== null) pts.push(`${xa},${y0 + lvl}`);
            pts.push(`${xa},${y}`, `${xb},${y}`);
            lvl = g.ch === "1" ? HI : LO;
            return;
          }
          flush(`p${k}`);
          lvl = null;
          if (g.ch === "z") {
            els.push(<line key={`z${k}`} x1={xa} y1={y0 + (HI + LO) / 2} x2={xb} y2={y0 + (HI + LO) / 2} stroke="var(--accent)" strokeWidth={1.8} />);
            return;
          }
          const d = `M${xa},${y0 + (HI + LO) / 2} L${xa + 4},${y0 + HI} L${xb - 4},${y0 + HI} L${xb},${y0 + (HI + LO) / 2} L${xb - 4},${y0 + LO} L${xa + 4},${y0 + LO} Z`;
          els.push(<path key={`b${k}`} d={d} fill={g.ch === "x" ? "url(#wave-hatch)" : "var(--surface)"} stroke="var(--text)" strokeWidth={1.4} />);
          if (g.label)
            els.push(
              <text key={`t${k}`} x={(xa + xb) / 2} y={y0 + (HI + LO) / 2 + 4} textAnchor="middle" className="wave-data">
                {g.label}
              </text>,
            );
        });
        flush("end");
        return (
          <g key={s.name + i}>
            <text x={nameW - 8} y={y0 + (HI + LO) / 2 + 4} textAnchor="end" className="wave-name">
              {s.name}
            </text>
            {els}
          </g>
        );
      })}
      {ticks?.map((t, k) => (
        <text key={`k${k}`} x={x(k) + unit / 2} y={signals.length * ROW + 14} textAnchor="middle" className="wave-tick">
          {t}
        </text>
      ))}
      <defs>
        <pattern id="wave-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" strokeWidth="1.5" />
        </pattern>
      </defs>
    </svg>
  );
}
