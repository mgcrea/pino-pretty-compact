import type { SerializedError } from "pino-std-serializers";

export const isObject = (maybeObject: unknown): maybeObject is Record<string, unknown> =>
  typeof maybeObject === "object" && maybeObject !== null;

export const isString = (maybeString: unknown): maybeString is string => typeof maybeString === "string";

export const isValidError = (maybeError: unknown): maybeError is Error => {
  return (
    isObject(maybeError) &&
    "message" in maybeError &&
    isString(maybeError["message"]) &&
    "stack" in maybeError &&
    isString(maybeError["stack"])
  );
};

export const isSerializedError = (maybeError: unknown): maybeError is SerializedError => {
  return isObject(maybeError) && "raw" in maybeError && maybeError["raw"] instanceof Error;
};

export const serializeError = (maybeError: unknown): SerializedError => {
  const raw = isValidError(maybeError) ? maybeError : new Error(String(maybeError));
  return {
    type: "Error",
    message: raw.message,
    stack: String(raw.stack),
    raw,
  };
};
