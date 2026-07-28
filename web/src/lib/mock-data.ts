import type { Certification } from "./types";

// Illustrative demo data backing the public /verify/[code] page — see
// research/PRD.md §3.6. This is the one piece of the pre-Supabase mocked
// prototype kept as-is: certificate verification is a real, permanent spec
// requirement (not superseded by the onramp-demo.html-ported /app), and it
// has no dependency on real auth or a real certifications table yet.

export function buildCertification(): Certification {
  return {
    id: "cert-demo-001",
    verificationCode: "ONR-7F3K-9QXD",
    holderName: "Denise Carter",
    orgName: "Everbright Manufacturing",
    competencyName: "AI-Assisted Variance Reporting",
    tier: "foundational",
    issuedAt: new Date().toISOString(),
  };
}
