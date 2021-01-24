import 'fastify';
import { prettifier } from '../prettifier';

declare module 'fastify' {
  interface FastifyLoggerOptions {
    prettifier: typeof prettifier;
  }
}
