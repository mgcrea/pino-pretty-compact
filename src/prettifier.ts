import { PrettyOptions } from 'fastify/types/logger';
import { EOL } from 'os';
import { LOG_LEVEL } from './config';
import { formatId, formatLevel, formatModule, formatTime } from './utils';

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

export const prettifier = (_options: PrettyOptions): ((object: LogObject) => string) => {
  // console.dir({ _options });
  return (object: LogObject) => {
    const { module, level, time, msg, pid, hostname, reqId } = object;
    // process.stdout.write(JSON.stringify(object) + EOL);
    const output = [formatTime(time), ' • ', formatLevel(level), ':'];
    if (reqId) {
      output.push(' ', formatId(reqId));
    }
    output.push(' ', msg);
    if (module) {
      output.push(' ', formatModule(module));
    }
    return output.concat(EOL).join('');
  };
};
