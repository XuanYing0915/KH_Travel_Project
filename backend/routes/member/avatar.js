const express = require("express");
const { getUserById } = require("../../models/users.js");
const { updateById } = require('../../models/base.js');
const path = require('path');
const fs = require('fs');
const multer = require("multer");

// 上傳檔案用使用multer(另一方案是使用express-fileupload)
const router = express.Router();
// const upload = multer({ dest: "public/img/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/member/");
  },
  filename: function (req, file, cb) {
    // 檔名加上時間戳達成唯一檔名
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const userTable = 'member';


router.get("/:member_id", async function (req, res, next) {
  const user = await getUserById(req.params.member_id);
  console.log(user)
    const avatar = user.avatar;
    return res.json({ message: "success", code: "200", avatar });
})

// POST - 上傳檔案用，使用multer
router.post(
    "/:member_id",
    upload.single("avatar"), // 上傳來的檔案(這是單個檔案，欄位名稱為avatar)
    async function (req, res, next) {
     const member_id = req.params.member_id;
      if (req.file) {
        console.log(req.file);
        // 將檔名insert至資料庫
      const result = await updateById(userTable, { avatar: req.file.filename }, member_id);
        console.log(result);
  
        return res.json({ message: "success", code: "200" , avatar:req.file.filename});
      } else {
        console.log("沒有上傳檔案");
        return res.json({ message: "fail", code: "409" });
      }
    }
  );

  // DELETE - 刪除用戶舊的大頭貼 
router.delete('/:member_id', async function (req, res, next) {
  const member_id = req.params.member_id;

  const user = await getUserById(member_id);
  const avatarFileName = user.avatar;
  console.log('檔案名稱',avatarFileName);
  const avatarPath = `/img/member/${avatarFileName}`;
  try {
    // 找到舊的大頭貼檔案路徑
    fs.unlinkSync(path.join("public", avatarPath));

    return res.json({ message: 'success', code: '200' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'error', code: '500' });
  }
});

module.exports = router;