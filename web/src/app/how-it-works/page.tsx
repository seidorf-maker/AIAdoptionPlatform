"use client";

import { Card, Pill, PrimaryLink } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";

// Public page — same pattern as /about, /pricing, /community: ungated by
// proxy.ts (which only touches "/", "/login", "/app"), anyone can browse.
export default function HowItWorksPage() {
  const { t } = useLocale();
  const h = t.howItWorks;

  const steps = [
    { title: h.step1Title, body: h.step1Body },
    { title: h.step2Title, body: h.step2Body },
    { title: h.step3Title, body: h.step3Body },
    { title: h.step4Title, body: h.step4Body },
    { title: h.step5Title, body: h.step5Body },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{h.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {h.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {h.subhead}
      </p>

      <div className="relative mt-14 space-y-5">
        {/* Connecting line behind the step numbers, desktop only */}
        <div
          aria-hidden
          className="absolute top-4 bottom-4 left-[19px] hidden w-px bg-card-border sm:block"
        />
        {steps.map((step, i) => (
          <Card key={step.title} className="sm:pl-16">
            <div className="absolute top-6 left-6 hidden sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {i + 1}
              </span>
            </div>
            <Pill tone="accent">
              <span className="sm:hidden">{i + 1}.</span> Step {i + 1}
            </Pill>
            <h2 className="mt-3 font-serif text-xl">{step.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {step.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4">
        <PrimaryLink href="/login">{h.tryDemo}</PrimaryLink>
        <a
          href="/services"
          className="text-sm text-muted-foreground underline decoration-dotted transition hover:text-accent"
        >
          {h.seeServices}
        </a>
      </div>
    </div>
  );
}
