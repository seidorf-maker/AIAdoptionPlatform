// A mocked representation of the L&D content a company already owns/licenses,
// surfaced inside OnRamp. This is the "sits on top of your existing learning
// and development" selling point: OnRamp doesn't replace the company's LMS or
// LinkedIn Learning seats — it drives usage of them by routing each person to
// the specific courses that build the skill their certification proves.
//
// DEMO DATA ONLY. The live LinkedIn Learning / internal-LMS integration is
// deferred and mocked (see research/PRD.md gap-mapping + the project rule that
// mocked integrations are never presented as live without saying so). Nothing
// here syncs from a real system yet.

export interface CompanyCourse {
  title: string;
  provider: string;
  duration: string;
  format: string;
  /** Why OnRamp surfaces this one for this person — the gap it fills. */
  mapsTo?: string;
  tag?: "Required" | "AI-relevant";
}

export interface TrainingGroup {
  heading: string;
  blurb: string;
  recommended: boolean;
  courses: CompanyCourse[];
}

export const COMPANY_TRAINING: TrainingGroup[] = [
  {
    heading: "Recommended for your track — AI-Assisted Financial Reporting",
    blurb:
      "Hand-picked from what your company already licenses, so you're not guessing where to start. Each one builds a skill your certification actually checks.",
    recommended: true,
    courses: [
      {
        title: "Prompt Engineering for Finance Professionals",
        provider: "LinkedIn Learning",
        duration: "48 min",
        format: "Video course",
        mapsTo: "Builds the skill behind Prompt Coach",
      },
      {
        title: "Approved AI Tools & Data-Handling Policy",
        provider: "Your company · Internal LMS",
        duration: "25 min",
        format: "Required course",
        mapsTo: "Covers the confidentiality check in your assessment",
        tag: "Required",
      },
      {
        title: "Copilot in Excel: Analyze & Summarize Data",
        provider: "LinkedIn Learning",
        duration: "1h 05m",
        format: "Video course",
        mapsTo: "Directly supports the variance-analysis task",
      },
    ],
  },
  {
    heading: "Already available to you — explore when you're ready",
    blurb:
      "The rest of your company's library. No pressure to finish anything — this is here so you can see what's sanctioned and free to you.",
    recommended: false,
    courses: [
      {
        title: "Financial Modeling Foundations",
        provider: "LinkedIn Learning",
        duration: "2h 10m",
        format: "Video course",
      },
      {
        title: "Data Storytelling for Analysts",
        provider: "Your company · Internal LMS",
        duration: "40 min",
        format: "Video course",
      },
      {
        title: "Excel: PivotTables in Depth",
        provider: "LinkedIn Learning",
        duration: "1h 30m",
        format: "Video course",
      },
      {
        title: "Generative AI: The Basics",
        provider: "LinkedIn Learning",
        duration: "35 min",
        format: "Video course",
        tag: "AI-relevant",
      },
      {
        title: "Communicating Results to Leadership",
        provider: "Your company · Internal LMS",
        duration: "30 min",
        format: "Video course",
      },
    ],
  },
];
