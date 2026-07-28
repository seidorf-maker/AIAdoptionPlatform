"use client";

import { useState } from "react";
import { LEARNING_PATHS } from "@/lib/onramp/scenarios";

export function LearningPaths() {
  const [added, setAdded] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setAdded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="mt-8">
      <h3 className="mt-0 mb-1 font-serif text-lg">
        Keep building — free learning paths
      </h3>
      <p className="text-sm text-muted-foreground">
        Add any of these to your path. All free, all sanctioned to explore.
        OnRamp works across whatever tools you already have.
      </p>

      <div className="mt-3">
        {added.size === 0 ? (
          <p className="m-0 text-sm text-muted-foreground">
            Your path is empty — add a tool below to start building beyond the
            assessment.
          </p>
        ) : (
          <p className="m-0 text-sm">
            <strong>Your learning path:</strong>{" "}
            {[...added].map((i) => (
              <span
                key={i}
                className="mr-1.5 mt-1 inline-block rounded-full border border-success/30 bg-success-soft px-3 py-1 text-xs text-success"
              >
                {LEARNING_PATHS[i].name}
              </span>
            ))}
          </p>
        )}
      </div>

      <div className="mt-3.5 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
        {LEARNING_PATHS.map((tool, i) => (
          <div
            key={tool.name}
            className={`flex flex-col gap-1.5 rounded-xl border p-3.5 ${
              added.has(i)
                ? "border-success/40 bg-success-soft"
                : "border-card-border bg-card"
            }`}
          >
            <div className="text-sm font-semibold">{tool.name}</div>
            <div className="text-xs text-muted-foreground">
              {tool.prov} · Free
            </div>
            <div className="mt-auto flex items-center gap-2 pt-2">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                Open ↗
              </a>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={`ml-auto rounded-md border px-2.5 py-1 text-xs ${
                  added.has(i)
                    ? "border-success bg-success text-white"
                    : "border-card-border bg-background text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {added.has(i) ? "Added ✓" : "+ Add to path"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
