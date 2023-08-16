const express = require('express');
const router = express.Router();
const db = require('../../connections/mysql_config.js');

// 景點導覽頁
// 一開始先顯示所有行程
router.route('/').get(async (req, res) => {
    const  area_name  = req.query.area_name;
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
    a.visiting_time,  
    MIN(ai.img_name) AS img_name,
   GROUP_CONCAT(DISTINCT tag.tag_name) AS tags,
 GROUP_CONCAT(DISTINCT af.fk_member_id)  AS fk_member_id
FROM attraction a

LEFT JOIN attraction_image ai ON a.attraction_id = ai.fk_attraction_id
LEFT JOIN area ON a.fk_area_id = area.area_id
LEFT JOIN
  attraction_hegtag hegtag ON  a.attraction_id = hegtag.fk_attraction_id
LEFT JOIN
  attraction_tag_name tag ON hegtag.fk_tag_name_id = tag.tag_name_id
LEFT JOIN  attraction_favorites af ON a.attraction_id = af.fk_attraction_id
WHERE area.area_name = ?
  GROUP BY a.attraction_id`;
	const [datas] = await db.query(sql, [area_name]);

	// 切割字串成陣列  在傳到前端
	const dataSplit = datas.map((v) => {
		if (v.tags !== null && v.tags !== undefined) {
			v.tags = v.tags.split(',');
		}
		return v;
	});
	res.json(dataSplit);
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
  att.visiting_time,
  GROUP_CONCAT(DISTINCT tag.tag_name) AS tags,
  GROUP_CONCAT(DISTINCT img.img_name) AS images,
  GROUP_CONCAT(DISTINCT af.fk_member_id)  AS fk_member_id
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
LEFT JOIN  
  attraction_favorites af ON att.attraction_id = af.fk_attraction_id
WHERE att.attraction_id= ?
GROUP BY
  att.attraction_id
;`;
	const attractionId = req.params.attraction_id;
	//   res.send(attractionId);
	// const [datas] = await db.query(sql);
	const [datas] = await db.query(sql, [attractionId]);

  // 切割字串成陣列  在傳到前端
  const dataSplit = datas.map((v) => {
    if (v.fk_member_id !== null && v.fk_member_id !== undefined) {
      v.fk_member_id = v.fk_member_id.split(",");
    }
     return v;
  });
  res.json(dataSplit);
	// res.json(datas);
});

// 匯出
module.exports = router;
