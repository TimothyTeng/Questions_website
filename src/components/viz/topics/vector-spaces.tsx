"use client";

import { useState, type ReactNode } from "react";
import { Choice, Read, Slider, VizFrame } from "../Frame";
import { Arrow2, Dot2, Handle2, Line2, Plane2D, Poly2 } from "../Plane2D";
import { Arrow3, Handle3, Line3, Plane3, Scene3D } from "../Scene3D";
import { add, cross, dot, fmt, fmtV, norm, scale, sub, type V2, type V3 } from "../vec";

// Interactive figures for the vector-spaces lesson, chosen by id.
export default function VectorSpacesVisual({ id }: { id: string }) {
  switch (id) {
    case "subspace-test":
      return <SubspaceTest />;
    case "column-space-3d":
      return <ColumnSpace3D />;
    case "coordinates-grid":
      return <CoordinatesGrid />;
    default:
      return null;
  }
}

const EPS = 1e-6;

// ------------------------------------------------------------------ subspace test in R^2

type SetId = "line0" | "line1" | "axes" | "half" | "disk" | "parab";

interface SetDef {
  label: string;
  tex: string;
  has: (p: V2) => boolean;
  /** Pull a point into the set (so u and v always start inside it). */
  snap: (p: V2) => V2;
  verdict: string;
}

const projLine = (p: V2, d: V2, o: V2 = [0, 0]): V2 => {
  const q = sub(p, o);
  return add(o, scale(d, dot(q, d) / dot(d, d)));
};

const SETS: Record<SetId, SetDef> = {
  line0: {
    label: "line $y = 2x$",
    tex: "\\{(x,y) : y = 2x\\}",
    has: (p) => Math.abs(p[1] - 2 * p[0]) < EPS,
    snap: (p) => projLine(p, [1, 2]),
    verdict: "Passes all three tests: a line through the origin is a subspace.",
  },
  line1: {
    label: "line $y = 2x + 1$",
    tex: "\\{(x,y) : y = 2x + 1\\}",
    has: (p) => Math.abs(p[1] - 2 * p[0] - 1) < EPS,
    snap: (p) => projLine(p, [1, 2], [0, 1]),
    verdict: "Fails: $\\mathbf{0}$ is not on the line, and sums and multiples leave it.",
  },
  axes: {
    label: "both axes",
    tex: "\\{(x,y) : x = 0 \\text{ or } y = 0\\}",
    has: (p) => Math.abs(p[0]) < EPS || Math.abs(p[1]) < EPS,
    snap: (p) => (Math.abs(p[0]) < Math.abs(p[1]) ? [0, p[1]] : [p[0], 0]),
    verdict: "Fails closure under $+$: a vector on each axis adds to one on neither.",
  },
  half: {
    label: "half-plane $x + y \\ge 0$",
    tex: "\\{(x,y) : x + y \\ge 0\\}",
    has: (p) => p[0] + p[1] > -EPS,
    snap: (p) => (p[0] + p[1] >= 0 ? p : projLine(p, [1, -1])),
    verdict: "Fails closure under scalars: $c = -1$ flips a vector out of the half-plane.",
  },
  disk: {
    label: "disk $x^2 + y^2 \\le 4$",
    tex: "\\{(x,y) : x^2 + y^2 \\le 4\\}",
    has: (p) => dot(p, p) <= 4 + EPS,
    snap: (p) => (norm(p) <= 2 ? p : scale(p, 2 / norm(p))),
    verdict: "Fails: it is bounded, so big multiples (and some sums) escape.",
  },
  parab: {
    label: "parabola $y = x^2$",
    tex: "\\{(x,y) : y = x^2\\}",
    has: (p) => Math.abs(p[1] - p[0] * p[0]) < EPS,
    snap: (p) => [p[0], p[0] * p[0]],
    verdict: "Fails: the condition is not linear, so sums and multiples leave the curve.",
  },
};

function SetShape({ id }: { id: SetId }) {
  if (id === "line0") return <Line2 d={[1, 2]} color="accent" dashed={false} />;
  if (id === "line1") return <Line2 p={[0, 1]} d={[1, 2]} color="accent" dashed={false} />;
  if (id === "axes")
    return (
      <>
        <Line2 d={[1, 0]} color="accent" dashed={false} />
        <Line2 d={[0, 1]} color="accent" dashed={false} />
      </>
    );
  if (id === "half") return <Poly2 pts={[[-12, 12], [12, -12], [12, 12]]} color="accent" fill />;
  if (id === "disk")
    return <Poly2 pts={Array.from({ length: 64 }, (_, i) => [2 * Math.cos((i * Math.PI) / 32), 2 * Math.sin((i * Math.PI) / 32)] as V2)} color="accent" fill />;
  return <Poly2 pts={Array.from({ length: 41 }, (_, i) => { const x = -2.5 + (5 * i) / 40; return [x, x * x] as V2; })} color="accent" />;
}

