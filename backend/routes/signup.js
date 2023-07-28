var express = require('express');
var router = express.Router();
var firebase = require('../connections/firebase_connect');
var firebaseDb = require('../connections/firebase_admin_connect');
var fireAuth = firebase.auth();
router.get('/', function (req, res) {
    res.render('signup', { title: '註冊',error: req.flash('error')});
})

router.post('/', function (req, res) {
    var email = req.body.email;
    var password = req.body.passwd;
    var nickname = req.body.nickname;
    fireAuth.createUserWithEmailAndPassword(email, password)
    .then(function(user){
        var saveUser = {
            'email': email,
            'nickname': nickname,
            'uid': user.uid
        }
        firebaseDb.ref('/user/'+user.uid).set(saveUser);
        res.redirect('/signup/success')
    })
    .catch(function(error){
        var errorMessage = error.message;
        req.flash('error',errorMessage);
        res.redirect('/signup')
    })
})
router.get('/success',function(req,res){
    res.render('success',{
        title:'註冊成功'
    });
})
module.exports = router;