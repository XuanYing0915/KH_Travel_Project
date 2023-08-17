const express = require('express');
const router = express.Router();
const db = require('../../connections/mysql_config.js');

// 一開始先顯示所有行程
//TODO: 這裡要改成顯示該地區的景點
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
// router.route('/').get(async function (req, res) {});

// 新增行程

// 刪除行程

// 匯出
module.exports = router;



// 計算兩點距離+車程
// SELECT
//     a.attraction_id,
//     a.attraction_name,
//     a.title,
//     a.fk_area_id,
//     area.area_name,
//     a.address,
//     a.off_day,
//     a.open_time,
//     a.closed_time,
//     a.lat,
//     a.lng,
//     a.visiting_time,
//     (
//         6371 * acos(
//             cos(radians(?)) * cos(radians(a.lat)) * cos(radians(a.lng) - radians(?))
//             + sin(radians(?)) * sin(radians(a.lat))
//         )
//     ) AS distance,
//     (
//         6371 * acos(
//             cos(radians(?)) * cos(radians(a.lat)) * cos(radians(a.lng) - radians(?))
//             + sin(radians(?)) * sin(radians(a.lat))
//         )
//     ) / 50 * 60 AS travel_time_minutes, -- 计算车程时间（分钟）
//     (
//         SELECT img_name
//         FROM attraction_image
//         WHERE fk_attraction_id = a.attraction_id
//         LIMIT 1
//     ) AS img_name
// FROM
//     attraction a
// LEFT JOIN
//     area ON a.fk_area_id = area.area_id
// WHERE
//     a.attraction_id != ?
//     AND (
//         6371 * acos(
//             cos(radians(?)) * cos(radians(a.lat)) * cos(radians(a.lng) - radians(?))
//             + sin(radians(?)) * sin(radians(a.lat))
//         )
//     ) <= 10
// ORDER BY
//     distance ASC;