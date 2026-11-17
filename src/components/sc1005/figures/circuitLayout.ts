// Auto-layout for gate-level schematics: a layered (Sugiyama-style) layout where every wire runs between
// adjacent columns through a vertical "track" in the gap, long wires pass through columns on reserved
// rows, and feedback wires (flip-flop loops, cross-coupled latches) are routed around the bottom.

import { isSequential, netOf } from "@/lib/sc1005/logic";
import type { CircuitSpec, GateSpec } from "@/lib/sc1005/types";

export interface Pt {
  x: number;
  y: number;
}

export interface LNode {
  key: string;
  kind: "in" | "gate" | "dummy" | "out";
  /** Net name for in/out/dummy; gate id for gates. */
  name: string;
  gate?: GateSpec;
  col: number;
  order: number;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Input pin positions (absolute), filled after placement. */
  pins: Pt[];
  /** Output points: [Q] or [Q, Q'] for flip-flops. */
  outs: Pt[];
}

export interface Wire {
  net: string;
  /** Polyline points. */
  pts: Pt[];
}

export interface Layout {
  nodes: LNode[];
  wires: Wire[];
  dots: (Pt & { net: string })[];
  width: number;
  height: number;
  outputs: string[];
  /** Output names drawn as tags at a gate's output (outputs that also feed other gates, away from the last column). */
  tags: (Pt & { text: string; net: string })[];
}

const GATE_W = 46;
const SEQ_W = 58;
const PIN_GAP = 16;
const ROW_GAP = 22;
const TRACK = 9;
const TOP = 18;

function gateSize(g: GateSpec): { w: number; h: number } {
  if (isSequential(g)) return { w: SEQ_W, h: g.type === "JKFF" ? 70 : 62 };
  if (g.type === "MUX2") return { w: 38, h: 58 };
  if (g.type === "NOT" || g.type === "BUF" || g.type === "TBUF") return { w: 40, h: 30 };
  return { w: GATE_W, h: Math.max(32, g.in.length * PIN_GAP + 8) };
}

/** Relative input pin y offsets (0 = top of the node). */
function pinYs(g: GateSpec, h: number): number[] {
  if (isSequential(g)) {
    if (g.type === "JKFF") return [16, 54, 35];
    return [18, h - 16];
  }
  if (g.type === "MUX2") return [16, 34, h - 6];
  if (g.type === "TBUF") return [h / 2, h - 2];
  const n = g.in.length;
  return g.in.map((_, i) => (h * (i + 1)) / (n + 1));
}

function outYs(g: GateSpec, h: number): number[] {
  if (isSequential(g)) return g.type === "JKFF" ? [16, 54] : [18, h - 16];
  return [h / 2];
}

