const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const SqlString = require("sqlstring");
// req.params 用于捕获 URL 路径中的命名参数，适用于将参数嵌套在路由中的情况。
// req.query 用于从 URL 查询参数中提取数据，适用于传递各种类型的参数。

// 收藏功能
// 加入收藏
router.route("/add").get(async (req, res, next) => {
  const member_id = 900001;
  //const member_id = req.query.fk_member_id;
  const attraction_id = req.query.fk_attraction_id;
  //   如果沒有登入會員
  if (!member_id) {
    return res.json({ message: "沒有登錄會員", code: "400" });
    // TODO 等會員登入功能完成後 檢查是否有登入
  }
  const sql = `INSERT INTO attraction_favorites(fk_member_id, fk_attraction_id)
        VALUES (?, ?)`;
  const [datas] = await db.query(sql, [member_id, attraction_id]);
  return res.json({ message: "新增收藏成功", code: "200", status: true });
});

// 格式化sql 並防止sql注入
// router.get("/add", async function (req, res, next) {
//   const member_id = 900001;
//   //   const member_id = req.query.fk_member_id;
//   const attraction_id = req.query.fk_attraction_id;

//   // 使用SqlString.format先產生sql方便除錯用
//   const sql = `INSERT INTO attraction_favorites(fk_member_id, fk_attraction_id)
//         VALUES (?, ?)`;
//   const formatSql = SqlString.format(sql, [member_id, attraction_id]);
//   // 打印sql語法
//   console.log(formatSql);
//   try {
//     //
//     const [rows, fields] = await promisePool.query(formatSql);
//     console.log(rows);

//     // 检查 results.insertId 来获取刚刚插入的数据的自增主键值
//     if (rows.insertId) {
//       return res.json({ message: "success", code: "200", data: rows.insertId });
//     } else {
//       return res.json({ message: "fail", code: "204" });
//     }
//   } catch (error) {
//     console.log("error occurred: ", error);
//     return res.json({ message: "error", code: "500" });
//   }
// });

// 查詢收藏
// (以會員查詢)
// 取得景點資訊  包括地區名稱 以及景點圖片
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  a.attraction_id, 
  a.attraction_name, 
  a.title, 
  a.fk_area_id, 
  area.area_name,
  a.address, 
  a.off_day, 
  a.open_time, 
  a.closed_time, 
  a.phone, 
  a.description, 
  a.lat, 
  a.lng, 
  a.zoom, 
  a.traffic, 
  a.visiting_time, 
  MIN(ai.img_name) AS img_name 
  FROM attraction_favorites fav 
  JOIN attraction a ON fav.fk_attraction_id = a.attraction_id 
  LEFT JOIN area ON a.fk_area_id = area.area_id
  LEFT JOIN attraction_image ai ON a.attraction_id = ai.fk_attraction_id 
  WHERE fav.fk_member_id =900001;
      `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

// 取消收藏

module.exports = router;
