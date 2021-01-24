import chalk, { Chalk } from 'chalk';
import { LOG_LEVEL, LOG_LEVEL_LABEL } from '../config';

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

export const formatTime = (time: number): string => chalk.gray(new Date(time).toISOString());
export const formatLevel = (level: LOG_LEVEL): string => chalkForLevel(level)(LOG_LEVEL_LABEL[level]);
export const formatId = (id: string | number): string => chalk.magenta(`#${id}`);
export const formatModule = (module: string): string => chalk.gray(`(${module})`);
