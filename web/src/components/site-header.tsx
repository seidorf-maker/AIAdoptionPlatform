"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { persona } from "@/lib/mock-data";
import { isLoggedIn, logout } from "@/lib/auth";

export function SiteHeader() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <header className="border-b border-card-border bg-card/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight">OnRamp</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            AI, for the rest of us
          </span>
        </Link>

        {loggedIn === null ? null : loggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-muted px-4 py-1.5 text-sm text-foreground transition hover:bg-accent-soft"
            >
              {persona.fullName}
            </Link>
            <button
              onClick={() => {
                logout();
                setLoggedIn(false);
                window.location.href = "/";
              }}
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
