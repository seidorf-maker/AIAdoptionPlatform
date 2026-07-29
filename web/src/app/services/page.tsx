"use client";

import { Card, Pill, PrimaryLink } from "@/components/ui";
import { useLocale } from "@/lib/i18n/locale-context";

// Public page — same pattern as /about, /pricing, /community: ungated by
// proxy.ts, anyone can browse.
export default function ServicesPage() {
  const { t } = useLocale();
  const s = t.services;

  const services = [
    { num: "01", title: s.svc1Title, body: s.svc1Body, tone: "accent" as const },
    { num: "02", title: s.svc2Title, body: s.svc2Body, tone: "success" as const },
    { num: "03", title: s.svc3Title, body: s.svc3Body, tone: "review" as const },
    { num: "04", title: s.svc4Title, body: s.svc4Body, tone: "accent" as const },
    { num: "05", title: s.svc5Title, body: s.svc5Body, tone: "success" as const },
    { num: "06", title: s.svc6Title, body: s.svc6Body, tone: "review" as const },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{s.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {s.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {s.subhead}
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {services.map((svc) => (
          <Card key={svc.num} className="flex flex-col">
            <Pill tone={svc.tone}>{svc.num}</Pill>
            <h2 className="mt-3 font-serif text-lg">{svc.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
              {svc.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4">
        <PrimaryLink href="/login">{s.tryDemo}</PrimaryLink>
        <a
          href="/pricing"
          className="text-sm text-muted-foreground underline decoration-dotted transition hover:text-accent"
        >
          {s.seePricing}
        </a>
      </div>
    </div>
  );
}
