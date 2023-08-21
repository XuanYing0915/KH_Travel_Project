const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser");
const cors = require("cors");


router.route("/").get(async (req, res) => {
    const sql = `SELECT 
    tk_order_id,
    member_id,
    payment,
    receiver_name,
    receiver_phone,
    shipping_method,
    shipping_address,
    shipping_fee,
    order_total
    FROM food_orders
    `;
    const [datas] = await db.query(sql);
    res.json(datas);
})

router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: "http://localhost:3000" }));

