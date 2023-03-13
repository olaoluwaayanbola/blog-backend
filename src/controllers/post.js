const express = require('express');
const Router = express.Router();
const Post = require('../models/post');
const rate_limiter = require('express-rate-limit');
const authorization = require('../services/authorization');
/**
 * @des
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
      res.send(500).json({ message: error });
   }
});

/**
 * @des
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
 * @des
 * ---this is where a user can fetch a particular post
 * im going to get a response from JWT with the user name ad id
 */
Router.get('/post/:postId', authorization, async (req, res, next) => {
   try {
      const postdata = await Post.find({ _id: req.user });
      res.status(200).json({ postdata });
   } catch (error) {
      res.send(500).json({ message: error });
      next(error);
   }
});

/**
 * @des
 * ---this is where all the posts for a particular user is sent
 * so im currently using the param to fetch the the post from the user
 */
Router.put('/post/update/:postId', authorization, async (req, res, next) => {
   try {
      const postId = req.params.postId;
      const { title, content } = req.body;
      const user_data = await Post.updateOne(
         { _id: postId },
         { $set: { title, content } },
      );
      res.status(200).json({ user_data });
   } catch (error) {
      res.send(500).json({ message: error });
      next(error);
   }
});

/**
 * @des
 * ---this is where all the posts for a particular user is sent
 * so im currently using the param to fetch the the post from the user
 */
Router.delete(
   '/:userId/post/delete/:postId',
   authorization,
   async (req, res, next) => {
      try {
         const postId = req.params.postId;
         const user_data = await Post.findByIdAndDelete({ _id: postId });
         res.status(200).json(user_data);
      } catch (error) {
         console.log(error);
         next();
      }
   },
);

/**
 * @des
 * ---this is where all the posts for a particular user is sent
 * so im currently using the param to fetch the the post from the user
 */
Router.delete(
   '/post/deleteall/:postId',
   authorization,
   async (req, res, next) => {
      try {
         const user_data = await Post.deleteMany({ user: req.user });
         res.status(200).json(user_data);
      } catch (error) {
         res.send(500).json({ message: error });
         next(error);
      }
   },
);

/**
 * @des
 * ---this is where all the posts for a particular user is sent
 * so im currently using the param to fetch the the post from the user
 */
Router.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: err });
   next();
});

module.exports = Router;
