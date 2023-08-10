//連線會員資料庫
const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const cors = require("cors");

router.use(cors({ origin: "http://localhost:3000" }));
const bodyParser = require("body-parser");
// 認証用middleware(中介軟體)
const auth = require("../../middlewares/auth.js");

router.use(express.json());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// 原有的取得所有會員資料的端點
router.route("/").get(async (req, res) => {
  const sql = `SELECT
  member_id,
  first_name,
  last_name,
  birth_date,
  phone,
  country,
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

//--------------
// const bcrypt = require("bcrypt");
router.post("/test", (req, res) => {
  console.log(req.body);
});
router.post("/register", async (req, res) => {
  let { email, password, firstName, lastName, dob, country, sex } = req.body;

  console.log(req.body);
  // 在這裡可以加入一些表單驗證邏輯，例如確保帳號、密碼等符合要求

  // 檢查是否已經存在相同帳號
  const sql = "SELECT * FROM member WHERE email = ?";
  
 
   
  try {
    const [rows] = await db.query(sql, [email]);
    console.log(rows);
    if (rows.length > 0) {
      return res.status(409).json({ error: "帳號已存在" });
    }
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: "伺服器錯誤" });
  }

  // 檢查dob是否為空或無效
  if (!dob) {
    dob = "2000-01-01";  // 設置一個預設的日期值
  }
    // // 加密密碼
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // 將資料存入資料庫
    const insertQuery = `
      INSERT INTO member (email, password, first_name, last_name, birth_date, country, sex)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
    await db.query(insertQuery, [
      email,
      password,
      firstName,
      lastName,
      dob,
      country,
      sex,
    ]);

    return res.status(201).json({ message: "註冊成功" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "伺服器錯誤" });
  }
});



router.post("/login", async function (req, res, next) {
  // 獲得username, password資料
  console.log("test");
  const data = req.body;
  console.log(data);
  const { email, password } = data;
  // console.log(req.body);
  // 檢查從react來的資料，哪些資料為必要(username, password)
  if (!data.email || !data.password) {
    return res.json({ message: "fail", code: "400" });
  }

  const query = `SELECT *
  FROM member
  WHERE email = ? AND password = ?`;
  const [datas] = await db.query(query, [email, password]);
  console.log(datas);
  // 如果資料庫中有相對應的資料，表示登入成功
  if (datas.length === 0) {
    return res.json({
      message: "fail",
      code: "400",
      error: "Invalid email or password",
    });
  }

  // // 會員存在，將會員的資料取出
  // const member = await getUser({
  //   username,
  //   password,
  // })

  // // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
  // delete member.password

  // // 啟用session
  // req.session.userId = member.id

  return res.json({
    message: "success",
    code: "200",
    user: email,
  });
});

// router.post("/logout", auth, async function (req, res, next) {
//   res.clearCookie("SESSION_ID"); //cookie name

//   req.session.destroy(() => {
//     console.log("session destroyed");
//   });

//   res.json({ message: "success", code: "200" });
// });

// router.get("/", (req, res) => {
//   console.log(req.session);
// });

// // 新增的登入端點
// router.route("/login").post(async (req, res) => {
//   const { email, password } = req.body;
//   const sql = `
//     SELECT *
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
