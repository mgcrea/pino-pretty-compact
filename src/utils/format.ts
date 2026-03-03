import pc from "picocolors";
import type { SerializedError } from "pino";
import { LOG_LEVEL, LOG_LEVEL_LABEL } from "../config";

const CWD = process.cwd();
const CWD_REGEX = new RegExp(CWD, "g");

export const colorForLevel = (level: LOG_LEVEL) => {
  switch (level) {
    case LOG_LEVEL.TRACE:
      return pc.gray;
    case LOG_LEVEL.DEBUG:
      return pc.cyan;
    case LOG_LEVEL.INFO:
      return pc.green;
    case LOG_LEVEL.WARN:
      return pc.yellow;
    case LOG_LEVEL.ERROR:
      return (s: string) => pc.bold(pc.red(s));
    case LOG_LEVEL.FATAL:
      return (s: string) => pc.bold(pc.bgRed(s));
    default:
      return pc.white;
  }
};
export const colorMsgForLevel = (level: LOG_LEVEL) => {
  switch (level) {
    case LOG_LEVEL.TRACE:
      return pc.gray;
    case LOG_LEVEL.DEBUG:
      return pc.white;
    case LOG_LEVEL.INFO:
      return pc.white;
    case LOG_LEVEL.WARN:
      return pc.yellow;
    case LOG_LEVEL.ERROR:
      return (s: string) => pc.bold(pc.red(s));
    case LOG_LEVEL.FATAL:
      return (s: string) => pc.bold(pc.bgRed(s));
    default:
      return pc.white;
  }
};

import { EOL } from "os";
export const formatTime = (time: number): string => new Date(time).toISOString();
export const colorizeTime = (time: string): string => pc.gray(time);
export const formatLevel = (level: LOG_LEVEL): string => colorForLevel(level)(LOG_LEVEL_LABEL[level]);
export const formatProcessId = (pid: number): string => pc.magenta(`*${pid}`);
export const formatHostname = (hostname: string | number): string => pc.gray(`@${hostname}`);
export const formatSessionId = (id: string | number): string => pc.magenta(`%${id}`);
export const formatRequestId = (id: string | number): string => pc.magenta(`#${id}`);
export const formatPlugin = (plugin: string): string => pc.gray(`(${plugin})`);
export const formatErrorStack = (stack: string): string =>
  pc.gray(stack.replace(CWD_REGEX, ".").split(EOL).slice(1).join(EOL));

export const formatError = (error: SerializedError, level: LOG_LEVEL): string => {
  const { statusCode = 500, type = String(error["name"]), stack = `${EOL}    at ???` } = error;
  const supportsArt =
    process.env["COLORTERM"] === "truecolor" ||
    process.env["COLORTERM"] === "24bit" ||
    (process.env["TERM"] ?? "").includes("256color");
  const icon = supportsArt ? "×" : "x";

  const isInternalError = !statusCode || statusCode >= 500;
  const output = [pc[isInternalError ? "red" : "yellow"](`${icon}${type} `), pc.magenta(String(statusCode))];

  if (isInternalError) {
    output.push(colorForLevel(level)(`: ${error.message}`), EOL, formatErrorStack(stack));
  } else {
    output.push(`: ${error.message}`);
  }
  return output.join("");
};
