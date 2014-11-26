var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var getSK = require('./routes/getSK');
var getPW_Details = require('./routes/getPW_Details');
var getPW_Episodes = require('./routes/getPW_Episodes');
var getPW_Links = require('./routes/getPW_Links');
var getPW_Video = require('./routes/getPW_Video');
var getBlank = require('./routes/getBlank');
var cpkConnect = require('./routes/cpkconnect');
var cpkUpdShow = require('./routes/cpkUpdShow');
var cpkLoadBins = require('./routes/cpkLoadBins');
var cpkAddFavorite = require('./routes/cpkAddFavorite');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//start databse schemas
require('./data/cpkShow')();
require('./data/cpkUser')();
require('./data/cpkUserProfile')();

app.use('/', routes);
app.use('/users', users);
app.use('/getSK', getSK);
app.use('/getPW_Details', getPW_Details);
app.use('/getPW_Episodes', getPW_Episodes);
app.use('/getPW_Links', getPW_Links);
app.use('/getPW_Video', getPW_Video);
app.use('/getBlank', getBlank);
app.use('/cpkconnect', cpkConnect);
app.use('/cpkUpdShow', cpkUpdShow);
app.use('/cpkLoadBins', cpkLoadBins);
app.use('/cpkAddFavorite', cpkAddFavorite);

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


module.exports = app;
