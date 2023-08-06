const express = require('express');
const router = express.Router();
//npm i multer先安裝multer
const multer = require('multer');
const path = require('path');

// 先安裝express-validator
//npm i express-validator
const { body, validationResult } = require('express-validator');

// 認証用middleware(中介軟體)
const auth = require('../middlewares/auth.js');



// //設定圖片要存的位置 & 檔名
// const storage = multer.diskStorage({
//   //設定儲存目的地
//   destination: (req, file, cb) => {
//     //先建立好資料夾/public/uploads
//     //multer的cb第一個參數是錯誤 一般都設定null即可
//     cb(null, path.join(__dirname, '..', 'public', 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     //原始的檔名會存在file這個變數
//     console.log('原始的filename', file);
//     //拿到副檔名
//     const ext = file.originalname.split('.').pop();
//     //生成一個新的檔名(如: 加上uuid或時間戳記)
//     cb(null, `member-${Date.now()}.${ext}`);
//   },
// });

// // 把剛剛設定的內容 加上一些過濾的method 用multer()包成middleware
// const uploader = multer({
//   storage,
//   //fileFilter用來過濾圖片 加上mimetype可以過濾檔案格式
//   fileFilter: (req, file, cb) => {
//     console.log('file.mimetype', file.mimetype);
//     if (
//       file.mimetype !== 'image/jpeg' &&
//       file.mimetype !== 'image/jpg' &&
//       file.mimetype !== 'image/png'
//     ) {
//       cb(new Error('不接受的檔案型態', false));
//     } else {
//       cb(null, true);
//     }
//   },
//   //limits用來限制檔案尺寸
//   limits: {
//     fileSize: 1024 * 1024,
//   },
// });

// // 把欄位的驗證條件包成一個陣列當做middleware(一般來說每一個欄位的驗證都分開寫會比較好)
// const registerRules = [
//   body('email').isEmail().withMessage('Email欄位請填寫正確格式'),
//   body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
//   body('confirmPassword')
//     .custom((value, { req }) => {
//       return value === req.body.password;
//     })
//     .withMessage('密碼驗證不一致'),
// ];

// // 前置結束
// // 這一步開始因為要傳res給前端
// // 有利用到middleware三參數(req, res, next)
// // 所以寫在router後面的callback裡面

// // 取得表單驗證的結果
// const validateResult = validationResult(req);
// // 如果validateResult不是空的 = 有錯誤
// if (!validateResult.isEmpty()) {
//   //把錯誤驗證結果變成array 方便我們取得錯誤結果
//   let error = validateResult.array();
//   console.log('validate result (error)', error);
//   //並把錯誤訊息作為res傳給前端
//   return res.status(400).json({
//     code: 33001,
//     msg: error[0].msg,
//   });
// }

// // 檢查email是否已被註冊過(用SQL語法 & mySQL2)
// let [members] = await connection.execute(
//   'SELECT * FROM members WHERE email = ?',
//   [req.body.email]
// );
// console.log('exist member', members);
// //如果資料庫裡已經存在member 表示已註冊過
// if (members.length > 0) {
//   return res.status(400).json({
//     code: 33002,
//     msg: 'email已註冊',
//   });
// }

// import { verifyUser, getUser, getUserById } from '../models/users.js'

router.post('/login', async function (req, res, next) {
  // 獲得email, pwd資料
  const user = req.body

  console.log(user)

  // 這裡可以再檢查從react來的資料，哪些資料為必要(email, pwd...)
  if (!user.email || !user.pwd) {
    return res.json({ message: 'fail', code: '400' })
  }

  const { email, pwd } = user

  // 先查詢資料庫是否有同email/pwd的資料
  const isMember = await verifyUser({
    email,
    pwd,
  })

  console.log(isMember)

  if (!isMember) {
    return res.json({ message: 'fail', code: '400' })
  }

  // 會員存在，將會員的資料取出
  const member = await getUser({
    email,
    pwd,
  })

  console.log(member)

  // 如果沒必要，member的pwd資料不應該，也不需要回應給瀏覽器
  delete member.pwd

  // 啟用session
  req.session.userId = member.id

  return res.json({
    message: 'success',
    code: '200',
    user: member,
  })
})

router.post('/logout', auth, async function (req, res, next) {
  res.clearCookie('SESSION_ID') //cookie name
  req.session.destroy(() => {
    console.log('session destroyed')
  })

  res.json({ message: 'success', code: '200' })
})

// Demo使用auth middleware
router.get('/private', auth, (req, res) => {
  const userId = req.session.userId
  return res.json({ message: 'authorized', userId })
})

// Demo使用Session來決定是否有登入
router.get('/check-login', async function (req, res, next) {
  if (req.session.userId) {
    const userId = req.session.userId
    // 這裡可以直接查詢會員資料一並送出
    const user = await getUserById(userId)
    // 如果沒必要，user的pwd資料不應該，也不需要回應給瀏覽器
    delete user.pwd

    return res.json({ message: 'authorized', user })
  } else {
    return res.json({ message: 'Unauthorized' })
  }
})

module.exports = router

