import * as color from "kolorist";
import { EOL } from "os";
import type { LogDescriptor } from "pino";
import type PinoPretty from "pino-pretty";
import prettifier from "pino-pretty";
import type { LOG_LEVEL } from "./config";
import {
  colorJson,
  colorMsgForLevel,
  formatError,
  formatHostname,
  formatLevel,
  formatPlugin,
  formatProcessId,
  formatRequestId,
  formatSessionId,
  isSerializedError,
  serializeError,
} from "./utils";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface LogObject extends LogDescriptor {
  level: LOG_LEVEL;
  time: number;
  msg: string;
  pid: number;
  hostname: string;
  reqId?: string | number;
  sessionId?: string | number;
  plugin?: string;
  silent?: boolean;
  [s: string]: unknown;
}

const defaultOptions /*: PinoPretty.PrettyOptions*/ = {
  ignore: "pid,hostname",
  colorize: color.options.enabled,
  errorLikeObjectKeys: ["error", "err"],
  singleLine: true,
  hideObject: true,
  translateTime: "yyyy-mm-dd'T'HH:MM:sso",
};

type PrettyOptions = PinoPretty.PrettyOptions;

const prettifyTime = (inputData: string) => color.gray(String(inputData));

export const build = (options: PinoPretty.PrettyOptions) => {
  const {
    errorLikeObjectKeys = defaultOptions.errorLikeObjectKeys,
    ignore = defaultOptions.ignore,
    colorize = defaultOptions.colorize,
  } = options;
  const ignoredKeys = ignore.split(",");

  // Force colorize
  if (colorize && !color.options.enabled) {
    color.options.enabled = true;
    color.options.supportLevel = 2; /* SupportLevel.ansi256 */
  }

  const messageFormat: PrettyOptions["messageFormat"] = (log, messageKey, _leveLabel) => {
    const { level, time, msg, reqId, sessionId, plugin, silent, ...otherProps } = log as LogObject;
    if (silent) {
      return "";
    }
    const output = [];
    // Fastify request id
    if (!ignoredKeys.includes("reqId") && reqId) {
      output.push(formatRequestId(reqId), " ");
    }
    // Fastify session id
    if (!ignoredKeys.includes("sessionId") && sessionId) {
      output.push(formatSessionId(sessionId), " ");
    }
    // Message or error
    const firstErrorKey = errorLikeObjectKeys.find((key) => log[key]);
    if (firstErrorKey) {
      const error = log[firstErrorKey];
      const serializedError = isSerializedError(error) ? error : serializeError(error);
      output.push(formatError(serializedError, level), EOL);
    } else {
      const formattedMsg = colorMsgForLevel(level)(String(log[messageKey]));
      output.push(formattedMsg);
    }
    // Fastify plugin name
    if (!ignoredKeys.includes("plugin") && plugin) {
      output.push(" ", formatPlugin(plugin));
    }
    // Other props
    const outputProps = Object.keys(otherProps).reduce<Record<string, unknown>>((soFar, key) => {
      if (errorLikeObjectKeys.includes(key) || ignoredKeys.includes(key) || ["req", "res"].includes(key)) {
        return soFar;
      }
      soFar[key] = otherProps[key];
      return soFar;
    }, {});
    if (Object.keys(outputProps).length > 0) {
      output.push(" ", colorJson(outputProps));
    }
    return output.concat(EOL).join("");
  };

  const customPrettifiers = {
    time: prettifyTime,
    level: formatLevel,
    hostname: formatHostname,
    pid: formatProcessId,
  } as unknown as NonNullable<PrettyOptions["customPrettifiers"]>;

  return prettifier({
    ...defaultOptions,
    customPrettifiers,
    messageFormat,
    ...options,
    colorize: false,
  });
};
