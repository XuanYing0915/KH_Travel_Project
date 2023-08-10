const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  favorites_id,
  hotel_name,
  first_name, 
  last_name,
  favorites_date
  FROM hotel_favorites
  JOIN hotel_kh ON hotel_favorites.hotel_id = hotel_kh.hotel_id
  JOIN member ON hotel_favorites.member_id = member.member_id
  ORDER BY hotel_favorites.favorites_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
