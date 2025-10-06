const logger = require('../utils/logger');

exports.getStatus = (req, res) => {
  logger.info('Watcher status requested');
  res.json({ status: 'running' });
};