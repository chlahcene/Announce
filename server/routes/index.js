const logger = require('../config/logger.config')();
/**
 * add server all the routes
 * @param {app} app
 */
const init = (app) => {
  app.get('*', (req, res, next) => {
    logger.info(`Request was made to: ${req.originalUrl}`);
    return next();
  });

  /**
   * route /api
   */
  app.get('/api', (req, res) => {
    res.status(200).send('api');
  });
};

module.exports = {
  init,
};
