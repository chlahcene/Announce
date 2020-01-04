const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../config/logger.config')();
const routes = require('../routes');

const app = express();

// set all server things
const env = process.env.ENV;
const port = process.env.PORT;
const hostname = process.env.HOST;

app.set('env', env);
app.set('port', port);
app.set('hostname', hostname);

// add middleware to parse the json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setting various HTTP headers
app.use(helmet());
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
// Set up routes
routes.init(app);

// your centralized logger object
app.use(morgan('dev'));

/**
 * add the route to app and start the server
 */
app.start = () => {
  // start server
  app.listen(port, () => {
    logger.info(`server listening on - http://${hostname}:${port}`);
  });
};

/**
 * stop the server
 */
app.stopApp = (done) => {
  // stop
  logger.info(`stop server`);
  app.stop(done);
};

/**
 * return app
 */
module.exports = app;
