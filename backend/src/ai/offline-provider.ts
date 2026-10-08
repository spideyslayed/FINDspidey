import type {
  SpideyAnalyzeRequest,
  SpideyFinding,
  SpideyResponse,
} from "./types";

import { analyzeCode } from "../analyzers/simple-analyzer";

function normalizeLanguage(
  language: SpideyAnalyzeRequest["language"],
) {
  return language ?? "javascript";
}

function diagnosticsToFindings(
  diagnostics: Awaited<
    ReturnType<typeof analyzeCode>
  >["diagnostics"],
): SpideyFinding[] {
  return diagnostics.map((diagnostic) => ({
    ruleId: diagnostic.ruleId,
    title: diagnostic.title,
    message: diagnostic.message,
    severity: diagnostic.severity,

    file: diagnostic.file,
    line: diagnostic.line,
    column: diagnostic.column,
    endLine: diagnostic.endLine,
    endColumn: diagnostic.endColumn,

    source: diagnostic.source,

    fixAvailable: diagnostic.fixAvailable,
    suggestedFix: diagnostic.suggestedFix,
  }));
}

function buildSolution(
  findings: SpideyFinding[],
): string {
  if (findings.length === 0) {
    return "No specific fix is required based on the available analysis.";
  }

  return findings
    .filter((finding) => finding.suggestedFix)
    .map(
      (finding) =>
        `${finding.title}: ${finding.suggestedFix}`,
    )
    .join("\n");
}

export async function askOfflineSpidey(
  input: SpideyAnalyzeRequest,
): Promise<SpideyResponse> {
  if (!input.code || input.code.trim() === "") {
    return {
      answer:
        "I need the source code before I can analyze the problem.",

      problemSummary:
        "No source code was provided.",

      interpretation:
        "The question cannot be verified without code.",

      steps: [
        "Paste the relevant source code.",
        "Select the programming language.",
        "Run FINDspidey again.",
      ],

      missingContext: [
        "Source code",
        "Programming language",
      ],

      asksForSolution: false,
      solution: null,

      findings: [],

      verification: {
        status: "needs_more_context",

        explanation:
          "Source code is required for technical analysis.",

        evidence: [],
      },
    };
  }

  const language = normalizeLanguage(
    input.language,
  );

  const analysis = await analyzeCode({
    language,
    code: input.code,
    fileName: input.fileName,
    projectId: input.projectId,
    files: input.files,
  });

  const findings = diagnosticsToFindings(
    analysis.diagnostics,
  );

  const actualIssues = findings.filter(
    (finding) =>
      finding.severity !== "info",
  );

  const solution =
    input.revealSolution === true
      ? buildSolution(actualIssues)
      : null;

  const asksForSolution =
    input.revealSolution !== true &&
    actualIssues.length > 0;

  const problemSummary =
    actualIssues.length > 0
      ? `${actualIssues.length} potential issue${
          actualIssues.length === 1 ? "" : "s"
        } detected.`
      : "No known issues were detected.";

  const answer =
    actualIssues.length > 0
      ? "FINDspidey found potential issues in the submitted code."
      : "FINDspidey did not detect a known issue in the submitted code.";

  const steps =
    actualIssues.length > 0
      ? [
          "Review each reported finding.",
          "Check the affected line against the intended behavior.",
          "Apply the suggested fix if it matches your intended logic.",
          "Run your tests again after making the change.",
        ]
      : [
          "Review the code behavior against your expected result.",
          "Run your tests or reproduce the problem.",
          "Provide additional context if the issue continues.",
        ];

  const evidence = findings.map(
    (finding) => {
      const location =
        finding.line !== undefined
          ? `line ${finding.line}`
          : "an unspecified location";

      return `${finding.title} detected at ${location}.`;
    },
  );

  return {
    answer,

    problemSummary,

    interpretation:
      actualIssues.length > 0
        ? "The available analyzer evidence suggests that the reported code contains one or more potential issues."
        : "The available analyzer did not find a matching diagnostic.",

    steps,

    missingContext: [],

    asksForSolution,

    solution,

    findings,

    verification: {
      status:
        actualIssues.length > 0
          ? "probable"
          : "verified",

      explanation:
        actualIssues.length > 0
          ? "The analyzer produced technical evidence for the reported findings."
          : "The analyzer completed successfully without finding a known issue.",

      evidence,
    },
  };
}

export const askSpidey = askOfflineSpidey;