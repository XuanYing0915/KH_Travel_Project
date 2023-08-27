const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
    merchant_id,
    google_place_id,
    name_chinese,
    name_english,
    address,
    phone,
    img,
    introduction_card,
    introduction,
    operating_hours,
    map_coordinates,
    area_name,
    category_name
  FROM food_merchants
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

router.route("/:merchant_id").get(async (req, res) => {
  const sql = `SELECT
    merchant_id,
    google_place_id,
    name_chinese,
    name_english,
    address,
    phone,
    img,
    introduction_card,
    introduction,
    operating_hours,
    map_coordinates,
    area_name,
    category_name
  FROM food_merchants
  WHERE merchant_id = ?
  `;
  const merchantId = req.params.merchant_id;
  const [datas] = await db.query(sql, [merchantId]);
  res.json(datas[0] || {});
});

module.exports = router;
