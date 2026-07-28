import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, Pill } from "@/components/ui";
import { AuthGuard } from "@/components/auth-guard";
import { buildCertification } from "@/lib/mock-data";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ certId: string }>;
}) {
  const { certId } = await params;
  const certification = buildCertification();
  if (certId !== certification.id) notFound();

  const issued = new Date(certification.issuedAt);

  return (
    <AuthGuard>
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground underline decoration-dotted"
      >
        ← Back to dashboard
      </Link>

      <Card className="mt-6 text-center">
        <Pill tone="accent">Foundational certification</Pill>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {certification.competencyName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Awarded to {certification.holderName} · {certification.orgName}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Issued {issued.toLocaleDateString(undefined, { dateStyle: "long" })}
        </p>

        <div className="mx-auto mt-6 h-px w-24 bg-card-border" />

        <p className="mt-6 text-sm text-muted-foreground">
          Verification code
        </p>
        <p className="mt-1 font-mono text-lg tracking-wider">
          {certification.verificationCode}
        </p>
        <Link
          href={`/verify/${certification.verificationCode}`}
          className="mt-4 inline-block text-sm text-accent underline decoration-dotted"
        >
          View public verification page →
        </Link>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        This certificate is self-issued by OnRamp and independently
        verifiable — anyone can confirm it&apos;s real with no login
        required. What it represents matters more than its format: a
        demonstrated skill, not a completion badge.
      </p>
    </div>
    </AuthGuard>
  );
}
