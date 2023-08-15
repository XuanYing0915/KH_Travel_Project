const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
    merchant_id,
    name_chinese,
    name_english,
    address,
    phone,
    img,
    area_name
    FROM food_merchants
    `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

module.exports = router;
