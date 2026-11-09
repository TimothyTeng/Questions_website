"use client";

import { useState } from "react";
import { Choice, Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Arrow2, Handle2, Line2, Plane2D, Poly2, RightAngle2, Seg2 } from "../Plane2D";
import { Arrow3, DropLines, Handle3, Line3, Plane3, Scene3D, Seg3 } from "../Scene3D";
import { add, cross, dot, fmt, fmtV, norm, proj, scale, sub, unit, type V2, type V3 } from "../vec";

export default function OrthogonalityVisual({ id }: { id: string }) {
  switch (id) {
    case "dot-product":
      return <DotProduct />;
    case "projection-line":
      return <ProjectionLine />;
    case "complement-3d":
      return <Complement3D />;
    case "orthogonal-matrix":
      return <OrthogonalMatrix />;
    case "projection-plane-3d":
      return <ProjectionPlane3D />;
    case "gram-schmidt-3d":
      return <GramSchmidt3D />;
    default:
      return null;
  }
}

const deg = (r: number) => `${fmt((r * 180) / Math.PI, 1)}^\\circ`;

function angleArc(a: V2, b: V2, r: number): V2[] {
  const t1 = Math.atan2(a[1], a[0]);
  let t2 = Math.atan2(b[1], b[0]);
  let d = t2 - t1;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  t2 = t1 + d;
  return Array.from({ length: 21 }, (_, i) => {
    const t = t1 + ((t2 - t1) * i) / 20;
    return [r * Math.cos(t), r * Math.sin(t)] as V2;
  });
}

