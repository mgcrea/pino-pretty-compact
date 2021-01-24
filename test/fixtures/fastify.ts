import createFastify, { FastifyInstance, FastifyLoggerOptions, FastifyServerOptions } from 'fastify';
import prettifier from 'src/index';
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
  const fastify = createFastify({ logger, ...fastifyOptions });

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world', method: request.method });
  });

  fastify.post('/', (request, reply) => {
    reply.send({ hello: 'world', method: request.method });
  });

  return fastify;
};
