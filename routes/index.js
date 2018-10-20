var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('motion');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/motionlist', function(req, res) {
    var db = req.db;
    var collection = db.get('motions');
    collection.find({},{},function(e,docs){
        res.render('motions', {
            "motionlist" : docs
        });
    });

});

module.exports = router;
