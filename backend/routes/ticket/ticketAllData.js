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
    GROUP_CONCAT(DISTINCT tk_image.tk_image_src) AS tk_image_src,
    GROUP_CONCAT(DISTINCT tk_class.tk_class_name) AS tk_class_name
FROM ticket
LEFT JOIN tk_product ON ticket.tk_id = tk_product.fk_tk_id
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

// datalist page use need check member_id ??
router.route("/page/:ticket_id").get(async (req, res) => {
  // id is querystring
  const id = req.params.ticket_id;
  const sql = `SELECT 
    ticket.*,
    GROUP_CONCAT(DISTINCT tk_product.tk_product_id) AS tk_product_id,
    GROUP_CONCAT(DISTINCT tk_product.tk_pd_name) AS tk_pd_name,
    GROUP_CONCAT(DISTINCT tk_product.tk_expiry_date) AS tk_expiry_date,
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
  //詢問是否應對元件化 不用就算了------..... 主要增加一個判斷table表單的傳遞值即可
  const table = [
    "attraction_favorites",
    "product_favorites",
    "hotel_favorites",
    "tk_favorites",
  ];
  const fk_id = [
    "fk_attraction_id",
    "fk_product_id",
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



  const sql =
    like == !true
      ? `INSERT INTO ${table_name} (${fk_id_name}, fk_member_id) VALUES (${cardid},${numberid})`
      : `DELETE FROM ${table_name} WHERE (${fk_id_name}, fk_member_id) = (${cardid},${numberid})`;

  //這裡未判定如果失敗時會怎樣
  const data = await db.query(sql);
  if (like == !true) {
    data[1] = { message: "收藏成功" };
  } else {
    data[1] = { message: "取消收藏" };
  }
  // console.log(data);

  res.json(data);
});


router.post("/favorite", async (req, res) => {
  // const { member } = req.body;


  const sql = `SELECT GROUP_CONCAT(fk_tk_id) AS fk_ti_id
                FROM tk_favorites
                WHERE fk_member_id = 900007`


  //這裡未判定如果失敗時會怎樣
  const data = await db.query(sql);
  // const dataok = data.map((v) => {
  //   v.fk_tk_id = v.fk_tk_id.split(",");
  // })
  const dataok = data[0][0].fk_ti_id.split(',').map(v => parseInt(v));
  // console.log(data[0][0].fk_ti_id.split(',').map(v => parseInt(v)));
  res.json(dataok);
});
module.exports = router;
