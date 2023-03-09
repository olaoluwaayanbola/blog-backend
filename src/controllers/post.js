const express = require('express');
const Post = require('../models/post');
const Router = express.Router();

Router.post('/post', async (req, res) => {
    try {
        const { title, content } = req.body
        const post = new Post({
            title,
            content
        })
        post.save()
        res.status(200).json({post})
    } catch (error) {
        cosnole.log(error)
    }
});

module.exports = Router;
