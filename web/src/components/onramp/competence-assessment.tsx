"use client";

import { useState } from "react";
import { Markdown } from "./markdown";
import { ScenarioView } from "./scenario-view";
import { Certificate } from "./certificate";
import { LearningPaths } from "./learning-paths";
import { SCENARIOS, DENISE_ROLE, STRONG_ANSWER_HINT } from "@/lib/onramp/scenarios";

const SAMPLE_ANSWER =
  "Based on the data, Q3 opex is running about 8% over budget, mainly software subscriptions (+$38.4K) and contractor spend (+$31.5K). Before sending this: I'd confirm two of the SaaS renewals were actually budgeted for Q4, so part of the software variance is a timing shift, not real overspend. I'd also confirm whether the contractor invoice flagged as a possible duplicate is real before including it. I wouldn't paste the actual vendor names or dollar figures into an unapproved AI tool — I'd keep this in our approved internal tool and verify the final numbers against the ledger before sending to the controller.";

const SAMPLE_RESULT = `### What you did well
- You caught both embedded traps — the Q4-into-Q3 timing shift and the possible duplicate invoice — instead of taking the raw variance at face value.
- You flagged tying the numbers back to the ledger before this goes out, which is exactly the kind of verification a completion-only course never asks for.
- You noted keeping sensitive financials in an approved tool, not an unapproved one.

### To strengthen further
- Name specifically which system or ledger you'd reconcile against, so the verification step is concrete enough for a reviewer to follow.

### One thing to remember
Treating the AI's draft as a starting point to check, not a finished product to send, is exactly the judgment this certification is built to prove.`;

export function CompetenceAssessment({
  name,
  mode,
}: {
  name: string;
  mode: "live" | "preview";
}) {
  const scenario = SCENARIOS[DENISE_ROLE];
  const [answer, setAnswer] = useState(mode === "preview" ? SAMPLE_ANSWER : "");
  const [status, setStatus] = useState<{ text: string; error?: boolean } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ certified: boolean; text: string } | null>(
    mode === "preview" ? { certified: true, text: SAMPLE_RESULT } : null
  );

  async function submit() {
    if (mode !== "live") return;
    if (!answer.trim()) {
      setStatus({
        text: "Paste your AI-assisted result and what you'd verify.",
        error: true,
      });
      return;
    }
    setLoading(true);
    setStatus({ text: "Assessing your work — judgment, not just wording…" });
    setResult(null);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "assess", role: DENISE_ROLE, answer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      let text: string = data.text;
      const first = text.split("\n")[0]?.trim().toUpperCase() ?? "";
      const certified = first.includes("VERDICT") && first.includes("CERTIFIED");
      text = text.replace(/^VERDICT:.*\n?/i, "").trim();

      setResult({ certified, text });
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
    <div>
      <p className="mt-0 -mt-1 mb-4 text-sm text-muted-foreground">
        Anyone can certify that you <em className="text-accent not-italic font-medium">watched</em> a
        course. This certifies you can <em className="text-accent not-italic font-medium">do the job</em>{" "}
        — do the task with AI, then show what you&apos;d check before trusting it.
      </p>

      <div className="rounded-2xl border border-card-border bg-card p-5">
        <ScenarioView scenario={scenario} />

        <label
          htmlFor="assess-answer"
          className="mt-4 mb-1.5 block text-sm font-semibold"
        >
          Your AI-assisted result + what you&apos;d verify before trusting it
        </label>
        <textarea
          id="assess-answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Paste the draft you produced with AI, then list what you'd double-check or flag before sending it…"
          className="min-h-[130px] w-full resize-y rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-accent"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          No &ldquo;perfect&rdquo; answer. We&apos;re looking at whether you
          treated the AI output as a draft to verify — not gospel.
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={submit}
            disabled={mode !== "live" || loading}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--accent),0_0_22px_-2px_var(--accent-glow)] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 disabled:hover:shadow-none"
          >
            {loading ? "Assessing…" : "Submit for assessment"}
          </button>
          <button
            type="button"
            onClick={() =>
              mode === "live" &&
              setStatus({ text: STRONG_ANSWER_HINT })
            }
            className="rounded-lg border border-card-border px-3.5 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent"
          >
            Strong-answer hint
          </button>
        </div>

        {status && (
          <p
            className={`mt-2.5 text-sm ${status.error ? "text-red-600" : "text-muted-foreground"}`}
          >
            {status.text}
          </p>
        )}
      </div>

      {result && (
        <div className="mt-4 rounded-2xl border border-card-border bg-card p-5">
          <div
            className={`mb-1.5 flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold ${
              result.certified
                ? "border border-success/30 bg-success-soft text-success"
                : "border border-review/30 bg-review-soft text-review"
            }`}
          >
            {result.certified
              ? "✓ Competence demonstrated — certification earned"
              : "◐ Developing — almost there. Specific next steps below."}
          </div>
          <Markdown text={result.text} />
          {result.certified && (
            <Certificate
              track={scenario.track}
              roleLabel={scenario.roleLabel}
              holderName={name}
              date={new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          )}
        </div>
      )}

      <LearningPaths />
    </div>
  );
}
