const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message, fileName) => {
  const time = format(new Date(), 'dd.MM.yyyy\tHH:mm:ss');
  const entry = `${time}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsp.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsp.appendFile(path.join(__dirname, '..', 'logs', fileName), entry);
  } catch (error) {
    console.error(error.message);
  }
};

const logger = (req, res, next) => {
  const message = `${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents(message, 'requests.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
