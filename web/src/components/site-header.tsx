import Link from "next/link";
import { persona } from "@/lib/mock-data";

export function SiteHeader() {
  return (
    <header className="border-b border-card-border bg-card/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight">OnRamp</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            AI, for the rest of us
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full bg-muted px-4 py-1.5 text-sm text-foreground transition hover:bg-accent-soft"
        >
          {persona.fullName}
        </Link>
      </div>
    </header>
  );
}
