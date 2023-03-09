const express = require('express');
const Post = require('../models/post');
const Router = express.Router();

Router.post('/post', async (req, res, next) => {
    try {
        const { title, content,user } = req.body
        const post = new Post({
            title,
            content,
            user
        })
        await post.save()
        res.status(200).json({ post })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

Router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err });
    next();
})
module.exports = Router;
