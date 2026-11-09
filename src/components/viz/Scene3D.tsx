"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { ArrowDefs, cssColor, type VizColor } from "./Plane2D";
import { add, clamp, scale, snap as snapTo, type V3 } from "./vec";

// A dependency-free 3D scene drawn in SVG with an orthographic camera (z is up).
// Drag empty space to rotate; drag a Handle3 to move a point parallel to the screen.

interface Ctx3 {
  /** world → [screenX, screenY, depth] (larger depth = further away) */
  project: (p: V3) => [number, number, number];
  /** screen-space drag delta (px) → world delta */
  unproject: (dx: number, dy: number) => V3;
  toSvgDelta: (dxClient: number, dyClient: number) => [number, number];
}
const C3 = createContext<Ctx3 | null>(null);
export const useScene = () => useContext(C3)!;

const W = 420;
const H = 340;

export function Scene3D({ children, extent = 4, initial = { yaw: -0.6, pitch: 0.45 }, axes = true }: { children?: ReactNode; extent?: number; initial?: { yaw: number; pitch: number }; axes?: boolean }) {
  const [cam, setCam] = useState(initial);
  const [zoom, setZoom] = useState(1);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const k = (zoom * (H * 0.42)) / extent;
  const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
  const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);

  const project = (p: V3): [number, number, number] => {
    const xr = p[0] * cy - p[1] * sy;
    const yr = p[0] * sy + p[1] * cy;
    const up = p[2] * cp + yr * sp;
    const depth = yr * cp - p[2] * sp;
    return [W / 2 + k * xr, H / 2 + 20 - k * up, depth];
  };
  const right: V3 = [cy, -sy, 0];
  const upv: V3 = [sy * sp, cy * sp, cp];
  const unproject = (dx: number, dy: number): V3 => add(scale(right, dx / k), scale(upv, -dy / k));
  const toSvgDelta = (dx: number, dy: number): [number, number] => {
    const r = svg.current!.getBoundingClientRect();
    return [(dx * W) / r.width, (dy * H) / r.height];
  };

  const ax: { v: V3; c: string; l: string }[] = [
    { v: [1, 0, 0], c: "#e05252", l: "x" },
    { v: [0, 1, 0], c: "#2f9e5b", l: "y" },
    { v: [0, 0, 1], c: "#3b6fd8", l: "z" },
  ];
  const grid: ReactNode[] = [];
  if (axes) {
    for (let i = -extent; i <= extent; i++) {
      const a = project([i, -extent, 0]), b = project([i, extent, 0]);
      const c = project([-extent, i, 0]), d = project([extent, i, 0]);
      grid.push(<line key={`a${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="viz-grid" />);
      grid.push(<line key={`b${i}`} x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} className="viz-grid" />);
    }
  }

  return (
    <C3.Provider value={{ project, unproject, toSvgDelta }}>
      <div className="viz-3d-wrap">
        <svg
          ref={svg}
          viewBox={`0 0 ${W} ${H}`}
          className="viz-svg viz-3d"
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, y: e.clientY };
            (e.currentTarget as Element).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            const [dx, dy] = toSvgDelta(e.clientX - drag.current.x, e.clientY - drag.current.y);
            drag.current = { x: e.clientX, y: e.clientY };
            setCam((c) => ({ yaw: c.yaw - dx * 0.01, pitch: clamp(c.pitch + dy * 0.01, -1.5, 1.5) }));
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <defs>
            <ArrowDefs />
          </defs>
          {grid}
          {axes &&
            ax.map(({ v, c, l }) => {
              const o = project([0, 0, 0]);
              const e = project(scale(v, extent));
              return (
                <g key={l}>
                  <line x1={o[0]} y1={o[1]} x2={e[0]} y2={e[1]} stroke={c} strokeWidth={1.2} opacity={0.7} />
                  <text x={e[0] + 4} y={e[1]} fill={c} className="viz-label">
                    {l}
                  </text>
                </g>
              );
            })}
          {children}
        </svg>
        <div className="viz-3d-tools">
          <button className="btn" onClick={() => setZoom((z) => Math.min(3, z * 1.25))} aria-label="Zoom in">＋</button>
          <button className="btn" onClick={() => setZoom((z) => Math.max(0.4, z / 1.25))} aria-label="Zoom out">－</button>
          <button className="btn" onClick={() => { setCam(initial); setZoom(1); }}>View</button>
          <button className="btn" onClick={() => setCam({ yaw: 0, pitch: Math.PI / 2 - 0.001 })}>Top</button>
          <button className="btn" onClick={() => setCam({ yaw: 0, pitch: 0 })}>Front</button>
        </div>
      </div>
    </C3.Provider>
  );
}

export function Arrow3({ from = [0, 0, 0], to, color = "accent", label, dashed, width = 2.5 }: { from?: V3; to: V3; color?: VizColor; label?: string; dashed?: boolean; width?: number }) {
  const { project } = useScene();
  const a = project(from), b = project(to);
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return (
    <g>
      {len > 0.5 && (
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={cssColor(color)} strokeWidth={width} strokeDasharray={dashed ? "6 4" : undefined} markerEnd={`url(#ah-${color})`} />
      )}
      {label && (
        <text x={b[0] + 7} y={b[1] - 7} fill={cssColor(color)} className="viz-label">
          {label}
        </text>
      )}
    </g>
  );
}

export function Seg3({ a, b, color = "muted", dashed = true, width = 1.4 }: { a: V3; b: V3; color?: VizColor; dashed?: boolean; width?: number }) {
  const { project } = useScene();
  const p = project(a), q = project(b);
  return <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={cssColor(color)} strokeWidth={width} strokeDasharray={dashed ? "5 4" : undefined} />;
}

export function Dot3({ at, color = "accent", r = 4, label }: { at: V3; color?: VizColor; r?: number; label?: string }) {
  const { project } = useScene();
  const p = project(at);
  return (
    <g>
      <circle cx={p[0]} cy={p[1]} r={r} fill={cssColor(color)} />
      {label && (
        <text x={p[0] + 7} y={p[1] - 7} fill={cssColor(color)} className="viz-label">
          {label}
        </text>
      )}
    </g>
  );
}

/** Translucent parallelogram patch spanned by u and v around `center` (the plane through it). */
export function Plane3({ u, v, center = [0, 0, 0], size = 3, color = "accent", opacity = 0.14 }: { u: V3; v: V3; center?: V3; size?: number; color?: VizColor; opacity?: number }) {
  const { project } = useScene();
  const nu = Math.hypot(...u) || 1, nv = Math.hypot(...v) || 1;
  const U = scale(u, size / nu), Vv = scale(v, size / nv);
  const corners: V3[] = [add(add(center, U), Vv), add(center, add(U, scale(Vv, -1))), add(center, scale(add(U, Vv), -1)), add(center, add(scale(U, -1), Vv))];
  const pts = corners.map((c) => project(c));
  const c = cssColor(color);
  const gridLines: ReactNode[] = [];
  for (let t = -2; t <= 2; t++) {
    const f = t / 2;
    const a1 = project(add(add(center, scale(U, f)), Vv)), b1 = project(add(add(center, scale(U, f)), scale(Vv, -1)));
    const a2 = project(add(add(center, scale(Vv, f)), U)), b2 = project(add(add(center, scale(Vv, f)), scale(U, -1)));
    gridLines.push(<line key={`p${t}`} x1={a1[0]} y1={a1[1]} x2={b1[0]} y2={b1[1]} stroke={c} strokeOpacity={0.25} strokeWidth={0.8} />);
    gridLines.push(<line key={`q${t}`} x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} stroke={c} strokeOpacity={0.25} strokeWidth={0.8} />);
  }
  return (
    <g pointerEvents="none">
      <polygon points={pts.map((p) => `${p[0]},${p[1]}`).join(" ")} fill={c} fillOpacity={opacity} stroke={c} strokeOpacity={0.5} />
      {gridLines}
    </g>
  );
}

