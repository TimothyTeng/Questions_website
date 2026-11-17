"use client";

import { useState, type ReactNode } from "react";
import { Choice, Read, VecInput, VizFrame } from "../Frame";
import { Arrow2, Dot2, Handle2, Line2, Plane2D, Poly2, Seg2 } from "../Plane2D";
import { add, fmt, fmtV, scale, type V2 } from "../vec";

// Interactive figures for the matrix-algebra lesson, chosen by id.
export default function MatrixAlgebraVisual({ id }: { id: string }) {
  switch (id) {
    case "inverse-grid":
      return <InverseGrid />;
    case "inverse-order":
      return <InverseOrder />;
    case "gauss-jordan-2x2":
      return <GaussJordan2 />;
    default:
      return null;
  }
}

type M2 = [[number, number], [number, number]];

const mul = (A: M2, B: M2): M2 => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];
const apply = (A: M2, v: V2): V2 => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const det2 = (A: M2) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const inv2 = (A: M2): M2 | null => {
  const d = det2(A);
  if (Math.abs(d) < 1e-9) return null;
  return [
    [A[1][1] / d, -A[0][1] / d],
    [-A[1][0] / d, A[0][0] / d],
  ];
};
const isI = (A: M2) => Math.abs(A[0][0] - 1) < 1e-9 && Math.abs(A[1][1] - 1) < 1e-9 && Math.abs(A[0][1]) < 1e-9 && Math.abs(A[1][0]) < 1e-9;

/** Format as a small fraction when possible (e.g. 0.333 → 1/3). */
function fr(x: number): string {
  if (Math.abs(x) < 1e-9) return "0";
  for (let d = 1; d <= 24; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9) return d === 1 ? String(n) : `${n < 0 ? "-" : ""}\\tfrac{${Math.abs(n)}}{${d}}`;
  }
  return fmt(x);
}
const texM = (A: number[][], f: (x: number) => string = fr) => `\\begin{bmatrix} ${A.map((r) => r.map(f).join(" & ")).join(" \\\\ ")} \\end{bmatrix}`;

// ---------------------------------------------------------------- 1. inverse undoes A; solving Ax = b

