const Task = require('../model/Task');

const getTasks = async (req, res) => {
    let query = {};
    
    // Role-based filtering
    if (req.user.role === 'team') {
        query = { assignedTo: req.user._id };
    } else if (req.user.role === 'manager') {
        // Managers can see all tasks they assigned or all tasks in general?
        // User requirement: "Manager -> All team member tasks"
        // For now, we'll allow managers to see everything, or filter to tasks assigned BY them.
        // Let's go with all tasks for simplicity, matching the "All team member tasks" requirement.
        query = {}; 
    }

    const tasks = await Task.find(query)
        .populate('assignedBy', 'name email')
        .populate('assignedTo', 'name email')
        .populate('categoryId', 'name');
    res.json(tasks);
};

const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id)
        .populate('assignedBy', 'name email')
        .populate('assignedTo', 'name email')
        .populate('categoryId', 'name');
    
    if (task) {
        // Check authorization for team members
        if (req.user.role === 'team' && task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this task' });
        }
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const createTask = async (req, res) => {
    const { title, description, assignedTo, dueDate, priority, categoryId } = req.body;

    const task = await Task.create({
        title,
        description,
        assignedBy: req.user._id, // Automatic from auth middleware
        assignedTo,
        dueDate,
        priority,
        categoryId
    });

    res.status(201).json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.assignedTo = req.body.assignedTo || task.assignedTo;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.priority = req.body.priority || task.priority;
        task.categoryId = req.body.categoryId || task.categoryId;
        task.status = req.body.status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        await Task.deleteOne({ _id: task._id });
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
