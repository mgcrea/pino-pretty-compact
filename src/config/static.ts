export enum LOG_LEVEL {
  TRACE = 10,
  DEBUG = 20,
  INFO = 30,
  WARN = 40,
  ERROR = 50,
  FATAL = 60,
}

export const LOG_LEVEL_LABEL: Record<LOG_LEVEL, string> = {
  [LOG_LEVEL.TRACE]: 'trace',
  [LOG_LEVEL.DEBUG]: 'debug',
  [LOG_LEVEL.INFO]: ' info',
  [LOG_LEVEL.WARN]: ' warn',
  [LOG_LEVEL.ERROR]: 'error',
  [LOG_LEVEL.FATAL]: 'fatal',
};
