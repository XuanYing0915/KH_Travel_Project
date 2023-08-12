const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const SqlString = require("sqlstring");


// 景點搜尋鄰近景點(10公里內)
router.route("/AtoA/:attraction_id").get(async (req, res) => {
  const sql =`
SELECT
    a.attraction_id,
    a.attraction_name,
    a.title,
    a.fk_area_id,
    area.area_name,
    a.address,
    a.off_day,
    a.open_time,
    a.closed_time,
    a.lat,
    a.lng,
    a.visiting_time,
    (
        SELECT img_name
        FROM attraction_image
        WHERE fk_attraction_id = a.attraction_id
        LIMIT 1
    ) AS img_name,
    (
        6371 * acos(
            cos(radians(22.6128673000))
            * cos(radians(a.lat))
            * cos(radians(a.lng) - radians(120.2629577000))
            + sin(radians(22.6128673000))
            * sin(radians(a.lat))
        )
    ) AS distance
FROM
    attraction a
LEFT JOIN
    area ON a.fk_area_id = area.area_id
WHERE
    a.attraction_id != ?
    AND (
        6371 * acos(
            cos(radians(22.6128673000))
            * cos(radians(a.lat))
            * cos(radians(a.lng) - radians(120.2629577000))
            + sin(radians(22.6128673000))
            * sin(radians(a.lat))
        )
    ) <= 10
ORDER BY
    distance ASC;`;
  const attractionId = req.params.attraction_id;
 const [datas] = await db.query(sql, [attractionId]);
  res.json(datas);
});

module.exports = router;
