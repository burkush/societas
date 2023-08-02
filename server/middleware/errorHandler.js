const { logEvents } = require('./logger');
const ApiError = require('../exceptions/apiError');

const errorHandler = (err, req, res, next) => {
  const message = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents(message, 'errors.log');
  console.error('Error: ', err.message);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Unhandled exception' });
};

module.exports = errorHandler;
