require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/users');
const bcrypt = require('bcryptjs');


//set up mongo
var mongoose = require('mongoose');
const mongoDb = process.env.DB_URL;
console.log(mongoDb)
mongoose.connect(mongoDb, {useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//passport setup
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      //check username
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      //check password
      bcrypt.compare(password, user.password, (err, res) => {
          if (res) {return done(null, user)} // passwords match! log user in
          else {return done(null, false, {msg: "Incorrect password"})} // passwords do not match!
      })
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session setup
app.use(session({ 
  secret: process.env.SECRET, 
  resave: false, 
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
