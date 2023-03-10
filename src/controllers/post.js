const express = require('express');
const Router = express.Router();
const Post = require('../models/post');

Router.get('/:userId/posts', async (req, res, next) => {
    try {
        const user = req.params.userId
        // find the post that coresponds
        const user_post_data = await Post.find({ user })
        res.status(200).json({ user_post_data })
    } catch (error) {
        console.log(error)
        next()
    }
})
Router.post('/:userId/post', async (req, res, next) => {
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
Router.get('/:userId/post/:postId', async (req, res, next) => {
    try {
        const params = req.params.postId
        const postdata = await Post.find({ _id: params })
        res.status(200).json({ postdata })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

Router.put('/:userId/post/update/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        const { title, content } = req.body
        const user_data = await Post.updateOne({ _id: postId }, { $set: { title: title, content: content } })
        res.status(200).json({ user_data })
    } catch (error) {
        console.log(error)
        next()
    }
})

Router.delete('/:userId/post/delete/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        const user_data = await Post.findByIdAndDelete({ _id: postId })
        res.status(200).json(user_data)
    } catch (error) {
        console.log(error)
        next()
    }
})

Router.delete('/:userId/post/deleteall/:postId', async (req, res, next) => {
    try {
        const _id = req.params.userId
        const user_data = await Post.deleteMany({user:_id})
        res.status(200).json(user_data)
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