"use client";

import { useState } from "react";
import { Choice, Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Arrow2, Handle2, Line2, Plane2D, Poly2, Seg2 } from "../Plane2D";
import { Arrow3, Dot3, Line3, Plane3, Scene3D, Seg3 } from "../Scene3D";
import { add, cross, dot, fmt, fmtV, norm, scale, sub, unit, type V2, type V3 } from "../vec";

// Interactive figures for the vectors lesson, chosen by id.
export default function Visual({ id }: { id: string }) {
  switch (id) {
    case "vector-arith":
      return <VectorArith initialMode="sum" />;
    case "parallelogram-law":
      return <VectorArith initialMode="law" />;
    case "lin-comb":
      return <LinComb />;
    case "line-plane-3d":
      return <LinePlane3D />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------- vector arithmetic (2D)

type Mode = "sum" | "diff" | "scale" | "law";

function VectorArith({ initialMode }: { initialMode: Mode }) {
  const init = { u: [3, 1] as V2, v: [1, 2.5] as V2 };
  const [u, setU] = useState<V2>(init.u);
  const [v, setV] = useState<V2>(init.v);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [k, setK] = useState(1.5);
  const [tri, setTri] = useState(false);
  const s = add(u, v);
  const d = sub(u, v);
  const ku = scale(u, k);
  const nu = norm(u), nv = norm(v);
  const lhs = dot(s, s) + dot(d, d);
  const rhs = 2 * nu * nu + 2 * nv * nv;
  return (
    <VizFrame
      title={mode === "law" ? "The parallelogram law" : "Adding, subtracting and scaling arrows"}
      hint="Drag the tips of u and v (snaps to 0.5)."
      onReset={() => { setU(init.u); setV(init.v); setK(1.5); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4.5]}>
          {(mode === "sum" || mode === "law") && !tri && <Poly2 pts={[[0, 0], u, s, v]} color="muted" fill dashed />}
          {mode === "sum" && tri && (
            <>
              <Arrow2 from={u} to={s} color="eig" dashed label="v (moved)" />
            </>
          )}
          {mode === "sum" && !tri && (
            <>
              <Seg2 a={u} b={s} dashed />
              <Seg2 a={v} b={s} dashed />
            </>
          )}
          {(mode === "sum" || mode === "law") && <Arrow2 to={s} color="good" width={3.5} label="u+v" />}
          {mode === "diff" && (
            <>
              <Arrow2 from={v} to={u} color="bad" width={3.5} label="u−v" />
              <Arrow2 to={d} color="bad" dashed label="u−v (at origin)" />
              <Arrow2 to={scale(v, -1)} color="eig" dashed label="−v" />
            </>
          )}
          {mode === "law" && <Arrow2 from={v} to={u} color="bad" width={3.5} label="u−v" />}
          {mode === "scale" && (
            <>
              <Line2 d={u} />
              <Arrow2 to={ku} color="good" width={5} label={`${fmt(k)}u`} />
            </>
          )}
          <Arrow2 to={u} color="accent" />
          {mode !== "scale" && <Arrow2 to={v} color="eig" />}
          <Handle2 at={u} onChange={setU} label="u" />
          {mode !== "scale" && <Handle2 at={v} onChange={setV} color="eig" label="v" />}
        </Plane2D>
      }
      controls={
        <>
          <Choice
            value={mode}
            onChange={setMode}
            options={[
              { v: "sum", label: "$\\mathbf{u}+\\mathbf{v}$" },
              { v: "diff", label: "$\\mathbf{u}-\\mathbf{v}$" },
              { v: "scale", label: "$k\\mathbf{u}$" },
              { v: "law", label: "Diagonals" },
            ]}
          />
          {mode === "sum" && <Toggle label="Triangle rule (move $\mathbf{v}$ to the tip of $\mathbf{u}$)" value={tri} onChange={setTri} />}
          {mode === "scale" && <Slider label="$k$" value={k} min={-2.5} max={2.5} step={0.25} onChange={setK} />}
        </>
      }
      readout={
        <>
          <Read tex={`$\\mathbf{u} = ${fmtV(u)},\\ \\mathbf{v} = ${fmtV(v)}$`} />
          {mode === "sum" && <Read tone="good" tex={`$\\mathbf{u}+\\mathbf{v} = ${fmtV(s)}$ (add componentwise)`} />}
          {mode === "diff" && <Read tone="bad" tex={`$\\mathbf{u}-\\mathbf{v} = ${fmtV(d)}$: the arrow from the tip of $\\mathbf{v}$ to the tip of $\\mathbf{u}$`} />}
          {mode === "scale" && (
            <>
              <Read tone="good" tex={`$${fmt(k)}\\mathbf{u} = ${fmtV(ku)}$`} />
              <Read tex={`$\\|k\\mathbf{u}\\| = |k|\\,\\|\\mathbf{u}\\| = ${fmt(Math.abs(k))}\\cdot${fmt(nu)} = ${fmt(norm(ku))}$; ${k > 0 ? "same direction" : k < 0 ? "**opposite** direction" : "zero vector"}`} />
            </>
          )}
          {mode === "law" && (
            <>
              <Read tex={`$\\|\\mathbf{u}+\\mathbf{v}\\|^2 + \\|\\mathbf{u}-\\mathbf{v}\\|^2 = ${fmt(dot(s, s))} + ${fmt(dot(d, d))} = ${fmt(lhs)}$`} />
              <Read tone="good" tex={`$2\\|\\mathbf{u}\\|^2 + 2\\|\\mathbf{v}\\|^2 = 2(${fmt(nu * nu)}) + 2(${fmt(nv * nv)}) = ${fmt(rhs)}$`} />
              <Read tex={`$\\|\\mathbf{u}\\pm\\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2$, here $\\mathbf{u}\\cdot\\mathbf{v} = ${fmt(dot(u, v))}$`} />
              <Read tex={`diagonal lengths ${fmt(norm(s))} and ${fmt(norm(d))}`} />
            </>
          )}
        </>
      }
      tasks={
        mode === "law"
          ? [
              "Make $\\mathbf{u}\\cdot\\mathbf{v} = 0$. What happens to the two diagonal lengths? Explain it with the expansion.",
              "Make $\\mathbf{v}$ a multiple of $\\mathbf{u}$. The parallelogram collapses; does the law still hold?",
              "Read off $\\|\\mathbf{u}+\\mathbf{v}\\|^2$ and $\\|\\mathbf{u}-\\mathbf{v}\\|^2$ only, and recover $\\mathbf{u}\\cdot\\mathbf{v}$ by subtracting the two expansions.",
            ]
          : [
              "Switch on the triangle rule. Does the green arrow change? (It shouldn't: both rules give the same sum.)",
              "In $\\mathbf{u}-\\mathbf{v}$ mode, which way does the red arrow point: towards $\\mathbf{u}$ or towards $\\mathbf{v}$?",
              "Set $k$ negative. Is $k\\mathbf{u}$ still parallel to $\\mathbf{u}$?",
              "Predict the length of $-2\\mathbf{u}$, then check with the slider.",
            ]
      }
    />
  );
}

// ---------------------------------------------------------------- linear combination (2D)

function LinComb() {
  const init = { u: [2, 1] as V2, v: [-1, 1.5] as V2, w: [1, 3.5] as V2 };
  const [u, setU] = useState<V2>(init.u);
  const [v, setV] = useState<V2>(init.v);
  const [w, setW] = useState<V2>(init.w);
  const D = u[0] * v[1] - u[1] * v[0];
  const ok = Math.abs(D) > 1e-9;
  const a = ok ? (w[0] * v[1] - w[1] * v[0]) / D : 0;
  const b = ok ? (u[0] * w[1] - u[1] * w[0]) / D : 0;
  const au = scale(u, a);
  const grid: [V2, V2][] = [];
  if (ok) for (let i = -6; i <= 6; i++) { grid.push([scale(v, i), u]); grid.push([scale(u, i), v]); }
  return (
    <VizFrame
      title="Linear combinations a u + b v"
      hint="Drag u, v and the target w. The faint grid is made of whole-number steps along u and v."
      onReset={() => { setU(init.u); setV(init.v); setW(init.w); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 5]}>
          {grid.map(([p, d], i) => <GridLine key={i} p={p} d={d} />)}
          {ok && (
            <>
              <Arrow2 to={au} color="accent" width={4} dashed label="au" />
              <Arrow2 from={au} to={w} color="eig" width={4} dashed label="bv" />
            </>
          )}
          <Arrow2 to={u} color="accent" />
          <Arrow2 to={v} color="eig" />
          <Arrow2 to={w} color="good" width={3} />
          <Handle2 at={u} onChange={setU} label="u" />
          <Handle2 at={v} onChange={setV} color="eig" label="v" />
          <Handle2 at={w} onChange={setW} color="good" label="w" />
        </Plane2D>
      }
      readout={
        ok ? (
          <>
            <Read tex={`Solve $a${fmtV(u)} + b${fmtV(v)} = ${fmtV(w)}$ componentwise:`} />
            <Read tex={`$${linEq([u[0], v[0]], "ab")} = ${fmt(w[0])},\\quad ${linEq([u[1], v[1]], "ab")} = ${fmt(w[1])}$`} />
            <Read tone="good" tex={`$a = ${fmt(a)},\\ b = ${fmt(b)}$`} />
            <Read tex="In $R^3$ there would be a third equation to check, and it may fail." />
          </>
        ) : (
          <Read tone="bad" tex="$\mathbf{u}$ and $\mathbf{v}$ are parallel: every $a\mathbf{u}+b\mathbf{v}$ is a multiple of $\mathbf{u}$, so this $\mathbf{w}$ may not be reachable." />
        )
      }
      tasks={[
        "Move $\\mathbf{w}$ onto a grid crossing. Are $a$ and $b$ whole numbers there?",
        "Predict, then check: what are $a, b$ when $\\mathbf{w} = \\mathbf{u}$?",
        "Drag $\\mathbf{v}$ until it is parallel to $\\mathbf{u}$. What happens to the grid and to the solution?",
      ]}
    />
  );
}

