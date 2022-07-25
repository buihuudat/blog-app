require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const connect = require('./config/db');

const PORT = process.env.PORT || 5000;
const URL_DB = process.env.URL_DB;
const app = express();

const postsRouter = require('./routers/post');

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/', postsRouter);

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
  connect(URL_DB);
})

