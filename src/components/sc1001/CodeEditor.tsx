"use client";

import Editor, { type Monaco } from "@monaco-editor/react";
import type { Position, editor } from "monaco-editor";

// Monaco (loaded from its CDN by @monaco-editor/react) with a Python completion list on top of
// Monaco's own word-based suggestions, roughly what HackerEarth's editor offers.

const KEYWORDS = "False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case".split(" ");
const BUILTINS =
  "abs all any bin bool chr dict divmod enumerate filter float format input int isinstance len list map max min next ord pow print range repr reversed round set sorted str sum tuple type zip ValueError TypeError IndexError KeyError ZeroDivisionError Exception".split(" ");
const METHODS =
  "append extend insert remove pop clear index count sort reverse copy keys values items get update setdefault add discard union intersection difference split join strip lstrip rstrip upper lower capitalize title replace find startswith endswith isdigit isalpha isalnum isspace format zfill center ljust rjust readline read".split(" ");
const SNIPPETS: [string, string, string][] = [
  ["def", "def ${1:name}(${2:args}):\n\t${3:pass}", "function definition"],
  ["for", "for ${1:i} in range(${2:n}):\n\t${3:pass}", "for loop over range"],
  ["fori", "for ${1:x} in ${2:items}:\n\t${3:pass}", "for loop over items"],
  ["while", "while ${1:condition}:\n\t${2:pass}", "while loop"],
  ["if", "if ${1:condition}:\n\t${2:pass}", "if statement"],
  ["ifelse", "if ${1:condition}:\n\t${2:pass}\nelse:\n\t${3:pass}", "if / else"],
  ["try", "try:\n\t${1:pass}\nexcept ${2:Exception} as e:\n\t${3:print(e)}", "try / except"],
  ["main", 'if __name__ == "__main__":\n\t${1:main()}', "main guard"],
  ["readints", "${1:nums} = list(map(int, input().split()))", "read a line of integers"],
];

let registered = false;

function registerPython(monaco: Monaco) {
  if (registered) return;
  registered = true;
  const K = monaco.languages.CompletionItemKind;
  monaco.languages.registerCompletionItemProvider("python", {
    triggerCharacters: ["."],
    provideCompletionItems(model: editor.ITextModel, position: Position) {
      const word = model.getWordUntilPosition(position);
      const range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
      const before = model.getLineContent(position.lineNumber).slice(0, word.startColumn - 1);
      if (before.endsWith(".")) {
        return { suggestions: METHODS.map((m) => ({ label: m, kind: K.Method, insertText: m, range })) };
      }
      return {
        suggestions: [
          ...KEYWORDS.map((k) => ({ label: k, kind: K.Keyword, insertText: k, range })),
          ...BUILTINS.map((b) => ({ label: b, kind: K.Function, insertText: b, range })),
          ...SNIPPETS.map(([label, body, doc]) => ({
            label,
            kind: K.Snippet,
            insertText: body,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: doc,
            detail: doc,
            range,
          })),
        ],
      };
    },
  });
}

export function CodeEditor({ value, onChange, dark, fontSize }: { value: string; onChange: (v: string) => void; dark: boolean; fontSize: number }) {
  return (
    <Editor
      height="100%"
      language="python"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      theme={dark ? "vs-dark" : "vs"}
      beforeMount={registerPython}
      loading={<div className="muted small" style={{ padding: 12 }}>Loading editor…</div>}
      options={{
        fontSize,
        fontFamily: "var(--font-geist-mono), Consolas, monospace",
        minimap: { enabled: false },
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        scrollBeyondLastLine: false,
        wordBasedSuggestions: "currentDocument",
        quickSuggestions: { other: true, comments: false, strings: false },
        renderLineHighlight: "line",
        padding: { top: 8 },
      }}
    />
  );
}
