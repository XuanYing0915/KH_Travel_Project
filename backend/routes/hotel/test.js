var express = require("express");
var router = express.Router();
var mysql = require("mysql2");

router.get("/", function (req, res, next) {
  var connection = mysql.createConnection({
    host: "localhost", // your host
    user: "root", // your database username
    password: "root", // your database password
    database: "travel_kh", // your database name
  });

  connection.connect(function (err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }

    console.log("Connected!");

    connection.query("SELECT 1", function (error, results, fields) {
      if (error) {
        console.error("Database query failed: " + error.stack);
        return;
      }

      console.log("Database query executed successfully!");
      res.send("Database query executed successfully!");
    });
  });
});

module.exports = router;
