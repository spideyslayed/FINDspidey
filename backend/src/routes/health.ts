import type { FastifyInstance } from "fastify";

export async function healthRoutes(
  app: FastifyInstance,
) {
  app.get("/health", async () => {
    return {
      service: "FINDspidey API",
      status: "operational",
      timestamp: new Date().toISOString(),
    };
  });
}