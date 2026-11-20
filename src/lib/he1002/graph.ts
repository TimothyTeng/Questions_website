import type { Graph } from "./types";

// Renders a Graph spec to an SVG string. Used on screen (with CSS-variable colours that follow the theme)
// and in the Word export (with fixed colours, rasterised to PNG).

export interface Palette {
  text: string;
  muted: string;
  axis: string;
  tones: [string, string, string, string];
  bg: string;
  /** Outline drawn behind labels so they stay readable where they cross a curve. */
  halo: string;
}

export const SCREEN: Palette = {
  text: "var(--text)",
  muted: "var(--muted)",
  axis: "var(--text)",
  tones: ["var(--accent)", "#d97706", "#059669", "var(--muted)"],
  bg: "transparent",
  halo: "var(--surface)",
};

export const PRINT: Palette = {
  text: "#1b1f2a",
  muted: "#5d6475",
  axis: "#1b1f2a",
  tones: ["#3346c9", "#c2410c", "#047857", "#8a90a0"],
  bg: "#ffffff",
  halo: "#ffffff",
};

type P = [number, number];

export function intersection(g: Graph, [a, b]: [string, string]): P | null {
  const A = g.lines.find((l) => l.label === a);
  const B = g.lines.find((l) => l.label === b);
  if (!A || !B) return null;
  for (let i = 0; i + 1 < A.pts.length; i++)
    for (let j = 0; j + 1 < B.pts.length; j++) {
      const [p, p2] = [A.pts[i], A.pts[i + 1]];
      const [q, q2] = [B.pts[j], B.pts[j + 1]];
      const r = [p2[0] - p[0], p2[1] - p[1]];
      const s = [q2[0] - q[0], q2[1] - q[1]];
      const den = r[0] * s[1] - r[1] * s[0];
      if (Math.abs(den) < 1e-12) continue;
      const t = ((q[0] - p[0]) * s[1] - (q[1] - p[1]) * s[0]) / den;
      const u = ((q[0] - p[0]) * r[1] - (q[1] - p[1]) * r[0]) / den;
      if (t >= -1e-9 && t <= 1 + 1e-9 && u >= -1e-9 && u <= 1 + 1e-9) return [p[0] + t * r[0], p[1] + t * r[1]];
    }
  return null;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Width/height of the drawing in px (viewBox units). */
export const GRAPH_W = 340;
export const GRAPH_H = 300;

export function graphSvg(g: Graph, pal: Palette, uid = "g"): string {
  const L = 52; // left margin (y-axis label + ticks)
  const B = 44; // bottom margin
  const T = 28; // top margin (title)
  const R = 58; // right margin (line labels)
  const w = GRAPH_W - L - R;
  const h = GRAPH_H - T - B;
  const X = (x: number) => L + (x / 10) * w;
  const Y = (y: number) => T + h - (y / 10) * h;
  const out: string[] = [];
  const font = `font-family="Segoe UI, Arial, sans-serif"`;
  const halo = `stroke="${pal.halo}" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"`;

  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRAPH_W} ${GRAPH_H}" width="${GRAPH_W}" height="${GRAPH_H}" ${font} font-size="12">`,
    `<defs><marker id="${uid}-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${pal.text}"/></marker>`,
    `<marker id="${uid}-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${pal.axis}"/></marker></defs>`,
  );
  if (pal.bg !== "transparent") out.push(`<rect width="100%" height="100%" fill="${pal.bg}"/>`);
  if (g.title) out.push(`<text x="${GRAPH_W / 2}" y="16" text-anchor="middle" font-weight="600" fill="${pal.text}">${esc(g.title)}</text>`);

  // Axes
  out.push(`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${T - 6}" stroke="${pal.axis}" stroke-width="1.5" marker-end="url(#${uid}-ax)"/>`);
  out.push(`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(10) + 10}" y2="${Y(0)}" stroke="${pal.axis}" stroke-width="1.5" marker-end="url(#${uid}-ax)"/>`);
  out.push(`<text x="${X(5)}" y="${GRAPH_H - 8}" text-anchor="middle" fill="${pal.text}">${esc(g.x)}</text>`);
  out.push(`<text transform="translate(14 ${Y(5)}) rotate(-90)" text-anchor="middle" fill="${pal.text}">${esc(g.y)}</text>`);

  // Points first resolved so guides sit under the curves.
  const pts = (g.points ?? [])
    .map((p) => ({ p, at: p.at ?? (p.on ? intersection(g, p.on) : null) }))
    .filter((x): x is { p: (typeof x)["p"]; at: P } => !!x.at);
  for (const { p, at } of pts) {
    if (p.xTick) {
      out.push(`<line x1="${X(at[0])}" y1="${Y(at[1])}" x2="${X(at[0])}" y2="${Y(0)}" stroke="${pal.muted}" stroke-dasharray="3 3"/>`);
      out.push(`<text x="${X(at[0])}" y="${Y(0) + 15}" text-anchor="middle" fill="${pal.text}">${esc(p.xTick)}</text>`);
    }
    if (p.yTick) {
      out.push(`<line x1="${X(0)}" y1="${Y(at[1])}" x2="${X(at[0])}" y2="${Y(at[1])}" stroke="${pal.muted}" stroke-dasharray="3 3"/>`);
      out.push(`<text x="${X(0) - 5}" y="${Y(at[1]) + 4}" text-anchor="end" fill="${pal.text}">${esc(p.yTick)}</text>`);
    }
  }

  // Lines with end labels; labels nudge apart if two would overlap.
  const placed: [number, number][] = [];
  for (const l of g.lines) {
    const col = pal.tones[l.tone ?? 0];
    const d = l.pts.map(([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ");
    out.push(`<path d="${d}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"${l.dashed ? ` stroke-dasharray="7 5"` : ""}/>`);
    // Label at whichever end is further right/up (the conventional spot).
    const a = l.pts[0];
    const z = l.pts[l.pts.length - 1];
    const end = z[0] > a[0] + 0.01 || (Math.abs(z[0] - a[0]) <= 0.01 && z[1] > a[1]) ? z : a;
    let lx = X(end[0]) + 5;
    let ly = Y(end[1]) + 4;
    // A line that reaches the top: label to the right of its top end, below the title.
    if (end[1] >= 9.3) {
      lx = X(end[0]) + 5;
      ly = Y(end[1]) + 10;
    }
    // Keep labels inside the drawing.
    lx = Math.min(lx, GRAPH_W - 6 * l.label.length - 2);
    while (placed.some(([px, py]) => Math.abs(px - lx) < 30 && Math.abs(py - ly) < 13)) ly += 13;
    placed.push([lx, ly]);
    out.push(`<text x="${lx}" y="${ly}" fill="${col}" font-weight="700" ${halo}>${esc(l.label)}</text>`);
  }

  for (const a of g.arrows ?? [])
    out.push(
      `<line x1="${X(a.from[0])}" y1="${Y(a.from[1])}" x2="${X(a.to[0])}" y2="${Y(a.to[1])}" stroke="${pal.text}" stroke-width="1.6" marker-end="url(#${uid}-ah)"/>`,
    );

  for (const { p, at } of pts) {
    out.push(`<circle cx="${X(at[0])}" cy="${Y(at[1])}" r="4" fill="${pal.text}"/>`);
    if (p.label) {
      // Long labels that would run off the right edge go to the left of the dot instead.
      const wide = 6.2 * p.label.length;
      const right = X(at[0]) + 7 + wide < GRAPH_W - 2;
      out.push(
        `<text x="${right ? X(at[0]) + 7 : X(at[0]) - 7}" y="${Y(at[1]) - 7}" text-anchor="${right ? "start" : "end"}" fill="${pal.text}" font-weight="700" ${halo}>${esc(p.label)}</text>`,
      );
    }
  }

  out.push(`</svg>`);
  return out.join("");
}

/** Browser only: rasterise a graph to a PNG (base64, no prefix) for the Word export. */
export async function graphPng(g: Graph, scale = 2): Promise<string> {
  const svg = graphSvg(g, PRINT, "p");
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("diagram render failed"));
      img.src = url;
    });
    const c = document.createElement("canvas");
    c.width = GRAPH_W * scale;
    c.height = GRAPH_H * scale;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/png").split(",")[1];
  } finally {
    URL.revokeObjectURL(url);
  }
}
