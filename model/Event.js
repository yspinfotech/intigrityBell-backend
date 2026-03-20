const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['holiday', 'notice', 'leave'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTimeHour: Number,
    startTimeMinute: Number,
    endTimeHour: Number,
    endTimeMinute: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
