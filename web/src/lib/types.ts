export type CertificationTier = "foundational" | "practitioner" | "advanced";

export interface Certification {
  id: string;
  verificationCode: string;
  holderName: string;
  orgName: string;
  competencyName: string;
  tier: CertificationTier;
  issuedAt: string;
}
