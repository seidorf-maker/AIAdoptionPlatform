import type {
  Assessment,
  Certification,
  Competency,
  Course,
  GradingResult,
  LearningTrack,
  Persona,
} from "./types";

// All data on this page is illustrative demo/mock content — see PRD §3.4.
// It intentionally mirrors the "mocked" LinkedIn Learning integration
// pattern from research/PRD.md so the UI never claims a live connection.

export const persona: Persona = {
  id: "demo-denise",
  fullName: "Denise Carter",
  jobTitle: "Senior Financial Analyst",
  department: "Corporate Accounting",
  orgName: "Everbright Manufacturing",
};

export const competency: Competency = {
  id: "comp-variance-reporting",
  name: "AI-Assisted Variance Reporting",
  proficiencyDescription:
    "Can use AI to draft and review a financial variance report, correctly flagging anything that needs manual review before it goes out.",
};

export const courses: Course[] = [
  {
    id: "course-genai-finance",
    title: "Intro to GenAI for Finance",
    source: "linkedin_learning",
    status: "mocked",
    durationMinutes: 38,
    competencyId: competency.id,
    completed: true,
  },
  {
    id: "course-ai-reconciliation",
    title: "AI Reconciliation Workflows",
    source: "linkedin_learning",
    status: "mocked",
    durationMinutes: 40,
    competencyId: competency.id,
    completed: false,
  },
  {
    id: "course-data-review",
    title: "Reviewing AI Output for Accuracy",
    source: "internal",
    status: "live",
    durationMinutes: 15,
    competencyId: competency.id,
    completed: false,
  },
];

export const track: LearningTrack = {
  id: "track-accounting-ai",
  jobTitle: persona.jobTitle,
  title: "AI for Financial Reporting & Reconciliation",
  description:
    "A short, role-specific path to using AI confidently in your day-to-day reporting work — nothing generic, nothing you don't already need.",
  courseIds: courses.map((c) => c.id),
};

export const assessment: Assessment = {
  id: "assessment-variance-report",
  competencyId: competency.id,
  trackId: track.id,
  title: "AI-Assisted Variance Report Review",
  scenarioPrompt:
    "Below is a rough draft of a monthly variance explanation. Use AI to help tighten it up, and note anything you'd flag for manual review before it goes to your manager.\n\n" +
    '"Marketing spend was over budget this month. Travel was also higher. Not sure why COGS moved. Revenue came in about where we expected, give or take."\n\n' +
    "Submit your improved draft, plus a short note on what you'd still want a human to double-check.",
  rubricSummary:
    "Evaluated on: specificity (are the variances actually explained, not just restated), appropriate flagging of anything uncertain for manual review, and whether the tone is ready to send to a manager.",
};

// Connected-accounts state for the gap-mapping screen — always "mocked" in
// this prototype. See research/viability-analysis.md for why a live
// LinkedIn Learning connection isn't built here.
export const integrationConnections = [
  { provider: "LinkedIn Learning", status: "mocked" as const, connected: true },
  { provider: "Company LMS", status: "mocked" as const, connected: false },
];

export function buildCertification(): Certification {
  return {
    id: "cert-demo-001",
    verificationCode: "ONR-7F3K-9QXD",
    holderName: persona.fullName,
    orgName: persona.orgName,
    competencyName: competency.name,
    tier: "foundational",
    issuedAt: new Date().toISOString(),
  };
}

const NEEDS_REVIEW_KEYWORDS = ["not sure", "idk", "??"];

/**
 * Lightweight client-side stand-in for the real Claude-API grading pipeline
 * (research/PRD.md §3.5). An ambiguous or uncertain-sounding submission
 * always routes to needs_review rather than a silent fail — that escalation
 * path is a non-negotiable project rule, not just a demo nicety. A genuine
 * non-attempt still resolves to "failed," with constructive, resubmittable
 * feedback — needs_review isn't a substitute for real assessment.
 */
export function simulateGrading(submissionText: string): GradingResult {
  const trimmed = submissionText.trim();

  if (trimmed.length < 10) {
    return {
      status: "failed",
      headline: "Not quite there yet — take another pass",
      feedback: [
        "This reads more like a placeholder than an attempt at the scenario — no judgment, just try again when you have a few minutes.",
        "Aim to actually rewrite the variance explanation, plus a note on what you'd flag for manual review.",
      ],
    };
  }

  if (trimmed.length < 25) {
    return {
      status: "needs_review",
      headline: "We want a second look before this counts",
      feedback: [
        "Your response is quite short for this scenario — rather than mark it incomplete, this has been routed for review so nothing gets decided unfairly.",
        "If you'd like, add a bit more detail on what you'd flag for manual review and resubmit in the meantime.",
      ],
    };
  }

  const looksUncertain = NEEDS_REVIEW_KEYWORDS.some((kw) =>
    trimmed.toLowerCase().includes(kw)
  );

  if (looksUncertain) {
    return {
      status: "needs_review",
      headline: "Sent for a quick human check",
      feedback: [
        "Part of your response reads as uncertain — that's completely fine, it just means a person will take a quick look rather than an automatic pass/fail.",
        "You'll hear back shortly; no action needed from you right now.",
      ],
    };
  }

  return {
    status: "passed",
    headline: "Nice work — this demonstrates the competency",
    feedback: [
      "Your revised draft explains the variances specifically rather than just restating them.",
      "You flagged the right things for manual review before this would go to a manager.",
    ],
  };
}
