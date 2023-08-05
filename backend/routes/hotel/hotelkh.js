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

//抓來研究
// 詳細頁(動態路由)
// 針對回傳的景點id取得景點資料
// router.route('/:attraction_id').get(async (req, res) => {
// 	const sql = `SELECT
//   att.attraction_id,
//   att.attraction_name,
//   att.title,
//   att.fk_area_id,
//   area.area_name,
//   att.address,
//   att.off_day,
//   att.open_time,
//   att.closed_time,
//   att.phone,
//   att.description,
//   att.lat,
//   att.lng,
//   att.zoom,
//   att.traffic,
//   GROUP_CONCAT(DISTINCT tag.tag_name) AS tags,
//   GROUP_CONCAT(DISTINCT img.img_name) AS images
// FROM
//   attraction AS att
// LEFT JOIN
//   area AS area ON att.fk_area_id = area.area_id
// LEFT JOIN
//   attraction_hegtag hegtag ON att.attraction_id = hegtag.fk_attraction_id
// LEFT JOIN
//   attraction_tag_name tag ON hegtag.fk_tag_name_id = tag.tag_name_id
// LEFT JOIN
//   attraction_image img ON att.attraction_id = img.fk_attraction_id
// WHERE att.attraction_id= ?
// GROUP BY
//   att.attraction_id
// ;`;
// 	const attractionId = req.params.attraction_id;
// //   res.send(attractionId);
// // const [datas] = await db.query(sql);
// 	const [datas] = await db.query(sql, [attractionId]);
// 	res.json(datas);
// });
//抓來研究

//匯出
module.exports = router;
