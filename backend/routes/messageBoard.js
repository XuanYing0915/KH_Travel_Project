var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connect');
router.post('/', function (req, res) {
    req.checkBody("content","內容不得為空值").notEmpty();
    var errors = req.validationErrors();
    if(errors){
        req.flash('errors',errors[0].msg);
        res.redirect('/');
    }else{
        firebaseDb.ref('user/'+req.session.uid).once('value',function(snapshot){
            var nickname = snapshot.val().nickname;
            var ref = firebaseDb.ref('list').push();
            var listConent = {
                nickname: nickname,
                content: req.body.content
            }
            ref.set(listConent)
            .then(function(){
                res.redirect('/');
            })
        })
    }
   
})
module.exports = router;