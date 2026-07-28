"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Cursor-tracking border glow (à la reactbits.dev/components/border-glow):
// a soft radial gradient follows the pointer around the card's border ring
// and fades out on mouse-leave. Uses a mask-composite "exclude" trick so
// only a thin ring around the edge lights up, not the whole card face.
// Position is pushed via a plain DOM style property (not React state) so
// mousemove doesn't trigger a re-render per pixel.
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el!.style.setProperty("--glow-x", `${x}%`);
      el!.style.setProperty("--glow-y", `${y}%`);
      el!.style.setProperty("--glow-opacity", "1");
    }
    function handleLeave() {
      el!.style.setProperty("--glow-opacity", "0");
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border border-card-border bg-card p-6 shadow-sm ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          padding: 1,
          opacity: "var(--glow-opacity, 0)",
          background:
            "radial-gradient(220px circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--accent-glow), transparent 70%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

type PillTone = "neutral" | "accent" | "success" | "review";

const pillTones: Record<PillTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  review: "bg-review-soft text-review",
};

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: PillTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${pillTones[tone]}`}
    >
      {children}
    </span>
  );
}

// Splits a translated template string on a literal "{{accent}}" marker and
// renders the replacement in the accent color — keeps the styled fragment
// out of the translation dictionaries so translators only ever touch prose.
export function AccentText({
  template,
  accent,
}: {
  template: string;
  accent: string;
}) {
  const [before, after] = template.split("{{accent}}");
  return (
    <>
      {before}
      <span className="text-accent">{accent}</span>
      {after}
    </>
  );
}

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_0_1px_var(--accent),0_0_22px_-2px_var(--accent-glow)] active:brightness-95 focus-visible:outline-2 focus-visible:outline-accent"
    >
      {children}
    </a>
  );
}
