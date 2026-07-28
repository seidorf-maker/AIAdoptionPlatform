export function Certificate({
  track,
  roleLabel,
  holderName,
  date,
}: {
  track: string;
  roleLabel: string;
  holderName: string;
  date: string;
}) {
  return (
    <div className="mt-4 rounded-2xl border-2 border-review bg-gradient-to-b from-card to-review-soft p-6 text-center">
      <div className="mx-auto mb-2.5 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-accent">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <div className="text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
        OnRamp Competence Certification
      </div>
      <h2 className="mt-1.5 mb-0.5 font-serif text-xl">{track}</h2>
      <div className="my-1 text-[15px]">
        Awarded to <strong>{holderName}</strong>
      </div>
      <div className="my-1 text-[15px] font-semibold text-accent">
        {roleLabel}
      </div>
      <div className="my-1 text-[15px]">{date}</div>
      <div className="mt-2.5 inline-block rounded-full border border-review bg-card px-3 py-1 text-xs font-semibold text-review">
        Assessed — not just completed
      </div>
      <div className="mt-3.5 text-[11.5px] text-muted-foreground">
        In production, issued as a verifiable, LinkedIn-shareable credential
        via Credly/Accredible, backed by the employer&apos;s own executive
        sponsorship.
      </div>
    </div>
  );
}
