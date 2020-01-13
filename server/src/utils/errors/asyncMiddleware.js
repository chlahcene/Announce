const boom = require('boom');

/**
 * Wrapper for our async route handlers
 * @param {*} fn
 */
const asyncMiddleware = (fn) => (req, res, next) =>
  // eslint-disable-next-line consistent-return
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) {
      // eslint-disable-next-line promise/no-callback-in-promise
      return next(boom.badImplementation(err));
    }
    // eslint-disable-next-line promise/no-callback-in-promise
    next(err);
  });

module.exports = asyncMiddleware;
