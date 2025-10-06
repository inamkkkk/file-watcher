const express = require('express');
const watcherController = require('../controllers/watcherController');

const router = express.Router();

router.get('/status', watcherController.getStatus);

module.exports = router;