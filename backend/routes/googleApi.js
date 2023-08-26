const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/place/details", async (req, res) => {
  try {
    const placeId = req.query.placeId;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,address_component,formatted_phone_number,website,opening_hours,rating,reviews,geometry,types,photos,price_level,business_status&key=AIzaSyB4pw0MzBpfAjdUbrYvDmbcqgu3eZnwD9Q&language=zh-TW`;
    const response = await axios.get(url);
    const details = {
      name: response.data.result.name,
      address: response.data.result.formatted_address,
      phone: response.data.result.formatted_phone_number,
      website: response.data.result.website,
      businessHours: response.data.result.opening_hours.weekday_text,
      rating: response.data.result.rating,
      reviews: response.data.result.reviews,
      geolocation: response.data.result.geometry.location,
      types: response.data.result.types,
      photos: response.data.result.photos.map(
        (photo) =>
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB4pw0MzBpfAjdUbrYvDmbcqgu3eZnwD9Q`
      ),
      priceLevel: response.data.result.price_level,
      status: response.data.result.business_status,
    };
    res.json(details);
  } catch (error) {
    console.error("Error fetching details:", error);
    res.status(500).json({ error: "An error occurred while fetching details" });
  }
});

module.exports = router;
