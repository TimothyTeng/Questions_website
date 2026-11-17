"use client";

import type { FsmEdge, FsmState } from "@/lib/sc1005/types";

// State diagram: circles at grid positions, straight or curved arrows with labels, self-loops.

const S = 120; // px per grid unit
const R = 30;
const PAD = 82;

export function FsmSvg({
  states,
  edges,
  initial,
  active,
  activeEdge,
}: {
  states: FsmState[];
  edges: FsmEdge[];
  initial?: string;
  /** State id to highlight (simulation). */
  active?: string;
  /** Index into edges to highlight (the transition just taken). */
  activeEdge?: number;
}) {
  const minX = Math.min(...states.map((s) => s.x));
  const minY = Math.min(...states.map((s) => s.y));
  const maxX = Math.max(...states.map((s) => s.x));
  const maxY = Math.max(...states.map((s) => s.y));
  const P = (s: FsmState) => ({ x: PAD + (initial ? 26 : 0) + (s.x - minX) * S, y: PAD + (s.y - minY) * S });
  const W = 2 * PAD + (initial ? 26 : 0) + (maxX - minX) * S;
  const H = 2 * PAD + (maxY - minY) * S;
  const byId = new Map(states.map((s) => [s.id, s]));

  const edgeEls = edges.map((e, i) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) return null;
    const hl = activeEdge === i;
    const color = hl ? "var(--accent)" : "var(--text)";
    const pa = P(a);
    const pb = P(b);
    if (e.from === e.to) {
      const side = e.loop ?? "top";
      const dir = { top: [0, -1], bottom: [0, 1], left: [-1, 0], right: [1, 0] }[side];
      const perp = [-dir[1], dir[0]];
      const p1 = { x: pa.x + R * (dir[0] * 0.6 + perp[0] * 0.8), y: pa.y + R * (dir[1] * 0.6 + perp[1] * 0.8) };
      const p2 = { x: pa.x + R * (dir[0] * 0.6 - perp[0] * 0.8), y: pa.y + R * (dir[1] * 0.6 - perp[1] * 0.8) };
      const c1 = { x: p1.x + dir[0] * 46 + perp[0] * 22, y: p1.y + dir[1] * 46 + perp[1] * 22 };
      const c2 = { x: p2.x + dir[0] * 46 - perp[0] * 22, y: p2.y + dir[1] * 46 - perp[1] * 22 };
      const lx = pa.x + dir[0] * (R + 36);
      const ly = pa.y + dir[1] * (R + 36);
      return (
        <g key={i}>
          <path d={`M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`} fill="none" stroke={color} strokeWidth={hl ? 2.6 : 1.6} markerEnd={hl ? "url(#fsm-arrow-hl)" : "url(#fsm-arrow)"} />
          {e.label && (
            <text x={lx} y={ly + (side === "top" ? -2 : side === "bottom" ? 12 : 4)} textAnchor={side === "left" ? "end" : side === "right" ? "start" : "middle"} className="fsm-label" fill={color}>
              {e.label}
            </text>
          )}
        </g>
      );
    }
    const hasReverse = edges.some((f) => f.from === e.to && f.to === e.from);
    const bend = e.bend ?? (hasReverse ? 0.22 : 0);
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const d = Math.hypot(dx, dy) || 1;
    const nx = dy / d;
    const ny = -dx / d; // left normal (screen y points down)
    const cx = (pa.x + pb.x) / 2 + nx * bend * d;
    const cy = (pa.y + pb.y) / 2 + ny * bend * d;
    // Trim the curve to the circle edges.
    const ta = Math.atan2(cy - pa.y, cx - pa.x);
    const tb = Math.atan2(cy - pb.y, cx - pb.x);
    const sa = { x: pa.x + R * Math.cos(ta), y: pa.y + R * Math.sin(ta) };
    const sb = { x: pb.x + (R + 2) * Math.cos(tb), y: pb.y + (R + 2) * Math.sin(tb) };
    const mx = 0.25 * sa.x + 0.5 * cx + 0.25 * sb.x;
    const my = 0.25 * sa.y + 0.5 * cy + 0.25 * sb.y;
    const off = bend >= 0 ? 12 : -12;
    return (
      <g key={i}>
        <path d={`M${sa.x},${sa.y} Q${cx},${cy} ${sb.x},${sb.y}`} fill="none" stroke={color} strokeWidth={hl ? 2.6 : 1.6} markerEnd={hl ? "url(#fsm-arrow-hl)" : "url(#fsm-arrow)"} />
        {e.label && (
          <text x={mx + nx * off} y={my + ny * off + 4} textAnchor="middle" className="fsm-label" fill={color}>
            {e.label}
          </text>
        )}
      </g>
    );
  });

  const init = initial ? byId.get(initial) : undefined;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="fsm-svg" width={Math.round(W * 1.15)} role="img" aria-label="State diagram">
      <defs>
        <marker id="fsm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--text)" />
        </marker>
        <marker id="fsm-arrow-hl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
        </marker>
      </defs>
      {edgeEls}
      {init && (
        <line x1={P(init).x - R - 30} y1={P(init).y} x2={P(init).x - R - 2} y2={P(init).y} stroke="var(--text)" strokeWidth={1.6} markerEnd="url(#fsm-arrow)" />
      )}
      {states.map((s) => {
        const p = P(s);
        const on = active === s.id;
        return (
          <g key={s.id}>
            <circle cx={p.x} cy={p.y} r={R} fill={on ? "var(--accent-soft)" : "var(--surface)"} stroke={on ? "var(--accent)" : "var(--text)"} strokeWidth={on ? 3 : 1.8} />
            <text x={p.x} y={p.y + 5} textAnchor="middle" className="fsm-state">
              {s.label ?? s.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
