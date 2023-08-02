const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

// 一開始先顯示所有行程
//TODO: 這裡要改成顯示該地區的景點
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  message_id,
  first_name, 
  last_name,
  hotel_name, 
  room_name,
  message_head, 
  message_content, 
  message_evaluate, 
  message_time
  FROM hotel_message
  JOIN member ON hotel_message.member_id = member.member_id
  JOIN hotel_kh ON hotel_message.hotel_id = hotel_kh.hotel_id
  JOIN hotel_room ON hotel_message.room_id = hotel_room.room_id
  ORDER BY hotel_message.message_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
