const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:8081'}));
routes(app);


module.exports = app;