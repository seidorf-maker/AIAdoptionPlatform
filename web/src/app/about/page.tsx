import { Card, Pill, PrimaryLink } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">Our mission</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        AI, for the rest of us.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        We built OnRamp because the people doing the actual work — not the
        tech team, not the early adopters — were being left to figure AI out
        on their own. That&apos;s not a training problem. It&apos;s a
        permission problem. OnRamp exists to give every employee a sanctioned,
        role-specific way in, and a real credential to show for it once
        they&apos;re there.
      </p>

      {/* Origin story */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl">Why we built this</h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          We&apos;ve watched a company spend enormous money trying to drive AI
          adoption — training programs, new tool licenses, leadership
          mandates from the top down. On paper, everything was in place. In
          practice, it wasn&apos;t going well. People weren&apos;t actually
          using the tools they&apos;d been given.
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          Digging into why, the answer wasn&apos;t resistance. It was
          simpler and more fixable than that: a lot of employees genuinely
          didn&apos;t understand how to use the tools they already had
          access to. Nobody had shown them, in the specific terms of their
          own job, exactly where to start. So the spend sat there, mostly
          unconverted into real behavior change.
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          We think AI is genuinely valuable — not as a buzzword, but for a
          concrete reason: it can cut out the repetitive, manual parts of a
          job and free people up for the higher-value, more strategic work
          only they can do. That value was sitting unused. OnRamp is our
          answer to that gap — a way to turn tools a company already owns
          into skills people actually use.
        </p>
      </div>

      {/* Market pattern callout, reusing verified stats from /pricing */}
      <Card className="mt-10">
        <Pill tone="review">This isn&apos;t an isolated story</Pill>
        <p className="mt-3 text-lg font-medium text-balance">
          Even in 2026, fewer than 1 in 5 U.S. businesses report actually
          using AI in daily operations.
        </p>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Among employees whose companies have rolled AI out, most still
          reach for free, unsanctioned tools instead of whatever their
          employer provides. That gap between quiet, ungoverned use and
          real, sanctioned skill is common enough that a single mid-size
          company can have roughly{" "}
          <span className="text-accent">$800K a year</span>{" "}
          in training spend that never converts into demonstrated ability. We built
          OnRamp to close that gap — not by asking companies to spend more,
          but by making the investment they&apos;ve already made actually
          work.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          See the full sourcing on{" "}
          <a
            href="/pricing"
            className="underline decoration-dotted hover:text-accent"
          >
            our pricing page
          </a>
          .
        </p>
      </Card>

      {/* What OnRamp does about it */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl">What we do about it</h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          OnRamp certifies real, job-specific AI competence through
          scenario-based assessment — proof that someone can do a real task
          with AI, not a record that they clicked through a course. It sits
          on top of the tools and training a company already owns rather
          than replacing them, so there&apos;s nothing to rip out and
          nothing new to procure just to get started.
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty">
          If you want the full picture of how the assessment works, or what
          it costs to bring to your team, that&apos;s covered in depth
          elsewhere on this site — this page is just the why.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-wrap items-center gap-4">
        <PrimaryLink href="/login">Try the demo</PrimaryLink>
        <a
          href="/pricing"
          className="text-sm text-muted-foreground underline decoration-dotted transition hover:text-accent"
        >
          See pricing
        </a>
      </div>
    </div>
  );
}
