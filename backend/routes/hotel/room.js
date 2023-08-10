const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  room_id,
  room_name,
  room_type,
  hotel_name,
  hotel_address,
  room_describe,
  room_capacity,
  room_price
  FROM hotel_room
  JOIN hotel_kh ON hotel_room.hotel_id = hotel_kh.hotel_id
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
