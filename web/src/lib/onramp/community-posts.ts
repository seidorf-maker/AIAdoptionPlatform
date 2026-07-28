// Seed content for the Community tab demo. This is client-side mock data,
// not a real backend — matching how other not-yet-built surfaces in this
// app work (see ../mock-data.ts, ../../../CLAUDE.md §3 "not yet built").
// New posts/answers created in the UI live only in React state for the
// session; nothing here is persisted.

export type CommunityAnswer = {
  id: string;
  author: string;
  role: string;
  body: string;
  accepted?: boolean;
};

export type CommunityPost = {
  id: string;
  title: string;
  author: string;
  role: string;
  track: "Finance" | "Sales Operations" | "Operations";
  tags: string[];
  body: string;
  promptSnippet?: string;
  votes: number;
  answers: CommunityAnswer[];
};

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-variance-narrative",
    title: "The prompt I use to turn messy variance data into a clean narrative",
    author: "Denise Carter",
    role: "Senior Financial Analyst",
    track: "Finance",
    tags: ["prompt", "reporting", "variance"],
    votes: 14,
    body: "Every close, I used to spend an hour just staring at the budget-vs-actual table trying to figure out how to phrase the narrative. This is the prompt I land on now — I paste the raw table right after it, and the draft it gives me is usually 80% of the way there. I still tie every number back to the ledger before it goes anywhere, but it's saved me real time.",
    promptSnippet:
      "You're helping me draft a variance narrative for our close. Here's the budget vs. actual data: [paste table]. Write a short, plain-language narrative explaining the main drivers of variance. Flag anything that looks like a timing shift rather than real over/under-spend, and flag anything that looks like it might be a duplicate or data-entry error so I can verify it before I send this anywhere.",
    answers: [
      {
        id: "ans-1",
        author: "Marcus Webb",
        role: "Financial Analyst",
        body: "This is close to what I use, but I also add \"write it for a controller who has 30 seconds to read it\" at the end — cuts the fluff a lot.",
      },
      {
        id: "ans-2",
        author: "Priya Anand",
        role: "Senior Financial Analyst",
        body: "Adding the explicit 'flag anything that looks like a duplicate' instruction is the single most useful part of this. Caught a real duplicate invoice for me last quarter.",
        accepted: true,
      },
    ],
  },
  {
    id: "post-ticket-triage-agent",
    title: "Agent instructions for triaging inbound ops tickets by urgency",
    author: "Jordan Reyes",
    role: "Operations Analyst",
    track: "Operations",
    tags: ["agent-instructions", "triage", "workflow"],
    votes: 9,
    body: "We get a mixed bag of tickets (delivery delays, missing scans, carrier issues) and I was manually sorting them every morning. Wrote up these instructions for our team's AI assistant to do a first pass — it doesn't auto-close anything, just sorts and flags, and a person still reviews before anything goes out.",
    promptSnippet:
      "You are triaging inbound operations tickets. For each ticket, assign an urgency (High / Medium / Low) based on: customer-facing delay risk, whether multiple orders are affected, and whether a carrier or system-wide issue is implied. Never close or respond to a ticket yourself — only sort and add one line explaining your reasoning so a human can double-check it before acting.",
    answers: [
      {
        id: "ans-3",
        author: "Sam Okafor",
        role: "Operations Manager",
        body: "The 'never close it yourself, just sort and explain' line is doing a lot of work here — that's the difference between this being useful and this being a liability. Borrowing this.",
      },
    ],
  },
  {
    id: "post-qbr-at-risk-summary",
    title: "How I draft the QBR at-risk deals summary without leaking customer data",
    author: "Priya Anand",
    role: "Sales Operations",
    track: "Sales Operations",
    tags: ["prompt", "data-security", "pipeline"],
    votes: 11,
    body: "First time I did this I pasted the raw CRM export straight into a public AI tool — customer names, emails, everything. Didn't think about it until afterward. Now I strip names/emails to a deal ID before it goes anywhere, and I only ever use our approved tool for this, never a personal account. Sharing the prompt in case it saves someone else the same lesson.",
    promptSnippet:
      "Here is an anonymized pipeline export (deal ID, stage, amount, days since last touch — no customer names or contact info). Draft a short 'at-risk deals' summary for a QBR. Flag any deal with a stale stage or a long gap since last touch as needing a status check before we present it, rather than assuming the CRM stage is accurate.",
    answers: [
      {
        id: "ans-4",
        author: "Diego Fuentes",
        role: "Sales Operations Analyst",
        body: "Anonymizing to a deal ID first is a great habit — I'm stealing this for our team's default process, not just this one prompt.",
        accepted: true,
      },
      {
        id: "ans-5",
        author: "Denise Carter",
        role: "Senior Financial Analyst",
        body: "This is basically the same lesson from the finance side too — anonymize before it leaves an approved tool. Good pattern across tracks, not just sales.",
      },
    ],
  },
];
