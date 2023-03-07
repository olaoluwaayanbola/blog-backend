const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// const Post = require('./routes/post');

/**
 * express.json() => parses in incoming responses to json
 * helmet => heprotects your application from common vulnerabilities
 * cors => Middleware enables cross origin resourse sharing by adding http header
 * morgan => enables you to get response from about a request like the usersInfo Location
 */
app.use(cors);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

/**
 * Middleware for the routes
 */
// app.use("/api/usersPost",Post )

app.get("/",(req,res) => {
    res.send("welcome to homepage")
    console.log("first")
})

app.listen(9000, () => {
   console.log(`listening on port 5000`);
});
