import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-card-border bg-card p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

type PillTone = "neutral" | "accent" | "success" | "review";

const pillTones: Record<PillTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  review: "bg-review-soft text-review",
};

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: PillTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${pillTones[tone]}`}
    >
      {children}
    </span>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent"
    >
      {children}
    </a>
  );
}
