"use client";

import { useState, type CSSProperties } from "react";
import { Choice, Read, Slider, VizFrame } from "../Frame";
import { Arrow2, Dot2, Handle2, Plane2D, Poly2, Seg2 } from "../Plane2D";
import { add, fmt, scale, type V2 } from "../vec";

// Interactive figures for the matrices lesson, chosen by id.
export default function MatricesVisual({ id }: { id: string }) {
  switch (id) {
    case "ax-columns":
      return <AxColumns />;
    case "product-explorer":
      return <ProductExplorer />;
    case "order-matters":
      return <OrderMatters />;
    default:
      return null;
  }
}

const bm = (M: number[][]) => `\\begin{bmatrix} ${M.map((r) => r.map((x) => fmt(x)).join(" & ")).join(" \\\\ ")} \\end{bmatrix}`;
const par = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));

// ---------------------------------------------------------------- Ax as a combination of columns

function AxColumns() {
  const init = { a1: [2, 1] as V2, a2: [-1, 2] as V2, x: [1.5, 1] as V2 };
  const [a1, setA1] = useState(init.a1);
  const [a2, setA2] = useState(init.a2);
  const [x, setX] = useState(init.x);
  const p1 = scale(a1, x[0]);
  const p2 = scale(a2, x[1]);
  const Ax = add(p1, p2);
  const A = [
    [a1[0], a2[0]],
    [a1[1], a2[1]],
  ];
  return (
    <VizFrame
      title="Ax is a combination of the columns of A"
      hint="Drag the column vectors a₁, a₂. Use the sliders for the weights x₁, x₂."
      onReset={() => {
        setA1(init.a1);
        setA2(init.a2);
        setX(init.x);
      }}
      figure={
        <Plane2D x={[-6, 6]} y={[-5, 5]}>
          <Arrow2 to={p1} color="eig" width={3} label={`${fmt(x[0])}a₁`} />
          <Arrow2 from={p1} to={Ax} color="orth" width={3} label={`${fmt(x[1])}a₂`} />
          <Seg2 a={p2} b={Ax} color="muted" dashed />
          <Seg2 a={[0, 0]} b={p2} color="muted" dashed />
          <Arrow2 to={Ax} color="good" width={4} />
          <Dot2 at={Ax} color="good" label="Ax" />
          <Arrow2 to={a1} color="eig" width={1.5} dashed />
          <Arrow2 to={a2} color="orth" width={1.5} dashed />
          <Handle2 at={a1} onChange={setA1} color="eig" label="a₁" />
          <Handle2 at={a2} onChange={setA2} color="orth" label="a₂" />
        </Plane2D>
      }
      controls={
        <>
          <Slider label="$x_1$" value={x[0]} min={-3} max={3} step={0.5} onChange={(v) => setX([v, x[1]])} />
          <Slider label="$x_2$" value={x[1]} min={-3} max={3} step={0.5} onChange={(v) => setX([x[0], v])} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = \\begin{bmatrix}\\mathbf{a}_1 & \\mathbf{a}_2\\end{bmatrix} = ${bm(A)},\\ \\mathbf{x} = ${bm([[x[0]], [x[1]]])}$`} />
          <Read label="columns" tex={`$A\\mathbf{x} = ${par(x[0])}${bm([[a1[0]], [a1[1]]])} + ${par(x[1])}${bm([[a2[0]], [a2[1]]])} = ${bm([[Ax[0]], [Ax[1]]])}$`} />
          <Read label="rows" tex={`$\\text{row}_1\\cdot\\mathbf{x} = ${par(a1[0])}${par(x[0])} + ${par(a2[0])}${par(x[1])} = ${fmt(Ax[0])}$, $\\ \\text{row}_2\\cdot\\mathbf{x} = ${fmt(Ax[1])}$`} />
          <Read tone="good" tex="Both views give the same vector: entries by rows, geometry by columns." />
        </>
      }
      tasks={[
        "Set $x_1 = 1$, $x_2 = 0$. Which vector is $A\\mathbf{x}$? (It is the first column of $A$.)",
        "Predict $A\\mathbf{x}$ for $x_1 = 2$, $x_2 = -1$ with the column picture, then check it against the row-by-row readout.",
        "Drag $\\mathbf{a}_1$ and $\\mathbf{a}_2$ anywhere: do the two readouts (columns and rows) ever disagree?",
        "Make $x_2$ negative. Does the orange piece now point against $\\mathbf{a}_2$?",
      ]}
    />
  );
}

// ---------------------------------------------------------------- AB: entry, column and row views

const A0 = [
  [2, -1, 3],
  [0, 4, 1],
];
const B0 = [
  [1, 3, 0],
  [-2, 1, 4],
  [3, 0, 2],
];

function mul(A: number[][], B: number[][]): number[][] {
  return A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
}

type Mode = "entry" | "column" | "row";

const cellBase: CSSProperties = {
  minWidth: 34,
  height: 30,
  padding: "0 6px",
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
  border: "1px solid var(--border)",
  borderRadius: 6,
  background: "var(--surface)",
  color: "var(--text)",
  font: "inherit",
};

function Grid({ name, M, tone, onPick, picked }: { name: string; M: number[][]; tone: (i: number, j: number) => "" | "use" | "out"; onPick?: (i: number, j: number) => void; picked?: [number, number] }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div className="small muted">
        {name} ({M.length}×{M[0].length})
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${M[0].length}, auto)`, gap: 4 }}>
        {M.map((r, i) =>
          r.map((x, j) => {
            const t = tone(i, j);
            const style: CSSProperties = {
              ...cellBase,
              background: t === "use" ? "var(--accent-soft)" : t === "out" ? "var(--good-soft)" : cellBase.background,
              borderColor: t === "use" ? "var(--accent)" : t === "out" ? "var(--good)" : "var(--border)",
              fontWeight: t ? 700 : 400,
              outline: picked && picked[0] === i && picked[1] === j ? "2px solid var(--good)" : undefined,
              cursor: onPick ? "pointer" : "default",
            };
            return onPick ? (
              <button key={`${i}-${j}`} style={style} onClick={() => onPick(i, j)} aria-label={`entry ${i + 1},${j + 1}`}>
                {x}
              </button>
            ) : (
              <div key={`${i}-${j}`} style={{ ...style, display: "grid", placeItems: "center" }}>
                {x}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

function ProductExplorer() {
  const [A, setA] = useState(A0);
  const [B, setB] = useState(B0);
  const [mode, setMode] = useState<Mode>("entry");
  const [pick, setPick] = useState<[number, number]>([0, 1]);
  const AB = mul(A, B);
  const [i, j] = pick;
  const n = B.length;

  const toneA = (r: number) => (mode === "column" ? "use" : r === i ? "use" : "") as "" | "use";
  const toneB = (_r: number, c: number) => (mode === "row" ? "use" : c === j ? "use" : "") as "" | "use";
  const toneAB = (r: number, c: number) => ((mode === "entry" && r === i && c === j) || (mode === "column" && c === j) || (mode === "row" && r === i) ? "out" : "") as "" | "out";

  const shuffle = () => {
    const rnd = () => Math.floor(Math.random() * 9) - 4;
    setA(A0.map((r) => r.map(rnd)));
    setB(B0.map((r) => r.map(rnd)));
  };

  const ks = Array.from({ length: n }, (_, k) => k);
  const colB = ks.map((k) => B[k][j]);
  const colAB = AB.map((r) => r[j]);
  const lines =
    mode === "entry"
      ? [
          `$(AB)_{${i + 1}${j + 1}} = \\text{row}_${i + 1}(A)\\cdot\\text{col}_${j + 1}(B) = ${ks.map((k) => `${par(A[i][k])}${par(B[k][j])}`).join(" + ")} = ${AB[i][j]}$`,
        ]
      : mode === "column"
        ? [
            `$\\text{col}_${j + 1}(AB) = A\\,\\text{col}_${j + 1}(B) = ${ks.map((k) => `${par(colB[k])}\\mathbf{a}_${k + 1}`).join(" + ")}$`,
            `$= ${ks.map((k) => `${par(colB[k])}${bm(A.map((r) => [r[k]]))}`).join(" + ")} = ${bm(colAB.map((x) => [x]))}$`,
          ]
        : [
            `$\\text{row}_${i + 1}(AB) = \\text{row}_${i + 1}(A)\\,B = ${ks.map((k) => `${par(A[i][k])}\\,\\text{row}_${k + 1}(B)`).join(" + ")}$`,
            `$= ${ks.map((k) => `${par(A[i][k])}${bm([B[k]])}`).join(" + ")} = ${bm([AB[i]])}$`,
          ];

  return (
    <VizFrame
      title="Three ways to read AB"
      hint="Click an entry of AB. Switch between the entry, column and row views."
      onReset={() => {
        setA(A0);
        setB(B0);
        setMode("entry");
        setPick([0, 1]);
      }}
      figure={
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end", justifyContent: "center", padding: "12px 4px" }}>
          <Grid name="A" M={A} tone={toneA} />
          <span className="muted" style={{ paddingBottom: 30 }}>×</span>
          <Grid name="B" M={B} tone={toneB} />
          <span className="muted" style={{ paddingBottom: 30 }}>=</span>
          <Grid name="AB" M={AB} tone={toneAB} onPick={(r, c) => setPick([r, c])} picked={pick} />
        </div>
      }
      controls={
        <>
          <Choice
            value={mode}
            options={[
              { v: "entry", label: "entry (row · column)" },
              { v: "column", label: "column method" },
              { v: "row", label: "row method" },
            ]}
            onChange={setMode}
          />
          <button className="btn small" onClick={shuffle}>
            New numbers
          </button>
        </>
      }
      readout={
        <>
          {lines.map((t, k) => (
            <Read key={k} tex={t} />
          ))}
          <Read tex={`Sizes: $(2\\times3)(3\\times3) = 2\\times3$. $BA$ would be $(3\\times3)(2\\times3)$: **not defined**.`} tone="warn" />
        </>
      }
      tasks={[
        "Predict the $(2,3)$ entry before clicking it: which row of $A$ and which column of $B$ do you need?",
        "In the column view, check that every column of $AB$ uses **all** columns of $A$ but only **one** column of $B$.",
        "In the row view: which matrix supplies the weights, and whose rows are being combined?",
        "Press New numbers until a row of $A$ is all zeros (or set one mentally). What happens to that row of $AB$?",
      ]}
    />
  );
}

// ---------------------------------------------------------------- order matters: AB vs BA

const PRESETS: { v: string; label: string; M: [number, number, number, number] }[] = [
  { v: "rot", label: "rotate 90°", M: [0, -1, 1, 0] },
  { v: "refx", label: "reflect in x-axis", M: [1, 0, 0, -1] },
  { v: "refyx", label: "reflect in y = x", M: [0, 1, 1, 0] },
  { v: "neg", label: "N(v) = −v", M: [-1, 0, 0, -1] },
  { v: "px", label: "project onto x-axis", M: [1, 0, 0, 0] },
  { v: "py", label: "project onto y-axis", M: [0, 0, 0, 1] },
];

type M2 = [number, number, number, number];
const mm = (P: M2, Q: M2): M2 => [P[0] * Q[0] + P[1] * Q[2], P[0] * Q[1] + P[1] * Q[3], P[2] * Q[0] + P[3] * Q[2], P[2] * Q[1] + P[3] * Q[3]];
const mv = (P: M2, x: V2): V2 => [P[0] * x[0] + P[1] * x[1], P[2] * x[0] + P[3] * x[1]];
const bm2 = (P: M2) => bm([
  [P[0], P[1]],
  [P[2], P[3]],
]);

// An asymmetric "F" so that reflections and rotations are visible.
const SHAPE: V2[] = [
  [0, 0], [0, 2.5], [1.6, 2.5], [1.6, 2], [0.5, 2], [0.5, 1.5], [1.2, 1.5], [1.2, 1], [0.5, 1], [0.5, 0],
];

function OrderMatters() {
  const [a, setA] = useState("rot");
  const [b, setB] = useState("refx");
  const A = PRESETS.find((p) => p.v === a)!.M;
  const B = PRESETS.find((p) => p.v === b)!.M;
  const AB = mm(A, B);
  const BA = mm(B, A);
  const same = AB.every((x, k) => x === BA[k]);
  const zeroAB = AB.every((x) => x === 0);
  const zeroBA = BA.every((x) => x === 0);
  const opts = PRESETS.map(({ v, label }) => ({ v, label }));
  return (
    <VizFrame
      title="AB means “do B, then A”"
      hint="Pick A and B. Grey: the original F. Green: AB applied. Red (dashed): BA applied."
      onReset={() => {
        setA("rot");
        setB("refx");
      }}
      figure={
        <Plane2D x={[-4, 4]} y={[-4, 4]}>
          <Poly2 pts={SHAPE} color="muted" closed width={1.5} />
          <Poly2 pts={SHAPE.map((p) => mv(AB, p))} color="good" fill width={2.5} />
          <Poly2 pts={SHAPE.map((p) => mv(BA, p))} color="bad" closed dashed width={2} />
          <Dot2 at={mv(AB, [1.6, 2.5])} color="good" r={3} label="AB" />
          <Dot2 at={mv(BA, [1.6, 2.5])} color="bad" r={3} label="BA" />
        </Plane2D>
      }
      controls={
        <>
          <div className="small muted">A (applied second in AB)</div>
          <Choice value={a} options={opts} onChange={setA} />
          <div className="small muted">B (applied first in AB)</div>
          <Choice value={b} options={opts} onChange={setB} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = ${bm2(A)},\\ B = ${bm2(B)}$`} />
          <Read tex={`$AB = ${bm2(AB)},\\ BA = ${bm2(BA)}$`} />
          <Read tone={same ? "good" : "bad"} tex={same ? "**$AB = BA$**: these two commute." : "**$AB \\ne BA$**: the order matters."} />
          {(zeroAB || zeroBA) && (
            <Read tone="warn" tex={`${zeroAB ? "$AB = 0$" : "$BA = 0$"} although $A \\ne 0$ and $B \\ne 0$: a **zero product**${zeroAB !== zeroBA ? `, and ${zeroAB ? "$BA$" : "$AB$"} is not zero` : ""}.`} />
          )}
        </>
      }
      tasks={[
        "Predict: rotate 90° and reflect in the x-axis. Do the green and red F's coincide? Check, then explain with $AB$ and $BA$.",
        "Find two different choices that **do** commute (hint: try N(v) = −v with anything).",
        "Choose A = project onto x-axis, B = project onto y-axis. What is $AB$, although neither factor is zero?",
        "A past paper asks which of rotate 90°, reflect in y = x and N(v) = −v commute in pairs. Test all three pairs here.",
      ]}
    />
  );
}
