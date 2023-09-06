const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser");
const crypto = require('crypto');


router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體

const moment = require('moment-timezone');
const domain = "http://localhost:3000"

const generateCheckMacValue = (data, hashKey, hashIV) => {
    const keys = Object.keys(data).sort();
    let checkValue = '';
    for (const key of keys) { checkValue += `${key}=${data[key]}&` }
    checkValue = `HashKey=${hashKey}&${checkValue}HashIV=${hashIV}`; // There is already an & in the end of checkValue
    checkValue = encodeURIComponent(checkValue).toLowerCase();

    checkValue = checkValue
        .replace(/%20/g, '+')
        .replace(/%2d/g, '-')
        .replace(/%5f/g, '_')
        .replace(/%2e/g, '.')
        .replace(/%21/g, '!')
        .replace(/%2a/g, '*')
        .replace(/%28/g, '(')
        .replace(/%29/g, ')');

    checkValue = crypto.createHash('sha256').update(checkValue).digest('hex');

    return checkValue;
}
const hashKey = "5294y06JbISpM5x9"
const hashIV = "v77hoKGq4kWxNNIS"
const generatePaymentForm = (base_param, CheckMacValue) => {
    return `
        <form id="_form_aiochk" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="post">
            <input type="hidden" name="TradeDesc" id="TradeDesc" value="${base_param.TradeDesc}" />
            <input type="hidden" name="PaymentType" id="PaymentType" value="aio" />
            <input type="hidden" name="MerchantTradeDate" id="MerchantTradeDate" value="${base_param.MerchantTradeDate}" />
            <input type="hidden" name="MerchantTradeNo" id="MerchantTradeNo" value="${base_param.MerchantTradeNo}" />
            <input type="hidden" name="MerchantID" id="MerchantID" value="${base_param.MerchantID}" />
            <input type="hidden" name="ReturnURL" id="ReturnURL" value="${base_param.ReturnURL}" />
            <input type="hidden" name="ItemName" id="ItemName" value="${base_param.ItemName}" />
            <input type="hidden" name="TotalAmount" id="TotalAmount" value="${base_param.TotalAmount}" />
            <input type="hidden" name="OrderResultURL" id="TotalAmount" value="${base_param.OrderResultURL}" />
            <input type="hidden" name="ChoosePayment" id="ChoosePayment" value="ALL" />
            <input type="hidden" name="EncryptType" id="EncryptType" value="1" />
            <input type="hidden" name="CheckMacValue" id="CheckMacValue" value="${CheckMacValue}" />
        </form>
        <script type="text/javascript">document.getElementById("_form_aiochk").submit();</script>
    `;
};

// 定義 POST 請求的處理程序
router.post("/foodcheckout", async (req, res) => {


    try {

        const foodOrderSql = ` INSERT INTO food_orders (fd_order_id,member_id,receiver_name,receiver_phone,shipping_method,shipping_address,shipping_fee,order_total,grand_total,payment_status,order_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
        const foodOrderData = [
            req.body.fd_order_id,
            req.body.member_id,
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
router.post("/foodpayment", async (req, res) => {
    try {
        if (req.body.fd_order_id !== undefined) {
            console.log(req.body.fd_order_id)
            const order_no_str = req.body.fd_order_id.toString();
            // rest of your code
            const trade_no = order_no_str + "tkr"
            // 準備要傳送到綠界的資訊
            const base_param = {
                TradeDesc: "訂單描述",
                PaymentType: "aio",
                MerchantTradeDate: moment().tz('Asia/Taipei').format().slice(0, 19).replace(/-/g, '/').replace(/T/g, ' '),
                MerchantTradeNo: trade_no,
                MerchantID: 2000132,
                ReturnURL: domain,
                ItemName: "高雄旅遊網-美食",
                TotalAmount: req.body.grand_total,
                ChoosePayment: "ALL",
                EncryptType: 1,
                OrderResultURL: domain + "/cart/payment/food/success?orderNumber=" + req.body.fd_order_id
            };


            const CheckMacValue = generateCheckMacValue(base_param, hashKey, hashIV)
            const paymentFormHtml = generatePaymentForm(base_param, CheckMacValue)
            res.send(paymentFormHtml)
        } else {
            console.error("foodPayment is undefined");
            // handle the error accordingly
        }



        // res.status(200).send({ ok: true });

    } catch (error) {
        // 處理任何可能的錯誤，例如資料庫連接失敗
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while saving the message" });
    }
});


module.exports = router;