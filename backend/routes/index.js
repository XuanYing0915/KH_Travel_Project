var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connect');
var firebase = require('../connections/firebase_connect');
router.get('/', function (req, res, next) {
    console.log(firebase.auth());
    firebaseDb.ref('list').once('value',function(snapshot){
        var auth = req.session.uid;
        res.render('index', {
            title: '六角學院留言板',
            auth: auth,
            errors: req.flash('errors'),
            list: snapshot.val()
        });
    })
    
});
/* GET home page. */
module.exports = router;