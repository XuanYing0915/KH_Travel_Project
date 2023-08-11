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
  hotel_name,
  room_name,
  hotel_order_checkin,
  hotel_order_ckeckout,
  hotel_order_price, 
  hotel_order_adult, 
  hotel_order_child, 
  hotel_order_room
  FROM hotel_orderdetails
  JOIN hotel_kh ON hotel_orderdetails.hotel_id = hotel_kh.hotel_id
  JOIN hotel_room ON hotel_orderdetails.room_id = hotel_room.room_id
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
router.post('/checkout', async (req, res) => {
  try {
      const sql1 = ` INSERT INTO hotel_orderdetails(customer_id, hotel_id, room_id, hotel_order_checkin, hotel_order_checkout, 
      hotel_order_price, hotel_order_adult, hotel_order_chile,
      hotel_order_room,hotel_order_status) VALUES (500050001,500010011,500020012,?,?,?,?,?,?,?)`;

      const sql2 = ` INSERT INTO hotel_customer(customer_name, customer_phone, customer_address, customer_email) VALUES (?,?,?,?)`;

    const customerData = {
        customer_name: req.body.username,
        customer_phone: req.body.userphone,
        customer_address: req.body.useraddress,
        customer_email: req.body.useremail
      };

    const hotelOrderDetails = {
      hotel_order_checkin: req.body.checkInDate,
      hotel_order_checkout: req.body.checkOutDate,
      hotelName: req.body.hotelName,
      roomName: req.body.roomName,
      roomType: req.body.roomType,
      hotel_order_room: req.body.roomCount,
      hotel_order_adult: req.body.adults,
      hotel_order_child: req.body.childrens,
      hotel_order_price: req.body.totalPrice
    };

      // 處理付款
   

       // 儲存顧客資料到資料庫
      const customer_id = await insertCustomer(customerData);
       
      // 將顧客ID或其他引用添加到訂房資料
      hotelOrderDetails.customer_id = customer_id;

      // 儲存訂房資料到資料庫
      await insertOrderDetails(hotelOrderDetails);

      res.status(200).send({ success: true });
  } catch (error) {
    // 處理任何可能的錯誤，例如資料庫連接失敗
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the message" });
  }
});


module.exports = router;
