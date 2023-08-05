// // 解析cookie用套件
// import cookieParser from 'cookie-parser'
// // 導入session中介軟體與設定
// const session = require('express-session')
// // 使用檔案的session store，存在sessions資料夾
// import sessionFileStore from 'session-file-store'
// const FileStore = sessionFileStore(session)
// //...
//連線會員資料庫
const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  member_id,
  first_name,
  last_name, 
  birth_date,
  phone,
  address,
  city,
  pwd,
  email,
  avatar
  FROM member
  ORDER BY member.member_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;

// app.use(
//   session({
//     store: new FileStore(fileStoreOptions), // 使用檔案記錄session
//     name: 'SESSION_ID', // cookie名稱，儲存在瀏覽器裡
//     secret: '67f71af4602195de2450faeb6f8856c0', // 安全字串
//     cookie: {
//       maxAge: 30 * 86400000, // session保存30天
//     },
//     resave: false,
//     saveUninitialized: false,
//   })
// )

// router.get('/', (req, res) => {
//     console.log(req.session)
//   })
// //...
// app.use(cookieParser())
