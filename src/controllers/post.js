const express = require('express');
const postchema = require('../models/post');
const Router = express.Router();

Router.get('/', (req, res) => {
   res.send('hello world!');
   console.log('hello world!');
});

module.exports = Router;