function GridLine({ p, d }: { p: V2; d: V2 }) {
  return <Line2 p={p} d={d} color="muted" dashed={false} />;
}

// ---------------------------------------------------------------- line meets plane (3D)

const PRESETS: { label: string; n: V3; d: number; p: V3; dir: V3 }[] = [
  { label: "Crosses", n: [1, 1, 1], d: 1, p: [2, -1, 3], dir: [2, 2, -1] },
  { label: "Parallel", n: [0, 0, 1], d: 0, p: [-2, 0, 2], dir: [1, 1, 0] },
  { label: "Lies in", n: [1, -1, 1], d: 1, p: [1, 0, 0], dir: [1, 1, 0] },
];

/** a x + b y + c z with tidy signs and unit coefficients. */
function linEq(n: number[], vars = "xyz"): string {
  let s = "";
  n.forEach((c, i) => {
    if (Math.abs(c) < 1e-9) return;
    const a = Math.abs(c);
    const term = `${Math.abs(a - 1) < 1e-9 ? "" : fmt(a)}${vars[i]}`;
    s += s ? ` ${c < 0 ? "-" : "+"} ${term}` : `${c < 0 ? "-" : ""}${term}`;
  });
  return s || "0";
}

function inPlaneBasis(n: V3): [V3, V3] {
  const ax: V3 = Math.abs(n[0]) < 0.6 * norm(n) ? [1, 0, 0] : [0, 1, 0];
  const a = unit(cross(n, ax));
  const b = unit(cross(n, a));
  return [a, b];
}

