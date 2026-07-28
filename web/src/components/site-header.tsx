"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/locale-context";
import { locales, localeLabels, type Locale } from "@/lib/i18n/dictionaries";

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
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight">OnRamp</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {t.nav.tag}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Public marketing pages — visible regardless of auth state, and
              not gated by proxy.ts (which only touches "/", "/login", "/app"). */}
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition hover:text-accent"
          >
            {t.nav.ourMission}
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition hover:text-accent"
          >
            {t.nav.pricing}
          </Link>

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
                className="rounded-full bg-muted px-4 py-1.5 text-sm text-foreground transition hover:bg-accent-soft"
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
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
            >
              {t.nav.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
