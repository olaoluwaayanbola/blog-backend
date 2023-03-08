const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const dotenv = require('dotenv');
const middlewares = require('./routes/middleware');
const routes = require('./routes/routes');

/**
 *
 */
dotenv.config();
dbConnection();

/**
 * middleware routes
 */
app.use(middlewares);

// routes
app.use(routes);

app.listen(9000, () => {
   console.log(`listening on port 9000`);
});
