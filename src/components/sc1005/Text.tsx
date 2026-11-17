import katex from "katex";
import { memo } from "react";

// Renders the SC1005 markup (see lib/sc1005/types.ts): ```fenced code```, `inline code`, $math$, $$display$$,
// **bold**, "- " bullets, one paragraph per line. Code is split out first, so "$display" in Verilog is safe.

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function mathAndBold(text: string, state: { bold: boolean }): string {
  return text
    .split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
    .map((part) => {
      if (part.length > 4 && part.startsWith("$$") && part.endsWith("$$")) return katex.renderToString(part.slice(2, -2), { displayMode: true, throwOnError: false });
      if (part.length > 2 && part.startsWith("$") && part.endsWith("$")) return katex.renderToString(part.slice(1, -1), { throwOnError: false });
      return escapeHtml(part).replace(/\*\*/g, () => ((state.bold = !state.bold) ? "<strong>" : "</strong>"));
    })
    .join("");
}

export function inlineHtml(text: string): string {
  const state = { bold: false };
  const html = text
    .split(/(`[^`\n]+`)/g)
    .map((part) => (part.length > 2 && part.startsWith("`") && part.endsWith("`") ? `<code>${escapeHtml(part.slice(1, -1))}</code>` : mathAndBold(part, state)))
    .join("");
  return state.bold ? `${html}</strong>` : html;
}

export function blockHtml(text: string): string {
  let html = "";
  const blocks = text.split(/```[a-z]*\n?([\s\S]*?)```/g);
  blocks.forEach((block, bi) => {
    if (bi % 2 === 1) {
      html += `<pre class="code">${escapeHtml(block.replace(/\n$/, ""))}</pre>`;
      return;
    }
    // Keep newlines inside $$…$$ from splitting paragraphs.
    const lines: string[] = [];
    let buf = "";
    for (const line of block.split("\n")) {
      buf = buf ? `${buf}\n${line}` : line;
      if ((buf.match(/\$\$/g)?.length ?? 0) % 2 === 0) {
        lines.push(buf);
        buf = "";
      }
    }
    if (buf) lines.push(buf);
    let inList = false;
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      const bullet = /^[-•]\s+/.test(line);
      if (bullet && !inList) html += "<ul>";
      if (!bullet && inList) html += "</ul>";
      inList = bullet;
      const body = inlineHtml(bullet ? line.replace(/^[-•]\s+/, "") : line);
      html += bullet ? `<li>${body}</li>` : `<p>${body}</p>`;
    }
    if (inList) html += "</ul>";
  });
  return html;
}

/** Block text: paragraphs, bullets, code blocks. */
export const Txt = memo(function Txt({ text, className }: { text: string; className?: string }) {
  return <div className={`rich md ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: blockHtml(text) }} />;
});

/** Inline text (no paragraphs or code blocks). */
export const TxtInline = memo(function TxtInline({ text }: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: inlineHtml(text) }} />;
});

export const TexBlock = memo(function TexBlock({ tex }: { tex: string }) {
  return <div className="formula" dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: true, throwOnError: false }) }} />;
});

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div>
      {title && <div className="sample-label">{title}</div>}
      <pre className="code">{code}</pre>
    </div>
  );
}
