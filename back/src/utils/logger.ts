import winston from 'winston';

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
    new transports.File({
      filename: './logs/warn.log',
      level: 'warn',
      format: combine(warnFilter(), timestamp(), customFormat),
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), customFormat),
    }),
  ],
};

export const logger = createLogger(logConfiguration);
