# File Watcher

A simple Node.js application that watches a directory for file changes and logs them.

## Usage

1.  Install dependencies: `npm install`
2.  Configure the directory to watch and the log file path in `utils/config.js`.
3.  Run the application: `node server.js`

## Project Structure


.
├── controllers
│   └── watcherController.js
├── middlewares
│   └── errorHandler.js
├── routes
│   └── watcherRoutes.js
├── server.js
└── utils
    ├── config.js
    └── logger.js


## Dependencies

*   chokidar
*   express
*   winston
