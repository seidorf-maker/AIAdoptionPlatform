"use client";

import { useState } from "react";
import { Markdown } from "./markdown";
import { EXAMPLE_TASK } from "@/lib/onramp/scenarios";

const SAMPLE_RESPONSE = `You've got this — let's get you a solid first draft in under a minute.

### Here's a prompt you can use
\`\`\`
I need to write a variance explanation for our Q3 close. Actual operating
expenses came in about 8% over budget, mostly in software subscriptions
and contractor spend. Two SaaS renewals landed in Q3 that were actually
budgeted for Q4, and one contractor invoice may be a duplicate that I
still need to confirm.

Please draft a short, professional variance narrative for my controller
that: (1) explains the software and contractor overages in plain
business language, (2) calls out that some of the software overage is a
timing shift rather than true overspend, and (3) notes the possible
duplicate invoice as something to confirm before this goes out.
\`\`\`

### Why this works
- Gives the AI the real numbers and the two things you already know are worth double-checking, so it doesn't have to guess.
- Asks for the timing-shift nuance up front, instead of letting a generic draft imply real overspend.
- Ends with a specific, professional deliverable — not just "make this sound good."

### A first draft to get you started
Q3 operating expenses came in approximately 8% over budget, driven primarily by software subscriptions (+$38.4K) and contractor spend (+$31.5K). Two SaaS renewals landed in Q3 that were originally budgeted for Q4, so a portion of this variance reflects a timing shift rather than true overspend. One contractor invoice is under review for a possible duplicate and will be confirmed before final close.`;

export function PromptCoach({
  name,
  roleLabel,
  mode,
}: {
  name: string;
  roleLabel: string;
  mode: "live" | "preview";
}) {
  const [task, setTask] = useState(mode === "preview" ? EXAMPLE_TASK : "");
  const [output, setOutput] = useState(mode === "preview" ? SAMPLE_RESPONSE : "");
  const [status, setStatus] = useState<{ text: string; error?: boolean } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  // True only while the textarea holds the built-in "Try an example" task,
  // untouched. Any manual edit clears it (see the textarea onChange).
  const [usedExample, setUsedExample] = useState(false);

  async function coach() {
    if (mode !== "live") return;
    if (!task.trim()) {
      setStatus({ text: "Tell me what you're trying to do.", error: true });
      return;
    }
    setLoading(true);
    setStatus({ text: "Thinking it through with you…" });
    setOutput("");

    // Offline demo mode: the built-in "Try an example" task serves a pre-baked
    // response instead of a live (billed) Anthropic call, so the coach can be
    // demoed with no API credits. A task the user types themselves still goes
    // to the real API below.
    if (usedExample) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setOutput(SAMPLE_RESPONSE);
      setStatus(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "coach", name, roleLabel, task }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setOutput(data.text);
      setStatus(null);
    } catch (err) {
      setStatus({
        text: err instanceof Error ? err.message : "Something went wrong.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <label htmlFor="coach-task" className="mb-1.5 block text-sm font-semibold">
        What are you trying to get done?
      </label>
      <textarea
        id="coach-task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
          setUsedExample(false);
        }}
        placeholder="e.g. I need to write the variance explanation for our Q3 close and I don't know where to start"
        className="min-h-[130px] w-full resize-y rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-accent"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        Describe it the way you&apos;d tell a coworker. No special wording
        needed.
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={coach}
          disabled={mode !== "live" || loading}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--accent),0_0_22px_-2px_var(--accent-glow)] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 disabled:hover:shadow-none"
        >
          {loading ? "Coaching…" : "Coach me through it"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (mode !== "live") return;
            setTask(EXAMPLE_TASK);
            setUsedExample(true);
          }}
          className="rounded-lg border border-card-border px-3.5 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent"
        >
          Try an example
        </button>
      </div>

      {status && (
        <p
          className={`mt-2.5 text-sm ${status.error ? "text-red-600" : "text-muted-foreground"}`}
        >
          {status.text}
        </p>
      )}

      {output && (
        <div className="mt-4 rounded-xl border border-card-border bg-background p-4">
          <Markdown text={output} />
        </div>
      )}
    </div>
  );
}