export function layoutCircuit(c: CircuitSpec): Layout {
  const gates = c.gates;
  const byId = new Map(gates.map((g) => [g.id, g]));
  const readSet = new Set(gates.flatMap((g) => g.in.map((r) => netOf(r).net)));
  const outputs = c.outputs ?? gates.filter((g) => !readSet.has(g.id)).map((g) => g.id);

  // ---- columns (longest path), breaking cycles at flip-flops/latches first, then any gate
  const col = new Map<string, number>();
  c.inputs.forEach((i) => col.set(i, 0));
  const back = new Set<string>(); // "gateId#pin"
  const pending = new Set(gates.map((g) => g.id));
  const srcCol = (r: string) => col.get(netOf(r).net);
  while (pending.size) {
    let progressed = false;
    for (const g of gates) {
      if (!pending.has(g.id)) continue;
      const ready = g.in.every((r, k) => back.has(`${g.id}#${k}`) || srcCol(r) !== undefined || !byId.has(netOf(r).net) && !c.inputs.includes(netOf(r).net));
      if (!ready) continue;
      const cs = g.in.flatMap((r, k) => (back.has(`${g.id}#${k}`) ? [] : [srcCol(r) ?? 0]));
      col.set(g.id, Math.max(g.col ?? 0, 1 + Math.max(0, ...cs)));
      pending.delete(g.id);
      progressed = true;
    }
    if (progressed) continue;
    const stuck = gates.filter((g) => pending.has(g.id));
    const victim = stuck.find(isSequential) ?? stuck[0];
    victim.in.forEach((r, k) => {
      if (srcCol(r) === undefined) back.add(`${victim.id}#${k}`);
    });
  }
  // Forward edges that point to an earlier or same column are also feedback.
  for (const g of gates)
    g.in.forEach((r, k) => {
      const s = srcCol(r);
      if (s !== undefined && s >= col.get(g.id)!) back.add(`${g.id}#${k}`);
    });
  const maxGateCol = Math.max(1, ...gates.map((g) => col.get(g.id)!));
  const outCol = maxGateCol + 1;

  // ---- nodes
  const nodes: LNode[] = [];
  const node = new Map<string, LNode>();
  const add = (n: Omit<LNode, "order" | "x" | "y" | "pins" | "outs">) => {
    const full: LNode = { ...n, order: nodes.length, x: 0, y: 0, pins: [], outs: [] };
    nodes.push(full);
    node.set(full.key, full);
    return full;
  };
  c.inputs.forEach((i) => add({ key: `in:${i}`, kind: "in", name: i, col: 0, w: 0, h: 0 }));
  gates.forEach((g) => {
    const { w, h } = gateSize(g);
    add({ key: `g:${g.id}`, kind: "gate", name: g.id, gate: g, col: col.get(g.id)!, w, h });
  });
  // An output that also feeds other gates and is not in the last column is labelled in place instead of
  // being wired all the way to the right edge.
  const tagged = outputs.filter((o) => byId.has(o) && readSet.has(o) && col.get(o)! < maxGateCol);
  const railed = outputs.filter((o) => !tagged.includes(o));
  railed.forEach((o) => add({ key: `out:${o}`, kind: "out", name: o, col: outCol, w: 0, h: 0 }));

  // ---- logical edges: source node + port → sink node + pin
  interface Edge {
    net: string;
    src: LNode;
    port: number;
    dst: LNode;
    pin: number;
    back: boolean;
  }
  const edges: Edge[] = [];
  const srcNode = (net: string) => node.get(`g:${net}`) ?? node.get(`in:${net}`);
  gates.forEach((g) =>
    g.in.forEach((r, k) => {
      const { net, qn } = netOf(r);
      const s = srcNode(net);
      if (!s) return;
      edges.push({ net: qn ? `${net}.qn` : net, src: s, port: qn ? 1 : 0, dst: node.get(`g:${g.id}`)!, pin: k, back: back.has(`${g.id}#${k}`) });
    }),
  );
  railed.forEach((o) => {
    const s = srcNode(o);
    if (s) edges.push({ net: o, src: s, port: 0, dst: node.get(`out:${o}`)!, pin: 0, back: false });
  });

  // ---- dummies for forward edges spanning more than one column (one chain per net)
  interface Seg {
    net: string;
    src: LNode;
    port: number;
    dst: LNode;
    pin: number;
  }
  const segs: Seg[] = [];
  const chain = new Map<string, LNode[]>(); // net → dummies by column
  for (const e of edges.filter((e) => !e.back)) {
    let from = e.src;
    let port = e.port;
    for (let k = e.src.col + 1; k < e.dst.col; k++) {
      const key = `d:${e.net}:${k}`;
      let d = node.get(key);
      if (!d) {
        d = add({ key, kind: "dummy", name: e.net, col: k, w: 0, h: 0 });
        segs.push({ net: e.net, src: from, port, dst: d, pin: 0 });
        chain.set(e.net, [...(chain.get(e.net) ?? []), d]);
      }
      from = d;
      port = 0;
    }
    segs.push({ net: e.net, src: from, port, dst: e.dst, pin: e.pin });
  }
  const backEdges = edges.filter((e) => e.back);

  // ---- ordering within columns: barycentre sweeps
  const ncols = outCol + 1;
  const cols: LNode[][] = Array.from({ length: ncols }, () => []);
  nodes.forEach((n) => cols[n.col].push(n));
  const preds = new Map<LNode, LNode[]>();
  segs.forEach((s) => preds.set(s.dst, [...(preds.get(s.dst) ?? []), s.src]));
  const idx = new Map<LNode, number>();
  const reindex = () => cols.forEach((cs) => cs.forEach((n, i) => idx.set(n, i)));
  cols.forEach((cs) => cs.sort((a, b) => a.order - b.order));
  reindex();
  for (let sweep = 0; sweep < 4; sweep++) {
    for (let k = 1; k < ncols; k++) {
      const bary = (n: LNode) => {
        const ps = preds.get(n);
        if (!ps?.length) return idx.get(n)!;
        return ps.reduce((s, p) => s + idx.get(p)! / Math.max(1, cols[p.col].length), 0) / ps.length;
      };
      // Keep outputs in declared order and flip-flops roughly where the author put them.
      cols[k].sort((a, b) => (a.kind === "out" && b.kind === "out" ? a.order - b.order : bary(a) - bary(b) || a.order - b.order));
      reindex();
    }
  }

  // ---- vertical placement: each node is pulled so its input pins line up with the outputs feeding them
  // (straight wires), then pushed down just enough to keep the column's order without overlaps.
  const extent = (n: LNode) => (n.kind === "gate" ? n.h : 0);
  const outOff = (n: LNode, port: number) => (n.kind === "gate" ? outYs(n.gate!, n.h)[port] ?? n.h / 2 : 0);
  const inOff = (n: LNode, pin: number) => (n.kind === "gate" ? pinYs(n.gate!, n.h)[pin] ?? n.h / 2 : 0);
  cols[0].forEach((n, i) => (n.y = TOP + i * 34));
  for (let k = 1; k < ncols; k++) {
    // Flip-flops line up on their D (first) input; other gates on the average of their inputs.
    const want = new Map<LNode, number>();
    for (const n of cols[k]) {
      let ps = segs.filter((s) => s.dst === n);
      if (n.gate && isSequential(n.gate) && ps.some((s) => s.pin === 0)) ps = ps.filter((s) => s.pin === 0);
      want.set(n, ps.length ? ps.reduce((a, s) => a + s.src.y + outOff(s.src, s.port) - inOff(n, s.pin), 0) / ps.length : TOP);
    }
    if (k < outCol) cols[k].sort((a, b) => want.get(a)! - want.get(b)! || (a.kind === "gate" ? 0 : 1) - (b.kind === "gate" ? 0 : 1) || a.order - b.order);
    let floor = TOP;
    for (const n of cols[k]) {
      n.y = Math.max(floor, want.get(n)!);
      floor = n.y + extent(n) + (n.kind === "gate" ? ROW_GAP : 14);
    }
  }
  const centre = (n: LNode) => n.y + extent(n) / 2;

  // ---- tracks per gap: one per (net, gap) for forward segments, plus feedback tracks
  const gapTracks: string[][] = Array.from({ length: ncols }, () => []);
  const trackOf = (gap: number, key: string) => {
    if (!gapTracks[gap].includes(key)) gapTracks[gap].push(key);
  };
  for (const s of segs) trackOf(s.src.col, `f:${s.net}:${s.port}`);
  backEdges.forEach((e, i) => {
    trackOf(e.src.col, `bs:${e.net}`);
    trackOf(e.dst.col - 1, `bd:${i}`);
  });

  // ---- x positions
  const colW = cols.map((cs) => Math.max(0, ...cs.map((n) => n.w)));
  const xs: number[] = [];
  const LEFT = 16 + 7.5 * Math.max(1, ...c.inputs.map((i) => i.length));
  let x = LEFT;
  for (let k = 0; k < ncols; k++) {
    xs.push(x);
    x += colW[k] + 26 + gapTracks[k].length * TRACK;
  }
  // Sort tracks in each gap by the y of their source so spines cross less.
  const srcY = (key: string) => {
    if (key.startsWith("bd:")) return 1e6 + Number(key.slice(3));
    const net = key.split(":")[1];
    const n = srcNode(netOf(net).net);
    return n ? centre(n) : 0;
  };
  gapTracks.forEach((ts) => ts.sort((a, b) => srcY(a) - srcY(b)));
  const trackX = (gap: number, key: string) => xs[gap] + colW[gap] + 14 + gapTracks[gap].indexOf(key) * TRACK;

  // ---- pins
  for (const n of nodes) {
    n.x = xs[n.col] + (colW[n.col] - n.w) / 2;
    if (n.kind === "gate") {
      const g = n.gate!;
      n.pins = pinYs(g, n.h).map((py) => ({ x: n.x, y: n.y + py }));
      n.outs = outYs(g, n.h).map((oy) => ({ x: n.x + n.w, y: n.y + oy }));
    } else if (n.kind === "in") {
      n.outs = [{ x: n.x, y: n.y }];
    } else if (n.kind === "dummy") {
      n.pins = [{ x: xs[n.col], y: n.y }];
      n.outs = [{ x: xs[n.col] + colW[n.col], y: n.y }];
    } else {
      n.pins = [{ x: n.x, y: n.y }];
    }
  }
  // Put each output label at the height of the wire feeding it when there is room.
  // (Outputs only have one source; aligning removes a jog.)
  const outsSorted = cols[outCol];
  let floor = TOP;
  for (const o of outsSorted) {
    const s = segs.find((sg) => sg.dst === o)!;
    const want = s.src.outs[s.port]?.y ?? o.pins[0].y;
    const y = Math.max(floor, want);
    o.pins[0].y = y;
    o.y = y;
    floor = y + 24;
  }

  // ---- wires
  const wires: Wire[] = [];
  const dots: (Pt & { net: string })[] = [];
  const groups = new Map<string, Seg[]>();
  for (const s of segs) {
    const key = `${s.net}:${s.port}:${s.src.key}`;
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  for (const ss of groups.values()) {
    const s0 = ss[0];
    const from = s0.src.outs[s0.port];
    if (!from) continue;
    const gap = s0.src.col;
    const ends = ss.map((s) => s.dst.pins[s.pin]).filter(Boolean);
    const straight = ends.length === 1 && Math.abs(ends[0].y - from.y) < 0.5;
    if (s0.src.kind === "dummy") wires.push({ net: s0.net, pts: [s0.src.pins[0], from] });
    if (straight) {
      wires.push({ net: s0.net, pts: [from, ends[0]] });
      continue;
    }
    const tx = trackX(gap, `f:${s0.net}:${s0.port}`);
    const ys = [from.y, ...ends.map((p) => p.y)];
    const lo = Math.min(...ys);
    const hi = Math.max(...ys);
    wires.push({ net: s0.net, pts: [from, { x: tx, y: from.y }] });
    wires.push({ net: s0.net, pts: [{ x: tx, y: lo }, { x: tx, y: hi }] });
    for (const p of ends) wires.push({ net: s0.net, pts: [{ x: tx, y: p.y }, p] });
    const taps = [from.y, ...ends.map((p) => p.y)];
    for (const y of new Set(taps)) {
      const count = taps.filter((t) => t === y).length;
      if ((y > lo && y < hi) || count > 1) dots.push({ x: tx, y, net: s0.net });
    }
  }
  // Inputs fanning out from column 0 get a dot where they leave the label if they branch.
  const bottom = Math.max(TOP, ...nodes.map((n) => n.y + n.h), ...dots.map((d) => d.y)) + 18;
  backEdges.forEach((e, i) => {
    const from = e.src.outs[e.port];
    const to = e.dst.pins[e.pin];
    const laneY = bottom + i * TRACK;
    const t1 = trackX(e.src.col, `bs:${e.net}`);
    const t2 = trackX(e.dst.col - 1, `bd:${i}`);
    wires.push({ net: e.net, pts: [from, { x: t1, y: from.y }, { x: t1, y: laneY }, { x: t2, y: laneY }, { x: t2, y: to.y }, to] });
  });
  // Dots where a feedback wire leaves a net that also goes forward.
  backEdges.forEach((e) => {
    const from = e.src.outs[e.port];
    const fwd = `f:${e.net}:${e.port}`;
    if (!gapTracks[e.src.col].includes(fwd)) return;
    dots.push({ x: Math.min(trackX(e.src.col, `bs:${e.net}`), trackX(e.src.col, fwd)), y: from.y, net: e.net });
  });

  const height = Math.max(bottom + backEdges.length * TRACK + 6, ...nodes.map((n) => n.y + n.h + TOP));
  const width = xs[outCol] + 22 + 7.5 * Math.max(1, ...railed.map((o) => o.length));
  const tags = tagged.map((o) => {
    const p = node.get(`g:${o}`)!.outs[0];
    return { x: p.x + 3, y: p.y - 4, text: o, net: o };
  });
  return { nodes, wires, dots, width, height, outputs, tags };
}
