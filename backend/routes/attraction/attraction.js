const express = require('express');
const router = express.Router();
const db = require('../../connections/mysql_config.js');

// sql語法

// 取得所有景點資料
router.route('/').get(async (req, res) => {
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
WHERE attraction_id= 600001
GROUP BY
  att.attraction_id;
`;
	const [datas] = await db.query(sql);
	res.json(datas);
});

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
WHERE att.attraction_id= 600001
GROUP BY
  att.attraction_id
;`;
	const attractionId = req.params.attraction_id; // 這裡修正使用 req.params.attraction_id
	const [datas] = await db.query(sql, [attractionId]);
	res.json(datas);
});
module.exports = router;
