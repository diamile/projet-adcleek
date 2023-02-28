const express = require('express');
const database = require('./database/database.js');
database.connect()
const app = express();
const cors = require('cors');
const {errorHandler} = require('./middlewares')
const router = require('./routes');

const generateMiddleWares = [
  cors({ "credentials": true,"origin": "*"}),
  errorHandler,
  express.json(),
  express.urlencoded({extends:true}),
  router
]
app.use(generateMiddleWares)

// database connect

module.exports = app;