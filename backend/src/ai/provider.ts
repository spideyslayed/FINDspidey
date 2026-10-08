import type {
  SpideyAnalyzeRequest,
  SpideyResponse,
} from "./types";

export interface SpideyProvider {
  analyze(
    request: SpideyAnalyzeRequest,
  ): Promise<SpideyResponse>;
}