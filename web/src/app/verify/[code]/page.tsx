import { Card, Pill } from "@/components/ui";
import { buildCertification } from "@/lib/mock-data";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const certification = buildCertification();
  const isValid = code === certification.verificationCode;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground">Public verification</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">
        Certificate lookup
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        No account or login required — anyone with a verification code can
        confirm a certificate is real.
      </p>

      <Card className="mt-8">
        {isValid ? (
          <>
            <Pill tone="success">Verified</Pill>
            <p className="mt-3 text-lg font-medium">
              {certification.competencyName}
            </p>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Holder</dt>
              <dd>{certification.holderName}</dd>
              <dt className="text-muted-foreground">Organization</dt>
              <dd>{certification.orgName}</dd>
              <dt className="text-muted-foreground">Tier</dt>
              <dd className="capitalize">{certification.tier}</dd>
              <dt className="text-muted-foreground">Issued</dt>
              <dd>
                {new Date(certification.issuedAt).toLocaleDateString(
                  undefined,
                  { dateStyle: "long" }
                )}
              </dd>
              <dt className="text-muted-foreground">Code</dt>
              <dd className="font-mono">{certification.verificationCode}</dd>
            </dl>
          </>
        ) : (
          <>
            <Pill tone="neutral">Not found</Pill>
            <p className="mt-3 text-sm text-muted-foreground">
              No certificate matches the code “{code}”. Double-check the code
              and try again.
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
