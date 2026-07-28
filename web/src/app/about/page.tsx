"use client";

import { Card, Pill, PrimaryLink, AccentText } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";

export default function AboutPage() {
  const { t } = useLocale();
  const a = t.about;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{a.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {a.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {a.intro}
      </p>

      {/* Origin story */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl">{a.whyHeading}</h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          {a.whyP1}
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          {a.whyP2}
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          {a.whyP3}
        </p>
      </div>

      {/* Market pattern callout, reusing verified stats from /pricing */}
      <Card className="mt-10">
        <Pill tone="review">{a.statPill}</Pill>
        <p className="mt-3 text-lg font-medium text-balance">
          {a.statHeadline}
        </p>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          <AccentText template={a.statBody} accent={a.statAccent} />
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {a.seeSourcing}{" "}
          <a
            href="/pricing"
            className="underline decoration-dotted hover:text-accent"
          >
            {a.seeSourcingLink}
          </a>
          .
        </p>
      </Card>

      {/* What OnRamp does about it */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl">{a.whatHeading}</h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          {a.whatP1}
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          {a.whatP2}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-wrap items-center gap-4">
        <PrimaryLink href="/login">{a.tryDemo}</PrimaryLink>
        <a
          href="/pricing"
          className="text-sm text-muted-foreground underline decoration-dotted transition hover:text-accent"
        >
          {a.seePricing}
        </a>
      </div>
    </div>
  );
}
