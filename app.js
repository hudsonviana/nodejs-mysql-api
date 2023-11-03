const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

module.exports = app;
