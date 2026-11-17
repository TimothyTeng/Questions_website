"use client";

import { useMemo, type ReactNode } from "react";
import { netOf, type Val } from "@/lib/sc1005/logic";
import type { CircuitSpec, GateSpec } from "@/lib/sc1005/types";
import { layoutCircuit, type LNode } from "./circuitLayout";

// Draws a CircuitSpec as a schematic with standard (ANSI) gate symbols. With `values`, wires are coloured by
// logic level (1 = green, 0 = grey, unknown = amber, z = dashed) and gate outputs show their value.

const STROKE = "var(--text)";

export function valColor(v: Val | undefined): string {
  if (v === 1) return "var(--good)";
  if (v === 0) return "var(--muted)";
  if (v === "z") return "var(--accent)";
  if (v === null) return "var(--warn)";
  return STROKE;
}

export function CircuitSvg({
  circuit,
  values,
  onToggleInput,
  highlight,
  maxWidth,
}: {
  circuit: CircuitSpec;
  /** Net values to colour wires (from evalCircuit). */
  values?: Record<string, Val>;
  /** Makes input labels clickable. */
  onToggleInput?: (name: string) => void;
  /** Gate ids to emphasise. */
  highlight?: string[];
  maxWidth?: number;
}) {
  const L = useMemo(() => layoutCircuit(circuit), [circuit]);
  const live = !!values;
  const col = (net: string) => (live ? valColor(values![net]) : STROKE);
  const dash = (net: string) => (live && values![net] === "z" ? "4 3" : undefined);
  const width = live ? (values ? 2.2 : 1.6) : 1.6;

  return (
    <svg
      viewBox={`${live ? -28 : 0} 0 ${L.width + (live ? 58 : 0)} ${L.height}`}
      className="cir-svg"
      width={Math.round((L.width + (live ? 58 : 0)) * 1.15)}
      style={{ maxWidth: maxWidth ?? "100%" }}
      role="img"
      aria-label="Logic circuit diagram"
    >
      {L.wires.map((w, i) => (
        <polyline key={i} points={w.pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={col(w.net)} strokeWidth={width} strokeDasharray={dash(w.net)} strokeLinejoin="round" />
      ))}
      {L.dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2.8} fill={col(d.net)} />
      ))}
      {L.tags.map((t) => (
        <text key={t.text} x={t.x} y={t.y} className="cir-label cir-tag">
          {t.text}
          {live && <tspan fill={valColor(values![t.net])}>{`=${values![t.net] === null ? "?" : values![t.net]}`}</tspan>}
        </text>
      ))}
      {L.nodes.map((n) => {
        if (n.kind === "in") {
          const v = values?.[n.name];
          return (
            <g key={n.key} className={onToggleInput ? "cir-input live" : "cir-input"} onClick={onToggleInput ? () => onToggleInput(n.name) : undefined}>
              <text x={n.x - 6} y={n.y + 4} textAnchor="end" className="cir-label">
                {n.name}
              </text>
              {live && (
                <g>
                  <rect x={n.x - 12 - n.name.length * 7.5 - 18} y={n.y - 9} width={18} height={18} rx={4} fill={v === 1 ? "var(--good)" : "var(--surface)"} stroke={valColor(v)} strokeWidth={1.5} />
                  <text x={n.x - 12 - n.name.length * 7.5 - 9} y={n.y + 4} textAnchor="middle" className="cir-bit" fill={v === 1 ? "var(--surface)" : "var(--text)"}>
                    {v === null ? "?" : String(v)}
                  </text>
                </g>
              )}
              <circle cx={n.x} cy={n.y} r={2.5} fill={col(n.name)} />
            </g>
          );
        }
        if (n.kind === "out") {
          const v = values?.[n.name];
          return (
            <g key={n.key}>
              <text x={n.x + 6} y={n.pins[0].y + 4} className="cir-label">
                {n.name}
                {live && <tspan fill={valColor(v)}>{` = ${v === null ? "?" : v === undefined ? "" : v}`}</tspan>}
              </text>
            </g>
          );
        }
        if (n.kind === "dummy") return null;
        return <GateShape key={n.key} n={n} values={values} hl={highlight?.includes(n.name)} showNet={circuit.showNets} />;
      })}
    </svg>
  );
}

