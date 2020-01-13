const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('config');
const cookieParser = require('cookie-parser');

const morganConfig = require('./utils/logger/morgan');
const routes = require('../routes');
const errors = require('./utils/errors');

const app = express();

/**
 * set all server things
 */
const env = process.env.NODE_ENV;
const port = config.get('app.port');
const hostname = config.get('app.host');

app.set('env', env);
app.set('port', port);
app.set('hostname', hostname);

/**
 * add middleware to parse the json
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * setting various HTTP headers
 */
app.use(helmet());

/**
 * When running Express app behind a proxy we need to detect client IP address correctly.
 * For NGINX the following must be configured 'proxy_set_header X-Forwarded-For $remote_addr;'
 * @link http://expressjs.com/en/guide/behind-proxies.html
 */
app.set('trust proxy', true);

/**
 * Set the static files location.
 */
app.use(express.static(`${__dirname}/../../client/public`));

/*
// secure cookie settings
const sessionSecret = process.env.SESSION_SECRET;
const sessionName = process.env.SESSION_NAME;
const sessionExpiresIn = parseInt(process.env.SESSION_EXPIRES_IN, 10);

app.use(
  session({
    secret: sessionSecret,
    name: sessionName,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // minimize risk of XSS attacks by restricting
      // the client from reading the cookie
      httpOnly: true,
      // only send cookie over https
      secure: true,
      // set cookie expiry length in ms
      maxAge: sessionExpiresIn,
    },
  }),
);
*/

/**
 * Set up routes
 */
routes.init(app);

/**
 * your centralized logger object
 */
app.use(morganConfig.stderrStream, morganConfig.stdoutStream);

/**
 * Catch 404 and forward to error handler
 */
app.use(errors.notFoundErrorHandler);

/**
 * The 'unhandledRejection' event is emitted whenever a Promise is rejected and
 * no error handler is attached to the promise.
 */
process.on('unhandledRejection', errors.unhandledRejectionHandler);

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript exception
 * bubbles all the way back to the event loop omitting Express.js error handler.
 */
process.on('uncaughtException', errors.uncaughtExceptionHandler);

/**
 * Decorate error object with additional data
 */
app.use(errors.errorDecorator);

/**
 * Custom error handling middleware - final
 * WARNING: Must be defined last, after other app.use(), routes calls
 * and all other error handling middleware
 */
app.use(errors.finalErrorHandler);

/**
 * return app
 */
module.exports = app;
