const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const middlewares = require('./middleware/middleware');

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
