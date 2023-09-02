const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.post("/ticketsuccess", async (req, res) => {
  const tk_order_id = req.body.orderId;
  const updateSql = `
    UPDATE ticket_orders
    SET payment_status = '已付款'
    WHERE tk_order_id = ${tk_order_id}
  `;
  const sql = `
      SELECT 
        order_date,
        payment,
        receiver_name,
        receiver_phone,
        grand_total,
        payment_status,
        order_status
      FROM ticket_orders
      WHERE tk_order_id = ${tk_order_id}
    `;

  try {
    await db.query(updateSql)
    const [datas] = await db.query(sql);
    // console.log(datas)
    res.json(datas);
  } catch (error) {
    console.error('Error fetching order data', error);
    res.status(500).send('Error fetching order data');
  }
});

router.post("/ticketdetailsuccess", async (req, res) => {
  const tk_order_id = req.body.orderId;
  const sql = `
      SELECT 
        product_name,
        product_price,
        product_quantity,
        item_total
      FROM ticket_orderdetails
      WHERE tk_order_id = ${tk_order_id}
    `;

  try {
    const [datas] = await db.query(sql);
    res.json(datas);
  } catch (error) {
    console.error('Error fetching order data', error);
    res.status(500).send('Error fetching order data');
  }
});

module.exports = router;
