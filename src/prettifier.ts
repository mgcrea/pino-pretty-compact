import chalk from 'chalk';
import type { PrettyOptions, SerializedError } from 'pino';
import { EOL } from 'os';
import { ERROR_LIKE_KEYS, LOG_LEVEL, MESSAGE_KEY, TIMESTAMP_KEY } from './config';
import { formatError, formatId, formatLevel, formatModule, formatTime, isSerializedError } from './utils';

export type LogObject = {
  level: LOG_LEVEL;
  time: number;
  msg: string;
  pid: number;
  hostname: string;
  reqId?: string | number;
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
  const { errorLikeObjectKeys = [] } = config;
  // console.dir({ config });
  return (object: LogObject) => {
    const { module, level, time, msg, pid, hostname, reqId } = object;
    // process.stdout.write(JSON.stringify(object) + EOL);

    const output = [formatTime(time), ' • ', formatLevel(level), ':'];
    if (reqId) {
      output.push(' ', formatId(reqId));
    }

    const firstErrorKey = errorLikeObjectKeys.find((key) => object[key] && isSerializedError(object[key]));
    if (firstErrorKey) {
      output.push(' ', formatError(object[firstErrorKey] as SerializedError));
    } else {
      output.push(' ', msg);
    }

    if (module) {
      output.push(' ', formatModule(module));
    }
    return output.concat(EOL).join('');
  };
};
