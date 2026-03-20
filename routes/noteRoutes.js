const express = require('express');
const router = express.Router();
const {
    createNote,
    getNotesByUser,
    updateNote,
    deleteNote
} = require('../controller/noteController');
const { protect } = require('../middleware/auth');

// POST create note | GET user notes
router.route('/')
    .post(protect, createNote)
    .get(protect, getNotesByUser);

// PUT update note | DELETE note
router.route('/:id')
    .put(protect, updateNote)
    .delete(protect, deleteNote);

module.exports = router;
