import { SerializedError } from 'pino';

export const isObject = (maybeObject: unknown): maybeObject is Record<string, unknown> =>
  typeof maybeObject === 'object' && maybeObject !== null;

export const isSerializedError = (maybeError: unknown): maybeError is SerializedError => {
  return isObject(maybeError) && !!maybeError.type && !!maybeError.message;
};
