import { evalAt } from "./expr";
import type { Figure, Plot, Tone, Venn } from "./types";

// Renders a Figure (function plot or Venn diagram) to an SVG string. Used on screen (CSS-variable colours that follow the
// theme) and in the Word export (fixed colours, rasterised to PNG).

export interface Palette {
  text: string;
  muted: string;
  grid: string;
  tones: [string, string, string, string];
  bg: string;
  /** Outline behind labels so they stay readable where they cross a curve. */
  halo: string;
}

export const SCREEN: Palette = {
  text: "var(--text)",
  muted: "var(--muted)",
  grid: "var(--border)",
  tones: ["var(--accent)", "#d97706", "#059669", "var(--muted)"],
  bg: "transparent",
  halo: "var(--surface)",
};

export const PRINT: Palette = {
  text: "#1b1f2a",
  muted: "#5d6475",
  grid: "#e3e6ee",
  tones: ["#3346c9", "#c2410c", "#047857", "#8a90a0"],
  bg: "#ffffff",
  halo: "#ffffff",
};

export const FIG_W = 360;
export const FIG_H = 300;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Captions/labels may carry light $…$ markup; figures draw plain text. */
export const plain = (s: string) =>
  s
    .replace(/\$+/g, "")
    .replace(/\\(?:left|right|,|;|!|quad)/g, "")
    .replace(/\\cdot/g, "·")
    .replace(/\\times/g, "×")
    .replace(/\\infty/g, "∞")
    .replace(/\\(le|leq)\b/g, "≤")
    .replace(/\\(ge|geq)\b/g, "≥")
    .replace(/\\pi/g, "π")
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "($1)/($2)")
    .replace(/\\sqrt\{([^}]*)\}/g, "√($1)")
    .replace(/\\(ln|log|exp)\b/g, "$1")
    .replace(/\^\{([^}]*)\}/g, "^$1")
    .replace(/_\{([^}]*)\}/g, "$1")
    .replace(/[{}]/g, "");

/** A "nice" tick step giving about `n` ticks over the range. */
function step(range: number, n = 6): number {
  const raw = range / n;
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p;
}

const fmt = (v: number) => {
  const r = Math.round(v * 1e6) / 1e6;
  if (Math.abs(r) >= 10000) return `${Math.round(r / 1000)}k`;
  return String(r);
};

export function figureSvg(f: Figure, pal: Palette, uid = "f"): string {
  return f.kind === "venn" ? vennSvg(f, pal, uid) : plotSvg(f, pal, uid);
}

