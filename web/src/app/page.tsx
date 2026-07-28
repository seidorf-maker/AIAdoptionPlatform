"use client";

import { useRouter } from "next/navigation";
import Aurora from "@/components/aurora";
import SpecularButton from "@/components/specular-button";
import { PromptCoach } from "@/components/onramp/prompt-coach";
import { CompetenceAssessment } from "@/components/onramp/competence-assessment";
import { Leaderboard } from "@/components/onramp/leaderboard";
import { LockedOverlay } from "@/components/onramp/locked-overlay";
import { useLocale } from "@/lib/i18n/locale-context";

// proxy.ts redirects a signed-in visitor away from "/" to /app before this
// ever renders, so this component only needs to handle the signed-out case.
export default function Home() {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <div>
      {/* Hero band: dark navy with the WebGL Aurora glowing behind the
          headline (white text over it). Always dark regardless of theme so
          the aurora reads well; the rest of the page keeps the normal bg. */}
      <section className="relative overflow-hidden bg-[#0f1720]">
        <div className="pointer-events-none absolute inset-0">
          <Aurora
            colorStops={["#4da8ff", "#57cf8e", "#0F1720"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.8}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
          <p className="text-sm font-medium text-[#7cc4ff]">{t.landing.tag}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-white">
            {t.landing.heading}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80 text-pretty">
            {t.landing.subhead}
          </p>

          <div className="mt-8">
            <SpecularButton
              size="lg"
              radius={999}
              tint="#ffffff"
              tintOpacity={0.08}
              blur={4}
              textColor="#ffffff"
              lineColor="#7cff67"
              baseColor="#4da8ff"
              intensity={1}
              followMouse
              proximity={280}
              onClick={() => router.push("/login")}
            >
              {t.landing.logIn}
            </SpecularButton>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
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

          <PreviewSection title={t.landing.leaderboardTitle}>
            <LockedOverlay>
              <Leaderboard
                name="Denise Carter"
                roleLabel="Senior Financial Analyst"
                mode="preview"
              />
            </LockedOverlay>
          </PreviewSection>
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
