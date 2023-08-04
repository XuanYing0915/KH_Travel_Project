const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  intermediary_id,
  hotel_name,
  facility_name
  FROM hotel_intermediary
  JOIN hotel_kh ON hotel_intermediary.hotel_id = hotel_kh.hotel_id
  JOIN hotel_facility ON hotel_intermediary.facility_id = hotel_facility.facility_id
  ORDER BY hotel_intermediary.intermediary_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
