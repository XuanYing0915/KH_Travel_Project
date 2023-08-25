const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
    product_id,
    name,
    description,
    price,
    product_image,
    merchant_id
  FROM food_merchant_products
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

router.route("/:merchant_id").get(async (req, res) => {
  const sql = `SELECT
   product_id,
   name,
   description,
   price,
   product_image,
   merchant_id
   FROM food_merchant_products
   WHERE merchant_id = ?
  `;
  const merchantId = req.params.merchant_id;
  const [datas] = await db.query(sql, [merchantId]);
  res.json(datas || []);
});

module.exports = router;
