import OpenAI from "openai";

import type {
  SpideyAnalyzeRequest,
  SpideyResponse,
} from "./types";

import { buildSystemPrompt } from "./system-prompt";
import { isSpideyResponse } from "./response-schema";

export class OpenAIProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
    });
  }

  async analyze(
    request: SpideyAnalyzeRequest,
  ): Promise<SpideyResponse> {
    const response =
      await this.client.responses.create({
        model:
          process.env.OPENAI_MODEL ??
          "gpt-5-mini",

        instructions:
          buildSystemPrompt(),

        input: JSON.stringify({
          question: request.question,
          language: request.language,
          code: request.code,
          context: request.context,
        }),
      });

    const text =
      response.output_text.trim();

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(
        "OpenAI returned an invalid JSON response.",
      );
    }

    if (!isSpideyResponse(parsed)) {
      throw new Error(
        "OpenAI response does not match the FINDspidey response schema.",
      );
    }

    return parsed;
  }
}