function DotProduct() {
  const init = { u: [3, 1] as V2, v: [1, 2.5] as V2 };
  const [u, setU] = useState(init.u);
  const [v, setV] = useState(init.v);
  const d = dot(u, v);
  const nu = norm(u), nv = norm(v);
  const c = nu && nv ? d / (nu * nv) : 0;
  const th = Math.acos(Math.max(-1, Math.min(1, c)));
  const shadow = proj(v, u);
  const tone = Math.abs(d) < 1e-9 ? "warn" : d > 0 ? "good" : "bad";
  const kind = Math.abs(d) < 1e-9 ? "orthogonal (θ = 90°)" : d > 0 ? "acute (θ < 90°)" : "obtuse (θ > 90°)";
  return (
    <VizFrame
      title="Dot product and angle"
      hint="Drag the tips of u and v (snaps to 0.5)."
      onReset={() => { setU(init.u); setV(init.v); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          <Line2 d={u} />
          <Poly2 pts={angleArc(u, v, 0.8)} color="warn" width={1.5} />
          <Seg2 a={v} b={shadow} dashed />
          <Arrow2 to={shadow} color="good" width={5} />
          <Arrow2 to={u} color="accent" />
          <Arrow2 to={v} color="eig" />
          <Handle2 at={u} onChange={setU} label="u" />
          <Handle2 at={v} onChange={setV} color="eig" label="v" />
        </Plane2D>
      }
      readout={
        <>
          <Read tex={`$\\mathbf{u}\\cdot\\mathbf{v} = (${fmt(u[0])})(${fmt(v[0])}) + (${fmt(u[1])})(${fmt(v[1])}) = ${fmt(d)}$`} />
          <Read tex={`$\\|\\mathbf{u}\\| = ${fmt(nu)},\\ \\|\\mathbf{v}\\| = ${fmt(nv)}$`} />
          <Read tex={`$\\cos\\theta = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|} = ${fmt(c, 3)},\\ \\theta = ${deg(th)}$`} />
          <Read tone={tone} tex={`**${kind}**`} />
          <Read label="green bar" tex={`shadow of $\\mathbf{v}$ on $\\mathbf{u}$, signed length $\\mathbf{u}\\cdot\\mathbf{v}/\\|\\mathbf{u}\\| = ${fmt(d / (nu || 1))}$`} />
        </>
      }
      tasks={[
        "Predict, then check: what must the picture look like for $\\mathbf{u}\\cdot\\mathbf{v} = 0$?",
        "Double the length of $\\mathbf{u}$. Which readouts change: $\\theta$, $\\cos\\theta$, $\\mathbf{u}\\cdot\\mathbf{v}$?",
        "Make the dot product negative. Where does the green shadow point now?",
        "Can you make $|\\mathbf{u}\\cdot\\mathbf{v}| > \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$? (Cauchy–Schwarz says never — equality only when they are parallel.)",
      ]}
    />
  );
}

function ProjectionLine() {
  const init = { y: [1.5, 3] as V2, u: [3, 1] as V2 };
  const [y, setY] = useState(init.y);
  const [u, setU] = useState(init.u);
  const yu = dot(y, u), uu = dot(u, u);
  const yh = proj(y, u);
  const z = sub(y, yh);
  return (
    <VizFrame
      title="Projection onto a line"
      hint="Drag y and u. The dashed line is Span{u}."
      onReset={() => { setY(init.y); setU(init.u); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          <Line2 d={u} />
          {norm(z) > 0.05 && norm(yh) > 0.05 && <RightAngle2 at={yh} u={scale(yh, -1)} v={z} />}
          <Arrow2 to={yh} color="good" width={4} label="ŷ" />
          <Arrow2 from={yh} to={y} color="bad" label="z" />
          <Arrow2 to={u} color="accent" />
          <Arrow2 to={y} color="text" width={2} />
          <Handle2 at={u} onChange={setU} label="u" />
          <Handle2 at={y} onChange={setY} color="text" label="y" />
        </Plane2D>
      }
      readout={
        <>
          <Read tex={`$\\hat{\\mathbf{y}} = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}}{\\mathbf{u}\\cdot\\mathbf{u}}\\mathbf{u} = \\dfrac{${fmt(yu)}}{${fmt(uu)}}\\mathbf{u} = ${fmtV(yh)}$`} />
          <Read tex={`$\\mathbf{z} = \\mathbf{y} - \\hat{\\mathbf{y}} = ${fmtV(z)}$`} />
          <Read tone="good" tex={`$\\mathbf{z}\\cdot\\mathbf{u} = ${fmt(dot(z, u))}$ — always 0`} />
          <Read tex={`distance from $\\mathbf{y}$ to the line $= \\|\\mathbf{z}\\| = ${fmt(norm(z))}$`} />
        </>
      }
      tasks={[
        "Predict: if you double $\\mathbf{u}$ (same direction), does $\\hat{\\mathbf{y}}$ change? Drag to check — then explain using the formula.",
        "Flip $\\mathbf{u}$ to point the opposite way. What happens to $\\hat{\\mathbf{y}}$?",
        "Make $\\hat{\\mathbf{y}} = \\mathbf{0}$. What is the relationship between $\\mathbf{y}$ and $\\mathbf{u}$ now?",
        "Put $\\mathbf{y}$ on the dashed line. What is $\\mathbf{z}$?",
      ]}
    />
  );
}

function Complement3D() {
  const init = { a: [2, 0, 1] as V3, b: [0, 2, 0.5] as V3, w: [1, 1, 2] as V3 };
  const [a, setA] = useState(init.a);
  const [b, setB] = useState(init.b);
  const [w, setW] = useState(init.w);
  const [showPerp, setShowPerp] = useState(true);
  const n = cross(a, b);
  const isPlane = norm(n) > 1e-6;
  const wa = dot(w, a), wb = dot(w, b);
  const inPerp = Math.abs(wa) < 1e-9 && Math.abs(wb) < 1e-9;
  return (
    <VizFrame
      title="W and its orthogonal complement in ℝ³"
      hint="Drag empty space to rotate. Drag the dots to move a, b, w (they move parallel to the screen — rotate to move them in depth)."
      onReset={() => { setA(init.a); setB(init.b); setW(init.w); }}
      figure={
        <Scene3D extent={3}>
          {isPlane && <Plane3 u={a} v={b} size={3} color="accent" />}
          {showPerp && isPlane && <Line3 d={n} color="bad" />}
          <Arrow3 to={a} color="accent" label="a" />
          <Arrow3 to={b} color="accent" label="b" />
          <Arrow3 to={w} color={inPerp ? "good" : "warn"} label="w" />
          <DropLines at={w} />
          <Handle3 at={a} onChange={setA} />
          <Handle3 at={b} onChange={setB} />
          <Handle3 at={w} onChange={setW} color={inPerp ? "good" : "warn"} />
        </Scene3D>
      }
      controls={
        <>
          <VecInput label="$\mathbf{w}$" value={w} onChange={(v) => setW(v as V3)} />
          <Toggle label="Show $W^\perp$ (red line)" value={showPerp} onChange={setShowPerp} />
        </>
      }
      readout={
        <>
          <Read tex={`$W = \\operatorname{Span}\\{\\mathbf{a},\\mathbf{b}\\}$ is a ${isPlane ? "plane" : "line"} $\\Rightarrow \\dim W^\\perp = ${isPlane ? 1 : 2}$`} />
          <Read tex={`$\\mathbf{w}\\cdot\\mathbf{a} = ${fmt(wa)},\\quad \\mathbf{w}\\cdot\\mathbf{b} = ${fmt(wb)}$`} />
          <Read tone={inPerp ? "good" : "warn"} tex={inPerp ? "$\\mathbf{w} \\in W^\\perp$ ✓ (orthogonal to both)" : "$\\mathbf{w} \\notin W^\\perp$ — needs both dot products $= 0$"} />
          {isPlane && <Read tex={`$W^\\perp = \\operatorname{Span}\\{\\mathbf{a}\\times\\mathbf{b}\\} = \\operatorname{Span}\\{${fmtV(n)}\\}$`} />}
        </>
      }
      tasks={[
        "Press **Top**, then rotate until the plane is seen edge-on. What does $W^\\perp$ look like relative to it?",
        "Type $\\mathbf{w} = \\mathbf{a}\\times\\mathbf{b}$ into the boxes. Do both dot products vanish?",
        "Find a $\\mathbf{w}$ with $\\mathbf{w}\\cdot\\mathbf{a} = 0$ but $\\mathbf{w}\\cdot\\mathbf{b} \\ne 0$. Why is that not enough?",
        "Predict: make $\\mathbf{b}$ a multiple of $\\mathbf{a}$. What is $\\dim W^\\perp$ now? (Row $A$ ⟂ Nul $A$ works the same way.)",
      ]}
    />
  );
}

const SHAPE: V2[] = [[0, 0], [1, 0], [1, 0.4], [0.4, 0.4], [0.4, 0.8], [0.9, 0.8], [0.9, 1.2], [0.4, 1.2], [0.4, 1.8], [0, 1.8]];

function OrthogonalMatrix() {
  const [kind, setKind] = useState<"rot" | "ref" | "shear">("rot");
  const [t, setT] = useState(0.6);
  const [x, setX] = useState<V2>([2, 1]);
  const [y, setY] = useState<V2>([-1, 2]);
  const c = Math.cos(t), s = Math.sin(t);
  const M: [V2, V2] = kind === "rot" ? [[c, -s], [s, c]] : kind === "ref" ? [[Math.cos(2 * t), Math.sin(2 * t)], [Math.sin(2 * t), -Math.cos(2 * t)]] : [[1, t * 1.5], [0, 1]];
  const ap = (p: V2): V2 => [M[0][0] * p[0] + M[0][1] * p[1], M[1][0] * p[0] + M[1][1] * p[1]];
  const col1: V2 = [M[0][0], M[1][0]], col2: V2 = [M[0][1], M[1][1]];
  const UtU = [[dot(col1, col1), dot(col1, col2)], [dot(col2, col1), dot(col2, col2)]];
  const orth = kind !== "shear";
  return (
    <VizFrame
      title="Orthogonal matrices keep lengths and angles"
      hint="Pick a matrix and move the slider. Drag x and y; their images Ux, Uy are drawn in green."
      figure={
        <Plane2D x={[-4, 4]} y={[-3.5, 3.5]}>
          <Poly2 pts={SHAPE} color="muted" fill />
          <Poly2 pts={SHAPE.map(ap)} color="good" fill />
          <Arrow2 to={x} color="accent" label="x" />
          <Arrow2 to={y} color="eig" label="y" />
          <Arrow2 to={ap(x)} color="good" label="Ux" />
          <Arrow2 to={ap(y)} color="good" label="Uy" />
          <Handle2 at={x} onChange={setX} />
          <Handle2 at={y} onChange={setY} color="eig" />
        </Plane2D>
      }
      controls={
        <>
          <Choice value={kind} onChange={setKind} options={[{ v: "rot", label: "Rotation" }, { v: "ref", label: "Reflection" }, { v: "shear", label: "Shear (not orthogonal)" }]} />
          <Slider label={kind === "shear" ? "shear amount" : kind === "rot" ? "angle θ" : "mirror angle θ"} value={t} min={kind === "shear" ? 0 : -3.14} max={kind === "shear" ? 1.5 : 3.14} step={0.01} onChange={setT} />
        </>
      }
      readout={
        <>
          <Read tex={`$U = \\begin{bmatrix} ${fmt(M[0][0])} & ${fmt(M[0][1])} \\\\ ${fmt(M[1][0])} & ${fmt(M[1][1])} \\end{bmatrix},\\ U^TU = \\begin{bmatrix} ${fmt(UtU[0][0])} & ${fmt(UtU[0][1])} \\\\ ${fmt(UtU[1][0])} & ${fmt(UtU[1][1])} \\end{bmatrix}$`} />
          <Read tex={`$\\|\\mathbf{x}\\| = ${fmt(norm(x))}$ vs $\\|U\\mathbf{x}\\| = ${fmt(norm(ap(x)))}$`} tone={orth ? "good" : "bad"} />
          <Read tex={`$\\mathbf{x}\\cdot\\mathbf{y} = ${fmt(dot(x, y))}$ vs $U\\mathbf{x}\\cdot U\\mathbf{y} = ${fmt(dot(ap(x), ap(y)))}$`} tone={orth ? "good" : "bad"} />
          <Read tex={orth ? "$U^TU = I$ → lengths and angles preserved, $U^{-1} = U^T$" : "$U^TU \\ne I$ → lengths/angles change"} tone={orth ? "good" : "bad"} />
        </>
      }
      tasks={[
        "Rotate: does the green shape ever change size or get skewed? Check $U^TU$ at every angle.",
        "Switch to Shear. Which readouts break first?",
        "Predict $\\det U$ for a rotation and for a reflection (look at the orientation of the F).",
      ]}
    />
  );
}

const PLANES: { label: string; u1: V3; u2: V3; y: V3 }[] = [
  { label: "CA2 Q1: $\\operatorname{Span}\\{(1,0,1),(0,1,0)\\}$", u1: [1, 0, 1], u2: [0, 1, 0], y: [-1, 2, 3] },
  { label: "$xy$-plane", u1: [1, 0, 0], u2: [0, 1, 0], y: [2, 1, 2.5] },
  { label: "Tilted: $(2,5,-1),(-2,1,1)$", u1: [2, 5, -1], u2: [-2, 1, 1], y: [1, 2, 3] },
];

function ProjectionPlane3D() {
  const [pi, setPi] = useState(0);
  const P = PLANES[pi];
  const [y, setY] = useState<V3>(P.y);
  const [parts, setParts] = useState(true);
  const c1 = dot(y, P.u1) / dot(P.u1, P.u1), c2 = dot(y, P.u2) / dot(P.u2, P.u2);
  const p1 = scale(P.u1, c1), p2 = scale(P.u2, c2);
  const yh = add(p1, p2);
  const z = sub(y, yh);
  const s = Math.max(norm(P.u1), 1);
  return (
    <VizFrame
      title="Orthogonal decomposition y = ŷ + z"
      hint="Drag y (white). Drag empty space to rotate. ŷ (green) lives in W; z (red) sticks straight out of W."
      onReset={() => setY(P.y)}
      figure={
        <Scene3D extent={3.4}>
          <Plane3 u={P.u1} v={P.u2} size={3.5} color="good" />
          <Arrow3 to={scale(P.u1, 1.5 / s)} color="accent" label="u₁" width={1.8} />
          <Arrow3 to={unit(P.u2)} color="accent" label="u₂" width={1.8} />
          {parts && (
            <>
              <Seg3 a={[0, 0, 0]} b={p1} color="good" />
              <Seg3 a={p1} b={yh} color="good" />
            </>
          )}
          <Arrow3 to={yh} color="good" label="ŷ" />
          <Arrow3 from={yh} to={y} color="bad" label="z" />
          <Arrow3 to={y} color="text" width={2} />
          <Handle3 at={y} onChange={setY} color="text" label="y" />
        </Scene3D>
      }
      controls={
        <>
          <Choice value={pi} onChange={(i) => { setPi(i); setY(PLANES[i].y); }} options={PLANES.map((p, i) => ({ v: i, label: p.label }))} />
          <VecInput label="$\mathbf{y}$" value={y} onChange={(v) => setY(v as V3)} />
          <Toggle label="Show the two pieces $c_1\mathbf{u}_1 + c_2\mathbf{u}_2$" value={parts} onChange={setParts} />
        </>
      }
      readout={
        <>
          <Read tex={`$c_1 = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}_1}{\\mathbf{u}_1\\cdot\\mathbf{u}_1} = \\dfrac{${fmt(dot(y, P.u1))}}{${fmt(dot(P.u1, P.u1))}} = ${fmt(c1)},\\quad c_2 = \\dfrac{${fmt(dot(y, P.u2))}}{${fmt(dot(P.u2, P.u2))}} = ${fmt(c2)}$`} />
          <Read tex={`$\\hat{\\mathbf{y}} = \\operatorname{Proj}_W\\mathbf{y} = ${fmtV(yh)}$`} tone="good" />
          <Read tex={`$\\mathbf{z} = \\mathbf{y}-\\hat{\\mathbf{y}} = ${fmtV(z)}$, $\\ \\mathbf{z}\\cdot\\mathbf{u}_1 = ${fmt(dot(z, P.u1))}$, $\\mathbf{z}\\cdot\\mathbf{u}_2 = ${fmt(dot(z, P.u2))}$`} tone="bad" />
          <Read tex={`distance to $W$ = $\\|\\mathbf{z}\\| = ${fmt(norm(z))}$ (best approximation)`} />
        </>
      }
      tasks={[
        "With the CA2 Q1 plane and $\\mathbf{y} = (-1,2,3)$: do you get $\\hat{\\mathbf{y}} = (1,2,1)$? Rotate to see $\\mathbf{z}$ meet the plane at a right angle.",
        "Predict: if $\\mathbf{y}$ already lies in $W$, what are $\\hat{\\mathbf{y}}$ and $\\mathbf{z}$? Drag it into the plane to check.",
        "Rotate so the plane is edge-on. Now the projection looks like a 2D 'drop straight down' — that is the whole idea.",
        "The formula only works because $\\mathbf{u}_1 \\perp \\mathbf{u}_2$. In the tilted preset, check $\\mathbf{u}_1\\cdot\\mathbf{u}_2 = 0$.",
      ]}
    />
  );
}

function GramSchmidt3D() {
  const init: [V3, V3, V3] = [[2, 0, 1], [1, 2, 0], [0, 1, 2]];
  const [xs, setXs] = useState<[V3, V3, V3]>(init);
  const [step, setStep] = useState(0);
  const [x1, x2, x3] = xs;
  const v1 = x1;
  const p21 = proj(x2, v1);
  const v2 = sub(x2, p21);
  const p31 = proj(x3, v1), p32 = proj(x3, v2);
  const v3 = sub(sub(x3, p31), p32);
  const qs = [unit(v1), unit(v2), unit(v3)];
  const set = (i: number) => (p: V3) => setXs((o) => o.map((x, j) => (j === i ? p : x)) as [V3, V3, V3]);
  const STEPS = [
    "Start: three independent vectors $\\mathbf{x}_1,\\mathbf{x}_2,\\mathbf{x}_3$.",
    "$\\mathbf{v}_1 = \\mathbf{x}_1$.",
    "Remove from $\\mathbf{x}_2$ its shadow on $\\mathbf{v}_1$: $\\mathbf{v}_2 = \\mathbf{x}_2 - \\operatorname{proj}_{\\mathbf{v}_1}\\mathbf{x}_2$.",
    "Remove from $\\mathbf{x}_3$ its shadows on $\\mathbf{v}_1$ **and** $\\mathbf{v}_2$: $\\mathbf{v}_3 = \\mathbf{x}_3 - \\operatorname{proj}_{\\mathbf{v}_1}\\mathbf{x}_3 - \\operatorname{proj}_{\\mathbf{v}_2}\\mathbf{x}_3$.",
    "Normalise: $\\mathbf{q}_i = \\mathbf{v}_i/\\|\\mathbf{v}_i\\|$. These are the columns of $Q$; $R = Q^TA$ is upper triangular.",
  ];
  const r = (i: number, j: number) => dot(qs[i], xs[j]);
  return (
    <VizFrame
      title="Gram–Schmidt, one step at a time"
      hint="Use the step buttons. Drag the x tips (rotate the view to move them in depth)."
      onReset={() => { setXs(init); setStep(0); }}
      figure={
        <Scene3D extent={2.6}>
          {step >= 2 && <Plane3 u={v1} v={v2} size={2.6} color="good" opacity={0.08} />}
          {xs.map((x, i) => (
            <Arrow3 key={i} to={x} color="muted" width={1.6} label={step < 4 ? `x${"₁₂₃"[i]}` : undefined} dashed={step >= 1 && i === 0} />
          ))}
          {step >= 1 && step < 4 && <Arrow3 to={v1} color="accent" label="v₁" />}
          {step === 2 && (
            <>
              <Arrow3 to={p21} color="warn" label="proj" width={2} />
              <Seg3 a={p21} b={x2} color="warn" />
            </>
          )}
          {step >= 2 && step < 4 && <Arrow3 to={v2} color="eig" label="v₂" />}
          {step === 3 && (
            <>
              <Arrow3 to={add(p31, p32)} color="warn" label="shadow in plane" width={2} />
              <Seg3 a={add(p31, p32)} b={x3} color="warn" />
            </>
          )}
          {step >= 3 && step < 4 && <Arrow3 to={v3} color="good" label="v₃" />}
          {step >= 4 && qs.map((q, i) => <Arrow3 key={i} to={q} color={(["accent", "eig", "good"] as const)[i]} label={`q${"₁₂₃"[i]}`} width={3} />)}
          {xs.map((x, i) => (
            <Handle3 key={i} at={x} onChange={set(i)} color="muted" />
          ))}
        </Scene3D>
      }
      controls={
        <div className="row">
          <button className="btn" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
          <span className="small muted">Step {step} / 4</span>
          <button className="btn primary" disabled={step === 4} onClick={() => setStep(step + 1)}>Next →</button>
        </div>
      }
      readout={
        <>
          <Read tex={STEPS[step]} />
          {step >= 2 && <Read tex={`$\\mathbf{v}_2 = ${fmtV(v2)}$`} />}
          {step >= 3 && <Read tex={`$\\mathbf{v}_3 = ${fmtV(v3)}$`} />}
          {step >= 2 && <Read tone="good" tex={`checks: $\\mathbf{v}_1\\cdot\\mathbf{v}_2 = ${fmt(dot(v1, v2))}$${step >= 3 ? `, $\\mathbf{v}_1\\cdot\\mathbf{v}_3 = ${fmt(dot(v1, v3))}$, $\\mathbf{v}_2\\cdot\\mathbf{v}_3 = ${fmt(dot(v2, v3))}$` : ""}`} />}
          {step === 4 && (
            <Read tex={`$R = \\begin{bmatrix} ${fmt(r(0, 0))} & ${fmt(r(0, 1))} & ${fmt(r(0, 2))} \\\\ 0 & ${fmt(r(1, 1))} & ${fmt(r(1, 2))} \\\\ 0 & 0 & ${fmt(r(2, 2))} \\end{bmatrix}$ ($r_{ij} = \\mathbf{q}_i\\cdot\\mathbf{x}_j$)`} />
          )}
        </>
      }
      tasks={[
        "At step 2, rotate until $\\mathbf{v}_1$ points at you. The orange shadow and $\\mathbf{v}_2$ should form a right angle.",
        "Predict: if $\\mathbf{x}_2$ is already orthogonal to $\\mathbf{x}_1$, what does step 2 do? Drag to test.",
        "Drag $\\mathbf{x}_3$ into the green plane of $\\mathbf{v}_1, \\mathbf{v}_2$. What happens to $\\mathbf{v}_3$ — and what does that say about the columns of $A$ and $R$?",
      ]}
    />
  );
}

