import { Card, PrimaryLink } from "@/components/ui";
import { persona } from "@/lib/mock-data";

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
        You&apos;re not behind — you were never shown the door. OnRamp gives
        non-technical employees a sanctioned, job-specific path into AI, and
        a real certification that proves you can do something, not just
        that you watched a video.
      </p>

      <div className="mt-8">
        <PrimaryLink href="/login">Log in</PrimaryLink>
      </div>

      <Card className="mt-10">
        <p className="text-sm font-medium text-muted-foreground">
          Who this is built for
        </p>
        <p className="mt-1 text-lg font-medium">
          {persona.fullName}, {persona.jobTitle}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {persona.department} at {persona.orgName} — one example of the
          person OnRamp is designed around: capable, anxious about AI, and
          never shown a sanctioned place to start. Log in above to see her
          recommended track.
        </p>
      </Card>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
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

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-card-border bg-card/60 p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
