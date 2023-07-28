var firebase = require('firebase');
// 貼上自己的 config 設定
var config = {
    apiKey: "AIzaSyDNmWzbqPaulTH_P8HBgaSVeAwiiy6wEWU",
  authDomain: "test-6fc1d.firebaseapp.com",
  databaseURL: "https://test-6fc1d-default-rtdb.firebaseio.com",
  projectId: "test-6fc1d",
  storageBucket: "test-6fc1d.appspot.com",
  messagingSenderId: "1000256928320",
  appId: "1:1000256928320:web:e37302a6610c3c5ac6fda5",
  measurementId: "G-8G749C51VK"
};

firebase.initializeApp(config);

module.exports = firebase;