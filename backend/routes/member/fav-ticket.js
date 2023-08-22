//連線會員資料庫
const express = require("express");
const router = express.Router();
const db = require("../../connections/mysql_config.js");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

router.use(cors({ origin: "http://localhost:3000" }));
const bodyParser = require("body-parser");
// 認証用middleware(中介軟體)
const auth = require("../../middlewares/auth.js");

router.use(express.json());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.route("/fav-ticket/:memberId").get(async (req, res) => {
    const memberId = req.params.memberId; // 從路由參數中提取 memberId
    const sql = `SELECT 
    t.tk_id, 
    t.tk_name, 
    t.tk_remark,
   
    MIN(ti.tk_image_src) AS img_name
  FROM tk_favorites fav 
  JOIN ticket t ON fav.fk_tk_id = t.tk_id 
  LEFT JOIN tk_image ti ON t.tk_id = ti.fk_tk_id 
  WHERE fav.fk_member_id = ?
  
  GROUP BY t.tk_id;
        `;
    // 在查詢中使用 memberId
    const [datas] = await db.query(sql, [memberId]);
    res.json(datas);
});
module.exports = router;