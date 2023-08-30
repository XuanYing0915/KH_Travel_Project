const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const axios = require('axios');
const querystring = require('querystring');

// app.post('/create_order', async (req, res) => {
//   // 填入訂單信息和綠界的API密鑰等
//   const orderData = {
//     MerchantID: '你的MerchantID',
//     MerchantTradeNo: '訂單編號',
//     // 其他必要字段
//   };

//   try {
//     const response = await axios.post('https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5', querystring.stringify(orderData), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     if (response.status === 200) {
//       // 這裡通常你會得到一個URL或是一個表單，你需要將其發送到前端以完成重定向
//       res.json({ url: response.data.url });
//     } else {
//       res.status(400).send('Order creation failed');
//     }
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000/');
// });

router.post("/foodsuccess", async (req, res) => {
  const fd_order_id = req.body.orderId;
  const sql = `
      SELECT 
        order_date,
        payment,
        shipping_method,
        receiver_name,
        receiver_phone,
        shipping_address,
        order_total,
        shipping_fee,
        grand_total,
        payment_status,
        order_status
      FROM food_orders
      WHERE fd_order_id = ${fd_order_id}
    `;
  // 準備要傳送到綠界的資訊
  const food_order_data = {
    // 依照綠界的API文檔填入相對應的欄位
  };

  try {
    const [datas] = await db.query(sql);


    // console.log(datas)
    res.json(datas);
  } catch (error) {
    console.error('Error fetching order data', error);
    res.status(500).send('Error fetching order data');
  }
});

router.post("/fooddetailsuccess", async (req, res) => {
  const fd_order_id = req.body.orderId;
  const sql = `
      SELECT 
        product_name,
        product_price,
        product_quantity,
        item_total
      FROM food_orderdetails
      WHERE fd_order_id = ${fd_order_id}
    `;


  try {
    const [datas] = await db.query(sql);
    // console.log(datas)
    res.json(datas);
  } catch (error) {
    console.error('Error fetching order data', error);
    res.status(500).send('Error fetching order data');
  }
});

module.exports = router;
