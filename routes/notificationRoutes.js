const express = require('express');
const router = express.Router();
const { scheduleNotification } = require('../controller/notificationController');
const { protect } = require('../middleware/auth');

router.post('/schedule', protect, scheduleNotification);

module.exports = router;
