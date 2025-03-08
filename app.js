var createError = require('http-errors');
let { rateLimit } = require('express-rate-limit')
var express = require('express');
var path = require('path');
let cors = require('cors');

require('dotenv').config({
  path: './.env'
})

require('./db/mongodb')();
var logger = require('morgan');
var indexRouter = require('./api/routes');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false
})

app.use(limiter)
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}))

app.use('/api/v1', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

process.on('exit', (error) => {
  console.log(error)
})

module.exports = app;
