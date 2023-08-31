const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(express.json());
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
  // console.log(dataok)
  res.json({ data: dataok });
});

// get class type
router.route("/class").get(async (req, res) => {
  const sql = `SELECT tk_class_name FROM tk_class`;
  const classData = await db.query(sql);

  //資料處理 若SQL處理好就不用這段
  res.json({ data: classData[0] });
});

// datalist page use
router.route("/page/:ticket_id").get(async (req, res) => {
  // id is querystring
  const id = req.params.ticket_id;
  const sql = `SELECT 
    ticket.*,
    GROUP_CONCAT(DISTINCT tk_product.tk_product_id) AS tk_product_id,
    GROUP_CONCAT(DISTINCT tk_product.tk_pd_name) AS tk_pd_name,
    (SELECT GROUP_CONCAT(tk_expiry_date ORDER BY tk_product.tk_product_id) FROM tk_product WHERE tk_product.fk_tk_id = ticket.tk_id) AS tk_expiry_date,
    (SELECT GROUP_CONCAT(tk_price ORDER BY tk_product.tk_product_id) FROM tk_product WHERE tk_product.fk_tk_id = ticket.tk_id) AS tk_price,
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
    if (v.tk_expiry_date !== null && v.tk_expiry_date !== undefined) {
      v.tk_expiry_date = v.tk_expiry_date.split(",");
    } else {
      v.tk_expiry_date = "";
    }
    if (v.tk_product_id !== null && v.tk_product_id !== undefined) {
      v.tk_product_id = v.tk_product_id.split(",");
    }
    if (v.tk_price !== null && v.tk_price !== undefined) {
      v.tk_price = v.tk_price.split(",");
    }
    if (v.tk_pd_name !== null && v.tk_pd_name !== undefined) {
      v.tk_pd_name = v.tk_pd_name.split(",");
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
    if (v.fk_member_id !== null && v.fk_member_id !== undefined) {
      v.fk_member_id = v.fk_member_id.split(",");
    }
    return v;
  });
  res.json({ data: dataok });
});

// test like type
router.post("/like", async (req, res) => {
  const { cardid, numberid, like, who } = req.body;
  // console.log("data:", cardid, numberid, like, who);
  const table = [
    "attraction_favorites",
    "merchant_favorites",
    "hotel_favorites",
    "tk_favorites",
  ];
  const fk_id = [
    "fk_attraction_id",
    "fk_merchant_id",
    "fk_hotel_id",
    "fk_tk_id",
  ];
  let table_name = "";
  let fk_id_name = "";
  switch (who) {
    case 1:
      table_name = table[0];
      fk_id_name = fk_id[0];
      break;
    case 2:
      table_name = table[1];
      fk_id_name = fk_id[1];
      break;
    case 3:
      table_name = table[2];
      fk_id_name = fk_id[2];
      break;
    case 4:
      table_name = table[3];
      fk_id_name = fk_id[3];
      break;
    default:
    // console.log(`Sorry, we cant search of ${who}.`);
  }
  try {
    const sql =
      like == !true
        ? `INSERT INTO ${table_name} (${fk_id_name}, fk_member_id) VALUES (${cardid},${numberid})`
        : `DELETE FROM ${table_name} WHERE (${fk_id_name}, fk_member_id) = (${cardid},${numberid})`;

    //這裡未判定如果失敗時會怎樣
    // const data = await db.query(sql);
    // if (like == !true) {
    //   data[1] = { message: "收藏成功" };
    // } else {
    //   data[1] = { message: "取消收藏" };
    // }
    const data = await db.query(sql);
    const affectedRows = data[0].affectedRows;
    console.log("affectedRows:", affectedRows);
    if (affectedRows > 0) {
      console.log("資料庫操作成功");
      res.json({ ...req.body, like: !like });
      // console.log({ ...req.body, like: !like });
    }
  } catch (error) {
    console.error("操作失敗:", error);
    res.status(500).json({ error: "操作失敗" });
  }
});

router.post("/test", async (req, res) => {
  const { numberid, tag, time, controll } = req.body;
  // const sql = `SELECT * FROM test_test`

  let sql = "";
  switch (controll) {
    case "insert":
      sql = `INSERT INTO test_test (fk_member_id,tag,time) VALUES (${numberid},'${tag}','${time}')`;
      break;
    case "get":
      sql = `SELECT * FROM test_test WHERE fk_member_id = ${numberid}`;
      break;
    case "delete":
      sql = `DELETE FROM test_test WHERE fk_member_id = ${numberid}`;
      break;
    default:
      console.log(`Sorry, we cant search of ${controll}.`);
  }

  //這裡未判定如果失敗時會怎樣
  const data = await db.query(sql);
  let x = {};
  console.log({ ...x, data: data[0] });

  res.json({ ...x, data: data[0] });
});

// //相關票眷
router.post("/relevant", async (req, res) => {
  const { data } = req.body;
  // console.log(data);
  const sqlData = `(${data.map((value) => `'${value}'`).join(", ")})`;
  console.log(sqlData);

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
WHERE tk_class.tk_class_name in ${sqlData}
GROUP BY ticket.tk_id
ORDER BY RAND()
LIMIT 4`;
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
  console.log(dataok);
  res.json({ data: dataok });
});
module.exports = router;
