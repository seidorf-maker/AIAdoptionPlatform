import { Card, Pill, PrimaryLink } from "@/components/ui";

// Placeholder contact address — swap for a real monitored inbox before
// this is used in an actual pitch. Intentionally a mailto:, not a form or
// checkout: there is no billing system behind this page (see ../../CLAUDE.md
// §3 "not yet built"), so nothing here should look like a live purchase.
const CONTACT_EMAIL = "hello@onramp.ai";
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "OnRamp pilot — let's talk"
)}`;

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">For HR & L&D leaders</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        Prove your team can actually use AI — not just that they sat through
        a course.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        OnRamp certifies real, job-specific AI competence through
        scenario-based assessment, layered on top of the training tools you
        already pay for — LinkedIn Learning and the rest of your L&D stack.
        It doesn&apos;t ask you to rip anything out.
      </p>

      <div className="mt-6">
        <PrimaryLink href={CONTACT_HREF}>Talk to us about a pilot</PrimaryLink>
      </div>

      {/* ROI callout */}
      <Card className="mt-14">
        <Pill tone="success">Why this saves money</Pill>
        <p className="mt-3 text-lg font-medium text-balance">
          A single ~4,200-employee company can spend roughly{" "}
          <span className="text-accent">$960K a year</span> on AI/L&D
          training seats that never convert into applied skill.
        </p>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          67% of employees already use AI at work, but only a third of
          organizations formally train them on it — the rest is shadow
          usage nobody can vouch for. At typical enterprise L&D seat
          pricing, that gap costs a mid-size company like this roughly
          $960K a year in training spend that never turns into
          demonstrated, real-world skill. OnRamp doesn&apos;t ask you to
          spend more on top of that — it makes the spend you&apos;ve
          already made actually work.{" "}
          <span className="text-muted-foreground">
            (Illustrative modeling based on our own market research, not an
            audited figure for any specific company.)
          </span>
        </p>
      </Card>

      {/* Pricing tiers */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl">Pricing</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground text-pretty">
          Priced per <strong>participating employee</strong> — the people
          actually enrolled in a track — not your full headcount. You only
          pay for who&apos;s using it.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <PricingTier
            tone="accent"
            name="Starter"
            eyebrow="Under 500 employees"
            price="$12"
            unit="/ participating employee / mo"
            bestFor="A focused pilot in one team or department before a wider rollout."
          />
          <PricingTier
            tone="success"
            name="Growth"
            eyebrow="500–2,000 employees"
            price="$8"
            unit="/ participating employee / mo"
            bestFor="Rolling out across a full function or division — about $96/employee/year."
            highlighted
          />
          <PricingTier
            tone="review"
            name="Enterprise"
            eyebrow="2,000–5,000+ employees"
            price="Custom"
            unit="contact us for pricing"
            bestFor="Company-wide rollout, volume pricing, and dedicated onboarding support."
          />
        </div>
      </div>

      <p className="mt-10 max-w-xl text-xs text-muted-foreground text-pretty">
        This is illustrative, pilot-stage pricing — not a locked commercial
        rate card. Final terms are set per pilot agreement.
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
  highlighted = false,
}: {
  tone: "accent" | "success" | "review";
  name: string;
  eyebrow: string;
  price: string;
  unit: string;
  bestFor: string;
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
          href={CONTACT_HREF}
          className="inline-flex w-full items-center justify-center rounded-full border border-card-border bg-background px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          Contact us
        </a>
      </div>
    </Card>
  );
}
