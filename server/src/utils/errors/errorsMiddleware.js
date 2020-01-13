const boom = require('boom');
const logger = require('../logger');

const exitProcess = () => {
  logger.warn('exit process');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
};

/**
 * Catch 404 and forward to error handler
 */
const notFoundErrorHandler = (req, _res, next) => {
  next(boom.notFound(`${req.originalUrl} Not Found`));
};

/**
 * The 'unhandledRejection' event is emitted whenever a Promise is rejected and
 * no error handler is attached to the promise.
 */
const unhandledRejectionHandler = (reason, p) => {
  logger.error({
    reason,
    message: 'Unhandled Rejection at Promise',
    p,
  });
};

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript exception
 * bubbles all the way back to the event loop omitting Express.js error handler.
 * Ideally, this should not be happening as all errors should be correctly handled by Express.js.
 */
const uncaughtExceptionHandler = (err) => {
  logger.error(err);
  exitProcess();
};

/**
 * Custom error handler middleware
 * Decorate error object with additional data
 * WARNING: Must be defined last, after other app.use() and routes calls
 */
const errorDecorator = (err, req, _res, next) => {
  const serverErrorWithStack = err.statusCode >= 500 && err.stack !== undefined;

  /**
   * The 'statusCode' is missing (for non Boom errors only) - it is most likely a developer error
   * Default error code is set to 'Internal Server Error (500)'. Server will crash!
   */
  const nonBoomNoStatusCode = !err.isBoom && !err.statusCode;
  const originalMessage = err.message || null;

  const options = {
    decorate: {
      isDeveloperError: err.isDeveloperError || serverErrorWithStack || nonBoomNoStatusCode,
      originalUrl: req.originalUrl,
      method: req.method,
      ip: req.ip,
    },
    data: { stack: err.stack || 'n/a' },
  };

  // Decorate with additional properties from Boom
  boom.boomify(err, options);

  // Use original error message or otherwise Boom will set a default one
  if (originalMessage) {
    // eslint-disable-next-line no-param-reassign
    err.output.payload.message = originalMessage;
  }

  next(err);
};

/**
 * Custom error handling middleware - final
 * WARNING: Must be defined last, after other app.use(), routes calls
 * and all other error handling middleware
 */
const finalErrorHandler = (err, _req, res, next) => {
  /**
   * Delegate to the default Express error handler,
   * when the headers have already been sent to the client
   */
  if (res.headersSent) return next(err);

  // Log server errors only (no need to log 402, 403 etc.) and all developer/programmer errors
  if (err.isServer || err.isDeveloperError) {
    logger.error(err);
  }

  /**
   * Crash server in case of a developer error.
   * NOTE: a Node.js process manager should be set up to immediately restart the crashed server
   */
  if (err.isDeveloperError) {
    exitProcess();
  } else {
    return res.status(err.output.statusCode).json(err);
  }
  return {};
};

module.exports = {
  exitProcess,
  errorDecorator,
  finalErrorHandler,
  notFoundErrorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
};
