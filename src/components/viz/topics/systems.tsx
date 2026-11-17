"use client";

import { useState } from "react";
import { Choice, Read, Slider, Toggle, VecInput, VizFrame } from "../Frame";
import { Dot2, Line2, Plane2D, type VizColor } from "../Plane2D";
import { Arrow3, Dot3, Handle3, Line3, Plane3, Scene3D, Seg3 } from "../Scene3D";
import { add, cross, dot, fmt, fmtV, norm, scale, type V2, type V3 } from "../vec";

// Interactive figures for the linear-systems lesson, chosen by id.
export default function SystemsVisual({ id }: { id: string }) {
  switch (id) {
    case "system-lines":
      return <SystemLines />;
    case "row-op-lines":
      return <RowOpLines />;
    case "span-3d":
      return <Span3D />;
    default:
      return null;
  }
}

type Eq = [number, number, number]; // a x + b y = c
const EPS = 1e-9;

/** Float rank of a small matrix (rows), with a tolerance. */
function rankOf(rows: number[][]): number {
  const M = rows.map((r) => [...r]);
  let rk = 0;
  const cols = M[0]?.length ?? 0;
  for (let c = 0; c < cols && rk < M.length; c++) {
    let p = -1;
    let best = 1e-7;
    for (let i = rk; i < M.length; i++) if (Math.abs(M[i][c]) > best) { best = Math.abs(M[i][c]); p = i; }
    if (p < 0) continue;
    [M[rk], M[p]] = [M[p], M[rk]];
    for (let i = rk + 1; i < M.length; i++) {
      const f = M[i][c] / M[rk][c];
      M[i] = M[i].map((x, j) => x - f * M[rk][j]);
    }
    rk++;
  }
  return rk;
}

/** Solve a consistent rank-2 system of lines; returns the intersection point. */
function intersect(eqs: Eq[]): V2 | null {
  for (let i = 0; i < eqs.length; i++)
    for (let j = i + 1; j < eqs.length; j++) {
      const [a1, b1, c1] = eqs[i], [a2, b2, c2] = eqs[j];
      const d = a1 * b2 - a2 * b1;
      if (Math.abs(d) > 1e-9) return [(c1 * b2 - c2 * b1) / d, (a1 * c2 - a2 * c1) / d];
    }
  return null;
}

function EqLine({ e, color, dashed = false }: { e: Eq; color: VizColor; dashed?: boolean }) {
  const [a, b, c] = e;
  const nn = a * a + b * b;
  if (nn < EPS) return null;
  return <Line2 p={[(c * a) / nn, (c * b) / nn]} d={[-b, a]} color={color} dashed={dashed} />;
}

const eqTex = (e: Eq, i: number) => {
  const [a, b, c] = e;
  const t = (k: number, v: string, first: boolean) => {
    if (Math.abs(k) < EPS) return "";
    const s = Math.abs(Math.abs(k) - 1) < EPS ? v : `${fmt(Math.abs(k))}${v}`;
    return first ? `${k < 0 ? "-" : ""}${s}` : ` ${k < 0 ? "-" : "+"} ${s}`;
  };
  const lhs = (t(a, "x", true) + t(b, "y", Math.abs(a) < EPS)).trim() || "0";
  return `$(${i + 1})\\ ${lhs} = ${fmt(c)}$`;
};

function classify(eqs: Eq[]): { tone: "good" | "bad" | "warn"; text: string; pt: V2 | null } {
  const rA = rankOf(eqs.map((e) => [e[0], e[1]]));
  const rAb = rankOf(eqs.map((e) => [...e]));
  if (rAb > rA) return { tone: "bad", text: `the echelon form of $[A\\mid\\mathbf{b}]$ has a row $[0\\ 0 \\mid c\\ne0]$ → **no solution**`, pt: null };
  if (rA === 2) {
    const pt = intersect(eqs);
    return { tone: "good", text: `pivot in both columns → **exactly one solution** $(x, y) = (${fmt(pt![0])}, ${fmt(pt![1])})$`, pt };
  }
  if (rA === 1) return { tone: "warn", text: "one pivot, $y$ or $x$ free → **infinitely many solutions** (all equations describe the same line)", pt: null };
  return { tone: "warn", text: "all coefficients zero and consistent → every point is a solution", pt: null };
}

