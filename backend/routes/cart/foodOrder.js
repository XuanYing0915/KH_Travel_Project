const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser");
const cors = require("cors");


// router.route("/").get(async (req, res) => {
//     const sql = `SELECT 
//     fd_order_id,
//     member_id,
//     payment,
//     receiver_name,
//     receiver_phone,
//     shipping_method,
//     shipping_address,
//     shipping_fee,
//     order_total,
//     grand_total,
//     payment_status
//     FROM food_orders
//     `;
//     const [datas] = await db.query(sql);
//     res.json(datas);
// })

router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: "http://localhost:3000" }));

// 定義 POST 請求的處理程序
router.post("/checkout", async (req, res) => {
    const { fd_order_id, grand_total } = req.body
    console.log("訂單傳入後端", fd_order_id, grand_total)
    try {
        const foodOrderSql = ` INSERT INTO food_orders (fd_order_id,grand_total) VALUES (${fd_order_id},${grand_total})`;
        res.json(req.body);
        await db.query(foodOrderSql);
        res.status(200).send({ ok: true });

    } catch (error) {
        // 處理任何可能的錯誤，例如資料庫連接失敗
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while saving the message" });
    }
});

