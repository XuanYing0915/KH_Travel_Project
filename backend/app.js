<<<<<<< HEAD
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var app = express();
const cors = require("cors");
var flash = require("connect-flash");
var validator = require("express-validator");
=======
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
>>>>>>> origin/main
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//database
const db = require("./connections/mysql_config");
// session
<<<<<<< HEAD
var session = require("express-session");
app.use(express.static("public"));
app.use(
  session({ secret: "mysupersecret", resave: true, saveUninitialized: true })
);
app.use(flash());
app.use(logger("dev"));
=======
var session = require('express-session');
app.use(express.static('public'));
app.use(
	session({ secret: 'mysupersecret', resave: true, saveUninitialized: true })
);
app.use(flash());
app.use(logger('dev'));
>>>>>>> origin/main
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// routes
var routes = require("./routes/index");
var login = require("./routes/login");
var messageBoard = require("./routes/messageBoard");
var signup = require("./routes/signup");
var user = require("./routes/user");
=======
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// routes
var routes = require('./routes/index');
var login = require('./routes/login');
var messageBoard = require('./routes/messageBoard');
var signup = require('./routes/signup');
var user = require('./routes/user');
>>>>>>> origin/main
// 設定飯店路由
var hotelkh = require("./routes/hotel/hotelkh"); //賢-串聯檔案勿刪
var hotelroom = require("./routes/hotel/room"); //賢-串聯檔案勿刪
var hotelmessage = require("./routes/hotel/message"); //賢-串聯檔案勿刪
var hotelimg = require("./routes/hotel/img"); //賢-串聯檔案勿刪
<<<<<<< HEAD
const hotelintermediary = require("./routes/hotel/intermediary"); //賢-串聯檔案勿刪
// 設定景點路由
const ARouter = require("./routes/attraction");
const AIRouter = require("./routes/attraction/itinerary");
=======
// 設定景點路由
const ARouter = require("./routes/attraction");
const AIRouter = require("./routes/attraction/itinerary");

>>>>>>> origin/main

// 票眷路由
const ticketRouter = require("./routes/ticket/ticketAllData");
// 設定跨域 只接受3000port
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", routes);
app.use("/login", login);
app.use("/signup", signup);
app.use("/hotelkh", hotelkh); //賢-串聯檔案勿刪
app.use("/hotelroom", hotelroom); //賢-串聯檔案勿刪
app.use("/hotelmessage", hotelmessage); //賢-串聯檔案勿刪
app.use("/hotelimg", hotelimg); //賢-串聯檔案勿刪
<<<<<<< HEAD
app.use("/hotelintermediary", hotelintermediary); //賢-串聯檔案勿刪

app.use("/attraction/itinerary", AIRouter); // 景點-行程路由
app.use("/attraction", ARouter); // 景點-介紹路由
=======

app.use('/attraction/itinerary', AIRouter);// 景點-行程路由 
app.use('/attraction', ARouter);// 景點-介紹路由 
>>>>>>> origin/main
app.use("/tk", ticketRouter); //票卷路由


// check login
app.use(function (req, res, next) {
<<<<<<< HEAD
  if (req.session.uid) {
    return next();
  }
  res.redirect("/");
});
app.use("/user", user);
app.use("/messageBoard", messageBoard);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
=======
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
>>>>>>> origin/main
});
// error handlers
// development error handler
// will print stacktrace
<<<<<<< HEAD
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: err,
  });
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});
=======
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
		});
	});
}


>>>>>>> origin/main
module.exports = app;
