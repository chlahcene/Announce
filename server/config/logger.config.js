/*
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'sample' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({
      filename: 'quick-start-error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'quick-start-combined.log' }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}
*/

/**
 * return logger with service name
 * @param {service name} nameService
 */
const createLog = (nameService = 'app') => {
  // logger.defaultMeta.service = nameService;
  // eslint-disable-next-line no-console
  console.log(nameService);
  const info = (...args) => {
    // eslint-disable-next-line no-console
    console.log(...args);
  };

  return {
    info,
  };
};

module.exports = createLog;
