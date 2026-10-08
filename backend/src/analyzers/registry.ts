import type {
  AnalyzerLanguage,
  AnalyzerRequest,
  AnalyzerResult,
} from "../ai/types";

import { analyzeCode } from "./simple-analyzer";
import { analyzeTypeScript } from "./typescript-analyzer";

export async function runAnalyzer(
  request: AnalyzerRequest,
): Promise<AnalyzerResult> {
  if (request.language === "typescript") {
    return analyzeTypeScript(request);
  }

  return analyzeCode(request);
}

export function isSupportedLanguage(
  language: string,
): language is AnalyzerLanguage {
  const languages: AnalyzerLanguage[] = [
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

  return languages.includes(
    language as AnalyzerLanguage,
  );
}