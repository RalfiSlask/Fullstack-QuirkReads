var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

dotenv.config();

MongoClient.connect(process.env.DB_URL)
  .then((client) => {
    console.log('We are connected to database');

    const db = client.db('matthias-nilsson');
    app.locals.db = db;
  })
  .catch((err) => {
    console.log(err, 'could not connect to database');
    process.exit(1);
  });

var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter);

module.exports = app;
