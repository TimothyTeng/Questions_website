"use client";

import { useState, type ReactNode } from "react";
import { Choice, Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Arrow2, cssColor, Handle2, Plane2D, Poly2, Seg2, type VizColor } from "../Plane2D";
import { Arrow3, Handle3, Scene3D, Seg3, useScene } from "../Scene3D";
import { add, fmt, type V2, type V3 } from "../vec";

// Interactive figures for the determinants lesson, chosen by id.
export default function DeterminantsVisual({ id }: { id: string }) {
  switch (id) {
    case "det-area-2d":
      return <AreaScaling />;
    case "row-ops-area":
      return <RowOpsArea />;
    case "det-volume-3d":
      return <VolumeScaling />;
    default:
      return null;
  }
}

const det2 = (a: V2, b: V2) => a[0] * b[1] - b[0] * a[1];
const det3 = (a: V3, b: V3, c: V3) =>
  a[0] * (b[1] * c[2] - c[1] * b[2]) - b[0] * (a[1] * c[2] - c[1] * a[2]) + c[0] * (a[1] * b[2] - b[1] * a[2]);
const toneOf = (d: number) => (Math.abs(d) < 1e-9 ? "warn" : d > 0 ? "good" : "bad");
const colorOf = (d: number): VizColor => (Math.abs(d) < 1e-9 ? "warn" : d > 0 ? "good" : "bad");

// A small "F" inside the unit square: its image shows whether orientation is kept or flipped.
const LETTER_F: V2[] = [[0.2, 0.15], [0.35, 0.15], [0.35, 0.45], [0.6, 0.45], [0.6, 0.58], [0.35, 0.58], [0.35, 0.72], [0.75, 0.72], [0.75, 0.85], [0.2, 0.85]];

const PRESETS_2D: { label: string; a: V2; b: V2 }[] = [
  { label: "Stretch", a: [2, 0.5], b: [0.5, 1.5] },
  { label: "Shear", a: [1, 0], b: [1.5, 1] },
  { label: "Reflection", a: [0, 1], b: [1, 0] },
  { label: "Rotation", a: [0.5, 1], b: [-1, 0.5] },
  { label: "Singular", a: [2, 1], b: [1, 0.5] },
];

