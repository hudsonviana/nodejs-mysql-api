const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use('/posts', postsRoute);
app.use('/user', userRoute);

module.exports = app;
