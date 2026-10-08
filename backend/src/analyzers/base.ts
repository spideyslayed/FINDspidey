import type {
  Analyzer,
  AnalyzerLanguage,
} from "./types";

export abstract class BaseAnalyzer
  implements Analyzer
{
  abstract name: string;

  abstract languages: AnalyzerLanguage[];

  abstract analyze(
    request: Parameters<
      Analyzer["analyze"]
    >[0],
  ): ReturnType<Analyzer["analyze"]>;

  supports(
    language: AnalyzerLanguage,
  ): boolean {
    return this.languages.includes(language);
  }
}