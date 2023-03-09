const express = require('express');
const Post = require('../models/post');
const Router = express.Router();

Router.get(':userId/posts', async (req, res, next) => {
    try {
        // find the post that coresponds
        res.status(200).json({})
    } catch (error) {
        console.log(error)
        next(error)
    }
})
Router.post(':userId/post', async (req, res, next) => {
    try {
        const user = req.params.userId
        const { title, content } = req.body
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
Router.post(':userId/post/:postId', async (req, res, next) => {
    try {
        const user = req.params.userId
        const { title, content } = req.body
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

Router.put(':userId/post/:postId', async (req, res, next) => {
    try {
      
        res.status(200).json({})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

Router.delete(':userId/post/:postId', async (req, res, next) => {
    try {
        res.status(200).json({ })
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