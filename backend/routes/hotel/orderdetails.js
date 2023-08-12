const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser"); //0811為了新增結帳資訊寫的
const cors = require("cors");

//抓資料庫的orderdetails資料
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  ht_orderdetail_id,
  customer_name,
  customer_phone,
  customer_address,
  customer_email,
  hotel_order_name,
  hotel_order_address,
  room_order_name,
  room_order_type,
  hotel_order_checkin,
  hotel_order_checkout,
  hotel_order_price, 
  hotel_order_adult, 
  hotel_order_child, 
  hotel_order_roomCount
  FROM hotel_orderdetails
  JOIN hotel_customer ON hotel_orderdetails.customer_id = hotel_customer.customer_id
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

// 0811要寫入結帳資訊的函式
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

    const sqlOrderDetails = ` INSERT INTO hotel_orderdetails(customer_id, 
      hotel_order_name, hotel_order_address, 
      room_order_name,room_order_type,
      hotel_order_checkin,hotel_order_checkout, 
      hotel_order_price,hotel_order_adult,hotel_order_child,
      hotel_order_roomCount) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

    const hotelOrderDetails = [
      customer_id,
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

module.exports = router;
