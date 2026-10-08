import Fastify from "fastify";
import cors from "@fastify/cors";

import { healthRoutes } from "./routes/health";
import { analyzeRoutes } from "./routes/analyze";

const app = Fastify({
  logger: true,
});

async function startServer() {
  try {
    await app.register(cors, {
      origin: true,
    });

    await app.register(healthRoutes);
    await app.register(analyzeRoutes);

    const port = Number(
      process.env.PORT ?? 4000,
    );

    const host =
      process.env.HOST ?? "127.0.0.1";

    await app.listen({
      port,
      host,
    });

    console.log(
      `FINDspidey API started on http://${host}:${port}`,
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

startServer();