const createError = require("http-errors");
const express = require("express");
const app = express();
//npm i multer
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// session
const session = require("express-session");
// 使用檔案的session store，存在sessions資料夾
const sessionFileStore = require("session-file-store");
const FileStore = sessionFileStore(session);

// 修正 __dirname for esm
const { fileURLToPath } = require("url");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// end 修正 __dirname

// 讓console.log可以呈現檔案與行號
const { extendLog } = require("./utils/tool.js");
extendLog(); // 執行全域套用
// console.log呈現顏色用 全域套用
// require('colors');
// 檔案上傳
const fileUpload = require("express-fileupload");

const authJwtRouter = require("./routes/auth-jwt.js");
const authRouter = require("./routes/auth.js");
const emailRouter = require("./routes/email.js");
const indexRouter = require("./routes/index.js");
const { body, validationResult } = require("express-validator");
const resetPasswordRouter = require("./routes/reset-password.js");
// const usersRouter = require('./routes/users.js');

//////測試會員登入跳轉畫面
const memberRouter = require("./routes/member/member");

const favicon = require("serve-favicon");

const bodyParser = require("body-parser");

const flash = require("connect-flash");
const validator = require("express-validator");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//database
// const db = require("./connections/mysql_config");

// // routes
// const routes = require("./routes/index");
// const login = require("./routes/login");
// const signup = require("./routes/signup");
// const user = require("./routes/user");
// 設定飯店路由
const hotelkh = require("./routes/hotel/hotelkh"); //賢-飯店路由
const hotelroom = require("./routes/hotel/room"); //賢-飯店路由
const hotelmessage = require("./routes/hotel/message"); //賢-飯店路由
const hotelimg = require("./routes/hotel/img"); //賢-串聯檔案勿刪
const hotelintermediary = require("./routes/hotel/intermediary"); //賢-飯店路由
const favorites = require("./routes/hotel/favorites"); //賢-飯店路由
const orderdetails = require("./routes/hotel/orderdetails"); //賢-飯店路由
// 設定景點路由
const ARouter = require("./routes/attraction");
const AIRouter = require("./routes/attraction/itinerary");

// 票眷路由
const ticketRouter = require("./routes/ticket/ticketAllData");

// 設定跨域 只接受3000port
// app.use("/login", login);
// app.use("/signup", signup);
app.use("/hotelkh", hotelkh); //賢-飯店路由
app.use("/hotelroom", hotelroom); //賢-飯店路由
app.use("/hotelmessage", hotelmessage); //賢-飯店路由
app.use("/hotelimg", hotelimg); //賢-飯店路由
app.use("/hotelintermediary", hotelintermediary); //賢-飯店路由
app.use("/hotelfavorites", favorites); //賢-飯店路由
app.use("/hotelorderdetails", orderdetails); //賢-飯店路由
app.use("/attraction", ARouter); // 景點首頁&介紹路由
app.use("/attraction/itinerary", AIRouter); // 景點-行程路由
app.use("/member", memberRouter);
// app.use("/member/login", member); // 景點-行程路由

app.use("/tk", ticketRouter); //票卷路由

// check login
app.use(function (req, res, next) {
  if (req.session.uid) {
    return next();
  }
  res.redirect("/");
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// 佑
app.use(logger("dev"));
app.use(express.json());
// session
app.use(express.static("public"));
app.use(
  session({ secret: "mysupersecret", resave: true, saveUninitialized: true })
);
app.use(flash());

// 檔案上傳
// 選項參考: https://github.com/richardgirges/express-fileupload
app.use(fileUpload());

// 可以使用的CORS要求，options必要
// app.use(cors())
//增加body解析
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.send("你現在造訪的是首頁");
//   console.log("有人造訪首頁");
//   });

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 佑
// fileStore的選項
const fileStoreOptions = {};
// session-cookie使用
app.use(
  session({
    store: new FileStore(fileStoreOptions), // 使用檔案記錄session
    name: "SESSION_ID", // cookie名稱，儲存在瀏覽器裡
    secret: "67f71af4602195de2450faeb6f8856c0", // 安全字串，應用一個高安全字串
    cookie: {
      maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session保存30天
      // httpOnly: false,
      // sameSite: 'none',
    },
    resave: false,
    saveUninitialized: false,
  })
);

// 路由使用
app.use("/api/", indexRouter);
// app.use('/api/auth-jwt', authJwtRouter)
app.use("/api/auth", authRouter);
app.use("/api/email", emailRouter);
// app.use('/api/products', productsRouter)
app.use("/api/reset-password", resetPasswordRouter);
// app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

module.exports = app;