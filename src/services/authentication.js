const saltRounds = 10;
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
/**
 * register new users
 */
Router.post('/signup', async (req, res, next) => {
   try {
      const { username, password, email } = req.body;
      /**
       * hash the users password
       */
      if (!username || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide both username and password' });
      }
      bcrypt.hash(password, saltRounds, async (err, hash) => {
         try {
            const newUser = new User({
               username: username,
               email: email,
               password: hash,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign(
               { userId: savedUser },
               process.env.SECRET_KEY,
               // {expiresIn:4hr}
            );
            res.status(201).json({ token });
         } catch (err) {
            res.status(500).json({ message: err });
         }
      });
   } catch (err) {
      next(err);
   }
});

/**
 * Login users
 */
Router.post('/login', async (req, res, next) => {
   try {
      const { username, password } = req.body;
      /**
       *@params 
       *  get the data from the server using the current username
       */
      if (!username || !password) {
         return res
            .status(400)
            .json({ message: 'Please provide both username and password' });
      }
      const userDb = await User.findOne({ username });
      if (!userDb) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }
      /**
       * authentication Logic
       */
      const validateUser = async (hash) => {
         bcrypt
            .compare(password, hash)
            .then(async (res) => {
               console.log(res);
            })
            .catch((err) => console.error(err.message));
      };
      const token = jwt.sign({ userDb }, process.env.SECRET_KEY)
      if (validateUser(userDb.password)) {
         return res.status(200).send({ message: "success", userDb, token });
      } else {
         return res.status(401).send({ message: "unauthorised" });
      }
   } catch (err) {
      next(err);
   }
});

Router.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: err });
   next();
});

module.exports = Router;
