"use client";

import { Card, Pill, PrimaryLink, AccentText } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";

// Placeholder contact address — swap for a real monitored inbox before
// this is used in an actual pitch. Intentionally a mailto:, not a form or
// checkout: there is no billing system behind this page (see ../../CLAUDE.md
// §3 "not yet built"), so nothing here should look like a live purchase.
const CONTACT_EMAIL = "hello@onramp.ai";
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "OnRamp pilot — let's talk"
)}`;

export default function PricingPage() {
  const { t } = useLocale();
  const p = t.pricing;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{p.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {p.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {p.subhead}
      </p>

      <div className="mt-6">
        <PrimaryLink href={CONTACT_HREF}>{p.cta}</PrimaryLink>
      </div>

      {/* ROI callout */}
      <Card className="mt-14">
        <Pill tone="success">{p.roiPill}</Pill>
        <p className="mt-3 text-lg font-medium text-balance">
          {p.roiHeadline}
        </p>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          <AccentText template={p.roiBody} accent={p.roiAccent} />
        </p>
        <p className="mt-3 text-xs text-muted-foreground text-pretty">
          {p.sourcesLabel}:{" "}
          <a
            href="https://www.census.gov/library/stories/2026/05/ai-use-businesses.html"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            {p.sourcesCensus}
          </a>
          ,{" "}
          <a
            href="https://www.gallup.com/workplace/712736/organizational-adoption-jumps-six-points.aspx"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            {p.sourcesGallup}
          </a>
          ,{" "}
          <a
            href="https://mbs.edu/faculty-and-research/trust-and-ai/key-findings-on-ai-at-work-and-in-education"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            {p.sourcesMbs}
          </a>
          ,{" "}
          <a
            href="https://business.linkedin.com/learn/compare-plans"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            {p.sourcesLinkedin}
          </a>
          . {p.sourcesFootnote}
        </p>
      </Card>

      {/* Pricing tiers */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl">{p.pricingHeading}</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground text-pretty">
          {p.pricingSub}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <PricingTier
            tone="accent"
            name={p.starterName}
            eyebrow={p.starterEyebrow}
            price="$12"
            unit={p.perMonth}
            bestFor={p.starterBestFor}
            contactHref={CONTACT_HREF}
            contactLabel={p.contactUs}
          />
          <PricingTier
            tone="success"
            name={p.growthName}
            eyebrow={p.growthEyebrow}
            price="$8"
            unit={p.perMonth}
            bestFor={p.growthBestFor}
            contactHref={CONTACT_HREF}
            contactLabel={p.contactUs}
            highlighted
          />
          <PricingTier
            tone="review"
            name={p.enterpriseName}
            eyebrow={p.enterpriseEyebrow}
            price={p.custom}
            unit={p.contactForPricing}
            bestFor={p.enterpriseBestFor}
            contactHref={CONTACT_HREF}
            contactLabel={p.contactUs}
          />
        </div>

        {/* Optional add-on: gamification, separate from the base tiers above */}
        <Card className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Pill tone="neutral">{p.addOnEyebrow}</Pill>
            <h3 className="mt-2 font-serif text-lg">{p.addOnName}</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground text-pretty">
              {p.addOnBestFor}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <div>
              <span className="text-2xl font-semibold tracking-tight">
                {p.addOnPrice}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                {p.addOnUnit}
              </span>
            </div>
            <a
              href={CONTACT_HREF}
              className="inline-flex items-center justify-center rounded-full border border-card-border bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-[0_0_16px_-4px_var(--accent-glow)] focus-visible:outline-2 focus-visible:outline-accent"
            >
              {p.contactUs}
            </a>
          </div>
        </Card>
      </div>

      <p className="mt-10 max-w-xl text-xs text-muted-foreground text-pretty">
        {p.footnote}
      </p>
    </div>
  );
}

function PricingTier({
  tone,
  name,
  eyebrow,
  price,
  unit,
  bestFor,
  contactHref,
  contactLabel,
  highlighted = false,
}: {
  tone: "accent" | "success" | "review";
  name: string;
  eyebrow: string;
  price: string;
  unit: string;
  bestFor: string;
  contactHref: string;
  contactLabel: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={
        highlighted ? "border-2 border-success flex flex-col" : "flex flex-col"
      }
    >
      <Pill tone={tone}>{eyebrow}</Pill>
      <h3 className="mt-3 font-serif text-xl">{name}</h3>
      <div className="mt-2">
        <span className="text-3xl font-semibold tracking-tight">
          {price}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">{unit}</p>
      <p className="mt-3 flex-1 text-sm text-muted-foreground text-pretty">
        {bestFor}
      </p>
      <div className="mt-5">
        <a
          href={contactHref}
          className="inline-flex w-full items-center justify-center rounded-full border border-card-border bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-[0_0_16px_-4px_var(--accent-glow)] focus-visible:outline-2 focus-visible:outline-accent"
        >
          {contactLabel}
        </a>
      </div>
    </Card>
  );
}
