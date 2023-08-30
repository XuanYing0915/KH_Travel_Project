const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const querystring = require('querystring');
// import moment from 'moment-timezone'
const crypto = require('crypto');
const ecpay_payment = require('./lib/ecpay_payment.js')

router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: ["http://localhost:3000", "https://6453-59-125-142-166.ngrok-free.app"] }));
const moment = require('moment-timezone');

// const generateCheckMacValue = (data, hashKey, hashIV) => {
//     const keys = Object.keys(data).sort((l, r) => l > r);
//     let checkValue = '';
//     for (const key of keys) { checkValue += `${key}=${data[key]}&` }
//     checkValue = `HashKey=${hashKey}&${checkValue}HashIV=${hashIV}`; // There is already an & in the end of checkValue
//     checkValue = encodeURIComponent(checkValue).toLowerCase();
//     checkValue = checkValue.replace(/%20/g, '+')
//         .replace(/%2d/g, '-')
//         .replace(/%5f/g, '_')
//         .replace(/%2e/g, '.')
//         .replace(/%21/g, '!')
//         .replace(/%2a/g, '*')
//         .replace(/%28/g, '(')
//         .replace(/%29/g, ')')
//         .replace(/%20/g, '+');

//     checkValue = crypto.createHash('sha256').update(checkValue).digest('hex');
//     checkValue = checkValue.toUpperCase();
//     return checkValue;
// }
const generateCheckMacValue = (data, hashKey, hashIV) => {
    const keys = Object.keys(data).sort();
    let checkValue = '';
    for (const key of keys) { checkValue += `${key}=${data[key]}&` }
    checkValue = `HashKey=${hashKey}&${checkValue}HashIV=${hashIV}`; // There is already an & in the end of checkValue
    checkValue = encodeURIComponent(checkValue).toLowerCase();
    // console.log("checkvalue1", checkValue)

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
    // console.log("checkvalue2", checkValue)

    // checkValue = checkValue.toUpperCase();
    // console.log("checkvalue3", checkValue)
    return checkValue;
}
const hashKey = "5294y06JbISpM5x9"
const hashIV = "v77hoKGq4kWxNNIS"

// 定義 POST 請求的處理程序
router.post("/ticketcheckout", async (req, res) => {


    try {

        const ticketOrderSql = ` INSERT INTO ticket_orders (tk_order_id,member_id,payment,receiver_name,receiver_phone,shipping_method,shipping_fee,order_total,grand_total,payment_status,order_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
        const ticketOrderData = [
            req.body.tk_order_id,
            req.body.member_id,
            req.body.payment,
            req.body.receiver_name,
            req.body.receiver_phone,
            req.body.shipping_method,
            req.body.shipping_fee,
            req.body.order_total,
            req.body.grand_total,
            req.body.payment_status,
            req.body.order_status
        ];

        const ticketOrderResult = await db.query(ticketOrderSql, ticketOrderData);
        if (!ticketOrderResult) {
            console.error("Database query failed");
            return res.status(500).json({ error: "Database query failed" });
        }
        if (req.body.tk_order_id !== undefined) {
            const order_no_str = req.body.tk_order_id.toString();
            // rest of your code
            const trade_no = order_no_str + "tkr"
            // 準備要傳送到綠界的資訊
            const ticket_order_data = {
                TradeDesc: "訂單描述",
                // PaymentType: "aio",
                MerchantTradeDate: moment().tz('Asia/Taipei').format().slice(0, 19).replace(/-/g, '/').replace(/T/g, ' '),

                MerchantTradeNo: trade_no,
                // MerchantID: 2000132,
                ReturnURL: "http://localhost:3000",
                ItemName: "高雄旅遊網-票券",
                TotalAmount: req.body.grand_total,
                // ChoosePayment: "ALL",
                // EncryptType: 1
            };
            // const ticket_order_data = {
            //     TradeDesc: '訂單描述',
            //     PaymentType: 'aio',
            //     MerchantTradeDate: '2023/08/30 03:15:53',
            //     MerchantTradeNo: '23082903153121470tkr',
            //     MerchantID: 2000132,
            //     ReturnURL: 'https://www.ecpay.com.tw/receive.php',
            //     ItemName: '高雄旅遊網-票券',
            //     TotalAmount: 2200,
            //     ChoosePayment: 'ALL',
            //     EncryptType: 1
            // }
            // console.log(ticket_order_data)
            // const check_value = generateCheckMacValue(ticket_order_data, hashKey, hashIV)
            // console.log(check_value)
            // const deliver_data = { ...ticket_order_data, CheckMacValue: check_value }
            // console.log(deliver_data)
            // 發送請求到綠界
            // const ecPayResponse = await axios.post('https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5', querystring.stringify(deliver_data), {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // });

            // // 處理綠界的回應
            // if (ecPayResponse.data) {
            //     // 處理成功的情況
            //     res.json({ url: ecPayResponse.data.ReturnURL })
            //     console.log(ecPayResponse)

            // } else {
            //     // 處理失敗的情況
            //     res.status(400).send('ECPay API failed');
            //     // console.error("ECPay API failed");
            //     console.error(ecPayResponse);
            // }
            let inv_params = {
                // RelateNumber: 'PLEASE MODIFY',  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
                // CustomerID: 'MEM_0000001',  //會員編號
                // CustomerIdentifier: '',   //統一編號
                // CustomerName: '測試買家',
                // CustomerAddr: '測試用地址',
                // CustomerPhone: '0123456789',
                // CustomerEmail: 'johndoe@test.com',
                // ClearanceMark: '2',
                // TaxType: '1',
                // CarruerType: '',
                // CarruerNum: '',
                // Donation: '2',
                // LoveCode: '',
                // Print: '1',
                // InvoiceItemName: '測試商品1|測試商品2',
                // InvoiceItemCount: '2|3',
                // InvoiceItemWord: '個|包',
                // InvoiceItemPrice: '35|10',
                // InvoiceItemTaxType: '1|1',
                // InvoiceRemark: '測試商品1的說明|測試商品2的說明',
                // DelayDay: '0',
                // InvType: '07'
            }
            const options = require('./lib/conf/config-example'),
                create = new ecpay_payment(options),
                htm = create.payment_client.aio_check_out_all(parameters = base_param, invoice = inv_params)
            console.log(htm)
        } else {
            console.error("tk_order_id is undefined");
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

router.post("/ticketdetailcheckout", async (req, res) => {

    try {

        const ticketDetailSql = ` INSERT INTO ticket_orderdetails (tk_order_id,tk_orderdetails_index,product_price,product_quantity,item_total,product_id,product_name) VALUES (?,?,?,?,?,?,?)`;
        const ticketDetailData = [
            req.body.tk_order_id,
            req.body.tk_orderdetails_index,
            req.body.price,
            req.body.quantity,
            req.body.itemTotal,
            req.body.id,
            req.body.name
        ];
        await db.query(ticketDetailSql, ticketDetailData);
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

