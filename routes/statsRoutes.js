const express = require('express');
const router = express.Router();
const { getStats } = require('../controller/statsController');
const { protect } = require('../middleware/auth');
const { manager } = require('../middleware/role');

router.get('/', protect, manager, getStats);

module.exports = router;
