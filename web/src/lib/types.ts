export type CourseSource = "internal" | "linkedin_learning" | "other";
export type CourseStatus = "mocked" | "live";
export type SubmissionStatus =
  | "pending"
  | "graded"
  | "passed"
  | "failed"
  | "needs_review";
export type CertificationTier = "foundational" | "practitioner" | "advanced";

export interface Persona {
  id: string;
  fullName: string;
  jobTitle: string;
  department: string;
  orgName: string;
}

export interface Competency {
  id: string;
  name: string;
  proficiencyDescription: string;
}

export interface Course {
  id: string;
  title: string;
  source: CourseSource;
  status: CourseStatus;
  durationMinutes: number;
  competencyId: string;
  completed: boolean;
}

export interface LearningTrack {
  id: string;
  jobTitle: string;
  title: string;
  description: string;
  courseIds: string[];
}

export interface Assessment {
  id: string;
  competencyId: string;
  trackId: string;
  title: string;
  scenarioPrompt: string;
  rubricSummary: string;
}

export interface GradingResult {
  status: SubmissionStatus;
  headline: string;
  feedback: string[];
}

export interface Certification {
  id: string;
  verificationCode: string;
  holderName: string;
  orgName: string;
  competencyName: string;
  tier: CertificationTier;
  issuedAt: string;
}
