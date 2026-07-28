"use client";

import { useLocale } from "@/lib/i18n/locale-context";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-card-border px-6 py-6 text-sm text-muted-foreground">
      <div className="mx-auto max-w-3xl">{t.common.demoFooter}</div>
    </footer>
  );
}
