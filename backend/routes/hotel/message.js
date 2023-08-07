const express = require("express");
const router = express.Router(); //也可以寫成const router = express();
const db = require("../../connections/mysql_config.js");
const bodyParser = require("body-parser"); //0807為了新增留言寫的
const cors = require("cors");

//抓資料庫的message資料
router.route("/").get(async (req, res) => {
  const sql = `SELECT 
  message_id,
  first_name, 
  last_name,
  hotel_name, 
  room_name,
  message_nickname,
  message_head, 
  message_content, 
  message_evaluate, 
  message_time
  FROM hotel_message
  JOIN member ON hotel_message.member_id = member.member_id
  JOIN hotel_kh ON hotel_message.hotel_id = hotel_kh.hotel_id
  JOIN hotel_room ON hotel_message.room_id = hotel_room.room_id
  ORDER BY hotel_message.message_id ASC
  `;
  const [datas] = await db.query(sql);
  res.json(datas);
});

//0807要寫入留言的函式
router.use(express.json());
router.use(bodyParser.json()); // 解析 JSON 請求主體
router.use(cors({ origin: "http://localhost:3000" }));
// 定義 POST 請求的處理程序
router.post("/api/messages", async (req, res) => {
  try {
    const { message_id, ...message } = req.body; // 使用解構從 req.body 中移除 message_id 因為message_id是自動編碼
    console.log("Received message from frontend:", message);
    // 構造你的 INSERT INTO 語句
    const sql = ` INSERT INTO hotel_message(member_id, 
      hotel_id, room_id, message_nickname, message_head, message_content, 
      message_evaluate, message_time) VALUES (900001,500010011,500020001,?,?,?,?,?)`;
    // 使用占位符來防止 SQL 注入
    const values = [
      message.message_nickname,
      message.message_head,
      message.message_content,
      message.message_evaluate,
      message.message_time,
    ];
    // 執行 SQL 語句
    await db.query(sql, values);
    // 儲存成功後，你可以將新留言（包括資料庫生成的任何字段，如 ID）返回給客戶端。
    res.json(message);
  } catch (error) {
    // 處理任何可能的錯誤，例如資料庫連接失敗
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the message" });
  }
});

//0807抓房間選單資料
router.get("/hotelroom:hotel_name", async (req, res) => {
  const hotelName = req.params.hotel_name;
  const sql = `SELECT room_id, room_name FROM hotel_room WHERE hotel_name = ?`;
  const [hotel_room] = await db.query(sql, [hotelName]);
  res.json(hotel_room);
});

module.exports = router;
