const morgan = require('morgan');
const winston = require('./winston');

const stderrStream = (req, res, next) => {
  morgan('combined', {
    skip() {
      return res.statusCode < 400;
    },
    stream: winston.stream.stderr,
  });
  next();
};

const stdoutStream = (req, res, next) => {
  morgan('combined', {
    skip() {
      return res.statusCode >= 400;
    },
    stream: winston.stream.stdout,
  });
  next();
};

const morgandev = () => {
  return morgan('dev');
  // next();
};

const morgantest = () => {
  return morgan(
    '{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}',
  );
};

module.exports = {
  stderrStream,
  stdoutStream,
  morgandev,
  morgantest,
};
