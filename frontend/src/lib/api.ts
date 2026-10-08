import type {
  AnalyzeRequest,
  SpideyResponse,
} from "../types/spidey";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:4000";

export async function analyzeCode(
  request: AnalyzeRequest,
): Promise<SpideyResponse> {
  const response = await fetch(
    `${API_URL}/api/spidey/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    let message =
      "FINDspidey could not analyze the code.";

    try {
      const error = await response.json();

      if (typeof error.error === "string") {
        message = error.error;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return response.json();
}