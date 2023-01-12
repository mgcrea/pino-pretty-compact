import * as color from "kolorist";
import type { SerializedError } from "pino";
import { LOG_LEVEL, LOG_LEVEL_LABEL } from "../config";

const CWD = process.cwd();
const CWD_REGEX = new RegExp(CWD, "g");

export const colorForLevel = (level: number) => {
  switch (level) {
    case LOG_LEVEL.TRACE:
      return color.gray;
    case LOG_LEVEL.DEBUG:
      return color.cyan;
    case LOG_LEVEL.INFO:
      return color.green;
    case LOG_LEVEL.WARN:
      return color.yellow;
    case LOG_LEVEL.ERROR:
      return (...args: Parameters<typeof color.bold>) => color.bold(color.red(...args));
    case LOG_LEVEL.FATAL:
      return (...args: Parameters<typeof color.bold>) => color.bold(color.bgRed(...args));
    default:
      return color.white;
  }
};
export const colorMsgForLevel = (level: number) => {
  switch (level) {
    case LOG_LEVEL.TRACE:
      return color.gray;
    case LOG_LEVEL.DEBUG:
      return color.white;
    case LOG_LEVEL.INFO:
      return color.white;
    case LOG_LEVEL.WARN:
      return color.yellow;
    case LOG_LEVEL.ERROR:
      return (...args: Parameters<typeof color.bold>) => color.bold(color.red(...args));
    case LOG_LEVEL.FATAL:
      return (...args: Parameters<typeof color.bold>) => color.bold(color.bgRed(...args));
    default:
      return color.white;
  }
};

import { EOL } from "os";
export const formatTime = (time: number): string => new Date(time).toISOString();
export const colorizeTime = (time: string): string => color.gray(time);
export const formatLevel = (level: LOG_LEVEL): string => colorForLevel(level)(LOG_LEVEL_LABEL[level]);
export const formatProcessId = (pid: number): string => color.magenta(`*${pid}`);
export const formatHostname = (hostname: string | number): string => color.gray(`@${hostname}`);
export const formatSessionId = (id: string | number): string => color.magenta(`%${id}`);
export const formatRequestId = (id: string | number): string => color.magenta(`#${id}`);
export const formatPlugin = (plugin: string): string => color.gray(`(${plugin})`);
export const formatErrorStack = (stack: string): string =>
  color.gray(stack.replace(CWD_REGEX, ".").split(EOL).slice(1).join(EOL));

export const formatError = (error: SerializedError): string => {
  const { statusCode = 500, type = error["name"], stack = `${EOL}    at ???` } = error;
  const supportsArt = color.options.supportLevel === 2; /* SupportLevel.ansi256 */
  const icon = supportsArt ? "×" : "x";

  const isInternalError = !statusCode || statusCode >= 500;
  const output = [color[isInternalError ? "red" : "yellow"](`${icon}${type} `), color.magenta(statusCode)];

  if (isInternalError) {
    output.push(color.red(`: ${error.message}`), EOL, formatErrorStack(stack));
  } else {
    output.push(`: ${error.message}`);
  }
  return output.join("");
};
