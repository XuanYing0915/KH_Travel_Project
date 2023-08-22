const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser");
const cors = require("cors");


router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: "http://localhost:3000" }));

// 定義 POST 請求的處理程序
router.post("/ticketdetailcheckout", async (req, res) => {
    // const { fd_order_id, grand_total } = req.body
    // console.log("訂單傳入後端", fd_order_id, grand_total)
    console.log(req.body)

    try {
        
        const ticketDetailSql = ` INSERT INTO ticket_orderdetails (tk_order_id,tk_orderdetails_index,product_price,product_quantity,item_total,product_id,product_name) VALUES (?,?,?,?,?,?,?)`;
        const ticketDetailData=[
            req.body.tk_order_id,
            req.body.tk_orderdetails_index,
            req.body.price,
            req.body.quantity,
            req.body.itemTotal,
            req.body.id,
            req.body.name
        ];
        await db.query(ticketDetailSql,ticketDetailData);
        // console.log(req.body)
        res.status(200).send({ ok: true });

    } catch (error) {
        // 處理任何可能的錯誤，例如資料庫連接失敗
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while saving the message" });
    }
});
module.exports = router;

