"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      login();
      router.push("/dashboard");
    }, 500);
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <p className="text-sm font-medium text-accent">Welcome back</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Log in to OnRamp
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This is approved, sanctioned access — sign in to see your
        recommended track.
      </p>

      <Card className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Work email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1.5 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={!email.trim() || !password.trim() || submitting}
            className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Signing in…" : "Log In"}
          </button>
        </form>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Prototype demo — any email and password will work. No real accounts
        or credentials are checked; this signs you in as the demo persona,
        Denise Carter.
      </p>
    </div>
  );
}