function SystemLines() {
  const init: Eq[] = [[1, 2, 4], [3, -1, 5], [1, -1, 1]];
  const [e, setE] = useState<Eq[]>(init);
  const [three, setThree] = useState(false);
  const eqs = three ? e : e.slice(0, 2);
  const cls = classify(eqs);
  const colors: VizColor[] = ["accent", "eig", "warn"];
  const preset = (k: string) => {
    setThree(false);
    if (k === "unique") setE([[1, 2, 4], [3, -1, 5], e[2]]);
    if (k === "parallel") setE([[1, 2, 4], [2, 4, 9], e[2]]);
    if (k === "same") setE([[1, 2, 4], [2, 4, 8], e[2]]);
  };
  const set = (i: number) => (v: number[]) => setE(e.map((x, j) => (j === i ? (v as Eq) : x)));
  return (
    <VizFrame
      title="Each equation is a line"
      hint="Type the coefficients (a, b, c) of ax + by = c, or pick a preset."
      onReset={() => { setE(init); setThree(false); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          {eqs.map((q, i) => <EqLine key={i} e={q} color={colors[i]} />)}
          {cls.pt && Math.abs(cls.pt[0]) < 6 && Math.abs(cls.pt[1]) < 5 && <Dot2 at={cls.pt} color="good" r={6} label="solution" />}
        </Plane2D>
      }
      controls={
        <>
          <Choice
            value=""
            options={[
              { v: "unique", label: "crossing" },
              { v: "parallel", label: "parallel" },
              { v: "same", label: "same line" },
            ]}
            onChange={preset}
          />
          <VecInput label="(1) $a, b, c$" value={e[0]} onChange={set(0)} />
          <VecInput label="(2) $a, b, c$" value={e[1]} onChange={set(1)} />
          <Toggle label="Add a third equation" value={three} onChange={setThree} />
          {three && <VecInput label="(3) $a, b, c$" value={e[2]} onChange={set(2)} />}
        </>
      }
      readout={
        <>
          {eqs.map((q, i) => <Read key={i} tex={eqTex(q, i)} />)}
          <Read tex={`$[A \\mid \\mathbf{b}] = \\left[\\begin{array}{cc|c} ${eqs.map((q) => q.map((x) => fmt(x)).join(" & ")).join(" \\\\ ")} \\end{array}\\right]$`} />
          <Read tone={cls.tone} tex={cls.text} />
        </>
      }
      tasks={[
        "Predict, then check: with two equations, how can you make the lines parallel? What happens to $|A| = a_1b_2 - a_2b_1$?",
        "Make line (2) exactly twice line (1), then change only its $c$. Watch the count jump from infinitely many to none.",
        "Add a third equation (3 equations, 2 unknowns). Make it pass through the crossing point, then move it off: one solution becomes none.",
        "Can you ever get exactly two intersection points? Why not?",
      ]}
    />
  );
}

function RowOpLines() {
  const init: Eq[] = [[1, 2, 4], [3, -1, 5]];
  const [e, setE] = useState<Eq[]>(init);
  const [k, setK] = useState(0);
  const [c, setC] = useState(1);
  const [r1, r2] = e;
  const newR2: Eq = [0, 1, 2].map((j) => c * (r2[j] + k * r1[j])) as Eq;
  const pt = intersect([r1, r2]);
  const elim = Math.abs(newR2[0]) < 1e-9 && Math.abs(newR2[1]) > 1e-9;
  const kill = Math.abs(r1[0]) > EPS ? -r2[0] / r1[0] : null;
  return (
    <VizFrame
      title="Row operations keep the solution"
      hint="Slide k to replace r₂ by c(r₂ + k r₁). The faded line is the original equation (2)."
      onReset={() => { setE(init); setK(0); setC(1); }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          <EqLine e={r2} color="muted" dashed />
          <EqLine e={r1} color="accent" />
          <EqLine e={newR2} color="eig" />
          {pt && <Dot2 at={pt} color="good" r={6} label="solution" />}
        </Plane2D>
      }
      controls={
        <>
          <VecInput label="$r_1$: $a, b, c$" value={r1} onChange={(v) => setE([v as Eq, r2])} />
          <VecInput label="$r_2$: $a, b, c$" value={r2} onChange={(v) => setE([r1, v as Eq])} />
          <Slider label="replacement $k$" value={k} min={-5} max={5} step={0.25} onChange={setK} />
          <Slider label="then scale by $c$" value={c} min={-2} max={2} step={0.25} onChange={(v) => setC(Math.abs(v) < 1e-9 ? 0.25 : v)} />
        </>
      }
      readout={
        <>
          <Read tex={`$r_2 \\leftarrow ${fmt(c)}\\,\\big(r_2 + (${fmt(k)})r_1\\big)$`} />
          <Read tex={`$\\left[\\begin{array}{cc|c} ${r1.map((x) => fmt(x)).join(" & ")} \\\\ ${newR2.map((x) => fmt(x)).join(" & ")} \\end{array}\\right]$`} />
          {pt ? (
            <Read tone="good" tex={`both systems are solved by $(${fmt(pt[0])}, ${fmt(pt[1])})$: the new line still passes through it`} />
          ) : (
            <Read tone="warn" tex="the original lines do not cross in a single point; row operations cannot change that either" />
          )}
          {elim ? (
            <Read tone="good" tex={`$x$ eliminated: echelon form, $y = ${fmt(newR2[2] / newR2[1])}$ (horizontal line)`} />
          ) : (
            kill !== null && <Read tex={`to eliminate $x$ from $r_2$ use $k = ${fmt(kill)}$`} />
          )}
        </>
      }
      tasks={[
        "Predict: as $k$ changes, the blue line turns. About which point does it pivot?",
        "Find the $k$ that makes the new equation (2) horizontal. That is the elimination step $r_2 \leftarrow r_2 + k\,r_1$ that clears $x$ below the pivot.",
        "Scaling by $c$ never moves the line at all. Why? (Same equation, multiplied through.)",
        "Make the original lines parallel. Can any $k$ create a crossing point?",
      ]}
    />
  );
}

function solve2(a1: V3, a2: V3, b: V3): V2 | null {
  const g11 = dot(a1, a1), g12 = dot(a1, a2), g22 = dot(a2, a2);
  const d = g11 * g22 - g12 * g12;
  if (Math.abs(d) < 1e-9) return null;
  const r1 = dot(a1, b), r2 = dot(a2, b);
  return [(g22 * r1 - g12 * r2) / d, (g11 * r2 - g12 * r1) / d];
}

function Span3D() {
  const init = { a1: [2, 0, 0.5] as V3, a2: [0.5, 2, 0.5] as V3, a3: [0, 0.5, 2] as V3, b: [1, 2, 2] as V3 };
  const [a1, setA1] = useState(init.a1);
  const [a2, setA2] = useState(init.a2);
  const [a3, setA3] = useState(init.a3);
  const [bFree, setB] = useState(init.b);
  const [useA3, setUseA3] = useState(false);
  const [build, setBuild] = useState(false);
  const [w, setW] = useState<V2>([1, 0.5]);
  const b = build ? add(scale(a1, w[0]), scale(a2, w[1])) : bFree;
  const n = cross(a1, a2);
  const parallel = norm(n) < 1e-6;
  const det3 = dot(n, useA3 ? a3 : b);
  const tol = 1e-6 * Math.max(1, norm(a1) * norm(a2) * norm(b));
  const inSpan2 = parallel ? norm(cross(norm(a1) > 1e-9 ? a1 : a2, b)) < 1e-6 : Math.abs(dot(n, b)) < tol;
  const pivots2 = parallel ? (norm(a1) > 1e-9 || norm(a2) > 1e-9 ? 1 : 0) : 2;
  const fullRank3 = useA3 && Math.abs(det3) > 1e-6;
  const wt = !parallel ? solve2(a1, a2, b) : null;
  return (
    <VizFrame
      title="Is b in the span of the columns?"
      hint="Drag the column tips a₁, a₂ (and a₃) and the target b. Drag empty space to rotate."
      onReset={() => { setA1(init.a1); setA2(init.a2); setA3(init.a3); setB(init.b); setBuild(false); setUseA3(false); }}
      figure={
        <Scene3D extent={3.2}>
          {fullRank3 ? null : !parallel ? <Plane3 u={a1} v={a2} size={3.5} color="accent" /> : <Line3 d={norm(a1) > 1e-9 ? a1 : a2} color="accent" />}
          <Arrow3 to={a1} color="accent" label="a₁" />
          <Arrow3 to={a2} color="eig" label="a₂" />
          {useA3 && <Arrow3 to={a3} color="warn" label="a₃" />}
          {build && (
            <>
              <Seg3 a={[0, 0, 0]} b={scale(a1, w[0])} color="accent" />
              <Seg3 a={scale(a1, w[0])} b={b} color="eig" />
            </>
          )}
          <Arrow3 to={b} color={inSpan2 || fullRank3 ? "good" : "bad"} width={3} />
          <Dot3 at={b} color={inSpan2 || fullRank3 ? "good" : "bad"} r={3} label="b" />
          <Handle3 at={a1} onChange={setA1} />
          <Handle3 at={a2} onChange={setA2} color="eig" />
          {useA3 && <Handle3 at={a3} onChange={setA3} color="warn" />}
          {!build && <Handle3 at={bFree} onChange={setB} color="text" />}
        </Scene3D>
      }
      controls={
        <>
          <VecInput label="$\mathbf{b}$" value={b} onChange={(v) => { setBuild(false); setB(v as V3); }} />
          <Toggle label="Build $\mathbf{b} = x_1\mathbf{a}_1 + x_2\mathbf{a}_2$ with sliders" value={build} onChange={setBuild} />
          {build && (
            <>
              <Slider label="$x_1$" value={w[0]} min={-2} max={2} step={0.05} onChange={(v) => setW([v, w[1]])} />
              <Slider label="$x_2$" value={w[1]} min={-2} max={2} step={0.05} onChange={(v) => setW([w[0], v])} />
            </>
          )}
          <Toggle label="Add a third column $\mathbf{a}_3$" value={useA3} onChange={setUseA3} />
        </>
      }
      readout={
        <>
          <Read tex={`$A = [\\mathbf{a}_1\\ \\mathbf{a}_2${useA3 ? "\\ \\mathbf{a}_3" : ""}]$: ${useA3 ? (fullRank3 ? "**3 pivots**" : "fewer than 3 pivots") : `**${pivots2} pivot${pivots2 === 1 ? "" : "s"}** in 3 rows`}`} />
          {useA3 ? (
            <Read tone={fullRank3 ? "good" : "warn"} tex={fullRank3 ? `$\\det A = ${fmt(det3)} \\ne 0$: pivot in every row, the columns span $\\mathbb{R}^3$, so **every** $\\mathbf{b}$ is reachable` : `$\\det A = 0$: the three columns lie in one plane (dependent), they do not span $\\mathbb{R}^3$`} />
          ) : (
            <Read tone="warn" tex={`a $3\\times2$ matrix has at most 2 pivots for 3 rows: $\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$ is a ${parallel ? "line" : "plane"}, never all of $\\mathbb{R}^3$`} />
          )}
          {!useA3 && (
            <Read
              tone={inSpan2 ? "good" : "bad"}
              tex={inSpan2 ? `$\\mathbf{b}\\in\\operatorname{Span}$: $A\\mathbf{x} = \\mathbf{b}$ is consistent${wt ? `, $\\mathbf{x} = ${fmtV(wt)}$` : ""}` : `$\\mathbf{b}\\notin\\operatorname{Span}$: reducing $[\\mathbf{a}_1\\ \\mathbf{a}_2 \\mid \\mathbf{b}]$ ends in $[0\\ 0 \\mid c\\ne0]$ (here $\\det[\\mathbf{a}_1\\ \\mathbf{a}_2\\ \\mathbf{b}] = ${fmt(det3)}$)`}
            />
          )}
        </>
      }
      tasks={[
        "Predict, then check: drag $\\mathbf{b}$ off the plane. Which readout turns red, and what row appears in the echelon form?",
        "Tick 'Build b' and move the sliders: every combination stays on the plane. That plane is $\\operatorname{Span}\\{\\mathbf{a}_1,\\mathbf{a}_2\\}$.",
        "Drag $\\mathbf{a}_2$ onto the line of $\\mathbf{a}_1$. What happens to the span and the pivot count?",
        "Add $\\mathbf{a}_3$ out of the plane: now every $\\mathbf{b}$ works. Then drag $\\mathbf{a}_3$ into the plane and watch $\\det A$ hit $0$.",
      ]}
    />
  );
}
