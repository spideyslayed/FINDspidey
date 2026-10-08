import type { SpideyResponse } from "./types";

const technicalEvidenceSources = new Set([
  "compiler",
  "type_checker",
  "linter",
  "static_analyzer",
  "parser",
]);

export function enforceEvidencePolicy(
  response: SpideyResponse,
): SpideyResponse {
  const hasTechnicalEvidence = response.findings.some(
    (finding) =>
      technicalEvidenceSources.has(finding.source),
  );

  if (!hasTechnicalEvidence) {
    return {
      ...response,

      verification: {
        ...response.verification,

        status: "needs_more_context",

        explanation:
          "FINDspidey did not obtain sufficient technical evidence to verify a bug.",
      },
    };
  }

  return response;
}