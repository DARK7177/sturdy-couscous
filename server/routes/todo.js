const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { Todo } = require('../models/todoModel');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json(todos);
    } catch (e) {
        res.status(500).json({ msg: "Server error" });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTodo = await Todo.create({
            title,
            description,
            user: req.user._id
        });

        res.status(201).json({ msg: "Todo created successfully", todo: newTodo });
    } catch (e) {
        res.status(400).json({ msg: "Error creating todo" });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findOne({ _id: id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        // Only update the fields passed in the request body
        Object.assign(todo, req.body);
        await todo.save();

        res.status(200).json({ msg: "Todo updated successfully", todo });
    } catch (e) {
        res.status(400).json({ msg: "Error updating todo" });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({ msg: "Todo deleted successfully" });
    } catch (e) {
        res.status(400).json({ msg: "Error deleting todo" });
    }
});

module.exports = router;
