import { PrimaryLink } from "@/components/ui";
import { PromptCoach } from "@/components/onramp/prompt-coach";
import { CompetenceAssessment } from "@/components/onramp/competence-assessment";
import { LockedOverlay } from "@/components/onramp/locked-overlay";

// proxy.ts redirects a signed-in visitor away from "/" to /app before this
// ever renders, so this component only needs to handle the signed-out case.
export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">
        A role-based AI adoption platform
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        AI, for the rest of us.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        OnRamp certifies that non-technical employees can actually do their
        job with AI — not just that they watched a course.
      </p>

      <div className="mt-6">
        <PrimaryLink href="/login">Log In</PrimaryLink>
      </div>

      <div className="mt-14">
        <p className="text-sm font-medium text-muted-foreground">
          See it in action
        </p>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          The real Prompt Coach and Competence Assessment, shown exactly as
          they work once you&apos;re signed in.
        </p>

        <div className="space-y-8">
          <PreviewSection title="Prompt Coach">
            <LockedOverlay>
              <PromptCoach
                name="Denise Carter"
                roleLabel="Senior Financial Analyst"
                mode="preview"
              />
            </LockedOverlay>
          </PreviewSection>

          <PreviewSection title="Competence Assessment">
            <LockedOverlay>
              <CompetenceAssessment name="Denise Carter" mode="preview" />
            </LockedOverlay>
          </PreviewSection>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        <Principle
          title="Sanctioned, not sneaky"
          body="Every screen is approved and specific to your role — never an open catalog to guess your way through."
        />
        <Principle
          title="Proof over participation"
          body="Certifications require demonstrating a real task, evaluated against a rubric — not a completion badge."
        />
        <Principle
          title="No public exposure"
          body="No leaderboards. An uncertain result gets a second look, never a public fail."
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