/** Line through the origin (or p) in direction d, drawn across the scene. */
export function Line3({ d, p = [0, 0, 0], color = "muted", len = 6 }: { d: V3; p?: V3; color?: VizColor; len?: number }) {
  const n = Math.hypot(...d) || 1;
  return <Seg3 a={add(p, scale(d, -len / n))} b={add(p, scale(d, len / n))} color={color} />;
}

/** Draggable 3D point: moves parallel to the screen; rotate the view to move along other directions. */
export function Handle3({ at, onChange, color = "accent", step = 0.5, label, constrain }: { at: V3; onChange: (p: V3) => void; color?: VizColor; step?: number; label?: string; constrain?: (p: V3) => V3 }) {
  const { project, unproject, toSvgDelta } = useScene();
  const drag = useRef<{ x: number; y: number; p: V3 } | null>(null);
  const p = project(at);
  return (
    <g
      className="viz-handle"
      onPointerDown={(e) => {
        e.stopPropagation();
        drag.current = { x: e.clientX, y: e.clientY, p: at };
        (e.target as Element).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        e.stopPropagation();
        const [dx, dy] = toSvgDelta(e.clientX - drag.current.x, e.clientY - drag.current.y);
        let q = add(drag.current.p, unproject(dx, dy));
        if (constrain) q = constrain(q);
        onChange(step ? (q.map((x) => snapTo(x, step)) as V3) : q);
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      <circle cx={p[0]} cy={p[1]} r={16} fill="transparent" />
      <circle cx={p[0]} cy={p[1]} r={7} fill={cssColor(color)} stroke="var(--surface)" strokeWidth={2} />
      {label && (
        <text x={p[0] + 9} y={p[1] - 9} fill={cssColor(color)} className="viz-label">
          {label}
        </text>
      )}
    </g>
  );
}

/** Dashed drop-lines from a point to the xy-plane and axes, to help read 3D positions. */
export function DropLines({ at, color = "muted" }: { at: V3; color?: VizColor }) {
  return (
    <g opacity={0.6}>
      <Seg3 a={at} b={[at[0], at[1], 0]} color={color} width={1} />
      <Seg3 a={[at[0], at[1], 0]} b={[at[0], 0, 0]} color={color} width={1} />
      <Seg3 a={[at[0], at[1], 0]} b={[0, at[1], 0]} color={color} width={1} />
    </g>
  );
}
