import type {
  AnalyzerDiagnostic,
  AnalyzerLanguage,
  AnalyzerRequest,
  AnalyzerResult,
} from "../ai/types";

function createDiagnostic(
  diagnostic: AnalyzerDiagnostic,
): AnalyzerDiagnostic {
  return diagnostic;
}

function analyzeJavaScript(
  request: AnalyzerRequest,
): AnalyzerDiagnostic[] {
  const diagnostics: AnalyzerDiagnostic[] = [];

  const lines = request.code.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    const additionPattern =
      /return\s+([A-Za-z_$][\w$]*)\s*-\s*([A-Za-z_$][\w$]*)/;

    const match = line.match(additionPattern);

    if (match) {
      diagnostics.push(
        createDiagnostic({
          ruleId:
            "JS-ADD-SUBTRACTION-MISMATCH",

          title:
            "Possible addition/subtraction mismatch",

          message:
            "The function parameters are being subtracted. If this function is intended to add the two values, the return expression should use addition.",

          severity: "high",

          line: lineNumber,

          source: "static_analyzer",

          fixAvailable: true,

          suggestedFix:
            "Check whether the return expression should use + instead of -.",
        }),
      );
    }
  });

  return diagnostics;
}

function analyzePython(
  request: AnalyzerRequest,
): AnalyzerDiagnostic[] {
  const diagnostics: AnalyzerDiagnostic[] = [];

  const lines = request.code.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    if (
      line.includes("print(") &&
      line.includes("'") &&
      line.includes("+")
    ) {
      diagnostics.push(
        createDiagnostic({
          ruleId: "PY-POSSIBLE-CONCATENATION",

          title:
            "Possible string concatenation issue",

          message:
            "Check that the values being combined with + are compatible types.",

          severity: "medium",

          line: lineNumber,

          source: "static_analyzer",

          fixAvailable: false,
        }),
      );
    }
  });

  return diagnostics;
}

function analyzeGeneric(
  request: AnalyzerRequest,
): AnalyzerDiagnostic[] {
  const diagnostics: AnalyzerDiagnostic[] = [];

  const lines = request.code.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    if (line.length > 160) {
      diagnostics.push(
        createDiagnostic({
          ruleId: "GEN-LONG-LINE",

          title: "Very long line",

          message:
            "This line is unusually long and may be harder to read or maintain.",

          severity: "info",

          line: lineNumber,

          source: "linter",

          fixAvailable: false,
        }),
      );
    }
  });

  return diagnostics;
}

export async function analyzeCode(
  request: AnalyzerRequest,
): Promise<AnalyzerResult> {
  const startTime = Date.now();

  let diagnostics: AnalyzerDiagnostic[] = [];

  switch (request.language) {
    case "javascript":
    case "typescript":
      diagnostics = analyzeJavaScript(request);
      break;

    case "python":
      diagnostics = analyzePython(request);
      break;

    default:
      diagnostics = analyzeGeneric(request);
      break;
  }

  return {
    analyzerName: "FINDspidey Simple Analyzer",

    language: request.language,

    diagnostics,

    succeeded: true,

    executionTimeMs:
      Date.now() - startTime,
  };
}