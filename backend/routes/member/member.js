//連線會員資料庫
const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

router.use(cors({ origin: "http://localhost:3000" }));
const bodyParser = require("body-parser");
// 認証用middleware(中介軟體)
const auth = require("../../middlewares/auth.js");

router.use(express.json());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// 原有的取得所有會員資料的端點
router.route("/:member_id").get(async (req, res) => {
  const memberid = req.params.member_id;
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
  WHERE member_id = ?
  ORDER BY member_id ASC
  `;
  try {
    const [datas] = await db.query(sql, [memberid]);
    res.json(datas);
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.route("/orders/:memberId").get(async (req, res) => {
  const memberId = req.params.memberId;
  const sql = `
    SELECT
      fo.fd_order_id,
      fo.order_date,
      fo.shipping_address,
      fo.shipping_fee,
      fo.order_total,
      fo.grand_total,
      fot.product_name,
      fot.product_quantity,
      fot.product_price
      
    FROM food_orders fo
    JOIN food_orderdetails fot ON fot.fd_order_id = fo.fd_order_id 
    WHERE member_id = ?
    ORDER BY fd_order_id ASC
  `;

  try {
    const [datas] = await db.query(sql, [memberId]);

    // Initialize an empty object to store grouped orders
const groupedOrders = {};

// Loop through each data row and group by fd_order_id
datas.forEach((data) => {
  const id = data.fd_order_id;
  if (!groupedOrders[id]) {
    groupedOrders[id] = {
      fd_order_id: id,
      order_date: data.order_date,
      shipping_address: data.shipping_address,
      shipping_fee: data.shipping_fee,
      order_total: data.order_total,
      grand_total: data.grand_total,
      products: [],
    };
  }
  groupedOrders[id].products.push({
    product_name: data.product_name,
    product_quantity: data.product_quantity,
    product_price: data.product_price,
  });
});

    // Convert grouped orders object to array
    const groupedOrdersArray = Object.values(groupedOrders);

    res.json(groupedOrdersArray);
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/edit",upload.none(), async (req, res) => {
  let { member_id, first_name, birth_date, phone, country } = req.body;

  console.log(req.body);
 

  // 更新資料庫中的記錄
  const updateQuery = `
    UPDATE member 
    SET first_name = ?, birth_date = ?, phone = ?, country = ? 
    WHERE member_id = ?
  `;

  try {
    await db.query(updateQuery, [
      
      first_name,
      birth_date,
      phone,
      country,
      member_id,
    ]);

    return res.status(200).json({ message: "修改成功" });
  } catch (error) {
    console.error("Error during editing:", error);
    return res.status(500).json({ message: "伺服器錯誤" });
  }
});

router.post("/updatePassword", upload.none(), async (req, res) => {
  const { member_id, new_password } = req.body;

  try {
    // 更新数据库中的密码记录
    const updatePasswordQuery = `
      UPDATE member 
      SET password = ? 
      WHERE member_id = ?
    `;

    await db.query(updatePasswordQuery, [new_password, member_id]);

    return res.status(200).json({ message: "密码更新成功" });
  } catch (error) {
    console.error("Error during password update:", error);
    return res.status(500).json({ message: "伺服器錯誤" });
  }
});

//下面有四隻API是用來取得會員的收藏的資料
//下面是景點收藏的部分




router.route("/fav-attraction/:memberId").get(async (req, res) => {
  const memberId = req.params.memberId; // 從路由參數中提取 memberId
  const sql = `SELECT 
  a.attraction_id, 
  a.attraction_name, 
  a.title, 
  a.fk_area_id, 
  area.area_name,
  a.address, 
  a.off_day, 
  a.open_time, 
  a.closed_time, 
  a.phone, 
  a.description, 
  a.lat, 
  a.lng, 
  a.zoom, 
  a.traffic, 
  a.visiting_time, 
  MIN(ai.img_name) AS img_name
FROM attraction_favorites fav 
JOIN attraction a ON fav.fk_attraction_id = a.attraction_id 
LEFT JOIN area ON a.fk_area_id = area.area_id
LEFT JOIN attraction_image ai ON a.attraction_id = ai.fk_attraction_id 
WHERE fav.fk_member_id = ?

GROUP BY a.attraction_id;
      `;
 // 在查詢中使用 memberId
 const [datas] = await db.query(sql, [memberId]);
 res.json(datas);
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
  
  console.log("進來了");
  console.log(req.body);
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