function AreaScaling() {
  const [a, setA] = useState<V2>(PRESETS_2D[0].a);
  const [b, setB] = useState<V2>(PRESETS_2D[0].b);
  const [grid, setGrid] = useState(true);
  const d = det2(a, b);
  const ap = (p: V2): V2 => [a[0] * p[0] + b[0] * p[1], a[1] * p[0] + b[1] * p[1]];
  const gridLines: ReactNode[] = [];
  if (grid) {
    for (let i = -3; i <= 3; i++) {
      gridLines.push(<Seg2 key={`u${i}`} a={ap([i, -3])} b={ap([i, 3])} color="accent" width={0.6} />);
      gridLines.push(<Seg2 key={`v${i}`} a={ap([-3, i])} b={ap([3, i])} color="accent" width={0.6} />);
    }
  }
  const c = colorOf(d);
  return (
    <VizFrame
      title="det A = signed area of the image of the unit square"
      hint="Drag the tips of Ae₁ and Ae₂ (the columns of A). Snaps to 0.5."
      onReset={() => { setA(PRESETS_2D[0].a); setB(PRESETS_2D[0].b); }}
      figure={
        <Plane2D x={[-4, 4]} y={[-3.5, 3.5]}>
          <g opacity={0.35}>{gridLines}</g>
          <Poly2 pts={[[0, 0], [1, 0], [1, 1], [0, 1]]} color="muted" fill dashed />
          <Poly2 pts={LETTER_F} color="muted" fill />
          <Poly2 pts={[[0, 0], a, [a[0] + b[0], a[1] + b[1]], b]} color={c} fill />
          <Poly2 pts={LETTER_F.map(ap)} color={c} fill />
          <Arrow2 to={a} color="accent" label="Ae₁" />
          <Arrow2 to={b} color="eig" label="Ae₂" />
          <Handle2 at={a} onChange={setA} />
          <Handle2 at={b} onChange={setB} color="eig" />
        </Plane2D>
      }
      controls={
        <>
          <Choice
            value={PRESETS_2D.findIndex((p) => p.a[0] === a[0] && p.a[1] === a[1] && p.b[0] === b[0] && p.b[1] === b[1])}
            onChange={(i) => { if (i >= 0) { setA(PRESETS_2D[i].a); setB(PRESETS_2D[i].b); } }}
            options={PRESETS_2D.map((p, i) => ({ v: i, label: p.label }))}
          />
          <Toggle label="Show the image of the grid" value={grid} onChange={setGrid} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = \\begin{bmatrix} ${fmt(a[0])} & ${fmt(b[0])} \\\\ ${fmt(a[1])} & ${fmt(b[1])} \\end{bmatrix}$`} />
          <Read tex={`$\\det A = (${fmt(a[0])})(${fmt(b[1])}) - (${fmt(b[0])})(${fmt(a[1])}) = ${fmt(d)}$`} tone={toneOf(d)} />
          <Read tex={`area of the image of the unit square $= |\\det A| = ${fmt(Math.abs(d))}$`} />
          <Read
            tone={toneOf(d)}
            tex={Math.abs(d) < 1e-9 ? "**Flattened**: the image is a segment, $A$ is singular" : d > 0 ? "**Orientation kept**: the F reads the same way" : "**Orientation flipped**: the F is mirrored"}
          />
          <Read tex={`every region's area is multiplied by $${fmt(Math.abs(d))}$ (each grid cell has that area)`} />
        </>
      }
      tasks={[
        "Predict: the Shear preset slides the top of the square sideways. Does the area change? Check $\\det A$.",
        "Drag $A\\mathbf{e}_2$ until it lies on the line through $A\\mathbf{e}_1$. What happens to the parallelogram and to $\\det A$?",
        "Swap the roles: drag the vectors so that $A\\mathbf{e}_2$ is clockwise from $A\\mathbf{e}_1$. What happens to the sign and to the F?",
        "Double $A\\mathbf{e}_1$ only (one column scaled by 2). By what factor does the area change? Now imagine doubling both: that is $|2A| = 2^2|A|$.",
      ]}
    />
  );
}

type Op = { text: string; factor: string };

