import type { SpideyResponse } from "./types";

export function isSpideyResponse(
  value: unknown,
): value is SpideyResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    typeof response.answer === "string" &&
    typeof response.problemSummary === "string" &&
    typeof response.interpretation === "string" &&
    Array.isArray(response.steps) &&
    Array.isArray(response.missingContext) &&
    typeof response.asksForSolution === "boolean" &&
    Array.isArray(response.findings) &&
    typeof response.verification === "object"
  );
}