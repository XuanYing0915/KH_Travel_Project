const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  ht_orderdetail_id,
  receiver_name,
  receiver_phone,
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
  JOIN hotel_orders ON hotel_orderdetails.ht_order_id = hotel_orders.ht_order_id
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
