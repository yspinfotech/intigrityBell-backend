const Note = require('../model/Note');

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Please provide title and content' });
        }

        const note = await Note.create({
            title,
            content,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            data: note
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all notes for the logged in user
// @route   GET /api/notes
// @access  Private
const getNotesByUser = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        // Check ownership
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this note' });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        const updatedNote = await note.save();

        res.status(200).json({
            success: true,
            data: updatedNote
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        // Check ownership
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this note' });
        }

        await Note.deleteOne({ _id: note._id });

        res.status(200).json({
            success: true,
            data: { message: 'Note removed' }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createNote,
    getNotesByUser,
    updateNote,
    deleteNote
};
