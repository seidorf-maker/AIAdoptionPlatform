"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Community } from "@/components/onramp/community";
import { useLocale } from "@/lib/i18n/locale-context";

// Public community page — its own section of the app, ungated by proxy.ts
// (which only touches "/", "/login", "/app"), same pattern as /pricing and
// /about. Anyone can browse; posting attributes to the signed-in user if
// there is one, otherwise a neutral guest identity. All state is still the
// client-side mock in the Community component — no backend yet.
export default function CommunityPage() {
  const { t } = useLocale();
  const [identity, setIdentity] = useState({
    name: "You",
    role: "Community member",
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      const metadata = user?.user_metadata as
        | { full_name?: string; role?: string }
        | undefined;
      if (metadata?.full_name) {
        setIdentity({
          name: metadata.full_name,
          role: metadata.role ?? "Community member",
        });
      }
    });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-accent">{t.communityPage.tag}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        {t.communityPage.heading}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
        {t.communityPage.subhead}
      </p>

      <div className="mt-10">
        <Community name={identity.name} roleLabel={identity.role} mode="live" />
      </div>
    </div>
  );
}
