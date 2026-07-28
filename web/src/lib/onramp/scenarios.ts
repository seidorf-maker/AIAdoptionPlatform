// Ported from onramp-demo.html — each scenario is deliberately messy and
// contains a hidden trap a competent AI-assisted response should catch.
// Denise Carter's fixed role (Senior Financial Analyst) always maps to
// "finance"; the other two tracks are kept for reuse if a future demo
// needs a different persona.

export type RoleKey = "finance" | "sales" | "ops";

export interface DataRow {
  cells: string[];
  flagCol?: number;
}

export interface Scenario {
  roleLabel: string;
  track: string;
  heading: string;
  intro: string;
  columns: string[];
  rows: DataRow[];
  notesLabel: string;
  notes: string;
  task: string;
  /** Plain-text rubric fed to the Claude assessor system prompt — never sent to the client. */
  rubric: string;
}

export const SCENARIOS: Record<RoleKey, Scenario> = {
  finance: {
    roleLabel: "Senior Financial Analyst",
    track: "AI-Assisted Financial Reporting",
    heading: "Scenario — Q3 Operating Expense Variance",
    intro:
      "Your controller needs a variance narrative for the Q3 close by end of day. Here's the raw data — it's messy:",
    columns: ["Category", "Budget", "Actual", "Variance"],
    rows: [
      { cells: ["Software subscriptions", "120,000", "158,400", "+38,400"], flagCol: 3 },
      { cells: ["Contractor spend", "90,000", "121,500", "+31,500"], flagCol: 3 },
      { cells: ["Travel", "45,000", "22,000", "−23,000"] },
      { cells: ["Facilities", "60,000", "61,200", "+1,200"] },
    ],
    notesLabel: "Notes from the shared drive:",
    notes:
      "two SaaS renewals hit in Q3 that were budgeted for Q4; one contractor invoice may be a duplicate — unconfirmed.",
    task: "Use AI to help draft the variance narrative, then tell us what you'd check or flag before you'd trust it enough to send.",
    rubric: `- Explains the main variance drivers clearly, in plain business language.
- Treats the AI draft as something to VERIFY, not send blindly.
- Catches the traps: (a) the SaaS timing shift is a Q4-into-Q3 reclassification, not true overspend; (b) the possible duplicate contractor invoice must be confirmed before finalizing.
- Flags data-accuracy checks (tie numbers to the ledger) and data-security/confidentiality (don't paste sensitive financials into unapproved AI tools).`,
  },
  sales: {
    roleLabel: "Sales Operations",
    track: "AI-Assisted Pipeline Reporting",
    heading: "Scenario — QBR At-Risk Deals Summary",
    intro:
      'Leadership wants a short "at-risk deals" summary for tomorrow\'s QBR, pulled from a messy CRM export:',
    columns: ["Deal", "Stage", "Amount", "Last touch"],
    rows: [
      { cells: ["Acme Corp", "Negotiation", "85,000", "41 days ago"] },
      { cells: ["Globex", "Proposal", "120,000", "6 days ago"] },
      { cells: ["Initech", "Negotiation", "54,000", "blank"], flagCol: 3 },
      { cells: ["Umbrella", "Closed-Won?", "70,000", "stage looks stale"], flagCol: 3 },
    ],
    notesLabel: "Notes:",
    notes:
      'the export includes customer contact names/emails; a couple of "amount" fields look rounded; some "last touch" dates are missing.',
    task: "Use AI to draft the at-risk summary, then tell us what you'd verify or flag before presenting it.",
    rubric: `- Produces a clear, decision-useful at-risk summary.
- Treats the AI draft as something to VERIFY against the actual CRM, not gospel.
- Catches the traps: missing/blank "last touch" dates make "at-risk" calls unreliable; the "Closed-Won?" stale stage needs confirmation; rounded amounts should be tied to source.
- Flags data-security/confidentiality: customer names/emails (PII) shouldn't be pasted into unapproved AI tools.`,
  },
  ops: {
    roleLabel: "Operations Analyst",
    track: "AI-Assisted Operations Reporting",
    heading: "Scenario — On-Time Delivery Dip",
    intro:
      "Your ops lead wants a short write-up on why on-time delivery (OTD) dropped last month, from this rough data:",
    columns: ["Week", "OTD %", "Orders", "Note"],
    rows: [
      { cells: ["W1", "96%", "1,240", ""] },
      { cells: ["W2", "94%", "1,190", ""] },
      { cells: ["W3", "81%", "1,405", "new carrier onboarded"], flagCol: 3 },
      { cells: ["W4", "88%", "1,310", "2 days of data missing"], flagCol: 3 },
    ],
    notesLabel: "Notes:",
    notes:
      "a new carrier was onboarded in W3; W4 is missing two days of scans; a holiday fell in W3.",
    task: "Use AI to draft the OTD write-up, then tell us what you'd verify or flag before you'd trust the conclusions.",
    rubric: `- Produces a clear, plain-language explanation of the OTD dip.
- Treats the AI draft as something to VERIFY, not gospel.
- Catches the traps: correlation vs. causation (new carrier AND a holiday both hit W3 — don't over-attribute); W4's missing data makes that number unreliable; higher W3 volume matters.
- Flags data-completeness checks before firm conclusions, and confidentiality if operational data is sensitive.`,
  },
};

export const DENISE_ROLE: RoleKey = "finance";

export const EXAMPLE_TASK =
  "I need to write the variance explanation for our Q3 close — actual operating expenses came in about 8% over budget, mostly in software subscriptions and contractor spend. I don't really know how to start it.";

export const STRONG_ANSWER_HINT =
  "A strong answer doesn't just paste the AI draft — it names what to double-check (tie numbers to the source, confirm the suspicious item), and mentions not putting sensitive data into unapproved tools.";

export const LEARNING_PATHS = [
  { name: "Google AI Essentials", prov: "Google", url: "https://grow.google/ai-essentials/" },
  { name: "AI Skills Navigator", prov: "Microsoft", url: "https://aiskillsnavigator.microsoft.com/" },
  { name: "Deep Learning Institute", prov: "NVIDIA", url: "https://www.nvidia.com/en-us/training/" },
  { name: "SkillsBuild", prov: "IBM", url: "https://skillsbuild.org/" },
  { name: "Skill Builder", prov: "AWS", url: "https://skillbuilder.aws/" },
  { name: "OpenAI Academy", prov: "OpenAI", url: "https://academy.openai.com/" },
  { name: "Anthropic Learning", prov: "Anthropic", url: "https://www.anthropic.com/learn" },
  { name: "Hugging Face Learn", prov: "Hugging Face", url: "https://huggingface.co/learn" },
];