function RowOpsArea() {
  const init = { r1: [2, 0.5] as V2, r2: [1, 2] as V2 };
  const [r1, setR1] = useState<V2>(init.r1);
  const [r2, setR2] = useState<V2>(init.r2);
  const [prev, setPrev] = useState<[V2, V2] | null>(null);
  const [k, setK] = useState(1);
  const [log, setLog] = useState<Op[]>([]);
  const [start, setStart] = useState(det2(init.r1, init.r2));
  const d = det2(r1, r2);
  const apply = (n1: V2, n2: V2, op: Op) => {
    setPrev([r1, r2]);
    setR1(n1);
    setR2(n2);
    setLog((l) => [...l.slice(-5), op]);
  };
  const drag = (which: 1 | 2) => (p: V2) => {
    if (which === 1) setR1(p);
    else setR2(p);
    setPrev(null);
    setLog([]);
    setStart(which === 1 ? det2(p, r2) : det2(r1, p));
  };
  const reset = () => {
    setR1(init.r1);
    setR2(init.r2);
    setPrev(null);
    setLog([]);
    setStart(det2(init.r1, init.r2));
  };
  const c = colorOf(d);
  const kTex = fmt(k);
  return (
    <VizFrame
      title="What each row operation does to the determinant"
      hint="The rows of A are drawn as vectors; the shaded parallelogram has area |det A|. Drag a row to start over from a new matrix."
      onReset={reset}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          {prev && <Poly2 pts={[[0, 0], prev[0], [prev[0][0] + prev[1][0], prev[0][1] + prev[1][1]], prev[1]]} color="muted" dashed />}
          <Poly2 pts={[[0, 0], r1, [r1[0] + r2[0], r1[1] + r2[1]], r2]} color={c} fill />
          <Arrow2 to={r1} color="accent" label="R₁" />
          <Arrow2 to={r2} color="eig" label="R₂" />
          <Handle2 at={r1} onChange={drag(1)} />
          <Handle2 at={r2} onChange={drag(2)} color="eig" />
        </Plane2D>
      }
      controls={
        <>
          <Slider label="$k$" value={k} min={-3} max={3} step={0.5} onChange={setK} />
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <button
              className="btn small"
              onClick={() => apply(r1, [r2[0] + k * r1[0], r2[1] + k * r1[1]], { text: `$R_2 \\to R_2 + (${kTex})R_1$`, factor: "\\times 1" })}
            >
              R₂ → R₂ + kR₁
            </button>
            <button className="btn small" onClick={() => apply([k * r1[0], k * r1[1]], r2, { text: `$R_1 \\to (${kTex})R_1$`, factor: `\\times (${kTex})` })}>
              R₁ → kR₁
            </button>
            <button className="btn small" onClick={() => apply(r2, r1, { text: "$R_1 \\leftrightarrow R_2$", factor: "\\times(-1)" })}>
              R₁ ↔ R₂
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read tex={`$A = \\begin{bmatrix} ${fmt(r1[0])} & ${fmt(r1[1])} \\\\ ${fmt(r2[0])} & ${fmt(r2[1])} \\end{bmatrix},\\quad \\det A = ${fmt(d)}$`} tone={toneOf(d)} />
          {log.length === 0 ? (
            <Read tex="Apply an operation with the buttons. The dashed outline shows the previous parallelogram." />
          ) : (
            log.map((o, i) => <Read key={i} label={`${i + 1}.`} tex={`${o.text}: $\\det$ ${o.factor === "\\times 1" ? "unchanged" : `$${o.factor}$`}`} />)
          )}
          <Read tex={`start $\\det = ${fmt(start)}$, now $${fmt(d)}$`} />
        </>
      }
      tasks={[
        "Predict, then press **R₂ → R₂ + kR₁** a few times with different $k$. $R_2$ slides parallel to $R_1$: why can't the area change?",
        "Press **R₁ ↔ R₂**. The shape is identical, so why does the sign of $\\det$ change? (Look at which row comes first going counter-clockwise.)",
        "Set $k = 2$ and press **R₁ → kR₁**. Only one side of the parallelogram doubled, so the area doubles, not quadruples.",
        "Set $k = 0$ and scale. What does a zero row do to the parallelogram?",
      ]}
    />
  );
}

function Face3({ pts, color, opacity = 0.12 }: { pts: V3[]; color: VizColor; opacity?: number }) {
  const { project } = useScene();
  const p = pts.map((q) => project(q));
  return <polygon points={p.map((q) => `${q[0]},${q[1]}`).join(" ")} fill={cssColor(color)} fillOpacity={opacity} stroke="none" pointerEvents="none" />;
}

function Box({ u, v, w, color, dashed, faces }: { u: V3; v: V3; w: V3; color: VizColor; dashed?: boolean; faces?: boolean }) {
  const O: V3 = [0, 0, 0];
  const uv = add(u, v), uw = add(u, w), vw = add(v, w), uvw = add(uv, w);
  const edges: [V3, V3][] = [
    [O, u], [O, v], [O, w], [u, uv], [u, uw], [v, uv], [v, vw], [w, uw], [w, vw], [uv, uvw], [uw, uvw], [vw, uvw],
  ];
  return (
    <g>
      {faces && (
        <>
          <Face3 pts={[O, u, uv, v]} color={color} />
          <Face3 pts={[O, u, uw, w]} color={color} />
          <Face3 pts={[O, v, vw, w]} color={color} />
          <Face3 pts={[w, uw, uvw, vw]} color={color} />
          <Face3 pts={[v, uv, uvw, vw]} color={color} />
          <Face3 pts={[u, uv, uvw, uw]} color={color} />
        </>
      )}
      {edges.map(([p, q], i) => (
        <Seg3 key={i} a={p} b={q} color={color} dashed={dashed} width={dashed ? 1 : 1.6} />
      ))}
    </g>
  );
}