function InverseGrid() {
  const init = { a1: [2, 0.5] as V2, a2: [0.5, 1.5] as V2, b: [3, 3] as V2 };
  const [a1, setA1] = useState(init.a1);
  const [a2, setA2] = useState(init.a2);
  const [b, setB] = useState(init.b);
  const A: M2 = [
    [a1[0], a2[0]],
    [a1[1], a2[1]],
  ];
  const d = det2(A);
  const Ai = Math.abs(d) < 0.05 ? null : inv2(A);
  const x = Ai ? apply(Ai, b) : null;
  const lattice: ReactNode[] = [];
  if (Ai) {
    for (let i = -6; i <= 6; i++) {
      lattice.push(<Seg2 key={`u${i}`} a={add(scale(a1, i), scale(a2, -12))} b={add(scale(a1, i), scale(a2, 12))} color="eig" width={0.6} />);
      lattice.push(<Seg2 key={`v${i}`} a={add(scale(a2, i), scale(a1, -12))} b={add(scale(a2, i), scale(a1, 12))} color="accent" width={0.6} />);
    }
  }
  const unit: V2[] = [[0, 0], a1, add(a1, a2), a2];
  return (
    <VizFrame
      title="A⁻¹ transforms Ax back to x: solving Ax = b"
      hint="Drag the column tips a₁, a₂ (the columns of A) and the target b. The tilted grid is the image of the square grid under A."
      onReset={() => {
        setA1(init.a1);
        setA2(init.a2);
        setB(init.b);
      }}
      figure={
        <Plane2D x={[-5, 5]} y={[-4, 4]}>
          {lattice}
          {!Ai && <Line2 d={Math.hypot(...a1) > 1e-6 ? a1 : a2} color="bad" dashed={false} />}
          <Poly2 pts={unit} color="accent" fill />
          {x && (
            <>
              <Arrow2 to={scale(a1, x[0])} color="accent" dashed width={2} />
              <Arrow2 from={scale(a1, x[0])} to={b} color="eig" dashed width={2} />
            </>
          )}
          <Arrow2 to={a1} color="accent" />
          <Arrow2 to={a2} color="eig" />
          <Handle2 at={a1} onChange={setA1} label="a₁" />
          <Handle2 at={a2} onChange={setA2} color="eig" label="a₂" />
          <Handle2 at={b} onChange={setB} color="text" label="b" />
          {!Ai && <Dot2 at={[0, 0]} color="bad" r={5} />}
        </Plane2D>
      }
      controls={<VecInput label="$\mathbf{b}$" value={b} onChange={(v) => setB(v as V2)} />}
      readout={
        <>
          <Read tex={`$A = [\\mathbf{a}_1\\ \\mathbf{a}_2] = ${texM(A, fmt)}$, $\\ ad - bc = ${fmt(d)}$`} />
          {Ai && x ? (
            <>
              <Read tone="good" tex={`$A^{-1} = \\dfrac{1}{${fmt(d)}}${texM([[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]], fmt)} = ${texM(Ai, (v) => fmt(v))}$`} />
              <Read tex={`$\\mathbf{x} = A^{-1}\\mathbf{b} = ${fmtV(x)}$`} />
              <Read tex={`check: $${fmt(x[0])}\\,\\mathbf{a}_1 + ${fmt(x[1])}\\,\\mathbf{a}_2 = \\mathbf{b}$ (dashed path). The coordinates of $\\mathbf{b}$ in the tilted grid are $\\mathbf{x}$.`} />
            </>
          ) : (
            <Read
              tone="bad"
              tex="$ad - bc = 0$: $A$ is not invertible (singular). The columns lie on one line (red), so they do not span $\mathbb{R}^2$ and $A\mathbf{x} = \mathbf{b}$ has no solution for $\mathbf{b}$ off that line (Theorem 2.4)."
            />
          )}
        </>
      }
      tasks={[
        "Predict: where must $\\mathbf{b}$ be for $\\mathbf{x} = (1, 1)$? Drag $\\mathbf{b}$ there and check.",
        "Drag $\\mathbf{a}_2$ onto the line through $\\mathbf{a}_1$. What happens to $ad - bc$, the grid and $A^{-1}$?",
        "Make $A = I$ (columns $(1,0)$ and $(0,1)$). Why is $\\mathbf{x} = \\mathbf{b}$ now?",
        "Swap the roles: if $\\mathbf{a}_1$ and $\\mathbf{a}_2$ are exchanged, how do the entries of $\\mathbf{x}$ change?",
      ]}
    />
  );
}

// ---------------------------------------------------------------- 2. (AB)^{-1} = B^{-1}A^{-1}

const MOVES: Record<string, { label: string; M: M2 }> = {
  shear: { label: "$E$: $r_1 \\leftarrow r_1 + r_2$", M: [[1, 1], [0, 1]] },
  rot: { label: "rotate 90°", M: [[0, -1], [1, 0]] },
  stretch: { label: "$E$: $r_1 \\leftarrow 2r_1$", M: [[2, 0], [0, 1]] },
  reflect: { label: "reflect in $y = x$", M: [[0, 1], [1, 0]] },
};
type MoveKey = keyof typeof MOVES;
const MOVE_OPTS = (Object.keys(MOVES) as MoveKey[]).map((k) => ({ v: k, label: MOVES[k].label }));

const LETTER_F: V2[] = [[0, 0], [0, 2], [1.2, 2], [1.2, 1.6], [0.4, 1.6], [0.4, 1.2], [1, 1.2], [1, 0.8], [0.4, 0.8], [0.4, 0]];

