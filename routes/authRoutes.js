const express = require('express');
const router = express.Router();
const { authUser } = require('../controller/authController');

router.post('/login', authUser);

module.exports = router;
