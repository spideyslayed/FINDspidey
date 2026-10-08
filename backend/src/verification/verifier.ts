import type {
  SpideyFinding,
  SpideyVerification,
} from "../ai/types";

export function verifyFindings(
  findings: SpideyFinding[],
  code: string,
): SpideyVerification {
  if (!code.trim()) {
    return {
      status: "needs_more_context",

      explanation:
        "Source code is required before a bug can be verified.",

      evidence: [],
    };
  }

  if (findings.length === 0) {
    return {
      status: "verified",

      explanation:
        "No known issues were detected by the available analyzers.",

      evidence: [
        "The submitted source code was analyzed successfully.",
        "No matching analyzer diagnostics were found.",
      ],
    };
  }

  const evidence = findings.map(
    (finding) => {
      const location =
        finding.line !== undefined
          ? `line ${finding.line}`
          : "unknown location";

      return `${finding.title} detected at ${location}.`;
    },
  );

  return {
    status: "probable",

    explanation:
      "The analyzer found one or more potential issues. Review the findings against the intended behavior of the code.",

    evidence,
  };
}