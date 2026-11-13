import { memo } from "react";

// Renders the SC1001 text markup (see lib/sc1001/types.ts): ```fenced code```, `inline code`, **bold**,
// "- " bullets, and one paragraph per line. No KaTeX here: Python code often contains "$".

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function mdInline(text: string): string {
  return text
    .split(/(`[^`\n]+`)/g)
    .map((part) =>
      part.length > 2 && part.startsWith("`") && part.endsWith("`")
        ? `<code>${escapeHtml(part.slice(1, -1))}</code>`
        : escapeHtml(part).replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>"),
    )
    .join("");
}

export function mdHtml(text: string): string {
  let html = "";
  const blocks = text.split(/```[a-z]*\n?([\s\S]*?)```/g);
  blocks.forEach((block, i) => {
    if (i % 2 === 1) {
      html += `<pre class="code">${escapeHtml(block.replace(/\n$/, ""))}</pre>`;
      return;
    }
    let inList = false;
    for (const raw of block.split("\n")) {
      const line = raw.trim();
      if (!line) continue;
      const bullet = /^[-•]\s+/.test(line);
      if (bullet && !inList) html += "<ul>";
      if (!bullet && inList) html += "</ul>";
      inList = bullet;
      const body = mdInline(bullet ? line.replace(/^[-•]\s+/, "") : line);
      html += bullet ? `<li>${body}</li>` : `<p>${body}</p>`;
    }
    if (inList) html += "</ul>";
  });
  return html;
}

export const Md = memo(function Md({ text, className }: { text: string; className?: string }) {
  return <div className={`rich md ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: mdHtml(text) }} />;
});

export const MdInline = memo(function MdInline({ text }: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: mdInline(text) }} />;
});

export function Code({ code }: { code: string }) {
  return <pre className="code">{code}</pre>;
}
