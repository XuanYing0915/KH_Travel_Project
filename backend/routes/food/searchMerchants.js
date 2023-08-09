const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");


router.route('/:merchant_id').get(async (req, res) => {
	const sql = `SELECT
  merchant_id,
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
;`;
	const merchant = req.params.merchant_id;
	
	const [datas] = await db.query(sql, [merchant]);

	res.json(datas);
});

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  merchant_id,
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

// 詳細頁(動態路由)
// 針對回傳的景點id取得景點資料


module.exports = router;
