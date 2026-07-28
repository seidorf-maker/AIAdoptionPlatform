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
          Even in 2026, fewer than 1 in 5 companies actually use AI in
          daily operations.
        </p>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          The Census Bureau&apos;s own May 2026 survey found only 19.8% of
          U.S. businesses report using AI in operations — 37% among large
          employers, still well under half. Gallup&apos;s Q2 2026
          workforce survey found a similar shape at the employee level:
          47% of employees say their company has rolled out AI, but a
          2025 global study found only 42% actually use the tools their
          employer provides — most reach for free, unsanctioned tools
          instead. At typical enterprise L&D seat pricing (~$380/user/year
          for LinkedIn Learning Teams), a 4,200-employee company spends
          roughly $1.6M/year on training seats — even a conservative
          estimate that half of that isn&apos;t reaching employees in a
          governed, sanctioned way points to{" "}
          <span className="text-accent">~$800K a year</span>{" "}
          in spend that isn&apos;t converting into demonstrated, real-world skill.
          OnRamp doesn&apos;t ask you to spend more on top of that — it
          makes the spend you&apos;ve already made actually work.
        </p>
        <p className="mt-3 text-xs text-muted-foreground text-pretty">
          Sources:{" "}
          <a
            href="https://www.census.gov/library/stories/2026/05/ai-use-businesses.html"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            U.S. Census Bureau, May 2026
          </a>
          ,{" "}
          <a
            href="https://www.gallup.com/workplace/712736/organizational-adoption-jumps-six-points.aspx"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            Gallup, Q2 2026
          </a>
          ,{" "}
          <a
            href="https://mbs.edu/faculty-and-research/trust-and-ai/key-findings-on-ai-at-work-and-in-education"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            Melbourne Business School, 2025
          </a>
          ,{" "}
          <a
            href="https://business.linkedin.com/learn/compare-plans"
            target="_blank"
            rel="noopener"
            className="underline decoration-dotted hover:text-accent"
          >
            LinkedIn Learning pricing
          </a>
          . The $800K figure is an illustrative estimate built on these
          sources, not an audited number for any specific company.
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
