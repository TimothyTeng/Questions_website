"use client";

import { useState } from "react";
import { Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Dot2, Handle2, Line2, Plane2D, Seg2 } from "../Plane2D";
import { Arrow3, Dot3, Handle3, Line3, Plane3, Scene3D, Seg3 } from "../Scene3D";
import { add, dot, fmt, fmtV, norm, proj, scale, sub, type V2, type V3 } from "../vec";

export default function LeastSquaresVisual({ id }: { id: string }) {
  switch (id) {
    case "ls-geometry-3d":
      return <LSGeometry dependent={false} />;
    case "ls-dependent-3d":
      return <LSGeometry dependent />;
    case "regression-fit":
      return <RegressionFit />;
    default:
      return null;
  }
}

function LSGeometry({ dependent }: { dependent: boolean }) {
  const init = { a1: [2.5, 0, 0.5] as V3, a2: [0.5, 2.5, 0] as V3, b: [1.5, 2, 2.5] as V3, k: 1.5 };
  const [a1, setA1] = useState(init.a1);
  const [a2free, setA2] = useState(init.a2);
  const [b, setB] = useState(init.b);
  const [lock, setLock] = useState(dependent);
  const [k, setK] = useState(init.k);
  const [tryX, setTryX] = useState(false);
  const [x, setX] = useState<V2>([0.5, 0.5]);
  const a2 = lock ? scale(a1, k) : a2free;

  const g11 = dot(a1, a1), g12 = dot(a1, a2), g22 = dot(a2, a2);
  const r1 = dot(a1, b), r2 = dot(a2, b);
  const det = g11 * g22 - g12 * g12;
  const singular = Math.abs(det) < 1e-6 * Math.max(1, g11 * g22);
  let xhat: V2 | null = null;
  let bhat: V3;
  if (!singular) {
    xhat = [(g22 * r1 - g12 * r2) / det, (g11 * r2 - g12 * r1) / det];
    bhat = add(scale(a1, xhat[0]), scale(a2, xhat[1]));
  } else {
    const base = norm(a1) > 1e-9 ? a1 : a2;
    bhat = proj(b, base);
  }
  const e = sub(b, bhat);
  const ax = add(scale(a1, x[0]), scale(a2, x[1]));
  const errTry = norm(sub(b, ax));
  return (
    <VizFrame
      title={dependent ? "Dependent columns: many x̂, one b̂" : "Least squares = projecting b onto Col A"}
      hint="Drag b (white) and the column tips a₁, a₂. Drag empty space to rotate."
      onReset={() => { setA1(init.a1); setA2(init.a2); setB(init.b); setK(init.k); setLock(dependent); }}
      figure={
        <Scene3D extent={3.2}>
          {!singular ? <Plane3 u={a1} v={a2} size={3.5} color="ls" /> : <Line3 d={norm(a1) > 1e-9 ? a1 : a2} color="ls" />}
          <Arrow3 to={a1} color="accent" label="a₁" />
          <Arrow3 to={a2} color="eig" label="a₂" />
          {tryX && !singular && (
            <>
              <Dot3 at={ax} color="warn" r={5} label="Ax" />
              <Seg3 a={ax} b={b} color="warn" />
            </>
          )}
          <Arrow3 to={bhat} color="good" label="b̂ = Ax̂" width={3} />
          <Arrow3 from={bhat} to={b} color="bad" label="e" />
          <Arrow3 to={b} color="text" width={2} />
          <Handle3 at={a1} onChange={setA1} />
          {!lock && <Handle3 at={a2} onChange={setA2} color="eig" />}
          <Handle3 at={b} onChange={setB} color="text" label="b" />
        </Scene3D>
      }
      controls={
        <>
          <VecInput label="$\mathbf{b}$" value={b} onChange={(v) => setB(v as V3)} />
          <Toggle label="Lock $\mathbf{a}_2 = k\,\mathbf{a}_1$ (dependent columns)" value={lock} onChange={setLock} />
          {lock && <Slider label="$k$" value={k} min={-3} max={3} step={0.5} onChange={setK} />}
          {!singular && <Toggle label="Try my own $\mathbf{x}$ (orange)" value={tryX} onChange={setTryX} />}
          {tryX && !singular && (
            <>
              <Slider label="$x_1$" value={x[0]} min={-3} max={3} step={0.05} onChange={(v) => setX([v, x[1]])} />
              <Slider label="$x_2$" value={x[1]} min={-3} max={3} step={0.05} onChange={(v) => setX([x[0], v])} />
            </>
          )}
        </>
      }
      readout={
        <>
          <Read tex={`$A^TA = \\begin{bmatrix} ${fmt(g11)} & ${fmt(g12)} \\\\ ${fmt(g12)} & ${fmt(g22)} \\end{bmatrix},\\ A^T\\mathbf{b} = ${fmtV([r1, r2])}$`} />
          {xhat ? (
            <Read tone="good" tex={`unique $\\hat{\\mathbf{x}} = ${fmtV(xhat)}$ (columns independent, $\\det A^TA = ${fmt(det)}$)`} />
          ) : (
            <Read tone="warn" tex={`$\\det A^TA = 0$: columns dependent, Col $A$ is a line → **infinitely many** $\\hat{\\mathbf{x}}$ (normal equations still consistent)`} />
          )}
          <Read tex={`$\\hat{\\mathbf{b}} = ${fmtV(bhat)}$ — always unique`} tone="good" />
          <Read tex={`$\\mathbf{e} = \\mathbf{b}-\\hat{\\mathbf{b}}$: $\\ \\mathbf{a}_1\\cdot\\mathbf{e} = ${fmt(dot(a1, e))}$, $\\mathbf{a}_2\\cdot\\mathbf{e} = ${fmt(dot(a2, e))}$ (that is $A^T\\mathbf{e} = \\mathbf{0}$)`} tone="bad" />
          <Read tex={`least-squares error $\\|\\mathbf{e}\\| = ${fmt(norm(e))}$${tryX && !singular ? `, your $\\|\\mathbf{b}-A\\mathbf{x}\\| = ${fmt(errTry)}$` : ""}`} />
        </>
      }
      tasks={
        dependent
          ? [
              "Rotate: with $\\mathbf{a}_2 = k\\mathbf{a}_1$, Col $A$ is just a line. Where does $\\hat{\\mathbf{b}}$ land?",
              "Change $k$. Does $\\hat{\\mathbf{b}}$ move? Does the set of $\\hat{\\mathbf{x}}$ change? (CA2: '$\\hat{\\mathbf{x}}$ is always unique' — false.)",
              "Untick the lock and drag $\\mathbf{a}_2$ off the line. Watch $\\det A^TA$ become nonzero and $\\hat{\\mathbf{x}}$ become unique.",
            ]
          : [
              "Predict, then check: drag $\\mathbf{b}$ into the plane. What are $\\mathbf{e}$ and the error? (Consistent system!)",
              "Rotate until the plane is edge-on: $\\mathbf{e}$ is perpendicular to it — that is exactly $A^T(\\mathbf{b}-A\\hat{\\mathbf{x}}) = \\mathbf{0}$, the normal equations.",
              "Tick 'Try my own x' and move the sliders. Can you ever beat $\\|\\mathbf{e}\\|$? (Best Approximation Theorem.)",
              "Drag $\\mathbf{a}_2$ toward $\\mathbf{a}_1$. What happens to $\\det A^TA$ and $\\hat{\\mathbf{x}}$ as they become parallel?",
            ]
      }
    />
  );
}

