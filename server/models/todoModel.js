const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { User, Todo }