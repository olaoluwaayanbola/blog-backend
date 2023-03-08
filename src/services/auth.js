const express = require('express');
const Router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require('../models/auth');
/**
 * register new users
 */
Router.post('/signup', async (req, res) => {
    const saltRounds = 10
    try {
        const { username, password } = req.body;
        /**
         * hash the users password
         */
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            try{
                console.log('Hash: ', hash)
                const newUser = new User({
                    username: username,
                    password: hash,
                });
                const savedUser = await newUser.save();
                res.status(201).json({ user: savedUser });
                const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
            }catch(err) {
                console.log(err)
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * Login users
 */
Router.get('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        /**
         * get the data from the server using the current username
         */
        const userDb = await User.findOne({ username });
        if (!userDb) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        /**
         * authentication Logic
         */
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = Router;
