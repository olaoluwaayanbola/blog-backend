const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

/** ==> dont forget to add some configuration */
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

module.exports = app;
