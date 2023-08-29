const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const querystring = require('querystring');
// import moment from 'moment-timezone'



router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: "http://localhost:3000" }));
const moment = require('moment-timezone');


const generateCheckMacValue = (data, hashKey, hashIV) => {
    const keys = Object.keys(data).sort((l, r) => l > r);
    let checkValue = '';
    for (const key of keys) { checkValue += `${key}=${data[key]}&` }
    checkValue = `HashKey=${hashKey}&${checkValue}HashIV=${hashIV}`; // There is already an & in the end of checkValue
    checkValue = encodeURIComponent(checkValue).toLowerCase();
    checkValue = checkValue.replace(/%20/g, '+')
        .replace(/%2d/g, '-')
        .replace(/%5f/g, '_')
        .replace(/%2e/g, '.')
        .replace(/%21/g, '!')
        .replace(/%2a/g, '*')
        .replace(/%28/g, '(')
        .replace(/%29/g, ')')
        .replace(/%20/g, '+');

    checkValue = crypto.createHash('sha256').update(checkValue).digest('hex');
    checkValue = checkValue.toUpperCase();
    return checkValue;
}
const hashKey = "5294y06JbISpM5x9"
const hashIV = "v77hoKGq4kWxNNIS"

// 定義 POST 請求的處理程序
router.post("/foodcheckout", async (req, res) => {


    try {

        const foodOrderSql = ` INSERT INTO food_orders (fd_order_id,member_id,payment,receiver_name,receiver_phone,shipping_method,shipping_address,shipping_fee,order_total,grand_total,payment_status,order_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        const foodOrderData = [
            req.body.fd_order_id,
            req.body.member_id,
            req.body.payment,
            req.body.receiver_name,
            req.body.receiver_phone,
            req.body.shipping_method,
            req.body.shipping_address,
            req.body.shipping_fee,
            req.body.order_total,
            req.body.grand_total,
            req.body.payment_status,
            req.body.order_status
        ];
        await db.query(foodOrderSql, foodOrderData);
        // 準備要傳送到綠界的資訊
        const food_order_data = {
            TradeDesc: "訂單描述",
            PaymentType: "aio",
            MerchantTradeDate: moment().tz('Asia/Taipei').format().slice(2, 10).replace(/-/g, ''),

            MerchantTradeNo: req.body.fd_order_id.toString() + "tkr",
            MerchantID: 2000132,
            ReturnURL: "https://www.ecpay.com.tw/receive.php",
            ItemName: "高雄旅遊網-美食",
            TotalAmount: req.body.grand_total,
            ChoosePayment: "ALL",
            EncryptType: 1
        };
        console.log(food_order_data)
        console.log(generateCheckMacValue(food_order_data, hashKey, hashIV))
        // // 發送請求到綠界
        // const ecPayResponse = await axios.post('綠界API的URL', querystring.stringify(food_order_data), {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // });

        // // 處理綠界的回應
        // if (ecPayResponse.data && ecPayResponse.data.Status === 'SUCCESS') {
        //     // 處理成功的情況
        // } else {
        //     // 處理失敗的情況
        // }
        res.status(200).send({ ok: true });

    } catch (error) {
        // 處理任何可能的錯誤，例如資料庫連接失敗
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while saving the message" });
    }
});

router.post("/fooddetailcheckout", async (req, res) => {

    try {

        const foodDetailSql = ` INSERT INTO food_orderdetails (fd_order_id,fd_orderdetails_index,product_price,product_quantity,item_total,product_id,product_name) VALUES (?,?,?,?,?,?,?)`;
        const foodDetailData = [
            req.body.fd_order_id,
            req.body.fd_orderdetails_index,
            req.body.price,
            req.body.quantity,
            req.body.itemTotal,
            req.body.merchant_id,
            req.body.name
        ];
        await db.query(foodDetailSql, foodDetailData);
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

