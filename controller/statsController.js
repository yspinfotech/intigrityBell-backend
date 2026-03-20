const Task = require('../model/Task');
const User = require('../model/User');
const Event = require('../model/Event');

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Manager
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTasks = await Task.countDocuments();
        const totalEvents = await Event.countDocuments();
        
        const completedTasks = await Task.countDocuments({ status: 'completed' });
        const pendingTasks = await Task.countDocuments({ status: 'pending' });
        
        const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        res.json({
            totalUsers,
            totalTasks,
            totalEvents,
            completedTasks,
            pendingTasks,
            taskCompletionRate: Math.round(taskCompletionRate)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
