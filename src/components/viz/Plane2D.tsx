"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { snap as snapTo, type V2 } from "./vec";

// A 2D coordinate plane in SVG. World coordinates have y pointing up.
// Children use the primitives below, which read the world→screen mapping from context.

interface Ctx2 {
  sx: (x: number) => number;
  sy: (y: number) => number;
  /** Pixels per world unit. */
  k: number;
  toWorld: (e: { clientX: number; clientY: number }) => V2;
}
const C2 = createContext<Ctx2 | null>(null);
export const usePlane = () => useContext(C2)!;

const W = 420;

export function Plane2D({
  x,
  y,
  children,
  grid = 1,
  axes = true,
  labels = true,
  className,
}: {
  x: [number, number];
  y: [number, number];
  children?: ReactNode;
  /** Grid spacing in world units (0 = none). */
  grid?: number;
  axes?: boolean;
  labels?: boolean;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const k = W / (x[1] - x[0]);
  const H = k * (y[1] - y[0]);
  const sx = (v: number) => (v - x[0]) * k;
  const sy = (v: number) => H - (v - y[0]) * k;
  const toWorld = (e: { clientX: number; clientY: number }): V2 => {
    const svg = ref.current!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return [p.x / k + x[0], (H - p.y) / k + y[0]];
  };
  const lines: ReactNode[] = [];
  if (grid > 0) {
    for (let gx = Math.ceil(x[0] / grid) * grid; gx <= x[1] + 1e-9; gx += grid)
      lines.push(<line key={`gx${gx}`} x1={sx(gx)} x2={sx(gx)} y1={0} y2={H} className="viz-grid" />);
    for (let gy = Math.ceil(y[0] / grid) * grid; gy <= y[1] + 1e-9; gy += grid)
      lines.push(<line key={`gy${gy}`} y1={sy(gy)} y2={sy(gy)} x1={0} x2={W} className="viz-grid" />);
  }
  const ticks: ReactNode[] = [];
  if (axes && labels) {
    for (let gx = Math.ceil(x[0]); gx <= x[1]; gx++)
      if (gx !== 0 && gx % 2 === 0) ticks.push(<text key={`tx${gx}`} x={sx(gx)} y={sy(0) + 14} className="viz-tick" textAnchor="middle">{gx}</text>);
    for (let gy = Math.ceil(y[0]); gy <= y[1]; gy++)
      if (gy !== 0 && gy % 2 === 0) ticks.push(<text key={`ty${gy}`} x={sx(0) - 6} y={sy(gy) + 4} className="viz-tick" textAnchor="end">{gy}</text>);
  }
  return (
    <C2.Provider value={{ sx, sy, k, toWorld }}>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className={`viz-svg ${className ?? ""}`} role="img">
        <defs>
          <ArrowDefs />
        </defs>
        {lines}
        {axes && (
          <g className="viz-axis">
            <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} />
            <line y1={0} y2={H} x1={sx(0)} x2={sx(0)} />
          </g>
        )}
        {ticks}
        {children}
      </svg>
    </C2.Provider>
  );
}

const COLORS = ["accent", "good", "bad", "warn", "orth", "ls", "eig", "cx", "dft", "muted", "text"] as const;
export type VizColor = (typeof COLORS)[number];
export const cssColor = (c: VizColor) =>
  c === "muted" ? "var(--muted)" : c === "text" ? "var(--text)" : ["orth", "ls", "eig", "cx", "dft"].includes(c) ? `var(--t-${c})` : `var(--${c})`;

