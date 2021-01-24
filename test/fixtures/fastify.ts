import createFastify, { FastifyInstance, FastifyLoggerOptions, FastifyServerOptions } from 'fastify';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import prettifier from 'src/index';
import createError from 'http-errors';
import 'src/typings';

type BuilfFastifyOptions = FastifyServerOptions;

const logger: FastifyLoggerOptions = {
  level: 'debug',
  prettifier,
  prettyPrint: {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: 'yyyy-mm-dd HH:MM:ss.l',
    levelFirst: true,
  },
};

export const buildFastify = (options: BuilfFastifyOptions = {}): FastifyInstance => {
  const { ...fastifyOptions } = options;
  const fastify = createFastify({ logger, disableRequestLogging: true, ...fastifyOptions });

  fastify.register(fastifyRequestLogger);

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world', method: request.method });
  });

  fastify.get('/400', async (request, reply) => {
    throw createError(400);
  });

  fastify.get('/500', async (request, reply) => {
    throw createError(500);
  });

  fastify.post('/', (request, reply) => {
    reply.send({ hello: 'world', method: request.method });
  });

  return fastify;
};
