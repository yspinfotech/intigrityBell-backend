const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controller/userController');
const { protect } = require('../middleware/auth');
const { admin, manager } = require('../middleware/role');

router.route('/')
    .get(protect, manager, getUsers)
    .post(protect, admin, createUser);

router.route('/:id')
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

module.exports = router;
