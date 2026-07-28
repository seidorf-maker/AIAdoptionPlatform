"use client";

import { PrimaryLink } from "@/components/ui";
import { PromptCoach } from "@/components/onramp/prompt-coach";
import { CompetenceAssessment } from "@/components/onramp/competence-assessment";
import { LockedOverlay } from "@/components/onramp/locked-overlay";
import { useLocale } from "@/lib/i18n/locale-context";

// proxy.ts redirects a signed-in visitor away from "/" to /app before this
// ever renders, so this component only needs to handle the signed-out case.
export default function Home() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{t.landing.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {t.landing.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {t.landing.subhead}
      </p>

      <div className="mt-6">
        <PrimaryLink href="/login">{t.landing.logIn}</PrimaryLink>
      </div>

      <div className="mt-14">
        <p className="text-sm font-medium text-muted-foreground">
          {t.landing.seeItInAction}
        </p>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          {t.landing.seeItInActionSub}
        </p>

        <div className="space-y-8">
          <PreviewSection title={t.landing.promptCoachTitle}>
            <LockedOverlay>
              <PromptCoach
                name="Denise Carter"
                roleLabel="Senior Financial Analyst"
                mode="preview"
              />
            </LockedOverlay>
          </PreviewSection>

          <PreviewSection title={t.landing.competenceAssessmentTitle}>
            <LockedOverlay>
              <CompetenceAssessment name="Denise Carter" mode="preview" />
            </LockedOverlay>
          </PreviewSection>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        <Principle
          title={t.landing.principle1Title}
          body={t.landing.principle1Body}
        />
        <Principle
          title={t.landing.principle2Title}
          body={t.landing.principle2Body}
        />
        <Principle
          title={t.landing.principle3Title}
          body={t.landing.principle3Body}
        />
      </div>
    </div>
  );
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 font-serif text-lg">{title}</h2>
      {children}
    </div>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-card-border bg-card/60 p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
