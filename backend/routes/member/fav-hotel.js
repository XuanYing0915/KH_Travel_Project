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


router.route("/fav-hotel/:memberId").get(async (req, res) => {
    const memberId = req.params.memberId; // 從路由參數中提取 memberId
    const sql = `SELECT 
    h.hotel_id, 
    h.hotel_name, 
    h.hotel_address, 
    h.hotel_img
   
  FROM hotel_favorites fav 
  JOIN hotel_kh h ON fav.fk_hotel_id = h.hotel_id 
  
  
  WHERE fav.fk_member_id = ?
  
  GROUP BY h.hotel_id;
        `;
   // 在查詢中使用 memberId
   const [datas] = await db.query(sql, [memberId]);
   res.json(datas);
  });
  module.exports = router;