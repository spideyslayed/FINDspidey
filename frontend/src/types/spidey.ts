export type Severity =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "info";

export type VerificationStatus =
  | "verified"
  | "probable"
  | "needs_more_context"
  | "unavailable";

export type Finding = {
  ruleId: string;
  title: string;
  message: string;
  severity: Severity;

  file?: string;
  line?: number;
  column?: number;

  source: string;

  fixAvailable: boolean;
  suggestedFix?: string;
};

export type Verification = {
  status: VerificationStatus;
  explanation: string;
  evidence: string[];
};

export type SpideyResponse = {
  answer: string;
  problemSummary: string;
  interpretation: string;

  steps: string[];

  missingContext: string[];

  asksForSolution: boolean;
  solution: string | null;

  findings: Finding[];

  verification: Verification;
};

export type AnalyzeRequest = {
  question: string;
  code: string;
  language: string;
  revealSolution: boolean;
};