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

export const DATE_FORMAT = 'yyyy-mm-dd HH:MM:ss.l o';

export const ERROR_LIKE_KEYS = ['err', 'error'];

export const MESSAGE_KEY = 'msg';

export const LEVEL_KEY = 'level';

export const LEVEL_LABEL = 'levelLabel';

export const TIMESTAMP_KEY = 'time';

export const LOGGER_KEYS = ['pid', 'hostname', 'name', 'level', 'time', 'timestamp', 'caller'];
