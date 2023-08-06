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
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const bodyParser = require('body-parser');
// 認証用middleware(中介軟體)
const auth = require ('../../middlewares/auth.js');

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 原有的取得所有會員資料的端點
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  member_id,
  first_name,
  last_name, 
  birth_date,
  phone,
  address,
  city,
  password,
  email,
  avatar
  FROM member
  ORDER BY member.member_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});
router.post('/login', async function (req, res, next) {
  // 獲得username, password資料
  const user = req.body

  // 這裡可以再檢查從react來的資料，哪些資料為必要(username, password...)
  if (!user.username || !user.password) {
    return res.json({ message: 'fail', code: '400' })
  }

  const { username, password } = user

  // 先查詢資料庫是否有同username/password的資料
  const isMember = await verifyUser({
    username,
    password,
  })

  if (!isMember) {
    return res.json({ message: 'fail', code: '400' })
  }

  // 會員存在，將會員的資料取出
  const member = await getUser({
    username,
    password,
  })

  // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
  delete member.password

  // 啟用session
  req.session.userId = member.id

  return res.json({
    message: 'success',
    code: '200',
    user: member,
  })
})


router.post('/logout', auth, async function (req, res, next) {
  res.clearCookie('SESSION_ID') //cookie name

  req.session.destroy(() => {
    console.log('session destroyed')
  })

  res.json({ message: 'success', code: '200' })
})


router.get('/', (req, res) => {
  console.log(req.session)
})



// // 新增的登入端點
// router.route("/login").post(async (req, res) => {
//   const { email, password } = req.body;
//   const sql = `
//     SELECT member_id, first_name, last_name
//     FROM member
//     WHERE email = ? AND pwd = ?
//   `;
//   const [user] = await db.query(sql, [email, password]);

//   if (user.length > 0) {
//     res.status(200).json({ success: true, user: user[0] });
//   } else {
//     res.status(401).json({ success: false, message: "Authentication failed." });
//   }
// });

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
