import type { SerializedError } from "pino-std-serializers";

export const isObject = (maybeObject: unknown): maybeObject is Record<string, unknown> =>
  typeof maybeObject === "object" && maybeObject !== null;

export const isSerializedError = (maybeError: unknown): maybeError is SerializedError => {
  return isObject(maybeError) && !!maybeError["message"];
};

export const serializeError = (message: unknown): SerializedError => {
  const raw = new Error(String(message));
  return {
    type: "Error",
    message: String(message),
    stack: String(raw.stack),
    raw,
  };
};