function InverseOrder() {
  const [bKey, setB] = useState<MoveKey>("shear");
  const [aKey, setA] = useState<MoveKey>("rot");
  const [undo, setUndo] = useState<"right" | "wrong">("wrong");
  const A = MOVES[aKey].M;
  const B = MOVES[bKey].M;
  const AB = mul(A, B);
  const Ai = inv2(A)!;
  const Bi = inv2(B)!;
  const U = undo === "right" ? mul(Bi, Ai) : mul(Ai, Bi);
  const back = mul(U, AB);
  const ok = isI(back);
  const moved = LETTER_F.map((p) => apply(AB, p));
  const undone = moved.map((p) => apply(U, p));
  return (
    <VizFrame
      title="Theorem 2.2: (AB)⁻¹ = B⁻¹A⁻¹"
      hint="Pick B (done first) and A (done second). The blue F is ABx. Then choose an order for undoing it."
      figure={
        <Plane2D x={[-4, 4]} y={[-3, 3]}>
          <Poly2 pts={LETTER_F} color="muted" closed dashed width={1.5} />
          <Poly2 pts={moved} color="accent" fill width={2} />
          <Poly2 pts={undone} color={ok ? "good" : "bad"} closed width={2.5} />
        </Plane2D>
      }
      controls={
        <>
          <div className="small muted">First apply $B$:</div>
          <Choice value={bKey} options={MOVE_OPTS} onChange={setB} />
          <div className="small muted">then apply $A$:</div>
          <Choice value={aKey} options={MOVE_OPTS} onChange={setA} />
          <div className="small muted">Undo with:</div>
          <Choice
            value={undo}
            options={[
              { v: "wrong", label: "$A^{-1}B^{-1}$" },
              { v: "right", label: "$B^{-1}A^{-1}$" },
            ]}
            onChange={setUndo}
          />
        </>
      }
      readout={
        <>
          <Read tex={`$AB = ${texM(A)}${texM(B)} = ${texM(AB)}$ (dashed F → blue F)`} />
          <Read tex={`$${undo === "right" ? "B^{-1}A^{-1}" : "A^{-1}B^{-1}"} = ${texM(U)}$`} />
          <Read
            tone={ok ? "good" : "bad"}
            tex={`$${undo === "right" ? "B^{-1}A^{-1}" : "A^{-1}B^{-1}"}\\,(AB) = ${texM(back)}$ ${ok ? "$= I$: the F is restored (green)." : "$\\ne I$: the red F is not the original."}`}
          />
        </>
      }
      tasks={[
        "Predict, then check: with B = E (r₁ ← r₁ + r₂) and A = rotate, which undo order restores the F?",
        "Find a pair (A, B) for which the wrong order **also** works. What is special about such a pair? (Hint: do $A$ and $B$ commute?)",
        "Choose A = B = reflect. Explain why every undo order works here.",
      ]}
    />
  );
}

// ---------------------------------------------------------------- 3. Row reducing [A I] (Theorem 2.3), one elementary matrix at a time

interface GJStep {
  label: string;
  E: M2;
  M: number[][];
}

function gaussJordanSteps(A: M2): { steps: GJStep[]; singular: boolean } {
  let M = [
    [A[0][0], A[0][1], 1, 0],
    [A[1][0], A[1][1], 0, 1],
  ];
  const steps: GJStep[] = [];
  const push = (label: string, E: M2) => {
    M = [0, 1].map((i) => M[0].map((_, j) => E[i][0] * M[0][j] + E[i][1] * M[1][j]));
    steps.push({ label, E, M });
  };
  const z = (x: number) => Math.abs(x) < 1e-9;
  if (z(M[0][0])) {
    if (z(M[1][0])) return { steps, singular: true };
    push("R_1 \\leftrightarrow R_2", [[0, 1], [1, 0]]);
  }
  if (!z(M[0][0] - 1)) push(`R_1 \\to ${fr(1 / M[0][0])}\\,R_1`, [[1 / M[0][0], 0], [0, 1]]);
  if (!z(M[1][0])) {
    const k = M[1][0];
    push(`R_2 \\to R_2 ${k > 0 ? "-" : "+"} ${fr(Math.abs(k))}\\,R_1`, [[1, 0], [-k, 1]]);
  }
  if (z(M[1][1])) return { steps, singular: true };
  if (!z(M[1][1] - 1)) push(`R_2 \\to ${fr(1 / M[1][1])}\\,R_2`, [[1, 0], [0, 1 / M[1][1]]]);
  if (!z(M[0][1])) {
    const k = M[0][1];
    push(`R_1 \\to R_1 ${k > 0 ? "-" : "+"} ${fr(Math.abs(k))}\\,R_2`, [[1, -k], [0, 1]]);
  }
  return { steps, singular: false };
}

