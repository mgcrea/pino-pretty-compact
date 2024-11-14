import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import createFastify, { type FastifyInstance, type FastifyServerOptions } from "fastify";
import createError from "http-errors";
import { fsyncSync } from "node:fs";

type BuilfFastifyOptions = FastifyServerOptions;

const logger: FastifyServerOptions["logger"] = {
  level: "debug",
  transport: {
    target: require.resolve("./target.mjs"),
    options: {
      colorize: true,
      sync: true,
    },
  },
};

export const buildFastify = (options: BuilfFastifyOptions = {}): FastifyInstance => {
  const { ...fastifyOptions } = options;
  const fastify = createFastify({ logger, disableRequestLogging: true, ...fastifyOptions });

  fastify.register(fastifyRequestLogger);

  fastify.get("/", (request, reply) => {
    reply.send({ hello: "world", method: request.method });
  });

  fastify.get("/400", () => {
    throw createError(400);
  });

  fastify.get("/500", () => {
    throw createError(500);
  });

  fastify.post("/", (request, reply) => {
    request.log.info({ sessionId: "abcdef" }, "Created a new session");
    reply.send({ hello: "world", method: request.method });
  });
  fastify.get("/silent", (request, reply) => {
    request.log.info({ sessionId: "abcdef", silent: true }, "Created a new session");
    reply.send({ hello: "world", method: request.method });
  });

  return fastify;
};

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  fsyncSync(1);
});
process.on("unhandledRejection", (reason, _promise) => {
  console.error("unhandledRejection", reason);
  fsyncSync(1);
});
