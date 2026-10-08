import type {
  AnalyzerLanguage,
  SpideyAnalyzeRequest,
} from "../ai/types";

const supportedLanguages: AnalyzerLanguage[] = [
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "kotlin",
  "swift",
  "sql",
  "bash",
  "html",
  "css",
];

export function validateAnalyzeRequest(
  body: unknown,
):
  | {
      valid: true;
      data: SpideyAnalyzeRequest;
    }
  | {
      valid: false;
      error: string;
    } {
  if (!body || typeof body !== "object") {
    return {
      valid: false,
      error: "Request body must be an object.",
    };
  }

  const input = body as Record<
    string,
    unknown
  >;

  if (
    typeof input.question !== "string" ||
    input.question.trim() === ""
  ) {
    return {
      valid: false,
      error: "A question is required.",
    };
  }

  if (
    input.code !== undefined &&
    typeof input.code !== "string"
  ) {
    return {
      valid: false,
      error: "Code must be a string.",
    };
  }

  if (
    input.language !== undefined &&
    (
      typeof input.language !== "string" ||
      !supportedLanguages.includes(
        input.language as AnalyzerLanguage,
      )
    )
  ) {
    return {
      valid: false,
      error:
        "Unsupported programming language.",
    };
  }

  if (
    input.revealSolution !== undefined &&
    typeof input.revealSolution !== "boolean"
  ) {
    return {
      valid: false,
      error:
        "revealSolution must be a boolean.",
    };
  }

  return {
    valid: true,

    data: {
      question: input.question.trim(),

      code:
        typeof input.code === "string"
          ? input.code
          : undefined,

      language:
        input.language as
          | AnalyzerLanguage
          | undefined,

      context:
        typeof input.context === "string"
          ? input.context
          : undefined,

      fileName:
        typeof input.fileName === "string"
          ? input.fileName
          : undefined,

      projectId:
        typeof input.projectId === "string"
          ? input.projectId
          : undefined,

      files: Array.isArray(input.files)
        ? input.files as Array<{
            path: string;
            content: string;
          }>
        : undefined,

      revealSolution:
        input.revealSolution === true,
    },
  };
}