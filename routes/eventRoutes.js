const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controller/eventController');
const { protect } = require('../middleware/auth');
const { admin, manager } = require('../middleware/role');

router.route('/')
    .get(protect, getEvents)
    .post(protect, manager, createEvent);

router.route('/:id')
    .get(protect, getEventById)
    .put(protect, manager, updateEvent)
    .delete(protect, admin, deleteEvent);

module.exports = router;
