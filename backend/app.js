const createError = require("http-errors");
const express = require("express");
const app = express();
//npm i multer
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// 設定跨域 只接受3000port

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

const authJwtRouter = require("./routes/member/auth-jwt.js");
// const authRouter = require("./routes/member/auth.js");
const emailRouter = require("./routes/member/email.js");
const indexRouter = require("./routes/member/index.js");
const { body, validationResult } = require("express-validator");
const resetPasswordRouter = require("./routes/member/reset-password.js");
const lineLoginRouter = require("./routes/member/line-login.js");
const googleLoginRouter = require("./routes/member/google-login.js");
const facebookLoginRouter = require("./routes/member/facebook-login.js");

// const usersRouter = require('./routes/users.js');

//////測試會員登入跳轉畫面
const memberRouter = require("./routes/member/member");
app.use("/member", memberRouter);

const favicon = require("serve-favicon");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const flash = require("connect-flash");
const validator = require("express-validator");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//database
const db = require("./connections/mysql_config");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
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
const favorites = require("./routes/hotel/favorite.js"); //賢-飯店路由
const orderdetails = require("./routes/hotel/orderdetails"); //賢-飯店路由
const nearbyfood = require("./routes/hotel/nearbyfood"); //賢-飯店路由
const nearbyattraction = require("./routes/hotel/nearbyattraction"); //賢-飯店路由
// 設定景點路由
const ARouter = require("./routes/attraction");
const AIRouter = require("./routes/attraction/itinerary");
const FavoriteRouter = require("./routes/api/favorite.js");
const AdistanceRouter = require("./routes/api/Adistance.js");

// 美食
const searchMerchants = require("./routes/food/searchMerchants");
const merchantProducts = require("./routes/food/merchantProducts");
const googleApiRoutes = require("./routes/googleApi");

// 票眷路由
const ticketRouter = require("./routes/ticket/ticketAllData");

// 設定會員路由
const member = require("./routes/member/member");

// 購物車路由
const foodCheckout = require("./routes/cart/foodOrder");
const ticketCheckout = require("./routes/cart/ticketOrder");
const foodSuccess = require("./routes/cart/foodSuccess");
const ticketSuccess = require("./routes/cart/ticketSuccess");

const favhotel = require("./routes/member/fav-hotel");
const favticket = require("./routes/member/fav-ticket");
const favfood = require("./routes/member/fav-food");
const avatar = require("./routes/member/avatar");

// const imgupload = require("./routes/member/img-upload")

// app.use("/member", member);
// app.use("/login", login);
// app.use("/signup", signup);
app.use("/hotelkh", hotelkh); //賢-飯店路由
app.use("/hotelroom", hotelroom); //賢-飯店路由
app.use("/hotelmessage", hotelmessage); //賢-飯店路由
app.use("/hotelimg", hotelimg); //賢-飯店路由
app.use("/hotelintermediary", hotelintermediary); //賢-飯店路由
app.use("/hotelfavorites", favorites); //賢-飯店路由
app.use("/hotelorderdetails", orderdetails); //賢-飯店路由
app.use("/hotelnearbyfood", nearbyfood); //賢-飯店路由
app.use("/hotelnearbyattraction", nearbyattraction); //賢-飯店路由
app.use("/attraction", ARouter); // 景點首頁&介紹路由

app.use("/attraction/itinerary", AIRouter); // 景點-行程路由

// api
app.use("/api/favorite", FavoriteRouter); //收藏
app.use("/api/Adistance", AdistanceRouter); // 景點-鄰近景點/美食/住宿路由

app.use("/api/member", member); // 佑
app.use("/member/login", member); // 佑
app.use("/api/orders", member); //佑-訂單
app.use("/api/fav", member); //佑-收藏
app.use("/api/fav", favhotel); //佑-收藏
app.use("/api/fav", favticket); //佑-收藏
app.use('/api/facebook-login', facebookLoginRouter)

app.use("/api/fav", favfood); //佑-收藏
app.use("/api/formupdate", member);
app.use("/api/imgupload", avatar);

// app.use("/api/formupdate",imgupload)

app.use("/tk", ticketRouter); //票卷路由

app.use("/search-merchants", searchMerchants); //隆-商家查詢
app.use("/merchant-products", merchantProducts); //隆-商家商品
app.use("/api/google", googleApiRoutes); //隆-googleApi

app.use("/cart/payment", foodCheckout);
app.use("/cart/payment", ticketCheckout);
app.use("/cart/payment", foodSuccess);
app.use("/cart/payment", ticketSuccess);

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
app.use("/api/auth-jwt", authJwtRouter);
// app.use("/api/auth", authRouter);
app.use("/api/email", emailRouter);
// app.use('/api/products', productsRouter)
app.use("/api/reset-password", resetPasswordRouter);
// app.use('/api/users', usersRouter)
app.use("/api/google-login", googleLoginRouter);
app.use("/api/line-login", lineLoginRouter);
app.use("/api/facebook-login", facebookLoginRouter);
// 設定靜態資源中間件，指向你的圖片資料夾
app.use("/public", express.static(__dirname + "/public"));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
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
