// Promise Wrapper
// https://github.com/sidorares/node-mysql2#using-promise-wrapper
const mysql = require('mysql2/promise');
// 讀取.env檔用
require('dotenv/config.js');



// 資料庫連結資訊
const pool = mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  connectionLimit:10,
  waitForConnections:true,
  dateStrings: true
})

// 啟動時測試連線
pool
  .getConnection()
  .then((connection) => {
    console.log('Database Connected Successfully')
    connection.release()
  })
  .catch((error) => {
    console.log('Database Connection Failed'.bgRed)
    console.log(error)
  })

// 輸出模組
module.exports = pool;