function LinePlane3D() {
  const [pi, setPi] = useState(0);
  const P = PRESETS[pi];
  const [n, setN] = useState<V3>(P.n);
  const [d, setD] = useState(P.d);
  const [p, setP] = useState<V3>(P.p);
  const [dir, setDir] = useState<V3>(P.dir);
  const [t, setT] = useState(0);
  const load = (i: number) => { const q = PRESETS[i]; setPi(i); setN(q.n); setD(q.d); setP(q.p); setDir(q.dir); setT(0); };
  const nn = dot(n, n);
  const valid = nn > 1e-9 && norm(dir) > 1e-9;
  const nd = dot(n, dir);
  const np = dot(n, p);
  const parallel = Math.abs(nd) < 1e-9;
  const tStar = parallel ? null : (d - np) / nd;
  const X = tStar === null ? null : add(p, scale(dir, tStar));
  const inPlane = parallel && Math.abs(np - d) < 1e-9;
  const center = valid ? scale(n, d / nn) : ([0, 0, 0] as V3);
  const [ba, bb] = valid ? inPlaneBasis(n) : ([[1, 0, 0], [0, 1, 0]] as [V3, V3]);
  const moving = add(p, scale(dir, t));
  return (
    <VizFrame
      title="Where a line meets a plane"
      hint="Drag empty space to rotate. Move the slider to slide a point along the line; edit n, d, P₀ and the direction below."
      onReset={() => load(pi)}
      figure={
        <Scene3D extent={3.5}>
          {valid && <Plane3 u={ba} v={bb} center={center} size={3.2} color={inPlane ? "good" : "accent"} />}
          {valid && <Arrow3 from={center} to={add(center, scale(unit(n), 1.5))} color="warn" label="n" />}
          {valid && <Line3 p={p} d={dir} color="eig" len={9} />}
          <Dot3 at={p} color="eig" label="P₀" />
          <Arrow3 from={p} to={add(p, dir)} color="eig" label="d" width={2} />
          <Dot3 at={moving} color="text" r={5} label={`t = ${fmt(t)}`} />
          {X && <Dot3 at={X} color="bad" r={6} label="X" />}
          {X && <Seg3 a={p} b={X} color="bad" />}
        </Scene3D>
      }
      controls={
        <>
          <Choice value={pi} onChange={load} options={PRESETS.map((q, i) => ({ v: i, label: q.label }))} />
          <VecInput label="normal $\mathbf{n}$" value={n} onChange={(x) => setN(x as V3)} />
          <Slider label="right-hand side $d$" value={d} min={-6} max={6} step={0.5} onChange={setD} />
          <VecInput label="$P_0$" value={p} onChange={(x) => setP(x as V3)} />
          <VecInput label="direction $\mathbf{d}$" value={dir} onChange={(x) => setDir(x as V3)} />
          <Slider label="$t$" value={t} min={-5} max={5} step={0.1} onChange={setT} />
        </>
      }
      readout={
        valid ? (
          <>
            <Read tex={`plane: $${linEq(n)} = ${fmt(d)}$`} />
            <Read tex={`substitute $P_0 + t\\mathbf{d}$: $\\ ${fmt(np)} + (${fmt(nd)})\\,t = ${fmt(d)}$`} />
            {!parallel && <Read tone="bad" tex={`coefficient of $t$ is $\\mathbf{n}\\cdot\\mathbf{d} \\ne 0$: one solution $t = ${fmt(tStar!)}$, $X = ${fmtV(X!)}$`} />}
            {parallel && !inPlane && <Read tone="warn" tex={`coefficient of $t$ is $0$ and $${fmt(np)} \\ne ${fmt(d)}$: no $t$ works, **no** intersection`} />}
            {inPlane && <Read tone="good" tex={`coefficient of $t$ is $0$ and $${fmt(np)} = ${fmt(d)}$: every $t$ works, the line **lies on** the plane`} />}
          </>
        ) : (
          <Read tone="bad" tex="Both $\mathbf{n}$ and $\mathbf{d}$ must be nonzero." />
        )
      }
      tasks={[
        "On **Crosses**, slide $t$ until the white point lands on the red $X$. Does it match the formula's $t$?",
        "On **Parallel**, change only $d$ (the slider) until the line lies in the plane. Which value works, and why?",
        "On **Lies in**, move $P_0$ off the plane. Which of the three outcomes do you get now?",
        "Set the plane to $z = 0$ (normal $(0,0,1)$, $d = 0$): this is the $x$–$y$ plane. Where does the Crosses line meet it?",
      ]}
    />
  );
}
