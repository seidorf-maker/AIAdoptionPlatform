"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PromptCoach } from "@/components/onramp/prompt-coach";
import { CompetenceAssessment } from "@/components/onramp/competence-assessment";

type Tab = "coach" | "assess";

export function AppShell({
  fullName,
  roleLabel,
  typedEmail,
}: {
  fullName: string;
  roleLabel: string;
  typedEmail: string | null;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("coach");
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {fullName}
          </h1>
          {typedEmail && (
            <p className="mt-1 text-sm text-muted-foreground">{typedEmail}</p>
          )}
          <p className="mt-1 text-sm text-accent">{roleLabel}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="rounded-full border border-card-border px-4 py-1.5 text-sm text-muted-foreground hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {signingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-card-border">
        <TabButton active={tab === "coach"} onClick={() => setTab("coach")}>
          Prompt Coach
        </TabButton>
        <TabButton active={tab === "assess"} onClick={() => setTab("assess")}>
          Competence Assessment
        </TabButton>
      </div>

      <div className="mt-6">
        {tab === "coach" ? (
          <PromptCoach name={fullName} roleLabel={roleLabel} mode="live" />
        ) : (
          <CompetenceAssessment name={fullName} mode="live" />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "border-accent text-accent"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
