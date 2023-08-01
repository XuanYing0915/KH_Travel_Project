var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
var flash = require('connect-flash');
var validator = require('express-validator');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//database
const db = require('./connections/mysql_config');

// session
var session = require('express-session');
app.use(express.static('public'));
app.use(
	session({ secret: 'mysupersecret', resave: true, saveUninitialized: true })
);
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// routes
var routes = require('./routes/index');
var login = require('./routes/login');
var messageBoard = require('./routes/messageBoard');
var signup = require('./routes/signup');
var user = require('./routes/user');
var testRouter = require('./routes/hotel/test'); //0731暫時來測試連接伺服器
// 景點路由
const attractionRouter = require('./routes/attraction/itinerary');
// 設定跨域 只接受3000port
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use('/', routes);
app.use('/login', login);
app.use('/signup', signup);
app.use('/test', testRouter); //0731暫時來測試連接伺服器

// 景點路由
app.use('/attraction/itinerary', attractionRouter);

// check login
app.use(function (req, res, next) {
	if (req.session.uid) {
		return next();
	}
	res.redirect('/');
});
app.use('/user', user);
app.use('/messageBoard', messageBoard);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
		});
	});
}
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err,
	});
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
	});
});
module.exports = app;
