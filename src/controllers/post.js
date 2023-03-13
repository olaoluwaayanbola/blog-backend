const express = require('express');
const Router = express.Router();
const Post = require('../models/post');
const rate_limiter = require("express-rate-limit")

/**
 * @des
 * ---limits the rate at which a person can call an endpoint it is a simple security measure
 */
const rate_limit = rate_limiter({
    windowMs: 10 * 15 * 1000,
    max: 50
})

/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */
Router.get('/:userId/posts', async (req, res, next) => {
    rate_limit(res, req, async () => {
        try {
            const user = req.params.userId
            const user_post_data = await Post.findById({ _id: user })
            res.status(200).json({ user_post_data })
        } catch (error) {
            res.send(500).json({message: error})
            next(error)
        }
    })
})

/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */

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
        res.send(500).json({message: error})
        next(error)
    }
})
/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */
Router.get('/:userId/post/:postId', async (req, res, next) => {
    try {
        const params = req.params.postId
        const postdata = await Post.find({ _id: params })
        res.status(200).json({ postdata })
    } catch (error) {
        res.send(500).json({message: error})
        next(error)
    }
})
/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */
Router.put('/:userId/post/update/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        const { title, content } = req.body
        const user_data = await Post.updateOne({ _id: postId }, { $set: { title, content } })
        res.status(200).json({ user_data })
    } catch (error) {
        res.send(500).json({message: error})
        next(error)
    }
})
/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */
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
/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */
Router.delete('/:userId/post/deleteall/:postId', async (req, res, next) => {
    try {
        const _id = req.params.userId
        const user_data = await Post.deleteMany({ user: _id })
        res.status(200).json(user_data)
    } catch (error) {
        res.send(500).json({message: error})
        next(error)
    }
})
/**
 * @des
 * ---this is where all the posts for a particular user is sent 
 * so im currently using the param to fetch the the post from the user
 */
Router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err });
    next();
})

module.exports = Router;