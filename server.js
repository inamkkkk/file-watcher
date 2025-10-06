const express = require('express');
const watcherRoutes = require('./routes/watcherRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const config = require('./utils/config');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/watcher', watcherRoutes);

app.use(errorHandler);

const watchedDirectory = config.watchedDirectory;

if (!fs.existsSync(watchedDirectory)) {
  fs.mkdirSync(watchedDirectory, { recursive: true });
  logger.info(`Created directory: ${watchedDirectory}`);
}

const watcher = chokidar.watch(watchedDirectory, {
  ignored: /(^|[\/])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', filePath => {
    logger.info(`File added: ${filePath}`);
  })
  .on('change', filePath => {
    logger.info(`File changed: ${filePath}`);
  })
  .on('unlink', filePath => {
    logger.info(`File deleted: ${filePath}`);
  })
  .on('error', error => logger.error(`Watcher error: ${error}`))
  .on('ready', () => logger.info(`Watcher ready! Watching: ${watchedDirectory}`))
  .on('raw', (event, path, details) => { // Internal events
    // logger.info('Raw event info:', event, path, details);
  });

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});