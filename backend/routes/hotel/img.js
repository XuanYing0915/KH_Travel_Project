var express = require("express");
var router = express.Router();
var mysql = require("mysql2");

router.get("/", function (req, res) {
  var connection = mysql.createConnection({
    host: "localhost", // 伺服器
    user: "root", // 你的帳號
    password: "root", //  你的密碼
    database: "travel_kh", // 資料庫名稱
  });

  connection.connect(function (err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }

    console.log("Connected!");

    connection.query(
      "SELECT * FROM hotel_img",
      function (error, results, fields) {
        if (error) {
          console.error("Database query failed: " + error.stack);
          return;
        }

        console.log("Database query executed successfully!");
        res.json(results); // This will send the query results as a JSON response
      }
    );
  });
});
module.exports = router;
