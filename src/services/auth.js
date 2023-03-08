const User = require('../models/auth');
const express = require('express');
const Router = express.Router();
/**
 * register new users
 */
Router.post('/signup', async (req, res) => {
   try {
      const { username, password } = req.body;
      /**
       * hash the users password
       */
      const salt = await bycrypt.genSalt();
      const hashedPassword = await bycrypt.hashPassword(password, salt);

      /**
       * create a new user
       */
      const newUser = new User({
         username: username,
         password: hashedPassword,
      });
      /**
       * send data to mongodb or more like it saves the user data to momngo db
       */
      const savedUser = await newUser.save();
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
