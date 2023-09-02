const express = require("express");
const axios = require("axios");
const router = express.Router();

// 讀取環境變量中的 API 密鑰
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// 消費預期數字表示改成文字描述
const getPriceLevelDescription = (priceLevel) => {
  switch (priceLevel) {
    case 0:
      return "免費";
    case 1:
      return "便宜";
    case 2:
      return "適中";
    case 3:
      return "較高";
    case 4:
      return "昂貴";
    default:
      return "適中";
  }
};
// 英文表示改成中文描述營業狀態
const getStatusDescription = (status) => {
  switch (status) {
    case "OPERATIONAL":
      return "營業中";
    case "CLOSED_TEMPORARILY":
      return "暫時關閉";
    case "CLOSED_PERMANENTLY":
      return "已永久關閉";
    default:
      return "未知狀態";
  }
};
// 英文表示改成中文描述類型
const getTypeDescription = (type) => {
  switch (type) {
    case "restaurant":
      return "餐廳";
    case "cafe":
      return "咖啡廳";
    case "bar":
      return "酒吧";
    case "hotel":
      return "酒店";
    default:
      return null; // 返回 null 表示未知類型
  }
};

router.get("/place/details", async (req, res) => {
  try {
    const placeId = req.query.placeId;
    const googleMapUrl = `${process.env.GOOGLE_MAPS_BASE_URL}?q=place_id:${placeId}`;
    const url = `${process.env.GOOGLE_MAPS_API_URL}?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,rating,reviews,geometry,types,photos,price_level,business_status,user_ratings_total&key=${GOOGLE_API_KEY}&language=zh-TW`;
    const response = await axios.get(url);
    const types = response.data.result.types
      .map((type) => getTypeDescription(type))
      .filter(Boolean);
    const website = response.data.result.website || "未設立"; // 如果沒有網站，則使用「未設立」

    const details = {
      googleMapUrl,
      name: response.data.result.name,
      address: response.data.result.formatted_address,
      phone: response.data.result.formatted_phone_number,
      website: website,
      businessHours: response.data.result.opening_hours.weekday_text,
      rating: response.data.result.rating,
      reviews: response.data.result.reviews,
      geolocation: response.data.result.geometry.location,
      types,
      photos: response.data.result.photos.map(
        (photo) =>
          `${process.env.GOOGLE_MAPS_PHOTO_API_URL}?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
      ),
      priceLevel: response.data.result.price_level,
      status: getStatusDescription(response.data.result.business_status),
      userRatingsTotal: response.data.result.user_ratings_total,
      priceLevel: getPriceLevelDescription(response.data.result.price_level),
    };
    res.json(details);
  } catch (error) {
    console.error("Error fetching details:", error);
    res.status(500).json({ error: "An error occurred while fetching details" });
  }
});

module.exports = router;
