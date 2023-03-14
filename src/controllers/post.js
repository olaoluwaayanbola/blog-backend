const express = require('express');
const Router = express.Router();
const Post = require('../models/post');
const rate_limiter = require('express-rate-limit');
const authorization = require('../services/authorization');
/**
 * @description
 * ---limits the rate at which a person can call an endpoint it is a simple security measure
 */
const rate_limit = rate_limiter({
   windowMs: 10 * 15 * 1000,
   max: 50,
});

/**
 * @description
 * ---this is where all the posts for a particular user is fetched
 */
Router.get('/posts', authorization, async (req, res, next) => {
   try {
      rate_limit(res, req, async () => {
         try {
            const user_post_data = await Post.find({ user: req.user });
            res.status(200).json({ user_post_data });
         } catch (error) {
            res.send(500).json({ message: error });
            next(error);
         }
      });
   } catch (err) {
      res.send(500).json({ message: err });
   }
});

/**
 * @description
 * ---This endpoint allows user to create a post
 */
Router.post('/post', authorization, async (req, res) => {
   try {
      const { title, content } = req.body;
      console.log(req.user);
      if (!title || !content) {
         return res
            .status(400)
            .json({ message: 'Title and content are required' });
      }
      const post = new Post({
         title,
         content,
         user: req.user,
      });
      await post.save();
      res.status(201).json({ message: 'Post created successfully', post });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
});

/**
 * @description
 * ---this is where a user can fetch a particular post
 */
Router.get('/post/:postId', authorization, async (req, res, next) => {
   try {
      const postId = req.params.postId;
      const postdata = await Post.find({ _id: postId, user: req.user });
      res.status(200).json({ postdata });
   } catch (error) {
      res.status(500).json({ message: error });
      next(error);
   }
});

/**
 * @description
 * ---this enpoint allows us to make updates to the post
 */
Router.put('/post/update/:postId', authorization, async (req, res, next) => {
   try {
      const postId = req.params.postId;
      const { title, content } = req.body;
      if (!title || !content) {
         return res
            .status(400)
            .json({ message: 'Title and content are required.' });
      }
      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({ message: 'Post not found.' });
      }
      if (post.user.toString() !== req.user) {
         return res
            .status(403)
            .json({ message: 'You are not authorized to update this post.' });
      }

      const user_data = await Post.updateOne(
         { _id: postId },
         { $set: { title, content } },
      );
      res.status(200).json({ user_data });
   } catch (error) {
      console.error(error);
      if (error.name === 'CastError') {
         return res.status(400).json({ message: 'Invalid post ID.' });
      }
      res.status(500).json({ message: error });
      next(error);
   }
});

/**
 * @description
 * ---this is endppoint allows you to delete aparticular post
 */
Router.delete('/post/delete/:postId', authorization, async (req, res, next) => {
   try {
      const postId = req.params.postId;
      const userId = req.user;
      const user_data = await Post.findByIdAndDelete({
         _id: postId,
         user: userId,
      });
      if (!user_data) {
         return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: erro, user_data });
   } catch (error) {
      res.status(500).json({ message: error });
      next(error);
   }
});

/**
 * @description
 *---this is endppoint allows you to delete all the users post
 */
Router.delete('/post/deleteall', authorization, async (req, res, next) => {
   try {
      const user_data = await Post.deleteMany({ user: req.user });
      res.status(200).json(user_data);
   } catch (error) {
      res.send(500).json({ message: error });
      next(error);
   }
});

/**
 * @description
 * ---this is handles the error  well im mot really handling it lol
 */
Router.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: err });
   next();
});

module.exports = Router;
