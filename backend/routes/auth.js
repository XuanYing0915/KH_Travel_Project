const express = require('express');
const router = express.Router();

// 認証用middleware(中介軟體)
const auth = require('../middlewares/auth.js');


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

