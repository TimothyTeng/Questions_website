import katex from "katex";
import { memo } from "react";

// Renders the small markup described in lib/types.ts: $inline$, $$display$$, **bold**,
// newline = paragraph, "- " = bullet.

function renderInline(text: string): string {
  // Bold markers may wrap math (e.g. **$x$ is an eigenvector**), so track bold state across parts.
  let bold = false;
  const html = text
    .split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g)
    .map((part) => {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4)
        return katex.renderToString(part.slice(2, -2), { displayMode: true, throwOnError: false });
      if (part.startsWith("$") && part.endsWith("$") && part.length > 2)
        return katex.renderToString(part.slice(1, -1), { throwOnError: false });
      return escapeHtml(part).replace(/\*\*/g, () => ((bold = !bold) ? "<strong>" : "</strong>"));
    })
    .join("");
  return bold ? `${html}</strong>` : html;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function richHtml(text: string): string {
  // Keep newlines inside $$..$$ blocks from splitting paragraphs.
  const lines: string[] = [];
  let buf = "";
  for (const line of text.split("\n")) {
    buf = buf ? `${buf}\n${line}` : line;
    if ((buf.match(/\$\$/g)?.length ?? 0) % 2 === 0) {
      lines.push(buf);
      buf = "";
    }
  }
  if (buf) lines.push(buf);

  let html = "";
  let inList = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const bullet = /^[-•]\s+/.test(line);
    if (bullet && !inList) {
      html += "<ul>";
      inList = true;
    }
    if (!bullet && inList) {
      html += "</ul>";
      inList = false;
    }
    const body = renderInline(bullet ? line.replace(/^[-•]\s+/, "") : line);
    html += bullet ? `<li>${body}</li>` : `<p>${body}</p>`;
  }
  if (inList) html += "</ul>";
  return html;
}

/** Block-level rich text. */
export const Rich = memo(function Rich({ text, className }: { text: string; className?: string }) {
  return <div className={`rich ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: richHtml(text) }} />;
});

/** Inline rich text (no paragraphs). */
export const RichInline = memo(function RichInline({ text }: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: renderInline(text) }} />;
});

export const Tex = memo(function Tex({ tex, display }: { tex: string; display?: boolean }) {
  return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: !!display, throwOnError: false }) }} />;
});