function SubspaceTest() {
  const [sid, setSid] = useState<SetId>("line0");
  const S = SETS[sid];
  const init = { u: S.snap([1, 2]), v: S.snap([-0.5, -1]) };
  const [u, setU] = useState<V2>([1, 2]);
  const [v, setV] = useState<V2>([-0.5, -1]);
  const [c, setC] = useState(2);
  const uu = S.snap(u), vv = S.snap(v);
  const sum = add(uu, vv);
  const cu = scale(uu, c);
  const zeroIn = S.has([0, 0]);
  const sumIn = S.has(sum);
  const cuIn = S.has(cu);
  const pick = (id: SetId) => {
    setSid(id);
    const T = SETS[id];
    const starts: Record<SetId, [V2, V2]> = {
      line0: [[1, 2], [-0.5, -1]],
      line1: [[0.5, 2], [-1, -1]],
      axes: [[2, 0], [0, 1.5]],
      half: [[2, -1], [-1, 2]],
      disk: [[1.5, 1], [1, -1.5]],
      parab: [[1, 1], [-1.5, 2.25]],
    };
    setU(T.snap(starts[id][0]));
    setV(T.snap(starts[id][1]));
  };
  const tone = (ok: boolean) => (ok ? "good" : "bad");
  return (
    <VizFrame
      title="The three-part subspace test"
      hint="Pick a set. Drag u and v: they always stay inside the set. Slide c to scale u."
      onReset={() => { setU(init.u); setV(init.v); setC(2); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          <SetShape id={sid} />
          <Arrow2 from={uu} to={sum} color="muted" dashed width={1.5} />
          <Arrow2 from={vv} to={sum} color="muted" dashed width={1.5} />
          <Arrow2 to={sum} color={sumIn ? "good" : "bad"} label="u+v" />
          <Arrow2 to={cu} color={cuIn ? "good" : "bad"} width={2} label="cu" />
          <Dot2 at={[0, 0]} color={zeroIn ? "good" : "bad"} r={5} />
          <Handle2 at={uu} onChange={(p) => setU(S.snap(p))} step={0} label="u" />
          <Handle2 at={vv} onChange={(p) => setV(S.snap(p))} color="eig" step={0} label="v" />
        </Plane2D>
      }
      controls={
        <>
          <Choice<SetId> value={sid} onChange={pick} options={(Object.keys(SETS) as SetId[]).map((k) => ({ v: k, label: SETS[k].label }))} />
          <Slider label="scalar $c$" value={c} min={-3} max={3} step={0.25} onChange={setC} />
        </>
      }
      readout={
        <>
          <Read label="set" tex={`$H = ${S.tex}$`} />
          <Read tone={tone(zeroIn)} tex={`(1) $\\mathbf{0} \\in H$? **${zeroIn ? "yes" : "no"}**`} />
          <Read tone={tone(sumIn)} tex={`(2) $\\mathbf{u}+\\mathbf{v} = ${fmtV(sum)} \\in H$? **${sumIn ? "yes" : "no"}**`} />
          <Read tone={tone(cuIn)} tex={`(3) $c\\mathbf{u} = ${fmtV(cu)} \\in H$? **${cuIn ? "yes" : "no"}**`} />
          <Read tex={S.verdict} />
        </>
      }
      tasks={[
        "Predict: for the line $y = 2x$, can you find $\\mathbf{u}, \\mathbf{v}$ that make test (2) fail? Try it.",
        "Switch to **both axes**. Put $\\mathbf{u}$ on the $x$-axis and $\\mathbf{v}$ on the $y$-axis. Which test fails?",
        "On the **half-plane**, which values of $c$ break test (3)? Why does a negative scalar matter?",
        "On the **disk**, keep $c = 1$. Can $\\mathbf{u}+\\mathbf{v}$ still escape? (One counterexample is enough to rule out a subspace.)",
      ]}
    />
  );
}

// ------------------------------------------------------------------ column space in R^3

type Mode = "free" | "rank2" | "rank1";

function ColumnSpace3D() {
  const init = { a1: [2, 0, 1] as V3, a2: [0, 2, 1] as V3, a3: [1, 1, -2] as V3, b: [1, 2, 1.5] as V3 };
  const [mode, setMode] = useState<Mode>("rank2");
  const [a1, setA1] = useState(init.a1);
  const [a2free, setA2] = useState(init.a2);
  const [a3free, setA3] = useState(init.a3);
  const [b, setB] = useState(init.b);
  const a2: V3 = mode === "rank1" ? scale(a1, -1) : a2free;
  const a3: V3 = mode === "rank2" ? add(a1, a2) : mode === "rank1" ? scale(a1, 2) : a3free;
  const n12 = cross(a1, a2);
  const detA = dot(n12, a3);
  // rank of [a1 a2 a3]
  const nonzero = [a1, a2, a3].filter((a) => norm(a) > EPS);
  const planeN = [cross(a1, a2), cross(a1, a3), cross(a2, a3)].find((x) => norm(x) > EPS);
  const r = Math.abs(detA) > EPS ? 3 : planeN ? 2 : nonzero.length ? 1 : 0;
  const lineDir = nonzero[0];
  const planePair: [V3, V3] | null = r === 2 ? (norm(cross(a1, a2)) > EPS ? [a1, a2] : norm(cross(a1, a3)) > EPS ? [a1, a3] : [a2, a3]) : null;
  const bIn = r === 3 ? true : r === 2 ? Math.abs(dot(planeN!, b)) < 1e-6 * (norm(planeN!) || 1) : r === 1 ? norm(cross(lineDir!, b)) < EPS : norm(b) < EPS;
  const snapB = () => {
    if (r === 2 && planeN) setB(sub(b, scale(planeN, dot(b, planeN) / dot(planeN, planeN))));
    else if (r === 1 && lineDir) setB(scale(lineDir, dot(b, lineDir) / dot(lineDir, lineDir)));
  };
  const nullTex = mode === "rank2" ? "\\operatorname{Span}\\{[1,\\ 1,\\ -1]^T\\}" : mode === "rank1" ? "\\operatorname{Span}\\{[1,\\ 1,\\ 0]^T,\\ [-2,\\ 0,\\ 1]^T\\}" : r === 3 ? "\\{\\mathbf{0}\\}" : "\\text{a line or plane (row reduce to find it)}";
  return (
    <VizFrame
      title="Column space and null space of a 3×3 matrix"
      hint="Drag empty space to rotate. Drag the column tips (and b). Pick a mode to force a dependence."
      onReset={() => { setA1(init.a1); setA2(init.a2); setA3(init.a3); setB(init.b); }}
      figure={
        <Scene3D extent={3}>
          {r === 2 && planePair && <Plane3 u={planePair[0]} v={planePair[1]} size={3.2} color="accent" />}
          {r === 1 && lineDir && <Line3 d={lineDir} color="accent" />}
          <Arrow3 to={a1} color="accent" label="a₁" />
          <Arrow3 to={a2} color="eig" label="a₂" />
          <Arrow3 to={a3} color="warn" label="a₃" />
          <Arrow3 to={b} color={bIn ? "good" : "bad"} label="b" />
          <Handle3 at={a1} onChange={setA1} />
          {mode === "free" && <Handle3 at={a2} onChange={setA2} color="eig" />}
          {mode === "free" && <Handle3 at={a3} onChange={setA3} color="warn" />}
          <Handle3 at={b} onChange={setB} color={bIn ? "good" : "bad"} />
        </Scene3D>
      }
      controls={
        <>
          <Choice<Mode>
            value={mode}
            onChange={setMode}
            options={[
              { v: "free", label: "free columns" },
              { v: "rank2", label: "$\\mathbf{a}_3 = \\mathbf{a}_1 + \\mathbf{a}_2$" },
              { v: "rank1", label: "$\\mathbf{a}_2 = -\\mathbf{a}_1,\\ \\mathbf{a}_3 = 2\\mathbf{a}_1$" },
            ]}
          />
          {r < 3 && (
            <button className="btn small" onClick={snapB}>
              Drop b into C(A)
            </button>
          )}
        </>
      }
      readout={
        <>
          <Read tex={`$|A| = ${fmt(detA)}$, $\\operatorname{rank}A = ${r}$`} />
          <Read tex={`$C(A)$ is ${r === 3 ? "all of $\\mathbb{R}^3$" : r === 2 ? "a plane through $\\mathbf{0}$" : r === 1 ? "a line through $\\mathbf{0}$" : "$\\{\\mathbf{0}\\}$"} (dimension ${r})`} />
          <Read tex={`$\\dim N(A) = 3 - ${r} = ${3 - r}$, $N(A) = ${nullTex}$`} />
          <Read tone={bIn ? "good" : "bad"} tex={bIn ? "$\\mathbf{b}\\in C(A)$: $A\\mathbf{x} = \\mathbf{b}$ is **consistent**" : "$\\mathbf{b}\\notin C(A)$: $A\\mathbf{x} = \\mathbf{b}$ is **inconsistent**"} />
        </>
      }
      tasks={[
        "Predict: with $\\mathbf{a}_3 = \\mathbf{a}_1 + \\mathbf{a}_2$, which $\\mathbf{x}$ gives $A\\mathbf{x} = \\mathbf{0}$? Compare with the readout.",
        "In the rank-2 mode, drag $\\mathbf{b}$ off the plane. Why must the system become inconsistent?",
        "Switch to **free columns**. Can you drag $\\mathbf{a}_3$ until $|A| = 0$? What does the picture look like at that moment?",
        "Check the Rank Theorem in each mode: $\\operatorname{rank}A + \\dim N(A) = 3$.",
      ]}
    />
  );
}

// ------------------------------------------------------------------ coordinates in a basis

function CoordinatesGrid() {
  const init = { b1: [2, 1] as V2, b2: [-1, 1.5] as V2, x: [3, -0.5] as V2 };
  const [b1, setB1] = useState(init.b1);
  const [b2, setB2] = useState(init.b2);
  const [x, setX] = useState(init.x);
  const d = b1[0] * b2[1] - b2[0] * b1[1];
  const ok = Math.abs(d) > 1e-6;
  const c1 = ok ? (x[0] * b2[1] - b2[0] * x[1]) / d : 0;
  const c2 = ok ? (b1[0] * x[1] - x[0] * b1[1]) / d : 0;
  const p1 = scale(b1, c1);
  const lines: ReactNode[] = [];
  if (ok) {
    for (let i = -8; i <= 8; i++) {
      lines.push(<Line2 key={`a${i}`} p={scale(b1, i)} d={b2} color="muted" dashed={false} />);
      lines.push(<Line2 key={`b${i}`} p={scale(b2, i)} d={b1} color="muted" dashed={false} />);
    }
  }
  return (
    <VizFrame
      title="Coordinates in a basis"
      hint="Drag b₁, b₂ to reshape the grid and x to move the vector (snaps to 0.5)."
      onReset={() => { setB1(init.b1); setB2(init.b2); setX(init.x); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]} grid={0}>
          <g opacity={0.5}>{lines}</g>
          {ok && <Arrow2 to={p1} color="accent" dashed width={2} />}
          {ok && <Arrow2 from={p1} to={x} color="eig" dashed width={2} />}
          <Arrow2 to={b1} color="accent" width={3} />
          <Arrow2 to={b2} color="eig" width={3} />
          <Arrow2 to={x} color="text" width={2} />
          <Handle2 at={b1} onChange={setB1} label="b₁" />
          <Handle2 at={b2} onChange={setB2} color="eig" label="b₂" />
          <Handle2 at={x} onChange={setX} color="text" label="x" />
        </Plane2D>
      }
      readout={
        ok ? (
          <>
            <Read tex={`$P_{\\mathcal{B}} = \\begin{bmatrix} ${fmt(b1[0])} & ${fmt(b2[0])} \\\\ ${fmt(b1[1])} & ${fmt(b2[1])} \\end{bmatrix}$, $\\det P_{\\mathcal{B}} = ${fmt(d)}$`} />
            <Read tex={`$[\\mathbf{x}]_{\\mathcal{B}} = P_{\\mathcal{B}}^{-1}\\mathbf{x} = ${fmtV([c1, c2])}$`} />
            <Read tone="good" tex={`$\\mathbf{x} = (${fmt(c1)})\\mathbf{b}_1 + (${fmt(c2)})\\mathbf{b}_2 = ${fmtV(x)}$`} />
            <Read label="standard" tex={`$[\\mathbf{x}]_{\\mathcal{E}} = ${fmtV(x)}$: same arrow, different numbers`} />
          </>
        ) : (
          <Read tone="bad" tex={"$\\det P_{\\mathcal{B}} = 0$: $\\mathbf{b}_1, \\mathbf{b}_2$ are parallel, so they are **not a basis** and coordinates are undefined (or not unique)."} />
        )
      }
      tasks={[
        "Predict: set $\\mathbf{b}_1 = (1,0)$, $\\mathbf{b}_2 = (0,1)$. What is $[\\mathbf{x}]_{\\mathcal{B}}$?",
        "Move $\\mathbf{x}$ onto a grid crossing. Why are both coordinates whole numbers there?",
        "Double $\\mathbf{b}_1$. What happens to the first coordinate of $\\mathbf{x}$?",
        "Make $\\mathbf{b}_2$ parallel to $\\mathbf{b}_1$. Why does the grid collapse?",
      ]}
    />
  );
}
