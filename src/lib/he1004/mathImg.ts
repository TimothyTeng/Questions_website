// Browser only: TeX → PNG via MathJax's self-contained SVG output, for maths in the Word export
// (Word can't render KaTeX's HTML/CSS, but it shows embedded images everywhere).

import { svgToPng } from "./plot";

/** Pixels per ex at the document's 11pt body size. */
const EX = 7.6;

type Converter = (tex: string, display: boolean) => string;
let converter: Promise<Converter> | null = null;

async function load(): Promise<Converter> {
  const [{ mathjax }, { TeX }, { SVG }, { liteAdaptor }, { RegisterHTMLHandler }, { AllPackages }] = await Promise.all([
    import("mathjax-full/js/mathjax.js"),
    import("mathjax-full/js/input/tex.js"),
    import("mathjax-full/js/output/svg.js"),
    import("mathjax-full/js/adaptors/liteAdaptor.js"),
    import("mathjax-full/js/handlers/html.js"),
    import("mathjax-full/js/input/tex/AllPackages.js"),
  ]);
  const adaptor = liteAdaptor();
  RegisterHTMLHandler(adaptor);
  const doc = mathjax.document("", { InputJax: new TeX({ packages: AllPackages }), OutputJax: new SVG({ fontCache: "none" }) });
  return (tex, display) => adaptor.innerHTML(doc.convert(tex, { display }) as never);
}

export interface MathPng {
  data: string;
  /** Display size in px. */
  w: number;
  h: number;
  /** Baseline offset in px (negative = below the text baseline). */
  valign: number;
}

const cache = new Map<string, Promise<MathPng | null>>();

export function texPng(tex: string, display: boolean): Promise<MathPng | null> {
  const key = `${display ? "D" : "I"}${tex}`;
  let hit = cache.get(key);
  if (!hit) {
    hit = render(tex, display).catch(() => null);
    cache.set(key, hit);
  }
  return hit;
}

async function render(tex: string, display: boolean): Promise<MathPng | null> {
  converter ??= load();
  const svg0 = (await converter)(tex, display);
  const num = (attr: string) => Number(new RegExp(`${attr}="(-?[\\d.]+)ex"`).exec(svg0)?.[1] ?? NaN);
  const wEx = num("width");
  const hEx = num("height");
  const va = Number(/vertical-align:\s*(-?[\d.]+)ex/.exec(svg0)?.[1] ?? 0);
  if (!Number.isFinite(wEx) || !Number.isFinite(hEx)) return null;
  const w = Math.max(1, wEx * EX);
  const h = Math.max(1, hEx * EX);
  const svg = svg0
    .replace(/width="-?[\d.]+ex"/, `width="${w}"`)
    .replace(/height="-?[\d.]+ex"/, `height="${h}"`)
    .replace(/currentColor/g, "#111111");
  const data = await svgToPng(svg, w, h, 3);
  return { data, w: Math.round(w), h: Math.round(h), valign: Math.round(va * EX) };
}
