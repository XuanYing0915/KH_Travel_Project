const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

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
        grand_total
      FROM food_orders
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
    console.log(datas)
    res.json(datas);
  } catch (error) {
    console.error('Error fetching order data', error);
    res.status(500).send('Error fetching order data');
  }
});

module.exports = router;
