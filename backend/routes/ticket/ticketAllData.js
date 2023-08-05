const express = require("express");
const router = express.Router();
// 串聯資料庫
const db = require("../../connections/mysql_config.js");
//search page use
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
    ticket.tk_id,
    ticket.tk_name,
    ticket.tk_explain,
    GROUP_CONCAT(DISTINCT tk_product.tk_expiry_date) AS tk_expiry_date,
    GROUP_CONCAT(DISTINCT tk_product.tk_price) AS tk_price,
    GROUP_CONCAT(DISTINCT tk_favorites.fk_member_id) AS fk_member_id,
    GROUP_CONCAT(DISTINCT tk_image.tk_image_src) AS tk_image_src,
    GROUP_CONCAT(DISTINCT tk_class.tk_class_name) AS tk_class_name
FROM ticket
LEFT JOIN tk_product ON ticket.tk_id = tk_product.fk_tk_id
LEFT JOIN tk_favorites ON ticket.tk_id = tk_favorites.fk_tk_id
LEFT JOIN tk_image ON ticket.tk_id = tk_image.fk_tk_id
LEFT JOIN tk_class_table ON ticket.tk_id = tk_class_table.fk_tk_id
LEFT JOIN tk_class ON tk_class_table.fk_tk_class_id = tk_class.tk_class_id
GROUP BY ticket.tk_id`;
  const [datas] = await db.query(sql);

  //資料處理 若SQL處理好就不用這段
  const dataok = datas.map((v) => {
    if (v.tk_expiry_date !== null && v.tk_expiry_date !== undefined) {
      v.tk_expiry_date = v.tk_expiry_date.split(",");
    }
    if (v.tk_price !== null && v.tk_price !== undefined) {
      v.tk_price = v.tk_price.split(",");
    }
    if (v.tk_image_src !== null && v.tk_image_src !== undefined) {
      v.tk_image_src = v.tk_image_src.split(",");
    }
    if (v.tk_class_name !== null && v.tk_class_name !== undefined) {
      v.tk_class_name = v.tk_class_name.split(",");
    }
    return v;
  });
  res.json({ data: dataok });
});

// get class type
router.route("/class").get(async (req, res) => {
  const sql = `SELECT tk_class_name FROM tk_class`;
  const classData = await db.query(sql);

  //資料處理 若SQL處理好就不用這段
  res.json({data:classData[0]});
});

// datalist page use need where
router.route("/page/:ticket_id").get(async (req, res) => {
  // id is querystring
  const id = req.params.ticket_id
  const sql = `SELECT 
    ticket.*,
    GROUP_CONCAT(DISTINCT tk_product.tk_pd_name) AS tk_pd_name,
    GROUP_CONCAT(DISTINCT tk_product.tk_expiry_date) AS tk_expiry_date,
    GROUP_CONCAT(DISTINCT tk_product.tk_price) AS tk_price,
    GROUP_CONCAT(DISTINCT tk_favorites.fk_member_id) AS fk_member_id,
    GROUP_CONCAT(DISTINCT tk_image.tk_image_src) AS tk_image_src,
    GROUP_CONCAT(DISTINCT tk_image.tk_status) AS tk_status,
    GROUP_CONCAT(DISTINCT tk_class.tk_class_name) AS tk_class_name
FROM ticket
LEFT JOIN tk_product ON ticket.tk_id = tk_product.fk_tk_id
LEFT JOIN tk_favorites ON ticket.tk_id = tk_favorites.fk_tk_id
LEFT JOIN tk_image ON ticket.tk_id = tk_image.fk_tk_id
LEFT JOIN tk_class_table ON ticket.tk_id = tk_class_table.fk_tk_id
LEFT JOIN tk_class ON tk_class_table.fk_tk_class_id = tk_class.tk_class_id
WHERE ticket.tk_id = ${id}
GROUP BY ticket.tk_id
`;
  const [datas] = await db.query(sql);

  //資料處理 若SQL處理好就不用這段
  const dataok = datas.map((v) => {
    if (v.tk_pd_name !== null && v.tk_pd_name !== undefined) {
      v.tk_pd_name = v.tk_pd_name.split("\r,");
    }
    if (v.tk_expiry_date !== null && v.tk_expiry_date !== undefined) {
      v.tk_expiry_date = v.tk_expiry_date.split(",");
    }
    if (v.tk_price !== null && v.tk_price !== undefined) {
      v.tk_price = v.tk_price.split(",");
    }
    if (v.tk_image_src !== null && v.tk_image_src !== undefined) {
      v.tk_image_src = v.tk_image_src.split(",");
    }
    if (v.tk_status !== null && v.tk_status !== undefined) {
      v.tk_status = v.tk_status.split(",");
    }
    if (v.tk_class_name !== null && v.tk_class_name !== undefined) {
      v.tk_class_name = v.tk_class_name.split(",");
    }
    return v;
  });
  res.json({ data: dataok });
});

module.exports = router;
