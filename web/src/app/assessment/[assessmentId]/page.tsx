"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Pill, PrimaryLink } from "@/components/ui";
import { assessment, simulateGrading } from "@/lib/mock-data";
import type { GradingResult } from "@/lib/types";

type Stage = "writing" | "grading" | "result";

export default function AssessmentPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = use(params);
  const router = useRouter();
  const [text, setText] = useState("");
  const [stage, setStage] = useState<Stage>("writing");
  const [result, setResult] = useState<GradingResult | null>(null);

  if (assessmentId !== assessment.id) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">Assessment not found.</div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStage("grading");
    // Stands in for the real Netlify Background Function + Claude API call
    // (research/PRD.md §3.5) — kept short here since this is a prototype.
    window.setTimeout(() => {
      const graded = simulateGrading(text);
      setResult(graded);
      setStage("result");
    }, 1800);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/track/${assessment.trackId}`}
        className="text-sm text-muted-foreground underline decoration-dotted"
      >
        ← Back to track
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {assessment.title}
      </h1>

      <Card className="mt-6 whitespace-pre-line text-sm leading-relaxed">
        {assessment.scenarioPrompt}
      </Card>

      {stage === "writing" && (
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="submission" className="text-sm font-medium">
            Your response
          </label>
          <textarea
            id="submission"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Write your improved draft and what you'd flag for manual review…"
            className="mt-2 w-full rounded-xl border border-card-border bg-card p-4 text-sm outline-none focus-visible:border-accent"
          />
          <div className="mt-4">
            <button
              type="submit"
              disabled={!text.trim()}
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit for review
            </button>
          </div>
        </form>
      )}

      {stage === "grading" && (
        <Card className="mt-6 text-center">
          <p className="font-medium">Reviewing your response…</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This usually takes under a minute. You don&apos;t need to wait
            here — feel free to check back.
          </p>
        </Card>
      )}

      {stage === "result" && result && (
        <ResultCard result={result} onRetry={() => setStage("writing")} onRouter={router} />
      )}
    </div>
  );
}

function ResultCard({
  result,
  onRetry,
  onRouter,
}: {
  result: GradingResult;
  onRetry: () => void;
  onRouter: ReturnType<typeof useRouter>;
}) {
  const tone =
    result.status === "passed"
      ? "success"
      : result.status === "needs_review"
        ? "review"
        : "neutral";

  const label =
    result.status === "passed"
      ? "Passed"
      : result.status === "needs_review"
        ? "Under review"
        : "Try again";

  return (
    <Card className="mt-6">
      <Pill tone={tone}>{label}</Pill>
      <p className="mt-3 text-lg font-medium">{result.headline}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {result.feedback.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      <div className="mt-5">
        {result.status === "passed" ? (
          <PrimaryLink href="/certificate/cert-demo-001">
            View your certificate
          </PrimaryLink>
        ) : result.status === "failed" ? (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Try again
          </button>
        ) : (
          <button
            onClick={() => onRouter.push("/dashboard")}
            className="inline-flex items-center justify-center rounded-full bg-muted px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent-soft"
          >
            Back to dashboard
          </button>
        )}
      </div>
    </Card>
  );
}
