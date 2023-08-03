const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  img_id,
  img_name,
  img_src,
  room_name,
  hotel_name
  FROM hotel_img
  JOIN hotel_kh ON hotel_img.hotel_id = hotel_kh.hotel_id
  JOIN hotel_room ON hotel_img.room_id = hotel_room.room_id
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
