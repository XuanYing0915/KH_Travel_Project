const express = require("express");
const router = express.Router();

const jsonwebtoken = require("jsonwebtoken");
const authenticate = require("../../middlewares/jwt.js");
const auth = require( '../../middlewares/auth.js');

const { verifyUser, getUser } = require("../../models/users.js");
// 存取`.env`設定檔案使用
require("dotenv/config.js");

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;



// router.get('/private', authenticate, (req, res) => {
//   const user = req.user

//   return res.json({ message: 'authorized', user })
// })

// // 檢查登入狀態用
router.get("/check-login", authenticate, (req, res) => {
  const user = req.user;
  return res.json({ message: "authorized", user });
});

router.post("/login", async (req, res) => {
  console.log("進來了");
  console.log(req.body);
  // 從要求的req.body獲取email與password
  const { email, password } = req.body;

  // 先查詢資料庫是否有同email/password的資料
  const isMember = await verifyUser({
    email,
    password,
  });

  console.log(isMember);

  if (!isMember) {
    return res.json({ message: "fail", code: "400" });
  }

  // 會員存在，將會員的資料取出
  const member = await getUser({
    email,
    password,
  });

  console.log(member);

  // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
  delete member.password;

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
    expiresIn: "24h",
  });

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie("accessToken", accessToken, { httpOnly: true });

  // 傳送access token回應(react可以儲存在state中使用)
  res.json({
    message: "success",
    code: "200",
    accessToken,
  });
});

// JWT登出機制
router.get("/logout", async function (req, res, next) {
  if (!req.query) {
    return res.json({ message: "fail" });
  }
  // get access_token from db
  // 有存在 -> 執行登入工作
  const user = await findOne("member", {
    line_uid: req.query.line_uid,
  });

  const line_access_token = user.line_access_token;

  // https://developers.line.biz/en/docs/line-login/managing-users/#logout
  // 登出時進行撤銷(revoke) access token
  LineLogin.revoke_access_token(line_access_token);

  // 清除cookie
  res.clearCookie("accessToken", { httpOnly: true });
  // 因登入過程中也用到session，也會產生 SESSION_ID，所以也要清除
  res.clearCookie("SESSION_ID", { httpOnly: true });

  return res.json({ message: "success", code: "200" });
});
router.post("/logout", authenticate, async (req, res) => {
  // 清除cookie
  //
  res.clearCookie('SESSION_ID') //cookie name
  // req.session.destroy(() => {
  //   console.log('session destroyed')
  // })
//
  res.clearCookie("accessToken", { httpOnly: true });

  res.json({ message: "success", code: "200" });
});

//專門用來清fb
router.post('/logout-ssl-proxy', authenticate, (req, res) => {
  // 清除cookie
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })

  res.json({ message: 'success', code: '200' })
})
module.exports = router;
