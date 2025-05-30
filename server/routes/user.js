const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const router = express.Router();
const { User } = require('../models/todoModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(403).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userMade = await User.create({
            name,
            username,
            password: hashedPassword
        });

        if (userMade) {
            return res.status(200).json({ msg: "User successfully created" });
        }

        res.status(500).json({ msg: "Something went wrong during signup" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(403).json({ msg: "User does not exist" });
        }


        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign(
            { username: existingUser.username, _id: existingUser._id },
            process.env.JWT_PASS,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

module.exports = router;
