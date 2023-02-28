
const express = require('express');
const app = express()
const {appConfig} = require('./configs');
const router = require('../src/routes')
require('../src/database');

const cors = require('cors');
const {errorHandler} = require('./middlewares/errorHandler')
const db = require('../src/database/database');

db.init();

console.log(`Environment: ${process.env.NODE_ENV || 'none'}` )
console.log(`API Port => ${appConfig.PORT}` )


const generalMiddlewares = [
    cors({
      "credentials": true,
      "origin": "*"
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    router,
    errorHandler
]

app.use(generalMiddlewares);

const PORT =  process.env.PORT || appConfig.PORT || 3002
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

