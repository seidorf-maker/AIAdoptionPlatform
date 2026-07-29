"use client";

import { Card, Pill, PrimaryLink } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";

// Public page — same pattern as /about, /pricing, /community: ungated by
// proxy.ts, anyone can browse. This is the "before/after, over time" beat —
// mirrors the persona's diary arc (daily use -> building -> automating)
// without repeating the ROI stat block already on /pricing and /about.
export default function ResultsPage() {
  const { t } = useLocale();
  const r = t.results;

  const phases = [
    { range: r.phase1Range, title: r.phase1Title, body: r.phase1Body, tone: "accent" as const },
    { range: r.phase2Range, title: r.phase2Title, body: r.phase2Body, tone: "success" as const },
    { range: r.phase3Range, title: r.phase3Title, body: r.phase3Body, tone: "review" as const },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{r.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {r.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {r.subhead}
      </p>

      <div className="relative mt-14 space-y-6">
        {/* Vertical timeline line behind the phase markers, desktop only */}
        <div
          aria-hidden
          className="absolute top-3 bottom-3 left-[23px] hidden w-px bg-card-border sm:block"
        />
        {phases.map((phase, i) => (
          <Card key={phase.range} className="sm:pl-16">
            <div className="absolute top-6 left-6 hidden h-3 w-3 rounded-full bg-accent sm:block" />
            <Pill tone={phase.tone}>{phase.range}</Pill>
            <h2 className="mt-3 font-serif text-xl">{phase.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {phase.body}
            </p>
            {i < phases.length - 1 && (
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                ↓
              </p>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4">
        <PrimaryLink href="/login">{r.tryDemo}</PrimaryLink>
        <a
          href="/pricing"
          className="text-sm text-muted-foreground underline decoration-dotted transition hover:text-accent"
        >
          {r.seePricing}
        </a>
      </div>
    </div>
  );
}
