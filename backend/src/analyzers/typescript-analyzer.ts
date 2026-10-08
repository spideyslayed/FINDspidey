import type {
  AnalyzerDiagnostic,
  AnalyzerRequest,
  AnalyzerResult,
} from "../ai/types";

export async function analyzeTypeScript(
  request: AnalyzerRequest,
): Promise<AnalyzerResult> {
  const startTime = Date.now();

  const diagnostics: AnalyzerDiagnostic[] = [];

  const lines = request.code.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    if (
      line.includes(": number") &&
      line.includes("= \"")
    ) {
      diagnostics.push({
        ruleId: "TS-TYPE-MISMATCH",

        title:
          "Possible TypeScript type mismatch",

        message:
          "A variable declared as number appears to receive a string value.",

        severity: "high",

        line: lineNumber,

        source: "type_checker",

        fixAvailable: true,

        suggestedFix:
          "Use a numeric value or change the declared type.",
      });
    }
  });

  return {
    analyzerName:
      "FINDspidey TypeScript Analyzer",

    language: "typescript",

    diagnostics,

    succeeded: true,

    executionTimeMs:
      Date.now() - startTime,
  };
}