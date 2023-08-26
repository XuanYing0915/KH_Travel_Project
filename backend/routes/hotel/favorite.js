const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");

router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  favorites_id,
  hotel_id,
  fk_member_id,
  hotel_name,
  first_name, 
  last_name
  FROM hotel_favorites
  JOIN hotel_kh ON hotel_favorites.fk_hotel_id = hotel_kh.hotel_id
  JOIN member ON hotel_favorites.fk_member_id = member.member_id
  WHERE fk_member_id = ?
  ORDER BY hotel_favorites.favorites_id ASC
  `;
  const [datas] = await db.query(sql, [req.query.memberId]);
  res.json(datas);
});

// 加入/取消收藏
router.post("/like", async (req, res) => {
  const { love, id, memberId, dataBaseTableName } = req.body;
  console.log("收藏傳進後端:", love, id, memberId, dataBaseTableName);
  try {
    let sql = "";
    if (!love) {
      sql = `INSERT INTO ${dataBaseTableName}_favorites (fk_member_id, fk_${dataBaseTableName}_id) VALUES (${memberId}, ${id})`;
    } else {
      sql = `DELETE FROM ${dataBaseTableName}_favorites WHERE fk_member_id = ${memberId} AND fk_${dataBaseTableName}_id = ${id}`;
    }
    console.log("Generated SQL:", sql);
    const data = await db.query(sql);
    const affectedRows = data[0].affectedRows;
    console.log("affectedRows:", affectedRows);
    if (affectedRows > 0) {
      console.log("資料庫操作成功");
      res.json({ ...req.body, love: !love });
    }
  } catch (error) {
    console.error("操作失敗:", error);
    res.status(500).json({ error: "操作失敗" });
  }
});

module.exports = router;
