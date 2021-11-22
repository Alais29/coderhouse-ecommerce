import winston from 'winston';
import Config from 'config';

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;

const customFormat = printf(info => {
  return `${info.level}  | ${[info.timestamp]} | ${info.message}`;
});

const warnFilter = format(info => {
  return info.level.includes('warn') ? info : false;
});

const errorFilter = format(info => {
  return info.level.includes('error') ? info : false;
});

const logConfiguration = {
  level: 'info',
  format: combine(
    colorize(),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    printf(info => {
      return `${info.level}  | ${[info.timestamp]} | ${info.message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    Config.NODE_ENV !== 'test'
      ? new transports.File({
          filename: './logs/warn.log',
          level: 'warn',
          format: combine(warnFilter(), timestamp(), customFormat),
        })
      : new transports.Console({ level: 'warn' }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), customFormat),
    }),
  ],
};

export const logger = createLogger(logConfiguration);
