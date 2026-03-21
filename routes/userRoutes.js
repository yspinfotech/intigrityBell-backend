const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, updateProfile } = require('../controller/userController');
const { protect } = require('../middleware/auth');
const { admin, manager } = require('../middleware/role');

// User profile update (own profile)
router.route('/profile')
    .put(protect, updateProfile);

// GET all users (manager/admin can see users; team needs it too for profile/assignment display)
// POST create user (admin only)
router.route('/')
    .get(protect, getUsers)          // ✅ All authenticated users can fetch user list
    .post(protect, admin, createUser);

// PUT update user | DELETE user (admin only)
router.route('/:id')
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

module.exports = router;
