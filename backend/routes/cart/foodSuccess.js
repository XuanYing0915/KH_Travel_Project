const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.post("/",async (req, res) => {
    // const fd_order_id = req.body.orderNumber;
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
      WHERE fd_order_id = ?
    `;

    try {
        // const [datas] = await db.query(sql, [fd_order_id]);
        console.log(1)
        res.json(datas);
    } catch (error) {
        console.error('Error fetching order data', error);
        res.status(500).send('Error fetching order data');
    }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../../connections/mysql_config.js");

// router.route("/foodsuccess").get(async (req, res) => {

//     const  fd_order_id  = req.body.orderNumber;
//     const sql = `
//       SELECT 
//         order_date,
//         payment,
//         shipping_method,
//         receiver_name,
//         receiver_phone,
//         shipping_address,
//         order_total,
//         shipping_fee,
//         grand_total
//       FROM food_orders
//       WHERE fd_order_id = ?
//     `;

//     const [datas] = await db.query(sql, [fd_order_id]);
//     res.json(datas);
// });

// module.exports = router;
