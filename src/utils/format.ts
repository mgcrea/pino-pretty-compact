import chalk, { Chalk } from 'chalk';
import { SerializedError } from 'pino';
import { LOG_LEVEL, LOG_LEVEL_LABEL } from '../config';

const CWD = process.cwd();
const CWD_REGEX = new RegExp(CWD, 'g');

const chalkForLevel = (level: number): Chalk => {
  switch (level) {
    case LOG_LEVEL.TRACE:
      return chalk.gray;
    case LOG_LEVEL.DEBUG:
      return chalk.cyan;
    case LOG_LEVEL.INFO:
      return chalk.green;
    case LOG_LEVEL.WARN:
      return chalk.yellow;
    case LOG_LEVEL.ERROR:
      return chalk.bold.red;
    case LOG_LEVEL.FATAL:
      return chalk.white.bgRed.bold;
    default:
      return chalk.white;
  }
};

import { EOL } from 'os';
export const formatTime = (time: number): string => new Date(time).toISOString();
export const colorizeTime = (time: string): string => chalk.gray(time);
export const formatLevel = (level: LOG_LEVEL): string => chalkForLevel(level)(LOG_LEVEL_LABEL[level]);
export const formatProcessId = (pid: number): string => chalk.magenta(`*${pid}`);
export const formatHostname = (hostname: string | number): string => chalk.gray(`@${hostname}`);
export const formatSessionId = (id: string | number): string => chalk.magenta(`%${id}`);
export const formatRequestId = (id: string | number): string => chalk.magenta(`#${id}`);
export const formatModule = (module: string): string => chalk.gray(`(${module})`);
export const formatErrorStack = (stack: string): string =>
  chalk.gray(stack.replace(CWD_REGEX, '.').split(EOL).slice(1).join(EOL));
export const formatError = (error: SerializedError): string => {
  const { statusCode = 500, type = error.name, stack = `${EOL}    at ???` } = error;

  const isInternalError = !statusCode || statusCode >= 500;
  const output = [chalk[isInternalError ? 'red' : 'yellow'](`×${type} `), chalk.magenta(statusCode)];

  if (isInternalError) {
    output.push(chalk.red(`: ${error.message}`), EOL, formatErrorStack(stack));
  } else {
    output.push(`: ${error.message}`);
  }
  return output.join('');
};
