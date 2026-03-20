const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controller/taskController');
const { protect } = require('../middleware/auth');
const { admin, manager } = require('../middleware/role');

router.route('/')
    .get(protect, getTasks)
    .post(protect, manager, createTask);

router.route('/:id')
    .get(protect, getTaskById)
    .put(protect, manager, updateTask)
    .delete(protect, admin, deleteTask);

module.exports = router;
