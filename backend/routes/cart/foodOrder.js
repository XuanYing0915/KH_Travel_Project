const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
    const sql = `SELECT 
      *
    FROM food_orders
    `;
    const [datas] = await db.query(sql);
    res.json(datas);
})