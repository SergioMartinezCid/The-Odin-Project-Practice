var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('./passport');
const publicViewsRouter = require('./routes/publicViewsRouter');
const loginRouter = require('./routes/loginRouter');
const privateViewsRouter = require('./routes/privateViewsRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', publicViewsRouter);
app.use('/login/', loginRouter);
app.use(express.static(path.join(__dirname, 'public/not_logged_in')));

app.use('/', passport.authenticate('jwt', {session: false}), privateViewsRouter);
app.use('/user/', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/post/', passport.authenticate('jwt', {session: false}), postRouter);
app.use(passport.authenticate('jwt', {session: false}), express.static(path.join(__dirname, 'public/logged_in')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
