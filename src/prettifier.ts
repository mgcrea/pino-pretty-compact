import chalk from 'chalk';
import { EOL } from 'os';
import type { PrettyOptions, SerializedError } from 'pino';
import { ERROR_LIKE_KEYS, LOG_LEVEL, MESSAGE_KEY, TIMESTAMP_KEY, OS_HOSTNAME } from './config';
import {
  chalkJson,
  colorizeTime,
  formatError,
  formatHostname,
  formatLevel,
  formatProcessId,
  formatRequestId,
  formatSessionId,
  formatTime,
  isSerializedError,
} from './utils';

export type LogObject = {
  level: LOG_LEVEL;
  time: number;
  msg: string;
  pid: number;
  hostname: string;
  reqId?: string | number;
  sessionId?: string | number;
  module?: string;
  [s: string]: unknown;
};

const defaultOptions: PrettyOptions = {
  colorize: Boolean(chalk.supportsColor),
  crlf: EOL === '\r\n',
  errorLikeObjectKeys: ERROR_LIKE_KEYS,
  errorProps: '',
  levelFirst: false,
  messageKey: MESSAGE_KEY,
  messageFormat: false,
  timestampKey: TIMESTAMP_KEY,
  translateTime: false,
};

export const prettifier = (options: PrettyOptions = {}): ((object: LogObject) => string) => {
  const config = { ...defaultOptions, ...options };
  const { errorLikeObjectKeys = [], ignore = '' } = config;
  const ignoredKeys = ignore.split(',');
  // console.dir({ config });
  const PAD_START = ''.padStart(formatTime(0).length);
  return (object: LogObject) => {
    // Generic
    const { level, time, msg, pid, hostname, reqId, sessionId, ...otherProps } = object;
    // process.stdout.write(JSON.stringify(object) + EOL);
    const formattedTime = formatTime(time);
    const output = [colorizeTime(formattedTime)];
    if (!ignoredKeys.includes('pid')) {
      output.push(' ', formatProcessId(pid));
    }
    if (!ignoredKeys.includes('hostname')) {
      output.push(' ', formatHostname(OS_HOSTNAME || hostname));
    }
    output.push(' - ');
    if (!ignoredKeys.includes('level')) {
      output.push(formatLevel(level), ':');
    }
    // Fastify session id
    if (!ignoredKeys.includes('reqId') && reqId) {
      output.push(' ', formatRequestId(reqId));
    }
    // Fastify request id
    if (!ignoredKeys.includes('sessionId') && sessionId) {
      output.push(' ', formatSessionId(sessionId));
    }
    // Message or error
    const firstErrorKey = errorLikeObjectKeys.find((key) => object[key] && isSerializedError(object[key]));
    if (firstErrorKey) {
      output.push(' ', msg, EOL, PAD_START, ' ', formatError(object[firstErrorKey] as SerializedError));
    } else {
      output.push(' ', msg);
    }
    // Other props
    const outputProps = Object.keys(otherProps).reduce<Record<string, unknown>>((soFar, key) => {
      if (errorLikeObjectKeys.includes(key) || ignoredKeys.includes(key)) {
        return soFar;
      }
      soFar[key] = otherProps[key];
      return soFar;
    }, {});
    if (Object.keys(outputProps).length > 0) {
      output.push(EOL, PAD_START, ' & ', chalkJson(outputProps));
    }
    return output.concat(EOL).join('');
  };
};
