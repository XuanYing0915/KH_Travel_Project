const express = require("express");
const cors = require("cors");

const app = express();

// 使用 cors 以便讓我們的 API 可以被跨網域的客戶端存取
app.use(cors());

app.get("/hotelkh", (req, res) => {
  res.json({
    message: "Hello from the server!",
  });
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
