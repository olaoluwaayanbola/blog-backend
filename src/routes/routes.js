const express = require('express');
const app = express();
const post = require("../controllers/post")

app.use("/api/users",post)

module.exports = app