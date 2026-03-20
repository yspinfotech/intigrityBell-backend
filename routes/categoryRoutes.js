const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controller/categoryController');
const { protect } = require('../middleware/auth');
const { admin, manager } = require('../middleware/role');

router.route('/')
    .get(protect, getCategories)
    .post(protect, admin, createCategory);

router.route('/:id')
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory);

module.exports = router;
