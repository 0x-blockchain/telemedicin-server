const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

routes(app);

module.exports = app;