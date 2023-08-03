const express = require('express');
const router = express.Router();
const db = require('../../connections/mysql_config.js');

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

// 資料搜尋
router.route('/').get(async function (req, res) {});



// 匯出
module.exports = router;
