const Category = require('../model/Category');

const getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
};

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name, description });
    res.status(201).json(category);
};

const updateCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = req.body.name || category.name;
        category.description = req.body.description !== undefined ? req.body.description : category.description;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
};

const deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await Category.deleteOne({ _id: category._id });
        res.json({ message: 'Category removed' });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
