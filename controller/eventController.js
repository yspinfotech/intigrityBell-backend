const Event = require('../model/Event');

// @desc    Get all events (Holidays, Notices, Leaves)
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
    const events = await Event.find({}).populate('createdBy', 'name email');
    res.json(events);
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
const getEventById = async (req, res) => {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    const { title, description, type, date } = req.body;

    const event = await Event.create({
        title,
        description,
        type,
        date,
        createdBy: req.user._id
    });

    res.status(201).json(event);
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.type = req.body.type || event.type;
        event.date = req.body.date || event.date;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        await Event.deleteOne({ _id: event._id });
        res.json({ message: 'Event removed' });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
