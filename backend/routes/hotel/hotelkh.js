const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  hotel_id,
  hotel_name,
  hotel_address,
  hotel_tel,
  hotel_img,
  hotel_price,
  hotel_introduction,
  hotel_lat,
  hotel_lng,
  hotel_zoom,
  mrt_name,
  area_name,
  category_name
  FROM hotel_kh
  JOIN hotel_mrt ON hotel_kh.hotel_mrt = hotel_mrt.mrt_id
  JOIN area ON hotel_kh.hotel_area = area.area_id
  JOIN hotel_category ON hotel_kh.hotel_category = hotel_category.category_id
  ORDER BY hotel_kh.hotel_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

// 詳細頁(動態路由)
// 針對回傳的景點id取得景點資料
router.route("/:hotel_id").get(async (req, res) => {
  const sql = `SELECT
  hotel_id,
  hotel_name,
  hotel_address,
  hotel_tel,
  hotel_img,
  hotel_price,
  hotel_introduction,
  hotel_lat,
  hotel_lng,
  hotel_zoom,
  mrt_name,
  area_name,
  category_name
FROM
  hotel_kh 
  JOIN hotel_mrt ON hotel_kh.hotel_mrt = hotel_mrt.mrt_id
  JOIN area ON hotel_kh.hotel_area = area.area_id
  JOIN hotel_category ON hotel_kh.hotel_category = hotel_category.category_id
WHERE hotel_id= ?
GROUP BY hotel_id
;`;
  const HotelId = req.params.hotel_id;
  //   res.send(attractionId);
  // const [datas] = await db.query(sql);
  const [datas] = await db.query(sql, [HotelId]);
  res.json(datas);
});

//匯出
module.exports = router;
