import chalk, { supportsColor } from 'chalk';
import { EOL } from 'os';
import type { LogDescriptor, SerializedError } from 'pino';
import prettifier from 'pino-pretty';
import type { LOG_LEVEL } from './config';
import type PinoPretty from 'pino-pretty';
import {
  chalkJson,
  chalkMsgForLevel,
  formatError,
  formatHostname,
  formatLevel,
  formatPlugin,
  formatProcessId,
  formatRequestId,
  formatSessionId,
  isSerializedError,
} from './utils';

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

const defaultOptions /* : PinoPretty.PrettyOptions */ = {
  ignore: 'pid,hostname',
  colorize: Boolean(supportsColor),
  errorLikeObjectKeys: ['error', 'err'],
  singleLine: true,
  hideObject: true,
  translateTime: "yyyy-mm-dd'T'HH:MM:sso",
};

const prettifyTime: PinoPretty.Prettifier = (inputData) => chalk.gray(inputData);

export const build = (options: PinoPretty.PrettyOptions) => {
  const { errorLikeObjectKeys = defaultOptions.errorLikeObjectKeys, ignore = defaultOptions.ignore } = options;
  const ignoredKeys = ignore.split(',');

  const messageFormat: PinoPretty.MessageFormatFunc = (log, messageKey, _leveLabel) => {
    const { level, time, msg, reqId, sessionId, plugin, silent, ...otherProps } = log as LogObject;
    if (silent) {
      return '';
    }
    const output = [];
    // Fastify request id
    if (!ignoredKeys.includes('reqId') && reqId) {
      output.push(formatRequestId(reqId), ' ');
    }
    // Fastify session id
    if (!ignoredKeys.includes('sessionId') && sessionId) {
      output.push(formatSessionId(sessionId), ' ');
    }
    // Message or error
    const firstErrorKey = errorLikeObjectKeys.find((key) => log[key] && isSerializedError(log[key]));
    const formattedMsg = chalkMsgForLevel(level)(log[messageKey]);
    if (firstErrorKey) {
      output.push(formattedMsg, EOL, ' ', formatError(log[firstErrorKey] as SerializedError), EOL);
    } else {
      output.push(formattedMsg);
    }
    // Fastify plugin name
    if (!ignoredKeys.includes('plugin') && plugin) {
      output.push(' ', formatPlugin(plugin));
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
      output.push(' ', chalkJson(outputProps));
    }
    return output.concat(EOL).join('');
  };

  return prettifier({
    ...defaultOptions,
    customPrettifiers: {
      time: prettifyTime,
      level: formatLevel as unknown as PinoPretty.Prettifier,
      hostname: formatHostname as unknown as PinoPretty.Prettifier,
      pid: formatProcessId as unknown as PinoPretty.Prettifier,
    },
    messageFormat,
    ...options,
  });
};
