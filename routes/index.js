var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/vote', function(req, res){
    var
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
