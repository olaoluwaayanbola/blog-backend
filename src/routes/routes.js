const express = require('express');
const app = express();
const post = require('../controllers/post');
const auth = require('../services/authentication');
const user = require('../controllers/users');

app.use('/auth', auth);
app.use('/users', post);
app.use('/get_users', user);

module.exports = app;
