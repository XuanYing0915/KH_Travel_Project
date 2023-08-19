const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser"); //為了新增結帳資訊寫的
const cors = require("cors");

//抓資料庫的orderdetails資料
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  ht_orderdetail_id,
  customer_name,
  customer_phone,
  customer_address,
  customer_email,
  first_name,
  last_name,
  birth_date,
  phone,
  hotel_order_name,
  hotel_order_address,
  room_order_name,
  room_order_type,
  hotel_order_checkin,
  hotel_order_checkout,
  hotel_order_price, 
  hotel_order_adult, 
  hotel_order_child, 
  hotel_order_roomCount,
  hotel_order_number
  FROM hotel_orderdetails
  JOIN hotel_customer ON hotel_orderdetails.customer_id = hotel_customer.customer_id
  JOIN member ON hotel_orderdetails.member_id = member.member_id
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

// 要寫入結帳資訊的函式
router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: "http://localhost:3000" }));
// 定義 POST 請求的處理程序
router.post("/checkout", async (req, res) => {
  try {
    const sqlCustomer = ` INSERT INTO hotel_customer(customer_name, customer_phone, 
      customer_address, customer_email) VALUES (?,?,?,?)`;

    const customerData = [
      req.body.customer_name,
      req.body.customer_phone,
      req.body.customer_address,
      req.body.customer_email,
    ];

    const resultCustomer = await db.query(sqlCustomer, customerData);

    const customer_id = resultCustomer[0].insertId;

    const sqlOrderDetails = ` INSERT INTO hotel_orderdetails(customer_id,member_id,
      hotel_order_name, hotel_order_address, 
      room_order_name,room_order_type,
      hotel_order_checkin,hotel_order_checkout, 
      hotel_order_price,hotel_order_adult,hotel_order_child,
      hotel_order_roomCount,hotel_order_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const hotelOrderDetails = [
      customer_id,
      req.body.member_id,
      req.body.hotel_order_name,
      req.body.hotel_order_address,
      req.body.room_order_name,
      req.body.room_order_type,
      req.body.hotel_order_checkin,
      req.body.hotel_order_checkout,
      req.body.hotel_order_price,
      req.body.hotel_order_adult,
      req.body.hotel_order_child,
      req.body.hotel_order_roomCount,
      req.body.hotel_order_number,
    ];

    await db.query(sqlOrderDetails, hotelOrderDetails);
    // res.json(req.body);
    res.status(200).send({ ok: true });
  } catch (error) {
    // 處理任何可能的錯誤，例如資料庫連接失敗
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the message" });
  }
});

// 0812要驗證訂單編號來填寫評論
async function findOrder(orderNumber) {
  try {
    const sql3 = `SELECT * FROM hotel_orderdetails 
    JOIN hotel_customer ON hotel_orderdetails.customer_id = hotel_customer.customer_id
    JOIN member ON hotel_orderdetails.member_id = member.member_id
    WHERE hotel_order_number = ?`;
    const [orders] = await db.query(sql3, [orderNumber]);
    console.log(orders);
    return orders[0];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

router.post("/", async (req, res) => {
  try {
    const { orderNumber } = req.body;
    const order = await findOrder(orderNumber);
    if (order) {
      res.json({
        success: true,
        details: order, // 返回訂單的詳情
      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error verifying order number:", error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the order number" });
  }
});

module.exports = router;
