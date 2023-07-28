var admin = require("firebase-admin");
// 輸入自己的金鑰
var serviceAccount = require("../test-6fc1d-firebase-adminsdk-th8er-3512afa9f3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-6fc1d-default-rtdb.firebaseio.com"
});

var db = admin.database();

module.exports = db;