/** Arrowhead markers, one per colour (context-stroke is not universally supported). */
export function ArrowDefs() {
  return (
    <>
      {COLORS.map((c) => (
        <marker key={c} id={`ah-${c}`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={cssColor(c)} />
        </marker>
      ))}
    </>
  );
}

export function Arrow2({ from = [0, 0], to, color = "accent", label, dashed, width = 2.5 }: { from?: V2; to: V2; color?: VizColor; label?: string; dashed?: boolean; width?: number }) {
  const { sx, sy } = usePlane();
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  return (
    <g>
      {len > 1e-6 && (
        <line
          x1={sx(from[0])}
          y1={sy(from[1])}
          x2={sx(to[0])}
          y2={sy(to[1])}
          stroke={cssColor(color)}
          strokeWidth={width}
          strokeDasharray={dashed ? "6 4" : undefined}
          markerEnd={`url(#ah-${color})`}
        />
      )}
      {label && <Label2 at={to} text={label} color={color} />}
    </g>
  );
}

export function Seg2({ a, b, color = "muted", dashed, width = 1.5 }: { a: V2; b: V2; color?: VizColor; dashed?: boolean; width?: number }) {
  const { sx, sy } = usePlane();
  return <line x1={sx(a[0])} y1={sy(a[1])} x2={sx(b[0])} y2={sy(b[1])} stroke={cssColor(color)} strokeWidth={width} strokeDasharray={dashed ? "5 4" : undefined} />;
}

/** Infinite-looking line through p in direction d. */
export function Line2({ p = [0, 0], d, color = "muted", dashed = true }: { p?: V2; d: V2; color?: VizColor; dashed?: boolean }) {
  const L = 100;
  const n = Math.hypot(d[0], d[1]) || 1;
  return <Seg2 a={[p[0] - (L * d[0]) / n, p[1] - (L * d[1]) / n]} b={[p[0] + (L * d[0]) / n, p[1] + (L * d[1]) / n]} color={color} dashed={dashed} width={1} />;
}

export function Poly2({ pts, color = "accent", fill, closed, width = 2, dashed }: { pts: V2[]; color?: VizColor; fill?: boolean; closed?: boolean; width?: number; dashed?: boolean }) {
  const { sx, sy } = usePlane();
  const d = pts.map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ");
  const c = cssColor(color);
  return closed || fill ? (
    <polygon points={d} fill={fill ? c : "none"} fillOpacity={fill ? 0.15 : 0} stroke={c} strokeWidth={width} strokeDasharray={dashed ? "5 4" : undefined} />
  ) : (
    <polyline points={d} fill="none" stroke={c} strokeWidth={width} strokeDasharray={dashed ? "5 4" : undefined} />
  );
}

export function Dot2({ at, color = "accent", r = 4, label }: { at: V2; color?: VizColor; r?: number; label?: string }) {
  const { sx, sy } = usePlane();
  return (
    <g>
      <circle cx={sx(at[0])} cy={sy(at[1])} r={r} fill={cssColor(color)} />
      {label && <Label2 at={at} text={label} color={color} />}
    </g>
  );
}

export function Circle2({ c = [0, 0], r, color = "muted", dashed = true }: { c?: V2; r: number; color?: VizColor; dashed?: boolean }) {
  const { sx, sy, k } = usePlane();
  return <circle cx={sx(c[0])} cy={sy(c[1])} r={r * k} fill="none" stroke={cssColor(color)} strokeWidth={1} strokeDasharray={dashed ? "4 4" : undefined} />;
}

export function Label2({ at, text, color = "text", dx = 8, dy = -8 }: { at: V2; text: string; color?: VizColor; dx?: number; dy?: number }) {
  const { sx, sy } = usePlane();
  return (
    <text x={sx(at[0]) + dx} y={sy(at[1]) + dy} className="viz-label" fill={cssColor(color)}>
      {text}
    </text>
  );
}

/** Small square marking a right angle at `at` between unit directions u and v. */
export function RightAngle2({ at, u, v, size = 0.25 }: { at: V2; u: V2; v: V2; size?: number }) {
  const nu = Math.hypot(...u) || 1;
  const nv = Math.hypot(...v) || 1;
  const a: V2 = [at[0] + (size * u[0]) / nu, at[1] + (size * u[1]) / nu];
  const c: V2 = [at[0] + (size * v[0]) / nv, at[1] + (size * v[1]) / nv];
  const b: V2 = [a[0] + (size * v[0]) / nv, a[1] + (size * v[1]) / nv];
  return <Poly2 pts={[a, b, c]} color="muted" width={1.2} />;
}

/** Draggable point. `step` snaps to a grid (0 = free). */
export function Handle2({ at, onChange, color = "accent", step = 0.5, label }: { at: V2; onChange: (p: V2) => void; color?: VizColor; step?: number; label?: string }) {
  const { sx, sy, toWorld } = usePlane();
  const dragging = useRef(false);
  return (
    <g
      className="viz-handle"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture(e.pointerId);
        e.stopPropagation();
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const [x, y] = toWorld(e);
        onChange(step ? [snapTo(x, step), snapTo(y, step)] : [x, y]);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <circle cx={sx(at[0])} cy={sy(at[1])} r={16} fill="transparent" />
      <circle cx={sx(at[0])} cy={sy(at[1])} r={7} fill={cssColor(color)} stroke="var(--surface)" strokeWidth={2} />
      {label && <Label2 at={at} text={label} color={color} />}
    </g>
  );
}
