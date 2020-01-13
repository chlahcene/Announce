const logger = require('../src/utils/logger');

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
    const routes = [];
    // eslint-disable-next-line no-underscore-dangle
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        routes.push(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
      }
    });
    const ans = JSON.stringify(routes, null, 2);
    logger.info(ans);
    res.status(200).send(ans);
  });
};

module.exports = {
  init,
};
