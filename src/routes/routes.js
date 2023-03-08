const express = require('express');
const app = express();
const post = require('../controllers/post');
const auth = require('../services/auth');

app.use('/api/users', post);
app.use('/auth', auth);

module.exports = app;