/** Gate symbol at the node's position; draws input stubs and bubbles to the pins. */
function GateShape({ n, values, hl, showNet }: { n: LNode; values?: Record<string, Val>; hl?: boolean; showNet?: boolean }) {
  const g = n.gate!;
  const { w, h } = n;
  const live = !!values;
  const stroke = hl ? "var(--accent)" : STROKE;
  const sw = hl ? 2.4 : 1.6;
  const fill = hl ? "var(--accent-soft)" : "var(--surface)";
  const parts: ReactNode[] = [];
  const bubbleOut = g.type === "NAND" || g.type === "NOR" || g.type === "XNOR" || g.type === "NOT";
  const bodyW = bubbleOut ? w - 8 : w;
  const pinStroke = (ref: string) => (live ? valColor(pinVal(ref, values!)) : STROKE);

  // Where each input line meets the body: OR-type gates have a curved back (for XOR, the extra curve).
  const curved = g.type === "OR" || g.type === "NOR" || g.type === "XOR" || g.type === "XNOR";
  const backX = (py: number) => {
    if (!curved) return 0;
    const t = Math.min(1, Math.max(0, py / h));
    const bw = bodyW - (g.type === "XOR" || g.type === "XNOR" ? 6 : 0);
    return 2 * t * (1 - t) * 0.32 * bw;
  };

  switch (g.type) {
    case "AND":
    case "NAND":
      parts.push(<path key="b" d={`M0,0 H${bodyW * 0.45} A${bodyW * 0.55},${h / 2} 0 0 1 ${bodyW * 0.45},${h} H0 Z`} fill={fill} stroke={stroke} strokeWidth={sw} />);
      break;
    case "OR":
    case "NOR":
    case "XOR":
    case "XNOR": {
      const x0 = g.type === "XOR" || g.type === "XNOR" ? 6 : 0;
      const bw = bodyW - x0;
      parts.push(
        <path key="b" d={`M${x0},0 Q${x0 + bw * 0.55},0 ${x0 + bw},${h / 2} Q${x0 + bw * 0.55},${h} ${x0},${h} Q${x0 + bw * 0.32},${h / 2} ${x0},0 Z`} fill={fill} stroke={stroke} strokeWidth={sw} />,
      );
      if (x0) parts.push(<path key="x" d={`M0,0 Q${bw * 0.32},${h / 2} 0,${h}`} fill="none" stroke={stroke} strokeWidth={sw} />);
      break;
    }
    case "NOT":
    case "BUF":
    case "TBUF":
      parts.push(<path key="b" d={`M2,1 L${bodyW},${h / 2} L2,${h - 1} Z`} fill={fill} stroke={stroke} strokeWidth={sw} />);
      if (g.type === "TBUF") parts.push(<line key="en" x1={bodyW / 2} y1={h * 0.75} x2={bodyW / 2} y2={h} stroke={stroke} strokeWidth={sw} />);
      break;
    case "MUX2":
      parts.push(<path key="b" d={`M0,0 L${w},10 L${w},${h - 10} L0,${h} Z`} fill={fill} stroke={stroke} strokeWidth={sw} />);
      parts.push(
        <text key="l0" x={5} y={20} className="cir-pin">
          0
        </text>,
        <text key="l1" x={5} y={38} className="cir-pin">
          1
        </text>,
        <text key="ls" x={5} y={h - 3} className="cir-pin">
          S
        </text>,
      );
      break;
    default: {
      // Flip-flops and latches.
      parts.push(<rect key="b" x={0} y={0} width={w} height={h} rx={3} fill={fill} stroke={stroke} strokeWidth={sw} />);
      const ins = g.type === "JKFF" ? ["J", "K", ""] : g.type === "TFF" ? ["T", ""] : g.type === "DLATCH" ? ["D", "EN"] : ["D", ""];
      const pys = g.type === "JKFF" ? [16, 54, 35] : [18, h - 16];
      ins.forEach((t, k) => {
        if (t)
          parts.push(
            <text key={`p${k}`} x={5} y={pys[k] + 4} className="cir-pin">
              {t}
            </text>,
          );
      });
      if (g.type !== "DLATCH") {
        const cy = g.type === "JKFF" ? 35 : h - 16;
        parts.push(<path key="clk" d={`M0,${cy - 6} L8,${cy} L0,${cy + 6}`} fill="none" stroke={stroke} strokeWidth={1.4} />);
      }
      const oys = g.type === "JKFF" ? [16, 54] : [18, h - 16];
      parts.push(
        <text key="q" x={w - 5} y={oys[0] + 4} textAnchor="end" className="cir-pin">
          Q
        </text>,
        <text key="qn" x={w - 5} y={oys[1] + 4} textAnchor="end" className="cir-pin">
          Q&apos;
        </text>,
      );
    }
  }
  if (bubbleOut) parts.push(<circle key="ob" cx={w - 4} cy={h / 2} r={4} fill={fill} stroke={stroke} strokeWidth={sw} />);

  // Input stubs + bubbles.
  const stubs = g.in.map((ref, k) => {
    const p = n.pins[k];
    if (!p) return null;
    const ly = p.y - n.y;
    const isClkBottom = g.type === "TBUF" && k === 1;
    if (isClkBottom) return null;
    const bx = backX(ly);
    const inv = ref.startsWith("!");
    return (
      <g key={`s${k}`}>
        <line x1={0} y1={ly} x2={inv ? bx - 7 : bx} y2={ly} stroke={pinStroke(ref)} strokeWidth={1.6} />
        {inv && <circle cx={bx - 3.5} cy={ly} r={3.5} fill="var(--surface)" stroke={stroke} strokeWidth={1.4} />}
      </g>
    );
  });
  // A TBUF's enable comes in from the left at the bottom and turns up into the body.
  if (g.type === "TBUF") {
    const ly = n.pins[1].y - n.y;
    stubs.push(<polyline key="en" points={`0,${ly} ${bodyW / 2},${ly}`} fill="none" stroke={pinStroke(g.in[1])} strokeWidth={1.6} />);
  }

  const outV = values?.[g.id];
  return (
    <g transform={`translate(${n.x},${n.y})`}>
      {stubs}
      {parts}
      {g.label && (
        <text x={w / 2} y={-4} textAnchor="middle" className="cir-pin">
          {g.label}
        </text>
      )}
      {showNet && !g.label && (
        <text x={w + 3} y={n.outs[0].y - n.y - 5} className="cir-pin muted-fill">
          {g.id}
        </text>
      )}
      {live && (outV === 0 || outV === 1) && !isSeqType(g) && (
        <text x={w + 3} y={h / 2 + 13} className="cir-pin" fill={valColor(outV)}>
          {outV}
        </text>
      )}
    </g>
  );
}

const isSeqType = (g: GateSpec) => ["DFF", "TFF", "JKFF", "DLATCH"].includes(g.type);

/** The value on the wire into a pin (an input bubble inverts inside the gate, so it is not applied here). */
function pinVal(ref: string, values: Record<string, Val>): Val {
  const { net, qn } = netOf(ref);
  return values[qn ? `${net}.qn` : net] ?? null;
}
