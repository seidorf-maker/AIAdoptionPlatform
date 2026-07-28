import type { ReactNode } from "react";

// Wraps a real, fully-rendered OnRamp component in a disabled, dimmed shell
// for the public landing page — same component tree as the live /app
// version so the preview can never drift from what's actually built.
export function LockedOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <fieldset
        disabled
        className="pointer-events-none rounded-2xl opacity-60"
      >
        {children}
      </fieldset>
      <div className="absolute top-3 right-3 rounded-full border border-card-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
        🔒 Log in to try it
      </div>
    </div>
  );
}
