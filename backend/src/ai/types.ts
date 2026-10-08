export type AnalyzerLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "c"
  | "cpp"
  | "csharp"
  | "go"
  | "rust"
  | "php"
  | "ruby"
  | "kotlin"
  | "swift"
  | "sql"
  | "bash"
  | "html"
  | "css";

export type AnalyzerSeverity =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "info";

export type AnalyzerSource =
  | "compiler"
  | "type_checker"
  | "linter"
  | "static_analyzer"
  | "parser";

export type AnalyzerDiagnostic = {
  ruleId: string;
  title: string;
  message: string;
  severity: AnalyzerSeverity;

  file?: string;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;

  source: AnalyzerSource;

  fixAvailable: boolean;
  suggestedFix?: string;
};

export type AnalyzerRequest = {
  language: AnalyzerLanguage;
  code: string;

  fileName?: string;
  projectId?: string;

  files?: Array<{
    path: string;
    content: string;
  }>;
};

export type AnalyzerResult = {
  analyzerName: string;
  language: AnalyzerLanguage;
  diagnostics: AnalyzerDiagnostic[];

  succeeded: boolean;
  executionTimeMs: number;

  stderr?: string;
  stdout?: string;
};

export type SpideyFinding = {
  ruleId: string;
  title: string;
  message: string;
  severity: AnalyzerSeverity;

  file?: string;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;

  source: AnalyzerSource;

  fixAvailable: boolean;
  suggestedFix?: string;
};

export type SpideyVerificationStatus =
  | "verified"
  | "probable"
  | "needs_more_context"
  | "unavailable";

export type SpideyVerification = {
  status: SpideyVerificationStatus;
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

  findings: SpideyFinding[];

  verification: SpideyVerification;
};

export type SpideyAnalyzeRequest = {
  question: string;

  code?: string;
  language?: AnalyzerLanguage;

  context?: string;

  fileName?: string;
  projectId?: string;

  files?: Array<{
    path: string;
    content: string;
  }>;

  revealSolution?: boolean;
};