function plotSvg(g: Plot, pal: Palette, uid: string): string {
  const L = 44;
  const R = 16;
  const T = g.title ? 30 : 16;
  const B = 34;
  const w = FIG_W - L - R;
  const h = FIG_H - T - B;
  const [x0, x1] = g.xr;
  const [y0, y1] = g.numberLine ? [-1, 1] : g.yr;
  const X = (x: number) => L + ((x - x0) / (x1 - x0)) * w;
  const Y = (y: number) => T + h - ((y - y0) / (y1 - y0)) * h;
  const font = `font-family="Segoe UI, Arial, sans-serif"`;
  const halo = `stroke="${pal.halo}" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"`;
  const tone = (t?: Tone) => pal.tones[t ?? 0];
  const out: string[] = [];

  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${FIG_W} ${FIG_H}" width="${FIG_W}" height="${FIG_H}" ${font} font-size="12">`,
    `<defs><clipPath id="${uid}-clip"><rect x="${L}" y="${T}" width="${w}" height="${h}"/></clipPath>`,
    `<marker id="${uid}-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${pal.text}"/></marker></defs>`,
  );
  if (pal.bg !== "transparent") out.push(`<rect width="100%" height="100%" fill="${pal.bg}"/>`);
  if (g.title) out.push(`<text x="${FIG_W / 2}" y="18" text-anchor="middle" font-weight="600" fill="${pal.text}">${esc(plain(g.title))}</text>`);

  // Grid + ticks
  const sx = step(x1 - x0, g.numberLine ? 10 : 6);
  const sy = step(y1 - y0);
  const axisY = g.numberLine ? Y(0) : y0 <= 0 && 0 <= y1 ? Y(0) : Y(y0);
  const axisX = x0 <= 0 && 0 <= x1 ? X(0) : X(x0);
  for (let v = Math.ceil(x0 / sx) * sx; v <= x1 + 1e-9; v += sx) {
    if (!g.numberLine) out.push(`<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${T + h}" stroke="${pal.grid}" stroke-width="1"/>`);
    out.push(`<line x1="${X(v)}" y1="${axisY - 3}" x2="${X(v)}" y2="${axisY + 3}" stroke="${pal.text}"/>`);
    if (Math.abs(v) > 1e-9 || g.numberLine || axisX !== X(0))
      out.push(`<text x="${X(v)}" y="${axisY + 15}" text-anchor="middle" font-size="10.5" fill="${pal.muted}">${fmt(v)}</text>`);
  }
  if (!g.numberLine)
    for (let v = Math.ceil(y0 / sy) * sy; v <= y1 + 1e-9; v += sy) {
      out.push(`<line x1="${L}" y1="${Y(v)}" x2="${L + w}" y2="${Y(v)}" stroke="${pal.grid}" stroke-width="1"/>`);
      if (Math.abs(v) > 1e-9 || axisY !== Y(0)) out.push(`<text x="${axisX - 5}" y="${Y(v) + 3.5}" text-anchor="end" font-size="10.5" fill="${pal.muted}">${fmt(v)}</text>`);
    }
  if (!g.numberLine && x0 <= 0 && 0 <= x1 && y0 <= 0 && 0 <= y1) out.push(`<text x="${X(0) - 5}" y="${Y(0) + 14}" text-anchor="end" font-size="10.5" fill="${pal.muted}">0</text>`);

  // Axes
  out.push(`<line x1="${L}" y1="${axisY}" x2="${L + w}" y2="${axisY}" stroke="${pal.text}" stroke-width="1.4"/>`);
  if (!g.numberLine) out.push(`<line x1="${axisX}" y1="${T}" x2="${axisX}" y2="${T + h}" stroke="${pal.text}" stroke-width="1.4"/>`);
  out.push(`<text x="${L + w}" y="${Math.min(FIG_H - 4, axisY + 28)}" text-anchor="end" font-style="italic" fill="${pal.text}">${esc(plain(g.x ?? "x"))}</text>`);
  if (!g.numberLine) out.push(`<text x="${axisX + 6}" y="${T + 11}" font-style="italic" fill="${pal.text}" ${halo}>${esc(plain(g.y ?? "y"))}</text>`);

  out.push(`<g clip-path="url(#${uid}-clip)">`);
  // Shaded areas under/between curves
  for (const s of g.shade ?? []) {
    const n = 120;
    const top: string[] = [];
    const bot: string[] = [];
    for (let k = 0; k <= n; k++) {
      const x = s.from + ((s.to - s.from) * k) / n;
      const a = evalAt(s.f, x);
      const b = evalAt(s.g ?? "0", x);
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      const cl = (y: number) => Math.max(y0 - (y1 - y0), Math.min(y1 + (y1 - y0), y));
      top.push(`${X(x).toFixed(1)},${Y(cl(a)).toFixed(1)}`);
      bot.unshift(`${X(x).toFixed(1)},${Y(cl(b)).toFixed(1)}`);
    }
    if (top.length > 1) out.push(`<polygon points="${[...top, ...bot].join(" ")}" fill="${tone(s.tone)}" fill-opacity="0.22" stroke="none"/>`);
  }

  // Guides under curves
  for (const p of g.points ?? [])
    if (p.guides && !g.numberLine) {
      out.push(`<line x1="${X(p.at[0])}" y1="${Y(p.at[1])}" x2="${X(p.at[0])}" y2="${axisY}" stroke="${pal.muted}" stroke-dasharray="3 3"/>`);
      out.push(`<line x1="${X(p.at[0])}" y1="${Y(p.at[1])}" x2="${axisX}" y2="${Y(p.at[1])}" stroke="${pal.muted}" stroke-dasharray="3 3"/>`);
    }

  // Curves
  const labelSpots: { x: number; y: number; text: string; col: string }[] = [];
  for (const c of g.curves ?? []) {
    const a = Math.max(c.from ?? x0, x0);
    const b = Math.min(c.to ?? x1, x1);
    const n = 480;
    let d = "";
    let pen = false;
    let prev = NaN;
    let lastIn: [number, number] | null = null;
    const span = y1 - y0;
    for (let k = 0; k <= n; k++) {
      const x = a + ((b - a) * k) / n;
      const y = evalAt(c.f, x);
      if (!Number.isFinite(y) || (Number.isFinite(prev) && Math.abs(y - prev) > 3 * span && (y > y1 || y < y0 || prev > y1 || prev < y0))) {
        pen = false;
        prev = y;
        if (!Number.isFinite(y)) continue;
      }
      const yc = Math.max(y0 - 2 * span, Math.min(y1 + 2 * span, y));
      d += `${pen ? "L" : "M"}${X(x).toFixed(1)},${Y(yc).toFixed(1)} `;
      pen = true;
      prev = y;
      if (y >= y0 && y <= y1) lastIn = [x, y];
    }
    const col = tone(c.tone);
    out.push(`<path d="${d.trim()}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"${c.dashed ? ` stroke-dasharray="7 5"` : ""}/>`);
    if (c.label && lastIn) labelSpots.push({ x: X(lastIn[0]), y: Y(lastIn[1]), text: plain(c.label), col });
  }

  // Segments (tangents, asymptotes, intervals on a number line)
  for (const s of g.segments ?? []) {
    const col = s.tone === undefined && !g.numberLine ? pal.text : tone(s.tone);
    const yA = g.numberLine ? 0 : s.from[1];
    const yB = g.numberLine ? 0 : s.to[1];
    out.push(
      `<line x1="${X(s.from[0])}" y1="${Y(yA)}" x2="${X(s.to[0])}" y2="${Y(yB)}" stroke="${col}" stroke-width="${g.numberLine ? 5 : 1.8}" stroke-linecap="${g.numberLine ? "butt" : "round"}"${s.dashed ? ` stroke-dasharray="6 4"` : ""}${s.arrow ? ` marker-end="url(#${uid}-ah)"` : ""}${g.numberLine ? ` stroke-opacity="0.75"` : ""}/>`,
    );
    if (s.label) labelSpots.push({ x: X(s.to[0]), y: Y(yB) - (g.numberLine ? 12 : 0), text: plain(s.label), col });
  }
  out.push(`</g>`);

  // Curve/segment labels, nudged apart and kept inside the plot.
  const placed: [number, number][] = [];
  for (const l of labelSpots) {
    const wide = 6.4 * l.text.length;
    let lx = l.x + 5;
    let anchor = "start";
    if (lx + wide > FIG_W - 2) {
      lx = l.x - 5;
      anchor = "end";
    }
    let ly = Math.max(T + 10, Math.min(T + h - 4, l.y - 6));
    while (placed.some(([px, py]) => Math.abs(px - lx) < 40 && Math.abs(py - ly) < 13)) ly += 13;
    placed.push([lx, ly]);
    out.push(`<text x="${lx}" y="${ly}" text-anchor="${anchor}" fill="${l.col}" font-weight="700" ${halo}>${esc(l.text)}</text>`);
  }

  for (const p of g.points ?? []) {
    const px = X(p.at[0]);
    const py = g.numberLine ? Y(0) : Y(p.at[1]);
    if (px < L - 1 || px > L + w + 1 || py < T - 1 || py > T + h + 1) continue;
    const col = p.tone === undefined ? pal.text : tone(p.tone);
    out.push(p.open ? `<circle cx="${px}" cy="${py}" r="4.2" fill="${pal.bg === "transparent" ? pal.halo : pal.bg}" stroke="${col}" stroke-width="2"/>` : `<circle cx="${px}" cy="${py}" r="4.2" fill="${col}"/>`);
    if (p.label) {
      const wide = 6.2 * plain(p.label).length;
      const right = px + 7 + wide < FIG_W - 2;
      out.push(`<text x="${right ? px + 7 : px - 7}" y="${py - 8}" text-anchor="${right ? "start" : "end"}" fill="${pal.text}" font-weight="700" ${halo}>${esc(plain(p.label))}</text>`);
    }
  }

  for (const l of g.labels ?? [])
    out.push(`<text x="${X(l.at[0])}" y="${g.numberLine ? Y(0) - 14 : Y(l.at[1])}" text-anchor="middle" fill="${l.tone === undefined ? pal.text : tone(l.tone)}" ${halo}>${esc(plain(l.text))}</text>`);

  out.push(`</svg>`);
  return out.join("");
}