function fitLine(pts: V2[]): [number, number] | null {
  const n = pts.length;
  const sx = pts.reduce((s, p) => s + p[0], 0), sy = pts.reduce((s, p) => s + p[1], 0);
  const sxx = pts.reduce((s, p) => s + p[0] * p[0], 0), sxy = pts.reduce((s, p) => s + p[0] * p[1], 0);
  const d = n * sxx - sx * sx;
  if (Math.abs(d) < 1e-9) return null;
  const b1 = (n * sxy - sx * sy) / d;
  return [(sy - b1 * sx) / n, b1];
}

function RegressionFit() {
  const init: V2[] = [[-3, -1.5], [-1.5, -1], [0, 0.5], [1, 0.5], [2.5, 2], [3.5, 2]];
  const [pts, setPts] = useState(init);
  const [mine, setMine] = useState(false);
  const [m, setM] = useState<V2>([0, 0.5]);
  const best = fitLine(pts);
  const sse = (b: V2) => pts.reduce((s, p) => s + (p[1] - (b[0] + b[1] * p[0])) ** 2, 0);
  const line = mine ? m : best;
  return (
    <VizFrame
      title="Least-squares line through data"
      hint="Drag the data points. Red segments are the residuals the fit makes as small as possible (sum of squares)."
      onReset={() => setPts(init)}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          {best && <Line2 p={[0, best[0]]} d={[1, best[1]]} color="good" dashed={false} />}
          {mine && <Line2 p={[0, m[0]]} d={[1, m[1]]} color="warn" dashed={false} />}
          {line && pts.map((p, i) => <Seg2 key={i} a={p} b={[p[0], line[0] + line[1] * p[0]]} color="bad" width={2} />)}
          {pts.map((p, i) => (
            <Handle2 key={i} at={p} step={0.25} color="ls" onChange={(q) => setPts((o) => o.map((r, j) => (j === i ? q : r)))} />
          ))}
          {best && <Dot2 at={[pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length]} color="good" r={3} label="mean" />}
        </Plane2D>
      }
      controls={
        <>
          <Toggle label="Try my own line (orange)" value={mine} onChange={setMine} />
          {mine && (
            <>
              <Slider label="$\beta_0$" value={m[0]} min={-3} max={3} step={0.05} onChange={(v) => setM([v, m[1]])} />
              <Slider label="$\beta_1$" value={m[1]} min={-2} max={2} step={0.02} onChange={(v) => setM([m[0], v])} />
            </>
          )}
        </>
      }
      readout={
        best ? (
          <>
            <Read tex={`$X = \\begin{bmatrix} 1 & x_i \\end{bmatrix}$, solve $X^TX\\boldsymbol{\\beta} = X^T\\mathbf{y}$`} />
            <Read tone="good" tex={`best: $y = ${fmt(best[0])} + ${fmt(best[1])}x$, $\\ \\text{SSE} = ${fmt(sse(best))}$`} />
            {mine && <Read tone="warn" tex={`yours: $y = ${fmt(m[0])} + ${fmt(m[1])}x$, $\\ \\text{SSE} = ${fmt(sse(m))}$`} />}
            <Read tex="The LS line always passes through the mean point $(\bar x, \bar y)$." />
          </>
        ) : (
          <Read tone="warn" tex="All $x_i$ equal: the columns of $X$ are dependent, so the line is not unique." />
        )
      }
      tasks={[
        "Drag one point far away (an outlier). How much does the green line swing?",
        "Tick 'Try my own line' and try to beat the green SSE. You can't — the normal equations give the minimum.",
        "Predict: stack all points on a vertical line. What goes wrong with $X^TX$?",
      ]}
    />
  );
}

