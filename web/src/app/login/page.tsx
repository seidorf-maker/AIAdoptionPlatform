"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/locale-context";

// Demo-mode login: this is presented live, so there is no real email
// round-trip / OTP / magic link. Any typed email creates a REAL Supabase
// session via anonymous sign-in — protected routes, persistence, and
// sign-out genuinely work, they just aren't gated on verifying that email
// address. See web/README.md and ../../CLAUDE.md for why this is
// intentional in demo mode, not a shortcut that snuck in.
export default function LoginPage() {
  const router = useRouter();
  const { t } = useLocale();
  const l = t.login;
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          full_name: "Denise Carter",
          role: "Senior Financial Analyst",
          typed_email: email.trim(),
        },
      },
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <p className="text-sm font-medium text-accent">{l.tag}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        {l.oneLiner}
      </h1>

      <div className="mt-6 rounded-2xl border border-card-border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              {l.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={l.emailPlaceholder}
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={!email.trim() || submitting}
            className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? l.signingIn : l.signIn}
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {l.demoNote}
      </p>
    </div>
  );
}
