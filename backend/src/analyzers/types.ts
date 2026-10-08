import type {
  AnalyzerDiagnostic,
  AnalyzerLanguage,
  AnalyzerRequest,
  AnalyzerResult,
} from "../ai/types";

export type Analyzer = {
  name: string;

  languages: AnalyzerLanguage[];

  analyze(
    request: AnalyzerRequest,
  ): Promise<AnalyzerResult>;
};

export type {
  AnalyzerDiagnostic,
  AnalyzerLanguage,
  AnalyzerRequest,
  AnalyzerResult,
};