const PRESETS: { label: string; A: M2 }[] = [
  { label: "$\\left[\\begin{smallmatrix}2&1\\\\4&3\\end{smallmatrix}\\right]$", A: [[2, 1], [4, 3]] },
  { label: "$\\left[\\begin{smallmatrix}0&2\\\\1&1\\end{smallmatrix}\\right]$", A: [[0, 2], [1, 1]] },
  { label: "$\\left[\\begin{smallmatrix}3&1\\\\2&1\\end{smallmatrix}\\right]$", A: [[3, 1], [2, 1]] },
  { label: "$\\left[\\begin{smallmatrix}1&2\\\\2&4\\end{smallmatrix}\\right]$", A: [[1, 2], [2, 4]] },
];

function GaussJordan2() {
  const [p, setP] = useState(0);
  const [k, setK] = useState(0);
  const A = PRESETS[p].A;
  const { steps, singular } = gaussJordanSteps(A);
  const start = [
    [A[0][0], A[0][1], 1, 0],
    [A[1][0], A[1][1], 0, 1],
  ];
  const M = k === 0 ? start : steps[k - 1].M;
  const left: M2 = [
    [M[0][0], M[0][1]],
    [M[1][0], M[1][1]],
  ];
  const right = M.map((r) => r.slice(2));
  const done = k === steps.length;
  const aug = `\\left[\\begin{array}{cc|cc} ${M.map((r) => r.map(fr).join(" & ")).join(" \\\\ ")} \\end{array}\\right]`;
  const c1: V2 = [left[0][0], left[1][0]];
  const c2: V2 = [left[0][1], left[1][1]];
  return (
    <VizFrame
      title="Row reducing [A I] = multiplying by elementary matrices (Theorem 2.3)"
      hint="Step through the row reduction of [A I]. The shaded shape is spanned by the columns of the current left block; it ends as the unit square exactly when the left block reaches I."
      onReset={() => setK(0)}
      figure={
        <Plane2D x={[-2, 5]} y={[-1.5, 4]}>
          <Poly2 pts={[[0, 0], [1, 0], [1, 1], [0, 1]]} color="muted" closed dashed width={1} />
          <Poly2 pts={[[0, 0], c1, add(c1, c2), c2]} color={done && !singular ? "good" : "accent"} fill />
          <Arrow2 to={c1} color="accent" label="col 1" />
          <Arrow2 to={c2} color="eig" label="col 2" />
        </Plane2D>
      }
      controls={
        <>
          <Choice
            value={p}
            options={PRESETS.map((q, i) => ({ v: i, label: q.label }))}
            onChange={(v) => {
              setP(v);
              setK(0);
            }}
          />
          <div className="row" style={{ gap: 6 }}>
            <button className="btn small" onClick={() => setK(Math.max(0, k - 1))} disabled={k === 0}>
              ← Back
            </button>
            <button className="btn small" onClick={() => setK(Math.min(steps.length, k + 1))} disabled={done}>
              Next row operation →
            </button>
          </div>
        </>
      }
      readout={
        <>
          <Read label={`step ${k}/${steps.length}`} tex={`$${aug}$`} />
          {k > 0 && <Read tex={`$${steps[k - 1].label}$, i.e. multiply on the left by $E_${k} = ${texM(steps[k - 1].E)}$`} />}
          {k > 0 && <Read tex={`right block $= E_${k}\\cdots E_1 I$: it records the product of all elementary matrices so far.`} />}
          {done && !singular && <Read tone="good" tex={`Left block is $I$, so $A^{-1} = ${texM(right)}$ (and $E_${steps.length}\\cdots E_1A = I$).`} />}
          {done && singular && <Read tone="bad" tex="A zero row appeared in the left block: only one pivot, the shape is flattened onto a line, and $A$ is **not invertible**." />}
        </>
      }
      tasks={[
        "Predict the first row operation for $\\left[\\begin{smallmatrix}0&2\\\\1&1\\end{smallmatrix}\\right]$, then step to check.",
        "Watch the shaded shape: which step turns the parallelogram into a rectangle? Which one makes it the unit square?",
        "For the singular matrix, what does the shape look like after the first replacement? Why can no row operation fix that?",
        "At the last step, multiply the right block by $A$ in your head: do you get $I$?",
      ]}
    />
  );
}
