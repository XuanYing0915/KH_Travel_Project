const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const SqlString = require("sqlstring");

// 景點搜尋鄰近景點(10公里內)
router.route("/AtoA/:attraction_id").get(async (req, res) => {
  const attractionId = req.params.attraction_id;

  // 根據傳入的景點 ID 查詢該景點的經緯度
  const getCoordinatesQuery =
    "SELECT lat, lng FROM attraction WHERE attraction_id = ?";
  const [coordinates] = await db.query(getCoordinatesQuery, [attractionId]);

  if (!coordinates.length) {
    return res.status(404).json({ error: "景點 ID 不存在" });
  }
  // 把抓到的經緯度放進變數
  const inputLat = coordinates[0].lat;
  const inputLng = coordinates[0].lng;

  // 查詢附近的景點(10公里內)
  const getNearbyA = `
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
              6371 * acos(
                  cos(radians(?)) * cos(radians(a.lat)) * cos(radians(a.lng) - radians(?))
                  + sin(radians(?)) * sin(radians(a.lat))
              )
          ) AS distance,
          (
              SELECT img_name
              FROM attraction_image
              WHERE fk_attraction_id = a.attraction_id
              LIMIT 1
          ) AS img_name
      FROM
          attraction a
      LEFT JOIN
          area ON a.fk_area_id = area.area_id
      WHERE
          a.attraction_id != ?
          AND (
              6371 * acos(
                  cos(radians(?)) * cos(radians(a.lat)) * cos(radians(a.lng) - radians(?))
                  + sin(radians(?)) * sin(radians(a.lat))
              )
          ) <= 10
      ORDER BY
          distance ASC;
    `;
  //   查詢鄰近景點結束
  //  查詢鄰近飯店開始
  const getNearbyH = `
  SELECT
    h.hotel_id ,
    h.hotel_name,
    h.hotel_lat,
    h.hotel_lng,
    h.hotel_img,
      (
          6371 * acos(
              cos(radians(?)) * cos(radians(h.hotel_lat)) * cos(radians(h.hotel_lng) - radians(?))
              + sin(radians(?)) * sin(radians(h.hotel_lat))
          )
      ) AS distance

  FROM
  hotel_kh h
  WHERE
      (
          6371 * acos(
              cos(radians(?)) * cos(radians(h.hotel_lat)) * cos(radians(h.hotel_lng) - radians(?))
              + sin(radians(?)) * sin(radians(h.hotel_lat))
          )
      ) <= 10
  ORDER BY
      distance ASC;
`;
  //   查詢鄰近飯店結束

  try {
    const [nearbyAttractions, nearbyHotels] = await Promise.all([
      db.query(getNearbyA, [
        inputLat,
        inputLng,
        inputLat,
        attractionId,
        inputLat,
        inputLng,
        inputLat,
      ]),
      db.query(getNearbyH, [
        inputLat,
        inputLng,
        inputLat,
        inputLat,
        inputLng,
        inputLat,
      ]),
    ]);

    res.json({
      nearbyAttractions: nearbyAttractions[0],
      nearbyHotels: nearbyHotels[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "錯誤" });
  }
});

module.exports = router;
