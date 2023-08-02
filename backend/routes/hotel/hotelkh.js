const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

// 一開始先顯示所有行程
//TODO: 這裡要改成顯示該地區的景點
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  hotel_id,
  hotel_name,
  hotel_address,
  hotel_tel,
  hotel_img,
  hotel_price,
  hotel_introduction
  FROM hotel_kh`;
  const [datas] = await db.query(sql);
  res.json(datas);
});

// 資料搜尋
router.route("/").get(async function (req, res) {});

module.exports = router;
