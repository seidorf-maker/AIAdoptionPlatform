// OnRamp logo: navy icon square (ramp + green certification check) plus the
// "OnRamp" wordmark. The icon is self-contained on its dark square so it
// works on any background; the wordmark splits "On" (theme foreground, so
// it reads in both light and dark mode) from "Ramp" (the brand green via
// the themed --accent token, contrast-safe in both modes).

export function OnRampIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="OnRamp"
    >
      <rect width="100" height="100" rx="24" fill="#131a24" />
      <line
        x1="25"
        y1="79"
        x2="63"
        y2="39"
        stroke="#38485a"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <circle cx="70" cy="30" r="17" fill="#26a94e" />
      <path
        d="M62 30 l6 7 l13 -15"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <OnRampIcon className="h-7 w-7 shrink-0" />
      <span className="text-lg font-extrabold tracking-tight">
        <span className="text-foreground">On</span>
        <span className="text-accent">Ramp</span>
      </span>
    </span>
  );
}
