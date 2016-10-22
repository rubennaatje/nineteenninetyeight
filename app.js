var express = require('express');
var socket_io    = require( "socket.io" );
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var destroy = require('./models/glitch.js');
var routes = require('./routes/index');
var users = require('./routes/users');

// Express
var app          = express();

// Socket.io
var io           = socket_io();
app.io           = io;

process.setMaxListeners(1);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var counter =200;
setInterval(function() {
  counter--;
}, 1000);
var minutes = 3, the_interval = minutes * 60 * 1000;

setInterval(function() {
  console.log("I am doing my 10 minutes check");
  destroy.destroyByte(true,10,0.01,0.9,'xd.jpg', function (err, callback) {
    if (err) {
      console.log(err);
    } else {
      test(callback);
    }
  });
  counter = 200;
}, the_interval);

var minutes2 = 120, the_interval2 = minutes2 * 60 * 1000;
//every 4 hours
setInterval(function() {
  console.log("I am doing my 51 minutes check");
  destroy.saveImage( function (err, callback) {
    if (err) {
      console.log(err);
    } else {

    }
  });
}, the_interval2);

var test = function (picture) {
  console.log('sending');
  io.emit('newGlitch', { picture: picture, processvar: process.env.test,counter:counter});
};
io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('newGlitch', { picture: 'xd.jpg', processvar: process.env.test,counter:counter});
});
module.exports = app;
