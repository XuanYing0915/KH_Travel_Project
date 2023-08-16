const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {

    const  area_name  = req.query.area_name;
    const sql = `
      SELECT 
        merchant_id,
        name_chinese,
        name_english,
        address,
        introduction_card,
        phone,
        img,
        area_name
      FROM food_merchants
      WHERE area_name = ?
    `;

    const [datas] = await db.query(sql, [area_name]);
    res.json(datas);
});

module.exports = router;
