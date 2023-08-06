const express = require('express');

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session);
  res.send('respond with a resource');
  res.render('index', { title: 'Express' })
})

module.exports = router;
