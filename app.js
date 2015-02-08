// DEPENDENCIES
// ================================================
// require packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./routes/router.js');




// SERVER CONFIGURATION
// ================================================
// create server
var app = express();

// pretty JSON
app.set('json spaces', 4);

// where to serve static content
app.use(express.static(path.join(__dirname, 'public')));

// serve up custom favicon
app.use(favicon(__dirname + '/public/favicon.ico'));




// MIDDLEWARE CONFIGURATION
// ================================================
app.use(logger('dev'));
// for parsing posts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));





// DATABASE
// ================================================
// connect to database
mongoose.connect('mongodb://localhost/ratings');




// API
// ================================================
// All routes will be prefixed with /api
app.use('/api', router);




// ERROR HANDLING
// ================================================

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
    res.status(err.status || 500)
      .send('error', {
        message: err.message,
        error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .send('error', {
      message: err.message,
      error: {}
    });
});





// export app
module.exports = app;