const PRESETS_3D: { label: string; cols: [V3, V3, V3] }[] = [
  { label: "Identity", cols: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
  { label: "Stretch", cols: [[2, 0, 0], [0, 1, 0], [0, 0, 1.5]] },
  { label: "Shear", cols: [[1, 0, 0], [1, 1, 0], [0.5, 0, 1]] },
  { label: "Mirror", cols: [[1, 0, 0], [0, 1, 0], [0, 0, -1]] },
  { label: "Tutorial 3 Q4", cols: [[1, 3, 0], [-2, 0, 2], [-1, 3, -1]] },
  { label: "Flat", cols: [[1, 0, 1], [0, 1, 1], [1, 1, 2]] },
];

function VolumeScaling() {
  const [cols, setCols] = useState<[V3, V3, V3]>(PRESETS_3D[2].cols);
  const [preset, setPreset] = useState(2);
  const [cube, setCube] = useState(true);
  const [u, v, w] = cols;
  const d = det3(u, v, w);
  const setCol = (i: number) => (p: V3) => {
    setCols((o) => o.map((x, j) => (j === i ? p : x)) as [V3, V3, V3]);
    setPreset(-1);
  };
  const c = colorOf(d);
  const ext = Math.max(2, Math.ceil(Math.max(...cols.flat().map(Math.abs)) + 0.5));
  return (
    <VizFrame
      title="Volume of the image of the unit cube = |det A|"
      hint="Drag empty space to rotate. Drag the column tips (they move parallel to the screen), or type them in."
      onReset={() => { setCols(PRESETS_3D[2].cols); setPreset(2); }}
      figure={
        <Scene3D extent={ext}>
          {cube && <Box u={[1, 0, 0]} v={[0, 1, 0]} w={[0, 0, 1]} color="muted" dashed />}
          <Box u={u} v={v} w={w} color={c} faces />
          <Arrow3 to={u} color="accent" label="Ae₁" />
          <Arrow3 to={v} color="eig" label="Ae₂" />
          <Arrow3 to={w} color="orth" label="Ae₃" />
          <Handle3 at={u} onChange={setCol(0)} />
          <Handle3 at={v} onChange={setCol(1)} color="eig" />
          <Handle3 at={w} onChange={setCol(2)} color="orth" />
        </Scene3D>
      }
      controls={
        <>
          <Choice value={preset} onChange={(i) => { setPreset(i); setCols(PRESETS_3D[i].cols); }} options={PRESETS_3D.map((p, i) => ({ v: i, label: p.label }))} />
          <VecInput label="$A\mathbf{e}_1$" value={u} onChange={(x) => setCol(0)(x as V3)} />
          <VecInput label="$A\mathbf{e}_2$" value={v} onChange={(x) => setCol(1)(x as V3)} />
          <VecInput label="$A\mathbf{e}_3$" value={w} onChange={(x) => setCol(2)(x as V3)} />
          <Toggle label="Show the unit cube (dashed)" value={cube} onChange={setCube} />
        </>
      }
      readout={
        <>
          <Read
            tex={`$A = \\begin{bmatrix} ${fmt(u[0])} & ${fmt(v[0])} & ${fmt(w[0])} \\\\ ${fmt(u[1])} & ${fmt(v[1])} & ${fmt(w[1])} \\\\ ${fmt(u[2])} & ${fmt(v[2])} & ${fmt(w[2])} \\end{bmatrix}$`}
          />
          <Read tex={`$\\det A = ${fmt(d)}$`} tone={toneOf(d)} />
          <Read tex={`volume of the image of the unit cube $= |\\det A| = ${fmt(Math.abs(d))}$`} />
          <Read
            tone={toneOf(d)}
            tex={Math.abs(d) < 1e-9 ? "**Flat**: the columns are dependent, the box has no volume, $A$ is singular" : d > 0 ? "**Orientation kept** (right-handed)" : "**Orientation reversed** (a mirror is involved)"}
          />
          <Read tex={`a solid of volume $V$ is mapped to volume $${fmt(Math.abs(d))}V$`} />
        </>
      }
      tasks={[
        "Load **Tutorial 3 Q4** (columns $(1,3,0), (-2,0,2), (-1,3,-1)$). Is the volume 18? Why is $\\det A$ negative?",
        "Load **Shear**. The box leans over but its volume stays 1. Which row operation does a shear correspond to?",
        "Load **Flat**: $A\\mathbf{e}_3 = A\\mathbf{e}_1 + A\\mathbf{e}_2$. Rotate until you see the box is squashed into a plane.",
        "Predict: if every column is doubled, by what factor does the volume grow? ($|2A| = 2^3|A|$.) Type it in to check.",
      ]}
    />
  );
}
