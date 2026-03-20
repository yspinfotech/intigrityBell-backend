const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controller/taskController');
const { protect } = require('../middleware/auth');
const { admin, manager } = require('../middleware/role');

// GET all tasks (role-filtered) | POST create task (manager/admin only)
router.route('/')
    .get(protect, getTasks)
    .post(protect, manager, createTask);

// GET single task | PUT update task (anyone can update status/completion) | DELETE task (admin only)
router.route('/:id')
    .get(protect, getTaskById)
    .put(protect, updateTask)       // ✅ All authenticated users can update (status toggle)
    .delete(protect, admin, deleteTask);

module.exports = router;
