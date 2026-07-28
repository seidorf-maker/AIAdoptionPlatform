// Seed data for the gamification/leaderboard demo. Client-side mock data
// only — see ../mock-data.ts for the existing convention. Two deliberately
// separate views:
//
// 1. Business-unit standings: always aggregate, never names an individual
//    employee. This is what a manager sees for leadership tracking.
// 2. Individual standings: opt-in only, off by default, and even when
//    opted in this only ever shows positive achievement (certifications,
//    points, streaks) — never a failed attempt or a needs_review status.
//    See CLAUDE.md §7 for why that line doesn't move even with opt-in.

export type BusinessUnitStanding = {
  unit: string;
  participants: number;
  completionRate: number; // 0-100
  certificationsEarned: number;
};

export const BUSINESS_UNIT_STANDINGS: BusinessUnitStanding[] = [
  { unit: "Corporate Accounting", participants: 34, completionRate: 82, certificationsEarned: 41 },
  { unit: "Sales Operations", participants: 28, completionRate: 71, certificationsEarned: 26 },
  { unit: "Operations", participants: 22, completionRate: 65, certificationsEarned: 19 },
  { unit: "Customer Success", participants: 19, completionRate: 58, certificationsEarned: 14 },
];

export type OptedInIndividual = {
  name: string;
  role: string;
  points: number;
  certificationsEarned: number;
  streakWeeks: number;
};

// Other demo employees who have already opted in — used to show the
// signed-in user what the opt-in leaderboard looks like when they join it.
export const OTHER_OPTED_IN: OptedInIndividual[] = [
  { name: "Priya Anand", role: "Senior Financial Analyst", points: 340, certificationsEarned: 3, streakWeeks: 6 },
  { name: "Marcus Webb", role: "Financial Analyst", points: 210, certificationsEarned: 2, streakWeeks: 3 },
  { name: "Diego Fuentes", role: "Sales Operations Analyst", points: 180, certificationsEarned: 2, streakWeeks: 2 },
  { name: "Jordan Reyes", role: "Operations Analyst", points: 150, certificationsEarned: 1, streakWeeks: 4 },
];
