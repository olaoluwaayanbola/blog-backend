const express = require('express');
const Router = express.Router();
const User = require('../models/auth');

Router.get("/:userId/users", async (req, res) => {
    try {
        const username = req.query.name
        const find = await User.find({ username })
        res.status(200).json({ find })
    } catch (error) {
        res.status(400).json({ message: "something went wrong" })
        next();
    }
})

module.exports = Router