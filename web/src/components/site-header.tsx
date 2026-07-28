"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState<string | null | undefined>(undefined);

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
            AI, for the rest of us
          </span>
        </Link>

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
              Log out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
