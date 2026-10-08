import type { FastifyInstance } from "fastify";

import { askSpidey } from "../ai/offline-provider";
import { enforceEvidencePolicy } from "../ai/evidence-policy";
import { validateAnalyzeRequest } from "../security/validation";
import { checkRateLimit } from "../security/rate-limit";
import { verifyFindings } from "../verification/verifier";

export async function analyzeRoutes(
  app: FastifyInstance,
) {
  app.post(
    "/api/spidey/analyze",
    async (request, reply) => {
      const rateLimit = checkRateLimit(
        request.ip,
      );

      if (!rateLimit.allowed) {
        return reply.code(429).send({
          error: "Too many requests.",
          retryAfterSeconds:
            rateLimit.retryAfterSeconds,
        });
      }

      const validation =
        validateAnalyzeRequest(
          request.body,
        );

      if (!validation.valid) {
        return reply.code(400).send({
          error: validation.error,
        });
      }

      try {
        const response =
          await askSpidey(validation.data);

        const verification =
          verifyFindings(
            response.findings,
            validation.data.code ?? "",
          );

        const finalResponse =
          enforceEvidencePolicy({
            ...response,
            verification,
          });

        return reply.send(finalResponse);
      } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
          error:
            "FINDspidey could not analyze the request.",
        });
      }
    },
  );
}