"use client";

import { useState, type ReactNode } from "react";
import { Choice, Read, Slider, Toggle, VizFrame } from "../Frame";
import { Arrow2, Dot2, Handle2, Line2, Plane2D, Poly2, Seg2, type VizColor } from "../Plane2D";
import { add, fmt, fmtV, norm, scale, type V2 } from "../vec";

// Interactive figures for the linear-transformations lesson, chosen by id.
export default function TransformationsVisual({ id }: { id: string }) {
  switch (id) {
    case "matrix-grid":
      return <MatrixGrid />;
    case "geometric-gallery":
      return <GeometricGallery />;
    case "composition":
      return <Composition />;
    case "kernel-range":
      return <KernelRange />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------
// 2×2 helpers. Matrices are row-major [a, b, c, d] = [[a, b], [c, d]].

type M2 = [number, number, number, number];

const mv = (A: M2, x: V2): V2 => [A[0] * x[0] + A[1] * x[1], A[2] * x[0] + A[3] * x[1]];
const mm = (A: M2, B: M2): M2 => [
  A[0] * B[0] + A[1] * B[2],
  A[0] * B[1] + A[1] * B[3],
  A[2] * B[0] + A[3] * B[2],
  A[2] * B[1] + A[3] * B[3],
];
const det2 = (A: M2) => A[0] * A[3] - A[1] * A[2];
const fromCols = (c1: V2, c2: V2): M2 => [c1[0], c2[0], c1[1], c2[1]];
const same = (A: M2, B: M2) => A.every((x, i) => Math.abs(x - B[i]) < 1e-9);
const texM = (A: M2, dp = 2) => `\\begin{bmatrix} ${fmt(A[0], dp)} & ${fmt(A[1], dp)} \\\\ ${fmt(A[2], dp)} & ${fmt(A[3], dp)} \\end{bmatrix}`;

/** An asymmetric "F" so that reflections are visible. */
const F_SHAPE: V2[] = [[0, 0], [0.4, 0], [0.4, 0.7], [0.9, 0.7], [0.9, 1.05], [0.4, 1.05], [0.4, 1.45], [1.1, 1.45], [1.1, 1.8], [0, 1.8]];
const SQUARE: V2[] = [[0, 0], [1, 0], [1, 1], [0, 1]];

/** Images of the integer grid lines under A (grid is drawn as lines x = i and y = i for |i| ≤ N). */
function GridImage({ A, N = 6, color = "muted" }: { A: M2; N?: number; color?: VizColor }) {
  const lines: ReactNode[] = [];
  for (let i = -N; i <= N; i++) {
    const main = i === 0;
    lines.push(<Seg2 key={`v${i}`} a={mv(A, [i, -N])} b={mv(A, [i, N])} color={main ? "eig" : color} width={main ? 1.6 : 0.7} />);
    lines.push(<Seg2 key={`h${i}`} a={mv(A, [-N, i])} b={mv(A, [N, i])} color={main ? "orth" : color} width={main ? 1.6 : 0.7} />);
  }
  return <>{lines}</>;
}

// ---------------------------------------------------------------------------------------------
// 1. Drag the columns T(e1), T(e2): the whole grid follows.

const GRID_PRESETS: { v: string; label: string; c1: V2; c2: V2 }[] = [
  { v: "id", label: "$I$", c1: [1, 0], c2: [0, 1] },
  { v: "rot", label: "rotate $90^\\circ$", c1: [0, 1], c2: [-1, 0] },
  { v: "refl", label: "reflect $y=x$", c1: [0, 1], c2: [1, 0] },
  { v: "ex", label: "$\\begin{bmatrix}2&1\\\\-1&1\\end{bmatrix}$", c1: [2, -1], c2: [1, 1] },
  { v: "flat", label: "collapse", c1: [1, 0.5], c2: [2, 1] },
];

function MatrixGrid() {
  const [c1, setC1] = useState<V2>([2, -1]);
  const [c2, setC2] = useState<V2>([1, 1]);
  const [x, setX] = useState<V2>([1, 2]);
  const [showGrid, setShowGrid] = useState(true);
  const A = fromCols(c1, c2);
  const Ax = mv(A, x);
  const d = det2(A);
  const zero = norm(c1) < 1e-9 && norm(c2) < 1e-9;
  const flat = Math.abs(d) < 1e-9;
  const p1 = scale(c1, x[0]);
  const preset = GRID_PRESETS.find((p) => same(fromCols(p.c1, p.c2), A))?.v ?? "";
  return (
    <VizFrame
      title="The columns of A are T(e₁) and T(e₂)"
      hint="Drag the tips of T(e₁) and T(e₂): the whole grid follows. Drag x to see Ax = x₁T(e₁) + x₂T(e₂)."
      onReset={() => {
        setC1([2, -1]);
        setC2([1, 1]);
        setX([1, 2]);
      }}
      figure={
        <Plane2D x={[-6, 6]} y={[-5, 5]}>
          {showGrid && <GridImage A={A} />}
          <Poly2 pts={SQUARE} color="muted" dashed closed />
          <Poly2 pts={SQUARE.map((p) => mv(A, p))} color="good" fill />
          <Poly2 pts={F_SHAPE.map((p) => mv(A, p))} color="warn" fill width={1.5} />
          <Seg2 a={[0, 0]} b={p1} color="eig" dashed width={1.4} />
          <Seg2 a={p1} b={Ax} color="orth" dashed width={1.4} />
          <Arrow2 to={Ax} color="accent" width={3} label="Ax" />
          <Arrow2 to={c1} color="eig" label="T(e₁)" />
          <Arrow2 to={c2} color="orth" label="T(e₂)" />
          <Dot2 at={x} color="text" r={3} />
          <Handle2 at={c1} onChange={setC1} color="eig" />
          <Handle2 at={c2} onChange={setC2} color="orth" />
          <Handle2 at={x} onChange={setX} color="text" label="x" />
        </Plane2D>
      }
      controls={
        <>
          <Choice
            value={preset}
            options={GRID_PRESETS.map(({ v, label }) => ({ v, label }))}
            onChange={(v) => {
              const p = GRID_PRESETS.find((q) => q.v === v)!;
              setC1(p.c1);
              setC2(p.c2);
            }}
          />
          <Toggle label="Show the image of the grid" value={showGrid} onChange={setShowGrid} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = [\\,T(\\mathbf{e}_1)\\ \\ T(\\mathbf{e}_2)\\,] = ${texM(A)}$`} />
          <Read tex={`$A\\mathbf{x} = ${fmt(x[0])}${fmtV(c1)} + (${fmt(x[1])})${fmtV(c2)} = ${fmtV(Ax)}$`} />
          {zero ? (
            <Read tone="bad" tex="Zero map: every vector goes to $\mathbf{0}$ (kernel $= \mathbb{R}^2$)." />
          ) : flat ? (
            <Read tone="bad" tex="Columns are parallel: the plane collapses onto a line. $|A| = 0$, so $A$ is **not invertible**." />
          ) : (
            <Read tone="good" tex="Columns independent: the grid still fills the plane. $|A| \ne 0$, so $A$ is **invertible**." />
          )}
          <Read tex={`area of the green square (image of the unit square) $= abs(|A|) = ${fmt(Math.abs(d))}$ (Theorem 3.2)`} />
          <Read tex="orange = image of the letter F" />
        </>
      }
      tasks={[
        "Predict: where will the point $\\mathbf{x} = (1,0)$ land? Drag $\\mathbf{x}$ there and check that $A\\mathbf{x}$ sits on the tip of $T(\\mathbf{e}_1)$.",
        "Pick **rotate $90^\\circ$**. Read off $T(\\mathbf{e}_1)$ and $T(\\mathbf{e}_2)$ and compare them with the columns of $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$.",
        "Drag $T(\\mathbf{e}_2)$ onto the line through $T(\\mathbf{e}_1)$. What happens to the grid and to the area of the green square?",
        "Pick the matrix $\\begin{bmatrix}2&1\\\\-1&1\\end{bmatrix}$. Predict the area of the green square from $|A|$, then check the readout.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 2. Gallery of the geometric maps used in Tutorial 1 Q10 and the past papers.

type Kind = "rot" | "refl" | "neg" | "proj";
const REFLS: { v: string; label: string; M: M2; line: V2 }[] = [
  { v: "x", label: "the horizontal $x$-axis", M: [1, 0, 0, -1], line: [1, 0] },
  { v: "yx", label: "the line $y = x$", M: [0, 1, 1, 0], line: [1, 1] },
];

function GeometricGallery() {
  const [kind, setKind] = useState<Kind>("rot");
  const [deg, setDeg] = useState(60);
  const [refl, setRefl] = useState("yx");
  const th = (deg * Math.PI) / 180;
  const R = REFLS.find((r) => r.v === refl)!;
  let A: M2;
  let name: string;
  let formula: string;
  let line: V2 | undefined;
  switch (kind) {
    case "rot":
      A = [Math.cos(th), -Math.sin(th), Math.sin(th), Math.cos(th)];
      name = `rotation by $${Math.abs(deg)}^\\circ$ ${deg >= 0 ? "counter-clockwise" : "clockwise"}`;
      formula = "$\\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$ (clockwise: $\\theta < 0$)";
      break;
    case "refl":
      A = R.M;
      line = R.line;
      name = `reflection through ${R.label}`;
      formula = "columns = images of $\\mathbf{e}_1, \\mathbf{e}_2$";
      break;
    case "neg":
      A = [-1, 0, 0, -1];
      name = "$N(\\mathbf{v}) = -\\mathbf{v}$";
      formula = "matrix $-I$, the same as rotation by $180^\\circ$";
      break;
    default:
      A = [1, 0, 0, 0];
      line = [1, 0];
      name = "projection onto the $x$-axis";
      formula = "kernel = the $y$-axis, range = the $x$-axis";
  }
  const d = det2(A);
  const e1: V2 = [A[0], A[2]];
  const e2: V2 = [A[1], A[3]];
  return (
    <VizFrame
      title="Standard matrices of geometric maps"
      hint="Pick a map. The grey F is the input, the orange F its image; the arrows are T(e₁) and T(e₂), the columns."
      onReset={() => {
        setKind("rot");
        setDeg(60);
      }}
      figure={
        <Plane2D x={[-3.5, 3.5]} y={[-3, 3]}>
          {line && <Line2 d={line} color="accent" />}
          <Poly2 pts={SQUARE} color="muted" dashed closed />
          <Poly2 pts={F_SHAPE} color="muted" fill width={1.2} />
          <Poly2 pts={SQUARE.map((p) => mv(A, p))} color="good" closed width={1.5} />
          <Poly2 pts={F_SHAPE.map((p) => mv(A, p))} color="warn" fill />
          <Arrow2 to={e1} color="eig" label="T(e₁)" />
          <Arrow2 to={e2} color="orth" label="T(e₂)" />
        </Plane2D>
      }
      controls={
        <>
          <Choice
            value={kind}
            onChange={setKind}
            options={[
              { v: "rot", label: "rotation" },
              { v: "refl", label: "reflection" },
              { v: "neg", label: "$N(\\mathbf{v}) = -\\mathbf{v}$" },
              { v: "proj", label: "projection onto $x$-axis" },
            ]}
          />
          {kind === "rot" && <Slider label="angle $\theta$ (degrees, negative = clockwise)" value={deg} min={-180} max={180} step={15} onChange={setDeg} />}
          {kind === "refl" && <Choice value={refl} onChange={setRefl} options={REFLS.map(({ v, label }) => ({ v, label }))} />}
        </>
      }
      readout={
        <>
          <Read tex={`**${name}**`} />
          <Read tex={`$A = ${texM(A)}$`} />
          <Read tex={formula} />
          <Read
            tone={Math.abs(d) < 1e-9 ? "bad" : "good"}
            tex={Math.abs(d) < 1e-9 ? "$|A| = 0$: not invertible (the whole $y$-axis is sent to $\\mathbf{0}$)" : "$|A| \\ne 0$: invertible"}
          />
        </>
      }
      tasks={[
        "Predict the matrix of rotation by $-90^\\circ$ (clockwise), then set the slider and check. How is it related to the $+90^\\circ$ matrix?",
        "Compare reflection through the $x$-axis and through $y = x$. Where does $\\mathbf{e}_1$ go in each case?",
        "Choose projection onto the $x$-axis. Which points end up at the origin? (That set is the kernel.)",
        "Set the rotation to $180^\\circ$ and compare its matrix with $N(\\mathbf{v}) = -\\mathbf{v}$.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Composition: first T, then S has matrix BA.

const MAPS: { v: string; label: string; M: M2 }[] = [
  { v: "r90", label: "rotate $90^\\circ$", M: [0, -1, 1, 0] },
  { v: "rm90", label: "rotate $-90^\\circ$", M: [0, 1, -1, 0] },
  { v: "r180", label: "$N(\\mathbf{v}) = -\\mathbf{v}$", M: [-1, 0, 0, -1] },
  { v: "fx", label: "reflect $x$-axis", M: [1, 0, 0, -1] },
  { v: "fyx", label: "reflect $y=x$", M: [0, 1, 1, 0] },
  { v: "px", label: "project $x$-axis", M: [1, 0, 0, 0] },
];

function Composition() {
  const [t, setT] = useState("fx");
  const [s, setS] = useState("fyx");
  const [x, setX] = useState<V2>([2, 1]);
  const [other, setOther] = useState(true);
  const A = MAPS.find((m) => m.v === t)!.M;
  const B = MAPS.find((m) => m.v === s)!.M;
  const BA = mm(B, A);
  const AB = mm(A, B);
  const Tx = mv(A, x);
  const STx = mv(B, Tx);
  const TSx = mv(AB, x);
  const commute = same(AB, BA);
  return (
    <VizFrame
      title="First T, then S: the matrix is BA"
      hint="Choose T (applied first) and S (applied second). Drag x. Green F = S(T(F)); dashed red F = the wrong order T(S(F))."
      onReset={() => {
        setT("fx");
        setS("fyx");
        setX([2, 1]);
      }}
      figure={
        <Plane2D x={[-4, 4]} y={[-3.5, 3.5]}>
          <Poly2 pts={F_SHAPE} color="muted" fill width={1.2} />
          {other && !commute && <Poly2 pts={F_SHAPE.map((p) => mv(AB, p))} color="bad" dashed closed width={1.5} />}
          <Poly2 pts={F_SHAPE.map((p) => mv(BA, p))} color="good" fill />
          <Arrow2 to={x} color="text" width={2} />
          <Arrow2 from={x} to={Tx} color="eig" dashed width={1.6} />
          <Arrow2 to={Tx} color="eig" label="T(x)" />
          <Arrow2 to={STx} color="good" width={3} label="S(T(x))" />
          {other && !commute && <Arrow2 to={TSx} color="bad" dashed label="T(S(x))" />}
          <Handle2 at={x} onChange={setX} color="text" label="x" />
        </Plane2D>
      }
      controls={
        <>
          <div className="small muted">T (first)</div>
          <Choice value={t} onChange={setT} options={MAPS.map(({ v, label }) => ({ v, label }))} />
          <div className="small muted">S (second)</div>
          <Choice value={s} onChange={setS} options={MAPS.map(({ v, label }) => ({ v, label }))} />
          <Toggle label="Show the wrong order $T\circ S$ (red)" value={other} onChange={setOther} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = ${texM(A, 0)}$ (T), $\\ B = ${texM(B, 0)}$ (S)`} />
          <Read tone="good" tex={`$S\\circ T$: $BA = ${texM(BA, 0)}$, $\\ S(T(\\mathbf{x})) = ${fmtV(STx)}$`} />
          <Read tone={commute ? "good" : "bad"} tex={`$T\\circ S$: $AB = ${texM(AB, 0)}$${commute ? " — the same: these two commute" : " — different"}`} />
        </>
      }
      tasks={[
        "Start with reflect $x$-axis then reflect $y = x$ (Tutorial 1 Q10(b)). Which rotation is $BA$? Which rotation is $AB$?",
        "Find two maps from the list that commute. Can you explain why from their matrices?",
        "Past paper: $L$ = rotate $90^\\circ$, $M$ = reflect $y = x$, $N(\\mathbf{v}) = -\\mathbf{v}$. Which of the pairs $L, M$ and $N, M$ commute?",
        "Predict: rotate $90^\\circ$ then rotate $-90^\\circ$. What is $BA$?",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// 4. Kernel and range of a singular 2×2 map.

const SINGULAR: { v: string; label: string; M: M2; ker: V2; ran: V2 }[] = [
  { v: "px", label: "project $x$-axis", M: [1, 0, 0, 0], ker: [0, 1], ran: [1, 0] },
  { v: "a", label: "$\\begin{bmatrix}1&2\\\\2&4\\end{bmatrix}$", M: [1, 2, 2, 4], ker: [-2, 1], ran: [1, 2] },
  { v: "b", label: "$\\begin{bmatrix}1&-1\\\\-2&2\\end{bmatrix}$", M: [1, -1, -2, 2], ker: [1, 1], ran: [1, -2] },
  { v: "inv", label: "invertible $\\begin{bmatrix}2&1\\\\1&1\\end{bmatrix}$", M: [2, 1, 1, 1], ker: [0, 0], ran: [0, 0] },
];

function KernelRange() {
  const [pv, setPv] = useState("a");
  const [x, setX] = useState<V2>([1, 1]);
  const [t, setT] = useState(1);
  const P = SINGULAR.find((p) => p.v === pv)!;
  const A = P.M;
  const singular = Math.abs(det2(A)) < 1e-9;
  const Ax = mv(A, x);
  const x2 = add(x, scale(P.ker, t));
  const Ax2 = mv(A, x2);
  return (
    <VizFrame
      title="Kernel (red) collapses, range (green) is what is left"
      hint="Pick a matrix. Drag x; slide t to move along x + t·(kernel vector). The image does not move."
      onReset={() => {
        setPv("a");
        setX([1, 1]);
        setT(1);
      }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4.5, 4.5]}>
          {singular && <Line2 d={P.ker} color="bad" dashed={false} />}
          {singular && <Line2 d={P.ran} color="good" dashed={false} />}
          {singular && <Line2 p={x} d={P.ker} color="bad" />}
          {singular && <Seg2 a={x} b={x2} color="bad" width={2} />}
          <Arrow2 to={x} color="text" width={2} label="x" />
          {singular && <Arrow2 to={x2} color="warn" width={2} label="x + t·k" />}
          <Arrow2 to={Ax} color="accent" width={3} label="Ax" />
          <Handle2 at={x} onChange={setX} color="text" />
        </Plane2D>
      }
      controls={
        <>
          <Choice value={pv} onChange={setPv} options={SINGULAR.map(({ v, label }) => ({ v, label }))} />
          {singular && <Slider label="$t$" value={t} min={-2} max={2} step={0.25} onChange={setT} />}
        </>
      }
      readout={
        <>
          <Read tex={`$A = ${texM(A)}$`} />
          {singular ? (
            <>
              <Read tone="bad" tex={`kernel $= N(A) = \\operatorname{Span}\\{${fmtV(P.ker)}\\}$ (nullity 1)`} />
              <Read tone="good" tex={`range $= C(A) = \\operatorname{Span}\\{${fmtV(P.ran)}\\}$ (rank 1)`} />
              <Read tex={`$A\\mathbf{x} = ${fmtV(Ax)}$ and $A(\\mathbf{x}+t\\mathbf{k}) = ${fmtV(Ax2)}$ — same image`} />
              <Read tex="Rank Theorem: rank of $A$ + $\dim N(A) = 1 + 1 = 2$ columns. $N(A) \ne \{\mathbf{0}\}$ and $C(A) \ne \mathbb{R}^2$." />
            </>
          ) : (
            <>
              <Read tone="good" tex="kernel $= N(A) = \{\mathbf{0}\}$ and range $= C(A) = \mathbb{R}^2$: rank 2, $\dim N(A) = 0$." />
              <Read tex={`$A\\mathbf{x} = ${fmtV(Ax)}$, and $A^{-1}$ transforms $A\\mathbf{x}$ back to $\\mathbf{x}$.`} />
            </>
          )}
        </>
      }
      tasks={[
        "Predict, then check: drag $\\mathbf{x}$ onto the red line. Where does $A\\mathbf{x}$ go?",
        "Drag $\\mathbf{x}$ anywhere. Does $A\\mathbf{x}$ ever leave the green line? What does that say about which $\\mathbf{b}$ make $A\\mathbf{x} = \\mathbf{b}$ consistent?",
        "Slide $t$. Why does the image stay fixed? (Hint: by linearity $A(\\mathbf{x}+t\\mathbf{k}) = A\\mathbf{x}+tA\\mathbf{k}$, and $A\\mathbf{k} = \\mathbf{0}$.)",
        "For **project $x$-axis**, read off the kernel. Is it the $x$-axis? (A past-paper true/false.)",
      ]}
    />
  );
}
