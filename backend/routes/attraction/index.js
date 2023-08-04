const express = require('express');
const router = express.Router();
const db = require('../../connections/mysql_config.js');


// 景點導覽頁
// 一開始先顯示所有行程
router.route('/').get(async (req, res) => {
	const sql = `SELECT 
    a.attraction_id,
    a.attraction_name,
    a.title,
    a.fk_area_id,
    area.area_name,
    a.address,
    a.off_day,
    a.open_time,
    a.closed_time,
    a.phone,
    a.description,
    a.lat,
    a.lng,
    a.zoom,
    a.traffic,
    MIN(ai.img_name) AS img_name
FROM
    attraction a
LEFT JOIN attraction_image ai ON a.attraction_id = ai.fk_attraction_id
LEFT JOIN area ON a.fk_area_id = area.area_id
GROUP BY a.attraction_id`;
	const [datas] = await db.query(sql);
	res.json(datas);
});



// 詳細頁(動態路由)
// 針對回傳的景點id取得景點資料
router.route('/:attraction_id').get(async (req, res) => {
	const sql = `SELECT
  att.attraction_id,
  att.attraction_name,
  att.title,
  att.fk_area_id,
  area.area_name,
  att.address,
  att.off_day,
  att.open_time,
  att.closed_time,
  att.phone,
  att.description,
  att.lat,
  att.lng,
  att.zoom,
  att.traffic,
  GROUP_CONCAT(DISTINCT tag.tag_name) AS tags,
  GROUP_CONCAT(DISTINCT img.img_name) AS images
FROM
  attraction AS att
LEFT JOIN
  area AS area ON att.fk_area_id = area.area_id
LEFT JOIN
  attraction_hegtag hegtag ON att.attraction_id = hegtag.fk_attraction_id
LEFT JOIN
  attraction_tag_name tag ON hegtag.fk_tag_name_id = tag.tag_name_id
LEFT JOIN
  attraction_image img ON att.attraction_id = img.fk_attraction_id
WHERE att.attraction_id= ?
GROUP BY
  att.attraction_id
;`;
	const attractionId = req.params.attraction_id; 
//   res.send(attractionId);
// const [datas] = await db.query(sql);
	const [datas] = await db.query(sql, [attractionId]);
	res.json(datas);
});



// 匯出
module.exports = router;
