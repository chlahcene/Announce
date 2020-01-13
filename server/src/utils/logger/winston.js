const appRoot = require('app-root-path');
const path = require('path');
const config = require('config');
// const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');

const { createLogger, transports, format } = winston;
const { combine, prettyPrint } = format;

const hasLogfile = config.get('app.logging.file');

const logDirectory = path.resolve(`${appRoot}`, 'logs');

/*
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
*/

/**
 * Define the custom settings for each transport (file, console)
 */
const debugOptions = {
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true,
  format: format.simple(),
};

const warnOptions = {
  level: 'warn',
  filename: path.resolve(logDirectory, 'warn.log'),
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  zippedArchive: true,
};

const errorOptions = {
  level: 'error',
  filename: path.resolve(logDirectory, 'error.log'),
  handleExceptions: true,
  json: true,
  maxSize: '20m',
  maxFiles: '30d', // keep logs for 14 days
  zippedArchive: true,
};

const infoOptions = {
  level: 'info',
  filename: path.resolve(logDirectory, 'info-%DATE%.log'),
  handleExceptions: true,
  json: true,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
};

const logOptions = {
  filename: path.resolve(logDirectory, 'app-%DATE%.log'),
  handleExceptions: true,
  json: true,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
};

const transport = [
  new transports.Console(debugOptions),
  ...(!hasLogfile
    ? []
    : [
        new transports.DailyRotateFile(infoOptions),
        new transports.File(warnOptions),
        new transports.File(errorOptions),
        new transports.DailyRotateFile(logOptions),
      ]),
];
/**
 * Instantiate a new Winston Logger with the settings defined above
 */
const logger = createLogger({
  format: combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
    prettyPrint(),
  ),
  transports: transport,
  exitOnError: false, // Do not exit on handled exceptions
});

/**
 * Create a 'stdout/stderr' stream object with a 'write' function that will be used by `morgan`
 */
logger.stream = {
  stdout: {
    // eslint-disable-next-line no-unused-vars
    write(message, encoding) {
      // Use the 'info' log level so the output will be picked up
      // By both transports (file and console)
      logger.info(message);
    },
  },
  stderr: {
    // eslint-disable-next-line no-unused-vars
    write(message, encoding) {
      // Use the 'error' log level so the output will be picked up
      // By both transports (file and console)
      logger.error(message);
    },
  },
};

module.exports = logger;
