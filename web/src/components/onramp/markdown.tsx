"use client";

import { Fragment, useState } from "react";

// Minimal renderer for the specific markdown subset Claude is instructed to
// return (see lib/onramp/prompts.ts): `### ` headings, `- `/`* ` bullets,
// paragraphs, **bold**, and fenced code blocks (rendered as copyable prompt
// cards). Builds React elements directly rather than dangerouslySetInnerHTML
// since this renders live model output.

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

function PromptCard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative my-3 rounded-lg border border-card-border border-l-4 border-l-review bg-card p-4">
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }}
        className="absolute top-2.5 right-2.5 rounded-md border border-card-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <pre className="m-0 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

export function Markdown({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  const parts = text.split(/```/);

  parts.forEach((chunk, i) => {
    if (i % 2 === 1) {
      const code = chunk.replace(/^[a-zA-Z]*\n/, "").replace(/\n$/, "");
      blocks.push(<PromptCard key={`code-${i}`} code={code} />);
      return;
    }

    const lines = chunk.split("\n");
    let list: string[] = [];
    const flushList = (key: string) => {
      if (list.length === 0) return;
      blocks.push(
        <ul key={key} className="my-2 list-disc pl-5">
          {list.map((item, j) => (
            <li key={j} className="my-1">
              {renderInline(item, `${key}-li-${j}`)}
            </li>
          ))}
        </ul>
      );
      list = [];
    };

    lines.forEach((line, j) => {
      const t = line.trim();
      const key = `p${i}-l${j}`;
      if (/^#{2,3}\s+/.test(t)) {
        flushList(`${key}-ul`);
        blocks.push(
          <h3
            key={key}
            className="mt-4 mb-2 font-serif text-[17px] text-accent"
          >
            {renderInline(t.replace(/^#{2,3}\s+/, ""), key)}
          </h3>
        );
      } else if (/^[-*]\s+/.test(t)) {
        list.push(t.replace(/^[-*]\s+/, ""));
      } else if (t === "") {
        flushList(`${key}-ul`);
      } else {
        flushList(`${key}-ul`);
        blocks.push(
          <p key={key} className="my-2">
            {renderInline(t, key)}
          </p>
        );
      }
    });
    flushList(`p${i}-trailing-ul`);
  });

  return <div className="text-[14.5px] leading-relaxed">{blocks}</div>;
}
