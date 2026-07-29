"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/locale-context";
import { locales, localeLabels, type Locale } from "@/lib/i18n/dictionaries";
import { BrandLogo } from "@/components/brand-logo";

// Small group/people icon used to set the Community link apart from the
// other text-only nav items — Community is the one social/peer-driven
// destination in the nav, so it gets a glyph, the rest don't.
function GroupIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20" />
      <circle cx="9.5" cy="8.5" r="3.25" />
      <path d="M16 15c1.86.23 3.5 1.53 3.5 3.5V20" />
      <path d="M14.3 5.2a3.25 3.25 0 0 1 0 6.3" />
    </svg>
  );
}

// Shared nav link with an active-tab state — the current section renders in
// the primary accent color (per the globals.css palette notes: blue is used
// for "buttons/links/eyebrows/active tabs"), everything else stays muted
// until hovered. children can be plain text or an icon+text pair (Community).
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-1.5 text-sm transition hover:text-accent ${
        active ? "font-medium text-accent" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState<string | null | undefined>(undefined);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      const metadata = user?.user_metadata as { full_name?: string } | undefined;
      setName(user ? metadata?.full_name ?? "Signed in" : null);
    });

    // This header instance persists across client-side navigations (it
    // lives in the root layout), so a one-shot getUser() on mount misses
    // sign-in/sign-out events that happen elsewhere in the app (e.g. the
    // Sign Out button inside /app). Subscribing keeps it in sync everywhere.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const metadata = session?.user.user_metadata as
        | { full_name?: string }
        | undefined;
      setName(session ? metadata?.full_name ?? "Signed in" : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setName(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-card-border bg-card/60">
      {/* Wider than the max-w-3xl reading column the pages use below — with
          six nav links now, a wider header rail keeps them on one line at
          typical desktop widths instead of wrapping every page's header. */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {t.nav.tag}
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          {/* Public pages — visible regardless of auth state, and not gated
              by proxy.ts (which only touches "/", "/login", "/app").
              Order follows the site's narrative flow: why we exist, how it
              works, what's included, what progress looks like, what it
              costs, then the peer/community destination last. */}
          <NavLink href="/about" active={pathname === "/about"}>
            {t.nav.ourMission}
          </NavLink>
          <NavLink href="/how-it-works" active={pathname === "/how-it-works"}>
            {t.nav.howItWorks}
          </NavLink>
          <NavLink href="/services" active={pathname === "/services"}>
            {t.nav.services}
          </NavLink>
          <NavLink href="/results" active={pathname === "/results"}>
            {t.nav.results}
          </NavLink>
          <NavLink href="/pricing" active={pathname === "/pricing"}>
            {t.nav.pricing}
          </NavLink>
          <NavLink href="/community" active={pathname === "/community"}>
            <GroupIcon className="h-3.5 w-3.5" />
            {t.nav.community}
          </NavLink>

          <label className="sr-only" htmlFor="locale-switcher">
            Language
          </label>
          <select
            id="locale-switcher"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="rounded-full border border-card-border bg-background px-3 py-1.5 text-sm text-muted-foreground outline-none transition hover:border-accent focus-visible:border-accent"
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {localeLabels[l]}
              </option>
            ))}
          </select>

          {/* /app has its own greeting + Sign Out in AppShell — avoid duplicating it here. */}
          {pathname?.startsWith("/app") ? null : name === undefined ? null : name ? (
            <div className="flex items-center gap-4">
              <Link
                href="/app"
                className="rounded-full bg-muted px-4 py-1.5 text-sm text-foreground transition-all duration-200 hover:bg-success-soft hover:shadow-[0_0_14px_-4px_var(--success-glow)]"
              >
                {name}
              </Link>
              <button
                onClick={signOut}
                className="text-sm text-muted-foreground underline decoration-dotted"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              /* Green (brand color) to tie with the logo — the "very top"
                 stays green while in-page CTAs use the blue --accent. */
              className="rounded-full bg-success px-4 py-1.5 text-sm font-medium text-success-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--success),0_0_18px_-2px_var(--success-glow)] active:brightness-95"
            >
              {t.nav.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