// ------------------------------------------------------------------ Venn diagrams

function vennSvg(v: Venn, pal: Palette, uid: string): string {
  const font = `font-family="Segoe UI, Arial, sans-serif"`;
  const halo = `stroke="${pal.halo}" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"`;
  const T = v.title ? 30 : 12;
  const U = { x: 14, y: T, w: FIG_W - 28, h: FIG_H - T - 14 };
  const r = v.sets.length === 2 ? 78 : 68;
  const cx = FIG_W / 2;
  const cy = U.y + U.h / 2 + (v.sets.length === 3 ? 6 : 0);
  const circles =
    v.sets.length === 2
      ? [
          { x: cx - 48, y: cy },
          { x: cx + 48, y: cy },
        ]
      : [
          { x: cx - 42, y: cy - 30 },
          { x: cx + 42, y: cy - 30 },
          { x: cx, y: cy + 40 },
        ];
  const inside = (i: number, x: number, y: number) => (x - circles[i].x) ** 2 + (y - circles[i].y) ** 2 <= r * r;
  const code = (x: number, y: number) => circles.map((_, i) => (inside(i, x, y) ? "1" : "0")).join("");

  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${FIG_W} ${FIG_H}" width="${FIG_W}" height="${FIG_H}" ${font} font-size="13">`, `<defs>`);
  circles.forEach((c, i) => out.push(`<clipPath id="${uid}-c${i}"><circle cx="${c.x}" cy="${c.y}" r="${r}"/></clipPath>`));
  for (const reg of v.shade) {
    out.push(`<mask id="${uid}-m${reg}"><rect x="${U.x}" y="${U.y}" width="${U.w}" height="${U.h}" fill="white"/>`);
    circles.forEach((c, i) => reg[i] === "0" && out.push(`<circle cx="${c.x}" cy="${c.y}" r="${r}" fill="black"/>`));
    out.push(`</mask>`);
  }
  out.push(`</defs>`);
  if (pal.bg !== "transparent") out.push(`<rect width="100%" height="100%" fill="${pal.bg}"/>`);
  if (v.title) out.push(`<text x="${FIG_W / 2}" y="19" text-anchor="middle" font-weight="600" fill="${pal.text}">${esc(plain(v.title))}</text>`);

  for (const reg of v.shade) {
    let shape = `<rect x="${U.x}" y="${U.y}" width="${U.w}" height="${U.h}" fill="${pal.tones[0]}" fill-opacity="0.28" mask="url(#${uid}-m${reg})"/>`;
    circles.forEach((_, i) => {
      if (reg[i] === "1") shape = `<g clip-path="url(#${uid}-c${i})">${shape}</g>`;
    });
    out.push(shape);
  }
  out.push(`<rect x="${U.x}" y="${U.y}" width="${U.w}" height="${U.h}" fill="none" stroke="${pal.text}" stroke-width="1.5" rx="4"/>`);
  out.push(`<text x="${U.x + 8}" y="${U.y + 17}" font-weight="700" fill="${pal.text}">${esc(plain(v.universe ?? "U"))}</text>`);
  circles.forEach((c, i) => {
    out.push(`<circle cx="${c.x}" cy="${c.y}" r="${r}" fill="none" stroke="${pal.tones[i === 0 ? 0 : i === 1 ? 1 : 2]}" stroke-width="2.2"/>`);
    const lx = v.sets.length === 3 && i === 2 ? c.x : c.x + (i === 0 ? -r * 0.72 : r * 0.72);
    const ly = v.sets.length === 3 && i === 2 ? c.y + r + 2 : c.y - r * 0.78;
    out.push(`<text x="${lx}" y="${ly}" text-anchor="middle" font-weight="700" fill="${pal.tones[i === 0 ? 0 : i === 1 ? 1 : 2]}" ${halo}>${esc(plain(v.sets[i]))}</text>`);
  });

  // Region items at the centroid of each region (found by sampling).
  for (const [reg, text] of Object.entries(v.items ?? {})) {
    let sx = 0;
    let sy = 0;
    let n = 0;
    for (let x = U.x + 4; x < U.x + U.w; x += 4)
      for (let y = U.y + 4; y < U.y + U.h; y += 4)
        if (code(x, y) === reg) {
          // Outside all sets: use the bottom-right corner area rather than the centroid (which would sit under the circles).
          if (/^0+$/.test(reg) && (x < U.x + U.w - 70 || y < U.y + U.h - 40)) continue;
          sx += x;
          sy += y;
          n++;
        }
    if (!n) continue;
    out.push(`<text x="${(sx / n).toFixed(1)}" y="${(sy / n + 4).toFixed(1)}" text-anchor="middle" font-size="12" fill="${pal.text}" ${halo}>${esc(plain(text))}</text>`);
  }
  out.push(`</svg>`);
  return out.join("");
}

/** Browser only: rasterise a figure to a PNG (base64, no prefix) for the Word export. */
export async function figurePng(f: Figure, scale = 2): Promise<string> {
  return svgToPng(figureSvg(f, PRINT, "p"), FIG_W, FIG_H, scale);
}

export async function svgToPng(svg: string, w: number, h: number, scale = 2): Promise<string> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("figure render failed"));
      img.src = url;
    });
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w * scale));
    c.height = Math.max(1, Math.round(h * scale));
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/png").split(",")[1];
  } finally {
    URL.revokeObjectURL(url);
  }
}
